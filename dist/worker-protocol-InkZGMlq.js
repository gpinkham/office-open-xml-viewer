import { r as e } from "./worksheet-policy-context-zBNDS5EA.js";
import { l as t, o as n, t as r, u as i } from "./grid-geometry-MHuKakaD.js";
//#region packages/xlsx/src/worker-protocol.ts
function a(e, t) {
	let n = !1;
	for (let [r, i] of Object.entries(t)) {
		let t = Number(r);
		i === null ? Object.hasOwn(e, t) && (delete e[t], n = !0) : e[t] !== i && (e[t] = i, n = !0);
	}
	return n;
}
function o(e, n) {
	if (!n) return;
	let o = !1;
	if (n.rowHeightRanges && (i(e, n.rowHeightRanges), o = !0), n.rows && (o = a(e.rowHeights, n.rows) || o), n.cols && (o = a(e.colWidths, n.cols) || o), n.columnCssWidths) for (let [r, i] of Object.entries(n.columnCssWidths)) t(e, Number(r), i) && (o = !0);
	o && r.invalidate(e);
}
function s(e, t) {
	return t ? c(e, t) : e;
}
function c(t, r) {
	let i = { ...t };
	return r && (i.rowHeights = { ...t.rowHeights }, i.colWidths = { ...t.colWidths }), e(t, i), n(t, i), o(i, r), i;
}
var l = Symbol("xlsx-viewer-render-context");
function u(e, t, n) {
	if (!Number.isFinite(t) || t <= 0) throw Error("XLSX maximum digit width must be a finite positive number");
	return {
		...e,
		[l]: {
			maximumDigitWidth: t,
			worksheet: n?.worksheet,
			projection: n?.projection
		}
	};
}
function d(e) {
	let t = e[l], n = { ...e };
	return delete n[l], t ? {
		opts: n,
		layoutMetrics: { maximumDigitWidth: t.maximumDigitWidth },
		worksheet: t.worksheet,
		projection: t.projection
	} : { opts: n };
}
//#endregion
export { d as n, u as r, s as t };
