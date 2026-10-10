import { a as e, n as t, r as n, t as r } from "./units-DIk-8W6L.js";
import { o as i, s as a } from "./pixel-budget-QcsXr21f.js";
//#region packages/core/src/fonts/symbol-font.ts
var o = {
	167: "♣",
	168: "♦",
	169: "♥",
	170: "♠",
	171: "↔",
	172: "←",
	173: "↑",
	174: "→",
	175: "↓",
	183: "•",
	184: "÷",
	185: "≠",
	180: "×",
	176: "°",
	177: "±",
	163: "≤",
	179: "≥"
}, s = {
	33: "✏",
	34: "✂",
	36: "👓",
	74: "☺",
	75: "😐",
	76: "☹",
	118: "❖",
	167: "▪",
	108: "●",
	110: "■",
	116: "◆",
	119: "◆",
	251: "✗",
	252: "✓",
	253: "☒",
	254: "☑",
	223: "←",
	224: "→",
	225: "↑",
	226: "↓",
	227: "↖",
	228: "↗",
	229: "↙",
	230: "↘"
};
function c(e) {
	let t = {};
	for (let n of Object.keys(e)) {
		let r = Number(n);
		t[r] = e[r], t[61440 + r] = e[r];
	}
	return t;
}
var l = c(o), u = c(s);
function d(e, t) {
	if (!t) return e;
	let n = t.trim().toLowerCase(), r = n === "wingdings" ? u : n === "symbol" ? l : null;
	return r ? r[e.charCodeAt(0)] ?? e : e;
}
function f(e) {
	if (!e) return !1;
	let t = e.toLowerCase();
	return t === "symbol" || t.includes("wingdings");
}
function p(e, t) {
	if (!f(t) || e.length === 0) return [{
		text: e,
		mapped: !1
	}];
	let n = [], r = "", i = null;
	for (let a of e) {
		let e = d(a, t), o = e !== a;
		i === null || o === i ? (i = o, r += e) : (n.push({
			text: r,
			mapped: i
		}), i = o, r = e);
	}
	return r.length > 0 && n.push({
		text: r,
		mapped: i ?? !1
	}), n;
}
//#endregion
//#region packages/core/src/chart/effective-style.ts
var m = [
	"fontSizeHpt",
	"fontBold",
	"fontItalic",
	"fontFace",
	"fontLanguage",
	"fontBaseline",
	"textRotation",
	"textWrap",
	"textVerticalAnchor",
	"textVerticalMode",
	"textLInsEmu",
	"textTInsEmu",
	"textRInsEmu",
	"textBInsEmu",
	"textBodyAuthored"
], h = [
	"fontColor",
	"fontColors",
	"fontColorIndex",
	"fontFormattingIndices",
	"fontPaintAuthored",
	"fontHidden"
], g = [
	"fillPaints",
	"fillColors",
	"fillHidden",
	"fillPaintAuthored",
	"fillNoStyle",
	"fillColorIndex",
	"fillFormattingIndices",
	"fillSemanticFallbackIndices"
], _ = [
	"lineColors",
	"linePaints",
	"linePaintAuthored",
	"lineHidden",
	"lineNoStyle",
	"lineColorIndex",
	"lineFormattingIndices",
	"lineSemanticFallbackIndices"
], v = [
	"shapePropertiesPresent",
	"allowNoFillOverride",
	"allowNoLineOverride"
], y = [
	"lineWidthEmu",
	"lineCap",
	"lineJoin",
	"lineCompound"
], b = [
	"lineDash",
	"lineDashAuthored",
	"lineCustomDash"
], x;
function S(e) {
	if (x) return e();
	x = /* @__PURE__ */ new WeakMap();
	try {
		return e();
	} finally {
		x = void 0;
	}
}
function C(e) {
	let t = x?.get(e);
	if (t) return t;
	let n = /* @__PURE__ */ new WeakMap();
	for (let t = 0; t < e.series.length; t++) n.set(e.series[t], t);
	let r = new Int32Array(e.series.length);
	r.fill(-1);
	for (let t = 0; t < (e.plotGroups?.length ?? 0); t++) {
		let n = e.plotGroups[t], i = Math.min(e.series.length, n.seriesStart + n.seriesCount);
		for (let e = Math.max(0, n.seriesStart); e < i; e++) r[e] = t;
	}
	let i = {
		series: n,
		groupBySeries: r
	};
	return x?.set(e, i), i;
}
function w(e, t, n = -1) {
	return C(e).series.get(t) ?? n;
}
function T(e, t) {
	return t >= 0 && t < e.series.length ? C(e).groupBySeries[t] ?? -1 : -1;
}
function E(e, t) {
	let n = T(e, t);
	return n >= 0 ? e.plotGroups?.[n] : void 0;
}
function D(...e) {
	for (let t of e) if (t != null && (t.lineDashAuthored === !0 || t.lineDash != null || t.lineCustomDash != null)) return t;
}
var O = [
	"shadows",
	"innerShadows",
	"glows",
	"softEdges",
	"reflections",
	"effectAuthored",
	"effectNoStyle",
	"effectUnsupported",
	"effectFormattingIndices",
	"effectColorIndex"
];
function k(e, t, n) {
	if (!t) return;
	let r = e, i = t;
	for (let e of n) {
		let t = i[e];
		t != null && (r[e] = t);
	}
}
function A(e, t) {
	let n = e;
	return t.some((e) => n[e] !== void 0 && n[e] !== null);
}
function j(e, t) {
	if (!e) return t ?? void 0;
	if (!t) return e;
	let n = {};
	if (k(n, e, m), k(n, t, m), k(n, e, h), A(t, h)) {
		for (let e of h) delete n[e];
		k(n, t, h);
	}
	if (k(n, e, g), t.fillNoStyle !== !0 && A(t, g)) {
		for (let e of g) delete n[e];
		k(n, t, g);
	}
	if (k(n, e, _), k(n, e, y), k(n, e, b), t.lineNoStyle !== !0 && A(t, _)) {
		for (let e of _) delete n[e];
		k(n, t, _);
	}
	if (k(n, t, y), A(t, b)) {
		for (let e of b) delete n[e];
		k(n, t, b);
	}
	if (k(n, e, O), t.effectNoStyle !== !0 && A(t, O)) {
		for (let e of O) delete n[e];
		k(n, t, O);
	}
	return k(n, t, v), n;
}
var ee = [
	"dataPoint",
	"dataPoint3D",
	"dataPointLine",
	"dataPointMarker",
	"dataPointWireframe",
	"upBar",
	"downBar",
	"hiLoLine"
], te = new Set([
	"boxWhisker",
	"clusteredColumn",
	"funnel",
	"histogram",
	"pareto",
	"paretoLine",
	"regionMap",
	"sunburst",
	"treemap",
	"waterfall"
]), M = Symbol("chartExDelegate");
function N(e, t) {
	return {
		...e,
		...t,
		[M]: !0
	};
}
function P(e) {
	return te.has(e.chartType) || e[M] === !0;
}
function ne(e) {
	if (!e) return e;
	let t = { ...e };
	for (let e of ee) delete t[e];
	return t;
}
function F(e) {
	let t = e.classicChartStyleRoles, n = !P(e), r = e.linkedChartStyleRoles ?? e.chartStyleRoles, i = n ? ne(r) : r;
	if (!t) return n ? {
		...e,
		linkedChartStyleRoles: ne(e.linkedChartStyleRoles),
		chartStyleRoles: ne(e.chartStyleRoles),
		chartexDataPointStyle: void 0,
		chartexDataPointLineStyle: void 0,
		chartexDataPointMarkerStyle: void 0
	} : e;
	let a = new Set([...Object.keys(t), ...Object.keys(i ?? {})]), o = {};
	for (let e of a) {
		let n = j(t[e], i?.[e]);
		n && (o[e] = n);
	}
	let s = {};
	for (let n of [
		"dataPoint",
		"dataPoint3D",
		"dataPointLine",
		"dataPointMarker"
	]) {
		let r = j(e.classicVaryingPointChartStyleRoles?.[n] ?? t[n], i?.[n]);
		r && (s[n] = r);
	}
	let c = e.classicVaryingPointChartStyleRolesByGroup?.map((e) => {
		if (!e) return null;
		let t = {};
		for (let n of [
			"dataPoint",
			"dataPoint3D",
			"dataPointLine",
			"dataPointMarker"
		]) {
			let r = j(e[n], i?.[n]);
			r && (t[n] = r);
		}
		return t;
	});
	return {
		...e,
		linkedChartStyleRoles: i,
		chartStyleRoles: o,
		varyingPointChartStyleRoles: Object.keys(s).length > 0 ? s : void 0,
		varyingPointChartStyleRolesByGroup: c,
		chartexDataPointStyle: o.dataPoint,
		chartexDataPointLineStyle: o.dataPointLine,
		chartexSeriesLineStyle: o.seriesLine,
		chartexDataPointMarkerStyle: o.dataPointMarker
	};
}
function I(e, t) {
	return e.linkedChartStyleRoles?.[t] ?? (e.classicChartStyleRoles == null ? e.chartStyleRoles?.[t] : void 0);
}
function L(e, t) {
	let n = E(e, t);
	return n ? n.kind === "pie" || n.kind === "pie3D" || n.kind === "doughnut" || n.kind === "ofPie" ? n.varyColors !== !1 : n.kind === "bubble" ? n.seriesCount === 1 && n.varyColors !== !1 : n.kind === "line" || n.kind === "scatter" ? n.seriesCount === 1 && n.varyColors === !0 : n.kind === "radar" ? n.radarStyle !== "filled" && n.seriesCount === 1 && n.varyColors === !0 : (n.kind === "bar" || n.kind === "bar3D") && n.seriesCount === 1 && n.varyColors === !0 : e.chartType === "pie" || e.chartType === "pie3D" || e.chartType === "doughnut" || e.chartType === "ofPie" ? e.varyColors !== !1 : e.chartType === "bubble" ? e.series.length === 1 && e.varyColors !== !1 : e.varyColors === !0 && e.series.length === 1 && (e.chartType.includes("Bar") || e.chartType === "line" || e.chartType === "stackedLine" || e.chartType === "stackedLinePct" || e.chartType === "scatter" || e.chartType === "radar" && e.radarStyle !== "filled");
}
function R(e, t, n) {
	if (!L(e, n)) return e.chartStyleRoles?.[t];
	let r = T(e, n), i = r >= 0 ? e.varyingPointChartStyleRolesByGroup?.[r] : void 0;
	return i == null ? e.varyingPointChartStyleRoles?.[t] ?? e.chartStyleRoles?.[t] : i[t];
}
//#endregion
//#region packages/core/src/chart/sparse-style-index.ts
var z;
function re(e) {
	if (z) return e();
	z = {
		compact: /* @__PURE__ */ new WeakMap(),
		membership: /* @__PURE__ */ new WeakMap()
	};
	try {
		return e();
	} finally {
		z = void 0;
	}
}
function ie(e, t) {
	if (!z) return e.indexOf(t);
	let n = z.compact.get(e);
	if (!n) {
		let t = /* @__PURE__ */ new Map();
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			t.has(r) || t.set(r, n);
		}
		n = t, z.compact.set(e, n);
	}
	return n.get(t) ?? -1;
}
function ae(e, t) {
	if (!e) return !1;
	if (!z) return e.includes(t);
	let n = z.membership.get(e);
	return n || (n = new Set(e), z.membership.set(e, n)), n.has(t);
}
//#endregion
//#region packages/core/src/chart/style-paint.ts
function oe(e, t, n) {
	let r = t === "font" ? e.fontFormattingIndices : t === "fill" ? e.fillFormattingIndices : t === "line" ? e.lineFormattingIndices : e.effectFormattingIndices, i = r ? ie(r, n) : -1;
	return i >= 0 ? i : n;
}
function se(e, t) {
	if (!e) return null;
	if (!e.fontColors?.length) return e.fontColor ?? null;
	let n = e.fontColorIndex ?? oe(e, "font", t);
	return e.fontColors[n % e.fontColors.length] ?? null;
}
function ce(e, t, n) {
	if (!e) return null;
	let r = t === "fill" ? e.fillColors : e.lineColors;
	return r?.length ? r[((t === "fill" ? e?.fillColorIndex : e?.lineColorIndex) ?? oe(e, t, n)) % r.length] ?? null : null;
}
function le(e, t) {
	if (!e) return null;
	let n = e.fillPaints;
	return n?.length ? n[(e.fillColorIndex ?? oe(e, "fill", t)) % n.length] ?? null : null;
}
function ue(e, t) {
	if (!e) return null;
	let n = e.linePaints;
	return n?.length ? n[(e.lineColorIndex ?? oe(e, "line", t)) % n.length] ?? null : null;
}
function B(e, t) {
	if (!e) return;
	if (e.fillHidden) return e.fillNoStyle ? void 0 : null;
	if (ae(e.fillSemanticFallbackIndices, t)) return;
	let n = le(e, t);
	if (n) return n;
	let r = ce(e, "fill", t);
	return r ? {
		fillType: "solid",
		color: r
	} : e.fillPaintAuthored === !0 ? null : void 0;
}
function V(e, t) {
	if (!e) return;
	if (e.lineHidden) return e.lineNoStyle ? void 0 : null;
	if (ae(e.lineSemanticFallbackIndices, t)) return;
	let n = ue(e, t);
	if (n) return n;
	let r = ce(e, "line", t);
	return r ? {
		fillType: "solid",
		color: r
	} : e.linePaintAuthored === !0 ? null : void 0;
}
function de(e) {
	let t = e?.chartexStyle;
	return e?.fillHidden === !0 || e?.color != null || t != null && t.fillNoStyle !== !0 && (t.fillPaintAuthored === !0 || t.fillHidden === !0 || t.fillColors?.some((e) => e != null) === !0 || t.fillPaints?.some((e) => e != null) === !0);
}
function fe(e) {
	let t = e?.chartexStyle;
	return e?.lineHidden != null || e?.lineColor != null || e?.lineWidthEmu != null || e?.lineDash != null || t?.linePaintAuthored === !0 || t?.lineHidden != null || t?.lineColors?.some((e) => e != null) === !0 || t?.linePaints?.some((e) => e != null) === !0 || t?.lineWidthEmu != null || t?.lineDash != null || t?.lineCustomDash != null || t?.lineCap != null || t?.lineJoin != null;
}
function pe(e, t, n, r, i = e.chartexDataPointStyle) {
	let a = de(n), o = a ? n?.fillHidden === !0 ? {
		...n.chartexStyle,
		fillHidden: !0,
		fillPaintAuthored: !0
	} : n?.chartexStyle : t?.chartexStyle, s = a ? n?.color : t?.color, c = B(o, r);
	return c === void 0 ? s ? {
		fillType: "solid",
		color: s
	} : B(i, r) : c;
}
function me(e, t, n, r, i = e.chartexDataPointStyle) {
	for (let e of [n, t]) {
		if (!e) continue;
		if (e.lineHidden === !0) return null;
		let t = V(e.chartexStyle, r);
		if (t !== void 0) return t;
		if (e.lineColor) return {
			fillType: "solid",
			color: e.lineColor
		};
	}
	return V(i, r);
}
function he(e, t) {
	return e == null ? !0 : t === "fill" ? e.fillNoStyle === !0 || e.allowNoFillOverride === !0 : e.lineNoStyle === !0 || e.allowNoLineOverride === !0;
}
function H(e, t, n) {
	let r = B(e, n);
	return r === null && e?.fillHidden === !0 && !he(t, "fill") ? void 0 : r;
}
function U(e, t, n) {
	let r = V(e, n);
	return r === null && e?.lineHidden === !0 && !he(t, "line") ? void 0 : r;
}
function W(e) {
	return he(e, "fill") ? null : void 0;
}
function ge(e) {
	return he(e, "line") ? null : void 0;
}
function G(e, t, n, ...r) {
	for (let e of r) {
		let r = H(e, t, n);
		if (r !== void 0) return r;
	}
	return B(e, n);
}
function _e(e, t, n, ...r) {
	for (let e of r) {
		let r = U(e, t, n);
		if (r !== void 0) return r;
	}
	return V(e, n);
}
function ve(e, t, n) {
	let r = I(e, n);
	if (t.fillHidden === !0) {
		let e = W(r);
		if (e !== void 0) return e;
	}
	if (t.fill != null) return t.fill;
	if (t.fillColor != null) return {
		fillType: "solid",
		color: t.fillColor
	};
	let i = H(t.style, r, 0);
	return i === void 0 ? t.fillPaintAuthored === !0 && t.fillHidden !== !0 ? null : G(e.chartStyleRoles?.[n], r, 0, t.style) : i;
}
function ye(e, t, n) {
	let r = t?.style, i = e.chartStyleRoles?.[n], a = I(e, n), o;
	t?.fillHidden === !0 ? (o = W(a), o === void 0 && (o = B(i, 0))) : o = t?.fillColor ? {
		fillType: "solid",
		color: t.fillColor
	} : G(i, a, 0, r);
	let s;
	t?.lineHidden === !0 ? (s = ge(a), s === void 0 && (s = V(i, 0))) : s = t?.lineColor ? {
		fillType: "solid",
		color: t.lineColor
	} : _e(i, a, 0, r);
	let c = i, l = D(t?.lineDash == null ? void 0 : {
		lineDash: t.lineDash,
		lineDashAuthored: !0
	}, r, c);
	return {
		fill: o,
		line: s,
		lineWidthEmu: t?.lineWidthEmu ?? r?.lineWidthEmu ?? c?.lineWidthEmu,
		lineDash: l?.lineDash,
		lineCustomDash: l?.lineCustomDash,
		lineCap: r?.lineCap ?? c?.lineCap,
		lineJoin: r?.lineJoin ?? c?.lineJoin
	};
}
//#endregion
//#region packages/core/src/chart/classic-data-point-style.ts
function be(e, t, n, r, i) {
	let a = r?.chartexStyle, o = n.chartexStyle, s = w(e, n), c = R(e, t, s >= 0 ? s : i) ?? (t === "dataPoint" ? e.chartexDataPointStyle : e.chartexDataPointLineStyle), l = I(e, t), u = P(e) ? me(e, n, r, i) : r?.lineHidden === !0 ? null : U(a, l, r?.idx ?? i);
	u === void 0 && r?.lineColor && (u = {
		fillType: "solid",
		color: r.lineColor
	}), u === void 0 && (u = n.lineHidden === !0 ? null : U(o, l, i)), u === void 0 && n.lineColor && (u = {
		fillType: "solid",
		color: n.lineColor
	}), u === void 0 && (u = V(c, i));
	let d = D(r?.lineDash == null ? void 0 : {
		lineDash: r.lineDash,
		lineDashAuthored: !0
	}, a, o, c);
	return {
		paint: u,
		widthEmu: r?.lineWidthEmu ?? a?.lineWidthEmu ?? n.lineWidthEmu ?? o?.lineWidthEmu ?? c?.lineWidthEmu,
		dash: d?.lineDash,
		customDash: d?.lineCustomDash,
		cap: a?.lineCap ?? o?.lineCap ?? c?.lineCap,
		join: a?.lineJoin ?? o?.lineJoin ?? c?.lineJoin
	};
}
function xe(e, t, n, r, i) {
	if (P(e)) return pe(e, t, n, r);
	let a = w(e, t), o = R(e, "dataPoint", a >= 0 ? a : r) ?? e.chartexDataPointStyle, s = I(e, "dataPoint"), c = H(n?.chartexStyle, s, n?.idx ?? r);
	if (c !== void 0) return c;
	if (n?.fillHidden === !0) {
		let e = W(s);
		if (e !== void 0) return e;
	}
	if (n?.color === "00000000") return null;
	if (n?.color) return {
		fillType: "solid",
		color: n.color
	};
	let l = i == null ? null : t.dataPointColors?.[i];
	if (l === "00000000") return null;
	if (l) return {
		fillType: "solid",
		color: l
	};
	let u = H(t.chartexStyle, s, r);
	return u === void 0 ? t.color === "00000000" ? null : t.fillPattern ? t.fillPattern : B(o, r) : u;
}
//#endregion
//#region packages/core/src/chart/category-spacing.ts
function Se(e, t) {
	return t == null || !Number.isFinite(t) ? e : e * Math.max(0, Math.min(1e3, t)) / 100;
}
function Ce(e, t, n, r = !1) {
	let i = Math.max(0, t - 1), a = Number.isFinite(e) ? Math.max(0, Math.min(i, e)) : 0, o = n ? (a + .5) / Math.max(1, t) : t === 1 ? .5 : a / i;
	return r ? 1 - o : o;
}
function we(e, t) {
	if (e <= 0) return [];
	let n = [], r = t ? e : e - 1;
	for (let i = 0; i <= r; i++) n.push(t ? i / e : e === 1 ? .5 : i / (e - 1));
	return n;
}
function Te(e, t) {
	return e <= 0 ? [] : t ? Array.from({ length: e }, (t, n) => (n + .5) / e) : e <= 1 ? [] : Array.from({ length: e - 1 }, (t, n) => (n + .5) / (e - 1));
}
function Ee(e, t, n, r, i) {
	if (i == null) return {
		fraction: Ce(e, t, n, r),
		textAlign: "center"
	};
	let a = Math.max(0, t - 1), o = Number.isFinite(e) ? Math.max(0, Math.min(a, e)) : 0, s, c;
	if (t <= 1 ? (s = 0, c = 1) : n ? (s = o / t, c = (o + 1) / t) : (s = o === 0 ? 0 : (o - .5) / a, c = o === a ? 1 : (o + .5) / a), r) {
		let e = 1 - c;
		c = 1 - s, s = e;
	}
	return i === "l" ? {
		fraction: s,
		textAlign: "left"
	} : i === "r" ? {
		fraction: c,
		textAlign: "right"
	} : {
		fraction: (s + c) / 2,
		textAlign: "center"
	};
}
function De(e, t) {
	return e != null && Number.isFinite(e) ? Math.max(0, Math.min(500, e)) : t === "legacy" ? 150 : 33;
}
function Oe(e) {
	if (e.categories.length > 0) return e.categories;
	let t = e.series[0];
	if (t?.categories && t.categories.length > 0) return t.categories;
	let n = 0;
	for (let t of e.series) t.values.length > n && (n = t.values.length);
	return n > 0 ? Array.from({ length: n }, (e, t) => String(t + 1)) : [];
}
//#endregion
//#region packages/core/src/chart/layout.ts
function ke(e, t, n) {
	let r = Math.max(1, t), i = [], a = [], o = 0;
	for (let t = 0; t < e.length; t++) {
		let s = Math.min(r, Math.max(0, e[t])), c = a.length === 0 ? s : o + n + s;
		a.length > 0 && c > r ? (i.push(a), a = [t], o = s) : (a.push(t), o = c);
	}
	return a.length > 0 && i.push(a), i;
}
var Ae = 14;
function je(e, t) {
	return typeof e == "number" && Number.isFinite(e) && e >= 100 && e <= 4e5 ? e / 100 * t : null;
}
function Me(e, t, n) {
	return je(e.titleFontSizeHpt, n) ?? Ae * n;
}
var Ne = .62;
function Pe(e, t, n, r, i) {
	if (!e.title && !e.titlePresent) return {
		fontPx: 0,
		topPad: 0,
		bottomPad: 0,
		bandH: 0
	};
	let a = Me(e, t, n), o = a + t * r + t * i, s = Math.min(Math.max(0, o - a), a * Ne);
	return {
		fontPx: a,
		topPad: s,
		bottomPad: o - a - s,
		bandH: o
	};
}
function Fe(e, t, n, r, i) {
	if (!e.showLegend) return null;
	let a = e.legendPos ?? "r", o = a === "l" ? "l" : a === "t" ? "t" : a === "b" ? "b" : "r";
	if (o === "r" || o === "l") {
		if (i) {
			let e = Math.min(80, t * .3), n = t * .3, r = Math.max(0, ...i.itemWidths) + i.horizontalPadding;
			return {
				side: o,
				reserveW: Math.min(n, Math.max(e, r)),
				reserveH: 0
			};
		}
		return {
			side: o,
			reserveW: Math.max(80, t * r),
			reserveH: 0
		};
	}
	if (i) {
		let e = Math.max(1, t - i.horizontalPadding), r = ke(i.itemWidths, e, i.itemGap).length * i.rowHeight + i.verticalPadding;
		return {
			side: o,
			reserveW: 0,
			reserveH: Math.min(n * .3, r)
		};
	}
	return {
		side: o,
		reserveW: 0,
		reserveH: Math.max(18, n * .08)
	};
}
function Ie(e, t = !1) {
	return t ? {
		legRightW: 0,
		legLeftW: 0,
		legTopH: 0,
		legBottomH: 0
	} : {
		legRightW: e?.side === "r" ? e.reserveW : 0,
		legLeftW: e?.side === "l" ? e.reserveW : 0,
		legTopH: e?.side === "t" ? e.reserveH : 0,
		legBottomH: e?.side === "b" ? e.reserveH : 0
	};
}
function Le(e, t) {
	return je(e, t) ?? 10 * t;
}
function Re(e, t) {
	return Math.max(0, e != null && Number.isFinite(e) ? e : 0) / n * t;
}
function ze(e, t, n) {
	let r = 0, i = !1;
	if (n != null) switch (i = !0, n) {
		case "horz": break;
		case "vert270":
			r -= 90;
			break;
		case "vert":
		case "wordArtVert":
		case "eaVert":
		case "mongolianVert":
		case "wordArtVertRtl":
			r += 90;
			break;
	}
	return t != null && Number.isFinite(t) && (r += t / 6e4, i = !0), i ? r * Math.PI / 180 : e === "left" || e === "right" ? -Math.PI / 2 : 0;
}
function Be(e) {
	return Math.max(8, e * .02);
}
function Ve(e, t, n, r) {
	let i = Le(e.catAxisTitleFontSizeHpt, r), a = Le(e.valAxisTitleFontSizeHpt, r), o = Re(e.catAxisTitleTextVerticalInsetEmu, r), s = Re(e.valAxisTitleTextVerticalInsetEmu, r);
	return {
		catFontPx: i,
		valFontPx: a,
		catBandH: e.catAxisTitle ? i + o + Be(n) + 4 : 0,
		valBandW: e.valAxisTitle ? a + s + Be(t) + 4 : 0
	};
}
var He = 2.25, Ue = 2.75, We = 2.15, Ge = 3.05;
function Ke(e, t, n) {
	if (!e.title && !e.titlePresent) return {
		fontPx: 0,
		topPad: 0,
		bottomPad: 0,
		bandH: 0
	};
	let r = Me(e, t, n), i = r * (e.cartesianAutoLayoutProfile === "wordClassicColumn" ? We : He), a = Math.min(Math.max(0, i - r), r * Ne);
	return {
		fontPx: r,
		topPad: a,
		bottomPad: i - r - a,
		bandH: i
	};
}
function qe(e, t, n) {
	let r = Je(e), i = Se(r, t);
	return e * (n === "wordClassicColumn" ? Ge : Ue) + i - r;
}
function Je(e) {
	return 5 / 6 * e;
}
function Ye(e) {
	return e;
}
var Xe = 1.5;
function Ze(e) {
	let t = e.outerTextMarginPx ?? 0;
	return {
		t: e.valAxisHidden ? 0 : e.valLabelFontPx / 2 + t,
		r: (e.secondaryBandW ?? 0) > 0 ? (e.secondaryBandW ?? 0) + t : 0,
		b: e.catAxisHidden ? 0 : e.catLabelFontPx + (e.catLabelGapPx ?? Je(e.catLabelFontPx)) + e.catTitleBandH + t,
		l: e.valAxisHidden ? 0 : e.valLabelWidth + (e.valLabelGapPx ?? Ye(e.valLabelFontPx)) + e.valTitleBandW + t
	};
}
function Qe(e, t, n) {
	let r = e.xMode || "factor", i = e.yMode || "factor", a = e.wMode || "factor", o = e.hMode || "factor", s = r === "edge" ? t.x + e.x * t.w : n.x + e.x * t.w, c = i === "edge" ? t.y + e.y * t.h : n.y + e.y * t.h, l = e.w == null ? n.w : a === "edge" ? t.x + e.w * t.w - s : e.w * t.w, u = e.h == null ? n.h : o === "edge" ? t.y + e.h * t.h - c : e.h * t.h;
	return ![
		s,
		c,
		l,
		u
	].every(Number.isFinite) || l <= 0 || u <= 0 ? null : {
		x: s,
		y: c,
		w: l,
		h: u
	};
}
function $e(e, t, n, r, i, a, o) {
	let s = o.titleBand ?? Pe(e, i, a, o.titleTopPadFrac ?? 0, o.titleBottomPadFrac ?? 0), c = o.legendReserve === void 0 ? Fe(e, r, i, o.legendSideReserveFrac) : o.legendReserve, l = Ie(c, e.legendOverlay === !0), u = Ve(e, r, i, a), d, f, p, m;
	if (o.radialGapFrac != null) {
		let e = i * o.radialGapFrac;
		p = r - l.legRightW - l.legLeftW, m = i - s.bandH - l.legTopH - l.legBottomH - e, d = t + l.legLeftW, f = n + s.bandH + l.legTopH + e;
	} else {
		let e = o.pad;
		if (!e) throw Error("computeChartFrame: cartesian frame requires params.pad");
		d = t + e.l, f = n + e.t, p = r - e.l - e.r, m = i - e.t - e.b;
	}
	let h = !1, g = o.honorPlotAreaManualLayout ? e.plotAreaManualLayout : null;
	if (g) {
		let e = g.layoutTarget === "inner" ? {
			t: 0,
			r: 0,
			b: 0,
			l: 0
		} : o.manualOuterInsets ?? {
			t: 0,
			r: 0,
			b: 0,
			l: 0
		}, a = g.layoutTarget === "inner" ? {
			x: d,
			y: f,
			w: p,
			h: m
		} : {
			x: d - e.l,
			y: f - e.t,
			w: p + e.l + e.r,
			h: m + e.t + e.b
		}, s = Qe(g, {
			x: t,
			y: n,
			w: r,
			h: i
		}, a);
		s && s.w > e.l + e.r && s.h > e.t + e.b && (d = s.x + e.l, f = s.y + e.t, p = s.w - e.l - e.r, m = s.h - e.t - e.b, h = !0);
	}
	return {
		title: s,
		legend: c,
		legendBands: l,
		axisTitles: u,
		plotRect: {
			px0: d,
			py0: f,
			pw: p,
			ph: m
		},
		plotAreaManualLayoutApplied: h,
		center: {
			cx: d + p / 2,
			cy: f + m / 2
		}
	};
}
//#endregion
//#region packages/core/src/chart/data-label-layout.ts
var et = (e) => [
	e.x,
	e.y,
	e.w,
	e.h
].every(Number.isFinite) && e.w > 0 && e.h > 0;
function tt(e, t) {
	let n = Math.max(e.x, t.x), r = Math.max(e.y, t.y), i = Math.min(e.x + e.w, t.x + t.w), a = Math.min(e.y + e.h, t.y + t.h);
	return i > n && a > r ? {
		x: n,
		y: r,
		w: i - n,
		h: a - r
	} : null;
}
function nt(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function rt(e, t, n, r, i, a = t) {
	if (!et(t) || !et(a) || !Number.isFinite(r) || r <= 0 || ![n.w, n.h].every(Number.isFinite) || n.w < 0 || n.h <= 0) return null;
	let o = r * .5, s = t, c, l, u = !1, d = "center", f = "middle";
	if (e.kind === "point") {
		if (![
			e.x,
			e.y,
			e.markerGap ?? 0
		].every(Number.isFinite)) return null;
		let t = o + Math.max(0, e.markerGap ?? 0);
		switch (c = e.x, l = e.y, e.position ?? "r") {
			case "l":
				c -= t + n.w / 2, d = "right";
				break;
			case "t":
				l -= t + n.h / 2, f = "bottom";
				break;
			case "b":
				l += t + n.h / 2, f = "top";
				break;
			case "ctr":
			case "inEnd":
			case "bestFit": break;
			default:
				c += t + n.w / 2, d = "left";
				break;
		}
	} else if (e.kind === "box") {
		if (![
			e.rect.x,
			e.rect.y,
			e.rect.w,
			e.rect.h
		].every(Number.isFinite) || e.rect.w <= 0 || e.rect.h <= 0) return null;
		let r = tt(e.rect, t);
		if (!r) return null;
		let i = e.position ?? "ctr";
		c = r.x + r.w / 2, l = r.y + r.h / 2, i === "inBase" ? (s = {
			x: r.x + o,
			y: r.y + o,
			w: r.w - o,
			h: r.h - o
		}, c = s.x + n.w / 2, l = s.y + n.h / 2, d = "left", f = "top") : i === "inEnd" ? (s = {
			x: r.x + o,
			y: r.y,
			w: r.w - o,
			h: r.h - o
		}, c = s.x + n.w / 2, l = s.y + s.h - n.h / 2, d = "left", f = "bottom") : i === "l" ? (s = {
			x: r.x + o,
			y: r.y + o,
			w: r.w - o,
			h: r.h - o * 2
		}, c = s.x + n.w / 2, d = "left") : i === "r" || i === "outEnd" ? (s = {
			x: r.x,
			y: r.y + o,
			w: r.w - o,
			h: r.h - o * 2
		}, c = s.x + s.w - n.w / 2, d = "right") : i === "t" ? (s = {
			x: r.x + o,
			y: r.y + o,
			w: r.w - o * 2,
			h: r.h - o
		}, l = s.y + n.h / 2, f = "top") : i === "b" ? (s = {
			x: r.x + o,
			y: r.y,
			w: r.w - o * 2,
			h: r.h - o
		}, l = s.y + s.h - n.h / 2, f = "bottom") : s = {
			x: r.x + o,
			y: r.y + o,
			w: r.w - o * 2,
			h: r.h - o * 2
		};
	} else {
		if (![
			e.rect.x,
			e.rect.y,
			e.rect.w,
			e.rect.h
		].every(Number.isFinite) || e.rect.w < 0 || e.rect.h < 0) return null;
		let r = e.position ?? "outEnd", i = r === "inBase" || r === "inEnd" || r === "ctr";
		if (u = !i, i) {
			let n = tt(e.rect, t);
			if (!n) return null;
			s = n;
		} else if (e.orientation === "vertical" && e.rect.w <= 0 || e.orientation === "horizontal" && e.rect.h <= 0) return null;
		let a = e.rect.x + e.rect.w / 2, p = e.rect.y + e.rect.h / 2;
		if (c = a, l = p, e.orientation === "vertical") {
			let t = e.negative ? e.rect.y + e.rect.h : e.rect.y, i = e.negative ? e.rect.y : e.rect.y + e.rect.h;
			r === "inBase" ? (l = i + (e.negative ? 1 : -1) * (o + n.h / 2), f = e.negative ? "top" : "bottom") : r === "inEnd" ? (l = t + (e.negative ? -1 : 1) * (o + n.h / 2), f = e.negative ? "bottom" : "top") : r !== "ctr" && (l = t + (e.negative ? 1 : -1) * (o + n.h / 2), f = e.negative ? "top" : "bottom");
		} else {
			let t = e.negative ? e.rect.x : e.rect.x + e.rect.w, i = e.negative ? e.rect.x + e.rect.w : e.rect.x;
			r === "inBase" ? (c = i + (e.negative ? -1 : 1) * (o + n.w / 2), d = e.negative ? "right" : "left") : r === "inEnd" ? (c = t + (e.negative ? 1 : -1) * (o + n.w / 2), d = e.negative ? "left" : "right") : r !== "ctr" && (c = t + (e.negative ? -1 : 1) * (o + n.w / 2), d = e.negative ? "right" : "left");
		}
	}
	let p = Math.max(2, r * .5), m = Math.max(2, r * .9);
	if (s.w < p || s.h < m) return null;
	let h = {
		x: c - Math.min(n.w, s.w) / 2,
		y: l - Math.min(n.h, s.h) / 2,
		w: Math.min(n.w, s.w),
		h: Math.min(n.h, s.h)
	};
	if (i) {
		let e = Qe(i, a, h);
		if (!e) return null;
		h = e, d = "center", f = "middle";
		let n = tt(e, t);
		if (!n || (s = n, s.w < p || s.h < m)) return null;
	}
	let g = Math.min(Math.max(p, h.w), s.w), _ = Math.min(Math.max(m, h.h), s.h), v = g / 2, y = _ / 2, b = u || i ? h.x + h.w / 2 : nt(h.x + h.w / 2, s.x + v, s.x + s.w - v), x = u || i ? h.y + h.h / 2 : nt(h.y + h.h / 2, s.y + y, s.y + s.h - y);
	return [b, x].every(Number.isFinite) ? {
		x: d === "left" ? b - v : d === "right" ? b + v : b,
		y: f === "top" ? x - y : f === "bottom" ? x + y : x,
		textAlign: d,
		textBaseline: f,
		maxWidth: s.w,
		maxHeight: s.h,
		clip: s,
		rect: h
	} : null;
}
var it = 4096, at = 4;
function ot(e, t, n) {
	if (n(e) <= t) return e;
	if (n("…") > t) return "";
	let r = 0, i = Array.from(e), a = i.length;
	for (; r < a;) {
		let e = Math.ceil((r + a) / 2);
		n(`${i.slice(0, e).join("")}…`) <= t ? r = e : a = e - 1;
	}
	return `${i.slice(0, r).join("")}…`;
}
function st(e) {
	let t = "", n = 0;
	for (let r of e) {
		if (n >= it) return {
			value: t,
			truncated: !0
		};
		t += r, n++;
	}
	return {
		value: t,
		truncated: !1
	};
}
function ct(e, t, n, r, i) {
	if (![
		t,
		n,
		r
	].every(Number.isFinite) || t <= 0 || n < r || r <= 0) return [];
	let a = Math.max(1, Math.min(at, Math.floor(n / r))), o = st(e), s = o.value.split(/\r?\n/), c = [], l = o.truncated, u = (e) => {
		let n = [], r = "";
		for (let a of Array.from(e)) {
			let e = `${r}${a}`;
			r && i(e) > t ? (n.push(r), r = a) : r = e;
		}
		return r && n.push(r), n.filter((e) => i(e) <= t);
	};
	for (let e of s) {
		if (i(e) <= t) {
			c.push(e);
			continue;
		}
		let n = e.match(/\S+\s*|\s+/g) ?? [];
		if (n.length <= 1) c.push(...u(e));
		else {
			let e = "";
			for (let r of n) {
				let n = `${e}${r}`;
				if (i(n) <= t) e = n;
				else {
					e && c.push(e);
					let t = u(r);
					e = t.pop() ?? "", c.push(...t);
				}
			}
			e && c.push(e);
		}
	}
	l ||= c.length > a;
	let d = c.slice(0, a);
	return l && d.length > 0 && !d[d.length - 1].endsWith("…") && (d[d.length - 1] = ot(`${d[d.length - 1]}…`, t, i)), d;
}
//#endregion
//#region packages/core/src/chart/data-label-style.ts
function lt(e, t) {
	return (t?.deleted ?? e?.deleted) === !0;
}
function ut(e, t) {
	let n = e?.fontPaintAuthored === !0 || e?.fontColor != null || e?.fontHidden === !0, r = t?.fontPaintAuthored === !0 || t?.fontColor != null || t?.fontHidden === !0;
	return {
		fontColor: n ? e.fontColor : e?.fontColor ?? t?.fontColor,
		fontItalic: e?.fontItalic ?? t?.fontItalic,
		fontLanguage: e?.fontLanguage ?? t?.fontLanguage,
		fontBaseline: e?.fontBaseline ?? t?.fontBaseline,
		fontPaintAuthored: n ? !0 : r || void 0,
		fontHidden: n ? e.fontHidden : t?.fontHidden,
		textRotation: e?.textRotation ?? t?.textRotation,
		textWrap: e?.textWrap ?? t?.textWrap,
		textVerticalAnchor: e?.textVerticalAnchor ?? t?.textVerticalAnchor,
		textVerticalMode: e?.textVerticalMode ?? t?.textVerticalMode,
		textLInsEmu: e?.textLInsEmu ?? t?.textLInsEmu,
		textTInsEmu: e?.textTInsEmu ?? t?.textTInsEmu,
		textRInsEmu: e?.textRInsEmu ?? t?.textRInsEmu,
		textBInsEmu: e?.textBInsEmu ?? t?.textBInsEmu,
		textBodyAuthored: e?.textBodyAuthored === !0 || t?.textBodyAuthored === !0 || void 0,
		textAlign: e?.textAlign ?? t?.textAlign
	};
}
function dt(e, t) {
	return e?.textAlign === "l" ? "left" : e?.textAlign === "r" ? "right" : e?.textAlign === "ctr" ? "center" : t;
}
function ft(e, i) {
	let a = i / n, o = e?.textBodyAuthored === !0 ? r : 0, s = e?.textBodyAuthored === !0 ? t : 0;
	return {
		left: (e?.textLInsEmu ?? o) * a,
		top: (e?.textTInsEmu ?? s) * a,
		right: (e?.textRInsEmu ?? o) * a,
		bottom: (e?.textBInsEmu ?? s) * a
	};
}
function pt(e, t) {
	let n = Number.isFinite(e) ? e / 6e4 * Math.PI / 180 : 0;
	return t === "vert" ? n + Math.PI / 2 : t === "vert270" ? n + Math.PI * 3 / 2 : n;
}
function mt(e, t, n, r) {
	let i = pt(n, r);
	if (i === 0) return {
		w: e,
		h: t,
		radians: i
	};
	let a = Math.abs(Math.cos(i)), o = Math.abs(Math.sin(i));
	return {
		w: e * a + t * o,
		h: e * o + t * a,
		radians: i
	};
}
function ht(e, t, n, r, i, a, o) {
	return r !== 0 && (e.translate(t, n), e.rotate(r), e.translate(-t, -n)), {
		x: t + (i === "left" ? o.left : i === "right" ? -o.right : (o.left - o.right) / 2),
		y: n + (a === "top" ? o.top : a === "bottom" ? -o.bottom : (o.top - o.bottom) / 2)
	};
}
function gt(e, t, n, r, i, a) {
	return a?.textWrap === "none" ? ![
		t,
		n,
		r
	].every(Number.isFinite) || t <= 0 || n <= 0 || r <= 0 ? [] : st(e).value.split(/\r?\n/) : ct(e, t, n, r, i);
}
function _t(e, t, n, r, i, a, o = "center", s = "center", c = n.w, l = 0) {
	if (!a) {
		let n = Math.max(0, c) / 2, r = (e) => e === "left" ? -n : e === "right" ? n : 0, i = r(o) - r(s);
		return {
			x: e + Math.cos(l) * i,
			y: t + Math.sin(l) * i
		};
	}
	let u = o === "left" ? n.x : o === "right" ? n.x + n.w : n.x + n.w / 2, d = i?.textVerticalAnchor ?? (i?.textBodyAuthored === !0 ? "t" : "ctr");
	return d === "t" ? {
		x: u,
		y: n.y + Math.min(r, n.h) / 2
	} : d === "b" ? {
		x: u,
		y: n.y + n.h - Math.min(r, n.h) / 2
	} : {
		x: u,
		y: n.y + n.h / 2
	};
}
//#endregion
//#region packages/core/src/chart/legend-entry-plan.ts
function vt(e, t = 1, n = !0) {
	return e === "pie" || e === "ofPie" ? !0 : e === "doughnut" && (t <= 1 || n);
}
function yt(e) {
	return e.chartType === "bubble" && e.series.length === 1 && e.series[0]?.bubbleXSourceIsString === !0 ? !0 : !!e.varyColors && e.series.length === 1 && typeof e.chartType == "string" && (/Bar/.test(e.chartType) || e.chartType === "line" || e.chartType === "stackedLine" || e.chartType === "stackedLinePct" || e.chartType === "scatter" || e.chartType === "radar" && e.radarStyle !== "filled");
}
function bt(e, t) {
	let n = 0;
	for (let r of e.series[t]?.trendLines ?? []) r.lineHidden === !0 || r.linePaintAuthored === !0 && r.lineColor == null || n++;
	return n;
}
function xt(e, t = !1) {
	let n = e.series.map(() => ({
		firstIndex: -1,
		count: 0,
		pointDriven: !1
	}));
	if (e.series.length === 0) return n;
	let r = vt(e.chartType, e.series.length, e.varyColors !== !1), i = yt(e);
	if (r || i) return n[0] = {
		firstIndex: 0,
		count: e.series[0]?.values.length ?? 0,
		pointDriven: !0
	}, n;
	let a = 0;
	for (let r = 0; r < e.series.length; r++) {
		let i = E(e, r), o = i?.kind !== "pie" && i?.kind !== "pie3D" && i?.kind !== "doughnut" && i?.kind !== "ofPie" && L(e, r), s = o ? e.series[r].values.length : 1;
		n[r] = {
			firstIndex: a,
			count: s,
			pointDriven: o
		}, a += s + (t ? bt(e, r) : 0);
	}
	return n;
}
function St(e, t, n = 0) {
	let r = e[t];
	if (!r || r.firstIndex < 0 || r.count === 0) return null;
	let i = r.pointDriven ? n : 0;
	return i >= 0 && i < r.count ? r.firstIndex + i : null;
}
function Ct(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.legendEntries ?? []) n.deleted === !0 && t.add(n.idx);
	return t;
}
function wt(e, t, n, r = 0) {
	let i = St(e, n, r);
	return i != null && !t.has(i);
}
function Tt(e, t, n) {
	let r = e[n];
	if (!r || r.firstIndex < 0) return !1;
	for (let e = 0; e < r.count; e++) if (!t.has(r.firstIndex + e)) return !0;
	return !1;
}
//#endregion
//#region packages/core/src/chart/marker-style.ts
function Et(e) {
	return e.markerSymbol != null || e.markerSize != null || e.markerFill != null || e.markerFillPaint !== void 0 || e.markerFillPaintAuthored === !0 || e.markerStyle != null || e.markerLine != null || e.markerLinePaintAuthored === !0 || e.markerLineWidthEmu != null;
}
function Dt(e) {
	return e != null && (e.markerSymbol != null || e.markerSize != null || e.markerFill != null || e.color != null || e.markerFillPaint !== void 0 || e.markerFillPaintAuthored === !0 || e.chartexStyle != null || e.markerStyle != null || e.markerLine != null || e.markerLinePaintAuthored === !0 || e.markerLineWidthEmu != null);
}
function Ot(e, t) {
	return t == null || !Number.isFinite(t) || t === 0 || t < 0 && e.showNegativeBubbles !== !0 ? null : Math.abs(t);
}
function kt(e, t) {
	return e.bubble3D ?? e.bubble3DGroupDefault ?? !1;
}
function At(e) {
	return e !== "none" && e !== "x" && e !== "plus";
}
function jt(e, t, n, r, i, a) {
	if (t.sourceHidden?.[r] === !0) return !1;
	let o = a?.chartType ?? e.chartType, s = t.values[r] != null;
	if (!s && (n === "line" || n === "stackedLine" || n === "stackedLinePct") && (s = (o === "line" || o === "stackedLine" || o === "stackedLinePct") && (o !== "line" || e.dispBlanksAs === "zero")), !s) return !1;
	if (n === "scatter" && i) {
		let n = (t.categories ?? e.categories)[r];
		if (n == null || !Number.isFinite(Number.parseFloat(n))) return !1;
	}
	if (n === "scatter" && o === "bubble") {
		let n = t.bubbleSizes?.[r];
		if (n == null || !Number.isFinite(n) || n === 0) return !1;
		let i = a?.showNegativeBubbles ?? e.showNegativeBubbles;
		return n < 0 && i !== !0 ? !1 : (a?.bubbleScale ?? e.bubbleScale ?? 100) > 0;
	}
	return !0;
}
function Mt(e, t, n, r, i, a = 0) {
	if (t.sourceHidden?.[r] === !0 || n === "surface" || n === "ofPie" || n === "doughnut" && a > 0) return !1;
	if (n === "area" || n === "stackedArea" || n === "stackedAreaPct") return r < Math.max(e.categories.length, t.categories?.length ?? 0, t.values.length);
	let o = t.values[r];
	if ((n === "line" || n === "stackedLine" || n === "stackedLinePct") && o == null) return (e.chartType === "line" || e.chartType === "stackedLine" || e.chartType === "stackedLinePct") && (e.chartType !== "line" || e.dispBlanksAs === "zero");
	if (o == null || !Number.isFinite(o)) return !1;
	if (n === "pie" || n === "doughnut" || n === "ofPie") return t.values.some((e) => e != null && Number.isFinite(e) && Math.abs(e) > 0);
	if (n === "scatter") {
		if (!i) return !0;
		let n = (t.categories ?? e.categories)[r];
		return n != null && Number.isFinite(Number.parseFloat(n));
	}
	return !0;
}
function Nt(e, t, n, r, i, a, o = 0) {
	if (n === "radar" || !t.seriesDataLabels && !t.dataLabelOverrides?.length) return 0;
	let s = new Map((t.dataLabelOverrides ?? []).map((e) => [e.idx, e])), c = 0;
	for (let a = 0; a < r; a++) {
		let r = s.get(a);
		lt(t.seriesDataLabels, r) || (r?.showLegendKey ?? t.seriesDataLabels?.showLegendKey ?? !1) === !0 && Mt(e, t, n, a, i, o) && c++;
	}
	return c;
}
function Pt(e) {
	return e === "line" || e === "stackedLine" || e === "stackedLinePct" || e === "area" || e === "stackedArea" || e === "stackedAreaPct" || e === "stock" || e === "clusteredBar" || e === "clusteredBarH" || e === "stackedBar" || e === "stackedBarH" || e === "stackedBarPct" || e === "stackedBarHPct";
}
function Ft(e) {
	return e.dataPointOverrides?.some((e) => e.markerSymbol != null && e.markerSymbol !== "none") === !0;
}
function It(e, t, n, r) {
	return e === "radar" ? r === "filled" : e === "scatter" && t !== "bubble" && (n === "lineNoMarker" || n === "smoothNoMarker");
}
function Lt(e, t, n, r) {
	let i = n.seriesType ?? e;
	return !(i === "line" || i === "stackedLine" || i === "stackedLinePct" || i === "stock" || i === "radar") && i !== "scatter" && i !== "bubble" || i === "radar" && r === "filled" || i === "scatter" && (t === "lineNoMarker" || t === "smoothNoMarker") ? !1 : (n.markerSymbol ?? (i === "stock" ? "none" : "circle")) !== "none" && n.showMarker !== !1;
}
function Rt(e, t, n, r) {
	return t?.markerSymbol == null ? !r || e.markerSymbol === "none" ? "none" : e.markerSymbol ?? n : t.markerSymbol;
}
function zt(e, t, n) {
	if (t?.markerFillPaint !== void 0) return t.markerFillPaint;
	if (!(t?.markerFill != null || t?.color != null || t?.markerFillPaintAuthored === !0) && e.dataPointColors?.[n] == null && e.markerFillPaint !== void 0) return e.markerFillPaint;
}
function Bt(e, t, n, r) {
	return t?.markerFill == null ? t?.color == null ? e.dataPointColors?.[n] ?? (t?.markerFillPaintAuthored === !0 ? "00000000" : e.markerFill == null ? e.markerFillPaintAuthored === !0 ? "00000000" : r : e.markerFill) : t.color : t.markerFill;
}
function Vt(e) {
	return e.markerFillPaint;
}
function Ht(e, t) {
	return e.markerFill == null ? e.markerFillPaintAuthored === !0 ? "00000000" : t : e.markerFill;
}
function Ut(e) {
	return e?.fillType === "gradient" ? e.stops.length : e == null ? 0 : 1;
}
//#endregion
//#region packages/core/src/chart/plot-groups.ts
var Wt = new Set([
	"area3D",
	"line3D",
	"pie3D",
	"bar3D",
	"surface3D"
]);
function Gt(e, t) {
	return t === "bar" || t === "bar3D" ? e.includes("Bar") : t === "line" || t === "line3D" ? e.includes("Line") : t === "area" || t === "area3D" ? e.includes("Area") : t === "pie" || t === "pie3D" ? e === "pie" : t === "surface" || t === "surface3D" ? e === "surface" || e === "surface3D" : e === t;
}
function Kt(e) {
	if (e.plotGroups == null) return !0;
	let t = 0;
	for (let n of e.plotGroups) {
		if (!Number.isSafeInteger(n.seriesStart) || n.seriesStart !== t || !Number.isSafeInteger(n.seriesCount) || n.seriesCount < 0 || n.seriesCount > e.series.length - t) return !1;
		t += n.seriesCount;
	}
	return t === e.series.length;
}
function qt(e) {
	let t = Array(e.series.length);
	for (let n of e.plotGroups ?? []) {
		let r = Math.min(e.series.length, n.seriesStart + n.seriesCount);
		for (let e = n.seriesStart; e < r; e++) t[e] = n;
	}
	return t;
}
function Jt(e, t) {
	return t ? t.kind === "bubble" ? "bubble" : t.kind === "line" ? t.grouping === "percentStacked" ? "stackedLinePct" : t.grouping === "stacked" ? "stackedLine" : "line" : t.kind === "area" ? t.grouping === "percentStacked" ? "stackedAreaPct" : t.grouping === "stacked" ? "stackedArea" : "area" : t.kind : e;
}
function Yt(e) {
	if (e.plotGroups == null || e.plotGroups.length <= 1) return "legacy";
	if (!Kt(e)) return "unsupported";
	let t = e.plotGroups.filter((e) => e.seriesCount > 0);
	if (t.length === 0) return "legacy";
	if (t.length === 1) return Gt(e.chartType, t[0].kind) ? "legacy" : "unsupported";
	if (t.some((e) => e.categoryAxis === "none" || e.valueAxis === "none") || t.some((t) => t.categoryAxis === "secondary" && e.secondaryCatAxis == null || t.valueAxis === "secondary" && e.secondaryValAxis == null)) return "unsupported";
	let n = new Set(t.map((e) => e.kind));
	if (t.some((e) => Wt.has(e.kind))) return "unsupported";
	if (t.length === 2 && t[0].kind === "bar" && t[1].kind === "scatter") {
		let [n, r] = t, i = e.series.slice(n.seriesStart, n.seriesStart + n.seriesCount), a = e.series.slice(r.seriesStart, r.seriesStart + r.seriesCount);
		return n.categoryAxis === "primary" && (n.valueAxis === "primary" || n.valueAxis === "unresolved") && (r.categoryAxis === "secondary" || r.categoryAxis === "unresolved") && r.valueAxis === "secondary" && e.secondaryCatAxis != null && e.secondaryValAxis != null && i.every((e) => e.useSecondaryAxis !== !0) && a.every((e) => e.useSecondaryAxis === !0) ? "bar-combo" : "unsupported";
	}
	if (t.some((e) => e.categoryAxis === "unresolved" || e.valueAxis === "unresolved" || e.seriesAxis === "unresolved")) return "unsupported";
	if (n.size === 1) {
		let n = t[0].kind;
		if (n === "line" || n === "area") return t.some((e) => e.categoryAxis !== "primary") ? "unsupported" : n === "line" ? "line-groups" : "area-groups";
		if (n === "scatter" || n === "bubble") return "scatter-bubble";
		if (n === "bar") {
			let n = e.chartType.endsWith("H") ? "bar" : "col";
			return new Set(t.map((e) => e.barDirection ?? n)).size > 1 && (t.length !== 2 || t.some((e) => e.categoryAxis !== "primary" || e.valueAxis !== "primary")) ? "unsupported" : "bar-combo";
		}
		return "unsupported";
	}
	if (t.length === 2 && n.has("bar") && n.has("area")) return t.find((e) => e.kind === "line" || e.kind === "area")?.categoryAxis === "primary" ? "bar-combo" : "unsupported";
	if (t.length === 2 && t[0].kind === "area" && t[1].kind === "line" && t.every((e) => e.categoryAxis === "primary" && e.valueAxis === "primary")) return "area-groups";
	if (n.size === 2 && n.has("bar") && n.has("line")) {
		let n = t.filter((e) => e.kind === "bar"), r = t.filter((e) => e.kind === "line"), i = e.chartType.endsWith("H") ? "bar" : "col", a = new Set(n.map((e) => e.barDirection ?? i));
		return n.length <= 2 && r.length === 1 && t.length <= 3 && a.size === 1 && t.every((e) => e.categoryAxis === "primary") ? "bar-combo" : "unsupported";
	}
	return [...n].every((e) => e === "scatter" || e === "bubble") ? t.length > 2 ? "unsupported" : "scatter-bubble" : t.length === 2 && t[0].kind === "stock" && t[1].kind === "line" && (t[0].seriesCount === 3 || t[0].seriesCount === 4) && (t[1].grouping == null || t[1].grouping === "standard") && t.every((e) => e.categoryAxis === "primary" && e.valueAxis === "primary") ? "stock-line" : "unsupported";
}
//#endregion
//#region packages/core/src/chart/of-pie.ts
function Xt(e, t) {
	let n = e?.splitType ?? "auto", r = e?.splitPos, i = /* @__PURE__ */ new Set();
	if ((e?.splitPosAuthored === !0 || r != null) && (![
		"percent",
		"pos",
		"val"
	].includes(n) || r == null || !Number.isFinite(r))) return null;
	if (n === "auto") {
		if (e?.splitTypeAuthored === !0) return null;
		let n = Math.ceil(t.length / 3);
		for (let e = Math.max(0, t.length - n); e < t.length; e++) i.add(e);
		return i;
	}
	if (n === "cust") {
		if (e?.customSplitIndices == null) return null;
		for (let n of e.customSplitIndices) Number.isSafeInteger(n) && n >= 0 && n < t.length && i.add(n);
		return i;
	}
	if (r == null || !Number.isFinite(r)) return null;
	if (n === "pos") {
		if (!Number.isInteger(r) || r < 0 || r > 32e3) return null;
		let e = Math.min(t.length, r);
		for (let n = t.length - e; n < t.length; n++) i.add(n);
		return i;
	}
	if (n === "val") {
		for (let e = 0; e < t.length; e++) {
			let n = t[e];
			n != null && Number.isFinite(n) && n < r && i.add(e);
		}
		return i;
	}
	if (r < 0 || r > 100) return null;
	let a = 0;
	for (let e of t) e != null && Number.isFinite(e) && (a += Math.abs(e));
	if (!(a > 0)) return i;
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		n != null && Number.isFinite(n) && Math.abs(n) / a * 100 < r && i.add(e);
	}
	return i;
}
//#endregion
//#region packages/core/src/canvas/aux-canvas.ts
function Zt(e, t) {
	return [Math.max(1, Math.ceil(e)), Math.max(1, Math.ceil(t))];
}
function Qt(e, t) {
	let [n, r] = Zt(e, t);
	if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(n, r);
	if (typeof document < "u") {
		let e = document.createElement("canvas");
		return e.width = n, e.height = r, e;
	}
	return null;
}
function $t(e, t, n) {
	let [r, i] = Zt(t, n);
	if (typeof OffscreenCanvas < "u") try {
		return new OffscreenCanvas(r, i);
	} catch {}
	if (typeof document < "u") try {
		let e = document.createElement("canvas");
		return e.width = r, e.height = i, e;
	} catch {}
	try {
		let t = e.canvas?.constructor;
		return typeof t == "function" ? new t(r, i) : null;
	} catch {
		return null;
	}
}
//#endregion
//#region packages/core/src/image/dib.ts
var en = i, tn = a;
function nn(e, t, n, r, i) {
	if (n < 40 || t + 40 > e.byteLength) return null;
	let a = e.getUint32(t, !0);
	if (a < 40) return null;
	let o = e.getInt32(t + 4, !0), s = e.getInt32(t + 8, !0), c = e.getUint16(t + 14, !0);
	if (e.getUint32(t + 16, !0) !== 0) return null;
	let l = s < 0, u = Math.abs(o), d = Math.abs(s);
	if (u <= 0 || d <= 0 || u > en || d > en || u * d > tn) return null;
	let f = new Uint8ClampedArray(u * d * 4), p = u * c + 31 >> 5 << 2 >>> 0;
	if (r + p * d > r + i + p && r + p * d > e.byteLength) return null;
	let m = null;
	if (c <= 8) {
		let n = e.getUint32(t + 32, !0);
		n === 0 && (n = 1 << c);
		let r = t + a;
		m = [];
		for (let t = 0; t < n; t++) {
			let n = r + t * 4;
			if (n + 4 > e.byteLength) break;
			let i = e.getUint8(n), a = e.getUint8(n + 1), o = e.getUint8(n + 2);
			m.push(o << 16 | a << 8 | i);
		}
	}
	let h = (e, t, n, r, i, a) => {
		let o = (e * u + t) * 4;
		f[o] = n, f[o + 1] = r, f[o + 2] = i, f[o + 3] = a;
	}, g = !1;
	for (let t = 0; t < d; t++) {
		let n = l ? t : d - 1 - t, i = t, a = r + n * p;
		if (a + p > e.byteLength) break;
		if (c === 32) for (let t = 0; t < u; t++) {
			let n = a + t * 4, r = e.getUint8(n), o = e.getUint8(n + 1), s = e.getUint8(n + 2), c = e.getUint8(n + 3);
			c !== 0 && (g = !0), h(i, t, s, o, r, c);
		}
		else if (c === 24) {
			for (let t = 0; t < u; t++) {
				let n = a + t * 3;
				h(i, t, e.getUint8(n + 2), e.getUint8(n + 1), e.getUint8(n), 255);
			}
			g = !0;
		} else if (c === 8 && m) {
			for (let t = 0; t < u; t++) {
				let n = e.getUint8(a + t), r = m[n] ?? 0;
				h(i, t, r >> 16 & 255, r >> 8 & 255, r & 255, 255);
			}
			g = !0;
		} else if (c === 4 && m) {
			for (let t = 0; t < u; t++) {
				let n = e.getUint8(a + (t >> 1)), r = t & 1 ? n & 15 : n >> 4 & 15, o = m[r] ?? 0;
				h(i, t, o >> 16 & 255, o >> 8 & 255, o & 255, 255);
			}
			g = !0;
		} else if (c === 1 && m) {
			for (let t = 0; t < u; t++) {
				let n = e.getUint8(a + (t >> 3)) >> 7 - (t & 7) & 1, r = m[n] ?? 0;
				h(i, t, r >> 16 & 255, r >> 8 & 255, r & 255, 255);
			}
			g = !0;
		} else return null;
	}
	if (c === 32 && !g) for (let e = 3; e < f.length; e += 4) f[e] = 255;
	return {
		width: u,
		height: d,
		data: f
	};
}
function rn(e, t, n) {
	if (n < 40 || t + 40 > e.byteLength) return null;
	let r = e.getUint32(t, !0);
	if (r < 40) return null;
	let i = e.getUint16(t + 14, !0), a = 0;
	if (i <= 8) {
		let n = e.getUint32(t + 32, !0);
		n === 0 && (n = 1 << i), a = n;
	} else a = e.getUint32(t + 32, !0);
	let o = r + a * 4, s = t + o, c = n - o;
	return c <= 0 ? null : nn(e, t, o, s, c);
}
function an(e, t, n, r, i, a) {
	try {
		let o = Qt(t.width, t.height);
		if (!o) return !1;
		let s = o.getContext("2d");
		if (!s) return !1;
		let c = s.createImageData(t.width, t.height);
		c.data.set(t.data), s.putImageData(c, 0, 0);
		let l = Math.min(n, i), u = Math.min(r, a), d = Math.abs(i - n), f = Math.abs(a - r);
		return e.drawImage(o, l, u, d, f), !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region packages/core/src/fonts/metafile-symbol-encoding.ts
var on = {
	...o,
	32: " ",
	43: "+",
	45: "−",
	61: "=",
	165: "∞",
	229: "∑"
}, sn = {
	32: " ",
	75: "…",
	76: "⋯",
	77: "⋮",
	78: "⋰",
	79: "⋱"
};
function cn(e, t, n = !1) {
	let r = t.trim().toLowerCase(), i = r === "symbol" ? on : r === "mt extra" ? sn : null;
	if (!i) return null;
	let a = "";
	for (let t of e) {
		let e = t.codePointAt(0);
		if (n && (e < 61440 || e > 61695)) {
			a += t;
			continue;
		}
		let r = i[n ? e - 61440 : e];
		if (r === void 0) return null;
		a += r;
	}
	return a;
}
//#endregion
//#region packages/core/src/image/wmf.ts
var K = {
	EOF: 0,
	SETBKMODE: 258,
	SETBKCOLOR: 513,
	SETTEXTALIGN: 302,
	SETTEXTCOLOR: 521,
	SETPOLYFILLMODE: 262,
	SETWINDOWORG: 523,
	SETWINDOWEXT: 524,
	SELECTOBJECT: 301,
	DELETEOBJECT: 496,
	LINETO: 531,
	MOVETO: 532,
	TEXTOUT: 1313,
	EXTTEXTOUT: 2610,
	ESCAPE: 1574,
	POLYGON: 804,
	POLYLINE: 805,
	POLYPOLYGON: 1336,
	RECTANGLE: 1051,
	CREATEPENINDIRECT: 762,
	CREATEFONTINDIRECT: 763,
	CREATEBRUSHINDIRECT: 764,
	DIBBITBLT: 2368,
	DIBSTRETCHBLT: 2881,
	STRETCHDIBITS: 3907
}, ln = 2596720087, un = 22, dn = 18, fn = 1179469088;
function pn(e, t) {
	if (e.length < t + dn) return !1;
	let n = e[t] | e[t + 1] << 8, r = e[t + 2] | e[t + 3] << 8;
	return (n === 1 || n === 2) && r === 9;
}
function mn(e) {
	return e.length < 4 ? !1 : (e[0] | e[1] << 8 | e[2] << 16 | e[3] << 24) >>> 0 === ln ? !0 : pn(e, 0);
}
function hn(e) {
	if (e.length < 44) return !1;
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength);
	return t.getUint32(0, !0) === 1 && t.getUint32(40, !0) === fn;
}
function gn(e) {
	return e === "image/wmf" || e === "image/emf";
}
function _n(e) {
	let t = e & 255, n = e >>> 8 & 255, r = e >>> 16 & 255, i = (e) => e.toString(16).padStart(2, "0");
	return `#${i(t)}${i(n)}${i(r)}`;
}
function vn(e, t) {
	for (let n = 0; n < e.length; n++) if (e[n] == null) {
		e[n] = t;
		return;
	}
	e.push(t);
}
var yn = class {
	p = 0;
	constructor(e, t, n) {
		this.b = e, this.end = n, this.p = t;
	}
	get remaining() {
		return this.end - this.p;
	}
	i16() {
		let e = this.u16();
		return e >= 32768 ? e - 65536 : e;
	}
	u16() {
		let e = this.b[this.p] | this.b[this.p + 1] << 8;
		return this.p += 2, e;
	}
	u8() {
		return this.b[this.p++];
	}
	u32() {
		let e = (this.b[this.p] | this.b[this.p + 1] << 8 | this.b[this.p + 2] << 16 | this.b[this.p + 3] << 24) >>> 0;
		return this.p += 4, e;
	}
	bytes(e) {
		let t = Math.min(this.p + Math.max(0, e), this.end), n = this.b.subarray(this.p, t);
		return this.p = t, n;
	}
	skip(e) {
		this.p = Math.min(this.p + Math.max(0, e), this.end);
	}
};
function q(e, t) {
	return (t - e.orgX) * (e.W / e.extX);
}
function J(e, t) {
	return (t - e.orgY) * (e.H / e.extY);
}
function bn(e, t) {
	let n = t * Math.abs(e.W / e.extX);
	return n >= 1 ? n : 1;
}
var xn = .001;
function Sn(e, t, n) {
	return Math.abs(e - t) <= xn || Math.abs(e - n) <= xn;
}
function Cn(e, t, n) {
	let r = [], i = n ? t.length : t.length - 1;
	for (let n = 0; n < i; n++) {
		let i = t[n], a = t[(n + 1) % t.length], o = Math.abs(i[0] - a[0]) <= xn && Sn(i[0], 0, e.W) && Sn(a[0], 0, e.W), s = Math.abs(i[1] - a[1]) <= xn && Sn(i[1], 0, e.H) && Sn(a[1], 0, e.H);
		o || s || r.push([i, a]);
	}
	return r;
}
function wn(e, t, n) {
	if (!e.curPen || e.curPen.stroke == null || t.length < 2) return;
	let { ctx: r } = e;
	if (r.strokeStyle = e.curPen.stroke, r.lineWidth = bn(e, e.curPen.width), !e.suppressBoundaryFrame) {
		r.beginPath(), r.moveTo(t[0][0], t[0][1]);
		for (let e = 1; e < t.length; e++) r.lineTo(t[e][0], t[e][1]);
		n && r.closePath(), r.stroke(), e.drew = !0;
		return;
	}
	let i = Cn(e, t, n);
	if (i.length === 0) return;
	r.beginPath();
	let a = null;
	for (let [e, t] of i) (!a || a[0] !== e[0] || a[1] !== e[1]) && r.moveTo(e[0], e[1]), r.lineTo(t[0], t[1]), a = t;
	r.stroke(), e.drew = !0;
}
function Tn(e, t, n) {
	let r = [];
	for (let i = 0; i < n && !(t.remaining < 4); i++) {
		let n = t.i16(), i = t.i16();
		r.push([q(e, n), J(e, i)]);
	}
	return r;
}
function En(e, t) {
	t.length < 2 || !e.curPen || e.curPen.stroke == null || wn(e, t, !1);
}
function Dn(e, t, n) {
	let r = e.currentX, i = e.currentY, a = e.currentPositionKnown;
	if (e.currentX = t, e.currentY = n, e.currentPositionKnown = !0, !a || !e.lineStateSafe || !e.haveExt || !e.extTextMappingSafe || ![
		e.extX,
		e.extY,
		e.W,
		e.H
	].every(Number.isFinite) || !(e.W > 0 && e.H > 0) || !e.curPen || !e.curPen.lineEligible || e.curPen.stroke == null) return;
	let { ctx: o } = e;
	o.save(), o.beginPath(), o.moveTo(q(e, r), J(e, i)), o.lineTo(q(e, t), J(e, n)), o.strokeStyle = e.curPen.stroke, o.lineWidth = e.curPen.lineWidth === 0 ? 1 : e.curPen.lineWidth * (e.W / e.extX), o.lineCap = "round", o.lineJoin = "round", o.setLineDash([]), o.stroke(), o.restore(), e.drew = !0;
}
function On(e, t) {
	if (t.length < 2) return;
	let { ctx: n } = e;
	if (e.curBrush && e.curBrush.fill != null) {
		n.beginPath(), n.moveTo(t[0][0], t[0][1]);
		for (let e = 1; e < t.length; e++) n.lineTo(t[e][0], t[e][1]);
		n.closePath(), n.fillStyle = e.curBrush.fill, n.fill(e.fillRule), e.drew = !0;
	}
	wn(e, t, !0);
}
function kn(e, t) {
	let n = t.u16();
	if (n <= 0 || n > 65536) return;
	let r = [];
	for (let e = 0; e < n; e++) {
		if (t.remaining < 2) return;
		r.push(t.u16());
	}
	let { ctx: i } = e;
	i.beginPath();
	let a = !1;
	for (let n of r) {
		if (n < 2) {
			for (let e = 0; e < n && t.remaining >= 4; e++) t.i16(), t.i16();
			continue;
		}
		let r = Tn(e, t, n);
		if (!(r.length < 2)) {
			i.moveTo(r[0][0], r[0][1]);
			for (let e = 1; e < r.length; e++) i.lineTo(r[e][0], r[e][1]);
			i.closePath(), a = !0;
		}
	}
	a && (e.curBrush && e.curBrush.fill != null && (i.fillStyle = e.curBrush.fill, i.fill(e.fillRule), e.drew = !0), e.curPen && e.curPen.stroke != null && (i.strokeStyle = e.curPen.stroke, i.lineWidth = bn(e, e.curPen.width), i.stroke(), e.drew = !0));
}
function An(e) {
	let t = e.remaining === 10, n = e.u16(), r = e.i16();
	e.i16();
	let i = e.u32();
	return {
		kind: "pen",
		stroke: (n & 255) == 5 ? null : _n(i),
		width: Math.abs(r),
		lineWidth: r,
		lineEligible: t && r >= 0 && (n === 0 || n === 5)
	};
}
function jn(e) {
	let t = e.u16(), n = e.u32();
	return e.u16(), {
		kind: "brush",
		fill: t === 1 ? null : _n(n)
	};
}
function Mn(e) {
	let t = e.indexOf(0), n = t >= 0 ? e.subarray(0, t) : e;
	if (n.length === 0) return "";
	try {
		return new TextDecoder("shift_jis").decode(n);
	} catch {
		return String.fromCharCode(...n);
	}
}
var Nn = [
	8364,
	129,
	8218,
	402,
	8222,
	8230,
	8224,
	8225,
	710,
	8240,
	352,
	8249,
	338,
	141,
	381,
	143,
	144,
	8216,
	8217,
	8220,
	8221,
	8226,
	8211,
	8212,
	732,
	8482,
	353,
	8250,
	339,
	157,
	382,
	376
];
function Pn(e) {
	return Array.from(e, (e) => String.fromCharCode(e >= 128 && e <= 159 ? Nn[e - 128] : e)).join("");
}
function Fn(e) {
	let t = e.remaining === 50, n = e.i16(), r = Math.abs(n), i = e.i16(), a = e.i16(), o = e.i16(), s = e.i16(), c = e.u8() !== 0, l = e.u8() !== 0, u = e.u8() !== 0, d = e.u8();
	e.u8(), e.u8(), e.u8(), e.u8();
	let f = e.bytes(Math.min(32, e.remaining)), p = Mn(f), m = f.indexOf(0);
	return {
		kind: "font",
		height: r,
		signedHeight: n,
		width: i,
		escapement: a,
		orientation: o,
		weight: s,
		italic: c,
		underline: l,
		strikeout: u,
		charset: d,
		face: p,
		ansiFace: String.fromCharCode(...f.subarray(0, m < 0 ? f.length : m)),
		validForExt: t && m >= 0
	};
}
function In(e, t) {
	let n = () => {
		e.unsupported.add("META_EXTTEXTOUT (unsupported text state or encoding)");
	};
	if (t.remaining < 8) {
		n();
		return;
	}
	let r = t.i16(), i = t.i16(), a = t.i16(), o = t.u16();
	if (a < 0) {
		n();
		return;
	}
	if (o !== 0) {
		n();
		return;
	}
	let s = a + (a & 1);
	if (t.remaining !== s) {
		n();
		return;
	}
	let c = t.bytes(a);
	a & 1 && t.skip(1);
	let l = e.curFont, u = e.textAlign & 6, d = (e.textAlign & -31) != 0 || (e.textAlign & 24) != 24 || ![
		0,
		2,
		6
	].includes(u);
	if (!e.extTextSafe || !e.extTextMappingSafe || e.bkMode !== 1 || d || !e.haveExt || !(e.extX > 0 && e.extY > 0 && e.W > 0 && e.H > 0) || ![
		e.extX,
		e.extY,
		e.W,
		e.H
	].every(Number.isFinite) || !l || l.charset !== 0 && l.charset !== 2 || l.signedHeight >= 0 || l.width !== 0 || l.escapement !== 0 || l.orientation !== 0 || l.underline || l.strikeout || !l.ansiFace || /[\x00-\x1f\x7f]/.test(l.ansiFace) || !l.validForExt || l.weight < 1 || l.weight > 1e3) {
		n();
		return;
	}
	let f = l.charset === 2 ? cn(Array.from(c, (e) => String.fromCharCode(e)).join(""), l.ansiFace) : Pn(c);
	if (f === null) {
		n();
		return;
	}
	if (!f.length) return;
	let p = l.height * (e.H / e.extY);
	if (!Number.isFinite(p) || p <= 0) {
		n();
		return;
	}
	try {
		e.ctx.fillStyle = e.textColor;
		let t = `"${l.ansiFace.replaceAll("\\", "\\\\").replaceAll("\"", "\\\"")}"`;
		e.ctx.font = `${l.italic ? "italic " : ""}${l.weight} ${p}px ${l.charset === 2 ? "serif" : t}`;
		let n = e.textAlign & 6;
		e.ctx.textAlign = n === 2 ? "right" : n === 6 ? "center" : "left", e.ctx.textBaseline = "alphabetic", e.ctx.fillText(f, q(e, i), J(e, r)), e.drew = !0;
	} catch {
		n();
	}
}
function Ln(e, t, n, r) {
	if (t.length === 0) return;
	let i = e.curFont, a = i?.height || 12, o = Math.abs(J(e, e.orgY + a) - J(e, e.orgY));
	if (!Number.isFinite(o) || o < 1) return;
	let { ctx: s } = e;
	try {
		s.fillStyle = e.textColor;
		let a = i && i.weight >= 700 ? "bold " : "";
		s.font = `${i?.italic ? "italic " : ""}${a}${o}px ${i?.face || "sans-serif"}`;
		let c = e.textAlign & 6;
		s.textAlign = c === 2 ? "right" : c === 6 ? "center" : "left", s.textBaseline = (e.textAlign & 24) == 24 ? "alphabetic" : "top", s.fillText(t, q(e, n), J(e, r)), e.drew = !0;
	} catch {}
}
function Rn(e, t, n, r, i = !1, a) {
	if (!mn(e)) return !1;
	let o = 0;
	(e.length >= 4 ? (e[0] | e[1] << 8 | e[2] << 16 | e[3] << 24) >>> 0 : 0) === ln && (o = un);
	let s = o + dn;
	if (s > e.length) return !1;
	let c = {
		ctx: t,
		W: n,
		H: r,
		orgX: 0,
		orgY: 0,
		extX: n || 1,
		extY: r || 1,
		haveExt: !1,
		objects: [],
		curPen: null,
		curBrush: null,
		curFont: null,
		textColor: "#000000",
		textAlign: 0,
		fillRule: "nonzero",
		bkMode: 2,
		unsupported: /* @__PURE__ */ new Set(),
		extTextSafe: !0,
		extTextMappingSafe: !1,
		currentX: 0,
		currentY: 0,
		currentPositionKnown: !1,
		lineStateSafe: !0,
		drew: !1,
		suppressBoundaryFrame: i
	}, l = new DataView(e.buffer, e.byteOffset, e.byteLength);
	for (; s + 6 <= e.length;) {
		let t = l.getUint32(s, !0), n = l.getUint16(s + 4, !0);
		if (t < 3) break;
		let r = t * 2, i = s + r;
		if (i > e.length || n === K.EOF) break;
		let a = s + 6, o = new yn(e, a, i);
		switch (n) {
			case K.SETWINDOWORG:
				if (o.remaining !== 4) {
					c.extTextSafe = !1, c.currentPositionKnown = !1, c.lineStateSafe = !1;
					break;
				}
				c.orgY = o.i16(), c.orgX = o.i16();
				break;
			case K.SETWINDOWEXT: {
				if (o.remaining !== 4) {
					c.extTextSafe = !1, c.currentPositionKnown = !1, c.lineStateSafe = !1;
					break;
				}
				let e = o.i16(), t = o.i16();
				c.extTextMappingSafe = t > 0 && e > 0, c.extY = e || 1, c.extX = t || 1, c.haveExt = !0;
				break;
			}
			case K.SETPOLYFILLMODE:
				c.fillRule = o.u16() === 1 ? "evenodd" : "nonzero";
				break;
			case K.SETTEXTCOLOR:
				if (o.remaining !== 4) {
					c.extTextSafe = !1;
					break;
				}
				c.textColor = _n(o.u32());
				break;
			case K.SETTEXTALIGN:
				if (o.remaining !== 2 && o.remaining !== 4) {
					c.extTextSafe = !1, c.lineStateSafe = !1;
					break;
				}
				c.textAlign = o.u16(), o.remaining === 2 && o.u16();
				break;
			case K.SETBKMODE:
				if (o.remaining !== 2 && o.remaining !== 4) {
					c.extTextSafe = !1;
					break;
				}
				c.bkMode = o.u16(), o.remaining === 2 && o.u16();
				break;
			case K.SETBKCOLOR:
				o.remaining !== 4 && (c.extTextSafe = !1);
				break;
			case K.CREATEPENINDIRECT:
				o.remaining !== 10 && (c.lineStateSafe = !1), vn(c.objects, An(o));
				break;
			case K.CREATEBRUSHINDIRECT:
				o.remaining !== 8 && (c.lineStateSafe = !1), vn(c.objects, jn(o));
				break;
			case K.CREATEFONTINDIRECT:
				if (o.remaining < 18) {
					c.extTextSafe = !1, c.lineStateSafe = !1;
					break;
				}
				o.remaining !== 50 && (c.lineStateSafe = !1), vn(c.objects, Fn(o));
				break;
			case K.SELECTOBJECT: {
				if (o.remaining !== 2) {
					c.extTextSafe = !1, c.lineStateSafe = !1;
					break;
				}
				let e = o.u16(), t = c.objects[e];
				t?.kind === "pen" ? c.curPen = t : t?.kind === "brush" ? c.curBrush = t : t?.kind === "font" ? c.curFont = t : (c.extTextSafe = !1, c.lineStateSafe = !1);
				break;
			}
			case K.DELETEOBJECT: {
				if (o.remaining !== 2) {
					c.extTextSafe = !1, c.lineStateSafe = !1;
					break;
				}
				let e = o.u16(), t = c.objects[e];
				t && (t === c.curPen && (c.curPen = null), t === c.curBrush && (c.curBrush = null), t === c.curFont && (c.curFont = null), c.objects[e] = null);
				break;
			}
			case K.POLYLINE:
				En(c, Tn(c, o, o.i16()));
				break;
			case K.POLYGON:
				On(c, Tn(c, o, o.i16()));
				break;
			case K.POLYPOLYGON:
				kn(c, o);
				break;
			case K.RECTANGLE: {
				let e = o.i16(), t = o.i16(), n = o.i16(), r = o.i16();
				On(c, [
					[q(c, r), J(c, n)],
					[q(c, t), J(c, n)],
					[q(c, t), J(c, e)],
					[q(c, r), J(c, e)]
				]);
				break;
			}
			case K.MOVETO:
				if (o.remaining !== 4) {
					c.extTextSafe = !1, c.currentPositionKnown = !1;
					break;
				}
				c.currentY = o.i16(), c.currentX = o.i16(), c.currentPositionKnown = !0;
				break;
			case K.LINETO: {
				if (o.remaining !== 4) {
					c.extTextSafe = !1, c.currentPositionKnown = !1;
					break;
				}
				let e = o.i16();
				Dn(c, o.i16(), e);
				break;
			}
			case K.TEXTOUT: {
				let e = o.u16(), t = Mn(o.bytes(e));
				e % 2 != 0 && o.skip(1);
				let n = o.i16();
				Ln(c, t, o.i16(), n), c.textAlign & 1 && (c.currentPositionKnown = !1);
				break;
			}
			case K.EXTTEXTOUT:
				In(c, o), c.textAlign & 1 && (c.currentPositionKnown = !1);
				break;
			case K.ESCAPE: {
				let e = o.remaining >= 4 ? o.u16() : -1, t = o.remaining >= 2 ? o.u16() : -1;
				if (e !== 15 || t < 0 || o.remaining !== t + (t & 1)) {
					c.extTextSafe = !1, c.currentPositionKnown = !1, c.lineStateSafe = !1;
					break;
				}
				let n = o.bytes(t);
				t & 1 && o.skip(1), n.length >= 4 && new DataView(n.buffer, n.byteOffset, n.byteLength).getUint32(0, !0) === 1128680791 && (c.extTextSafe = !1, c.currentPositionKnown = !1, c.lineStateSafe = !1);
				break;
			}
			case K.STRETCHDIBITS: {
				o.u32(), o.i16(), o.i16(), o.i16(), o.i16(), o.u16();
				let e = o.i16(), t = o.i16(), n = o.i16(), r = o.i16(), s = a + 22, u = rn(l, s, i - s);
				if (u) {
					let i = q(c, r), a = J(c, n), o = q(c, r + t), s = J(c, n + e);
					an(c.ctx, u, i, a, o, s) && (c.drew = !0);
				}
				break;
			}
			case K.DIBSTRETCHBLT:
			case K.DIBBITBLT: break;
			default:
				c.extTextSafe = !1, c.currentPositionKnown = !1, c.lineStateSafe = !1;
				break;
		}
		s = i;
	}
	return c.unsupported.size > 0 && a?.([...c.unsupported]), c.drew;
}
var zn = 2e3, Bn = 2;
function Vn(e, t) {
	let n = e > 0 ? e : 300, r = t > 0 ? t : 300, i = (e) => Math.max(1, Math.min(zn, Math.round(e)));
	return {
		w: i(n * Bn),
		h: i(r * Bn)
	};
}
async function Hn(e, t, n, r = !1, i) {
	if (!mn(e) || t <= 0 || n <= 0) return null;
	let a = Qt(t, n);
	if (!a) return null;
	let o = a.getContext("2d");
	return !o || (o.lineJoin = "round", o.lineCap = "round", !Rn(e, o, t, n, r, i)) ? null : createImageBitmap(a);
}
//#endregion
//#region packages/core/src/image/crop.ts
function Un(e) {
	if (!e) return !0;
	if (![
		e.l,
		e.t,
		e.r,
		e.b
	].every(Number.isFinite)) return !1;
	let t = e.l, n = e.t, r = 1 - e.r, i = 1 - e.b;
	return r > t && i > n && Math.min(1, r) > Math.max(0, t) && Math.min(1, i) > Math.max(0, n);
}
function Wn(e) {
	let t = e;
	return {
		w: t.naturalWidth || (typeof t.width == "number" ? t.width : 0) || 0,
		h: t.naturalHeight || (typeof t.height == "number" ? t.height : 0) || 0
	};
}
function Gn(e, t) {
	if (!t || !(t.l || t.t || t.r || t.b) || ![
		t.l,
		t.t,
		t.r,
		t.b
	].every(Number.isFinite)) return null;
	let { w: n, h: r } = Wn(e);
	if (n <= 0 || r <= 0) return null;
	let i = t.l, a = t.t, o = 1 - t.r, s = 1 - t.b, c = o - i, l = s - a;
	if (!(c > 0) || !(l > 0)) return {
		sx: 0,
		sy: 0,
		sw: 0,
		sh: 0,
		dxFraction: 0,
		dyFraction: 0,
		dwFraction: 0,
		dhFraction: 0
	};
	let u = Math.max(0, i), d = Math.max(0, a), f = Math.min(1, o), p = Math.min(1, s), m = Math.max(0, f - u), h = Math.max(0, p - d);
	return {
		sx: u * n,
		sy: d * r,
		sw: m * n,
		sh: h * r,
		dxFraction: (u - i) / c,
		dyFraction: (d - a) / l,
		dwFraction: m / c,
		dhFraction: h / l
	};
}
function Kn(e, t, n, r, i, a, o) {
	let s = Gn(t, n);
	s ? s.sw > 0 && s.sh > 0 && s.dwFraction > 0 && s.dhFraction > 0 && e.drawImage(t, s.sx, s.sy, s.sw, s.sh, r + s.dxFraction * a, i + s.dyFraction * o, s.dwFraction * a, s.dhFraction * o) : e.drawImage(t, r, i, a, o);
}
function qn(e, t, n) {
	if (!Number.isFinite(e) || !Number.isFinite(t) || !(e > 0) || !(t > 0)) return null;
	let r = n ? 1 - n.l - n.r : 1, i = n ? 1 - n.t - n.b : 1;
	if (!Number.isFinite(r) || !Number.isFinite(i) || !(r > 0) || !(i > 0) || !Un(n)) return null;
	let a = Math.ceil(e / r), o = Math.ceil(t / i);
	return Number.isFinite(a) && Number.isFinite(o) ? {
		width: a,
		height: o
	} : null;
}
function Jn(e, t, n, r) {
	if (!t || !gn(e)) return {
		widthPt: n,
		heightPt: r
	};
	if (!Un(t)) return null;
	let i = 1 - t.l - t.r, a = 1 - t.t - t.b;
	return {
		widthPt: n / i,
		heightPt: r / a
	};
}
//#endregion
//#region packages/core/src/shape/pattern-bitmaps.ts
var Yn = {
	pct5: "#......./......../......../......../....#.../......../......../........",
	pct10: "#......./......../....#.../......../#......./......../....#.../........",
	pct20: "#...#.../......../..#...#./......../#...#.../......../..#...#./........",
	pct25: "#...#.../..#...#./#...#.../..#...#./#...#.../..#...#./#...#.../..#...#.",
	pct30: "#.#.#.#./.#...#../#.#.#.#./...#...#/#.#.#.#./.#...#../#.#.#.#./...#...#",
	pct40: "#.#.#.#./.#.#.#.#/#.#.#.#./.#.#...#/#.#.#.#./.#.#.#.#/#.#.#.#./...#.#.#",
	pct50: "#.#.#.#./.#.#.#.#/#.#.#.#./.#.#.#.#/#.#.#.#./.#.#.#.#/#.#.#.#./.#.#.#.#",
	pct60: "###.###./.#.#.#.#/#.###.##/.#.#.#.#/###.###./.#.#.#.#/#.###.##/.#.#.#.#",
	pct70: ".###.###/##.###.#/.###.###/##.###.#/.###.###/##.###.#/.###.###/##.###.#",
	pct75: ".###.###/########/##.###.#/########/.###.###/########/##.###.#/########",
	pct80: "###.####/########/#######./########/###.####/########/#######./########",
	pct90: "########/########/########/####.###/########/########/########/.#######",
	horz: "########/......../......../......../......../......../......../........",
	vert: "#......./#......./#......./#......./#......./#......./#......./#.......",
	ltHorz: "########/......../......../......../########/......../......../........",
	ltVert: "#...#.../#...#.../#...#.../#...#.../#...#.../#...#.../#...#.../#...#...",
	dkHorz: "########/########/......../......../########/########/......../........",
	dkVert: "##..##../##..##../##..##../##..##../##..##../##..##../##..##../##..##..",
	narHorz: "########/......../########/......../########/......../########/........",
	narVert: ".#.#.#.#/.#.#.#.#/.#.#.#.#/.#.#.#.#/.#.#.#.#/.#.#.#.#/.#.#.#.#/.#.#.#.#",
	dashHorz: "####..../......../......../......../....####/......../......../........",
	dashVert: "#......./#......./#......./#......./....#.../....#.../....#.../....#...",
	cross: "########/#......./#......./#......./#......./#......./#......./#.......",
	dnDiag: "#+.....+/+#+...../.+#+..../..+#+.../...+#+../....+#+./.....+#+/+.....+#",
	upDiag: "+.....+#/.....+#+/....+#+./...+#+../..+#+.../.+#+..../+#+...../#+.....+",
	ltDnDiag: "#...#.../.#...#../..#...#./...#...#/#...#.../.#...#../..#...#./...#...#",
	ltUpDiag: "...#...#/..#...#./.#...#../#...#.../...#...#/..#...#./.#...#../#...#...",
	dkDnDiag: "##..##../.##..##./..##..##/#..##..#/##..##../.##..##./..##..##/#..##..#",
	dkUpDiag: "..##..##/.##..##./##..##../#..##..#/..##..##/.##..##./##..##../#..##..#",
	wdDnDiag: "##.....#/###...../.###..../..###.../...###../....###./.....###/#.....##",
	wdUpDiag: "#.....##/.....###/....###./...###../..###.../.###..../###...../##.....#",
	dashDnDiag: "......../......../#...#.../.#...#../..#...#./...#...#/......../........",
	dashUpDiag: "......../......../...#...#/..#...#./.#...#../#...#.../......../........",
	diagCross: "#+....+#/+#+..+#+/.+#++#+./..+##+../..+##+../.+#++#+./+#+..+#+/#+....+#",
	smCheck: "#..##..#/.##..##./.##..##./#..##..#/#..##..#/.##..##./.##..##./#..##..#",
	lgCheck: "####..../####..../####..../####..../....####/....####/....####/....####",
	smGrid: "########/#...#.../#...#.../#...#.../########/#...#.../#...#.../#...#...",
	lgGrid: "########/#......./#......./#......./#......./#......./#......./#.......",
	dotGrid: "#.#.#.#./......../#......./......../#......./......../#......./........",
	smConfetti: "#......./....#.../.#....../......#./...#..../.......#/..#...../.....#..",
	lgConfetti: "#.##...#/..##..../......##/...##.##/##.##.../##....../....##../#...##.#",
	horzBrick: "########/#......./#......./#......./########/....#.../....#.../....#...",
	diagBrick: ".......#/......#./.....#../....#.../...##.../..#..#../.#....#./#......#",
	solidDmnd: "...#..../..###.../.#####../#######./.#####../..###.../...#..../........",
	openDmnd: "#.....#./.#...#../..#.#.../...#..../..#.#.../.#...#../#.....#./.......#",
	dotDmnd: "#......./......../..#...#./......../....#.../......../..#...#./........",
	plaid: "#.#.#.#./.#.#.#.#/#.#.#.#./.#.#.#.#/####..../####..../####..../####....",
	sphere: ".###.###/#...#..#/#...####/#...####/.###.###/#..##.../#####.../#####...",
	weave: "#...#.../.#.#.#../..#...#./.#...#.#/#...#.../...#.#../..#...#./.#.#...#",
	divot: "......../...#..../....#.../...#..../......../#......./.......#/#.......",
	shingle: "......##/#....#../.#..#.../..##..../....##../......#./.......#/.......#",
	wave: "......../...##.../..#..#.#/##....../......../...##.../..#..#.#/##......",
	trellis: "########/.##..##./########/#..##..#/########/.##..##./########/#..##..#",
	zigZag: "#......#/.#....#./..#..#../...##.../#......#/.#....#./..#..#../...##..."
};
function Xn(e, t, n) {
	let r = Yn[e];
	if (typeof r != "string") return null;
	let i = Qt(64, 64);
	if (!i) return null;
	let a = i.getContext("2d");
	if (!a) return null;
	let o = Zn(n), s = Zn(t), c = Qn(t, n), l = r.split("/");
	for (let e = 0; e < 8; e++) for (let t = 0; t < 8; t++) {
		let n = l[e][t];
		a.fillStyle = n === "#" ? s : n === "+" ? c : o, a.fillRect(t * 8, e * 8, 8, 8);
	}
	return i;
}
function Zn(e) {
	return `rgba(${parseInt(e.slice(0, 2), 16)},${parseInt(e.slice(2, 4), 16)},${parseInt(e.slice(4, 6), 16)},${e.length >= 8 ? parseInt(e.slice(6, 8), 16) / 255 : 1})`;
}
function Qn(e, t) {
	let n = (e, t) => parseInt(e.slice(t, t + 2), 16), r = Math.round((n(e, 0) + n(t, 0)) / 2), i = Math.round((n(e, 2) + n(t, 2)) / 2), a = Math.round((n(e, 4) + n(t, 4)) / 2), o = (e) => e.length >= 8 ? n(e, 6) / 255 : 1;
	return `rgba(${r},${i},${a},${(o(e) + o(t)) / 2})`;
}
//#endregion
//#region packages/core/src/draw/dash.ts
function $n(e, t) {
	return e.map((e) => e * t);
}
var er = {
	dotted: [1, 2],
	dashed: [3, 2],
	dashSmallGap: [3, 1],
	dotDash: [
		1,
		2,
		3,
		2
	],
	dotDotDash: [
		1,
		2,
		1,
		2,
		3,
		2
	],
	dashDotStroked: [
		1,
		2,
		3,
		2
	]
};
function tr(e, t) {
	let n = er[e];
	return n ? $n(n, t) : [];
}
var nr = {
	hair: [1, 1],
	dashed: [4, 3],
	mediumDashed: [4, 3],
	dotted: [2, 2],
	dashDot: [
		4,
		2,
		1,
		2
	],
	mediumDashDot: [
		4,
		2,
		1,
		2
	],
	dashDotDot: [
		4,
		2,
		1,
		2,
		1,
		2
	],
	mediumDashDotDot: [
		4,
		2,
		1,
		2,
		1,
		2
	],
	slantDashDot: [
		5,
		3,
		1,
		3
	]
};
function rr(e) {
	let t = nr[e];
	return t ? $n(t, 1) : [];
}
var ir = {
	dash: [6, 3],
	dot: [1.5, 3],
	dashDot: [
		6,
		3,
		1.5,
		3
	],
	lgDash: [10, 4],
	lgDashDot: [
		10,
		4,
		1.5,
		4
	],
	lgDashDotDot: [
		10,
		4,
		1.5,
		4,
		1.5,
		4
	],
	sysDash: [4, 2],
	sysDot: [1, 2],
	sysDashDot: [
		4,
		2,
		1,
		2
	],
	sysDashDotDot: [
		4,
		2,
		1,
		2,
		1,
		2
	]
};
function ar(e, t) {
	let n = ir[e];
	return n ? $n(n, t) : [];
}
var or = 512;
function sr(e, t, n) {
	if (e != null) {
		let t = [];
		for (let r = 0; r < Math.min(e.length, or); r += 1) {
			let i = e[r];
			!Number.isFinite(i.dash) || !Number.isFinite(i.space) || i.dash < 0 || i.space < 0 || i.dash === 0 && i.space === 0 || t.push(i.dash * n, i.space * n);
		}
		return t;
	}
	return ar(t ?? "solid", n);
}
function cr(e, t) {
	let n = ar(e, t);
	if (n.length > 0) return n;
	let r = e.trim().split(/[\s,]+/).map(Number);
	return r.length >= 2 && r.every((e) => Number.isFinite(e) && e >= 0) && r.some((e) => e > 0) ? (r.length % 2 != 0 && r.pop(), $n(r, t)) : [];
}
var lr = {
	dotted: [1.5, 3],
	dottedHeavy: [1.5, 3],
	dash: [6, 3],
	dashHeavy: [6, 3],
	dashLong: [10, 4],
	dashLongHeavy: [10, 4],
	dotDash: [
		6,
		3,
		1.5,
		3
	],
	dotDashHeavy: [
		6,
		3,
		1.5,
		3
	],
	dotDotDash: [
		6,
		3,
		1.5,
		3,
		1.5,
		3
	],
	dotDotDashHeavy: [
		6,
		3,
		1.5,
		3,
		1.5,
		3
	]
};
function ur(e, t) {
	let n = lr[e];
	return n ? $n(n, t) : [];
}
//#endregion
//#region packages/core/src/shape/path-gradient.ts
var dr = 512, fr = 32768, pr = 2, mr = 16, hr = Math.PI / 32, gr = (e, t, n) => [e[0] * t + e[2] * n + e[4], e[1] * t + e[3] * n + e[5]], _r = (e, t) => [
	e[0] * t[0] + e[2] * t[1],
	e[1] * t[0] + e[3] * t[1],
	e[0] * t[2] + e[2] * t[3],
	e[1] * t[2] + e[3] * t[3],
	e[0] * t[4] + e[2] * t[5] + e[4],
	e[1] * t[4] + e[3] * t[5] + e[5]
];
function vr(e) {
	let t = e[0] * e[3] - e[1] * e[2], n = Math.max(Math.abs(e[0]), Math.abs(e[1]), Math.abs(e[2]), Math.abs(e[3]));
	return !Number.isFinite(t) || !(Math.abs(t) > n * n * 1e-12) ? null : [
		e[3] / t,
		-e[1] / t,
		-e[2] / t,
		e[0] / t,
		(e[2] * e[5] - e[3] * e[4]) / t,
		(e[1] * e[4] - e[0] * e[5]) / t
	];
}
function yr(e, t, n) {
	let r = [], i = [], a = [
		1,
		0,
		0,
		1,
		0,
		0
	], o = [], s = () => {
		let e = (e, t, n) => (t[0] - e[0]) * (n[1] - t[1]) === (t[1] - e[1]) * (n[0] - t[0]) && (t[0] - e[0]) * (n[0] - t[0]) + (t[1] - e[1]) * (n[1] - t[1]) >= 0, t = [];
		for (let n of i) {
			let r = t[t.length - 1];
			if (!(r && n[0] === r[0] && n[1] === r[1])) {
				for (; t.length >= 2 && e(t[t.length - 2], t[t.length - 1], n);) t.pop();
				t.push(n);
			}
		}
		t.length > 1 && t[0][0] === t[t.length - 1][0] && t[0][1] === t[t.length - 1][1] && t.pop();
		let n = 0;
		for (; t.length - n >= 3;) if (e(t[t.length - 2], t[t.length - 1], t[n])) t.pop();
		else if (e(t[t.length - 1], t[n], t[n + 1])) n++;
		else break;
		t.length - n >= 3 && r.push(t.slice(n)), i = [];
	}, c = () => {
		let e = i[i.length - 1], t = e ? vr(a) : null;
		return e && t ? gr(t, e[0], e[1]) : void 0;
	}, l = (e, t) => {
		Number.isFinite(e) && Number.isFinite(t) && i.push(gr(a, e, t));
	}, u = (e, t, n, r, i, a, o, s) => {
		let c = Math.PI * 2, u = o - a;
		!s && u >= c ? u = c : s && -u >= c ? u = -c : s ? (u %= c, u > 0 && (u -= c)) : (u %= c, u < 0 && (u += c));
		let d = Math.max(1, Math.ceil(Math.abs(u) / hr)), f = Math.cos(i), p = Math.sin(i);
		for (let i = 0; i <= d; i++) {
			let o = a + u * i / d, s = n * Math.cos(o), c = r * Math.sin(o);
			l(e + s * f - c * p, t + s * p + c * f);
		}
	}, d = (e, t) => {
		let n = c() ?? [t[0], t[1]];
		i.length === 0 && l(t[0], t[1]);
		for (let r = 1; r <= mr; r++) {
			let i = r / mr, a = 1 - i;
			e === 2 ? l(a * a * n[0] + 2 * a * i * t[0] + i * i * t[2], a * a * n[1] + 2 * a * i * t[1] + i * i * t[3]) : l(a * a * a * n[0] + 3 * a * a * i * t[0] + 3 * a * i * i * t[2] + i * i * i * t[4], a * a * a * n[1] + 3 * a * a * i * t[1] + 3 * a * i * i * t[3] + i * i * i * t[5]);
		}
	}, f = {
		beginPath: () => {
			r.length = 0, i = [];
		},
		moveTo: (e, t) => {
			s(), l(e, t);
		},
		lineTo: (e, t) => l(e, t),
		closePath: () => {
			let e = i[0];
			s(), e && i.push(e);
		},
		bezierCurveTo: (...e) => d(3, e),
		quadraticCurveTo: (...e) => d(2, e),
		arcTo: (e, t) => l(e, t),
		arc: (e, t, n, r, i, a) => u(e, t, n, n, 0, r, i, !!a),
		ellipse: (e, t, n, r, i, a, o, s) => u(e, t, n, r, i, a, o, !!s),
		rect: (e, t, n, r) => {
			s(), l(e, t), l(e + n, t), l(e + n, t + r), l(e, t + r), s(), l(e, t);
		},
		roundRect: (e, t, n, r, i) => {
			let a = Array.isArray(i) ? i : [i ?? 0], o = (e) => {
				let t = typeof e == "number" ? e : typeof e == "object" && e ? Number(e.x ?? 0) : 0;
				return Math.max(0, Math.min(Math.abs(n) / 2, Math.abs(r) / 2, Number.isFinite(t) ? t : 0));
			}, [c, d, f, p] = a.length === 1 ? [
				a[0],
				a[0],
				a[0],
				a[0]
			] : a.length === 2 ? [
				a[0],
				a[1],
				a[0],
				a[1]
			] : a.length === 3 ? [
				a[0],
				a[1],
				a[2],
				a[1]
			] : a;
			s();
			let m = [
				[
					e + n - o(d),
					t + o(d),
					o(d),
					-Math.PI / 2
				],
				[
					e + n - o(f),
					t + r - o(f),
					o(f),
					0
				],
				[
					e + o(p),
					t + r - o(p),
					o(p),
					Math.PI / 2
				],
				[
					e + o(c),
					t + o(c),
					o(c),
					Math.PI
				]
			];
			for (let [e, t, n, r] of m) u(e, t, n, n, 0, r, r + Math.PI / 2, !1);
			s(), l(e, t);
		},
		save: () => {
			o.push(a);
		},
		restore: () => {
			a = o.pop() ?? a;
		},
		translate: (e, t) => {
			a = _r(a, [
				1,
				0,
				0,
				1,
				e,
				t
			]);
		},
		scale: (e, t) => {
			a = _r(a, [
				e,
				0,
				0,
				t,
				0,
				0
			]);
		},
		rotate: (e) => {
			let t = Math.cos(e), n = Math.sin(e);
			a = _r(a, [
				t,
				n,
				-n,
				t,
				0,
				0
			]);
		},
		transform: (e, t, n, r, i, o) => {
			a = _r(a, [
				e,
				t,
				n,
				r,
				i,
				o
			]);
		},
		setTransform: (e, t, n, r, i, o) => {
			a = [
				e,
				t,
				n,
				r,
				i,
				o
			];
		},
		resetTransform: () => {
			a = [
				1,
				0,
				0,
				1,
				0,
				0
			];
		}
	};
	return e(new Proxy(t, {
		get(e, t) {
			if (typeof t == "string" && Object.prototype.hasOwnProperty.call(f, t)) return f[t];
			let n = Reflect.get(e, t);
			return typeof n == "function" ? () => void 0 : n;
		},
		set() {
			return !0;
		}
	}), n.x, n.y, n.w, n.h), s(), r;
}
function br(e, t, n) {
	let r = Math.hypot(n.w, n.h);
	if (!(r > 0)) return !1;
	let i = r * 1e-9, a = 0, o = 0;
	for (let n of e) for (let e = 0; e < n.length; e++) {
		let r = n[e], s = n[(e + 1) % n.length], c = Math.hypot(s[0] - r[0], s[1] - r[1]);
		if (c <= i) continue;
		let l = r[0] - t[0], u = r[1] - t[1], d = s[0] - t[0], f = s[1] - t[1], p = l * f - u * d;
		if (Math.abs(p) / c <= i || a !== 0 && Math.sign(p) !== a) return !1;
		a = Math.sign(p), o += Math.atan2(p, l * d + u * f);
	}
	return a !== 0 && Math.abs(Math.abs(o) - Math.PI * 2) < 1e-6;
}
function xr(e) {
	let t = e.fillToRect;
	return !!t && ((t.l ?? 0) + (t.r ?? 0) > 1 || (t.t ?? 0) + (t.b ?? 0) > 1);
}
function Sr(e) {
	let t = e.fillToRect;
	return t ? {
		origin: [t.l ?? 0, t.t ?? 0],
		size: [1 - ((t.l ?? 0) + (t.r ?? 0)), 1 - ((t.t ?? 0) + (t.b ?? 0))]
	} : {
		origin: [.5, .5],
		size: [0, 0]
	};
}
var Cr = (e) => [
	[e.x, e.y],
	[e.x + e.w, e.y],
	[e.x + e.w, e.y + e.h],
	[e.x, e.y + e.h]
];
function wr(e) {
	let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity;
	for (let [a, o] of e) t = Math.min(t, a), n = Math.min(n, o), r = Math.max(r, a), i = Math.max(i, o);
	return {
		x: t,
		y: n,
		w: r - t,
		h: i - n
	};
}
function Tr(e, t) {
	let n = $t(e, 1024, 1), r = n?.getContext("2d");
	if (!n || !r) return null;
	let i = r.createLinearGradient(0, 0, 1024, 0);
	for (let e of t) {
		let t = e.color.replace(/^#/, "");
		i.addColorStop(Math.max(0, Math.min(1, e.position)), `#${t}`);
	}
	return r.fillStyle = i, r.fillRect(0, 0, 1024, 1), r.getImageData(0, 0, 1024, 1).data;
}
function Er(e) {
	let t = e.replace(/^#/, ""), n = (e) => Number.parseInt(t.slice(e, e + 2), 16);
	return [
		n(0),
		n(2),
		n(4),
		t.length >= 8 ? n(6) : 255
	];
}
function Dr(e, t, n, r, i, a, o, s, c, l) {
	let u = e - o - n * c, d = o - n * (1 - c), f = t - s - r * l, p = s - r * (1 - l), m = c, h = 1 - c, g = l, _ = 1 - l, v = a * d * _ - i * p * h, y = a * (u * _ + d * g) - i * (f * h + p * m), b = a * u * g - i * f * m, x = [];
	if (Math.abs(v) < 1e-12) Math.abs(y) > 1e-12 && x.push(-b / y);
	else {
		let e = y * y - 4 * v * b;
		if (e >= 0) {
			let t = Math.sqrt(e);
			x.push((-y - t) / (2 * v), (-y + t) / (2 * v));
		}
	}
	let S = -1, C = i * i + a * a;
	if (c <= 1e-12 || l <= 1e-12) {
		let u = c > 1e-12 && Math.abs(i) > 1e-12 ? ((e - o) / c - n) / i : l > 1e-12 && Math.abs(a) > 1e-12 ? ((t - s) / l - r) / a : 0;
		if (u >= -1e-9 && u <= 1.000000001 && Math.abs(o + c * (n + u * i) - e) <= 1e-9 && Math.abs(s + l * (r + u * a) - t) <= 1e-9) return 0;
	}
	for (let c of x) {
		if (!(c >= -1e-9 && c <= 1.000000001)) continue;
		let l = m + h * c, u = g + _ * c;
		if (l <= 1e-12 || u <= 1e-12) continue;
		let d = (e - (1 - c) * o) / l, f = (t - (1 - c) * s) / u, p = ((d - n) * i + (f - r) * a) / C;
		if (p < -1e-9 || p > 1.000000001) continue;
		let v = Math.min(1, Math.max(0, c));
		(S < 0 || v < S) && (S = v);
	}
	return S;
}
function Or(e, t, n) {
	return e[1] > t[1] && ([e, t] = [t, e]), n === e[1] ? e[0] : n === t[1] ? t[0] : e[0] + (n - e[1]) / (t[1] - e[1]) * (t[0] - e[0]);
}
function kr(e) {
	let t = e.filter((t, n) => {
		let r = e[(n + 1) % e.length];
		return t[0] !== r[0] || t[1] !== r[1];
	}), n = 0;
	for (let e = 0; e < t.length; e++) {
		let r = t[e], i = t[(e + 1) % t.length], a = t[(e + 2) % t.length], o = (i[0] - r[0]) * (a[1] - i[1]) - (i[1] - r[1]) * (a[0] - i[0]);
		if (o !== 0) {
			if (n && Math.sign(o) !== n) return null;
			n = Math.sign(o);
		}
	}
	return n ? t : [];
}
function Ar(e, t) {
	let n = Infinity, r = -Infinity;
	for (let i = 0; i < e.length; i++) {
		let a = e[i], o = e[(i + 1) % e.length];
		if (!(t < Math.min(a[1], o[1]) || t > Math.max(a[1], o[1]))) if (a[1] === o[1]) n = Math.min(n, a[0], o[0]), r = Math.max(r, a[0], o[0]);
		else {
			let e = Or(a, o, t);
			n = Math.min(n, e), r = Math.max(r, e);
		}
	}
	return n <= r ? [[n, r]] : [];
}
function jr(e, t) {
	let [n, r, i, a] = e, o = a[0] - n[0], s = a[1] - n[1], c = r[0] - n[0], l = r[1] - n[1], u = i[0] - a[0] - c, d = i[1] - a[1] - l, f = t - n[1];
	if (l === 0 && d === 0 && s !== 0) {
		let e = f / s;
		if (e < 0 || e > 1) return [];
		let o = Or(n, a, t), c = Or(r, i, t);
		return [[Math.min(o, c), Math.max(o, c)]];
	}
	let p = [{ s: 0 }, { s: 1 }];
	for (let [e, o] of [[n, a], [r, i]]) {
		if (e[1] === o[1]) continue;
		let n = (t - e[1]) / (o[1] - e[1]);
		n > 0 && n < 1 && p.push({
			s: n,
			x: Or(e, o, t)
		});
	}
	if (d !== 0) {
		let e = -l / d;
		e > 0 && e < 1 && p.push({ s: e });
	}
	p.sort((e, t) => e.s - t.s);
	let m = n[0] * l + c * f, h = n[0] * d + o * l + u * f - c * s, g = o * d - u * s, _ = [], v = g * d, y = 2 * g * l, b = h * l - m * d;
	if (v === 0) y !== 0 && _.push(-b / y);
	else {
		let e = y * y - 4 * v * b;
		if (e >= 0) {
			let t = Math.sqrt(e);
			_.push((-y - t) / (2 * v), (-y + t) / (2 * v));
		}
	}
	let x = (e) => {
		let t = l + d * e;
		return Math.abs(t) > 1e-12 ? (m + e * (h + e * g)) / t : d === 0 ? n[0] + o * e : (h + 2 * g * e) / d;
	}, S = [];
	for (let e = 0; e < p.length - 1; e++) {
		let m = p[e].s, h = p[e + 1].s, g = (m + h) / 2, v = l + d * g;
		if (Math.abs(v) <= 1e-12) {
			if (Math.abs(f - s * g) <= 1e-12) {
				let e = [m, h].flatMap((e) => [n[0] + o * e, n[0] + o * e + c + u * e]);
				S.push([Math.min(...e), Math.max(...e)]);
			}
			continue;
		}
		let y = (f - s * g) / v;
		if (y < 0 || y > 1) continue;
		let b = (e) => e.x === void 0 ? e.s === 0 && n[1] !== r[1] ? Or(n, r, t) : e.s === 1 && a[1] !== i[1] ? Or(a, i, t) : x(e.s) : e.x, C = [
			b(p[e]),
			b(p[e + 1]),
			..._.filter((e) => e > m && e < h).map(x)
		];
		S.push([Math.min(...C), Math.max(...C)]);
	}
	return S;
}
function Mr(e, t, n, r, i, a, o) {
	if (xr(e)) return null;
	let [s, c] = Sr(e).size;
	if (s === 0 != (c === 0) || e.path === "rect" && s === 0 && c === 0 || ![n, r].every((e) => [
		e.x,
		e.y,
		e.w,
		e.h
	].every(Number.isFinite) && e.w > 0 && e.h > 0) || typeof t.getTransform != "function" || e.stops.length === 0) return null;
	let l = i ? yr(i, t, r) : [];
	if (l.reduce((e, t) => e + t.length, 0) > fr) return null;
	let u = l.length > 0 ? l : [Cr(r)];
	if (!br(u, [r.x + r.w / 2, r.y + r.h / 2], r)) return null;
	let d = t.getTransform(), f = [
		d.a,
		d.b,
		d.c,
		d.d,
		d.e,
		d.f
	], p = f.every(Number.isFinite) ? vr(f) : null;
	if (!p) return null;
	let m = u, h = n;
	if (!(h.w > 0 && h.h > 0)) return null;
	let g = wr([...m.flat(), ...Cr(h)].map((e) => gr(f, e[0], e[1]))), _ = a ? wr([...Cr(g), ...Cr(a)]) : g;
	if (![
		_.x,
		_.y,
		_.w,
		_.h
	].every(Number.isFinite)) return null;
	let v = Math.min(1, (dr - 2 * pr - 1) / Math.max(_.w, 1e-9), (dr - 2 * pr - 1) / Math.max(_.h, 1e-9)), y = v === 1 ? Math.floor(_.x) : _.x, b = v === 1 ? Math.floor(_.y) : _.y, x = dr - 2 * pr, S = Math.max(1, Math.min(x, Math.ceil((_.x + _.w - y) * v))) + 2 * pr, C = Math.max(1, Math.min(x, Math.ceil((_.y + _.h - b) * v))) + 2 * pr, w = [
		1 / v,
		0,
		0,
		1 / v,
		y - pr / v,
		b - pr / v
	], T = vr(w);
	if (!T) return null;
	let E = _r(_r(T, f), [
		h.w,
		0,
		0,
		h.h,
		h.x,
		h.y
	]), D = vr(E);
	if (!D) return null;
	let O = $t(t, S, C), k = O?.getContext("2d"), A = [...e.stops].sort((e, t) => e.position - t.position), j = Tr(t, A);
	if (!O || !k || !j || typeof k.createImageData != "function") return null;
	let ee = Er(A[0].color), te = Er(A[A.length - 1].color), M = new Float64Array(S * C).fill(NaN);
	o && (o.edgeRows = 0, o.solves = 0, o.rejected = 0, o.pixels = S * C);
	{
		let { origin: [t, n], size: [r, i] } = Sr(e), a = (e) => [(e[0] - h.x) / h.w, (e[1] - h.y) / h.h], s = e.path === "shape" ? m.map((e) => e.map(a)) : [Cr({
			x: 0,
			y: 0,
			w: 1,
			h: 1
		})], c = 0, l = new Int32Array(C * (S + 1)), u = new Int32Array(l.length), d = new Uint8Array(l.length);
		for (let e = 0; e < C; e++) for (let t = 0; t <= S; t++) l[e * (S + 1) + t] = u[e * (S + 1) + t] = t;
		let f = (e, t) => {
			let n = e * (S + 1), r = t;
			for (; l[n + r] !== r;) r = l[n + r];
			for (; l[n + t] !== r;) {
				let e = l[n + t];
				l[n + t] = r, t = e;
			}
			return r;
		}, p = (e, t) => u[e * (S + 1) + f(e, t)], g = (e, t) => {
			let n = e * (S + 1), r = f(e, t), i = f(e, t + 1);
			r !== i && (d[n + r] < d[n + i] && ([r, i] = [i, r]), l[n + i] = r, u[n + r] = Math.max(u[n + r], u[n + i]), d[n + r] === d[n + i] && d[n + r]++);
		}, _ = [];
		for (let e of s) for (let t = 0; t < e.length; t++) _.push([e[t], e[(t + 1) % e.length]]);
		let v = (e) => [t + r * e[0], n + i * e[1]];
		if (r > 0 && i > 0) {
			let e = _.map(([e, t]) => [v(e), v(t)].map((e) => gr(E, e[0], e[1])));
			for (let t = 0; t < C; t++) {
				let n = t + .5, r = [];
				for (let [t, i] of e) t[1] <= n != i[1] <= n && r.push([Or(t, i, n), i[1] > t[1] ? 1 : -1]);
				r.sort((e, t) => e[0] - t[0]);
				let i = 0;
				for (let e = 0; e < r.length - 1; e++) {
					if (i += r[e][1], i === 0) continue;
					let n = Math.max(0, Math.ceil(r[e][0] - .5)), a = Math.min(S - 1, Math.floor(r[e + 1][0] - .5));
					if (!(n > a)) for (let e = p(t, n); e <= a; e = p(t, e)) M[t * S + e] = 0, g(t, e);
				}
			}
		}
		for (let e = _.length - 1; e >= 0; e--) {
			let [a, s] = _[e], l = s[0] - a[0], u = s[1] - a[1];
			if (l === 0 && u === 0) continue;
			let d = [
				v(a),
				v(s),
				s,
				a
			].map((e) => gr(E, e[0], e[1])), f = kr(d);
			if (f?.length === 0) continue;
			let m = d.map((e) => e[1]), h = Math.max(0, Math.ceil(Math.min(...m) - .5)), y = Math.min(C - 1, Math.floor(Math.max(...m) - .5));
			for (let e = h; e <= y; e++) {
				o && o.edgeRows++;
				for (let [s, m] of f ? Ar(f, e + .5) : jr(d, e + .5)) {
					let d = Math.min(S - 1, Math.floor(m - .5)), f = Math.max(0, Math.ceil(s - .5));
					if (f > d) continue;
					let h = p(e, f);
					for (; h <= d;) {
						let [s, d] = gr(D, h + .5, e + .5);
						if (c >= S * C) return null;
						c++, o && o.solves++;
						let f = Dr(s, d, a[0], a[1], l, u, t, n, r, i);
						f >= 0 && (M[e * S + h] = f, g(e, h)), f < 0 && o && o.rejected++, h = p(e, h + 1);
					}
				}
			}
		}
	}
	let N = k.createImageData(S, C), P = N.data;
	for (let e = 0, t = 0; e < M.length; e++, t += 4) {
		let n = Number.isNaN(M[e]) ? 1 : M[e], r = n <= 0 ? ee : n >= 1 ? te : void 0;
		if (r) P[t] = r[0], P[t + 1] = r[1], P[t + 2] = r[2], P[t + 3] = r[3];
		else {
			let e = Math.min(1023, Math.floor(n * 1024)) * 4;
			P[t] = j[e], P[t + 1] = j[e + 1], P[t + 2] = j[e + 2], P[t + 3] = j[e + 3];
		}
	}
	k.putImageData(N, 0, 0);
	let ne = t.createPattern(O, "no-repeat");
	if (!ne || typeof ne.setTransform != "function") return null;
	let F = _r(p, w);
	return ne.setTransform({
		a: F[0],
		b: F[1],
		c: F[2],
		d: F[3],
		e: F[4],
		f: F[5]
	}), ne;
}
//#endregion
//#region packages/core/src/shape/paint-bounds.ts
var Nr = /* @__PURE__ */ new WeakMap(), Pr = /* @__PURE__ */ new WeakMap(), Fr = (e) => Pr.get(e) ?? e, Ir = /* @__PURE__ */ new WeakMap();
function Lr(e) {
	if (Nr.has(e)) return e;
	let t = Ir.get(e);
	if (t) return t;
	let n = { paths: [] }, r = () => typeof e.getTransform == "function" ? e.getTransform() : {
		a: 1,
		b: 0,
		c: 0,
		d: 1,
		e: 0,
		f: 0
	}, i = (e, t) => {
		let n = r();
		return [n.a * e + n.c * t + n.e, n.b * e + n.d * t + n.f];
	}, a = (e, t) => {
		let n = r();
		return [n.a * e + n.c * t, n.b * e + n.d * t];
	}, o = (e) => {
		let t = {
			origin: e,
			segments: [],
			closed: !1
		};
		n.paths.push(t), n.current = t, n.pen = e;
	}, s = (e) => {
		if (!n.pen || !n.current) {
			o(e);
			return;
		}
		let t = [e[0] - n.pen[0], e[1] - n.pen[1]];
		n.current.segments.push({
			points: [n.pen, e],
			start: t,
			end: t,
			curved: !1
		}), n.pen = e;
	}, c = () => {
		n.current && (s(n.current.origin), n.current.closed = !0);
	}, l = (e, t, r, c, l, u, d, f) => {
		let p = Math.cos(l), m = Math.sin(l), h = (n) => i(e + r * Math.cos(n) * p - c * Math.sin(n) * m, t + r * Math.cos(n) * m + c * Math.sin(n) * p), g = (e) => {
			let t = f ? -1 : 1;
			return a(t * (-r * Math.sin(e) * p - c * Math.cos(e) * m), t * (-r * Math.sin(e) * m + c * Math.cos(e) * p));
		}, _ = h(u);
		n.current ? s(_) : o(_);
		let v = i(e, t), y = a(r * p, r * m), b = a(-c * m, c * p), x = Math.hypot(y[0], b[0]), S = Math.hypot(y[1], b[1]);
		n.current?.segments.push({
			points: [
				_,
				h(d),
				[v[0] - x, v[1] - S],
				[v[0] + x, v[1] + S]
			],
			start: g(u),
			end: g(d),
			curved: !0
		}), n.pen = h(d);
	}, u = (e, t) => {
		switch (e) {
			case "beginPath":
				n.paths = [], n.current = void 0, n.pen = void 0;
				break;
			case "moveTo":
				o(i(t[0], t[1]));
				break;
			case "lineTo":
				s(i(t[0], t[1]));
				break;
			case "closePath":
				c();
				break;
			case "rect":
			case "roundRect":
				if (o(i(t[0], t[1])), s(i(t[0] + t[2], t[1])), s(i(t[0] + t[2], t[1] + t[3])), s(i(t[0], t[1] + t[3])), c(), e === "roundRect" && n.current) for (let e of n.current.segments) e.curved = !0;
				break;
			case "quadraticCurveTo":
			case "bezierCurveTo": {
				let e = [];
				for (let n = 0; n < t.length; n += 2) e.push(i(t[n], t[n + 1]));
				n.pen || o(e[0]);
				let r = [n.pen, ...e], a = r.length - 1, s = (e, t) => {
					for (let n = e + t; n >= 0 && n <= a; n += t) {
						let i = [(r[n][0] - r[e][0]) * t, (r[n][1] - r[e][1]) * t];
						if (i[0] !== 0 || i[1] !== 0) return i;
					}
					return [0, 0];
				};
				n.current?.segments.push({
					points: r,
					start: s(0, 1),
					end: s(a, -1),
					curved: !0
				}), n.pen = r[a];
				break;
			}
			case "arc":
				l(t[0], t[1], t[2], t[2], 0, t[3], t[4], !!t[5]);
				break;
			case "ellipse":
				l(t[0], t[1], t[2], t[3], t[4], t[5], t[6], !!t[7]);
				break;
		}
	}, d = new Proxy(e, {
		get(e, t) {
			let n = Reflect.get(e, t, e);
			return typeof n == "function" ? (...r) => (typeof t == "string" && u(t, r), Reflect.apply(n, e, r)) : n;
		},
		set(e, t, n) {
			return Reflect.set(e, t, n, e);
		}
	});
	return Nr.set(d, n), Pr.set(d, e), Ir.set(e, d), d;
}
function Rr(e) {
	let t = Nr.get(e);
	if (!t || t.paths.length === 0 || typeof e.getTransform != "function") return;
	let n = e.getTransform(), r = n.a * n.d - n.b * n.c;
	if (!Number.isFinite(r) || r === 0) return;
	let i = e.lineWidth / 2, a = i * Math.hypot(n.a, n.c), o = i * Math.hypot(n.b, n.d), s = typeof e.getLineDash == "function" && e.getLineDash().some((e) => e > 0), c = s && e.lineCap === "square", l = Infinity, u = -Infinity, d = Infinity, f = -Infinity, p = (e, t = 0, n = 0) => {
		l = Math.min(l, e[0] - t), u = Math.max(u, e[0] + t), d = Math.min(d, e[1] - n), f = Math.max(f, e[1] + n);
	}, m = (e) => {
		let t = (n.d * e[0] - n.c * e[1]) / r, i = (-n.b * e[0] + n.a * e[1]) / r, a = Math.hypot(t, i);
		return a > 0 ? [t / a, i / a] : [0, 0];
	}, h = (e, t, r) => {
		p([e[0] + n.a * t + n.c * r, e[1] + n.b * t + n.d * r]);
	};
	for (let n of t.paths) {
		let t = n.segments.filter((e) => e.start[0] !== 0 || e.start[1] !== 0);
		t.length === 0 && n.segments.length > 0 && !n.closed && e.lineCap === "round" && p(n.origin, a, o);
		for (let n of t) if (n.curved) for (let e of n.points) p(e, c ? Math.SQRT2 * a : a, c ? Math.SQRT2 * o : o);
		else {
			let [t, r] = m(n.start);
			for (let l of n.points) if (h(l, -r * i, t * i), h(l, r * i, -t * i), c) for (let e of [-1, 1]) h(l, i * (e * t - r), i * (e * r + t)), h(l, i * (e * t + r), i * (e * r - t));
			else s && e.lineCap === "round" && p(l, a, o);
		}
		for (let r = 0; r < t.length; r++) {
			let s = t[r], c = t[(r + 1) % t.length];
			if (!n.closed && r === t.length - 1) break;
			let l = s.points[s.points.length - 1];
			if (e.lineJoin === "round") {
				p(l, a, o);
				continue;
			}
			if (e.lineJoin !== "miter") continue;
			let u = m(s.end), d = m(c.start), f = 1 + u[0] * d[0] + u[1] * d[1];
			if (f <= 0 || Math.sqrt(2 / f) > e.miterLimit) continue;
			let g = -i * (u[1] + d[1]) / f, _ = i * (u[0] + d[0]) / f;
			h(l, g, _), h(l, -g, -_);
		}
		if (!n.closed && t.length > 0) {
			let n = t[0], r = t[t.length - 1];
			for (let [t, s, c] of [[
				n.points[0],
				n.start,
				-1
			], [
				r.points[r.points.length - 1],
				r.end,
				1
			]]) if (e.lineCap === "round") p(t, a, o);
			else if (e.lineCap === "square") {
				let [e, n] = m(s);
				h(t, i * (c * e - n), i * (c * n + e)), h(t, i * (c * e + n), i * (c * n - e));
			}
		}
	}
	return Number.isFinite(l) ? {
		x: l,
		y: d,
		w: u - l,
		h: f - d
	} : void 0;
}
function zr(e, t) {
	if (typeof e.getTransform != "function") return;
	let n = e.getTransform(), r = (e.lineWidth ?? 1) / 2, i = e.lineJoin === "miter" && e.miterLimit >= Math.SQRT2, a = r * (i ? Math.abs(n.a) + Math.abs(n.c) : Math.hypot(n.a, n.c)), o = r * (i ? Math.abs(n.b) + Math.abs(n.d) : Math.hypot(n.b, n.d)), s = [
		[t.x, t.y],
		[t.x + t.w, t.y],
		[t.x, t.y + t.h],
		[t.x + t.w, t.y + t.h]
	], c = s.map(([e, t]) => n.a * e + n.c * t + n.e), l = s.map(([e, t]) => n.b * e + n.d * t + n.f);
	return {
		x: Math.min(...c) - a,
		y: Math.min(...l) - o,
		w: Math.max(...c) - Math.min(...c) + 2 * a,
		h: Math.max(...l) - Math.min(...l) + 2 * o
	};
}
//#endregion
//#region packages/core/src/shape/paint.ts
var Br = 512;
function Vr(e) {
	return e?.fillType === "gradient" && e.gradType === "radial" && (e.path === "rect" || e.path === "shape") && (e.tileRect?.l ?? 0) === 0 && (e.tileRect?.t ?? 0) === 0 && (e.tileRect?.r ?? 0) === 0 && (e.tileRect?.b ?? 0) === 0;
}
function Hr(e, t, n, r, i, a, o) {
	let s = e.tileRect;
	if (!s || (s.l ?? 0) === 0 && (s.t ?? 0) === 0 && (s.r ?? 0) === 0 && (s.b ?? 0) === 0) return null;
	let c = n + i * (s.l ?? 0), l = r + a * (s.t ?? 0), u = i * (1 - (s.l ?? 0) - (s.r ?? 0)), d = a * (1 - (s.t ?? 0) - (s.b ?? 0));
	if (!Number.isFinite(u) || !Number.isFinite(d) || Math.abs(u) < 1e-9 || Math.abs(d) < 1e-9) return null;
	let f = Math.min(1, Br / Math.abs(u), Br / Math.abs(d)), p = Math.max(1, Math.ceil(Math.abs(u) * f)), m = Math.max(1, Math.ceil(Math.abs(d) * f)), h = $t(t, p, m), g = h?.getContext("2d");
	if (!h || !g) return null;
	let _ = {
		...e,
		tileRect: void 0,
		flip: void 0
	}, v = e.gradType === "radial" ? Ur(_, g, {
		x: 0,
		y: 0,
		w: p,
		h: m
	}) : Jr(_, g, 0, 0, p, m, o);
	if (!v) return null;
	g.fillStyle = v, g.fillRect(0, 0, p, m);
	let y = e.flip === "x" || e.flip === "xy", b = e.flip === "y" || e.flip === "xy", x = h;
	if (y || b) {
		let e = $t(t, p * (y ? 2 : 1), m * (b ? 2 : 1)), n = e?.getContext("2d");
		if (!e || !n) return null;
		for (let e = 0; e < (b ? 2 : 1); e += 1) for (let t = 0; t < (y ? 2 : 1); t += 1) n.save(), n.translate(t * p, e * m), n.scale(t === 1 ? -1 : 1, e === 1 ? -1 : 1), n.drawImage(h, t === 1 ? -p : 0, e === 1 ? -m : 0), n.restore();
		x = e;
	}
	let S = t.createPattern(x, "repeat");
	return !S || typeof S.setTransform != "function" ? null : (S.setTransform({
		a: u / p,
		b: 0,
		c: 0,
		d: d / m,
		e: c,
		f: l
	}), S);
}
function Ur(e, t, n) {
	let r = e.fillToRect, i = n.x + n.w * (r?.l ?? 0), a = n.y + n.h * (r?.t ?? 0), o = n.w * (1 - (r?.l ?? 0) - (r?.r ?? 0)), s = n.h * (1 - (r?.t ?? 0) - (r?.b ?? 0)), c = i + o / 2, l = a + s / 2, u = Math.max(Math.abs(c - n.x), Math.abs(n.x + n.w - c)), d = Math.max(Math.abs(l - n.y), Math.abs(n.y + n.h - l)), f = e.path === "rect" ? Math.max(u, d) : Math.sqrt(u * u + d * d), p = t.createRadialGradient(c, l, 0, c, l, Math.max(f, 1e-9));
	for (let t of e.stops) p.addColorStop(Math.min(1, Math.max(0, t.position)), Y(t.color));
	return p;
}
function Y(e, t = 1) {
	let n = e.charCodeAt(0) === 35 ? e.slice(1) : e;
	return `rgba(${parseInt(n.slice(0, 2), 16)},${parseInt(n.slice(2, 4), 16)},${parseInt(n.slice(4, 6), 16)},${n.length >= 8 ? parseInt(n.slice(6, 8), 16) / 255 : t})`;
}
function Wr(e) {
	let t = e.startsWith("#") ? e.slice(1) : e;
	if (t.length < 8) return !0;
	let n = Number.parseInt(t.slice(6, 8), 16);
	return !Number.isFinite(n) || n !== 0;
}
function Gr(e) {
	return !e || e.fillType === "none" ? !1 : e.fillType === "solid" ? Wr(e.color) : e.fillType === "gradient" ? e.stops.some((e) => Wr(e.color)) : e.fillType === "pattern" ? Wr(e.fg) || Wr(e.bg) : e.alpha == null || !Number.isFinite(e.alpha) || e.alpha > 0;
}
function Kr(e) {
	let t = e.charCodeAt(0) === 35 ? e.slice(1) : e, n = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), i = parseInt(t.slice(4, 6), 16);
	return .299 * n + .587 * r + .114 * i;
}
function qr(e) {
	return e && Kr(e) < 128 ? "#FFFFFF" : "#000000";
}
function Jr(e, t, n, r, i, a, o = 0, s, c, l, u) {
	return Yr(e, t, n, r, i, a, o, s, c, l, u, !0);
}
function Yr(e, t, n, r, i, a, o = 0, s, c, l, u, d = !0) {
	if (!e || e.fillType === "none") return null;
	if (e.fillType === "solid") return Y(e.color);
	if (e.fillType === "pattern") {
		let n = Qr.get(Fr(t));
		return ai(e, t, s ?? Zr.get(Fr(t)) ?? 4 / 3, c ?? (n ? $r(t.getTransform(), n) : void 0));
	}
	if (e.fillType === "gradient") {
		let s = e.stops;
		if (s.length === 0) return null;
		if (s.length === 1) return Y(s[0].color);
		let c = Hr(e, t, n, r, i, a, o);
		if (c) return c;
		let f, p = e.tileRect, m = n + i * (p?.l ?? 0), h = r + a * (p?.t ?? 0), g = i * (1 - (p?.l ?? 0) - (p?.r ?? 0)), _ = a * (1 - (p?.t ?? 0) - (p?.b ?? 0));
		if (d && Vr(e)) return Mr(e, t, {
			x: m,
			y: h,
			w: g,
			h: _
		}, {
			x: n,
			y: r,
			w: i,
			h: a
		}, l, u ?? zr(t, {
			x: n,
			y: r,
			w: i,
			h: a
		})) ?? Ur(e, t, {
			x: m,
			y: h,
			w: g,
			h: _
		});
		if (e.gradType === "radial") return Ur(e, t, {
			x: m,
			y: h,
			w: g,
			h: _
		});
		{
			let n = (e.rotWithShape === !1 ? e.angle - o : e.angle) * Math.PI / 180, r = Math.cos(n), i = Math.sin(n);
			if (e.scaled === !0) {
				r *= g, i *= _;
				let e = Math.hypot(r, i);
				e > 0 && (r /= e, i /= e);
			}
			let a = m + g / 2, s = h + _ / 2, c = (Math.abs(r) * g + Math.abs(i) * _) / 2;
			f = t.createLinearGradient(a - r * c, s - i * c, a + r * c, s + i * c);
		}
		for (let e of s) f.addColorStop(Math.min(1, Math.max(0, e.position)), Y(e.color));
		return f;
	}
	return null;
}
function Xr(...e) {
	let [t, n, r, i, a, o, s, c, l, u, d] = e;
	return Yr(t, n, r, i, a, o, s, c, l, u, d, !1);
}
var Zr = /* @__PURE__ */ new WeakMap(), Qr = /* @__PURE__ */ new WeakMap();
function $r(e, t) {
	let n = e.a ?? 1, r = e.b ?? 0, i = e.c ?? 0, a = e.d ?? 1, o = e.e ?? 0, s = e.f ?? 0, c = n * a - r * i;
	if (Math.abs(c) < 1e-12) return;
	let l = a / c, u = -r / c, d = -i / c, f = n / c, p = -(l * o + d * s), m = -(u * o + f * s);
	return {
		a: l * t.a + d * t.b,
		b: u * t.a + f * t.b,
		c: l * t.c + d * t.d,
		d: u * t.c + f * t.d,
		e: l * t.e + d * t.f + p,
		f: u * t.e + f * t.f + m
	};
}
function ei(e, t, n) {
	let r = Qr.get(Fr(e));
	Qr.set(Fr(e), {
		a: t.a ?? 1,
		b: t.b ?? 0,
		c: t.c ?? 0,
		d: t.d ?? 1,
		e: t.e ?? 0,
		f: t.f ?? 0
	});
	try {
		return n();
	} finally {
		r ? Qr.set(Fr(e), r) : Qr.delete(Fr(e));
	}
}
function ti(e, t, n) {
	let r = Zr.get(Fr(e));
	Zr.set(Fr(e), t);
	try {
		return n();
	} finally {
		r === void 0 ? Zr.delete(Fr(e)) : Zr.set(Fr(e), r);
	}
}
function ni(e, t, n, r, i) {
	e = Fr(e);
	let a = Zr.get(e), o = Qr.get(e), s = o && i ? {
		a: i.a * o.a + i.c * o.b,
		b: i.b * o.a + i.d * o.b,
		c: i.a * o.c + i.c * o.d,
		d: i.b * o.c + i.d * o.d,
		e: i.a * o.e + i.c * o.f + i.e,
		f: i.b * o.e + i.d * o.f + i.f
	} : o && r ? {
		...o,
		e: o.e - r.x,
		f: o.f - r.y
	} : o, c = () => s ? ei(t, s, n) : n();
	return a === void 0 ? c() : ti(t, a, c);
}
var ri = /* @__PURE__ */ new WeakMap(), ii = 256;
function ai(e, t, n, r) {
	let i = r, a = `${e.preset}|${e.fg}|${e.bg}|${n}|${i?.a ?? 1},${i?.b ?? 0},${i?.c ?? 0},${i?.d ?? 1},${i?.e ?? 0},${i?.f ?? 0}`, o = ri.get(t);
	o || (o = /* @__PURE__ */ new Map(), ri.set(t, o));
	let s = o.get(a);
	if (s) return s;
	let c = Xn(e.preset, e.fg, e.bg);
	if (!c) return Y(e.fg);
	let l = t.createPattern(c, "repeat");
	if (!l) return Y(e.fg);
	if (typeof l.setTransform == "function") {
		let e = n / 8;
		l.setTransform({
			a: (i?.a ?? 1) * e,
			b: (i?.b ?? 0) * e,
			c: (i?.c ?? 0) * e,
			d: (i?.d ?? 1) * e,
			e: i?.e ?? 0,
			f: i?.f ?? 0
		});
	}
	if (o.size >= ii) {
		let e = o.keys().next().value;
		e !== void 0 && o.delete(e);
	}
	return o.set(a, l), l;
}
function oi(e, t, n) {
	if (!t) {
		e.strokeStyle = "transparent", e.lineWidth = 0, e.setLineDash([]), e.lineCap = "butt", e.lineJoin = "miter", e.miterLimit = 10;
		return;
	}
	e.strokeStyle = Y(t.color);
	let r = Math.max(.5, t.width * n);
	e.lineWidth = r;
	let i = t.customDash == null ? t.dashStyle ? cr(t.dashStyle, r) : [] : sr(t.customDash, null, r), a = t.lineCap ?? "butt", o = i.some((e, t) => t % 2 == 0 && e === 0);
	e.lineCap = a === "butt" && o ? "square" : a, e.lineJoin = t.lineJoin ?? "miter", e.miterLimit = t.miterLimit ?? 10, e.setLineDash(i);
}
//#endregion
//#region packages/core/src/chart/box-whisker.ts
var si = .06;
function ci(e) {
	let t = Math.floor(e.length / 2);
	return e.length % 2 == 1 ? e[t] : e[t - 1] / 2 + e[t] / 2;
}
function li(e) {
	let t = 0;
	for (let n of e) t = Math.max(t, Math.abs(n));
	if (t === 0) return 0;
	let n = 0;
	for (let r of e) n += r / t;
	return n / e.length * t;
}
function ui(e, t) {
	let n = e + (e - t) * 1.5;
	if (Number.isFinite(n)) return n;
	let r = e / 4, i = r + (r - t / 4) * 1.5, a = i * 4;
	return Number.isFinite(a) ? a : i < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function di(e, t) {
	if (t <= 1) return e[0];
	if (t >= e.length) return e[e.length - 1];
	let n = Math.floor(t), r = t - n, i = e[n - 1], a = e[n];
	if (r === 0 || i === a) return i;
	let o = i * (1 - r) + a * r;
	return Math.min(a, Math.max(i, o));
}
function fi(e, t) {
	let n = e.filter((e) => typeof e == "number" && Number.isFinite(e)).sort((e, t) => e - t);
	if (n.length === 0) return null;
	let r = n.length, i = ci(n), a = t === "inclusive" ? (e) => (r - 1) * e + 1 : (e) => (r + 1) * e, o = di(n, a(.25)), s = di(n, a(.75)), c = ui(o, s), l = ui(s, o), u = [], d = [];
	for (let e of n) e < c || e > l ? d.push(e) : u.push(e);
	return {
		q1: o,
		median: i,
		q3: s,
		lowerFence: c,
		upperFence: l,
		whiskerLo: u[0] ?? n[0],
		whiskerHi: u[u.length - 1] ?? n[n.length - 1],
		mean: li(n),
		outliers: d,
		inner: u
	};
}
function pi(e, t, n, r, i) {
	let a = null;
	return e.map((e) => {
		if (!e || !t && !n) return [];
		let o = t ? e.inner.slice(1, -1) : [], s = n ? e.outliers.filter((t) => t < e.lowerFence) : [], c = n ? e.outliers.filter((t) => t > e.upperFence) : [], l = [];
		for (let e of [
			...s,
			...o,
			...c
		]) {
			let t = r(e);
			a !== null && Math.abs(t - a) < i || (l.push(e), a = t);
		}
		return l;
	});
}
function mi(e, t, n) {
	return (t ? Math.max(0, e.inner.length - 2) : 0) + (n ? e.outliers.length : 0);
}
function hi(e, t) {
	let n = 0;
	for (let r of e) for (let e of r) if (n += e.length, !Number.isSafeInteger(n) || n > t) return t + 1;
	return n;
}
function gi(e, t, n, r, i, a, o) {
	if (!Number.isFinite(e) || !Number.isFinite(t) || t <= 0 || !Number.isInteger(n) || n <= 0 || !Number.isInteger(r) || r <= 0 || !Number.isInteger(i) || i < 0 || i >= n || !Number.isInteger(a) || a < 0 || a >= r || !Number.isFinite(o) || o < 0) return null;
	let s = t / n, c = s / (r + o / 100), l = c * r, u = c * si, d = c - u, f = e + s * (i + .5) - l / 2 + a * c + u / 2;
	return {
		boxX: f,
		boxWidth: d,
		centerX: f + d / 2
	};
}
//#endregion
//#region packages/core/src/canvas/clamp.ts
var _i = 32767, vi = 1 << 24;
function yi(e, t) {
	let n = Number.isFinite(e) && e > 0 ? Math.max(1, Math.round(e)) : 1, r = Number.isFinite(t) && t > 0 ? Math.max(1, Math.round(t)) : 1, i = Math.min(1, _i / n, _i / r), a = n * r, o = a > 16777216 ? Math.sqrt(vi / a) : 1, s = Math.min(i, o);
	return s >= 1 ? {
		width: n,
		height: r,
		scale: 1,
		clamped: !1
	} : {
		width: Math.max(1, Math.floor(n * s)),
		height: Math.max(1, Math.floor(r * s)),
		scale: s,
		clamped: !0
	};
}
//#endregion
//#region packages/core/src/shape/effects.ts
function bi(e, t) {
	return [t === "tl" || t === "l" || t === "bl" ? e.x : t === "tr" || t === "r" || t === "br" ? e.x + e.w : e.x + e.w / 2, t === "tl" || t === "t" || t === "tr" ? e.y : t === "l" || t === "ctr" || t === "r" ? e.y + e.h / 2 : e.y + e.h];
}
function xi(e, t) {
	return e * t;
}
function Si(e) {
	return e.getContext("2d") ?? null;
}
function Ci(e, t, n, r) {
	let i = Math.max(0, Math.floor(e.x - t)), a = Math.max(0, Math.floor(e.y - t)), o = Math.min(n, Math.ceil(e.x + e.w + t)), s = Math.min(r, Math.ceil(e.y + e.h + t));
	return {
		x: i,
		y: a,
		w: Math.max(1, o - i),
		h: Math.max(1, s - a)
	};
}
function wi(e, t) {
	if (t.x === 0 && t.y === 0) return e;
	let n = t.x, r = t.y;
	return new Proxy(e, {
		get(e, t) {
			if (t === "setTransform") return (t) => {
				e.setTransform(t.a, t.b, t.c, t.d, t.e - n, t.f - r);
			};
			let i = Reflect.get(e, t);
			return typeof i == "function" ? i.bind(e) : i;
		},
		set(e, t, n) {
			return e[t] = n, !0;
		}
	});
}
function Ti(e, t, n, r, i, a, o, s = 0, c) {
	let l = Math.max(0, xi(r.blur, i)), u = xi(r.dist, i), d = r.rotWithShape === !1 ? 0 : s, f = (r.dir + d) * Math.PI / 180, p = Math.cos(f) * u, m = Math.sin(f) * u, h = Ci(n, Math.ceil(l * 3 + Math.max(Math.abs(p), Math.abs(m))) + 2, a, o), g = Qt(h.w, h.h);
	if (!g) return !1;
	let _ = Si(g);
	if (!_) return !1;
	t(wi(_, h)), _.save(), _.setTransform(1, 0, 0, 1, 0, 0), _.globalCompositeOperation = "source-in", _.fillStyle = Y(r.color, r.alpha), _.fillRect(0, 0, h.w, h.h), _.restore(), e.save(), l > 0 && (e.filter = `blur(${l}px)`);
	let [v, y] = c ?? bi(n, r.algn ?? "b"), b = r.sx ?? 1, x = r.sy ?? 1, S = Math.tan((r.kx ?? 0) * Math.PI / 180), C = Math.tan((r.ky ?? 0) * Math.PI / 180);
	return e.translate(p, m), e.translate(v, y), d !== 0 && e.rotate(d * Math.PI / 180), e.transform(b, C, S, x, 0, 0), d !== 0 && e.rotate(-d * Math.PI / 180), e.translate(-v, -y), e.drawImage(g, h.x, h.y), e.restore(), !0;
}
function Ei(e, t, n, r, i, a, o) {
	let s = xi(r.blur, i), c = xi(r.dist, i), l = r.dir * Math.PI / 180, u = Math.cos(l) * c, d = Math.sin(l) * c, f = Ci(n, Math.ceil(3 * s + Math.abs(c)) + 2, a, o), p = Qt(f.w, f.h);
	if (!p) return;
	let m = Si(p);
	if (!m) return;
	let h = wi(m, f);
	h.save(), h.fillStyle = Y(r.color, r.alpha), t(h), h.restore(), h.save(), h.globalCompositeOperation = "destination-out", h.filter = s > 0 ? `blur(${s}px)` : "none", h.translate(u, d), h.fillStyle = "#000", t(h), h.restore(), h.save(), h.globalCompositeOperation = "destination-in", h.filter = "none", h.fillStyle = "#000", t(h), h.restore(), e.save(), e.drawImage(p, f.x, f.y), e.restore();
}
function Di(e, t, n, r, i, a, o, s) {
	let c = xi(r.radius, i);
	if (c <= 0) {
		t(e);
		return;
	}
	let l = Ci(n, Math.ceil(c) + 2, a, o), u = n.x - l.x, d = n.y - l.y, f = Qt(l.w, l.h);
	if (!f) {
		t(e);
		return;
	}
	let p = Si(f);
	if (!p) {
		t(e);
		return;
	}
	let m = wi(p, l), h = s ?? t;
	t(m);
	let g = Qt(l.w, l.h), _ = Qt(l.w, l.h), v = g ? Si(g) : null, y = _ ? Si(_) : null;
	if (g && v && _ && y) {
		let t = wi(v, l);
		t.fillStyle = "#000", h(t), y.drawImage(f, u, d, n.w, n.h, u - c, d - c, n.w + c * 2, n.h + c * 2), y.drawImage(f, 0, 0), y.globalCompositeOperation = "destination-in", y.filter = `blur(${c / 3}px)`, y.drawImage(g, 0, 0), y.filter = "none", y.globalCompositeOperation = "source-over", e.save(), e.drawImage(_, l.x, l.y), e.restore();
		return;
	}
	e.save(), e.drawImage(f, 0, 0), e.restore();
}
function Oi(e, t, n, r, i, a, o) {
	let s = Qt(a, o);
	if (!s) return;
	let c = Si(s);
	if (!c) return;
	let l = xi(r.blur, i);
	c.save(), l > 0 && (c.filter = `blur(${l}px)`), t(c), c.restore(), c.save(), c.globalCompositeOperation = "destination-in";
	let u = n.y, d = n.y + n.h, f = c.createLinearGradient(0, d, 0, u), p = ki(r.stPos), m = ki(r.endPos);
	f.addColorStop(0, `rgba(0,0,0,${r.stA})`), p > 0 && f.addColorStop(p, `rgba(0,0,0,${r.stA})`), m < 1 && m > p && f.addColorStop(m, `rgba(0,0,0,${r.endA})`), f.addColorStop(1, `rgba(0,0,0,${r.endA})`), c.fillStyle = f, c.fillRect(0, 0, a, o), c.restore();
	let h = xi(r.dist, i), g = r.dir * Math.PI / 180, _ = Math.cos(g) * h, v = Math.sin(g) * h;
	e.save(), e.translate(n.x + _, d + v), e.scale(r.sx, r.sy), e.translate(-n.x, -d), e.drawImage(s, 0, 0), e.restore();
}
function ki(e) {
	return e < 0 ? 0 : e > 1 ? 1 : e;
}
//#endregion
//#region packages/core/src/chart/style-effects.ts
var Ai = 12700, ji = vi, Mi = /* @__PURE__ */ new WeakMap();
function Ni(e, t, n = ji, r = 1) {
	let i = Mi.get(e), a = Number.isSafeInteger(r) && r > 0 ? r : 1;
	Mi.set(e, { perConsumerMaximum: Math.floor(Math.max(0, n) / a) });
	try {
		return t();
	} finally {
		i ? Mi.set(e, i) : Mi.delete(e);
	}
}
function Pi(e) {
	return e?.effectAuthored === !0 || e?.effectUnsupported === !0 || e?.effectNoStyle === !0 || e?.shadows != null || e?.innerShadows != null || e?.glows != null || e?.softEdges != null || e?.reflections != null;
}
function X(...e) {
	return e.find(Pi) ?? void 0;
}
function Fi(e, t) {
	if (e?.length) return e[t % e.length] ?? void 0;
}
function Ii(e, t, n, r = n) {
	let i = Pi(e), a = i ? e : t;
	if (!a || a.effectNoStyle === !0 || a.effectUnsupported === !0) return;
	let o = i ? n : r, s = a.effectFormattingIndices ? ie(a.effectFormattingIndices, o) : -1, c = a.effectColorIndex ?? (s >= 0 ? s : o), l = {
		shadow: Fi(a.shadows, c),
		innerShadow: Fi(a.innerShadows, c),
		glow: Fi(a.glows, c),
		softEdge: Fi(a.softEdges, c),
		reflection: Fi(a.reflections, c)
	};
	return Object.values(l).some(Boolean) ? l : void 0;
}
function Li(e) {
	if (typeof e.getTransform == "function") {
		let t = e.getTransform();
		if ([
			t.a,
			t.b,
			t.c,
			t.d,
			t.e,
			t.f
		].every(Number.isFinite)) return t;
	}
	return {
		a: 1,
		b: 0,
		c: 0,
		d: 1,
		e: 0,
		f: 0
	};
}
function Ri(e, t, n) {
	return [e.a * t + e.c * n + e.e, e.b * t + e.d * n + e.f];
}
function zi(e, t) {
	let n = [
		Ri(e, t.x, t.y),
		Ri(e, t.x + t.w, t.y),
		Ri(e, t.x, t.y + t.h),
		Ri(e, t.x + t.w, t.y + t.h)
	], r = n.map((e) => e[0]), i = n.map((e) => e[1]), a = Math.min(...r), o = Math.max(...r), s = Math.min(...i), c = Math.max(...i);
	return {
		x: a,
		y: s,
		w: o - a,
		h: c - s
	};
}
function Bi(e, t, n) {
	let r = Math.max(1, Math.ceil(e.w + t * 2)) * Math.max(1, Math.ceil(e.h + t * 2)) * n;
	return Number.isSafeInteger(r) ? r : Infinity;
}
function Vi(e, t, n, r, i) {
	let a = e.softEdge ? Math.ceil(e.softEdge.radius * 3 * n) + 2 : 0, o = e.innerShadow ? Math.ceil((e.innerShadow.blur * 3 + Math.abs(e.innerShadow.dist)) * n) + 2 : 0, s = e.shadow ? Math.ceil((e.shadow.blur * 3 + Math.abs(e.shadow.dist)) * n) + 2 : 0;
	return (e.reflection ? r * i : 0) + (e.shadow ? Bi(t, s, 1) : 0) + (e.softEdge ? Bi(t, a, 2) : 0) + (e.innerShadow ? Bi(t, o, 2) : 0);
}
function Hi(e, t, n) {
	let r = t.dir * Math.PI / 180, i = t.dist / Ai * n;
	e.shadowColor = Y(t.color, t.alpha), e.shadowBlur = Math.max(0, t.blur / Ai * n), e.shadowOffsetX = Math.cos(r) * i, e.shadowOffsetY = Math.sin(r) * i;
}
function Ui(e, t, n) {
	e.shadowColor = Y(t.color, t.alpha), e.shadowBlur = Math.max(0, t.radius / Ai * n), e.shadowOffsetX = 0, e.shadowOffsetY = 0;
}
function Wi(e, t, n, r, i, a, o = r) {
	let s = Ii(t, n, r, o), c = s?.shadow ?? s?.glow;
	c && (e.save(), e.globalCompositeOperation = "destination-over", "radius" in c ? Ui(e, c, i) : Hi(e, c, i), a(e), e.restore());
}
function Gi(e) {
	let t = e.canvas;
	return [t?.width ?? 0, t?.height ?? 0];
}
function Ki(e, t, n, r, i, a, o, s = r) {
	let c = Ii(t, n, r, s);
	if (!c) {
		o(e);
		return;
	}
	let l = Li(e), u = zi(l, i), d = Math.max(Math.hypot(l.a, l.b), Math.hypot(l.c, l.d)), f = Math.max(0, a * d / Ai), [p, m] = Gi(e), h = p > 0 && m > 0, g = (t) => {
		ni(e, t, () => {
			t.setTransform(l), o(t);
		});
	}, _ = () => e.setTransform(1, 0, 0, 1, 0, 0), v = Vi(c, u, f, p, m), y = Mi.get(e), b = h && Number.isSafeInteger(v) && v <= (y?.perConsumerMaximum ?? 0), x = !1;
	b && c.shadow && (e.save(), _(), x = Ti(e, g, u, c.shadow, f, p, m, Math.atan2(l.b, l.a) * 180 / Math.PI), e.restore());
	let S = x ? c.glow : c.shadow ?? c.glow;
	b && c.reflection && (e.save(), _(), Oi(e, g, u, c.reflection, f, p, m), e.restore());
	let C = !1;
	!S && b && c.softEdge && (e.save(), _(), Di(e, g, u, c.softEdge, f, p, m), e.restore(), C = !0), C || (e.save(), S && ("radius" in S ? Ui(e, S, a) : Hi(e, S, a)), o(e), e.restore()), b && c.innerShadow && (e.save(), _(), Ei(e, g, u, c.innerShadow, f, p, m), e.restore());
}
function qi(e) {
	if (e.length > 1e4) return !0;
	let t = 0;
	for (let n of e) {
		if (n.path.length > 512 || t > 1e4 - n.path.length) return !0;
		t += n.path.length;
	}
	return !1;
}
function Ji(e, t = !1) {
	let n = {
		label: "",
		layoutWeight: 0,
		value: 0,
		depth: -1,
		children: [],
		branchIndex: -1,
		labelIndex: -1,
		a0: 0,
		a1: 0
	}, r = e.reduce((e, t) => Number.isFinite(t.size) && t.size > e ? t.size : e, 0), i = (e, t) => e > Number.MAX_VALUE - t ? Number.MAX_VALUE : e + t, a = /* @__PURE__ */ new WeakMap();
	for (let o of e) {
		let e = Number.isFinite(o.size) && o.size > 0 ? o.size : 0, s = r > 0 ? e / r : 0, c = n;
		for (let n = 0; n < o.path.length; n++) {
			let r = o.path[n], l = a.get(c);
			l || (l = /* @__PURE__ */ new Map(), a.set(c, l));
			let u = t && n === o.path.length - 1, d = u ? void 0 : l.get(r);
			d || (d = {
				label: r,
				layoutWeight: 0,
				value: 0,
				depth: n,
				children: [],
				branchIndex: n === 0 ? c.children.length : c.branchIndex,
				labelIndex: -1,
				a0: 0,
				a1: 0
			}, c.children.push(d), u || l.set(r, d)), d.layoutWeight += s, d.value = i(d.value, e), c = d;
		}
	}
	n.layoutWeight = n.children.reduce((e, t) => e + t.layoutWeight, 0), n.value = n.children.reduce((e, t) => i(e, t.value), 0);
	let o = 0, s = [...n.children].reverse();
	for (; s.length > 0;) {
		let e = s.pop();
		e.labelIndex = o++;
		for (let t = e.children.length - 1; t >= 0; t--) s.push(e.children[t]);
	}
	return n;
}
function Yi(e) {
	let t = [e];
	for (; t.length > 0;) {
		let e = t.pop(), n = 0;
		for (let t of e.children) n += t.layoutWeight;
		if (n <= 0) continue;
		let r = e.a0;
		for (let i of e.children) {
			let a = (e.a1 - e.a0) * i.layoutWeight / n;
			i.a0 = r, i.a1 = r + a, r = i.a1, t.push(i);
		}
	}
}
function Xi(e) {
	let t = e.depth, n = [e];
	for (; n.length > 0;) {
		let e = n.pop();
		t = Math.max(t, e.depth);
		for (let t = e.children.length - 1; t >= 0; t--) n.push(e.children[t]);
	}
	return t;
}
//#endregion
//#region packages/core/src/excel-date.ts
var Zi = 864e5, Qi = Date.UTC(1899, 11, 30), $i = Date.UTC(1904, 0, 1);
function ea(e, t = !1) {
	return Number.isFinite(e) && e >= 0 && e < (t ? 2957004 : 2958466);
}
function ta(e, t, n, r) {
	let i = e + Math.round(t * Zi);
	return ea(n, r) ? Math.min(i, Date.UTC(1e4, 0, 1) - 1) : i;
}
function na(e, t = !1) {
	if (t) return new Date(ta($i, e, e, t));
	let n = e < 60 ? e + 1 : e;
	return new Date(ta(Qi, n, e, t));
}
function ra(e, t = !1) {
	if (t) return (e.getTime() - $i) / Zi;
	let n = (e.getTime() - Qi) / Zi;
	return n <= 60 ? n - 1 : n;
}
//#endregion
//#region packages/core/src/excel-number-format.ts
function ia(e) {
	if (e.length >= 4) return 3;
	let t = e[e.length - 1], n = 0;
	for (; n < t.length;) {
		let r = t[n];
		if (r === "\\" || r === "_" || r === "*") n += 2;
		else if (r === "\"") {
			let e = t.indexOf("\"", n + 1);
			n = e < 0 ? t.length : e + 1;
		} else if (r === "[") {
			let e = t.indexOf("]", n);
			n = e < 0 ? t.length : e + 1;
		} else if (r === "@") return e.length - 1;
		else n++;
	}
	return -1;
}
function aa(e) {
	let t = [], n = "", r = 0;
	for (; r < e.length;) {
		let i = e[r];
		if (i === "\"") {
			for (n += i, r++; r < e.length && e[r] !== "\"";) n += e[r++];
			r < e.length && (n += e[r++]);
		} else if (i === "\\" || i === "_" || i === "*") n += i, r + 1 < e.length && (n += e[r + 1]), r += 2;
		else if (i === "[") {
			for (n += i, r++; r < e.length && e[r] !== "]";) n += e[r++];
			r < e.length && (n += e[r++]);
		} else i === ";" ? (t.push(n), n = "", r++) : (n += i, r++);
	}
	return t.push(n), t;
}
var oa = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
], sa = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
], ca = [
	"日",
	"月",
	"火",
	"水",
	"木",
	"金",
	"土"
], la = [
	"日曜日",
	"月曜日",
	"火曜日",
	"水曜日",
	"木曜日",
	"金曜日",
	"土曜日"
], ua = [
	{
		start: new Date(Date.UTC(2019, 4, 1)),
		abbr: "R",
		short: "令",
		long: "令和"
	},
	{
		start: new Date(Date.UTC(1989, 0, 8)),
		abbr: "H",
		short: "平",
		long: "平成"
	},
	{
		start: new Date(Date.UTC(1926, 11, 25)),
		abbr: "S",
		short: "昭",
		long: "昭和"
	},
	{
		start: new Date(Date.UTC(1912, 6, 30)),
		abbr: "T",
		short: "大",
		long: "大正"
	},
	{
		start: new Date(Date.UTC(1868, 0, 25)),
		abbr: "M",
		short: "明",
		long: "明治"
	}
];
function da(e) {
	for (let t of ua) if (e.getTime() >= t.start.getTime()) return {
		abbr: t.abbr,
		short: t.short,
		long: t.long,
		year: e.getUTCFullYear() - t.start.getUTCFullYear() + 1
	};
	let t = ua[ua.length - 1];
	return {
		abbr: t.abbr,
		short: t.short,
		long: t.long,
		year: e.getUTCFullYear()
	};
}
function fa(e, t, n = !1) {
	let r = ga(t), i = ma(t), a = ea(e, n);
	if (!Number.isFinite(e) || !Number.isFinite(e * 864e5) || !r && !a) return "#";
	let o = 10 ** (3 - (i || 3)), s = Math.round(Math.abs(e) * 864e5 / o) * o, c = (e < 0 ? -s : s) / 864e5, l = na(i && (!a || ea(c, n)) ? c : e, n), u = l.getUTCFullYear(), d = l.getUTCMonth() + 1, f = l.getUTCDate(), p = l.getUTCDay(), m = r ? Math.floor(s / 36e5) % 24 : l.getUTCHours(), h = r ? Math.floor(s / 6e4) % 60 : l.getUTCMinutes(), g = r ? Math.floor(s / 1e3) % 60 : l.getUTCSeconds(), _ = ha(t), v = pa(t), y = null, b = () => y ??= da(l), x = "", S = 0, C = !1;
	for (; S < t.length;) {
		let n = t[S];
		if (n === "\"") {
			for (S++; S < t.length && t[S] !== "\"";) x += t[S++];
			S < t.length && S++, C = !1;
		} else if (n === "[") {
			let n = t.indexOf("]", S), r = n > S ? t.slice(S + 1, n) : "", i = r.match(/^([hms])\1*$/i);
			if (i) {
				let a = i[1].toLowerCase(), o = e < 0 ? "-" : "", c = Math.floor(s / 1e3), l;
				l = a === "h" ? Math.floor(c / 3600) : a === "m" ? Math.floor(c / 60) : c;
				let u = r.length >= 2 ? String(l).padStart(r.length, "0") : String(l);
				x += o + u, S = n + 1;
				let d = a === "s" ? /^\.(0{1,3})(?!0)/.exec(t.slice(S)) : null;
				if (d) {
					let e = d[1].length;
					x += "." + String(Math.floor(s % 1e3 / 10 ** (3 - e))).padStart(e, "0"), S += d[0].length;
				}
				C = a === "h";
			} else {
				for (; S < t.length && t[S] !== "]";) S++;
				S < t.length && S++;
			}
		} else if (n === "_") S += 2;
		else if (n === "*") S += 2;
		else if (n === "\\") {
			let e = t[S + 1];
			e !== void 0 && (x += e), S += 2, e !== ":" && e !== "/" && e !== "-" && e !== "." && e !== " " && (C = !1);
		} else if (n === "y" || n === "Y") {
			if (!a) return "#";
			let e = 0;
			for (; S < t.length && t[S].toLowerCase() === "y";) e++, S++;
			x += e <= 2 ? String(u).slice(-2) : String(u).padStart(4, "0"), C = !1;
		} else if (n === "m" || n === "M") {
			let e = 0;
			for (; S < t.length && t[S].toLowerCase() === "m";) e++, S++;
			let n = t.slice(S).replace(/\[[^\]]*\]/g, "");
			if (C || /^:s/i.test(n)) x += e >= 2 ? String(h).padStart(2, "0") : String(h);
			else {
				if (!a) return "#";
				e === 1 ? x += String(d) : e === 2 ? x += String(d).padStart(2, "0") : e === 3 ? x += oa[d - 1].slice(0, 3) : e === 4 ? x += oa[d - 1] : x += oa[d - 1][0];
			}
			C = !1;
		} else if (n === "d" || n === "D") {
			if (!a) return "#";
			let e = 0;
			for (; S < t.length && t[S].toLowerCase() === "d";) e++, S++;
			e === 1 ? x += String(f) : e === 2 ? x += String(f).padStart(2, "0") : e === 3 ? x += sa[p].slice(0, 3) : x += sa[p], C = !1;
		} else if (n === "h" || n === "H") {
			let e = 0;
			for (; S < t.length && t[S].toLowerCase() === "h";) e++, S++;
			let n = _ ? m % 12 || 12 : m;
			x += e >= 2 ? String(n).padStart(2, "0") : String(n), C = !0;
		} else if (n === "s" || n === "S") {
			let e = 0;
			for (; S < t.length && t[S].toLowerCase() === "s";) e++, S++;
			x += e >= 2 ? String(g).padStart(2, "0") : String(g);
			let n = /^\.(0{1,3})(?!0)/.exec(t.slice(S));
			if (n) {
				let e = n[1].length, t = r ? s % 1e3 : l.getUTCMilliseconds();
				x += "." + String(Math.floor(t / 10 ** (3 - e))).padStart(e, "0"), S += n[0].length;
			}
			C = !1;
		} else if (n === "g" || n === "G") {
			let e = 0;
			for (; S < t.length && t[S].toLowerCase() === "g";) e++, S++;
			if (v) {
				if (!a) return "#";
				let t = b();
				e === 1 ? x += t.abbr : e === 2 ? x += t.short : x += t.long;
			}
			C = !1;
		} else if (n === "e" || n === "E") {
			if (!a) return "#";
			let e = 0;
			for (; S < t.length && t[S].toLowerCase() === "e";) e++, S++;
			if (v) {
				let t = b().year;
				x += e >= 2 ? String(t).padStart(2, "0") : String(t);
			} else x += String(u).padStart(4, "0");
			C = !1;
		} else if (n === "r" || n === "R") {
			if (!a) return "#";
			let e = 0;
			for (; S < t.length && t[S].toLowerCase() === "r";) e++, S++;
			if (v) {
				let t = b();
				x += (e >= 2 ? t.long : "") + String(t.year).padStart(2, "0");
			} else x += String(u).padStart(4, "0");
			C = !1;
		} else if (n === "A" || n === "a") {
			let e = t.slice(S).toUpperCase();
			if (e.startsWith("AAAA")) {
				if (!a) return "#";
				x += la[p], S += 4;
			} else if (e.startsWith("AAA")) {
				if (!a) return "#";
				x += ca[p], S += 3;
			} else e.startsWith("AM/PM") ? (x += m < 12 ? "AM" : "PM", S += 5) : e.startsWith("A/P") ? (x += m < 12 ? "A" : "P", S += 3) : (x += n, S++);
			C = !1;
		} else x += n, S++, n !== ":" && n !== "/" && n !== "-" && n !== "." && n !== " " && (C = !1);
	}
	return x;
}
function pa(e) {
	let t = 0;
	for (; t < e.length;) {
		let n = e[t];
		if (n === "\\" || n === "_" || n === "*") t += 2;
		else if (n === "\"") {
			let n = e.indexOf("\"", t + 1);
			t = n < 0 ? e.length : n + 1;
		} else if (n === "[") {
			let n = e.indexOf("]", t);
			if (n < 0) break;
			let r = /^\$[^-]*-([0-9a-f]+)$/i.exec(e.slice(t + 1, n));
			if (r && (parseInt(r[1], 16) & 65535) == 1041) return !0;
			t = n + 1;
		} else t++;
	}
	return !1;
}
function ma(e) {
	let t = 0;
	for (let n = 0; n < e.length;) {
		let r = e[n];
		if (r === "\\" || r === "_" || r === "*") n += 2;
		else if (r === "[") {
			let r = /^\[s+\]\.(0{1,3})(?!0)/i.exec(e.slice(n));
			r && (t = Math.max(t, r[1].length));
			let i = e.indexOf("]", n + 1);
			n = r ? n + r[0].length : i < 0 ? e.length : i + 1;
		} else if (r === "\"") {
			let t = e.indexOf("\"", n + 1);
			n = t < 0 ? e.length : t + 1;
		} else if (r === "s" || r === "S") {
			let r = /^s+\.(0{1,3})(?!0)/i.exec(e.slice(n));
			if (r) t = Math.max(t, r[1].length), n += r[0].length;
			else for (; n < e.length && e[n].toLowerCase() === "s";) n++;
		} else n++;
	}
	return t;
}
function ha(e) {
	let t = 0;
	for (; t < e.length;) {
		let n = e[t];
		if (n === "\\" || n === "_" || n === "*") t += 2;
		else if (n === "\"") {
			let n = e.indexOf("\"", t + 1);
			t = n < 0 ? e.length : n + 1;
		} else if (n === "[") {
			let n = e.indexOf("]", t);
			t = n < 0 ? e.length : n + 1;
		} else if (/^(am\/pm|a\/p)/i.test(e.slice(t))) return !0;
		else t++;
	}
	return !1;
}
function ga(e) {
	let t = 0;
	for (; t < e.length;) {
		let n = e[t];
		if (n === "\\" || n === "_" || n === "*") t += 2;
		else if (n === "\"") {
			let n = e.indexOf("\"", t + 1);
			t = n < 0 ? e.length : n + 1;
		} else if (n === "[") {
			let n = e.indexOf("]", t);
			if (n < 0) return !1;
			if (/^([hms])\1*$/i.test(e.slice(t + 1, n))) return !0;
			t = n + 1;
		} else t++;
	}
	return !1;
}
function _a(e) {
	let t = 0, n = !1;
	for (; t < e.length;) {
		let r = e[t];
		if (r === "\\" || r === "_" || r === "*") t += 2;
		else if (r === "\"") {
			let n = e.indexOf("\"", t + 1);
			t = n < 0 ? e.length : n + 1;
		} else if (r === "[") {
			let n = e.indexOf("]", t);
			if (n < 0) return !1;
			if (/^([hms])\1*$/i.test(e.slice(t + 1, n))) return !0;
			t = n + 1;
		} else if (/^general/i.test(e.slice(t))) t += 7;
		else if (/[ymdhsgr]/i.test(r)) return !0;
		else if (r === "e" || r === "E") {
			if (!n && !/[-+0#?]/.test(e[t + 1] ?? "")) return !0;
			t++;
		} else if (r === "0" || r === "#" || r === "?") n = !0, t++;
		else if (/^(am\/pm|a\/p|a{3,})/i.test(e.slice(t))) return !0;
		else t++;
	}
	return !1;
}
//#endregion
//#region packages/core/src/text/round-decimal.ts
function va(e, t) {
	if (!Number.isFinite(e)) return String(e);
	let n = Math.max(0, Math.trunc(t)), r = e < 0, [i, a = ""] = ya(Math.abs(e).toString()).split("."), o = a.padEnd(n + 1, "0"), s = o.slice(0, n), c = o.charCodeAt(n) - 48, l = (i + s).split("").map((e) => e.charCodeAt(0) - 48);
	if (c >= 5) {
		let e = l.length - 1;
		for (; e >= 0; e--) if (l[e] === 9) l[e] = 0;
		else {
			l[e] += 1;
			break;
		}
		e < 0 && l.unshift(1);
	}
	let u = l.map((e) => String(e)).join(""), d = n, f = (d > 0 ? u.slice(0, u.length - d) : u) || "0", p = d > 0 ? u.slice(u.length - d) : "", m = f.replace(/^0+(?=\d)/, ""), h = p.length > 0 ? `${m}.${p}` : m, g = /^[0.]*$/.test(h) && !/[1-9]/.test(h);
	return r && !g ? `-${h}` : h;
}
function ya(e) {
	let t = /^(\d+)(?:\.(\d+))?[eE]([+-]?\d+)$/.exec(e);
	if (!t) return e;
	let [, n, r = "", i] = t, a = parseInt(i, 10), o = n + r, s = n.length + a;
	return s <= 0 ? "0." + "0".repeat(-s) + o : s >= o.length ? o + "0".repeat(s - o.length) : o.slice(0, s) + "." + o.slice(s);
}
//#endregion
//#region packages/core/src/chart/chart-number-format.ts
var ba = /* @__PURE__ */ new Map();
function xa(e, t = !1, n = typeof navigator > "u" ? void 0 : navigator.language) {
	if (!ea(e, t)) return "#";
	let r = n ?? "", i = ba.get(r);
	return i || (i = new Intl.DateTimeFormat(n, {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		timeZone: "UTC"
	}), ba.set(r, i)), i.format(na(e, t));
}
function Sa(e) {
	return Number.isInteger(e) ? String(e) : va(e, 6).replace(/\.?0+$/, "");
}
function Ca(e, t, n = !1) {
	if (!t || t.trim().toLowerCase() === "general") return Sa(e);
	let r = aa(t), i = ia(r), a = r.filter((e, t) => t !== i);
	if (a.length === 0) return Sa(e);
	let o;
	if (o = e > 0 ? a[0] : e < 0 ? a[1] ?? a[0] : a[2] ?? a[0], o === "") return "";
	let s = e < 0 && a.length >= 2;
	return _a(o) ? fa(s ? -e : e, o, n) : (e < 0 && !s ? "-" : "") + Ta(Math.abs(e), o);
}
function wa(e, t, n = !1) {
	if (!t || e.trim() === "") return e;
	let r = Number(e);
	return Number.isFinite(r) ? Ca(r, t, n) : e;
}
function Ta(e, t) {
	let n = [], r = 0, i = !1, a = !1;
	for (; r < t.length;) {
		let e = t[r];
		if (e === "\"") {
			r++;
			let e = "";
			for (; r < t.length && t[r] !== "\"";) e += t[r], r++;
			r < t.length && r++, n.push({
				kind: "lit",
				text: e
			});
			continue;
		}
		if (e === "\\" && r + 1 < t.length) {
			n.push({
				kind: "lit",
				text: t[r + 1]
			}), r += 2;
			continue;
		}
		if (e === "_" && r + 1 < t.length) {
			n.push({
				kind: "lit",
				text: " "
			}), r += 2;
			continue;
		}
		if (e === "*" && r + 1 < t.length) {
			r += 2;
			continue;
		}
		if (e === "[") {
			for (r++; r < t.length && t[r] !== "]";) r++;
			r < t.length && r++;
			continue;
		}
		if (e === "%") {
			a = !0, n.push({
				kind: "lit",
				text: "%"
			}), r++;
			continue;
		}
		if (e === "#" || e === "0" || e === "." || e === "," || e === "?") {
			let e = "";
			for (; r < t.length && (t[r] === "#" || t[r] === "0" || t[r] === "." || t[r] === "," || t[r] === "?");) e += t[r], r++;
			n.push({
				kind: "num",
				text: e
			}), i = !0;
			continue;
		}
		n.push({
			kind: "lit",
			text: e
		}), r++;
	}
	if (!i) return n.map((e) => e.text).join("");
	let o = a ? e * 100 : e, s = "";
	for (let e of n) e.kind === "num" && (s += e.text);
	let c = Ea(o, s), l = !1;
	return n.map((e) => e.kind === "lit" ? e.text : l ? "" : (l = !0, c)).join("");
}
function Ea(e, t) {
	let n = t.indexOf("."), r = n >= 0 ? t.slice(0, n) : t, i = n >= 0 ? t.slice(n + 1) : "", a = /,/.test(r), o = (i.match(/[#0?]/g) ?? []).length, s = (r.replace(/,/g, "").match(/0/g) ?? []).length, [c, l = ""] = va(e, o).split("."), u = c.padStart(s, "0"), d = a ? u.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : u;
	return o === 0 ? d : `${d}.${l.padEnd(o, "0")}`;
}
//#endregion
//#region packages/core/src/chart/data-label-content.ts
function Da(e) {
	if (e.customText) return e.customText;
	let t = [];
	if (e.showCategory && e.category && t.push(e.category), e.showSeries && e.seriesName && t.push(e.seriesName), e.showValue && e.sourceValue != null) {
		let n = e.valueDivisor != null && Number.isFinite(e.valueDivisor) && e.valueDivisor > 0 ? e.valueDivisor : 1;
		t.push(Ca(e.sourceValue / n, e.formatCode ?? null, e.date1904));
	}
	return e.showPercent && e.percentRatio != null && t.push(Ca(e.percentRatio, e.percentFormatCode ?? e.formatCode ?? "0%", e.date1904)), e.showBubbleSize && e.bubbleSize != null && t.push(Ca(e.bubbleSize, e.formatCode ?? null, e.date1904)), t.filter((e) => e !== "").join(e.separator ?? e.defaultSeparator ?? " ");
}
//#endregion
//#region packages/core/src/chart/image-fill-context.ts
var Oa;
function ka(e, t) {
	let n = Oa;
	Oa = e;
	try {
		return t();
	} finally {
		Oa = n;
	}
}
function Aa(e, t, n, r, i, a, o, s = 0) {
	return Oa?.(e, t, n, r, i, a, o, s) ?? !1;
}
//#endregion
//#region packages/core/src/chart/label-box.ts
function ja(e, t, n, r, i = 0, a = i) {
	if (!t || !e && !r) return e ?? void 0;
	let o = e ?? {}, s = t.fillNoStyle !== !0 && (t.fillPaintAuthored === !0 || t.fillHidden === !0 || t.fillPaints != null || t.fillColors != null), c = o.fillHidden === !0 ? W(n) : void 0, l = H(o.style, n, i), u = o.fillPaint != null || o.fill != null || l !== void 0 || o.fillHidden === !0 && c !== void 0 || o.fillPaintAuthored === !0 && o.fillHidden !== !0, d = c === void 0 ? o.fillPaint ?? (o.fill ? {
		fillType: "solid",
		color: o.fill
	} : l === void 0 ? o.fillPaintAuthored === !0 && o.fillHidden !== !0 ? null : B(t, a) : l) : c;
	return {
		fill: d?.fillType === "solid" ? d.color : void 0,
		fillPaint: d != null && d.fillType !== "solid" ? d : void 0,
		fillHidden: d === null ? !0 : void 0,
		fillPaintAuthored: u || s ? !0 : o.fillPaintAuthored
	};
}
function Ma(e) {
	if (!e) return !1;
	let t = e.fillHidden !== !0 && (e.fillPaint == null ? e.fill != null && Gr({
		fillType: "solid",
		color: e.fill
	}) : Gr(e.fillPaint)), n = e.borderHidden !== !0 && (e.borderFill == null ? e.borderColor != null && Gr({
		fillType: "solid",
		color: e.borderColor
	}) : Gr(e.borderFill));
	return t || n;
}
function Na(e, t) {
	if (!e) return t ?? void 0;
	if (!t) return e;
	let n = e.fillPaintAuthored === !0 || e.fill != null || e.fillPaint != null || e.fillHidden === !0, r = e.borderPaintAuthored === !0 || e.borderColor != null || e.borderFill != null || e.borderHidden === !0, i = e.borderDashAuthored === !0 || e.borderDash != null || e.borderCustomDash != null;
	return {
		...t,
		...e,
		fill: n ? e.fill : t.fill,
		fillPaint: n ? e.fillPaint : t.fillPaint,
		fillHidden: n ? e.fillHidden : t.fillHidden,
		fillPaintAuthored: n ? e.fillPaintAuthored : t.fillPaintAuthored,
		borderColor: r ? e.borderColor : t.borderColor,
		borderFill: r ? e.borderFill : t.borderFill,
		borderHidden: r ? e.borderHidden : t.borderHidden,
		borderPaintAuthored: r ? e.borderPaintAuthored : t.borderPaintAuthored,
		borderWidthEmu: e.borderWidthEmu ?? t.borderWidthEmu,
		borderDash: i ? e.borderDash : t.borderDash,
		borderCustomDash: i ? e.borderCustomDash : t.borderCustomDash,
		borderDashAuthored: i ? e.borderDashAuthored : t.borderDashAuthored,
		borderCap: e.borderCap ?? t.borderCap,
		borderJoin: e.borderJoin ?? t.borderJoin,
		borderCompound: e.borderCompound ?? t.borderCompound,
		style: X(e.style, t.style),
		effectFallbackStyle: e.effectFallbackStyle ?? t.effectFallbackStyle,
		effectStyleIndex: e.effectStyleIndex ?? t.effectStyleIndex,
		effectFallbackIndex: e.effectFallbackIndex ?? t.effectFallbackIndex
	};
}
function Pa(e, t, r, i, a = 0) {
	t && Ki(e, t.style, t.effectFallbackStyle, t.effectStyleIndex ?? 0, r, i, (e) => {
		if (t.fillHidden !== !0) {
			let n = t.fillPaint?.fillType === "image" && Aa(e, t.fillPaint, r.x, r.y, r.w, r.h, i, a) ? null : t.fillPaint ? Xr(t.fillPaint, e, r.x, r.y, r.w, r.h, a) : t.fill ? `#${t.fill}` : null;
			n && (e.fillStyle = n, e.fillRect(r.x, r.y, r.w, r.h));
		}
		if (t.borderHidden === !0) return;
		let o = t.borderFill ? Xr(t.borderFill, e, r.x, r.y, r.w, r.h, a) : t.borderColor ? `#${t.borderColor}` : null;
		o && (e.save(), e.strokeStyle = o, e.lineWidth = t.borderWidthEmu == null ? Math.max(.25, .75 * i) : Math.max(.25, t.borderWidthEmu / n * i), e.setLineDash(sr(t.borderCustomDash, t.borderDash, e.lineWidth)), t.borderCap === "rnd" ? e.lineCap = "round" : t.borderCap === "sq" ? e.lineCap = "square" : t.borderCap === "flat" && (e.lineCap = "butt"), t.borderJoin === "round" ? e.lineJoin = "round" : t.borderJoin === "bevel" ? e.lineJoin = "bevel" : t.borderJoin === "miter" && (e.lineJoin = "miter"), e.strokeRect(r.x, r.y, r.w, r.h), e.restore());
	}, t.effectFallbackIndex ?? t.effectStyleIndex ?? 0);
}
//#endregion
//#region packages/core/src/chart/chart-ex-label.ts
function Fa(e) {
	let t = e?.divisor;
	return t != null && Number.isFinite(t) && t > 0 ? t : 1;
}
function Ia(e, t, n, r, i, a, o, s, c) {
	if (!t) return null;
	let l = t.seriesDataLabels, u = o.get(n);
	if (lt(l, u) || !l && !u && !a.visible) return null;
	let d = typeof s == "boolean" ? s : !1, f = typeof s == "number" ? s : void 0, p = !d && (u?.showVal ?? l?.showVal ?? a.showVal), m = u?.showCatName ?? l?.showCatName ?? a.showCatName, h = u?.showSerName ?? l?.showSerName ?? a.showSerName ?? !1, g = u?.showPercent ?? l?.showPercent ?? a.showPercent ?? !1, _ = u?.showLegendKey ?? l?.showLegendKey ?? !1, v = u?.formatCode ?? l?.formatCode ?? e.dataLabelFormatCode ?? null, y = Da({
		customText: u?.text,
		showCategory: m,
		showSeries: h,
		showValue: p,
		showPercent: g,
		category: r,
		seriesName: t.name,
		sourceValue: i,
		valueDivisor: Fa(c),
		percentRatio: f,
		formatCode: v ?? t.valFormatCode ?? null,
		percentFormatCode: v ?? "0%",
		date1904: e.date1904,
		separator: u?.separator ?? l?.separator
	});
	return !y && !_ ? null : {
		text: y,
		showLegendKey: _,
		position: u?.position ?? l?.position,
		fontColor: u?.fontColor ?? l?.fontColor,
		fontSizeHpt: u?.fontSizeHpt ?? l?.fontSizeHpt,
		fontBold: u?.fontBold ?? l?.fontBold,
		fontFace: u?.fontFace ?? l?.fontFace,
		manualLayout: u?.manualLayout,
		labelBox: Na(u?.labelBox, l?.labelBox),
		richRuns: u?.text ? u.richRuns : void 0,
		textStyle: ut(u, l)
	};
}
//#endregion
//#region packages/core/src/chart/chart-ex-hierarchy-labels.ts
function La(e, t) {
	let n = e.chartexSunburst ? {
		rows: e.chartexSunburst.rows,
		kind: "sunburst"
	} : e.chartexTreemap ? {
		rows: e.chartexTreemap.rows,
		kind: "treemap"
	} : void 0;
	if (!n) return "not-hierarchy";
	if (n.rows.length === 0) return "ok";
	if (qi(n.rows)) return "too-large";
	let r = Ji(n.rows, n.kind === "treemap");
	if (r.layoutWeight <= 0 || r.children.length === 0) return "ok";
	n.kind === "sunburst" && (r.a0 = -Math.PI / 2, r.a1 = r.a0 + Math.PI * 2, Yi(r));
	let i = e.chartexTreemap?.parentLabelLayout ?? "overlapping", a = e.series[0], o = new Map((a?.dataLabelOverrides ?? []).map((e) => [e.idx, e])), s = [...r.children];
	for (; s.length > 0;) {
		let r = s.pop();
		for (let e of r.children) s.push(e);
		if (r.layoutWeight <= 0 || n.kind === "sunburst" && r.a1 - r.a0 <= 1e-4) continue;
		let c = n.kind === "treemap" && r.children.length > 0 && i === "banner" ? Ia(e, a, r.labelIndex, r.label, r.value, {
			visible: !0,
			showVal: !1,
			showCatName: !0
		}, o, !0) : null;
		t({
			node: r,
			kind: n.kind,
			paintsBody: n.kind === "sunburst" || r.children.length === 0 || c != null
		});
	}
	return "ok";
}
function Ra(e, t) {
	let n = e.chartexSunburst ? {
		rows: e.chartexSunburst.rows,
		kind: "sunburst"
	} : e.chartexTreemap ? {
		rows: e.chartexTreemap.rows,
		kind: "treemap"
	} : void 0;
	if (!n) return "not-hierarchy";
	if (n.rows.length === 0) return "ok";
	if (qi(n.rows)) return "too-large";
	let r = Ji(n.rows, n.kind === "treemap");
	if (r.layoutWeight <= 0 || r.children.length === 0) return "ok";
	n.kind === "sunburst" && (r.a0 = -Math.PI / 2, r.a1 = r.a0 + Math.PI * 2, Yi(r));
	let i = e.series[0], a = new Map((i?.dataLabelOverrides ?? []).map((e) => [e.idx, e])), o = e.chartexTreemap?.parentLabelLayout ?? "overlapping", s = [...r.children];
	for (; s.length > 0;) {
		let r = s.pop();
		for (let e of r.children) s.push(e);
		if (r.layoutWeight <= 0 || n.kind === "sunburst" && r.a1 - r.a0 <= 1e-4) continue;
		let c;
		n.kind === "sunburst" ? c = Ia(e, i, r.labelIndex, r.label, r.value, {
			visible: !1,
			showVal: !1,
			showCatName: !1
		}, a) : r.children.length > 0 ? (c = Ia(e, i, r.labelIndex, r.label, r.value, {
			visible: o !== "none",
			showVal: !1,
			showCatName: !0
		}, a), o === "overlapping" && r.depth !== 0 && (c = null)) : c = Ia(e, i, r.labelIndex, r.label, r.value, {
			visible: !1,
			showVal: !1,
			showCatName: !1
		}, a), c && t({
			label: c,
			styleIndex: r.labelIndex,
			linkedStyleIndex: a.has(r.labelIndex) ? r.labelIndex : i?.chartexFormatIdx ?? 0
		});
	}
	return "ok";
}
//#endregion
//#region packages/core/src/chart/waterfall-plan.ts
function za(e, t, n) {
	let r = Math.max(e.length, t), i = new Set(n), a = !1, o = (e, t) => {
		let n = e + t;
		return Number.isFinite(n) ? n : (a = !0, n < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE);
	}, s = 0, c = -Infinity, l = 0, u = [];
	for (let t = 0; t < r; t++) {
		let n = e[t], r = n != null && Number.isFinite(n), a = n == null || r, d = r ? n : 0;
		if (i.has(t)) {
			let e = {
				start: 0,
				end: d,
				isSub: !0,
				isPos: !0,
				hasValue: r,
				paintSlot: a,
				semanticIndex: 2
			};
			u.push(e), a && (c = Math.max(c, e.start, e.end), l = Math.min(l, e.start, e.end)), r && (s = d);
		} else {
			let e = o(s, d), t = d >= 0 ? s : e, n = d >= 0 ? e : s, i = {
				start: t,
				end: n,
				isSub: !1,
				isPos: d >= 0,
				hasValue: r,
				paintSlot: a,
				semanticIndex: d >= 0 ? 0 : 1
			};
			u.push(i), a && (c = Math.max(c, t, n), l = Math.min(l, t, n)), r && (s = e);
		}
	}
	return {
		bars: u,
		rawMin: l,
		rawMax: c,
		cumulativeOverflow: a
	};
}
//#endregion
//#region packages/core/src/chart/resource-limits.ts
var Ba = 1e4, Va = 4096, Ha = 1048576, Ua = 4096;
function Wa(e, t, n, r = n) {
	return Ii(e, t, n, r) != null;
}
function Ga(e, t, n, r) {
	let i = r[n];
	return i?.kind === "bubble" || i?.kind === "scatter" ? "scatter" : i?.kind === "line" ? e.chartType === "stackedLinePct" ? "stackedLinePct" : e.chartType === "stackedLine" ? "stackedLine" : "line" : i?.kind === "area" ? e.chartType === "stackedAreaPct" ? "stackedAreaPct" : e.chartType === "stackedArea" ? "stackedArea" : "area" : i?.kind ?? t.seriesType ?? (e.chartType === "bubble" ? "scatter" : e.chartType);
}
function Ka(e, t) {
	let n = e.series.filter((e) => e.lineGroupIndex === t);
	return n.length > 0 || t !== 0 || ![
		"line",
		"stackedLine",
		"stackedLinePct"
	].includes(e.chartType) ? n : e.series.filter((e) => e.seriesType == null || e.seriesType === "line");
}
function qa(e, t, n) {
	return !!(n?.text || (n?.showVal ?? t.seriesDataLabels?.showVal ?? e.showDataLabels) || (n?.showCatName ?? t.seriesDataLabels?.showCatName) || (n?.showSerName ?? t.seriesDataLabels?.showSerName) || (n?.showPercent ?? t.seriesDataLabels?.showPercent) || (n?.showBubbleSize ?? t.seriesDataLabels?.showBubbleSize) || (n?.showLegendKey ?? t.seriesDataLabels?.showLegendKey));
}
function Ja(e, t, n, r) {
	return e.threeD || r[t]?.kind.endsWith("3D") === !0 || L(e, t) ? null : n === "line" || n === "stackedLine" || n === "stackedLinePct" ? "dataPointLine" : n === "area" || n === "stackedArea" || n === "stackedAreaPct" ? "dataPoint" : n === "radar" ? (r[t]?.radarStyle ?? e.radarStyle) === "filled" ? "dataPoint" : "dataPointLine" : null;
}
function Ya(e) {
	let t = Za(e.chartType), n = qt(e), r = e.series.map((t, r) => Ga(e, t, r, n)), i = e.series.some((t, n) => r[n] === "scatter" && (t.categories ?? e.categories).some((e) => Number.isFinite(Number.parseFloat(e)))), a = 0, o = (e, t, n = 0, r = n) => {
		Wa(e, t, n, r) && a++;
	};
	o(e.chartAreaStyle, e.chartStyleRoles?.chartArea), o(e.plotAreaStyle, e.chartStyleRoles?.[e.threeD ? "plotArea3D" : "plotArea"]), e.showLegend && o(e.legendStyle, e.chartStyleRoles?.legend), (e.titlePresent === !0 || e.title != null || (e.titleRichRuns?.length ?? 0) > 0) && o(e.titleStyle, e.chartStyleRoles?.title), e.catAxisTitle != null && o(e.catAxisTitleStyle, e.chartStyleRoles?.axisTitle), e.valAxisTitle != null && o(e.valAxisTitleStyle, e.chartStyleRoles?.axisTitle);
	for (let t of [e.secondaryValAxis, e.secondaryCatAxis]) t?.title != null && o(t.titleStyle, e.chartStyleRoles?.axisTitle), t?.displayUnits?.label != null && o(t.displayUnits.label.boxStyle?.style, e.chartStyleRoles?.axisTitle);
	if (e.threeD?.seriesAxis?.title != null && o(e.threeD.seriesAxis.titleStyle, e.chartStyleRoles?.axisTitle), e.valAxisDisplayUnits?.label != null && o(e.valAxisDisplayUnits.label.boxStyle?.style, e.chartStyleRoles?.axisTitle), e.catAxisDisplayUnits?.label != null && o(e.catAxisDisplayUnits.label.boxStyle?.style, e.chartStyleRoles?.axisTitle), Ra(e, ({ label: t, linkedStyleIndex: n }) => {
		let r = t.labelBox, i = Ma(r) ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel;
		o(r?.style, i, 0, n);
	}), e.chartType === "waterfall") {
		let t = e.series[0], n = new Map((t?.dataPointOverrides ?? []).map((e) => [e.idx, e])), r = za(t?.values ?? [], e.categories.length, e.subtotalIndices);
		if (!r.cumulativeOverflow && r.rawMax > r.rawMin) for (let i = 0; i < r.bars.length; i++) {
			let a = r.bars[i];
			a.paintSlot && o(X(n.get(i)?.chartexStyle, t?.chartexStyle), e.chartexDataPointStyle, a.semanticIndex, a.semanticIndex);
		}
	} else if (e.chartType === "funnel") {
		let t = e.series[0], n = t?.values ?? [];
		if (n.some((e) => e != null && e > 0)) {
			let r = Math.max(n.length, e.categories.length);
			for (let i = 0; i < r; i++) (n[i] ?? 0) > 0 && o(t?.chartexStyle, e.chartexDataPointStyle, 0, 0);
		}
	}
	for (let t = 0; t < (e.chartexBox?.series.length ?? 0); t++) {
		let n = e.chartexBox.series[t], r = n.chartexFormatIdx ?? t;
		for (let t of n.valuesByCategory) fi(t, n.quartileMethod) && o(n.chartexStyle, e.chartexDataPointStyle, r, r);
	}
	let s = e.series[0];
	La(e, ({ node: t, paintsBody: n }) => {
		n && o(s?.chartexStyle, e.chartexDataPointStyle, s?.chartexFormatIdx ?? 0, t.branchIndex);
	});
	let c = xt(e), l = Ct(e);
	for (let a = 0; a < e.series.length; a++) {
		let s = e.series[a], u = r[a], d = n[a], f = Jt(e.chartType, d), p = s.chartexFormatIdx ?? a, m = new Map((s.dataPointOverrides ?? []).map((e) => [e.idx, e])), h = Ja(e, a, u, n), g = L(e, a), _ = e.threeD != null || d?.kind.endsWith("3D") === !0, v = d?.kind === "bubble" || d == null && e.chartType === "bubble", y = u === "radar" && (d?.radarStyle ?? e.radarStyle) === "filled", b = u === "scatter" && !v, x = g && (u === "line" || u === "stackedLine" || u === "stackedLinePct" || u === "radar" && !y || b), S = /* @__PURE__ */ new Set();
		if (x) if (u === "scatter") {
			let t = [];
			for (let n = 0; n < s.values.length; n++) jt(e, s, u, n, i, { chartType: f }) && t.push(n);
			for (let e = 1; e < t.length; e++) S.add(t[e]);
		} else {
			let t = u === "stackedLine" || u === "stackedLinePct" || d?.kind === "line" && (d.grouping === "stacked" || d.grouping === "percentStacked") || u === "line" && e.dispBlanksAs === "zero", n = u !== "radar" && !t && e.dispBlanksAs === "span", r = [], i = () => {
				for (let e = 1; e < r.length; e++) S.add(r[e]);
				u === "radar" && r.length === s.values.length && r.length > 1 && S.add(r[0]), r = [];
			};
			for (let e = 0; e < s.values.length; e++) {
				if (s.sourceHidden?.[e] === !0) {
					i();
					continue;
				}
				let a = s.values[e];
				a != null && Number.isFinite(a) || t ? r.push(e) : n || i();
			}
			i();
		}
		if (t && h && (!g || h === "dataPoint" && (u === "area" || u === "stackedArea" || u === "stackedAreaPct")) && o(X(s.chartexStyle), R(e, h, a), p), t && g && y && s.values.length >= 3 && s.values.every((e, t) => e != null && Number.isFinite(e) && s.sourceHidden?.[t] !== !0) && o(X(m.get(0)?.chartexStyle, s.chartexStyle), R(e, "dataPoint", a), 0, 0), t && u === "scatter" && !g && b) {
			let t = 0;
			for (let n = 0; n < s.values.length; n++) jt(e, s, u, n, i, { chartType: f }) && t++;
			t >= 2 && o(X(s.chartexStyle), R(e, "dataPointLine", a), p);
		}
		let C = Math.max(s.values.length, s.categories?.length ?? 0, s.bubbleSizes?.length ?? 0, e.categories.length);
		if (t && !e.threeD && d?.kind.endsWith("3D") !== !0) for (let t = 0; t < C; t++) {
			let n = m.get(t), r = jt(e, s, u, t, i, {
				chartType: f,
				bubbleScale: d?.bubbleScale ?? e.bubbleScale,
				showNegativeBubbles: d?.showNegativeBubbles ?? e.showNegativeBubbles
			}), c = v ? "bubble" : u, l = c === "area" || c === "stackedArea" || c === "stackedAreaPct", _ = c === "line" || c === "stackedLine" || c === "stackedLinePct" || l || c === "scatter" || c === "bubble" || c === "radar" || c === "stock", y = It(c, f, d?.scatterStyle ?? e.scatterStyle, d?.radarStyle ?? e.radarStyle), b = l ? (s.showMarker === !0 || Et(s)) && s.markerSymbol !== "none" : c === "stock" ? s.markerSymbol != null && s.markerSymbol !== "none" : s.showMarker !== !1 && s.markerSymbol !== "none", C = r && _ && !y && Rt(s, n, "circle", b) !== "none", w = s.values[t], T = r && (!(u === "pie" || u === "doughnut" || u === "ofPie") || w != null && Number.isFinite(w) && Math.abs(w) > 0), E = d?.kind === "stock" ? d.seriesStart : 0, D = d?.kind === "stock" ? d.seriesCount : e.series.length, O = u === "stock" && (a === E + D - 1 || D >= 4 && a === E);
			if ((x ? S.has(t) : h == null && (v || u !== "scatter" && u !== "radar")) && T && (u !== "stock" || O && !C)) {
				let r = v ? kt(s, n) ? "dataPoint3D" : "dataPoint" : u === "line" || u === "stackedLine" || u === "stackedLinePct" || u === "stock" || u === "scatter" || u === "radar" ? "dataPointLine" : "dataPoint";
				o(X(n?.chartexStyle, s.chartexStyle), R(e, r, a), u === "stock" ? p : n?.chartexStyle ? t : p, u === "stock" ? p : g ? t : p);
			}
			C && !v && o(X(n?.markerStyle, n?.chartexStyle, s.markerStyle), R(e, "dataPointMarker", a), n?.markerStyle || n?.chartexStyle ? t : p, g ? t : p);
		}
		if (t && u === "ofPie") {
			let t = Xt(e.ofPie, s.values), n = t == null ? void 0 : [...t].find((e) => {
				let t = s.values[e];
				return t != null && Number.isFinite(t) && Math.abs(t) > 0;
			});
			n != null && o(X(m.get(n)?.chartexStyle, s.chartexStyle), R(e, "dataPoint", a), g ? n : p);
		}
		if (t && _ && (d?.kind === "line3D" || d?.kind === "area3D" || u === "line" || u === "stackedLine" || u === "stackedLinePct" || u === "area" || u === "stackedArea" || u === "stackedAreaPct")) {
			let t = (d?.kind === "area3D" || u === "area" || u === "stackedArea" || u === "stackedAreaPct" ? s.showMarker === !0 || Et(s) : s.showMarker === !0) && s.markerSymbol !== "none";
			for (let n = 0; n < C; n++) {
				let r = m.get(n), i = t || r?.markerSymbol != null && r.markerSymbol !== "none", c = s.values[n];
				!i || s.sourceHidden?.[n] === !0 || c == null || !Number.isFinite(c) || o(X(r?.markerStyle, r?.chartexStyle, s.markerStyle), R(e, "dataPointMarker", a), r?.markerStyle || r?.chartexStyle ? n : p, p);
			}
		}
		let w = u === "scatter" && !v && s.lineHidden !== !0, T = d?.kind === "line3D" || u === "line" || u === "stackedLine" || u === "stackedLinePct" || u === "stock" || w || u === "radar" && !y, E = v || u === "scatter" && !w, D = _ ? "dataPoint3D" : T ? "dataPointLine" : "dataPoint", O = (t, n) => {
			let r = n ? m.get(t) : void 0, i = n ? t : a;
			if (!E) {
				let c = X(r?.chartexStyle, s.chartexStyle);
				o(c, R(e, D, a), _ ? c === r?.chartexStyle ? t : p : r?.chartexStyle ? t : p, _ ? g ? i : p : n ? t : p);
			}
			if (!((_ ? T && s.showMarker === !0 && s.markerSymbol !== "none" : Lt(f, d?.scatterStyle ?? e.scatterStyle, s, d?.radarStyle ?? e.radarStyle)) || r?.markerSymbol != null && r.markerSymbol !== "none")) return;
			let c = v && kt(s, r) ? "dataPoint3D" : v ? "dataPoint" : "dataPointMarker";
			o(X(r?.markerStyle, r?.chartexStyle, v ? s.chartexStyle : s.markerStyle), R(e, c, a), r?.markerStyle || r?.chartexStyle ? t : p, _ ? p : n ? t : p);
		};
		if (e.showLegend) {
			let e = c[a];
			if (e) for (let t = 0; t < e.count; t++) l.has(e.firstIndex + t) || O(e.pointDriven ? t : 0, e.pointDriven);
		}
		if (e.dataTable?.showKeys === !0 && Pt(e.chartType) && O(0, c[a]?.pointDriven === !0), Nt(e, s, u, C, i, {
			chartType: f,
			bubbleScale: d?.bubbleScale ?? e.bubbleScale,
			showNegativeBubbles: d?.showNegativeBubbles ?? e.showNegativeBubbles
		}, a) > 0) {
			let t = new Map((s.dataLabelOverrides ?? []).map((e) => [e.idx, e]));
			for (let n = 0; n < C; n++) {
				let r = t.get(n);
				lt(s.seriesDataLabels, r) || (r?.showLegendKey ?? s.seriesDataLabels?.showLegendKey) !== !0 || !Mt(e, s, u, n, i, a) || O(n, c[a]?.pointDriven === !0);
			}
		}
		for (let t of s.dataLabelOverrides ?? []) {
			if (s.sourceHidden?.[t.idx] === !0 || lt(s.seriesDataLabels, t) || !qa(e, s, t) || !Mt(e, s, u, t.idx, i, a)) continue;
			let n = Na(t.labelBox, s.seriesDataLabels?.labelBox);
			o(X(t.labelBox?.style, s.seriesDataLabels?.labelBox?.style), Ma(n) ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, 0, t.idx);
		}
		let k = new Set((s.dataLabelOverrides ?? []).map((e) => e.idx));
		if (s.seriesDataLabels?.labelBox != null || e.chartStyleRoles?.dataLabel != null) {
			let t = Math.max(s.values.length, s.categories?.length ?? 0, e.categories.length);
			for (let n = 0; n < t; n++) k.has(n) || Mt(e, s, u, n, i, a) && qa(e, s, void 0) && o(s.seriesDataLabels?.labelBox?.style, Ma(s.seriesDataLabels?.labelBox) ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, 0, s.chartexFormatIdx ?? a);
		}
		for (let n of t ? s.trendLines ?? [] : []) (n.dispEq === !0 || n.dispRSqr === !0 || n.labelText || n.labelRichRuns?.some((e) => e.text.length > 0) === !0) && o(n.labelBox?.style, e.chartStyleRoles?.trendlineLabel, 0, s.chartexFormatIdx ?? a);
	}
	for (let t = 0; t < (e.chartexBox?.series.length ?? 0); t++) {
		let n = e.chartexBox.series[t];
		if ((e.chartStyleMarkerSymbol ?? e.chartexMarkerSymbol ?? "circle") === "none" || !n.showNonoutliers && !n.showOutliers) continue;
		let r = n.chartexFormatIdx ?? t;
		for (let t of n.valuesByCategory) {
			let i = fi(t, n.quartileMethod);
			if (!i) continue;
			let a = mi(i, n.showNonoutliers, n.showOutliers);
			for (let t = 0; t < a; t++) o(X(n.chartexStyle), e.chartStyleRoles?.dataPointMarker, r);
		}
	}
	let u = (t, n) => {
		let r = t[0], i = t.at(-1);
		if (!r || !i) return;
		let a = Math.max(r.values.length, i.values.length);
		for (let t = 0; t < a; t++) {
			let a = r.values[t], s = i.values[t];
			if (a == null || s == null || !Number.isFinite(a) || !Number.isFinite(s) || a === s) continue;
			let c = s > a ? "upBar" : "downBar";
			o((c === "upBar" ? n.up : n.down).style, e.chartStyleRoles?.[c], t);
		}
	};
	if (e.stockUpDownBars) {
		let t = e.plotGroups?.find((e) => e.kind === "stock");
		u(t ? e.series.slice(t.seriesStart, t.seriesStart + t.seriesCount) : e.series, e.stockUpDownBarStyle ?? {
			gapWidthPercent: 150,
			up: {},
			down: {}
		});
	}
	for (let t of e.lineGroupDecorations ?? []) t.upDownBars && u(Ka(e, t.groupIndex), t.upDownBars);
	return Math.max(1, a);
}
var Xa = new Set([
	"clusteredBar",
	"clusteredBarH",
	"stackedBar",
	"stackedBarH",
	"stackedBarPct",
	"stackedBarHPct",
	"clusteredColumn",
	"line",
	"stackedLine",
	"stackedLinePct",
	"area",
	"stackedArea",
	"stackedAreaPct",
	"pie",
	"doughnut",
	"ofPie",
	"radar",
	"scatter",
	"bubble",
	"stock",
	"surface",
	"surface3D"
]);
function Za(e) {
	return Xa.has(e);
}
function Qa(e) {
	let t = 0, n = (e) => !Number.isSafeInteger(e) || e < 0 || e > 1e4 - t ? !1 : (t += e, !0), r = (e, n) => !Number.isSafeInteger(e) || e < 0 || !Number.isSafeInteger(n) || n < 0 || e !== 0 && n > Math.floor((1e4 - t) / e) ? !1 : (t += e * n, !0);
	if (!n(e.legendEntries?.length ?? 0) || !n(e.plotGroups?.length ?? 0)) return Ba + 1;
	if (e.plotGroups != null) {
		let t = 0;
		for (let n of e.plotGroups) {
			if (!Number.isSafeInteger(n.seriesStart) || n.seriesStart < 0 || !Number.isSafeInteger(n.seriesCount) || n.seriesCount < 0 || n.seriesStart !== t || n.seriesCount > e.series.length - t) return Ba + 1;
			t += n.seriesCount;
		}
		if (t !== e.series.length) return Ba + 1;
	}
	for (let t of e.series) {
		let i = Math.max(1, e.categories.length, t.values.length, t.categories?.length ?? 0, t.bubbleSizes?.length ?? 0, t.dataPointOverrides?.length ?? 0, t.dataLabelOverrides?.length ?? 0);
		if (!n(i) || !r(t.trendLines?.length ?? 0, Math.max(1, t.values.length)) || !n(t.errBars?.length ?? 0)) return Ba + 1;
		for (let e of t.errBars ?? []) if (!n(Math.max(i, e.plus.length, e.minus.length))) return Ba + 1;
	}
	if (!n(e.chartexSunburst?.rows.length ?? 0) || !n(e.chartexTreemap?.rows.length ?? 0) || !n(e.chartexRegionMap?.rows.length ?? 0) || !n(e.chartexBox?.categories.length ?? 0) || !n(e.chartexBox?.series.length ?? 0)) return Ba + 1;
	for (let t of e.chartexBox?.series ?? []) for (let e of t.valuesByCategory) if (!n(e.length)) return Ba + 1;
	return n(e.ofPie?.customSplitIndices?.length ?? 0) ? t : Ba + 1;
}
function $a(e) {
	if (!Za(e.chartType)) return null;
	let t = 0;
	for (let n of e.series) {
		let r = 0;
		for (let e of n.errBars ?? []) r = Math.max(r, e.plus.length, e.minus.length);
		let i = Math.max(1, e.categories.length, n.categories?.length ?? 0, n.values.length, n.bubbleSizes?.length ?? 0, n.dataPointOverrides?.length ?? 0, n.dataLabelOverrides?.length ?? 0, n.trendLines?.length ?? 0, r);
		if (!Number.isSafeInteger(i) || i > 1e4 - t) return Ba + 1;
		t += i;
	}
	return t;
}
//#endregion
//#region packages/core/src/chart/three-d-surface-picture-plan.ts
function eo(e, t) {
	return !Number.isSafeInteger(t) || t < 0 ? !1 : e.slabFaces ? t === 0 ? e.slabFaces.front : t === 1 || t >= 6 ? !1 : t % 2 == 0 ? e.slabFaces.end : e.slabFaces.sides : t === 0;
}
function to(e, t) {
	return e.mode !== "stack" && e.mode !== "stackScale" || !eo(e, t) ? !1 : !e.slabFaces || t === 0 || t % 2 == 1;
}
function no(e, t) {
	return eo(e, t) ? ro(e, t) ? e.repetitions : 1 : 0;
}
function ro(e, t) {
	return e.mode === "stackScale" && to(e, t);
}
function io(e) {
	let t = 0;
	for (let n = 0; n < 6; n++) if (t += no(e, n), t > 4096) return null;
	return e;
}
function ao(e) {
	return e == null || [
		e.l,
		e.t,
		e.r,
		e.b
	].every((e) => (e ?? 0) === 0);
}
function oo(e) {
	if (!e) return !0;
	let t = e.l ?? 0, n = e.t ?? 0, r = e.r ?? 0, i = e.b ?? 0, a = [
		t,
		n,
		r,
		i
	], o = 1 - r, s = 1 - i;
	return a.every(Number.isFinite) && o > t && s > n && Math.min(1, o) > Math.max(0, t) && Math.min(1, s) > Math.max(0, n);
}
function so(e, t, n, r) {
	if (e.tile != null == (e.stretch === !0) || !oo(e.srcRect) || !oo(e.fillRect) || e.rotWithShape === !1 || e.alpha != null && (!Number.isFinite(e.alpha) || e.alpha < 0 || e.alpha > 1)) return null;
	let i = t?.pictureOptions;
	if (i?.pictureFormatAuthored === !0 && i.pictureFormat == null || i?.pictureStackUnitAuthored === !0 && i.pictureStackUnit == null) return null;
	let a = i?.pictureFormat ?? "stretch";
	if ((!ao(e.srcRect) || !ao(e.fillRect)) && a !== "stretch") return null;
	let o = t?.thicknessPercent ?? 0;
	if (!Number.isFinite(o) || o < 0) return null;
	let s = o === 0 ? void 0 : {
		front: i?.applyToFront !== !1,
		sides: i?.applyToSides !== !1,
		end: i?.applyToEnd !== !1
	};
	if (s && !Object.values(s).some(Boolean) || !s && (n === "backWall" && i?.applyToFront === !1 || (n === "floor" || n === "sideWall") && i?.applyToSides === !1) || (i?.pictureStackUnitAuthored === !0 || i?.pictureStackUnit != null) && a !== "stackScale") return null;
	if (e.tile) return a !== "stretch" || !ao(e.fillRect) ? null : io({
		mode: "tile",
		repetitions: 1,
		slabFaces: s
	});
	if (a === "stretch") return io({
		mode: "stretch",
		repetitions: 1,
		slabFaces: s
	});
	if (a === "stack") return io({
		mode: "stack",
		repetitions: 1,
		slabFaces: s
	});
	if (a !== "stackScale") return null;
	let c = i?.pictureStackUnit;
	if (!(c != null && Number.isFinite(c) && c > 0)) return null;
	if (n === "floor") return io({
		mode: "stretch",
		repetitions: 1,
		slabFaces: s
	});
	if (r == null) return io({
		mode: "stackScale",
		repetitions: 1,
		stackUnit: c,
		slabFaces: s
	});
	if (!(Number.isFinite(r) && r > 0)) return null;
	let l = Math.ceil(r / c);
	return !Number.isSafeInteger(l) || l < 1 || l > 4096 ? null : io({
		mode: "stackScale",
		repetitions: l,
		stackUnit: c,
		slabFaces: s
	});
}
//#endregion
//#region packages/core/src/chart/axis-style.ts
function co(e, t) {
	return e ? Math.max(.5, e / n) * t : 1;
}
function lo(e, t, n) {
	return {
		color: e ? `#${e}` : "#aaa",
		width: co(t, n)
	};
}
function uo(e, t, n) {
	return {
		color: e ? `#${e}` : "#e0e0e0",
		width: t ? co(t, n) : .5
	};
}
function fo(e) {
	return e.catAxisCrossBetween !== "midCat";
}
//#endregion
//#region packages/core/src/chart/compound-frame.ts
function po(e, t) {
	if (!Number.isFinite(e) || e <= 0) return [];
	let n = t === "dbl" ? [
		1,
		1,
		1
	] : t === "thinThick" ? [
		1,
		1,
		3
	] : t === "thickThin" ? [
		3,
		1,
		1
	] : t === "tri" ? [
		1,
		1,
		2,
		1,
		1
	] : [1], r = e / n.reduce((e, t) => e + t, 0), i = [], a = 0;
	for (let e = 0; e < n.length; e += 2) {
		let t = n[e] * r;
		i.push({
			center: a + t / 2,
			width: t
		}), a += t + (n[e + 1] ?? 0) * r;
	}
	return i;
}
function mo(e, t, n, r, i, a) {
	let o = Math.max(0, Math.min(a, r / 2, i / 2));
	e.beginPath(), e.moveTo(t + o, n), e.lineTo(t + r - o, n), e.quadraticCurveTo(t + r, n, t + r, n + o), e.lineTo(t + r, n + i - o), e.quadraticCurveTo(t + r, n + i, t + r - o, n + i), e.lineTo(t + o, n + i), e.quadraticCurveTo(t, n + i, t, n + i - o), e.lineTo(t, n + o), e.quadraticCurveTo(t, n, t + o, n), e.closePath();
}
function ho(e, t, n, r, i, a, o, s = 0) {
	if (r > 0 && i > 0) for (let c of po(a, o)) {
		let a = Math.max(0, r - c.center * 2), o = Math.max(0, i - c.center * 2);
		a > 0 && o > 0 && (e.lineWidth = c.width, s > 0 ? (mo(e, t + c.center, n + c.center, a, o, Math.max(0, s - c.center)), e.stroke()) : e.strokeRect(t + c.center, n + c.center, a, o));
	}
}
//#endregion
//#region packages/core/src/chart/legend-frame.ts
function go(e) {
	let t = I(e, "legend"), n = e.legendFillHidden === !0 && W(t) === void 0;
	if (!(e.legendFillHidden === !0 && !n)) {
		if (e.legendFill != null) return e.legendFill;
		if (!(e.legendFillColor != null || e.legendFillPaintAuthored === !0 && !n)) return G(e.chartStyleRoles?.legend, t, 0, e.legendStyle) ?? void 0;
	}
}
function _o(e, t, n, r, i = 0) {
	(!t.legendFill && !t.legendFillColor || t.legendFillHidden === !0) && (!t.legendLineFill && !t.legendLineColor || t.legendLineHidden === !0) || Ki(e, t.legendStyle, t.chartStyleRoles?.legend, 0, n, r, (e) => {
		if (e.save(), t.legendFillHidden !== !0 && (t.legendFill || t.legendFillColor)) {
			let a = t.legendFill?.fillType === "image" && Aa(e, t.legendFill, n.x, n.y, n.w, n.h, r, i) ? null : t.legendFill ? Xr(t.legendFill, e, n.x, n.y, n.w, n.h, i) : t.legendFillColor ? `#${t.legendFillColor}` : null;
			a && (e.fillStyle = a), a && e.fillRect(n.x, n.y, n.w, n.h);
		}
		if (t.legendLineHidden !== !0 && (t.legendLineFill || t.legendLineColor) && n.w > 0 && n.h > 0) {
			let a = co(t.legendLineWidthEmu, r), o = t.legendLineFill ? Xr(t.legendLineFill, e, n.x, n.y, n.w, n.h, i) : t.legendLineColor ? `#${t.legendLineColor}` : null;
			o && (e.strokeStyle = o, e.lineCap = t.legendLineCap === "rnd" ? "round" : t.legendLineCap === "sq" ? "square" : "butt", e.lineJoin = t.legendLineJoin === "round" || t.legendLineJoin === "bevel" ? t.legendLineJoin : "miter", e.setLineDash(sr(t.legendLineCustomDash, t.legendLineDash, a)), ho(e, n.x, n.y, n.w, n.h, a, t.legendLineCompound));
		}
		e.restore();
	});
}
//#endregion
//#region packages/core/src/chart/source-visibility.ts
function vo(e, t) {
	if (!e.some(Boolean)) return null;
	let n = Math.max(t, e.length), r = [], i = new Int32Array(n);
	i.fill(-1);
	for (let t = 0; t < n; t++) e[t] !== !0 && (i[t] = r.length, r.push(t));
	return {
		keep: r,
		remap: i
	};
}
function Z(e, t) {
	if (e == null) return e;
	let n = [];
	for (let r of t.keep) r < e.length && n.push(e[r]);
	return n;
}
function yo(e, t) {
	if (e == null) return e;
	let n = [];
	for (let r of e) {
		if (r.idx >= t.remap.length) continue;
		let e = t.remap[r.idx];
		e >= 0 && n.push({
			...r,
			idx: e
		});
	}
	return n;
}
function bo(e) {
	return Math.max(e.values.length, e.categories?.length ?? 0, e.sourceHidden?.length ?? 0, e.dataPointColors?.length ?? 0, e.dataLabelColors?.length ?? 0, e.catFormatCodes?.length ?? 0, e.bubbleSizes?.length ?? 0, ...(e.errBars ?? []).flatMap((e) => [e.plus.length, e.minus.length]));
}
function xo(e, t) {
	return {
		...e,
		values: Z(e.values, t) ?? [],
		categories: Z(e.categories, t),
		sourceHidden: Z(e.sourceHidden, t),
		dataPointColors: Z(e.dataPointColors, t),
		dataLabelColors: Z(e.dataLabelColors, t),
		catFormatCodes: Z(e.catFormatCodes, t),
		bubbleSizes: Z(e.bubbleSizes, t),
		dataPointOverrides: yo(e.dataPointOverrides, t),
		dataLabelOverrides: yo(e.dataLabelOverrides, t),
		errBars: e.errBars?.map((e) => ({
			...e,
			plus: Z(e.plus, t) ?? [],
			minus: Z(e.minus, t) ?? []
		}))
	};
}
function So(e) {
	let t = e.sourceHidden;
	if (!t?.some(Boolean)) return e;
	let n = (e, n) => e == null ? e : e.map((e, r) => t[r] === !0 ? n : e);
	return {
		...e,
		values: n(e.values, null) ?? [],
		bubbleSizes: n(e.bubbleSizes, null),
		errBars: e.errBars?.map((e) => ({
			...e,
			plus: n(e.plus, null) ?? [],
			minus: n(e.minus, null) ?? []
		}))
	};
}
function Co(e) {
	return e.chartType === "scatter" || e.chartType === "bubble";
}
function wo(e) {
	let t = e.sourceHidden;
	return t != null && t.length > 0 && t.every(Boolean);
}
function To(e, t) {
	if (e.plotGroups == null) return e.plotGroups;
	let n = new Set(t), r = 0;
	return e.plotGroups.map((e) => {
		let t = 0, i = e.seriesStart + e.seriesCount;
		for (let r = e.seriesStart; r < i; r++) n.has(r) && t++;
		let a = {
			...e,
			seriesStart: r,
			seriesCount: t
		};
		return r += t, a;
	});
}
var Eo = [
	"diamond",
	"square",
	"triangle",
	"x",
	"star",
	"circle"
], Do = /* @__PURE__ */ new WeakSet();
function Oo(e) {
	return Do.has(e);
}
function ko(e, t) {
	let n = e.themeAccentColors, r = t.dataPointColors?.some((e) => e != null) === !0 || (t.dataPointOverrides?.length ?? 0) > 0, i = t.markerSymbol != null || t.markerFill != null || t.markerFillPaintAuthored === !0 || t.markerLine != null || t.markerLinePaintAuthored === !0;
	if (e.scatterStyle !== "marker" || !n?.length || r || i || t.lineHidden === !0) return t;
	let a = {
		...t,
		dataPointColors: t.values.map((e, t) => n[t % n.length]),
		dataPointOverrides: t.values.map((e, t) => ({
			idx: t,
			markerSymbol: Eo[t % Eo.length]
		}))
	};
	return Do.add(a), a;
}
function Ao(e) {
	if (e.plotVisibleOnly !== !0) return e;
	if (Co(e)) {
		let t = [];
		return {
			...e,
			series: e.series.flatMap((n, r) => {
				let i = n.categories == null ? {
					...n,
					categories: e.categories
				} : n, a = i.sourceHidden, o = a && vo(a, bo(i));
				if (!o) return t.push(r), [i];
				if (o.keep.length === 0) return [];
				t.push(r);
				let s = xo(i, o);
				return e.chartType === "scatter" ? [ko(e, s)] : [s];
			}),
			plotGroups: To(e, t)
		};
	}
	let t = Math.max(e.categories.length, ...e.categoryLevels?.map((e) => e.length) ?? [], ...e.series.map(bo)), n = e.categorySourceHidden ? vo(e.categorySourceHidden, t) : null, r = [], i = e.series.flatMap((e, t) => {
		let i = n ? xo(e, n) : e;
		return n?.keep.length === 0 || wo(i) ? [] : (r.push(t), [So(i)]);
	}), a = To(e, r);
	if (!n) return {
		...e,
		series: i,
		plotGroups: a
	};
	let o = e.subtotalIndices.flatMap((e) => {
		if (e >= n.remap.length) return [];
		let t = n.remap[e];
		return t >= 0 ? [t] : [];
	});
	return {
		...e,
		categories: Z(e.categories, n) ?? [],
		categoryLevels: e.categoryLevels?.map((e) => Z(e, n) ?? []),
		categorySourceHidden: Z(e.categorySourceHidden, n),
		subtotalIndices: o,
		series: i,
		plotGroups: a
	};
}
function jo(e) {
	return e != null && Number.isFinite(e) ? e : null;
}
function Mo(e) {
	let t = String(Math.abs(e));
	if (t.includes("e")) return Infinity;
	let n = t.indexOf(".");
	return n < 0 ? 0 : t.length - n - 1;
}
function No(e) {
	return (t) => !Number.isFinite(t) || t === 0 ? t === 0 ? 0 : t : e <= 15 && Math.abs(t) * 10 ** e < 9e15 ? Number(t.toFixed(e)) : Number(t.toPrecision(15));
}
function Po(e, t) {
	let n = !e || e.trim().toLowerCase() === "general";
	return (r) => {
		let i = r === 0 ? 0 : r;
		return n ? String(i) : Ca(i, e, t);
	};
}
function Fo(e) {
	let t = 0, n = 0, r = 0;
	for (let i of e) {
		if (i == null || !Number.isFinite(i)) continue;
		t++;
		let e = i - n;
		n += e / t, r += e * (i - n);
	}
	if (t <= 1) return 5;
	let i = Math.sqrt(r / (t - 1));
	if (!(i > 0)) return 5;
	let a = Number((3.5 * i / Math.cbrt(t)).toPrecision(2));
	return a > 0 ? a : 5;
}
function Io(e, t, n, r = !1) {
	if (e.length > 1048576) return { kind: "tooManyInputPoints" };
	let i = Po(t.edgeFormatCode ?? n, r), a = t.intervalClosed === "r" ? "r" : "l", o = jo(t.underflow), s = jo(t.overflow);
	o != null && s != null && o >= s && (o = null, s = null);
	let c = (e) => o != null && (a === "r" ? e <= o : e < o), l = (e) => s != null && (a === "r" ? e > s : e >= s), u = Infinity, d = -Infinity, f = 0, p = 0, m = 0;
	for (let t of e) {
		let e = jo(t);
		e != null && (c(e) ? p++ : l(e) ? m++ : (f++, u = Math.min(u, e), d = Math.max(d, e)));
	}
	if (f + p + m === 0) return {
		kind: "bins",
		categories: [],
		counts: []
	};
	let h = [], g = [];
	if (o != null && (h.push(`${a === "r" ? "≤" : "<"} ${i(o)}`), g.push(p)), f > 0) {
		let n = o ?? u, r = s ?? d, p = r - n;
		if (!Number.isFinite(p)) h.push(`[${i(n)}, ${i(r)}]`), g.push(f);
		else {
			let u = jo(t.binSize), d = t.binCount != null && Number.isFinite(t.binCount) && t.binCount > 0 ? Math.max(1, Math.floor(t.binCount)) : null, f = u != null && u > 0, m = f || d == null, _ = 0, v;
			if (m) {
				if (_ = f ? u : Fo(e), v = 1, p > 0 && Number.isFinite(_) && _ > 0) {
					let e = No(Math.max(Mo(_), Mo(n))), t = (t) => e(n + _ * t), i = Math.max(1, Math.ceil(p / _));
					if (Number.isFinite(i) && i <= 512 * 4) {
						for (; i > 1 && t(i - 1) >= r;) i--;
						for (; t(i) < r && i <= 512 * 4;) i++;
					}
					v = i;
				}
				Number.isFinite(v) || (v = 1);
			} else v = d;
			let y = p <= 0 ? 1 : Math.min(512, v), b = m && v <= 512 && Number.isFinite(_) && _ > 0, x = b ? _ : p === 0 ? 1 : p / y, S = Array(y).fill(0), C = No(b ? Math.max(Mo(x), Mo(n)) : Infinity), w = [];
			for (let e = 0; e <= y; e++) {
				let t = b ? n + x * e : n + p * e / y;
				w.push(C(s == null ? t : Math.min(t, s)));
			}
			let T = !0;
			for (let e = 1; e <= y; e++) w[e] > w[e - 1] || (T = !1);
			for (let t of e) {
				let e = jo(t);
				if (e == null || c(e) || l(e)) continue;
				let r;
				if (T) {
					let t = 0, n = y - 1;
					if (a === "r") for (; t < n;) {
						let r = t + n >> 1;
						e <= w[r + 1] ? n = r : t = r + 1;
					}
					else for (; t < n;) {
						let r = t + n + 1 >> 1;
						e >= w[r] ? t = r : n = r - 1;
					}
					r = t;
				} else {
					let t = p === 0 ? 0 : (e - n) / p * y, i = a === "r" ? Math.ceil(t) - 1 : Math.floor(t);
					r = Math.max(0, Math.min(y - 1, i));
				}
				S[r]++;
			}
			for (let e = 0; e < y; e++) {
				let t = i(w[e]), n = i(w[e + 1]), r = e === y - 1, c = a === "r" && (o != null || e > 0), l = a === "l" && !(r && s == null);
				h.push(`${c ? "(" : "["}${t}, ${n}${l ? ")" : "]"}`), g.push(S[e]);
			}
		}
	}
	return s != null && (h.push(`${a === "r" ? ">" : "≥"} ${i(s)}`), g.push(m)), {
		kind: "bins",
		categories: h,
		counts: g
	};
}
//#endregion
//#region packages/core/src/chart/pareto-layout.ts
function Lo(e, t) {
	return e == null ? e : e.flatMap((e) => {
		let n = t.get(e.idx);
		return n == null ? [] : [{
			...e,
			idx: n
		}];
	});
}
function Ro(e, t) {
	return e == null ? e : t.map((t) => e[t] ?? null);
}
function zo(e, t, n = {}) {
	let r = e.values.map((e, t) => ({
		value: e,
		sourceIndex: t
	})).filter((e) => e.value != null && Number.isFinite(e.value) && e.value >= 0);
	n.sortDescending !== !1 && r.sort((e, t) => t.value - e.value || e.sourceIndex - t.sourceIndex);
	let i = r.reduce((e, t) => Math.max(e, t.value), 0), a = i > 0 ? r.reduce((e, t) => e + t.value / i, 0) : 0, o = 0, s = r.map((n) => (i > 0 && (o += n.value / i), {
		sourceIndex: n.sourceIndex,
		category: e.categories?.[n.sourceIndex] ?? t[n.sourceIndex] ?? String(n.sourceIndex + 1),
		value: n.value,
		cumulativeFraction: a > 0 ? o >= a ? 1 : o / a : 0
	})), c = s.map((e) => e.sourceIndex);
	if (n.keepUnvaluedCategories) {
		for (let n = 0; n < t.length; n++) e.values[n] == null && t[n] !== "" && c.push(n);
		n.sortDescending === !1 && c.sort((e, t) => e - t);
	}
	let l = new Map(c.map((e, t) => [e, t])), u = c.map((n) => e.categories?.[n] ?? t[n] ?? String(n + 1)), d = c.map((t) => {
		let n = e.values[t];
		return n != null && Number.isFinite(n) && n >= 0 ? n : null;
	}), f = new Map(s.map((e) => [e.sourceIndex, e.cumulativeFraction])), p = 0, m = c.map((e) => (p = f.get(e) ?? p, p)), h = {
		...e,
		categories: u,
		catFormatCodes: Ro(e.catFormatCodes, c),
		dataPointColors: Ro(e.dataPointColors, c),
		dataLabelColors: Ro(e.dataLabelColors, c),
		dataPointOverrides: Lo(e.dataPointOverrides, l),
		dataLabelOverrides: Lo(e.dataLabelOverrides, l)
	};
	return {
		points: s,
		categories: u,
		orderedSeries: {
			...h,
			values: d
		},
		series: {
			...h,
			values: m
		}
	};
}
//#endregion
//#region packages/core/src/chart/shared/palette.ts
var Bo = [
	"4472C4",
	"ED7D31",
	"A9D18E",
	"FF0000",
	"70AD47",
	"4BACC6",
	"FFC000",
	"9E480E",
	"843C0C",
	"636363",
	"255E91",
	"967300"
], Vo = [
	"5B9BD5",
	"ED7D31",
	"A5A5A5",
	"FFC000",
	"4472C4",
	"70AD47"
];
function Ho(e, t) {
	return t?.color ? `#${t.color}` : `#${Bo[e % Bo.length]}`;
}
function Uo(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e ?? []) t.has(n.idx) || t.set(n.idx, n);
	return t;
}
function Wo(e, t, n = !0, r = e) {
	let i = t.dataPointColors?.[e];
	return i ? `#${i}` : t.color === "00000000" ? "#00000000" : n ? `#${Bo[e % Bo.length]}` : Ho(r, t);
}
function Go(e, t, n, r) {
	return L(e, n) ? r : Jo(t, n);
}
function Ko(e, t, n, r, i, a, o, s, c, l, u, d = !0, f = !0) {
	let p = be(t, n, r, i, a), { paint: m } = p;
	if (m === void 0 && !d || (m === void 0 && (m = {
		fillType: "solid",
		color: o.replace(/^#/, "")
	}), m === null)) return !1;
	let h = m.fillType === "solid" ? m.color.startsWith("#") ? m.color : `#${m.color}` : Xr(m, e, l.x, l.y, l.w, l.h, u);
	if (!h) return !1;
	e.strokeStyle = h, e.lineWidth = p.widthEmu == null ? s : co(p.widthEmu, c);
	let g = sr(p.customDash, p.dash, e.lineWidth), _ = typeof e.getLineDash == "function" ? e.getLineDash() ?? [] : [];
	return (f || g.length > 0 || _.length > 0) && e.setLineDash(g), e.lineCap = p.cap === "rnd" ? "round" : p.cap === "sq" ? "square" : "butt", e.lineJoin = p.join === "round" || p.join === "bevel" ? p.join : "miter", !0;
}
function qo(e, t, n, r, i, a, o, s, c, l, u, d = !0) {
	let f = Math.max(0, w(t, n)), p = Uo(n.dataPointOverrides), m = R(t, "dataPointLine", f), h = (r, a, f, h, g = !1) => {
		let _ = p.get(a.index);
		Ki(e, X(_?.chartexStyle, n.chartexStyle), m, a.index, l, c, (e) => {
			if (e.save(), Ko(e, t, "dataPointLine", n, _, a.index, o, s, c, l, u, d)) {
				if (e.beginPath(), e.moveTo(r.x, r.y), i && !g) {
					let t = f[h - 1] ?? r, n = f[h + 2] ?? a;
					e.bezierCurveTo(r.x + (a.x - t.x) / 6, r.y + (a.y - t.y) / 6, a.x - (n.x - r.x) / 6, a.y - (n.y - r.y) / 6, a.x, a.y);
				} else e.lineTo(a.x, a.y);
				e.stroke();
			}
			e.restore();
		}, a.index);
	};
	for (let e of r) {
		for (let t = 0; t + 1 < e.length; t++) h(e[t], e[t + 1], e, t);
		a && e.length > 1 && h(e[e.length - 1], e[0], e, e.length - 1, !0);
	}
}
function Jo(e, t) {
	return e?.chartexFormatIdx ?? t;
}
//#endregion
//#region packages/core/src/chart/text-elide.ts
var Yo = "…";
function Xo(e, t, n) {
	if (t === "" || n <= 0) return "";
	if (e.measureText(t).width <= n) return t;
	if (e.measureText(Yo).width > n) return "";
	let r = 0, i = t.length - 1, a = 0;
	for (; r <= i;) {
		let o = r + i >> 1;
		e.measureText(t.slice(0, o) + Yo).width <= n ? (a = o, r = o + 1) : i = o - 1;
	}
	let o = a > 0 ? t.charCodeAt(a - 1) : 0;
	return o >= 55296 && o <= 56319 && a--, t.slice(0, a) + Yo;
}
//#endregion
//#region packages/core/src/chart/axis-scale.ts
function Zo(e, t = {
	min: 0,
	max: 1
}) {
	let n = Infinity, r = -Infinity;
	for (let t of e) t == null || !Number.isFinite(t) || (t < n && (n = t), t > r && (r = t));
	return Number.isFinite(n) && Number.isFinite(r) ? {
		min: n,
		max: r
	} : t;
}
function Qo(e, t = 5) {
	if (e === 0) return 1;
	let n = e / t, r = 10 ** Math.floor(Math.log10(n)), i = n / r;
	return (i < 1.5 ? 1 : i < 3.5 ? 2 : i < 7.5 ? 5 : 10) * r;
}
function $o(e, t, n, r) {
	let i = Number.isFinite(e) ? e : 0, a = Number.isFinite(t) ? t : 100, o = a > i ? a - i : 100, s = i < 0 && a > 0, c = n === "horizontal" || r == null || !Number.isFinite(r) || r < 120 ? s ? 4 : 5 : 10;
	return ns(a > i ? as(i, a, c) : o / c);
}
function es(e, t, n) {
	let r = Number.isFinite(e) ? e : 0, i = Number.isFinite(t) ? t : 1, a = i > r ? null : 1, o = n != null && Number.isFinite(n) ? n < 45 ? 4 : n < 90 ? 8 : 10 : 8;
	return ns(i > r ? as(r, i, o) : (a ?? 1) / o);
}
function ts(e, t, n) {
	let r = Number.isFinite(e) ? e : 0, i = Number.isFinite(t) ? t : 1;
	return ns((i > r ? i - r : 1) / (n != null && Number.isFinite(n) && n > 0 ? Math.max(5, Math.round(n / 28)) : 5));
}
function ns(e) {
	if (!(e > 0) || !isFinite(e)) return 1;
	let t = 10 ** Math.floor(Math.log10(e));
	if (!(t > 0) || !isFinite(t)) return e;
	let n = e / t, r = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
	return Math.min(Number.MAX_VALUE, r * t);
}
function rs(e) {
	return e != null && isFinite(e) ? e : null;
}
function is(e) {
	return e != null && isFinite(e) && e > 0 ? e : null;
}
function as(e, t, n) {
	let r = t - e, i = isFinite(r) ? r / n : t / n - e / n;
	return i > 0 && isFinite(i) ? i : r > 0 && isFinite(r) ? Number.MIN_VALUE : Number.MAX_VALUE;
}
function os(e, t, n) {
	if (!isFinite(e) || !isFinite(t) || !(t >= e) || !(n > 0) || !isFinite(n)) return 0;
	let r = t - e, i = isFinite(r) ? r / n : t / n - e / n;
	return !isFinite(i) || i > 2 ** 53 - 1 ? Infinity : Math.max(1, Math.floor(i + 1e-9) + 1);
}
function ss(e, t, n, r, i) {
	let a = os(e, t, n);
	if (a === 0 || a > 512 && r === "skip") return [];
	let o = Math.min(a, 512), s = [], c = t - e, l = Math.max(Math.abs(n), isFinite(c) ? Math.abs(c) : Math.max(Math.abs(e), Math.abs(t))) * 1e-9, u = -Infinity;
	for (let r = 0; r < o; r++) {
		let a = r * n, o = e + a;
		if ((!isFinite(a) || !isFinite(o) || r > 0 && !(o > u)) && (o = (e / n + r) * n), !isFinite(o) || o > t + l || r > 0 && !(o > u)) break;
		if (u = o, i != null) {
			if (o >= t - l) break;
			let n = o - e, r = isFinite(n) ? n / i : o / i - e / i;
			if (isFinite(r) && Math.abs(r - Math.round(r)) <= 1e-8) continue;
		}
		s.push(o);
	}
	return s;
}
function cs(e) {
	let t = isFinite(e.dataMin) ? e.dataMin : 0, n = isFinite(e.dataMax) ? e.dataMax : 1;
	t > n && ([t, n] = [n, t]);
	let r, i, a;
	if (t === 0 && n === 0) r = 0, i = 1, a = .1;
	else {
		t === n && (t = Math.min(0, t), n = Math.max(0, n));
		let e = t >= 0 && (t === 0 || n > 1.2 * t), o = n <= 0 && (n === 0 || Math.abs(t) > 1.2 * Math.abs(n)), s = e ? 0 : t, c = o ? 0 : n, l = c - s, u = isFinite(l) ? l * .05 : c * .05 - s * .05, d = e ? 0 : t - u, f = o ? 0 : n + u;
		a = ns(f / 10 - d / 10), r = Math.floor(d / a) * a, i = Math.ceil(f / a) * a, (!isFinite(r) || !isFinite(i) || !(i > r)) && (r = Math.min(t, 0), i = Math.max(n, r + a));
	}
	let o = rs(e.explicitMin), s = rs(e.explicitMax), c = is(e.majorUnit), l = o ?? (c == null ? r : Math.floor(r / c) * c), u = s ?? (c == null ? i : Math.ceil(i / c) * c), d = a;
	if (c == null && o != null && s != null && s > o) {
		if (e.axisOrientation === "horizontal") d = ns(as(o, s, e.axisLenPt != null && isFinite(e.axisLenPt) && e.axisLenPt > 0 ? Math.max(5, Math.round(e.axisLenPt / 38)) : 8));
		else if (e.axisOrientation === "vertical") {
			let t = e.axisLenPt != null && isFinite(e.axisLenPt) && e.axisLenPt > 0 ? Math.max(5, Math.round(e.axisLenPt / 28)) : 7;
			d = Math.max(ns(as(o, s, 10)), Math.min(Number.MAX_VALUE, Qo(as(o, s, t), 1)));
		}
	}
	let f = c ?? d;
	c == null && os(l, u, f) > 512 && (f = ns(u / 511 - l / 511));
	let p = is(e.minorUnit);
	e.needMinor && c == null && p == null && os(l, u, f / 5) > 512 && (f = ns(u / 102 - l / 102));
	let m = f / 5, h = e.needMinor ? p ?? (m > 0 && isFinite(m) ? m : f) : null, g = ss(l, u, f, c == null ? "skip" : "truncate"), _ = h == null ? [] : ss(l, u, h, "skip", f);
	return {
		min: l,
		max: u,
		majorUnit: f,
		minorUnit: h,
		majorTicks: g,
		minorTicks: _
	};
}
function ls(e, t, n, r) {
	let i, a = r?.logBase;
	if (a != null && isFinite(a) && a >= 2 && t > 0 && n > 0) {
		let r = Math.log(t), a = Math.log(n) - r;
		i = a === 0 ? 0 : (Math.log(Math.max(e, Number.MIN_VALUE)) - r) / a;
	} else {
		let r = n - t;
		if (r === 0) i = 0;
		else if (Number.isFinite(r) && Number.isFinite(e - t)) i = (e - t) / r;
		else {
			let r = Math.max(Math.abs(e), Math.abs(t), Math.abs(n)), a = n / r - t / r;
			i = a === 0 ? 0 : (e / r - t / r) / a;
		}
	}
	return r?.reversed ? 1 - i : i;
}
function us(e, t, n, r, i) {
	let a = isFinite(n) && n >= 2 ? n : 10, o = (e) => Math.log(e) / Math.log(a), s = t > 0 ? t : 1, c = Math.floor(o(e > 0 ? e : s)), l = Math.ceil(o(s)), u = (e) => {
		let t = a ** +e;
		return t === 0 ? Number.MIN_VALUE : isFinite(t) ? t : Number.MAX_VALUE;
	}, d = r ?? u(c), f = i ?? u(Math.max(l, c + 1)), p = [], m = Math.ceil(o(d) - 1e-9), h = Math.floor(o(f) + 1e-9);
	if (!isFinite(m) || !isFinite(h) || h < m) return {
		min: d,
		max: f,
		lines: p
	};
	let g = h - m + 1, _ = Math.max(1, Math.ceil((g - 1) / 511)), v = Math.min(512, Math.floor((g - 1) / _) + 1);
	for (let e = 0; e < v; e++) {
		let t = u(m + e * _);
		t >= d && t <= f && (p.length === 0 || t > p[p.length - 1]) && p.push(t);
	}
	let y = u(h);
	return p.length < 512 && y >= d && y <= f && y > (p[p.length - 1] ?? 0) && p.push(y), {
		min: d,
		max: f,
		lines: p
	};
}
function ds(e) {
	let t = e.logBase;
	if (t != null && Number.isFinite(t) && t >= 2) {
		let { min: n, max: r, lines: i } = us(e.dataMin, e.dataMax, t, rs(e.explicitMin), rs(e.explicitMax));
		return {
			min: n,
			max: r,
			majorUnit: i.length > 1 ? i[1] - i[0] : r - n,
			minorUnit: null,
			majorTicks: i,
			minorTicks: [],
			fraction: (i) => ls(i, n, r, {
				logBase: t,
				reversed: e.reversed
			})
		};
	}
	let n = cs(e);
	return {
		...n,
		fraction: (t) => ls(t, n.min, n.max, { reversed: e.reversed })
	};
}
function fs(e, t, n) {
	let r = Math.min(e.length, t.length);
	if (r < 2) return null;
	let i = 0, a = 0, o = 0, s = 0;
	for (let n = 0; n < r; n++) i += e[n], a += t[n], o += e[n] * e[n], s += e[n] * t[n];
	let c, l;
	if (n != null && isFinite(n)) c = o === 0 ? 0 : (s - n * i) / o, l = n;
	else {
		let e = r * o - i * i;
		c = e === 0 ? 0 : (r * s - i * a) / e, l = (a - c * i) / r;
	}
	let u = a / r, d = 0, f = 0;
	for (let n = 0; n < r; n++) {
		let r = t[n] - (c * e[n] + l);
		d += r * r;
		let i = t[n] - u;
		f += i * i;
	}
	let p = f === 0 ? +(d === 0) : 1 - d / f;
	return {
		slope: c,
		intercept: l,
		rSquared: p
	};
}
function ps(e, t, n, r) {
	let i = Math.min(e.length, t.length);
	if (i < 2) return {
		xs: [],
		ys: []
	};
	if (n === "linear") {
		let n = fs(e, t, r?.intercept);
		if (!n) return {
			xs: [],
			ys: []
		};
		let a = e[0], o = e[i - 1];
		return {
			xs: [a, o],
			ys: [n.slope * a + n.intercept, n.slope * o + n.intercept]
		};
	}
	if (n === "movingAvg") {
		let n = Math.max(2, Math.round(r?.period ?? 2));
		if (i < n) return {
			xs: [],
			ys: []
		};
		let a = [], o = [], s = 0;
		for (let e = 0; e < n; e++) s += t[e];
		for (let r = n - 1; r < i; r++) {
			a.push(e[r]), o.push(s / n);
			let c = r + 1;
			c < i && (s += t[c] - t[c - n]);
		}
		return {
			xs: a,
			ys: o
		};
	}
	let a = [];
	for (let r = 0; r < i; r++) {
		let i = e[r], o = t[r];
		!Number.isFinite(i) || !Number.isFinite(o) || n === "log" && i <= 0 || n === "exp" && o <= 0 || n === "power" && (i <= 0 || o <= 0) || a.push({
			x: i,
			y: o
		});
	}
	if (a.length < 2) return {
		xs: [],
		ys: []
	};
	let o = Infinity, s = -Infinity;
	for (let e of a) o = Math.min(o, e.x), s = Math.max(s, e.x);
	if (!Number.isFinite(o) || !Number.isFinite(s) || s <= o) return {
		xs: [],
		ys: []
	};
	let c = Number.isFinite(r?.backward) ? Math.max(0, r?.backward ?? 0) : 0, l = Number.isFinite(r?.forward) ? Math.max(0, r?.forward ?? 0) : 0, u = o - c, d = s + l;
	if ((n === "log" || n === "power") && (u = Math.max(Number.MIN_VALUE, u)), !Number.isFinite(u) || !Number.isFinite(d) || d <= u) return {
		xs: [],
		ys: []
	};
	let f = (e) => {
		let t = [], n = [];
		for (let r = 0; r <= 64; r++) {
			let i = r / 64, a = u * (1 - i) + d * i, o = e(a);
			if (!Number.isFinite(a) || !Number.isFinite(o)) return {
				xs: [],
				ys: []
			};
			t.push(a), n.push(o);
		}
		return {
			xs: t,
			ys: n
		};
	};
	if (n === "exp" || n === "log" || n === "power") {
		let e = fs(a.map((e) => n === "log" || n === "power" ? Math.log(e.x) : e.x), a.map((e) => n === "exp" || n === "power" ? Math.log(e.y) : e.y));
		if (!e || ![e.slope, e.intercept].every(Number.isFinite)) return {
			xs: [],
			ys: []
		};
		if (n === "exp") {
			let t = Math.exp(e.intercept);
			return f((n) => t * Math.exp(e.slope * n));
		}
		if (n === "log") return f((t) => e.slope * Math.log(t) + e.intercept);
		let t = Math.exp(e.intercept);
		return f((n) => t * n ** e.slope);
	}
	if (n === "poly") {
		let e = Math.min(6, a.length - 1, Math.max(2, Math.round(r?.order ?? 2)));
		if (e < 2) return {
			xs: [],
			ys: []
		};
		let t = o / 2 + s / 2, n = Math.max(Math.abs(o - t), Math.abs(s - t));
		if (!Number.isFinite(t) || !Number.isFinite(n) || n <= 0) return {
			xs: [],
			ys: []
		};
		let i = a.length, c = e + 1, l = Array.from({ length: c }, () => Array(i).fill(0));
		for (let e = 0; e < i; e++) {
			let r = (a[e].x - t) / n, i = 1;
			for (let t = 0; t < c; t++) l[t][e] = i, i *= r;
		}
		let u = [], d = Array.from({ length: c }, () => Array(c).fill(0)), p = Array(c).fill(0);
		for (let e = 0; e < c; e++) {
			let t = l[e].slice();
			for (let n = 0; n < e; n++) {
				let r = 0;
				for (let e = 0; e < i; e++) r += u[n][e] * t[e];
				d[n][e] = r;
				for (let e = 0; e < i; e++) t[e] -= r * u[n][e];
			}
			let n = 0;
			for (let e of t) n += e * e;
			let r = Math.sqrt(n);
			if (!Number.isFinite(r) || r <= 2 ** -52 * Math.sqrt(i)) return {
				xs: [],
				ys: []
			};
			d[e][e] = r;
			let o = t.map((e) => e / r);
			u.push(o);
			let s = 0;
			for (let e = 0; e < i; e++) s += o[e] * a[e].y;
			if (!Number.isFinite(s)) return {
				xs: [],
				ys: []
			};
			p[e] = s;
		}
		let m = Array(c).fill(0);
		for (let e = c - 1; e >= 0; e--) {
			let t = p[e];
			for (let n = e + 1; n < c; n++) t -= d[e][n] * m[n];
			if (m[e] = t / d[e][e], !Number.isFinite(m[e])) return {
				xs: [],
				ys: []
			};
		}
		return f((r) => {
			let i = (r - t) / n, a = m[e];
			for (let t = e - 1; t >= 0; t--) a = a * i + m[t];
			return a;
		});
	}
	return {
		xs: [],
		ys: []
	};
}
//#endregion
//#region packages/core/src/chart/shared/geometry.ts
function ms(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function hs(e, t, n) {
	if (t.length !== 0) if (n && t.length >= 3) for (let n = 0; n < t.length - 1; n++) {
		let r = t[n - 1] ?? t[n], i = t[n], a = t[n + 1], o = t[n + 2] ?? a, s = i.x + (a.x - r.x) / 6, c = i.y + (a.y - r.y) / 6, l = a.x - (o.x - i.x) / 6, u = a.y - (o.y - i.y) / 6;
		e.bezierCurveTo(s, c, l, u, a.x, a.y);
	}
	else for (let n = 1; n < t.length; n++) e.lineTo(t[n].x, t[n].y);
}
function gs(e, t = 1) {
	return ar(e ?? "solid", Number.isFinite(t) && t > 0 ? t : 1);
}
function _s(e, t, n = 1) {
	return sr(e, t, Number.isFinite(n) && n > 0 ? n : 1);
}
//#endregion
//#region packages/core/src/chart/shared/fonts.ts
function vs(e, t) {
	return t && (t.startsWith("+mj") ? e.themeMajorFontLatin ?? null : t.startsWith("+mn") ? e.themeMinorFontLatin ?? null : t);
}
function ys(e, t, n) {
	let r = n === "major" ? e.themeMajorFontLatin : e.themeMinorFontLatin, i = vs(e, t) ?? r;
	return i ? `"${i}", Calibri, Arial, sans-serif` : "sans-serif";
}
function bs(e, t, n = !1, r = !1) {
	return `${r ? "italic " : ""}${n ? "bold " : ""}${e}px ${t}`;
}
//#endregion
//#region packages/core/src/chart/shared/style-roles.ts
function xs(e, t, n, r = {
	x: 0,
	y: 0,
	w: Math.max(1, e.canvas?.width ?? 1),
	h: Math.max(1, e.canvas?.height ?? 1)
}, i = 0) {
	if (t.hidden === !0 || t.paintAuthored === !0 && t.color == null && t.fill == null) return !1;
	let a = t.fill == null ? t.color == null ? "#000000" : `#${t.color}` : Xr(t.fill, e, r.x, r.y, r.w, r.h, i);
	return a == null ? !1 : (e.strokeStyle = a, e.lineWidth = t.widthEmu == null ? Math.max(1, .75 * n) : co(t.widthEmu, n), e.setLineDash(gs(t.dash ?? void 0, e.lineWidth)), e.lineCap = t.cap === "rnd" ? "round" : t.cap === "sq" ? "square" : "butt", e.lineJoin = t.join === "round" || t.join === "bevel" ? t.join : "miter", !0);
}
function Ss(e, t, n, r) {
	let i = r ? j(j(e.classicChartStyleRoles?.[n], r), e.linkedChartStyleRoles?.[n] ?? (e.classicChartStyleRoles == null ? e.chartStyleRoles?.[n] : void 0)) : e.chartStyleRoles?.[n], a = I(e, n), o = t.paintAuthored === !0 || t.fill != null || t.color != null || t.hidden === !0, s = U(t.style, a, 0), c = t.hidden === !0 ? ge(a) : void 0, l = c === void 0 ? t.fill ?? (t.color ? {
		fillType: "solid",
		color: t.color
	} : s === void 0 ? t.paintAuthored === !0 && t.hidden !== !0 ? null : _e(i, a, 0, t.style) : s) : c, u = D(t.dash == null ? void 0 : {
		lineDash: t.dash,
		lineDashAuthored: !0
	}, t.style, i);
	return {
		style: X(t.style, i),
		fill: l != null && l.fillType !== "solid" ? l : null,
		color: l?.fillType === "solid" ? l.color : null,
		paintAuthored: o ? t.paintAuthored : l === void 0 ? void 0 : !0,
		widthEmu: t.widthEmu ?? t.style?.lineWidthEmu ?? i?.lineWidthEmu ?? null,
		dash: u?.lineDash ?? null,
		cap: t.cap ?? t.style?.lineCap ?? i?.lineCap ?? null,
		join: t.join ?? t.style?.lineJoin ?? i?.lineJoin ?? null,
		hidden: l === null ? !0 : null
	};
}
function Cs(e, t, n, r) {
	let i = r ? {
		fillColors: [n === "upBar" ? r.upFillColor : r.downFillColor],
		fillPaintAuthored: !0,
		lineColors: [r.lineColor],
		linePaintAuthored: !0,
		lineWidthEmu: r.lineWidthEmu
	} : void 0, a = i ? j(j(e.classicChartStyleRoles?.[n], i), e.linkedChartStyleRoles?.[n] ?? (e.classicChartStyleRoles == null ? e.chartStyleRoles?.[n] : void 0)) : e.chartStyleRoles?.[n], o = I(e, n), s = t.fillPaintAuthored === !0 || t.fillColor != null || t.fill != null || t.fillHidden === !0, c = t.linePaintAuthored === !0 || t.lineColor != null || t.lineHidden === !0, l = H(t.style, o, 0), u = U(t.style, o, 0), d = t.fillHidden === !0 ? W(o) : void 0, f = t.lineHidden === !0 ? ge(o) : void 0, p = d === void 0 ? t.fill == null ? t.fillColor == null ? l === void 0 ? t.fillPaintAuthored === !0 && t.fillHidden !== !0 ? null : G(a, o, 0, t.style) : l : {
		fillType: "solid",
		color: t.fillColor
	} : t.fill : d, m = f === void 0 ? t.lineColor ? {
		fillType: "solid",
		color: t.lineColor
	} : u === void 0 ? t.linePaintAuthored === !0 && t.lineHidden !== !0 ? null : _e(a, o, 0, t.style) : u : f;
	return {
		style: X(t.style, a),
		fillColor: p?.fillType === "solid" ? p.color : null,
		fill: p != null && p.fillType !== "solid" && p.fillType !== "none" ? p : null,
		fillPaintAuthored: s ? t.fillPaintAuthored : p === void 0 ? void 0 : !0,
		fillHidden: p === null ? !0 : null,
		lineColor: m?.fillType === "solid" ? m.color : null,
		linePaintAuthored: c ? t.linePaintAuthored : m === void 0 ? void 0 : !0,
		lineWidthEmu: t.lineWidthEmu ?? a?.lineWidthEmu ?? null,
		lineDash: t.lineDash ?? a?.lineDash ?? null,
		lineCap: t.lineCap ?? a?.lineCap ?? null,
		lineJoin: t.lineJoin ?? a?.lineJoin ?? null,
		lineHidden: m === null ? !0 : null
	};
}
function ws(e, t, n, r, i, a, o) {
	for (let s = 0; s < n; s++) {
		let n = Infinity, c = -Infinity, l = !1;
		for (let e of t) {
			let t = o(e, s);
			if (t == null || !Number.isFinite(t)) continue;
			let r = i(e)(t), u = a(e);
			!Number.isFinite(r) || !Number.isFinite(u) || (n = Math.min(n, r, u), c = Math.max(c, r, u), l = !0);
		}
		!l || Math.abs(c - n) < .01 || (e.beginPath(), e.moveTo(r(s), n), e.lineTo(r(s), c), e.stroke());
	}
}
function Ts(e, t) {
	let n = Ss(e, {
		style: t.style,
		color: t.color,
		paintAuthored: t.linePaintAuthored,
		widthEmu: t.lineWidthEmu,
		dash: t.dash,
		hidden: t.hidden
	}, "errorBar");
	return {
		...t,
		color: n.color ?? void 0,
		lineWidthEmu: n.widthEmu ?? void 0,
		dash: n.dash ?? void 0,
		hidden: n.hidden ?? void 0,
		linePaintAuthored: n.paintAuthored
	};
}
function Es(e, t) {
	return Ss(e, {
		style: t.leaderLineStyle,
		color: t.leaderLineColor,
		paintAuthored: t.leaderLinePaintAuthored,
		widthEmu: t.leaderLineWidthEmu,
		dash: t.leaderLineDash,
		hidden: t.leaderLineHidden
	}, "leaderLine");
}
function Ds(e, t) {
	let n = Ss(e, {
		style: t.style,
		color: t.lineColor,
		paintAuthored: t.linePaintAuthored,
		widthEmu: t.lineWidthEmu,
		dash: t.lineDash,
		hidden: t.lineHidden
	}, "trendline");
	return {
		...t,
		lineColor: n.color ?? void 0,
		lineWidthEmu: n.widthEmu ?? void 0,
		lineDash: n.dash ?? void 0,
		lineHidden: n.hidden ?? void 0,
		linePaintAuthored: n.paintAuthored
	};
}
function Os(e, t) {
	let n = e.chartStyleRoles?.dataTable, r = I(e, "dataTable"), i = Ss(e, {
		style: t.style,
		color: t.lineColor,
		paintAuthored: t.linePaintAuthored,
		widthEmu: t.lineWidthEmu,
		dash: t.lineDash,
		hidden: t.lineHidden
	}, "dataTable"), a = H(t.style, r, 0), o = t.fillHidden === !0 ? W(r) : void 0, s = o === void 0 ? t.fill ?? (t.fillColor ? {
		fillType: "solid",
		color: t.fillColor
	} : a === void 0 ? t.fillPaintAuthored === !0 && t.fillHidden !== !0 ? null : G(n, r, 0, t.style) : a) : o, c = s != null && s.fillType !== "solid" && s.fillType !== "image" && s.fillType !== "none" ? s : null, l = s?.fillType === "solid" ? s.color : null, u = s === null ? !0 : null, d = t.fillPaintAuthored ?? (s === void 0 ? void 0 : !0), f = Q(e, t.fontColor, t.fontPaintAuthored, n);
	return {
		...t,
		fontSizeHpt: t.fontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? n?.fontSizeHpt,
		fontBold: t.fontBold ?? e.chartTextStyle?.fontBold ?? n?.fontBold,
		fontItalic: t.fontItalic ?? e.chartTextStyle?.fontItalic ?? n?.fontItalic,
		fontColor: f.color ?? void 0,
		fontPaintAuthored: f.authored,
		fontHidden: t.fontPaintAuthored === !0 ? t.fontHidden : n?.fontHidden,
		fontFace: t.fontFace ?? e.chartTextStyle?.fontFace ?? n?.fontFace,
		fill: c,
		fillColor: l,
		fillHidden: u,
		fillPaintAuthored: d,
		lineColor: i.color ?? void 0,
		lineWidthEmu: i.widthEmu ?? void 0,
		lineDash: i.dash ?? void 0,
		lineHidden: i.hidden ?? void 0,
		linePaintAuthored: i.paintAuthored
	};
}
function ks(e, t, n, r, i, a, o, s) {
	if (n !== !0) return {
		visible: n,
		color: r,
		widthEmu: i,
		dash: a,
		paintAuthored: o
	};
	let c = Ss(e, {
		style: s,
		color: r,
		widthEmu: i,
		dash: a,
		paintAuthored: o
	}, t);
	return {
		visible: c.hidden !== !0 && !(c.paintAuthored === !0 && c.color == null),
		color: c.color,
		widthEmu: c.widthEmu,
		dash: c.dash,
		paintAuthored: c.paintAuthored
	};
}
function As(e, t) {
	if (!t || !e.chartStyleRoles?.gridlineMajor && !e.chartStyleRoles?.gridlineMinor) return t;
	let n = ks(e, "gridlineMajor", t.majorGridlines, t.majorGridlineColor, t.majorGridlineWidthEmu, t.majorGridlineDash, t.majorGridlinePaintAuthored, t.majorGridlineStyle), r = ks(e, "gridlineMinor", t.minorGridlines, t.minorGridlineColor, t.minorGridlineWidthEmu, t.minorGridlineDash, t.minorGridlinePaintAuthored, t.minorGridlineStyle);
	return n.visible !== t.majorGridlines || n.color !== t.majorGridlineColor || n.widthEmu !== t.majorGridlineWidthEmu || n.dash !== t.majorGridlineDash || n.paintAuthored !== t.majorGridlinePaintAuthored || r.visible !== t.minorGridlines || r.color !== t.minorGridlineColor || r.widthEmu !== t.minorGridlineWidthEmu || r.dash !== t.minorGridlineDash || r.paintAuthored !== t.minorGridlinePaintAuthored ? {
		...t,
		majorGridlines: n.visible ?? void 0,
		majorGridlineColor: n.color,
		majorGridlineWidthEmu: n.widthEmu,
		majorGridlineDash: n.dash,
		majorGridlinePaintAuthored: n.paintAuthored,
		minorGridlines: r.visible ?? void 0,
		minorGridlineColor: r.color,
		minorGridlineWidthEmu: r.widthEmu,
		minorGridlineDash: r.dash,
		minorGridlinePaintAuthored: r.paintAuthored
	} : t;
}
function js(e, t, n, r, i, a, o, s) {
	return Ss(e, {
		style: s,
		color: n,
		widthEmu: r,
		dash: i,
		paintAuthored: o,
		hidden: a ? !0 : void 0
	}, t);
}
function Ms(e) {
	return e.hidden === !0 || e.paintAuthored === !0 && e.color == null;
}
function Ns(e, t, n) {
	let r = e.chartStyleRoles?.[n];
	if (!t || !r && !e.chartTextStyle) return t;
	let i = js(e, n, t.lineColor, t.lineWidthEmu, t.lineDash, t.lineHidden, t.linePaintAuthored, t.style), a = Ms(i), o = t.fontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? r?.fontSizeHpt, s = t.fontBold ?? e.chartTextStyle?.fontBold ?? r?.fontBold, c = t.fontItalic ?? e.chartTextStyle?.fontItalic ?? r?.fontItalic, l = Q(e, t.fontColor, t.fontPaintAuthored, r), u = l.color, d = t.fontFace ?? e.chartTextStyle?.fontFace ?? r?.fontFace, f = e.chartStyleRoles?.axisTitle, p = t.titleFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? f?.fontSizeHpt, m = t.titleFontBold ?? e.chartTextStyle?.fontBold ?? f?.fontBold, h = t.titleFontItalic ?? e.chartTextStyle?.fontItalic ?? f?.fontItalic, g = Q(e, t.titleFontColor, t.titleFontPaintAuthored, f), _ = g.color, v = t.titleFontFace ?? e.chartTextStyle?.fontFace ?? f?.fontFace;
	return i.color === t.lineColor && i.widthEmu === t.lineWidthEmu && i.dash === t.lineDash && a === t.lineHidden && o === t.fontSizeHpt && s === t.fontBold && c === t.fontItalic && u === t.fontColor && l.authored === t.fontPaintAuthored && d === t.fontFace && p === t.titleFontSizeHpt && m === t.titleFontBold && h === t.titleFontItalic && _ === t.titleFontColor && g.authored === t.titleFontPaintAuthored && v === t.titleFontFace ? t : {
		...t,
		lineColor: i.color,
		lineWidthEmu: i.widthEmu,
		lineDash: i.dash,
		linePaintAuthored: i.paintAuthored,
		lineHidden: a,
		fontSizeHpt: o,
		fontBold: s,
		fontItalic: c,
		fontColor: u,
		fontPaintAuthored: l.authored,
		fontFace: d,
		titleFontSizeHpt: p,
		titleFontBold: m,
		titleFontItalic: h,
		titleFontColor: _,
		titleFontPaintAuthored: g.authored,
		titleFontFace: v
	};
}
function Ps(e) {
	let t = e.threeD?.seriesAxis, n = e.chartStyleRoles?.seriesAxis;
	if (!t || !n && !e.chartTextStyle) return e;
	let r = Ss(e, {
		style: t.style,
		color: t.lineColor,
		widthEmu: t.lineWidthEmu,
		dash: t.lineDash,
		hidden: t.lineHidden ? !0 : void 0,
		paintAuthored: t.linePaintAuthored
	}, "seriesAxis"), i = Ms(r), a = t.fontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? n?.fontSizeHpt, o = t.fontBold ?? e.chartTextStyle?.fontBold ?? n?.fontBold, s = t.fontItalic ?? e.chartTextStyle?.fontItalic ?? n?.fontItalic, c = Q(e, t.fontColor, t.fontPaintAuthored, n), l = c.color, u = t.fontFace ?? e.chartTextStyle?.fontFace ?? n?.fontFace, d = e.chartStyleRoles?.axisTitle, f = t.titleFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? d?.fontSizeHpt, p = t.titleFontBold ?? e.chartTextStyle?.fontBold ?? d?.fontBold, m = t.titleFontItalic ?? e.chartTextStyle?.fontItalic ?? d?.fontItalic, h = Q(e, t.titleFontColor, t.titleFontPaintAuthored, d), g = h.color, _ = t.titleFontFace ?? e.chartTextStyle?.fontFace ?? d?.fontFace;
	return r.color === t.lineColor && r.widthEmu === t.lineWidthEmu && r.dash === t.lineDash && i === t.lineHidden && a === t.fontSizeHpt && o === t.fontBold && s === t.fontItalic && l === t.fontColor && c.authored === t.fontPaintAuthored && u === t.fontFace && f === t.titleFontSizeHpt && p === t.titleFontBold && m === t.titleFontItalic && g === t.titleFontColor && h.authored === t.titleFontPaintAuthored && _ === t.titleFontFace ? e : {
		...e,
		threeD: {
			...e.threeD,
			seriesAxis: {
				...t,
				lineColor: r.color,
				lineWidthEmu: r.widthEmu,
				lineDash: r.dash,
				lineHidden: i,
				fontSizeHpt: a,
				fontBold: o,
				fontItalic: s,
				fontColor: l,
				fontPaintAuthored: c.authored,
				fontFace: u,
				titleFontSizeHpt: f,
				titleFontBold: p,
				titleFontItalic: m,
				titleFontColor: g,
				titleFontPaintAuthored: h.authored,
				titleFontFace: _
			}
		}
	};
}
function Fs(e, t, n) {
	if (n?.kind === "bubble" || n == null && e.chartType === "bubble") return !1;
	let r = n?.kind === "scatter" ? "scatter" : t.seriesType ?? e.chartType;
	return r === "line" || r === "stackedLine" || r === "stackedLinePct" || r === "area" || r === "stackedArea" || r === "stackedAreaPct" || r === "scatter" || r === "radar" || r === "stock";
}
function Is(e, t, n, r, i) {
	let a = L(e, n) ? void 0 : e.chartStyleRoles?.dataPointMarker, o = L(e, n) ? void 0 : I(e, "dataPointMarker");
	if (!Fs(e, t, i) || (t.showMarker === !1 || t.markerSymbol === "none") && !Ft(t)) return t;
	let s = Jo(t, n), c = H(t.markerStyle, o, s), l = t.markerFillPaintAuthored === !0 && t.markerStyle?.fillHidden !== !0 || t.markerFill != null || t.markerFillPaint !== void 0 || c !== void 0, u = l ? c : G(a, o, s, t.markerStyle), d = t.markerFill ?? (u?.fillType === "solid" ? u.color : u === null ? "00000000" : null), f = t.markerFillPaint === void 0 ? u?.fillType === "gradient" || u?.fillType === "pattern" || u?.fillType === "image" ? u : void 0 : t.markerFillPaint, p = l ? t.markerFillPaintAuthored : u === void 0 ? void 0 : !0, m = U(t.markerStyle, o, s), h = t.markerLine != null || t.markerLinePaintAuthored === !0 && t.markerStyle?.lineHidden !== !0 || m !== void 0, g = h ? m : _e(a, o, s, t.markerStyle), _ = t.markerLine ?? (g?.fillType === "solid" ? g.color : g === null || h ? "00000000" : null), v = t.markerLineWidthEmu ?? t.markerStyle?.lineWidthEmu ?? a?.lineWidthEmu ?? null, y = t.markerSize ?? e.chartStyleMarkerSizePt, b = t.markerSymbol ?? e.chartStyleMarkerSymbol, x = t.dataPointOverrides?.map((e) => {
		if (!Dt(e)) return e;
		let n = H(e.markerStyle, o, e.idx), r = U(e.markerStyle, o, e.idx), i = e.markerFillPaintAuthored === !0 && e.markerStyle?.fillHidden !== !0 || e.markerFill != null || e.markerFillPaint !== void 0 || n !== void 0, c = e.markerLine != null || e.markerLinePaintAuthored === !0 && e.markerStyle?.lineHidden !== !0 || r !== void 0, d = i ? void 0 : l ? u : G(a, o, s, t.markerStyle), f = e.markerFill ?? (n?.fillType === "solid" ? n.color : n === null ? "00000000" : void 0) ?? (d?.fillType === "solid" ? d.color : d === null ? "00000000" : void 0), p = e.markerFillPaint === void 0 ? n?.fillType === "gradient" || n?.fillType === "pattern" || n?.fillType === "image" ? n : d?.fillType === "gradient" || d?.fillType === "pattern" || d?.fillType === "image" ? d : void 0 : e.markerFillPaint, m = e.markerLine ?? (r?.fillType === "solid" ? r.color : r === null ? "00000000" : void 0) ?? (c ? "00000000" : g?.fillType === "solid" ? g.color : g === null ? "00000000" : void 0), _ = e.markerLineWidthEmu ?? e.markerStyle?.lineWidthEmu ?? (!c && !h ? a?.lineWidthEmu ?? void 0 : void 0);
		return f === e.markerFill && p === e.markerFillPaint && m === e.markerLine && _ === e.markerLineWidthEmu ? e : {
			...e,
			markerFill: f,
			markerFillPaint: p,
			markerFillPaintAuthored: e.markerFillPaintAuthored ?? (d === void 0 ? void 0 : !0),
			markerLine: m,
			markerLinePaintAuthored: c ? e.markerLinePaintAuthored : void 0,
			markerLineWidthEmu: _
		};
	});
	return d === t.markerFill && f === t.markerFillPaint && p === t.markerFillPaintAuthored && _ === t.markerLine && v === t.markerLineWidthEmu && y === t.markerSize && b === t.markerSymbol && x?.every((e, n) => e === t.dataPointOverrides?.[n]) !== !1 ? t : {
		...t,
		markerFill: d,
		markerFillPaint: f,
		markerFillPaintAuthored: p,
		markerLine: _,
		markerLinePaintAuthored: h ? t.markerLinePaintAuthored : void 0,
		markerLineWidthEmu: v,
		markerSize: y,
		markerSymbol: b,
		dataPointOverrides: x
	};
}
function Ls(e, t, n, r, i = 0, a = i) {
	if (!n) return t;
	let { color: o, fill: s, hidden: c } = t, l = c === !0 ? ge(r) : void 0, u = U(t.style, r, i), d = s != null || o != null || l !== void 0 || u !== void 0 || t.paintAuthored === !0 && c !== !0, f = n.lineNoStyle !== !0 && (n.linePaintAuthored === !0 || n.lineHidden === !0 || n.linePaints != null || n.lineColors != null);
	if (!d) {
		let e = V(n, a);
		e === null ? c = !0 : e?.fillType === "solid" ? (o = e.color, s = null, c = null) : e !== void 0 && (s = e, o = null, c = null);
	} else if (l !== void 0) c = !0, o = null, s = null;
	else if (s != null || o != null) c = null;
	else if (s == null && o == null) {
		let e = u === void 0 ? t.paintAuthored === !0 ? null : void 0 : u;
		e === null ? c = !0 : e?.fillType === "solid" ? (o = e.color, s = null, c = null) : e !== void 0 && (s = e, o = null, c = null);
	}
	let p = t.dash, m = t.customDash, h = t.dashAuthored;
	return h !== !0 && p == null && m == null && (p = n.lineDash, m = n.lineCustomDash, h = n.lineDashAuthored), {
		color: o,
		fill: s,
		hidden: c,
		paintAuthored: d || f ? !0 : t.paintAuthored,
		widthEmu: t.widthEmu ?? t.style?.lineWidthEmu ?? n.lineWidthEmu,
		dash: p,
		dashAuthored: h,
		customDash: m,
		cap: t.cap ?? t.style?.lineCap ?? n.lineCap,
		join: t.join ?? t.style?.lineJoin ?? n.lineJoin,
		compound: t.compound ?? t.style?.lineCompound ?? n.lineCompound
	};
}
function Rs(e, t, n, r, i, a = 0) {
	if (!n || !t && !i) return t ?? void 0;
	let o = t ?? {}, s = ja(o, n, r, i, 0, a), c = Ls(e, {
		style: o.style,
		color: o.borderColor,
		fill: o.borderFill,
		widthEmu: o.borderWidthEmu,
		dash: o.borderDash,
		dashAuthored: o.borderDashAuthored,
		customDash: o.borderCustomDash,
		cap: o.borderCap,
		join: o.borderJoin,
		compound: o.borderCompound,
		hidden: o.borderHidden,
		paintAuthored: o.borderPaintAuthored
	}, n, r, 0, a);
	return {
		...o,
		style: o.style,
		effectFallbackStyle: n,
		effectStyleIndex: 0,
		effectFallbackIndex: a,
		...s,
		borderColor: c.color ?? void 0,
		borderFill: c.fill ?? void 0,
		borderWidthEmu: c.widthEmu ?? void 0,
		borderDash: c.dash ?? void 0,
		borderDashAuthored: c.dashAuthored ?? void 0,
		borderCustomDash: c.customDash ?? void 0,
		borderCap: c.cap ?? void 0,
		borderJoin: c.join ?? void 0,
		borderCompound: c.compound ?? void 0,
		borderHidden: c.hidden ?? void 0,
		borderPaintAuthored: c.paintAuthored ?? void 0
	};
}
function zs(e, t, n) {
	let r = Ma(t.labelBox), i = r ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, a = r ? I(e, "dataLabelCallout") ?? I(e, "dataLabel") : I(e, "dataLabel"), o = i ? Rs(e, t.labelBox, i, a, !0, n) : t.labelBox, s = t.fontPaintAuthored === !0 || t.fontColor != null || t.fontHidden === !0, c = Q(e, t.fontColor, t.fontPaintAuthored, i, n);
	return {
		...t,
		fontSizeHpt: t.fontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? i?.fontSizeHpt ?? void 0,
		fontBold: t.fontBold ?? e.chartTextStyle?.fontBold ?? i?.fontBold ?? void 0,
		fontItalic: t.fontItalic ?? e.chartTextStyle?.fontItalic ?? i?.fontItalic ?? void 0,
		fontColor: c.color ?? void 0,
		fontPaintAuthored: c.authored,
		fontHidden: s ? t.fontHidden : e.chartTextStyle?.fontHidden ?? i?.fontHidden ?? void 0,
		fontFace: t.fontFace ?? e.chartTextStyle?.fontFace ?? i?.fontFace ?? void 0,
		fontLanguage: t.fontLanguage ?? e.chartTextStyle?.fontLanguage ?? i?.fontLanguage ?? void 0,
		fontBaseline: t.fontBaseline ?? e.chartTextStyle?.fontBaseline ?? i?.fontBaseline ?? void 0,
		textRotation: t.textRotation ?? e.chartTextStyle?.textRotation ?? i?.textRotation ?? void 0,
		textWrap: t.textWrap ?? e.chartTextStyle?.textWrap ?? i?.textWrap ?? void 0,
		textVerticalAnchor: t.textVerticalAnchor ?? e.chartTextStyle?.textVerticalAnchor ?? i?.textVerticalAnchor ?? void 0,
		textVerticalMode: t.textVerticalMode ?? e.chartTextStyle?.textVerticalMode ?? i?.textVerticalMode ?? void 0,
		textLInsEmu: t.textLInsEmu ?? e.chartTextStyle?.textLInsEmu ?? i?.textLInsEmu ?? void 0,
		textTInsEmu: t.textTInsEmu ?? e.chartTextStyle?.textTInsEmu ?? i?.textTInsEmu ?? void 0,
		textRInsEmu: t.textRInsEmu ?? e.chartTextStyle?.textRInsEmu ?? i?.textRInsEmu ?? void 0,
		textBInsEmu: t.textBInsEmu ?? e.chartTextStyle?.textBInsEmu ?? i?.textBInsEmu ?? void 0,
		textBodyAuthored: t.textBodyAuthored === !0 || e.chartTextStyle?.textBodyAuthored === !0 || i?.textBodyAuthored === !0 || void 0,
		labelBox: o
	};
}
function Bs(e, t, n) {
	let r = e.chartStyleRoles?.trendlineLabel, i = I(e, "trendlineLabel"), a = t.labelFontPaintAuthored === !0 || t.labelFontColor != null || t.labelFontHidden === !0, o = Q(e, t.labelFontColor, t.labelFontPaintAuthored, r, n);
	return {
		...t,
		labelBox: r ? Rs(e, t.labelBox, r, i, !0, n) : t.labelBox,
		labelFontSizeHpt: t.labelFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? r?.fontSizeHpt ?? void 0,
		labelFontBold: t.labelFontBold ?? e.chartTextStyle?.fontBold ?? r?.fontBold ?? void 0,
		labelFontItalic: t.labelFontItalic ?? e.chartTextStyle?.fontItalic ?? r?.fontItalic ?? void 0,
		labelFontColor: o.color ?? void 0,
		labelFontPaintAuthored: o.authored,
		labelFontHidden: a ? t.labelFontHidden : e.chartTextStyle?.fontHidden ?? r?.fontHidden ?? void 0,
		labelFontFace: t.labelFontFace ?? e.chartTextStyle?.fontFace ?? r?.fontFace ?? void 0,
		labelFontLanguage: t.labelFontLanguage ?? e.chartTextStyle?.fontLanguage ?? r?.fontLanguage ?? void 0,
		labelFontBaseline: t.labelFontBaseline ?? e.chartTextStyle?.fontBaseline ?? r?.fontBaseline ?? void 0,
		labelTextRotation: t.labelTextRotation ?? e.chartTextStyle?.textRotation ?? r?.textRotation ?? void 0,
		labelTextWrap: t.labelTextWrap ?? e.chartTextStyle?.textWrap ?? r?.textWrap ?? void 0,
		labelTextVerticalAnchor: t.labelTextVerticalAnchor ?? e.chartTextStyle?.textVerticalAnchor ?? r?.textVerticalAnchor ?? void 0,
		labelTextVerticalMode: t.labelTextVerticalMode ?? e.chartTextStyle?.textVerticalMode ?? r?.textVerticalMode ?? void 0,
		labelTextLInsEmu: t.labelTextLInsEmu ?? e.chartTextStyle?.textLInsEmu ?? r?.textLInsEmu ?? void 0,
		labelTextTInsEmu: t.labelTextTInsEmu ?? e.chartTextStyle?.textTInsEmu ?? r?.textTInsEmu ?? void 0,
		labelTextRInsEmu: t.labelTextRInsEmu ?? e.chartTextStyle?.textRInsEmu ?? r?.textRInsEmu ?? void 0,
		labelTextBInsEmu: t.labelTextBInsEmu ?? e.chartTextStyle?.textBInsEmu ?? r?.textBInsEmu ?? void 0,
		labelTextBodyAuthored: t.labelTextBodyAuthored === !0 || e.chartTextStyle?.textBodyAuthored === !0 || r?.textBodyAuthored === !0 || void 0
	};
}
function Vs(e, t, n) {
	let r = Na(t.labelBox, n?.labelBox), i = Ma(r), a = i ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, o = i ? I(e, "dataLabelCallout") ?? I(e, "dataLabel") : I(e, "dataLabel"), s = a ? Rs(e, r, a, o, !0, t.idx) : r, c = t.fontPaintAuthored === !0 || t.fontColor != null || t.fontHidden === !0, l = n?.fontPaintAuthored === !0 || n?.fontColor != null || n?.fontHidden === !0, u = Q(e, c ? t.fontColor : l ? n?.fontColor : void 0, c ? t.fontPaintAuthored : n?.fontPaintAuthored, a, t.idx);
	return {
		...t,
		fontSizeHpt: t.fontSizeHpt ?? n?.fontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? a?.fontSizeHpt ?? void 0,
		fontBold: t.fontBold ?? n?.fontBold ?? e.chartTextStyle?.fontBold ?? a?.fontBold ?? void 0,
		fontItalic: t.fontItalic ?? n?.fontItalic ?? e.chartTextStyle?.fontItalic ?? a?.fontItalic ?? void 0,
		fontColor: u.color ?? void 0,
		fontPaintAuthored: u.authored,
		fontHidden: c ? t.fontHidden : l ? n?.fontHidden : e.chartTextStyle?.fontHidden ?? a?.fontHidden ?? void 0,
		fontFace: t.fontFace ?? n?.fontFace ?? e.chartTextStyle?.fontFace ?? a?.fontFace ?? void 0,
		fontLanguage: t.fontLanguage ?? n?.fontLanguage ?? e.chartTextStyle?.fontLanguage ?? a?.fontLanguage ?? void 0,
		fontBaseline: t.fontBaseline ?? n?.fontBaseline ?? e.chartTextStyle?.fontBaseline ?? a?.fontBaseline ?? void 0,
		textRotation: t.textRotation ?? n?.textRotation ?? e.chartTextStyle?.textRotation ?? a?.textRotation ?? void 0,
		textWrap: t.textWrap ?? n?.textWrap ?? e.chartTextStyle?.textWrap ?? a?.textWrap ?? void 0,
		textVerticalAnchor: t.textVerticalAnchor ?? n?.textVerticalAnchor ?? e.chartTextStyle?.textVerticalAnchor ?? a?.textVerticalAnchor ?? void 0,
		textVerticalMode: t.textVerticalMode ?? n?.textVerticalMode ?? e.chartTextStyle?.textVerticalMode ?? a?.textVerticalMode ?? void 0,
		textLInsEmu: t.textLInsEmu ?? n?.textLInsEmu ?? e.chartTextStyle?.textLInsEmu ?? a?.textLInsEmu ?? void 0,
		textTInsEmu: t.textTInsEmu ?? n?.textTInsEmu ?? e.chartTextStyle?.textTInsEmu ?? a?.textTInsEmu ?? void 0,
		textRInsEmu: t.textRInsEmu ?? n?.textRInsEmu ?? e.chartTextStyle?.textRInsEmu ?? a?.textRInsEmu ?? void 0,
		textBInsEmu: t.textBInsEmu ?? n?.textBInsEmu ?? e.chartTextStyle?.textBInsEmu ?? a?.textBInsEmu ?? void 0,
		textBodyAuthored: t.textBodyAuthored === !0 || n?.textBodyAuthored === !0 || e.chartTextStyle?.textBodyAuthored === !0 || a?.textBodyAuthored === !0 || void 0,
		textAlign: t.textAlign ?? n?.textAlign,
		labelBox: s
	};
}
function Hs(e) {
	let t = e.chartStyleRoles?.legend, n = I(e, "legend");
	if (!t && !e.chartTextStyle) return e;
	let r = e.legendFill, i = e.legendFillColor, a = e.legendFillHidden, o = e.legendFillPaintAuthored, s = a === !0 ? W(n) : void 0;
	if (!(r != null || i != null || s !== void 0 || e.legendFillPaintAuthored === !0 && a !== !0)) {
		let s = G(t, n, 0, e.legendStyle);
		s === null ? a = !0 : s?.fillType === "solid" ? (i = s.color, r = null, a = null) : s !== void 0 && (r = s, i = null, a = null), s !== void 0 && (o = !0);
	}
	let c = Ls(e, {
		style: e.legendStyle,
		color: e.legendLineColor,
		fill: e.legendLineFill,
		widthEmu: e.legendLineWidthEmu,
		dash: e.legendLineDash,
		dashAuthored: e.legendLineDashAuthored,
		customDash: e.legendLineCustomDash,
		cap: e.legendLineCap,
		join: e.legendLineJoin,
		compound: e.legendLineCompound,
		hidden: e.legendLineHidden,
		paintAuthored: e.legendLinePaintAuthored
	}, t, I(e, "legend")), l = Q(e, e.legendFontColor, e.legendFontPaintAuthored, t);
	return r === e.legendFill && i === e.legendFillColor && a === e.legendFillHidden && o === e.legendFillPaintAuthored && c.color === e.legendLineColor && c.fill === e.legendLineFill && c.widthEmu === e.legendLineWidthEmu && c.dash === e.legendLineDash && c.dashAuthored === e.legendLineDashAuthored && c.customDash === e.legendLineCustomDash && c.cap === e.legendLineCap && c.join === e.legendLineJoin && c.compound === e.legendLineCompound && c.hidden === e.legendLineHidden && c.paintAuthored === e.legendLinePaintAuthored && (e.legendFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? t?.fontSizeHpt) === e.legendFontSizeHpt && (e.legendFontBold ?? e.chartTextStyle?.fontBold ?? t?.fontBold) === e.legendFontBold && (e.legendFontItalic ?? e.chartTextStyle?.fontItalic ?? t?.fontItalic) === e.legendFontItalic && (e.legendFontLanguage ?? e.chartTextStyle?.fontLanguage ?? t?.fontLanguage) === e.legendFontLanguage && (e.legendFontBaseline ?? e.chartTextStyle?.fontBaseline ?? t?.fontBaseline) === e.legendFontBaseline && l.color === e.legendFontColor && l.authored === e.legendFontPaintAuthored && (e.legendFontFace ?? e.chartTextStyle?.fontFace ?? t?.fontFace) === e.legendFontFace ? e : {
		...e,
		legendFontSizeHpt: e.legendFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? t?.fontSizeHpt,
		legendFontBold: e.legendFontBold ?? e.chartTextStyle?.fontBold ?? t?.fontBold,
		legendFontItalic: e.legendFontItalic ?? e.chartTextStyle?.fontItalic ?? t?.fontItalic,
		legendFontLanguage: e.legendFontLanguage ?? e.chartTextStyle?.fontLanguage ?? t?.fontLanguage,
		legendFontBaseline: e.legendFontBaseline ?? e.chartTextStyle?.fontBaseline ?? t?.fontBaseline,
		legendFontColor: l.color,
		legendFontPaintAuthored: l.authored,
		legendFontFace: e.legendFontFace ?? e.chartTextStyle?.fontFace ?? t?.fontFace,
		legendFill: r,
		legendFillColor: i,
		legendFillHidden: a,
		legendFillPaintAuthored: o,
		legendLineColor: c.color,
		legendLineFill: c.fill,
		legendLineWidthEmu: c.widthEmu,
		legendLineDash: c.dash,
		legendLineDashAuthored: c.dashAuthored,
		legendLineCustomDash: c.customDash,
		legendLineCap: c.cap,
		legendLineJoin: c.join,
		legendLineCompound: c.compound,
		legendLineHidden: c.hidden,
		legendLinePaintAuthored: c.paintAuthored
	};
}
function Us(e, t, n, r = 0) {
	return t === !0 || e != null ? {
		color: e ?? "00000000",
		authored: !0
	} : n && (n.fontPaintAuthored === !0 || n.fontColor != null || n.fontColors != null || n.fontHidden === !0) ? {
		color: n.fontHidden === !0 ? "00000000" : se(n, r) ?? "00000000",
		authored: !0
	} : {
		color: e,
		authored: void 0
	};
}
function Q(e, t, n, r, i = 0) {
	let a = Us(t, n, e.chartTextStyle, i);
	return a.authored === !0 || a.color != null ? a : Us(t, n, r, i);
}
function Ws(e) {
	let t = e.threeD ? e.chartStyleRoles?.plotArea3D : e.chartStyleRoles?.plotArea, n = I(e, e.threeD ? "plotArea3D" : "plotArea");
	if (!t) return e;
	let r = e.plotAreaFill, i = e.plotAreaBg, a = e.plotAreaFillHidden, o = e.plotAreaFillPaintAuthored, s = a === !0 ? W(n) : void 0;
	if (!((r != null || i != null) && e.plotAreaFillAutomatic !== !0 || s !== void 0 || e.plotAreaFillPaintAuthored === !0 && a !== !0)) {
		let s = G(t, n, 0, e.plotAreaStyle);
		s === null ? a = !0 : s?.fillType === "solid" ? (i = s.color, r = null, a = null) : s !== void 0 && (r = s, i = null, a = null), s !== void 0 && (o = !0);
	}
	let c = Ls(e, {
		style: e.plotAreaStyle,
		color: e.plotAreaLineColor,
		fill: e.plotAreaLineFill,
		widthEmu: e.plotAreaLineWidthEmu,
		dash: e.plotAreaLineDash,
		dashAuthored: e.plotAreaLineDashAuthored,
		customDash: e.plotAreaLineCustomDash,
		cap: e.plotAreaLineCap,
		join: e.plotAreaLineJoin,
		compound: e.plotAreaLineCompound,
		hidden: e.plotAreaLineHidden,
		paintAuthored: e.plotAreaLinePaintAuthored
	}, t, I(e, e.threeD ? "plotArea3D" : "plotArea"));
	return r === e.plotAreaFill && i === e.plotAreaBg && a === e.plotAreaFillHidden && o === e.plotAreaFillPaintAuthored && c.color === e.plotAreaLineColor && c.fill === e.plotAreaLineFill && c.widthEmu === e.plotAreaLineWidthEmu && c.dash === e.plotAreaLineDash && c.dashAuthored === e.plotAreaLineDashAuthored && c.customDash === e.plotAreaLineCustomDash && c.cap === e.plotAreaLineCap && c.join === e.plotAreaLineJoin && c.compound === e.plotAreaLineCompound && c.hidden === e.plotAreaLineHidden && c.paintAuthored === e.plotAreaLinePaintAuthored ? e : {
		...e,
		plotAreaFill: r,
		plotAreaBg: i,
		plotAreaFillHidden: a,
		plotAreaFillPaintAuthored: o,
		plotAreaLineColor: c.color,
		plotAreaLineFill: c.fill,
		plotAreaLineWidthEmu: c.widthEmu,
		plotAreaLineDash: c.dash,
		plotAreaLineDashAuthored: c.dashAuthored,
		plotAreaLineCustomDash: c.customDash,
		plotAreaLineCap: c.cap,
		plotAreaLineJoin: c.join,
		plotAreaLineCompound: c.compound,
		plotAreaLineHidden: c.hidden,
		plotAreaLinePaintAuthored: c.paintAuthored
	};
}
function Gs(e) {
	let t = e.chartStyleRoles?.chartArea, n = I(e, "chartArea");
	if (!t) return e;
	let r = e.chartFill, i = e.chartBg, a = e.chartFillHidden, o = e.chartFillPaintAuthored, s = a === !0 ? W(n) : void 0;
	if (!(r != null || s !== void 0 || e.chartFillPaintAuthored === !0 && a !== !0)) {
		let s = G(t, n, 0, e.chartAreaStyle);
		s === null ? (r = null, i = null, a = !0) : s?.fillType === "solid" ? (i = s.color, r = null, a = null) : s !== void 0 && (r = s, i = null, a = null), s !== void 0 && (o = !0);
	}
	let c = Ls(e, {
		style: e.chartAreaStyle,
		color: e.chartBorderColor,
		fill: e.chartBorderLineFill,
		widthEmu: e.chartBorderWidthEmu,
		dash: e.chartBorderDash,
		dashAuthored: e.chartBorderDashAuthored,
		customDash: e.chartBorderCustomDash,
		cap: e.chartBorderCap,
		join: e.chartBorderJoin,
		compound: e.chartBorderCompound,
		hidden: e.chartBorderHidden,
		paintAuthored: e.chartBorderPaintAuthored
	}, t, I(e, "chartArea"));
	return r === e.chartFill && i === e.chartBg && a === e.chartFillHidden && o === e.chartFillPaintAuthored && c.color === e.chartBorderColor && c.fill === e.chartBorderLineFill && c.widthEmu === e.chartBorderWidthEmu && c.dash === e.chartBorderDash && c.dashAuthored === e.chartBorderDashAuthored && c.customDash === e.chartBorderCustomDash && c.cap === e.chartBorderCap && c.join === e.chartBorderJoin && c.compound === e.chartBorderCompound && c.hidden === e.chartBorderHidden && c.paintAuthored === e.chartBorderPaintAuthored ? e : {
		...e,
		chartFill: r,
		chartBg: i,
		chartFillHidden: a,
		chartFillPaintAuthored: o,
		chartBorderColor: c.color,
		chartBorderLineFill: c.fill,
		chartBorderWidthEmu: c.widthEmu,
		chartBorderDash: c.dash,
		chartBorderDashAuthored: c.dashAuthored,
		chartBorderCustomDash: c.customDash,
		chartBorderCap: c.cap,
		chartBorderJoin: c.join,
		chartBorderCompound: c.compound,
		chartBorderHidden: c.hidden,
		chartBorderPaintAuthored: c.paintAuthored
	};
}
function Ks(e, t) {
	let r = e.chartStyleRoles;
	if (!r || !(Number.isFinite(t) && t > 0)) return e;
	let i = n / t, a = !1, o = new Set([
		"categoryAxis",
		"seriesAxis",
		"valueAxis",
		"gridlineMajor",
		"gridlineMinor"
	]), s = Object.fromEntries(Object.entries(r).map(([e, t]) => !o.has(e) || !t || t.lineWidthEmu == null || !Number.isFinite(t.lineWidthEmu) || t.lineWidthEmu <= 0 || t.lineWidthEmu >= i ? [e, t] : (a = !0, [e, {
		...t,
		lineWidthEmu: i
	}])));
	return a ? {
		...e,
		chartStyleRoles: s
	} : e;
}
function qs(e, t) {
	if (e = Ks(e, t), !e.chartStyleRoles?.errorBar && !e.chartStyleRoles?.leaderLine && !e.chartStyleRoles?.trendline && !e.chartStyleRoles?.trendlineLabel && !e.chartStyleRoles?.dataLabel && !e.chartStyleRoles?.dataLabelCallout && !e.chartStyleRoles?.dataTable && !e.chartStyleRoles?.gridlineMajor && !e.chartStyleRoles?.gridlineMinor && !e.chartStyleRoles?.categoryAxis && !e.chartStyleRoles?.valueAxis && !e.chartStyleRoles?.seriesAxis && !e.chartStyleRoles?.dataPointMarker && !e.chartStyleRoles?.legend && !e.chartStyleRoles?.plotArea && !e.chartStyleRoles?.plotArea3D && !e.chartStyleRoles?.chartArea && !e.chartStyleRoles?.title && !e.chartStyleRoles?.axisTitle && e.chartTextStyle == null && e.chartStyleMarkerSizePt == null && e.chartStyleMarkerSymbol == null) return e;
	let n = !1, r = qt(e), i = e.series.map((t, i) => {
		let a = Is(e, t, i, e.series.length, r[i]);
		n ||= a !== t;
		let o = e.chartStyleRoles?.errorBar ? a.errBars?.map((t) => {
			let r = Ts(e, t);
			return n ||= r.color !== t.color || r.lineWidthEmu !== t.lineWidthEmu || r.dash !== t.dash || r.hidden !== t.hidden, r;
		}) : a.errBars, s = a.seriesDataLabels;
		if (s && (e.chartTextStyle || e.chartStyleRoles?.dataLabel || e.chartStyleRoles?.dataLabelCallout)) {
			let t = zs(e, s, Jo(a, i));
			n ||= t !== s, s = t;
		}
		let c = e.chartTextStyle || e.chartStyleRoles?.dataLabelCallout || e.chartStyleRoles?.dataLabel ? a.dataLabelOverrides?.map((r) => {
			let i = Vs(e, r, t.seriesDataLabels);
			return n ||= i !== r, i;
		}) : a.dataLabelOverrides;
		if (s && e.chartStyleRoles?.leaderLine) {
			let t = Es(e, s), r = {
				...s,
				leaderLineColor: t.color ?? void 0,
				leaderLineWidthEmu: t.widthEmu ?? void 0,
				leaderLineDash: t.dash ?? void 0,
				leaderLineHidden: t.hidden ?? void 0,
				leaderLinePaintAuthored: t.paintAuthored
			};
			n ||= r.leaderLineColor !== s.leaderLineColor || r.leaderLineWidthEmu !== s.leaderLineWidthEmu || r.leaderLineDash !== s.leaderLineDash || r.leaderLineHidden !== s.leaderLineHidden || r.leaderLinePaintAuthored !== s.leaderLinePaintAuthored, s = r;
		}
		let l = e.chartStyleRoles?.trendline || e.chartTextStyle || e.chartStyleRoles?.trendlineLabel ? a.trendLines?.map((t) => {
			let r = e.chartStyleRoles?.trendline ? Ds(e, t) : t;
			return (e.chartTextStyle || e.chartStyleRoles?.trendlineLabel) && (r = Bs(e, r, Jo(a, i))), n ||= r.lineColor !== t.lineColor || r.lineWidthEmu !== t.lineWidthEmu || r.lineDash !== t.lineDash || r.lineHidden !== t.lineHidden || r !== t, r;
		}) : a.trendLines;
		return o === a.errBars && s === a.seriesDataLabels && c === a.dataLabelOverrides && l === a.trendLines ? a : {
			...a,
			errBars: o,
			seriesDataLabels: s,
			dataLabelOverrides: c,
			trendLines: l
		};
	}), a = e.dataTable;
	if (a && (e.chartStyleRoles?.dataTable || e.chartTextStyle)) {
		let t = Os(e, a);
		n ||= t !== a, a = t;
	}
	let o = ks(e, "gridlineMajor", e.valAxisMajorGridlines, e.valAxisGridlineColor, e.valAxisGridlineWidthEmu, e.valAxisGridlineDash, e.valAxisGridlinePaintAuthored, e.valAxisMajorGridlineStyle), s = ks(e, "gridlineMajor", e.catAxisMajorGridlines, e.catAxisGridlineColor, e.catAxisGridlineWidthEmu, e.catAxisGridlineDash, e.catAxisGridlinePaintAuthored, e.catAxisMajorGridlineStyle), c = ks(e, "gridlineMinor", e.valAxisMinorGridlines, e.valAxisMinorGridlineColor, e.valAxisMinorGridlineWidthEmu, e.valAxisMinorGridlineDash, e.valAxisMinorGridlinePaintAuthored, e.valAxisMinorGridlineStyle), l = ks(e, "gridlineMinor", e.catAxisMinorGridlines, e.catAxisMinorGridlineColor, e.catAxisMinorGridlineWidthEmu, e.catAxisMinorGridlineDash, e.catAxisMinorGridlinePaintAuthored, e.catAxisMinorGridlineStyle), u = As(e, e.secondaryValAxis), d = As(e, e.secondaryCatAxis), f = Ns(e, u, "valueAxis"), p = Ns(e, d, "categoryAxis"), m = js(e, "categoryAxis", e.catAxisLineColor, e.catAxisLineWidthEmu, e.catAxisLineDash, e.catAxisLineHidden, e.catAxisLinePaintAuthored, e.catAxisStyle), h = js(e, "valueAxis", e.valAxisLineColor, e.valAxisLineWidthEmu, e.valAxisLineDash, e.valAxisLineHidden, e.valAxisLinePaintAuthored, e.valAxisStyle), g = Ms(m), _ = Ms(h), v = e.chartStyleRoles?.categoryAxis, y = e.chartStyleRoles?.valueAxis, b = e.chartStyleRoles?.title, x = e.chartStyleRoles?.axisTitle, S = e.chartStyleRoles?.dataLabel, C = e.catAxisFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? v?.fontSizeHpt ?? null, w = e.catAxisFontBold ?? e.chartTextStyle?.fontBold ?? v?.fontBold, T = e.catAxisFontItalic ?? e.chartTextStyle?.fontItalic ?? v?.fontItalic, E = Q(e, e.catAxisFontColor, e.catAxisFontPaintAuthored, v), D = E.color, O = e.catAxisFontFace ?? e.chartTextStyle?.fontFace ?? v?.fontFace, k = e.valAxisFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? y?.fontSizeHpt ?? null, A = e.valAxisFontBold ?? e.chartTextStyle?.fontBold ?? y?.fontBold, j = e.valAxisFontItalic ?? e.chartTextStyle?.fontItalic ?? y?.fontItalic, ee = Q(e, e.valAxisFontColor, e.valAxisFontPaintAuthored, y), te = ee.color, M = e.valAxisFontFace ?? e.chartTextStyle?.fontFace ?? y?.fontFace, N = e.titleFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? b?.fontSizeHpt ?? null, P = e.titleFontBold ?? e.chartTextStyle?.fontBold ?? b?.fontBold, ne = e.titleFontItalic ?? e.chartTextStyle?.fontItalic ?? b?.fontItalic, F = e.titleFontLanguage ?? e.chartTextStyle?.fontLanguage ?? b?.fontLanguage, I = e.titleFontBaseline ?? e.chartTextStyle?.fontBaseline ?? b?.fontBaseline, L = Q(e, e.titleFontColor, e.titleFontPaintAuthored, b), R = L.color ?? null, z = e.titleFontFace ?? e.chartTextStyle?.fontFace ?? b?.fontFace ?? null, re = e.catAxisTitleFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? x?.fontSizeHpt, ie = e.catAxisTitleFontBold ?? e.chartTextStyle?.fontBold ?? x?.fontBold, ae = e.catAxisTitleFontItalic ?? e.chartTextStyle?.fontItalic ?? x?.fontItalic, oe = Q(e, e.catAxisTitleFontColor, e.catAxisTitleFontPaintAuthored, x), se = oe.color, ce = e.catAxisTitleFontFace ?? e.chartTextStyle?.fontFace ?? x?.fontFace, le = e.valAxisTitleFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? x?.fontSizeHpt, ue = e.valAxisTitleFontBold ?? e.chartTextStyle?.fontBold ?? x?.fontBold, B = e.valAxisTitleFontItalic ?? e.chartTextStyle?.fontItalic ?? x?.fontItalic, V = Q(e, e.valAxisTitleFontColor, e.valAxisTitleFontPaintAuthored, x), de = V.color, fe = e.valAxisTitleFontFace ?? e.chartTextStyle?.fontFace ?? x?.fontFace, pe = e.dataLabelFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? S?.fontSizeHpt ?? null, me = e.dataLabelFontBold ?? e.chartTextStyle?.fontBold ?? S?.fontBold, he = e.dataLabelFontItalic ?? e.chartTextStyle?.fontItalic ?? S?.fontItalic, H = e.dataLabelFontLanguage ?? e.chartTextStyle?.fontLanguage ?? S?.fontLanguage, U = e.dataLabelFontBaseline ?? e.chartTextStyle?.fontBaseline ?? S?.fontBaseline, W = Q(e, e.dataLabelFontColor, e.dataLabelFontPaintAuthored, S), ge = W.color, G = e.dataLabelFontFace ?? e.chartTextStyle?.fontFace ?? S?.fontFace;
	return n ||= o.visible !== e.valAxisMajorGridlines || o.color !== e.valAxisGridlineColor || o.widthEmu !== e.valAxisGridlineWidthEmu || o.dash !== e.valAxisGridlineDash || o.paintAuthored !== e.valAxisGridlinePaintAuthored || s.visible !== e.catAxisMajorGridlines || s.color !== e.catAxisGridlineColor || s.widthEmu !== e.catAxisGridlineWidthEmu || s.dash !== e.catAxisGridlineDash || s.paintAuthored !== e.catAxisGridlinePaintAuthored || c.visible !== e.valAxisMinorGridlines || c.color !== e.valAxisMinorGridlineColor || c.widthEmu !== e.valAxisMinorGridlineWidthEmu || c.dash !== e.valAxisMinorGridlineDash || c.paintAuthored !== e.valAxisMinorGridlinePaintAuthored || l.visible !== e.catAxisMinorGridlines || l.color !== e.catAxisMinorGridlineColor || l.widthEmu !== e.catAxisMinorGridlineWidthEmu || l.dash !== e.catAxisMinorGridlineDash || l.paintAuthored !== e.catAxisMinorGridlinePaintAuthored || f !== e.secondaryValAxis || p !== e.secondaryCatAxis || m.color !== e.catAxisLineColor || m.widthEmu !== e.catAxisLineWidthEmu || m.dash !== e.catAxisLineDash || g !== e.catAxisLineHidden || m.paintAuthored !== e.catAxisLinePaintAuthored || h.color !== e.valAxisLineColor || h.widthEmu !== e.valAxisLineWidthEmu || h.dash !== e.valAxisLineDash || _ !== e.valAxisLineHidden || h.paintAuthored !== e.valAxisLinePaintAuthored || C !== e.catAxisFontSizeHpt || w !== e.catAxisFontBold || T !== e.catAxisFontItalic || D !== e.catAxisFontColor || E.authored !== e.catAxisFontPaintAuthored || O !== e.catAxisFontFace || k !== e.valAxisFontSizeHpt || A !== e.valAxisFontBold || j !== e.valAxisFontItalic || te !== e.valAxisFontColor || ee.authored !== e.valAxisFontPaintAuthored || M !== e.valAxisFontFace || N !== e.titleFontSizeHpt || P !== e.titleFontBold || ne !== e.titleFontItalic || F !== e.titleFontLanguage || I !== e.titleFontBaseline || R !== e.titleFontColor || L.authored !== e.titleFontPaintAuthored || z !== e.titleFontFace || re !== e.catAxisTitleFontSizeHpt || ie !== e.catAxisTitleFontBold || ae !== e.catAxisTitleFontItalic || se !== e.catAxisTitleFontColor || oe.authored !== e.catAxisTitleFontPaintAuthored || ce !== e.catAxisTitleFontFace || le !== e.valAxisTitleFontSizeHpt || ue !== e.valAxisTitleFontBold || B !== e.valAxisTitleFontItalic || de !== e.valAxisTitleFontColor || V.authored !== e.valAxisTitleFontPaintAuthored || fe !== e.valAxisTitleFontFace || pe !== e.dataLabelFontSizeHpt || me !== e.dataLabelFontBold || he !== e.dataLabelFontItalic || H !== e.dataLabelFontLanguage || U !== e.dataLabelFontBaseline || ge !== e.dataLabelFontColor || W.authored !== e.dataLabelFontPaintAuthored || G !== e.dataLabelFontFace, Hs(Ws(Gs(Ps(n ? {
		...e,
		series: i,
		dataTable: a,
		valAxisMajorGridlines: o.visible,
		valAxisGridlineColor: o.color,
		valAxisGridlineWidthEmu: o.widthEmu,
		valAxisGridlineDash: o.dash,
		valAxisGridlinePaintAuthored: o.paintAuthored,
		catAxisMajorGridlines: s.visible,
		catAxisGridlineColor: s.color,
		catAxisGridlineWidthEmu: s.widthEmu,
		catAxisGridlineDash: s.dash,
		catAxisGridlinePaintAuthored: s.paintAuthored,
		valAxisMinorGridlines: c.visible,
		valAxisMinorGridlineColor: c.color,
		valAxisMinorGridlineWidthEmu: c.widthEmu,
		valAxisMinorGridlineDash: c.dash,
		valAxisMinorGridlinePaintAuthored: c.paintAuthored,
		catAxisMinorGridlines: l.visible,
		catAxisMinorGridlineColor: l.color,
		catAxisMinorGridlineWidthEmu: l.widthEmu,
		catAxisMinorGridlineDash: l.dash,
		catAxisMinorGridlinePaintAuthored: l.paintAuthored,
		secondaryValAxis: f,
		secondaryCatAxis: p,
		catAxisLineColor: m.color,
		catAxisLineWidthEmu: m.widthEmu,
		catAxisLineDash: m.dash,
		catAxisLineHidden: g,
		catAxisLinePaintAuthored: m.paintAuthored,
		valAxisLineColor: h.color,
		valAxisLineWidthEmu: h.widthEmu,
		valAxisLineDash: h.dash,
		valAxisLineHidden: _,
		valAxisLinePaintAuthored: h.paintAuthored,
		catAxisFontSizeHpt: C,
		catAxisFontBold: w,
		catAxisFontItalic: T,
		catAxisFontColor: D,
		catAxisFontPaintAuthored: E.authored,
		catAxisFontFace: O,
		valAxisFontSizeHpt: k,
		valAxisFontBold: A,
		valAxisFontItalic: j,
		valAxisFontColor: te,
		valAxisFontPaintAuthored: ee.authored,
		valAxisFontFace: M,
		titleFontSizeHpt: N,
		titleFontBold: P,
		titleFontItalic: ne,
		titleFontLanguage: F,
		titleFontBaseline: I,
		titleFontColor: R,
		titleFontPaintAuthored: L.authored,
		titleFontFace: z,
		catAxisTitleFontSizeHpt: re,
		catAxisTitleFontBold: ie,
		catAxisTitleFontItalic: ae,
		catAxisTitleFontColor: se,
		catAxisTitleFontPaintAuthored: oe.authored,
		catAxisTitleFontFace: ce,
		valAxisTitleFontSizeHpt: le,
		valAxisTitleFontBold: ue,
		valAxisTitleFontItalic: B,
		valAxisTitleFontColor: de,
		valAxisTitleFontPaintAuthored: V.authored,
		valAxisTitleFontFace: fe,
		dataLabelFontSizeHpt: pe,
		dataLabelFontBold: me,
		dataLabelFontItalic: he,
		dataLabelFontLanguage: H,
		dataLabelFontBaseline: U,
		dataLabelFontColor: ge,
		dataLabelFontPaintAuthored: W.authored,
		dataLabelFontFace: G
	} : e))));
}
//#endregion
//#region packages/core/src/chart/shared/axis.ts
function Js(e, t, n, r, i, a, o, s = !1, c = !1, l = "major", u = 1, d) {
	if (c || t === "none" || !t) return;
	let f = Xs(l, o, u), p = t === "cross" ? f / 2 : f, m = e.strokeStyle, h = e.lineWidth, g = e.getLineDash?.() ?? [];
	if (e.strokeStyle = a ?? "#888", e.lineWidth = o ?? 1, e.setLineDash(gs(d ?? void 0, e.lineWidth)), e.beginPath(), n === "val") {
		let n = r, a = i, o = s ? 1 : -1, c = t === "out" || t === "cross" ? o * p : 0, l = t === "in" || t === "cross" ? -o * p : 0;
		e.moveTo(n + c, a), e.lineTo(n + l, a);
	} else {
		let n = r, a = i, o = s ? -1 : 1, c = t === "out" || t === "cross" ? o * p : 0, l = t === "in" || t === "cross" ? -o * p : 0;
		e.moveTo(a, n + c), e.lineTo(a, n + l);
	}
	e.stroke(), e.strokeStyle = m, e.lineWidth = h, e.setLineDash(g);
}
function Ys(e, t, n, r, i, a, o, s) {
	let c = e.getLineDash?.() ?? [], l = gs(s ?? void 0, o), u = l.length !== c.length || l.some((e, t) => e !== c[t]);
	e.strokeStyle = a, e.lineWidth = o, u && e.setLineDash(l), e.beginPath(), e.moveTo(t, n), e.lineTo(r, i), e.stroke(), u && e.setLineDash(c);
}
function Xs(e, t, n) {
	let r = (e === "minor" ? 4 : 6) * n;
	return t ? Math.max(r, t + 2 * n) : r;
}
function Zs(e, t, n, r) {
	if (e !== "out" && e !== "cross") return 0;
	let i = Xs(t, n, r);
	return e === "cross" ? i / 2 : i;
}
function Qs(e, t, n, r, i, a) {
	a && a.explicit ? (e.strokeStyle = a.color, e.lineWidth = a.width) : (e.strokeStyle = i ? "#aaa" : a?.color ?? "#e0e0e0", e.lineWidth = i ? 1 : a?.width ?? .5);
	let o = a?.dash ?? [], s = o.length > 0 && e.getLineDash ? e.getLineDash() : [];
	o.length > 0 && e.setLineDash(o), e.beginPath(), e.moveTo(t, r), e.lineTo(t + n, r), e.stroke(), o.length > 0 && e.setLineDash(s);
}
function $s(e, t) {
	let { color: n, width: r } = uo(e.valAxisGridlineColor, e.valAxisGridlineWidthEmu, t);
	return {
		color: n,
		width: r,
		explicit: e.valAxisGridlineColor != null || e.valAxisGridlineWidthEmu != null || e.valAxisGridlineDash != null,
		dash: gs(e.valAxisGridlineDash ?? void 0, r)
	};
}
function ec(e, t) {
	let { color: n, width: r } = uo(e.valAxisMinorGridlineColor, e.valAxisMinorGridlineWidthEmu, t);
	return {
		color: n,
		width: r,
		explicit: e.valAxisMinorGridlineColor != null,
		dash: gs(e.valAxisMinorGridlineDash ?? void 0, r)
	};
}
function tc(e, t) {
	let { color: n, width: r } = uo(e.minorGridlineColor, e.minorGridlineWidthEmu, t);
	return {
		color: n,
		width: r,
		explicit: e.minorGridlineColor != null || e.minorGridlineWidthEmu != null || e.minorGridlineDash != null,
		dash: gs(e.minorGridlineDash ?? void 0, r)
	};
}
function nc(e, t) {
	let { color: n, width: r } = uo(e.majorGridlineColor, e.majorGridlineWidthEmu, t);
	return {
		color: n,
		width: r,
		explicit: e.majorGridlineColor != null || e.majorGridlineWidthEmu != null || e.majorGridlineDash != null,
		dash: gs(e.majorGridlineDash ?? void 0, r)
	};
}
function rc(e) {
	return e.catAxisMajorGridlines === !0;
}
function ic(e, t) {
	let n = uo(e.catAxisGridlineColor, e.catAxisGridlineWidthEmu, t);
	return {
		...n,
		dash: gs(e.catAxisGridlineDash ?? void 0, n.width)
	};
}
function ac(e, t) {
	let n = uo(e.catAxisMinorGridlineColor, e.catAxisMinorGridlineWidthEmu, t);
	return {
		...n,
		dash: gs(e.catAxisMinorGridlineDash ?? void 0, n.width)
	};
}
function oc(e, t) {
	if (t <= 0) return [];
	let n = fo(e), r = [], i = n ? t : t - 1;
	for (let e = 0; e <= i; e++) r.push(n ? e / t : t === 1 ? .5 : e / (t - 1));
	return r;
}
function sc(e) {
	return e.valAxisOrientation === "maxMin";
}
function cc(e) {
	return e.catAxisOrientation === "maxMin";
}
function lc(e) {
	return e.valAxisMajorGridlines !== !1;
}
function uc(e, t) {
	return e == null || !t ? e : e * 100;
}
function dc(e, t, n) {
	return Ca((n ? t / 100 : t) / fc(e.valAxisDisplayUnits), n ? e.valAxisFormatCode ?? "0%" : e.valAxisFormatCode, e.date1904);
}
function fc(e) {
	let t = e?.divisor;
	return t != null && Number.isFinite(t) && t > 0 ? t : 1;
}
function pc(e, t, n, r) {
	return Ca(e / fc(r), t, n);
}
function mc(e) {
	return e.builtInUnit ? {
		hundreds: "Hundreds",
		thousands: "Thousands",
		tenThousands: "Ten Thousands",
		hundredThousands: "Hundred Thousands",
		millions: "Millions",
		tenMillions: "Ten Millions",
		hundredMillions: "Hundred Millions",
		billions: "Billions",
		trillions: "Trillions"
	}[e.builtInUnit] ?? e.builtInUnit : Sa(e.divisor);
}
function hc(e, t, n, r) {
	let i = [
		{
			units: t.valAxisDisplayUnits,
			vertical: !0,
			fallbackX: n.x + n.w * .08,
			fallbackY: n.y + n.h * .12,
			axis: {
				size: t.valAxisFontSizeHpt,
				bold: t.valAxisFontBold,
				italic: t.valAxisFontItalic,
				color: t.valAxisFontColor,
				paintAuthored: t.valAxisFontPaintAuthored,
				face: t.valAxisFontFace
			}
		},
		{
			units: t.catAxisDisplayUnits,
			vertical: !1,
			fallbackX: n.x + n.w * .82,
			fallbackY: n.y + n.h * .82,
			axis: {
				size: t.catAxisFontSizeHpt,
				bold: t.catAxisFontBold,
				italic: t.catAxisFontItalic,
				color: t.catAxisFontColor,
				paintAuthored: t.catAxisFontPaintAuthored,
				face: t.catAxisFontFace
			}
		},
		{
			units: t.secondaryValAxis?.displayUnits,
			vertical: !0,
			fallbackX: n.x + n.w * .92,
			fallbackY: n.y + n.h * .12,
			axis: {
				size: t.secondaryValAxis?.fontSizeHpt,
				bold: t.secondaryValAxis?.fontBold,
				italic: t.secondaryValAxis?.fontItalic,
				color: t.secondaryValAxis?.fontColor,
				paintAuthored: t.secondaryValAxis?.fontPaintAuthored,
				face: t.secondaryValAxis?.fontFace
			}
		},
		{
			units: t.secondaryCatAxis?.displayUnits,
			vertical: !1,
			fallbackX: n.x + n.w * .82,
			fallbackY: n.y + n.h * .08,
			axis: {
				size: t.secondaryCatAxis?.fontSizeHpt,
				bold: t.secondaryCatAxis?.fontBold,
				italic: t.secondaryCatAxis?.fontItalic,
				color: t.secondaryCatAxis?.fontColor,
				paintAuthored: t.secondaryCatAxis?.fontPaintAuthored,
				face: t.secondaryCatAxis?.fontFace
			}
		}
	];
	for (let { units: a, vertical: o, fallbackX: s, fallbackY: c, axis: l } of i) {
		let i = a?.label;
		if (!a || !i) continue;
		let u = i.text ?? mc(a), d = t.chartTextStyle, f = je(i.fontSizeHpt ?? l.size ?? d?.fontSizeHpt, r) ?? 10 * r, p = i.fontBold ?? l.bold ?? d?.fontBold ?? !1, m = i.fontItalic ?? l.italic ?? d?.fontItalic ?? !1, h = i.fontPaintAuthored === !0 ? {
			color: i.fontColor,
			hidden: i.fontHidden === !0 || i.fontColor == null
		} : l.paintAuthored === !0 ? {
			color: l.color,
			hidden: l.color == null
		} : d?.fontPaintAuthored === !0 ? {
			color: d.fontColor,
			hidden: d.fontColor == null
		} : {
			color: i.fontColor ?? l.color ?? d?.fontColor,
			hidden: !1
		};
		if (h.hidden) continue;
		let g = h.color, _ = i.fontFace ?? l.face ?? d?.fontFace;
		e.save(), e.font = bs(f, ys(t, _, "minor"), p, m);
		let v = i.rotation == null ? o ? -Math.PI / 2 : 0 : i.rotation / 6e4 * Math.PI / 180, y = e.measureText(u).width, b = Math.abs(Math.cos(v)) * y + Math.abs(Math.sin(v)) * f, x = Math.abs(Math.sin(v)) * y + Math.abs(Math.cos(v)) * f, S = {
			x: s - b / 2,
			y: c - x / 2,
			w: b,
			h: x
		}, C = i.manualLayout ? Qe({
			...i.manualLayout,
			w: void 0,
			h: void 0
		}, n, S) : S;
		if (!C) {
			e.restore();
			continue;
		}
		let w = C.x + C.w / 2, T = C.y + C.h / 2;
		Pa(e, Rs(t, i.boxStyle, t.chartStyleRoles?.axisTitle, I(t, "axisTitle"), !0), C, r), e.translate(w, T), v !== 0 && e.rotate(v), e.fillStyle = g ? `#${g}` : "#595959", e.textAlign = "center", e.textBaseline = "middle", e.fillText(u, 0, 0), e.restore();
	}
}
function gc(e, t, n, r, i = !1, a = "vertical") {
	let o = sc(e), s = e.valAxisLogBase, c = uc(e.valMin, i) ?? (i ? t : e.valMin), l = uc(e.valMax, i) ?? (i ? n : e.valMax), u = uc(e.valAxisMajorUnit, i), d = i && !(s != null && isFinite(s) && s >= 2) && !(u != null && isFinite(u) && u > 0) ? $o(t, n, a, r) : u, f = e.valAxisMinorTickMark != null && e.valAxisMinorTickMark !== "none", p = ds({
		dataMin: t,
		dataMax: n,
		explicitMin: c,
		explicitMax: l,
		axisLenPt: r,
		axisOrientation: a,
		majorUnit: d,
		minorUnit: uc(e.valAxisMinorUnit, i),
		needMinor: e.valAxisMinorGridlines === !0 || f,
		logBase: s,
		reversed: o
	}), { min: m, max: h, majorUnit: g, majorTicks: _ } = p;
	return {
		min: m,
		max: h,
		step: g,
		majorLines: _,
		minorLines: e.valAxisMinorGridlines ? p.minorTicks : [],
		minorTicks: p.minorTicks,
		frac: p.fraction
	};
}
function _c(e, t, n) {
	return je(e, n) ?? Math.max(8, t * .045);
}
function vc(e, t, n, r = 0) {
	let i = t.trim().split(/\s+/).filter(Boolean);
	if (i.length === 0) return [""];
	let a = [], o = "", s = (t) => {
		let i = o ? `${o} ${t}` : t;
		if (e.measureText(i).width <= n) {
			o = i;
			return;
		}
		if (o &&= (a.push(o), ""), e.measureText(t).width <= n + r) {
			o = t;
			return;
		}
		let s = Array.from(t), c = 0;
		for (; c < s.length;) {
			let t = c + 1, r = s.length, i = c + 1;
			for (; t <= r;) {
				let a = Math.floor((t + r) / 2);
				e.measureText(s.slice(c, a).join("")).width <= n ? (i = a, t = a + 1) : r = a - 1;
			}
			let l = s.slice(c, i).join("");
			c = i, c < s.length ? a.push(l) : o = l;
		}
	};
	for (let e of i) s(e);
	return o && a.push(o), a.length ? a : [""];
}
function yc(e) {
	return e.catAxisTickLabelPos !== "none";
}
function bc(e) {
	let t = e.catAxisLabelRotation;
	return t == null || t === 0 || Math.abs(t) > 54e5 ? 0 : t / 6e4 * (Math.PI / 180);
}
function xc(e, t, n, r, i) {
	if (i === 0) {
		e.fillText(t, n, r);
		return;
	}
	e.save(), e.translate(n, r), e.rotate(i), e.textAlign = "right", e.textBaseline = "middle", e.fillText(t, 0, 0), e.restore();
}
function Sc(e, t, n, r, i, a, o, s, c, l, u = "sans-serif", d, f, p, m, h, g = 1) {
	e.save(), e.font = bs(a, u, o, s), e.fillStyle = c;
	let _ = p ? t : Xo(e, t, l), v = ze(i, d, f), y = n, b = r;
	if (p && m) {
		let t = e.measureText(_).width, i = Math.abs(Math.cos(v)), o = Math.abs(Math.sin(v)), s = t * i + a * o, c = t * o + a * i, l = {
			x: n - s / 2,
			y: r - c / 2,
			w: s,
			h: c
		}, u = Qe({
			...p,
			w: void 0,
			h: void 0
		}, m, l);
		u && (y = u.x + u.w / 2, b = u.y + u.h / 2);
	}
	e.translate(y, b), v !== 0 && e.rotate(v);
	let x = e.measureText(_).width;
	Pa(e, h, {
		x: -x / 2,
		y: -a / 2,
		w: x,
		h: a
	}, g), e.textAlign = "center", e.textBaseline = "middle", e.fillText(_, 0, 0), e.restore();
}
function Cc(e) {
	return e ? `#${e}` : "#555";
}
function wc(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m = !1) {
	let h = (f, p, m, h, g, _, v, y, b, x, S) => {
		let C = Rs(t, S ? { style: S } : void 0, t.chartStyleRoles?.axisTitle, I(t, "axisTitle"), !0);
		if (p === "left") {
			Sc(e, f, n + u + Be(i) + m / 2, s + l / 2, p, m, h, g, _, l, v, y, b, x, {
				x: n,
				y: r,
				w: i,
				h: a
			}, C, m / 10);
			return;
		}
		Sc(e, f, o + c / 2, r + a - d - Be(a) - m / 2, p, m, h, g, _, c, v, y, b, x, {
			x: n,
			y: r,
			w: i,
			h: a
		}, C, m / 10);
	};
	t.valAxisTitle && h(t.valAxisTitle, m ? "horizontal" : "left", p, t.valAxisTitleFontBold ?? !0, t.valAxisTitleFontItalic ?? !1, Cc(t.valAxisTitleFontColor), ys(t, t.valAxisTitleFontFace, "major"), t.valAxisTitleRotation, t.valAxisTitleVerticalMode, t.valAxisTitleManualLayout, t.valAxisTitleStyle), t.catAxisTitle && h(t.catAxisTitle, m ? "left" : "horizontal", f, t.catAxisTitleFontBold ?? !0, t.catAxisTitleFontItalic ?? !1, Cc(t.catAxisTitleFontColor), ys(t, t.catAxisTitleFontFace, "major"), t.catAxisTitleRotation, t.catAxisTitleVerticalMode, t.catAxisTitleManualLayout, t.catAxisTitleStyle);
}
//#endregion
//#region packages/core/src/chart/date-axis.ts
function Tc(e) {
	return e === "days" || e === "months" || e === "years" ? e : null;
}
function Ec(e, t) {
	switch (t) {
		case "years": return new Date(Date.UTC(e.getUTCFullYear(), 0, 1));
		case "months": return new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), 1));
		case "days": return new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()));
	}
}
function Dc(e, t, n) {
	if (n === "days") return new Date(e.getTime() + t * 864e5);
	let r = new Date(e.getTime());
	return n === "months" ? r.setUTCMonth(r.getUTCMonth() + t) : r.setUTCFullYear(r.getUTCFullYear() + t), r;
}
function Oc(e, t) {
	switch (t) {
		case "years": return e.getUTCFullYear();
		case "months": return e.getUTCFullYear() * 12 + e.getUTCMonth();
		case "days": return Math.floor(e.getTime() / 864e5);
	}
}
function kc(e) {
	let t = e.categories.map((e) => Number(e));
	if (t.length === 0 || t.some((e) => !Number.isFinite(e))) return null;
	let n = e.date1904 === !0, r = Tc(e.baseTimeUnit) ?? "days", i = Tc(e.majorTimeUnit) ?? r, a = Tc(e.minorTimeUnit) ?? r, o = (e, t) => e == null || !(e > 0) || !Number.isFinite(e) ? null : t === "days" || e >= 1 && Number.isInteger(e) ? e : null, s = o(e.majorUnit, i), c = o(e.minorUnit, a), l = (e) => Oc(na(e, n), r), u = Array(t.length), d = Infinity, f = -Infinity, p = Infinity, m = -Infinity;
	for (let e = 0; e < t.length; e++) {
		let n = t[e], r = l(n);
		u[e] = r, d = Math.min(d, r), f = Math.max(f, r), p = Math.min(p, n), m = Math.max(m, n);
	}
	let h = e.explicitMin, g = e.explicitMax, _ = h != null && Number.isFinite(h) ? l(h) : null, v = g != null && Number.isFinite(g) ? l(g) : null, y = e.crossBetween !== !1, b = _ ?? d, x = (v ?? f) + +!!y;
	x > b || (b -= .5, x += .5);
	let S = x - b, C = (e) => (l(e) - b) / S, w = e.reversed ? (e) => 1 - C(e) : C, T = (e) => (l(e) + (y ? .5 : 0) - b) / S, E = e.reversed ? (e) => 1 - T(e) : T, D = t.map(E), O = t.map(() => 1 / S), k = h != null && Number.isFinite(h) ? h : p, A = g != null && Number.isFinite(g) ? g : m, j = (e, t) => {
		if (t == null) return [];
		let r = Ec(na(k, n), e), i = ra(r, n);
		for (let a = 0; i < k && a < 512; a++) {
			let a = Dc(r, t, e), o = ra(a, n);
			if (!(o > i)) return [];
			r = a, i = o;
		}
		if (i < k) return [];
		let a = [];
		for (; i <= A;) {
			if (a.length === 512) return [];
			a.push({
				serial: i,
				fraction: w(i)
			});
			let o = Dc(r, t, e), s = ra(o, n);
			if (!(s > i)) break;
			r = o, i = s;
		}
		return a;
	}, ee = j(i, s), te = new Set(ee.map((e) => l(e.serial)));
	return {
		positions: D,
		categoryBandFractions: O,
		majorTicks: ee,
		minorTicks: c == null ? [] : j(a, c).filter((e) => !te.has(l(e.serial)))
	};
}
//#endregion
//#region packages/core/src/chart/shared/secondary-axis.ts
function Ac(e, t, n = cc(e)) {
	return e.catAxisIsDate === !0 ? kc({
		categories: t,
		date1904: e.date1904,
		baseTimeUnit: e.catAxisBaseTimeUnit,
		majorTimeUnit: e.catAxisMajorTimeUnit,
		majorUnit: e.catAxisMajorUnit,
		minorTimeUnit: e.catAxisMinorTimeUnit,
		minorUnit: e.catAxisMinorUnit,
		explicitMin: e.catAxisMin,
		explicitMax: e.catAxisMax,
		crossBetween: fo(e),
		reversed: n
	}) : null;
}
function jc(e, t, n, r) {
	for (let i of e.errBars ?? []) {
		if (i.dir !== t) continue;
		let a = i.barType === "plus" || i.barType === "both", o = i.barType === "minus" || i.barType === "both", s = Math.max(e.values.length, i.plus.length, i.minus.length);
		for (let e = 0; e < s; e++) {
			let t = n(e);
			if (t == null || !Number.isFinite(t)) continue;
			let s = i.plus[e], c = i.minus[e];
			a && s != null && Number.isFinite(s) && r(t + s), o && c != null && Number.isFinite(c) && r(t - c);
		}
	}
}
function Mc(e, t, n, r = "y", i = !1, a = !1, o = (e) => e.useSecondaryAxis === !0, s = () => null) {
	if (!e) return null;
	let c = Infinity, l = -Infinity, u = (e) => {
		Number.isFinite(e) && (c = Math.min(c, e), l = Math.max(l, e));
	};
	a && u(0);
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (o(n, e)) {
			for (let t = 0; t < n.values.length; t++) {
				let r = s(n, t, e) ?? n.values[t];
				r != null && u(r);
			}
			jc(n, r, (t) => s(n, t, e) ?? n.values[t] ?? null, u);
		}
	}
	(!Number.isFinite(c) || !Number.isFinite(l)) && (c = 0, l = 1);
	let d = ds({
		dataMin: c,
		dataMax: l,
		explicitMin: uc(e.min, i),
		explicitMax: uc(e.max, i),
		axisLenPt: n,
		axisOrientation: "vertical",
		majorUnit: uc(e.majorUnit, i),
		minorUnit: uc(e.minorUnit, i),
		needMinor: e.minorGridlines === !0 || e.minorTickMark != null && e.minorTickMark !== "none",
		logBase: e.logBase,
		reversed: e.orientation === "maxMin"
	}), { min: f, max: p, majorUnit: m } = d;
	return {
		min: f,
		max: p,
		step: m,
		majorLines: d.majorTicks,
		minorTicks: d.minorTicks,
		makeToY: (e, t) => (n) => e + t - d.fraction(n) * t
	};
}
function Nc(e, t, n, r, i, a, o) {
	if (!t.hidden) {
		if (e.save(), t.minorGridlines) {
			let s = tc(t, o);
			for (let t of n.minorTicks) Qs(e, i, a, r(t), !1, s);
		}
		if (t.majorGridlines) {
			let s = nc(t, o);
			for (let t of n.majorLines) Qs(e, i, a, r(t), !1, s);
		}
		e.restore();
	}
}
function Pc(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h = !1, g = "right") {
	let _ = g === "left" ? o : o + c, { color: v, width: y } = lo(n.lineColor, n.lineWidthEmu, u);
	if (n.lineHidden || Ys(e, _, s, _, s + l, v, y, n.lineDash), !n.hidden) {
		e.font = `${n.fontItalic ? "italic " : ""}${n.fontBold ? "bold " : ""}${d}px ${ys(t, n.fontFace, "minor")}`, e.fillStyle = n.fontColor ? `#${n.fontColor}` : p, e.textAlign = g === "left" ? "right" : "left", e.textBaseline = "middle";
		for (let t of r.majorLines) {
			let r = i(t);
			Js(e, n.majorTickMark, "val", _, r, v, y, g === "right", n.lineHidden, "major", u, n.lineDash), n.tickLabelPos !== "none" && e.fillText(pc(h ? t / 100 : t, n.formatCode ?? null, m, n.displayUnits), g === "left" ? _ - 14 : _ + 14, r);
		}
		if (n.minorTickMark && n.minorTickMark !== "none") for (let t of r.minorTicks) Js(e, n.minorTickMark, "val", _, i(t), v, y, g === "right", n.lineHidden, "minor", u, n.lineDash);
	}
	n.title && Fc(e, t, n, a, o, s, c, l, f, u, g);
}
function Fc(e, t, n, r, i, a, o, s, c, l, u = "right") {
	if (!n.title) return;
	let d = Le(n.titleFontSizeHpt, l), f = n.titleFontColor ? `#${n.titleFontColor}` : n.fontColor ? `#${n.fontColor}` : "#555";
	Sc(e, n.title, u === "left" ? i - c - d * .6 : i + o + c + d * .6, a + s / 2, u, d, n.titleFontBold ?? !0, n.titleFontItalic ?? !1, f, s, ys(t, n.titleFontFace, "major"), n.titleRotation, n.titleVerticalMode, n.titleManualLayout, r, Rs(t, n.titleStyle ? { style: n.titleStyle } : void 0, t.chartStyleRoles?.axisTitle, I(t, "axisTitle"), !0), l);
}
function Ic(e, t, n, r, i, a, o, s, c) {
	if (n.hidden || r.length === 0) return;
	let { color: l, width: u } = lo(n.lineColor, n.lineWidthEmu, c);
	n.lineHidden || Ys(e, a, o, a + s, o, l, u, n.lineDash);
	let d = n.orientation === "maxMin", f = Math.max(1, Math.floor(n.tickLabelSkip ?? 1)), p = Math.max(1, Math.floor(n.tickMarkSkip ?? 1)), m = r.length, h = (e) => Ee(e, m, fo(t), d, n.labelAlignment);
	if (!n.lineHidden && n.majorTickMark !== "none") {
		let r = fo(t), i = r ? m : m - 1;
		for (let t = 0; t <= i; t += p) {
			let f = d ? i - t : t, p = r ? f / m : m === 1 ? .5 : f / (m - 1);
			Js(e, n.majorTickMark, "cat", o, a + p * s, l, u, !0, n.lineHidden, "major", c, n.lineDash);
		}
	}
	let g = je(n.fontSizeHpt, c) ?? 9 * c;
	if (n.tickLabelPos !== "none") {
		e.font = bs(g, ys(t, n.fontFace, "minor"), n.fontBold ?? !1, n.fontItalic ?? !1), e.fillStyle = n.fontColor ? `#${n.fontColor}` : "#555", e.textBaseline = "bottom";
		let i = Math.max(1, s / m - 4), c = Se(Je(g), n.labelOffsetPercent);
		for (let l = 0; l < m; l += f) {
			let u = h(l);
			e.textAlign = u.textAlign, e.fillText(Xo(e, wa(r[l], n.formatCode, t.date1904), i), a + u.fraction * s, o - c);
		}
	}
	if (n.title) {
		let r = Le(n.titleFontSizeHpt, c);
		Sc(e, n.title, a + s / 2, o - (n.tickLabelPos === "none" ? 0 : g + Se(Je(g), n.labelOffsetPercent)) - r / 2 - 4, "horizontal", r, n.titleFontBold ?? !0, n.titleFontItalic ?? !1, n.titleFontColor ? `#${n.titleFontColor}` : "#555", s, ys(t, n.titleFontFace, "major"), n.titleRotation, n.titleVerticalMode, n.titleManualLayout, i, Rs(t, n.titleStyle ? { style: n.titleStyle } : void 0, t.chartStyleRoles?.axisTitle, I(t, "axisTitle"), !0), c);
	}
}
//#endregion
//#region packages/core/src/chart/chart-ex-column-paint.ts
function Lc(e, t) {
	let n = new Set(t);
	if (e.series.some((e) => !n.has(e))) return !1;
	let r = e.chartType === "clusteredBarH" || e.chartType === "stackedBarH" || e.chartType === "stackedBarHPct", i = e.chartType.startsWith("stacked") ? e.chartType.endsWith("Pct") ? "percentStacked" : "stacked" : "clustered", a = /* @__PURE__ */ new Set();
	for (let e of t) {
		if (e.useSecondaryAxis === !0) return !1;
		let t = e.barGroupDirection == null ? r : e.barGroupDirection === "bar", n = e.barGroupGrouping ?? i;
		if (t || n === "stacked" || n === "percentStacked" || (a.add(e.barGroupIndex == null ? "primary-default" : `group-${e.barGroupIndex}`), a.size > 1)) return !1;
	}
	return !0;
}
function Rc(e, t, n, r) {
	let i = 0, a = 0, o = (e) => {
		i = Math.min(i, e), a = Math.max(a, e);
	};
	for (let e of t) {
		for (let t = 0; t < Math.min(e.values.length, n); t++) {
			let n = e.values[t];
			n == null || !Number.isFinite(n) || o(n);
		}
		jc(e, "y", (t) => t < n ? e.values[t] ?? null : null, o);
	}
	return e.valMax != null && (a = e.valMax), e.valMin != null && (i = e.valMin), i === 0 && a === 0 && (a = 1), gc(e, i, a, r, !1, "vertical");
}
function zc(e, t, n, r) {
	let i = (e) => Math.max(n, Math.min(r, e)), a = i(Math.min(e, t)), o = i(Math.max(e, t));
	return Number.isFinite(a) && Number.isFinite(o) && o > a;
}
function Bc(e) {
	return (!e.clipCategory || zc(e.categoryStart, e.categoryEnd, e.categoryClipStart ?? 0, e.categoryClipEnd ?? 1)) && zc(e.valueStart, e.valueEnd, e.valueClipStart ?? 0, e.valueClipEnd ?? 1);
}
function Vc(e, t, n, r) {
	let i = e.chartType === "clusteredBarH" || e.chartType === "stackedBarH" || e.chartType === "stackedBarHPct", a = e.chartType.startsWith("stacked"), o = e.chartType === "stackedBarPct" || e.chartType === "stackedBarHPct", s = (e) => e.barGroupDirection == null ? i : e.barGroupDirection === "bar", c = (e) => e.barGroupGrouping ?? (o ? "percentStacked" : a ? "stacked" : "clustered"), l = (e) => {
		let t = c(e);
		return t === "stacked" || t === "percentStacked";
	}, u = (e) => c(e) === "percentStacked", d = (e) => e.barGroupIndex == null ? e.useSecondaryAxis === !0 ? "secondary-default" : "primary-default" : `group-${e.barGroupIndex}`, f = /* @__PURE__ */ new Map(), p = new Set(t);
	for (let e of t) {
		let t = d(e), n = f.get(t);
		n ? n.push(e) : f.set(t, [e]);
	}
	let m = !i && e.secondaryValAxis != null && e.series.some((e) => e.useSecondaryAxis === !0), h = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map();
	for (let t of e.plotGroups ?? []) {
		if (t.seriesCount > 0) {
			let e = g.get(t.valueAxis) ?? {
				count: 0,
				percentCount: 0
			};
			e.count++, t.grouping === "percentStacked" && e.percentCount++, g.set(t.valueAxis, e);
		}
		for (let n = t.seriesStart; n < t.seriesStart + t.seriesCount; n++) {
			let r = e.series[n];
			r && h.set(r, t);
		}
	}
	let _ = (e) => {
		if (!u(e)) return 1;
		let t = h.get(e);
		if (!t) return 100;
		let n = g.get(t.valueAxis);
		return n != null && n.count === n.percentCount ? 100 : 1;
	}, v = m ? t.filter((e) => e.useSecondaryAxis !== !0) : [...t], y = /* @__PURE__ */ new Map();
	for (let e of v) {
		let t = d(e), n = y.get(t);
		n ? n.push(e) : y.set(t, [e]);
	}
	let b = (e.plotGroups ?? []).filter((e) => e.seriesCount > 0 && e.valueAxis !== "secondary"), x = b.length > 0 ? b.every((e) => e.grouping === "percentStacked") : v.some(u), S = 0, C = 0, w = (e) => {
		Number.isFinite(e) && (S = Math.min(S, e), C = Math.max(C, e));
	};
	for (let e = 0; e < n; e++) for (let t of y.values()) {
		let n = t[0];
		if (!n) continue;
		let r = l(n), i = u(n), a = i && t.reduce((t, n) => t + Math.abs(n.values[e] ?? 0), 0) || 1, o = 0, s = 0;
		for (let n of t) {
			let t = n.values[e] ?? 0, c = i ? t / a * _(n) : t;
			r ? c < 0 ? s += c : o += c : w(c);
		}
		r && (w(s), w(o));
	}
	for (let t of e.series) if (!(p.has(t) || t.seriesType !== "line" && t.seriesType !== "area" || m && t.useSecondaryAxis === !0)) for (let e = 0; e < Math.min(t.values.length, n); e++) {
		let n = t.values[e];
		n != null && w(n);
	}
	x && (v.some((e) => e.values.some((e) => e != null && e > 0)) && (C = Math.max(C, 100)), v.some((e) => e.values.some((e) => e != null && e < 0)) && (S = Math.min(S, -100))), e.valMax != null && (C = x ? e.valMax * 100 : e.valMax), e.valMin != null && (S = x ? e.valMin * 100 : e.valMin), S === 0 && C === 0 && (C = 1);
	let T = gc(e, S, C, void 0, x, i ? "horizontal" : "vertical"), E = (e, t) => {
		let n = e.values[t] ?? 0;
		if (!l(e)) return n;
		let r = f.get(d(e)) ?? [e], i = u(e), a = i && r.reduce((e, n) => e + Math.abs(n.values[t] ?? 0), 0) || 1, o = i ? n / a * _(e) : n, s = 0;
		for (let n = 0; n <= r.indexOf(e); n++) {
			let c = r[n]?.values[t] ?? 0, l = i ? c / a * _(e) : c;
			l < 0 == o < 0 && (s += l);
		}
		return s;
	}, D = m ? t.filter((e) => e.useSecondaryAxis === !0) : [], O = (e.plotGroups ?? []).filter((e) => e.seriesCount > 0 && e.valueAxis === "secondary"), k = O.length > 0 ? O.every((e) => e.grouping === "percentStacked") : D.some(u), A = e.series.map((e) => e.useSecondaryAxis === !0 ? p.has(e) ? {
		...e,
		values: e.values.map((t, n) => t == null ? t : E(e, n))
	} : k ? {
		...e,
		values: e.values.map((e) => e == null ? e : e * 100)
	} : e : e), j = e.secondaryValAxis && m ? Mc(e.secondaryValAxis, A, 1, i ? "x" : "y", k, D.length > 0) : null, ee = j ? e.secondaryCatAxis?.crossesAt != null && Number.isFinite(e.secondaryCatAxis.crossesAt) ? Math.max(j.min, Math.min(j.max, e.secondaryCatAxis.crossesAt)) : e.secondaryCatAxis?.crosses === "max" ? j.max : e.secondaryCatAxis?.crosses === "min" ? j.min : Math.max(j.min, Math.min(j.max, 0)) : 0, te = j?.makeToY(0, 1), M = cc(e), N = (e, t) => t ? M ? e : n - 1 - e : M ? n - 1 - e : e, P = (e) => r ? r.categoryBandFractions[e] ?? 0 : 1 / Math.max(1, n), ne = (e, t) => r ? (r.positions[e] ?? NaN) - P(e) / 2 : N(e, t) / Math.max(1, n), F = t.map(() => /* @__PURE__ */ new Set());
	for (let r = 0; r < n; r++) {
		let n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
		for (let a = 0; a < t.length; a++) {
			let o = t[a], c = f.get(d(o)) ?? [o], p = s(o), h = l(o), g = u(o), v = g && c.reduce((e, t) => e + Math.abs(t.values[r] ?? 0), 0) || 1, y = o.values[r] ?? 0, b = g ? y / v * _(o) : y, x = b < 0, S = d(o), C = n.get(S) ?? 0, w = i.get(S) ?? 0, E = Math.max(0, c.indexOf(o)), D = P(r), O = h ? 1 : Math.max(1, c.length), k = c[0]?.barGroupOverlap ?? e.barOverlap ?? 0, A = h || !Number.isFinite(k) ? 0 : Math.max(-100, Math.min(100, k)), j = De(c[0]?.barGroupGapWidth ?? e.barGapWidth, "chartex"), M = D / (1 + (O - 1) * (1 - A / 100) + j / 100), N = h ? 0 : M * (1 - A / 100), I = M + (O - 1) * N, L = ne(r, p) + (D - I) / 2 + (h ? 0 : E * N), R = !p && m && o.useSecondaryAxis === !0, z = h ? x ? w : C : R ? ee : 0, re = h ? z + b : b, ie = R && te ? te(z) : T.frac(z), ae = R && te ? te(re) : T.frac(re);
			Bc({
				categoryStart: L,
				categoryEnd: L + M,
				valueStart: ie,
				valueEnd: ae,
				clipCategory: !p
			}) && F[a].add(r), h && (x ? i.set(S, w + b) : n.set(S, C + b));
		}
	}
	return F;
}
function Hc(e, t, n, r) {
	return L(e, n) ? r : Jo(t, n);
}
function Uc(e, t, n) {
	if (!n) return null;
	let r = t[0], i = r?.barGroupOverlap ?? e.barOverlap ?? 0, a = Number.isFinite(i) ? Math.max(-100, Math.min(100, i)) : 0, o = De(r?.barGroupGapWidth ?? e.barGapWidth, "chartex");
	return {
		positions: n.positions,
		categoryBandFractions: n.categoryBandFractions,
		seriesCount: Math.max(1, t.length),
		overlapPct: a,
		gapWidthPct: o
	};
}
function Wc(e, t, n) {
	if (!e) return !0;
	let r = e.positions[n], i = e.categoryBandFractions[n];
	if (r == null || i == null) return !1;
	let a = 1 - e.overlapPct / 100, o = i / (1 + (e.seriesCount - 1) * a + e.gapWidthPct / 100), s = o * a, c = o + (e.seriesCount - 1) * s, l = r - i / 2 + (i - c) / 2 + t * s;
	return l + o > 0 && l < 1;
}
//#endregion
//#region packages/core/src/chart/chart-ex-legend-series.ts
function Gc(e, t) {
	return {
		name: e,
		values: [],
		color: null,
		trendLines: t?.trendLines
	};
}
//#endregion
//#region packages/core/src/chart/chart-ex-column-plan.ts
function Kc(e, t, n, r = []) {
	let i = N(e, {
		chartType: "clusteredBar",
		categories: n,
		series: [...t, ...r]
	}), a = Oe(i).length, o = Lc(i, t), s = Ac(i, Oe(i));
	return {
		kind: "columns",
		series: t,
		categoryCount: a,
		delegateChart: i,
		valueAxis: Rc(i, t, a),
		dateCategoryVisibility: Uc(i, t, o ? s : null),
		genericBodyVisibility: o ? null : Vc(i, t, a, s),
		sharedGeometry: o
	};
}
function qc(e, t = (e) => e) {
	if (![
		"clusteredColumn",
		"histogram",
		"pareto"
	].includes(e.chartType)) return null;
	let n = () => Kc(e, [], []);
	if (e.chartexSuppressGeometry) return n();
	if (e.chartType === "histogram") {
		let t = e.series[0];
		if (!t) return n();
		let r = Io(t.values, e.chartexHistogramBinning ?? {}, t.valFormatCode, e.date1904 === !0);
		return r.kind === "tooManyInputPoints" ? r : Kc(e, [{
			...t,
			categories: void 0,
			values: r.counts,
			valFormatCode: null
		}], r.categories);
	}
	let r = e.chartType === "pareto" ? e.series.filter((e) => e.seriesType !== "line") : e.series, i = 0;
	for (let e of r) if (i += e.values.length, i > 1e4) return { kind: "tooManyInputPoints" };
	let a = r.map((e, n) => t(e, n, r.length)), o = e.chartType === "pareto" || e.chartexParetoSortDescending ? a.map((t) => zo(t, e.categories, {
		sortDescending: e.chartexParetoSortDescending ?? !0,
		keepUnvaluedCategories: !0
	})) : null, s = o ? o.map((e) => e.orderedSeries) : a, c = s[0]?.categories ?? e.categories;
	if (e.chartType === "pareto") {
		let t = o?.[e.chartexParetoOwnerIndex ?? 0], r = o?.[0];
		if (!t || !r || t.points.length === 0 || r.points.length === 0) return n();
		e.chartexParetoFlatEndpoint === !0 && r.categories.length === r.points.length && (c = [...c, ""]);
	}
	let l = e.chartType === "pareto" ? s : s.filter((e) => e.seriesType !== "line" && e.seriesType !== "scatter" && e.seriesType !== "area"), u = e.chartType === "clusteredColumn" ? s.filter((e) => e.seriesType === "line" || e.seriesType === "scatter" || e.seriesType === "area") : [], d = e.chartType === "pareto" && l[0] || e.chartexShowUnpairedPercentageAxis && l[0] ? [{
		...l[0],
		values: [],
		seriesType: "line",
		useSecondaryAxis: !0
	}] : [];
	return Kc(e, l, c, [...u, ...d]);
}
function Jc(e, t) {
	for (let n = 0; n < e.series.length; n++) {
		let r = e.series[n], i = new Map((r.dataPointOverrides ?? []).map((e) => [e.idx, e]));
		for (let a = 0; a < Math.min(r.values.length, e.categoryCount); a++) {
			let o = r.values[a];
			if (o == null || !Number.isFinite(o) || o === 0) continue;
			if (e.sharedGeometry) {
				if (!Wc(e.dateCategoryVisibility, n, a) || !zc(e.valueAxis.frac(0), e.valueAxis.frac(o), 0, 1)) continue;
			} else if (e.genericBodyVisibility?.[n]?.has(a) !== !0) continue;
			let s = Hc(e.delegateChart, r, n, a);
			if (t(r, i.get(a), s, e.series.length) === !1) return;
		}
	}
}
function Yc(e, t) {
	if (!e.delegateChart.showLegend || e.series.length === 0) return;
	let n = {
		...e.delegateChart,
		series: e.series.map((e) => Gc(e.name, e))
	}, r = xt(n, !0), i = Ct(n);
	for (let n = 0; n < e.series.length; n++) {
		if (!wt(r, i, n)) continue;
		let a = e.series[n];
		if (t(a, void 0, Jo(a, n), e.series.length) === !1) return;
	}
}
//#endregion
//#region packages/core/src/chart/image-fill.ts
var Xc = new Set([
	"line",
	"stackedLine",
	"stackedLinePct",
	"area",
	"stackedArea",
	"stackedAreaPct",
	"clusteredBar",
	"clusteredBarH",
	"stackedBar",
	"stackedBarH",
	"stackedBarPct",
	"stackedBarHPct",
	"surface",
	"surface3D"
]);
function Zc(e) {
	return JSON.stringify([
		e.imagePath,
		e.svgImagePath ?? null,
		e.duotone?.clr1 ?? null,
		e.duotone?.clr2 ?? null
	]);
}
var Qc;
function $c(e, t) {
	let n = Qc;
	Qc = e;
	try {
		return ka(gl, t);
	} finally {
		Qc = n;
	}
}
function el(e, t, n, r, i) {
	let a = e;
	return {
		x: a.endsWith("r") || a === "r" ? t - r : a === "t" || a === "ctr" || a === "b" ? (t - r) / 2 : 0,
		y: a.startsWith("b") || a === "b" ? n - i : a === "l" || a === "ctr" || a === "r" ? (n - i) / 2 : 0
	};
}
var tl = new Set([
	"tl",
	"t",
	"tr",
	"l",
	"ctr",
	"r",
	"bl",
	"b",
	"br"
]), nl = new Set([
	"none",
	"x",
	"y",
	"xy"
]);
function rl(e) {
	return e.tile != null != (e.stretch === !0) && Un(e.srcRect);
}
function il(e) {
	let t = e.tile;
	if (!t) return null;
	let { algn: n, tx: r, ty: i, sx: a, sy: o } = t, s = t.flip ?? "none", c = e.dpi;
	return !n || !tl.has(n) || !nl.has(s) || !Number.isFinite(r) || !Number.isFinite(i) || !(c != null && Number.isFinite(c) && c > 0) || !(Number.isFinite(a) && a > 0) || !(Number.isFinite(o) && o > 0) ? null : {
		alignment: n,
		tx: r,
		ty: i,
		sx: a,
		sy: o,
		dpi: c,
		flipX: s === "x" || s === "xy",
		flipY: s === "y" || s === "xy"
	};
}
function al(e) {
	return !Gr(e) || !rl(e) ? null : Qc?.(e) ?? null;
}
function ol(t, r, i = e) {
	let a = il(t);
	if (!a) return null;
	let o = Wn(r);
	if (!(Number.isFinite(o.w) && o.w > 0) || !(Number.isFinite(o.h) && o.h > 0)) return null;
	let s = 96 / a.dpi * (i / e), c = o.w * a.sx * s, l = o.h * a.sy * s;
	return !(c > 0) || !(l > 0) ? null : {
		alignment: a.alignment,
		tileW: c,
		tileH: l,
		offsetX: a.tx / n * i,
		offsetY: a.ty / n * i,
		flipX: a.flipX,
		flipY: a.flipY
	};
}
function sl(e, t, n) {
	let r = el(e.alignment, t, n, e.tileW, e.tileH);
	return {
		x: r.x + e.offsetX,
		y: r.y + e.offsetY
	};
}
function cl(e, t, n, r, i) {
	let a = ol(e, t, i);
	if (!a) return null;
	let { tileW: o, tileH: s } = a, c = Math.ceil(n / o) + 2, l = Math.ceil(r / s) + 2, u = c * l;
	return Number.isSafeInteger(u) ? {
		...a,
		columns: c,
		rows: l,
		repetitions: u
	} : null;
}
function ll(t, n, r, i, a = e) {
	if (!(r > 0) || !(i > 0) || !Gr(t) || !rl(t)) return 0;
	let o = (n ?? Qc)?.(t);
	if (!o) return 0;
	if (!t.tile) return 1;
	let s = cl(t, o, r, i, a);
	return s ? Math.min(s.repetitions, Ua) : 0;
}
function $(e) {
	return Number.isFinite(e) && e > 0;
}
function ul(e, t) {
	if (!$(t.widthPt) || !$(t.heightPt) || !$(e.metafileWidthFactor) || !$(e.metafileHeightFactor) || !Number.isFinite(e.targetWidthFactor) || e.targetWidthFactor < 0 || !Number.isFinite(e.targetHeightFactor) || e.targetHeightFactor < 0) return null;
	let n = t.widthPt * e.metafileWidthFactor, r = t.heightPt * e.metafileHeightFactor;
	if (!$(n) || !$(r)) return null;
	let i = t.targetWidthPx, a = t.targetHeightPx;
	if (i != null != (a != null)) return null;
	if (i == null || a == null) return {
		widthPt: n,
		heightPt: r
	};
	if (!$(i) || !$(a)) return null;
	let o = i * e.targetWidthFactor, s = a * e.targetHeightFactor;
	if (!Number.isFinite(o) || o < 0 || e.targetWidthFactor > 0 && o === 0 || !Number.isFinite(s) || s < 0 || e.targetHeightFactor > 0 && s === 0) return null;
	let c = Math.ceil(o), l = Math.ceil(s);
	return !Number.isFinite(c) || !Number.isFinite(l) ? null : {
		widthPt: n,
		heightPt: r,
		targetWidthPx: c,
		targetHeightPx: l
	};
}
function dl(e) {
	if (!Gr(e) || !rl(e)) return null;
	let t = e.srcRect ? 1 - e.srcRect.l - e.srcRect.r : 1, n = e.srcRect ? 1 - e.srcRect.t - e.srcRect.b : 1;
	if (!(Number.isFinite(t) && t > 0) || !(Number.isFinite(n) && n > 0)) return null;
	let r = e.srcRect != null;
	if (e.tile) {
		if (!il(e)) return null;
		let i = 1 / t, a = 1 / n;
		return !$(i) || !$(a) ? null : {
			preserveNaturalSize: !0,
			hasSourceCrop: r,
			targetWidthFactor: 0,
			targetHeightFactor: 0,
			metafileWidthFactor: i,
			metafileHeightFactor: a
		};
	}
	let i = e.fillRect, a = i?.l ?? 0, o = i?.t ?? 0, s = i?.r ?? 0, c = i?.b ?? 0;
	if (![
		a,
		o,
		s,
		c
	].every(Number.isFinite)) return null;
	let l = 1 - a - s, u = 1 - o - c;
	if (!$(l) || !$(u)) return null;
	let d = l / t, f = u / n;
	return !$(d) || !$(f) ? null : {
		preserveNaturalSize: !1,
		hasSourceCrop: r,
		targetWidthFactor: d,
		targetHeightFactor: f,
		metafileWidthFactor: d,
		metafileHeightFactor: f
	};
}
function fl(e, t) {
	return {
		fill: e.fill,
		preserveNaturalSize: e.preserveNaturalSize || t.preserveNaturalSize,
		hasSourceCrop: e.hasSourceCrop || t.hasSourceCrop,
		targetWidthFactor: Math.max(e.targetWidthFactor, t.targetWidthFactor),
		targetHeightFactor: Math.max(e.targetHeightFactor, t.targetHeightFactor),
		metafileWidthFactor: Math.max(e.metafileWidthFactor, t.metafileWidthFactor),
		metafileHeightFactor: Math.max(e.metafileHeightFactor, t.metafileHeightFactor)
	};
}
function pl(e, t) {
	if (Qa(e) > 1e4) return {
		usages: [],
		sourceLimitExceeded: !1,
		usageRejected: !1
	};
	e = Ao(e), e = F(e);
	let n = /* @__PURE__ */ new Map(), r = !1, i = !1, a = (e) => {
		if (i || !e || typeof e != "object" || e.fillType !== "image") return;
		let a = e, o = dl(a);
		if (!o) return;
		let s = Zc(a), c = {
			fill: a,
			...o
		};
		if (t && !t(c)) {
			i = !0;
			return;
		}
		let l = n.get(s);
		if (l) {
			n.set(s, fl(l, c));
			return;
		}
		if (n.size >= 256) {
			r = !0;
			return;
		}
		n.set(s, c);
	}, o = (e, t) => {
		let n = B(e, t);
		return n?.fillType === "image" || n == null ? n : null;
	}, s = (e, t, n) => {
		let r = H(e, t, n);
		return r?.fillType === "image" || r == null ? r : null;
	}, c = (e, t, n, r) => {
		let i = B(e, r);
		if (i !== void 0) return i?.fillType === "image" ? i : null;
		if (t) return null;
		let a = B(n, r);
		return a?.fillType === "image" || a == null ? a : null;
	}, l = (t, n, r) => {
		let i = pe(e, n, t, r);
		return i?.fillType === "image" || i == null ? i : null;
	}, u = (e, t, n, r, i, a, o) => {
		if (n === !0) {
			let e = W(a);
			if (e !== void 0) return e;
		}
		if (e?.fillType === "image") return e;
		if (e != null || t != null || r === !0 && n !== !0) return null;
		if (i?.fillNoStyle === !0) return;
		let s = G(i, a, 0, o);
		return s?.fillType === "image" || s == null ? s : null;
	}, d = u(e.chartFill, void 0, e.chartFillHidden, e.chartFillPaintAuthored, e.chartStyleRoles?.chartArea, I(e, "chartArea"), e.chartAreaStyle);
	d && a(d);
	let f = u(e.plotAreaFill, e.plotAreaBg, e.plotAreaFillHidden, e.plotAreaFillPaintAuthored, e.threeD ? e.chartStyleRoles?.plotArea3D : e.chartStyleRoles?.plotArea, I(e, e.threeD ? "plotArea3D" : "plotArea"), e.plotAreaStyle);
	f && a(f), e.showLegend && a(go(e));
	let p = (e, t, n, r = 0) => {
		a(ja(e, t, n, !0, 0, r)?.fillPaint);
	};
	e.title && p(e.titleStyle ? { style: e.titleStyle } : void 0, e.chartStyleRoles?.title, I(e, "title")), e.catAxisTitle && p(e.catAxisTitleStyle ? { style: e.catAxisTitleStyle } : void 0, e.chartStyleRoles?.axisTitle, I(e, "axisTitle")), e.valAxisTitle && p(e.valAxisTitleStyle ? { style: e.valAxisTitleStyle } : void 0, e.chartStyleRoles?.axisTitle, I(e, "axisTitle"));
	for (let t of [e.secondaryValAxis, e.secondaryCatAxis]) t?.title && p(t.titleStyle ? { style: t.titleStyle } : void 0, e.chartStyleRoles?.axisTitle, I(e, "axisTitle")), t?.displayUnits?.label && p(t.displayUnits.label.boxStyle, e.chartStyleRoles?.axisTitle, I(e, "axisTitle"));
	e.threeD?.seriesAxis?.title && p(e.threeD.seriesAxis.titleStyle ? { style: e.threeD.seriesAxis.titleStyle } : void 0, e.chartStyleRoles?.axisTitle, I(e, "axisTitle"));
	for (let t of [e.valAxisDisplayUnits, e.catAxisDisplayUnits]) t?.label && p(t.label.boxStyle, e.chartStyleRoles?.axisTitle, I(e, "axisTitle"));
	let m = e.series.some((e) => e.values.some((e) => e != null && Number.isFinite(e))), h = Math.max(e.categories.length, ...e.series.map((e) => e.categories?.length ?? e.values.length)), g = e.chartType === "surface" || e.chartType === "surface3D" ? e.series.length >= 2 && h >= 2 && m : m;
	if (e.threeD && Xc.has(e.chartType) && g) {
		let t = e.valMin != null && Number.isFinite(e.valMin) && e.valMax != null && Number.isFinite(e.valMax) ? e.valMax - e.valMin : void 0;
		for (let [n, r] of [
			["floor", "floor"],
			["sideWall", "wall"],
			["backWall", "wall"]
		]) {
			let i = e.threeD[n], o = ye(e, i, r).fill;
			o?.fillType === "image" && so(o, i, n, t) && a(o);
		}
	}
	let _ = qt(e), v = (t, n) => {
		let r = ve(e, t, n);
		return r?.fillType === "image" || r == null ? r : null;
	}, y = (e, t, n) => {
		if (!e || !t) return;
		let r = !1, i = !1, o = Math.max(e.values.length, t.values.length);
		for (let n = 0; n < o && !(r && i); n++) {
			let a = e.values[n], o = t.values[n];
			a == null || o == null || !Number.isFinite(a) || !Number.isFinite(o) || a === o || (o > a ? r = !0 : i = !0);
		}
		r && a(v(n.up, "upBar")), i && a(v(n.down, "downBar"));
	};
	for (let t of e.lineGroupDecorations ?? []) {
		if (!t.upDownBars) continue;
		let n = e.series.filter((e) => e.lineGroupIndex === t.groupIndex);
		n.length === 0 && t.groupIndex === 0 && [
			"line",
			"stackedLine",
			"stackedLinePct"
		].includes(e.chartType) && (n = e.series.filter((e) => e.seriesType == null || e.seriesType === "line")), y(n[0], n.at(-1), t.upDownBars);
	}
	if (e.stockUpDownBars) {
		let t = e.plotGroups?.find((e) => e.kind === "stock"), n = t ? e.series.slice(t.seriesStart, t.seriesStart + t.seriesCount) : e.series;
		y(n[0], n.at(-1), e.stockUpDownBarStyle ?? {
			gapWidthPercent: 150,
			up: {},
			down: {}
		});
	}
	let b = e.series.some((t, n) => {
		let r = _[n];
		return (r?.kind === "bubble" || r?.kind === "scatter" ? "scatter" : t.seriesType ?? (e.chartType === "bubble" ? "scatter" : e.chartType)) === "scatter" && (t.categories ?? e.categories).some((e) => Number.isFinite(Number.parseFloat(e)));
	}), x = Ct(e), S = xt(e, !0), C = e.categories.length > 0 || (e.series[0]?.categories?.length ?? 0) > 0 || e.series.some((e) => e.values.length > 0);
	for (let t = 0; t < e.series.length; t++) {
		let n = e.series[t], r = n.chartexFormatIdx ?? t, i = L(e, t), c = R(e, "dataPointMarker", t), l = _[t], u = l?.kind === "bubble" || l == null && e.chartType === "bubble", d = l?.kind === "bubble" || l?.kind === "scatter" ? "scatter" : n.seriesType ?? (e.chartType === "bubble" ? "scatter" : e.chartType), f = Jt(e.chartType, l), m = l?.scatterStyle ?? e.scatterStyle, h = l?.radarStyle ?? e.radarStyle, g = {
			chartType: f,
			bubbleScale: l?.bubbleScale ?? e.bubbleScale,
			showNegativeBubbles: l?.showNegativeBubbles ?? e.showNegativeBubbles
		}, v = d === "line" || d === "stackedLine" || d === "stackedLinePct" || d === "area" || d === "stackedArea" || d === "stackedAreaPct" || d === "scatter" || d === "radar" || d === "stock", y = d === "area" || d === "stackedArea" || d === "stackedAreaPct", w = y ? (n.showMarker === !0 || Et(n)) && n.markerSymbol !== "none" : d === "stock" ? n.markerSymbol != null && n.markerSymbol !== "none" : n.showMarker !== !1 && n.markerSymbol !== "none", T = Tt(S, x, t), E = Math.max(n.values.length, n.categories?.length ?? 0, e.categories.length), D = new Map((n.dataLabelOverrides ?? []).map((e) => [e.idx, e]));
		for (let i = 0; i < E; i++) {
			let a = D.get(i);
			if (lt(n.seriesDataLabels, a) || !(a?.text || (a?.showVal ?? n.seriesDataLabels?.showVal ?? e.showDataLabels) || (a?.showCatName ?? n.seriesDataLabels?.showCatName) || (a?.showSerName ?? n.seriesDataLabels?.showSerName) || (a?.showPercent ?? n.seriesDataLabels?.showPercent) || (a?.showBubbleSize ?? n.seriesDataLabels?.showBubbleSize) || (a?.showLegendKey ?? n.seriesDataLabels?.showLegendKey)) || !Mt(e, n, d, i, b, t)) continue;
			let o = Na(a?.labelBox, n.seriesDataLabels?.labelBox), s = Ma(o);
			p(o, s ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, s ? I(e, "dataLabelCallout") ?? I(e, "dataLabel") : I(e, "dataLabel"), a ? i : r);
		}
		for (let t of n.trendLines ?? []) (t.dispEq === !0 || t.dispRSqr === !0 || t.labelText || t.labelRichRuns?.some((e) => e.text.length > 0) === !0) && p(t.labelBox, e.chartStyleRoles?.trendlineLabel, I(e, "trendlineLabel"), r);
		let O = Nt(e, n, d, E, b, g, t) > 0, k = new Map((n.dataLabelOverrides ?? []).map((e) => [e.idx, e])), A = (r) => {
			let i = k.get(r);
			return !lt(n.seriesDataLabels, i) && (i?.showLegendKey ?? n.seriesDataLabels?.showLegendKey ?? !1) === !0 && Mt(e, n, d, r, b, t);
		}, j = S[t]?.pointDriven === !0, ee = !j && Lt(f, m, n, h) && (e.showLegend && T || e.dataTable?.showKeys === !0 && Pt(e.chartType) && C || O), te = n.markerSymbol ?? (d === "stock" ? "none" : "circle"), M = l?.kind === "bar3D" || l?.kind === "pie3D" || l?.kind === "area3D" || l?.kind === "line3D" || l?.kind === "surface3D", N = P(e) && (e.chartType === "clusteredColumn" || e.chartType === "histogram" || e.chartType === "pareto") && (l?.kind === "bar" || d === "bar" || d === "clusteredBar" || d === "clusteredBarH" || d === "stackedBar" || d === "stackedBarH" || d === "stackedBarPct" || d === "stackedBarHPct");
		if (!M && (l?.kind === "bar" || d === "bar" || d === "clusteredBar" || d === "clusteredBarH" || d === "stackedBar" || d === "stackedBarH" || d === "stackedBarPct" || d === "stackedBarHPct" || d === "pie" || d === "doughnut" || d === "ofPie" || y || d === "radar" && h === "filled")) {
			let o = new Map((n.dataPointOverrides ?? []).map((e) => [e.idx, e])), s = y ? n.values.length > 0 : d === "radar" ? E > 2 && Array.from({ length: E }, (e, t) => n.values[t] != null && Number.isFinite(n.values[t])).every(Boolean) : n.values.some((e) => e != null && Number.isFinite(e) && e !== 0), c = !N && e.showLegend && T || e.dataTable?.showKeys === !0 && Pt(e.chartType) && C || O, l = i || d === "pie" || d === "doughnut" || d === "ofPie";
			if (s || c) if (y || d === "radar" && !i) {
				let t = xe(e, n, void 0, r);
				t?.fillType === "image" && a(t);
			} else if (d === "radar") {
				let t = o.get(0), r = xe(e, n, t, 0, 0);
				r?.fillType === "image" && a(r);
			} else {
				if (c && !l) {
					let t = xe(e, n, void 0, r);
					t?.fillType === "image" && a(t);
				}
				for (let s = 0; s < E; s++) {
					let c = n.values[s], u = !N && c != null && Number.isFinite(c) && c !== 0, d = l && (!N && e.showLegend && wt(S, x, t, s) || e.dataTable?.showKeys === !0 && Pt(e.chartType) && C && s === 0 || A(s));
					if (!u && !d) continue;
					let f = o.get(s), p = xe(e, n, f, i ? s : r, s);
					p?.fillType === "image" && a(p);
				}
			}
		}
		if (!v || It(d, f, m, h)) continue;
		if (ee && At(te)) {
			if (u) {
				let i = I(e, "dataPoint"), c = s(n.chartexStyle, i, r);
				if (c && a(c), c === void 0 && n.color == null) {
					let n = o(R(e, "dataPoint", t), r);
					n && a(n);
				}
			} else a(n.markerFillPaint);
			if (!u && n.markerFillPaint === void 0 && n.markerFill == null && !(n.markerFillPaintAuthored === !0 && n.markerStyle?.fillHidden !== !0) && !i) {
				let t = G(c, I(e, "dataPointMarker"), r, n.markerStyle);
				t?.fillType === "image" && a(t);
			}
		}
		if (!w && !Ft(n)) continue;
		let ne = new Map((n.dataPointOverrides ?? []).map((e) => [e.idx, e]));
		for (let f = 0; f < E; f++) {
			let p = jt(e, n, d, f, b, g) && (!u || (l?.bubbleScale ?? e.bubbleScale ?? 100) > 0 && Ot({ showNegativeBubbles: l?.showNegativeBubbles ?? e.showNegativeBubbles }, n.bubbleSizes?.[f]) != null), m = j && e.showLegend && wt(S, x, t, f), h = j && e.dataTable?.showKeys === !0 && Pt(e.chartType) && C && f === 0, _ = j && A(f);
			if (!p && !m && !h && !_) continue;
			let v = ne.get(f);
			if (!At(Rt(n, v, "circle", w))) continue;
			if (u) {
				if ((n.bubbleSizes?.[f] ?? 0) < 0) continue;
				let i = R(e, "dataPoint", t), c = L(e, t) ? f : r, l = I(e, "dataPoint"), u = H(v?.chartexStyle, l, f), d = u?.fillType === "image" || u == null ? u : null;
				d && a(d);
				let p = v?.fillHidden === !0 ? W(l) : void 0;
				if (d !== void 0 || p !== void 0 || v?.color != null || n.dataPointColors?.[f] != null) continue;
				let m = s(n.chartexStyle, l, r);
				if (m && a(m), m !== void 0 || n.color != null) continue;
				let h = o(i, c);
				h && a(h);
				continue;
			}
			let y = zt(n, v, f);
			if (a(y), y === void 0 && v?.markerFill == null && v?.color == null && n.dataPointColors?.[f] == null && n.markerFill == null && !(v?.markerFillPaintAuthored === !0 && v.markerStyle?.fillHidden !== !0) && !(n.markerFillPaintAuthored === !0 && n.markerStyle?.fillHidden !== !0)) {
				let t = v?.markerStyle?.shapePropertiesPresent === !0 ? v.markerStyle : n.markerStyle, o = G(c, I(e, "dataPointMarker"), i ? f : r, t);
				o?.fillType === "image" && a(o);
			}
		}
	}
	for (let t = 0; t < (e.chartexBox?.series.length ?? 0); t++) {
		let n = e.chartexBox.series[t];
		if (!At(e.chartStyleMarkerSymbol ?? e.chartexMarkerSymbol ?? "circle") || !(n.showNonoutliers || n.showOutliers)) continue;
		let r = 0;
		for (let e of n.valuesByCategory) {
			let t = fi(e, n.quartileMethod);
			t && (r += mi(t, n.showNonoutliers, n.showOutliers));
		}
		if (r === 0) continue;
		let i = n.chartexFormatIdx ?? t, c = n.chartexStyle, l = e.chartexDataPointMarkerStyle ?? e.chartexDataPointStyle ?? void 0, u = s(c, e.chartexDataPointMarkerStyle == null ? I(e, "dataPoint") ?? (e.classicChartStyleRoles == null ? l : void 0) : I(e, "dataPointMarker") ?? (e.classicChartStyleRoles == null ? l : void 0), i);
		if (u && a(u), u !== void 0 || n.color != null) continue;
		let d = o(l, i);
		d && a(d);
	}
	let w = qc(e, (t, n) => n !== 0 || !e.chartexParetoOutlineOwner ? t : {
		...t,
		chartexStyle: {
			...t.chartexStyle,
			fillHidden: !0,
			fillPaintAuthored: !0
		}
	});
	if (w?.kind === "columns" && (Jc(w, (e, t, n) => {
		a(l(t, e, n));
	}), Yc(w, (e, t, n) => {
		a(l(t, e, n));
	})), e.chartType === "waterfall") {
		let t = e.series[0], n = new Map((t?.dataPointOverrides ?? []).map((e) => [e.idx, e])), r = za(t?.values ?? [], e.categories.length, e.subtotalIndices);
		if (!r.cumulativeOverflow && r.rawMax > r.rawMin) for (let e = 0; e < r.bars.length; e++) {
			let i = r.bars[e];
			i.paintSlot && a(l(n.get(e), t, i.semanticIndex));
		}
	} else if (e.chartType === "funnel") {
		let t = e.series[0], n = t?.values ?? [];
		if (n.some((e) => e != null && e > 0)) {
			let r = new Map((t?.dataPointOverrides ?? []).map((e) => [e.idx, e])), i = Math.max(n.length, e.categories.length);
			for (let e = 0; e < i; e++) (n[e] ?? 0) > 0 && a(l(r.get(e), t, 0));
		}
	}
	for (let t = 0; t < (e.chartexBox?.series.length ?? 0); t++) {
		let n = e.chartexBox.series[t];
		n.valuesByCategory.some((e) => fi(e, n.quartileMethod) != null) && a(c(n.chartexStyle, n.color, e.chartexDataPointStyle, n.chartexFormatIdx ?? t));
	}
	let T = e.series[0], E = new Map((T?.dataPointOverrides ?? []).map((e) => [e.idx, e]));
	return La(e, ({ node: e, paintsBody: t }) => {
		t && a(l(E.get(e.labelIndex), T, e.branchIndex));
	}), Ra(e, ({ label: t, linkedStyleIndex: n }) => {
		let r = t.labelBox, i = Ma(r), o = i ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, s = ja(r, o, i ? I(e, "dataLabelCallout") ?? I(e, "dataLabel") : I(e, "dataLabel"), o != null, 0, n);
		s?.fillPaint?.fillType === "image" && a(s.fillPaint);
	}), {
		usages: r || i ? [] : [...n.values()],
		sourceLimitExceeded: r,
		usageRejected: i
	};
}
function ml(e) {
	return S(() => re(() => pl(e).usages));
}
function hl(e, t) {
	return S(() => re(() => {
		let n = /* @__PURE__ */ new Map();
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = pl(i, t ? (e) => t(e, r) : void 0);
			if (!a.usageRejected) {
				if (a.sourceLimitExceeded) return [];
				for (let e of a.usages) {
					let t = Zc(e.fill), r = n.get(t);
					if (r) {
						n.set(t, fl(r, e));
						continue;
					}
					if (n.size >= 256) return [];
					n.set(t, e);
				}
			}
		}
		return [...n.values()];
	}));
}
function gl(t, n, r, i, a, o, s = e, c = 0) {
	if (!Gr(n) || !(a > 0) || !(o > 0) || !rl(n)) return !1;
	let l = Qc?.(n);
	if (!l || c !== 0 && n.rotWithShape == null) return !1;
	if (t.save(), t.beginPath(), t.rect(r, i, a, o), t.clip(), n.rotWithShape === !1 && c !== 0 && (t.translate(r + a / 2, i + o / 2), t.rotate(-c * Math.PI / 180), t.translate(-(r + a / 2), -(i + o / 2))), n.alpha != null && (t.globalAlpha *= Math.max(0, Math.min(1, n.alpha))), !n.tile) {
		let e = n.fillRect, s = r + (e?.l ?? 0) * a, c = i + (e?.t ?? 0) * o, u = (1 - (e?.l ?? 0) - (e?.r ?? 0)) * a, d = (1 - (e?.t ?? 0) - (e?.b ?? 0)) * o;
		return u > 0 && d > 0 && Kn(t, l, n.srcRect, s, c, u, d), t.restore(), u > 0 && d > 0;
	}
	let u = cl(n, l, a, o, s);
	if (!u || u.repetitions > 4096) return t.restore(), !1;
	let { tileW: d, tileH: f, flipX: p, flipY: m, columns: h, rows: g } = u, _ = sl(u, a, o), v = r + _.x, y = i + _.y, b = Math.floor((r - v) / d) - 1, x = Math.floor((i - y) / f) - 1;
	for (let e = x; e < x + g; e++) for (let r = b; r < b + h; r++) {
		let i = v + r * d, a = y + e * f, o = p && Math.abs(r) % 2 == 1, s = m && Math.abs(e) % 2 == 1;
		t.save(), t.translate(i + (o ? d : 0), a + (s ? f : 0)), t.scale(o ? -1 : 1, s ? -1 : 1), Kn(t, l, n.srcRect, 0, 0, d, f), t.restore();
	}
	return t.restore(), !0;
}
//#endregion
//#region packages/core/src/chart/plot-area-frame.ts
function _l(e, t, r, i, a, o, s, c = 0) {
	Ki(e, t.plotAreaStyle, t.threeD ? t.chartStyleRoles?.plotArea3D : t.chartStyleRoles?.plotArea, 0, {
		x: r,
		y: i,
		w: a,
		h: o
	}, s, (e) => {
		if (t.plotAreaFillHidden !== !0) if (t.plotAreaFill?.fillType === "image") gl(e, t.plotAreaFill, r, i, a, o, s, c);
		else {
			let n = t.plotAreaFill ? Xr(t.plotAreaFill, e, r, i, a, o, c) : t.plotAreaBg ? `#${t.plotAreaBg}` : null;
			n && (e.fillStyle = n, e.fillRect(r, i, a, o));
		}
		if (t.plotAreaLineHidden === !0 || !t.plotAreaLineFill && !t.plotAreaLineColor) return;
		let l = t.plotAreaLineWidthEmu ? Math.max(.5, t.plotAreaLineWidthEmu / n) * s : 1;
		e.save();
		let u = t.plotAreaLineFill ? Xr(t.plotAreaLineFill, e, r, i, a, o, c) : t.plotAreaLineColor ? `#${t.plotAreaLineColor}` : null;
		u && (e.strokeStyle = u, e.setLineDash(sr(t.plotAreaLineCustomDash, t.plotAreaLineDash, l)), e.lineCap = t.plotAreaLineCap === "rnd" ? "round" : t.plotAreaLineCap === "sq" ? "square" : "butt", e.lineJoin = t.plotAreaLineJoin === "round" || t.plotAreaLineJoin === "bevel" ? t.plotAreaLineJoin : "miter", ho(e, r, i, a, o, l, t.plotAreaLineCompound)), e.restore();
	});
}
//#endregion
export { xs as $, j as $i, tr as $n, gt as $r, Za as $t, Zs as A, xe as Ai, Ei as An, Bt as Ar, Go as At, rc as B, G as Bi, hi as Bn, Ot as Br, lo as Bt, Mc as C, we as Ci, qi as Cn, kt as Cr, Vo as Ct, jc as D, Ce as Di, Ki as Dn, Nt as Dr, Jo as Dt, Nc as E, Te as Ei, X as En, jt as Er, Ho as Et, yc as F, ce as Fi, _i as Fn, Dt as Fr, Oo as Ft, dc as G, re as Gi, Jr as Gn, xt as Gr, to as Gt, xc as H, _e as Hi, oi as Hn, Ct as Hr, so as Ht, ac as I, H as Ii, yi as In, Et as Ir, _o as It, Qs as J, P as Ji, ni as Jn, _t as Jr, Ua as Jt, gc as K, R as Ki, Xr as Kn, vt as Kr, ro as Kt, fc as L, U as Li, mi as Ln, Lt as Lr, ho as Lt, ic as M, fe as Mi, Oi as Mn, Ut as Mr, zo as Mt, oc as N, pe as Ni, Di as Nn, At as Nr, Io as Nt, _c as O, Oe as Oi, Wi as On, Rt as Or, Uo as Ot, bc as P, ve as Pi, vi as Pn, It as Pr, Ao as Pt, vc as Q, D as Qi, Lr as Qn, ut as Qr, $a as Qt, Js as R, W as Ri, gi as Rn, Ht as Rr, co as Rt, Ac as S, Ye as Si, Ji as Sn, Jt as Sr, Xo as St, Pc as T, Se as Ti, Xi as Tn, Mt as Tr, Ko as Tt, lc as U, V as Ui, qr as Un, St as Ur, eo as Ut, hc as V, B as Vi, fi as Vn, yt as Vr, uo as Vt, pc as W, ye as Wi, Y as Wn, wt as Wr, no as Wt, $s as X, w as Xi, ti as Xn, ft as Xr, Va as Xt, sc as Y, E as Yi, ei as Yn, dt as Yr, Ha as Yt, ec as Z, L as Zi, Rr as Zn, lt as Zr, Ya as Zt, Wc as _, je as _i, aa as _n, Qt as _r, ps as _t, ul as a, p as aa, Xe as ai, Ma as an, Kn as ar, ws as at, Uc as b, ke as bi, ea as bn, Yt as br, cs as bt, ml as c, ze as ci, Pa as cn, qn as cr, ys as ct, $c as d, qe as di, Sa as dn, mn as dr, ms as dt, I as ea, mt as ei, Qa as en, sr as er, qs as et, qc as f, Je as fi, Ca as fn, Hn as fr, _s as ft, Bc as g, Ze as gi, _a as gn, nn as gr, Zo as gt, Gc as h, Fe as hi, fa as hn, an as hr, ts as ht, al as i, d as ia, rt as ii, Ia as in, Gn as ir, Ss as it, cc as j, be as ji, Ti as jn, zt as jr, Wo as jt, Xs as k, De as ki, Ni as kn, Ft as kr, qo as kt, hl as l, Re as li, Da as ln, _n as lr, vs as lt, Jc as m, Ie as mi, va as mn, cn as mr, es as mt, Zc as n, F as na, st as ni, La as nn, ur as nr, Ts as nt, ol as o, Le as oi, ja as on, Wn as or, Rs as ot, Yc as p, Ve as pi, xa as pn, Vn as pr, gs as pt, Ys as q, N as qi, Vr as qn, Tt as qr, Ba as qt, ll as r, f as ra, ct as ri, Ra as rn, rr, Es as rt, sl as s, Be as si, Na as sn, Jn as sr, bs as st, _l as t, S as ta, ht as ti, za as tn, ar as tr, Cs as tt, gl as u, Ke as ui, wa as un, hn as ur, hs as ut, Hc as v, Pe as vi, ia as vn, $t as vr, fs as vt, Ic as w, Ee as wi, Yi as wn, Pt as wr, Bo as wt, Rc as x, Qe as xi, ra as xn, qt as xr, ds as xt, Lc as y, $e as yi, na as yn, Xt as yr, Qo as yt, wc as z, ge as zi, pi as zn, Vt as zr, fo as zt };
