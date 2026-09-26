import { t as e } from "./chunk-DmhlhrBa.js";
import { F as t, G as n, H as r, Jt as i, K as a, L as o, N as s, P as c, V as l, W as u, Yt as d, dn as f, en as p, ft as m, lt as h, z as g } from "./hyperlink-BDaF40fS.js";
import { t as ee } from "./bounded-raw-part-cache-lw607spG.js";
import { a as te, c as ne, i as re, l as ie, r as ae, u as oe } from "./document-pull-client-IxiN0T-J.js";
import { n as se } from "./cjk-fallback-D--USve7.js";
import { l as ce, s as le } from "./pixel-budget-DEZjGJ9f.js";
import { t as ue } from "./slide-pull-client-D70B9h9u.js";
import { t as de } from "./transfer-DWlW3J4E.js";
import { c as fe, d as pe, f as me, l as he, o as ge, r as _e, s as ve, t as ye, u as be } from "./worksheet-pull-client-D_QgAVbo.js";
import { a as xe, i as Se, n as Ce, r as we } from "./session-gj5cntj4.js";
import { a as Te, n as Ee, r as De, t as Oe } from "./render-ChZCkr8u.js";
import { existsSync as ke, readFileSync as Ae } from "node:fs";
import { fileURLToPath as je } from "node:url";
import { basename as Me, dirname as Ne, resolve as Pe } from "node:path";
import { createRequire as Fe } from "node:module";
//#region packages/core/src/internal/owned-session.ts
async function _(e, t) {
	let n = await e(), r;
	try {
		return await t(n);
	} catch (e) {
		throw r = e, e;
	} finally {
		try {
			await n.close();
		} catch (e) {
			if (r === void 0) throw e;
		}
	}
}
//#endregion
//#region packages/core/src/internal/in-process-pull-transport.ts
var v = class {
	nextRequestId = 1;
	terminated = !1;
	constructor(e, t) {
		this.dispatch = e, this.terminateHost = t;
	}
	async request(e, t, n) {
		if (this.terminated) throw Error("pull transport terminated");
		if (n?.signal?.aborted) {
			n.onCancel?.(this.nextRequestId, "abort");
			let e = /* @__PURE__ */ Error("worker request aborted");
			throw e.name = "AbortError", e;
		}
		let r = e(this.nextRequestId++), i;
		if (await this.dispatch(r, (e) => {
			i = e;
		}), i === void 0) throw Error("in-process pull host did not respond");
		return i;
	}
	forgetOrphaned(e) {}
	terminate() {
		this.terminated || (this.terminated = !0, this.terminateHost());
	}
};
//#endregion
//#region packages/node/src/wasm-loader.ts
function Ie(e) {
	return new WebAssembly.Module(Ae(e));
}
function y(e, t = Ie) {
	let n = {};
	return () => n.value ??= t(e());
}
function b(e, t, n) {
	let r = Ne(je(e)), i = Pe(r, t);
	if (ke(i)) return i;
	let a = Pe(r, Me(t));
	return ke(a) || !n ? a : Fe(e).resolve(n);
}
//#endregion
//#region packages/node/src/pptx.ts
var Le = y(() => b(import.meta.url, "pptx_parser_bg.wasm", "@silurus/ooxml-pptx/wasm-binary"));
async function Re(e, t = {}) {
	return ze(e, t);
}
async function ze(e, t = {}) {
	let n = se(t.cjkFallback), r = await Ce(He(e), Le(), t);
	return new Be(r.closeArchive, r.archive, r.bootstrap, r.metrics, t.signal, n);
}
var Be = class {
	slideCount;
	slideWidth;
	slideHeight;
	slidePull;
	slideClient;
	transport;
	started = !1;
	closed = !1;
	closePromise;
	usage;
	consumedSlides = 0;
	resourceFailure;
	renderTail = Promise.resolve();
	fetchImage = (e, t) => this.getPartInternal(e, t, (t) => t.extract_image(e));
	fetchMedia = (e) => this.getPartInternal(e, "application/octet-stream", (t) => t.extract_media(e));
	rawParts = new ee({
		maxEntries: 64,
		maxBytes: p
	});
	constructor(e, t, n, r, i, a) {
		this.closeArchive = e, this.archive = t, this.bootstrap = n, this.metrics = r, this.signal = i, this.cjkFallback = a, this.slideCount = n.slideCount, this.slideWidth = n.slideWidth, this.slideHeight = n.slideHeight, this.slidePull = new Se(() => this.archive), this.transport = new v((e, t) => this.slidePull.dispatchSafely(e, t), () => void 0), this.slideClient = new ue({
			slideCount: this.slideCount,
			transport: this.transport,
			open: async (e, t) => {
				this.slidePull.reserveOpen(t), await this.slidePull.open(e, t);
			},
			onUsage: (e) => {
				this.usage = e, this.metrics.observeUsage(e);
			}
		});
	}
	materialize(e) {
		return {
			slideWidth: this.slideWidth,
			slideHeight: this.slideHeight,
			slides: e,
			defaultTextColor: this.bootstrap.defaultTextColor,
			majorFont: this.bootstrap.majorFont,
			minorFont: this.bootstrap.minorFont,
			...this.bootstrap.hlinkColor ? { hlinkColor: this.bootstrap.hlinkColor } : {},
			...this.bootstrap.folHlinkColor ? { folHlinkColor: this.bootstrap.folHlinkColor } : {}
		};
	}
	get resourceUsage() {
		return this.closed ? this.usage : this.refreshResourceUsage();
	}
	async getImage(e, t) {
		return this.assertOpen(), this.getPartInternal(e, t, (t) => t.extract_image(e)).catch((e) => this.failOperation(e));
	}
	async getMedia(e, t = "application/octet-stream") {
		return this.assertOpen(), this.getPartInternal(e, t, (t) => t.extract_media(e)).catch((e) => this.failOperation(e));
	}
	async renderSlide(e, t, n) {
		return this.assertOpen(), this.enqueueRender(async () => {
			x(this.signal);
			let { renderSlideNode: r } = await import("./render-ChZCkr8u.js").then((e) => e.i);
			await r(e, {
				slideWidth: this.slideWidth,
				slideHeight: this.slideHeight,
				slides: [t],
				defaultTextColor: this.bootstrap.defaultTextColor,
				majorFont: this.bootstrap.majorFont,
				minorFont: this.bootstrap.minorFont,
				...this.bootstrap.hlinkColor ? { hlinkColor: this.bootstrap.hlinkColor } : {},
				...this.bootstrap.folHlinkColor ? { folHlinkColor: this.bootstrap.folHlinkColor } : {}
			}, 0, {
				...n,
				cjkFallback: this.cjkFallback,
				fetchImage: this.fetchImage,
				fetchMedia: this.fetchMedia
			}), x(this.signal);
		}).catch((e) => this.failOperation(e));
	}
	[Symbol.asyncIterator]() {
		return this.slides();
	}
	async *slides() {
		if (this.closed) throw Error("PPTX presentation session is closed");
		if (this.started) throw Error("PPTX presentation session is one-pass and was already consumed");
		this.started = !0;
		let e;
		try {
			for (let e = 0; e < this.slideCount; e += 1) {
				x(this.signal);
				let t = await this.slideClient.load(e);
				if (!t) throw Error(`PPTX slide ${e} was not decoded`);
				this.usage ??= await this.slidePull.run(() => xe((e) => e(this.archive))), this.metrics.observeUsage(this.usage), this.consumedSlides = e + 1, yield t;
			}
		} catch (t) {
			throw e = u(t) ?? t, this.metrics.fail(e), e;
		} finally {
			try {
				await this.close();
			} catch (t) {
				if (e === void 0) throw t;
			}
		}
	}
	close() {
		return this.closePromise ? this.closePromise : (this.closed = !0, this.slideClient.cancelAll(), this.closePromise = this.release(), this.closePromise);
	}
	async release() {
		let e;
		await this.renderTail, m(this.fetchImage), h(this.fetchImage);
		try {
			await this.slidePull.reset();
		} catch (t) {
			e = u(t) ?? t;
		}
		this.transport.terminate(), this.rawParts.clear();
		try {
			this.closeArchive();
		} catch (t) {
			e ??= u(t) ?? t;
		}
		if (e !== void 0) throw this.metrics.fail(e), e;
		this.metrics.checkpoint("presentation session closed"), this.metrics.succeed({ slides: this.consumedSlides });
	}
	enqueueRender(e) {
		let t = this.renderTail.then(e, e);
		return this.renderTail = t.then(() => void 0, () => void 0), t;
	}
	getPartInternal(e, t, n) {
		return this.rawParts.get(e, t, () => {
			x(this.signal);
			let e = n(this.archive);
			return this.refreshResourceUsage(), new Blob([e], { type: t });
		});
	}
	refreshResourceUsage() {
		try {
			this.usage = r(this.archive.resource_usage()), this.metrics.observeUsage(this.usage);
		} catch {}
		return this.usage;
	}
	assertOpen() {
		if (this.closed) throw Error("PPTX presentation session is closed");
		if (this.resourceFailure) throw this.resourceFailure;
	}
	failOperation(e) {
		let t = u(e) ?? e;
		throw t instanceof f && (this.resourceFailure ??= t), this.metrics.fail(t), t;
	}
};
async function Ve(e, t = {}) {
	return _(() => ze(e, t), async (e) => {
		let t = [];
		for await (let n of e.slides()) t.push(n);
		return e.materialize(t);
	});
}
function He(e) {
	return e instanceof Uint8Array ? e : new Uint8Array(e);
}
function x(e) {
	if (!e?.aborted) return;
	let t = /* @__PURE__ */ Error("PPTX presentation session was aborted");
	throw t.name = "AbortError", t;
}
//#endregion
//#region packages/docx/src/document-pull-worker.ts
function Ue(e) {
	try {
		let t = e((e) => e.document_cursor_resource_usage?.());
		return t ? r(t) : void 0;
	} catch (e) {
		if (String(e).includes("document cursor usage is unavailable")) return;
		throw e;
	}
}
var We = Math.max(i, d), Ge = class {
	coordinator = new t();
	host = null;
	identity = null;
	constructor(e, t = (e) => e(this.requireArchive())) {
		this.archive = e, this.executeArchive = t;
	}
	open(e) {
		if (this.host) throw Error("a DOCX document pull session is already active");
		this.executeArchive((t) => {
			t.open_document_cursor(e.operationId, e.generation);
		});
		let t = 0;
		this.identity = e, this.host = new c({
			...e,
			maxByteCredit: We,
			coordinator: this.coordinator,
			driver: {
				pull: (n) => {
					let r;
					try {
						r = this.executeArchive((r) => r.pull_document_chunk(t, e.operationId, e.generation, n));
					} catch (e) {
						throw a(e, n, We) || e;
					}
					let i = de(r);
					return {
						payload: i,
						byteLength: i.byteLength,
						done: this.executeArchive((e) => e.document_chunk_done()),
						transfer: [i]
					};
				},
				measureChunk: ({ payload: e }) => e.byteLength,
				acknowledge: (n) => {
					if (n !== t) throw Error("DOCX document acknowledgement sequence mismatch");
					this.executeArchive((n) => n.acknowledge_document_chunk(t, e.operationId, e.generation)), t += 1;
				},
				cancel: () => this.executeArchive((e) => e.cancel_document_cursor()),
				close: () => this.executeArchive((e) => e.close_document_session()),
				resourceUsage: () => Ue(this.executeArchive)
			}
		});
	}
	dispatch(e, t) {
		return !this.host || !this.identity ? (t({
			protocol: s,
			kind: "error",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			error: n(/* @__PURE__ */ Error("DOCX document pull session is not open"))
		}), Promise.resolve()) : this.host.dispatch(e, t);
	}
	async reset() {
		if (this.host) try {
			this.archive() && this.executeArchive((e) => e.close_document_session());
		} finally {
			this.host = null, this.identity = null, this.coordinator = new t();
		}
	}
	requireArchive() {
		let e = this.archive();
		if (!e) throw Error("No docx loaded");
		return e;
	}
}, Ke = /* @__PURE__ */ e({
	DocxArchive: () => S,
	default: () => at,
	docx_to_markdown: () => qe,
	extract_image: () => Je,
	initSync: () => it,
	parse_docx: () => Ye,
	reinit: () => ot
}), S = class {
	__destroy_into_raw() {
		let e = this.__wbg_ptr;
		return this.__wbg_ptr = 0, Ze.unregister(this), e;
	}
	free() {
		let e = this.__destroy_into_raw();
		F.__wbg_docxarchive_free(e, 0);
	}
	acknowledge_document_chunk(e, t, n) {
		let r = F.docxarchive_acknowledge_document_chunk(this.__wbg_ptr, e, t, n);
		if (r[1]) throw j(r[0]);
	}
	assert_healthy() {
		let e = F.docxarchive_assert_healthy(this.__wbg_ptr);
		if (e[1]) throw j(e[0]);
	}
	cancel_document_cursor() {
		F.docxarchive_cancel_document_cursor(this.__wbg_ptr);
	}
	close_document_session() {
		F.docxarchive_close_document_session(this.__wbg_ptr);
	}
	document_chunk_done() {
		let e = F.docxarchive_document_chunk_done(this.__wbg_ptr);
		if (e[2]) throw j(e[1]);
		return e[0] !== 0;
	}
	document_cursor_resource_usage() {
		let e = F.docxarchive_document_cursor_resource_usage(this.__wbg_ptr);
		if (e[3]) throw j(e[2]);
		var t = C(e[0], e[1]).slice();
		return F.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	extract_image(e) {
		let t = A(e, F.__wbindgen_malloc, F.__wbindgen_realloc), n = P, r = F.docxarchive_extract_image(this.__wbg_ptr, t, n);
		if (r[3]) throw j(r[2]);
		var i = C(r[0], r[1]).slice();
		return F.__wbindgen_free(r[0], r[1] * 1, 1), i;
	}
	constructor(e, t, n, r) {
		let i = k(e, F.__wbindgen_malloc), a = P, o = F.docxarchive_new(i, a, !O(t), O(t) ? BigInt(0) : t, !O(n), O(n) ? BigInt(0) : n, !O(r), O(r) ? BigInt(0) : r);
		if (o[2]) throw j(o[1]);
		return this.__wbg_ptr = o[0] >>> 0, Ze.register(this, this.__wbg_ptr, this), this;
	}
	open_document_cursor(e, t) {
		let n = F.docxarchive_open_document_cursor(this.__wbg_ptr, e, t);
		if (n[1]) throw j(n[0]);
	}
	parse() {
		let e = F.docxarchive_parse(this.__wbg_ptr);
		if (e[3]) throw j(e[2]);
		var t = C(e[0], e[1]).slice();
		return F.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	pull_document_chunk(e, t, n, r) {
		let i = F.docxarchive_pull_document_chunk(this.__wbg_ptr, e, t, n, r);
		if (i[3]) throw j(i[2]);
		var a = C(i[0], i[1]).slice();
		return F.__wbindgen_free(i[0], i[1] * 1, 1), a;
	}
	resource_usage() {
		let e = F.docxarchive_resource_usage(this.__wbg_ptr);
		if (e[3]) throw j(e[2]);
		var t = C(e[0], e[1]).slice();
		return F.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	to_markdown() {
		let e, t;
		try {
			let i = F.docxarchive_to_markdown(this.__wbg_ptr);
			var n = i[0], r = i[1];
			if (i[3]) throw n = 0, r = 0, j(i[2]);
			return e = n, t = r, T(n, r);
		} finally {
			F.__wbindgen_free(e, t, 1);
		}
	}
};
Symbol.dispose && (S.prototype[Symbol.dispose] = S.prototype.free);
function qe(e, t, n) {
	let r, i;
	try {
		let s = k(e, F.__wbindgen_malloc), c = P, l = F.docx_to_markdown(s, c, !O(t), O(t) ? BigInt(0) : t, !O(n), O(n) ? BigInt(0) : n);
		var a = l[0], o = l[1];
		if (l[3]) throw a = 0, o = 0, j(l[2]);
		return r = a, i = o, T(a, o);
	} finally {
		F.__wbindgen_free(r, i, 1);
	}
}
function Je(e, t, n, r) {
	let i = k(e, F.__wbindgen_malloc), a = P, o = A(t, F.__wbindgen_malloc, F.__wbindgen_realloc), s = P, c = F.extract_image(i, a, o, s, !O(n), O(n) ? BigInt(0) : n, !O(r), O(r) ? BigInt(0) : r);
	if (c[3]) throw j(c[2]);
	var l = C(c[0], c[1]).slice();
	return F.__wbindgen_free(c[0], c[1] * 1, 1), l;
}
function Ye(e, t, n) {
	let r = k(e, F.__wbindgen_malloc), i = P, a = F.parse_docx(r, i, !O(t), O(t) ? BigInt(0) : t, !O(n), O(n) ? BigInt(0) : n);
	if (a[3]) throw j(a[2]);
	var o = C(a[0], a[1]).slice();
	return F.__wbindgen_free(a[0], a[1] * 1, 1), o;
}
function Xe() {
	return {
		__proto__: null,
		"./docx_parser_bg.js": {
			__proto__: null,
			__wbg___wbindgen_throw_6b64449b9b9ed33c: function(e, t) {
				throw Error(T(e, t));
			},
			__wbg_error_a6fa202b58aa1cd3: function(e, t) {
				let n, r;
				try {
					n = e, r = t, console.error(T(e, t));
				} finally {
					F.__wbindgen_free(n, r, 1);
				}
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ Error();
			},
			__wbg_stack_3b0d974bbf31e44f: function(e, t) {
				let n = t.stack, r = A(n, F.__wbindgen_malloc, F.__wbindgen_realloc), i = P;
				Qe().setInt32(e + 4, i, !0), Qe().setInt32(e + 0, r, !0);
			},
			__wbindgen_cast_0000000000000001: function(e, t) {
				return T(e, t);
			},
			__wbindgen_init_externref_table: function() {
				let e = F.__wbindgen_externrefs, t = e.grow(4);
				e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1);
			}
		}
	};
}
var Ze = typeof FinalizationRegistry > "u" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((e) => F.__wbg_docxarchive_free(e >>> 0, 1));
function C(e, t) {
	return e >>>= 0, D().subarray(e / 1, e / 1 + t);
}
var w = null;
function Qe() {
	return (w === null || w.buffer.detached === !0 || w.buffer.detached === void 0 && w.buffer !== F.memory.buffer) && (w = new DataView(F.memory.buffer)), w;
}
function T(e, t) {
	return e >>>= 0, tt(e, t);
}
var E = null;
function D() {
	return (E === null || E.byteLength === 0) && (E = new Uint8Array(F.memory.buffer)), E;
}
function O(e) {
	return e == null;
}
function k(e, t) {
	let n = t(e.length * 1, 1) >>> 0;
	return D().set(e, n / 1), P = e.length, n;
}
function A(e, t, n) {
	if (n === void 0) {
		let n = N.encode(e), r = t(n.length, 1) >>> 0;
		return D().subarray(r, r + n.length).set(n), P = n.length, r;
	}
	let r = e.length, i = t(r, 1) >>> 0, a = D(), o = 0;
	for (; o < r; o++) {
		let t = e.charCodeAt(o);
		if (t > 127) break;
		a[i + o] = t;
	}
	if (o !== r) {
		o !== 0 && (e = e.slice(o)), i = n(i, r, r = o + e.length * 3, 1) >>> 0;
		let t = D().subarray(i + o, i + r), a = N.encodeInto(e, t);
		o += a.written, i = n(i, r, o, 1) >>> 0;
	}
	return P = o, i;
}
function j(e) {
	let t = F.__wbindgen_externrefs.get(e);
	return F.__externref_table_dealloc(e), t;
}
var M = new TextDecoder("utf-8", {
	ignoreBOM: !0,
	fatal: !0
});
M.decode();
var $e = 2146435072, et = 0;
function tt(e, t) {
	return et += t, et >= $e && (M = new TextDecoder("utf-8", {
		ignoreBOM: !0,
		fatal: !0
	}), M.decode(), et = t), M.decode(D().subarray(e, e + t));
}
var N = new TextEncoder();
"encodeInto" in N || (N.encodeInto = function(e, t) {
	let n = N.encode(e);
	return t.set(n), {
		read: e.length,
		written: n.length
	};
});
var P = 0, F;
function nt(e, t) {
	return F = e.exports, w = null, E = null, F.__wbindgen_start(), F;
}
async function rt(e, t) {
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
function it(e) {
	if (F !== void 0) return F;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module: e} = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
	let t = Xe();
	return e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e)), nt(new WebAssembly.Instance(e, t), e);
}
async function at(e) {
	if (F !== void 0) return F;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module_or_path: e} = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead"));
	let t = Xe();
	(typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
	let { instance: n, module: r } = await rt(await e, t);
	return nt(n, r);
}
async function ot(e) {
	return F = void 0, w = null, E = null, at(e);
}
//#endregion
//#region packages/docx/src/internal/node-acquisition.ts
var st, I;
function ct(e) {
	if (!I) st = e, I = new we(Ke, e);
	else if (st !== e) throw Error("DOCX runtime was already initialized with another WebAssembly.Module");
	return I;
}
async function lt(e, t, n, r) {
	let i = g(n), a = new o({
		enabled: i.debug || i.onResourceMetrics !== void 0,
		format: "docx",
		mode: "node",
		scope: "session",
		policy: i.policy,
		onMetrics: i.onResourceMetrics,
		emitToConsole: i.debug
	});
	a.setSourceBytes(e.byteLength);
	let s, c, d;
	try {
		ut(n.signal);
		let [o, u, f] = l(i.policy), p = S;
		s = await ct(t).open(() => new p(e, o, u, f), {
			signal: n.signal,
			abortError: dt,
			disposeOnAbort: (e) => e.free()
		}), ut(n.signal);
		let m = s.proxy;
		a.checkpoint("container ready"), c = new Ge(() => m);
		let h = {
			sessionId: 1,
			operationId: 1,
			generation: 1
		};
		c.open(h), d = new v((e, t) => c?.dispatch(e, t), () => void 0);
		let g, ee = await r(d, h, {
			signal: n.signal,
			onUsage: (e) => {
				g = e, a.observeUsage(e);
			}
		});
		return g ??= Ue((e) => e(m)), a.observeUsage(g), a.checkpoint("model streamed"), await c.reset(), d.terminate(), {
			archive: m,
			result: ee,
			usage: g,
			metrics: a,
			closeArchive: () => s?.close((e) => e.free())
		};
	} catch (e) {
		await c?.reset().catch(() => void 0), d?.terminate();
		try {
			s?.close((e) => e.free());
		} catch {}
		let t = u(e) ?? e;
		throw a.fail(t), t;
	}
}
function ut(e) {
	if (e?.aborted) throw dt();
}
function dt() {
	let e = /* @__PURE__ */ Error("DOCX document session was aborted");
	return e.name = "AbortError", e;
}
//#endregion
//#region packages/node/src/docx.ts
var ft = y(() => b(import.meta.url, "docx_parser_bg.wasm", "@silurus/ooxml-docx/wasm-binary"));
async function pt(e, t) {
	if (!t?.factory) throw TypeError("openDocxDocument requires a canvas factory");
	let n = se(t.cjkFallback), r = await lt(_t(e), ft(), t, (e, t, n) => ae(e, t, n));
	try {
		L(t.signal);
		let e = t.factory.createCanvas(1, 1), i = ie(r.result, {
			cjkFallback: n,
			measureContext: e.getContext("2d")
		}), a = gt(t.currentDate), o = te(r.result, i, a).layoutVariants.defaultLayout, s = new ht(r.closeArchive, r.archive, r.result, i, o, t.factory, a, r.usage, r.metrics, t.signal);
		return r.metrics.observeUsage(s.resourceUsage), r.metrics.checkpoint("pagination ready"), s;
	} catch (e) {
		try {
			r.closeArchive();
		} catch {}
		let t = u(e) ?? e;
		throw r.metrics.fail(t), t;
	}
}
async function mt(e, t = {}) {
	return _(async () => {
		let n = await lt(_t(e), ft(), t, (e, t, n) => re(e, t, n)), r = !1;
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
			let n = oe(e.result);
			return e.metrics.checkpoint("document materialized", e.usage), t(), n;
		} catch (t) {
			throw e.metrics.fail(t), t;
		}
	});
}
var ht = class {
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
			this.lastResourceUsage = r(this.archive.resource_usage()), this.metrics.observeUsage(this.lastResourceUsage);
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
	renderPage(e, t = {}) {
		return this.closed ? Promise.reject(/* @__PURE__ */ Error("DOCX document session is closed")) : this.resourceFailure ? Promise.reject(this.resourceFailure) : (this.pageSize(e), this.enqueueRender(async () => {
			L(this.signal);
			let n = this.requireState(), r = this.factory.createCanvas(1, 1);
			return await Te(this.factory, () => ne(n.source, r, e, {
				...t,
				currentDate: this.defaultCurrentDateMs,
				defaultCurrentDateMs: this.defaultCurrentDateMs,
				layoutServices: n.services,
				fetchImage: this.fetchImage
			})), L(this.signal), r;
		}).catch((e) => {
			let t = u(e) ?? e;
			throw t instanceof f && (this.resourceFailure ??= t), this.metrics.fail(t), t;
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
			throw t = u(e) ?? e, t;
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
		await this.renderTail, m(this.fetchImage), h(this.fetchImage), this.state = null;
		try {
			this.closeArchive();
		} catch (e) {
			let t = u(e) ?? e;
			throw this.metrics.fail(t), t;
		}
		this.metrics.checkpoint("document session closed", this.lastResourceUsage), this.metrics.succeed({ pages: this.pageCount });
	}
	requireState() {
		if (!this.state) throw Error("DOCX document session is closed");
		return this.state;
	}
};
function gt(e) {
	let t = e instanceof Date ? e.getTime() : e ?? Date.now();
	if (!Number.isFinite(t)) throw RangeError("currentDate must resolve to finite epoch milliseconds");
	return t;
}
function _t(e) {
	return e instanceof Uint8Array ? e : new Uint8Array(e);
}
function L(e) {
	if (!e?.aborted) return;
	let t = /* @__PURE__ */ Error("DOCX document session was aborted");
	throw t.name = "AbortError", t;
}
//#endregion
//#region packages/xlsx/src/internal/archive-bootstrap.ts
var vt = "xlsx resource usage is unavailable";
function yt(e, t) {
	let n = e();
	try {
		return {
			workbook: n,
			usage: r(t())
		};
	} catch (e) {
		if ((e instanceof Error ? e.message : String(e)) === vt) return {
			workbook: n,
			usage: void 0
		};
		throw e;
	}
}
//#endregion
//#region packages/xlsx/src/wasm/xlsx_parser.js
var bt = /* @__PURE__ */ e({
	XlsxArchive: () => R,
	default: () => Mt,
	extract_image: () => xt,
	initSync: () => jt,
	parse_xlsx: () => St,
	reinit: () => Nt,
	xlsx_to_markdown: () => Ct
}), R = class {
	__destroy_into_raw() {
		let e = this.__wbg_ptr;
		return this.__wbg_ptr = 0, Tt.unregister(this), e;
	}
	free() {
		let e = this.__destroy_into_raw();
		Q.__wbg_xlsxarchive_free(e, 0);
	}
	acknowledge_sheet_cursor_terminal() {
		let e = Q.xlsxarchive_acknowledge_sheet_cursor_terminal(this.__wbg_ptr);
		if (e[1]) throw q(e[0]);
	}
	assert_healthy() {
		let e = Q.xlsxarchive_assert_healthy(this.__wbg_ptr);
		if (e[1]) throw q(e[0]);
	}
	cancel_sheet_cursor() {
		Q.xlsxarchive_cancel_sheet_cursor(this.__wbg_ptr);
	}
	close_sheet_cursor() {
		Q.xlsxarchive_close_sheet_cursor(this.__wbg_ptr);
	}
	extract_image(e) {
		let t = K(e, Q.__wbindgen_malloc, Q.__wbindgen_realloc), n = Z, r = Q.xlsxarchive_extract_image(this.__wbg_ptr, t, n);
		if (r[3]) throw q(r[2]);
		var i = z(r[0], r[1]).slice();
		return Q.__wbindgen_free(r[0], r[1] * 1, 1), i;
	}
	constructor(e, t, n, r) {
		let i = G(e, Q.__wbindgen_malloc), a = Z, o = Q.xlsxarchive_new(i, a, !W(t), W(t) ? BigInt(0) : t, !W(n), W(n) ? BigInt(0) : n, !W(r), W(r) ? BigInt(0) : r);
		if (o[2]) throw q(o[1]);
		return this.__wbg_ptr = o[0] >>> 0, Tt.register(this, this.__wbg_ptr, this), this;
	}
	open_sheet_cursor(e, t) {
		let n = K(t, Q.__wbindgen_malloc, Q.__wbindgen_realloc), r = Z, i = Q.xlsxarchive_open_sheet_cursor(this.__wbg_ptr, e, n, r);
		if (i[1]) throw q(i[0]);
	}
	parse() {
		let e = Q.xlsxarchive_parse(this.__wbg_ptr);
		if (e[3]) throw q(e[2]);
		var t = z(e[0], e[1]).slice();
		return Q.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	pull_sheet_cursor(e) {
		let t = Q.xlsxarchive_pull_sheet_cursor(this.__wbg_ptr, e);
		if (t[3]) throw q(t[2]);
		var n = z(t[0], t[1]).slice();
		return Q.__wbindgen_free(t[0], t[1] * 1, 1), n;
	}
	resource_usage() {
		let e = Q.xlsxarchive_resource_usage(this.__wbg_ptr);
		if (e[3]) throw q(e[2]);
		var t = z(e[0], e[1]).slice();
		return Q.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	sheet_cursor_pull_finished() {
		return Q.xlsxarchive_sheet_cursor_pull_finished(this.__wbg_ptr) !== 0;
	}
	sheet_cursor_resource_usage() {
		let e = Q.xlsxarchive_sheet_cursor_resource_usage(this.__wbg_ptr);
		if (e[3]) throw q(e[2]);
		var t = z(e[0], e[1]).slice();
		return Q.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	to_markdown() {
		let e, t;
		try {
			let i = Q.xlsxarchive_to_markdown(this.__wbg_ptr);
			var n = i[0], r = i[1];
			if (i[3]) throw n = 0, r = 0, q(i[2]);
			return e = n, t = r, V(n, r);
		} finally {
			Q.__wbindgen_free(e, t, 1);
		}
	}
};
Symbol.dispose && (R.prototype[Symbol.dispose] = R.prototype.free);
function xt(e, t, n, r) {
	let i = G(e, Q.__wbindgen_malloc), a = Z, o = K(t, Q.__wbindgen_malloc, Q.__wbindgen_realloc), s = Z, c = Q.extract_image(i, a, o, s, !W(n), W(n) ? BigInt(0) : n, !W(r), W(r) ? BigInt(0) : r);
	if (c[3]) throw q(c[2]);
	var l = z(c[0], c[1]).slice();
	return Q.__wbindgen_free(c[0], c[1] * 1, 1), l;
}
function St(e, t, n) {
	let r = G(e, Q.__wbindgen_malloc), i = Z, a = Q.parse_xlsx(r, i, !W(t), W(t) ? BigInt(0) : t, !W(n), W(n) ? BigInt(0) : n);
	if (a[3]) throw q(a[2]);
	var o = z(a[0], a[1]).slice();
	return Q.__wbindgen_free(a[0], a[1] * 1, 1), o;
}
function Ct(e, t, n) {
	let r, i;
	try {
		let s = G(e, Q.__wbindgen_malloc), c = Z, l = Q.xlsx_to_markdown(s, c, !W(t), W(t) ? BigInt(0) : t, !W(n), W(n) ? BigInt(0) : n);
		var a = l[0], o = l[1];
		if (l[3]) throw a = 0, o = 0, q(l[2]);
		return r = a, i = o, V(a, o);
	} finally {
		Q.__wbindgen_free(r, i, 1);
	}
}
function wt() {
	return {
		__proto__: null,
		"./xlsx_parser_bg.js": {
			__proto__: null,
			__wbg___wbindgen_throw_6b64449b9b9ed33c: function(e, t) {
				throw Error(V(e, t));
			},
			__wbg_error_a6fa202b58aa1cd3: function(e, t) {
				let n, r;
				try {
					n = e, r = t, console.error(V(e, t));
				} finally {
					Q.__wbindgen_free(n, r, 1);
				}
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ Error();
			},
			__wbg_stack_3b0d974bbf31e44f: function(e, t) {
				let n = t.stack, r = K(n, Q.__wbindgen_malloc, Q.__wbindgen_realloc), i = Z;
				Et().setInt32(e + 4, i, !0), Et().setInt32(e + 0, r, !0);
			},
			__wbindgen_cast_0000000000000001: function(e, t) {
				return V(e, t);
			},
			__wbindgen_init_externref_table: function() {
				let e = Q.__wbindgen_externrefs, t = e.grow(4);
				e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1);
			}
		}
	};
}
var Tt = typeof FinalizationRegistry > "u" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((e) => Q.__wbg_xlsxarchive_free(e >>> 0, 1));
function z(e, t) {
	return e >>>= 0, U().subarray(e / 1, e / 1 + t);
}
var B = null;
function Et() {
	return (B === null || B.buffer.detached === !0 || B.buffer.detached === void 0 && B.buffer !== Q.memory.buffer) && (B = new DataView(Q.memory.buffer)), B;
}
function V(e, t) {
	return e >>>= 0, Ot(e, t);
}
var H = null;
function U() {
	return (H === null || H.byteLength === 0) && (H = new Uint8Array(Q.memory.buffer)), H;
}
function W(e) {
	return e == null;
}
function G(e, t) {
	let n = t(e.length * 1, 1) >>> 0;
	return U().set(e, n / 1), Z = e.length, n;
}
function K(e, t, n) {
	if (n === void 0) {
		let n = X.encode(e), r = t(n.length, 1) >>> 0;
		return U().subarray(r, r + n.length).set(n), Z = n.length, r;
	}
	let r = e.length, i = t(r, 1) >>> 0, a = U(), o = 0;
	for (; o < r; o++) {
		let t = e.charCodeAt(o);
		if (t > 127) break;
		a[i + o] = t;
	}
	if (o !== r) {
		o !== 0 && (e = e.slice(o)), i = n(i, r, r = o + e.length * 3, 1) >>> 0;
		let t = U().subarray(i + o, i + r), a = X.encodeInto(e, t);
		o += a.written, i = n(i, r, o, 1) >>> 0;
	}
	return Z = o, i;
}
function q(e) {
	let t = Q.__wbindgen_externrefs.get(e);
	return Q.__externref_table_dealloc(e), t;
}
var J = new TextDecoder("utf-8", {
	ignoreBOM: !0,
	fatal: !0
});
J.decode();
var Dt = 2146435072, Y = 0;
function Ot(e, t) {
	return Y += t, Y >= Dt && (J = new TextDecoder("utf-8", {
		ignoreBOM: !0,
		fatal: !0
	}), J.decode(), Y = t), J.decode(U().subarray(e, e + t));
}
var X = new TextEncoder();
"encodeInto" in X || (X.encodeInto = function(e, t) {
	let n = X.encode(e);
	return t.set(n), {
		read: e.length,
		written: n.length
	};
});
var Z = 0, Q;
function kt(e, t) {
	return Q = e.exports, B = null, H = null, Q.__wbindgen_start(), Q;
}
async function At(e, t) {
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
function jt(e) {
	if (Q !== void 0) return Q;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module: e} = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
	let t = wt();
	return e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e)), kt(new WebAssembly.Instance(e, t), e);
}
async function Mt(e) {
	if (Q !== void 0) return Q;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module_or_path: e} = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead"));
	let t = wt();
	(typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
	let { instance: n, module: r } = await At(await e, t);
	return kt(n, r);
}
async function Nt(e) {
	return Q = void 0, B = null, H = null, Mt(e);
}
//#endregion
//#region packages/xlsx/src/internal/node-acquisition.ts
var Pt, Ft;
function It(e) {
	if (!Ft) Pt = e, Ft = new we(bt, e);
	else if (Pt !== e) throw Error("XLSX runtime was already initialized with another WebAssembly.Module");
	return Ft;
}
async function Lt(e, t, n = {}) {
	let r = g(n), i = new o({
		enabled: r.debug || r.onResourceMetrics !== void 0,
		format: "xlsx",
		mode: "node",
		scope: "session",
		policy: r.policy,
		onMetrics: r.onResourceMetrics,
		emitToConsole: r.debug
	});
	i.setSourceBytes(e.byteLength);
	let a;
	try {
		Rt(n.signal);
		let [o, s, c] = l(r.policy), u = R;
		a = await It(t).open(() => new u(e, o, s, c), {
			signal: n.signal,
			abortError: zt,
			disposeOnAbort: (e) => e.free()
		}), Rt(n.signal);
		let d = a.proxy, { workbook: f, usage: p } = yt(() => JSON.parse(new TextDecoder().decode(d.parse())), () => d.resource_usage());
		return i.observeUsage(p), i.checkpoint("workbook index ready"), {
			archive: d,
			workbookIndex: f,
			usage: p,
			metrics: i,
			closeArchive: () => a?.close((e) => e.free())
		};
	} catch (e) {
		try {
			a?.close((e) => e.free());
		} catch {}
		let t = u(e) ?? e;
		throw i.fail(t), t;
	}
}
function Rt(e) {
	if (e?.aborted) throw zt();
}
function zt() {
	let e = /* @__PURE__ */ Error("XLSX workbook session was aborted");
	return e.name = "AbortError", e;
}
//#endregion
//#region packages/node/src/xlsx.ts
var Bt = y(() => b(import.meta.url, "xlsx_parser_bg.wasm", "@silurus/ooxml-xlsx/wasm-binary"));
async function $(e, t = {}) {
	let n = await Lt(Jt(e), Bt(), t);
	return new Vt(n.closeArchive, n.archive, n.workbookIndex, n.metrics, n.usage, t.signal);
}
var Vt = class {
	workbookIndex;
	sheetCount;
	sheetNames;
	pull;
	transport;
	worksheetPullClient;
	active;
	closed = !1;
	closePromise;
	lastUsage;
	completedWorksheets = 0;
	rowBatches = 0;
	emittedRows = 0;
	constructor(e, t, n, r, i, a) {
		this.closeArchive = e, this.archive = t, this.metrics = r, this.signal = a, this.workbookIndex = Kt(n), this.sheetNames = Object.freeze(this.workbookIndex.workbook.sheets.map((e) => e.name)), this.sheetCount = this.sheetNames.length, this.lastUsage = i, this.pull = new _e(() => this.archive), this.transport = new v((e, t) => this.pull.dispatchSafely(e, t), () => void 0), this.worksheetPullClient = new ye({
			transport: this.transport,
			sharedStrings: n.sharedStrings,
			open: async (e, t, n) => {
				this.pull.reserveOpen(n), await this.pull.open(e, t, n);
			},
			onUsage: (e) => {
				this.lastUsage = e, this.metrics.observeUsage(e);
			}
		});
	}
	get resourceUsage() {
		if (this.closed) return this.lastUsage;
		try {
			this.lastUsage = qt(this.archive.resource_usage());
		} catch {}
		return this.lastUsage;
	}
	async *worksheetRows(e) {
		if (this.closed) throw Error("XLSX workbook session is closed");
		if (this.active) throw Error("another XLSX worksheet row stream is already active");
		if (!Number.isSafeInteger(e) || e < 0) throw RangeError("sheetIndex must be a non-negative safe integer");
		let t = this.requireSheetName(e), n = {};
		this.active = n;
		let r;
		try {
			for await (let n of this.worksheetPullClient.stream(e, t, this.signal)) {
				if (this.closed) throw Error("XLSX workbook session is closed");
				if (n.kind === "rows") {
					this.rowBatches += 1, this.emittedRows += n.rows.length, yield {
						kind: "rows",
						rows: n.rows,
						sequence: n.sequence,
						wireBytes: n.wireBytes,
						usage: n.usage
					};
					continue;
				}
				yield {
					kind: "finished",
					worksheet: n.worksheet,
					sequence: n.sequence,
					wireBytes: n.wireBytes,
					usage: n.usage
				};
			}
			this.completedWorksheets += 1, this.metrics.checkpoint("worksheet stream complete", this.lastUsage);
		} catch (e) {
			throw r = u(e) ?? e, this.metrics.fail(r), await this.close().catch(() => void 0), r;
		} finally {
			try {
				await this.cleanupOperation(n, r === void 0 ? "closed" : "request-error");
			} catch (e) {
				if (r === void 0) {
					let t = u(e) ?? e;
					throw this.metrics.fail(t), await this.close().catch(() => void 0), t;
				}
			}
		}
	}
	close() {
		return this.closePromise ? this.closePromise : (this.closed = !0, this.closePromise = this.release(), this.closePromise);
	}
	cleanupOperation(e, t) {
		return e.cleanupPromise ||= (async () => {
			let n;
			try {
				await this.worksheetPullClient.cancelAll(t);
			} catch (e) {
				n = u(e) ?? e;
			}
			try {
				await this.pull.reset();
			} catch (e) {
				n ??= u(e) ?? e;
			}
			if (this.active === e && (this.active = void 0), n !== void 0) throw n;
		})(), e.cleanupPromise;
	}
	async release() {
		let e;
		if (this.active) try {
			await this.cleanupOperation(this.active, "closed");
		} catch (t) {
			e = u(t) ?? t;
		}
		this.transport.terminate();
		try {
			this.closeArchive();
		} catch (t) {
			e ??= u(t) ?? t;
		}
		if (e !== void 0) throw this.metrics.fail(e), e;
		this.metrics.checkpoint("workbook session closed", this.lastUsage), this.metrics.succeed({
			worksheets: this.completedWorksheets,
			"row-batches": this.rowBatches,
			rows: this.emittedRows
		});
	}
	requireSheetName(e) {
		let t = this.workbookIndex.workbook.sheets[e];
		if (!t) throw RangeError(`Sheet index ${e} out of range`);
		return t.name;
	}
};
async function Ht(e, t = {}) {
	return _(() => $(e, t), async (e) => structuredClone(e.workbookIndex));
}
async function Ut(e, t, n = {}) {
	return _(() => $(e, n), async (e) => (await Gt(e, t)).worksheet);
}
async function Wt(e, t = {}) {
	return _(() => $(e, t), async (e) => {
		let t = [], n = {
			rows: 0,
			cells: 0,
			ownedUtf8Bytes: 0,
			jsonBytes: 0
		};
		for (let r = 0; r < e.sheetCount; r += 1) {
			let i = await Gt(e, r), a = ge(n, i.usage);
			fe(a, "materialize-workbook", void 0, i.resourceUsage), n = a, t.push(i.worksheet);
		}
		return {
			workbookIndex: structuredClone(e.workbookIndex),
			worksheets: Object.freeze(t)
		};
	});
}
async function Gt(e, t) {
	let n = [], r = {
		rows: 0,
		cells: 0,
		ownedUtf8Bytes: 0
	}, i, a, o;
	for await (let s of e.worksheetRows(t)) if (o = s.usage ?? o, s.kind === "rows") {
		let e = ve(r, me(s.rows));
		be(e, "materialize-worksheet", void 0, o), n.push(...s.rows), r = e;
	} else {
		a = s.worksheet, a.rows = a.parseError ? [] : n;
		let e = pe(a, a.parseError ? {
			rows: 0,
			cells: 0,
			ownedUtf8Bytes: 0
		} : r);
		be(e, "materialize-worksheet", void 0, o), he(e.jsonBytes, "materialize-worksheet", void 0, o), r = e, i = e;
	}
	if (!a || !i) throw Error(`XLSX worksheet ${t} did not produce a terminal model`);
	return {
		worksheet: a,
		usage: i,
		resourceUsage: o
	};
}
function Kt(e, t = /* @__PURE__ */ new WeakSet()) {
	if (typeof e != "object" || !e) return e;
	let n = e;
	if (t.has(n)) return e;
	t.add(n);
	for (let e of Object.values(n)) Kt(e, t);
	return Object.freeze(e);
}
function qt(e) {
	try {
		return r(e);
	} catch (e) {
		if (String(e).includes("worksheet cursor usage is unavailable")) return;
		throw e;
	}
}
function Jt(e) {
	return e instanceof Uint8Array ? e : new Uint8Array(e);
}
//#endregion
export { le as OoxmlDecodedImageLimitError, f as OoxmlResourceLimitError, Oe as installImageBitmapShim, Ee as installOffscreenCanvasShim, ce as isOoxmlDecodedImageLimitError, mt as materializeDocxDocument, Ve as materializePptxPresentation, Wt as materializeXlsxWorkbook, Ht as materializeXlsxWorkbookIndex, Ut as materializeXlsxWorksheet, pt as openDocxDocument, Re as openPptxPresentation, $ as openXlsxWorkbook, De as renderSlideNode };
