import { A as e, B as t, F as n, G as r, I as i, L as a, M as o, N as s, P as c, V as l, W as u, z as d } from "./office-auto-line-Chy1gU-T.js";
import { Gn as f, Hn as p, Qn as m, Zn as h, qn as g } from "./plot-area-frame-DvwuejI0.js";
//#region packages/core/src/shape/drawingml-shape.ts
var _ = 1;
function v(e) {
	return e.paint && e.paint.length === e.subpaths.length ? e.paint : null;
}
function y(e, t, n) {
	let { x: r, y: i, w: a, h: o } = t.rect, { rotationDeg: s, flipH: c, flipV: l } = t.transform;
	e.save();
	try {
		(s !== 0 || c || l) && (e.translate(r + a / 2, i + o / 2), s !== 0 && e.rotate(s * Math.PI / 180), e.scale(c ? -1 : 1, l ? -1 : 1), e.translate(-(r + a / 2), -(i + o / 2))), n();
	} finally {
		e.restore();
	}
}
function b(e, t, a, o, s, c) {
	if (t.geometry.kind === "preset") {
		let r = [...t.geometry.adjustments];
		i(e, t.geometry.name, a, o, s, c, r) || n(e, t.geometry.name, a, o, s, c, r[0], r[1], r[2], r[3]);
	} else {
		let n = v(t.geometry);
		r(e, n ? t.geometry.subpaths.filter((e, t) => n[t].fill !== "none") : t.geometry.subpaths, a, o, s, c);
	}
}
function x(e, t) {
	let { x: n, y: r, w: i, h: a } = t.rect;
	e.beginPath(), b(e, t, n, r, i, a), e.clip();
}
var S = new Set([
	"line",
	"straightconnector1",
	"bentconnector2",
	"bentconnector3",
	"bentconnector4",
	"bentconnector5",
	"curvedconnector2",
	"curvedconnector3",
	"curvedconnector4",
	"curvedconnector5"
]), C = new Set([
	"callout1",
	"callout2",
	"callout3",
	"bordercallout1",
	"bordercallout2",
	"bordercallout3",
	"accentcallout1",
	"accentcallout2",
	"accentcallout3",
	"accentbordercallout1",
	"accentbordercallout2",
	"accentbordercallout3"
]);
function w(e) {
	return C.has(e) || e === "line" || e === "straightconnector1" || e.startsWith("bentconnector");
}
function T(e, t, n, r, i) {
	if (p(e, t, n), t.fill) {
		let n = f(t.fill, e, r.x, r.y, r.w, r.h, i, _, void 0, void 0, h(e));
		n && (e.strokeStyle = n);
	}
}
function E(t, n, r, i) {
	let l = n.stroke;
	if (!l || !S.has(r) && !C.has(r)) return;
	let { x: u, y: d, w: f, h: p } = n.rect, m = a(r, u, d, f, p, [...n.geometry.kind === "preset" ? n.geometry.adjustments : []]);
	if (m) {
		if (w(r) && m.vertices.length >= 2 && (l.headEnd || l.tailEnd)) {
			let e = m.vertices.map((e) => ({
				x: e.x,
				y: e.y
			}));
			l.tailEnd && (e[e.length - 1] = c(e[e.length - 1], e[e.length - 2], o(l.tailEnd, l, i))), l.headEnd && (e[0] = c(e[0], e[1], o(l.headEnd, l, i))), t.beginPath(), t.moveTo(e[0].x, e[0].y);
			for (let n = 1; n < e.length; n++) t.lineTo(e[n].x, e[n].y);
			T(t, l, i, n.rect, n.transform.rotationDeg), t.stroke();
		}
		l.tailEnd && e(t, m.end.x, m.end.y, m.end.angle, l.tailEnd, l, i, s(t, l, i, m.end.x, m.end.y, m.end.angle, l.tailEnd, n.rect, n.transform.rotationDeg, _)), l.headEnd && e(t, m.start.x, m.start.y, m.start.angle, l.headEnd, l, i, s(t, l, i, m.start.x, m.start.y, m.start.angle, l.headEnd, n.rect, n.transform.rotationDeg, _));
	}
}
function D(t, n, r) {
	if (n.geometry.kind !== "custom") return;
	let i = n.stroke;
	if (!i || !i.headEnd && !i.tailEnd) return;
	let a = u(n.geometry.subpaths), { x: o, y: c, w: l, h: d } = n.rect;
	a.start && i.headEnd && e(t, o + a.start.x * l, c + a.start.y * d, Math.atan2(a.start.dy * d, a.start.dx * l), i.headEnd, i, r, s(t, i, r, o + a.start.x * l, c + a.start.y * d, Math.atan2(a.start.dy * d, a.start.dx * l), i.headEnd, n.rect, n.transform.rotationDeg, _)), a.end && i.tailEnd && e(t, o + a.end.x * l, c + a.end.y * d, Math.atan2(a.end.dy * d, a.end.dx * l), i.tailEnd, i, r, s(t, i, r, o + a.end.x * l, c + a.end.y * d, Math.atan2(a.end.dy * d, a.end.dx * l), i.tailEnd, n.rect, n.transform.rotationDeg, _));
}
function O(e, i, a) {
	g(i.stroke?.fill) && (e = m(e));
	let { x: o, y: s, w: c, h: u } = i.rect;
	y(e, i, () => {
		let p = f(i.fill, e, o, s, c, u, i.transform.rotationDeg, _, void 0, (e, t, n, r, a) => b(e, i, t, n, r, a)), m = i.stroke, h = m ? () => {
			T(e, m, a, i.rect, i.transform.rotationDeg), e.stroke();
		} : null;
		if (i.geometry.kind === "preset") {
			let t = i.geometry.name.toLowerCase(), r = [...i.geometry.adjustments], f = w(t) && !!(m?.headEnd || m?.tailEnd);
			d(t) && l(e, t, o, s, c, u, r, p, h, () => {}, f ? { skipTrailingStroke: !0 } : void 0) || (e.beginPath(), n(e, t, o, s, c, u, r[0], r[1], r[2], r[3]), p && t !== "arc" && (e.fillStyle = p, t === "donut" || t === "smileyface" || t === "frame" ? e.fill("evenodd") : e.fill()), h && h()), E(e, i, t, a);
		} else {
			let n = v(i.geometry);
			n ? i.geometry.subpaths.forEach((i, a) => {
				e.beginPath(), r(e, [i], o, s, c, u);
				let l = n[a].fill;
				if (p && l !== "none") {
					e.fillStyle = p, e.fill();
					let n = t(l);
					n && (e.save(), e.fillStyle = n, e.fill(), e.restore());
				}
				h && n[a].stroke !== !1 && h();
			}) : (e.beginPath(), r(e, i.geometry.subpaths, o, s, c, u), p && (e.fillStyle = p, e.fill()), h && h()), D(e, i, a);
		}
	});
}
//#endregion
export { O as n, y as r, x as t };
