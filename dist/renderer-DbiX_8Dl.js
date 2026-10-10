import { S as e, l as t } from "./resource-policy.generated-BTdyyO9v.js";
import { n } from "./preload-Dufqb9J3.js";
import { a as r, c as i, f as a, l as o, m as s, n as c, o as l, p as u, r as d, s as f, t as p, u as m } from "./scripts-DEuLSUed.js";
import { B as h, C as g, E as _, I as v, J as y, Q as b, T as x, V as S, X as C, Y as w, c as T, d as E, f as D, h as O, i as k, k as A, m as j, n as M, nt as N, p as ee, q as te, rt as P, s as ne, tt as F, u as I, v as L, w as R, x as z, y as B } from "./office-auto-line-Chy1gU-T.js";
import { Gn as V, Hn as re, Qn as H, Wn as U, Zn as W, _n as ie, _r as G, ar as ae, bn as oe, gn as se, hn as ce, mn as le, n as ue, pn as de, qn as fe, rr as pe, vn as me, xn as K, yn as q } from "./plot-area-frame-DvwuejI0.js";
import { a as J, i as Y } from "./units-DIk-8W6L.js";
import { t as he } from "./renderer-VcLL4hOT.js";
import { r as ge } from "./drawingml-shape-vPqmpvN1.js";
import { n as _e, r as ve } from "./line-order-Bk3VRyjc.js";
import { a as ye, c as X, d as be, f as xe, i as Se, l as Ce, m as we, n as Te, o as Ee, p as De, r as Oe, t as ke, u as Ae } from "./stacked-faces-DEoKxzB_.js";
import { n as je, r as Me } from "./worksheet-policy-context-zBNDS5EA.js";
import { c as Ne, h as Pe, m as Fe, p as Ie, s as Le, t as Re } from "./grid-geometry-MHuKakaD.js";
//#region packages/core/src/sparkline/renderer.ts
function ze(e, t, n) {
	let { values: r } = n;
	if (r.length === 0 || t.w <= 0 || t.h <= 0) return;
	let i = n.colorSeries ?? "#5B9BD5", a = Math.min(2, t.w * .08), o = Math.max(2, t.h * .2), s = t.x + a, c = t.y + o, l = Math.max(1, t.w - a * 2), u = Math.max(1, t.h - o * 2), d = r.filter((e) => typeof e == "number");
	if (d.length === 0) return;
	let f = Math.min(...d), p = Math.max(...d), m = n.min ?? f, h = n.max ?? p;
	m === h && (h = m + 1, --m);
	let g = h - m, _ = (e) => c + u - (e - m) / g * u;
	if (n.kind === "stem") {
		He(e, n, s, c, l, u);
		return;
	}
	if (n.kind === "column") {
		Ve(e, n, r, s, c, l, u, m, h);
		return;
	}
	if (n.displayXAxis && m < 0 && h > 0) {
		e.save(), e.strokeStyle = n.colorAxis ?? "#000000", e.lineWidth = 1, e.beginPath();
		let t = _(0);
		e.moveTo(s, t), e.lineTo(s + l, t), e.stroke(), e.restore();
	}
	let v = r.length, y = (e) => v === 1 ? s + l / 2 : s + e / (v - 1) * l;
	e.save(), e.strokeStyle = i, e.lineCap = "round", e.lineJoin = "round", e.lineWidth = (n.lineWeight ?? .75) * J, e.beginPath();
	let b = !1, x = n.displayEmptyCellsAs ?? "gap";
	for (let t = 0; t < v; t++) {
		let n = r[t];
		if (n == null) {
			if (x === "zero") {
				let n = y(t), r = _(0);
				b ? e.lineTo(n, r) : (e.moveTo(n, r), b = !0);
			} else x === "gap" && (b = !1);
			continue;
		}
		let i = y(t), a = _(n);
		b ? e.lineTo(i, a) : (e.moveTo(i, a), b = !0);
	}
	e.stroke(), e.restore();
	let S = Math.max(1, Math.min(2.5, u * .12)), C = Be(r, n);
	for (let t = 0; t < v; t++) {
		let a = r[t];
		if (a == null) continue;
		let o = C[t];
		(n.markers || o != null) && (e.save(), e.fillStyle = o ?? n.colorMarkers ?? i, e.beginPath(), e.arc(y(t), _(a), S, 0, Math.PI * 2), e.fill(), e.restore());
	}
}
function Be(e, t) {
	let n = e.map(() => null), r = e.map((e) => typeof e == "number" ? e : null), i = r.findIndex((e) => e != null), a = -1;
	for (let e = r.length - 1; e >= 0; e--) if (r[e] != null) {
		a = e;
		break;
	}
	let o = r.filter((e) => e != null), s = NaN, c = NaN;
	if (o.length > 0 && (s = Math.max(...o), c = Math.min(...o)), t.negative && t.colorNegative) for (let e = 0; e < r.length; e++) {
		let i = r[e];
		i != null && i < 0 && (n[e] = t.colorNegative);
	}
	if (t.first && t.colorFirst && i >= 0 && (n[i] = t.colorFirst), t.last && t.colorLast && a >= 0 && (n[a] = t.colorLast), t.high && t.colorHigh && !Number.isNaN(s)) for (let e = 0; e < r.length; e++) r[e] === s && (n[e] = t.colorHigh);
	if (t.low && t.colorLow && !Number.isNaN(c)) for (let e = 0; e < r.length; e++) r[e] === c && (n[e] = t.colorLow);
	return n;
}
function Ve(e, t, n, r, i, a, o, s, c) {
	let l = n.length;
	if (l === 0) return;
	let u = s < 0 && c > 0 ? 0 : s, d = c - s, f = (e) => i + o - (e - s) / d * o, p = f(u), m = a / l, h = Math.min(1.5, m * .15), g = Be(n, t);
	for (let i = 0; i < l; i++) {
		let a = n[i];
		if (a == null) continue;
		let o = g[i] ?? (a < 0 && t.colorNegative ? t.colorNegative : t.colorSeries ?? "#5B9BD5"), s = f(a), c = r + m * i + h / 2, l = Math.max(1, m - h);
		e.save(), e.fillStyle = o, e.fillRect(c, Math.min(p, s), l, Math.abs(p - s)), e.restore();
	}
}
function He(e, t, n, r, i, a) {
	let o = t.values.length;
	if (o === 0) return;
	let s = r + a / 2, c = a / 2, l = i / o, u = Math.min(1.5, l * .15), d = Be(t.values, t);
	for (let r = 0; r < o; r++) {
		let i = t.values[r];
		if (i == null || i === 0) continue;
		let a = i < 0, o = d[r] ?? (a && t.colorNegative ? t.colorNegative : t.colorSeries ?? "#5B9BD5"), f = n + l * r + u / 2, p = Math.max(1, l - u);
		e.save(), e.fillStyle = o, a ? e.fillRect(f, s, p, c) : e.fillRect(f, s - c, p, c), e.restore();
	}
}
//#endregion
//#region packages/core/src/text/bidi/segments.ts
function Ue(e, t) {
	return e === !0 ? "rtl" : e === !1 ? "ltr" : ve().computeLevels(t, "auto").paragraphLevel === 1 ? "rtl" : "ltr";
}
//#endregion
//#region packages/core/src/drawingml-text/paint.ts
function We(e, t, n, r) {
	let i = t;
	for (let t of e) r(t, i, n), i += t.width;
	return i;
}
//#endregion
//#region packages/core/src/drawingml-text/spreadsheet-cell.ts
function Ge(e, t) {
	if (e.length === 0 || t.length === 0) return 0;
	let n = [...e, ...t], r = e.length;
	return r - L(n, r, B, 1);
}
function Ke(e, t) {
	let n = t;
	for (; n < e.length;) {
		let t = e[e.length - n - 1], r = e[e.length - n], i = t?.codePointAt(0), a = r?.codePointAt(0);
		if (i !== void 0 && a !== void 0 && P(i) && P(a)) n++;
		else break;
	}
	return n >= e.length ? t : n;
}
function qe(e, t) {
	if (e.length === 0 || t.length === 0) return 0;
	let n = t[0].codePointAt(0), r = e.length - 1, i = e[r].codePointAt(0);
	if (i === void 0 || n === void 0 || i === 8203 || n === 8203 || !O(i, n)) return 0;
	for (; r > 0;) {
		let t = e[r - 1].codePointAt(0), n = e[r].codePointAt(0);
		if (t === void 0 || n === void 0 || !O(t, n)) break;
		r--;
	}
	return r === 0 ? 0 : e.length - r;
}
function Je(e, t, n) {
	let r = [], i = [], a = 0;
	for (; a < e.length;) {
		let t = e[a], n = t.codePointAt(0) ?? 0;
		if (N(n)) i.push(t), a += n > 65535 ? 2 : 1;
		else if (t === " ") {
			let t = a;
			for (; t < e.length && e[t] === " ";) t++;
			i.push(e.slice(a, t)), a = t;
		} else {
			let t = a;
			for (; t < e.length;) {
				let n = e[t], r = n.codePointAt(0) ?? 0;
				if (n === " " || N(r)) break;
				t += r > 65535 ? 2 : 1;
			}
			let n = e.slice(a, t), r = y(n) ? F(n) : null;
			if (r && r.length > 0) {
				let e = 0;
				for (let t of r) i.push(n.slice(e, t)), e = t;
				i.push(n.slice(e));
			} else i.push(n);
			a = t;
		}
	}
	let o = "";
	for (let e of i) {
		if (o === "") {
			o = e;
			continue;
		}
		let i = o + e;
		if (n(i) <= t) o = i;
		else {
			let t = e.replace(/^ +/, "");
			t === "" && (t = e);
			let n = [...o], i = Ge(n, [...t]);
			if (i > 0) {
				let e = n.length - i;
				r.push(n.slice(0, e).join("")), o = n.slice(e).join("") + t;
			} else r.push(o), o = t;
		}
	}
	return r.push(o), r;
}
function Ye(e, t, n, r, i, a, o) {
	let s = [], c = [], l = 0, u = 0, d = n.size, f = 0, p = () => {
		c.length !== 0 && (s.push({
			segments: c,
			maxFontSize: u,
			para: f
		}), c = [], l = 0, u = 0);
	}, m = () => {
		if (c.length === 0) {
			s.push({
				segments: [],
				maxFontSize: d || o,
				para: f
			});
			return;
		}
		p();
	}, h = (t, n) => {
		if (!t) return;
		d = n.size, a(n, t);
		let i = e.measureText(t).width;
		if (c.length > 0 && l + i > r) {
			let r = c.flatMap((e) => [...e.text]), i = Ge(r, [...t]);
			i > 0 ? i = Ke(r, i) : !y(t) && !y(c[c.length - 1]?.text ?? "") && !/^\s/u.test(t) && !/\s$/u.test(r.at(-1) ?? "") && (i = qe(r, [...t]));
			let o = c[c.length - 1], s = [...o.text];
			i > s.length && (i = s.length);
			let d = null;
			if (i > 0) {
				let t = s.slice(0, s.length - i), n = s.slice(s.length - i);
				if (t.length === 0) c.pop();
				else {
					let n = t.join("");
					a(o.font, n), o.text = n, o.width = e.measureText(n).width;
				}
				let r = n.join("");
				a(o.font, r), d = {
					text: r,
					font: o.font,
					width: e.measureText(r).width
				};
			}
			p(), d && (c.push(d), l += d.width, d.font.size > u && (u = d.font.size)), a(n, t);
		}
		c.push({
			text: t,
			font: n,
			width: i
		}), l += i, n.size > u && (u = n.size);
	}, g = (t, n) => {
		let i = F(t);
		if (i.length === 0) {
			h(t, n);
			return;
		}
		a(n, t);
		let o = (t) => e.measureText(t).width, s = b(t), c = t.length, u = 0;
		for (; u < c;) {
			let e = r - l, a = w(t, i, u, e, o, s);
			if (a <= u) {
				if (l > 0) {
					p();
					continue;
				}
				let n = i.find((e) => e > u) ?? c, r = t.slice(u, n), d = C(r), f = w(r, d, 0, e, o, s);
				f <= 0 && (f = d.length > 0 ? d[0] : r.length), a = u + f;
			}
			h(t.slice(u, a), n), u = a, u < c && p();
		}
	};
	for (let e of t) {
		let t = i(n, e), r = [], a = 0;
		for (; a < e.text.length;) {
			let t = e.text[a], n = t.codePointAt(0) ?? 0;
			if (n === 10) r.push("\n"), a += 1;
			else if (N(n)) r.push(t), a += n > 65535 ? 2 : 1;
			else if (t === " ") {
				let t = a;
				for (; t < e.text.length && e.text[t] === " ";) t++;
				r.push(e.text.slice(a, t)), a = t;
			} else {
				let t = a;
				for (; t < e.text.length;) {
					let n = e.text[t], r = n.codePointAt(0) ?? 0;
					if (n === " " || n === "\n" || N(r)) break;
					t += r > 65535 ? 2 : 1;
				}
				r.push(e.text.slice(a, t)), a = t;
			}
		}
		for (let e of r) e === "\n" ? (m(), f++) : y(e) ? g(e, t) : h(e, t);
	}
	return (c.length > 0 || s.length > 0) && m(), s;
}
//#endregion
//#region packages/xlsx/src/shape-office-line.ts
function Xe(e) {
	let t = e.fontFace?.trim();
	if (!t) return;
	let n = (e) => !e?.trim() || e.trim().toLocaleLowerCase("en-US") === t.toLocaleLowerCase("en-US");
	return n(e.fontFaceEa) && n(e.fontFaceCs) ? t : void 0;
}
function Ze(e) {
	let t = [];
	for (let n of e.paragraphs) for (let e of n.runs) e.type === "text" && Xe(e) && t.push(e);
	return t;
}
function Qe(e) {
	return e && (e.type === "pts" ? {
		type: "pts",
		val: Math.floor(e.val + .5)
	} : {
		type: "pct",
		val: Math.floor(e.val / 1e3 + .5) * 1e3
	});
}
function $e(e) {
	let t = e.family.trim().toLowerCase(), n = e.weight ?? 400, r = e.style ?? "normal";
	return n === 400 && r === "normal" ? t : `${t}:${n}:${r}`;
}
function et(e) {
	return $e({
		family: e.fontFace,
		weight: e.bold ? 700 : 400,
		style: e.italic ? "italic" : "normal"
	});
}
var tt = 1e3, nt = 2 / tt, rt = /* @__PURE__ */ new WeakMap();
function it(e) {
	return (t) => {
		let n = rt.get(t);
		if (n !== void 0) return n ?? void 0;
		let r = e.font, i = null;
		try {
			e.font = `${t.style} ${t.weight} ${tt}px "${t.family}"`;
			let n = e.measureText("H"), r = n.fontBoundingBoxAscent, a = n.fontBoundingBoxDescent;
			Number.isFinite(r) && Number.isFinite(a) && r + a > 0 && (i = {
				ascent: r / tt,
				descent: a / tt
			});
		} finally {
			e.font = r;
		}
		return rt.set(t, i), i ?? void 0;
	};
}
var at = (e) => e.source === "macos-system" || e.source === "macos-supplemental";
function ot(e) {
	if (e.source !== "published-open-font" && !(e.farEastCodePage == null || !e.win)) return M({
		faceSource: at(e) ? "system" : "office-bundle",
		unitsPerEm: e.unitsPerEm,
		hhea: e.hhea,
		win: e.win,
		typoMetrics: e.typoMetrics,
		farEastCodePage: e.farEastCodePage
	}) ?? void 0;
}
function st(e) {
	let t;
	for (let n of e) {
		let e = ot(n);
		if (!e || t && (e.ascentRatio !== t.ascentRatio || e.descentRatio !== t.descentRatio)) return;
		t = e;
	}
	return t;
}
function ct(e, t) {
	let n = t.unitsPerEm, r = [[t.hhea[0], -t.hhea[1]]];
	return t.win && r.push(t.win), t.typoMetrics && r.push([t.typoMetrics[0], -t.typoMetrics[1]]), r.some(([t, r]) => Math.abs(e.ascent - t / n) <= nt && Math.abs(e.descent - r / n) <= nt);
}
function lt(e, t, n) {
	let r = Xe(e);
	if (!r || !t || t.source !== "local" || t.metric.synthesized || !t.resourceIdentity.startsWith("office-local:") || t.requestedFamily.toLocaleLowerCase("en-US") !== r.toLocaleLowerCase("en-US") || t.weight !== (e.bold ? 700 : 400) || t.style !== (e.italic ? "italic" : "normal")) return;
	let i = te(r, {
		weight: t.weight,
		style: t.style
	});
	if (i.length === 0) return;
	let a = st(i);
	if (a || i.length === 1) return a;
	let o = n?.(t);
	if (!o) return;
	let s = i.filter((e) => ct(o, e));
	if (s.length !== 0 && !(i.some(at) && !s.every(at))) return st(s);
}
//#endregion
//#region packages/xlsx/src/google-fonts.ts
var ut = {
	...u,
	...d
};
function* dt(e) {
	for (let t of e?.sharedStrings ?? []) if (t.runs && t.runs.length > 0) for (let e of t.runs) yield e.text;
	else yield t.text;
}
function ft(e, t) {
	let n = /* @__PURE__ */ new Set(), r = null;
	for (let t of e?.styles?.fonts ?? []) if (t.name) {
		n.add(t.name);
		let e = /^(.*?)\s+Regular$/i.exec(t.name.trim());
		if (e) {
			let t = e[1].trim(), r = ut[t.toLocaleLowerCase("en-US")];
			r && (!r.loadFamily || r.loadFamily.toLocaleLowerCase("en-US") === t.toLocaleLowerCase("en-US")) && n.add(t);
		}
		r ??= f(t.name);
	}
	for (let i of a(dt(e), r ?? t ?? null)) n.add(i);
	return n;
}
function pt(e, t) {
	for (let t of e?.styles?.fonts ?? []) {
		let n = f(t.name);
		if (n) return l(dt(e), n);
	}
	return l(dt(e), t);
}
function mt(e) {
	let t = /* @__PURE__ */ new Map(), n = (e, n, r) => {
		if ((e?.trim().toLowerCase() || "calibri") !== "calibri") return;
		let i = n ? 700 : 400, a = r ? "italic" : "normal";
		t.set(`${i}:${a}`, {
			family: "Calibri",
			weight: i,
			style: a
		});
	};
	for (let t of e?.styles?.fonts ?? []) n(t.name, t.bold, t.italic);
	for (let t of e?.sharedStrings ?? []) for (let e of t.runs ?? []) e.font && n(e.font.name, e.font.bold, e.font.italic);
	return [...t.values()];
}
function ht(e) {
	let t = /* @__PURE__ */ new Map(), n = e.defaultFontFamily?.trim(), r = e.defaultFontBold ? 700 : 400, i = e.defaultFontItalic ? "italic" : "normal";
	if (n && te(n, {
		weight: r,
		style: i
	}).length) {
		let e = {
			family: n,
			weight: r,
			style: i
		};
		t.set($e(e), e);
	}
	for (let n of e.rows) for (let e of n.cells) if (e.value.type === "text") for (let n of e.value.runs ?? []) {
		let e = n.font;
		if (!e || (e.name?.trim().toLowerCase() || "calibri") !== "calibri") continue;
		let r = {
			family: "Calibri",
			weight: e.bold ? 700 : 400,
			style: e.italic ? "italic" : "normal"
		};
		t.set($e(r), r);
	}
	for (let n of e.shapeGroups ?? []) for (let e of n.shapes) if (e.text) for (let n of Ze(e.text)) {
		let e = n.bold ? 700 : 400, r = n.italic ? "italic" : "normal";
		if (te(n.fontFace, {
			weight: e,
			style: r
		}).length === 0) continue;
		let i = {
			family: n.fontFace.trim(),
			weight: e,
			style: r
		};
		t.set($e(i), i);
	}
	return [...t.values()];
}
//#endregion
//#region packages/xlsx/src/shape-stacked-text.ts
function gt(e, t, n, r, i, a, o) {
	let s = (t, n) => {
		e.font = n.font;
		let r = Oe(n.face ?? "", n.bold, n.italic), i = r ? void 0 : e.measureText("M"), a = r ? r.ascent * n.px : i?.fontBoundingBoxAscent ?? n.px, o = r ? r.descent * n.px : i?.fontBoundingBoxDescent ?? 0, s = Te(n.face ?? ""), c = ke * (s === void 0 ? a + o : s * n.px), l = [...C(t), t.length], u = 0, d = [];
		for (let r of l) {
			let i = t.slice(u, r);
			if (u = r, !i) continue;
			let s = i.codePointAt(0) ?? 0, l = Se(s) ? ye(n.face ?? "", s) ? "verticalGlyph" : "rotated" : "upright", f = l === "upright" ? c : l === "verticalGlyph" ? n.px : e.measureText(i).width;
			d.push({
				text: i,
				style: n,
				kind: l,
				advance: f + n.spacing,
				thickness: c,
				space: i === " ",
				cell: c,
				ascent: a,
				descent: o
			});
		}
		return d;
	}, c = (e, t) => !e.equation && !t.equation && e.font === t.font && e.color === t.color && e.spacing === t.spacing, l = Ee(t.paragraphs.map((e) => {
		let t = [], n, r = "", l = 11;
		for (let s of e.runs) {
			if (s.type === "break") {
				t.push({ type: "break" });
				continue;
			}
			if (s.type === "math") {
				let e = o(s, l);
				if (!e) continue;
				let n = {
					font: "",
					px: 0,
					color: s.color ?? "#000000",
					spacing: 0,
					bold: !1,
					italic: !1,
					equation: e
				};
				t.push({
					type: "object",
					width: e.height,
					style: n,
					display: s.display
				}), r = "";
				continue;
			}
			l = s.size > 0 ? s.size : 11;
			let e = "", u, d = () => {
				u && e && t.push({
					type: "text",
					text: e,
					style: u
				});
			};
			for (let t of s.text) {
				let n = /^[\p{M}\p{Cf}]$/u.test(t) && r ? r : t, o = a(s, n);
				r = n;
				let l = {
					...o,
					color: s.color ?? "#000000",
					spacing: (s.spacing ?? 0) * i,
					bold: s.bold,
					italic: s.italic
				};
				u && !c(u, l) && (d(), e = ""), u = l, e += t;
			}
			u ??= {
				...a(s, "M"),
				color: s.color ?? "#000000",
				spacing: (s.spacing ?? 0) * i,
				bold: s.bold,
				italic: s.italic
			}, n = u, d(), s.text === "" && t.push({
				type: "text",
				text: "",
				style: u
			});
		}
		let u = {
			font: `${11 * i}px sans-serif`,
			px: 11 * i,
			color: "#000000",
			spacing: 0,
			bold: !1,
			italic: !1
		};
		return {
			runs: t,
			alignment: e.align,
			lineSpacing: Qe(e.spaceLine),
			spaceBefore: Qe(e.spaceBefore),
			spaceAfter: Qe(e.spaceAfter),
			emptyThickness: s("M", n ?? u)[0].thickness
		};
	}), {
		direction: n,
		rect: r,
		anchor: t.anchor,
		anchorCtr: t.anchorCtr,
		wrap: t.wrap !== "none",
		spcFirstLastPara: t.spcFirstLastPara,
		lnSpcReduction: t.autoFit === "norm" ? t.lnSpcReduction ?? 0 : 0,
		pxPerPt: i,
		glyphs: s,
		sameStyle: c,
		objectGlyph: ({ style: e }) => {
			let t = e.equation;
			return {
				text: "",
				style: e,
				kind: "upright",
				advance: t.height,
				thickness: t.width,
				space: !1,
				cell: t.height,
				ascent: 0,
				descent: 0
			};
		}
	});
	e.save();
	for (let t of l.glyphs) {
		if (t.style.equation) {
			t.style.equation.draw(t.axisX - t.thickness / 2, t.cellTop);
			continue;
		}
		if (!t.space) if (e.font = t.style.font, e.fillStyle = t.style.color, e.textAlign = "center", e.textBaseline = "alphabetic", t.kind === "upright") e.fillText(t.text, t.axisX, t.cellTop + t.cell - t.descent);
		else {
			let n = t.text.codePointAt(0) ?? 0, r = t.kind === "verticalGlyph" && t.text === String.fromCodePoint(n) ? E(n) ?? I(n) : null;
			r === null ? (e.save(), e.translate(t.axisX - (t.ascent - t.descent) / 2, t.cellTop), e.rotate(Math.PI / 2), e.textAlign = "left", e.fillText(t.text, 0, 0), e.restore()) : (e.textAlign = "left", e.fillText(String.fromCodePoint(r), t.axisX - (t.ascent + t.descent) / 2, t.cellTop + t.ascent));
		}
	}
	e.restore();
}
//#endregion
//#region packages/xlsx/src/dxf-font.ts
var _t = [
	"bold",
	"italic",
	"underline",
	"strike"
];
function vt(e, t) {
	if (e.font) return e.fontToggles ? e.fontToggles[t] : e.font[t] || void 0;
}
//#endregion
//#region packages/xlsx/src/renderer-coordinate-index.ts
var yt = t, bt = 2 ** 53 - 1 - 1;
function xt(e) {
	let t = e.limit;
	if (t === void 0) return yt;
	if (typeof t != "number") throw TypeError("coordinate index limit must be a number");
	if (!Number.isSafeInteger(t) || t <= 0 || t > bt) throw RangeError(`coordinate index limit must be a positive safe integer no greater than ${bt}`);
	return t;
}
function St(t, n, r, i) {
	return new e(`XLSX renderer ${t.resource} exceeded its limit of ${n} entries`, {
		stage: "rendering",
		violation: {
			format: "xlsx",
			operation: t.operation,
			resource: t.resource,
			metric: "entry-count",
			limit: n,
			observed: Math.min(r, n + 1),
			configurable: i,
			usage: {
				archiveEntryCount: 0,
				declaredInflatedBytes: 0,
				distinctInflatedBytes: 0,
				operationInflatedBytes: 0
			}
		}
	});
}
function Ct(e, t, n = 0) {
	let r = xt(t), { top: i, bottom: a, left: o, right: s } = e;
	if (!Number.isSafeInteger(i) || !Number.isSafeInteger(a) || !Number.isSafeInteger(o) || !Number.isSafeInteger(s) || !Number.isSafeInteger(n) || n < 0) throw St(t, r, r + 1, !1);
	if (a < i || s < o) return 0;
	let c = a - i + 1, l = s - o + 1;
	if (!Number.isSafeInteger(c) || !Number.isSafeInteger(l)) throw St(t, r, r + 1, !1);
	let u;
	if (l <= Math.floor((2 ** 53 - 1) / c)) {
		let e = c * l;
		if (n > e) throw St(t, r, r + 1, !1);
		u = e - n;
	} else {
		let e = BigInt(c) * BigInt(l), i = BigInt(n);
		if (i > e) throw St(t, r, r + 1, !1);
		let a = e - i;
		if (a > BigInt(2 ** 53 - 1)) throw St(t, r, r + 1, !1);
		u = Number(a);
	}
	if (u > r) throw St(t, r, u, !0);
	return u;
}
function wt(e, t, n, r) {
	let i = xt(r);
	if (!e.has(t) && e.size >= i) throw St(r, i, e.size + 1, !0);
	e.set(t, n);
}
function Tt(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e) for (let e of r.cells) wt(n, `${e.row}:${e.col}`, e, t);
	return n;
}
function Et(e, t, n) {
	let r = xt(n);
	if (!e.has(t) && e.size >= r) throw St(n, r, e.size + 1, !0);
	e.add(t);
}
//#endregion
//#region packages/xlsx/src/pivot-style.ts
var Dt = [
	"wholeTable",
	"pageFieldLabels",
	"pageFieldValues",
	"firstColumnStripe",
	"secondColumnStripe",
	"firstRowStripe",
	"secondRowStripe",
	"firstColumn",
	"headerRow",
	"firstHeaderCell",
	"firstSubtotalColumn",
	"secondSubtotalColumn",
	"thirdSubtotalColumn",
	"blankRow",
	"firstSubtotalRow",
	"secondSubtotalRow",
	"thirdSubtotalRow",
	"firstColumnSubheading",
	"secondColumnSubheading",
	"thirdColumnSubheading",
	"firstRowSubheading",
	"secondRowSubheading",
	"thirdRowSubheading",
	"lastColumn",
	"totalRow"
], Ot = new Set([
	"default",
	"sum",
	"countA",
	"avg",
	"max",
	"min",
	"product",
	"count",
	"stdDev",
	"stdDevP",
	"var",
	"varP"
]);
function kt(e) {
	return e === 0 ? "first" : e % 2 == 1 ? "second" : "third";
}
function At(e, t, n, r) {
	let i = {
		first: [],
		second: []
	}, a = e, o = !0;
	for (; a <= t;) {
		let e = Math.min(t, a + Math.max(1, o ? n : r) - 1);
		(o ? i.first : i.second).push({
			top: a,
			bottom: e,
			left: 0,
			right: 0
		}), a = e + 1, o = !o;
	}
	return i;
}
function jt(e, t) {
	let n = e.style, { top: r, bottom: i, left: a, right: o, firstDataRow: s, firstDataCol: c } = e.location, l = r + s, u = a + c, d = /* @__PURE__ */ new Map(), f = (e, t) => {
		if (t.top > t.bottom || t.left > t.right) return;
		let n = d.get(e);
		n ? n.push(t) : d.set(e, [t]);
	};
	if (f("wholeTable", {
		top: r,
		bottom: i,
		left: a,
		right: o
	}), n.showColumnStripes) {
		let e = At(u, o, t.get("firstColumnStripe") ?? 1, t.get("secondColumnStripe") ?? 1);
		for (let t of e.first) f("firstColumnStripe", {
			top: l,
			bottom: i,
			left: t.top,
			right: t.bottom
		});
		for (let t of e.second) f("secondColumnStripe", {
			top: l,
			bottom: i,
			left: t.top,
			right: t.bottom
		});
	}
	if (n.showRowStripes) {
		let e = At(l, i, t.get("firstRowStripe") ?? 1, t.get("secondRowStripe") ?? 1);
		for (let t of e.first) f("firstRowStripe", {
			...t,
			left: a,
			right: o
		});
		for (let t of e.second) f("secondRowStripe", {
			...t,
			left: a,
			right: o
		});
	}
	n.showRowHeaders && f("firstColumn", {
		top: r,
		bottom: i,
		left: a,
		right: u - 1
	}), n.showColumnHeaders && f("headerRow", {
		top: r,
		bottom: l - 1,
		left: a,
		right: o
	}), f("firstHeaderCell", {
		top: r,
		bottom: l - 2,
		left: a,
		right: u - 1
	});
	let p = Math.max(0, e.rowFields.length - 1);
	return (e.rowItems ?? []).forEach((e, t) => {
		let r = l + t;
		if (r > i) return;
		let s = {
			top: r,
			bottom: r,
			left: a,
			right: o
		}, c = kt(e.depth);
		e.kind === "blank" ? f("blankRow", s) : e.kind === "grand" ? f("totalRow", s) : Ot.has(e.kind) ? f(`${c}SubtotalRow`, s) : e.kind === "data" && e.depth < p && n.showRowHeaders && f(`${c}RowSubheading`, s);
	}), (e.columnItems ?? []).forEach((e, t) => {
		let a = u + t;
		if (a > o) return;
		let s = {
			top: r,
			bottom: i,
			left: a,
			right: a
		}, c = kt(e.depth);
		e.kind === "grand" ? n.showLastColumn && f("lastColumn", s) : Ot.has(e.kind) && f(`${c}SubtotalColumn`, s);
	}), d;
}
function Mt(e, t, n, r, i) {
	t.fill && (e.fill = t.fill);
	let a = t.font;
	if (a) {
		a.color && (e.fontColor = a.color);
		for (let n of _t) {
			let r = vt(t, n);
			r !== void 0 && (e[n] = r);
		}
	}
	let o = t.border;
	if (!o) return;
	let s = (e, t, n) => n ? e : t, c = s(o.top, o.horizontal, r === n.top), l = s(o.bottom, o.horizontal, r === n.bottom), u = s(o.left, o.vertical, i === n.left), d = s(o.right, o.vertical, i === n.right);
	c && (e.top = c), l && (e.bottom = l), u && (e.left = u), d && (e.right = d);
}
function Nt(e) {
	let t = /* @__PURE__ */ new Map(), n = {
		resource: "worksheet-pivot-style-index",
		operation: "expand-pivot-style-coordinates",
		limit: je(e).maxCoordinateIndexEntries
	};
	for (let r of e.pivotTables ?? []) {
		let e = r.style;
		if (!e || e.elements.length === 0) continue;
		let i = new Map(e.elements.map((e) => [e.kind, e])), a = new Map(e.elements.map((e) => [e.kind, e.size]));
		Ct(r.location, n);
		let o = jt(r, a);
		for (let e of Dt) {
			let r = i.get(e), a = o.get(e);
			if (!(!r || !a)) for (let e of a) for (let i = e.top; i <= e.bottom; i++) for (let a = e.left; a <= e.right; a++) {
				let o = `${i}:${a}`, s = t.get(o);
				s || (s = {}, wt(t, o, s, n)), Mt(s, r.dxf, e, i, a);
			}
		}
	}
	return t;
}
//#endregion
//#region packages/xlsx/src/phonetic.ts
function Pt(e) {
	return Array.from(e);
}
function Ft(e, t, n, r, i) {
	let a = Pt(t), o = a.length, s = [];
	for (let t of e) {
		let e = t.sb, c = t.eb;
		if (!(e < c) || e >= o) continue;
		let l = Math.min(c, o), u = n + i(a.slice(0, e).join("")), d = i(a.slice(e, l).join("")), f = r === "center" ? "center" : r === "distributed" ? "distribute" : "start";
		s.push({
			text: t.text,
			x: u,
			width: d,
			spread: f
		});
	}
	return s;
}
//#endregion
//#region packages/xlsx/src/number-format.ts
function It(e) {
	switch (e.type) {
		case "empty": return "";
		case "text": return e.text;
		case "number": return String(e.number);
		case "bool": return e.bool ? "TRUE" : "FALSE";
		case "error": return e.error;
		case "shared": return "";
	}
}
function Lt(e, t, n, r = !1) {
	return Rt(e, t, n, r).text;
}
function Rt(e, t, n, r = !1) {
	let i = t.cellXfs[e.styleIndex ?? 0]?.numFmtId ?? 0, a = t.numFmts?.find((e) => e.numFmtId === i)?.formatCode ?? null, o = n?.numFmtId ?? i, s = n ? n.formatCode : a;
	if (e.value.type !== "number") {
		let t = It(e.value);
		return { text: s ? zt(t, s) : t };
	}
	return qt(e.value.number, o, s, r);
}
function zt(e, t) {
	let n = ie(t), r = me(n);
	if (r < 0) return e;
	let i = n[r];
	if (i === "") return "";
	let a = "", o = 0;
	for (; o < i.length;) {
		let t = i[o];
		if (t === "\"") {
			for (o++; o < i.length && i[o] !== "\"";) a += i[o++];
			o < i.length && o++;
		} else if (t === "\\") o + 1 < i.length && (a += i[o + 1]), o += 2;
		else if (t === "[") {
			for (; o < i.length && i[o] !== "]";) o++;
			o < i.length && o++;
		} else t === "@" ? (a += e, o++) : t === "_" || t === "*" ? o += 2 : (a += t, o++);
	}
	return a;
}
var Bt = {
	15: "d-mmm-yy",
	16: "d-mmm",
	17: "mmm-yy",
	18: "h:mm AM/PM",
	19: "h:mm:ss AM/PM",
	20: "h:mm",
	21: "h:mm:ss",
	22: "m/d/yyyy h:mm",
	27: "[$-411]ge.m.d",
	28: "[$-411]ggge\"年\"m\"月\"d\"日\"",
	29: "[$-411]ggge\"年\"m\"月\"d\"日\"",
	30: "m/d/yy",
	31: "yyyy\"年\"m\"月\"d\"日\"",
	45: "mm:ss",
	46: "[h]:mm:ss",
	47: "mm:ss.0",
	50: "[$-411]ge.m.d",
	51: "[$-411]ggge\"年\"m\"月\"d\"日\"",
	52: "yyyy\"年\"m\"月\"",
	53: "m\"月\"d\"日\"",
	54: "[$-411]ggge\"年\"m\"月\"d\"日\"",
	55: "yyyy\"年\"m\"月\"",
	56: "m\"月\"d\"日\"",
	57: "[$-411]ge.m.d",
	58: "[$-411]ggge\"年\"m\"月\"d\"日\""
}, Vt = 11, Ht = 6;
function Ut(e) {
	return e.includes(".") ? e.replace(/0+$/, "").replace(/\.$/, "") : e;
}
function Wt(e) {
	return `${e >= 0 ? "+" : "-"}${Math.abs(e).toString().padStart(2, "0")}`;
}
function Gt(e) {
	let [t, n] = e.toExponential(Ht - 1).split("e");
	return `${Ut(t)}E${Wt(Number(n))}`;
}
function Kt(e) {
	if (!Number.isFinite(e)) return String(e);
	if (e === 0) return "0";
	let t = e < 0, n = Math.abs(e), r = Number(n.toExponential(Vt - 1).split("e")[1]), i = r >= Vt || r < -5 ? Gt(n) : Ut(n.toPrecision(Vt));
	return t ? `-${i}` : i;
}
function qt(e, t, n, r = !1) {
	if (t === 14 && !n) return Jt(de(e, r), e, r);
	if (n && n.trim().toLowerCase() === "general") return { text: Kt(e) };
	if (n) return sn(e, n, r);
	let i = Bt[t];
	if (i) return Jt(ce(e, i, r), e, r);
	switch (t) {
		case 0: return { text: Kt(e) };
		case 1: return sn(e, "0");
		case 2: return sn(e, "0.00");
		case 3: return sn(e, "#,##0");
		case 4: return sn(e, "#,##0.00");
		case 9: return sn(e, "0%");
		case 10: return sn(e, "0.00%");
		case 11: return sn(e, "0.00E+00");
		case 37: return sn(e, "#,##0 ;(#,##0)");
		case 38: return sn(e, "#,##0 ;[Red](#,##0)");
		case 39: return sn(e, "#,##0.00;(#,##0.00)");
		case 40: return sn(e, "#,##0.00;[Red](#,##0.00)");
		case 48: return sn(e, "##0.0E+0");
		case 49: return { text: String(e) };
		default: return { text: Kt(e) };
	}
}
function Jt(e, t, n) {
	return e === "#" && !oe(t, n) ? {
		text: e,
		fill: !0
	} : { text: e };
}
var Yt = {
	black: "#000000",
	blue: "#0000FF",
	cyan: "#00FFFF",
	green: "#008000",
	magenta: "#FF00FF",
	red: "#FF0000",
	white: "#FFFFFF",
	yellow: "#FFFF00"
}, Xt = /* @__PURE__ */ "#000000.#FFFFFF.#FF0000.#00FF00.#0000FF.#FFFF00.#FF00FF.#00FFFF.#000000.#FFFFFF.#FF0000.#00FF00.#0000FF.#FFFF00.#FF00FF.#00FFFF.#800000.#008000.#000080.#808000.#800080.#008080.#C0C0C0.#808080.#9999FF.#993366.#FFFFCC.#CCFFFF.#660066.#FF8080.#0066CC.#CCCCFF.#000080.#FF00FF.#FFFF00.#00FFFF.#800080.#800000.#008080.#0000FF.#00CCFF.#CCFFFF.#CCFFCC.#FFFF99.#99CCFF.#FF99CC.#CC99FF.#FFCC99.#3366FF.#33CCCC.#99CC00.#FFCC00.#FF9900.#FF6600.#666699.#969696.#003366.#339966.#003300.#333300.#993300.#993366.#333399.#333333".split(".");
function Zt(e) {
	let t = "", n, r, i = 0;
	for (; i < e.length;) {
		let a = e[i];
		if (a === "\"") {
			for (t += a, i++; i < e.length && e[i] !== "\"";) t += e[i++];
			i < e.length && (t += e[i++]);
		} else if (a === "\\" || a === "_" || a === "*") t += a, i + 1 < e.length && (t += e[i + 1]), i += 2;
		else if (a === "[") {
			let o = e.indexOf("]", i);
			if (o < 0) {
				t += a, i++;
				continue;
			}
			let s = e.slice(i + 1, o), c = s.toLowerCase(), l = c.match(/^color(\d{1,2})$/), u = s.match(/^(<=|>=|<>|<|>|=)\s*(-?[0-9.]+(?:[eE][-+]?\d+)?)$/);
			if (c in Yt) n = Yt[c];
			else if (l) {
				let e = parseInt(l[1], 10);
				e >= 1 && e <= 56 && (n = Xt[e + 7] ?? n);
			} else u ? r = {
				op: u[1],
				value: Number(u[2])
			} : t += e.slice(i, o + 1);
			i = o + 1;
		} else t += a, i++;
	}
	return {
		body: t,
		color: n,
		condition: r
	};
}
function Qt(e, t) {
	switch (e.op) {
		case "<": return t < e.value;
		case "<=": return t <= e.value;
		case ">": return t > e.value;
		case ">=": return t >= e.value;
		case "=": return t === e.value;
		case "<>": return t !== e.value;
	}
}
function $t(e) {
	let t = [], n = "", r = "", i = !1, a = !1, o, s = !1, c = 0, l = 0, u = (e) => {
		if (!e) return;
		!a && !s && (c = n.replace(/,/g, "").length);
		let r = t[t.length - 1];
		r && r.kind === "lit" ? r.text += e : t.push({
			kind: "lit",
			text: e
		});
	}, d = 0;
	for (; d < e.length;) {
		let c = e[d];
		if (c === "\"") {
			d++;
			let t = "";
			for (; d < e.length && e[d] !== "\"";) t += e[d++];
			d < e.length && d++, u(t);
		} else if (c === "\\") d + 1 < e.length && u(e[d + 1]), d += 2;
		else if (c === "[") {
			let t = e.indexOf("]", d), n = t > d ? e.slice(d + 1, t) : "";
			if (n.startsWith("$")) {
				let e = n.slice(1), t = e.indexOf("-");
				u(t >= 0 ? e.slice(0, t) : e);
			}
			d = t < 0 ? e.length : t + 1;
		} else if (c === "_") u(" "), d += 2;
		else if (c === "*") u(e[d + 1] ?? ""), d += 2;
		else if (c === "#" || c === "0" || c === "?") a ? (r += c, t.push({
			kind: "fracph",
			ph: c
		})) : (n += c, t.push({
			kind: "intph",
			ph: c
		})), l = 0, d++;
		else if (c === ".") a = !0, t.push({ kind: "dot" }), d++;
		else if (c === ",") a || (n += ","), l++, d++;
		else if (c === "/" && n.replace(/,/g, "").length > 0) {
			s = !0, t.push({ kind: "fraction" }), d++;
			let n = "";
			for (; d < e.length && /[0-9#?]/.test(e[d]);) n += e[d++];
			t[t.length - 1].den = n;
		} else if (c === "%") i = !0, t.push({ kind: "percent" }), d++;
		else if ((c === "E" || c === "e") && (e[d + 1] === "+" || e[d + 1] === "-")) {
			let n = e[d + 1] === "+";
			d += 2;
			let r = 0;
			for (; d < e.length && (e[d] === "0" || e[d] === "#" || e[d] === "?");) r++, d++;
			o = {
				plus: n,
				width: Math.max(r, 1)
			}, t.push({ kind: "exp" });
		} else u(c), d++;
	}
	let f = l, p = /,(?=[#0?])/.test(n), m = n.replace(/,/g, ""), h;
	if (s) {
		let e = t.find((e) => e.kind === "fraction")?.den ?? "?", n = e.match(/[0-9]+/);
		h = {
			wholeSpec: m.slice(0, c),
			numSpec: m.slice(c) || "?",
			denSpec: e.replace(/[^0#?]/g, ""),
			fixedDen: n ? parseInt(n[0], 10) : null
		};
	}
	return {
		parts: t,
		intSpec: m,
		fracSpec: r,
		hasPercent: i,
		commaScale: f,
		grouping: p,
		exp: o,
		fraction: h
	};
}
function en(e) {
	return e.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function tn(e, t, n) {
	let r = t.split(""), i = e.split(""), a = [], o = i.length - 1, s = [];
	for (let e = r.length - 1; e >= 0; e--) o >= 0 ? (a.unshift(i[o]), s.unshift(i[o]), o--) : r[e] === "0" ? (a.unshift("0"), s.unshift("0")) : r[e] === "?" && a.unshift(" ");
	for (; o >= 0;) a.unshift(i[o]), s.unshift(i[o]), o--;
	if (n) {
		let e = en(s.join(""));
		return (a.length - s.length > 0 ? a.slice(0, a.length - s.length).join("") : "") + e;
	}
	return a.join("");
}
function nn(e, t) {
	let n = t.length;
	if (n === 0) return "";
	let r = e.padEnd(n, "0").slice(0, n).split("");
	for (let e = n - 1; e >= 0; e--) {
		let n = t[e] ?? "#";
		if (r[e] === "0" && n === "#") r[e] = "";
		else if (r[e] === "0" && n === "?") r[e] = " ";
		else break;
	}
	return r.join("");
}
function rn(e, t, n) {
	if (n !== null) return [Math.round(e * n), n];
	let r = 10 ** Math.max(t, 1) - 1, i = 0, a = 1, o = Math.abs(e), s = [0, 1], c = [1, 1];
	for (let t = 0; t < 100; t++) {
		let t = s[0] + c[0], n = s[1] + c[1];
		if (n > r) break;
		let l = t / n, u = Math.abs(l - e);
		if (u < o && (o = u, i = t, a = n), l < e) s = [t, n];
		else if (l > e) c = [t, n];
		else break;
	}
	return [i, a];
}
function an(e, t, n) {
	let r = $t(t), i = n ? Math.abs(e) : e;
	r.hasPercent && (i *= 100), r.commaScale > 0 && (i /= 1e3 ** r.commaScale);
	let a = i < 0 ? "-" : "", o = Math.abs(i);
	if (r.fraction) {
		let e = Math.floor(o), t = o - e, { wholeSpec: n, numSpec: i, denSpec: s, fixedDen: c } = r.fraction, l = n.length > 0, [u, d] = rn(t, s.length, c), f = (e, t) => {
			let n = String(e), r = t.includes("0") ? "0" : " ";
			for (; n.length < t.length;) n = r + n;
			return n;
		}, p = (e, t) => {
			let n = String(e), r = t.includes("0") ? "0" : " ";
			for (; n.length < t.length;) n += r;
			return n;
		}, m = a;
		if (l) {
			let t = e > 0 ? String(e) : n.includes("0") ? "0" : "";
			if (u === 0) {
				let e = c === null ? s.length || 1 : String(c).length;
				m += t + " ".repeat(1 + i.length + 1 + e);
			} else {
				let e = c === null ? p(d, s) : String(c);
				m += t + " " + f(u, i) + "/" + e;
			}
		} else {
			let t = u + e * d, n = c === null ? p(d, s) : String(c);
			m += f(t, i) + "/" + n;
		}
		return m;
	}
	if (r.exp) {
		let e = Math.max(r.intSpec.length, 1), t = r.fracSpec.length, n = 0, i = 0;
		o !== 0 && (i = Math.floor(Math.log10(o)), i = Math.floor(i / e) * e, n = o / 10 ** i, parseFloat(le(n, t)) >= 10 ** e && (i += e, n = o / 10 ** i));
		let [s, c = ""] = le(n, t).split(".");
		return a + on(r, tn(s, r.intSpec, !1), nn(c, r.fracSpec), "E" + (i < 0 ? "-" : r.exp.plus ? "+" : "") + String(Math.abs(i)).padStart(r.exp.width, "0"));
	}
	let s = r.fracSpec.length, [c, l = ""] = le(o, s).split("."), u = c.replace(/^0+/, ""), d = /[0]/.test(r.intSpec) || r.intSpec === "" && !1;
	return u === "" && d && (u = "0"), a + on(r, tn(u, r.intSpec, r.grouping), nn(l, r.fracSpec), "");
}
function on(e, t, n, r) {
	let i = t.split(""), a = [];
	e.parts.forEach((e, t) => {
		e.kind === "intph" && a.push(t);
	});
	let o = n.split(""), s = [];
	e.parts.forEach((e, t) => {
		e.kind === "fracph" && s.push(t);
	});
	let c = /* @__PURE__ */ new Map(), l = i.length - 1;
	for (let e = a.length - 1; e >= 0; e--) if (e === 0) {
		let t = "";
		for (; l >= 0;) t = i[l--] + t;
		c.set(a[e], t);
	} else l >= 0 ? c.set(a[e], i[l--]) : c.set(a[e], "");
	let u = /* @__PURE__ */ new Map();
	for (let e = 0; e < s.length; e++) u.set(s[e], o[e] ?? "");
	let d = e.fracSpec.length > 0 && (n.length > 0 || /[0?]/.test(e.fracSpec)), f = "";
	for (let t = 0; t < e.parts.length; t++) {
		let n = e.parts[t];
		n.kind === "lit" ? f += n.text : n.kind === "intph" ? f += c.get(t) ?? "" : n.kind === "fracph" ? f += u.get(t) ?? "" : n.kind === "dot" ? f += d ? "." : "" : n.kind === "percent" ? f += "%" : n.kind === "exp" && (f += r);
	}
	return f;
}
function sn(e, t, n = !1) {
	let r = ie(t), i = me(r), a = r.filter((e, t) => t !== i).map(Zt);
	if (a.length === 0) return { text: Kt(e) };
	let o = a.some((e) => e.condition), s, c = !1;
	if (o) {
		let t = !1;
		for (let n of a) if (n.condition) {
			if (Qt(n.condition, e)) {
				s = n, t = !0;
				break;
			}
		} else if (s ??= n, s === n) break;
		if (!s) return { text: "#" };
		c = t && e < 0;
	} else e > 0 ? s = a[0] : e < 0 ? a.length > 1 ? (s = a[1], c = !0) : s = a[0] : s = a.length > 2 ? a[2] : a[0];
	let l = c ? Math.abs(e) : e, u = se(s.body) ? Jt(ce(l, s.body, n), l, n) : { text: an(e, s.body, c) };
	return s.color ? {
		...u,
		color: s.color
	} : u;
}
//#endregion
//#region packages/xlsx/src/cf-operand.ts
var cn = Object.freeze({
	kind: "unsupported",
	reason: "syntax"
}), ln = Object.freeze({
	kind: "unsupported",
	reason: "outOfGrid"
}), un = Object.freeze({
	kind: "unsupported",
	reason: "unresolvedValue"
}), dn = Object.freeze({ kind: "error" }), fn = Object.freeze({
	kind: "value",
	value: null
}), pn = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/, mn = /^"(?:[^"]|"")*"$/, hn = /^(\$?)([A-Za-z]{1,3})(\$?)(\d{1,7})$/, gn = 1048576, _n = 16384;
function vn(e) {
	let t = e.trim();
	if (mn.test(t)) return t.slice(1, -1).replace(/""/g, "\"");
	if (pn.test(t)) {
		let e = Number(t);
		return Number.isFinite(e) ? e : void 0;
	}
}
function yn(e, t) {
	let n = vn(e);
	if (n !== void 0) return {
		kind: "value",
		value: n
	};
	let r = hn.exec(e.trim());
	if (!r) return cn;
	let i = 0;
	for (let e of r[2].toUpperCase()) i = i * 26 + (e.charCodeAt(0) - 64);
	let a = Number(r[4]);
	if (a < 1 || a > gn || i > _n) return cn;
	let o = r[3] === "$" ? a : a + (t.row - t.anchorRow), s = r[1] === "$" ? i : i + (t.col - t.anchorCol);
	if (o < 1 || o > gn || s < 1 || s > _n) return ln;
	let c = t.cellIndex.get(`${o}:${s}`)?.value;
	if (!c) return fn;
	switch (c.type) {
		case "empty": return fn;
		case "number": return {
			kind: "value",
			value: c.number
		};
		case "text": return {
			kind: "value",
			value: c.text
		};
		case "bool": return {
			kind: "value",
			value: c.bool
		};
		case "error": return dn;
		default: return un;
	}
}
//#endregion
//#region packages/xlsx/src/formula.ts
var bn = 1048576, xn = 16384, Sn = class {
	constructor(e) {
		this.code = e;
	}
}, Z = class extends Error {
	constructor(e, t) {
		super(`CF formula ${e}`), this.kind = e, this.code = t;
	}
};
function Cn(e) {
	return Array.isArray(e) ? e : [e];
}
function wn(e) {
	return Array.isArray(e) ? e[0] ?? 0 : e;
}
function Tn(e) {
	let t = wn(e);
	if (t instanceof Sn) throw new Z("error", t.code);
	return t;
}
function En(e) {
	return e.flatMap(Cn).map((e) => Tn(e));
}
var Dn = 8, On = 128, kn = 64 * 1024;
function An(e) {
	if (e.kind !== "value") return !1;
	try {
		return Mn(e.value);
	} catch (e) {
		if (e instanceof Z) return !1;
		throw e;
	}
}
function jn(e, t) {
	try {
		let n = Wn(e, t);
		return n instanceof Sn ? { kind: "error" } : {
			kind: "value",
			value: n
		};
	} catch (e) {
		if (e instanceof Z) return { kind: e.kind };
		throw e;
	}
}
function Mn(e) {
	let t = Tn(e);
	return typeof t == "boolean" ? t : typeof t == "number" ? t !== 0 : typeof t == "string" ? t.length > 0 && t.toUpperCase() !== "FALSE" : !1;
}
function Q(e) {
	let t = Tn(e);
	if (typeof t == "number") {
		if (!Number.isFinite(t)) throw new Z("error", "#NUM!");
		return t;
	}
	if (typeof t == "boolean") return +!!t;
	if (t == null) return 0;
	let n = Nn(t);
	if (n === null) throw new Z("error", "#VALUE!");
	return n;
}
function Nn(e) {
	if (!/^ *[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)? *$/u.test(e)) return null;
	let t = Number(e);
	return Number.isFinite(t) ? t : null;
}
function Pn(e) {
	let t = Tn(e);
	return t == null ? "" : typeof t == "boolean" ? t ? "TRUE" : "FALSE" : String(t);
}
function Fn(e) {
	return new Sn(e);
}
var In = new Set([
	"<",
	">",
	"=",
	"+",
	"-",
	"*",
	"/",
	"&",
	"^",
	"%"
]);
function Ln(e) {
	let t = [], n = 0, r = e;
	for (; n < r.length;) {
		let e = r[n];
		if (e === " " || e === "	" || e === "\n" || e === "\r") {
			n++;
			continue;
		}
		if (e === "(") {
			t.push({
				kind: "lparen",
				text: e
			}), n++;
			continue;
		}
		if (e === ")") {
			t.push({
				kind: "rparen",
				text: e
			}), n++;
			continue;
		}
		if (e === ",") {
			t.push({
				kind: "comma",
				text: e
			}), n++;
			continue;
		}
		if (e === ":") {
			t.push({
				kind: "colon",
				text: e
			}), n++;
			continue;
		}
		if (e === "\"") {
			let e = n + 1, i = "";
			for (; e < r.length;) {
				if (r[e] === "\"" && r[e + 1] === "\"") {
					i += "\"", e += 2;
					continue;
				}
				if (r[e] === "\"") break;
				i += r[e], e++;
			}
			if (e === r.length) throw new Z("invalid");
			t.push({
				kind: "str",
				text: i
			}), n = e + 1;
			continue;
		}
		if (e === "#") {
			let e = /^#(?:NULL!|DIV\/0!|VALUE!|REF!|NAME\?|NUM!|N\/A|GETTING_DATA)/u.exec(r.slice(n));
			if (!e) throw new Z("unsupported");
			t.push({
				kind: "error",
				text: e[0]
			}), n += e[0].length;
			continue;
		}
		if (e >= "0" && e <= "9" || e === "." && /[0-9]/u.test(r[n + 1] ?? "")) {
			let e = /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/u.exec(r.slice(n));
			if (!e || !Number.isFinite(Number(e[0]))) throw new Z("invalid");
			t.push({
				kind: "num",
				text: e[0]
			}), n += e[0].length;
			continue;
		}
		if (In.has(e)) {
			(e === "<" || e === ">") && (r[n + 1] === "=" || e === "<" && r[n + 1] === ">") ? (t.push({
				kind: "op",
				text: r.slice(n, n + 2)
			}), n += 2) : (t.push({
				kind: "op",
				text: e
			}), n++);
			continue;
		}
		if (e === "$" || Rn(e)) {
			let e = n;
			for (; e < r.length && (r[e] === "$" || zn(r[e]));) e++;
			let i = r.slice(n, e);
			n = e;
			let a = r[n] === "(" ? null : Bn(i);
			if (a) t.push({
				kind: "ref",
				text: i,
				ref: a
			});
			else {
				let e = i.toUpperCase();
				(e === "TRUE" || e === "FALSE") && r[n] !== "(" ? t.push({
					kind: "bool",
					text: e
				}) : t.push({
					kind: "name",
					text: i
				});
			}
			continue;
		}
		throw new Z("unsupported");
	}
	return t;
}
function Rn(e) {
	return e >= "A" && e <= "Z" || e >= "a" && e <= "z" || e === "_";
}
function zn(e) {
	return Rn(e) || e >= "0" && e <= "9" || e === ".";
}
function Bn(e) {
	let t = 0, n = !1, r = !1;
	e[t] === "$" && (n = !0, t++);
	let i = t;
	for (; t < e.length && e[t] >= "A" && e[t].toUpperCase() <= "Z" && !(!(e[t] >= "A" && e[t] <= "Z") && !(e[t] >= "a" && e[t] <= "z"));) t++;
	if (t === i) return null;
	let a = e.slice(i, t).toUpperCase();
	e[t] === "$" && (r = !0, t++);
	let o = t;
	for (; t < e.length && e[t] >= "0" && e[t] <= "9";) t++;
	if (t === o || t !== e.length) return null;
	let s = parseInt(e.slice(o, t), 10), c = 0;
	for (let e = 0; e < a.length; e++) c = c * 26 + (a.charCodeAt(e) - 64);
	return s < 1 || s > bn || c > xn ? null : {
		colAbs: n,
		col: c,
		rowAbs: r,
		row: s
	};
}
var Vn = /* @__PURE__ */ new WeakMap();
function Hn(e) {
	return e.replace(/[A-Z]+/gu, (e) => e.toLowerCase());
}
function Un(e, t) {
	let n = Vn.get(e);
	if (!n || n.size !== e.size) {
		let t = /* @__PURE__ */ new Map();
		for (let n of e.keys()) t.set(Hn(n), n);
		n = {
			size: e.size,
			keys: t
		}, Vn.set(e, n);
	}
	let r = n.keys.get(Hn(t));
	return r === void 0 ? void 0 : e.get(r);
}
function Wn(e, t) {
	return ar(Gn(e, t.definedNames, t.depth, {
		depth: 0,
		remainingNameSourceUnits: kn
	}), t);
}
function Gn(e, t, n, r) {
	let i = e.trim(), a = Ln(i.startsWith("=") ? i.slice(1) : i), o = {
		toks: a,
		pos: 0,
		budget: r,
		names: t,
		nameDepth: n
	}, s = Jn(o);
	if (o.pos !== a.length) throw new Z("unsupported");
	return s;
}
function Kn(e) {
	return e.toks[e.pos];
}
function qn(e) {
	return e.toks[e.pos++];
}
function Jn(e) {
	if (e.budget.depth >= On) throw new Z("unsupported");
	e.budget.depth++;
	try {
		return Yn(e);
	} finally {
		e.budget.depth--;
	}
}
function Yn(e) {
	let t = Zn(e), n = Kn(e);
	return n && n.kind === "op" && (n.text === "<" || n.text === ">" || n.text === "<=" || n.text === ">=" || n.text === "=" || n.text === "<>") ? (qn(e), {
		t: "bin",
		op: n.text,
		l: t,
		r: Zn(e)
	}) : t;
}
function Xn(e, t, n) {
	let r = n(e), i = [];
	for (;;) {
		let r = Kn(e);
		if (!r || r.kind !== "op" || !t.includes(r.text)) break;
		qn(e), i.push({
			op: r.text,
			r: n(e)
		});
	}
	return i.length ? {
		t: "chain",
		first: r,
		rest: i
	} : r;
}
function Zn(e) {
	return Xn(e, ["&"], Qn);
}
function Qn(e) {
	return Xn(e, ["+", "-"], $n);
}
function $n(e) {
	return Xn(e, ["*", "/"], rr);
}
function er(e, t, n) {
	switch (e) {
		case "&": return Pn(t) + Pn(n);
		case "+": return Q(t) + Q(n);
		case "-": return Q(t) - Q(n);
		case "*": return Q(t) * Q(n);
		case "/": {
			let e = Q(t), r = Q(n);
			return r === 0 ? Fn("#DIV/0!") : e / r;
		}
		default: return tr(e, Tn(t), Tn(n));
	}
}
function tr(e, t, n) {
	let r = typeof t == "string" && isNaN(parseFloat(t)) ? null : nr(t), i = typeof n == "string" && isNaN(parseFloat(n)) ? null : nr(n);
	if (r !== null && i !== null) switch (e) {
		case "<": return r < i;
		case ">": return r > i;
		case "<=": return r <= i;
		case ">=": return r >= i;
		case "=": return r === i;
		case "<>": return r !== i;
	}
	let a = String(t ?? ""), o = String(n ?? "");
	switch (e) {
		case "<": return a < o;
		case ">": return a > o;
		case "<=": return a <= o;
		case ">=": return a >= o;
		case "=": return a === o;
		case "<>": return a !== o;
	}
	return !1;
}
function nr(e) {
	let t = Tn(e);
	if (typeof t == "number") return t;
	if (typeof t == "boolean") return +!!t;
	if (t == null) return 0;
	let n = parseFloat(t);
	return isNaN(n) ? 0 : n;
}
function rr(e) {
	if (e.budget.depth >= On) throw new Z("unsupported");
	e.budget.depth++;
	try {
		let t = Kn(e);
		return t && t.kind === "op" && t.text === "-" ? (qn(e), {
			t: "neg",
			e: rr(e)
		}) : t && t.kind === "op" && t.text === "+" ? (qn(e), {
			t: "pos",
			e: rr(e)
		}) : ir(e);
	} finally {
		e.budget.depth--;
	}
}
function ir(e) {
	let t = qn(e);
	if (!t) throw new Z("invalid");
	if (t.kind === "num") return {
		t: "lit",
		v: parseFloat(t.text)
	};
	if (t.kind === "str") return {
		t: "lit",
		v: t.text
	};
	if (t.kind === "bool") return {
		t: "lit",
		v: t.text === "TRUE"
	};
	if (t.kind === "error") return {
		t: "lit",
		v: Fn(t.text)
	};
	if (t.kind === "lparen") {
		let t = Jn(e), n = qn(e);
		if (!n || n.kind !== "rparen") throw new Z("invalid");
		return t;
	}
	if (t.kind === "ref") {
		if (Kn(e)?.kind === "colon") {
			qn(e);
			let n = qn(e);
			if (n?.kind !== "ref" || !n.ref) throw new Z("invalid");
			return {
				t: "range",
				a: t.ref,
				b: n.ref
			};
		}
		return {
			t: "ref",
			ref: t.ref
		};
	}
	if (t.kind === "name") {
		if (Kn(e)?.kind === "lparen") {
			qn(e);
			let n = [];
			if (Kn(e)?.kind !== "rparen") for (n.push(Jn(e)); Kn(e)?.kind === "comma";) qn(e), n.push(Jn(e));
			let r = qn(e);
			if (!r || r.kind !== "rparen") throw new Z("invalid");
			let i = t.text.toUpperCase();
			return cr(i, n.length), {
				t: "call",
				name: i,
				args: n
			};
		}
		let n = Un(e.names, t.text);
		if (!n || e.nameDepth >= Dn || n.formula.length > e.budget.remainingNameSourceUnits) throw new Z("unsupported");
		return e.budget.remainingNameSourceUnits -= n.formula.length, {
			t: "name",
			body: Gn(lr(n.formula), e.names, e.nameDepth + 1, e.budget)
		};
	}
	throw new Z("invalid");
}
function ar(e, t) {
	try {
		return or(e, t);
	} catch (e) {
		if (e instanceof Z && e.kind === "error") return Fn(e.code ?? "#VALUE!");
		throw e;
	}
}
function or(e, t) {
	switch (e.t) {
		case "lit": return e.v;
		case "ref": return dr(e.ref, t);
		case "range": return hr(e.a, e.b, t);
		case "neg": return -Q(ar(e.e, t));
		case "pos": return Q(ar(e.e, t));
		case "bin": return er(e.op, ar(e.l, t), ar(e.r, t));
		case "chain": {
			let n = ar(e.first, t);
			for (let { op: r, r: i } of e.rest) n = er(r, n, ar(i, t));
			return n;
		}
		case "call": return yr(e.name, e.args, t);
		case "name": return ar(e.body, {
			...t,
			anchorRow: 1,
			anchorCol: 1
		});
	}
}
var sr = {
	AND: [1, 255],
	OR: [1, 255],
	NOT: [1, 1],
	IF: [2, 3],
	IFERROR: [2, 2],
	IFS: [2, 254],
	TRUE: [0, 0],
	FALSE: [0, 0],
	ISBLANK: [1, 1],
	ISNUMBER: [1, 1],
	ISTEXT: [1, 1],
	ISNONTEXT: [1, 1],
	ISERROR: [1, 1],
	ISERR: [1, 1],
	ISNA: [1, 1],
	ISLOGICAL: [1, 1],
	ROUNDDOWN: [2, 2],
	ROUNDUP: [2, 2],
	ROUND: [2, 2],
	INT: [1, 1],
	TRUNC: [1, 2],
	CEILING: [2, 2],
	FLOOR: [2, 2],
	MOD: [2, 2],
	POWER: [2, 2],
	SQRT: [1, 1],
	ABS: [1, 1],
	SIGN: [1, 1],
	EXP: [1, 1],
	LN: [1, 1],
	LOG10: [1, 1],
	MIN: [1, 255],
	MAX: [1, 255],
	SUM: [1, 255],
	AVERAGE: [1, 255],
	COUNT: [1, 255],
	COUNTA: [1, 255],
	COUNTBLANK: [1, 1],
	COUNTIF: [2, 2],
	SUMIF: [2, 3],
	AVERAGEIF: [2, 3],
	LEN: [1, 1],
	LEFT: [1, 2],
	RIGHT: [1, 2],
	MID: [3, 3],
	UPPER: [1, 1],
	LOWER: [1, 1],
	TRIM: [1, 1],
	EXACT: [2, 2],
	FIND: [2, 3],
	SEARCH: [2, 3],
	CONCATENATE: [1, 255],
	CONCAT: [1, 253],
	T: [1, 1],
	N: [1, 1],
	VALUE: [1, 1],
	ROW: [0, 1],
	COLUMN: [0, 1],
	TODAY: [0, 0],
	NOW: [0, 0],
	DATE: [3, 3],
	YEAR: [1, 1],
	MONTH: [1, 1],
	DAY: [1, 1],
	WEEKDAY: [1, 2]
};
function cr(e, t) {
	let n = sr[e];
	if (!n) throw new Z("unsupported");
	if (t < n[0] || t > n[1] || e === "IFS" && t % 2 != 0) throw new Z("invalid");
}
function lr(e) {
	let t = e.match(/^(?:'[^']*'|[A-Za-z_][A-Za-z0-9_.]*)!(.*)$/);
	return t ? t[1] : e;
}
function ur(e, t) {
	return {
		col: e.colAbs ? e.col : e.col + (t.col - t.anchorCol),
		row: e.rowAbs ? e.row : e.row + (t.row - t.anchorRow)
	};
}
function dr(e, t) {
	let { row: n, col: r } = ur(e, t);
	return vr(t.cellIndex.get(`${n}:${r}`));
}
var fr = 4096;
function pr(e, t, n) {
	let r = ur(e, n), i = ur(t, n);
	return {
		r1: Math.min(r.row, i.row),
		c1: Math.min(r.col, i.col),
		r2: Math.max(r.row, i.row),
		c2: Math.max(r.col, i.col)
	};
}
function mr({ r1: e, c1: t, r2: n, c2: r }, i) {
	if ((n - e + 1) * (r - t + 1) > fr) throw new Z("unsupported");
	let a = [];
	for (let o = e; o <= n; o++) for (let e = t; e <= r; e++) a.push(vr(i.cellIndex.get(`${o}:${e}`)));
	return a;
}
function hr(e, t, n) {
	return mr(pr(e, t, n), n);
}
function gr(e, t) {
	switch (e.t) {
		case "ref": {
			let { row: n, col: r } = ur(e.ref, t);
			return {
				r1: n,
				c1: r,
				r2: n,
				c2: r
			};
		}
		case "range": return pr(e.a, e.b, t);
		case "name": return gr(e.body, {
			...t,
			anchorRow: 1,
			anchorCol: 1
		});
		default: return null;
	}
}
function _r(e, t, n) {
	let r = gr(e, n), i = gr(t, n);
	if (!r || !i) return null;
	let a = i.r1 + (r.r2 - r.r1), o = i.c1 + (r.c2 - r.c1);
	if (i.r1 < 1 || i.c1 < 1 || a > bn || o > xn) throw new Z("unsupported");
	return mr({
		r1: i.r1,
		c1: i.c1,
		r2: a,
		c2: o
	}, n);
}
function vr(e) {
	if (!e) return null;
	switch (e.value.type) {
		case "number": return e.value.number;
		case "bool": return e.value.bool;
		case "text": return e.value.text;
		case "error": return Fn(e.value.error);
		default: return null;
	}
}
function yr(e, t, n) {
	let r = (e) => ar(t[e], n);
	switch (e) {
		case "IF": return Mn(r(0)) ? r(1) : t.length > 2 ? r(2) : !1;
		case "IFERROR": {
			let e = wn(r(0));
			return (e instanceof Sn ? r(1) : e) ?? "";
		}
		case "ISERROR": return wn(r(0)) instanceof Sn;
		case "ISERR": {
			let e = wn(r(0));
			return e instanceof Sn && e.code !== "#N/A";
		}
		case "ISNA": {
			let e = wn(r(0));
			return e instanceof Sn && e.code === "#N/A";
		}
		case "ROW":
		case "COLUMN": {
			let r = t[0], i = r === void 0 ? n : r.t === "ref" ? ur(r.ref, n) : null;
			if (!i) throw new Z("unsupported");
			return e === "ROW" ? i.row : i.col;
		}
		case "SUMIF":
		case "AVERAGEIF": {
			let i = Cn(r(0)), a = r(1), o = t.length > 2 ? _r(t[0], t[2], n) ?? Cn(r(2)) : null;
			return e === "SUMIF" ? Sr(i, a, o) : Cr(i, a, o);
		}
	}
	let i = t.map((e) => ar(e, n));
	switch (e) {
		case "IFS":
			En(i);
			for (let e = 0; e < i.length; e += 2) if (Mn(i[e])) return i[e + 1];
			return Fn("#N/A");
		case "AND": return En(i).every((e) => Mn(e));
		case "OR": return En(i).some((e) => Mn(e));
		case "NOT": return !Mn(i[0]);
		case "TRUE": return !0;
		case "FALSE": return !1;
		case "ISBLANK": return wn(i[0]) === null;
		case "ISNUMBER": return typeof wn(i[0]) == "number";
		case "ISTEXT": return typeof wn(i[0]) == "string";
		case "ISNONTEXT": return typeof wn(i[0]) != "string";
		case "ISLOGICAL": return typeof wn(i[0]) == "boolean";
		case "ROUNDDOWN": {
			let e = Q(i[0]), t = 10 ** Q(i[1]);
			return (e >= 0 ? Math.floor(e * t) : Math.ceil(e * t)) / t;
		}
		case "ROUNDUP": {
			let e = Q(i[0]), t = 10 ** Q(i[1]);
			return (e >= 0 ? Math.ceil(e * t) : Math.floor(e * t)) / t;
		}
		case "ROUND": return br(Q(i[0]), Q(i[1]));
		case "INT": return Math.floor(Q(i[0]));
		case "TRUNC": {
			let e = Q(i[0]), t = 10 ** Q(i[1] ?? 0);
			return (e >= 0 ? Math.floor(e * t) : Math.ceil(e * t)) / t;
		}
		case "CEILING": {
			let e = Q(i[0]), t = Q(i[1]);
			return t === 0 ? 0 : Math.ceil(e / t) * t;
		}
		case "FLOOR": {
			let e = Q(i[0]), t = Q(i[1]);
			return t === 0 ? 0 : Math.floor(e / t) * t;
		}
		case "MOD": {
			let e = Q(i[0]), t = Q(i[1]);
			return t === 0 ? Fn("#DIV/0!") : e - Math.floor(e / t) * t;
		}
		case "POWER": return Q(i[0]) ** +Q(i[1]);
		case "SQRT": {
			let e = Q(i[0]);
			return e < 0 ? Fn("#NUM!") : Math.sqrt(e);
		}
		case "ABS": return Math.abs(Q(i[0]));
		case "SIGN": {
			let e = Q(i[0]);
			return e > 0 ? 1 : e < 0 ? -1 : 0;
		}
		case "EXP": return Math.exp(Q(i[0]));
		case "LN": {
			let e = Q(i[0]);
			return e <= 0 ? Fn("#NUM!") : Math.log(e);
		}
		case "LOG10": {
			let e = Q(i[0]);
			return e <= 0 ? Fn("#NUM!") : Math.log10(e);
		}
		case "MIN": {
			let e = En(i).filter((e) => typeof e == "number");
			return e.length ? Math.min(...e) : 0;
		}
		case "MAX": {
			let e = En(i).filter((e) => typeof e == "number");
			return e.length ? Math.max(...e) : 0;
		}
		case "SUM": return En(i).reduce((e, t) => e + (typeof t == "number" ? t : 0), 0);
		case "AVERAGE": {
			let e = En(i).filter((e) => typeof e == "number");
			return e.length ? e.reduce((e, t) => e + t, 0) / e.length : Fn("#DIV/0!");
		}
		case "COUNT": return i.flatMap(Cn).filter((e) => typeof e == "number").length;
		case "COUNTA": return i.flatMap(Cn).filter((e) => e != null && e !== "").length;
		case "COUNTBLANK": return i.flatMap(Cn).filter((e) => e == null || e === "").length;
		case "COUNTIF": return xr(Cn(i[0]), i[1]);
		case "LEN": return Pn(i[0]).length;
		case "LEFT": return Pn(i[0]).slice(0, Math.max(0, Q(i[1] ?? 1)));
		case "RIGHT": {
			let e = Pn(i[0]), t = Math.max(0, Q(i[1] ?? 1));
			return t >= e.length ? e : e.slice(e.length - t);
		}
		case "MID": {
			let e = Pn(i[0]), t = Math.max(1, Q(i[1])) - 1, n = Math.max(0, Q(i[2]));
			return e.slice(t, t + n);
		}
		case "UPPER": return Pn(i[0]).toUpperCase();
		case "LOWER": return Pn(i[0]).toLowerCase();
		case "TRIM": return Pn(i[0]).replace(/\s+/g, " ").trim();
		case "EXACT": return Pn(i[0]) === Pn(i[1]);
		case "FIND": {
			let e = Pn(i[0]), t = Pn(i[1]), n = Math.max(1, Q(i[2] ?? 1)) - 1, r = t.indexOf(e, n);
			return r < 0 ? Fn("#VALUE!") : r + 1;
		}
		case "SEARCH": {
			let e = Pn(i[0]).toLowerCase(), t = Pn(i[1]).toLowerCase(), n = Math.max(1, Q(i[2] ?? 1)) - 1, r = t.indexOf(e, n);
			return r < 0 ? Fn("#VALUE!") : r + 1;
		}
		case "CONCATENATE":
		case "CONCAT": return i.flatMap(Cn).map((e) => Pn(e)).join("");
		case "T": {
			let e = Tn(i[0]);
			return typeof e == "string" ? e : "";
		}
		case "N": {
			let e = Tn(i[0]);
			return typeof e == "number" ? e : typeof e == "boolean" ? +!!e : 0;
		}
		case "VALUE": return Q(i[0]);
		case "TODAY": return Tr();
		case "NOW": return Er();
		case "DATE": return Dr(Q(i[0]), Q(i[1]), Q(i[2]));
		case "YEAR": return kr(Q(i[0])).y;
		case "MONTH": return kr(Q(i[0])).m;
		case "DAY": return kr(Q(i[0])).d;
		case "WEEKDAY": {
			let e = Or(Q(i[0])).getUTCDay(), t = Q(i[1] ?? 1);
			return t === 2 ? e === 0 ? 7 : e : t === 3 ? e === 0 ? 6 : e - 1 : e + 1;
		}
		default: throw new Z("unsupported");
	}
}
function br(e, t) {
	if (!Number.isInteger(t)) throw new Z("unsupported");
	if (e === 0) return 0;
	let n = Math.max(-400, Math.min(400, t)), [r, i = "0"] = String(Math.abs(e)).split("e"), a = r.indexOf("."), o = r.replace(".", ""), s = (a === -1 ? r.length : a) + Number(i) + n;
	if (s >= o.length) return e;
	if (s < 0) return 0;
	let c = (s === 0 ? 0n : BigInt(o.slice(0, s))) + (o[s] >= "5" ? 1n : 0n), l = Number(`${c}e${-n}`);
	if (!Number.isFinite(l)) throw new Z("error", "#NUM!");
	return l === 0 ? 0 : Math.sign(e) * l;
}
function xr(e, t) {
	let n = wr(t), r = 0;
	for (let t of e) n(t) && r++;
	return r;
}
function Sr(e, t, n) {
	let r = wr(t), i = n ?? e, a = 0;
	for (let t = 0; t < e.length; t++) if (r(e[t])) {
		let e = i[t];
		typeof e == "number" && (a += e);
	}
	return a;
}
function Cr(e, t, n) {
	let r = wr(t), i = n ?? e, a = 0, o = 0;
	for (let t = 0; t < e.length; t++) if (r(e[t])) {
		let e = i[t];
		if (e === null) continue;
		typeof e == "number" && (a += e), o++;
	}
	return o === 0 ? Fn("#DIV/0!") : a / o;
}
function wr(e) {
	let t = wn(e);
	if (t instanceof Sn) throw new Z("unsupported");
	if (typeof t != "string") {
		let e = typeof t == "number" ? t : null;
		return (n) => e !== null && typeof n == "number" ? n === e : n === t;
	}
	let n = t.match(/^(<=|>=|<>|<|>|=)(.*)$/), r = n ? n[1] : "=", i = n ? n[2] : t, a = i.trim() === "" ? NaN : parseFloat(i), o = !isNaN(a) && /^-?\d+(\.\d+)?$/.test(i.trim());
	return (e) => {
		if (o && typeof e == "number") switch (r) {
			case "<": return e < a;
			case ">": return e > a;
			case "<=": return e <= a;
			case ">=": return e >= a;
			case "<>": return e !== a;
			default: return e === a;
		}
		let t = e == null ? "" : typeof e == "boolean" ? e ? "TRUE" : "FALSE" : e instanceof Sn ? e.code : String(e);
		switch (r) {
			case "<>": return t !== i;
			case "<": return t < i;
			case ">": return t > i;
			case "<=": return t <= i;
			case ">=": return t >= i;
			default: return t === i;
		}
	};
}
function Tr() {
	let e = /* @__PURE__ */ new Date();
	return K(new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())), !1);
}
function Er() {
	return K(new Date(Date.now()), !1);
}
function Dr(e, t, n) {
	return Math.floor(K(new Date(Date.UTC(e, t - 1, n)), !1));
}
function Or(e) {
	return q(Math.floor(e), !1);
}
function kr(e) {
	let t = Or(e);
	return {
		y: t.getUTCFullYear(),
		m: t.getUTCMonth() + 1,
		d: t.getUTCDate()
	};
}
//#endregion
//#region packages/xlsx/src/conditional-format.ts
var Ar = [
	[1, "expression"],
	[2, "cellIs"],
	[4, "activity"],
	[8, "threshold"]
];
function jr(e, t, n) {
	for (let r of e) if (t >= r.top && t <= r.bottom && n >= r.left && n <= r.right) return !0;
	return !1;
}
function Mr(e) {
	return e && e.value.type === "number" ? e.value.number : null;
}
function Nr(e) {
	return e && e.value.type === "text" ? e.value.text : null;
}
function Pr(e, t) {
	let n = [];
	for (let r of e.rows) for (let e of r.cells) e.value.type === "number" && jr(t, e.row, e.col) && n.push(e.value.number);
	return n;
}
function Fr(e) {
	let t = e.value;
	if (t == null || t.trim() === "") return e.kind === "formula" ? "invalid" : void 0;
	let n = vn(t);
	return typeof n == "number" ? n : "unsupported";
}
function Ir(e, t) {
	let n = t.length ? Infinity : 0, r = t.length ? -Infinity : 0;
	for (let e of t) e < n && (n = e), e > r && (r = e);
	if (e.kind === "min") return n;
	if (e.kind === "max") return r;
	if (![
		"num",
		"formula",
		"percent",
		"percentile"
	].includes(e.kind)) return "unsupported";
	let i = Fr(e);
	if (typeof i == "string") return i;
	switch (e.kind) {
		case "percent": {
			let e = i ?? 50;
			return n + (r - n) * (e / 100);
		}
		case "percentile": {
			if (!t.length) return 0;
			let e = [...t].sort((e, t) => e - t), n = (i ?? 50) / 100;
			return e[Math.max(0, Math.min(e.length - 1, Math.round(n * (e.length - 1))))];
		}
		default: return i ?? 0;
	}
}
function Lr(e, t) {
	let n = !0;
	for (let r of t) r === "unsupported" ? (e.thresholdUnsupported = !0, n = !1) : r === "invalid" && (e.thresholdInvalid = !0, n = !1);
	return n ? t : void 0;
}
function Rr(e, t = zr(e)) {
	let n = [], r = /* @__PURE__ */ new Map();
	for (let t of e.definedNames ?? []) r.set(t.name, t);
	let i = e.conditionalFormats ?? [];
	for (let t = 0; t < i.length; t++) {
		let r = i[t], a = r.rules.some((e) => e.type !== "expression" && e.type !== "cellIs" && e.type !== "other" && !(e.type === "dataBar" && e.extThresholdFormula)) ? Pr(e, r.sqref) : [];
		for (let e = 0; e < r.rules.length; e++) {
			let i = r.rules[e], o = {
				rule: i,
				sqref: r.sqref,
				blockIndex: t,
				ruleIndex: e
			};
			if (i.type === "colorScale") o.scaleStops = Lr(o, i.stops.map((e) => Ir(e, a)));
			else if (i.type === "dataBar") if (i.extThresholdFormula) o.thresholdUnsupported = !0;
			else {
				let e = Lr(o, [Ir(i.min, a), Ir(i.max, a)]);
				e && (o.barMin = e[0], o.barMax = e[1]);
			}
			else if (i.type === "top10") {
				let e = [...a].sort((e, t) => e - t), t = e.length;
				if (t > 0) {
					let n = Math.min(i.rank, t);
					if (i.percent) {
						let r = i.top ? 1 - n / 100 : n / 100;
						o.top10Threshold = e[Math.max(0, Math.min(t - 1, Math.round(r * (t - 1))))];
					} else o.top10Threshold = i.top ? e[Math.max(0, t - n)] : e[Math.min(t - 1, n - 1)];
					o.top10IsTop = i.top;
				}
			} else if (i.type === "aboveAverage") {
				if (a.length > 0) {
					let e = a.reduce((e, t) => e + t, 0) / a.length;
					if (o.avgValue = e, o.avgIsAbove = i.aboveAverage, i.stdDev && i.stdDev > 0) {
						let t = a.reduce((t, n) => t + (n - e) * (n - e), 0) / a.length;
						o.avgStdDev = Math.sqrt(t);
					}
				}
			} else i.type === "iconSet" ? o.iconThresholds = Lr(o, i.cfvos.map((e) => Ir(e, a))) : i.type === "cellIs" && (o.cellIsOperands = i.formulas.map(Hr));
			n.push(o);
		}
	}
	return n.sort((e, t) => (e.rule.priority ?? 0) - (t.rule.priority ?? 0)), {
		compiled: n,
		worksheet: e,
		cellIndex: t,
		definedNames: r
	};
}
function zr(e) {
	return Tt(e.rows, {
		resource: "worksheet-cell-index",
		operation: "index-worksheet-cells",
		limit: je(e).maxCoordinateIndexEntries
	});
}
var Br = new Set([
	"lessThan",
	"lessThanOrEqual",
	"equal",
	"notEqual",
	"greaterThanOrEqual",
	"greaterThan",
	"between",
	"notBetween",
	"containsText",
	"notContains",
	"beginsWith",
	"endsWith"
]);
function Vr(e, t, n) {
	switch (t) {
		case "greaterThan": return e > (n[0] ?? 0);
		case "greaterThanOrEqual": return e >= (n[0] ?? 0);
		case "lessThan": return e < (n[0] ?? 0);
		case "lessThanOrEqual": return e <= (n[0] ?? 0);
		case "equal": return e === (n[0] ?? 0);
		case "notEqual": return e !== (n[0] ?? 0);
		case "between": return e >= (n[0] ?? 0) && e <= (n[1] ?? 0);
		case "notBetween": return e < (n[0] ?? 0) || e > (n[1] ?? 0);
		default: return !1;
	}
}
function Hr(e) {
	let t = vn(e);
	return t === void 0 ? { formula: e } : { literal: t };
}
function Ur(e, t, n) {
	let r = n[0] ?? "", i = n[1] ?? "", a = (e) => e.toLowerCase();
	switch (t) {
		case "equal": return a(e) === a(r);
		case "notEqual": return a(e) !== a(r);
		case "containsText": return a(e).includes(a(r));
		case "notContains": return !a(e).includes(a(r));
		case "beginsWith": return a(e).startsWith(a(r));
		case "endsWith": return a(e).endsWith(a(r));
		case "between": return a(e) >= a(r) && a(e) <= a(i);
		case "notBetween": return a(e) < a(r) || a(e) > a(i);
		default: return !1;
	}
}
function Wr(e, t, n) {
	let r = e.replace("#", ""), i = t.replace("#", ""), a = parseInt(r.slice(0, 2), 16), o = parseInt(r.slice(2, 4), 16), s = parseInt(r.slice(4, 6), 16), c = parseInt(i.slice(0, 2), 16), l = parseInt(i.slice(2, 4), 16), u = parseInt(i.slice(4, 6), 16), d = Math.round(a + (c - a) * n), f = Math.round(o + (l - o) * n), p = Math.round(s + (u - s) * n);
	return `#${d.toString(16).padStart(2, "0").toUpperCase()}${f.toString(16).padStart(2, "0").toUpperCase()}${p.toString(16).padStart(2, "0").toUpperCase()}`;
}
function Gr(e, t, n) {
	if (!t.length) return "#FFFFFF";
	if (e <= n[0]) return t[0].color;
	if (e >= n[n.length - 1]) return t[t.length - 1].color;
	for (let r = 1; r < n.length; r++) if (e <= n[r]) {
		let i = n[r - 1], a = n[r], o = a === i ? 0 : (e - i) / (a - i);
		return Wr(t[r - 1].color, t[r].color, o);
	}
	return t[t.length - 1].color;
}
function Kr(e, t) {
	if (t && (t.fill && !e.fill && (e.fill = t.fill), t.font?.color && e.fontColor == null && (e.fontColor = t.font.color), e.fontBold ??= vt(t, "bold"), e.fontItalic ??= vt(t, "italic"), e.fontUnderline ??= vt(t, "underline"), e.fontStrike ??= vt(t, "strike"), t.numFmt && e.numFmt == null && (e.numFmt = {
		numFmtId: t.numFmt.numFmtId,
		formatCode: t.numFmt.formatCode || null
	}), t.border)) {
		let n = e.border ?? {};
		e.border = {
			left: n.left ?? t.border.left,
			right: n.right ?? t.border.right,
			top: n.top ?? t.border.top,
			bottom: n.bottom ?? t.border.bottom,
			diagonalUp: n.diagonalUp ?? t.border.diagonalUp,
			diagonalDown: n.diagonalDown ?? t.border.diagonalDown
		};
	}
}
function qr(e, t, n, r, i) {
	if (e == null) return "active";
	let a = t.sqref[0];
	if (!a) return "inactive";
	let o = yn(e, {
		row: n,
		col: r,
		anchorRow: a.top,
		anchorCol: a.left,
		cellIndex: i.cellIndex
	});
	return o.kind === "unsupported" ? "unsupported" : o.kind === "error" ? "inactive" : typeof o.value == "number" && o.value !== 0 ? "active" : "inactive";
}
function Jr(e) {
	return e.thresholdUnsupported === !0 || e.thresholdInvalid === !0;
}
function Yr(e, t, n, r, i, a) {
	let o = qr(t, e, n, r, i);
	return o === "unsupported" ? (a?.record(e, "activity", "unsupported", n, r), !1) : o === "inactive" ? !1 : Jr(e) ? (e.thresholdUnsupported && a?.record(e, "threshold", "unsupported", n, r), e.thresholdInvalid && a?.record(e, "threshold", "invalid", n, r), !1) : !0;
}
function Xr(e, t, n, r, i, a) {
	let o = {};
	if (!r.compiled.length) return o;
	for (let s of r.compiled) {
		if (!jr(s.sqref, t, n)) continue;
		let c = s.rule, l = Mr(e), u = !1;
		if (c.type === "expression") {
			let e = s.sqref[0];
			if (!e) continue;
			let l = jn(c.formula, {
				row: t,
				col: n,
				anchorRow: e.top,
				anchorCol: e.left,
				cellIndex: r.cellIndex,
				definedNames: r.definedNames,
				depth: 0
			});
			(l.kind === "unsupported" || l.kind === "invalid") && a?.record(s, "expression", l.kind, t, n), u = An(l), u && Kr(o, c.dxfId == null ? null : i[c.dxfId]);
		} else if (c.type === "cellIs") {
			let d = s.sqref[0];
			if (!d) continue;
			let f = s.cellIsOperands ?? [], p = c.operator === "between" || c.operator === "notBetween" ? 2 : 1;
			if (!Br.has(c.operator) || f.length < p) a?.record(s, "cellIs", "invalid", t, n);
			else {
				let i = [], o = !0;
				for (let e of f) {
					if ("literal" in e) {
						i.push(e.literal);
						continue;
					}
					let c = yn(e.formula, {
						row: t,
						col: n,
						anchorRow: d.top,
						anchorCol: d.left,
						cellIndex: r.cellIndex
					});
					if (c.kind === "value") {
						i.push(c.value);
						continue;
					}
					c.kind === "unsupported" && a?.record(s, "cellIs", "unsupported", t, n), o = !1;
					break;
				}
				let p = Nr(e);
				o && (l != null && i.every((e) => typeof e == "number") ? u = Vr(l, c.operator, i) : p != null && i.every((e) => typeof e == "string") && (u = Ur(p, c.operator, i)));
			}
			u && Kr(o, c.dxfId == null ? null : i[c.dxfId]);
		} else if (c.type === "other") for (let [e, r] of Ar) ((c.unsupportedFormulaPhases ?? 0) & e) !== 0 && a?.record(s, r, "unsupported", t, n);
		else if (c.type === "top10") {
			if (l == null || s.top10Threshold == null) continue;
			u = s.top10IsTop ? l >= s.top10Threshold : l <= s.top10Threshold, u && Kr(o, c.dxfId == null ? null : i[c.dxfId]);
		} else if (c.type === "aboveAverage") {
			if (l == null || s.avgValue == null) continue;
			let e = s.avgStdDev == null ? 0 : s.avgStdDev * (c.stdDev ?? 1), t = s.avgIsAbove ? s.avgValue + e : s.avgValue - e, n = c.equalAverage === !0;
			u = s.avgIsAbove ? n ? l >= t : l > t : n ? l <= t : l < t, u && Kr(o, c.dxfId == null ? null : i[c.dxfId]);
		} else if (c.type === "iconSet") {
			if (l == null || !Jr(s) && !s.iconThresholds?.length || !Yr(s, c.activeFormula, t, n, r, a)) continue;
			let e = s.iconThresholds;
			if (!e?.length) continue;
			u = !0;
			let i = e.length, d = 0;
			for (let t = 1; t < i; t++) l >= e[t] && (d = t);
			if (c.reverse && (d = i - 1 - d), c.customIcons && c.customIcons[d]) {
				let e = c.customIcons[d];
				e.iconSet !== "NoIcons" && (o.iconSet = {
					name: e.iconSet,
					index: e.iconId
				});
			} else o.iconSet = {
				name: c.iconSet,
				index: d
			};
		} else if (c.type === "colorScale") {
			if (l == null || !Jr(s) && !s.scaleStops || !Yr(s, c.activeFormula, t, n, r, a)) continue;
			let e = s.scaleStops;
			if (!e) continue;
			if (u = !0, !o.fill) {
				let t = Gr(l, c.stops, e);
				o.fill = {
					patternType: "solid",
					fgColor: t,
					bgColor: t
				};
			}
		} else if (c.type === "dataBar") {
			if (l == null || !Jr(s) && (s.barMin == null || s.barMax == null) || !Yr(s, c.activeFormula, t, n, r, a)) continue;
			let e = s.barMin, i = s.barMax;
			if (e == null || i == null) continue;
			if (u = !0, !o.dataBar) {
				let t = i - e, n = t === 0 ? 0 : Math.max(0, Math.min(1, (l - e) / t));
				o.dataBar = {
					color: c.color,
					ratio: n,
					gradient: c.gradient
				};
			}
		}
		if (u && c.stopIfTrue) break;
	}
	return o;
}
//#endregion
//#region packages/xlsx/src/bidi-line.ts
function Zr(e, t) {
	return e === 2 ? !0 : e === 1 ? !1 : Ue(void 0, t) === "rtl";
}
function Qr(e, t) {
	let n = e === 2 || _e(t);
	return {
		needBidi: n,
		baseRtl: n && Zr(e, t)
	};
}
var $r = (e, t) => k(e, t);
//#endregion
//#region packages/xlsx/src/a1.ts
function ei(e) {
	let t = /^\$?([A-Z]+)\$?(\d+)$/.exec(e.trim());
	if (!t) return null;
	let n = t[1], r = 0;
	for (let e = 0; e < n.length; e++) r = r * 26 + (n.charCodeAt(e) - 64);
	let i = parseInt(t[2], 10);
	return i < 1 || i > 1048576 || r > 16384 ? null : {
		row: i,
		col: r
	};
}
function ti(e, t) {
	let n = "", r = t;
	for (; r > 0;) {
		let e = (r - 1) % 26;
		n = String.fromCharCode(65 + e) + n, r = Math.floor((r - 1) / 26);
	}
	return `${n}${e}`;
}
//#endregion
//#region packages/xlsx/src/vertical-text.ts
function ni(e, t, n, r, i, a = !1) {
	let o = t.codePointAt(0) ?? 0, s = D(o);
	if (a && ee(o)) {
		e.save(), e.translate(n, r + i / 2), e.textAlign = "center", e.textBaseline = "middle", T(e, () => e.fillText(t, 0, 0)), e.restore();
		return;
	}
	if (s === "Tr") {
		let a = I(o);
		if (a !== null) {
			e.fillText(String.fromCodePoint(a), n, r);
			return;
		}
		if (j(o)) {
			e.fillText(t, n, r);
			return;
		}
		e.save(), e.translate(n, r + i / 2), e.rotate(Math.PI / 2), e.textAlign = "center", e.textBaseline = "middle", e.fillText(t, 0, 0), e.restore();
		return;
	}
	let c = s === "Tu" ? E(o) : null;
	e.fillText(c === null ? t : String.fromCodePoint(c), n, r);
}
//#endregion
//#region packages/xlsx/src/internal/cell-anchor-geometry.ts
function ri(e) {
	return e.editAs === "oneCell" && (e.nativeExtCx ?? 0) > 0 && (e.nativeExtCy ?? 0) > 0;
}
function ii(e, t, n, r, i) {
	let a = t.offsetOf(e.fromCol + 1) + e.fromColOff * r / Y, o = n.offsetOf(e.fromRow + 1) + e.fromRowOff * r / Y, s = ai(e, i);
	if (s) return {
		x: a,
		y: o,
		width: s.cx * r / Y,
		height: s.cy * r / Y
	};
	let c = t.offsetOf(e.toCol + 1) + e.toColOff * r / Y, l = n.offsetOf(e.toRow + 1) + e.toRowOff * r / Y;
	return {
		x: a,
		y: o,
		width: c - a,
		height: l - o
	};
}
function ai(e, t) {
	return e.anchorTag === void 0 ? ri(e) ? {
		cx: e.nativeExtCx,
		cy: e.nativeExtCy
	} : null : e.anchorTag === "oneCellAnchor" ? {
		cx: e.anchorExtCx ?? 0,
		cy: e.anchorExtCy ?? 0
	} : e.anchorTag === "twoCellAnchor" && e.editAs === "oneCell" && t !== void 0 ? {
		cx: t.cx,
		cy: t.cy
	} : null;
}
//#endregion
//#region packages/xlsx/src/internal/initial-anchor-sizes.ts
var oi = [
	"fromCol",
	"fromColOff",
	"fromRow",
	"fromRowOff",
	"toCol",
	"toColOff",
	"toRow",
	"toRowOff"
], si = Object.freeze([]), ci = Object.freeze({
	cx: 0,
	cy: 0
}), li = /* @__PURE__ */ new WeakMap(), ui = /* @__PURE__ */ new WeakSet();
function di(e) {
	return e.anchorTag === "twoCellAnchor" && e.editAs === "oneCell";
}
function fi(e) {
	let t, n = [e.images, e.shapeGroups];
	for (let e of n) for (let n of e ?? []) {
		if (!di(n)) continue;
		let e = n, r = 0;
		for (let t of [e.fromRow, e.toRow]) typeof t == "number" && Number.isFinite(t) && t >= 0 && (r = Math.max(r, Math.floor(t) + 1));
		t = Math.max(t ?? 0, r);
	}
	return t;
}
function pi(e) {
	let t = e * Y;
	return Number.isFinite(t) && t > 0 ? t : 0;
}
function mi(e) {
	throw Error(`XLSX initial anchor size reference does not match this worksheet projection: ${e}`);
}
function hi(e, t, n = 1) {
	if (!Number.isFinite(n) || n <= 0) throw RangeError(`XLSX initial anchor size capture requires a finite positive scale: ${n}`);
	let r = e.images ?? si, i = e.shapeGroups ?? si, a, o;
	for (let e = 0; e < 2; e++) {
		let s = e === 0 ? "image" : "shape", c = e === 0 ? r : i;
		for (let e = 0; e < c.length; e++) {
			let r = c[e];
			if (!di(r)) continue;
			o ??= t.axesAtScale(n);
			let i = ii(r, o.col, o.row, n);
			(a ??= []).push(Object.freeze({
				family: s,
				index: e,
				fromCol: r.fromCol,
				fromColOff: r.fromColOff,
				fromRow: r.fromRow,
				fromRowOff: r.fromRowOff,
				toCol: r.toCol,
				toColOff: r.toColOff,
				toRow: r.toRow,
				toRowOff: r.toRowOff,
				cx: pi(i.width / n),
				cy: pi(i.height / n)
			}));
		}
	}
	if (a) return Object.freeze({
		version: 1,
		imageCount: r.length,
		shapeGroupCount: i.length,
		entries: Object.freeze(a)
	});
}
function gi(e, t) {
	ui.has(t) && mi("the reference was released");
	let n = li.get(e);
	if (n) {
		if (n.reference === t && e.images === n.images && e.shapeGroups === n.shapeGroups) return;
		mi("the projection is already bound to another reference");
	}
	(t.version !== 1 || !Array.isArray(t.entries)) && mi("unsupported reference shape");
	let r = e.images ?? si, i = e.shapeGroups ?? si;
	(r.length !== t.imageCount || i.length !== t.shapeGroupCount) && mi("anchor counts differ");
	let a = /* @__PURE__ */ new WeakMap();
	for (let e of t.entries) {
		let t = e.family === "image" ? r : e.family === "shape" ? i : si, n = Number.isInteger(e.index) ? t[e.index] : void 0;
		(!n || !di(n) || a.has(n)) && mi(`${e.family}[${e.index}] is not an eligible anchor`);
		for (let t of oi) Object.is(n[t], e[t]) || mi(`${e.family}[${e.index}].${t} differs`);
		(!Number.isFinite(e.cx) || !Number.isFinite(e.cy) || e.cx < 0 || e.cy < 0) && mi(`${e.family}[${e.index}] has an invalid EMU size`), a.set(n, e);
	}
	let o = 0;
	for (let e of r) di(e) && o++;
	for (let e of i) di(e) && o++;
	o !== t.entries.length && mi("an eligible anchor has no captured initial size");
	for (let e of t.entries) Object.freeze(e);
	Object.freeze(t.entries), Object.freeze(t), li.set(e, {
		reference: t,
		images: e.images,
		shapeGroups: e.shapeGroups,
		sizes: a
	});
}
function _i(e, t) {
	if (!di(t)) return;
	let n = li.get(e);
	if (n) return ui.has(n.reference) || e.images !== n.images || e.shapeGroups !== n.shapeGroups ? ci : n.sizes.get(t) ?? ci;
}
function vi(e, t, n, r, i) {
	return ii(t, n, r, i, _i(e, t));
}
function yi(e) {
	ui.add(e);
}
//#endregion
//#region packages/xlsx/src/internal/optional-image-fallback.ts
var bi = /* @__PURE__ */ new WeakMap();
function xi(e) {
	bi.delete(e);
}
function Si(e, t, n) {
	let r = bi.get(e);
	r || (r = /* @__PURE__ */ new Map(), bi.set(e, r)), r.set(t, n);
}
function Ci(e, t, n) {
	return e !== void 0 && bi.get(e)?.get(t) === n;
}
//#endregion
//#region packages/xlsx/src/internal/image-anchor-transform.ts
function wi(e) {
	if (!Number.isFinite(e)) return [0, 1];
	let t = (e % 360 + 360) % 360;
	if (t === 0) return [0, 1];
	if (t === 90) return [1, 0];
	if (t === 180) return [0, -1];
	if (t === 270) return [-1, 0];
	let n = e * Math.PI / 180;
	return [Math.sin(n), Math.cos(n)];
}
function Ti(e, t = 0) {
	let [n, r] = wi(t);
	if (n === 0 && Math.abs(r) === 1) return e;
	let i = Math.abs(e.width * r) + Math.abs(e.height * n), a = Math.abs(e.width * n) + Math.abs(e.height * r);
	return {
		x: e.x + (e.width - i) / 2,
		y: e.y + (e.height - a) / 2,
		width: i,
		height: a
	};
}
function Ei(e, t, n = 0, r = !1, i = !1) {
	if (n === 0 && !r && !i) return e;
	let a = t.x + t.width / 2, o = t.y + t.height / 2, [s, c] = wi(-n), l = e.x - a, u = e.y - o, d = a + l * c - u * s, f = o + l * s + u * c;
	return r && (d = 2 * a - d), i && (f = 2 * o - f), {
		x: d,
		y: f
	};
}
//#endregion
//#region packages/xlsx/src/renderer.ts
function Di(e, t) {
	return t ? `${e}|duo:${t.clr1}:${t.clr2}` : e;
}
var Oi = p.map((e) => `"${e}"`).join(", "), ki = c.map((e) => `"${e}"`).join(", "), Ai = `"Calibri", Arial, ${Oi}, sans-serif`, ji = `"Calibri", "Carlito", Arial, ${Oi}, sans-serif`, Mi = `Arial, Helvetica, "Liberation Sans", ${Oi}, sans-serif`, Ni = `"Times New Roman", "Liberation Serif", ${ki}, serif`, Pi = `"Carlito", ${Mi}`, Fi = `"Caladea", ${Ni}`, Ii = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u, Li = /* @__PURE__ */ new WeakMap(), Ri = /* @__PURE__ */ new WeakMap(), zi = /* @__PURE__ */ new WeakMap(), Bi = /* @__PURE__ */ new WeakMap(), Vi = /* @__PURE__ */ new WeakMap(), Hi = /* @__PURE__ */ new WeakMap(), Ui = /* @__PURE__ */ new WeakMap(), Wi = /* @__PURE__ */ new WeakMap(), Gi = /* @__PURE__ */ new WeakMap();
function Ki(e, t, n, r, i, a = /* @__PURE__ */ new Map()) {
	let o = e.defaultFontFamily ? $e({
		family: e.defaultFontFamily,
		weight: e.defaultFontBold ? 700 : 400,
		style: e.defaultFontItalic ? "italic" : "normal"
	}) : null, s = o === null ? void 0 : t?.[o], c = {
		tupleKey: o,
		route: s,
		hasDeclaredFace: e.defaultFontFamily ? sa(e.defaultFontFamily, n) : !1,
		canvasMdw: i && e.defaultFontFamily && e.defaultFontSize ? aa(e.defaultFontFamily, e.defaultFontSize, s, r, e.defaultFontBold ? 700 : 400, e.defaultFontItalic ? "italic" : "normal", i, a.get(e.defaultFontFamily.trim().toLocaleLowerCase("en-US"))) : void 0
	}, l = zi.get(e);
	(!l || l.tupleKey !== c.tupleKey || l.route !== c.route || l.hasDeclaredFace !== c.hasDeclaredFace || l.canvasMdw !== c.canvasMdw) && Re.invalidate(e), zi.set(e, c);
}
function qi(e, t, r, i = !1) {
	Wi.set(e, t), (Ri.get(t) !== r || Vi.get(t) !== i) && Re.invalidate(t), Bi.set(e, i);
	let a = (g(e.canvas) ? e.canvas.ownerDocument?.fonts : void 0) ?? n(), o = i ? s(a, ut) : /* @__PURE__ */ new Map();
	Hi.set(e, o), Ui.set(t, o), Ki(t, r, a, i, e, o), Vi.set(t, i), r ? (Li.set(e, r), Ri.set(t, r)) : (Li.delete(e), Ri.delete(t));
}
function Ji(e, t) {
	return t ? Hi.get(e)?.get(t.trim().toLocaleLowerCase("en-US")) : void 0;
}
function Yi(e, t, r = !1) {
	(Ri.get(e) !== t || Vi.get(e) !== r) && Re.invalidate(e), t ? Ri.set(e, t) : Ri.delete(e), Vi.set(e, r);
	let i = n(), a = r ? s(i, ut) : /* @__PURE__ */ new Map();
	Ui.set(e, a), Ki(e, t, i, r, void 0, a);
}
function Xi(e, t, n = !1, r = !1) {
	let i = $e({
		family: t?.trim() || "Calibri",
		weight: n ? 700 : 400,
		style: r ? "italic" : "normal"
	});
	return Li.get(e)?.[i];
}
function Zi(e, t) {
	if (t !== void 0) {
		if (!Number.isFinite(t) || t <= 0) throw Error("XLSX maximum digit width must be a finite positive number");
		Re.forWorksheet(e, t);
	}
}
var Qi = "\"Courier New\", \"Liberation Mono\", monospace";
function $i(e, t, n = !1, a = "") {
	let o = e?.trim() || null, s = o ? f(o) : null, c = i(o), l = (e, n = !0) => {
		let i = [...n && t ? r(t, c === "serif" ? "serif" : "sans") : [], ...Ii.test(a) ? c === "serif" ? ["Noto Naskh Arabic", "Noto Sans Arabic"] : ["Noto Sans Arabic"] : []];
		if (i.length === 0) return e;
		let o = e.lastIndexOf(",");
		return `${e.slice(0, o)}, ${i.map((e) => `"${e}"`).join(", ")}${e.slice(o)}`;
	};
	if (!s) return l(o ? o.toLowerCase() === "calibri" ? n ? Pi : Mi : o.toLowerCase() === "cambria" ? n ? Fi : Ni : c === "serif" ? Ni : c === "mono" ? Qi : Mi : n ? ji : Ai);
	let u = c === "serif", d = m(o), p = [...d ? [d] : [], ...r(s, u ? "serif" : "sans").filter((e) => e !== d)].map((e) => `"${e}"`).join(", ");
	return l(`${p ? `${p}, ` : ""}${u ? Ni : Mi}`, !1);
}
function ea(e, t, n = "", r, i = !1, a, s) {
	let c = e?.trim(), l = o(n) ? t : void 0, u = r && (c?.toLocaleLowerCase("en-US") || "calibri") === r.requestedFamily.trim().toLocaleLowerCase("en-US") ? r : void 0, d = a && a.toLocaleLowerCase("en-US") !== c?.toLocaleLowerCase("en-US") ? `"${a}", ` : "", f = s && s.toLocaleLowerCase("en-US") !== c?.toLocaleLowerCase("en-US") ? `"${s}", ` : "";
	return u ? `"${u.family}", ${d}${f}${$i(c, l, i, n)}` : c ? `"${c}", ${d}${f}${$i(c, l, i, n)}` : $i(null, l, i, n);
}
var ta = 11;
function na(e, t, n) {
	return n - e - t;
}
function ra(e, t, n, r) {
	return r ? na(e, t, n) : e;
}
var ia = "#7a7a7a";
function aa(e, t, n, r = !1, i = 400, a = "normal", o, s) {
	let c = t * J, l = o ? null : typeof OffscreenCanvas < "u" ? new OffscreenCanvas(1, 1) : typeof document < "u" ? document.createElement("canvas") : null, u = o ?? l?.getContext("2d");
	if (!u) return 8;
	let d = i !== 400 || a !== "normal" ? `${a} ${i} ` : "";
	o && u.save();
	try {
		u.font = `${d}${c}px ${ea(e, void 0, "", n, r, void 0, s)}`;
		let t = 0;
		for (let e of "0123456789") {
			let n = u.measureText(e).width;
			n > t && (t = n);
		}
		return oa(t);
	} finally {
		o && u.restore();
	}
}
function oa(e) {
	return (Pe() ? Math.round(Math.round(e / 1.3333333333333333) * 1.3333333333333333) : Math.round(e)) || 8;
}
function sa(e, t) {
	if (!t || typeof t[Symbol.iterator] != "function") return !1;
	let n = e.trim().toLocaleLowerCase("en-US");
	for (let e of t) if (e.family.trim().replace(/^(['"])(.*)\1$/u, "$2").toLocaleLowerCase("en-US") === n) return !0;
	return !1;
}
function ca(e) {
	if (!e.defaultFontFamily || !e.defaultFontSize) return 8;
	let t = e.defaultFontBold ? 700 : 400, n = e.defaultFontItalic ? "italic" : "normal", r = $e({
		family: e.defaultFontFamily,
		weight: t,
		style: n
	}), i = Ri.get(e)?.[r];
	return zi.get(e)?.canvasMdw ?? aa(e.defaultFontFamily, e.defaultFontSize, i, Vi.get(e) === !0, t, n, void 0, Ui.get(e)?.get(e.defaultFontFamily.trim().toLocaleLowerCase("en-US")));
}
function la(e) {
	return Re.forWorksheetMeasured(e, () => ca(e));
}
function ua(e, t, n, r, i, a, o) {
	if (!(i <= 0 || a <= 0)) {
		if (o) {
			let a = e.createLinearGradient(n, r, n + i, r);
			a.addColorStop(0, U(t, .85)), a.addColorStop(1, U(t, .15)), e.fillStyle = a;
		} else e.fillStyle = U(t);
		e.fillRect(n, r, i, a);
	}
}
function da(e) {
	switch (e) {
		case "solid": return 1;
		case "darkGray": return .75;
		case "mediumGray": return .5;
		case "lightGray": return .25;
		case "gray125": return .125;
		case "gray0625": return .0625;
		case "darkHorizontal":
		case "darkVertical":
		case "darkDown":
		case "darkUp":
		case "darkGrid":
		case "darkTrellis": return .5;
		case "lightHorizontal":
		case "lightVertical":
		case "lightDown":
		case "lightUp":
		case "lightGrid":
		case "lightTrellis": return .25;
		default: return 1;
	}
}
var fa = /* @__PURE__ */ new Map(), pa = {
	gray0625: [
		128,
		0,
		8,
		0,
		128,
		0,
		8,
		0
	],
	gray125: [
		136,
		0,
		34,
		0,
		136,
		0,
		34,
		0
	],
	lightGray: [
		170,
		0,
		85,
		0,
		170,
		0,
		85,
		0
	],
	mediumGray: [
		170,
		85,
		170,
		85,
		170,
		85,
		170,
		85
	],
	darkGray: [
		119,
		221,
		119,
		221,
		119,
		221,
		119,
		221
	],
	darkHorizontal: [
		4095,
		4095,
		0,
		4095,
		4095,
		0,
		4095,
		4095,
		0,
		4095,
		4095,
		0
	],
	lightHorizontal: [
		4095,
		0,
		0,
		4095,
		0,
		0,
		4095,
		0,
		0,
		4095,
		0,
		0
	],
	darkVertical: Array(12).fill(3510),
	lightVertical: Array(12).fill(2340),
	darkGrid: [
		204,
		204,
		51,
		51,
		204,
		204,
		51,
		51
	],
	lightGrid: [
		255,
		136,
		136,
		136,
		255,
		136,
		136,
		136
	],
	darkDown: [
		204,
		102,
		51,
		153,
		204,
		102,
		51,
		153
	],
	lightDown: [
		136,
		68,
		34,
		17,
		136,
		68,
		34,
		17
	],
	darkUp: [
		51,
		102,
		204,
		153,
		51,
		102,
		204,
		153
	],
	lightUp: [
		17,
		34,
		68,
		136,
		17,
		34,
		68,
		136
	],
	darkTrellis: [
		255,
		102,
		255,
		153,
		255,
		102,
		255,
		153
	],
	lightTrellis: [
		153,
		102,
		102,
		153,
		153,
		102,
		102,
		153
	]
};
function ma(e, t, n, r) {
	let i = e.getTransform(), a = Math.max(1, Math.round(Math.hypot(i.a, i.b))), o = Math.max(1, Math.round(Math.hypot(i.c, i.d))), s = `${t}|${n}|${r}|${a}|${o}`;
	if (fa.has(s)) return fa.get(s);
	let c = pa[t];
	if (!c) return fa.set(s, null), null;
	let l = c.length, u = G(l, l);
	if (!u) return fa.set(s, null), null;
	let d = u.getContext("2d");
	if (!d) return fa.set(s, null), null;
	d.fillStyle = U(r), d.fillRect(0, 0, l, l), d.fillStyle = U(n);
	for (let e = 0; e < l; e++) {
		let t = c[e];
		for (let n = 0; n < l; n++) t & 1 << l - 1 - n && d.fillRect(n, e, 1, 1);
	}
	let f = e.createPattern(u, "repeat");
	if (f && typeof DOMMatrix < "u" && (a >= 2 || o >= 2)) {
		let e = new DOMMatrix();
		e.scaleSelf(1 / a, 1 / o), f.setTransform(e);
	}
	return fa.set(s, f), f;
}
function ha(e, t, n, r, i, a) {
	if (t.gradient && t.gradient.stops.length > 0) return e.fillStyle = ga(e, t.gradient, n, r, i, a), e.fillRect(n, r, i, a), !0;
	let o = t.patternType;
	if (!o || o === "none") return !1;
	let s = t.fgColor ?? "000000", c = t.bgColor ?? "FFFFFF";
	if (o === "solid") return e.fillStyle = U(s), e.fillRect(n, r, i, a), !0;
	let l = ma(e, o, s, c);
	if (l) e.fillStyle = l;
	else {
		let t = da(o);
		e.fillStyle = t >= 1 ? U(s) : ya(s, c, t);
	}
	return e.fillRect(n, r, i, a), !0;
}
function ga(e, t, n, r, i, a) {
	let o;
	if (t.gradientType === "path") {
		let s = n + i * (t.left + (1 - t.right - t.left) / 2), c = r + a * (t.top + (1 - t.bottom - t.top) / 2), l = Math.hypot(Math.max(s - n, n + i - s), Math.max(c - r, r + a - c));
		o = e.createRadialGradient(s, c, 0, s, c, l);
	} else {
		let s = t.degree * Math.PI / 180, c = n + i / 2, l = r + a / 2, u = (Math.abs(Math.cos(s)) * i + Math.abs(Math.sin(s)) * a) / 2;
		o = e.createLinearGradient(c - Math.cos(s) * u, l - Math.sin(s) * u, c + Math.cos(s) * u, l + Math.sin(s) * u);
	}
	for (let e of t.stops) {
		let t = Math.min(1, Math.max(0, e.position));
		o.addColorStop(t, U(e.color));
	}
	return o;
}
var _a = ei;
function va(e, t, n, r, i) {
	let a = Math.max(4, Math.min(8, Math.min(r, i) * .18));
	e.save(), e.fillStyle = "#D40000", e.beginPath(), e.moveTo(t + r - a, n), e.lineTo(t + r, n), e.lineTo(t + r, n + a), e.closePath(), e.fill(), e.restore();
}
function ya(e, t, n) {
	let r = e.replace("#", ""), i = t.replace("#", ""), a = parseInt(r.slice(0, 2), 16), o = parseInt(r.slice(2, 4), 16), s = parseInt(r.slice(4, 6), 16), c = parseInt(i.slice(0, 2), 16), l = parseInt(i.slice(2, 4), 16), u = parseInt(i.slice(4, 6), 16), d = Math.min(1, Math.max(0, n));
	return `rgb(${Math.round(a * d + c * (1 - d))},${Math.round(o * d + l * (1 - d))},${Math.round(s * d + u * (1 - d))})`;
}
function $(e, t, n = 1) {
	return Math.round(e * J * n * t);
}
function ba(e, t) {
	let n = {
		family: e.name,
		weight: e.bold ? 700 : 400
	};
	if (!xa()) return n;
	let r = Sa(e, t);
	if (!r) return n;
	let i = te(r, {
		source: "office-mac",
		weight: e.bold ? 700 : 400,
		style: e.italic ? "italic" : "normal"
	}), a = i.length ? i : te(r, { source: "office-mac" }), o = new Set(a.flatMap((e) => e.aliases).filter((e) => /-(?:Regular|Bold|Italic|BoldItalic|Light|Medium)$/i.test(e)).map((e) => e.replace(/-(?:Regular|Bold|Italic|BoldItalic|Light|Medium)$/i, ""))), s = new Set(a.map((e) => e.family)), c = i.length === 0 && a.length === 1 && ![400, 700].includes(a[0].weight) ? a[0].weight : n.weight, l = o.size === 1 ? [...o][0] : s.size === 1 ? [...s][0] : void 0;
	return {
		family: r,
		weight: c,
		...l && l.toLocaleLowerCase("en-US") !== r.toLocaleLowerCase("en-US") ? { fallbackAlias: l } : {}
	};
}
function xa() {
	let e = typeof navigator < "u" ? navigator : void 0;
	return !!(Pe() && e && (e.language || "").toLowerCase().startsWith("ja"));
}
function Sa(e, t) {
	return e.scheme === "major" ? t?.themeJapaneseMajorFont : e.scheme === "minor" ? t?.themeJapaneseMinorFont : void 0;
}
function Ca(e, t) {
	let n = xa() && Sa(e, t);
	if (!t || !n) return {
		family: e.name,
		weight: e.bold ? 700 : 400
	};
	let r = Gi.get(t);
	r || (r = /* @__PURE__ */ new Map(), Gi.set(t, r));
	let i = `${e.scheme}:${n}:${+!!e.bold}:${+!!e.italic}`, a = r.get(i);
	return a || (a = ba(e, t), r.size < 8 && r.set(i, a)), a;
}
function wa(e, t, n = 1, r, i = "") {
	let a = t.italic ? "italic " : "", o = Math.max(1, Math.round(t.size * J * n)), s = Ca(t, Wi.get(e));
	return `${a}${s.weight === 400 ? "" : `${s.weight} `}${o}px ${ea(s.family, r, i, Xi(e, s.family, t.bold, t.italic), Bi.get(e) === !0, s.fallbackAlias, Ji(e, s.family))}`;
}
function Ta(e, t, n, r, i, a, o, s, c, l, u) {
	if (t.length === 0) return;
	let d = n?.fontId ?? 0, f = a.fonts[d] ?? a.fonts[0];
	if (!f) return;
	let p = n?.alignment ?? "left";
	e.save(), e.font = wa(e, f, c, u, t.map((e) => e.text).join("")), e.textBaseline = "top", e.textAlign = "left", e.fillStyle = l;
	let m = s + Math.round(2 * c);
	if (p === "noControl") {
		let n = o;
		for (let r of t) e.fillText(r.text, n, m), n += e.measureText(r.text).width;
		e.restore();
		return;
	}
	let h = Ft(t, r, o, p, (t) => Ea(e, t, i));
	for (let t of h) {
		let n = e.measureText(t.text).width, r = [...t.text];
		if (t.spread === "distribute" && r.length > 1 && n < t.width) {
			let i = (t.width - n) / (r.length - 1);
			try {
				e.letterSpacing = `${i}px`;
			} catch {}
			e.fillText(t.text, t.x, m);
			try {
				e.letterSpacing = "0px";
			} catch {}
		} else t.spread === "center" ? e.fillText(t.text, t.x + (t.width - n) / 2, m) : e.fillText(t.text, t.x, m);
	}
	e.restore();
}
function Ea(e, t, n) {
	let r = e.font;
	e.font = n;
	let i = e.measureText(t).width;
	return e.font = r, i;
}
function Da(e, t, n, r, i, a, o = 1) {
	if (e.save(), e.strokeStyle = i, e.lineWidth = .5, e.beginPath(), a) {
		let i = r - 1, a = r + 1, s = i + z(i, .5, o), c = a + z(a, .5, o);
		e.moveTo(t, s), e.lineTo(n, s), e.moveTo(t, c), e.lineTo(n, c);
	} else {
		let i = r + z(r, .5, o);
		e.moveTo(t, i), e.lineTo(n, i);
	}
	e.stroke(), e.restore();
}
function Oa(e, t) {
	let n = t.font;
	return n ? {
		bold: n.bold,
		italic: n.italic,
		underline: n.underline,
		underlineStyle: n.underlineStyle,
		strike: n.strike,
		size: n.size ?? e.size,
		color: n.color ?? null,
		name: n.name ?? e.name,
		vertAlign: n.vertAlign
	} : e;
}
function ka(e, t) {
	let n = e.cellXfs[t] ?? e.cellXfs[0] ?? {
		fontId: 0,
		fillId: 0,
		borderId: 0,
		numFmtId: 0,
		alignH: null,
		alignV: null,
		wrapText: !1
	};
	return {
		font: e.fonts[n.fontId] ?? {
			bold: !1,
			italic: !1,
			underline: !1,
			strike: !1,
			size: ta,
			color: null,
			name: null
		},
		fill: e.fills[n.fillId] ?? {
			patternType: "none",
			fgColor: null,
			bgColor: null
		},
		border: e.borders[n.borderId] ?? {
			left: null,
			right: null,
			top: null,
			bottom: null
		},
		xf: n
	};
}
function Aa(e, t) {
	let n = e.colStyleRanges ?? [];
	for (let e = n.length - 1; e >= 0; e--) {
		let r = n[e];
		if (t >= r.min && t <= r.max) return r.styleIndex;
	}
	return 0;
}
function ja(e, t, n) {
	return t?.styleIndex ?? Aa(e, n);
}
function Ma(e, t, n, r) {
	let i = [];
	for (let a of t.split("\n")) i.push(...Na(e, a, n, r));
	return i;
}
function Na(e, t, n, r = (t) => e.measureText(t).width) {
	return Je(t, n, r);
}
function Pa(e, t, n, r, i, a) {
	return Ye(e, t, n, i, Oa, (t, n) => {
		e.font = wa(e, Ra(t), r, a, n);
	}, ta);
}
function Fa(e) {
	return e === "number" ? "right" : e === "bool" ? "center" : "left";
}
function Ia(e, t, n) {
	return e === "middle" ? {
		underline: t + Math.round(n * .55),
		strike: t
	} : e === "bottom" ? {
		underline: t + 1,
		strike: t - Math.round(n * .35)
	} : {
		underline: t + n + 1,
		strike: t + Math.round(n * .5)
	};
}
function La(e) {
	let { alignV: t, cy: n, cellH: r, paddingY: i } = e;
	return t === "top" ? {
		baseline: "top",
		textY: n + i
	} : t === "center" ? {
		baseline: "middle",
		textY: n + r / 2
	} : {
		baseline: "bottom",
		textY: n + r - i
	};
}
function Ra(e) {
	return e.vertAlign === "superscript" || e.vertAlign === "subscript" ? {
		...e,
		size: e.size * .65
	} : e;
}
function za(e, t, n, r, i, a, o, s, c) {
	e.textAlign = "left", e.textBaseline = i;
	let l = s.needBidi ? $r(t, s.baseRtl ?? !1) : null, u = e, d = n;
	for (let n = 0; n < t.length; n++) {
		let f = l ? l.order[n] : n;
		if (l) try {
			u.direction = l.rtl[f] ? "rtl" : "ltr";
		} catch {}
		let p = t[f], m = Ra(p.font);
		e.font = wa(e, m, a, c, p.text);
		let h = s.fontColor ?? p.font.color;
		e.fillStyle = h ? U(h) : "#000000";
		let g = $(p.font.size, a), _ = 0;
		p.font.vertAlign === "superscript" ? _ = -Math.round(g * .35) : p.font.vertAlign === "subscript" && (_ = Math.round(g * .1)), e.fillText(p.text, d, r + _);
		let v = $(m.size, a);
		if (p.font.underline || p.font.strike) {
			let t = Ia(i, r, v);
			if (p.font.underline) {
				let n = h ? U(h) : "#000000", r = p.font.underlineStyle === "double" || p.font.underlineStyle === "doubleAccounting";
				Da(e, d, d + p.width, t.underline + _, n, r, o);
			}
			if (p.font.strike) {
				let n = t.strike + _, r = n + z(n, .5, o);
				e.save(), e.strokeStyle = h ? U(h) : "#000000", e.lineWidth = .5, e.beginPath(), e.moveTo(d, r), e.lineTo(d + p.width, r), e.stroke(), e.restore();
			}
		}
		d += p.width;
	}
	if (l) try {
		u.direction = "ltr";
	} catch {}
}
function Ba(e, t, n, r, i, a, o, s, c) {
	let { alignH: l, cx: u, cellW: d, leftPad: f, paddingX: p } = n, m = t.reduce((e, t) => e + t.width, 0), h;
	h = l === "right" ? u + d - p - m : l === "center" ? u + d / 2 - m / 2 : u + f;
	let { needBidi: g, baseRtl: _ } = Qr(a.readingOrder, t.map((e) => e.text).join(""));
	za(e, t, h, o, s, r, i, {
		fontColor: a.fontColor,
		needBidi: g,
		baseRtl: _
	}, c);
}
function Va(e, t, n, r, i, a, o, s, c, l) {
	Ba(e, t.map((t) => {
		let r = Oa(n, t);
		return e.font = wa(e, Ra(r), i, l, t.text), {
			text: t.text,
			font: r,
			width: e.measureText(t.text).width
		};
	}), r, i, a, o, s, c, l);
}
function Ha(e, t, n, r, i, a, o = {}, s) {
	let { baseline: c, textY: l } = La(r);
	Va(e, t, n, r, i, a, o, l, c, s);
}
function Ua(e, t, n, r, i, a, o = {}, s) {
	let { alignV: c, cy: l, cellH: u, paddingY: d } = r, f = go(t, n, i), p = f.reduce((e, t) => e + t.heightPx, 0), m;
	m = c === "top" ? l + d : c === "center" ? l + (u - p) / 2 : l + u - p - d;
	for (let t of f) t.runs.length > 0 && Va(e, t.runs, n, r, i, a, o, m, "top", s), m += t.heightPx;
}
function Wa(e, t, n, r, i, a) {
	let o = Math.max(0, t) + 3, s = Math.min(t + r, e.canvas.width) - 3 - o;
	if (s <= 0) return;
	let c = e.measureText("#").width, l = c > 0 ? Math.max(1, Math.floor(s / c)) : 1;
	e.textAlign = "left";
	let { baseline: u, textY: d } = La({
		alignH: "left",
		alignV: a,
		cx: t,
		cy: n,
		cellW: r,
		cellH: i,
		leftPad: 3,
		paddingX: 3,
		paddingY: 2
	});
	e.textBaseline = u, e.fillText("#".repeat(l), o, d);
}
function Ga(e, t, n, r, i, a, o = {}, s) {
	t.some((e) => e.text.includes("\n")) ? Ua(e, t, n, r, i, a, o, s) : Ha(e, t, n, r, i, a, o, s);
}
function Ka(e, t, n, r, i, a) {
	let { alignV: o, cy: s, cellH: c, leftPad: l, paddingX: u, paddingY: d } = i, f = Ma(e, t, i.cellW - l - u);
	if (f.length === 1) {
		let { baseline: t, textY: r } = La(i);
		e.textBaseline = t, e.fillText(f[0], n, r);
		return;
	}
	let p = $(r.size, a, 1.2), m = f.length * p, h;
	h = o === "top" ? s + d : o === "center" ? s + (c - m) / 2 : s + c - m - d, e.textBaseline = "top";
	for (let t = 0; t < f.length; t++) e.fillText(f[t], n, h + t * p);
}
function qa(e, t, n, r, i, a, o = {}, s) {
	let { alignH: c, alignV: l, cx: u, cy: d, cellW: f, cellH: p, leftPad: m, paddingX: h, paddingY: g } = r, _ = Pa(e, t, n, i, f - m - h, s);
	if (_.length === 1) {
		let { baseline: t, textY: n } = La(r);
		Ba(e, _[0].segments, r, i, a, o, n, t, s);
		return;
	}
	let v = _.reduce((e, t) => e + $(t.maxFontSize, i, 1.2), 0), y;
	y = l === "top" ? d + g : l === "center" ? d + (p - v) / 2 : d + p - v - g;
	let b = t.map((e) => e.text).join("").split("\n").map((e) => Qr(o.readingOrder, e));
	for (let t of _) {
		let n = t.segments.reduce((e, t) => e + t.width, 0), r;
		r = c === "right" ? u + f - h - n : c === "center" ? u + f / 2 - n / 2 : u + m;
		let { needBidi: l, baseRtl: d } = b[t.para];
		za(e, t.segments, r, y, "top", i, a, {
			fontColor: o.fontColor,
			needBidi: l,
			baseRtl: d
		}, s), y += $(t.maxFontSize, i, 1.2);
	}
}
function Ja(e) {
	let t = "";
	for (; e > 0;) {
		let n = (e - 1) % 26;
		t = String.fromCharCode(65 + n) + t, e = Math.floor((e - 1) / 26);
	}
	return t;
}
var Ya = [
	"#FF0000",
	"#FFFF00",
	"#00B050"
], Xa = [
	"#FF0000",
	"#FF6600",
	"#FFFF00",
	"#00B050"
], Za = [
	"#FF0000",
	"#FF6600",
	"#FFFF00",
	"#92D050",
	"#00B050"
];
function Qa(e, t, n, r, i, a) {
	if (t === "NoIcons") return;
	let o = t || "3TrafficLights1", s = parseInt(o[0]) || 3, c = s === 5 ? Za : s === 4 ? Xa : Ya, l = c[Math.max(0, Math.min(n, c.length - 1))];
	if (e.save(), e.fillStyle = l, o.includes("Arrow")) {
		let t = a / 2;
		e.beginPath(), n === s - 1 ? (e.moveTo(r + t, i), e.lineTo(r + a, i + a), e.lineTo(r, i + a)) : n === 0 ? (e.moveTo(r, i), e.lineTo(r + a, i), e.lineTo(r + t, i + a)) : (e.moveTo(r, i + a * .3), e.lineTo(r + a, i + t), e.lineTo(r, i + a * .7)), e.closePath(), e.fill();
	} else o === "3Signs" && n < 2 ? (e.beginPath(), n === 0 ? (e.moveTo(r + a / 2, i), e.lineTo(r + a, i + a / 2), e.lineTo(r + a / 2, i + a), e.lineTo(r, i + a / 2)) : (e.moveTo(r + a / 2, i), e.lineTo(r + a, i + a), e.lineTo(r, i + a)), e.closePath(), e.fill()) : o.includes("Flag") ? (e.beginPath(), e.moveTo(r, i), e.lineTo(r + a, i), e.lineTo(r, i + a), e.closePath(), e.fill()) : (e.beginPath(), e.arc(r + a / 2, i + a / 2, a / 2, 0, Math.PI * 2), e.fill());
	e.restore();
}
function $a(e, t, n, r, i) {
	let a = Math.max(6, Math.round(Math.min(r, i) * .45)), o = t + r - a - 1, s = n + i - a - 1;
	e.save(), e.fillStyle = "#D0D0D0", e.fillRect(o, s, a, a), e.fillStyle = "#444444";
	let c = a * .55, l = o + (a - c) / 2, u = s + (a - c * .5) / 2;
	e.beginPath(), e.moveTo(l, u), e.lineTo(l + c, u), e.lineTo(l + c / 2, u + c * .5), e.closePath(), e.fill(), e.restore();
}
function eo(e) {
	let t = /* @__PURE__ */ new Map(), n = so(e, "worksheet-table-style-index", "expand-styled-table-coordinates");
	for (let r of e.tables ?? []) {
		if (!r.styleName) continue;
		let { top: e, bottom: i, left: a, right: o } = r.range;
		Ct(r.range, n);
		let s = r.accentColor || "#808080", c = !!r.isCustom, l = Math.max(0, r.headerRowCount ?? 1), u = Math.max(0, r.totalsRowCount ?? 0), d = e + l - 1, f = i - u + 1;
		for (let p = e; p <= i; p++) {
			let m = l > 0 && p <= d, h = u > 0 && p >= f, g = !m && !h ? p - d - 1 : -1, _ = r.showRowStripes && g >= 0 ? g % 2 == 1 ? r.band1HorizontalDxf : r.band2HorizontalDxf : void 0;
			for (let l = a; l <= o; l++) wt(t, `${p}:${l}`, {
				accent: s,
				isCustom: c,
				isHeader: m,
				isTotals: h,
				isBanded: r.showRowStripes && g >= 0 && g % 2 == 1,
				isFirstCol: r.showFirstColumn && l === a,
				isLastCol: r.showLastColumn && l === o,
				isTopEdge: p === e,
				isBottomEdge: p === i,
				wholeTableDxf: r.wholeTableDxf,
				headerRowDxf: r.headerRowDxf,
				totalRowDxf: r.totalRowDxf,
				firstColumnDxf: r.firstColumnDxf,
				lastColumnDxf: r.lastColumnDxf,
				stripeDxf: _
			}, n);
		}
	}
	return t;
}
function to(e, t, n, r) {
	let i = t?.border?.horizontal, a = t?.border?.top, o = t?.border?.bottom, s = t?.border?.left, c = t?.border?.right, l = n?.border?.bottom, u = n?.border?.top;
	if (i || a || o || s || c || l || u) {
		let t = {
			left: null,
			right: null,
			top: null,
			bottom: null
		};
		return e.isTopEdge ? t.top = a ?? null : i && (t.top = i), e.isHeader && l ? t.bottom = l : e.isBottomEdge ? t.bottom = o ?? null : i && (t.bottom = i), (e.isFirstCol || r === 0) && (t.left = s ?? null), e.isLastCol && (t.right = c ?? null), {
			kind: "dxf",
			border: t
		};
	}
	return e.isCustom ? { kind: "none" } : {
		kind: "accent",
		color: e.accent,
		lineWidth: e.isHeader ? 1.5 : 1,
		topEdge: e.isTopEdge
	};
}
function no(e) {
	let t = /* @__PURE__ */ new Map(), n = so(e, "worksheet-sparkline-index", "index-sparkline-coordinates");
	for (let r of e.sparklineGroups ?? []) {
		let e = Infinity, i = -Infinity;
		if (r.minAxisType === "group" || r.maxAxisType === "group") {
			for (let t of r.sparklines) for (let n of t.values) typeof n == "number" && (n < e && (e = n), n > i && (i = n));
			(!isFinite(e) || !isFinite(i)) && (e = 0, i = 1);
		}
		for (let a of r.sparklines) {
			let o = a.values.filter((e) => typeof e == "number"), s = o.length ? Math.min(...o) : 0, c = o.length ? Math.max(...o) : 1, l = r.minAxisType === "custom" && typeof r.manualMin == "number" ? r.manualMin : r.minAxisType === "group" ? e : s, u = r.maxAxisType === "custom" && typeof r.manualMax == "number" ? r.manualMax : r.maxAxisType === "group" ? i : c;
			wt(t, `${a.row}:${a.col}`, {
				kind: r.kind,
				values: a.values,
				min: l,
				max: u,
				displayEmptyCellsAs: r.displayEmptyCellsAs === "zero" || r.displayEmptyCellsAs === "span" ? r.displayEmptyCellsAs : "gap",
				displayXAxis: r.displayXAxis,
				lineWeight: r.lineWeight,
				markers: r.markers,
				high: r.high,
				low: r.low,
				first: r.first,
				last: r.last,
				negative: r.negative,
				colorSeries: r.colorSeries,
				colorNegative: r.colorNegative,
				colorAxis: r.colorAxis,
				colorMarkers: r.colorMarkers,
				colorFirst: r.colorFirst,
				colorLast: r.colorLast,
				colorHigh: r.colorHigh,
				colorLow: r.colorLow
			}, n);
		}
	}
	return t;
}
function ro(e) {
	let t = e.replace("#", "");
	if (t.length < 6) return "#F2F2F2";
	let n = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), i = parseInt(t.slice(4, 6), 16), a = (e) => Math.round(e * .2 + 255 * .8), o = (e) => e.toString(16).padStart(2, "0").toUpperCase();
	return `#${o(a(n))}${o(a(r))}${o(a(i))}`;
}
function io(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g) {
	if (m <= 0 || h <= 0) return;
	let { styles: _, cellMap: v, mergeAnchorMap: y, mergeSkipSet: b, cfContext: x, cs: S, dpr: C } = t, w = i.length, T = a.length, E = new Set(s), D = new Set(o), O = (e, n) => t.rtl ? na(e, n, t.canvasW) : e, k = [], A = -c;
	for (let e = 0; e < w; e++) k.push(A), A += i[e];
	let j = [], M = -l;
	for (let e = 0; e < T; e++) j.push(M), M += a[e];
	e.save(), e.beginPath(), e.rect(O(f, m), p, m, h), e.clip();
	let N = [], te = [], P = [];
	for (let i of t.worksheet.mergeCells ?? []) {
		let a = i.top, f = i.left;
		if (E.has(a) && D.has(f) || !s.some((e) => e >= i.top && e <= i.bottom) || !o.some((e) => e >= i.left && e <= i.right)) continue;
		let p = t.mergeAnchorMap.get(`${a}:${f}`);
		if (!p) continue;
		let m = u - c + t.colAxis.offsetOf(f) - t.colAxis.offsetOf(r), h = d - l + t.rowAxis.offsetOf(a) - t.rowAxis.offsetOf(n), v = p.totalW, y = p.totalH;
		m = O(m, v);
		let b = `${a}:${f}`, w = t.cellMap.get(b), { font: T, fill: k, border: A, xf: j } = ka(_, ja(t.worksheet, w, f)), M = Xr(w, a, f, x, _.dxfs ?? [], t.cfDiagnostics), N = M.fill ?? k, ee = t.tableStyleMap.get(b), P = t.pivotStyleMap.get(b);
		if (!ha(e, N, m, h, v, y) && P?.fill && ha(e, P.fill, m, h, v, y), M.dataBar && M.dataBar.ratio > 0) {
			let t = Math.max(0, (v - 4) * M.dataBar.ratio);
			ua(e, M.dataBar.color, m + 2, h + 2, t, y - 4, M.dataBar.gradient);
		}
		let ne = Zo(Xo(A, a, f, p.right, p.bottom, t.cellMap, _), M.border);
		if (te.push(() => $o(e, ne, m, h, v, y, C)), !w) continue;
		let F = Rt(w, _, M.numFmt, t.worksheet.date1904), I = F.text;
		if (!I || I === "0" && t.worksheet.showZeros === !1) continue;
		let L = ho(T, M, ee, _, P);
		e.font = wa(e, L, S, g, I);
		let R = t.hyperlinkMap.get(b), z = po(uo(ee, _), P, j), B = R ? "#0563C1" : M.fontColor ?? F.color ?? z ?? T.color;
		e.fillStyle = B ? U(B) : "#000000", w.value.type;
		let V = j.alignH ?? Fa(w.value.type), re = j.alignV ?? "bottom", H = j.indent ? Math.round(j.indent * 3 * t.mdw) : 0, W = 3 + (V === "left" || !j.alignH ? H : 0);
		if (e.save(), e.beginPath(), e.rect(m, h, v, y), e.clip(), F.fill) {
			Wa(e, m, h, v, y, re), e.restore();
			continue;
		}
		let ie;
		V === "right" ? (ie = m + v - 3, e.textAlign = "right") : V === "center" ? (ie = m + v / 2, e.textAlign = "center") : (ie = m + W, e.textAlign = "left");
		let G = fo(uo(ee, _), j), ae = w.value.type === "text" ? w.value.runs : void 0, oe = ae && mo(ae, G), se = G == null ? L : {
			...L,
			color: G
		}, ce = oe && oe.length > 0;
		if (j.wrapText && ce) qa(e, oe, se, {
			alignH: V,
			alignV: re,
			cx: m,
			cy: h,
			cellW: v,
			cellH: y,
			leftPad: W,
			paddingX: 3,
			paddingY: 2
		}, S, C, {
			fontColor: M.fontColor,
			readingOrder: j.readingOrder
		}, g);
		else if (j.wrapText) Ka(e, I, ie, L, {
			alignH: V,
			alignV: re,
			cx: m,
			cy: h,
			cellW: v,
			cellH: y,
			leftPad: W,
			paddingX: 3,
			paddingY: 2
		}, S);
		else if (ce) Ga(e, oe, se, {
			alignH: V,
			alignV: re,
			cx: m,
			cy: h,
			cellW: v,
			cellH: y,
			leftPad: W,
			paddingX: 3,
			paddingY: 2
		}, S, C, {
			fontColor: M.fontColor,
			readingOrder: j.readingOrder
		}, g);
		else {
			let { baseline: t, textY: n } = La({
				alignH: V,
				alignV: re,
				cx: m,
				cy: h,
				cellW: v,
				cellH: y,
				leftPad: W,
				paddingX: 3,
				paddingY: 2
			});
			e.textBaseline = t, e.fillText(I, ie, n);
		}
		e.restore();
	}
	for (let n = 0; n < T; n++) {
		let r = s[n], c = d + j[n], l = a[n];
		if ((c + l <= p || c >= p + h) && !o.some((e) => {
			let t = y.get(`${r}:${e}`);
			return t != null && c + t.totalH > p && c < p + h;
		})) continue;
		let T = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Set(), D = -1, A = (e) => {
			if (D >= 0 && e - D >= 2) {
				for (let t = D; t < e - 1; t++) T.add(t);
				for (let t = D + 1; t < e; t++) E.add(t);
			}
			D = -1;
		};
		for (let e = 0; e <= w; e++) {
			let n = !1, i = !1;
			if (e < w) {
				let a = `${r}:${o[e]}`;
				if (!b.has(a) && !y.has(a)) {
					let r = v.get(a);
					n = ka(_, ja(t.worksheet, r, o[e])).xf.alignH === "centerContinuous", i = !!(r && r.value && r.value.type !== "empty");
				}
			}
			n ? i && D >= 0 && e > D ? (A(e), D = e) : D < 0 && (D = e) : A(e);
		}
		for (let a = 0; a < w; a++) {
			let s = o[a], d = u + k[a], D = i[a], A = `${r}:${s}`;
			if (b.has(A)) continue;
			let j = y.get(A), M = j ? j.totalW : D, F = j ? j.totalH : l, I = d + M <= f || d >= f + m;
			if (c + F <= p || c >= p + h || I && !t.overflowTextAnchors.has(A)) continue;
			let L = O(d, M), R = v.get(A), { font: B, fill: V, border: re, xf: H } = ka(_, ja(t.worksheet, R, s)), W = Xr(R, r, s, x, _.dxfs ?? [], t.cfDiagnostics), ie = W.fill ?? V, G = t.tableStyleMap.get(A), ae = _.dxfs ?? [], oe = (e) => e == null ? void 0 : ae[e], se = oe(G?.wholeTableDxf), ce = oe(G?.headerRowDxf), le = oe(G?.totalRowDxf), ue = oe(G?.firstColumnDxf), de = oe(G?.lastColumnDxf), fe = oe(G?.stripeDxf), pe = G?.isHeader && ce?.fill?.fgColor ? ce : G?.isTotals && le?.fill?.fgColor ? le : G?.isLastCol && de?.fill?.fgColor ? de : G?.isFirstCol && ue?.fill?.fgColor ? ue : fe?.fill?.fgColor ? fe : !G?.isHeader && !G?.isTotals && se?.fill?.fgColor ? se : void 0, me = ha(e, ie, L, c, M, F), K = t.pivotStyleMap.get(A);
			if (!me && K?.fill && (me = ha(e, K.fill, L, c, M, F)), me || (G && pe?.fill?.fgColor ? (e.fillStyle = U(pe.fill.fgColor), e.fillRect(L, c, M, F), me = !0) : G && !G.isCustom && G.isBanded && (e.fillStyle = ro(G.accent), e.fillRect(L, c, M, F), me = !0)), t.commentCells.has(A) && va(e, L, c, M, F), W.dataBar && W.dataBar.ratio > 0) {
				let t = Math.max(0, (M - 4) * W.dataBar.ratio);
				ua(e, W.dataBar.color, L + 2, c + 2, t, F - 4, W.dataBar.gradient);
			}
			let q = t.sparklineMap.get(A);
			if (q && ze(e, {
				x: L,
				y: c,
				w: M,
				h: F
			}, q), t.worksheet.isChartSheet !== !0 && t.worksheet.showGridlines !== !1 && !me) {
				if (e.strokeStyle = "#d0d0d0", e.lineWidth = .5, e.beginPath(), !T.has(a)) {
					let t = L + M + z(L + M, .5, C);
					e.moveTo(t, c), e.lineTo(t, c + F);
				}
				let t = c + F + z(c + F, .5, C);
				if (e.moveTo(L, t), e.lineTo(L + M, t), n === 0) {
					let t = c + z(c, .5, C);
					e.moveTo(L, t), e.lineTo(L + M, t);
				}
				if (a === 0) {
					let t = L + z(L, .5, C);
					e.moveTo(t, c), e.lineTo(t, c + F);
				}
				e.stroke();
			}
			let J = Zo(j ? Xo(re, r, s, j.right, j.bottom, v, _) : re, W.border);
			K && (J = {
				...J,
				top: J.top?.style ? J.top : K.top ?? J.top,
				bottom: J.bottom?.style ? J.bottom : K.bottom ?? J.bottom,
				left: J.left?.style ? J.left : K.left ?? J.left,
				right: J.right?.style ? J.right : K.right ?? J.right
			}), (T.has(a) || E.has(a)) && (J = {
				...J,
				left: E.has(a) ? null : J.left,
				right: T.has(a) ? null : J.right
			});
			let Y = v.get(`${r - 1}:${s}`), he = Y ? ka(_, ja(t.worksheet, Y, s)).border.bottom : null;
			if (he?.style && (n === 0 || J.top?.style) && (J = {
				...J,
				top: rs(J.top, he)
			}), !E.has(a)) {
				let e = v.get(`${r}:${s - 1}`), n = e ? ka(_, ja(t.worksheet, e, s - 1)).border.right : null;
				n?.style && (a === 0 || J.left?.style) && (J = {
					...J,
					left: rs(J.left, n)
				});
			}
			let ge = G ? to(G, se, ce, s) : null, _e = t.autoFilterCells.has(A), ve = () => {
				if (ge) {
					if (ge.kind === "dxf") $o(e, ge.border, L, c, M, F, C);
					else if (ge.kind === "accent") {
						let t = .5 / C;
						if (e.strokeStyle = ge.color, e.lineWidth = ge.lineWidth, e.beginPath(), e.moveTo(L, c + F - t), e.lineTo(L + M, c + F - t), ge.topEdge) {
							let t = c + z(c, ge.lineWidth, C);
							e.moveTo(L, t), e.lineTo(L + M, t);
						}
						e.stroke();
					}
				}
				_e && $a(e, L, c, D, F);
			};
			if (j) {
				let t = J;
				te.push(() => $o(e, t, L, c, M, F, C)), ve();
			} else {
				let t = J;
				P.push(() => {
					$o(e, t, L, c, M, F, C), ve();
				});
			}
			if (!R) continue;
			let ye = Rt(R, _, W.numFmt, t.worksheet.date1904), X = ye.text;
			!X || X === "0" && t.worksheet.showZeros === !1 || N.push(() => {
				let n = G?.isHeader ? ce : G?.isTotals ? le : G?.isLastCol && de ? de : G?.isFirstCol && ue ? ue : fe || (G ? se : void 0), l = G ? G.isCustom ? !!n?.font?.bold : G.isHeader || G.isTotals : !1, u = W.fontBold ?? (B.bold || l || !!K?.bold), d = W.fontItalic ?? (B.italic || !!K?.italic), f = W.fontUnderline ?? (B.underline || !!K?.underline), p = W.fontStrike ?? (B.strike || !!K?.strike), m = u !== B.bold || d !== B.italic || f !== B.underline || p !== B.strike ? {
					...B,
					bold: u,
					italic: d,
					underline: f,
					strike: p
				} : B;
				e.font = wa(e, m, S, g, X);
				let h = t.hyperlinkMap.get(A), x = po(n, K, H), T = h ? "#0563C1" : W.fontColor ?? ye.color ?? x ?? B.color;
				e.fillStyle = T ? U(T) : "#000000";
				let E = R.value.type === "number", D = H.alignH ?? Fa(R.value.type), O = H.alignV ?? "bottom", k = H.indent ? Math.round(H.indent * 3 * t.mdw) : 0, N = W.iconSet ? Math.max(8, Math.round(Math.min(M, F) * .55)) : 0, te = N > 0 ? N + 4 : 0, P = 3 + (D === "left" || !H.alignH ? k : 0) + te, I = M, V = a;
				if (D === "centerContinuous" && !j) for (let e = a + 1; e < w; e++) {
					let n = `${r}:${o[e]}`;
					if (b.has(n) || y.has(n)) break;
					let a = v.get(n);
					if (a && a.value.type !== "empty" || ka(_, ja(t.worksheet, a, o[e])).xf.alignH !== "centerContinuous") break;
					I += i[e], V = e;
				}
				let re = t.rtl ? L - (I - M) : L, ie = D === "centerContinuous" ? re : L, ae = D === "centerContinuous" ? I : M, oe = X.includes("\n");
				if (!j && !H.wrapText && !H.textRotation && !E && !oe) {
					let n = e.measureText(X).width, s = D === "centerContinuous", c = s ? n + 6 : n + P + 3, l = s ? I : M;
					if (c > l) {
						let e = c - l, n = 0, u = 0;
						D === "right" ? u = e : D === "center" || s ? (u = e / 2, n = e / 2) : n = e;
						let d = t.rtl ? -1 : 1, f = t.rtl ? a - 1 : V + 1, p = t.rtl ? 1 : -1, m = t.rtl ? V + 1 : a - 1;
						if (n > 0) {
							let e = n;
							for (let t = f; t >= 0 && t < w && e > 0; t += d) {
								let n = `${r}:${o[t]}`;
								if (b.has(n) || y.has(n)) break;
								let a = v.get(n);
								if (a && a.value.type !== "empty") break;
								ae += i[t], e -= i[t];
							}
						}
						if (u > 0) {
							let e = u;
							for (let t = m; t >= 0 && t < w && e > 0; t += p) {
								let n = `${r}:${o[t]}`;
								if (b.has(n) || y.has(n)) break;
								let a = v.get(n);
								if (a && a.value.type !== "empty") break;
								ie -= i[t], ae += i[t], e -= i[t];
							}
						}
					}
				}
				let pe = X, me = 0;
				if (D === "fill" && !E && X.length > 0) {
					let t = Math.max(1, M - 6), n = e.measureText(X).width;
					if (n > 0 && n < t) {
						let e = Math.max(1, Math.floor(t / n));
						pe = X.repeat(e);
					}
				}
				if (D === "distributed" || D === "justify" && !H.wrapText && !oe) {
					let t = Math.max(1, M - 6), n = e.measureText(pe).width, r = Math.max(1, [...pe].length - 1);
					n < t && (me = Math.max(0, (t - n) / r));
				}
				let q, J;
				D === "right" ? (q = L + M - 3, J = "right") : D === "center" ? (q = L + M / 2, J = "center") : D === "centerContinuous" ? (q = re + I / 2, J = "center") : D === "distributed" || D === "justify" && !H.wrapText && !oe ? (q = L + 3, J = "left") : (q = L + P, J = "left");
				let Y = H.textRotation ?? 0, he = Y === 255, ge = Y > 0 && Y !== 255;
				if (W.iconSet && N > 0 && (e.save(), e.beginPath(), e.rect(L, c, M, F), e.clip(), Qa(e, W.iconSet.name, W.iconSet.index, L + 2, c + (F - N) / 2, N), e.restore()), e.save(), e.beginPath(), e.rect(ie, c, ae, F), e.clip(), ye.fill) {
					Wa(e, L, c, M, F, O), e.restore();
					return;
				}
				if (he) {
					let t = $(B.size, S, 1.1), n = [...X].length * t, r = O === "top" ? c + 2 : O === "center" ? c + (F - n) / 2 : c + F - n - 2;
					e.textAlign = "center", e.textBaseline = "top";
					for (let n of X) {
						let i = n.codePointAt(0) ?? 0, a = ee(i) && ne(e, i);
						ni(e, n, L + M / 2, r, t, a), r += t;
					}
					e.restore();
					return;
				}
				if (ge) {
					let t = Y <= 90 ? -(Y * Math.PI / 180) : (Y - 90) * Math.PI / 180;
					e.translate(L + M / 2, c + F / 2), e.rotate(t), e.textAlign = "center", e.textBaseline = "middle", e.fillText(X, 0, 0), e.restore();
					return;
				}
				if (H.shrinkToFit) {
					let t = e.measureText(X).width, n = M - P - 3;
					if (t > n && t > 0) {
						let r = n / t, i = D === "right" ? L + M - 3 : D === "center" ? L + M / 2 : L + P;
						e.transform(r, 0, 0, 1, i * (1 - r), 0);
					}
				}
				if (e.textAlign = J, me > 0) try {
					e.letterSpacing = `${me}px`;
				} catch {}
				try {
					e.direction = Zr(H.readingOrder, X) ? "rtl" : "ltr";
				} catch {}
				let _e = fo(n, H), ve = R.value.type === "text" ? R.value.runs : void 0, be = ve && mo(ve, _e), xe = _e == null ? m : {
					...m,
					color: _e
				}, Se = be && be.length > 0;
				if (H.wrapText && Se) qa(e, be, xe, {
					alignH: D,
					alignV: O,
					cx: L,
					cy: c,
					cellW: M,
					cellH: F,
					leftPad: P,
					paddingX: 3,
					paddingY: 2
				}, S, C, {
					fontColor: W.fontColor,
					readingOrder: H.readingOrder
				}, g);
				else if (H.wrapText) Ka(e, X, q, m, {
					alignH: D,
					alignV: O,
					cx: L,
					cy: c,
					cellW: M,
					cellH: F,
					leftPad: P,
					paddingX: 3,
					paddingY: 2
				}, S);
				else if (Se) Ga(e, be, xe, {
					alignH: D,
					alignV: O,
					cx: L,
					cy: c,
					cellW: M,
					cellH: F,
					leftPad: P,
					paddingX: 3,
					paddingY: 2
				}, S, C, {
					fontColor: W.fontColor,
					readingOrder: H.readingOrder
				}, g);
				else {
					let t = m.vertAlign, n = $(B.size, S), r = 0;
					t === "superscript" ? r = -Math.round(n * .35) : t === "subscript" && (r = Math.round(n * .1));
					let i = t ? {
						...m,
						size: m.size * .65
					} : m;
					t && (e.font = wa(e, i, S, g, X));
					let a = null, o = () => a ??= e.measureText(X), s = () => {
						let e = Math.min(o().width, ae - P - 3);
						return {
							x: D === "right" ? L + M - 3 - e : D === "center" ? L + M / 2 - e / 2 : L + P,
							width: e
						};
					}, l = $(i.size, S);
					if (m.underline || h) {
						let { x: t, width: n } = s(), i = (O === "top" ? c + 2 + l + 1 : O === "center" ? c + F / 2 + Math.round(l * .55) : c + F - 2 + 1) + r, a = h ? "#0563C1" : T ? U(T) : "#000000", o = m.underlineStyle === "double" || m.underlineStyle === "doubleAccounting";
						Da(e, t, t + n, i, a, o, C);
					}
					if (m.strike) {
						let { x: t, width: n } = s(), i = (O === "top" ? c + 2 + Math.round(l * .5) : O === "center" ? c + F / 2 : c + F - 2 - Math.round(l * .35)) + r, a = i + z(i, .5, C);
						e.save(), e.strokeStyle = T ? U(T) : "#000000", e.lineWidth = .5, e.beginPath(), e.moveTo(t, a), e.lineTo(t + n, a), e.stroke(), e.restore();
					}
					if (X.includes("\n")) {
						let t = X.split("\n"), n = $(B.size, S, 1.2), i = t.length * n, a;
						O === "top" ? (a = c + 2, e.textBaseline = "top") : O === "center" ? (a = c + (F - i) / 2, e.textBaseline = "top") : (a = c + F - i - 2, e.textBaseline = "top");
						for (let i = 0; i < t.length; i++) e.fillText(t[i], q, a + i * n + r);
					} else {
						let { baseline: t, textY: n } = La({
							alignH: D,
							alignV: O,
							cx: L,
							cy: c,
							cellW: M,
							cellH: F,
							leftPad: P,
							paddingX: 3,
							paddingY: 2
						});
						e.textBaseline = t, e.fillText(pe, q, n + r);
					}
				}
				let Ce = R.value.type === "text" ? R.value.phoneticRuns : void 0;
				if (R.showPhonetic && Ce && Ce.length > 0 && !X.includes("\n")) {
					let t = wa(e, m, S, g, X), n = Ea(e, X, t), r;
					r = D === "right" ? L + M - 3 - n : D === "center" ? L + M / 2 - n / 2 : L + P;
					let i = T ? U(T) : "#000000";
					Ta(e, Ce, R.value.type === "text" ? R.value.phoneticPr : void 0, X, t, _, r, c, S, i, g);
				}
				e.restore(), X && t.onTextRun && t.onTextRun({
					sheetName: t.worksheet.name,
					cellRef: ti(r, s),
					text: X,
					x: L,
					y: c,
					width: M,
					height: F,
					row: r,
					col: s
				});
			});
		}
	}
	for (let e of P) e();
	for (let e of te) e();
	for (let e of N) e();
	e.restore();
}
var ao = /* @__PURE__ */ new WeakMap();
function oo(e) {
	ao.delete(e);
}
function so(e, t, n) {
	return {
		resource: t,
		operation: n,
		limit: je(e).maxCoordinateIndexEntries
	};
}
function co(e) {
	let t = je(e).maxCoordinateIndexEntries, n = ao.get(e);
	if (n && n.rowCount === e.rows.length && n.coordinateIndexLimit === t) return n;
	n && ao.delete(e);
	let r = so(e, "worksheet-cell-index", "index-worksheet-cells"), i = Tt(e.rows, r), a = /* @__PURE__ */ new Map();
	for (let t of e.rows) {
		let e = t.cells.filter((e) => e.value.type !== "empty").map((e) => e.col).sort((e, t) => e - t);
		e.length > 0 && a.set(t.index, e);
	}
	let o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), c = so(e, "worksheet-merge-anchor-index", "index-merge-anchor-coordinates"), l = so(e, "worksheet-merge-skip-index", "expand-merged-cell-coordinates");
	for (let t of e.mergeCells ?? []) {
		Et(s, `${t.top}:${t.left}`, c), Ct(t, l, 1);
		for (let e = t.top; e <= t.bottom; e++) for (let n = t.left; n <= t.right; n++) e === t.top && n === t.left || Et(o, `${e}:${n}`, l);
	}
	let u = /* @__PURE__ */ new Set();
	if (e.autoFilter) {
		let t = e.autoFilter, n = so(e, "worksheet-auto-filter-index", "expand-auto-filter-coordinates");
		Ct({
			top: t.top,
			bottom: t.top,
			left: t.left,
			right: t.right
		}, n);
		for (let e = t.left; e <= t.right; e++) Et(u, `${t.top}:${e}`, n);
	}
	let d = /* @__PURE__ */ new Map(), f = so(e, "worksheet-hyperlink-index", "index-hyperlink-coordinates");
	for (let t of e.hyperlinks ?? []) t.url && wt(d, `${t.row}:${t.col}`, t.url, f);
	let p = /* @__PURE__ */ new Set(), m = so(e, "worksheet-comment-index", "index-comment-coordinates");
	for (let t of e.commentRefs ?? []) {
		let e = _a(t);
		e && Et(p, `${e.row}:${e.col}`, m);
	}
	let h = {
		rowCount: e.rows.length,
		coordinateIndexLimit: t,
		cellMap: i,
		nonEmptyColsByRow: a,
		cfContext: Rr(e, i),
		mergeAnchorSet: s,
		mergeSkipSet: o,
		autoFilterCells: u,
		hyperlinkMap: d,
		commentCells: p,
		tableStyleMap: eo(e),
		pivotStyleMap: Nt(e),
		sparklineMap: no(e)
	};
	return ao.set(e, h), h;
}
var lo = /* @__PURE__ */ new WeakMap();
function uo(e, t) {
	if (!e) return;
	let n = t.dxfs ?? [];
	return e.isHeader ? n[e.headerRowDxf ?? -1] : e.isTotals ? n[e.totalRowDxf ?? -1] : e.isLastCol && e.lastColumnDxf != null ? n[e.lastColumnDxf] : e.isFirstCol && e.firstColumnDxf != null ? n[e.firstColumnDxf] : e.stripeDxf == null ? n[e.wholeTableDxf ?? -1] : n[e.stripeDxf];
}
function fo(e, t) {
	return t.ownFontColor ? null : e?.font?.color ?? null;
}
function po(e, t, n) {
	return n.ownFontColor ? null : e?.font?.color ?? t?.fontColor ?? null;
}
function mo(e, t) {
	return t == null ? e : e.map((e) => e.font?.normalColor ? {
		...e,
		font: {
			...e.font,
			color: t
		}
	} : e);
}
function ho(e, t, n, r, i) {
	let a = uo(n, r), o = n ? n.isCustom ? !!a?.font?.bold : n.isHeader || n.isTotals : !1, s = t.fontBold ?? (e.bold || o || !!i?.bold), c = t.fontItalic ?? (e.italic || !!i?.italic), l = t.fontUnderline ?? (e.underline || !!i?.underline), u = t.fontStrike ?? (e.strike || !!i?.strike);
	return s === e.bold && c === e.italic && l === e.underline && u === e.strike ? e : {
		...e,
		bold: s,
		italic: c,
		underline: l,
		strike: u
	};
}
function go(e, t, n) {
	let r = [[]];
	for (let t of e) {
		let e = t.text.split("\n");
		for (let n = 0; n < e.length; n++) n > 0 && r.push([]), e[n] !== "" && r[r.length - 1].push({
			...t,
			text: e[n]
		});
	}
	let i = t.size;
	return r.map((e) => {
		if (e.length === 0) return {
			runs: e,
			heightPx: $(i || ta, n, 1.2)
		};
		let r = 0;
		for (let n of e) {
			let e = Oa(t, n);
			e.size > r && (r = e.size), i = e.size;
		}
		return {
			runs: e,
			heightPx: $(r, n, 1.2)
		};
	});
}
function _o(e, t, n, r, i, a, o, s, c, l) {
	let u = i.alignH ?? Fa(t.value.type), d = i.indent ? Math.round(i.indent * 3 * o) : 0, f = s ? Math.max(8, Math.round(Math.min(a, c) * .55)) : 0, p = f > 0 ? f + 4 : 0, m = 3 + (u === "left" || !i.alignH ? d : 0) + p, h = Math.max(1, a - m - 3), g = t.value.type === "text" ? t.value.runs : void 0, _ = !!g?.length, v = i.textRotation ?? 0;
	if (e.font = wa(e, r, 1, l, n), v === 255) return [...n].length * $(r.size, 1, 1.1) + 4;
	if (v > 0) {
		let t = v <= 90 ? v * Math.PI / 180 : (v - 90) * Math.PI / 180, i = $(r.size, 1, 1.2), a = e.measureText(n.replace(/\n/g, " ")).width;
		return Math.abs(Math.sin(t)) * a + Math.abs(Math.cos(t)) * i + 4;
	}
	let y;
	if (i.wrapText && _) y = Pa(e, g, r, 1, h, l).map((e) => $(e.maxFontSize, 1, 1.2));
	else if (i.wrapText) {
		e.font = wa(e, r, 1, l, n);
		let t = $(r.size, 1, 1.2);
		y = Ma(e, n, h).map(() => t);
	} else if (_) y = go(g, r, 1).map((e) => e.heightPx);
	else {
		let e = Math.max(1, n.split("\n").length), t = $(r.size, 1, 1.2);
		y = Array.from({ length: e }, () => t);
	}
	return y.reduce((e, t) => e + t, 0) + (y.length > 1 ? 4 : 2);
}
function vo(e, t, n, r) {
	if (n.wrapText || (n.textRotation ?? 0) > 0) return !0;
	if (e.value.type === "text") {
		if (e.value.text.includes("\n")) return !0;
		for (let n of e.value.runs ?? []) if ($(Oa(t, n).size, 1, 1.2) > r) return !0;
	}
	return $(t.size, 1, 1.2) > r;
}
function yo(e, t, n, r) {
	if (lo.has(t) || t.isChartSheet) return !1;
	if (t.defaultRowHeightCustom === !0) return lo.set(t, { derived: /* @__PURE__ */ new Map() }), !1;
	let i = la(t), a = Fe(t.defaultRowHeight), o = $(t.normalFontSize ?? t.defaultFontSize ?? ta, 1, 1.2), { cfContext: s, mergeAnchorSet: c, mergeSkipSet: l, tableStyleMap: u, pivotStyleMap: d } = co(t), f = /* @__PURE__ */ new Map(), p = !1;
	e.save();
	try {
		for (let m of t.rows) {
			if (m.hidden || m.customHeight === !0 || m.height !== null || Le(Ne(t), m.index) || Object.hasOwn(t.rowHeights, m.index)) continue;
			let h = a, g = [];
			for (let a of m.cells) {
				let f = `${m.index}:${a.col}`;
				if (a.value.type === "empty" || c.has(f) || l.has(f)) continue;
				let { font: p, xf: _ } = ka(n, a.styleIndex ?? 0);
				if (!vo(a, p, _, o)) continue;
				let v = Xr(a, m.index, a.col, s, n.dxfs ?? []), y = ho(p, v, u.get(f), n, d.get(f)), b = Rt(a, n, v.numFmt, t.date1904).text;
				if (!b || b === "0" && t.showZeros === !1) continue;
				let x = i.col.sizeOf(a.col);
				h = Math.max(h, _o(e, a, b, y, _, x, i.maximumDigitWidth, v.iconSet, Math.ceil(h), r)), v.iconSet && g.push({
					cell: a,
					text: b,
					font: y,
					xf: _,
					cellWidthPx: x,
					iconSet: v.iconSet
				});
			}
			let _ = g.length === 0;
			for (let t = 0; !_ && t < 32; t++) {
				let t = Math.ceil(h), n = h;
				for (let a of g) n = Math.max(n, _o(e, a.cell, a.text, a.font, a.xf, a.cellWidthPx, i.maximumDigitWidth, a.iconSet, t, r));
				h = n, _ = Math.ceil(h) === t;
			}
			if (!_) for (let t of g) h = Math.max(h, _o(e, t.cell, t.text, t.font, t.xf, t.cellWidthPx, i.maximumDigitWidth, t.iconSet, t.cellWidthPx, r));
			let v = Math.ceil(h);
			if (v > a) {
				let e = Ie(v);
				t.rowHeights[m.index] = e, f.set(m.index, e), p = !0;
			}
		}
	} finally {
		e.restore();
	}
	return lo.set(t, { derived: f }), p && Re.invalidate(t), p;
}
function bo(e) {
	return lo.has(e);
}
function xo(e) {
	return lo.get(e)?.derived ?? /* @__PURE__ */ new Map();
}
function So(e, t = []) {
	let n = lo.get(e);
	if (!n) return;
	let r = new Set(t), i = !1;
	for (let [t, a] of n.derived) Le(Ne(e), t) || r.has(t) || e.rowHeights[t] === a && (delete e.rowHeights[t], i = !0);
	lo.delete(e), i && Re.invalidate(e);
}
function Co(e, t) {
	let n = 0, r = e.length;
	for (; n < r;) {
		let i = n + r >> 1;
		e[i] < t ? n = i + 1 : r = i;
	}
	return n > 0 ? e[n - 1] : void 0;
}
function wo(e, t) {
	let n = 0, r = e.length;
	for (; n < r;) {
		let i = n + r >> 1;
		e[i] <= t ? n = i + 1 : r = i;
	}
	return n < e.length ? e[n] : void 0;
}
function To(e, t, n, r) {
	return (e.mergeCells ?? []).some((e) => t >= e.top && t <= e.bottom && e.right >= n && e.left <= r);
}
function Eo(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v) {
	let y = f, b = p, x = /* @__PURE__ */ new Set(), S = (i, d, f, p) => {
		let m = `${i}:${d}`, y = r.get(m);
		if (!y || y.value.type === "empty" || c.has(m)) return !1;
		let { font: b, xf: x } = ka(n, y.styleIndex ?? 0), S = Xr(y, i, d, a, n.dxfs ?? []), C = Rt(y, n, S.numFmt, t.date1904).text;
		if (!C || C === "0" && t.showZeros === !1 || y.value.type === "number" || x.wrapText || x.textRotation || C.includes("\n")) return !1;
		let w = o.get(m), T = w?.isHeader ? w.headerRowDxf : w?.isTotals ? w.totalRowDxf : w?.isLastCol && w.lastColumnDxf != null ? w.lastColumnDxf : w?.isFirstCol && w.firstColumnDxf != null ? w.firstColumnDxf : w?.stripeDxf ?? w?.wholeTableDxf, E = T == null ? void 0 : n.dxfs?.[T], D = !!w && !w.isCustom && (w.isHeader || w.isTotals), O = s.get(m), k = S.fontBold ?? (b.bold || D || !!E?.font?.bold || !!O?.bold), A = S.fontItalic ?? (b.italic || !!O?.italic);
		e.font = wa(e, k !== b.bold || A !== b.italic ? {
			...b,
			bold: k,
			italic: A
		} : b, h, v, C);
		let j = x.alignH ?? Fa(y.value.type), M = x.indent ? Math.round(x.indent * 3 * g) : 0, N = l.sizeOf(d), ee = u.sizeOf(i), te = S.iconSet ? Math.max(8, Math.round(Math.min(N, ee) * .55)) : 0, P = te > 0 ? te + 4 : 0, ne = 3 + (j === "left" || !x.alignH ? M : 0) + P, F = e.measureText(C).width + ne + 3, I = Math.max(0, F - N);
		return I <= 0 ? !1 : (j === "center" || j === "centerContinuous" ? I / 2 : ((_ ? f === "higher" ? "left" : "right" : f === "higher" ? "right" : "left") == "left" ? j === "right" : j !== "right") ? I : 0) > p;
	};
	for (let e of d) {
		let n = i.get(e);
		if (!n) continue;
		let a = Co(n, f), o = r.get(`${e}:${f}`);
		a != null && a >= m && (!o || o.value.type === "empty") && !To(t, e, a + 1, f) && S(e, a, "higher", l.offsetOf(f) - l.offsetOf(a + 1)) && (y = Math.min(y, a), x.add(`${e}:${a}`));
		let s = wo(n, p), c = r.get(`${e}:${p}`);
		s != null && s <= 16384 && (!c || c.value.type === "empty") && !To(t, e, p, s - 1) && S(e, s, "lower", l.offsetOf(s) - l.offsetOf(p + 1)) && (b = Math.max(b, s), x.add(`${e}:${s}`));
	}
	return {
		startCol: y,
		endCol: b,
		anchorKeys: x
	};
}
function Do(e, t) {
	Me(e, t), ao.set(t, co(e));
}
function Oo(e, t, n, r, i = {}, a) {
	qi(e, t, i.officeFontRoutes, i.googleSubstitutes === !0), Zi(t, i.authoritativeMdw);
	let o = i.dpr ?? 1, s = i.cellScale ?? 1, c = t.isChartSheet === !0, l = la(t), u = l.maximumDigitWidth, d = e.canvas.width / o, f = e.canvas.height / o;
	e.clearRect(0, 0, d, f), e.fillStyle = "#ffffff", e.fillRect(0, 0, d, f);
	let p = (e) => Math.round(e * s), m = c ? 0 : p(50), h = c ? 0 : p(22), { rows: g, cols: _ } = r, v = Math.max(1, Math.trunc(r.row) || 1), y = Math.max(1, Math.trunc(r.col) || 1), b = (i.scrollOffsetX ?? 0) * s, x = (i.scrollOffsetY ?? 0) * s, { col: S, row: C } = l.axesAtScale(s), w = S.bandsToCover(1, c ? 0 : i.freezeCols ?? 0, Math.max(0, d - m)), T = C.bandsToCover(1, c ? 0 : i.freezeRows ?? 0, Math.max(0, f - h)), E = T.at(-1)?.index ?? 0, D = w.at(-1)?.index ?? 0, O = w.map(({ index: e }) => e), k = T.map(({ index: e }) => e), A = w.map(({ size: e }) => e), j = T.map(({ size: e }) => e), M = A.reduce((e, t) => e + t, 0), N = j.reduce((e, t) => e + t, 0), ee = S.bandsToCover(y, Math.min(16384, y + _ - 1)), te = C.bandsToCover(v, Math.min(1048576, v + g - 1)), P = ee.map(({ index: e }) => e), ne = te.map(({ index: e }) => e), F = ee.map(({ size: e }) => e), I = te.map(({ size: e }) => e), { cellMap: L, cfContext: R, mergeSkipSet: B, autoFilterCells: V, hyperlinkMap: re, commentCells: H, tableStyleMap: U, pivotStyleMap: W, sparklineMap: ie, nonEmptyColsByRow: G } = co(t), ae = /* @__PURE__ */ new Map(), oe = so(t, "worksheet-merge-anchor-index", "index-merge-anchor-coordinates");
	for (let e of t.mergeCells ?? []) {
		let t = S.offsetOf(e.right + 1) - S.offsetOf(e.left), n = C.offsetOf(e.bottom + 1) - C.offsetOf(e.top);
		wt(ae, `${e.top}:${e.left}`, {
			totalW: t,
			totalH: n,
			right: e.right,
			bottom: e.bottom
		}, oe);
	}
	let se = P[0] ?? y, ce = P.at(-1) ?? Math.min(16384, y + _ - 1), le = Eo(e, t, n, L, G, R, U, W, ae, S, C, [...new Set([...k, ...ne])], se, ce, D + 1, s, u, t.rightToLeft === !0, a), ue = S.bandsToCover(le.startCol, le.endCol), de = ue.map(({ index: e }) => e), fe = ue.map(({ size: e }) => e), pe = b + S.offsetOf(se) - S.offsetOf(le.startCol), me = {
		worksheet: t,
		styles: n,
		cellMap: L,
		mergeAnchorMap: ae,
		mergeSkipSet: B,
		cfContext: R,
		colWidths: fe,
		rowHeights: I,
		colAxis: S,
		rowAxis: C,
		frozenColWidths: A,
		frozenRowHeights: j,
		frozenW: M,
		frozenH: N,
		startRow: v,
		startCol: y,
		cs: s,
		dpr: o,
		autoFilterCells: V,
		hyperlinkMap: re,
		commentCells: H,
		tableStyleMap: U,
		pivotStyleMap: W,
		sparklineMap: ie,
		overflowTextAnchors: le.anchorKeys,
		mdw: u,
		onTextRun: i.onTextRun,
		rtl: t.rightToLeft === !0,
		canvasW: d,
		threeD: i.threeD,
		cfDiagnostics: i.cfDiagnostics
	}, K = m, q = h, J = K + M, Y = q + N, he = Math.max(0, d - J), ge = Math.max(0, f - Y);
	E > 0 && D > 0 && io(e, me, 1, 1, A, j, O, k, 0, 0, K, q, K, q, M, N, a), E > 0 && io(e, me, 1, le.startCol, fe, j, de, k, pe, 0, J, q, J, q, he, N, a), D > 0 && io(e, me, v, 1, A, I, O, ne, 0, x, K, Y, K, Y, M, ge, a), c || io(e, me, v, le.startCol, fe, I, de, ne, pe, x, J, Y, J, Y, he, ge, a), Ao(e, t, S, C, i.loadedImages, s, v, y, b, x, J, Y, he, ge, t.rightToLeft === !0, d, i.threeD, i.regionMap, i.chartEx, a), !c && t.slicers && t.slicers.length > 0 && _s(e, t, S, C, s, v, y, b, x, J, Y, he, ge, t.rightToLeft === !0, d), c || ko(e, d, f, v, y, g, _, F, I, P, ne, b, x, A, j, O, k, M, N, m, h, s, o, i.selectedRowRange ?? null, i.selectedColRange ?? null, t.rightToLeft === !0, i.chromeColors);
	let _e = t.rightToLeft === !0;
	if (E > 0) {
		e.save(), e.strokeStyle = ia, e.lineWidth = .5, e.beginPath();
		let t = Y + z(Y, .5, o);
		e.moveTo(0, t), e.lineTo(d, t), e.stroke(), e.restore();
	}
	if (D > 0) {
		e.save(), e.strokeStyle = ia, e.lineWidth = .5, e.beginPath();
		let t = _e ? d - J : J, n = t + z(t, .5, o);
		e.moveTo(n, h), e.lineTo(n, f), e.stroke(), e.restore();
	}
}
function ko(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E) {
	let D = E?.surface ?? "#f8f9fa", O = E?.mutedSurface ?? "#e8eaed", k = E?.selectedSurface ?? "#caddf6", A = E?.border ?? "#c8ccd0", j = E?.accent ?? "#5b9bd5", M = E?.text ?? "#444", N = (e) => !w || e < w.start || e > w.end ? D : w.strong ? k : O, ee = (e) => !w || e < w.start || e > w.end ? A : w.strong ? j : A, te = (e) => !C || e < C.start || e > C.end ? D : C.strong ? k : O, P = (e) => !C || e < C.start || e > C.end ? A : C.strong ? j : A, ne = `${Math.max(1, Math.round(11 * x))}px ${Ai}`, F = y + _, I = b + v, L = .5 / S, R = (e, n) => T ? na(e, n, t) : e, B = T ? t - y : 0;
	e.fillStyle = D, e.fillRect(B, 0, y, b), e.strokeStyle = A, e.lineWidth = .5, e.beginPath();
	let V = T ? B + z(B, .5, S) : B + y - L;
	e.moveTo(V, 0), e.lineTo(V, b), e.moveTo(B, b - L), e.lineTo(B + y, b - L), e.stroke(), e.font = ne, e.fillStyle = M;
	let re = (t, n, r) => {
		let i = R(n, r);
		e.fillStyle = N(t), e.fillRect(i, 0, r, b), e.strokeStyle = ee(t), e.lineWidth = .5, e.beginPath();
		let a = i + z(i, .5, S);
		e.moveTo(a, 0), e.lineTo(a, b), e.moveTo(i, b - L), e.lineTo(i + r, b - L), e.stroke(), e.fillStyle = M, e.textAlign = "center", e.textBaseline = "middle", e.fillText(Ja(t), i + r / 2, b / 2);
	}, H = (t, n, r) => {
		let i = B;
		e.fillStyle = te(t), e.fillRect(i, n, y, r), e.strokeStyle = P(t), e.lineWidth = .5, e.beginPath();
		let a = n + z(n, .5, S), o = T ? i + z(i, .5, S) : i + y - L;
		e.moveTo(o, n), e.lineTo(o, n + r), e.moveTo(i, a), e.lineTo(i + y, a), e.stroke(), e.fillStyle = M, e.textBaseline = "middle";
		let s = Math.max(2, Math.round(4 * x));
		T ? (e.textAlign = "left", e.fillText(String(t), i + s, n + r / 2)) : (e.textAlign = "right", e.fillText(String(t), i + y - s, n + r / 2));
	};
	if (p.length > 0) {
		e.save(), e.beginPath(), e.rect(R(y, _), 0, _, b), e.clip();
		let t = y;
		for (let e = 0; e < p.length; e++) re(h[e], t, p[e]), t += p[e];
		e.restore();
	}
	e.save(), e.beginPath(), e.rect(R(F, t - F), 0, t - F, b), e.clip();
	let U = F - d;
	for (let e = 0; e < s.length; e++) {
		let n = s[e];
		U + n > F && U < t && re(l[e], U, n), U += n;
	}
	if (e.restore(), m.length > 0) {
		e.save(), e.beginPath(), e.rect(B, b, y, v), e.clip();
		let t = b;
		for (let e = 0; e < m.length; e++) H(g[e], t, m[e]), t += m[e];
		e.restore();
	}
	e.save(), e.beginPath(), e.rect(B, I, y, n - I), e.clip();
	let W = I - f;
	for (let e = 0; e < c.length; e++) {
		let t = c[e];
		W + t > I && W < n && H(u[e], W, t), W += t;
	}
	e.restore();
}
function Ao(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y) {
	let b = [], x = 0;
	if (i) for (let e of t.images ?? []) b.push({
		kind: "image",
		zOrder: e.zOrder ?? 2 ** 53 - 1,
		fallbackOrder: x++,
		anchor: e
	});
	for (let e of t.shapeGroups ?? []) for (let t of e.shapes) b.push({
		kind: "shape",
		zOrder: t.zOrder ?? 2 ** 53 - 1,
		fallbackOrder: x++,
		anchor: e,
		shape: t
	});
	for (let e of t.charts ?? []) b.push({
		kind: "chart",
		zOrder: e.zOrder ?? 2 ** 53 - 1,
		fallbackOrder: x++,
		anchor: e
	});
	b.sort((e, t) => e.zOrder - t.zOrder || e.fallbackOrder - t.fallbackOrder);
	for (let x of b) x.kind === "image" ? No(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, [x.anchor]) : x.kind === "shape" ? Po(e, t, n, r, a, o, s, c, l, u, d, f, p, i, m, h, [{
		...x.anchor,
		shapes: [x.shape]
	}], y) : is(e, t, n, r, a, o, s, c, l, u, d, f, p, m, h, i, [x.anchor], g, _, v);
}
function jo(e, t) {
	return e.offsetOf(t);
}
function Mo(e, t) {
	return e.offsetOf(t);
}
function No(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g = t.images) {
	if (f <= 0 || p <= 0) return;
	let _ = jo(n, s), v = Mo(r, o);
	e.save(), e.beginPath();
	let y = ra(u, f, h, m);
	e.rect(y, d, f, p), e.clip();
	for (let o of g) {
		let s = Di(o.imagePath, o.duotone), g = i.get(s), b = Ci(i, s, "tiff");
		if (!g && !b) continue;
		let { x, y: S, width: C, height: w } = vi(t, o, n, r, a);
		if (C <= 0 || w <= 0) continue;
		let T = ra(u + (x - _) - c, C, h, m), E = d + (S - v) - l, D = Ti({
			x: T,
			y: E,
			width: C,
			height: w
		}, o.rotation);
		if (D.x + D.width < y || D.x > y + f || D.y + D.height < d || D.y > d + p) continue;
		let O = () => {
			g ? ae(e, g, o.srcRect, T, E, C, w) : A(e, "tiff", {
				x: T,
				y: E,
				width: C,
				height: w
			});
		}, k = () => {
			if (o.alpha != null && o.alpha < 1) {
				e.save();
				try {
					e.globalAlpha = o.alpha, O();
				} finally {
					e.restore();
				}
			} else O();
		}, j = o.rotation ?? 0, M = o.flipH ?? !1, N = o.flipV ?? !1;
		j === 0 && !M && !N ? k() : ge(e, {
			rect: {
				x: T,
				y: E,
				w: C,
				h: w
			},
			geometry: {
				kind: "preset",
				name: "rect",
				adjustments: []
			},
			fill: null,
			stroke: null,
			transform: {
				rotationDeg: j,
				flipH: M,
				flipV: N
			}
		}, k);
	}
	e.restore();
}
function Po(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g = t.shapeGroups ?? [], _) {
	if (d <= 0 || f <= 0 || g.length === 0) return;
	let v = jo(n, o), y = Mo(r, a);
	e.save(), e.beginPath();
	let b = ra(l, d, h, m);
	e.rect(b, u, d, f), e.clip();
	for (let a of g) {
		let { x: o, y: g, width: x, height: S } = vi(t, a, n, r, i);
		if (x <= 0 || S <= 0) continue;
		let C = ra(l + (o - v) - s, x, h, m), w = u + (g - y) - c;
		if (!(C + x < b || C > b + d) && !(w + S < u || w > u + f)) for (let t of a.shapes) {
			let n = C + t.x * x, r = w + t.y * S, a = t.w * x, o = t.h * S;
			a <= 0 || o <= 0 || Lo(e, t, n, r, a, o, i, p, _);
		}
	}
	e.restore();
}
function Fo(e, t, n, r, i, a) {
	if (t.w <= 0 || t.h <= 0) return;
	let o = i / t.w, s = a / t.h, c = n, l = r, u = n, d = r;
	for (let i of t.commands) switch (i.op) {
		case "moveTo": {
			let t = n + i.x * o, a = r + i.y * s;
			e.moveTo(t, a), c = u = t, l = d = a;
			break;
		}
		case "lineTo": {
			let t = n + i.x * o, a = r + i.y * s;
			e.lineTo(t, a), c = t, l = a;
			break;
		}
		case "cubicBezTo": {
			let t = n + i.x3 * o, a = r + i.y3 * s;
			e.bezierCurveTo(n + i.x1 * o, r + i.y1 * s, n + i.x2 * o, r + i.y2 * s, t, a), c = t, l = a;
			break;
		}
		case "quadBezTo": {
			let t = n + i.x2 * o, a = r + i.y2 * s;
			e.quadraticCurveTo(n + i.x1 * o, r + i.y1 * s, t, a), c = t, l = a;
			break;
		}
		case "arcTo": {
			let t = i.wr * o, n = i.hr * s;
			if (t <= 0 || n <= 0) break;
			let r = i.stAng / 6e4 * (Math.PI / 180), a = i.swAng / 6e4 * (Math.PI / 180), u = c - Math.cos(r) * t, d = l - Math.sin(r) * n, f = r + a;
			e.ellipse(u, d, t, n, 0, r, f, a < 0), c = u + Math.cos(f) * t, l = d + Math.sin(f) * n;
			break;
		}
		case "close":
			e.closePath(), c = u, l = d;
			break;
	}
}
function Io(e, t, n, r, i, a) {
	if (t.geom.type === "custom") for (let o of t.geom.paths) o.fill !== "none" && Fo(e, o, n, r, i, a);
	else (t.geom.type !== "preset" || !v(e, t.geom.name, n, r, i, a, t.geom.adj ?? [])) && e.rect(n, r, i, a);
}
function Lo(e, t, n, r, i, a, o, s, c) {
	if (fe(t.strokeFill) && (e = H(e)), e.save(), t.rot !== 0 || t.flipH || t.flipV ? (e.translate(n + i / 2, r + a / 2), e.rotate(t.rot * Math.PI / 180), e.scale(t.flipH ? -1 : 1, t.flipV ? -1 : 1), e.translate(-i / 2, -a / 2)) : e.translate(n, r), t.geom.type === "custom") {
		let n = Ko(e, t, i, a, o);
		for (let r of t.geom.paths) if (!(r.w <= 0 || r.h <= 0)) {
			if (e.beginPath(), Fo(e, r, 0, 0, i, a), r.fill !== "none" && qo(e, t, i, a, o, n)) {
				let t = h(r.fill);
				t && (e.fillStyle = t, e.fill());
			}
			r.stroke !== !1 && Yo(e, t, i, a, o);
		}
	} else if (t.geom.type === "preset") {
		let n = Ko(e, t, i, a, o), r = t.strokeColor && t.strokeWidth > 0 ? () => Yo(e, t, i, a, o) : null;
		S(e, t.geom.name, 0, 0, i, a, t.geom.adj ?? [], n, r, () => {}) || (e.beginPath(), e.rect(0, 0, i, a), Wo(e, t, i, a, o));
	} else if (t.geom.type === "image") {
		let n = t.geom, r = Di(n.imagePath, n.duotone), o = s?.get(r), c = Ci(s, r, "tiff");
		if (o || c) {
			let t = n.alpha, r = () => {
				o ? ae(e, o, n.srcRect, 0, 0, i, a) : A(e, "tiff", {
					x: 0,
					y: 0,
					width: i,
					height: a
				});
			};
			t != null && t < 1 ? (e.save(), e.globalAlpha = t, r(), e.restore()) : r();
		}
	}
	t.text && ((t.text.vert === "wordArtVert" || t.text.vert === "wordArtVertRtl") && (t.flipH || t.flipV) ? (e.save(), e.translate(i / 2, a / 2), e.scale(t.flipH ? -1 : 1, t.flipV ? -1 : 1), t.flipV && e.rotate(Math.PI), e.translate(-i / 2, -a / 2), Uo(e, t.text, i, a, o, c), e.restore()) : Uo(e, t.text, i, a, o, c)), e.restore();
}
var Ro = /* @__PURE__ */ new WeakMap();
function zo(e, t) {
	let n = e.tinted.get(t);
	if (n) return n;
	let r = x(e.raster, t);
	return e.tinted.set(t, r), r;
}
function Bo(e) {
	let t = [];
	for (let n of e.shapeGroups ?? []) for (let e of n.shapes) for (let n of e.text?.paragraphs ?? []) for (let e of n.runs) e.type === "math" && t.push({
		nodes: e.nodes,
		display: e.display
	});
	return t;
}
function Vo(e) {
	for (let t of e.shapeGroups ?? []) for (let e of t.shapes) for (let t of e.text?.paragraphs ?? []) for (let e of t.runs) if (e.type === "math" && !Ro.has(e.nodes)) return !0;
	return !1;
}
async function Ho(e, t) {
	let n = Bo(e).filter((e) => !Ro.has(e.nodes));
	if (n.length !== 0) {
		await t.loadMathJax();
		for (let e of n) if (!Ro.has(e.nodes)) try {
			let n = await t.mathMLToSvg(_(e.nodes, e.display)), r = await R(n, "#000000");
			Ro.set(e.nodes, {
				raster: r,
				widthEm: n.widthEm,
				ascentEm: n.ascentEm,
				descentEm: n.descentEm,
				tinted: /* @__PURE__ */ new Map()
			});
		} catch {}
	}
}
function Uo(e, t, n, r, i, a) {
	if (n <= 0 || r <= 0 || t.paragraphs.length === 0) return;
	let o = De(n, r, {
		lIns: t.lIns,
		rIns: t.rIns,
		tIns: t.tIns,
		bIns: t.bIns
	}, i / Y), s = o.left;
	o.top, t.bIns / Y * i;
	let c = o.width, l = o.height;
	if (c <= 0 || l <= 0) return;
	let u = (t, n = 1) => {
		let r = (t.size > 0 ? t.size : ta) * J * i * n, o = ea(t.fontFace, a, t.text, Xi(e, t.fontFace, t.bold, t.italic), Bi.get(e) === !0, void 0, Ji(e, t.fontFace));
		return {
			font: `${t.italic ? "italic " : ""}${t.bold ? "bold " : ""}${r}px ${o}`,
			px: r
		};
	};
	if (t.vert === "wordArtVert" || t.vert === "wordArtVertRtl") {
		let n = t.autoFit === "norm" ? t.fontScale ?? 1 : 1;
		if (n === 0) return;
		gt(e, t, t.vert, o, J * i, (e, t) => {
			let r = N(t.codePointAt(0) ?? 0) ? e.fontFaceEa ?? e.fontFace : e.fontFace;
			return {
				...u({
					...e,
					text: t,
					fontFace: r
				}, n),
				face: r
			};
		}, (t, r) => {
			let a = Ro.get(t.nodes);
			if (!a) return;
			let o = (t.fontSize ?? r) * J * i * n, s = a.widthEm * o, c = (a.ascentEm + a.descentEm) * o;
			return {
				width: s,
				height: c,
				draw: (n, r) => {
					s > 0 && c > 0 && e.drawImage(zo(a, t.color ?? "#000000"), n, r, s, c);
				}
			};
		});
		return;
	}
	let d = /* @__PURE__ */ new Map(), f = !t.paragraphs.some((e) => e.runs.some((e) => e.type === "math")), p = Li.get(e), m = it(e);
	for (let e of t.paragraphs) for (let t of e.runs) {
		if (!f) break;
		if (t.type !== "text") continue;
		let e = t.fontFace ? lt(t, p?.[et(t)], m) : void 0;
		e ? d.set(t, e) : f = !1;
	}
	t.paragraphs.some((e) => e.runs.some((e) => e.type === "text")) || (f = !1);
	let h = (t, n) => {
		let r = e.font;
		e.font = t;
		let i = e.measureText("M").actualBoundingBoxAscent;
		return e.font = r, i > 0 ? i : n * .85;
	}, g = t.wrap !== "none", _ = [], v = [], y;
	for (let n of t.paragraphs) {
		let r = n.align || "l", a = (n.marL ?? 0) / Y * i, o = (n.marR ?? 0) / Y * i, s = Math.max(0, (n.indent ?? 0) / Y * i), l = Math.max(0, c - a - o), p = [], m = 0;
		for (let e of n.runs) {
			if (e.type === "break") {
				p.push({ type: "break" });
				continue;
			}
			if (e.type === "math") {
				let t = Ro.get(e.nodes);
				if (!t) continue;
				let n = (e.fontSize ?? (m || ta)) * J * i, r = t.ascentEm * n, a = t.descentEm * n, o = {
					kind: "math",
					font: "",
					color: e.color ?? "#000000",
					pxSize: n,
					render: t,
					ascent: r,
					descent: a,
					display: e.display === !0
				};
				p.push({
					type: "object",
					width: t.widthEm * n,
					style: o,
					payload: o,
					display: e.display
				});
				continue;
			}
			m = e.size > 0 ? e.size : ta;
			let { font: t, px: n } = u(e);
			p.push({
				type: "text",
				text: e.text,
				style: {
					kind: "text",
					font: t,
					color: e.color ?? "#000000",
					pxSize: n,
					face: e.fontFace,
					ratios: f ? d.get(e) : void 0
				}
			});
		}
		let b = we(p, {
			maxWidth: g ? l : Infinity,
			firstLineIndent: s,
			measureText(t, n) {
				return e.font = n.font, e.measureText(t).width;
			},
			sameStyle: (e, t) => e.kind === t.kind && e.font === t.font && e.color === t.color && e.pxSize === t.pxSize,
			tabStops: n.tabStops?.map((e) => ({
				pos: e.pos / Y * i,
				algn: e.algn
			})),
			defaultTabSize: (n.defTabSz ?? 914400) / Y * i,
			tabStartPen: (e) => a + (e === 0 ? s : 0)
		}), x = [], S = !1;
		for (let e of p) {
			if (e.type === "break") {
				S = !1;
				continue;
			}
			if (e.type === "object") {
				e.display ? (x.push(!S), S = !1) : S = !0;
				continue;
			}
			if (e.text === "") {
				S = !0;
				continue;
			}
			e.text.split("\n").forEach((e, t) => {
				t > 0 && (S = !1), e.replace(/\r/gu, "") !== "" && (S = !0);
			});
		}
		let C = 0, w = /* @__PURE__ */ new Map();
		p.forEach((e, t) => {
			e.type === "text" && w.set(e.style, t);
		});
		let T, E = -1, D = (e) => {
			let t = w.get(e) ?? -1;
			t >= E && (T = e, E = t);
		}, O = () => {
			let t = T?.pxSize ?? ta * 1.3333333333333333 * i, n = T?.face;
			return T?.ratios ? {
				height: t * (T.ratios.ascentRatio + T.ratios.descentRatio),
				ascent: t * T.ratios.ascentRatio
			} : {
				height: t * 1.2,
				ascent: h(`${t}px ${ea(n, void 0, "", Xi(e, n), Bi.get(e) === !0, void 0, Ji(e, n))}`, t)
			};
		}, k = t.autoFit === "norm" ? t.lnSpcReduction ?? 0 : 0, A = Qe(n.spaceLine), j = (e) => Ae(e, A, J * i, k), M = (e, t) => {
			let n = xe({
				ascent: e,
				descent: t
			}, A, J * i, k);
			return {
				height: n.ascent + n.descent,
				ascent: n.ascent
			};
		}, N = _.length;
		for (let [e, t] of b.entries()) {
			let n = [], i = 0, o = 0, c = 0, u = 0, d = !1, m = !1;
			for (let e of t.segments) {
				if (e.type === "tab") {
					n.push({
						kind: "tab",
						w: e.width
					});
					continue;
				}
				if (e.type === "object") {
					let t = e.style;
					if (!t.render) continue;
					let r = t.ascent ?? 0, a = t.descent ?? 0;
					n.push({
						kind: "math",
						render: t.render,
						color: t.color,
						w: e.width,
						ascent: r,
						descent: a
					}), i = Math.max(i, r + a), o = Math.max(o, r), d = !0, t.display && (m = !0);
					continue;
				}
				let t = e.style;
				n.push({
					kind: "text",
					text: e.text,
					font: t.font,
					color: t.color,
					w: e.width
				}), i = Math.max(i, t.pxSize * 1.2), o = Math.max(o, h(t.font, t.pxSize)), t.ratios && (c = Math.max(c, t.pxSize * t.ratios.ascentRatio), u = Math.max(u, t.pxSize * t.ratios.descentRatio)), D(t);
			}
			if (m && x[C++]) {
				let e = O();
				_.push({
					segs: [],
					align: r,
					height: j(e.height),
					ascent: e.ascent,
					hasMath: !1,
					leftInset: a,
					availW: l,
					gapBefore: 0
				}), v.push(e.height);
			}
			for (let e of t.hiddenRuns ?? []) {
				let t = p[e];
				t.type === "text" && (i = Math.max(i, t.style.pxSize * 1.2), o = Math.max(o, h(t.style.font, t.style.pxSize)), t.style.ratios && (c = Math.max(c, t.style.pxSize * t.style.ratios.ascentRatio), u = Math.max(u, t.style.pxSize * t.style.ratios.descentRatio)), D(t.style));
			}
			let g;
			if (f) {
				if (c + u === 0) {
					let e = O();
					c = e.ascent, u = e.height - e.ascent;
				}
				i = c + u, {height: g, ascent: o} = M(c, u);
			} else i === 0 && ({height: i, ascent: o} = O()), g = j(i);
			let y = m;
			_.push({
				segs: n,
				align: r,
				height: g,
				ascent: o,
				hasMath: d,
				leftInset: y ? a : a + (e === 0 ? s : 0),
				availW: y ? l : l - (e === 0 ? s : 0),
				gapBefore: 0
			}), v.push(i);
		}
		_.length > N && (y && N > 0 && (_[N].gapBefore = be(Qe(y.spaceAfter), y.lastNaturalHeight, J * i) + be(Qe(n.spaceBefore), v[N], J * i)), y = {
			spaceAfter: n.spaceAfter,
			lastNaturalHeight: v[_.length - 1]
		});
	}
	let b = (e) => Number(/(\d+(?:\.\d+)?)px/u.exec(e)?.[1] ?? 0), x = (t) => {
		let n = e.font, r = e.textBaseline;
		e.font = t.font, e.textBaseline = "alphabetic";
		let i = e.measureText(t.text).actualBoundingBoxAscent;
		e.textBaseline = "middle";
		let a = e.measureText(t.text).actualBoundingBoxAscent;
		e.font = n, e.textBaseline = r;
		let o = i - a;
		return Number.isFinite(o) ? o : 0;
	}, S = _.reduce((e, t) => e + t.gapBefore + t.height, 0), C = Ce(t.anchor, o, S);
	for (let t of _) {
		C += t.gapBefore;
		let n = t.segs.reduce((e, t) => e + t.w, 0), r = s + t.leftInset, i = X(t.align, r, t.availW, n), a = t.segs.map((e) => ({
			type: "object",
			style: e,
			width: e.w
		}));
		if (t.hasMath) {
			e.textBaseline = "alphabetic";
			let n = C + t.ascent;
			We(a, i, n, (t, r) => {
				let i = t.style;
				if (i.kind === "text") e.font = i.font, e.fillStyle = i.color, e.fillText(i.text, r, n);
				else if (i.kind === "math") {
					let t = zo(i.render, i.color);
					e.drawImage(t, r, n - i.ascent, i.w, i.ascent + i.descent);
				}
			});
		} else if (f) {
			e.textBaseline = "alphabetic";
			let n = C + t.ascent;
			We(a, i, n, (t, r) => {
				let i = t.style;
				i.kind === "text" && (e.font = i.font, e.fillStyle = i.color, e.fillText(i.text, r, n));
			});
		} else {
			let n = C + t.height / 2, r = t.segs.filter((e) => e.kind === "text"), o = r.reduce((e, t) => !e || b(t.font) > b(e.font) ? t : e, void 0), s = o && r.some((e) => e.font !== o.font) ? n + x(o) : void 0;
			e.textBaseline = s === void 0 ? "middle" : "alphabetic";
			let c = s ?? n;
			We(a, i, c, (t, n) => {
				let r = t.style;
				r.kind === "text" && (e.font = r.font, e.fillStyle = r.color, e.fillText(r.text, n, c));
			});
		}
		C += t.height;
	}
}
function Wo(e, t, n, r, i) {
	qo(e, t, n, r, i), Yo(e, t, n, r, i);
}
function Go(e, t, n) {
	if (e.rot === 0 && !e.flipH && !e.flipV) return;
	let r = e.rot * Math.PI / 180, i = Math.cos(r), a = Math.sin(r), o = e.flipH ? -1 : 1, s = e.flipV ? -1 : 1, c = o * i, l = -s * a, u = o * a, d = s * i, f = t / 2, p = n / 2;
	return {
		a: c,
		b: l,
		c: u,
		d,
		e: f - c * f - u * p,
		f: p - l * f - d * p
	};
}
function Ko(e, t, n, r, i) {
	return V(t.fill ?? (t.fillColor ? {
		fillType: "solid",
		color: t.fillColor
	} : null), e, 0, 0, n, r, t.rot, J * i, Go(t, n, r), (e, n, r, i, a) => Io(e, t, n, r, i, a));
}
function qo(e, t, n, r, i, a = Ko(e, t, n, r, i)) {
	return a ? (e.fillStyle = a, e.fill(), !0) : !1;
}
function Jo(e) {
	return !e.strokeColor || e.strokeWidth <= 0 ? null : {
		color: e.strokeColor,
		width: e.strokeWidth,
		...e.strokeFill ? { fill: e.strokeFill } : {},
		...e.strokeDashStyle ? { dashStyle: e.strokeDashStyle } : {},
		...e.strokeCustomDash?.length ? { customDash: e.strokeCustomDash } : {},
		...e.strokeLineCap ? { lineCap: e.strokeLineCap } : {},
		...e.strokeLineJoin ? { lineJoin: e.strokeLineJoin } : {},
		...e.strokeMiterLimit === void 0 ? {} : { miterLimit: e.strokeMiterLimit },
		...e.strokeAlignment ? { alignment: e.strokeAlignment } : {},
		...e.strokeCmpd ? { cmpd: e.strokeCmpd } : {},
		...e.strokeHeadEnd ? { headEnd: e.strokeHeadEnd } : {},
		...e.strokeTailEnd ? { tailEnd: e.strokeTailEnd } : {}
	};
}
function Yo(e, t, n, r, i) {
	let a = Jo(t);
	if (a) {
		if (re(e, a, 1 / Y), a.fill) {
			let o = V(a.fill, e, 0, 0, n, r, t.rot, J * i, Go(t, n, r), void 0, W(e));
			o && (e.strokeStyle = o);
		}
		e.stroke();
	}
}
function Xo(e, t, n, r, i, a, o) {
	if (r === n && i === t) return e;
	let s = (e, r) => {
		if (e === t && r === n) return null;
		let i = a.get(`${e}:${r}`);
		return i ? ka(o, i.styleIndex ?? 0).border : null;
	}, c = s(t, r), l = s(i, n), u = s(i, r), d = (e, ...t) => {
		if (e?.style) return e;
		for (let e of t) if (e?.style) return e;
		return e ?? null;
	};
	return {
		left: e.left,
		top: e.top,
		right: d(c?.right, u?.right, e.right),
		bottom: d(l?.bottom, u?.bottom, e.bottom),
		diagonalUp: e.diagonalUp ?? null,
		diagonalDown: e.diagonalDown ?? null
	};
}
function Zo(e, t) {
	if (!t) return e;
	let n = (e, t) => t && t.style ? t : e ?? null;
	return {
		left: n(e.left, t.left),
		right: n(e.right, t.right),
		top: n(e.top, t.top),
		bottom: n(e.bottom, t.bottom),
		diagonalUp: n(e.diagonalUp, t.diagonalUp),
		diagonalDown: n(e.diagonalDown, t.diagonalDown)
	};
}
function Qo(e, t, n, r, i = 1) {
	return {
		outerStart: n ? e - i : e,
		outerEnd: r ? t + i : t,
		innerStart: n ? e + i : e,
		innerEnd: r ? t - i : t
	};
}
function $o(e, t, n, r, i, a, o = 1) {
	let s = [
		{
			edge: t.top,
			x1: n,
			y1: r,
			x2: n + i,
			y2: r,
			kind: "h"
		},
		{
			edge: t.bottom,
			x1: n,
			y1: r + a,
			x2: n + i,
			y2: r + a,
			kind: "h"
		},
		{
			edge: t.left,
			x1: n,
			y1: r,
			x2: n,
			y2: r + a,
			kind: "v"
		},
		{
			edge: t.right,
			x1: n + i,
			y1: r,
			x2: n + i,
			y2: r + a,
			kind: "v"
		},
		{
			edge: t.diagonalUp,
			x1: n,
			y1: r + a,
			x2: n + i,
			y2: r,
			kind: "d"
		},
		{
			edge: t.diagonalDown,
			x1: n,
			y1: r,
			x2: n + i,
			y2: r + a,
			kind: "d"
		}
	];
	for (let { edge: c, x1: l, y1: u, x2: d, y2: f, kind: p } of s) {
		if (!c || !c.style || c.style === "none") continue;
		let s = c.color ? U(c.color) : "#000000";
		if (c.style === "double" && p === "d") {
			e.strokeStyle = s, e.lineWidth = 1, e.setLineDash([]);
			let t = d - l, n = f - u, r = Math.hypot(t, n), i = -n / r * 1, a = t / r * 1;
			e.beginPath(), e.moveTo(l + i, u + a), e.lineTo(d + i, f + a), e.moveTo(l - i, u - a), e.lineTo(d - i, f - a), e.stroke();
			continue;
		}
		if (c.style === "double" && p !== "d") {
			if (e.strokeStyle = s, e.lineWidth = 1, e.setLineDash([]), e.beginPath(), p === "h") {
				let o = u === r, s = o ? r - 1 : r + a + 1, c = o ? r + 1 : r + a - 1, l = Qo(n, n + i, !!t.left?.style && t.left.style !== "none", !!t.right?.style && t.right.style !== "none", 1);
				e.moveTo(l.outerStart, s), e.lineTo(l.outerEnd, s), e.moveTo(l.innerStart, c), e.lineTo(l.innerEnd, c);
			} else {
				let o = l === n, s = o ? n - 1 : n + i + 1, c = o ? n + 1 : n + i - 1, u = Qo(r, r + a, !!t.top?.style && t.top.style !== "none", !!t.bottom?.style && t.bottom.style !== "none", 1);
				e.moveTo(s, u.outerStart), e.lineTo(s, u.outerEnd), e.moveTo(c, u.innerStart), e.lineTo(c, u.innerEnd);
			}
			e.stroke();
			continue;
		}
		e.beginPath(), e.strokeStyle = s;
		let m = es(c.style);
		e.lineWidth = m;
		let h = ts(c.style);
		e.setLineDash(h);
		let g = p === "v" ? z(l, m, o) : 0, _ = p === "h" ? z(u, m, o) : 0;
		e.moveTo(l + g, u + _), e.lineTo(d + g, f + _), e.stroke(), e.setLineDash([]);
	}
}
function es(e) {
	switch (e) {
		case "thick": return 3;
		case "medium":
		case "mediumDashed":
		case "mediumDashDot":
		case "mediumDashDotDot":
		case "slantDashDot": return 2;
		case "hair": return .5;
		default: return 1;
	}
}
function ts(e) {
	return pe(e);
}
function ns(e) {
	switch (e) {
		case "double": return 13;
		case "thick": return 12;
		case "medium": return 11;
		case "mediumDashed": return 10;
		case "mediumDashDot": return 9;
		case "slantDashDot": return 8;
		case "mediumDashDotDot": return 7;
		case "thin": return 6;
		case "dashed": return 5;
		case "dashDot": return 4;
		case "dashDotDot": return 3;
		case "dotted": return 2;
		case "hair": return 1;
		default: return 0;
	}
}
function rs(e, t) {
	let n = ns(e?.style), r = ns(t?.style);
	return n === 0 && r === 0 ? null : n >= r ? e ?? null : t ?? null;
}
function is(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g = t.charts, _, v, y) {
	if (d <= 0 || f <= 0) return;
	let b = jo(n, o), x = Mo(r, a), S = ra(l, d, m, p);
	for (let t of g) {
		let a = t.fromCol + 1, o = t.fromRow + 1, g = t.toCol + 1, C = t.toRow + 1, w = jo(n, a) + t.fromColOff * i / Y, T = Mo(r, o) + t.fromRowOff * i / Y, E = jo(n, g) + t.toColOff * i / Y, D = Mo(r, C) + t.toRowOff * i / Y, O = E - w, k = D - T;
		if (O <= 0 || k <= 0) continue;
		let A = ra(l + (w - b) - s, O, m, p), j = u + (T - x) - c;
		A + O < S || A > S + d || j + k < u || j > u + f || (e.save(), e.beginPath(), e.rect(S, u, d, f), e.clip(), e.save(), i !== 1 && e.scale(i, i), he(e, t.chart, i === 1 ? {
			x: A,
			y: j,
			w: O,
			h: k
		} : {
			x: A / i,
			y: j / i,
			w: O / i,
			h: k / i
		}, J, 0, _, v, (e) => h?.get(ue(e)), y), e.restore(), e.restore());
	}
}
var as = "600 12px \"Meiryo UI\", \"Segoe UI\", sans-serif", os = "11px \"Meiryo UI\", \"Segoe UI\", sans-serif", ss = "#FFFFFF", cs = "#BFBFBF", ls = "#F2F2F2", us = "#404040", ds = "#FFFFFF", fs = "#000000", ps = "#A5A5A5", ms = "#E7E6E6", hs = "#A6A6A6", gs = "#C6C6C6";
function _s(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) {
	if (d <= 0 || f <= 0) return;
	let h = t.slicers;
	if (!h) return;
	let g = jo(n, o), _ = Mo(r, a), v = ra(l, d, m, p);
	for (let t of h) {
		let a = t.fromCol + 1, o = t.fromRow + 1, h = t.toCol + 1, y = t.toRow + 1, b = jo(n, a) + t.fromColOff * i / Y, x = Mo(r, o) + t.fromRowOff * i / Y, S = jo(n, h) + t.toColOff * i / Y, C = Mo(r, y) + t.toRowOff * i / Y, w = S - b, T = C - x;
		if (w <= 0 || T <= 0) continue;
		let E = ra(l + (b - g) - s, w, m, p), D = u + (x - _) - c;
		E + w < v || E > v + d || D + T < u || D > u + f || (e.save(), e.beginPath(), e.rect(v, u, d, f), e.clip(), vs(e, t.caption, t.items, E, D, w, T, i, t.style), e.restore());
	}
}
function vs(e, t, n, r, i, a, o, s, c) {
	let l = c != null;
	e.fillStyle = c?.whole?.fillColor ?? ss, e.fillRect(r, i, a, o);
	let u = l ? c.whole?.borderColor : cs;
	u && (e.strokeStyle = u, e.lineWidth = 1, e.strokeRect(r + .5, i + .5, a - 1, o - 1));
	let d = Math.max(20 * s, 14), f = l ? c.header?.fillColor : ls;
	f && (e.fillStyle = f, e.fillRect(r + 1, i + 1, a - 2, d)), e.fillStyle = c?.header?.fontColor ?? us, e.font = bs(c?.header, as, s), e.textBaseline = "middle", e.textAlign = "left";
	let p = 6 * s;
	if (Ss(e, t, r + p, i + d / 2 + 1, a - 2 * p), n.length === 0) return;
	let m = Math.max(1, Math.round(2 * s)), h = 4 * s, g = r + h, _ = i + d + h, v = a - 2 * h, y = o - d - 2 * h;
	if (v <= 0 || y <= 0) return;
	let b = Math.max(18 * s, 16), x = Math.max(1, Math.floor((y + m) / (b + m))), S = Math.min(n.length, x), C = Math.min(b, (y - m * (S - 1)) / S);
	if (C <= 0) return;
	e.font = xs(os, s);
	let w = 8 * s;
	for (let t = 0; t < S; t++) {
		let r = n[t], i = _ + t * (C + m), a = r.selected, o = a ? c?.selectedItemWithData : c?.unselectedItemWithData, u = o?.fillColor ?? (a ? ds : ms), d = l ? o?.borderColor : a ? ps : gs;
		e.fillStyle = u, l ? (ys(e, g, i, v, C, Math.min(4 * s, C / 4)), e.fill(), d && (e.strokeStyle = d, e.lineWidth = 1, e.stroke())) : (e.fillRect(g, i, v, C), d && (e.strokeStyle = d, e.lineWidth = 1, e.strokeRect(g + .5, i + .5, v - 1, C - 1))), e.font = bs(o, os, s), e.fillStyle = o?.fontColor ?? (a ? fs : hs), Ss(e, r.name, g + w, i + C / 2 + 1, v - 2 * w);
	}
}
function ys(e, t, n, r, i, a) {
	let o = Math.max(0, Math.min(a, r / 2, i / 2));
	e.beginPath(), e.moveTo(t + o, n), e.lineTo(t + r - o, n), e.quadraticCurveTo(t + r, n, t + r, n + o), e.lineTo(t + r, n + i - o), e.quadraticCurveTo(t + r, n + i, t + r - o, n + i), e.lineTo(t + o, n + i), e.quadraticCurveTo(t, n + i, t, n + i - o), e.lineTo(t, n + o), e.quadraticCurveTo(t, n, t + o, n), e.closePath();
}
function bs(e, t, n) {
	if (!e) return xs(t, n);
	let r = Math.round((e.fontSize ?? 11) * n);
	return `${e.fontBold ? "bold " : ""}${r}px ${e.fontFamily ? `"${e.fontFamily}", "Segoe UI", sans-serif` : "\"Meiryo UI\", \"Segoe UI\", sans-serif"}`;
}
function xs(e, t) {
	return e.replace(/(\d+(?:\.\d+)?)px/, (e, n) => `${Math.round(Number(n) * t)}px`);
}
function Ss(e, t, n, r, i) {
	if (i <= 0) return;
	let a = t;
	if (e.measureText(a).width > i) {
		for (; a.length > 0 && e.measureText(a + "…").width > i;) a = a.slice(0, -1);
		a = a.length > 0 ? a + "…" : "";
	}
	e.fillText(a, n, r);
}
//#endregion
export { ut as A, hi as C, ti as D, vi as E, $e as F, ft as M, mt as N, ei as O, ht as P, gi as S, yi as T, Vo as _, xo as a, xi as b, Di as c, oo as d, Zi as f, ra as g, na as h, aa as i, pt as j, Lt as k, Do as l, Oo as m, qi as n, la as o, Ho as p, Yi as r, bo as s, yo as t, So as u, Ei as v, fi as w, Si as x, Ti as y };
