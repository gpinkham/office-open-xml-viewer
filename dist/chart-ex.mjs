import { Bn as e, Bt as t, Cn as n, Dn as r, Dt as i, En as a, G as o, J as s, K as c, Li as l, Mr as u, Mt as d, Nt as f, O as p, Ot as m, Q as h, R as g, Rn as _, Rt as v, Si as y, Sn as b, Tn as x, U as S, Ui as C, Vn as w, X as T, Yt as E, Z as D, _i as ee, ai as O, an as k, bt as A, ct as j, di as M, ea as N, f as P, fi as F, in as te, ki as ne, m as re, mi as ie, nn as I, on as ae, p as L, pi as oe, q as se, qi as R, qt as ce, r as le, rn as ue, st as de, t as fe, tn as pe, un as me, wn as z, yi as he, yt as B, z as ge, zi as _e, zn as ve } from "./plot-area-frame-DvwuejI0.js";
import { C as ye, D as V, E as be, O as xe, S as Se, T as Ce, _ as we, a as Te, b as Ee, c as De, d as Oe, f as ke, g as Ae, h as H, i as je, k as Me, l as U, m as Ne, n as W, o as Pe, r as Fe, s as Ie, u as Le, v as Re, w as ze, x as Be, y as G } from "./renderer-VcLL4hOT.js";
import { t as K } from "./renderer-module-contract-CNi9alZl.js";
//#region packages/core/src/chart/chart-ex-renderer.ts
function Ve(e, t, n, r = 1) {
	let i = 0, a = Math.max(1, n?.w ?? 32 * r), o = Math.max(1, n?.h ?? 16 * r), s = ue(e, ({ label: n, linkedStyleIndex: s }) => {
		let c = n.labelBox, d = k(c), f = d ? e.chartStyleRoles?.dataLabelCallout ?? e.chartStyleRoles?.dataLabel : e.chartStyleRoles?.dataLabel, p = d ? N(e, "dataLabelCallout") ?? N(e, "dataLabel") : N(e, "dataLabel"), m = ae(c, f, p, f != null, 0, s)?.fillPaint, h = l(c?.style, p, 0), g = c?.borderHidden === !0 ? _e(p) : void 0, _ = c?.borderColor != null || c?.borderFill != null || h !== void 0 || g !== void 0 || c?.borderPaintAuthored === !0 && c?.borderHidden !== !0, v = h === void 0 ? g === void 0 ? c?.borderFill ?? (c?.borderColor ? {
			fillType: "solid",
			color: c.borderColor
		} : _ ? null : C(f, s)) : g : h;
		for (let e of [m, v]) {
			if (!e) continue;
			let n = e.fillType === "image" ? le(e, t, a, o, r) ?? 1048577 : u(e);
			if (e.fillType === "gradient" && n > 4096 || n > 1048576 - i) {
				i = E + 1;
				return;
			}
			i += n;
		}
	});
	return s === "not-hierarchy" ? null : s === "too-large" ? E + 1 : i;
}
function He(e, t, n, r) {
	if (!e.chartexParetoOutlineOwner) return t;
	let i = t.chartexFormatIdx ?? n, a = t.lineColor ?? H(e, i, r, t.chartexStyle);
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
function Ue(e, t, n = 1) {
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
	let r = 0, a = (e) => {
		if (!e || r > 1048576) return;
		let i = e.fillType === "image" ? le(e, void 0, Math.max(1, t.w), Math.max(1, t.h), n) : u(e);
		e.fillType === "gradient" && i > 4096 || i > 1048576 - r ? r = E + 1 : r += i;
	}, o = (t, n, r, i) => {
		let o = Me(e, t, n, r, i, "#000000", { linkedNoStyleFallback: !0 });
		o.visible && a(o.paint ?? {
			fillType: "solid",
			color: "000000"
		});
	}, s = (t, n, i, o) => {
		a(V(e, t, n, i, o));
		let s = xe(e, t, n, i, o, "#000000");
		if (s.visible && !G(s) && a(s.paint ?? {
			fillType: "solid",
			color: "000000"
		}), r > 1048576) return !1;
	}, c = (t, n) => {
		let r = [e.chartexDataPointStyle, e.chartexDataPointLineStyle];
		be(e, Be(t, n), r, r, n, 1, "#000000", { linkedNoStyleFallback: !0 }).visible && a({
			fillType: "solid",
			color: "000000"
		});
	}, l = P(e, (t, n, r) => n === 0 ? He(e, t, n, r) : t);
	if (l) {
		if (l.kind === "tooManyInputPoints") return E + 1;
		if (re(l, s), r > 1048576 || (L(l, s), r > 1048576)) return r;
		if (e.chartType === "pareto" && l.series.length > 0) {
			let t = e.chartexParetoOwnerIndex ?? 0, n = l.series[t], r = e.series.find((e) => e.seriesType === "line");
			c(r ?? n, r?.chartexFormatIdx ?? n?.chartexFormatIdx ?? 0);
		}
	} else if (e.chartType === "paretoLine") {
		let t = e.series[0];
		t && d(t, e.categories, { sortDescending: e.chartexParetoSortDescending ?? !1 }).points.length > 0 && c(t, i(t, 0));
	} else if (e.chartType === "waterfall") {
		let t = e.series[0], n = t?.values ?? [], r = m(t?.dataPointOverrides), i = pe(n, e.categories.length, e.subtotalIndices);
		if (i.cumulativeOverflow || i.rawMax <= i.rawMin) return 0;
		for (let n = 0; n < i.bars.length; n++) {
			let o = i.bars[n];
			if (!o.paintSlot) continue;
			let s = o.semanticIndex, c = r.get(n);
			a(V(e, t, c, s, 3));
			let l = xe(e, t, c, s, 3, "#000000");
			l.visible && !G(l) && a(l.paint ?? {
				fillType: "solid",
				color: "000000"
			});
		}
	} else if (e.chartType === "funnel") {
		let t = e.series[0], n = t?.values ?? [], r = Math.max(n.length, e.categories.length);
		if (n.some((e) => e != null && e > 0)) {
			let i = m(t?.dataPointOverrides);
			for (let o = 0; o < r; o++) {
				if (!((n[o] ?? 0) > 0)) continue;
				let r = i.get(o);
				a(V(e, t, r, 0, 1));
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
			let i = t.series[r], s = i.chartexFormatIdx ?? r, c = Ae(e, s, n, i.chartexStyle, i.color);
			for (let t of i.valuesByCategory) w(t, i.quartileMethod) && (a(c), o(e.chartexDataPointStyle, Be(i, s), s, n));
		}
	} else {
		let t = e.series[0], n = 1;
		I(e, ({ node: e }) => {
			n = Math.max(n, e.branchIndex + 1);
		});
		let r = m(t?.dataPointOverrides);
		if (I(e, ({ node: i, paintsBody: o }) => {
			if (!o) return;
			let s = r.get(i.labelIndex);
			a(V(e, t, s, i.branchIndex, n));
			let c = xe(e, t, s, i.branchIndex, n, "#000000", e.chartexDataPointStyle, { linkedNoStyleFallback: e.chartType === "treemap" });
			c.visible && a(c.paint ?? {
				fillType: "solid",
				color: "000000"
			});
		}) === "too-large") return E + 1;
	}
	return r;
}
function We(e, t, n, r, i = 0) {
	let a = t.series[0];
	if (!a) return;
	let o = f(a.values, t.chartexHistogramBinning ?? {}, a.valFormatCode, t.date1904 === !0);
	if (o.kind === "tooManyInputPoints") {
		Ie(e, n, ce + 1);
		return;
	}
	je(e, R(t, {
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
function q(e, n, i, l, u) {
	let { x: d, y: f, w: _, h: v } = i, y = n.series[0]?.values ?? [], b = n.categories, x = Math.max(y.length, b.length);
	if (x === 0 || Ie(e, i, x)) return;
	let { bars: C, rawMax: w, rawMin: E, cumulativeOverflow: O } = pe(y, b.length, n.subtotalIndices);
	if (O) {
		e.fillStyle = "#888", e.font = "12px sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.fillText("(chart values out of range)", d + _ / 2, f + v / 2);
		return;
	}
	if (w <= E) return;
	let k = n.subtotalIndices.length === 0 && C.every((e, t) => !e.hasValue || y[t] >= 0), A = !n.valAxisHidden && n.valAxisTickLabelPos !== "none" && !k, M = Pe(e, n, _, v, l), N = oe(n, _, v, l), P = p(n.valAxisFontSizeHpt, v, l), F = p(n.catAxisFontSizeHpt, v, l), re = j(n, n.valAxisFontFace, "minor"), I = j(n, n.catAxisFontFace, "minor"), ae = c(n, E, w, v / l);
	e.save();
	let L = 0;
	if (A) {
		e.font = de(P, re, n.valAxisFontBold ?? !1, n.valAxisFontItalic ?? !1);
		let t = 0;
		for (let r of ae.majorLines) t = Math.max(t, e.measureText(o(n, r, !1)).width);
		L = t + 8;
	}
	let ce = Math.max(1, _ - N.valBandW - L - _ * .02) / x;
	e.font = de(F, I, n.catAxisFontBold ?? !1, n.catAxisFontItalic ?? !1);
	let le = b.slice(0, x).map((t) => h(e, me(t, n.catAxisFormatCode, n.date1904), Math.max(1, ce - 8))), ue = 0;
	for (let e of le) e.some(Boolean) && (ue = Math.max(ue, e.length));
	let z = n.catAxisHidden || ue === 0 ? 0 : ue * (F + 2) + 4, B = n.series[0], _e = m(B?.dataLabelOverrides), ve = m(B?.dataPointOverrides), ye = B?.chartexStyle, Ce = `#${B?.color ?? H(n, 0, 3, ye)}`, we = `#${H(n, 1, 3, ye)}`, Ee = `#${H(n, 2, 3, ye)}`, ke = Ae(n, 0, 3, ye, B?.color), je = Ae(n, 1, 3, ye), Me = Ae(n, 2, 3, ye), W = R(n, {
		chartType: "clusteredBar",
		series: [
			Re(n, "Increase", B, n.chartexDataPointStyle, 0, 3, Ce, !1, !0, !0),
			Re(n, "Decrease", B, n.chartexDataPointStyle, 1, 3, we, !1, !0, !0),
			Re(n, "Total", B, n.chartexDataPointStyle, 2, 3, Ee, !1, !0, !0)
		]
	}), Fe = Oe(e, W, _, v, .22, l), { legRightW: K, legLeftW: Ve, legTopH: He, legBottomH: Ue } = ie(Fe, n.legendOverlay === !0), We = he(n, d, f, _, v, l, {
		titleBand: M,
		legendSideReserveFrac: 0,
		legendReserve: Fe,
		pad: {
			t: M.bandH + He + P / 2 + 2,
			r: K + _ * .02,
			b: Ue + N.catBandH + z,
			l: Ve + N.valBandW + (n.valAxisHidden ? _ * .02 : Math.max(_ * .03, L))
		},
		honorPlotAreaManualLayout: !0
	});
	Te(e, n, d, f, _, v, f + We.title.topPad, We.title.fontPx);
	let { px0: q, py0: J, pw: Y, ph: X } = We.plotRect;
	fe(e, n, q, J, Y, X, l, u);
	let Ge = c(n, E, w, X / l), Z = (e) => J + X - Ge.frac(e) * X, Ke = t(n.valAxisLineColor, n.valAxisLineWidthEmu, l), qe = t(n.catAxisLineColor, n.catAxisLineWidthEmu, l), Je = T(n, l);
	if (!n.valAxisHidden) {
		e.font = de(P, re, n.valAxisFontBold ?? !1, n.valAxisFontItalic ?? !1), e.fillStyle = n.valAxisFontColor ? `#${n.valAxisFontColor}` : "#595959", e.textAlign = "right", e.textBaseline = "middle";
		let t = D(n, l);
		for (let n of Ge.minorLines) s(e, q, Y, Z(n), !1, t);
		for (let t of Ge.majorLines) {
			let r = Z(t);
			if (S(n)) {
				e.strokeStyle = Je.color, e.lineWidth = Je.width;
				let t = Je.dash.length > 0 && e.getLineDash ? e.getLineDash() : [];
				Je.dash.length > 0 && e.setLineDash(Je.dash), e.beginPath(), e.moveTo(q, r), e.lineTo(q + Y, r), e.stroke(), Je.dash.length > 0 && e.setLineDash(t);
			}
			A && e.fillText(o(n, t, !1), q - 4, r), g(e, n.valAxisMajorTickMark, "val", q, r, Ke.color, Ke.width, !1, n.valAxisLineHidden, "major", l, n.valAxisLineDash);
		}
		for (let t of Ge.minorTicks) g(e, n.valAxisMinorTickMark, "val", q, Z(t), Ke.color, Ke.width, !1, n.valAxisLineHidden, "minor", l, n.valAxisLineDash);
	}
	let Ye = !n.valAxisHidden && !n.valAxisLineHidden, Xe = !n.catAxisHidden && !n.catAxisLineHidden;
	Ye && se(e, q, J, q, J + X, Ke.color, Ke.width, n.valAxisLineDash), Xe && se(e, q, J + X, q + Y, J + X, qe.color, qe.width, n.catAxisLineDash);
	let Q = Y / x, $ = Q / (1 + ne(n.barGapWidth, "chartex") / 100);
	C.forEach((t, i) => {
		let o = q + Q * i + (Q - $) / 2, s = Math.min(Z(t.start), Z(t.end)), c = Math.max(Z(t.start), Z(t.end)), m = Math.max(1, c - s), h = t.semanticIndex, g = ve.get(i), S = V(n, B, g, h, 3), w = g?.color ? `#${g.color}` : t.isSub ? Ee : t.isPos ? Ce : we, T = Se(n, n.chartexDataPointStyle, "line", h, 3), E = xe(n, B, g, h, 3, T ? `#${T}` : w);
		if (t.paintSlot && r(e, a(g?.chartexStyle, B?.chartexStyle), n.chartexDataPointStyle, h, {
			x: o,
			y: s,
			w: $,
			h: m
		}, l, (e) => {
			S && ze(e, S, {
				x: o,
				y: s,
				w: $,
				h: m
			}, w, l, u), !G(E) && Ne(e, E, l, {
				x: o,
				y: s,
				w: $,
				h: m
			}, u) && e.strokeRect(o, s, $, m);
		}), t.paintSlot && C[i + 1]?.paintSlot && i < x - 1 && n.chartexConnectorLines !== !1) {
			let r = q + Q * (i + 1) + (Q - $) / 2, a = t.isPos ? s : c;
			e.save();
			let u = [n.chartexSeriesLineStyle, n.chartexDataPointLineStyle], d = be(n, Be(B, h), u, u, h, 3, "#000000", { linkedNoStyleFallback: !0 });
			Ne(e, d, l) && (d.widthEmu ?? (e.lineWidth = .75 * l), e.beginPath(), e.moveTo(o + $, a), e.lineTo(r, a), e.stroke()), e.restore();
		}
		let D = t.hasValue ? y[i] : 0, O = te(n, B, i, b[i] ?? "", D, {
			visible: n.showDataLabels,
			showVal: !0,
			showCatName: !1
		}, _e, !t.hasValue);
		if (O) {
			let t = B?.dataLabelColors?.[i] ?? O.fontColor ?? null, r = t ? `#${t}` : n.dataLabelFontColor ? `#${n.dataLabelFontColor}` : "#595959", a = ee(O.fontSizeHpt, l) ?? p(n.dataLabelFontSizeHpt, v, l), c = O.fontBold ?? n.dataLabelFontBold ?? !1, h = j(n, O.fontFace ?? n.dataLabelFontFace, "minor");
			e.font = `${O.textStyle.fontItalic ? "italic " : ""}${c ? "bold " : ""}${a}px ${h}`, De(e, O.text, {
				kind: "bar",
				rect: {
					x: o,
					y: s,
					w: $,
					h: m
				},
				orientation: "vertical",
				negative: D < 0,
				position: O.position ?? "outEnd"
			}, {
				x: q,
				y: J,
				w: Y,
				h: X
			}, a, r, O.manualLayout, {
				x: d,
				y: f,
				w: _,
				h: v
			}, U(n, O.richRuns, l, h, c, O.textStyle), void 0, O.textStyle, l, O.labelBox, u);
		}
	}), e.textAlign = "center", e.textBaseline = "top", e.fillStyle = n.catAxisFontColor ? `#${n.catAxisFontColor}` : "#595959", e.font = de(F, I, n.catAxisFontBold ?? !1, n.catAxisFontItalic ?? !1);
	let Ze = J + X + 4;
	for (let t = 0; t < x && !n.catAxisHidden; t++) {
		let n = q + Q * t + Q / 2;
		(le[t] ?? []).forEach((t, r) => t && e.fillText(t, n, Ze + r * (F + 2)));
	}
	ge(e, n, d, f, _, v, q, J, Y, X, Ve, Ue, N.catFontPx, N.valFontPx), Le(e, W, Fe, d, f, _, v, q, J, Y, X, M.bandH + 2, l, [
		ke,
		je,
		Me
	], u), e.restore();
}
function J(e, n, i, o, s) {
	let c = n.series[0]?.values ?? [], l = Math.max(c.length, n.categories.length);
	if (l === 0 || Ie(e, i, l)) return;
	let u = 0;
	for (let e = 0; e < l; e++) u = Math.max(u, c[e] ?? 0);
	if (!(u > 0)) return;
	let { x: d, y: f, w: h, h: g } = i, _ = Pe(e, n, h, g, o), v = n.series[0], y = m(v?.dataLabelOverrides), b = `#${v?.color ?? H(n, 0, 1, v?.chartexStyle)}`, x = Ae(n, 0, 1, v?.chartexStyle, v?.color), S = {
		...n,
		series: [Re(n, v?.name ?? "", v, n.chartexDataPointStyle, 0, 1, b)]
	}, C = Oe(e, S, h, g, .22, o), { legRightW: w, legLeftW: T, legTopH: E, legBottomH: D } = ie(C, n.legendOverlay === !0), O = p(n.catAxisFontSizeHpt, g, o);
	e.save(), e.font = de(O, j(n, n.catAxisFontFace, "minor"), n.catAxisFontBold ?? !1, n.catAxisFontItalic ?? !1);
	let k = 0;
	if (!n.catAxisHidden) {
		for (let t = 0; t < Math.min(l, n.categories.length); t++) k = Math.max(k, e.measureText(n.categories[t]).width);
		n.categories.length > 0 && (k += 10);
	}
	let A = he(n, d, f, h, g, o, {
		titleBand: _,
		legendSideReserveFrac: .22,
		legendReserve: C,
		pad: {
			t: _.bandH + E + 2,
			r: w + h * .02,
			b: D + g * .02,
			l: T + k + h * .02
		},
		honorPlotAreaManualLayout: !0
	});
	Te(e, n, d, f, h, g, f + A.title.topPad, A.title.fontPx);
	let { px0: M, py0: N, pw: P, ph: F } = A.plotRect;
	fe(e, n, M, N, P, F, o, s);
	let re = F / l, I = re / (1 + ne(n.barGapWidth, "chartex") / 100), ae = m(v?.dataPointOverrides);
	for (let t = 0; t < l; t++) {
		let i = Math.max(0, c[t] ?? 0), l = P * i / u, m = M + (P - l) / 2, _ = N + re * t + (re - I) / 2, x = ae.get(t), S = V(n, v, x, 0, 1), C = xe(n, v, x, 0, 1, b), w = (e) => {
			S && l > 0 ? ze(e, S, {
				x: m,
				y: _,
				w: l,
				h: I
			}, b, o, s) : S && (e.fillStyle = we(e, S, m, _, l, I, b, s), e.fillRect(m, _, l, I)), Ne(e, C, o, l > 0 ? {
				x: m,
				y: _,
				w: l,
				h: I
			} : void 0, s) && e.strokeRect(m, _, l, I);
		};
		l > 0 ? r(e, a(x?.chartexStyle, v?.chartexStyle), n.chartexDataPointStyle, 0, {
			x: m,
			y: _,
			w: l,
			h: I
		}, o, w) : w(e);
		let T = n.categories[t];
		!n.catAxisHidden && T != null && (e.fillStyle = n.catAxisFontColor ? `#${n.catAxisFontColor}` : "#595959", e.textAlign = "right", e.textBaseline = "middle", e.fillText(T, M - 6, _ + I / 2));
		let E = te(n, v, t, T ?? "", i, {
			visible: !1,
			showVal: !1,
			showCatName: !1
		}, y);
		if (E) {
			let t = ee(E.fontSizeHpt, o) ?? p(n.dataLabelFontSizeHpt, g, o), r = j(n, E.fontFace ?? n.dataLabelFontFace, "minor");
			e.font = `${E.textStyle.fontItalic ? "italic " : ""}${E.fontBold ? "bold " : ""}${t}px ${r}`, De(e, E.text, {
				kind: "bar",
				rect: {
					x: m,
					y: _,
					w: l,
					h: I
				},
				orientation: "horizontal",
				negative: !1,
				position: E.position ?? "ctr"
			}, {
				x: M,
				y: N,
				w: P,
				h: F
			}, t, E.fontColor ? `#${E.fontColor}` : "#ffffff", E.manualLayout, {
				x: d,
				y: f,
				w: h,
				h: g
			}, U(n, E.richRuns, o, r, E.fontBold ?? !1, E.textStyle), void 0, E.textStyle, o, E.labelBox, s);
		}
	}
	if (!n.catAxisHidden && !n.catAxisLineHidden) {
		let r = t(n.catAxisLineColor, n.catAxisLineWidthEmu, o);
		e.strokeStyle = r.color, e.lineWidth = r.width, e.beginPath(), e.moveTo(M, N), e.lineTo(M, N + F), e.stroke();
	}
	Le(e, S, C, d, f, h, g, M, N, P, F, _.bandH + 2, o, [x], s), e.restore();
}
function Y(e, t, n, r, a = 0) {
	let o = t.series[0];
	if (!o || Ie(e, n, Math.max(t.categories.length, o.categories?.length ?? 0, o.values.length))) return;
	let s = d(o, t.categories, { sortDescending: t.chartexParetoSortDescending ?? !1 });
	if (s.points.length === 0) return;
	let c = i(o, 0), l = [t.chartexDataPointStyle, t.chartexDataPointLineStyle], u = be(t, Be(o, c), l, l, c, 1, `#${H(t, c, 1, o.chartexStyle)}`, { linkedNoStyleFallback: !0 });
	W(e, R(t, {
		chartType: "line",
		categories: t.chartexParetoFlatEndpoint ? [...s.categories, ""] : s.categories,
		series: [{
			...s.series,
			values: t.chartexParetoFlatEndpoint ? [...s.series.values, 1] : s.series.values,
			showMarker: !1,
			lineHidden: !u.visible,
			lineColor: u.color.replace(/^#/, ""),
			lineWidthEmu: u.widthEmu ?? 9525,
			chartexStyle: {
				lineDash: u.dash,
				lineCap: u.cap,
				lineJoin: u.join
			}
		}],
		catAxisHidden: !1,
		catAxisTickLabelPos: t.chartexParetoSortDescending == null || !(o.categories ?? t.categories).some((e) => e != null && e !== "") ? "none" : "nextTo",
		showLegend: !1,
		valMin: t.valMin ?? 0,
		valMax: t.valMax ?? (t.valAxisFormatCode === "0%" ? 1 : 1.2),
		valAxisMajorUnit: t.valAxisMajorUnit ?? (t.valAxisFormatCode === "0%" ? .1 : .2)
	}), n, r, a);
}
function X(e) {
	return {
		min: e.secondaryValAxis?.min ?? 0,
		max: e.secondaryValAxis?.max ?? 1,
		title: e.secondaryValAxis?.title ?? null,
		hidden: e.secondaryValAxis?.hidden ?? !1,
		formatCode: e.secondaryValAxis?.formatCode ?? "0%",
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
function Ge(e, t, n, r, i = 0) {
	let a = t.series.filter((e) => e.seriesType !== "line"), o = t.chartexParetoOwnerIndex ?? 0, s = a[o];
	if (!s || a.length === 0 || Ie(e, n, Math.max(t.categories.length, ...a.map((e) => e.values.length)))) return;
	let c = a.map((e, n) => d(n === 0 ? He(t, e, n, a.length) : e, t.categories, {
		sortDescending: t.chartexParetoSortDescending ?? !0,
		keepUnvaluedCategories: !0
	})), l = c[o], u = c[0];
	if (l.points.length === 0 || u.points.length === 0) return;
	let f = t.chartexParetoFlatEndpoint === !0 && u.categories.length === u.points.length, p = t.series.find((e) => e.seriesType === "line"), m = p?.chartexFormatIdx ?? s.chartexFormatIdx ?? 0, h = {
		...p ?? l.series,
		name: p?.name || "Cumulative %",
		values: l.series.values,
		categories: u.categories,
		color: p?.color ?? Se(t, t.chartexDataPointLineStyle, "line", m, 1) ?? s.lineColor ?? s.color,
		seriesType: "line",
		useSecondaryAxis: !0,
		showMarker: !1
	}, g = X(t);
	je(e, R(t, {
		chartType: "clusteredBar",
		categories: f ? [...u.categories, ""] : u.categories,
		series: [...c.map((e) => ({
			...e.orderedSeries,
			values: f ? [...e.orderedSeries.values, null] : e.orderedSeries.values,
			seriesType: null,
			useSecondaryAxis: !1
		})), f ? {
			...h,
			values: [...h.values, 1]
		} : h],
		secondaryValAxis: g
	}), n, r, {
		gapPolicy: "chartex",
		semanticLineNoStyleFallback: !0
	}, i);
}
var Z = 7, Ke = .05, qe = 1.2;
function Je(e, t, n, r) {
	let i = (r ?? t) - (n ?? e);
	if (!(i > 0) || !Number.isFinite(i)) return null;
	let a = B(i, Z);
	if (!(a > 0) || !Number.isFinite(a)) return null;
	let o = e - i * Ke, s = t + i * Ke;
	e >= 0 && (e === 0 || t > qe * e) && (o = 0), t <= 0 && (t === 0 || Math.abs(e) > qe * Math.abs(t)) && (s = 0);
	let c = n ?? Math.floor(o / a) * a, l = r ?? Math.ceil(s / a) * a;
	return ![c, l].every(Number.isFinite) || !(l > c) ? null : {
		min: c,
		max: l,
		majorUnit: a
	};
}
function Ye(n, l, u, d, f) {
	let m = 3 * d, h = l.chartexBox;
	if (!h || h.categories.length === 0 || h.series.length === 0) return;
	let { x: b, y: x, w: S, h: C } = u;
	if (Ie(n, u, e(h.series.map((e) => e.valuesByCategory), 1e4))) return;
	let E = () => {
		n.fillStyle = "#888", n.font = "12px sans-serif", n.textAlign = "center", n.textBaseline = "middle", n.fillText("(chart values out of range)", b + S / 2, x + C / 2);
	}, ee = (e) => {
		let t = e.max - e.min, n = t / e.step;
		return Number.isFinite(e.min) && Number.isFinite(e.max) && Number.isFinite(e.step) && Number.isFinite(t) && Number.isFinite(n) && e.max > e.min && e.step > 0 && n <= 1e3 && e.min + e.step > e.min;
	}, k = Infinity, N = -Infinity;
	for (let e of h.series) for (let t of e.valuesByCategory) for (let e of t) Number.isFinite(e) && (e < k && (k = e), e > N && (N = e));
	if (!isFinite(k) || !isFinite(N)) return;
	if (!Number.isFinite(N - k)) {
		E();
		return;
	}
	let P = l.valAxisMajorUnit == null ? Je(k, N, l.valMin, l.valMax) : null, te = P ? {
		...l,
		valMin: P.min,
		valMax: P.max,
		valAxisMajorUnit: P.majorUnit
	} : l, re = j(l, l.valAxisFontFace, "minor"), I = p(l.valAxisFontSizeHpt, C, d), ae = y(I), L = Fe(d), R = A({
		dataMin: k,
		dataMax: N,
		explicitMin: te.valMin,
		explicitMax: te.valMax,
		axisLenPt: C / d,
		majorUnit: te.valAxisMajorUnit
	});
	if (!ee({
		min: R.min,
		max: R.max,
		step: R.majorUnit
	})) {
		E();
		return;
	}
	let ce = 0;
	if (!l.valAxisHidden) {
		let e = n.font;
		n.font = de(I, re, l.valAxisFontBold ?? !1, l.valAxisFontItalic ?? !1);
		let t = 0;
		for (let e of R.majorTicks) {
			let r = o(l, e, !1);
			t = Math.max(t, n.measureText(r).width);
		}
		n.font = e, ce = t + ae + O * d;
	}
	let le = Pe(n, l, S, C, d), ue = p(l.catAxisFontSizeHpt, C, d), pe = p(l.valAxisFontSizeHpt, C, d), me = oe(l, S, C, d), z = h.series.length, B = h.series.map((e, t) => i(e, t)), _e = h.series.map((e, t) => {
		let n = B[t], r = e.color ?? H(l, n, z, e.chartexStyle), i = Re(l, e.name, Be(e, n) ?? e, l.chartexDataPointStyle, n, z, r, !0), a = Ce(l, e, n, z, r);
		return a.darkened && i.lineColor != null ? {
			...i,
			lineColor: a.line.color.replace(/^#/, "")
		} : i;
	}), ye = {
		...l,
		series: _e
	}, V = Oe(n, ye, S, C, .22, d), { legRightW: be, legLeftW: xe, legTopH: we, legBottomH: De } = ie(V, l.legendOverlay === !0), je = he(l, b, x, S, C, d, {
		titleBand: le,
		legendSideReserveFrac: .22,
		legendReserve: V,
		pad: {
			t: le.bandH + we + pe / 2 + 2,
			r: be + S * .02,
			b: De + me.catBandH + (l.catAxisHidden ? C * .02 : M(ue)),
			l: xe + me.valBandW + (l.valAxisHidden ? S * .02 : ce)
		},
		honorPlotAreaManualLayout: !0
	}), { px0: U, py0: W, pw: G, ph: K } = je.plotRect;
	fe(n, l, U, W, G, K, d, f);
	let Ve = h.categories, He = Ve.length, Ue = c(te, k, N, K / d);
	if (!ee(Ue)) {
		E();
		return;
	}
	Te(n, l, b, x, S, C, x + je.title.topPad, je.title.fontPx);
	let { min: We, max: q } = Ue, J = q - We, Y = (e) => W + K * (1 - (e - We) / J), X = t(l.valAxisLineColor, l.valAxisLineWidthEmu, d), Ge = T(l, d);
	if (n.save(), !l.valAxisHidden) {
		if (n.font = de(I, re, l.valAxisFontBold ?? !1, l.valAxisFontItalic ?? !1), n.textAlign = "right", n.textBaseline = "middle", l.valAxisMinorGridlines) {
			let e = D(l, d);
			for (let t of Ue.minorLines) s(n, U, G, Y(t), !1, e);
		}
		for (let e of Ue.majorLines) {
			let t = Y(e);
			if (l.valAxisMajorGridlines !== !1) {
				n.strokeStyle = Ge.color, n.lineWidth = Ge.width;
				let e = Ge.dash.length > 0 && n.getLineDash ? n.getLineDash() : [];
				Ge.dash.length > 0 && n.setLineDash(Ge.dash), n.beginPath(), n.moveTo(U, t), n.lineTo(U + G, t), n.stroke(), Ge.dash.length > 0 && n.setLineDash(e);
			}
			n.fillStyle = l.valAxisFontColor ? `#${l.valAxisFontColor}` : "#595959", n.fillText(o(l, e, !1), U - L, t), g(n, l.valAxisMajorTickMark, "val", U, t, X.color, X.width, !1, l.valAxisLineHidden, "major", d, l.valAxisLineDash);
		}
		for (let e of Ue.minorTicks) g(n, l.valAxisMinorTickMark, "val", U, Y(e), X.color, X.width, !1, l.valAxisLineHidden, "minor", d, l.valAxisLineDash);
		l.valAxisLineHidden || se(n, U, W, U, W + K, X.color, X.width, l.valAxisLineDash);
	}
	let Z = t(l.catAxisLineColor, l.catAxisLineWidthEmu, d);
	!l.catAxisHidden && !l.catAxisLineHidden && se(n, U, W + K, U + G, W + K, Z.color, Z.width, l.catAxisLineDash);
	let Ke = G / He, qe = ne(l.barGapWidth, "chartex"), Ye = (e) => `#${h.series[e].color ?? H(l, B[e], z, h.series[e].chartexStyle)}`, Xe = (e) => Ae(l, B[e], z, h.series[e].chartexStyle, h.series[e].color), Q = h.series.map((e) => e.valuesByCategory.map((t) => w(t, e.quartileMethod))), $ = l.chartStyleMarkerSymbol ?? l.chartexMarkerSymbol ?? "circle", Ze = h.series.map((e, t) => $ === "none" ? Q[t].map(() => []) : ve(Q[t], e.showNonoutliers, e.showOutliers, Y, 3 * d)), Qe = (e, t) => {
		let n = _(U, G, h.oneBoxPerSeries ? 1 : He, z, h.oneBoxPerSeries ? 0 : e, t, qe);
		return n ? {
			bx: n.boxX,
			boxW: n.boxWidth,
			cx: n.centerX
		} : {
			bx: U,
			boxW: 0,
			cx: U
		};
	}, $e = (e, t) => {
		let i = h.series[e], o = Q[e][t];
		if (!o) return;
		let { bx: s, boxW: c, cx: u } = Qe(t, e), p = Ye(e), g = Xe(e), _ = l.chartexDataPointStyle, y = l.chartexDataPointMarkerStyle ?? _, b = B[e], x = Be(i, b) ?? i, S = Se(l, _, "line", b, z), C = x.lineColor ? `#${x.lineColor}` : S ? `#${S}` : p, w = Ce(l, i, b, z, C).line, T = Se(l, y, "fill", b, z), E = Ee(l, b, z, i.chartexStyle, i.color, y), D = Me(l, y, x, b, z, Se(l, y, "line", b, z) ?? C, { linkedNoStyleFallback: !0 }), ee = a(i.chartexStyle), O = Y(o.q1), k = Y(o.q3), A = Math.min(O, k), j = Math.max(1, Math.abs(O - k)), M = c * .4;
		if (Ne(n, w, d)) {
			let e = Y(o.whiskerHi), t = Y(o.whiskerLo);
			n.beginPath(), o.whiskerHi > o.q3 && (n.moveTo(u, e), n.lineTo(u, k)), o.whiskerLo < o.q1 && (n.moveTo(u, O), n.lineTo(u, t)), o.whiskerHi >= o.q3 && (n.moveTo(u - M / 2, e), n.lineTo(u + M / 2, e)), o.whiskerLo <= o.q1 && (n.moveTo(u - M / 2, t), n.lineTo(u + M / 2, t)), n.stroke();
		}
		r(n, i.chartexStyle, _, b, {
			x: s,
			y: A,
			w: c,
			h: j
		}, d, (e) => {
			if (g && ze(e, g, {
				x: s,
				y: A,
				w: c,
				h: j
			}, p, d, f), Ne(e, w, d, {
				x: s,
				y: A,
				w: c,
				h: j
			}, f)) {
				let t = e.lineWidth;
				e.strokeRect(s + t / 2, A + t / 2, c - t, j - t);
			}
		});
		let N = Y(o.median);
		Ne(n, w, d) && (n.beginPath(), n.moveTo(s, N), n.lineTo(s + c, N), n.stroke());
		for (let r of Ze[e][t]) ke(n, u, Y(r), $, 3, E ? T ? `#${T}` : p : "transparent", D.visible ? D.color : null, d, D.widthEmu == null ? 1 : v(D.widthEmu, d), E, f, D.visible ? D.paint : null, D.dash, D.customDash, D.cap, D.join, !1, ee, y, b, b);
		if (i.meanMarker) {
			let e = Y(o.mean), t = m;
			Ne(n, w, d) && (n.beginPath(), n.moveTo(u - t, e - t), n.lineTo(u + t, e + t), n.moveTo(u + t, e - t), n.lineTo(u - t, e + t), n.stroke());
		}
	}, et = (e) => {
		let t = h.series[e];
		if (!t.meanLine) return;
		let r = Ce(l, t, B[e], z, Ye(e)).line;
		if (n.save(), Ne(n, r, d)) {
			let t = !1;
			n.beginPath();
			for (let r = 0; r < He; r++) {
				let i = Q[e][r];
				if (!i) {
					t = !1;
					continue;
				}
				let { cx: a } = Qe(r, e), o = Y(i.mean);
				t ? n.lineTo(a, o) : n.moveTo(a, o), t = !0;
			}
			n.stroke();
		}
		n.restore();
	};
	for (let e = 0; e < z; e++) {
		for (let t = 0; t < He; t++) $e(e, t);
		et(e);
	}
	let tt = p(l.catAxisFontSizeHpt, C, d), nt = F(tt);
	for (let e = 0; e < He; e++) {
		let t = U + Ke * (e + .5);
		if (l.catAxisHidden || g(n, l.catAxisMajorTickMark, "cat", W + K, t, Z.color, Z.width, !1, l.catAxisLineHidden, "major", d, l.catAxisLineDash), !l.catAxisHidden) {
			n.font = de(tt, j(l, l.catAxisFontFace, "minor"), l.catAxisFontBold ?? !1, l.catAxisFontItalic ?? !1), n.fillStyle = l.catAxisFontColor ? `#${l.catAxisFontColor}` : "#595959", n.textAlign = "center", n.textBaseline = "top";
			let r = Ve[e];
			n.fillText(r, t, W + K + nt);
		}
	}
	n.restore(), ge(n, l, b, x, S, C, U, W, G, K, xe, De, me.catFontPx, me.valFontPx), Le(n, ye, V, b, x, S, C, U, W, G, K, le.bandH + 2, d, h.series.map((e, t) => Xe(t)), f);
}
var Xe = .18;
function Q(e, t, i, o, s) {
	let c = t.chartexSunburst;
	if (!c || c.rows.length === 0) return;
	let { x: l, y: u, w: d, h: f } = i;
	if (n(c.rows)) {
		Ie(e, i, ce + 1);
		return;
	}
	let p = b(c.rows);
	if (p.layoutWeight <= 0 || p.children.length === 0) return;
	let h = t.series[0], g = m(h?.dataLabelOverrides), _ = p.children.map((e, n) => Ae(t, n, p.children.length, h?.chartexStyle, h?.color)), v = R(t, {
		chartType: "clusteredBar",
		series: p.children.map((e) => {
			let n = H(t, e.branchIndex, p.children.length, h?.chartexStyle);
			return Re(t, e.label, h, t.chartexDataPointStyle, e.branchIndex, p.children.length, n, !1, !1);
		})
	}), y = Oe(e, v, d, f, .22, o), S = he(t, l, u, d, f, o, {
		titleTopPadFrac: .035,
		titleBottomPadFrac: .035,
		legendSideReserveFrac: 0,
		legendReserve: y,
		radialGapFrac: .02,
		honorPlotAreaManualLayout: !0
	});
	Te(e, t, l, u, d, f, u + S.title.topPad, S.title.fontPx);
	let { px0: C, py0: w, pw: T, ph: E } = S.plotRect;
	fe(e, t, C, w, T, E, o, s);
	let D = C + T / 2, O = w + E / 2, k = Math.min(T, E) * .46;
	p.a0 = -Math.PI / 2, p.a1 = -Math.PI / 2 + Math.PI * 2, z(p);
	let A = x(p) + 1, M = k * Xe, N = (k - M) / A, P = (e) => `#${H(t, e, p.children.length, h?.chartexStyle)}`, F = m(h?.dataPointOverrides), ne = h?.seriesDataLabels, re = j(t, ne?.fontFace ?? t.dataLabelFontFace, "minor"), ie = ee(ne?.fontSizeHpt, o) ?? Math.max(7, Math.min(13, k * .075)), I = ne?.fontColor ? `#${ne.fontColor}` : "#ffffff", ae = Array.from({ length: A }, () => []), L = [p];
	for (; L.length > 0;) {
		let e = L.pop();
		e.depth >= 0 && ae[e.depth].push(e);
		for (let t = e.children.length - 1; t >= 0; t--) L.push(e.children[t]);
	}
	e.save();
	for (let n = 0; n < A; n++) {
		let i = M + n * N, c = i + N;
		for (let m of ae[n]) {
			let n = m.a1 - m.a0;
			if (n <= 1e-4) continue;
			let _ = F.get(m.labelIndex), v = V(t, h, _, m.branchIndex, p.children.length), y = xe(t, h, _, m.branchIndex, p.children.length, "#ffffff"), b = {
				x: D - c,
				y: O - c,
				w: c * 2,
				h: c * 2
			};
			r(e, a(_?.chartexStyle, h?.chartexStyle), t.chartexDataPointStyle, h?.chartexFormatIdx ?? 0, b, o, (e) => {
				e.beginPath(), e.arc(D, O, c, m.a0, m.a1), e.arc(D, O, i, m.a1, m.a0, !0), e.closePath(), v && ye(e, v, b, P(m.branchIndex), o, s), Ne(e, y, o, b, s) && e.stroke();
			}, m.branchIndex);
			let x = te(t, h, m.labelIndex, m.label, m.value, {
				visible: !1,
				showVal: !1,
				showCatName: !1
			}, g);
			if (!x) continue;
			let S = x.text, k = ee(x.fontSizeHpt, o) ?? ie, A = x.fontColor ? `#${x.fontColor}` : I, M = x.fontFace ? j(t, x.fontFace, "minor") : re, ne = (m.a0 + m.a1) / 2, ae = (i + c) / 2, L = N - 4, oe = n * ae;
			if (!x.manualLayout && L < k * .9 && oe < k * .9) continue;
			let se = D + Math.cos(ne) * ae, R = O + Math.sin(ne) * ae;
			if (e.font = `${x.textStyle.fontItalic ? "italic " : ""}${x.fontBold ? "bold " : ""}${k}px ${M}`, x.manualLayout) {
				De(e, S, {
					kind: "point",
					x: se,
					y: R,
					position: x.position ?? "ctr"
				}, {
					x: C,
					y: w,
					w: T,
					h: E
				}, k, A, x.manualLayout, {
					x: l,
					y: u,
					w: d,
					h: f
				}, U(t, x.richRuns, o, M, x.fontBold ?? !1, x.textStyle), void 0, x.textStyle, o, x.labelBox, s);
				continue;
			}
			e.save(), e.translate(se, R);
			let ce = ne, le = ce * 180 / Math.PI % 360;
			(le > 90 || le < -90) && (ce += Math.PI), e.rotate(ce), e.font = `${x.textStyle.fontItalic ? "italic " : ""}${x.fontBold ? "bold " : ""}${k}px ${M}`, De(e, S, {
				kind: "point",
				x: 0,
				y: 0,
				position: x.position ?? "ctr"
			}, {
				x: -L / 2,
				y: -oe / 2,
				w: L,
				h: oe
			}, k, A, void 0, {
				x: -L / 2,
				y: -oe / 2,
				w: L,
				h: oe
			}, U(t, x.richRuns, o, M, x.fontBold ?? !1, x.textStyle), void 0, x.textStyle, o, x.labelBox, s), e.restore();
		}
	}
	e.restore(), Le(e, v, y, l, u, d, f, C, w, T, E, S.title.bandH + 2, o, _, s);
}
function $(e, t) {
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
function Ze(e, t, i, o, s) {
	let c = t.chartexTreemap;
	if (!c || c.rows.length === 0) return;
	if (n(c.rows)) {
		Ie(e, i, ce + 1);
		return;
	}
	let l = b(c.rows, !0);
	if (l.layoutWeight <= 0 || l.children.length === 0) return;
	let u = t.series[0], d = l.children.map((e) => Ae(t, e.branchIndex, l.children.length, u?.chartexStyle, u?.color)), f = R(t, {
		chartType: "clusteredBar",
		series: l.children.map((e) => {
			let n = H(t, e.branchIndex, l.children.length, u?.chartexStyle);
			return Re(t, e.label, u, t.chartexDataPointStyle, e.branchIndex, l.children.length, n);
		})
	}), p = Oe(e, f, i.w, i.h, .22, o), h = he(t, i.x, i.y, i.w, i.h, o, {
		titleTopPadFrac: .035,
		titleBottomPadFrac: .035,
		legendSideReserveFrac: 0,
		legendReserve: p,
		radialGapFrac: .015,
		honorPlotAreaManualLayout: !0
	});
	Te(e, t, i.x, i.y, i.w, i.h, i.y + h.title.topPad, h.title.fontPx);
	let { px0: g, py0: _, pw: v, ph: y } = h.plotRect;
	fe(e, t, g, _, v, y, o, s);
	let x = {
		x: g,
		y: _,
		w: v,
		h: y
	}, S = c.parentLabelLayout ?? "overlapping", C = t.series[0]?.seriesDataLabels, w = j(t, C?.fontFace ?? t.dataLabelFontFace, "minor"), T = ee(C?.fontSizeHpt, o) ?? Math.max(8, Math.min(13, h.plotRect.ph * .025)), E = C?.fontColor ? `#${C.fontColor}` : "#ffffff", D = new Map((t.series[0]?.dataLabelOverrides ?? []).map((e) => [e.idx, e])), O = t.chartBg ? t.chartBg.startsWith("#") ? t.chartBg : `#${t.chartBg}` : "#ffffff", k = m(u?.dataPointOverrides), A = (n, c) => {
		if (c.w < .5 || c.h < .5) return;
		let d = `#${H(t, n.branchIndex, l.children.length, u?.chartexStyle)}`, f = k.get(n.labelIndex), p = V(t, u, f, n.branchIndex, l.children.length), m = a(f?.chartexStyle, u?.chartexStyle), h = D.get(n.labelIndex), g = h?.fontColor ? `#${h.fontColor}` : E, _ = ee(h?.fontSizeHpt, o) ?? T, v = h?.fontBold ?? C?.fontBold ?? !1;
		if (n.children.length > 0) {
			let a = te(t, u, n.labelIndex, n.label, n.value, {
				visible: S !== "none",
				showVal: !1,
				showCatName: !0
			}, D, !0), l = a != null && (S !== "overlapping" || n.depth === 0), f = _, y = a?.fontFace ? j(t, a.fontFace, "minor") : w, b = S === "banner" && l ? Math.min(c.h * .28, f + 7) : 0;
			b > 0 && r(e, m, t.chartexDataPointStyle, u?.chartexFormatIdx ?? 0, {
				x: c.x,
				y: c.y,
				w: c.w,
				h: b
			}, o, (e) => {
				p && ze(e, p, {
					x: c.x,
					y: c.y,
					w: c.w,
					h: b
				}, d, o, s);
			}, n.branchIndex);
			let C = {
				x: c.x,
				y: c.y + b,
				w: c.w,
				h: Math.max(0, c.h - b)
			};
			for (let e of $(n.children, C)) A(e.node, e.rect);
			if (l && (a.manualLayout || c.w > f * 2 && c.h > f + 4)) {
				e.font = `${v ? "bold " : ""}${f}px ${y}`;
				let n = b > 0 ? {
					x: c.x,
					y: c.y,
					w: c.w,
					h: b
				} : c, r = h?.position ?? "inBase";
				De(e, a.text, a.manualLayout ? {
					kind: "point",
					x: c.x + c.w / 2,
					y: c.y + c.h / 2,
					position: r
				} : {
					kind: "box",
					rect: n,
					position: r
				}, a.manualLayout ? x : n, f, g, a.manualLayout, i, U(t, a.richRuns, o, y, v, a.textStyle), void 0, a.textStyle, o, a.labelBox, s);
			}
			return;
		}
		r(e, m, t.chartexDataPointStyle, u?.chartexFormatIdx ?? 0, c, o, (e) => {
			p && ze(e, p, c, d, o, s), Ne(e, xe(t, u, f, n.branchIndex, l.children.length, O, t.chartexDataPointStyle, { linkedNoStyleFallback: !0 }), o, c, s) && e.strokeRect(c.x, c.y, c.w, c.h);
		}, n.branchIndex);
		let y = te(t, u, n.labelIndex, n.label, n.value, {
			visible: !1,
			showVal: !1,
			showCatName: !1
		}, D);
		if (!y) return;
		let b = ee(y.fontSizeHpt, o) ?? _;
		if (!y.manualLayout && (c.w <= b * 1.2 || c.h <= b * 1.2)) return;
		let M = y.fontFace ? j(t, y.fontFace, "minor") : w;
		e.font = `${y.fontBold ? "bold " : ""}${b}px ${M}`;
		let N = c, P = y.position === "outEnd" ? "inEnd" : y.position ?? "ctr";
		De(e, y.text, y.manualLayout ? {
			kind: "point",
			x: c.x + c.w / 2,
			y: c.y + c.h / 2,
			position: P
		} : {
			kind: "box",
			rect: N,
			position: P
		}, y.manualLayout ? x : N, b, y.fontColor ? `#${y.fontColor}` : g, y.manualLayout, i, U(t, y.richRuns, o, M, y.fontBold ?? !1, y.textStyle), void 0, y.textStyle, o, y.labelBox, s);
	};
	e.save(), e.beginPath(), e.rect(g, _, v, y), e.clip();
	for (let e of $(l.children, {
		x: g,
		y: _,
		w: v,
		h: y
	})) A(e.node, e.rect);
	e.restore(), Le(e, f, p, i.x, i.y, i.w, i.h, g, _, v, y, h.title.bandH + 2, o, d, s);
}
function Qe(e, t, n, r, i = 0) {
	let a = Ve(t, void 0, n, r), o = Ue(t, n, r);
	if (a != null && a > 1048576 || o != null && o > 1048576 || a != null && o != null && a > 1048576 - o) return Ie(e, n, ce + 1), !0;
	if (t.chartexSuppressGeometry) {
		let i = Pe(e, t, n.w, n.h, r);
		return Te(e, t, n.x, n.y, n.w, n.h, n.y + i.topPad, i.fontPx), !0;
	}
	switch (t.chartType) {
		case "waterfall": return q(e, t, n, r, i), !0;
		case "clusteredColumn": {
			let a = t.series.map((e, n) => n === 0 ? He(t, e, n, t.series.length) : e), o = t.chartexParetoSortDescending ? a.map((e) => d(e, t.categories, {
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
			return je(e, R(t, {
				chartType: "clusteredBar",
				categories: o[0]?.categories ?? t.categories,
				series: [...o, ...s],
				secondaryValAxis: s.length > 0 ? X(t) : t.secondaryValAxis
			}), n, r, { gapPolicy: "chartex" }, i), !0;
		}
		case "histogram": return We(e, t, n, r, i), !0;
		case "funnel": return J(e, t, n, r, i), !0;
		case "paretoLine": return Y(e, t, n, r, i), !0;
		case "pareto": return Ge(e, t, n, r, i), !0;
		case "boxWhisker": return Ye(e, t, n, r, i), !0;
		case "sunburst": return Q(e, t, n, r, i), !0;
		case "treemap": return Ze(e, t, n, r, i), !0;
		default: return !1;
	}
}
//#endregion
//#region src/chart-ex.ts
var $e = K({ render: Qe }, "chartEx");
//#endregion
export { $e as chartEx };
