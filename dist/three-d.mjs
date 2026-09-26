import { $ as e, $n as t, $t as n, An as r, B as i, Bn as a, Cn as o, D as s, Dn as c, En as l, Gt as u, H as d, Hn as f, In as p, Kt as m, Ln as h, Mn as g, O as _, Pn as v, Qn as y, Rn as b, Tn as x, Un as S, V as C, W as w, Wn as T, Xn as E, Yt as D, Zn as O, _n as k, ar as A, bn as j, dn as M, dr as N, er as P, et as F, fn as I, gn as L, gt as R, hn as z, i as B, ir as V, jn as H, m as ee, mn as U, pn as te, pr as W, qt as G, rr as K, sr as q, t as J, tt as ne, u as Y, ur as re, vn as ie, vt as ae, wn as oe, xn as se, yt as ce, z as le } from "./plot-area-frame-DJnay5Wh.js";
import { a as ue, r as X } from "./units-EJdC96r6.js";
import { T as de, a as fe, c as pe, h as me, i as he, m as ge, n as _e, o as ve, p as ye, r as be, s as xe, t as Se, u as Ce, w as we, y as Te } from "./three-d-DYlBMsPE.js";
import { t as Ee } from "./renderer-module-contract-D4NrNIR1.js";
//#region packages/core/src/chart/three-d-datum-style.ts
function De(e, t, n, r) {
	return re(e, r) ? n : t.chartexFormatIdx ?? r;
}
function Oe(e, t, n, r, i) {
	let a = De(e, t, r, i), o = q(e, "dataPoint3D", i), s = W(e, "dataPoint3D"), c = E(n?.chartexStyle, s, r);
	if (c !== void 0) return c;
	if (n?.fillHidden === !0) {
		let e = y(s);
		if (e !== void 0) return e;
	}
	if (n?.color === "00000000") return null;
	if (n?.color) return {
		fillType: "solid",
		color: n.color
	};
	let l = E(t.chartexStyle, s, a);
	return l === void 0 ? P(o, s, a, n?.chartexStyle, t.chartexStyle) : l;
}
function ke(e) {
	switch (e) {
		case "cylinder":
		case "cone":
		case "coneToMax":
		case "pyramid":
		case "pyramidToMax": return e;
		default: return "box";
	}
}
var Ae = (e) => Math.max(0, Math.min(1, e));
function je(e, t) {
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
function Me(e, t) {
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
		let r = je(e, t.indices);
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
function Ne(e) {
	let { horizontal: t, crossStart: n, crossSize: r, baseCoord: i, endCoord: a, nearDepth: o, farDepth: s } = e;
	if (![
		n,
		r,
		i,
		a,
		o,
		s
	].every(Number.isFinite) || r <= 0 || i === a || o === s) return null;
	let c = ke(e.shape), l = c === "cylinder" || c === "cone" || c === "coneToMax", u = c !== "box" && c !== "cylinder", d = c === "coneToMax" || c === "pyramidToMax", f = l ? Math.max(8, Math.min(64, Math.trunc(e.roundSegments ?? 32))) : 4, p = Ae(e.baseScale ?? (d ? e.toMaxBaseScale ?? 1 : 1)), m = Ae(e.endScale ?? (u ? d ? e.toMaxEndScale ?? 0 : 0 : 1));
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
		faces: Me(y, w),
		silhouetteEdges: T
	};
}
function Pe(e) {
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
		faces: Me(_, [
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
function Fe(e) {
	let t = e.upper0 - e.lower0, n = e.upper1 - e.lower1;
	if (Number.isFinite(t) && Number.isFinite(n) && t * n < 0) {
		let r = t / (t - n), i = e.x0 + (e.x1 - e.x0) * r, a = e.lower0 + (e.lower1 - e.lower0) * r;
		return [Pe({
			...e,
			x1: i,
			lower1: a,
			upper1: a,
			capEnd: !1
		}), Pe({
			...e,
			x0: i,
			lower0: a,
			upper0: a,
			capStart: !1
		})].filter((e) => e != null);
	}
	let r = Pe(e);
	return r ? [r] : [];
}
function Ie(e) {
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
		faces: Me(a, [
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
function Le(e) {
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
	let l = Math.min(Math.PI * 2, c - s), u = l >= Math.PI * 2 - 1e-9, d = Math.max(2, Math.min(128, Math.trunc(e.segments ?? Math.ceil(32 * l / (Math.PI * 2))))), f = n - o / 2, p = n + o / 2, m = [{
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
		faces: Me(m, v),
		silhouetteEdges: h.slice(0, u ? void 0 : -1).map((e, t) => [e, g[t]])
	};
}
//#endregion
//#region packages/core/src/chart/three-d-scene.ts
function Re(e, t) {
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
function ze(e, t, n, r) {
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
var Be = (e) => ({
	minX: Math.min(...e.map((e) => e.x)),
	maxX: Math.max(...e.map((e) => e.x)),
	minY: Math.min(...e.map((e) => e.y)),
	maxY: Math.max(...e.map((e) => e.y))
}), Ve = (e, t) => {
	let n = !1;
	for (let r = 0, i = e.length - 1; r < e.length; i = r++) {
		let a = e[r], o = e[i], s = (a.x - t.x) * (o.y - t.y) - (a.y - t.y) * (o.x - t.x), c = Math.max(1, Math.abs(a.x), Math.abs(a.y), Math.abs(o.x), Math.abs(o.y));
		if (Math.abs(s) <= c * 1e-9 && t.x >= Math.min(a.x, o.x) - 1e-9 && t.x <= Math.max(a.x, o.x) + 1e-9 && t.y >= Math.min(a.y, o.y) - 1e-9 && t.y <= Math.max(a.y, o.y) + 1e-9) return !0;
		a.y > t.y != o.y > t.y && t.x < (o.x - a.x) * (t.y - a.y) / (o.y - a.y) + a.x && (n = !n);
	}
	return n;
}, He = (e, t, n, r) => {
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
function Ue(e, t, n, r) {
	let i = [], a = (e) => {
		i.length >= 12 || i.some((t) => Math.hypot(t.x - e.x, t.y - e.y) < 1e-7) || i.push(e);
	}, o = {
		x: (Math.max(n.minX, r.minX) + Math.min(n.maxX, r.maxX)) / 2,
		y: (Math.max(n.minY, r.minY) + Math.min(n.maxY, r.maxY)) / 2
	};
	Ve(e, o) && Ve(t, o) && a(o);
	for (let n of e) Ve(t, n) && a(n);
	for (let n of t) Ve(e, n) && a(n);
	for (let n = 0; n < e.length && i.length < 12; n++) for (let r = 0; r < t.length && i.length < 12; r++) {
		let i = He(e[n], e[(n + 1) % e.length], t[r], t[(r + 1) % t.length]);
		i && a(i);
	}
	return i;
}
function We(e, t) {
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
function Ge(e) {
	if (e.length < 2) return [...e];
	let t = [...e.keys()].sort((t, n) => e[t].cameraDepth - e[n].cameraDepth || t - n), n = e.map((e) => Be(e.points)), r = [...e.keys()].sort((e, t) => n[e].minX - n[t].minX || e - t), i = e.map(() => /* @__PURE__ */ new Set()), a = e.map(() => 0), o = [], s = 0;
	for (let c of r) {
		for (let e = o.length - 1; e >= 0; e--) n[o[e]].maxX < n[c].minX - 1e-9 && o.splice(e, 1);
		for (let r of o) {
			if (++s > 2e5) return t.map((t) => e[t]);
			if (n[r].maxY < n[c].minY - 1e-9 || n[c].maxY < n[r].minY - 1e-9) continue;
			let o = Ue(e[r].points, e[c].points, n[r], n[c]), l = 0;
			for (let t of o) {
				let n = We(e[r], t) - We(e[c], t), i = 1e-8 * Math.max(1, Math.abs(e[r].cameraDepth), Math.abs(e[c].cameraDepth));
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
//#endregion
//#region packages/core/src/chart/three-d-stroke.ts
var Z = 1e-9, Ke = 1e4, qe = (e, t, n) => ({
	x: e.x + (t.x - e.x) * n,
	y: e.y + (t.y - e.y) * n,
	cameraDepth: e.cameraDepth + (t.cameraDepth - e.cameraDepth) * n,
	cameraWeight: (e.cameraWeight ?? 1) + ((t.cameraWeight ?? 1) - (e.cameraWeight ?? 1)) * n
}), Je = (e, t) => Math.hypot(e.x - t.x, e.y - t.y) <= Z;
function Ye(e, t, n = 0) {
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
			let e = Math.min(o, l - d), t = qe(n, c, d / l), f = qe(n, c, (d + e) / l);
			if (s && (u ??= [], (u.length === 0 || !Je(u.at(-1), t)) && u.push(t), u.push(f)), d += e, o -= e, o <= Z) {
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
	if (i.length > 1 && Je(e[0], e.at(-1)) && Je(i[0][0], e[0]) && Je(i.at(-1).at(-1), e.at(-1))) {
		let e = i.shift(), t = i.pop();
		i.unshift([...t, ...e.slice(1)]);
	}
	return i;
}
var Xe = (e, t) => ({
	kind: e,
	points: t.map(({ x: e, y: t }) => ({
		x: e,
		y: t
	})),
	cameraDepths: t.map((e) => e.cameraDepth),
	cameraWeights: t.map((e) => e.cameraWeight ?? 1),
	cameraDepth: t.reduce((e, t) => e + t.cameraDepth, 0) / t.length
}), Ze = (e, t, n) => {
	let r = [];
	for (let n = 0; n < 12; n++) {
		let i = Math.PI * 2 * n / 12;
		r.push({
			...e,
			x: e.x + Math.cos(i) * t,
			y: e.y + Math.sin(i) * t
		});
	}
	return Xe(n, r);
};
function Qe(e, t, n) {
	let r = Number.isFinite(n.width) ? Math.max(0, n.width) : 0;
	if (!(r > Z) || t.length < 3) return null;
	let i = r / 2;
	if ((n.lineJoin ?? "miter") === "round") return Ze(e, i, "join");
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
	return l.length >= 3 ? Xe("join", l) : null;
}
var $e = (e, t, n, r) => {
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
function et(e, t) {
	let n = Number.isFinite(t.width) ? Math.max(0, t.width) : 0;
	if (!(n > Z) || e.length < 2) return [];
	let r = n / 2, i = t.lineCap ?? "butt", a = t.lineJoin ?? "miter", o = Math.max(1, t.miterLimit ?? 10), s = [], c = Ye(e, t.dash ?? [], t.dashOffset);
	if (c == null) return null;
	let l = (e) => s.length >= 1e4 ? !1 : (s.push(e), !0);
	for (let n = 0; n < c.length; n++) {
		let s = c[n], u = s.length > 2 && Je(s[0], s.at(-1)), d = n === 0 && Je(s[0], e[0]) ? t.startCap ?? i : i, f = n + 1 === c.length && Je(s.at(-1), e.at(-1)) ? t.endCap ?? i : i, p = [];
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
			if (!l(Xe("segment", [
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
		if (!u && d === "round" && !l(Ze(s[0], r, "cap")) || !u && f === "round" && !l(Ze(s.at(-1), r, "cap"))) return null;
		let m = (e, t, n) => {
			if (!t || !n) return !0;
			let i = t.x * n.y - t.y * n.x;
			if (Math.abs(i) <= Z) return !0;
			if (a === "round") return l(Ze(e, r, "join"));
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
				let i = $e(c, t, u, n);
				if (i && Math.hypot(i.x - e.x, i.y - e.y) <= r * o) return !!l(Xe("join", [
					c,
					{
						...e,
						...i
					},
					u
				]));
			}
			return l(Xe("join", [
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
//#endregion
//#region packages/core/src/chart/three-d-outline.ts
var tt = 1e-9, nt = (e, t) => Math.hypot(e.x - t.x, e.y - t.y, e.depth - t.depth) <= tt, rt = (e, t) => e.x - t.x || e.y - t.y || e.depth - t.depth, it = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = rt(e[r], t[r]);
		if (n !== 0) return n;
	}
	return e.length - t.length;
};
function at(e) {
	let t = [...e].reverse();
	return it(e, t) <= 0 ? e : t;
}
function ot(e) {
	let t = nt(e[0], e.at(-1)) ? e.slice(0, -1) : [...e];
	if (t.length === 0) return [];
	let n = 0;
	for (let e = 1; e < t.length; e++) rt(t[e], t[n]) < 0 && (n = e);
	let r = t.map((e, r) => t[(n + r) % t.length]), i = t.map((e, r) => t[(n - r + t.length) % t.length]), a = it(r, i) <= 0 ? r : i;
	return [...a, a[0]];
}
function st(e) {
	let t = [], n = (e) => {
		let n = t.find((t) => nt(t.point, e));
		if (n) return rt(e, n.point) < 0 && (n.point = e), n;
		let r = {
			point: e,
			edges: [],
			order: -1
		};
		return t.push(r), r;
	}, r = [];
	for (let [t, i] of e) {
		if (nt(t, i)) continue;
		let e = n(t), a = n(i);
		e !== a && r.push([e, a]);
	}
	t.sort((e, t) => rt(e.point, t.point)), t.forEach((e, t) => {
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
	for (let e of t) if (e.edges.length !== 2) for (let t of e.edges) o.has(t) || c.push(at(s(e, t)));
	for (let e = 0; e < i.length; e++) {
		if (o.has(e)) continue;
		let t = i[e], n = t.first.order <= t.second.order ? t.first : t.second;
		c.push(ot(s(n, e)));
	}
	let l = t.filter((e) => e.edges.length > 2).map((e) => ({
		point: e.point,
		neighbours: e.edges.map((t) => {
			let n = i[t];
			return n.first === e ? n.second.point : n.first.point;
		}).sort(rt)
	}));
	return {
		paths: c.sort(it),
		junctions: l
	};
}
//#endregion
//#region packages/core/src/chart/three-d-renderer.ts
function ct(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.legendEntries ?? []) t.set(n.idx, n);
	return t;
}
function lt(e, t, n) {
	let r = v(t?.fontSizeHpt ?? e.legendFontSizeHpt, n) ?? 9 * n, i = t?.fontFace ?? e.legendFontFace, a = t?.fontBold ?? e.legendFontBold ?? !1;
	return {
		fontPx: r,
		font: `${t?.fontItalic ?? e.legendFontItalic ?? !1 ? "italic " : ""}${a ? "bold " : ""}${r}px ${Tt(i)}`,
		color: t?.fontColor ? `#${t.fontColor}` : e.legendFontColor ? `#${e.legendFontColor}` : "#595959"
	};
}
var ut = [
	"4472C4",
	"ED7D31",
	"70AD47",
	"A5A5A5",
	"FFC000",
	"5B9BD5"
], dt = _, ft = s, pt = new Set([
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
function mt(e, t) {
	let n = Number.isFinite(t) && t > 0 ? t / ue : 1, r = Number.isFinite(e) && e >= 0 ? e / X : 0;
	return Math.max(.25, r) * n;
}
function ht(e, t) {
	let n = Number.isSafeInteger(t) && t > 0 ? t : 0, r = Array.from({ length: n }, () => []);
	for (let t of e) {
		let e = t.categoryIndex;
		Number.isSafeInteger(e) && e >= 0 && e < n && r[e].push(t);
	}
	return r;
}
var gt = (e, t) => `#${t?.color ?? ut[e % ut.length]}`;
function _t(e, t, n) {
	let r = 0;
	for (let i of e) for (let e of [t(i), n(i)]) {
		if (e == null) continue;
		let t = D(e);
		if (e.fillType === "gradient" && t > dt || t > ft - r) return !1;
		r += t;
	}
	return !0;
}
function vt(e, t) {
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
function yt(e, t, n, r) {
	let i = e.series[t]?.values[n] ?? 0;
	if (!Number.isFinite(i)) return 0;
	if (!r) return i;
	let { maxMagnitude: a, scaledTotal: o } = r[n] ?? {
		maxMagnitude: 0,
		scaledTotal: 0
	};
	return a > 0 && o > 0 ? i / a / o * 100 : 0;
}
function bt(e, t) {
	let n = e + t;
	return Number.isFinite(n) ? n : t < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
}
function xt(e) {
	let t = [];
	for (let [n, r] of [
		[e.threeD?.floor, "floor"],
		[e.threeD?.sideWall, "wall"],
		[e.threeD?.backWall, "wall"]
	]) {
		let i = A(e, n, r);
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
		let n = e.chartType.startsWith("stacked"), r = e.chartType.endsWith("Pct"), i = n || e.dispBlanksAs === "zero", a = e.valAxisLogBase != null && Number.isFinite(e.valAxisLogBase) && e.valAxisLogBase >= 2, o = Math.max(1, e.categories.length, ...e.series.map((e) => Math.max(e.values.length, e.categories?.length ?? 0))), s = r ? vt(e, o) : void 0, c = (t, n) => {
			if (t === n) return !1;
			let r = Math.min(t, n), i = Math.max(t, n), o = e.valMin, s = e.valMax;
			return o != null && Number.isFinite(o) && i <= o || s != null && Number.isFinite(s) && r >= s ? !1 : !a || i > 0;
		}, l = Array(o).fill(0), u = Array(o).fill(0);
		for (let r = 0; r < e.series.length; r++) {
			let d = e.series[r], f = new Map(d.dataPointOverrides?.map((e) => [e.idx, e]) ?? []);
			for (let p = 0; p < o; p++) {
				let o = d.values[p];
				if (!(o != null && Number.isFinite(o) && (!a || o > 0) || o == null && i)) continue;
				let m = yt(e, r, p, s), h = n ? m >= 0 ? l[p] : u[p] : 0, g = bt(h, m);
				if (n && (m >= 0 ? l[p] = g : u[p] = g), !c(h, g)) continue;
				let _ = Q(e, d, f.get(p), p, r);
				t.push({
					fill: _.fill,
					line: _.lineFill
				});
			}
		}
	} else {
		let n = e.chartType.toLowerCase().includes("area"), r = e.chartType.startsWith("stacked"), i = e.chartType.endsWith("Pct"), a = r || e.dispBlanksAs === "zero", o = e.valAxisLogBase != null && Number.isFinite(e.valAxisLogBase) && e.valAxisLogBase >= 2, s = Math.max(e.categories.length, ...e.series.map((e) => Math.max(e.categories?.length ?? 0, e.values.length))), c = i ? vt(e, s) : void 0, l = e.series.map(() => Array(s).fill(0));
		if (r) {
			let t = Array(s).fill(0), n = Array(s).fill(0);
			for (let r = 0; r < e.series.length; r++) for (let i = 0; i < s; i++) {
				let a = yt(e, r, i, c), o = bt(a >= 0 ? t[i] : n[i], a);
				l[r][i] = o, a >= 0 ? t[i] = o : n[i] = o;
			}
		}
		for (let i = 0; i < e.series.length; i++) {
			let u = e.series[i], d = new Map(u.dataPointOverrides?.map((e) => [e.idx, e]) ?? []), f = s, p = 0, m = null, h = !1, g = !1;
			for (let s = 0; s < f; s++) {
				let f = u.values[s];
				if (f != null && Number.isFinite(f) && (!o || f > 0) || f == null && a) {
					p++;
					let a = r ? l[i][s] : yt(e, i, s, c), o = m == null ? a : Math.min(m, a), f = m == null ? a : Math.max(m, a), _ = e.valMin != null && Number.isFinite(e.valMin) && f <= e.valMin || e.valMax != null && Number.isFinite(e.valMax) && o >= e.valMax;
					if (p >= 2 && (n || u.smooth === !0 || !_)) {
						if (h = !0, n) break;
						let r = d.get(s);
						if (Ct(r)) {
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
	return _t(t, (e) => e.fill, (e) => e.line);
}
function St(e, t) {
	return e?.fillType === "solid" ? {
		color: `#${e.color}`,
		fill: void 0
	} : {
		color: t,
		fill: e
	};
}
function Q(e, n, r, i, a, o = !0) {
	let s = o && n.dataPointColors?.[i] ? `#${n.dataPointColors[i]}` : gt(a, n), c = re(e, a) ? i : n.chartexFormatIdx ?? a, l = n.seriesType ?? e.chartType, u = l === "line" || l === "stackedLine" || l === "stackedLinePct", d = q(e, "dataPoint3D", a), f = W(e, "dataPoint3D"), p, m = s, h = Oe(e, n, r, i, a);
	h !== void 0 && ({color: m, fill: p} = St(h, m));
	let g, _ = null, v = O(r?.chartexStyle, f, i);
	if (v === void 0 && r?.lineHidden === !0 && (v = t(f)), v !== void 0) v?.fillType === "solid" ? _ = `#${v.color}` : g = v;
	else if (r?.lineColor) _ = `#${r.lineColor}`;
	else {
		let e = O(n.chartexStyle, f, c);
		if (e === void 0 && n.lineHidden === !0 && (e = t(f)), e !== void 0) e?.fillType === "solid" ? _ = `#${e.color}` : g = e;
		else if (n.lineColor) _ = `#${n.lineColor}`;
		else if (u) g = p === null ? null : p;
		else {
			let e = K(d, f, c, r?.chartexStyle, n.chartexStyle);
			e !== void 0 && (e?.fillType === "solid" ? _ = `#${e.color}` : g = e);
		}
	}
	let y = u ? void 0 : d, b = r?.chartexStyle?.lineCap ?? n.chartexStyle?.lineCap ?? y?.lineCap, x = r?.chartexStyle?.lineJoin ?? n.chartexStyle?.lineJoin ?? y?.lineJoin, S = N(r?.lineDash == null ? r?.chartexStyle : {
		lineDash: r.lineDash,
		lineDashAuthored: !0
	}, n.chartexStyle, y);
	return {
		color: m,
		fill: p,
		lineColor: _,
		lineFill: g,
		lineWidthEmu: r?.lineWidthEmu ?? r?.chartexStyle?.lineWidthEmu ?? n.lineWidthEmu ?? n.chartexStyle?.lineWidthEmu ?? y?.lineWidthEmu,
		lineDash: S?.lineDash,
		lineCustomDash: S?.lineCustomDash,
		lineCap: b === "rnd" ? "round" : b === "sq" ? "square" : "butt",
		lineJoin: x === "round" || x === "bevel" ? x : "miter"
	};
}
function Ct(e) {
	if (!e) return !1;
	let t = e.chartexStyle;
	return e.lineHidden != null || e.lineColor != null || e.lineWidthEmu != null || e.lineDash != null || t?.linePaintAuthored === !0 || t?.lineHidden != null || t?.lineNoStyle === !0 || t?.lineColors?.some((e) => e != null) === !0 || t?.linePaints?.some((e) => e != null) === !0 || t?.lineWidthEmu != null || t?.lineDash != null || t?.lineCustomDash != null || t?.lineCap != null || t?.lineJoin != null;
}
function wt(e, t) {
	let n = e.cameraNormal(t);
	if (!n) return 1;
	let r = {
		x: -.2,
		y: .25,
		z: 1
	}, i = Math.hypot(r.x, r.y, r.z), a = Math.max(0, (n.x * r.x + n.y * r.y + n.z * r.z) / i);
	return Math.max(.78, Math.min(1, .78 + .24 * a));
}
var Tt = (e) => `"${e && !e.startsWith("+") ? e.replace(/["\\]/g, "") : "Arial"}"`, $ = (e, t, n = "minor") => Tt((t?.startsWith("+mj-") ? e.themeMajorFontLatin : t?.startsWith("+mn-") ? e.themeMinorFontLatin : t) ?? (n === "major" ? e.themeMajorFontLatin : e.themeMinorFontLatin));
function Et(e, t) {
	if (t.length) {
		e.beginPath(), e.moveTo(t[0].x, t[0].y);
		for (let n = 1; n < t.length; n++) e.lineTo(t[n].x, t[n].y);
		e.closePath();
	}
}
var Dt = (e) => e === "transparent" || e === "#00000000" || e === "rgba(0,0,0,0)";
function Ot(e, t, n, r) {
	Dt(n) || (Et(e, t), e.fillStyle = n, e.fill(), r > 0 && (Et(e, t), e.fillStyle = `rgba(0,0,0,${r})`, e.fill()));
}
function kt(e, t, n, r, i, a, o, s, c, l, u, d) {
	return Fe({
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
	}).flatMap((t) => jt(e, t, l).map((e) => ({
		...e,
		outline: !1,
		outlineSegments: void 0
	})));
}
function At(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m = !1, h = !1, g, _) {
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
	let v = Ne({
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
	return v ? jt(e, v, d, g, _) : [];
}
function jt(e, t, n, r, i, a = !1) {
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
				color: Ce(n, wt(e, i)),
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
	let p = st([...c.values()].map(([e, n]) => [t.vertices[e], t.vertices[n]]));
	if (!r) return s;
	let m = (e, t) => Math.hypot(e.x - t.x, e.y - t.y, e.depth - t.depth) <= 1e-9, h = (e) => p.junctions.some((t) => m(t.point, e));
	for (let t of p.paths) {
		let n = t.map((t) => e.project(t.x, t.y, t.depth)), a = t.map((t) => e.cameraDepth(t.x, t.y, t.depth)), o = t.map((t) => e.cameraProjectionWeight(t.x, t.y, t.depth)), c = et(n.map((e, t) => ({
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
		let n = Qe({
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
function Mt(e, t, n, r, i, a, o) {
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
		let r = t[0], i = t.at(-1), s = Math.hypot(r.x - i.x, r.y - i.y, r.depth - i.depth) <= 1e-9, c = et((n && !s ? [...t, r] : [...t]).map((t) => ({
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
function Nt(e, t) {
	t.paint !== null && (t.paint === void 0 ? Ot(e, t.points, t.color, t.shade) : (Et(e, t.points), e.fillStyle = t.paint, e.fill()), t.outline && (e.strokeStyle = t.outlineColor ?? "rgba(0,0,0,0.42)", e.lineWidth = t.outlineWidth ?? .75, e.setLineDash(ce(t.outlineDash ?? "solid", e.lineWidth)), e.lineCap = t.outlineCap ?? "butt", e.lineJoin = t.outlineJoin ?? "miter", t.outline && (Et(e, t.points), e.stroke()), e.setLineDash([])));
}
function Pt(e, t) {
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
function Ft(e, t, n, r, i) {
	if (r === void 0) return;
	let a = t.filter((e) => e.paintRole === n);
	if (!a.length) return;
	if (r === null) {
		for (let e of a) e.paint = null;
		return;
	}
	let o = a.flatMap((e) => e.points), s = Math.min(...o.map((e) => e.x)), c = Math.max(...o.map((e) => e.x)), l = Math.min(...o.map((e) => e.y)), u = Math.max(...o.map((e) => e.y)), d = R(r, e, s, l, c - s, u - l, i);
	for (let e of a) e.paint = d;
}
function It(e, t) {
	e.fillStyle = "#888", e.font = "12px sans-serif", e.textAlign = "center", e.textBaseline = "middle", e.fillText("(too many data points)", t.x + t.w / 2, t.y + t.h / 2);
}
function Lt(e) {
	let t = e.catAxisLabelRotation;
	return t == null ? null : !Number.isFinite(t) || Math.abs(t) > 54e5 ? 0 : t / 6e4 * Math.PI / 180;
}
function Rt(e, t, n, r, i, a = 1, o = 6) {
	if (i || r === 0) {
		e.textAlign = i ? "right" : "center", e.textBaseline = i ? "middle" : a < 0 ? "bottom" : "top", e.fillText(t, n.x + (i ? -o : 0), n.y + (i ? 0 : a * o));
		return;
	}
	e.save(), e.translate(n.x, n.y + a * o), e.rotate(r), e.textAlign = a < 0 ? "left" : "right", e.textBaseline = "middle", e.fillText(t, 0, 0), e.restore();
}
function zt(e, t, n, r, i, a, o, s = void 0, c = 0, l = ue, u = void 0, d = void 0, f = 0, p = f, m = void 0, h = void 0, g = void 0, _ = void 0, v = void 0) {
	if (!(r > 0) || !Number.isFinite(t.x) || !Number.isFinite(t.y)) return;
	let y = r / 2;
	if (u !== void 0 || d !== void 0) {
		F(e, u, d, f, {
			x: t.x - y,
			y: t.y - y,
			w: r,
			h: r
		}, l, (e) => zt(e, t, n, r, i, a, o, s, c, l, void 0, void 0, 0, 0, m, h, g, _, v), p);
		return;
	}
	e.beginPath();
	let b = m === void 0 ? a : m == null ? null : m.fillType === "solid" ? `#${m.color}` : R(m, e, t.x - y, t.y - y, r, r, c);
	switch (b && (e.strokeStyle = b, e.lineWidth = o, e.setLineDash(ae(g, h, o)), e.lineCap = _ === "rnd" ? "round" : _ === "sq" ? "square" : "butt", e.lineJoin = v === "round" || v === "bevel" ? v : "miter"), n) {
		case "square":
			e.rect(t.x - y, t.y - y, r, r);
			break;
		case "diamond":
			e.moveTo(t.x, t.y - y), e.lineTo(t.x + y, t.y), e.lineTo(t.x, t.y + y), e.lineTo(t.x - y, t.y), e.closePath();
			break;
		case "triangle":
			e.moveTo(t.x, t.y - y), e.lineTo(t.x + y, t.y + y), e.lineTo(t.x - y, t.y + y), e.closePath();
			break;
		case "x":
		case "plus": {
			let r = n === "x";
			e.moveTo(t.x - y, t.y + (r ? -y : 0)), e.lineTo(t.x + y, t.y + (r ? y : 0)), e.moveTo(t.x + (r ? -y : 0), t.y + y), e.lineTo(t.x + (r ? y : 0), t.y - y), b && e.stroke();
			return;
		}
		case "dash":
			e.rect(t.x - y, t.y - r * .1, r, r * .2);
			break;
		case "star":
			for (let n = 0; n < 10; n++) {
				let r = -Math.PI / 2 + n * Math.PI / 5, i = n % 2 == 0 ? y : y * .4, a = t.x + Math.cos(r) * i, o = t.y + Math.sin(r) * i;
				n ? e.lineTo(a, o) : e.moveTo(a, o);
			}
			e.closePath();
			break;
		case "dot":
			e.ellipse(t.x, t.y, r * .25, r * .1, 0, 0, Math.PI * 2);
			break;
		case "picture":
			s?.fillType === "image" && Y(e, s, t.x - y, t.y - y, r, r, l, c), b && e.strokeRect(t.x - y, t.y - y, r, r);
			return;
		default:
			e.arc(t.x, t.y, y, 0, Math.PI * 2);
			break;
	}
	let x = s?.fillType === "image" ? s : void 0, S = x ? null : s === void 0 ? i === "transparent" ? null : i : s == null ? null : R(s, e, t.x - y, t.y - y, r, r, c);
	S == null ? x && (e.save(), e.clip(), Y(e, x, t.x - y, t.y - y, r, r, l, c), e.restore()) : (e.fillStyle = S, e.fill()), b && e.stroke();
}
function Bt(e, t, n, r, a, o, s, c, l, u = 0, d, f, p = "t", m = s, h = !0, g, _, y = o, b = 0) {
	let x = f, S = n.seriesDataLabels;
	if (U(S, x) || t.showDataLabelsOverMax !== !0 && _ != null && Number.isFinite(_) && y > _) return;
	let w = x?.showVal ?? S?.showVal ?? t.showDataLabels, T = x?.showCatName ?? S?.showCatName ?? !1, E = x?.showSerName ?? S?.showSerName ?? !1, D = x?.showPercent ?? S?.showPercent ?? !1, O = x?.text, A = C({
		customText: O,
		showCategory: T,
		showSeries: E,
		showValue: w,
		showPercent: D,
		category: n.categories?.[a] ?? t.categories[a] ?? `${a + 1}`,
		seriesName: n.name || `Series ${r + 1}`,
		sourceValue: o,
		valueDivisor: g?.divisor,
		percentRatio: d != null && Number.isFinite(d) ? d : void 0,
		formatCode: x?.formatCode ?? S?.formatCode ?? t.dataLabelFormatCode ?? n.valFormatCode,
		percentFormatCode: x?.formatCode ?? S?.formatCode ?? t.dataLabelFormatCode ?? "0%",
		date1904: t.date1904,
		separator: x?.separator ?? S?.separator
	});
	if (!A) return;
	let j = v(x?.fontSizeHpt ?? S?.fontSizeHpt ?? t.dataLabelFontSizeHpt, l) ?? 9 * l, N = x?.fontBold ?? S?.fontBold ?? t.dataLabelFontBold ?? !1, P = z(x, S), F = $(t, x?.fontFace ?? S?.fontFace ?? t.dataLabelFontFace);
	e.font = `${P.fontItalic ? "italic " : ""}${N ? "bold " : ""}${j}px ${F}`;
	let R = `#${x?.fontColor ?? S?.fontColor ?? n.labelColor ?? t.dataLabelFontColor ?? "111111"}`, B = O && x?.richRuns?.length ? ge(e, {
		runs: x.richRuns,
		ptToPx: l,
		fontFamily: F,
		fallbackBold: N,
		fallbackItalic: P.fontItalic,
		fallbackBaseline: P.fontBaseline,
		fallbackColorHidden: P.fontPaintAuthored === !0 && (P.fontHidden === !0 || P.fontColor == null),
		fontFamilyForFace: (e) => $(t, e)
	}, j, R) : null, V = B ? [] : L(A, Math.max(j, c.w * .45), Math.max(j * 1.2, c.h * .35), j * 1.2, (t) => e.measureText(t).width, P);
	if (!B && !V.length) return;
	let H = B?.width ?? Math.max(...V.map((t) => e.measureText(t).width)), ee = B?.height ?? V.length * j * 1.2, W = te(P, l), G = k(H + W.left + W.right, ee + W.top + W.bottom, P.textRotation, P.textVerticalMode), K = se({
		kind: "point",
		x: s.x,
		y: s.y,
		position: x?.position ?? S?.position ?? t.dataLabelPosition ?? p,
		markerGap: u
	}, c, {
		w: G.w,
		h: G.h
	}, j, x?.manualLayout, c);
	if (!K) return;
	let q = le(x?.labelBox, S?.labelBox);
	S?.showLeaderLines && S.leaderLineHidden !== !0 && h && (e.beginPath(), e.moveTo(m.x, m.y), e.lineTo(Math.max(K.rect.x, Math.min(m.x, K.rect.x + K.rect.w)), Math.max(K.rect.y, Math.min(m.y, K.rect.y + K.rect.h))), e.strokeStyle = `#${S.leaderLineColor ?? "808080"}`, e.lineWidth = S.leaderLineWidthEmu == null ? .75 * l : Math.max(.25, S.leaderLineWidthEmu / X * l), e.setLineDash(ce(S.leaderLineDash ?? "solid", e.lineWidth)), e.stroke()), i(e, q, K.rect, l, b), e.save(), e.beginPath(), e.rect(K.clip.x, K.clip.y, K.clip.w, K.clip.h), e.clip();
	let J = I(P, K.textAlign), ne = M(K.x, K.y, K.rect, ee + W.top + W.bottom, P, x?.manualLayout != null, J, K.textAlign, H + W.left + W.right, G.radians), Y = ie(e, ne.x, ne.y, G.radians, J, K.textBaseline, W);
	if (B) {
		ye(e, B, Y.x, Y.y, J, K.textBaseline, x?.manualLayout ? Math.max(0, K.rect.w - W.left - W.right) : B.width), e.restore();
		return;
	}
	if (!(P.fontPaintAuthored === !0 && (P.fontHidden === !0 || P.fontColor == null))) {
		e.fillStyle = R, e.textAlign = J, e.textBaseline = "middle";
		let t = j * 1.2, n = (P.fontBaseline ?? 0) * j, r = Y.y - (V.length - 1) * t / 2 - n;
		V.forEach((n, i) => e.fillText(n, Y.x, r + i * t));
	}
	e.restore();
}
function Vt(e, t, n) {
	let r = t.seriesDataLabels;
	return U(r, n) ? !1 : n?.text ? !0 : (n?.showVal ?? r?.showVal ?? e.showDataLabels) || (n?.showCatName ?? r?.showCatName ?? !1) || (n?.showSerName ?? r?.showSerName ?? !1) || (n?.showPercent ?? r?.showPercent ?? !1);
}
function Ht(e, t, n, i, a, o) {
	let s = c(t, n.h, i);
	if (t.title) {
		e.font = `${t.titleFontBold === !1 ? "" : "bold "}${s.fontPx}px ${Tt(t.titleFontFace)}`, e.fillStyle = t.titleFontColor ? `#${t.titleFontColor}` : "#111111", e.textAlign = "center", e.textBaseline = "top";
		let r = e.measureText(t.title).width, i = {
			x: n.x + (n.w - r) / 2,
			y: n.y + s.topPad,
			w: r,
			h: Math.max(1, s.fontPx)
		}, a = t.titleManualLayout ? b({
			...t.titleManualLayout,
			w: void 0,
			h: void 0
		}, n, i) : null;
		e.fillText(t.title, a ? a.x + a.w / 2 : n.x + n.w / 2, a?.y ?? i.y);
	}
	let u = ct(t);
	e.save();
	let d = (t.chartType === "pie" ? t.series[0]?.categories?.length ? t.series[0].categories : t.categories : t.series.map((e, t) => e.name || `Series ${t + 1}`)).flatMap((e, t) => u.get(t)?.deleted === !0 ? [] : [{
		label: e,
		index: t
	}]), f = d.map((e) => lt(t, u.get(e.index), i)), m = Math.max(0, ...f.map((e) => e.fontPx)), h = d.map((t, n) => (e.font = f[n].font, 7 * i + 4 + e.measureText(t.label).width)), _ = g(t, n.w, n.h, .23, {
		itemWidths: h,
		rowHeight: Math.max(m * 1.45, 12),
		itemGap: 12,
		horizontalPadding: 8,
		verticalPadding: 4
	});
	e.restore();
	let v = H(_, t.legendOverlay === !0), y = r(t, n.w, n.h, i), x = l(t.catAxisTitleTextVerticalInsetEmu, i), S = l(t.valAxisTitleTextVerticalInsetEmu, i), C = a === "horizontal" ? t.catAxisTitle ? y.catFontPx + x + oe(n.w) + 4 : 0 : a === "vertical" ? y.valBandW : 0, w = a === "horizontal" ? t.valAxisTitle ? y.valFontPx + S + oe(n.h) + 4 : 0 : a === "vertical" ? y.catBandH : 0, T = p(t, n.x, n.y, n.w, n.h, i, {
		titleBand: s,
		legendSideReserveFrac: .23,
		legendReserve: _,
		pad: {
			t: s.bandH + v.legTopH + n.h * .04,
			r: v.legRightW + n.w * .05,
			b: v.legBottomH + n.h * .19 + w,
			l: v.legLeftW + n.w * .13 + C
		},
		honorPlotAreaManualLayout: !0,
		manualOuterInsets: {
			t: s.bandH,
			r: v.legRightW,
			b: v.legBottomH + w,
			l: v.legLeftW + C
		}
	}), E = {
		x: T.plotRect.px0,
		y: T.plotRect.py0,
		w: Math.max(1, T.plotRect.pw),
		h: Math.max(1, T.plotRect.ph)
	};
	J(e, t, E.x, E.y, E.w, E.h, i, o);
	let D = _ ? _.side === "r" ? {
		x: n.x + n.w - _.reserveW,
		y: E.y,
		w: _.reserveW,
		h: E.h
	} : _.side === "l" ? {
		x: n.x,
		y: E.y,
		w: _.reserveW,
		h: E.h
	} : _.side === "t" ? {
		x: n.x + 4,
		y: n.y + s.bandH,
		w: Math.max(1, n.w - 8),
		h: _.reserveH
	} : {
		x: n.x + 4,
		y: n.y + n.h - _.reserveH,
		w: Math.max(1, n.w - 8),
		h: _.reserveH
	} : null;
	return {
		plot: E,
		legend: (D && t.legendManualLayout ? b(t.legendManualLayout, n, D) : null) ?? D,
		legendMeasure: {
			labels: d.map((e) => e.label),
			styles: f,
			itemWidths: h
		}
	};
}
function Ut(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
	e.save(), e.font = `${l ? "italic " : ""}${c ? "bold " : ""}${a}px ${o}`, e.fillStyle = s ? `#${s}` : "#555";
	let m = f ? t : me(e, t, p), h = x(i, u, d), g = r;
	if (f) {
		let t = e.measureText(m).width, i = Math.abs(Math.cos(h)), o = Math.abs(Math.sin(h)), s = {
			x: r.x - (t * i + a * o) / 2,
			y: r.y - (t * o + a * i) / 2,
			w: t * i + a * o,
			h: t * o + a * i
		}, c = b({
			...f,
			w: void 0,
			h: void 0
		}, n, s);
		c && (g = {
			x: c.x + c.w / 2,
			y: c.y + c.h / 2
		});
	}
	e.translate(g.x, g.y), h && e.rotate(h), e.textAlign = "center", e.textBaseline = "middle", e.fillText(m, 0, 0), e.restore();
}
function Wt(e, t, n, r, i, a) {
	if (t.valAxisTitle) {
		let s = o(t.valAxisTitleFontSizeHpt, a), c = i ? "horizontal" : "left";
		Ut(e, t.valAxisTitle, n, i ? {
			x: r.x + r.w / 2,
			y: r.y + r.h + oe(n.h) + s / 2
		} : {
			x: r.x - oe(n.w) - s / 2,
			y: r.y + r.h / 2
		}, c, s, $(t, t.valAxisTitleFontFace, "major"), t.valAxisTitleFontColor, t.valAxisTitleFontBold ?? !0, t.valAxisTitleFontItalic ?? !1, t.valAxisTitleRotation, t.valAxisTitleVerticalMode, t.valAxisTitleManualLayout, i ? r.w : r.h);
	}
	if (t.catAxisTitle) {
		let s = o(t.catAxisTitleFontSizeHpt, a), c = i ? "left" : "horizontal";
		Ut(e, t.catAxisTitle, n, i ? {
			x: r.x - oe(n.w) - s / 2,
			y: r.y + r.h / 2
		} : {
			x: r.x + r.w / 2,
			y: r.y + r.h + oe(n.h) + s / 2
		}, c, s, $(t, t.catAxisTitleFontFace, "major"), t.catAxisTitleFontColor, t.catAxisTitleFontBold ?? !0, t.catAxisTitleFontItalic ?? !1, t.catAxisTitleRotation, t.catAxisTitleVerticalMode, t.catAxisTitleManualLayout, i ? r.h : r.w);
	}
}
function Gt(e, t, n, r, i, a, s, c, l, u, d) {
	let f = t.threeD?.seriesAxis;
	if (!f || f.hidden || t.threeD?.barGrouping !== "standard" || t.series.length === 0) return;
	let p = dn(t, r, i, a, s, c, l), m = Qt(r), h = l === "vertical" ? m.seriesAxisX : p.axisX, g = l === "horizontal" ? m.floorY === r.front.y ? r.front.y + r.front.h : r.front.y : m.floorY, _ = r.project(h, g, r.topology.nearDepth), y = r.project(h, g, r.topology.farDepth), b = Math.hypot(y.x - _.x, y.y - _.y);
	if (!(b > 1e-6)) return;
	let x = {
		x: (y.x - _.x) / b,
		y: (y.y - _.y) / b
	}, S = {
		x: -x.y,
		y: x.x
	}, C = r.project(r.front.x + r.front.w / 2, r.front.y + r.front.h / 2, .5), w = {
		x: (_.x + y.x) / 2,
		y: (_.y + y.y) / 2
	};
	(w.x - C.x) * S.x + (w.y - C.y) * S.y < 0 && (S = {
		x: -S.x,
		y: -S.y
	}), (f.tickLabelPos === "low" && S.y < 0 || f.tickLabelPos === "high" && S.y > 0) && (S = {
		x: -S.x,
		y: -S.y
	}), f.lineHidden || (nn(e, en(f.lineColor, f.lineWidthEmu, f.lineDash, d)), e.beginPath(), e.moveTo(_.x, _.y), e.lineTo(y.x, y.y), e.stroke());
	let T = Math.max(1, Math.floor(f.tickMarkSkip ?? 1)), E = Math.max(1, Math.floor(f.tickLabelSkip ?? 1)), D = f.majorTickMark ?? "out", O = v(f.fontSizeHpt, d) ?? 9 * d;
	if (e.font = `${f.fontItalic ? "italic " : ""}${f.fontBold ? "bold " : ""}${O}px ${$(t, f.fontFace)}`, e.fillStyle = f.fontColor ? `#${f.fontColor}` : "#595959", e.textAlign = Math.abs(S.x) < .2 ? "center" : S.x < 0 ? "right" : "left", e.textBaseline = Math.abs(S.y) < .2 ? "middle" : S.y < 0 ? "bottom" : "top", u && !f.lineHidden && D !== "none") {
		nn(e, tn(f.lineColor, f.lineWidthEmu, f.lineDash, d));
		let n = t.series.length;
		for (let t = 0; t <= n; t += T) {
			let i = t / n, a = f.orientation === "maxMin" ? 1 - i : i, o = r.project(h, g, a), s = 6 * d, c = D === "cross" ? s / 2 : D === "out" ? s : 0, l = D === "cross" ? s / 2 : D === "in" ? s : 0;
			e.beginPath(), e.moveTo(o.x + S.x * c, o.y + S.y * c), e.lineTo(o.x - S.x * l, o.y - S.y * l), e.stroke();
		}
	}
	for (let n = 0; n < t.series.length; n++) {
		let i = r.seriesDepth(n, t.series.length, !1), a = f.orientation === "maxMin" ? 1 - i : i, o = r.project(h, g, a);
		if (!u && !f.lineHidden && n % T === 0 && D !== "none") {
			let t = 6 * d, n = D === "cross" ? t / 2 : D === "out" ? t : 0, r = D === "cross" ? t / 2 : D === "in" ? t : 0;
			e.beginPath(), e.moveTo(o.x + S.x * n, o.y + S.y * n), e.lineTo(o.x - S.x * r, o.y - S.y * r), e.stroke();
		}
		f.tickLabelPos !== "none" && n % E === 0 && e.fillText(t.series[n].name || `Series ${n + 1}`, o.x + S.x * (6 * d + 3), o.y + S.y * (6 * d + 3));
	}
	if (e.setLineDash([]), f.title) {
		let i = o(f.titleFontSizeHpt, d);
		Ut(e, f.title, n, {
			x: w.x + S.x * (O + i + 12),
			y: w.y + S.y * (O + i + 12)
		}, "horizontal", i, $(t, f.titleFontFace, "major"), f.titleFontColor, f.titleFontBold ?? !0, f.titleFontItalic ?? !1, f.titleRotation, f.titleVerticalMode, f.titleManualLayout, Math.max(r.front.w, r.front.h));
	}
}
function Kt(t, n, r, i, a, o, s) {
	let c = q(t, "dataPointMarker", a), l = W(t, "dataPointMarker"), u = n.chartexFormatIdx ?? a, d = E(r?.markerStyle, l, i), f = E(n.markerStyle, l, u), p = d !== void 0 || r?.markerFillPaint !== void 0 || r?.markerFill != null || r?.color != null || r?.markerFillPaintAuthored === !0 && r.markerStyle?.fillHidden !== !0, m = f !== void 0 || n.markerFillPaint !== void 0 || n.markerFill != null || n.markerFillPaintAuthored === !0 && n.markerStyle?.fillHidden !== !0, h = P(c, l, u), g = p ? d ?? r?.markerFillPaint : m ? f ?? n.markerFillPaint : h, _ = G(n, r, i, o), v = g;
	g?.fillType === "solid" ? (_ = g.color, v = void 0) : g === null && (_ = "00000000");
	let y = O(r?.markerStyle, l, i), b = O(n.markerStyle, l, u), x = y !== void 0 || r?.markerLine != null || r?.markerLinePaintAuthored === !0 && r.markerStyle?.lineHidden !== !0, S = b !== void 0 || n.markerLine != null || n.markerLinePaintAuthored === !0 && n.markerStyle?.lineHidden !== !0, C = V(c, u), w = x ? y ?? (r?.markerLinePaintAuthored === !0 ? null : void 0) : S ? b ?? (n.markerLinePaintAuthored === !0 ? null : void 0) : C, T = r?.markerLine ?? n.markerLine ?? n.lineColor ?? o, D = w;
	w?.fillType === "solid" ? (T = w.color, D = void 0) : w === null && (T = "00000000");
	let k = r?.markerStyle ?? n.markerStyle ?? c, A = N(r?.markerStyle, n.markerStyle, c);
	return {
		fill: _,
		fillPaint: v,
		line: T,
		linePaint: D,
		lineWidth: (r?.markerLineWidthEmu ?? n.markerLineWidthEmu ?? k?.lineWidthEmu) == null ? Math.max(.75, s) : Math.max(.25, (r?.markerLineWidthEmu ?? n.markerLineWidthEmu ?? k?.lineWidthEmu ?? 0) / X * s),
		lineDash: A?.lineDash,
		lineCustomDash: A?.lineCustomDash,
		lineCap: k?.lineCap,
		lineJoin: k?.lineJoin,
		effectDirect: e(r?.markerStyle, r?.chartexStyle, n.markerStyle),
		effectFallback: c,
		effectIndex: r?.markerStyle || r?.chartexStyle ? i : u,
		effectFallbackIndex: u
	};
}
function qt(t, n, r, i, a, o, s, c, l, u, d, f) {
	let p = Q(n, r, i, a, o, f), m = De(n, r, a, o), h = {
		x: s,
		y: c - l / 2,
		w: l,
		h: l
	}, g = (e) => {
		if (p.fill !== null) {
			let t = p.fill === void 0 ? p.color : p.fill.fillType === "image" ? null : R(p.fill, e, h.x, h.y, h.w, h.h, d);
			t && (e.fillStyle = t, e.fillRect(h.x, h.y, h.w, h.h));
		}
		let t = p.lineFill === void 0 ? p.lineColor : p.lineFill == null || p.lineFill.fillType === "image" ? null : R(p.lineFill, e, h.x, h.y, h.w, h.h, d);
		t && (e.strokeStyle = t, e.lineWidth = p.lineWidthEmu == null ? .75 * u : Math.max(.25, p.lineWidthEmu / X * u), e.setLineDash(ae(p.lineCustomDash, p.lineDash, e.lineWidth)), e.lineCap = p.lineCap, e.lineJoin = p.lineJoin, e.strokeRect(h.x, h.y, h.w, h.h), e.setLineDash([]));
	}, _ = e(i?.chartexStyle, r.chartexStyle);
	F(t, _, q(n, "dataPoint3D", o), _ === i?.chartexStyle ? a : m, h, u, g, m);
}
function Jt(t, n, r, i, a, o, s, c, l, u) {
	let d = Q(n, r, void 0, i, i, !1), f = d.lineFill === void 0 ? d.lineColor == null ? d.fill : {
		fillType: "solid",
		color: d.lineColor.replace(/^#/, "")
	} : d.lineFill;
	if (f !== null) {
		let a = d.lineWidthEmu == null ? Math.max(1, 2 * l) : Math.max(.5, d.lineWidthEmu / X * l), p = {
			x: o,
			y: s - a / 2,
			w: c,
			h: a
		}, m = f === void 0 ? d.color : f.fillType === "image" ? null : f.fillType === "solid" ? `#${f.color}` : R(f, t, o, s - a / 2, c, a, u);
		if (m) {
			let h = (e) => {
				e.beginPath(), e.moveTo(o, s), e.lineTo(o + c, s), e.strokeStyle = e === t ? m : f === void 0 ? d.color : f.fillType === "image" ? "rgba(0,0,0,0)" : f.fillType === "solid" ? `#${f.color}` : R(f, e, o, s - a / 2, c, a, u) ?? "rgba(0,0,0,0)", e.lineWidth = a, e.setLineDash(ae(d.lineCustomDash, d.lineDash, a)), e.stroke(), e.setLineDash([]);
			}, g = De(n, r, i, i);
			F(t, e(r.chartexStyle), q(n, "dataPoint3D", i), g, p, l, h, g);
		}
	}
	if (r.showMarker !== !0 || r.markerSymbol === "none") return;
	let p = r.markerSymbol ?? "circle", m = Kt(n, r, void 0, i, i, a.replace(/^#/, ""), l);
	zt(t, {
		x: o + c / 2,
		y: s
	}, p, Math.min(c, Math.max(2, (r.markerSize ?? 5) * l)), m.fill === "00000000" ? "transparent" : `#${m.fill.replace(/^#/, "")}`, m.line === "00000000" ? "rgba(0,0,0,0)" : `#${m.line.replace(/^#/, "")}`, m.lineWidth, m.fillPaint, u, l, m.effectDirect, m.effectFallback, m.effectIndex, m.effectFallbackIndex, m.linePaint, m.lineDash, m.lineCustomDash, m.lineCap, m.lineJoin);
}
function Yt(e, t, n, r, i = !1, a, o = 0) {
	if (!n) return;
	ee(e, t, n, r, o);
	let s = new Map(t.series[0]?.dataPointOverrides?.map((e) => [e.idx, e]) ?? []), c = i ? (t.series[0]?.categories?.length ? t.series[0].categories : t.categories).map((e, n) => {
		let r = t.series[0]?.dataPointColors?.[n];
		return {
			label: e,
			color: r === "00000000" ? "transparent" : r ? `#${r}` : gt(n),
			series: t.series[0],
			point: s.get(n),
			sourceIndex: n,
			seriesIndex: 0
		};
	}) : t.series.map((e, t) => ({
		label: e.name || `Series ${t + 1}`,
		color: gt(t, e),
		series: e,
		point: void 0,
		sourceIndex: t,
		seriesIndex: t
	})), l = ct(t), u = c.filter((e) => l.get(e.sourceIndex)?.deleted !== !0), d = a != null && a.labels.length === u.length && a.labels.every((e, t) => e === u[t].label), f = d ? a.styles : u.map((e) => lt(t, l.get(e.sourceIndex), r));
	e.textAlign = "left", e.textBaseline = "middle";
	let p = Math.max(Math.max(0, ...f.map((e) => e.fontPx)) * 1.45, 12), m = Math.min(7 * r, p * .7);
	if (t.legendPos === "t" || t.legendPos === "b" || t.legendManualLayout != null && n.w >= n.h) {
		let s = d ? a.itemWidths : u.map((t, n) => (e.font = f[n].font, m + 4 + e.measureText(t.label).width)), c = h(s, Math.max(1, n.w - 8), 12).slice(0, Math.max(0, Math.floor((n.h - 4 + 1e-6) / p))), l = n.y + 2 + p / 2;
		for (let a of c) {
			let c = a.map((e) => Math.min(n.w, s[e])), d = c.reduce((e, t) => e + t, 0) + Math.max(0, a.length - 1) * 12, h = n.x + Math.max(4, (n.w - d) / 2);
			for (let n = 0; n < a.length; n++) {
				let s = a[n], d = u[s], p = f[s];
				e.font = p.font;
				let g = Math.max(0, c[n] - m - 4);
				!i && t.chartType.toLowerCase().includes("line") && d.series ? Jt(e, t, d.series, d.seriesIndex, d.color, h, l, m, r, o) : d.series && qt(e, t, d.series, d.point, d.sourceIndex, d.seriesIndex, h, l, m, r, o, i), e.fillStyle = p.color, e.fillText(me(e, d.label, g), h + m + 4, l), h += c[n] + 12;
			}
			l += p;
		}
		return;
	}
	let g = n.y;
	for (let a = 0; a < u.length; a++) {
		let s = u[a], c = f[a];
		e.font = c.font;
		let l = n.x + 8 + m, d = Math.max(0, n.x + n.w - 4 - l), h = Math.max(c.fontPx * 1.2, 10), _ = j(s.label, d, h * (i ? 1 : 2), h, (t) => e.measureText(t).width);
		if (_.length === 0) continue;
		let v = Math.max(p, _.length * h + 2);
		if (g + v > n.y + n.h + 1e-6) break;
		let y = g + v / 2;
		!i && t.chartType.toLowerCase().includes("line") && s.series ? Jt(e, t, s.series, s.seriesIndex, s.color, n.x + 4, y, m, r, o) : s.series && qt(e, t, s.series, s.point, s.sourceIndex, s.seriesIndex, n.x + 4, y, m, r, o, i), e.fillStyle = c.color;
		let b = y - (_.length - 1) * h / 2;
		_.forEach((t, n) => e.fillText(t, l, b + n * h)), g += v;
	}
}
function Xt(e, t, n, r, i, a) {
	let o = i ? 100 : 1, s = e.valAxisMinorTickMark ?? "none";
	return we({
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
function Zt(e, t, n) {
	let r = e != null && Number.isFinite(e) ? (e % 360 + 360) % 360 : 0, i = Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0, a = Number.isFinite(n) ? Math.max(0, Math.min(1 - i, n)) : 0, o = Math.PI / 2 - (r * Math.PI / 180 + i * Math.PI * 2), s = o - a * Math.PI * 2;
	return {
		start: Math.min(o, s),
		end: Math.max(o, s),
		middle: (o + s) / 2,
		leading: o
	};
}
function Qt(e) {
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
function $t(e, t, n, r, i = "A6A6A6", a = .75) {
	let o = t != null && Number.isFinite(t) && t >= 0 ? Math.max(.25, t / X * r) : a * r;
	return {
		color: `#${e ?? i}`,
		width: o,
		dash: ce(n ?? "solid", o)
	};
}
function en(e, t, n, r) {
	let i = $t(e, t, n, r, "898989", 1);
	if (t == null || !Number.isFinite(t) || t < 0) return i;
	let a = t / X * r;
	if (!(a > 0)) return i;
	let o = a;
	return {
		...i,
		width: o,
		dash: ce(n ?? "solid", o)
	};
}
function tn(e, t, n, r) {
	return en(e, t, n, r);
}
function nn(e, t) {
	e.strokeStyle = t.color, e.lineWidth = t.width, e.setLineDash(t.dash);
}
function rn(e, t, n, r, i, o, s, c, l) {
	let { front: u } = n, d = u.x, f = u.x + u.w, p = Qt(n), { sideX: m, floorY: h, oppositeFloorY: g, nearDepth: _, farDepth: v } = p, y = dn(t, n, r, o, s, c, i), b = [], x = t.catAxisLinePaintAuthored === !0, C = t.valAxisLinePaintAuthored === !0, w = i === "vertical" ? x && !t.catAxisHidden && !t.catAxisLineHidden : C && !t.valAxisHidden && !t.valAxisLineHidden, T = i === "vertical" ? C && !t.valAxisHidden && !t.valAxisLineHidden : x && !t.catAxisHidden && !t.catAxisLineHidden;
	w && b.push([y.horizontalStart, y.horizontalEnd]), T && b.push([y.verticalStart, y.verticalEnd]);
	let E = t.threeD?.seriesAxis, D = E?.linePaintAuthored === !0;
	if (E && !E.hidden && !E.lineHidden && D && t.threeD?.barGrouping === "standard" && t.series.length > 0) {
		let e = i === "vertical" ? p.seriesAxisX : y.axisX, t = i === "horizontal" ? h === n.front.y ? n.front.y + n.front.h : n.front.y : h;
		b.push([n.project(e, t, _), n.project(e, t, v)]);
	}
	let O = (e, t) => Math.hypot(e.x - t.x, e.y - t.y) <= 1e-6, k = (e, t) => b.some(([n, r]) => O(e, n) && O(t, r) || O(e, r) && O(t, n)), j = (e, t) => {
		let r = fe(n, e, t?.thicknessPercent), i = r.faces.map((e, t) => ({
			scenePoints: e,
			faceIndex: t
		})).filter(({ scenePoints: e }) => r.thickness === 0 || n.cameraFacing(e)).map(({ scenePoints: e, faceIndex: t }) => ({
			faceIndex: t,
			scenePoints: e,
			points: e.map((e) => n.projectUnbounded(e.x, e.y, e.depth)),
			depth: e.reduce((e, t) => e + n.cameraDepth(t.x, t.y, t.depth), 0) / e.length
		})).sort((e, t) => e.depth - t.depth);
		return {
			slab: r,
			faces: i,
			visibleFaceIndices: new Set(i.map((e) => e.faceIndex))
		};
	}, M = j("floor", t.threeD?.floor), N = j("sideWall", t.threeD?.sideWall), P = j("backWall", t.threeD?.backWall), F = M.faces, I = N.faces, L = P.faces, z = (i, a, o, s) => {
		let c = A(t, a, o), l = i.faces;
		if (!c.fill || !l.length) return;
		if (c.fill.fillType === "image") {
			let t = B(c.fill);
			if (!t) return;
			de(e, c.fill, t, a, s, i.slab, i.faces.map((e) => e.faceIndex), (e) => n.projectUnbounded(e.x, e.y, e.depth), r.max - r.min);
			return;
		}
		let u = l.flatMap((e) => e.points), d = Math.min(...u.map((e) => e.x)), f = Math.max(...u.map((e) => e.x)), p = Math.min(...u.map((e) => e.y)), m = Math.max(...u.map((e) => e.y)), h = c.fill.fillType === "solid" ? `#${c.fill.color}` : R(c.fill, e, d, p, f - d, m - p);
		if (h) for (let t of l) t.points.length < 3 || (Et(e, t.points), e.fillStyle = h, e.fill());
	};
	z(M, t.threeD?.floor, "floor", "floor"), z(N, t.threeD?.sideWall, "wall", "sideWall"), z(P, t.threeD?.backWall, "wall", "backWall");
	let V = (t, r, i, a, o = !0) => {
		for (let s of ve(t.slab, r, i, a)) {
			if (!o && s.faceIndex !== 0 || !t.visibleFaceIndices.has(s.faceIndex)) continue;
			let [r, i] = s.scenePoints.map((e) => n.projectUnbounded(e.x, e.y, e.depth));
			e.beginPath(), e.moveTo(r.x, r.y), e.lineTo(i.x, i.y), e.stroke();
		}
	}, H = (t, a, o) => {
		nn(e, a);
		for (let a of t) {
			let t = r.fraction(a);
			if (o) {
				i === "horizontal" ? (V(M, "floor", "x", t), V(P, "backWall", "x", t)) : (V(N, "sideWall", "y", t), V(P, "backWall", "y", t));
				continue;
			}
			if (i === "horizontal") {
				let r = u.x + t * u.w, i = n.project(r, h, v), a = n.project(r, g, v);
				e.beginPath(), e.moveTo(i.x, i.y), e.lineTo(a.x, a.y), e.stroke();
			} else {
				let r = u.y + u.h - t * u.h, i = n.project(m, r, _), a = n.project(m, r, v), o = n.project(m === d ? f : d, r, v);
				e.beginPath(), e.moveTo(i.x, i.y), e.lineTo(a.x, a.y), e.stroke(), e.beginPath(), e.moveTo(a.x, a.y), e.lineTo(o.x, o.y), e.stroke();
			}
		}
	};
	t.valAxisMinorGridlines === !0 && H(r.minorTicks, $t(t.valAxisMinorGridlineColor, t.valAxisMinorGridlineWidthEmu, t.valAxisMinorGridlineDash, l, "D9D9D9", .5), !0), t.valAxisMajorGridlines === !0 && H(r.majorTicks, $t(t.valAxisGridlineColor, t.valAxisGridlineWidthEmu, t.valAxisGridlineDash, l, "898989", 1), !0);
	let ee = (t, n) => {
		nn(e, n);
		for (let e of t) i === "vertical" ? (V(M, "floor", "x", e), V(P, "backWall", "x", e)) : (V(N, "sideWall", "y", e), V(P, "backWall", "y", e));
	};
	t.catAxisMinorGridlines === !0 && ee(S(o, s), $t(t.catAxisMinorGridlineColor, t.catAxisMinorGridlineWidthEmu, t.catAxisMinorGridlineDash, l, "E0E0E0", .5)), t.catAxisMajorGridlines === !0 && ee(a(o, s), $t(t.catAxisGridlineColor, t.catAxisGridlineWidthEmu, t.catAxisGridlineDash, l, "E0E0E0", .5));
	let U = (n, r, i) => {
		if (!n.length) return;
		let a = A(t, r, i);
		if (a.line === null) return;
		let o = a.line ?? {
			fillType: "solid",
			color: "898989"
		}, s = n.flatMap((e) => e.points), c = Math.min(...s.map((e) => e.x)), u = Math.max(...s.map((e) => e.x)), d = Math.min(...s.map((e) => e.y)), f = Math.max(...s.map((e) => e.y)), p = o.fillType === "solid" ? `#${o.color}` : R(o, e, c, d, u - c, f - d);
		if (!p) return;
		let m = a.lineWidthEmu == null ? l : Math.max(.25, a.lineWidthEmu / X * l);
		e.strokeStyle = p, e.lineWidth = m, e.setLineDash(ae(a.lineCustomDash, a.lineDash, m)), e.lineCap = a.lineCap === "rnd" ? "round" : a.lineCap === "sq" ? "square" : "butt", e.lineJoin = a.lineJoin === "round" || a.lineJoin === "bevel" ? a.lineJoin : "miter";
		for (let t of n) {
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
	U(F, t.threeD?.floor, "floor"), U(I, t.threeD?.sideWall, "wall"), U(L, t.threeD?.backWall, "wall"), e.setLineDash([]);
}
function an(e, t, n, r, i, a, o, s, c) {
	let l = dn(t, n, r, i, a, o, c), u = c === "vertical" ? !t.catAxisHidden && !t.catAxisLineHidden : !t.valAxisHidden && !t.valAxisLineHidden, d = c === "vertical" ? !t.valAxisHidden && !t.valAxisLineHidden : !t.catAxisHidden && !t.catAxisLineHidden;
	u && (nn(e, en(c === "vertical" ? t.catAxisLineColor : t.valAxisLineColor, c === "vertical" ? t.catAxisLineWidthEmu : t.valAxisLineWidthEmu, c === "vertical" ? t.catAxisLineDash : t.valAxisLineDash, s)), e.beginPath(), e.moveTo(l.horizontalStart.x, l.horizontalStart.y), e.lineTo(l.horizontalEnd.x, l.horizontalEnd.y), e.stroke()), d && (nn(e, en(c === "vertical" ? t.valAxisLineColor : t.catAxisLineColor, c === "vertical" ? t.valAxisLineWidthEmu : t.catAxisLineWidthEmu, c === "vertical" ? t.valAxisLineDash : t.catAxisLineDash, s)), e.beginPath(), e.moveTo(l.verticalStart.x, l.verticalStart.y), e.lineTo(l.verticalEnd.x, l.verticalEnd.y), e.stroke()), e.setLineDash([]);
}
function on(e, t, n, r) {
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
function sn(e, t, n, r, i, a, o, s, c) {
	if (!t || t === "none") return;
	let l = on(r, i, a, o), u = cn(s, c), d = t === "cross" ? u / 2 : u, f = t === "out" || t === "cross" ? d : 0, p = t === "in" || t === "cross" ? d : 0;
	e.beginPath(), e.moveTo(n.x + l.x * f, n.y + l.y * f), e.lineTo(n.x - l.x * p, n.y - l.y * p), e.stroke();
}
function cn(e, t) {
	return (e === "minor" ? 4 : 6) * t;
}
function ln(e, t, n) {
	if (e !== "out" && e !== "cross") return 0;
	let r = cn(t, n);
	return e === "cross" ? r / 2 : r;
}
function un(e, t, n, r) {
	if (t) return r;
	let i = ln(e, "major", n);
	return Math.max(r, i + 3 * n);
}
function dn(e, t, n, r, i, a, o) {
	let { front: s } = t, c = (e) => Math.max(0, Math.min(1, e)), l = t.topology.axisX === "min" ? s.x : s.x + s.w, u = t.topology.axisY === "min" ? s.y : s.y + s.h, d = () => {
		if (e.catAxisCrossesAt != null && Number.isFinite(e.catAxisCrossesAt)) {
			let t = e.chartType.endsWith("Pct") ? e.catAxisCrossesAt * 100 : e.catAxisCrossesAt;
			return c(n.fraction(t));
		}
		let t = e.catAxisCrosses ?? "autoZero";
		return c(t === "min" ? n.fraction(n.min) : t === "max" ? n.fraction(n.max) : n.fraction(0));
	}, f = () => {
		let t = e.valAxisCrossesAt;
		if (t != null && Number.isFinite(t)) return T(t - 1, r, i, a);
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
function fn(e, t, n, r, i, o, s, c, l, u) {
	let { front: d } = n, f = dn(t, n, r, i, o, s, c), { axisX: p, axisY: m, depth: h } = f, g = n.project(d.x + d.w / 2, d.y + d.h / 2, h), _ = t.valAxisMinorTickMark ?? "none", v = l ? tn : en;
	if (!t.valAxisHidden && !t.valAxisLineHidden) {
		nn(e, v(t.valAxisLineColor, t.valAxisLineWidthEmu, t.valAxisLineDash, u));
		let i = (e) => c === "horizontal" ? n.project(d.x + r.fraction(e) * d.w, m, h) : n.project(p, d.y + d.h - r.fraction(e) * d.h, h), a = c === "horizontal" ? f.horizontalStart : f.verticalStart, o = c === "horizontal" ? f.horizontalEnd : f.verticalEnd;
		for (let n of r.majorTicks) sn(e, t.valAxisMajorTickMark, i(n), a, o, g, c === "vertical" ? "horizontal" : "vertical", "major", u);
		for (let t of r.minorTicks) sn(e, _, i(t), a, o, g, c === "vertical" ? "horizontal" : "vertical", "minor", u);
	}
	if (!t.catAxisHidden && !t.catAxisLineHidden) {
		nn(e, v(t.catAxisLineColor, t.catAxisLineWidthEmu, t.catAxisLineDash, u));
		let r = c === "vertical" ? f.horizontalStart : f.verticalStart, _ = c === "vertical" ? f.horizontalEnd : f.verticalEnd, y = Math.max(1, Math.floor(t.catAxisTickMarkSkip ?? 1)), b = (i) => {
			let a = c === "vertical" ? n.project(d.x + i * d.w, m, h) : n.project(p, d.y + i * d.h, h);
			sn(e, t.catAxisMajorTickMark, a, r, _, g, c === "vertical" ? "vertical" : "horizontal", "major", u);
		};
		if (l) {
			let e = a(i, o);
			for (let t = 0; t < e.length; t += y) b(s ? 1 - e[t] : e[t]);
		} else for (let e = 0; e < i; e += y) b(T(e, i, o, s));
		let x = t.catAxisMinorUnit;
		if (t.catAxisMinorTickMark && t.catAxisMinorTickMark !== "none" && x != null && Number.isFinite(x) && x > 0) {
			let a = t.catAxisMajorUnit != null && Number.isFinite(t.catAxisMajorUnit) && t.catAxisMajorUnit > 0 ? t.catAxisMajorUnit : y, l = Math.min(512, Math.ceil(i / x));
			for (let f = 1; f < l; f++) {
				let l = f * x;
				if (!(l < i)) break;
				if (Math.abs(l / a - Math.round(l / a)) < 1e-9) continue;
				let v = T(l, i, o, s), y = c === "vertical" ? n.project(d.x + v * d.w, m, h) : n.project(p, d.y + v * d.h, h);
				sn(e, t.catAxisMinorTickMark, y, r, _, g, c === "vertical" ? "vertical" : "horizontal", "minor", u);
			}
		}
	}
	e.setLineDash([]);
}
function pn(t, r, i, a, o) {
	if (!r.threeD) return !1;
	let s = r.chartType === "clusteredBar" || r.chartType === "clusteredBarH" || r.chartType.startsWith("stackedBar"), c = r.chartType.endsWith("H") || r.chartType.includes("BarH"), l = r.chartType.startsWith("stacked"), p = s && !l && r.threeD.barGrouping === "standard", { plot: h, legend: g, legendMeasure: _ } = Ht(t, r, i, a, c ? "horizontal" : "vertical", o), y = he(r.threeD, h, {
		sceneDepthScale: s ? p ? .65 : .1 : .4,
		perspectiveTangentGain: p ? 1 : 2,
		sceneHeightScale: !s && !(r.threeD.heightPercentAuthored ?? r.threeD.heightPercent != null) ? 1 / 3 : void 0
	});
	if (!y) return !0;
	y = _e(y, r.threeD, h);
	let b = r.chartType.endsWith("Pct"), x = r.series.find((e) => (e.categories?.length ?? 0) > 0)?.categories ?? r.categories, S = Math.max(1, x.length, ...r.series.map((e) => e.values.length)), C = b ? vt(r, S) : void 0, E = r.catAxisOrientation === "maxMin", D = r.catAxisCrossBetween === "between", O = r.dispBlanksAs ?? "gap", k = r.valAxisLogBase != null && Number.isFinite(r.valAxisLogBase) && r.valAxisLogBase >= 2, A = (e, t) => {
		let n = r.series[e]?.values[t];
		return n != null && Number.isFinite(n) && (!k || n > 0) || n == null && (l || O === "zero");
	}, j = (e, t) => yt(r, e, t, C), M = 0, N = 0;
	if (l) {
		for (let e = 0; e < S; e++) {
			let t = 0, n = 0;
			for (let i = 0; i < r.series.length; i++) {
				let r = j(i, e);
				r >= 0 ? t = bt(t, r) : n = bt(n, r);
			}
			M = Math.min(M, n), N = Math.max(N, t);
		}
		b && (M = M < 0 ? -100 : 0, N = N > 0 ? 100 : 0, M === 0 && N === 0 && (N = 1));
	} else {
		let e = Te(r.series.flatMap((e) => e.values).filter((e) => e != null && Number.isFinite(e) && (!k || e > 0)), k ? {
			min: 1,
			max: 10
		} : {
			min: 0,
			max: 1
		});
		M = k ? e.min : Math.min(0, e.min), N = k ? e.max : Math.max(0, e.max);
	}
	let P = c ? y.project(y.front.x, y.topology.axisY === "min" ? y.front.y : y.front.y + y.front.h, y.topology.nearDepth) : y.project(y.topology.axisX === "min" ? y.front.x : y.front.x + y.front.w, y.front.y, y.topology.nearDepth), F = c ? y.project(y.front.x + y.front.w, y.topology.axisY === "min" ? y.front.y : y.front.y + y.front.h, y.topology.nearDepth) : y.project(y.topology.axisX === "min" ? y.front.x : y.front.x + y.front.w, y.front.y + y.front.h, y.topology.nearDepth), I = Math.hypot(F.x - P.x, F.y - P.y) / a, L = Xt(r, M, N, I, b, c ? "horizontal" : "vertical"), R = (e) => Number.isFinite(e) ? Math.max(L.min, Math.min(L.max, e)) : L.min;
	s || rn(t, r, y, L, c ? "horizontal" : "vertical", S, D, E, a);
	let { front: z } = y, B = Math.max(1, r.series.length), V = [], H = r.series.map((e) => new Map(e.dataPointOverrides?.map((e) => [e.idx, e]) ?? [])), ee = r.series.map((e) => new Map(e.dataLabelOverrides?.map((e) => [e.idx, e]) ?? []));
	if (s) {
		let n = y.prismInterval(0, 1, !0), s = [], u = Array(S).fill(0), d = Array(S).fill(0), f = (c ? z.h : z.w) / S, m = r.barGapWidth != null && Number.isFinite(r.barGapWidth) && r.barGapWidth >= 0 ? r.barGapWidth : 150;
		for (let e = 0; e < r.series.length; e++) {
			let t = r.series[e], i = p ? y.prismInterval(e, B, !1) : n, o = xe(f, m, p ? 0 : e, p ? 1 : B, l || p);
			for (let n = 0; n < S; n++) {
				if (!A(e, n)) continue;
				let p = j(e, n), m = Q(r, t, H[e].get(n), n, e), h = m.fill === null ? "transparent" : m.color, g = m.lineFill !== null && (m.lineColor != null || m.lineFill !== void 0), _ = l ? p >= 0 ? u[n] : d[n] : 0, v = bt(_, p);
				l && (p >= 0 ? u[n] = v : d[n] = v);
				let y = R(_), x = R(v), C = t.threeDShape ?? r.threeD.shape ?? "box", w = C === "cone" || C === "pyramid", T = C === "coneToMax" || C === "pyramidToMax", D = (e) => {
					if (!w) return 1;
					let t = k && !(_ > 0) ? L.min : _, n = L.fraction(t), r = L.fraction(v), i = L.fraction(e), a = r - n;
					return a === 0 || !Number.isFinite(a) || !Number.isFinite(i - n) ? +(e === t) : Math.max(0, Math.min(1, 1 - (i - n) / a));
				}, O = (e) => {
					if (!T) return 1;
					let t = v >= _ ? L.max : L.min, n = k ? L.min : 0, r = L.fraction(t), i = L.fraction(n), a = L.fraction(e), o = Math.abs(r - i);
					return !(o > 0) || ![
						r,
						i,
						a
					].every(Number.isFinite) ? pe(e, L.min, L.max) : Math.max(0, Math.min(1, Math.abs(r - a) / o));
				}, M = T ? O(y) : D(y), N = T ? O(x) : D(x);
				if (c) {
					let t = z.x + L.fraction(y) * z.w, r = z.x + L.fraction(x) * z.w, c = E ? S - 1 - n : n, l = z.y + c * f + o.offset;
					s.push({
						x: Math.min(t, r),
						y: l,
						width: Math.abs(r - t),
						height: o.size,
						nearDepth: i.near,
						farDepth: i.far,
						categoryIndex: n,
						seriesIndex: e,
						color: h,
						fillPaint: m.fill,
						lineFill: m.lineFill,
						shape: C,
						baseCoord: t,
						endCoord: r,
						baseScale: M,
						endScale: N,
						omitBaseCap: !1,
						omitEndCap: !1,
						outline: g,
						outlineColor: m.lineColor ?? "rgba(0,0,0,0.42)",
						outlineWidth: m.lineWidthEmu == null ? .75 * a / ue : mt(m.lineWidthEmu, a),
						outlineDash: m.lineDash ?? "solid",
						outlineCustomDash: m.lineCustomDash,
						outlineCap: m.lineCap,
						outlineJoin: m.lineJoin,
						labelValue: b ? p / 100 : p,
						plottedLabelValue: v
					});
				} else {
					let t = z.y + z.h - L.fraction(y) * z.h, r = z.y + z.h - L.fraction(x) * z.h, c = E ? S - 1 - n : n, l = z.x + c * f + o.offset;
					s.push({
						x: l,
						y: Math.min(t, r),
						width: o.size,
						height: Math.abs(r - t),
						nearDepth: i.near,
						farDepth: i.far,
						categoryIndex: n,
						seriesIndex: e,
						color: h,
						fillPaint: m.fill,
						lineFill: m.lineFill,
						shape: C,
						baseCoord: t,
						endCoord: r,
						baseScale: M,
						endScale: N,
						omitBaseCap: !1,
						omitEndCap: !1,
						outline: g,
						outlineColor: m.lineColor ?? "rgba(0,0,0,0.42)",
						outlineWidth: m.lineWidthEmu == null ? .75 * a / ue : mt(m.lineWidthEmu, a),
						outlineDash: m.lineDash ?? "solid",
						outlineCustomDash: m.lineCustomDash,
						outlineCap: m.lineCap,
						outlineJoin: m.lineJoin,
						labelValue: b ? p / 100 : p,
						plottedLabelValue: v
					});
				}
			}
		}
		if (l) {
			let e = ht(s, S);
			for (let t = 0; t < S; t++) {
				let n = e[t];
				for (let e of [-1, 1]) {
					let t = n.filter((t) => Math.sign(t.labelValue) === e && !Dt(t.color) && Math.abs(t.endCoord - t.baseCoord) > 1e-9).sort((e, t) => e.seriesIndex - t.seriesIndex);
					for (let e = 0; e + 1 < t.length; e++) {
						let n = t[e], r = t[e + 1], i = 1e-8 * Math.max(1, Math.abs(n.endCoord), Math.abs(r.baseCoord));
						n.shape !== r.shape || Math.abs(n.endCoord - r.baseCoord) > i || Math.abs(n.endScale - r.baseScale) > 1e-9 || n.nearDepth !== r.nearDepth || n.farDepth !== r.farDepth || (n.omitEndCap = !0, r.omitBaseCap = !0);
					}
				}
				let r = n.find((e) => e.labelValue > 0 && !Dt(e.color)), i = n.find((e) => e.labelValue < 0 && !Dt(e.color));
				if (r && i) {
					let e = 1e-8 * Math.max(1, Math.abs(r.baseCoord), Math.abs(i.baseCoord));
					r.shape === i.shape && Math.abs(r.baseCoord - i.baseCoord) <= e && Math.abs(r.baseScale - i.baseScale) <= 1e-9 && r.nearDepth === i.nearDepth && r.farDepth === i.farDepth && (r.omitBaseCap = !0, i.omitBaseCap = !0);
				}
			}
		}
		rn(t, r, y, L, c ? "horizontal" : "vertical", S, D, E, a);
		let h = {
			remaining: Ke,
			exceeded: !1
		}, g = s.map((e) => {
			let n = At(y, e.shape, c, e.x, e.y, e.width, e.height, e.baseCoord, e.endCoord, e.nearDepth, e.farDepth, e.color, e.baseScale, e.endScale, e.omitBaseCap, e.omitEndCap, e.outline && e.outlineColor ? {
				color: e.outlineColor,
				width: e.outlineWidth,
				dash: ae(e.outlineCustomDash, e.outlineDash, e.outlineWidth),
				cap: e.outlineCap,
				join: e.outlineJoin
			} : void 0, h);
			return Ft(t, n, "fill", e.fillPaint, o), Ft(t, n, "outline", e.lineFill, o), {
				item: e,
				faces: n
			};
		}), _ = g.flatMap((e) => e.faces);
		if (h.exceeded) return It(t, i), !0;
		for (let e of Ge(_)) Nt(t, e);
		for (let { item: n, faces: i } of g) {
			let o = r.series[n.seriesIndex], s = H[n.seriesIndex].get(n.categoryIndex), c = De(r, o, n.categoryIndex, n.seriesIndex), l = e(s?.chartexStyle), u = e(o.chartexStyle);
			ne(t, l ?? u, q(r, "dataPoint3D", n.seriesIndex), l ? n.categoryIndex : c, a, (e) => Pt(e, i), c);
		}
		for (let e of s) {
			let n = r.series[e.seriesIndex], s = c ? y.project(e.endCoord, e.y + e.height / 2, (e.nearDepth + e.farDepth) / 2) : y.project(e.x + e.width / 2, e.endCoord, (e.nearDepth + e.farDepth) / 2), l = ee[e.seriesIndex].get(e.categoryIndex);
			Vt(r, n, l) && V.push(() => Bt(t, r, n, e.seriesIndex, e.categoryIndex, e.labelValue, s, i, a, 0, void 0, l, "t", s, !0, r.valAxisDisplayUnits, L.max, e.plottedLabelValue, o));
		}
	} else {
		let e = r.series.map(() => Array(S).fill(0)), s = r.series.map(() => Array(S).fill(0));
		if (l) {
			let t = Array(S).fill(0), n = Array(S).fill(0);
			for (let i = 0; i < r.series.length; i++) for (let r = 0; r < S; r++) {
				let a = j(i, r), o = a >= 0 ? t[r] : n[r];
				e[i][r] = o, s[i][r] = bt(o, a), a >= 0 ? t[r] = bt(t[r], a) : n[r] = bt(n[r], a);
			}
		}
		let c = (e) => {
			let t = y.seriesDepth(e, B, l), n = 0, r = 0;
			for (let i = 0; i < S; i++) {
				if (!A(e, i)) continue;
				let a = l ? s[e][i] : j(e, i), o = z.x + T(i, S, D, E) * z.w, c = z.y + z.h - L.fraction(R(a)) * z.h;
				n += y.cameraDepth(o, c, t), r++;
			}
			return r > 0 ? n / r : -Infinity;
		}, d = r.series.map((e, t) => t).sort((e, t) => c(e) - c(t) || t - e), f = r.series.map((e, t) => Q(r, e, void 0, t, t)), p = [], h = [], g = !1;
		for (let c of d) {
			if (g) break;
			let d = r.series[c], _ = f[c], v = _.fill === null ? "transparent" : _.color, x = l ? y.prismInterval(0, 1, !0) : y.prismInterval(c, B, !1), C = z.x + z.w / 2, w = z.y + z.h / 2, k = y.cameraDepth(C, w, x.near) >= y.cameraDepth(C, w, x.far) ? x.near : x.far, M = [], N = [], P = [], F = [], I = [], R = [], U = [], te = [], W = [], G = [];
			for (let t = 0; t < S; t++) {
				if (!A(c, t)) {
					M.push(null), N.push(null), P.push(null), F.push(null), I.push(null), R.push(null), U.push(null), te.push(null), W.push(null), G.push(null);
					continue;
				}
				let n = l ? s[c][t] : j(c, t), i = l ? e[c][t] : 0, a = z.x + T(t, S, D, E) * z.w, o = L.fraction(n), u = L.fraction(i), d = Number.isFinite(u) ? u : i <= L.min ? 0 : 1, f = Number.isFinite(o) && o >= 0 && o <= 1, p = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : n <= L.min ? 0 : 1, m = z.y + z.h - p * z.h, h = z.y + z.h - Math.max(0, Math.min(1, d)) * z.h;
				M.push(r.chartType.toLowerCase().includes("area") || f ? y.project(a, m, k) : null), N.push(y.project(a, h, k)), P.push(f ? y.cameraDepth(a, m, k) : null), F.push(y.cameraDepth(a, h, k)), I.push(n), R.push(a), U.push(m), te.push(h), W.push(o), G.push(d);
			}
			let K = [], q = null;
			for (let e = 0; e < M.length; e++) {
				let t = M[e], n = N[e];
				if (!t || !n) {
					O === "gap" && (q && K.push(q), q = null);
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
				}, q.upper.push(t), q.lower.push(n), q.upperDepths.push(P[e] ?? 0), q.lowerDepths.push(F[e] ?? 0), q.indices.push(e), q.sceneXs.push(R[e] ?? 0), q.upperYs.push(U[e] ?? 0), q.lowerYs.push(te[e] ?? 0), q.upperFractions.push(W[e] ?? 0), q.lowerFractions.push(G[e] ?? 0);
			}
			q && K.push(q);
			let J = [], ne = [];
			if (r.chartType.toLowerCase().includes("area")) {
				for (let e of K) {
					let n = null;
					for (let r = 0; r + 1 < e.upper.length; r++) {
						let i = ze(e.lowerFractions[r], e.lowerFractions[r + 1], e.upperFractions[r], e.upperFractions[r + 1]);
						for (let a = 0; a < i.length; a++) {
							let o = i[a], s = e.sceneXs[r] + (e.sceneXs[r + 1] - e.sceneXs[r]) * o.startT, c = e.sceneXs[r] + (e.sceneXs[r + 1] - e.sceneXs[r]) * o.endT, l = z.y + z.h - o.lowerStart * z.h, u = z.y + z.h - o.lowerEnd * z.h, d = z.y + z.h - o.upperStart * z.h, f = z.y + z.h - o.upperEnd * z.h, m = {
								...y.project(s, d, k),
								cameraDepth: y.cameraDepth(s, d, k),
								cameraWeight: y.cameraProjectionWeight(s, d, k)
							}, h = {
								...y.project(c, f, k),
								cameraDepth: y.cameraDepth(c, f, k),
								cameraWeight: y.cameraProjectionWeight(c, f, k)
							};
							n != null && Math.hypot(n.at(-1).x - m.x, n.at(-1).y - m.y) <= 1e-8 ? n.push(h) : (n && n.length >= 2 && J.push(n), n = [m, h]);
							let _ = kt(y, s, c, l, u, d, f, x.near, x.far, v, r === 0 && a === 0 && o.startT === 0, r + 2 === e.upper.length && a + 1 === i.length && o.endT === 1);
							for (let e of _) {
								if (p.length >= 1e4) {
									g = !0;
									break;
								}
								p.push({
									points: e.points,
									cameraDepth: e.cameraDepth,
									cameraDepths: e.cameraDepths,
									cameraWeights: e.cameraWeights,
									layer: 0,
									paint: () => Nt(t, e)
								}), ne.push(e);
							}
							if (g) break;
						}
						if (g) break;
					}
					if (n && n.length >= 2 && J.push(n), g) break;
				}
				Ft(t, ne, "fill", _.fill, o);
			}
			let Y = [];
			if (!r.chartType.toLowerCase().includes("area")) {
				let e = [], t = null;
				for (let n = 0; n < S; n++) {
					let r = I[n], i = r == null ? NaN : L.fraction(r);
					if (r == null || !Number.isFinite(i)) {
						O === "gap" && t && (e.push(t), t = null);
						continue;
					}
					t ??= [], t.push({
						x: z.x + T(n, S, D, E) * z.w,
						fraction: i,
						ownerIndex: n
					});
				}
				t && e.push(t);
				let n = (e) => {
					let t = Math.max(0, Math.min(1, e.fraction)), n = z.y + z.h - t * z.h;
					return {
						...y.project(e.x, n, k),
						cameraDepth: y.cameraDepth(e.x, n, k),
						cameraWeight: y.cameraProjectionWeight(e.x, n, k)
					};
				}, r = (e) => {
					e && e.path.length >= 2 && Y.push(e);
				};
				for (let t of e) {
					if (t.length < 2) continue;
					let e = [t[0]];
					for (let n = 0; n + 1 < t.length; n++) {
						let r = t[n - 1] ?? t[n], i = t[n], a = t[n + 1], o = t[n + 2] ?? a;
						if (d.smooth !== !0 || t.length < 3) {
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
						let o = e[t], s = e[t + 1], c = (e) => y.project(e.x, z.y + z.h - e.fraction * z.h, k), l = c(o), u = c(s), d = Math.hypot(u.x - l.x, u.y - l.y), f = Number.isFinite(d) ? d : Math.hypot(s.x - o.x, (s.fraction - o.fraction) * z.h), p = Re(o.fraction, s.fraction);
						if (!p || p.endT - p.startT <= 1e-12) {
							r(i), i = null, a += f;
							continue;
						}
						let m = (e) => ({
							x: o.x + (s.x - o.x) * e,
							fraction: o.fraction + (s.fraction - o.fraction) * e,
							ownerIndex: s.ownerIndex
						}), h = c(m(p.startT)), g = Math.hypot(h.x - l.x, h.y - l.y), _ = n(m(p.startT)), v = n(m(p.endT)), b = m(p.startT), x = m(p.endT), S = (e) => ({
							x: e.x,
							y: z.y + z.h - Math.max(0, Math.min(1, e.fraction)) * z.h
						});
						i != null && Math.hypot(i.path.at(-1).x - _.x, i.path.at(-1).y - _.y) <= 1e-8 && i.ownerIndex === s.ownerIndex ? (i.path.push(v), i.modelPath.push(S(x)), i.endClipped = t + 1 < e.length - 1 || p.endT < 1) : (r(i), i = {
							path: [_, v],
							modelPath: [S(b), S(x)],
							ownerIndex: s.ownerIndex,
							startClipped: t > 0 || p.startT > 0,
							endClipped: t + 1 < e.length - 1 || p.endT < 1,
							dashOffset: a + (Number.isFinite(g) ? g : f * p.startT)
						}), a += f;
					}
					r(i);
				}
			}
			let re = r.chartType.toLowerCase().includes("area"), ie = d.lineHidden != null || d.lineColor != null || d.lineWidthEmu != null || d.chartexStyle?.lineHidden != null || d.chartexStyle?.lineColors?.some(Boolean) || d.chartexStyle?.lineWidthEmu != null || d.chartexStyle?.lineDash != null || d.chartexStyle?.lineCap != null || d.chartexStyle?.lineJoin != null || _.lineColor != null || _.lineFill !== void 0;
			if (!re || _.lineFill !== null && ie) {
				let e = /* @__PURE__ */ new Map(), n = (t) => {
					let n = H[c].get(t);
					if (!Ct(n)) return _;
					let i = e.get(t);
					return i || (i = Q(r, d, n, t, c), e.set(t, i)), i;
				}, i = /* @__PURE__ */ new Map(), s = {
					remaining: Ke,
					exceeded: !1
				}, l = (e, n, r, o = r, c = 0, l) => {
					if (n.lineFill === null) return;
					let u = n === _ ? v : n.color, d = n.lineColor ?? Ce(u, .7), f = n.lineWidthEmu ? Math.max(.5, n.lineWidthEmu / X) * a : re ? .75 * a : Math.max(1, 2 * a), m = {
						width: f,
						dash: ae(n.lineCustomDash, n.lineDash, f),
						dashOffset: c,
						lineCap: n.lineCap,
						startCap: r,
						endCap: o,
						lineJoin: n.lineJoin
					};
					if (!re && l && l.length >= 2) {
						let e = et(l.map((e) => ({
							...e,
							cameraDepth: 0,
							cameraWeight: 1
						})), m);
						if (e == null) {
							g = !0;
							return;
						}
						let r = i.get(n) ?? [];
						for (let n of e) {
							let e = Ie({
								outline: n.points,
								nearDepth: x.near,
								farDepth: x.far
							});
							if (!e) continue;
							let i = jt(y, e, d, void 0, s).map((e) => ({
								...e,
								paintRole: "outline"
							}));
							if (s.exceeded) {
								g = !0;
								return;
							}
							r.push(...i);
							for (let e of i) p.push({
								points: e.points,
								cameraDepth: e.cameraDepth,
								cameraDepths: e.cameraDepths,
								cameraWeights: e.cameraWeights,
								layer: 1,
								paint: () => Nt(t, e)
							});
						}
						i.set(n, r);
						return;
					}
					let h = et(e, m);
					if (h == null) {
						g = !0;
						return;
					}
					if (p.length + h.length > 1e4) {
						g = !0;
						return;
					}
					for (let e of h) {
						let r = {
							points: e.points,
							color: d,
							paintRole: "outline",
							shade: 0,
							cameraDepth: e.cameraDepth,
							cameraDepths: e.cameraDepths,
							cameraWeights: e.cameraWeights,
							outline: !1
						}, a = i.get(n) ?? [];
						a.push(r), i.set(n, a), p.push({
							points: e.points,
							cameraDepth: e.cameraDepth,
							cameraDepths: e.cameraDepths,
							cameraWeights: e.cameraWeights,
							layer: 1,
							paint: () => Nt(t, r)
						});
					}
				};
				if (re) for (let e of J) l(e, _, _.lineCap);
				else for (let e of Y) {
					let t = n(e.ownerIndex);
					l(e.path, t, e.startClipped ? "butt" : t.lineCap, e.endClipped ? "butt" : t.lineCap, e.dashOffset, e.modelPath);
				}
				for (let [e, n] of i) Ft(t, n, "outline", e.lineFill, o);
			}
			let oe = (re ? d.showMarker === !0 || n(d) : d.showMarker === !0) && d.markerSymbol !== "none";
			if ((r.chartType.toLowerCase().includes("line") || re) && (oe || m(d))) for (let e = 0; e < M.length; e++) {
				let n = M[e];
				if (!n) continue;
				let i = H[c].get(e), s = u(d, i, "circle", oe);
				if (s === "none") continue;
				let l = i?.markerSize ?? d.markerSize ?? 5, f = Kt(r, d, i, e, c, d.color ?? ut[c % ut.length], a);
				h.push(() => zt(t, n, s, Math.max(2, l) * a, f.fill === "00000000" ? "transparent" : `#${f.fill.replace(/^#/, "")}`, f.line === "00000000" ? "rgba(0,0,0,0)" : `#${f.line.replace(/^#/, "")}`, f.lineWidth, f.fillPaint, o, a, f.effectDirect, f.effectFallback, f.effectIndex, f.effectFallbackIndex, f.linePaint, f.lineDash, f.lineCustomDash, f.lineCap, f.lineJoin));
			}
			for (let e = 0; e < M.length; e++) {
				let n = M[e];
				if (!n) continue;
				let u = j(c, e), f = H[c].get(e), p = f?.markerSize ?? d.markerSize ?? 5, m = ee[c].get(e);
				Vt(r, d, m) && V.push(() => Bt(t, r, d, c, e, b ? u / 100 : u, n, i, a, d.showMarker === !0 || f?.markerSymbol != null ? p * a / 2 : 0, void 0, m, "t", n, !0, r.valAxisDisplayUnits, L.max, l ? s[c][e] : u, o));
			}
		}
		if (g) return It(t, i), !0;
		for (let e of Ge(p)) e.paint();
		for (let e of h) e();
	}
	an(t, r, y, L, S, D, E, a, c ? "horizontal" : "vertical"), fn(t, r, y, L, S, D, E, c ? "horizontal" : "vertical", s, a), Gt(t, r, i, y, L, S, D, E, c ? "horizontal" : "vertical", s, a);
	let U = dn(r, y, L, S, D, E, c ? "horizontal" : "vertical"), te = (e, t) => {
		if (t !== "low" && t !== "high") return U;
		let n = y.topology.nearDepth, r = U.axisX, i = U.axisY;
		if (e === "value" === c) {
			let e = z.y, r = z.y + z.h, a = y.project(z.x + z.w / 2, e, n), o = y.project(z.x + z.w / 2, r, n), s = a.y >= o.y ? e : r;
			i = t === "low" ? s : s === e ? r : e;
		} else {
			let e = z.x, i = z.x + z.w, a = y.project(e, z.y + z.h / 2, n), o = y.project(i, z.y + z.h / 2, n), s = a.x <= o.x ? e : i;
			r = t === "low" ? s : s === e ? i : e;
		}
		return {
			axisX: r,
			axisY: i,
			depth: n,
			horizontalStart: y.project(z.x, i, n),
			horizontalEnd: y.project(z.x + z.w, i, n),
			verticalStart: y.project(r, z.y + z.h, n),
			verticalEnd: y.project(r, z.y, n)
		};
	}, W = te("value", r.valAxisTickLabelPos), G = te("category", r.catAxisTickLabelPos), K = v(r.valAxisFontSizeHpt, a) ?? 9 * a;
	if (t.font = `${r.valAxisFontItalic ? "italic " : ""}${r.valAxisFontBold ? "bold " : ""}${K}px ${Tt(r.valAxisFontFace)}`, t.fillStyle = r.valAxisFontColor ? `#${r.valAxisFontColor}` : "#595959", t.textAlign = c ? "center" : "right", t.textBaseline = c ? "top" : "middle", !r.valAxisHidden && r.valAxisTickLabelPos !== "none") {
		let { axisX: e, axisY: n, depth: i } = W, o = y.project(z.x + z.w / 2, z.y + z.h / 2, i), s = on(c ? W.horizontalStart : W.verticalStart, c ? W.horizontalEnd : W.verticalEnd, o, c ? "vertical" : "horizontal");
		t.textAlign = Math.abs(s.x) < .2 ? "center" : s.x < 0 ? "right" : "left", t.textBaseline = Math.abs(s.y) < .2 ? "middle" : s.y < 0 ? "bottom" : "top";
		let l = un(r.valAxisMajorTickMark, r.valAxisLineHidden, a, 5), u = r.valAxisDisplayUnits?.divisor;
		for (let a of L.majorTicks) {
			let o = c ? y.project(z.x + L.fraction(a) * z.w, n, i) : y.project(e, z.y + z.h - L.fraction(a) * z.h, i);
			t.fillText(w(b ? a / 100 : u != null && Number.isFinite(u) && u > 0 ? a / u : a, b ? r.valAxisFormatCode ?? "0%" : r.valAxisFormatCode, r.date1904), o.x + s.x * l, o.y + s.y * l);
		}
	}
	let J = v(r.catAxisFontSizeHpt, a) ?? 9 * a;
	if (t.font = `${r.catAxisFontItalic ? "italic " : ""}${r.catAxisFontBold ? "bold " : ""}${J}px ${Tt(r.catAxisFontFace)}`, t.fillStyle = r.catAxisFontColor ? `#${r.catAxisFontColor}` : "#595959", !r.catAxisHidden && r.catAxisTickLabelPos !== "none") {
		let e = f(un(r.catAxisMajorTickMark, r.catAxisLineHidden, a, 6), r.catAxisLabelOffsetPercent), n = Array.from({ length: S }, (e, t) => d(String(x[t] ?? t + 1), r.catAxisFormatCode, r.date1904)), i = Lt(r);
		if (i == null && (i = 0, !c && S > 1)) {
			let e = Infinity, r = null, a = G.axisY;
			for (let t = 0; t < S; t++) {
				let n = T(t, S, D, E), i = y.project(z.x + n * z.w, a, y.topology.nearDepth);
				r && (e = Math.min(e, Math.hypot(i.x - r.x, i.y - r.y))), r = i;
			}
			Math.max(0, ...n.map((e) => t.measureText(e).width)) > e * .9 && (i = -Math.PI / 4);
		}
		let o = Math.max(1, Math.floor(r.catAxisTickLabelSkip ?? 1));
		for (let r = 0; r < S; r += o) {
			let a = T(r, S, D, E), { axisX: o, axisY: s, depth: l } = G, u = c ? y.project(o, z.y + T(r, S, D, E) * z.h, l) : y.project(z.x + a * z.w, s, l);
			if (c) {
				let i = y.project(o, z.y + z.h / 2, l), a = y.project(z.x + z.w / 2, z.y + z.h / 2, l), s = i.x <= a.x;
				t.textAlign = s ? "right" : "left", t.textBaseline = "middle", t.fillText(n[r], u.x + (s ? -e : e), u.y);
			} else {
				let a = y.project(z.x + z.w / 2, z.y + z.h / 2, l), o = on(G.horizontalStart, G.horizontalEnd, a, "vertical");
				Rt(t, n[r], u, i, c, o.y < 0 ? -1 : 1, e);
			}
		}
	}
	Wt(t, r, i, h, c, a);
	for (let e of V) e();
	return Yt(t, r, g, a, !1, _, o), !0;
}
function mn(t, n, r, i, a) {
	if (!n.threeD || n.chartType !== "pie") return !1;
	let o = n.series[0];
	if (!o) return !0;
	let s = o.values.flatMap((e, t) => e != null && Number.isFinite(e) ? [{
		index: t,
		value: Math.abs(e)
	}] : []), c = 0;
	for (let e of s) c = Math.max(c, e.value);
	if (!(c > 0)) return !0;
	let l = s.reduce((e, t) => e + t.value / c, 0);
	if (!(l > 0) || !Number.isFinite(l)) return !0;
	let { plot: u, legend: d, legendMeasure: f } = Ht(t, n, r, i, "radial", a), p = he({
		...n.threeD,
		rotationY: n.threeD.rotationY ?? 0,
		heightPercent: void 0,
		depthPercent: 100
	}, u, {
		sceneDepthScale: 1,
		sceneHeightScale: .15
	});
	if (!p) return !0;
	let m = new Map(o.dataPointOverrides?.map((e) => [e.idx, e]) ?? []), h = 0;
	for (let e of m.values()) e.explosion != null && Number.isFinite(e.explosion) && (h = Math.max(h, Math.max(0, Math.min(100, e.explosion)) / 100));
	let { scene: g } = p, _ = Math.min(g.w * .45 / (1 + h), p.modelDepth * .45 / (1 + h), g.h / .45);
	if (!(_ > 0)) return !0;
	let y = g.x + g.w / 2, b = g.y + g.h / 2, x = .5, S = _ * .3 * be(n.threeD), w = 0, T = [], E = new Map(o.dataLabelOverrides?.map((e) => [e.idx, e]) ?? []), D = Math.max(48, Math.min(128, Math.ceil(Math.PI * 2 * _ / 4)));
	for (let e of s) {
		let t = e.value / c / l, r = Zt(n.firstSliceAngle, w, t), i = m.get(e.index), a = Q(n, o, i, e.index, 0), s = r.middle, u = i?.explosion != null && Number.isFinite(i.explosion) ? Math.max(0, Math.min(100, i.explosion)) / 100 : 0, d = y + Math.cos(s) * _ * u, f = x + Math.sin(s) * _ * u / p.modelDepth, h = Math.max(2, Math.ceil(D * t)), g = Le({
			centerX: d,
			centerY: b,
			centerDepth: f,
			radius: _,
			modelDepth: p.modelDepth,
			thickness: S,
			startAngle: r.start,
			endAngle: r.end,
			segments: h
		});
		if (!g) {
			w += t;
			continue;
		}
		T.push({
			index: e.index,
			start: r.start,
			end: r.end,
			color: a.fill === null ? "transparent" : a.color,
			fillPaint: a.fill,
			value: e.value,
			percentValue: t,
			centerX: d,
			centerDepth: f,
			segments: h,
			mesh: g,
			lineColor: a.lineColor,
			lineFill: a.lineFill,
			lineWidthEmu: a.lineWidthEmu ?? null,
			lineDash: a.lineDash ?? "solid",
			lineCustomDash: a.lineCustomDash,
			lineCap: a.lineCap,
			lineJoin: a.lineJoin
		}), w += t;
	}
	p = Se(p, T.flatMap((e) => e.mesh.vertices), u, .08);
	let O = [], k = {
		remaining: Ke,
		exceeded: !1
	}, A = (e) => {
		let t = e.lineWidthEmu == null ? .75 * i : Math.max(.25, e.lineWidthEmu / X * i);
		return e.lineFill !== null && (e.lineColor != null || e.lineFill !== void 0) ? {
			color: e.lineColor ?? "rgba(0,0,0,0.42)",
			width: t,
			dash: ae(e.lineCustomDash, e.lineDash, t),
			cap: e.lineCap,
			join: e.lineJoin
		} : void 0;
	}, j = T.map((e) => {
		let n = jt(p, e.mesh, e.color, void 0, k);
		return Ft(t, n, "fill", e.fillPaint, a), {
			slice: e,
			faces: n
		};
	}), M = j.flatMap((e) => e.faces), N = [], P = T.map(A), F = P[0], I = (e) => e == null ? null : [
		e.color,
		e.width,
		e.dash.join(","),
		e.cap,
		e.join
	].join("|"), L = F != null && T.every((e) => e.lineFill === void 0) && P.every((e) => I(e) === I(F)) && T.every((e) => Math.abs(e.centerX - y) < 1e-9 && Math.abs(e.centerDepth - x) < 1e-9);
	if (L) N.push(...Mt(p, T, b, _, S, F, k));
	else for (let e = 0; e < T.length; e++) {
		let n = P[e];
		if (!n) continue;
		let r = jt(p, T[e].mesh, "transparent", n, k, !0);
		Ft(t, r, "outline", T[e].lineFill, a), N.push(...r);
	}
	if (k.exceeded) return It(t, r), !0;
	if (L) {
		for (let e of Ge(M)) Nt(t, e);
		for (let e of Ge(N)) Nt(t, e);
	} else for (let e of Ge([...M, ...N])) Nt(t, e);
	for (let { slice: r, faces: a } of j) {
		let s = m.get(r.index), c = De(n, o, r.index, 0), l = e(s?.chartexStyle);
		ne(t, l ?? e(o.chartexStyle), q(n, "dataPoint3D", 0), l ? r.index : c, i, (e) => Pt(e, a), c);
	}
	for (let e of T) {
		let r = (e.start + e.end) / 2, s = E.get(e.index);
		if (Vt(n, o, s)) {
			let c = o.seriesDataLabels, l = v(s?.fontSizeHpt ?? c?.fontSizeHpt ?? n.dataLabelFontSizeHpt, i) ?? 9 * i;
			t.font = `${s?.fontBold ?? c?.fontBold ?? n.dataLabelFontBold ? "bold " : ""}${l}px ${$(n, s?.fontFace ?? c?.fontFace ?? n.dataLabelFontFace)}`;
			let d = C({
				customText: s?.text,
				showCategory: s?.showCatName ?? c?.showCatName ?? !1,
				showSeries: s?.showSerName ?? c?.showSerName ?? !1,
				showValue: s?.showVal ?? c?.showVal ?? n.showDataLabels,
				showPercent: s?.showPercent ?? c?.showPercent ?? !1,
				category: o.categories?.[e.index] ?? n.categories[e.index] ?? `${e.index + 1}`,
				seriesName: o.name || "Series 1",
				sourceValue: e.value,
				percentRatio: e.percentValue,
				formatCode: s?.formatCode ?? c?.formatCode ?? n.dataLabelFormatCode ?? o.valFormatCode,
				separator: s?.separator ?? c?.separator,
				date1904: n.date1904
			}), f = $(n, s?.fontFace ?? c?.fontFace ?? n.dataLabelFontFace), m = s?.text && s.richRuns?.length ? ge(t, {
				runs: s.richRuns,
				ptToPx: i,
				fontFamily: f,
				fallbackBold: s.fontBold ?? c?.fontBold ?? n.dataLabelFontBold ?? !1,
				fontFamilyForFace: (e) => $(n, e)
			}, l, `#${s.fontColor ?? c?.fontColor ?? o.labelColor ?? n.dataLabelFontColor ?? "111111"}`) : null, h = s?.position ?? c?.position ?? n.dataLabelPosition, g = b - S / 2, y = b + S / 2, x = p.cameraDepth(e.centerX, g, e.centerDepth) >= p.cameraDepth(e.centerX, y, e.centerDepth) ? g : y, w = 0, T = null;
			for (let t = 0; t <= 12; t++) {
				let n = e.start + (e.end - e.start) * t / 12, r = p.project(e.centerX + Math.cos(n) * _ * .64, x, e.centerDepth + Math.sin(n) * _ * .64 / p.modelDepth);
				T && (w += Math.hypot(r.x - T.x, r.y - T.y)), T = r;
			}
			let E = (h == null || h === "bestFit") && (e.percentValue === 0 || w < (m?.width ?? t.measureText(d).width)) || h === "outEnd", D = _ * (E ? 1.12 : .64), k = p.project(e.centerX + Math.cos(r) * D, x, e.centerDepth + Math.sin(r) * D / p.modelDepth), A = p.project(e.centerX + Math.cos(r) * _, x, e.centerDepth + Math.sin(r) * _ / p.modelDepth);
			O.push(() => Bt(t, n, o, 0, e.index, e.value, k, u, i, 0, e.percentValue, s, "ctr", A, E, void 0, void 0, void 0, a));
		}
	}
	for (let e of O) e();
	let R = o.categories?.length ? o.categories : n.categories, z = Array.from({ length: R.length }, (e, t) => {
		let r = m.get(t), i = Oe(n, o, r, t, 0);
		if (i === null) return "00000000";
		let a = i?.fillType === "solid" ? i.color : r?.color ?? o.dataPointColors?.[t] ?? o.color;
		return a === "00000000" ? "00000000" : Ce(a ? `#${a}` : gt(t), .8).replace(/^#/, "");
	});
	return Yt(t, {
		...n,
		categories: R,
		series: [{
			...o,
			categories: R,
			dataPointColors: z
		}]
	}, d, i, !0, f, a), !0;
}
function hn(e, t, n, r, i = 0) {
	return !t.threeD || !(t.chartType === "pie" || pt.has(t.chartType)) ? !1 : xt(t) ? mn(e, t, n, r, i) ? !0 : pn(e, t, n, r, i) : (It(e, n), !0);
}
//#endregion
//#region src/three-d.ts
var gn = Ee({ render: hn }, "threeD");
//#endregion
export { gn as threeD };
