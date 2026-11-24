import { t as e } from "./chunk-D5OxutzX.js";
import { n as t } from "./ooxml-error-DbICW35n.js";
import { m as n } from "./resource-policy.generated-D_HlV2Rm.js";
import { n as r, t as i } from "./abort-JztSoyw2.js";
import { i as a, r as o, t as s } from "./error-wire-DcmmIbXu.js";
import { i as c, n as l, o as ee } from "./resource-debug-BMgDiKq1.js";
import { t as u } from "./bounded-raw-part-cache-TU72wntZ.js";
import { n as d, r as te, t as f } from "./worksheet-policy-G1KBtmuQ.js";
import { t as p } from "./worksheet-policy-context-CntId_kd.js";
import { c as m, d as h, f as g, l as _, p as v, r as y, s as ne, t as re, u as ie } from "./worksheet-pull-client-DazoAB6G.js";
import { a as b, i as ae, n as oe, t as se } from "./wasm-loader-aCVZKhJM.js";
import { t as ce } from "./wasm-runtime-generation-DrPM10Ji.js";
import { t as x } from "./in-process-pull-transport-BPJ7M0uC.js";
function S(e, t) {
	return {
		workbook: e(),
		usage: s(t())
	};
}
var le = /* @__PURE__ */ e({
	XlsxArchive: () => C,
	default: () => W,
	extract_image: () => ue,
	initSync: () => me,
	parse_xlsx: () => de,
	reinit: () => he,
	xlsx_to_markdown: () => fe
}), C = class {
	__destroy_into_raw() {
		let e = this.__wbg_ptr;
		return this.__wbg_ptr = 0, T.unregister(this), e;
	}
	free() {
		let e = this.__destroy_into_raw();
		H.__wbg_xlsxarchive_free(e, 0);
	}
	acknowledge_sheet_cursor_terminal() {
		let e = H.xlsxarchive_acknowledge_sheet_cursor_terminal(this.__wbg_ptr);
		if (e[1]) throw F(e[0]);
	}
	assert_healthy() {
		let e = H.xlsxarchive_assert_healthy(this.__wbg_ptr);
		if (e[1]) throw F(e[0]);
	}
	cancel_sheet_cursor() {
		H.xlsxarchive_cancel_sheet_cursor(this.__wbg_ptr);
	}
	close_sheet_cursor() {
		H.xlsxarchive_close_sheet_cursor(this.__wbg_ptr);
	}
	extract_image(e) {
		let t = P(e, H.__wbindgen_malloc, H.__wbindgen_realloc), n = V, r = H.xlsxarchive_extract_image(this.__wbg_ptr, t, n);
		if (r[3]) throw F(r[2]);
		var i = E(r[0], r[1]).slice();
		return H.__wbindgen_free(r[0], r[1] * 1, 1), i;
	}
	is_picture_part(e) {
		let t = P(e, H.__wbindgen_malloc, H.__wbindgen_realloc), n = V, r = H.xlsxarchive_is_picture_part(this.__wbg_ptr, t, n);
		if (r[2]) throw F(r[1]);
		return r[0] !== 0;
	}
	constructor(e, t, n, r) {
		let i = N(e, H.__wbindgen_malloc), a = V, o = H.xlsxarchive_new(i, a, !M(t), M(t) ? BigInt(0) : t, !M(n), M(n) ? BigInt(0) : n, !M(r), M(r) ? BigInt(0) : r);
		if (o[2]) throw F(o[1]);
		return this.__wbg_ptr = o[0] >>> 0, T.register(this, this.__wbg_ptr, this), this;
	}
	open_sheet_cursor(e, t) {
		let n = P(t, H.__wbindgen_malloc, H.__wbindgen_realloc), r = V, i = H.xlsxarchive_open_sheet_cursor(this.__wbg_ptr, e, n, r);
		if (i[1]) throw F(i[0]);
	}
	parse() {
		let e = H.xlsxarchive_parse(this.__wbg_ptr);
		if (e[3]) throw F(e[2]);
		var t = E(e[0], e[1]).slice();
		return H.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	pull_sheet_cursor(e) {
		let t = H.xlsxarchive_pull_sheet_cursor(this.__wbg_ptr, e);
		if (t[3]) throw F(t[2]);
		var n = E(t[0], t[1]).slice();
		return H.__wbindgen_free(t[0], t[1] * 1, 1), n;
	}
	resource_usage() {
		let e = H.xlsxarchive_resource_usage(this.__wbg_ptr);
		if (e[3]) throw F(e[2]);
		var t = E(e[0], e[1]).slice();
		return H.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	set_worksheet_limits(e, t, n, r) {
		let i = H.xlsxarchive_set_worksheet_limits(this.__wbg_ptr, e, t, n, r);
		if (i[1]) throw F(i[0]);
	}
	sheet_cursor_pull_finished() {
		return H.xlsxarchive_sheet_cursor_pull_finished(this.__wbg_ptr) !== 0;
	}
	sheet_cursor_resource_usage() {
		let e = H.xlsxarchive_sheet_cursor_resource_usage(this.__wbg_ptr);
		if (e[3]) throw F(e[2]);
		var t = E(e[0], e[1]).slice();
		return H.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	to_markdown() {
		let e, t;
		try {
			let i = H.xlsxarchive_to_markdown(this.__wbg_ptr);
			var n = i[0], r = i[1];
			if (i[3]) throw n = 0, r = 0, F(i[2]);
			return e = n, t = r, k(n, r);
		} finally {
			H.__wbindgen_free(e, t, 1);
		}
	}
};
Symbol.dispose && (C.prototype[Symbol.dispose] = C.prototype.free);
function ue(e, t, n, r) {
	let i = N(e, H.__wbindgen_malloc), a = V, o = P(t, H.__wbindgen_malloc, H.__wbindgen_realloc), s = V, c = H.extract_image(i, a, o, s, !M(n), M(n) ? BigInt(0) : n, !M(r), M(r) ? BigInt(0) : r);
	if (c[3]) throw F(c[2]);
	var l = E(c[0], c[1]).slice();
	return H.__wbindgen_free(c[0], c[1] * 1, 1), l;
}
function de(e, t, n) {
	let r = N(e, H.__wbindgen_malloc), i = V, a = H.parse_xlsx(r, i, !M(t), M(t) ? BigInt(0) : t, !M(n), M(n) ? BigInt(0) : n);
	if (a[3]) throw F(a[2]);
	var o = E(a[0], a[1]).slice();
	return H.__wbindgen_free(a[0], a[1] * 1, 1), o;
}
function fe(e, t, n) {
	let r, i;
	try {
		let s = N(e, H.__wbindgen_malloc), c = V, l = H.xlsx_to_markdown(s, c, !M(t), M(t) ? BigInt(0) : t, !M(n), M(n) ? BigInt(0) : n);
		var a = l[0], o = l[1];
		if (l[3]) throw a = 0, o = 0, F(l[2]);
		return r = a, i = o, k(a, o);
	} finally {
		H.__wbindgen_free(r, i, 1);
	}
}
function w() {
	return {
		__proto__: null,
		"./xlsx_parser_bg.js": {
			__proto__: null,
			__wbg___wbindgen_throw_6b64449b9b9ed33c: function(e, t) {
				throw Error(k(e, t));
			},
			__wbg_error_a6fa202b58aa1cd3: function(e, t) {
				let n, r;
				try {
					n = e, r = t, console.error(k(e, t));
				} finally {
					H.__wbindgen_free(n, r, 1);
				}
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ Error();
			},
			__wbg_stack_3b0d974bbf31e44f: function(e, t) {
				let n = t.stack, r = P(n, H.__wbindgen_malloc, H.__wbindgen_realloc), i = V;
				O().setInt32(e + 4, i, !0), O().setInt32(e + 0, r, !0);
			},
			__wbindgen_cast_0000000000000001: function(e, t) {
				return k(e, t);
			},
			__wbindgen_init_externref_table: function() {
				let e = H.__wbindgen_externrefs, t = e.grow(4);
				e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1);
			}
		}
	};
}
var T = typeof FinalizationRegistry > "u" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((e) => H.__wbg_xlsxarchive_free(e >>> 0, 1));
function E(e, t) {
	return e >>>= 0, j().subarray(e / 1, e / 1 + t);
}
var D = null;
function O() {
	return (D === null || D.buffer.detached === !0 || D.buffer.detached === void 0 && D.buffer !== H.memory.buffer) && (D = new DataView(H.memory.buffer)), D;
}
function k(e, t) {
	return e >>>= 0, z(e, t);
}
var A = null;
function j() {
	return (A === null || A.byteLength === 0) && (A = new Uint8Array(H.memory.buffer)), A;
}
function M(e) {
	return e == null;
}
function N(e, t) {
	let n = t(e.length * 1, 1) >>> 0;
	return j().set(e, n / 1), V = e.length, n;
}
function P(e, t, n) {
	if (n === void 0) {
		let n = B.encode(e), r = t(n.length, 1) >>> 0;
		return j().subarray(r, r + n.length).set(n), V = n.length, r;
	}
	let r = e.length, i = t(r, 1) >>> 0, a = j(), o = 0;
	for (; o < r; o++) {
		let t = e.charCodeAt(o);
		if (t > 127) break;
		a[i + o] = t;
	}
	if (o !== r) {
		o !== 0 && (e = e.slice(o)), i = n(i, r, r = o + e.length * 3, 1) >>> 0;
		let t = j().subarray(i + o, i + r), a = B.encodeInto(e, t);
		o += a.written, i = n(i, r, o, 1) >>> 0;
	}
	return V = o, i;
}
function F(e) {
	let t = H.__wbindgen_externrefs.get(e);
	return H.__externref_table_dealloc(e), t;
}
var I = new TextDecoder("utf-8", {
	ignoreBOM: !0,
	fatal: !0
});
I.decode();
var L = 2146435072, R = 0;
function z(e, t) {
	return R += t, R >= L && (I = new TextDecoder("utf-8", {
		ignoreBOM: !0,
		fatal: !0
	}), I.decode(), R = t), I.decode(j().subarray(e, e + t));
}
var B = new TextEncoder();
"encodeInto" in B || (B.encodeInto = function(e, t) {
	let n = B.encode(e);
	return t.set(n), {
		read: e.length,
		written: n.length
	};
});
var V = 0, H;
function U(e, t) {
	return H = e.exports, D = null, A = null, H.__wbindgen_start(), H;
}
async function pe(e, t) {
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
function me(e) {
	if (H !== void 0) return H;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module: e} = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
	let t = w();
	return e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e)), U(new WebAssembly.Instance(e, t), e);
}
async function W(e) {
	if (H !== void 0) return H;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module_or_path: e} = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead"));
	let t = w();
	(typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
	let { instance: n, module: r } = await pe(await e, t);
	return U(n, r);
}
async function he(e) {
	return H = void 0, D = null, A = null, W(e);
}
var G = "XLSX workbook session was aborted", ge = ce(le, "XLSX");
async function K(e, t, n = {}) {
	let o = d(n), s = c(n), u = new l({
		enabled: s.debug || s.onResourceMetrics !== void 0,
		format: "xlsx",
		mode: "node",
		scope: "session",
		policy: s.policy,
		formatLimits: { xlsxWorksheetLimits: { ...o.worksheet } },
		onMetrics: s.onResourceMetrics,
		emitToConsole: s.debug
	});
	u.setSourceBytes(e.byteLength);
	let f;
	try {
		r(n.signal, G);
		let [a, c, l] = ee(s.policy), d = C;
		f = await ge(t).open(() => new d(e, a, c, l), {
			signal: n.signal,
			abortError: () => i(G),
			disposeOnAbort: (e) => e.free()
		}), r(n.signal, G);
		let p = f.proxy, [m, h, g, _] = te(o);
		p.set_worksheet_limits(m, h, g, _);
		let { workbook: v, usage: y } = S(() => JSON.parse(new TextDecoder().decode(p.parse())), () => p.resource_usage());
		return u.observeUsage(y), u.checkpoint("workbook index ready"), {
			archive: p,
			workbookIndex: v,
			usage: y,
			metrics: u,
			worksheetPolicy: o,
			closeArchive: () => f?.close((e) => e.free())
		};
	} catch (e) {
		try {
			f?.close((e) => e.free());
		} catch {}
		let t = a(e) ?? e;
		throw u.fail(t), t;
	}
}
var q = se(() => oe(import.meta.url, "xlsx_parser_bg.wasm", "@silurus/ooxml-xlsx/wasm-binary"));
async function J(e, t = {}) {
	let n = d(t);
	if (t = {
		...t,
		xlsxWorksheetLimits: n.worksheet
	}, t.legacyXls !== void 0 || t.ods !== void 0) {
		let { openXlsxSource: n } = await import("./xlsx-model-source-Cebanjml.js");
		return n(e, t, q);
	}
	let r = await K(ae(e), q(), t);
	return new Z(r.closeArchive, r.archive, r.workbookIndex, r.metrics, r.usage, t.signal, r.worksheetPolicy);
}
var Y = /* @__PURE__ */ new WeakMap();
function X(e) {
	return Y.get(e) ?? f;
}
var Z = class {
	closeArchive;
	archive;
	metrics;
	signal;
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
	released = !1;
	resourceFailure;
	rawParts = new u({
		maxEntries: 64,
		maxBytes: n
	});
	constructor(e, t, n, r, i, a, o = f) {
		this.closeArchive = e, this.archive = t, this.metrics = r, this.signal = a, Y.set(this, o), this.workbookIndex = $(n), this.sheetNames = Object.freeze(this.workbookIndex.workbook.sheets.map((e) => e.name)), this.sheetCount = this.sheetNames.length, this.lastUsage = i, this.pull = new y(() => this.archive), this.transport = new x((e, t) => this.pull.dispatchSafely(e, t), () => void 0), this.worksheetPullClient = new re({
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
		return this.closed ? this.lastUsage : this.refreshResourceUsage();
	}
	refreshResourceUsage() {
		try {
			this.lastUsage = be(this.archive.resource_usage()), this.metrics.observeUsage(this.lastUsage);
		} catch {}
		return this.lastUsage;
	}
	async *worksheetRows(e) {
		if (this.assertOpen(), this.active) throw Error("another XLSX worksheet row stream is already active");
		if (!Number.isSafeInteger(e) || e < 0) throw RangeError("sheetIndex must be a non-negative safe integer");
		let t = this.requireSheetName(e), n = {};
		this.active = n;
		let r;
		try {
			for await (let n of this.worksheetPullClient.stream(e, t, this.signal)) {
				if (this.closed) throw Error("XLSX workbook session is closed");
				if (n.kind !== "preview") {
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
					p(n.worksheet, X(this)), yield {
						kind: "finished",
						worksheet: n.worksheet,
						sequence: n.sequence,
						wireBytes: n.wireBytes,
						usage: n.usage
					};
				}
			}
			this.completedWorksheets += 1, this.metrics.checkpoint("worksheet stream complete", this.lastUsage);
		} catch (e) {
			throw r = o(e) ?? e, this.metrics.fail(r), await this.close().catch(() => void 0), r;
		} finally {
			try {
				await this.cleanupOperation(n, r === void 0 ? "closed" : "request-error");
			} catch (e) {
				if (r === void 0) {
					let t = o(e) ?? e;
					throw this.metrics.fail(t), await this.close().catch(() => void 0), t;
				}
			}
		}
	}
	async getImage(e, t = "application/octet-stream") {
		this.assertOpen();
		let n;
		try {
			n = this.archive.is_picture_part?.(e), n !== void 0 && this.refreshResourceUsage();
		} catch (e) {
			throw this.imageFailure(e);
		}
		if (n === !1) throw TypeError("XLSX getImage(): the path does not name a picture part (a part whose content type is image/*)");
		return this.rawParts.get(e, t, () => {
			if (this.released) throw Error("XLSX workbook session is closed");
			r(this.signal, "XLSX workbook session was aborted");
			let n = this.archive.extract_image(e);
			return this.refreshResourceUsage(), new Blob([n], { type: t });
		}).catch((e) => {
			throw this.imageFailure(e);
		});
	}
	imageFailure(e) {
		let n = o(e) ?? e;
		return n instanceof t && (this.resourceFailure ??= n, this.metrics.fail(n)), n;
	}
	close() {
		return this.closePromise ? this.closePromise : (this.closed = !0, this.closePromise = this.release(), this.closePromise);
	}
	assertOpen() {
		if (this.closed) throw Error("XLSX workbook session is closed");
		if (this.resourceFailure) throw this.resourceFailure;
	}
	cleanupOperation(e, t) {
		return e.cleanupPromise ||= (async () => {
			let n;
			try {
				await this.worksheetPullClient.cancelAll(t);
			} catch (e) {
				n = o(e) ?? e;
			}
			try {
				await this.pull.reset();
			} catch (e) {
				n ??= o(e) ?? e;
			}
			if (this.active === e && (this.active = void 0), n !== void 0) throw n;
		})(), e.cleanupPromise;
	}
	async release() {
		let e;
		if (this.active) try {
			await this.cleanupOperation(this.active, "closed");
		} catch (t) {
			e = o(t) ?? t;
		}
		this.transport.terminate(), this.rawParts.clear(), this.released = !0;
		try {
			this.closeArchive();
		} catch (t) {
			e ??= o(t) ?? t;
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
async function _e(e, t = {}) {
	return b(() => J(e, t), async (e) => structuredClone(e.workbookIndex));
}
async function ve(e, t, n = {}) {
	return b(() => J(e, n), async (e) => (await Q(e, t)).worksheet);
}
async function ye(e, t = {}) {
	return b(() => J(e, t), async (e) => {
		let t = X(e), n = [], r = {
			rows: 0,
			cells: 0,
			ownedUtf8Bytes: 0,
			jsonBytes: 0
		};
		for (let i = 0; i < e.sheetCount; i += 1) {
			let a = await Q(e, i), o = ne(r, a.usage, {}, t);
			_(o, "materialize-workbook", void 0, a.resourceUsage, t), r = o, n.push(a.worksheet);
		}
		return {
			workbookIndex: structuredClone(e.workbookIndex),
			worksheets: Object.freeze(n)
		};
	});
}
async function Q(e, t) {
	let n = X(e), r = [], i = {
		rows: 0,
		cells: 0,
		ownedUtf8Bytes: 0
	}, a, o, s;
	for await (let c of e.worksheetRows(t)) if (s = c.usage ?? s, c.kind === "rows") {
		let e = m(i, v(c.rows, n), n);
		h(e, "materialize-worksheet", void 0, s, n), r.push(...c.rows), i = e;
	} else {
		o = c.worksheet, p(o, n), o.rows = o.parseError ? [] : r;
		let e = g(o, o.parseError ? {
			rows: 0,
			cells: 0,
			ownedUtf8Bytes: 0
		} : i, n);
		h(e, "materialize-worksheet", void 0, s, n), ie(e.jsonBytes, "materialize-worksheet", void 0, s, n), i = e, a = e;
	}
	if (!o || !a) throw Error(`XLSX worksheet ${t} did not produce a terminal model`);
	return {
		worksheet: o,
		usage: a,
		resourceUsage: s
	};
}
function $(e, t = /* @__PURE__ */ new WeakSet()) {
	if (typeof e != "object" || !e) return e;
	let n = e;
	if (t.has(n)) return e;
	t.add(n);
	for (let e of Object.values(n)) $(e, t);
	return Object.freeze(e);
}
function be(e) {
	try {
		return s(e);
	} catch (e) {
		if (String(e).includes("worksheet cursor usage is unavailable")) return;
		throw e;
	}
}
export { J as a, ve as i, ye as n, K as o, _e as r, Z as t };
