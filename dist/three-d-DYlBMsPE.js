import { C as e, Ct as t, Ft as n, Pn as r, Pt as i, S as a, St as o, b as s, o as c, s as l, w as u, wt as d, x as f } from "./plot-area-frame-DJnay5Wh.js";
//#region packages/core/src/shape/scene3d-draw.ts
function p(e, t, n, r) {
	let i = e.x, a = e.y, o = t.x, s = t.y, c = n.x, l = n.y, u = r.x, d = r.y, f = o - c, p = u - c, m = i - o + c - u, h = s - l, g = d - l, _ = a - s + l - d, v, y;
	if (Math.abs(m) < 1e-12 && Math.abs(_) < 1e-12) v = 0, y = 0;
	else {
		let e = f * g - p * h;
		if (Math.abs(e) < 1e-12) return null;
		v = (m * g - p * _) / e, y = (f * _ - m * h) / e;
	}
	return [
		o - i + v * o,
		u - i + y * u,
		i,
		s - a + v * s,
		d - a + y * d,
		a,
		v,
		y,
		1
	];
}
function m(e, t, n) {
	let r = e[6] * t + e[7] * n + e[8];
	return {
		x: (e[0] * t + e[1] * n + e[2]) / r,
		y: (e[3] * t + e[4] * n + e[5]) / r
	};
}
var h = 1;
function g(e, t) {
	let [n, r, i, a, o, s] = e, [c, l, u, d, f, p] = t;
	return [
		n * c + i * l,
		r * c + a * l,
		n * u + i * d,
		r * u + a * d,
		n * f + i * p + o,
		r * f + a * p + s
	];
}
function _(e, t, n, r, i, a, o, s, c, l, u, d, f) {
	let p = c - o, m = l - s;
	if (p <= 0 || m <= 0) return;
	let _ = (d.x - u.x) / p, v = (d.y - u.y) / p, y = (f.x - u.x) / m, b = (f.y - u.y) / m, x = (Math.hypot(d.x - u.x, d.y - u.y) || 1) * a, S = (Math.hypot(f.x - u.x, f.y - u.y) || 1) * a, C = h * p / x, w = h * m / S, T = Math.max(0, o - C), E = Math.max(0, s - w), D = Math.min(n, c + C), O = Math.min(r, l + w), k = D - T, A = O - E;
	if (k <= 0 || A <= 0) return;
	e.save();
	let [j, M, N, P, F, I] = g(i, [
		_,
		v,
		y,
		b,
		u.x - o * _ - s * y,
		u.y - o * v - s * b
	]);
	e.setTransform(j, M, N, P, F, I), e.drawImage(t, T, E, k, A, T, E, k, A), e.restore();
}
function v(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
	let h = m(o, c, l), g = m(o, u, l), y = m(o, c, d), x = m(o, u, d), S = (c + u) / 2, C = (l + d) / 2, w = m(o, S, C), T = {
		x: (h.x + g.x + y.x + x.x) / 4,
		y: (h.y + g.y + y.y + x.y) / 4
	}, E = b(i), D = Math.hypot(w.x - T.x, w.y - T.y) * E;
	if (p <= 0 || D <= f) {
		let o = s.x1 - s.x0, f = s.y1 - s.y0;
		_(e, t, n, r, i, a, s.x0 + c * o, s.y0 + l * f, s.x0 + u * o, s.y0 + d * f, h, g, y);
		return;
	}
	u - c >= d - l ? (v(e, t, n, r, i, a, o, s, c, l, S, d, f, p - 1), v(e, t, n, r, i, a, o, s, S, l, u, d, f, p - 1)) : (v(e, t, n, r, i, a, o, s, c, l, u, C, f, p - 1), v(e, t, n, r, i, a, o, s, c, C, u, d, f, p - 1));
}
function y(e, t, n, r, i, a = .5, o) {
	if (n <= 0 || r <= 0) return;
	let s = o ?? {
		x0: 0,
		y0: 0,
		x1: n,
		y1: r
	};
	if (![
		s.x0,
		s.y0,
		s.x1,
		s.y1
	].every(Number.isFinite) || s.x0 < 0 || s.y0 < 0 || s.x1 > n || s.y1 > r || s.x1 <= s.x0 || s.y1 <= s.y0) return;
	let [c, l, u, d] = i;
	if (Math.abs(c.x * l.y - l.x * c.y + l.x * u.y - u.x * l.y + u.x * d.y - d.x * u.y + d.x * c.y - c.x * d.y) / 2 < 1e-6) return;
	let f = p(i[0], i[1], i[2], i[3]);
	if (!f) return;
	let m = t.getTransform(), h = [
		m.a,
		m.b,
		m.c,
		m.d,
		m.e,
		m.f
	], g = b(h);
	E(e, t, n, r, i, h, g, f, s, a, 14) || (w(), t.save(), t.beginPath(), t.moveTo(i[0].x, i[0].y), t.lineTo(i[1].x, i[1].y), t.lineTo(i[2].x, i[2].y), t.lineTo(i[3].x, i[3].y), t.closePath(), t.clip(), v(t, e, n, r, h, g, f, s, 0, 0, 1, 1, a, 14), t.restore());
}
function b(e) {
	return Math.sqrt(Math.abs(e[0] * e[3] - e[1] * e[2])) || 1;
}
function x(e, t, n) {
	let r = p(e[0], e[1], e[2], e[3]);
	if (!r) return null;
	let i = [
		[-t, -n],
		[1 + t, -n],
		[1 + t, 1 + n],
		[-t, 1 + n]
	], a = [];
	for (let [e, t] of i) {
		if (!(r[6] * e + r[7] * t + r[8] > 1e-9)) return null;
		a.push(m(r, e, t));
	}
	return a;
}
function S(e, t, n) {
	let r = p(e[0], e[1], e[2], e[3]);
	return r && r[6] * t + r[7] * n + r[8] > 1e-9 ? m(r, t, n) : null;
}
var C = !1;
function w() {
	C || (C = !0, typeof console < "u" && typeof console.warn == "function" && console.warn("[ooxml] scene3d: no offscreen canvas available — using the direct warp fallback (per-cell bleed only, no supersample). Textured-source seams may be faintly visible; the silhouette and geometry are unaffected."));
}
var T = 2;
function E(e, t, n, r, a, o, s, c, l, u, d) {
	let f = a.map((e) => ({
		x: o[0] * e.x + o[2] * e.y + o[4],
		y: o[1] * e.x + o[3] * e.y + o[5]
	})), p = Infinity, m = Infinity, h = -Infinity, g = -Infinity;
	for (let e of f) e.x < p && (p = e.x), e.y < m && (m = e.y), e.x > h && (h = e.x), e.y > g && (g = e.y);
	p = Math.floor(p) - 1, m = Math.floor(m) - 1, h = Math.ceil(h) + 1, g = Math.ceil(g) + 1;
	let _ = h - p, y = g - m;
	if (_ <= 0 || y <= 0) return !1;
	let b = Math.max(1, Math.ceil(_ * T)), x = Math.max(1, Math.ceil(y * T)), S = i(b, x);
	if (!S || S.width !== b || S.height !== x) return !1;
	let C = S.getContext("2d") ?? null;
	if (!C) return !1;
	let w = T, E = [
		o[0] * w,
		o[1] * w,
		o[2] * w,
		o[3] * w,
		(o[4] - p) * w,
		(o[5] - m) * w
	];
	C.save(), C.setTransform(E[0], E[1], E[2], E[3], E[4], E[5]), C.beginPath(), C.moveTo(a[0].x, a[0].y), C.lineTo(a[1].x, a[1].y), C.lineTo(a[2].x, a[2].y), C.lineTo(a[3].x, a[3].y), C.closePath(), C.clip(), v(C, e, n, r, E, s, c, l, 0, 0, 1, 1, u * w, d), C.restore(), t.save(), t.setTransform(1, 0, 0, 1, 0, 0);
	let D = t.imageSmoothingEnabled, O = t.imageSmoothingQuality;
	return t.imageSmoothingEnabled = !0, t.imageSmoothingQuality = "high", t.drawImage(S, 0, 0, _ * w, y * w, p, m, _, y), t.imageSmoothingEnabled = D, t.imageSmoothingQuality = O, t.restore(), !0;
}
//#endregion
//#region packages/core/src/chart/three-d-surface-picture.ts
function D(e, t) {
	if (!t || ![
		t.l,
		t.t,
		t.r,
		t.b
	].some((e) => (e ?? 0) !== 0)) return e;
	let n = t.l ?? 0, r = t.t ?? 0, i = 1 - (t.r ?? 0), a = 1 - (t.b ?? 0), o = [
		S(e, n, r),
		S(e, i, r),
		S(e, i, a),
		S(e, n, a)
	];
	return o.every((e) => e != null) ? o : null;
}
function O(e, t) {
	if (e.length !== 4) return null;
	let n = e.map((e, n) => ({
		scenePoint: e,
		projected: t(e),
		index: n
	})).sort((e, t) => e.projected.y - t.projected.y || e.projected.x - t.projected.x), r = n.slice(0, 2).sort((e, t) => e.projected.x - t.projected.x), i = n.slice(2).sort((e, t) => e.projected.x - t.projected.x);
	return new Set([...r, ...i].map((e) => e.index)).size === 4 ? [
		r[0].scenePoint,
		r[1].scenePoint,
		i[1].scenePoint,
		i[0].scenePoint
	] : null;
}
function k(e, t, n, r) {
	if (e.thickness === 0 && n === 0) return [
		e.inner[3],
		e.inner[2],
		e.inner[1],
		e.inner[0]
	];
	let i = O(e.faces[n] ?? [], r);
	return !i || t !== "backWall" || n !== 4 ? i : [
		i[1],
		i[2],
		i[3],
		i[0]
	];
}
function A(e, t, n) {
	if (!(e != null && Number.isFinite(e) && e > 0) || !(t > 0) || !(n > 0)) return null;
	let r = e * n / t;
	return Number.isFinite(r) && r > 0 ? r : null;
}
function j(e, t, n) {
	return Math.hypot(e.x - t.x, e.y - t.y, (e.depth - t.depth) * n);
}
function M(r, i, p, m, h, g, _, v, b) {
	let x = s(i, m, h, b);
	if (!x || g.inner.length !== 4) return !1;
	let S = d(p);
	if (!(S.w > 0) || !(S.h > 0)) return !1;
	let C = o(p, i.srcRect), w = C ? {
		x0: C.sx,
		y0: C.sy,
		x1: C.sx + C.sw,
		y1: C.sy + C.sh
	} : void 0, T = [
		v(g.inner[3]),
		v(g.inner[2]),
		v(g.inner[1]),
		v(g.inner[0])
	], E = (e, t, n) => ({
		x: e.x + (t.x - e.x) * n,
		y: e.y + (t.y - e.y) * n,
		depth: e.depth + (t.depth - e.depth) * n
	}), O = (e, t, n) => [
		v(E(e[3], e[0], n)),
		v(E(e[2], e[1], n)),
		v(E(e[2], e[1], t)),
		v(E(e[3], e[0], t))
	], M = x.mode === "stack" ? A(g.pictureStackAspect, S.w, S.h) : null, N = x.mode === "tile" ? c(i, p) : null, P = [];
	if (x.mode === "stack") {
		if (M == null) return !1;
		let t = 0, n = !1;
		for (let r of _) {
			if (!f(x, r) || !k(g, h, r, v)) continue;
			let i = e(x, r) ? Math.ceil(1 / M) : 1;
			if (!Number.isSafeInteger(i) || i < 1 || (t += i, t > 4096)) return !1;
			n = !0;
		}
		if (!n) return !1;
	}
	if (x.mode === "tile") {
		if (!N) return !1;
		let e = 0, t = 0, i = !1;
		for (let a of _) {
			if (!f(x, a)) continue;
			let o = k(g, h, a, v);
			if (!o) continue;
			let s = j(o[0], o[1], g.modelDepth), c = j(o[0], o[3], g.modelDepth);
			if (!(s > 0) || !(c > 0)) continue;
			let u = l(N, s, c), d = Math.floor(-u.x / N.tileW), p = Math.floor(-u.y / N.tileH), m = Math.ceil((s - u.x) / N.tileW), _ = Math.ceil((c - u.y) / N.tileH), y = Math.max(0, m - d) * Math.max(0, _ - p);
			if (!Number.isSafeInteger(y) || (e += y, e > 4096)) return !1;
			if (y === 0) continue;
			let b = Math.ceil(s), S = Math.ceil(c);
			if (!(b > 0 && b <= 32767) || !(S > 0 && S <= 32767) || b > Math.floor((16777216 - t) / S)) return !1;
			t += b * S;
			let C = n(r, b, S), w = C?.getContext("2d");
			if (!C || !w) return !1;
			P.push({
				faceIndex: a,
				width: s,
				height: c,
				origin: u,
				firstColumn: d,
				firstRow: p,
				lastColumn: m,
				lastRow: _,
				canvas: C,
				context: w
			}), i = !0;
		}
		if (!i) return !1;
	}
	if (r.save(), i.alpha != null && (r.globalAlpha *= i.alpha), x.mode === "stretch") for (let e of _) {
		if (!f(x, e)) continue;
		let t = k(g, h, e, v), n = g.thickness === 0 && e === 0 ? T : t?.map(v);
		if (!n) continue;
		let a = D(n, i.fillRect);
		if (!a) continue;
		let o = C ? D(a, {
			l: C.dxFraction,
			t: C.dyFraction,
			r: 1 - C.dxFraction - C.dwFraction,
			b: 1 - C.dyFraction - C.dhFraction
		}) : a;
		if (o) {
			r.save(), r.beginPath(), r.moveTo(n[0].x, n[0].y);
			for (let e = 1; e < n.length; e++) r.lineTo(n[e].x, n[e].y);
			r.closePath(), r.clip(), y(p, r, S.w, S.h, o, .5, w), r.restore();
		}
	}
	else for (let n of _) {
		if (!f(x, n)) continue;
		let o = k(g, h, n, v);
		if (!o) continue;
		let s = o.map(v);
		r.save(), r.beginPath(), r.moveTo(s[0].x, s[0].y);
		for (let e = 1; e < s.length; e++) r.lineTo(s[e].x, s[e].y);
		r.closePath(), r.clip();
		let c = a(x, n);
		if (x.mode === "tile") {
			if (!N) continue;
			let e = P.find((e) => e.faceIndex === n);
			if (!e) continue;
			let a = e.canvas.width / e.width, o = e.canvas.height / e.height;
			e.context.save(), e.context.scale(a, o);
			for (let n = e.firstRow; n < e.lastRow; n++) for (let r = e.firstColumn; r < e.lastColumn; r++) {
				let a = e.origin.x + r * N.tileW, o = e.origin.y + n * N.tileH, s = N.flipX && Math.abs(r) % 2 == 1, c = N.flipY && Math.abs(n) % 2 == 1;
				e.context.save(), e.context.translate(a + (s ? N.tileW : 0), o + (c ? N.tileH : 0)), e.context.scale(s ? -1 : 1, c ? -1 : 1), t(e.context, p, i.srcRect, 0, 0, N.tileW, N.tileH), e.context.restore();
			}
			e.context.restore(), y(e.canvas, r, e.canvas.width, e.canvas.height, s, .5);
		} else if (x.mode === "stack") {
			if (M == null) continue;
			if (e(x, n)) for (let e = 0; e < Math.ceil(1 / M); e++) y(p, r, S.w, S.h, O(o, e * M, (e + 1) * M), .5, w);
			else y(p, r, S.w, S.h, s, .5, w);
		} else if (x.stackUnit != null && u(x, n)) for (let e = 0; e < c; e++) {
			let t = e * x.stackUnit / b, n = (e + 1) * x.stackUnit / b;
			y(p, r, S.w, S.h, O(o, t, n), .5, w);
		}
		else x.stackUnit != null && y(p, r, S.w, S.h, s, .5, w);
		r.restore();
	}
	return r.restore(), !0;
}
//#endregion
//#region packages/core/src/chart/axis-scale.ts
function N(e, t = {
	min: 0,
	max: 1
}) {
	let n = Infinity, r = -Infinity;
	for (let t of e) t == null || !Number.isFinite(t) || (t < n && (n = t), t > r && (r = t));
	return Number.isFinite(n) && Number.isFinite(r) ? {
		min: n,
		max: r
	} : t;
}
function P(e, t = 5) {
	if (e === 0) return 1;
	let n = e / t, r = 10 ** Math.floor(Math.log10(n)), i = n / r;
	return (i < 1.5 ? 1 : i < 3.5 ? 2 : i < 7.5 ? 5 : 10) * r;
}
function F(e, t, n, r) {
	let i = Number.isFinite(e) ? e : 0, a = Number.isFinite(t) ? t : 100, o = a > i ? a - i : 100, s = i < 0 && a > 0, c = n === "horizontal" || r == null || !Number.isFinite(r) || r < 120 ? s ? 4 : 5 : 10;
	return L(a > i ? B(i, a, c) : o / c);
}
function I(e, t, n) {
	let r = Number.isFinite(e) ? e : 0, i = Number.isFinite(t) ? t : 1, a = i > r ? null : 1, o = n != null && Number.isFinite(n) ? n < 45 ? 4 : n < 90 ? 8 : 10 : 8;
	return L(i > r ? B(r, i, o) : (a ?? 1) / o);
}
function ee(e, t, n) {
	let r = Number.isFinite(e) ? e : 0, i = Number.isFinite(t) ? t : 1;
	return L((i > r ? i - r : 1) / (n != null && Number.isFinite(n) && n > 0 ? Math.max(5, Math.round(n / 28)) : 5));
}
function L(e) {
	if (!(e > 0) || !isFinite(e)) return 1;
	let t = 10 ** Math.floor(Math.log10(e));
	if (!(t > 0) || !isFinite(t)) return e;
	let n = e / t, r = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
	return Math.min(Number.MAX_VALUE, r * t);
}
function R(e) {
	return e != null && isFinite(e) ? e : null;
}
function z(e) {
	return e != null && isFinite(e) && e > 0 ? e : null;
}
function B(e, t, n) {
	let r = t - e, i = isFinite(r) ? r / n : t / n - e / n;
	return i > 0 && isFinite(i) ? i : r > 0 && isFinite(r) ? Number.MIN_VALUE : Number.MAX_VALUE;
}
function V(e, t, n) {
	if (!isFinite(e) || !isFinite(t) || !(t >= e) || !(n > 0) || !isFinite(n)) return 0;
	let r = t - e, i = isFinite(r) ? r / n : t / n - e / n;
	return !isFinite(i) || i > 2 ** 53 - 1 ? Infinity : Math.max(1, Math.floor(i + 1e-9) + 1);
}
function H(e, t, n, r, i) {
	let a = V(e, t, n);
	if (a === 0 || a > 512 && r === "skip") return [];
	let o = Math.min(a, 512), s = [], c = t - e, l = Math.max(Math.abs(n), isFinite(c) ? Math.abs(c) : Math.max(Math.abs(e), Math.abs(t))) * 1e-9, u = -Infinity;
	for (let r = 0; r < o; r++) {
		let a = r * n, o = e + a;
		if ((!isFinite(a) || !isFinite(o) || r > 0 && !(o > u)) && (o = (e / n + r) * n), !isFinite(o) || o > t + l || r > 0 && !(o > u)) break;
		if (u = o, i != null) {
			if (o >= t - l) break;
			let n = o - e, r = isFinite(n) ? n / i : o / i - e / i;
			if (isFinite(r) && Math.abs(r - Math.round(r)) <= 1e-8) continue;
		}
		s.push(o);
	}
	return s;
}
function U(e) {
	let t = isFinite(e.dataMin) ? e.dataMin : 0, n = isFinite(e.dataMax) ? e.dataMax : 1;
	t > n && ([t, n] = [n, t]);
	let r, i, a;
	if (t === 0 && n === 0) r = 0, i = 1, a = .1;
	else {
		t === n && (t = Math.min(0, t), n = Math.max(0, n));
		let e = t >= 0 && (t === 0 || n > 1.2 * t), o = n <= 0 && (n === 0 || Math.abs(t) > 1.2 * Math.abs(n)), s = e ? 0 : t, c = o ? 0 : n, l = c - s, u = isFinite(l) ? l * .05 : c * .05 - s * .05, d = e ? 0 : t - u, f = o ? 0 : n + u;
		a = L(f / 10 - d / 10), r = Math.floor(d / a) * a, i = Math.ceil(f / a) * a, (!isFinite(r) || !isFinite(i) || !(i > r)) && (r = Math.min(t, 0), i = Math.max(n, r + a));
	}
	let o = R(e.explicitMin), s = R(e.explicitMax), c = z(e.majorUnit), l = o ?? (c == null ? r : Math.floor(r / c) * c), u = s ?? (c == null ? i : Math.ceil(i / c) * c), d = a;
	if (c == null && o != null && s != null && s > o) {
		if (e.axisOrientation === "horizontal") d = L(B(o, s, e.axisLenPt != null && isFinite(e.axisLenPt) && e.axisLenPt > 0 ? Math.max(5, Math.round(e.axisLenPt / 38)) : 8));
		else if (e.axisOrientation === "vertical") {
			let t = e.axisLenPt != null && isFinite(e.axisLenPt) && e.axisLenPt > 0 ? Math.max(5, Math.round(e.axisLenPt / 28)) : 7;
			d = Math.max(L(B(o, s, 10)), Math.min(Number.MAX_VALUE, P(B(o, s, t), 1)));
		}
	}
	let f = c ?? d;
	c == null && V(l, u, f) > 512 && (f = L(u / 511 - l / 511));
	let p = z(e.minorUnit);
	e.needMinor && c == null && p == null && V(l, u, f / 5) > 512 && (f = L(u / 102 - l / 102));
	let m = f / 5, h = e.needMinor ? p ?? (m > 0 && isFinite(m) ? m : f) : null, g = H(l, u, f, c == null ? "skip" : "truncate"), _ = h == null ? [] : H(l, u, h, "skip", f);
	return {
		min: l,
		max: u,
		majorUnit: f,
		minorUnit: h,
		majorTicks: g,
		minorTicks: _
	};
}
function te(e, t, n, r) {
	let i, a = r?.logBase;
	if (a != null && isFinite(a) && a >= 2 && t > 0 && n > 0) {
		let r = Math.log(t), a = Math.log(n) - r;
		i = a === 0 ? 0 : (Math.log(Math.max(e, Number.MIN_VALUE)) - r) / a;
	} else {
		let r = n - t;
		if (r === 0) i = 0;
		else if (Number.isFinite(r) && Number.isFinite(e - t)) i = (e - t) / r;
		else {
			let r = Math.max(Math.abs(e), Math.abs(t), Math.abs(n)), a = n / r - t / r;
			i = a === 0 ? 0 : (e / r - t / r) / a;
		}
	}
	return r?.reversed ? 1 - i : i;
}
function ne(e, t, n, r, i) {
	let a = isFinite(n) && n >= 2 ? n : 10, o = (e) => Math.log(e) / Math.log(a), s = t > 0 ? t : 1, c = Math.floor(o(e > 0 ? e : s)), l = Math.ceil(o(s)), u = (e) => {
		let t = a ** +e;
		return t === 0 ? Number.MIN_VALUE : isFinite(t) ? t : Number.MAX_VALUE;
	}, d = r ?? u(c), f = i ?? u(Math.max(l, c + 1)), p = [], m = Math.ceil(o(d) - 1e-9), h = Math.floor(o(f) + 1e-9);
	if (!isFinite(m) || !isFinite(h) || h < m) return {
		min: d,
		max: f,
		lines: p
	};
	let g = h - m + 1, _ = Math.max(1, Math.ceil((g - 1) / 511)), v = Math.min(512, Math.floor((g - 1) / _) + 1);
	for (let e = 0; e < v; e++) {
		let t = u(m + e * _);
		t >= d && t <= f && (p.length === 0 || t > p[p.length - 1]) && p.push(t);
	}
	let y = u(h);
	return p.length < 512 && y >= d && y <= f && y > (p[p.length - 1] ?? 0) && p.push(y), {
		min: d,
		max: f,
		lines: p
	};
}
function W(e) {
	let t = e.logBase;
	if (t != null && Number.isFinite(t) && t >= 2) {
		let { min: n, max: r, lines: i } = ne(e.dataMin, e.dataMax, t, R(e.explicitMin), R(e.explicitMax));
		return {
			min: n,
			max: r,
			majorUnit: i.length > 1 ? i[1] - i[0] : r - n,
			minorUnit: null,
			majorTicks: i,
			minorTicks: [],
			fraction: (i) => te(i, n, r, {
				logBase: t,
				reversed: e.reversed
			})
		};
	}
	let n = U(e);
	return {
		...n,
		fraction: (t) => te(t, n.min, n.max, { reversed: e.reversed })
	};
}
function G(e, t, n) {
	let r = Math.min(e.length, t.length);
	if (r < 2) return null;
	let i = 0, a = 0, o = 0, s = 0;
	for (let n = 0; n < r; n++) i += e[n], a += t[n], o += e[n] * e[n], s += e[n] * t[n];
	let c, l;
	if (n != null && isFinite(n)) c = o === 0 ? 0 : (s - n * i) / o, l = n;
	else {
		let e = r * o - i * i;
		c = e === 0 ? 0 : (r * s - i * a) / e, l = (a - c * i) / r;
	}
	let u = a / r, d = 0, f = 0;
	for (let n = 0; n < r; n++) {
		let r = t[n] - (c * e[n] + l);
		d += r * r;
		let i = t[n] - u;
		f += i * i;
	}
	let p = f === 0 ? +(d === 0) : 1 - d / f;
	return {
		slope: c,
		intercept: l,
		rSquared: p
	};
}
function re(e, t, n, r) {
	let i = Math.min(e.length, t.length);
	if (i < 2) return {
		xs: [],
		ys: []
	};
	if (n === "linear") {
		let n = G(e, t, r?.intercept);
		if (!n) return {
			xs: [],
			ys: []
		};
		let a = e[0], o = e[i - 1];
		return {
			xs: [a, o],
			ys: [n.slope * a + n.intercept, n.slope * o + n.intercept]
		};
	}
	if (n === "movingAvg") {
		let n = Math.max(2, Math.round(r?.period ?? 2));
		if (i < n) return {
			xs: [],
			ys: []
		};
		let a = [], o = [], s = 0;
		for (let e = 0; e < n; e++) s += t[e];
		for (let r = n - 1; r < i; r++) {
			a.push(e[r]), o.push(s / n);
			let c = r + 1;
			c < i && (s += t[c] - t[c - n]);
		}
		return {
			xs: a,
			ys: o
		};
	}
	let a = [];
	for (let r = 0; r < i; r++) {
		let i = e[r], o = t[r];
		!Number.isFinite(i) || !Number.isFinite(o) || n === "log" && i <= 0 || n === "exp" && o <= 0 || n === "power" && (i <= 0 || o <= 0) || a.push({
			x: i,
			y: o
		});
	}
	if (a.length < 2) return {
		xs: [],
		ys: []
	};
	let o = Infinity, s = -Infinity;
	for (let e of a) o = Math.min(o, e.x), s = Math.max(s, e.x);
	if (!Number.isFinite(o) || !Number.isFinite(s) || s <= o) return {
		xs: [],
		ys: []
	};
	let c = Number.isFinite(r?.backward) ? Math.max(0, r?.backward ?? 0) : 0, l = Number.isFinite(r?.forward) ? Math.max(0, r?.forward ?? 0) : 0, u = o - c, d = s + l;
	if ((n === "log" || n === "power") && (u = Math.max(Number.MIN_VALUE, u)), !Number.isFinite(u) || !Number.isFinite(d) || d <= u) return {
		xs: [],
		ys: []
	};
	let f = (e) => {
		let t = [], n = [];
		for (let r = 0; r <= 64; r++) {
			let i = r / 64, a = u * (1 - i) + d * i, o = e(a);
			if (!Number.isFinite(a) || !Number.isFinite(o)) return {
				xs: [],
				ys: []
			};
			t.push(a), n.push(o);
		}
		return {
			xs: t,
			ys: n
		};
	};
	if (n === "exp" || n === "log" || n === "power") {
		let e = G(a.map((e) => n === "log" || n === "power" ? Math.log(e.x) : e.x), a.map((e) => n === "exp" || n === "power" ? Math.log(e.y) : e.y));
		if (!e || ![e.slope, e.intercept].every(Number.isFinite)) return {
			xs: [],
			ys: []
		};
		if (n === "exp") {
			let t = Math.exp(e.intercept);
			return f((n) => t * Math.exp(e.slope * n));
		}
		if (n === "log") return f((t) => e.slope * Math.log(t) + e.intercept);
		let t = Math.exp(e.intercept);
		return f((n) => t * n ** e.slope);
	}
	if (n === "poly") {
		let e = Math.min(6, a.length - 1, Math.max(2, Math.round(r?.order ?? 2)));
		if (e < 2) return {
			xs: [],
			ys: []
		};
		let t = o / 2 + s / 2, n = Math.max(Math.abs(o - t), Math.abs(s - t));
		if (!Number.isFinite(t) || !Number.isFinite(n) || n <= 0) return {
			xs: [],
			ys: []
		};
		let i = a.length, c = e + 1, l = Array.from({ length: c }, () => Array(i).fill(0));
		for (let e = 0; e < i; e++) {
			let r = (a[e].x - t) / n, i = 1;
			for (let t = 0; t < c; t++) l[t][e] = i, i *= r;
		}
		let u = [], d = Array.from({ length: c }, () => Array(c).fill(0)), p = Array(c).fill(0);
		for (let e = 0; e < c; e++) {
			let t = l[e].slice();
			for (let n = 0; n < e; n++) {
				let r = 0;
				for (let e = 0; e < i; e++) r += u[n][e] * t[e];
				d[n][e] = r;
				for (let e = 0; e < i; e++) t[e] -= r * u[n][e];
			}
			let n = 0;
			for (let e of t) n += e * e;
			let r = Math.sqrt(n);
			if (!Number.isFinite(r) || r <= 2 ** -52 * Math.sqrt(i)) return {
				xs: [],
				ys: []
			};
			d[e][e] = r;
			let o = t.map((e) => e / r);
			u.push(o);
			let s = 0;
			for (let e = 0; e < i; e++) s += o[e] * a[e].y;
			if (!Number.isFinite(s)) return {
				xs: [],
				ys: []
			};
			p[e] = s;
		}
		let m = Array(c).fill(0);
		for (let e = c - 1; e >= 0; e--) {
			let t = p[e];
			for (let n = e + 1; n < c; n++) t -= d[e][n] * m[n];
			if (m[e] = t / d[e][e], !Number.isFinite(m[e])) return {
				xs: [],
				ys: []
			};
		}
		return f((r) => {
			let i = (r - t) / n, a = m[e];
			for (let t = e - 1; t >= 0; t--) a = a * i + m[t];
			return a;
		});
	}
	return {
		xs: [],
		ys: []
	};
}
//#endregion
//#region packages/core/src/chart/text-elide.ts
var K = "…";
function q(e, t, n) {
	if (t === "" || n <= 0) return "";
	if (e.measureText(t).width <= n) return t;
	if (e.measureText(K).width > n) return "";
	let r = 0, i = t.length - 1, a = 0;
	for (; r <= i;) {
		let o = r + i >> 1;
		e.measureText(t.slice(0, o) + K).width <= n ? (a = o, r = o + 1) : i = o - 1;
	}
	let o = a > 0 ? t.charCodeAt(a - 1) : 0;
	return o >= 55296 && o <= 56319 && a--, t.slice(0, a) + K;
}
//#endregion
//#region packages/core/src/chart/rich-data-label.ts
var J = 4096, ie = 4, Y = J;
function ae(e, t, n, i) {
	let a = [[]], o = [null], s = 0, c = (e) => {
		if (!e) return null;
		let t = e.startsWith("#") ? e.slice(1) : e;
		return /^[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(t) ? `#${t}` : null;
	};
	outer: for (let l = 0; l < t.runs.length && l < Y; l++) {
		let u = t.runs[l];
		u.text !== "\n" && o[a.length - 1] == null && (o[a.length - 1] = u.paragraphAlign ?? null);
		let d = r(u.fontSizeHpt, t.ptToPx) ?? n, f = u.fontFace?.trim().replaceAll("\"", ""), p = f && !f.startsWith("+") ? f : null, m = f && t.fontFamilyForFace ? t.fontFamilyForFace(f) : p ? `"${p}", Calibri, Arial, sans-serif` : t.fontFamily, h = `${u.italic ?? t.fallbackItalic ?? !1 ? "italic " : ""}${u.bold ?? t.fallbackBold ? "bold " : ""}${d}px ${m}`, g = (u.baseline ?? t.fallbackBaseline ?? 0) * d, _ = u.colorPaintAuthored === !0 || u.color != null || u.colorHidden === !0 ? u.colorHidden === !0 ? null : c(u.color) : t.fallbackColorHidden === !0 ? null : i, v = "", y = () => {
			v &&= (e.font = h, a[a.length - 1].push({
				text: v,
				font: h,
				fillStyle: _,
				width: e.measureText(v).width,
				fontSizePx: d,
				baselineShiftPx: g
			}), "");
		}, b = !1;
		for (let e of u.text) {
			if (b && e === "\n") {
				b = !1;
				continue;
			}
			b = !1;
			let t = e === "\r" ? "\n" : e;
			if (e === "\r" && (b = !0), s >= J) {
				y();
				break outer;
			}
			if (s++, t === "\n") {
				if (y(), a.length >= ie) break outer;
				a.push([]), o.push(u.paragraphAlign ?? null);
			} else v += t;
		}
		y();
	}
	if (!a.some((e) => e.length > 0)) return null;
	let l = a.map((e) => Math.max(n * 1.15, ...e.map((e) => e.fontSizePx * 1.15 + Math.abs(e.baselineShiftPx)))), u = a.map((e) => e.reduce((e, t) => e + t.width, 0));
	return {
		lines: a,
		lineAligns: o,
		lineHeights: l,
		lineWidths: u,
		width: Math.max(0, ...u),
		height: l.reduce((e, t) => e + t, 0)
	};
}
function X(e, t, n, r, i = "center", a = "middle", o = t.width) {
	let s = a === "top" ? r : a === "bottom" ? r - t.height : r - t.height / 2;
	for (let r = 0; r < t.lines.length; r++) {
		let c = t.lines[r], l = t.lineWidths[r], u = t.lineAligns[r], d = u === "l" ? "left" : u === "r" ? "right" : u === "ctr" ? "center" : i, f = i === "left" ? n : i === "right" ? n - o : n - o / 2, p = f + o, m = d === "left" ? f : d === "right" ? p - l : f + (o - l) / 2, h = a === "top" ? s : a === "bottom" ? s + t.lineHeights[r] : s + t.lineHeights[r] / 2;
		for (let t of c) {
			if (e.font = t.font, t.fillStyle == null) {
				m += t.width;
				continue;
			}
			e.fillStyle = t.fillStyle, e.textAlign = "left", e.textBaseline = a, e.fillText(t.text, m, h - t.baselineShiftPx), m += t.width;
		}
		s += t.lineHeights[r];
	}
}
//#endregion
//#region packages/core/src/chart/material-color.ts
function Z(e) {
	return e.rotationX === 15 && e.rotationY === 20 && e.rightAngleAxes === !1 && e.perspective === 30;
}
function oe(e) {
	return Z(e) ? 2 : 1;
}
function se(e, t) {
	let n = e.replace(/^#/, "");
	if (!/^[0-9a-f]{6}$/i.test(n) || !Number.isFinite(t)) return e;
	let r = Math.max(0, t), i = (e) => Math.max(0, Math.min(255, Math.round(Number.parseInt(n.slice(e, e + 2), 16) * r))).toString(16).padStart(2, "0");
	return `#${i(0)}${i(2)}${i(4)}`.toUpperCase();
}
function ce(e) {
	if (!e) return 1;
	let t = e.z < 0 ? {
		x: -e.x,
		y: -e.y,
		z: -e.z
	} : e, n = {
		x: .24,
		y: .42,
		z: .88
	}, r = Math.hypot(n.x, n.y, n.z), i = Math.max(0, (t.x * n.x + t.y * n.y + t.z * n.z) / r);
	return Math.max(.48, Math.min(1.22, .48 + .78 * i));
}
//#endregion
//#region packages/core/src/chart/three-d.ts
function le(e, t, n, r, i) {
	let a = Number.isFinite(e) && e > 0 ? e : 0, o = Number.isFinite(t) ? $(t, 0, 500) : 150, s = Math.max(1, Math.trunc(r)), c = $(Math.trunc(n), 0, s - 1), l = i ? 1 : s, u = a / (l + o / 100);
	return {
		offset: (a - u * l) / 2 + (i ? 0 : c * u),
		size: u
	};
}
function ue(e, t, n) {
	if (![
		e,
		t,
		n
	].every(Number.isFinite)) return 1;
	let r = e >= 0 ? n : t;
	return 1 - Math.min(1, Math.abs(e) / Math.max(Number.MIN_VALUE, Math.abs(r)));
}
function de(e) {
	return !(e.heightPercentAuthored ?? e.heightPercent != null) || e.heightPercent == null || !Number.isFinite(e.heightPercent) || e.heightPercent < 5 || e.heightPercent > 500 ? 1 : e.heightPercent / 100;
}
function fe(e, t, n, r) {
	if (!t.length || t.length > 1e5 || ![
		n.x,
		n.y,
		n.w,
		n.h
	].every(Number.isFinite) || n.w <= 0 || n.h <= 0 || !t.every((e) => Number.isFinite(e.x) && Number.isFinite(e.y))) return e;
	let i = Infinity, a = -Infinity, o = Infinity, s = -Infinity;
	for (let e of t) i = Math.min(i, e.x), a = Math.max(a, e.x), o = Math.min(o, e.y), s = Math.max(s, e.y);
	let c = a - i, l = s - o;
	if (!(c > 2 ** -52) || !(l > 2 ** -52)) return e;
	let u = $(Q(r, .06), 0, .45), d = n.w * (1 - 2 * u), f = n.h * (1 - 2 * u), p = Math.min(d / c, f / l);
	if (!(p > 0) || !Number.isFinite(p)) return e;
	let m = {
		x: (i + a) / 2,
		y: (o + s) / 2
	}, h = {
		x: n.x + n.w / 2,
		y: n.y + n.h / 2
	}, g = (e) => (t, n, r) => {
		let i = e(t, n, r);
		return {
			x: h.x + (i.x - m.x) * p,
			y: h.y + (i.y - m.y) * p
		};
	};
	return {
		...e,
		project: g(e.project),
		projectUnbounded: g(e.projectUnbounded),
		depthX: e.depthX * p,
		depthY: e.depthY * p
	};
}
function pe(e, t, n, r = .06) {
	return !t.length || t.length > 1e5 ? e : fe(e, t.map((t) => e.project(t.x, t.y, t.depth)), n, r);
}
var me = 4294967295;
function he(e, t, n) {
	let { front: r } = e, i = r.x, a = r.x + r.w, o = e.topology.farX === "min" ? i : a, s = e.topology.axisY === "min" ? r.y : r.y + r.h, c = s === r.y ? r.y + r.h : r.y, { nearDepth: l, farDepth: u } = e.topology, d = [
		e.projectUnbounded(i, c, u),
		e.projectUnbounded(a, c, u),
		e.projectUnbounded(i, s, u)
	], f = [i, a].flatMap((t) => [c, s].flatMap((n) => [l, u].map((r) => e.projectUnbounded(t, n, r).x))), p = Math.max(...f) - Math.min(...f), m = Math.hypot(d[0].x - d[2].x, d[0].y - d[2].y), h = p > 0 && m > 0 ? p / m : null, g = n ?? 0, _ = Number.isFinite(g) && g >= 0 && g <= me ? g : 0, v = Math.max(r.w, r.h, e.modelDepth) * _ / 100, y, b;
	if (t === "floor") {
		y = [
			{
				x: i,
				y: s,
				depth: l
			},
			{
				x: a,
				y: s,
				depth: l
			},
			{
				x: a,
				y: s,
				depth: u
			},
			{
				x: i,
				y: s,
				depth: u
			}
		];
		let e = s + (s === r.y ? -v : v);
		b = y.map((t) => ({
			...t,
			y: e
		}));
	} else if (t === "sideWall") {
		y = [
			{
				x: o,
				y: s,
				depth: l
			},
			{
				x: o,
				y: s,
				depth: u
			},
			{
				x: o,
				y: c,
				depth: u
			},
			{
				x: o,
				y: c,
				depth: l
			}
		];
		let e = o + (o === i ? -v : v);
		b = y.map((t) => ({
			...t,
			x: e
		}));
	} else {
		y = [
			{
				x: i,
				y: s,
				depth: u
			},
			{
				x: a,
				y: s,
				depth: u
			},
			{
				x: a,
				y: c,
				depth: u
			},
			{
				x: i,
				y: c,
				depth: u
			}
		];
		let t = e.modelDepth > 0 ? v / e.modelDepth : 0, n = u === 0 ? -t : 1 + t;
		b = y.map((e) => ({
			...e,
			depth: n
		}));
	}
	if (!(v > 0)) return {
		thickness: 0,
		inner: y,
		outer: [...y],
		faces: [y],
		pictureStackAspect: h,
		modelDepth: e.modelDepth
	};
	let x = y.map((e, t) => [
		e,
		y[(t + 1) % y.length],
		b[(t + 1) % b.length],
		b[t]
	]), S = [
		y,
		b,
		...x
	], C = [...y, ...b].reduce((e, t) => ({
		x: e.x + t.x / 8,
		y: e.y + t.y / 8,
		depth: e.depth + t.depth / 8
	}), {
		x: 0,
		y: 0,
		depth: 0
	}), w = S.map((e) => {
		let [t, n, r] = e, i = {
			x: n.x - t.x,
			y: n.y - t.y,
			depth: n.depth - t.depth
		}, a = {
			x: r.x - t.x,
			y: r.y - t.y,
			depth: r.depth - t.depth
		}, o = {
			x: i.y * a.depth - i.depth * a.y,
			y: i.depth * a.x - i.x * a.depth,
			depth: i.x * a.y - i.y * a.x
		}, s = e.reduce((t, n) => ({
			x: t.x + n.x / e.length,
			y: t.y + n.y / e.length,
			depth: t.depth + n.depth / e.length
		}), {
			x: 0,
			y: 0,
			depth: 0
		}), c = {
			x: s.x - C.x,
			y: s.y - C.y,
			depth: s.depth - C.depth
		};
		return o.x * c.x + o.y * c.y + o.depth * c.depth < 0 ? [...e].reverse() : e;
	});
	return {
		thickness: v,
		inner: y,
		outer: b,
		faces: w,
		pictureStackAspect: h,
		modelDepth: e.modelDepth
	};
}
function ge(e, t, n, r) {
	if (!Number.isFinite(r) || r < 0 || r > 1 || n === "x" && t === "sideWall" || n === "y" && t === "floor") return [];
	let i = (e, t) => ({
		x: e.x + (t.x - e.x) * r,
		y: e.y + (t.y - e.y) * r,
		depth: e.depth + (t.depth - e.depth) * r
	}), a, o, s, c, l, u;
	n === "x" ? (a = i(e.inner[0], e.inner[1]), o = i(e.inner[3], e.inner[2]), s = i(e.outer[0], e.outer[1]), c = i(e.outer[3], e.outer[2]), l = 2, u = 4) : (a = i(e.inner[0], e.inner[3]), o = i(e.inner[1], e.inner[2]), s = i(e.outer[0], e.outer[3]), c = i(e.outer[1], e.outer[2]), l = 5, u = 3);
	let d = [{
		faceIndex: 0,
		scenePoints: [a, o]
	}];
	return e.thickness > 0 && d.push({
		faceIndex: 1,
		scenePoints: [s, c]
	}, {
		faceIndex: l,
		scenePoints: [a, s]
	}, {
		faceIndex: u,
		scenePoints: [o, c]
	}), d;
}
function _e(e, t, n) {
	let r = [
		["floor", t.floor?.thicknessPercent],
		["sideWall", t.sideWall?.thicknessPercent],
		["backWall", t.backWall?.thicknessPercent]
	].map(([t, n]) => he(e, t, n));
	return r.some((e) => e.thickness > 0) ? fe(e, r.flatMap((e) => e.faces.flat()).map((t) => e.projectUnbounded(t.x, t.y, t.depth)), n, .03) : e;
}
var Q = (e, t) => typeof e == "number" && Number.isFinite(e) ? e : t, $ = (e, t, n) => Math.min(n, Math.max(t, e));
function ve(e, t, n = {}) {
	if (![
		t.x,
		t.y,
		t.w,
		t.h
	].every(Number.isFinite) || t.w <= 0 || t.h <= 0) return null;
	let r = $(Q(e.rotationX, 15), -90, 90), i = ($(Q(e.rotationY, 20), 0, 360) + 180) % 360 - 180, a = $(Q(e.depthPercent, 100), 20, 2e3), o = $(Q(e.perspective, 30), 0, 240), s = $(Q(e.gapDepthPercent, 150), 0, 500), c = (e.heightPercentAuthored ?? e.heightPercent != null) && e.heightPercent != null && Number.isFinite(e.heightPercent) ? $(e.heightPercent, 5, 500) : null, l = n.sceneHeightScale != null && Number.isFinite(n.sceneHeightScale) ? $(n.sceneHeightScale * 100, 5, 500) : null, u = c ?? l, d = t;
	if (u != null) {
		let e = u / 100, n = Math.min(t.w, t.h / e), r = n * e;
		d = {
			x: t.x + (t.w - n) / 2,
			y: t.y + (t.h - r) / 2,
			w: n,
			h: r
		};
	}
	let f = Math.PI / 180, p = $(Q(n.sceneDepthScale, .1), .01, 2), m = d.w * p * (a / 100), h = d.x + d.w / 2, g = d.y + d.h / 2, _ = -i * f, v = r * f, y = Math.cos(_), b = Math.sin(_), x = Math.cos(v), S = Math.sin(v), C = e.rightAngleAxes !== !0 && o > 0, w = $(o * .25, .25, 60) * f, T = $(Q(n.perspectiveTangentGain, 2), .25, 4), E = Math.atan(T * Math.tan(w)), D = Math.hypot(d.w, d.h, m), O = C ? D * .5 / Math.tan(E) : Infinity, k = (e, t, n, r = !0) => {
		let i = e - h, a = g - t, o = Number.isFinite(n) ? n : 0, s = (.5 - (r ? $(o, 0, 1) : o)) * m, c = y * i + b * s, l = -b * i + y * s;
		return {
			x: c,
			y: x * a - S * l,
			z: S * a + x * l
		};
	}, A = (e) => {
		if (e.length < 3) return null;
		let t = e.map((e) => k(e.x, e.y, e.depth, !1)), n = t[0], r = null;
		for (let e = 1; e + 1 < t.length && !r; e++) for (let i = e + 1; i < t.length; i++) {
			let a = t[e], o = t[i], s = {
				x: a.x - n.x,
				y: a.y - n.y,
				z: a.z - n.z
			}, c = {
				x: o.x - n.x,
				y: o.y - n.y,
				z: o.z - n.z
			}, l = {
				x: s.y * c.z - s.z * c.y,
				y: s.z * c.x - s.x * c.z,
				z: s.x * c.y - s.y * c.x
			}, u = Math.hypot(l.x, l.y, l.z);
			if (u > 2 ** -52) {
				r = {
					x: l.x / u,
					y: l.y / u,
					z: l.z / u
				};
				break;
			}
		}
		return r ? {
			normal: r,
			centroid: t.reduce((e, n) => ({
				x: e.x + n.x / t.length,
				y: e.y + n.y / t.length,
				z: e.z + n.z / t.length
			}), {
				x: 0,
				y: 0,
				z: 0
			})
		} : null;
	}, j = -Infinity;
	for (let e of [d.x, d.x + d.w]) for (let t of [d.y, d.y + d.h]) for (let n of [0, 1]) j = Math.max(j, k(e, t, n).z);
	let M = C ? Math.max(O, j + D * .01) : Infinity, N = (e, t, n, r = !0) => {
		let i = k(e, t, n, r);
		if (!C) return {
			x: i.x,
			y: -i.y
		};
		let a = M / Math.max(M * 1e-9, M - i.z);
		return {
			x: i.x * a,
			y: -i.y * a
		};
	}, P = [];
	for (let e of [d.x, d.x + d.w]) for (let t of [d.y, d.y + d.h]) for (let n of [0, 1]) P.push(N(e, t, n));
	let F = Math.min(...P.map((e) => e.x)), I = Math.max(...P.map((e) => e.x)), ee = Math.min(...P.map((e) => e.y)), L = Math.max(...P.map((e) => e.y)), R = Math.max(Number.MIN_VALUE, I - F), z = Math.max(Number.MIN_VALUE, L - ee), B = Math.min(t.w / R, t.h / z) * .94, V = t.x + (t.w - R * B) / 2 - F * B, H = t.y + (t.h - z * B) / 2 - ee * B, U = (e, t, n) => {
		let r = N(e, t, n);
		return {
			x: V + r.x * B,
			y: H + r.y * B
		};
	}, te = (e, t, n) => {
		let r = N(e, t, n, !1);
		return {
			x: V + r.x * B,
			y: H + r.y * B
		};
	}, ne = { ...d }, W = U(h, g, 0), G = U(h, g, 1), re = G.x - W.x, K = G.y - W.y, q = (e, t) => k(e === "x" ? t === "min" ? d.x : d.x + d.w : h, e === "y" ? t === "min" ? d.y : d.y + d.h : g, e === "depth" ? t === "min" ? 0 : 1 : .5).z, J = q("x", "min") <= q("x", "max") ? "min" : "max", ie = q("y", "min") <= q("y", "max") ? "min" : "max", Y = q("depth", "min") >= q("depth", "max") ? 0 : 1, ae = +(Y === 0), X = (e) => {
		let t = e === "min" ? d.x : d.x + d.w, n = U(t, d.y, Y), r = U(t, d.y + d.h, Y);
		return (n.x + r.x) / 2;
	}, Z = (e) => {
		let t = e === "min" ? d.y : d.y + d.h, n = U(d.x, t, Y), r = U(d.x + d.w, t, Y);
		return (n.y + r.y) / 2;
	}, oe = X("min") <= X("max") ? "min" : "max", se = Z("min") >= Z("max") ? "min" : "max", ce = (e) => 1 / Math.max(1, Math.trunc(e)) / (1 + s / 100), le = (e, t, n = !1) => n || t <= 1 ? .5 : ($(Math.trunc(e), 0, Math.max(0, t - 1)) + .5) / t;
	return {
		scene: d,
		front: ne,
		depthX: re,
		depthY: K,
		modelDepth: m,
		pieScaleY: $(Math.sin(Math.max(1, Math.abs(r)) * f) ** 1.15, .2, 1),
		pieThicknessFraction: .3 * Math.max(0, Math.cos(Math.abs(r) * f)),
		project: U,
		projectUnbounded: te,
		cameraDepth(e, t, n) {
			return k(e, t, n, !1).z;
		},
		cameraProjectionWeight(e, t, n) {
			if (!C) return 1;
			let r = k(e, t, n, !1).z;
			return 1 / Math.max(M * 1e-9, M - r);
		},
		cameraFacing(e) {
			let t = A(e);
			if (!t) return !1;
			let { normal: n, centroid: r } = t, i = C ? {
				x: -r.x,
				y: -r.y,
				z: M - r.z
			} : {
				x: 0,
				y: 0,
				z: 1
			}, a = n.x * i.x + n.y * i.y + n.z * i.z, o = Math.hypot(i.x, i.y, i.z);
			return o > 0 && a > o * 1e-10;
		},
		cameraNormal(e) {
			return A(e)?.normal ?? null;
		},
		topology: {
			farX: J,
			farY: ie,
			axisX: oe,
			axisY: se,
			nearDepth: Y,
			farDepth: ae
		},
		seriesDepth: le,
		prismDepth: ce,
		prismInterval(e, t, n = !1) {
			let r = le(e, t, n), i = ce(n ? 1 : t) / 2;
			return {
				near: $(r - i, 0, 1),
				far: $(r + i, 0, 1)
			};
		}
	};
}
//#endregion
export { U as C, x as D, y as E, S as O, P as S, M as T, I as _, he as a, re as b, ue as c, ce as d, oe as f, F as g, q as h, ve as i, Z as l, ae as m, _e as n, ge as o, X as p, de as r, le as s, pe as t, se as u, ee as v, W as w, G as x, N as y };
