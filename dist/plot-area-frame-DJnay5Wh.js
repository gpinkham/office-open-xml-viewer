import { a as e, n as t, r as n, t as r } from "./units-EJdC96r6.js";
import { i, r as a } from "./pixel-budget-DEZjGJ9f.js";
//#region packages/core/src/chart/effective-style.ts
var o = [
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
], s = [
	"fontColor",
	"fontColors",
	"fontColorIndex",
	"fontFormattingIndices",
	"fontPaintAuthored",
	"fontHidden"
], c = [
	"fillPaints",
	"fillColors",
	"fillHidden",
	"fillPaintAuthored",
	"fillNoStyle",
	"fillColorIndex",
	"fillFormattingIndices",
	"fillSemanticFallbackIndices"
], l = [
	"lineColors",
	"linePaints",
	"linePaintAuthored",
	"lineHidden",
	"lineNoStyle",
	"lineColorIndex",
	"lineFormattingIndices",
	"lineSemanticFallbackIndices"
], u = [
	"shapePropertiesPresent",
	"allowNoFillOverride",
	"allowNoLineOverride"
], d = [
	"lineWidthEmu",
	"lineCap",
	"lineJoin",
	"lineCompound"
], f = [
	"lineDash",
	"lineDashAuthored",
	"lineCustomDash"
], p;
function m(e) {
	if (p) return e();
	p = /* @__PURE__ */ new WeakMap();
	try {
		return e();
	} finally {
		p = void 0;
	}
}
function h(e) {
	let t = p?.get(e);
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
	return p?.set(e, i), i;
}
function g(e, t, n = -1) {
	return h(e).series.get(t) ?? n;
}
function _(e, t) {
	return t >= 0 && t < e.series.length ? h(e).groupBySeries[t] ?? -1 : -1;
}
function v(e, t) {
	let n = _(e, t);
	return n >= 0 ? e.plotGroups?.[n] : void 0;
}
function y(...e) {
	for (let t of e) if (t != null && (t.lineDashAuthored === !0 || t.lineDash != null || t.lineCustomDash != null)) return t;
}
var b = [
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
function x(e, t, n) {
	if (!t) return;
	let r = e, i = t;
	for (let e of n) {
		let t = i[e];
		t != null && (r[e] = t);
	}
}
function S(e, t) {
	let n = e;
	return t.some((e) => n[e] !== void 0 && n[e] !== null);
}
function C(e, t) {
	if (!e) return t ?? void 0;
	if (!t) return e;
	let n = {};
	if (x(n, e, o), x(n, t, o), x(n, e, s), S(t, s)) {
		for (let e of s) delete n[e];
		x(n, t, s);
	}
	if (x(n, e, c), t.fillNoStyle !== !0 && S(t, c)) {
		for (let e of c) delete n[e];
		x(n, t, c);
	}
	if (x(n, e, l), x(n, e, d), x(n, e, f), t.lineNoStyle !== !0 && S(t, l)) {
		for (let e of l) delete n[e];
		x(n, t, l);
	}
	if (x(n, t, d), S(t, f)) {
		for (let e of f) delete n[e];
		x(n, t, f);
	}
	if (x(n, e, b), t.effectNoStyle !== !0 && S(t, b)) {
		for (let e of b) delete n[e];
		x(n, t, b);
	}
	return x(n, t, u), n;
}
function w(e) {
	let t = e.classicChartStyleRoles, n = e.linkedChartStyleRoles ?? e.chartStyleRoles;
	if (!t) return e;
	let r = new Set([...Object.keys(t), ...Object.keys(n ?? {})]), i = {};
	for (let e of r) {
		let r = C(t[e], n?.[e]);
		r && (i[e] = r);
	}
	let a = {};
	for (let r of [
		"dataPoint",
		"dataPoint3D",
		"dataPointLine",
		"dataPointMarker"
	]) {
		let i = C(e.classicVaryingPointChartStyleRoles?.[r] ?? t[r], n?.[r]);
		i && (a[r] = i);
	}
	let o = e.classicVaryingPointChartStyleRolesByGroup?.map((e) => {
		if (!e) return null;
		let t = {};
		for (let r of [
			"dataPoint",
			"dataPoint3D",
			"dataPointLine",
			"dataPointMarker"
		]) {
			let i = C(e[r], n?.[r]);
			i && (t[r] = i);
		}
		return t;
	});
	return {
		...e,
		linkedChartStyleRoles: n,
		chartStyleRoles: i,
		varyingPointChartStyleRoles: Object.keys(a).length > 0 ? a : void 0,
		varyingPointChartStyleRolesByGroup: o,
		chartexDataPointStyle: i.dataPoint,
		chartexDataPointLineStyle: i.dataPointLine,
		chartexSeriesLineStyle: i.seriesLine,
		chartexDataPointMarkerStyle: i.dataPointMarker
	};
}
function T(e, t) {
	return e.linkedChartStyleRoles?.[t] ?? (e.classicChartStyleRoles == null ? e.chartStyleRoles?.[t] : void 0);
}
function E(e, t) {
	let n = v(e, t);
	return n ? n.kind === "pie" || n.kind === "pie3D" || n.kind === "doughnut" || n.kind === "ofPie" ? n.varyColors !== !1 : n.kind === "bubble" ? n.seriesCount === 1 && n.varyColors !== !1 : n.kind === "line" || n.kind === "scatter" ? n.seriesCount === 1 && n.varyColors === !0 : n.kind === "radar" ? n.radarStyle !== "filled" && n.seriesCount === 1 && n.varyColors === !0 : (n.kind === "bar" || n.kind === "bar3D") && n.seriesCount === 1 && n.varyColors === !0 : e.chartType === "pie" || e.chartType === "pie3D" || e.chartType === "doughnut" || e.chartType === "ofPie" ? e.varyColors !== !1 : e.chartType === "bubble" ? e.series.length === 1 && e.varyColors !== !1 : e.varyColors === !0 && e.series.length === 1 && (e.chartType.includes("Bar") || e.chartType === "line" || e.chartType === "stackedLine" || e.chartType === "stackedLinePct" || e.chartType === "scatter" || e.chartType === "radar" && e.radarStyle !== "filled");
}
function D(e, t, n) {
	if (!E(e, n)) return e.chartStyleRoles?.[t];
	let r = _(e, n), i = r >= 0 ? e.varyingPointChartStyleRolesByGroup?.[r] : void 0;
	return i == null ? e.varyingPointChartStyleRoles?.[t] ?? e.chartStyleRoles?.[t] : i[t];
}
//#endregion
//#region packages/core/src/chart/sparse-style-index.ts
var O;
function k(e) {
	if (O) return e();
	O = {
		compact: /* @__PURE__ */ new WeakMap(),
		membership: /* @__PURE__ */ new WeakMap()
	};
	try {
		return e();
	} finally {
		O = void 0;
	}
}
function A(e, t) {
	if (!O) return e.indexOf(t);
	let n = O.compact.get(e);
	if (!n) {
		let t = /* @__PURE__ */ new Map();
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			t.has(r) || t.set(r, n);
		}
		n = t, O.compact.set(e, n);
	}
	return n.get(t) ?? -1;
}
function ee(e, t) {
	if (!e) return !1;
	if (!O) return e.includes(t);
	let n = O.membership.get(e);
	return n || (n = new Set(e), O.membership.set(e, n)), n.has(t);
}
//#endregion
//#region packages/core/src/chart/style-paint.ts
function te(e, t, n) {
	let r = t === "font" ? e.fontFormattingIndices : t === "fill" ? e.fillFormattingIndices : t === "line" ? e.lineFormattingIndices : e.effectFormattingIndices, i = r ? A(r, n) : -1;
	return i >= 0 ? i : n;
}
function ne(e, t) {
	if (!e) return null;
	if (!e.fontColors?.length) return e.fontColor ?? null;
	let n = e.fontColorIndex ?? te(e, "font", t);
	return e.fontColors[n % e.fontColors.length] ?? null;
}
function j(e, t, n) {
	if (!e) return null;
	let r = t === "fill" ? e.fillColors : e.lineColors;
	return r?.length ? r[((t === "fill" ? e?.fillColorIndex : e?.lineColorIndex) ?? te(e, t, n)) % r.length] ?? null : null;
}
function re(e, t) {
	if (!e) return null;
	let n = e.fillPaints;
	return n?.length ? n[(e.fillColorIndex ?? te(e, "fill", t)) % n.length] ?? null : null;
}
function ie(e, t) {
	if (!e) return null;
	let n = e.linePaints;
	return n?.length ? n[(e.lineColorIndex ?? te(e, "line", t)) % n.length] ?? null : null;
}
function M(e, t) {
	if (!e) return;
	if (e.fillHidden) return e.fillNoStyle ? void 0 : null;
	if (ee(e.fillSemanticFallbackIndices, t)) return;
	let n = re(e, t);
	if (n) return n;
	let r = j(e, "fill", t);
	return r ? {
		fillType: "solid",
		color: r
	} : e.fillPaintAuthored === !0 ? null : void 0;
}
function ae(e, t) {
	if (!e) return;
	if (e.lineHidden) return e.lineNoStyle ? void 0 : null;
	if (ee(e.lineSemanticFallbackIndices, t)) return;
	let n = ie(e, t);
	if (n) return n;
	let r = j(e, "line", t);
	return r ? {
		fillType: "solid",
		color: r
	} : e.linePaintAuthored === !0 ? null : void 0;
}
function oe(e, t) {
	return e == null ? !0 : t === "fill" ? e.fillNoStyle === !0 || e.allowNoFillOverride === !0 : e.lineNoStyle === !0 || e.allowNoLineOverride === !0;
}
function N(e, t, n) {
	let r = M(e, n);
	return r === null && e?.fillHidden === !0 && !oe(t, "fill") ? void 0 : r;
}
function se(e, t, n) {
	let r = ae(e, n);
	return r === null && e?.lineHidden === !0 && !oe(t, "line") ? void 0 : r;
}
function P(e) {
	return oe(e, "fill") ? null : void 0;
}
function ce(e) {
	return oe(e, "line") ? null : void 0;
}
function F(e, t, n, ...r) {
	for (let e of r) {
		let r = N(e, t, n);
		if (r !== void 0) return r;
	}
	return M(e, n);
}
function le(e, t, n, ...r) {
	for (let e of r) {
		let r = se(e, t, n);
		if (r !== void 0) return r;
	}
	return ae(e, n);
}
function ue(e, t, n) {
	let r = T(e, n);
	if (t.fillHidden === !0) {
		let e = P(r);
		if (e !== void 0) return e;
	}
	if (t.fill != null) return t.fill;
	if (t.fillColor != null) return {
		fillType: "solid",
		color: t.fillColor
	};
	let i = N(t.style, r, 0);
	return i === void 0 ? t.fillPaintAuthored === !0 && t.fillHidden !== !0 ? null : F(e.chartStyleRoles?.[n], r, 0, t.style) : i;
}
function de(e, t, n) {
	let r = t?.style, i = e.chartStyleRoles?.[n], a = T(e, n), o;
	t?.fillHidden === !0 ? (o = P(a), o === void 0 && (o = M(i, 0))) : o = t?.fillColor ? {
		fillType: "solid",
		color: t.fillColor
	} : F(i, a, 0, r);
	let s;
	t?.lineHidden === !0 ? (s = ce(a), s === void 0 && (s = ae(i, 0))) : s = t?.lineColor ? {
		fillType: "solid",
		color: t.lineColor
	} : le(i, a, 0, r);
	let c = i, l = y(t?.lineDash == null ? void 0 : {
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
function fe(e, t, n, r, i) {
	let a = r?.chartexStyle, o = n.chartexStyle, s = g(e, n), c = D(e, t, s >= 0 ? s : i) ?? (t === "dataPoint" ? e.chartexDataPointStyle : e.chartexDataPointLineStyle), l = T(e, t), u = r?.lineHidden === !0 ? null : se(a, l, r?.idx ?? i);
	u === void 0 && r?.lineColor && (u = {
		fillType: "solid",
		color: r.lineColor
	}), u === void 0 && (u = n.lineHidden === !0 ? null : se(o, l, i)), u === void 0 && n.lineColor && (u = {
		fillType: "solid",
		color: n.lineColor
	}), u === void 0 && (u = ae(c, i));
	let d = y(r?.lineDash == null ? void 0 : {
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
function pe(e, t, n, r, i) {
	let a = g(e, t), o = D(e, "dataPoint", a >= 0 ? a : r) ?? e.chartexDataPointStyle, s = T(e, "dataPoint"), c = N(n?.chartexStyle, s, n?.idx ?? r);
	if (c !== void 0) return c;
	if (n?.fillHidden === !0) {
		let e = P(s);
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
	let u = N(t.chartexStyle, s, r);
	return u === void 0 ? t.color === "00000000" ? null : t.fillPattern ? t.fillPattern : M(o, r) : u;
}
//#endregion
//#region packages/core/src/chart/category-spacing.ts
function me(e, t) {
	return t == null || !Number.isFinite(t) ? e : e * Math.max(0, Math.min(1e3, t)) / 100;
}
function he(e, t, n, r = !1) {
	let i = Math.max(0, t - 1), a = Number.isFinite(e) ? Math.max(0, Math.min(i, e)) : 0, o = n ? (a + .5) / Math.max(1, t) : t === 1 ? .5 : a / i;
	return r ? 1 - o : o;
}
function ge(e, t) {
	if (e <= 0) return [];
	let n = [], r = t ? e : e - 1;
	for (let i = 0; i <= r; i++) n.push(t ? i / e : e === 1 ? .5 : i / (e - 1));
	return n;
}
function _e(e, t) {
	return e <= 0 ? [] : t ? Array.from({ length: e }, (t, n) => (n + .5) / e) : e <= 1 ? [] : Array.from({ length: e - 1 }, (t, n) => (n + .5) / (e - 1));
}
function ve(e, t, n, r, i) {
	if (i == null) return {
		fraction: he(e, t, n, r),
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
function ye(e, t) {
	return e != null && Number.isFinite(e) ? Math.max(0, Math.min(500, e)) : t === "legacy" ? 150 : 33;
}
//#endregion
//#region packages/core/src/chart/layout.ts
function be(e, t, n) {
	let r = Math.max(1, t), i = [], a = [], o = 0;
	for (let t = 0; t < e.length; t++) {
		let s = Math.min(r, Math.max(0, e[t])), c = a.length === 0 ? s : o + n + s;
		a.length > 0 && c > r ? (i.push(a), a = [t], o = s) : (a.push(t), o = c);
	}
	return a.length > 0 && i.push(a), i;
}
var xe = 14;
function Se(e, t) {
	return typeof e == "number" && Number.isFinite(e) && e >= 100 && e <= 4e5 ? e / 100 * t : null;
}
function Ce(e, t, n) {
	return Se(e.titleFontSizeHpt, n) ?? xe * n;
}
var we = .62;
function Te(e, t, n, r, i) {
	if (!e.title && !e.titlePresent) return {
		fontPx: 0,
		topPad: 0,
		bottomPad: 0,
		bandH: 0
	};
	let a = Ce(e, t, n), o = a + t * r + t * i, s = Math.min(Math.max(0, o - a), a * we);
	return {
		fontPx: a,
		topPad: s,
		bottomPad: o - a - s,
		bandH: o
	};
}
function Ee(e, t, n, r, i) {
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
		let e = Math.max(1, t - i.horizontalPadding), r = be(i.itemWidths, e, i.itemGap).length * i.rowHeight + i.verticalPadding;
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
function De(e, t = !1) {
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
function Oe(e, t) {
	return Se(e, t) ?? 10 * t;
}
function ke(e, t) {
	return Math.max(0, e != null && Number.isFinite(e) ? e : 0) / n * t;
}
function Ae(e, t, n) {
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
function je(e) {
	return Math.max(8, e * .02);
}
function Me(e, t, n, r) {
	let i = Oe(e.catAxisTitleFontSizeHpt, r), a = Oe(e.valAxisTitleFontSizeHpt, r), o = ke(e.catAxisTitleTextVerticalInsetEmu, r), s = ke(e.valAxisTitleTextVerticalInsetEmu, r);
	return {
		catFontPx: i,
		valFontPx: a,
		catBandH: e.catAxisTitle ? i + o + je(n) + 4 : 0,
		valBandW: e.valAxisTitle ? a + s + je(t) + 4 : 0
	};
}
var Ne = 2.25, Pe = 2.75, Fe = 2.15, Ie = 3.05;
function Le(e, t, n) {
	if (!e.title && !e.titlePresent) return {
		fontPx: 0,
		topPad: 0,
		bottomPad: 0,
		bandH: 0
	};
	let r = Ce(e, t, n), i = r * (e.cartesianAutoLayoutProfile === "wordClassicColumn" ? Fe : Ne), a = Math.min(Math.max(0, i - r), r * we);
	return {
		fontPx: r,
		topPad: a,
		bottomPad: i - r - a,
		bandH: i
	};
}
function Re(e, t, n) {
	let r = ze(e), i = me(r, t);
	return e * (n === "wordClassicColumn" ? Ie : Pe) + i - r;
}
function ze(e) {
	return 5 / 6 * e;
}
function Be(e) {
	return e;
}
var Ve = 1.5;
function He(e) {
	let t = e.outerTextMarginPx ?? 0;
	return {
		t: e.valAxisHidden ? 0 : e.valLabelFontPx / 2 + t,
		r: (e.secondaryBandW ?? 0) > 0 ? (e.secondaryBandW ?? 0) + t : 0,
		b: e.catAxisHidden ? 0 : e.catLabelFontPx + (e.catLabelGapPx ?? ze(e.catLabelFontPx)) + e.catTitleBandH + t,
		l: e.valAxisHidden ? 0 : e.valLabelWidth + (e.valLabelGapPx ?? Be(e.valLabelFontPx)) + e.valTitleBandW + t
	};
}
function Ue(e, t, n) {
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
function We(e, t, n, r, i, a, o) {
	let s = o.titleBand ?? Te(e, i, a, o.titleTopPadFrac ?? 0, o.titleBottomPadFrac ?? 0), c = o.legendReserve === void 0 ? Ee(e, r, i, o.legendSideReserveFrac) : o.legendReserve, l = De(c, e.legendOverlay === !0), u = Me(e, r, i, a), d, f, p, m;
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
		}, s = Ue(g, {
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
var Ge = (e) => [
	e.x,
	e.y,
	e.w,
	e.h
].every(Number.isFinite) && e.w > 0 && e.h > 0;
function Ke(e, t) {
	let n = Math.max(e.x, t.x), r = Math.max(e.y, t.y), i = Math.min(e.x + e.w, t.x + t.w), a = Math.min(e.y + e.h, t.y + t.h);
	return i > n && a > r ? {
		x: n,
		y: r,
		w: i - n,
		h: a - r
	} : null;
}
function qe(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function Je(e, t, n, r, i, a = t) {
	if (!Ge(t) || !Ge(a) || !Number.isFinite(r) || r <= 0 || ![n.w, n.h].every(Number.isFinite) || n.w < 0 || n.h <= 0) return null;
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
		let r = Ke(e.rect, t);
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
			let n = Ke(e.rect, t);
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
		let e = Ue(i, a, h);
		if (!e) return null;
		h = e, d = "center", f = "middle";
		let n = Ke(e, t);
		if (!n || (s = n, s.w < p || s.h < m)) return null;
	}
	let g = Math.min(Math.max(p, h.w), s.w), _ = Math.min(Math.max(m, h.h), s.h), v = g / 2, y = _ / 2, b = u || i ? h.x + h.w / 2 : qe(h.x + h.w / 2, s.x + v, s.x + s.w - v), x = u || i ? h.y + h.h / 2 : qe(h.y + h.h / 2, s.y + y, s.y + s.h - y);
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
var Ye = 4096, Xe = 4;
function Ze(e, t, n) {
	if (n(e) <= t) return e;
	if (n("…") > t) return "";
	let r = 0, i = Array.from(e), a = i.length;
	for (; r < a;) {
		let e = Math.ceil((r + a) / 2);
		n(`${i.slice(0, e).join("")}…`) <= t ? r = e : a = e - 1;
	}
	return `${i.slice(0, r).join("")}…`;
}
function Qe(e) {
	let t = "", n = 0;
	for (let r of e) {
		if (n >= Ye) return {
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
function $e(e, t, n, r, i) {
	if (![
		t,
		n,
		r
	].every(Number.isFinite) || t <= 0 || n < r || r <= 0) return [];
	let a = Math.max(1, Math.min(Xe, Math.floor(n / r))), o = Qe(e), s = o.value.split(/\r?\n/), c = [], l = o.truncated, u = (e) => {
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
	return l && d.length > 0 && !d[d.length - 1].endsWith("…") && (d[d.length - 1] = Ze(`${d[d.length - 1]}…`, t, i)), d;
}
//#endregion
//#region packages/core/src/chart/data-label-style.ts
function I(e, t) {
	return (t?.deleted ?? e?.deleted) === !0;
}
function et(e, t) {
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
function tt(e, t) {
	return e?.textAlign === "l" ? "left" : e?.textAlign === "r" ? "right" : e?.textAlign === "ctr" ? "center" : t;
}
function nt(e, i) {
	let a = i / n, o = e?.textBodyAuthored === !0 ? r : 0, s = e?.textBodyAuthored === !0 ? t : 0;
	return {
		left: (e?.textLInsEmu ?? o) * a,
		top: (e?.textTInsEmu ?? s) * a,
		right: (e?.textRInsEmu ?? o) * a,
		bottom: (e?.textBInsEmu ?? s) * a
	};
}
function rt(e, t) {
	let n = Number.isFinite(e) ? e / 6e4 * Math.PI / 180 : 0;
	return t === "vert" ? n + Math.PI / 2 : t === "vert270" ? n + Math.PI * 3 / 2 : n;
}
function it(e, t, n, r) {
	let i = rt(n, r);
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
function at(e, t, n, r, i, a, o) {
	return r !== 0 && (e.translate(t, n), e.rotate(r), e.translate(-t, -n)), {
		x: t + (i === "left" ? o.left : i === "right" ? -o.right : (o.left - o.right) / 2),
		y: n + (a === "top" ? o.top : a === "bottom" ? -o.bottom : (o.top - o.bottom) / 2)
	};
}
function ot(e, t, n, r, i, a) {
	return a?.textWrap === "none" ? ![
		t,
		n,
		r
	].every(Number.isFinite) || t <= 0 || n <= 0 || r <= 0 ? [] : Qe(e).value.split(/\r?\n/) : $e(e, t, n, r, i);
}
function st(e, t, n, r, i, a, o = "center", s = "center", c = n.w, l = 0) {
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
function ct(e, t = 1, n = !0) {
	return e === "pie" || e === "ofPie" ? !0 : e === "doughnut" && (t <= 1 || n);
}
function lt(e) {
	return e.chartType === "bubble" && e.series.length === 1 && e.series[0]?.bubbleXSourceIsString === !0 ? !0 : !!e.varyColors && e.series.length === 1 && typeof e.chartType == "string" && (/Bar/.test(e.chartType) || e.chartType === "line" || e.chartType === "stackedLine" || e.chartType === "stackedLinePct" || e.chartType === "scatter" || e.chartType === "radar" && e.radarStyle !== "filled");
}
function ut(e, t) {
	let n = 0;
	for (let r of e.series[t]?.trendLines ?? []) r.lineHidden === !0 || r.linePaintAuthored === !0 && r.lineColor == null || n++;
	return n;
}
function dt(e, t = !1) {
	let n = e.series.map(() => ({
		firstIndex: -1,
		count: 0,
		pointDriven: !1
	}));
	if (e.series.length === 0) return n;
	let r = ct(e.chartType, e.series.length, e.varyColors !== !1), i = lt(e);
	if (r || i) return n[0] = {
		firstIndex: 0,
		count: e.series[0]?.values.length ?? 0,
		pointDriven: !0
	}, n;
	let a = 0;
	for (let r = 0; r < e.series.length; r++) {
		let i = v(e, r), o = i?.kind !== "pie" && i?.kind !== "pie3D" && i?.kind !== "doughnut" && i?.kind !== "ofPie" && E(e, r), s = o ? e.series[r].values.length : 1;
		n[r] = {
			firstIndex: a,
			count: s,
			pointDriven: o
		}, a += s + (t ? ut(e, r) : 0);
	}
	return n;
}
function ft(e, t, n = 0) {
	let r = e[t];
	if (!r || r.firstIndex < 0 || r.count === 0) return null;
	let i = r.pointDriven ? n : 0;
	return i >= 0 && i < r.count ? r.firstIndex + i : null;
}
function pt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.legendEntries ?? []) n.deleted === !0 && t.add(n.idx);
	return t;
}
function mt(e, t, n, r = 0) {
	let i = ft(e, n, r);
	return i != null && !t.has(i);
}
function ht(e, t, n) {
	let r = e[n];
	if (!r || r.firstIndex < 0) return !1;
	for (let e = 0; e < r.count; e++) if (!t.has(r.firstIndex + e)) return !0;
	return !1;
}
//#endregion
//#region packages/core/src/chart/marker-style.ts
function gt(e) {
	return e.markerSymbol != null || e.markerSize != null || e.markerFill != null || e.markerFillPaint !== void 0 || e.markerFillPaintAuthored === !0 || e.markerStyle != null || e.markerLine != null || e.markerLinePaintAuthored === !0 || e.markerLineWidthEmu != null;
}
function _t(e) {
	return e != null && (e.markerSymbol != null || e.markerSize != null || e.markerFill != null || e.color != null || e.markerFillPaint !== void 0 || e.markerFillPaintAuthored === !0 || e.chartexStyle != null || e.markerStyle != null || e.markerLine != null || e.markerLinePaintAuthored === !0 || e.markerLineWidthEmu != null);
}
function vt(e, t) {
	return t == null || !Number.isFinite(t) || t === 0 || t < 0 && e.showNegativeBubbles !== !0 ? null : Math.abs(t);
}
function yt(e, t) {
	return e.bubble3D ?? e.bubble3DGroupDefault ?? !1;
}
function bt(e) {
	return e !== "none" && e !== "x" && e !== "plus";
}
function xt(e, t, n, r, i, a) {
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
function L(e, t, n, r, i, a = 0) {
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
function St(e, t, n, r, i, a, o = 0) {
	if (n === "radar" || !t.seriesDataLabels && !t.dataLabelOverrides?.length) return 0;
	let s = new Map((t.dataLabelOverrides ?? []).map((e) => [e.idx, e])), c = 0;
	for (let a = 0; a < r; a++) {
		let r = s.get(a);
		I(t.seriesDataLabels, r) || (r?.showLegendKey ?? t.seriesDataLabels?.showLegendKey ?? !1) === !0 && L(e, t, n, a, i, o) && c++;
	}
	return c;
}
function R(e) {
	return e === "line" || e === "stackedLine" || e === "stackedLinePct" || e === "area" || e === "stackedArea" || e === "stackedAreaPct" || e === "stock" || e === "clusteredBar" || e === "clusteredBarH" || e === "stackedBar" || e === "stackedBarH" || e === "stackedBarPct" || e === "stackedBarHPct";
}
function Ct(e) {
	return e.dataPointOverrides?.some((e) => e.markerSymbol != null && e.markerSymbol !== "none") === !0;
}
function wt(e, t, n, r) {
	return e === "radar" ? r === "filled" : e === "scatter" && t !== "bubble" && (n === "lineNoMarker" || n === "smoothNoMarker");
}
function Tt(e, t, n, r) {
	let i = n.seriesType ?? e;
	return !(i === "line" || i === "stackedLine" || i === "stackedLinePct" || i === "stock" || i === "radar") && i !== "scatter" && i !== "bubble" || i === "radar" && r === "filled" || i === "scatter" && (t === "lineNoMarker" || t === "smoothNoMarker") ? !1 : (n.markerSymbol ?? (i === "stock" ? "none" : "circle")) !== "none" && n.showMarker !== !1;
}
function Et(e, t, n, r) {
	return t?.markerSymbol == null ? !r || e.markerSymbol === "none" ? "none" : e.markerSymbol ?? n : t.markerSymbol;
}
function Dt(e, t, n) {
	if (t?.markerFillPaint !== void 0) return t.markerFillPaint;
	if (!(t?.markerFill != null || t?.color != null || t?.markerFillPaintAuthored === !0) && e.dataPointColors?.[n] == null && e.markerFillPaint !== void 0) return e.markerFillPaint;
}
function Ot(e, t, n, r) {
	return t?.markerFill == null ? t?.color == null ? e.dataPointColors?.[n] ?? (t?.markerFillPaintAuthored === !0 ? "00000000" : e.markerFill == null ? e.markerFillPaintAuthored === !0 ? "00000000" : r : e.markerFill) : t.color : t.markerFill;
}
function kt(e) {
	return e.markerFillPaint;
}
function At(e, t) {
	return e.markerFill == null ? e.markerFillPaintAuthored === !0 ? "00000000" : t : e.markerFill;
}
function jt(e) {
	return e?.fillType === "gradient" ? e.stops.length : e == null ? 0 : 1;
}
//#endregion
//#region packages/core/src/chart/plot-groups.ts
var Mt = new Set([
	"area3D",
	"line3D",
	"pie3D",
	"bar3D",
	"surface3D"
]);
function Nt(e, t) {
	return t === "bar" || t === "bar3D" ? e.includes("Bar") : t === "line" || t === "line3D" ? e.includes("Line") : t === "area" || t === "area3D" ? e.includes("Area") : t === "pie" || t === "pie3D" ? e === "pie" : t === "surface" || t === "surface3D" ? e === "surface" || e === "surface3D" : e === t;
}
function Pt(e) {
	if (e.plotGroups == null) return !0;
	let t = 0;
	for (let n of e.plotGroups) {
		if (!Number.isSafeInteger(n.seriesStart) || n.seriesStart !== t || !Number.isSafeInteger(n.seriesCount) || n.seriesCount < 0 || n.seriesCount > e.series.length - t) return !1;
		t += n.seriesCount;
	}
	return t === e.series.length;
}
function Ft(e) {
	let t = Array(e.series.length);
	for (let n of e.plotGroups ?? []) {
		let r = Math.min(e.series.length, n.seriesStart + n.seriesCount);
		for (let e = n.seriesStart; e < r; e++) t[e] = n;
	}
	return t;
}
function It(e, t) {
	return t ? t.kind === "bubble" ? "bubble" : t.kind === "line" ? t.grouping === "percentStacked" ? "stackedLinePct" : t.grouping === "stacked" ? "stackedLine" : "line" : t.kind === "area" ? t.grouping === "percentStacked" ? "stackedAreaPct" : t.grouping === "stacked" ? "stackedArea" : "area" : t.kind : e;
}
function Lt(e) {
	if (e.plotGroups == null || e.plotGroups.length <= 1) return "legacy";
	if (!Pt(e)) return "unsupported";
	let t = e.plotGroups.filter((e) => e.seriesCount > 0);
	if (t.length === 0) return "legacy";
	if (t.length === 1) return Nt(e.chartType, t[0].kind) ? "legacy" : "unsupported";
	if (t.some((e) => e.categoryAxis === "none" || e.valueAxis === "none") || t.some((t) => t.categoryAxis === "secondary" && e.secondaryCatAxis == null || t.valueAxis === "secondary" && e.secondaryValAxis == null)) return "unsupported";
	let n = new Set(t.map((e) => e.kind));
	if (t.some((e) => Mt.has(e.kind))) return "unsupported";
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
function Rt(e, t) {
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
function zt(e, t) {
	return [Math.max(1, Math.ceil(e)), Math.max(1, Math.ceil(t))];
}
function z(e, t) {
	let [n, r] = zt(e, t);
	if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(n, r);
	if (typeof document < "u") {
		let e = document.createElement("canvas");
		return e.width = n, e.height = r, e;
	}
	return null;
}
function Bt(e, t, n) {
	let [r, i] = zt(t, n);
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
var Vt = a, Ht = i;
function Ut(e, t, n, r, i) {
	if (n < 40 || t + 40 > e.byteLength) return null;
	let a = e.getUint32(t, !0);
	if (a < 40) return null;
	let o = e.getInt32(t + 4, !0), s = e.getInt32(t + 8, !0), c = e.getUint16(t + 14, !0);
	if (e.getUint32(t + 16, !0) !== 0) return null;
	let l = s < 0, u = Math.abs(o), d = Math.abs(s);
	if (u <= 0 || d <= 0 || u > Vt || d > Vt || u * d > Ht) return null;
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
function Wt(e, t, n) {
	if (n < 40 || t + 40 > e.byteLength) return null;
	let r = e.getUint32(t, !0);
	if (r < 40) return null;
	let i = e.getUint16(t + 14, !0), a = 0;
	if (i <= 8) {
		let n = e.getUint32(t + 32, !0);
		n === 0 && (n = 1 << i), a = n;
	} else a = e.getUint32(t + 32, !0);
	let o = r + a * 4, s = t + o, c = n - o;
	return c <= 0 ? null : Ut(e, t, o, s, c);
}
function Gt(e, t, n, r, i, a) {
	try {
		let o = z(t.width, t.height);
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
//#region packages/core/src/image/wmf.ts
var B = {
	EOF: 0,
	SETBKMODE: 258,
	SETTEXTALIGN: 302,
	SETTEXTCOLOR: 521,
	SETPOLYFILLMODE: 262,
	SETWINDOWORG: 523,
	SETWINDOWEXT: 524,
	SELECTOBJECT: 301,
	DELETEOBJECT: 496,
	TEXTOUT: 1313,
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
}, Kt = 2596720087, qt = 22, Jt = 18, Yt = 1179469088;
function Xt(e, t) {
	if (e.length < t + Jt) return !1;
	let n = e[t] | e[t + 1] << 8, r = e[t + 2] | e[t + 3] << 8;
	return (n === 1 || n === 2) && r === 9;
}
function Zt(e) {
	return e.length < 4 ? !1 : (e[0] | e[1] << 8 | e[2] << 16 | e[3] << 24) >>> 0 === Kt ? !0 : Xt(e, 0);
}
function Qt(e) {
	if (e.length < 44) return !1;
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength);
	return t.getUint32(0, !0) === 1 && t.getUint32(40, !0) === Yt;
}
function $t(e) {
	return e === "image/wmf" || e === "image/emf";
}
function en(e) {
	let t = e & 255, n = e >>> 8 & 255, r = e >>> 16 & 255, i = (e) => e.toString(16).padStart(2, "0");
	return `#${i(t)}${i(n)}${i(r)}`;
}
function tn(e, t) {
	for (let n = 0; n < e.length; n++) if (e[n] == null) {
		e[n] = t;
		return;
	}
	e.push(t);
}
var nn = class {
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
function V(e, t) {
	return (t - e.orgX) * (e.W / e.extX);
}
function H(e, t) {
	return (t - e.orgY) * (e.H / e.extY);
}
function rn(e, t) {
	let n = t * Math.abs(e.W / e.extX);
	return n >= 1 ? n : 1;
}
var an = .001;
function on(e, t, n) {
	return Math.abs(e - t) <= an || Math.abs(e - n) <= an;
}
function sn(e, t, n) {
	let r = [], i = n ? t.length : t.length - 1;
	for (let n = 0; n < i; n++) {
		let i = t[n], a = t[(n + 1) % t.length], o = Math.abs(i[0] - a[0]) <= an && on(i[0], 0, e.W) && on(a[0], 0, e.W), s = Math.abs(i[1] - a[1]) <= an && on(i[1], 0, e.H) && on(a[1], 0, e.H);
		o || s || r.push([i, a]);
	}
	return r;
}
function cn(e, t, n) {
	if (!e.curPen || e.curPen.stroke == null || t.length < 2) return;
	let { ctx: r } = e;
	if (r.strokeStyle = e.curPen.stroke, r.lineWidth = rn(e, e.curPen.width), !e.suppressBoundaryFrame) {
		r.beginPath(), r.moveTo(t[0][0], t[0][1]);
		for (let e = 1; e < t.length; e++) r.lineTo(t[e][0], t[e][1]);
		n && r.closePath(), r.stroke(), e.drew = !0;
		return;
	}
	let i = sn(e, t, n);
	if (i.length === 0) return;
	r.beginPath();
	let a = null;
	for (let [e, t] of i) (!a || a[0] !== e[0] || a[1] !== e[1]) && r.moveTo(e[0], e[1]), r.lineTo(t[0], t[1]), a = t;
	r.stroke(), e.drew = !0;
}
function ln(e, t, n) {
	let r = [];
	for (let i = 0; i < n && !(t.remaining < 4); i++) {
		let n = t.i16(), i = t.i16();
		r.push([V(e, n), H(e, i)]);
	}
	return r;
}
function un(e, t) {
	t.length < 2 || !e.curPen || e.curPen.stroke == null || cn(e, t, !1);
}
function dn(e, t) {
	if (t.length < 2) return;
	let { ctx: n } = e;
	if (e.curBrush && e.curBrush.fill != null) {
		n.beginPath(), n.moveTo(t[0][0], t[0][1]);
		for (let e = 1; e < t.length; e++) n.lineTo(t[e][0], t[e][1]);
		n.closePath(), n.fillStyle = e.curBrush.fill, n.fill(e.fillRule), e.drew = !0;
	}
	cn(e, t, !0);
}
function fn(e, t) {
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
		let r = ln(e, t, n);
		if (!(r.length < 2)) {
			i.moveTo(r[0][0], r[0][1]);
			for (let e = 1; e < r.length; e++) i.lineTo(r[e][0], r[e][1]);
			i.closePath(), a = !0;
		}
	}
	a && (e.curBrush && e.curBrush.fill != null && (i.fillStyle = e.curBrush.fill, i.fill(e.fillRule), e.drew = !0), e.curPen && e.curPen.stroke != null && (i.strokeStyle = e.curPen.stroke, i.lineWidth = rn(e, e.curPen.width), i.stroke(), e.drew = !0));
}
function pn(e) {
	let t = e.u16(), n = e.i16();
	e.i16();
	let r = e.u32();
	return {
		kind: "pen",
		stroke: (t & 255) == 5 ? null : en(r),
		width: Math.abs(n)
	};
}
function mn(e) {
	let t = e.u16(), n = e.u32();
	return e.u16(), {
		kind: "brush",
		fill: t === 1 ? null : en(n)
	};
}
function hn(e) {
	let t = e.indexOf(0), n = t >= 0 ? e.subarray(0, t) : e;
	if (n.length === 0) return "";
	try {
		return new TextDecoder("shift_jis").decode(n);
	} catch {
		return String.fromCharCode(...n);
	}
}
function gn(e) {
	let t = Math.abs(e.i16());
	e.i16(), e.i16(), e.i16();
	let n = e.i16(), r = e.u8() !== 0;
	return e.u8(), e.u8(), e.u8(), e.u8(), e.u8(), e.u8(), e.u8(), {
		kind: "font",
		height: t,
		weight: n,
		italic: r,
		face: hn(e.bytes(Math.min(32, e.remaining)))
	};
}
function _n(e, t, n, r) {
	if (t.length === 0) return;
	let i = e.curFont, a = i?.height || 12, o = Math.abs(H(e, e.orgY + a) - H(e, e.orgY));
	if (!Number.isFinite(o) || o < 1) return;
	let { ctx: s } = e;
	try {
		s.fillStyle = e.textColor;
		let a = i && i.weight >= 700 ? "bold " : "";
		s.font = `${i?.italic ? "italic " : ""}${a}${o}px ${i?.face || "sans-serif"}`;
		let c = e.textAlign & 6;
		s.textAlign = c === 2 ? "right" : c === 6 ? "center" : "left", s.textBaseline = (e.textAlign & 24) == 24 ? "alphabetic" : "top", s.fillText(t, V(e, n), H(e, r)), e.drew = !0;
	} catch {}
}
function vn(e, t, n, r, i = !1) {
	if (!Zt(e)) return !1;
	let a = 0;
	(e.length >= 4 ? (e[0] | e[1] << 8 | e[2] << 16 | e[3] << 24) >>> 0 : 0) === Kt && (a = qt);
	let o = a + Jt;
	if (o > e.length) return !1;
	let s = {
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
		drew: !1,
		suppressBoundaryFrame: i
	}, c = new DataView(e.buffer, e.byteOffset, e.byteLength);
	for (; o + 6 <= e.length;) {
		let t = c.getUint32(o, !0), n = c.getUint16(o + 4, !0);
		if (t < 3) break;
		let r = t * 2, i = o + r;
		if (i > e.length || n === B.EOF) break;
		let a = o + 6, l = new nn(e, a, i);
		switch (n) {
			case B.SETWINDOWORG:
				s.orgY = l.i16(), s.orgX = l.i16();
				break;
			case B.SETWINDOWEXT: {
				let e = l.i16(), t = l.i16();
				s.extY = e || 1, s.extX = t || 1, s.haveExt = !0;
				break;
			}
			case B.SETPOLYFILLMODE:
				s.fillRule = l.u16() === 1 ? "evenodd" : "nonzero";
				break;
			case B.SETTEXTCOLOR:
				s.textColor = en(l.u32());
				break;
			case B.SETTEXTALIGN:
				s.textAlign = l.u16();
				break;
			case B.CREATEPENINDIRECT:
				tn(s.objects, pn(l));
				break;
			case B.CREATEBRUSHINDIRECT:
				tn(s.objects, mn(l));
				break;
			case B.CREATEFONTINDIRECT:
				tn(s.objects, gn(l));
				break;
			case B.SELECTOBJECT: {
				let e = l.u16(), t = s.objects[e];
				t?.kind === "pen" ? s.curPen = t : t?.kind === "brush" ? s.curBrush = t : t?.kind === "font" && (s.curFont = t);
				break;
			}
			case B.DELETEOBJECT: {
				let e = l.u16(), t = s.objects[e];
				t && (t === s.curPen && (s.curPen = null), t === s.curBrush && (s.curBrush = null), t === s.curFont && (s.curFont = null), s.objects[e] = null);
				break;
			}
			case B.POLYLINE:
				un(s, ln(s, l, l.i16()));
				break;
			case B.POLYGON:
				dn(s, ln(s, l, l.i16()));
				break;
			case B.POLYPOLYGON:
				fn(s, l);
				break;
			case B.RECTANGLE: {
				let e = l.i16(), t = l.i16(), n = l.i16(), r = l.i16();
				dn(s, [
					[V(s, r), H(s, n)],
					[V(s, t), H(s, n)],
					[V(s, t), H(s, e)],
					[V(s, r), H(s, e)]
				]);
				break;
			}
			case B.TEXTOUT: {
				let e = l.u16(), t = hn(l.bytes(e));
				e % 2 != 0 && l.skip(1);
				let n = l.i16();
				_n(s, t, l.i16(), n);
				break;
			}
			case B.STRETCHDIBITS: {
				l.u32(), l.i16(), l.i16(), l.i16(), l.i16(), l.u16();
				let e = l.i16(), t = l.i16(), n = l.i16(), r = l.i16(), o = a + 22, u = Wt(c, o, i - o);
				if (u) {
					let i = V(s, r), a = H(s, n), o = V(s, r + t), c = H(s, n + e);
					Gt(s.ctx, u, i, a, o, c) && (s.drew = !0);
				}
				break;
			}
			case B.DIBSTRETCHBLT:
			case B.DIBBITBLT:
			case B.SETBKMODE: break;
			default: break;
		}
		o = i;
	}
	return s.drew;
}
var yn = 2e3, bn = 2;
function xn(e, t) {
	let n = e > 0 ? e : 300, r = t > 0 ? t : 300, i = (e) => Math.max(1, Math.min(yn, Math.round(e)));
	return {
		w: i(n * bn),
		h: i(r * bn)
	};
}
async function Sn(e, t, n, r = !1) {
	if (!Zt(e) || t <= 0 || n <= 0) return null;
	let i = z(t, n);
	if (!i) return null;
	let a = i.getContext("2d");
	return !a || (a.lineJoin = "round", a.lineCap = "round", !vn(e, a, t, n, r)) ? null : createImageBitmap(i);
}
//#endregion
//#region packages/core/src/image/crop.ts
function Cn(e) {
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
function wn(e) {
	let t = e;
	return {
		w: t.naturalWidth || (typeof t.width == "number" ? t.width : 0) || 0,
		h: t.naturalHeight || (typeof t.height == "number" ? t.height : 0) || 0
	};
}
function Tn(e, t) {
	if (!t || !(t.l || t.t || t.r || t.b) || ![
		t.l,
		t.t,
		t.r,
		t.b
	].every(Number.isFinite)) return null;
	let { w: n, h: r } = wn(e);
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
function En(e, t, n, r, i, a, o) {
	let s = Tn(t, n);
	s ? s.sw > 0 && s.sh > 0 && s.dwFraction > 0 && s.dhFraction > 0 && e.drawImage(t, s.sx, s.sy, s.sw, s.sh, r + s.dxFraction * a, i + s.dyFraction * o, s.dwFraction * a, s.dhFraction * o) : e.drawImage(t, r, i, a, o);
}
function Dn(e, t, n) {
	if (!Number.isFinite(e) || !Number.isFinite(t) || !(e > 0) || !(t > 0)) return null;
	let r = n ? 1 - n.l - n.r : 1, i = n ? 1 - n.t - n.b : 1;
	if (!Number.isFinite(r) || !Number.isFinite(i) || !(r > 0) || !(i > 0) || !Cn(n)) return null;
	let a = Math.ceil(e / r), o = Math.ceil(t / i);
	return Number.isFinite(a) && Number.isFinite(o) ? {
		width: a,
		height: o
	} : null;
}
function On(e, t, n, r) {
	if (!t || !$t(e)) return {
		widthPt: n,
		heightPt: r
	};
	if (!Cn(t)) return null;
	let i = 1 - t.l - t.r, a = 1 - t.t - t.b;
	return {
		widthPt: n / i,
		heightPt: r / a
	};
}
//#endregion
//#region packages/core/src/shape/pattern-bitmaps.ts
var kn = {
	pct5: [
		0,
		16,
		0,
		0,
		0,
		1,
		0,
		0
	],
	pct10: [
		136,
		0,
		34,
		0,
		136,
		0,
		34,
		0
	],
	pct20: [
		136,
		34,
		136,
		34,
		136,
		34,
		136,
		34
	],
	pct25: [
		136,
		85,
		34,
		85,
		136,
		85,
		34,
		85
	],
	pct30: [
		170,
		85,
		170,
		85,
		170,
		85,
		170,
		85
	],
	pct40: [
		170,
		119,
		170,
		221,
		170,
		119,
		170,
		221
	],
	pct50: [
		170,
		85,
		170,
		85,
		170,
		85,
		170,
		85
	],
	pct60: [
		221,
		85,
		119,
		85,
		221,
		85,
		119,
		85
	],
	pct70: [
		238,
		85,
		187,
		85,
		238,
		85,
		187,
		85
	],
	pct75: [
		238,
		170,
		187,
		170,
		238,
		170,
		187,
		170
	],
	pct80: [
		254,
		239,
		251,
		191,
		254,
		239,
		251,
		191
	],
	pct90: [
		255,
		239,
		255,
		251,
		255,
		239,
		255,
		251
	],
	horz: [
		255,
		0,
		0,
		0,
		255,
		0,
		0,
		0
	],
	vert: [
		136,
		136,
		136,
		136,
		136,
		136,
		136,
		136
	],
	ltHorz: [
		0,
		255,
		0,
		0,
		0,
		0,
		0,
		0
	],
	ltVert: [
		32,
		32,
		32,
		32,
		32,
		32,
		32,
		32
	],
	dkHorz: [
		255,
		255,
		0,
		0,
		255,
		255,
		0,
		0
	],
	dkVert: [
		204,
		204,
		204,
		204,
		204,
		204,
		204,
		204
	],
	narHorz: [
		255,
		0,
		255,
		0,
		255,
		0,
		255,
		0
	],
	narVert: [
		170,
		170,
		170,
		170,
		170,
		170,
		170,
		170
	],
	cross: [
		255,
		136,
		136,
		136,
		255,
		136,
		136,
		136
	],
	lgGrid: [
		255,
		128,
		128,
		128,
		128,
		128,
		128,
		128
	],
	smGrid: [
		255,
		136,
		136,
		136,
		255,
		136,
		136,
		136
	],
	dotGrid: [
		136,
		0,
		0,
		0,
		136,
		0,
		0,
		0
	],
	dnDiag: [
		128,
		64,
		32,
		16,
		8,
		4,
		2,
		1
	],
	upDiag: [
		1,
		2,
		4,
		8,
		16,
		32,
		64,
		128
	],
	ltDnDiag: [
		136,
		68,
		34,
		17,
		136,
		68,
		34,
		17
	],
	ltUpDiag: [
		17,
		34,
		68,
		136,
		17,
		34,
		68,
		136
	],
	dkDnDiag: [
		195,
		129,
		0,
		129,
		195,
		129,
		0,
		129
	],
	dkUpDiag: [
		195,
		129,
		0,
		129,
		195,
		129,
		0,
		129
	],
	wdDnDiag: [
		128,
		64,
		32,
		16,
		8,
		4,
		2,
		129
	],
	wdUpDiag: [
		1,
		2,
		4,
		8,
		16,
		32,
		64,
		129
	],
	diagCross: [
		129,
		66,
		36,
		24,
		24,
		36,
		66,
		129
	],
	horzBrick: [
		255,
		16,
		16,
		16,
		255,
		1,
		1,
		1
	],
	diagBrick: [
		129,
		66,
		36,
		24,
		36,
		66,
		129,
		0
	],
	lgCheck: [
		240,
		240,
		240,
		240,
		15,
		15,
		15,
		15
	],
	smCheck: [
		204,
		204,
		51,
		51,
		204,
		204,
		51,
		51
	],
	trellis: [
		165,
		90,
		165,
		90,
		165,
		90,
		165,
		90
	]
};
function An(e, t, n) {
	let r = kn[e];
	if (!r) return null;
	let i = z(8, 8);
	if (!i) return null;
	let a = i.getContext("2d");
	if (!a) return null;
	a.fillStyle = jn(n), a.fillRect(0, 0, 8, 8), a.fillStyle = jn(t);
	for (let e = 0; e < 8; e++) {
		let t = r[e];
		for (let n = 0; n < 8; n++) t & 1 << 7 - n && a.fillRect(n, e, 1, 1);
	}
	return i;
}
function jn(e) {
	return `rgba(${parseInt(e.slice(0, 2), 16)},${parseInt(e.slice(2, 4), 16)},${parseInt(e.slice(4, 6), 16)},${e.length >= 8 ? parseInt(e.slice(6, 8), 16) / 255 : 1})`;
}
//#endregion
//#region packages/core/src/draw/dash.ts
function Mn(e, t) {
	return e.map((e) => e * t);
}
var Nn = {
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
function Pn(e, t) {
	let n = Nn[e];
	return n ? Mn(n, t) : [];
}
var Fn = {
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
function In(e) {
	let t = Fn[e];
	return t ? Mn(t, 1) : [];
}
var Ln = {
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
function Rn(e, t) {
	let n = Ln[e];
	return n ? Mn(n, t) : [];
}
var zn = 512;
function Bn(e, t, n) {
	if (e != null) {
		let t = [];
		for (let r = 0; r < Math.min(e.length, zn); r += 1) {
			let i = e[r];
			!Number.isFinite(i.dash) || !Number.isFinite(i.space) || i.dash < 0 || i.space < 0 || i.dash === 0 && i.space === 0 || t.push(i.dash * n, i.space * n);
		}
		return t;
	}
	return Rn(t ?? "solid", n);
}
function Vn(e, t) {
	let n = Rn(e, t);
	if (n.length > 0) return n;
	let r = e.trim().split(/[\s,]+/).map(Number);
	return r.length >= 2 && r.every((e) => Number.isFinite(e) && e >= 0) && r.some((e) => e > 0) ? (r.length % 2 != 0 && r.pop(), Mn(r, t)) : [];
}
var Hn = {
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
function Un(e, t) {
	let n = Hn[e];
	return n ? Mn(n, t) : [];
}
//#endregion
//#region packages/core/src/shape/paint.ts
var Wn = 512;
function Gn(e, t, n, r, i, a, o) {
	let s = e.tileRect;
	if (!s || (s.l ?? 0) === 0 && (s.t ?? 0) === 0 && (s.r ?? 0) === 0 && (s.b ?? 0) === 0) return null;
	let c = n + i * (s.l ?? 0), l = r + a * (s.t ?? 0), u = i * (1 - (s.l ?? 0) - (s.r ?? 0)), d = a * (1 - (s.t ?? 0) - (s.b ?? 0));
	if (!Number.isFinite(u) || !Number.isFinite(d) || Math.abs(u) < 1e-9 || Math.abs(d) < 1e-9) return null;
	let f = Math.min(1, Wn / Math.abs(u), Wn / Math.abs(d)), p = Math.max(1, Math.ceil(Math.abs(u) * f)), m = Math.max(1, Math.ceil(Math.abs(d) * f)), h = Bt(t, p, m), g = h?.getContext("2d");
	if (!h || !g) return null;
	let _ = G({
		...e,
		tileRect: void 0,
		flip: void 0
	}, g, 0, 0, p, m, o);
	if (!_) return null;
	g.fillStyle = _, g.fillRect(0, 0, p, m);
	let v = e.flip === "x" || e.flip === "xy", y = e.flip === "y" || e.flip === "xy", b = h;
	if (v || y) {
		let e = Bt(t, p * (v ? 2 : 1), m * (y ? 2 : 1)), n = e?.getContext("2d");
		if (!e || !n) return null;
		for (let e = 0; e < (y ? 2 : 1); e += 1) for (let t = 0; t < (v ? 2 : 1); t += 1) n.save(), n.translate(t * p, e * m), n.scale(t === 1 ? -1 : 1, e === 1 ? -1 : 1), n.drawImage(h, t === 1 ? -p : 0, e === 1 ? -m : 0), n.restore();
		b = e;
	}
	let x = t.createPattern(b, "repeat");
	return !x || typeof x.setTransform != "function" ? null : (x.setTransform({
		a: u / p,
		b: 0,
		c: 0,
		d: d / m,
		e: c,
		f: l
	}), x);
}
function U(e, t = 1) {
	let n = e.charCodeAt(0) === 35 ? e.slice(1) : e;
	return `rgba(${parseInt(n.slice(0, 2), 16)},${parseInt(n.slice(2, 4), 16)},${parseInt(n.slice(4, 6), 16)},${n.length >= 8 ? parseInt(n.slice(6, 8), 16) / 255 : t})`;
}
function Kn(e) {
	let t = e.startsWith("#") ? e.slice(1) : e;
	if (t.length < 8) return !0;
	let n = Number.parseInt(t.slice(6, 8), 16);
	return !Number.isFinite(n) || n !== 0;
}
function W(e) {
	return !e || e.fillType === "none" ? !1 : e.fillType === "solid" ? Kn(e.color) : e.fillType === "gradient" ? e.stops.some((e) => Kn(e.color)) : e.fillType === "pattern" ? Kn(e.fg) || Kn(e.bg) : e.alpha == null || !Number.isFinite(e.alpha) || e.alpha > 0;
}
function qn(e) {
	let t = e.charCodeAt(0) === 35 ? e.slice(1) : e, n = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), i = parseInt(t.slice(4, 6), 16);
	return .299 * n + .587 * r + .114 * i;
}
function Jn(e) {
	return e && qn(e) < 128 ? "#FFFFFF" : "#000000";
}
function G(e, t, n, r, i, a, o = 0) {
	if (!e || e.fillType === "none") return null;
	if (e.fillType === "solid") return U(e.color);
	if (e.fillType === "pattern") return Xn(e, t);
	if (e.fillType === "gradient") {
		let s = e.stops;
		if (s.length === 0) return null;
		if (s.length === 1) return U(s[0].color);
		let c = Gn(e, t, n, r, i, a, o);
		if (c) return c;
		let l, u = e.tileRect, d = n + i * (u?.l ?? 0), f = r + a * (u?.t ?? 0), p = i * (1 - (u?.l ?? 0) - (u?.r ?? 0)), m = a * (1 - (u?.t ?? 0) - (u?.b ?? 0));
		if (e.gradType === "radial") {
			let n = e.fillToRect, r = d + p * (n?.l ?? 0), i = f + m * (n?.t ?? 0), a = p * (1 - (n?.l ?? 0) - (n?.r ?? 0)), o = m * (1 - (n?.t ?? 0) - (n?.b ?? 0)), s = r + a / 2, c = i + o / 2, u = Math.max(Math.abs(s - d), Math.abs(d + p - s)), h = Math.max(Math.abs(c - f), Math.abs(f + m - c)), g = e.path === "rect" ? Math.max(u, h) : Math.sqrt(u * u + h * h);
			l = t.createRadialGradient(s, c, 0, s, c, Math.max(g, 1e-9));
		} else {
			let n = (e.rotWithShape === !1 ? e.angle - o : e.angle) * Math.PI / 180, r = Math.cos(n), i = Math.sin(n);
			if (e.scaled === !0) {
				r *= p, i *= m;
				let e = Math.hypot(r, i);
				e > 0 && (r /= e, i /= e);
			}
			let a = d + p / 2, s = f + m / 2, c = (Math.abs(r) * p + Math.abs(i) * m) / 2;
			l = t.createLinearGradient(a - r * c, s - i * c, a + r * c, s + i * c);
		}
		for (let e of s) l.addColorStop(Math.min(1, Math.max(0, e.position)), U(e.color));
		return l;
	}
	return null;
}
var Yn = /* @__PURE__ */ new WeakMap();
function Xn(e, t) {
	let n = `${e.preset}|${e.fg}|${e.bg}`, r = Yn.get(t);
	r || (r = /* @__PURE__ */ new Map(), Yn.set(t, r));
	let i = r.get(n);
	if (i) return i;
	let a = An(e.preset, e.fg, e.bg);
	if (!a) return U(e.fg);
	let o = t.createPattern(a, "repeat");
	return o ? (r.set(n, o), o) : U(e.fg);
}
function Zn(e, t, n) {
	if (!t) {
		e.strokeStyle = "transparent", e.lineWidth = 0, e.setLineDash([]), e.lineCap = "butt", e.lineJoin = "miter", e.miterLimit = 10;
		return;
	}
	e.strokeStyle = U(t.color);
	let r = Math.max(.5, t.width * n);
	e.lineWidth = r;
	let i = t.customDash == null ? t.dashStyle ? Vn(t.dashStyle, r) : [] : Bn(t.customDash, null, r), a = t.lineCap ?? "butt", o = i.some((e, t) => t % 2 == 0 && e === 0);
	e.lineCap = a === "butt" && o ? "square" : a, e.lineJoin = t.lineJoin ?? "miter", e.miterLimit = t.miterLimit ?? 10, e.setLineDash(i);
}
//#endregion
//#region packages/core/src/chart/box-whisker.ts
var Qn = .06;
function $n(e) {
	let t = Math.floor(e.length / 2);
	return e.length % 2 == 1 ? e[t] : e[t - 1] / 2 + e[t] / 2;
}
function er(e) {
	let t = 0;
	for (let n of e) t = Math.max(t, Math.abs(n));
	if (t === 0) return 0;
	let n = 0;
	for (let r of e) n += r / t;
	return n / e.length * t;
}
function tr(e, t, n) {
	if (!Number.isFinite(t)) return n < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
	let r = e + n * t;
	return Number.isFinite(r) ? r : n < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function nr(e, t) {
	let n = e.filter((e) => typeof e == "number" && Number.isFinite(e)).sort((e, t) => e - t);
	if (n.length === 0) return null;
	let r = Math.floor(n.length / 2), i = $n(n), a = t === "inclusive" && n.length % 2 == 1, o = n.slice(0, r + +!!a), s = n.slice(r + +(n.length % 2 == 1 && !a)), c = $n(o.length > 0 ? o : n), l = $n(s.length > 0 ? s : n), u = (l - c) * 1.5, d = tr(c, u, -1), f = tr(l, u, 1), p = [], m = [];
	for (let e of n) e < d || e > f ? m.push(e) : p.push(e);
	return {
		q1: c,
		median: i,
		q3: l,
		lowerFence: d,
		upperFence: f,
		whiskerLo: p[0] ?? n[0],
		whiskerHi: p[p.length - 1] ?? n[n.length - 1],
		mean: er(n),
		outliers: m,
		inner: p
	};
}
function rr(e, t) {
	let n = 0;
	for (let r of e) for (let e of r) if (n += e.length, !Number.isSafeInteger(n) || n > t) return t + 1;
	return n;
}
function ir(e, t, n, r, i, a, o) {
	if (!Number.isFinite(e) || !Number.isFinite(t) || t <= 0 || !Number.isInteger(n) || n <= 0 || !Number.isInteger(r) || r <= 0 || !Number.isInteger(i) || i < 0 || i >= n || !Number.isInteger(a) || a < 0 || a >= r || !Number.isFinite(o) || o < 0) return null;
	let s = t / n, c = s / (r + o / 100), l = c * r, u = c * Qn, d = c - u, f = e + s * (i + .5) - l / 2 + a * c + u / 2;
	return {
		boxX: f,
		boxWidth: d,
		centerX: f + d / 2
	};
}
//#endregion
//#region packages/core/src/canvas/clamp.ts
var ar = 32767, or = 1 << 24;
function sr(e, t) {
	let n = Number.isFinite(e) && e > 0 ? Math.max(1, Math.round(e)) : 1, r = Number.isFinite(t) && t > 0 ? Math.max(1, Math.round(t)) : 1, i = Math.min(1, ar / n, ar / r), a = n * r, o = a > 16777216 ? Math.sqrt(or / a) : 1, s = Math.min(i, o);
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
function cr(e, t) {
	return [t === "tl" || t === "l" || t === "bl" ? e.x : t === "tr" || t === "r" || t === "br" ? e.x + e.w : e.x + e.w / 2, t === "tl" || t === "t" || t === "tr" ? e.y : t === "l" || t === "ctr" || t === "r" ? e.y + e.h / 2 : e.y + e.h];
}
function K(e, t) {
	return e * t;
}
function q(e) {
	return e.getContext("2d") ?? null;
}
function lr(e, t, n, r) {
	let i = Math.max(0, Math.floor(e.x - t)), a = Math.max(0, Math.floor(e.y - t)), o = Math.min(n, Math.ceil(e.x + e.w + t)), s = Math.min(r, Math.ceil(e.y + e.h + t));
	return {
		x: i,
		y: a,
		w: Math.max(1, o - i),
		h: Math.max(1, s - a)
	};
}
function ur(e, t) {
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
function dr(e, t, n, r, i, a, o, s = 0, c) {
	let l = Math.max(0, K(r.blur, i)), u = K(r.dist, i), d = r.rotWithShape === !1 ? 0 : s, f = (r.dir + d) * Math.PI / 180, p = Math.cos(f) * u, m = Math.sin(f) * u, h = lr(n, Math.ceil(l * 3 + Math.max(Math.abs(p), Math.abs(m))) + 2, a, o), g = z(h.w, h.h);
	if (!g) return !1;
	let _ = q(g);
	if (!_) return !1;
	t(ur(_, h)), _.save(), _.setTransform(1, 0, 0, 1, 0, 0), _.globalCompositeOperation = "source-in", _.fillStyle = U(r.color, r.alpha), _.fillRect(0, 0, h.w, h.h), _.restore(), e.save(), l > 0 && (e.filter = `blur(${l}px)`);
	let [v, y] = c ?? cr(n, r.algn ?? "b"), b = r.sx ?? 1, x = r.sy ?? 1, S = Math.tan((r.kx ?? 0) * Math.PI / 180), C = Math.tan((r.ky ?? 0) * Math.PI / 180);
	return e.translate(p, m), e.translate(v, y), d !== 0 && e.rotate(d * Math.PI / 180), e.transform(b, C, S, x, 0, 0), d !== 0 && e.rotate(-d * Math.PI / 180), e.translate(-v, -y), e.drawImage(g, h.x, h.y), e.restore(), !0;
}
function fr(e, t, n, r, i, a, o) {
	let s = K(r.blur, i), c = K(r.dist, i), l = r.dir * Math.PI / 180, u = Math.cos(l) * c, d = Math.sin(l) * c, f = lr(n, Math.ceil(3 * s + Math.abs(c)) + 2, a, o), p = z(f.w, f.h);
	if (!p) return;
	let m = q(p);
	if (!m) return;
	let h = ur(m, f);
	h.save(), h.fillStyle = U(r.color, r.alpha), t(h), h.restore(), h.save(), h.globalCompositeOperation = "destination-out", h.filter = s > 0 ? `blur(${s}px)` : "none", h.translate(u, d), h.fillStyle = "#000", t(h), h.restore(), h.save(), h.globalCompositeOperation = "destination-in", h.filter = "none", h.fillStyle = "#000", t(h), h.restore(), e.save(), e.drawImage(p, f.x, f.y), e.restore();
}
function pr(e, t, n, r, i, a, o, s) {
	let c = K(r.radius, i);
	if (c <= 0) {
		t(e);
		return;
	}
	let l = lr(n, Math.ceil(c) + 2, a, o), u = n.x - l.x, d = n.y - l.y, f = z(l.w, l.h);
	if (!f) {
		t(e);
		return;
	}
	let p = q(f);
	if (!p) {
		t(e);
		return;
	}
	let m = ur(p, l), h = s ?? t;
	t(m);
	let g = z(l.w, l.h), _ = z(l.w, l.h), v = g ? q(g) : null, y = _ ? q(_) : null;
	if (g && v && _ && y) {
		let t = ur(v, l);
		t.fillStyle = "#000", h(t), y.drawImage(f, u, d, n.w, n.h, u - c, d - c, n.w + c * 2, n.h + c * 2), y.drawImage(f, 0, 0), y.globalCompositeOperation = "destination-in", y.filter = `blur(${c / 3}px)`, y.drawImage(g, 0, 0), y.filter = "none", y.globalCompositeOperation = "source-over", e.save(), e.drawImage(_, l.x, l.y), e.restore();
		return;
	}
	e.save(), e.drawImage(f, 0, 0), e.restore();
}
function mr(e, t, n, r, i, a, o) {
	let s = z(a, o);
	if (!s) return;
	let c = q(s);
	if (!c) return;
	let l = K(r.blur, i);
	c.save(), l > 0 && (c.filter = `blur(${l}px)`), t(c), c.restore(), c.save(), c.globalCompositeOperation = "destination-in";
	let u = n.y, d = n.y + n.h, f = c.createLinearGradient(0, d, 0, u), p = hr(r.stPos), m = hr(r.endPos);
	f.addColorStop(0, `rgba(0,0,0,${r.stA})`), p > 0 && f.addColorStop(p, `rgba(0,0,0,${r.stA})`), m < 1 && m > p && f.addColorStop(m, `rgba(0,0,0,${r.endA})`), f.addColorStop(1, `rgba(0,0,0,${r.endA})`), c.fillStyle = f, c.fillRect(0, 0, a, o), c.restore();
	let h = K(r.dist, i), g = r.dir * Math.PI / 180, _ = Math.cos(g) * h, v = Math.sin(g) * h;
	e.save(), e.translate(n.x + _, d + v), e.scale(r.sx, r.sy), e.translate(-n.x, -d), e.drawImage(s, 0, 0), e.restore();
}
function hr(e) {
	return e < 0 ? 0 : e > 1 ? 1 : e;
}
//#endregion
//#region packages/core/src/chart/style-effects.ts
var gr = 12700, _r = or, vr = /* @__PURE__ */ new WeakMap();
function yr(e, t, n = _r, r = 1) {
	let i = vr.get(e), a = Number.isSafeInteger(r) && r > 0 ? r : 1;
	vr.set(e, { perConsumerMaximum: Math.floor(Math.max(0, n) / a) });
	try {
		return t();
	} finally {
		i ? vr.set(e, i) : vr.delete(e);
	}
}
function br(e) {
	return e?.effectAuthored === !0 || e?.effectUnsupported === !0 || e?.effectNoStyle === !0 || e?.shadows != null || e?.innerShadows != null || e?.glows != null || e?.softEdges != null || e?.reflections != null;
}
function J(...e) {
	return e.find(br) ?? void 0;
}
function xr(e, t) {
	if (e?.length) return e[t % e.length] ?? void 0;
}
function Sr(e, t, n, r = n) {
	let i = br(e), a = i ? e : t;
	if (!a || a.effectNoStyle === !0 || a.effectUnsupported === !0) return;
	let o = i ? n : r, s = a.effectFormattingIndices ? A(a.effectFormattingIndices, o) : -1, c = a.effectColorIndex ?? (s >= 0 ? s : o), l = {
		shadow: xr(a.shadows, c),
		innerShadow: xr(a.innerShadows, c),
		glow: xr(a.glows, c),
		softEdge: xr(a.softEdges, c),
		reflection: xr(a.reflections, c)
	};
	return Object.values(l).some(Boolean) ? l : void 0;
}
function Cr(e) {
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
function wr(e, t, n) {
	return [e.a * t + e.c * n + e.e, e.b * t + e.d * n + e.f];
}
function Tr(e, t) {
	let n = [
		wr(e, t.x, t.y),
		wr(e, t.x + t.w, t.y),
		wr(e, t.x, t.y + t.h),
		wr(e, t.x + t.w, t.y + t.h)
	], r = n.map((e) => e[0]), i = n.map((e) => e[1]), a = Math.min(...r), o = Math.max(...r), s = Math.min(...i), c = Math.max(...i);
	return {
		x: a,
		y: s,
		w: o - a,
		h: c - s
	};
}
function Er(e, t, n) {
	let r = Math.max(1, Math.ceil(e.w + t * 2)) * Math.max(1, Math.ceil(e.h + t * 2)) * n;
	return Number.isSafeInteger(r) ? r : Infinity;
}
function Dr(e, t, n, r, i) {
	let a = e.softEdge ? Math.ceil(e.softEdge.radius * 3 * n) + 2 : 0, o = e.innerShadow ? Math.ceil((e.innerShadow.blur * 3 + Math.abs(e.innerShadow.dist)) * n) + 2 : 0, s = e.shadow ? Math.ceil((e.shadow.blur * 3 + Math.abs(e.shadow.dist)) * n) + 2 : 0;
	return (e.reflection ? r * i : 0) + (e.shadow ? Er(t, s, 1) : 0) + (e.softEdge ? Er(t, a, 2) : 0) + (e.innerShadow ? Er(t, o, 2) : 0);
}
function Or(e, t, n) {
	let r = t.dir * Math.PI / 180, i = t.dist / gr * n;
	e.shadowColor = U(t.color, t.alpha), e.shadowBlur = Math.max(0, t.blur / gr * n), e.shadowOffsetX = Math.cos(r) * i, e.shadowOffsetY = Math.sin(r) * i;
}
function kr(e, t, n) {
	e.shadowColor = U(t.color, t.alpha), e.shadowBlur = Math.max(0, t.radius / gr * n), e.shadowOffsetX = 0, e.shadowOffsetY = 0;
}
function Ar(e, t, n, r, i, a, o = r) {
	let s = Sr(t, n, r, o), c = s?.shadow ?? s?.glow;
	c && (e.save(), e.globalCompositeOperation = "destination-over", "radius" in c ? kr(e, c, i) : Or(e, c, i), a(e), e.restore());
}
function jr(e) {
	let t = e.canvas;
	return [t?.width ?? 0, t?.height ?? 0];
}
function Mr(e, t, n, r, i, a, o, s = r) {
	let c = Sr(t, n, r, s);
	if (!c) {
		o(e);
		return;
	}
	let l = Cr(e), u = Tr(l, i), d = Math.max(Math.hypot(l.a, l.b), Math.hypot(l.c, l.d)), f = Math.max(0, a * d / gr), [p, m] = jr(e), h = p > 0 && m > 0, g = (e) => {
		e.setTransform(l), o(e);
	}, _ = () => e.setTransform(1, 0, 0, 1, 0, 0), v = Dr(c, u, f, p, m), y = vr.get(e), b = h && Number.isSafeInteger(v) && v <= (y?.perConsumerMaximum ?? 0), x = !1;
	b && c.shadow && (e.save(), _(), x = dr(e, g, u, c.shadow, f, p, m, Math.atan2(l.b, l.a) * 180 / Math.PI), e.restore());
	let S = x ? c.glow : c.shadow ?? c.glow;
	b && c.reflection && (e.save(), _(), mr(e, g, u, c.reflection, f, p, m), e.restore());
	let C = !1;
	!S && b && c.softEdge && (e.save(), _(), pr(e, g, u, c.softEdge, f, p, m), e.restore(), C = !0), C || (e.save(), S && ("radius" in S ? kr(e, S, a) : Or(e, S, a)), o(e), e.restore()), b && c.innerShadow && (e.save(), _(), fr(e, g, u, c.innerShadow, f, p, m), e.restore());
}
function Nr(e) {
	if (e.length > 1e4) return !0;
	let t = 0;
	for (let n of e) {
		if (n.path.length > 512 || t > 1e4 - n.path.length) return !0;
		t += n.path.length;
	}
	return !1;
}
function Pr(e, t = !1) {
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
function Fr(e) {
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
function Ir(e) {
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
var Lr = 864e5, Rr = Date.UTC(1899, 11, 30), zr = Date.UTC(1904, 0, 1);
function Br(e, t = !1) {
	if (t) return new Date(zr + e * Lr);
	let n = e < 60 ? e + 1 : e;
	return new Date(Rr + n * Lr);
}
function Vr(e, t = !1) {
	if (t) return (e.getTime() - zr) / Lr;
	let n = (e.getTime() - Rr) / Lr;
	return n <= 60 ? n - 1 : n;
}
//#endregion
//#region packages/core/src/text/round-decimal.ts
function Hr(e, t) {
	if (!Number.isFinite(e)) return String(e);
	let n = Math.max(0, Math.trunc(t)), r = e < 0, [i, a = ""] = Ur(Math.abs(e).toString()).split("."), o = a.padEnd(n + 1, "0"), s = o.slice(0, n), c = o.charCodeAt(n) - 48, l = (i + s).split("").map((e) => e.charCodeAt(0) - 48);
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
function Ur(e) {
	let t = /^(\d+)(?:\.(\d+))?[eE]([+-]?\d+)$/.exec(e);
	if (!t) return e;
	let [, n, r = "", i] = t, a = parseInt(i, 10), o = n + r, s = n.length + a;
	return s <= 0 ? "0." + "0".repeat(-s) + o : s >= o.length ? o + "0".repeat(s - o.length) : o.slice(0, s) + "." + o.slice(s);
}
//#endregion
//#region packages/core/src/chart/chart-number-format.ts
var Wr = /* @__PURE__ */ new Map();
function Gr(e, t = !1, n = typeof navigator > "u" ? void 0 : navigator.language) {
	let r = n ?? "", i = Wr.get(r);
	return i || (i = new Intl.DateTimeFormat(n, {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		timeZone: "UTC"
	}), Wr.set(r, i)), i.format(Br(e, t));
}
function Kr(e) {
	return Number.isInteger(e) ? String(e) : Hr(e, 6).replace(/\.?0+$/, "");
}
function qr(e, t, n = !1) {
	if (!t || t.trim().toLowerCase() === "general") return Kr(e);
	if (Yr(t)) return Xr(e, t, n);
	let r = Zr(t), i;
	return i = e > 0 ? r[0] ?? t : e < 0 ? r[1] ?? r[0] ?? t : r[2] ?? r[0] ?? t, i === "" ? "" : (e < 0 && r.length < 2 ? "-" : "") + Qr(Math.abs(e), i);
}
function Jr(e, t, n = !1) {
	if (!t || e.trim() === "") return e;
	let r = Number(e);
	return Number.isFinite(r) ? qr(r, t, n) : e;
}
function Yr(e) {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\"") {
			t = !t;
			continue;
		}
		if (!t) {
			if (r === "\\") {
				n++;
				continue;
			}
			if (r === "[") {
				for (; n < e.length && e[n] !== "]";) n++;
				continue;
			}
			if (r === "y" || r === "Y" || r === "d" || r === "D" || r === "m" || r === "M" || r === "h" || r === "H" || r === "s" || r === "S") return !0;
		}
	}
	return !1;
}
function Xr(e, t, n = !1) {
	let r = Br(Math.floor(e), n), i = r.getUTCFullYear(), a = r.getUTCMonth() + 1, o = r.getUTCDate(), s = (e - Math.floor(e)) * 86400, c = Math.floor(s / 3600), l = Math.floor(s % 3600 / 60), u = Math.floor(s % 60), d = "", f = !1, p = 0;
	for (; p < t.length;) {
		let e = t[p];
		if (e === "\"") {
			f = !f, p++;
			continue;
		}
		if (f) {
			d += e, p++;
			continue;
		}
		if (e === "\\" && p + 1 < t.length) {
			d += t[p + 1], p += 2;
			continue;
		}
		if (e === "[") {
			for (; p < t.length && t[p] !== "]";) p++;
			p < t.length && p++;
			continue;
		}
		if (e === "y" || e === "Y") {
			let e = 0;
			for (; p < t.length && (t[p] === "y" || t[p] === "Y");) e++, p++;
			d += e >= 3 ? String(i) : String(i % 100).padStart(2, "0");
			continue;
		}
		if (e === "m" || e === "M") {
			let e = 0;
			for (; p < t.length && (t[p] === "m" || t[p] === "M");) e++, p++;
			if (d.match(/[Hh]+\W*$/)) d += e >= 2 ? String(l).padStart(2, "0") : String(l);
			else {
				let t = [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec"
				], n = [
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
				];
				d += e >= 5 ? n[a - 1][0] : e === 4 ? n[a - 1] : e === 3 ? t[a - 1] : e === 2 ? String(a).padStart(2, "0") : String(a);
			}
			continue;
		}
		if (e === "d" || e === "D") {
			let e = 0;
			for (; p < t.length && (t[p] === "d" || t[p] === "D");) e++, p++;
			d += e >= 2 ? String(o).padStart(2, "0") : String(o);
			continue;
		}
		if (e === "h" || e === "H") {
			let e = 0;
			for (; p < t.length && (t[p] === "h" || t[p] === "H");) e++, p++;
			d += e >= 2 ? String(c).padStart(2, "0") : String(c);
			continue;
		}
		if (e === "s" || e === "S") {
			let e = 0;
			for (; p < t.length && (t[p] === "s" || t[p] === "S");) e++, p++;
			d += e >= 2 ? String(u).padStart(2, "0") : String(u);
			continue;
		}
		d += e, p++;
	}
	return d;
}
function Zr(e) {
	let t = [], n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i === "\\" && r + 1 < e.length) {
			n += i + e[r + 1], r++;
			continue;
		}
		if (i === "\"") {
			for (n += i, r++; r < e.length && e[r] !== "\"";) n += e[r], r++;
			r < e.length && (n += e[r]);
			continue;
		}
		if (i === "[") {
			for (n += i, r++; r < e.length && e[r] !== "]";) n += e[r], r++;
			r < e.length && (n += e[r]);
			continue;
		}
		if (i === ";") {
			t.push(n), n = "";
			continue;
		}
		n += i;
	}
	return t.push(n), t;
}
function Qr(e, t) {
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
	let c = $r(o, s), l = !1;
	return n.map((e) => e.kind === "lit" ? e.text : l ? "" : (l = !0, c)).join("");
}
function $r(e, t) {
	let n = t.indexOf("."), r = n >= 0 ? t.slice(0, n) : t, i = n >= 0 ? t.slice(n + 1) : "", a = /,/.test(r), o = (i.match(/[#0?]/g) ?? []).length, s = (r.replace(/,/g, "").match(/0/g) ?? []).length, [c, l = ""] = Hr(e, o).split("."), u = c.padStart(s, "0"), d = a ? u.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : u;
	return o === 0 ? d : `${d}.${l.padEnd(o, "0")}`;
}
//#endregion
//#region packages/core/src/chart/data-label-content.ts
function ei(e) {
	if (e.customText) return e.customText;
	let t = [];
	if (e.showCategory && e.category && t.push(e.category), e.showSeries && e.seriesName && t.push(e.seriesName), e.showValue && e.sourceValue != null) {
		let n = e.valueDivisor != null && Number.isFinite(e.valueDivisor) && e.valueDivisor > 0 ? e.valueDivisor : 1;
		t.push(qr(e.sourceValue / n, e.formatCode ?? null, e.date1904));
	}
	return e.showPercent && e.percentRatio != null && t.push(qr(e.percentRatio, e.percentFormatCode ?? e.formatCode ?? "0%", e.date1904)), e.showBubbleSize && e.bubbleSize != null && t.push(qr(e.bubbleSize, e.formatCode ?? null, e.date1904)), t.filter((e) => e !== "").join(e.separator ?? e.defaultSeparator ?? " ");
}
//#endregion
//#region packages/core/src/chart/image-fill-context.ts
var ti;
function ni(e, t) {
	let n = ti;
	ti = e;
	try {
		return t();
	} finally {
		ti = n;
	}
}
function ri(e, t, n, r, i, a, o, s = 0) {
	return ti?.(e, t, n, r, i, a, o, s) ?? !1;
}
//#endregion
//#region packages/core/src/chart/label-box.ts
function ii(e, t, n, r, i = 0, a = i) {
	if (!t || !e && !r) return e ?? void 0;
	let o = e ?? {}, s = t.fillNoStyle !== !0 && (t.fillPaintAuthored === !0 || t.fillHidden === !0 || t.fillPaints != null || t.fillColors != null), c = o.fillHidden === !0 ? P(n) : void 0, l = N(o.style, n, i), u = o.fillPaint != null || o.fill != null || l !== void 0 || o.fillHidden === !0 && c !== void 0 || o.fillPaintAuthored === !0 && o.fillHidden !== !0, d = c === void 0 ? o.fillPaint ?? (o.fill ? {
		fillType: "solid",
		color: o.fill
	} : l === void 0 ? o.fillPaintAuthored === !0 && o.fillHidden !== !0 ? null : M(t, a) : l) : c;
	return {
		fill: d?.fillType === "solid" ? d.color : void 0,
		fillPaint: d != null && d.fillType !== "solid" ? d : void 0,
		fillHidden: d === null ? !0 : void 0,
		fillPaintAuthored: u || s ? !0 : o.fillPaintAuthored
	};
}
function Y(e) {
	if (!e) return !1;
	let t = e.fillHidden !== !0 && (e.fillPaint == null ? e.fill != null && W({
		fillType: "solid",
		color: e.fill
	}) : W(e.fillPaint)), n = e.borderHidden !== !0 && (e.borderFill == null ? e.borderColor != null && W({
		fillType: "solid",
		color: e.borderColor
	}) : W(e.borderFill));
	return t || n;
}
function ai(e, t) {
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
		style: J(e.style, t.style),
		effectFallbackStyle: e.effectFallbackStyle ?? t.effectFallbackStyle,
		effectStyleIndex: e.effectStyleIndex ?? t.effectStyleIndex,
		effectFallbackIndex: e.effectFallbackIndex ?? t.effectFallbackIndex
	};
}
function oi(e, t, r, i, a = 0) {
	t && Mr(e, t.style, t.effectFallbackStyle, t.effectStyleIndex ?? 0, r, i, (e) => {
		if (t.fillHidden !== !0) {
			let n = t.fillPaint?.fillType === "image" && ri(e, t.fillPaint, r.x, r.y, r.w, r.h, i, a) ? null : t.fillPaint ? G(t.fillPaint, e, r.x, r.y, r.w, r.h, a) : t.fill ? `#${t.fill}` : null;
			n && (e.fillStyle = n, e.fillRect(r.x, r.y, r.w, r.h));
		}
		if (t.borderHidden === !0) return;
		let o = t.borderFill ? G(t.borderFill, e, r.x, r.y, r.w, r.h, a) : t.borderColor ? `#${t.borderColor}` : null;
		o && (e.save(), e.strokeStyle = o, e.lineWidth = t.borderWidthEmu == null ? Math.max(.25, .75 * i) : Math.max(.25, t.borderWidthEmu / n * i), e.setLineDash(Bn(t.borderCustomDash, t.borderDash, e.lineWidth)), t.borderCap === "rnd" ? e.lineCap = "round" : t.borderCap === "sq" ? e.lineCap = "square" : t.borderCap === "flat" && (e.lineCap = "butt"), t.borderJoin === "round" ? e.lineJoin = "round" : t.borderJoin === "bevel" ? e.lineJoin = "bevel" : t.borderJoin === "miter" && (e.lineJoin = "miter"), e.strokeRect(r.x, r.y, r.w, r.h), e.restore());
	}, t.effectFallbackIndex ?? t.effectStyleIndex ?? 0);
}
//#endregion
//#region packages/core/src/chart/chart-ex-label.ts
function si(e) {
	let t = e?.divisor;
	return t != null && Number.isFinite(t) && t > 0 ? t : 1;
}
function ci(e, t, n, r, i, a, o, s, c) {
	if (!t) return null;
	let l = t.seriesDataLabels, u = o.get(n);
	if (I(l, u) || !l && !u && !a.visible) return null;
	let d = typeof s == "boolean" ? s : !1, f = typeof s == "number" ? s : void 0, p = !d && (u?.showVal ?? l?.showVal ?? a.showVal), m = u?.showCatName ?? l?.showCatName ?? a.showCatName, h = u?.showSerName ?? l?.showSerName ?? a.showSerName ?? !1, g = u?.showPercent ?? l?.showPercent ?? a.showPercent ?? !1, _ = u?.showLegendKey ?? l?.showLegendKey ?? !1, v = u?.formatCode ?? l?.formatCode ?? e.dataLabelFormatCode ?? null, y = ei({
		customText: u?.text,
		showCategory: m,
		showSeries: h,
		showValue: p,
		showPercent: g,
		category: r,
		seriesName: t.name,
		sourceValue: i,
		valueDivisor: si(c),
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
		labelBox: ai(u?.labelBox, l?.labelBox),
		richRuns: u?.text ? u.richRuns : void 0,
		textStyle: et(u, l)
	};
}
//#endregion
//#region packages/core/src/chart/chart-ex-hierarchy-labels.ts
function li(e, t) {
	let n = e.chartexSunburst ? {
		rows: e.chartexSunburst.rows,
		kind: "sunburst"
	} : e.chartexTreemap ? {
		rows: e.chartexTreemap.rows,
		kind: "treemap"
	} : void 0;
	if (!n) return "not-hierarchy";
	if (n.rows.length === 0) return "ok";
	if (Nr(n.rows)) return "too-large";
	let r = Pr(n.rows, n.kind === "treemap");
	if (r.layoutWeight <= 0 || r.children.length === 0) return "ok";
	n.kind === "sunburst" && (r.a0 = -Math.PI / 2, r.a1 = r.a0 + Math.PI * 2, Fr(r));
	let i = e.chartexTreemap?.parentLabelLayout ?? "overlapping", a = e.series[0], o = new Map((a?.dataLabelOverrides ?? []).map((e) => [e.idx, e])), s = [...r.children];
	for (; s.length > 0;) {
		let r = s.pop();
		for (let e of r.children) s.push(e);
		if (r.layoutWeight <= 0 || n.kind === "sunburst" && r.a1 - r.a0 <= 1e-4) continue;
		let c = n.kind === "treemap" && r.children.length > 0 && i === "banner" ? ci(e, a, r.labelIndex, r.label, r.value, {
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
function ui(e, t) {
	let n = e.chartexSunburst ? {
		rows: e.chartexSunburst.rows,
		kind: "sunburst"
	} : e.chartexTreemap ? {
		rows: e.chartexTreemap.rows,
		kind: "treemap"
	} : void 0;
	if (!n) return "not-hierarchy";
	if (n.rows.length === 0) return "ok";
	if (Nr(n.rows)) return "too-large";
	let r = Pr(n.rows, n.kind === "treemap");
	if (r.layoutWeight <= 0 || r.children.length === 0) return "ok";
	n.kind === "sunburst" && (r.a0 = -Math.PI / 2, r.a1 = r.a0 + Math.PI * 2, Fr(r));
	let i = e.series[0], a = new Map((i?.dataLabelOverrides ?? []).map((e) => [e.idx, e])), o = e.chartexTreemap?.parentLabelLayout ?? "overlapping", s = [...r.children];
	for (; s.length > 0;) {
		let r = s.pop();
		for (let e of r.children) s.push(e);
		if (r.layoutWeight <= 0 || n.kind === "sunburst" && r.a1 - r.a0 <= 1e-4) continue;
		let c;
		n.kind === "sunburst" ? c = ci(e, i, r.labelIndex, r.label, r.value, {
			visible: !1,
			showVal: !1,
			showCatName: !1
		}, a) : r.children.length > 0 ? (c = ci(e, i, r.labelIndex, r.label, r.value, {
			visible: o !== "none",
			showVal: !1,
			showCatName: !0
		}, a), o === "overlapping" && r.depth !== 0 && (c = null)) : c = ci(e, i, r.labelIndex, r.label, r.value, {
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
function di(e, t, n) {
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
var X = 1e4, fi = 4096, pi = 1048576, mi = 4096;
function hi(e, t, n, r = n) {
	return Sr(e, t, n, r) != null;
}
function gi(e, t, n, r) {
	let i = r[n];
	return i?.kind === "bubble" || i?.kind === "scatter" ? "scatter" : i?.kind === "line" ? e.chartType === "stackedLinePct" ? "stackedLinePct" : e.chartType === "stackedLine" ? "stackedLine" : "line" : i?.kind === "area" ? e.chartType === "stackedAreaPct" ? "stackedAreaPct" : e.chartType === "stackedArea" ? "stackedArea" : "area" : i?.kind ?? t.seriesType ?? (e.chartType === "bubble" ? "scatter" : e.chartType);
}
function _i(e, t) {
	let n = e.series.filter((e) => e.lineGroupIndex === t);
	return n.length > 0 || t !== 0 || ![
		"line",
		"stackedLine",
		"stackedLinePct"
	].includes(e.chartType) ? n : e.series.filter((e) => e.seriesType == null || e.seriesType === "line");
}
function vi(e, t, n) {
	return !!(n?.text || (n?.showVal ?? t.seriesDataLabels?.showVal ?? e.showDataLabels) || (n?.showCatName ?? t.seriesDataLabels?.showCatName) || (n?.showSerName ?? t.seriesDataLabels?.showSerName) || (n?.showPercent ?? t.seriesDataLabels?.showPercent) || (n?.showBubbleSize ?? t.seriesDataLabels?.showBubbleSize) || (n?.showLegendKey ?? t.seriesDataLabels?.showLegendKey));
}
function yi(e, t, n, r) {
	return e.threeD || r[t]?.kind.endsWith("3D") === !0 || E(e, t) ? null : n === "line" || n === "stackedLine" || n === "stackedLinePct" ? "dataPointLine" : n === "area" || n === "stackedArea" || n === "stackedAreaPct" ? "dataPoint" : n === "radar" ? (r[t]?.radarStyle ?? e.radarStyle) === "filled" ? "dataPoint" : "dataPointLine" : null;
}
function bi(e) {
	let t = Si(e.chartType), n = Ft(e), r = e.series.map((t, r) => gi(e, t, r, n)), i = e.series.some((t, n) => r[n] === "scatter" && (t.categories ?? e.categories).some((e) => Number.isFinite(Number.parseFloat(e)))), a = 0, o = (e, t, n = 0, r = n) => {
		hi(e, t, n, r) && a++;
	};
	o(e.chartAreaStyle, e.chartStyleRoles?.chartArea), o(e.plotAreaStyle, e.chartStyleRoles?.[e.threeD ? "plotArea3D" : "plotArea"]), e.showLegend && o(e.legendStyle, e.chartStyleRoles?.legend), (e.titlePresent === !0 || e.title != null || (e.titleRichRuns?.length ?? 0) > 0) && o(e.titleStyle, e.chartStyleRoles?.title), e.catAxisTitle != null && o(e.catAxisTitleStyle, e.chartStyleRoles?.axisTitle), e.valAxisTitle != null && o(e.valAxisTitleStyle, e.chartStyleRoles?.axisTitle);
	for (let t of [e.secondaryValAxis, e.secondaryCatAxis]) t?.title != null && o(t.titleStyle, e.chartStyleRoles?.axisTitle), t?.displayUnits?.label != null && o(t.displayUnits.label.boxStyle?.style, e.chartStyleRoles?.axisTitle);
	if (e.threeD?.seriesAxis?.title != null && o(e.threeD.seriesAxis.titleStyle, e.chartStyleRoles?.axisTitle), e.valAxisDisplayUnits?.label != null && o(e.valAxisDisplayUnits.label.boxStyle?.style, e.chartStyleRoles?.axisTitle), e.catAxisDisplayUnits?.label != null && o(e.catAxisDisplayUnits.label.boxStyle?.style, e.chartStyleRoles?.axisTitle), ui(e, ({ label: t, linkedStyleIndex: n }) => {
		let r = t.labelBox, i = Y(r) ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel;
		o(r?.style, i, 0, n);
	}), e.chartType === "waterfall") {
		let t = e.series[0], n = new Map((t?.dataPointOverrides ?? []).map((e) => [e.idx, e])), r = di(t?.values ?? [], e.categories.length, e.subtotalIndices);
		if (!r.cumulativeOverflow && r.rawMax > r.rawMin) for (let i = 0; i < r.bars.length; i++) {
			let a = r.bars[i];
			a.paintSlot && o(J(n.get(i)?.chartexStyle, t?.chartexStyle), e.chartexDataPointStyle, a.semanticIndex, a.semanticIndex);
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
		for (let t of n.valuesByCategory) nr(t, n.quartileMethod) && o(n.chartexStyle, e.chartexDataPointStyle, r, r);
	}
	let s = e.series[0];
	li(e, ({ node: t, paintsBody: n }) => {
		n && o(s?.chartexStyle, e.chartexDataPointStyle, s?.chartexFormatIdx ?? 0, t.branchIndex);
	});
	let c = dt(e), l = pt(e);
	for (let a = 0; a < e.series.length; a++) {
		let s = e.series[a], u = r[a], d = n[a], f = It(e.chartType, d), p = s.chartexFormatIdx ?? a, m = new Map((s.dataPointOverrides ?? []).map((e) => [e.idx, e])), h = yi(e, a, u, n), g = E(e, a), _ = e.threeD != null || d?.kind.endsWith("3D") === !0, v = d?.kind === "bubble" || d == null && e.chartType === "bubble", y = u === "radar" && (d?.radarStyle ?? e.radarStyle) === "filled", b = u === "scatter" && !v, x = g && (u === "line" || u === "stackedLine" || u === "stackedLinePct" || u === "radar" && !y || b), S = /* @__PURE__ */ new Set();
		if (x) if (u === "scatter") {
			let t = [];
			for (let n = 0; n < s.values.length; n++) xt(e, s, u, n, i, { chartType: f }) && t.push(n);
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
		if (t && h && (!g || h === "dataPoint" && (u === "area" || u === "stackedArea" || u === "stackedAreaPct")) && o(J(s.chartexStyle), D(e, h, a), p), t && g && y && s.values.length >= 3 && s.values.every((e, t) => e != null && Number.isFinite(e) && s.sourceHidden?.[t] !== !0) && o(J(m.get(0)?.chartexStyle, s.chartexStyle), D(e, "dataPoint", a), 0, 0), t && u === "scatter" && !g && b) {
			let t = 0;
			for (let n = 0; n < s.values.length; n++) xt(e, s, u, n, i, { chartType: f }) && t++;
			t >= 2 && o(J(s.chartexStyle), D(e, "dataPointLine", a), p);
		}
		let C = Math.max(s.values.length, s.categories?.length ?? 0, s.bubbleSizes?.length ?? 0, e.categories.length);
		if (t && !e.threeD && d?.kind.endsWith("3D") !== !0) for (let t = 0; t < C; t++) {
			let n = m.get(t), r = xt(e, s, u, t, i, {
				chartType: f,
				bubbleScale: d?.bubbleScale ?? e.bubbleScale,
				showNegativeBubbles: d?.showNegativeBubbles ?? e.showNegativeBubbles
			}), c = v ? "bubble" : u, l = c === "area" || c === "stackedArea" || c === "stackedAreaPct", _ = c === "line" || c === "stackedLine" || c === "stackedLinePct" || l || c === "scatter" || c === "bubble" || c === "radar" || c === "stock", y = wt(c, f, d?.scatterStyle ?? e.scatterStyle, d?.radarStyle ?? e.radarStyle), b = l ? (s.showMarker === !0 || gt(s)) && s.markerSymbol !== "none" : c === "stock" ? s.markerSymbol != null && s.markerSymbol !== "none" : s.showMarker !== !1 && s.markerSymbol !== "none", C = r && _ && !y && Et(s, n, "circle", b) !== "none", w = s.values[t], T = r && (!(u === "pie" || u === "doughnut" || u === "ofPie") || w != null && Number.isFinite(w) && Math.abs(w) > 0), E = d?.kind === "stock" ? d.seriesStart : 0, O = d?.kind === "stock" ? d.seriesCount : e.series.length, k = u === "stock" && (a === E + O - 1 || O >= 4 && a === E);
			if ((x ? S.has(t) : h == null && (v || u !== "scatter" && u !== "radar")) && T && (u !== "stock" || k && !C)) {
				let r = v ? yt(s, n) ? "dataPoint3D" : "dataPoint" : u === "line" || u === "stackedLine" || u === "stackedLinePct" || u === "stock" || u === "scatter" || u === "radar" ? "dataPointLine" : "dataPoint";
				o(J(n?.chartexStyle, s.chartexStyle), D(e, r, a), u === "stock" ? p : n?.chartexStyle ? t : p, u === "stock" ? p : g ? t : p);
			}
			C && !v && o(J(n?.markerStyle, n?.chartexStyle, s.markerStyle), D(e, "dataPointMarker", a), n?.markerStyle || n?.chartexStyle ? t : p, g ? t : p);
		}
		if (t && u === "ofPie") {
			let t = Rt(e.ofPie, s.values), n = t == null ? void 0 : [...t].find((e) => {
				let t = s.values[e];
				return t != null && Number.isFinite(t) && Math.abs(t) > 0;
			});
			n != null && o(J(m.get(n)?.chartexStyle, s.chartexStyle), D(e, "dataPoint", a), g ? n : p);
		}
		if (t && _ && (d?.kind === "line3D" || d?.kind === "area3D" || u === "line" || u === "stackedLine" || u === "stackedLinePct" || u === "area" || u === "stackedArea" || u === "stackedAreaPct")) {
			let t = (d?.kind === "area3D" || u === "area" || u === "stackedArea" || u === "stackedAreaPct" ? s.showMarker === !0 || gt(s) : s.showMarker === !0) && s.markerSymbol !== "none";
			for (let n = 0; n < C; n++) {
				let r = m.get(n), i = t || r?.markerSymbol != null && r.markerSymbol !== "none", c = s.values[n];
				!i || s.sourceHidden?.[n] === !0 || c == null || !Number.isFinite(c) || o(J(r?.markerStyle, r?.chartexStyle, s.markerStyle), D(e, "dataPointMarker", a), r?.markerStyle || r?.chartexStyle ? n : p, p);
			}
		}
		let w = u === "scatter" && !v && s.lineHidden !== !0, T = d?.kind === "line3D" || u === "line" || u === "stackedLine" || u === "stackedLinePct" || u === "stock" || w || u === "radar" && !y, O = v || u === "scatter" && !w, k = _ ? "dataPoint3D" : T ? "dataPointLine" : "dataPoint", A = (t, n) => {
			let r = n ? m.get(t) : void 0, i = n ? t : a;
			if (!O) {
				let c = J(r?.chartexStyle, s.chartexStyle);
				o(c, D(e, k, a), _ ? c === r?.chartexStyle ? t : p : r?.chartexStyle ? t : p, _ ? g ? i : p : n ? t : p);
			}
			if (!((_ ? T && s.showMarker === !0 && s.markerSymbol !== "none" : Tt(f, d?.scatterStyle ?? e.scatterStyle, s, d?.radarStyle ?? e.radarStyle)) || r?.markerSymbol != null && r.markerSymbol !== "none")) return;
			let c = v && yt(s, r) ? "dataPoint3D" : v ? "dataPoint" : "dataPointMarker";
			o(J(r?.markerStyle, r?.chartexStyle, v ? s.chartexStyle : s.markerStyle), D(e, c, a), r?.markerStyle || r?.chartexStyle ? t : p, _ ? p : n ? t : p);
		};
		if (e.showLegend) {
			let e = c[a];
			if (e) for (let t = 0; t < e.count; t++) l.has(e.firstIndex + t) || A(e.pointDriven ? t : 0, e.pointDriven);
		}
		if (e.dataTable?.showKeys === !0 && R(e.chartType) && A(0, c[a]?.pointDriven === !0), St(e, s, u, C, i, {
			chartType: f,
			bubbleScale: d?.bubbleScale ?? e.bubbleScale,
			showNegativeBubbles: d?.showNegativeBubbles ?? e.showNegativeBubbles
		}, a) > 0) {
			let t = new Map((s.dataLabelOverrides ?? []).map((e) => [e.idx, e]));
			for (let n = 0; n < C; n++) {
				let r = t.get(n);
				I(s.seriesDataLabels, r) || (r?.showLegendKey ?? s.seriesDataLabels?.showLegendKey) !== !0 || !L(e, s, u, n, i, a) || A(n, c[a]?.pointDriven === !0);
			}
		}
		for (let t of s.dataLabelOverrides ?? []) {
			if (s.sourceHidden?.[t.idx] === !0 || I(s.seriesDataLabels, t) || !vi(e, s, t) || !L(e, s, u, t.idx, i, a)) continue;
			let n = ai(t.labelBox, s.seriesDataLabels?.labelBox);
			o(J(t.labelBox?.style, s.seriesDataLabels?.labelBox?.style), Y(n) ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, 0, t.idx);
		}
		let ee = new Set((s.dataLabelOverrides ?? []).map((e) => e.idx));
		if (s.seriesDataLabels?.labelBox != null || e.chartStyleRoles?.dataLabel != null) {
			let t = Math.max(s.values.length, s.categories?.length ?? 0, e.categories.length);
			for (let n = 0; n < t; n++) ee.has(n) || L(e, s, u, n, i, a) && vi(e, s, void 0) && o(s.seriesDataLabels?.labelBox?.style, Y(s.seriesDataLabels?.labelBox) ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, 0, s.chartexFormatIdx ?? a);
		}
		for (let n of t ? s.trendLines ?? [] : []) (n.dispEq === !0 || n.dispRSqr === !0 || n.labelText || n.labelRichRuns?.some((e) => e.text.length > 0) === !0) && o(n.labelBox?.style, e.chartStyleRoles?.trendlineLabel, 0, s.chartexFormatIdx ?? a);
	}
	for (let t = 0; t < (e.chartexBox?.series.length ?? 0); t++) {
		let n = e.chartexBox.series[t];
		if ((e.chartStyleMarkerSymbol ?? e.chartexMarkerSymbol ?? "circle") === "none" || !n.showNonoutliers && !n.showOutliers) continue;
		let r = n.chartexFormatIdx ?? t;
		for (let t of n.valuesByCategory) {
			let i = nr(t, n.quartileMethod);
			if (!i) continue;
			let a = (n.showNonoutliers ? i.inner.length : 0) + (n.showOutliers ? i.outliers.length : 0);
			for (let t = 0; t < a; t++) o(J(n.chartexStyle), e.chartStyleRoles?.dataPointMarker, r);
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
	for (let t of e.lineGroupDecorations ?? []) t.upDownBars && u(_i(e, t.groupIndex), t.upDownBars);
	return Math.max(1, a);
}
var xi = new Set([
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
function Si(e) {
	return xi.has(e);
}
function Ci(e) {
	let t = 0, n = (e) => !Number.isSafeInteger(e) || e < 0 || e > 1e4 - t ? !1 : (t += e, !0), r = (e, n) => !Number.isSafeInteger(e) || e < 0 || !Number.isSafeInteger(n) || n < 0 || e !== 0 && n > Math.floor((1e4 - t) / e) ? !1 : (t += e * n, !0);
	if (!n(e.legendEntries?.length ?? 0) || !n(e.plotGroups?.length ?? 0)) return X + 1;
	if (e.plotGroups != null) {
		let t = 0;
		for (let n of e.plotGroups) {
			if (!Number.isSafeInteger(n.seriesStart) || n.seriesStart < 0 || !Number.isSafeInteger(n.seriesCount) || n.seriesCount < 0 || n.seriesStart !== t || n.seriesCount > e.series.length - t) return X + 1;
			t += n.seriesCount;
		}
		if (t !== e.series.length) return X + 1;
	}
	for (let t of e.series) {
		let i = Math.max(1, e.categories.length, t.values.length, t.categories?.length ?? 0, t.bubbleSizes?.length ?? 0, t.dataPointOverrides?.length ?? 0, t.dataLabelOverrides?.length ?? 0);
		if (!n(i) || !r(t.trendLines?.length ?? 0, Math.max(1, t.values.length)) || !n(t.errBars?.length ?? 0)) return X + 1;
		for (let e of t.errBars ?? []) if (!n(Math.max(i, e.plus.length, e.minus.length))) return X + 1;
	}
	if (!n(e.chartexSunburst?.rows.length ?? 0) || !n(e.chartexTreemap?.rows.length ?? 0) || !n(e.chartexRegionMap?.rows.length ?? 0) || !n(e.chartexBox?.categories.length ?? 0) || !n(e.chartexBox?.series.length ?? 0)) return X + 1;
	for (let t of e.chartexBox?.series ?? []) for (let e of t.valuesByCategory) if (!n(e.length)) return X + 1;
	return n(e.ofPie?.customSplitIndices?.length ?? 0) ? t : X + 1;
}
function wi(e) {
	if (!Si(e.chartType)) return null;
	let t = 0;
	for (let n of e.series) {
		let r = 0;
		for (let e of n.errBars ?? []) r = Math.max(r, e.plus.length, e.minus.length);
		let i = Math.max(1, e.categories.length, n.categories?.length ?? 0, n.values.length, n.bubbleSizes?.length ?? 0, n.dataPointOverrides?.length ?? 0, n.dataLabelOverrides?.length ?? 0, n.trendLines?.length ?? 0, r);
		if (!Number.isSafeInteger(i) || i > 1e4 - t) return X + 1;
		t += i;
	}
	return t;
}
//#endregion
//#region packages/core/src/chart/three-d-surface-picture-plan.ts
function Ti(e, t) {
	return !Number.isSafeInteger(t) || t < 0 ? !1 : e.slabFaces ? t === 0 ? e.slabFaces.front : t === 1 || t >= 6 ? !1 : t % 2 == 0 ? e.slabFaces.end : e.slabFaces.sides : t === 0;
}
function Ei(e, t) {
	return e.mode !== "stack" && e.mode !== "stackScale" || !Ti(e, t) ? !1 : !e.slabFaces || t === 0 || t % 2 == 1;
}
function Di(e, t) {
	return Ti(e, t) ? Oi(e, t) ? e.repetitions : 1 : 0;
}
function Oi(e, t) {
	return e.mode === "stackScale" && Ei(e, t);
}
function ki(e) {
	let t = 0;
	for (let n = 0; n < 6; n++) if (t += Di(e, n), t > 4096) return null;
	return e;
}
function Ai(e) {
	return e == null || [
		e.l,
		e.t,
		e.r,
		e.b
	].every((e) => (e ?? 0) === 0);
}
function ji(e) {
	if (!e) return !0;
	let t = e.l ?? 0, n = e.t ?? 0, r = e.r ?? 0, i = e.b ?? 0, a = [
		t,
		n,
		r,
		i
	], o = 1 - r, s = 1 - i;
	return a.every(Number.isFinite) && o > t && s > n && Math.min(1, o) > Math.max(0, t) && Math.min(1, s) > Math.max(0, n);
}
function Mi(e, t, n, r) {
	if (e.tile != null == (e.stretch === !0) || !ji(e.srcRect) || !ji(e.fillRect) || e.rotWithShape === !1 || e.alpha != null && (!Number.isFinite(e.alpha) || e.alpha < 0 || e.alpha > 1)) return null;
	let i = t?.pictureOptions;
	if (i?.pictureFormatAuthored === !0 && i.pictureFormat == null || i?.pictureStackUnitAuthored === !0 && i.pictureStackUnit == null) return null;
	let a = i?.pictureFormat ?? "stretch";
	if ((!Ai(e.srcRect) || !Ai(e.fillRect)) && a !== "stretch") return null;
	let o = t?.thicknessPercent ?? 0;
	if (!Number.isFinite(o) || o < 0) return null;
	let s = o === 0 ? void 0 : {
		front: i?.applyToFront !== !1,
		sides: i?.applyToSides !== !1,
		end: i?.applyToEnd !== !1
	};
	if (s && !Object.values(s).some(Boolean) || !s && (n === "backWall" && i?.applyToFront === !1 || (n === "floor" || n === "sideWall") && i?.applyToSides === !1) || (i?.pictureStackUnitAuthored === !0 || i?.pictureStackUnit != null) && a !== "stackScale") return null;
	if (e.tile) return a !== "stretch" || !Ai(e.fillRect) ? null : ki({
		mode: "tile",
		repetitions: 1,
		slabFaces: s
	});
	if (a === "stretch") return ki({
		mode: "stretch",
		repetitions: 1,
		slabFaces: s
	});
	if (a === "stack") return ki({
		mode: "stack",
		repetitions: 1,
		slabFaces: s
	});
	if (a !== "stackScale") return null;
	let c = i?.pictureStackUnit;
	if (!(c != null && Number.isFinite(c) && c > 0)) return null;
	if (n === "floor") return ki({
		mode: "stretch",
		repetitions: 1,
		slabFaces: s
	});
	if (r == null) return ki({
		mode: "stackScale",
		repetitions: 1,
		stackUnit: c,
		slabFaces: s
	});
	if (!(Number.isFinite(r) && r > 0)) return null;
	let l = Math.ceil(r / c);
	return !Number.isSafeInteger(l) || l < 1 || l > 4096 ? null : ki({
		mode: "stackScale",
		repetitions: l,
		stackUnit: c,
		slabFaces: s
	});
}
//#endregion
//#region packages/core/src/chart/axis-style.ts
function Ni(e, t) {
	return e ? Math.max(.5, e / n) * t : 1;
}
function Pi(e, t, n) {
	return {
		color: e ? `#${e}` : "#aaa",
		width: Ni(t, n)
	};
}
function Fi(e, t, n) {
	return {
		color: e ? `#${e}` : "#e0e0e0",
		width: t ? Ni(t, n) : .5
	};
}
function Ii(e) {
	return e.catAxisCrossBetween !== "midCat";
}
//#endregion
//#region packages/core/src/chart/compound-frame.ts
function Li(e, t) {
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
function Ri(e, t, n, r, i, a) {
	let o = Math.max(0, Math.min(a, r / 2, i / 2));
	e.beginPath(), e.moveTo(t + o, n), e.lineTo(t + r - o, n), e.quadraticCurveTo(t + r, n, t + r, n + o), e.lineTo(t + r, n + i - o), e.quadraticCurveTo(t + r, n + i, t + r - o, n + i), e.lineTo(t + o, n + i), e.quadraticCurveTo(t, n + i, t, n + i - o), e.lineTo(t, n + o), e.quadraticCurveTo(t, n, t + o, n), e.closePath();
}
function zi(e, t, n, r, i, a, o, s = 0) {
	if (r > 0 && i > 0) for (let c of Li(a, o)) {
		let a = Math.max(0, r - c.center * 2), o = Math.max(0, i - c.center * 2);
		a > 0 && o > 0 && (e.lineWidth = c.width, s > 0 ? (Ri(e, t + c.center, n + c.center, a, o, Math.max(0, s - c.center)), e.stroke()) : e.strokeRect(t + c.center, n + c.center, a, o));
	}
}
//#endregion
//#region packages/core/src/chart/legend-frame.ts
function Bi(e) {
	let t = T(e, "legend"), n = e.legendFillHidden === !0 && P(t) === void 0;
	if (!(e.legendFillHidden === !0 && !n)) {
		if (e.legendFill != null) return e.legendFill;
		if (!(e.legendFillColor != null || e.legendFillPaintAuthored === !0 && !n)) return F(e.chartStyleRoles?.legend, t, 0, e.legendStyle) ?? void 0;
	}
}
function Vi(e, t, n, r, i = 0) {
	(!t.legendFill && !t.legendFillColor || t.legendFillHidden === !0) && (!t.legendLineFill && !t.legendLineColor || t.legendLineHidden === !0) || Mr(e, t.legendStyle, t.chartStyleRoles?.legend, 0, n, r, (e) => {
		if (e.save(), t.legendFillHidden !== !0 && (t.legendFill || t.legendFillColor)) {
			let a = t.legendFill?.fillType === "image" && ri(e, t.legendFill, n.x, n.y, n.w, n.h, r, i) ? null : t.legendFill ? G(t.legendFill, e, n.x, n.y, n.w, n.h, i) : t.legendFillColor ? `#${t.legendFillColor}` : null;
			a && (e.fillStyle = a), a && e.fillRect(n.x, n.y, n.w, n.h);
		}
		if (t.legendLineHidden !== !0 && (t.legendLineFill || t.legendLineColor) && n.w > 0 && n.h > 0) {
			let a = Ni(t.legendLineWidthEmu, r), o = t.legendLineFill ? G(t.legendLineFill, e, n.x, n.y, n.w, n.h, i) : t.legendLineColor ? `#${t.legendLineColor}` : null;
			o && (e.strokeStyle = o, e.lineCap = t.legendLineCap === "rnd" ? "round" : t.legendLineCap === "sq" ? "square" : "butt", e.lineJoin = t.legendLineJoin === "round" || t.legendLineJoin === "bevel" ? t.legendLineJoin : "miter", e.setLineDash(Bn(t.legendLineCustomDash, t.legendLineDash, a)), zi(e, n.x, n.y, n.w, n.h, a, t.legendLineCompound));
		}
		e.restore();
	});
}
//#endregion
//#region packages/core/src/chart/source-visibility.ts
function Hi(e, t) {
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
function Ui(e, t) {
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
function Wi(e) {
	return Math.max(e.values.length, e.categories?.length ?? 0, e.sourceHidden?.length ?? 0, e.dataPointColors?.length ?? 0, e.dataLabelColors?.length ?? 0, e.catFormatCodes?.length ?? 0, e.bubbleSizes?.length ?? 0, ...(e.errBars ?? []).flatMap((e) => [e.plus.length, e.minus.length]));
}
function Gi(e, t) {
	return {
		...e,
		values: Z(e.values, t) ?? [],
		categories: Z(e.categories, t),
		sourceHidden: Z(e.sourceHidden, t),
		dataPointColors: Z(e.dataPointColors, t),
		dataLabelColors: Z(e.dataLabelColors, t),
		catFormatCodes: Z(e.catFormatCodes, t),
		bubbleSizes: Z(e.bubbleSizes, t),
		dataPointOverrides: Ui(e.dataPointOverrides, t),
		dataLabelOverrides: Ui(e.dataLabelOverrides, t),
		errBars: e.errBars?.map((e) => ({
			...e,
			plus: Z(e.plus, t) ?? [],
			minus: Z(e.minus, t) ?? []
		}))
	};
}
function Ki(e) {
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
function qi(e) {
	return e.chartType === "scatter" || e.chartType === "bubble";
}
function Ji(e) {
	let t = e.sourceHidden;
	return t != null && t.length > 0 && t.every(Boolean);
}
function Yi(e, t) {
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
var Xi = [
	"diamond",
	"square",
	"triangle",
	"x",
	"star",
	"circle"
], Zi = /* @__PURE__ */ new WeakSet();
function Qi(e) {
	return Zi.has(e);
}
function $i(e, t) {
	let n = e.themeAccentColors, r = t.dataPointColors?.some((e) => e != null) === !0 || (t.dataPointOverrides?.length ?? 0) > 0, i = t.markerSymbol != null || t.markerFill != null || t.markerFillPaintAuthored === !0 || t.markerLine != null || t.markerLinePaintAuthored === !0;
	if (e.scatterStyle !== "marker" || !n?.length || r || i || t.lineHidden === !0) return t;
	let a = {
		...t,
		dataPointColors: t.values.map((e, t) => n[t % n.length]),
		dataPointOverrides: t.values.map((e, t) => ({
			idx: t,
			markerSymbol: Xi[t % Xi.length]
		}))
	};
	return Zi.add(a), a;
}
function ea(e) {
	if (e.plotVisibleOnly !== !0) return e;
	if (qi(e)) {
		let t = [];
		return {
			...e,
			series: e.series.flatMap((n, r) => {
				let i = n.categories == null ? {
					...n,
					categories: e.categories
				} : n, a = i.sourceHidden, o = a && Hi(a, Wi(i));
				if (!o) return t.push(r), [i];
				if (o.keep.length === 0) return [];
				t.push(r);
				let s = Gi(i, o);
				return e.chartType === "scatter" ? [$i(e, s)] : [s];
			}),
			plotGroups: Yi(e, t)
		};
	}
	let t = Math.max(e.categories.length, ...e.categoryLevels?.map((e) => e.length) ?? [], ...e.series.map(Wi)), n = e.categorySourceHidden ? Hi(e.categorySourceHidden, t) : null, r = [], i = e.series.flatMap((e, t) => {
		let i = n ? Gi(e, n) : e;
		return n?.keep.length === 0 || Ji(i) ? [] : (r.push(t), [Ki(i)]);
	}), a = Yi(e, r);
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
//#endregion
//#region packages/core/src/chart/image-fill.ts
var ta = new Set([
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
function na(e) {
	return JSON.stringify([
		e.imagePath,
		e.svgImagePath ?? null,
		e.duotone?.clr1 ?? null,
		e.duotone?.clr2 ?? null
	]);
}
var Q;
function ra(e, t) {
	let n = Q;
	Q = e;
	try {
		return ni(ba, t);
	} finally {
		Q = n;
	}
}
function ia(e, t, n, r, i) {
	let a = e;
	return {
		x: a.endsWith("r") || a === "r" ? t - r : a === "t" || a === "ctr" || a === "b" ? (t - r) / 2 : 0,
		y: a.startsWith("b") || a === "b" ? n - i : a === "l" || a === "ctr" || a === "r" ? (n - i) / 2 : 0
	};
}
var aa = new Set([
	"tl",
	"t",
	"tr",
	"l",
	"ctr",
	"r",
	"bl",
	"b",
	"br"
]), oa = new Set([
	"none",
	"x",
	"y",
	"xy"
]);
function sa(e) {
	return e.tile != null != (e.stretch === !0) && Cn(e.srcRect);
}
function ca(e) {
	let t = e.tile;
	if (!t) return null;
	let { algn: n, tx: r, ty: i, sx: a, sy: o } = t, s = t.flip ?? "none", c = e.dpi;
	return !n || !aa.has(n) || !oa.has(s) || !Number.isFinite(r) || !Number.isFinite(i) || !(c != null && Number.isFinite(c) && c > 0) || !(Number.isFinite(a) && a > 0) || !(Number.isFinite(o) && o > 0) ? null : {
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
function la(e) {
	return !W(e) || !sa(e) ? null : Q?.(e) ?? null;
}
function ua(t, r, i = e) {
	let a = ca(t);
	if (!a) return null;
	let o = wn(r);
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
function da(e, t, n) {
	let r = ia(e.alignment, t, n, e.tileW, e.tileH);
	return {
		x: r.x + e.offsetX,
		y: r.y + e.offsetY
	};
}
function fa(e, t, n, r, i) {
	let a = ua(e, t, i);
	if (!a) return null;
	let { tileW: o, tileH: s } = a, c = Math.ceil(n / o) + 2, l = Math.ceil(r / s) + 2, u = c * l;
	return Number.isSafeInteger(u) ? {
		...a,
		columns: c,
		rows: l,
		repetitions: u
	} : null;
}
function pa(t, n, r, i, a = e) {
	if (!(r > 0) || !(i > 0) || !W(t) || !sa(t)) return 0;
	let o = (n ?? Q)?.(t);
	if (!o) return 0;
	if (!t.tile) return 1;
	let s = fa(t, o, r, i, a);
	return s ? Math.min(s.repetitions, mi) : 0;
}
function $(e) {
	return Number.isFinite(e) && e > 0;
}
function ma(e, t) {
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
function ha(e) {
	if (!W(e) || !sa(e)) return null;
	let t = e.srcRect ? 1 - e.srcRect.l - e.srcRect.r : 1, n = e.srcRect ? 1 - e.srcRect.t - e.srcRect.b : 1;
	if (!(Number.isFinite(t) && t > 0) || !(Number.isFinite(n) && n > 0)) return null;
	let r = e.srcRect != null;
	if (e.tile) {
		if (!ca(e)) return null;
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
function ga(e, t) {
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
function _a(e, t) {
	if (Ci(e) > 1e4) return {
		usages: [],
		sourceLimitExceeded: !1,
		usageRejected: !1
	};
	e = ea(e), e = w(e);
	let n = /* @__PURE__ */ new Map(), r = !1, i = !1, a = (e) => {
		if (i || !e || typeof e != "object" || e.fillType !== "image") return;
		let a = e, o = ha(a);
		if (!o) return;
		let s = na(a), c = {
			fill: a,
			...o
		};
		if (t && !t(c)) {
			i = !0;
			return;
		}
		let l = n.get(s);
		if (l) {
			n.set(s, ga(l, c));
			return;
		}
		if (n.size >= 256) {
			r = !0;
			return;
		}
		n.set(s, c);
	}, o = (e, t) => {
		let n = M(e, t);
		return n?.fillType === "image" || n == null ? n : null;
	}, s = (e, t, n) => {
		let r = N(e, t, n);
		return r?.fillType === "image" || r == null ? r : null;
	}, c = (e, t, n, r, i) => {
		let a = e?.fillHidden ? P(r) : N(e, r, i);
		if (a !== void 0) return a?.fillType === "image" ? a : null;
		if (t) return null;
		let o = M(n, i);
		return o?.fillType === "image" || o == null ? o : null;
	}, l = (t, n, r) => t?.fillHidden === !0 || t?.color != null || t?.chartexStyle?.fillPaintAuthored === !0 || t?.chartexStyle?.fillHidden != null || t?.chartexStyle?.fillColors?.some((e) => e != null) === !0 || t?.chartexStyle?.fillPaints?.some((e) => e != null) === !0 ? c(t?.fillHidden === !0 ? {
		...t.chartexStyle,
		fillHidden: !0,
		fillPaintAuthored: !0
	} : t?.chartexStyle, t?.color, e.chartexDataPointStyle, T(e, "dataPoint") ?? (e.classicChartStyleRoles == null ? e.chartexDataPointStyle : void 0), r) : n?.chartexStyle?.fillPaintAuthored === !0 ? c(n.chartexStyle, n.color, e.chartexDataPointStyle, T(e, "dataPoint") ?? (e.classicChartStyleRoles == null ? e.chartexDataPointStyle : void 0), r) : c(n?.chartexStyle, n?.color, e.chartexDataPointStyle, T(e, "dataPoint"), r), u = (e, t, n, r, i, a, o) => {
		if (n === !0) {
			let e = P(a);
			if (e !== void 0) return e;
		}
		if (e?.fillType === "image") return e;
		if (e != null || t != null || r === !0 && n !== !0) return null;
		if (i?.fillNoStyle === !0) return;
		let s = F(i, a, 0, o);
		return s?.fillType === "image" || s == null ? s : null;
	}, d = u(e.chartFill, void 0, e.chartFillHidden, e.chartFillPaintAuthored, e.chartStyleRoles?.chartArea, T(e, "chartArea"), e.chartAreaStyle);
	d && a(d);
	let f = u(e.plotAreaFill, e.plotAreaBg, e.plotAreaFillHidden, e.plotAreaFillPaintAuthored, e.threeD ? e.chartStyleRoles?.plotArea3D : e.chartStyleRoles?.plotArea, T(e, e.threeD ? "plotArea3D" : "plotArea"), e.plotAreaStyle);
	f && a(f), e.showLegend && a(Bi(e));
	let p = (e, t, n, r = 0) => {
		a(ii(e, t, n, !0, 0, r)?.fillPaint);
	};
	e.title && p(e.titleStyle ? { style: e.titleStyle } : void 0, e.chartStyleRoles?.title, T(e, "title")), e.catAxisTitle && p(e.catAxisTitleStyle ? { style: e.catAxisTitleStyle } : void 0, e.chartStyleRoles?.axisTitle, T(e, "axisTitle")), e.valAxisTitle && p(e.valAxisTitleStyle ? { style: e.valAxisTitleStyle } : void 0, e.chartStyleRoles?.axisTitle, T(e, "axisTitle"));
	for (let t of [e.secondaryValAxis, e.secondaryCatAxis]) t?.title && p(t.titleStyle ? { style: t.titleStyle } : void 0, e.chartStyleRoles?.axisTitle, T(e, "axisTitle")), t?.displayUnits?.label && p(t.displayUnits.label.boxStyle, e.chartStyleRoles?.axisTitle, T(e, "axisTitle"));
	e.threeD?.seriesAxis?.title && p(e.threeD.seriesAxis.titleStyle ? { style: e.threeD.seriesAxis.titleStyle } : void 0, e.chartStyleRoles?.axisTitle, T(e, "axisTitle"));
	for (let t of [e.valAxisDisplayUnits, e.catAxisDisplayUnits]) t?.label && p(t.label.boxStyle, e.chartStyleRoles?.axisTitle, T(e, "axisTitle"));
	let m = e.series.some((e) => e.values.some((e) => e != null && Number.isFinite(e))), h = Math.max(e.categories.length, ...e.series.map((e) => e.categories?.length ?? e.values.length)), g = e.chartType === "surface" || e.chartType === "surface3D" ? e.series.length >= 2 && h >= 2 && m : m;
	if (e.threeD && ta.has(e.chartType) && g) {
		let t = e.valMin != null && Number.isFinite(e.valMin) && e.valMax != null && Number.isFinite(e.valMax) ? e.valMax - e.valMin : void 0;
		for (let [n, r] of [
			["floor", "floor"],
			["sideWall", "wall"],
			["backWall", "wall"]
		]) {
			let i = e.threeD[n], o = de(e, i, r).fill;
			o?.fillType === "image" && Mi(o, i, n, t) && a(o);
		}
	}
	let _ = Ft(e), v = (t, n) => {
		let r = ue(e, t, n);
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
	}), x = pt(e), S = dt(e, !0), C = e.categories.length > 0 || (e.series[0]?.categories?.length ?? 0) > 0 || e.series.some((e) => e.values.length > 0);
	for (let t = 0; t < e.series.length; t++) {
		let n = e.series[t], r = n.chartexFormatIdx ?? t, i = E(e, t), c = D(e, "dataPointMarker", t), l = _[t], u = l?.kind === "bubble" || l == null && e.chartType === "bubble", d = l?.kind === "bubble" || l?.kind === "scatter" ? "scatter" : n.seriesType ?? (e.chartType === "bubble" ? "scatter" : e.chartType), f = It(e.chartType, l), m = l?.scatterStyle ?? e.scatterStyle, h = l?.radarStyle ?? e.radarStyle, g = {
			chartType: f,
			bubbleScale: l?.bubbleScale ?? e.bubbleScale,
			showNegativeBubbles: l?.showNegativeBubbles ?? e.showNegativeBubbles
		}, v = d === "line" || d === "stackedLine" || d === "stackedLinePct" || d === "area" || d === "stackedArea" || d === "stackedAreaPct" || d === "scatter" || d === "radar" || d === "stock", y = d === "area" || d === "stackedArea" || d === "stackedAreaPct", w = y ? (n.showMarker === !0 || gt(n)) && n.markerSymbol !== "none" : d === "stock" ? n.markerSymbol != null && n.markerSymbol !== "none" : n.showMarker !== !1 && n.markerSymbol !== "none", O = ht(S, x, t), k = Math.max(n.values.length, n.categories?.length ?? 0, e.categories.length), A = new Map((n.dataLabelOverrides ?? []).map((e) => [e.idx, e]));
		for (let i = 0; i < k; i++) {
			let a = A.get(i);
			if (I(n.seriesDataLabels, a) || !(a?.text || (a?.showVal ?? n.seriesDataLabels?.showVal ?? e.showDataLabels) || (a?.showCatName ?? n.seriesDataLabels?.showCatName) || (a?.showSerName ?? n.seriesDataLabels?.showSerName) || (a?.showPercent ?? n.seriesDataLabels?.showPercent) || (a?.showBubbleSize ?? n.seriesDataLabels?.showBubbleSize) || (a?.showLegendKey ?? n.seriesDataLabels?.showLegendKey)) || !L(e, n, d, i, b, t)) continue;
			let o = ai(a?.labelBox, n.seriesDataLabels?.labelBox), s = Y(o);
			p(o, s ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, s ? T(e, "dataLabelCallout") ?? T(e, "dataLabel") : T(e, "dataLabel"), a ? i : r);
		}
		for (let t of n.trendLines ?? []) (t.dispEq === !0 || t.dispRSqr === !0 || t.labelText || t.labelRichRuns?.some((e) => e.text.length > 0) === !0) && p(t.labelBox, e.chartStyleRoles?.trendlineLabel, T(e, "trendlineLabel"), r);
		let ee = St(e, n, d, k, b, g, t) > 0, te = new Map((n.dataLabelOverrides ?? []).map((e) => [e.idx, e])), ne = (r) => {
			let i = te.get(r);
			return !I(n.seriesDataLabels, i) && (i?.showLegendKey ?? n.seriesDataLabels?.showLegendKey ?? !1) === !0 && L(e, n, d, r, b, t);
		}, j = S[t]?.pointDriven === !0, re = !j && Tt(f, m, n, h) && (e.showLegend && O || e.dataTable?.showKeys === !0 && R(e.chartType) && C || ee), ie = n.markerSymbol ?? (d === "stock" ? "none" : "circle");
		if (!(l?.kind === "bar3D" || l?.kind === "pie3D" || l?.kind === "area3D" || l?.kind === "line3D" || l?.kind === "surface3D") && (l?.kind === "bar" || d === "bar" || d === "clusteredBar" || d === "clusteredBarH" || d === "stackedBar" || d === "stackedBarH" || d === "stackedBarPct" || d === "stackedBarHPct" || d === "pie" || d === "doughnut" || d === "ofPie" || y || d === "radar" && h === "filled")) {
			let o = new Map((n.dataPointOverrides ?? []).map((e) => [e.idx, e])), s = y ? n.values.length > 0 : d === "radar" ? k > 2 && Array.from({ length: k }, (e, t) => n.values[t] != null && Number.isFinite(n.values[t])).every(Boolean) : n.values.some((e) => e != null && Number.isFinite(e) && e !== 0), c = e.showLegend && O || e.dataTable?.showKeys === !0 && R(e.chartType) && C || ee, l = i || d === "pie" || d === "doughnut" || d === "ofPie";
			if (s || c) if (y || d === "radar" && !i) {
				let t = pe(e, n, void 0, r);
				t?.fillType === "image" && a(t);
			} else if (d === "radar") {
				let t = o.get(0), r = pe(e, n, t, 0, 0);
				r?.fillType === "image" && a(r);
			} else {
				if (c && !l) {
					let t = pe(e, n, void 0, r);
					t?.fillType === "image" && a(t);
				}
				for (let s = 0; s < k; s++) {
					let c = n.values[s], u = c != null && Number.isFinite(c) && c !== 0, d = l && (e.showLegend && mt(S, x, t, s) || e.dataTable?.showKeys === !0 && R(e.chartType) && C && s === 0 || ne(s));
					if (!u && !d) continue;
					let f = o.get(s), p = pe(e, n, f, i ? s : r, s);
					p?.fillType === "image" && a(p);
				}
			}
		}
		if (!v || wt(d, f, m, h)) continue;
		if (re && bt(ie)) {
			if (u) {
				let i = T(e, "dataPoint"), c = s(n.chartexStyle, i, r);
				if (c && a(c), c === void 0 && n.color == null) {
					let n = o(D(e, "dataPoint", t), r);
					n && a(n);
				}
			} else a(n.markerFillPaint);
			if (!u && n.markerFillPaint === void 0 && n.markerFill == null && !(n.markerFillPaintAuthored === !0 && n.markerStyle?.fillHidden !== !0) && !i) {
				let t = F(c, T(e, "dataPointMarker"), r, n.markerStyle);
				t?.fillType === "image" && a(t);
			}
		}
		if (!w && !Ct(n)) continue;
		let M = new Map((n.dataPointOverrides ?? []).map((e) => [e.idx, e]));
		for (let f = 0; f < k; f++) {
			let p = xt(e, n, d, f, b, g) && (!u || (l?.bubbleScale ?? e.bubbleScale ?? 100) > 0 && vt({ showNegativeBubbles: l?.showNegativeBubbles ?? e.showNegativeBubbles }, n.bubbleSizes?.[f]) != null), m = j && e.showLegend && mt(S, x, t, f), h = j && e.dataTable?.showKeys === !0 && R(e.chartType) && C && f === 0, _ = j && ne(f);
			if (!p && !m && !h && !_) continue;
			let v = M.get(f);
			if (!bt(Et(n, v, "circle", w))) continue;
			if (u) {
				if ((n.bubbleSizes?.[f] ?? 0) < 0) continue;
				let i = D(e, "dataPoint", t), c = E(e, t) ? f : r, l = T(e, "dataPoint"), u = N(v?.chartexStyle, l, f), d = u?.fillType === "image" || u == null ? u : null;
				d && a(d);
				let p = v?.fillHidden === !0 ? P(l) : void 0;
				if (d !== void 0 || p !== void 0 || v?.color != null || n.dataPointColors?.[f] != null) continue;
				let m = s(n.chartexStyle, l, r);
				if (m && a(m), m !== void 0 || n.color != null) continue;
				let h = o(i, c);
				h && a(h);
				continue;
			}
			let y = Dt(n, v, f);
			if (a(y), y === void 0 && v?.markerFill == null && v?.color == null && n.dataPointColors?.[f] == null && n.markerFill == null && !(v?.markerFillPaintAuthored === !0 && v.markerStyle?.fillHidden !== !0) && !(n.markerFillPaintAuthored === !0 && n.markerStyle?.fillHidden !== !0)) {
				let t = v?.markerStyle?.shapePropertiesPresent === !0 ? v.markerStyle : n.markerStyle, o = F(c, T(e, "dataPointMarker"), i ? f : r, t);
				o?.fillType === "image" && a(o);
			}
		}
	}
	for (let t = 0; t < (e.chartexBox?.series.length ?? 0); t++) {
		let n = e.chartexBox.series[t];
		if (!bt(e.chartStyleMarkerSymbol ?? e.chartexMarkerSymbol ?? "circle") || !(n.showNonoutliers || n.showOutliers)) continue;
		let r = 0;
		for (let e of n.valuesByCategory) {
			let t = nr(e, n.quartileMethod);
			t && (n.showNonoutliers && (r += t.inner.length), n.showOutliers && (r += t.outliers.length));
		}
		if (r === 0) continue;
		let i = n.chartexFormatIdx ?? t, c = n.chartexStyle, l = e.chartexDataPointMarkerStyle ?? e.chartexDataPointStyle ?? void 0, u = s(c, e.chartexDataPointMarkerStyle == null ? T(e, "dataPoint") ?? (e.classicChartStyleRoles == null ? l : void 0) : T(e, "dataPointMarker") ?? (e.classicChartStyleRoles == null ? l : void 0), i);
		if (u && a(u), u !== void 0 || n.color != null) continue;
		let d = o(l, i);
		d && a(d);
	}
	if (e.chartType === "waterfall") {
		let t = e.series[0], n = new Map((t?.dataPointOverrides ?? []).map((e) => [e.idx, e])), r = di(t?.values ?? [], e.categories.length, e.subtotalIndices);
		if (!r.cumulativeOverflow && r.rawMax > r.rawMin) for (let e = 0; e < r.bars.length; e++) {
			let i = r.bars[e];
			i.paintSlot && a(l(n.get(e), t, i.semanticIndex));
		}
	} else if (e.chartType === "funnel") {
		let t = e.series[0];
		(t?.values ?? []).some((e) => e != null && e > 0) && a(c(t?.chartexStyle, t?.color, e.chartexDataPointStyle, T(e, "dataPoint"), 0));
	}
	for (let t = 0; t < (e.chartexBox?.series.length ?? 0); t++) {
		let n = e.chartexBox.series[t];
		n.valuesByCategory.some((e) => nr(e, n.quartileMethod) != null) && a(c(n.chartexStyle, n.color, e.chartexDataPointStyle, T(e, "dataPoint"), n.chartexFormatIdx ?? t));
	}
	let O = e.series[0];
	return li(e, ({ node: t, paintsBody: n }) => {
		n && a(c(O?.chartexStyle, O?.color, e.chartexDataPointStyle, T(e, "dataPoint"), t.branchIndex));
	}), ui(e, ({ label: t, linkedStyleIndex: n }) => {
		let r = t.labelBox, i = Y(r), o = i ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, s = ii(r, o, i ? T(e, "dataLabelCallout") ?? T(e, "dataLabel") : T(e, "dataLabel"), o != null, 0, n);
		s?.fillPaint?.fillType === "image" && a(s.fillPaint);
	}), {
		usages: r || i ? [] : [...n.values()],
		sourceLimitExceeded: r,
		usageRejected: i
	};
}
function va(e) {
	return m(() => k(() => _a(e).usages));
}
function ya(e, t) {
	return m(() => k(() => {
		let n = /* @__PURE__ */ new Map();
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = _a(i, t ? (e) => t(e, r) : void 0);
			if (!a.usageRejected) {
				if (a.sourceLimitExceeded) return [];
				for (let e of a.usages) {
					let t = na(e.fill), r = n.get(t);
					if (r) {
						n.set(t, ga(r, e));
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
function ba(t, n, r, i, a, o, s = e, c = 0) {
	if (!W(n) || !(a > 0) || !(o > 0) || !sa(n)) return !1;
	let l = Q?.(n);
	if (!l || c !== 0 && n.rotWithShape == null) return !1;
	if (t.save(), t.beginPath(), t.rect(r, i, a, o), t.clip(), n.rotWithShape === !1 && c !== 0 && (t.translate(r + a / 2, i + o / 2), t.rotate(-c * Math.PI / 180), t.translate(-(r + a / 2), -(i + o / 2))), n.alpha != null && (t.globalAlpha *= Math.max(0, Math.min(1, n.alpha))), !n.tile) {
		let e = n.fillRect, s = r + (e?.l ?? 0) * a, c = i + (e?.t ?? 0) * o, u = (1 - (e?.l ?? 0) - (e?.r ?? 0)) * a, d = (1 - (e?.t ?? 0) - (e?.b ?? 0)) * o;
		return u > 0 && d > 0 && En(t, l, n.srcRect, s, c, u, d), t.restore(), u > 0 && d > 0;
	}
	let u = fa(n, l, a, o, s);
	if (!u || u.repetitions > 4096) return t.restore(), !1;
	let { tileW: d, tileH: f, flipX: p, flipY: m, columns: h, rows: g } = u, _ = da(u, a, o), v = r + _.x, y = i + _.y, b = Math.floor((r - v) / d) - 1, x = Math.floor((i - y) / f) - 1;
	for (let e = x; e < x + g; e++) for (let r = b; r < b + h; r++) {
		let i = v + r * d, a = y + e * f, o = p && Math.abs(r) % 2 == 1, s = m && Math.abs(e) % 2 == 1;
		t.save(), t.translate(i + (o ? d : 0), a + (s ? f : 0)), t.scale(o ? -1 : 1, s ? -1 : 1), En(t, l, n.srcRect, 0, 0, d, f), t.restore();
	}
	return t.restore(), !0;
}
//#endregion
//#region packages/core/src/chart/plot-area-frame.ts
function xa(e, t, r, i, a, o, s, c = 0) {
	Mr(e, t.plotAreaStyle, t.threeD ? t.chartStyleRoles?.plotArea3D : t.chartStyleRoles?.plotArea, 0, {
		x: r,
		y: i,
		w: a,
		h: o
	}, s, (e) => {
		if (t.plotAreaFillHidden !== !0) if (t.plotAreaFill?.fillType === "image") ba(e, t.plotAreaFill, r, i, a, o, s, c);
		else {
			let n = t.plotAreaFill ? G(t.plotAreaFill, e, r, i, a, o, c) : t.plotAreaBg ? `#${t.plotAreaBg}` : null;
			n && (e.fillStyle = n, e.fillRect(r, i, a, o));
		}
		if (t.plotAreaLineHidden === !0 || !t.plotAreaLineFill && !t.plotAreaLineColor) return;
		let l = t.plotAreaLineWidthEmu ? Math.max(.5, t.plotAreaLineWidthEmu / n) * s : 1;
		e.save();
		let u = t.plotAreaLineFill ? G(t.plotAreaLineFill, e, r, i, a, o, c) : t.plotAreaLineColor ? `#${t.plotAreaLineColor}` : null;
		u && (e.strokeStyle = u, e.setLineDash(Bn(t.plotAreaLineCustomDash, t.plotAreaLineDash, l)), e.lineCap = t.plotAreaLineCap === "rnd" ? "round" : t.plotAreaLineCap === "sq" ? "square" : "butt", e.lineJoin = t.plotAreaLineJoin === "round" || t.plotAreaLineJoin === "bevel" ? t.plotAreaLineJoin : "miter", zi(e, r, i, a, o, l, t.plotAreaLineCompound)), e.restore();
	});
}
//#endregion
export { J as $, ce as $n, gt as $t, wi as A, Me as An, Sn as At, oi as B, ge as Bn, yt as Bt, Ei as C, Oe as Cn, En as Ct, pi as D, Le as Dn, en as Dt, mi as E, ke as En, Dn as Et, ui as F, Te as Fn, Bt as Ft, Gr as G, ye as Gn, Et as Gt, Jr as H, me as Hn, L as Ht, ci as I, We as In, Rt as It, Vr as J, ue as Jn, Dt as Jt, Hr as K, pe as Kn, Ct as Kt, Y as L, be as Ln, Lt, Ci as M, Ee as Mn, Gt as Mt, di as N, He as Nn, Ut as Nt, fi as O, Re as On, Qt as Ot, li as P, Se as Pn, z as Pt, Ir as Q, P as Qn, _t as Qt, ii as R, Ue as Rn, Ft as Rt, Di as S, Ve as Sn, Tn as St, X as T, Ae as Tn, On as Tt, Kr as U, _e as Un, xt as Ut, ei as V, ve as Vn, R as Vt, qr as W, he as Wn, St as Wt, Nr as X, N as Xn, bt as Xt, Pr as Y, j as Yn, jt as Yt, Fr as Z, se as Zn, wt as Zt, Ii as _, it as _n, Pn as _t, ma as a, pt as an, de as ar, mr as at, Mi as b, $e as bn, Un as bt, va as c, dt as cn, v as cr, ar as ct, ra as d, st as dn, y as dr, rr as dt, Tt as en, F as er, Mr as et, ea as f, tt as fn, C as fr, nr as ft, Ni as g, ot as gn, G as gt, zi as h, et as hn, w as hr, U as ht, la as i, lt as in, ae as ir, dr as it, Si as j, De as jn, xn as jt, bi as k, ze as kn, Zt as kt, ya as l, ct as ln, g as lr, sr as lt, Vi as m, I as mn, m as mr, Jn as mt, na as n, kt as nn, ne as nr, yr as nt, ua as o, ft as on, k as or, pr as ot, Qi as p, nt as pn, T as pr, Zn as pt, Br as q, fe as qn, Ot as qt, pa as r, vt as rn, le as rr, fr as rt, da as s, mt as sn, D as sr, or as st, xa as t, At as tn, M as tr, Ar as tt, ba as u, ht as un, E as ur, ir as ut, Pi as v, at as vn, Bn as vt, Oi as w, je as wn, wn as wt, Ti as x, Je as xn, In as xt, Fi as y, Qe as yn, Rn as yt, ai as z, Be as zn, It as zt };
