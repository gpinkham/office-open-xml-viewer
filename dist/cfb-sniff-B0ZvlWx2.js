//#region packages/core/src/errors/cfb-read.ts
var e = [
	208,
	207,
	17,
	224,
	161,
	177,
	26,
	225
], t = 4294967290, n = 4294967294, r = 512, i = 128, a = 4e6, o = 8e6, s = 65536, c = 1e6;
function l(t, n) {
	if (t.length < r) return null;
	for (let n = 0; n < e.length; n++) if (t[n] !== e[n]) return null;
	let i = new DataView(t.buffer, t.byteOffset, t.byteLength), a = u(i);
	if (a === null) return null;
	let o = p(i, t.length, a);
	if (o === null) return null;
	let s = h(i, t.length, a, o, n);
	if (s === null || s.target === null) return null;
	let { target: c, root: l } = s;
	return c.size === 0 ? new Uint8Array() : c.size < a.miniStreamCutoff ? l === null ? null : v(i, t.length, a, o, l, c) : _(i, t.length, a, o, c.startSector, c.size);
}
function u(e) {
	let t = e.getUint16(30, !0);
	if (t !== 9 && t !== 12) return null;
	let n = e.getUint16(32, !0);
	if (n !== 6) return null;
	let r = 1 << t, i = 1 << n, a = e.getUint32(56, !0);
	return {
		sectorSize: r,
		numFatSectors: e.getUint32(44, !0),
		miniSectorSize: i,
		miniStreamCutoff: a,
		firstDirSector: e.getUint32(48, !0),
		firstMiniFatSector: e.getUint32(60, !0),
		firstDifatSector: e.getUint32(68, !0),
		numDifatSectors: e.getUint32(72, !0)
	};
}
function d(e, t) {
	return (e + 1) * t;
}
function f(e) {
	return e >= 0 && e <= t;
}
function p(e, t, n) {
	let { sectorSize: r } = n, i = [], a = /* @__PURE__ */ new Set(), o = Math.max(0, Math.floor(t / r) - 1);
	if (n.numFatSectors > o || n.numDifatSectors > o || n.numDifatSectors > c) return null;
	let s = 0, l = (e) => s++ >= n.numFatSectors ? !f(e) : !f(e) || e >= o || a.has(e) ? !1 : (a.add(e), i.push(e), !0);
	for (let t = 0; t < 109; t++) if (!l(e.getUint32(76 + t * 4, !0))) return null;
	let u = r / 4 - 1, p = n.firstDifatSector, m = /* @__PURE__ */ new Set(), h = 0;
	for (; f(p) && h < n.numDifatSectors && (h++, !m.has(p));) {
		m.add(p);
		let n = d(p, r);
		if (n < 0 || n + r > t) return null;
		for (let t = 0; t < u; t++) if (!l(e.getUint32(n + t * 4, !0))) return null;
		p = e.getUint32(n + u * 4, !0);
	}
	return h !== n.numDifatSectors || f(p) || i.length !== n.numFatSectors ? null : i;
}
function m(e, t, n, r, i) {
	let a = n / 4, o = Math.floor(i / a), s = i % a;
	if (o >= r.length) return null;
	let c = r[o];
	if (!f(c)) return null;
	let l = d(c, n) + s * 4;
	return l < 0 || l + 4 > t ? null : e.getUint32(l, !0);
}
function h(e, t, n, r, o) {
	let { sectorSize: c } = n, l = Math.floor(c / i);
	if (l < 1) return null;
	let u = null, p = null, h = /* @__PURE__ */ new Set(), _ = n.firstDirSector, v = 0, y = 0;
	for (; f(_);) {
		if (v++ > a) return null;
		if (h.has(_)) break;
		h.add(_);
		let n = d(_, c);
		if (n < 0 || n + c > t) return null;
		for (let t = 0; t < l; t++) {
			if (y++ > s) return {
				target: u,
				root: p
			};
			let r = n + t * i, a = e.getUint8(r + 66);
			if (a === 0) continue;
			let c = e.getUint32(r + 116, !0), l = e.getUint32(r + 120, !0);
			if (a === 5) {
				p = {
					startSector: c,
					size: l
				};
				continue;
			}
			g(e, r) === o && (u = {
				startSector: c,
				size: l
			});
		}
		let f = m(e, t, c, r, _);
		if (f === null) break;
		_ = f;
	}
	return {
		target: u,
		root: p
	};
}
function g(e, t) {
	let n = e.getUint16(t + 64, !0);
	if (n < 2 || n > 64) return "";
	let r = n / 2 - 1, i = "";
	for (let n = 0; n < r; n++) {
		let r = e.getUint16(t + n * 2, !0);
		if (r === 0) break;
		i += String.fromCharCode(r);
	}
	return i;
}
function _(e, t, n, r, i, o) {
	let { sectorSize: s } = n, c = new Uint8Array(o), l = 0, u = i, p = /* @__PURE__ */ new Set(), h = 0;
	for (; f(u) && l < o;) {
		if (h++ > a || p.has(u)) return null;
		p.add(u);
		let n = d(u, s);
		if (n < 0 || n + s > t) return null;
		let i = Math.min(s, o - l);
		c.set(new Uint8Array(e.buffer, e.byteOffset + n, i), l), l += i;
		let f = m(e, t, s, r, u);
		if (f === null) return null;
		u = f;
	}
	return l === o ? c : null;
}
function v(e, t, n, r, i, a) {
	let { sectorSize: s, miniSectorSize: c } = n, l = _(e, t, n, r, i.startSector, i.size);
	if (l === null) return null;
	let u = new Uint8Array(a.size), d = 0, p = a.startSector, m = /* @__PURE__ */ new Set(), h = 0, g = s / 4;
	for (; f(p) && d < a.size;) {
		if (h++ > o || m.has(p)) return null;
		m.add(p);
		let i = p * c;
		if (i < 0 || i + c > l.length) return null;
		let s = Math.min(c, a.size - d);
		u.set(l.subarray(i, i + s), d), d += s;
		let f = y(e, t, n, r, g, p);
		if (f === null) return null;
		p = f;
	}
	return d === a.size ? u : null;
}
function y(e, t, r, i, a, o) {
	let { sectorSize: s } = r, c = Math.floor(o / a), l = o % a, u = r.firstMiniFatSector, p = /* @__PURE__ */ new Set();
	for (let n = 0; n < c; n++) {
		if (!f(u) || p.has(u)) return null;
		p.add(u);
		let n = m(e, t, s, i, u);
		if (n === null) return null;
		u = n;
	}
	if (!f(u)) return null;
	let h = d(u, s) + l * 4;
	if (h < 0 || h + 4 > t) return null;
	let g = e.getUint32(h, !0);
	return g === n ? n : g;
}
//#endregion
//#region packages/core/src/errors/cfb-sniff.ts
var b = [
	208,
	207,
	17,
	224,
	161,
	177,
	26,
	225
], x = 4294967290, S = 512, C = 128, w = 4096, T = 8192, E = new Set([
	"WordDocument",
	"Workbook",
	"Book",
	"PowerPoint Document"
]), D = "EncryptionInfo";
function O(e) {
	if (e.length < S) return null;
	for (let t = 0; t < b.length; t++) if (e[t] !== b[t]) return null;
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength), n = t.getUint16(30, !0);
	if (n !== 9 && n !== 12) return "cfb-unknown";
	let r = 1 << n, i = t.getUint32(48, !0), a = {
		sectorSize: r,
		numFatSectors: t.getUint32(44, !0),
		firstDifatSector: t.getUint32(68, !0),
		numDifatSectors: t.getUint32(72, !0)
	}, o = p(t, e.length, a);
	if (o === null) return "cfb-unknown";
	let s = k(t, e.length, r, i, o);
	if (s === null) return "cfb-unknown";
	if (s.has(D)) return "encrypted";
	for (let e of s) if (E.has(e)) return "legacy-binary-format";
	return "cfb-unknown";
}
function k(e, t, n, r, i) {
	if (!M(r)) return null;
	let a = /* @__PURE__ */ new Set(), o = Math.floor(n / C);
	if (o < 1) return null;
	let s = /* @__PURE__ */ new Set(), c = r, l = 0, u = 0;
	for (; M(c) && !(l++ > T || s.has(c));) {
		s.add(c);
		let r = j(c, n);
		if (r < 0 || r + n > t) return null;
		for (let t = 0; t < o; t++) {
			if (u++ > w) return a;
			let n = A(e, r + t * C);
			n && a.add(n);
		}
		let l = m(e, t, n, i, c);
		if (l === null) break;
		c = l;
	}
	return a;
}
function A(e, t) {
	let n = e.getUint16(t + 64, !0);
	if (n < 2 || n > 64) return "";
	let r = n / 2 - 1, i = "";
	for (let n = 0; n < r; n++) {
		let r = e.getUint16(t + n * 2, !0);
		if (r === 0) break;
		i += String.fromCharCode(r);
	}
	return i;
}
function j(e, t) {
	return (e + 1) * t;
}
function M(e) {
	return e >= 0 && e <= x;
}
//#endregion
export { l as i, O as n, p as r, k as t };
