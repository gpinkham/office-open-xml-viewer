import { r as e, t } from "./cfb-sniff-B0ZvlWx2.js";
import { t as n } from "./model-source-BsxsLLHq.js";
//#region packages/core/src/source/cfb-directory-names.ts
var r = [
	208,
	207,
	17,
	224,
	161,
	177,
	26,
	225
];
function i(n) {
	if (n.length < 512) return null;
	for (let e = 0; e < r.length; e++) if (n[e] !== r[e]) return null;
	let i = new DataView(n.buffer, n.byteOffset, n.byteLength), a = i.getUint16(30, !0);
	if (a !== 9 && a !== 12) return /* @__PURE__ */ new Set();
	let o = 1 << a, s = e(i, n.length, {
		sectorSize: o,
		numFatSectors: i.getUint32(44, !0),
		firstDifatSector: i.getUint32(68, !0),
		numDifatSectors: i.getUint32(72, !0)
	});
	return s === null ? /* @__PURE__ */ new Set() : t(i, n.length, o, i.getUint32(48, !0), s) ?? /* @__PURE__ */ new Set();
}
//#endregion
//#region packages/legacy-converter/src/legacy-source.ts
var a = {
	wasmUrl: new Set([
		"http:",
		"https:",
		"file:",
		"blob:",
		"data:"
	]),
	moduleUrl: new Set([
		"http:",
		"https:",
		"file:",
		"blob:"
	])
}, o = {
	doc: "docx",
	xls: "xlsx",
	ppt: "pptx"
};
function s(e) {
	let t = [];
	return e.has("WordDocument") && t.push("doc"), (e.has("Workbook") || e.has("Book")) && t.push("xls"), e.has("PowerPoint Document") && t.push("ppt"), t.length === 1 ? t[0] : null;
}
function c(e, t, r) {
	let a = `legacy ${e.toUpperCase()} source`;
	if (typeof t != "object" || !t) throw TypeError(`${a} options must be an object`);
	let c = l(t.wasmUrl ?? r.wasmUrl, "wasmUrl", a), u = l(t.moduleUrl ?? r.moduleUrl, "moduleUrl", a), d = t.maxInputBytes ?? 268435456;
	if (!Number.isSafeInteger(d) || d <= 0 || d > 268435456) throw RangeError(`${a} maxInputBytes is invalid`);
	let f = o[e], p = Object.freeze({
		protocol: n,
		target: f,
		moduleUrl: u,
		config: Object.freeze({
			wasmUrl: c,
			maxInputBytes: d
		})
	});
	return Object.freeze({
		target: f,
		claim(t) {
			let n = i(t);
			if (!n || n.has("EncryptionInfo") || s(n) !== e) return !1;
			if (t.byteLength > d) throw RangeError(`${a} input exceeds the configured size limit`);
			return !0;
		},
		beginLoad() {
			return {
				module: p,
				release() {}
			};
		}
	});
}
function l(e, t, n) {
	if (typeof e != "string" || e.length === 0 || e.trim() !== e) throw TypeError(`${n} ${t} must be a nonempty absolute URL`);
	let r;
	try {
		r = new URL(e);
	} catch {
		throw TypeError(`${n} ${t} must be a nonempty absolute URL`);
	}
	if (!a[t].has(r.protocol)) throw TypeError(`${n} ${t} protocol is unsupported`);
	return e;
}
//#endregion
export { c as t };
