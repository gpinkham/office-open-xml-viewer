import { a as e, n as t, o as n } from "./error-wire-rJNDxWbL.js";
var r = "ooxml-pull-v1";
function i(e, t) {
	if (!Number.isSafeInteger(e) || e <= 0) throw RangeError(`${t} must be a positive safe integer`);
}
function a(e) {
	if (!(typeof e == "string" && e.length > 0 || typeof e == "number" && Number.isSafeInteger(e) && e > 0)) throw RangeError("session id must be a non-empty string or positive safe integer");
}
var o = class {
	bridge;
	options;
	sequence = 0;
	pulling = !1;
	outstanding = !1;
	ending = !1;
	completed = !1;
	lifecyclePromise;
	usage;
	orphanedRequestIds = /* @__PURE__ */ new Set();
	transferDisposers = /* @__PURE__ */ new Set();
	constructor(e, t) {
		a(t.sessionId), i(t.operationId, "operation id"), i(t.generation, "generation"), i(t.maxByteCredit, "max byte credit"), t.cancelGraceMs !== void 0 && i(t.cancelGraceMs, "cancel grace"), this.bridge = e, this.options = t;
	}
	async pull(e, i) {
		if (this.validateCredit(e), this.ending || this.completed) throw Error("pull session is closed");
		if (this.pulling) throw Error("a pull request is already in flight");
		if (this.outstanding) throw Error("acknowledge the current chunk before the next pull");
		this.pulling = !0;
		let a = this.sequence;
		try {
			let n = await this.request((t) => ({
				protocol: r,
				kind: "pull",
				...this.identity(),
				requestId: t,
				sequence: a,
				byteCredit: e
			}), i);
			if (this.validateResponseIdentity(n), n.usage && (this.usage = n.usage), n.kind === "error") throw t(n.error);
			if (n.kind !== "chunk") throw Error(`expected chunk response, received ${n.kind}`);
			if (this.ending) throw this.disposePayload(n.payload), Error("pull session is closed");
			try {
				this.validateChunk(n, a, e);
			} catch (e) {
				throw this.disposePayload(n.payload), e;
			}
			return this.outstanding = !0, this.makeChunk(n);
		} catch (e) {
			throw !n(e) && !this.ending && !this.completed && this.cancel("protocol-error").catch(() => void 0), e;
		} finally {
			this.pulling = !1;
		}
	}
	cancel(e = "closed", t) {
		return this.lifecyclePromise ? this.lifecyclePromise : (this.ending = !0, this.disposeAllTransferred(), this.lifecyclePromise = this.lifecycleControl(this.control("cancel", t, (t) => ({
			protocol: r,
			kind: "cancel",
			...this.identity(),
			requestId: t,
			reason: e
		}))), this.lifecyclePromise);
	}
	close(e) {
		return this.lifecyclePromise ? this.lifecyclePromise : (this.ending = !0, this.disposeAllTransferred(), this.lifecyclePromise = this.lifecycleControl(this.control("close", e, (e) => ({
			protocol: r,
			kind: "close",
			...this.identity(),
			requestId: e
		}))), this.lifecyclePromise);
	}
	get usageCheckpoint() {
		return this.usage;
	}
	makeChunk(e) {
		let t = !1, n, i, a = () => {
			t || (t = !0, this.transferDisposers.delete(a), this.disposePayload(e.payload));
		};
		return this.transferDisposers.add(a), {
			done: e.done,
			sequence: e.sequence,
			byteLength: e.byteLength,
			payload: e.payload,
			leaseId: e.leaseId,
			usage: e.usage,
			disposeTransferred: a,
			ack: (t) => n || (this.ending ? Promise.resolve() : (n = this.control("ack", t, (t) => ({
				protocol: r,
				kind: "ack",
				...this.identity(),
				requestId: t,
				sequence: e.sequence
			})).then(() => {
				this.outstanding = !1, this.sequence++, e.done && (this.completed = !0);
			}).catch((e) => {
				throw this.ending || this.cancel("request-error").catch(() => void 0), e;
			}), n)),
			release: (t) => i || (e.leaseId === void 0 || this.ending ? Promise.resolve() : (i = this.control("release", t, (t) => ({
				protocol: r,
				kind: "release",
				...this.identity(),
				requestId: t,
				leaseId: e.leaseId
			})).catch((e) => {
				throw this.ending || this.cancel("request-error").catch(() => void 0), e;
			}), i))
		};
	}
	async control(e, n, r) {
		let i = await this.request(r, n, e !== "cancel" && e !== "close");
		if (this.validateResponseIdentity(i), i.usage && (this.usage = i.usage), i.kind === "error") {
			if (i.error.code === "ooxml-stale-lifecycle" && (e === "cancel" || e === "close")) {
				this.forgetLifecycleOrphans();
				return;
			}
			throw t(i.error);
		}
		if (i.kind !== "accepted" || i.command !== e) throw Error(`expected ${e} acceptance`);
		(e === "cancel" || e === "close") && this.forgetLifecycleOrphans();
	}
	request(e, t, n = !0) {
		return this.bridge.request(e, void 0, {
			timeoutMs: n ? t?.timeoutMs ?? this.options.timeoutMs : !1,
			signal: t?.signal,
			onOrphanedResponse: (e) => {
				e.kind === "chunk" && this.disposePayload(e.payload);
			},
			onCancel: (e, n) => {
				this.orphanedRequestIds.add(e);
				try {
					t?.onCancel?.(e, n);
				} finally {
					!this.ending && !this.completed && this.cancel(n).catch(() => void 0);
				}
			}
		});
	}
	identity() {
		return {
			sessionId: this.options.sessionId,
			operationId: this.options.operationId,
			generation: this.options.generation
		};
	}
	validateResponseIdentity(e) {
		if (e.protocol !== "ooxml-pull-v1" || e.sessionId !== this.options.sessionId || e.operationId !== this.options.operationId || e.generation !== this.options.generation) throw e.kind === "chunk" && this.disposePayload(e.payload), Error("stale or mismatched pull session response");
	}
	validateCredit(e) {
		if (i(e, "byte credit"), e > this.options.maxByteCredit) throw RangeError(`byte credit exceeds session maximum ${this.options.maxByteCredit}`);
	}
	validateChunk(e, t, n) {
		if (e.sequence !== t) throw Error("pull response sequence mismatch");
		if (!Number.isSafeInteger(e.byteLength) || e.byteLength < 0) throw RangeError("chunk byte length must be a non-negative safe integer");
		if (e.byteLength > n) throw RangeError("chunk exceeds byte credit");
		e.leaseId !== void 0 && i(e.leaseId, "lease id");
	}
	disposeAllTransferred() {
		for (let e of [...this.transferDisposers]) e();
	}
	lifecycleControl(e) {
		let t = this.options.cancelGraceMs ?? 1e3, n, r = new Promise((e, r) => {
			n = setTimeout(() => {
				this.bridge.terminate(), r(/* @__PURE__ */ Error(`worker did not accept lifecycle command within ${t}ms`));
			}, t);
		});
		return Promise.race([e, r]).catch((e) => {
			throw this.bridge.terminate(), e;
		}).finally(() => {
			n !== void 0 && clearTimeout(n);
		});
	}
	forgetLifecycleOrphans() {
		this.bridge.forgetOrphaned(this.orphanedRequestIds), this.orphanedRequestIds.clear();
	}
	disposePayload(e) {
		try {
			this.options.disposeTransferred?.(e);
		} catch {}
	}
}, s = class {
	owner;
	queue = Promise.resolve();
	leases = /* @__PURE__ */ new Map();
	retainedBytes = 0;
	retainedCount = 0;
	maxRetainedBytes;
	maxRetainedCount;
	cleanups = /* @__PURE__ */ new Set();
	pendingFatalCleanups = [];
	poisonRunning = !1;
	fatal;
	constructor(e) {
		this.maxRetainedBytes = e?.maxRetainedBytes ?? 64 * 1024 * 1024, this.maxRetainedCount = e?.maxRetainedCount ?? 256, i(this.maxRetainedBytes, "max retained lease bytes"), i(this.maxRetainedCount, "max retained lease count");
	}
	enqueue(e) {
		let t = this.queue.then(e, e);
		return this.queue = t.then(() => void 0, () => void 0), t;
	}
	acquire(e) {
		return this.owner === void 0 ? (this.owner = e, !0) : this.owner === e;
	}
	release(e) {
		this.owner === e && (this.owner = void 0);
	}
	retainLease(e, t, n) {
		if (!Number.isSafeInteger(n) || n < 0) throw RangeError("retained lease bytes are invalid");
		let r = this.leases.get(e) ?? /* @__PURE__ */ new Map();
		if (r.has(t)) throw Error("driver returned a duplicate lease id");
		if (this.retainedCount + 1 > this.maxRetainedCount) throw RangeError("retained lease count exceeds limit");
		if (this.retainedBytes + n > this.maxRetainedBytes) throw RangeError("retained lease bytes exceed limit");
		r.set(t, n), this.leases.set(e, r), this.retainedCount++, this.retainedBytes += n;
	}
	releaseLease(e, t) {
		let n = this.leases.get(e), r = n?.get(t);
		r !== void 0 && (n?.delete(t), n?.size === 0 && this.leases.delete(e), this.retainedCount--, this.retainedBytes -= r);
	}
	registerCleanup(e) {
		return this.fatal ? (this.poisonRunning ? this.pendingFatalCleanups.push(e) : this.enqueue(e).catch(() => void 0), () => void 0) : (this.cleanups.add(e), () => this.cleanups.delete(e));
	}
	get fatalError() {
		return this.fatal;
	}
	get registeredHostCount() {
		return this.cleanups.size;
	}
	async poison(e) {
		if (this.fatal ??= e, this.poisonRunning) return this.fatal;
		this.poisonRunning = !0, this.pendingFatalCleanups.push(...this.cleanups);
		try {
			let e;
			for (; (e = this.pendingFatalCleanups.shift()) !== void 0;) await e().catch(() => void 0);
		} finally {
			this.poisonRunning = !1;
		}
		return this.fatal;
	}
}, c = class {
	options;
	coordinator;
	coordinatorOwner = Symbol("pull-session-host");
	unregisterCleanup;
	sequence = 0;
	unacked;
	leases = /* @__PURE__ */ new Map();
	activeDriverLeases = /* @__PURE__ */ new Set();
	nextWireLeaseId;
	cancelRequested = !1;
	cancelComplete = !1;
	closeRequested = !1;
	closeComplete = !1;
	driverCancelComplete = !1;
	driverCloseComplete = !1;
	completed = !1;
	constructor(e) {
		a(e.sessionId), i(e.operationId, "operation id"), i(e.generation, "generation"), i(e.maxByteCredit, "max byte credit"), e.wireLeaseIdStart !== void 0 && i(e.wireLeaseIdStart, "wire lease id start"), this.options = e, this.coordinator = e.coordinator, this.nextWireLeaseId = e.wireLeaseIdStart ?? 1, this.unregisterCleanup = this.coordinator.registerCleanup(() => this.forceFatalCleanup());
	}
	dispatch(e, t) {
		return this.coordinator.enqueue(async () => {
			let n = await this.execute(e);
			try {
				t(n.response, n.transfer);
			} catch (e) {
				throw await this.rollbackFailedPost(n), e;
			}
		});
	}
	async rollbackFailedPost(e) {
		let t = e.response;
		if (t.kind === "chunk") {
			let n = t.leaseId === void 0 ? void 0 : this.leases.get(t.leaseId);
			try {
				await this.options.driver.disposeInvalidChunk?.({
					payload: t.payload,
					byteLength: t.byteLength,
					done: t.done,
					leaseId: n?.driverLeaseId,
					retainedBytes: n?.retainedBytes,
					transfer: e.transfer
				});
			} catch {}
		}
		this.unacked = void 0, this.coordinator.release(this.coordinatorOwner);
		for (let [e, t] of [...this.leases]) try {
			await this.options.driver.releaseLease?.(t.driverLeaseId);
		} catch {} finally {
			this.leases.delete(e), this.activeDriverLeases.delete(t.driverLeaseId), this.coordinator.releaseLease(this.coordinatorOwner, e);
		}
		if (this.cancelRequested = !0, !this.driverCancelComplete) try {
			await this.options.driver.cancel?.(), this.driverCancelComplete = !0;
		} catch {}
		this.unregisterCleanup();
	}
	async execute(t) {
		try {
			if (this.isStaleLifecycle(t)) {
				let e = t.kind === "cancel" ? "cancel" : "close";
				return this.sameOperationIdentity(t) ? { response: this.accepted(t, e, !0) } : { response: this.errorResponse(t, {
					message: "stale lifecycle targets another session or operation",
					errorName: "PullSessionProtocolError",
					code: "ooxml-stale-lifecycle"
				}) };
			}
			this.validateCommandIdentity(t);
			let e = this.coordinator.fatalError;
			if (e) return t.kind === "pull" ? { response: this.errorResponse(t, e) } : (t.kind === "cancel" ? await this.cancel() : t.kind === "close" ? await this.close() : t.kind === "release" && await this.release(t.leaseId), { response: this.accepted(t, t.kind) });
			switch (t.kind) {
				case "pull": return await this.pull(t);
				case "ack": return await this.ack(t.sequence), { response: this.accepted(t, "ack") };
				case "release": return await this.release(t.leaseId), { response: this.accepted(t, "release") };
				case "cancel": return await this.cancel(), { response: this.accepted(t, "cancel") };
				case "close": return await this.close(), { response: this.accepted(t, "close") };
			}
		} catch (n) {
			let r = e(n);
			return r.code === "ooxml-resource-limit" && (r = await this.coordinator.poison(r)), { response: this.errorResponse(t, r) };
		}
	}
	async pull(e) {
		if (this.closeRequested || this.cancelRequested || this.completed) throw Error("pull session is closed");
		if (this.unacked) throw Error("previous chunk is not acknowledged");
		if (!Number.isSafeInteger(e.sequence) || e.sequence < 0 || e.sequence !== this.sequence) throw Error("pull command sequence mismatch");
		if (this.validateHostCredit(e.byteCredit), !this.coordinator.acquire(this.coordinatorOwner)) throw Error("another operation has an unacknowledged package chunk");
		let t;
		try {
			t = await this.options.driver.pull(e.byteCredit);
		} catch (e) {
			throw this.coordinator.release(this.coordinatorOwner), e;
		}
		let n = !1, a = !1, o, s;
		try {
			let r = this.options.driver.measureChunk(t), c = this.arrayBufferTransferBytes(t.transfer);
			if (r < c) throw RangeError("measured chunk bytes are below ArrayBuffer transfer bytes");
			if (s = Math.max(r, c), t.leaseId !== void 0) {
				if (i(t.leaseId, "lease id"), t.retainedBytes === void 0) throw Error("retained lease bytes are required");
				if (this.activeDriverLeases.has(t.leaseId)) throw a = !0, Error("driver returned an active duplicate lease id");
				o = this.allocateWireLeaseId(), this.coordinator.retainLease(this.coordinatorOwner, o, t.retainedBytes), this.leases.set(o, {
					driverLeaseId: t.leaseId,
					retainedBytes: t.retainedBytes
				}), this.activeDriverLeases.add(t.leaseId), n = !0;
			} else if (t.retainedBytes !== void 0) throw Error("retained lease bytes require a lease id");
			if (!Number.isSafeInteger(s) || s < 0) throw RangeError("host chunk byte length must be a non-negative safe integer");
			if (s > e.byteCredit) throw RangeError("host chunk exceeds byte credit");
		} catch (e) {
			let r;
			try {
				await this.options.driver.disposeInvalidChunk?.(t);
			} catch (e) {
				r = e;
			}
			if (n && o !== void 0) try {
				await this.release(o);
			} catch (e) {
				r ??= e;
			}
			else if (t.leaseId !== void 0 && !a) try {
				await this.options.driver.releaseLease?.(t.leaseId);
			} catch (e) {
				r ??= e;
			}
			if (a) try {
				await this.cancel();
			} catch (e) {
				r ??= e;
			}
			throw this.coordinator.release(this.coordinatorOwner), r || e;
		}
		return this.unacked = {
			sequence: this.sequence,
			done: t.done
		}, {
			response: {
				kind: "chunk",
				protocol: r,
				...this.identity(),
				requestId: e.requestId,
				sequence: this.sequence,
				byteLength: s,
				done: t.done,
				payload: t.payload,
				leaseId: o,
				usage: this.resourceUsage()
			},
			transfer: t.transfer
		};
	}
	async ack(e) {
		if (!Number.isSafeInteger(e) || e < 0) throw RangeError("invalid ack sequence");
		if (e < this.sequence) return;
		if (!this.unacked || e !== this.sequence) throw Error("ack sequence mismatch");
		let t = this.unacked.done;
		await this.options.driver.acknowledge?.(e), this.unacked = void 0, this.coordinator.release(this.coordinatorOwner), this.sequence++, t && (this.completed = !0, this.maybeUnregisterCompleted());
	}
	async release(e) {
		i(e, "wire lease id");
		let t = this.leases.get(e);
		t && (await this.options.driver.releaseLease?.(t.driverLeaseId), this.leases.delete(e), this.activeDriverLeases.delete(t.driverLeaseId), this.coordinator.releaseLease(this.coordinatorOwner, e), this.maybeUnregisterCompleted());
	}
	async cancel() {
		if (this.cancelComplete) return;
		this.cancelRequested = !0, this.unacked = void 0, this.coordinator.release(this.coordinatorOwner);
		let e;
		try {
			await this.releaseAllLeases();
		} catch (t) {
			e = t;
		}
		if (!this.driverCancelComplete) try {
			await this.options.driver.cancel?.(), this.driverCancelComplete = !0;
		} catch (t) {
			e ??= t;
		}
		if (e) throw e;
		this.cancelComplete = !0, this.unregisterCleanup();
	}
	async close() {
		if (this.closeComplete) return;
		this.closeRequested = !0, this.unacked = void 0, this.coordinator.release(this.coordinatorOwner);
		let e;
		try {
			await this.releaseAllLeases();
		} catch (t) {
			e = t;
		}
		if (!this.driverCloseComplete) try {
			await this.options.driver.close?.(), this.driverCloseComplete = !0;
		} catch (t) {
			e ??= t;
		}
		if (e) throw e;
		this.closeComplete = !0, this.unregisterCleanup();
	}
	async releaseAllLeases() {
		let e;
		for (let t of [...this.leases.keys()]) try {
			await this.release(t);
		} catch (t) {
			e ??= t;
		}
		if (e) throw e;
	}
	validateCommandIdentity(e) {
		if (e.protocol !== "ooxml-pull-v1" || e.sessionId !== this.options.sessionId || e.operationId !== this.options.operationId || e.generation !== this.options.generation || !Number.isSafeInteger(e.requestId) || e.requestId <= 0) throw Error("stale or mismatched pull session command");
	}
	validateHostCredit(e) {
		if (i(e, "byte credit"), e > this.options.maxByteCredit) throw RangeError("byte credit exceeds host maximum");
	}
	accepted(e, t, n = !1) {
		return {
			kind: "accepted",
			protocol: r,
			...n ? {
				sessionId: e.sessionId,
				operationId: e.operationId,
				generation: e.generation
			} : this.identity(),
			requestId: e.requestId,
			command: t,
			usage: this.resourceUsage()
		};
	}
	identity() {
		return {
			sessionId: this.options.sessionId,
			operationId: this.options.operationId,
			generation: this.options.generation
		};
	}
	isStaleLifecycle(e) {
		return (e.kind === "cancel" || e.kind === "close") && e.protocol === "ooxml-pull-v1" && Number.isSafeInteger(e.requestId) && e.requestId > 0 && Number.isSafeInteger(e.generation) && e.generation > 0 && e.generation < this.options.generation;
	}
	sameOperationIdentity(e) {
		return e.sessionId === this.options.sessionId && e.operationId === this.options.operationId;
	}
	errorResponse(e, t) {
		return {
			kind: "error",
			protocol: r,
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			error: t,
			usage: this.errorResourceUsage()
		};
	}
	async forceFatalCleanup() {
		this.cancelRequested = !0, this.unacked = void 0, this.coordinator.release(this.coordinatorOwner);
		let e;
		for (let t of [...this.leases.keys()]) try {
			await this.release(t);
		} catch (t) {
			e ??= t;
		}
		if (!this.driverCancelComplete) try {
			await this.options.driver.cancel?.(), this.driverCancelComplete = !0;
		} catch (t) {
			e ??= t;
		}
		if (e) throw e;
		this.unregisterCleanup();
	}
	allocateWireLeaseId() {
		if (!Number.isSafeInteger(this.nextWireLeaseId) || this.nextWireLeaseId <= 0) throw RangeError("wire lease id space exhausted");
		return this.nextWireLeaseId++;
	}
	arrayBufferTransferBytes(e) {
		let t = 0;
		for (let n of e ?? []) if (n instanceof ArrayBuffer && (t += n.byteLength, !Number.isSafeInteger(t))) throw RangeError("ArrayBuffer transfer bytes overflow");
		return t;
	}
	maybeUnregisterCompleted() {
		this.completed && this.leases.size === 0 && this.unregisterCleanup();
	}
	resourceUsage() {
		return this.options.driver.resourceUsage?.();
	}
	errorResourceUsage() {
		try {
			return this.resourceUsage();
		} catch {
			return;
		}
	}
};
//#endregion
export { s as i, r as n, c as r, o as t };
