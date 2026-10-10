import { S as e, g as t } from "./resource-policy.generated-BTdyyO9v.js";
import { a as n, t as r } from "./error-wire-rJNDxWbL.js";
import { t as i } from "./transfer-bsZEzkZu.js";
import { t as a } from "./xlsx-worksheet-policy-7DZYvldr.js";
import { i as o, n as s, r as c, t as l } from "./pull-session-BzHuXyzF.js";
import { n as u, r as d, t as f } from "./resource-measurement-BEOZEHNY.js";
import { t as p } from "./worksheet-policy-context-zBNDS5EA.js";
//#region packages/xlsx/src/worksheet-resource-limits.ts
var m = t, h = Object.freeze({
	archiveEntryCount: 0,
	declaredInflatedBytes: 0,
	distinctInflatedBytes: 0,
	operationInflatedBytes: 0
});
function g(e, t = a) {
	let { maxCells: n, maxOwnedUtf8Bytes: r } = t.worksheet, i = e.reduce((e, t) => f(e, t.cells.length, n), 0);
	return {
		rows: e.length,
		cells: i,
		ownedUtf8Bytes: e.reduce((e, t) => t.cells.reduce((e, t) => {
			let n = u(t.value, r).stringValueUtf8Bytes;
			return f(e, f(n, t.formula === void 0 ? 0 : d(t.formula, r), r), r);
		}, e), 0)
	};
}
function _(e, t = a) {
	return v(e, g(e.rows, t), t);
}
function v(e, t, n = a) {
	let r = u(e, n.worksheet.maxJsonBytes);
	return {
		...t,
		jsonBytes: r.jsonBytes
	};
}
function y(e, t, n = a) {
	let r = n.worksheet;
	return {
		rows: f(e.rows, t.rows, r.maxRows),
		cells: f(e.cells, t.cells, r.maxCells),
		ownedUtf8Bytes: f(e.ownedUtf8Bytes, t.ownedUtf8Bytes, r.maxOwnedUtf8Bytes)
	};
}
function b(e, t, n = {}, r = a) {
	let i = r.cache, o = e.rows - (n.rows ?? 0), s = e.cells - (n.cells ?? 0), c = e.ownedUtf8Bytes - (n.ownedUtf8Bytes ?? 0), l = e.jsonBytes - (n.jsonBytes ?? 0);
	if (o < 0 || s < 0 || c < 0 || l < 0) throw Error("worksheet cache accounting underflow");
	return {
		rows: f(o, t.rows, i.maxRows),
		cells: f(s, t.cells, i.maxCells),
		ownedUtf8Bytes: f(c, t.ownedUtf8Bytes, i.maxOwnedUtf8Bytes),
		jsonBytes: f(l, t.jsonBytes, i.maxJsonBytes)
	};
}
function x(t, n, r, i, a, o, s, c = r !== "delimited-text-source") {
	let l = r === "worksheet-json" ? "serialization" : "parsing";
	return new e(`OOXML resource limit exceeded${n ? ` for ${n}` : ""}: ${i} ${o} > ${a}`, {
		stage: l,
		violation: {
			format: "xlsx",
			operation: t,
			resource: r,
			metric: i,
			...n === void 0 ? {} : { part: n },
			limit: a,
			observed: Math.min(o, a + 1),
			configurable: c,
			usage: s ?? h
		}
	});
}
function S(e, t, n, r, i = a) {
	let o = i.worksheet, s = [
		[
			"rows",
			e.rows,
			o.maxRows
		],
		[
			"cells",
			e.cells,
			o.maxCells
		],
		[
			"owned-utf8-bytes",
			e.ownedUtf8Bytes,
			o.maxOwnedUtf8Bytes
		]
	];
	for (let [e, i, a] of s) if (i > a) throw x(t, n, e === "owned-utf8-bytes" ? "worksheet-cell-content" : "worksheet-model", e, a, i, r);
}
function C(e, t, n, r, i = a) {
	let o = i.worksheet.maxJsonBytes;
	if (e > o) throw x(t, n, "worksheet-json", "bytes", o, e, r);
}
function w(e, t, n, r, i = a) {
	let o = i.cache;
	if (e.rows > o.maxRows) throw x(t, n, "worksheet-cache", "rows", o.maxRows, e.rows, r);
	if (e.cells > o.maxCells) throw x(t, n, "worksheet-cache", "cells", o.maxCells, e.cells, r);
	if (e.ownedUtf8Bytes > o.maxOwnedUtf8Bytes) throw x(t, n, "worksheet-cache", "owned-utf8-bytes", o.maxOwnedUtf8Bytes, e.ownedUtf8Bytes, r);
	if (e.jsonBytes > o.maxJsonBytes) throw x(t, n, "worksheet-cache", "bytes", o.maxJsonBytes, e.jsonBytes, r);
}
//#endregion
//#region packages/xlsx/src/shared-strings.ts
function T(e, t) {
	return E(e.rows, t), e;
}
function E(e, t) {
	for (let n of e) for (let e of n.cells) {
		let n = e.value;
		if (n.type === "shared") {
			let r = t[n.si];
			if (r) {
				let t = {
					type: "text",
					text: r.text
				};
				r.runs !== void 0 && (t.runs = r.runs), r.phoneticRuns !== void 0 && (t.phoneticRuns = r.phoneticRuns), r.phoneticPr !== void 0 && (t.phoneticPr = r.phoneticPr), e.value = t;
			} else e.value = {
				type: "text",
				text: ""
			};
		}
	}
	return e;
}
//#endregion
//#region packages/xlsx/src/worksheet-pull-codec.ts
var D = new Set([
	"outline",
	"merge",
	"conditional-format",
	"ancillary-content",
	"metadata-unavailable",
	"unordered-rows"
]);
function O(e, t, n, r) {
	let i = e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength), a = JSON.parse(new TextDecoder().decode(i));
	if (!a || typeof a != "object" || !("kind" in a)) throw Error("worksheet cursor returned an invalid unit");
	let o = a;
	if (t !== (o.kind === "finished")) throw Error("worksheet cursor terminal marker mismatch");
	if (o.kind === "rows") {
		if (!Array.isArray(o.rows)) throw Error("worksheet row unit is missing rows");
		return n && E(o.rows, n), r?.(o.rows), {
			kind: "rows",
			rows: o.rows
		};
	}
	if (o.kind === "preview") {
		if (!Number.isSafeInteger(o.maxRow) || !Number.isSafeInteger(o.maxCol) || o.maxRow < 0 || o.maxCol < 0 || o.worksheet === null == (o.reason === null) || o.worksheet !== null && (typeof o.worksheet != "object" || Array.isArray(o.worksheet)) || o.reason !== null && !D.has(o.reason)) throw Error("worksheet preview unit is invalid");
		return o.worksheet && (o.worksheet.rows = []), o;
	}
	if (o.kind === "finished") {
		if (!o.worksheet || typeof o.worksheet != "object") throw Error("worksheet terminal unit is missing its worksheet");
		return o.worksheet.rows = [], {
			kind: "finished",
			worksheet: o.worksheet
		};
	}
	throw Error("worksheet cursor returned an unknown unit kind");
}
//#endregion
//#region packages/xlsx/src/worksheet-pull-worker.ts
var k = 64 * 1024 * 1024, A = class {
	coordinator = new o();
	sessions = /* @__PURE__ */ new Map();
	operationTail = Promise.resolve();
	pendingOpens = /* @__PURE__ */ new Map();
	resourceFailure;
	constructor(e, t, n = (e) => e(this.requireArchive()), r, i, o = () => a) {
		this.archive = e, this.acceptWorksheet = t, this.executeArchive = n, this.prepareRows = r, this.provisional = i, this.worksheetPolicy = o;
	}
	reserveOpen(e) {
		this.pendingOpens.set(e.sessionId, {
			identity: e,
			canceled: !1
		});
	}
	abandonOpen(e) {
		this.pendingOpens.delete(e);
	}
	get pendingOpenCount() {
		return this.pendingOpens.size;
	}
	runDuringPull(t) {
		return this.sessions.size === 0 ? this.run(t) : this.coordinator.enqueue(async () => {
			if (this.resourceFailure) throw this.resourceFailure;
			try {
				return t();
			} catch (t) {
				throw t instanceof e && (this.resourceFailure ??= t), t;
			}
		});
	}
	async open(t, n, r) {
		if (this.resourceFailure) throw this.resourceFailure;
		let a = this.pendingOpens.get(r.sessionId);
		if (!a || a.identity.operationId !== r.operationId || a.identity.generation !== r.generation) throw Error("worksheet pull session open reservation is stale or missing");
		let o = this.worksheetPolicy(), s, l = new Promise((e) => {
			s = e;
		}), u = this.operationTail.then(() => this.coordinator.enqueue(async () => {
			if (a.canceled) throw Error("worksheet pull session open was canceled");
			this.executeArchive((e) => e.open_sheet_cursor(t, n));
			let l = [], u = {
				rows: 0,
				cells: 0,
				ownedUtf8Bytes: 0
			}, d, f = !1, m = new c({
				...r,
				maxByteCredit: k,
				coordinator: this.coordinator,
				driver: {
					pull: () => {
						let n = this.executeArchive((e) => e.pull_sheet_cursor(128)), r = this.executeArchive((e) => e.sheet_cursor_pull_finished());
						if (this.acceptWorksheet) {
							let i = O(n, r, void 0, this.prepareRows);
							try {
								if (i.kind === "preview") i.worksheet && (i.worksheet.rows = l, p(i.worksheet, o), this.provisional?.preview(t, i.worksheet));
								else if (i.kind === "rows") {
									let e = y(u, g(i.rows, o), o);
									S(e, "get-worksheet-worker", void 0, this.readResourceUsage(), o), l.push(...i.rows), u = e;
								} else i.kind === "finished" && (d = i.worksheet);
							} catch (t) {
								throw t instanceof e && (this.resourceFailure ??= t), t;
							}
						}
						f = r;
						let a = i(n);
						return {
							payload: a,
							byteLength: a.byteLength,
							done: r,
							transfer: [a]
						};
					},
					measureChunk: ({ payload: e }) => e.byteLength,
					acknowledge: () => {
						if (!f) return;
						let n, i;
						try {
							if (this.acceptWorksheet) {
								if (!d) throw Error("worksheet terminal payload is missing");
								d.rows = d.parseError ? [] : l;
								let e = d.parseError ? {
									rows: 0,
									cells: 0,
									ownedUtf8Bytes: 0
								} : u, r = v(d, e, o), a = this.readResourceUsage();
								S(r, "get-worksheet-worker", void 0, a, o), C(r.jsonBytes, "get-worksheet-worker", void 0, a, o), p(d, o);
								let s = this.acceptWorksheet(t, d, r, a);
								typeof s == "function" ? n = s : s && ({rollback: n, commit: i} = s);
							}
							this.executeArchive((e) => e.acknowledge_sheet_cursor_terminal()), i?.();
						} catch (t) {
							throw n?.(), t instanceof e && (this.resourceFailure ??= t), t;
						}
						f = !1, this.sessions.delete(r.sessionId), this.provisional?.stop(t), s();
					},
					cancel: () => {
						try {
							this.archive() && this.executeArchive((e) => e.cancel_sheet_cursor());
						} finally {
							this.sessions.delete(r.sessionId), this.provisional?.stop(t), s();
						}
					},
					close: () => {
						try {
							this.archive() && this.executeArchive((e) => e.close_sheet_cursor());
						} finally {
							this.sessions.delete(r.sessionId), this.provisional?.stop(t), s();
						}
					},
					resourceUsage: () => this.readResourceUsage()
				}
			});
			this.sessions.set(r.sessionId, {
				host: m,
				identity: r
			}), this.pendingOpens.delete(r.sessionId);
		}));
		this.operationTail = u.then(() => l, () => void 0);
		try {
			await u;
		} catch (e) {
			throw this.pendingOpens.delete(r.sessionId), s(), e;
		}
	}
	async postOpenedSafely(e, t, n) {
		try {
			t();
		} catch (t) {
			await this.closeIdentity(e);
			try {
				n(t);
			} catch {}
		}
	}
	dispatch(e, t) {
		let r = this.sessions.get(e.sessionId);
		if (r) return r.host.dispatch(e, t);
		let i = this.pendingOpens.get(e.sessionId);
		if (i && (e.kind === "cancel" || e.kind === "close")) {
			let n = i.identity.operationId === e.operationId && i.identity.generation === e.generation;
			return n && (i.canceled = !0), t(n ? {
				protocol: s,
				kind: "accepted",
				sessionId: e.sessionId,
				operationId: e.operationId,
				generation: e.generation,
				requestId: e.requestId,
				command: e.kind
			} : {
				protocol: s,
				kind: "error",
				sessionId: e.sessionId,
				operationId: e.operationId,
				generation: e.generation,
				requestId: e.requestId,
				error: {
					message: "stale lifecycle targets another pending worksheet operation",
					errorName: "PullSessionProtocolError",
					code: "ooxml-stale-lifecycle"
				}
			}), Promise.resolve();
		}
		return e.kind === "cancel" || e.kind === "close" ? (t({
			protocol: s,
			kind: "accepted",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			command: e.kind
		}), Promise.resolve()) : (t({
			protocol: s,
			kind: "error",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			error: n(/* @__PURE__ */ Error("worksheet pull session is not open"))
		}), Promise.resolve());
	}
	async dispatchSafely(e, t) {
		try {
			await this.dispatch(e, t);
		} catch (r) {
			try {
				t({
					protocol: s,
					kind: "error",
					sessionId: e.sessionId,
					operationId: e.operationId,
					generation: e.generation,
					requestId: e.requestId,
					error: n(r)
				});
			} catch {}
		}
	}
	run(t) {
		let n = this.operationTail.then(() => this.coordinator.enqueue(async () => {
			if (this.resourceFailure) throw this.resourceFailure;
			return t();
		})).catch((t) => {
			throw t instanceof e && (this.resourceFailure ??= t), t;
		});
		return this.operationTail = n.then(() => void 0, () => void 0), n;
	}
	async reset() {
		for (let e of this.pendingOpens.values()) e.canceled = !0;
		let e = 1;
		for (let { host: t, identity: n } of [...this.sessions.values()]) await t.dispatch({
			protocol: s,
			kind: "close",
			...n,
			requestId: e++
		}, () => void 0);
		this.sessions.clear(), await this.operationTail, this.pendingOpens.clear(), this.resourceFailure = void 0;
	}
	requireArchive() {
		let e = this.archive();
		if (!e) throw Error("Workbook not loaded");
		return e;
	}
	async closeIdentity(e) {
		let t = this.sessions.get(e.sessionId);
		if (t) {
			await t.host.dispatch({
				protocol: s,
				kind: "close",
				...e,
				requestId: 1
			}, () => void 0);
			return;
		}
		let n = this.pendingOpens.get(e.sessionId);
		n && n.identity.operationId === e.operationId && n.identity.generation === e.generation && (n.canceled = !0);
	}
	readResourceUsage() {
		return r(this.executeArchive((e) => e.sheet_cursor_resource_usage()));
	}
}, j = class {
	active = /* @__PURE__ */ new Set();
	nextSessionId = 1;
	constructor(e) {
		if (this.options = e, e.generation !== void 0 && (!Number.isSafeInteger(e.generation) || e.generation <= 0)) throw TypeError("generation must be a positive safe integer");
	}
	async *stream(e, t, n) {
		if (!Number.isSafeInteger(e) || e < 0) throw RangeError("sheetIndex must be a non-negative safe integer");
		if (!t) throw TypeError("sheetName must be non-empty");
		P(n);
		let r = this.nextSessionId++, i = {
			sessionId: r,
			operationId: r,
			generation: this.options.generation ?? 1
		}, a = new l(this.options.transport, {
			...i,
			maxByteCredit: k,
			timeoutMs: this.options.timeoutMs,
			disposeTransferred: this.options.disposeTransferred
		});
		this.active.add(a);
		let o = !1, s;
		try {
			for (await this.options.open(e, t, i, this.options.timeoutMs);;) {
				P(n);
				let e = await a.pull(k, { signal: n });
				try {
					let t = e.usage ?? a.usageCheckpoint;
					t && this.options.onUsage?.(t);
					let r = O(e.payload, e.done, this.options.sharedStrings);
					if (yield r.kind === "preview" ? {
						...r,
						sequence: e.sequence,
						wireBytes: e.byteLength,
						usage: t
					} : r.kind === "rows" ? {
						kind: "rows",
						rows: r.rows,
						sequence: e.sequence,
						wireBytes: e.byteLength,
						usage: t
					} : {
						kind: "finished",
						worksheet: r.worksheet,
						sequence: e.sequence,
						wireBytes: e.byteLength,
						usage: t
					}, await e.ack({ signal: n }), r.kind === "finished") {
						o = !0;
						return;
					}
				} finally {
					e.disposeTransferred();
				}
			}
		} catch (e) {
			throw s = e, e;
		} finally {
			let e;
			try {
				o || await a.cancel(N(s));
			} catch (t) {
				e = t;
			} finally {
				this.active.delete(a);
			}
			if (s === void 0 && e !== void 0) throw e;
		}
	}
	async cancelAll(e = "closed") {
		let t = (await Promise.allSettled([...this.active].map((t) => t.cancel(e)))).find((e) => e.status === "rejected");
		if (t) throw t.reason;
	}
};
function M(e) {
	return !!e && typeof e == "object" && e.protocol === "ooxml-pull-v1";
}
function N(e) {
	return e && typeof e == "object" && "name" in e && e.name === "AbortError" ? "abort" : e === void 0 ? "closed" : "request-error";
}
function P(e) {
	if (!e?.aborted) return;
	let t = /* @__PURE__ */ Error("XLSX workbook session was aborted");
	throw t.name = "AbortError", t;
}
//#endregion
export { T as a, y as c, S as d, v as f, x as h, O as i, w as l, _ as m, M as n, m as o, g as p, A as r, b as s, j as t, C as u };
