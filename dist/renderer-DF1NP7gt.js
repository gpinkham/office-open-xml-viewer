import { $ as e, $n as t, $t as n, A as r, An as i, B as a, Bt as o, Cn as s, D as c, Dn as l, G as u, Gn as d, Gt as f, H as p, Hn as m, Ht as h, I as g, In as _, It as v, J as y, Jn as b, Jt as x, Kn as S, Kt as C, L as w, Ln as T, Lt as E, M as D, Mn as O, Nn as k, O as A, On as j, Pn as M, Qn as N, Qt as P, R as F, Rn as ee, Rt as te, Sn as I, T as ne, Tn as L, U as re, Un as R, Ut as z, V as ie, Vn as ae, Vt as B, W as oe, Wn as se, Wt as ce, Xn as V, Xt as H, Yn as U, Yt as le, Zn as ue, Zt as de, _ as fe, _n as pe, an as W, ar as me, cn as he, cr as ge, d as _e, dn as ve, dr as ye, en as be, er as xe, et as Se, f as Ce, fn as we, fr as Te, ft as Ee, g as De, gn as Oe, gt as G, h as ke, hn as K, hr as Ae, ht as je, i as Me, in as Ne, ir as Pe, j as Fe, jn as Ie, k as Le, kn as Re, ln as ze, lr as Be, m as q, mn as Ve, mr as He, nn as Ue, nr as We, nt as Ge, on as Ke, or as qe, p as Je, pn as Ye, pr as J, q as Xe, qn as Y, qt as Ze, r as Qe, rn as $e, rr as et, sn as tt, sr as nt, t as rt, tn as it, tr as at, tt as ot, u as st, un as ct, ur as lt, v as ut, vn as dt, vt as ft, wn as pt, xn as mt, y as ht, yn as gt, yt as _t, z as vt, zn as yt, zt as bt } from "./plot-area-frame-DJnay5Wh.js";
import { a as xt, r as St } from "./units-EJdC96r6.js";
import { T as Ct, _ as wt, a as Tt, b as Et, d as Dt, f as Ot, g as kt, h as At, i as jt, l as Mt, m as Nt, n as Pt, o as Ft, p as It, u as Lt, v as Rt, w as zt, x as Bt, y as Vt } from "./three-d-DYlBMsPE.js";
//#region packages/core/src/chart/classic-paint-work.ts
var Ht = 7;
function Ut(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.dataPointOverrides ?? []) t.has(n.idx) || t.set(n.idx, n);
	return t;
}
function Wt(e, t) {
	return e.chartexFormatIdx ?? t;
}
function Gt(e) {
	return e != null && Number.isFinite(e) && e !== 0;
}
function Kt(e) {
	return e === "line" || e === "stackedLine" || e === "stackedLinePct" || e === "scatter" || e === "radar" || e === "stock";
}
function qt(e, t, n = 4 / 3, r, i = !1) {
	if (i || e.series.length === 0) return null;
	let a = te(e), o = W(e), s = he(e, !0), l = e.series.some((t, n) => bt(e.chartType, a[n]) === "scatter" && (t.categories ?? e.categories).some((e) => Number.isFinite(Number.parseFloat(e)))), u = e.dataTable?.showKeys === !0 && B(e.chartType) && (e.categories.length > 0 || e.series.some((e) => (e.categories?.length ?? e.values.length) > 0)), d = 0, f = (e, i = r?.w ?? 1, a = r?.h ?? 1) => {
		if (e == null) return !0;
		let o = e.fillType === "image" ? Qe(e, t, i, a, n) : le(e);
		return e.fillType === "gradient" && o > 4096 || o > 1048576 - d ? !1 : (d += o, !0);
	}, p = (t, n, i, a, o = "dataPoint", s = o === "dataPoint", c = r?.w ?? 1, l = r?.h ?? 1) => (!s || f(S(e, t, n, i, a), c, l)) && f(Y(e, o, t, n, i).paint, c, l), m = (t, r, i, a, o) => {
		let s = M(e.dataTable?.fontSizeHpt, n) ?? 9 * n, c = M(t.seriesDataLabels?.fontSizeHpt ?? e.dataLabelFontSizeHpt, n) ?? 10 * n;
		for (let e of t.dataLabelOverrides ?? []) c = Math.max(c, M(e.fontSizeHpt, n) ?? c);
		let l = a === "table" ? s : a === "label" ? c : M(e.legendFontSizeHpt, n) ?? 10 * n;
		if (a === "table") return {
			width: Math.max(12 * n, l * 1.7),
			height: l
		};
		if (o !== "dataPointLine") {
			let e = Ht * n;
			return {
				width: e,
				height: e
			};
		}
		let u = Y(e, o, t, r, i), d = De(u.widthEmu, n), f = _t(u.dash ?? "solid", d), p = f.length > 0 ? f.reduce((e, t) => e + t, 0) + f[0] : 0;
		return {
			width: Math.max(l * 1.6, p),
			height: l
		};
	};
	for (let t = 0; t < e.series.length; t++) {
		let n = e.series[t], i = a[t], d = bt(n.seriesType ?? e.chartType, i);
		i?.kind === "bar3D" || i?.kind === "area3D" || i?.kind === "line3D" ? d = e.chartType : i?.kind === "pie3D" && (d = "pie");
		let f = Ut(n), h = lt(e, t), g = Wt(n, t), _ = (e) => h ? e : g, y = i?.kind === "bar" || i?.kind === "bar3D" || i == null && (d === "clusteredBar" || d === "clusteredBarH" || d === "stackedBar" || d === "stackedBarH" || d === "stackedBarPct" || d === "stackedBarHPct"), b = i?.kind === "pie" || i?.kind === "pie3D" || i?.kind === "doughnut" || i?.kind === "ofPie" || i == null && (d === "pie" || d === "doughnut" || d === "ofPie"), x = i?.kind === "area" || i?.kind === "area3D" || i == null && (d === "area" || d === "stackedArea" || d === "stackedAreaPct"), S = d === "radar" && (i?.radarStyle ?? e.radarStyle) === "filled";
		if (y || b) {
			let t = Math.max(1, n.values.length, e.categories.length), a = i?.barDirection === "bar" || d.endsWith("BarH") || d.endsWith("BarHPct"), o = y && !a ? (r?.w ?? 1) / t : r?.w ?? 1, s = y && a ? (r?.h ?? 1) / t : r?.h ?? 1;
			for (let e = 0; e < n.values.length; e++) if (Gt(n.values[e]) && !p(n, f.get(e), _(e), e, "dataPoint", !0, o, s)) return c + 1;
			if (d === "ofPie") {
				let t = v(e.ofPie, n.values), i = t == null ? void 0 : [...t].find((e) => Gt(n.values[e]));
				if (i != null && !p(n, f.get(i), _(i), i, "dataPoint", !0, r?.w ?? 1, r?.h ?? 1)) return c + 1;
			}
		} else if ((x || S) && (S ? n.values.length >= 3 && n.values.every((e) => e != null && Number.isFinite(e)) : n.values.length > 0) && !p(n, void 0, g, void 0)) return c + 1;
		let C = i?.kind === "bubble" || i == null && e.chartType === "bubble", w = d !== "scatter" || !C;
		if (Kt(d) && !S && w) {
			if (h && d !== "stock") {
				let t = d === "stackedLine" || d === "stackedLinePct" || i?.kind === "line" && (i.grouping === "stacked" || i.grouping === "percentStacked") || d === "line" && e.dispBlanksAs === "zero", r = !t && e.dispBlanksAs === "span", a = [], o = () => {
					for (let e = 1; e < a.length; e++) {
						let t = a[e];
						if (!p(n, f.get(t), t, t, "dataPointLine", !1)) return !1;
					}
					if (d === "radar" && a.length > 1) {
						let e = a[0];
						if (!p(n, f.get(e), e, e, "dataPointLine", !1)) return !1;
					}
					return a = [], !0;
				};
				for (let e = 0; e < n.values.length; e++) {
					if (n.sourceHidden?.[e] === !0) {
						if (!o()) return c + 1;
						continue;
					}
					let i = n.values[e];
					if (i != null && Number.isFinite(i) || t) a.push(e);
					else if (!r && !o()) return c + 1;
				}
				if (!o()) return c + 1;
			} else if (!p(n, void 0, g, void 0, "dataPointLine", !1)) return c + 1;
		}
		let T = b || h, E = ce(e, n, d, Math.max(n.values.length, n.categories?.length ?? 0, e.categories.length), l, {
			chartType: bt(e.chartType, i),
			bubbleScale: i?.bubbleScale ?? e.bubbleScale,
			showNegativeBubbles: i?.showNegativeBubbles ?? e.showNegativeBubbles
		}, t), D = ct(s, o, t);
		if (d !== "bubble" && (e.showLegend && D || u || E > 0)) {
			let r = Kt(d) ? "dataPointLine" : "dataPoint", a = r === "dataPoint", h = (e, t, i, o) => {
				let s = m(n, t, i, e, r);
				return p(n, t, i, o, r, a, s.width, s.height);
			};
			if (T) {
				let r = Math.max(n.values.length, n.categories?.length ?? 0, e.categories.length), a = new Map((n.dataLabelOverrides ?? []).map((e) => [e.idx, e]));
				for (let u = 0; u < r; u++) {
					let r = _(u), p = f.get(u), m = a.get(u), g = !Ve(n.seriesDataLabels, m) && (m?.showLegendKey ?? n.seriesDataLabels?.showLegendKey ?? !1) === !0 && z(e, n, d, u, l, {
						chartType: bt(e.chartType, i),
						bubbleScale: i?.bubbleScale ?? e.bubbleScale,
						showNegativeBubbles: i?.showNegativeBubbles ?? e.showNegativeBubbles
					});
					if (e.showLegend && tt(s, o, t, u) && !h("legend", p, r, u) || g && !h("label", p, r, u)) return c + 1;
				}
				let p = f.get(0);
				if (u && !h("table", p, _(0), 0)) return c + 1;
			} else {
				if (e.showLegend && D && !h("legend", void 0, g, void 0) || u && !h("table", void 0, g, void 0)) return c + 1;
				for (let e = 0; e < E; e++) if (!h("label", void 0, g, void 0)) return c + 1;
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
			if (!f(b(e, u, l), p, m)) return !1;
		}
		return !0;
	};
	for (let t of e.lineGroupDecorations ?? []) {
		if (!t.upDownBars) continue;
		let n = e.series.filter((e) => e.lineGroupIndex === t.groupIndex);
		if (n.length === 0 && t.groupIndex === 0 && (n = e.series), !h(n, t.upDownBars)) return c + 1;
	}
	if (e.stockUpDownBars) {
		let t = e.plotGroups?.find((e) => e.kind === "stock");
		if (!h(t ? e.series.slice(t.seriesStart, t.seriesStart + t.seriesCount) : e.series, e.stockUpDownBarStyle ?? {
			gapWidthPercent: 150,
			up: {},
			down: {}
		})) return c + 1;
	}
	return d;
}
function Jt(e, t, n = 4 / 3, r, i = !1) {
	return He(() => qe(() => qt(e, t, n, r, i)));
}
//#endregion
//#region packages/core/src/chart/date-axis.ts
function X(e) {
	return e === "days" || e === "months" || e === "years" ? e : null;
}
function Z(e, t) {
	switch (t) {
		case "years": return new Date(Date.UTC(e.getUTCFullYear(), 0, 1));
		case "months": return new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), 1));
		case "days": return new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()));
	}
}
function Yt(e, t, n) {
	if (n === "days") return new Date(e.getTime() + t * 864e5);
	let r = new Date(e.getTime());
	return n === "months" ? r.setUTCMonth(r.getUTCMonth() + t) : r.setUTCFullYear(r.getUTCFullYear() + t), r;
}
function Q(e, t) {
	switch (t) {
		case "years": return e.getUTCFullYear();
		case "months": return e.getUTCFullYear() * 12 + e.getUTCMonth();
		case "days": return Math.floor(e.getTime() / 864e5);
	}
}
function Xt(e) {
	let t = e.categories.map((e) => Number(e));
	if (t.length === 0 || t.some((e) => !Number.isFinite(e))) return null;
	let n = e.date1904 === !0, r = X(e.baseTimeUnit) ?? "days", i = X(e.majorTimeUnit) ?? r, a = X(e.minorTimeUnit) ?? r, o = (e, t) => e == null || !(e > 0) || !Number.isFinite(e) ? null : t === "days" || e >= 1 && Number.isInteger(e) ? e : null, s = o(e.majorUnit, i), c = o(e.minorUnit, a), l = (e) => Q(Xe(e, n), r), u = Array(t.length), d = Infinity, f = -Infinity, p = Infinity, m = -Infinity;
	for (let e = 0; e < t.length; e++) {
		let n = t[e], r = l(n);
		u[e] = r, d = Math.min(d, r), f = Math.max(f, r), p = Math.min(p, n), m = Math.max(m, n);
	}
	let h = e.explicitMin, g = e.explicitMax, _ = h != null && Number.isFinite(h) ? l(h) : null, v = g != null && Number.isFinite(g) ? l(g) : null, b = e.crossBetween !== !1, x = _ ?? d, S = (v ?? f) + +!!b;
	S > x || (x -= .5, S += .5);
	let C = S - x, w = (e) => (l(e) - x) / C, T = e.reversed ? (e) => 1 - w(e) : w, E = (e) => (l(e) + (b ? .5 : 0) - x) / C, D = e.reversed ? (e) => 1 - E(e) : E, O = t.map(D), k = t.map(() => 1 / C), A = h != null && Number.isFinite(h) ? h : p, j = g != null && Number.isFinite(g) ? g : m, M = (e, t) => {
		if (t == null) return [];
		let r = Z(Xe(A, n), e), i = y(r, n);
		for (let a = 0; i < A && a < 512; a++) {
			let a = Yt(r, t, e), o = y(a, n);
			if (!(o > i)) return [];
			r = a, i = o;
		}
		if (i < A) return [];
		let a = [];
		for (; i <= j;) {
			if (a.length === 512) return [];
			a.push({
				serial: i,
				fraction: T(i)
			});
			let o = Yt(r, t, e), s = y(o, n);
			if (!(s > i)) break;
			r = o, i = s;
		}
		return a;
	}, N = M(i, s), P = new Set(N.map((e) => l(e.serial)));
	return {
		positions: O,
		categoryBandFractions: k,
		majorTicks: N,
		minorTicks: c == null ? [] : M(a, c).filter((e) => !P.has(l(e.serial)))
	};
}
//#endregion
//#region packages/core/src/chart/trendline-label.ts
function Zt(e, t, n, r, i, a, o) {
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
		let t = ee(a, e, d);
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
//#region packages/core/src/chart/renderer.ts
var Qt = [
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
], $t = [
	"5B9BD5",
	"ED7D31",
	"A5A5A5",
	"FFC000",
	"4472C4",
	"70AD47"
];
function en(e, t) {
	return t?.color ? `#${t.color}` : `#${Qt[e % Qt.length]}`;
}
function tn(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e ?? []) t.has(n.idx) || t.set(n.idx, n);
	return t;
}
function nn(e, t, n = !0, r = e) {
	let i = t.dataPointColors?.[e];
	return i ? `#${i}` : t.color === "00000000" ? "#00000000" : n ? `#${Qt[e % Qt.length]}` : en(r, t);
}
function rn(e, t, n, r) {
	return lt(e, n) ? r : xa(t, n);
}
function an(e, t, n, r, i, a, o, s, c, l, u, d = !0, f = !0) {
	let p = Y(t, n, r, i, a), { paint: m } = p;
	if (m === void 0 && !d || (m === void 0 && (m = {
		fillType: "solid",
		color: o.replace(/^#/, "")
	}), m === null)) return !1;
	let h = m.fillType === "solid" ? m.color.startsWith("#") ? m.color : `#${m.color}` : G(m, e, l.x, l.y, l.w, l.h, u);
	if (!h) return !1;
	e.strokeStyle = h, e.lineWidth = p.widthEmu == null ? s : De(p.widthEmu, c);
	let g = ft(p.customDash, p.dash, e.lineWidth), _ = typeof e.getLineDash == "function" ? e.getLineDash() ?? [] : [];
	return (f || g.length > 0 || _.length > 0) && e.setLineDash(g), e.lineCap = p.cap === "rnd" ? "round" : p.cap === "sq" ? "square" : "butt", e.lineJoin = p.join === "round" || p.join === "bevel" ? p.join : "miter", !0;
}
function on(t, n, r, i, a, o, s, c, l, u, d, f = !0) {
	let p = Math.max(0, Be(n, r)), m = tn(r.dataPointOverrides), h = nt(n, "dataPointLine", p), g = (i, o, p, g, _ = !1) => {
		let v = m.get(o.index);
		Se(t, e(v?.chartexStyle, r.chartexStyle), h, o.index, u, l, (e) => {
			if (e.save(), an(e, n, "dataPointLine", r, v, o.index, s, c, l, u, d, f)) {
				if (e.beginPath(), e.moveTo(i.x, i.y), a && !_) {
					let t = p[g - 1] ?? i, n = p[g + 2] ?? o;
					e.bezierCurveTo(i.x + (o.x - t.x) / 6, i.y + (o.y - t.y) / 6, o.x - (n.x - i.x) / 6, o.y - (n.y - i.y) / 6, o.x, o.y);
				} else e.lineTo(o.x, o.y);
				e.stroke();
			}
			e.restore();
		}, o.index);
	};
	for (let e of i) {
		for (let t = 0; t + 1 < e.length; t++) g(e[t], e[t + 1], e, t);
		o && e.length > 1 && g(e[e.length - 1], e[0], e, e.length - 1, !0);
	}
}
function sn(e, t, n, r, i, a, o, s, c) {
	let l = r?.chartexStyle, u = Be(t, n), d = nt(t, "dataPoint", u >= 0 ? u : i), f = n.chartexStyle, p = Pe(l, r?.idx ?? i) !== void 0 || r?.lineHidden === !0 || r?.lineColor != null, m = Pe(f, i) !== void 0 || n.lineHidden === !0 || n.lineColor != null, h = Pe(d, i) !== void 0;
	!p && !m && !h || (e.save(), an(e, t, "dataPoint", n, r, i, a, Math.max(.5, o * .75), o, s, c, !1) && e.stroke(), e.restore());
}
function cn(e, t) {
	return t && (t.startsWith("+mj") ? e.themeMajorFontLatin ?? null : t.startsWith("+mn") ? e.themeMinorFontLatin ?? null : t);
}
function $(e, t, n) {
	let r = n === "major" ? e.themeMajorFontLatin : e.themeMinorFontLatin, i = cn(e, t) ?? r;
	return i ? `"${i}", Calibri, Arial, sans-serif` : "sans-serif";
}
function ln(e, t, n = !1, r = !1) {
	return `${r ? "italic " : ""}${n ? "bold " : ""}${e}px ${t}`;
}
function un(e, t, n, r = !1, i = !0) {
	if (r || ze(e, t.length, i)) {
		let e = t[0];
		return e ? nn(n, e, i, 0) : `#${Qt[n % Qt.length]}`;
	}
	return en(n, t[n]);
}
function dn(e, t, n, r, i, o, s, c, l, u, d = "sans-serif", f, p, m, h, g, _ = 1) {
	e.save(), e.font = ln(o, d, s, c), e.fillStyle = l;
	let v = m ? t : At(e, t, u), y = L(i, f, p), b = n, x = r;
	if (m && h) {
		let t = e.measureText(v).width, i = Math.abs(Math.cos(y)), a = Math.abs(Math.sin(y)), s = t * i + o * a, c = t * a + o * i, l = {
			x: n - s / 2,
			y: r - c / 2,
			w: s,
			h: c
		}, u = ee({
			...m,
			w: void 0,
			h: void 0
		}, h, l);
		u && (b = u.x + u.w / 2, x = u.y + u.h / 2);
	}
	e.translate(b, x), y !== 0 && e.rotate(y);
	let S = e.measureText(v).width;
	a(e, g, {
		x: -S / 2,
		y: -o / 2,
		w: S,
		h: o
	}, _), e.textAlign = "center", e.textBaseline = "middle", e.fillText(v, 0, 0), e.restore();
}
function fn(e) {
	return e ? `#${e}` : "#555";
}
function pn(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m = !1) {
	let h = (f, p, m, h, g, _, v, y, b, x, S) => {
		let C = mi(t, S ? { style: S } : void 0, t.chartStyleRoles?.axisTitle, J(t, "axisTitle"), !0);
		if (p === "left") {
			dn(e, f, n + u + pt(i) + m / 2, s + l / 2, p, m, h, g, _, l, v, y, b, x, {
				x: n,
				y: r,
				w: i,
				h: a
			}, C, m / 10);
			return;
		}
		dn(e, f, o + c / 2, r + a - d - pt(a) - m / 2, p, m, h, g, _, c, v, y, b, x, {
			x: n,
			y: r,
			w: i,
			h: a
		}, C, m / 10);
	};
	t.valAxisTitle && h(t.valAxisTitle, m ? "horizontal" : "left", p, t.valAxisTitleFontBold ?? !0, t.valAxisTitleFontItalic ?? !1, fn(t.valAxisTitleFontColor), $(t, t.valAxisTitleFontFace, "major"), t.valAxisTitleRotation, t.valAxisTitleVerticalMode, t.valAxisTitleManualLayout, t.valAxisTitleStyle), t.catAxisTitle && h(t.catAxisTitle, m ? "left" : "horizontal", f, t.catAxisTitleFontBold ?? !0, t.catAxisTitleFontItalic ?? !1, fn(t.catAxisTitleFontColor), $(t, t.catAxisTitleFontFace, "major"), t.catAxisTitleRotation, t.catAxisTitleVerticalMode, t.catAxisTitleManualLayout, t.catAxisTitleStyle);
}
function mn(e) {
	return e.dataTable != null && B(e.chartType);
}
function hn(e) {
	let t = e.chartType === "clusteredBarH" || e.chartType === "stackedBarH" || e.chartType === "stackedBarHPct", n = e.series.map((e, t) => ({
		series: e,
		sourceIndex: t
	}));
	return t ? n.reverse() : n;
}
function gn(e, t) {
	let n = mn(e) ? e.dataTable : null;
	if (!n) return 0;
	let r = M(n.fontSizeHpt, t) ?? 9 * t, i = Math.max(1, r * 1.2) + 4 * t;
	return (e.series.length + 1) * i;
}
function _n(e, t, n) {
	let r = mn(t) ? t.dataTable : null;
	if (!r) return 0;
	let i = M(r.fontSizeHpt, n) ?? 9 * n, a = $(t, r.fontFace, "minor");
	e.save(), e.font = ln(i, a, r.fontBold ?? !1, r.fontItalic ?? !1);
	let o = t.series.reduce((t, n) => Math.max(t, e.measureText(n.name).width), 0);
	e.restore();
	let s = r.showKeys ? Math.max(12 * n, i * 1.7) : 0, c = r.showKeys ? 4 * n : 0;
	return o + s + c + 6 * n;
}
function vn(e, t, n, r) {
	let i = mn(t) ? t.dataTable : null;
	if (!i) return null;
	let a = M(i.fontSizeHpt, r) ?? 9 * r, o = Math.max(1, a * 1.2), s = o + 4 * r, c = $(t, i.fontFace, "minor");
	e.save(), e.font = ln(a, c, i.fontBold ?? !1, i.fontItalic ?? !1);
	let l = t.series.find((e) => e.catFormatCode)?.catFormatCode ?? t.catAxisFormatCode, d = t.series.find((e) => e.catFormatBuiltinId != null)?.catFormatBuiltinId, f = Gr(t).map((i) => {
		let a = i.trim() === "" ? NaN : Number(i);
		return Dr(e, d === 14 && Number.isFinite(a) ? u(a, t.date1904) : p(i, l, t.date1904), Math.max(1, n - 4 * r));
	});
	e.restore();
	let m = Math.max(1, ...f.map((e) => e.length)) * o + 4 * r;
	return {
		fontPx: a,
		lineHeight: o,
		headerLines: f,
		headerHeight: m,
		rowHeight: s,
		totalHeight: m + hn(t).length * s
	};
}
function yn(e, t, n, r, i, a, o, s) {
	let c = t.dataTable;
	if (!c || !n) return;
	let l = Gr(t);
	if (l.length === 0) return;
	let u = a / l.length, d = $(t, c.fontFace, "minor"), f = ln(n.fontPx, d, c.fontBold ?? !1, c.fontItalic ?? !1), p = c.showKeys ? Math.max(12 * s, n.fontPx * 1.7) : 0, m = c.showKeys ? 4 * s : 0;
	e.save(), e.font = f;
	let h = t.series.reduce((t, n) => Math.max(t, e.measureText(n.name).width), 0) + p + m + 6 * s, g = Math.min(Math.max(0, r - o), h), _ = r - g, v = g + a, y = i + n.totalHeight, b = hn(t), x = On(t.series, t.chartType, t.scatterStyle, !1, t.categories, [], !0, [], t.radarStyle, t), S = he(t), C = c.fillColor ?? null;
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
	for (let t = 0; t < b.length; t++) {
		let { series: a, sourceIndex: o } = b[t], d = i + n.headerHeight + t * n.rowHeight + n.rowHeight / 2;
		if (g > 0) {
			let t = _ + 3 * s + p + m;
			if (e.textAlign = "left", e.fillText(At(e, a.name, Math.max(0, r - t - 2 * s)), t, d), c.showKeys && p > 0) {
				let t = _ + 3 * s, r = Ke(S, o), i = r == null ? void 0 : x[r];
				if (i) {
					let r = Math.min(n.fontPx, n.rowHeight - 2 * s);
					Tn(e, i.swatchStyle, i.color, t, d - r / 2, p, r, i.marker, i.fillPaint, i.outlinePaint, i.outlineColor, i.outlineWidthEmu, i.outlineDash, i.outlineCustomDash, i.outlineCap, i.outlineJoin, s, 0, i.directEffect, i.fallbackEffect, i.directEffectIndex, i.fallbackEffectIndex);
				}
				e.fillStyle = w;
			}
		}
		for (let e = 0; e < l.length; e++) {
			let t = a.values[e];
			T(t == null ? "" : oe(t, a.valFormatCode), r + (e + .5) * u, d);
		}
	}
	if (c.lineHidden !== !0 && (c.linePaintAuthored !== !0 || c.lineColor != null)) {
		if (e.strokeStyle = c.lineColor ? `#${c.lineColor}` : "#808080", e.lineWidth = c.lineWidthEmu == null ? Math.max(.5, s * .75) : De(c.lineWidthEmu, s), e.setLineDash(ga(c.lineDash ?? void 0, e.lineWidth)), c.showHorizontalBorder) {
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
function bn(e) {
	return e && (e === "line" || e === "stackedLine" || e === "stackedLinePct" || e === "radar" || e === "scatter" || e === "stock") ? "line" : "fill";
}
function xn(e, t, n) {
	if (e !== "scatter") return !1;
	let r = t ?? "marker";
	return (r === "marker" || r === "line" || r === "lineMarker" || r === "lineNoMarker" || r === "smooth" || r === "smoothMarker" || r === "smoothNoMarker") && n.lineHidden !== !0;
}
function Sn(t, n, r, i, a, s) {
	let c = i[a];
	if (!c) return null;
	let l = s ? Math.max(0, Be(s, c)) : a, u = s ? ge(s, l) : void 0, d = s && u ? bt(s.chartType, u) : c.seriesType ?? t, f = u?.scatterStyle ?? n, p = u?.radarStyle ?? r, m = u?.kind === "bubble" ? "bubble" : d, h = m === "stock", g = m === "line" || m === "stackedLine" || m === "stackedLinePct" || m === "radar" || h, _ = m === "bubble", v = m === "scatter" || _;
	if (!g && !v || !be(d, f, u ? {
		...c,
		seriesType: d
	} : c, p)) return null;
	let y = c.markerSymbol ?? c.automaticMarkerSymbol ?? (h ? "none" : "circle"), b = en(l, c), x = it(c, b.replace(/^#/, "")), S = _ ? !1 : v ? xn("scatter", f, c) : c.lineHidden !== !0;
	if (_ && s) {
		let t = xa(c, l), n = Xi(s, c, void 0, 0, t, b), r = Zi(s, c, void 0, 0, t);
		return {
			symbol: "circle",
			fill: n.color,
			fillPaint: n.paint,
			line: r.color,
			lineWidthEmu: r.widthEmu ?? null,
			linePaint: r.paint,
			lineDash: r.dash,
			lineCustomDash: r.customDash,
			lineCap: r.cap,
			lineJoin: r.join,
			bubble3D: o(c, void 0),
			withLine: !1,
			directEffect: e(c.chartexStyle),
			fallbackEffect: nt(s, o(c, void 0) ? "dataPoint3D" : "dataPoint", l),
			directEffectIndex: t,
			fallbackEffectIndex: lt(s, l) ? 0 : t
		};
	}
	return s ? wn(s, c, void 0, 0, l, m, f, p) : {
		symbol: y,
		fill: x,
		fillPaint: Ue(c),
		line: c.markerLine ?? null,
		lineWidthEmu: c.markerLineWidthEmu ?? null,
		withLine: S
	};
}
function Cn(t, n, r, i) {
	let a = Math.max(0, Be(t, n)), s = en(a, n), c = xa(n, a), l = Xi(t, n, r, i, c, s), u = Zi(t, n, r, i, c), d = e(r?.chartexStyle), f = e(n.chartexStyle), p = o(n, r);
	return {
		symbol: "circle",
		fill: l.color,
		fillPaint: l.paint,
		line: u.color,
		lineWidthEmu: u.widthEmu ?? null,
		linePaint: u.paint,
		lineDash: u.dash,
		lineCustomDash: u.customDash,
		lineCap: u.cap,
		lineJoin: u.join,
		bubble3D: p,
		withLine: !1,
		directEffect: d ?? f,
		fallbackEffect: nt(t, p ? "dataPoint3D" : "dataPoint", a),
		directEffectIndex: d ? i : c,
		fallbackEffectIndex: lt(t, a) ? i : c
	};
}
function wn(t, n, r, i, a, o, s, c) {
	let l = o === "line" || o === "stackedLine" || o === "stackedLinePct" || o === "radar" || o === "stock";
	if (!l && o !== "scatter") return null;
	let u = f(n, r, "circle", be(o, s, n, c));
	if (u === "none") return null;
	let d = en(a, n).replace(/^#/, ""), p = n.chartexFormatIdx ?? a, m = nt(t, "dataPointMarker", a), h = J(t, "dataPointMarker"), g = lt(t, a) ? i : p, _ = V(r?.markerStyle, h, i), v = V(n.markerStyle, h, p), y = _ !== void 0 || r?.markerFill != null || r?.markerFillPaint !== void 0 || r?.markerFillPaintAuthored === !0 && r.markerStyle?.fillHidden !== !0, b = v !== void 0 || n.markerFill != null || n.markerFillPaint !== void 0 || n.markerFillPaintAuthored === !0 && n.markerStyle?.fillHidden !== !0, S = r ? Ze(n, r, i, d) : it(n, d), C = r ? x(n, r, i) : Ue(n);
	if (_ === null || _ === void 0 && v === null) S = "00000000", C = null;
	else if (!y && !b) {
		let e = at(m, g);
		e === null ? (S = "00000000", C = null) : e?.fillType === "solid" ? (S = e.color, C = void 0) : e !== void 0 && (C = e);
	}
	let w = ue(r?.markerStyle, h, i), T = ue(n.markerStyle, h, p), E = r?.markerLine ?? n.markerLine ?? null, D;
	if (w !== void 0) w?.fillType === "solid" ? E = w.color : D = w;
	else if (r?.markerLinePaintAuthored === !0 && r.markerStyle?.lineHidden !== !0 && r.markerLine == null) D = null;
	else if (T !== void 0) T?.fillType === "solid" ? E = T.color : D = T;
	else if (n.markerLinePaintAuthored === !0 && n.markerStyle?.lineHidden !== !0 && n.markerLine == null) D = null;
	else if (r?.markerLine == null && n.markerLine == null) {
		let e = Pe(m, g);
		e?.fillType === "solid" ? E = e.color : (D = e, e === null && (E = null));
	}
	let O = m, k = ye(r?.markerStyle, n.markerStyle, O), A = e(r?.markerStyle, r?.chartexStyle), j = e(n.markerStyle);
	return {
		symbol: u,
		fill: S,
		fillPaint: C,
		line: E,
		linePaint: D,
		lineWidthEmu: r?.markerLineWidthEmu ?? r?.markerStyle?.lineWidthEmu ?? n.markerLineWidthEmu ?? n.markerStyle?.lineWidthEmu ?? O?.lineWidthEmu ?? null,
		lineDash: k?.lineDash,
		lineCustomDash: k?.lineCustomDash,
		lineCap: r?.markerStyle?.lineCap ?? n.markerStyle?.lineCap ?? O?.lineCap,
		lineJoin: r?.markerStyle?.lineJoin ?? n.markerStyle?.lineJoin ?? O?.lineJoin,
		withLine: l || xn("scatter", s, n),
		directEffect: A ?? j,
		fallbackEffect: m,
		directEffectIndex: A ? i : p,
		fallbackEffectIndex: g
	};
}
function Tn(e, t, n, r, i, a, o, s = null, c = void 0, l = void 0, u = null, d = null, f = null, p = void 0, m = null, h = null, g = 1, _ = 0, v, y, b = 0, x = b) {
	if (t !== "none") {
		if (s && !s.withLine) {
			oa(e, r + a / 2, i + o / 2, s.symbol, o * .58 / g, s.fill, s.line, g, s.lineWidthEmu == null ? void 0 : De(s.lineWidthEmu, g), s.fillPaint, _, s.linePaint, s.lineDash, s.lineCustomDash, s.lineCap, s.lineJoin, s.bubble3D, s.directEffect, s.fallbackEffect, s.directEffectIndex, s.fallbackEffectIndex);
			return;
		}
		Se(e, v, y, b, {
			x: r,
			y: i,
			w: a,
			h: o
		}, g, (e) => En(e, t, n, r, i, a, o, c, l, u, d, f, p, m, h, g, _), x), s && oa(e, r + a / 2, i + o / 2, s.symbol, o * .58 / g, s.fill, s.line, g, s.lineWidthEmu == null ? void 0 : De(s.lineWidthEmu, g), s.fillPaint, _, s.linePaint, s.lineDash, s.lineCustomDash, s.lineCap, s.lineJoin, s.bubble3D, s.directEffect, s.fallbackEffect, s.directEffectIndex, s.fallbackEffectIndex);
	}
}
function En(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g) {
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
		let t = c ? G(c, e, r, i, a, o, g) : l ? `#${l}` : n;
		if (!t) {
			e.restore();
			return;
		}
		e.strokeStyle = t, e.lineWidth = u == null ? Math.max(1.5, o * .15) : De(u, h), e.setLineDash(ft(f, d, e.lineWidth)), e.lineCap = p === "rnd" ? "round" : p === "sq" ? "square" : "butt", e.lineJoin = m === "round" || m === "bevel" ? m : "miter", e.beginPath();
		let s = i + o / 2;
		e.moveTo(r, s), e.lineTo(r + a, s), e.stroke(), e.restore();
	} else {
		Ma(e, s, {
			x: r,
			y: i,
			w: a,
			h: o
		}, n, h, g);
		let t = c === null ? null : c ? G(c, e, r, i, a, o, g) : l ? `#${l}` : null;
		if (t) {
			let n = De(u, h);
			e.save(), e.strokeStyle = t, e.lineWidth = n, e.setLineDash(ft(f, d, e.lineWidth)), e.lineCap = p === "rnd" ? "round" : p === "sq" ? "square" : "butt", e.lineJoin = m === "round" || m === "bevel" ? m : "miter", e.strokeRect(r + n / 2, i + n / 2, Math.max(0, a - n), Math.max(0, o - n)), e.restore();
		}
	}
}
function Dn(e, t) {
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
function On(t, n, r, i = !1, a = [], o = [], s = !0, c = [], l, u) {
	let d = ze(n, t.length, s);
	if (i || d) {
		let f = t[0], p = f ? f.values.length : 0, m = f?.categories ?? a, h = u && f ? Math.max(0, Be(u, f)) : 0, g = u ? ge(u, h) : void 0, _ = g?.kind === "bubble" ? "bubble" : f?.seriesType ?? n, v = g?.scatterStyle ?? r, y = g?.radarStyle ?? l, b = new Map(f?.dataPointOverrides?.map((e) => [e.idx, e]) ?? []);
		return Dn(Array.from({ length: p }, (r, a) => {
			let c = b.get(a), l = u && f ? rn(u, f, h, a) : a, p = bn(_), g = u && f ? Y(u, p === "line" ? "dataPointLine" : "dataPoint", f, c, l) : void 0, x = a < o.length ? o[a] : u && f ? S(u, f, c, l, a) : c?.fillHidden === !0 ? null : c?.color || f?.dataPointColors?.[a] ? void 0 : f?.fillPattern ?? void 0, C = (_ === "bubble" && u && f ? Cn(u, f, c, a) : null) ?? (u && f ? wn(u, f, c, a, h, _, v, y) : null), w = e(c?.chartexStyle), T = e(f?.chartexStyle), E = u && f ? nt(u, p === "line" ? "dataPointLine" : "dataPoint", h) : void 0, D = d && f ? nn(a, f, s, 0) : un(n, t, a, i, s);
			return {
				label: (m[a] ?? `Item ${a + 1}`).toString(),
				color: x?.fillType === "solid" ? x.color.startsWith("#") ? x.color : `#${x.color}` : D,
				marker: C,
				swatchStyle: p,
				fillPaint: x,
				outlinePaint: g?.paint?.fillType === "solid" ? void 0 : g?.paint,
				outlineColor: g?.paint?.fillType === "solid" ? g.paint.color : c?.lineColor ?? f?.lineColor ?? null,
				outlineWidthEmu: g?.widthEmu ?? null,
				outlineDash: g?.dash ?? null,
				outlineCustomDash: g?.customDash,
				outlineCap: g?.cap ?? null,
				outlineJoin: g?.join ?? null,
				directEffect: w ?? T,
				fallbackEffect: E,
				directEffectIndex: w ? a : f ? xa(f, h) : l,
				fallbackEffectIndex: l,
				textOverride: null
			};
		}), c);
	}
	return u && t.some((e) => {
		let t = Be(u, e), n = ge(u, t);
		return t >= 0 && n?.kind !== "pie" && n?.kind !== "pie3D" && n?.kind !== "doughnut" && n?.kind !== "ofPie" && lt(u, t);
	}) ? Dn(t.flatMap((e) => {
		let t = Be(u, e), i = ge(u, t), o = i?.kind === "bubble" ? "bubble" : e.seriesType ?? n;
		return t >= 0 && i?.kind !== "pie" && i?.kind !== "pie3D" && i?.kind !== "doughnut" && i?.kind !== "ofPie" && lt(u, t) ? On([e], o, i?.scatterStyle ?? r, !0, e.categories ?? a, [], s, [], i?.radarStyle ?? l, u) : On([e], o, i?.scatterStyle ?? r, !1, e.categories ?? a, [], s, [], i?.radarStyle ?? l, u);
	}), c) : Dn(t.map((i, a) => {
		let c = u ? Be(u, i, a) : a, d = (u ? ge(u, c) : void 0)?.kind === "bubble" ? "bubble" : i.seriesType ?? n, f = i.lineHidden !== !0, p = f ? i.lineColor ?? null : null, m = Sn(n, r, l, t, a, u), h = d === "stock" && !f && !m ? "none" : bn(d), g = xa(i, c >= 0 ? c : a), _ = a < o.length ? o[a] : u ? S(u, i, void 0, g) : at(i.chartexStyle, i.chartexFormatIdx ?? a) ?? i.fillPattern ?? void 0, v = u ? Y(u, h === "line" ? "dataPointLine" : "dataPoint", i, void 0, g) : void 0, y = u ? nt(u, h === "line" ? "dataPointLine" : "dataPoint", c) : void 0;
		return {
			label: i.name || `Series ${a + 1}`,
			color: h === "line" && v?.paint?.fillType === "solid" ? v.paint.color.startsWith("#") ? v.paint.color : `#${v.paint.color}` : h === "line" && p ? `#${p}` : _?.fillType === "solid" ? _.color.startsWith("#") ? _.color : `#${_.color}` : un(n, t, a, !1, s),
			marker: m,
			swatchStyle: h,
			fillPaint: _,
			outlinePaint: v?.paint?.fillType === "solid" ? void 0 : v?.paint,
			outlineColor: v?.paint?.fillType === "solid" ? v.paint.color : p,
			outlineWidthEmu: v?.widthEmu ?? (f ? i.lineWidthEmu ?? null : null),
			outlineDash: v?.dash ?? (f ? i.chartexStyle?.lineDash ?? null : null),
			outlineCustomDash: v?.customDash,
			outlineCap: v?.cap ?? (f ? i.chartexStyle?.lineCap ?? null : null),
			outlineJoin: v?.join ?? (f ? i.chartexStyle?.lineJoin ?? null : null),
			directEffect: e(i.chartexStyle),
			fallbackEffect: y,
			directEffectIndex: g,
			fallbackEffectIndex: g,
			textOverride: null
		};
	}), c);
}
function kn(e, t, n = 0) {
	let r = Ne(e) || ze(e.chartType, e.series.length, e.varyColors !== !1), i = On(e.series, e.chartType, e.scatterStyle, Ne(e), e.categories, [], e.varyColors !== !1, [], e.radarStyle, e), a = he(e);
	return (o, s) => {
		let c = r || lt(e, o), l = r ? s : Ke(a, o, c ? s : 0), u = l == null ? void 0 : i[l];
		return u ? {
			entry: u,
			ptToPx: t,
			shapeRotationDeg: n
		} : void 0;
	};
}
function An(e, t, n, r) {
	if (!n) return t;
	let i = cn(e, n.fontFace) ?? n.fontFace;
	return {
		fontFamily: i ? `"${i}", Calibri, Arial, sans-serif` : t.fontFamily,
		color: n.fontColor ? `#${n.fontColor}` : t.color,
		bold: n.fontBold ?? t.bold,
		italic: n.fontItalic ?? t.italic,
		sizePx: M(n.fontSizeHpt, r) ?? t.sizePx
	};
}
function jn(e, t, n) {
	let r = Hn(t, n);
	return e.font = `${t.italic ? "italic " : ""}${t.bold ? "bold " : ""}${r}px ${t.fontFamily}`, r;
}
var Mn = {
	fontFamily: "sans-serif",
	color: "#333",
	bold: !1,
	italic: !1,
	sizePx: null
}, Nn = 4, Pn = 12, Fn = 4, In = 4, Ln = In * 2, Rn = 4, zn = 8, Bn = .01, Vn = 7;
function Hn(e, t) {
	return e.sizePx ?? 10 * t;
}
function Un(e, t, n) {
	return e.map((e) => {
		if (e.swatchStyle === "fill") return Vn * n;
		let r = t * 1.6;
		if (e.swatchStyle !== "line" || !e.outlineDash) return r;
		let i = e.outlineWidthEmu == null ? Math.max(1.5, t * .15) : De(e.outlineWidthEmu, n), a = ga(e.outlineDash, i), o = a.length > 0 ? a.reduce((e, t) => e + t, 0) + a[0] : 0;
		return Math.max(r, o);
	});
}
function Wn(e, t, n) {
	return e.swatchStyle === "fill" ? Vn * n : t;
}
function Gn(e, t, n) {
	if (!(n > 0)) return [];
	let r = Dr(e, t, n);
	return r.length <= 2 ? r : [r[0], At(e, r.slice(1).join(" "), n)];
}
function Kn(e, t, n, r, i, a) {
	if (!t.showLegend) return null;
	let o = Jn(t, a), s = On(Tr(t), t.chartType, t.scatterStyle, Ne(t), t.categories, [], t.varyColors !== !1, t.legendEntries ?? [], t.radarStyle, t), c = s.map((e) => An(t, o, e.textOverride, a)), l = c.map((e) => Hn(e, a)), u = s.map((e, t) => Un([e], l[t], a)[0]);
	e.save();
	let d = s.map((t, n) => (jn(e, c[n], a), u[n] + Nn + e.measureText(t.label).width));
	e.restore();
	let f = t.legendPos ?? "r", p = f === "t" || f === "b", m = O(t, n, r, i, {
		itemWidths: d,
		rowHeight: Math.max(0, ...l) + Fn,
		itemGap: Pn,
		horizontalPadding: p ? Ln : zn,
		verticalPadding: Rn
	});
	return m ? {
		...m,
		measuredLabels: s.map((e) => e.label),
		entryStyles: c,
		fontSizes: l,
		swatches: u,
		itemWidths: d
	} : null;
}
function qn(e, t, n, r, i, a, o = "vertical", s, c = Mn, l, u = !1, d = [], f = 1, p = [], m = 0, h = !0, g, _) {
	let v = Nn, y = On(t, s, l, u, d, p, h, g?.legendEntries ?? [], g?.radarStyle, g), b = _ != null && _.measuredLabels.length === y.length && _.measuredLabels.every((e, t) => e === y[t].label), x = b ? _.entryStyles : y.map((e) => g ? An(g, c, e.textOverride, f) : c), S = b ? _.fontSizes : x.map((e) => Hn(e, f));
	x[0] && jn(e, x[0], f), e.textBaseline = "middle";
	let C = Math.max(0, ...S) + Fn, w = b ? _.swatches : y.map((e, t) => Un([e], S[t], f)[0]), E = b ? _.itemWidths : y.map((t, n) => (jn(e, x[n], f), w[n] + v + e.measureText(t.label).width));
	if (o === "horizontal") {
		let t = T(E, i, Pn).slice(0, Math.max(0, Math.floor((a - Rn) / C))), o = r + Rn / 2;
		for (let r = 0; r < t.length; r++) {
			let a = t[r], s = a.map((e) => Math.min(i, E[e])), c = s.reduce((e, t) => e + t, 0) + Pn * Math.max(0, a.length - 1), l = n + Math.max(0, (i - c) / 2), u = o + r * C + C / 2;
			for (let t = 0; t < a.length; t++) {
				let n = a[t], r = w[n], i = s[t];
				if (i < r) {
					l += i + Pn;
					continue;
				}
				let o = Math.max(0, i - r - v + Bn);
				jn(e, x[n], f);
				let c = At(e, y[n].label, o), d = Wn(y[n], S[n], f);
				Tn(e, y[n].swatchStyle, y[n].color, l, u - d / 2, r, d, y[n].marker, y[n].fillPaint, y[n].outlinePaint, y[n].outlineColor, y[n].outlineWidthEmu, y[n].outlineDash, y[n].outlineCustomDash, y[n].outlineCap, y[n].outlineJoin, f, m, y[n].directEffect, y[n].fallbackEffect, y[n].directEffectIndex, y[n].fallbackEffectIndex), e.fillStyle = x[n].color, e.textAlign = "left", e.fillText(c, l + r + v, u), l += i + Pn;
			}
		}
		return;
	}
	let D = i - Math.max(...w, 0) - v, O = !u && !ze(s, t.length, h), k = y.map((t, n) => (jn(e, x[n], f), O ? Gn(e, t.label, D) : [At(e, t.label, D)])), A = k.map((e, t) => e.length * S[t] + Fn), j = 0, M = 0;
	for (; j < y.length && M + A[j] <= a;) M += A[j], j++;
	let N = j === y.length ? r + (a - M) / 2 : r;
	for (let t = 0; t < j; t++) {
		let r = w[t], a = A[t];
		if (i < r) {
			N += a;
			continue;
		}
		let o = Wn(y[t], S[t], f);
		Tn(e, y[t].swatchStyle, y[t].color, n, N + (a - o) / 2, r, o, y[t].marker, y[t].fillPaint, y[t].outlinePaint, y[t].outlineColor, y[t].outlineWidthEmu, y[t].outlineDash, y[t].outlineCustomDash, y[t].outlineCap, y[t].outlineJoin, f, m, y[t].directEffect, y[t].fallbackEffect, y[t].directEffectIndex, y[t].fallbackEffectIndex), jn(e, x[t], f), e.fillStyle = x[t].color, e.textAlign = "left", k[t].forEach((i, a) => e.fillText(i, n + r + v, N + S[t] * (a + .5))), N += a;
	}
}
function Jn(e, t) {
	let n = cn(e, e.legendFontFace) ?? e.themeMinorFontLatin;
	return {
		fontFamily: n ? `"${n}", Calibri, Arial, sans-serif` : "sans-serif",
		color: e.legendFontColor ? `#${e.legendFontColor}` : "#333",
		bold: e.legendFontBold ?? !1,
		italic: e.legendFontItalic ?? !1,
		sizePx: M(e.legendFontSizeHpt, t)
	};
}
function Yn(e, t, n, r, i, a, o, s, c, l, u, d, f, p = [], m = 0) {
	if (!n) return;
	let h = Jn(t, f), g = Tr(t), _ = Ne(t), v = Math.min(zn / 2, Math.max(0, n.reserveW) / 2), y = Math.max(0, n.reserveW - v * 2), b = n.side === "r" ? {
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
		x: r + In,
		y: i + d,
		w: Math.max(0, a - Ln),
		h: n.reserveH
	} : {
		x: r + In,
		y: i + o - n.reserveH,
		w: Math.max(0, a - Ln),
		h: n.reserveH
	}, x = n.side === "t" || n.side === "b" ? "horizontal" : "vertical", S = t.legendManualLayout, C = S ? ee(S, {
		x: r,
		y: i,
		w: a,
		h: o
	}, b) : null;
	if (C) {
		let r = C.w >= C.h ? "horizontal" : "vertical";
		q(e, t, C, f, m), qn(e, g, C.x, C.y, C.w, C.h, r, t.chartType, h, t.scatterStyle, _, t.categories, f, p, m, t.varyColors !== !1, t, n);
		return;
	}
	q(e, t, b, f, m), qn(e, g, b.x, b.y, b.w, b.h, x, t.chartType, h, t.scatterStyle, _, t.categories, f, p, m, t.varyColors !== !1, t, n);
}
function Xn(e, t, n, r, i, a, o, s) {
	if (!t || t.side !== "t" || e.legendOverlay === !0 || e.legendManualLayout == null) return s;
	let c = {
		x: n + In,
		y: r + o + 2,
		w: Math.max(0, i - Ln),
		h: t.reserveH
	}, l = ee(e.legendManualLayout, {
		x: n,
		y: r,
		w: i,
		h: a
	}, c);
	if (!l) return s;
	let u = Math.max(0, r + s - (c.y + c.h));
	return Math.max(s, l.y + l.h - r + u);
}
function Zn(e, t, n, r, i, a, o, s = !1, c = !1, l = "major", u = 1, d) {
	if (c || t === "none" || !t) return;
	let f = $n(l, o, u), p = t === "cross" ? f / 2 : f, m = e.strokeStyle, h = e.lineWidth, g = e.getLineDash?.() ?? [];
	if (e.strokeStyle = a ?? "#888", e.lineWidth = o ?? 1, e.setLineDash(ga(d ?? void 0, e.lineWidth)), e.beginPath(), n === "val") {
		let n = r, a = i, o = s ? 1 : -1, c = t === "out" || t === "cross" ? o * p : 0, l = t === "in" || t === "cross" ? -o * p : 0;
		e.moveTo(n + c, a), e.lineTo(n + l, a);
	} else {
		let n = r, a = i, o = s ? -1 : 1, c = t === "out" || t === "cross" ? o * p : 0, l = t === "in" || t === "cross" ? -o * p : 0;
		e.moveTo(a, n + c), e.lineTo(a, n + l);
	}
	e.stroke(), e.strokeStyle = m, e.lineWidth = h, e.setLineDash(g);
}
function Qn(e, t, n, r, i, a, o, s) {
	let c = e.getLineDash?.() ?? [], l = ga(s ?? void 0, o), u = l.length !== c.length || l.some((e, t) => e !== c[t]);
	e.strokeStyle = a, e.lineWidth = o, u && e.setLineDash(l), e.beginPath(), e.moveTo(t, n), e.lineTo(r, i), e.stroke(), u && e.setLineDash(c);
}
function $n(e, t, n) {
	let r = (e === "minor" ? 4 : 6) * n;
	return t ? Math.max(r, t + 2 * n) : r;
}
function er(e, t, n, r) {
	if (e !== "out" && e !== "cross") return 0;
	let i = $n(t, n, r);
	return e === "cross" ? i / 2 : i;
}
function tr(e, t, n, r, i, a) {
	a && a.explicit ? (e.strokeStyle = a.color, e.lineWidth = a.width) : (e.strokeStyle = i ? "#aaa" : a?.color ?? "#e0e0e0", e.lineWidth = i ? 1 : a?.width ?? .5);
	let o = a?.dash ?? [], s = o.length > 0 && e.getLineDash ? e.getLineDash() : [];
	o.length > 0 && e.setLineDash(o), e.beginPath(), e.moveTo(t, r), e.lineTo(t + n, r), e.stroke(), o.length > 0 && e.setLineDash(s);
}
function nr(e, t) {
	let { color: n, width: r } = ht(e.valAxisGridlineColor, e.valAxisGridlineWidthEmu, t);
	return {
		color: n,
		width: r,
		explicit: e.valAxisGridlineColor != null || e.valAxisGridlineWidthEmu != null || e.valAxisGridlineDash != null,
		dash: ga(e.valAxisGridlineDash ?? void 0, r)
	};
}
function rr(e, t) {
	let { color: n, width: r } = ht(e.valAxisMinorGridlineColor, e.valAxisMinorGridlineWidthEmu, t);
	return {
		color: n,
		width: r,
		explicit: e.valAxisMinorGridlineColor != null,
		dash: ga(e.valAxisMinorGridlineDash ?? void 0, r)
	};
}
function ir(e, t) {
	let { color: n, width: r } = ht(e.minorGridlineColor, e.minorGridlineWidthEmu, t);
	return {
		color: n,
		width: r,
		explicit: e.minorGridlineColor != null || e.minorGridlineWidthEmu != null || e.minorGridlineDash != null,
		dash: ga(e.minorGridlineDash ?? void 0, r)
	};
}
function ar(e, t) {
	let { color: n, width: r } = ht(e.majorGridlineColor, e.majorGridlineWidthEmu, t);
	return {
		color: n,
		width: r,
		explicit: e.majorGridlineColor != null || e.majorGridlineWidthEmu != null || e.majorGridlineDash != null,
		dash: ga(e.majorGridlineDash ?? void 0, r)
	};
}
function or(e) {
	return e.catAxisMajorGridlines === !0;
}
function sr(e, t) {
	let n = ht(e.catAxisGridlineColor, e.catAxisGridlineWidthEmu, t);
	return {
		...n,
		dash: ga(e.catAxisGridlineDash ?? void 0, n.width)
	};
}
function cr(e, t) {
	let n = ht(e.catAxisMinorGridlineColor, e.catAxisMinorGridlineWidthEmu, t);
	return {
		...n,
		dash: ga(e.catAxisMinorGridlineDash ?? void 0, n.width)
	};
}
function lr(e, t) {
	if (t <= 0) return [];
	let n = fe(e), r = [], i = n ? t : t - 1;
	for (let e = 0; e <= i; e++) r.push(n ? e / t : t === 1 ? .5 : e / (t - 1));
	return r;
}
function ur(e) {
	return e.valAxisOrientation === "maxMin";
}
function dr(e) {
	return e.catAxisOrientation === "maxMin";
}
function fr(e) {
	return e.valAxisMajorGridlines !== !1;
}
function pr(e, t) {
	return e == null || !t ? e : e * 100;
}
function mr(e, t, n) {
	return oe((n ? t / 100 : t) / hr(e.valAxisDisplayUnits), n ? e.valAxisFormatCode ?? "0%" : e.valAxisFormatCode, e.date1904);
}
function hr(e) {
	let t = e?.divisor;
	return t != null && Number.isFinite(t) && t > 0 ? t : 1;
}
function gr(e, t, n, r) {
	return oe(e / hr(r), t, n);
}
function _r(e) {
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
	}[e.builtInUnit] ?? e.builtInUnit : re(e.divisor);
}
function vr(e, t, n, r) {
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
	for (let { units: o, vertical: s, fallbackX: c, fallbackY: l, axis: u } of i) {
		let i = o?.label;
		if (!o || !i) continue;
		let d = i.text ?? _r(o), f = t.chartTextStyle, p = M(i.fontSizeHpt ?? u.size ?? f?.fontSizeHpt, r) ?? 10 * r, m = i.fontBold ?? u.bold ?? f?.fontBold ?? !1, h = i.fontItalic ?? u.italic ?? f?.fontItalic ?? !1, g = i.fontPaintAuthored === !0 ? {
			color: i.fontColor,
			hidden: i.fontHidden === !0 || i.fontColor == null
		} : u.paintAuthored === !0 ? {
			color: u.color,
			hidden: u.color == null
		} : f?.fontPaintAuthored === !0 ? {
			color: f.fontColor,
			hidden: f.fontColor == null
		} : {
			color: i.fontColor ?? u.color ?? f?.fontColor,
			hidden: !1
		};
		if (g.hidden) continue;
		let _ = g.color, v = i.fontFace ?? u.face ?? f?.fontFace;
		e.save(), e.font = ln(p, $(t, v, "minor"), m, h);
		let y = i.rotation == null ? s ? -Math.PI / 2 : 0 : i.rotation / 6e4 * Math.PI / 180, b = e.measureText(d).width, x = Math.abs(Math.cos(y)) * b + Math.abs(Math.sin(y)) * p, S = Math.abs(Math.sin(y)) * b + Math.abs(Math.cos(y)) * p, C = {
			x: c - x / 2,
			y: l - S / 2,
			w: x,
			h: S
		}, w = i.manualLayout ? ee({
			...i.manualLayout,
			w: void 0,
			h: void 0
		}, n, C) : C;
		if (!w) {
			e.restore();
			continue;
		}
		let T = w.x + w.w / 2, E = w.y + w.h / 2;
		a(e, mi(t, i.boxStyle, t.chartStyleRoles?.axisTitle, J(t, "axisTitle"), !0), w, r), e.translate(T, E), y !== 0 && e.rotate(y), e.fillStyle = _ ? `#${_}` : "#595959", e.textAlign = "center", e.textBaseline = "middle", e.fillText(d, 0, 0), e.restore();
	}
}
function yr(e, t, n, r, i = !1, a = "vertical") {
	let o = ur(e), s = e.valAxisLogBase, c = pr(e.valMin, i) ?? (i ? t : e.valMin), l = pr(e.valMax, i) ?? (i ? n : e.valMax), u = pr(e.valAxisMajorUnit, i), d = i && !(s != null && isFinite(s) && s >= 2) && !(u != null && isFinite(u) && u > 0) ? kt(t, n, a, r) : u, f = e.valAxisMinorTickMark != null && e.valAxisMinorTickMark !== "none", p = zt({
		dataMin: t,
		dataMax: n,
		explicitMin: c,
		explicitMax: l,
		axisLenPt: r,
		axisOrientation: a,
		majorUnit: d,
		minorUnit: pr(e.valAxisMinorUnit, i),
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
function br(e, t) {
	return t && t.trim().toLowerCase() !== "general" ? oe(e, t) : re(Number(e.toPrecision(6)));
}
function xr(e, t, n) {
	if (e.labelText) return e.labelText.split(/\r?\n/);
	if (!t) return [];
	let r = e.labelFormatSourceLinked === !0 ? n : e.labelFormatCode, i = [];
	if (e.dispEq) {
		let e = t.intercept < 0 ? "−" : "+";
		i.push(`y = ${br(t.slope, r)}x ${e} ${br(Math.abs(t.intercept), r)}`);
	}
	return e.dispRSqr && i.push(`R² = ${br(t.rSquared, r)}`), i;
}
function Sr(e, t, n, r, i, o) {
	if (!i) return;
	let s = xr(t, n, o);
	if (s.length === 0) return;
	let { chart: c, chartRect: l, plotRect: u } = i, d = M(t.labelFontSizeHpt, r) ?? M(c.dataLabelFontSizeHpt, r) ?? 10 * r, f = $(c, t.labelFontFace ?? c.dataLabelFontFace, "minor"), p = t.labelFontBold ?? c.dataLabelFontBold ?? !1, m = t.labelFontItalic ?? !1;
	e.font = ln(d, f, p, m);
	let h = d * 1.2, g = t.labelFontColor ?? c.dataLabelFontColor, _ = t.labelRichRuns?.length ? Nt(e, {
		runs: t.labelRichRuns,
		ptToPx: r,
		fontFamily: f,
		fallbackBold: p,
		fallbackItalic: m,
		fallbackBaseline: t.labelFontBaseline ?? void 0,
		fallbackColorHidden: t.labelFontPaintAuthored === !0 && (t.labelFontHidden === !0 || t.labelFontColor == null),
		fontFamilyForFace: (e) => $(c, e, "minor")
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
	}, b = Ye(y, r), x = v + b.left + b.right, S = (_?.height ?? s.length * h) + b.top + b.bottom, C = pe(x, S, t.labelTextRotation ?? void 0, t.labelTextVerticalMode ?? void 0), w = Zt(l, u, C.w, C.h, d, t.labelManualLayout, i.automaticAnchor);
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
	a(e, k, O, r, i.shapeRotationDeg ?? 0);
	let A = t.labelTextAlign;
	e.textAlign = A === "r" ? "right" : A === "ctr" ? "center" : "left", e.textBaseline = "top", e.fillStyle = g ? `#${g}` : "#595959";
	let j = Math.max(0, O.w - b.left - b.right), N = Math.max(0, O.h - b.top - b.bottom), P = w.automatic && C.radians === 0 && w.w === C.w && w.h === C.h && (t.labelTextWrap == null || t.labelTextWrap === "none"), F = _ ? [] : D && !P ? Oe(s.join("\n"), j, N, h, (t) => e.measureText(t).width, y) : s;
	if (!_ && F.length === 0) {
		e.restore();
		return;
	}
	let ee = D ? e.textAlign === "right" ? O.x + O.w - b.right : e.textAlign === "center" ? O.x + (O.w + b.left - b.right) / 2 : O.x + b.left : e.textAlign === "right" ? w.x + w.w : e.textAlign === "center" ? w.x + w.w / 2 : w.x, te = (t.labelFontBaseline ?? 0) * d, I = D ? t.labelTextVerticalAnchor === "b" ? O.y + O.h - b.bottom - (_?.height ?? F.length * h) : t.labelTextVerticalAnchor === "ctr" ? O.y + (O.h - (_?.height ?? F.length * h) + b.top - b.bottom) / 2 : O.y + b.top : w.y, ne = w.automatic ? F.length : Math.min(F.length, Math.floor(N / h));
	if (C.radians !== 0 && (e.translate(T, E), e.rotate(C.radians), e.translate(-T, -E)), _) It(e, _, ee, I, e.textAlign, "top", Math.max(_.width, j));
	else if (!(t.labelFontPaintAuthored === !0 && (t.labelFontHidden === !0 || t.labelFontColor == null))) for (let t = 0; t < ne; t++) e.fillText(D && y.textWrap === "none" ? F[t] : At(e, F[t], Math.max(0, j || v)), ee, I + t * h - te);
	e.restore();
}
function Cr(e, t, n, r, i, a, o, s, c) {
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
		let l = Et(u, d, o.trendlineType, {
			period: o.period,
			order: o.order,
			intercept: o.intercept,
			forward: o.forward,
			backward: o.backward
		});
		if (l.xs.length < 2 || ![...l.xs, ...l.ys].every(Number.isFinite)) continue;
		let f = o.trendlineType === "linear" ? Bt(u, d, o.intercept) : null, p = f && [
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
				s?.clipLineToPlot && (e.save(), e.beginPath(), e.rect(s.plotRect.x, s.plotRect.y, s.plotRect.w, s.plotRect.h), e.clip()), e.strokeStyle = o.lineColor ? `#${o.lineColor}` : n, e.lineWidth = o.lineWidthEmu ? De(o.lineWidthEmu, a) : 1.5, e.setLineDash(ga(o.lineDash ?? void 0, e.lineWidth)), e.beginPath();
				for (let t = 0; t < g.length; t++) {
					let { x: n, y: r } = g[t];
					t === 0 ? e.moveTo(n, r) : e.lineTo(n, r);
				}
				e.stroke(), s?.clipLineToPlot && e.restore();
			}
			Sr(e, o, p, a, s ? {
				...s,
				automaticAnchor: g.at(-1)
			} : void 0, t.valFormatCode);
		}
	}
	e.setLineDash(f);
}
function wr(e) {
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
function Tr(e) {
	return ze(e.chartType, e.series.length, e.varyColors !== !1) || Ne(e) ? e.series : e.series.flatMap((e) => [e, ...wr([e])]);
}
function Er(e, t, n) {
	return M(e, n) ?? Math.max(8, t * .045);
}
function Dr(e, t, n, r = 0) {
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
function Or(e, t) {
	return /^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)%?$/.test(e) ? t * .15 : 0;
}
function kr(e) {
	return e.catAxisTickLabelPos !== "none";
}
var Ar = 54e5;
function jr(e) {
	let t = e.catAxisLabelRotation;
	return t == null || t === 0 || Math.abs(t) > Ar ? 0 : t / 6e4 * (Math.PI / 180);
}
function Mr(e, t, n, r, i) {
	if (i === 0) {
		e.fillText(t, n, r);
		return;
	}
	e.save(), e.translate(n, r), e.rotate(i), e.textAlign = "right", e.textBaseline = "middle", e.fillText(t, 0, 0), e.restore();
}
function Nr(e, t, n = dr(e)) {
	return e.catAxisIsDate === !0 ? Xt({
		categories: t,
		date1904: e.date1904,
		baseTimeUnit: e.catAxisBaseTimeUnit,
		majorTimeUnit: e.catAxisMajorTimeUnit,
		majorUnit: e.catAxisMajorUnit,
		minorTimeUnit: e.catAxisMinorTimeUnit,
		minorUnit: e.catAxisMinorUnit,
		explicitMin: e.catAxisMin,
		explicitMax: e.catAxisMax,
		crossBetween: fe(e),
		reversed: n
	}) : null;
}
function Pr(e, t, n, r) {
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
function Fr(e, t, n, r = "y", i = !1, a = !1, o = (e) => e.useSecondaryAxis === !0, s = () => null) {
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
			Pr(n, r, (t) => s(n, t, e) ?? n.values[t] ?? null, u);
		}
	}
	(!Number.isFinite(c) || !Number.isFinite(l)) && (c = 0, l = 1);
	let d = zt({
		dataMin: c,
		dataMax: l,
		explicitMin: pr(e.min, i),
		explicitMax: pr(e.max, i),
		axisLenPt: n,
		axisOrientation: "vertical",
		majorUnit: pr(e.majorUnit, i),
		minorUnit: pr(e.minorUnit, i),
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
function Ir(e, t, n, r, i, a, o) {
	if (!t.hidden) {
		if (e.save(), t.minorGridlines) {
			let s = ir(t, o);
			for (let t of n.minorTicks) tr(e, i, a, r(t), !1, s);
		}
		if (t.majorGridlines) {
			let s = ar(t, o);
			for (let t of n.majorLines) tr(e, i, a, r(t), !1, s);
		}
		e.restore();
	}
}
function Lr(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h = !1) {
	let g = o + c, { color: _, width: v } = ut(n.lineColor, n.lineWidthEmu, u);
	if (n.lineHidden || Qn(e, g, s, g, s + l, _, v, n.lineDash), !n.hidden) {
		e.font = `${n.fontItalic ? "italic " : ""}${n.fontBold ? "bold " : ""}${d}px ${$(t, n.fontFace, "minor")}`, e.fillStyle = n.fontColor ? `#${n.fontColor}` : p, e.textAlign = "left", e.textBaseline = "middle";
		for (let t of r.majorLines) {
			let r = i(t);
			Zn(e, n.majorTickMark, "val", g, r, _, v, !0, n.lineHidden, "major", u, n.lineDash), n.tickLabelPos !== "none" && e.fillText(gr(h ? t / 100 : t, n.formatCode ?? null, m, n.displayUnits), g + 14, r);
		}
		if (n.minorTickMark && n.minorTickMark !== "none") for (let t of r.minorTicks) Zn(e, n.minorTickMark, "val", g, i(t), _, v, !0, n.lineHidden, "minor", u, n.lineDash);
	}
	n.title && Rr(e, t, n, a, o, s, c, l, f, u);
}
function Rr(e, t, n, r, i, a, o, c, l, u) {
	if (!n.title) return;
	let d = s(n.titleFontSizeHpt, u), f = n.titleFontColor ? `#${n.titleFontColor}` : n.fontColor ? `#${n.fontColor}` : "#555";
	dn(e, n.title, i + o + l + d * .6, a + c / 2, "right", d, n.titleFontBold ?? !0, n.titleFontItalic ?? !1, f, c, $(t, n.titleFontFace, "major"), n.titleRotation, n.titleVerticalMode, n.titleManualLayout, r, mi(t, n.titleStyle ? { style: n.titleStyle } : void 0, t.chartStyleRoles?.axisTitle, J(t, "axisTitle"), !0), u);
}
function zr(e, t, n, r, i, a, o, c, l) {
	if (n.hidden || r.length === 0) return;
	let { color: u, width: d } = ut(n.lineColor, n.lineWidthEmu, l);
	n.lineHidden || Qn(e, a, o, a + c, o, u, d, n.lineDash);
	let f = n.orientation === "maxMin", h = Math.max(1, Math.floor(n.tickLabelSkip ?? 1)), g = Math.max(1, Math.floor(n.tickMarkSkip ?? 1)), _ = r.length, v = (e) => ae(e, _, fe(t), f, n.labelAlignment);
	if (!n.lineHidden && n.majorTickMark !== "none") {
		let r = fe(t), i = r ? _ : _ - 1;
		for (let t = 0; t <= i; t += g) {
			let s = f ? i - t : t, p = r ? s / _ : _ === 1 ? .5 : s / (_ - 1);
			Zn(e, n.majorTickMark, "cat", o, a + p * c, u, d, !0, n.lineHidden, "major", l, n.lineDash);
		}
	}
	let y = M(n.fontSizeHpt, l) ?? 9 * l;
	if (n.tickLabelPos !== "none") {
		e.font = ln(y, $(t, n.fontFace, "minor"), n.fontBold ?? !1, n.fontItalic ?? !1), e.fillStyle = n.fontColor ? `#${n.fontColor}` : "#555", e.textBaseline = "bottom";
		let i = Math.max(1, c / _ - 4), s = m(Re(y), n.labelOffsetPercent);
		for (let l = 0; l < _; l += h) {
			let u = v(l);
			e.textAlign = u.textAlign, e.fillText(At(e, p(r[l], n.formatCode, t.date1904), i), a + u.fraction * c, o - s);
		}
	}
	if (n.title) {
		let r = s(n.titleFontSizeHpt, l);
		dn(e, n.title, a + c / 2, o - (n.tickLabelPos === "none" ? 0 : y + m(Re(y), n.labelOffsetPercent)) - r / 2 - 4, "horizontal", r, n.titleFontBold ?? !0, n.titleFontItalic ?? !1, n.titleFontColor ? `#${n.titleFontColor}` : "#555", c, $(t, n.titleFontFace, "major"), n.titleRotation, n.titleVerticalMode, n.titleManualLayout, i, mi(t, n.titleStyle ? { style: n.titleStyle } : void 0, t.chartStyleRoles?.axisTitle, J(t, "axisTitle"), !0), l);
	}
}
function Br(e, t, n) {
	let r = n / (e.titleFontSizeHpt != null && e.titleFontSizeHpt >= 100 && e.titleFontSizeHpt <= 4e5 ? e.titleFontSizeHpt / 100 : 14), i = M(t.fontSizeHpt, r) ?? n, a = cn(e, t.fontFace ?? e.titleFontFace);
	return {
		font: ln(i, a ? `"${a}", Calibri, Arial, sans-serif` : "Calibri, Arial, sans-serif", t.bold ?? e.titleFontBold ?? !1, t.italic ?? e.titleFontItalic ?? !1),
		fontSize: i,
		color: t.colorPaintAuthored === !0 ? t.colorHidden === !0 || !t.color ? "transparent" : `#${t.color}` : t.color ? `#${t.color}` : e.titleFontPaintAuthored === !0 ? e.titleFontColor ? `#${e.titleFontColor}` : "transparent" : e.titleFontColor ? `#${e.titleFontColor}` : "#333"
	};
}
function Vr(e, t, n, r) {
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
		let i = Br(t, a, r);
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
function Hr(e, t, n, r, i) {
	let a = l(t, r, i);
	if (a.bandH === 0 || !t.titleRichRuns?.length) return a;
	let o = e.font, s = Vr(e, t, Math.max(1, n), a.fontPx);
	e.font = o;
	let c = s.reduce((e, t) => e + t.height, 0);
	return {
		...a,
		bandH: a.topPad + c + a.bottomPad
	};
}
function Ur(e, t, n, r, i, o) {
	if (!t.title) return;
	let s = mi(t, t.titleStyle ? { style: t.titleStyle } : void 0, t.chartStyleRoles?.title, J(t, "title"), !0), c = o / Math.max(1, (t.titleFontSizeHpt ?? 1400) / 100);
	if (!t.titleRichRuns?.length) {
		let l = cn(t, t.titleFontFace);
		e.font = ln(o, l ? `"${l}", Calibri, Arial, sans-serif` : "Calibri, Arial, sans-serif", t.titleFontBold ?? !0, t.titleFontItalic ?? !1), e.fillStyle = t.titleFontColor ? `#${t.titleFontColor}` : "#333", e.textAlign = "center", e.textBaseline = "top";
		let u = Math.min(i, e.measureText(t.title).width);
		a(e, s, {
			x: n + (i - u) / 2,
			y: r,
			w: u,
			h: o * 1.2
		}, c), e.fillText(t.title, n + i / 2, r);
		return;
	}
	e.save();
	let l = Vr(e, t, Math.max(1, i), o), u = Math.min(i, Math.max(...l.map((e) => e.width), 0)), d = l.reduce((e, t) => e + t.height, 0);
	a(e, s, {
		x: n + (i - u) / 2,
		y: r,
		w: u,
		h: d
	}, c), e.textAlign = "left", e.textBaseline = "top";
	let f = r;
	for (let t of l) {
		let r = n + (i - t.width) / 2;
		for (let n of t.pieces) e.font = n.font, e.fillStyle = n.color, e.fillText(n.text, r, f), r += n.width;
		f += t.height;
	}
	e.restore();
}
function Wr(e, t, n, r, i, a, o, s) {
	if (!t.title) return;
	let c = t.titleManualLayout;
	if (c) {
		let l = cn(t, t.titleFontFace);
		e.font = ln(s, l ? `"${l}", Calibri, Arial, sans-serif` : "Calibri, Arial, sans-serif", t.titleFontBold ?? !0, t.titleFontItalic ?? !1);
		let u = Vr(e, t, Math.max(1, i), s), d = Math.min(i, Math.max(...u.map((e) => e.width), 0)), f = {
			x: n + (i - d) / 2,
			y: o,
			w: d,
			h: s
		}, p = ee({
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
			Ur(e, t, p.x, p.y, p.w, s);
			return;
		}
	}
	Ur(e, t, n, o, i, s);
}
function Gr(e) {
	if (e.categories.length > 0) return e.categories;
	let t = e.series[0];
	if (t?.categories && t.categories.length > 0) return t.categories;
	let n = 0;
	for (let t of e.series) t.values.length > n && (n = t.values.length);
	return n > 0 ? Array.from({ length: n }, (e, t) => String(t + 1)) : [];
}
function Kr(e, t) {
	let n = Math.max(e.x, t.x), r = Math.max(e.y, t.y), i = Math.min(e.x + e.w, t.x + t.w), a = Math.min(e.y + e.h, t.y + t.h);
	return i > n && a > r ? {
		x: n,
		y: r,
		w: i - n,
		h: a - r
	} : null;
}
function qr(e, t, n) {
	return e.showDataLabelsOverMax === !0 || !Number.isFinite(n) || t <= n;
}
function Jr(e, t, n, r, i, a, o, s, c, l, u, d, f, p = !1, m, h, g, _ = 1, v, y = 0) {
	fa(e, t, {
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
function Yr(e) {
	return 7 * e;
}
function Xr(t, r, a, o, c = {}, l = 0) {
	let { x: u, y: h, w: v, h: y } = a, b = r.chartType === "clusteredBarH" || r.chartType === "stackedBarH" || r.chartType === "stackedBarHPct", w = r.chartType.startsWith("stacked"), T = r.chartType === "stackedBarPct" || r.chartType === "stackedBarHPct", E = r.series.filter((e) => e.seriesType !== "line" && e.seriesType !== "scatter" && e.seriesType !== "area"), D = (e) => e.barGroupDirection == null ? b : e.barGroupDirection === "bar", O = E, A = (e) => e.useSecondaryAxis === !0 ? "secondary-default" : "primary-default", F = (e) => e.barGroupIndex == null ? A(e) : `group-${e.barGroupIndex}`, ee = (e) => e.barGroupGrouping ?? (T ? "percentStacked" : w ? "stacked" : "clustered"), te = (e) => {
		let t = ee(e);
		return t === "stacked" || t === "percentStacked";
	}, ne = (e) => ee(e) === "percentStacked", L = r.series.filter((e) => e.seriesType === "line"), re = r.series.filter((e) => e.seriesType === "area"), R = r.series.filter((e) => e.seriesType === "scatter"), z = new Map(r.series.map((e, t) => [e, t])), ie = /* @__PURE__ */ new Map();
	for (let e of r.plotGroups ?? []) for (let t = e.seriesStart; t < e.seriesStart + e.seriesCount; t++) {
		let n = r.series[t];
		n && ie.set(n, e);
	}
	let B = /* @__PURE__ */ new Map();
	for (let e of r.plotGroups ?? []) {
		if (e.seriesCount === 0) continue;
		let t = B.get(e.valueAxis) ?? {
			count: 0,
			percentCount: 0
		};
		t.count++, e.grouping === "percentStacked" && t.percentCount++, B.set(e.valueAxis, t);
	}
	let oe = (e) => {
		let t = B.get(e.valueAxis);
		return t != null && t.count === t.percentCount;
	}, se = kn(r, o), ce = r.series.some((e) => e.useSecondaryAxis === !0), H = !b && r.secondaryValAxis && ce ? r.secondaryValAxis : null, U = H ? O.filter((e) => e.useSecondaryAxis === !0) : [], le = H ? O.filter((e) => e.useSecondaryAxis !== !0) : O, ue = U.length > 0 ? r.secondaryCatAxis : null, de = U[0]?.categories?.length ? U[0].categories : r.categories, pe = Gr(r), W = pe.length;
	if (W === 0) return;
	let me = /* @__PURE__ */ new Map();
	for (let e of O) {
		let t = F(e), n = me.get(t);
		n ? n.push(e) : me.set(t, [e]);
	}
	let he = (e) => me.get(F(e)) ?? [e], ge = /* @__PURE__ */ new Map();
	for (let [e, t] of me) {
		let n = Array(W).fill(0);
		for (let e of t) for (let t = 0; t < W; t++) n[t] += Math.abs(e.values[t] ?? 0);
		ge.set(e, n);
	}
	let _e = (e, t) => ge.get(F(e))?.[t] || 1, ve = (e) => {
		let t = ie.get(e);
		return t == null || oe(t) ? 100 : 1;
	}, ye = (e, t) => ne(e) ? ve(e) / _e(e, t) : 1, be = /* @__PURE__ */ new Map(), xe = /* @__PURE__ */ new Map();
	for (let e of [...L, ...re]) be.set(e, Array.from({ length: W }, (t, n) => e.values[n] ?? 0)), xe.set(e, Array(W).fill(0));
	for (let e of r.plotGroups ?? []) {
		if (e.kind !== "line" && e.kind !== "area") continue;
		let t = r.series.slice(e.seriesStart, e.seriesStart + e.seriesCount), n = e.grouping === "stacked" || e.grouping === "percentStacked", i = e.grouping === "percentStacked", a = i && oe(e) ? 100 : 1;
		for (let e = 0; e < W; e++) {
			let r = i && t.reduce((t, n) => t + Math.abs(n.values[e] ?? 0), 0) || 1, o = 0;
			for (let s of t) {
				let t = s.values[e] ?? 0, c = i ? t / r * a : t, l = xe.get(s), u = be.get(s);
				l == null || u == null || (l[e] = n ? o : 0, o = n ? o + c : c, u[e] = o);
			}
		}
	}
	let Ce = (e, t) => be.get(e)?.[t] ?? e.values[t] ?? 0, we = (e, t) => xe.get(e)?.[t] ?? 0, Te = (e) => ne(e) ? (e.errBars ?? []).map((t) => ({
		...t,
		plus: t.plus.map((t, n) => t == null ? t : t * ye(e, n)),
		minus: t.minus.map((t, n) => t == null ? t : t * ye(e, n))
	})) : e.errBars ?? [], Ee = (e) => {
		let t = ie.get(e);
		return t?.kind === "bar" || t?.kind === "bar3D" ? t.seriesCount === 1 && t.varyColors === !0 : Ne(r);
	}, Oe = O.map((e) => new Map((e.dataPointOverrides ?? []).map((e) => [e.idx, e]))), G = O.map((e) => new Map((e.dataLabelOverrides ?? []).map((e) => [e.idx, e]))), ke = O.map((e, t) => xa(e, t)), K = r.classicChartStyleRoles == null && (r.chartexDataPointStyle != null || r.chartexColorPalette != null), Ae = /* @__PURE__ */ new Map();
	K && O.forEach((e, t) => {
		let n = ke[t], i = e.color ?? Ta(r, n, O.length, e.chartexStyle);
		Ae.set(e, Ia(r, e.name, e, r.chartexDataPointStyle, n, O.length, i));
	});
	let je = O.findIndex(Ee), Me = je >= 0 ? O[je] : void 0, Fe = {
		...r,
		series: (K ? O : r.series).map((e) => Ae.get(e) ?? e)
	}, Le = Hr(t, r, v, y, o), ze = Le.fontPx, Be = Le.topPad, q = Le.bandH, Ve = Er(r.catAxisFontSizeHpt, y, o), He = Er(r.valAxisFontSizeHpt, y, o), Ue = !b && !mn(r) && r.catAxisNoMultiLevelLabels !== !0 && (r.categoryLevels?.length ?? 0) > 1 ? r.categoryLevels : null, We = Ue ? (Ue.length - 1) * (Ve + 4) : 0, Ge = mn(r), Ke = gn(r, o), qe = _n(t, r, o), Je = Kn(t, Fe, v, y, .22, o), { legRightW: Ye, legLeftW: Xe, legTopH: Y, legBottomH: Qe } = Ie(Je, r.legendOverlay === !0), $e = i(r, v, y, o), et = $e.catFontPx, tt = $e.valFontPx, it = b ? r.valAxisTitle ? tt + pt(y) + 4 : 0 : $e.catBandH, at = b ? r.catAxisTitle ? et + pt(v) + 4 : 0 : $e.valBandW, ot = M(ue?.fontSizeHpt, o) ?? 9 * o, st = ue && !ue.hidden && ue.tickLabelPos !== "none" ? ot + m(Re(ot), ue.labelOffsetPercent) + 2 : 0, ct = ue?.title ? s(ue.titleFontSizeHpt, o) + 6 : 0, dt = q + Y + He / 2 + 2 + st + ct, ft = b ? (r.valAxisHidden ? y * .02 : j(He)) + Ke + it + Qe : (Ge ? 0 : j(Ve, r.catAxisLabelOffsetPercent, r.cartesianAutoLayoutProfile)) + We + Ke + it + Qe, mt = y - dt - ft, ht = 0;
	if (b && !r.catAxisHidden && kr(r)) {
		let e = r.catAxisFontSizeHpt == null ? Math.max(8, Math.min(11, mt / W * .5)) : Ve;
		t.save(), t.font = ln(e, $(r, r.catAxisFontFace, "minor"), r.catAxisFontBold ?? !1, r.catAxisFontItalic ?? !1);
		for (let e of pe) ht = Math.max(ht, t.measureText(p(e, r.catAxisFormatCode, r.date1904)).width);
		t.restore(), ht += m(r.catAxisFontSizeHpt == null ? 4 : yt(e), r.catAxisLabelOffsetPercent) + I * o;
	}
	let gt = Math.min(ht, Math.max(0, v / 2 - at - Xe)), _t = b ? v - ((r.catAxisHidden ? v * .03 : gt) + at + Xe) - (Ye + v * .03) : 0, bt = r.valAxisHidden ? void 0 : (b ? _t : mt) / o, xt = (e, t) => {
		let n = O[e], r = n?.values[t] ?? 0;
		if (!n || !te(n)) return r;
		let i = he(n), a = ne(n), o = 1;
		a && (o = i.reduce((e, n) => e + Math.abs(n.values[t] ?? 0), 0) || 1);
		let s = a ? ye(n, t) * o : 1, c = a ? r / o * s : r, l = 0, u = i.indexOf(n);
		for (let e = 0; e <= u; e++) {
			let n = i[e]?.values[t] ?? 0, r = a ? n / o * s : n;
			c < 0 == r < 0 && (l += r);
		}
		return l;
	}, St = (r.plotGroups ?? []).filter((e) => e.seriesCount > 0 && e.valueAxis !== "secondary"), Ct = St.length > 0 ? St.every((e) => e.grouping === "percentStacked") : le.some(ne), wt = 0, Tt = 0;
	for (let e = 0; e < W; e++) {
		let t = /* @__PURE__ */ new Map();
		for (let e of le) {
			let n = F(e), r = t.get(n);
			r ? r.push(e) : t.set(n, [e]);
		}
		for (let n of t.values()) {
			let t = n[0], r = te(t), i = ne(t), a = i && n.reduce((t, n) => t + Math.abs(n.values[e] ?? 0), 0) || 1, o = 0, s = 0;
			for (let t of n) {
				let n = t.values[e] ?? 0, c = i ? n / a * ve(t) : n;
				r ? c >= 0 ? o += c : s += c : (wt = Math.max(wt, c), Tt = Math.min(Tt, c));
			}
			r && (wt = Math.max(wt, o), Tt = Math.min(Tt, s));
		}
	}
	for (let e of [...L, ...re]) if (!(H && e.useSecondaryAxis === !0)) for (let t = 0; t < W; t++) {
		if (e.values[t] == null) continue;
		let n = Ce(e, t);
		wt = Math.max(wt, n), Tt = Math.min(Tt, n);
	}
	for (let e of le) {
		let t = O.indexOf(e);
		for (let n of Te(e)) Pr({
			...e,
			errBars: [n]
		}, b ? "x" : "y", (n) => e.values[n] == null ? null : xt(t, n), (e) => {
			wt = Math.max(wt, e), Tt = Math.min(Tt, e);
		});
	}
	for (let e of [...L, ...re]) H && e.useSecondaryAxis === !0 || Pr(e, "y", (t) => e.values[t] ?? null, (e) => {
		let t = e;
		wt = Math.max(wt, t), Tt = Math.min(Tt, t);
	});
	Ct && (le.some((e) => e.values.some((e) => e != null && e > 0)) && (wt = Math.max(wt, 100)), le.some((e) => e.values.some((e) => e != null && e < 0)) && (Tt = Math.min(Tt, -100))), r.valMax != null && (wt = Ct ? r.valMax * 100 : r.valMax), r.valMin != null && (Tt = Ct ? r.valMin * 100 : r.valMin), wt === 0 && Tt === 0 && (wt = 1);
	let Et = yr(r, Tt, wt, bt, Ct, b ? "horizontal" : "vertical"), { step: Dt } = Et, Ot = new Set(O), kt = new Set(E), jt = (r.plotGroups ?? []).filter((e) => e.seriesCount > 0 && e.valueAxis === "secondary"), Mt = jt.length > 0 ? jt.every((e) => e.grouping === "percentStacked") : U.some(ne), Nt = r.series.filter((e) => !kt.has(e) || Ot.has(e)).map((e) => {
		if (e.useSecondaryAxis !== !0) return e;
		if (Ot.has(e)) {
			let t = O.indexOf(e);
			return {
				...e,
				values: e.values.map((e, n) => e == null ? e : xt(t, n)),
				errBars: Te(e)
			};
		}
		return Mt ? {
			...e,
			values: e.values.map((e) => e == null ? e : e * 100),
			errBars: (e.errBars ?? []).map((e) => ({
				...e,
				plus: e.plus.map((e) => e == null ? e : e * 100),
				minus: e.minus.map((e) => e == null ? e : e * 100)
			}))
		} : e;
	});
	if (Mt && U[0]) {
		let e = [];
		U.some((e) => e.values.some((e) => e != null && e > 0)) && e.push(100), U.some((e) => e.values.some((e) => e != null && e < 0)) && e.push(-100), Nt.push({
			...U[0],
			values: e,
			errBars: []
		});
	}
	let Pt = Fr(H, Nt, mt / o, b ? "x" : "y", Mt, U.length > 0), Ft = Math.max(8, Math.min(11, y / 20)), It = r.valAxisFontSizeHpt == null ? Math.max(8, Math.min(11, mt / 20)) : He, Lt = t.font, Rt = 0, Bt = 0;
	if (!b && !r.valAxisHidden) {
		t.font = ln(It, $(r, r.valAxisFontFace, "minor"), r.valAxisFontBold ?? !1, r.valAxisFontItalic ?? !1);
		let e = 0;
		for (let n of Et.majorLines) {
			let i = mr(r, n, Ct);
			e = Math.max(e, t.measureText(i).width);
		}
		Rt = e, Bt = Rt + 16;
	}
	let Ht = M(H?.fontSizeHpt, o) ?? Ft, Ut = 0;
	if (H && !H.hidden) {
		t.font = `${Ht}px ${$(r, H.fontFace, "minor")}`;
		let e = 0;
		for (let n of Pt?.majorLines ?? []) e = Math.max(e, t.measureText(gr(Mt ? n / 100 : n, H.formatCode ?? null, r.date1904, H.displayUnits)).width);
		Ut = e + 18;
	}
	t.font = Lt;
	let Wt = H && H.title ? s(H.titleFontSizeHpt, o) + 8 : 0, Gt = {
		t: dt,
		r: Ye + v * .03 + Ut + Wt,
		b: ft,
		l: b ? Xe + Math.max((r.catAxisHidden ? v * .03 : gt) + at, qe) : Xe + Math.max(at + Bt, qe)
	};
	Gt.t = Xn(r, Je, u, h, v, y, q, Gt.t);
	let Kt = b ? {
		t: 0,
		r: r.valAxisHidden ? 0 : It / 2,
		b: r.valAxisHidden ? 0 : It + it,
		l: r.catAxisHidden ? 0 : ht + at
	} : k({
		valAxisHidden: r.valAxisHidden,
		catAxisHidden: r.catAxisHidden,
		valLabelWidth: Rt,
		valLabelFontPx: It,
		catLabelFontPx: Ve,
		valLabelGapPx: r.valAxisFontSizeHpt == null ? 12 : yt(It),
		catLabelGapPx: r.catAxisFontSizeHpt == null ? m(3, r.catAxisLabelOffsetPercent) : m(Re(Ve), r.catAxisLabelOffsetPercent),
		outerTextMarginPx: I * o,
		valTitleBandW: at,
		catTitleBandH: it,
		secondaryBandW: Ut + Wt
	}), qt = _(r, u, h, v, y, o, {
		titleBand: Le,
		legendSideReserveFrac: .22,
		legendReserve: Je,
		pad: Gt,
		honorPlotAreaManualLayout: !0,
		manualOuterInsets: Kt
	}), Jt = Hr(t, r, qt.plotRect.pw, y, o);
	Math.abs(Jt.bandH - Le.bandH) > .01 && (Le = Jt, ze = Le.fontPx, Be = Le.topPad, q = Le.bandH, dt = q + Y + He / 2 + 2 + st + ct, Gt.t = Xn(r, Je, u, h, v, y, q, dt), qt = _(r, u, h, v, y, o, {
		titleBand: Le,
		legendSideReserveFrac: .22,
		legendReserve: Je,
		pad: Gt,
		honorPlotAreaManualLayout: !0,
		manualOuterInsets: Kt
	}));
	let { px0: X, py0: Z, pw: Yt } = qt.plotRect, { ph: Q } = qt.plotRect;
	if (Wr(t, r, r.titleManualLayout || !r.titleRichRuns?.length ? u : X, h, r.titleManualLayout || !r.titleRichRuns?.length ? v : Yt, y, h + Be, ze), Yt <= 0 || Q <= 0) return;
	let Xt = Nr(r, pe, b ? !dr(r) : dr(r)), Zt = jr(r), Qt = [], $t = 0;
	if (!Ge && !b && !Xt && !r.catAxisHidden && kr(r) && Zt === 0) {
		let e = Yt / W, n = r.catAxisFontSizeHpt == null ? Math.max(8, Math.min(11, e * .5)) : Ve;
		t.save(), t.font = ln(n, $(r, r.catAxisFontFace, "minor"), r.catAxisFontBold ?? !1, r.catAxisFontItalic ?? !1);
		for (let i of pe) {
			let a = p(i, r.catAxisFormatCode, r.date1904);
			Qt.push(Dr(t, a, Math.max(1, e), Or(a, n)));
		}
		t.restore();
		let i = Math.max(1, ...Qt.map((e) => e.length));
		!(r.plotAreaManualLayout?.layoutTarget === "inner" && r.plotAreaManualLayout.w != null && r.plotAreaManualLayout.h != null) && i > 1 && ($t = (i - 1) * (n + 2), Q = Math.max(1, Q - $t));
	}
	let rn = Ge ? vn(t, r, Yt / W, o) : null;
	rn && rn.totalHeight > Ke && (Q = Math.max(1, Q - (rn.totalHeight - Ke))), rt(t, r, X, Z, Yt, Q, o, l);
	let sn = (e) => Z + Q - Et.frac(e) * Q, cn = (e) => X + Et.frac(e) * Yt, un = sn(0), dn = cn(0), fn = (e) => sn(e), hn = Pt ? Pt.makeToY(Z, Q) : sn, bn = (e) => hn(e), xn = nr(r, o);
	t.textBaseline = "middle";
	let Sn = r.valAxisFontSizeHpt == null ? Math.max(8, Math.min(11, Q / 20)) : He;
	t.font = ln(Sn, $(r, r.valAxisFontFace, "minor"), r.valAxisFontBold ?? !1, r.valAxisFontItalic ?? !1);
	let Cn = r.valAxisFontColor ? `#${r.valAxisFontColor}` : "#555";
	if (t.fillStyle = Cn, !r.valAxisHidden) {
		let e = rr(r, o);
		for (let n of Et.minorLines) if (!b) tr(t, X, Yt, sn(n), !1, e);
		else {
			let r = cn(n);
			t.strokeStyle = e.color, t.lineWidth = e.width;
			let i = e.dash.length > 0 && t.getLineDash ? t.getLineDash() : [];
			e.dash.length > 0 && t.setLineDash(e.dash), t.beginPath(), t.moveTo(r, Z), t.lineTo(r, Z + Q), t.stroke(), e.dash.length > 0 && t.setLineDash(i);
		}
		let n = fr(r), i = r.valAxisTickLabelPos !== "none";
		for (let e of Et.majorLines) {
			let a = Math.abs(e) < Dt * 1e-9, s = mr(r, e, Ct);
			if (b) {
				let o = cn(e);
				if (n) {
					t.strokeStyle = xn.explicit ? xn.color : a ? "#aaa" : xn.color, t.lineWidth = xn.explicit ? xn.width : a ? 1 : xn.width;
					let e = xn.dash.length > 0 && t.getLineDash ? t.getLineDash() : [];
					xn.dash.length > 0 && t.setLineDash(xn.dash), t.beginPath(), t.moveTo(o, Z), t.lineTo(o, Z + Q), t.stroke(), xn.dash.length > 0 && t.setLineDash(e);
				}
				if (i) {
					t.textAlign = "center";
					let e = r.valAxisFontSizeHpt == null ? 10 : Re(Sn);
					t.fillText(s, o, Z + Q + e);
				}
			} else {
				let l = sn(e);
				if (n && tr(t, X, Yt, l, a, xn), i) {
					t.textAlign = "right";
					let e = c.gapPolicy === "chartex" ? Yr(o) : r.valAxisFontSizeHpt == null ? 12 : yt(Sn);
					t.fillText(s, X - e, l);
				}
			}
		}
	}
	if (H && Pt && Ir(t, H, Pt, hn, X, Yt, o), !r.catAxisHidden && or(r)) {
		let e = sr(r, o);
		t.strokeStyle = e.color, t.lineWidth = e.width;
		let n = e.dash.length > 0 && t.getLineDash ? t.getLineDash() : [];
		e.dash.length > 0 && t.setLineDash(e.dash);
		let i = Xt ? Xt.majorTicks.map((e) => e.fraction) : lr(r, W);
		for (let e of i) {
			if (t.beginPath(), b) {
				let n = Z + e * Q;
				t.moveTo(X, n), t.lineTo(X + Yt, n);
			} else {
				let n = X + e * Yt;
				t.moveTo(n, Z), t.lineTo(n, Z + Q);
			}
			t.stroke();
		}
		e.dash.length > 0 && t.setLineDash(n);
	}
	let { color: wn, width: Tn } = ut(r.catAxisLineColor, r.catAxisLineWidthEmu, o), { color: En, width: Dn } = ut(r.valAxisLineColor, r.valAxisLineWidthEmu, o), On = !r.catAxisHidden && !r.catAxisLineHidden, An = !r.valAxisHidden && !r.valAxisLineHidden && r.valAxisLineColor != null, jn = Oi(r, Et.min, Et.max), Mn = b ? Z + Q : sn(jn), Nn = b ? cn(jn) : X, Pn = !b && (r.catAxisTickLabelPos ?? "nextTo") === "nextTo" ? Mn : Z + Q, Fn = Math.max(1, Math.floor(r.catAxisTickMarkSkip ?? 1)), In = !b && Ue != null && Xt == null && !r.catAxisLineHidden && fe(r) && Math.abs(Pn - Mn) < .01, Ln = () => {
		if (b ? (On && Qn(t, Nn, Z, Nn, Z + Q, wn, Tn, r.catAxisLineDash), An && Qn(t, X, Z + Q, X + Yt, Z + Q, En, Dn, r.valAxisLineDash)) : (On && Qn(t, X, Mn, X + Yt, Mn, wn, Tn, r.catAxisLineDash), An && Qn(t, X, Z, X, Z + Q, En, Dn, r.valAxisLineDash)), !r.valAxisHidden && r.valAxisMajorTickMark && r.valAxisMajorTickMark !== "none") for (let e of Et.majorLines) b ? Zn(t, r.valAxisMajorTickMark, "cat", Z + Q, cn(e), En, Dn, !1, r.valAxisLineHidden, "major", o, r.valAxisLineDash) : Zn(t, r.valAxisMajorTickMark, "val", X, sn(e), En, Dn, !1, r.valAxisLineHidden, "major", o, r.valAxisLineDash);
		if (!r.valAxisHidden && r.valAxisMinorTickMark && r.valAxisMinorTickMark !== "none") for (let e of Et.minorTicks) b ? Zn(t, r.valAxisMinorTickMark, "cat", Z + Q, cn(e), En, Dn, !1, r.valAxisLineHidden, "minor", o, r.valAxisLineDash) : Zn(t, r.valAxisMinorTickMark, "val", X, sn(e), En, Dn, !1, r.valAxisLineHidden, "minor", o, r.valAxisLineDash);
		if (!r.catAxisHidden && r.catAxisMajorTickMark && r.catAxisMajorTickMark !== "none") {
			let e = In ? [] : lr(r, W), n = Xt ? Xt.majorTicks.map((e) => e.fraction) : e.filter((e, t) => t % Fn === 0);
			for (let e of n) b ? Zn(t, r.catAxisMajorTickMark, "val", Nn, Z + e * Q, wn, Tn, !1, r.catAxisLineHidden, "major", o, r.catAxisLineDash) : Zn(t, r.catAxisMajorTickMark, "cat", Mn, X + e * Yt, wn, Tn, !1, r.catAxisLineHidden, "major", o, r.catAxisLineDash);
		}
		if (!r.catAxisHidden && r.catAxisMinorTickMark && r.catAxisMinorTickMark !== "none") {
			let e = fe(r) ? Array.from({ length: W }, (e, t) => (t + .5) / W) : Array.from({ length: Math.max(0, W - 1) }, (e, t) => (t + .5) / (W - 1)), n = Xt ? Xt.minorTicks.map((e) => e.fraction) : e;
			for (let e of n) b ? Zn(t, r.catAxisMinorTickMark, "val", Nn, Z + e * Q, wn, Tn, !1, r.catAxisLineHidden, "minor", o, r.catAxisLineDash) : Zn(t, r.catAxisMinorTickMark, "cat", Mn, X + e * Yt, wn, Tn, !1, r.catAxisLineHidden, "minor", o, r.catAxisLineDash);
		}
	}, Rn = (e) => e ? Q / W : Yt / W, zn = Rn(b), Bn = dr(r), Vn = (e, t) => t ? Bn ? e : W - 1 - e : Bn ? W - 1 - e : e, Hn = (e, t = b) => Xt ? Xt.categoryBandFractions[e] * (t ? Q : Yt) : Rn(t), Un = (e, t = b) => Xt ? (t ? Z : X) + Xt.positions[e] * (t ? Q : Yt) - Hn(e, t) / 2 : (t ? Z : X) + Vn(e, t) * Rn(t), Wn = (e) => Xt ? X + Xt.positions[e] * Yt : X + Vn(e, !1) * Rn(!1) + Rn(!1) / 2, Gn = (e, t) => {
		let n = e[0], i = n ? te(n) : w, a = i ? 1 : Math.max(1, e.length), o = n?.barGroupOverlap ?? r.barOverlap ?? 0, s = i || !Number.isFinite(o) ? 0 : Math.max(-100, Math.min(100, o)), l = d(n?.barGroupGapWidth ?? r.barGapWidth, c.gapPolicy ?? "legacy"), u = t / (1 + (a - 1) * (1 - s / 100) + l / 100), f = i ? 0 : u * (1 - s / 100);
		return {
			barW: u,
			clusterGap: f,
			catStart: (t - (u + (a - 1) * f)) / 2
		};
	}, qn = (r.barGroupDecorations ?? []).some((e) => e.seriesLines?.length === 1) ? O.map(() => Array(W).fill(null)) : null;
	for (let e = 0; e < re.length; e++) {
		let i = re[e], a = tn(i.dataPointOverrides), s = z.get(i) ?? e, c = xa(i, s), u = en(s, i), d = S(r, i, void 0, c), p = H && i.useSecondaryAxis === !0 ? bn : fn, m = r.dispBlanksAs ?? "zero", h = [], g = () => {
			if (h.length !== 0) {
				Xt && (t.save(), t.beginPath(), t.rect(X, Z, Yt, Q), t.clip()), t.beginPath(), t.moveTo(h[0].x, h[0].baseY), t.lineTo(h[0].x, h[0].y), ha(t, h, !1);
				for (let e = h.length - 1; e >= 0; e--) t.lineTo(h[e].x, h[e].baseY);
				t.closePath(), ja(t, d, {
					x: h[0].x,
					y: Z,
					w: Math.max(1, h[h.length - 1].x - h[0].x),
					h: Q
				}, u, o, l), an(t, r, "dataPoint", i, void 0, c, u, 1.5, o, {
					x: X,
					y: Z,
					w: Yt,
					h: Q
				}, l) && t.stroke(), Xt && t.restore(), h = [];
			}
		};
		for (let e = 0; e < W; e++) {
			if (i.sourceHidden?.[e] === !0) {
				g();
				continue;
			}
			i.values[e] == null && (m === "gap" && g(), m !== "zero") || h.push({
				x: Wn(e),
				y: p(Ce(i, e)),
				baseY: p(we(i, e))
			});
		}
		g();
		let _ = aa(r, i, s), v = (i.showMarker === !0 || n(i)) && i.markerSymbol !== "none";
		if (v || C(i)) {
			let e = Math.max(2, 2.5 * o);
			for (let n = 0; n < W; n++) {
				if (i.sourceHidden?.[n] === !0 || i.values[n] == null) continue;
				let s = a.get(n), c = f(i, s, "circle", v);
				if (c === "none") continue;
				let d = Wn(n), m = p(Ce(i, n));
				if (_ || P(s)) {
					let e = s?.markerLineWidthEmu ?? i.markerLineWidthEmu;
					ia(t, r, i, s, n, d, m, c, s?.markerSize ?? i.markerSize ?? 5, Ze(i, s, n, u), s?.markerLine ?? i.markerLine ?? null, o, e == null ? void 0 : De(e, o), x(i, s, n), l);
				} else t.fillStyle = u, t.beginPath(), t.arc(d, m, e, 0, Math.PI * 2), t.fill();
			}
		}
	}
	for (let n = 0; n < W; n++) {
		let i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
		for (let s = 0; s < O.length; s++) {
			let c = O[s], d = D(c), f = Hn(n, d), p = H != null && c.useSecondaryAxis === !0, m = he(c), _ = F(c), b = te(c), x = ne(c), C = x && m.reduce((e, t) => e + Math.abs(t.values[n] ?? 0), 0) || 1, w = i.get(_) ?? 0, T = a.get(_) ?? 0, E = Math.max(0, m.indexOf(c)), { barW: k, clusterGap: A, catStart: j } = Gn(m, f), P = p && Pt ? Pt.makeToY(Z, Q) : sn, ee = Pt ? ue?.crossesAt != null && Number.isFinite(ue.crossesAt) ? Math.max(Pt.min, Math.min(Pt.max, ue.crossesAt)) : ue?.crosses === "max" ? Pt.max : ue?.crosses === "min" ? Pt.min : Math.max(Pt.min, Math.min(Pt.max, 0)) : 0, I = p ? P(ee) : un, L = c.values[n] ?? 0, re = x ? L / C * ve(c) : L, R = re < 0, ie = p && Pt ? Pt.max : Et.max, ae = R && (c.invertIfNegative === !0 || c.automaticNegativeStyle === !0), B = Oe[s].get(n), oe = B?.color ?? c.dataPointColors?.[n], ce = Ee(c), U = ce ? n : ke[s], le = S(r, c, B, U, n), de = le?.fillType === "solid" ? le.color.startsWith("#") ? le.color : `#${le.color}` : oe ? `#${oe}` : ce ? nn(n, c) : en(s, c), fe = ae ? c.automaticNegativeStyle === !0 || c.invertedFillHidden === !0 ? null : c.invertedFill : void 0, W = J(r, "dataPoint"), me = V(B?.chartexStyle, W, U), ge = B?.fillHidden === !0 ? N(W) : void 0, _e = me !== void 0 || ge !== void 0 || B?.color != null || fe === void 0 ? le : fe, ye = (e) => {
				if (B?.lineHidden != null || B?.lineColor != null || B?.lineWidthEmu != null || B?.lineDash != null || B?.chartexStyle?.linePaintAuthored === !0 || B?.chartexStyle?.lineHidden === !0) return an(e, r, "dataPoint", c, B, U, de, 1, o, {
					x: X,
					y: Z,
					w: Yt,
					h: Q
				}, l, !1);
				if (ae && (c.invertedLineHidden != null || c.invertedLineColor != null || c.invertedLineWidthEmu != null)) return c.invertedLineHidden ? !1 : (e.strokeStyle = `#${c.invertedLineColor ?? "000000"}`, e.lineWidth = De(c.invertedLineWidthEmu, o), e.setLineDash([]), !0);
				if (c.automaticNegativeStyle === !0) return e.strokeStyle = "#000000", e.lineWidth = .75 * o, e.setLineDash([]), !0;
				let t = ae && r.chartType === "clusteredBar" && r.legacyChartStyle === 2 && c.invertedFillAuthored === !0 && c.invertedFill != null && c.invertedLineAuthored === !1, n = c.lineHidden === !0 || c.lineColor != null || c.lineWidthEmu != null;
				if (t && n) return c.lineHidden || !c.lineColor ? !1 : (e.strokeStyle = `#${c.lineColor}`, e.lineWidth = De(c.lineWidthEmu, o), e.setLineDash([]), !0);
				if (t) return e.strokeStyle = "#000000", e.lineWidth = .75 * o, e.setLineDash([]), !0;
				let i = nt(r, "dataPoint", z.get(c) ?? s) ?? r.chartexDataPointStyle, a = Pe(B?.chartexStyle, U), u = a === void 0 ? Pe(c.chartexStyle, U) : a;
				return !i && !K && u === void 0 && !c.lineColor && c.lineHidden !== !0 ? !1 : an(e, r, "dataPoint", c, B, U, de, 1, o, {
					x: X,
					y: Z,
					w: Yt,
					h: Q
				}, l, !1);
			}, be = e(B?.chartexStyle, c.chartexStyle), xe = (e, t, n, r, i) => {
				if (Ma(e, _e === void 0 ? c.fillPattern : _e, {
					x: t,
					y: n,
					w: r,
					h: i
				}, de, o, l), r > 0 && i > 0 && ye(e)) {
					let a = e.lineWidth;
					e.strokeRect(t + a / 2, n + a / 2, Math.max(0, r - a), Math.max(0, i - a));
				}
			};
			if (d) {
				let e = E, i = b ? Un(n, !0) + j : Un(n, !0) + j + e * A, a = b ? cn(R ? T : w) : dn, d = cn(b ? (R ? T : w) + re : re), f = ma(Math.min(a, d), X, X + Yt), p = ma(Math.max(a, d), X, X + Yt), m = Math.max(0, p - f);
				qn && c.values[n] != null && (qn[s][n] = {
					categoryStart: i,
					categoryEnd: i + k,
					valueEnd: ma(d, X, X + Yt)
				}), Se(t, be, nt(r, "dataPoint", z.get(c) ?? s), U, {
					x: f,
					y: i,
					w: m,
					h: k
				}, o, (e) => xe(e, f, i, m, k));
				let _ = c.seriesDataLabels, S = g(r, c, n, c.categories?.[n] ?? pe[n] ?? "", L, {
					visible: r.showDataLabels,
					showVal: r.showDataLabels && !x,
					showPercent: r.showDataLabels && x,
					showCatName: !1
				}, G[s], x ? re / 100 : void 0, c.useSecondaryAxis && H ? H.displayUnits : r.valAxisDisplayUnits);
				if (S && qr(r, L, ie)) {
					let e = M(S.fontSizeHpt ?? r.dataLabelFontSizeHpt, o) ?? Math.max(7, Math.min(11, k * .6)), a = G[s].get(n), d = S.fontBold || _?.fontBold == null && a?.fontBold == null, p = $(r, S.fontFace ?? r.dataLabelFontFace, "minor");
					t.font = `${S.textStyle.fontItalic ? "italic " : ""}${d ? "bold " : ""}${e}px ${p}`, Jr(t, S.text, f, i, m, k, "horizontal", S.position ?? r.dataLabelPosition ?? (b ? "ctr" : null), c.dataLabelColors?.[n] ?? S.fontColor ?? c.labelColor ?? r.dataLabelFontColor ?? null, e, {
						x: X,
						y: Z,
						w: Yt,
						h: Q
					}, {
						x: u,
						y: h,
						w: v,
						h: y
					}, a?.manualLayout, R, ua(r, a, o, p, d, S.textStyle), S.showLegendKey ? se(z.get(c) ?? s, n) : void 0, S.textStyle, o, vt(a?.labelBox, _?.labelBox), l);
				}
			} else {
				let e = b ? Un(n, !1) + j : Un(n, !1) + j + E * A;
				if (e + k <= X || e >= X + Yt) continue;
				let i = b ? P(R ? T : w) : I, a = P(b ? (R ? T : w) + re : re), d = ma(Math.min(i, a), Z, Z + Q), f = ma(Math.max(i, a), Z, Z + Q), p = Math.max(0, f - d);
				qn && c.values[n] != null && (qn[s][n] = {
					categoryStart: e,
					categoryEnd: e + k,
					valueEnd: ma(a, Z, Z + Q)
				}), Se(t, be, nt(r, "dataPoint", z.get(c) ?? s), U, {
					x: e,
					y: d,
					w: k,
					h: p
				}, o, (t) => xe(t, e, d, k, p));
				let m = c.seriesDataLabels, _ = g(r, c, n, c.categories?.[n] ?? pe[n] ?? "", L, {
					visible: r.showDataLabels,
					showVal: r.showDataLabels && !x,
					showPercent: r.showDataLabels && x,
					showCatName: !1
				}, G[s], x ? re / 100 : void 0, c.useSecondaryAxis && H ? H.displayUnits : r.valAxisDisplayUnits);
				if (_ && qr(r, L, ie)) {
					let i = M(_.fontSizeHpt ?? r.dataLabelFontSizeHpt, o) ?? Math.max(7, Math.min(11, k * .6)), a = G[s].get(n), f = _.fontBold || m?.fontBold == null && a?.fontBold == null, g = $(r, _.fontFace ?? r.dataLabelFontFace, "minor");
					t.font = `${_.textStyle.fontItalic ? "italic " : ""}${f ? "bold " : ""}${i}px ${g}`, Jr(t, _.text, e, d, p, k, "vertical", _.position ?? r.dataLabelPosition ?? (b ? "ctr" : null), c.dataLabelColors?.[n] ?? _.fontColor ?? c.labelColor ?? r.dataLabelFontColor ?? null, i, {
						x: X,
						y: Z,
						w: Yt,
						h: Q
					}, {
						x: u,
						y: h,
						w: v,
						h: y
					}, a?.manualLayout, R, ua(r, a, o, g, f, _.textStyle), _.showLegendKey ? se(z.get(c) ?? s, n) : void 0, _.textStyle, o, vt(a?.labelBox, m?.labelBox), l);
				}
			}
			b && (R ? a.set(_, T + re) : i.set(_, w + re));
		}
	}
	if (qn) {
		let e = /* @__PURE__ */ new Map();
		for (let t = 0; t < O.length; t++) {
			let n = O[t].barGroupIndex ?? 0, r = e.get(n);
			r ? r.push(t) : e.set(n, [t]);
		}
		for (let n of r.barGroupDecorations ?? []) if (n.seriesLines?.length === 1) {
			if (t.save(), !Zr(t, Qr(r, n.seriesLines[0], "seriesLine"), o)) {
				t.restore();
				continue;
			}
			t.beginPath(), t.rect(X, Z, Yt, Q), t.clip();
			for (let r of e.get(n.groupIndex) ?? []) {
				let e = qn[r], n = D(O[r]);
				for (let r = 0; r + 1 < W; r++) {
					let i = e[r], a = e[r + 1];
					if (!i || !a) continue;
					let o = (i.categoryStart + i.categoryEnd) / 2, s = (a.categoryStart + a.categoryEnd) / 2 >= o;
					t.beginPath(), n ? (t.moveTo(i.valueEnd, s ? i.categoryEnd : i.categoryStart), t.lineTo(a.valueEnd, s ? a.categoryStart : a.categoryEnd)) : (t.moveTo(s ? i.categoryEnd : i.categoryStart, i.valueEnd), t.lineTo(s ? a.categoryStart : a.categoryEnd, a.valueEnd)), t.stroke();
				}
			}
			t.restore();
		}
	}
	let Jn = (e, t) => {
		let n = he(e), r = Math.max(0, n.indexOf(e)), i = D(e), a = Gn(n, Hn(t, i)), o = Un(t, i) + a.catStart;
		return te(e) ? o + a.barW / 2 : o + r * a.clusterGap + a.barW / 2;
	}, er = (e, t) => {
		if (Number.isInteger(t) && t >= 0 && t < W) return Jn(e, t);
		let n = he(e), r = Math.max(0, n.indexOf(e)), i = D(e), a = Rn(i), o = Gn(n, a), s = i ? Bn ? t : W - 1 - t : Bn ? W - 1 - t : t;
		return (i ? Z : X) + s * a + o.catStart + (te(e) ? 0 : r) * o.clusterGap + o.barW / 2;
	};
	for (let e = 0; e < O.length; e++) {
		let n = O[e], i = D(n), s = H != null && n.useSecondaryAxis === !0, c = i ? cn : s && Pt ? Pt.makeToY(Z, Q) : sn, u = en(e, n), d = (t) => xt(e, t);
		for (let e of Te(n)) ya(t, n, ti(r, e), W, i, (e) => Jn(n, e), c, d, u, o);
		Cr(t, n, u, (e) => er(n, e - 1), c, o, n.values.map((e, t) => t + 1), {
			chart: r,
			chartRect: a,
			plotRect: {
				x: X,
				y: Z,
				w: Yt,
				h: Q
			},
			shapeRotationDeg: l
		}, (e, t) => i ? {
			x: c(t),
			y: er(n, e - 1)
		} : {
			x: er(n, e - 1),
			y: c(t)
		});
	}
	if ((!Ge || b) && !r.catAxisHidden && kr(r)) {
		t.fillStyle = r.catAxisFontColor ? `#${r.catAxisFontColor}` : "#555";
		let e = r.catAxisFontSizeHpt == null ? Math.max(8, Math.min(11, zn * .5)) : Ve;
		t.font = ln(e, $(r, r.catAxisFontFace, "minor"), r.catAxisFontBold ?? !1, r.catAxisFontItalic ?? !1);
		let n = zn - 4, i = X - 4 - (u + Xe + at), a = Zt, s = Xt ? Xt.majorTicks.map((e) => ({
			raw: p(String(e.serial), r.catAxisFormatCode, r.date1904),
			fraction: e.fraction,
			categoryIndex: -1
		})) : pe.map((e, t) => ({
			raw: p(e.toString(), r.catAxisFormatCode, r.date1904),
			fraction: null,
			categoryIndex: t
		}));
		for (let o of s) {
			let { raw: s } = o;
			if (b) {
				let n = o.fraction == null ? Z + Vn(o.categoryIndex, !0) * zn + zn / 2 : Z + o.fraction * Q, a = m(r.catAxisFontSizeHpt == null ? 4 : yt(e), r.catAxisLabelOffsetPercent), c = u + Xe + at, l = X - a, d = r.catAxisLabelAlignment, f = d === "l" ? c : d === "ctr" ? (c + l) / 2 : l;
				t.textAlign = d === "l" ? "left" : d === "ctr" ? "center" : "right", t.textBaseline = "middle", t.fillText(At(t, s, i), f, n);
			} else {
				let i = o.fraction != null || o.categoryIndex < 0 ? {
					fraction: o.fraction ?? .5,
					textAlign: "center"
				} : ae(o.categoryIndex, W, fe(r), Bn, r.catAxisLabelAlignment), c = X + i.fraction * Yt;
				t.textAlign = i.textAlign, t.textBaseline = "top";
				let l = a === 0 ? n : Q * .4, u = m(r.catAxisFontSizeHpt == null ? 3 : Re(e), r.catAxisLabelOffsetPercent);
				a === 0 ? (o.categoryIndex >= 0 ? Qt[o.categoryIndex] ?? [s] : [s]).forEach((n, r) => {
					t.fillText(n, c, Pn + u + r * (e + 2));
				}) : Mr(t, At(t, s, l), c, Pn + u, a);
			}
		}
		if (!b && Ue) {
			let n = m(r.catAxisFontSizeHpt == null ? 3 : Re(e), r.catAxisLabelOffsetPercent), i = e + 4;
			t.textAlign = "center", t.textBaseline = "top", t.strokeStyle = wn, t.lineWidth = Tn, t.setLineDash([]);
			let a = (e) => {
				if (!In || e % Fn !== 0) return Pn;
				let t = $n("major", Tn, o);
				return r.catAxisMajorTickMark === "cross" ? Pn - t / 2 : r.catAxisMajorTickMark === "in" ? Pn - t : Pn;
			}, s = /* @__PURE__ */ new Set();
			for (let e = 1; e < Ue.length; e++) {
				let t = Ue[e] ?? [];
				for (let e = 0; e < W; e++) (t[e] ?? "") !== "" && s.add(e);
				s.add(W);
			}
			let c = Pn + n + e + 2;
			for (let e = 0; e <= W; e++) {
				if (s.has(e)) continue;
				let n = X + e / W * Yt;
				t.beginPath(), t.moveTo(n, a(e)), t.lineTo(n, c), t.stroke();
			}
			let l = /* @__PURE__ */ new Map();
			for (let a = 1; a < Ue.length; a++) {
				let o = Ue[a] ?? [], s = [];
				for (let e = 0; e < W; e++) (o[e] ?? "") !== "" && s.push(e);
				for (let c = 0; c < s.length; c++) {
					let u = s[c], d = s[c + 1] ?? W, f = o[u] ?? "", p = X + u / W * Yt, m = X + d / W * Yt, h = Pn + n + a * i, g = r.catAxisLabelAlignment, _ = g === "l" ? p : g === "r" ? m : (p + m) / 2;
					t.textAlign = g === "l" ? "left" : g === "r" ? "right" : "center", t.fillText(At(t, f, Math.max(0, m - p - 4)), _, h);
					let v = h + e + 2;
					for (let e of [u, d]) l.set(e, Math.max(l.get(e) ?? Pn, v));
				}
			}
			for (let [e, n] of l) {
				let r = X + e / W * Yt;
				t.beginPath(), t.moveTo(r, a(e)), t.lineTo(r, n), t.stroke();
			}
		}
	}
	if (L.length > 0 && !b) {
		Ei(t, r, W, Wn, (e) => H && e.useSecondaryAxis === !0 ? bn : fn, () => Mn, (e, t) => e.values[t] == null ? null : Ce(e, t), zn, o, l, "background"), Xt && (t.save(), t.beginPath(), t.rect(X, Z, Yt, Q), t.clip());
		for (let n = 0; n < L.length; n++) {
			let i = L[n], s = tn(i.dataPointOverrides), u = en(O.length + n, i), d = H && i.useSecondaryAxis === !0 ? bn : fn, p = z.get(i) ?? n, m = lt(r, p), h = xa(i, p), g = i.chartexStyle != null || i.lineHidden != null || i.lineColor != null || i.lineWidthEmu != null || r.chartexDataPointLineStyle != null, _ = i.smooth === !0, v = r.dispBlanksAs ?? "gap", y = [], b = [], S = () => {
				b.length !== 0 && (y.push(b), b = []);
			};
			for (let e = 0; e < W; e++) {
				let t = i.values[e];
				if (i.sourceHidden?.[e] === !0) {
					S();
					continue;
				}
				if (t == null && (v === "gap" && S(), v !== "zero")) continue;
				let n = Wn(e);
				b.push({
					x: n,
					y: d(Ce(i, e)),
					index: e
				});
			}
			S(), m ? on(t, r, i, y, _, !1, u, 2, o, {
				x: X,
				y: Z,
				w: Yt,
				h: Q
			}, l, c.semanticLineNoStyleFallback !== !1) : Se(t, e(i.chartexStyle), r.chartStyleRoles?.dataPointLine, h, {
				x: X,
				y: Z,
				w: Yt,
				h: Q
			}, o, (e) => {
				if (!g || Fa(e, r, r.chartexDataPointLineStyle, i, h, L.length, u, o, { linkedNoStyleFallback: c.semanticLineNoStyleFallback })) {
					g || (e.strokeStyle = u, e.lineWidth = 2, e.setLineDash([])), e.beginPath();
					for (let t of y) e.moveTo(t[0].x, t[0].y), ha(e, t, _);
					e.stroke();
				}
			});
			let w = i.showMarker !== !1 && i.markerSymbol !== "none", T = w || C(i), E = aa(r, i, p);
			if (T) for (let e = 0; e < W; e++) {
				if (i.sourceHidden?.[e] === !0 || i.values[e] == null) continue;
				let n = Wn(e), a = d(Ce(i, e)), c = s.get(e), p = f(i, c, "circle", w);
				if (p !== "none") if (E || P(c)) {
					let s = c?.markerLineWidthEmu ?? i.markerLineWidthEmu;
					ia(t, r, i, c, e, n, a, p, c?.markerSize ?? i.markerSize ?? 5, Ze(i, c, e, u), c?.markerLine ?? i.markerLine ?? null, o, s == null ? void 0 : De(s, o), x(i, c, e), l);
				} else t.fillStyle = u, t.beginPath(), t.arc(n, a, 3, 0, Math.PI * 2), t.fill();
			}
			Cr(t, i, u, (e) => Wn(e), d, o, void 0, {
				chart: r,
				chartRect: a,
				plotRect: {
					x: X,
					y: Z,
					w: Yt,
					h: Q
				},
				shapeRotationDeg: l
			});
		}
		Ei(t, r, W, Wn, (e) => H && e.useSecondaryAxis === !0 ? bn : fn, () => Mn, (e, t) => e.values[t] == null ? null : Ce(e, t), zn, o, l, "foreground"), Xt && t.restore();
	}
	if (R.length > 0) {
		let e = [], n = [];
		for (let t of R) {
			let r = t.categories ?? [];
			for (let i = 0; i < t.values.length; i++) {
				let a = qi(r, i, !1), o = t.values[i];
				a == null || o == null || (e.push(a), n.push(o));
			}
		}
		if (e.length && n.length) {
			let i = r.secondaryCatAxis, s = r.secondaryValAxis, c = Vt(e), d = Vt(n), f = (e) => e?.minorGridlines === !0 || e?.minorTickMark != null && e.minorTickMark !== "none", p = zt({
				dataMin: c.min,
				dataMax: c.max,
				explicitMin: i?.min,
				explicitMax: i?.max,
				axisLenPt: Yt / o,
				axisOrientation: "horizontal",
				majorUnit: i?.majorUnit,
				minorUnit: i?.minorUnit,
				needMinor: f(i),
				logBase: i?.logBase,
				reversed: i?.orientation === "maxMin"
			}), m = zt({
				dataMin: d.min,
				dataMax: d.max,
				explicitMin: s?.min,
				explicitMax: s?.max,
				axisLenPt: Q / o,
				axisOrientation: "vertical",
				majorUnit: s?.majorUnit,
				minorUnit: s?.minorUnit,
				needMinor: f(s),
				logBase: s?.logBase,
				reversed: s?.orientation === "maxMin"
			});
			ea(t, r, R.map((e, t) => ({
				series: e,
				index: z.get(e) ?? t
			})), !1, (e) => X + p.fraction(e) * Yt, (e) => Z + Q - m.fraction(e) * Q, a, X, Z, Yt, Q, o, !1, r.scatterStyle ?? "marker", {
				x: u,
				y: h,
				w: v,
				h: y
			}, m.max, void 0, l);
		}
	}
	Ln(), ue && !b && zr(t, r, ue, de, a, X, Z, Yt, o), H && Pt && Lr(t, r, H, Pt, hn, a, X, Z, Yt, Q, o, Ht, Ut, Cn, r.date1904, Mt), rn && yn(t, r, rn, X, Z + Q + (b ? r.valAxisHidden ? y * .02 : j(He) : 0), Yt, u + Xe, o);
	let ir = Me && r.series.length === 1 ? Me.values.map((e, t) => S(r, Me, Oe[je].get(t), t, t)) : K ? O.flatMap((e, t) => [ka(r, ke[t], O.length, e.chartexStyle, e.color), ...wr([e]).map(() => void 0)]) : [];
	Yn(t, Fe, Je, u, h, v, y, X, Z, Yt, Q, q + 2, o, ir), pn(t, r, u, h, v, y, X, Z, Yt, Q, Xe, Qe, et, tt, b);
}
function Zr(e, t, n, r = {
	x: 0,
	y: 0,
	w: Math.max(1, e.canvas?.width ?? 1),
	h: Math.max(1, e.canvas?.height ?? 1)
}, i = 0) {
	if (t.hidden === !0 || t.paintAuthored === !0 && t.color == null && t.fill == null) return !1;
	let a = t.fill == null ? t.color == null ? "#000000" : `#${t.color}` : G(t.fill, e, r.x, r.y, r.w, r.h, i);
	return a == null ? !1 : (e.strokeStyle = a, e.lineWidth = t.widthEmu == null ? Math.max(1, .75 * n) : De(t.widthEmu, n), e.setLineDash(ga(t.dash ?? void 0, e.lineWidth)), e.lineCap = t.cap === "rnd" ? "round" : t.cap === "sq" ? "square" : "butt", e.lineJoin = t.join === "round" || t.join === "bevel" ? t.join : "miter", !0);
}
function Qr(n, r, i, a) {
	let o = a ? Te(Te(n.classicChartStyleRoles?.[i], a), n.linkedChartStyleRoles?.[i] ?? (n.classicChartStyleRoles == null ? n.chartStyleRoles?.[i] : void 0)) : n.chartStyleRoles?.[i], s = J(n, i), c = r.paintAuthored === !0 || r.fill != null || r.color != null || r.hidden === !0, l = ue(r.style, s, 0), u = r.hidden === !0 ? t(s) : void 0, d = u === void 0 ? r.fill ?? (r.color ? {
		fillType: "solid",
		color: r.color
	} : l === void 0 ? r.paintAuthored === !0 && r.hidden !== !0 ? null : et(o, s, 0, r.style) : l) : u, f = ye(r.dash == null ? void 0 : {
		lineDash: r.dash,
		lineDashAuthored: !0
	}, r.style, o);
	return {
		style: e(r.style, o),
		fill: d != null && d.fillType !== "solid" ? d : null,
		color: d?.fillType === "solid" ? d.color : null,
		paintAuthored: c ? r.paintAuthored : d === void 0 ? void 0 : !0,
		widthEmu: r.widthEmu ?? r.style?.lineWidthEmu ?? o?.lineWidthEmu ?? null,
		dash: f?.lineDash ?? null,
		cap: r.cap ?? r.style?.lineCap ?? o?.lineCap ?? null,
		join: r.join ?? r.style?.lineJoin ?? o?.lineJoin ?? null,
		hidden: d === null ? !0 : null
	};
}
function $r(n, r, i, a) {
	let o = a ? {
		fillColors: [i === "upBar" ? a.upFillColor : a.downFillColor],
		fillPaintAuthored: !0,
		lineColors: [a.lineColor],
		linePaintAuthored: !0,
		lineWidthEmu: a.lineWidthEmu
	} : void 0, s = o ? Te(Te(n.classicChartStyleRoles?.[i], o), n.linkedChartStyleRoles?.[i] ?? (n.classicChartStyleRoles == null ? n.chartStyleRoles?.[i] : void 0)) : n.chartStyleRoles?.[i], c = J(n, i), l = r.fillPaintAuthored === !0 || r.fillColor != null || r.fill != null || r.fillHidden === !0, u = r.linePaintAuthored === !0 || r.lineColor != null || r.lineHidden === !0, d = V(r.style, c, 0), f = ue(r.style, c, 0), p = r.fillHidden === !0 ? N(c) : void 0, m = r.lineHidden === !0 ? t(c) : void 0, h = p === void 0 ? r.fill == null ? r.fillColor == null ? d === void 0 ? r.fillPaintAuthored === !0 && r.fillHidden !== !0 ? null : xe(s, c, 0, r.style) : d : {
		fillType: "solid",
		color: r.fillColor
	} : r.fill : p, g = m === void 0 ? r.lineColor ? {
		fillType: "solid",
		color: r.lineColor
	} : f === void 0 ? r.linePaintAuthored === !0 && r.lineHidden !== !0 ? null : et(s, c, 0, r.style) : f : m;
	return {
		style: e(r.style, s),
		fillColor: h?.fillType === "solid" ? h.color : null,
		fill: h != null && h.fillType !== "solid" && h.fillType !== "none" ? h : null,
		fillPaintAuthored: l ? r.fillPaintAuthored : h === void 0 ? void 0 : !0,
		fillHidden: h === null ? !0 : null,
		lineColor: g?.fillType === "solid" ? g.color : null,
		linePaintAuthored: u ? r.linePaintAuthored : g === void 0 ? void 0 : !0,
		lineWidthEmu: r.lineWidthEmu ?? s?.lineWidthEmu ?? null,
		lineDash: r.lineDash ?? s?.lineDash ?? null,
		lineCap: r.lineCap ?? s?.lineCap ?? null,
		lineJoin: r.lineJoin ?? s?.lineJoin ?? null,
		lineHidden: g === null ? !0 : null
	};
}
function ei(e, t, n, r, i, a, o) {
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
function ti(e, t) {
	let n = Qr(e, {
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
function ni(e, t) {
	return Qr(e, {
		style: t.leaderLineStyle,
		color: t.leaderLineColor,
		paintAuthored: t.leaderLinePaintAuthored,
		widthEmu: t.leaderLineWidthEmu,
		dash: t.leaderLineDash,
		hidden: t.leaderLineHidden
	}, "leaderLine");
}
function ri(e, t) {
	let n = Qr(e, {
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
function ii(e, t) {
	let n = e.chartStyleRoles?.dataTable, r = J(e, "dataTable"), i = Qr(e, {
		style: t.style,
		color: t.lineColor,
		paintAuthored: t.linePaintAuthored,
		widthEmu: t.lineWidthEmu,
		dash: t.lineDash,
		hidden: t.lineHidden
	}, "dataTable"), a = V(t.style, r, 0), o = t.fillHidden === !0 ? N(r) : void 0, s = o === void 0 ? t.fill ?? (t.fillColor ? {
		fillType: "solid",
		color: t.fillColor
	} : a === void 0 ? t.fillPaintAuthored === !0 && t.fillHidden !== !0 ? null : xe(n, r, 0, t.style) : a) : o, c = s != null && s.fillType !== "solid" && s.fillType !== "image" && s.fillType !== "none" ? s : null, l = s?.fillType === "solid" ? s.color : null, u = s === null ? !0 : null, d = t.fillPaintAuthored ?? (s === void 0 ? void 0 : !0), f = bi(e, t.fontColor, t.fontPaintAuthored, n);
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
function ai(e, t, n, r, i, a, o, s) {
	if (n !== !0) return {
		visible: n,
		color: r,
		widthEmu: i,
		dash: a,
		paintAuthored: o
	};
	let c = Qr(e, {
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
function oi(e, t) {
	if (!t || !e.chartStyleRoles?.gridlineMajor && !e.chartStyleRoles?.gridlineMinor) return t;
	let n = ai(e, "gridlineMajor", t.majorGridlines, t.majorGridlineColor, t.majorGridlineWidthEmu, t.majorGridlineDash, t.majorGridlinePaintAuthored, t.majorGridlineStyle), r = ai(e, "gridlineMinor", t.minorGridlines, t.minorGridlineColor, t.minorGridlineWidthEmu, t.minorGridlineDash, t.minorGridlinePaintAuthored, t.minorGridlineStyle);
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
function si(e, t, n, r, i, a, o, s) {
	return Qr(e, {
		style: s,
		color: n,
		widthEmu: r,
		dash: i,
		paintAuthored: o,
		hidden: a ? !0 : void 0
	}, t);
}
function ci(e) {
	return e.hidden === !0 || e.paintAuthored === !0 && e.color == null;
}
function li(e, t, n) {
	let r = e.chartStyleRoles?.[n];
	if (!t || !r && !e.chartTextStyle) return t;
	let i = si(e, n, t.lineColor, t.lineWidthEmu, t.lineDash, t.lineHidden, t.linePaintAuthored, t.style), a = ci(i), o = t.fontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? r?.fontSizeHpt, s = t.fontBold ?? e.chartTextStyle?.fontBold ?? r?.fontBold, c = t.fontItalic ?? e.chartTextStyle?.fontItalic ?? r?.fontItalic, l = bi(e, t.fontColor, t.fontPaintAuthored, r), u = l.color, d = t.fontFace ?? e.chartTextStyle?.fontFace ?? r?.fontFace, f = e.chartStyleRoles?.axisTitle, p = t.titleFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? f?.fontSizeHpt, m = t.titleFontBold ?? e.chartTextStyle?.fontBold ?? f?.fontBold, h = t.titleFontItalic ?? e.chartTextStyle?.fontItalic ?? f?.fontItalic, g = bi(e, t.titleFontColor, t.titleFontPaintAuthored, f), _ = g.color, v = t.titleFontFace ?? e.chartTextStyle?.fontFace ?? f?.fontFace;
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
function ui(e) {
	let t = e.threeD?.seriesAxis, n = e.chartStyleRoles?.seriesAxis;
	if (!t || !n && !e.chartTextStyle) return e;
	let r = Qr(e, {
		style: t.style,
		color: t.lineColor,
		widthEmu: t.lineWidthEmu,
		dash: t.lineDash,
		hidden: t.lineHidden ? !0 : void 0,
		paintAuthored: t.linePaintAuthored
	}, "seriesAxis"), i = ci(r), a = t.fontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? n?.fontSizeHpt, o = t.fontBold ?? e.chartTextStyle?.fontBold ?? n?.fontBold, s = t.fontItalic ?? e.chartTextStyle?.fontItalic ?? n?.fontItalic, c = bi(e, t.fontColor, t.fontPaintAuthored, n), l = c.color, u = t.fontFace ?? e.chartTextStyle?.fontFace ?? n?.fontFace, d = e.chartStyleRoles?.axisTitle, f = t.titleFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? d?.fontSizeHpt, p = t.titleFontBold ?? e.chartTextStyle?.fontBold ?? d?.fontBold, m = t.titleFontItalic ?? e.chartTextStyle?.fontItalic ?? d?.fontItalic, h = bi(e, t.titleFontColor, t.titleFontPaintAuthored, d), g = h.color, _ = t.titleFontFace ?? e.chartTextStyle?.fontFace ?? d?.fontFace;
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
function di(e, t, n) {
	if (n?.kind === "bubble" || n == null && e.chartType === "bubble") return !1;
	let r = n?.kind === "scatter" ? "scatter" : t.seriesType ?? e.chartType;
	return r === "line" || r === "stackedLine" || r === "stackedLinePct" || r === "area" || r === "stackedArea" || r === "stackedAreaPct" || r === "scatter" || r === "radar" || r === "stock";
}
function fi(e, t, n, r, i) {
	let a = lt(e, n) ? void 0 : e.chartStyleRoles?.dataPointMarker, o = lt(e, n) ? void 0 : J(e, "dataPointMarker");
	if (!di(e, t, i) || (t.showMarker === !1 || t.markerSymbol === "none") && !C(t)) return t;
	let s = xa(t, n), c = V(t.markerStyle, o, s), l = t.markerFillPaintAuthored === !0 && t.markerStyle?.fillHidden !== !0 || t.markerFill != null || t.markerFillPaint !== void 0 || c !== void 0, u = l ? c : xe(a, o, s, t.markerStyle), d = t.markerFill ?? (u?.fillType === "solid" ? u.color : u === null ? "00000000" : null), f = t.markerFillPaint === void 0 ? u?.fillType === "gradient" || u?.fillType === "pattern" || u?.fillType === "image" ? u : void 0 : t.markerFillPaint, p = l ? t.markerFillPaintAuthored : u === void 0 ? void 0 : !0, m = ue(t.markerStyle, o, s), h = t.markerLine != null || t.markerLinePaintAuthored === !0 && t.markerStyle?.lineHidden !== !0 || m !== void 0, g = h ? m : et(a, o, s, t.markerStyle), _ = t.markerLine ?? (g?.fillType === "solid" ? g.color : g === null || h ? "00000000" : null), v = t.markerLineWidthEmu ?? t.markerStyle?.lineWidthEmu ?? a?.lineWidthEmu ?? null, y = t.markerSize ?? e.chartStyleMarkerSizePt, b = t.markerSymbol ?? e.chartStyleMarkerSymbol, x = t.dataPointOverrides?.map((e) => {
		if (!P(e)) return e;
		let n = V(e.markerStyle, o, e.idx), r = ue(e.markerStyle, o, e.idx), i = e.markerFillPaintAuthored === !0 && e.markerStyle?.fillHidden !== !0 || e.markerFill != null || e.markerFillPaint !== void 0 || n !== void 0, c = e.markerLine != null || e.markerLinePaintAuthored === !0 && e.markerStyle?.lineHidden !== !0 || r !== void 0, d = i ? void 0 : l ? u : xe(a, o, s, t.markerStyle), f = e.markerFill ?? (n?.fillType === "solid" ? n.color : n === null ? "00000000" : void 0) ?? (d?.fillType === "solid" ? d.color : d === null ? "00000000" : void 0), p = e.markerFillPaint === void 0 ? n?.fillType === "gradient" || n?.fillType === "pattern" || n?.fillType === "image" ? n : d?.fillType === "gradient" || d?.fillType === "pattern" || d?.fillType === "image" ? d : void 0 : e.markerFillPaint, m = e.markerLine ?? (r?.fillType === "solid" ? r.color : r === null ? "00000000" : void 0) ?? (c ? "00000000" : g?.fillType === "solid" ? g.color : g === null ? "00000000" : void 0), _ = e.markerLineWidthEmu ?? e.markerStyle?.lineWidthEmu ?? (!c && !h ? a?.lineWidthEmu ?? void 0 : void 0);
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
function pi(e, n, r, i, a = 0, o = a) {
	if (!r) return n;
	let { color: s, fill: c, hidden: l } = n, u = l === !0 ? t(i) : void 0, d = ue(n.style, i, a), f = c != null || s != null || u !== void 0 || d !== void 0 || n.paintAuthored === !0 && l !== !0, p = r.lineNoStyle !== !0 && (r.linePaintAuthored === !0 || r.lineHidden === !0 || r.linePaints != null || r.lineColors != null);
	if (!f) {
		let e = Pe(r, o);
		e === null ? l = !0 : e?.fillType === "solid" ? (s = e.color, c = null, l = null) : e !== void 0 && (c = e, s = null, l = null);
	} else if (u !== void 0) l = !0, s = null, c = null;
	else if (c != null || s != null) l = null;
	else if (c == null && s == null) {
		let e = d === void 0 ? n.paintAuthored === !0 ? null : void 0 : d;
		e === null ? l = !0 : e?.fillType === "solid" ? (s = e.color, c = null, l = null) : e !== void 0 && (c = e, s = null, l = null);
	}
	let m = n.dash, h = n.customDash, g = n.dashAuthored;
	return g !== !0 && m == null && h == null && (m = r.lineDash, h = r.lineCustomDash, g = r.lineDashAuthored), {
		color: s,
		fill: c,
		hidden: l,
		paintAuthored: f || p ? !0 : n.paintAuthored,
		widthEmu: n.widthEmu ?? n.style?.lineWidthEmu ?? r.lineWidthEmu,
		dash: m,
		dashAuthored: g,
		customDash: h,
		cap: n.cap ?? n.style?.lineCap ?? r.lineCap,
		join: n.join ?? n.style?.lineJoin ?? r.lineJoin,
		compound: n.compound ?? n.style?.lineCompound ?? r.lineCompound
	};
}
function mi(e, t, n, r, i, a = 0) {
	if (!n || !t && !i) return t ?? void 0;
	let o = t ?? {}, s = F(o, n, r, i, 0, a), c = pi(e, {
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
function hi(e, t, n) {
	let r = w(t.labelBox), i = r ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, a = r ? J(e, "dataLabelCallout") ?? J(e, "dataLabel") : J(e, "dataLabel"), o = i ? mi(e, t.labelBox, i, a, !0, n) : t.labelBox, s = t.fontPaintAuthored === !0 || t.fontColor != null || t.fontHidden === !0, c = bi(e, t.fontColor, t.fontPaintAuthored, i, n);
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
function gi(e, t, n) {
	let r = e.chartStyleRoles?.trendlineLabel, i = J(e, "trendlineLabel"), a = t.labelFontPaintAuthored === !0 || t.labelFontColor != null || t.labelFontHidden === !0, o = bi(e, t.labelFontColor, t.labelFontPaintAuthored, r, n);
	return {
		...t,
		labelBox: r ? mi(e, t.labelBox, r, i, !0, n) : t.labelBox,
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
function _i(e, t, n) {
	let r = vt(t.labelBox, n?.labelBox), i = w(r), a = i ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, o = i ? J(e, "dataLabelCallout") ?? J(e, "dataLabel") : J(e, "dataLabel"), s = a ? mi(e, r, a, o, !0, t.idx) : r, c = t.fontPaintAuthored === !0 || t.fontColor != null || t.fontHidden === !0, l = n?.fontPaintAuthored === !0 || n?.fontColor != null || n?.fontHidden === !0, u = bi(e, c ? t.fontColor : l ? n?.fontColor : void 0, c ? t.fontPaintAuthored : n?.fontPaintAuthored, a, t.idx);
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
function vi(e) {
	let t = e.chartStyleRoles?.legend, n = J(e, "legend");
	if (!t && !e.chartTextStyle) return e;
	let r = e.legendFill, i = e.legendFillColor, a = e.legendFillHidden, o = e.legendFillPaintAuthored, s = a === !0 ? N(n) : void 0;
	if (!(r != null || i != null || s !== void 0 || e.legendFillPaintAuthored === !0 && a !== !0)) {
		let s = xe(t, n, 0, e.legendStyle);
		s === null ? a = !0 : s?.fillType === "solid" ? (i = s.color, r = null, a = null) : s !== void 0 && (r = s, i = null, a = null), s !== void 0 && (o = !0);
	}
	let c = pi(e, {
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
	}, t, J(e, "legend")), l = bi(e, e.legendFontColor, e.legendFontPaintAuthored, t);
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
function yi(e, t, n, r = 0) {
	return t === !0 || e != null ? {
		color: e ?? "00000000",
		authored: !0
	} : n && (n.fontPaintAuthored === !0 || n.fontColor != null || n.fontColors != null || n.fontHidden === !0) ? {
		color: n.fontHidden === !0 ? "00000000" : We(n, r) ?? "00000000",
		authored: !0
	} : {
		color: e,
		authored: void 0
	};
}
function bi(e, t, n, r, i = 0) {
	let a = yi(t, n, e.chartTextStyle, i);
	return a.authored === !0 || a.color != null ? a : yi(t, n, r, i);
}
function xi(e) {
	let t = e.threeD ? e.chartStyleRoles?.plotArea3D : e.chartStyleRoles?.plotArea, n = J(e, e.threeD ? "plotArea3D" : "plotArea");
	if (!t) return e;
	let r = e.plotAreaFill, i = e.plotAreaBg, a = e.plotAreaFillHidden, o = e.plotAreaFillPaintAuthored, s = a === !0 ? N(n) : void 0;
	if (!((r != null || i != null) && e.plotAreaFillAutomatic !== !0 || s !== void 0 || e.plotAreaFillPaintAuthored === !0 && a !== !0)) {
		let s = xe(t, n, 0, e.plotAreaStyle);
		s === null ? a = !0 : s?.fillType === "solid" ? (i = s.color, r = null, a = null) : s !== void 0 && (r = s, i = null, a = null), s !== void 0 && (o = !0);
	}
	let c = pi(e, {
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
	}, t, J(e, e.threeD ? "plotArea3D" : "plotArea"));
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
function Si(e) {
	let t = e.chartStyleRoles?.chartArea, n = J(e, "chartArea");
	if (!t) return e;
	let r = e.chartFill, i = e.chartBg, a = e.chartFillHidden, o = e.chartFillPaintAuthored, s = a === !0 ? N(n) : void 0;
	if (!(r != null || s !== void 0 || e.chartFillPaintAuthored === !0 && a !== !0)) {
		let s = xe(t, n, 0, e.chartAreaStyle);
		s === null ? (r = null, i = null, a = !0) : s?.fillType === "solid" ? (i = s.color, r = null, a = null) : s !== void 0 && (r = s, i = null, a = null), s !== void 0 && (o = !0);
	}
	let c = pi(e, {
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
	}, t, J(e, "chartArea"));
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
function Ci(e, t) {
	let n = e.chartStyleRoles;
	if (!n || !(Number.isFinite(t) && t > 0)) return e;
	let r = St / t, i = !1, a = new Set([
		"categoryAxis",
		"seriesAxis",
		"valueAxis",
		"gridlineMajor",
		"gridlineMinor"
	]), o = Object.fromEntries(Object.entries(n).map(([e, t]) => !a.has(e) || !t || t.lineWidthEmu == null || !Number.isFinite(t.lineWidthEmu) || t.lineWidthEmu <= 0 || t.lineWidthEmu >= r ? [e, t] : (i = !0, [e, {
		...t,
		lineWidthEmu: r
	}])));
	return i ? {
		...e,
		chartStyleRoles: o
	} : e;
}
function wi(e, t) {
	if (e = Ci(e, t), !e.chartStyleRoles?.errorBar && !e.chartStyleRoles?.leaderLine && !e.chartStyleRoles?.trendline && !e.chartStyleRoles?.trendlineLabel && !e.chartStyleRoles?.dataLabel && !e.chartStyleRoles?.dataLabelCallout && !e.chartStyleRoles?.dataTable && !e.chartStyleRoles?.gridlineMajor && !e.chartStyleRoles?.gridlineMinor && !e.chartStyleRoles?.categoryAxis && !e.chartStyleRoles?.valueAxis && !e.chartStyleRoles?.seriesAxis && !e.chartStyleRoles?.dataPointMarker && !e.chartStyleRoles?.legend && !e.chartStyleRoles?.plotArea && !e.chartStyleRoles?.plotArea3D && !e.chartStyleRoles?.chartArea && !e.chartStyleRoles?.title && !e.chartStyleRoles?.axisTitle && e.chartTextStyle == null && e.chartStyleMarkerSizePt == null && e.chartStyleMarkerSymbol == null) return e;
	let n = !1, r = te(e), i = e.series.map((t, i) => {
		let a = fi(e, t, i, e.series.length, r[i]);
		n ||= a !== t;
		let o = e.chartStyleRoles?.errorBar ? a.errBars?.map((t) => {
			let r = ti(e, t);
			return n ||= r.color !== t.color || r.lineWidthEmu !== t.lineWidthEmu || r.dash !== t.dash || r.hidden !== t.hidden, r;
		}) : a.errBars, s = a.seriesDataLabels;
		if (s && (e.chartTextStyle || e.chartStyleRoles?.dataLabel || e.chartStyleRoles?.dataLabelCallout)) {
			let t = hi(e, s, xa(a, i));
			n ||= t !== s, s = t;
		}
		let c = e.chartTextStyle || e.chartStyleRoles?.dataLabelCallout || e.chartStyleRoles?.dataLabel ? a.dataLabelOverrides?.map((r) => {
			let i = _i(e, r, t.seriesDataLabels);
			return n ||= i !== r, i;
		}) : a.dataLabelOverrides;
		if (s && e.chartStyleRoles?.leaderLine) {
			let t = ni(e, s), r = {
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
			let r = e.chartStyleRoles?.trendline ? ri(e, t) : t;
			return (e.chartTextStyle || e.chartStyleRoles?.trendlineLabel) && (r = gi(e, r, xa(a, i))), n ||= r.lineColor !== t.lineColor || r.lineWidthEmu !== t.lineWidthEmu || r.lineDash !== t.lineDash || r.lineHidden !== t.lineHidden || r !== t, r;
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
		let t = ii(e, a);
		n ||= t !== a, a = t;
	}
	let o = ai(e, "gridlineMajor", e.valAxisMajorGridlines, e.valAxisGridlineColor, e.valAxisGridlineWidthEmu, e.valAxisGridlineDash, e.valAxisGridlinePaintAuthored, e.valAxisMajorGridlineStyle), s = ai(e, "gridlineMajor", e.catAxisMajorGridlines, e.catAxisGridlineColor, e.catAxisGridlineWidthEmu, e.catAxisGridlineDash, e.catAxisGridlinePaintAuthored, e.catAxisMajorGridlineStyle), c = ai(e, "gridlineMinor", e.valAxisMinorGridlines, e.valAxisMinorGridlineColor, e.valAxisMinorGridlineWidthEmu, e.valAxisMinorGridlineDash, e.valAxisMinorGridlinePaintAuthored, e.valAxisMinorGridlineStyle), l = ai(e, "gridlineMinor", e.catAxisMinorGridlines, e.catAxisMinorGridlineColor, e.catAxisMinorGridlineWidthEmu, e.catAxisMinorGridlineDash, e.catAxisMinorGridlinePaintAuthored, e.catAxisMinorGridlineStyle), u = oi(e, e.secondaryValAxis), d = oi(e, e.secondaryCatAxis), f = li(e, u, "valueAxis"), p = li(e, d, "categoryAxis"), m = si(e, "categoryAxis", e.catAxisLineColor, e.catAxisLineWidthEmu, e.catAxisLineDash, e.catAxisLineHidden, e.catAxisLinePaintAuthored, e.catAxisStyle), h = si(e, "valueAxis", e.valAxisLineColor, e.valAxisLineWidthEmu, e.valAxisLineDash, e.valAxisLineHidden, e.valAxisLinePaintAuthored, e.valAxisStyle), g = ci(m), _ = ci(h), v = e.chartStyleRoles?.categoryAxis, y = e.chartStyleRoles?.valueAxis, b = e.chartStyleRoles?.title, x = e.chartStyleRoles?.axisTitle, S = e.chartStyleRoles?.dataLabel, C = e.catAxisFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? v?.fontSizeHpt ?? null, w = e.catAxisFontBold ?? e.chartTextStyle?.fontBold ?? v?.fontBold, T = e.catAxisFontItalic ?? e.chartTextStyle?.fontItalic ?? v?.fontItalic, E = bi(e, e.catAxisFontColor, e.catAxisFontPaintAuthored, v), D = E.color, O = e.catAxisFontFace ?? e.chartTextStyle?.fontFace ?? v?.fontFace, k = e.valAxisFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? y?.fontSizeHpt ?? null, A = e.valAxisFontBold ?? e.chartTextStyle?.fontBold ?? y?.fontBold, j = e.valAxisFontItalic ?? e.chartTextStyle?.fontItalic ?? y?.fontItalic, M = bi(e, e.valAxisFontColor, e.valAxisFontPaintAuthored, y), N = M.color, P = e.valAxisFontFace ?? e.chartTextStyle?.fontFace ?? y?.fontFace, F = e.titleFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? b?.fontSizeHpt ?? null, ee = e.titleFontBold ?? e.chartTextStyle?.fontBold ?? b?.fontBold, I = e.titleFontItalic ?? e.chartTextStyle?.fontItalic ?? b?.fontItalic, ne = e.titleFontLanguage ?? e.chartTextStyle?.fontLanguage ?? b?.fontLanguage, L = e.titleFontBaseline ?? e.chartTextStyle?.fontBaseline ?? b?.fontBaseline, re = bi(e, e.titleFontColor, e.titleFontPaintAuthored, b), R = re.color ?? null, z = e.titleFontFace ?? e.chartTextStyle?.fontFace ?? b?.fontFace ?? null, ie = e.catAxisTitleFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? x?.fontSizeHpt, ae = e.catAxisTitleFontBold ?? e.chartTextStyle?.fontBold ?? x?.fontBold, B = e.catAxisTitleFontItalic ?? e.chartTextStyle?.fontItalic ?? x?.fontItalic, oe = bi(e, e.catAxisTitleFontColor, e.catAxisTitleFontPaintAuthored, x), se = oe.color, ce = e.catAxisTitleFontFace ?? e.chartTextStyle?.fontFace ?? x?.fontFace, V = e.valAxisTitleFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? x?.fontSizeHpt, H = e.valAxisTitleFontBold ?? e.chartTextStyle?.fontBold ?? x?.fontBold, U = e.valAxisTitleFontItalic ?? e.chartTextStyle?.fontItalic ?? x?.fontItalic, le = bi(e, e.valAxisTitleFontColor, e.valAxisTitleFontPaintAuthored, x), ue = le.color, de = e.valAxisTitleFontFace ?? e.chartTextStyle?.fontFace ?? x?.fontFace, fe = e.dataLabelFontSizeHpt ?? e.chartTextStyle?.fontSizeHpt ?? S?.fontSizeHpt ?? null, pe = e.dataLabelFontBold ?? e.chartTextStyle?.fontBold ?? S?.fontBold, W = e.dataLabelFontItalic ?? e.chartTextStyle?.fontItalic ?? S?.fontItalic, me = e.dataLabelFontLanguage ?? e.chartTextStyle?.fontLanguage ?? S?.fontLanguage, he = e.dataLabelFontBaseline ?? e.chartTextStyle?.fontBaseline ?? S?.fontBaseline, ge = bi(e, e.dataLabelFontColor, e.dataLabelFontPaintAuthored, S), _e = ge.color, ve = e.dataLabelFontFace ?? e.chartTextStyle?.fontFace ?? S?.fontFace;
	return n ||= o.visible !== e.valAxisMajorGridlines || o.color !== e.valAxisGridlineColor || o.widthEmu !== e.valAxisGridlineWidthEmu || o.dash !== e.valAxisGridlineDash || o.paintAuthored !== e.valAxisGridlinePaintAuthored || s.visible !== e.catAxisMajorGridlines || s.color !== e.catAxisGridlineColor || s.widthEmu !== e.catAxisGridlineWidthEmu || s.dash !== e.catAxisGridlineDash || s.paintAuthored !== e.catAxisGridlinePaintAuthored || c.visible !== e.valAxisMinorGridlines || c.color !== e.valAxisMinorGridlineColor || c.widthEmu !== e.valAxisMinorGridlineWidthEmu || c.dash !== e.valAxisMinorGridlineDash || c.paintAuthored !== e.valAxisMinorGridlinePaintAuthored || l.visible !== e.catAxisMinorGridlines || l.color !== e.catAxisMinorGridlineColor || l.widthEmu !== e.catAxisMinorGridlineWidthEmu || l.dash !== e.catAxisMinorGridlineDash || l.paintAuthored !== e.catAxisMinorGridlinePaintAuthored || f !== e.secondaryValAxis || p !== e.secondaryCatAxis || m.color !== e.catAxisLineColor || m.widthEmu !== e.catAxisLineWidthEmu || m.dash !== e.catAxisLineDash || g !== e.catAxisLineHidden || m.paintAuthored !== e.catAxisLinePaintAuthored || h.color !== e.valAxisLineColor || h.widthEmu !== e.valAxisLineWidthEmu || h.dash !== e.valAxisLineDash || _ !== e.valAxisLineHidden || h.paintAuthored !== e.valAxisLinePaintAuthored || C !== e.catAxisFontSizeHpt || w !== e.catAxisFontBold || T !== e.catAxisFontItalic || D !== e.catAxisFontColor || E.authored !== e.catAxisFontPaintAuthored || O !== e.catAxisFontFace || k !== e.valAxisFontSizeHpt || A !== e.valAxisFontBold || j !== e.valAxisFontItalic || N !== e.valAxisFontColor || M.authored !== e.valAxisFontPaintAuthored || P !== e.valAxisFontFace || F !== e.titleFontSizeHpt || ee !== e.titleFontBold || I !== e.titleFontItalic || ne !== e.titleFontLanguage || L !== e.titleFontBaseline || R !== e.titleFontColor || re.authored !== e.titleFontPaintAuthored || z !== e.titleFontFace || ie !== e.catAxisTitleFontSizeHpt || ae !== e.catAxisTitleFontBold || B !== e.catAxisTitleFontItalic || se !== e.catAxisTitleFontColor || oe.authored !== e.catAxisTitleFontPaintAuthored || ce !== e.catAxisTitleFontFace || V !== e.valAxisTitleFontSizeHpt || H !== e.valAxisTitleFontBold || U !== e.valAxisTitleFontItalic || ue !== e.valAxisTitleFontColor || le.authored !== e.valAxisTitleFontPaintAuthored || de !== e.valAxisTitleFontFace || fe !== e.dataLabelFontSizeHpt || pe !== e.dataLabelFontBold || W !== e.dataLabelFontItalic || me !== e.dataLabelFontLanguage || he !== e.dataLabelFontBaseline || _e !== e.dataLabelFontColor || ge.authored !== e.dataLabelFontPaintAuthored || ve !== e.dataLabelFontFace, vi(xi(Si(ui(n ? {
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
		valAxisFontColor: N,
		valAxisFontPaintAuthored: M.authored,
		valAxisFontFace: P,
		titleFontSizeHpt: F,
		titleFontBold: ee,
		titleFontItalic: I,
		titleFontLanguage: ne,
		titleFontBaseline: L,
		titleFontColor: R,
		titleFontPaintAuthored: re.authored,
		titleFontFace: z,
		catAxisTitleFontSizeHpt: ie,
		catAxisTitleFontBold: ae,
		catAxisTitleFontItalic: B,
		catAxisTitleFontColor: se,
		catAxisTitleFontPaintAuthored: oe.authored,
		catAxisTitleFontFace: ce,
		valAxisTitleFontSizeHpt: V,
		valAxisTitleFontBold: H,
		valAxisTitleFontItalic: U,
		valAxisTitleFontColor: ue,
		valAxisTitleFontPaintAuthored: le.authored,
		valAxisTitleFontFace: de,
		dataLabelFontSizeHpt: fe,
		dataLabelFontBold: pe,
		dataLabelFontItalic: W,
		dataLabelFontLanguage: me,
		dataLabelFontBaseline: he,
		dataLabelFontColor: _e,
		dataLabelFontPaintAuthored: ge.authored,
		dataLabelFontFace: ve
	} : e))));
}
function Ti(e, t, n, r, i, a, o, s, c, l, u, d = 0) {
	let f = Number.isFinite(c.gapWidthPercent) && c.gapWidthPercent >= 0 ? c.gapWidthPercent : 150, p = Math.max(0, s / (1 + f / 100));
	for (let s = 0; s < r; s++) {
		let r = t(s), f = n(s);
		if (r == null || f == null || !Number.isFinite(r) || !Number.isFinite(f)) continue;
		let m = a(r), h = o(f), g = Math.abs(h - m);
		if (!(p > 0) || !(g > 0) || !Number.isFinite(g)) continue;
		let _ = f >= r ? c.up : c.down, v = _.fillPaintAuthored === !0 || _.fill != null || _.fillColor != null || _.fillHidden === !0 ? void 0 : f >= r ? u?.upFillColor : u?.downFillColor, y = _.fillColor ?? v, b = i(s) - p / 2, x = Math.min(m, h), S = _.linePaintAuthored === !0 || _.lineColor != null || _.lineHidden === !0, C = _.lineColor ?? (S ? void 0 : u?.lineColor), w = _.lineWidthEmu ?? (S ? void 0 : u?.lineWidthEmu);
		Se(e, _.style, void 0, s, {
			x: b,
			y: x,
			w: p,
			h: g
		}, l, (e) => {
			if (!_.fillHidden && (_.fill != null || y != null) && Ma(e, _.fill ?? (y ? {
				fillType: "solid",
				color: y
			} : null), {
				x: b,
				y: x,
				w: p,
				h: g
			}, y ? `#${y}` : "rgba(0,0,0,0)", l, d), !_.lineHidden && (_.linePaintAuthored !== !0 || C != null) && (C != null || w != null)) {
				let t = e.getLineDash(), n = e.lineCap, r = e.lineJoin;
				e.strokeStyle = `#${C ?? "000000"}`, e.lineWidth = w == null ? Math.max(1, .75 * l) : De(w, l), e.setLineDash(ga(_.lineDash ?? void 0, e.lineWidth)), e.lineCap = _.lineCap === "rnd" ? "round" : _.lineCap === "sq" ? "square" : "butt", e.lineJoin = _.lineJoin === "round" || _.lineJoin === "bevel" ? _.lineJoin : "miter", e.strokeRect(b, x, p, g), e.setLineDash(t), e.lineCap = n, e.lineJoin = r;
			}
		});
	}
}
function Ei(e, t, n, r, i, a, o, s, c, l, u) {
	for (let d of t.lineGroupDecorations ?? []) {
		let f = t.series.filter((e) => e.lineGroupIndex === d.groupIndex);
		if (f.length === 0 && d.groupIndex === 0 && [
			"line",
			"stackedLine",
			"stackedLinePct"
		].includes(t.chartType) && (f = t.series.filter((e) => e.seriesType == null || e.seriesType === "line")), f.length === 0) continue;
		if (u === "foreground" && d.upDownBars && f.length >= 2) {
			let a = f[0], u = f[f.length - 1], p = t.legacyChartStyle === 2 ? {
				lineColor: "000000",
				lineWidthEmu: 9525,
				upFillColor: "FFFFFF",
				downFillColor: "000000"
			} : void 0, m = {
				...d.upDownBars,
				up: $r(t, d.upDownBars.up, "upBar", p),
				down: $r(t, d.upDownBars.down, "downBar", p)
			};
			Ti(e, (e) => o(a, e), (e) => o(u, e), n, r, i(a), i(u), s, m, c, void 0, l);
		}
		if (u === "foreground") continue;
		let p = d.dropLines ? Qr(t, d.dropLines, "dropLine") : null;
		p && Zr(e, p, c) && ei(e, f, n, r, i, a, o);
		let m = d.hiLowLines ? Qr(t, d.hiLowLines, "hiLoLine") : null;
		if (m && f.length >= 2 && Zr(e, m, c)) {
			let t = i(f[0]);
			for (let i = 0; i < n; i++) {
				let n = Infinity, a = -Infinity;
				for (let e of f) {
					let t = o(e, i);
					t == null || !Number.isFinite(t) || (n = Math.min(n, t), a = Math.max(a, t));
				}
				!Number.isFinite(n) || !Number.isFinite(a) || (e.beginPath(), e.moveTo(r(i), t(n)), e.lineTo(r(i), t(a)), e.stroke());
			}
		}
	}
}
function Di(e, t, n, r) {
	return e != null && Number.isFinite(e) ? ma(e, n, r) : t === "max" ? r : t === "min" ? n : ma(0, n, r);
}
function Oi(e, t, n) {
	return Di(e.catAxisCrossesAt, e.catAxisCrosses, t, n);
}
function ki(t, n, r, a, o = 0) {
	let { x: c, y: l, w: u, h: d } = r, h = Gr(n), g = h.length;
	if (g === 0) return;
	let v = kn(n, a), y = n.chartType === "stackedLinePct" ? "percentStacked" : n.chartType === "stackedLine" ? "stacked" : "standard", b = n.plotGroups?.filter((e) => e.kind === "line") ?? [{
		kind: "line",
		seriesStart: 0,
		seriesCount: n.series.length,
		categoryAxis: "primary",
		valueAxis: "primary",
		seriesAxis: "none",
		grouping: y
	}], S = Array(n.series.length).fill(!1), w = Array(n.series.length).fill(!1), T = Array(n.series.length).fill(!1), E = Array(n.series.length).fill(null), D = n.series.map(() => Array(g).fill(0)), O = /* @__PURE__ */ new Map();
	for (let e of b) {
		let t = e.valueAxis;
		O.set(t, (O.get(t) ?? !0) && e.grouping === "percentStacked");
	}
	for (let e of b) {
		let t = e.grouping ?? "standard", r = t === "stacked" || t === "percentStacked", i = t === "percentStacked", a = n.series.slice(e.seriesStart, e.seriesStart + e.seriesCount), o = i && O.get(e.valueAxis) === !0 ? 100 : 1, s = i ? h.map((e, t) => a.reduce((e, n) => e + Math.abs(n.values[t] ?? 0), 0) || 1) : null;
		for (let t = 0; t < a.length; t++) {
			let n = e.seriesStart + t;
			S[n] = r, w[n] = i, T[n] = e.valueAxis === "secondary", E[n] = s;
			for (let e = 0; e < g; e++) {
				let c = a[t].values[e] ?? 0;
				if (!r) {
					D[n][e] = c;
					continue;
				}
				let l = t === 0 ? 0 : D[n - 1][e], u = i && s ? c / s[e] * o : c;
				D[n][e] = l + u;
			}
		}
	}
	let A = (e, t) => D[e]?.[t] ?? 0, N = b.filter((e) => e.valueAxis !== "secondary"), F = N.length > 0 && N.every((e) => e.grouping === "percentStacked"), ee = n.dispBlanksAs ?? "gap", te = b.filter((e) => e.valueAxis === "secondary"), ne = te.length > 0 && te.every((e) => e.grouping === "percentStacked"), L = n.secondaryValAxis && n.series.some((e, t) => T[t] || n.plotGroups == null && e.useSecondaryAxis === !0) ? n.secondaryValAxis : null, re = new Map(n.series.map((e, t) => [e, t])), R = (e) => {
		let t = re.get(e) ?? -1;
		return L != null && (T[t] || n.plotGroups == null && e.useSecondaryAxis === !0);
	}, z = Infinity, B = -Infinity;
	for (let e = 0; e < g; e++) for (let t = 0; t < n.series.length; t++) {
		if (R(n.series[t]) || !S[t] && n.series[t].values[e] == null) continue;
		let r = A(t, e);
		z = Math.min(z, r), B = Math.max(B, r);
	}
	for (let e = 0; e < n.series.length; e++) {
		let t = n.series[e];
		R(t) || Pr(t, "y", (n) => t.values[n] == null ? null : A(e, n), (e) => {
			z = Math.min(z, e), B = Math.max(B, e);
		});
	}
	isFinite(z) || (z = 0, B = 1);
	let oe = n.valAxisLogBase != null && n.valAxisLogBase >= 2;
	n.valMin == null ? F && z > 0 && !oe && (z = 0) : z = F ? n.valMin * 100 : n.valMin, n.valMax == null ? F && B < 0 && (B = 0) : B = F ? n.valMax * 100 : n.valMax;
	let se = Hr(t, n, u, d, a), ce = se.fontPx, V = se.topPad, H = se.bandH, U = Kn(t, n, u, d, .22, a), { legRightW: le, legLeftW: ue, legTopH: de, legBottomH: pe } = Ie(U, n.legendOverlay === !0), W = Er(n.catAxisFontSizeHpt, d, a), me = Er(n.valAxisFontSizeHpt, d, a), he = i(n, u, d, a), ge = he.catFontPx, _e = he.valFontPx, ve = he.catBandH, ye = he.valBandW, be = mn(n), xe = gn(n, a), Ce = _n(t, n, a), we = H + de + me / 2 + 2, Te = (be ? xe : j(W, n.catAxisLabelOffsetPercent)) + ve + pe, Ee = d - we - Te, Oe = Fr(L, n.series, Ee / a, "y", ne, !1, (e, t) => T[t] || n.plotGroups == null && n.series[t].useSecondaryAxis === !0, (e, t, n) => !S[n] && e.values[t] == null ? null : A(n, t)), G = Math.max(8, Math.min(11, d / 20)), ke = M(L?.fontSizeHpt, a) ?? G, K = 0;
	if (L && Oe && !L.hidden) {
		let e = t.font;
		t.font = ln(ke, $(n, L.fontFace, "minor"), !1, L.fontItalic ?? !1);
		let r = 0;
		for (let e of Oe.majorLines) r = Math.max(r, t.measureText(gr(e, L.formatCode ?? null, n.date1904, L.displayUnits)).width);
		K = r + 18, t.font = e;
	}
	let Ae = L && L.title ? s(L.titleFontSizeHpt, a) + 8 : 0, je = ue + Math.max(me * 2.2 + 10 + ye, Ce), Me = le + u * .05 + K + Ae, Ne = yr(n, z, B, Ee / a, F), Pe = 0;
	if (!n.valAxisHidden && n.valAxisTickLabelPos !== "none" && n.plotAreaManualLayout != null && n.plotAreaManualLayout.layoutTarget !== "inner") {
		let e = t.font;
		t.font = ln(me, $(n, n.valAxisFontFace, "minor"), n.valAxisFontBold ?? !1, n.valAxisFontItalic ?? !1);
		for (let e of Ne.majorLines) Pe = Math.max(Pe, t.measureText(mr(n, e, F)).width);
		t.font = e;
	}
	let Fe = {
		t: we,
		r: Me,
		b: Te,
		l: je
	}, Le = k({
		valAxisHidden: n.valAxisHidden,
		catAxisHidden: n.catAxisHidden,
		valLabelWidth: Pe,
		valLabelFontPx: me,
		catLabelFontPx: W,
		valLabelGapPx: n.valAxisFontSizeHpt == null ? 6 : yt(me),
		catLabelGapPx: n.catAxisFontSizeHpt == null ? m(5, n.catAxisLabelOffsetPercent) : m(Re(W), n.catAxisLabelOffsetPercent),
		outerTextMarginPx: I * a,
		valTitleBandW: ye,
		catTitleBandH: ve,
		secondaryBandW: K + Ae
	}), ze = _(n, c, l, u, d, a, {
		titleBand: se,
		legendSideReserveFrac: .22,
		legendReserve: U,
		pad: Fe,
		honorPlotAreaManualLayout: !0,
		manualOuterInsets: Le
	}), Be = Hr(t, n, ze.plotRect.pw, d, a);
	Math.abs(Be.bandH - se.bandH) > .01 && (se = Be, ce = se.fontPx, V = se.topPad, H = se.bandH, we = H + de + me / 2 + 2, Fe.t = we, ze = _(n, c, l, u, d, a, {
		titleBand: se,
		legendSideReserveFrac: .22,
		legendReserve: U,
		pad: Fe,
		honorPlotAreaManualLayout: !0,
		manualOuterInsets: Le
	}));
	let { px0: q, py0: Ve, pw: He } = ze.plotRect, { ph: Ue } = ze.plotRect;
	if (Wr(t, n, n.titleManualLayout || !n.titleRichRuns?.length ? c : q, l, n.titleManualLayout || !n.titleRichRuns?.length ? u : He, d, l + V, ce), He <= 0 || Ue <= 0) return;
	let We = be ? vn(t, n, He / g, a) : null;
	We && We.totalHeight > xe && (Ue = Math.max(1, Ue - (We.totalHeight - xe))), rt(t, n, q, Ve, He, Ue, a, o);
	let Ge = yr(n, z, B, Ue / a, F);
	if (Ge.max - Ge.min === 0) return;
	let Ke = (e) => Ve + Ue - Ge.frac(e) * Ue, qe = Oe ? Oe.makeToY(Ve, Ue) : Ke, Je = (e) => R(e) ? qe : Ke, Ye = Ke(Oi(n, Ge.min, Ge.max)), J = L && Oe ? qe(Di(n.secondaryCatAxis?.crossesAt, n.secondaryCatAxis?.crosses, Oe.min, Oe.max)) : Ye, Xe = (e) => R(e) ? J : Ye, Y = ut(n.catAxisLineColor, n.catAxisLineWidthEmu, a), Qe = ut(n.valAxisLineColor, n.valAxisLineWidthEmu, a), $e = n.catAxisLineColor == null ? void 0 : Y.color, et = n.catAxisLineWidthEmu == null ? void 0 : Y.width, tt = n.valAxisLineColor == null ? void 0 : Qe.color, nt = n.valAxisLineWidthEmu == null ? void 0 : Qe.width, it = Nr(n, h), at = fe(n), ot = dr(n), st = it ? (e) => q + it.positions[e] * He : at ? (e) => q + ((ot ? g - 1 - e : e) + .5) / g * He : (e) => {
		let t = ot ? g - 1 - e : e;
		return q + (g === 1 ? He / 2 : t / (g - 1) * He);
	};
	if (!n.valAxisHidden) {
		t.font = ln(me, $(n, n.valAxisFontFace, "minor"), n.valAxisFontBold ?? !1, n.valAxisFontItalic ?? !1), t.textBaseline = "middle";
		let e = nr(n, a), r = rr(n, a);
		for (let e of Ge.minorLines) tr(t, q, He, Ke(e), !1, r);
		let i = fr(n), o = n.valAxisTickLabelPos !== "none";
		for (let r of Ge.majorLines) {
			let s = Ke(r);
			if (i && tr(t, q, He, s, r === 0, e), Zn(t, n.valAxisMajorTickMark, "val", q, s, tt, nt, !1, n.valAxisLineHidden, "major", a, n.valAxisLineDash), o) {
				t.fillStyle = n.valAxisFontColor ? `#${n.valAxisFontColor}` : "#555", t.textAlign = "right";
				let e = n.valAxisFontSizeHpt == null ? 6 : yt(me);
				t.fillText(mr(n, r, F), q - e, s);
			}
		}
		if (n.valAxisMinorTickMark && n.valAxisMinorTickMark !== "none") for (let e of Ge.minorTicks) Zn(t, n.valAxisMinorTickMark, "val", q, Ke(e), tt, nt, !1, n.valAxisLineHidden, "minor", a, n.valAxisLineDash);
	}
	if (L && Oe && Ir(t, L, Oe, qe, q, He, a), !n.catAxisHidden && or(n)) {
		let e = sr(n, a);
		t.strokeStyle = e.color, t.lineWidth = e.width;
		let r = e.dash.length > 0 && t.getLineDash ? t.getLineDash() : [];
		e.dash.length > 0 && t.setLineDash(e.dash);
		let i = it ? it.majorTicks.map((e) => e.fraction) : lr(n, g);
		for (let e of i) {
			let n = q + e * He;
			t.beginPath(), t.moveTo(n, Ve), t.lineTo(n, Ve + Ue), t.stroke();
		}
		e.dash.length > 0 && t.setLineDash(r);
	}
	!n.catAxisHidden && !n.catAxisLineHidden && Qn(t, q, Ye, q + He, Ye, Y.color, Y.width, n.catAxisLineDash), !n.valAxisHidden && !n.valAxisLineHidden && Qn(t, q, Ve, q, Ve + Ue, Qe.color, Qe.width, n.valAxisLineDash);
	let ct = it ? (it.categoryBandFractions[0] ?? 0) * He : at ? He / g : g > 1 ? He / (g - 1) : He, dt = new Map(n.series.map((e, t) => [e, t]));
	Ei(t, n, g, st, Je, Xe, (e, t) => {
		let n = dt.get(e);
		return n == null ? null : A(n, t);
	}, ct, a, o, "background");
	let ft = Math.max(1, 2.25 * a), pt = Math.max(2, 2.5 * a), mt = Er(n.dataLabelFontSizeHpt, d, a), ht = [];
	for (let i = 0; i < n.series.length; i++) {
		let s = n.series[i], p = S[i], m = E[i], _ = tn(s.dataPointOverrides), y = en(i, s), b = xa(s, i), T = Je(s), D = s.smooth === !0, O = [], k = [], j = () => {
			k.length > 0 && O.push(k), k = [];
		};
		for (let e = 0; e < g; e++) {
			if (s.sourceHidden?.[e] === !0) {
				j();
				continue;
			}
			if (!p && s.values[e] == null) {
				if (ee === "gap") {
					j();
					continue;
				}
				if (ee === "span") continue;
			}
			k.push({
				x: st(e),
				y: T(A(i, e)),
				index: e
			});
		}
		j();
		let M = {
			x: q,
			y: Ve,
			w: He,
			h: Ue
		};
		lt(n, i) ? on(t, n, s, O, D, !1, y, ft, a, M, o) : Se(t, e(s.chartexStyle), n.chartStyleRoles?.dataPointLine, b, M, a, (e) => {
			if (an(e, n, "dataPointLine", s, void 0, b, y, ft, a, M, o)) {
				e.beginPath();
				for (let t of O) t.length !== 0 && (e.moveTo(t[0].x, t[0].y), ha(e, t, D));
				e.stroke();
			}
		});
		let N = (e) => A(i, e);
		for (let e of s.errBars ?? []) va(t, s, ti(n, e), g, st, T, N, y);
		t.fillStyle = y;
		let F = s.showMarker !== !1 && s.markerSymbol !== "none", te = F || C(s), I = aa(n, s, i), ne = (s.dataLabelOverrides?.length ?? 0) > 0 || s.seriesDataLabels != null;
		ne && ht.push(() => {
			ba(t, s, h, g, st, T, N, Ue, a, n.date1904 ?? !1, p || ee === "zero", $(n, n.dataLabelFontFace, "minor"), n.dataLabelPosition ?? "r", {
				x: c,
				y: Ve,
				w: u,
				h: Ue
			}, {
				x: c,
				y: l,
				w: u,
				h: d
			}, w[i] && m ? (e) => (s.values[e] ?? 0) / m[e] : void 0, (e) => {
				if (!te) return 0;
				let t = _.get(e);
				return !I && !P(t) ? pt : f(s, t, "circle", F) === "none" ? 0 : (t?.markerSize ?? s.markerSize ?? 5) / 2 * a;
			}, (e) => $(n, e, "minor"), R(s) ? L?.displayUnits : n.valAxisDisplayUnits, (e) => v(i, e), (e) => qr(n, e, R(s) && Oe ? Oe.max : Ge.max), o);
		});
		for (let e = 0; e < g; e++) {
			if (s.sourceHidden?.[e] === !0 || !p && s.values[e] == null && ee !== "zero") continue;
			let r = A(i, e);
			if (te) {
				let i = _.get(e);
				if (I || P(i)) {
					let c = f(s, i, "circle", F);
					if (c !== "none") {
						let l = i?.markerSize ?? s.markerSize ?? 5, u = Ze(s, i, e, y), d = i?.markerLine ?? s.markerLine ?? null, f = i?.markerLineWidthEmu ?? s.markerLineWidthEmu;
						ia(t, n, s, i, e, st(e), T(r), c, l, u, d, a, f == null ? void 0 : De(f, a), x(s, i, e), o);
					}
				} else t.beginPath(), t.arc(st(e), T(r), pt, 0, Math.PI * 2), t.fill();
			}
		}
		n.showDataLabels && !ne && ht.push(() => {
			for (let e = 0; e < g; e++) {
				if (s.sourceHidden?.[e] === !0 || !p && s.values[e] == null && ee !== "zero") continue;
				let r = A(i, e), a = ie({
					showValue: !0,
					sourceValue: s.values[e] ?? 0,
					valueDivisor: hr(R(s) ? L?.displayUnits : n.valAxisDisplayUnits),
					formatCode: n.dataLabelFormatCode ?? s.valFormatCode ?? null,
					date1904: n.date1904
				});
				la(t, st(e), T(r), a, n.dataLabelPosition ?? "r", mt, n.dataLabelFontColor ?? void 0, n.dataLabelFontBold ?? !1, $(n, n.dataLabelFontFace, "minor"), te ? pt + 1 : 2, {
					x: q,
					y: Ve,
					w: He,
					h: Ue
				});
			}
		}), Cr(t, s, y, st, T, a, void 0, {
			chart: n,
			chartRect: r,
			plotRect: {
				x: q,
				y: Ve,
				w: He,
				h: Ue
			},
			shapeRotationDeg: o
		});
	}
	Ei(t, n, g, st, Je, Xe, (e, t) => {
		let n = dt.get(e);
		return n == null ? null : A(n, t);
	}, ct, a, o, "foreground");
	for (let e of ht) e();
	if (!n.catAxisHidden) {
		let e = n.catAxisFontColor ? `#${n.catAxisFontColor}` : "#555";
		t.fillStyle = e, t.textAlign = "center", t.textBaseline = "top", t.font = ln(W, $(n, n.catAxisFontFace, "minor"), n.catAxisFontBold ?? !1, n.catAxisFontItalic ?? !1);
		let r = Math.max(1, Math.floor(n.catAxisTickMarkSkip ?? 1)), i = it ? it.majorTicks.map((e) => q + e.fraction * He) : Array.from({ length: Math.ceil(g / r) }, (e, t) => st(t * r));
		for (let e of i) Zn(t, n.catAxisMajorTickMark, "cat", Ye, e, $e, et, !1, n.catAxisLineHidden, "major", a, n.catAxisLineDash);
		if (n.catAxisMinorTickMark && n.catAxisMinorTickMark !== "none" && it) for (let e of it.minorTicks) Zn(t, n.catAxisMinorTickMark, "cat", Ye, q + e.fraction * He, $e, et, !1, n.catAxisLineHidden, "minor", a, n.catAxisLineDash);
		let o = !be && kr(n), s = Math.max(1, Math.floor(n.catAxisTickLabelSkip ?? 1)), c = jr(n), l = it ? it.majorTicks.map((e) => ({
			label: p(String(e.serial), n.catAxisFormatCode, n.date1904),
			x: q + e.fraction * He,
			categoryIndex: -1
		})) : Array.from({ length: Math.ceil(g / s) }, (e, t) => {
			let r = t * s;
			return {
				label: p((h[r] ?? "").toString(), n.catAxisFormatCode, n.date1904),
				x: st(r),
				categoryIndex: r
			};
		});
		for (let r of l) {
			let i = r.categoryIndex < 0 ? null : ae(r.categoryIndex, g, fe(n), dr(n), n.catAxisLabelAlignment), a = i ? q + i.fraction * He : r.x;
			if (!o) continue;
			t.textAlign = i?.textAlign ?? "center", t.fillStyle = e;
			let s = r.label;
			if (!s) continue;
			let l = m(n.catAxisFontSizeHpt == null ? 5 : Re(W), n.catAxisLabelOffsetPercent), u = n.catAxisTickLabelPos ?? "nextTo";
			Mr(t, s, a, (u === "nextTo" ? Ye : u === "high" ? Ve : Ve + Ue) + l, c);
		}
	}
	if (L && Oe) {
		let e = n.valAxisFontColor ? `#${n.valAxisFontColor}` : "#555";
		Lr(t, n, L, Oe, qe, r, q, Ve, He, Ue, a, ke, K, e, n.date1904);
	}
	We && yn(t, n, We, q, Ve + Ue, He, c + ue, a), Yn(t, n, U, c, l, u, d, q, Ve, He, Ue, H + 2, a), pn(t, n, c, l, u, d, q, Ve, He, Ue, ue, pe, ge, _e);
}
function Ai(t, r, a, o, c = 0) {
	let { x: l, y: u, w: d, h } = a, g = Gr(r), v = g.length;
	if (v === 0) return;
	let y = kn(r, o), b = r.plotGroups?.find((e) => e.kind === "stock"), S = b ? r.series.slice(b.seriesStart, b.seriesStart + b.seriesCount) : r.series, w = r.plotGroups == null ? [] : r.plotGroups.filter((e) => e.kind === "line").flatMap((e) => r.series.slice(e.seriesStart, e.seriesStart + e.seriesCount)), T = [...S, ...w], E = new Map(r.series.map((e, t) => [e, t])), D = S.length >= 4, O = D ? 0 : -1, k = +!!D, A = D ? 2 : 1, N = D ? 3 : 2, P = S[k], F = S[A], ee = S[N], te = O >= 0 ? S[O] : void 0, I = S[0], ne = S.at(-1), L = r.secondaryValAxis && T.some((e) => e.useSecondaryAxis === !0) ? r.secondaryValAxis : null, re = (e) => L != null && e.useSecondaryAxis === !0, R = Hr(t, r, d, h, o), z = R.fontPx, ie = R.topPad, B = R.bandH, oe = Kn(t, r, d, h, .22, o), { legRightW: se, legLeftW: ce, legBottomH: V, legTopH: H } = Ie(oe, r.legendOverlay === !0), U = Er(r.catAxisFontSizeHpt, h, o), le = Er(r.valAxisFontSizeHpt, h, o), ue = i(r, d, h, o), de = ue.catFontPx, pe = ue.valFontPx, W = ue.catBandH, me = ue.valBandW, he = mn(r), ge = gn(r, o), _e = _n(t, r, o), ve = B + H + le / 2 + 2, ye = (he ? ge : j(U, r.catAxisLabelOffsetPercent)) + W + V, be = Fr(L, T, (h - ve - ye) / o), xe = Math.max(8, Math.min(11, h / 20)), Ce = M(L?.fontSizeHpt, o) ?? xe, we = 0;
	if (L && be && !L.hidden) {
		let e = t.font;
		t.font = ln(Ce, $(r, L.fontFace, "minor"), L.fontBold ?? !1, L.fontItalic ?? !1);
		let n = 0;
		for (let e of be.majorLines) n = Math.max(n, t.measureText(gr(e, L.formatCode ?? null, r.date1904, L.displayUnits)).width);
		we = n + 18, t.font = e;
	}
	let Te = L?.title ? s(L.titleFontSizeHpt, o) + 8 : 0, Ee = {
		t: ve,
		r: se + d * .05 + we + Te,
		b: ye,
		l: ce + Math.max(le * 2.2 + 10 + me, _e)
	};
	Wr(t, r, l, u, d, h, u + ie, z);
	let Oe = _(r, l, u, d, h, o, {
		titleBand: R,
		legendSideReserveFrac: .22,
		legendReserve: oe,
		pad: Ee,
		honorPlotAreaManualLayout: !0
	}), { px0: G, py0: ke, pw: K } = Oe.plotRect, { ph: Ae } = Oe.plotRect;
	if (K <= 0 || Ae <= 0) return;
	let je = he ? vn(t, r, K / v, o) : null;
	je && je.totalHeight > ge && (Ae = Math.max(1, Ae - (je.totalHeight - ge))), rt(t, r, G, ke, K, Ae, o, c);
	let Me = Infinity, Ne = -Infinity;
	for (let e of T) if (!re(e)) for (let t = 0; t < v; t++) {
		let n = e.values[t];
		n != null && (Me = Math.min(Me, n), Ne = Math.max(Ne, n));
	}
	for (let e of T) re(e) || Pr(e, "y", (t) => e.values[t] ?? null, (e) => {
		Me = Math.min(Me, e), Ne = Math.max(Ne, e);
	});
	isFinite(Me) || (Me = 0, Ne = 1), r.valMin != null && (Me = r.valMin), r.valMax != null && (Ne = r.valMax);
	let Pe = yr(r, Me, Ne, Ae / o);
	if (Pe.max - Pe.min === 0) return;
	let Fe = (e) => ke + Ae - Pe.frac(e) * Ae, Le = be?.makeToY(ke, Ae) ?? Fe, Re = (e) => re(e) ? Le : Fe, ze = fe(r), Be = dr(r), q = Nr(r, g), Ve = q ? (e) => G + q.positions[e] * K : ze ? (e) => G + ((Be ? v - 1 - e : e) + .5) / v * K : (e) => {
		let t = Be ? v - 1 - e : e;
		return G + (v === 1 ? K / 2 : t / (v - 1) * K);
	};
	if (!r.valAxisHidden) {
		t.font = ln(le, $(r, r.valAxisFontFace, "minor"), r.valAxisFontBold ?? !1, r.valAxisFontItalic ?? !1), t.textBaseline = "middle";
		let e = nr(r, o), n = rr(r, o);
		for (let e of Pe.minorLines) tr(t, G, K, Fe(e), !1, n);
		let i = fr(r), a = r.valAxisTickLabelPos !== "none";
		for (let n of Pe.majorLines) {
			let s = Fe(n);
			i && tr(t, G, K, s, n === 0, e), Zn(t, r.valAxisMajorTickMark, "val", G, s, void 0, void 0, !1, r.valAxisLineHidden, "major", o, r.valAxisLineDash), a && (t.fillStyle = r.valAxisFontColor ? `#${r.valAxisFontColor}` : "#555", t.textAlign = "right", t.fillText(mr(r, n, !1), G - 6, s));
		}
		for (let e of Pe.minorTicks) Zn(t, r.valAxisMinorTickMark, "val", G, Fe(e), void 0, void 0, !1, r.valAxisLineHidden, "minor", o, r.valAxisLineDash);
	}
	L && be && Ir(t, L, be, Le, G, K, o);
	let He = ut(r.catAxisLineColor, r.catAxisLineWidthEmu, o), Ue = ut(r.valAxisLineColor, r.valAxisLineWidthEmu, o);
	if (!r.catAxisHidden && !r.catAxisLineHidden && Qn(t, G, ke + Ae, G + K, ke + Ae, He.color, He.width, r.catAxisLineDash), !r.valAxisHidden && !r.valAxisLineHidden && Qn(t, G, ke, G, ke + Ae, Ue.color, Ue.width, r.valAxisLineDash), r.stockDropLines) {
		let e = r.stockAutomaticStyle ? {
			lineColors: [r.stockAutomaticStyle.lineColor],
			linePaintAuthored: !0,
			lineWidthEmu: r.stockAutomaticStyle.lineWidthEmu
		} : void 0, n = Qr(r, r.stockDropLines, "dropLine", e);
		(n.paintAuthored !== !0 || n.color != null) && (n.color != null || n.widthEmu != null || n.dash != null) && Zr(t, n, o) && ei(t, S, v, Ve, (e) => Re(e), () => ke + Ae, (e, t) => e.values[t] ?? null);
	}
	if (r.stockHiLowLines === !0 && P != null && F != null && P && F) {
		let e = Qr(r, r.stockHiLowLineStyle ?? { color: r.stockHiLowLineColor ?? null }, "hiLoLine", r.stockAutomaticStyle ? {
			lineColors: [r.stockAutomaticStyle.lineColor],
			linePaintAuthored: !0,
			lineWidthEmu: r.stockAutomaticStyle.lineWidthEmu
		} : void 0);
		if ((e.paintAuthored !== !0 || e.color != null) && (e.color != null || e.widthEmu != null || e.dash != null) && Zr(t, e, o)) for (let e = 0; e < v; e++) {
			let n = P.values[e], r = F.values[e];
			if (n == null || r == null) continue;
			let i = Ve(e), a = Re(P), o = Re(F);
			t.beginPath(), t.moveTo(i, a(n)), t.lineTo(i, o(r)), t.stroke();
		}
	}
	let We = (i, a, s) => {
		if (!i) return;
		let l = E.get(i) ?? a, u = en(l, i), d = xa(i, l), f = tn(i.dataPointOverrides), p = i.markerSymbol != null && i.markerSymbol !== "none" && n(i), m = Math.max(3, K / v * .22);
		for (let n = 0; n < v; n++) {
			let a = i.values[n];
			if (a == null) continue;
			let l = Ve(n), h = Re(i)(a), g = f.get(n);
			if (g?.markerSymbol === "none" || g?.markerSymbol == null && i.markerSymbol === "none") continue;
			if (p || g?.markerSymbol != null && g.markerSymbol !== "none") {
				let e = g?.markerSymbol ?? i.markerSymbol ?? "circle";
				ia(t, r, i, g, n, l, h, e, g?.markerSize ?? i.markerSize ?? 3, Ze(i, g, n, u), g?.markerLine ?? i.markerLine ?? null, o, (g?.markerLineWidthEmu ?? i.markerLineWidthEmu) == null ? void 0 : De(g?.markerLineWidthEmu ?? i.markerLineWidthEmu, o), x(i, g, n), c);
				continue;
			}
			let _ = s === "right" ? l : s === "left" ? l - m : l - m / 2, v = s === "right" ? l + m : s === "left" ? l : l + m / 2;
			Se(t, e(g?.chartexStyle, i.chartexStyle), r.chartStyleRoles?.dataPointLine, d, {
				x: _,
				y: h,
				w: v - _,
				h: 0
			}, o, (e) => {
				an(e, r, "dataPointLine", i, g, d, u, Math.max(1, .75 * o), o, {
					x: G,
					y: ke,
					w: K,
					h: Ae
				}, c) && (e.beginPath(), e.moveTo(_, h), e.lineTo(v, h), e.stroke());
			});
		}
	};
	for (let n of w) {
		let i = E.get(n) ?? 0, s = en(Math.max(0, i), n), l = Re(n), u = tn(n.dataPointOverrides), d = xa(n, i), p = lt(r, i), m = [], h = [], g = () => {
			h.length > 0 && m.push(h), h = [];
		};
		for (let e = 0; e < v; e++) {
			let t = n.values[e];
			if (t == null) {
				g();
				continue;
			}
			h.push({
				x: Ve(e),
				y: l(t),
				index: e
			});
		}
		g(), p ? on(t, r, n, m, n.smooth === !0, !1, s, Math.max(1, 2.25 * o), o, {
			x: G,
			y: ke,
			w: K,
			h: Ae
		}, c) : Se(t, e(n.chartexStyle), r.chartStyleRoles?.dataPointLine, d, {
			x: G,
			y: ke,
			w: K,
			h: Ae
		}, o, (e) => {
			if (e.save(), an(e, r, "dataPointLine", n, void 0, d, s, Math.max(1, 2.25 * o), o, {
				x: G,
				y: ke,
				w: K,
				h: Ae
			}, c)) {
				e.beginPath();
				for (let t of m) e.moveTo(t[0].x, t[0].y), ha(e, t, n.smooth === !0);
				e.stroke();
			}
			e.restore();
		});
		let _ = n.showMarker !== !1 && n.markerSymbol !== "none";
		if (_ || C(n)) for (let e = 0; e < v; e++) {
			let i = n.values[e];
			if (i == null) continue;
			let a = u.get(e), d = f(n, a, "circle", _);
			d !== "none" && ia(t, r, n, a, e, Ve(e), l(i), d, a?.markerSize ?? n.markerSize ?? 5, Ze(n, a, e, s), a?.markerLine ?? n.markerLine ?? null, o, (a?.markerLineWidthEmu ?? n.markerLineWidthEmu) == null ? void 0 : De(a?.markerLineWidthEmu ?? n.markerLineWidthEmu, o), x(n, a, e), c);
		}
		Cr(t, n, s, Ve, l, o, void 0, {
			chart: r,
			chartRect: a,
			plotRect: {
				x: G,
				y: ke,
				w: K,
				h: Ae
			},
			shapeRotationDeg: c
		});
	}
	if (r.stockUpDownBars && I && ne) {
		let e = r.stockUpDownBarStyle ?? {
			gapWidthPercent: 150,
			up: {},
			down: {}
		}, n = {
			...e,
			up: $r(r, e.up, "upBar", r.stockAutomaticStyle ?? void 0),
			down: $r(r, e.down, "downBar", r.stockAutomaticStyle ?? void 0)
		}, i = q ? (q.categoryBandFractions[0] ?? 0) * K : ze ? K / v : v > 1 ? K / (v - 1) : K;
		Ti(t, (e) => I.values[e] ?? null, (e) => ne.values[e] ?? null, v, Ve, Re(I), Re(ne), i, n, o, void 0, c);
	}
	We(te, O, "left"), (P?.markerSymbol != null || P && C(P)) && We(P, k, "both"), (F?.markerSymbol != null || F && C(F)) && We(F, A, "both"), We(ee, N, "right");
	for (let e of T) {
		let n = en(E.get(e) ?? 0, e);
		for (let i of e.errBars ?? []) va(t, e, ti(r, i), v, Ve, Re(e), (t) => e.values[t] ?? 0, n);
	}
	if (S.length < 3) for (let e = 0; e < S.length; e++) We(S[e], e, "both");
	for (let e of T) {
		let n = E.get(e) ?? 0;
		ca(t, e, g, !0, Ve, Re(e), Ae, o, r.date1904, $(r, r.dataLabelFontFace, "minor"), r.dataLabelPosition ?? "r", {
			x: G,
			y: ke,
			w: K,
			h: Ae
		}, a, (e) => $(r, e, "minor"), re(e) ? L?.displayUnits : r.valAxisDisplayUnits, (e) => y(n, e), (t) => qr(r, t, re(e) ? be?.max ?? Pe.max : Pe.max), c);
	}
	if (!r.catAxisHidden) {
		let e = Math.max(1, Math.floor(r.catAxisTickLabelSkip ?? 1)), n = r.catAxisFontColor ? `#${r.catAxisFontColor}` : "#555";
		t.fillStyle = n, t.textAlign = "center", t.textBaseline = "top", t.font = ln(U, $(r, r.catAxisFontFace, "minor"), r.catAxisFontBold ?? !1, r.catAxisFontItalic ?? !1);
		let i = q ? (q.categoryBandFractions[0] ?? 0) * K - 4 : K / v * e - 4, a = !he && kr(r), s = jr(r), c = q && q.majorTicks.length > 0 ? q.majorTicks.map((e) => ({
			label: p(String(e.serial), r.catAxisFormatCode, r.date1904),
			x: G + e.fraction * K,
			categoryIndex: -1
		})) : Array.from({ length: Math.ceil(v / e) }, (t, n) => {
			let i = n * e;
			return {
				label: p((g[i] ?? "").toString(), r.catAxisFormatCode, r.date1904),
				x: Ve(i),
				categoryIndex: i
			};
		});
		for (let e of c) {
			let c = e.categoryIndex < 0 ? null : ae(e.categoryIndex, v, fe(r), dr(r), r.catAxisLabelAlignment), l = c ? G + c.fraction * K : e.x;
			if (Zn(t, r.catAxisMajorTickMark, "cat", ke + Ae, l, He.color, He.width, !1, r.catAxisLineHidden, "major", o, r.catAxisLineDash), !a) continue;
			t.textAlign = c?.textAlign ?? "center", t.fillStyle = n;
			let u = e.label;
			Mr(t, At(t, u, s === 0 ? i : Ae * .4), l, ke + Ae + m(5, r.catAxisLabelOffsetPercent), s);
		}
		if (r.catAxisMinorTickMark && r.catAxisMinorTickMark !== "none" && q) for (let e of q.minorTicks) Zn(t, r.catAxisMinorTickMark, "cat", ke + Ae, G + e.fraction * K, void 0, void 0, !1, r.catAxisLineHidden, "minor", o, r.catAxisLineDash);
	}
	if (L && be) {
		let e = r.valAxisFontColor ? `#${r.valAxisFontColor}` : "#555";
		Lr(t, r, L, be, Le, a, G, ke, K, Ae, o, Ce, we, e, r.date1904);
	}
	je && yn(t, r, je, G, ke + Ae, K, l + ce, o), Yn(t, r, oe, l, u, d, h, G, ke, K, Ae, B + 2, o), pn(t, r, l, u, d, h, G, ke, K, Ae, ce, V, de, pe);
}
var ji = (e) => e[0] + e[2] > e[1] + e[3] ? [[
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
]], Mi = 2e5, Ni = 1.25;
function Pi(e, t, n) {
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
function Fi(e, n, r, i, a = 0) {
	let { x: o, y: s, w: c, h: l } = r, u = Gr(n), d = n.series, f = u.length, p = d.length;
	if (f < 2 || p < 2) return;
	let h = Infinity, g = -Infinity;
	for (let e of d) for (let t = 0; t < f; t++) {
		let n = e.values[t];
		n == null || !Number.isFinite(n) || (h = Math.min(h, n), g = Math.max(g, n));
	}
	if (!Number.isFinite(h) || !Number.isFinite(g)) return;
	n.valMin != null && (h = n.valMin), n.valMax != null && (g = n.valMax);
	let v = {
		...n.threeD ?? {},
		rotationX: n.threeD?.rotationX ?? 15,
		rotationY: n.threeD?.rotationY ?? 20,
		rightAngleAxes: n.threeD?.rightAngleAxes ?? !1,
		perspective: n.threeD?.perspective ?? 30
	}, y = Mt(v), b = Ot(v), x = jt(v, r, {
		sceneDepthScale: Ni,
		perspectiveTangentGain: b
	}), S;
	if (x) {
		let e = x.topology.axisX === "min" ? x.front.x : x.front.x + x.front.w, t = x.project(e, x.front.y + x.front.h, x.topology.nearDepth), n = x.project(e, x.front.y, x.topology.nearDepth);
		S = Math.hypot(n.x - t.x, n.y - t.y) / i;
	}
	let C = n.valAxisMajorUnit == null ? Rt(h, g, S) : null, w = yr(C == null ? n : {
		...n,
		valAxisMajorUnit: C
	}, h, g, S), T = w.step;
	if (!(T > 0) || !Number.isFinite(T)) return;
	let E = n.valMin ?? w.min, D = n.valMax ?? Math.max(E + T, E + Math.ceil((g - E) / T) * T), O = D - E;
	if (!(O > 0) || !Number.isFinite(O)) return;
	let k = Math.ceil(O / T), A = Math.floor(O / T + 1e-9) + 1, P = (f - 1) * (p - 1) * 2;
	if (!Number.isSafeInteger(k) || !Number.isSafeInteger(A) || k < 1 || A < 2 || P < 1 || k > 512 || A > 512 || k > Math.floor(Mi / P) || A > Mi) return;
	let F = k, ee = ur(n) ? (e) => 1 - (e - E) / O : (e) => (e - E) / O, te = Array.from({ length: A }, (e, t) => E + t * T), I = (e, t) => {
		let n = Math.min(e, t), r = Math.max(e, t), i = Math.max(1, Math.floor((n - E) / T) + 1), a = Math.min(F - 1, Math.ceil((r - E) / T) - 1), o = [0];
		if (e !== t) for (let n = i; n <= a; n++) o.push((E + n * T - e) / (t - e));
		return o.push(1), o.sort((e, t) => e - t), o;
	}, ne = Array.from({ length: F }, (e, t) => n.themeAccentColors?.[t % 6] ? `#${n.themeAccentColors[t % 6]}` : d[t]?.color ? `#${d[t].color}` : en(t, d[t])), L = new Map((n.surfaceBandFormats ?? []).map((e) => [e.idx, e])), z = n.linkedChartStyleRoles?.dataPoint3D ?? (n.classicChartStyleRoles == null ? n.chartStyleRoles?.dataPoint3D : void 0), ie = F <= 48 ? n.classicSurfaceBandStyles?.byBandCount?.[F - 1] ?? n.classicSurfaceBandStyles?.fixed : void 0, B = Te(ie, z), ce = n.linkedChartStyleRoles?.dataPointWireframe ?? (n.classicChartStyleRoles == null ? n.chartStyleRoles?.dataPointWireframe : void 0), H = Te(ie, ce), U = (e) => e?.lineNoStyle !== !0 && (e?.linePaintAuthored === !0 || e?.lineHidden === !0 || (e?.lineColors?.length ?? 0) > 0 || (e?.linePaints?.length ?? 0) > 0), de = n.surfaceWireframe === !0 ? [] : Array.from({ length: F }, (e, t) => {
		let n = L.get(t), r, i = !0;
		if (n?.fillHidden === !0) r = N(z), r !== void 0 && (i = !1);
		else if (n?.fill) r = n.fill, i = !1;
		else {
			let e = V(n?.style, z, t);
			e === void 0 ? r = at(z, t) : (r = e, i = !1);
		}
		return r === void 0 && n?.fillHidden === !0 && (r = at(z, t)), r === void 0 && (r = at(ie, t)), {
			recipe: r,
			fromRole: i
		};
	}), pe = de.map((e) => e.recipe), W = n.surfaceWireframe === !0 ? [] : Array.from({ length: F }, (e, n) => {
		let r = L.get(n), i;
		return i = r?.lineHidden === !0 ? t(z) : r?.lineColor ? {
			fillType: "solid",
			color: r.lineColor
		} : et(z, z, n, r?.style), i === void 0 && r?.lineHidden === !0 && (i = Pe(z, n)), i === void 0 && (i = Pe(ie, n)), i;
	}), he = (e, t) => {
		let n = e, r = n?.lineDashAuthored === !0 || n?.lineDash != null || n?.lineCustomDash != null;
		return {
			lineWidthEmu: n?.lineWidthEmu ?? t.lineWidthEmu,
			lineDash: r ? n?.lineDash : t.lineDash,
			lineCustomDash: r ? n?.lineCustomDash : t.lineCustomDash,
			lineCap: n?.lineCap ?? t.lineCap,
			lineJoin: n?.lineJoin ?? t.lineJoin,
			lineCompound: n?.lineCompound ?? t.lineCompound
		};
	}, ge = H?.lineColorIndex, _e;
	_e = U(H) ? H?.lineHidden === !0 ? Pe(H, 0) : ge == null ? void 0 : ge == null ? null : Pe(H, ge) : void 0;
	let ve = ge == null && U(H) && H?.lineHidden !== !0 ? Array.from({ length: F }, (e, t) => Pe(H, t)) : [], ye = H == null ? {
		paint: void 0,
		lineWidthEmu: void 0,
		lineDash: void 0,
		lineCustomDash: void 0,
		lineCap: void 0,
		lineJoin: void 0,
		lineCompound: void 0
	} : {
		paint: _e,
		lineWidthEmu: H?.lineWidthEmu,
		lineDash: H?.lineDash,
		lineCustomDash: H?.lineCustomDash,
		lineCap: H?.lineCap,
		lineJoin: H?.lineJoin,
		lineCompound: H?.lineCompound
	}, be = d[0], xe;
	xe = be?.lineHidden === !0 ? t(ce) : be?.lineColor == null ? ue(be?.chartexStyle, ce, 0) : {
		fillType: "solid",
		color: be.lineColor
	};
	let Se = he(be?.chartexStyle, ye), Ce = {
		paint: xe === void 0 ? _e : xe,
		...Se,
		lineWidthEmu: be?.lineWidthEmu ?? Se.lineWidthEmu
	};
	Ce.lineCompound != null && Ce.lineCompound !== "sng" && (Ce.paint = null);
	let we = Array.from({ length: F }, (e, n) => {
		let r = L.get(n);
		if (r) return r.lineHidden === !0 ? t(ce) : r.lineColor == null ? ue(r.style, ce, n) : {
			fillType: "solid",
			color: r.lineColor
		};
	}), Ee = we.map((e, t) => {
		let n = L.get(t), r = he(n?.style, Ce), i = xe === void 0 ? ve[t] ?? Ce.paint : xe, a = {
			paint: e === void 0 ? i : e,
			...r,
			lineWidthEmu: n?.lineWidthEmu ?? r.lineWidthEmu
		};
		return a.lineCompound != null && a.lineCompound !== "sng" && (a.paint = null), a;
	}), Oe = (e, t) => e.paint !== void 0 && e.paint === t.paint && e.lineWidthEmu === t.lineWidthEmu && e.lineDash === t.lineDash && e.lineCustomDash === t.lineCustomDash && e.lineCap === t.lineCap && e.lineJoin === t.lineJoin && e.lineCompound === t.lineCompound, ke = (e, t) => {
		let n = I(e, t), r = [];
		for (let i = 0; i < n.length - 1; i++) {
			let a = n[i], o = n[i + 1], s = e + (t - e) * ((a + o) / 2), c = Math.max(0, Math.min(F - 1, Math.floor((s - E) / T))), l = r[r.length - 1];
			l && we[l.band] === void 0 && we[c] === void 0 && Oe(Ee[l.band], Ee[c]) ? l.to = o : r.push({
				from: a,
				to: o,
				band: c
			});
		}
		return r;
	};
	if (n.surfaceWireframe === !0) {
		let e = 0, t = (t, n) => t == null || n == null || !Number.isFinite(t) || !Number.isFinite(n) ? !0 : (e += ke(t, n).length, e <= Mi);
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
			for (let t of ji(i)) {
				let n = Math.min(...t.map((e) => i[e])), r = Math.max(...t.map((e) => i[e])), a = Math.max(1, Math.floor((n - E) / T) + 1), o = Math.min(F - 1, Math.ceil((r - E) / T) - 1);
				if (!(o < a) && (e += o - a + 1, e > Mi)) return;
			}
		}
	}
	let K = we.some((e) => e === void 0) && (xe !== void 0 || ve.length === 0), Ae = [
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
	].map(({ surface: e, role: t }) => me(n, e, t)), je = 0;
	for (let e of [
		...pe,
		...W,
		...n.surfaceWireframe === !0 && K ? [Ce.paint] : [],
		...n.surfaceWireframe === !0 ? ve : [],
		...n.surfaceWireframe === !0 ? we.filter((e) => e !== void 0) : [],
		...Ae.flatMap((e) => [e.fill, e.line])
	]) {
		if (e == null) continue;
		let t = le(e);
		if (e.fillType === "gradient" && t > La || t > Ra - je) return;
		je += t;
	}
	let Ne = Array.from({ length: F }, (e, t) => {
		let n = E + t * T, r = Math.min(D, n + T);
		return `${re(n)}-${re(r)}`;
	}), Fe = {
		...n,
		series: Ne.map((e, t) => {
			let n = pe[t], r = W[t];
			return {
				name: e,
				color: n === null ? "00000000" : n?.fillType === "solid" ? n.color.replace(/^#/, "") : ne[t].replace(/^#/, ""),
				...r?.fillType === "solid" ? { lineColor: r.color.replace(/^#/, "") } : r === null ? { lineHidden: !0 } : {},
				values: []
			};
		})
	}, Le = [...pe];
	Math.abs(v.rotationX) === 90 && (Fe.series.reverse(), Le.reverse());
	let Re = Kn(e, Fe, c, l, .22, i), { legRightW: ze, legLeftW: Be, legTopH: q, legBottomH: Ve } = Ie(Re, n.legendOverlay === !0), He = Hr(e, n, c, l, i), Ue = Er(n.catAxisFontSizeHpt, l, i), We = n.threeD?.seriesAxis, Ge = M(We?.fontSizeHpt, i) ?? Ue, { px0: Ke, py0: qe, pw: Je, ph: Ye } = _(n, o, s, c, l, i, {
		titleBand: He,
		legendSideReserveFrac: .22,
		legendReserve: Re,
		pad: {
			t: He.bandH + q + Ge / 2,
			r: ze + Ge * 3.2 + 12,
			b: j(Ue, n.catAxisLabelOffsetPercent) + Ve,
			l: Be + Ue * 1.5
		},
		honorPlotAreaManualLayout: !0
	}).plotRect;
	if (!(Je > 0) || !(Ye > 0)) return;
	Wr(e, n, n.titleManualLayout || !n.titleRichRuns?.length ? o : Ke, s, n.titleManualLayout || !n.titleRichRuns?.length ? c : Je, l, s + He.topPad, He.fontPx), rt(e, n, Ke, qe, Je, Ye, i, a);
	let J = jt(v, {
		x: Ke,
		y: qe,
		w: Je,
		h: Ye
	}, {
		sceneDepthScale: Ni,
		perspectiveTangentGain: b
	});
	if (!J) return;
	J = Pt(J, n.threeD ?? {}, {
		x: Ke,
		y: qe,
		w: Je,
		h: Ye
	});
	let Xe = y || Math.abs(v.rotationX) === 90 && v.rotationY === 0 && v.rightAngleAxes === !1 && v.perspective === 0, { front: Y } = J, Ze = n.catAxisOrientation === "maxMin", Qe = fe(n), $e = (e) => Y.x + se(e, f, Qe, Ze) * Y.w, tt = We?.orientation === "maxMin", nt = (e) => se(e, p, !1, tt), it = (e) => Y.y + Y.h - ee(e) * Y.h, st = [], ct = [], lt = (e, t) => {
		let n = (n) => ({
			x: e.x + (t.x - e.x) * n,
			y: e.y + (t.y - e.y) * n,
			depth: e.depth + (t.depth - e.depth) * n,
			value: e.value + (t.value - e.value) * n
		});
		for (let r of ke(e.value, t.value)) {
			let e = n(r.from), t = n(r.to);
			ct.push({
				points: [J.project(e.x, e.y, e.depth), J.project(t.x, t.y, t.depth)],
				band: r.band
			});
		}
	}, ut = (e) => {
		let t = Math.min(...e.map((e) => e.value)), n = Math.max(...e.map((e) => e.value)), r = Math.max(1, Math.floor((t - E) / T) + 1), i = Math.min(F - 1, Math.ceil((n - E) / T) - 1);
		for (let t = r; t <= i; t++) {
			let n = E + t * T, r = [], i = (e) => {
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
			r.length === 2 && ct.push({
				points: [J.project(r[0].x, r[0].y, r[0].depth), J.project(r[1].x, r[1].y, r[1].depth)],
				band: t - 1
			});
		}
	}, dt = (e) => {
		if (n.surfaceWireframe === !0) {
			ut(e);
			return;
		}
		let t = Math.min(...e.map((e) => e.value)), r = Math.max(...e.map((e) => e.value)), i = Math.max(0, Math.floor((t - E) / T)), a = Math.min(F - 1, Math.floor((r - E) / T));
		for (let t = i; t <= a; t++) {
			let n = E + t * T, r = t === F - 1 ? D : n + T, i = Pi(e, n, !0);
			if (i = Pi(i, r, !1), i.length < 3) continue;
			let a = i.map((e) => J.project(e.x, e.y, e.depth));
			st.push({
				points: a,
				scenePoints: i,
				band: t,
				depth: i.reduce((e, t) => e + J.cameraDepth(t.x, t.y, t.depth), 0) / i.length
			});
		}
	};
	e.save(), e.beginPath(), e.rect(Ke, qe, Je, Ye), e.clip();
	let pt = (t, n, r, i, a = !1) => {
		if (t.length < 2) return;
		let o = a ? t.map((e) => J.projectUnbounded(e.x, e.y, e.depth)) : t.map((e) => J.project(e.x, e.y, e.depth));
		e.beginPath(), e.moveTo(o[0].x, o[0].y);
		for (let t = 1; t < o.length; t++) e.lineTo(o[t].x, o[t].y);
		e.strokeStyle = n, e.lineWidth = r, e.setLineDash(_t(i ?? "solid", r)), e.stroke();
	}, mt = J.topology.farDepth, gt = J.topology.nearDepth, vt = Y.y + Y.h, yt = Y.y, bt = J.topology.farX === "min" ? Y.x : Y.x + Y.w, xt = [
		"floor",
		"sideWall",
		"backWall"
	].map((e) => {
		let t = n.threeD?.[e];
		return Tt(J, e, t?.thicknessPercent);
	}), St = [
		"floor",
		"sideWall",
		"backWall"
	], wt = (e, t, n, r, i, a) => {
		let o = xt[e], s = St[e];
		for (let e of Ft(o, s, t, n)) o.thickness > 0 && !J.cameraFacing(o.faces[e.faceIndex]) || pt(e.scenePoints, r, i, a, !0);
	}, Et = (e, t, n, r) => {
		for (let i of e) {
			let e = ee(i);
			wt(1, "y", e, t, n, r), wt(2, "y", e, t, n, r);
		}
	}, kt = (e, t, n, r) => {
		for (let i of e) wt(0, "x", i, t, n, r), wt(2, "x", i, t, n, r);
	}, At = xt.some((e) => e.thickness > 0) ? xt.map((e) => e.faces.filter((t) => e.thickness === 0 || J.cameraFacing(t)).map((e) => e.map((e) => J.projectUnbounded(e.x, e.y, e.depth)))) : [
		[
			J.project(Y.x, vt, gt),
			J.project(Y.x + Y.w, vt, gt),
			J.project(Y.x + Y.w, vt, mt),
			J.project(Y.x, vt, mt)
		],
		[
			J.project(bt, vt, gt),
			J.project(bt, vt, mt),
			J.project(bt, yt, mt),
			J.project(bt, yt, gt)
		],
		[
			J.project(Y.x, vt, mt),
			J.project(Y.x + Y.w, vt, mt),
			J.project(Y.x + Y.w, yt, mt),
			J.project(Y.x, yt, mt)
		]
	].map((e) => [e]);
	for (let t = 0; t < At.length; t++) {
		let r = At[t];
		if (!r.length) continue;
		let a = r.flat(), o = Ae[t], s = o.fill?.fillType === "image" ? o.fill : null;
		if (s) {
			let r = Me(s), i = n.threeD?.[St[t]];
			r && Ct(e, s, r, i, St[t], xt[t], xt[t].faces.map((e, t) => ({
				face: e,
				faceIndex: t
			})).filter(({ face: e }) => xt[t].thickness === 0 || J.cameraFacing(e)).map(({ faceIndex: e }) => e), (e) => J.projectUnbounded(e.x, e.y, e.depth), O);
		}
		let c = Math.min(...a.map((e) => e.x)), l = Math.max(...a.map((e) => e.x)), u = Math.min(...a.map((e) => e.y)), d = Math.max(...a.map((e) => e.y)), f = s ? null : o.fill?.fillType === "solid" ? `#${o.fill.color}` : o.fill ? G(o.fill, e, c, u, l - c, d - u) : null, p = o.line?.fillType === "solid" ? `#${o.line.color}` : o.line ? G(o.line, e, c, u, l - c, d - u) : null, m = o.lineWidthEmu == null ? 1 : De(o.lineWidthEmu, i);
		for (let t of r) {
			e.beginPath(), e.moveTo(t[0].x, t[0].y);
			for (let n = 1; n < t.length; n++) e.lineTo(t[n].x, t[n].y);
			e.closePath(), f && (e.fillStyle = f, e.fill()), p && (e.strokeStyle = p, e.lineWidth = m, e.setLineDash(ft(o.lineCustomDash, o.lineDash, m)), e.lineCap = o.lineCap === "rnd" ? "round" : o.lineCap === "sq" ? "square" : "butt", e.lineJoin = o.lineJoin === "round" || o.lineJoin === "bevel" ? o.lineJoin : "miter", e.stroke());
		}
	}
	if (n.valAxisMinorGridlines === !0) {
		let e = rr(n, i);
		Et(w.minorLines.filter((e) => e >= E && e <= D), e.color, e.width, n.valAxisMinorGridlineDash);
	}
	if (fr(n)) {
		let e = ht(n.valAxisGridlineColor, n.valAxisGridlineWidthEmu, i);
		if (n.valAxisMajorGridlines === !0) Et(te, e.color, e.width, n.valAxisGridlineDash);
		else for (let t of te) {
			let r = ee(t), i = it(t);
			xt[2].thickness > 0 ? wt(2, "y", r, e.color, e.width, n.valAxisGridlineDash) : pt([{
				x: Y.x,
				y: i,
				depth: mt
			}, {
				x: Y.x + Y.w,
				y: i,
				depth: mt
			}], e.color, e.width, n.valAxisGridlineDash), xt[1].thickness > 0 ? wt(1, "y", r, e.color, e.width, n.valAxisGridlineDash) : pt([{
				x: bt,
				y: i,
				depth: gt
			}, {
				x: bt,
				y: i,
				depth: mt
			}], e.color, e.width, n.valAxisGridlineDash);
		}
	}
	if (n.catAxisMinorGridlines === !0) {
		let e = cr(n, i);
		kt(R(f, Qe), e.color, e.width, n.catAxisMinorGridlineDash);
	}
	if (n.catAxisMajorGridlines) {
		let e = ht(n.catAxisGridlineColor, n.catAxisGridlineWidthEmu, i);
		kt(lr(n, f), e.color, e.width, n.catAxisGridlineDash);
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
				x: $e(t),
				y: it(n[0]),
				depth: nt(e),
				value: n[0]
			},
			{
				x: $e(t + 1),
				y: it(n[1]),
				depth: nt(e),
				value: n[1]
			},
			{
				x: $e(t + 1),
				y: it(n[2]),
				depth: nt(e + 1),
				value: n[2]
			},
			{
				x: $e(t),
				y: it(n[3]),
				depth: nt(e + 1),
				value: n[3]
			}
		];
		for (let e of ji(n)) dt(e.map((e) => r[e]));
	}
	if (n.surfaceWireframe === !0) {
		for (let e = 0; e < p; e++) for (let t = 0; t < f - 1; t++) {
			let n = d[e].values[t], r = d[e].values[t + 1];
			n == null || r == null || !Number.isFinite(n) || !Number.isFinite(r) || lt({
				x: $e(t),
				y: it(n),
				depth: nt(e),
				value: n
			}, {
				x: $e(t + 1),
				y: it(r),
				depth: nt(e),
				value: r
			});
		}
		for (let e = 0; e < f; e++) for (let t = 0; t < p - 1; t++) {
			let n = d[t].values[e], r = d[t + 1].values[e];
			n == null || r == null || !Number.isFinite(n) || !Number.isFinite(r) || lt({
				x: $e(e),
				y: it(n),
				depth: nt(t),
				value: n
			}, {
				x: $e(e),
				y: it(r),
				depth: nt(t + 1),
				value: r
			});
		}
	}
	st.sort((e, t) => e.depth - t.depth);
	let Nt = Array.from({ length: F }, () => ({
		minX: Infinity,
		minY: Infinity,
		maxX: -Infinity,
		maxY: -Infinity
	})), It = Array.from({ length: F }, () => []);
	for (let e of st) {
		It[e.band].push(e);
		let t = Nt[e.band];
		for (let n of e.points) t.minX = Math.min(t.minX, n.x), t.minY = Math.min(t.minY, n.y), t.maxX = Math.max(t.maxX, n.x), t.maxY = Math.max(t.maxY, n.y);
	}
	for (let e of ct) {
		let t = Nt[e.band];
		for (let n of e.points) t.minX = Math.min(t.minX, n.x), t.minY = Math.min(t.minY, n.y), t.maxX = Math.max(t.maxX, n.x), t.maxY = Math.max(t.maxY, n.y);
	}
	let zt = (t, n) => {
		if (t == null) return t;
		if (t.fillType === "solid") return `#${t.color}`;
		let r = Nt[n];
		return !Number.isFinite(r.minX) || !Number.isFinite(r.minY) || !Number.isFinite(r.maxX) || !Number.isFinite(r.maxY) ? null : G(t, e, r.minX, r.minY, r.maxX - r.minX, r.maxY - r.minY);
	}, Bt = pe.map(zt), Vt = W.map(zt);
	for (let t = 0; t < F; t++) {
		if (Bt[t] === null) continue;
		let n = It[t].filter((e) => e.points.length >= 3);
		n.length && ot(e, L.get(t)?.style, B, 0, i, (e) => {
			e.beginPath();
			for (let t of n) {
				e.moveTo(t.points[0].x, t.points[0].y);
				for (let n = 1; n < t.points.length; n++) e.lineTo(t.points[n].x, t.points[n].y);
				e.closePath();
			}
			e.fillStyle = "#000000", e.fill();
		}, t);
	}
	for (let t of st) {
		let n = L.get(t.band);
		e.beginPath(), e.moveTo(t.points[0].x, t.points[0].y);
		for (let n = 1; n < t.points.length; n++) e.lineTo(t.points[n].x, t.points[n].y);
		e.closePath();
		let r = Bt[t.band];
		if (r !== null) {
			let n = Xe ? Dt(J.cameraNormal(t.scenePoints)) : 1;
			e.fillStyle = typeof r == "string" && de[t.band]?.fromRole ? Lt(r, n) : r ?? Lt(ne[t.band], n), e.fill();
		}
		let a = Vt[t.band];
		if (a != null) {
			let t = n?.style, r = z, o = ie;
			e.strokeStyle = a;
			let s = n?.lineWidthEmu ?? t?.lineWidthEmu ?? r?.lineWidthEmu ?? o?.lineWidthEmu;
			e.lineWidth = s == null ? 1 : De(s, i), e.setLineDash(ft(t?.lineCustomDash ?? r?.lineCustomDash ?? o?.lineCustomDash, t?.lineDash ?? r?.lineDash ?? o?.lineDash, e.lineWidth));
			let c = t?.lineCap ?? r?.lineCap ?? o?.lineCap, l = t?.lineJoin ?? r?.lineJoin ?? o?.lineJoin;
			e.lineCap = c === "rnd" ? "round" : c === "sq" ? "square" : "butt", e.lineJoin = l === "round" || l === "bevel" ? l : "miter", e.stroke();
		}
	}
	if (n.surfaceWireframe === !0) {
		let t = K ? Ce.paint?.fillType === "solid" ? `#${Ce.paint.color}` : Ce.paint ? G(Ce.paint, e, Ke, qe, Je, Ye) : Ce.paint : void 0, n = we.map((e, n) => e === void 0 ? xe !== void 0 || ve.length === 0 ? t : zt(ve[n], n) : zt(e, n));
		for (let t of ct) {
			let r = Ee[t.band], a = n[t.band];
			if (a === null) continue;
			e.beginPath(), e.moveTo(t.points[0].x, t.points[0].y), e.lineTo(t.points[1].x, t.points[1].y), e.strokeStyle = a ?? ne[t.band], e.lineWidth = r.lineWidthEmu == null ? Math.max(1, .75 * i) : De(r.lineWidthEmu, i), e.setLineDash(ft(r.lineCustomDash, r.lineDash, e.lineWidth));
			let o = r.lineCap, s = r.lineJoin;
			e.lineCap = o === "rnd" ? "round" : o === "sq" ? "square" : "butt", e.lineJoin = s === "round" || s === "bevel" ? s : "miter", e.stroke();
		}
	}
	e.restore();
	let Ht = J.project(Y.x + Y.w / 2, Y.y + Y.h / 2, .5), Ut = (t, n, r, a, o, s, c, l, u) => {
		if (c || t == null || t === "none") return;
		let d = a.x - r.x, f = a.y - r.y, p = Math.hypot(d, f);
		if (!(p > 1e-6)) return;
		let m = -f / p, h = d / p, g = (r.x + a.x) / 2, _ = (r.y + a.y) / 2;
		(g - Ht.x) * m + (_ - Ht.y) * h < 0 && (m = -m, h = -h);
		let v = $n(l, s, i), y = t === "cross" ? v / 2 : v, b = t === "out" || t === "cross" ? y : 0, x = t === "in" || t === "cross" ? y : 0;
		Qn(e, n.x + m * b, n.y + h * b, n.x - m * x, n.y - h * x, o, s, u);
	}, Wt = J.project(Y.x, vt, gt), Gt = J.project(Y.x + Y.w, vt, gt), Kt = n.catAxisLineWidthEmu == null ? 1 : De(n.catAxisLineWidthEmu, i);
	Qn(e, Wt.x, Wt.y, Gt.x, Gt.y, n.catAxisLineColor ? `#${n.catAxisLineColor}` : "#000000", Kt, n.catAxisLineDash);
	let qt = n.catAxisLineColor ? `#${n.catAxisLineColor}` : "#000000", Jt = n.catAxisHidden || n.catAxisLineHidden === !0, X = Math.max(1, Math.floor(n.catAxisTickMarkSkip ?? 1));
	for (let e = 0; e < f; e += X) Ut(n.catAxisMajorTickMark, J.project($e(e), vt, gt), Wt, Gt, qt, Kt, Jt, "major", n.catAxisLineDash);
	if (n.catAxisMinorTickMark != null && n.catAxisMinorTickMark !== "none") for (let e = 0; e < f - 1; e++) {
		let t = (se(e, f, Qe, Ze) + se(e + 1, f, Qe, Ze)) / 2;
		Ut(n.catAxisMinorTickMark, J.project(Y.x + t * Y.w, vt, gt), Wt, Gt, qt, Kt, Jt, "minor", n.catAxisLineDash);
	}
	e.font = ln(Ue, $(n, n.catAxisFontFace, "minor"), n.catAxisFontBold ?? !1, n.catAxisFontItalic ?? !1), e.fillStyle = n.catAxisFontColor ? `#${n.catAxisFontColor}` : "#000000", e.textBaseline = "top";
	for (let t = 0; t < f; t++) {
		let r = ae(t, f, fe(n), dr(n), n.catAxisLabelAlignment), i = J.project(Y.x + r.fraction * Y.w, vt, gt);
		e.textAlign = r.textAlign, e.fillText(u[t] ?? "", i.x, i.y + m(8, n.catAxisLabelOffsetPercent));
	}
	if (!We?.hidden) {
		let t = We?.lineWidthEmu == null ? 1 : De(We.lineWidthEmu, i), r = J.project(Y.x, vt, .5), a = J.project(Y.x + Y.w, vt, .5), o = r.x >= a.x ? Y.x : Y.x + Y.w, s = J.project(o, vt, gt), c = J.project(o, vt, mt);
		Qn(e, s.x, s.y, c.x, c.y, We?.lineColor ? `#${We.lineColor}` : "#000000", t, We?.lineDash);
		let l = We?.lineColor ? `#${We.lineColor}` : "#000000", u = Math.max(1, Math.floor(We?.tickMarkSkip ?? 1));
		for (let e = 0; e < p; e += u) Ut(We?.majorTickMark, J.project(o, vt, nt(e)), s, c, l, t, We?.lineHidden === !0, "major", We?.lineDash);
		if (We?.minorTickMark != null && We.minorTickMark !== "none") for (let e = 0; e < p - 1; e++) Ut(We.minorTickMark, J.project(o, vt, (nt(e) + nt(e + 1)) / 2), s, c, l, t, We.lineHidden === !0, "minor", We.lineDash);
		e.font = ln(Ge, $(n, We?.fontFace, "minor"), We?.fontBold ?? !1, We?.fontItalic ?? !1), e.fillStyle = We?.fontColor ? `#${We.fontColor}` : "#000000", e.textAlign = "left", e.textBaseline = "middle";
		for (let t = 0; t < p; t++) {
			let n = J.project(o, vt, nt(t));
			e.fillText(d[t].name, n.x + 8, n.y);
		}
	}
	if (!n.valAxisHidden) {
		let t = J.topology.axisX === "min" ? Y.x : Y.x + Y.w, r = J.project(t, Y.y + Y.h, gt), a = J.project(t, Y.y, gt);
		if (Math.hypot(a.x - r.x, a.y - r.y) > 4) {
			let o = n.valAxisLineWidthEmu == null ? 1 : De(n.valAxisLineWidthEmu, i);
			Qn(e, r.x, r.y, a.x, a.y, n.valAxisLineColor ? `#${n.valAxisLineColor}` : "#000000", o, n.valAxisLineDash), e.font = ln(Er(n.valAxisFontSizeHpt, l, i), $(n, n.valAxisFontFace, "minor"), n.valAxisFontBold ?? !1, n.valAxisFontItalic ?? !1), e.fillStyle = n.valAxisFontColor ? `#${n.valAxisFontColor}` : "#000000";
			let s = (r.x + a.x) / 2 < Ke + Je / 2;
			e.textAlign = s ? "right" : "left", e.textBaseline = "middle";
			for (let r of te) {
				let i = J.project(t, it(r), gt);
				e.fillText(oe(r, n.valAxisFormatCode, n.date1904), i.x + (s ? -6 : 6), i.y);
			}
		}
	}
	Yn(e, Fe, Re, o, s, c, l, Ke, qe, Je, Ye, He.bandH + 2, i, Le);
}
function Ii(t, r, a, o, c = 0) {
	let { x: l, y: u, w: d, h } = a, g = Gr(r), v = g.length;
	if (v === 0) return;
	let y = kn(r, o), b = r.series.map((e, t) => ({
		series: e,
		chartIndex: t
	})).filter(({ series: e }) => e.seriesType == null || e.seriesType === "area"), w = r.series.map((e, t) => ({
		series: e,
		chartIndex: t
	})).filter(({ series: e }) => e.seriesType === "line");
	if (b.length === 0 && w.length === 0) return;
	let T = te(r), E = r.chartType === "stackedAreaPct" ? "percentStacked" : r.chartType === "stackedArea" ? "stacked" : "standard", D = r.plotGroups?.filter((e) => e.kind === "area") ?? [{
		kind: "area",
		seriesStart: 0,
		seriesCount: b.length,
		categoryAxis: "primary",
		valueAxis: "primary",
		seriesAxis: "none",
		grouping: E
	}], O = Array(r.series.length).fill(-1);
	for (let e = 0; e < b.length; e++) O[b[e].chartIndex] = e;
	let A = D.map((e) => {
		let t = [], n = Math.min(r.series.length, e.seriesStart + e.seriesCount);
		for (let r = e.seriesStart; r < n; r++) {
			let e = O[r];
			e >= 0 && t.push(e);
		}
		return {
			group: e,
			areaIndices: t
		};
	}), N = Array(b.length).fill(!1), F = Array(b.length).fill(!1), ee = Array(b.length).fill(null), ne = b.map(() => Array(v).fill(0)), L = b.map(() => Array(v).fill(0)), re = r.plotGroups?.filter((e) => (e.kind === "area" || e.kind === "line") && e.seriesCount > 0) ?? D, R = /* @__PURE__ */ new Map();
	for (let e of re) {
		let t = e.valueAxis;
		R.set(t, (R.get(t) ?? !0) && e.grouping === "percentStacked");
	}
	for (let { group: e, areaIndices: t } of A) {
		let n = e.grouping ?? "standard", r = n === "stacked" || n === "percentStacked", i = n === "percentStacked", a = i && R.get(e.valueAxis) === !0 ? 100 : 1, o = i ? g.map((e, n) => t.reduce((e, t) => e + Math.abs(b[t].series.values[n] ?? 0), 0) || 1) : null;
		for (let e of t) N[e] = r, F[e] = i, ee[e] = o;
		for (let e = 0; e < v; e++) {
			let n = 0, s = 0;
			for (let c of t) {
				let t = b[c].series.values[e] ?? 0, l = i && o ? t / o[e] * a : t, u = l >= 0 ? n : s;
				ne[c][e] = r ? u : 0, L[c][e] = r ? u + l : l, r && (l >= 0 ? n += l : s += l);
			}
		}
	}
	let z = re.filter((e) => e.valueAxis !== "secondary"), ie = z.length > 0 && z.every((e) => e.grouping === "percentStacked"), B = new Map(b.map((e, t) => [e.series, t])), oe = new Map(r.series.map((e, t) => [e, t])), se = (e) => T[oe.get(e) ?? -1]?.valueAxis === "secondary" || r.plotGroups == null && e.useSecondaryAxis === !0, ce = re.filter((e) => e.valueAxis === "secondary"), V = ce.length > 0 && ce.every((e) => e.grouping === "percentStacked"), H = r.secondaryValAxis && r.series.some((e) => se(e)) ? r.secondaryValAxis : null, U = (e) => H != null && se(e), le = Hr(t, r, d, h, o), ue = le.fontPx, de = le.topPad, pe = le.bandH, W = Er(r.catAxisFontSizeHpt, h, o), me = Er(r.valAxisFontSizeHpt, h, o), he = Kn(t, r, d, h, .22, o), { legRightW: ge, legLeftW: _e, legTopH: ve, legBottomH: ye } = Ie(he, r.legendOverlay === !0), be = i(r, d, h, o), xe = be.catFontPx, Ce = be.valFontPx, we = be.catBandH, Te = be.valBandW, Ee = mn(r), Oe = gn(r, o), G = _n(t, r, o), ke = pe + ve + me / 2 + 2, K = (Ee ? Oe : j(W, r.catAxisLabelOffsetPercent)) + we + ye, Ae = h - ke - K, je = Fr(H, r.series, Ae / o, "y", V, !1, (e) => se(e), (e, t) => {
		let n = B.get(e);
		return n == null ? e.values[t] ?? null : e.values[t] == null ? null : L[n][t] ?? null;
	}), Me = Math.max(8, Math.min(11, h / 20)), Ne = M(H?.fontSizeHpt, o) ?? Me, Pe = 0;
	if (H && je && !H.hidden) {
		let e = t.font;
		t.font = `${Ne}px ${$(r, H.fontFace, "minor")}`;
		let n = 0;
		for (let e of je.majorLines) n = Math.max(n, t.measureText(gr(e, H.formatCode ?? null, r.date1904, H.displayUnits)).width);
		Pe = n + 18, t.font = e;
	}
	let Fe = H && H.title ? s(H.titleFontSizeHpt, o) + 8 : 0, Le = (() => {
		let e = Infinity, t = -Infinity;
		for (let n = 0; n < v; n++) {
			for (let r = 0; r < b.length; r++) {
				let { series: i } = b[r];
				U(i) || i.values[n] == null || (e = Math.min(e, ne[r][n], L[r][n]), t = Math.max(t, ne[r][n], L[r][n]));
			}
			for (let { series: r } of w) {
				if (U(r)) continue;
				let i = r.values[n];
				i != null && (e = Math.min(e, i), t = Math.max(t, i));
			}
		}
		return !isFinite(e) || !isFinite(t) ? {
			min: 0,
			max: 1
		} : ie ? {
			min: e < 0 ? -100 : 0,
			max: t > 0 ? 100 : 0
		} : {
			min: e,
			max: t
		};
	})();
	if (!ie) {
		let e = (e) => {
			Le = {
				min: Math.min(Le.min, e),
				max: Math.max(Le.max, e)
			};
		};
		for (let t = 0; t < b.length; t++) {
			let { series: n } = b[t];
			U(n) || Pr(n, "y", (e) => n.values[e] == null ? null : L[t][e], e);
		}
		for (let { series: t } of w) U(t) || Pr(t, "y", (e) => t.values[e] ?? null, e);
	}
	let ze = yr(r, Le.min, Le.max, Ae / o, ie), q = r.valAxisFontSizeHpt == null ? Math.max(8, Math.min(11, Ae / 20)) : me, Ve = 0;
	if (!r.valAxisHidden && r.plotAreaManualLayout != null && r.plotAreaManualLayout.layoutTarget !== "inner") {
		let e = t.font;
		t.font = ln(q, $(r, r.valAxisFontFace, "minor"), r.valAxisFontBold ?? !1, r.valAxisFontItalic ?? !1);
		for (let e of ze.majorLines) Ve = Math.max(Ve, t.measureText(mr(r, e, ie)).width);
		t.font = e;
	}
	let He = k({
		valAxisHidden: r.valAxisHidden,
		catAxisHidden: r.catAxisHidden,
		valLabelWidth: Ve,
		valLabelFontPx: q,
		catLabelFontPx: W,
		valLabelGapPx: r.valAxisFontSizeHpt == null ? 6 : yt(q),
		catLabelGapPx: r.catAxisFontSizeHpt == null ? m(3, r.catAxisLabelOffsetPercent) : m(Re(W), r.catAxisLabelOffsetPercent),
		outerTextMarginPx: I * o,
		valTitleBandW: Te,
		catTitleBandH: we,
		secondaryBandW: Pe + Fe
	}), Ue = {
		t: ke,
		r: ge + d * .05 + Pe + Fe,
		b: K,
		l: _e + Math.max(d * .12 + Te, G)
	};
	Wr(t, r, l, u, d, h, u + de, ue);
	let We = _(r, l, u, d, h, o, {
		titleBand: le,
		legendSideReserveFrac: .22,
		legendReserve: he,
		pad: Ue,
		honorPlotAreaManualLayout: !0,
		manualOuterInsets: He
	}), { px0: Ge, py0: Ke, pw: qe } = We.plotRect, { ph: Je } = We.plotRect;
	if (qe <= 0 || Je <= 0) return;
	let Ye = Ee ? vn(t, r, qe / v, o) : null;
	Ye && Ye.totalHeight > Oe && (Je = Math.max(1, Je - (Ye.totalHeight - Oe))), rt(t, r, Ge, Ke, qe, Je, o, c);
	let J = yr(r, Le.min, Le.max, Je / o, ie), Xe = fe(r), Y = dr(r), Qe = Nr(r, g), $e = Qe ? (e) => Ge + Qe.positions[e] * qe : Xe ? (e) => Ge + ((Y ? v - 1 - e : e) + .5) / v * qe : (e) => {
		let t = Y ? v - 1 - e : e;
		return Ge + (v === 1 ? qe / 2 : t / (v - 1) * qe);
	}, et = (e) => Ke + Je - J.frac(e) * Je, tt = je ? je.makeToY(Ke, Je) : et, it = (e) => U(e) ? tt : et, at = et(Oi(r, J.min, J.max)), ot = H && je ? tt(Di(r.secondaryCatAxis?.crossesAt, r.secondaryCatAxis?.crosses, je.min, je.max)) : at, st = (e) => U(e) ? ot : at, { color: ct, width: dt } = ut(r.catAxisLineColor, r.catAxisLineWidthEmu, o), { color: ft, width: pt } = ut(r.valAxisLineColor, r.valAxisLineWidthEmu, o);
	if (!r.valAxisHidden) {
		let e = nr(r, o), n = rr(r, o);
		if (r.valAxisMinorGridlines) for (let e of J.minorLines) tr(t, Ge, qe, et(e), !1, n);
		if (fr(r)) for (let n of J.majorLines) tr(t, Ge, qe, et(n), n === 0, e);
	}
	if (H && je && Ir(t, H, je, tt, Ge, qe, o), !r.catAxisHidden && or(r)) {
		let e = sr(r, o);
		t.strokeStyle = e.color, t.lineWidth = e.width;
		let n = e.dash.length > 0 && t.getLineDash ? t.getLineDash() : [];
		e.dash.length > 0 && t.setLineDash(e.dash);
		let i = Qe ? Qe.majorTicks.map((e) => e.fraction) : lr(r, v);
		for (let e of i) {
			let n = Ge + e * qe;
			t.beginPath(), t.moveTo(n, Ke), t.lineTo(n, Ke + Je), t.stroke();
		}
		e.dash.length > 0 && t.setLineDash(n);
	}
	let mt = A.flatMap(({ areaIndices: e }) => e), ht = (e, t) => L[e]?.[t] ?? 0;
	for (let n of mt) {
		let { series: i, chartIndex: a } = b[n], s = en(a, i), l = xa(i, a), u = S(r, i, void 0, l), d = Ke + Je, f = it(i), p = i.smooth === !0;
		Se(t, e(i.chartexStyle), nt(r, "dataPoint", Be(r, i)), l, {
			x: Ge,
			y: Ke,
			w: qe,
			h: Je
		}, o, (e) => {
			if (e.beginPath(), N[n]) {
				let t = [];
				for (let e = 0; e < v; e++) t.push({
					x: $e(e),
					y: et(L[n][e])
				});
				e.moveTo(t[0].x, t[0].y), ha(e, t, p);
				for (let t = v - 1; t >= 0; t--) e.lineTo($e(t), et(ne[n][t]));
			} else {
				let t = [];
				for (let e = 0; e < v; e++) t.push({
					x: $e(e),
					y: f(i.values[e] ?? 0)
				});
				e.moveTo($e(0), d), e.lineTo(t[0].x, t[0].y), ha(e, t, p), e.lineTo($e(v - 1), d);
			}
			e.closePath(), ja(e, u, {
				x: Ge,
				y: Ke,
				w: qe,
				h: Je
			}, s, o, c), an(e, r, "dataPoint", i, void 0, l, s, 1.5, o, {
				x: Ge,
				y: Ke,
				w: qe,
				h: Je
			}, c) && e.stroke();
		});
	}
	let gt = /* @__PURE__ */ new Map();
	for (let e = 0; e < b.length; e++) {
		let t = b[e].series, n = t.areaGroupIndex ?? 0, r = gt.get(n) ?? [];
		r.push({
			series: t,
			areaIndex: e
		}), gt.set(n, r);
	}
	for (let e of r.areaGroupDecorations ?? []) {
		if (!e.dropLines || !Zr(t, Qr(r, e.dropLines, "dropLine"), o)) continue;
		let n = gt.get(e.groupIndex) ?? [];
		for (let e = 0; e < v; e++) {
			let r = Infinity, i = -Infinity, a = !1;
			for (let t of n) {
				if (t.series.values[e] == null) continue;
				let n = it(t.series)(ht(t.areaIndex, e)), o = st(t.series);
				!Number.isFinite(n) || !Number.isFinite(o) || (r = Math.min(r, n, o), i = Math.max(i, n, o), a = !0);
			}
			!a || Math.abs(i - r) < .01 || (t.beginPath(), t.moveTo($e(e), r), t.lineTo($e(e), i), t.stroke());
		}
	}
	{
		let e = Math.max(2, 2.5 * o);
		for (let i = 0; i < b.length; i++) {
			let { series: a, chartIndex: s } = b[i], p = tn(a.dataPointOverrides), m = en(s, a), _ = it(a), S = (e) => ht(i, e), w = ee[i];
			for (let e of a.errBars ?? []) va(t, a, ti(r, e), v, $e, _, S, m);
			let T = (a.showMarker === !0 || n(a)) && a.markerSymbol !== "none", E = aa(r, a, s);
			if (T || C(a)) for (let n = 0; n < v; n++) {
				if (a.sourceHidden?.[n] === !0 || a.values[n] == null) continue;
				let i = p.get(n), s = f(a, i, "circle", T);
				if (s === "none") continue;
				let l = $e(n), u = _(S(n));
				if (E || P(i)) {
					let e = i?.markerSize ?? a.markerSize ?? 5, d = Ze(a, i, n, m), f = i?.markerLine ?? a.markerLine ?? null, p = i?.markerLineWidthEmu ?? a.markerLineWidthEmu;
					ia(t, r, a, i, n, l, u, s, e, d, f, o, p == null ? void 0 : De(p, o), x(a, i, n), c);
				} else t.fillStyle = m, t.beginPath(), t.arc(l, u, e, 0, Math.PI * 2), t.fill();
			}
			ba(t, a, g, v, $e, _, S, Je, o, r.date1904 ?? !1, !0, $(r, r.dataLabelFontFace, "minor"), r.dataLabelPosition ?? "ctr", {
				x: Ge,
				y: Ke,
				w: qe,
				h: Je
			}, {
				x: l,
				y: u,
				w: d,
				h
			}, F[i] && w ? (e) => (a.values[e] ?? 0) / w[e] : void 0, void 0, (e) => $(r, e, "minor"), U(a) ? H?.displayUnits : r.valAxisDisplayUnits, (e) => y(s, e), (e) => qr(r, e, U(a) && je ? je.max : J.max), c);
		}
	}
	for (let { series: i, chartIndex: s } of w) {
		let p = tn(i.dataPointOverrides), m = en(s, i), _ = i.lineColor ? `#${i.lineColor}` : m, b = xa(i, s), S = it(i), w = lt(r, s), T = [], E = [], D = () => {
			E.length > 0 && T.push(E), E = [];
		};
		for (let e = 0; e < v; e++) {
			let t = i.values[e];
			if (i.sourceHidden?.[e] === !0) {
				D();
				continue;
			}
			t == null && ((r.dispBlanksAs ?? "gap") === "gap" && D(), (r.dispBlanksAs ?? "gap") !== "zero") || E.push({
				x: $e(e),
				y: S(t ?? 0),
				index: e
			});
		}
		D(), w ? on(t, r, i, T, i.smooth === !0, !1, m, Math.max(1, 2.25 * o), o, {
			x: Ge,
			y: Ke,
			w: qe,
			h: Je
		}, c) : Se(t, e(i.chartexStyle), r.chartStyleRoles?.dataPointLine, b, {
			x: Ge,
			y: Ke,
			w: qe,
			h: Je
		}, o, (e) => {
			if (an(e, r, "dataPointLine", i, void 0, b, m, Math.max(1, 2.25 * o), o, {
				x: Ge,
				y: Ke,
				w: qe,
				h: Je
			}, c)) {
				e.beginPath();
				for (let t of T) e.moveTo(t[0].x, t[0].y), ha(e, t, i.smooth === !0);
				e.stroke();
			}
		});
		let O = (e) => i.values[e] ?? 0;
		for (let e of i.errBars ?? []) va(t, i, ti(r, e), v, $e, S, O, _);
		let k = (i.showMarker === !0 || n(i)) && i.markerSymbol !== "none";
		if (k || C(i)) for (let e = 0; e < v; e++) {
			if (i.sourceHidden?.[e] === !0) continue;
			let n = i.values[e];
			if (n == null) continue;
			let a = p.get(e), s = f(i, a, "circle", k);
			s !== "none" && ia(t, r, i, a, e, $e(e), S(n), s, a?.markerSize ?? i.markerSize ?? 5, Ze(i, a, e, _), a?.markerLine ?? i.markerLine ?? null, o, (a?.markerLineWidthEmu ?? i.markerLineWidthEmu) == null ? void 0 : De(a?.markerLineWidthEmu ?? i.markerLineWidthEmu, o), x(i, a, e), c);
		}
		ba(t, i, g, v, $e, S, O, Je, o, r.date1904 ?? !1, !1, $(r, r.dataLabelFontFace, "minor"), r.dataLabelPosition ?? "r", {
			x: Ge,
			y: Ke,
			w: qe,
			h: Je
		}, {
			x: l,
			y: u,
			w: d,
			h
		}, void 0, void 0, (e) => $(r, e, "minor"), U(i) ? H?.displayUnits : r.valAxisDisplayUnits, (e) => y(s, e), (e) => qr(r, e, U(i) && je ? je.max : J.max), c), Cr(t, i, _, $e, S, o, void 0, {
			chart: r,
			chartRect: a,
			plotRect: {
				x: Ge,
				y: Ke,
				w: qe,
				h: Je
			},
			shapeRotationDeg: c
		});
	}
	if (!r.valAxisHidden) {
		let e = r.valAxisFontSizeHpt == null ? Math.max(8, Math.min(11, Je / 20)) : me;
		t.font = ln(e, $(r, r.valAxisFontFace, "minor"), r.valAxisFontBold ?? !1, r.valAxisFontItalic ?? !1), t.textBaseline = "middle";
		for (let n of J.majorLines) {
			let i = et(n);
			Zn(t, r.valAxisMajorTickMark, "val", Ge, i, ft, pt, !1, r.valAxisLineHidden, "major", o, r.valAxisLineDash), t.fillStyle = r.valAxisFontColor ? `#${r.valAxisFontColor}` : "#555", t.textAlign = "right";
			let a = r.valAxisFontSizeHpt == null ? 6 : yt(e);
			t.fillText(mr(r, n, ie), Ge - a, i);
		}
		if (r.valAxisMinorTickMark && r.valAxisMinorTickMark !== "none") for (let e of J.minorTicks) Zn(t, r.valAxisMinorTickMark, "val", Ge, et(e), ft, pt, !1, r.valAxisLineHidden, "minor", o, r.valAxisLineDash);
	}
	if (!r.catAxisHidden && !r.catAxisLineHidden && Qn(t, Ge, at, Ge + qe, at, ct, dt, r.catAxisLineDash), !r.valAxisHidden && !r.valAxisLineHidden && r.valAxisLineColor != null && Qn(t, Ge, Ke, Ge, Ke + Je, ft, pt, r.valAxisLineDash), !r.catAxisHidden && r.catAxisMajorTickMark && r.catAxisMajorTickMark !== "none") {
		let e = Math.max(1, Math.floor(r.catAxisTickMarkSkip ?? 1));
		if (Qe) for (let e of Qe.majorTicks) Zn(t, r.catAxisMajorTickMark, "cat", at, Ge + e.fraction * qe, ct, dt, !1, r.catAxisLineHidden, "major", o, r.catAxisLineDash);
		else if (Xe) for (let n = 0; n <= v; n += e) Zn(t, r.catAxisMajorTickMark, "cat", at, Ge + n / v * qe, ct, dt, !1, r.catAxisLineHidden, "major", o, r.catAxisLineDash);
		else for (let n = 0; n < v; n += e) Zn(t, r.catAxisMajorTickMark, "cat", at, $e(n), ct, dt, !1, r.catAxisLineHidden, "major", o, r.catAxisLineDash);
	}
	if (!r.catAxisHidden && r.catAxisMinorTickMark && r.catAxisMinorTickMark !== "none" && Qe) for (let e of Qe.minorTicks) Zn(t, r.catAxisMinorTickMark, "cat", at, Ge + e.fraction * qe, ct, dt, !1, r.catAxisLineHidden, "minor", o, r.catAxisLineDash);
	if (!Ee && !r.catAxisHidden) {
		let e = r.catAxisFontSizeHpt == null ? Math.max(8, Math.min(11, qe / v * .8)) : W;
		t.fillStyle = r.catAxisFontColor ? `#${r.catAxisFontColor}` : "#555", t.textAlign = "center", t.textBaseline = "top", t.font = ln(e, $(r, r.catAxisFontFace, "minor"), r.catAxisFontBold ?? !1, r.catAxisFontItalic ?? !1);
		let n = Math.max(1, Math.floor(r.catAxisTickLabelSkip ?? 1)), i = Qe ? Qe.majorTicks.map((e) => ({
			label: p(String(e.serial), r.catAxisFormatCode, r.date1904),
			x: Ge + e.fraction * qe,
			categoryIndex: -1
		})) : Array.from({ length: Math.ceil(v / n) }, (e, t) => {
			let i = t * n;
			return {
				label: p((g[i] ?? "").toString(), r.catAxisFormatCode, r.date1904),
				x: $e(i),
				categoryIndex: i
			};
		});
		for (let n of i) {
			let i = n.label;
			if (!i) continue;
			let a = n.categoryIndex < 0 ? null : ae(n.categoryIndex, v, fe(r), dr(r), r.catAxisLabelAlignment), o = m(r.catAxisFontSizeHpt == null ? 3 : Re(e), r.catAxisLabelOffsetPercent);
			t.textAlign = a?.textAlign ?? "center";
			let s = r.catAxisTickLabelPos ?? "nextTo", c = s === "nextTo" ? at : s === "high" ? Ke : Ke + Je;
			t.fillText(i, a ? Ge + a.fraction * qe : n.x, c + o);
		}
	}
	if (H && je) {
		let e = r.valAxisFontColor ? `#${r.valAxisFontColor}` : "#555";
		Lr(t, r, H, je, tt, a, Ge, Ke, qe, Je, o, Ne, Pe, e, r.date1904);
	}
	Ye && yn(t, r, Ye, Ge, Ke + Je, qe, l + _e, o), Yn(t, r, he, l, u, d, h, Ge, Ke, qe, Je, pe + 2, o), pn(t, r, l, u, d, h, Ge, Ke, qe, Je, _e, ye, xe, Ce);
}
var Li = .88;
function Ri(t, n, r, i, a = 0) {
	let o = n.series[0];
	if (!o) return;
	let s = v(n.ofPie, o.values);
	if (s == null || s.size === 0) {
		zi(t, {
			...n,
			chartType: "pie"
		}, r, !1, i, a);
		return;
	}
	let c = [], l = [];
	for (let e = 0; e < o.values.length; e++) {
		let t = o.values[e], n = t == null ? 0 : Math.abs(t);
		!(n > 0) || !Number.isFinite(n) || (s.has(e) ? l : c).push({
			sourceIndex: e,
			value: n
		});
	}
	if (l.length === 0) {
		zi(t, {
			...n,
			chartType: "pie"
		}, r, !1, i, a);
		return;
	}
	let u = {
		...n,
		chartType: "pie"
	}, d = Kn(t, u, r.w, r.h, .28, i), f = _(n, r.x, r.y, r.w, r.h, i, {
		titleTopPadFrac: .035,
		titleBottomPadFrac: .035,
		legendSideReserveFrac: .28,
		legendReserve: d,
		radialGapFrac: .02,
		honorPlotAreaManualLayout: !0
	});
	Wr(t, n, r.x, r.y, r.w, r.h, r.y + f.title.topPad, f.title.fontPx);
	let { px0: p, py0: m, pw: h, ph: g } = f.plotRect;
	if (!(h > 0) || !(g > 0)) return;
	rt(t, n, p, m, h, g, i, a);
	let y = n.ofPie, b = Math.max(.05, Math.min(2, (y?.secondPieSizePercent ?? 75) / 100)), x = Math.max(0, y?.gapWidthPercent ?? 150) / 100, C = Math.min(g * .44, h * .9 / (2 + 2 * b + x)), w = C * b;
	if (!(C > 0) || !(w > 0)) return;
	let T = p + (h - (2 * C + x * C + 2 * w)) / 2, E = T + C, D = T + 2 * C + x * C + w, O = m + g / 2, k = l.reduce((e, t) => e + t.value, 0), A = tn(o.dataPointOverrides), j = [...c, {
		sourceIndex: l[0].sourceIndex,
		value: k
	}], M = (r, s, c) => {
		let l = r.reduce((e, t) => e + t.value, 0), u = -Math.PI / 2, d = u, f = u;
		for (let p = 0; p < r.length; p++) {
			let m = r[p], h = l > 0 ? m.value / l * Math.PI * 2 : 0, g = A.get(m.sourceIndex), _ = rn(n, o, 0, m.sourceIndex), v = nn(m.sourceIndex, o, n.varyColors !== !1, 0), y = S(n, o, g, _, m.sourceIndex), b = u, x = u + h;
			Se(t, e(g?.chartexStyle, o.chartexStyle), nt(n, "dataPoint", 0), _, {
				x: s - c,
				y: O - c,
				w: c * 2,
				h: c * 2
			}, i, (e) => {
				e.beginPath(), e.moveTo(s, O), e.arc(s, O, c, b, x), e.closePath(), ja(e, y, {
					x: s - c,
					y: O - c,
					w: c * 2,
					h: c * 2
				}, v, i, a), sn(e, n, o, g, _, "#FFFFFF", i, {
					x: s - c,
					y: O - c,
					w: c * 2,
					h: c * 2
				}, a);
			}), p === r.length - 1 && (d = u, f = u + h), u += h;
		}
		return {
			aggregateStart: d,
			aggregateEnd: f
		};
	}, N = M(j, E, C), P = O - w, F = O + w;
	if ((y?.type ?? "pie") === "bar") {
		let r = O - w, s = w;
		for (let c of l) {
			let l = k > 0 ? 2 * w * c.value / k : 0, u = D - s / 2, d = A.get(c.sourceIndex), f = rn(n, o, 0, c.sourceIndex), p = nn(c.sourceIndex, o, n.varyColors !== !1, 0), m = S(n, o, d, f, c.sourceIndex);
			Se(t, e(d?.chartexStyle, o.chartexStyle), nt(n, "dataPoint", 0), f, {
				x: u,
				y: r,
				w: s,
				h: l
			}, i, (e) => {
				Ma(e, m, {
					x: u,
					y: r,
					w: s,
					h: l
				}, p, i, a), e.beginPath(), e.rect(u, r, s, l), sn(e, n, o, d, f, "#FFFFFF", i, {
					x: u,
					y: r,
					w: s,
					h: l
				}, a);
			}), r += l;
		}
		P = O - w, F = O + w;
	} else M(l, D, w);
	if (y?.seriesLines ?? !0) {
		let e = Qr(n, y?.seriesLineStyle ?? {}, "seriesLine"), r = Zr(t, {
			...e,
			color: e.color ?? "808080"
		}, i), a = {
			x: E + Math.cos(N.aggregateStart) * C,
			y: O + Math.sin(N.aggregateStart) * C
		}, o = {
			x: E + Math.cos(N.aggregateEnd) * C,
			y: O + Math.sin(N.aggregateEnd) * C
		};
		r && (t.beginPath(), t.moveTo(a.x, a.y), t.lineTo(D - w, P), t.stroke(), t.beginPath(), t.moveTo(o.x, o.y), t.lineTo(D - w, F), t.stroke());
	}
	d && Yn(t, u, d, r.x, r.y, r.w, r.h, p, m, h, g, f.title.bandH + 2, i);
}
function zi(t, n, r, i, a, o = 0) {
	let { x: s, y: c, w: l, h: u } = r, d = n.series[0];
	if (!d) return;
	let f = d.categories && d.categories.length > 0 ? d.categories : n.categories, p = d.values.map((e) => Math.abs(e ?? 0)), m = p.reduce((e, t) => e + t, 0);
	if (m === 0) return;
	let h = i && n.varyColors === !1 && n.series.length > 1 ? n : {
		...n,
		series: [{
			...d,
			categories: f
		}]
	}, g = Kn(t, h, l, u, .28, a), v = _(n, s, c, l, u, a, {
		titleTopPadFrac: .035,
		titleBottomPadFrac: .035,
		legendSideReserveFrac: .28,
		legendReserve: g,
		radialGapFrac: .02,
		honorPlotAreaManualLayout: !0
	}), y = v.title.fontPx, b = v.title.bandH;
	Wr(t, n, s, c, l, u, c + v.title.topPad, y);
	let { px0: x, py0: C, pw: w, ph: T } = v.plotRect;
	rt(t, n, x, C, w, T, a, o);
	let E = v.center.cx, D = v.center.cy, O = Math.min(w, T) * .42, k = -Math.PI / 2 + (n.firstSliceAngle ?? 0) * Math.PI / 180, A = i ? Math.max(1, Math.min(90, n.holeSize ?? 50)) : 0, j = i ? n.series : [d], M = new Map(j.map((e) => [e, tn(e.dataPointOverrides)])), N = (O - A / 100 * O) / j.length, P = (e, t) => {
		let n = M.get(e)?.get(t)?.explosion ?? e.explosion ?? 0;
		return n > 0 ? n / 100 * O : 0;
	}, F = d.seriesDataLabels ?? {
		showVal: !1,
		showCatName: !1,
		showSerName: !1,
		showPercent: !1
	}, ee = d.seriesDataLabels != null || (d.dataLabelOverrides?.length ?? 0) > 0, te = n.showDataLabels && !ee, I = $(n, F.fontFace ?? n.dataLabelFontFace, "minor");
	for (let r = 0; r < j.length; r++) {
		let s = j[r], c = s.values.map((e) => Math.abs(e ?? 0)), l = c.reduce((e, t) => e + t, 0);
		if (l === 0) continue;
		let u = O - r * N, d = u - N, f = k;
		for (let p = 0; p < c.length; p++) {
			let m = c[p] / l * Math.PI * 2;
			if (!(m > 0)) continue;
			let h = rn(n, s, r, p), g = nn(p, s, n.varyColors !== !1, r), _ = M.get(s)?.get(p), v = f + m / 2, y = P(s, p), b = y > 0 ? Math.cos(v) * y : 0, x = y > 0 ? Math.sin(v) * y : 0, C = S(n, s, _, h, p), w = {
				x: E + b - u,
				y: D + x - u,
				w: u * 2,
				h: u * 2
			};
			if (Se(t, e(_?.chartexStyle, s.chartexStyle), nt(n, "dataPoint", Be(n, s)), h, w, a, (e) => {
				e.beginPath(), d > .01 ? (e.arc(E + b, D + x, u, f, f + m), e.arc(E + b, D + x, d, f + m, f, !0)) : (e.moveTo(E + b, D + x), e.arc(E + b, D + x, u, f, f + m)), e.closePath(), ja(e, C, w, g, a, o), sn(e, n, s, _, h, g, a, w, o);
			}), te && r === 0 && m > .15) {
				let e = O * (i ? .75 : .6), n = E + b + Math.cos(v) * e, r = D + x + Math.sin(v) * e, a = Math.round(c[p] / l * 100);
				t.font = `bold ${Math.max(8, O * .1)}px ${I}`, t.fillStyle = "#fff", t.textAlign = "center", t.textBaseline = "middle", t.fillText(`${a}%`, n, r);
			}
			f += m;
		}
	}
	ee && Bi(t, n, F, d, f, p, m, E, D, O, i ? O - N : 0, k, I, a, x, C, w, T, s, c, l, u, o), g && Yn(t, h, g, s, c, l, u, x, C, w, T, b + 2, a);
}
function Bi(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S) {
	let C = tn(r.dataLabelOverrides ?? []), w = kn({
		...t,
		series: [{
			...r,
			categories: i
		}]
	}, p), T = /* @__PURE__ */ new Set();
	for (let e = 0; e < a.length; e++) {
		if (r.sourceHidden?.[e] === !0) continue;
		let t = C.get(e);
		if (Ve(n, t)) continue;
		let i = vt(t?.labelBox, n.labelBox);
		i?.fillHidden !== !0 && (i?.fill != null || i?.fillPaint != null) && T.add(e);
	}
	T.size > 0 && Gi(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, g, h, _, v, y, b, x, T, C, S);
	let E = [], D = d;
	for (let d = 0; d < a.length; d++) {
		let O = a[d] / o * Math.PI * 2, k = D + O / 2;
		if (D += O, r.sourceHidden?.[d] === !0 || T.has(d)) continue;
		let A = C.get(d);
		if (Ve(n, A)) continue;
		let j = A?.showCatName ?? n.showCatName, N = A?.showSerName ?? n.showSerName, P = A?.showVal ?? n.showVal, F = A?.showPercent ?? n.showPercent, ee = A?.showLegendKey ?? n.showLegendKey ?? !1, te = ie({
			customText: A?.text,
			showCategory: j,
			showSeries: N,
			showValue: P,
			showPercent: F,
			category: (i[d] ?? "").toString(),
			seriesName: r.name,
			sourceValue: a[d],
			percentRatio: a[d] / o,
			formatCode: A?.formatCode ?? n.formatCode ?? r.valFormatCode ?? null,
			percentFormatCode: A?.formatCode ?? n.formatCode ?? "0%",
			date1904: t.date1904 ?? !1,
			separator: A?.separator ?? n.separator
		}), I = ee ? w(0, d) : void 0;
		if (!te && !I) continue;
		let ne = (A?.position ?? n.position ?? "bestFit") === "outEnd", L = M(A?.fontSizeHpt ?? n.fontSizeHpt, p) ?? Math.max(8, l * .1), re = A?.fontBold ?? n.fontBold, R = A?.fontColor ?? n.fontColor, z = A?.fontFace ?? n.fontFace ? $(t, A?.fontFace ?? n.fontFace, "minor") : f, ae = K(A, n), B = ua(t, A, p, z, re ?? !1, ae), oe = u > .01 ? (u + l) / 2 : l * Li;
		if (A?.manualLayout) {
			e.font = `${ae.fontItalic ? "italic " : ""}${re ? "bold " : ""}${L}px ${z}`, fa(e, te, {
				kind: "point",
				x: s + Math.cos(k) * oe,
				y: c + Math.sin(k) * oe,
				position: "ctr"
			}, {
				x: m,
				y: h,
				w: g,
				h: _
			}, L, R ? `#${R}` : "#fff", A.manualLayout, {
				x: v,
				y,
				w: b,
				h: x
			}, B, I, ae, p, vt(A?.labelBox, n.labelBox), S);
			continue;
		}
		if (ne) {
			e.font = `${ae.fontItalic ? "italic " : ""}${re ? "bold " : ""}${L}px ${z}`;
			let t = B ? Nt(e, B, L, R ? `#${R}` : "#333") : null, n = L * 1.15, r = t ? [] : Oe(te, Math.max(0, b - L), Math.max(0, x - L), n, (t) => e.measureText(t).width, ae);
			if (B && !t || !t && r.length === 0 && !I) continue;
			let i = t?.width ?? r.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), a = t?.height ?? L + Math.max(0, r.length - 1) * n, o = I ? Un([I.entry], L, p)[0] ?? 0 : 0, u = I ? Wn(I.entry, L, p) : 0;
			E.push(Ui(r, k, s, c, l, Math.min(o + (te ? Nn : 0) + i, Math.max(0, b - L)), Math.min(Math.max(u, a), Math.max(0, x - L)), n, L, re ?? !1, R ? `#${R}` : "#333", z, t ?? void 0, I, ae, p));
			continue;
		}
		let se = oe, ce = s + Math.cos(k) * se, V = c + Math.sin(k) * se;
		e.font = `${ae.fontItalic ? "italic " : ""}${re ? "bold " : ""}${L}px ${z}`;
		let H = 2 * se * Math.sin(Math.min(Math.PI, Math.abs(O)) / 2) - L, U = u > .01 ? l - u - L : l - L;
		if (!(H > 0) || !(U > 0)) continue;
		let le = Kr({
			x: ce - H / 2,
			y: V - U / 2,
			w: H,
			h: U
		}, {
			x: m,
			y: h,
			w: g,
			h: _
		});
		le && fa(e, te, {
			kind: "point",
			x: ce,
			y: V,
			position: "ctr"
		}, le, L, R ? `#${R}` : "#fff", void 0, {
			x: v,
			y,
			w: b,
			h: x
		}, B, I, ae, p, vt(A?.labelBox, n.labelBox), S);
	}
	Wi(e, E, v, y, b, x);
}
function Vi(e, t, n, r, i, a) {
	let o = Math.max(Math.abs(n - e) - i, 0), s = Math.max(Math.abs(r - t) - a, 0);
	return Math.hypot(o, s);
}
function Hi(e, t, n, r, i) {
	let a = Math.cos(e), o = Math.sin(e), s = t + i, c = 0, l = s + Math.hypot(n, r);
	for (let e = 0; e < 32; e++) {
		let e = (c + l) / 2;
		Vi(0, 0, a * e, o * e, n, r) >= s ? l = e : c = e;
	}
	return l;
}
function Ui(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m = {}, h = 1) {
	let g = pe(a, o, m.textRotation, m.textVerticalMode), _ = Ye(m, h), v = a + _.left + _.right, y = o + _.top + _.bottom, b = pe(v, y, m.textRotation, m.textVerticalMode);
	a = b.w, o = b.h;
	let x = Hi(t, i, g.w / 2, g.h / 2, c * .5), S = n + Math.cos(t) * x, C = r + Math.sin(t) * x;
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
function Wi(e, t, n, r, i, a) {
	if (t.length !== 0) {
		e.save(), e.beginPath(), e.rect(n, r, i, a), e.clip();
		for (let n of t) {
			let t = Ye(n.textStyle, n.ptToPx), r = pe(n.unrotatedW, n.unrotatedH, n.textStyle.textRotation, n.textStyle.textVerticalMode), i = n.cxBox + (t.left - t.right) / 2, a = n.cyBox + (t.top - t.bottom) / 2, o = Math.max(0, n.unrotatedW - t.left - t.right), s = we(n.textStyle, "center"), c = s === "left" ? n.cxBox - n.unrotatedW / 2 + t.left : s === "right" ? n.cxBox + n.unrotatedW / 2 - t.right : i;
			if (e.save(), r.radians !== 0 && (e.translate(n.cxBox, n.cyBox), e.rotate(r.radians), e.translate(-n.cxBox, -n.cyBox)), !n.legendKey) {
				if (n.rich) {
					It(e, n.rich, c, a, s, "middle", o), e.restore();
					continue;
				}
				e.font = `${n.textStyle.fontItalic ? "italic " : ""}${n.bold ? "bold " : ""}${n.fontPx}px ${n.font}`, e.fillStyle = n.fontColor, e.textAlign = s, e.textBaseline = "middle";
				let t = (n.textStyle.fontBaseline ?? 0) * n.fontPx, r = a - (n.lines.length - 1) * n.lineHeight / 2 - t;
				if (!(n.textStyle.fontPaintAuthored === !0 && (n.textStyle.fontHidden === !0 || n.textStyle.fontColor == null))) for (let t = 0; t < n.lines.length; t++) e.fillText(n.lines[t], c, r + t * n.lineHeight);
				e.restore();
				continue;
			}
			e.font = `${n.textStyle.fontItalic ? "italic " : ""}${n.bold ? "bold " : ""}${n.fontPx}px ${n.font}`;
			let l = n.legendKey ? Un([n.legendKey.entry], n.fontPx, n.legendKey.ptToPx)[0] ?? 0 : 0, u = n.legendKey ? Wn(n.legendKey.entry, n.fontPx, n.legendKey.ptToPx) : 0, d = n.rich?.width ?? n.lines.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), f = n.legendKey && (n.rich || n.lines.length > 0) ? Nn : 0, p = i - (l + f + d) / 2;
			if (n.legendKey && Tn(e, n.legendKey.entry.swatchStyle, n.legendKey.entry.color, p, a - u / 2, l, u, n.legendKey.entry.marker, n.legendKey.entry.fillPaint, n.legendKey.entry.outlinePaint, n.legendKey.entry.outlineColor, n.legendKey.entry.outlineWidthEmu, n.legendKey.entry.outlineDash, n.legendKey.entry.outlineCustomDash, n.legendKey.entry.outlineCap, n.legendKey.entry.outlineJoin, n.legendKey.ptToPx, n.legendKey.shapeRotationDeg, n.legendKey.entry.directEffect, n.legendKey.entry.fallbackEffect, n.legendKey.entry.directEffectIndex, n.legendKey.entry.fallbackEffectIndex), n.rich) {
				It(e, n.rich, p + l + f, a, "left", "middle"), e.restore();
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
function Gi(e, t, n, r, i, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T) {
	let E = kn(t, m), D = (e) => w.get(e), O = M(n.fontSizeHpt, m) ?? Math.max(9, u * .09), k = n.labelBox, A = [], j = f;
	for (let a = 0; a < o.length; a++) {
		let f = o[a] / s * Math.PI * 2, w = j + f / 2;
		if (j += f, f <= 0 || !C.has(a)) continue;
		let T = D(a);
		if (Ve(n, T)) continue;
		let N = T?.showCatName ?? n.showCatName, P = T?.showSerName ?? n.showSerName, F = T?.showVal ?? n.showVal, ee = T?.showPercent ?? n.showPercent, te = T?.showLegendKey ?? n.showLegendKey ?? !1, I = M(T?.fontSizeHpt, m) ?? O, ne = T?.fontBold ?? n.fontBold ?? !1, L = T?.fontFace ?? n.fontFace ? $(t, T?.fontFace ?? n.fontFace, "minor") : p, re = T?.fontColor ? `#${T.fontColor}` : n.fontColor ? `#${n.fontColor}` : "#000", R = vt(T?.labelBox, k), z = T?.position ?? n.position ?? "bestFit", ae = ie({
			customText: T?.text,
			showCategory: N,
			showSeries: P,
			showValue: F,
			showPercent: ee,
			category: (i[a] ?? "").toString(),
			seriesName: r.name,
			sourceValue: o[a],
			percentRatio: o[a] / s,
			formatCode: T?.formatCode ?? n.formatCode ?? r.valFormatCode ?? null,
			percentFormatCode: T?.formatCode ?? n.formatCode ?? "0%",
			date1904: t.date1904 ?? !1,
			separator: T?.separator ?? n.separator,
			defaultSeparator: "\n"
		}), B = te ? E(0, a) : void 0;
		if (!ae && !B) continue;
		let oe = K(T, n), se = ua(t, T, m, L, ne, oe), ce = oe.textBodyAuthored === !0 || oe.textLInsEmu != null || oe.textTInsEmu != null || oe.textRInsEmu != null || oe.textBInsEmu != null, V = Ye(oe, m), H = ce ? V.left : Math.max(4, I * .45), U = ce ? V.right : Math.max(4, I * .45), le = ce ? V.top : Math.max(2, I * .28), ue = ce ? V.bottom : Math.max(2, I * .28), de = I * .22, fe = I + de;
		e.font = `${oe.fontItalic ? "italic " : ""}${ne ? "bold " : ""}${I}px ${L}`;
		let W = se ? Nt(e, se, I, re) : null;
		if (se && !W) continue;
		let me = W ? [] : Oe(ae, Math.max(0, g - H - U), Math.max(0, v - le - ue), fe, (t) => e.measureText(t).width, oe);
		if (!W && me.length === 0 && !B) continue;
		let he = W?.width ?? 0;
		if (!W) for (let t of me) he = Math.max(he, e.measureText(t).width);
		let ge = B ? Un([B.entry], I, m)[0] ?? 0 : 0, _e = B ? Wn(B.entry, I, m) : 0, ve = B && ae ? Nn : 0, ye = ge + ve + he + H + U, be = Math.max(_e, W?.height ?? (me.length > 0 ? me.length * fe - de : 0)) + le + ue, xe = pe(ye, be, oe.textRotation, oe.textVerticalMode), Se = Math.min(xe.w, g), Ce = Math.max(_e, W?.height ?? (me.length > 0 ? me.length * fe - de : 0));
		Ce = Math.min(xe.h, v);
		let we = c + Math.cos(w) * u, Te = l + Math.sin(w) * u, Ee = Math.cos(w) < 0, De = Math.max(Se, Ce) * .55 + u * .06, G = we + Math.cos(w) * De, ke = Te + Math.sin(w) * De, Ae, je = !1;
		if (T?.manualLayout) {
			let t = mt({
				kind: "point",
				x: G,
				y: ke,
				position: "ctr"
			}, {
				x: h,
				y: _,
				w: g,
				h: v
			}, {
				w: Se,
				h: Ce
			}, I, T.manualLayout, {
				x: y,
				y: b,
				w: x,
				h: S
			});
			if (!t || (Se = t.rect.w, Ce = t.rect.h, ye = Se, be = Ce, !W && (me = Oe(ae, Math.max(0, Se - H - U - ge - ve), Math.max(0, Ce - le - ue), fe, (t) => e.measureText(t).width, oe), me.length === 0 && !B))) continue;
			G = t.rect.x + t.rect.w / 2, ke = t.rect.y + t.rect.h / 2, Ee = G < c, Ae = t.clip;
		} else if (z !== "bestFit" && z !== "outEnd") {
			let t = d > .01 ? (d + u) / 2 : u * Li, n = c + Math.cos(w) * t, r = l + Math.sin(w) * t, i = 2 * t * Math.sin(Math.min(Math.PI, Math.abs(f)) / 2) - I, a = d > .01 ? u - d - I : u - I, o = Kr({
				x: n - i / 2,
				y: r - a / 2,
				w: i,
				h: a
			}, {
				x: h,
				y: _,
				w: g,
				h: v
			});
			if (!o) continue;
			if (W) Se = Math.min(Se, o.w), Ce = Math.min(Ce, o.h);
			else {
				if (me = Oe(ae, Math.max(0, o.w - H - U - ge - ve), Math.max(0, o.h - le - ue), fe, (t) => e.measureText(t).width, oe), me.length === 0 && !B) continue;
				he = me.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), ye = ge + ve + he + H + U, be = Math.max(_e, me.length > 0 ? me.length * fe - de : 0) + le + ue, xe = pe(ye, be, oe.textRotation, oe.textVerticalMode), Se = xe.w, Ce = xe.h;
			}
			let s = mt({
				kind: "point",
				x: n,
				y: r,
				position: z === "inBase" || z === "inEnd" ? "ctr" : z
			}, o, {
				w: Se,
				h: Ce
			}, I);
			if (!s) continue;
			G = s.textAlign === "left" ? s.x + Se / 2 : s.textAlign === "right" ? s.x - Se / 2 : s.x, ke = s.textBaseline === "top" ? s.y + Ce / 2 : s.textBaseline === "bottom" ? s.y - Ce / 2 : s.y, Ee = G < c, Ae = s.clip, je = !0;
		}
		A.push({
			lines: me,
			rich: W ?? void 0,
			legendKey: B,
			lineHeight: fe,
			midAngle: w,
			rimX: we,
			rimY: Te,
			boxW: Se,
			boxH: Ce,
			unrotatedW: ye,
			unrotatedH: be,
			cxBox: G,
			cyBox: ke,
			leftSide: Ee,
			fontColor: re,
			box: R,
			fontPx: I,
			bold: ne,
			font: L,
			textStyle: oe,
			ptToPx: m,
			inside: je,
			manualClip: Ae
		});
	}
	let N = _ + 2, P = _ + v - 2, F = P - N, ee = (e) => {
		if (e.length === 0) return;
		e.sort((e, t) => e.cyBox - t.cyBox);
		let t = 0;
		for (let n of e) t += n.boxH;
		if (t += (e.length - 1) * 3, t > F) {
			let t = e.reduce((e, t) => e + t.boxH, 0), n = e.length;
			if (n === 1) {
				e[0].cyBox = Math.min(Math.max(e[0].cyBox, N + e[0].boxH / 2), P - e[0].boxH / 2);
				return;
			}
			let r = (F - t) / (n - 1), i = N;
			for (let t of e) t.cyBox = i + t.boxH / 2, i += t.boxH + r;
			return;
		}
		for (let t = 1; t < e.length; t++) {
			let n = e[t - 1], r = e[t], i = (n.boxH + r.boxH) / 2 + 3;
			r.cyBox - n.cyBox < i && (r.cyBox = n.cyBox + i);
		}
		let n = e[e.length - 1].cyBox + e[e.length - 1].boxH / 2 - P;
		if (n > 0) for (let t of e) t.cyBox -= n;
		let r = N - (e[0].cyBox - e[0].boxH / 2);
		if (r > 0) for (let t of e) t.cyBox += r;
	};
	ee(A.filter((e) => !e.manualClip && !e.leftSide)), ee(A.filter((e) => !e.manualClip && e.leftSide));
	for (let e of A) e.manualClip || (e.cyBox = Math.max(N + e.boxH / 2, e.cyBox), e.cyBox = Math.min(P - e.boxH / 2, e.cyBox));
	let te = h + 2, I = h + g - 2;
	for (let e of A) {
		if (e.manualClip) continue;
		let t = e.boxW / 2;
		e.cxBox - t < te && (e.cxBox = te + t), e.cxBox + t > I && (e.cxBox = I - t);
	}
	e.save(), e.beginPath(), e.rect(h, _, g, v), e.clip();
	let ne = ni(t, n), L = ne.color ? `#${ne.color}` : "#a6a6a6", re = ne.widthEmu ? Math.max(.5, ne.widthEmu / St * m) : 1;
	e.setLineDash(ga(ne.dash ?? void 0, re));
	for (let t of A) {
		let r = t.cxBox + (t.leftSide ? t.boxW / 2 : -t.boxW / 2), i = t.cyBox, a = r - t.rimX, o = i - t.rimY, s = Math.hypot(a, o);
		!t.inside && n.showLeaderLines && ne.hidden !== !0 && (ne.paintAuthored !== !0 || ne.color != null) && s > t.fontPx * .9 && (e.beginPath(), e.moveTo(t.rimX, t.rimY), e.lineTo(r, i), e.strokeStyle = L, e.lineWidth = re, e.stroke());
	}
	for (let t of A) {
		t.manualClip && (e.save(), e.beginPath(), e.rect(t.manualClip.x, t.manualClip.y, t.manualClip.w, t.manualClip.h), e.clip());
		let n = t.cxBox - t.boxW / 2, r = t.cyBox - t.boxH / 2;
		a(e, t.box, {
			x: n,
			y: r,
			w: t.boxW,
			h: t.boxH
		}, m, T);
		let i = t.textStyle.textBodyAuthored === !0 || t.textStyle.textLInsEmu != null || t.textStyle.textTInsEmu != null || t.textStyle.textRInsEmu != null || t.textStyle.textBInsEmu != null, o = Ye(t.textStyle, t.ptToPx), s = i ? o.left : Math.max(4, t.fontPx * .45), c = i ? o.right : Math.max(4, t.fontPx * .45), l = i ? o.top : Math.max(2, t.fontPx * .28), u = i ? o.bottom : Math.max(2, t.fontPx * .28), d = pe(t.unrotatedW, t.unrotatedH, t.textStyle.textRotation, t.textStyle.textVerticalMode), f = t.cxBox + (s - c) / 2, p = t.cyBox + (l - u) / 2, h = n + s, g = n + t.boxW - c, _ = Math.max(0, g - h), v = we(t.textStyle, "center"), y = v === "left" ? h : v === "right" ? g : f, b = (e) => (t.textStyle.textVerticalAnchor ?? (t.textStyle.textBodyAuthored === !0 ? "t" : "ctr")) === "t" ? r + l + e / 2 : (t.textStyle.textVerticalAnchor ?? (t.textStyle.textBodyAuthored === !0 ? "t" : "ctr")) === "b" ? r + t.boxH - u - e / 2 : p, x = (e) => v === "left" ? h : v === "right" ? g - e : f - e / 2;
		if (e.save(), e.beginPath(), e.rect(n, r, t.boxW, t.boxH), e.clip(), d.radians !== 0 && (e.translate(t.cxBox, t.cyBox), e.rotate(d.radians), e.translate(-t.cxBox, -t.cyBox)), !t.legendKey) {
			let n = b(t.rich?.height ?? Math.max(0, t.lines.length * t.lineHeight - (t.lineHeight - t.fontPx)));
			if (t.rich) {
				It(e, t.rich, y, n, v, "middle", _), e.restore(), t.manualClip && e.restore();
				continue;
			}
			e.font = `${t.textStyle.fontItalic ? "italic " : ""}${t.bold ? "bold " : ""}${t.fontPx}px ${t.font}`, e.fillStyle = t.fontColor, e.textAlign = v, e.textBaseline = "middle";
			let r = t.lineHeight - t.fontPx, i = (t.textStyle.fontBaseline ?? 0) * t.fontPx, a = n - (t.lines.length * t.lineHeight - r) / 2 + t.fontPx / 2 - i;
			if (!(t.textStyle.fontPaintAuthored === !0 && (t.textStyle.fontHidden === !0 || t.textStyle.fontColor == null))) for (let n = 0; n < t.lines.length; n++) e.fillText(t.lines[n], y, a + n * t.lineHeight);
			e.restore(), t.manualClip && e.restore();
			continue;
		}
		let S = t.legendKey ? Un([t.legendKey.entry], t.fontPx, t.legendKey.ptToPx)[0] ?? 0 : 0, C = t.legendKey ? Wn(t.legendKey.entry, t.fontPx, t.legendKey.ptToPx) : 0, w = t.legendKey && (t.rich || t.lines.length > 0) ? Nn : 0, E = t.rich?.width ?? t.lines.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), D = S + w + E, O = b(Math.max(C, t.rich?.height ?? Math.max(0, t.lines.length * t.lineHeight - (t.lineHeight - t.fontPx)))), k = x(D);
		if (t.legendKey && Tn(e, t.legendKey.entry.swatchStyle, t.legendKey.entry.color, k, O - C / 2, S, C, t.legendKey.entry.marker, t.legendKey.entry.fillPaint, t.legendKey.entry.outlinePaint, t.legendKey.entry.outlineColor, t.legendKey.entry.outlineWidthEmu, t.legendKey.entry.outlineDash, t.legendKey.entry.outlineCustomDash, t.legendKey.entry.outlineCap, t.legendKey.entry.outlineJoin, t.legendKey.ptToPx, t.legendKey.shapeRotationDeg, t.legendKey.entry.directEffect, t.legendKey.entry.fallbackEffect, t.legendKey.entry.directEffectIndex, t.legendKey.entry.fallbackEffectIndex), t.rich) {
			It(e, t.rich, k + S + w, O, "left", "middle", E), e.restore(), t.manualClip && e.restore();
			continue;
		}
		e.font = `${t.textStyle.fontItalic ? "italic " : ""}${t.bold ? "bold " : ""}${t.fontPx}px ${t.font}`, e.fillStyle = t.fontColor, e.textAlign = "left", e.textBaseline = "middle";
		let A = t.lineHeight - t.fontPx, j = (t.textStyle.fontBaseline ?? 0) * t.fontPx, M = O - (t.lines.length * t.lineHeight - A) / 2 + t.fontPx / 2 - j;
		if (!(t.textStyle.fontPaintAuthored === !0 && (t.textStyle.fontHidden === !0 || t.textStyle.fontColor == null))) for (let n = 0; n < t.lines.length; n++) e.fillText(t.lines[n], k + S + w, M + n * t.lineHeight);
		e.restore(), t.manualClip && e.restore();
	}
	e.restore();
}
function Ki(t, n, r, i, a = 0) {
	let { x: o, y: s, w: c, h: l } = r, u = Gr(n), d = u.length;
	if (d < 3) return;
	let h = Kn(t, n, c, l, .22, i), g = _(n, o, s, c, l, i, {
		titleTopPadFrac: .035,
		titleBottomPadFrac: .035,
		legendSideReserveFrac: .22,
		legendReserve: h,
		radialGapFrac: .02,
		honorPlotAreaManualLayout: !0
	}), v = g.title.fontPx;
	Wr(t, n, o, s, c, l, s + g.title.topPad, v);
	let { px0: y, py0: b, pw: w, ph: T } = g.plotRect;
	rt(t, n, y, b, w, T, i, a);
	let E = g.center.cx, D = g.center.cy, O = n.plotAreaManualLayout, k = O?.layoutTarget === "inner" && O.w != null && O.h != null && Number.isFinite(O.w) && Number.isFinite(O.h) && g.plotAreaManualLayoutApplied ? Math.min(w, T) / 2 : Math.min(w, T) * .38, A = Infinity, j = -Infinity;
	for (let e of n.series) for (let t of e.values) t != null && (A = Math.min(A, t), j = Math.max(j, t));
	isFinite(A) || (A = 0, j = 1), j === 0 && (j = 1);
	let M = n.valAxisMinorTickMark != null && n.valAxisMinorTickMark !== "none", N = n.valAxisLogBase != null && Number.isFinite(n.valAxisLogBase) && n.valAxisLogBase >= 2, P = n.valAxisMajorUnit ?? (N ? null : wt(n.valMin ?? A, n.valMax ?? j, k / i)), F = zt({
		dataMin: A,
		dataMax: j,
		explicitMin: n.valMin,
		explicitMax: n.valMax,
		axisLenPt: k / i,
		axisOrientation: "vertical",
		majorUnit: P,
		minorUnit: n.valAxisMinorUnit,
		needMinor: n.valAxisMinorGridlines === !0 || M,
		logBase: n.valAxisLogBase,
		reversed: ur(n)
	}), ee = (e) => ma(F.fraction(e), 0, 1), te = -Math.PI / 2, I = (e) => te + e / d * Math.PI * 2, ne = F.majorTicks.filter((e) => ee(e) > 0), L = (e) => {
		let n = ee(e) * k;
		t.beginPath();
		for (let e = 0; e < d; e++) {
			let r = I(e), i = E + Math.cos(r) * n, a = D + Math.sin(r) * n;
			e === 0 ? t.moveTo(i, a) : t.lineTo(i, a);
		}
		t.closePath(), t.stroke();
	};
	if (n.valAxisMinorGridlines) {
		let e = rr(n, i);
		t.strokeStyle = e.color, t.lineWidth = e.width;
		let r = e.dash.length > 0 && t.getLineDash ? t.getLineDash() : [];
		e.dash.length > 0 && t.setLineDash(e.dash);
		for (let e of F.minorTicks) L(e);
		e.dash.length > 0 && t.setLineDash(r);
	}
	if (!n.valAxisHidden && fr(n)) {
		let e = nr(n, i);
		t.strokeStyle = e.color, t.lineWidth = e.width;
		let r = e.dash.length > 0 && t.getLineDash ? t.getLineDash() : [];
		e.dash.length > 0 && t.setLineDash(e.dash);
		for (let e of ne) L(e);
		e.dash.length > 0 && t.setLineDash(r);
	}
	t.strokeStyle = "#bbb", t.lineWidth = .5;
	for (let e = 0; e < d; e++) {
		let n = I(e);
		t.beginPath(), t.moveTo(E, D), t.lineTo(E + Math.cos(n) * k, D + Math.sin(n) * k), t.stroke();
	}
	if (!n.valAxisHidden) {
		t.font = ln(Er(n.valAxisFontSizeHpt, l, i), $(n, n.valAxisFontFace, "minor"), n.valAxisFontBold ?? !1, n.valAxisFontItalic ?? !1), t.fillStyle = n.valAxisFontColor ? `#${n.valAxisFontColor}` : "#555", t.textAlign = "right", t.textBaseline = "middle";
		for (let e of ne) {
			let r = D - ee(e) * k, a = ut(n.valAxisLineColor, n.valAxisLineWidthEmu, i);
			Zn(t, n.valAxisMajorTickMark, "val", E, r, a.color, a.width, !1, n.valAxisLineHidden, "major", i, n.valAxisLineDash), n.valAxisTickLabelPos !== "none" && t.fillText(mr(n, e, !1), E - 3, r);
		}
		if (M) {
			let e = ut(n.valAxisLineColor, n.valAxisLineWidthEmu, i);
			for (let r of F.minorTicks) Zn(t, n.valAxisMinorTickMark, "val", E, D - ee(r) * k, e.color, e.width, !1, n.valAxisLineHidden, "minor", i, n.valAxisLineDash);
		}
	}
	t.font = ln(n.catAxisFontSizeHpt == null ? Math.max(8, Math.min(11, k * .2)) : Er(n.catAxisFontSizeHpt, l, i), $(n, n.catAxisFontFace, "minor"), n.catAxisFontBold ?? !1, n.catAxisFontItalic ?? !1), t.fillStyle = n.catAxisFontColor ? `#${n.catAxisFontColor}` : "#444", t.textBaseline = "middle";
	let re = E - w / 2, R = E + w / 2;
	if (!n.catAxisHidden && kr(n)) for (let e = 0; e < d; e++) {
		let r = I(e), i = m(12, n.catAxisLabelOffsetPercent), a = E + Math.cos(r) * (k + i), o = D + Math.sin(r) * (k + i), s = n.catAxisLabelAlignment, c = s === "l" ? "left" : s === "r" ? "right" : s === "ctr" ? "center" : Math.cos(r) < -.1 ? "right" : Math.cos(r) > .1 ? "left" : "center";
		t.textAlign = c;
		let l = c === "right" ? a - re : c === "left" ? R - a : 2 * Math.min(R - a, a - re), d = p((u[e] ?? "").toString(), n.catAxisFormatCode, n.date1904);
		t.fillText(At(t, d, l), a, o);
	}
	let z = de("radar", n.chartType, n.scatterStyle, n.radarStyle), ie = Math.max(2, k * .025);
	for (let r = 0; r < n.series.length; r++) {
		let o = n.series[r], s = en(r, o), c = xa(o, r), l = [];
		for (let e = 0; e < d; e++) {
			let t = o.values[e];
			if (t == null) {
				l.push(null);
				continue;
			}
			let n = ee(t), r = I(e);
			l.push([E + Math.cos(r) * k * n, D + Math.sin(r) * k * n]);
		}
		let u = l.every((e) => e != null), p = [], m = [];
		for (let e = 0; e < l.length; e++) {
			let t = l[e];
			t == null ? (m.length > 0 && p.push(m), m = []) : m.push({
				x: t[0],
				y: t[1],
				index: e
			});
		}
		m.length > 0 && p.push(m);
		let h = {
			x: y,
			y: b,
			w,
			h: T
		}, g = (e) => {
			let t = e.getLineDash ? e.getLineDash() : [], r = e.lineCap, d = e.lineJoin;
			e.beginPath();
			let f = !1;
			for (let t of l) {
				if (t == null) {
					f = !1;
					continue;
				}
				f ? e.lineTo(t[0], t[1]) : (e.moveTo(t[0], t[1]), f = !0);
			}
			u && e.closePath(), z && u && ja(e, S(n, o, void 0, c), h, je(s, .25), i, a), an(e, n, "dataPointLine", o, void 0, c, s, 2, i, h, a) && e.stroke(), e.setLineDash(t), e.lineCap = r, e.lineJoin = d;
		};
		if (lt(n, r)) {
			if (z && u) {
				let c = tn(o.dataPointOverrides).get(0);
				Se(t, e(c?.chartexStyle, o.chartexStyle), nt(n, "dataPoint", r), 0, h, i, (e) => {
					let t = S(n, o, c, 0, 0);
					if (t !== null) {
						e.beginPath();
						for (let t = 0; t < l.length; t++) {
							let n = l[t];
							t === 0 ? e.moveTo(n[0], n[1]) : e.lineTo(n[0], n[1]);
						}
						e.closePath(), ja(e, t, h, je(s, .25), i, a);
					}
				}, 0);
			}
			on(t, n, o, p, !1, u, s, 2, i, h, a);
		} else Se(t, e(o.chartexStyle), n.chartStyleRoles?.[z ? "dataPoint" : "dataPointLine"], c, h, i, g);
		let _ = !z && o.showMarker !== !1 && o.markerSymbol !== "none";
		if (!z && (_ || C(o))) {
			let e = tn(o.dataPointOverrides);
			for (let r = 0; r < l.length; r++) {
				let c = l[r];
				if (c == null) continue;
				let u = e.get(r), d = f(o, u, "circle", _);
				if (d === "none") continue;
				let p = u?.markerSize ?? o.markerSize ?? Math.max(4, ie * 2 / i), m = Ze(o, u, r, s), h = u?.markerLine ?? o.markerLine ?? null, g = u?.markerLineWidthEmu ?? o.markerLineWidthEmu;
				ia(t, n, o, u, r, c[0], c[1], d, p, m, h, i, g == null ? 1 : De(g, i), x(o, u, r), a);
			}
		}
	}
	Yn(t, n, h, o, s, c, l, y, b, w, T, g.title.bandH + 2, i);
}
function qi(e, t, n) {
	if (n) return t + 1;
	let r = e[t];
	if (r == null) return null;
	let i = parseFloat(r);
	return Number.isNaN(i) ? null : i;
}
function Ji(e, t) {
	return e.bubbleSizeRepresents === "w" ? t : Math.sqrt(t);
}
function Yi(e, t, n, r) {
	return Ze(e, t, n, r);
}
function Xi(e, t, n, r, i, a, s = o(t, n)) {
	let c = t.bubbleSizes?.[r];
	if (c != null && Number.isFinite(c) && c < 0) return t.invertedFillHidden === !0 ? {
		color: "00000000",
		paint: null
	} : t.invertedFill ? {
		color: t.invertedFill.fillType === "solid" ? t.invertedFill.color : a,
		paint: t.invertedFill
	} : s ? {
		color: "FFFFFF",
		paint: void 0
	} : {
		color: "00000000",
		paint: null
	};
	let l = J(e, "dataPoint"), u = V(n?.chartexStyle, l, r);
	if (u !== void 0) return {
		color: u?.fillType === "solid" ? u.color : a,
		paint: u
	};
	let d = Math.max(0, Be(e, t)), f = nt(e, "dataPoint", d), p = lt(e, d) ? r : i;
	if (n?.fillHidden === !0) {
		let e = N(l);
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
	let h = V(t.chartexStyle, l, i);
	if (h !== void 0) return {
		color: h?.fillType === "solid" ? h.color : a,
		paint: h
	};
	if (t.color != null) return {
		color: t.color,
		paint: void 0
	};
	let g = Da(e, f, p, t.values.length);
	return g === void 0 ? {
		color: Yi(t, n, r, a),
		paint: x(t, n, r)
	} : {
		color: g?.fillType === "solid" ? g.color : a,
		paint: g
	};
}
function Zi(e, n, r, i, a) {
	let s = r?.chartexStyle, c = n.chartexStyle, l = Math.max(0, Be(e, n)), u = nt(e, "dataPoint", l), d = J(e, "dataPoint"), f = lt(e, l) ? i : a, p = u, m = [
		s,
		c,
		p
	], h = r?.lineDash, g;
	if (h == null) {
		for (let e of m) if (e?.lineDash != null || e?.lineCustomDash != null || e?.lineDashAuthored === !0) {
			h = e.lineDash, g = e.lineCustomDash ?? void 0;
			break;
		}
	}
	let _ = {
		widthEmu: r?.lineWidthEmu ?? s?.lineWidthEmu ?? n.lineWidthEmu ?? c?.lineWidthEmu ?? p?.lineWidthEmu ?? r?.markerLineWidthEmu ?? n.markerLineWidthEmu,
		dash: h,
		customDash: g,
		cap: s?.lineCap ?? c?.lineCap ?? p?.lineCap,
		join: s?.lineJoin ?? c?.lineJoin ?? p?.lineJoin
	}, v = ue(s, d, i);
	if (v !== void 0) return {
		color: v?.fillType === "solid" ? v.color : r?.lineColor ?? null,
		paint: v,
		..._
	};
	if (r?.lineHidden === !0) {
		let e = t(d);
		if (e !== void 0) return {
			color: null,
			paint: e,
			..._
		};
	}
	if (r?.lineColor != null) return {
		color: r.lineColor,
		paint: void 0,
		..._
	};
	let y = ue(c, d, a);
	if (y !== void 0) return {
		color: y?.fillType === "solid" ? y.color : n.lineColor ?? null,
		paint: y,
		..._
	};
	if (n.lineHidden === !0) {
		let e = t(d);
		if (e !== void 0) return {
			color: null,
			paint: e,
			..._
		};
	}
	if (n.lineColor != null) return {
		color: n.lineColor,
		paint: void 0,
		..._
	};
	let b = Ea(e, u, f, n.values.length);
	if (b !== void 0) return {
		color: b?.fillType === "solid" ? b.color : null,
		paint: b,
		..._
	};
	let x = n.bubbleSizes?.[i], S = x != null && Number.isFinite(x) && x < 0 && o(n, r) ? "000000" : null;
	return {
		color: r?.markerLine ?? n.markerLine ?? n.lineColor ?? S,
		paint: void 0,
		..._
	};
}
function Qi(e, t, n) {
	return {
		series: t,
		seriesIndex: n,
		fallbackColor: en(n, t),
		cats: t.categories ?? e.categories,
		pointOverrides: new Map((t.dataPointOverrides ?? []).map((e) => [e.idx, e]))
	};
}
function $i(e, t, n, r, i) {
	let a = ma(e.bubbleScale ?? 100, 0, 300);
	if (a <= 0) return 0;
	let o = 0;
	for (let { series: r, cats: i, pointOverrides: a } of t) if (!(r.showMarker === !1 || r.markerSymbol === "none")) for (let t = 0; t < r.values.length; t++) {
		if (r.values[t] == null || qi(i, t, n) == null || a.get(t)?.markerSymbol === "none") continue;
		let s = $e(e, r.bubbleSizes?.[t]);
		s != null && (o = Math.max(o, Ji(e, s)));
	}
	return o <= 0 ? 0 : Math.min(r, i) * a / (300 + a) / o;
}
function ea(t, n, r, i, a, s, c, l, u, d, p, m, h, g, _, v, y, b = 0, S) {
	let w = g === "line" || g === "lineMarker" || g === "lineNoMarker", T = g === "smooth" || g === "smoothMarker" || g === "smoothNoMarker", E = de("scatter", n.chartType, g, n.radarStyle), D = r.map(({ series: e, index: t }) => Qi(n, e, t)), O = kn(n, m), k = S ?? n, A = h ? $i(k, D, i, d, p) : 0;
	for (let { series: e, fallbackColor: r, cats: o } of D) for (let c of e.errBars ?? []) sa(t, e, ti(n, c), o, i, a, s, r);
	for (let { series: r, seriesIndex: o, fallbackColor: c, cats: f } of D) {
		let _ = g === "marker" && Je(r), v = _ || w, y = !_ && g === "marker" && !h || T;
		if (v || y) {
			let h = [];
			for (let e = 0; e < r.values.length; e++) {
				let t = r.values[e];
				if (t == null) continue;
				let n = qi(f, e, i);
				n != null && h.push({
					x: a(n),
					y: s(t),
					index: e
				});
			}
			if (h.length >= 2) {
				let i = xa(r, o), a = {
					x: l,
					y: u,
					w: d,
					h: p
				};
				if (lt(n, o)) {
					on(t, n, r, [h], y, !1, c, 1.5, m, a, b, !0);
					continue;
				}
				Se(t, e(r.chartexStyle), n.chartStyleRoles?.dataPointLine, i, a, m, (e) => {
					e.save();
					let t = an(e, n, "dataPointLine", r, void 0, i, c, 1.5, m, a, b, !0, !1);
					if (t && _ && r.dataPointColors?.some(Boolean)) {
						e.lineWidth = 1.5;
						for (let t = 1; t < h.length; t++) e.strokeStyle = `#${r.dataPointColors[t] ?? r.color ?? c.replace(/^#/, "")}`, e.beginPath(), e.moveTo(h[t - 1].x, h[t - 1].y), e.lineTo(h[t].x, h[t].y), e.stroke();
					} else if (t) {
						if (e.beginPath(), e.moveTo(h[0].x, h[0].y), y && h.length >= 3) for (let t = 0; t < h.length - 1; t++) {
							let n = h[t - 1] ?? h[t], r = h[t], i = h[t + 1], a = h[t + 2] ?? i;
							e.bezierCurveTo(r.x + (i.x - n.x) / 6, r.y + (i.y - n.y) / 6, i.x - (a.x - r.x) / 6, i.y - (a.y - r.y) / 6, i.x, i.y);
						}
						else for (let t = 1; t < h.length; t++) e.lineTo(h[t].x, h[t].y);
						e.stroke();
					}
					e.restore();
				});
			}
		}
	}
	for (let { series: e, seriesIndex: r, fallbackColor: c, cats: l, pointOverrides: u } of D) {
		let d = !E && e.showMarker !== !1 && e.markerSymbol !== "none";
		if (d || !E && C(e)) for (let p = 0; p < e.values.length; p++) {
			let g = e.values[p];
			if (g == null) continue;
			let _ = qi(l, p, i);
			if (_ == null) continue;
			let v = u.get(p), y = f(e, v, h ? "circle" : e.automaticMarkerSymbol ?? "circle", d);
			if (y === "none") continue;
			let S = v?.markerSize ?? e.markerSize ?? 5;
			if (h) {
				if (A <= 0) continue;
				let t = $e(k, e.bubbleSizes?.[p]);
				if (t == null) continue;
				S = Ji(k, t) * A / m;
			}
			let C = h ? Xi(n, e, v, p, xa(e, r), c) : null, w = C?.color ?? Yi(e, v, p, c), T = h ? Zi(n, e, v, p, xa(e, r)) : null, E = h ? T.color : v?.markerLine ?? e.markerLine ?? null, D = v?.markerLineWidthEmu ?? e.markerLineWidthEmu, O = T?.widthEmu, j = h ? O : D, M = j == null ? void 0 : De(j, m), N = h ? o(e, v) : !1;
			ia(t, n, e, v, p, a(_), s(g), y, S, w, E, m, M, h ? C.paint : x(e, v, p), b, h ? T.paint : void 0, h ? T.dash : void 0, h ? T.customDash : void 0, h ? T.cap : void 0, h ? T.join : void 0, N, h);
		}
	}
	for (let { series: e, seriesIndex: r, cats: o, pointOverrides: l } of D) ca(t, e, o, i, a, s, p, m, n.date1904, $(n, n.dataLabelFontFace, "minor"), n.dataLabelPosition ?? "r", {
		x: c.x,
		y: u,
		w: c.w,
		h: p
	}, _, (e) => $(n, e, "minor"), y, (e) => O(r, e), (e) => qr(n, e, v), b, (t) => {
		if (E) return 0;
		let n = e.showMarker !== !1 && e.markerSymbol !== "none", r = l.get(t);
		if (f(e, r, "circle", n) === "none") return 0;
		let i = r?.markerSize ?? e.markerSize ?? 5;
		if (h) {
			if (A <= 0) return 0;
			let n = $e(k, e.bubbleSizes?.[t]);
			if (n == null) return 0;
			i = Ji(k, n) * A / m;
		}
		return Math.max(0, i * m / 2);
	});
	for (let { series: e, fallbackColor: r, cats: o } of D) Cr(t, e, r, a, s, m, e.values.map((e, t) => qi(o, t, i)), {
		chart: n,
		chartRect: c,
		plotRect: {
			x: l,
			y: u,
			w: d,
			h: p
		},
		clipLineToPlot: !0,
		shapeRotationDeg: b
	});
}
function ta(e, t, n, r, a = 0) {
	let { x: o, y: s, w: c, h: l } = n, u = t.series.map((e, t) => ({
		series: e,
		index: t
	})), d = te(t), f = ({ series: e, index: n }) => d[n]?.categoryAxis === "secondary" || t.plotGroups == null && e.useSecondaryAxis === !0, p = ({ series: e, index: n }) => d[n]?.valueAxis === "secondary" || t.plotGroups == null && e.useSecondaryAxis === !0, m = u.filter((e) => !f(e)), h = u.filter(f), g = u.filter((e) => !p(e)), v = u.filter(p), y = u.filter((e) => !f(e) && !p(e)), b = u.filter((e) => f(e) && p(e)), x = h.length > 0 ? t.secondaryCatAxis : null, S = v.length > 0 ? t.secondaryValAxis : null, C = ((e) => {
		let n = [];
		for (let { series: r } of e) {
			let e = r.categories ?? t.categories;
			for (let t of e) {
				let e = parseFloat(t);
				Number.isFinite(e) && n.push(e);
			}
		}
		return n;
	})(u).length === 0, w = u.length === 1 && u[0].series.bubbleXSourceIsString === !0 ? u[0].series.values.length + 1 : null, T = (e) => {
		let n = [], r = [];
		for (let { series: i } of e) {
			let e = i.categories ?? t.categories;
			for (let t = 0; t < i.values.length; t++) {
				let a = i.values[t];
				if (a == null) continue;
				let o = qi(e, t, C);
				o != null && (n.push(o), r.push(a));
			}
			Pr(i, "x", (t) => i.values[t] == null ? null : qi(e, t, C), (e) => n.push(e)), Pr(i, "y", (t) => qi(e, t, C) == null ? null : i.values[t] ?? null, (e) => r.push(e));
		}
		if (C && n.length === 0) {
			let t = 0;
			for (let { series: n } of e) t = Math.max(t, n.values.length);
			for (let e = 0; e < t; e++) n.push(e);
		}
		return {
			x: Vt(n),
			y: Vt(r)
		};
	}, E = {
		x: T(m.length > 0 ? m : h).x,
		y: T(g.length > 0 ? g : v).y
	}, D = {
		x: T(h).x,
		y: T(v).y
	}, O = Hr(e, t, c, l, r), k = O.fontPx, A = O.topPad, N = Er(t.catAxisFontSizeHpt, l, r), P = Er(t.valAxisFontSizeHpt, l, r), F = Kn(e, t, c, l, .22, r), { legRightW: ee, legLeftW: I, legTopH: ne, legBottomH: L } = Ie(F, t.legendOverlay === !0), re = i(t, c, l, r), R = re.catFontPx, z = re.valFontPx, ie = re.catBandH, ae = re.valBandW;
	Wr(e, t, o, s, c, l, s + A, k);
	let B = S ? zt({
		dataMin: D.y.min,
		dataMax: D.y.max,
		explicitMin: S.min,
		explicitMax: S.max,
		axisLenPt: Math.max(1, l * .7 / r),
		axisOrientation: "vertical",
		majorUnit: S.majorUnit,
		minorUnit: S.minorUnit,
		needMinor: S.minorGridlines === !0 || S.minorTickMark != null && S.minorTickMark !== "none",
		logBase: S.logBase,
		reversed: S.orientation === "maxMin"
	}) : null, oe = 0;
	if (S && B && !S.hidden && S.tickLabelPos !== "none") {
		let n = e.font;
		e.font = ln(M(S.fontSizeHpt, r) ?? P, $(t, S.fontFace, "minor"), S.fontBold ?? !1, S.fontItalic ?? !1);
		for (let n of B.majorTicks) oe = Math.max(oe, e.measureText(gr(n, S.formatCode, t.date1904, S.displayUnits)).width);
		oe += yt(P) + 4, e.font = n;
	}
	let se = x && !x.hidden && x.tickLabelPos !== "none" ? (M(x.fontSizeHpt, r) ?? N) + Re(N) + 2 : 0, { plotRect: { px0: ce, py0: V, pw: H, ph: U } } = _(t, o, s, c, l, r, {
		titleBand: O,
		legendSideReserveFrac: .22,
		legendReserve: F,
		pad: {
			t: O.bandH + ne + P / 2 + 2 + se,
			r: ee + c * .05 + oe,
			b: (t.catAxisHidden ? l * .04 : j(N)) + ie + L,
			l: (t.valAxisHidden ? c * .04 : c * .12) + ae + I
		},
		honorPlotAreaManualLayout: !0
	});
	if (H <= 0 || U <= 0) return;
	rt(e, t, ce, V, H, U, r, a);
	let { min: le, max: ue } = E.x, { min: de, max: fe } = E.y;
	t.valMin != null && (de = t.valMin), t.valMax != null && (fe = t.valMax);
	let pe = t.valAxisMinorGridlines === !0 || t.valAxisMinorTickMark != null && t.valAxisMinorTickMark !== "none", W = zt({
		dataMin: de,
		dataMax: fe,
		explicitMin: t.valMin,
		explicitMax: t.valMax,
		axisLenPt: U / r,
		axisOrientation: "vertical",
		majorUnit: t.valAxisMajorUnit,
		minorUnit: t.valAxisMinorUnit,
		needMinor: pe,
		logBase: t.valAxisLogBase,
		reversed: ur(t)
	});
	de = W.min, fe = W.max;
	let me = t.catAxisMinorGridlines === !0 || t.catAxisMinorTickMark != null && t.catAxisMinorTickMark !== "none", he = zt({
		dataMin: le,
		dataMax: ue,
		explicitMin: t.catAxisMin ?? (w == null ? null : 0),
		explicitMax: t.catAxisMax ?? w,
		axisLenPt: H / r,
		axisOrientation: "horizontal",
		majorUnit: t.catAxisMajorUnit,
		minorUnit: t.catAxisMinorUnit,
		needMinor: me,
		logBase: t.catAxisLogBase,
		reversed: dr(t)
	});
	le = he.min, ue = he.max;
	let ge = x ? zt({
		dataMin: D.x.min,
		dataMax: D.x.max,
		explicitMin: x.min,
		explicitMax: x.max,
		axisLenPt: H / r,
		axisOrientation: "horizontal",
		majorUnit: x.majorUnit,
		minorUnit: x.minorUnit,
		needMinor: x.minorGridlines === !0 || x.minorTickMark != null && x.minorTickMark !== "none",
		logBase: x.logBase,
		reversed: x.orientation === "maxMin"
	}) : null, _e = S ? zt({
		dataMin: D.y.min,
		dataMax: D.y.max,
		explicitMin: S.min,
		explicitMax: S.max,
		axisLenPt: U / r,
		axisOrientation: "vertical",
		majorUnit: S.majorUnit,
		minorUnit: S.minorUnit,
		needMinor: S.minorGridlines === !0 || S.minorTickMark != null && S.minorTickMark !== "none",
		logBase: S.logBase,
		reversed: S.orientation === "maxMin"
	}) : null, ve = (e) => ce + he.fraction(e) * H, ye = (e) => V + U - W.fraction(e) * U, be = (e) => ce + (ge?.fraction(e) ?? 0) * H, xe = (e) => V + U - (_e?.fraction(e) ?? 0) * U, Se = he.majorUnit, Ce = W.majorTicks, we = W.minorTicks, Te = he.majorTicks, Ee = he.minorTicks, Oe = V + U;
	if (t.catAxisCrossesAt != null) Oe = ma(ye(t.catAxisCrossesAt), V, V + U);
	else {
		let e = t.catAxisCrosses ?? "autoZero";
		e === "autoZero" && de < 0 && fe > 0 ? Oe = ma(ye(0), V, V + U) : e === "max" && (Oe = V);
	}
	let G = ce;
	if (t.valAxisCrossesAt != null) G = ma(ve(t.valAxisCrossesAt), ce, ce + H);
	else {
		let e = t.valAxisCrosses ?? "autoZero";
		e === "autoZero" && le < 0 && ue > 0 ? G = ma(ve(0), ce, ce + H) : e === "max" && (G = ce + H);
	}
	let ke = nr(t, r);
	if (!t.valAxisHidden) {
		let n = t.valAxisFontSizeHpt == null ? Math.max(8, Math.min(11, U / 20)) : Er(t.valAxisFontSizeHpt, l, r), i = t.valAxisFontSizeHpt == null ? 4 : yt(n);
		e.font = ln(n, $(t, t.valAxisFontFace, "minor"), t.valAxisFontBold ?? !1, t.valAxisFontItalic ?? !1);
		let a = t.valAxisLineColor ? `#${t.valAxisLineColor}` : void 0, o = De(t.valAxisLineWidthEmu, r), s = t.valAxisLineHidden ? 0 : er(t.valAxisMajorTickMark, "major", o, r);
		if (t.valAxisMinorGridlines) {
			let n = rr(t, r);
			for (let t of we) tr(e, ce, H, ye(t), !1, n);
		}
		for (let n of Ce) {
			let c = ye(n);
			if (e.strokeStyle = ke.color, e.lineWidth = ke.width, fr(t)) {
				let t = ke.dash.length > 0 && e.getLineDash ? e.getLineDash() : [];
				ke.dash.length > 0 && e.setLineDash(ke.dash), e.beginPath(), e.moveTo(ce, c), e.lineTo(ce + H, c), e.stroke(), ke.dash.length > 0 && e.setLineDash(t);
			}
			if (t.valAxisTickLabelPos !== "none") {
				e.fillStyle = t.valAxisFontColor ? `#${t.valAxisFontColor}` : "#555";
				let r = t.valAxisTickLabelPos ?? "nextTo", a;
				r === "high" ? (e.textAlign = "left", a = ce + H + i) : r === "low" ? (e.textAlign = "right", a = ce - i) : (e.textAlign = "right", a = G - s - i), e.textBaseline = "middle", e.fillText(mr(t, n, !1), a, c);
			}
			Zn(e, t.valAxisMajorTickMark, "val", G, c, a, o, !1, t.valAxisLineHidden, "major", r, t.valAxisLineDash);
		}
		if (t.valAxisMinorTickMark && t.valAxisMinorTickMark !== "none") for (let n of we) Zn(e, t.valAxisMinorTickMark, "val", G, ye(n), a, o, !1, t.valAxisLineHidden, "minor", r, t.valAxisLineDash);
	}
	if (!t.catAxisHidden && or(t) && Se > 0) {
		let n = sr(t, r);
		e.strokeStyle = n.color, e.lineWidth = n.width;
		let i = n.dash.length > 0 && e.getLineDash ? e.getLineDash() : [];
		n.dash.length > 0 && e.setLineDash(n.dash);
		for (let t of Te) {
			let n = ve(t);
			e.beginPath(), e.moveTo(n, V), e.lineTo(n, V + U), e.stroke();
		}
		n.dash.length > 0 && e.setLineDash(i);
	}
	if (!t.catAxisHidden && t.catAxisMinorGridlines && Se > 0) {
		let n = cr(t, r), i = n.dash.length > 0 && e.getLineDash ? e.getLineDash() : [];
		e.strokeStyle = n.color, e.lineWidth = n.width, n.dash.length > 0 && e.setLineDash(n.dash);
		for (let t of Ee) {
			let n = ve(t);
			e.beginPath(), e.moveTo(n, V), e.lineTo(n, V + U), e.stroke();
		}
		n.dash.length > 0 && e.setLineDash(i);
	}
	if (!t.catAxisHidden && !t.catAxisLineHidden && (e.save(), e.lineCap = "butt", Qn(e, ce, Oe, ce + H, Oe, t.catAxisLineColor ? `#${t.catAxisLineColor}` : "#888", De(t.catAxisLineWidthEmu, r), t.catAxisLineDash), e.restore()), !t.valAxisHidden && !t.valAxisLineHidden && (e.save(), Qn(e, G, V, G, V + U, t.valAxisLineColor ? `#${t.valAxisLineColor}` : "#888", De(t.valAxisLineWidthEmu, r), t.valAxisLineDash), e.restore()), !t.catAxisHidden) {
		let n = t.catAxisFontSizeHpt == null ? Math.max(8, Math.min(11, U / 20)) : Er(t.catAxisFontSizeHpt, l, r), i = t.catAxisFontSizeHpt == null ? 4 : Re(n);
		e.font = ln(n, $(t, t.catAxisFontFace, "minor"), t.catAxisFontBold ?? !1, t.catAxisFontItalic ?? !1), e.fillStyle = t.catAxisFontColor ? `#${t.catAxisFontColor}` : "#555", e.textAlign = "center";
		let a = t.catAxisTickLabelPos ?? "nextTo", o = De(t.catAxisLineWidthEmu, r), s = t.catAxisLineColor ? `#${t.catAxisLineColor}` : void 0, c = t.catAxisLineHidden ? 0 : er(t.catAxisMajorTickMark, "major", o, r), u = a === "low" ? V + U + i : a === "high" ? V - i : Oe + c + i;
		e.textBaseline = a === "high" ? "bottom" : "top";
		for (let n of Te) {
			let i = ve(n);
			a !== "none" && e.fillText(gr(n, t.catAxisFormatCode, t.date1904, t.catAxisDisplayUnits), i, u), Zn(e, t.catAxisMajorTickMark, "cat", Oe, i, s, o, !1, t.catAxisLineHidden, "major", r, t.catAxisLineDash);
		}
		if (t.catAxisMinorTickMark && t.catAxisMinorTickMark !== "none") for (let n of Ee) Zn(e, t.catAxisMinorTickMark, "cat", Oe, ve(n), s, o, !1, t.catAxisLineHidden, "minor", r, t.catAxisLineDash);
	}
	let K = (i, u, d, f, p, m, h, g) => {
		i.length !== 0 && ea(e, t, i, C, f, p, n, ce, V, H, U, r, u, d, {
			x: o,
			y: s,
			w: c,
			h: l
		}, m, h, a, g);
	};
	if (t.plotGroups == null) {
		let e = t.chartType === "bubble", n = e ? "marker" : t.scatterStyle ?? "marker";
		K(y, e, n, ve, ye, W.max, t.valAxisDisplayUnits), b.length > 0 && ge && _e && K(b, e, n, be, xe, _e.max, S?.displayUnits);
	} else for (let e of t.plotGroups) {
		if (e.kind !== "scatter" && e.kind !== "bubble") continue;
		let n = t.series.slice(e.seriesStart, e.seriesStart + e.seriesCount).map((t, n) => ({
			series: t,
			index: e.seriesStart + n
		}));
		if (n.length === 0) continue;
		let r = e.kind === "bubble", i = e.categoryAxis === "secondary", a = e.valueAxis === "secondary";
		K(n, r, r ? "marker" : e.scatterStyle ?? t.scatterStyle ?? "marker", i ? be : ve, a ? xe : ye, a && _e ? _e.max : W.max, a ? S?.displayUnits : t.valAxisDisplayUnits, r ? {
			bubbleScale: e.bubbleScale ?? t.bubbleScale,
			bubbleSizeRepresents: e.bubbleSizeRepresents ?? t.bubbleSizeRepresents,
			showNegativeBubbles: e.showNegativeBubbles ?? t.showNegativeBubbles
		} : void 0);
	}
	if (x && ge && !x.hidden) {
		let n = ut(x.lineColor, x.lineWidthEmu, r);
		x.lineHidden || Qn(e, ce, V, ce + H, V, n.color, n.width, x.lineDash);
		let i = M(x.fontSizeHpt, r) ?? N;
		e.font = ln(i, $(t, x.fontFace, "minor"), x.fontBold ?? !1, x.fontItalic ?? !1), e.fillStyle = x.fontColor ? `#${x.fontColor}` : "#555", e.textAlign = "center", e.textBaseline = "bottom";
		let a = x.lineHidden ? 0 : er(x.majorTickMark, "major", n.width, r);
		for (let o of ge.majorTicks) {
			let s = be(o);
			x.tickLabelPos !== "none" && e.fillText(gr(o, x.formatCode, t.date1904, x.displayUnits), s, V - a - Re(i)), Zn(e, x.majorTickMark, "cat", V, s, n.color, n.width, !0, x.lineHidden, "major", r, x.lineDash);
		}
		if (x.minorTickMark && x.minorTickMark !== "none") for (let t of ge.minorTicks) Zn(e, x.minorTickMark, "cat", V, be(t), n.color, n.width, !0, x.lineHidden, "minor", r, x.lineDash);
	}
	S && _e && Lr(e, t, S, {
		min: _e.min,
		max: _e.max,
		step: _e.majorUnit,
		majorLines: _e.majorTicks,
		minorTicks: _e.minorTicks,
		makeToY: () => xe
	}, xe, n, ce, V, H, U, r, M(S.fontSizeHpt, r) ?? P, oe, t.valAxisFontColor ? `#${t.valAxisFontColor}` : "#555", t.date1904), Yn(e, t, F, o, s, c, l, ce, V, H, U, O.bandH + 2, r), pn(e, t, o, s, c, l, ce, V, H, U, I, L, R, z);
}
var na = 15;
function ra(e, t, n, r) {
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
function ia(t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g = void 0, _ = void 0, v = void 0, y = void 0, b = void 0, x = !1, S = !1) {
	let C = S ? e(i?.chartexStyle) : e(i?.markerStyle, i?.chartexStyle), w = e(S ? r.chartexStyle : r.markerStyle), T = C ?? w, E = Math.max(0, Be(n, r)), D = r.chartexFormatIdx ?? E, O = lt(n, E), k = C ? a : D, A = nt(n, "dataPointMarker", E), j = J(n, "dataPointMarker"), M = O ? a : D, N = V(i?.markerStyle, j, a), P = V(r.markerStyle, j, D), F = N !== void 0 || i?.markerFill != null || i?.markerFillPaintAuthored === !0 && i.markerStyle?.fillHidden !== !0, ee = P !== void 0 || r.markerFill != null || r.markerFillPaintAuthored === !0 && r.markerStyle?.fillHidden !== !0, te = u, I = m;
	if (!S && !F && !ee) {
		let e = xe(A, j, M, i?.markerStyle?.shapePropertiesPresent === !0 ? i.markerStyle : r.markerStyle);
		e === null ? (te = "00000000", I = null) : e?.fillType === "solid" ? (te = e.color, I = void 0) : e !== void 0 && (I = e);
	}
	let ne = ue(i?.markerStyle, j, a), L = ue(r.markerStyle, j, D), re = d, R = g;
	if (!S && R === void 0) if (ne !== void 0) R = ne?.fillType === "solid" ? void 0 : ne;
	else if (i?.markerLine != null) R = void 0;
	else if (i?.markerLinePaintAuthored === !0 && i.markerStyle?.lineHidden !== !0 && (i.markerLine == null || i.markerLine === "00000000")) R = null;
	else if (L !== void 0) R = L?.fillType === "solid" ? void 0 : L;
	else if (r.markerLine != null) R = void 0;
	else if (r.markerLinePaintAuthored === !0 && r.markerStyle?.lineHidden !== !0 && (r.markerLine == null || r.markerLine === "00000000")) R = null;
	else {
		let e = et(A, j, M, i?.markerStyle?.shapePropertiesPresent === !0 ? i.markerStyle : r.markerStyle);
		e?.fillType === "solid" ? (re = e.color, R = void 0) : (R = e, e === null && (re = null));
	}
	let z = S ? void 0 : A, ie = p ?? (() => {
		let e = i?.markerStyle?.lineWidthEmu ?? r.markerStyle?.lineWidthEmu ?? z?.lineWidthEmu;
		return e == null ? void 0 : De(e, f);
	})(), ae = ye(_ != null || v != null ? {
		lineDash: _,
		lineCustomDash: v,
		lineDashAuthored: !0
	} : void 0, i?.markerStyle, r.markerStyle, z), B = ae?.lineDash, oe = ae?.lineCustomDash, se = y ?? i?.markerStyle?.lineCap ?? r.markerStyle?.lineCap ?? z?.lineCap, ce = b ?? i?.markerStyle?.lineJoin ?? r.markerStyle?.lineJoin ?? z?.lineJoin, H = S ? nt(n, x ? "dataPoint3D" : "dataPoint", E) : A, U = S && lt(n, E) || O ? a : D;
	oa(t, o, s, c, l, te, re, f, ie, I, h, R, B, oe, se, ce, x, T, H, k, U);
}
function aa(e, t, r = Math.max(0, Be(e, t))) {
	return n(t) || nt(e, "dataPointMarker", r) != null;
}
function oa(e, t, n, r, i, a, o, s, c = 1, l = void 0, u = 0, d = void 0, f = void 0, p = void 0, m = void 0, h = void 0, g = !1, _ = void 0, v = void 0, y = 0, b = y) {
	let x = Math.max(2, i * s), S = x / 2;
	if (_ !== void 0 || v !== void 0) {
		Se(e, _, v, y, {
			x: t - S,
			y: n - S,
			w: x,
			h: x
		}, s, (e) => oa(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g), b);
		return;
	}
	let C = a.startsWith("#") ? a : `#${a}`, w = o ? o.startsWith("#") ? o : `#${o}` : null;
	e.save(), e.fillStyle = l === void 0 ? C : l == null ? "rgba(0,0,0,0)" : G(l, e, t - S, n - S, x, x, u) ?? "rgba(0,0,0,0)";
	let T = d === void 0 ? w : d == null ? null : G(d, e, t - S, n - S, x, x, u), E = T != null;
	T && (e.strokeStyle = T, e.lineWidth = c, e.setLineDash(_a(p, f, c)), e.lineCap = m === "rnd" ? "round" : m === "sq" ? "square" : "butt", e.lineJoin = h === "round" || h === "bevel" ? h : "miter");
	let D = l?.fillType === "image" ? l : void 0, O = () => {
		if (!D) {
			l !== null && e.fill();
			return;
		}
		e.save(), e.clip(), st(e, D, t - S, n - S, x, x, s, u), e.restore();
	}, k = () => {
		g && l !== null && ra(e, t, n, x);
	};
	switch (r) {
		case "square":
			D || g ? (e.beginPath(), e.rect(t - S, n - S, x, x), O(), k()) : l !== null && e.fillRect(t - S, n - S, x, x), E && e.strokeRect(t - S, n - S, x, x);
			break;
		case "diamond":
			e.beginPath(), e.moveTo(t, n - S), e.lineTo(t + S, n), e.lineTo(t, n + S), e.lineTo(t - S, n), e.closePath(), O(), k(), E && e.stroke();
			break;
		case "triangle":
			e.beginPath(), e.moveTo(t, n - S), e.lineTo(t + S, n + S), e.lineTo(t - S, n + S), e.closePath(), O(), k(), E && e.stroke();
			break;
		case "x":
			e.strokeStyle = T ?? e.fillStyle, e.lineWidth = Math.max(1, x * .18), e.beginPath(), e.moveTo(t - S, n - S), e.lineTo(t + S, n + S), e.moveTo(t - S, n + S), e.lineTo(t + S, n - S), e.stroke();
			break;
		case "plus":
			e.strokeStyle = T ?? e.fillStyle, e.lineWidth = Math.max(1, x * .18), e.beginPath(), e.moveTo(t - S, n), e.lineTo(t + S, n), e.moveTo(t, n - S), e.lineTo(t, n + S), e.stroke();
			break;
		case "star":
			e.beginPath();
			for (let r = 0; r < 10; r++) {
				let i = r % 2 == 0 ? S : S * .45, a = -Math.PI / 2 + r * Math.PI / 5, o = t + Math.cos(a) * i, s = n + Math.sin(a) * i;
				r === 0 ? e.moveTo(o, s) : e.lineTo(o, s);
			}
			e.closePath(), O(), k(), E && e.stroke();
			break;
		case "dot":
			e.beginPath(), e.ellipse(t, n, x * .25, x * .1, 0, 0, Math.PI * 2), O(), k(), E && e.stroke();
			break;
		case "dash": {
			let r = x * .2;
			D || g ? (e.beginPath(), e.rect(t - S, n - r / 2, x, r), O(), k()) : l !== null && e.fillRect(t - S, n - r / 2, x, r), E && e.strokeRect(t - S, n - r / 2, x, r);
			break;
		}
		case "picture":
			e.beginPath(), e.rect(t - S, n - S, x, x), D && st(e, D, t - S, n - S, x, x, s, u), k(), E && e.strokeRect(t - S, n - S, x, x), e.restore();
			return;
		default:
			e.beginPath(), e.arc(t, n, S, 0, Math.PI * 2), O(), k(), E && e.stroke();
			break;
	}
	e.restore();
}
function sa(e, t, n, r, i, a, o, s) {
	if (n.hidden === !0 || n.linePaintAuthored === !0 && n.color == null) return;
	e.save(), e.strokeStyle = n.color ? `#${n.color}` : s, e.lineWidth = n.lineWidthEmu ? Math.max(.5, n.lineWidthEmu / St) : 1, e.setLineDash(ga(n.dash, e.lineWidth));
	let c = n.barType === "plus" || n.barType === "both", l = n.barType === "minus" || n.barType === "both", u = n.dir === "x", d = e.lineWidth / 2;
	for (let s = 0; s < t.values.length; s++) {
		let f = t.values[s];
		if (f == null) continue;
		let p = qi(r, s, i);
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
function ca(e, t, n, r, i, a, o, s, c = !1, l = "sans-serif", u = "r", d = {
	x: -1e6,
	y: -1e6,
	w: 2e6,
	h: 2e6
}, f = d, m, h, g, _, v = 0, y) {
	let b = t.dataLabelOverrides ?? [], x = tn(b);
	if (b.length === 0 && !t.seriesDataLabels) return;
	let S = t.seriesDataLabels;
	for (let b = 0; b < t.values.length; b++) {
		let C = t.values[b];
		if (C == null || _ && !_(C)) continue;
		let w = qi(n, b, r);
		if (w == null) continue;
		let T = x.get(b);
		if (Ve(S, T)) continue;
		let E = T?.showCatName ?? S?.showCatName, D = T?.showSerName ?? S?.showSerName, O = T?.showVal ?? S?.showVal, k = T?.showBubbleSize ?? S?.showBubbleSize, A = T?.showLegendKey ?? S?.showLegendKey ?? !1, j = ie({
			customText: T?.text,
			showCategory: E,
			showSeries: D,
			showValue: O,
			showBubbleSize: k,
			category: r ? p((n[b] ?? String(w)).toString(), t.catFormatCodes?.[b] ?? t.catFormatCode ?? null, c) : oe(w, t.catFormatCodes?.[b] ?? t.catFormatCode ?? null, c),
			seriesName: t.name,
			sourceValue: C,
			bubbleSize: t.bubbleSizes?.[b] ?? void 0,
			valueDivisor: hr(h),
			formatCode: T?.formatCode ?? S?.formatCode ?? null,
			date1904: c,
			separator: T?.separator ?? S?.separator
		}), N = A ? g?.(b) : void 0;
		if (!j && !N) continue;
		let P = T?.position ?? S?.position ?? u, F = M(T?.fontSizeHpt ?? S?.fontSizeHpt, s) ?? Math.max(9, Math.min(11, o / 25)), ee = T?.fontColor ?? S?.fontColor, te = T?.fontBold ?? S?.fontBold ?? !1, I = T?.fontFace ?? S?.fontFace, ne = I && m ? m(I) : l;
		la(e, i(w), a(C), j, P, F, ee, te, ne, y?.(b) ?? 0, d, T?.manualLayout, f, T?.richRuns, s, m, N, K(T, S), vt(T?.labelBox, S?.labelBox), v);
	}
}
function la(e, t, n, r, i, a, o, s, c = "sans-serif", l = 0, u = {
	x: -1e6,
	y: -1e6,
	w: 2e6,
	h: 2e6
}, d, f = u, p, m = 1, h, g, _, v, y = 0) {
	e.save(), e.font = `${_?.fontItalic ? "italic " : ""}${s ? "bold " : ""}${a}px ${c}`, fa(e, r, {
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
function ua(e, t, n, r, i, a) {
	if (!(!t?.text || !t.richRuns || t.richRuns.length === 0)) return da(e, t.richRuns, n, r, i, a);
}
function da(e, t, n, r, i, a) {
	if (!(!t || t.length === 0)) return {
		runs: t,
		ptToPx: n,
		fontFamily: r,
		fallbackBold: i,
		fallbackItalic: a?.fontItalic,
		fallbackBaseline: a?.fontBaseline,
		fallbackColorHidden: a?.fontPaintAuthored === !0 && (a.fontHidden === !0 || a.fontColor == null),
		fontFamilyForFace: (t) => $(e, t, "minor")
	};
}
function fa(e, t, n, r, i, o, s, c = r, l, u, d, f = 1, p, m = 0) {
	if (!t && !u || !Number.isFinite(i) || i <= 0) return;
	if (u) {
		pa(e, t, n, r, i, o, s, c, l, u, d, p);
		return;
	}
	if (l) {
		let t = Nt(e, l, i, o);
		if (!t) return;
		let u = Ye(d, f), h = pe(t.width + u.left + u.right, t.height + u.top + u.bottom, d?.textRotation, d?.textVerticalMode), g = mt(n, r, {
			w: h.w,
			h: h.h
		}, i, s, c);
		if (!g) return;
		e.save(), e.beginPath(), e.rect(g.clip.x, g.clip.y, g.clip.w, g.clip.h), e.clip(), a(e, p, g.rect, f, m);
		let _ = we(d, g.textAlign), v = ve(g.x, g.y, g.rect, t.height + u.top + u.bottom, d, s != null, _, g.textAlign, t.width + u.left + u.right, h.radians), y = dt(e, v.x, v.y, h.radians, _, g.textBaseline, u);
		It(e, t, y.x, y.y, _, g.textBaseline, s ? Math.max(0, g.rect.w - u.left - u.right) : t.width), e.restore();
		return;
	}
	let h = i * 1.15, g = gt(t).value.split(/\r?\n/), _ = g.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), v = Math.max(h, g.length * h), y = Ye(d, f), b = pe(_ + y.left + y.right, v + y.top + y.bottom, d?.textRotation, d?.textVerticalMode), x = mt(n, r, {
		w: b.w,
		h: b.h
	}, i, s, c);
	if (!x) return;
	let S = (t) => e.measureText(t).width, C = Oe(t, x.maxWidth, x.maxHeight, h, S, d);
	if (C.length === 0) return;
	let w = C.reduce((e, t) => Math.max(e, S(t)), 0), T = C.length * h, E = pe(w + y.left + y.right, T + y.top + y.bottom, d?.textRotation, d?.textVerticalMode);
	if (x = mt(n, r, {
		w: E.w,
		h: E.h
	}, i, s, c), !x) return;
	e.save(), e.beginPath(), e.rect(x.clip.x, x.clip.y, x.clip.w, x.clip.h), e.clip(), a(e, p, x.rect, f, m);
	let D = d?.fontPaintAuthored === !0 && (d.fontHidden === !0 || d.fontColor == null);
	e.fillStyle = o;
	let O = we(d, x.textAlign);
	e.textAlign = O, e.textBaseline = x.textBaseline;
	let k = ve(x.x, x.y, x.rect, T + y.top + y.bottom, d, s != null, O, x.textAlign, w + y.left + y.right, E.radians), A = dt(e, k.x, k.y, E.radians, O, x.textBaseline, y), j = (d?.fontBaseline ?? 0) * i, M = x.textBaseline === "middle" ? A.y - (C.length - 1) * h / 2 : x.textBaseline === "bottom" ? A.y - (C.length - 1) * h : A.y;
	if (!D) for (let t = 0; t < C.length; t++) e.fillText(C[t], A.x, M + t * h - j);
	e.restore();
}
function pa(e, t, n, r, i, o, s, c, l, u, d, f) {
	let { entry: p, ptToPx: m, shapeRotationDeg: h } = u, g = Un([p], i, m)[0] ?? 0, _ = Wn(p, i, m), v = t ? Nn : 0, y = t && l ? Nt(e, l, i, o) : null;
	if (t && l && !y) return;
	let b = i * 1.15, x = t && !y ? gt(t).value.split(/\r?\n/) : [], S = y?.width ?? x.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), C = y?.height ?? (x.length > 0 ? Math.max(b, x.length * b) : 0), w = Ye(d, m), T = pe(g + v + S + w.left + w.right, Math.max(_, C) + w.top + w.bottom, d?.textRotation, d?.textVerticalMode), E = mt(n, r, {
		w: T.w,
		h: T.h
	}, i, s, c);
	if (!E) return;
	let D = x;
	if (t && !y && (D = Oe(t, Math.max(0, E.maxWidth - g - v), E.maxHeight, b, (t) => e.measureText(t).width, d), D.length === 0)) return;
	let O = y?.width ?? D.reduce((t, n) => Math.max(t, e.measureText(n).width), 0), k = y?.height ?? D.length * b, A = g + v + O, j = Math.max(_, k), M = A + w.left + w.right, N = j + w.top + w.bottom, P = pe(M, N, d?.textRotation, d?.textVerticalMode);
	if (E = mt(n, r, {
		w: P.w,
		h: P.h
	}, i, s, c), !E) return;
	let F = E.textAlign === "left" ? E.x + P.w / 2 : E.textAlign === "right" ? E.x - P.w / 2 : E.x, ee = E.textBaseline === "top" ? E.y + P.h / 2 : E.textBaseline === "bottom" ? E.y - P.h / 2 : E.y;
	if (s) {
		let e = we(d, "center"), t = ve(F, ee, E.rect, N, d, !0, e);
		F = e === "left" ? t.x + M / 2 : e === "right" ? t.x - M / 2 : t.x, ee = t.y;
	}
	let te = F - M / 2 + w.left, I = ee - N / 2 + w.top;
	if (e.save(), e.beginPath(), e.rect(E.clip.x, E.clip.y, E.clip.w, E.clip.h), e.clip(), a(e, f, E.rect, m, h), P.radians !== 0 && (e.translate(F, ee), e.rotate(P.radians), e.translate(-F, -ee)), Tn(e, p.swatchStyle, p.color, te, I + (j - _) / 2, g, _, p.marker, p.fillPaint, p.outlinePaint, p.outlineColor, p.outlineWidthEmu, p.outlineDash, p.outlineCustomDash, p.outlineCap, p.outlineJoin, m, h, p.directEffect, p.fallbackEffect, p.directEffectIndex, p.fallbackEffectIndex), t) {
		let t = te + g + v;
		if (y) It(e, y, t, I + (j - k) / 2, "left", "top");
		else if (!(d?.fontPaintAuthored === !0 && (d.fontHidden === !0 || d.fontColor == null))) {
			e.fillStyle = o, e.textAlign = "left", e.textBaseline = "top";
			let n = (d?.fontBaseline ?? 0) * i, r = I + (j - k) / 2 - n;
			for (let n = 0; n < D.length; n++) e.fillText(D[n], t, r + n * b);
		}
	}
	e.restore();
}
function ma(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function ha(e, t, n) {
	if (t.length !== 0) if (n && t.length >= 3) for (let n = 0; n < t.length - 1; n++) {
		let r = t[n - 1] ?? t[n], i = t[n], a = t[n + 1], o = t[n + 2] ?? a, s = i.x + (a.x - r.x) / 6, c = i.y + (a.y - r.y) / 6, l = a.x - (o.x - i.x) / 6, u = a.y - (o.y - i.y) / 6;
		e.bezierCurveTo(s, c, l, u, a.x, a.y);
	}
	else for (let n = 1; n < t.length; n++) e.lineTo(t[n].x, t[n].y);
}
function ga(e, t = 1) {
	return _t(e ?? "solid", Number.isFinite(t) && t > 0 ? t : 1);
}
function _a(e, t, n = 1) {
	return ft(e, t, Number.isFinite(n) && n > 0 ? n : 1);
}
function va(e, t, n, r, i, a, o, s) {
	if (n.hidden === !0 || n.linePaintAuthored === !0 && n.color == null || n.dir === "x") return;
	let c = n.barType === "plus" || n.barType === "both", l = n.barType === "minus" || n.barType === "both";
	e.save(), e.strokeStyle = n.color ? `#${n.color}` : s, e.lineWidth = n.lineWidthEmu ? Math.max(.5, n.lineWidthEmu / St) : 1, e.setLineDash(ga(n.dash, e.lineWidth));
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
function ya(e, t, n, r, i, a, o, s, c, l) {
	if (n.hidden === !0 || n.linePaintAuthored === !0 && n.color == null || !i && n.dir === "x" || i && n.dir === "y") return;
	let u = n.barType === "plus" || n.barType === "both", d = n.barType === "minus" || n.barType === "both";
	e.save(), e.strokeStyle = n.color ? `#${n.color}` : c, e.lineWidth = n.lineWidthEmu ? Math.max(.5, n.lineWidthEmu / St * l) : Math.max(.5, l * .75), e.setLineDash(ga(n.dash, e.lineWidth));
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
function ba(e, t, n, r, i, a, o, s, c, l, u, d = "sans-serif", f = "t", p = {
	x: -1e6,
	y: -1e6,
	w: 2e6,
	h: 2e6
}, m = p, h, g, _, v, y, b, x = 0) {
	let S = t.dataLabelOverrides ?? [], C = tn(S), w = t.seriesDataLabels;
	if (S.length === 0 && !w) return !1;
	for (let S = 0; S < r; S++) {
		if (t.sourceHidden?.[S] === !0 || t.values[S] == null && !u) continue;
		let r = o(S);
		if (b && !b(r)) continue;
		let T = t.values[S] ?? 0, E = C.get(S);
		if (Ve(w, E)) continue;
		let D = E?.showCatName ?? w?.showCatName, O = E?.showSerName ?? w?.showSerName, k = E?.showVal ?? w?.showVal, A = E?.showPercent ?? w?.showPercent, j = E?.showLegendKey ?? w?.showLegendKey ?? !1, N = ie({
			customText: E?.text,
			showCategory: D,
			showSeries: O,
			showValue: k,
			showPercent: A,
			category: n[S] ?? "",
			seriesName: t.name,
			sourceValue: T,
			valueDivisor: hr(v),
			percentRatio: h?.(S),
			formatCode: E?.formatCode ?? w?.formatCode ?? null,
			date1904: l,
			separator: E?.separator ?? w?.separator
		}), P = j ? y?.(S) : void 0;
		if (!N && !P) continue;
		let F = E?.position ?? w?.position ?? f, ee = M(E?.fontSizeHpt ?? w?.fontSizeHpt, c) ?? Math.max(9, Math.min(11, s / 25)), te = E?.fontColor ?? w?.fontColor, I = E?.fontBold ?? w?.fontBold ?? !1, ne = E?.fontFace ?? w?.fontFace, L = ne && _ ? _(ne) : d;
		la(e, i(S), a(r), N, F, ee, te, I, L, g?.(S) ?? 0, p, E?.manualLayout, m, E?.richRuns, c, _, P, K(E, w), vt(E?.labelBox, w?.labelBox), x);
	}
	return !0;
}
function xa(e, t) {
	return e?.chartexFormatIdx ?? t;
}
function Sa(e, t, n, r, i) {
	return U(t, n, r);
}
function Ca(e, t, n, r) {
	if (!t.length) return null;
	let i = e.chartexColorStyleMethod;
	return i === "withinLinear" || i === "acrossLinear" || i === "withinLinearReversed" || i === "acrossLinearReversed" ? t[i === "withinLinear" || i === "withinLinearReversed" ? 0 : n % t.length] ?? null : t[n % t.length] ?? null;
}
function wa(e, t, n) {
	return (e.chartexColorPalette ? Ca(e, e.chartexColorPalette, t, n) : null) ?? e.chartexAccents?.[t % (e.chartexAccents.length || 1)] ?? $t[t % $t.length];
}
function Ta(e, t, n, r) {
	return Sa(e, r, "fill", t, n) ?? Sa(e, e.chartexDataPointStyle, "fill", t, n) ?? wa(e, t, n);
}
function Ea(e, t, n, r) {
	return Pe(t, n);
}
function Da(e, t, n, r) {
	return at(t, n);
}
function Oa(e, t, n, r, i, a) {
	let o = a === e.chartexDataPointMarkerStyle ? "dataPointMarker" : a === e.chartexDataPointStyle ? "dataPoint" : Object.entries(e.chartStyleRoles ?? {}).find(([, e]) => e === a)?.[0], s = V(r, o ? J(e, o) ?? (e.classicChartStyleRoles == null ? a : void 0) : a, t);
	if (s !== void 0) return s;
	if (i) return {
		fillType: "solid",
		color: i
	};
	let c = Da(e, a, t, n);
	return c === void 0 ? {
		fillType: "solid",
		color: wa(e, t, n)
	} : c;
}
function ka(e, t, n, r, i, a = e.chartexDataPointStyle) {
	let o = a === e.chartexDataPointStyle ? J(e, "dataPoint") ?? (e.classicChartStyleRoles == null ? a : void 0) : a, s = r?.fillHidden ? N(o) : V(r, o, t);
	if (s !== void 0) return s;
	if (r && i || i) return {
		fillType: "solid",
		color: i
	};
	let c = at(a, t);
	return c === void 0 ? {
		fillType: "solid",
		color: wa(e, t, n)
	} : c;
}
function Aa(e, t, n, r, i, a, o, s = 0) {
	return t.fillType === "solid" ? t.color.startsWith("#") ? t.color : `#${t.color}` : G(t, e, n, r, i, a, s) ?? o;
}
function ja(e, t, n, r, i, a = 0) {
	if (t === null) return !1;
	if (t?.fillType === "image") {
		e.save(), e.clip();
		let r = st(e, t, n.x, n.y, n.w, n.h, i, a);
		return e.restore(), r;
	}
	return e.fillStyle = t ? Aa(e, t, n.x, n.y, n.w, n.h, r, a) : r, e.fill(), !0;
}
function Ma(e, t, n, r, i, a = 0) {
	return t === null || !(n.w > 0) || !(n.h > 0) ? !1 : t?.fillType === "image" ? (e.beginPath(), e.rect(n.x, n.y, n.w, n.h), ja(e, t, n, r, i, a)) : (e.fillStyle = t ? Aa(e, t, n.x, n.y, n.w, n.h, r, a) : r, e.fillRect(n.x, n.y, n.w, n.h), !0);
}
function Na(e, n, r, i, a, o, s = {}) {
	let c = r?.chartexStyle, l = n === e.chartexSeriesLineStyle ? "seriesLine" : n === e.chartexDataPointLineStyle ? "dataPointLine" : n === e.chartexDataPointMarkerStyle ? "dataPointMarker" : Object.entries(e.chartStyleRoles ?? {}).find(([, e]) => e === n)?.[0], u = l ? J(e, l) : n, d = ue(c, u, i), f = r?.lineHidden === !0 ? t(u) : void 0, p = r?.lineColor != null || f !== void 0, m = Pe(n, i), h = d === void 0 ? p ? f === void 0 ? {
		fillType: "solid",
		color: r?.lineColor ?? o
	} : f : m === void 0 ? void 0 : m : d, g = h === void 0 && n?.lineNoStyle === !0 && s.linkedNoStyleFallback !== !0;
	return {
		visible: h !== null && !g,
		color: h?.fillType === "solid" ? h.color : o,
		paint: h?.fillType === "solid" ? void 0 : h,
		widthEmu: c?.lineWidthEmu ?? r?.lineWidthEmu ?? n?.lineWidthEmu ?? null,
		dash: c?.lineCustomDash == null ? c?.lineDash ?? n?.lineDash ?? null : null,
		customDash: c?.lineCustomDash ?? n?.lineCustomDash ?? null,
		cap: c?.lineCap ?? n?.lineCap ?? null,
		join: c?.lineJoin ?? n?.lineJoin ?? null
	};
}
function Pa(e, t, n) {
	return t.visible ? (e.strokeStyle = t.color.startsWith("#") ? t.color : `#${t.color}`, e.lineWidth = t.widthEmu == null ? 1 : De(t.widthEmu, n), e.setLineDash(_a(t.customDash, t.dash, e.lineWidth)), e.lineCap = t.cap === "rnd" ? "round" : t.cap === "sq" ? "square" : "butt", e.lineJoin = t.join === "round" || t.join === "bevel" ? t.join : "miter", !0) : !1;
}
function Fa(e, t, n, r, i, a, o, s, c = {}) {
	return Pa(e, Na(t, n, r, i, a, o, c), s);
}
function Ia(e, t, n, r, i, a, o, s = !1, c = !0) {
	let l = Na(e, r, n, i, a, o, { linkedNoStyleFallback: s });
	return {
		name: t,
		values: [],
		color: o.replace(/^#/, ""),
		lineHidden: !c || !l.visible,
		lineColor: c && l.visible ? l.color.replace(/^#/, "") : null,
		lineWidthEmu: c ? l.widthEmu : null,
		chartexStyle: {
			linePaints: c && l.paint !== void 0 ? [l.paint] : null,
			linePaintAuthored: c && l.paint !== void 0 ? !0 : null,
			lineDash: c ? l.dash : null,
			lineCustomDash: c ? l.customDash : null,
			lineCap: c ? l.cap : null,
			lineJoin: c ? l.join : null
		}
	};
}
var La = A, Ra = c, za = La, Ba = Ra, Va = new Set([
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
function Ha(e, t, n) {
	let r = M(e.legendFontSizeHpt, n) ?? 10 * n, i = M(e.dataTable?.fontSizeHpt, n) ?? 9 * n, a = M(t.seriesDataLabels?.fontSizeHpt ?? e.dataLabelFontSizeHpt, n) ?? 10 * n;
	for (let e of t.dataLabelOverrides ?? []) a = Math.max(a, M(e.fontSizeHpt, n) ?? a);
	return {
		legend: Math.max(2, (2 * r + Fn) * .58),
		table: Math.max(2, i),
		labels: Math.max(2, a)
	};
}
function Ua(e, t, r = xt, i) {
	let a = Fe(e.chartType), s = e.chartexBox != null;
	if (!a && !s) return null;
	let c = te(e), l = e.series.some((t, n) => {
		let r = c[n];
		return (r?.kind === "bubble" || r?.kind === "scatter" ? "scatter" : t.seriesType ?? (e.chartType === "bubble" ? "scatter" : e.chartType)) === "scatter" ? (t.categories ?? e.categories).some((e) => Number.isFinite(Number.parseFloat(e))) : !1;
	}), u = mn(e) && Gr(e).length > 0 && e.dataTable?.showKeys === !0, d = W(e), p = he(e, !0), m = e.chartType === "bubble" && i ? $i(e, e.series.map((t, n) => Qi(e, t, n)), !l, i.w, i.h) : 0, h = /* @__PURE__ */ new Map();
	if (i) for (let t of e.plotGroups ?? []) {
		if (t.kind !== "bubble" || t.seriesCount === 0) continue;
		let n = e.series.slice(t.seriesStart, t.seriesStart + t.seriesCount).map((n, r) => Qi(e, n, t.seriesStart + r));
		h.set(t, $i({
			bubbleScale: t.bubbleScale ?? e.bubbleScale,
			bubbleSizeRepresents: t.bubbleSizeRepresents ?? e.bubbleSizeRepresents,
			showNegativeBubbles: t.showNegativeBubbles ?? e.showNegativeBubbles
		}, n, !l, i.w, i.h));
	}
	let g = 0, _ = (e, t = 1) => t <= 0 || e <= 0 ? !0 : !Number.isSafeInteger(t) || e > Math.floor((Ra - g) / t) ? !1 : (g += e * t, !0), v = (e, n = 1, i = Math.max(2, 5 * r)) => {
		if (n <= 0 || e == null) return !0;
		let a = e.fillType === "image" ? Qe(e, t, i, i, r) : le(e);
		return e.fillType === "gradient" && a > La ? !1 : _(a, n);
	};
	if (a) for (let t = 0; t < e.series.length; t++) {
		let a = e.series[t], s = c[t], g = s?.kind === "bubble" || s == null && e.chartType === "bubble", y = s?.kind === "bubble" || s?.kind === "scatter" ? "scatter" : a.seriesType ?? (e.chartType === "bubble" ? "scatter" : e.chartType), b = bt(e.chartType, s), S = s?.scatterStyle ?? e.scatterStyle, w = s?.radarStyle ?? e.radarStyle, T = {
			chartType: b,
			bubbleScale: s?.bubbleScale ?? e.bubbleScale,
			showNegativeBubbles: s?.showNegativeBubbles ?? e.showNegativeBubbles
		}, E = g ? {
			bubbleScale: T.bubbleScale,
			bubbleSizeRepresents: s?.bubbleSizeRepresents ?? e.bubbleSizeRepresents,
			showNegativeBubbles: T.showNegativeBubbles
		} : void 0, D = s?.kind === "bubble" ? h.get(s) ?? 0 : m;
		if (!(y === "line" || y === "stackedLine" || y === "stackedLinePct" || y === "area" || y === "stackedArea" || y === "stackedAreaPct" || y === "scatter" || y === "radar" || y === "stock") || de(y, b, S, w)) continue;
		let O = y === "area" || y === "stackedArea" || y === "stackedAreaPct" ? (a.showMarker === !0 || n(a)) && a.markerSymbol !== "none" : y === "stock" ? a.markerSymbol != null && a.markerSymbol !== "none" : a.showMarker !== !1 && a.markerSymbol !== "none";
		if (!O && !C(a)) continue;
		let k = Math.max(a.values.length, a.categories?.length ?? 0, e.categories.length), A = tn(a.dataPointOverrides), j = new Map((a.dataLabelOverrides ?? []).map((e) => [e.idx, e])), M = Ha(e, a, r), N = p[t]?.pointDriven === !0;
		for (let n = 0; n < k; n++) {
			let o = z(e, a, y, n, l, T) && (!g || D > 0 && $e(E, a.bubbleSizes?.[n]) != null), s = N && e.showLegend && tt(p, d, t, n), c = j.get(n), m = N && o && !Ve(a.seriesDataLabels, c) && (c?.showLegendKey ?? a.seriesDataLabels?.showLegendKey ?? !1) === !0, h = N && u && n === 0;
			if (!o && !s && !m && !h || g && o && (D <= 0 || $e(E, a.bubbleSizes?.[n]) == null)) continue;
			let b = A.get(n), C = f(a, b, "circle", O);
			if (C === "none") continue;
			let k = g ? Cn(e, a, b, n) : wn(e, a, b, n, t, y, S, w), P = k ? k.fillPaint : g ? void 0 : x(a, b, n), F = k?.linePaint, ee = H(k?.symbol ?? C), te = (e) => (!ee || v(P, 1, e)) && v(F, 1, e) && (!g || k?.bubble3D !== !0 || P === null || _(na)), I = Math.max(2, (b?.markerSize ?? a.markerSize ?? 5) * r);
			if (y === "scatter" && g) {
				let e = $e(E, a.bubbleSizes?.[n]);
				I = e == null ? 0 : Ji(E, e) * D;
			} else y === "radar" && b?.markerSize == null && a.markerSize == null && i && (I = Math.max(4 * r, Math.min(i.w, i.h) * .025));
			if (o && !te(I) || s && !te(M.legend) || h && !te(M.table) || m && !te(M.labels)) return Ra + 1;
		}
		let P = a.markerSymbol ?? (y === "stock" ? "none" : "circle");
		if (!N && H(P) && be(b, S, a, w)) {
			let n = tt(p, d, t), r = ce(e, a, y, k, l, T), i = g ? Xi(e, a, void 0, t, xa(a, t), en(t, a)) : null, s = g ? i.paint : Ue(a), c = g ? Zi(e, a, void 0, t, xa(a, t)) : null, f = (e, t) => v(s, e, t) && (!g || v(c.paint, e, t)) && (!g || !o(a, void 0) || i.paint === null || _(na, e));
			if (e.showLegend && n && !f(1, M.legend) || u && !f(1, M.table) || !f(r, M.labels)) return Ra + 1;
		}
	}
	let y = e.chartexBox;
	if (y) {
		let t = y.series.length, n = e.chartexDataPointMarkerStyle ?? e.chartexDataPointStyle;
		if (H(e.chartStyleMarkerSymbol ?? e.chartexMarkerSymbol ?? "circle")) for (let i = 0; i < t; i++) {
			let a = y.series[i];
			if (!a.showNonoutliers && !a.showOutliers) continue;
			let o = 0;
			for (let e of a.valuesByCategory) {
				let t = Ee(e, a.quartileMethod);
				t && (a.showNonoutliers && (o += t.inner.length), a.showOutliers && (o += t.outliers.length));
			}
			if (!v(Oa(e, xa(a, i), t, a.chartexStyle, a.color, n), o, Math.max(2, 3 * r))) return Ra + 1;
		}
	}
	return g;
}
function Wa(e, t, n, r, i) {
	let a = 0;
	for (let o of [e?.fillPaint, e?.borderFill]) {
		if (!o) continue;
		let e = o.fillType === "image" ? Qe(o, t, n, r, i) : le(o);
		if (o.fillType === "gradient" && e > za) return null;
		a += e;
	}
	return a;
}
function Ga(e, t, n, r) {
	let i = t.seriesDataLabels;
	return Ve(i, r) ? !1 : !!(r?.text || (r?.showVal ?? i?.showVal ?? e.showDataLabels) || (r?.showCatName ?? i?.showCatName) || (r?.showSerName ?? i?.showSerName) || (r?.showPercent ?? i?.showPercent) || (r?.showBubbleSize ?? i?.showBubbleSize) || (r?.showLegendKey ?? i?.showLegendKey)) && n < Math.max(t.values.length, t.categories?.length ?? 0, e.categories.length);
}
function Ka(e, t, n, r = xt, i) {
	if (e.chartexSunburst || e.chartexTreemap) return null;
	let a = 0, o = Math.max(1, i?.w ?? 32 * r), s = Math.max(1, i?.h ?? 16 * r), c = (e) => {
		let t = Wa(e, n, o, s, r);
		return t == null || t > Ba - a ? !1 : (a += t, !0);
	}, l = e.threeD != null && t != null && Va.has(e.chartType), u = e.series.some((t) => (t.seriesType ?? e.chartType) === "scatter" && (t.categories ?? e.categories).some((e) => Number.isFinite(Number.parseFloat(e))));
	for (let t = 0; t < e.series.length; t++) {
		let n = e.series[t], r = tn(n.dataLabelOverrides), i = n.seriesType ?? e.chartType, a = Math.max(n.values.length, n.categories?.length ?? 0, e.categories.length);
		for (let o = 0; o < a; o++) {
			let a = n.values[o];
			if (l) {
				if (a == null || !Number.isFinite(a)) continue;
				if (e.showDataLabelsOverMax !== !0) {
					let t = n.useSecondaryAxis ? e.secondaryValAxis?.max : e.valMax;
					if (t != null && Number.isFinite(t) && a > t) continue;
				}
			} else if (!h(e, n, i, o, u, t)) continue;
			let s = r.get(o);
			if (!Ga(e, n, o, s)) continue;
			let d = vt(s?.labelBox, n.seriesDataLabels?.labelBox);
			if (d && !c(d)) return Ba + 1;
		}
		if (!l) {
			for (let e of n.trendLines ?? []) if ((e.dispEq === !0 || e.dispRSqr === !0 || e.labelText || e.labelRichRuns?.some((e) => e.text.length > 0) === !0) && e.labelBox && !c(e.labelBox)) return Ba + 1;
		}
	}
	return a;
}
function qa(e, t) {
	if (!e.threeD || !t || !Va.has(e.chartType)) return null;
	let n = 0;
	for (let t of e.series) {
		let r = Math.max(1, t.values.length, t.categories?.length ?? 0), i = t.threeDShape ?? e.threeD.shape ?? "box", a = e.chartType === "pie" ? 36 : e.chartType.toLowerCase().includes("bar") ? i === "box" ? 4 : 36 : e.chartType.toLowerCase().includes("area") ? 4 : t.smooth === !0 ? 25 : 3;
		if (!Number.isSafeInteger(r) || r > Math.floor(1e4 / a) || (n += r * a, n > 1e4)) return ne + 1;
	}
	return n;
}
function Ja(e, t, n) {
	return n <= 1e4 ? !1 : (e.fillStyle = "#888", e.font = "12px sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.fillText("(too many data points)", t.x + t.w / 2, t.y + t.h / 2), !0);
}
function Ya(e, t, n, r) {
	let i = t.chartTextBoxes;
	if (i?.length) for (let a of i) {
		let i = n.x + a.x * n.w, o = n.y + a.y * n.h, s = a.w * n.w, c = a.h * n.h;
		if (!(s > 0 && c > 0)) continue;
		let l = i + (a.lIns ?? 91440) / St * r, u = o + (a.tIns ?? 45720) / St * r, d = i + s - (a.rIns ?? 91440) / St * r, f = o + c - (a.bIns ?? 45720) / St * r, p = d - l, m = f - u;
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
				let i = Math.max(1, (n.fontSizeHpt ?? 1e3) / 100 * r), a = `${n.bold ? "bold " : ""}${i}px ${$(t, n.fontFace, "minor")}`;
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
var Xa = 10;
function Za(e, t, n, r, i, a) {
	let o = Math.max(0, Math.min(a, r / 2, i / 2));
	e.beginPath(), e.moveTo(t + o, n), e.lineTo(t + r - o, n), e.quadraticCurveTo(t + r, n, t + r, n + o), e.lineTo(t + r, n + i - o), e.quadraticCurveTo(t + r, n + i, t + r - o, n + i), e.lineTo(t + o, n + i), e.quadraticCurveTo(t, n + i, t, n + i - o), e.lineTo(t, n + o), e.quadraticCurveTo(t, n, t + o, n), e.closePath();
}
function Qa(e, t, n, i = xt, a = 0, o, s, c, l, u = D(t)) {
	e.save();
	try {
		if (Ja(e, n, u)) return;
		t = wi(t, i);
		let { x: d, y: f, w: p, h: m } = n, h = t.roundedCorners === !0, g = h ? Xa * i : 0, _ = (e) => {
			h ? (Za(e, d, f, p, m, g), e.fill()) : e.fillRect(d, f, p, m);
		};
		Se(e, t.chartAreaStyle, t.chartStyleRoles?.chartArea, 0, n, i, (e) => {
			if (t.chartFillHidden !== !0) if (t.chartFill?.fillType === "image") h ? (e.save(), Za(e, d, f, p, m, g), e.clip(), st(e, t.chartFill, d, f, p, m, i, a), e.restore()) : st(e, t.chartFill, d, f, p, m, i, a);
			else if (t.chartFill) {
				let n = G(t.chartFill, e, d, f, p, m, a);
				n && (e.fillStyle = n), n && _(e);
			} else t.chartBg && (e.fillStyle = `#${t.chartBg}`, _(e));
			if (t.chartBorderHidden !== !0 && (t.chartBorderLineFill || t.chartBorderColor)) {
				e.save();
				let n = t.chartBorderLineFill ? G(t.chartBorderLineFill, e, d, f, p, m, a) : t.chartBorderColor ? `#${t.chartBorderColor}` : null;
				if (!n) e.restore();
				else {
					e.strokeStyle = n;
					let r = t.chartBorderWidthEmu ? Math.max(.5, t.chartBorderWidthEmu / St) * i : 1;
					e.setLineDash(_a(t.chartBorderCustomDash, t.chartBorderDash, r)), e.lineCap = t.chartBorderCap === "rnd" ? "round" : t.chartBorderCap === "sq" ? "square" : "butt", e.lineJoin = t.chartBorderJoin === "round" || t.chartBorderJoin === "bevel" ? t.chartBorderJoin : "miter", ke(e, d, f, p, m, r, t.chartBorderCompound, h ? g : 0), e.restore();
				}
			}
		});
		let v = t.chartexBox != null || t.chartexSunburst != null || t.chartexTreemap != null || t.chartexRegionMap != null;
		if (t.series.length === 0 && !v) {
			e.fillStyle = "#888", e.font = "12px sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.fillText("(no data)", d + p / 2, f + m / 2), Ya(e, t, n, i);
			return;
		}
		let y = r(t), b = (y != null || t.chartexBox != null) && (y ?? 0) <= 1e4 ? Ua(t, c, i, n) : null, x = qa(t, o), S = y != null && y <= 1e4 ? Jt(t, c, i, n, x != null) : null, C = Ka(t, o, c, i, n);
		if ((y != null || b != null || S != null || x != null || C != null) && Ja(e, n, Math.max(y ?? 0, b != null && b + (S ?? 0) > Ra ? 10001 : 0, S != null && S > Ra ? 10001 : 0, x ?? 0, C != null && C > Ba ? 10001 : 0))) {
			Ya(e, t, n, i);
			return;
		}
		let w = E(t);
		if (w === "unsupported") {
			e.fillStyle = "#888", e.font = "11px sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.fillText("Unsupported chart", d + p / 2, f + m / 2), Ya(e, t, n, i);
			return;
		}
		if (w !== "legacy") {
			switch (w) {
				case "bar-combo":
					Xr(e, t, n, i, {}, a);
					break;
				case "line-groups":
					ki(e, t, n, i, a);
					break;
				case "area-groups":
					Ii(e, t, n, i, a);
					break;
				case "scatter-bubble":
					ta(e, t, n, i, a);
					break;
				case "stock-line":
					Ai(e, t, n, i, a);
					break;
			}
			vr(e, t, n, i), Ya(e, t, n, i);
			return;
		}
		if (o?.render(e, t, n, i, a)) {
			vr(e, t, n, i), Ya(e, t, n, i);
			return;
		}
		if (s?.render(e, t, n, i, a)) {
			Ya(e, t, n, i);
			return;
		}
		if (l?.render(e, t, n, i, a)) {
			vr(e, t, n, i), Ya(e, t, n, i);
			return;
		}
		switch (t.chartType) {
			case "clusteredBar":
			case "clusteredBarH":
			case "stackedBar":
			case "stackedBarH":
			case "stackedBarPct":
			case "stackedBarHPct":
				Xr(e, t, n, i, {}, a);
				break;
			case "line":
			case "stackedLine":
			case "stackedLinePct":
				ki(e, t, n, i, a);
				break;
			case "area":
			case "stackedArea":
			case "stackedAreaPct":
				Ii(e, t, n, i, a);
				break;
			case "pie":
				zi(e, t, n, !1, i, a);
				break;
			case "ofPie":
				Ri(e, t, n, i, a);
				break;
			case "doughnut":
				zi(e, t, n, !0, i, a);
				break;
			case "radar":
				Ki(e, t, n, i, a);
				break;
			case "scatter":
			case "bubble":
				ta(e, t, n, i, a);
				break;
			case "stock":
				Ai(e, t, n, i, a);
				break;
			case "surface":
			case "surface3D":
				Fi(e, t, n, i, a);
				break;
			default: e.fillStyle = "#888", e.font = "11px sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.fillText("Unsupported chart", d + p / 2, f + m / 2);
		}
		vr(e, t, n, i), Ya(e, t, n, i);
	} finally {
		e.restore();
	}
}
function $a(e, t, n, r = xt, i = 0, a, o, s, c) {
	He(() => {
		qe(() => {
			_e(s, () => {
				let l = D(t), u = l <= 1e4 ? Ae(Ce(t)) : t;
				Ge(e, () => {
					Qa(e, u, n, r, i, a, o, s, c, l);
				}, void 0, l <= 1e4 ? Le(u) : 1);
			});
		});
	});
}
//#endregion
export { Xr as A, tn as C, Ma as D, ja as E, Qn as F, tr as I, nr as L, ki as M, Na as N, yr as O, da as P, rr as R, mr as S, Kn as T, fa as _, Ta as a, oa as b, Ia as c, Sa as d, Yr as f, pn as g, Zn as h, en as i, $a as j, Ja as k, Oa as l, $ as m, Pa as n, ka as o, ln as p, Er as r, Aa as s, Fa as t, xa as u, Wr as v, Hr as w, fr as x, Yn as y, Dr as z };
