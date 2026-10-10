import { $r as e, Ar as t, Bi as n, Ci as r, Di as i, Dn as a, Ei as o, En as s, Hi as c, Ii as l, Ir as u, It as d, Jr as f, Ki as p, Kn as m, Li as h, Mr as g, On as _, Or as v, Qi as y, Qr as b, Ri as x, St as S, Ti as C, Ui as w, Wi as T, Xr as E, Xt as D, Yr as O, Yt as k, Zi as A, Zr as j, _i as M, bi as N, ci as P, cn as F, ea as I, ei as L, er as R, fn as z, gt as B, hi as V, i as H, ii as ee, kr as te, li as U, ln as ne, mi as W, oi as G, pi as K, ri as q, si as J, sn as re, t as ie, ti as ae, tr as oe, u as Y, ui as se, un as ce, xi as le, xt as ue, yi as de, zi as fe } from "./plot-area-frame-DvwuejI0.js";
import { a as pe, r as X } from "./units-DIk-8W6L.js";
import { _ as me, a as he, c as ge, i as _e, n as ve, o as ye, p as be, r as xe, s as Se, t as Ce, u as we, v as Te } from "./three-d-DzM4SQVr.js";
import { t as Ee } from "./renderer-module-contract-CNi9alZl.js";
//#region packages/core/src/chart/three-d-datum-style.ts
function De(e, t, n, r) {
	return A(e, r) ? n : t.chartexFormatIdx ?? r;
}
function Oe(e, t, r, i, a) {
	let o = De(e, t, i, a), s = p(e, "dataPoint3D", a), c = I(e, "dataPoint3D"), u = l(r?.chartexStyle, c, i);
	if (u !== void 0) return u;
	if (r?.fillHidden === !0) {
		let e = x(c);
		if (e !== void 0) return e;
	}
	if (r?.color === "00000000") return null;
	if (r?.color) return {
		fillType: "solid",
		color: r.color
	};
	let d = l(t.chartexStyle, c, o);
	return d === void 0 ? n(s, c, o, r?.chartexStyle, t.chartexStyle) : d;
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
	let r = M(t?.fontSizeHpt ?? e.legendFontSizeHpt, n) ?? 9 * n, i = t?.fontFace ?? e.legendFontFace, a = t?.fontBold ?? e.legendFontBold ?? !1;
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
], dt = D, ft = k, pt = new Set([
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
	let n = Number.isFinite(t) && t > 0 ? t / pe : 1, r = Number.isFinite(e) && e >= 0 ? e / X : 0;
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
		let t = g(e);
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
		let i = T(e, n, r);
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
function Q(e, t, n, r, i, a = !0) {
	let o = a && t.dataPointColors?.[r] ? `#${t.dataPointColors[r]}` : gt(i, t), s = A(e, i) ? r : t.chartexFormatIdx ?? i, l = t.seriesType ?? e.chartType, u = l === "line" || l === "stackedLine" || l === "stackedLinePct", d = p(e, "dataPoint3D", i), f = I(e, "dataPoint3D"), m, g = o, _ = Oe(e, t, n, r, i);
	_ !== void 0 && ({color: g, fill: m} = St(_, g));
	let v, b = null, x = h(n?.chartexStyle, f, r);
	if (x === void 0 && n?.lineHidden === !0 && (x = fe(f)), x !== void 0) x?.fillType === "solid" ? b = `#${x.color}` : v = x;
	else if (n?.lineColor) b = `#${n.lineColor}`;
	else {
		let e = h(t.chartexStyle, f, s);
		if (e === void 0 && t.lineHidden === !0 && (e = fe(f)), e !== void 0) e?.fillType === "solid" ? b = `#${e.color}` : v = e;
		else if (t.lineColor) b = `#${t.lineColor}`;
		else if (u) v = m === null ? null : m;
		else {
			let e = c(d, f, s, n?.chartexStyle, t.chartexStyle);
			e !== void 0 && (e?.fillType === "solid" ? b = `#${e.color}` : v = e);
		}
	}
	let S = u ? void 0 : d, C = n?.chartexStyle?.lineCap ?? t.chartexStyle?.lineCap ?? S?.lineCap, w = n?.chartexStyle?.lineJoin ?? t.chartexStyle?.lineJoin ?? S?.lineJoin, T = y(n?.lineDash == null ? n?.chartexStyle : {
		lineDash: n.lineDash,
		lineDashAuthored: !0
	}, t.chartexStyle, S);
	return {
		color: g,
		fill: m,
		lineColor: b,
		lineFill: v,
		lineWidthEmu: n?.lineWidthEmu ?? n?.chartexStyle?.lineWidthEmu ?? t.lineWidthEmu ?? t.chartexStyle?.lineWidthEmu ?? S?.lineWidthEmu,
		lineDash: T?.lineDash,
		lineCustomDash: T?.lineCustomDash,
		lineCap: C === "rnd" ? "round" : C === "sq" ? "square" : "butt",
		lineJoin: w === "round" || w === "bevel" ? w : "miter"
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
				color: we(n, wt(e, i)),
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
	t.paint !== null && (t.paint === void 0 ? Ot(e, t.points, t.color, t.shade) : (Et(e, t.points), e.fillStyle = t.paint, e.fill()), t.outline && (e.strokeStyle = t.outlineColor ?? "rgba(0,0,0,0.42)", e.lineWidth = t.outlineWidth ?? .75, e.setLineDash(oe(t.outlineDash ?? "solid", e.lineWidth)), e.lineCap = t.outlineCap ?? "butt", e.lineJoin = t.outlineJoin ?? "miter", t.outline && (Et(e, t.points), e.stroke()), e.setLineDash([])));
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
	let o = a.flatMap((e) => e.points), s = Math.min(...o.map((e) => e.x)), c = Math.max(...o.map((e) => e.x)), l = Math.min(...o.map((e) => e.y)), u = Math.max(...o.map((e) => e.y)), d = m(r, e, s, l, c - s, u - l, i);
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
function zt(e, t, n, r, i, o, s, c = void 0, l = 0, u = pe, d = void 0, f = void 0, p = 0, h = p, g = void 0, _ = void 0, v = void 0, y = void 0, b = void 0) {
	if (!(r > 0) || !Number.isFinite(t.x) || !Number.isFinite(t.y)) return;
	let x = r / 2;
	if (d !== void 0 || f !== void 0) {
		a(e, d, f, p, {
			x: t.x - x,
			y: t.y - x,
			w: r,
			h: r
		}, u, (e) => zt(e, t, n, r, i, o, s, c, l, u, void 0, void 0, 0, 0, g, _, v, y, b), h);
		return;
	}
	e.beginPath();
	let S = g === void 0 ? o : g == null ? null : g.fillType === "solid" ? `#${g.color}` : m(g, e, t.x - x, t.y - x, r, r, l);
	switch (S && (e.strokeStyle = S, e.lineWidth = s, e.setLineDash(R(v, _, s)), e.lineCap = y === "rnd" ? "round" : y === "sq" ? "square" : "butt", e.lineJoin = b === "round" || b === "bevel" ? b : "miter"), n) {
		case "square":
			e.rect(t.x - x, t.y - x, r, r);
			break;
		case "diamond":
			e.moveTo(t.x, t.y - x), e.lineTo(t.x + x, t.y), e.lineTo(t.x, t.y + x), e.lineTo(t.x - x, t.y), e.closePath();
			break;
		case "triangle":
			e.moveTo(t.x, t.y - x), e.lineTo(t.x + x, t.y + x), e.lineTo(t.x - x, t.y + x), e.closePath();
			break;
		case "x":
		case "plus": {
			let r = n === "x";
			e.moveTo(t.x - x, t.y + (r ? -x : 0)), e.lineTo(t.x + x, t.y + (r ? x : 0)), e.moveTo(t.x + (r ? -x : 0), t.y + x), e.lineTo(t.x + (r ? x : 0), t.y - x), S && e.stroke();
			return;
		}
		case "dash":
			e.rect(t.x - x, t.y - r * .1, r, r * .2);
			break;
		case "star":
			for (let n = 0; n < 10; n++) {
				let r = -Math.PI / 2 + n * Math.PI / 5, i = n % 2 == 0 ? x : x * .4, a = t.x + Math.cos(r) * i, o = t.y + Math.sin(r) * i;
				n ? e.lineTo(a, o) : e.moveTo(a, o);
			}
			e.closePath();
			break;
		case "dot":
			e.ellipse(t.x, t.y, r * .25, r * .1, 0, 0, Math.PI * 2);
			break;
		case "picture":
			c?.fillType === "image" && Y(e, c, t.x - x, t.y - x, r, r, u, l), S && e.strokeRect(t.x - x, t.y - x, r, r);
			return;
		default:
			e.arc(t.x, t.y, x, 0, Math.PI * 2);
			break;
	}
	let C = c?.fillType === "image" ? c : void 0, w = C ? null : c === void 0 ? i === "transparent" ? null : i : c == null ? null : m(c, e, t.x - x, t.y - x, r, r, l);
	w == null ? C && (e.save(), e.clip(), Y(e, C, t.x - x, t.y - x, r, r, u, l), e.restore()) : (e.fillStyle = w, e.fill()), S && e.stroke();
}
function Bt(t, n, r, i, a, o, s, c, l, u = 0, d, p, m = "t", h = s, g = !0, _, v, y = o, x = 0) {
	let S = p, C = r.seriesDataLabels;
	if (j(C, S) || n.showDataLabelsOverMax !== !0 && v != null && Number.isFinite(v) && y > v) return;
	let w = S?.showVal ?? C?.showVal ?? n.showDataLabels, T = S?.showCatName ?? C?.showCatName ?? !1, D = S?.showSerName ?? C?.showSerName ?? !1, k = S?.showPercent ?? C?.showPercent ?? !1, A = S?.text, N = ne({
		customText: A,
		showCategory: T,
		showSeries: D,
		showValue: w,
		showPercent: k,
		category: r.categories?.[a] ?? n.categories[a] ?? `${a + 1}`,
		seriesName: r.name || `Series ${i + 1}`,
		sourceValue: o,
		valueDivisor: _?.divisor,
		percentRatio: d != null && Number.isFinite(d) ? d : void 0,
		formatCode: S?.formatCode ?? C?.formatCode ?? n.dataLabelFormatCode ?? r.valFormatCode,
		percentFormatCode: S?.formatCode ?? C?.formatCode ?? n.dataLabelFormatCode ?? "0%",
		date1904: n.date1904,
		separator: S?.separator ?? C?.separator
	});
	if (!N) return;
	let P = M(S?.fontSizeHpt ?? C?.fontSizeHpt ?? n.dataLabelFontSizeHpt, l) ?? 9 * l, I = S?.fontBold ?? C?.fontBold ?? n.dataLabelFontBold ?? !1, R = b(S, C), z = $(n, S?.fontFace ?? C?.fontFace ?? n.dataLabelFontFace);
	t.font = `${R.fontItalic ? "italic " : ""}${I ? "bold " : ""}${P}px ${z}`;
	let B = `#${S?.fontColor ?? C?.fontColor ?? r.labelColor ?? n.dataLabelFontColor ?? "111111"}`, V = A && S?.richRuns?.length ? Te(t, {
		runs: S.richRuns,
		ptToPx: l,
		fontFamily: z,
		fallbackBold: I,
		fallbackItalic: R.fontItalic,
		fallbackBaseline: R.fontBaseline,
		fallbackColorHidden: R.fontPaintAuthored === !0 && (R.fontHidden === !0 || R.fontColor == null),
		fontFamilyForFace: (e) => $(n, e)
	}, P, B) : null, H = V ? [] : e(N, Math.max(P, c.w * .45), Math.max(P * 1.2, c.h * .35), P * 1.2, (e) => t.measureText(e).width, R);
	if (!V && !H.length) return;
	let te = V?.width ?? Math.max(...H.map((e) => t.measureText(e).width)), U = V?.height ?? H.length * P * 1.2, W = E(R, l), G = L(te + W.left + W.right, U + W.top + W.bottom, R.textRotation, R.textVerticalMode), K = ee({
		kind: "point",
		x: s.x,
		y: s.y,
		position: S?.position ?? C?.position ?? n.dataLabelPosition ?? m,
		markerGap: u
	}, c, {
		w: G.w,
		h: G.h
	}, P, S?.manualLayout, c);
	if (!K) return;
	let q = re(S?.labelBox, C?.labelBox);
	C?.showLeaderLines && C.leaderLineHidden !== !0 && g && (t.beginPath(), t.moveTo(h.x, h.y), t.lineTo(Math.max(K.rect.x, Math.min(h.x, K.rect.x + K.rect.w)), Math.max(K.rect.y, Math.min(h.y, K.rect.y + K.rect.h))), t.strokeStyle = `#${C.leaderLineColor ?? "808080"}`, t.lineWidth = C.leaderLineWidthEmu == null ? .75 * l : Math.max(.25, C.leaderLineWidthEmu / X * l), t.setLineDash(oe(C.leaderLineDash ?? "solid", t.lineWidth)), t.stroke()), F(t, q, K.rect, l, x), t.save(), t.beginPath(), t.rect(K.clip.x, K.clip.y, K.clip.w, K.clip.h), t.clip();
	let J = O(R, K.textAlign), ie = f(K.x, K.y, K.rect, U + W.top + W.bottom, R, S?.manualLayout != null, J, K.textAlign, te + W.left + W.right, G.radians), Y = ae(t, ie.x, ie.y, G.radians, J, K.textBaseline, W);
	if (V) {
		me(t, V, Y.x, Y.y, J, K.textBaseline, S?.manualLayout ? Math.max(0, K.rect.w - W.left - W.right) : V.width), t.restore();
		return;
	}
	if (!(R.fontPaintAuthored === !0 && (R.fontHidden === !0 || R.fontColor == null))) {
		t.fillStyle = B, t.textAlign = J, t.textBaseline = "middle";
		let e = P * 1.2, n = (R.fontBaseline ?? 0) * P, r = Y.y - (H.length - 1) * e / 2 - n;
		H.forEach((n, i) => t.fillText(n, Y.x, r + i * e));
	}
	t.restore();
}
function Vt(e, t, n) {
	let r = t.seriesDataLabels;
	return j(r, n) ? !1 : n?.text ? !0 : (n?.showVal ?? r?.showVal ?? e.showDataLabels) || (n?.showCatName ?? r?.showCatName ?? !1) || (n?.showSerName ?? r?.showSerName ?? !1) || (n?.showPercent ?? r?.showPercent ?? !1);
}
function Ht(e, t, n, r, i, a) {
	let o = se(t, n.h, r);
	if (t.title) {
		e.font = `${t.titleFontBold === !1 ? "" : "bold "}${o.fontPx}px ${Tt(t.titleFontFace)}`, e.fillStyle = t.titleFontColor ? `#${t.titleFontColor}` : "#111111", e.textAlign = "center", e.textBaseline = "top";
		let r = e.measureText(t.title).width, i = {
			x: n.x + (n.w - r) / 2,
			y: n.y + o.topPad,
			w: r,
			h: Math.max(1, o.fontPx)
		}, a = t.titleManualLayout ? le({
			...t.titleManualLayout,
			w: void 0,
			h: void 0
		}, n, i) : null;
		e.fillText(t.title, a ? a.x + a.w / 2 : n.x + n.w / 2, a?.y ?? i.y);
	}
	let s = ct(t);
	e.save();
	let c = (t.chartType === "pie" ? t.series[0]?.categories?.length ? t.series[0].categories : t.categories : t.series.map((e, t) => e.name || `Series ${t + 1}`)).flatMap((e, t) => s.get(t)?.deleted === !0 ? [] : [{
		label: e,
		index: t
	}]), l = c.map((e) => lt(t, s.get(e.index), r)), u = Math.max(0, ...l.map((e) => e.fontPx)), d = c.map((t, n) => (e.font = l[n].font, 7 * r + 4 + e.measureText(t.label).width)), f = V(t, n.w, n.h, .23, {
		itemWidths: d,
		rowHeight: Math.max(u * 1.45, 12),
		itemGap: 12,
		horizontalPadding: 8,
		verticalPadding: 4
	});
	e.restore();
	let p = W(f, t.legendOverlay === !0), m = K(t, n.w, n.h, r), h = U(t.catAxisTitleTextVerticalInsetEmu, r), g = U(t.valAxisTitleTextVerticalInsetEmu, r), _ = i === "horizontal" ? t.catAxisTitle ? m.catFontPx + h + J(n.w) + 4 : 0 : i === "vertical" ? m.valBandW : 0, v = i === "horizontal" ? t.valAxisTitle ? m.valFontPx + g + J(n.h) + 4 : 0 : i === "vertical" ? m.catBandH : 0, y = de(t, n.x, n.y, n.w, n.h, r, {
		titleBand: o,
		legendSideReserveFrac: .23,
		legendReserve: f,
		pad: {
			t: o.bandH + p.legTopH + n.h * .04,
			r: p.legRightW + n.w * .05,
			b: p.legBottomH + n.h * .19 + v,
			l: p.legLeftW + n.w * .13 + _
		},
		honorPlotAreaManualLayout: !0,
		manualOuterInsets: {
			t: o.bandH,
			r: p.legRightW,
			b: p.legBottomH + v,
			l: p.legLeftW + _
		}
	}), b = {
		x: y.plotRect.px0,
		y: y.plotRect.py0,
		w: Math.max(1, y.plotRect.pw),
		h: Math.max(1, y.plotRect.ph)
	};
	ie(e, t, b.x, b.y, b.w, b.h, r, a);
	let x = f ? f.side === "r" ? {
		x: n.x + n.w - f.reserveW,
		y: b.y,
		w: f.reserveW,
		h: b.h
	} : f.side === "l" ? {
		x: n.x,
		y: b.y,
		w: f.reserveW,
		h: b.h
	} : f.side === "t" ? {
		x: n.x + 4,
		y: n.y + o.bandH,
		w: Math.max(1, n.w - 8),
		h: f.reserveH
	} : {
		x: n.x + 4,
		y: n.y + n.h - f.reserveH,
		w: Math.max(1, n.w - 8),
		h: f.reserveH
	} : null;
	return {
		plot: b,
		legend: (x && t.legendManualLayout ? le(t.legendManualLayout, n, x) : null) ?? x,
		legendMeasure: {
			labels: c.map((e) => e.label),
			styles: l,
			itemWidths: d
		}
	};
}
function Ut(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
	e.save(), e.font = `${l ? "italic " : ""}${c ? "bold " : ""}${a}px ${o}`, e.fillStyle = s ? `#${s}` : "#555";
	let m = f ? t : S(e, t, p), h = P(i, u, d), g = r;
	if (f) {
		let t = e.measureText(m).width, i = Math.abs(Math.cos(h)), o = Math.abs(Math.sin(h)), s = {
			x: r.x - (t * i + a * o) / 2,
			y: r.y - (t * o + a * i) / 2,
			w: t * i + a * o,
			h: t * o + a * i
		}, c = le({
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
		let o = G(t.valAxisTitleFontSizeHpt, a), s = i ? "horizontal" : "left";
		Ut(e, t.valAxisTitle, n, i ? {
			x: r.x + r.w / 2,
			y: r.y + r.h + J(n.h) + o / 2
		} : {
			x: r.x - J(n.w) - o / 2,
			y: r.y + r.h / 2
		}, s, o, $(t, t.valAxisTitleFontFace, "major"), t.valAxisTitleFontColor, t.valAxisTitleFontBold ?? !0, t.valAxisTitleFontItalic ?? !1, t.valAxisTitleRotation, t.valAxisTitleVerticalMode, t.valAxisTitleManualLayout, i ? r.w : r.h);
	}
	if (t.catAxisTitle) {
		let o = G(t.catAxisTitleFontSizeHpt, a), s = i ? "left" : "horizontal";
		Ut(e, t.catAxisTitle, n, i ? {
			x: r.x - J(n.w) - o / 2,
			y: r.y + r.h / 2
		} : {
			x: r.x + r.w / 2,
			y: r.y + r.h + J(n.h) + o / 2
		}, s, o, $(t, t.catAxisTitleFontFace, "major"), t.catAxisTitleFontColor, t.catAxisTitleFontBold ?? !0, t.catAxisTitleFontItalic ?? !1, t.catAxisTitleRotation, t.catAxisTitleVerticalMode, t.catAxisTitleManualLayout, i ? r.h : r.w);
	}
}
function Gt(e, t, n, r, i, a, o, s, c, l, u) {
	let d = t.threeD?.seriesAxis;
	if (!d || d.hidden || t.threeD?.barGrouping !== "standard" || t.series.length === 0) return;
	let f = dn(t, r, i, a, o, s, c), p = Qt(r), m = c === "vertical" ? p.seriesAxisX : f.axisX, h = c === "horizontal" ? p.floorY === r.front.y ? r.front.y + r.front.h : r.front.y : p.floorY, g = r.project(m, h, r.topology.nearDepth), _ = r.project(m, h, r.topology.farDepth), v = Math.hypot(_.x - g.x, _.y - g.y);
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
	}), d.lineHidden || (nn(e, en(d.lineColor, d.lineWidthEmu, d.lineDash, u)), e.beginPath(), e.moveTo(g.x, g.y), e.lineTo(_.x, _.y), e.stroke());
	let C = Math.max(1, Math.floor(d.tickMarkSkip ?? 1)), w = Math.max(1, Math.floor(d.tickLabelSkip ?? 1)), T = d.majorTickMark ?? "out", E = M(d.fontSizeHpt, u) ?? 9 * u;
	if (e.font = `${d.fontItalic ? "italic " : ""}${d.fontBold ? "bold " : ""}${E}px ${$(t, d.fontFace)}`, e.fillStyle = d.fontColor ? `#${d.fontColor}` : "#595959", e.textAlign = Math.abs(b.x) < .2 ? "center" : b.x < 0 ? "right" : "left", e.textBaseline = Math.abs(b.y) < .2 ? "middle" : b.y < 0 ? "bottom" : "top", l && !d.lineHidden && T !== "none") {
		nn(e, tn(d.lineColor, d.lineWidthEmu, d.lineDash, u));
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
		d.tickLabelPos !== "none" && n % w === 0 && e.fillText(t.series[n].name || `Series ${n + 1}`, o.x + b.x * (6 * u + 3), o.y + b.y * (6 * u + 3));
	}
	if (e.setLineDash([]), d.title) {
		let i = G(d.titleFontSizeHpt, u);
		Ut(e, d.title, n, {
			x: S.x + b.x * (E + i + 12),
			y: S.y + b.y * (E + i + 12)
		}, "horizontal", i, $(t, d.titleFontFace, "major"), d.titleFontColor, d.titleFontBold ?? !0, d.titleFontItalic ?? !1, d.titleRotation, d.titleVerticalMode, d.titleManualLayout, Math.max(r.front.w, r.front.h));
	}
}
function Kt(e, r, i, a, o, c, u) {
	let d = p(e, "dataPointMarker", o), f = I(e, "dataPointMarker"), m = r.chartexFormatIdx ?? o, g = l(i?.markerStyle, f, a), _ = l(r.markerStyle, f, m), v = g !== void 0 || i?.markerFillPaint !== void 0 || i?.markerFill != null || i?.color != null || i?.markerFillPaintAuthored === !0 && i.markerStyle?.fillHidden !== !0, b = _ !== void 0 || r.markerFillPaint !== void 0 || r.markerFill != null || r.markerFillPaintAuthored === !0 && r.markerStyle?.fillHidden !== !0, x = n(d, f, m), S = v ? g ?? i?.markerFillPaint : b ? _ ?? r.markerFillPaint : x, C = t(r, i, a, c), T = S;
	S?.fillType === "solid" ? (C = S.color, T = void 0) : S === null && (C = "00000000");
	let E = h(i?.markerStyle, f, a), D = h(r.markerStyle, f, m), O = E !== void 0 || i?.markerLine != null || i?.markerLinePaintAuthored === !0 && i.markerStyle?.lineHidden !== !0, k = D !== void 0 || r.markerLine != null || r.markerLinePaintAuthored === !0 && r.markerStyle?.lineHidden !== !0, A = w(d, m), j = O ? E ?? (i?.markerLinePaintAuthored === !0 ? null : void 0) : k ? D ?? (r.markerLinePaintAuthored === !0 ? null : void 0) : A, M = i?.markerLine ?? r.markerLine ?? r.lineColor ?? c, N = j;
	j?.fillType === "solid" ? (M = j.color, N = void 0) : j === null && (M = "00000000");
	let P = i?.markerStyle ?? r.markerStyle ?? d, F = y(i?.markerStyle, r.markerStyle, d);
	return {
		fill: C,
		fillPaint: T,
		line: M,
		linePaint: N,
		lineWidth: (i?.markerLineWidthEmu ?? r.markerLineWidthEmu ?? P?.lineWidthEmu) == null ? Math.max(.75, u) : Math.max(.25, (i?.markerLineWidthEmu ?? r.markerLineWidthEmu ?? P?.lineWidthEmu ?? 0) / X * u),
		lineDash: F?.lineDash,
		lineCustomDash: F?.lineCustomDash,
		lineCap: P?.lineCap,
		lineJoin: P?.lineJoin,
		effectDirect: s(i?.markerStyle, i?.chartexStyle, r.markerStyle),
		effectFallback: d,
		effectIndex: i?.markerStyle || i?.chartexStyle ? a : m,
		effectFallbackIndex: m
	};
}
function qt(e, t, n, r, i, o, c, l, u, d, f, h) {
	let g = Q(t, n, r, i, o, h), _ = De(t, n, i, o), v = {
		x: c,
		y: l - u / 2,
		w: u,
		h: u
	}, y = (e) => {
		if (g.fill !== null) {
			let t = g.fill === void 0 ? g.color : g.fill.fillType === "image" ? null : m(g.fill, e, v.x, v.y, v.w, v.h, f);
			t && (e.fillStyle = t, e.fillRect(v.x, v.y, v.w, v.h));
		}
		let t = g.lineFill === void 0 ? g.lineColor : g.lineFill == null || g.lineFill.fillType === "image" ? null : m(g.lineFill, e, v.x, v.y, v.w, v.h, f);
		t && (e.strokeStyle = t, e.lineWidth = g.lineWidthEmu == null ? .75 * d : Math.max(.25, g.lineWidthEmu / X * d), e.setLineDash(R(g.lineCustomDash, g.lineDash, e.lineWidth)), e.lineCap = g.lineCap, e.lineJoin = g.lineJoin, e.strokeRect(v.x, v.y, v.w, v.h), e.setLineDash([]));
	}, b = s(r?.chartexStyle, n.chartexStyle);
	a(e, b, p(t, "dataPoint3D", o), b === r?.chartexStyle ? i : _, v, d, y, _);
}
function Jt(e, t, n, r, i, o, c, l, u, d) {
	let f = Q(t, n, void 0, r, r, !1), h = f.lineFill === void 0 ? f.lineColor == null ? f.fill : {
		fillType: "solid",
		color: f.lineColor.replace(/^#/, "")
	} : f.lineFill;
	if (h !== null) {
		let i = f.lineWidthEmu == null ? Math.max(1, 2 * u) : Math.max(.5, f.lineWidthEmu / X * u), g = {
			x: o,
			y: c - i / 2,
			w: l,
			h: i
		}, _ = h === void 0 ? f.color : h.fillType === "image" ? null : h.fillType === "solid" ? `#${h.color}` : m(h, e, o, c - i / 2, l, i, d);
		if (_) {
			let v = (t) => {
				t.beginPath(), t.moveTo(o, c), t.lineTo(o + l, c), t.strokeStyle = t === e ? _ : h === void 0 ? f.color : h.fillType === "image" ? "rgba(0,0,0,0)" : h.fillType === "solid" ? `#${h.color}` : m(h, t, o, c - i / 2, l, i, d) ?? "rgba(0,0,0,0)", t.lineWidth = i, t.setLineDash(R(f.lineCustomDash, f.lineDash, i)), t.stroke(), t.setLineDash([]);
			}, y = De(t, n, r, r);
			a(e, s(n.chartexStyle), p(t, "dataPoint3D", r), y, g, u, v, y);
		}
	}
	if (n.showMarker !== !0 || n.markerSymbol === "none") return;
	let g = n.markerSymbol ?? "circle", _ = Kt(t, n, void 0, r, r, i.replace(/^#/, ""), u);
	zt(e, {
		x: o + l / 2,
		y: c
	}, g, Math.min(l, Math.max(2, (n.markerSize ?? 5) * u)), _.fill === "00000000" ? "transparent" : `#${_.fill.replace(/^#/, "")}`, _.line === "00000000" ? "rgba(0,0,0,0)" : `#${_.line.replace(/^#/, "")}`, _.lineWidth, _.fillPaint, d, u, _.effectDirect, _.effectFallback, _.effectIndex, _.effectFallbackIndex, _.linePaint, _.lineDash, _.lineCustomDash, _.lineCap, _.lineJoin);
}
function Yt(e, t, n, r, i = !1, a, o = 0) {
	if (!n) return;
	d(e, t, n, r, o);
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
	})), l = ct(t), u = c.filter((e) => l.get(e.sourceIndex)?.deleted !== !0), f = a != null && a.labels.length === u.length && a.labels.every((e, t) => e === u[t].label), p = f ? a.styles : u.map((e) => lt(t, l.get(e.sourceIndex), r));
	e.textAlign = "left", e.textBaseline = "middle";
	let m = Math.max(Math.max(0, ...p.map((e) => e.fontPx)) * 1.45, 12), h = Math.min(7 * r, m * .7);
	if (t.legendPos === "t" || t.legendPos === "b" || t.legendManualLayout != null && n.w >= n.h) {
		let s = f ? a.itemWidths : u.map((t, n) => (e.font = p[n].font, h + 4 + e.measureText(t.label).width)), c = N(s, Math.max(1, n.w - 8), 12).slice(0, Math.max(0, Math.floor((n.h - 4 + 1e-6) / m))), l = n.y + 2 + m / 2;
		for (let a of c) {
			let c = a.map((e) => Math.min(n.w, s[e])), d = c.reduce((e, t) => e + t, 0) + Math.max(0, a.length - 1) * 12, f = n.x + Math.max(4, (n.w - d) / 2);
			for (let n = 0; n < a.length; n++) {
				let s = a[n], d = u[s], m = p[s];
				e.font = m.font;
				let g = Math.max(0, c[n] - h - 4);
				!i && t.chartType.toLowerCase().includes("line") && d.series ? Jt(e, t, d.series, d.seriesIndex, d.color, f, l, h, r, o) : d.series && qt(e, t, d.series, d.point, d.sourceIndex, d.seriesIndex, f, l, h, r, o, i), e.fillStyle = m.color, e.fillText(S(e, d.label, g), f + h + 4, l), f += c[n] + 12;
			}
			l += m;
		}
		return;
	}
	let g = n.y;
	for (let a = 0; a < u.length; a++) {
		let s = u[a], c = p[a];
		e.font = c.font;
		let l = n.x + 8 + h, d = Math.max(0, n.x + n.w - 4 - l), f = Math.max(c.fontPx * 1.2, 10), _ = q(s.label, d, f * (i ? 1 : 2), f, (t) => e.measureText(t).width);
		if (_.length === 0) continue;
		let v = Math.max(m, _.length * f + 2);
		if (g + v > n.y + n.h + 1e-6) break;
		let y = g + v / 2;
		!i && t.chartType.toLowerCase().includes("line") && s.series ? Jt(e, t, s.series, s.seriesIndex, s.color, n.x + 4, y, h, r, o) : s.series && qt(e, t, s.series, s.point, s.sourceIndex, s.seriesIndex, n.x + 4, y, h, r, o, i), e.fillStyle = c.color;
		let b = y - (_.length - 1) * f / 2;
		_.forEach((t, n) => e.fillText(t, l, b + n * f)), g += v;
	}
}
function Xt(e, t, n, r, i, a) {
	let o = i ? 100 : 1, s = e.valAxisMinorTickMark ?? "none";
	return ue({
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
		dash: oe(n ?? "solid", o)
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
		dash: oe(n ?? "solid", o)
	};
}
function tn(e, t, n, r) {
	return en(e, t, n, r);
}
function nn(e, t) {
	e.strokeStyle = t.color, e.lineWidth = t.width, e.setLineDash(t.dash);
}
function rn(e, t, n, i, a, s, c, l, u) {
	let { front: d } = n, f = d.x, p = d.x + d.w, h = Qt(n), { sideX: g, floorY: _, oppositeFloorY: v, nearDepth: y, farDepth: b } = h, x = dn(t, n, i, s, c, l, a), S = [], C = t.catAxisLinePaintAuthored === !0, w = t.valAxisLinePaintAuthored === !0, E = a === "vertical" ? C && !t.catAxisHidden && !t.catAxisLineHidden : w && !t.valAxisHidden && !t.valAxisLineHidden, D = a === "vertical" ? w && !t.valAxisHidden && !t.valAxisLineHidden : C && !t.catAxisHidden && !t.catAxisLineHidden;
	E && S.push([x.horizontalStart, x.horizontalEnd]), D && S.push([x.verticalStart, x.verticalEnd]);
	let O = t.threeD?.seriesAxis, k = O?.linePaintAuthored === !0;
	if (O && !O.hidden && !O.lineHidden && k && t.threeD?.barGrouping === "standard" && t.series.length > 0) {
		let e = a === "vertical" ? h.seriesAxisX : x.axisX, t = a === "horizontal" ? _ === n.front.y ? n.front.y + n.front.h : n.front.y : _;
		S.push([n.project(e, t, y), n.project(e, t, b)]);
	}
	let A = (e, t) => Math.hypot(e.x - t.x, e.y - t.y) <= 1e-6, j = (e, t) => S.some(([n, r]) => A(e, n) && A(t, r) || A(e, r) && A(t, n)), M = (e, t) => {
		let r = he(n, e, t?.thicknessPercent), i = r.faces.map((e, t) => ({
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
	}, N = M("floor", t.threeD?.floor), P = M("sideWall", t.threeD?.sideWall), F = M("backWall", t.threeD?.backWall), I = N.faces, L = P.faces, z = F.faces, B = (r, a, o, s) => {
		let c = T(t, a, o), l = r.faces;
		if (!c.fill || !l.length) return;
		if (c.fill.fillType === "image") {
			let t = H(c.fill);
			if (!t) return;
			be(e, c.fill, t, a, s, r.slab, r.faces.map((e) => e.faceIndex), (e) => n.projectUnbounded(e.x, e.y, e.depth), i.max - i.min);
			return;
		}
		let u = l.flatMap((e) => e.points), d = Math.min(...u.map((e) => e.x)), f = Math.max(...u.map((e) => e.x)), p = Math.min(...u.map((e) => e.y)), h = Math.max(...u.map((e) => e.y)), g = c.fill.fillType === "solid" ? `#${c.fill.color}` : m(c.fill, e, d, p, f - d, h - p);
		if (g) for (let t of l) t.points.length < 3 || (Et(e, t.points), e.fillStyle = g, e.fill());
	};
	B(N, t.threeD?.floor, "floor", "floor"), B(P, t.threeD?.sideWall, "wall", "sideWall"), B(F, t.threeD?.backWall, "wall", "backWall");
	let V = (t, r, i, a, o = !0) => {
		for (let s of ye(t.slab, r, i, a)) {
			if (!o && s.faceIndex !== 0 || !t.visibleFaceIndices.has(s.faceIndex)) continue;
			let [r, i] = s.scenePoints.map((e) => n.projectUnbounded(e.x, e.y, e.depth));
			e.beginPath(), e.moveTo(r.x, r.y), e.lineTo(i.x, i.y), e.stroke();
		}
	}, ee = (t, r, o) => {
		nn(e, r);
		for (let r of t) {
			let t = i.fraction(r);
			if (o) {
				a === "horizontal" ? (V(N, "floor", "x", t), V(F, "backWall", "x", t)) : (V(P, "sideWall", "y", t), V(F, "backWall", "y", t));
				continue;
			}
			if (a === "horizontal") {
				let r = d.x + t * d.w, i = n.project(r, _, b), a = n.project(r, v, b);
				e.beginPath(), e.moveTo(i.x, i.y), e.lineTo(a.x, a.y), e.stroke();
			} else {
				let r = d.y + d.h - t * d.h, i = n.project(g, r, y), a = n.project(g, r, b), o = n.project(g === f ? p : f, r, b);
				e.beginPath(), e.moveTo(i.x, i.y), e.lineTo(a.x, a.y), e.stroke(), e.beginPath(), e.moveTo(a.x, a.y), e.lineTo(o.x, o.y), e.stroke();
			}
		}
	};
	t.valAxisMinorGridlines === !0 && ee(i.minorTicks, $t(t.valAxisMinorGridlineColor, t.valAxisMinorGridlineWidthEmu, t.valAxisMinorGridlineDash, u, "D9D9D9", .5), !0), t.valAxisMajorGridlines === !0 && ee(i.majorTicks, $t(t.valAxisGridlineColor, t.valAxisGridlineWidthEmu, t.valAxisGridlineDash, u, "898989", 1), !0);
	let te = (t, n) => {
		nn(e, n);
		for (let e of t) a === "vertical" ? (V(N, "floor", "x", e), V(F, "backWall", "x", e)) : (V(P, "sideWall", "y", e), V(F, "backWall", "y", e));
	};
	t.catAxisMinorGridlines === !0 && te(o(s, c), $t(t.catAxisMinorGridlineColor, t.catAxisMinorGridlineWidthEmu, t.catAxisMinorGridlineDash, u, "E0E0E0", .5)), t.catAxisMajorGridlines === !0 && te(r(s, c), $t(t.catAxisGridlineColor, t.catAxisGridlineWidthEmu, t.catAxisGridlineDash, u, "E0E0E0", .5));
	let U = (n, r, i) => {
		if (!n.length) return;
		let a = T(t, r, i);
		if (a.line === null) return;
		let o = a.line ?? {
			fillType: "solid",
			color: "898989"
		}, s = n.flatMap((e) => e.points), c = Math.min(...s.map((e) => e.x)), l = Math.max(...s.map((e) => e.x)), d = Math.min(...s.map((e) => e.y)), f = Math.max(...s.map((e) => e.y)), p = o.fillType === "solid" ? `#${o.color}` : m(o, e, c, d, l - c, f - d);
		if (!p) return;
		let h = a.lineWidthEmu == null ? u : Math.max(.25, a.lineWidthEmu / X * u);
		e.strokeStyle = p, e.lineWidth = h, e.setLineDash(R(a.lineCustomDash, a.lineDash, h)), e.lineCap = a.lineCap === "rnd" ? "round" : a.lineCap === "sq" ? "square" : "butt", e.lineJoin = a.lineJoin === "round" || a.lineJoin === "bevel" ? a.lineJoin : "miter";
		for (let t of n) {
			if (t.points.length < 2) continue;
			let n = t.points.map((e, n) => ({
				start: e,
				end: t.points[(n + 1) % t.points.length]
			}));
			if (n.some((e) => j(e.start, e.end))) {
				for (let t of n) j(t.start, t.end) || (e.beginPath(), e.moveTo(t.start.x, t.start.y), e.lineTo(t.end.x, t.end.y), e.stroke());
				continue;
			}
			e.beginPath(), e.moveTo(t.points[0].x, t.points[0].y);
			for (let n = 1; n < t.points.length; n++) e.lineTo(t.points[n].x, t.points[n].y);
			e.lineTo(t.points[0].x, t.points[0].y), e.closePath(), e.stroke();
		}
	};
	U(I, t.threeD?.floor, "floor"), U(L, t.threeD?.sideWall, "wall"), U(z, t.threeD?.backWall, "wall"), e.setLineDash([]);
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
function dn(e, t, n, r, a, o, s) {
	let { front: c } = t, l = (e) => Math.max(0, Math.min(1, e)), u = t.topology.axisX === "min" ? c.x : c.x + c.w, d = t.topology.axisY === "min" ? c.y : c.y + c.h, f = () => {
		if (e.catAxisCrossesAt != null && Number.isFinite(e.catAxisCrossesAt)) {
			let t = e.chartType.endsWith("Pct") ? e.catAxisCrossesAt * 100 : e.catAxisCrossesAt;
			return l(n.fraction(t));
		}
		let t = e.catAxisCrosses ?? "autoZero";
		return l(t === "min" ? n.fraction(n.min) : t === "max" ? n.fraction(n.max) : n.fraction(0));
	}, p = () => {
		let t = e.valAxisCrossesAt;
		if (t != null && Number.isFinite(t)) return i(t - 1, r, a, o);
		let n = e.valAxisCrosses;
		if (n !== "min" && n !== "max") return null;
		let s = +(n === "max");
		return o ? 1 - s : s;
	}, m = f(), h = p(), g = s === "horizontal" ? c.x + m * c.w : h == null ? u : c.x + h * c.w, _ = s === "vertical" ? c.y + c.h - m * c.h : h == null ? d : c.y + h * c.h, v = t.topology.nearDepth;
	return {
		axisX: g,
		axisY: _,
		depth: v,
		horizontalStart: t.project(c.x, _, v),
		horizontalEnd: t.project(c.x + c.w, _, v),
		verticalStart: t.project(g, c.y + c.h, v),
		verticalEnd: t.project(g, c.y, v)
	};
}
function fn(e, t, n, a, o, s, c, l, u, d) {
	let { front: f } = n, p = dn(t, n, a, o, s, c, l), { axisX: m, axisY: h, depth: g } = p, _ = n.project(f.x + f.w / 2, f.y + f.h / 2, g), v = t.valAxisMinorTickMark ?? "none", y = u ? tn : en;
	if (!t.valAxisHidden && !t.valAxisLineHidden) {
		nn(e, y(t.valAxisLineColor, t.valAxisLineWidthEmu, t.valAxisLineDash, d));
		let r = (e) => l === "horizontal" ? n.project(f.x + a.fraction(e) * f.w, h, g) : n.project(m, f.y + f.h - a.fraction(e) * f.h, g), i = l === "horizontal" ? p.horizontalStart : p.verticalStart, o = l === "horizontal" ? p.horizontalEnd : p.verticalEnd;
		for (let n of a.majorTicks) sn(e, t.valAxisMajorTickMark, r(n), i, o, _, l === "vertical" ? "horizontal" : "vertical", "major", d);
		for (let t of a.minorTicks) sn(e, v, r(t), i, o, _, l === "vertical" ? "horizontal" : "vertical", "minor", d);
	}
	if (!t.catAxisHidden && !t.catAxisLineHidden) {
		nn(e, y(t.catAxisLineColor, t.catAxisLineWidthEmu, t.catAxisLineDash, d));
		let a = l === "vertical" ? p.horizontalStart : p.verticalStart, v = l === "vertical" ? p.horizontalEnd : p.verticalEnd, b = Math.max(1, Math.floor(t.catAxisTickMarkSkip ?? 1)), x = (r) => {
			let i = l === "vertical" ? n.project(f.x + r * f.w, h, g) : n.project(m, f.y + r * f.h, g);
			sn(e, t.catAxisMajorTickMark, i, a, v, _, l === "vertical" ? "vertical" : "horizontal", "major", d);
		};
		if (u) {
			let e = r(o, s);
			for (let t = 0; t < e.length; t += b) x(c ? 1 - e[t] : e[t]);
		} else for (let e = 0; e < o; e += b) x(i(e, o, s, c));
		let S = t.catAxisMinorUnit;
		if (t.catAxisMinorTickMark && t.catAxisMinorTickMark !== "none" && S != null && Number.isFinite(S) && S > 0) {
			let r = t.catAxisMajorUnit != null && Number.isFinite(t.catAxisMajorUnit) && t.catAxisMajorUnit > 0 ? t.catAxisMajorUnit : b, u = Math.min(512, Math.ceil(o / S));
			for (let p = 1; p < u; p++) {
				let u = p * S;
				if (!(u < o)) break;
				if (Math.abs(u / r - Math.round(u / r)) < 1e-9) continue;
				let y = i(u, o, s, c), b = l === "vertical" ? n.project(f.x + y * f.w, h, g) : n.project(m, f.y + y * f.h, g);
				sn(e, t.catAxisMinorTickMark, b, a, v, _, l === "vertical" ? "vertical" : "horizontal", "minor", d);
			}
		}
	}
	e.setLineDash([]);
}
function pn(e, t, n, r, a) {
	if (!t.threeD) return !1;
	let o = t.chartType === "clusteredBar" || t.chartType === "clusteredBarH" || t.chartType.startsWith("stackedBar"), c = t.chartType.endsWith("H") || t.chartType.includes("BarH"), l = t.chartType.startsWith("stacked"), d = o && !l && t.threeD.barGrouping === "standard", { plot: f, legend: m, legendMeasure: h } = Ht(e, t, n, r, c ? "horizontal" : "vertical", a), g = _e(t.threeD, f, {
		sceneDepthScale: o ? d ? .65 : .1 : .4,
		perspectiveTangentGain: d ? 1 : 2,
		sceneHeightScale: !o && !(t.threeD.heightPercentAuthored ?? t.threeD.heightPercent != null) ? 1 / 3 : void 0
	});
	if (!g) return !0;
	g = ve(g, t.threeD, f);
	let y = t.chartType.endsWith("Pct"), b = t.series.find((e) => (e.categories?.length ?? 0) > 0)?.categories ?? t.categories, x = Math.max(1, b.length, ...t.series.map((e) => e.values.length)), S = y ? vt(t, x) : void 0, w = t.catAxisOrientation === "maxMin", T = t.catAxisCrossBetween === "between", E = t.dispBlanksAs ?? "gap", D = t.valAxisLogBase != null && Number.isFinite(t.valAxisLogBase) && t.valAxisLogBase >= 2, O = (e, n) => {
		let r = t.series[e]?.values[n];
		return r != null && Number.isFinite(r) && (!D || r > 0) || r == null && (l || E === "zero");
	}, k = (e, n) => yt(t, e, n, S), A = 0, j = 0;
	if (l) {
		for (let e = 0; e < x; e++) {
			let n = 0, r = 0;
			for (let i = 0; i < t.series.length; i++) {
				let t = k(i, e);
				t >= 0 ? n = bt(n, t) : r = bt(r, t);
			}
			A = Math.min(A, r), j = Math.max(j, n);
		}
		y && (A = A < 0 ? -100 : 0, j = j > 0 ? 100 : 0, A === 0 && j === 0 && (j = 1));
	} else {
		let e = B(t.series.flatMap((e) => e.values).filter((e) => e != null && Number.isFinite(e) && (!D || e > 0)), D ? {
			min: 1,
			max: 10
		} : {
			min: 0,
			max: 1
		});
		A = D ? e.min : Math.min(0, e.min), j = D ? e.max : Math.max(0, e.max);
	}
	let N = c ? g.project(g.front.x, g.topology.axisY === "min" ? g.front.y : g.front.y + g.front.h, g.topology.nearDepth) : g.project(g.topology.axisX === "min" ? g.front.x : g.front.x + g.front.w, g.front.y, g.topology.nearDepth), P = c ? g.project(g.front.x + g.front.w, g.topology.axisY === "min" ? g.front.y : g.front.y + g.front.h, g.topology.nearDepth) : g.project(g.topology.axisX === "min" ? g.front.x : g.front.x + g.front.w, g.front.y + g.front.h, g.topology.nearDepth), F = Math.hypot(P.x - N.x, P.y - N.y) / r, I = Xt(t, A, j, F, y, c ? "horizontal" : "vertical"), L = (e) => Number.isFinite(e) ? Math.max(I.min, Math.min(I.max, e)) : I.min;
	o || rn(e, t, g, I, c ? "horizontal" : "vertical", x, T, w, r);
	let { front: V } = g, H = Math.max(1, t.series.length), ee = [], U = t.series.map((e) => new Map(e.dataPointOverrides?.map((e) => [e.idx, e]) ?? [])), ne = t.series.map((e) => new Map(e.dataLabelOverrides?.map((e) => [e.idx, e]) ?? []));
	if (o) {
		let i = g.prismInterval(0, 1, !0), o = [], u = Array(x).fill(0), f = Array(x).fill(0), m = (c ? V.h : V.w) / x, h = t.barGapWidth != null && Number.isFinite(t.barGapWidth) && t.barGapWidth >= 0 ? t.barGapWidth : 150;
		for (let e = 0; e < t.series.length; e++) {
			let n = t.series[e], a = d ? g.prismInterval(e, H, !1) : i, s = Se(m, h, d ? 0 : e, d ? 1 : H, l || d);
			for (let i = 0; i < x; i++) {
				if (!O(e, i)) continue;
				let d = k(e, i), p = Q(t, n, U[e].get(i), i, e), h = p.fill === null ? "transparent" : p.color, g = p.lineFill !== null && (p.lineColor != null || p.lineFill !== void 0), _ = l ? d >= 0 ? u[i] : f[i] : 0, v = bt(_, d);
				l && (d >= 0 ? u[i] = v : f[i] = v);
				let b = L(_), S = L(v), C = n.threeDShape ?? t.threeD.shape ?? "box", T = C === "cone" || C === "pyramid", E = C === "coneToMax" || C === "pyramidToMax", A = (e) => {
					if (!T) return 1;
					let t = D && !(_ > 0) ? I.min : _, n = I.fraction(t), r = I.fraction(v), i = I.fraction(e), a = r - n;
					return a === 0 || !Number.isFinite(a) || !Number.isFinite(i - n) ? +(e === t) : Math.max(0, Math.min(1, 1 - (i - n) / a));
				}, j = (e) => {
					if (!E) return 1;
					let t = v >= _ ? I.max : I.min, n = D ? I.min : 0, r = I.fraction(t), i = I.fraction(n), a = I.fraction(e), o = Math.abs(r - i);
					return !(o > 0) || ![
						r,
						i,
						a
					].every(Number.isFinite) ? ge(e, I.min, I.max) : Math.max(0, Math.min(1, Math.abs(r - a) / o));
				}, M = E ? j(b) : A(b), N = E ? j(S) : A(S);
				if (c) {
					let t = V.x + I.fraction(b) * V.w, n = V.x + I.fraction(S) * V.w, c = w ? x - 1 - i : i, l = V.y + c * m + s.offset;
					o.push({
						x: Math.min(t, n),
						y: l,
						width: Math.abs(n - t),
						height: s.size,
						nearDepth: a.near,
						farDepth: a.far,
						categoryIndex: i,
						seriesIndex: e,
						color: h,
						fillPaint: p.fill,
						lineFill: p.lineFill,
						shape: C,
						baseCoord: t,
						endCoord: n,
						baseScale: M,
						endScale: N,
						omitBaseCap: !1,
						omitEndCap: !1,
						outline: g,
						outlineColor: p.lineColor ?? "rgba(0,0,0,0.42)",
						outlineWidth: p.lineWidthEmu == null ? .75 * r / pe : mt(p.lineWidthEmu, r),
						outlineDash: p.lineDash ?? "solid",
						outlineCustomDash: p.lineCustomDash,
						outlineCap: p.lineCap,
						outlineJoin: p.lineJoin,
						labelValue: y ? d / 100 : d,
						plottedLabelValue: v
					});
				} else {
					let t = V.y + V.h - I.fraction(b) * V.h, n = V.y + V.h - I.fraction(S) * V.h, c = w ? x - 1 - i : i, l = V.x + c * m + s.offset;
					o.push({
						x: l,
						y: Math.min(t, n),
						width: s.size,
						height: Math.abs(n - t),
						nearDepth: a.near,
						farDepth: a.far,
						categoryIndex: i,
						seriesIndex: e,
						color: h,
						fillPaint: p.fill,
						lineFill: p.lineFill,
						shape: C,
						baseCoord: t,
						endCoord: n,
						baseScale: M,
						endScale: N,
						omitBaseCap: !1,
						omitEndCap: !1,
						outline: g,
						outlineColor: p.lineColor ?? "rgba(0,0,0,0.42)",
						outlineWidth: p.lineWidthEmu == null ? .75 * r / pe : mt(p.lineWidthEmu, r),
						outlineDash: p.lineDash ?? "solid",
						outlineCustomDash: p.lineCustomDash,
						outlineCap: p.lineCap,
						outlineJoin: p.lineJoin,
						labelValue: y ? d / 100 : d,
						plottedLabelValue: v
					});
				}
			}
		}
		if (l) {
			let e = ht(o, x);
			for (let t = 0; t < x; t++) {
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
		rn(e, t, g, I, c ? "horizontal" : "vertical", x, T, w, r);
		let v = {
			remaining: Ke,
			exceeded: !1
		}, b = o.map((t) => {
			let n = At(g, t.shape, c, t.x, t.y, t.width, t.height, t.baseCoord, t.endCoord, t.nearDepth, t.farDepth, t.color, t.baseScale, t.endScale, t.omitBaseCap, t.omitEndCap, t.outline && t.outlineColor ? {
				color: t.outlineColor,
				width: t.outlineWidth,
				dash: R(t.outlineCustomDash, t.outlineDash, t.outlineWidth),
				cap: t.outlineCap,
				join: t.outlineJoin
			} : void 0, v);
			return Ft(e, n, "fill", t.fillPaint, a), Ft(e, n, "outline", t.lineFill, a), {
				item: t,
				faces: n
			};
		}), S = b.flatMap((e) => e.faces);
		if (v.exceeded) return It(e, n), !0;
		for (let t of Ge(S)) Nt(e, t);
		for (let { item: n, faces: i } of b) {
			let a = t.series[n.seriesIndex], o = U[n.seriesIndex].get(n.categoryIndex), c = De(t, a, n.categoryIndex, n.seriesIndex), l = s(o?.chartexStyle), u = s(a.chartexStyle);
			_(e, l ?? u, p(t, "dataPoint3D", n.seriesIndex), l ? n.categoryIndex : c, r, (e) => Pt(e, i), c);
		}
		for (let i of o) {
			let o = t.series[i.seriesIndex], s = c ? g.project(i.endCoord, i.y + i.height / 2, (i.nearDepth + i.farDepth) / 2) : g.project(i.x + i.width / 2, i.endCoord, (i.nearDepth + i.farDepth) / 2), l = ne[i.seriesIndex].get(i.categoryIndex);
			Vt(t, o, l) && ee.push(() => Bt(e, t, o, i.seriesIndex, i.categoryIndex, i.labelValue, s, n, r, 0, void 0, l, "t", s, !0, t.valAxisDisplayUnits, I.max, i.plottedLabelValue, a));
		}
	} else {
		let o = t.series.map(() => Array(x).fill(0)), s = t.series.map(() => Array(x).fill(0));
		if (l) {
			let e = Array(x).fill(0), n = Array(x).fill(0);
			for (let r = 0; r < t.series.length; r++) for (let t = 0; t < x; t++) {
				let i = k(r, t), a = i >= 0 ? e[t] : n[t];
				o[r][t] = a, s[r][t] = bt(a, i), i >= 0 ? e[t] = bt(e[t], i) : n[t] = bt(n[t], i);
			}
		}
		let c = (e) => {
			let t = g.seriesDepth(e, H, l), n = 0, r = 0;
			for (let a = 0; a < x; a++) {
				if (!O(e, a)) continue;
				let o = l ? s[e][a] : k(e, a), c = V.x + i(a, x, T, w) * V.w, u = V.y + V.h - I.fraction(L(o)) * V.h;
				n += g.cameraDepth(c, u, t), r++;
			}
			return r > 0 ? n / r : -Infinity;
		}, d = t.series.map((e, t) => t).sort((e, t) => c(e) - c(t) || t - e), f = t.series.map((e, n) => Q(t, e, void 0, n, n)), p = [], m = [], h = !1;
		for (let c of d) {
			if (h) break;
			let d = t.series[c], _ = f[c], b = _.fill === null ? "transparent" : _.color, S = l ? g.prismInterval(0, 1, !0) : g.prismInterval(c, H, !1), C = V.x + V.w / 2, D = V.y + V.h / 2, A = g.cameraDepth(C, D, S.near) >= g.cameraDepth(C, D, S.far) ? S.near : S.far, j = [], M = [], N = [], P = [], F = [], L = [], z = [], B = [], W = [], G = [];
			for (let e = 0; e < x; e++) {
				if (!O(c, e)) {
					j.push(null), M.push(null), N.push(null), P.push(null), F.push(null), L.push(null), z.push(null), B.push(null), W.push(null), G.push(null);
					continue;
				}
				let n = l ? s[c][e] : k(c, e), r = l ? o[c][e] : 0, a = V.x + i(e, x, T, w) * V.w, u = I.fraction(n), d = I.fraction(r), f = Number.isFinite(d) ? d : r <= I.min ? 0 : 1, p = Number.isFinite(u) && u >= 0 && u <= 1, m = Number.isFinite(u) ? Math.max(0, Math.min(1, u)) : n <= I.min ? 0 : 1, h = V.y + V.h - m * V.h, _ = V.y + V.h - Math.max(0, Math.min(1, f)) * V.h;
				j.push(t.chartType.toLowerCase().includes("area") || p ? g.project(a, h, A) : null), M.push(g.project(a, _, A)), N.push(p ? g.cameraDepth(a, h, A) : null), P.push(g.cameraDepth(a, _, A)), F.push(n), L.push(a), z.push(h), B.push(_), W.push(u), G.push(f);
			}
			let K = [], q = null;
			for (let e = 0; e < j.length; e++) {
				let t = j[e], n = M[e];
				if (!t || !n) {
					E === "gap" && (q && K.push(q), q = null);
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
				}, q.upper.push(t), q.lower.push(n), q.upperDepths.push(N[e] ?? 0), q.lowerDepths.push(P[e] ?? 0), q.indices.push(e), q.sceneXs.push(L[e] ?? 0), q.upperYs.push(z[e] ?? 0), q.lowerYs.push(B[e] ?? 0), q.upperFractions.push(W[e] ?? 0), q.lowerFractions.push(G[e] ?? 0);
			}
			q && K.push(q);
			let J = [], re = [];
			if (t.chartType.toLowerCase().includes("area")) {
				for (let t of K) {
					let n = null;
					for (let r = 0; r + 1 < t.upper.length; r++) {
						let i = ze(t.lowerFractions[r], t.lowerFractions[r + 1], t.upperFractions[r], t.upperFractions[r + 1]);
						for (let a = 0; a < i.length; a++) {
							let o = i[a], s = t.sceneXs[r] + (t.sceneXs[r + 1] - t.sceneXs[r]) * o.startT, c = t.sceneXs[r] + (t.sceneXs[r + 1] - t.sceneXs[r]) * o.endT, l = V.y + V.h - o.lowerStart * V.h, u = V.y + V.h - o.lowerEnd * V.h, d = V.y + V.h - o.upperStart * V.h, f = V.y + V.h - o.upperEnd * V.h, m = {
								...g.project(s, d, A),
								cameraDepth: g.cameraDepth(s, d, A),
								cameraWeight: g.cameraProjectionWeight(s, d, A)
							}, _ = {
								...g.project(c, f, A),
								cameraDepth: g.cameraDepth(c, f, A),
								cameraWeight: g.cameraProjectionWeight(c, f, A)
							};
							n != null && Math.hypot(n.at(-1).x - m.x, n.at(-1).y - m.y) <= 1e-8 ? n.push(_) : (n && n.length >= 2 && J.push(n), n = [m, _]);
							let v = kt(g, s, c, l, u, d, f, S.near, S.far, b, r === 0 && a === 0 && o.startT === 0, r + 2 === t.upper.length && a + 1 === i.length && o.endT === 1);
							for (let t of v) {
								if (p.length >= 1e4) {
									h = !0;
									break;
								}
								p.push({
									points: t.points,
									cameraDepth: t.cameraDepth,
									cameraDepths: t.cameraDepths,
									cameraWeights: t.cameraWeights,
									layer: 0,
									paint: () => Nt(e, t)
								}), re.push(t);
							}
							if (h) break;
						}
						if (h) break;
					}
					if (n && n.length >= 2 && J.push(n), h) break;
				}
				Ft(e, re, "fill", _.fill, a);
			}
			let ie = [];
			if (!t.chartType.toLowerCase().includes("area")) {
				let e = [], t = null;
				for (let n = 0; n < x; n++) {
					let r = F[n], a = r == null ? NaN : I.fraction(r);
					if (r == null || !Number.isFinite(a)) {
						E === "gap" && t && (e.push(t), t = null);
						continue;
					}
					t ??= [], t.push({
						x: V.x + i(n, x, T, w) * V.w,
						fraction: a,
						ownerIndex: n
					});
				}
				t && e.push(t);
				let n = (e) => {
					let t = Math.max(0, Math.min(1, e.fraction)), n = V.y + V.h - t * V.h;
					return {
						...g.project(e.x, n, A),
						cameraDepth: g.cameraDepth(e.x, n, A),
						cameraWeight: g.cameraProjectionWeight(e.x, n, A)
					};
				}, r = (e) => {
					e && e.path.length >= 2 && ie.push(e);
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
						let o = e[t], s = e[t + 1], c = (e) => g.project(e.x, V.y + V.h - e.fraction * V.h, A), l = c(o), u = c(s), d = Math.hypot(u.x - l.x, u.y - l.y), f = Number.isFinite(d) ? d : Math.hypot(s.x - o.x, (s.fraction - o.fraction) * V.h), p = Re(o.fraction, s.fraction);
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
							y: V.y + V.h - Math.max(0, Math.min(1, e.fraction)) * V.h
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
			let ae = t.chartType.toLowerCase().includes("area"), oe = d.lineHidden != null || d.lineColor != null || d.lineWidthEmu != null || d.chartexStyle?.lineHidden != null || d.chartexStyle?.lineColors?.some(Boolean) || d.chartexStyle?.lineWidthEmu != null || d.chartexStyle?.lineDash != null || d.chartexStyle?.lineCap != null || d.chartexStyle?.lineJoin != null || _.lineColor != null || _.lineFill !== void 0;
			if (!ae || _.lineFill !== null && oe) {
				let n = /* @__PURE__ */ new Map(), i = (e) => {
					let r = U[c].get(e);
					if (!Ct(r)) return _;
					let i = n.get(e);
					return i || (i = Q(t, d, r, e, c), n.set(e, i)), i;
				}, o = /* @__PURE__ */ new Map(), s = {
					remaining: Ke,
					exceeded: !1
				}, l = (t, n, i, a = i, c = 0, l) => {
					if (n.lineFill === null) return;
					let u = n === _ ? b : n.color, d = n.lineColor ?? we(u, .7), f = n.lineWidthEmu ? Math.max(.5, n.lineWidthEmu / X) * r : ae ? .75 * r : Math.max(1, 2 * r), m = {
						width: f,
						dash: R(n.lineCustomDash, n.lineDash, f),
						dashOffset: c,
						lineCap: n.lineCap,
						startCap: i,
						endCap: a,
						lineJoin: n.lineJoin
					};
					if (!ae && l && l.length >= 2) {
						let t = et(l.map((e) => ({
							...e,
							cameraDepth: 0,
							cameraWeight: 1
						})), m);
						if (t == null) {
							h = !0;
							return;
						}
						let r = o.get(n) ?? [];
						for (let n of t) {
							let t = Ie({
								outline: n.points,
								nearDepth: S.near,
								farDepth: S.far
							});
							if (!t) continue;
							let i = jt(g, t, d, void 0, s).map((e) => ({
								...e,
								paintRole: "outline"
							}));
							if (s.exceeded) {
								h = !0;
								return;
							}
							r.push(...i);
							for (let t of i) p.push({
								points: t.points,
								cameraDepth: t.cameraDepth,
								cameraDepths: t.cameraDepths,
								cameraWeights: t.cameraWeights,
								layer: 1,
								paint: () => Nt(e, t)
							});
						}
						o.set(n, r);
						return;
					}
					let v = et(t, m);
					if (v == null) {
						h = !0;
						return;
					}
					if (p.length + v.length > 1e4) {
						h = !0;
						return;
					}
					for (let t of v) {
						let r = {
							points: t.points,
							color: d,
							paintRole: "outline",
							shade: 0,
							cameraDepth: t.cameraDepth,
							cameraDepths: t.cameraDepths,
							cameraWeights: t.cameraWeights,
							outline: !1
						}, i = o.get(n) ?? [];
						i.push(r), o.set(n, i), p.push({
							points: t.points,
							cameraDepth: t.cameraDepth,
							cameraDepths: t.cameraDepths,
							cameraWeights: t.cameraWeights,
							layer: 1,
							paint: () => Nt(e, r)
						});
					}
				};
				if (ae) for (let e of J) l(e, _, _.lineCap);
				else for (let e of ie) {
					let t = i(e.ownerIndex);
					l(e.path, t, e.startClipped ? "butt" : t.lineCap, e.endClipped ? "butt" : t.lineCap, e.dashOffset, e.modelPath);
				}
				for (let [t, n] of o) Ft(e, n, "outline", t.lineFill, a);
			}
			let Y = (ae ? d.showMarker === !0 || u(d) : d.showMarker === !0) && d.markerSymbol !== "none";
			if ((t.chartType.toLowerCase().includes("line") || ae) && (Y || te(d))) for (let n = 0; n < j.length; n++) {
				let i = j[n];
				if (!i) continue;
				let o = U[c].get(n), s = v(d, o, "circle", Y);
				if (s === "none") continue;
				let l = o?.markerSize ?? d.markerSize ?? 5, u = Kt(t, d, o, n, c, d.color ?? ut[c % ut.length], r);
				m.push(() => zt(e, i, s, Math.max(2, l) * r, u.fill === "00000000" ? "transparent" : `#${u.fill.replace(/^#/, "")}`, u.line === "00000000" ? "rgba(0,0,0,0)" : `#${u.line.replace(/^#/, "")}`, u.lineWidth, u.fillPaint, a, r, u.effectDirect, u.effectFallback, u.effectIndex, u.effectFallbackIndex, u.linePaint, u.lineDash, u.lineCustomDash, u.lineCap, u.lineJoin));
			}
			for (let i = 0; i < j.length; i++) {
				let o = j[i];
				if (!o) continue;
				let u = k(c, i), f = U[c].get(i), p = f?.markerSize ?? d.markerSize ?? 5, m = ne[c].get(i);
				Vt(t, d, m) && ee.push(() => Bt(e, t, d, c, i, y ? u / 100 : u, o, n, r, d.showMarker === !0 || f?.markerSymbol != null ? p * r / 2 : 0, void 0, m, "t", o, !0, t.valAxisDisplayUnits, I.max, l ? s[c][i] : u, a));
			}
		}
		if (h) return It(e, n), !0;
		for (let e of Ge(p)) e.paint();
		for (let e of m) e();
	}
	an(e, t, g, I, x, T, w, r, c ? "horizontal" : "vertical"), fn(e, t, g, I, x, T, w, c ? "horizontal" : "vertical", o, r), Gt(e, t, n, g, I, x, T, w, c ? "horizontal" : "vertical", o, r);
	let W = dn(t, g, I, x, T, w, c ? "horizontal" : "vertical"), G = (e, t) => {
		if (t !== "low" && t !== "high") return W;
		let n = g.topology.nearDepth, r = W.axisX, i = W.axisY;
		if (e === "value" === c) {
			let e = V.y, r = V.y + V.h, a = g.project(V.x + V.w / 2, e, n), o = g.project(V.x + V.w / 2, r, n), s = a.y >= o.y ? e : r;
			i = t === "low" ? s : s === e ? r : e;
		} else {
			let e = V.x, i = V.x + V.w, a = g.project(e, V.y + V.h / 2, n), o = g.project(i, V.y + V.h / 2, n), s = a.x <= o.x ? e : i;
			r = t === "low" ? s : s === e ? i : e;
		}
		return {
			axisX: r,
			axisY: i,
			depth: n,
			horizontalStart: g.project(V.x, i, n),
			horizontalEnd: g.project(V.x + V.w, i, n),
			verticalStart: g.project(r, V.y + V.h, n),
			verticalEnd: g.project(r, V.y, n)
		};
	}, K = G("value", t.valAxisTickLabelPos), q = G("category", t.catAxisTickLabelPos), J = M(t.valAxisFontSizeHpt, r) ?? 9 * r;
	if (e.font = `${t.valAxisFontItalic ? "italic " : ""}${t.valAxisFontBold ? "bold " : ""}${J}px ${Tt(t.valAxisFontFace)}`, e.fillStyle = t.valAxisFontColor ? `#${t.valAxisFontColor}` : "#595959", e.textAlign = c ? "center" : "right", e.textBaseline = c ? "top" : "middle", !t.valAxisHidden && t.valAxisTickLabelPos !== "none") {
		let { axisX: n, axisY: i, depth: a } = K, o = g.project(V.x + V.w / 2, V.y + V.h / 2, a), s = on(c ? K.horizontalStart : K.verticalStart, c ? K.horizontalEnd : K.verticalEnd, o, c ? "vertical" : "horizontal");
		e.textAlign = Math.abs(s.x) < .2 ? "center" : s.x < 0 ? "right" : "left", e.textBaseline = Math.abs(s.y) < .2 ? "middle" : s.y < 0 ? "bottom" : "top";
		let l = un(t.valAxisMajorTickMark, t.valAxisLineHidden, r, 5), u = t.valAxisDisplayUnits?.divisor;
		for (let r of I.majorTicks) {
			let o = c ? g.project(V.x + I.fraction(r) * V.w, i, a) : g.project(n, V.y + V.h - I.fraction(r) * V.h, a);
			e.fillText(z(y ? r / 100 : u != null && Number.isFinite(u) && u > 0 ? r / u : r, y ? t.valAxisFormatCode ?? "0%" : t.valAxisFormatCode, t.date1904), o.x + s.x * l, o.y + s.y * l);
		}
	}
	let re = M(t.catAxisFontSizeHpt, r) ?? 9 * r;
	if (e.font = `${t.catAxisFontItalic ? "italic " : ""}${t.catAxisFontBold ? "bold " : ""}${re}px ${Tt(t.catAxisFontFace)}`, e.fillStyle = t.catAxisFontColor ? `#${t.catAxisFontColor}` : "#595959", !t.catAxisHidden && t.catAxisTickLabelPos !== "none") {
		let n = C(un(t.catAxisMajorTickMark, t.catAxisLineHidden, r, 6), t.catAxisLabelOffsetPercent), a = Array.from({ length: x }, (e, n) => ce(String(b[n] ?? n + 1), t.catAxisFormatCode, t.date1904)), o = Lt(t);
		if (o == null && (o = 0, !c && x > 1)) {
			let t = Infinity, n = null, r = q.axisY;
			for (let e = 0; e < x; e++) {
				let a = i(e, x, T, w), o = g.project(V.x + a * V.w, r, g.topology.nearDepth);
				n && (t = Math.min(t, Math.hypot(o.x - n.x, o.y - n.y))), n = o;
			}
			Math.max(0, ...a.map((t) => e.measureText(t).width)) > t * .9 && (o = -Math.PI / 4);
		}
		let s = Math.max(1, Math.floor(t.catAxisTickLabelSkip ?? 1));
		for (let t = 0; t < x; t += s) {
			let r = i(t, x, T, w), { axisX: s, axisY: l, depth: u } = q, d = c ? g.project(s, V.y + i(t, x, T, w) * V.h, u) : g.project(V.x + r * V.w, l, u);
			if (c) {
				let r = g.project(s, V.y + V.h / 2, u), i = g.project(V.x + V.w / 2, V.y + V.h / 2, u), o = r.x <= i.x;
				e.textAlign = o ? "right" : "left", e.textBaseline = "middle", e.fillText(a[t], d.x + (o ? -n : n), d.y);
			} else {
				let r = g.project(V.x + V.w / 2, V.y + V.h / 2, u), i = on(q.horizontalStart, q.horizontalEnd, r, "vertical");
				Rt(e, a[t], d, o, c, i.y < 0 ? -1 : 1, n);
			}
		}
	}
	Wt(e, t, n, f, c, r);
	for (let e of ee) e();
	return Yt(e, t, m, r, !1, h, a), !0;
}
function mn(e, t, n, r, i) {
	if (!t.threeD || t.chartType !== "pie") return !1;
	let a = t.series[0];
	if (!a) return !0;
	let o = a.values.flatMap((e, t) => e != null && Number.isFinite(e) ? [{
		index: t,
		value: Math.abs(e)
	}] : []), c = 0;
	for (let e of o) c = Math.max(c, e.value);
	if (!(c > 0)) return !0;
	let l = o.reduce((e, t) => e + t.value / c, 0);
	if (!(l > 0) || !Number.isFinite(l)) return !0;
	let { plot: u, legend: d, legendMeasure: f } = Ht(e, t, n, r, "radial", i), m = _e({
		...t.threeD,
		rotationY: t.threeD.rotationY ?? 0,
		heightPercent: void 0,
		depthPercent: 100
	}, u, {
		sceneDepthScale: 1,
		sceneHeightScale: .15
	});
	if (!m) return !0;
	let h = new Map(a.dataPointOverrides?.map((e) => [e.idx, e]) ?? []), g = 0;
	for (let e of h.values()) e.explosion != null && Number.isFinite(e.explosion) && (g = Math.max(g, Math.max(0, Math.min(100, e.explosion)) / 100));
	let { scene: v } = m, y = Math.min(v.w * .45 / (1 + g), m.modelDepth * .45 / (1 + g), v.h / .45);
	if (!(y > 0)) return !0;
	let b = v.x + v.w / 2, x = v.y + v.h / 2, S = .5, C = y * .3 * xe(t.threeD), w = 0, T = [], E = new Map(a.dataLabelOverrides?.map((e) => [e.idx, e]) ?? []), D = Math.max(48, Math.min(128, Math.ceil(Math.PI * 2 * y / 4)));
	for (let e of o) {
		let n = e.value / c / l, r = Zt(t.firstSliceAngle, w, n), i = h.get(e.index), o = Q(t, a, i, e.index, 0), s = r.middle, u = i?.explosion != null && Number.isFinite(i.explosion) ? Math.max(0, Math.min(100, i.explosion)) / 100 : 0, d = b + Math.cos(s) * y * u, f = S + Math.sin(s) * y * u / m.modelDepth, p = Math.max(2, Math.ceil(D * n)), g = Le({
			centerX: d,
			centerY: x,
			centerDepth: f,
			radius: y,
			modelDepth: m.modelDepth,
			thickness: C,
			startAngle: r.start,
			endAngle: r.end,
			segments: p
		});
		if (!g) {
			w += n;
			continue;
		}
		T.push({
			index: e.index,
			start: r.start,
			end: r.end,
			color: o.fill === null ? "transparent" : o.color,
			fillPaint: o.fill,
			value: e.value,
			percentValue: n,
			centerX: d,
			centerDepth: f,
			segments: p,
			mesh: g,
			lineColor: o.lineColor,
			lineFill: o.lineFill,
			lineWidthEmu: o.lineWidthEmu ?? null,
			lineDash: o.lineDash ?? "solid",
			lineCustomDash: o.lineCustomDash,
			lineCap: o.lineCap,
			lineJoin: o.lineJoin
		}), w += n;
	}
	m = Ce(m, T.flatMap((e) => e.mesh.vertices), u, .08);
	let O = [], k = {
		remaining: Ke,
		exceeded: !1
	}, A = (e) => {
		let t = e.lineWidthEmu == null ? .75 * r : Math.max(.25, e.lineWidthEmu / X * r);
		return e.lineFill !== null && (e.lineColor != null || e.lineFill !== void 0) ? {
			color: e.lineColor ?? "rgba(0,0,0,0.42)",
			width: t,
			dash: R(e.lineCustomDash, e.lineDash, t),
			cap: e.lineCap,
			join: e.lineJoin
		} : void 0;
	}, j = T.map((t) => {
		let n = jt(m, t.mesh, t.color, void 0, k);
		return Ft(e, n, "fill", t.fillPaint, i), {
			slice: t,
			faces: n
		};
	}), N = j.flatMap((e) => e.faces), P = [], F = T.map(A), I = F[0], L = (e) => e == null ? null : [
		e.color,
		e.width,
		e.dash.join(","),
		e.cap,
		e.join
	].join("|"), z = I != null && T.every((e) => e.lineFill === void 0) && F.every((e) => L(e) === L(I)) && T.every((e) => Math.abs(e.centerX - b) < 1e-9 && Math.abs(e.centerDepth - S) < 1e-9);
	if (z) P.push(...Mt(m, T, x, y, C, I, k));
	else for (let t = 0; t < T.length; t++) {
		let n = F[t];
		if (!n) continue;
		let r = jt(m, T[t].mesh, "transparent", n, k, !0);
		Ft(e, r, "outline", T[t].lineFill, i), P.push(...r);
	}
	if (k.exceeded) return It(e, n), !0;
	if (z) {
		for (let t of Ge(N)) Nt(e, t);
		for (let t of Ge(P)) Nt(e, t);
	} else for (let t of Ge([...N, ...P])) Nt(e, t);
	for (let { slice: n, faces: i } of j) {
		let o = h.get(n.index), c = De(t, a, n.index, 0), l = s(o?.chartexStyle);
		_(e, l ?? s(a.chartexStyle), p(t, "dataPoint3D", 0), l ? n.index : c, r, (e) => Pt(e, i), c);
	}
	for (let n of T) {
		let o = (n.start + n.end) / 2, s = E.get(n.index);
		if (Vt(t, a, s)) {
			let c = a.seriesDataLabels, l = M(s?.fontSizeHpt ?? c?.fontSizeHpt ?? t.dataLabelFontSizeHpt, r) ?? 9 * r;
			e.font = `${s?.fontBold ?? c?.fontBold ?? t.dataLabelFontBold ? "bold " : ""}${l}px ${$(t, s?.fontFace ?? c?.fontFace ?? t.dataLabelFontFace)}`;
			let d = ne({
				customText: s?.text,
				showCategory: s?.showCatName ?? c?.showCatName ?? !1,
				showSeries: s?.showSerName ?? c?.showSerName ?? !1,
				showValue: s?.showVal ?? c?.showVal ?? t.showDataLabels,
				showPercent: s?.showPercent ?? c?.showPercent ?? !1,
				category: a.categories?.[n.index] ?? t.categories[n.index] ?? `${n.index + 1}`,
				seriesName: a.name || "Series 1",
				sourceValue: n.value,
				percentRatio: n.percentValue,
				formatCode: s?.formatCode ?? c?.formatCode ?? t.dataLabelFormatCode ?? a.valFormatCode,
				separator: s?.separator ?? c?.separator,
				date1904: t.date1904
			}), f = $(t, s?.fontFace ?? c?.fontFace ?? t.dataLabelFontFace), p = s?.text && s.richRuns?.length ? Te(e, {
				runs: s.richRuns,
				ptToPx: r,
				fontFamily: f,
				fallbackBold: s.fontBold ?? c?.fontBold ?? t.dataLabelFontBold ?? !1,
				fontFamilyForFace: (e) => $(t, e)
			}, l, `#${s.fontColor ?? c?.fontColor ?? a.labelColor ?? t.dataLabelFontColor ?? "111111"}`) : null, h = s?.position ?? c?.position ?? t.dataLabelPosition, g = x - C / 2, _ = x + C / 2, v = m.cameraDepth(n.centerX, g, n.centerDepth) >= m.cameraDepth(n.centerX, _, n.centerDepth) ? g : _, b = 0, S = null;
			for (let e = 0; e <= 12; e++) {
				let t = n.start + (n.end - n.start) * e / 12, r = m.project(n.centerX + Math.cos(t) * y * .64, v, n.centerDepth + Math.sin(t) * y * .64 / m.modelDepth);
				S && (b += Math.hypot(r.x - S.x, r.y - S.y)), S = r;
			}
			let w = (h == null || h === "bestFit") && (n.percentValue === 0 || b < (p?.width ?? e.measureText(d).width)) || h === "outEnd", T = y * (w ? 1.12 : .64), E = m.project(n.centerX + Math.cos(o) * T, v, n.centerDepth + Math.sin(o) * T / m.modelDepth), D = m.project(n.centerX + Math.cos(o) * y, v, n.centerDepth + Math.sin(o) * y / m.modelDepth);
			O.push(() => Bt(e, t, a, 0, n.index, n.value, E, u, r, 0, n.percentValue, s, "ctr", D, w, void 0, void 0, void 0, i));
		}
	}
	for (let e of O) e();
	let B = a.categories?.length ? a.categories : t.categories, V = Array.from({ length: B.length }, (e, n) => {
		let r = h.get(n), i = Oe(t, a, r, n, 0);
		if (i === null) return "00000000";
		let o = i?.fillType === "solid" ? i.color : r?.color ?? a.dataPointColors?.[n] ?? a.color;
		return o === "00000000" ? "00000000" : we(o ? `#${o}` : gt(n), .8).replace(/^#/, "");
	});
	return Yt(e, {
		...t,
		categories: B,
		series: [{
			...a,
			categories: B,
			dataPointColors: V
		}]
	}, d, r, !0, f, i), !0;
}
function hn(e, t, n, r, i = 0) {
	return !t.threeD || !(t.chartType === "pie" || pt.has(t.chartType)) ? !1 : xt(t) ? mn(e, t, n, r, i) ? !0 : pn(e, t, n, r, i) : (It(e, n), !0);
}
//#endregion
//#region src/three-d.ts
var gn = Ee({ render: hn }, "threeD");
//#endregion
export { gn as threeD };
