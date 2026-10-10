import { t as e } from "./chunk-DmhlhrBa.js";
import { i as t } from "./slide-pull-client-BLOpkth-.js";
import { S as n, s as r } from "./resource-policy.generated-BTdyyO9v.js";
import { i, n as a, o } from "./resource-debug-Bp6LglgZ.js";
import { a as s, i as c, n as l, r as u, s as d, t as f } from "./error-wire-rJNDxWbL.js";
import { t as ee } from "./transfer-bsZEzkZu.js";
import { i as p, n as m, r as h } from "./pull-session-BzHuXyzF.js";
import { r as g } from "./presentation-preflight-HAt3EOyB.js";
import { t as _ } from "./wasm-runtime-generation-CiK17ng7.js";
//#region packages/pptx/src/slide-cursor-operation.ts
function v(e) {
	try {
		return f(e((e) => e.slide_cursor_resource_usage()));
	} catch (e) {
		if (String(e).includes("slide cursor usage is unavailable")) return;
		throw e;
	}
}
function y(e, t, n, r, i) {
	let a, o;
	try {
		if (i) {
			if (!r) throw Error("slide payload is missing before acknowledgement");
			let t = i(n, r, v(e));
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
//#endregion
//#region packages/pptx/src/slide-pull-worker.ts
var b = "ooxml-pull-resetting", te = "ooxml-pull-reset-failed", x = class {
	coordinatorGeneration = new p();
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
		if (this.assertReady(), S(e), this.pendingOpens.has(e.sessionId) || this.sessions.has(e.sessionId)) throw Error("slide pull session id is already reserved");
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
		if (!n || !C(n.identity, t)) throw Error("slide pull session open reservation is stale or missing");
		let i, a = new Promise((e) => {
			i = e;
		}), o = this.operationTail.then(() => this.coordinator.enqueue(async () => {
			if (n.canceled) throw Error("slide pull session open was canceled");
			let a, o = !1, s = new h({
				...t,
				maxByteCredit: r,
				coordinator: this.coordinator,
				driver: {
					pull: (n) => {
						let i;
						try {
							i = this.executeArchive((r) => r.pull_slide(e, t.operationId, t.generation, n));
						} catch (e) {
							throw d(e, n, r) || (this.latchResourceFailure(e), e);
						}
						let s = ee(i);
						return this.acceptSlide && (a = JSON.parse(new TextDecoder().decode(new Uint8Array(s)))), o = !0, {
							payload: s,
							byteLength: s.byteLength,
							done: !0,
							transfer: [s]
						};
					},
					measureChunk: ({ payload: e }) => e.byteLength,
					acknowledge: () => {
						if (!o) throw Error("slide unit is not awaiting acknowledgement");
						try {
							y(this.executeArchive, t, e, a, this.acceptSlide);
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
				host: s,
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
			let n = C(r.identity, e);
			return n && (r.canceled = !0), t(n ? {
				protocol: m,
				kind: "accepted",
				sessionId: e.sessionId,
				operationId: e.operationId,
				generation: e.generation,
				requestId: e.requestId,
				command: e.kind
			} : this.staleLifecycleResponse(e)), Promise.resolve();
		}
		return e.kind === "cancel" || e.kind === "close" ? (t({
			protocol: m,
			kind: "accepted",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			command: e.kind
		}), Promise.resolve()) : (t({
			protocol: m,
			kind: "error",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			error: s(/* @__PURE__ */ Error("slide pull session is not open"))
		}), Promise.resolve());
	}
	async dispatchSafely(e, t) {
		try {
			await this.dispatch(e, t);
		} catch (n) {
			try {
				t({
					protocol: m,
					kind: "error",
					sessionId: e.sessionId,
					operationId: e.operationId,
					generation: e.generation,
					requestId: e.requestId,
					error: s(n)
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
				protocol: m,
				kind: "close",
				...n,
				requestId: e++
			}, (e) => {
				e.kind === "error" && (r = l(e.error));
			}), r) throw r;
		}
		this.sessions.clear(), await this.operationTail, this.pendingOpens.clear(), this.archive() && await this.executeArchive((e) => e.close_presentation_session()), this.coordinatorGeneration = new p(), this.resourceFailure = void 0;
	}
	assertReady() {
		if (this.lifecycleState !== "ready") throw this.lifecycleError();
	}
	lifecycleError() {
		let e = this.lifecycleState === "reset-failed", t = /* @__PURE__ */ Error(e ? "slide pull worker reset failed; retry reset before new work" : "slide pull worker reset is in progress");
		return t.name = "PullSessionLifecycleError", Object.assign(t, { code: e ? te : b });
	}
	captureResetIdentities() {
		for (let { identity: e } of this.sessions.values()) this.resetIdentities.set(e.sessionId, e);
		for (let { identity: e } of this.pendingOpens.values()) this.resetIdentities.set(e.sessionId, e);
	}
	responseDuringReset(e) {
		if (e.kind === "cancel" || e.kind === "close") {
			let t = this.resetIdentities.get(e.sessionId);
			return t && !C(t, e) ? this.staleLifecycleResponse(e) : {
				protocol: m,
				kind: "accepted",
				sessionId: e.sessionId,
				operationId: e.operationId,
				generation: e.generation,
				requestId: e.requestId,
				command: e.kind
			};
		}
		return {
			protocol: m,
			kind: "error",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			error: s(this.lifecycleError())
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
				protocol: m,
				kind: "close",
				...e,
				requestId: 1
			}, () => void 0);
			return;
		}
		let n = this.pendingOpens.get(e.sessionId);
		n && C(n.identity, e) && (n.canceled = !0);
	}
	readResourceUsage() {
		return v(this.executeArchive);
	}
	latchResourceFailure(e) {
		let t = e instanceof n ? e : u(e);
		t && (this.resourceFailure ??= t);
	}
	staleLifecycleResponse(e) {
		return {
			protocol: m,
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
function S(e) {
	if (!Number.isSafeInteger(e.sessionId) || e.sessionId <= 0) throw RangeError("session id must be a positive safe integer");
	if (!Number.isSafeInteger(e.operationId) || e.operationId <= 0) throw RangeError("operation id must be a positive safe integer");
	if (!Number.isSafeInteger(e.generation) || e.generation <= 0) throw RangeError("generation must be a positive safe integer");
}
function C(e, t) {
	return e.sessionId === t.sessionId && e.operationId === t.operationId && e.generation === t.generation;
}
//#endregion
//#region packages/pptx/src/wasm/pptx_parser.js
var w = /* @__PURE__ */ e({
	PptxArchive: () => T,
	default: () => Y,
	extract_font: () => ne,
	extract_image: () => re,
	extract_media: () => ie,
	initSync: () => J,
	parse_pptx: () => ae,
	pptx_to_markdown: () => E,
	reinit: () => oe
}), T = class {
	__destroy_into_raw() {
		let e = this.__wbg_ptr;
		return this.__wbg_ptr = 0, O.unregister(this), e;
	}
	free() {
		let e = this.__destroy_into_raw();
		G.__wbg_pptxarchive_free(e, 0);
	}
	acknowledge_slide(e, t) {
		let n = G.pptxarchive_acknowledge_slide(this.__wbg_ptr, e, t);
		if (n[1]) throw R(n[0]);
	}
	assert_healthy() {
		let e = G.pptxarchive_assert_healthy(this.__wbg_ptr);
		if (e[1]) throw R(e[0]);
	}
	cancel_slide() {
		G.pptxarchive_cancel_slide(this.__wbg_ptr);
	}
	close_presentation_session() {
		G.pptxarchive_close_presentation_session(this.__wbg_ptr);
	}
	extract_font(e) {
		let t = L(e, G.__wbindgen_malloc, G.__wbindgen_realloc), n = W, r = G.pptxarchive_extract_font(this.__wbg_ptr, t, n);
		if (r[3]) throw R(r[2]);
		var i = k(r[0], r[1]).slice();
		return G.__wbindgen_free(r[0], r[1] * 1, 1), i;
	}
	extract_image(e) {
		let t = L(e, G.__wbindgen_malloc, G.__wbindgen_realloc), n = W, r = G.pptxarchive_extract_image(this.__wbg_ptr, t, n);
		if (r[3]) throw R(r[2]);
		var i = k(r[0], r[1]).slice();
		return G.__wbindgen_free(r[0], r[1] * 1, 1), i;
	}
	extract_media(e) {
		let t = L(e, G.__wbindgen_malloc, G.__wbindgen_realloc), n = W, r = G.pptxarchive_extract_media(this.__wbg_ptr, t, n);
		if (r[3]) throw R(r[2]);
		var i = k(r[0], r[1]).slice();
		return G.__wbindgen_free(r[0], r[1] * 1, 1), i;
	}
	constructor(e, t, n, r) {
		let i = I(e, G.__wbindgen_malloc), a = W, o = G.pptxarchive_new(i, a, !F(t), F(t) ? BigInt(0) : t, !F(n), F(n) ? BigInt(0) : n, !F(r), F(r) ? BigInt(0) : r);
		if (o[2]) throw R(o[1]);
		return this.__wbg_ptr = o[0] >>> 0, O.register(this, this.__wbg_ptr, this), this;
	}
	parse() {
		let e = G.pptxarchive_parse(this.__wbg_ptr);
		if (e[3]) throw R(e[2]);
		var t = k(e[0], e[1]).slice();
		return G.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	presentation_bootstrap() {
		let e = G.pptxarchive_presentation_bootstrap(this.__wbg_ptr);
		if (e[3]) throw R(e[2]);
		var t = k(e[0], e[1]).slice();
		return G.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	pull_slide(e, t, n, r) {
		let i = G.pptxarchive_pull_slide(this.__wbg_ptr, e, t, n, r);
		if (i[3]) throw R(i[2]);
		var a = k(i[0], i[1]).slice();
		return G.__wbindgen_free(i[0], i[1] * 1, 1), a;
	}
	resource_usage() {
		let e = G.pptxarchive_resource_usage(this.__wbg_ptr);
		if (e[3]) throw R(e[2]);
		var t = k(e[0], e[1]).slice();
		return G.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	slide_cursor_resource_usage() {
		let e = G.pptxarchive_slide_cursor_resource_usage(this.__wbg_ptr);
		if (e[3]) throw R(e[2]);
		var t = k(e[0], e[1]).slice();
		return G.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	to_markdown() {
		let e, t;
		try {
			let i = G.pptxarchive_to_markdown(this.__wbg_ptr);
			var n = i[0], r = i[1];
			if (i[3]) throw n = 0, r = 0, R(i[2]);
			return e = n, t = r, M(n, r);
		} finally {
			G.__wbindgen_free(e, t, 1);
		}
	}
};
Symbol.dispose && (T.prototype[Symbol.dispose] = T.prototype.free);
function ne(e, t, n, r) {
	let i = I(e, G.__wbindgen_malloc), a = W, o = L(t, G.__wbindgen_malloc, G.__wbindgen_realloc), s = W, c = G.extract_font(i, a, o, s, !F(n), F(n) ? BigInt(0) : n, !F(r), F(r) ? BigInt(0) : r);
	if (c[3]) throw R(c[2]);
	var l = k(c[0], c[1]).slice();
	return G.__wbindgen_free(c[0], c[1] * 1, 1), l;
}
function re(e, t, n, r) {
	let i = I(e, G.__wbindgen_malloc), a = W, o = L(t, G.__wbindgen_malloc, G.__wbindgen_realloc), s = W, c = G.extract_image(i, a, o, s, !F(n), F(n) ? BigInt(0) : n, !F(r), F(r) ? BigInt(0) : r);
	if (c[3]) throw R(c[2]);
	var l = k(c[0], c[1]).slice();
	return G.__wbindgen_free(c[0], c[1] * 1, 1), l;
}
function ie(e, t, n, r) {
	let i = I(e, G.__wbindgen_malloc), a = W, o = L(t, G.__wbindgen_malloc, G.__wbindgen_realloc), s = W, c = G.extract_media(i, a, o, s, !F(n), F(n) ? BigInt(0) : n, !F(r), F(r) ? BigInt(0) : r);
	if (c[3]) throw R(c[2]);
	var l = k(c[0], c[1]).slice();
	return G.__wbindgen_free(c[0], c[1] * 1, 1), l;
}
function ae(e, t, n) {
	let r = I(e, G.__wbindgen_malloc), i = W, a = G.parse_pptx(r, i, !F(t), F(t) ? BigInt(0) : t, !F(n), F(n) ? BigInt(0) : n);
	if (a[3]) throw R(a[2]);
	var o = k(a[0], a[1]).slice();
	return G.__wbindgen_free(a[0], a[1] * 1, 1), o;
}
function E(e, t, n) {
	let r, i;
	try {
		let s = I(e, G.__wbindgen_malloc), c = W, l = G.pptx_to_markdown(s, c, !F(t), F(t) ? BigInt(0) : t, !F(n), F(n) ? BigInt(0) : n);
		var a = l[0], o = l[1];
		if (l[3]) throw a = 0, o = 0, R(l[2]);
		return r = a, i = o, M(a, o);
	} finally {
		G.__wbindgen_free(r, i, 1);
	}
}
function D() {
	return {
		__proto__: null,
		"./pptx_parser_bg.js": {
			__proto__: null,
			__wbg___wbindgen_throw_6b64449b9b9ed33c: function(e, t) {
				throw Error(M(e, t));
			},
			__wbg_error_a6fa202b58aa1cd3: function(e, t) {
				let n, r;
				try {
					n = e, r = t, console.error(M(e, t));
				} finally {
					G.__wbindgen_free(n, r, 1);
				}
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ Error();
			},
			__wbg_stack_3b0d974bbf31e44f: function(e, t) {
				let n = t.stack, r = L(n, G.__wbindgen_malloc, G.__wbindgen_realloc), i = W;
				j().setInt32(e + 4, i, !0), j().setInt32(e + 0, r, !0);
			},
			__wbindgen_cast_0000000000000001: function(e, t) {
				return M(e, t);
			},
			__wbindgen_init_externref_table: function() {
				let e = G.__wbindgen_externrefs, t = e.grow(4);
				e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1);
			}
		}
	};
}
var O = typeof FinalizationRegistry > "u" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((e) => G.__wbg_pptxarchive_free(e >>> 0, 1));
function k(e, t) {
	return e >>>= 0, P().subarray(e / 1, e / 1 + t);
}
var A = null;
function j() {
	return (A === null || A.buffer.detached === !0 || A.buffer.detached === void 0 && A.buffer !== G.memory.buffer) && (A = new DataView(G.memory.buffer)), A;
}
function M(e, t) {
	return e >>>= 0, H(e, t);
}
var N = null;
function P() {
	return (N === null || N.byteLength === 0) && (N = new Uint8Array(G.memory.buffer)), N;
}
function F(e) {
	return e == null;
}
function I(e, t) {
	let n = t(e.length * 1, 1) >>> 0;
	return P().set(e, n / 1), W = e.length, n;
}
function L(e, t, n) {
	if (n === void 0) {
		let n = U.encode(e), r = t(n.length, 1) >>> 0;
		return P().subarray(r, r + n.length).set(n), W = n.length, r;
	}
	let r = e.length, i = t(r, 1) >>> 0, a = P(), o = 0;
	for (; o < r; o++) {
		let t = e.charCodeAt(o);
		if (t > 127) break;
		a[i + o] = t;
	}
	if (o !== r) {
		o !== 0 && (e = e.slice(o)), i = n(i, r, r = o + e.length * 3, 1) >>> 0;
		let t = P().subarray(i + o, i + r), a = U.encodeInto(e, t);
		o += a.written, i = n(i, r, o, 1) >>> 0;
	}
	return W = o, i;
}
function R(e) {
	let t = G.__wbindgen_externrefs.get(e);
	return G.__externref_table_dealloc(e), t;
}
var z = new TextDecoder("utf-8", {
	ignoreBOM: !0,
	fatal: !0
});
z.decode();
var B = 2146435072, V = 0;
function H(e, t) {
	return V += t, V >= B && (z = new TextDecoder("utf-8", {
		ignoreBOM: !0,
		fatal: !0
	}), z.decode(), V = t), z.decode(P().subarray(e, e + t));
}
var U = new TextEncoder();
"encodeInto" in U || (U.encodeInto = function(e, t) {
	let n = U.encode(e);
	return t.set(n), {
		read: e.length,
		written: n.length
	};
});
var W = 0, G;
function K(e, t) {
	return G = e.exports, A = null, N = null, G.__wbindgen_start(), G;
}
async function q(e, t) {
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
function J(e) {
	if (G !== void 0) return G;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module: e} = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
	let t = D();
	return e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e)), K(new WebAssembly.Instance(e, t), e);
}
async function Y(e) {
	if (G !== void 0) return G;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module_or_path: e} = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead"));
	let t = D();
	(typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
	let { instance: n, module: r } = await q(await e, t);
	return K(n, r);
}
async function oe(e) {
	return G = void 0, A = null, N = null, Y(e);
}
//#endregion
//#region packages/pptx/src/internal/node-acquisition.ts
var X, Z;
function se(e) {
	if (!Z) X = e, Z = new _(w, e);
	else if (X !== e) throw Error("PPTX runtime was already initialized with another WebAssembly.Module");
	return Z;
}
async function ce(e, t, n = {}) {
	let r = i(n), s = new a({
		enabled: r.debug || r.onResourceMetrics !== void 0,
		format: "pptx",
		mode: "node",
		scope: "session",
		policy: r.policy,
		onMetrics: r.onResourceMetrics,
		emitToConsole: r.debug
	});
	s.setSourceBytes(e.byteLength);
	let l;
	try {
		Q(n.signal);
		let [i, a, c] = o(r.policy), u = T;
		l = await se(t).open(() => new u(e, i, a, c), {
			signal: n.signal,
			abortError: $,
			disposeOnAbort: (e) => e.free()
		}), Q(n.signal);
		let d = l.proxy, f = g(JSON.parse(new TextDecoder().decode(d.presentation_bootstrap())));
		return s.checkpoint("presentation bootstrap ready"), {
			archive: d,
			bootstrap: f,
			metrics: s,
			closeArchive: () => l?.close((e) => e.free())
		};
	} catch (e) {
		try {
			l?.close((e) => e.free());
		} catch {}
		let t = c(e) ?? e;
		throw s.fail(t), t;
	}
}
function Q(e) {
	if (e?.aborted) throw $();
}
function $() {
	let e = /* @__PURE__ */ Error("PPTX presentation session was aborted");
	return e.name = "AbortError", e;
}
//#endregion
//#region packages/pptx/src/internal/session.ts
var le = /* @__PURE__ */ e({ renderSlide: () => t });
//#endregion
export { v as i, ce as n, x as r, le as t };
