import { t as e } from "./chunk-D5OxutzX.js";
import { a as t } from "./slide-pull-client-EYGi51IN.js";
import { n } from "./ooxml-error-DbICW35n.js";
import { p as r } from "./resource-policy.generated-D_HlV2Rm.js";
import { n as i, t as a } from "./abort-JztSoyw2.js";
import { i as o, l as s, n as c, o as l, r as u, t as d } from "./error-wire-DcmmIbXu.js";
import { i as f, n as p, o as ee } from "./resource-debug-BMgDiKq1.js";
import { t as te } from "./transfer-D3T5fQj4.js";
import { i as m, n as h, r as g } from "./pull-session-Dgx2Lp1_.js";
import { r as _ } from "./presentation-preflight-CI5kmMvH.js";
import { t as v } from "./wasm-runtime-generation-DrPM10Ji.js";
function y(e) {
	try {
		return d(e((e) => e.slide_cursor_resource_usage()));
	} catch (e) {
		if (String(e).includes("slide cursor usage is unavailable")) return;
		throw e;
	}
}
function b(e, t, n, r, i) {
	let a, o;
	try {
		if (i) {
			if (!r) throw Error("slide payload is missing before acknowledgement");
			let t = i(n, r, y(e));
			typeof t == "function" ? a = t : t && ({rollback: a, commit: o} = t);
		}
		e((e) => e.acknowledge_slide(t.operationId, t.generation)), o?.();
	} catch (e) {
		try {
			a?.();
		} catch {}
		throw e;
	}
}
var x = "ooxml-pull-resetting", S = "ooxml-pull-reset-failed", C = class {
	archive;
	acceptSlide;
	executeArchive;
	coordinatorGeneration = new m();
	sessions = /* @__PURE__ */ new Map();
	pendingOpens = /* @__PURE__ */ new Map();
	operationTail = Promise.resolve();
	resourceFailure;
	lifecycleState = "ready";
	resetBarrier;
	resetIdentities = /* @__PURE__ */ new Map();
	constructor(e, t, n = (e) => e(this.requireArchive())) {
		this.archive = e, this.acceptSlide = t, this.executeArchive = n;
	}
	get coordinator() {
		return this.coordinatorGeneration;
	}
	reserveOpen(e) {
		if (this.assertReady(), w(e), this.pendingOpens.has(e.sessionId) || this.sessions.has(e.sessionId)) throw Error("slide pull session id is already reserved");
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
	async open(e, t) {
		if (this.assertReady(), this.resourceFailure) throw this.resourceFailure;
		if (!Number.isSafeInteger(e) || e < 0) throw RangeError("slide index must be a non-negative safe integer");
		let n = this.pendingOpens.get(t.sessionId);
		if (!n || !T(n.identity, t)) throw Error("slide pull session open reservation is stale or missing");
		let i, a = new Promise((e) => {
			i = e;
		}), o = this.operationTail.then(() => this.coordinator.enqueue(async () => {
			if (n.canceled) throw Error("slide pull session open was canceled");
			let a, o = !1, c = new g({
				...t,
				maxByteCredit: r,
				coordinator: this.coordinator,
				driver: {
					pull: (n) => {
						let i;
						try {
							i = this.executeArchive((r) => r.pull_slide(e, t.operationId, t.generation, n));
						} catch (e) {
							throw s(e, n, r) || (this.latchResourceFailure(e), e);
						}
						let c = te(i);
						return this.acceptSlide && (a = JSON.parse(new TextDecoder().decode(new Uint8Array(c)))), o = !0, {
							payload: c,
							byteLength: c.byteLength,
							done: !0,
							transfer: [c]
						};
					},
					measureChunk: ({ payload: e }) => e.byteLength,
					acknowledge: () => {
						if (!o) throw Error("slide unit is not awaiting acknowledgement");
						try {
							b(this.executeArchive, t, e, a, this.acceptSlide);
						} catch (e) {
							throw this.latchResourceFailure(e), e;
						}
						o = !1, a = void 0, this.sessions.delete(t.sessionId), i();
					},
					cancel: async () => {
						try {
							this.archive() && await this.executeArchive((e) => e.cancel_slide());
						} finally {
							a = void 0, o = !1, this.sessions.delete(t.sessionId), i();
						}
					},
					close: async () => {
						try {
							this.archive() && await this.executeArchive((e) => e.cancel_slide());
						} finally {
							a = void 0, o = !1, this.sessions.delete(t.sessionId), i();
						}
					},
					resourceUsage: () => {
						try {
							return this.readResourceUsage();
						} catch (e) {
							throw this.latchResourceFailure(e), e;
						}
					}
				}
			});
			this.sessions.set(t.sessionId, {
				host: c,
				identity: t
			}), this.pendingOpens.delete(t.sessionId);
		}));
		this.operationTail = o.then(() => a, () => void 0);
		try {
			await o;
		} catch (e) {
			throw this.pendingOpens.delete(t.sessionId), i(), e;
		}
	}
	async postOpenedSafely(e, t, n) {
		if (this.lifecycleState !== "ready") {
			try {
				n(this.lifecycleError());
			} catch {}
			return;
		}
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
		if (this.lifecycleState !== "ready") return t(this.responseDuringReset(e)), Promise.resolve();
		let n = this.sessions.get(e.sessionId);
		if (n) return n.host.dispatch(e, t);
		let r = this.pendingOpens.get(e.sessionId);
		if (r && (e.kind === "cancel" || e.kind === "close")) {
			let n = T(r.identity, e);
			return n && (r.canceled = !0), t(n ? {
				protocol: h,
				kind: "accepted",
				sessionId: e.sessionId,
				operationId: e.operationId,
				generation: e.generation,
				requestId: e.requestId,
				command: e.kind
			} : this.staleLifecycleResponse(e)), Promise.resolve();
		}
		return e.kind === "cancel" || e.kind === "close" ? (t({
			protocol: h,
			kind: "accepted",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			command: e.kind
		}), Promise.resolve()) : (t({
			protocol: h,
			kind: "error",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			error: l(/* @__PURE__ */ Error("slide pull session is not open"))
		}), Promise.resolve());
	}
	async dispatchSafely(e, t) {
		try {
			await this.dispatch(e, t);
		} catch (n) {
			try {
				t({
					protocol: h,
					kind: "error",
					sessionId: e.sessionId,
					operationId: e.operationId,
					generation: e.generation,
					requestId: e.requestId,
					error: l(n)
				});
			} catch {}
		}
	}
	run(e) {
		if (this.lifecycleState !== "ready") return Promise.reject(this.lifecycleError());
		let t = this.operationTail.then(() => this.coordinator.enqueue(async () => {
			if (this.resourceFailure) throw this.resourceFailure;
			return e();
		})).catch((e) => {
			throw this.latchResourceFailure(e), e;
		});
		return this.operationTail = t.then(() => void 0, () => void 0), t;
	}
	reset() {
		if (this.resetBarrier) return this.resetBarrier;
		this.lifecycleState = "resetting", this.captureResetIdentities();
		let e = this.performReset().then(() => {
			this.resetIdentities.clear(), this.lifecycleState = "ready";
		}, (e) => {
			throw this.lifecycleState = "reset-failed", e;
		}).finally(() => {
			this.resetBarrier === e && (this.resetBarrier = void 0);
		});
		return this.resetBarrier = e, e;
	}
	async performReset() {
		for (let e of this.pendingOpens.values()) e.canceled = !0;
		let e = 1;
		for (let { host: t, identity: n } of [...this.sessions.values()]) {
			let r;
			if (await t.dispatch({
				protocol: h,
				kind: "close",
				...n,
				requestId: e++
			}, (e) => {
				e.kind === "error" && (r = c(e.error));
			}), r) throw r;
		}
		this.sessions.clear(), await this.operationTail, this.pendingOpens.clear(), this.archive() && await this.executeArchive((e) => e.close_presentation_session()), this.coordinatorGeneration = new m(), this.resourceFailure = void 0;
	}
	assertReady() {
		if (this.lifecycleState !== "ready") throw this.lifecycleError();
	}
	lifecycleError() {
		let e = this.lifecycleState === "reset-failed", t = /* @__PURE__ */ Error(e ? "slide pull worker reset failed; retry reset before new work" : "slide pull worker reset is in progress");
		return t.name = "PullSessionLifecycleError", Object.assign(t, { code: e ? S : x });
	}
	captureResetIdentities() {
		for (let { identity: e } of this.sessions.values()) this.resetIdentities.set(e.sessionId, e);
		for (let { identity: e } of this.pendingOpens.values()) this.resetIdentities.set(e.sessionId, e);
	}
	responseDuringReset(e) {
		if (e.kind === "cancel" || e.kind === "close") {
			let t = this.resetIdentities.get(e.sessionId);
			return t && !T(t, e) ? this.staleLifecycleResponse(e) : {
				protocol: h,
				kind: "accepted",
				sessionId: e.sessionId,
				operationId: e.operationId,
				generation: e.generation,
				requestId: e.requestId,
				command: e.kind
			};
		}
		return {
			protocol: h,
			kind: "error",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			error: l(this.lifecycleError())
		};
	}
	requireArchive() {
		let e = this.archive();
		if (!e) throw Error("Presentation not loaded");
		return e;
	}
	async closeIdentity(e) {
		if (this.lifecycleState !== "ready") return;
		let t = this.sessions.get(e.sessionId);
		if (t) {
			await t.host.dispatch({
				protocol: h,
				kind: "close",
				...e,
				requestId: 1
			}, () => void 0);
			return;
		}
		let n = this.pendingOpens.get(e.sessionId);
		n && T(n.identity, e) && (n.canceled = !0);
	}
	readResourceUsage() {
		return y(this.executeArchive);
	}
	latchResourceFailure(e) {
		let t = e instanceof n ? e : u(e);
		t && (this.resourceFailure ??= t);
	}
	staleLifecycleResponse(e) {
		return {
			protocol: h,
			kind: "error",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			error: {
				message: "stale lifecycle targets another slide operation",
				errorName: "PullSessionProtocolError",
				code: "ooxml-stale-lifecycle"
			}
		};
	}
};
function w(e) {
	if (!Number.isSafeInteger(e.sessionId) || e.sessionId <= 0) throw RangeError("session id must be a positive safe integer");
	if (!Number.isSafeInteger(e.operationId) || e.operationId <= 0) throw RangeError("operation id must be a positive safe integer");
	if (!Number.isSafeInteger(e.generation) || e.generation <= 0) throw RangeError("generation must be a positive safe integer");
}
function T(e, t) {
	return e.sessionId === t.sessionId && e.operationId === t.operationId && e.generation === t.generation;
}
var E = /* @__PURE__ */ e({
	PptxArchive: () => D,
	default: () => Q,
	extract_font: () => O,
	extract_image: () => k,
	extract_media: () => ne,
	initSync: () => ie,
	parse_pptx: () => re,
	pptx_to_markdown: () => A,
	reinit: () => ae
}), D = class {
	__destroy_into_raw() {
		let e = this.__wbg_ptr;
		return this.__wbg_ptr = 0, M.unregister(this), e;
	}
	free() {
		let e = this.__destroy_into_raw();
		Y.__wbg_pptxarchive_free(e, 0);
	}
	acknowledge_slide(e, t) {
		let n = Y.pptxarchive_acknowledge_slide(this.__wbg_ptr, e, t);
		if (n[1]) throw H(n[0]);
	}
	assert_healthy() {
		let e = Y.pptxarchive_assert_healthy(this.__wbg_ptr);
		if (e[1]) throw H(e[0]);
	}
	cancel_slide() {
		Y.pptxarchive_cancel_slide(this.__wbg_ptr);
	}
	close_presentation_session() {
		Y.pptxarchive_close_presentation_session(this.__wbg_ptr);
	}
	extract_font(e) {
		let t = V(e, Y.__wbindgen_malloc, Y.__wbindgen_realloc), n = J, r = Y.pptxarchive_extract_font(this.__wbg_ptr, t, n);
		if (r[3]) throw H(r[2]);
		var i = N(r[0], r[1]).slice();
		return Y.__wbindgen_free(r[0], r[1] * 1, 1), i;
	}
	extract_image(e) {
		let t = V(e, Y.__wbindgen_malloc, Y.__wbindgen_realloc), n = J, r = Y.pptxarchive_extract_image(this.__wbg_ptr, t, n);
		if (r[3]) throw H(r[2]);
		var i = N(r[0], r[1]).slice();
		return Y.__wbindgen_free(r[0], r[1] * 1, 1), i;
	}
	extract_media(e) {
		let t = V(e, Y.__wbindgen_malloc, Y.__wbindgen_realloc), n = J, r = Y.pptxarchive_extract_media(this.__wbg_ptr, t, n);
		if (r[3]) throw H(r[2]);
		var i = N(r[0], r[1]).slice();
		return Y.__wbindgen_free(r[0], r[1] * 1, 1), i;
	}
	constructor(e, t, n, r) {
		let i = B(e, Y.__wbindgen_malloc), a = J, o = Y.pptxarchive_new(i, a, !z(t), z(t) ? BigInt(0) : t, !z(n), z(n) ? BigInt(0) : n, !z(r), z(r) ? BigInt(0) : r);
		if (o[2]) throw H(o[1]);
		return this.__wbg_ptr = o[0] >>> 0, M.register(this, this.__wbg_ptr, this), this;
	}
	parse() {
		let e = Y.pptxarchive_parse(this.__wbg_ptr);
		if (e[3]) throw H(e[2]);
		var t = N(e[0], e[1]).slice();
		return Y.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	presentation_bootstrap() {
		let e = Y.pptxarchive_presentation_bootstrap(this.__wbg_ptr);
		if (e[3]) throw H(e[2]);
		var t = N(e[0], e[1]).slice();
		return Y.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	pull_slide(e, t, n, r) {
		let i = Y.pptxarchive_pull_slide(this.__wbg_ptr, e, t, n, r);
		if (i[3]) throw H(i[2]);
		var a = N(i[0], i[1]).slice();
		return Y.__wbindgen_free(i[0], i[1] * 1, 1), a;
	}
	resource_usage() {
		let e = Y.pptxarchive_resource_usage(this.__wbg_ptr);
		if (e[3]) throw H(e[2]);
		var t = N(e[0], e[1]).slice();
		return Y.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	slide_cursor_resource_usage() {
		let e = Y.pptxarchive_slide_cursor_resource_usage(this.__wbg_ptr);
		if (e[3]) throw H(e[2]);
		var t = N(e[0], e[1]).slice();
		return Y.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	to_markdown() {
		let e, t;
		try {
			let i = Y.pptxarchive_to_markdown(this.__wbg_ptr);
			var n = i[0], r = i[1];
			if (i[3]) throw n = 0, r = 0, H(i[2]);
			return e = n, t = r, I(n, r);
		} finally {
			Y.__wbindgen_free(e, t, 1);
		}
	}
};
Symbol.dispose && (D.prototype[Symbol.dispose] = D.prototype.free);
function O(e, t, n, r) {
	let i = B(e, Y.__wbindgen_malloc), a = J, o = V(t, Y.__wbindgen_malloc, Y.__wbindgen_realloc), s = J, c = Y.extract_font(i, a, o, s, !z(n), z(n) ? BigInt(0) : n, !z(r), z(r) ? BigInt(0) : r);
	if (c[3]) throw H(c[2]);
	var l = N(c[0], c[1]).slice();
	return Y.__wbindgen_free(c[0], c[1] * 1, 1), l;
}
function k(e, t, n, r) {
	let i = B(e, Y.__wbindgen_malloc), a = J, o = V(t, Y.__wbindgen_malloc, Y.__wbindgen_realloc), s = J, c = Y.extract_image(i, a, o, s, !z(n), z(n) ? BigInt(0) : n, !z(r), z(r) ? BigInt(0) : r);
	if (c[3]) throw H(c[2]);
	var l = N(c[0], c[1]).slice();
	return Y.__wbindgen_free(c[0], c[1] * 1, 1), l;
}
function ne(e, t, n, r) {
	let i = B(e, Y.__wbindgen_malloc), a = J, o = V(t, Y.__wbindgen_malloc, Y.__wbindgen_realloc), s = J, c = Y.extract_media(i, a, o, s, !z(n), z(n) ? BigInt(0) : n, !z(r), z(r) ? BigInt(0) : r);
	if (c[3]) throw H(c[2]);
	var l = N(c[0], c[1]).slice();
	return Y.__wbindgen_free(c[0], c[1] * 1, 1), l;
}
function re(e, t, n) {
	let r = B(e, Y.__wbindgen_malloc), i = J, a = Y.parse_pptx(r, i, !z(t), z(t) ? BigInt(0) : t, !z(n), z(n) ? BigInt(0) : n);
	if (a[3]) throw H(a[2]);
	var o = N(a[0], a[1]).slice();
	return Y.__wbindgen_free(a[0], a[1] * 1, 1), o;
}
function A(e, t, n) {
	let r, i;
	try {
		let s = B(e, Y.__wbindgen_malloc), c = J, l = Y.pptx_to_markdown(s, c, !z(t), z(t) ? BigInt(0) : t, !z(n), z(n) ? BigInt(0) : n);
		var a = l[0], o = l[1];
		if (l[3]) throw a = 0, o = 0, H(l[2]);
		return r = a, i = o, I(a, o);
	} finally {
		Y.__wbindgen_free(r, i, 1);
	}
}
function j() {
	return {
		__proto__: null,
		"./pptx_parser_bg.js": {
			__proto__: null,
			__wbg___wbindgen_throw_6b64449b9b9ed33c: function(e, t) {
				throw Error(I(e, t));
			},
			__wbg_error_a6fa202b58aa1cd3: function(e, t) {
				let n, r;
				try {
					n = e, r = t, console.error(I(e, t));
				} finally {
					Y.__wbindgen_free(n, r, 1);
				}
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ Error();
			},
			__wbg_stack_3b0d974bbf31e44f: function(e, t) {
				let n = t.stack, r = V(n, Y.__wbindgen_malloc, Y.__wbindgen_realloc), i = J;
				F().setInt32(e + 4, i, !0), F().setInt32(e + 0, r, !0);
			},
			__wbindgen_cast_0000000000000001: function(e, t) {
				return I(e, t);
			},
			__wbindgen_init_externref_table: function() {
				let e = Y.__wbindgen_externrefs, t = e.grow(4);
				e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1);
			}
		}
	};
}
var M = typeof FinalizationRegistry > "u" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((e) => Y.__wbg_pptxarchive_free(e >>> 0, 1));
function N(e, t) {
	return e >>>= 0, R().subarray(e / 1, e / 1 + t);
}
var P = null;
function F() {
	return (P === null || P.buffer.detached === !0 || P.buffer.detached === void 0 && P.buffer !== Y.memory.buffer) && (P = new DataView(Y.memory.buffer)), P;
}
function I(e, t) {
	return e >>>= 0, K(e, t);
}
var L = null;
function R() {
	return (L === null || L.byteLength === 0) && (L = new Uint8Array(Y.memory.buffer)), L;
}
function z(e) {
	return e == null;
}
function B(e, t) {
	let n = t(e.length * 1, 1) >>> 0;
	return R().set(e, n / 1), J = e.length, n;
}
function V(e, t, n) {
	if (n === void 0) {
		let n = q.encode(e), r = t(n.length, 1) >>> 0;
		return R().subarray(r, r + n.length).set(n), J = n.length, r;
	}
	let r = e.length, i = t(r, 1) >>> 0, a = R(), o = 0;
	for (; o < r; o++) {
		let t = e.charCodeAt(o);
		if (t > 127) break;
		a[i + o] = t;
	}
	if (o !== r) {
		o !== 0 && (e = e.slice(o)), i = n(i, r, r = o + e.length * 3, 1) >>> 0;
		let t = R().subarray(i + o, i + r), a = q.encodeInto(e, t);
		o += a.written, i = n(i, r, o, 1) >>> 0;
	}
	return J = o, i;
}
function H(e) {
	let t = Y.__wbindgen_externrefs.get(e);
	return Y.__externref_table_dealloc(e), t;
}
var U = new TextDecoder("utf-8", {
	ignoreBOM: !0,
	fatal: !0
});
U.decode();
var W = 2146435072, G = 0;
function K(e, t) {
	return G += t, G >= W && (U = new TextDecoder("utf-8", {
		ignoreBOM: !0,
		fatal: !0
	}), U.decode(), G = t), U.decode(R().subarray(e, e + t));
}
var q = new TextEncoder();
"encodeInto" in q || (q.encodeInto = function(e, t) {
	let n = q.encode(e);
	return t.set(n), {
		read: e.length,
		written: n.length
	};
});
var J = 0, Y;
function X(e, t) {
	return Y = e.exports, P = null, L = null, Y.__wbindgen_start(), Y;
}
async function Z(e, t) {
	if (typeof Response == "function" && e instanceof Response) {
		if (typeof WebAssembly.instantiateStreaming == "function") try {
			return await WebAssembly.instantiateStreaming(e, t);
		} catch (t) {
			if (e.ok && n(e.type) && e.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", t);
			else throw t;
		}
		let r = await e.arrayBuffer();
		return await WebAssembly.instantiate(r, t);
	} else {
		let n = await WebAssembly.instantiate(e, t);
		return n instanceof WebAssembly.Instance ? {
			instance: n,
			module: e
		} : n;
	}
	function n(e) {
		switch (e) {
			case "basic":
			case "cors":
			case "default": return !0;
		}
		return !1;
	}
}
function ie(e) {
	if (Y !== void 0) return Y;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module: e} = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
	let t = j();
	return e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e)), X(new WebAssembly.Instance(e, t), e);
}
async function Q(e) {
	if (Y !== void 0) return Y;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module_or_path: e} = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead"));
	let t = j();
	(typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
	let { instance: n, module: r } = await Z(await e, t);
	return X(n, r);
}
async function ae(e) {
	return Y = void 0, P = null, L = null, Q(e);
}
var $ = "PPTX presentation session was aborted", oe = v(E, "PPTX");
async function se(e, t, n = {}) {
	let r = f(n), s = new p({
		enabled: r.debug || r.onResourceMetrics !== void 0,
		format: "pptx",
		mode: "node",
		scope: "session",
		policy: r.policy,
		onMetrics: r.onResourceMetrics,
		emitToConsole: r.debug
	});
	s.setSourceBytes(e.byteLength);
	let c;
	try {
		i(n.signal, $);
		let [o, l, u] = ee(r.policy), d = D;
		c = await oe(t).open(() => new d(e, o, l, u), {
			signal: n.signal,
			abortError: () => a($),
			disposeOnAbort: (e) => e.free()
		}), i(n.signal, $);
		let f = c.proxy, p = _(JSON.parse(new TextDecoder().decode(f.presentation_bootstrap())));
		return s.checkpoint("presentation bootstrap ready"), {
			archive: f,
			bootstrap: p,
			metrics: s,
			closeArchive: () => c?.close((e) => e.free())
		};
	} catch (e) {
		try {
			c?.close((e) => e.free());
		} catch {}
		let t = o(e) ?? e;
		throw s.fail(t), t;
	}
}
var ce = /* @__PURE__ */ e({ renderSlideWithEmbeddedFonts: () => t });
export { y as i, se as n, C as r, ce as t };
