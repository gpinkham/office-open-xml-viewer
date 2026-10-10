import { t as e } from "./chunk-DmhlhrBa.js";
import { S as t } from "./resource-policy.generated-BTdyyO9v.js";
import { a as n, c as r, f as i, i as a, l as o, r as s } from "./document-pull-client-B-aENbZ1.js";
import { n as c } from "./cjk-fallback-CtkvGQ-i.js";
import { s as l, u } from "./blip-gate-CVWM87j6.js";
import { i as d, n as f, o as ee } from "./resource-debug-Bp6LglgZ.js";
import { i as p, r as m, t as h } from "./error-wire-rJNDxWbL.js";
import { n as g, r as te, t as ne } from "./wasm-loader-CQMAGKwZ.js";
import { t as _ } from "./wasm-runtime-generation-CiK17ng7.js";
import { t as v } from "./in-process-pull-transport-C2_At2ns.js";
import { n as re, t as ie } from "./document-pull-worker-DuUmPK10.js";
import { a as ae } from "./render-qLA5Tnsx.js";
//#region packages/docx/src/wasm/docx_parser.js
var oe = /* @__PURE__ */ e({
	DocxArchive: () => y,
	default: () => H,
	docx_to_markdown: () => se,
	extract_image: () => b,
	initSync: () => V,
	parse_docx: () => x,
	reinit: () => U
}), y = class {
	__destroy_into_raw() {
		let e = this.__wbg_ptr;
		return this.__wbg_ptr = 0, C.unregister(this), e;
	}
	free() {
		let e = this.__destroy_into_raw();
		R.__wbg_docxarchive_free(e, 0);
	}
	acknowledge_document_chunk(e, t, n) {
		let r = R.docxarchive_acknowledge_document_chunk(this.__wbg_ptr, e, t, n);
		if (r[1]) throw N(r[0]);
	}
	assert_healthy() {
		let e = R.docxarchive_assert_healthy(this.__wbg_ptr);
		if (e[1]) throw N(e[0]);
	}
	cancel_document_cursor() {
		R.docxarchive_cancel_document_cursor(this.__wbg_ptr);
	}
	close_document_session() {
		R.docxarchive_close_document_session(this.__wbg_ptr);
	}
	document_chunk_done() {
		let e = R.docxarchive_document_chunk_done(this.__wbg_ptr);
		if (e[2]) throw N(e[1]);
		return e[0] !== 0;
	}
	document_cursor_resource_usage() {
		let e = R.docxarchive_document_cursor_resource_usage(this.__wbg_ptr);
		if (e[3]) throw N(e[2]);
		let t;
		return e[0] !== 0 && (t = w(e[0], e[1]).slice(), R.__wbindgen_free(e[0], e[1] * 1, 1)), t;
	}
	extract_image(e) {
		let t = M(e, R.__wbindgen_malloc, R.__wbindgen_realloc), n = L, r = R.docxarchive_extract_image(this.__wbg_ptr, t, n);
		if (r[3]) throw N(r[2]);
		var i = w(r[0], r[1]).slice();
		return R.__wbindgen_free(r[0], r[1] * 1, 1), i;
	}
	constructor(e, t, n, r) {
		let i = j(e, R.__wbindgen_malloc), a = L, o = R.docxarchive_new(i, a, !A(t), A(t) ? BigInt(0) : t, !A(n), A(n) ? BigInt(0) : n, !A(r), A(r) ? BigInt(0) : r);
		if (o[2]) throw N(o[1]);
		return this.__wbg_ptr = o[0] >>> 0, C.register(this, this.__wbg_ptr, this), this;
	}
	open_document_cursor(e, t) {
		let n = R.docxarchive_open_document_cursor(this.__wbg_ptr, e, t);
		if (n[1]) throw N(n[0]);
	}
	parse() {
		let e = R.docxarchive_parse(this.__wbg_ptr);
		if (e[3]) throw N(e[2]);
		var t = w(e[0], e[1]).slice();
		return R.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	pull_document_chunk(e, t, n, r) {
		let i = R.docxarchive_pull_document_chunk(this.__wbg_ptr, e, t, n, r);
		if (i[3]) throw N(i[2]);
		var a = w(i[0], i[1]).slice();
		return R.__wbindgen_free(i[0], i[1] * 1, 1), a;
	}
	resource_usage() {
		let e = R.docxarchive_resource_usage(this.__wbg_ptr);
		if (e[3]) throw N(e[2]);
		var t = w(e[0], e[1]).slice();
		return R.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	to_markdown() {
		let e, t;
		try {
			let i = R.docxarchive_to_markdown(this.__wbg_ptr);
			var n = i[0], r = i[1];
			if (i[3]) throw n = 0, r = 0, N(i[2]);
			return e = n, t = r, D(n, r);
		} finally {
			R.__wbindgen_free(e, t, 1);
		}
	}
};
Symbol.dispose && (y.prototype[Symbol.dispose] = y.prototype.free);
function se(e, t, n) {
	let r, i;
	try {
		let s = j(e, R.__wbindgen_malloc), c = L, l = R.docx_to_markdown(s, c, !A(t), A(t) ? BigInt(0) : t, !A(n), A(n) ? BigInt(0) : n);
		var a = l[0], o = l[1];
		if (l[3]) throw a = 0, o = 0, N(l[2]);
		return r = a, i = o, D(a, o);
	} finally {
		R.__wbindgen_free(r, i, 1);
	}
}
function b(e, t, n, r) {
	let i = j(e, R.__wbindgen_malloc), a = L, o = M(t, R.__wbindgen_malloc, R.__wbindgen_realloc), s = L, c = R.extract_image(i, a, o, s, !A(n), A(n) ? BigInt(0) : n, !A(r), A(r) ? BigInt(0) : r);
	if (c[3]) throw N(c[2]);
	var l = w(c[0], c[1]).slice();
	return R.__wbindgen_free(c[0], c[1] * 1, 1), l;
}
function x(e, t, n) {
	let r = j(e, R.__wbindgen_malloc), i = L, a = R.parse_docx(r, i, !A(t), A(t) ? BigInt(0) : t, !A(n), A(n) ? BigInt(0) : n);
	if (a[3]) throw N(a[2]);
	var o = w(a[0], a[1]).slice();
	return R.__wbindgen_free(a[0], a[1] * 1, 1), o;
}
function S() {
	return {
		__proto__: null,
		"./docx_parser_bg.js": {
			__proto__: null,
			__wbg___wbindgen_throw_6b64449b9b9ed33c: function(e, t) {
				throw Error(D(e, t));
			},
			__wbg_error_a6fa202b58aa1cd3: function(e, t) {
				let n, r;
				try {
					n = e, r = t, console.error(D(e, t));
				} finally {
					R.__wbindgen_free(n, r, 1);
				}
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ Error();
			},
			__wbg_stack_3b0d974bbf31e44f: function(e, t) {
				let n = t.stack, r = M(n, R.__wbindgen_malloc, R.__wbindgen_realloc), i = L;
				E().setInt32(e + 4, i, !0), E().setInt32(e + 0, r, !0);
			},
			__wbindgen_cast_0000000000000001: function(e, t) {
				return D(e, t);
			},
			__wbindgen_init_externref_table: function() {
				let e = R.__wbindgen_externrefs, t = e.grow(4);
				e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1);
			}
		}
	};
}
var C = typeof FinalizationRegistry > "u" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((e) => R.__wbg_docxarchive_free(e >>> 0, 1));
function w(e, t) {
	return e >>>= 0, k().subarray(e / 1, e / 1 + t);
}
var T = null;
function E() {
	return (T === null || T.buffer.detached === !0 || T.buffer.detached === void 0 && T.buffer !== R.memory.buffer) && (T = new DataView(R.memory.buffer)), T;
}
function D(e, t) {
	return e >>>= 0, le(e, t);
}
var O = null;
function k() {
	return (O === null || O.byteLength === 0) && (O = new Uint8Array(R.memory.buffer)), O;
}
function A(e) {
	return e == null;
}
function j(e, t) {
	let n = t(e.length * 1, 1) >>> 0;
	return k().set(e, n / 1), L = e.length, n;
}
function M(e, t, n) {
	if (n === void 0) {
		let n = I.encode(e), r = t(n.length, 1) >>> 0;
		return k().subarray(r, r + n.length).set(n), L = n.length, r;
	}
	let r = e.length, i = t(r, 1) >>> 0, a = k(), o = 0;
	for (; o < r; o++) {
		let t = e.charCodeAt(o);
		if (t > 127) break;
		a[i + o] = t;
	}
	if (o !== r) {
		o !== 0 && (e = e.slice(o)), i = n(i, r, r = o + e.length * 3, 1) >>> 0;
		let t = k().subarray(i + o, i + r), a = I.encodeInto(e, t);
		o += a.written, i = n(i, r, o, 1) >>> 0;
	}
	return L = o, i;
}
function N(e) {
	let t = R.__wbindgen_externrefs.get(e);
	return R.__externref_table_dealloc(e), t;
}
var P = new TextDecoder("utf-8", {
	ignoreBOM: !0,
	fatal: !0
});
P.decode();
var ce = 2146435072, F = 0;
function le(e, t) {
	return F += t, F >= ce && (P = new TextDecoder("utf-8", {
		ignoreBOM: !0,
		fatal: !0
	}), P.decode(), F = t), P.decode(k().subarray(e, e + t));
}
var I = new TextEncoder();
"encodeInto" in I || (I.encodeInto = function(e, t) {
	let n = I.encode(e);
	return t.set(n), {
		read: e.length,
		written: n.length
	};
});
var L = 0, R;
function z(e, t) {
	return R = e.exports, T = null, O = null, R.__wbindgen_start(), R;
}
async function B(e, t) {
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
function V(e) {
	if (R !== void 0) return R;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module: e} = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
	let t = S();
	return e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e)), z(new WebAssembly.Instance(e, t), e);
}
async function H(e) {
	if (R !== void 0) return R;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module_or_path: e} = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead"));
	let t = S();
	(typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
	let { instance: n, module: r } = await B(await e, t);
	return z(n, r);
}
async function U(e) {
	return R = void 0, T = null, O = null, H(e);
}
//#endregion
//#region packages/docx/src/internal/node-acquisition.ts
var W, G;
function ue(e) {
	if (!G) W = e, G = new _(oe, e);
	else if (W !== e) throw Error("DOCX runtime was already initialized with another WebAssembly.Module");
	return G;
}
async function K(e, t, n, r) {
	let i = d(n), a = new f({
		enabled: i.debug || i.onResourceMetrics !== void 0,
		format: "docx",
		mode: "node",
		scope: "session",
		policy: i.policy,
		onMetrics: i.onResourceMetrics,
		emitToConsole: i.debug
	});
	a.setSourceBytes(e.byteLength);
	let o, s, c;
	try {
		q(n.signal);
		let [l, u, d] = ee(i.policy), f = y;
		o = await ue(t).open(() => new f(e, l, u, d), {
			signal: n.signal,
			abortError: J,
			disposeOnAbort: (e) => e.free()
		}), q(n.signal);
		let p = o.proxy;
		a.checkpoint("container ready"), s = new ie(() => p);
		let m = {
			sessionId: 1,
			operationId: 1,
			generation: 1
		};
		s.open(m), c = new v((e, t) => s?.dispatch(e, t), () => void 0);
		let h, g = await r(c, m, {
			signal: n.signal,
			onUsage: (e) => {
				h = e, a.observeUsage(e);
			}
		});
		return h ??= re((e) => e(p)), a.observeUsage(h), a.checkpoint("model streamed"), await s.reset(), c.terminate(), {
			archive: p,
			result: g,
			usage: h,
			metrics: a,
			closeArchive: () => o?.close((e) => e.free())
		};
	} catch (e) {
		await s?.reset().catch(() => void 0), c?.terminate();
		try {
			o?.close((e) => e.free());
		} catch {}
		let t = p(e) ?? e;
		throw a.fail(t), t;
	}
}
function q(e) {
	if (e?.aborted) throw J();
}
function J() {
	let e = /* @__PURE__ */ Error("DOCX document session was aborted");
	return e.name = "AbortError", e;
}
//#endregion
//#region packages/node/src/docx.ts
var Y = ne(() => g(import.meta.url, "docx_parser_bg.wasm", "@silurus/ooxml-docx/wasm-binary"));
async function X(e, t) {
	if (!t?.factory) throw TypeError("openDocxDocument requires a canvas factory");
	if (t.modelSources !== void 0) {
		let { openDocxSource: n } = await import("./docx-model-source-Oiz6SDcp.js");
		return n(e, t, Y);
	}
	let r = c(t.cjkFallback), i = await K(Q(e), Y(), t, (e, t, n) => s(e, t, n));
	try {
		$(t.signal);
		let e = t.factory.createCanvas(1, 1), a = o(i.result, {
			cjkFallback: r,
			measureContext: e.getContext("2d"),
			allowFootnoteContinuation: t.allowFootnoteContinuation !== !1
		}), s = fe(t.currentDate), c = n(i.result, a, s).layoutVariants.defaultLayout, l = new Z(i.closeArchive, i.archive, i.result, a, c, t.factory, s, i.usage, i.metrics, t.signal);
		return i.metrics.observeUsage(l.resourceUsage), i.metrics.checkpoint("pagination ready"), l;
	} catch (e) {
		try {
			i.closeArchive();
		} catch {}
		let t = m(e) ?? e;
		throw i.metrics.fail(t), t;
	}
}
async function de(e, t = {}) {
	if (t.modelSources !== void 0) {
		let { materializeDocxSource: n } = await import("./docx-model-source-Oiz6SDcp.js");
		return n(e, t, Y);
	}
	return te(async () => {
		let n = await K(Q(e), Y(), t, (e, t, n) => a(e, t, n)), r = !1;
		return {
			acquired: n,
			markSucceeded: () => {
				r = !0;
			},
			close: async () => {
				try {
					n.closeArchive(), r && n.metrics.succeed({ documents: 1 });
				} catch (e) {
					throw n.metrics.fail(e), e;
				}
			}
		};
	}, async ({ acquired: e, markSucceeded: t }) => {
		try {
			let n = i(e.result);
			return e.metrics.checkpoint("document materialized", e.usage), t(), n;
		} catch (t) {
			throw e.metrics.fail(t), t;
		}
	});
}
var Z = class {
	pageCount;
	sizes;
	lastResourceUsage;
	state;
	renderTail = Promise.resolve();
	pagesStarted = !1;
	closed = !1;
	closePromise;
	resourceFailure = null;
	fetchImage = async (e, t) => {
		let n = this.archive.extract_image(e);
		return new Blob([n], { type: t });
	};
	constructor(e, t, n, r, i, a, o, s, c, l) {
		this.closeArchive = e, this.archive = t, this.factory = a, this.defaultCurrentDateMs = o, this.metrics = c, this.signal = l, this.state = {
			source: n,
			services: r
		}, this.pageCount = i.pages.length, this.lastResourceUsage = s, this.sizes = Object.freeze(i.pages.map((e) => Object.freeze({
			widthPt: e.geometry.widthPt,
			heightPt: e.geometry.heightPt
		})));
	}
	get resourceUsage() {
		return this.closed ? this.lastResourceUsage : this.refreshResourceUsage();
	}
	refreshResourceUsage() {
		try {
			this.lastResourceUsage = h(this.archive.resource_usage()), this.metrics.observeUsage(this.lastResourceUsage);
		} catch {}
		return this.lastResourceUsage;
	}
	pageSize(e) {
		let t = this.sizes[e];
		if (!t) throw RangeError(`DOCX page index ${e} out of range`);
		return t;
	}
	[Symbol.asyncIterator]() {
		return this.pages();
	}
	renderPage(e, n = {}) {
		return this.closed ? Promise.reject(/* @__PURE__ */ Error("DOCX document session is closed")) : this.resourceFailure ? Promise.reject(this.resourceFailure) : (this.pageSize(e), this.enqueueRender(async () => {
			$(this.signal);
			let t = this.requireState(), i = this.factory.createCanvas(1, 1);
			return await ae(this.factory, () => r(t.source, i, e, {
				...n,
				currentDate: this.defaultCurrentDateMs,
				defaultCurrentDateMs: this.defaultCurrentDateMs,
				layoutServices: t.services,
				fetchImage: this.fetchImage
			})), $(this.signal), i;
		}).catch((e) => {
			let n = m(e) ?? e;
			throw n instanceof t && (this.resourceFailure ??= n), this.metrics.fail(n), n;
		}));
	}
	async *pages(e = {}) {
		if (this.closed) throw Error("DOCX document session is closed");
		if (this.pagesStarted) throw Error("DOCX page stream is one-pass and was already consumed");
		this.pagesStarted = !0;
		let t;
		try {
			for (let t = 0; t < this.pageCount; t += 1) {
				let n = await this.renderPage(t, e), r = this.pageSize(t);
				yield {
					pageIndex: t,
					...r,
					canvas: n
				};
			}
		} catch (e) {
			throw t = m(e) ?? e, t;
		} finally {
			try {
				await this.close();
			} catch (e) {
				if (t === void 0) throw e;
			}
		}
	}
	close() {
		return this.closePromise ? this.closePromise : (this.refreshResourceUsage(), this.closed = !0, this.closePromise = this.release(), this.closePromise);
	}
	enqueueRender(e) {
		let t = this.renderTail.then(e, e);
		return this.renderTail = t.then(() => void 0, () => void 0), t;
	}
	async release() {
		await this.renderTail, u(this.fetchImage), l(this.fetchImage), this.state = null;
		try {
			this.closeArchive();
		} catch (e) {
			let t = m(e) ?? e;
			throw this.metrics.fail(t), t;
		}
		this.metrics.checkpoint("document session closed", this.lastResourceUsage), this.metrics.succeed({ pages: this.pageCount });
	}
	requireState() {
		if (!this.state) throw Error("DOCX document session is closed");
		return this.state;
	}
};
function fe(e) {
	let t = e instanceof Date ? e.getTime() : e ?? Date.now();
	if (!Number.isFinite(t)) throw RangeError("currentDate must resolve to finite epoch milliseconds");
	return t;
}
function Q(e) {
	return e instanceof Uint8Array ? e : new Uint8Array(e);
}
function $(e) {
	if (!e?.aborted) return;
	let t = /* @__PURE__ */ Error("DOCX document session was aborted");
	throw t.name = "AbortError", t;
}
//#endregion
export { K as i, de as n, X as r, Z as t };
