import { t as e } from "./chunk-DmhlhrBa.js";
import { i as t, n, o as r } from "./resource-debug-Bp6LglgZ.js";
import { i, r as a, t as o } from "./error-wire-rJNDxWbL.js";
import { n as s, r as c, t as l } from "./xlsx-worksheet-policy-7DZYvldr.js";
import { t as u } from "./worksheet-policy-context-zBNDS5EA.js";
import { c as d, d as f, f as p, l as m, p as h, r as g, s as _, t as v, u as y } from "./worksheet-pull-client-qpRHeMOv.js";
import { n as ee, r as b, t as te } from "./wasm-loader-CQMAGKwZ.js";
import { t as ne } from "./wasm-runtime-generation-CiK17ng7.js";
import { t as x } from "./in-process-pull-transport-C2_At2ns.js";
//#region packages/xlsx/src/internal/archive-bootstrap.ts
function re(e, t) {
	return {
		workbook: e(),
		usage: o(t())
	};
}
//#endregion
//#region packages/xlsx/src/wasm/xlsx_parser.js
var ie = /* @__PURE__ */ e({
	XlsxArchive: () => S,
	default: () => V,
	extract_image: () => ae,
	initSync: () => de,
	parse_xlsx: () => oe,
	reinit: () => fe,
	xlsx_to_markdown: () => se
}), S = class {
	__destroy_into_raw() {
		let e = this.__wbg_ptr;
		return this.__wbg_ptr = 0, w.unregister(this), e;
	}
	free() {
		let e = this.__destroy_into_raw();
		z.__wbg_xlsxarchive_free(e, 0);
	}
	acknowledge_sheet_cursor_terminal() {
		let e = z.xlsxarchive_acknowledge_sheet_cursor_terminal(this.__wbg_ptr);
		if (e[1]) throw P(e[0]);
	}
	assert_healthy() {
		let e = z.xlsxarchive_assert_healthy(this.__wbg_ptr);
		if (e[1]) throw P(e[0]);
	}
	cancel_sheet_cursor() {
		z.xlsxarchive_cancel_sheet_cursor(this.__wbg_ptr);
	}
	close_sheet_cursor() {
		z.xlsxarchive_close_sheet_cursor(this.__wbg_ptr);
	}
	extract_image(e) {
		let t = N(e, z.__wbindgen_malloc, z.__wbindgen_realloc), n = R, r = z.xlsxarchive_extract_image(this.__wbg_ptr, t, n);
		if (r[3]) throw P(r[2]);
		var i = T(r[0], r[1]).slice();
		return z.__wbindgen_free(r[0], r[1] * 1, 1), i;
	}
	constructor(e, t, n, r) {
		let i = M(e, z.__wbindgen_malloc), a = R, o = z.xlsxarchive_new(i, a, !j(t), j(t) ? BigInt(0) : t, !j(n), j(n) ? BigInt(0) : n, !j(r), j(r) ? BigInt(0) : r);
		if (o[2]) throw P(o[1]);
		return this.__wbg_ptr = o[0] >>> 0, w.register(this, this.__wbg_ptr, this), this;
	}
	open_sheet_cursor(e, t) {
		let n = N(t, z.__wbindgen_malloc, z.__wbindgen_realloc), r = R, i = z.xlsxarchive_open_sheet_cursor(this.__wbg_ptr, e, n, r);
		if (i[1]) throw P(i[0]);
	}
	parse() {
		let e = z.xlsxarchive_parse(this.__wbg_ptr);
		if (e[3]) throw P(e[2]);
		var t = T(e[0], e[1]).slice();
		return z.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	pull_sheet_cursor(e) {
		let t = z.xlsxarchive_pull_sheet_cursor(this.__wbg_ptr, e);
		if (t[3]) throw P(t[2]);
		var n = T(t[0], t[1]).slice();
		return z.__wbindgen_free(t[0], t[1] * 1, 1), n;
	}
	resource_usage() {
		let e = z.xlsxarchive_resource_usage(this.__wbg_ptr);
		if (e[3]) throw P(e[2]);
		var t = T(e[0], e[1]).slice();
		return z.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	set_worksheet_limits(e, t, n, r) {
		let i = z.xlsxarchive_set_worksheet_limits(this.__wbg_ptr, e, t, n, r);
		if (i[1]) throw P(i[0]);
	}
	sheet_cursor_pull_finished() {
		return z.xlsxarchive_sheet_cursor_pull_finished(this.__wbg_ptr) !== 0;
	}
	sheet_cursor_resource_usage() {
		let e = z.xlsxarchive_sheet_cursor_resource_usage(this.__wbg_ptr);
		if (e[3]) throw P(e[2]);
		var t = T(e[0], e[1]).slice();
		return z.__wbindgen_free(e[0], e[1] * 1, 1), t;
	}
	to_markdown() {
		let e, t;
		try {
			let i = z.xlsxarchive_to_markdown(this.__wbg_ptr);
			var n = i[0], r = i[1];
			if (i[3]) throw n = 0, r = 0, P(i[2]);
			return e = n, t = r, O(n, r);
		} finally {
			z.__wbindgen_free(e, t, 1);
		}
	}
};
Symbol.dispose && (S.prototype[Symbol.dispose] = S.prototype.free);
function ae(e, t, n, r) {
	let i = M(e, z.__wbindgen_malloc), a = R, o = N(t, z.__wbindgen_malloc, z.__wbindgen_realloc), s = R, c = z.extract_image(i, a, o, s, !j(n), j(n) ? BigInt(0) : n, !j(r), j(r) ? BigInt(0) : r);
	if (c[3]) throw P(c[2]);
	var l = T(c[0], c[1]).slice();
	return z.__wbindgen_free(c[0], c[1] * 1, 1), l;
}
function oe(e, t, n) {
	let r = M(e, z.__wbindgen_malloc), i = R, a = z.parse_xlsx(r, i, !j(t), j(t) ? BigInt(0) : t, !j(n), j(n) ? BigInt(0) : n);
	if (a[3]) throw P(a[2]);
	var o = T(a[0], a[1]).slice();
	return z.__wbindgen_free(a[0], a[1] * 1, 1), o;
}
function se(e, t, n) {
	let r, i;
	try {
		let s = M(e, z.__wbindgen_malloc), c = R, l = z.xlsx_to_markdown(s, c, !j(t), j(t) ? BigInt(0) : t, !j(n), j(n) ? BigInt(0) : n);
		var a = l[0], o = l[1];
		if (l[3]) throw a = 0, o = 0, P(l[2]);
		return r = a, i = o, O(a, o);
	} finally {
		z.__wbindgen_free(r, i, 1);
	}
}
function C() {
	return {
		__proto__: null,
		"./xlsx_parser_bg.js": {
			__proto__: null,
			__wbg___wbindgen_throw_6b64449b9b9ed33c: function(e, t) {
				throw Error(O(e, t));
			},
			__wbg_error_a6fa202b58aa1cd3: function(e, t) {
				let n, r;
				try {
					n = e, r = t, console.error(O(e, t));
				} finally {
					z.__wbindgen_free(n, r, 1);
				}
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ Error();
			},
			__wbg_stack_3b0d974bbf31e44f: function(e, t) {
				let n = t.stack, r = N(n, z.__wbindgen_malloc, z.__wbindgen_realloc), i = R;
				D().setInt32(e + 4, i, !0), D().setInt32(e + 0, r, !0);
			},
			__wbindgen_cast_0000000000000001: function(e, t) {
				return O(e, t);
			},
			__wbindgen_init_externref_table: function() {
				let e = z.__wbindgen_externrefs, t = e.grow(4);
				e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1);
			}
		}
	};
}
var w = typeof FinalizationRegistry > "u" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((e) => z.__wbg_xlsxarchive_free(e >>> 0, 1));
function T(e, t) {
	return e >>>= 0, A().subarray(e / 1, e / 1 + t);
}
var E = null;
function D() {
	return (E === null || E.buffer.detached === !0 || E.buffer.detached === void 0 && E.buffer !== z.memory.buffer) && (E = new DataView(z.memory.buffer)), E;
}
function O(e, t) {
	return e >>>= 0, le(e, t);
}
var k = null;
function A() {
	return (k === null || k.byteLength === 0) && (k = new Uint8Array(z.memory.buffer)), k;
}
function j(e) {
	return e == null;
}
function M(e, t) {
	let n = t(e.length * 1, 1) >>> 0;
	return A().set(e, n / 1), R = e.length, n;
}
function N(e, t, n) {
	if (n === void 0) {
		let n = L.encode(e), r = t(n.length, 1) >>> 0;
		return A().subarray(r, r + n.length).set(n), R = n.length, r;
	}
	let r = e.length, i = t(r, 1) >>> 0, a = A(), o = 0;
	for (; o < r; o++) {
		let t = e.charCodeAt(o);
		if (t > 127) break;
		a[i + o] = t;
	}
	if (o !== r) {
		o !== 0 && (e = e.slice(o)), i = n(i, r, r = o + e.length * 3, 1) >>> 0;
		let t = A().subarray(i + o, i + r), a = L.encodeInto(e, t);
		o += a.written, i = n(i, r, o, 1) >>> 0;
	}
	return R = o, i;
}
function P(e) {
	let t = z.__wbindgen_externrefs.get(e);
	return z.__externref_table_dealloc(e), t;
}
var F = new TextDecoder("utf-8", {
	ignoreBOM: !0,
	fatal: !0
});
F.decode();
var ce = 2146435072, I = 0;
function le(e, t) {
	return I += t, I >= ce && (F = new TextDecoder("utf-8", {
		ignoreBOM: !0,
		fatal: !0
	}), F.decode(), I = t), F.decode(A().subarray(e, e + t));
}
var L = new TextEncoder();
"encodeInto" in L || (L.encodeInto = function(e, t) {
	let n = L.encode(e);
	return t.set(n), {
		read: e.length,
		written: n.length
	};
});
var R = 0, z;
function B(e, t) {
	return z = e.exports, E = null, k = null, z.__wbindgen_start(), z;
}
async function ue(e, t) {
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
function de(e) {
	if (z !== void 0) return z;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module: e} = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
	let t = C();
	return e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e)), B(new WebAssembly.Instance(e, t), e);
}
async function V(e) {
	if (z !== void 0) return z;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module_or_path: e} = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead"));
	let t = C();
	(typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
	let { instance: n, module: r } = await ue(await e, t);
	return B(n, r);
}
async function fe(e) {
	return z = void 0, E = null, k = null, V(e);
}
//#endregion
//#region packages/xlsx/src/internal/node-acquisition.ts
var H, U;
function pe(e) {
	if (!U) H = e, U = new ne(ie, e);
	else if (H !== e) throw Error("XLSX runtime was already initialized with another WebAssembly.Module");
	return U;
}
async function W(e, a, o = {}) {
	let l = s(o), u = t(o), d = new n({
		enabled: u.debug || u.onResourceMetrics !== void 0,
		format: "xlsx",
		mode: "node",
		scope: "session",
		policy: u.policy,
		xlsxWorksheetPolicy: l,
		onMetrics: u.onResourceMetrics,
		emitToConsole: u.debug
	});
	d.setSourceBytes(e.byteLength);
	let f;
	try {
		G(o.signal);
		let [t, n, i] = r(u.policy), s = S;
		f = await pe(a).open(() => new s(e, t, n, i), {
			signal: o.signal,
			abortError: K,
			disposeOnAbort: (e) => e.free()
		}), G(o.signal);
		let p = f.proxy, [m, h, g, _] = c(l);
		p.set_worksheet_limits(m, h, g, _);
		let { workbook: v, usage: y } = re(() => JSON.parse(new TextDecoder().decode(p.parse())), () => p.resource_usage());
		return d.observeUsage(y), d.checkpoint("workbook index ready"), {
			archive: p,
			workbookIndex: v,
			usage: y,
			metrics: d,
			worksheetPolicy: l,
			closeArchive: () => f?.close((e) => e.free())
		};
	} catch (e) {
		try {
			f?.close((e) => e.free());
		} catch {}
		let t = i(e) ?? e;
		throw d.fail(t), t;
	}
}
function G(e) {
	if (e?.aborted) throw K();
}
function K() {
	let e = /* @__PURE__ */ Error("XLSX workbook session was aborted");
	return e.name = "AbortError", e;
}
//#endregion
//#region packages/node/src/xlsx.ts
var q = te(() => ee(import.meta.url, "xlsx_parser_bg.wasm", "@silurus/ooxml-xlsx/wasm-binary"));
async function J(e, t = {}) {
	let n = s(t);
	if (t = {
		...t,
		xlsxWorksheetLimits: n.worksheet
	}, t.modelSources !== void 0) {
		let { openXlsxSource: n } = await import("./xlsx-model-source-gXnE2hA9.js");
		return n(e, t, q);
	}
	let r = await W(ve(e), q(), t);
	return new Z(r.closeArchive, r.archive, r.workbookIndex, r.metrics, r.usage, t.signal, r.worksheetPolicy);
}
var Y = /* @__PURE__ */ new WeakMap();
function X(e) {
	return Y.get(e) ?? l;
}
var Z = class {
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
	constructor(e, t, n, r, i, a, o = l) {
		this.closeArchive = e, this.archive = t, this.metrics = r, this.signal = a, Y.set(this, o), this.workbookIndex = $(n), this.sheetNames = Object.freeze(this.workbookIndex.workbook.sheets.map((e) => e.name)), this.sheetCount = this.sheetNames.length, this.lastUsage = i, this.pull = new g(() => this.archive), this.transport = new x((e, t) => this.pull.dispatchSafely(e, t), () => void 0), this.worksheetPullClient = new v({
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
			this.lastUsage = _e(this.archive.resource_usage());
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
					u(n.worksheet, X(this)), yield {
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
			throw r = a(e) ?? e, this.metrics.fail(r), await this.close().catch(() => void 0), r;
		} finally {
			try {
				await this.cleanupOperation(n, r === void 0 ? "closed" : "request-error");
			} catch (e) {
				if (r === void 0) {
					let t = a(e) ?? e;
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
				n = a(e) ?? e;
			}
			try {
				await this.pull.reset();
			} catch (e) {
				n ??= a(e) ?? e;
			}
			if (this.active === e && (this.active = void 0), n !== void 0) throw n;
		})(), e.cleanupPromise;
	}
	async release() {
		let e;
		if (this.active) try {
			await this.cleanupOperation(this.active, "closed");
		} catch (t) {
			e = a(t) ?? t;
		}
		this.transport.terminate();
		try {
			this.closeArchive();
		} catch (t) {
			e ??= a(t) ?? t;
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
async function me(e, t = {}) {
	return b(() => J(e, t), async (e) => structuredClone(e.workbookIndex));
}
async function he(e, t, n = {}) {
	return b(() => J(e, n), async (e) => (await Q(e, t)).worksheet);
}
async function ge(e, t = {}) {
	return b(() => J(e, t), async (e) => {
		let t = X(e), n = [], r = {
			rows: 0,
			cells: 0,
			ownedUtf8Bytes: 0,
			jsonBytes: 0
		};
		for (let i = 0; i < e.sheetCount; i += 1) {
			let a = await Q(e, i), o = _(r, a.usage, {}, t);
			m(o, "materialize-workbook", void 0, a.resourceUsage, t), r = o, n.push(a.worksheet);
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
		let e = d(i, h(c.rows, n), n);
		f(e, "materialize-worksheet", void 0, s, n), r.push(...c.rows), i = e;
	} else {
		o = c.worksheet, u(o, n), o.rows = o.parseError ? [] : r;
		let e = p(o, o.parseError ? {
			rows: 0,
			cells: 0,
			ownedUtf8Bytes: 0
		} : i, n);
		f(e, "materialize-worksheet", void 0, s, n), y(e.jsonBytes, "materialize-worksheet", void 0, s, n), i = e, a = e;
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
function _e(e) {
	try {
		return o(e);
	} catch (e) {
		if (String(e).includes("worksheet cursor usage is unavailable")) return;
		throw e;
	}
}
function ve(e) {
	return e instanceof Uint8Array ? e : new Uint8Array(e);
}
//#endregion
export { J as a, he as i, ge as n, W as o, me as r, Z as t };
