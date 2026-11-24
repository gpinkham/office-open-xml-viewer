// optional-renderer: packages/core/src/chart/chart-ex-renderer.ts
import { $ as e, $t as t, Bt as n, Cn as r, Di as i, Dn as a, En as o, Fi as s, Gi as c, Gt as l, Hn as u, J as d, Kt as f, Li as p, Nt as m, On as h, Pt as g, Qi as _, R as v, S as y, Tn as b, Un as x, Vi as S, Vn as C, Vt as w, Wn as T, Y as E, Zt as D, _i as O, _n as k, b as A, br as j, bt as M, ci as N, cn as P, ct as F, ei as I, fi as ee, gi as L, gn as te, hn as R, it as ne, mn as z, ni as re, nt as ie, oi as ae, on as B, ot as oe, pi as se, qr as ce, ri as le, rt as ue, s as de, st as fe, t as pe, ti as me, tt as he, vn as ge, wn as _e, x as V, xt as H, yi as ve, yn as ye } from "./plot-area-frame-BcsSpaGV.js";
import { t as be } from "./chart-number-format-BTQAc_0Z.js";
import { A as xe, C as Se, D as Ce, E as we, O as Te, S as Ee, T as De, _ as U, a as Oe, b as ke, c as Ae, d as je, f as Me, g as Ne, i as Pe, j as Fe, k as Ie, l as Le, m as Re, o as ze, p as Be, s as Ve, u as He, v as Ue, w as We, x as Ge, y as W } from "./renderer-De7WmCg3.js";
import { t as G } from "./renderer-module-contract-BuTx2FWJ.js";
function Ke(e, t, n, r = 1) {
	let i = 0, a = Math.max(1, n?.w ?? 32 * r), o = Math.max(1, n?.h ?? 16 * r), c = te(e, ({ label: n, linkedStyleIndex: c }) => {
		let l = n.labelBox, u = ge(l), d = u ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, f = u ? _(e, "dataLabelCallout") ?? _(e, "dataLabel") : _(e, "dataLabel"), m = ye(l, d, f, d != null, 0, c)?.fillPaint, h = s(l?.style, f, 0), g = l?.borderHidden === !0 ? p(f) : void 0, v = l?.borderColor != null || l?.borderFill != null || h !== void 0 || g !== void 0 || l?.borderPaintAuthored === !0 && l?.borderHidden !== !0, y = h === void 0 ? g === void 0 ? l?.borderFill ?? (l?.borderColor ? {
			fillType: "solid",
			color: l.borderColor
		} : v ? null : S(d, c)) : g : h;
		for (let e of [m, y]) {
			if (!e) continue;
			let n = e.fillType === "image" ? de(e, t, a, o, r) ?? 1048577 : j(e);
			if (e.fillType === "gradient" && n > 4096 || n > 1048576 - i) {
				i = P + 1;
				return;
			}
			i += n;
		}
	});
	return c === "not-hierarchy" ? null : c === "too-large" ? P + 1 : i;
}
function K(e, t, n, r) {
	if (!e.chartexParetoOutlineOwner) return t;
	let i = t.chartexFormatIdx ?? n, a = t.lineColor ?? U(e, i, r, t.chartexStyle);
	return {
		...t,
		chartexStyle: {
			...t.chartexStyle,
			fillHidden: !0,
			fillPaintAuthored: !0
		},
		lineColor: a,
		lineHidden: !1
	};
}
function qe(e, t, r = 1) {
	if (e.chartexSuppressGeometry) return 0;
	if (![
		"waterfall",
		"funnel",
		"boxWhisker",
		"sunburst",
		"treemap",
		"clusteredColumn",
		"histogram",
		"pareto",
		"paretoLine"
	].includes(e.chartType)) return null;
	let i = 0, a = (e) => {
		if (!e || i > 1048576) return;
		let n = e.fillType === "image" ? de(e, void 0, Math.max(1, t.w), Math.max(1, t.h), r) : j(e);
		e.fillType === "gradient" && n > 4096 || n > 1048576 - i ? i = P + 1 : i += n;
	}, o = (t, n, r, i) => {
		let o = Fe(e, t, n, r, i, "#000000", { linkedNoStyleFallback: !0 });
		o.visible && a(o.paint ?? {
			fillType: "solid",
			color: "000000"
		});
	}, s = (t, n, r, o) => {
		a(Ie(e, t, n, r, o));
		let s = xe(e, t, n, r, o, "#000000");
		if (s.visible && !Ge(s) && a(s.paint ?? {
			fillType: "solid",
			color: "000000"
		}), i > 1048576) return !1;
	}, c = (t, n) => {
		let r = [e.chartexDataPointStyle, e.chartexDataPointLineStyle];
		Te(e, Se(t, n), r, r, n, 1, "#000000", { linkedNoStyleFallback: !0 }).visible && a({
			fillType: "solid",
			color: "000000"
		});
	}, u = A(e, (t, n, r) => n === 0 ? K(e, t, n, r) : t);
	if (u) {
		if (u.kind === "tooManyInputPoints") return P + 1;
		if (y(u, s), i > 1048576 || (V(u, s), i > 1048576)) return i;
		if (e.chartType === "pareto" && u.series.length > 0) {
			let t = e.chartexParetoOwnerIndex ?? 0, n = u.series[t], r = e.series.find((e) => e.seriesType === "line");
			c(r ?? n, r?.chartexFormatIdx ?? n?.chartexFormatIdx ?? 0);
		}
	} else if (e.chartType === "paretoLine") {
		let t = e.series[0];
		t && l(t, e.categories, { sortDescending: e.chartexParetoSortDescending ?? !1 }).points.length > 0 && c(t, n(t, 0));
	} else if (e.chartType === "waterfall") {
		let t = e.series[0], n = t?.values ?? [], r = w(t?.dataPointOverrides), i = z(n, e.categories.length, e.subtotalIndices);
		if (i.cumulativeOverflow || i.rawMax <= i.rawMin) return 0;
		for (let n = 0; n < i.bars.length; n++) {
			let o = i.bars[n];
			if (!o.paintSlot) continue;
			let s = o.semanticIndex, c = r.get(n);
			a(Ie(e, t, c, s, 3));
			let l = xe(e, t, c, s, 3, "#000000");
			l.visible && !Ge(l) && a(l.paint ?? {
				fillType: "solid",
				color: "000000"
			});
		}
	} else if (e.chartType === "funnel") {
		let t = e.series[0], n = t?.values ?? [], r = Math.max(n.length, e.categories.length);
		if (n.some((e) => e != null && e > 0)) {
			let i = w(t?.dataPointOverrides);
			for (let o = 0; o < r; o++) {
				if (!((n[o] ?? 0) > 0)) continue;
				let r = i.get(o);
				a(Ie(e, t, r, 0, 1));
				let s = xe(e, t, r, 0, 1, "#000000");
				s.visible && a(s.paint ?? {
					fillType: "solid",
					color: "000000"
				});
			}
		}
	} else if (e.chartType === "boxWhisker") {
		let t = e.chartexBox, n = t?.series.length ?? 0;
		for (let r = 0; r < n; r++) {
			let i = t.series[r], s = i.chartexFormatIdx ?? r, c = Ue(e, s, n, i.chartexStyle, i.color);
			for (let t of i.valuesByCategory) T(t, i.quartileMethod) && (a(c), o(e.chartexDataPointStyle, Se(i, s), s, n));
		}
	} else {
		let t = e.series[0], n = 1;
		R(e, ({ node: e }) => {
			n = Math.max(n, e.branchIndex + 1);
		});
		let r = w(t?.dataPointOverrides);
		if (R(e, ({ node: i, paintsBody: o }) => {
			if (!o) return;
			let s = r.get(i.labelIndex);
			a(Ie(e, t, s, i.branchIndex, n));
			let c = xe(e, t, s, i.branchIndex, n, "#000000", e.chartexDataPointStyle, { linkedNoStyleFallback: e.chartType === "treemap" });
			c.visible && a(c.paint ?? {
				fillType: "solid",
				color: "000000"
			});
		}) === "too-large") return P + 1;
	}
	return i;
}
function Je(e, t, n, r, i = 0) {
	let a = t.series[0];
	if (!a) return;
	let o = f(a.values, t.chartexHistogramBinning ?? {}, a.valFormatCode, t.date1904 === !0);
	if (o.kind === "tooManyInputPoints") {
		Le(e, n, B + 1);
		return;
	}
	ze(e, c(t, {
		chartType: "clusteredBar",
		categories: o.categories,
		series: [{
			...a,
			categories: void 0,
			values: o.counts,
			valFormatCode: null
		}]
	}), n, r, { gapPolicy: "chartex" }, i);
}
function Ye(n, r, o, s, l) {
	let { x: u, y: f, w: p, h: m } = o, g = r.series[0]?.values ?? [], _ = r.categories, y = Math.max(g.length, _.length);
	if (y === 0 || Le(n, o, y)) return;
	let { bars: b, rawMax: x, rawMin: S, cumulativeOverflow: C } = z(g, _.length, r.subtotalIndices);
	if (C) {
		n.fillStyle = "#888", n.font = "12px sans-serif", n.textAlign = "center", n.textBaseline = "middle", n.fillText("(chart values out of range)", u + p / 2, f + m / 2);
		return;
	}
	if (x <= S) return;
	let T = r.subtotalIndices.length === 0 && b.every((e, t) => !e.hasValue || g[t] >= 0), D = !r.valAxisHidden && r.valAxisTickLabelPos !== "none" && !T, A = Ae(n, r, p, m, s), j = re(r, p, m, s), P = v(r.valAxisFontSizeHpt, m, s), I = v(r.catAxisFontSizeHpt, m, s), ee = H(r, r.valAxisFontFace, "minor"), te = H(r, r.catAxisFontFace, "minor"), R = ie(r, S, x, m / s);
	n.save();
	let B = 0;
	if (D) {
		n.font = M(P, ee, r.valAxisFontBold ?? !1, r.valAxisFontItalic ?? !1);
		let e = 0;
		for (let t of R.majorLines) e = Math.max(e, ve(n, he(r, t, !1)));
		B = e + 8;
	}
	let ce = D ? se(R.majorLines.map((e) => he(r, e, !1)), L(P)) / 2 : 0, de = Math.max(1, p - j.valBandW - B - p * .02) / y;
	n.font = M(I, te, r.catAxisFontBold ?? !1, r.catAxisFontItalic ?? !1);
	let me = _.slice(0, y).map((e) => F(n, be(e, r.catAxisFormatCode, r.date1904, r.catAxisFormatDivisors), Math.max(1, de - 8))), ge = 0;
	for (let e of me) e.some(Boolean) && (ge = Math.max(ge, e.length));
	let _e = r.catAxisHidden || ge === 0 ? 0 : ge * (I + 2) + 4, V = r.series[0], ye = w(V?.dataLabelOverrides), Ce = w(V?.dataPointOverrides), Ee = V?.chartexStyle, De = `#${V?.color ?? U(r, 0, 3, Ee)}`, Oe = `#${U(r, 1, 3, Ee)}`, Pe = `#${U(r, 2, 3, Ee)}`, Fe = Ue(r, 0, 3, Ee, V?.color), Re = Ue(r, 1, 3, Ee), ze = Ue(r, 2, 3, Ee), W = c(r, {
		chartType: "clusteredBar",
		series: [
			ke(r, "Increase", V, r.chartexDataPointStyle, 0, 3, De, !1, !0, !0),
			ke(r, "Decrease", V, r.chartexDataPointStyle, 1, 3, Oe, !1, !0, !0),
			ke(r, "Total", V, r.chartexDataPointStyle, 2, 3, Pe, !1, !0, !0)
		]
	}), G = Be(n, W, p, m, s), { legRightW: Ke, legLeftW: K, legTopH: qe, legBottomH: Je } = le(G, r.legendOverlay === !0), Ye = N(r, u, f, p, m, s, {
		titleBand: A,
		legendReserve: G,
		pad: {
			t: A.bandH + qe + P / 2 + 2 + ce,
			r: Ke + p * .02,
			b: Je + j.catBandH + _e,
			l: K + j.valBandW + (r.valAxisHidden ? p * .02 : Math.max(p * .03, B))
		},
		honorPlotAreaManualLayout: !0
	});
	Ve(n, r, u, f, p, m, f + Ye.title.topPad, Ye.title.fontPx);
	let { px0: q, py0: J, pw: Y, ph: X } = Ye.plotRect;
	if (Y <= 0 || X <= 0) return;
	pe(n, r, q, J, Y, X, s, l);
	let Xe = ie(r, S, x, X / s), Z = (e) => J + X - Xe.frac(e) * X, Q = t(r.valAxisLineColor, r.valAxisLineWidthEmu, s), Ze = t(r.catAxisLineColor, r.catAxisLineWidthEmu, s), Qe = oe(r, s);
	if (!r.valAxisHidden) {
		n.font = M(P, ee, r.valAxisFontBold ?? !1, r.valAxisFontItalic ?? !1), n.fillStyle = r.valAxisFontColor ? `#${r.valAxisFontColor}` : "#595959", n.textAlign = "right", n.textBaseline = "middle";
		let t = fe(r, s);
		for (let e of Xe.minorLines) ne(n, q, Y, Z(e), !1, t);
		for (let t of Xe.majorLines) {
			let i = Z(t);
			if (e(r)) {
				n.strokeStyle = Qe.color, n.lineWidth = Qe.width;
				let e = Qe.dash.length > 0 && n.getLineDash ? n.getLineDash() : [];
				Qe.dash.length > 0 && n.setLineDash(Qe.dash), n.beginPath(), n.moveTo(q, i), n.lineTo(q + Y, i), n.stroke(), Qe.dash.length > 0 && n.setLineDash(e);
			}
			D && O(n, he(r, t, !1), q - 4, i, L(P)), d(n, r.valAxisMajorTickMark, "val", q, i, Q.color, Q.width, !1, r.valAxisLineHidden, "major", s, r.valAxisLineDash);
		}
		for (let e of Xe.minorTicks) d(n, r.valAxisMinorTickMark, "val", q, Z(e), Q.color, Q.width, !1, r.valAxisLineHidden, "minor", s, r.valAxisLineDash);
	}
	let $e = !r.valAxisHidden && !r.valAxisLineHidden, et = !r.catAxisHidden && !r.catAxisLineHidden;
	$e && ue(n, q, J, q, J + X, Q.color, Q.width, r.valAxisLineDash), et && ue(n, q, J + X, q + Y, J + X, Ze.color, Ze.width, r.catAxisLineDash);
	let tt = Y / y, $ = tt / (1 + i(r.barGapWidth, "chartex") / 100);
	b.forEach((e, t) => {
		let i = q + tt * t + (tt - $) / 2, o = Math.min(Z(e.start), Z(e.end)), c = Math.max(Z(e.start), Z(e.end)), d = Math.max(1, c - o), x = e.semanticIndex, S = Ce.get(t), C = Ie(r, V, S, x, 3), w = S?.color ? `#${S.color}` : e.isSub ? Pe : e.isPos ? De : Oe, T = We(r, r.chartexDataPointStyle, "line", x, 3), E = xe(r, V, S, x, 3, T ? `#${T}` : w);
		if (e.paintSlot && h(n, a(S?.chartexStyle, V?.chartexStyle), r.chartexDataPointStyle, x, {
			x: i,
			y: o,
			w: $,
			h: d
		}, s, (e) => {
			C && we(e, C, {
				x: i,
				y: o,
				w: $,
				h: d
			}, w, s, l), !Ge(E) && Ne(e, E, s, {
				x: i,
				y: o,
				w: $,
				h: d
			}, l) && e.strokeRect(i, o, $, d);
		}), e.paintSlot && b[t + 1]?.paintSlot && t < y - 1 && r.chartexConnectorLines !== !1) {
			let a = q + tt * (t + 1) + (tt - $) / 2, l = e.isPos ? o : c;
			n.save();
			let u = [r.chartexSeriesLineStyle, r.chartexDataPointLineStyle], d = Te(r, Se(V, x), u, u, x, 3, "#000000", { linkedNoStyleFallback: !0 });
			Ne(n, d, s) && (d.widthEmu ?? (n.lineWidth = .75 * s), n.beginPath(), n.moveTo(i + $, l), n.lineTo(a, l), n.stroke()), n.restore();
		}
		let D = e.hasValue ? g[t] : 0, O = k(r, V, t, _[t] ?? "", D, {
			visible: r.showDataLabels,
			showVal: !0,
			showCatName: !1
		}, ye, !e.hasValue);
		if (O) {
			let e = V?.dataLabelColors?.[t] ?? O.fontColor ?? null, a = e ? `#${e}` : r.dataLabelFontColor ? `#${r.dataLabelFontColor}` : "#595959", c = ae(O.fontSizeHpt, s) ?? v(r.dataLabelFontSizeHpt, m, s), h = O.fontBold ?? r.dataLabelFontBold ?? !1, g = H(r, O.fontFace ?? r.dataLabelFontFace, "minor");
			n.font = `${O.textStyle.fontItalic ? "italic " : ""}${h ? "bold " : ""}${c}px ${g}`, He(n, O.text, {
				kind: "bar",
				rect: {
					x: i,
					y: o,
					w: $,
					h: d
				},
				orientation: "vertical",
				negative: D < 0,
				position: O.position ?? "outEnd"
			}, {
				x: q,
				y: J,
				w: Y,
				h: X
			}, c, a, O.manualLayout, {
				x: u,
				y: f,
				w: p,
				h: m
			}, je(r, O.richRuns, s, g, h, O.textStyle), void 0, O.textStyle, s, O.labelBox, l);
		}
	}), n.textAlign = "center", n.textBaseline = "top", n.fillStyle = r.catAxisFontColor ? `#${r.catAxisFontColor}` : "#595959", n.font = M(I, te, r.catAxisFontBold ?? !1, r.catAxisFontItalic ?? !1);
	let nt = J + X + 4;
	for (let e = 0; e < y && !r.catAxisHidden; e++) {
		let t = q + tt * e + tt / 2;
		(me[e] ?? []).forEach((e, r) => e && n.fillText(e, t, nt + r * (I + 2)));
	}
	E(n, r, u, f, p, m, q, J, Y, X, K, Je, j.catFontPx, j.valFontPx), Me(n, W, G, u, f, p, m, q, J, Y, X, A.bandH + 2, s, [
		Fe,
		Re,
		ze
	], l), n.restore();
}
function q(e, n, r, o, s) {
	let c = n.series[0]?.values ?? [], l = Math.max(c.length, n.categories.length);
	if (l === 0 || Le(e, r, l)) return;
	let u = 0;
	for (let e = 0; e < l; e++) u = Math.max(u, c[e] ?? 0);
	if (!(u > 0)) return;
	let { x: d, y: f, w: p, h: m } = r, g = Ae(e, n, p, m, o), _ = n.series[0], y = w(_?.dataLabelOverrides), b = `#${_?.color ?? U(n, 0, 1, _?.chartexStyle)}`, x = Ue(n, 0, 1, _?.chartexStyle, _?.color), S = {
		...n,
		series: [ke(n, _?.name ?? "", _, n.chartexDataPointStyle, 0, 1, b)]
	}, C = Be(e, S, p, m, o), { legRightW: T, legLeftW: E, legTopH: D, legBottomH: A } = le(C, n.legendOverlay === !0), j = v(n.catAxisFontSizeHpt, m, o);
	e.save(), e.font = M(j, H(n, n.catAxisFontFace, "minor"), n.catAxisFontBold ?? !1, n.catAxisFontItalic ?? !1);
	let P = 0;
	if (!n.catAxisHidden) {
		for (let t = 0; t < Math.min(l, n.categories.length); t++) P = Math.max(P, ve(e, n.categories[t]));
		n.categories.length > 0 && (P += 10);
	}
	let F = N(n, d, f, p, m, o, {
		titleBand: g,
		legendReserve: C,
		pad: {
			t: g.bandH + D + 2,
			r: T + p * .02,
			b: A + m * .02,
			l: E + P + p * .02
		},
		honorPlotAreaManualLayout: !0
	});
	Ve(e, n, d, f, p, m, f + F.title.topPad, F.title.fontPx);
	let { px0: I, py0: ee, pw: te, ph: R } = F.plotRect;
	if (te <= 0 || R <= 0) return;
	pe(e, n, I, ee, te, R, o, s);
	let ne = R / l, z = ne / (1 + i(n.barGapWidth, "chartex") / 100), re = w(_?.dataPointOverrides);
	for (let t = 0; t < l; t++) {
		let r = Math.max(0, c[t] ?? 0), i = te * r / u, l = I + (te - i) / 2, g = ee + ne * t + (ne - z) / 2, x = re.get(t), S = Ie(n, _, x, 0, 1), C = xe(n, _, x, 0, 1, b), w = (e) => {
			S && i > 0 ? we(e, S, {
				x: l,
				y: g,
				w: i,
				h: z
			}, b, o, s) : S && (e.fillStyle = W(e, S, l, g, i, z, b, s), e.fillRect(l, g, i, z)), Ne(e, C, o, i > 0 ? {
				x: l,
				y: g,
				w: i,
				h: z
			} : void 0, s) && e.strokeRect(l, g, i, z);
		};
		i > 0 ? h(e, a(x?.chartexStyle, _?.chartexStyle), n.chartexDataPointStyle, 0, {
			x: l,
			y: g,
			w: i,
			h: z
		}, o, w) : w(e);
		let T = n.categories[t];
		!n.catAxisHidden && T != null && (e.fillStyle = n.catAxisFontColor ? `#${n.catAxisFontColor}` : "#595959", e.textAlign = "right", e.textBaseline = "middle", O(e, T, I - 6, g + z / 2, L(j)));
		let E = k(n, _, t, T ?? "", r, {
			visible: !1,
			showVal: !1,
			showCatName: !1
		}, y);
		if (E) {
			let t = ae(E.fontSizeHpt, o) ?? v(n.dataLabelFontSizeHpt, m, o), r = H(n, E.fontFace ?? n.dataLabelFontFace, "minor");
			e.font = `${E.textStyle.fontItalic ? "italic " : ""}${E.fontBold ? "bold " : ""}${t}px ${r}`, He(e, E.text, {
				kind: "bar",
				rect: {
					x: l,
					y: g,
					w: i,
					h: z
				},
				orientation: "horizontal",
				negative: !1,
				position: E.position ?? "ctr"
			}, {
				x: I,
				y: ee,
				w: te,
				h: R
			}, t, E.fontColor ? `#${E.fontColor}` : "#ffffff", E.manualLayout, {
				x: d,
				y: f,
				w: p,
				h: m
			}, je(n, E.richRuns, o, r, E.fontBold ?? !1, E.textStyle), void 0, E.textStyle, o, E.labelBox, s);
		}
	}
	if (!n.catAxisHidden && !n.catAxisLineHidden) {
		let r = t(n.catAxisLineColor, n.catAxisLineWidthEmu, o);
		e.strokeStyle = r.color, e.lineWidth = r.width, e.beginPath(), e.moveTo(I, ee), e.lineTo(I, ee + R), e.stroke();
	}
	Me(e, S, C, d, f, p, m, I, ee, te, R, g.bandH + 2, o, [x], s), e.restore();
}
function J(e, t, r, i, a = 0) {
	let o = t.series[0];
	if (!o || Le(e, r, Math.max(t.categories.length, o.categories?.length ?? 0, o.values.length))) return;
	let s = l(o, t.categories, { sortDescending: t.chartexParetoSortDescending ?? !1 });
	if (s.points.length === 0) return;
	let u = n(o, 0), d = [t.chartexDataPointStyle, t.chartexDataPointLineStyle], f = Te(t, Se(o, u), d, d, u, 1, `#${U(t, u, 1, o.chartexStyle)}`, { linkedNoStyleFallback: !0 });
	Pe(e, c(t, {
		chartType: "line",
		categories: t.chartexParetoFlatEndpoint ? [...s.categories, ""] : s.categories,
		series: [{
			...s.series,
			values: t.chartexParetoFlatEndpoint ? [...s.series.values, 1] : s.series.values,
			showMarker: !1,
			lineHidden: !f.visible,
			lineColor: f.color.replace(/^#/, ""),
			lineWidthEmu: f.widthEmu ?? 9525,
			chartexStyle: {
				lineDash: f.dash,
				lineCap: f.cap,
				lineJoin: f.join
			}
		}],
		catAxisHidden: !1,
		catAxisTickLabelPos: t.chartexParetoSortDescending == null || !(o.categories ?? t.categories).some((e) => e != null && e !== "") ? "none" : "nextTo",
		showLegend: !1,
		valMin: t.valMin ?? 0,
		valMax: t.valMax ?? (t.valAxisFormatCode === "0%" ? 1 : 1.2),
		valAxisMajorUnit: t.valAxisMajorUnit ?? (t.valAxisFormatCode === "0%" ? .1 : .2)
	}), r, i, a);
}
function Y(e) {
	return {
		min: e.secondaryValAxis?.min ?? 0,
		max: e.secondaryValAxis?.max ?? 1,
		title: e.secondaryValAxis?.title ?? null,
		hidden: e.secondaryValAxis?.hidden ?? !1,
		formatCode: e.secondaryValAxis?.formatCode ?? "0%",
		formatDivisors: e.secondaryValAxis?.formatCode == null ? null : e.secondaryValAxis.formatDivisors,
		fontColor: e.secondaryValAxis?.fontColor ?? null,
		fontSizeHpt: e.secondaryValAxis?.fontSizeHpt ?? null,
		fontFace: e.secondaryValAxis?.fontFace ?? null,
		lineColor: e.secondaryValAxis?.lineColor ?? null,
		lineWidthEmu: e.secondaryValAxis?.lineWidthEmu ?? null,
		lineHidden: e.secondaryValAxis?.lineHidden ?? !1,
		majorTickMark: e.secondaryValAxis?.majorTickMark ?? "out",
		minorTickMark: e.secondaryValAxis?.minorTickMark ?? null,
		majorUnit: e.secondaryValAxis?.majorUnit ?? null,
		minorUnit: e.secondaryValAxis?.minorUnit ?? null,
		titleFontSizeHpt: e.secondaryValAxis?.titleFontSizeHpt ?? null,
		titleFontBold: e.secondaryValAxis?.titleFontBold ?? null,
		titleFontColor: e.secondaryValAxis?.titleFontColor ?? null,
		titleFontFace: e.secondaryValAxis?.titleFontFace ?? null
	};
}
function X(e, t, n, r, i = 0) {
	let a = t.series.filter((e) => e.seriesType !== "line"), o = t.chartexParetoOwnerIndex ?? 0, s = a[o];
	if (!s || a.length === 0 || Le(e, n, Math.max(t.categories.length, ...a.map((e) => e.values.length)))) return;
	let u = a.map((e, n) => l(n === 0 ? K(t, e, n, a.length) : e, t.categories, {
		sortDescending: t.chartexParetoSortDescending ?? !0,
		keepUnvaluedCategories: !0
	})), d = u[o], f = u[0];
	if (d.points.length === 0 || f.points.length === 0) return;
	let p = t.chartexParetoFlatEndpoint === !0 && f.categories.length === f.points.length, m = t.series.find((e) => e.seriesType === "line"), h = m?.chartexFormatIdx ?? s.chartexFormatIdx ?? 0, g = {
		...m ?? d.series,
		name: m?.name || "Cumulative %",
		values: d.series.values,
		categories: f.categories,
		color: m?.color ?? We(t, t.chartexDataPointLineStyle, "line", h, 1) ?? s.lineColor ?? s.color,
		seriesType: "line",
		useSecondaryAxis: !0,
		showMarker: !1
	}, _ = Y(t);
	ze(e, c(t, {
		chartType: "clusteredBar",
		categories: p ? [...f.categories, ""] : f.categories,
		series: [...u.map((e) => ({
			...e.orderedSeries,
			values: p ? [...e.orderedSeries.values, null] : e.orderedSeries.values,
			seriesType: null,
			useSecondaryAxis: !1
		})), p ? {
			...g,
			values: [...g.values, 1]
		} : g],
		secondaryValAxis: _
	}), n, r, {
		gapPolicy: "chartex",
		semanticLineNoStyleFallback: !0
	}, i);
}
var Xe = 7, Z = .05, Q = 1.2;
function Ze(e, t, n, r) {
	let i = (r ?? t) - (n ?? e);
	if (!(i > 0) || !Number.isFinite(i)) return null;
	let a = m(i, Xe);
	if (!(a > 0) || !Number.isFinite(a)) return null;
	let o = e - i * Z, s = t + i * Z;
	e >= 0 && (e === 0 || t > Q * e) && (o = 0), t <= 0 && (t === 0 || Math.abs(e) > Q * Math.abs(t)) && (s = 0);
	let c = n ?? Math.floor(o / a) * a, l = r ?? Math.ceil(s / a) * a;
	return ![c, l].every(Number.isFinite) || !(l > c) ? null : {
		min: c,
		max: l,
		majorUnit: a
	};
}
function Qe(e, r, o, s, c) {
	let l = 3 * s, f = r.chartexBox;
	if (!f || f.categories.length === 0 || f.series.length === 0) return;
	let { x: p, y: m, w: _, h: y } = o;
	if (Le(e, o, x(f.series.map((e) => e.valuesByCategory), 1e4))) return;
	let b = () => {
		e.fillStyle = "#888", e.font = "12px sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.fillText("(chart values out of range)", p + _ / 2, m + y / 2);
	}, S = (e) => {
		let t = e.max - e.min, n = t / e.step;
		return Number.isFinite(e.min) && Number.isFinite(e.max) && Number.isFinite(e.step) && Number.isFinite(t) && Number.isFinite(n) && e.max > e.min && e.step > 0 && n <= 1e3 && e.min + e.step > e.min;
	}, w = Infinity, k = -Infinity;
	for (let e of f.series) for (let t of e.valuesByCategory) for (let e of t) Number.isFinite(e) && (e < w && (w = e), e > k && (k = e));
	if (!isFinite(w) || !isFinite(k)) return;
	if (!Number.isFinite(k - w)) {
		b();
		return;
	}
	let A = r.valAxisMajorUnit == null ? Ze(w, k, r.valMin, r.valMax) : null, j = A ? {
		...r,
		valMin: A.min,
		valMax: A.max,
		valAxisMajorUnit: A.majorUnit
	} : r, P = H(r, r.valAxisFontFace, "minor"), F = v(r.valAxisFontSizeHpt, y, s), te = ee(F), R = Oe(s), z = g({
		dataMin: w,
		dataMax: k,
		explicitMin: j.valMin,
		explicitMax: j.valMax,
		axisLenPt: y / s,
		majorUnit: j.valAxisMajorUnit
	});
	if (!S({
		min: z.min,
		max: z.max,
		step: z.majorUnit
	})) {
		b();
		return;
	}
	let ae = 0;
	if (!r.valAxisHidden) {
		let t = e.font;
		e.font = M(F, P, r.valAxisFontBold ?? !1, r.valAxisFontItalic ?? !1);
		let n = 0;
		for (let t of z.majorTicks) {
			let i = he(r, t, !1);
			n = Math.max(n, ve(e, i));
		}
		e.font = t, ae = n + te + ce * s;
	}
	let B = Ae(e, r, _, y, s), de = v(r.catAxisFontSizeHpt, y, s), ge = v(r.valAxisFontSizeHpt, y, s), _e = re(r, _, y, s), V = f.series.length, ye = f.series.map((e, t) => n(e, t)), be = f.series.map((e, t) => {
		let n = ye[t], i = e.color ?? U(r, n, V, e.chartexStyle), a = ke(r, e.name, Se(e, n) ?? e, r.chartexDataPointStyle, n, V, i, !0), o = Ce(r, e, n, V, i);
		return o.darkened && a.lineColor != null ? {
			...a,
			lineColor: o.line.color.replace(/^#/, "")
		} : a;
	}), xe = {
		...r,
		series: be
	}, Te = Be(e, xe, _, y, s), { legRightW: De, legLeftW: je, legTopH: Pe, legBottomH: Ie } = le(Te, r.legendOverlay === !0), ze = r.valAxisHidden ? 0 : se(z.majorTicks.map((e) => he(r, e, !1)), L(F)) / 2, He = r.catAxisHidden ? 0 : se(f.categories, L(de)), Ge = N(r, p, m, _, y, s, {
		titleBand: B,
		legendReserve: Te,
		pad: {
			t: B.bandH + Pe + ge / 2 + 2 + ze,
			r: De + _ * .02,
			b: Ie + _e.catBandH + (r.catAxisHidden ? y * .02 : I(de) + He),
			l: je + _e.valBandW + (r.valAxisHidden ? _ * .02 : ae)
		},
		honorPlotAreaManualLayout: !0
	}), { px0: W, py0: G, pw: Ke, ph: K } = Ge.plotRect;
	if (Ke <= 0 || K <= 0) {
		Ve(e, r, p, m, _, y, m + Ge.title.topPad, Ge.title.fontPx);
		return;
	}
	pe(e, r, W, G, Ke, K, s, c);
	let qe = f.categories, Je = qe.length, Ye = ie(j, w, k, K / s);
	if (!S(Ye)) {
		b();
		return;
	}
	Ve(e, r, p, m, _, y, m + Ge.title.topPad, Ge.title.fontPx);
	let { min: q, max: J } = Ye, Y = J - q, X = (e) => G + K * (1 - (e - q) / Y), Xe = t(r.valAxisLineColor, r.valAxisLineWidthEmu, s), Z = oe(r, s);
	if (e.save(), !r.valAxisHidden) {
		if (e.font = M(F, P, r.valAxisFontBold ?? !1, r.valAxisFontItalic ?? !1), e.textAlign = "right", e.textBaseline = "middle", r.valAxisMinorGridlines) {
			let t = fe(r, s);
			for (let n of Ye.minorLines) ne(e, W, Ke, X(n), !1, t);
		}
		for (let t of Ye.majorLines) {
			let n = X(t);
			if (r.valAxisMajorGridlines !== !1) {
				e.strokeStyle = Z.color, e.lineWidth = Z.width;
				let t = Z.dash.length > 0 && e.getLineDash ? e.getLineDash() : [];
				Z.dash.length > 0 && e.setLineDash(Z.dash), e.beginPath(), e.moveTo(W, n), e.lineTo(W + Ke, n), e.stroke(), Z.dash.length > 0 && e.setLineDash(t);
			}
			e.fillStyle = r.valAxisFontColor ? `#${r.valAxisFontColor}` : "#595959", O(e, he(r, t, !1), W - R, n, L(F)), d(e, r.valAxisMajorTickMark, "val", W, n, Xe.color, Xe.width, !1, r.valAxisLineHidden, "major", s, r.valAxisLineDash);
		}
		for (let t of Ye.minorTicks) d(e, r.valAxisMinorTickMark, "val", W, X(t), Xe.color, Xe.width, !1, r.valAxisLineHidden, "minor", s, r.valAxisLineDash);
		r.valAxisLineHidden || ue(e, W, G, W, G + K, Xe.color, Xe.width, r.valAxisLineDash);
	}
	let Q = t(r.catAxisLineColor, r.catAxisLineWidthEmu, s);
	!r.catAxisHidden && !r.catAxisLineHidden && ue(e, W, G + K, W + Ke, G + K, Q.color, Q.width, r.catAxisLineDash);
	let Qe = Ke / Je, $e = i(r.barGapWidth, "chartex"), et = (e) => `#${f.series[e].color ?? U(r, ye[e], V, f.series[e].chartexStyle)}`, tt = (e) => Ue(r, ye[e], V, f.series[e].chartexStyle, f.series[e].color), $ = f.series.map((e) => e.valuesByCategory.map((t) => T(t, e.quartileMethod))), nt = r.chartStyleMarkerSymbol ?? r.chartexMarkerSymbol ?? "circle", rt = f.series.map((e, t) => nt === "none" ? $[t].map(() => []) : u($[t], e.showNonoutliers, e.showOutliers, X, 3 * s)), it = (e, t) => {
		let n = C(W, Ke, f.oneBoxPerSeries ? 1 : Je, V, f.oneBoxPerSeries ? 0 : e, t, $e);
		return n ? {
			bx: n.boxX,
			boxW: n.boxWidth,
			cx: n.centerX
		} : {
			bx: W,
			boxW: 0,
			cx: W
		};
	}, at = (t, n) => {
		let i = f.series[t], o = $[t][n];
		if (!o) return;
		let { bx: u, boxW: d, cx: p } = it(n, t), m = et(t), g = tt(t), _ = r.chartexDataPointStyle, v = r.chartexDataPointMarkerStyle ?? _, y = ye[t], b = Se(i, y) ?? i, x = We(r, _, "line", y, V), S = b.lineColor ? `#${b.lineColor}` : x ? `#${x}` : m, C = Ce(r, i, y, V, S).line, w = We(r, v, "fill", y, V), T = Ee(r, y, V, i.chartexStyle, i.color, v), E = Fe(r, v, b, y, V, We(r, v, "line", y, V) ?? S, { linkedNoStyleFallback: !0 }), O = a(i.chartexStyle), k = X(o.q1), A = X(o.q3), j = Math.min(k, A), M = Math.max(1, Math.abs(k - A)), N = d * .4;
		if (Ne(e, C, s)) {
			let t = X(o.whiskerHi), n = X(o.whiskerLo);
			e.beginPath(), o.whiskerHi > o.q3 && (e.moveTo(p, t), e.lineTo(p, A)), o.whiskerLo < o.q1 && (e.moveTo(p, k), e.lineTo(p, n)), o.whiskerHi >= o.q3 && (e.moveTo(p - N / 2, t), e.lineTo(p + N / 2, t)), o.whiskerLo <= o.q1 && (e.moveTo(p - N / 2, n), e.lineTo(p + N / 2, n)), e.stroke();
		}
		h(e, i.chartexStyle, _, y, {
			x: u,
			y: j,
			w: d,
			h: M
		}, s, (e) => {
			if (g && we(e, g, {
				x: u,
				y: j,
				w: d,
				h: M
			}, m, s, c), Ne(e, C, s, {
				x: u,
				y: j,
				w: d,
				h: M
			}, c)) {
				let t = e.lineWidth;
				e.strokeRect(u + t / 2, j + t / 2, d - t, M - t);
			}
		});
		let P = X(o.median);
		Ne(e, C, s) && (e.beginPath(), e.moveTo(u, P), e.lineTo(u + d, P), e.stroke());
		for (let r of rt[t][n]) Re(e, p, X(r), nt, 3, T ? w ? `#${w}` : m : "transparent", E.visible ? E.color : null, s, E.widthEmu == null ? 1 : D(E.widthEmu, s), T, c, E.visible ? E.paint : null, E.dash, E.customDash, E.cap, E.join, !1, O, v, y, y);
		if (i.meanMarker) {
			let t = X(o.mean), n = l;
			Ne(e, C, s) && (e.beginPath(), e.moveTo(p - n, t - n), e.lineTo(p + n, t + n), e.moveTo(p + n, t - n), e.lineTo(p - n, t + n), e.stroke());
		}
	}, ot = (t) => {
		let n = f.series[t];
		if (!n.meanLine) return;
		let i = Ce(r, n, ye[t], V, et(t)).line;
		if (e.save(), Ne(e, i, s)) {
			let n = !1;
			e.beginPath();
			for (let r = 0; r < Je; r++) {
				let i = $[t][r];
				if (!i) {
					n = !1;
					continue;
				}
				let { cx: a } = it(r, t), o = X(i.mean);
				n ? e.lineTo(a, o) : e.moveTo(a, o), n = !0;
			}
			e.stroke();
		}
		e.restore();
	};
	for (let e = 0; e < V; e++) {
		for (let t = 0; t < Je; t++) at(e, t);
		ot(e);
	}
	let st = v(r.catAxisFontSizeHpt, y, s), ct = me(st);
	for (let t = 0; t < Je; t++) {
		let n = W + Qe * (t + .5);
		if (r.catAxisHidden || d(e, r.catAxisMajorTickMark, "cat", G + K, n, Q.color, Q.width, !1, r.catAxisLineHidden, "major", s, r.catAxisLineDash), !r.catAxisHidden) {
			e.font = M(st, H(r, r.catAxisFontFace, "minor"), r.catAxisFontBold ?? !1, r.catAxisFontItalic ?? !1), e.fillStyle = r.catAxisFontColor ? `#${r.catAxisFontColor}` : "#595959", e.textAlign = "center", e.textBaseline = "top";
			let i = qe[t];
			O(e, i, n, G + K + ct, L(st));
		}
	}
	e.restore(), E(e, r, p, m, _, y, W, G, Ke, K, je, Ie, _e.catFontPx, _e.valFontPx), Me(e, xe, Te, p, m, _, y, W, G, Ke, K, B.bandH + 2, s, f.series.map((e, t) => tt(t)), c);
}
var $e = .18;
function et(e, t, n, i, s) {
	let l = t.chartexSunburst;
	if (!l || l.rows.length === 0) return;
	let { x: u, y: d, w: f, h: p } = n;
	if (_e(l.rows)) {
		Le(e, n, B + 1);
		return;
	}
	let m = r(l.rows);
	if (m.layoutWeight <= 0 || m.children.length === 0) return;
	let g = t.series[0], _ = w(g?.dataLabelOverrides), v = m.children.map((e, n) => Ue(t, n, m.children.length, g?.chartexStyle, g?.color)), y = c(t, {
		chartType: "clusteredBar",
		series: m.children.map((e) => {
			let n = U(t, e.branchIndex, m.children.length, g?.chartexStyle);
			return ke(t, e.label, g, t.chartexDataPointStyle, e.branchIndex, m.children.length, n, !1, !1);
		})
	}), x = Be(e, y, f, p, i), S = N(t, u, d, f, p, i, {
		titleTopPadFrac: .035,
		titleBottomPadFrac: .035,
		legendReserve: x,
		radialGapFrac: .02,
		honorPlotAreaManualLayout: !0
	});
	Ve(e, t, u, d, f, p, d + S.title.topPad, S.title.fontPx);
	let { px0: C, py0: T, pw: E, ph: D } = S.plotRect;
	if (!(E > 0) || !(D > 0)) return;
	pe(e, t, C, T, E, D, i, s);
	let O = C + E / 2, A = T + D / 2, j = Math.min(E, D) * .46;
	m.a0 = -Math.PI / 2, m.a1 = -Math.PI / 2 + Math.PI * 2, b(m);
	let M = o(m) + 1, P = j * $e, F = (j - P) / M, I = (e) => `#${U(t, e, m.children.length, g?.chartexStyle)}`, ee = w(g?.dataPointOverrides), L = g?.seriesDataLabels, te = H(t, L?.fontFace ?? t.dataLabelFontFace, "minor"), R = ae(L?.fontSizeHpt, i) ?? Math.max(7, Math.min(13, j * .075)), ne = L?.fontColor ? `#${L.fontColor}` : "#ffffff", z = Array.from({ length: M }, () => []), re = [m];
	for (; re.length > 0;) {
		let e = re.pop();
		e.depth >= 0 && z[e.depth].push(e);
		for (let t = e.children.length - 1; t >= 0; t--) re.push(e.children[t]);
	}
	e.save();
	for (let n = 0; n < M; n++) {
		let r = P + n * F, o = r + F;
		for (let c of z[n]) {
			let n = c.a1 - c.a0;
			if (n <= 1e-4) continue;
			let l = ee.get(c.labelIndex), v = Ie(t, g, l, c.branchIndex, m.children.length), y = xe(t, g, l, c.branchIndex, m.children.length, "#ffffff"), b = {
				x: O - o,
				y: A - o,
				w: o * 2,
				h: o * 2
			};
			h(e, a(l?.chartexStyle, g?.chartexStyle), t.chartexDataPointStyle, g?.chartexFormatIdx ?? 0, b, i, (e) => {
				e.beginPath(), e.arc(O, A, o, c.a0, c.a1), e.arc(O, A, r, c.a1, c.a0, !0), e.closePath(), v && De(e, v, b, I(c.branchIndex), i, s), Ne(e, y, i, b, s) && e.stroke();
			}, c.branchIndex);
			let x = k(t, g, c.labelIndex, c.label, c.value, {
				visible: !1,
				showVal: !1,
				showCatName: !1
			}, _);
			if (!x) continue;
			let S = x.text, w = ae(x.fontSizeHpt, i) ?? R, j = x.fontColor ? `#${x.fontColor}` : ne, M = x.fontFace ? H(t, x.fontFace, "minor") : te, N = (c.a0 + c.a1) / 2, P = (r + o) / 2, L = F - 4, z = n * P;
			if (!x.manualLayout && L < w * .9 && z < w * .9) continue;
			let re = O + Math.cos(N) * P, ie = A + Math.sin(N) * P;
			if (e.font = `${x.textStyle.fontItalic ? "italic " : ""}${x.fontBold ? "bold " : ""}${w}px ${M}`, x.manualLayout) {
				He(e, S, {
					kind: "point",
					x: re,
					y: ie,
					position: x.position ?? "ctr"
				}, {
					x: C,
					y: T,
					w: E,
					h: D
				}, w, j, x.manualLayout, {
					x: u,
					y: d,
					w: f,
					h: p
				}, je(t, x.richRuns, i, M, x.fontBold ?? !1, x.textStyle), void 0, x.textStyle, i, x.labelBox, s);
				continue;
			}
			e.save(), e.translate(re, ie);
			let B = N, oe = B * 180 / Math.PI % 360;
			(oe > 90 || oe < -90) && (B += Math.PI), e.rotate(B), e.font = `${x.textStyle.fontItalic ? "italic " : ""}${x.fontBold ? "bold " : ""}${w}px ${M}`, He(e, S, {
				kind: "point",
				x: 0,
				y: 0,
				position: x.position ?? "ctr"
			}, {
				x: -L / 2,
				y: -z / 2,
				w: L,
				h: z
			}, w, j, void 0, {
				x: -L / 2,
				y: -z / 2,
				w: L,
				h: z
			}, je(t, x.richRuns, i, M, x.fontBold ?? !1, x.textStyle), void 0, x.textStyle, i, x.labelBox, s), e.restore();
		}
	}
	e.restore(), Me(e, y, x, u, d, f, p, C, T, E, D, S.title.bandH + 2, i, v, s);
}
function tt(e, t) {
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
function $(e, t, n, i, o) {
	let s = t.chartexTreemap;
	if (!s || s.rows.length === 0) return;
	if (_e(s.rows)) {
		Le(e, n, B + 1);
		return;
	}
	let l = r(s.rows, !0);
	if (l.layoutWeight <= 0 || l.children.length === 0) return;
	let u = t.series[0], d = l.children.map((e) => Ue(t, e.branchIndex, l.children.length, u?.chartexStyle, u?.color)), f = c(t, {
		chartType: "clusteredBar",
		series: l.children.map((e) => {
			let n = U(t, e.branchIndex, l.children.length, u?.chartexStyle);
			return ke(t, e.label, u, t.chartexDataPointStyle, e.branchIndex, l.children.length, n);
		})
	}), p = Be(e, f, n.w, n.h, i), m = N(t, n.x, n.y, n.w, n.h, i, {
		titleTopPadFrac: .035,
		titleBottomPadFrac: .035,
		legendReserve: p,
		radialGapFrac: .015,
		honorPlotAreaManualLayout: !0
	});
	Ve(e, t, n.x, n.y, n.w, n.h, n.y + m.title.topPad, m.title.fontPx);
	let { px0: g, py0: _, pw: v, ph: y } = m.plotRect;
	if (!(v > 0) || !(y > 0)) return;
	pe(e, t, g, _, v, y, i, o);
	let b = {
		x: g,
		y: _,
		w: v,
		h: y
	}, x = s.parentLabelLayout ?? "overlapping", S = t.series[0]?.seriesDataLabels, C = H(t, S?.fontFace ?? t.dataLabelFontFace, "minor"), T = ae(S?.fontSizeHpt, i) ?? Math.max(8, Math.min(13, m.plotRect.ph * .025)), E = S?.fontColor ? `#${S.fontColor}` : "#ffffff", D = new Map((t.series[0]?.dataLabelOverrides ?? []).map((e) => [e.idx, e])), O = t.chartBg ? t.chartBg.startsWith("#") ? t.chartBg : `#${t.chartBg}` : "#ffffff", A = w(u?.dataPointOverrides), j = (r, s) => {
		if (s.w < .5 || s.h < .5) return;
		let c = `#${U(t, r.branchIndex, l.children.length, u?.chartexStyle)}`, d = A.get(r.labelIndex), f = Ie(t, u, d, r.branchIndex, l.children.length), p = a(d?.chartexStyle, u?.chartexStyle), m = D.get(r.labelIndex), g = m?.fontColor ? `#${m.fontColor}` : E, _ = ae(m?.fontSizeHpt, i) ?? T, v = m?.fontBold ?? S?.fontBold ?? !1;
		if (r.children.length > 0) {
			let a = k(t, u, r.labelIndex, r.label, r.value, {
				visible: x !== "none",
				showVal: !1,
				showCatName: !0
			}, D, !0), l = a != null && (x !== "overlapping" || r.depth === 0), d = _, y = a?.fontFace ? H(t, a.fontFace, "minor") : C, S = x === "banner" && l ? Math.min(s.h * .28, d + 7) : 0;
			S > 0 && h(e, p, t.chartexDataPointStyle, u?.chartexFormatIdx ?? 0, {
				x: s.x,
				y: s.y,
				w: s.w,
				h: S
			}, i, (e) => {
				f && we(e, f, {
					x: s.x,
					y: s.y,
					w: s.w,
					h: S
				}, c, i, o);
			}, r.branchIndex);
			let w = {
				x: s.x,
				y: s.y + S,
				w: s.w,
				h: Math.max(0, s.h - S)
			};
			for (let e of tt(r.children, w)) j(e.node, e.rect);
			if (l && (a.manualLayout || s.w > d * 2 && s.h > d + 4)) {
				e.font = `${v ? "bold " : ""}${d}px ${y}`;
				let r = S > 0 ? {
					x: s.x,
					y: s.y,
					w: s.w,
					h: S
				} : s, c = m?.position ?? "inBase";
				He(e, a.text, a.manualLayout ? {
					kind: "point",
					x: s.x + s.w / 2,
					y: s.y + s.h / 2,
					position: c
				} : {
					kind: "box",
					rect: r,
					position: c
				}, a.manualLayout ? b : r, d, g, a.manualLayout, n, je(t, a.richRuns, i, y, v, a.textStyle), void 0, a.textStyle, i, a.labelBox, o);
			}
			return;
		}
		h(e, p, t.chartexDataPointStyle, u?.chartexFormatIdx ?? 0, s, i, (e) => {
			f && we(e, f, s, c, i, o), Ne(e, xe(t, u, d, r.branchIndex, l.children.length, O, t.chartexDataPointStyle, { linkedNoStyleFallback: !0 }), i, s, o) && e.strokeRect(s.x, s.y, s.w, s.h);
		}, r.branchIndex);
		let y = k(t, u, r.labelIndex, r.label, r.value, {
			visible: !1,
			showVal: !1,
			showCatName: !1
		}, D);
		if (!y) return;
		let w = ae(y.fontSizeHpt, i) ?? _;
		if (!y.manualLayout && (s.w <= w * 1.2 || s.h <= w * 1.2)) return;
		let M = y.fontFace ? H(t, y.fontFace, "minor") : C;
		e.font = `${y.fontBold ? "bold " : ""}${w}px ${M}`;
		let N = s, P = y.position === "outEnd" ? "inEnd" : y.position ?? "ctr";
		He(e, y.text, y.manualLayout ? {
			kind: "point",
			x: s.x + s.w / 2,
			y: s.y + s.h / 2,
			position: P
		} : {
			kind: "box",
			rect: N,
			position: P
		}, y.manualLayout ? b : N, w, y.fontColor ? `#${y.fontColor}` : g, y.manualLayout, n, je(t, y.richRuns, i, M, y.fontBold ?? !1, y.textStyle), void 0, y.textStyle, i, y.labelBox, o);
	};
	e.save(), e.beginPath(), e.rect(g, _, v, y), e.clip();
	for (let e of tt(l.children, {
		x: g,
		y: _,
		w: v,
		h: y
	})) j(e.node, e.rect);
	e.restore(), Me(e, f, p, n.x, n.y, n.w, n.h, g, _, v, y, m.title.bandH + 2, i, d, o);
}
function nt(e, t, n, r, i = 0) {
	let a = Ke(t, void 0, n, r), o = qe(t, n, r);
	if (a != null && a > 1048576 || o != null && o > 1048576 || a != null && o != null && a > 1048576 - o) return Le(e, n, B + 1), !0;
	if (t.chartexSuppressGeometry) {
		let i = Ae(e, t, n.w, n.h, r);
		return Ve(e, t, n.x, n.y, n.w, n.h, n.y + i.topPad, i.fontPx), !0;
	}
	switch (t.chartType) {
		case "waterfall": return Ye(e, t, n, r, i), !0;
		case "clusteredColumn": {
			let a = t.series.map((e, n) => n === 0 ? K(t, e, n, t.series.length) : e), o = t.chartexParetoSortDescending ? a.map((e) => l(e, t.categories, {
				sortDescending: !0,
				keepUnvaluedCategories: !0
			}).orderedSeries) : a, s = t.chartexShowUnpairedPercentageAxis && o[0] ? [{
				...o[0],
				name: "",
				values: [],
				seriesType: "line",
				useSecondaryAxis: !0,
				lineHidden: !0,
				showMarker: !1
			}] : [];
			return ze(e, c(t, {
				chartType: "clusteredBar",
				categories: o[0]?.categories ?? t.categories,
				series: [...o, ...s],
				secondaryValAxis: s.length > 0 ? Y(t) : t.secondaryValAxis
			}), n, r, { gapPolicy: "chartex" }, i), !0;
		}
		case "histogram": return Je(e, t, n, r, i), !0;
		case "funnel": return q(e, t, n, r, i), !0;
		case "paretoLine": return J(e, t, n, r, i), !0;
		case "pareto": return X(e, t, n, r, i), !0;
		case "boxWhisker": return Qe(e, t, n, r, i), !0;
		case "sunburst": return et(e, t, n, r, i), !0;
		case "treemap": return $(e, t, n, r, i), !0;
		default: return !1;
	}
}
var rt = G({ render: nt }, "chartEx");
export { rt as chartEx };
