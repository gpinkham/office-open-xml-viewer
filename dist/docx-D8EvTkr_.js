import { t as e } from "./chunk-D5OxutzX.js";
import { n as t } from "./ooxml-error-DbICW35n.js";
import { m as n } from "./resource-policy.generated-D_HlV2Rm.js";
import { i as r } from "./document-content-BYFtqT7U.js";
import { a as i, c as a, i as o, l as s, r as c } from "./document-pull-client-DIeWNcQH.js";
import { n as l } from "./cjk-fallback-CxqXJu32.js";
import { i as u, l as d } from "./duotone-bitmap-by-path-Ci-q8taI.js";
import { n as f, t as p } from "./abort-JztSoyw2.js";
import { i as m, r as h, t as g } from "./error-wire-DcmmIbXu.js";
import { i as _, n as v, o as ee } from "./resource-debug-BMgDiKq1.js";
import { t as te } from "./bounded-raw-part-cache-TU72wntZ.js";
import { a as y, i as b, n as x, r as S, t as C } from "./wasm-loader-aCVZKhJM.js";
import { t as w } from "./wasm-runtime-generation-DrPM10Ji.js";
import { t as ne } from "./in-process-pull-transport-BPJ7M0uC.js";
import { n as re, r as ie, t as ae } from "./document-pull-worker-DOEUdHOV.js";
import { a as oe } from "./render-DebhM3GH.js";
var se = /* @__PURE__ */ e({
	DocxArchive: () => T,
	default: () => J,
	docx_to_markdown: () => E,
	extract_image: () => D,
	initSync: () => ue,
	parse_docx: () => ce,
	reinit: () => de
}), T = class {
	__destroy_into_raw() {
		let e = this.__wbg_ptr;
		return this.__wbg_ptr = 0, k.unregister(this), e;
	}
	free() {
		let e = this.__destroy_into_raw();
		K.__wbg_docxarchive_free(e, 0);
	}
	acknowledge_document_chunk(e, t, n) {
		let r = K.docxarchive_acknowledge_document_chunk(this.__wbg_ptr, e, t, n);
		if (r[1]) throw z(r[0]);
	}
	assert_healthy() {
		let e = K.docxarchive_assert_healthy(this.__wbg_ptr);
		if (e[1]) throw z(e[0]);
	}
	cancel_document_cursor() {
		K.docxarchive_cancel_document_cursor(this.__wbg_ptr);
	}
	close_document_session() {
		K.docxarchive_close_document_session(this.__wbg_ptr);
	}
	document_chunk_done() {
		let e = K.docxarchive_document_chunk_done(this.__wbg_ptr);
		if (e[2]) throw z(e[1]);
		return e[0] !== 0;
	}
	document_cursor_resource_usage() {
		let e = K.docxarchive_document_cursor_resource_usage(this.__wbg_ptr);
		if (e[3]) throw z(e[2]);
		let t;
		return e[0] !== 0 && (t = A(e[0], e[1]).slice(), K.__wbindgen_free(e[0], e[1] * 1, 1)), t;
	}
	extract_image(e) {
		let t = R(e, K.__wbindgen_malloc, K.__wbindgen_realloc), n = G, r = K.docxarchive_extract_image(this.__wbg_ptr, t, n);
		if (r[3]) throw z(r[2]);
		var i = A(r[0], r[1]).slice();
		return K.__wbindgen_free(r[0], r[1] * 1, 1), i;
	}
	is_picture_part(e) {
		let t = R(e, K.__wbindgen_malloc, K.__wbindgen_realloc), n = G, r = K.docxarchive_is_picture_part(this.__wbg_ptr, t, n);
		if (r[2]) throw z(r[1]);
		return r[0] !== 0;
	}
	constructor(e, t, n, r) {
		let i = L(e, K.__wbindgen_malloc), a = G, o = K.docxarchive_new(i, a, !I(t), I(t) ? BigInt(0) : t, !I(n), I(n) ? BigInt(0) : n, !I(r), I(r) ? BigInt(0) : r);
		if (o[2]) throw z(o[1]);
		return this.__wbg_ptr = o[0] >>> 0, k.register(this, this.__wbg_ptr, this), this;
	}
	open_document_cursor(e, t) {
		let n = K.docxarchive_open_document_cursor(this.__wbg_ptr, e, t);
		if (n[1]) throw z(n[0]);
	}
	parse() {
		let e = K.docxarchive_parse(this.__wbg_ptr);
		if (e[3]) throw z(e[2]);
		var t = A(e[0], e[1]).slice();
		return K.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	pull_document_chunk(e, t, n, r) {
		let i = K.docxarchive_pull_document_chunk(this.__wbg_ptr, e, t, n, r);
		if (i[3]) throw z(i[2]);
		var a = A(i[0], i[1]).slice();
		return K.__wbindgen_free(i[0], i[1] * 1, 1), a;
	}
	resource_usage() {
		let e = K.docxarchive_resource_usage(this.__wbg_ptr);
		if (e[3]) throw z(e[2]);
		var t = A(e[0], e[1]).slice();
		return K.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	to_markdown() {
		let e, t;
		try {
			let i = K.docxarchive_to_markdown(this.__wbg_ptr);
			var n = i[0], r = i[1];
			if (i[3]) throw n = 0, r = 0, z(i[2]);
			return e = n, t = r, N(n, r);
		} finally {
			K.__wbindgen_free(e, t, 1);
		}
	}
};
Symbol.dispose && (T.prototype[Symbol.dispose] = T.prototype.free);
function E(e, t, n) {
	let r, i;
	try {
		let s = L(e, K.__wbindgen_malloc), c = G, l = K.docx_to_markdown(s, c, !I(t), I(t) ? BigInt(0) : t, !I(n), I(n) ? BigInt(0) : n);
		var a = l[0], o = l[1];
		if (l[3]) throw a = 0, o = 0, z(l[2]);
		return r = a, i = o, N(a, o);
	} finally {
		K.__wbindgen_free(r, i, 1);
	}
}
function D(e, t, n, r) {
	let i = L(e, K.__wbindgen_malloc), a = G, o = R(t, K.__wbindgen_malloc, K.__wbindgen_realloc), s = G, c = K.extract_image(i, a, o, s, !I(n), I(n) ? BigInt(0) : n, !I(r), I(r) ? BigInt(0) : r);
	if (c[3]) throw z(c[2]);
	var l = A(c[0], c[1]).slice();
	return K.__wbindgen_free(c[0], c[1] * 1, 1), l;
}
function ce(e, t, n) {
	let r = L(e, K.__wbindgen_malloc), i = G, a = K.parse_docx(r, i, !I(t), I(t) ? BigInt(0) : t, !I(n), I(n) ? BigInt(0) : n);
	if (a[3]) throw z(a[2]);
	var o = A(a[0], a[1]).slice();
	return K.__wbindgen_free(a[0], a[1] * 1, 1), o;
}
function O() {
	return {
		__proto__: null,
		"./docx_parser_bg.js": {
			__proto__: null,
			__wbg___wbindgen_throw_6b64449b9b9ed33c: function(e, t) {
				throw Error(N(e, t));
			},
			__wbg_error_a6fa202b58aa1cd3: function(e, t) {
				let n, r;
				try {
					n = e, r = t, console.error(N(e, t));
				} finally {
					K.__wbindgen_free(n, r, 1);
				}
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ Error();
			},
			__wbg_stack_3b0d974bbf31e44f: function(e, t) {
				let n = t.stack, r = R(n, K.__wbindgen_malloc, K.__wbindgen_realloc), i = G;
				M().setInt32(e + 4, i, !0), M().setInt32(e + 0, r, !0);
			},
			__wbindgen_cast_0000000000000001: function(e, t) {
				return N(e, t);
			},
			__wbindgen_init_externref_table: function() {
				let e = K.__wbindgen_externrefs, t = e.grow(4);
				e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1);
			}
		}
	};
}
var k = typeof FinalizationRegistry > "u" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((e) => K.__wbg_docxarchive_free(e >>> 0, 1));
function A(e, t) {
	return e >>>= 0, F().subarray(e / 1, e / 1 + t);
}
var j = null;
function M() {
	return (j === null || j.buffer.detached === !0 || j.buffer.detached === void 0 && j.buffer !== K.memory.buffer) && (j = new DataView(K.memory.buffer)), j;
}
function N(e, t) {
	return e >>>= 0, U(e, t);
}
var P = null;
function F() {
	return (P === null || P.byteLength === 0) && (P = new Uint8Array(K.memory.buffer)), P;
}
function I(e) {
	return e == null;
}
function L(e, t) {
	let n = t(e.length * 1, 1) >>> 0;
	return F().set(e, n / 1), G = e.length, n;
}
function R(e, t, n) {
	if (n === void 0) {
		let n = W.encode(e), r = t(n.length, 1) >>> 0;
		return F().subarray(r, r + n.length).set(n), G = n.length, r;
	}
	let r = e.length, i = t(r, 1) >>> 0, a = F(), o = 0;
	for (; o < r; o++) {
		let t = e.charCodeAt(o);
		if (t > 127) break;
		a[i + o] = t;
	}
	if (o !== r) {
		o !== 0 && (e = e.slice(o)), i = n(i, r, r = o + e.length * 3, 1) >>> 0;
		let t = F().subarray(i + o, i + r), a = W.encodeInto(e, t);
		o += a.written, i = n(i, r, o, 1) >>> 0;
	}
	return G = o, i;
}
function z(e) {
	let t = K.__wbindgen_externrefs.get(e);
	return K.__externref_table_dealloc(e), t;
}
var B = new TextDecoder("utf-8", {
	ignoreBOM: !0,
	fatal: !0
});
B.decode();
var V = 2146435072, H = 0;
function U(e, t) {
	return H += t, H >= V && (B = new TextDecoder("utf-8", {
		ignoreBOM: !0,
		fatal: !0
	}), B.decode(), H = t), B.decode(F().subarray(e, e + t));
}
var W = new TextEncoder();
"encodeInto" in W || (W.encodeInto = function(e, t) {
	let n = W.encode(e);
	return t.set(n), {
		read: e.length,
		written: n.length
	};
});
var G = 0, K;
function q(e, t) {
	return K = e.exports, j = null, P = null, K.__wbindgen_start(), K;
}
async function le(e, t) {
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
function ue(e) {
	if (K !== void 0) return K;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module: e} = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
	let t = O();
	return e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e)), q(new WebAssembly.Instance(e, t), e);
}
async function J(e) {
	if (K !== void 0) return K;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module_or_path: e} = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead"));
	let t = O();
	(typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
	let { instance: n, module: r } = await le(await e, t);
	return q(n, r);
}
async function de(e) {
	return K = void 0, j = null, P = null, J(e);
}
var Y = "DOCX document session was aborted", fe = w(se, "DOCX");
async function X(e, t, n, r) {
	let i = _(n), a = new v({
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
		f(n.signal, Y);
		let [l, u, d] = ee(i.policy), m = T;
		o = await fe(t).open(() => new m(e, l, u, d), {
			signal: n.signal,
			abortError: () => p(Y),
			disposeOnAbort: (e) => e.free()
		}), f(n.signal, Y);
		let h = o.proxy;
		a.checkpoint("container ready"), s = new ae(() => h);
		let g = {
			sessionId: 1,
			operationId: 1,
			generation: 1
		};
		s.open(g), c = new ne((e, t) => s?.dispatch(e, t), () => void 0);
		let _, v = await r(c, g, {
			signal: n.signal,
			onUsage: (e) => {
				_ = e, a.observeUsage(e);
			}
		});
		return _ ??= re((e) => e(h)), a.observeUsage(_), a.checkpoint("model streamed"), await s.reset(), c.terminate(), {
			archive: h,
			result: v,
			usage: _,
			metrics: a,
			closeArchive: () => o?.close((e) => e.free())
		};
	} catch (e) {
		await s?.reset().catch(() => void 0), c?.terminate();
		try {
			o?.close((e) => e.free());
		} catch {}
		let t = m(e) ?? ie(e);
		throw a.fail(t), t;
	}
}
var Z = "DOCX document session was aborted", Q = C(() => x(import.meta.url, "docx_parser_bg.wasm", "@silurus/ooxml-docx/wasm-binary"));
async function pe(e, t) {
	if (!t?.factory) throw TypeError("openDocxDocument requires a canvas factory");
	if (t.legacyDoc !== void 0 || t.odt !== void 0) {
		let { openDocxSource: n } = await import("./docx-model-source-CPnzsPMD.js");
		return n(e, t, Q);
	}
	let n = l(t.cjkFallback), r = await X(b(e), Q(), t, (e, t, n) => c(e, t, n));
	try {
		f(t.signal, Z);
		let e = t.factory.createCanvas(1, 1), a = s(r.result, {
			cjkFallback: n,
			measureContext: e.getContext("2d"),
			createCanvas: (e, n) => t.factory.createCanvas(e, n),
			allowFootnoteContinuation: t.allowFootnoteContinuation !== !1
		}), o = S(t.currentDate), c = i(r.result, a, o).layoutVariants.defaultLayout, l = new $(r.closeArchive, r.archive, r.result, a, c, t.factory, o, r.usage, r.metrics, t.signal);
		return r.metrics.observeUsage(l.resourceUsage), r.metrics.checkpoint("pagination ready"), l;
	} catch (e) {
		try {
			r.closeArchive();
		} catch {}
		let t = h(e) ?? e;
		throw r.metrics.fail(t), t;
	}
}
async function me(e, t = {}) {
	if (t.legacyDoc !== void 0 || t.odt !== void 0) {
		let { materializeDocxSource: n } = await import("./docx-model-source-CPnzsPMD.js");
		return n(e, t, Q);
	}
	return y(async () => {
		let n = await X(b(e), Q(), t, (e, t, n) => o(e, t, n)), r = !1;
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
			let n = r(e.result);
			return e.metrics.checkpoint("document materialized", e.usage), t(), n;
		} catch (t) {
			throw e.metrics.fail(t), t;
		}
	});
}
var $ = class {
	closeArchive;
	archive;
	factory;
	defaultCurrentDateMs;
	metrics;
	signal;
	pageCount;
	sizes;
	lastResourceUsage;
	state;
	renderTail = Promise.resolve();
	pagesStarted = !1;
	closed = !1;
	closePromise;
	resourceFailure = null;
	rawParts = new te({
		maxEntries: 64,
		maxBytes: n
	});
	fetchImage = (e, t) => this.rawParts.get(e, t, () => {
		if (!this.state) throw Error("DOCX document session is closed");
		f(this.signal, Z);
		let n = this.archive.extract_image(e);
		return this.refreshResourceUsage(), new Blob([n], { type: t });
	});
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
			this.lastResourceUsage = g(this.archive.resource_usage()), this.metrics.observeUsage(this.lastResourceUsage);
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
	async getImage(e, n = "application/octet-stream") {
		this.assertOpen();
		try {
			let t = this.archive.is_picture_part?.(e);
			if (t !== void 0 && this.refreshResourceUsage(), t === !1) throw TypeError(he);
			return await this.fetchImage(e, n);
		} catch (e) {
			let n = h(e) ?? e;
			throw n instanceof t && this.failOperation(n), n;
		}
	}
	renderPage(e, t = {}) {
		try {
			this.assertOpen();
		} catch (e) {
			return Promise.reject(e);
		}
		return this.pageSize(e), this.enqueueRender(async () => {
			f(this.signal, Z);
			let n = this.requireState(), r = this.factory.createCanvas(1, 1);
			return await oe(this.factory, () => a(n.source, r, e, {
				...t,
				currentDate: this.defaultCurrentDateMs,
				defaultCurrentDateMs: this.defaultCurrentDateMs,
				layoutServices: n.services,
				fetchImage: this.fetchImage
			})), f(this.signal, Z), r;
		}).catch((e) => this.failOperation(e));
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
			throw t = h(e) ?? e, t;
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
		await this.renderTail, d(this.fetchImage), u(this.fetchImage), this.rawParts.clear(), this.state = null;
		try {
			this.closeArchive();
		} catch (e) {
			let t = h(e) ?? e;
			throw this.metrics.fail(t), t;
		}
		this.metrics.checkpoint("document session closed", this.lastResourceUsage), this.metrics.succeed({ pages: this.pageCount });
	}
	assertOpen() {
		if (this.closed) throw Error("DOCX document session is closed");
		if (this.resourceFailure) throw this.resourceFailure;
	}
	failOperation(e) {
		let n = h(e) ?? e;
		throw n instanceof t && (this.resourceFailure ??= n), this.metrics.fail(n), n;
	}
	requireState() {
		if (!this.state) throw Error("DOCX document session is closed");
		return this.state;
	}
}, he = "DOCX getImage(): the path does not name a picture part (a part whose content type is image/*)";
export { X as i, me as n, pe as r, $ as t };
