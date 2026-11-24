// optional-renderer: packages/core/src/chart/three-d-renderer.ts
import { m as e, p as t } from "./wmf-queIKUqh.js";
import { $r as n, At as r, Bi as i, Br as a, Ci as o, Ct as s, Dn as c, Fi as l, Ft as u, Gr as d, Hi as f, Hr as p, Ii as m, Ir as h, Jr as g, Kr as _, Li as v, Lr as y, On as b, Pi as x, Qi as S, Qr as C, Ri as w, Rr as T, Sn as E, Ti as D, Ur as O, Vi as k, Vr as A, Wi as j, Xi as M, Xr as N, Yi as P, Yr as F, Yt as I, Zr as L, _i as R, _r as z, _t as B, bi as V, bn as ee, br as H, ci as U, cn as W, di as G, gi as K, gr as te, hi as q, ii as ne, kn as re, l as ie, li as J, ln as ae, mi as oe, n as se, ni as ce, oi as le, pi as ue, ri as de, t as fe, ui as pe, v as me, vr as he, wi as ge, wr as _e, xi as ve, xn as ye, yi as be, zr as xe } from "./plot-area-frame-BcsSpaGV.js";
import { i as Y, o as Se } from "./units-BBDOirYi.js";
import { c as X } from "./paint-BK7w4fKJ.js";
import { r as Ce, t as we } from "./chart-number-format-BTQAc_0Z.js";
import { a as Te, c as Ee, i as De, m as Oe, n as ke, o as Ae, p as je, r as Me, s as Ne, t as Pe, u as Fe, v as Ie, y as Le } from "./three-d-Bvlv7WH-.js";
import { t as Re } from "./renderer-module-contract-BuTx2FWJ.js";
function ze(e, t, n, r) {
	return P(e, r) ? n : t.chartexFormatIdx ?? r;
}
function Be(e, t, n, r, i) {
	let a = ze(e, t, r, i), o = j(e, "dataPoint3D", i), s = S(e, "dataPoint3D"), c = x(n?.chartexStyle, s, r);
	if (c !== void 0) return c;
	if (n?.fillHidden === !0) {
		let e = m(s);
		if (e !== void 0) return e;
	}
	if (n?.color === "00000000") return null;
	if (n?.color) return {
		fillType: "solid",
		color: n.color
	};
	let l = x(t.chartexStyle, s, a);
	return l === void 0 ? w(o, s, a, n?.chartexStyle, t.chartexStyle) : l;
}
var Ve = 32;
function He(e) {
	switch (e) {
		case "cylinder":
		case "cone":
		case "coneToMax":
		case "pyramid":
		case "pyramidToMax": return e;
		default: return "box";
	}
}
var Ue = (e) => Math.max(0, Math.min(1, e));
function We(e, t) {
	if (t.length < 3) return null;
	let n = e[t[0]];
	for (let r = 1; r + 1 < t.length; r++) for (let i = r + 1; i < t.length; i++) {
		let a = e[t[r]], o = e[t[i]], s = {
			x: a.x - n.x,
			y: a.y - n.y,
			depth: a.depth - n.depth
		}, c = {
			x: o.x - n.x,
			y: o.y - n.y,
			depth: o.depth - n.depth
		}, l = {
			x: s.y * c.depth - s.depth * c.y,
			y: s.depth * c.x - s.x * c.depth,
			depth: s.x * c.y - s.y * c.x
		}, u = Math.hypot(l.x, l.y, l.depth);
		if (u > 2 ** -52) return {
			x: l.x / u,
			y: l.y / u,
			depth: l.depth / u
		};
	}
	return null;
}
function Ge(e, t) {
	let n = e.reduce((t, n) => ({
		x: t.x + n.x / e.length,
		y: t.y + n.y / e.length,
		depth: t.depth + n.depth / e.length
	}), {
		x: 0,
		y: 0,
		depth: 0
	});
	return t.map((t) => {
		let r = We(e, t.indices);
		if (!r) return t;
		let i = t.indices.reduce((n, r) => ({
			x: n.x + e[r].x / t.indices.length,
			y: n.y + e[r].y / t.indices.length,
			depth: n.depth + e[r].depth / t.indices.length
		}), {
			x: 0,
			y: 0,
			depth: 0
		}), a = {
			x: i.x - n.x,
			y: i.y - n.y,
			depth: i.depth - n.depth
		};
		return r.x * a.x + r.y * a.y + r.depth * a.depth >= 0 ? t : {
			...t,
			indices: [...t.indices].reverse()
		};
	});
}
function Ke(e) {
	let { horizontal: t, crossStart: n, crossSize: r, baseCoord: i, endCoord: a, nearDepth: o, farDepth: s } = e;
	if (![
		n,
		r,
		i,
		a,
		o,
		s
	].every(Number.isFinite) || r <= 0 || i === a || o === s) return null;
	let c = He(e.shape), l = c === "cylinder" || c === "cone" || c === "coneToMax", u = c !== "box" && c !== "cylinder", d = c === "coneToMax" || c === "pyramidToMax", f = l ? Math.max(8, Math.min(64, Math.trunc(e.roundSegments ?? Ve))) : 4, p = Ue(e.baseScale ?? (d ? e.toMaxBaseScale ?? 1 : 1)), m = Ue(e.endScale ?? (u ? d ? e.toMaxEndScale ?? 0 : 0 : 1));
	if (p === 0 && m === 0) return null;
	let h = n + r / 2, g = r / 2, _ = (o + s) / 2, v = Math.abs(s - o) / 2, y = [], b = (e, n) => {
		if (n === 0) {
			let n = y.length;
			return y.push(t ? {
				x: e,
				y: h,
				depth: _
			} : {
				x: h,
				y: e,
				depth: _
			}), [n];
		}
		let r = [];
		for (let i = 0; i < f; i++) {
			let a = l ? i / f * Math.PI * 2 : Math.PI / 4 + i / f * Math.PI * 2, o = l ? 1 : Math.SQRT2, s = h + Math.cos(a) * g * n * o, c = _ + Math.sin(a) * v * n * o;
			r.push(y.length), y.push(t ? {
				x: e,
				y: s,
				depth: c
			} : {
				x: s,
				y: e,
				depth: c
			});
		}
		return r;
	}, x = b(i, p), S = b(a, m), C = l, w = [];
	x.length > 1 && e.omitBaseCap !== !0 && w.push({
		indices: x,
		role: "baseCap",
		smoothSurface: C
	}), S.length > 1 && e.omitEndCap !== !0 && w.push({
		indices: S,
		role: "endCap",
		smoothSurface: C
	});
	let T = [], E = Math.max(x.length, S.length);
	for (let e = 0; e < E; e++) {
		let t = (e + 1) % E, n = x.length === 1 ? x[0] : x[e], r = x.length === 1 ? x[0] : x[t], i = S.length === 1 ? S[0] : S[e], a = S.length === 1 ? S[0] : S[t], o = x.length === 1 ? [
			n,
			a,
			i
		] : S.length === 1 ? [
			n,
			r,
			i
		] : [
			n,
			r,
			a,
			i
		];
		w.push({
			indices: o,
			role: "side",
			smoothSurface: C,
			segmentIndex: e,
			baseRimEdge: x.length > 1 ? [n, r] : void 0,
			endRimEdge: S.length > 1 ? [i, a] : void 0
		}), T.push([n, i]);
	}
	return {
		shape: c,
		vertices: y,
		faces: Ge(y, w),
		silhouetteEdges: T
	};
}
function qe(e) {
	let { x0: t, x1: n, lower0: r, lower1: i, upper0: a, upper1: o, nearDepth: s, farDepth: c, capStart: l, capEnd: u } = e;
	if (![
		t,
		n,
		r,
		i,
		a,
		o,
		s,
		c
	].every(Number.isFinite) || t === n || s === c) return null;
	n < t && ([t, n] = [n, t], [r, i] = [i, r], [a, o] = [o, a], [l, u] = [u, l]);
	let d = Math.min(s, c), f = Math.max(s, c), p = Math.min(r, a), m = Math.min(i, o), h = Math.max(r, a), g = Math.max(i, o);
	if (Math.max(h - p, g - m) < 1e-9) return null;
	let _ = [
		{
			x: t,
			y: p,
			depth: d
		},
		{
			x: n,
			y: m,
			depth: d
		},
		{
			x: n,
			y: g,
			depth: d
		},
		{
			x: t,
			y: h,
			depth: d
		},
		{
			x: t,
			y: p,
			depth: f
		},
		{
			x: n,
			y: m,
			depth: f
		},
		{
			x: n,
			y: g,
			depth: f
		},
		{
			x: t,
			y: h,
			depth: f
		}
	];
	return {
		shape: "areaStrip",
		vertices: _,
		faces: Ge(_, [
			{
				indices: [
					0,
					3,
					2,
					1
				],
				role: "side",
				smoothSurface: !1
			},
			{
				indices: [
					4,
					5,
					6,
					7
				],
				role: "side",
				smoothSurface: !1
			},
			{
				indices: [
					0,
					4,
					7,
					3
				],
				role: "baseCap",
				smoothSurface: !1
			},
			{
				indices: [
					1,
					2,
					6,
					5
				],
				role: "endCap",
				smoothSurface: !1
			},
			{
				indices: [
					0,
					1,
					5,
					4
				],
				role: "side",
				smoothSurface: !1
			},
			{
				indices: [
					3,
					7,
					6,
					2
				],
				role: "side",
				smoothSurface: !1
			}
		].filter((e) => (e.role !== "baseCap" || l) && (e.role !== "endCap" || u))),
		silhouetteEdges: []
	};
}
function Je(e) {
	let t = e.upper0 - e.lower0, n = e.upper1 - e.lower1;
	if (Number.isFinite(t) && Number.isFinite(n) && t * n < 0) {
		let r = t / (t - n), i = e.x0 + (e.x1 - e.x0) * r, a = e.lower0 + (e.lower1 - e.lower0) * r;
		return [qe({
			...e,
			x1: i,
			lower1: a,
			upper1: a,
			capEnd: !1
		}), qe({
			...e,
			x0: i,
			lower0: a,
			upper0: a,
			capStart: !1
		})].filter((e) => e != null);
	}
	let r = qe(e);
	return r ? [r] : [];
}
function Ye(e) {
	let t = e.outline;
	if (t.length < 3 || t.length > 64 || ![e.nearDepth, e.farDepth].every(Number.isFinite) || Math.abs(e.nearDepth - e.farDepth) < 1e-9 || !t.every((e) => Number.isFinite(e.x) && Number.isFinite(e.y))) return null;
	let n = Math.min(e.nearDepth, e.farDepth), r = Math.max(e.nearDepth, e.farDepth), i = t.length, a = [...t.map((e) => ({
		...e,
		depth: n
	})), ...t.map((e) => ({
		...e,
		depth: r
	}))], o = Array.from({ length: i }, (e, t) => t), s = Array.from({ length: i }, (e, t) => i + t).reverse();
	return {
		shape: "lineRibbon",
		vertices: a,
		faces: Ge(a, [
			{
				indices: o,
				role: "side",
				smoothSurface: !1
			},
			{
				indices: s,
				role: "side",
				smoothSurface: !1
			},
			...Array.from({ length: i }, (e, t) => {
				let n = (t + 1) % i;
				return {
					indices: [
						t,
						n,
						i + n,
						i + t
					],
					role: "side",
					smoothSurface: !1
				};
			})
		]),
		silhouetteEdges: []
	};
}
function Xe(e) {
	let { centerX: t, centerY: n, centerDepth: r, radius: i, modelDepth: a, thickness: o, startAngle: s, endAngle: c } = e;
	if (![
		t,
		n,
		r,
		i,
		a,
		o,
		s,
		c
	].every(Number.isFinite) || !(i > 0) || !(a > 0) || !(o > 0) || !(c > s)) return null;
	let l = Math.min(Math.PI * 2, c - s), u = l >= Math.PI * 2 - 1e-9, d = Math.max(2, Math.min(128, Math.trunc(e.segments ?? Math.ceil(Ve * l / (Math.PI * 2))))), f = n - o / 2, p = n + o / 2, m = [{
		x: t,
		y: f,
		depth: r
	}, {
		x: t,
		y: p,
		depth: r
	}], h = [], g = [], _ = u ? d : d + 1;
	for (let e = 0; e < _; e++) {
		let n = s + l * e / d, o = t + Math.cos(n) * i, c = r + Math.sin(n) * i / a;
		h.push(m.length), m.push({
			x: o,
			y: f,
			depth: c
		}), g.push(m.length), m.push({
			x: o,
			y: p,
			depth: c
		});
	}
	let v = u ? [{
		indices: [...h],
		role: "baseCap",
		smoothSurface: !0
	}, {
		indices: [...g],
		role: "endCap",
		smoothSurface: !0
	}] : [
		{
			indices: [0, ...h],
			role: "baseCap",
			smoothSurface: !0
		},
		{
			indices: [1, ...g],
			role: "endCap",
			smoothSurface: !0
		},
		{
			indices: [
				0,
				1,
				g[0],
				h[0]
			],
			role: "baseCap",
			smoothSurface: !1
		},
		{
			indices: [
				0,
				h.at(-1),
				g.at(-1),
				1
			],
			role: "endCap",
			smoothSurface: !1
		}
	];
	for (let e = 0; e < d; e++) {
		let t = u ? (e + 1) % d : e + 1;
		v.push({
			indices: [
				h[e],
				g[e],
				g[t],
				h[t]
			],
			role: "side",
			smoothSurface: !0,
			segmentIndex: e,
			baseRimEdge: [h[e], h[t]],
			endRimEdge: [g[e], g[t]]
		});
	}
	return {
		shape: "pieSector",
		vertices: m,
		faces: Ge(m, v),
		silhouetteEdges: h.slice(0, u ? void 0 : -1).map((e, t) => [e, g[t]])
	};
}
function Ze(e, t) {
	if (![e, t].every(Number.isFinite)) return null;
	let n = t - e;
	if (n === 0) return e >= 0 && e <= 1 ? {
		startT: 0,
		endT: 1
	} : null;
	let r = -e / n, i = (1 - e) / n, a = Math.max(0, Math.min(r, i)), o = Math.min(1, Math.max(r, i));
	return a <= o ? {
		startT: a,
		endT: o
	} : null;
}
function Qe(e, t, n, r) {
	if (![
		e,
		t,
		n,
		r
	].every(Number.isFinite)) return [];
	let i = [0, 1], a = (e, t) => {
		let n = t - e;
		if (n !== 0) for (let t of [0, 1]) {
			let r = (t - e) / n;
			r > 0 && r < 1 && Number.isFinite(r) && i.push(r);
		}
	};
	a(e, t), a(n, r), i.sort((e, t) => e - t);
	let o = i.filter((e, t) => t === 0 || Math.abs(e - i[t - 1]) > 1e-12), s = (e, t, n) => e + (t - e) * n, c = (e) => Math.max(0, Math.min(1, e)), l = [];
	for (let i = 0; i + 1 < o.length; i++) {
		let a = o[i], u = o[i + 1], d = (a + u) / 2, f = c(s(e, t, d)), p = c(s(n, r, d));
		Math.abs(p - f) <= 1e-12 || l.push({
			startT: a,
			endT: u,
			lowerStart: c(s(e, t, a)),
			lowerEnd: c(s(e, t, u)),
			upperStart: c(s(n, r, a)),
			upperEnd: c(s(n, r, u))
		});
	}
	return l;
}
var $e = (e) => ({
	minX: Math.min(...e.map((e) => e.x)),
	maxX: Math.max(...e.map((e) => e.x)),
	minY: Math.min(...e.map((e) => e.y)),
	maxY: Math.max(...e.map((e) => e.y))
}), et = (e, t) => {
	let n = !1;
	for (let r = 0, i = e.length - 1; r < e.length; i = r++) {
		let a = e[r], o = e[i], s = (a.x - t.x) * (o.y - t.y) - (a.y - t.y) * (o.x - t.x), c = Math.max(1, Math.abs(a.x), Math.abs(a.y), Math.abs(o.x), Math.abs(o.y));
		if (Math.abs(s) <= c * 1e-9 && t.x >= Math.min(a.x, o.x) - 1e-9 && t.x <= Math.max(a.x, o.x) + 1e-9 && t.y >= Math.min(a.y, o.y) - 1e-9 && t.y <= Math.max(a.y, o.y) + 1e-9) return !0;
		a.y > t.y != o.y > t.y && t.x < (o.x - a.x) * (t.y - a.y) / (o.y - a.y) + a.x && (n = !n);
	}
	return n;
}, tt = (e, t, n, r) => {
	let i = {
		x: t.x - e.x,
		y: t.y - e.y
	}, a = {
		x: r.x - n.x,
		y: r.y - n.y
	}, o = i.x * a.y - i.y * a.x;
	if (Math.abs(o) < 1e-12) return null;
	let s = {
		x: n.x - e.x,
		y: n.y - e.y
	}, c = (s.x * a.y - s.y * a.x) / o, l = (s.x * i.y - s.y * i.x) / o;
	return c < -1e-9 || c > 1.000000001 || l < -1e-9 || l > 1.000000001 ? null : {
		x: e.x + i.x * c,
		y: e.y + i.y * c
	};
};
function nt(e, t, n, r) {
	let i = [], a = (e) => {
		i.length >= 12 || i.some((t) => Math.hypot(t.x - e.x, t.y - e.y) < 1e-7) || i.push(e);
	}, o = {
		x: (Math.max(n.minX, r.minX) + Math.min(n.maxX, r.maxX)) / 2,
		y: (Math.max(n.minY, r.minY) + Math.min(n.maxY, r.maxY)) / 2
	};
	et(e, o) && et(t, o) && a(o);
	for (let n of e) et(t, n) && a(n);
	for (let n of t) et(e, n) && a(n);
	for (let n = 0; n < e.length && i.length < 12; n++) for (let r = 0; r < t.length && i.length < 12; r++) {
		let i = tt(e[n], e[(n + 1) % e.length], t[r], t[(r + 1) % t.length]);
		i && a(i);
	}
	return i;
}
function rt(e, t) {
	let n = e.cameraDepths;
	if (!n || n.length !== e.points.length || e.points.length < 3) return e.cameraDepth;
	let r = e.cameraWeights?.length === e.points.length ? e.cameraWeights : e.points.map(() => 1), i = e.points[0];
	for (let a = 1; a + 1 < e.points.length; a++) {
		let o = e.points[a], s = e.points[a + 1], c = (o.y - s.y) * (i.x - s.x) + (s.x - o.x) * (i.y - s.y);
		if (Math.abs(c) < 1e-12) continue;
		let l = ((o.y - s.y) * (t.x - s.x) + (s.x - o.x) * (t.y - s.y)) / c, u = ((s.y - i.y) * (t.x - s.x) + (i.x - s.x) * (t.y - s.y)) / c, d = 1 - l - u;
		if (Math.min(l, u, d) < -1e-7) continue;
		let f = l * r[0] + u * r[a] + d * r[a + 1];
		if (Math.abs(f) > 2 ** -52) return (l * n[0] * r[0] + u * n[a] * r[a] + d * n[a + 1] * r[a + 1]) / f;
	}
	return e.cameraDepth;
}
function it(e) {
	if (e.length < 2) return [...e];
	let t = [...e.keys()].sort((t, n) => e[t].cameraDepth - e[n].cameraDepth || t - n), n = e.map((e) => $e(e.points)), r = [...e.keys()].sort((e, t) => n[e].minX - n[t].minX || e - t), i = e.map(() => /* @__PURE__ */ new Set()), a = e.map(() => 0), o = [], s = 0;
	for (let c of r) {
		for (let e = o.length - 1; e >= 0; e--) n[o[e]].maxX < n[c].minX - 1e-9 && o.splice(e, 1);
		for (let r of o) {
			if (++s > 2e5) return t.map((t) => e[t]);
			if (n[r].maxY < n[c].minY - 1e-9 || n[c].maxY < n[r].minY - 1e-9) continue;
			let o = nt(e[r].points, e[c].points, n[r], n[c]), l = 0;
			for (let t of o) {
				let n = rt(e[r], t) - rt(e[c], t), i = 1e-8 * Math.max(1, Math.abs(e[r].cameraDepth), Math.abs(e[c].cameraDepth));
				if (Math.abs(n) <= i) continue;
				let a = n < 0 ? -1 : 1;
				if (l !== 0 && l !== a) {
					l = 0;
					break;
				}
				l = a;
			}
			if (l === 0) continue;
			let u = l < 0 ? r : c, d = l < 0 ? c : r;
			i[u].has(d) || (i[u].add(d), a[d]++);
		}
		o.push(c);
	}
	let c = new Set(e.keys()), l = [];
	for (; c.size;) {
		let n = t.find((e) => c.has(e) && a[e] === 0);
		if (n ??= t.find((e) => c.has(e)), n == null) break;
		c.delete(n), l.push(e[n]);
		for (let e of i[n]) a[e]--;
	}
	return l;
}
var Z = 1e-9, at = 1e4, ot = (e, t, n) => ({
	x: e.x + (t.x - e.x) * n,
	y: e.y + (t.y - e.y) * n,
	cameraDepth: e.cameraDepth + (t.cameraDepth - e.cameraDepth) * n,
	cameraWeight: (e.cameraWeight ?? 1) + ((t.cameraWeight ?? 1) - (e.cameraWeight ?? 1)) * n
}), st = (e, t) => Math.hypot(e.x - t.x, e.y - t.y) <= Z;
function ct(e, t, n = 0) {
	let r = t.filter((e) => Number.isFinite(e) && e > Z);
	if (r.length === 0) return e.length >= 2 ? [[...e]] : [];
	r.length % 2 == 1 && r.push(...r);
	let i = [], a = 0, o = r[0], s = !0, c = r.reduce((e, t) => e + t, 0), l = c > Z && Number.isFinite(n) ? (n % c + c) % c : 0;
	for (; l > Z;) {
		let e = Math.min(l, o);
		l -= e, o -= e, o <= Z && (a = (a + 1) % r.length, o = r[a], s = a % 2 == 0);
	}
	let u = null;
	for (let t = 0; t + 1 < e.length; t++) {
		let n = e[t], c = e[t + 1], l = Math.hypot(c.x - n.x, c.y - n.y);
		if (!(l > Z)) continue;
		let d = 0;
		for (; d < l - Z;) {
			let e = Math.min(o, l - d), t = ot(n, c, d / l), f = ot(n, c, (d + e) / l);
			if (s && (u ??= [], (u.length === 0 || !st(u.at(-1), t)) && u.push(t), u.push(f)), d += e, o -= e, o <= Z) {
				if (s && u && u.length >= 2) {
					if (i.length >= 1e4) return null;
					i.push(u);
				}
				u = null, a = (a + 1) % r.length, o = r[a], s = a % 2 == 0;
			}
		}
	}
	if (s && u && u.length >= 2) {
		if (i.length >= 1e4) return null;
		i.push(u);
	}
	if (i.length > 1 && st(e[0], e.at(-1)) && st(i[0][0], e[0]) && st(i.at(-1).at(-1), e.at(-1))) {
		let e = i.shift(), t = i.pop();
		i.unshift([...t, ...e.slice(1)]);
	}
	return i;
}
var lt = (e, t) => ({
	kind: e,
	points: t.map(({ x: e, y: t }) => ({
		x: e,
		y: t
	})),
	cameraDepths: t.map((e) => e.cameraDepth),
	cameraWeights: t.map((e) => e.cameraWeight ?? 1),
	cameraDepth: t.reduce((e, t) => e + t.cameraDepth, 0) / t.length
}), ut = (e, t, n) => {
	let r = [];
	for (let n = 0; n < 12; n++) {
		let i = Math.PI * 2 * n / 12;
		r.push({
			...e,
			x: e.x + Math.cos(i) * t,
			y: e.y + Math.sin(i) * t
		});
	}
	return lt(n, r);
};
function dt(e, t, n) {
	let r = Number.isFinite(n.width) ? Math.max(0, n.width) : 0;
	if (!(r > Z) || t.length < 3) return null;
	let i = r / 2;
	if ((n.lineJoin ?? "miter") === "round") return ut(e, i, "join");
	let a = [];
	for (let n of t) {
		let t = n.x - e.x, r = n.y - e.y, o = Math.hypot(t, r);
		if (!(o > Z)) continue;
		let s = -r / o * i, c = t / o * i;
		a.push({
			...e,
			x: e.x + s,
			y: e.y + c
		}, {
			...e,
			x: e.x - s,
			y: e.y - c
		});
	}
	if (a.length < 3) return null;
	a.sort((e, t) => e.x - t.x || e.y - t.y);
	let o = (e, t, n) => (t.x - e.x) * (n.y - e.y) - (t.y - e.y) * (n.x - e.x), s = [];
	for (let e of a) {
		for (; s.length >= 2 && o(s.at(-2), s.at(-1), e) <= Z;) s.pop();
		s.push(e);
	}
	let c = [];
	for (let e of [...a].reverse()) {
		for (; c.length >= 2 && o(c.at(-2), c.at(-1), e) <= Z;) c.pop();
		c.push(e);
	}
	let l = [...s.slice(0, -1), ...c.slice(0, -1)];
	return l.length >= 3 ? lt("join", l) : null;
}
var ft = (e, t, n, r) => {
	let i = t.x * r.y - t.y * r.x;
	if (Math.abs(i) <= Z) return null;
	let a = {
		x: n.x - e.x,
		y: n.y - e.y
	}, o = (a.x * r.y - a.y * r.x) / i;
	return {
		x: e.x + t.x * o,
		y: e.y + t.y * o
	};
};
function pt(e, t) {
	let n = Number.isFinite(t.width) ? Math.max(0, t.width) : 0;
	if (!(n > Z) || e.length < 2) return [];
	let r = n / 2, i = t.lineCap ?? "butt", a = t.lineJoin ?? "miter", o = Math.max(1, t.miterLimit ?? 10), s = [], c = ct(e, t.dash ?? [], t.dashOffset);
	if (c == null) return null;
	let l = (e) => s.length >= 1e4 ? !1 : (s.push(e), !0);
	for (let n = 0; n < c.length; n++) {
		let s = c[n], u = s.length > 2 && st(s[0], s.at(-1)), d = n === 0 && st(s[0], e[0]) ? t.startCap ?? i : i, f = n + 1 === c.length && st(s.at(-1), e.at(-1)) ? t.endCap ?? i : i, p = [];
		for (let e = 0; e + 1 < s.length; e++) {
			let t = s[e], n = s[e + 1], r = Math.hypot(n.x - t.x, n.y - t.y);
			p.push(r > Z ? {
				x: (n.x - t.x) / r,
				y: (n.y - t.y) / r
			} : null);
		}
		for (let e = 0; e + 1 < s.length; e++) {
			let n = p[e];
			if (!n) continue;
			let i = {
				x: -n.y * r,
				y: n.x * r
			}, a = e === 0, o = e + 2 === s.length, c = Math.min(.5, r / 2), m = u || !a || t.overlapStart === !0, h = u || !o || t.overlapEnd === !0, g = !u && a && d === "square" ? r : m ? c : 0, _ = !u && o && f === "square" ? r : h ? c : 0, v = {
				...s[e],
				x: s[e].x - n.x * g,
				y: s[e].y - n.y * g
			}, y = {
				...s[e + 1],
				x: s[e + 1].x + n.x * _,
				y: s[e + 1].y + n.y * _
			};
			if (!l(lt("segment", [
				{
					...v,
					x: v.x + i.x,
					y: v.y + i.y
				},
				{
					...y,
					x: y.x + i.x,
					y: y.y + i.y
				},
				{
					...y,
					x: y.x - i.x,
					y: y.y - i.y
				},
				{
					...v,
					x: v.x - i.x,
					y: v.y - i.y
				}
			]))) return null;
		}
		if (!u && d === "round" && !l(ut(s[0], r, "cap")) || !u && f === "round" && !l(ut(s.at(-1), r, "cap"))) return null;
		let m = (e, t, n) => {
			if (!t || !n) return !0;
			let i = t.x * n.y - t.y * n.x;
			if (Math.abs(i) <= Z) return !0;
			if (a === "round") return l(ut(e, r, "join"));
			let s = i > 0 ? -1 : 1, c = {
				...e,
				x: e.x + -t.y * r * s,
				y: e.y + t.x * r * s
			}, u = {
				...e,
				x: e.x + -n.y * r * s,
				y: e.y + n.x * r * s
			};
			if (a === "miter") {
				let i = ft(c, t, u, n);
				if (i && Math.hypot(i.x - e.x, i.y - e.y) <= r * o) return !!l(lt("join", [
					c,
					{
						...e,
						...i
					},
					u
				]));
			}
			return l(lt("join", [
				c,
				e,
				u
			]));
		};
		for (let e = 1; e + 1 < s.length; e++) if (!m(s[e], p[e - 1], p[e])) return null;
		if (u && !m(s[0], p.at(-1) ?? null, p[0] ?? null)) return null;
	}
	return s;
}
var mt = 1e-9, ht = (e, t) => Math.hypot(e.x - t.x, e.y - t.y, e.depth - t.depth) <= mt, gt = (e, t) => e.x - t.x || e.y - t.y || e.depth - t.depth, _t = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = gt(e[r], t[r]);
		if (n !== 0) return n;
	}
	return e.length - t.length;
};
function vt(e) {
	let t = [...e].reverse();
	return _t(e, t) <= 0 ? e : t;
}
function yt(e) {
	let t = ht(e[0], e.at(-1)) ? e.slice(0, -1) : [...e];
	if (t.length === 0) return [];
	let n = 0;
	for (let e = 1; e < t.length; e++) gt(t[e], t[n]) < 0 && (n = e);
	let r = t.map((e, r) => t[(n + r) % t.length]), i = t.map((e, r) => t[(n - r + t.length) % t.length]), a = _t(r, i) <= 0 ? r : i;
	return [...a, a[0]];
}
function bt(e) {
	let t = [], n = (e) => {
		let n = t.find((t) => ht(t.point, e));
		if (n) return gt(e, n.point) < 0 && (n.point = e), n;
		let r = {
			point: e,
			edges: [],
			order: -1
		};
		return t.push(r), r;
	}, r = [];
	for (let [t, i] of e) {
		if (ht(t, i)) continue;
		let e = n(t), a = n(i);
		e !== a && r.push([e, a]);
	}
	t.sort((e, t) => gt(e.point, t.point)), t.forEach((e, t) => {
		e.order = t;
	});
	let i = [], a = /* @__PURE__ */ new Set();
	for (let [e, t] of r) {
		let n = e.order < t.order ? e : t, r = e.order < t.order ? t : e, o = `${n.order}:${r.order}`;
		a.has(o) || (a.add(o), i.push({
			first: n,
			second: r,
			key: o
		}));
	}
	i.sort((e, t) => e.key.localeCompare(t.key)), i.forEach((e, t) => {
		e.first.edges.push(t), e.second.edges.push(t);
	});
	for (let e of t) e.edges.sort((e, t) => e - t);
	let o = /* @__PURE__ */ new Set(), s = (e, t) => {
		let n = [e.point], r = e, a = t;
		for (; !o.has(a);) {
			o.add(a);
			let e = i[a], t = e.first === r ? e.second : e.first;
			if (n.push(t.point), t.edges.length !== 2) break;
			let s = t.edges.find((e) => !o.has(e));
			if (s === void 0) break;
			r = t, a = s;
		}
		return n;
	}, c = [];
	for (let e of t) if (e.edges.length !== 2) for (let t of e.edges) o.has(t) || c.push(vt(s(e, t)));
	for (let e = 0; e < i.length; e++) {
		if (o.has(e)) continue;
		let t = i[e], n = t.first.order <= t.second.order ? t.first : t.second;
		c.push(yt(s(n, e)));
	}
	let l = t.filter((e) => e.edges.length > 2).map((e) => ({
		point: e.point,
		neighbours: e.edges.map((t) => {
			let n = i[t];
			return n.first === e ? n.second.point : n.first.point;
		}).sort(gt)
	}));
	return {
		paths: c.sort(_t),
		junctions: l
	};
}
function xt(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.legendEntries ?? []) t.set(n.idx, n);
	return t;
}
function St(e, t, n) {
	let r = le(t?.fontSizeHpt ?? e.legendFontSizeHpt, n) ?? 9 * n, i = t?.fontFace ?? e.legendFontFace, a = t?.fontBold ?? e.legendFontBold ?? !1;
	return {
		fontPx: r,
		font: `${t?.fontItalic ?? e.legendFontItalic ?? !1 ? "italic " : ""}${a ? "bold " : ""}${r}px ${zt(e, i)}`,
		color: t?.fontColor ? `#${t.fontColor}` : e.legendFontColor ? `#${e.legendFontColor}` : "#595959"
	};
}
var Ct = [
	"4472C4",
	"ED7D31",
	"70AD47",
	"A5A5A5",
	"FFC000",
	"5B9BD5"
], wt = ae, Tt = W, Et = new Set([
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
function Dt(e, t) {
	let n = Number.isFinite(t) && t > 0 ? t / Se : 1, r = Number.isFinite(e) && e >= 0 ? e / Y : 0;
	return Math.max(.25, r) * n;
}
function Ot(e, t) {
	let n = Number.isSafeInteger(t) && t > 0 ? t : 0, r = Array.from({ length: n }, () => []);
	for (let t of e) {
		let e = t.categoryIndex;
		Number.isSafeInteger(e) && e >= 0 && e < n && r[e].push(t);
	}
	return r;
}
var kt = (e, t) => `#${t?.color ?? Ct[e % Ct.length]}`;
function At(e, t, n) {
	let r = 0;
	for (let i of e) for (let e of [t(i), n(i)]) {
		if (e == null) continue;
		let t = H(e);
		if (e.fillType === "gradient" && t > wt || t > Tt - r) return !1;
		r += t;
	}
	return !0;
}
function jt(e, t) {
	let n = Array.from({ length: t }, () => ({
		maxMagnitude: 0,
		scaledTotal: 0
	}));
	for (let r of e.series) for (let e = 0; e < t; e++) {
		let t = r.values[e];
		t != null && Number.isFinite(t) && (n[e].maxMagnitude = Math.max(n[e].maxMagnitude, Math.abs(t)));
	}
	for (let r of e.series) for (let e = 0; e < t; e++) {
		let t = r.values[e], i = n[e].maxMagnitude;
		t != null && Number.isFinite(t) && i > 0 && (n[e].scaledTotal += Math.abs(t) / i);
	}
	return n;
}
function Mt(e, t, n, r) {
	let i = e.series[t]?.values[n] ?? 0;
	if (!Number.isFinite(i)) return 0;
	if (!r) return i;
	let { maxMagnitude: a, scaledTotal: o } = r[n] ?? {
		maxMagnitude: 0,
		scaledTotal: 0
	};
	return a > 0 && o > 0 ? i / a / o * 100 : 0;
}
function Nt(e, t) {
	let n = e + t;
	return Number.isFinite(n) ? n : t < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function Pt(e) {
	let t = [];
	for (let [n, r] of [
		[e.threeD?.floor, "floor"],
		[e.threeD?.sideWall, "wall"],
		[e.threeD?.backWall, "wall"]
	]) {
		let i = f(e, n, r);
		t.push({
			fill: i.fill,
			line: i.line
		});
	}
	if (e.chartType === "pie") {
		let n = e.series[0];
		if (n) {
			let r = new Map(n.dataPointOverrides?.map((e) => [e.idx, e]) ?? []);
			for (let i = 0; i < n.values.length; i++) {
				let a = n.values[i];
				if (a == null || !Number.isFinite(a) || Math.abs(a) <= 0) continue;
				let o = Q(e, n, r.get(i), i, 0);
				t.push({
					fill: o.fill,
					line: o.lineFill
				});
			}
		}
	} else if (e.chartType === "clusteredBar" || e.chartType === "clusteredBarH" || e.chartType.startsWith("stackedBar")) {
		let n = e.chartType.startsWith("stacked"), r = e.chartType.endsWith("Pct"), i = n || e.dispBlanksAs === "zero", a = e.valAxisLogBase != null && Number.isFinite(e.valAxisLogBase) && e.valAxisLogBase >= 2, o = Math.max(1, e.categories.length, ...e.series.map((e) => Math.max(e.values.length, e.categories?.length ?? 0))), s = r ? jt(e, o) : void 0, c = (t, n) => {
			if (t === n) return !1;
			let r = Math.min(t, n), i = Math.max(t, n), o = e.valMin, s = e.valMax;
			return o != null && Number.isFinite(o) && i <= o || s != null && Number.isFinite(s) && r >= s ? !1 : !a || i > 0;
		}, l = Array(o).fill(0), u = Array(o).fill(0);
		for (let r = 0; r < e.series.length; r++) {
			let d = e.series[r], f = new Map(d.dataPointOverrides?.map((e) => [e.idx, e]) ?? []);
			for (let p = 0; p < o; p++) {
				let o = d.values[p];
				if (!(o != null && Number.isFinite(o) && (!a || o > 0) || o == null && i)) continue;
				let m = Mt(e, r, p, s), h = n ? m >= 0 ? l[p] : u[p] : 0, g = Nt(h, m);
				if (n && (m >= 0 ? l[p] = g : u[p] = g), !c(h, g)) continue;
				let _ = Q(e, d, f.get(p), p, r);
				t.push({
					fill: _.fill,
					line: _.lineFill
				});
			}
		}
	} else {
		let n = e.chartType.toLowerCase().includes("area"), r = e.chartType.startsWith("stacked"), i = e.chartType.endsWith("Pct"), a = r || e.dispBlanksAs === "zero", o = e.valAxisLogBase != null && Number.isFinite(e.valAxisLogBase) && e.valAxisLogBase >= 2, s = Math.max(e.categories.length, ...e.series.map((e) => Math.max(e.categories?.length ?? 0, e.values.length))), c = i ? jt(e, s) : void 0, l = e.series.map(() => Array(s).fill(0));
		if (r) {
			let t = Array(s).fill(0), n = Array(s).fill(0);
			for (let r = 0; r < e.series.length; r++) for (let i = 0; i < s; i++) {
				let a = Mt(e, r, i, c), o = Nt(a >= 0 ? t[i] : n[i], a);
				l[r][i] = o, a >= 0 ? t[i] = o : n[i] = o;
			}
		}
		for (let i = 0; i < e.series.length; i++) {
			let u = e.series[i], d = new Map(u.dataPointOverrides?.map((e) => [e.idx, e]) ?? []), f = s, p = 0, m = null, h = !1, g = !1;
			for (let s = 0; s < f; s++) {
				let f = u.values[s];
				if (f != null && Number.isFinite(f) && (!o || f > 0) || f == null && a) {
					p++;
					let a = r ? l[i][s] : Mt(e, i, s, c), o = m == null ? a : Math.min(m, a), f = m == null ? a : Math.max(m, a), _ = e.valMin != null && Number.isFinite(e.valMin) && f <= e.valMin || e.valMax != null && Number.isFinite(e.valMax) && o >= e.valMax;
					if (p >= 2 && (n || u.smooth === !0 || !_)) {
						if (h = !0, n) break;
						let r = d.get(s);
						if (It(r)) {
							let n = Q(e, u, r, s, i);
							t.push({
								fill: void 0,
								line: n.lineFill
							});
						} else g = !0;
					}
					m = a;
				} else (e.dispBlanksAs ?? "gap") === "gap" && (p = 0, m = null);
			}
			if (!h) continue;
			let _ = Q(e, u, void 0, i, i);
			n ? t.push({
				fill: _.fill,
				line: _.lineFill
			}) : g && t.push({
				fill: void 0,
				line: _.lineFill
			});
		}
	}
	return At(t, (e) => e.fill, (e) => e.line);
}
function Ft(e, t) {
	return e?.fillType === "solid" ? {
		color: `#${e.color}`,
		fill: void 0
	} : {
		color: t,
		fill: e
	};
}
function Q(e, t, n, r, a, o = !0) {
	let s = o && t.dataPointColors?.[r] ? `#${t.dataPointColors[r]}` : kt(a, t), c = P(e, a) ? r : t.chartexFormatIdx ?? a, u = t.seriesType ?? e.chartType, d = u === "line" || u === "stackedLine" || u === "stackedLinePct", f = j(e, "dataPoint3D", a), p = S(e, "dataPoint3D"), m, h = s, g = Be(e, t, n, r, a);
	g !== void 0 && ({color: h, fill: m} = Ft(g, h));
	let _, y = null, b = l(n?.chartexStyle, p, r);
	if (b === void 0 && n?.lineHidden === !0 && (b = v(p)), b !== void 0) b?.fillType === "solid" ? y = `#${b.color}` : _ = b;
	else if (n?.lineColor) y = `#${n.lineColor}`;
	else {
		let e = l(t.chartexStyle, p, c);
		if (e === void 0 && t.lineHidden === !0 && (e = v(p)), e !== void 0) e?.fillType === "solid" ? y = `#${e.color}` : _ = e;
		else if (t.lineColor) y = `#${t.lineColor}`;
		else if (d) _ = m === null ? null : m;
		else {
			let e = i(f, p, c, n?.chartexStyle, t.chartexStyle);
			e !== void 0 && (e?.fillType === "solid" ? y = `#${e.color}` : _ = e);
		}
	}
	let x = d ? void 0 : f, C = n?.chartexStyle?.lineCap ?? t.chartexStyle?.lineCap ?? x?.lineCap, w = n?.chartexStyle?.lineJoin ?? t.chartexStyle?.lineJoin ?? x?.lineJoin, T = M(n?.lineDash == null ? n?.chartexStyle : {
		lineDash: n.lineDash,
		lineDashAuthored: !0
	}, t.chartexStyle, x);
	return {
		color: h,
		fill: m,
		lineColor: y,
		lineFill: _,
		lineWidthEmu: n?.lineWidthEmu ?? n?.chartexStyle?.lineWidthEmu ?? t.lineWidthEmu ?? t.chartexStyle?.lineWidthEmu ?? x?.lineWidthEmu,
		lineDash: T?.lineDash,
		lineCustomDash: T?.lineCustomDash,
		lineCap: C === "rnd" ? "round" : C === "sq" ? "square" : "butt",
		lineJoin: w === "round" || w === "bevel" ? w : "miter"
	};
}
function It(e) {
	if (!e) return !1;
	let t = e.chartexStyle;
	return e.lineHidden != null || e.lineColor != null || e.lineWidthEmu != null || e.lineDash != null || t?.linePaintAuthored === !0 || t?.lineHidden != null || t?.lineNoStyle === !0 || t?.lineColors?.some((e) => e != null) === !0 || t?.linePaints?.some((e) => e != null) === !0 || t?.lineWidthEmu != null || t?.lineDash != null || t?.lineCustomDash != null || t?.lineCap != null || t?.lineJoin != null;
}
function Lt(e, t) {
	let n = e.cameraNormal(t);
	if (!n) return 1;
	let r = {
		x: -.2,
		y: .25,
		z: 1
	}, i = Math.hypot(r.x, r.y, r.z), a = Math.max(0, (n.x * r.x + n.y * r.y + n.z * r.z) / i);
	return Math.max(.78, Math.min(1, .78 + .24 * a));
}
var Rt = (e, t) => B(e && !e.startsWith("+") ? e.replace(/["\\]/g, "") : "Arial", t), zt = (e, t) => Rt(s(e, t), e), $ = (e, t, n = "minor") => Rt((t?.startsWith("+mj-") ? e.themeMajorFontLatin : t?.startsWith("+mn-") ? e.themeMinorFontLatin : t) ?? (n === "major" ? e.themeMajorFontLatin : e.themeMinorFontLatin), e);
function Bt(e, t) {
	if (t.length) {
		e.beginPath(), e.moveTo(t[0].x, t[0].y);
		for (let n = 1; n < t.length; n++) e.lineTo(t[n].x, t[n].y);
		e.closePath();
	}
}
var Vt = (e) => e === "transparent" || e === "#00000000" || e === "rgba(0,0,0,0)";
function Ht(e, t, n, r) {
	Vt(n) || (Bt(e, t), e.fillStyle = n, e.fill(), r > 0 && (Bt(e, t), e.fillStyle = `rgba(0,0,0,${r})`, e.fill()));
}
function Ut(e, t, n, r, i, a, o, s, c, l, u, d) {
	return Je({
		x0: t,
		x1: n,
		lower0: r,
		lower1: i,
		upper0: a,
		upper1: o,
		nearDepth: s,
		farDepth: c,
		capStart: u,
		capEnd: d
	}).flatMap((t) => Gt(e, t, l).map((e) => ({
		...e,
		outline: !1,
		outlineSegments: void 0
	})));
}
function Wt(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m = !1, h = !1, g, _) {
	if (![
		r,
		i,
		a,
		o,
		s,
		c,
		l,
		u
	].every(Number.isFinite) || a <= 0 || o <= 0 || s === c) return [];
	let v = Ke({
		shape: t,
		horizontal: n,
		crossStart: n ? i : r,
		crossSize: n ? o : a,
		baseCoord: s,
		endCoord: c,
		nearDepth: l,
		farDepth: u,
		baseScale: f,
		endScale: p,
		omitBaseCap: m,
		omitEndCap: h
	});
	return v ? Gt(e, v, d, g, _) : [];
}
function Gt(e, t, n, r, i, a = !1) {
	if (i?.exceeded) return [];
	let o = t.faces.map((r) => {
		let i = r.indices.map((e) => t.vertices[e]), a = e.cameraFacing(i);
		if (!a) return {
			meshFace: r,
			facing: a,
			face: null
		};
		let o = i.map((t) => e.project(t.x, t.y, t.depth)), s = o.reduce((e, t, n) => {
			let r = o[(n + 1) % o.length];
			return e + t.x * r.y - t.y * r.x;
		}, 0);
		return !Number.isFinite(s) || Math.abs(s) < 1e-7 ? {
			meshFace: r,
			facing: a,
			face: null
		} : {
			meshFace: r,
			facing: a,
			face: {
				points: o,
				color: Fe(n, Lt(e, i)),
				paintRole: "fill",
				shade: 0,
				cameraDepth: i.reduce((t, n) => t + e.cameraDepth(n.x, n.y, n.depth), 0) / i.length,
				cameraDepths: i.map((t) => e.cameraDepth(t.x, t.y, t.depth)),
				cameraWeights: i.map((t) => e.cameraProjectionWeight(t.x, t.y, t.depth)),
				outline: !1
			}
		};
	}), s = a ? [] : o.map((e) => e.face).filter((e) => e != null);
	if (i) {
		if (s.length > i.remaining) return i.exceeded = !0, [];
		i.remaining -= s.length;
	}
	let c = /* @__PURE__ */ new Map(), l = (e, t) => {
		if (e === t) return;
		let n = e < t ? `${e}:${t}` : `${t}:${e}`;
		c.has(n) || c.set(n, [e, t]);
	};
	for (let e of o) {
		if (!e.facing || !e.face) continue;
		let { indices: t, smoothSurface: n, role: r } = e.meshFace;
		if (!(n && r === "side")) for (let e = 0; e < t.length; e++) l(t[e], t[(e + 1) % t.length]);
	}
	let u = o.filter((e) => e.meshFace.role === "side").sort((e, t) => (e.meshFace.segmentIndex ?? 0) - (t.meshFace.segmentIndex ?? 0));
	if (t.silhouetteEdges.length === u.length && u.length > 0) for (let e = 0; e < u.length; e++) {
		let n = u[(e + u.length - 1) % u.length], r = u[e];
		if (n.facing === r.facing || !(r.facing ? r.face : n.face)) continue;
		let [i, a] = t.silhouetteEdges[e];
		l(i, a);
	}
	let d = o.some((e) => e.meshFace.role === "baseCap" && e.facing && e.face != null), f = o.some((e) => e.meshFace.role === "endCap" && e.facing && e.face != null);
	for (let e of u) {
		if (!e.facing || !e.face) continue;
		let t = [d ? void 0 : e.meshFace.baseRimEdge, f ? void 0 : e.meshFace.endRimEdge].filter((e) => e != null);
		for (let [e, n] of t) l(e, n);
	}
	let p = bt([...c.values()].map(([e, n]) => [t.vertices[e], t.vertices[n]]));
	if (!r) return s;
	let m = (e, t) => Math.hypot(e.x - t.x, e.y - t.y, e.depth - t.depth) <= 1e-9, h = (e) => p.junctions.some((t) => m(t.point, e));
	for (let t of p.paths) {
		let n = t.map((t) => e.project(t.x, t.y, t.depth)), a = t.map((t) => e.cameraDepth(t.x, t.y, t.depth)), o = t.map((t) => e.cameraProjectionWeight(t.x, t.y, t.depth)), c = pt(n.map((e, t) => ({
			...e,
			cameraDepth: a[t],
			cameraWeight: o[t]
		})), {
			width: r.width,
			dash: r.dash,
			lineCap: r.cap,
			startCap: h(t[0]) ? "butt" : r.cap,
			endCap: h(t.at(-1)) ? "butt" : r.cap,
			overlapStart: h(t[0]),
			overlapEnd: h(t.at(-1)),
			lineJoin: r.join
		});
		if (!c || i && c.length > i.remaining) return i && (i.exceeded = !0), [];
		i && (i.remaining -= c.length), s.push(...c.map((e) => {
			let t = 1e-6 * Math.max(1, Math.abs(e.cameraDepth));
			return {
				points: e.points,
				color: r.color,
				paintRole: "outline",
				shade: 0,
				cameraDepth: e.cameraDepth + t,
				cameraDepths: e.cameraDepths?.map((e) => e + t),
				cameraWeights: e.cameraWeights,
				outline: !1
			};
		}));
	}
	for (let t of p.junctions) {
		let n = dt({
			...e.project(t.point.x, t.point.y, t.point.depth),
			cameraDepth: e.cameraDepth(t.point.x, t.point.y, t.point.depth),
			cameraWeight: e.cameraProjectionWeight(t.point.x, t.point.y, t.point.depth)
		}, t.neighbours.map((t) => ({
			...e.project(t.x, t.y, t.depth),
			cameraDepth: e.cameraDepth(t.x, t.y, t.depth),
			cameraWeight: e.cameraProjectionWeight(t.x, t.y, t.depth)
		})), {
			width: r.width,
			lineJoin: r.join
		});
		if (!n) continue;
		if (i && i.remaining < 1) return i.exceeded = !0, [];
		i && --i.remaining;
		let a = 1e-6 * Math.max(1, Math.abs(n.cameraDepth));
		s.push({
			points: n.points,
			color: r.color,
			paintRole: "outline",
			shade: 0,
			cameraDepth: n.cameraDepth + a,
			cameraDepths: n.cameraDepths?.map((e) => e + a),
			cameraWeights: n.cameraWeights,
			outline: !1
		});
	}
	return s;
}
function Kt(e, t, n, r, i, a, o) {
	if (!t.length || o.exceeded) return [];
	let s = [...t].sort((e, t) => e.start - t.start), c = n - i / 2, l = n + i / 2, u = s[0], d = e.cameraDepth(u.centerX, c, u.centerDepth) >= e.cameraDepth(u.centerX, l, u.centerDepth) ? c : l, f = d === c ? l : c, p = (t, n, i) => ({
		x: t.centerX + Math.cos(n) * r,
		y: i,
		depth: t.centerDepth + Math.sin(n) * r / e.modelDepth
	}), m = (e) => ({
		x: e.centerX,
		y: d,
		depth: e.centerDepth
	}), h = [], g = (t, n = !1) => {
		if (t.length < 2 || o.exceeded) return;
		let r = t[0], i = t.at(-1), s = Math.hypot(r.x - i.x, r.y - i.y, r.depth - i.depth) <= 1e-9, c = pt((n && !s ? [...t, r] : [...t]).map((t) => ({
			...e.project(t.x, t.y, t.depth),
			cameraDepth: e.cameraDepth(t.x, t.y, t.depth),
			cameraWeight: e.cameraProjectionWeight(t.x, t.y, t.depth)
		})), {
			width: a.width,
			dash: a.dash,
			lineCap: a.cap,
			startCap: "butt",
			endCap: "butt",
			lineJoin: a.join
		});
		if (!c || c.length > o.remaining) {
			o.exceeded = !0;
			return;
		}
		o.remaining -= c.length;
		for (let e of c) {
			let t = 1e-6 * Math.max(1, Math.abs(e.cameraDepth));
			h.push({
				points: e.points,
				color: a.color,
				paintRole: "outline",
				shade: 0,
				cameraDepth: e.cameraDepth + t,
				cameraDepths: e.cameraDepths?.map((e) => e + t),
				cameraWeights: e.cameraWeights,
				outline: !1
			});
		}
	}, _ = [], v = [], y = [], b = /* @__PURE__ */ new Set(), x = (e) => {
		let t = Math.PI * 2, n = (e % t + t) % t;
		return (n < 1e-8 || t - n < 1e-8 ? 0 : n).toFixed(8);
	}, S = /* @__PURE__ */ new Map();
	for (let t of s) {
		S.set(x(t.start), {
			slice: t,
			angle: t.start
		}), S.set(x(t.end), {
			slice: t,
			angle: t.end
		});
		for (let n = 0; n <= t.segments; n++) {
			let r = t.start + (t.end - t.start) * n / t.segments, i = p(t, r, d);
			if ((!_.length || Math.hypot(_.at(-1).x - i.x, _.at(-1).y - i.y, _.at(-1).depth - i.depth) > 1e-9) && _.push(i), n === t.segments) continue;
			let a = t.start + (t.end - t.start) * (n + 1) / t.segments, o = p(t, r, c), s = p(t, r, l), u = p(t, a, l), m = p(t, a, c);
			if (e.cameraFacing([
				o,
				s,
				u,
				m
			])) {
				let e = p(t, r, f), n = p(t, a, f);
				y.length || y.push(e), y.push(n), b.add(x(r)), b.add(x(a));
			} else y.length && (v.push(y), y = []);
		}
	}
	if (y.length && v.push(y), v.length > 1) {
		let e = v[0], t = v.at(-1), n = e[0], r = t.at(-1);
		Math.hypot(n.x - r.x, n.y - r.y, n.depth - r.depth) <= 1e-9 && (v[0] = [...t, ...e.slice(1)], v.pop());
	}
	g(_, !0);
	let C = /* @__PURE__ */ new Map();
	for (let { slice: e, angle: t } of S.values()) g([m(e), p(e, t, d)]), b.has(x(t)) && C.set(x(t), {
		slice: e,
		angle: t
	});
	for (let t of v) {
		g(t);
		for (let n of [t[0], t.at(-1)]) {
			let t = Math.atan2((n.depth - u.centerDepth) * e.modelDepth, n.x - u.centerX);
			C.set(x(t), {
				slice: u,
				angle: t
			});
		}
	}
	for (let { slice: e, angle: t } of C.values()) g([p(e, t, d), p(e, t, f)]);
	return h;
}
function qt(t, n) {
	n.paint !== null && (n.paint === void 0 ? Ht(t, n.points, n.color, n.shade) : (Bt(t, n.points), t.fillStyle = n.paint, t.fill()), n.outline && (t.strokeStyle = n.outlineColor ?? "rgba(0,0,0,0.42)", t.lineWidth = n.outlineWidth ?? .75, t.setLineDash(e(n.outlineDash ?? "solid", t.lineWidth)), t.lineCap = n.outlineCap ?? "butt", t.lineJoin = n.outlineJoin ?? "miter", n.outline && (Bt(t, n.points), t.stroke()), t.setLineDash([])));
}
function Jt(e, t) {
	let n = t.filter((e) => e.paint !== null && e.points.length >= 3);
	if (n.length) {
		e.beginPath();
		for (let t of n) {
			e.moveTo(t.points[0].x, t.points[0].y);
			for (let n = 1; n < t.points.length; n++) e.lineTo(t.points[n].x, t.points[n].y);
			e.closePath();
		}
		e.fillStyle = "#000000", e.fill();
	}
}
function Yt(e, t, n, r, i) {
	if (r === void 0) return;
	let a = t.filter((e) => e.paintRole === n);
	if (!a.length) return;
	if (r === null) {
		for (let e of a) e.paint = null;
		return;
	}
	let o = a.flatMap((e) => e.points), s = Math.min(...o.map((e) => e.x)), c = Math.max(...o.map((e) => e.x)), l = Math.min(...o.map((e) => e.y)), u = Math.max(...o.map((e) => e.y)), d = X(r, e, s, l, c - s, u - l, i);
	for (let e of a) e.paint = d;
}
function Xt(e, t) {
	e.fillStyle = "#888", e.font = "12px sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.fillText("(too many data points)", t.x + t.w / 2, t.y + t.h / 2);
}
function Zt(e) {
	let t = e.catAxisLabelRotation;
	return t == null ? null : !Number.isFinite(t) || Math.abs(t) > 54e5 ? 0 : t / 6e4 * Math.PI / 180;
}
function Qt(e) {
	return Math.max(e * 1.2, 10);
}
function $t(e, t) {
	let n = Math.max(1, ...e.map(oe));
	return n > 1 ? (n - 1) * Qt(t) : 0;
}
function en(e, t, n, r, i, a = 1, o = 6, s = 0) {
	if (i || r === 0) {
		e.textAlign = i ? "right" : "center", e.textBaseline = i ? "middle" : a < 0 ? "bottom" : "top", R(e, t, n.x + (i ? -o : 0), n.y + (i ? 0 : a * o), s);
		return;
	}
	e.save(), e.translate(n.x, n.y + a * o), e.rotate(r), e.textAlign = a < 0 ? "left" : "right", e.textBaseline = "middle", R(e, t, 0, 0, s), e.restore();
}
function tn(e, n, r, i, a, o, s, c = void 0, l = 0, u = Se, d = void 0, f = void 0, p = 0, m = p, h = void 0, g = void 0, _ = void 0, v = void 0, y = void 0) {
	if (!(i > 0) || !Number.isFinite(n.x) || !Number.isFinite(n.y)) return;
	let x = i / 2;
	if (d !== void 0 || f !== void 0) {
		b(e, d, f, p, {
			x: n.x - x,
			y: n.y - x,
			w: i,
			h: i
		}, u, (e) => tn(e, n, r, i, a, o, s, c, l, u, void 0, void 0, 0, 0, h, g, _, v, y), m);
		return;
	}
	e.beginPath();
	let S = h === void 0 ? o : h == null ? null : h.fillType === "solid" ? `#${h.color}` : X(h, e, n.x - x, n.y - x, i, i, l);
	switch (S && (e.strokeStyle = S, e.lineWidth = s, e.setLineDash(t(_, g, s)), e.lineCap = v === "rnd" ? "round" : v === "sq" ? "square" : "butt", e.lineJoin = y === "round" || y === "bevel" ? y : "miter"), r) {
		case "square":
			e.rect(n.x - x, n.y - x, i, i);
			break;
		case "diamond":
			e.moveTo(n.x, n.y - x), e.lineTo(n.x + x, n.y), e.lineTo(n.x, n.y + x), e.lineTo(n.x - x, n.y), e.closePath();
			break;
		case "triangle":
			e.moveTo(n.x, n.y - x), e.lineTo(n.x + x, n.y + x), e.lineTo(n.x - x, n.y + x), e.closePath();
			break;
		case "x":
		case "plus": {
			let t = r === "x";
			e.moveTo(n.x - x, n.y + (t ? -x : 0)), e.lineTo(n.x + x, n.y + (t ? x : 0)), e.moveTo(n.x + (t ? -x : 0), n.y + x), e.lineTo(n.x + (t ? x : 0), n.y - x), S && e.stroke();
			return;
		}
		case "dash":
			e.rect(n.x - x, n.y - i * .1, i, i * .2);
			break;
		case "star":
			for (let t = 0; t < 10; t++) {
				let r = -Math.PI / 2 + t * Math.PI / 5, i = t % 2 == 0 ? x : x * .4, a = n.x + Math.cos(r) * i, o = n.y + Math.sin(r) * i;
				t ? e.lineTo(a, o) : e.moveTo(a, o);
			}
			e.closePath();
			break;
		case "dot":
			e.ellipse(n.x, n.y, i * .25, i * .1, 0, 0, Math.PI * 2);
			break;
		case "picture":
			c?.fillType === "image" && me(e, c, n.x - x, n.y - x, i, i, u, l), S && e.strokeRect(n.x - x, n.y - x, i, i);
			return;
		default:
			e.arc(n.x, n.y, x, 0, Math.PI * 2);
			break;
	}
	let C = c?.fillType === "image" ? c : void 0, w = C ? null : c === void 0 ? a === "transparent" ? null : a : c == null ? null : X(c, e, n.x - x, n.y - x, i, i, l);
	w == null ? C && (e.save(), e.clip(), me(e, C, n.x - x, n.y - x, i, i, u, l), e.restore()) : (e.fillStyle = w, e.fill()), S && e.stroke();
}
function nn(t, n, r, i, o, s, c, l, u, d = 0, f, m, g = "t", v = c, b = !0, x, S, C = s, w = 0) {
	let D = m, k = r.seriesDataLabels;
	if (xe(k, D) || n.showDataLabelsOverMax !== !0 && S != null && Number.isFinite(S) && C > S) return;
	let j = D?.showVal ?? k?.showVal ?? n.showDataLabels, M = D?.showCatName ?? k?.showCatName ?? !1, N = D?.showSerName ?? k?.showSerName ?? !1, P = D?.showPercent ?? k?.showPercent ?? !1, F = D?.text, I = E({
		customText: F,
		showCategory: M,
		showSeries: N,
		showValue: j,
		showPercent: P,
		category: r.categories?.[o] ?? n.categories[o] ?? `${o + 1}`,
		seriesName: r.name || `Series ${i + 1}`,
		sourceValue: s,
		valueDivisor: x?.divisor,
		percentRatio: f != null && Number.isFinite(f) ? f : void 0,
		formatCode: D?.formatCode ?? k?.formatCode ?? n.dataLabelFormatCode ?? r.valFormatCode,
		formatDivisors: D?.formatCode == null ? k?.formatDivisors : null,
		percentFormatCode: D?.formatCode ?? k?.percentFormatCode ?? k?.formatCode ?? n.dataLabelFormatCode ?? "0%",
		percentFormatDivisors: D?.formatCode == null ? k?.percentFormatDivisors : null,
		date1904: n.date1904,
		separator: D?.separator ?? k?.separator
	});
	if (!I) return;
	let L = le(D?.fontSizeHpt ?? k?.fontSizeHpt ?? n.dataLabelFontSizeHpt, u) ?? 9 * u, R = D?.fontBold ?? k?.fontBold ?? n.dataLabelFontBold ?? !1, z = a(D, k), B = $(n, D?.fontFace ?? k?.fontFace ?? n.dataLabelFontFace);
	t.font = `${z.fontItalic ? "italic " : ""}${R ? "bold " : ""}${L}px ${B}`;
	let V = `#${D?.fontColor ?? k?.fontColor ?? r.labelColor ?? n.dataLabelFontColor ?? "111111"}`, H = F && D?.richRuns?.length ? Le(t, {
		runs: D.richRuns,
		ptToPx: u,
		fontFamily: B,
		fallbackBold: R,
		fallbackItalic: z.fontItalic,
		fallbackBaseline: z.fontBaseline,
		fallbackColorHidden: z.fontPaintAuthored === !0 && (z.fontHidden === !0 || z.fontColor == null),
		fontFamilyForFace: (e) => $(n, e)
	}, L, V) : null, U = H ? [] : A(I, Math.max(L, l.w * .45), Math.max(L * 1.2, l.h * .35), L * 1.2, (e) => t.measureText(e).width, z);
	if (!H && !U.length) return;
	let W = H?.width ?? Math.max(...U.map((e) => t.measureText(e).width)), G = H?.height ?? U.length * L * 1.2, K = T(z, u), te = p(W + K.left + K.right, G + K.top + K.bottom, z.textRotation, z.textVerticalMode), q = _({
		kind: "point",
		x: c.x,
		y: c.y,
		position: D?.position ?? k?.position ?? n.dataLabelPosition ?? g,
		markerGap: d
	}, l, {
		w: te.w,
		h: te.h
	}, L, D?.manualLayout, l);
	if (!q) return;
	let ne = ee(D?.labelBox, k?.labelBox);
	k?.showLeaderLines && k.leaderLineHidden !== !0 && b && (t.beginPath(), t.moveTo(v.x, v.y), t.lineTo(Math.max(q.rect.x, Math.min(v.x, q.rect.x + q.rect.w)), Math.max(q.rect.y, Math.min(v.y, q.rect.y + q.rect.h))), t.strokeStyle = `#${k.leaderLineColor ?? "808080"}`, t.lineWidth = k.leaderLineWidthEmu == null ? .75 * u : Math.max(.25, k.leaderLineWidthEmu / Y * u), t.setLineDash(e(k.leaderLineDash ?? "solid", t.lineWidth)), t.stroke()), ye(t, ne, q.rect, u, w), t.save(), t.beginPath(), t.rect(q.clip.x, q.clip.y, q.clip.w, q.clip.h), t.clip();
	let re = y(z, q.textAlign), ie = h(q.x, q.y, q.rect, G + K.top + K.bottom, z, D?.manualLayout != null, re, q.textAlign, W + K.left + K.right, te.radians), J = O(t, ie.x, ie.y, te.radians, re, q.textBaseline, K);
	if (H) {
		Ie(t, H, J.x, J.y, re, q.textBaseline, D?.manualLayout ? Math.max(0, q.rect.w - K.left - K.right) : H.width), t.restore();
		return;
	}
	if (!(z.fontPaintAuthored === !0 && (z.fontHidden === !0 || z.fontColor == null))) {
		t.fillStyle = V, t.textAlign = re, t.textBaseline = "middle";
		let e = L * 1.2, n = (z.fontBaseline ?? 0) * L, r = J.y - (U.length - 1) * e / 2 - n;
		U.forEach((n, i) => t.fillText(n, J.x, r + i * e));
	}
	t.restore();
}
function rn(e, t, n) {
	let r = t.seriesDataLabels;
	return xe(r, n) ? !1 : n?.text ? !0 : (n?.showVal ?? r?.showVal ?? e.showDataLabels) || (n?.showCatName ?? r?.showCatName ?? !1) || (n?.showSerName ?? r?.showSerName ?? !1) || (n?.showPercent ?? r?.showPercent ?? !1);
}
function an(e, t, r, i, a, o) {
	let s = n(t, r.h, i), c = t.titleRichRuns?.length ? {
		...s,
		bandH: s.bandH + G(t.title, s.fontPx)
	} : s;
	if (t.title) {
		e.font = `${t.titleFontBold === !1 ? "" : "bold "}${c.fontPx}px ${zt(t, t.titleFontFace)}`, e.fillStyle = t.titleFontColor ? `#${t.titleFontColor}` : "#111111", e.textAlign = "center", e.textBaseline = "top";
		let n = be(e, t.title), i = {
			x: r.x + (r.w - n) / 2,
			y: r.y + c.topPad,
			w: n,
			h: Math.max(1, c.fontPx) + G(t.title, c.fontPx)
		}, a = t.titleManualLayout ? pe({
			...t.titleManualLayout,
			w: void 0,
			h: void 0
		}, r, i) : null;
		R(e, t.title, a ? a.x + a.w / 2 : r.x + r.w / 2, a?.y ?? i.y, c.fontPx);
	}
	let l = xt(t);
	e.save();
	let u = (t.chartType === "pie" ? t.series[0]?.categories?.length ? t.series[0].categories : t.categories : t.series.map((e, t) => e.name || `Series ${t + 1}`)).flatMap((e, t) => l.get(t)?.deleted === !0 ? [] : [{
		label: e,
		index: t
	}]), d = u.map((e) => St(t, l.get(e.index), i)), f = Math.max(0, ...d.map((e) => e.fontPx)), p = u.map((t, n) => (e.font = d[n].font, 7 * i + 4 + be(e, t.label))), m = ne(t, r.w, r.h, {
		itemWidths: p,
		rowHeight: Math.max(f * 1.45, 12) + $t(u.map((e) => e.label), f),
		itemGap: 12,
		horizontalPadding: 8,
		verticalPadding: 4
	});
	e.restore();
	let h = de(m, t.legendOverlay === !0), _ = ce(t, r.w, r.h, i), v = C(t.catAxisTitleTextVerticalInsetEmu, i), y = C(t.valAxisTitleTextVerticalInsetEmu, i), b = a === "horizontal" ? t.catAxisTitle ? _.catFontPx + v + N(r.w) + 4 + g(t.catAxisTitle, _.catFontPx, "left", t.catAxisTitleRotation, t.catAxisTitleVerticalMode) : 0 : a === "vertical" ? _.valBandW : 0, x = a === "horizontal" ? t.valAxisTitle ? _.valFontPx + y + N(r.h) + 4 + g(t.valAxisTitle, _.valFontPx, "horizontal", t.valAxisTitleRotation, t.valAxisTitleVerticalMode) : 0 : a === "vertical" ? _.catBandH : 0, S = U(t, r.x, r.y, r.w, r.h, i, {
		titleBand: c,
		legendReserve: m,
		pad: {
			t: c.bandH + h.legTopH + r.h * .04,
			r: h.legRightW + r.w * .05,
			b: h.legBottomH + r.h * .19 + x,
			l: h.legLeftW + r.w * .13 + b
		},
		honorPlotAreaManualLayout: !0,
		manualOuterInsets: {
			t: c.bandH,
			r: h.legRightW,
			b: h.legBottomH + x,
			l: h.legLeftW + b
		}
	}), w = {
		x: S.plotRect.px0,
		y: S.plotRect.py0,
		w: Math.max(1, S.plotRect.pw),
		h: Math.max(1, S.plotRect.ph)
	};
	fe(e, t, w.x, w.y, w.w, w.h, i, o);
	let T = m ? m.side === "r" ? {
		x: r.x + r.w - m.reserveW,
		y: w.y,
		w: m.reserveW,
		h: w.h
	} : m.side === "l" ? {
		x: r.x,
		y: w.y,
		w: m.reserveW,
		h: w.h
	} : m.side === "t" ? {
		x: r.x + 4,
		y: r.y + c.bandH,
		w: Math.max(1, r.w - 8),
		h: m.reserveH
	} : {
		x: r.x + 4,
		y: r.y + r.h - m.reserveH,
		w: Math.max(1, r.w - 8),
		h: m.reserveH
	} : null;
	return {
		plot: w,
		legend: (T && t.legendManualLayout ? pe(t.legendManualLayout, r, T) : null) ?? T,
		legendMeasure: {
			labels: u.map((e) => e.label),
			styles: d,
			itemWidths: p
		}
	};
}
function on(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
	e.save(), e.font = `${l ? "italic " : ""}${c ? "bold " : ""}${a}px ${o}`, e.fillStyle = s ? `#${s}` : "#555";
	let m = f ? t : sn(e, t, p), h = L(i, u, d), g = r;
	if (f) {
		let t = be(e, m), i = a + G(m, a), o = Math.abs(Math.cos(h)), s = Math.abs(Math.sin(h)), c = {
			x: r.x - (t * o + i * s) / 2,
			y: r.y - (t * s + i * o) / 2,
			w: t * o + i * s,
			h: t * s + i * o
		}, l = pe({
			...f,
			w: void 0,
			h: void 0
		}, n, c);
		l && (g = {
			x: l.x + l.w / 2,
			y: l.y + l.h / 2
		});
	}
	e.translate(g.x, g.y), h && e.rotate(h), e.textAlign = "center", e.textBaseline = "middle", R(e, m, 0, 0, a), e.restore();
}
function sn(e, t, n) {
	let r = q(t);
	return r.length === 1 ? V(e, t, n) : r.map((t) => V(e, t, n)).join("\n");
}
function cn(e, t, n, r, i, a) {
	if (t.valAxisTitle) {
		let o = F(t.valAxisTitleFontSizeHpt, a), s = i ? "horizontal" : "left", c = g(t.valAxisTitle, o, s, t.valAxisTitleRotation, t.valAxisTitleVerticalMode) / 2;
		on(e, t.valAxisTitle, n, i ? {
			x: r.x + r.w / 2,
			y: r.y + r.h + N(n.h) + o / 2 + c
		} : {
			x: r.x - N(n.w) - o / 2 - c,
			y: r.y + r.h / 2
		}, s, o, $(t, t.valAxisTitleFontFace, "major"), t.valAxisTitleFontColor, t.valAxisTitleFontBold ?? !0, t.valAxisTitleFontItalic ?? !1, t.valAxisTitleRotation, t.valAxisTitleVerticalMode, t.valAxisTitleManualLayout, i ? r.w : r.h);
	}
	if (t.catAxisTitle) {
		let o = F(t.catAxisTitleFontSizeHpt, a), s = i ? "left" : "horizontal", c = g(t.catAxisTitle, o, s, t.catAxisTitleRotation, t.catAxisTitleVerticalMode) / 2;
		on(e, t.catAxisTitle, n, i ? {
			x: r.x - N(n.w) - o / 2 - c,
			y: r.y + r.h / 2
		} : {
			x: r.x + r.w / 2,
			y: r.y + r.h + N(n.h) + o / 2 + c
		}, s, o, $(t, t.catAxisTitleFontFace, "major"), t.catAxisTitleFontColor, t.catAxisTitleFontBold ?? !0, t.catAxisTitleFontItalic ?? !1, t.catAxisTitleRotation, t.catAxisTitleVerticalMode, t.catAxisTitleManualLayout, i ? r.h : r.w);
	}
}
function ln(e, t, n, r, i, a, o, s, c, l, u) {
	let d = t.threeD?.seriesAxis;
	if (!d || d.hidden || t.threeD?.barGrouping !== "standard" || t.series.length === 0) return;
	let f = On(t, r, i, a, o, s, c), p = gn(r), m = c === "vertical" ? p.seriesAxisX : f.axisX, h = c === "horizontal" ? p.floorY === r.front.y ? r.front.y + r.front.h : r.front.y : p.floorY, g = r.project(m, h, r.topology.nearDepth), _ = r.project(m, h, r.topology.farDepth), v = Math.hypot(_.x - g.x, _.y - g.y);
	if (!(v > 1e-6)) return;
	let y = {
		x: (_.x - g.x) / v,
		y: (_.y - g.y) / v
	}, b = {
		x: -y.y,
		y: y.x
	}, x = r.project(r.front.x + r.front.w / 2, r.front.y + r.front.h / 2, .5), S = {
		x: (g.x + _.x) / 2,
		y: (g.y + _.y) / 2
	};
	(S.x - x.x) * b.x + (S.y - x.y) * b.y < 0 && (b = {
		x: -b.x,
		y: -b.y
	}), (d.tickLabelPos === "low" && b.y < 0 || d.tickLabelPos === "high" && b.y > 0) && (b = {
		x: -b.x,
		y: -b.y
	}), d.lineHidden || (bn(e, vn(d.lineColor, d.lineWidthEmu, d.lineDash, u)), e.beginPath(), e.moveTo(g.x, g.y), e.lineTo(_.x, _.y), e.stroke());
	let C = Math.max(1, Math.floor(d.tickMarkSkip ?? 1)), w = Math.max(1, Math.floor(d.tickLabelSkip ?? 1)), T = d.majorTickMark ?? "out", E = le(d.fontSizeHpt, u) ?? 9 * u;
	if (e.font = `${d.fontItalic ? "italic " : ""}${d.fontBold ? "bold " : ""}${E}px ${$(t, d.fontFace)}`, e.fillStyle = d.fontColor ? `#${d.fontColor}` : "#595959", e.textAlign = Math.abs(b.x) < .2 ? "center" : b.x < 0 ? "right" : "left", e.textBaseline = Math.abs(b.y) < .2 ? "middle" : b.y < 0 ? "bottom" : "top", l && !d.lineHidden && T !== "none") {
		bn(e, yn(d.lineColor, d.lineWidthEmu, d.lineDash, u));
		let n = t.series.length;
		for (let t = 0; t <= n; t += C) {
			let i = t / n, a = d.orientation === "maxMin" ? 1 - i : i, o = r.project(m, h, a), s = 6 * u, c = T === "cross" ? s / 2 : T === "out" ? s : 0, l = T === "cross" ? s / 2 : T === "in" ? s : 0;
			e.beginPath(), e.moveTo(o.x + b.x * c, o.y + b.y * c), e.lineTo(o.x - b.x * l, o.y - b.y * l), e.stroke();
		}
	}
	for (let n = 0; n < t.series.length; n++) {
		let i = r.seriesDepth(n, t.series.length, !1), a = d.orientation === "maxMin" ? 1 - i : i, o = r.project(m, h, a);
		if (!l && !d.lineHidden && n % C === 0 && T !== "none") {
			let t = 6 * u, n = T === "cross" ? t / 2 : T === "out" ? t : 0, r = T === "cross" ? t / 2 : T === "in" ? t : 0;
			e.beginPath(), e.moveTo(o.x + b.x * n, o.y + b.y * n), e.lineTo(o.x - b.x * r, o.y - b.y * r), e.stroke();
		}
		d.tickLabelPos !== "none" && n % w === 0 && R(e, t.series[n].name || `Series ${n + 1}`, o.x + b.x * (6 * u + 3), o.y + b.y * (6 * u + 3), K(E));
	}
	if (e.setLineDash([]), d.title) {
		let i = F(d.titleFontSizeHpt, u), a = E + i + 12 + ue(t.series.map((e, t) => e.name || `Series ${t + 1}`), K(E)) + G(d.title, i) / 2;
		on(e, d.title, n, {
			x: S.x + b.x * a,
			y: S.y + b.y * a
		}, "horizontal", i, $(t, d.titleFontFace, "major"), d.titleFontColor, d.titleFontBold ?? !0, d.titleFontItalic ?? !1, d.titleRotation, d.titleVerticalMode, d.titleManualLayout, Math.max(r.front.w, r.front.h));
	}
}
function un(e, t, n, r, i, a, o) {
	let s = j(e, "dataPointMarker", i), u = S(e, "dataPointMarker"), d = t.chartexFormatIdx ?? i, f = x(n?.markerStyle, u, r), p = x(t.markerStyle, u, d), m = f !== void 0 || n?.markerFillPaint !== void 0 || n?.markerFill != null || n?.color != null || n?.markerFillPaintAuthored === !0 && n.markerStyle?.fillHidden !== !0, h = p !== void 0 || t.markerFillPaint !== void 0 || t.markerFill != null || t.markerFillPaintAuthored === !0 && t.markerStyle?.fillHidden !== !0, g = w(s, u, d), _ = m ? f ?? n?.markerFillPaint : h ? p ?? t.markerFillPaint : g, v = he(t, n, r, a), y = _;
	_?.fillType === "solid" ? (v = _.color, y = void 0) : _ === null && (v = "00000000");
	let b = l(n?.markerStyle, u, r), C = l(t.markerStyle, u, d), T = b !== void 0 || n?.markerLine != null || n?.markerLinePaintAuthored === !0 && n.markerStyle?.lineHidden !== !0, E = C !== void 0 || t.markerLine != null || t.markerLinePaintAuthored === !0 && t.markerStyle?.lineHidden !== !0, D = k(s, d), O = T ? b ?? (n?.markerLinePaintAuthored === !0 ? null : void 0) : E ? C ?? (t.markerLinePaintAuthored === !0 ? null : void 0) : D, A = n?.markerLine ?? t.markerLine ?? t.lineColor ?? a, N = O;
	O?.fillType === "solid" ? (A = O.color, N = void 0) : O === null && (A = "00000000");
	let P = n?.markerStyle ?? t.markerStyle ?? s, F = M(n?.markerStyle, t.markerStyle, s);
	return {
		fill: v,
		fillPaint: y,
		line: A,
		linePaint: N,
		lineWidth: (n?.markerLineWidthEmu ?? t.markerLineWidthEmu ?? P?.lineWidthEmu) == null ? Math.max(.75, o) : Math.max(.25, (n?.markerLineWidthEmu ?? t.markerLineWidthEmu ?? P?.lineWidthEmu ?? 0) / Y * o),
		lineDash: F?.lineDash,
		lineCustomDash: F?.lineCustomDash,
		lineCap: P?.lineCap,
		lineJoin: P?.lineJoin,
		effectDirect: c(n?.markerStyle, n?.chartexStyle, t.markerStyle),
		effectFallback: s,
		effectIndex: n?.markerStyle || n?.chartexStyle ? r : d,
		effectFallbackIndex: d
	};
}
function dn(e, n, r, i, a, o, s, l, u, d, f, p) {
	let m = Q(n, r, i, a, o, p), h = ze(n, r, a, o), g = {
		x: s,
		y: l - u / 2,
		w: u,
		h: u
	}, _ = (e) => {
		if (m.fill !== null) {
			let t = m.fill === void 0 ? m.color : m.fill.fillType === "image" ? null : X(m.fill, e, g.x, g.y, g.w, g.h, f);
			t && (e.fillStyle = t, e.fillRect(g.x, g.y, g.w, g.h));
		}
		let n = m.lineFill === void 0 ? m.lineColor : m.lineFill == null || m.lineFill.fillType === "image" ? null : X(m.lineFill, e, g.x, g.y, g.w, g.h, f);
		n && (e.strokeStyle = n, e.lineWidth = m.lineWidthEmu == null ? .75 * d : Math.max(.25, m.lineWidthEmu / Y * d), e.setLineDash(t(m.lineCustomDash, m.lineDash, e.lineWidth)), e.lineCap = m.lineCap, e.lineJoin = m.lineJoin, e.strokeRect(g.x, g.y, g.w, g.h), e.setLineDash([]));
	}, v = c(i?.chartexStyle, r.chartexStyle);
	b(e, v, j(n, "dataPoint3D", o), v === i?.chartexStyle ? a : h, g, d, _, h);
}
function fn(e, n, r, i, a, o, s, l, u, d) {
	let f = Q(n, r, void 0, i, i, !1), p = f.lineFill === void 0 ? f.lineColor == null ? f.fill : {
		fillType: "solid",
		color: f.lineColor.replace(/^#/, "")
	} : f.lineFill;
	if (p !== null) {
		let a = f.lineWidthEmu == null ? Math.max(1, 2 * u) : Math.max(.5, f.lineWidthEmu / Y * u), m = {
			x: o,
			y: s - a / 2,
			w: l,
			h: a
		}, h = p === void 0 ? f.color : p.fillType === "image" ? null : p.fillType === "solid" ? `#${p.color}` : X(p, e, o, s - a / 2, l, a, d);
		if (h) {
			let g = (n) => {
				n.beginPath(), n.moveTo(o, s), n.lineTo(o + l, s), n.strokeStyle = n === e ? h : p === void 0 ? f.color : p.fillType === "image" ? "rgba(0,0,0,0)" : p.fillType === "solid" ? `#${p.color}` : X(p, n, o, s - a / 2, l, a, d) ?? "rgba(0,0,0,0)", n.lineWidth = a, n.setLineDash(t(f.lineCustomDash, f.lineDash, a)), n.stroke(), n.setLineDash([]);
			}, _ = ze(n, r, i, i);
			b(e, c(r.chartexStyle), j(n, "dataPoint3D", i), _, m, u, g, _);
		}
	}
	if (r.showMarker !== !0 || r.markerSymbol === "none") return;
	let m = r.markerSymbol ?? "circle", h = un(n, r, void 0, i, i, a.replace(/^#/, ""), u);
	tn(e, {
		x: o + l / 2,
		y: s
	}, m, Math.min(l, Math.max(2, (r.markerSize ?? 5) * u)), h.fill === "00000000" ? "transparent" : `#${h.fill.replace(/^#/, "")}`, h.line === "00000000" ? "rgba(0,0,0,0)" : `#${h.line.replace(/^#/, "")}`, h.lineWidth, h.fillPaint, d, u, h.effectDirect, h.effectFallback, h.effectIndex, h.effectFallbackIndex, h.linePaint, h.lineDash, h.lineCustomDash, h.lineCap, h.lineJoin);
}
function pn(e, t, n, r, i = !1, a, o = 0) {
	if (!n) return;
	I(e, t, n, r, o);
	let s = new Map(t.series[0]?.dataPointOverrides?.map((e) => [e.idx, e]) ?? []), c = i ? (t.series[0]?.categories?.length ? t.series[0].categories : t.categories).map((e, n) => {
		let r = t.series[0]?.dataPointColors?.[n];
		return {
			label: e,
			color: r === "00000000" ? "transparent" : r ? `#${r}` : kt(n),
			series: t.series[0],
			point: s.get(n),
			sourceIndex: n,
			seriesIndex: 0
		};
	}) : t.series.map((e, t) => ({
		label: e.name || `Series ${t + 1}`,
		color: kt(t, e),
		series: e,
		point: void 0,
		sourceIndex: t,
		seriesIndex: t
	})), l = xt(t), u = c.filter((e) => l.get(e.sourceIndex)?.deleted !== !0), f = a != null && a.labels.length === u.length && a.labels.every((e, t) => e === u[t].label), p = f ? a.styles : u.map((e) => St(t, l.get(e.sourceIndex), r));
	e.textAlign = "left", e.textBaseline = "middle";
	let m = Math.max(0, ...p.map((e) => e.fontPx)), h = Math.max(m * 1.45, 12), g = Math.min(7 * r, h * .7), _ = h + $t(u.map((e) => e.label), m);
	if (t.legendPos === "t" || t.legendPos === "b" || t.legendManualLayout != null && n.w >= n.h) {
		let s = f ? a.itemWidths : u.map((t, n) => (e.font = p[n].font, g + 4 + be(e, t.label))), c = J(s, Math.max(1, n.w - 8), 12).slice(0, Math.max(0, Math.floor((n.h - 4 + 1e-6) / _))), l = n.y + 2 + _ / 2;
		for (let a of c) {
			let c = a.map((e) => Math.min(n.w, s[e])), d = c.reduce((e, t) => e + t, 0) + Math.max(0, a.length - 1) * 12, f = n.x + Math.max(4, (n.w - d) / 2);
			for (let n = 0; n < a.length; n++) {
				let s = a[n], d = u[s], m = p[s];
				e.font = m.font;
				let h = Math.max(0, c[n] - g - 4);
				!i && t.chartType.toLowerCase().includes("line") && d.series ? fn(e, t, d.series, d.seriesIndex, d.color, f, l, g, r, o) : d.series && dn(e, t, d.series, d.point, d.sourceIndex, d.seriesIndex, f, l, g, r, o, i), e.fillStyle = m.color, R(e, d.label, f + g + 4, l, Qt(m.fontPx), h), f += c[n] + 12;
			}
			l += _;
		}
		return;
	}
	let v = n.y;
	for (let a = 0; a < u.length; a++) {
		let s = u[a], c = p[a];
		e.font = c.font;
		let l = n.x + 8 + g, f = Math.max(0, n.x + n.w - 4 - l), m = Math.max(c.fontPx * 1.2, 10), _ = q(s.label), y = (t) => d(t, f, m * (i ? 1 : 2), m, (t) => e.measureText(t).width), b = _.length === 1 ? y(s.label) : _.flatMap(y);
		if (b.length === 0) continue;
		let x = Math.max(h, b.length * m + 2);
		if (v + x > n.y + n.h + 1e-6) break;
		let S = v + x / 2;
		!i && t.chartType.toLowerCase().includes("line") && s.series ? fn(e, t, s.series, s.seriesIndex, s.color, n.x + 4, S, g, r, o) : s.series && dn(e, t, s.series, s.point, s.sourceIndex, s.seriesIndex, n.x + 4, S, g, r, o, i), e.fillStyle = c.color;
		let C = S - (b.length - 1) * m / 2;
		b.forEach((t, n) => e.fillText(t, l, C + n * m)), v += x;
	}
}
function mn(e, t, n, r, i, a) {
	let o = i ? 100 : 1, s = e.valAxisMinorTickMark ?? "none";
	return u({
		dataMin: t,
		dataMax: n,
		explicitMin: e.valMin == null ? i ? t : null : e.valMin * o,
		explicitMax: e.valMax == null ? i ? n : null : e.valMax * o,
		majorUnit: e.valAxisMajorUnit == null ? null : e.valAxisMajorUnit * o,
		minorUnit: e.valAxisMinorUnit == null ? null : e.valAxisMinorUnit * o,
		axisLenPt: r,
		axisOrientation: a,
		logBase: e.valAxisLogBase,
		reversed: e.valAxisOrientation === "maxMin",
		needMinor: e.valAxisMinorGridlines === !0 || s !== "none"
	});
}
function hn(e, t, n) {
	let r = e != null && Number.isFinite(e) ? (e % 360 + 360) % 360 : 0, i = Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0, a = Number.isFinite(n) ? Math.max(0, Math.min(1 - i, n)) : 0, o = Math.PI / 2 - (r * Math.PI / 180 + i * Math.PI * 2), s = o - a * Math.PI * 2;
	return {
		start: Math.min(o, s),
		end: Math.max(o, s),
		middle: (o + s) / 2,
		leading: o
	};
}
function gn(e) {
	let { front: t } = e, n = t.x, r = t.x + t.w, i = e.topology.farX === "min" ? n : r, a = i === n ? r : n, o = e.topology.axisY === "min" ? t.y : t.y + t.h, s = o === t.y ? t.y + t.h : t.y, { nearDepth: c, farDepth: l } = e.topology, u = e.project(n, o, c), d = e.project(r, o, c), f = e.project(r, o, l), p = e.project(n, o, l), m = e.project(n, s, l), h = e.project(r, s, l), g = e.project(i, o, c), _ = e.project(i, o, l), v = e.project(i, s, l), y = e.project(i, s, c);
	return {
		floor: [
			u,
			d,
			f,
			p
		],
		sideWall: [
			g,
			_,
			v,
			y
		],
		backWall: [
			p,
			f,
			h,
			m
		],
		sideX: i,
		seriesAxisX: a,
		floorY: o,
		oppositeFloorY: s,
		nearDepth: c,
		farDepth: l
	};
}
function _n(t, n, r, i, a = "A6A6A6", o = .75) {
	let s = n != null && Number.isFinite(n) && n >= 0 ? Math.max(.25, n / Y * i) : o * i;
	return {
		color: `#${t ?? a}`,
		width: s,
		dash: e(r ?? "solid", s)
	};
}
function vn(t, n, r, i) {
	let a = _n(t, n, r, i, "898989", 1);
	if (n == null || !Number.isFinite(n) || n < 0) return a;
	let o = n / Y * i;
	if (!(o > 0)) return a;
	let s = o;
	return {
		...a,
		width: s,
		dash: e(r ?? "solid", s)
	};
}
function yn(e, t, n, r) {
	return vn(e, t, n, r);
}
function bn(e, t) {
	e.strokeStyle = t.color, e.lineWidth = t.width, e.setLineDash(t.dash);
}
function xn(e, n, r, i, a, o, s, c, l) {
	let { front: u } = r, d = u.x, p = u.x + u.w, m = gn(r), { sideX: h, floorY: g, oppositeFloorY: _, nearDepth: v, farDepth: y } = m, b = On(n, r, i, o, s, c, a), x = [], S = n.catAxisLinePaintAuthored === !0, C = n.valAxisLinePaintAuthored === !0, w = a === "vertical" ? S && !n.catAxisHidden && !n.catAxisLineHidden : C && !n.valAxisHidden && !n.valAxisLineHidden, T = a === "vertical" ? C && !n.valAxisHidden && !n.valAxisLineHidden : S && !n.catAxisHidden && !n.catAxisLineHidden;
	w && x.push([b.horizontalStart, b.horizontalEnd]), T && x.push([b.verticalStart, b.verticalEnd]);
	let E = n.threeD?.seriesAxis, D = E?.linePaintAuthored === !0;
	if (E && !E.hidden && !E.lineHidden && D && n.threeD?.barGrouping === "standard" && n.series.length > 0) {
		let e = a === "vertical" ? m.seriesAxisX : b.axisX, t = a === "horizontal" ? g === r.front.y ? r.front.y + r.front.h : r.front.y : g;
		x.push([r.project(e, t, v), r.project(e, t, y)]);
	}
	let O = (e, t) => Math.hypot(e.x - t.x, e.y - t.y) <= 1e-6, k = (e, t) => x.some(([n, r]) => O(e, n) && O(t, r) || O(e, r) && O(t, n)), A = (e, t) => {
		let n = Te(r, e, t?.thicknessPercent), i = n.faces.map((e, t) => ({
			scenePoints: e,
			faceIndex: t
		})).filter(({ scenePoints: e }) => n.thickness === 0 || r.cameraFacing(e)).map(({ scenePoints: e, faceIndex: t }) => ({
			faceIndex: t,
			scenePoints: e,
			points: e.map((e) => r.projectUnbounded(e.x, e.y, e.depth)),
			depth: e.reduce((e, t) => e + r.cameraDepth(t.x, t.y, t.depth), 0) / e.length
		})).sort((e, t) => e.depth - t.depth);
		return {
			slab: n,
			faces: i,
			visibleFaceIndices: new Set(i.map((e) => e.faceIndex))
		};
	}, j = A("floor", n.threeD?.floor), M = A("sideWall", n.threeD?.sideWall), N = A("backWall", n.threeD?.backWall), P = j.faces, F = M.faces, I = N.faces, L = (t, a, o, s) => {
		let c = f(n, a, o), u = t.faces;
		if (!c.fill || !u.length) return;
		if (c.fill.fillType === "image") {
			let n = c.fill, o = je(t.slab, l), u = ie(c.fill, o ? se(c.fill, o.widthPt, o.heightPt) : void 0);
			if (!u) return;
			Oe(e, c.fill, u, a, s, t.slab, t.faces.map((e) => e.faceIndex), (e) => r.projectUnbounded(e.x, e.y, e.depth), i.max - i.min, (e, t) => ie(n, se(n, e, t)), l);
			return;
		}
		let d = u.flatMap((e) => e.points), p = Math.min(...d.map((e) => e.x)), m = Math.max(...d.map((e) => e.x)), h = Math.min(...d.map((e) => e.y)), g = Math.max(...d.map((e) => e.y)), _ = c.fill.fillType === "solid" ? `#${c.fill.color}` : X(c.fill, e, p, h, m - p, g - h);
		if (_) for (let t of u) t.points.length < 3 || (Bt(e, t.points), e.fillStyle = _, e.fill());
	};
	L(j, n.threeD?.floor, "floor", "floor"), L(M, n.threeD?.sideWall, "wall", "sideWall"), L(N, n.threeD?.backWall, "wall", "backWall");
	let R = (t, n, i, a, o = !0) => {
		for (let s of Ae(t.slab, n, i, a)) {
			if (!o && s.faceIndex !== 0 || !t.visibleFaceIndices.has(s.faceIndex)) continue;
			let [n, i] = s.scenePoints.map((e) => r.projectUnbounded(e.x, e.y, e.depth));
			e.beginPath(), e.moveTo(n.x, n.y), e.lineTo(i.x, i.y), e.stroke();
		}
	}, z = (t, n, o) => {
		bn(e, n);
		for (let n of t) {
			let t = i.fraction(n);
			if (o) {
				a === "horizontal" ? (R(j, "floor", "x", t), R(N, "backWall", "x", t)) : (R(M, "sideWall", "y", t), R(N, "backWall", "y", t));
				continue;
			}
			if (a === "horizontal") {
				let n = u.x + t * u.w, i = r.project(n, g, y), a = r.project(n, _, y);
				e.beginPath(), e.moveTo(i.x, i.y), e.lineTo(a.x, a.y), e.stroke();
			} else {
				let n = u.y + u.h - t * u.h, i = r.project(h, n, v), a = r.project(h, n, y), o = r.project(h === d ? p : d, n, y);
				e.beginPath(), e.moveTo(i.x, i.y), e.lineTo(a.x, a.y), e.stroke(), e.beginPath(), e.moveTo(a.x, a.y), e.lineTo(o.x, o.y), e.stroke();
			}
		}
	};
	n.valAxisMinorGridlines === !0 && z(i.minorTicks, _n(n.valAxisMinorGridlineColor, n.valAxisMinorGridlineWidthEmu, n.valAxisMinorGridlineDash, l, "D9D9D9", .5), !0), n.valAxisMajorGridlines === !0 && z(i.majorTicks, _n(n.valAxisGridlineColor, n.valAxisGridlineWidthEmu, n.valAxisGridlineDash, l, "898989", 1), !0);
	let B = (t, n) => {
		bn(e, n);
		for (let e of t) a === "vertical" ? (R(j, "floor", "x", e), R(N, "backWall", "x", e)) : (R(M, "sideWall", "y", e), R(N, "backWall", "y", e));
	};
	n.catAxisMinorGridlines === !0 && B(ge(o, s), _n(n.catAxisMinorGridlineColor, n.catAxisMinorGridlineWidthEmu, n.catAxisMinorGridlineDash, l, "E0E0E0", .5)), n.catAxisMajorGridlines === !0 && B(ve(o, s), _n(n.catAxisGridlineColor, n.catAxisGridlineWidthEmu, n.catAxisGridlineDash, l, "E0E0E0", .5));
	let V = (r, i, a) => {
		if (!r.length) return;
		let o = f(n, i, a);
		if (o.line === null) return;
		let s = o.line ?? {
			fillType: "solid",
			color: "898989"
		}, c = r.flatMap((e) => e.points), u = Math.min(...c.map((e) => e.x)), d = Math.max(...c.map((e) => e.x)), p = Math.min(...c.map((e) => e.y)), m = Math.max(...c.map((e) => e.y)), h = s.fillType === "solid" ? `#${s.color}` : X(s, e, u, p, d - u, m - p);
		if (!h) return;
		let g = o.lineWidthEmu == null ? l : Math.max(.25, o.lineWidthEmu / Y * l);
		e.strokeStyle = h, e.lineWidth = g, e.setLineDash(t(o.lineCustomDash, o.lineDash, g)), e.lineCap = o.lineCap === "rnd" ? "round" : o.lineCap === "sq" ? "square" : "butt", e.lineJoin = o.lineJoin === "round" || o.lineJoin === "bevel" ? o.lineJoin : "miter";
		for (let t of r) {
			if (t.points.length < 2) continue;
			let n = t.points.map((e, n) => ({
				start: e,
				end: t.points[(n + 1) % t.points.length]
			}));
			if (n.some((e) => k(e.start, e.end))) {
				for (let t of n) k(t.start, t.end) || (e.beginPath(), e.moveTo(t.start.x, t.start.y), e.lineTo(t.end.x, t.end.y), e.stroke());
				continue;
			}
			e.beginPath(), e.moveTo(t.points[0].x, t.points[0].y);
			for (let n = 1; n < t.points.length; n++) e.lineTo(t.points[n].x, t.points[n].y);
			e.lineTo(t.points[0].x, t.points[0].y), e.closePath(), e.stroke();
		}
	};
	V(P, n.threeD?.floor, "floor"), V(F, n.threeD?.sideWall, "wall"), V(I, n.threeD?.backWall, "wall"), e.setLineDash([]);
}
function Sn(e, t, n, r, i, a, o, s, c) {
	let l = On(t, n, r, i, a, o, c), u = c === "vertical" ? !t.catAxisHidden && !t.catAxisLineHidden : !t.valAxisHidden && !t.valAxisLineHidden, d = c === "vertical" ? !t.valAxisHidden && !t.valAxisLineHidden : !t.catAxisHidden && !t.catAxisLineHidden;
	u && (bn(e, vn(c === "vertical" ? t.catAxisLineColor : t.valAxisLineColor, c === "vertical" ? t.catAxisLineWidthEmu : t.valAxisLineWidthEmu, c === "vertical" ? t.catAxisLineDash : t.valAxisLineDash, s)), e.beginPath(), e.moveTo(l.horizontalStart.x, l.horizontalStart.y), e.lineTo(l.horizontalEnd.x, l.horizontalEnd.y), e.stroke()), d && (bn(e, vn(c === "vertical" ? t.valAxisLineColor : t.catAxisLineColor, c === "vertical" ? t.valAxisLineWidthEmu : t.catAxisLineWidthEmu, c === "vertical" ? t.valAxisLineDash : t.catAxisLineDash, s)), e.beginPath(), e.moveTo(l.verticalStart.x, l.verticalStart.y), e.lineTo(l.verticalEnd.x, l.verticalEnd.y), e.stroke()), e.setLineDash([]);
}
function Cn(e, t, n, r) {
	let i = {
		x: (e.x + t.x) / 2,
		y: (e.y + t.y) / 2
	};
	return r === "horizontal" ? {
		x: i.x <= n.x ? -1 : 1,
		y: 0
	} : {
		x: 0,
		y: i.y <= n.y ? -1 : 1
	};
}
function wn(e, t, n, r, i, a, o, s, c) {
	if (!t || t === "none") return;
	let l = Cn(r, i, a, o), u = Tn(s, c), d = t === "cross" ? u / 2 : u, f = t === "out" || t === "cross" ? d : 0, p = t === "in" || t === "cross" ? d : 0;
	e.beginPath(), e.moveTo(n.x + l.x * f, n.y + l.y * f), e.lineTo(n.x - l.x * p, n.y - l.y * p), e.stroke();
}
function Tn(e, t) {
	return (e === "minor" ? 4 : 6) * t;
}
function En(e, t, n) {
	if (e !== "out" && e !== "cross") return 0;
	let r = Tn(t, n);
	return e === "cross" ? r / 2 : r;
}
function Dn(e, t, n, r) {
	if (t) return r;
	let i = En(e, "major", n);
	return Math.max(r, i + 3 * n);
}
function On(e, t, n, r, i, a, o) {
	let { front: s } = t, c = (e) => Math.max(0, Math.min(1, e)), l = t.topology.axisX === "min" ? s.x : s.x + s.w, u = t.topology.axisY === "min" ? s.y : s.y + s.h, d = () => {
		if (e.catAxisCrossesAt != null && Number.isFinite(e.catAxisCrossesAt)) {
			let t = e.chartType.endsWith("Pct") ? e.catAxisCrossesAt * 100 : e.catAxisCrossesAt;
			return c(n.fraction(t));
		}
		let t = e.catAxisCrosses ?? "autoZero";
		return c(t === "min" ? n.fraction(n.min) : t === "max" ? n.fraction(n.max) : n.fraction(0));
	}, f = () => {
		let t = e.valAxisCrossesAt;
		if (t != null && Number.isFinite(t)) return D(t - 1, r, i, a);
		let n = e.valAxisCrosses;
		if (n !== "min" && n !== "max") return null;
		let o = +(n === "max");
		return a ? 1 - o : o;
	}, p = d(), m = f(), h = o === "horizontal" ? s.x + p * s.w : m == null ? l : s.x + m * s.w, g = o === "vertical" ? s.y + s.h - p * s.h : m == null ? u : s.y + m * s.h, _ = t.topology.nearDepth;
	return {
		axisX: h,
		axisY: g,
		depth: _,
		horizontalStart: t.project(s.x, g, _),
		horizontalEnd: t.project(s.x + s.w, g, _),
		verticalStart: t.project(h, s.y + s.h, _),
		verticalEnd: t.project(h, s.y, _)
	};
}
function kn(e, t, n, r, i, a, o, s, c, l) {
	let { front: u } = n, d = On(t, n, r, i, a, o, s), { axisX: f, axisY: p, depth: m } = d, h = n.project(u.x + u.w / 2, u.y + u.h / 2, m), g = t.valAxisMinorTickMark ?? "none", _ = c ? yn : vn;
	if (!t.valAxisHidden && !t.valAxisLineHidden) {
		bn(e, _(t.valAxisLineColor, t.valAxisLineWidthEmu, t.valAxisLineDash, l));
		let i = (e) => s === "horizontal" ? n.project(u.x + r.fraction(e) * u.w, p, m) : n.project(f, u.y + u.h - r.fraction(e) * u.h, m), a = s === "horizontal" ? d.horizontalStart : d.verticalStart, o = s === "horizontal" ? d.horizontalEnd : d.verticalEnd;
		for (let n of r.majorTicks) wn(e, t.valAxisMajorTickMark, i(n), a, o, h, s === "vertical" ? "horizontal" : "vertical", "major", l);
		for (let t of r.minorTicks) wn(e, g, i(t), a, o, h, s === "vertical" ? "horizontal" : "vertical", "minor", l);
	}
	if (!t.catAxisHidden && !t.catAxisLineHidden) {
		bn(e, _(t.catAxisLineColor, t.catAxisLineWidthEmu, t.catAxisLineDash, l));
		let r = s === "vertical" ? d.horizontalStart : d.verticalStart, g = s === "vertical" ? d.horizontalEnd : d.verticalEnd, v = Math.max(1, Math.floor(t.catAxisTickMarkSkip ?? 1)), y = (i) => {
			let a = s === "vertical" ? n.project(u.x + i * u.w, p, m) : n.project(f, u.y + i * u.h, m);
			wn(e, t.catAxisMajorTickMark, a, r, g, h, s === "vertical" ? "vertical" : "horizontal", "major", l);
		};
		if (c) {
			let e = ve(i, a);
			for (let t = 0; t < e.length; t += v) y(o ? 1 - e[t] : e[t]);
		} else for (let e = 0; e < i; e += v) y(D(e, i, a, o));
		let b = t.catAxisMinorUnit;
		if (t.catAxisMinorTickMark && t.catAxisMinorTickMark !== "none" && b != null && Number.isFinite(b) && b > 0) {
			let c = t.catAxisMajorUnit != null && Number.isFinite(t.catAxisMajorUnit) && t.catAxisMajorUnit > 0 ? t.catAxisMajorUnit : v, d = Math.min(512, Math.ceil(i / b));
			for (let _ = 1; _ < d; _++) {
				let d = _ * b;
				if (!(d < i)) break;
				if (Math.abs(d / c - Math.round(d / c)) < 1e-9) continue;
				let v = D(d, i, a, o), y = s === "vertical" ? n.project(u.x + v * u.w, p, m) : n.project(f, u.y + v * u.h, m);
				wn(e, t.catAxisMinorTickMark, y, r, g, h, s === "vertical" ? "vertical" : "horizontal", "minor", l);
			}
		}
	}
	e.setLineDash([]);
}
function An(e, n, i, a, s) {
	if (!n.threeD) return !1;
	let l = n.chartType === "clusteredBar" || n.chartType === "clusteredBarH" || n.chartType.startsWith("stackedBar"), u = n.chartType.endsWith("H") || n.chartType.includes("BarH"), d = n.chartType.startsWith("stacked"), f = l && !d && n.threeD.barGrouping === "standard", { plot: p, legend: m, legendMeasure: h } = an(e, n, i, a, u ? "horizontal" : "vertical", s), g = De(n.threeD, p, {
		sceneDepthScale: l ? f ? .65 : .1 : .4,
		perspectiveTangentGain: f ? 1 : 2,
		sceneHeightScale: !l && !(n.threeD.heightPercentAuthored ?? n.threeD.heightPercent != null) ? 1 / 3 : void 0
	});
	if (!g) return !0;
	g = ke(g, n.threeD, p);
	let _ = n.chartType.endsWith("Pct"), v = n.series.find((e) => (e.categories?.length ?? 0) > 0)?.categories ?? n.categories, y = Math.max(1, v.length, ...n.series.map((e) => e.values.length)), b = _ ? jt(n, y) : void 0, x = n.catAxisOrientation === "maxMin", S = n.catAxisCrossBetween === "between", C = n.dispBlanksAs ?? "gap", w = n.valAxisLogBase != null && Number.isFinite(n.valAxisLogBase) && n.valAxisLogBase >= 2, T = (e, t) => {
		let r = n.series[e]?.values[t];
		return r != null && Number.isFinite(r) && (!w || r > 0) || r == null && (d || C === "zero");
	}, E = (e, t) => Mt(n, e, t, b), O = 0, k = 0;
	if (d) {
		for (let e = 0; e < y; e++) {
			let t = 0, r = 0;
			for (let i = 0; i < n.series.length; i++) {
				let n = E(i, e);
				n >= 0 ? t = Nt(t, n) : r = Nt(r, n);
			}
			O = Math.min(O, r), k = Math.max(k, t);
		}
		_ && (O = O < 0 ? -100 : 0, k = k > 0 ? 100 : 0, O === 0 && k === 0 && (k = 1));
	} else {
		let e = r(n.series.flatMap((e) => e.values).filter((e) => e != null && Number.isFinite(e) && (!w || e > 0)), w ? {
			min: 1,
			max: 10
		} : {
			min: 0,
			max: 1
		});
		O = w ? e.min : Math.min(0, e.min), k = w ? e.max : Math.max(0, e.max);
	}
	let A = u ? g.project(g.front.x, g.topology.axisY === "min" ? g.front.y : g.front.y + g.front.h, g.topology.nearDepth) : g.project(g.topology.axisX === "min" ? g.front.x : g.front.x + g.front.w, g.front.y, g.topology.nearDepth), M = u ? g.project(g.front.x + g.front.w, g.topology.axisY === "min" ? g.front.y : g.front.y + g.front.h, g.topology.nearDepth) : g.project(g.topology.axisX === "min" ? g.front.x : g.front.x + g.front.w, g.front.y + g.front.h, g.topology.nearDepth), N = Math.hypot(M.x - A.x, M.y - A.y) / a, P = mn(n, O, k, N, _, u ? "horizontal" : "vertical"), F = (e) => Number.isFinite(e) ? Math.max(P.min, Math.min(P.max, e)) : P.min;
	l || xn(e, n, g, P, u ? "horizontal" : "vertical", y, S, x, a);
	let { front: I } = g, L = Math.max(1, n.series.length), B = [], V = n.series.map((e) => new Map(e.dataPointOverrides?.map((e) => [e.idx, e]) ?? [])), ee = n.series.map((e) => new Map(e.dataLabelOverrides?.map((e) => [e.idx, e]) ?? []));
	if (l) {
		let r = g.prismInterval(0, 1, !0), o = [], l = Array(y).fill(0), p = Array(y).fill(0), m = (u ? I.h : I.w) / y, h = n.barGapWidth != null && Number.isFinite(n.barGapWidth) && n.barGapWidth >= 0 ? n.barGapWidth : 150;
		for (let e = 0; e < n.series.length; e++) {
			let t = n.series[e], i = f ? g.prismInterval(e, L, !1) : r, s = Ne(m, h, f ? 0 : e, f ? 1 : L, d || f);
			for (let r = 0; r < y; r++) {
				if (!T(e, r)) continue;
				let c = E(e, r), f = Q(n, t, V[e].get(r), r, e), h = f.fill === null ? "transparent" : f.color, g = f.lineFill !== null && (f.lineColor != null || f.lineFill !== void 0), v = d ? c >= 0 ? l[r] : p[r] : 0, b = Nt(v, c);
				d && (c >= 0 ? l[r] = b : p[r] = b);
				let S = F(v), C = F(b), D = t.threeDShape ?? n.threeD.shape ?? "box", O = D === "cone" || D === "pyramid", k = D === "coneToMax" || D === "pyramidToMax", A = (e) => {
					if (!O) return 1;
					let t = w && !(v > 0) ? P.min : v, n = P.fraction(t), r = P.fraction(b), i = P.fraction(e), a = r - n;
					return a === 0 || !Number.isFinite(a) || !Number.isFinite(i - n) ? +(e === t) : Math.max(0, Math.min(1, 1 - (i - n) / a));
				}, j = (e) => {
					if (!k) return 1;
					let t = b >= v ? P.max : P.min, n = w ? P.min : 0, r = P.fraction(t), i = P.fraction(n), a = P.fraction(e), o = Math.abs(r - i);
					return !(o > 0) || ![
						r,
						i,
						a
					].every(Number.isFinite) ? Ee(e, P.min, P.max) : Math.max(0, Math.min(1, Math.abs(r - a) / o));
				}, M = k ? j(S) : A(S), N = k ? j(C) : A(C);
				if (u) {
					let t = I.x + P.fraction(S) * I.w, n = I.x + P.fraction(C) * I.w, l = x ? y - 1 - r : r, u = I.y + l * m + s.offset;
					o.push({
						x: Math.min(t, n),
						y: u,
						width: Math.abs(n - t),
						height: s.size,
						nearDepth: i.near,
						farDepth: i.far,
						categoryIndex: r,
						seriesIndex: e,
						color: h,
						fillPaint: f.fill,
						lineFill: f.lineFill,
						shape: D,
						baseCoord: t,
						endCoord: n,
						baseScale: M,
						endScale: N,
						omitBaseCap: !1,
						omitEndCap: !1,
						outline: g,
						outlineColor: f.lineColor ?? "rgba(0,0,0,0.42)",
						outlineWidth: f.lineWidthEmu == null ? .75 * a / Se : Dt(f.lineWidthEmu, a),
						outlineDash: f.lineDash ?? "solid",
						outlineCustomDash: f.lineCustomDash,
						outlineCap: f.lineCap,
						outlineJoin: f.lineJoin,
						labelValue: _ ? c / 100 : c,
						plottedLabelValue: b
					});
				} else {
					let t = I.y + I.h - P.fraction(S) * I.h, n = I.y + I.h - P.fraction(C) * I.h, l = x ? y - 1 - r : r, u = I.x + l * m + s.offset;
					o.push({
						x: u,
						y: Math.min(t, n),
						width: s.size,
						height: Math.abs(n - t),
						nearDepth: i.near,
						farDepth: i.far,
						categoryIndex: r,
						seriesIndex: e,
						color: h,
						fillPaint: f.fill,
						lineFill: f.lineFill,
						shape: D,
						baseCoord: t,
						endCoord: n,
						baseScale: M,
						endScale: N,
						omitBaseCap: !1,
						omitEndCap: !1,
						outline: g,
						outlineColor: f.lineColor ?? "rgba(0,0,0,0.42)",
						outlineWidth: f.lineWidthEmu == null ? .75 * a / Se : Dt(f.lineWidthEmu, a),
						outlineDash: f.lineDash ?? "solid",
						outlineCustomDash: f.lineCustomDash,
						outlineCap: f.lineCap,
						outlineJoin: f.lineJoin,
						labelValue: _ ? c / 100 : c,
						plottedLabelValue: b
					});
				}
			}
		}
		if (d) {
			let e = Ot(o, y);
			for (let t = 0; t < y; t++) {
				let n = e[t];
				for (let e of [-1, 1]) {
					let t = n.filter((t) => Math.sign(t.labelValue) === e && !Vt(t.color) && Math.abs(t.endCoord - t.baseCoord) > 1e-9).sort((e, t) => e.seriesIndex - t.seriesIndex);
					for (let e = 0; e + 1 < t.length; e++) {
						let n = t[e], r = t[e + 1], i = 1e-8 * Math.max(1, Math.abs(n.endCoord), Math.abs(r.baseCoord));
						n.shape !== r.shape || Math.abs(n.endCoord - r.baseCoord) > i || Math.abs(n.endScale - r.baseScale) > 1e-9 || n.nearDepth !== r.nearDepth || n.farDepth !== r.farDepth || (n.omitEndCap = !0, r.omitBaseCap = !0);
					}
				}
				let r = n.find((e) => e.labelValue > 0 && !Vt(e.color)), i = n.find((e) => e.labelValue < 0 && !Vt(e.color));
				if (r && i) {
					let e = 1e-8 * Math.max(1, Math.abs(r.baseCoord), Math.abs(i.baseCoord));
					r.shape === i.shape && Math.abs(r.baseCoord - i.baseCoord) <= e && Math.abs(r.baseScale - i.baseScale) <= 1e-9 && r.nearDepth === i.nearDepth && r.farDepth === i.farDepth && (r.omitBaseCap = !0, i.omitBaseCap = !0);
				}
			}
		}
		xn(e, n, g, P, u ? "horizontal" : "vertical", y, S, x, a);
		let v = {
			remaining: at,
			exceeded: !1
		}, b = o.map((n) => {
			let r = Wt(g, n.shape, u, n.x, n.y, n.width, n.height, n.baseCoord, n.endCoord, n.nearDepth, n.farDepth, n.color, n.baseScale, n.endScale, n.omitBaseCap, n.omitEndCap, n.outline && n.outlineColor ? {
				color: n.outlineColor,
				width: n.outlineWidth,
				dash: t(n.outlineCustomDash, n.outlineDash, n.outlineWidth),
				cap: n.outlineCap,
				join: n.outlineJoin
			} : void 0, v);
			return Yt(e, r, "fill", n.fillPaint, s), Yt(e, r, "outline", n.lineFill, s), {
				item: n,
				faces: r
			};
		}), C = b.flatMap((e) => e.faces);
		if (v.exceeded) return Xt(e, i), !0;
		for (let t of it(C)) qt(e, t);
		for (let { item: t, faces: r } of b) {
			let i = n.series[t.seriesIndex], o = V[t.seriesIndex].get(t.categoryIndex), s = ze(n, i, t.categoryIndex, t.seriesIndex), l = c(o?.chartexStyle), u = c(i.chartexStyle);
			re(e, l ?? u, j(n, "dataPoint3D", t.seriesIndex), l ? t.categoryIndex : s, a, (e) => Jt(e, r), s);
		}
		for (let t of o) {
			let r = n.series[t.seriesIndex], o = u ? g.project(t.endCoord, t.y + t.height / 2, (t.nearDepth + t.farDepth) / 2) : g.project(t.x + t.width / 2, t.endCoord, (t.nearDepth + t.farDepth) / 2), c = ee[t.seriesIndex].get(t.categoryIndex);
			rn(n, r, c) && B.push(() => nn(e, n, r, t.seriesIndex, t.categoryIndex, t.labelValue, o, i, a, 0, void 0, c, "t", o, !0, n.valAxisDisplayUnits, P.max, t.plottedLabelValue, s));
		}
	} else {
		let r = n.series.map(() => Array(y).fill(0)), o = n.series.map(() => Array(y).fill(0));
		if (d) {
			let e = Array(y).fill(0), t = Array(y).fill(0);
			for (let i = 0; i < n.series.length; i++) for (let n = 0; n < y; n++) {
				let a = E(i, n), s = a >= 0 ? e[n] : t[n];
				r[i][n] = s, o[i][n] = Nt(s, a), a >= 0 ? e[n] = Nt(e[n], a) : t[n] = Nt(t[n], a);
			}
		}
		let c = (e) => {
			let t = g.seriesDepth(e, L, d), n = 0, r = 0;
			for (let i = 0; i < y; i++) {
				if (!T(e, i)) continue;
				let a = d ? o[e][i] : E(e, i), s = I.x + D(i, y, S, x) * I.w, c = I.y + I.h - P.fraction(F(a)) * I.h;
				n += g.cameraDepth(s, c, t), r++;
			}
			return r > 0 ? n / r : -Infinity;
		}, l = n.series.map((e, t) => t).sort((e, t) => c(e) - c(t) || t - e), u = n.series.map((e, t) => Q(n, e, void 0, t, t)), f = [], p = [], m = !1;
		for (let c of l) {
			if (m) break;
			let l = n.series[c], h = u[c], v = h.fill === null ? "transparent" : h.color, b = d ? g.prismInterval(0, 1, !0) : g.prismInterval(c, L, !1), w = I.x + I.w / 2, O = I.y + I.h / 2, k = g.cameraDepth(w, O, b.near) >= g.cameraDepth(w, O, b.far) ? b.near : b.far, A = [], j = [], M = [], N = [], F = [], R = [], H = [], U = [], W = [], G = [];
			for (let e = 0; e < y; e++) {
				if (!T(c, e)) {
					A.push(null), j.push(null), M.push(null), N.push(null), F.push(null), R.push(null), H.push(null), U.push(null), W.push(null), G.push(null);
					continue;
				}
				let t = d ? o[c][e] : E(c, e), i = d ? r[c][e] : 0, a = I.x + D(e, y, S, x) * I.w, s = P.fraction(t), l = P.fraction(i), u = Number.isFinite(l) ? l : i <= P.min ? 0 : 1, f = Number.isFinite(s) && s >= 0 && s <= 1, p = Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : t <= P.min ? 0 : 1, m = I.y + I.h - p * I.h, h = I.y + I.h - Math.max(0, Math.min(1, u)) * I.h;
				A.push(n.chartType.toLowerCase().includes("area") || f ? g.project(a, m, k) : null), j.push(g.project(a, h, k)), M.push(f ? g.cameraDepth(a, m, k) : null), N.push(g.cameraDepth(a, h, k)), F.push(t), R.push(a), H.push(m), U.push(h), W.push(s), G.push(u);
			}
			let K = [], q = null;
			for (let e = 0; e < A.length; e++) {
				let t = A[e], n = j[e];
				if (!t || !n) {
					C === "gap" && (q && K.push(q), q = null);
					continue;
				}
				q ??= {
					upper: [],
					lower: [],
					upperDepths: [],
					lowerDepths: [],
					indices: [],
					sceneXs: [],
					upperYs: [],
					lowerYs: [],
					upperFractions: [],
					lowerFractions: []
				}, q.upper.push(t), q.lower.push(n), q.upperDepths.push(M[e] ?? 0), q.lowerDepths.push(N[e] ?? 0), q.indices.push(e), q.sceneXs.push(R[e] ?? 0), q.upperYs.push(H[e] ?? 0), q.lowerYs.push(U[e] ?? 0), q.upperFractions.push(W[e] ?? 0), q.lowerFractions.push(G[e] ?? 0);
			}
			q && K.push(q);
			let ne = [], re = [];
			if (n.chartType.toLowerCase().includes("area")) {
				for (let t of K) {
					let n = null;
					for (let r = 0; r + 1 < t.upper.length; r++) {
						let i = Qe(t.lowerFractions[r], t.lowerFractions[r + 1], t.upperFractions[r], t.upperFractions[r + 1]);
						for (let a = 0; a < i.length; a++) {
							let o = i[a], s = t.sceneXs[r] + (t.sceneXs[r + 1] - t.sceneXs[r]) * o.startT, c = t.sceneXs[r] + (t.sceneXs[r + 1] - t.sceneXs[r]) * o.endT, l = I.y + I.h - o.lowerStart * I.h, u = I.y + I.h - o.lowerEnd * I.h, d = I.y + I.h - o.upperStart * I.h, p = I.y + I.h - o.upperEnd * I.h, h = {
								...g.project(s, d, k),
								cameraDepth: g.cameraDepth(s, d, k),
								cameraWeight: g.cameraProjectionWeight(s, d, k)
							}, _ = {
								...g.project(c, p, k),
								cameraDepth: g.cameraDepth(c, p, k),
								cameraWeight: g.cameraProjectionWeight(c, p, k)
							};
							n != null && Math.hypot(n.at(-1).x - h.x, n.at(-1).y - h.y) <= 1e-8 ? n.push(_) : (n && n.length >= 2 && ne.push(n), n = [h, _]);
							let y = Ut(g, s, c, l, u, d, p, b.near, b.far, v, r === 0 && a === 0 && o.startT === 0, r + 2 === t.upper.length && a + 1 === i.length && o.endT === 1);
							for (let t of y) {
								if (f.length >= 1e4) {
									m = !0;
									break;
								}
								f.push({
									points: t.points,
									cameraDepth: t.cameraDepth,
									cameraDepths: t.cameraDepths,
									cameraWeights: t.cameraWeights,
									layer: 0,
									paint: () => qt(e, t)
								}), re.push(t);
							}
							if (m) break;
						}
						if (m) break;
					}
					if (n && n.length >= 2 && ne.push(n), m) break;
				}
				Yt(e, re, "fill", h.fill, s);
			}
			let ie = [];
			if (!n.chartType.toLowerCase().includes("area")) {
				let e = [], t = null;
				for (let n = 0; n < y; n++) {
					let r = F[n], i = r == null ? NaN : P.fraction(r);
					if (r == null || !Number.isFinite(i)) {
						C === "gap" && t && (e.push(t), t = null);
						continue;
					}
					t ??= [], t.push({
						x: I.x + D(n, y, S, x) * I.w,
						fraction: i,
						ownerIndex: n
					});
				}
				t && e.push(t);
				let n = (e) => {
					let t = Math.max(0, Math.min(1, e.fraction)), n = I.y + I.h - t * I.h;
					return {
						...g.project(e.x, n, k),
						cameraDepth: g.cameraDepth(e.x, n, k),
						cameraWeight: g.cameraProjectionWeight(e.x, n, k)
					};
				}, r = (e) => {
					e && e.path.length >= 2 && ie.push(e);
				};
				for (let t of e) {
					if (t.length < 2) continue;
					let e = [t[0]];
					for (let n = 0; n + 1 < t.length; n++) {
						let r = t[n - 1] ?? t[n], i = t[n], a = t[n + 1], o = t[n + 2] ?? a;
						if (l.smooth !== !0 || t.length < 3) {
							e.push(a);
							continue;
						}
						let s = {
							x: i.x + (a.x - r.x) / 6,
							fraction: i.fraction + (a.fraction - r.fraction) / 6
						}, c = {
							x: a.x - (o.x - i.x) / 6,
							fraction: a.fraction - (o.fraction - i.fraction) / 6
						};
						for (let t = 1; t <= 12; t++) {
							let n = t / 12, r = 1 - n;
							e.push({
								x: r * r * r * i.x + 3 * r * r * n * s.x + 3 * r * n * n * c.x + n * n * n * a.x,
								fraction: r * r * r * i.fraction + 3 * r * r * n * s.fraction + 3 * r * n * n * c.fraction + n * n * n * a.fraction,
								ownerIndex: a.ownerIndex
							});
						}
					}
					let i = null, a = 0;
					for (let t = 0; t + 1 < e.length; t++) {
						let o = e[t], s = e[t + 1], c = (e) => g.project(e.x, I.y + I.h - e.fraction * I.h, k), l = c(o), u = c(s), d = Math.hypot(u.x - l.x, u.y - l.y), f = Number.isFinite(d) ? d : Math.hypot(s.x - o.x, (s.fraction - o.fraction) * I.h), p = Ze(o.fraction, s.fraction);
						if (!p || p.endT - p.startT <= 1e-12) {
							r(i), i = null, a += f;
							continue;
						}
						let m = (e) => ({
							x: o.x + (s.x - o.x) * e,
							fraction: o.fraction + (s.fraction - o.fraction) * e,
							ownerIndex: s.ownerIndex
						}), h = c(m(p.startT)), _ = Math.hypot(h.x - l.x, h.y - l.y), v = n(m(p.startT)), y = n(m(p.endT)), b = m(p.startT), x = m(p.endT), S = (e) => ({
							x: e.x,
							y: I.y + I.h - Math.max(0, Math.min(1, e.fraction)) * I.h
						});
						i != null && Math.hypot(i.path.at(-1).x - v.x, i.path.at(-1).y - v.y) <= 1e-8 && i.ownerIndex === s.ownerIndex ? (i.path.push(y), i.modelPath.push(S(x)), i.endClipped = t + 1 < e.length - 1 || p.endT < 1) : (r(i), i = {
							path: [v, y],
							modelPath: [S(b), S(x)],
							ownerIndex: s.ownerIndex,
							startClipped: t > 0 || p.startT > 0,
							endClipped: t + 1 < e.length - 1 || p.endT < 1,
							dashOffset: a + (Number.isFinite(_) ? _ : f * p.startT)
						}), a += f;
					}
					r(i);
				}
			}
			let J = n.chartType.toLowerCase().includes("area"), ae = l.lineHidden != null || l.lineColor != null || l.lineWidthEmu != null || l.chartexStyle?.lineHidden != null || l.chartexStyle?.lineColors?.some(Boolean) || l.chartexStyle?.lineWidthEmu != null || l.chartexStyle?.lineDash != null || l.chartexStyle?.lineCap != null || l.chartexStyle?.lineJoin != null || h.lineColor != null || h.lineFill !== void 0;
			if (!J || h.lineFill !== null && ae) {
				let r = /* @__PURE__ */ new Map(), i = (e) => {
					let t = V[c].get(e);
					if (!It(t)) return h;
					let i = r.get(e);
					return i || (i = Q(n, l, t, e, c), r.set(e, i)), i;
				}, o = /* @__PURE__ */ new Map(), u = {
					remaining: at,
					exceeded: !1
				}, d = (n, r, i, s = i, c = 0, l) => {
					if (r.lineFill === null) return;
					let d = r === h ? v : r.color, p = r.lineColor ?? Fe(d, .7), _ = r.lineWidthEmu ? Math.max(.5, r.lineWidthEmu / Y) * a : J ? .75 * a : Math.max(1, 2 * a), y = {
						width: _,
						dash: t(r.lineCustomDash, r.lineDash, _),
						dashOffset: c,
						lineCap: r.lineCap,
						startCap: i,
						endCap: s,
						lineJoin: r.lineJoin
					};
					if (!J && l && l.length >= 2) {
						let t = pt(l.map((e) => ({
							...e,
							cameraDepth: 0,
							cameraWeight: 1
						})), y);
						if (t == null) {
							m = !0;
							return;
						}
						let n = o.get(r) ?? [];
						for (let r of t) {
							let t = Ye({
								outline: r.points,
								nearDepth: b.near,
								farDepth: b.far
							});
							if (!t) continue;
							let i = Gt(g, t, p, void 0, u).map((e) => ({
								...e,
								paintRole: "outline"
							}));
							if (u.exceeded) {
								m = !0;
								return;
							}
							n.push(...i);
							for (let t of i) f.push({
								points: t.points,
								cameraDepth: t.cameraDepth,
								cameraDepths: t.cameraDepths,
								cameraWeights: t.cameraWeights,
								layer: 1,
								paint: () => qt(e, t)
							});
						}
						o.set(r, n);
						return;
					}
					let x = pt(n, y);
					if (x == null) {
						m = !0;
						return;
					}
					if (f.length + x.length > 1e4) {
						m = !0;
						return;
					}
					for (let t of x) {
						let n = {
							points: t.points,
							color: p,
							paintRole: "outline",
							shade: 0,
							cameraDepth: t.cameraDepth,
							cameraDepths: t.cameraDepths,
							cameraWeights: t.cameraWeights,
							outline: !1
						}, i = o.get(r) ?? [];
						i.push(n), o.set(r, i), f.push({
							points: t.points,
							cameraDepth: t.cameraDepth,
							cameraDepths: t.cameraDepths,
							cameraWeights: t.cameraWeights,
							layer: 1,
							paint: () => qt(e, n)
						});
					}
				};
				if (J) for (let e of ne) d(e, h, h.lineCap);
				else for (let e of ie) {
					let t = i(e.ownerIndex);
					d(e.path, t, e.startClipped ? "butt" : t.lineCap, e.endClipped ? "butt" : t.lineCap, e.dashOffset, e.modelPath);
				}
				for (let [t, n] of o) Yt(e, n, "outline", t.lineFill, s);
			}
			let oe = (J ? l.showMarker === !0 || _e(l) : l.showMarker === !0) && l.markerSymbol !== "none";
			if ((n.chartType.toLowerCase().includes("line") || J) && (oe || z(l))) for (let t = 0; t < A.length; t++) {
				let r = A[t];
				if (!r) continue;
				let i = V[c].get(t), o = te(l, i, "circle", oe);
				if (o === "none") continue;
				let u = i?.markerSize ?? l.markerSize ?? 5, d = un(n, l, i, t, c, l.color ?? Ct[c % Ct.length], a);
				p.push(() => tn(e, r, o, Math.max(2, u) * a, d.fill === "00000000" ? "transparent" : `#${d.fill.replace(/^#/, "")}`, d.line === "00000000" ? "rgba(0,0,0,0)" : `#${d.line.replace(/^#/, "")}`, d.lineWidth, d.fillPaint, s, a, d.effectDirect, d.effectFallback, d.effectIndex, d.effectFallbackIndex, d.linePaint, d.lineDash, d.lineCustomDash, d.lineCap, d.lineJoin));
			}
			for (let t = 0; t < A.length; t++) {
				let r = A[t];
				if (!r) continue;
				let u = E(c, t), f = V[c].get(t), p = f?.markerSize ?? l.markerSize ?? 5, m = ee[c].get(t);
				rn(n, l, m) && B.push(() => nn(e, n, l, c, t, _ ? u / 100 : u, r, i, a, l.showMarker === !0 || f?.markerSymbol != null ? p * a / 2 : 0, void 0, m, "t", r, !0, n.valAxisDisplayUnits, P.max, d ? o[c][t] : u, s));
			}
		}
		if (m) return Xt(e, i), !0;
		for (let e of it(f)) e.paint();
		for (let e of p) e();
	}
	Sn(e, n, g, P, y, S, x, a, u ? "horizontal" : "vertical"), kn(e, n, g, P, y, S, x, u ? "horizontal" : "vertical", l, a), ln(e, n, i, g, P, y, S, x, u ? "horizontal" : "vertical", l, a);
	let H = On(n, g, P, y, S, x, u ? "horizontal" : "vertical"), U = (e, t) => {
		if (t !== "low" && t !== "high") return H;
		let n = g.topology.nearDepth, r = H.axisX, i = H.axisY;
		if (e === "value" === u) {
			let e = I.y, r = I.y + I.h, a = g.project(I.x + I.w / 2, e, n), o = g.project(I.x + I.w / 2, r, n), s = a.y >= o.y ? e : r;
			i = t === "low" ? s : s === e ? r : e;
		} else {
			let e = I.x, i = I.x + I.w, a = g.project(e, I.y + I.h / 2, n), o = g.project(i, I.y + I.h / 2, n), s = a.x <= o.x ? e : i;
			r = t === "low" ? s : s === e ? i : e;
		}
		return {
			axisX: r,
			axisY: i,
			depth: n,
			horizontalStart: g.project(I.x, i, n),
			horizontalEnd: g.project(I.x + I.w, i, n),
			verticalStart: g.project(r, I.y + I.h, n),
			verticalEnd: g.project(r, I.y, n)
		};
	}, W = U("value", n.valAxisTickLabelPos), G = U("category", n.catAxisTickLabelPos), q = le(n.valAxisFontSizeHpt, a) ?? 9 * a;
	if (e.font = `${n.valAxisFontItalic ? "italic " : ""}${n.valAxisFontBold ? "bold " : ""}${q}px ${zt(n, n.valAxisFontFace)}`, e.fillStyle = n.valAxisFontColor ? `#${n.valAxisFontColor}` : "#595959", e.textAlign = u ? "center" : "right", e.textBaseline = u ? "top" : "middle", !n.valAxisHidden && n.valAxisTickLabelPos !== "none") {
		let { axisX: t, axisY: r, depth: i } = W, o = g.project(I.x + I.w / 2, I.y + I.h / 2, i), s = Cn(u ? W.horizontalStart : W.verticalStart, u ? W.horizontalEnd : W.verticalEnd, o, u ? "vertical" : "horizontal");
		e.textAlign = Math.abs(s.x) < .2 ? "center" : s.x < 0 ? "right" : "left", e.textBaseline = Math.abs(s.y) < .2 ? "middle" : s.y < 0 ? "bottom" : "top";
		let c = Dn(n.valAxisMajorTickMark, n.valAxisLineHidden, a, 5), l = n.valAxisDisplayUnits?.divisor;
		for (let a of P.majorTicks) {
			let o = u ? g.project(I.x + P.fraction(a) * I.w, r, i) : g.project(t, I.y + I.h - P.fraction(a) * I.h, i);
			R(e, Ce(_ ? a / 100 : l != null && Number.isFinite(l) && l > 0 ? a / l : a, _ ? n.valAxisFormatCode ?? "0%" : n.valAxisFormatCode, n.date1904, n.valAxisFormatDivisors), o.x + s.x * c, o.y + s.y * c, K(q));
		}
	}
	let ne = le(n.catAxisFontSizeHpt, a) ?? 9 * a;
	if (e.font = `${n.catAxisFontItalic ? "italic " : ""}${n.catAxisFontBold ? "bold " : ""}${ne}px ${zt(n, n.catAxisFontFace)}`, e.fillStyle = n.catAxisFontColor ? `#${n.catAxisFontColor}` : "#595959", !n.catAxisHidden && n.catAxisTickLabelPos !== "none") {
		let t = o(Dn(n.catAxisMajorTickMark, n.catAxisLineHidden, a, 6), n.catAxisLabelOffsetPercent), r = Array.from({ length: y }, (e, t) => we(String(v[t] ?? t + 1), n.catAxisFormatCode, n.date1904, n.catAxisFormatDivisors)), i = Zt(n);
		if (i == null && (i = 0, !u && y > 1)) {
			let t = Infinity, n = null, a = G.axisY;
			for (let e = 0; e < y; e++) {
				let r = D(e, y, S, x), i = g.project(I.x + r * I.w, a, g.topology.nearDepth);
				n && (t = Math.min(t, Math.hypot(i.x - n.x, i.y - n.y))), n = i;
			}
			Math.max(0, ...r.map((t) => be(e, t))) > t * .9 && (i = -Math.PI / 4);
		}
		let s = Math.max(1, Math.floor(n.catAxisTickLabelSkip ?? 1));
		for (let n = 0; n < y; n += s) {
			let a = D(n, y, S, x), { axisX: o, axisY: s, depth: c } = G, l = u ? g.project(o, I.y + D(n, y, S, x) * I.h, c) : g.project(I.x + a * I.w, s, c);
			if (u) {
				let i = g.project(o, I.y + I.h / 2, c), a = g.project(I.x + I.w / 2, I.y + I.h / 2, c), s = i.x <= a.x;
				e.textAlign = s ? "right" : "left", e.textBaseline = "middle", R(e, r[n], l.x + (s ? -t : t), l.y, K(ne));
			} else {
				let a = g.project(I.x + I.w / 2, I.y + I.h / 2, c), o = Cn(G.horizontalStart, G.horizontalEnd, a, "vertical");
				en(e, r[n], l, i, u, o.y < 0 ? -1 : 1, t, K(ne));
			}
		}
	}
	cn(e, n, i, p, u, a);
	for (let e of B) e();
	return pn(e, n, m, a, !1, h, s), !0;
}
function jn(e, n, r, i, a) {
	if (!n.threeD || n.chartType !== "pie") return !1;
	let o = n.series[0];
	if (!o) return !0;
	let s = o.values.flatMap((e, t) => e != null && Number.isFinite(e) ? [{
		index: t,
		value: Math.abs(e)
	}] : []), l = 0;
	for (let e of s) l = Math.max(l, e.value);
	if (!(l > 0)) return !0;
	let u = s.reduce((e, t) => e + t.value / l, 0);
	if (!(u > 0) || !Number.isFinite(u)) return !0;
	let { plot: d, legend: f, legendMeasure: p } = an(e, n, r, i, "radial", a), m = De({
		...n.threeD,
		rotationY: n.threeD.rotationY ?? 0,
		heightPercent: void 0,
		depthPercent: 100
	}, d, {
		sceneDepthScale: 1,
		sceneHeightScale: .15
	});
	if (!m) return !0;
	let h = new Map(o.dataPointOverrides?.map((e) => [e.idx, e]) ?? []), g = 0;
	for (let e of h.values()) e.explosion != null && Number.isFinite(e.explosion) && (g = Math.max(g, Math.max(0, Math.min(100, e.explosion)) / 100));
	let { scene: _ } = m, v = Math.min(_.w * .45 / (1 + g), m.modelDepth * .45 / (1 + g), _.h / .45);
	if (!(v > 0)) return !0;
	let y = _.x + _.w / 2, b = _.y + _.h / 2, x = .5, S = v * .3 * Me(n.threeD), C = 0, w = [], T = new Map(o.dataLabelOverrides?.map((e) => [e.idx, e]) ?? []), D = Math.max(48, Math.min(128, Math.ceil(Math.PI * 2 * v / 4)));
	for (let e of s) {
		let t = e.value / l / u, r = hn(n.firstSliceAngle, C, t), i = h.get(e.index), a = Q(n, o, i, e.index, 0), s = r.middle, c = i?.explosion != null && Number.isFinite(i.explosion) ? Math.max(0, Math.min(100, i.explosion)) / 100 : 0, d = y + Math.cos(s) * v * c, f = x + Math.sin(s) * v * c / m.modelDepth, p = Math.max(2, Math.ceil(D * t)), g = Xe({
			centerX: d,
			centerY: b,
			centerDepth: f,
			radius: v,
			modelDepth: m.modelDepth,
			thickness: S,
			startAngle: r.start,
			endAngle: r.end,
			segments: p
		});
		if (!g) {
			C += t;
			continue;
		}
		w.push({
			index: e.index,
			start: r.start,
			end: r.end,
			color: a.fill === null ? "transparent" : a.color,
			fillPaint: a.fill,
			value: e.value,
			percentValue: t,
			centerX: d,
			centerDepth: f,
			segments: p,
			mesh: g,
			lineColor: a.lineColor,
			lineFill: a.lineFill,
			lineWidthEmu: a.lineWidthEmu ?? null,
			lineDash: a.lineDash ?? "solid",
			lineCustomDash: a.lineCustomDash,
			lineCap: a.lineCap,
			lineJoin: a.lineJoin
		}), C += t;
	}
	m = Pe(m, w.flatMap((e) => e.mesh.vertices), d, .08);
	let O = [], k = {
		remaining: at,
		exceeded: !1
	}, A = (e) => {
		let n = e.lineWidthEmu == null ? .75 * i : Math.max(.25, e.lineWidthEmu / Y * i);
		return e.lineFill !== null && (e.lineColor != null || e.lineFill !== void 0) ? {
			color: e.lineColor ?? "rgba(0,0,0,0.42)",
			width: n,
			dash: t(e.lineCustomDash, e.lineDash, n),
			cap: e.lineCap,
			join: e.lineJoin
		} : void 0;
	}, M = w.map((t) => {
		let n = Gt(m, t.mesh, t.color, void 0, k);
		return Yt(e, n, "fill", t.fillPaint, a), {
			slice: t,
			faces: n
		};
	}), N = M.flatMap((e) => e.faces), P = [], F = w.map(A), I = F[0], L = (e) => e == null ? null : [
		e.color,
		e.width,
		e.dash.join(","),
		e.cap,
		e.join
	].join("|"), R = I != null && w.every((e) => e.lineFill === void 0) && F.every((e) => L(e) === L(I)) && w.every((e) => Math.abs(e.centerX - y) < 1e-9 && Math.abs(e.centerDepth - x) < 1e-9);
	if (R) P.push(...Kt(m, w, b, v, S, I, k));
	else for (let t = 0; t < w.length; t++) {
		let n = F[t];
		if (!n) continue;
		let r = Gt(m, w[t].mesh, "transparent", n, k, !0);
		Yt(e, r, "outline", w[t].lineFill, a), P.push(...r);
	}
	if (k.exceeded) return Xt(e, r), !0;
	if (R) {
		for (let t of it(N)) qt(e, t);
		for (let t of it(P)) qt(e, t);
	} else for (let t of it([...N, ...P])) qt(e, t);
	for (let { slice: t, faces: r } of M) {
		let a = h.get(t.index), s = ze(n, o, t.index, 0), l = c(a?.chartexStyle);
		re(e, l ?? c(o.chartexStyle), j(n, "dataPoint3D", 0), l ? t.index : s, i, (e) => Jt(e, r), s);
	}
	for (let t of w) {
		let r = (t.start + t.end) / 2, s = T.get(t.index);
		if (rn(n, o, s)) {
			let c = o.seriesDataLabels, l = le(s?.fontSizeHpt ?? c?.fontSizeHpt ?? n.dataLabelFontSizeHpt, i) ?? 9 * i;
			e.font = `${s?.fontBold ?? c?.fontBold ?? n.dataLabelFontBold ? "bold " : ""}${l}px ${$(n, s?.fontFace ?? c?.fontFace ?? n.dataLabelFontFace)}`;
			let u = E({
				customText: s?.text,
				showCategory: s?.showCatName ?? c?.showCatName ?? !1,
				showSeries: s?.showSerName ?? c?.showSerName ?? !1,
				showValue: s?.showVal ?? c?.showVal ?? n.showDataLabels,
				showPercent: s?.showPercent ?? c?.showPercent ?? !1,
				category: o.categories?.[t.index] ?? n.categories[t.index] ?? `${t.index + 1}`,
				seriesName: o.name || "Series 1",
				sourceValue: t.value,
				percentRatio: t.percentValue,
				formatCode: s?.formatCode ?? c?.formatCode ?? n.dataLabelFormatCode ?? o.valFormatCode,
				formatDivisors: s?.formatCode == null ? c?.formatDivisors : null,
				percentFormatCode: s?.formatCode ?? c?.percentFormatCode,
				percentFormatDivisors: s?.formatCode == null ? c?.percentFormatDivisors : null,
				separator: s?.separator ?? c?.separator,
				date1904: n.date1904
			}), f = $(n, s?.fontFace ?? c?.fontFace ?? n.dataLabelFontFace), p = s?.text && s.richRuns?.length ? Le(e, {
				runs: s.richRuns,
				ptToPx: i,
				fontFamily: f,
				fallbackBold: s.fontBold ?? c?.fontBold ?? n.dataLabelFontBold ?? !1,
				fontFamilyForFace: (e) => $(n, e)
			}, l, `#${s.fontColor ?? c?.fontColor ?? o.labelColor ?? n.dataLabelFontColor ?? "111111"}`) : null, h = s?.position ?? c?.position ?? n.dataLabelPosition, g = b - S / 2, _ = b + S / 2, y = m.cameraDepth(t.centerX, g, t.centerDepth) >= m.cameraDepth(t.centerX, _, t.centerDepth) ? g : _, x = 0, C = null;
			for (let e = 0; e <= 12; e++) {
				let n = t.start + (t.end - t.start) * e / 12, r = m.project(t.centerX + Math.cos(n) * v * .64, y, t.centerDepth + Math.sin(n) * v * .64 / m.modelDepth);
				C && (x += Math.hypot(r.x - C.x, r.y - C.y)), C = r;
			}
			let w = (h == null || h === "bestFit") && (t.percentValue === 0 || x < (p?.width ?? e.measureText(u).width)) || h === "outEnd", T = v * (w ? 1.12 : .64), D = m.project(t.centerX + Math.cos(r) * T, y, t.centerDepth + Math.sin(r) * T / m.modelDepth), k = m.project(t.centerX + Math.cos(r) * v, y, t.centerDepth + Math.sin(r) * v / m.modelDepth);
			O.push(() => nn(e, n, o, 0, t.index, t.value, D, d, i, 0, t.percentValue, s, "ctr", k, w, void 0, void 0, void 0, a));
		}
	}
	for (let e of O) e();
	let z = o.categories?.length ? o.categories : n.categories, B = Array.from({ length: z.length }, (e, t) => {
		let r = h.get(t), i = Be(n, o, r, t, 0);
		if (i === null) return "00000000";
		let a = i?.fillType === "solid" ? i.color : r?.color ?? o.dataPointColors?.[t] ?? o.color;
		return a === "00000000" ? "00000000" : Fe(a ? `#${a}` : kt(t), .8).replace(/^#/, "");
	});
	return pn(e, {
		...n,
		categories: z,
		series: [{
			...o,
			categories: z,
			dataPointColors: B
		}]
	}, f, i, !0, p, a), !0;
}
function Mn(e, t, n, r, i = 0) {
	return !t.threeD || !(t.chartType === "pie" || Et.has(t.chartType)) ? !1 : Pt(t) ? jn(e, t, n, r, i) ? !0 : An(e, t, n, r, i) : (Xt(e, n), !0);
}
var Nn = Re({ render: Mn }, "threeD");
export { Nn as threeD };
