import { Gt as e, Ht as t, Kt as n, Ut as r, Wt as i, _i as a, _r as o, ar as s, ir as c, o as l, or as u, s as d, vr as f } from "./plot-area-frame-DvwuejI0.js";
//#region packages/core/src/chart/rich-data-label.ts
var p = 4096, m = 4, h = p;
function g(e, t, n, r) {
	let i = [[]], o = [null], s = 0, c = (e) => {
		if (!e) return null;
		let t = e.startsWith("#") ? e.slice(1) : e;
		return /^[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(t) ? `#${t}` : null;
	};
	outer: for (let l = 0; l < t.runs.length && l < h; l++) {
		let u = t.runs[l];
		u.text !== "\n" && o[i.length - 1] == null && (o[i.length - 1] = u.paragraphAlign ?? null);
		let d = a(u.fontSizeHpt, t.ptToPx) ?? n, f = u.fontFace?.trim().replaceAll("\"", ""), h = f && !f.startsWith("+") ? f : null, g = f && t.fontFamilyForFace ? t.fontFamilyForFace(f) : h ? `"${h}", Calibri, Arial, sans-serif` : t.fontFamily, _ = `${u.italic ?? t.fallbackItalic ?? !1 ? "italic " : ""}${u.bold ?? t.fallbackBold ? "bold " : ""}${d}px ${g}`, v = (u.baseline ?? t.fallbackBaseline ?? 0) * d, y = u.colorPaintAuthored === !0 || u.color != null || u.colorHidden === !0 ? u.colorHidden === !0 ? null : c(u.color) : t.fallbackColorHidden === !0 ? null : r, b = "", x = () => {
			b &&= (e.font = _, i[i.length - 1].push({
				text: b,
				font: _,
				fillStyle: y,
				width: e.measureText(b).width,
				fontSizePx: d,
				baselineShiftPx: v
			}), "");
		}, S = !1;
		for (let e of u.text) {
			if (S && e === "\n") {
				S = !1;
				continue;
			}
			S = !1;
			let t = e === "\r" ? "\n" : e;
			if (e === "\r" && (S = !0), s >= p) {
				x();
				break outer;
			}
			if (s++, t === "\n") {
				if (x(), i.length >= m) break outer;
				i.push([]), o.push(u.paragraphAlign ?? null);
			} else b += t;
		}
		x();
	}
	if (!i.some((e) => e.length > 0)) return null;
	let l = i.map((e) => Math.max(n * 1.15, ...e.map((e) => e.fontSizePx * 1.15 + Math.abs(e.baselineShiftPx)))), u = i.map((e) => e.reduce((e, t) => e + t.width, 0));
	return {
		lines: i,
		lineAligns: o,
		lineHeights: l,
		lineWidths: u,
		width: Math.max(0, ...u),
		height: l.reduce((e, t) => e + t, 0)
	};
}
function _(e, t, n, r, i = "center", a = "middle", o = t.width) {
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
//#region packages/core/src/shape/scene3d-draw.ts
function v(e, t, n, r) {
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
function y(e, t, n) {
	let r = e[6] * t + e[7] * n + e[8];
	return {
		x: (e[0] * t + e[1] * n + e[2]) / r,
		y: (e[3] * t + e[4] * n + e[5]) / r
	};
}
var b = 1;
function x(e, t) {
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
function S(e, t, n, r, i, a, o, s, c, l, u, d, f) {
	let p = c - o, m = l - s;
	if (p <= 0 || m <= 0) return;
	let h = (d.x - u.x) / p, g = (d.y - u.y) / p, _ = (f.x - u.x) / m, v = (f.y - u.y) / m, y = (Math.hypot(d.x - u.x, d.y - u.y) || 1) * a, S = (Math.hypot(f.x - u.x, f.y - u.y) || 1) * a, C = b * p / y, w = b * m / S, T = Math.max(0, o - C), E = Math.max(0, s - w), D = Math.min(n, c + C), O = Math.min(r, l + w), k = D - T, A = O - E;
	if (k <= 0 || A <= 0) return;
	e.save();
	let [j, M, N, P, F, I] = x(i, [
		h,
		g,
		_,
		v,
		u.x - o * h - s * _,
		u.y - o * g - s * v
	]);
	e.setTransform(j, M, N, P, F, I), e.drawImage(t, T, E, k, A, T, E, k, A), e.restore();
}
function C(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
	let m = y(o, c, l), h = y(o, u, l), g = y(o, c, d), _ = y(o, u, d), v = (c + u) / 2, b = (l + d) / 2, x = y(o, v, b), w = {
		x: (m.x + h.x + g.x + _.x) / 4,
		y: (m.y + h.y + g.y + _.y) / 4
	}, E = T(i), D = Math.hypot(x.x - w.x, x.y - w.y) * E;
	if (p <= 0 || D <= f) {
		let o = s.x1 - s.x0, f = s.y1 - s.y0;
		S(e, t, n, r, i, a, s.x0 + c * o, s.y0 + l * f, s.x0 + u * o, s.y0 + d * f, m, h, g);
		return;
	}
	u - c >= d - l ? (C(e, t, n, r, i, a, o, s, c, l, v, d, f, p - 1), C(e, t, n, r, i, a, o, s, v, l, u, d, f, p - 1)) : (C(e, t, n, r, i, a, o, s, c, l, u, b, f, p - 1), C(e, t, n, r, i, a, o, s, c, b, u, d, f, p - 1));
}
function w(e, t, n, r, i, a = .5, o) {
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
	let f = v(i[0], i[1], i[2], i[3]);
	if (!f) return;
	let p = t.getTransform(), m = [
		p.a,
		p.b,
		p.c,
		p.d,
		p.e,
		p.f
	], h = T(m);
	j(e, t, n, r, i, m, h, f, s, a, 14) || (k(), t.save(), t.beginPath(), t.moveTo(i[0].x, i[0].y), t.lineTo(i[1].x, i[1].y), t.lineTo(i[2].x, i[2].y), t.lineTo(i[3].x, i[3].y), t.closePath(), t.clip(), C(t, e, n, r, m, h, f, s, 0, 0, 1, 1, a, 14), t.restore());
}
function T(e) {
	return Math.sqrt(Math.abs(e[0] * e[3] - e[1] * e[2])) || 1;
}
function E(e, t, n) {
	let r = v(e[0], e[1], e[2], e[3]);
	if (!r) return null;
	let i = [
		[-t, -n],
		[1 + t, -n],
		[1 + t, 1 + n],
		[-t, 1 + n]
	], a = [];
	for (let [e, t] of i) {
		if (!(r[6] * e + r[7] * t + r[8] > 1e-9)) return null;
		a.push(y(r, e, t));
	}
	return a;
}
function D(e, t, n) {
	let r = v(e[0], e[1], e[2], e[3]);
	return r && r[6] * t + r[7] * n + r[8] > 1e-9 ? y(r, t, n) : null;
}
var O = !1;
function k() {
	O || (O = !0, typeof console < "u" && typeof console.warn == "function" && console.warn("[ooxml] scene3d: no offscreen canvas available — using the direct warp fallback (per-cell bleed only, no supersample). Textured-source seams may be faintly visible; the silhouette and geometry are unaffected."));
}
var A = 2;
function j(e, t, n, r, i, a, s, c, l, u, d) {
	let f = i.map((e) => ({
		x: a[0] * e.x + a[2] * e.y + a[4],
		y: a[1] * e.x + a[3] * e.y + a[5]
	})), p = Infinity, m = Infinity, h = -Infinity, g = -Infinity;
	for (let e of f) e.x < p && (p = e.x), e.y < m && (m = e.y), e.x > h && (h = e.x), e.y > g && (g = e.y);
	p = Math.floor(p) - 1, m = Math.floor(m) - 1, h = Math.ceil(h) + 1, g = Math.ceil(g) + 1;
	let _ = h - p, v = g - m;
	if (_ <= 0 || v <= 0) return !1;
	let y = Math.max(1, Math.ceil(_ * A)), b = Math.max(1, Math.ceil(v * A)), x = o(y, b);
	if (!x || x.width !== y || x.height !== b) return !1;
	let S = x.getContext("2d") ?? null;
	if (!S) return !1;
	let w = A, T = [
		a[0] * w,
		a[1] * w,
		a[2] * w,
		a[3] * w,
		(a[4] - p) * w,
		(a[5] - m) * w
	];
	S.save(), S.setTransform(T[0], T[1], T[2], T[3], T[4], T[5]), S.beginPath(), S.moveTo(i[0].x, i[0].y), S.lineTo(i[1].x, i[1].y), S.lineTo(i[2].x, i[2].y), S.lineTo(i[3].x, i[3].y), S.closePath(), S.clip(), C(S, e, n, r, T, s, c, l, 0, 0, 1, 1, u * w, d), S.restore(), t.save(), t.setTransform(1, 0, 0, 1, 0, 0);
	let E = t.imageSmoothingEnabled, D = t.imageSmoothingQuality;
	return t.imageSmoothingEnabled = !0, t.imageSmoothingQuality = "high", t.drawImage(x, 0, 0, _ * w, v * w, p, m, _, v), t.imageSmoothingEnabled = E, t.imageSmoothingQuality = D, t.restore(), !0;
}
//#endregion
//#region packages/core/src/chart/three-d-surface-picture.ts
function M(e, t) {
	if (!t || ![
		t.l,
		t.t,
		t.r,
		t.b
	].some((e) => (e ?? 0) !== 0)) return e;
	let n = t.l ?? 0, r = t.t ?? 0, i = 1 - (t.r ?? 0), a = 1 - (t.b ?? 0), o = [
		D(e, n, r),
		D(e, i, r),
		D(e, i, a),
		D(e, n, a)
	];
	return o.every((e) => e != null) ? o : null;
}
function N(e, t) {
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
function P(e, t, n, r) {
	if (e.thickness === 0 && n === 0) return [
		e.inner[3],
		e.inner[2],
		e.inner[1],
		e.inner[0]
	];
	let i = N(e.faces[n] ?? [], r);
	return !i || t !== "backWall" || n !== 4 ? i : [
		i[1],
		i[2],
		i[3],
		i[0]
	];
}
function F(e, t, n) {
	if (!(e != null && Number.isFinite(e) && e > 0) || !(t > 0) || !(n > 0)) return null;
	let r = e * n / t;
	return Number.isFinite(r) && r > 0 ? r : null;
}
function I(e, t, n) {
	return Math.hypot(e.x - t.x, e.y - t.y, (e.depth - t.depth) * n);
}
function L(a, o, p, m, h, g, _, v, y) {
	let b = t(o, m, h, y);
	if (!b || g.inner.length !== 4) return !1;
	let x = u(p);
	if (!(x.w > 0) || !(x.h > 0)) return !1;
	let S = c(p, o.srcRect), C = S ? {
		x0: S.sx,
		y0: S.sy,
		x1: S.sx + S.sw,
		y1: S.sy + S.sh
	} : void 0, T = [
		v(g.inner[3]),
		v(g.inner[2]),
		v(g.inner[1]),
		v(g.inner[0])
	], E = (e, t, n) => ({
		x: e.x + (t.x - e.x) * n,
		y: e.y + (t.y - e.y) * n,
		depth: e.depth + (t.depth - e.depth) * n
	}), D = (e, t, n) => [
		v(E(e[3], e[0], n)),
		v(E(e[2], e[1], n)),
		v(E(e[2], e[1], t)),
		v(E(e[3], e[0], t))
	], O = b.mode === "stack" ? F(g.pictureStackAspect, x.w, x.h) : null, k = b.mode === "tile" ? l(o, p) : null, A = [];
	if (b.mode === "stack") {
		if (O == null) return !1;
		let t = 0, n = !1;
		for (let i of _) {
			if (!r(b, i) || !P(g, h, i, v)) continue;
			let a = e(b, i) ? Math.ceil(1 / O) : 1;
			if (!Number.isSafeInteger(a) || a < 1 || (t += a, t > 4096)) return !1;
			n = !0;
		}
		if (!n) return !1;
	}
	if (b.mode === "tile") {
		if (!k) return !1;
		let e = 0, t = 0, n = !1;
		for (let i of _) {
			if (!r(b, i)) continue;
			let o = P(g, h, i, v);
			if (!o) continue;
			let s = I(o[0], o[1], g.modelDepth), c = I(o[0], o[3], g.modelDepth);
			if (!(s > 0) || !(c > 0)) continue;
			let l = d(k, s, c), u = Math.floor(-l.x / k.tileW), p = Math.floor(-l.y / k.tileH), m = Math.ceil((s - l.x) / k.tileW), _ = Math.ceil((c - l.y) / k.tileH), y = Math.max(0, m - u) * Math.max(0, _ - p);
			if (!Number.isSafeInteger(y) || (e += y, e > 4096)) return !1;
			if (y === 0) continue;
			let x = Math.ceil(s), S = Math.ceil(c);
			if (!(x > 0 && x <= 32767) || !(S > 0 && S <= 32767) || x > Math.floor((16777216 - t) / S)) return !1;
			t += x * S;
			let C = f(a, x, S), w = C?.getContext("2d");
			if (!C || !w) return !1;
			A.push({
				faceIndex: i,
				width: s,
				height: c,
				origin: l,
				firstColumn: u,
				firstRow: p,
				lastColumn: m,
				lastRow: _,
				canvas: C,
				context: w
			}), n = !0;
		}
		if (!n) return !1;
	}
	if (a.save(), o.alpha != null && (a.globalAlpha *= o.alpha), b.mode === "stretch") for (let e of _) {
		if (!r(b, e)) continue;
		let t = P(g, h, e, v), n = g.thickness === 0 && e === 0 ? T : t?.map(v);
		if (!n) continue;
		let i = M(n, o.fillRect);
		if (!i) continue;
		let s = S ? M(i, {
			l: S.dxFraction,
			t: S.dyFraction,
			r: 1 - S.dxFraction - S.dwFraction,
			b: 1 - S.dyFraction - S.dhFraction
		}) : i;
		if (s) {
			a.save(), a.beginPath(), a.moveTo(n[0].x, n[0].y);
			for (let e = 1; e < n.length; e++) a.lineTo(n[e].x, n[e].y);
			a.closePath(), a.clip(), w(p, a, x.w, x.h, s, .5, C), a.restore();
		}
	}
	else for (let t of _) {
		if (!r(b, t)) continue;
		let c = P(g, h, t, v);
		if (!c) continue;
		let l = c.map(v);
		a.save(), a.beginPath(), a.moveTo(l[0].x, l[0].y);
		for (let e = 1; e < l.length; e++) a.lineTo(l[e].x, l[e].y);
		a.closePath(), a.clip();
		let u = i(b, t);
		if (b.mode === "tile") {
			if (!k) continue;
			let e = A.find((e) => e.faceIndex === t);
			if (!e) continue;
			let n = e.canvas.width / e.width, r = e.canvas.height / e.height;
			e.context.save(), e.context.scale(n, r);
			for (let t = e.firstRow; t < e.lastRow; t++) for (let n = e.firstColumn; n < e.lastColumn; n++) {
				let r = e.origin.x + n * k.tileW, i = e.origin.y + t * k.tileH, a = k.flipX && Math.abs(n) % 2 == 1, c = k.flipY && Math.abs(t) % 2 == 1;
				e.context.save(), e.context.translate(r + (a ? k.tileW : 0), i + (c ? k.tileH : 0)), e.context.scale(a ? -1 : 1, c ? -1 : 1), s(e.context, p, o.srcRect, 0, 0, k.tileW, k.tileH), e.context.restore();
			}
			e.context.restore(), w(e.canvas, a, e.canvas.width, e.canvas.height, l, .5);
		} else if (b.mode === "stack") {
			if (O == null) continue;
			if (e(b, t)) for (let e = 0; e < Math.ceil(1 / O); e++) w(p, a, x.w, x.h, D(c, e * O, (e + 1) * O), .5, C);
			else w(p, a, x.w, x.h, l, .5, C);
		} else if (b.stackUnit != null && n(b, t)) for (let e = 0; e < u; e++) {
			let t = e * b.stackUnit / y, n = (e + 1) * b.stackUnit / y;
			w(p, a, x.w, x.h, D(c, t, n), .5, C);
		}
		else b.stackUnit != null && w(p, a, x.w, x.h, l, .5, C);
		a.restore();
	}
	return a.restore(), !0;
}
//#endregion
//#region packages/core/src/chart/material-color.ts
function R(e) {
	return e.rotationX === 15 && e.rotationY === 20 && e.rightAngleAxes === !1 && e.perspective === 30;
}
function z(e) {
	return R(e) ? 2 : 1;
}
function B(e, t) {
	let n = e.replace(/^#/, "");
	if (!/^[0-9a-f]{6}$/i.test(n) || !Number.isFinite(t)) return e;
	let r = Math.max(0, t), i = (e) => Math.max(0, Math.min(255, Math.round(Number.parseInt(n.slice(e, e + 2), 16) * r))).toString(16).padStart(2, "0");
	return `#${i(0)}${i(2)}${i(4)}`.toUpperCase();
}
function V(e) {
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
function H(e, t, n, r, i) {
	let a = Number.isFinite(e) && e > 0 ? e : 0, o = Number.isFinite(t) ? Z(t, 0, 500) : 150, s = Math.max(1, Math.trunc(r)), c = Z(Math.trunc(n), 0, s - 1), l = i ? 1 : s, u = a / (l + o / 100);
	return {
		offset: (a - u * l) / 2 + (i ? 0 : c * u),
		size: u
	};
}
function U(e, t, n) {
	if (![
		e,
		t,
		n
	].every(Number.isFinite)) return 1;
	let r = e >= 0 ? n : t;
	return 1 - Math.min(1, Math.abs(e) / Math.max(Number.MIN_VALUE, Math.abs(r)));
}
function W(e) {
	return !(e.heightPercentAuthored ?? e.heightPercent != null) || e.heightPercent == null || !Number.isFinite(e.heightPercent) || e.heightPercent < 5 || e.heightPercent > 500 ? 1 : e.heightPercent / 100;
}
function G(e, t, n, r) {
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
	let u = Z(X(r, .06), 0, .45), d = n.w * (1 - 2 * u), f = n.h * (1 - 2 * u), p = Math.min(d / c, f / l);
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
function K(e, t, n, r = .06) {
	return !t.length || t.length > 1e5 ? e : G(e, t.map((t) => e.project(t.x, t.y, t.depth)), n, r);
}
var q = 4294967295;
function J(e, t, n) {
	let { front: r } = e, i = r.x, a = r.x + r.w, o = e.topology.farX === "min" ? i : a, s = e.topology.axisY === "min" ? r.y : r.y + r.h, c = s === r.y ? r.y + r.h : r.y, { nearDepth: l, farDepth: u } = e.topology, d = [
		e.projectUnbounded(i, c, u),
		e.projectUnbounded(a, c, u),
		e.projectUnbounded(i, s, u)
	], f = [i, a].flatMap((t) => [c, s].flatMap((n) => [l, u].map((r) => e.projectUnbounded(t, n, r).x))), p = Math.max(...f) - Math.min(...f), m = Math.hypot(d[0].x - d[2].x, d[0].y - d[2].y), h = p > 0 && m > 0 ? p / m : null, g = n ?? 0, _ = Number.isFinite(g) && g >= 0 && g <= q ? g : 0, v = Math.max(r.w, r.h, e.modelDepth) * _ / 100, y, b;
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
function Y(e, t, n, r) {
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
function ee(e, t, n) {
	let r = [
		["floor", t.floor?.thicknessPercent],
		["sideWall", t.sideWall?.thicknessPercent],
		["backWall", t.backWall?.thicknessPercent]
	].map(([t, n]) => J(e, t, n));
	return r.some((e) => e.thickness > 0) ? G(e, r.flatMap((e) => e.faces.flat()).map((t) => e.projectUnbounded(t.x, t.y, t.depth)), n, .03) : e;
}
var X = (e, t) => typeof e == "number" && Number.isFinite(e) ? e : t, Z = (e, t, n) => Math.min(n, Math.max(t, e));
function Q(e, t, n = {}) {
	if (![
		t.x,
		t.y,
		t.w,
		t.h
	].every(Number.isFinite) || t.w <= 0 || t.h <= 0) return null;
	let r = Z(X(e.rotationX, 15), -90, 90), i = (Z(X(e.rotationY, 20), 0, 360) + 180) % 360 - 180, a = Z(X(e.depthPercent, 100), 20, 2e3), o = Z(X(e.perspective, 30), 0, 240), s = Z(X(e.gapDepthPercent, 150), 0, 500), c = (e.heightPercentAuthored ?? e.heightPercent != null) && e.heightPercent != null && Number.isFinite(e.heightPercent) ? Z(e.heightPercent, 5, 500) : null, l = n.sceneHeightScale != null && Number.isFinite(n.sceneHeightScale) ? Z(n.sceneHeightScale * 100, 5, 500) : null, u = c ?? l, d = t;
	if (u != null) {
		let e = u / 100, n = Math.min(t.w, t.h / e), r = n * e;
		d = {
			x: t.x + (t.w - n) / 2,
			y: t.y + (t.h - r) / 2,
			w: n,
			h: r
		};
	}
	let f = Math.PI / 180, p = Z(X(n.sceneDepthScale, .1), .01, 2), m = d.w * p * (a / 100), h = d.x + d.w / 2, g = d.y + d.h / 2, _ = -i * f, v = r * f, y = Math.cos(_), b = Math.sin(_), x = Math.cos(v), S = Math.sin(v), C = e.rightAngleAxes !== !0 && o > 0, w = Z(o * .25, .25, 60) * f, T = Z(X(n.perspectiveTangentGain, 2), .25, 4), E = Math.atan(T * Math.tan(w)), D = Math.hypot(d.w, d.h, m), O = C ? D * .5 / Math.tan(E) : Infinity, k = (e, t, n, r = !0) => {
		let i = e - h, a = g - t, o = Number.isFinite(n) ? n : 0, s = (.5 - (r ? Z(o, 0, 1) : o)) * m, c = y * i + b * s, l = -b * i + y * s;
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
	let F = Math.min(...P.map((e) => e.x)), I = Math.max(...P.map((e) => e.x)), L = Math.min(...P.map((e) => e.y)), R = Math.max(...P.map((e) => e.y)), z = Math.max(Number.MIN_VALUE, I - F), B = Math.max(Number.MIN_VALUE, R - L), V = Math.min(t.w / z, t.h / B) * .94, H = t.x + (t.w - z * V) / 2 - F * V, U = t.y + (t.h - B * V) / 2 - L * V, W = (e, t, n) => {
		let r = N(e, t, n);
		return {
			x: H + r.x * V,
			y: U + r.y * V
		};
	}, G = (e, t, n) => {
		let r = N(e, t, n, !1);
		return {
			x: H + r.x * V,
			y: U + r.y * V
		};
	}, K = { ...d }, q = W(h, g, 0), J = W(h, g, 1), Y = J.x - q.x, ee = J.y - q.y, Q = (e, t) => k(e === "x" ? t === "min" ? d.x : d.x + d.w : h, e === "y" ? t === "min" ? d.y : d.y + d.h : g, e === "depth" ? t === "min" ? 0 : 1 : .5).z, te = Q("x", "min") <= Q("x", "max") ? "min" : "max", ne = Q("y", "min") <= Q("y", "max") ? "min" : "max", $ = Q("depth", "min") >= Q("depth", "max") ? 0 : 1, re = +($ === 0), ie = (e) => {
		let t = e === "min" ? d.x : d.x + d.w, n = W(t, d.y, $), r = W(t, d.y + d.h, $);
		return (n.x + r.x) / 2;
	}, ae = (e) => {
		let t = e === "min" ? d.y : d.y + d.h, n = W(d.x, t, $), r = W(d.x + d.w, t, $);
		return (n.y + r.y) / 2;
	}, oe = ie("min") <= ie("max") ? "min" : "max", se = ae("min") >= ae("max") ? "min" : "max", ce = (e) => 1 / Math.max(1, Math.trunc(e)) / (1 + s / 100), le = (e, t, n = !1) => n || t <= 1 ? .5 : (Z(Math.trunc(e), 0, Math.max(0, t - 1)) + .5) / t;
	return {
		scene: d,
		front: K,
		depthX: Y,
		depthY: ee,
		modelDepth: m,
		pieScaleY: Z(Math.sin(Math.max(1, Math.abs(r)) * f) ** 1.15, .2, 1),
		pieThicknessFraction: .3 * Math.max(0, Math.cos(Math.abs(r) * f)),
		project: W,
		projectUnbounded: G,
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
			farX: te,
			farY: ne,
			axisX: oe,
			axisY: se,
			nearDepth: $,
			farDepth: re
		},
		seriesDepth: le,
		prismDepth: ce,
		prismInterval(e, t, n = !1) {
			let r = le(e, t, n), i = ce(n ? 1 : t) / 2;
			return {
				near: Z(r - i, 0, 1),
				far: Z(r + i, 0, 1)
			};
		}
	};
}
//#endregion
export { _, J as a, U as c, V as d, z as f, D as g, E as h, Q as i, R as l, w as m, ee as n, Y as o, L as p, W as r, H as s, K as t, B as u, g as v };
