import { $ as e, $i as t, $r as n, $t as r, A as i, Ai as a, Ar as o, At as s, B as c, Bi as l, Br as u, Bt as d, C as f, Cr as p, Ct as m, D as h, Di as g, Dn as _, Dr as v, Dt as y, E as b, Ei as x, En as S, Er as C, Et as w, F as T, Fi as E, Fr as D, Ft as O, G as k, Gi as A, Gr as j, H as M, Hi as ee, Hr as N, I as te, Ii as P, Ir as ne, It as F, J as re, Ji as ie, Jr as I, K as ae, Ki as oe, Kn as L, Kr as R, L as se, Li as ce, Ln as le, Lr as ue, Lt as de, M as fe, Mi as z, Mr as B, N as pe, Ni as V, Nr as me, O as he, Oi as ge, On as _e, Or as ve, Ot as ye, P as be, Pi as xe, Pr as Se, Pt as Ce, Q as we, Qi as H, Qr as Te, Qt as Ee, R as De, Ri as Oe, Rr as ke, Rt as Ae, S as je, Si as Me, Sr as Ne, St as Pe, T as Fe, Ti as Ie, Tr as Le, Tt as Re, U as ze, Ui as Be, Ur as Ve, V as He, Vi as Ue, Vn as We, Vr as Ge, Vt as U, W as Ke, Wi as qe, Wn as Je, Wr as Ye, X as Xe, Xi as Ze, Xn as Qe, Xr as $e, Xt as et, Y as tt, Yi as W, Yr as nt, Yt as G, Z as rt, Zi as it, Zr as K, Zt as q, _ as at, _i as ot, _t as J, ai as st, at as ct, b as lt, bi as ut, br as dt, cn as ft, ct as Y, d as pt, di as mt, dn as ht, dt as gt, ea as _t, ei as vt, en as yt, er as bt, et as xt, fi as St, fn as Ct, ft as wt, g as Tt, gi as Et, gt as Dt, h as Ot, hi as kt, ht as At, i as jt, ii as Mt, in as Nt, it as Pt, j as Ft, ji as It, jr as Lt, jt as Rt, k as zt, ki as Bt, kn as Vt, kr as Ht, kt as Ut, ln as Wt, lt as Gt, mi as Kt, mt as qt, na as Jt, ni as Yt, nt as Xt, oi as Zt, ot as Qt, pi as $t, pn as en, pt as tn, q as nn, qr as rn, qt as an, r as on, rt as sn, si as cn, sn as ln, st as un, t as dn, ta as fn, ti as pn, tr as mn, tt as hn, u as gn, ui as _n, un as vn, ut as yn, v as bn, vt as xn, w as Sn, wi as Cn, wr as wn, wt as Tn, x as En, xi as Dn, xr as On, xt as kn, y as An, yi as jn, yr as Mn, z as Nn, zi as Pn, zr as Fn, zt as In } from "./plot-area-frame-DvwuejI0.js";
import { a as Ln, r as Rn } from "./units-DIk-8W6L.js";
import { _ as zn, a as Bn, d as Vn, f as Hn, i as Un, l as Wn, n as X, o as Z, p as Q, u as $, v as Gn } from "./three-d-DzM4SQVr.js";
//#region packages/core/src/chart/classic-paint-work.ts
var Kn = 7;
function qn(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.dataPointOverrides ?? []) t.has(n.idx) || t.set(n.idx, n);
	return t;
}
function Jn(e, t) {
	return e.chartexFormatIdx ?? t;
}
function Yn(e) {
	return e != null && Number.isFinite(e) && e !== 0;
}
function Xn(e) {
	return e === "line" || e === "stackedLine" || e === "stackedLinePct" || e === "scatter" || e === "radar" || e === "stock";
}
function Zn(e, t, n = 4 / 3, r, i = !1) {
	if (i || e.series.length === 0) return null;
	let o = On(e), s = N(e), c = j(e, !0), l = e.series.some((t, n) => Ne(e.chartType, o[n]) === "scatter" && (t.categories ?? e.categories).some((e) => Number.isFinite(Number.parseFloat(e)))), u = e.dataTable?.showKeys === !0 && wn(e.chartType) && (e.categories.length > 0 || e.series.some((e) => (e.categories?.length ?? e.values.length) > 0)), d = 0, f = (e, i = r?.w ?? 1, a = r?.h ?? 1) => {
		if (e == null) return !0;
		let o = e.fillType === "image" ? on(e, t, i, a, n) : B(e);
		return e.fillType === "gradient" && o > 4096 || o > 1048576 - d ? !1 : (d += o, !0);
	}, p = (t, n, i, o, s = "dataPoint", c = s === "dataPoint", l = r?.w ?? 1, u = r?.h ?? 1) => (!c || f(a(e, t, n, i, o), l, u)) && f(It(e, s, t, n, i).paint, l, u), m = (t, r, i, a, o) => {
		let s = ot(e.dataTable?.fontSizeHpt, n) ?? 9 * n, c = ot(t.seriesDataLabels?.fontSizeHpt ?? e.dataLabelFontSizeHpt, n) ?? 10 * n;
		for (let e of t.dataLabelOverrides ?? []) c = Math.max(c, ot(e.fontSizeHpt, n) ?? c);
		let l = a === "table" ? s : a === "label" ? c : ot(e.legendFontSizeHpt, n) ?? 10 * n;
		if (a === "table") return {
			width: Math.max(12 * n, l * 1.7),
			height: l
		};
		if (o !== "dataPointLine") {
			let e = Kn * n;
			return {
				width: e,
				height: e
			};
		}
		let u = It(e, o, t, r, i), d = Ae(u.widthEmu, n), f = mn(u.dash ?? "solid", d), p = f.length > 0 ? f.reduce((e, t) => e + t, 0) + f[0] : 0;
		return {
			width: Math.max(l * 1.6, p),
			height: l
		};
	};
	for (let t = 0; t < e.series.length; t++) {
		let n = e.series[t], i = o[t], a = Ne(n.seriesType ?? e.chartType, i);
		i?.kind === "bar3D" || i?.kind === "area3D" || i?.kind === "line3D" ? a = e.chartType : i?.kind === "pie3D" && (a = "pie");
		let d = qn(n), f = it(e, t), h = Jn(n, t), g = (e) => f ? e : h, _ = i?.kind === "bar" || i?.kind === "bar3D" || i == null && (a === "clusteredBar" || a === "clusteredBarH" || a === "stackedBar" || a === "stackedBarH" || a === "stackedBarPct" || a === "stackedBarHPct"), y = i?.kind === "pie" || i?.kind === "pie3D" || i?.kind === "doughnut" || i?.kind === "ofPie" || i == null && (a === "pie" || a === "doughnut" || a === "ofPie"), b = i?.kind === "area" || i?.kind === "area3D" || i == null && (a === "area" || a === "stackedArea" || a === "stackedAreaPct"), x = a === "radar" && (i?.radarStyle ?? e.radarStyle) === "filled";
		if (_ || y) {
			let t = Math.max(1, n.values.length, e.categories.length), o = i?.barDirection === "bar" || a.endsWith("BarH") || a.endsWith("BarHPct"), s = _ && !o ? (r?.w ?? 1) / t : r?.w ?? 1, c = _ && o ? (r?.h ?? 1) / t : r?.h ?? 1;
			for (let e = 0; e < n.values.length; e++) if (Yn(n.values[e]) && !p(n, d.get(e), g(e), e, "dataPoint", !0, s, c)) return G + 1;
			if (a === "ofPie") {
				let t = Mn(e.ofPie, n.values), i = t == null ? void 0 : [...t].find((e) => Yn(n.values[e]));
				if (i != null && !p(n, d.get(i), g(i), i, "dataPoint", !0, r?.w ?? 1, r?.h ?? 1)) return G + 1;
			}
		} else if ((b || x) && (x ? n.values.length >= 3 && n.values.every((e) => e != null && Number.isFinite(e)) : n.values.length > 0) && !p(n, void 0, h, void 0)) return G + 1;
		let S = i?.kind === "bubble" || i == null && e.chartType === "bubble", w = a !== "scatter" || !S;
		if (Xn(a) && !x && w) {
			if (f && a !== "stock") {
				let t = a === "stackedLine" || a === "stackedLinePct" || i?.kind === "line" && (i.grouping === "stacked" || i.grouping === "percentStacked") || a === "line" && e.dispBlanksAs === "zero", r = !t && e.dispBlanksAs === "span", o = [], s = () => {
					for (let e = 1; e < o.length; e++) {
						let t = o[e];
						if (!p(n, d.get(t), t, t, "dataPointLine", !1)) return !1;
					}
					if (a === "radar" && o.length > 1) {
						let e = o[0];
						if (!p(n, d.get(e), e, e, "dataPointLine", !1)) return !1;
					}
					return o = [], !0;
				};
				for (let e = 0; e < n.values.length; e++) {
					if (n.sourceHidden?.[e] === !0) {
						if (!s()) return G + 1;
						continue;
					}
					let i = n.values[e];
					if (i != null && Number.isFinite(i) || t) o.push(e);
					else if (!r && !s()) return G + 1;
				}
				if (!s()) return G + 1;
			} else if (!p(n, void 0, h, void 0, "dataPointLine", !1)) return G + 1;
		}
		let T = y || f, E = v(e, n, a, Math.max(n.values.length, n.categories?.length ?? 0, e.categories.length), l, {
			chartType: Ne(e.chartType, i),
			bubbleScale: i?.bubbleScale ?? e.bubbleScale,
			showNegativeBubbles: i?.showNegativeBubbles ?? e.showNegativeBubbles
		}, t), D = rn(c, s, t);
		if (a !== "bubble" && (e.showLegend && D || u || E > 0)) {
			let r = Xn(a) ? "dataPointLine" : "dataPoint", o = r === "dataPoint", f = (e, t, i, a) => {
				let s = m(n, t, i, e, r);
				return p(n, t, i, a, r, o, s.width, s.height);
			};
			if (T) {
				let r = Math.max(n.values.length, n.categories?.length ?? 0, e.categories.length), o = new Map((n.dataLabelOverrides ?? []).map((e) => [e.idx, e]));
				for (let u = 0; u < r; u++) {
					let r = g(u), p = d.get(u), m = o.get(u), h = !K(n.seriesDataLabels, m) && (m?.showLegendKey ?? n.seriesDataLabels?.showLegendKey ?? !1) === !0 && C(e, n, a, u, l, {
						chartType: Ne(e.chartType, i),
						bubbleScale: i?.bubbleScale ?? e.bubbleScale,
						showNegativeBubbles: i?.showNegativeBubbles ?? e.showNegativeBubbles
					});
					if (e.showLegend && Ye(c, s, t, u) && !f("legend", p, r, u) || h && !f("label", p, r, u)) return G + 1;
				}
				let p = d.get(0);
				if (u && !f("table", p, g(0), 0)) return G + 1;
			} else {
				if (e.showLegend && D && !f("legend", void 0, h, void 0) || u && !f("table", void 0, h, void 0)) return G + 1;
				for (let e = 0; e < E; e++) if (!f("label", void 0, h, void 0)) return G + 1;
			}
		}
	}
	let h = (t, n) => {
		let i = t[0], a = t.at(-1);
		if (!i || !a) return !0;
		let o = Math.max(i.values.length, a.values.length);
		for (let t = 0; t < o; t++) {
			let s = i.values[t], c = a.values[t];
			if (s == null || c == null || !Number.isFinite(s) || !Number.isFinite(c) || s === c) continue;
			let l = c > s ? "upBar" : "downBar", u = c > s ? n.up : n.down, d = e.chartType.endsWith("BarH") || e.chartType.endsWith("BarHPct"), p = d ? r?.w ?? 1 : (r?.w ?? 1) / o, m = d ? (r?.h ?? 1) / o : r?.h ?? 1;
			if (!f(xe(e, u, l), p, m)) return !1;
		}
		return !0;
	};
	for (let t of e.lineGroupDecorations ?? []) {
		if (!t.upDownBars) continue;
		let n = e.series.filter((e) => e.lineGroupIndex === t.groupIndex);
		if (n.length === 0 && t.groupIndex === 0 && (n = e.series), !h(n, t.upDownBars)) return G + 1;
	}
	if (e.stockUpDownBars) {
		let t = e.plotGroups?.find((e) => e.kind === "stock");
		if (!h(t ? e.series.slice(t.seriesStart, t.seriesStart + t.seriesCount) : e.series, e.stockUpDownBarStyle ?? {
			gapWidthPercent: 150,
			up: {},
			down: {}
		})) return G + 1;
	}
	return d;
}
function Qn(e, t, n = 4 / 3, r, i = !1) {
	return fn(() => A(() => Zn(e, t, n, r, i)));
}
//#endregion
//#region packages/core/src/chart/shared/paint-limits.ts
var $n = et, er = G, tr = $n, nr = er, rr = new Set([
	"pie",
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
	"stackedBarHPct"
]);
//#endregion
//#region packages/core/src/chart/shared/chartex-style.ts
function ir(e, t, n, r, i) {
	return E(t, n, r);
}
function ar(e, t, n, r) {
	if (!t.length) return null;
	let i = e.chartexColorStyleMethod;
	return i === "withinLinear" || i === "acrossLinear" || i === "withinLinearReversed" || i === "acrossLinearReversed" ? t[i === "withinLinear" || i === "withinLinearReversed" ? 0 : n % t.length] ?? null : t[n % t.length] ?? null;
}
function or(e, t, n) {
	return (e.chartexColorPalette ? ar(e, e.chartexColorPalette, t, n) : null) ?? e.chartexAccents?.[t % (e.chartexAccents.length || 1)] ?? m[t % m.length];
}
function sr(e, t, n, r) {
	return ir(e, r, "fill", t, n) ?? ir(e, e.chartexDataPointStyle, "fill", t, n) ?? or(e, t, n);
}
function cr(e, t, n, r) {
	return Be(t, n);
}
function lr(e, t, n, r) {
	return Ue(t, n);
}
function ur(e, t, n, r, i, a) {
	let o = a === e.chartexDataPointMarkerStyle ? "dataPointMarker" : a === e.chartexDataPointStyle ? "dataPoint" : Object.entries(e.chartStyleRoles ?? {}).find(([, e]) => e === a)?.[0], s = P(r, o ? _t(e, o) ?? (e.classicChartStyleRoles == null ? a : void 0) : a, t);
	if (s !== void 0) return s;
	if (i) return {
		fillType: "solid",
		color: i
	};
	let c = lr(e, a, t, n);
	return c === void 0 ? {
		fillType: "solid",
		color: or(e, t, n)
	} : c;
}
function dr(e, t, n, r, i, a = e.chartexDataPointStyle) {
	let o = Ue(r, t);
	if (o !== void 0) return o;
	if (r && i || i) return {
		fillType: "solid",
		color: i
	};
	let s = Ue(a, t);
	return s === void 0 ? {
		fillType: "solid",
		color: or(e, t, n)
	} : s;
}
function fr(e, t, n, r, i, a, o, s = 0) {
	return t.fillType === "solid" ? t.color.startsWith("#") ? t.color : `#${t.color}` : L(t, e, n, r, i, a, s) ?? o;
}
function pr(e, t, n, r, i, a = 0) {
	if (t === null) return !1;
	if (t?.fillType === "image") {
		e.save(), e.clip();
		let r = gn(e, t, n.x, n.y, n.w, n.h, i, a);
		return e.restore(), r;
	}
	return e.fillStyle = t ? fr(e, t, n.x, n.y, n.w, n.h, r, a) : r, e.fill(), !0;
}
function mr(e, t, n, r, i, a = 0) {
	return t === null || !(n.w > 0) || !(n.h > 0) ? !1 : t?.fillType === "image" ? (e.beginPath(), e.rect(n.x, n.y, n.w, n.h), pr(e, t, n, r, i, a)) : (e.fillStyle = t ? fr(e, t, n.x, n.y, n.w, n.h, r, a) : r, e.fillRect(n.x, n.y, n.w, n.h), !0);
}
function hr(e, t, n, r, i, a, o = {}) {
	let s = n?.chartexStyle, c = Be(s, r), l = n?.lineHidden === !0 ? null : void 0, u = n?.lineColor != null || l !== void 0, d = Be(t, r), f = c === void 0 ? u ? l === void 0 ? {
		fillType: "solid",
		color: n?.lineColor ?? a
	} : l : d === void 0 ? void 0 : d : c, p = f === void 0 && t?.lineNoStyle === !0 && o.linkedNoStyleFallback !== !0;
	return {
		semanticFallback: f === void 0,
		visible: f !== null && !p,
		color: f?.fillType === "solid" ? f.color : a,
		paint: f?.fillType === "solid" ? void 0 : f,
		widthEmu: s?.lineWidthEmu ?? n?.lineWidthEmu ?? t?.lineWidthEmu ?? null,
		dash: s?.lineCustomDash == null ? s?.lineDash ?? t?.lineDash ?? null : null,
		customDash: s?.lineCustomDash ?? t?.lineCustomDash ?? null,
		cap: s?.lineCap ?? t?.lineCap ?? null,
		join: s?.lineJoin ?? t?.lineJoin ?? null
	};
}
var gr = 9525;
function _r(e, t, n, r, i, a = e.chartexDataPointStyle) {
	let o = V(e, t, n, r, a);
	return o === void 0 ? {
		fillType: "solid",
		color: or(e, r, i)
	} : o;
}
function vr(e) {
	return e.paint != null && e.paint.fillType !== "solid";
}
function yr(e, t) {
	let n = e?.chartexStyle, r = Be(n, t);
	return !e || !r || r.fillType === "solid" ? e : {
		...e,
		lineColor: null,
		lineHidden: null,
		chartexStyle: {
			...n,
			linePaints: null,
			lineColors: null,
			lineColorIndex: null,
			linePaintAuthored: null,
			lineHidden: null
		}
	};
}
function br(e, t, n, r, i, a, o, s = {}) {
	t = yr(t, i);
	let c = hr(e, n[0], t, i, a, o, s);
	for (let t of n.slice(1)) {
		if (!c.semanticFallback) break;
		let n = hr(e, t, null, i, a, o, s);
		n.semanticFallback || (c = n);
	}
	let l = t?.chartexStyle, u = l?.lineDash != null || l?.lineCustomDash != null, d = (c.semanticFallback ? n : r).find((e) => e != null && (e.lineWidthEmu != null || e.lineCap != null || e.lineJoin != null || e.lineDash != null || e.lineCustomDash != null || e.linePaintAuthored === !0 && e.lineNoStyle !== !0)), f = (e) => d ? e(d) ?? null : null, p = d;
	return {
		...c,
		widthEmu: l?.lineWidthEmu ?? t?.lineWidthEmu ?? f((e) => e.lineWidthEmu),
		dash: u ? l?.lineCustomDash == null ? l?.lineDash ?? null : null : p?.lineCustomDash == null ? p?.lineDash ?? null : null,
		customDash: u ? l?.lineCustomDash ?? null : p?.lineCustomDash ?? null,
		cap: l?.lineCap ?? f((e) => e.lineCap),
		join: l?.lineJoin ?? f((e) => e.lineJoin)
	};
}
function xr(e, t, n, r, i, a, o = e.chartexDataPointStyle, s = {}) {
	let c = o === e.chartexDataPointStyle ? [o, e.chartexDataPointLineStyle] : [o];
	if (n = yr(n, r), !z(n)) return br(e, t, [o], c, r, i, a, s);
	let l = n?.chartexStyle, u = t?.chartexStyle, d = l?.lineDash != null || l?.lineCustomDash != null, f = n?.lineColor != null || n?.lineHidden === !0 || l?.linePaintAuthored === !0 || l?.lineHidden === !0 || l?.linePaints?.some((e) => e != null) === !0 || l?.lineColors?.some((e) => e != null) === !0 ? {
		lineColor: n?.lineColor,
		lineHidden: n?.lineHidden,
		style: l
	} : {
		lineColor: t?.lineColor,
		lineHidden: t?.lineHidden,
		style: u
	};
	return br(e, {
		lineColor: f.lineColor,
		lineHidden: f.lineHidden,
		lineWidthEmu: n?.lineWidthEmu ?? t?.lineWidthEmu,
		chartexStyle: {
			...l,
			linePaints: f.style?.linePaints,
			lineColors: f.style?.lineColors,
			lineColorIndex: f.style?.lineColorIndex,
			linePaintAuthored: f.style?.linePaintAuthored,
			lineHidden: f.style?.lineHidden,
			lineNoStyle: f.style?.lineNoStyle,
			lineWidthEmu: l?.lineWidthEmu ?? n?.lineWidthEmu ?? u?.lineWidthEmu ?? t?.lineWidthEmu,
			lineDash: d ? l?.lineDash : u?.lineDash,
			lineCustomDash: d ? l?.lineCustomDash : u?.lineCustomDash,
			lineCap: l?.lineCap ?? u?.lineCap,
			lineJoin: l?.lineJoin ?? u?.lineJoin
		}
	}, [o], c, r, i, a, s);
}
function Sr(e, t, n, r, i = 0) {
	if (!t.visible) return !1;
	if (t.paint && t.paint.fillType !== "solid" && r) {
		let n = L(t.paint, e, r.x, r.y, r.w, r.h, i);
		if (!n) return !1;
		e.strokeStyle = n;
	} else e.strokeStyle = t.color.startsWith("#") ? t.color : `#${t.color}`;
	return e.lineWidth = t.widthEmu == null ? t.semanticFallback ? 1 : Ae(gr, n) : Ae(t.widthEmu, n), e.setLineDash(wt(t.customDash, t.dash, e.lineWidth)), e.lineCap = t.cap === "rnd" ? "round" : t.cap === "sq" ? "square" : "butt", e.lineJoin = t.join === "round" || t.join === "bevel" ? t.join : "miter", !0;
}
function Cr(e, t, n, r, i, a, o, s, c = {}) {
	return Sr(e, hr(t, n, r, i, a, o, c), s);
}
function wr(e, t, n, r, i, a, o, s = !1, c = !0, l = !1) {
	let u = br(e, n, [r], r === e.chartexDataPointStyle ? [r, e.chartexDataPointLineStyle] : [r], i, a, o, { linkedNoStyleFallback: s }), d = c && !(l && vr(u));
	return {
		...Ot(t, n ?? void 0),
		color: o.replace(/^#/, ""),
		lineHidden: !d || !u.visible,
		lineColor: d && u.visible ? u.color.replace(/^#/, "") : null,
		lineWidthEmu: d ? u.widthEmu ?? (u.visible && !u.semanticFallback ? 9525 : null) : null,
		chartexStyle: {
			linePaints: d && u.paint !== void 0 ? [u.paint] : null,
			linePaintAuthored: d && u.paint !== void 0 ? !0 : null,
			lineDash: d ? u.dash : null,
			lineCustomDash: d ? u.customDash : null,
			lineCap: d ? u.cap : null,
			lineJoin: d ? u.join : null
		}
	};
}
var Tr = .8;
function Er(e, t, n, r, i) {
	let a = e.chartexDataPointStyle, o = yr(t, n), s = xr(e, o, void 0, n, r, i, a, { linkedNoStyleFallback: !0 }), c = o != null && (o.lineColor != null || o.lineHidden === !0 || Be(o.chartexStyle, n) !== void 0), l = Be(a, n), u = Ue(a, n);
	if (c || !s.visible || s.paint != null || l?.fillType !== "solid" || u?.fillType !== "solid") return {
		line: s,
		darkened: !1
	};
	let d = (e) => e.replace(/^#/, "").toUpperCase(), f = d(l.color);
	if (!/^[0-9A-F]{6}$/.test(f) || f !== d(u.color)) return {
		line: s,
		darkened: !1
	};
	let p = (e) => Math.round(parseInt(f.slice(e, e + 2), 16) * Tr).toString(16).padStart(2, "0");
	return {
		line: {
			...s,
			color: `#${p(0)}${p(2)}${p(4)}`.toUpperCase()
		},
		darkened: !0
	};
}
//#endregion
//#region packages/core/src/chart/shared/bubble-paint.ts
function Dr(e, t, n, r) {
	return o(e, t, n, r);
}
function Or(e, t, n, r, i, a, o = p(t, n)) {
	let s = t.bubbleSizes?.[r];
	if (s != null && Number.isFinite(s) && s < 0) return t.invertedFillHidden === !0 ? {
		color: "00000000",
		paint: null
	} : t.invertedFill ? {
		color: t.invertedFill.fillType === "solid" ? t.invertedFill.color : a,
		paint: t.invertedFill
	} : o ? {
		color: "FFFFFF",
		paint: void 0
	} : {
		color: "00000000",
		paint: null
	};
	let c = _t(e, "dataPoint"), l = P(n?.chartexStyle, c, r);
	if (l !== void 0) return {
		color: l?.fillType === "solid" ? l.color : a,
		paint: l
	};
	let u = Math.max(0, Ze(e, t)), d = oe(e, "dataPoint", u), f = it(e, u) ? r : i;
	if (n?.fillHidden === !0) {
		let e = Oe(c);
		if (e !== void 0) return {
			color: "00000000",
			paint: e
		};
	}
	if (n?.color != null) return {
		color: n.color,
		paint: void 0
	};
	let m = t.dataPointColors?.[r];
	if (m != null) return {
		color: m,
		paint: void 0
	};
	let h = P(t.chartexStyle, c, i);
	if (h !== void 0) return {
		color: h?.fillType === "solid" ? h.color : a,
		paint: h
	};
	if (t.color != null) return {
		color: t.color,
		paint: void 0
	};
	let g = lr(e, d, f, t.values.length);
	return g === void 0 ? {
		color: Dr(t, n, r, a),
		paint: Lt(t, n, r)
	} : {
		color: g?.fillType === "solid" ? g.color : a,
		paint: g
	};
}
function kr(e, t, n, r, i) {
	let a = n?.chartexStyle, o = t.chartexStyle, s = Math.max(0, Ze(e, t)), c = oe(e, "dataPoint", s), l = _t(e, "dataPoint"), u = it(e, s) ? r : i, d = c, f = [
		a,
		o,
		d
	], m = n?.lineDash, h;
	if (m == null) {
		for (let e of f) if (e?.lineDash != null || e?.lineCustomDash != null || e?.lineDashAuthored === !0) {
			m = e.lineDash, h = e.lineCustomDash ?? void 0;
			break;
		}
	}
	let g = {
		widthEmu: n?.lineWidthEmu ?? a?.lineWidthEmu ?? t.lineWidthEmu ?? o?.lineWidthEmu ?? d?.lineWidthEmu ?? n?.markerLineWidthEmu ?? t.markerLineWidthEmu,
		dash: m,
		customDash: h,
		cap: a?.lineCap ?? o?.lineCap ?? d?.lineCap,
		join: a?.lineJoin ?? o?.lineJoin ?? d?.lineJoin
	}, _ = ce(a, l, r);
	if (_ !== void 0) return {
		color: _?.fillType === "solid" ? _.color : n?.lineColor ?? null,
		paint: _,
		...g
	};
	if (n?.lineHidden === !0) {
		let e = Pn(l);
		if (e !== void 0) return {
			color: null,
			paint: e,
			...g
		};
	}
	if (n?.lineColor != null) return {
		color: n.lineColor,
		paint: void 0,
		...g
	};
	let v = ce(o, l, i);
	if (v !== void 0) return {
		color: v?.fillType === "solid" ? v.color : t.lineColor ?? null,
		paint: v,
		...g
	};
	if (t.lineHidden === !0) {
		let e = Pn(l);
		if (e !== void 0) return {
			color: null,
			paint: e,
			...g
		};
	}
	if (t.lineColor != null) return {
		color: t.lineColor,
		paint: void 0,
		...g
	};
	let y = cr(e, c, u, t.values.length);
	if (y !== void 0) return {
		color: y?.fillType === "solid" ? y.color : null,
		paint: y,
		...g
	};
	let b = t.bubbleSizes?.[r], x = b != null && Number.isFinite(b) && b < 0 && p(t, n) ? "000000" : null;
	return {
		color: n?.markerLine ?? t.markerLine ?? t.lineColor ?? x,
		paint: void 0,
		...g
	};
}
//#endregion
//#region packages/core/src/chart/shared/markers.ts
function Ar(e, t, n, r) {
	let i = e.globalCompositeOperation, a = e.fillStyle;
	e.save(), e.clip();
	let o = (i) => {
		e.globalCompositeOperation = "source-atop", e.fillStyle = i, e.fillRect(t - r / 2, n - r / 2, r, r);
	}, s = t - r * .08, c = n - r * .17, l = e.createRadialGradient(s, c, 0, s, c, r * .55);
	l.addColorStop(0, "rgba(255,255,255,0.72)"), l.addColorStop(.14, "rgba(255,255,255,0.48)"), l.addColorStop(.38, "rgba(255,255,255,0.1)"), l.addColorStop(1, "rgba(255,255,255,0)"), o(l);
	let u = t - r * .08, d = n - r * .18, f = e.createRadialGradient(u, d, 0, u, d, r * .78);
	f.addColorStop(0, "rgba(0,0,0,0)"), f.addColorStop(.3, "rgba(0,0,0,0)"), f.addColorStop(.46, "rgba(0,0,0,0.22)"), f.addColorStop(.66, "rgba(0,0,0,0.48)"), f.addColorStop(1, "rgba(0,0,0,0.62)"), o(f);
	let p = t - r * .2, m = n - r * .45, h = e.createRadialGradient(p, m, 0, p, m, r);
	h.addColorStop(0, "rgba(255,255,255,0)"), h.addColorStop(.76, "rgba(255,255,255,0)"), h.addColorStop(.82, "rgba(255,255,255,0.05)"), h.addColorStop(.87, "rgba(255,255,255,0.12)"), h.addColorStop(.95, "rgba(255,255,255,0.28)"), h.addColorStop(1, "rgba(255,255,255,0)"), o(h), e.globalCompositeOperation = i, e.fillStyle = a, e.restore();
}
function jr(e, t, n, r, i, a, o, s, c, u, d, f, p, m, h, g = void 0, _ = void 0, v = void 0, y = void 0, b = void 0, x = !1, C = !1) {
	let w = C ? S(r?.chartexStyle) : S(r?.markerStyle, r?.chartexStyle), T = S(C ? n.chartexStyle : n.markerStyle), E = w ?? T, D = Math.max(0, Ze(t, n)), O = n.chartexFormatIdx ?? D, k = it(t, D), A = w ? i : O, j = oe(t, "dataPointMarker", D), M = _t(t, "dataPointMarker"), N = k ? i : O, te = P(r?.markerStyle, M, i), ne = P(n.markerStyle, M, O), F = te !== void 0 || r?.markerFill != null || r?.markerFillPaintAuthored === !0 && r.markerStyle?.fillHidden !== !0, re = ne !== void 0 || n.markerFill != null || n.markerFillPaintAuthored === !0 && n.markerStyle?.fillHidden !== !0, ie = u, I = m;
	if (!C && !F && !re) {
		let e = l(j, M, N, r?.markerStyle?.shapePropertiesPresent === !0 ? r.markerStyle : n.markerStyle);
		e === null ? (ie = "00000000", I = null) : e?.fillType === "solid" ? (ie = e.color, I = void 0) : e !== void 0 && (I = e);
	}
	let ae = ce(r?.markerStyle, M, i), L = ce(n.markerStyle, M, O), R = d, se = g;
	if (!C && se === void 0) if (ae !== void 0) se = ae?.fillType === "solid" ? void 0 : ae;
	else if (r?.markerLine != null) se = void 0;
	else if (r?.markerLinePaintAuthored === !0 && r.markerStyle?.lineHidden !== !0 && (r.markerLine == null || r.markerLine === "00000000")) se = null;
	else if (L !== void 0) se = L?.fillType === "solid" ? void 0 : L;
	else if (n.markerLine != null) se = void 0;
	else if (n.markerLinePaintAuthored === !0 && n.markerStyle?.lineHidden !== !0 && (n.markerLine == null || n.markerLine === "00000000")) se = null;
	else {
		let e = ee(j, M, N, r?.markerStyle?.shapePropertiesPresent === !0 ? r.markerStyle : n.markerStyle);
		e?.fillType === "solid" ? (R = e.color, se = void 0) : (se = e, e === null && (R = null));
	}
	let le = C ? void 0 : j, ue = p ?? (() => {
		let e = r?.markerStyle?.lineWidthEmu ?? n.markerStyle?.lineWidthEmu ?? le?.lineWidthEmu;
		return e == null ? void 0 : Ae(e, f);
	})(), de = H(_ != null || v != null ? {
		lineDash: _,
		lineCustomDash: v,
		lineDashAuthored: !0
	} : void 0, r?.markerStyle, n.markerStyle, le), fe = de?.lineDash, z = de?.lineCustomDash, B = y ?? r?.markerStyle?.lineCap ?? n.markerStyle?.lineCap ?? le?.lineCap, pe = b ?? r?.markerStyle?.lineJoin ?? n.markerStyle?.lineJoin ?? le?.lineJoin, V = C ? oe(t, x ? "dataPoint3D" : "dataPoint", D) : j, me = C && it(t, D) || k ? i : O;
	Nr(e, a, o, s, c, ie, R, f, ue, I, h, se, fe, z, B, pe, x, E, V, A, me);
}
function Mr(e, t, n = Math.max(0, Ze(e, t))) {
	return ne(t) || oe(e, "dataPointMarker", n) != null;
}
function Nr(e, t, n, r, i, a, o, s, c = 1, l = void 0, u = 0, d = void 0, f = void 0, p = void 0, m = void 0, h = void 0, g = !1, v = void 0, y = void 0, b = 0, x = b) {
	let S = Math.max(2, i * s), C = S / 2;
	if (v !== void 0 || y !== void 0) {
		_(e, v, y, b, {
			x: t - C,
			y: n - C,
			w: S,
			h: S
		}, s, (e) => Nr(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g), x);
		return;
	}
	let w = a.startsWith("#") ? a : `#${a}`, T = o ? o.startsWith("#") ? o : `#${o}` : null;
	e.save(), e.fillStyle = l === void 0 ? w : l == null ? "rgba(0,0,0,0)" : L(l, e, t - C, n - C, S, S, u) ?? "rgba(0,0,0,0)";
	let E = d === void 0 ? T : d == null ? null : L(d, e, t - C, n - C, S, S, u), D = E != null;
	E && (e.strokeStyle = E, e.lineWidth = c, e.setLineDash(wt(p, f, c)), e.lineCap = m === "rnd" ? "round" : m === "sq" ? "square" : "butt", e.lineJoin = h === "round" || h === "bevel" ? h : "miter");
	let O = l?.fillType === "image" ? l : void 0, k = () => {
		if (!O) {
			l !== null && e.fill();
			return;
		}
		e.save(), e.clip(), gn(e, O, t - C, n - C, S, S, s, u), e.restore();
	}, A = () => {
		g && l !== null && Ar(e, t, n, S);
	};
	switch (r) {
		case "square":
			O || g ? (e.beginPath(), e.rect(t - C, n - C, S, S), k(), A()) : l !== null && e.fillRect(t - C, n - C, S, S), D && e.strokeRect(t - C, n - C, S, S);
			break;
		case "diamond":
			e.beginPath(), e.moveTo(t, n - C), e.lineTo(t + C, n), e.lineTo(t, n + C), e.lineTo(t - C, n), e.closePath(), k(), A(), D && e.stroke();
			break;
		case "triangle":
			e.beginPath(), e.moveTo(t, n - C), e.lineTo(t + C, n + C), e.lineTo(t - C, n + C), e.closePath(), k(), A(), D && e.stroke();
			break;
		case "x":
			e.strokeStyle = E ?? e.fillStyle, e.lineWidth = Math.max(1, S * .18), e.beginPath(), e.moveTo(t - C, n - C), e.lineTo(t + C, n + C), e.moveTo(t - C, n + C), e.lineTo(t + C, n - C), e.stroke();
			break;
		case "plus":
			e.strokeStyle = E ?? e.fillStyle, e.lineWidth = Math.max(1, S * .18), e.beginPath(), e.moveTo(t - C, n), e.lineTo(t + C, n), e.moveTo(t, n - C), e.lineTo(t, n + C), e.stroke();
			break;
		case "star":
			e.beginPath();
			for (let r = 0; r < 10; r++) {
				let i = r % 2 == 0 ? C : C * .45, a = -Math.PI / 2 + r * Math.PI / 5, o = t + Math.cos(a) * i, s = n + Math.sin(a) * i;
				r === 0 ? e.moveTo(o, s) : e.lineTo(o, s);
			}
			e.closePath(), k(), A(), D && e.stroke();
			break;
		case "dot":
			e.beginPath(), e.ellipse(t, n, S * .25, S * .1, 0, 0, Math.PI * 2), k(), A(), D && e.stroke();
			break;
		case "dash": {
			let r = S * .2;
			O || g ? (e.beginPath(), e.rect(t - C, n - r / 2, S, r), k(), A()) : l !== null && e.fillRect(t - C, n - r / 2, S, r), D && e.strokeRect(t - C, n - r / 2, S, r);
			break;
		}
		case "picture":
			e.beginPath(), e.rect(t - C, n - C, S, S), O && gn(e, O, t - C, n - C, S, S, s, u), A(), D && e.strokeRect(t - C, n - C, S, S), e.restore();
			return;
		default:
			e.beginPath(), e.arc(t, n, C, 0, Math.PI * 2), k(), A(), D && e.stroke();
			break;
	}
	e.restore();
}
//#endregion
//#region packages/core/src/chart/trendline-label.ts
function Pr(e, t, n, r, i, a, o) {
	if (![
		n,
		r,
		i
	].every(Number.isFinite) || n <= 0 || r <= 0 || t.w <= 0 || t.h <= 0) return null;
	let s = Math.max(4, i * .5), c = Math.min(n, Math.max(0, t.w - s * 2)), l = Math.min(r, t.h), u = t.x + t.w * .75, d = {
		x: o ? Math.max(t.x, Math.min(t.x + t.w - c, u - c)) : Math.max(t.x, t.x + t.w - s - c),
		y: o ? Math.max(t.y, Math.min(t.y + t.h - l, o.y - l + i * .25)) : Math.min(t.y + t.h - l, t.y + s),
		w: c,
		h: l
	};
	if (a) {
		let t = Dn(a, e, d);
		if (t) return {
			...t,
			automatic: !1
		};
	}
	return {
		...d,
		automatic: !0
	};
}
//#endregion
//#region packages/core/src/chart/shared/trendline.ts
function Fr(e, t) {
	return t && t.trim().toLowerCase() !== "general" ? Ct(e, t) : ht(Number(e.toPrecision(6)));
}
function Ir(e, t, n) {
	if (e.labelText) return e.labelText.split(/\r?\n/);
	if (!t) return [];
	let r = e.labelFormatSourceLinked === !0 ? n : e.labelFormatCode, i = [];
	if (e.dispEq) {
		let e = t.intercept < 0 ? "−" : "+";
		i.push(`y = ${Fr(t.slope, r)}x ${e} ${Fr(Math.abs(t.intercept), r)}`);
	}
	return e.dispRSqr && i.push(`R² = ${Fr(t.rSquared, r)}`), i;
}
function Lr(e, t, r, i, a, o) {
	if (!a) return;
	let s = Ir(t, r, o);
	if (s.length === 0) return;
	let { chart: c, chartRect: l, plotRect: u } = a, d = ot(t.labelFontSizeHpt, i) ?? ot(c.dataLabelFontSizeHpt, i) ?? 10 * i, f = Y(c, t.labelFontFace ?? c.dataLabelFontFace, "minor"), p = t.labelFontBold ?? c.dataLabelFontBold ?? !1, m = t.labelFontItalic ?? !1;
	e.font = un(d, f, p, m);
	let h = d * 1.2, g = t.labelFontColor ?? c.dataLabelFontColor, _ = t.labelRichRuns?.length ? Gn(e, {
		runs: t.labelRichRuns,
		ptToPx: i,
		fontFamily: f,
		fallbackBold: p,
		fallbackItalic: m,
		fallbackBaseline: t.labelFontBaseline ?? void 0,
		fallbackColorHidden: t.labelFontPaintAuthored === !0 && (t.labelFontHidden === !0 || t.labelFontColor == null),
		fontFamilyForFace: (e) => Y(c, e, "minor")
	}, d, g ? `#${g}` : "#595959") : null, v = _?.width ?? Math.max(...s.map((t) => e.measureText(t).width)), y = {
		fontColor: t.labelFontColor ?? void 0,
		fontItalic: m,
		fontPaintAuthored: t.labelFontPaintAuthored ?? void 0,
		fontHidden: t.labelFontHidden ?? void 0,
		fontLanguage: t.labelFontLanguage ?? void 0,
		fontBaseline: t.labelFontBaseline ?? void 0,
		textRotation: t.labelTextRotation ?? void 0,
		textWrap: t.labelTextWrap ?? void 0,
		textVerticalAnchor: t.labelTextVerticalAnchor ?? void 0,
		textVerticalMode: t.labelTextVerticalMode ?? void 0,
		textLInsEmu: t.labelTextLInsEmu ?? void 0,
		textTInsEmu: t.labelTextTInsEmu ?? void 0,
		textRInsEmu: t.labelTextRInsEmu ?? void 0,
		textBInsEmu: t.labelTextBInsEmu ?? void 0,
		textBodyAuthored: t.labelTextBodyAuthored ?? void 0
	}, b = $e(y, i), x = v + b.left + b.right, S = (_?.height ?? s.length * h) + b.top + b.bottom, C = vt(x, S, t.labelTextRotation ?? void 0, t.labelTextVerticalMode ?? void 0), w = Pr(l, u, C.w, C.h, d, t.labelManualLayout, a.automaticAnchor);
	if (!w) return;
	e.save(), w.automatic && (e.beginPath(), e.rect(u.x, u.y, u.w, u.h), e.clip());
	let T = w.x + w.w / 2, E = w.y + w.h / 2, D = t.labelTextBodyAuthored === !0 || t.labelTextRotation != null || t.labelTextWrap != null || t.labelTextVerticalAnchor != null || t.labelTextVerticalMode != null || t.labelTextLInsEmu != null || t.labelTextTInsEmu != null || t.labelTextRInsEmu != null || t.labelTextBInsEmu != null, O = w.automatic ? {
		x: T - x / 2,
		y: E - S / 2,
		w: x,
		h: S
	} : {
		x: w.x,
		y: w.y,
		w: w.w,
		h: w.h
	}, k = t.labelBox;
	ft(e, k, O, i, a.shapeRotationDeg ?? 0);
	let A = t.labelTextAlign;
	e.textAlign = A === "r" ? "right" : A === "ctr" ? "center" : "left", e.textBaseline = "top", e.fillStyle = g ? `#${g}` : "#595959";
	let j = Math.max(0, O.w - b.left - b.right), M = Math.max(0, O.h - b.top - b.bottom), ee = w.automatic && C.radians === 0 && w.w === C.w && w.h === C.h && (t.labelTextWrap == null || t.labelTextWrap === "none"), N = _ ? [] : D && !ee ? n(s.join("\n"), j, M, h, (t) => e.measureText(t).width, y) : s;
	if (!_ && N.length === 0) {
		e.restore();
		return;
	}
	let te = D ? e.textAlign === "right" ? O.x + O.w - b.right : e.textAlign === "center" ? O.x + (O.w + b.left - b.right) / 2 : O.x + b.left : e.textAlign === "right" ? w.x + w.w : e.textAlign === "center" ? w.x + w.w / 2 : w.x, P = (t.labelFontBaseline ?? 0) * d, ne = D ? t.labelTextVerticalAnchor === "b" ? O.y + O.h - b.bottom - (_?.height ?? N.length * h) : t.labelTextVerticalAnchor === "ctr" ? O.y + (O.h - (_?.height ?? N.length * h) + b.top - b.bottom) / 2 : O.y + b.top : w.y, F = w.automatic ? N.length : Math.min(N.length, Math.floor(M / h));
	if (C.radians !== 0 && (e.translate(T, E), e.rotate(C.radians), e.translate(-T, -E)), _) zn(e, _, te, ne, e.textAlign, "top", Math.max(_.width, j));
	else if (!(t.labelFontPaintAuthored === !0 && (t.labelFontHidden === !0 || t.labelFontColor == null))) for (let t = 0; t < F; t++) e.fillText(D && y.textWrap === "none" ? N[t] : Pe(e, N[t], Math.max(0, j || v)), te, ne + t * h - P);
	e.restore();
}
function Rr(e, t, n, r, i, a, o, s, c) {
	let l = t.trendLines;
	if (!l || l.length === 0) return;
	let u = [], d = [];
	for (let e = 0; e < t.values.length; e++) {
		let n = t.values[e], r = o ? o[e] : e;
		n != null && r != null && Number.isFinite(n) && Number.isFinite(r) && (u.push(r), d.push(n));
	}
	if (u.length < 2) return;
	let f = e.getLineDash ? e.getLineDash() : [];
	for (let o of l) {
		let l = J(u, d, o.trendlineType, {
			period: o.period,
			order: o.order,
			intercept: o.intercept,
			forward: o.forward,
			backward: o.backward
		});
		if (l.xs.length < 2 || ![...l.xs, ...l.ys].every(Number.isFinite)) continue;
		let f = o.trendlineType === "linear" ? xn(u, d, o.intercept) : null, p = f && [
			f.slope,
			f.intercept,
			f.rSquared
		].every(Number.isFinite) ? f : null, m = l.xs, h = l.ys;
		if (o.trendlineType === "linear") {
			let e = (l.ys[1] - l.ys[0]) / (l.xs[1] - l.xs[0] || 1), t = o.backward ?? 0, n = o.forward ?? 0;
			m = [l.xs[0] - t, l.xs[1] + n], h = [l.ys[0] - e * t, l.ys[1] + e * n];
		}
		if (![...m, ...h].every(Number.isFinite)) continue;
		let g = m.map((e, t) => c ? c(e, h[t]) : {
			x: r(e),
			y: i(h[t])
		});
		if (g.every((e) => Number.isFinite(e.x) && Number.isFinite(e.y))) {
			if (!o.lineHidden && (o.linePaintAuthored !== !0 || o.lineColor != null)) {
				s?.clipLineToPlot && (e.save(), e.beginPath(), e.rect(s.plotRect.x, s.plotRect.y, s.plotRect.w, s.plotRect.h), e.clip()), e.strokeStyle = o.lineColor ? `#${o.lineColor}` : n, e.lineWidth = o.lineWidthEmu ? Ae(o.lineWidthEmu, a) : 1.5, e.setLineDash(tn(o.lineDash ?? void 0, e.lineWidth)), e.beginPath();
				for (let t = 0; t < g.length; t++) {
					let { x: n, y: r } = g[t];
					t === 0 ? e.moveTo(n, r) : e.lineTo(n, r);
				}
				e.stroke(), s?.clipLineToPlot && e.restore();
			}
			Lr(e, o, p, a, s ? {
				...s,
				automaticAnchor: g.at(-1)
			} : void 0, t.valFormatCode);
		}
	}
	e.setLineDash(f);
}
function zr(e) {
	let t = (e) => {
		switch (e) {
			case "exp": return "Exponential";
			case "log": return "Logarithmic";
			case "poly": return "Polynomial";
			case "power": return "Power";
			case "movingAvg": return "Moving Average";
			default: return "Linear";
		}
	}, n = [];
	for (let r of e) for (let e of r.trendLines ?? []) {
		if (e.lineHidden === !0 || e.linePaintAuthored === !0 && e.lineColor == null) continue;
		let i = r.lineColor ?? r.color;
		n.push({
			name: e.name ?? `${t(e.trendlineType)} (${r.name || "Series"})`,
			color: e.lineColor ?? i,
			lineColor: e.lineColor ?? i,
			lineWidthEmu: e.lineWidthEmu,
			lineHidden: !1,
			chartexStyle: { lineDash: e.lineDash },
			values: [],
			seriesType: "line",
			showMarker: !1
		});
	}
	return n;
}
function Br(e) {
	return R(e.chartType, e.series.length, e.varyColors !== !1) || Ge(e) ? e.series : e.series.flatMap((e) => [e, ...zr([e])]);
}
//#endregion
//#region packages/core/src/chart/shared/legend.ts
function Vr(e) {
	return e && (e === "line" || e === "stackedLine" || e === "stackedLinePct" || e === "radar" || e === "scatter" || e === "stock") ? "line" : "fill";
}
function Hr(e, t, n) {
	if (e !== "scatter") return !1;
	let r = t ?? "marker";
	return (r === "marker" || r === "line" || r === "lineMarker" || r === "lineNoMarker" || r === "smooth" || r === "smoothMarker" || r === "smoothNoMarker") && n.lineHidden !== !0;
}
function Ur(e, t, n, r, i, a) {
	let o = r[i];
	if (!o) return null;
	let s = a ? Math.max(0, Ze(a, o)) : i, c = a ? W(a, s) : void 0, l = a && c ? Ne(a.chartType, c) : o.seriesType ?? e, u = c?.scatterStyle ?? t, d = c?.radarStyle ?? n, f = c?.kind === "bubble" ? "bubble" : l, m = f === "stock", h = f === "line" || f === "stackedLine" || f === "stackedLinePct" || f === "radar" || m, g = f === "bubble", _ = f === "scatter" || g;
	if (!h && !_ || !ue(l, u, c ? {
		...o,
		seriesType: l
	} : o, d)) return null;
	let v = o.markerSymbol ?? o.automaticMarkerSymbol ?? (m ? "none" : "circle"), b = w(s, o), x = ke(o, b.replace(/^#/, "")), C = g ? !1 : _ ? Hr("scatter", u, o) : o.lineHidden !== !0;
	if (g && a) {
		let e = y(o, s), t = Or(a, o, void 0, 0, e, b), n = kr(a, o, void 0, 0, e);
		return {
			symbol: "circle",
			fill: t.color,
			fillPaint: t.paint,
			line: n.color,
			lineWidthEmu: n.widthEmu ?? null,
			linePaint: n.paint,
			lineDash: n.dash,
			lineCustomDash: n.customDash,
			lineCap: n.cap,
			lineJoin: n.join,
			bubble3D: p(o, void 0),
			withLine: !1,
			directEffect: S(o.chartexStyle),
			fallbackEffect: oe(a, p(o, void 0) ? "dataPoint3D" : "dataPoint", s),
			directEffectIndex: e,
			fallbackEffectIndex: it(a, s) ? 0 : e
		};
	}
	return a ? Gr(a, o, void 0, 0, s, f, u, d) : {
		symbol: v,
		fill: x,
		fillPaint: Fn(o),
		line: o.markerLine ?? null,
		lineWidthEmu: o.markerLineWidthEmu ?? null,
		withLine: C
	};
}
function Wr(e, t, n, r) {
	let i = Math.max(0, Ze(e, t)), a = w(i, t), o = y(t, i), s = Or(e, t, n, r, o, a), c = kr(e, t, n, r, o), l = S(n?.chartexStyle), u = S(t.chartexStyle), d = p(t, n);
	return {
		symbol: "circle",
		fill: s.color,
		fillPaint: s.paint,
		line: c.color,
		lineWidthEmu: c.widthEmu ?? null,
		linePaint: c.paint,
		lineDash: c.dash,
		lineCustomDash: c.customDash,
		lineCap: c.cap,
		lineJoin: c.join,
		bubble3D: d,
		withLine: !1,
		directEffect: l ?? u,
		fallbackEffect: oe(e, d ? "dataPoint3D" : "dataPoint", i),
		directEffectIndex: l ? r : o,
		fallbackEffectIndex: it(e, i) ? r : o
	};
}
function Gr(e, t, n, r, i, a, s, c) {
	let l = a === "line" || a === "stackedLine" || a === "stackedLinePct" || a === "radar" || a === "stock";
	if (!l && a !== "scatter") return null;
	let u = ve(t, n, "circle", ue(a, s, t, c));
	if (u === "none") return null;
	let d = w(i, t).replace(/^#/, ""), f = t.chartexFormatIdx ?? i, p = oe(e, "dataPointMarker", i), m = _t(e, "dataPointMarker"), h = it(e, i) ? r : f, g = P(n?.markerStyle, m, r), _ = P(t.markerStyle, m, f), v = g !== void 0 || n?.markerFill != null || n?.markerFillPaint !== void 0 || n?.markerFillPaintAuthored === !0 && n.markerStyle?.fillHidden !== !0, y = _ !== void 0 || t.markerFill != null || t.markerFillPaint !== void 0 || t.markerFillPaintAuthored === !0 && t.markerStyle?.fillHidden !== !0, b = n ? o(t, n, r, d) : ke(t, d), x = n ? Lt(t, n, r) : Fn(t);
	if (g === null || g === void 0 && _ === null) b = "00000000", x = null;
	else if (!v && !y) {
		let e = Ue(p, h);
		e === null ? (b = "00000000", x = null) : e?.fillType === "solid" ? (b = e.color, x = void 0) : e !== void 0 && (x = e);
	}
	let C = ce(n?.markerStyle, m, r), T = ce(t.markerStyle, m, f), E = n?.markerLine ?? t.markerLine ?? null, D;
	if (C !== void 0) C?.fillType === "solid" ? E = C.color : D = C;
	else if (n?.markerLinePaintAuthored === !0 && n.markerStyle?.lineHidden !== !0 && n.markerLine == null) D = null;
	else if (T !== void 0) T?.fillType === "solid" ? E = T.color : D = T;
	else if (t.markerLinePaintAuthored === !0 && t.markerStyle?.lineHidden !== !0 && t.markerLine == null) D = null;
	else if (n?.markerLine == null && t.markerLine == null) {
		let e = Be(p, h);
		e?.fillType === "solid" ? E = e.color : (D = e, e === null && (E = null));
	}
	let O = p, k = H(n?.markerStyle, t.markerStyle, O), A = S(n?.markerStyle, n?.chartexStyle), j = S(t.markerStyle);
	return {
		symbol: u,
		fill: b,
		fillPaint: x,
		line: E,
		linePaint: D,
		lineWidthEmu: n?.markerLineWidthEmu ?? n?.markerStyle?.lineWidthEmu ?? t.markerLineWidthEmu ?? t.markerStyle?.lineWidthEmu ?? O?.lineWidthEmu ?? null,
		lineDash: k?.lineDash,
		lineCustomDash: k?.lineCustomDash,
		lineCap: n?.markerStyle?.lineCap ?? t.markerStyle?.lineCap ?? O?.lineCap,
		lineJoin: n?.markerStyle?.lineJoin ?? t.markerStyle?.lineJoin ?? O?.lineJoin,
		withLine: l || Hr("scatter", s, t),
		directEffect: A ?? j,
		fallbackEffect: p,
		directEffectIndex: A ? r : f,
		fallbackEffectIndex: h
	};
}
function Kr(e, t, n, r, i, a, o, s = null, c = void 0, l = void 0, u = null, d = null, f = null, p = void 0, m = null, h = null, g = 1, v = 0, y, b, x = 0, S = x) {
	if (t !== "none") {
		if (s && !s.withLine) {
			Nr(e, r + a / 2, i + o / 2, s.symbol, o * .58 / g, s.fill, s.line, g, s.lineWidthEmu == null ? void 0 : Ae(s.lineWidthEmu, g), s.fillPaint, v, s.linePaint, s.lineDash, s.lineCustomDash, s.lineCap, s.lineJoin, s.bubble3D, s.directEffect, s.fallbackEffect, s.directEffectIndex, s.fallbackEffectIndex);
			return;
		}
		_(e, y, b, x, {
			x: r,
			y: i,
			w: a,
			h: o
		}, g, (e) => qr(e, t, n, r, i, a, o, c, l, u, d, f, p, m, h, g, v), S), s && Nr(e, r + a / 2, i + o / 2, s.symbol, o * .58 / g, s.fill, s.line, g, s.lineWidthEmu == null ? void 0 : Ae(s.lineWidthEmu, g), s.fillPaint, v, s.linePaint, s.lineDash, s.lineCustomDash, s.lineCap, s.lineJoin, s.bubble3D, s.directEffect, s.fallbackEffect, s.directEffectIndex, s.fallbackEffectIndex);
	}
}
function qr(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g) {
	if (e.fillStyle = n, t === "line") {
		if (!(c !== void 0 || l != null || u != null || d != null || p != null || m != null)) {
			e.strokeStyle = n;
			let t = e.lineWidth;
			e.lineWidth = Math.max(1.5, o * .15), e.beginPath();
			let s = i + o / 2;
			e.moveTo(r, s), e.lineTo(r + a, s), e.stroke(), e.lineWidth = t;
			return;
		}
		if (c === null) return;
		e.save();
		let t = c ? L(c, e, r, i, a, o, g) : l ? `#${l}` : n;
		if (!t) {
			e.restore();
			return;
		}
		e.strokeStyle = t, e.lineWidth = u == null ? Math.max(1.5, o * .15) : Ae(u, h), e.setLineDash(bt(f, d, e.lineWidth)), e.lineCap = p === "rnd" ? "round" : p === "sq" ? "square" : "butt", e.lineJoin = m === "round" || m === "bevel" ? m : "miter", e.beginPath();
		let s = i + o / 2;
		e.moveTo(r, s), e.lineTo(r + a, s), e.stroke(), e.restore();
	} else {
		mr(e, s, {
			x: r,
			y: i,
			w: a,
			h: o
		}, n, h, g);
		let t = c === null ? null : c ? L(c, e, r, i, a, o, g) : l ? `#${l}` : null;
		if (t) {
			let n = Ae(u, h);
			e.save(), e.strokeStyle = t, e.lineWidth = n, e.setLineDash(bt(f, d, e.lineWidth)), e.lineCap = p === "rnd" ? "round" : p === "sq" ? "square" : "butt", e.lineJoin = m === "round" || m === "bevel" ? m : "miter", e.strokeRect(r + n / 2, i + n / 2, Math.max(0, a - n), Math.max(0, o - n)), e.restore();
		}
	}
}
function Jr(e, t) {
	if (t.length === 0) return [...e];
	let n = /* @__PURE__ */ new Map();
	for (let e of t) n.set(e.idx, e);
	let r = [];
	for (let t = 0; t < e.length; t++) {
		let i = n.get(t);
		i?.deleted !== !0 && r.push({
			...e[t],
			textOverride: i ?? null
		});
	}
	return r;
}
function Yr(e, t, n, r = !1, i = [], o = [], c = !0, l = [], u, d) {
	let f = R(t, e.length, c);
	if (r || f) {
		let p = e[0], m = p ? p.values.length : 0, h = p?.categories ?? i, g = d && p ? Math.max(0, Ze(d, p)) : 0, _ = d ? W(d, g) : void 0, v = _?.kind === "bubble" ? "bubble" : p?.seriesType ?? t, b = _?.scatterStyle ?? n, x = _?.radarStyle ?? u, C = new Map(p?.dataPointOverrides?.map((e) => [e.idx, e]) ?? []);
		return Jr(Array.from({ length: m }, (n, i) => {
			let l = C.get(i), u = d && p ? s(d, p, g, i) : i, m = Vr(v), _ = d && p ? It(d, m === "line" ? "dataPointLine" : "dataPoint", p, l, u) : void 0, w = i < o.length ? o[i] : d && p ? a(d, p, l, u, i) : l?.fillHidden === !0 ? null : l?.color || p?.dataPointColors?.[i] ? void 0 : p?.fillPattern ?? void 0, T = (v === "bubble" && d && p ? Wr(d, p, l, i) : null) ?? (d && p ? Gr(d, p, l, i, g, v, b, x) : null), E = S(l?.chartexStyle), D = S(p?.chartexStyle), O = d && p ? oe(d, m === "line" ? "dataPointLine" : "dataPoint", g) : void 0, k = f && p ? Rt(i, p, c, 0) : li(t, e, i, r, c);
			return {
				label: (h[i] ?? `Item ${i + 1}`).toString(),
				color: w?.fillType === "solid" ? w.color.startsWith("#") ? w.color : `#${w.color}` : k,
				marker: T,
				swatchStyle: m,
				fillPaint: w,
				outlinePaint: _?.paint?.fillType === "solid" ? void 0 : _?.paint,
				outlineColor: _?.paint?.fillType === "solid" ? _.paint.color : l?.lineColor ?? p?.lineColor ?? null,
				outlineWidthEmu: _?.widthEmu ?? null,
				outlineDash: _?.dash ?? null,
				outlineCustomDash: _?.customDash,
				outlineCap: _?.cap ?? null,
				outlineJoin: _?.join ?? null,
				directEffect: E ?? D,
				fallbackEffect: O,
				directEffectIndex: E ? i : p ? y(p, g) : u,
				fallbackEffectIndex: u,
				textOverride: null
			};
		}), l);
	}
	return d && e.some((e) => {
		let t = Ze(d, e), n = W(d, t);
		return t >= 0 && n?.kind !== "pie" && n?.kind !== "pie3D" && n?.kind !== "doughnut" && n?.kind !== "ofPie" && it(d, t);
	}) ? Jr(e.flatMap((e) => {
		let r = Ze(d, e), a = W(d, r), o = a?.kind === "bubble" ? "bubble" : e.seriesType ?? t;
		return r >= 0 && a?.kind !== "pie" && a?.kind !== "pie3D" && a?.kind !== "doughnut" && a?.kind !== "ofPie" && it(d, r) ? Yr([e], o, a?.scatterStyle ?? n, !0, e.categories ?? i, [], c, [], a?.radarStyle ?? u, d) : Yr([e], o, a?.scatterStyle ?? n, !1, e.categories ?? i, [], c, [], a?.radarStyle ?? u, d);
	}), l) : Jr(e.map((r, i) => {
		let s = d ? Ze(d, r, i) : i, l = (d ? W(d, s) : void 0)?.kind === "bubble" ? "bubble" : r.seriesType ?? t, f = r.lineHidden !== !0, p = f ? r.lineColor ?? null : null, m = Ur(t, n, u, e, i, d), h = l === "stock" && !f && !m ? "none" : Vr(l), g = y(r, s >= 0 ? s : i), _ = i < o.length ? o[i] : d ? a(d, r, void 0, g) : Ue(r.chartexStyle, r.chartexFormatIdx ?? i) ?? r.fillPattern ?? void 0, v = d ? It(d, h === "line" ? "dataPointLine" : "dataPoint", r, void 0, g) : void 0, b = d ? oe(d, h === "line" ? "dataPointLine" : "dataPoint", s) : void 0;
		return {
			label: r.name || `Series ${i + 1}`,
			color: h === "line" && v?.paint?.fillType === "solid" ? v.paint.color.startsWith("#") ? v.paint.color : `#${v.paint.color}` : h === "line" && p ? `#${p}` : _?.fillType === "solid" ? _.color.startsWith("#") ? _.color : `#${_.color}` : li(t, e, i, !1, c),
			marker: m,
			swatchStyle: h,
			fillPaint: _,
			outlinePaint: v?.paint?.fillType === "solid" ? void 0 : v?.paint,
			outlineColor: v?.paint?.fillType === "solid" ? v.paint.color : p,
			outlineWidthEmu: v?.widthEmu ?? (f ? r.lineWidthEmu ?? null : null),
			outlineDash: v?.dash ?? (f ? r.chartexStyle?.lineDash ?? null : null),
			outlineCustomDash: v?.customDash,
			outlineCap: v?.cap ?? (f ? r.chartexStyle?.lineCap ?? null : null),
			outlineJoin: v?.join ?? (f ? r.chartexStyle?.lineJoin ?? null : null),
			directEffect: S(r.chartexStyle),
			fallbackEffect: b,
			directEffectIndex: g,
			fallbackEffectIndex: g,
			textOverride: null
		};
	}), l);
}
function Xr(e, t, n = 0) {
	let r = Ge(e) || R(e.chartType, e.series.length, e.varyColors !== !1), i = Yr(e.series, e.chartType, e.scatterStyle, Ge(e), e.categories, [], e.varyColors !== !1, [], e.radarStyle, e), a = j(e);
	return (o, s) => {
		let c = r || it(e, o), l = r ? s : Ve(a, o, c ? s : 0), u = l == null ? void 0 : i[l];
		return u ? {
			entry: u,
			ptToPx: t,
			shapeRotationDeg: n
		} : void 0;
	};
}
function Zr(e, t, n, r) {
	if (!n) return t;
	let i = Gt(e, n.fontFace) ?? n.fontFace;
	return {
		fontFamily: i ? `"${i}", Calibri, Arial, sans-serif` : t.fontFamily,
		color: n.fontColor ? `#${n.fontColor}` : t.color,
		bold: n.fontBold ?? t.bold,
		italic: n.fontItalic ?? t.italic,
		sizePx: ot(n.fontSizeHpt, r) ?? t.sizePx
	};
}
function Qr(e, t, n) {
	let r = ti(t, n);
	return e.font = `${t.italic ? "italic " : ""}${t.bold ? "bold " : ""}${r}px ${t.fontFamily}`, r;
}
var $r = {
	fontFamily: "sans-serif",
	color: "#333",
	bold: !1,
	italic: !1,
	sizePx: null
}, ei = .01;
function ti(e, t) {
	return e.sizePx ?? 10 * t;
}
function ni(e, t, n) {
	return e.map((e) => {
		if (e.swatchStyle === "fill") return 7 * n;
		let r = t * 1.6;
		if (e.swatchStyle !== "line" || !e.outlineDash) return r;
		let i = e.outlineWidthEmu == null ? Math.max(1.5, t * .15) : Ae(e.outlineWidthEmu, n), a = tn(e.outlineDash, i), o = a.length > 0 ? a.reduce((e, t) => e + t, 0) + a[0] : 0;
		return Math.max(r, o);
	});
}
function ri(e, t, n) {
	return e.swatchStyle === "fill" ? 7 * n : t;
}
function ii(e, t, n) {
	if (!(n > 0)) return [];
	let r = we(e, t, n);
	return r.length <= 2 ? r : [r[0], Pe(e, r.slice(1).join(" "), n)];
}
function ai(e, t, n, r, i, a) {
	if (!t.showLegend) return null;
	let o = si(t, a), s = Yr(Br(t), t.chartType, t.scatterStyle, Ge(t), t.categories, [], t.varyColors !== !1, t.legendEntries ?? [], t.radarStyle, t), c = s.map((e) => Zr(t, o, e.textOverride, a)), l = c.map((e) => ti(e, a)), u = s.map((e, t) => ni([e], l[t], a)[0]);
	e.save();
	let d = s.map((t, n) => (Qr(e, c[n], a), u[n] + 4 + e.measureText(t.label).width));
	e.restore(), t.legendPos;
	let f = kt(t, n, r, i, {
		itemWidths: d,
		rowHeight: Math.max(0, ...l) + 4,
		itemGap: 12,
		horizontalPadding: 8,
		verticalPadding: 4
	});
	return f ? {
		...f,
		measuredLabels: s.map((e) => e.label),
		entryStyles: c,
		fontSizes: l,
		swatches: u,
		itemWidths: d
	} : null;
}
function oi(e, t, n, r, i, a, o = "vertical", s, c = $r, l, u = !1, d = [], f = 1, p = [], m = 0, h = !0, g, _) {
	let v = Yr(t, s, l, u, d, p, h, g?.legendEntries ?? [], g?.radarStyle, g), y = _ != null && _.measuredLabels.length === v.length && _.measuredLabels.every((e, t) => e === v[t].label), b = y ? _.entryStyles : v.map((e) => g ? Zr(g, c, e.textOverride, f) : c), x = y ? _.fontSizes : b.map((e) => ti(e, f));
	b[0] && Qr(e, b[0], f), e.textBaseline = "middle";
	let S = Math.max(0, ...x) + 4, C = y ? _.swatches : v.map((e, t) => ni([e], x[t], f)[0]), w = y ? _.itemWidths : v.map((t, n) => (Qr(e, b[n], f), C[n] + 4 + e.measureText(t.label).width));
	if (o === "horizontal") {
		let t = ut(w, i, 12).slice(0, Math.max(0, Math.floor((a - 4) / S))), o = r + 4 / 2;
		for (let r = 0; r < t.length; r++) {
			let a = t[r], s = a.map((e) => Math.min(i, w[e])), c = s.reduce((e, t) => e + t, 0) + 12 * Math.max(0, a.length - 1), l = n + Math.max(0, (i - c) / 2), u = o + r * S + S / 2;
			for (let t = 0; t < a.length; t++) {
				let n = a[t], r = C[n], i = s[t];
				if (i < r) {
					l += i + 12;
					continue;
				}
				let o = Math.max(0, i - r - 4 + ei);
				Qr(e, b[n], f);
				let c = Pe(e, v[n].label, o), d = ri(v[n], x[n], f);
				Kr(e, v[n].swatchStyle, v[n].color, l, u - d / 2, r, d, v[n].marker, v[n].fillPaint, v[n].outlinePaint, v[n].outlineColor, v[n].outlineWidthEmu, v[n].outlineDash, v[n].outlineCustomDash, v[n].outlineCap, v[n].outlineJoin, f, m, v[n].directEffect, v[n].fallbackEffect, v[n].directEffectIndex, v[n].fallbackEffectIndex), e.fillStyle = b[n].color, e.textAlign = "left", e.fillText(c, l + r + 4, u), l += i + 12;
			}
		}
		return;
	}
	let T = i - Math.max(...C, 0) - 4, E = !u && !R(s, t.length, h), D = v.map((t, n) => (Qr(e, b[n], f), E ? ii(e, t.label, T) : [Pe(e, t.label, T)])), O = D.map((e, t) => e.length * x[t] + 4), k = 0, A = 0;
	for (; k < v.length && A + O[k] <= a;) A += O[k], k++;
	let j = k === v.length ? r + (a - A) / 2 : r;
	for (let t = 0; t < k; t++) {
		let r = C[t], a = O[t];
		if (i < r) {
			j += a;
			continue;
		}
		let o = ri(v[t], x[t], f);
		Kr(e, v[t].swatchStyle, v[t].color, n, j + (a - o) / 2, r, o, v[t].marker, v[t].fillPaint, v[t].outlinePaint, v[t].outlineColor, v[t].outlineWidthEmu, v[t].outlineDash, v[t].outlineCustomDash, v[t].outlineCap, v[t].outlineJoin, f, m, v[t].directEffect, v[t].fallbackEffect, v[t].directEffectIndex, v[t].fallbackEffectIndex), Qr(e, b[t], f), e.fillStyle = b[t].color, e.textAlign = "left", D[t].forEach((i, a) => e.fillText(i, n + r + 4, j + x[t] * (a + .5))), j += a;
	}
}
function si(e, t) {
	let n = Gt(e, e.legendFontFace) ?? e.themeMinorFontLatin;
	return {
		fontFamily: n ? `"${n}", Calibri, Arial, sans-serif` : "sans-serif",
		color: e.legendFontColor ? `#${e.legendFontColor}` : "#333",
		bold: e.legendFontBold ?? !1,
		italic: e.legendFontItalic ?? !1,
		sizePx: ot(e.legendFontSizeHpt, t)
	};
}
function ci(e, t, n, r, i, a, o, s, c, l, u, d, f, p = [], m = 0) {
	if (!n) return;
	let h = si(t, f), g = Br(t), _ = Ge(t), v = Math.min(8 / 2, Math.max(0, n.reserveW) / 2), y = Math.max(0, n.reserveW - v * 2), b = n.side === "r" ? {
		x: r + a - n.reserveW + v,
		y: c,
		w: y,
		h: u
	} : n.side === "l" ? {
		x: r + v,
		y: c,
		w: y,
		h: u
	} : n.side === "t" ? {
		x: r + 4,
		y: i + d,
		w: Math.max(0, a - 8),
		h: n.reserveH
	} : {
		x: r + 4,
		y: i + o - n.reserveH,
		w: Math.max(0, a - 8),
		h: n.reserveH
	}, x = n.side === "t" || n.side === "b" ? "horizontal" : "vertical", S = t.legendManualLayout, C = S ? Dn(S, {
		x: r,
		y: i,
		w: a,
		h: o
	}, b) : null;
	if (C) {
		let r = C.w >= C.h ? "horizontal" : "vertical";
		F(e, t, C, f, m), oi(e, g, C.x, C.y, C.w, C.h, r, t.chartType, h, t.scatterStyle, _, t.categories, f, p, m, t.varyColors !== !1, t, n);
		return;
	}
	F(e, t, b, f, m), oi(e, g, b.x, b.y, b.w, b.h, x, t.chartType, h, t.scatterStyle, _, t.categories, f, p, m, t.varyColors !== !1, t, n);
}
function li(e, t, n, r = !1, i = !0) {
	if (r || R(e, t.length, i)) {
		let e = t[0];
		return e ? Rt(n, e, i, 0) : `#${Tn[n % Tn.length]}`;
	}
	return w(n, t[n]);
}
//#endregion
//#region packages/core/src/chart/shared/data-table.ts
function ui(e) {
	return e.dataTable != null && wn(e.chartType);
}
function di(e) {
	let t = e.chartType === "clusteredBarH" || e.chartType === "stackedBarH" || e.chartType === "stackedBarHPct", n = e.series.map((e, t) => ({
		series: e,
		sourceIndex: t
	}));
	return t ? n.reverse() : n;
}
function fi(e, t) {
	let n = ui(e) ? e.dataTable : null;
	if (!n) return 0;
	let r = ot(n.fontSizeHpt, t) ?? 9 * t, i = Math.max(1, r * 1.2) + 4 * t;
	return (e.series.length + 1) * i;
}
function pi(e, t, n) {
	let r = ui(t) ? t.dataTable : null;
	if (!r) return 0;
	let i = ot(r.fontSizeHpt, n) ?? 9 * n, a = Y(t, r.fontFace, "minor");
	e.save(), e.font = un(i, a, r.fontBold ?? !1, r.fontItalic ?? !1);
	let o = t.series.reduce((t, n) => Math.max(t, e.measureText(n.name).width), 0);
	e.restore();
	let s = r.showKeys ? Math.max(12 * n, i * 1.7) : 0, c = r.showKeys ? 4 * n : 0;
	return o + s + c + 6 * n;
}
function mi(e, t, n, r) {
	let i = ui(t) ? t.dataTable : null;
	if (!i) return null;
	let a = ot(i.fontSizeHpt, r) ?? 9 * r, o = Math.max(1, a * 1.2), s = o + 4 * r, c = Y(t, i.fontFace, "minor");
	e.save(), e.font = un(a, c, i.fontBold ?? !1, i.fontItalic ?? !1);
	let l = t.series.find((e) => e.catFormatCode)?.catFormatCode ?? t.catAxisFormatCode, u = t.series.find((e) => e.catFormatBuiltinId != null)?.catFormatBuiltinId, d = ge(t).map((i) => {
		let a = i.trim() === "" ? NaN : Number(i);
		return we(e, u === 14 && Number.isFinite(a) ? en(a, t.date1904) : vn(i, l, t.date1904), Math.max(1, n - 4 * r));
	});
	e.restore();
	let f = Math.max(1, ...d.map((e) => e.length)) * o + 4 * r;
	return {
		fontPx: a,
		lineHeight: o,
		headerLines: d,
		headerHeight: f,
		rowHeight: s,
		totalHeight: f + di(t).length * s
	};
}
function hi(e, t, n, r, i, a, o, s) {
	let c = t.dataTable;
	if (!c || !n) return;
	let l = ge(t);
	if (l.length === 0) return;
	let u = a / l.length, d = Y(t, c.fontFace, "minor"), f = un(n.fontPx, d, c.fontBold ?? !1, c.fontItalic ?? !1), p = c.showKeys ? Math.max(12 * s, n.fontPx * 1.7) : 0, m = c.showKeys ? 4 * s : 0;
	e.save(), e.font = f;
	let h = t.series.reduce((t, n) => Math.max(t, e.measureText(n.name).width), 0) + p + m + 6 * s, g = Math.min(Math.max(0, r - o), h), _ = r - g, v = g + a, y = i + n.totalHeight, b = di(t), x = Yr(t.series, t.chartType, t.scatterStyle, !1, t.categories, [], !0, [], t.radarStyle, t), S = j(t), C = c.fillColor ?? null;
	e.beginPath(), e.rect(_, i, v, n.totalHeight), e.clip();
	let w = c.fontHidden === !0 || c.fontPaintAuthored === !0 && c.fontColor == null ? "transparent" : c.fontColor ? `#${c.fontColor}` : "#000000", T = (t, r, i) => {
		if (C && t !== "") {
			let a = e.measureText(t).width;
			e.fillStyle = `#${C}`, e.fillRect(r - a / 2, i - n.lineHeight / 2, a, n.lineHeight);
		}
		e.fillStyle = w, e.textAlign = "center", e.fillText(t, r, i);
	};
	e.fillStyle = w, e.textAlign = "center", e.textBaseline = "middle";
	for (let e = 0; e < l.length; e++) {
		let t = r + (e + .5) * u, a = n.headerLines[e] ?? [""], o = a.length * n.lineHeight, s = i + (n.headerHeight - o) / 2 + n.lineHeight / 2;
		a.forEach((e, r) => {
			T(e, t, s + r * n.lineHeight);
		});
	}
	for (let a = 0; a < b.length; a++) {
		let { series: o, sourceIndex: d } = b[a], f = i + n.headerHeight + a * n.rowHeight + n.rowHeight / 2;
		if (g > 0) {
			let t = _ + 3 * s + p + m;
			if (e.textAlign = "left", e.fillText(Pe(e, o.name, Math.max(0, r - t - 2 * s)), t, f), c.showKeys && p > 0) {
				let t = _ + 3 * s, r = Ve(S, d), i = r == null ? void 0 : x[r];
				if (i) {
					let r = Math.min(n.fontPx, n.rowHeight - 2 * s);
					Kr(e, i.swatchStyle, i.color, t, f - r / 2, p, r, i.marker, i.fillPaint, i.outlinePaint, i.outlineColor, i.outlineWidthEmu, i.outlineDash, i.outlineCustomDash, i.outlineCap, i.outlineJoin, s, 0, i.directEffect, i.fallbackEffect, i.directEffectIndex, i.fallbackEffectIndex);
				}
				e.fillStyle = w;
			}
		}
		for (let e = 0; e < l.length; e++) {
			let n = o.values[e];
			T(n == null ? "" : Ct(n, o.valFormatCode, t.date1904), r + (e + .5) * u, f);
		}
	}
	if (c.lineHidden !== !0 && (c.linePaintAuthored !== !0 || c.lineColor != null)) {
		if (e.strokeStyle = c.lineColor ? `#${c.lineColor}` : "#808080", e.lineWidth = c.lineWidthEmu == null ? Math.max(.5, s * .75) : Ae(c.lineWidthEmu, s), e.setLineDash(tn(c.lineDash ?? void 0, e.lineWidth)), c.showHorizontalBorder) {
			let t = i + n.headerHeight;
			for (let r = 0; r < b.length; r++) e.beginPath(), e.moveTo(_, t), e.lineTo(_ + v, t), e.stroke(), t += n.rowHeight;
		}
		if (c.showVerticalBorder) {
			e.beginPath(), e.moveTo(r, i), e.lineTo(r, y), e.stroke();
			for (let t = 1; t < l.length; t++) {
				let n = r + t * u;
				e.beginPath(), e.moveTo(n, i), e.lineTo(n, y), e.stroke();
			}
		}
		if (c.showOutline) {
			let t = e.lineWidth / 2;
			e.strokeRect(_ + t, i + t, Math.max(0, v - e.lineWidth), Math.max(0, n.totalHeight - e.lineWidth));
		}
	}
	e.restore();
}
//#endregion
//#region packages/core/src/chart/shared/scatter-geometry.ts
function gi(e, t, n) {
	if (n) return t + 1;
	let r = e[t];
	if (r == null) return null;
	let i = parseFloat(r);
	return Number.isNaN(i) ? null : i;
}
function _i(e, t) {
	return e.bubbleSizeRepresents === "w" ? t : Math.sqrt(t);
}
//#endregion
//#region packages/core/src/chart/shared/error-bars.ts
function vi(e, t, n, r, i, a, o, s) {
	if (n.hidden === !0 || n.linePaintAuthored === !0 && n.color == null) return;
	e.save(), e.strokeStyle = n.color ? `#${n.color}` : s, e.lineWidth = n.lineWidthEmu ? Math.max(.5, n.lineWidthEmu / Rn) : 1, e.setLineDash(tn(n.dash, e.lineWidth));
	let c = n.barType === "plus" || n.barType === "both", l = n.barType === "minus" || n.barType === "both", u = n.dir === "x", d = e.lineWidth / 2;
	for (let s = 0; s < t.values.length; s++) {
		let f = t.values[s];
		if (f == null) continue;
		let p = gi(r, s, i);
		if (p == null) continue;
		let m = a(p), h = o(f), g = (t) => {
			let r = m, i = h;
			u ? r = a(p + t) : i = o(f + t), e.beginPath(), e.moveTo(m, h), e.lineTo(r, i), e.stroke(), n.noEndCap || (e.save(), e.setLineDash([]), e.beginPath(), u ? (e.moveTo(r, i - d), e.lineTo(r, i + d)) : (e.moveTo(r - d, i), e.lineTo(r + d, i)), e.stroke(), e.restore());
		};
		if (c) {
			let e = n.plus[s];
			e != null && g(e);
		}
		if (l) {
			let e = n.minus[s];
			e != null && g(-e);
		}
	}
	e.restore();
}
function yi(e, t, n, r, i, a, o, s) {
	if (n.hidden === !0 || n.linePaintAuthored === !0 && n.color == null || n.dir === "x") return;
	let c = n.barType === "plus" || n.barType === "both", l = n.barType === "minus" || n.barType === "both";
	e.save(), e.strokeStyle = n.color ? `#${n.color}` : s, e.lineWidth = n.lineWidthEmu ? Math.max(.5, n.lineWidthEmu / Rn) : 1, e.setLineDash(tn(n.dash, e.lineWidth));
	let u = e.lineWidth / 2;
	for (let s = 0; s < r; s++) {
		if (t.values[s] == null) continue;
		let r = o(s), d = i(s), f = a(r), p = (t) => {
			let i = a(r + t);
			e.beginPath(), e.moveTo(d, f), e.lineTo(d, i), e.stroke(), n.noEndCap || (e.save(), e.setLineDash([]), e.beginPath(), e.moveTo(d - u, i), e.lineTo(d + u, i), e.stroke(), e.restore());
		};
		if (c) {
			let e = n.plus[s];
			e != null && p(e);
		}
		if (l) {
			let e = n.minus[s];
			e != null && p(-e);
		}
	}
	e.restore();
}
//#endregion
//#region packages/core/src/chart/shared/data-labels.ts
function bi(e, t, n) {
	return e.showDataLabelsOverMax === !0 || !Number.isFinite(n) || t <= n;
}
function xi(e, t, n, r, i, a, o, s, c = !1, l = "sans-serif", u = "r", d = {
	x: -1e6,
	y: -1e6,
	w: 2e6,
	h: 2e6
}, f = d, p, m, h, g, _ = 0, v) {
	let y = t.dataLabelOverrides ?? [], b = ye(y);
	if (y.length === 0 && !t.seriesDataLabels) return;
	let x = t.seriesDataLabels;
	for (let y = 0; y < t.values.length; y++) {
		let S = t.values[y];
		if (S == null || g && !g(S)) continue;
		let C = gi(n, y, r);
		if (C == null) continue;
		let w = b.get(y);
		if (K(x, w)) continue;
		let T = w?.showCatName ?? x?.showCatName, E = w?.showSerName ?? x?.showSerName, D = w?.showVal ?? x?.showVal, O = w?.showBubbleSize ?? x?.showBubbleSize, k = w?.showLegendKey ?? x?.showLegendKey ?? !1, A = Wt({
			customText: w?.text,
			showCategory: T,
			showSeries: E,
			showValue: D,
			showBubbleSize: O,
			category: r ? vn((n[y] ?? String(C)).toString(), t.catFormatCodes?.[y] ?? t.catFormatCode ?? null, c) : Ct(C, t.catFormatCodes?.[y] ?? t.catFormatCode ?? null, c),
			seriesName: t.name,
			sourceValue: S,
			bubbleSize: t.bubbleSizes?.[y] ?? void 0,
			valueDivisor: se(m),
			formatCode: w?.formatCode ?? x?.formatCode ?? null,
			date1904: c,
			separator: w?.separator ?? x?.separator
		}), j = k ? h?.(y) : void 0;
		if (!A && !j) continue;
		let M = w?.position ?? x?.position ?? u, ee = ot(w?.fontSizeHpt ?? x?.fontSizeHpt, s) ?? Math.max(9, Math.min(11, o / 25)), N = w?.fontColor ?? x?.fontColor, te = w?.fontBold ?? x?.fontBold ?? !1, P = w?.fontFace ?? x?.fontFace, ne = P && p ? p(P) : l;
		Si(e, i(C), a(S), A, M, ee, N, te, ne, v?.(y) ?? 0, d, w?.manualLayout, f, w?.richRuns, s, p, j, Te(w, x), ln(w?.labelBox, x?.labelBox), _);
	}
}
function Si(e, t, n, r, i, a, o, s, c = "sans-serif", l = 0, u = {
	x: -1e6,
	y: -1e6,
	w: 2e6,
	h: 2e6
}, d, f = u, p, m = 1, h, g, _, v, y = 0) {
	e.save(), e.font = `${_?.fontItalic ? "italic " : ""}${s ? "bold " : ""}${a}px ${c}`, Ti(e, r, {
		kind: "point",
		x: t,
		y: n,
		position: i,
		markerGap: l
	}, u, a, o ? `#${o}` : "#333", d, f, p && p.length > 0 ? {
		runs: p,
		ptToPx: m,
		fontFamily: c,
		fallbackBold: s,
		fallbackItalic: _?.fontItalic,
		fallbackBaseline: _?.fontBaseline,
		fallbackColorHidden: _?.fontPaintAuthored === !0 && (_.fontHidden === !0 || _.fontColor == null),
		fontFamilyForFace: h
	} : void 0, g, _, m, v, y), e.restore();
}
function Ci(e, t, n, r, i, a) {
	if (!(!t?.text || !t.richRuns || t.richRuns.length === 0)) return wi(e, t.richRuns, n, r, i, a);
}
function wi(e, t, n, r, i, a) {
	if (!(!t || t.length === 0)) return {
		runs: t,
		ptToPx: n,
		fontFamily: r,
		fallbackBold: i,
		fallbackItalic: a?.fontItalic,
		fallbackBaseline: a?.fontBaseline,
		fallbackColorHidden: a?.fontPaintAuthored === !0 && (a.fontHidden === !0 || a.fontColor == null),
		fontFamilyForFace: (t) => Y(e, t, "minor")
	};
}
function Ti(e, t, r, i, a, o, s, c = i, l, u, d, f = 1, p, m = 0) {
	if (!t && !u || !Number.isFinite(a) || a <= 0) return;
	if (u) {
		Ei(e, t, r, i, a, o, s, c, l, u, d, p);
		return;
	}
	if (l) {
		let t = Gn(e, l, a, o);
		if (!t) return;
		let n = $e(d, f), u = vt(t.width + n.left + n.right, t.height + n.top + n.bottom, d?.textRotation, d?.textVerticalMode), h = Mt(r, i, {
			w: u.w,
			h: u.h
		}, a, s, c);
		if (!h) return;
		e.save(), e.beginPath(), e.rect(h.clip.x, h.clip.y, h.clip.w, h.clip.h), e.clip(), ft(e, p, h.rect, f, m);
		let g = nt(d, h.textAlign), _ = I(h.x, h.y, h.rect, t.height + n.top + n.bottom, d, s != null, g, h.textAlign, t.width + n.left + n.right, u.radians), v = pn(e, _.x, _.y, u.radians, g, h.textBaseline, n);
		zn(e, t, v.x, v.y, g, h.textBaseline, s ? Math.max(0, h.rect.w - n.left - n.right) : t.width), e.restore();
		return;
	}
	let h = a * 1.15, g = Yt(t).value.split(/\r?\n/), _ = g.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), v = Math.max(h, g.length * h), y = $e(d, f), b = vt(_ + y.left + y.right, v + y.top + y.bottom, d?.textRotation, d?.textVerticalMode), x = Mt(r, i, {
		w: b.w,
		h: b.h
	}, a, s, c);
	if (!x) return;
	let S = (t) => e.measureText(t).width, C = n(t, x.maxWidth, x.maxHeight, h, S, d);
	if (C.length === 0) return;
	let w = C.reduce((e, t) => Math.max(e, S(t)), 0), T = C.length * h, E = vt(w + y.left + y.right, T + y.top + y.bottom, d?.textRotation, d?.textVerticalMode);
	if (x = Mt(r, i, {
		w: E.w,
		h: E.h
	}, a, s, c), !x) return;
	e.save(), e.beginPath(), e.rect(x.clip.x, x.clip.y, x.clip.w, x.clip.h), e.clip(), ft(e, p, x.rect, f, m);
	let D = d?.fontPaintAuthored === !0 && (d.fontHidden === !0 || d.fontColor == null);
	e.fillStyle = o;
	let O = nt(d, x.textAlign);
	e.textAlign = O, e.textBaseline = x.textBaseline;
	let k = I(x.x, x.y, x.rect, T + y.top + y.bottom, d, s != null, O, x.textAlign, w + y.left + y.right, E.radians), A = pn(e, k.x, k.y, E.radians, O, x.textBaseline, y), j = (d?.fontBaseline ?? 0) * a, M = x.textBaseline === "middle" ? A.y - (C.length - 1) * h / 2 : x.textBaseline === "bottom" ? A.y - (C.length - 1) * h : A.y;
	if (!D) for (let t = 0; t < C.length; t++) e.fillText(C[t], A.x, M + t * h - j);
	e.restore();
}
function Ei(e, t, r, i, a, o, s, c, l, u, d, f) {
	let { entry: p, ptToPx: m, shapeRotationDeg: h } = u, g = ni([p], a, m)[0] ?? 0, _ = ri(p, a, m), v = t ? 4 : 0, y = t && l ? Gn(e, l, a, o) : null;
	if (t && l && !y) return;
	let b = a * 1.15, x = t && !y ? Yt(t).value.split(/\r?\n/) : [], S = y?.width ?? x.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), C = y?.height ?? (x.length > 0 ? Math.max(b, x.length * b) : 0), w = $e(d, m), T = vt(g + v + S + w.left + w.right, Math.max(_, C) + w.top + w.bottom, d?.textRotation, d?.textVerticalMode), E = Mt(r, i, {
		w: T.w,
		h: T.h
	}, a, s, c);
	if (!E) return;
	let D = x;
	if (t && !y && (D = n(t, Math.max(0, E.maxWidth - g - v), E.maxHeight, b, (t) => e.measureText(t).width, d), D.length === 0)) return;
	let O = y?.width ?? D.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), k = y?.height ?? D.length * b, A = g + v + O, j = Math.max(_, k), M = A + w.left + w.right, ee = j + w.top + w.bottom, N = vt(M, ee, d?.textRotation, d?.textVerticalMode);
	if (E = Mt(r, i, {
		w: N.w,
		h: N.h
	}, a, s, c), !E) return;
	let te = E.textAlign === "left" ? E.x + N.w / 2 : E.textAlign === "right" ? E.x - N.w / 2 : E.x, P = E.textBaseline === "top" ? E.y + N.h / 2 : E.textBaseline === "bottom" ? E.y - N.h / 2 : E.y;
	if (s) {
		let e = nt(d, "center"), t = I(te, P, E.rect, ee, d, !0, e);
		te = e === "left" ? t.x + M / 2 : e === "right" ? t.x - M / 2 : t.x, P = t.y;
	}
	let ne = te - M / 2 + w.left, F = P - ee / 2 + w.top;
	if (e.save(), e.beginPath(), e.rect(E.clip.x, E.clip.y, E.clip.w, E.clip.h), e.clip(), ft(e, f, E.rect, m, h), N.radians !== 0 && (e.translate(te, P), e.rotate(N.radians), e.translate(-te, -P)), Kr(e, p.swatchStyle, p.color, ne, F + (j - _) / 2, g, _, p.marker, p.fillPaint, p.outlinePaint, p.outlineColor, p.outlineWidthEmu, p.outlineDash, p.outlineCustomDash, p.outlineCap, p.outlineJoin, m, h, p.directEffect, p.fallbackEffect, p.directEffectIndex, p.fallbackEffectIndex), t) {
		let t = ne + g + v;
		if (y) zn(e, y, t, F + (j - k) / 2, "left", "top");
		else if (!(d?.fontPaintAuthored === !0 && (d.fontHidden === !0 || d.fontColor == null))) {
			e.fillStyle = o, e.textAlign = "left", e.textBaseline = "top";
			let n = (d?.fontBaseline ?? 0) * a, r = F + (j - k) / 2 - n;
			for (let n = 0; n < D.length; n++) e.fillText(D[n], t, r + n * b);
		}
	}
	e.restore();
}
function Di(e, t, n, r, i, a, o, s, c, l, u, d = "sans-serif", f = "t", p = {
	x: -1e6,
	y: -1e6,
	w: 2e6,
	h: 2e6
}, m = p, h, g, _, v, y, b, x = 0) {
	let S = t.dataLabelOverrides ?? [], C = ye(S), w = t.seriesDataLabels;
	if (S.length === 0 && !w) return !1;
	for (let S = 0; S < r; S++) {
		if (t.sourceHidden?.[S] === !0 || t.values[S] == null && !u) continue;
		let r = o(S);
		if (b && !b(r)) continue;
		let T = t.values[S] ?? 0, E = C.get(S);
		if (K(w, E)) continue;
		let D = E?.showCatName ?? w?.showCatName, O = E?.showSerName ?? w?.showSerName, k = E?.showVal ?? w?.showVal, A = E?.showPercent ?? w?.showPercent, j = E?.showLegendKey ?? w?.showLegendKey ?? !1, M = Wt({
			customText: E?.text,
			showCategory: D,
			showSeries: O,
			showValue: k,
			showPercent: A,
			category: n[S] ?? "",
			seriesName: t.name,
			sourceValue: T,
			valueDivisor: se(v),
			percentRatio: h?.(S),
			formatCode: E?.formatCode ?? w?.formatCode ?? null,
			date1904: l,
			separator: E?.separator ?? w?.separator
		}), ee = j ? y?.(S) : void 0;
		if (!M && !ee) continue;
		let N = E?.position ?? w?.position ?? f, te = ot(E?.fontSizeHpt ?? w?.fontSizeHpt, c) ?? Math.max(9, Math.min(11, s / 25)), P = E?.fontColor ?? w?.fontColor, ne = E?.fontBold ?? w?.fontBold ?? !1, F = E?.fontFace ?? w?.fontFace, re = F && _ ? _(F) : d;
		Si(e, i(S), a(r), M, N, te, P, ne, re, g?.(S) ?? 0, p, E?.manualLayout, m, E?.richRuns, c, _, ee, Te(E, w), ln(E?.labelBox, w?.labelBox), x);
	}
	return !0;
}
function Oi(e, t, n, r, i) {
	let a = 0;
	for (let o of [e?.fillPaint, e?.borderFill]) {
		if (!o) continue;
		let e = o.fillType === "image" ? on(o, t, n, r, i) : B(o);
		if (o.fillType === "gradient" && e > tr) return null;
		a += e;
	}
	return a;
}
function ki(e, t, n, r) {
	let i = t.seriesDataLabels;
	return K(i, r) ? !1 : !!(r?.text || (r?.showVal ?? i?.showVal ?? e.showDataLabels) || (r?.showCatName ?? i?.showCatName) || (r?.showSerName ?? i?.showSerName) || (r?.showPercent ?? i?.showPercent) || (r?.showBubbleSize ?? i?.showBubbleSize) || (r?.showLegendKey ?? i?.showLegendKey)) && n < Math.max(t.values.length, t.categories?.length ?? 0, e.categories.length);
}
function Ai(e, t, n, r = Ln, i) {
	if (e.chartexSunburst || e.chartexTreemap) return null;
	let a = 0, o = Math.max(1, i?.w ?? 32 * r), s = Math.max(1, i?.h ?? 16 * r), c = (e) => {
		let t = Oi(e, n, o, s, r);
		return t == null || t > nr - a ? !1 : (a += t, !0);
	}, l = e.threeD != null && t != null && rr.has(e.chartType), u = e.series.some((t) => (t.seriesType ?? e.chartType) === "scatter" && (t.categories ?? e.categories).some((e) => Number.isFinite(Number.parseFloat(e))));
	for (let t = 0; t < e.series.length; t++) {
		let n = e.series[t], r = ye(n.dataLabelOverrides), i = n.seriesType ?? e.chartType, a = Math.max(n.values.length, n.categories?.length ?? 0, e.categories.length);
		for (let o = 0; o < a; o++) {
			let a = n.values[o];
			if (l) {
				if (a == null || !Number.isFinite(a)) continue;
				if (e.showDataLabelsOverMax !== !0) {
					let t = n.useSecondaryAxis ? e.secondaryValAxis?.max : e.valMax;
					if (t != null && Number.isFinite(t) && a > t) continue;
				}
			} else if (!Le(e, n, i, o, u, t)) continue;
			let s = r.get(o);
			if (!ki(e, n, o, s)) continue;
			let d = ln(s?.labelBox, n.seriesDataLabels?.labelBox);
			if (d && !c(d)) return nr + 1;
		}
		if (!l) {
			for (let e of n.trendLines ?? []) if ((e.dispEq === !0 || e.dispRSqr === !0 || e.labelText || e.labelRichRuns?.some((e) => e.text.length > 0) === !0) && e.labelBox && !c(e.labelBox)) return nr + 1;
		}
	}
	return a;
}
//#endregion
//#region packages/core/src/chart/shared/scatter-paint.ts
function ji(e, t, n) {
	return {
		series: t,
		seriesIndex: n,
		fallbackColor: w(n, t),
		cats: t.categories ?? e.categories,
		pointOverrides: new Map((t.dataPointOverrides ?? []).map((e) => [e.idx, e]))
	};
}
function Mi(e, t, n, r, i) {
	let a = gt(e.bubbleScale ?? 100, 0, 300);
	if (a <= 0) return 0;
	let o = 0;
	for (let { series: r, cats: i, pointOverrides: a } of t) if (!(r.showMarker === !1 || r.markerSymbol === "none")) for (let t = 0; t < r.values.length; t++) {
		if (r.values[t] == null || gi(i, t, n) == null || a.get(t)?.markerSymbol === "none") continue;
		let s = u(e, r.bubbleSizes?.[t]);
		s != null && (o = Math.max(o, _i(e, s)));
	}
	return o <= 0 ? 0 : Math.min(r, i) * a / (300 + a) / o;
}
function Ni(e, t, n, r, i, a, o, s, c, l, d, f, m, h, g, v, b, x = 0, C) {
	let w = h === "line" || h === "lineMarker" || h === "lineNoMarker", T = h === "smooth" || h === "smoothMarker" || h === "smoothNoMarker", E = Se("scatter", t.chartType, h, t.radarStyle), D = n.map(({ series: e, index: n }) => ji(t, e, n)), k = Xr(t, f), A = C ?? t, j = m ? Mi(A, D, r, l, d) : 0;
	for (let { series: n, fallbackColor: o, cats: s } of D) for (let c of n.errBars ?? []) vi(e, n, Xt(t, c), s, r, i, a, o);
	for (let { series: n, seriesIndex: o, fallbackColor: u, cats: p } of D) {
		let g = h === "marker" && O(n), v = g || w, b = !g && h === "marker" && !m || T;
		if (v || b) {
			let m = [];
			for (let e = 0; e < n.values.length; e++) {
				let t = n.values[e];
				if (t == null) continue;
				let o = gi(p, e, r);
				o != null && m.push({
					x: i(o),
					y: a(t),
					index: e
				});
			}
			if (m.length >= 2) {
				let r = y(n, o), i = {
					x: s,
					y: c,
					w: l,
					h: d
				};
				if (it(t, o)) {
					Ut(e, t, n, [m], b, !1, u, 1.5, f, i, x, !0);
					continue;
				}
				_(e, S(n.chartexStyle), t.chartStyleRoles?.dataPointLine, r, i, f, (e) => {
					e.save();
					let a = Re(e, t, "dataPointLine", n, void 0, r, u, 1.5, f, i, x, !0, !1);
					if (a && g && n.dataPointColors?.some(Boolean)) {
						e.lineWidth = 1.5;
						for (let t = 1; t < m.length; t++) e.strokeStyle = `#${n.dataPointColors[t] ?? n.color ?? u.replace(/^#/, "")}`, e.beginPath(), e.moveTo(m[t - 1].x, m[t - 1].y), e.lineTo(m[t].x, m[t].y), e.stroke();
					} else if (a) {
						if (e.beginPath(), e.moveTo(m[0].x, m[0].y), b && m.length >= 3) for (let t = 0; t < m.length - 1; t++) {
							let n = m[t - 1] ?? m[t], r = m[t], i = m[t + 1], a = m[t + 2] ?? i;
							e.bezierCurveTo(r.x + (i.x - n.x) / 6, r.y + (i.y - n.y) / 6, i.x - (a.x - r.x) / 6, i.y - (a.y - r.y) / 6, i.x, i.y);
						}
						else for (let t = 1; t < m.length; t++) e.lineTo(m[t].x, m[t].y);
						e.stroke();
					}
					e.restore();
				});
			}
		}
	}
	for (let { series: n, seriesIndex: o, fallbackColor: s, cats: c, pointOverrides: l } of D) {
		let d = !E && n.showMarker !== !1 && n.markerSymbol !== "none";
		if (d || !E && Ht(n)) for (let h = 0; h < n.values.length; h++) {
			let g = n.values[h];
			if (g == null) continue;
			let _ = gi(c, h, r);
			if (_ == null) continue;
			let v = l.get(h), b = ve(n, v, m ? "circle" : n.automaticMarkerSymbol ?? "circle", d);
			if (b === "none") continue;
			let S = v?.markerSize ?? n.markerSize ?? 5;
			if (m) {
				if (j <= 0) continue;
				let e = u(A, n.bubbleSizes?.[h]);
				if (e == null) continue;
				S = _i(A, e) * j / f;
			}
			let C = m ? Or(t, n, v, h, y(n, o), s) : null, w = C?.color ?? Dr(n, v, h, s), T = m ? kr(t, n, v, h, y(n, o)) : null, E = m ? T.color : v?.markerLine ?? n.markerLine ?? null, D = v?.markerLineWidthEmu ?? n.markerLineWidthEmu, O = T?.widthEmu, k = m ? O : D, M = k == null ? void 0 : Ae(k, f), ee = m ? p(n, v) : !1;
			jr(e, t, n, v, h, i(_), a(g), b, S, w, E, f, M, m ? C.paint : Lt(n, v, h), x, m ? T.paint : void 0, m ? T.dash : void 0, m ? T.customDash : void 0, m ? T.cap : void 0, m ? T.join : void 0, ee, m);
		}
	}
	for (let { series: n, seriesIndex: s, cats: l, pointOverrides: p } of D) xi(e, n, l, r, i, a, d, f, t.date1904, Y(t, t.dataLabelFontFace, "minor"), t.dataLabelPosition ?? "r", {
		x: o.x,
		y: c,
		w: o.w,
		h: d
	}, g, (e) => Y(t, e, "minor"), b, (e) => k(s, e), (e) => bi(t, e, v), x, (e) => {
		if (E) return 0;
		let t = n.showMarker !== !1 && n.markerSymbol !== "none", r = p.get(e);
		if (ve(n, r, "circle", t) === "none") return 0;
		let i = r?.markerSize ?? n.markerSize ?? 5;
		if (m) {
			if (j <= 0) return 0;
			let t = u(A, n.bubbleSizes?.[e]);
			if (t == null) return 0;
			i = _i(A, t) * j / f;
		}
		return Math.max(0, i * f / 2);
	});
	for (let { series: n, fallbackColor: u, cats: p } of D) Rr(e, n, u, i, a, f, n.values.map((e, t) => gi(p, t, r)), {
		chart: t,
		chartRect: o,
		plotRect: {
			x: s,
			y: c,
			w: l,
			h: d
		},
		clipLineToPlot: !0,
		shapeRotationDeg: x
	});
}
//#endregion
//#region packages/core/src/chart/shared/resource.ts
function Pi(e, t, n) {
	let r = ot(e.legendFontSizeHpt, n) ?? 10 * n, i = ot(e.dataTable?.fontSizeHpt, n) ?? 9 * n, a = ot(t.seriesDataLabels?.fontSizeHpt ?? e.dataLabelFontSizeHpt, n) ?? 10 * n;
	for (let e of t.dataLabelOverrides ?? []) a = Math.max(a, ot(e.fontSizeHpt, n) ?? a);
	return {
		legend: Math.max(2, (2 * r + 4) * .58),
		table: Math.max(2, i),
		labels: Math.max(2, a)
	};
}
function Fi(e, t, n = Ln, i) {
	let a = r(e.chartType), o = e.chartexBox != null;
	if (!a && !o) return null;
	let s = On(e), c = e.series.some((t, n) => {
		let r = s[n];
		return (r?.kind === "bubble" || r?.kind === "scatter" ? "scatter" : t.seriesType ?? (e.chartType === "bubble" ? "scatter" : e.chartType)) === "scatter" ? (t.categories ?? e.categories).some((e) => Number.isFinite(Number.parseFloat(e))) : !1;
	}), l = ui(e) && ge(e).length > 0 && e.dataTable?.showKeys === !0, d = N(e), f = j(e, !0), m = e.chartType === "bubble" && i ? Mi(e, e.series.map((t, n) => ji(e, t, n)), !c, i.w, i.h) : 0, h = /* @__PURE__ */ new Map();
	if (i) for (let t of e.plotGroups ?? []) {
		if (t.kind !== "bubble" || t.seriesCount === 0) continue;
		let n = e.series.slice(t.seriesStart, t.seriesStart + t.seriesCount).map((n, r) => ji(e, n, t.seriesStart + r));
		h.set(t, Mi({
			bubbleScale: t.bubbleScale ?? e.bubbleScale,
			bubbleSizeRepresents: t.bubbleSizeRepresents ?? e.bubbleSizeRepresents,
			showNegativeBubbles: t.showNegativeBubbles ?? e.showNegativeBubbles
		}, n, !c, i.w, i.h));
	}
	let g = 0, _ = (e, t = 1) => t <= 0 || e <= 0 ? !0 : !Number.isSafeInteger(t) || e > Math.floor((er - g) / t) ? !1 : (g += e * t, !0), b = (e, r = 1, i = Math.max(2, 5 * n)) => {
		if (r <= 0 || e == null) return !0;
		let a = e.fillType === "image" ? on(e, t, i, i, n) : B(e);
		return e.fillType === "gradient" && a > $n ? !1 : _(a, r);
	};
	if (a) for (let t = 0; t < e.series.length; t++) {
		let r = e.series[t], a = s[t], o = a?.kind === "bubble" || a == null && e.chartType === "bubble", g = a?.kind === "bubble" || a?.kind === "scatter" ? "scatter" : r.seriesType ?? (e.chartType === "bubble" ? "scatter" : e.chartType), x = Ne(e.chartType, a), S = a?.scatterStyle ?? e.scatterStyle, T = a?.radarStyle ?? e.radarStyle, E = {
			chartType: x,
			bubbleScale: a?.bubbleScale ?? e.bubbleScale,
			showNegativeBubbles: a?.showNegativeBubbles ?? e.showNegativeBubbles
		}, D = o ? {
			bubbleScale: E.bubbleScale,
			bubbleSizeRepresents: a?.bubbleSizeRepresents ?? e.bubbleSizeRepresents,
			showNegativeBubbles: E.showNegativeBubbles
		} : void 0, O = a?.kind === "bubble" ? h.get(a) ?? 0 : m;
		if (!(g === "line" || g === "stackedLine" || g === "stackedLinePct" || g === "area" || g === "stackedArea" || g === "stackedAreaPct" || g === "scatter" || g === "radar" || g === "stock") || Se(g, x, S, T)) continue;
		let k = g === "area" || g === "stackedArea" || g === "stackedAreaPct" ? (r.showMarker === !0 || ne(r)) && r.markerSymbol !== "none" : g === "stock" ? r.markerSymbol != null && r.markerSymbol !== "none" : r.showMarker !== !1 && r.markerSymbol !== "none";
		if (!k && !Ht(r)) continue;
		let A = Math.max(r.values.length, r.categories?.length ?? 0, e.categories.length), j = ye(r.dataPointOverrides), M = new Map((r.dataLabelOverrides ?? []).map((e) => [e.idx, e])), ee = Pi(e, r, n), N = f[t]?.pointDriven === !0;
		for (let a = 0; a < A; a++) {
			let s = C(e, r, g, a, c, E) && (!o || O > 0 && u(D, r.bubbleSizes?.[a]) != null), p = N && e.showLegend && Ye(f, d, t, a), m = M.get(a), h = N && s && !K(r.seriesDataLabels, m) && (m?.showLegendKey ?? r.seriesDataLabels?.showLegendKey ?? !1) === !0, v = N && l && a === 0;
			if (!s && !p && !h && !v || o && s && (O <= 0 || u(D, r.bubbleSizes?.[a]) == null)) continue;
			let y = j.get(a), x = ve(r, y, "circle", k);
			if (x === "none") continue;
			let w = o ? Wr(e, r, y, a) : Gr(e, r, y, a, t, g, S, T), A = w ? w.fillPaint : o ? void 0 : Lt(r, y, a), te = w?.linePaint, P = me(w?.symbol ?? x), ne = (e) => (!P || b(A, 1, e)) && b(te, 1, e) && (!o || w?.bubble3D !== !0 || A === null || _(15)), F = Math.max(2, (y?.markerSize ?? r.markerSize ?? 5) * n);
			if (g === "scatter" && o) {
				let e = u(D, r.bubbleSizes?.[a]);
				F = e == null ? 0 : _i(D, e) * O;
			} else g === "radar" && y?.markerSize == null && r.markerSize == null && i && (F = Math.max(4 * n, Math.min(i.w, i.h) * .025));
			if (s && !ne(F) || p && !ne(ee.legend) || v && !ne(ee.table) || h && !ne(ee.labels)) return er + 1;
		}
		let te = r.markerSymbol ?? (g === "stock" ? "none" : "circle");
		if (!N && me(te) && ue(x, S, r, T)) {
			let n = Ye(f, d, t), i = v(e, r, g, A, c, E), a = o ? Or(e, r, void 0, t, y(r, t), w(t, r)) : null, s = o ? a.paint : Fn(r), u = o ? kr(e, r, void 0, t, y(r, t)) : null, m = (e, t) => b(s, e, t) && (!o || b(u.paint, e, t)) && (!o || !p(r, void 0) || a.paint === null || _(15, e));
			if (e.showLegend && n && !m(1, ee.legend) || l && !m(1, ee.table) || !m(i, ee.labels)) return er + 1;
		}
	}
	let x = e.chartexBox;
	if (x) {
		let t = x.series.length, r = e.chartexDataPointMarkerStyle ?? e.chartexDataPointStyle;
		if (me(e.chartStyleMarkerSymbol ?? e.chartexMarkerSymbol ?? "circle")) for (let i = 0; i < t; i++) {
			let a = x.series[i];
			if (!a.showNonoutliers && !a.showOutliers) continue;
			let o = 0;
			for (let e of a.valuesByCategory) {
				let t = We(e, a.quartileMethod);
				t && (o += le(t, a.showNonoutliers, a.showOutliers));
			}
			if (!b(ur(e, y(a, i), t, a.chartexStyle, a.color, r), o, Math.max(2, 3 * n))) return er + 1;
		}
	}
	return g;
}
function Ii(e, t) {
	if (!e.threeD || !t || !rr.has(e.chartType)) return null;
	let n = 0;
	for (let t of e.series) {
		let r = Math.max(1, t.values.length, t.categories?.length ?? 0), i = t.threeDShape ?? e.threeD.shape ?? "box", a = e.chartType === "pie" ? 36 : e.chartType.toLowerCase().includes("bar") ? i === "box" ? 4 : 36 : e.chartType.toLowerCase().includes("area") ? 4 : t.smooth === !0 ? 25 : 3;
		if (!Number.isSafeInteger(r) || r > Math.floor(1e4 / a) || (n += r * a, n > 1e4)) return an + 1;
	}
	return n;
}
function Li(e, t, n) {
	return n <= 1e4 ? !1 : (e.fillStyle = "#888", e.font = "12px sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.fillText("(too many data points)", t.x + t.w / 2, t.y + t.h / 2), !0);
}
//#endregion
//#region packages/core/src/chart/shared/frame.ts
function Ri(e, t, n, r) {
	let i = t.chartTextBoxes;
	if (i?.length) for (let a of i) {
		let i = n.x + a.x * n.w, o = n.y + a.y * n.h, s = a.w * n.w, c = a.h * n.h;
		if (!(s > 0 && c > 0)) continue;
		let l = i + (a.lIns ?? 91440) / Rn * r, u = o + (a.tIns ?? 45720) / Rn * r, d = i + s - (a.rIns ?? 91440) / Rn * r, f = o + c - (a.bIns ?? 45720) / Rn * r, p = d - l, m = f - u;
		if (!(p > 0 && m > 0)) continue;
		let h = (e, t) => {
			let n = Math.max(1, ...t.map((e) => e.fontPx));
			return {
				paragraph: e,
				runs: t,
				width: t.reduce((e, t) => e + t.width, 0),
				height: n * 1.2,
				baseline: n * .9
			};
		}, g = a.paragraphs.flatMap((n) => {
			let i = n.runs.map((n) => {
				let i = Math.max(1, (n.fontSizeHpt ?? 1e3) / 100 * r), a = `${n.bold ? "bold " : ""}${i}px ${Y(t, n.fontFace, "minor")}`;
				return e.font = a, {
					run: n,
					text: n.text,
					fontPx: i,
					font: a,
					width: e.measureText(n.text).width
				};
			}), o = i.reduce((e, t) => e + t.width, 0);
			if (a.wrap === "none" || o <= p) return [h(n, i)];
			let s = [], c = [], l = 0, u = () => {
				c.length && (s.push(h(n, c)), c = [], l = 0);
			};
			for (let t of i) {
				let n = t.text.match(/\s+|\S+/g) ?? [];
				for (let r of n) {
					let n = /^\s+$/.test(r);
					e.font = t.font;
					let i = e.measureText(r).width;
					c.length && l + i > p && u(), !(n && !c.length) && (c.push({
						...t,
						text: r,
						width: i
					}), l += i);
				}
			}
			return u(), s.length ? s : [h(n, i)];
		}), _ = g.reduce((e, t) => e + t.height, 0), v = a.verticalAnchor === "b" ? f - _ : a.verticalAnchor === "ctr" ? u + (m - _) / 2 : u;
		e.save(), e.beginPath(), e.rect(i, o, s, c), e.clip(), e.textAlign = "left", e.textBaseline = "alphabetic";
		let y = v;
		for (let t of g) {
			let n = t.paragraph.align, r = n === "ctr" ? l + (p - t.width) / 2 : n === "r" ? d - t.width : l;
			for (let n of t.runs) e.font = n.font, e.fillStyle = n.run.color ? `#${n.run.color}` : "#000000", e.fillText(n.text, r, y + t.baseline), r += n.width;
			y += t.height;
		}
		e.restore();
	}
}
function zi(e, t, n, r, i, a) {
	let o = Math.max(0, Math.min(a, r / 2, i / 2));
	e.beginPath(), e.moveTo(t + o, n), e.lineTo(t + r - o, n), e.quadraticCurveTo(t + r, n, t + r, n + o), e.lineTo(t + r, n + i - o), e.quadraticCurveTo(t + r, n + i, t + r - o, n + i), e.lineTo(t + o, n + i), e.quadraticCurveTo(t, n + i, t, n + i - o), e.lineTo(t, n + o), e.quadraticCurveTo(t, n, t + o, n), e.closePath();
}
//#endregion
//#region packages/core/src/chart/shared/title.ts
function Bi(e, t, n) {
	let r = n / (e.titleFontSizeHpt != null && e.titleFontSizeHpt >= 100 && e.titleFontSizeHpt <= 4e5 ? e.titleFontSizeHpt / 100 : 14), i = ot(t.fontSizeHpt, r) ?? n, a = Gt(e, t.fontFace ?? e.titleFontFace);
	return {
		font: un(i, a ? `"${a}", Calibri, Arial, sans-serif` : "Calibri, Arial, sans-serif", t.bold ?? e.titleFontBold ?? !1, t.italic ?? e.titleFontItalic ?? !1),
		fontSize: i,
		color: t.colorPaintAuthored === !0 ? t.colorHidden === !0 || !t.color ? "transparent" : `#${t.color}` : t.color ? `#${t.color}` : e.titleFontPaintAuthored === !0 ? e.titleFontColor ? `#${e.titleFontColor}` : "transparent" : e.titleFontColor ? `#${e.titleFontColor}` : "#333"
	};
}
function Vi(e, t, n, r) {
	let i = t.titleRichRuns?.length ? t.titleRichRuns : t.title ? [{ text: t.title }] : [], a = [{
		pieces: [],
		width: 0,
		height: r
	}], o = () => {
		let e = {
			pieces: [],
			width: 0,
			height: r
		};
		return a.push(e), e;
	}, s = a[0];
	for (let a of i) {
		let i = Bi(t, a, r);
		for (let t of a.text.split(/(\n|[\t ]+)/).filter((e) => e.length > 0)) {
			if (t === "\n") {
				s = o();
				continue;
			}
			e.font = i.font;
			let r = e.measureText(t).width, a = /^[\t ]+$/.test(t);
			!a && s.pieces.length > 0 && s.width + r > n && (s = o()), !(a && s.pieces.length === 0) && (s.pieces.push({
				text: t,
				width: r,
				font: i.font,
				color: i.color
			}), s.width += r, s.height = Math.max(s.height, i.fontSize));
		}
	}
	return a;
}
function Hi(e, t, n, r, i) {
	let a = _n(t, r, i);
	if (a.bandH === 0 || !t.titleRichRuns?.length) return a;
	let o = e.font, s = Vi(e, t, Math.max(1, n), a.fontPx);
	e.font = o;
	let c = s.reduce((e, t) => e + t.height, 0);
	return {
		...a,
		bandH: a.topPad + c + a.bottomPad
	};
}
function Ui(e, t, n, r, i, a) {
	if (!t.title) return;
	let o = Qt(t, t.titleStyle ? { style: t.titleStyle } : void 0, t.chartStyleRoles?.title, _t(t, "title"), !0), s = a / Math.max(1, (t.titleFontSizeHpt ?? 1400) / 100);
	if (!t.titleRichRuns?.length) {
		let c = Gt(t, t.titleFontFace);
		e.font = un(a, c ? `"${c}", Calibri, Arial, sans-serif` : "Calibri, Arial, sans-serif", t.titleFontBold ?? !0, t.titleFontItalic ?? !1), e.fillStyle = t.titleFontColor ? `#${t.titleFontColor}` : "#333", e.textAlign = "center", e.textBaseline = "top";
		let l = Math.min(i, e.measureText(t.title).width);
		ft(e, o, {
			x: n + (i - l) / 2,
			y: r,
			w: l,
			h: a * 1.2
		}, s), e.fillText(t.title, n + i / 2, r);
		return;
	}
	e.save();
	let c = Vi(e, t, Math.max(1, i), a), l = Math.min(i, Math.max(...c.map((e) => e.width), 0)), u = c.reduce((e, t) => e + t.height, 0);
	ft(e, o, {
		x: n + (i - l) / 2,
		y: r,
		w: l,
		h: u
	}, s), e.textAlign = "left", e.textBaseline = "top";
	let d = r;
	for (let t of c) {
		let r = n + (i - t.width) / 2;
		for (let n of t.pieces) e.font = n.font, e.fillStyle = n.color, e.fillText(n.text, r, d), r += n.width;
		d += t.height;
	}
	e.restore();
}
function Wi(e, t, n, r, i, a, o, s) {
	if (!t.title) return;
	let c = t.titleManualLayout;
	if (c) {
		let l = Gt(t, t.titleFontFace);
		e.font = un(s, l ? `"${l}", Calibri, Arial, sans-serif` : "Calibri, Arial, sans-serif", t.titleFontBold ?? !0, t.titleFontItalic ?? !1);
		let u = Vi(e, t, Math.max(1, i), s), d = Math.min(i, Math.max(...u.map((e) => e.width), 0)), f = {
			x: n + (i - d) / 2,
			y: o,
			w: d,
			h: s
		}, p = Dn({
			...c,
			w: void 0,
			h: void 0
		}, {
			x: n,
			y: r,
			w: i,
			h: a
		}, f);
		if (p) {
			Ui(e, t, p.x, p.y, p.w, s);
			return;
		}
	}
	Ui(e, t, n, o, i, s);
}
//#endregion
//#region packages/core/src/chart/shared/line-decorations.ts
function Gi(e, t, n, r, i, a, o, s, c, l, u, d = 0) {
	let f = Number.isFinite(c.gapWidthPercent) && c.gapWidthPercent >= 0 ? c.gapWidthPercent : 150, p = Math.max(0, s / (1 + f / 100));
	for (let s = 0; s < r; s++) {
		let r = t(s), f = n(s);
		if (r == null || f == null || !Number.isFinite(r) || !Number.isFinite(f)) continue;
		let m = a(r), h = o(f), g = Math.abs(h - m);
		if (!(p > 0) || !(g > 0) || !Number.isFinite(g)) continue;
		let v = f >= r ? c.up : c.down, y = v.fillPaintAuthored === !0 || v.fill != null || v.fillColor != null || v.fillHidden === !0 ? void 0 : f >= r ? u?.upFillColor : u?.downFillColor, b = v.fillColor ?? y, x = i(s) - p / 2, S = Math.min(m, h), C = v.linePaintAuthored === !0 || v.lineColor != null || v.lineHidden === !0, w = v.lineColor ?? (C ? void 0 : u?.lineColor), T = v.lineWidthEmu ?? (C ? void 0 : u?.lineWidthEmu);
		_(e, v.style, void 0, s, {
			x,
			y: S,
			w: p,
			h: g
		}, l, (e) => {
			if (!v.fillHidden && (v.fill != null || b != null) && mr(e, v.fill ?? (b ? {
				fillType: "solid",
				color: b
			} : null), {
				x,
				y: S,
				w: p,
				h: g
			}, b ? `#${b}` : "rgba(0,0,0,0)", l, d), !v.lineHidden && (v.linePaintAuthored !== !0 || w != null) && (w != null || T != null)) {
				let t = e.getLineDash(), n = e.lineCap, r = e.lineJoin;
				e.strokeStyle = `#${w ?? "000000"}`, e.lineWidth = T == null ? Math.max(1, .75 * l) : Ae(T, l), e.setLineDash(tn(v.lineDash ?? void 0, e.lineWidth)), e.lineCap = v.lineCap === "rnd" ? "round" : v.lineCap === "sq" ? "square" : "butt", e.lineJoin = v.lineJoin === "round" || v.lineJoin === "bevel" ? v.lineJoin : "miter", e.strokeRect(x, S, p, g), e.setLineDash(t), e.lineCap = n, e.lineJoin = r;
			}
		});
	}
}
function Ki(t, n, r, i, a, o, s, c, l, u, d) {
	for (let f of n.lineGroupDecorations ?? []) {
		let p = n.series.filter((e) => e.lineGroupIndex === f.groupIndex);
		if (p.length === 0 && f.groupIndex === 0 && [
			"line",
			"stackedLine",
			"stackedLinePct"
		].includes(n.chartType) && (p = n.series.filter((e) => e.seriesType == null || e.seriesType === "line")), p.length === 0) continue;
		if (d === "foreground" && f.upDownBars && p.length >= 2) {
			let e = p[0], o = p[p.length - 1], d = n.legacyChartStyle === 2 ? {
				lineColor: "000000",
				lineWidthEmu: 9525,
				upFillColor: "FFFFFF",
				downFillColor: "000000"
			} : void 0, m = {
				...f.upDownBars,
				up: hn(n, f.upDownBars.up, "upBar", d),
				down: hn(n, f.upDownBars.down, "downBar", d)
			};
			Gi(t, (t) => s(e, t), (e) => s(o, e), r, i, a(e), a(o), c, m, l, void 0, u);
		}
		if (d === "foreground") continue;
		let m = f.dropLines ? Pt(n, f.dropLines, "dropLine") : null;
		m && e(t, m, l) && ct(t, p, r, i, a, o, s);
		let h = f.hiLowLines ? Pt(n, f.hiLowLines, "hiLoLine") : null;
		if (h && p.length >= 2 && e(t, h, l)) {
			let e = a(p[0]);
			for (let n = 0; n < r; n++) {
				let r = Infinity, a = -Infinity;
				for (let e of p) {
					let t = s(e, n);
					t == null || !Number.isFinite(t) || (r = Math.min(r, t), a = Math.max(a, t));
				}
				!Number.isFinite(r) || !Number.isFinite(a) || (t.beginPath(), t.moveTo(i(n), e(r)), t.lineTo(i(n), e(a)), t.stroke());
			}
		}
	}
}
function qi(e, t, n, r) {
	return e != null && Number.isFinite(e) ? gt(e, n, r) : t === "max" ? r : t === "min" ? n : gt(0, n, r);
}
function Ji(e, t, n) {
	return qi(e.catAxisCrossesAt, e.catAxisCrosses, t, n);
}
//#endregion
//#region packages/core/src/chart/families/bar.ts
function Yi(e) {
	return 7 * e;
}
function Xi(t, n, r, i, s = {}, l = 0) {
	let { x: u, y: p, w: m, h: g } = r, v = n.chartType === "clusteredBarH" || n.chartType === "stackedBarH" || n.chartType === "stackedBarHPct", x = n.chartType.startsWith("stacked"), C = n.chartType === "stackedBarPct" || n.chartType === "stackedBarHPct", E = n.series.filter((e) => e.seriesType !== "line" && e.seriesType !== "scatter" && e.seriesType !== "area"), O = (e) => e.barGroupDirection == null ? v : e.barGroupDirection === "bar", A = E, j = (e) => e.useSecondaryAxis === !0 ? "secondary-default" : "primary-default", ee = (e) => e.barGroupIndex == null ? j(e) : `group-${e.barGroupIndex}`, N = (e) => e.barGroupGrouping ?? (C ? "percentStacked" : x ? "stacked" : "clustered"), te = (e) => {
		let t = N(e);
		return t === "stacked" || t === "percentStacked";
	}, F = (e) => N(e) === "percentStacked", I = n.series.filter((e) => e.seriesType === "line"), L = n.series.filter((e) => e.seriesType === "area"), R = n.series.filter((e) => e.seriesType === "scatter"), se = new Map(n.series.map((e, t) => [e, t])), ce = /* @__PURE__ */ new Map();
	for (let e of n.plotGroups ?? []) for (let t = e.seriesStart; t < e.seriesStart + e.seriesCount; t++) {
		let r = n.series[t];
		r && ce.set(r, e);
	}
	let le = /* @__PURE__ */ new Map();
	for (let e of n.plotGroups ?? []) {
		if (e.seriesCount === 0) continue;
		let t = le.get(e.valueAxis) ?? {
			count: 0,
			percentCount: 0
		};
		t.count++, e.grouping === "percentStacked" && t.percentCount++, le.set(e.valueAxis, t);
	}
	let ue = (e) => {
		let t = le.get(e.valueAxis);
		return t != null && t.count === t.percentCount;
	}, de = Xr(n, i), z = n.series.some((e) => e.useSecondaryAxis === !0), B = !v && n.secondaryValAxis && z ? n.secondaryValAxis : null, V = !v && n.chartexPrimaryAxisRight === !0, me = B ? A.filter((e) => e.useSecondaryAxis === !0) : [], _e = B ? A.filter((e) => e.useSecondaryAxis !== !0) : A, xe = me.length > 0 ? n.secondaryCatAxis : null, Se = me[0]?.categories?.length ? me[0].categories : n.categories, Ce = ge(n), H = Ce.length;
	if (H === 0) return;
	let Te = /* @__PURE__ */ new Map();
	for (let e of A) {
		let t = ee(e), n = Te.get(t);
		n ? n.push(e) : Te.set(t, [e]);
	}
	let Ee = (e) => Te.get(ee(e)) ?? [e], ke = /* @__PURE__ */ new Map();
	for (let [e, t] of Te) {
		let n = Array(H).fill(0);
		for (let e of t) for (let t = 0; t < H; t++) n[t] += Math.abs(e.values[t] ?? 0);
		ke.set(e, n);
	}
	let Ne = (e, t) => ke.get(ee(e))?.[t] || 1, Le = (e) => {
		let t = ce.get(e);
		return t == null || ue(t) ? 100 : 1;
	}, Ve = (e, t) => F(e) ? Le(e) / Ne(e, t) : 1, He = /* @__PURE__ */ new Map(), Ue = /* @__PURE__ */ new Map();
	for (let e of [...I, ...L]) He.set(e, Array.from({ length: H }, (t, n) => e.values[n] ?? 0)), Ue.set(e, Array(H).fill(0));
	for (let e of n.plotGroups ?? []) {
		if (e.kind !== "line" && e.kind !== "area") continue;
		let t = n.series.slice(e.seriesStart, e.seriesStart + e.seriesCount), r = e.grouping === "stacked" || e.grouping === "percentStacked", i = e.grouping === "percentStacked", a = i && ue(e) ? 100 : 1;
		for (let e = 0; e < H; e++) {
			let n = i && t.reduce((t, n) => t + Math.abs(n.values[e] ?? 0), 0) || 1, o = 0;
			for (let s of t) {
				let t = s.values[e] ?? 0, c = i ? t / n * a : t, l = Ue.get(s), u = He.get(s);
				l == null || u == null || (l[e] = r ? o : 0, o = r ? o + c : c, u[e] = o);
			}
		}
	}
	let We = (e, t) => He.get(e)?.[t] ?? e.values[t] ?? 0, U = (e, t) => Ue.get(e)?.[t] ?? 0, qe = (e) => F(e) ? (e.errBars ?? []).map((t) => ({
		...t,
		plus: t.plus.map((t, n) => t == null ? t : t * Ve(e, n)),
		minus: t.minus.map((t, n) => t == null ? t : t * Ve(e, n))
	})) : e.errBars ?? [], Je = (e) => {
		let t = ce.get(e);
		return t?.kind === "bar" || t?.kind === "bar3D" ? t.seriesCount === 1 && t.varyColors === !0 : Ge(n);
	}, Ye = A.map((e) => new Map((e.dataPointOverrides ?? []).map((e) => [e.idx, e]))), Ze = A.map((e) => new Map((e.dataLabelOverrides ?? []).map((e) => [e.idx, e]))), Qe = A.map((e, t) => y(e, t)), $e = ie(n), et = $e && An(n, A), tt = /* @__PURE__ */ new Map();
	$e && A.forEach((e, t) => {
		let r = Qe[t], i = e.color ?? sr(n, r, A.length, e.chartexStyle);
		tt.set(e, wr(n, e.name, e, n.chartexDataPointStyle, r, A.length, i, !1, !0, !0));
	});
	let W = A.findIndex(Je), nt = W >= 0 ? A[W] : void 0, G = {
		...n,
		series: ($e ? A : n.series).map((e) => tt.get(e) ?? e)
	}, K = Hi(t, n, m, g, i), q = K.fontPx, J = K.topPad, ct = K.bandH, ut = he(n.catAxisFontSizeHpt, g, i), dt = he(n.valAxisFontSizeHpt, g, i), ft = !v && !ui(n) && n.catAxisNoMultiLevelLabels !== !0 && (n.categoryLevels?.length ?? 0) > 1 ? n.categoryLevels : null, pt = ft ? (ft.length - 1) * (ut + 4) : 0, ht = ui(n), vt = fi(n, i), yt = pi(t, n, i), bt = ai(t, G, m, g, .22, i), { legRightW: xt, legLeftW: Ct, legTopH: wt, legBottomH: Ot } = Kt(bt, n.legendOverlay === !0), kt = $t(n, m, g, i), At = kt.catFontPx, jt = kt.valFontPx, Mt = v ? n.valAxisTitle ? jt + cn(g) + 4 : 0 : kt.catBandH, It = v ? n.catAxisTitle ? At + cn(m) + 4 : 0 : kt.valBandW, Vt = ot(xe?.fontSizeHpt, i) ?? 9 * i, Wt = xe && !xe.hidden && xe.tickLabelPos !== "none" ? Vt + Ie(St(Vt), xe.labelOffsetPercent) + 2 : 0, Gt = xe?.title ? Zt(xe.titleFontSizeHpt, i) + 6 : 0, qt = ct + wt + dt / 2 + 2 + Wt + Gt, Jt = v ? (n.valAxisHidden ? g * .02 : mt(dt)) + vt + Mt + Ot : (ht ? 0 : mt(ut, n.catAxisLabelOffsetPercent, n.cartesianAutoLayoutProfile)) + pt + vt + Mt + Ot, Yt = g - qt - Jt, Qt = 0;
	if (v && !n.catAxisHidden && T(n)) {
		let e = n.catAxisFontSizeHpt == null ? Math.max(8, Math.min(11, Yt / H * .5)) : ut;
		t.save(), t.font = un(e, Y(n, n.catAxisFontFace, "minor"), n.catAxisFontBold ?? !1, n.catAxisFontItalic ?? !1);
		for (let e of Ce) Qt = Math.max(Qt, t.measureText(vn(e, n.catAxisFormatCode, n.date1904)).width);
		t.restore(), Qt += Ie(n.catAxisFontSizeHpt == null ? 4 : Me(e), n.catAxisLabelOffsetPercent) + st * i;
	}
	let en = Math.min(Qt, Math.max(0, m / 2 - It - Ct)), tn = v ? m - ((n.catAxisHidden ? m * .03 : en) + It + Ct) - (xt + m * .03) : 0, rn = n.valAxisHidden ? void 0 : (v ? tn : Yt) / i, an = (e, t) => {
		let n = A[e], r = n?.values[t] ?? 0;
		if (!n || !te(n)) return r;
		let i = Ee(n), a = F(n), o = 1;
		a && (o = i.reduce((e, n) => e + Math.abs(n.values[t] ?? 0), 0) || 1);
		let s = a ? Ve(n, t) * o : 1, c = a ? r / o * s : r, l = 0, u = i.indexOf(n);
		for (let e = 0; e <= u; e++) {
			let n = i[e]?.values[t] ?? 0, r = a ? n / o * s : n;
			c < 0 == r < 0 && (l += r);
		}
		return l;
	}, on = (n.plotGroups ?? []).filter((e) => e.seriesCount > 0 && e.valueAxis !== "secondary"), sn = on.length > 0 ? on.every((e) => e.grouping === "percentStacked") : _e.some(F), fn = 0, pn = 0;
	for (let e = 0; e < H; e++) {
		let t = /* @__PURE__ */ new Map();
		for (let e of _e) {
			let n = ee(e), r = t.get(n);
			r ? r.push(e) : t.set(n, [e]);
		}
		for (let n of t.values()) {
			let t = n[0], r = te(t), i = F(t), a = i && n.reduce((t, n) => t + Math.abs(n.values[e] ?? 0), 0) || 1, o = 0, s = 0;
			for (let t of n) {
				let n = t.values[e] ?? 0, c = i ? n / a * Le(t) : n;
				r ? c >= 0 ? o += c : s += c : (fn = Math.max(fn, c), pn = Math.min(pn, c));
			}
			r && (fn = Math.max(fn, o), pn = Math.min(pn, s));
		}
	}
	for (let e of [...I, ...L]) if (!(B && e.useSecondaryAxis === !0)) for (let t = 0; t < H; t++) {
		if (e.values[t] == null) continue;
		let n = We(e, t);
		fn = Math.max(fn, n), pn = Math.min(pn, n);
	}
	for (let e of _e) {
		let t = A.indexOf(e);
		for (let n of qe(e)) h({
			...e,
			errBars: [n]
		}, v ? "x" : "y", (n) => e.values[n] == null ? null : an(t, n), (e) => {
			fn = Math.max(fn, e), pn = Math.min(pn, e);
		});
	}
	for (let e of [...I, ...L]) B && e.useSecondaryAxis === !0 || h(e, "y", (t) => e.values[t] ?? null, (e) => {
		let t = e;
		fn = Math.max(fn, t), pn = Math.min(pn, t);
	});
	sn && (_e.some((e) => e.values.some((e) => e != null && e > 0)) && (fn = Math.max(fn, 100)), _e.some((e) => e.values.some((e) => e != null && e < 0)) && (pn = Math.min(pn, -100))), n.valMax != null && (fn = sn ? n.valMax * 100 : n.valMax), n.valMin != null && (pn = sn ? n.valMin * 100 : n.valMin), fn === 0 && pn === 0 && (fn = 1);
	let mn = et ? En(n, _e, H, rn) : ae(n, pn, fn, rn, sn, v ? "horizontal" : "vertical"), { step: hn } = mn, gn = new Set(A), _n = new Set(E), xn = (n.plotGroups ?? []).filter((e) => e.seriesCount > 0 && e.valueAxis === "secondary"), wn = xn.length > 0 ? xn.every((e) => e.grouping === "percentStacked") : me.some(F), Tn = n.series.filter((e) => !_n.has(e) || gn.has(e)).map((e) => {
		if (e.useSecondaryAxis !== !0) return e;
		if (gn.has(e)) {
			let t = A.indexOf(e);
			return {
				...e,
				values: e.values.map((e, n) => e == null ? e : an(t, n)),
				errBars: qe(e)
			};
		}
		return wn ? {
			...e,
			values: e.values.map((e) => e == null ? e : e * 100),
			errBars: (e.errBars ?? []).map((e) => ({
				...e,
				plus: e.plus.map((e) => e == null ? e : e * 100),
				minus: e.minus.map((e) => e == null ? e : e * 100)
			}))
		} : e;
	});
	if (wn && me[0]) {
		let e = [];
		me.some((e) => e.values.some((e) => e != null && e > 0)) && e.push(100), me.some((e) => e.values.some((e) => e != null && e < 0)) && e.push(-100), Tn.push({
			...me[0],
			values: e,
			errBars: []
		});
	}
	let Dn = f(B, Tn, Yt / i, v ? "x" : "y", wn, me.length > 0), On = Math.max(8, Math.min(11, g / 20)), Mn = n.valAxisFontSizeHpt == null ? Math.max(8, Math.min(11, Yt / 20)) : dt, Pn = t.font, Fn = 0, Ln = 0;
	if (!v && !n.valAxisHidden) {
		t.font = un(Mn, Y(n, n.valAxisFontFace, "minor"), n.valAxisFontBold ?? !1, n.valAxisFontItalic ?? !1);
		let e = 0;
		for (let r of mn.majorLines) {
			let i = k(n, r, sn);
			e = Math.max(e, t.measureText(i).width);
		}
		Fn = e, Ln = Fn + 16;
	}
	let Rn = ot(B?.fontSizeHpt, i) ?? On, zn = 0;
	if (B && !B.hidden) {
		t.font = `${Rn}px ${Y(n, B.fontFace, "minor")}`;
		let e = 0;
		for (let r of Dn?.majorLines ?? []) e = Math.max(e, t.measureText(Ke(wn ? r / 100 : r, B.formatCode ?? null, n.date1904, B.displayUnits)).width);
		zn = e + 18;
	}
	t.font = Pn;
	let Bn = B && B.title ? Zt(B.titleFontSizeHpt, i) + 8 : 0, Vn = {
		t: qt,
		r: xt + m * .03 + (V ? Ln + It : zn + Bn),
		b: Jt,
		l: v ? Ct + Math.max((n.catAxisHidden ? m * .03 : en) + It, yt) : Ct + Math.max(V ? zn + Bn : It + Ln, yt)
	};
	Vn.t = ea(n, bt, u, p, m, g, ct, Vn.t);
	let Hn = v ? {
		t: 0,
		r: n.valAxisHidden ? 0 : Mn / 2,
		b: n.valAxisHidden ? 0 : Mn + Mt,
		l: n.catAxisHidden ? 0 : Qt + It
	} : Et({
		valAxisHidden: n.valAxisHidden,
		catAxisHidden: n.catAxisHidden,
		valLabelWidth: Fn,
		valLabelFontPx: Mn,
		catLabelFontPx: ut,
		valLabelGapPx: n.valAxisFontSizeHpt == null ? 12 : Me(Mn),
		catLabelGapPx: n.catAxisFontSizeHpt == null ? Ie(3, n.catAxisLabelOffsetPercent) : Ie(St(ut), n.catAxisLabelOffsetPercent),
		outerTextMarginPx: st * i,
		valTitleBandW: It,
		catTitleBandH: Mt,
		secondaryBandW: zn + Bn
	}), Un = jn(n, u, p, m, g, i, {
		titleBand: K,
		legendSideReserveFrac: .22,
		legendReserve: bt,
		pad: Vn,
		honorPlotAreaManualLayout: !0,
		manualOuterInsets: Hn
	}), Wn = Hi(t, n, Un.plotRect.pw, g, i);
	Math.abs(Wn.bandH - K.bandH) > .01 && (K = Wn, q = K.fontPx, J = K.topPad, ct = K.bandH, qt = ct + wt + dt / 2 + 2 + Wt + Gt, Vn.t = ea(n, bt, u, p, m, g, ct, qt), Un = jn(n, u, p, m, g, i, {
		titleBand: K,
		legendSideReserveFrac: .22,
		legendReserve: bt,
		pad: Vn,
		honorPlotAreaManualLayout: !0,
		manualOuterInsets: Hn
	}));
	let { px0: X, py0: Z, pw: Q } = Un.plotRect, { ph: $ } = Un.plotRect;
	if (Wi(t, n, n.titleManualLayout || !n.titleRichRuns?.length ? u : X, p, n.titleManualLayout || !n.titleRichRuns?.length ? m : Q, g, p + J, q), Q <= 0 || $ <= 0) return;
	let Gn = je(n, Ce, v ? !Ft(n) : Ft(n)), Kn = et ? lt(n, A, Gn) : null, qn = be(n), Jn = [], Yn = 0;
	if (!ht && !v && !Gn && !n.catAxisHidden && T(n) && qn === 0) {
		let e = Q / H, r = n.catAxisFontSizeHpt == null ? Math.max(8, Math.min(11, e * .5)) : ut;
		t.save(), t.font = un(r, Y(n, n.catAxisFontFace, "minor"), n.catAxisFontBold ?? !1, n.catAxisFontItalic ?? !1);
		for (let i of Ce) {
			let a = vn(i, n.catAxisFormatCode, n.date1904);
			Jn.push(we(t, a, Math.max(1, e), $i(a, r)));
		}
		t.restore();
		let i = Math.max(1, ...Jn.map((e) => e.length));
		!(n.plotAreaManualLayout?.layoutTarget === "inner" && n.plotAreaManualLayout.w != null && n.plotAreaManualLayout.h != null) && i > 1 && (Yn = (i - 1) * (r + 2), $ = Math.max(1, $ - Yn));
	}
	let Xn = ht ? mi(t, n, Q / H, i) : null;
	Xn && Xn.totalHeight > vt && ($ = Math.max(1, $ - (Xn.totalHeight - vt))), dn(t, n, X, Z, Q, $, i, l);
	let Zn = (e) => Z + $ - mn.frac(e) * $, Qn = (e) => X + mn.frac(e) * Q, $n = Zn(0), er = Qn(0), tr = (e) => Zn(e), nr = Dn ? Dn.makeToY(Z, $) : Zn, rr = (e) => nr(e), ir = Xe(n, i);
	t.textBaseline = "middle";
	let ar = n.valAxisFontSizeHpt == null ? Math.max(8, Math.min(11, $ / 20)) : dt;
	t.font = un(ar, Y(n, n.valAxisFontFace, "minor"), n.valAxisFontBold ?? !1, n.valAxisFontItalic ?? !1);
	let or = n.valAxisFontColor ? `#${n.valAxisFontColor}` : "#555";
	if (t.fillStyle = or, !n.valAxisHidden) {
		let e = rt(n, i);
		for (let n of mn.minorLines) if (!v) re(t, X, Q, Zn(n), !1, e);
		else {
			let r = Qn(n);
			t.strokeStyle = e.color, t.lineWidth = e.width;
			let i = e.dash.length > 0 && t.getLineDash ? t.getLineDash() : [];
			e.dash.length > 0 && t.setLineDash(e.dash), t.beginPath(), t.moveTo(r, Z), t.lineTo(r, Z + $), t.stroke(), e.dash.length > 0 && t.setLineDash(i);
		}
		let r = ze(n), a = n.valAxisTickLabelPos !== "none";
		for (let e of mn.majorLines) {
			let o = Math.abs(e) < hn * 1e-9, c = k(n, e, sn);
			if (v) {
				let i = Qn(e);
				if (r) {
					t.strokeStyle = ir.explicit ? ir.color : o ? "#aaa" : ir.color, t.lineWidth = ir.explicit ? ir.width : o ? 1 : ir.width;
					let e = ir.dash.length > 0 && t.getLineDash ? t.getLineDash() : [];
					ir.dash.length > 0 && t.setLineDash(ir.dash), t.beginPath(), t.moveTo(i, Z), t.lineTo(i, Z + $), t.stroke(), ir.dash.length > 0 && t.setLineDash(e);
				}
				if (a) {
					t.textAlign = "center";
					let e = n.valAxisFontSizeHpt == null ? 10 : St(ar);
					t.fillText(c, i, Z + $ + e);
				}
			} else {
				let l = Zn(e);
				if (r && re(t, X, Q, l, o, ir), a) {
					t.textAlign = V ? "left" : "right";
					let e = s.gapPolicy === "chartex" ? Yi(i) : n.valAxisFontSizeHpt == null ? 12 : Me(ar);
					t.fillText(c, V ? X + Q + e : X - e, l);
				}
			}
		}
	}
	if (B && Dn && b(t, B, Dn, nr, X, Q, i), !n.catAxisHidden && c(n)) {
		let e = fe(n, i);
		t.strokeStyle = e.color, t.lineWidth = e.width;
		let r = e.dash.length > 0 && t.getLineDash ? t.getLineDash() : [];
		e.dash.length > 0 && t.setLineDash(e.dash);
		let a = Gn ? Gn.majorTicks.map((e) => e.fraction) : pe(n, H);
		for (let e of a) {
			if (t.beginPath(), v) {
				let n = Z + e * $;
				t.moveTo(X, n), t.lineTo(X + Q, n);
			} else {
				let n = X + e * Q;
				t.moveTo(n, Z), t.lineTo(n, Z + $);
			}
			t.stroke();
		}
		e.dash.length > 0 && t.setLineDash(r);
	}
	let { color: cr, width: lr } = d(n.catAxisLineColor, n.catAxisLineWidthEmu, i), { color: ur, width: fr } = d(n.valAxisLineColor, n.valAxisLineWidthEmu, i), hr = !n.catAxisHidden && !n.catAxisLineHidden, gr = !n.valAxisHidden && !n.valAxisLineHidden && n.valAxisLineColor != null, vr = Ji(n, mn.min, mn.max), Tr = v ? Z + $ : Zn(vr), Er = v ? Qn(vr) : X, Dr = !v && (n.catAxisTickLabelPos ?? "nextTo") === "nextTo" ? Tr : Z + $, Or = Math.max(1, Math.floor(n.catAxisTickMarkSkip ?? 1)), kr = !v && ft != null && Gn == null && !n.catAxisLineHidden && In(n) && Math.abs(Dr - Tr) < .01, Ar = () => {
		if (v) hr && nn(t, Er, Z, Er, Z + $, cr, lr, n.catAxisLineDash), gr && nn(t, X, Z + $, X + Q, Z + $, ur, fr, n.valAxisLineDash);
		else if (hr && nn(t, X, Tr, X + Q, Tr, cr, lr, n.catAxisLineDash), gr) {
			let e = V ? X + Q : X;
			nn(t, e, Z, e, Z + $, ur, fr, n.valAxisLineDash);
		}
		if (!n.valAxisHidden && n.valAxisMajorTickMark && n.valAxisMajorTickMark !== "none") for (let e of mn.majorLines) v ? De(t, n.valAxisMajorTickMark, "cat", Z + $, Qn(e), ur, fr, !1, n.valAxisLineHidden, "major", i, n.valAxisLineDash) : De(t, n.valAxisMajorTickMark, "val", V ? X + Q : X, Zn(e), ur, fr, V, n.valAxisLineHidden, "major", i, n.valAxisLineDash);
		if (!n.valAxisHidden && n.valAxisMinorTickMark && n.valAxisMinorTickMark !== "none") for (let e of mn.minorTicks) v ? De(t, n.valAxisMinorTickMark, "cat", Z + $, Qn(e), ur, fr, !1, n.valAxisLineHidden, "minor", i, n.valAxisLineDash) : De(t, n.valAxisMinorTickMark, "val", V ? X + Q : X, Zn(e), ur, fr, V, n.valAxisLineHidden, "minor", i, n.valAxisLineDash);
		if (!n.catAxisHidden && n.catAxisMajorTickMark && n.catAxisMajorTickMark !== "none") {
			let e = kr ? [] : pe(n, H), r = Gn ? Gn.majorTicks.map((e) => e.fraction) : e.filter((e, t) => t % Or === 0);
			for (let e of r) v ? De(t, n.catAxisMajorTickMark, "val", Er, Z + e * $, cr, lr, !1, n.catAxisLineHidden, "major", i, n.catAxisLineDash) : De(t, n.catAxisMajorTickMark, "cat", Tr, X + e * Q, cr, lr, !1, n.catAxisLineHidden, "major", i, n.catAxisLineDash);
		}
		if (!n.catAxisHidden && n.catAxisMinorTickMark && n.catAxisMinorTickMark !== "none") {
			let e = In(n) ? Array.from({ length: H }, (e, t) => (t + .5) / H) : Array.from({ length: Math.max(0, H - 1) }, (e, t) => (t + .5) / (H - 1)), r = Gn ? Gn.minorTicks.map((e) => e.fraction) : e;
			for (let e of r) v ? De(t, n.catAxisMinorTickMark, "val", Er, Z + e * $, cr, lr, !1, n.catAxisLineHidden, "minor", i, n.catAxisLineDash) : De(t, n.catAxisMinorTickMark, "cat", Tr, X + e * Q, cr, lr, !1, n.catAxisLineHidden, "minor", i, n.catAxisLineDash);
		}
	}, Nr = (e) => e ? $ / H : Q / H, Pr = Nr(v), Fr = Ft(n), Ir = (e, t) => t ? Fr ? e : H - 1 - e : Fr ? H - 1 - e : e, Lr = (e, t = v) => Gn ? Gn.categoryBandFractions[e] * (t ? $ : Q) : Nr(t), Br = (e, t = v) => Gn ? (t ? Z : X) + Gn.positions[e] * (t ? $ : Q) - Lr(e, t) / 2 : (t ? Z : X) + Ir(e, t) * Nr(t), Vr = (e) => Gn ? X + Gn.positions[e] * Q : X + Ir(e, !1) * Nr(!1) + Nr(!1) / 2, Hr = (e, t) => {
		let r = e[0], i = r ? te(r) : x, a = i ? 1 : Math.max(1, e.length), o = r?.barGroupOverlap ?? n.barOverlap ?? 0, c = i || !Number.isFinite(o) ? 0 : Math.max(-100, Math.min(100, o)), l = Bt(r?.barGroupGapWidth ?? n.barGapWidth, s.gapPolicy ?? "legacy"), u = t / (1 + (a - 1) * (1 - c / 100) + l / 100), d = i ? 0 : u * (1 - c / 100);
		return {
			barW: u,
			clusterGap: d,
			catStart: (t - (u + (a - 1) * d)) / 2
		};
	}, Ur = (n.barGroupDecorations ?? []).some((e) => e.seriesLines?.length === 1) ? A.map(() => Array(H).fill(null)) : null;
	for (let e = 0; e < L.length; e++) {
		let r = L[e], s = ye(r.dataPointOverrides), c = se.get(r) ?? e, u = y(r, c), d = w(c, r), f = a(n, r, void 0, u), p = B && r.useSecondaryAxis === !0 ? rr : tr, m = n.dispBlanksAs ?? "zero", h = [], g = () => {
			if (h.length !== 0) {
				Gn && (t.save(), t.beginPath(), t.rect(X, Z, Q, $), t.clip()), t.beginPath(), t.moveTo(h[0].x, h[0].baseY), t.lineTo(h[0].x, h[0].y), yn(t, h, !1);
				for (let e = h.length - 1; e >= 0; e--) t.lineTo(h[e].x, h[e].baseY);
				t.closePath(), pr(t, f, {
					x: h[0].x,
					y: Z,
					w: Math.max(1, h[h.length - 1].x - h[0].x),
					h: $
				}, d, i, l), Re(t, n, "dataPoint", r, void 0, u, d, 1.5, i, {
					x: X,
					y: Z,
					w: Q,
					h: $
				}, l) && t.stroke(), Gn && t.restore(), h = [];
			}
		};
		for (let e = 0; e < H; e++) {
			if (r.sourceHidden?.[e] === !0) {
				g();
				continue;
			}
			r.values[e] == null && (m === "gap" && g(), m !== "zero") || h.push({
				x: Vr(e),
				y: p(We(r, e)),
				baseY: p(U(r, e))
			});
		}
		g();
		let _ = Mr(n, r, c), v = (r.showMarker === !0 || ne(r)) && r.markerSymbol !== "none";
		if (v || Ht(r)) {
			let e = Math.max(2, 2.5 * i);
			for (let a = 0; a < H; a++) {
				if (r.sourceHidden?.[a] === !0 || r.values[a] == null) continue;
				let c = s.get(a), u = ve(r, c, "circle", v);
				if (u === "none") continue;
				let f = Vr(a), m = p(We(r, a));
				if (_ || D(c)) {
					let e = c?.markerLineWidthEmu ?? r.markerLineWidthEmu;
					jr(t, n, r, c, a, f, m, u, c?.markerSize ?? r.markerSize ?? 5, o(r, c, a, d), c?.markerLine ?? r.markerLine ?? null, i, e == null ? void 0 : Ae(e, i), Lt(r, c, a), l);
				} else t.fillStyle = d, t.beginPath(), t.arc(f, m, e, 0, Math.PI * 2), t.fill();
			}
		}
	}
	for (let e = 0; e < H; e++) {
		let r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
		for (let s = 0; s < A.length; s++) {
			let c = A[s], d = O(c), f = Lr(e, d), h = B != null && c.useSecondaryAxis === !0, v = Ee(c), y = ee(c), b = te(c), x = F(c), C = x && v.reduce((t, n) => t + Math.abs(n.values[e] ?? 0), 0) || 1, T = r.get(y) ?? 0, E = o.get(y) ?? 0, D = Math.max(0, v.indexOf(c)), { barW: k, clusterGap: j, catStart: M } = Hr(v, f), N = h && Dn ? Dn.makeToY(Z, $) : Zn, ne = Dn ? xe?.crossesAt != null && Number.isFinite(xe.crossesAt) ? Math.max(Dn.min, Math.min(Dn.max, xe.crossesAt)) : xe?.crosses === "max" ? Dn.max : xe?.crosses === "min" ? Dn.min : Math.max(Dn.min, Math.min(Dn.max, 0)) : 0, re = h ? N(ne) : $n, ie = c.values[e] ?? 0, I = x ? ie / C * Le(c) : ie, ae = I < 0, L = h && Dn ? Dn.max : mn.max, R = ae && (c.invertIfNegative === !0 || c.automaticNegativeStyle === !0), ce = Ye[s].get(e), le = ce?.color ?? c.dataPointColors?.[e], ue = Je(c), fe = $e ? bn(n, c, s, e) : ue ? e : Qe[s], z = a(n, c, ce, fe, e), pe = z?.fillType === "solid" ? z.color.startsWith("#") ? z.color : `#${z.color}` : le ? `#${le}` : ue ? Rt(e, c) : w(s, c), V = R ? c.automaticNegativeStyle === !0 || c.invertedFillHidden === !0 ? null : c.invertedFill : void 0, me = _t(n, "dataPoint"), he = P(ce?.chartexStyle, me, fe), ge = ce?.fillHidden === !0 ? Oe(me) : void 0, _e = he !== void 0 || ge !== void 0 || ce?.color != null, ve = $e ? _r(n, c, ce, fe, A.length) : void 0, ye = ve === void 0 ? _e || V === void 0 ? z : V : ve, be = (e, t) => {
				if ($e) {
					let t = xr(n, c, ce, fe, A.length, pe);
					return t.paint && t.paint.fillType !== "solid" ? !1 : Sr(e, t, i);
				}
				if (ce?.lineHidden != null || ce?.lineColor != null || ce?.lineWidthEmu != null || ce?.lineDash != null || ce?.chartexStyle?.linePaintAuthored === !0 || ce?.chartexStyle?.lineHidden === !0) return Re(e, n, "dataPoint", c, ce, fe, pe, 1, i, t, l, !1);
				if (R && (c.invertedLineHidden != null || c.invertedLineColor != null || c.invertedLineWidthEmu != null)) return c.invertedLineHidden ? !1 : (e.strokeStyle = `#${c.invertedLineColor ?? "000000"}`, e.lineWidth = Ae(c.invertedLineWidthEmu, i), e.setLineDash([]), !0);
				if (c.automaticNegativeStyle === !0) return e.strokeStyle = "#000000", e.lineWidth = .75 * i, e.setLineDash([]), !0;
				let r = R && n.chartType === "clusteredBar" && n.legacyChartStyle === 2 && c.invertedFillAuthored === !0 && c.invertedFill != null && c.invertedLineAuthored === !1, a = c.lineHidden === !0 || c.lineColor != null || c.lineWidthEmu != null;
				if (r && a) return c.lineHidden || !c.lineColor ? !1 : (e.strokeStyle = `#${c.lineColor}`, e.lineWidth = Ae(c.lineWidthEmu, i), e.setLineDash([]), !0);
				if (r) return e.strokeStyle = "#000000", e.lineWidth = .75 * i, e.setLineDash([]), !0;
				let o = oe(n, "dataPoint", se.get(c) ?? s) ?? n.chartexDataPointStyle, u = Be(ce?.chartexStyle, fe), d = u === void 0 ? Be(c.chartexStyle, fe) : u;
				return !o && !$e && d === void 0 && !c.lineColor && c.lineHidden !== !0 ? !1 : Re(e, n, "dataPoint", c, ce, fe, pe, 1, i, t, l, !1);
			}, Se = S(ce?.chartexStyle, c.chartexStyle), we = (e, t, n, r, a) => {
				if (mr(e, ye === void 0 ? c.fillPattern : ye, {
					x: t,
					y: n,
					w: r,
					h: a
				}, pe, i, l), r > 0 && a > 0 && be(e, {
					x: t,
					y: n,
					w: r,
					h: a
				})) {
					let i = e.lineWidth;
					e.strokeRect(t + i / 2, n + i / 2, Math.max(0, r - i), Math.max(0, a - i));
				}
			};
			if (d) {
				let r = D, a = b ? Br(e, !0) + M : Br(e, !0) + M + r * j, o = b ? Qn(ae ? E : T) : er, d = Qn(b ? (ae ? E : T) + I : I), f = gt(Math.min(o, d), X, X + Q), h = gt(Math.max(o, d), X, X + Q), v = Math.max(0, h - f);
				Ur && c.values[e] != null && (Ur[s][e] = {
					categoryStart: a,
					categoryEnd: a + k,
					valueEnd: gt(d, X, X + Q)
				}), (!$e || Tt({
					categoryStart: a,
					categoryEnd: a + k,
					valueStart: o,
					valueEnd: d,
					clipCategory: !1,
					valueClipStart: X,
					valueClipEnd: X + Q
				})) && _(t, Se, oe(n, "dataPoint", se.get(c) ?? s), fe, {
					x: f,
					y: a,
					w: v,
					h: k
				}, i, (e) => we(e, f, a, v, k));
				let y = c.seriesDataLabels, S = Nt(n, c, e, c.categories?.[e] ?? Ce[e] ?? "", ie, {
					visible: n.showDataLabels,
					showVal: n.showDataLabels && !x,
					showPercent: n.showDataLabels && x,
					showCatName: !1
				}, Ze[s], x ? I / 100 : void 0, c.useSecondaryAxis && B ? B.displayUnits : n.valAxisDisplayUnits);
				if (S && bi(n, ie, L)) {
					let r = ot(S.fontSizeHpt ?? n.dataLabelFontSizeHpt, i) ?? Math.max(7, Math.min(11, k * .6)), o = Ze[s].get(e), d = S.fontBold || y?.fontBold == null && o?.fontBold == null, h = Y(n, S.fontFace ?? n.dataLabelFontFace, "minor");
					t.font = `${S.textStyle.fontItalic ? "italic " : ""}${d ? "bold " : ""}${r}px ${h}`, Zi(t, S.text, f, a, v, k, "horizontal", S.position ?? n.dataLabelPosition ?? (b ? "ctr" : null), c.dataLabelColors?.[e] ?? S.fontColor ?? c.labelColor ?? n.dataLabelFontColor ?? null, r, {
						x: X,
						y: Z,
						w: Q,
						h: $
					}, {
						x: u,
						y: p,
						w: m,
						h: g
					}, o?.manualLayout, ae, Ci(n, o, i, h, d, S.textStyle), S.showLegendKey ? de(se.get(c) ?? s, e) : void 0, S.textStyle, i, ln(o?.labelBox, y?.labelBox), l);
				}
			} else {
				let r = b ? Br(e, !1) + M : Br(e, !1) + M + D * j;
				if (!at(Kn, s, e) || r + k <= X || r >= X + Q) continue;
				let a = b ? N(ae ? E : T) : re, o = N(b ? (ae ? E : T) + I : I), d = gt(Math.min(a, o), Z, Z + $), f = gt(Math.max(a, o), Z, Z + $), h = Math.max(0, f - d);
				Ur && c.values[e] != null && (Ur[s][e] = {
					categoryStart: r,
					categoryEnd: r + k,
					valueEnd: gt(o, Z, Z + $)
				}), (!$e || Tt({
					categoryStart: r,
					categoryEnd: r + k,
					valueStart: a,
					valueEnd: o,
					clipCategory: !0,
					categoryClipStart: X,
					categoryClipEnd: X + Q,
					valueClipStart: Z,
					valueClipEnd: Z + $
				})) && _(t, Se, oe(n, "dataPoint", se.get(c) ?? s), fe, {
					x: r,
					y: d,
					w: k,
					h
				}, i, (e) => we(e, r, d, k, h));
				let v = c.seriesDataLabels, y = Nt(n, c, e, c.categories?.[e] ?? Ce[e] ?? "", ie, {
					visible: n.showDataLabels,
					showVal: n.showDataLabels && !x,
					showPercent: n.showDataLabels && x,
					showCatName: !1
				}, Ze[s], x ? I / 100 : void 0, c.useSecondaryAxis && B ? B.displayUnits : n.valAxisDisplayUnits);
				if (y && bi(n, ie, L)) {
					let a = ot(y.fontSizeHpt ?? n.dataLabelFontSizeHpt, i) ?? Math.max(7, Math.min(11, k * .6)), o = Ze[s].get(e), f = y.fontBold || v?.fontBold == null && o?.fontBold == null, _ = Y(n, y.fontFace ?? n.dataLabelFontFace, "minor");
					t.font = `${y.textStyle.fontItalic ? "italic " : ""}${f ? "bold " : ""}${a}px ${_}`, Zi(t, y.text, r, d, h, k, "vertical", y.position ?? n.dataLabelPosition ?? (b ? "ctr" : null), c.dataLabelColors?.[e] ?? y.fontColor ?? c.labelColor ?? n.dataLabelFontColor ?? null, a, {
						x: X,
						y: Z,
						w: Q,
						h: $
					}, {
						x: u,
						y: p,
						w: m,
						h: g
					}, o?.manualLayout, ae, Ci(n, o, i, _, f, y.textStyle), y.showLegendKey ? de(se.get(c) ?? s, e) : void 0, y.textStyle, i, ln(o?.labelBox, v?.labelBox), l);
				}
			}
			b && (ae ? o.set(y, E + I) : r.set(y, T + I));
		}
	}
	if (Ur) {
		let r = /* @__PURE__ */ new Map();
		for (let e = 0; e < A.length; e++) {
			let t = A[e].barGroupIndex ?? 0, n = r.get(t);
			n ? n.push(e) : r.set(t, [e]);
		}
		for (let a of n.barGroupDecorations ?? []) if (a.seriesLines?.length === 1) {
			if (t.save(), !e(t, Pt(n, a.seriesLines[0], "seriesLine"), i)) {
				t.restore();
				continue;
			}
			t.beginPath(), t.rect(X, Z, Q, $), t.clip();
			for (let e of r.get(a.groupIndex) ?? []) {
				let n = Ur[e], r = O(A[e]);
				for (let e = 0; e + 1 < H; e++) {
					let i = n[e], a = n[e + 1];
					if (!i || !a) continue;
					let o = (i.categoryStart + i.categoryEnd) / 2, s = (a.categoryStart + a.categoryEnd) / 2 >= o;
					t.beginPath(), r ? (t.moveTo(i.valueEnd, s ? i.categoryEnd : i.categoryStart), t.lineTo(a.valueEnd, s ? a.categoryStart : a.categoryEnd)) : (t.moveTo(s ? i.categoryEnd : i.categoryStart, i.valueEnd), t.lineTo(s ? a.categoryStart : a.categoryEnd, a.valueEnd)), t.stroke();
				}
			}
			t.restore();
		}
	}
	let Wr = (e, t) => {
		let n = Ee(e), r = Math.max(0, n.indexOf(e)), i = O(e), a = Hr(n, Lr(t, i)), o = Br(t, i) + a.catStart;
		return te(e) ? o + a.barW / 2 : o + r * a.clusterGap + a.barW / 2;
	}, Gr = (e, t) => {
		if (Number.isInteger(t) && t >= 0 && t < H) return Wr(e, t);
		let n = Ee(e), r = Math.max(0, n.indexOf(e)), i = O(e), a = Nr(i), o = Hr(n, a), s = i ? Fr ? t : H - 1 - t : Fr ? H - 1 - t : t;
		return (i ? Z : X) + s * a + o.catStart + (te(e) ? 0 : r) * o.clusterGap + o.barW / 2;
	};
	for (let e = 0; e < A.length; e++) {
		let a = A[e], o = O(a), s = B != null && a.useSecondaryAxis === !0, c = o ? Qn : s && Dn ? Dn.makeToY(Z, $) : Zn, u = w(e, a), d = (t) => an(e, t);
		for (let e of qe(a)) Qi(t, a, Xt(n, e), H, o, (e) => Wr(a, e), c, d, u, i);
		Rr(t, a, u, (e) => Gr(a, e - 1), c, i, a.values.map((e, t) => t + 1), {
			chart: n,
			chartRect: r,
			plotRect: {
				x: X,
				y: Z,
				w: Q,
				h: $
			},
			shapeRotationDeg: l
		}, (e, t) => o ? {
			x: c(t),
			y: Gr(a, e - 1)
		} : {
			x: Gr(a, e - 1),
			y: c(t)
		});
	}
	if ((!ht || v) && !n.catAxisHidden && T(n)) {
		t.fillStyle = n.catAxisFontColor ? `#${n.catAxisFontColor}` : "#555";
		let e = n.catAxisFontSizeHpt == null ? Math.max(8, Math.min(11, Pr * .5)) : ut;
		t.font = un(e, Y(n, n.catAxisFontFace, "minor"), n.catAxisFontBold ?? !1, n.catAxisFontItalic ?? !1);
		let r = Pr - 4, a = X - 4 - (u + Ct + It), o = qn, s = Gn ? Gn.majorTicks.map((e) => ({
			raw: vn(String(e.serial), n.catAxisFormatCode, n.date1904),
			fraction: e.fraction,
			categoryIndex: -1
		})) : Ce.map((e, t) => ({
			raw: vn(e.toString(), n.catAxisFormatCode, n.date1904),
			fraction: null,
			categoryIndex: t
		}));
		for (let i of s) {
			let { raw: s } = i;
			if (v) {
				let r = i.fraction == null ? Z + Ir(i.categoryIndex, !0) * Pr + Pr / 2 : Z + i.fraction * $, o = Ie(n.catAxisFontSizeHpt == null ? 4 : Me(e), n.catAxisLabelOffsetPercent), c = u + Ct + It, l = X - o, d = n.catAxisLabelAlignment, f = d === "l" ? c : d === "ctr" ? (c + l) / 2 : l;
				t.textAlign = d === "l" ? "left" : d === "ctr" ? "center" : "right", t.textBaseline = "middle", t.fillText(Pe(t, s, a), f, r);
			} else {
				let a = i.fraction != null || i.categoryIndex < 0 ? {
					fraction: i.fraction ?? .5,
					textAlign: "center"
				} : Cn(i.categoryIndex, H, In(n), Fr, n.catAxisLabelAlignment), c = X + a.fraction * Q;
				t.textAlign = a.textAlign, t.textBaseline = "top";
				let l = o === 0 ? r : $ * .4, u = Ie(n.catAxisFontSizeHpt == null ? 3 : St(e), n.catAxisLabelOffsetPercent);
				o === 0 ? (i.categoryIndex >= 0 ? Jn[i.categoryIndex] ?? [s] : [s]).forEach((n, r) => {
					t.fillText(n, c, Dr + u + r * (e + 2));
				}) : M(t, Pe(t, s, l), c, Dr + u, o);
			}
		}
		if (!v && ft) {
			let r = Ie(n.catAxisFontSizeHpt == null ? 3 : St(e), n.catAxisLabelOffsetPercent), a = e + 4;
			t.textAlign = "center", t.textBaseline = "top", t.strokeStyle = cr, t.lineWidth = lr, t.setLineDash([]);
			let o = (e) => {
				if (!kr || e % Or !== 0) return Dr;
				let t = zt("major", lr, i);
				return n.catAxisMajorTickMark === "cross" ? Dr - t / 2 : n.catAxisMajorTickMark === "in" ? Dr - t : Dr;
			}, s = /* @__PURE__ */ new Set();
			for (let e = 1; e < ft.length; e++) {
				let t = ft[e] ?? [];
				for (let e = 0; e < H; e++) (t[e] ?? "") !== "" && s.add(e);
				s.add(H);
			}
			let c = Dr + r + e + 2;
			for (let e = 0; e <= H; e++) {
				if (s.has(e)) continue;
				let n = X + e / H * Q;
				t.beginPath(), t.moveTo(n, o(e)), t.lineTo(n, c), t.stroke();
			}
			let l = /* @__PURE__ */ new Map();
			for (let i = 1; i < ft.length; i++) {
				let o = ft[i] ?? [], s = [];
				for (let e = 0; e < H; e++) (o[e] ?? "") !== "" && s.push(e);
				for (let c = 0; c < s.length; c++) {
					let u = s[c], d = s[c + 1] ?? H, f = o[u] ?? "", p = X + u / H * Q, m = X + d / H * Q, h = Dr + r + i * a, g = n.catAxisLabelAlignment, _ = g === "l" ? p : g === "r" ? m : (p + m) / 2;
					t.textAlign = g === "l" ? "left" : g === "r" ? "right" : "center", t.fillText(Pe(t, f, Math.max(0, m - p - 4)), _, h);
					let v = h + e + 2;
					for (let e of [u, d]) l.set(e, Math.max(l.get(e) ?? Dr, v));
				}
			}
			for (let [e, n] of l) {
				let r = X + e / H * Q;
				t.beginPath(), t.moveTo(r, o(e)), t.lineTo(r, n), t.stroke();
			}
		}
	}
	if (I.length > 0 && !v) {
		Ki(t, n, H, Vr, (e) => B && e.useSecondaryAxis === !0 ? rr : tr, () => Tr, (e, t) => e.values[t] == null ? null : We(e, t), Pr, i, l, "background"), Gn && (t.save(), t.beginPath(), t.rect(X, Z, Q, $), t.clip());
		for (let e = 0; e < I.length; e++) {
			let a = I[e], c = ye(a.dataPointOverrides), u = w(A.length + e, a), d = B && a.useSecondaryAxis === !0 ? rr : tr, f = se.get(a) ?? e, p = it(n, f), m = y(a, f), h = a.chartexStyle != null || a.lineHidden != null || a.lineColor != null || a.lineWidthEmu != null || n.chartexDataPointLineStyle != null, g = a.smooth === !0, v = n.dispBlanksAs ?? "gap", b = [], x = [], C = () => {
				x.length !== 0 && (b.push(x), x = []);
			};
			for (let e = 0; e < H; e++) {
				let t = a.values[e];
				if (a.sourceHidden?.[e] === !0) {
					C();
					continue;
				}
				if (t == null && (v === "gap" && C(), v !== "zero")) continue;
				let n = Vr(e);
				x.push({
					x: n,
					y: d(We(a, e)),
					index: e
				});
			}
			if (C(), p) Ut(t, n, a, b, g, !1, u, 2, i, {
				x: X,
				y: Z,
				w: Q,
				h: $
			}, l, s.semanticLineNoStyleFallback !== !1);
			else {
				let e = (e) => {
					e.beginPath();
					for (let t of b) e.moveTo(t[0].x, t[0].y), yn(e, t, g);
					e.stroke();
				};
				_(t, S(a.chartexStyle), n.chartStyleRoles?.dataPointLine, m, {
					x: X,
					y: Z,
					w: Q,
					h: $
				}, i, (t) => {
					if ($e) {
						let r = [n.chartexDataPointStyle, n.chartexDataPointLineStyle];
						if (!Sr(t, {
							...br(n, yr(a, m), r, r, m, I.length, `#${sr(n, m, I.length, a.chartexStyle)}`, { linkedNoStyleFallback: !0 }),
							semanticFallback: !1
						}, i)) return;
						e(t);
						return;
					}
					(!h || Cr(t, n, n.chartexDataPointLineStyle, a, m, I.length, u, i, { linkedNoStyleFallback: s.semanticLineNoStyleFallback })) && (h || (t.strokeStyle = u, t.lineWidth = 2, t.setLineDash([])), e(t));
				});
			}
			let T = a.showMarker !== !1 && a.markerSymbol !== "none", E = T || Ht(a), O = Mr(n, a, f);
			if (E) for (let e = 0; e < H; e++) {
				if (a.sourceHidden?.[e] === !0 || a.values[e] == null) continue;
				let r = Vr(e), s = d(We(a, e)), f = c.get(e), p = ve(a, f, "circle", T);
				if (p !== "none") if (O || D(f)) {
					let c = f?.markerLineWidthEmu ?? a.markerLineWidthEmu;
					jr(t, n, a, f, e, r, s, p, f?.markerSize ?? a.markerSize ?? 5, o(a, f, e, u), f?.markerLine ?? a.markerLine ?? null, i, c == null ? void 0 : Ae(c, i), Lt(a, f, e), l);
				} else t.fillStyle = u, t.beginPath(), t.arc(r, s, 3, 0, Math.PI * 2), t.fill();
			}
			Rr(t, a, u, (e) => Vr(e), d, i, void 0, {
				chart: n,
				chartRect: r,
				plotRect: {
					x: X,
					y: Z,
					w: Q,
					h: $
				},
				shapeRotationDeg: l
			});
		}
		Ki(t, n, H, Vr, (e) => B && e.useSecondaryAxis === !0 ? rr : tr, () => Tr, (e, t) => e.values[t] == null ? null : We(e, t), Pr, i, l, "foreground"), Gn && t.restore();
	}
	if (R.length > 0) {
		let e = [], a = [];
		for (let t of R) {
			let n = t.categories ?? [];
			for (let r = 0; r < t.values.length; r++) {
				let i = gi(n, r, !1), o = t.values[r];
				i == null || o == null || (e.push(i), a.push(o));
			}
		}
		if (e.length && a.length) {
			let o = n.secondaryCatAxis, s = n.secondaryValAxis, c = Dt(e), d = Dt(a), f = (e) => e?.minorGridlines === !0 || e?.minorTickMark != null && e.minorTickMark !== "none", h = kn({
				dataMin: c.min,
				dataMax: c.max,
				explicitMin: o?.min,
				explicitMax: o?.max,
				axisLenPt: Q / i,
				axisOrientation: "horizontal",
				majorUnit: o?.majorUnit,
				minorUnit: o?.minorUnit,
				needMinor: f(o),
				logBase: o?.logBase,
				reversed: o?.orientation === "maxMin"
			}), _ = kn({
				dataMin: d.min,
				dataMax: d.max,
				explicitMin: s?.min,
				explicitMax: s?.max,
				axisLenPt: $ / i,
				axisOrientation: "vertical",
				majorUnit: s?.majorUnit,
				minorUnit: s?.minorUnit,
				needMinor: f(s),
				logBase: s?.logBase,
				reversed: s?.orientation === "maxMin"
			});
			Ni(t, n, R.map((e, t) => ({
				series: e,
				index: se.get(e) ?? t
			})), !1, (e) => X + h.fraction(e) * Q, (e) => Z + $ - _.fraction(e) * $, r, X, Z, Q, $, i, !1, n.scatterStyle ?? "marker", {
				x: u,
				y: p,
				w: m,
				h: g
			}, _.max, void 0, l);
		}
	}
	Ar(), xe && !v && Sn(t, n, xe, Se, r, X, Z, Q, i), B && Dn && Fe(t, n, B, Dn, nr, r, X, Z, Q, $, i, Rn, zn, or, n.date1904, wn, V ? "left" : "right"), Xn && hi(t, n, Xn, X, Z + $ + (v ? n.valAxisHidden ? g * .02 : mt(dt) : 0), Q, u + Ct, i);
	let Kr = nt && n.series.length === 1 ? nt.values.map((e, t) => a(n, nt, Ye[W].get(t), t, t)) : $e ? A.flatMap((e, t) => [dr(n, Qe[t], A.length, e.chartexStyle, e.color), ...zr([e]).map(() => void 0)]) : [];
	ci(t, G, bt, u, p, m, g, X, Z, Q, $, ct + 2, i, Kr), Nn(t, n, u, p, m, g, X, Z, Q, $, Ct, Ot, At, jt, v);
}
function Zi(e, t, n, r, i, a, o, s, c, l, u, d, f, p = !1, m, h, g, _ = 1, v, y = 0) {
	Ti(e, t, {
		kind: "bar",
		rect: o === "vertical" ? {
			x: n,
			y: r,
			w: a,
			h: i
		} : {
			x: n,
			y: r,
			w: i,
			h: a
		},
		orientation: o,
		negative: p,
		position: s ?? "outEnd"
	}, u, l, c ? `#${c}` : "#333", f, d, m, h, g, _, v, y);
}
function Qi(e, t, n, r, i, a, o, s, c, l) {
	if (n.hidden === !0 || n.linePaintAuthored === !0 && n.color == null || !i && n.dir === "x" || i && n.dir === "y") return;
	let u = n.barType === "plus" || n.barType === "both", d = n.barType === "minus" || n.barType === "both";
	e.save(), e.strokeStyle = n.color ? `#${n.color}` : c, e.lineWidth = n.lineWidthEmu ? Math.max(.5, n.lineWidthEmu / Rn * l) : Math.max(.5, l * .75), e.setLineDash(tn(n.dash, e.lineWidth));
	let f = Math.max(e.lineWidth / 2, 2 * l);
	for (let c = 0; c < r; c++) {
		if (t.values[c] == null) continue;
		let r = s(c), l = a(c), p = o(r), m = (t) => {
			let a = o(r + t);
			e.beginPath(), i ? (e.moveTo(p, l), e.lineTo(a, l)) : (e.moveTo(l, p), e.lineTo(l, a)), e.stroke(), n.noEndCap || (e.save(), e.setLineDash([]), e.beginPath(), i ? (e.moveTo(a, l - f), e.lineTo(a, l + f)) : (e.moveTo(l - f, a), e.lineTo(l + f, a)), e.stroke(), e.restore());
		};
		if (u) {
			let e = n.plus[c];
			e != null && m(e);
		}
		if (d) {
			let e = n.minus[c];
			e != null && m(-e);
		}
	}
	e.restore();
}
function $i(e, t) {
	return /^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)%?$/.test(e) ? t * .15 : 0;
}
function ea(e, t, n, r, i, a, o, s) {
	if (!t || t.side !== "t" || e.legendOverlay === !0 || e.legendManualLayout == null) return s;
	let c = {
		x: n + 4,
		y: r + o + 2,
		w: Math.max(0, i - 8),
		h: t.reserveH
	}, l = Dn(e.legendManualLayout, {
		x: n,
		y: r,
		w: i,
		h: a
	}, c);
	if (!l) return s;
	let u = Math.max(0, r + s - (c.y + c.h));
	return Math.max(s, l.y + l.h - r + u);
}
//#endregion
//#region packages/core/src/chart/families/line.ts
function ta(e, t, n, r, i = 0) {
	let { x: a, y: s, w: l, h: u } = n, p = ge(t), m = p.length;
	if (m === 0) return;
	let g = Xr(t, r), v = t.chartType === "stackedLinePct" ? "percentStacked" : t.chartType === "stackedLine" ? "stacked" : "standard", x = t.plotGroups?.filter((e) => e.kind === "line") ?? [{
		kind: "line",
		seriesStart: 0,
		seriesCount: t.series.length,
		categoryAxis: "primary",
		valueAxis: "primary",
		seriesAxis: "none",
		grouping: v
	}], C = Array(t.series.length).fill(!1), E = Array(t.series.length).fill(!1), O = Array(t.series.length).fill(!1), A = Array(t.series.length).fill(null), j = t.series.map(() => Array(m).fill(0)), ee = /* @__PURE__ */ new Map();
	for (let e of x) {
		let t = e.valueAxis;
		ee.set(t, (ee.get(t) ?? !0) && e.grouping === "percentStacked");
	}
	for (let e of x) {
		let n = e.grouping ?? "standard", r = n === "stacked" || n === "percentStacked", i = n === "percentStacked", a = t.series.slice(e.seriesStart, e.seriesStart + e.seriesCount), o = i && ee.get(e.valueAxis) === !0 ? 100 : 1, s = i ? p.map((e, t) => a.reduce((e, n) => e + Math.abs(n.values[t] ?? 0), 0) || 1) : null;
		for (let t = 0; t < a.length; t++) {
			let n = e.seriesStart + t;
			C[n] = r, E[n] = i, O[n] = e.valueAxis === "secondary", A[n] = s;
			for (let e = 0; e < m; e++) {
				let c = a[t].values[e] ?? 0;
				if (!r) {
					j[n][e] = c;
					continue;
				}
				let l = t === 0 ? 0 : j[n - 1][e], u = i && s ? c / s[e] * o : c;
				j[n][e] = l + u;
			}
		}
	}
	let N = (e, t) => j[e]?.[t] ?? 0, te = x.filter((e) => e.valueAxis !== "secondary"), P = te.length > 0 && te.every((e) => e.grouping === "percentStacked"), ne = t.dispBlanksAs ?? "gap", F = x.filter((e) => e.valueAxis === "secondary"), ie = F.length > 0 && F.every((e) => e.grouping === "percentStacked"), I = t.secondaryValAxis && t.series.some((e, n) => O[n] || t.plotGroups == null && e.useSecondaryAxis === !0) ? t.secondaryValAxis : null, oe = new Map(t.series.map((e, t) => [e, t])), L = (e) => {
		let n = oe.get(e) ?? -1;
		return I != null && (O[n] || t.plotGroups == null && e.useSecondaryAxis === !0);
	}, R = Infinity, ce = -Infinity;
	for (let e = 0; e < m; e++) for (let n = 0; n < t.series.length; n++) {
		if (L(t.series[n]) || !C[n] && t.series[n].values[e] == null) continue;
		let r = N(n, e);
		R = Math.min(R, r), ce = Math.max(ce, r);
	}
	for (let e = 0; e < t.series.length; e++) {
		let n = t.series[e];
		L(n) || h(n, "y", (t) => n.values[t] == null ? null : N(e, t), (e) => {
			R = Math.min(R, e), ce = Math.max(ce, e);
		});
	}
	isFinite(R) || (R = 0, ce = 1);
	let le = t.valAxisLogBase != null && t.valAxisLogBase >= 2;
	t.valMin == null ? P && R > 0 && !le && (R = 0) : R = P ? t.valMin * 100 : t.valMin, t.valMax == null ? P && ce < 0 && (ce = 0) : ce = P ? t.valMax * 100 : t.valMax;
	let ue = Hi(e, t, l, u, r), de = ue.fontPx, z = ue.topPad, B = ue.bandH, V = ai(e, t, l, u, .22, r), { legRightW: me, legLeftW: _e, legTopH: xe, legBottomH: Se } = Kt(V, t.legendOverlay === !0), Ce = he(t.catAxisFontSizeHpt, u, r), we = he(t.valAxisFontSizeHpt, u, r), H = $t(t, l, u, r), Te = H.catFontPx, Ee = H.valFontPx, Oe = H.catBandH, ke = H.valBandW, Ne = ui(t), Pe = fi(t, r), Le = pi(e, t, r), Be = B + xe + we / 2 + 2, Ve = (Ne ? Pe : mt(Ce, t.catAxisLabelOffsetPercent)) + Oe + Se, He = u - Be - Ve, Ue = f(I, t.series, He / r, "y", ie, !1, (e, n) => O[n] || t.plotGroups == null && t.series[n].useSecondaryAxis === !0, (e, t, n) => !C[n] && e.values[t] == null ? null : N(n, t)), We = Math.max(8, Math.min(11, u / 20)), Ge = ot(I?.fontSizeHpt, r) ?? We, U = 0;
	if (I && Ue && !I.hidden) {
		let n = e.font;
		e.font = un(Ge, Y(t, I.fontFace, "minor"), !1, I.fontItalic ?? !1);
		let r = 0;
		for (let n of Ue.majorLines) r = Math.max(r, e.measureText(Ke(n, I.formatCode ?? null, t.date1904, I.displayUnits)).width);
		U = r + 18, e.font = n;
	}
	let qe = I && I.title ? Zt(I.titleFontSizeHpt, r) + 8 : 0, Je = _e + Math.max(we * 2.2 + 10 + ke, Le), Ye = me + l * .05 + U + qe, Ze = ae(t, R, ce, He / r, P), Qe = 0;
	if (!t.valAxisHidden && t.valAxisTickLabelPos !== "none" && (t.chartexParetoSortDescending != null || t.plotAreaManualLayout != null && t.plotAreaManualLayout.layoutTarget !== "inner")) {
		let n = e.font;
		e.font = un(we, Y(t, t.valAxisFontFace, "minor"), t.valAxisFontBold ?? !1, t.valAxisFontItalic ?? !1);
		for (let n of Ze.majorLines) Qe = Math.max(Qe, e.measureText(k(t, n, P)).width);
		e.font = n;
	}
	t.chartexParetoSortDescending != null && (Je = Math.max(Je, _e + Qe + 10 + ke));
	let $e = {
		t: Be,
		r: Ye,
		b: Ve,
		l: Je
	}, et = Et({
		valAxisHidden: t.valAxisHidden,
		catAxisHidden: t.catAxisHidden,
		valLabelWidth: Qe,
		valLabelFontPx: we,
		catLabelFontPx: Ce,
		valLabelGapPx: t.valAxisFontSizeHpt == null ? 6 : Me(we),
		catLabelGapPx: t.catAxisFontSizeHpt == null ? Ie(5, t.catAxisLabelOffsetPercent) : Ie(St(Ce), t.catAxisLabelOffsetPercent),
		outerTextMarginPx: st * r,
		valTitleBandW: ke,
		catTitleBandH: Oe,
		secondaryBandW: U + qe
	}), tt = jn(t, a, s, l, u, r, {
		titleBand: ue,
		legendSideReserveFrac: .22,
		legendReserve: V,
		pad: $e,
		honorPlotAreaManualLayout: !0,
		manualOuterInsets: et
	}), W = Hi(e, t, tt.plotRect.pw, u, r);
	Math.abs(W.bandH - ue.bandH) > .01 && (ue = W, de = ue.fontPx, z = ue.topPad, B = ue.bandH, Be = B + xe + we / 2 + 2, $e.t = Be, tt = jn(t, a, s, l, u, r, {
		titleBand: ue,
		legendSideReserveFrac: .22,
		legendReserve: V,
		pad: $e,
		honorPlotAreaManualLayout: !0,
		manualOuterInsets: et
	}));
	let { px0: nt, py0: G, pw: K } = tt.plotRect, { ph: q } = tt.plotRect;
	if (Wi(e, t, t.titleManualLayout || !t.titleRichRuns?.length ? a : nt, s, t.titleManualLayout || !t.titleRichRuns?.length ? l : K, u, s + z, de), K <= 0 || q <= 0) return;
	let at = Ne ? mi(e, t, K / m, r) : null;
	at && at.totalHeight > Pe && (q = Math.max(1, q - (at.totalHeight - Pe))), dn(e, t, nt, G, K, q, r, i);
	let J = ae(t, R, ce, q / r, P);
	if (J.max - J.min === 0) return;
	let ct = (e) => G + q - J.frac(e) * q, lt = Ue ? Ue.makeToY(G, q) : ct, ut = (e) => L(e) ? lt : ct, dt = ct(Ji(t, J.min, J.max)), ft = I && Ue ? lt(qi(t.secondaryCatAxis?.crossesAt, t.secondaryCatAxis?.crosses, Ue.min, Ue.max)) : dt, pt = (e) => L(e) ? ft : dt, ht = d(t.catAxisLineColor, t.catAxisLineWidthEmu, r), gt = d(t.valAxisLineColor, t.valAxisLineWidthEmu, r), _t = t.catAxisLineColor == null ? void 0 : ht.color, vt = t.catAxisLineWidthEmu == null ? void 0 : ht.width, yt = t.valAxisLineColor == null ? void 0 : gt.color, bt = t.valAxisLineWidthEmu == null ? void 0 : gt.width, xt = je(t, p), Ct = In(t), wt = Ft(t), Tt = xt ? (e) => nt + xt.positions[e] * K : Ct ? (e) => nt + ((wt ? m - 1 - e : e) + .5) / m * K : (e) => {
		let t = wt ? m - 1 - e : e;
		return nt + (m === 1 ? K / 2 : t / (m - 1) * K);
	};
	if (!t.valAxisHidden) {
		e.font = un(we, Y(t, t.valAxisFontFace, "minor"), t.valAxisFontBold ?? !1, t.valAxisFontItalic ?? !1), e.textBaseline = "middle";
		let n = Xe(t, r), i = rt(t, r);
		for (let t of J.minorLines) re(e, nt, K, ct(t), !1, i);
		let a = ze(t), o = t.valAxisTickLabelPos !== "none";
		for (let i of J.majorLines) {
			let s = ct(i);
			if (a && re(e, nt, K, s, i === 0, n), De(e, t.valAxisMajorTickMark, "val", nt, s, yt, bt, !1, t.valAxisLineHidden, "major", r, t.valAxisLineDash), o) {
				e.fillStyle = t.valAxisFontColor ? `#${t.valAxisFontColor}` : "#555", e.textAlign = "right";
				let n = t.valAxisFontSizeHpt == null ? 6 : Me(we);
				e.fillText(k(t, i, P), nt - n, s);
			}
		}
		if (t.valAxisMinorTickMark && t.valAxisMinorTickMark !== "none") for (let n of J.minorTicks) De(e, t.valAxisMinorTickMark, "val", nt, ct(n), yt, bt, !1, t.valAxisLineHidden, "minor", r, t.valAxisLineDash);
	}
	if (I && Ue && b(e, I, Ue, lt, nt, K, r), !t.catAxisHidden && c(t)) {
		let n = fe(t, r);
		e.strokeStyle = n.color, e.lineWidth = n.width;
		let i = n.dash.length > 0 && e.getLineDash ? e.getLineDash() : [];
		n.dash.length > 0 && e.setLineDash(n.dash);
		let a = xt ? xt.majorTicks.map((e) => e.fraction) : pe(t, m);
		for (let t of a) {
			let n = nt + t * K;
			e.beginPath(), e.moveTo(n, G), e.lineTo(n, G + q), e.stroke();
		}
		n.dash.length > 0 && e.setLineDash(i);
	}
	!t.catAxisHidden && !t.catAxisLineHidden && nn(e, nt, dt, nt + K, dt, ht.color, ht.width, t.catAxisLineDash), !t.valAxisHidden && !t.valAxisLineHidden && nn(e, nt, G, nt, G + q, gt.color, gt.width, t.valAxisLineDash);
	let Dt = xt ? (xt.categoryBandFractions[0] ?? 0) * K : Ct ? K / m : m > 1 ? K / (m - 1) : K, Ot = new Map(t.series.map((e, t) => [e, t]));
	Ki(e, t, m, Tt, ut, pt, (e, t) => {
		let n = Ot.get(e);
		return n == null ? null : N(n, t);
	}, Dt, r, i, "background");
	let kt = Math.max(1, 2.25 * r), At = Math.max(2, 2.5 * r), jt = he(t.dataLabelFontSizeHpt, u, r), Mt = [];
	for (let c = 0; c < t.series.length; c++) {
		let d = t.series[c], f = C[c], h = A[c], v = ye(d.dataPointOverrides), b = w(c, d), x = y(d, c), T = ut(d), O = d.smooth === !0, k = [], j = [], M = () => {
			j.length > 0 && k.push(j), j = [];
		};
		for (let e = 0; e < m; e++) {
			if (d.sourceHidden?.[e] === !0) {
				M();
				continue;
			}
			if (!f && d.values[e] == null) {
				if (ne === "gap") {
					M();
					continue;
				}
				if (ne === "span") continue;
			}
			j.push({
				x: Tt(e),
				y: T(N(c, e)),
				index: e
			});
		}
		M();
		let ee = {
			x: nt,
			y: G,
			w: K,
			h: q
		};
		it(t, c) ? Ut(e, t, d, k, O, !1, b, kt, r, ee, i) : _(e, S(d.chartexStyle), t.chartStyleRoles?.dataPointLine, x, ee, r, (e) => {
			if (Re(e, t, "dataPointLine", d, void 0, x, b, kt, r, ee, i)) {
				e.beginPath();
				for (let t of k) t.length !== 0 && (e.moveTo(t[0].x, t[0].y), yn(e, t, O));
				e.stroke();
			}
		});
		let te = (e) => N(c, e);
		for (let n of d.errBars ?? []) yi(e, d, Xt(t, n), m, Tt, T, te, b);
		e.fillStyle = b;
		let P = d.showMarker !== !1 && d.markerSymbol !== "none", F = P || Ht(d), re = Mr(t, d, c), ie = (d.dataLabelOverrides?.length ?? 0) > 0 || d.seriesDataLabels != null;
		ie && Mt.push(() => {
			Di(e, d, p, m, Tt, T, te, q, r, t.date1904 ?? !1, f || ne === "zero", Y(t, t.dataLabelFontFace, "minor"), t.dataLabelPosition ?? "r", {
				x: a,
				y: G,
				w: l,
				h: q
			}, {
				x: a,
				y: s,
				w: l,
				h: u
			}, E[c] && h ? (e) => (d.values[e] ?? 0) / h[e] : void 0, (e) => {
				if (!F) return 0;
				let t = v.get(e);
				return !re && !D(t) ? At : ve(d, t, "circle", P) === "none" ? 0 : (t?.markerSize ?? d.markerSize ?? 5) / 2 * r;
			}, (e) => Y(t, e, "minor"), L(d) ? I?.displayUnits : t.valAxisDisplayUnits, (e) => g(c, e), (e) => bi(t, e, L(d) && Ue ? Ue.max : J.max), i);
		});
		for (let n = 0; n < m; n++) {
			if (d.sourceHidden?.[n] === !0 || !f && d.values[n] == null && ne !== "zero") continue;
			let a = N(c, n);
			if (F) {
				let s = v.get(n);
				if (re || D(s)) {
					let c = ve(d, s, "circle", P);
					if (c !== "none") {
						let l = s?.markerSize ?? d.markerSize ?? 5, u = o(d, s, n, b), f = s?.markerLine ?? d.markerLine ?? null, p = s?.markerLineWidthEmu ?? d.markerLineWidthEmu;
						jr(e, t, d, s, n, Tt(n), T(a), c, l, u, f, r, p == null ? void 0 : Ae(p, r), Lt(d, s, n), i);
					}
				} else e.beginPath(), e.arc(Tt(n), T(a), At, 0, Math.PI * 2), e.fill();
			}
		}
		t.showDataLabels && !ie && Mt.push(() => {
			for (let n = 0; n < m; n++) {
				if (d.sourceHidden?.[n] === !0 || !f && d.values[n] == null && ne !== "zero") continue;
				let r = N(c, n), i = Wt({
					showValue: !0,
					sourceValue: d.values[n] ?? 0,
					valueDivisor: se(L(d) ? I?.displayUnits : t.valAxisDisplayUnits),
					formatCode: t.dataLabelFormatCode ?? d.valFormatCode ?? null,
					date1904: t.date1904
				});
				Si(e, Tt(n), T(r), i, t.dataLabelPosition ?? "r", jt, t.dataLabelFontColor ?? void 0, t.dataLabelFontBold ?? !1, Y(t, t.dataLabelFontFace, "minor"), F ? At + 1 : 2, {
					x: nt,
					y: G,
					w: K,
					h: q
				});
			}
		}), Rr(e, d, b, Tt, T, r, void 0, {
			chart: t,
			chartRect: n,
			plotRect: {
				x: nt,
				y: G,
				w: K,
				h: q
			},
			shapeRotationDeg: i
		});
	}
	Ki(e, t, m, Tt, ut, pt, (e, t) => {
		let n = Ot.get(e);
		return n == null ? null : N(n, t);
	}, Dt, r, i, "foreground");
	for (let e of Mt) e();
	if (!t.catAxisHidden) {
		let n = t.catAxisFontColor ? `#${t.catAxisFontColor}` : "#555";
		e.fillStyle = n, e.textAlign = "center", e.textBaseline = "top", e.font = un(Ce, Y(t, t.catAxisFontFace, "minor"), t.catAxisFontBold ?? !1, t.catAxisFontItalic ?? !1);
		let i = Math.max(1, Math.floor(t.catAxisTickMarkSkip ?? 1)), a = xt ? xt.majorTicks.map((e) => nt + e.fraction * K) : Array.from({ length: Math.ceil(m / i) }, (e, t) => Tt(t * i));
		for (let n of a) De(e, t.catAxisMajorTickMark, "cat", dt, n, _t, vt, !1, t.catAxisLineHidden, "major", r, t.catAxisLineDash);
		if (t.catAxisMinorTickMark && t.catAxisMinorTickMark !== "none" && xt) for (let n of xt.minorTicks) De(e, t.catAxisMinorTickMark, "cat", dt, nt + n.fraction * K, _t, vt, !1, t.catAxisLineHidden, "minor", r, t.catAxisLineDash);
		let o = !Ne && T(t), s = Math.max(1, Math.floor(t.catAxisTickLabelSkip ?? 1)), c = be(t), l = xt ? xt.majorTicks.map((e) => ({
			label: vn(String(e.serial), t.catAxisFormatCode, t.date1904),
			x: nt + e.fraction * K,
			categoryIndex: -1
		})) : Array.from({ length: Math.ceil(m / s) }, (e, n) => {
			let r = n * s;
			return {
				label: vn((p[r] ?? "").toString(), t.catAxisFormatCode, t.date1904),
				x: Tt(r),
				categoryIndex: r
			};
		});
		for (let r of l) {
			let i = r.categoryIndex < 0 ? null : Cn(r.categoryIndex, m, In(t), Ft(t), t.catAxisLabelAlignment), a = i ? nt + i.fraction * K : r.x;
			if (!o) continue;
			e.textAlign = i?.textAlign ?? "center", e.fillStyle = n;
			let s = r.label;
			if (!s) continue;
			let l = Ie(t.catAxisFontSizeHpt == null ? 5 : St(Ce), t.catAxisLabelOffsetPercent), u = t.catAxisTickLabelPos ?? "nextTo";
			M(e, s, a, (u === "nextTo" ? dt : u === "high" ? G : G + q) + l, c);
		}
	}
	if (I && Ue) {
		let i = t.valAxisFontColor ? `#${t.valAxisFontColor}` : "#555";
		Fe(e, t, I, Ue, lt, n, nt, G, K, q, r, Ge, U, i, t.date1904);
	}
	at && hi(e, t, at, nt, G + q, K, a + _e, r), ci(e, t, V, a, s, l, u, nt, G, K, q, B + 2, r), Nn(e, t, a, s, l, u, nt, G, K, q, _e, Se, Te, Ee);
}
//#endregion
//#region packages/core/src/chart/families/stock.ts
function na(t, n, r, i, a = 0) {
	let { x: s, y: c, w: l, h: u } = r, p = ge(n), m = p.length;
	if (m === 0) return;
	let g = Xr(n, i), v = n.plotGroups?.find((e) => e.kind === "stock"), x = v ? n.series.slice(v.seriesStart, v.seriesStart + v.seriesCount) : n.series, C = n.plotGroups == null ? [] : n.plotGroups.filter((e) => e.kind === "line").flatMap((e) => n.series.slice(e.seriesStart, e.seriesStart + e.seriesCount)), E = [...x, ...C], D = new Map(n.series.map((e, t) => [e, t])), O = x.length >= 4, A = O ? 0 : -1, j = +!!O, ee = O ? 2 : 1, N = O ? 3 : 2, te = x[j], P = x[ee], F = x[N], ie = A >= 0 ? x[A] : void 0, I = x[0], oe = x.at(-1), L = n.secondaryValAxis && E.some((e) => e.useSecondaryAxis === !0) ? n.secondaryValAxis : null, R = (e) => L != null && e.useSecondaryAxis === !0, se = Hi(t, n, l, u, i), ce = se.fontPx, le = se.topPad, ue = se.bandH, de = ai(t, n, l, u, .22, i), { legRightW: fe, legLeftW: z, legBottomH: B, legTopH: pe } = Kt(de, n.legendOverlay === !0), V = he(n.catAxisFontSizeHpt, u, i), me = he(n.valAxisFontSizeHpt, u, i), _e = $t(n, l, u, i), xe = _e.catFontPx, Se = _e.valFontPx, Ce = _e.catBandH, we = _e.valBandW, H = ui(n), Te = fi(n, i), Ee = pi(t, n, i), Oe = ue + pe + me / 2 + 2, ke = (H ? Te : mt(V, n.catAxisLabelOffsetPercent)) + Ce + B, Me = f(L, E, (u - Oe - ke) / i), Ne = Math.max(8, Math.min(11, u / 20)), Le = ot(L?.fontSizeHpt, i) ?? Ne, Be = 0;
	if (L && Me && !L.hidden) {
		let e = t.font;
		t.font = un(Le, Y(n, L.fontFace, "minor"), L.fontBold ?? !1, L.fontItalic ?? !1);
		let r = 0;
		for (let e of Me.majorLines) r = Math.max(r, t.measureText(Ke(e, L.formatCode ?? null, n.date1904, L.displayUnits)).width);
		Be = r + 18, t.font = e;
	}
	let Ve = L?.title ? Zt(L.titleFontSizeHpt, i) + 8 : 0, He = {
		t: Oe,
		r: fe + l * .05 + Be + Ve,
		b: ke,
		l: z + Math.max(me * 2.2 + 10 + we, Ee)
	};
	Wi(t, n, s, c, l, u, c + le, ce);
	let Ue = jn(n, s, c, l, u, i, {
		titleBand: se,
		legendSideReserveFrac: .22,
		legendReserve: de,
		pad: He,
		honorPlotAreaManualLayout: !0
	}), { px0: We, py0: Ge, pw: U } = Ue.plotRect, { ph: qe } = Ue.plotRect;
	if (U <= 0 || qe <= 0) return;
	let Je = H ? mi(t, n, U / m, i) : null;
	Je && Je.totalHeight > Te && (qe = Math.max(1, qe - (Je.totalHeight - Te))), dn(t, n, We, Ge, U, qe, i, a);
	let Ye = Infinity, Ze = -Infinity;
	for (let e of E) if (!R(e)) for (let t = 0; t < m; t++) {
		let n = e.values[t];
		n != null && (Ye = Math.min(Ye, n), Ze = Math.max(Ze, n));
	}
	for (let e of E) R(e) || h(e, "y", (t) => e.values[t] ?? null, (e) => {
		Ye = Math.min(Ye, e), Ze = Math.max(Ze, e);
	});
	isFinite(Ye) || (Ye = 0, Ze = 1), n.valMin != null && (Ye = n.valMin), n.valMax != null && (Ze = n.valMax);
	let Qe = ae(n, Ye, Ze, qe / i);
	if (Qe.max - Qe.min === 0) return;
	let $e = (e) => Ge + qe - Qe.frac(e) * qe, et = Me?.makeToY(Ge, qe) ?? $e, tt = (e) => R(e) ? et : $e, W = In(n), nt = Ft(n), G = je(n, p), K = G ? (e) => We + G.positions[e] * U : W ? (e) => We + ((nt ? m - 1 - e : e) + .5) / m * U : (e) => {
		let t = nt ? m - 1 - e : e;
		return We + (m === 1 ? U / 2 : t / (m - 1) * U);
	};
	if (!n.valAxisHidden) {
		t.font = un(me, Y(n, n.valAxisFontFace, "minor"), n.valAxisFontBold ?? !1, n.valAxisFontItalic ?? !1), t.textBaseline = "middle";
		let e = Xe(n, i), r = rt(n, i);
		for (let e of Qe.minorLines) re(t, We, U, $e(e), !1, r);
		let a = ze(n), o = n.valAxisTickLabelPos !== "none";
		for (let r of Qe.majorLines) {
			let s = $e(r);
			a && re(t, We, U, s, r === 0, e), De(t, n.valAxisMajorTickMark, "val", We, s, void 0, void 0, !1, n.valAxisLineHidden, "major", i, n.valAxisLineDash), o && (t.fillStyle = n.valAxisFontColor ? `#${n.valAxisFontColor}` : "#555", t.textAlign = "right", t.fillText(k(n, r, !1), We - 6, s));
		}
		for (let e of Qe.minorTicks) De(t, n.valAxisMinorTickMark, "val", We, $e(e), void 0, void 0, !1, n.valAxisLineHidden, "minor", i, n.valAxisLineDash);
	}
	L && Me && b(t, L, Me, et, We, U, i);
	let q = d(n.catAxisLineColor, n.catAxisLineWidthEmu, i), at = d(n.valAxisLineColor, n.valAxisLineWidthEmu, i);
	if (!n.catAxisHidden && !n.catAxisLineHidden && nn(t, We, Ge + qe, We + U, Ge + qe, q.color, q.width, n.catAxisLineDash), !n.valAxisHidden && !n.valAxisLineHidden && nn(t, We, Ge, We, Ge + qe, at.color, at.width, n.valAxisLineDash), n.stockDropLines) {
		let r = n.stockAutomaticStyle ? {
			lineColors: [n.stockAutomaticStyle.lineColor],
			linePaintAuthored: !0,
			lineWidthEmu: n.stockAutomaticStyle.lineWidthEmu
		} : void 0, a = Pt(n, n.stockDropLines, "dropLine", r);
		(a.paintAuthored !== !0 || a.color != null) && (a.color != null || a.widthEmu != null || a.dash != null) && e(t, a, i) && ct(t, x, m, K, (e) => tt(e), () => Ge + qe, (e, t) => e.values[t] ?? null);
	}
	if (n.stockHiLowLines === !0 && te != null && P != null && te && P) {
		let r = Pt(n, n.stockHiLowLineStyle ?? { color: n.stockHiLowLineColor ?? null }, "hiLoLine", n.stockAutomaticStyle ? {
			lineColors: [n.stockAutomaticStyle.lineColor],
			linePaintAuthored: !0,
			lineWidthEmu: n.stockAutomaticStyle.lineWidthEmu
		} : void 0);
		if ((r.paintAuthored !== !0 || r.color != null) && (r.color != null || r.widthEmu != null || r.dash != null) && e(t, r, i)) for (let e = 0; e < m; e++) {
			let n = te.values[e], r = P.values[e];
			if (n == null || r == null) continue;
			let i = K(e), a = tt(te), o = tt(P);
			t.beginPath(), t.moveTo(i, a(n)), t.lineTo(i, o(r)), t.stroke();
		}
	}
	let J = (e, r, s) => {
		if (!e) return;
		let c = D.get(e) ?? r, l = w(c, e), u = y(e, c), d = ye(e.dataPointOverrides), f = e.markerSymbol != null && e.markerSymbol !== "none" && ne(e), p = Math.max(3, U / m * .22);
		for (let r = 0; r < m; r++) {
			let c = e.values[r];
			if (c == null) continue;
			let m = K(r), h = tt(e)(c), g = d.get(r);
			if (g?.markerSymbol === "none" || g?.markerSymbol == null && e.markerSymbol === "none") continue;
			if (f || g?.markerSymbol != null && g.markerSymbol !== "none") {
				let s = g?.markerSymbol ?? e.markerSymbol ?? "circle";
				jr(t, n, e, g, r, m, h, s, g?.markerSize ?? e.markerSize ?? 3, o(e, g, r, l), g?.markerLine ?? e.markerLine ?? null, i, (g?.markerLineWidthEmu ?? e.markerLineWidthEmu) == null ? void 0 : Ae(g?.markerLineWidthEmu ?? e.markerLineWidthEmu, i), Lt(e, g, r), a);
				continue;
			}
			let v = s === "right" ? m : s === "left" ? m - p : m - p / 2, y = s === "right" ? m + p : s === "left" ? m : m + p / 2;
			_(t, S(g?.chartexStyle, e.chartexStyle), n.chartStyleRoles?.dataPointLine, u, {
				x: v,
				y: h,
				w: y - v,
				h: 0
			}, i, (t) => {
				Re(t, n, "dataPointLine", e, g, u, l, Math.max(1, .75 * i), i, {
					x: We,
					y: Ge,
					w: U,
					h: qe
				}, a) && (t.beginPath(), t.moveTo(v, h), t.lineTo(y, h), t.stroke());
			});
		}
	};
	for (let e of C) {
		let s = D.get(e) ?? 0, c = w(Math.max(0, s), e), l = tt(e), u = ye(e.dataPointOverrides), d = y(e, s), f = it(n, s), p = [], h = [], g = () => {
			h.length > 0 && p.push(h), h = [];
		};
		for (let t = 0; t < m; t++) {
			let n = e.values[t];
			if (n == null) {
				g();
				continue;
			}
			h.push({
				x: K(t),
				y: l(n),
				index: t
			});
		}
		g(), f ? Ut(t, n, e, p, e.smooth === !0, !1, c, Math.max(1, 2.25 * i), i, {
			x: We,
			y: Ge,
			w: U,
			h: qe
		}, a) : _(t, S(e.chartexStyle), n.chartStyleRoles?.dataPointLine, d, {
			x: We,
			y: Ge,
			w: U,
			h: qe
		}, i, (t) => {
			if (t.save(), Re(t, n, "dataPointLine", e, void 0, d, c, Math.max(1, 2.25 * i), i, {
				x: We,
				y: Ge,
				w: U,
				h: qe
			}, a)) {
				t.beginPath();
				for (let n of p) t.moveTo(n[0].x, n[0].y), yn(t, n, e.smooth === !0);
				t.stroke();
			}
			t.restore();
		});
		let v = e.showMarker !== !1 && e.markerSymbol !== "none";
		if (v || Ht(e)) for (let r = 0; r < m; r++) {
			let s = e.values[r];
			if (s == null) continue;
			let d = u.get(r), f = ve(e, d, "circle", v);
			f !== "none" && jr(t, n, e, d, r, K(r), l(s), f, d?.markerSize ?? e.markerSize ?? 5, o(e, d, r, c), d?.markerLine ?? e.markerLine ?? null, i, (d?.markerLineWidthEmu ?? e.markerLineWidthEmu) == null ? void 0 : Ae(d?.markerLineWidthEmu ?? e.markerLineWidthEmu, i), Lt(e, d, r), a);
		}
		Rr(t, e, c, K, l, i, void 0, {
			chart: n,
			chartRect: r,
			plotRect: {
				x: We,
				y: Ge,
				w: U,
				h: qe
			},
			shapeRotationDeg: a
		});
	}
	if (n.stockUpDownBars && I && oe) {
		let e = n.stockUpDownBarStyle ?? {
			gapWidthPercent: 150,
			up: {},
			down: {}
		}, r = {
			...e,
			up: hn(n, e.up, "upBar", n.stockAutomaticStyle ?? void 0),
			down: hn(n, e.down, "downBar", n.stockAutomaticStyle ?? void 0)
		}, o = G ? (G.categoryBandFractions[0] ?? 0) * U : W ? U / m : m > 1 ? U / (m - 1) : U;
		Gi(t, (e) => I.values[e] ?? null, (e) => oe.values[e] ?? null, m, K, tt(I), tt(oe), o, r, i, void 0, a);
	}
	J(ie, A, "left"), (te?.markerSymbol != null || te && Ht(te)) && J(te, j, "both"), (P?.markerSymbol != null || P && Ht(P)) && J(P, ee, "both"), J(F, N, "right");
	for (let e of E) {
		let r = w(D.get(e) ?? 0, e);
		for (let i of e.errBars ?? []) yi(t, e, Xt(n, i), m, K, tt(e), (t) => e.values[t] ?? 0, r);
	}
	if (x.length < 3) for (let e = 0; e < x.length; e++) J(x[e], e, "both");
	for (let e of E) {
		let o = D.get(e) ?? 0;
		xi(t, e, p, !0, K, tt(e), qe, i, n.date1904, Y(n, n.dataLabelFontFace, "minor"), n.dataLabelPosition ?? "r", {
			x: We,
			y: Ge,
			w: U,
			h: qe
		}, r, (e) => Y(n, e, "minor"), R(e) ? L?.displayUnits : n.valAxisDisplayUnits, (e) => g(o, e), (t) => bi(n, t, R(e) ? Me?.max ?? Qe.max : Qe.max), a);
	}
	if (!n.catAxisHidden) {
		let e = Math.max(1, Math.floor(n.catAxisTickLabelSkip ?? 1)), r = n.catAxisFontColor ? `#${n.catAxisFontColor}` : "#555";
		t.fillStyle = r, t.textAlign = "center", t.textBaseline = "top", t.font = un(V, Y(n, n.catAxisFontFace, "minor"), n.catAxisFontBold ?? !1, n.catAxisFontItalic ?? !1);
		let a = G ? (G.categoryBandFractions[0] ?? 0) * U - 4 : U / m * e - 4, o = !H && T(n), s = be(n), c = G && G.majorTicks.length > 0 ? G.majorTicks.map((e) => ({
			label: vn(String(e.serial), n.catAxisFormatCode, n.date1904),
			x: We + e.fraction * U,
			categoryIndex: -1
		})) : Array.from({ length: Math.ceil(m / e) }, (t, r) => {
			let i = r * e;
			return {
				label: vn((p[i] ?? "").toString(), n.catAxisFormatCode, n.date1904),
				x: K(i),
				categoryIndex: i
			};
		});
		for (let e of c) {
			let c = e.categoryIndex < 0 ? null : Cn(e.categoryIndex, m, In(n), Ft(n), n.catAxisLabelAlignment), l = c ? We + c.fraction * U : e.x;
			if (De(t, n.catAxisMajorTickMark, "cat", Ge + qe, l, q.color, q.width, !1, n.catAxisLineHidden, "major", i, n.catAxisLineDash), !o) continue;
			t.textAlign = c?.textAlign ?? "center", t.fillStyle = r;
			let u = e.label;
			M(t, Pe(t, u, s === 0 ? a : qe * .4), l, Ge + qe + Ie(5, n.catAxisLabelOffsetPercent), s);
		}
		if (n.catAxisMinorTickMark && n.catAxisMinorTickMark !== "none" && G) for (let e of G.minorTicks) De(t, n.catAxisMinorTickMark, "cat", Ge + qe, We + e.fraction * U, void 0, void 0, !1, n.catAxisLineHidden, "minor", i, n.catAxisLineDash);
	}
	if (L && Me) {
		let e = n.valAxisFontColor ? `#${n.valAxisFontColor}` : "#555";
		Fe(t, n, L, Me, et, r, We, Ge, U, qe, i, Le, Be, e, n.date1904);
	}
	Je && hi(t, n, Je, We, Ge + qe, U, s + z, i), ci(t, n, de, s, c, l, u, We, Ge, U, qe, ue + 2, i), Nn(t, n, s, c, l, u, We, Ge, U, qe, z, B, xe, Se);
}
//#endregion
//#region packages/core/src/chart/families/surface.ts
var ra = (e) => e[0] + e[2] > e[1] + e[3] ? [[
	0,
	1,
	2
], [
	0,
	2,
	3
]] : [[
	0,
	1,
	3
], [
	1,
	2,
	3
]], ia = 2e5, aa = 1.25;
function oa(e, t, n) {
	if (e.length === 0) return [];
	let r = [], i = (e) => n ? e.value >= t : e.value <= t, a = e[e.length - 1], o = i(a);
	for (let n of e) {
		let e = i(n);
		if (e !== o) {
			let e = n.value - a.value, i = e === 0 ? 0 : (t - a.value) / e;
			r.push({
				x: a.x + (n.x - a.x) * i,
				y: a.y + (n.y - a.y) * i,
				depth: a.depth + (n.depth - a.depth) * i,
				value: t
			});
		}
		e && r.push(n), a = n, o = e;
	}
	return r;
}
function sa(e, n, r, i, a = 0) {
	let { x: o, y: s, w: c, h: l } = r, u = ge(n), d = n.series, f = u.length, p = d.length;
	if (f < 2 || p < 2) return;
	let m = Infinity, h = -Infinity;
	for (let e of d) for (let t = 0; t < f; t++) {
		let n = e.values[t];
		n == null || !Number.isFinite(n) || (m = Math.min(m, n), h = Math.max(h, n));
	}
	if (!Number.isFinite(m) || !Number.isFinite(h)) return;
	n.valMin != null && (m = n.valMin), n.valMax != null && (h = n.valMax);
	let _ = {
		...n.threeD ?? {},
		rotationX: n.threeD?.rotationX ?? 15,
		rotationY: n.threeD?.rotationY ?? 20,
		rightAngleAxes: n.threeD?.rightAngleAxes ?? !1,
		perspective: n.threeD?.perspective ?? 30
	}, v = Wn(_), y = Hn(_), b = Un(_, r, {
		sceneDepthScale: aa,
		perspectiveTangentGain: y
	}), S;
	if (b) {
		let e = b.topology.axisX === "min" ? b.front.x : b.front.x + b.front.w, t = b.project(e, b.front.y + b.front.h, b.topology.nearDepth), n = b.project(e, b.front.y, b.topology.nearDepth);
		S = Math.hypot(n.x - t.x, n.y - t.y) / i;
	}
	let C = n.valAxisMajorUnit == null ? At(m, h, S) : null, T = ae(C == null ? n : {
		...n,
		valAxisMajorUnit: C
	}, m, h, S), E = T.step;
	if (!(E > 0) || !Number.isFinite(E)) return;
	let D = n.valMin ?? T.min, O = n.valMax ?? Math.max(D + E, D + Math.ceil((h - D) / E) * E), k = O - D;
	if (!(k > 0) || !Number.isFinite(k)) return;
	let A = Math.ceil(k / E), j = Math.floor(k / E + 1e-9) + 1, M = (f - 1) * (p - 1) * 2;
	if (!Number.isSafeInteger(A) || !Number.isSafeInteger(j) || A < 1 || j < 2 || M < 1 || A > 512 || j > 512 || A > Math.floor(ia / M) || j > ia) return;
	let N = A, ne = tt(n) ? (e) => 1 - (e - D) / k : (e) => (e - D) / k, F = Array.from({ length: j }, (e, t) => D + t * E), re = (e, t) => {
		let n = Math.min(e, t), r = Math.max(e, t), i = Math.max(1, Math.floor((n - D) / E) + 1), a = Math.min(N - 1, Math.ceil((r - D) / E) - 1), o = [0];
		if (e !== t) for (let n = i; n <= a; n++) o.push((D + n * E - e) / (t - e));
		return o.push(1), o.sort((e, t) => e - t), o;
	}, ie = Array.from({ length: N }, (e, t) => n.themeAccentColors?.[t % 6] ? `#${n.themeAccentColors[t % 6]}` : d[t]?.color ? `#${d[t].color}` : w(t, d[t])), I = new Map((n.surfaceBandFormats ?? []).map((e) => [e.idx, e])), oe = n.linkedChartStyleRoles?.dataPoint3D ?? (n.classicChartStyleRoles == null ? n.chartStyleRoles?.dataPoint3D : void 0), R = N <= 48 ? n.classicSurfaceBandStyles?.byBandCount?.[N - 1] ?? n.classicSurfaceBandStyles?.fixed : void 0, se = t(R, oe), le = n.linkedChartStyleRoles?.dataPointWireframe ?? (n.classicChartStyleRoles == null ? n.chartStyleRoles?.dataPointWireframe : void 0), ue = t(R, le), de = (e) => e?.lineNoStyle !== !0 && (e?.linePaintAuthored === !0 || e?.lineHidden === !0 || (e?.lineColors?.length ?? 0) > 0 || (e?.linePaints?.length ?? 0) > 0), fe = n.surfaceWireframe === !0 ? [] : Array.from({ length: N }, (e, t) => {
		let n = I.get(t), r, i = !0;
		if (n?.fillHidden === !0) r = Oe(oe), r !== void 0 && (i = !1);
		else if (n?.fill) r = n.fill, i = !1;
		else {
			let e = P(n?.style, oe, t);
			e === void 0 ? r = Ue(oe, t) : (r = e, i = !1);
		}
		return r === void 0 && n?.fillHidden === !0 && (r = Ue(oe, t)), r === void 0 && (r = Ue(R, t)), {
			recipe: r,
			fromRole: i
		};
	}), z = fe.map((e) => e.recipe), V = n.surfaceWireframe === !0 ? [] : Array.from({ length: N }, (e, t) => {
		let n = I.get(t), r;
		return r = n?.lineHidden === !0 ? Pn(oe) : n?.lineColor ? {
			fillType: "solid",
			color: n.lineColor
		} : ee(oe, oe, t, n?.style), r === void 0 && n?.lineHidden === !0 && (r = Be(oe, t)), r === void 0 && (r = Be(R, t)), r;
	}), me = (e, t) => {
		let n = e, r = n?.lineDashAuthored === !0 || n?.lineDash != null || n?.lineCustomDash != null;
		return {
			lineWidthEmu: n?.lineWidthEmu ?? t.lineWidthEmu,
			lineDash: r ? n?.lineDash : t.lineDash,
			lineCustomDash: r ? n?.lineCustomDash : t.lineCustomDash,
			lineCap: n?.lineCap ?? t.lineCap,
			lineJoin: n?.lineJoin ?? t.lineJoin,
			lineCompound: n?.lineCompound ?? t.lineCompound
		};
	}, ve = ue?.lineColorIndex, ye;
	ye = de(ue) ? ue?.lineHidden === !0 ? Be(ue, 0) : ve == null ? void 0 : ve == null ? null : Be(ue, ve) : void 0;
	let be = ve == null && de(ue) && ue?.lineHidden !== !0 ? Array.from({ length: N }, (e, t) => Be(ue, t)) : [], xe = ue == null ? {
		paint: void 0,
		lineWidthEmu: void 0,
		lineDash: void 0,
		lineCustomDash: void 0,
		lineCap: void 0,
		lineJoin: void 0,
		lineCompound: void 0
	} : {
		paint: ye,
		lineWidthEmu: ue?.lineWidthEmu,
		lineDash: ue?.lineDash,
		lineCustomDash: ue?.lineCustomDash,
		lineCap: ue?.lineCap,
		lineJoin: ue?.lineJoin,
		lineCompound: ue?.lineCompound
	}, Se = d[0], Ce;
	Ce = Se?.lineHidden === !0 ? Pn(le) : Se?.lineColor == null ? ce(Se?.chartexStyle, le, 0) : {
		fillType: "solid",
		color: Se.lineColor
	};
	let we = me(Se?.chartexStyle, xe), H = {
		paint: Ce === void 0 ? ye : Ce,
		...we,
		lineWidthEmu: Se?.lineWidthEmu ?? we.lineWidthEmu
	};
	H.lineCompound != null && H.lineCompound !== "sng" && (H.paint = null);
	let Te = Array.from({ length: N }, (e, t) => {
		let n = I.get(t);
		if (n) return n.lineHidden === !0 ? Pn(le) : n.lineColor == null ? ce(n.style, le, t) : {
			fillType: "solid",
			color: n.lineColor
		};
	}), Ee = Te.map((e, t) => {
		let n = I.get(t), r = me(n?.style, H), i = Ce === void 0 ? be[t] ?? H.paint : Ce, a = {
			paint: e === void 0 ? i : e,
			...r,
			lineWidthEmu: n?.lineWidthEmu ?? r.lineWidthEmu
		};
		return a.lineCompound != null && a.lineCompound !== "sng" && (a.paint = null), a;
	}), De = (e, t) => e.paint !== void 0 && e.paint === t.paint && e.lineWidthEmu === t.lineWidthEmu && e.lineDash === t.lineDash && e.lineCustomDash === t.lineCustomDash && e.lineCap === t.lineCap && e.lineJoin === t.lineJoin && e.lineCompound === t.lineCompound, ke = (e, t) => {
		let n = re(e, t), r = [];
		for (let i = 0; i < n.length - 1; i++) {
			let a = n[i], o = n[i + 1], s = e + (t - e) * ((a + o) / 2), c = Math.max(0, Math.min(N - 1, Math.floor((s - D) / E))), l = r[r.length - 1];
			l && Te[l.band] === void 0 && Te[c] === void 0 && De(Ee[l.band], Ee[c]) ? l.to = o : r.push({
				from: a,
				to: o,
				band: c
			});
		}
		return r;
	};
	if (n.surfaceWireframe === !0) {
		let e = 0, t = (t, n) => t == null || n == null || !Number.isFinite(t) || !Number.isFinite(n) ? !0 : (e += ke(t, n).length, e <= ia);
		for (let e = 0; e < p; e++) for (let n = 0; n < f - 1; n++) if (!t(d[e].values[n], d[e].values[n + 1])) return;
		for (let e = 0; e < f; e++) for (let n = 0; n < p - 1; n++) if (!t(d[n].values[e], d[n + 1].values[e])) return;
		for (let t = 0; t < p - 1; t++) for (let n = 0; n < f - 1; n++) {
			let r = [
				d[t].values[n],
				d[t].values[n + 1],
				d[t + 1].values[n + 1],
				d[t + 1].values[n]
			];
			if (r.some((e) => e == null || !Number.isFinite(e))) continue;
			let i = r;
			for (let t of ra(i)) {
				let n = Math.min(...t.map((e) => i[e])), r = Math.max(...t.map((e) => i[e])), a = Math.max(1, Math.floor((n - D) / E) + 1), o = Math.min(N - 1, Math.ceil((r - D) / E) - 1);
				if (!(o < a) && (e += o - a + 1, e > ia)) return;
			}
		}
	}
	let je = Te.some((e) => e === void 0) && (Ce !== void 0 || be.length === 0), Me = [
		{
			surface: n.threeD?.floor,
			role: "floor"
		},
		{
			surface: n.threeD?.sideWall,
			role: "wall"
		},
		{
			surface: n.threeD?.backWall,
			role: "wall"
		}
	].map(({ surface: e, role: t }) => qe(n, e, t)), Ne = 0;
	for (let e of [
		...z,
		...V,
		...n.surfaceWireframe === !0 && je ? [H.paint] : [],
		...n.surfaceWireframe === !0 ? be : [],
		...n.surfaceWireframe === !0 ? Te.filter((e) => e !== void 0) : [],
		...Me.flatMap((e) => [e.fill, e.line])
	]) {
		if (e == null) continue;
		let t = B(e);
		if (e.fillType === "gradient" && t > $n || t > er - Ne) return;
		Ne += t;
	}
	let Pe = Array.from({ length: N }, (e, t) => {
		let n = D + t * E, r = Math.min(O, n + E);
		return `${ht(n)}-${ht(r)}`;
	}), Fe = {
		...n,
		series: Pe.map((e, t) => {
			let n = z[t], r = V[t];
			return {
				name: e,
				color: n === null ? "00000000" : n?.fillType === "solid" ? n.color.replace(/^#/, "") : ie[t].replace(/^#/, ""),
				...r?.fillType === "solid" ? { lineColor: r.color.replace(/^#/, "") } : r === null ? { lineHidden: !0 } : {},
				values: []
			};
		})
	}, Le = [...z];
	Math.abs(_.rotationX) === 90 && (Fe.series.reverse(), Le.reverse());
	let Re = ai(e, Fe, c, l, .22, i), { legRightW: Ve, legLeftW: He, legTopH: We, legBottomH: Ge } = Kt(Re, n.legendOverlay === !0), Ke = Hi(e, n, c, l, i), Je = he(n.catAxisFontSizeHpt, l, i), Ye = n.threeD?.seriesAxis, Xe = ot(Ye?.fontSizeHpt, i) ?? Je, { px0: Ze, py0: Qe, pw: $e, ph: et } = jn(n, o, s, c, l, i, {
		titleBand: Ke,
		legendSideReserveFrac: .22,
		legendReserve: Re,
		pad: {
			t: Ke.bandH + We + Xe / 2,
			r: Ve + Xe * 3.2 + 12,
			b: mt(Je, n.catAxisLabelOffsetPercent) + Ge,
			l: He + Je * 1.5
		},
		honorPlotAreaManualLayout: !0
	}).plotRect;
	if (!($e > 0) || !(et > 0)) return;
	Wi(e, n, n.titleManualLayout || !n.titleRichRuns?.length ? o : Ze, s, n.titleManualLayout || !n.titleRichRuns?.length ? c : $e, l, s + Ke.topPad, Ke.fontPx), dn(e, n, Ze, Qe, $e, et, i, a);
	let W = Un(_, {
		x: Ze,
		y: Qe,
		w: $e,
		h: et
	}, {
		sceneDepthScale: aa,
		perspectiveTangentGain: y
	});
	if (!W) return;
	W = X(W, n.threeD ?? {}, {
		x: Ze,
		y: Qe,
		w: $e,
		h: et
	});
	let nt = v || Math.abs(_.rotationX) === 90 && _.rotationY === 0 && _.rightAngleAxes === !1 && _.perspective === 0, { front: G } = W, it = n.catAxisOrientation === "maxMin", K = In(n), q = (e) => G.x + g(e, f, K, it) * G.w, at = Ye?.orientation === "maxMin", J = (e) => g(e, p, !1, at), st = (e) => G.y + G.h - ne(e) * G.h, ct = [], lt = [], ut = (e, t) => {
		let n = (n) => ({
			x: e.x + (t.x - e.x) * n,
			y: e.y + (t.y - e.y) * n,
			depth: e.depth + (t.depth - e.depth) * n,
			value: e.value + (t.value - e.value) * n
		});
		for (let r of ke(e.value, t.value)) {
			let e = n(r.from), t = n(r.to);
			lt.push({
				points: [W.project(e.x, e.y, e.depth), W.project(t.x, t.y, t.depth)],
				band: r.band
			});
		}
	}, dt = (e) => {
		let t = Math.min(...e.map((e) => e.value)), n = Math.max(...e.map((e) => e.value)), r = Math.max(1, Math.floor((t - D) / E) + 1), i = Math.min(N - 1, Math.ceil((n - D) / E) - 1);
		for (let t = r; t <= i; t++) {
			let n = D + t * E, r = [], i = (e) => {
				r.some((t) => Math.abs(t.x - e.x) < 1e-9 && Math.abs(t.y - e.y) < 1e-9 && Math.abs(t.depth - e.depth) < 1e-9) || r.push(e);
			};
			for (let t = 0; t < e.length; t++) {
				let r = e[t], a = e[(t + 1) % e.length];
				if (r.value === n && i(r), r.value < n && a.value > n || r.value > n && a.value < n) {
					let e = (n - r.value) / (a.value - r.value);
					i({
						x: r.x + (a.x - r.x) * e,
						y: r.y + (a.y - r.y) * e,
						depth: r.depth + (a.depth - r.depth) * e,
						value: n
					});
				}
			}
			r.length === 2 && lt.push({
				points: [W.project(r[0].x, r[0].y, r[0].depth), W.project(r[1].x, r[1].y, r[1].depth)],
				band: t - 1
			});
		}
	}, ft = (e) => {
		if (n.surfaceWireframe === !0) {
			dt(e);
			return;
		}
		let t = Math.min(...e.map((e) => e.value)), r = Math.max(...e.map((e) => e.value)), i = Math.max(0, Math.floor((t - D) / E)), a = Math.min(N - 1, Math.floor((r - D) / E));
		for (let t = i; t <= a; t++) {
			let n = D + t * E, r = t === N - 1 ? O : n + E, i = oa(e, n, !0);
			if (i = oa(i, r, !1), i.length < 3) continue;
			let a = i.map((e) => W.project(e.x, e.y, e.depth));
			ct.push({
				points: a,
				scenePoints: i,
				band: t,
				depth: i.reduce((e, t) => e + W.cameraDepth(t.x, t.y, t.depth), 0) / i.length
			});
		}
	};
	e.save(), e.beginPath(), e.rect(Ze, Qe, $e, et), e.clip();
	let pt = (t, n, r, i, a = !1) => {
		if (t.length < 2) return;
		let o = a ? t.map((e) => W.projectUnbounded(e.x, e.y, e.depth)) : t.map((e) => W.project(e.x, e.y, e.depth));
		e.beginPath(), e.moveTo(o[0].x, o[0].y);
		for (let t = 1; t < o.length; t++) e.lineTo(o[t].x, o[t].y);
		e.strokeStyle = n, e.lineWidth = r, e.setLineDash(mn(i ?? "solid", r)), e.stroke();
	}, gt = W.topology.farDepth, _t = W.topology.nearDepth, vt = G.y + G.h, yt = G.y, xt = W.topology.farX === "min" ? G.x : G.x + G.w, St = [
		"floor",
		"sideWall",
		"backWall"
	].map((e) => {
		let t = n.threeD?.[e];
		return Bn(W, e, t?.thicknessPercent);
	}), wt = [
		"floor",
		"sideWall",
		"backWall"
	], Tt = (e, t, n, r, i, a) => {
		let o = St[e], s = wt[e];
		for (let e of Z(o, s, t, n)) o.thickness > 0 && !W.cameraFacing(o.faces[e.faceIndex]) || pt(e.scenePoints, r, i, a, !0);
	}, Et = (e, t, n, r) => {
		for (let i of e) {
			let e = ne(i);
			Tt(1, "y", e, t, n, r), Tt(2, "y", e, t, n, r);
		}
	}, Dt = (e, t, n, r) => {
		for (let i of e) Tt(0, "x", i, t, n, r), Tt(2, "x", i, t, n, r);
	}, Ot = St.some((e) => e.thickness > 0) ? St.map((e) => e.faces.filter((t) => e.thickness === 0 || W.cameraFacing(t)).map((e) => e.map((e) => W.projectUnbounded(e.x, e.y, e.depth)))) : [
		[
			W.project(G.x, vt, _t),
			W.project(G.x + G.w, vt, _t),
			W.project(G.x + G.w, vt, gt),
			W.project(G.x, vt, gt)
		],
		[
			W.project(xt, vt, _t),
			W.project(xt, vt, gt),
			W.project(xt, yt, gt),
			W.project(xt, yt, _t)
		],
		[
			W.project(G.x, vt, gt),
			W.project(G.x + G.w, vt, gt),
			W.project(G.x + G.w, yt, gt),
			W.project(G.x, yt, gt)
		]
	].map((e) => [e]);
	for (let t = 0; t < Ot.length; t++) {
		let r = Ot[t];
		if (!r.length) continue;
		let a = r.flat(), o = Me[t], s = o.fill?.fillType === "image" ? o.fill : null;
		if (s) {
			let r = jt(s), i = n.threeD?.[wt[t]];
			r && Q(e, s, r, i, wt[t], St[t], St[t].faces.map((e, t) => ({
				face: e,
				faceIndex: t
			})).filter(({ face: e }) => St[t].thickness === 0 || W.cameraFacing(e)).map(({ faceIndex: e }) => e), (e) => W.projectUnbounded(e.x, e.y, e.depth), k);
		}
		let c = Math.min(...a.map((e) => e.x)), l = Math.max(...a.map((e) => e.x)), u = Math.min(...a.map((e) => e.y)), d = Math.max(...a.map((e) => e.y)), f = s ? null : o.fill?.fillType === "solid" ? `#${o.fill.color}` : o.fill ? L(o.fill, e, c, u, l - c, d - u) : null, p = o.line?.fillType === "solid" ? `#${o.line.color}` : o.line ? L(o.line, e, c, u, l - c, d - u) : null, m = o.lineWidthEmu == null ? 1 : Ae(o.lineWidthEmu, i);
		for (let t of r) {
			e.beginPath(), e.moveTo(t[0].x, t[0].y);
			for (let n = 1; n < t.length; n++) e.lineTo(t[n].x, t[n].y);
			e.closePath(), f && (e.fillStyle = f, e.fill()), p && (e.strokeStyle = p, e.lineWidth = m, e.setLineDash(bt(o.lineCustomDash, o.lineDash, m)), e.lineCap = o.lineCap === "rnd" ? "round" : o.lineCap === "sq" ? "square" : "butt", e.lineJoin = o.lineJoin === "round" || o.lineJoin === "bevel" ? o.lineJoin : "miter", e.stroke());
		}
	}
	if (n.valAxisMinorGridlines === !0) {
		let e = rt(n, i);
		Et(T.minorLines.filter((e) => e >= D && e <= O), e.color, e.width, n.valAxisMinorGridlineDash);
	}
	if (ze(n)) {
		let e = U(n.valAxisGridlineColor, n.valAxisGridlineWidthEmu, i);
		if (n.valAxisMajorGridlines === !0) Et(F, e.color, e.width, n.valAxisGridlineDash);
		else for (let t of F) {
			let r = ne(t), i = st(t);
			St[2].thickness > 0 ? Tt(2, "y", r, e.color, e.width, n.valAxisGridlineDash) : pt([{
				x: G.x,
				y: i,
				depth: gt
			}, {
				x: G.x + G.w,
				y: i,
				depth: gt
			}], e.color, e.width, n.valAxisGridlineDash), St[1].thickness > 0 ? Tt(1, "y", r, e.color, e.width, n.valAxisGridlineDash) : pt([{
				x: xt,
				y: i,
				depth: _t
			}, {
				x: xt,
				y: i,
				depth: gt
			}], e.color, e.width, n.valAxisGridlineDash);
		}
	}
	if (n.catAxisMinorGridlines === !0) {
		let e = te(n, i);
		Dt(x(f, K), e.color, e.width, n.catAxisMinorGridlineDash);
	}
	if (n.catAxisMajorGridlines) {
		let e = U(n.catAxisGridlineColor, n.catAxisGridlineWidthEmu, i);
		Dt(pe(n, f), e.color, e.width, n.catAxisGridlineDash);
	}
	for (let e = 0; e < p - 1; e++) for (let t = 0; t < f - 1; t++) {
		let n = [
			d[e].values[t],
			d[e].values[t + 1],
			d[e + 1].values[t + 1],
			d[e + 1].values[t]
		];
		if (n.some((e) => e == null || !Number.isFinite(e))) continue;
		let r = [
			{
				x: q(t),
				y: st(n[0]),
				depth: J(e),
				value: n[0]
			},
			{
				x: q(t + 1),
				y: st(n[1]),
				depth: J(e),
				value: n[1]
			},
			{
				x: q(t + 1),
				y: st(n[2]),
				depth: J(e + 1),
				value: n[2]
			},
			{
				x: q(t),
				y: st(n[3]),
				depth: J(e + 1),
				value: n[3]
			}
		];
		for (let e of ra(n)) ft(e.map((e) => r[e]));
	}
	if (n.surfaceWireframe === !0) {
		for (let e = 0; e < p; e++) for (let t = 0; t < f - 1; t++) {
			let n = d[e].values[t], r = d[e].values[t + 1];
			n == null || r == null || !Number.isFinite(n) || !Number.isFinite(r) || ut({
				x: q(t),
				y: st(n),
				depth: J(e),
				value: n
			}, {
				x: q(t + 1),
				y: st(r),
				depth: J(e),
				value: r
			});
		}
		for (let e = 0; e < f; e++) for (let t = 0; t < p - 1; t++) {
			let n = d[t].values[e], r = d[t + 1].values[e];
			n == null || r == null || !Number.isFinite(n) || !Number.isFinite(r) || ut({
				x: q(e),
				y: st(n),
				depth: J(t),
				value: n
			}, {
				x: q(e),
				y: st(r),
				depth: J(t + 1),
				value: r
			});
		}
	}
	ct.sort((e, t) => e.depth - t.depth);
	let kt = Array.from({ length: N }, () => ({
		minX: Infinity,
		minY: Infinity,
		maxX: -Infinity,
		maxY: -Infinity
	})), Mt = Array.from({ length: N }, () => []);
	for (let e of ct) {
		Mt[e.band].push(e);
		let t = kt[e.band];
		for (let n of e.points) t.minX = Math.min(t.minX, n.x), t.minY = Math.min(t.minY, n.y), t.maxX = Math.max(t.maxX, n.x), t.maxY = Math.max(t.maxY, n.y);
	}
	for (let e of lt) {
		let t = kt[e.band];
		for (let n of e.points) t.minX = Math.min(t.minX, n.x), t.minY = Math.min(t.minY, n.y), t.maxX = Math.max(t.maxX, n.x), t.maxY = Math.max(t.maxY, n.y);
	}
	let Nt = (t, n) => {
		if (t == null) return t;
		if (t.fillType === "solid") return `#${t.color}`;
		let r = kt[n];
		return !Number.isFinite(r.minX) || !Number.isFinite(r.minY) || !Number.isFinite(r.maxX) || !Number.isFinite(r.maxY) ? null : L(t, e, r.minX, r.minY, r.maxX - r.minX, r.maxY - r.minY);
	}, Pt = z.map(Nt), It = V.map(Nt);
	for (let t = 0; t < N; t++) {
		if (Pt[t] === null) continue;
		let n = Mt[t].filter((e) => e.points.length >= 3);
		n.length && _e(e, I.get(t)?.style, se, 0, i, (e) => {
			e.beginPath();
			for (let t of n) {
				e.moveTo(t.points[0].x, t.points[0].y);
				for (let n = 1; n < t.points.length; n++) e.lineTo(t.points[n].x, t.points[n].y);
				e.closePath();
			}
			e.fillStyle = "#000000", e.fill();
		}, t);
	}
	for (let t of ct) {
		let n = I.get(t.band);
		e.beginPath(), e.moveTo(t.points[0].x, t.points[0].y);
		for (let n = 1; n < t.points.length; n++) e.lineTo(t.points[n].x, t.points[n].y);
		e.closePath();
		let r = Pt[t.band];
		if (r !== null) {
			let n = nt ? Vn(W.cameraNormal(t.scenePoints)) : 1;
			e.fillStyle = typeof r == "string" && fe[t.band]?.fromRole ? $(r, n) : r ?? $(ie[t.band], n), e.fill();
		}
		let a = It[t.band];
		if (a != null) {
			let t = n?.style, r = oe, o = R;
			e.strokeStyle = a;
			let s = n?.lineWidthEmu ?? t?.lineWidthEmu ?? r?.lineWidthEmu ?? o?.lineWidthEmu;
			e.lineWidth = s == null ? 1 : Ae(s, i), e.setLineDash(bt(t?.lineCustomDash ?? r?.lineCustomDash ?? o?.lineCustomDash, t?.lineDash ?? r?.lineDash ?? o?.lineDash, e.lineWidth));
			let c = t?.lineCap ?? r?.lineCap ?? o?.lineCap, l = t?.lineJoin ?? r?.lineJoin ?? o?.lineJoin;
			e.lineCap = c === "rnd" ? "round" : c === "sq" ? "square" : "butt", e.lineJoin = l === "round" || l === "bevel" ? l : "miter", e.stroke();
		}
	}
	if (n.surfaceWireframe === !0) {
		let t = je ? H.paint?.fillType === "solid" ? `#${H.paint.color}` : H.paint ? L(H.paint, e, Ze, Qe, $e, et) : H.paint : void 0, n = Te.map((e, n) => e === void 0 ? Ce !== void 0 || be.length === 0 ? t : Nt(be[n], n) : Nt(e, n));
		for (let t of lt) {
			let r = Ee[t.band], a = n[t.band];
			if (a === null) continue;
			e.beginPath(), e.moveTo(t.points[0].x, t.points[0].y), e.lineTo(t.points[1].x, t.points[1].y), e.strokeStyle = a ?? ie[t.band], e.lineWidth = r.lineWidthEmu == null ? Math.max(1, .75 * i) : Ae(r.lineWidthEmu, i), e.setLineDash(bt(r.lineCustomDash, r.lineDash, e.lineWidth));
			let o = r.lineCap, s = r.lineJoin;
			e.lineCap = o === "rnd" ? "round" : o === "sq" ? "square" : "butt", e.lineJoin = s === "round" || s === "bevel" ? s : "miter", e.stroke();
		}
	}
	e.restore();
	let Lt = W.project(G.x + G.w / 2, G.y + G.h / 2, .5), Rt = (t, n, r, a, o, s, c, l, u) => {
		if (c || t == null || t === "none") return;
		let d = a.x - r.x, f = a.y - r.y, p = Math.hypot(d, f);
		if (!(p > 1e-6)) return;
		let m = -f / p, h = d / p, g = (r.x + a.x) / 2, _ = (r.y + a.y) / 2;
		(g - Lt.x) * m + (_ - Lt.y) * h < 0 && (m = -m, h = -h);
		let v = zt(l, s, i), y = t === "cross" ? v / 2 : v, b = t === "out" || t === "cross" ? y : 0, x = t === "in" || t === "cross" ? y : 0;
		nn(e, n.x + m * b, n.y + h * b, n.x - m * x, n.y - h * x, o, s, u);
	}, Bt = W.project(G.x, vt, _t), Vt = W.project(G.x + G.w, vt, _t), Ht = n.catAxisLineWidthEmu == null ? 1 : Ae(n.catAxisLineWidthEmu, i);
	nn(e, Bt.x, Bt.y, Vt.x, Vt.y, n.catAxisLineColor ? `#${n.catAxisLineColor}` : "#000000", Ht, n.catAxisLineDash);
	let Ut = n.catAxisLineColor ? `#${n.catAxisLineColor}` : "#000000", Wt = n.catAxisHidden || n.catAxisLineHidden === !0, Gt = Math.max(1, Math.floor(n.catAxisTickMarkSkip ?? 1));
	for (let e = 0; e < f; e += Gt) Rt(n.catAxisMajorTickMark, W.project(q(e), vt, _t), Bt, Vt, Ut, Ht, Wt, "major", n.catAxisLineDash);
	if (n.catAxisMinorTickMark != null && n.catAxisMinorTickMark !== "none") for (let e = 0; e < f - 1; e++) {
		let t = (g(e, f, K, it) + g(e + 1, f, K, it)) / 2;
		Rt(n.catAxisMinorTickMark, W.project(G.x + t * G.w, vt, _t), Bt, Vt, Ut, Ht, Wt, "minor", n.catAxisLineDash);
	}
	e.font = un(Je, Y(n, n.catAxisFontFace, "minor"), n.catAxisFontBold ?? !1, n.catAxisFontItalic ?? !1), e.fillStyle = n.catAxisFontColor ? `#${n.catAxisFontColor}` : "#000000", e.textBaseline = "top";
	for (let t = 0; t < f; t++) {
		let r = Cn(t, f, In(n), Ft(n), n.catAxisLabelAlignment), i = W.project(G.x + r.fraction * G.w, vt, _t);
		e.textAlign = r.textAlign, e.fillText(u[t] ?? "", i.x, i.y + Ie(8, n.catAxisLabelOffsetPercent));
	}
	if (!Ye?.hidden) {
		let t = Ye?.lineWidthEmu == null ? 1 : Ae(Ye.lineWidthEmu, i), r = W.project(G.x, vt, .5), a = W.project(G.x + G.w, vt, .5), o = r.x >= a.x ? G.x : G.x + G.w, s = W.project(o, vt, _t), c = W.project(o, vt, gt);
		nn(e, s.x, s.y, c.x, c.y, Ye?.lineColor ? `#${Ye.lineColor}` : "#000000", t, Ye?.lineDash);
		let l = Ye?.lineColor ? `#${Ye.lineColor}` : "#000000", u = Math.max(1, Math.floor(Ye?.tickMarkSkip ?? 1));
		for (let e = 0; e < p; e += u) Rt(Ye?.majorTickMark, W.project(o, vt, J(e)), s, c, l, t, Ye?.lineHidden === !0, "major", Ye?.lineDash);
		if (Ye?.minorTickMark != null && Ye.minorTickMark !== "none") for (let e = 0; e < p - 1; e++) Rt(Ye.minorTickMark, W.project(o, vt, (J(e) + J(e + 1)) / 2), s, c, l, t, Ye.lineHidden === !0, "minor", Ye.lineDash);
		e.font = un(Xe, Y(n, Ye?.fontFace, "minor"), Ye?.fontBold ?? !1, Ye?.fontItalic ?? !1), e.fillStyle = Ye?.fontColor ? `#${Ye.fontColor}` : "#000000", e.textAlign = "left", e.textBaseline = "middle";
		for (let t = 0; t < p; t++) {
			let n = W.project(o, vt, J(t));
			e.fillText(d[t].name, n.x + 8, n.y);
		}
	}
	if (!n.valAxisHidden) {
		let t = W.topology.axisX === "min" ? G.x : G.x + G.w, r = W.project(t, G.y + G.h, _t), a = W.project(t, G.y, _t);
		if (Math.hypot(a.x - r.x, a.y - r.y) > 4) {
			let o = n.valAxisLineWidthEmu == null ? 1 : Ae(n.valAxisLineWidthEmu, i);
			nn(e, r.x, r.y, a.x, a.y, n.valAxisLineColor ? `#${n.valAxisLineColor}` : "#000000", o, n.valAxisLineDash), e.font = un(he(n.valAxisFontSizeHpt, l, i), Y(n, n.valAxisFontFace, "minor"), n.valAxisFontBold ?? !1, n.valAxisFontItalic ?? !1), e.fillStyle = n.valAxisFontColor ? `#${n.valAxisFontColor}` : "#000000";
			let s = (r.x + a.x) / 2 < Ze + $e / 2;
			e.textAlign = s ? "right" : "left", e.textBaseline = "middle";
			for (let r of F) {
				let i = W.project(t, st(r), _t);
				e.fillText(Ct(r, n.valAxisFormatCode, n.date1904), i.x + (s ? -6 : 6), i.y);
			}
		}
	}
	ci(e, Fe, Re, o, s, c, l, Ze, Qe, $e, et, Ke.bandH + 2, i, Le);
}
//#endregion
//#region packages/core/src/chart/families/area.ts
function ca(t, n, r, i, s = 0) {
	let { x: l, y: u, w: p, h: m } = r, g = ge(n), v = g.length;
	if (v === 0) return;
	let x = Xr(n, i), C = n.series.map((e, t) => ({
		series: e,
		chartIndex: t
	})).filter(({ series: e }) => e.seriesType == null || e.seriesType === "area"), T = n.series.map((e, t) => ({
		series: e,
		chartIndex: t
	})).filter(({ series: e }) => e.seriesType === "line");
	if (C.length === 0 && T.length === 0) return;
	let E = On(n), O = n.chartType === "stackedAreaPct" ? "percentStacked" : n.chartType === "stackedArea" ? "stacked" : "standard", A = n.plotGroups?.filter((e) => e.kind === "area") ?? [{
		kind: "area",
		seriesStart: 0,
		seriesCount: C.length,
		categoryAxis: "primary",
		valueAxis: "primary",
		seriesAxis: "none",
		grouping: O
	}], j = Array(n.series.length).fill(-1);
	for (let e = 0; e < C.length; e++) j[C[e].chartIndex] = e;
	let M = A.map((e) => {
		let t = [], r = Math.min(n.series.length, e.seriesStart + e.seriesCount);
		for (let n = e.seriesStart; n < r; n++) {
			let e = j[n];
			e >= 0 && t.push(e);
		}
		return {
			group: e,
			areaIndices: t
		};
	}), ee = Array(C.length).fill(!1), N = Array(C.length).fill(!1), te = Array(C.length).fill(null), P = C.map(() => Array(v).fill(0)), F = C.map(() => Array(v).fill(0)), ie = n.plotGroups?.filter((e) => (e.kind === "area" || e.kind === "line") && e.seriesCount > 0) ?? A, I = /* @__PURE__ */ new Map();
	for (let e of ie) {
		let t = e.valueAxis;
		I.set(t, (I.get(t) ?? !0) && e.grouping === "percentStacked");
	}
	for (let { group: e, areaIndices: t } of M) {
		let n = e.grouping ?? "standard", r = n === "stacked" || n === "percentStacked", i = n === "percentStacked", a = i && I.get(e.valueAxis) === !0 ? 100 : 1, o = i ? g.map((e, n) => t.reduce((e, t) => e + Math.abs(C[t].series.values[n] ?? 0), 0) || 1) : null;
		for (let e of t) ee[e] = r, N[e] = i, te[e] = o;
		for (let e = 0; e < v; e++) {
			let n = 0, s = 0;
			for (let c of t) {
				let t = C[c].series.values[e] ?? 0, l = i && o ? t / o[e] * a : t, u = l >= 0 ? n : s;
				P[c][e] = r ? u : 0, F[c][e] = r ? u + l : l, r && (l >= 0 ? n += l : s += l);
			}
		}
	}
	let L = ie.filter((e) => e.valueAxis !== "secondary"), R = L.length > 0 && L.every((e) => e.grouping === "percentStacked"), se = new Map(C.map((e, t) => [e.series, t])), ce = new Map(n.series.map((e, t) => [e, t])), le = (e) => E[ce.get(e) ?? -1]?.valueAxis === "secondary" || n.plotGroups == null && e.useSecondaryAxis === !0, ue = ie.filter((e) => e.valueAxis === "secondary"), de = ue.length > 0 && ue.every((e) => e.grouping === "percentStacked"), z = n.secondaryValAxis && n.series.some((e) => le(e)) ? n.secondaryValAxis : null, B = (e) => z != null && le(e), V = Hi(t, n, p, m, i), me = V.fontPx, _e = V.topPad, be = V.bandH, xe = he(n.catAxisFontSizeHpt, m, i), Se = he(n.valAxisFontSizeHpt, m, i), Ce = ai(t, n, p, m, .22, i), { legRightW: we, legLeftW: H, legTopH: Te, legBottomH: Ee } = Kt(Ce, n.legendOverlay === !0), Oe = $t(n, p, m, i), ke = Oe.catFontPx, Ne = Oe.valFontPx, Pe = Oe.catBandH, Le = Oe.valBandW, Be = ui(n), Ve = fi(n, i), He = pi(t, n, i), Ue = be + Te + Se / 2 + 2, We = (Be ? Ve : mt(xe, n.catAxisLabelOffsetPercent)) + Pe + Ee, Ge = m - Ue - We, U = f(z, n.series, Ge / i, "y", de, !1, (e) => le(e), (e, t) => {
		let n = se.get(e);
		return n == null ? e.values[t] ?? null : e.values[t] == null ? null : F[n][t] ?? null;
	}), qe = Math.max(8, Math.min(11, m / 20)), Je = ot(z?.fontSizeHpt, i) ?? qe, Ye = 0;
	if (z && U && !z.hidden) {
		let e = t.font;
		t.font = `${Je}px ${Y(n, z.fontFace, "minor")}`;
		let r = 0;
		for (let e of U.majorLines) r = Math.max(r, t.measureText(Ke(e, z.formatCode ?? null, n.date1904, z.displayUnits)).width);
		Ye = r + 18, t.font = e;
	}
	let Qe = z && z.title ? Zt(z.titleFontSizeHpt, i) + 8 : 0, $e = (() => {
		let e = Infinity, t = -Infinity;
		for (let n = 0; n < v; n++) {
			for (let r = 0; r < C.length; r++) {
				let { series: i } = C[r];
				B(i) || i.values[n] == null || (e = Math.min(e, P[r][n], F[r][n]), t = Math.max(t, P[r][n], F[r][n]));
			}
			for (let { series: r } of T) {
				if (B(r)) continue;
				let i = r.values[n];
				i != null && (e = Math.min(e, i), t = Math.max(t, i));
			}
		}
		return !isFinite(e) || !isFinite(t) ? {
			min: 0,
			max: 1
		} : R ? {
			min: e < 0 ? -100 : 0,
			max: t > 0 ? 100 : 0
		} : {
			min: e,
			max: t
		};
	})();
	if (!R) {
		let e = (e) => {
			$e = {
				min: Math.min($e.min, e),
				max: Math.max($e.max, e)
			};
		};
		for (let t = 0; t < C.length; t++) {
			let { series: n } = C[t];
			B(n) || h(n, "y", (e) => n.values[e] == null ? null : F[t][e], e);
		}
		for (let { series: t } of T) B(t) || h(t, "y", (e) => t.values[e] ?? null, e);
	}
	let et = ae(n, $e.min, $e.max, Ge / i, R), tt = n.valAxisFontSizeHpt == null ? Math.max(8, Math.min(11, Ge / 20)) : Se, W = 0;
	if (!n.valAxisHidden && n.plotAreaManualLayout != null && n.plotAreaManualLayout.layoutTarget !== "inner") {
		let e = t.font;
		t.font = un(tt, Y(n, n.valAxisFontFace, "minor"), n.valAxisFontBold ?? !1, n.valAxisFontItalic ?? !1);
		for (let e of et.majorLines) W = Math.max(W, t.measureText(k(n, e, R)).width);
		t.font = e;
	}
	let nt = Et({
		valAxisHidden: n.valAxisHidden,
		catAxisHidden: n.catAxisHidden,
		valLabelWidth: W,
		valLabelFontPx: tt,
		catLabelFontPx: xe,
		valLabelGapPx: n.valAxisFontSizeHpt == null ? 6 : Me(tt),
		catLabelGapPx: n.catAxisFontSizeHpt == null ? Ie(3, n.catAxisLabelOffsetPercent) : Ie(St(xe), n.catAxisLabelOffsetPercent),
		outerTextMarginPx: st * i,
		valTitleBandW: Le,
		catTitleBandH: Pe,
		secondaryBandW: Ye + Qe
	}), G = {
		t: Ue,
		r: we + p * .05 + Ye + Qe,
		b: We,
		l: H + Math.max(p * .12 + Le, He)
	};
	Wi(t, n, l, u, p, m, u + _e, me);
	let K = jn(n, l, u, p, m, i, {
		titleBand: V,
		legendSideReserveFrac: .22,
		legendReserve: Ce,
		pad: G,
		honorPlotAreaManualLayout: !0,
		manualOuterInsets: nt
	}), { px0: q, py0: at, pw: J } = K.plotRect, { ph: ct } = K.plotRect;
	if (J <= 0 || ct <= 0) return;
	let lt = Be ? mi(t, n, J / v, i) : null;
	lt && lt.totalHeight > Ve && (ct = Math.max(1, ct - (lt.totalHeight - Ve))), dn(t, n, q, at, J, ct, i, s);
	let ut = ae(n, $e.min, $e.max, ct / i, R), dt = In(n), ft = Ft(n), pt = je(n, g), ht = pt ? (e) => q + pt.positions[e] * J : dt ? (e) => q + ((ft ? v - 1 - e : e) + .5) / v * J : (e) => {
		let t = ft ? v - 1 - e : e;
		return q + (v === 1 ? J / 2 : t / (v - 1) * J);
	}, gt = (e) => at + ct - ut.frac(e) * ct, _t = U ? U.makeToY(at, ct) : gt, vt = (e) => B(e) ? _t : gt, yt = gt(Ji(n, ut.min, ut.max)), bt = z && U ? _t(qi(n.secondaryCatAxis?.crossesAt, n.secondaryCatAxis?.crosses, U.min, U.max)) : yt, xt = (e) => B(e) ? bt : yt, { color: Ct, width: wt } = d(n.catAxisLineColor, n.catAxisLineWidthEmu, i), { color: Tt, width: Dt } = d(n.valAxisLineColor, n.valAxisLineWidthEmu, i);
	if (!n.valAxisHidden) {
		let e = Xe(n, i), r = rt(n, i);
		if (n.valAxisMinorGridlines) for (let e of ut.minorLines) re(t, q, J, gt(e), !1, r);
		if (ze(n)) for (let n of ut.majorLines) re(t, q, J, gt(n), n === 0, e);
	}
	if (z && U && b(t, z, U, _t, q, J, i), !n.catAxisHidden && c(n)) {
		let e = fe(n, i);
		t.strokeStyle = e.color, t.lineWidth = e.width;
		let r = e.dash.length > 0 && t.getLineDash ? t.getLineDash() : [];
		e.dash.length > 0 && t.setLineDash(e.dash);
		let a = pt ? pt.majorTicks.map((e) => e.fraction) : pe(n, v);
		for (let e of a) {
			let n = q + e * J;
			t.beginPath(), t.moveTo(n, at), t.lineTo(n, at + ct), t.stroke();
		}
		e.dash.length > 0 && t.setLineDash(r);
	}
	let Ot = M.flatMap(({ areaIndices: e }) => e), kt = (e, t) => F[e]?.[t] ?? 0;
	for (let e of Ot) {
		let { series: r, chartIndex: o } = C[e], c = w(o, r), l = y(r, o), u = a(n, r, void 0, l), d = at + ct, f = vt(r), p = r.smooth === !0;
		_(t, S(r.chartexStyle), oe(n, "dataPoint", Ze(n, r)), l, {
			x: q,
			y: at,
			w: J,
			h: ct
		}, i, (t) => {
			if (t.beginPath(), ee[e]) {
				let n = [];
				for (let t = 0; t < v; t++) n.push({
					x: ht(t),
					y: gt(F[e][t])
				});
				t.moveTo(n[0].x, n[0].y), yn(t, n, p);
				for (let n = v - 1; n >= 0; n--) t.lineTo(ht(n), gt(P[e][n]));
			} else {
				let e = [];
				for (let t = 0; t < v; t++) e.push({
					x: ht(t),
					y: f(r.values[t] ?? 0)
				});
				t.moveTo(ht(0), d), t.lineTo(e[0].x, e[0].y), yn(t, e, p), t.lineTo(ht(v - 1), d);
			}
			t.closePath(), pr(t, u, {
				x: q,
				y: at,
				w: J,
				h: ct
			}, c, i, s), Re(t, n, "dataPoint", r, void 0, l, c, 1.5, i, {
				x: q,
				y: at,
				w: J,
				h: ct
			}, s) && t.stroke();
		});
	}
	let At = /* @__PURE__ */ new Map();
	for (let e = 0; e < C.length; e++) {
		let t = C[e].series, n = t.areaGroupIndex ?? 0, r = At.get(n) ?? [];
		r.push({
			series: t,
			areaIndex: e
		}), At.set(n, r);
	}
	for (let r of n.areaGroupDecorations ?? []) {
		if (!r.dropLines || !e(t, Pt(n, r.dropLines, "dropLine"), i)) continue;
		let a = At.get(r.groupIndex) ?? [];
		for (let e = 0; e < v; e++) {
			let n = Infinity, r = -Infinity, i = !1;
			for (let t of a) {
				if (t.series.values[e] == null) continue;
				let a = vt(t.series)(kt(t.areaIndex, e)), o = xt(t.series);
				!Number.isFinite(a) || !Number.isFinite(o) || (n = Math.min(n, a, o), r = Math.max(r, a, o), i = !0);
			}
			!i || Math.abs(r - n) < .01 || (t.beginPath(), t.moveTo(ht(e), n), t.lineTo(ht(e), r), t.stroke());
		}
	}
	{
		let e = Math.max(2, 2.5 * i);
		for (let r = 0; r < C.length; r++) {
			let { series: a, chartIndex: c } = C[r], d = ye(a.dataPointOverrides), f = w(c, a), h = vt(a), _ = (e) => kt(r, e), y = te[r];
			for (let e of a.errBars ?? []) yi(t, a, Xt(n, e), v, ht, h, _, f);
			let b = (a.showMarker === !0 || ne(a)) && a.markerSymbol !== "none", S = Mr(n, a, c);
			if (b || Ht(a)) for (let r = 0; r < v; r++) {
				if (a.sourceHidden?.[r] === !0 || a.values[r] == null) continue;
				let c = d.get(r), l = ve(a, c, "circle", b);
				if (l === "none") continue;
				let u = ht(r), p = h(_(r));
				if (S || D(c)) {
					let e = c?.markerSize ?? a.markerSize ?? 5, d = o(a, c, r, f), m = c?.markerLine ?? a.markerLine ?? null, h = c?.markerLineWidthEmu ?? a.markerLineWidthEmu;
					jr(t, n, a, c, r, u, p, l, e, d, m, i, h == null ? void 0 : Ae(h, i), Lt(a, c, r), s);
				} else t.fillStyle = f, t.beginPath(), t.arc(u, p, e, 0, Math.PI * 2), t.fill();
			}
			Di(t, a, g, v, ht, h, _, ct, i, n.date1904 ?? !1, !0, Y(n, n.dataLabelFontFace, "minor"), n.dataLabelPosition ?? "ctr", {
				x: q,
				y: at,
				w: J,
				h: ct
			}, {
				x: l,
				y: u,
				w: p,
				h: m
			}, N[r] && y ? (e) => (a.values[e] ?? 0) / y[e] : void 0, void 0, (e) => Y(n, e, "minor"), B(a) ? z?.displayUnits : n.valAxisDisplayUnits, (e) => x(c, e), (e) => bi(n, e, B(a) && U ? U.max : ut.max), s);
		}
	}
	for (let { series: e, chartIndex: a } of T) {
		let c = ye(e.dataPointOverrides), d = w(a, e), f = e.lineColor ? `#${e.lineColor}` : d, h = y(e, a), b = vt(e), C = it(n, a), T = [], E = [], D = () => {
			E.length > 0 && T.push(E), E = [];
		};
		for (let t = 0; t < v; t++) {
			let r = e.values[t];
			if (e.sourceHidden?.[t] === !0) {
				D();
				continue;
			}
			r == null && ((n.dispBlanksAs ?? "gap") === "gap" && D(), (n.dispBlanksAs ?? "gap") !== "zero") || E.push({
				x: ht(t),
				y: b(r ?? 0),
				index: t
			});
		}
		D(), C ? Ut(t, n, e, T, e.smooth === !0, !1, d, Math.max(1, 2.25 * i), i, {
			x: q,
			y: at,
			w: J,
			h: ct
		}, s) : _(t, S(e.chartexStyle), n.chartStyleRoles?.dataPointLine, h, {
			x: q,
			y: at,
			w: J,
			h: ct
		}, i, (t) => {
			if (Re(t, n, "dataPointLine", e, void 0, h, d, Math.max(1, 2.25 * i), i, {
				x: q,
				y: at,
				w: J,
				h: ct
			}, s)) {
				t.beginPath();
				for (let n of T) t.moveTo(n[0].x, n[0].y), yn(t, n, e.smooth === !0);
				t.stroke();
			}
		});
		let O = (t) => e.values[t] ?? 0;
		for (let r of e.errBars ?? []) yi(t, e, Xt(n, r), v, ht, b, O, f);
		let k = (e.showMarker === !0 || ne(e)) && e.markerSymbol !== "none";
		if (k || Ht(e)) for (let r = 0; r < v; r++) {
			if (e.sourceHidden?.[r] === !0) continue;
			let a = e.values[r];
			if (a == null) continue;
			let l = c.get(r), u = ve(e, l, "circle", k);
			u !== "none" && jr(t, n, e, l, r, ht(r), b(a), u, l?.markerSize ?? e.markerSize ?? 5, o(e, l, r, f), l?.markerLine ?? e.markerLine ?? null, i, (l?.markerLineWidthEmu ?? e.markerLineWidthEmu) == null ? void 0 : Ae(l?.markerLineWidthEmu ?? e.markerLineWidthEmu, i), Lt(e, l, r), s);
		}
		Di(t, e, g, v, ht, b, O, ct, i, n.date1904 ?? !1, !1, Y(n, n.dataLabelFontFace, "minor"), n.dataLabelPosition ?? "r", {
			x: q,
			y: at,
			w: J,
			h: ct
		}, {
			x: l,
			y: u,
			w: p,
			h: m
		}, void 0, void 0, (e) => Y(n, e, "minor"), B(e) ? z?.displayUnits : n.valAxisDisplayUnits, (e) => x(a, e), (t) => bi(n, t, B(e) && U ? U.max : ut.max), s), Rr(t, e, f, ht, b, i, void 0, {
			chart: n,
			chartRect: r,
			plotRect: {
				x: q,
				y: at,
				w: J,
				h: ct
			},
			shapeRotationDeg: s
		});
	}
	if (!n.valAxisHidden) {
		let e = n.valAxisFontSizeHpt == null ? Math.max(8, Math.min(11, ct / 20)) : Se;
		t.font = un(e, Y(n, n.valAxisFontFace, "minor"), n.valAxisFontBold ?? !1, n.valAxisFontItalic ?? !1), t.textBaseline = "middle";
		for (let r of ut.majorLines) {
			let a = gt(r);
			De(t, n.valAxisMajorTickMark, "val", q, a, Tt, Dt, !1, n.valAxisLineHidden, "major", i, n.valAxisLineDash), t.fillStyle = n.valAxisFontColor ? `#${n.valAxisFontColor}` : "#555", t.textAlign = "right";
			let o = n.valAxisFontSizeHpt == null ? 6 : Me(e);
			t.fillText(k(n, r, R), q - o, a);
		}
		if (n.valAxisMinorTickMark && n.valAxisMinorTickMark !== "none") for (let e of ut.minorTicks) De(t, n.valAxisMinorTickMark, "val", q, gt(e), Tt, Dt, !1, n.valAxisLineHidden, "minor", i, n.valAxisLineDash);
	}
	if (!n.catAxisHidden && !n.catAxisLineHidden && nn(t, q, yt, q + J, yt, Ct, wt, n.catAxisLineDash), !n.valAxisHidden && !n.valAxisLineHidden && n.valAxisLineColor != null && nn(t, q, at, q, at + ct, Tt, Dt, n.valAxisLineDash), !n.catAxisHidden && n.catAxisMajorTickMark && n.catAxisMajorTickMark !== "none") {
		let e = Math.max(1, Math.floor(n.catAxisTickMarkSkip ?? 1));
		if (pt) for (let e of pt.majorTicks) De(t, n.catAxisMajorTickMark, "cat", yt, q + e.fraction * J, Ct, wt, !1, n.catAxisLineHidden, "major", i, n.catAxisLineDash);
		else if (dt) for (let r = 0; r <= v; r += e) De(t, n.catAxisMajorTickMark, "cat", yt, q + r / v * J, Ct, wt, !1, n.catAxisLineHidden, "major", i, n.catAxisLineDash);
		else for (let r = 0; r < v; r += e) De(t, n.catAxisMajorTickMark, "cat", yt, ht(r), Ct, wt, !1, n.catAxisLineHidden, "major", i, n.catAxisLineDash);
	}
	if (!n.catAxisHidden && n.catAxisMinorTickMark && n.catAxisMinorTickMark !== "none" && pt) for (let e of pt.minorTicks) De(t, n.catAxisMinorTickMark, "cat", yt, q + e.fraction * J, Ct, wt, !1, n.catAxisLineHidden, "minor", i, n.catAxisLineDash);
	if (!Be && !n.catAxisHidden) {
		let e = n.catAxisFontSizeHpt == null ? Math.max(8, Math.min(11, J / v * .8)) : xe;
		t.fillStyle = n.catAxisFontColor ? `#${n.catAxisFontColor}` : "#555", t.textAlign = "center", t.textBaseline = "top", t.font = un(e, Y(n, n.catAxisFontFace, "minor"), n.catAxisFontBold ?? !1, n.catAxisFontItalic ?? !1);
		let r = Math.max(1, Math.floor(n.catAxisTickLabelSkip ?? 1)), i = pt ? pt.majorTicks.map((e) => ({
			label: vn(String(e.serial), n.catAxisFormatCode, n.date1904),
			x: q + e.fraction * J,
			categoryIndex: -1
		})) : Array.from({ length: Math.ceil(v / r) }, (e, t) => {
			let i = t * r;
			return {
				label: vn((g[i] ?? "").toString(), n.catAxisFormatCode, n.date1904),
				x: ht(i),
				categoryIndex: i
			};
		});
		for (let r of i) {
			let i = r.label;
			if (!i) continue;
			let a = r.categoryIndex < 0 ? null : Cn(r.categoryIndex, v, In(n), Ft(n), n.catAxisLabelAlignment), o = Ie(n.catAxisFontSizeHpt == null ? 3 : St(e), n.catAxisLabelOffsetPercent);
			t.textAlign = a?.textAlign ?? "center";
			let s = n.catAxisTickLabelPos ?? "nextTo", c = s === "nextTo" ? yt : s === "high" ? at : at + ct;
			t.fillText(i, a ? q + a.fraction * J : r.x, c + o);
		}
	}
	if (z && U) {
		let e = n.valAxisFontColor ? `#${n.valAxisFontColor}` : "#555";
		Fe(t, n, z, U, _t, r, q, at, J, ct, i, Je, Ye, e, n.date1904);
	}
	lt && hi(t, n, lt, q, at + ct, J, l + H, i), ci(t, n, Ce, l, u, p, m, q, at, J, ct, be + 2, i), Nn(t, n, l, u, p, m, q, at, J, ct, H, Ee, ke, Ne);
}
//#endregion
//#region packages/core/src/chart/families/pie.ts
var la = .88;
function ua(t, n, r, i, o = 0) {
	let c = n.series[0];
	if (!c) return;
	let l = Mn(n.ofPie, c.values);
	if (l == null || l.size === 0) {
		da(t, {
			...n,
			chartType: "pie"
		}, r, !1, i, o);
		return;
	}
	let u = [], d = [];
	for (let e = 0; e < c.values.length; e++) {
		let t = c.values[e], n = t == null ? 0 : Math.abs(t);
		!(n > 0) || !Number.isFinite(n) || (l.has(e) ? d : u).push({
			sourceIndex: e,
			value: n
		});
	}
	if (d.length === 0) {
		da(t, {
			...n,
			chartType: "pie"
		}, r, !1, i, o);
		return;
	}
	let f = {
		...n,
		chartType: "pie"
	}, p = ai(t, f, r.w, r.h, .28, i), m = jn(n, r.x, r.y, r.w, r.h, i, {
		titleTopPadFrac: .035,
		titleBottomPadFrac: .035,
		legendSideReserveFrac: .28,
		legendReserve: p,
		radialGapFrac: .02,
		honorPlotAreaManualLayout: !0
	});
	Wi(t, n, r.x, r.y, r.w, r.h, r.y + m.title.topPad, m.title.fontPx);
	let { px0: h, py0: g, pw: v, ph: y } = m.plotRect;
	if (!(v > 0) || !(y > 0)) return;
	dn(t, n, h, g, v, y, i, o);
	let b = n.ofPie, x = Math.max(.05, Math.min(2, (b?.secondPieSizePercent ?? 75) / 100)), C = Math.max(0, b?.gapWidthPercent ?? 150) / 100, w = Math.min(y * .44, v * .9 / (2 + 2 * x + C)), T = w * x;
	if (!(w > 0) || !(T > 0)) return;
	let E = h + (v - (2 * w + C * w + 2 * T)) / 2, D = E + w, O = E + 2 * w + C * w + T, k = g + y / 2, A = d.reduce((e, t) => e + t.value, 0), j = ye(c.dataPointOverrides), M = [...u, {
		sourceIndex: d[0].sourceIndex,
		value: A
	}], ee = (e, r, l) => {
		let u = e.reduce((e, t) => e + t.value, 0), d = -Math.PI / 2, f = d, p = d;
		for (let m = 0; m < e.length; m++) {
			let h = e[m], g = u > 0 ? h.value / u * Math.PI * 2 : 0, v = j.get(h.sourceIndex), y = s(n, c, 0, h.sourceIndex), b = Rt(h.sourceIndex, c, n.varyColors !== !1, 0), x = a(n, c, v, y, h.sourceIndex), C = d, w = d + g;
			_(t, S(v?.chartexStyle, c.chartexStyle), oe(n, "dataPoint", 0), y, {
				x: r - l,
				y: k - l,
				w: l * 2,
				h: l * 2
			}, i, (e) => {
				e.beginPath(), e.moveTo(r, k), e.arc(r, k, l, C, w), e.closePath(), pr(e, x, {
					x: r - l,
					y: k - l,
					w: l * 2,
					h: l * 2
				}, b, i, o), va(e, n, c, v, y, "#FFFFFF", i, {
					x: r - l,
					y: k - l,
					w: l * 2,
					h: l * 2
				}, o);
			}), m === e.length - 1 && (f = d, p = d + g), d += g;
		}
		return {
			aggregateStart: f,
			aggregateEnd: p
		};
	}, N = ee(M, D, w), te = k - T, P = k + T;
	if ((b?.type ?? "pie") === "bar") {
		let e = k - T, r = T;
		for (let l of d) {
			let u = A > 0 ? 2 * T * l.value / A : 0, d = O - r / 2, f = j.get(l.sourceIndex), p = s(n, c, 0, l.sourceIndex), m = Rt(l.sourceIndex, c, n.varyColors !== !1, 0), h = a(n, c, f, p, l.sourceIndex);
			_(t, S(f?.chartexStyle, c.chartexStyle), oe(n, "dataPoint", 0), p, {
				x: d,
				y: e,
				w: r,
				h: u
			}, i, (t) => {
				mr(t, h, {
					x: d,
					y: e,
					w: r,
					h: u
				}, m, i, o), t.beginPath(), t.rect(d, e, r, u), va(t, n, c, f, p, "#FFFFFF", i, {
					x: d,
					y: e,
					w: r,
					h: u
				}, o);
			}), e += u;
		}
		te = k - T, P = k + T;
	} else ee(d, O, T);
	if (b?.seriesLines ?? !0) {
		let r = Pt(n, b?.seriesLineStyle ?? {}, "seriesLine"), a = e(t, {
			...r,
			color: r.color ?? "808080"
		}, i), o = {
			x: D + Math.cos(N.aggregateStart) * w,
			y: k + Math.sin(N.aggregateStart) * w
		}, s = {
			x: D + Math.cos(N.aggregateEnd) * w,
			y: k + Math.sin(N.aggregateEnd) * w
		};
		a && (t.beginPath(), t.moveTo(o.x, o.y), t.lineTo(O - T, te), t.stroke(), t.beginPath(), t.moveTo(s.x, s.y), t.lineTo(O - T, P), t.stroke());
	}
	p && ci(t, f, p, r.x, r.y, r.w, r.h, h, g, v, y, m.title.bandH + 2, i);
}
function da(e, t, n, r, i, o = 0) {
	let { x: c, y: l, w: u, h: d } = n, f = t.series[0];
	if (!f) return;
	let p = f.categories && f.categories.length > 0 ? f.categories : t.categories, m = f.values.map((e) => Math.abs(e ?? 0)), h = m.reduce((e, t) => e + t, 0);
	if (h === 0) return;
	let g = r && t.varyColors === !1 && t.series.length > 1 ? t : {
		...t,
		series: [{
			...f,
			categories: p
		}]
	}, v = ai(e, g, u, d, .28, i), y = jn(t, c, l, u, d, i, {
		titleTopPadFrac: .035,
		titleBottomPadFrac: .035,
		legendSideReserveFrac: .28,
		legendReserve: v,
		radialGapFrac: .02,
		honorPlotAreaManualLayout: !0
	}), b = y.title.fontPx, x = y.title.bandH;
	Wi(e, t, c, l, u, d, l + y.title.topPad, b);
	let { px0: C, py0: w, pw: T, ph: E } = y.plotRect;
	dn(e, t, C, w, T, E, i, o);
	let D = y.center.cx, O = y.center.cy, k = Math.min(T, E) * .42, A = -Math.PI / 2 + (t.firstSliceAngle ?? 0) * Math.PI / 180, j = r ? Math.max(1, Math.min(90, t.holeSize ?? 50)) : 0, M = r ? t.series : [f], ee = new Map(M.map((e) => [e, ye(e.dataPointOverrides)])), N = (k - j / 100 * k) / M.length, te = (e, t) => {
		let n = ee.get(e)?.get(t)?.explosion ?? e.explosion ?? 0;
		return n > 0 ? n / 100 * k : 0;
	}, P = f.seriesDataLabels ?? {
		showVal: !1,
		showCatName: !1,
		showSerName: !1,
		showPercent: !1
	}, ne = f.seriesDataLabels != null || (f.dataLabelOverrides?.length ?? 0) > 0, F = t.showDataLabels && !ne, re = Y(t, P.fontFace ?? t.dataLabelFontFace, "minor");
	for (let n = 0; n < M.length; n++) {
		let c = M[n], l = c.values.map((e) => Math.abs(e ?? 0)), u = l.reduce((e, t) => e + t, 0);
		if (u === 0) continue;
		let d = k - n * N, f = d - N, p = A;
		for (let m = 0; m < l.length; m++) {
			let h = l[m] / u * Math.PI * 2;
			if (!(h > 0)) continue;
			let g = s(t, c, n, m), v = Rt(m, c, t.varyColors !== !1, n), y = ee.get(c)?.get(m), b = p + h / 2, x = te(c, m), C = x > 0 ? Math.cos(b) * x : 0, w = x > 0 ? Math.sin(b) * x : 0, T = a(t, c, y, g, m), E = {
				x: D + C - d,
				y: O + w - d,
				w: d * 2,
				h: d * 2
			};
			if (_(e, S(y?.chartexStyle, c.chartexStyle), oe(t, "dataPoint", Ze(t, c)), g, E, i, (e) => {
				e.beginPath(), f > .01 ? (e.arc(D + C, O + w, d, p, p + h), e.arc(D + C, O + w, f, p + h, p, !0)) : (e.moveTo(D + C, O + w), e.arc(D + C, O + w, d, p, p + h)), e.closePath(), pr(e, T, E, v, i, o), va(e, t, c, y, g, v, i, E, o);
			}), F && n === 0 && h > .15) {
				let t = k * (r ? .75 : .6), n = D + C + Math.cos(b) * t, i = O + w + Math.sin(b) * t, a = Math.round(l[m] / u * 100);
				e.font = `bold ${Math.max(8, k * .1)}px ${re}`, e.fillStyle = "#fff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(`${a}%`, n, i);
			}
			p += h;
		}
	}
	ne && fa(e, t, P, f, p, m, h, D, O, k, r ? k - N : 0, A, re, i, C, w, T, E, c, l, u, d, o), v && ci(e, g, v, c, l, u, d, C, w, T, E, x + 2, i);
}
function fa(e, t, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C) {
	let w = ye(i.dataLabelOverrides ?? []), T = Xr({
		...t,
		series: [{
			...i,
			categories: a
		}]
	}, m), E = /* @__PURE__ */ new Set();
	for (let e = 0; e < o.length; e++) {
		if (i.sourceHidden?.[e] === !0) continue;
		let t = w.get(e);
		if (K(r, t)) continue;
		let n = ln(t?.labelBox, r.labelBox);
		n?.fillHidden !== !0 && (n?.fill != null || n?.fillPaint != null) && E.add(e);
	}
	E.size > 0 && _a(e, t, r, i, a, o, s, c, l, u, d, f, p, m, h, _, g, v, y, b, x, S, E, w, C);
	let D = [], O = f;
	for (let f = 0; f < o.length; f++) {
		let k = o[f] / s * Math.PI * 2, A = O + k / 2;
		if (O += k, i.sourceHidden?.[f] === !0 || E.has(f)) continue;
		let j = w.get(f);
		if (K(r, j)) continue;
		let M = j?.showCatName ?? r.showCatName, ee = j?.showSerName ?? r.showSerName, N = j?.showVal ?? r.showVal, te = j?.showPercent ?? r.showPercent, P = j?.showLegendKey ?? r.showLegendKey ?? !1, ne = Wt({
			customText: j?.text,
			showCategory: M,
			showSeries: ee,
			showValue: N,
			showPercent: te,
			category: (a[f] ?? "").toString(),
			seriesName: i.name,
			sourceValue: o[f],
			percentRatio: o[f] / s,
			formatCode: j?.formatCode ?? r.formatCode ?? i.valFormatCode ?? null,
			percentFormatCode: j?.formatCode ?? r.formatCode ?? "0%",
			date1904: t.date1904 ?? !1,
			separator: j?.separator ?? r.separator
		}), F = P ? T(0, f) : void 0;
		if (!ne && !F) continue;
		let re = (j?.position ?? r.position ?? "bestFit") === "outEnd", ie = ot(j?.fontSizeHpt ?? r.fontSizeHpt, m) ?? Math.max(8, u * .1), I = j?.fontBold ?? r.fontBold, ae = j?.fontColor ?? r.fontColor, oe = j?.fontFace ?? r.fontFace ? Y(t, j?.fontFace ?? r.fontFace, "minor") : p, L = Te(j, r), R = Ci(t, j, m, oe, I ?? !1, L), se = d > .01 ? (d + u) / 2 : u * la;
		if (j?.manualLayout) {
			e.font = `${L.fontItalic ? "italic " : ""}${I ? "bold " : ""}${ie}px ${oe}`, Ti(e, ne, {
				kind: "point",
				x: c + Math.cos(A) * se,
				y: l + Math.sin(A) * se,
				position: "ctr"
			}, {
				x: h,
				y: g,
				w: _,
				h: v
			}, ie, ae ? `#${ae}` : "#fff", j.manualLayout, {
				x: y,
				y: b,
				w: x,
				h: S
			}, R, F, L, m, ln(j?.labelBox, r.labelBox), C);
			continue;
		}
		if (re) {
			e.font = `${L.fontItalic ? "italic " : ""}${I ? "bold " : ""}${ie}px ${oe}`;
			let t = R ? Gn(e, R, ie, ae ? `#${ae}` : "#333") : null, r = ie * 1.15, i = t ? [] : n(ne, Math.max(0, x - ie), Math.max(0, S - ie), r, (t) => e.measureText(t).width, L);
			if (R && !t || !t && i.length === 0 && !F) continue;
			let a = t?.width ?? i.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), o = t?.height ?? ie + Math.max(0, i.length - 1) * r, s = F ? ni([F.entry], ie, m)[0] ?? 0 : 0, d = F ? ri(F.entry, ie, m) : 0;
			D.push(ha(i, A, c, l, u, Math.min(s + (ne ? 4 : 0) + a, Math.max(0, x - ie)), Math.min(Math.max(d, o), Math.max(0, S - ie)), r, ie, I ?? !1, ae ? `#${ae}` : "#333", oe, t ?? void 0, F, L, m));
			continue;
		}
		let ce = se, le = c + Math.cos(A) * ce, ue = l + Math.sin(A) * ce;
		e.font = `${L.fontItalic ? "italic " : ""}${I ? "bold " : ""}${ie}px ${oe}`;
		let de = 2 * ce * Math.sin(Math.min(Math.PI, Math.abs(k)) / 2) - ie, fe = d > .01 ? u - d - ie : u - ie;
		if (!(de > 0) || !(fe > 0)) continue;
		let z = ya({
			x: le - de / 2,
			y: ue - fe / 2,
			w: de,
			h: fe
		}, {
			x: h,
			y: g,
			w: _,
			h: v
		});
		z && Ti(e, ne, {
			kind: "point",
			x: le,
			y: ue,
			position: "ctr"
		}, z, ie, ae ? `#${ae}` : "#fff", void 0, {
			x: y,
			y: b,
			w: x,
			h: S
		}, R, F, L, m, ln(j?.labelBox, r.labelBox), C);
	}
	ga(e, D, y, b, x, S);
}
function pa(e, t, n, r, i, a) {
	let o = Math.max(Math.abs(n - e) - i, 0), s = Math.max(Math.abs(r - t) - a, 0);
	return Math.hypot(o, s);
}
function ma(e, t, n, r, i) {
	let a = Math.cos(e), o = Math.sin(e), s = t + i, c = 0, l = s + Math.hypot(n, r);
	for (let e = 0; e < 32; e++) {
		let e = (c + l) / 2;
		pa(0, 0, a * e, o * e, n, r) >= s ? l = e : c = e;
	}
	return l;
}
function ha(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m = {}, h = 1) {
	let g = vt(a, o, m.textRotation, m.textVerticalMode), _ = $e(m, h), v = a + _.left + _.right, y = o + _.top + _.bottom, b = vt(v, y, m.textRotation, m.textVerticalMode);
	a = b.w, o = b.h;
	let x = ma(t, i, g.w / 2, g.h / 2, c * .5), S = n + Math.cos(t) * x, C = r + Math.sin(t) * x;
	return {
		lines: e,
		rich: f,
		legendKey: p,
		boxW: a,
		boxH: o,
		unrotatedW: v,
		unrotatedH: y,
		textStyle: m,
		ptToPx: h,
		lineHeight: s,
		fontPx: c,
		bold: l,
		fontColor: u,
		font: d,
		cxBox: S,
		cyBox: C
	};
}
function ga(e, t, n, r, i, a) {
	if (t.length !== 0) {
		e.save(), e.beginPath(), e.rect(n, r, i, a), e.clip();
		for (let n of t) {
			let t = $e(n.textStyle, n.ptToPx), r = vt(n.unrotatedW, n.unrotatedH, n.textStyle.textRotation, n.textStyle.textVerticalMode), i = n.cxBox + (t.left - t.right) / 2, a = n.cyBox + (t.top - t.bottom) / 2, o = Math.max(0, n.unrotatedW - t.left - t.right), s = nt(n.textStyle, "center"), c = s === "left" ? n.cxBox - n.unrotatedW / 2 + t.left : s === "right" ? n.cxBox + n.unrotatedW / 2 - t.right : i;
			if (e.save(), r.radians !== 0 && (e.translate(n.cxBox, n.cyBox), e.rotate(r.radians), e.translate(-n.cxBox, -n.cyBox)), !n.legendKey) {
				if (n.rich) {
					zn(e, n.rich, c, a, s, "middle", o), e.restore();
					continue;
				}
				e.font = `${n.textStyle.fontItalic ? "italic " : ""}${n.bold ? "bold " : ""}${n.fontPx}px ${n.font}`, e.fillStyle = n.fontColor, e.textAlign = s, e.textBaseline = "middle";
				let t = (n.textStyle.fontBaseline ?? 0) * n.fontPx, r = a - (n.lines.length - 1) * n.lineHeight / 2 - t;
				if (!(n.textStyle.fontPaintAuthored === !0 && (n.textStyle.fontHidden === !0 || n.textStyle.fontColor == null))) for (let t = 0; t < n.lines.length; t++) e.fillText(n.lines[t], c, r + t * n.lineHeight);
				e.restore();
				continue;
			}
			e.font = `${n.textStyle.fontItalic ? "italic " : ""}${n.bold ? "bold " : ""}${n.fontPx}px ${n.font}`;
			let l = n.legendKey ? ni([n.legendKey.entry], n.fontPx, n.legendKey.ptToPx)[0] ?? 0 : 0, u = n.legendKey ? ri(n.legendKey.entry, n.fontPx, n.legendKey.ptToPx) : 0, d = n.rich?.width ?? n.lines.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), f = n.legendKey && (n.rich || n.lines.length > 0) ? 4 : 0, p = i - (l + f + d) / 2;
			if (n.legendKey && Kr(e, n.legendKey.entry.swatchStyle, n.legendKey.entry.color, p, a - u / 2, l, u, n.legendKey.entry.marker, n.legendKey.entry.fillPaint, n.legendKey.entry.outlinePaint, n.legendKey.entry.outlineColor, n.legendKey.entry.outlineWidthEmu, n.legendKey.entry.outlineDash, n.legendKey.entry.outlineCustomDash, n.legendKey.entry.outlineCap, n.legendKey.entry.outlineJoin, n.legendKey.ptToPx, n.legendKey.shapeRotationDeg, n.legendKey.entry.directEffect, n.legendKey.entry.fallbackEffect, n.legendKey.entry.directEffectIndex, n.legendKey.entry.fallbackEffectIndex), n.rich) {
				zn(e, n.rich, p + l + f, a, "left", "middle"), e.restore();
				continue;
			}
			e.fillStyle = n.fontColor, e.textAlign = "left", e.textBaseline = "middle";
			let m = (n.textStyle.fontBaseline ?? 0) * n.fontPx, h = a - (n.lines.length - 1) * n.lineHeight / 2 - m;
			if (!(n.textStyle.fontPaintAuthored === !0 && (n.textStyle.fontHidden === !0 || n.textStyle.fontColor == null))) for (let t = 0; t < n.lines.length; t++) e.fillText(n.lines[t], p + l + f, h + t * n.lineHeight);
			e.restore();
		}
		e.restore();
	}
}
function _a(e, t, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T) {
	let E = Xr(t, m), D = (e) => w.get(e), O = ot(r.fontSizeHpt, m) ?? Math.max(9, u * .09), k = r.labelBox, A = [], j = f;
	for (let f = 0; f < o.length; f++) {
		let w = o[f] / s * Math.PI * 2, T = j + w / 2;
		if (j += w, w <= 0 || !C.has(f)) continue;
		let M = D(f);
		if (K(r, M)) continue;
		let ee = M?.showCatName ?? r.showCatName, N = M?.showSerName ?? r.showSerName, te = M?.showVal ?? r.showVal, P = M?.showPercent ?? r.showPercent, ne = M?.showLegendKey ?? r.showLegendKey ?? !1, F = ot(M?.fontSizeHpt, m) ?? O, re = M?.fontBold ?? r.fontBold ?? !1, ie = M?.fontFace ?? r.fontFace ? Y(t, M?.fontFace ?? r.fontFace, "minor") : p, I = M?.fontColor ? `#${M.fontColor}` : r.fontColor ? `#${r.fontColor}` : "#000", ae = ln(M?.labelBox, k), oe = M?.position ?? r.position ?? "bestFit", L = Wt({
			customText: M?.text,
			showCategory: ee,
			showSeries: N,
			showValue: te,
			showPercent: P,
			category: (a[f] ?? "").toString(),
			seriesName: i.name,
			sourceValue: o[f],
			percentRatio: o[f] / s,
			formatCode: M?.formatCode ?? r.formatCode ?? i.valFormatCode ?? null,
			percentFormatCode: M?.formatCode ?? r.formatCode ?? "0%",
			date1904: t.date1904 ?? !1,
			separator: M?.separator ?? r.separator,
			defaultSeparator: "\n"
		}), R = ne ? E(0, f) : void 0;
		if (!L && !R) continue;
		let se = Te(M, r), ce = Ci(t, M, m, ie, re, se), le = se.textBodyAuthored === !0 || se.textLInsEmu != null || se.textTInsEmu != null || se.textRInsEmu != null || se.textBInsEmu != null, ue = $e(se, m), de = le ? ue.left : Math.max(4, F * .45), fe = le ? ue.right : Math.max(4, F * .45), z = le ? ue.top : Math.max(2, F * .28), B = le ? ue.bottom : Math.max(2, F * .28), pe = F * .22, V = F + pe;
		e.font = `${se.fontItalic ? "italic " : ""}${re ? "bold " : ""}${F}px ${ie}`;
		let me = ce ? Gn(e, ce, F, I) : null;
		if (ce && !me) continue;
		let he = me ? [] : n(L, Math.max(0, g - de - fe), Math.max(0, v - z - B), V, (t) => e.measureText(t).width, se);
		if (!me && he.length === 0 && !R) continue;
		let ge = me?.width ?? 0;
		if (!me) for (let t of he) ge = Math.max(ge, e.measureText(t).width);
		let _e = R ? ni([R.entry], F, m)[0] ?? 0 : 0, ve = R ? ri(R.entry, F, m) : 0, ye = R && L ? 4 : 0, be = _e + ye + ge + de + fe, xe = Math.max(ve, me?.height ?? (he.length > 0 ? he.length * V - pe : 0)) + z + B, Se = vt(be, xe, se.textRotation, se.textVerticalMode), Ce = Math.min(Se.w, g), we = Math.max(ve, me?.height ?? (he.length > 0 ? he.length * V - pe : 0));
		we = Math.min(Se.h, v);
		let H = c + Math.cos(T) * u, Ee = l + Math.sin(T) * u, De = Math.cos(T) < 0, Oe = Math.max(Ce, we) * .55 + u * .06, ke = H + Math.cos(T) * Oe, Ae = Ee + Math.sin(T) * Oe, je, Me = !1;
		if (M?.manualLayout) {
			let t = Mt({
				kind: "point",
				x: ke,
				y: Ae,
				position: "ctr"
			}, {
				x: h,
				y: _,
				w: g,
				h: v
			}, {
				w: Ce,
				h: we
			}, F, M.manualLayout, {
				x: y,
				y: b,
				w: x,
				h: S
			});
			if (!t || (Ce = t.rect.w, we = t.rect.h, be = Ce, xe = we, !me && (he = n(L, Math.max(0, Ce - de - fe - _e - ye), Math.max(0, we - z - B), V, (t) => e.measureText(t).width, se), he.length === 0 && !R))) continue;
			ke = t.rect.x + t.rect.w / 2, Ae = t.rect.y + t.rect.h / 2, De = ke < c, je = t.clip;
		} else if (oe !== "bestFit" && oe !== "outEnd") {
			let t = d > .01 ? (d + u) / 2 : u * la, r = c + Math.cos(T) * t, i = l + Math.sin(T) * t, a = 2 * t * Math.sin(Math.min(Math.PI, Math.abs(w)) / 2) - F, o = d > .01 ? u - d - F : u - F, s = ya({
				x: r - a / 2,
				y: i - o / 2,
				w: a,
				h: o
			}, {
				x: h,
				y: _,
				w: g,
				h: v
			});
			if (!s) continue;
			if (me) Ce = Math.min(Ce, s.w), we = Math.min(we, s.h);
			else {
				if (he = n(L, Math.max(0, s.w - de - fe - _e - ye), Math.max(0, s.h - z - B), V, (t) => e.measureText(t).width, se), he.length === 0 && !R) continue;
				ge = he.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), be = _e + ye + ge + de + fe, xe = Math.max(ve, he.length > 0 ? he.length * V - pe : 0) + z + B, Se = vt(be, xe, se.textRotation, se.textVerticalMode), Ce = Se.w, we = Se.h;
			}
			let f = Mt({
				kind: "point",
				x: r,
				y: i,
				position: oe === "inBase" || oe === "inEnd" ? "ctr" : oe
			}, s, {
				w: Ce,
				h: we
			}, F);
			if (!f) continue;
			ke = f.textAlign === "left" ? f.x + Ce / 2 : f.textAlign === "right" ? f.x - Ce / 2 : f.x, Ae = f.textBaseline === "top" ? f.y + we / 2 : f.textBaseline === "bottom" ? f.y - we / 2 : f.y, De = ke < c, je = f.clip, Me = !0;
		}
		A.push({
			lines: he,
			rich: me ?? void 0,
			legendKey: R,
			lineHeight: V,
			midAngle: T,
			rimX: H,
			rimY: Ee,
			boxW: Ce,
			boxH: we,
			unrotatedW: be,
			unrotatedH: xe,
			cxBox: ke,
			cyBox: Ae,
			leftSide: De,
			fontColor: I,
			box: ae,
			fontPx: F,
			bold: re,
			font: ie,
			textStyle: se,
			ptToPx: m,
			inside: Me,
			manualClip: je
		});
	}
	let M = _ + 2, ee = _ + v - 2, N = ee - M, te = (e) => {
		if (e.length === 0) return;
		e.sort((e, t) => e.cyBox - t.cyBox);
		let t = 0;
		for (let n of e) t += n.boxH;
		if (t += (e.length - 1) * 3, t > N) {
			let t = e.reduce((e, t) => e + t.boxH, 0), n = e.length;
			if (n === 1) {
				e[0].cyBox = Math.min(Math.max(e[0].cyBox, M + e[0].boxH / 2), ee - e[0].boxH / 2);
				return;
			}
			let r = (N - t) / (n - 1), i = M;
			for (let t of e) t.cyBox = i + t.boxH / 2, i += t.boxH + r;
			return;
		}
		for (let t = 1; t < e.length; t++) {
			let n = e[t - 1], r = e[t], i = (n.boxH + r.boxH) / 2 + 3;
			r.cyBox - n.cyBox < i && (r.cyBox = n.cyBox + i);
		}
		let n = e[e.length - 1].cyBox + e[e.length - 1].boxH / 2 - ee;
		if (n > 0) for (let t of e) t.cyBox -= n;
		let r = M - (e[0].cyBox - e[0].boxH / 2);
		if (r > 0) for (let t of e) t.cyBox += r;
	};
	te(A.filter((e) => !e.manualClip && !e.leftSide)), te(A.filter((e) => !e.manualClip && e.leftSide));
	for (let e of A) e.manualClip || (e.cyBox = Math.max(M + e.boxH / 2, e.cyBox), e.cyBox = Math.min(ee - e.boxH / 2, e.cyBox));
	let P = h + 2, ne = h + g - 2;
	for (let e of A) {
		if (e.manualClip) continue;
		let t = e.boxW / 2;
		e.cxBox - t < P && (e.cxBox = P + t), e.cxBox + t > ne && (e.cxBox = ne - t);
	}
	e.save(), e.beginPath(), e.rect(h, _, g, v), e.clip();
	let F = sn(t, r), re = F.color ? `#${F.color}` : "#a6a6a6", ie = F.widthEmu ? Math.max(.5, F.widthEmu / Rn * m) : 1;
	e.setLineDash(tn(F.dash ?? void 0, ie));
	for (let t of A) {
		let n = t.cxBox + (t.leftSide ? t.boxW / 2 : -t.boxW / 2), i = t.cyBox, a = n - t.rimX, o = i - t.rimY, s = Math.hypot(a, o);
		!t.inside && r.showLeaderLines && F.hidden !== !0 && (F.paintAuthored !== !0 || F.color != null) && s > t.fontPx * .9 && (e.beginPath(), e.moveTo(t.rimX, t.rimY), e.lineTo(n, i), e.strokeStyle = re, e.lineWidth = ie, e.stroke());
	}
	for (let t of A) {
		t.manualClip && (e.save(), e.beginPath(), e.rect(t.manualClip.x, t.manualClip.y, t.manualClip.w, t.manualClip.h), e.clip());
		let n = t.cxBox - t.boxW / 2, r = t.cyBox - t.boxH / 2;
		ft(e, t.box, {
			x: n,
			y: r,
			w: t.boxW,
			h: t.boxH
		}, m, T);
		let i = t.textStyle.textBodyAuthored === !0 || t.textStyle.textLInsEmu != null || t.textStyle.textTInsEmu != null || t.textStyle.textRInsEmu != null || t.textStyle.textBInsEmu != null, a = $e(t.textStyle, t.ptToPx), o = i ? a.left : Math.max(4, t.fontPx * .45), s = i ? a.right : Math.max(4, t.fontPx * .45), c = i ? a.top : Math.max(2, t.fontPx * .28), l = i ? a.bottom : Math.max(2, t.fontPx * .28), u = vt(t.unrotatedW, t.unrotatedH, t.textStyle.textRotation, t.textStyle.textVerticalMode), d = t.cxBox + (o - s) / 2, f = t.cyBox + (c - l) / 2, p = n + o, h = n + t.boxW - s, g = Math.max(0, h - p), _ = nt(t.textStyle, "center"), v = _ === "left" ? p : _ === "right" ? h : d, y = (e) => (t.textStyle.textVerticalAnchor ?? (t.textStyle.textBodyAuthored === !0 ? "t" : "ctr")) === "t" ? r + c + e / 2 : (t.textStyle.textVerticalAnchor ?? (t.textStyle.textBodyAuthored === !0 ? "t" : "ctr")) === "b" ? r + t.boxH - l - e / 2 : f, b = (e) => _ === "left" ? p : _ === "right" ? h - e : d - e / 2;
		if (e.save(), e.beginPath(), e.rect(n, r, t.boxW, t.boxH), e.clip(), u.radians !== 0 && (e.translate(t.cxBox, t.cyBox), e.rotate(u.radians), e.translate(-t.cxBox, -t.cyBox)), !t.legendKey) {
			let n = y(t.rich?.height ?? Math.max(0, t.lines.length * t.lineHeight - (t.lineHeight - t.fontPx)));
			if (t.rich) {
				zn(e, t.rich, v, n, _, "middle", g), e.restore(), t.manualClip && e.restore();
				continue;
			}
			e.font = `${t.textStyle.fontItalic ? "italic " : ""}${t.bold ? "bold " : ""}${t.fontPx}px ${t.font}`, e.fillStyle = t.fontColor, e.textAlign = _, e.textBaseline = "middle";
			let r = t.lineHeight - t.fontPx, i = (t.textStyle.fontBaseline ?? 0) * t.fontPx, a = n - (t.lines.length * t.lineHeight - r) / 2 + t.fontPx / 2 - i;
			if (!(t.textStyle.fontPaintAuthored === !0 && (t.textStyle.fontHidden === !0 || t.textStyle.fontColor == null))) for (let n = 0; n < t.lines.length; n++) e.fillText(t.lines[n], v, a + n * t.lineHeight);
			e.restore(), t.manualClip && e.restore();
			continue;
		}
		let x = t.legendKey ? ni([t.legendKey.entry], t.fontPx, t.legendKey.ptToPx)[0] ?? 0 : 0, S = t.legendKey ? ri(t.legendKey.entry, t.fontPx, t.legendKey.ptToPx) : 0, C = t.legendKey && (t.rich || t.lines.length > 0) ? 4 : 0, w = t.rich?.width ?? t.lines.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), E = x + C + w, D = y(Math.max(S, t.rich?.height ?? Math.max(0, t.lines.length * t.lineHeight - (t.lineHeight - t.fontPx)))), O = b(E);
		if (t.legendKey && Kr(e, t.legendKey.entry.swatchStyle, t.legendKey.entry.color, O, D - S / 2, x, S, t.legendKey.entry.marker, t.legendKey.entry.fillPaint, t.legendKey.entry.outlinePaint, t.legendKey.entry.outlineColor, t.legendKey.entry.outlineWidthEmu, t.legendKey.entry.outlineDash, t.legendKey.entry.outlineCustomDash, t.legendKey.entry.outlineCap, t.legendKey.entry.outlineJoin, t.legendKey.ptToPx, t.legendKey.shapeRotationDeg, t.legendKey.entry.directEffect, t.legendKey.entry.fallbackEffect, t.legendKey.entry.directEffectIndex, t.legendKey.entry.fallbackEffectIndex), t.rich) {
			zn(e, t.rich, O + x + C, D, "left", "middle", w), e.restore(), t.manualClip && e.restore();
			continue;
		}
		e.font = `${t.textStyle.fontItalic ? "italic " : ""}${t.bold ? "bold " : ""}${t.fontPx}px ${t.font}`, e.fillStyle = t.fontColor, e.textAlign = "left", e.textBaseline = "middle";
		let k = t.lineHeight - t.fontPx, A = (t.textStyle.fontBaseline ?? 0) * t.fontPx, j = D - (t.lines.length * t.lineHeight - k) / 2 + t.fontPx / 2 - A;
		if (!(t.textStyle.fontPaintAuthored === !0 && (t.textStyle.fontHidden === !0 || t.textStyle.fontColor == null))) for (let n = 0; n < t.lines.length; n++) e.fillText(t.lines[n], O + x + C, j + n * t.lineHeight);
		e.restore(), t.manualClip && e.restore();
	}
	e.restore();
}
function va(e, t, n, r, i, a, o, s, c) {
	let l = r?.chartexStyle, u = Ze(t, n), d = oe(t, "dataPoint", u >= 0 ? u : i), f = n.chartexStyle, p = Be(l, r?.idx ?? i) !== void 0 || r?.lineHidden === !0 || r?.lineColor != null, m = Be(f, i) !== void 0 || n.lineHidden === !0 || n.lineColor != null, h = Be(d, i) !== void 0;
	!p && !m && !h || (e.save(), Re(e, t, "dataPoint", n, r, i, a, Math.max(.5, o * .75), o, s, c, !1) && e.stroke(), e.restore());
}
function ya(e, t) {
	let n = Math.max(e.x, t.x), r = Math.max(e.y, t.y), i = Math.min(e.x + e.w, t.x + t.w), a = Math.min(e.y + e.h, t.y + t.h);
	return i > n && a > r ? {
		x: n,
		y: r,
		w: i - n,
		h: a - r
	} : null;
}
//#endregion
//#region packages/core/src/chart/families/radar.ts
function ba(e, t, n, r, i = 0) {
	let { x: s, y: c, w: l, h: u } = n, f = ge(t), p = f.length;
	if (p < 3) return;
	let m = ai(e, t, l, u, .22, r), h = jn(t, s, c, l, u, r, {
		titleTopPadFrac: .035,
		titleBottomPadFrac: .035,
		legendSideReserveFrac: .22,
		legendReserve: m,
		radialGapFrac: .02,
		honorPlotAreaManualLayout: !0
	}), g = h.title.fontPx;
	Wi(e, t, s, c, l, u, c + h.title.topPad, g);
	let { px0: v, py0: b, pw: x, ph: C } = h.plotRect;
	dn(e, t, v, b, x, C, r, i);
	let E = h.center.cx, D = h.center.cy, O = t.plotAreaManualLayout, A = O?.layoutTarget === "inner" && O.w != null && O.h != null && Number.isFinite(O.w) && Number.isFinite(O.h) && h.plotAreaManualLayoutApplied ? Math.min(x, C) / 2 : Math.min(x, C) * .38, j = Infinity, M = -Infinity;
	for (let e of t.series) for (let t of e.values) t != null && (j = Math.min(j, t), M = Math.max(M, t));
	isFinite(j) || (j = 0, M = 1), M === 0 && (M = 1);
	let ee = t.valAxisMinorTickMark != null && t.valAxisMinorTickMark !== "none", N = t.valAxisLogBase != null && Number.isFinite(t.valAxisLogBase) && t.valAxisLogBase >= 2, te = t.valAxisMajorUnit ?? (N ? null : qt(t.valMin ?? j, t.valMax ?? M, A / r)), P = kn({
		dataMin: j,
		dataMax: M,
		explicitMin: t.valMin,
		explicitMax: t.valMax,
		axisLenPt: A / r,
		axisOrientation: "vertical",
		majorUnit: te,
		minorUnit: t.valAxisMinorUnit,
		needMinor: t.valAxisMinorGridlines === !0 || ee,
		logBase: t.valAxisLogBase,
		reversed: tt(t)
	}), ne = (e) => gt(P.fraction(e), 0, 1), F = -Math.PI / 2, re = (e) => F + e / p * Math.PI * 2, ie = P.majorTicks.filter((e) => ne(e) > 0), I = (t) => {
		let n = ne(t) * A;
		e.beginPath();
		for (let t = 0; t < p; t++) {
			let r = re(t), i = E + Math.cos(r) * n, a = D + Math.sin(r) * n;
			t === 0 ? e.moveTo(i, a) : e.lineTo(i, a);
		}
		e.closePath(), e.stroke();
	};
	if (t.valAxisMinorGridlines) {
		let n = rt(t, r);
		e.strokeStyle = n.color, e.lineWidth = n.width;
		let i = n.dash.length > 0 && e.getLineDash ? e.getLineDash() : [];
		n.dash.length > 0 && e.setLineDash(n.dash);
		for (let e of P.minorTicks) I(e);
		n.dash.length > 0 && e.setLineDash(i);
	}
	if (!t.valAxisHidden && ze(t)) {
		let n = Xe(t, r);
		e.strokeStyle = n.color, e.lineWidth = n.width;
		let i = n.dash.length > 0 && e.getLineDash ? e.getLineDash() : [];
		n.dash.length > 0 && e.setLineDash(n.dash);
		for (let e of ie) I(e);
		n.dash.length > 0 && e.setLineDash(i);
	}
	e.strokeStyle = "#bbb", e.lineWidth = .5;
	for (let t = 0; t < p; t++) {
		let n = re(t);
		e.beginPath(), e.moveTo(E, D), e.lineTo(E + Math.cos(n) * A, D + Math.sin(n) * A), e.stroke();
	}
	if (!t.valAxisHidden) {
		e.font = un(he(t.valAxisFontSizeHpt, u, r), Y(t, t.valAxisFontFace, "minor"), t.valAxisFontBold ?? !1, t.valAxisFontItalic ?? !1), e.fillStyle = t.valAxisFontColor ? `#${t.valAxisFontColor}` : "#555", e.textAlign = "right", e.textBaseline = "middle";
		for (let n of ie) {
			let i = D - ne(n) * A, a = d(t.valAxisLineColor, t.valAxisLineWidthEmu, r);
			De(e, t.valAxisMajorTickMark, "val", E, i, a.color, a.width, !1, t.valAxisLineHidden, "major", r, t.valAxisLineDash), t.valAxisTickLabelPos !== "none" && e.fillText(k(t, n, !1), E - 3, i);
		}
		if (ee) {
			let n = d(t.valAxisLineColor, t.valAxisLineWidthEmu, r);
			for (let i of P.minorTicks) De(e, t.valAxisMinorTickMark, "val", E, D - ne(i) * A, n.color, n.width, !1, t.valAxisLineHidden, "minor", r, t.valAxisLineDash);
		}
	}
	e.font = un(t.catAxisFontSizeHpt == null ? Math.max(8, Math.min(11, A * .2)) : he(t.catAxisFontSizeHpt, u, r), Y(t, t.catAxisFontFace, "minor"), t.catAxisFontBold ?? !1, t.catAxisFontItalic ?? !1), e.fillStyle = t.catAxisFontColor ? `#${t.catAxisFontColor}` : "#444", e.textBaseline = "middle";
	let ae = E - x / 2, L = E + x / 2;
	if (!t.catAxisHidden && T(t)) for (let n = 0; n < p; n++) {
		let r = re(n), i = Ie(12, t.catAxisLabelOffsetPercent), a = E + Math.cos(r) * (A + i), o = D + Math.sin(r) * (A + i), s = t.catAxisLabelAlignment, c = s === "l" ? "left" : s === "r" ? "right" : s === "ctr" ? "center" : Math.cos(r) < -.1 ? "right" : Math.cos(r) > .1 ? "left" : "center";
		e.textAlign = c;
		let l = c === "right" ? a - ae : c === "left" ? L - a : 2 * Math.min(L - a, a - ae), u = vn((f[n] ?? "").toString(), t.catAxisFormatCode, t.date1904);
		e.fillText(Pe(e, u, l), a, o);
	}
	let R = Se("radar", t.chartType, t.scatterStyle, t.radarStyle), se = Math.max(2, A * .025);
	for (let n = 0; n < t.series.length; n++) {
		let s = t.series[n], c = w(n, s), l = y(s, n), u = [];
		for (let e = 0; e < p; e++) {
			let t = s.values[e];
			if (t == null) {
				u.push(null);
				continue;
			}
			let n = ne(t), r = re(e);
			u.push([E + Math.cos(r) * A * n, D + Math.sin(r) * A * n]);
		}
		let d = u.every((e) => e != null), f = [], m = [];
		for (let e = 0; e < u.length; e++) {
			let t = u[e];
			t == null ? (m.length > 0 && f.push(m), m = []) : m.push({
				x: t[0],
				y: t[1],
				index: e
			});
		}
		m.length > 0 && f.push(m);
		let h = {
			x: v,
			y: b,
			w: x,
			h: C
		}, g = (e) => {
			let n = e.getLineDash ? e.getLineDash() : [], o = e.lineCap, f = e.lineJoin;
			e.beginPath();
			let p = !1;
			for (let t of u) {
				if (t == null) {
					p = !1;
					continue;
				}
				p ? e.lineTo(t[0], t[1]) : (e.moveTo(t[0], t[1]), p = !0);
			}
			d && e.closePath(), R && d && pr(e, a(t, s, void 0, l), h, Je(c, .25), r, i), Re(e, t, "dataPointLine", s, void 0, l, c, 2, r, h, i) && e.stroke(), e.setLineDash(n), e.lineCap = o, e.lineJoin = f;
		};
		if (it(t, n)) {
			if (R && d) {
				let o = ye(s.dataPointOverrides).get(0);
				_(e, S(o?.chartexStyle, s.chartexStyle), oe(t, "dataPoint", n), 0, h, r, (e) => {
					let n = a(t, s, o, 0, 0);
					if (n !== null) {
						e.beginPath();
						for (let t = 0; t < u.length; t++) {
							let n = u[t];
							t === 0 ? e.moveTo(n[0], n[1]) : e.lineTo(n[0], n[1]);
						}
						e.closePath(), pr(e, n, h, Je(c, .25), r, i);
					}
				}, 0);
			}
			Ut(e, t, s, f, !1, d, c, 2, r, h, i);
		} else _(e, S(s.chartexStyle), t.chartStyleRoles?.[R ? "dataPoint" : "dataPointLine"], l, h, r, g);
		let T = !R && s.showMarker !== !1 && s.markerSymbol !== "none";
		if (!R && (T || Ht(s))) {
			let n = ye(s.dataPointOverrides);
			for (let a = 0; a < u.length; a++) {
				let l = u[a];
				if (l == null) continue;
				let d = n.get(a), f = ve(s, d, "circle", T);
				if (f === "none") continue;
				let p = d?.markerSize ?? s.markerSize ?? Math.max(4, se * 2 / r), m = o(s, d, a, c), h = d?.markerLine ?? s.markerLine ?? null, g = d?.markerLineWidthEmu ?? s.markerLineWidthEmu;
				jr(e, t, s, d, a, l[0], l[1], f, p, m, h, r, g == null ? 1 : Ae(g, r), Lt(s, d, a), i);
			}
		}
	}
	ci(e, t, m, s, c, l, u, v, b, x, C, h.title.bandH + 2, r);
}
//#endregion
//#region packages/core/src/chart/families/scatter.ts
function xa(e, t, n, r, a = 0) {
	let { x: o, y: s, w: l, h: u } = n, f = t.series.map((e, t) => ({
		series: e,
		index: t
	})), p = On(t), m = ({ series: e, index: n }) => p[n]?.categoryAxis === "secondary" || t.plotGroups == null && e.useSecondaryAxis === !0, g = ({ series: e, index: n }) => p[n]?.valueAxis === "secondary" || t.plotGroups == null && e.useSecondaryAxis === !0, _ = f.filter((e) => !m(e)), v = f.filter(m), y = f.filter((e) => !g(e)), b = f.filter(g), x = f.filter((e) => !m(e) && !g(e)), S = f.filter((e) => m(e) && g(e)), C = v.length > 0 ? t.secondaryCatAxis : null, w = b.length > 0 ? t.secondaryValAxis : null, T = ((e) => {
		let n = [];
		for (let { series: r } of e) {
			let e = r.categories ?? t.categories;
			for (let t of e) {
				let e = parseFloat(t);
				Number.isFinite(e) && n.push(e);
			}
		}
		return n;
	})(f).length === 0, E = f.length === 1 && f[0].series.bubbleXSourceIsString === !0 ? f[0].series.values.length + 1 : null, D = (e) => {
		let n = [], r = [];
		for (let { series: i } of e) {
			let e = i.categories ?? t.categories;
			for (let t = 0; t < i.values.length; t++) {
				let a = i.values[t];
				if (a == null) continue;
				let o = gi(e, t, T);
				o != null && (n.push(o), r.push(a));
			}
			h(i, "x", (t) => i.values[t] == null ? null : gi(e, t, T), (e) => n.push(e)), h(i, "y", (t) => gi(e, t, T) == null ? null : i.values[t] ?? null, (e) => r.push(e));
		}
		if (T && n.length === 0) {
			let t = 0;
			for (let { series: n } of e) t = Math.max(t, n.values.length);
			for (let e = 0; e < t; e++) n.push(e);
		}
		return {
			x: Dt(n),
			y: Dt(r)
		};
	}, O = {
		x: D(_.length > 0 ? _ : v).x,
		y: D(y.length > 0 ? y : b).y
	}, A = {
		x: D(v).x,
		y: D(b).y
	}, j = Hi(e, t, l, u, r), M = j.fontPx, ee = j.topPad, N = he(t.catAxisFontSizeHpt, u, r), P = he(t.valAxisFontSizeHpt, u, r), ne = ai(e, t, l, u, .22, r), { legRightW: F, legLeftW: ie, legTopH: I, legBottomH: ae } = Kt(ne, t.legendOverlay === !0), oe = $t(t, l, u, r), L = oe.catFontPx, R = oe.valFontPx, se = oe.catBandH, ce = oe.valBandW;
	Wi(e, t, o, s, l, u, s + ee, M);
	let le = w ? kn({
		dataMin: A.y.min,
		dataMax: A.y.max,
		explicitMin: w.min,
		explicitMax: w.max,
		axisLenPt: Math.max(1, u * .7 / r),
		axisOrientation: "vertical",
		majorUnit: w.majorUnit,
		minorUnit: w.minorUnit,
		needMinor: w.minorGridlines === !0 || w.minorTickMark != null && w.minorTickMark !== "none",
		logBase: w.logBase,
		reversed: w.orientation === "maxMin"
	}) : null, ue = 0;
	if (w && le && !w.hidden && w.tickLabelPos !== "none") {
		let n = e.font;
		e.font = un(ot(w.fontSizeHpt, r) ?? P, Y(t, w.fontFace, "minor"), w.fontBold ?? !1, w.fontItalic ?? !1);
		for (let n of le.majorTicks) ue = Math.max(ue, e.measureText(Ke(n, w.formatCode, t.date1904, w.displayUnits)).width);
		ue += Me(P) + 4, e.font = n;
	}
	let de = C && !C.hidden && C.tickLabelPos !== "none" ? (ot(C.fontSizeHpt, r) ?? N) + St(N) + 2 : 0, { plotRect: { px0: z, py0: B, pw: pe, ph: V } } = jn(t, o, s, l, u, r, {
		titleBand: j,
		legendSideReserveFrac: .22,
		legendReserve: ne,
		pad: {
			t: j.bandH + I + P / 2 + 2 + de,
			r: F + l * .05 + ue,
			b: (t.catAxisHidden ? u * .04 : mt(N)) + se + ae,
			l: (t.valAxisHidden ? l * .04 : l * .12) + ce + ie
		},
		honorPlotAreaManualLayout: !0
	});
	if (pe <= 0 || V <= 0) return;
	dn(e, t, z, B, pe, V, r, a);
	let { min: me, max: ge } = O.x, { min: _e, max: ve } = O.y;
	t.valMin != null && (_e = t.valMin), t.valMax != null && (ve = t.valMax);
	let ye = t.valAxisMinorGridlines === !0 || t.valAxisMinorTickMark != null && t.valAxisMinorTickMark !== "none", be = kn({
		dataMin: _e,
		dataMax: ve,
		explicitMin: t.valMin,
		explicitMax: t.valMax,
		axisLenPt: V / r,
		axisOrientation: "vertical",
		majorUnit: t.valAxisMajorUnit,
		minorUnit: t.valAxisMinorUnit,
		needMinor: ye,
		logBase: t.valAxisLogBase,
		reversed: tt(t)
	});
	_e = be.min, ve = be.max;
	let xe = t.catAxisMinorGridlines === !0 || t.catAxisMinorTickMark != null && t.catAxisMinorTickMark !== "none", Se = kn({
		dataMin: me,
		dataMax: ge,
		explicitMin: t.catAxisMin ?? (E == null ? null : 0),
		explicitMax: t.catAxisMax ?? E,
		axisLenPt: pe / r,
		axisOrientation: "horizontal",
		majorUnit: t.catAxisMajorUnit,
		minorUnit: t.catAxisMinorUnit,
		needMinor: xe,
		logBase: t.catAxisLogBase,
		reversed: Ft(t)
	});
	me = Se.min, ge = Se.max;
	let Ce = C ? kn({
		dataMin: A.x.min,
		dataMax: A.x.max,
		explicitMin: C.min,
		explicitMax: C.max,
		axisLenPt: pe / r,
		axisOrientation: "horizontal",
		majorUnit: C.majorUnit,
		minorUnit: C.minorUnit,
		needMinor: C.minorGridlines === !0 || C.minorTickMark != null && C.minorTickMark !== "none",
		logBase: C.logBase,
		reversed: C.orientation === "maxMin"
	}) : null, we = w ? kn({
		dataMin: A.y.min,
		dataMax: A.y.max,
		explicitMin: w.min,
		explicitMax: w.max,
		axisLenPt: V / r,
		axisOrientation: "vertical",
		majorUnit: w.majorUnit,
		minorUnit: w.minorUnit,
		needMinor: w.minorGridlines === !0 || w.minorTickMark != null && w.minorTickMark !== "none",
		logBase: w.logBase,
		reversed: w.orientation === "maxMin"
	}) : null, H = (e) => z + Se.fraction(e) * pe, Te = (e) => B + V - be.fraction(e) * V, Ee = (e) => z + (Ce?.fraction(e) ?? 0) * pe, Oe = (e) => B + V - (we?.fraction(e) ?? 0) * V, ke = Se.majorUnit, je = be.majorTicks, Ne = be.minorTicks, Pe = Se.majorTicks, Ie = Se.minorTicks, Le = B + V;
	if (t.catAxisCrossesAt != null) Le = gt(Te(t.catAxisCrossesAt), B, B + V);
	else {
		let e = t.catAxisCrosses ?? "autoZero";
		e === "autoZero" && _e < 0 && ve > 0 ? Le = gt(Te(0), B, B + V) : e === "max" && (Le = B);
	}
	let Re = z;
	if (t.valAxisCrossesAt != null) Re = gt(H(t.valAxisCrossesAt), z, z + pe);
	else {
		let e = t.valAxisCrosses ?? "autoZero";
		e === "autoZero" && me < 0 && ge > 0 ? Re = gt(H(0), z, z + pe) : e === "max" && (Re = z + pe);
	}
	let Be = Xe(t, r);
	if (!t.valAxisHidden) {
		let n = t.valAxisFontSizeHpt == null ? Math.max(8, Math.min(11, V / 20)) : he(t.valAxisFontSizeHpt, u, r), a = t.valAxisFontSizeHpt == null ? 4 : Me(n);
		e.font = un(n, Y(t, t.valAxisFontFace, "minor"), t.valAxisFontBold ?? !1, t.valAxisFontItalic ?? !1);
		let o = t.valAxisLineColor ? `#${t.valAxisLineColor}` : void 0, s = Ae(t.valAxisLineWidthEmu, r), c = t.valAxisLineHidden ? 0 : i(t.valAxisMajorTickMark, "major", s, r);
		if (t.valAxisMinorGridlines) {
			let n = rt(t, r);
			for (let t of Ne) re(e, z, pe, Te(t), !1, n);
		}
		for (let n of je) {
			let i = Te(n);
			if (e.strokeStyle = Be.color, e.lineWidth = Be.width, ze(t)) {
				let t = Be.dash.length > 0 && e.getLineDash ? e.getLineDash() : [];
				Be.dash.length > 0 && e.setLineDash(Be.dash), e.beginPath(), e.moveTo(z, i), e.lineTo(z + pe, i), e.stroke(), Be.dash.length > 0 && e.setLineDash(t);
			}
			if (t.valAxisTickLabelPos !== "none") {
				e.fillStyle = t.valAxisFontColor ? `#${t.valAxisFontColor}` : "#555";
				let r = t.valAxisTickLabelPos ?? "nextTo", o;
				r === "high" ? (e.textAlign = "left", o = z + pe + a) : r === "low" ? (e.textAlign = "right", o = z - a) : (e.textAlign = "right", o = Re - c - a), e.textBaseline = "middle", e.fillText(k(t, n, !1), o, i);
			}
			De(e, t.valAxisMajorTickMark, "val", Re, i, o, s, !1, t.valAxisLineHidden, "major", r, t.valAxisLineDash);
		}
		if (t.valAxisMinorTickMark && t.valAxisMinorTickMark !== "none") for (let n of Ne) De(e, t.valAxisMinorTickMark, "val", Re, Te(n), o, s, !1, t.valAxisLineHidden, "minor", r, t.valAxisLineDash);
	}
	if (!t.catAxisHidden && c(t) && ke > 0) {
		let n = fe(t, r);
		e.strokeStyle = n.color, e.lineWidth = n.width;
		let i = n.dash.length > 0 && e.getLineDash ? e.getLineDash() : [];
		n.dash.length > 0 && e.setLineDash(n.dash);
		for (let t of Pe) {
			let n = H(t);
			e.beginPath(), e.moveTo(n, B), e.lineTo(n, B + V), e.stroke();
		}
		n.dash.length > 0 && e.setLineDash(i);
	}
	if (!t.catAxisHidden && t.catAxisMinorGridlines && ke > 0) {
		let n = te(t, r), i = n.dash.length > 0 && e.getLineDash ? e.getLineDash() : [];
		e.strokeStyle = n.color, e.lineWidth = n.width, n.dash.length > 0 && e.setLineDash(n.dash);
		for (let t of Ie) {
			let n = H(t);
			e.beginPath(), e.moveTo(n, B), e.lineTo(n, B + V), e.stroke();
		}
		n.dash.length > 0 && e.setLineDash(i);
	}
	if (!t.catAxisHidden && !t.catAxisLineHidden && (e.save(), e.lineCap = "butt", nn(e, z, Le, z + pe, Le, t.catAxisLineColor ? `#${t.catAxisLineColor}` : "#888", Ae(t.catAxisLineWidthEmu, r), t.catAxisLineDash), e.restore()), !t.valAxisHidden && !t.valAxisLineHidden && (e.save(), nn(e, Re, B, Re, B + V, t.valAxisLineColor ? `#${t.valAxisLineColor}` : "#888", Ae(t.valAxisLineWidthEmu, r), t.valAxisLineDash), e.restore()), !t.catAxisHidden) {
		let n = t.catAxisFontSizeHpt == null ? Math.max(8, Math.min(11, V / 20)) : he(t.catAxisFontSizeHpt, u, r), a = t.catAxisFontSizeHpt == null ? 4 : St(n);
		e.font = un(n, Y(t, t.catAxisFontFace, "minor"), t.catAxisFontBold ?? !1, t.catAxisFontItalic ?? !1), e.fillStyle = t.catAxisFontColor ? `#${t.catAxisFontColor}` : "#555", e.textAlign = "center";
		let o = t.catAxisTickLabelPos ?? "nextTo", s = Ae(t.catAxisLineWidthEmu, r), c = t.catAxisLineColor ? `#${t.catAxisLineColor}` : void 0, l = t.catAxisLineHidden ? 0 : i(t.catAxisMajorTickMark, "major", s, r), d = o === "low" ? B + V + a : o === "high" ? B - a : Le + l + a;
		e.textBaseline = o === "high" ? "bottom" : "top";
		for (let n of Pe) {
			let i = H(n);
			o !== "none" && e.fillText(Ke(n, t.catAxisFormatCode, t.date1904, t.catAxisDisplayUnits), i, d), De(e, t.catAxisMajorTickMark, "cat", Le, i, c, s, !1, t.catAxisLineHidden, "major", r, t.catAxisLineDash);
		}
		if (t.catAxisMinorTickMark && t.catAxisMinorTickMark !== "none") for (let n of Ie) De(e, t.catAxisMinorTickMark, "cat", Le, H(n), c, s, !1, t.catAxisLineHidden, "minor", r, t.catAxisLineDash);
	}
	let Ve = (i, c, d, f, p, m, h, g) => {
		i.length !== 0 && Ni(e, t, i, T, f, p, n, z, B, pe, V, r, c, d, {
			x: o,
			y: s,
			w: l,
			h: u
		}, m, h, a, g);
	};
	if (t.plotGroups == null) {
		let e = t.chartType === "bubble", n = e ? "marker" : t.scatterStyle ?? "marker";
		Ve(x, e, n, H, Te, be.max, t.valAxisDisplayUnits), S.length > 0 && Ce && we && Ve(S, e, n, Ee, Oe, we.max, w?.displayUnits);
	} else for (let e of t.plotGroups) {
		if (e.kind !== "scatter" && e.kind !== "bubble") continue;
		let n = t.series.slice(e.seriesStart, e.seriesStart + e.seriesCount).map((t, n) => ({
			series: t,
			index: e.seriesStart + n
		}));
		if (n.length === 0) continue;
		let r = e.kind === "bubble", i = e.categoryAxis === "secondary", a = e.valueAxis === "secondary";
		Ve(n, r, r ? "marker" : e.scatterStyle ?? t.scatterStyle ?? "marker", i ? Ee : H, a ? Oe : Te, a && we ? we.max : be.max, a ? w?.displayUnits : t.valAxisDisplayUnits, r ? {
			bubbleScale: e.bubbleScale ?? t.bubbleScale,
			bubbleSizeRepresents: e.bubbleSizeRepresents ?? t.bubbleSizeRepresents,
			showNegativeBubbles: e.showNegativeBubbles ?? t.showNegativeBubbles
		} : void 0);
	}
	if (C && Ce && !C.hidden) {
		let n = d(C.lineColor, C.lineWidthEmu, r);
		C.lineHidden || nn(e, z, B, z + pe, B, n.color, n.width, C.lineDash);
		let a = ot(C.fontSizeHpt, r) ?? N;
		e.font = un(a, Y(t, C.fontFace, "minor"), C.fontBold ?? !1, C.fontItalic ?? !1), e.fillStyle = C.fontColor ? `#${C.fontColor}` : "#555", e.textAlign = "center", e.textBaseline = "bottom";
		let o = C.lineHidden ? 0 : i(C.majorTickMark, "major", n.width, r);
		for (let i of Ce.majorTicks) {
			let s = Ee(i);
			C.tickLabelPos !== "none" && e.fillText(Ke(i, C.formatCode, t.date1904, C.displayUnits), s, B - o - St(a)), De(e, C.majorTickMark, "cat", B, s, n.color, n.width, !0, C.lineHidden, "major", r, C.lineDash);
		}
		if (C.minorTickMark && C.minorTickMark !== "none") for (let t of Ce.minorTicks) De(e, C.minorTickMark, "cat", B, Ee(t), n.color, n.width, !0, C.lineHidden, "minor", r, C.lineDash);
	}
	w && we && Fe(e, t, w, {
		min: we.min,
		max: we.max,
		step: we.majorUnit,
		majorLines: we.majorTicks,
		minorTicks: we.minorTicks,
		makeToY: () => Oe
	}, Oe, n, z, B, pe, V, r, ot(w.fontSizeHpt, r) ?? P, ue, t.valAxisFontColor ? `#${t.valAxisFontColor}` : "#555", t.date1904), ci(e, t, ne, o, s, l, u, z, B, pe, V, j.bandH + 2, r), Nn(e, t, o, s, l, u, z, B, pe, V, ie, ae, L, R);
}
//#endregion
//#region packages/core/src/chart/renderer.ts
var Sa = (e, t, n, r, i) => Xi(e, t, n, r, {}, i), Ca = (e, t, n, r, i) => da(e, t, n, !1, r, i), wa = (e, t, n, r, i) => da(e, t, n, !0, r, i), Ta = {
	"bar-combo": Sa,
	"line-groups": ta,
	"area-groups": ca,
	"scatter-bubble": xa,
	"stock-line": na
}, Ea = {
	clusteredBar: Sa,
	clusteredBarH: Sa,
	stackedBar: Sa,
	stackedBarH: Sa,
	stackedBarPct: Sa,
	stackedBarHPct: Sa,
	line: ta,
	stackedLine: ta,
	stackedLinePct: ta,
	area: ca,
	stackedArea: ca,
	stackedAreaPct: ca,
	pie: Ca,
	ofPie: ua,
	doughnut: wa,
	radar: ba,
	scatter: xa,
	bubble: xa,
	stock: na,
	surface: sa,
	surface3D: sa
};
function Da(e, t, n, r = Ln, i = 0, a, o, s, c, l = yt(t)) {
	e.save();
	try {
		if (Li(e, n, l)) return;
		t = xt(t, r);
		let { x: u, y: d, w: f, h: p } = n, m = t.roundedCorners === !0, h = m ? 10 * r : 0, g = (e) => {
			m ? (zi(e, u, d, f, p, h), e.fill()) : e.fillRect(u, d, f, p);
		};
		_(e, t.chartAreaStyle, t.chartStyleRoles?.chartArea, 0, n, r, (e) => {
			if (t.chartFillHidden !== !0) if (t.chartFill?.fillType === "image") m ? (e.save(), zi(e, u, d, f, p, h), e.clip(), gn(e, t.chartFill, u, d, f, p, r, i), e.restore()) : gn(e, t.chartFill, u, d, f, p, r, i);
			else if (t.chartFill) {
				let n = L(t.chartFill, e, u, d, f, p, i);
				n && (e.fillStyle = n), n && g(e);
			} else t.chartBg && (e.fillStyle = `#${t.chartBg}`, g(e));
			if (t.chartBorderHidden !== !0 && (t.chartBorderLineFill || t.chartBorderColor)) {
				e.save();
				let n = t.chartBorderLineFill ? L(t.chartBorderLineFill, e, u, d, f, p, i) : t.chartBorderColor ? `#${t.chartBorderColor}` : null;
				if (!n) e.restore();
				else {
					e.strokeStyle = n;
					let i = t.chartBorderWidthEmu ? Math.max(.5, t.chartBorderWidthEmu / Rn) * r : 1;
					e.setLineDash(wt(t.chartBorderCustomDash, t.chartBorderDash, i)), e.lineCap = t.chartBorderCap === "rnd" ? "round" : t.chartBorderCap === "sq" ? "square" : "butt", e.lineJoin = t.chartBorderJoin === "round" || t.chartBorderJoin === "bevel" ? t.chartBorderJoin : "miter", de(e, u, d, f, p, i, t.chartBorderCompound, m ? h : 0), e.restore();
				}
			}
		});
		let v = t.chartexBox != null || t.chartexSunburst != null || t.chartexTreemap != null || t.chartexRegionMap != null;
		if (t.series.length === 0 && !v) {
			t.authoredWithoutSeries !== !0 && (e.fillStyle = "#888", e.font = "12px sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.fillText("(no data)", u + f / 2, d + p / 2)), Ri(e, t, n, r);
			return;
		}
		let y = Ee(t), b = (y != null || t.chartexBox != null) && (y ?? 0) <= 1e4 ? Fi(t, s, r, n) : null, x = Ii(t, a), S = y != null && y <= 1e4 ? Qn(t, s, r, n, x != null) : null, C = Ai(t, a, s, r, n);
		if ((y != null || b != null || S != null || x != null || C != null) && Li(e, n, Math.max(y ?? 0, b != null && b + (S ?? 0) > er ? 10001 : 0, S != null && S > er ? 10001 : 0, x ?? 0, C != null && C > nr ? 10001 : 0))) {
			Ri(e, t, n, r);
			return;
		}
		let w = dt(t);
		if (w === "unsupported") {
			e.fillStyle = "#888", e.font = "11px sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.fillText("Unsupported chart", u + f / 2, d + p / 2), Ri(e, t, n, r);
			return;
		}
		if (w !== "legacy") {
			Ta[w]?.(e, t, n, r, i), He(e, t, n, r), Ri(e, t, n, r);
			return;
		}
		if (a?.render(e, t, n, r, i)) {
			He(e, t, n, r), Ri(e, t, n, r);
			return;
		}
		if (o?.render(e, t, n, r, i)) {
			Ri(e, t, n, r);
			return;
		}
		if (c?.render(e, t, n, r, i)) {
			He(e, t, n, r), Ri(e, t, n, r);
			return;
		}
		let T = Object.hasOwn(Ea, t.chartType) ? Ea[t.chartType] : void 0;
		T ? T(e, t, n, r, i) : (e.fillStyle = "#888", e.font = "11px sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.fillText("Unsupported chart", u + f / 2, d + p / 2)), He(e, t, n, r), Ri(e, t, n, r);
	} finally {
		e.restore();
	}
}
function Oa(e, t, n, r = Ln, i = 0, a, o, s, c) {
	Qe(e, r, () => fn(() => {
		A(() => {
			pt(s, () => {
				let l = yt(t), u = l <= 1e4 ? Jt(Ce(t)) : t;
				Vt(e, () => {
					Da(e, u, n, r, i, a, o, s, c, l);
				}, void 0, l <= 1e4 ? q(u) : 1);
			});
		});
	}));
}
//#endregion
export { pr as C, _r as D, br as E, xr as O, ir as S, Er as T, fr as _, Wi as a, ur as b, Ti as c, ai as d, Nr as f, dr as g, sr as h, Xi as i, hr as k, wi as l, Sr as m, ta as n, Hi as o, gr as p, Yi as r, Li as s, Oa as t, ci as u, wr as v, mr as w, yr as x, vr as y };
