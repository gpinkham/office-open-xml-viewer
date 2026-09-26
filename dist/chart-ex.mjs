import { $ as e, $n as t, An as n, D as r, F as i, Gn as a, H as o, I as s, In as c, L as l, N as u, On as d, P as f, Pn as p, Q as m, R as h, Sn as g, T as _, X as v, Y as y, Yt as b, Z as x, Zn as S, dt as C, et as ee, ft as w, g as T, ir as E, jn as D, kn as O, pr as k, r as A, t as j, ut as M, v as N, zn as P } from "./plot-area-frame-DJnay5Wh.js";
import { A as F, C as I, D as te, E as L, F as ne, I as R, L as re, M as ie, N as ae, O as oe, P as se, R as ce, S as le, T as ue, _ as de, a as z, b as fe, c as pe, d as me, f as he, g as ge, h as _e, i as ve, k as ye, l as B, m as V, n as H, o as U, p as be, r as xe, s as Se, t as Ce, u as we, v as Te, w as Ee, x as De, y as Oe, z as ke } from "./renderer-DF1NP7gt.js";
import { C as Ae, S as je } from "./three-d-DYlBMsPE.js";
import { t as Me } from "./renderer-module-contract-D4NrNIR1.js";
function Ne(e) {
	return e != null && Number.isFinite(e) ? e : null;
}
function Pe(e) {
	return Object.is(e, -0) ? "0" : String(Number.isInteger(e) ? e : Number(e.toPrecision(6)));
}
function Fe(e, t) {
	if (e.length > 1048576) return { kind: "tooManyInputPoints" };
	let n = t.intervalClosed === "r" ? "r" : "l", r = Ne(t.underflow), i = Ne(t.overflow);
	r != null && i != null && r >= i && (r = null, i = null);
	let a = (e) => r != null && (n === "r" ? e <= r : e < r), o = (e) => i != null && (n === "r" ? e > i : e >= i), s = Infinity, c = -Infinity, l = 0, u = 0, d = 0;
	for (let t of e) {
		let e = Ne(t);
		e != null && (a(e) ? u++ : o(e) ? d++ : (l++, s = Math.min(s, e), c = Math.max(c, e)));
	}
	if (l + u + d === 0) return {
		kind: "bins",
		categories: [],
		counts: []
	};
	let f = [], p = [];
	if (r != null && (f.push(`${n === "r" ? "≤" : "<"} ${Pe(r)}`), p.push(u)), l > 0) {
		let u = r ?? s, d = i ?? c, m = d - u;
		if (!Number.isFinite(m)) f.push(`${Pe(u)} – ${Pe(d)}`), p.push(l);
		else {
			let s = Ne(t.binSize), c;
			c = s != null && s > 0 && m > 0 ? Math.max(1, Math.ceil(m / s)) : t.binCount != null && Number.isFinite(t.binCount) && t.binCount > 0 ? Math.max(1, Math.floor(t.binCount)) : Math.max(1, Math.ceil(Math.sqrt(l)));
			let d = m <= 0 ? 1 : Math.min(512, c), h = m > 0 && s != null && s > 0 && c <= 512, g = m === 0 ? 1 : h ? s : m / d, _ = Array(d).fill(0);
			for (let t of e) {
				let e = Ne(t);
				if (e == null || a(e) || o(e)) continue;
				let r = h ? (e - u) / g : m === 0 ? 0 : (e - u) / m * d, i = n === "r" ? Math.ceil(r) - 1 : Math.floor(r), s = Math.max(0, Math.min(d - 1, i));
				_[s]++;
			}
			for (let e = 0; e < d; e++) {
				let t = h ? u + g * e : u + e / d * m, a = h ? t + g : u + m * ((e + 1) / d), o = i == null ? a : Math.min(a, i), s = n === "r" && (r != null || e > 0) ? ">" : "≥", c = n === "l" && (i != null || e < d - 1) ? "<" : "≤";
				f.push(`${s} ${Pe(t)} – ${c} ${Pe(o)}`), p.push(_[e]);
			}
		}
	}
	return i != null && (f.push(`${n === "r" ? ">" : "≥"} ${Pe(i)}`), p.push(d)), {
		kind: "bins",
		categories: f,
		counts: p
	};
}
//#endregion
//#region packages/core/src/chart/pareto-layout.ts
function Ie(e, t) {
	return e == null ? e : e.flatMap((e) => {
		let n = t.get(e.idx);
		return n == null ? [] : [{
			...e,
			idx: n
		}];
	});
}
function W(e, t) {
	return e == null ? e : t.map((t) => e[t] ?? null);
}
function G(e, t, n = {}) {
	let r = e.values.map((e, t) => ({
		value: e,
		sourceIndex: t
	})).filter((e) => e.value != null && Number.isFinite(e.value) && e.value >= 0);
	n.sortDescending !== !1 && r.sort((e, t) => t.value - e.value || e.sourceIndex - t.sourceIndex);
	let i = r[0]?.value ?? 0, a = i > 0 ? r.reduce((e, t) => e + t.value / i, 0) : 0, o = 0, s = r.map((n) => (i > 0 && (o += n.value / i), {
		sourceIndex: n.sourceIndex,
		category: e.categories?.[n.sourceIndex] ?? t[n.sourceIndex] ?? String(n.sourceIndex + 1),
		value: n.value,
		cumulativeFraction: a > 0 ? o >= a ? 1 : o / a : 0
	})), c = s.map((e) => e.sourceIndex), l = new Map(c.map((e, t) => [e, t])), u = s.map((e) => e.category), d = {
		...e,
		categories: u,
		catFormatCodes: W(e.catFormatCodes, c),
		dataPointColors: W(e.dataPointColors, c),
		dataLabelColors: W(e.dataLabelColors, c),
		dataPointOverrides: Ie(e.dataPointOverrides, l),
		dataLabelOverrides: Ie(e.dataLabelOverrides, l)
	};
	return {
		points: s,
		categories: u,
		orderedSeries: {
			...d,
			values: s.map((e) => e.value)
		},
		series: {
			...d,
			values: s.map((e) => e.cumulativeFraction)
		}
	};
}
//#endregion
//#region packages/core/src/chart/chart-ex-renderer.ts
function K(e) {
	return !e || e.fillNoStyle === !0 ? !1 : e.fillPaintAuthored === !0 || e.fillHidden === !0 || e.fillColors?.some((e) => e != null) === !0 || e.fillPaints?.some((e) => e != null) === !0;
}
function q(e, t, n, r) {
	return t?.fillHidden === !0 || t?.color != null || K(t?.chartexStyle) ? U(e, r, 3, t?.fillHidden === !0 ? {
		...t.chartexStyle,
		fillHidden: !0,
		fillPaintAuthored: !0
	} : t?.chartexStyle, t?.color) : n?.chartexStyle?.fillPaintAuthored === !0 ? U(e, r, 3, n.chartexStyle, n.color) : U(e, r, 3, n?.chartexStyle, n?.color);
}
function Le(e) {
	let t = e?.chartexStyle;
	return e?.lineHidden != null || e?.lineColor != null || e?.lineWidthEmu != null || e?.lineDash != null || t?.linePaintAuthored === !0 || t?.lineHidden != null || t?.lineColors?.some((e) => e != null) === !0 || t?.linePaints?.some((e) => e != null) === !0 || t?.lineWidthEmu != null || t?.lineDash != null || t?.lineCustomDash != null || t?.lineCap != null || t?.lineJoin != null;
}
function Re(e, n, a, o = 1) {
	let s = 0, c = Math.max(1, a?.w ?? 32 * o), u = Math.max(1, a?.h ?? 16 * o), d = i(e, ({ label: i, linkedStyleIndex: a }) => {
		let d = i.labelBox, f = l(d), p = f ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, m = f ? k(e, "dataLabelCallout") ?? k(e, "dataLabel") : k(e, "dataLabel"), g = h(d, p, m, p != null, 0, a)?.fillPaint, _ = S(d?.style, m, 0), v = d?.borderHidden === !0 ? t(m) : void 0, y = d?.borderColor != null || d?.borderFill != null || _ !== void 0 || v !== void 0 || d?.borderPaintAuthored === !0 && d?.borderHidden !== !0, x = _ === void 0 ? v === void 0 ? d?.borderFill ?? (d?.borderColor ? {
			fillType: "solid",
			color: d.borderColor
		} : y ? null : E(p, a)) : v : _;
		for (let e of [g, x]) {
			if (!e) continue;
			let t = e.fillType === "image" ? A(e, n, c, u, o) ?? 1048577 : b(e);
			if (e.fillType === "gradient" && t > 4096 || t > 1048576 - s) {
				s = r + 1;
				return;
			}
			s += t;
		}
	});
	return d === "not-hierarchy" ? null : d === "too-large" ? r + 1 : s;
}
function ze(e, t, n = 1) {
	if (![
		"waterfall",
		"funnel",
		"boxWhisker",
		"sunburst",
		"treemap"
	].includes(e.chartType)) return null;
	let i = 0, a = (e) => {
		if (!e || i > 1048576) return;
		let a = e.fillType === "image" ? A(e, void 0, Math.max(1, t.w), Math.max(1, t.h), n) : b(e);
		e.fillType === "gradient" && a > 4096 || a > 1048576 - i ? i = r + 1 : i += a;
	}, o = (t, n, r, i) => {
		let o = ae(e, t, n, r, i, "#000000", { linkedNoStyleFallback: !0 });
		o.visible && a(o.paint ?? {
			fillType: "solid",
			color: "000000"
		});
	};
	if (e.chartType === "waterfall") {
		let t = e.series[0], n = t?.values ?? [], r = I(t?.dataPointOverrides), i = u(n, e.categories.length, e.subtotalIndices);
		if (i.cumulativeOverflow || i.rawMax <= i.rawMin) return 0;
		for (let n = 0; n < i.bars.length; n++) {
			let s = i.bars[n];
			if (!s.paintSlot) continue;
			let c = s.semanticIndex, l = r.get(n);
			a(q(e, l, t, c)), o(e.chartexDataPointStyle, Le(l) ? l : t, c, 3);
		}
	} else if (e.chartType === "funnel") {
		let t = e.series[0], n = t?.values ?? [], r = Math.max(n.length, e.categories.length);
		if (n.some((e) => e != null && e > 0)) {
			let i = U(e, 0, 1, t?.chartexStyle, t?.color);
			for (let s = 0; s < r; s++) (n[s] ?? 0) > 0 && (a(i), o(e.chartexDataPointStyle, t, 0, 1));
		}
	} else if (e.chartType === "boxWhisker") {
		let t = e.chartexBox, n = t?.series.length ?? 0;
		for (let r = 0; r < n; r++) {
			let i = t.series[r], s = i.chartexFormatIdx ?? r, c = U(e, s, n, i.chartexStyle, i.color);
			for (let t of i.valuesByCategory) w(t, i.quartileMethod) && (a(c), o(e.chartexDataPointStyle, i, s, n));
		}
	} else {
		let t = e.series[0], n = 1;
		if (f(e, ({ node: e }) => {
			n = Math.max(n, e.branchIndex + 1);
		}), f(e, ({ node: r, paintsBody: i }) => {
			i && (a(U(e, r.branchIndex, n, t?.chartexStyle, t?.color)), o(e.chartexDataPointStyle, t, r.branchIndex, n));
		}) === "too-large") return r + 1;
	}
	return i;
}
function Be(e, t, n, r, i = 0) {
	let a = t.series[0];
	if (!a) return;
	let o = Fe(a.values, t.chartexHistogramBinning ?? {});
	if (o.kind === "tooManyInputPoints") {
		ye(e, n, _ + 1);
		return;
	}
	F(e, {
		...t,
		chartType: "clusteredBar",
		categories: o.categories,
		series: [{
			...a,
			categories: void 0,
			values: o.counts
		}]
	}, n, r, { gapPolicy: "chartex" }, i);
}
function Ve(t, r, i, l, d) {
	let { x: f, y: m, w: h, h: g } = i, _ = r.series[0]?.values ?? [], v = r.categories, y = Math.max(_.length, v.length);
	if (y === 0 || ye(t, i, y)) return;
	let { bars: b, rawMax: x, rawMin: S, cumulativeOverflow: C } = u(_, v.length, r.subtotalIndices);
	if (C) {
		t.fillStyle = "#888", t.font = "12px sans-serif", t.textAlign = "center", t.textBaseline = "middle", t.fillText("(chart values out of range)", f + h / 2, m + g / 2);
		return;
	}
	if (x <= S) return;
	let w = r.subtotalIndices.length === 0 && b.every((e, t) => !e.hasValue || _[t] >= 0), T = !r.valAxisHidden && r.valAxisTickLabelPos !== "none" && !w, E = Ee(t, r, h, g, l), O = n(r, h, g, l), k = xe(r.valAxisFontSizeHpt, g, l), A = xe(r.catAxisFontSizeHpt, g, l), M = V(r, r.valAxisFontFace, "minor"), P = V(r, r.catAxisFontFace, "minor"), F = oe(r, S, x, g / l);
	t.save();
	let L = 0;
	if (T) {
		t.font = be(k, M, r.valAxisFontBold ?? !1, r.valAxisFontItalic ?? !1);
		let e = 0;
		for (let n of F.majorLines) e = Math.max(e, t.measureText(le(r, n, !1)).width);
		L = e + 8;
	}
	let ie = Math.max(1, h - O.valBandW - L - h * .02) / y;
	t.font = be(A, P, r.catAxisFontBold ?? !1, r.catAxisFontItalic ?? !1);
	let fe = v.slice(0, y).map((e) => ke(t, o(e, r.catAxisFormatCode, r.date1904), Math.max(1, ie - 8))), he = 0;
	for (let e of fe) e.some(Boolean) && (he = Math.max(he, e.length));
	let ve = r.catAxisHidden || he === 0 ? 0 : he * (A + 2) + 4, B = r.series[0], Se = I(B?.dataLabelOverrides), we = I(B?.dataPointOverrides), Ae = B?.chartexStyle, je = `#${B?.color ?? z(r, 0, 3, Ae)}`, Me = `#${z(r, 1, 3, Ae)}`, Ne = `#${z(r, 2, 3, Ae)}`, Pe = U(r, 0, 3, Ae, B?.color), Fe = U(r, 1, 3, Ae), Ie = U(r, 2, 3, Ae), W = {
		...r,
		chartType: "clusteredBar",
		series: [
			pe(r, "Increase", B, r.chartexDataPointStyle, 0, 3, je),
			pe(r, "Decrease", B, r.chartexDataPointStyle, 1, 3, Me),
			pe(r, "Total", B, r.chartexDataPointStyle, 2, 3, Ne)
		]
	}, G = ue(t, W, h, g, .22, l), { legRightW: K, legLeftW: Re, legTopH: ze, legBottomH: Be } = D(G, r.legendOverlay === !0), Ve = c(r, f, m, h, g, l, {
		titleBand: E,
		legendSideReserveFrac: 0,
		legendReserve: G,
		pad: {
			t: E.bandH + ze + k / 2 + 2,
			r: K + h * .02,
			b: Be + O.catBandH + ve,
			l: Re + O.valBandW + (r.valAxisHidden ? h * .02 : Math.max(h * .03, L))
		},
		honorPlotAreaManualLayout: !0
	});
	Te(t, r, f, m, h, g, m + Ve.title.topPad, Ve.title.fontPx);
	let { px0: J, py0: Y, pw: X, ph: Z } = Ve.plotRect;
	j(t, r, J, Y, X, Z, l, d);
	let He = oe(r, S, x, Z / l), Q = (e) => Y + Z - He.frac(e) * Z, Ue = N(r.valAxisLineColor, r.valAxisLineWidthEmu, l), We = N(r.catAxisLineColor, r.catAxisLineWidthEmu, l), Ge = re(r, l);
	if (!r.valAxisHidden) {
		t.font = be(k, M, r.valAxisFontBold ?? !1, r.valAxisFontItalic ?? !1), t.fillStyle = r.valAxisFontColor ? `#${r.valAxisFontColor}` : "#595959", t.textAlign = "right", t.textBaseline = "middle";
		let e = ce(r, l);
		for (let n of He.minorLines) R(t, J, X, Q(n), !1, e);
		for (let e of He.majorLines) {
			let n = Q(e);
			if (De(r)) {
				t.strokeStyle = Ge.color, t.lineWidth = Ge.width;
				let e = Ge.dash.length > 0 && t.getLineDash ? t.getLineDash() : [];
				Ge.dash.length > 0 && t.setLineDash(Ge.dash), t.beginPath(), t.moveTo(J, n), t.lineTo(J + X, n), t.stroke(), Ge.dash.length > 0 && t.setLineDash(e);
			}
			T && t.fillText(le(r, e, !1), J - 4, n), _e(t, r.valAxisMajorTickMark, "val", J, n, Ue.color, Ue.width, !1, r.valAxisLineHidden, "major", l, r.valAxisLineDash);
		}
		for (let e of He.minorTicks) _e(t, r.valAxisMinorTickMark, "val", J, Q(e), Ue.color, Ue.width, !1, r.valAxisLineHidden, "minor", l, r.valAxisLineDash);
	}
	let Ke = !r.valAxisHidden && !r.valAxisLineHidden, qe = !r.catAxisHidden && !r.catAxisLineHidden;
	Ke && ne(t, J, Y, J, Y + Z, Ue.color, Ue.width, r.valAxisLineDash), qe && ne(t, J, Y + Z, J + X, Y + Z, We.color, We.width, r.catAxisLineDash);
	let Je = X / y, $ = Je / (1 + a(r.barGapWidth, "chartex") / 100);
	b.forEach((n, i) => {
		let a = J + Je * i + (Je - $) / 2, o = Math.min(Q(n.start), Q(n.end)), c = Math.max(Q(n.start), Q(n.end)), u = Math.max(1, c - o), x = n.semanticIndex, S = we.get(i), C = q(r, S, B, x), w = S?.color ? `#${S.color}` : n.isSub ? Ne : n.isPos ? je : Me, T = me(r, r.chartexDataPointStyle, "line", x, 3), E = Le(S) ? S : B;
		if (n.paintSlot && ee(t, e(S?.chartexStyle, B?.chartexStyle), r.chartexDataPointStyle, x, {
			x: a,
			y: o,
			w: $,
			h: u
		}, l, (e) => {
			C && te(e, C, {
				x: a,
				y: o,
				w: $,
				h: u
			}, w, l, d), Ce(e, r, r.chartexDataPointStyle, E, x, 3, T ? `#${T}` : w, l) && e.strokeRect(a, o, $, u);
		}), n.paintSlot && b[i + 1]?.paintSlot && i < y - 1 && r.chartexConnectorLines !== !1) {
			let e = J + Je * (i + 1) + (Je - $) / 2, s = n.isPos ? o : c;
			t.save();
			let u = ae(r, r.chartexSeriesLineStyle, B, x, 3, "#000000", { linkedNoStyleFallback: !0 });
			H(t, u, l) && (u.widthEmu ?? (t.lineWidth = .75 * l), t.beginPath(), t.moveTo(a + $, s), t.lineTo(e, s), t.stroke()), t.restore();
		}
		let D = n.hasValue ? _[i] : 0, O = s(r, B, i, v[i] ?? "", D, {
			visible: r.showDataLabels,
			showVal: !0,
			showCatName: !1
		}, Se, !n.hasValue);
		if (O) {
			let e = B?.dataLabelColors?.[i] ?? O.fontColor ?? null, n = e ? `#${e}` : r.dataLabelFontColor ? `#${r.dataLabelFontColor}` : "#595959", s = p(O.fontSizeHpt, l) ?? xe(r.dataLabelFontSizeHpt, g, l), c = O.fontBold ?? r.dataLabelFontBold ?? !1, _ = V(r, O.fontFace ?? r.dataLabelFontFace, "minor");
			t.font = `${O.textStyle.fontItalic ? "italic " : ""}${c ? "bold " : ""}${s}px ${_}`, de(t, O.text, {
				kind: "bar",
				rect: {
					x: a,
					y: o,
					w: $,
					h: u
				},
				orientation: "vertical",
				negative: D < 0,
				position: O.position ?? "outEnd"
			}, {
				x: J,
				y: Y,
				w: X,
				h: Z
			}, s, n, O.manualLayout, {
				x: f,
				y: m,
				w: h,
				h: g
			}, se(r, O.richRuns, l, _, c, O.textStyle), void 0, O.textStyle, l, O.labelBox, d);
		}
	}), t.textAlign = "center", t.textBaseline = "top", t.fillStyle = r.catAxisFontColor ? `#${r.catAxisFontColor}` : "#595959", t.font = be(A, P, r.catAxisFontBold ?? !1, r.catAxisFontItalic ?? !1);
	let Ye = Y + Z + 4;
	for (let e = 0; e < y && !r.catAxisHidden; e++) {
		let n = J + Je * e + Je / 2;
		(fe[e] ?? []).forEach((e, r) => e && t.fillText(e, n, Ye + r * (A + 2)));
	}
	ge(t, r, f, m, h, g, J, Y, X, Z, Re, Be, O.catFontPx, O.valFontPx), Oe(t, W, G, f, m, h, g, J, Y, X, Z, E.bandH + 2, l, [
		Pe,
		Fe,
		Ie
	], d), t.restore();
}
function J(e, t, n, r, i) {
	let o = t.series[0]?.values ?? [], l = Math.max(o.length, t.categories.length);
	if (l === 0 || ye(e, n, l)) return;
	let u = 0;
	for (let e = 0; e < l; e++) u = Math.max(u, o[e] ?? 0);
	if (!(u > 0)) return;
	let { x: d, y: f, w: m, h } = n, g = Ee(e, t, m, h, r), _ = t.series[0], v = I(_?.dataLabelOverrides), y = `#${_?.color ?? z(t, 0, 1, _?.chartexStyle)}`, b = U(t, 0, 1, _?.chartexStyle, _?.color), x = {
		...t,
		series: [pe(t, _?.name ?? "", _, t.chartexDataPointStyle, 0, 1, y)]
	}, S = ue(e, x, m, h, .22, r), { legRightW: C, legLeftW: w, legTopH: T, legBottomH: E } = D(S, t.legendOverlay === !0), O = xe(t.catAxisFontSizeHpt, h, r);
	e.save(), e.font = be(O, V(t, t.catAxisFontFace, "minor"), t.catAxisFontBold ?? !1, t.catAxisFontItalic ?? !1);
	let k = 0;
	if (!t.catAxisHidden) {
		for (let n = 0; n < Math.min(l, t.categories.length); n++) k = Math.max(k, e.measureText(t.categories[n]).width);
		t.categories.length > 0 && (k += 10);
	}
	let A = c(t, d, f, m, h, r, {
		titleBand: g,
		legendSideReserveFrac: .22,
		legendReserve: S,
		pad: {
			t: g.bandH + T + 2,
			r: C + m * .02,
			b: E + h * .02,
			l: w + k + m * .02
		},
		honorPlotAreaManualLayout: !0
	});
	Te(e, t, d, f, m, h, f + A.title.topPad, A.title.fontPx);
	let { px0: M, py0: P, pw: F, ph: L } = A.plotRect;
	j(e, t, M, P, F, L, r, i);
	let ne = L / l, R = ne / (1 + a(t.barGapWidth, "chartex") / 100);
	for (let n = 0; n < l; n++) {
		let a = Math.max(0, o[n] ?? 0), c = F * a / u, l = M + (F - c) / 2, g = P + ne * n + (ne - R) / 2, x = (e) => {
			b && c > 0 ? te(e, b, {
				x: l,
				y: g,
				w: c,
				h: R
			}, y, r, i) : b && (e.fillStyle = Se(e, b, l, g, c, R, y, i), e.fillRect(l, g, c, R)), Ce(e, t, t.chartexDataPointStyle, _, 0, 1, y, r) && e.strokeRect(l, g, c, R);
		};
		c > 0 ? ee(e, _?.chartexStyle, t.chartexDataPointStyle, 0, {
			x: l,
			y: g,
			w: c,
			h: R
		}, r, x) : x(e);
		let S = t.categories[n];
		!t.catAxisHidden && S != null && (e.fillStyle = t.catAxisFontColor ? `#${t.catAxisFontColor}` : "#595959", e.textAlign = "right", e.textBaseline = "middle", e.fillText(S, M - 6, g + R / 2));
		let C = s(t, _, n, S ?? "", a, {
			visible: !1,
			showVal: !1,
			showCatName: !1
		}, v);
		if (C) {
			let n = p(C.fontSizeHpt, r) ?? xe(t.dataLabelFontSizeHpt, h, r), a = V(t, C.fontFace ?? t.dataLabelFontFace, "minor");
			e.font = `${C.textStyle.fontItalic ? "italic " : ""}${C.fontBold ? "bold " : ""}${n}px ${a}`, de(e, C.text, {
				kind: "bar",
				rect: {
					x: l,
					y: g,
					w: c,
					h: R
				},
				orientation: "horizontal",
				negative: !1,
				position: C.position ?? "ctr"
			}, {
				x: M,
				y: P,
				w: F,
				h: L
			}, n, C.fontColor ? `#${C.fontColor}` : "#ffffff", C.manualLayout, {
				x: d,
				y: f,
				w: m,
				h
			}, se(t, C.richRuns, r, a, C.fontBold ?? !1, C.textStyle), void 0, C.textStyle, r, C.labelBox, i);
		}
	}
	if (!t.catAxisHidden && !t.catAxisLineHidden) {
		let n = N(t.catAxisLineColor, t.catAxisLineWidthEmu, r);
		e.strokeStyle = n.color, e.lineWidth = n.width, e.beginPath(), e.moveTo(M, P), e.lineTo(M, P + L), e.stroke();
	}
	Oe(e, x, S, d, f, m, h, M, P, F, L, g.bandH + 2, r, [b], i), e.restore();
}
function Y(e, t, n, r, i = 0) {
	let a = t.series[0];
	if (!a || ye(e, n, Math.max(t.categories.length, a.categories?.length ?? 0, a.values.length))) return;
	let o = G(a, t.categories, { sortDescending: !1 });
	if (o.points.length === 0) return;
	let s = we(a, 0), c = ae(t, t.chartexDataPointLineStyle, a, s, 1, ve(0, a), { linkedNoStyleFallback: !0 });
	ie(e, {
		...t,
		chartType: "line",
		categories: o.categories,
		series: [{
			...o.series,
			showMarker: !1,
			lineHidden: !c.visible,
			lineColor: c.color.replace(/^#/, ""),
			lineWidthEmu: c.widthEmu,
			chartexStyle: {
				lineDash: c.dash,
				lineCap: c.cap,
				lineJoin: c.join
			}
		}],
		catAxisHidden: !1,
		catAxisTickLabelPos: "none",
		showLegend: !1,
		valMin: t.valMin ?? 0,
		valMax: t.valMax ?? 1.2,
		valAxisMajorUnit: t.valAxisMajorUnit ?? .2
	}, n, r, i);
}
function X(e, t, n, r, i = 0) {
	let a = t.series[0];
	if (!a || ye(e, n, Math.max(t.categories.length, a.categories?.length ?? 0, a.values.length))) return;
	let o = G(a, t.categories);
	if (o.points.length === 0) return;
	let s = t.series.find((e) => e.seriesType === "line"), c = s?.chartexFormatIdx ?? a.chartexFormatIdx ?? 0, l = {
		...s ?? o.series,
		name: s?.name || "Cumulative %",
		values: o.series.values,
		categories: o.categories,
		color: s?.color ?? me(t, t.chartexDataPointLineStyle, "line", c, 1) ?? a.lineColor ?? a.color,
		seriesType: "line",
		useSecondaryAxis: !0,
		showMarker: !1
	}, u = {
		min: t.secondaryValAxis?.min ?? 0,
		max: t.secondaryValAxis?.max ?? 1,
		title: t.secondaryValAxis?.title ?? null,
		hidden: t.secondaryValAxis?.hidden ?? !1,
		formatCode: t.secondaryValAxis?.formatCode ?? "0%",
		fontColor: t.secondaryValAxis?.fontColor ?? null,
		fontSizeHpt: t.secondaryValAxis?.fontSizeHpt ?? null,
		fontFace: t.secondaryValAxis?.fontFace ?? null,
		lineColor: t.secondaryValAxis?.lineColor ?? null,
		lineWidthEmu: t.secondaryValAxis?.lineWidthEmu ?? null,
		lineHidden: t.secondaryValAxis?.lineHidden ?? !1,
		majorTickMark: t.secondaryValAxis?.majorTickMark ?? "out",
		minorTickMark: t.secondaryValAxis?.minorTickMark ?? null,
		majorUnit: t.secondaryValAxis?.majorUnit ?? null,
		minorUnit: t.secondaryValAxis?.minorUnit ?? null,
		titleFontSizeHpt: t.secondaryValAxis?.titleFontSizeHpt ?? null,
		titleFontBold: t.secondaryValAxis?.titleFontBold ?? null,
		titleFontColor: t.secondaryValAxis?.titleFontColor ?? null,
		titleFontFace: t.secondaryValAxis?.titleFontFace ?? null
	};
	F(e, {
		...t,
		chartType: "clusteredBar",
		categories: o.categories,
		series: [{
			...o.orderedSeries,
			seriesType: null,
			useSecondaryAxis: !1
		}, l],
		secondaryValAxis: u
	}, n, r, {
		gapPolicy: "chartex",
		semanticLineNoStyleFallback: !0
	}, i);
}
var Z = 7, He = .05, Q = 1.2;
function Ue(e, t, n, r) {
	let i = (r ?? t) - (n ?? e);
	if (!(i > 0) || !Number.isFinite(i)) return null;
	let a = je(i, Z);
	if (!(a > 0) || !Number.isFinite(a)) return null;
	let o = e - i * He, s = t + i * He;
	e >= 0 && (e === 0 || t > Q * e) && (o = 0), t <= 0 && (t === 0 || Math.abs(e) > Q * Math.abs(t)) && (s = 0);
	let c = n ?? Math.floor(o / a) * a, l = r ?? Math.ceil(s / a) * a;
	return ![c, l].every(Number.isFinite) || !(l > c) ? null : {
		min: c,
		max: l,
		majorUnit: a
	};
}
function We(t, r, i, o, s) {
	let l = 3 * o, u = r.chartexBox;
	if (!u || u.categories.length === 0 || u.series.length === 0) return;
	let { x: f, y: p, w: m, h } = i;
	if (ye(t, i, C(u.series.map((e) => e.valuesByCategory), 1e4))) return;
	let _ = () => {
		t.fillStyle = "#888", t.font = "12px sans-serif", t.textAlign = "center", t.textBaseline = "middle", t.fillText("(chart values out of range)", f + m / 2, p + h / 2);
	}, v = (e) => {
		let t = e.max - e.min, n = t / e.step;
		return Number.isFinite(e.min) && Number.isFinite(e.max) && Number.isFinite(e.step) && Number.isFinite(t) && Number.isFinite(n) && e.max > e.min && e.step > 0 && n <= 1e3 && e.min + e.step > e.min;
	}, y = Infinity, b = -Infinity;
	for (let e of u.series) for (let t of e.valuesByCategory) for (let e of t) Number.isFinite(e) && (e < y && (y = e), e > b && (b = e));
	if (!isFinite(y) || !isFinite(b)) return;
	if (!Number.isFinite(b - y)) {
		_();
		return;
	}
	let x = r.valAxisMajorUnit == null ? Ue(y, b, r.valMin, r.valMax) : null, S = x ? {
		...r,
		valMin: x.min,
		valMax: x.max,
		valAxisMajorUnit: x.majorUnit
	} : r, E = V(r, r.valAxisFontFace, "minor"), k = xe(r.valAxisFontSizeHpt, h, o), A = P(k), F = he(o), I = Ae({
		dataMin: y,
		dataMax: b,
		explicitMin: S.valMin,
		explicitMax: S.valMax,
		axisLenPt: h / o,
		majorUnit: S.valAxisMajorUnit
	});
	if (!v({
		min: I.min,
		max: I.max,
		step: I.majorUnit
	})) {
		_();
		return;
	}
	let L = 0;
	if (!r.valAxisHidden) {
		let e = t.font;
		t.font = be(k, E, r.valAxisFontBold ?? !1, r.valAxisFontItalic ?? !1);
		let n = 0;
		for (let e of I.majorTicks) {
			let i = le(r, e, !1);
			n = Math.max(n, t.measureText(i).width);
		}
		t.font = e, L = n + A + g * o;
	}
	let ie = Ee(t, r, m, h, o), se = xe(r.catAxisFontSizeHpt, h, o), de = xe(r.valAxisFontSizeHpt, h, o), ve = n(r, m, h, o), H = u.series.length, Se = u.series.map((e, t) => we(e, t)), De = u.series.map((e, t) => {
		let n = Se[t], i = e.color ?? z(r, n, H, e.chartexStyle);
		return pe(r, e.name, e, r.chartexDataPointStyle, n, H, i, !0);
	}), ke = {
		...r,
		series: De
	}, je = ue(t, ke, m, h, .22, o), { legRightW: Me, legLeftW: Ne, legTopH: Pe, legBottomH: Fe } = D(je, r.legendOverlay === !0), Ie = c(r, f, p, m, h, o, {
		titleBand: ie,
		legendSideReserveFrac: .22,
		legendReserve: je,
		pad: {
			t: ie.bandH + Pe + de / 2 + 2,
			r: Me + m * .02,
			b: Fe + ve.catBandH + (r.catAxisHidden ? h * .02 : d(se)),
			l: Ne + ve.valBandW + (r.valAxisHidden ? m * .02 : L)
		},
		honorPlotAreaManualLayout: !0
	}), { px0: W, py0: G, pw: K, ph: q } = Ie.plotRect;
	j(t, r, W, G, K, q, o, s);
	let Le = u.categories, Re = Le.length, ze = oe(S, y, b, q / o);
	if (!v(ze)) {
		_();
		return;
	}
	Te(t, r, f, p, m, h, p + Ie.title.topPad, Ie.title.fontPx);
	let { min: Be, max: Ve } = ze, J = Ve - Be, Y = (e) => G + q * (1 - (e - Be) / J), X = N(r.valAxisLineColor, r.valAxisLineWidthEmu, o), Z = re(r, o);
	if (t.save(), !r.valAxisHidden) {
		if (t.font = be(k, E, r.valAxisFontBold ?? !1, r.valAxisFontItalic ?? !1), t.textAlign = "right", t.textBaseline = "middle", r.valAxisMinorGridlines) {
			let e = ce(r, o);
			for (let n of ze.minorLines) R(t, W, K, Y(n), !1, e);
		}
		for (let e of ze.majorLines) {
			let n = Y(e);
			if (r.valAxisMajorGridlines !== !1) {
				t.strokeStyle = Z.color, t.lineWidth = Z.width;
				let e = Z.dash.length > 0 && t.getLineDash ? t.getLineDash() : [];
				Z.dash.length > 0 && t.setLineDash(Z.dash), t.beginPath(), t.moveTo(W, n), t.lineTo(W + K, n), t.stroke(), Z.dash.length > 0 && t.setLineDash(e);
			}
			t.fillStyle = r.valAxisFontColor ? `#${r.valAxisFontColor}` : "#595959", t.fillText(le(r, e, !1), W - F, n), _e(t, r.valAxisMajorTickMark, "val", W, n, X.color, X.width, !1, r.valAxisLineHidden, "major", o, r.valAxisLineDash);
		}
		for (let e of ze.minorTicks) _e(t, r.valAxisMinorTickMark, "val", W, Y(e), X.color, X.width, !1, r.valAxisLineHidden, "minor", o, r.valAxisLineDash);
		r.valAxisLineHidden || ne(t, W, G, W, G + q, X.color, X.width, r.valAxisLineDash);
	}
	let He = N(r.catAxisLineColor, r.catAxisLineWidthEmu, o);
	!r.catAxisHidden && !r.catAxisLineHidden && ne(t, W, G + q, W + K, G + q, He.color, He.width, r.catAxisLineDash);
	let Q = K / Re, We = a(r.barGapWidth, "chartex"), Ge = (e) => `#${u.series[e].color ?? z(r, Se[e], H, u.series[e].chartexStyle)}`, Ke = (e) => U(r, Se[e], H, u.series[e].chartexStyle, u.series[e].color), qe = u.series.map((e) => e.valuesByCategory.map((t) => w(t, e.quartileMethod))), Je = (e, t) => {
		let n = M(W, K, u.oneBoxPerSeries ? 1 : Re, H, u.oneBoxPerSeries ? 0 : e, t, We);
		return n ? {
			bx: n.boxX,
			boxW: n.boxWidth,
			cx: n.centerX
		} : {
			bx: W,
			boxW: 0,
			cx: W
		};
	};
	for (let e = 0; e < H; e++) {
		let n = u.series[e];
		if (!n.meanLine) continue;
		let i = r.chartexDataPointLineStyle ?? r.chartexDataPointStyle, a = n.lineColor ? `#${n.lineColor}` : Ge(e);
		if (t.save(), Ce(t, r, i, n, Se[e], H, a, o) || n.lineColor != null) {
			n.lineColor && (t.strokeStyle = a), n.lineWidthEmu && (t.lineWidth = T(n.lineWidthEmu, o));
			let r = !1;
			t.beginPath();
			for (let n = 0; n < Re; n++) {
				let i = qe[e][n];
				if (!i) {
					r = !1;
					continue;
				}
				let { cx: a } = Je(n, e), o = Y(i.mean);
				r ? t.lineTo(a, o) : t.moveTo(a, o), r = !0;
			}
			t.stroke();
		}
		t.restore();
	}
	let $ = xe(r.catAxisFontSizeHpt, h, o), Ye = O($);
	for (let n = 0; n < Re; n++) {
		let i = W + Q * (n + .5);
		r.catAxisHidden || _e(t, r.catAxisMajorTickMark, "cat", G + q, i, He.color, He.width, !1, r.catAxisLineHidden, "major", o, r.catAxisLineDash);
		for (let i = 0; i < H; i++) {
			let a = u.series[i], c = qe[i][n];
			if (!c) continue;
			let { bx: d, boxW: f, cx: p } = Je(n, i), m = Ge(i), h = Ke(i), g = r.chartexDataPointStyle, _ = r.chartexDataPointLineStyle ?? g, v = r.chartexDataPointMarkerStyle ?? g, y = Se[i], b = me(r, g, "line", y, H), x = a.lineColor ? `#${a.lineColor}` : b ? `#${b}` : m, S = a.lineWidthEmu ? T(a.lineWidthEmu, o) : g?.lineWidthEmu == null ? 1 : T(g.lineWidthEmu, o), C = me(r, _, "line", y, H), w = me(r, v, "fill", y, H), E = B(r, y, H, a.chartexStyle, a.color, v), D = me(r, v, "line", y, H), O = ae(r, v, a, y, H, D ?? x, { linkedNoStyleFallback: !0 }), k = e(a.chartexStyle), A = (e, n) => Ce(t, r, e, a, y, H, n, o, { linkedNoStyleFallback: !0 }), j = Y(c.q1), M = Y(c.q3), N = Math.min(j, M), P = Math.max(1, Math.abs(j - M)), F = f * .4;
			A(_, C ?? x) && (t.beginPath(), t.moveTo(p, Y(c.whiskerHi)), t.lineTo(p, M), t.moveTo(p, j), t.lineTo(p, Y(c.whiskerLo)), t.moveTo(p - F / 2, Y(c.whiskerHi)), t.lineTo(p + F / 2, Y(c.whiskerHi)), t.moveTo(p - F / 2, Y(c.whiskerLo)), t.lineTo(p + F / 2, Y(c.whiskerLo)), t.stroke()), ee(t, a.chartexStyle, g, y, {
				x: d,
				y: N,
				w: f,
				h: P
			}, o, (e) => {
				h && te(e, h, {
					x: d,
					y: N,
					w: f,
					h: P
				}, m, o, s), Ce(e, r, g, a, y, H, x, o, { linkedNoStyleFallback: !0 }) && e.strokeRect(d + S / 2, N + S / 2, f - S, P - S);
			});
			let I = Y(c.median);
			if (A(_, C ?? x) && (t.beginPath(), t.moveTo(d, I), t.lineTo(d + f, I), t.stroke()), a.showNonoutliers) {
				let e = r.chartStyleMarkerSymbol ?? r.chartexMarkerSymbol ?? "circle";
				for (let n of c.inner) e !== "none" && fe(t, p, Y(n), e, 3, E ? w ? `#${w}` : m : "transparent", O.visible ? O.color : null, o, O.widthEmu == null ? 1 : T(O.widthEmu, o), E, s, O.visible ? O.paint : null, O.dash, O.customDash, O.cap, O.join, !1, k, v, y, y);
			}
			if (a.meanMarker) {
				let e = Y(c.mean), n = l;
				A(v, D ?? x) && (t.beginPath(), t.moveTo(p - n, e - n), t.lineTo(p + n, e + n), t.moveTo(p + n, e - n), t.lineTo(p - n, e + n), t.stroke());
			}
			if (a.showOutliers) {
				let e = r.chartStyleMarkerSymbol ?? r.chartexMarkerSymbol ?? "circle";
				for (let n of c.outliers) e !== "none" && fe(t, p, Y(n), e, 3, E ? w ? `#${w}` : m : "transparent", O.visible ? O.color : null, o, O.widthEmu == null ? 1 : T(O.widthEmu, o), E, s, O.visible ? O.paint : null, O.dash, O.customDash, O.cap, O.join, !1, k, v, y, y);
			}
		}
		if (!r.catAxisHidden) {
			t.font = be($, V(r, r.catAxisFontFace, "minor"), r.catAxisFontBold ?? !1, r.catAxisFontItalic ?? !1), t.fillStyle = r.catAxisFontColor ? `#${r.catAxisFontColor}` : "#595959", t.textAlign = "center", t.textBaseline = "top";
			let e = Le[n];
			t.fillText(e, i, G + q + Ye);
		}
	}
	t.restore(), ge(t, r, f, p, m, h, W, G, K, q, Ne, Fe, ve.catFontPx, ve.valFontPx), Oe(t, ke, je, f, p, m, h, W, G, K, q, ie.bandH + 2, o, u.series.map((e, t) => Ke(t)), s);
}
var Ge = .18;
function Ke(e, t, n, r, i) {
	let a = t.chartexSunburst;
	if (!a || a.rows.length === 0) return;
	let { x: o, y: l, w: u, h: d } = n;
	if (v(a.rows)) {
		ye(e, n, _ + 1);
		return;
	}
	let f = y(a.rows);
	if (f.layoutWeight <= 0 || f.children.length === 0) return;
	let h = t.series[0], g = I(h?.dataLabelOverrides), b = f.children.map((e, n) => U(t, n, f.children.length, h?.chartexStyle, h?.color)), S = {
		...t,
		chartType: "clusteredBar",
		series: f.children.map((e) => {
			let n = z(t, e.branchIndex, f.children.length, h?.chartexStyle);
			return pe(t, e.label, h, t.chartexDataPointStyle, e.branchIndex, f.children.length, n, !1, !1);
		})
	}, C = ue(e, S, u, d, .22, r), w = c(t, o, l, u, d, r, {
		titleTopPadFrac: .035,
		titleBottomPadFrac: .035,
		legendSideReserveFrac: 0,
		legendReserve: C,
		radialGapFrac: .02,
		honorPlotAreaManualLayout: !0
	});
	Te(e, t, o, l, u, d, l + w.title.topPad, w.title.fontPx);
	let { px0: T, py0: E, pw: D, ph: O } = w.plotRect;
	j(e, t, T, E, D, O, r, i);
	let k = T + D / 2, A = E + O / 2, M = Math.min(D, O) * .46;
	f.a0 = -Math.PI / 2, f.a1 = -Math.PI / 2 + Math.PI * 2, x(f);
	let N = m(f) + 1, P = M * Ge, F = (M - P) / N, te = (e) => `#${z(t, e, f.children.length, h?.chartexStyle)}`, ne = (e) => U(t, e, f.children.length, h?.chartexStyle, h?.color), R = h?.seriesDataLabels, re = V(t, R?.fontFace ?? t.dataLabelFontFace, "minor"), ie = p(R?.fontSizeHpt, r) ?? Math.max(7, Math.min(13, M * .075)), ae = R?.fontColor ? `#${R.fontColor}` : "#ffffff", oe = Array.from({ length: N }, () => []), ce = [f];
	for (; ce.length > 0;) {
		let e = ce.pop();
		e.depth >= 0 && oe[e.depth].push(e);
		for (let t = e.children.length - 1; t >= 0; t--) ce.push(e.children[t]);
	}
	e.save();
	for (let n = 0; n < N; n++) {
		let a = P + n * F, c = a + F;
		for (let m of oe[n]) {
			let n = m.a1 - m.a0;
			if (n <= 1e-4) continue;
			let _ = ne(m.branchIndex), v = {
				x: k - c,
				y: A - c,
				w: c * 2,
				h: c * 2
			};
			ee(e, h?.chartexStyle, t.chartexDataPointStyle, h?.chartexFormatIdx ?? 0, v, r, (e) => {
				e.beginPath(), e.arc(k, A, c, m.a0, m.a1), e.arc(k, A, a, m.a1, m.a0, !0), e.closePath(), _ && L(e, _, v, te(m.branchIndex), r, i), Ce(e, t, t.chartexDataPointStyle, t.series[0], m.branchIndex, f.children.length, "#ffffff", r) && e.stroke();
			}, m.branchIndex);
			let y = s(t, h, m.labelIndex, m.label, m.value, {
				visible: !1,
				showVal: !1,
				showCatName: !1
			}, g);
			if (!y) continue;
			let b = y.text, x = p(y.fontSizeHpt, r) ?? ie, S = y.fontColor ? `#${y.fontColor}` : ae, C = y.fontFace ? V(t, y.fontFace, "minor") : re, w = (m.a0 + m.a1) / 2, j = (a + c) / 2, M = F - 4, N = n * j;
			if (!y.manualLayout && M < x * .9 && N < x * .9) continue;
			let P = k + Math.cos(w) * j, I = A + Math.sin(w) * j;
			if (e.font = `${y.textStyle.fontItalic ? "italic " : ""}${y.fontBold ? "bold " : ""}${x}px ${C}`, y.manualLayout) {
				de(e, b, {
					kind: "point",
					x: P,
					y: I,
					position: y.position ?? "ctr"
				}, {
					x: T,
					y: E,
					w: D,
					h: O
				}, x, S, y.manualLayout, {
					x: o,
					y: l,
					w: u,
					h: d
				}, se(t, y.richRuns, r, C, y.fontBold ?? !1, y.textStyle), void 0, y.textStyle, r, y.labelBox, i);
				continue;
			}
			e.save(), e.translate(P, I);
			let R = w, oe = R * 180 / Math.PI % 360;
			(oe > 90 || oe < -90) && (R += Math.PI), e.rotate(R), e.font = `${y.textStyle.fontItalic ? "italic " : ""}${y.fontBold ? "bold " : ""}${x}px ${C}`, de(e, b, {
				kind: "point",
				x: 0,
				y: 0,
				position: y.position ?? "ctr"
			}, {
				x: -M / 2,
				y: -N / 2,
				w: M,
				h: N
			}, x, S, void 0, {
				x: -M / 2,
				y: -N / 2,
				w: M,
				h: N
			}, se(t, y.richRuns, r, C, y.fontBold ?? !1, y.textStyle), void 0, y.textStyle, r, y.labelBox, i), e.restore();
		}
	}
	e.restore(), Oe(e, S, C, o, l, u, d, T, E, D, O, w.title.bandH + 2, r, b, i);
}
function qe(e, t) {
	let n = e.map((e, t) => ({
		node: e,
		index: t,
		value: e.layoutWeight
	})).filter((e) => e.value > 0).sort((e, t) => t.value - e.value || e.index - t.index), r = n.reduce((e, t) => e + t.value, 0);
	if (r <= 0 || t.w <= 0 || t.h <= 0) return [];
	let i = t.w * t.h / r, a = n.map((e) => ({
		...e,
		area: e.value * i
	})), o = [], s = { ...t }, c = [], l = 0, u = Infinity, d = 0, f = (e, t, n, r) => {
		if (e <= 0 || t <= 0 || r <= 0) return Infinity;
		let i = r * r;
		return Math.max(i * n / (e * e), e * e / (i * t));
	}, p = (e, t) => {
		if (e.length !== 0) if (s.w >= s.h) {
			let n = s.h > 0 ? t / s.h : 0, r = s.y;
			for (let t = 0; t < e.length; t++) {
				let i = t === e.length - 1 ? s.y + s.h - r : e[t].area / n;
				o.push({
					node: e[t].node,
					rect: {
						x: s.x,
						y: r,
						w: n,
						h: i
					}
				}), r += i;
			}
			s = {
				x: s.x + n,
				y: s.y,
				w: Math.max(0, s.w - n),
				h: s.h
			};
		} else {
			let n = s.w > 0 ? t / s.w : 0, r = s.x;
			for (let t = 0; t < e.length; t++) {
				let i = t === e.length - 1 ? s.x + s.w - r : e[t].area / n;
				o.push({
					node: e[t].node,
					rect: {
						x: r,
						y: s.y,
						w: i,
						h: n
					}
				}), r += i;
			}
			s = {
				x: s.x,
				y: s.y + n,
				w: s.w,
				h: Math.max(0, s.h - n)
			};
		}
	}, m = 0;
	for (; m < a.length;) {
		let e = a[m], t = Math.min(s.w, s.h), n = l + e.area, r = Math.min(u, e.area), i = Math.max(d, e.area);
		c.length === 0 || f(n, r, i, t) <= f(l, u, d, t) ? (c.push(e), l = n, u = r, d = i, m++) : (p(c, l), c = [], l = 0, u = Infinity, d = 0);
	}
	return p(c, l), o;
}
function Je(e, t, n, r, i) {
	let a = t.chartexTreemap;
	if (!a || a.rows.length === 0) return;
	if (v(a.rows)) {
		ye(e, n, _ + 1);
		return;
	}
	let o = y(a.rows, !0);
	if (o.layoutWeight <= 0 || o.children.length === 0) return;
	let l = t.series[0], u = o.children.map((e) => U(t, e.branchIndex, o.children.length, l?.chartexStyle, l?.color)), d = {
		...t,
		chartType: "clusteredBar",
		series: o.children.map((e) => {
			let n = z(t, e.branchIndex, o.children.length, l?.chartexStyle);
			return pe(t, e.label, l, t.chartexDataPointStyle, e.branchIndex, o.children.length, n, !0, !1);
		})
	}, f = ue(e, d, n.w, n.h, .22, r), m = c(t, n.x, n.y, n.w, n.h, r, {
		titleTopPadFrac: .035,
		titleBottomPadFrac: .035,
		legendSideReserveFrac: 0,
		legendReserve: f,
		radialGapFrac: .015,
		honorPlotAreaManualLayout: !0
	});
	Te(e, t, n.x, n.y, n.w, n.h, n.y + m.title.topPad, m.title.fontPx);
	let { px0: h, py0: g, pw: b, ph: x } = m.plotRect;
	j(e, t, h, g, b, x, r, i);
	let S = {
		x: h,
		y: g,
		w: b,
		h: x
	}, C = a.parentLabelLayout ?? "overlapping", w = t.series[0]?.seriesDataLabels, T = V(t, w?.fontFace ?? t.dataLabelFontFace, "minor"), E = p(w?.fontSizeHpt, r) ?? Math.max(8, Math.min(13, m.plotRect.ph * .025)), D = w?.fontColor ? `#${w.fontColor}` : "#ffffff", O = new Map((t.series[0]?.dataLabelOverrides ?? []).map((e) => [e.idx, e])), k = t.chartBg ? t.chartBg.startsWith("#") ? t.chartBg : `#${t.chartBg}` : "#ffffff", A = (a, c) => {
		if (c.w < .5 || c.h < .5) return;
		let u = `#${z(t, a.branchIndex, o.children.length, l?.chartexStyle)}`, d = U(t, a.branchIndex, o.children.length, l?.chartexStyle, l?.color), f = O.get(a.labelIndex), m = f?.fontColor ? `#${f.fontColor}` : D, h = p(f?.fontSizeHpt, r) ?? E, g = f?.fontBold ?? w?.fontBold ?? !1;
		if (a.children.length > 0) {
			let o = s(t, l, a.labelIndex, a.label, a.value, {
				visible: C !== "none",
				showVal: !1,
				showCatName: !0
			}, O, !0), p = o != null && (C !== "overlapping" || a.depth === 0), _ = h, v = o?.fontFace ? V(t, o.fontFace, "minor") : T, y = C === "banner" && p ? Math.min(c.h * .28, _ + 7) : 0;
			y > 0 && ee(e, l?.chartexStyle, t.chartexDataPointStyle, l?.chartexFormatIdx ?? 0, {
				x: c.x,
				y: c.y,
				w: c.w,
				h: y
			}, r, (e) => {
				d && te(e, d, {
					x: c.x,
					y: c.y,
					w: c.w,
					h: y
				}, u, r, i);
			}, a.branchIndex);
			let b = {
				x: c.x,
				y: c.y + y,
				w: c.w,
				h: Math.max(0, c.h - y)
			};
			for (let e of qe(a.children, b)) A(e.node, e.rect);
			if (p && (o.manualLayout || c.w > _ * 2 && c.h > _ + 4)) {
				e.font = `${g ? "bold " : ""}${_}px ${v}`;
				let a = y > 0 ? {
					x: c.x,
					y: c.y,
					w: c.w,
					h: y
				} : c, s = f?.position ?? "inBase";
				de(e, o.text, o.manualLayout ? {
					kind: "point",
					x: c.x + c.w / 2,
					y: c.y + c.h / 2,
					position: s
				} : {
					kind: "box",
					rect: a,
					position: s
				}, o.manualLayout ? S : a, _, m, o.manualLayout, n, se(t, o.richRuns, r, v, g, o.textStyle), void 0, o.textStyle, r, o.labelBox, i);
			}
			return;
		}
		ee(e, l?.chartexStyle, t.chartexDataPointStyle, l?.chartexFormatIdx ?? 0, c, r, (e) => {
			d && te(e, d, c, u, r, i), Ce(e, t, t.chartexDataPointStyle, t.series[0], a.branchIndex, o.children.length, k, r, { linkedNoStyleFallback: !0 }) && e.strokeRect(c.x, c.y, c.w, c.h);
		}, a.branchIndex);
		let _ = s(t, l, a.labelIndex, a.label, a.value, {
			visible: !1,
			showVal: !1,
			showCatName: !1
		}, O);
		if (!_) return;
		let v = p(_.fontSizeHpt, r) ?? h;
		if (!_.manualLayout && (c.w <= v * 1.2 || c.h <= v * 1.2)) return;
		let y = _.fontFace ? V(t, _.fontFace, "minor") : T;
		e.font = `${_.fontBold ? "bold " : ""}${v}px ${y}`;
		let b = c, x = _.position === "outEnd" ? "inEnd" : _.position ?? "ctr";
		de(e, _.text, _.manualLayout ? {
			kind: "point",
			x: c.x + c.w / 2,
			y: c.y + c.h / 2,
			position: x
		} : {
			kind: "box",
			rect: b,
			position: x
		}, _.manualLayout ? S : b, v, _.fontColor ? `#${_.fontColor}` : m, _.manualLayout, n, se(t, _.richRuns, r, y, _.fontBold ?? !1, _.textStyle), void 0, _.textStyle, r, _.labelBox, i);
	};
	e.save(), e.beginPath(), e.rect(h, g, b, x), e.clip();
	for (let e of qe(o.children, {
		x: h,
		y: g,
		w: b,
		h: x
	})) A(e.node, e.rect);
	e.restore(), Oe(e, d, f, n.x, n.y, n.w, n.h, h, g, b, x, m.title.bandH + 2, r, u, i);
}
function $(e, t, n, r, i = 0) {
	let a = Re(t, void 0, n, r), o = ze(t, n, r);
	if (a != null && a > 1048576 || o != null && o > 1048576 || a != null && o != null && a > 1048576 - o) return ye(e, n, _ + 1), !0;
	switch (t.chartType) {
		case "waterfall": return Ve(e, t, n, r, i), !0;
		case "clusteredColumn": return F(e, {
			...t,
			chartType: "clusteredBar"
		}, n, r, { gapPolicy: "chartex" }, i), !0;
		case "histogram": return Be(e, t, n, r, i), !0;
		case "funnel": return J(e, t, n, r, i), !0;
		case "paretoLine": return Y(e, t, n, r, i), !0;
		case "pareto": return X(e, t, n, r, i), !0;
		case "boxWhisker": return We(e, t, n, r, i), !0;
		case "sunburst": return Ke(e, t, n, r, i), !0;
		case "treemap": return Je(e, t, n, r, i), !0;
		default: return !1;
	}
}
//#endregion
//#region src/chart-ex.ts
var Ye = Me({ render: $ }, "chartEx");
//#endregion
export { Ye as chartEx };
