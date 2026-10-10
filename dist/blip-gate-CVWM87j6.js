import { D as e } from "./office-auto-line-Chy1gU-T.js";
import { _r as t, dr as n, fr as r, gr as i, hr as a, lr as o, mr as s, pr as c, ur as l } from "./plot-area-frame-DvwuejI0.js";
import { c as u, f as d, l as f, n as p, o as m, s as h, t as g, u as _ } from "./pixel-budget-QcsXr21f.js";
import { a as v, i as y, r as b, t as x } from "./tiff-contract-BtmLs4Ug.js";
import { n as S, r as C } from "./raster-target-DAN1p0JY.js";
//#region packages/core/src/image/emf-plus.ts
var w = {
	HEADER: 16385,
	EOF: 16386,
	COMMENT: 16387,
	GET_DC: 16388,
	OBJECT: 16392,
	CLEAR: 16393,
	DRAW_IMAGE: 16410,
	SET_ANTI_ALIAS_MODE: 16414,
	SET_TEXT_RENDERING_HINT: 16415,
	SET_TEXT_CONTRAST: 16416,
	SET_INTERPOLATION_MODE: 16417,
	SET_PIXEL_OFFSET_MODE: 16418,
	SET_COMPOSITING_MODE: 16419,
	SET_COMPOSITING_QUALITY: 16420,
	SAVE: 16421,
	RESTORE: 16422,
	SET_WORLD_TRANSFORM: 16426,
	RESET_WORLD_TRANSFORM: 16427,
	MULTIPLY_WORLD_TRANSFORM: 16428,
	TRANSLATE_WORLD_TRANSFORM: 16429,
	SCALE_WORLD_TRANSFORM: 16430,
	ROTATE_WORLD_TRANSFORM: 16431,
	SET_PAGE_TRANSFORM: 16432
}, T = new Set([
	16394,
	16395,
	16396,
	16397,
	16398,
	16399,
	16400,
	16401,
	16402,
	16403,
	16404,
	16405,
	16406,
	16407,
	16408,
	16409,
	16410,
	16411,
	16412,
	16438
]), E = 5, D = 8, O = 2498570, k = 925707, ee = 2, te = 4, ne = g, re = "EMF+ bitmap (decoded-image budget)";
function* ie(e, t, n, r) {
	if (n - t < 16 || e.getUint32(t + 12, !0) !== 726027589) return;
	let i = e.getUint32(t + 8, !0);
	if (i < 4 || t + 12 + i > n) {
		r("EMF+ comment (invalid DataSize)");
		return;
	}
	let a = t + 12 + i, o = t + 16;
	for (; o < a;) {
		if (a - o < 12) {
			r("EMF+ record (truncated header)");
			return;
		}
		let t = e.getUint16(o, !0), n = e.getUint16(o + 2, !0), i = e.getUint32(o + 4, !0), s = e.getUint32(o + 8, !0);
		if (i < 12 || i > a - o || s > i - 12) {
			r(`EMF+ record 0x${t.toString(16)} (invalid Size or DataSize)`);
			return;
		}
		yield {
			type: t,
			flags: n,
			start: o + 12,
			end: o + 12 + s
		}, o += i;
	}
}
function ae(e) {
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength), n = !1, r = !1, i = !1, a = !1, o = {
		ctx: null,
		W: 1,
		H: 1,
		left: 0,
		top: 0,
		boundsW: 1,
		boundsH: 1,
		drew: !1,
		unsupported: /* @__PURE__ */ new Set()
	}, s = new ce(o, !0), c = () => {}, l = 0;
	for (; l + 8 <= e.length;) {
		let u = t.getUint32(l, !0), d = t.getUint32(l + 4, !0);
		if (d < 8 || d & 3 || l + d > e.length) {
			o.unsupported.add("EMF record stream (truncated or invalid record size)");
			break;
		}
		if (u === 70) {
			d >= 16 && t.getUint32(l + 12, !0) === 726027589 && (r = !0);
			for (let e of ie(t, l, l + d, c)) e.type === w.HEADER && (n = !0, i = (e.flags & 1) != 0), T.has(e.type) && (a = !0);
			s.playComment(t, l, l + d);
		}
		if (u === 14) break;
		l += d;
	}
	s.finish();
	let u = r ? [...o.unsupported] : [];
	return {
		present: n,
		dual: i,
		play: n && a && u.length === 0,
		failures: u
	};
}
var oe = {
	a: 1,
	b: 0,
	c: 0,
	d: 1,
	e: 0,
	f: 0
};
function se(e, t) {
	return {
		a: e.a * t.a + e.b * t.c,
		b: e.a * t.b + e.b * t.d,
		c: e.c * t.a + e.d * t.c,
		d: e.c * t.b + e.d * t.d,
		e: e.e * t.a + e.f * t.c + t.e,
		f: e.e * t.b + e.f * t.d + t.f
	};
}
var ce = class {
	world = oe;
	pageUnit = ee;
	pageScale = 1;
	sourceCopy = !1;
	objects = /* @__PURE__ */ new Map();
	saved = /* @__PURE__ */ new Map();
	pending = null;
	gdiAllowed = !1;
	drawFailed = !1;
	constructor(e, t = !1) {
		this.target = e, this.dry = t;
	}
	playComment(e, t, n) {
		let r = (e) => this.target.unsupported.add(e);
		for (let i of ie(e, t, n, r)) {
			this.gdiAllowed = !1, this.pending && !(i.type === w.OBJECT && i.flags & 32768) && this.abandonPending();
			let t = this.target.unsupported.size;
			try {
				this.play(e, i);
			} catch {
				this.target.unsupported.add(`EMF+ record 0x${i.type.toString(16)} (malformed)`);
			}
			!this.dry && this.target.unsupported.size > t && (this.drawFailed = !0);
		}
	}
	finish() {
		this.pending && this.abandonPending();
	}
	abandonPending() {
		this.target.unsupported.add("EMF+ continued object (unfinished)"), this.pending = null;
	}
	play(e, t) {
		let n = (n) => e.getFloat32(t.start + n, !0), r = (e) => {
			if (t.end - t.start < e) throw RangeError("Truncated EMF+ record");
		};
		switch (t.type) {
			case w.HEADER:
			case w.EOF:
			case w.COMMENT:
			case w.SET_ANTI_ALIAS_MODE:
			case w.SET_TEXT_RENDERING_HINT:
			case w.SET_TEXT_CONTRAST:
			case w.SET_INTERPOLATION_MODE:
			case w.SET_PIXEL_OFFSET_MODE:
			case w.SET_COMPOSITING_QUALITY: return;
			case w.GET_DC:
				this.gdiAllowed = !0;
				return;
			case w.SET_PAGE_TRANSFORM:
				r(4), this.pageUnit = t.flags & 255, this.pageScale = n(0);
				return;
			case w.SET_COMPOSITING_MODE:
				this.sourceCopy = (t.flags & 255) == 1;
				return;
			case w.SET_WORLD_TRANSFORM:
				r(24), this.world = {
					a: n(0),
					b: n(4),
					c: n(8),
					d: n(12),
					e: n(16),
					f: n(20)
				};
				return;
			case w.RESET_WORLD_TRANSFORM:
				this.world = oe;
				return;
			case w.MULTIPLY_WORLD_TRANSFORM: {
				r(24);
				let e = {
					a: n(0),
					b: n(4),
					c: n(8),
					d: n(12),
					e: n(16),
					f: n(20)
				};
				this.world = t.flags & 8192 ? se(this.world, e) : se(e, this.world);
				return;
			}
			case w.TRANSLATE_WORLD_TRANSFORM:
			case w.SCALE_WORLD_TRANSFORM:
			case w.ROTATE_WORLD_TRANSFORM: {
				let e;
				if (t.type === w.ROTATE_WORLD_TRANSFORM) {
					r(4);
					let t = n(0) * Math.PI / 180;
					e = {
						a: Math.cos(t),
						b: Math.sin(t),
						c: -Math.sin(t),
						d: Math.cos(t),
						e: 0,
						f: 0
					};
				} else r(8), e = t.type === w.TRANSLATE_WORLD_TRANSFORM ? {
					a: 1,
					b: 0,
					c: 0,
					d: 1,
					e: n(0),
					f: n(4)
				} : {
					a: n(0),
					b: 0,
					c: 0,
					d: n(4),
					e: 0,
					f: 0
				};
				this.world = t.flags & 8192 ? se(this.world, e) : se(e, this.world);
				return;
			}
			case w.SAVE:
				r(4), this.saved.set(e.getUint32(t.start, !0), {
					world: this.world,
					unit: this.pageUnit,
					scale: this.pageScale,
					sourceCopy: this.sourceCopy
				});
				return;
			case w.RESTORE: {
				r(4);
				let n = this.saved.get(e.getUint32(t.start, !0));
				if (!n) {
					this.target.unsupported.add("EMF+ Restore of an unsaved graphics state");
					return;
				}
				this.world = n.world, this.pageUnit = n.unit, this.pageScale = n.scale, this.sourceCopy = n.sourceCopy;
				return;
			}
			case w.CLEAR:
				r(4), this.clear(e.getUint32(t.start, !0));
				return;
			case w.OBJECT:
				this.object(e, t);
				return;
			case w.DRAW_IMAGE:
				this.drawImage(e, t);
				return;
			default: this.target.unsupported.add(`EMF+ record 0x${t.type.toString(16)}`);
		}
	}
	clear(e) {
		let { ctx: t, W: n, H: r } = this.target;
		if (this.dry || !t) return;
		let i = (e >>> 24) / 255;
		try {
			t.clearRect(0, 0, n, r), i > 0 && (t.fillStyle = `rgba(${e >>> 16 & 255},${e >>> 8 & 255},${e & 255},${i})`, t.fillRect(0, 0, n, r), this.target.drew = !0);
		} catch {}
	}
	object(e, t) {
		let n = t.flags & 255, r = t.flags >> 8 & 127, i = new Uint8Array(e.buffer, e.byteOffset + t.start, t.end - t.start), a = 0;
		if (t.flags & 32768) {
			if (i.length < 4) throw RangeError("Truncated EMF+ object");
			let r = e.getUint32(t.start, !0);
			if (this.pending && (this.pending.id !== n || this.pending.total !== r) && this.abandonPending(), !this.pending) {
				if (!this.admits(r)) {
					this.target.unsupported.add(re), this.objects.delete(n);
					return;
				}
				this.pending = {
					id: n,
					total: r,
					parts: [],
					length: 0
				};
			}
			let o = i.subarray(4);
			if (o.length > this.pending.total - this.pending.length) {
				this.target.unsupported.add("EMF+ continued object (fragments exceed TotalObjectSize)"), this.pending = null, this.objects.delete(n);
				return;
			}
			if (this.pending.parts.push(o), this.pending.length += o.length, this.pending.length < this.pending.total) return;
			if (!this.admits(this.pending.total)) {
				this.target.unsupported.add(re), this.pending = null, this.objects.delete(n);
				return;
			}
			let s = new Uint8Array(this.pending.total), c = 0;
			for (let e of this.pending.parts) s.set(e, c), c += e.length;
			this.pending = null, i = s, a = s.length;
		}
		let o = new DataView(i.buffer, i.byteOffset, i.byteLength);
		if (this.objects.delete(n), r === D) {
			if (i.length < 24) throw RangeError("Truncated EMF+ image attributes");
			let e = o.getUint32(8, !0);
			if (e > te || o.getUint32(16, !0) > 1) {
				this.target.unsupported.add("EMF+ image attributes (invalid wrap or clamp)");
				return;
			}
			this.objects.set(n, {
				kind: "attributes",
				wrapMode: e
			});
			return;
		}
		if (r !== E) {
			this.target.unsupported.add(`EMF+ object type ${r}`);
			return;
		}
		if (i.length < 28) throw RangeError("Truncated EMF+ image");
		let s = o.getUint32(4, !0), c = o.getInt32(8, !0), l = o.getInt32(12, !0), u = o.getInt32(16, !0), d = o.getUint32(20, !0), f = o.getUint32(24, !0);
		if (s !== 1 || f !== 0 || d !== O && d !== k) {
			this.target.unsupported.add("EMF+ image other than an uncompressed 32-bit bitmap");
			return;
		}
		if (c <= 0 || l <= 0 || u < c * 4 || 28 + u * l > i.length) throw RangeError("Invalid EMF+ bitmap");
		if (c > 32767 || l > 32767 || c * l > 33554432 || !this.admits(a + c * l * 4, n)) {
			this.target.unsupported.add(re);
			return;
		}
		if (this.dry) {
			this.objects.set(n, {
				kind: "image",
				bitmap: {
					width: c,
					height: l,
					data: new Uint8ClampedArray()
				}
			});
			return;
		}
		let p = new Uint8ClampedArray(c * l * 4), m = d === k;
		for (let e = 0; e < l; e++) {
			let t = 28 + e * u, n = e * c * 4;
			for (let e = 0; e < c; e++, t += 4, n += 4) {
				let e = i[t + 3], r = m && e > 0 && e < 255 ? 255 / e : 1;
				p[n] = i[t + 2] * r, p[n + 1] = i[t + 1] * r, p[n + 2] = i[t] * r, p[n + 3] = e;
			}
		}
		this.objects.set(n, {
			kind: "image",
			bitmap: {
				width: c,
				height: l,
				data: p
			}
		});
	}
	retainedBytes(e) {
		let t = 0;
		for (let [n, r] of this.objects) n !== e && r.kind === "image" && (t += r.bitmap.width * r.bitmap.height * 4);
		return t;
	}
	admits(e, t) {
		return this.retainedBytes(t) + e <= ne;
	}
	toTarget(e, t) {
		let n = this.world, r = (n.a * e + n.c * t + n.e) * this.pageScale, i = (n.b * e + n.d * t + n.f) * this.pageScale, a = this.target;
		return [(r - a.left) * a.W / a.boundsW, (i - a.top) * a.H / a.boundsH];
	}
	drawImage(e, t) {
		let n = (t.flags & 16384) != 0;
		if (t.end - t.start < 24 + (n ? 8 : 16)) throw RangeError("Truncated EMF+ DrawImage");
		let r = this.objects.get(t.flags & 255);
		if (r?.kind !== "image") {
			this.target.unsupported.add("EMF+ DrawImage of an unavailable image");
			return;
		}
		let i = r.bitmap;
		if (this.objects.get(e.getUint32(t.start, !0))?.kind !== "attributes") {
			this.target.unsupported.add("EMF+ DrawImage without its image attributes");
			return;
		}
		let o = e.getInt32(t.start + 4, !0), s = (n) => e.getFloat32(t.start + n, !0), [c, l, u, d] = [
			s(8),
			s(12),
			s(16),
			s(20)
		], [f, p, m, h] = n ? [
			0,
			2,
			4,
			6
		].map((n) => e.getInt16(t.start + 24 + n, !0)) : [
			s(24),
			s(28),
			s(32),
			s(36)
		], g = this.world, [_, v] = this.toTarget(f, p), [y, b] = this.toTarget(f + m, p + h);
		if (![
			c,
			l,
			u,
			d,
			f,
			p,
			m,
			h,
			g.a,
			g.b,
			g.c,
			g.d,
			g.e,
			g.f,
			this.pageScale,
			_,
			v,
			y,
			b
		].every(Number.isFinite)) {
			this.target.unsupported.add("EMF+ DrawImage placement (non-finite value)");
			return;
		}
		let x = Math.abs(g.b) < 1e-9 && Math.abs(g.c) < 1e-9;
		if (o !== ee || this.pageUnit !== ee || !x || !(m > 0) || !(h > 0) || !(u > 0) || !(d > 0) || g.a <= 0 || g.d <= 0 || !(this.pageScale > 0)) {
			this.target.unsupported.add("EMF+ DrawImage placement (units, rotation or mirroring)");
			return;
		}
		let S = Math.round(c), C = Math.round(l), w = Math.round(c + u), T = Math.round(l + d);
		if (S < 0 || C < 0 || w > i.width || T > i.height || w <= S || T <= C) {
			this.target.unsupported.add("EMF+ DrawImage source outside the image");
			return;
		}
		let E = S !== 0 || C !== 0 || w !== i.width || T !== i.height, D = (w - S) * (T - C) * 4;
		if (!this.admits((E ? D : 0) + 2 * D)) {
			this.target.unsupported.add(re);
			return;
		}
		if (this.dry) return;
		let O = i;
		if (E) {
			let e = w - S, t = new Uint8ClampedArray(e * (T - C) * 4);
			for (let n = C; n < T; n++) t.set(i.data.subarray((n * i.width + S) * 4, (n * i.width + w) * 4), (n - C) * e * 4);
			O = {
				width: e,
				height: T - C,
				data: t
			};
		}
		let { ctx: k } = this.target;
		if (k) {
			if (this.sourceCopy) try {
				k.clearRect(Math.min(_, y), Math.min(v, b), Math.abs(y - _), Math.abs(b - v));
			} catch {}
			a(k, O, _, v, y, b) ? this.target.drew = !0 : this.target.unsupported.add("EMF+ DrawImage (the bitmap could not be drawn)");
		}
	}
}, A = {
	HEADER: 1,
	POLYBEZIER: 2,
	POLYGON: 3,
	POLYLINE: 4,
	POLYBEZIERTO: 5,
	POLYLINETO: 6,
	POLYPOLYLINE: 7,
	POLYPOLYGON: 8,
	SETWINDOWEXTEX: 9,
	SETWINDOWORGEX: 10,
	SETVIEWPORTEXTEX: 11,
	SETVIEWPORTORGEX: 12,
	EOF: 14,
	SETMAPMODE: 17,
	SETPOLYFILLMODE: 19,
	SETBKMODE: 18,
	SETTEXTALIGN: 22,
	SETTEXTCOLOR: 24,
	MOVETOEX: 27,
	SCALEVIEWPORTEXTEX: 31,
	SCALEWINDOWEXTEX: 32,
	SAVEDC: 33,
	RESTOREDC: 34,
	SETWORLDTRANSFORM: 35,
	MODIFYWORLDTRANSFORM: 36,
	SELECTOBJECT: 37,
	CREATEPEN: 38,
	CREATEBRUSHINDIRECT: 39,
	DELETEOBJECT: 40,
	ANGLEARC: 41,
	ELLIPSE: 42,
	RECTANGLE: 43,
	ROUNDRECT: 44,
	ARC: 45,
	CHORD: 46,
	PIE: 47,
	LINETO: 54,
	ARCTO: 55,
	POLYDRAW: 56,
	BEGINPATH: 59,
	ENDPATH: 60,
	CLOSEFIGURE: 61,
	FILLPATH: 62,
	STROKEANDFILLPATH: 63,
	STROKEPATH: 64,
	FLATTENPATH: 65,
	WIDENPATH: 66,
	SELECTCLIPPATH: 67,
	ABORTPATH: 68,
	EXTCREATEFONTINDIRECTW: 82,
	EXTTEXTOUTA: 83,
	EXTTEXTOUTW: 84,
	POLYBEZIER16: 85,
	POLYGON16: 86,
	POLYLINE16: 87,
	POLYBEZIERTO16: 88,
	POLYLINETO16: 89,
	POLYPOLYLINE16: 90,
	POLYPOLYGON16: 91,
	POLYDRAW16: 92,
	CREATEMONOBRUSH: 93,
	CREATEDIBPATTERNBRUSHPT: 94,
	EXTCREATEPEN: 95,
	POLYTEXTOUTA: 96,
	POLYTEXTOUTW: 97,
	SMALLTEXTOUT: 108,
	BITBLT: 76,
	STRETCHDIBITS: 81,
	SETPIXELV: 15,
	OFFSETCLIPRGN: 26,
	SETMETARGN: 28,
	EXCLUDECLIPRECT: 29,
	INTERSECTCLIPRECT: 30,
	EXTFLOODFILL: 53,
	SETARCDIRECTION: 57,
	GDICOMMENT: 70,
	FILLRGN: 71,
	FRAMERGN: 72,
	INVERTRGN: 73,
	PAINTRGN: 74,
	EXTSELECTCLIPRGN: 75,
	STRETCHBLT: 77,
	MASKBLT: 78,
	PLGBLT: 79,
	SETDIBITSTODEVICE: 80,
	ALPHABLEND: 114,
	TRANSPARENTBLT: 116,
	GRADIENTFILL: 118
}, le = {
	[A.POLYDRAW]: "EMR_POLYDRAW",
	[A.POLYDRAW16]: "EMR_POLYDRAW16",
	[A.EXTTEXTOUTA]: "EMR_EXTTEXTOUTA",
	[A.POLYTEXTOUTA]: "EMR_POLYTEXTOUTA",
	[A.POLYTEXTOUTW]: "EMR_POLYTEXTOUTW",
	[A.SMALLTEXTOUT]: "EMR_SMALLTEXTOUT",
	[A.SETPIXELV]: "EMR_SETPIXELV",
	[A.EXTFLOODFILL]: "EMR_EXTFLOODFILL",
	[A.FILLRGN]: "EMR_FILLRGN",
	[A.FRAMERGN]: "EMR_FRAMERGN",
	[A.INVERTRGN]: "EMR_INVERTRGN",
	[A.PAINTRGN]: "EMR_PAINTRGN",
	[A.STRETCHBLT]: "EMR_STRETCHBLT",
	[A.MASKBLT]: "EMR_MASKBLT",
	[A.PLGBLT]: "EMR_PLGBLT",
	[A.SETDIBITSTODEVICE]: "EMR_SETDIBITSTODEVICE",
	[A.ALPHABLEND]: "EMR_ALPHABLEND",
	[A.TRANSPARENTBLT]: "EMR_TRANSPARENTBLT",
	[A.GRADIENTFILL]: "EMR_GRADIENTFILL"
}, ue = 1, de = 2, fe = 1, pe = 4, j = 5, M = {
	WHITE_BRUSH: 2147483648,
	LTGRAY_BRUSH: 2147483649,
	GRAY_BRUSH: 2147483650,
	DKGRAY_BRUSH: 2147483651,
	BLACK_BRUSH: 2147483652,
	NULL_BRUSH: 2147483653,
	WHITE_PEN: 2147483654,
	BLACK_PEN: 2147483655,
	NULL_PEN: 2147483656,
	DC_BRUSH: 2147483666,
	DC_PEN: 2147483662
}, N = {
	TEXT: 1,
	LOMETRIC: 2,
	HIMETRIC: 3,
	LOENGLISH: 4,
	HIENGLISH: 5,
	TWIPS: 6,
	ISOTROPIC: 7,
	ANISOTROPIC: 8
}, me = () => ({
	m11: 1,
	m12: 0,
	m21: 0,
	m22: 1,
	dx: 0,
	dy: 0
});
function he(e, t) {
	return {
		m11: e.m11 * t.m11 + e.m21 * t.m12,
		m12: e.m12 * t.m11 + e.m22 * t.m12,
		m21: e.m11 * t.m21 + e.m21 * t.m22,
		m22: e.m12 * t.m21 + e.m22 * t.m22,
		dx: e.m11 * t.dx + e.m21 * t.dy + e.dx,
		dy: e.m12 * t.dx + e.m22 * t.dy + e.dy
	};
}
var ge = class {
	p;
	constructor(e, t, n) {
		this.dv = e, this.end = n, this.p = t;
	}
	get pos() {
		return this.p;
	}
	set pos(e) {
		this.p = e;
	}
	get remaining() {
		return this.end - this.p;
	}
	require(e) {
		if (this.p < 0 || this.remaining < e) throw RangeError("Truncated EMF record");
	}
	u16() {
		this.require(2);
		let e = this.dv.getUint16(this.p, !0);
		return this.p += 2, e;
	}
	i16() {
		let e = this.dv.getInt16(this.p, !0);
		return this.p += 2, e;
	}
	i32() {
		let e = this.dv.getInt32(this.p, !0);
		return this.p += 4, e;
	}
	u32() {
		let e = this.dv.getUint32(this.p, !0);
		return this.p += 4, e;
	}
	f32() {
		let e = this.dv.getFloat32(this.p, !0);
		return this.p += 4, e;
	}
	xform() {
		return {
			m11: this.f32(),
			m12: this.f32(),
			m21: this.f32(),
			m22: this.f32(),
			dx: this.f32(),
			dy: this.f32()
		};
	}
	skip(e) {
		this.p += e;
	}
}, _e = 2162688, ve = class {
	buf = ye();
	moveTo(e, t) {
		this.buf.ops.push(xe, e, t);
	}
	lineTo(e, t) {
		this.buf.ops.push(Se, e, t);
	}
	bezierCurveTo(e, t, n, r, i, a) {
		this.buf.ops.push(Ce, e, t, n, r, i, a);
	}
	closePath() {
		this.buf.ops.push(we);
	}
};
function ye() {
	return {
		ops: [],
		commands: 0,
		saved: []
	};
}
function be(e, t) {
	let n = t.saved[t.saved.length - 1] ?? {
		length: 0,
		commands: 0
	};
	t.ops.length <= n.length && t.commands <= n.commands || (e.pathRetained -= t.commands - n.commands, t.commands = n.commands, t.ops.length = n.length);
}
var xe = 0, Se = 1, Ce = 2, we = 3;
function Te(e, t) {
	e.beginPath();
	for (let n = 0; n < t.length;) switch (t[n]) {
		case xe:
			e.moveTo(t[n + 1], t[n + 2]), n += 3;
			break;
		case Se:
			e.lineTo(t[n + 1], t[n + 2]), n += 3;
			break;
		case Ce:
			e.bezierCurveTo(t[n + 1], t[n + 2], t[n + 3], t[n + 4], t[n + 5], t[n + 6]), n += 7;
			break;
		default: e.closePath(), n += 1;
	}
}
function P(e) {
	return e.inPath ? e.path : e.ctx;
}
function Ee(e) {
	let t = e.path.buf;
	e.path.buf = ye(), be(e, t);
}
function De(e) {
	Ee(e), e.inPath = !1, e.pathHeld = !1, e.pathDiscarded = !1;
}
var Oe = "EMF path (path command budget)";
function F(e, t) {
	if (!e.inPath) return !0;
	if (e.pathDiscarded) return !1;
	let n = e.pathRetained + t;
	return !Number.isSafeInteger(n) || t < 0 || n > e.maxPathCommands ? (Ee(e), e.pathDiscarded = !0, e.unsupported.add(Oe), !1) : (e.pathRetained = n, e.path.buf.commands += t, !0);
}
function I(e, t, n) {
	let r = n === z ? 4 : 8;
	return Math.min(t, Math.floor(e.remaining / r));
}
function ke(e, t, n) {
	return e.wt.m11 * t + e.wt.m21 * n + e.wt.dx;
}
function Ae(e, t, n) {
	return e.wt.m12 * t + e.wt.m22 * n + e.wt.dy;
}
function je(e) {
	return e.winExtX === 0 ? 1 : e.vpExtX / e.winExtX;
}
function Me(e) {
	return e.winExtY === 0 ? 1 : e.vpExtY / e.winExtY;
}
function Ne(e) {
	return Math.min(Math.abs(je(e)), Math.abs(Me(e)));
}
function Pe(e) {
	return e.mapMode === N.ISOTROPIC ? je(e) < 0 ? -Ne(e) : Ne(e) : je(e);
}
function Fe(e) {
	return e.mapMode === N.ISOTROPIC ? Me(e) < 0 ? -Ne(e) : Ne(e) : Me(e);
}
function Ie(e, t) {
	return (t - e.winOrgX) * Pe(e) + e.vpOrgX;
}
function Le(e, t) {
	return (t - e.winOrgY) * Fe(e) + e.vpOrgY;
}
function L(e, t, n) {
	let r = Ie(e, ke(e, t, n)), i = Le(e, Ae(e, t, n));
	return [(r - e.left) * e.W / e.boundsW, (i - e.top) * e.H / e.boundsH];
}
function Re(e) {
	return (Math.hypot(e.wt.m11, e.wt.m12) + Math.hypot(e.wt.m21, e.wt.m22)) / 2;
}
function ze(e) {
	return (Math.abs(Pe(e)) + Math.abs(Fe(e))) / 2;
}
function Be(e) {
	return (e.W / e.boundsW + e.H / e.boundsH) / 2;
}
function Ve(e) {
	return Math.hypot(e.wt.m21, e.wt.m22);
}
function He(e) {
	return e.H / e.boundsH;
}
function R(e, t) {
	let n = t * Re(e) * ze(e) * Be(e);
	return Math.max(.75, n);
}
function Ue(e, t) {
	if (e.mapMode = t, t === N.TEXT) {
		e.winOrgX = 0, e.winOrgY = 0, e.vpOrgX = 0, e.vpOrgY = 0, e.winExtX = 1, e.winExtY = 1, e.vpExtX = 1, e.vpExtY = 1;
		return;
	}
	if (t === N.ANISOTROPIC || t === N.ISOTROPIC || e.devPxPerMmX <= 0 || e.devPxPerMmY <= 0) return;
	let n = 25.4, r = t === N.LOMETRIC ? .1 : t === N.HIMETRIC ? .01 : t === N.LOENGLISH ? .01 * n : t === N.HIENGLISH ? .001 * n : t === N.TWIPS ? n / 1440 : 0;
	r <= 0 || (e.winOrgX = 0, e.winOrgY = 0, e.vpOrgX = 0, e.vpOrgY = 0, e.winExtX = 1, e.winExtY = 1, e.vpExtX = r * e.devPxPerMmX, e.vpExtY = -(r * e.devPxPerMmY));
}
var We = {
	[M.WHITE_BRUSH]: {
		kind: "brush",
		fill: "#ffffff"
	},
	[M.LTGRAY_BRUSH]: {
		kind: "brush",
		fill: "#c0c0c0"
	},
	[M.GRAY_BRUSH]: {
		kind: "brush",
		fill: "#808080"
	},
	[M.DKGRAY_BRUSH]: {
		kind: "brush",
		fill: "#404040"
	},
	[M.BLACK_BRUSH]: {
		kind: "brush",
		fill: "#000000"
	},
	[M.NULL_BRUSH]: {
		kind: "brush",
		fill: null
	}
}, Ge = {
	[M.WHITE_PEN]: {
		kind: "pen",
		stroke: "#ffffff",
		width: 1
	},
	[M.BLACK_PEN]: {
		kind: "pen",
		stroke: "#000000",
		width: 1
	},
	[M.NULL_PEN]: {
		kind: "pen",
		stroke: null,
		width: 1
	},
	[M.DC_PEN]: {
		kind: "pen",
		stroke: "#000000",
		width: 1
	}
};
function Ke(e, t) {
	let n = We[t];
	if (n) {
		e.curBrush = n;
		return;
	}
	let r = Ge[t];
	if (r) {
		e.curPen = r;
		return;
	}
	t === M.DC_BRUSH && (e.curBrush = e.curBrush ?? {
		kind: "brush",
		fill: "#000000"
	});
}
function qe(e) {
	let t = 0, n = 0, r = 0, i = 0;
	for (let a = 0; a < e.data.length; a += 4) e.data[a + 3] !== 0 && (t += e.data[a], n += e.data[a + 1], r += e.data[a + 2], i++);
	if (i === 0) return "#808080";
	let a = (e) => Math.round(e / i).toString(16).padStart(2, "0");
	return `#${a(t)}${a(n)}${a(r)}`;
}
var z = (e) => [e.i16(), e.i16()], B = (e) => [e.i32(), e.i32()];
function Je(e, t, n) {
	t.skip(16);
	let r = t.u32();
	if (r < 2 || r > 1048576 || !e.inPath && (!e.curPen || e.curPen.stroke == null)) return;
	let { ctx: i } = e, a = P(e), o = F(e, I(t, r, n));
	e.inPath || i.beginPath();
	let s = 0, c = 0;
	for (let i = 0; i < r && !(t.remaining < 4); i++) {
		let [r, l] = n(t), [u, d] = L(e, r, l);
		o && (i === 0 ? a.moveTo(u, d) : a.lineTo(u, d)), s = r, c = l;
	}
	!e.inPath && e.curPen?.stroke != null && (i.strokeStyle = e.curPen.stroke, i.lineWidth = R(e, e.curPen.width), i.stroke(), e.drew = !0), e.curX = s, e.curY = c;
}
function Ye(e, t, n) {
	t.skip(16);
	let r = t.u32();
	if (r < 1 || r > 1048576) return;
	let { ctx: i } = e, a = e.inPath || e.curPen != null && e.curPen.stroke != null, o = !e.inPath || F(e, I(t, r, n));
	if (a && !e.inPath) {
		i.beginPath();
		let [t, n] = L(e, e.curX, e.curY);
		i.moveTo(t, n);
	}
	for (let i = 0; i < r && !(t.remaining < 4); i++) {
		let [r, i] = n(t);
		if (a && o) {
			let [t, n] = L(e, r, i);
			P(e).lineTo(t, n);
		}
		e.curX = r, e.curY = i;
	}
	a && !e.inPath && e.curPen && (i.strokeStyle = e.curPen.stroke, i.lineWidth = R(e, e.curPen.width), i.stroke(), e.drew = !0);
}
function Xe(e, t, n) {
	t.skip(16);
	let r = t.u32();
	if (r < 2 || r > 1048576) return;
	let { ctx: i } = e, a = P(e), o = F(e, I(t, r, n) + 1);
	e.inPath || i.beginPath();
	let s = !1;
	for (let i = 0; i < r && !(t.remaining < 4); i++) {
		let [r, i] = n(t), [c, l] = L(e, r, i);
		s ? o && a.lineTo(c, l) : (o && a.moveTo(c, l), s = !0);
	}
	s && (o && a.closePath(), !e.inPath && (e.curBrush && e.curBrush.fill != null && (i.fillStyle = e.curBrush.fill, i.fill(e.fillRule), e.drew = !0), e.curPen && e.curPen.stroke != null && (i.strokeStyle = e.curPen.stroke, i.lineWidth = R(e, e.curPen.width), i.stroke(), e.drew = !0)));
}
function Ze(e, t, n, r) {
	t.skip(16);
	let i = t.u32();
	if (i < 1 || i > 1048576) return;
	let a = I(t, i, n), o = !e.inPath || F(e, a);
	if (e.inPath && !o) {
		for (let r = 0; r < a; r++) {
			let [r, i] = n(t);
			e.curX = r, e.curY = i;
		}
		return;
	}
	let s = [];
	for (let e = 0; e < i && !(t.remaining < 4); e++) s.push(n(t));
	if (s.length < (r ? 3 : 4)) {
		s.length && (e.curX = s[s.length - 1][0], e.curY = s[s.length - 1][1]);
		return;
	}
	let c = e.inPath || e.curPen != null && e.curPen.stroke != null, { ctx: l } = e, u = P(e);
	if (c) {
		e.inPath || l.beginPath();
		let t = r ? L(e, e.curX, e.curY) : L(e, s[0][0], s[0][1]);
		(!r || !e.inPath) && u.moveTo(t[0], t[1]);
	}
	let d = +!r;
	for (; d + 2 < s.length + +!!r; d += 3) {
		let t = s[d], n = s[d + 1], r = s[d + 2];
		if (!t || !n || !r) break;
		if (c) {
			let i = L(e, t[0], t[1]), a = L(e, n[0], n[1]), o = L(e, r[0], r[1]);
			u.bezierCurveTo(i[0], i[1], a[0], a[1], o[0], o[1]);
		}
		e.curX = r[0], e.curY = r[1];
	}
	c && !e.inPath && e.curPen && (l.strokeStyle = e.curPen.stroke, l.lineWidth = R(e, e.curPen.width), l.stroke(), e.drew = !0);
}
function Qe(e, t, n, r) {
	t.skip(16);
	let i = t.u32(), a = t.u32();
	if (i <= 0 || i > 65536 || a <= 0 || a > 2097152) return;
	let o = [], s = 0;
	for (let e = 0; e < i; e++) {
		if (t.remaining < 4) return;
		let e = t.u32();
		if (s += e, !Number.isSafeInteger(s) || s > 2097152) return;
		o.push(e);
	}
	if (s !== a) return;
	let { ctx: c } = e, l = F(e, I(t, a, n) + (r ? i : 0)), u = P(e);
	e.inPath || c.beginPath();
	let d = !1;
	for (let i of o) {
		if (i < 2) {
			for (let e = 0; e < i && t.remaining >= 4; e++) n(t);
			continue;
		}
		for (let r = 0; r < i && !(t.remaining < 4); r++) {
			let [i, a] = n(t);
			if (l) {
				let [t, n] = L(e, i, a);
				r === 0 ? u.moveTo(t, n) : u.lineTo(t, n);
			}
		}
		r && l && u.closePath(), d = !0;
	}
	!d || e.inPath || (r && e.curBrush && e.curBrush.fill != null && (c.fillStyle = e.curBrush.fill, c.fill(e.fillRule), e.drew = !0), e.curPen && e.curPen.stroke != null && (c.strokeStyle = e.curPen.stroke, c.lineWidth = R(e, e.curPen.width), c.stroke(), e.drew = !0));
}
function $e(e, t, n, r, i) {
	let { ctx: a } = e, o = L(e, t, n), s = L(e, r, n), c = L(e, r, i), l = L(e, t, i), u = P(e), d = F(e, 5);
	e.inPath || a.beginPath(), d && (u.moveTo(o[0], o[1]), u.lineTo(s[0], s[1]), u.lineTo(c[0], c[1]), u.lineTo(l[0], l[1]), u.closePath()), !e.inPath && (e.curBrush && e.curBrush.fill != null && (a.fillStyle = e.curBrush.fill, a.fill(e.fillRule), e.drew = !0), e.curPen && e.curPen.stroke != null && (a.strokeStyle = e.curPen.stroke, a.lineWidth = R(e, e.curPen.width), a.stroke(), e.drew = !0));
}
function et(e, t, n) {
	if (!e.pathHeld) return;
	let r = !e.pathDiscarded, i = e.path.buf.ops;
	if (r && Te(e.ctx, i), De(e), !r) return;
	let { ctx: a } = e;
	t && e.curBrush?.fill != null && (a.fillStyle = e.curBrush.fill, a.fill(e.fillRule), e.drew = !0), n && e.curPen?.stroke != null && (a.strokeStyle = e.curPen.stroke, a.lineWidth = R(e, e.curPen.width), a.stroke(), e.drew = !0), a.beginPath();
}
function V(e, t, n, r, i, a) {
	let o = Math.max(1, Math.ceil(Math.abs(a) / (Math.PI / 2) - 1e-9)), s = a / o, c = 4 / 3 * Math.tan(s / 4), l = (i) => [e + n * Math.cos(i), t + r * Math.sin(i)], u = [];
	for (let e = 0; e < o; e++) {
		let t = i + e * s, a = t + s, [o, d] = l(t), [f, p] = l(a);
		u.push([
			[o - c * n * Math.sin(t), d + c * r * Math.cos(t)],
			[f + c * n * Math.sin(a), p - c * r * Math.cos(a)],
			[f, p]
		]);
	}
	return {
		start: l(i),
		curves: u,
		end: l(i + a)
	};
}
function tt(e, t, n) {
	let r = t - e;
	if (n === de) {
		for (; r <= 0;) r += 2 * Math.PI;
		for (; r > 2 * Math.PI;) r -= 2 * Math.PI;
	} else {
		for (; r >= 0;) r -= 2 * Math.PI;
		for (; r < -2 * Math.PI;) r += 2 * Math.PI;
	}
	return r;
}
function nt(e, t, n, r) {
	let [i, a, o, s] = e, c = Math.abs(o - i) / 2, l = Math.abs(s - a) / 2;
	if (c === 0 || l === 0) return null;
	let u = (i + o) / 2, d = (a + s) / 2, f = Math.atan2((t[1] - d) / l, (t[0] - u) / c);
	return {
		...V(u, d, c, l, f, tt(f, Math.atan2((n[1] - d) / l, (n[0] - u) / c), r)),
		center: [u, d]
	};
}
function rt(e) {
	let [t, n] = L(e, 0, 0), [r, i] = L(e, 1, 0), [a, o] = L(e, 0, 1);
	return (r - t) * (o - n) - (i - n) * (a - t) < 0;
}
function it(e, t, n) {
	for (let [r, i, a] of n.curves) {
		let n = L(e, r[0], r[1]), o = L(e, i[0], i[1]), s = L(e, a[0], a[1]);
		t.bezierCurveTo(n[0], n[1], o[0], o[1], s[0], s[1]);
	}
}
function at(e, t) {
	let { ctx: n } = e;
	t && e.curBrush && e.curBrush.fill != null && (n.fillStyle = e.curBrush.fill, n.fill(e.fillRule), e.drew = !0), e.curPen && e.curPen.stroke != null && (n.strokeStyle = e.curPen.stroke, n.lineWidth = R(e, e.curPen.width), n.stroke(), e.drew = !0);
}
function H(e, t) {
	e.unsupported.add(t);
}
function ot(e, t, n, r) {
	let i = [
		t.i32(),
		t.i32(),
		t.i32(),
		t.i32()
	], a = [t.i32(), t.i32()], o = [t.i32(), t.i32()];
	if (rt(e)) {
		H(e, `${r} (reflected mapping)`);
		return;
	}
	let s = nt(i, a, o, e.arcDirection);
	if (!s || !F(e, s.curves.length + 3)) return;
	let { ctx: c } = e, l = P(e), u = L(e, s.start[0], s.start[1]);
	e.inPath || c.beginPath(), n === "arcTo" ? (e.inPath || c.moveTo(...L(e, e.curX, e.curY)), l.lineTo(u[0], u[1])) : n === "pie" ? (l.moveTo(...L(e, s.center[0], s.center[1])), l.lineTo(u[0], u[1])) : l.moveTo(u[0], u[1]), it(e, l, s), (n === "chord" || n === "pie") && l.closePath(), n === "arcTo" && (e.curX = s.end[0], e.curY = s.end[1]), e.inPath || at(e, n === "chord" || n === "pie");
}
function st(e, t) {
	let n = t.i32(), r = t.i32(), i = t.u32(), a = t.f32(), o = t.f32();
	if (!Number.isFinite(a) || !Number.isFinite(o)) return;
	if (rt(e)) {
		H(e, "EMR_ANGLEARC (reflected mapping)");
		return;
	}
	if (e.inPath && Math.abs(o) > 360) {
		H(e, "EMR_ANGLEARC (multiple sweeps in a path)");
		return;
	}
	let s = Math.max(-360, Math.min(360, o)), c = V(n, r, i, i, -a * Math.PI / 180, -s * Math.PI / 180);
	if (!F(e, c.curves.length + 1)) return;
	let { ctx: l } = e, u = P(e), d = L(e, c.start[0], c.start[1]);
	e.inPath || (l.beginPath(), l.moveTo(...L(e, e.curX, e.curY))), u.lineTo(d[0], d[1]), s !== 0 && it(e, u, c), e.curX = c.end[0], e.curY = c.end[1], e.inPath || at(e, !1);
}
function ct(e, t) {
	let n = t.i32(), r = t.i32(), i = t.i32(), a = t.i32(), o = t.i32(), s = t.i32();
	if (rt(e)) {
		H(e, "EMR_ROUNDRECT (reflected mapping)");
		return;
	}
	let [c, l] = n <= i ? [n, i] : [i, n], [u, d] = r <= a ? [r, a] : [a, r], f = Math.min(Math.abs(o) / 2, (l - c) / 2), p = Math.min(Math.abs(s) / 2, (d - u) / 2);
	if (!F(e, 9)) return;
	let { ctx: m } = e, h = P(e);
	e.inPath || m.beginPath();
	let g = e.arcDirection === de, _ = [
		[
			l - f,
			u + p,
			-Math.PI / 2
		],
		[
			l - f,
			d - p,
			0
		],
		[
			c + f,
			d - p,
			Math.PI / 2
		],
		[
			c + f,
			u + p,
			Math.PI
		]
	];
	(g ? _ : [..._].reverse()).forEach(([t, n, r], i) => {
		let a = g ? V(t, n, f, p, r, Math.PI / 2) : V(t, n, f, p, r + Math.PI / 2, -Math.PI / 2), o = L(e, a.start[0], a.start[1]);
		i === 0 ? h.moveTo(o[0], o[1]) : h.lineTo(o[0], o[1]), f > 0 && p > 0 && it(e, h, a);
	}), h.closePath(), e.inPath || at(e, !0);
}
function lt(e, t, n) {
	let r = t.i32(), i = t.i32(), a = t.i32(), o = t.i32(), s = [
		L(e, r, i),
		L(e, a, i),
		L(e, a, o),
		L(e, r, o)
	];
	ut(e, n ? "evenodd" : "nonzero", (e) => {
		n && mt(e), e.moveTo(...s[0]);
		for (let t of s.slice(1)) e.lineTo(...t);
		e.closePath();
	});
}
function ut(e, t, n) {
	e.ctx.beginPath(), n(e.ctx), dt(e, t);
}
function dt(e, t) {
	try {
		e.ctx.clip(t), e.clipped = !0;
	} catch {}
}
function ft(e, t) {
	return e.clipped ? e.outerClipped ? (e.unsupported.add(`${t} (reset of an inherited clip)`), !1) : (e.ctx.restore(), e.ctx.save(), e.clipped = !1, !0) : !0;
}
function pt(e, t) {
	let n = t.u32(), r = t.u32(), i = "EMR_EXTSELECTCLIPRGN";
	if (r === j && n === 0) {
		ft(e, i);
		return;
	}
	if (r !== fe && r !== j && r !== pe) {
		e.unsupported.add(`${i} (mode ${r})`);
		return;
	}
	if (n < 32 || t.remaining < n) throw RangeError("Truncated EMF region");
	t.u32(), t.u32();
	let a = t.u32();
	if (t.u32(), t.skip(16), a > Math.floor((n - 32) / 16) || a > 65536) throw RangeError("Invalid EMF region");
	if (r === j && !ft(e, i)) return;
	let o = (t, n) => [(t - e.left) * e.W / e.boundsW, (n - e.top) * e.H / e.boundsH], s = [];
	for (let e = 0; e < a; e++) s.push([
		t.i32(),
		t.i32(),
		t.i32(),
		t.i32()
	]);
	let c = (e, [t, n, r, i]) => {
		e.moveTo(...o(t, n)), e.lineTo(...o(r, n)), e.lineTo(...o(r, i)), e.lineTo(...o(t, i)), e.closePath();
	};
	if (r === pe) {
		for (let t of s) ut(e, "evenodd", (e) => {
			mt(e), c(e, t);
		});
		return;
	}
	ut(e, "nonzero", (e) => {
		for (let t of s) c(e, t);
	});
}
function mt(e) {
	e.moveTo(-1e7, -1e7), e.lineTo(1e7, -1e7), e.lineTo(1e7, 1e7), e.lineTo(-1e7, 1e7), e.closePath();
}
function ht(e) {
	let t = e.u32(), n = e.u32(), r = e.i32();
	e.i32();
	let i = e.u32();
	return [t, {
		kind: "pen",
		stroke: (n & 255) == 5 ? null : o(i),
		width: Math.abs(r)
	}];
}
function gt(e) {
	let t = e.u32();
	e.skip(16);
	let n = e.u32(), r = e.u32();
	e.u32();
	let i = e.u32();
	return [t, {
		kind: "pen",
		stroke: (n & 255) == 5 ? null : o(i),
		width: Math.abs(r)
	}];
}
function _t(e) {
	let t = e.u32(), n = e.u32(), r = e.u32();
	return e.u32(), [t, {
		kind: "brush",
		fill: n === 1 ? null : o(r)
	}];
}
function vt(e, t, n) {
	let r = e.u32();
	e.u32();
	let a = e.u32(), o = e.u32(), s = e.u32(), c = e.u32(), l = "#808080";
	try {
		let e = i(t, n + a, o, n + s, c);
		e && (l = qe(e));
	} catch {}
	return [r, {
		kind: "brush",
		fill: l
	}];
}
function yt(e, t, n) {
	if (e.remaining < 96) throw RangeError("Truncated EMF LOGFONTW");
	let r = e.u32(), i = n + 12, a = t.getInt32(i, !0), o = t.getInt32(i + 8, !0), s = t.getInt32(i + 16, !0), c = t.getUint8(i + 20), l = t.getUint8(i + 23), u = "";
	for (let e = 0; e < 32; e++) {
		let n = i + 28 + e * 2;
		if (n + 2 > t.byteLength) break;
		let r = t.getUint16(n, !0);
		if (r === 0) break;
		u += String.fromCharCode(r);
	}
	return [r, {
		kind: "font",
		charset: l,
		height: Math.abs(a),
		weight: s,
		italic: c !== 0,
		face: u,
		escapement: o
	}];
}
function bt(e, t, n, r) {
	let i = t.pos + t.remaining;
	if (t.remaining < 48) throw RangeError("Truncated EMF text record");
	t.skip(16), t.u32(), t.f32(), t.f32();
	let a = t.i32(), o = t.i32(), c = t.u32(), l = t.u32(), u = t.u32(), d = u & 256 ? 60 : 76;
	if (r + d > i) throw RangeError("Truncated EMF text header");
	if (c <= 0 || c > 65536) return;
	if (l < d || r + l + c * 2 > i) throw RangeError("Truncated EMF text string");
	let f = "";
	for (let e = 0; e < c; e++) {
		let t = r + l + e * 2;
		if (t + 2 > n.byteLength) break;
		f += String.fromCharCode(n.getUint16(t, !0));
	}
	if (f.length === 0) return;
	let p = e.curFont, m = !1;
	if (p?.charset === 2 && /[\uf000-\uf0ff]/.test(f)) {
		let t = u === 0 ? s(f, p.face, !0) : null;
		t === null ? H(e, "EMR_EXTTEXTOUTW (unsupported symbol encoding)") : (f = t, m = !0), m && c > 1 && n.getUint32(r + d - 4, !0) !== 0 && H(e, "EMR_EXTTEXTOUTW (symbol character advances)");
	}
	let h = Math.abs(p?.height ?? 0) * Ve(e) * Math.abs(Fe(e)) * He(e);
	if (!Number.isFinite(h) || h < 1) return;
	let { ctx: g } = e, [_, v] = L(e, a, o);
	g.fillStyle = e.textColor;
	let y = p && p.weight >= 700 ? "bold " : "";
	g.font = `${p?.italic ? "italic " : ""}${y}${h}px ${m ? "serif" : p?.face || "sans-serif"}`;
	let b = e.textAlign & 6;
	g.textAlign = b === 2 ? "right" : b === 6 ? "center" : "left", g.textBaseline = (e.textAlign & 24) == 24 ? "alphabetic" : "top";
	let x = p?.escapement ?? 0;
	try {
		if (x !== 0) {
			g.save();
			try {
				g.translate(_, v), g.rotate(-x / 10 * (Math.PI / 180)), g.fillText(f, 0, 0);
			} finally {
				g.restore();
			}
		} else g.fillText(f, _, v);
		e.drew = !0;
	} catch {}
}
function xt(e, t, n, r, o, s, c, l, u, d, f) {
	if (o === 0 || c === 0) return;
	let p = i(t, n + r, o, n + s, c);
	if (!p) {
		e.unsupported.add("EMF bitmap (DIB encoding)");
		return;
	}
	let [m, h] = L(e, l, u), [g, _] = L(e, d, f);
	a(e.ctx, p, m, h, g, _) && (e.drew = !0);
}
function St(e, t, n, r) {
	t.skip(16);
	let i = t.i32(), a = t.i32(), o = t.i32(), s = t.i32(), c = t.u32();
	t.i32(), t.i32(), t.skip(24), t.u32(), t.u32();
	let l = t.u32(), u = t.u32(), d = t.u32(), f = t.u32();
	if (u === 0 || f === 0) {
		if (c === 11141161) return;
		let t = c === 15728673 ? e.curBrush?.fill ?? null : c === 66 ? "#000000" : c === 16711778 ? "#ffffff" : void 0;
		if (t === void 0) {
			e.unsupported.add(`EMR_BITBLT (raster operation 0x${c.toString(16)})`);
			return;
		}
		if (t === null) return;
		let n = [
			L(e, i, a),
			L(e, i + o, a),
			L(e, i + o, a + s),
			L(e, i, a + s)
		];
		e.ctx.beginPath(), e.ctx.moveTo(...n[0]);
		for (let t of n.slice(1)) e.ctx.lineTo(...t);
		e.ctx.closePath(), e.ctx.fillStyle = t, e.ctx.fill("nonzero"), e.drew = !0;
		return;
	}
	xt(e, n, r, l, u, d, f, i, a, i + o, a + s);
}
function Ct(e, t, n, r) {
	t.skip(16);
	let i = t.i32(), a = t.i32();
	t.i32(), t.i32(), t.i32(), t.i32();
	let o = t.u32(), s = t.u32(), c = t.u32(), l = t.u32();
	t.u32(), t.u32();
	let u = t.i32(), d = t.i32();
	xt(e, n, r, o, s, c, l, i, a, i + u, a + d);
}
function wt(e, t, n, r, i = {}) {
	let a = i;
	if (!l(e) || n <= 0 || r <= 0) return !1;
	let o = new DataView(e.buffer, e.byteOffset, e.byteLength), s = () => ({
		ctx: t,
		W: n,
		H: r,
		left: 0,
		top: 0,
		boundsW: n,
		boundsH: r,
		wt: me(),
		mapMode: N.TEXT,
		winOrgX: 0,
		winOrgY: 0,
		winExtX: 1,
		winExtY: 1,
		vpOrgX: 0,
		vpOrgY: 0,
		vpExtX: 1,
		vpExtY: 1,
		devPxPerMmX: 0,
		devPxPerMmY: 0,
		objects: /* @__PURE__ */ new Map(),
		curPen: null,
		curBrush: null,
		curFont: null,
		textColor: "#000000",
		bkMode: 1,
		textAlign: 0,
		fillRule: "nonzero",
		curX: 0,
		curY: 0,
		stack: [],
		drew: !1,
		path: new ve(),
		inPath: !1,
		pathHeld: !1,
		pathDiscarded: !1,
		pathRetained: 0,
		maxPathCommands: Number.isSafeInteger(a.maxPathCommands) && a.maxPathCommands > 0 ? Math.min(a.maxPathCommands, _e) : _e,
		arcDirection: ue,
		clipped: !1,
		outerClipped: !1,
		unsupported: /* @__PURE__ */ new Set()
	}), c = ae(e), u = s();
	if (c.play) {
		let i = new ce(u);
		if (Tt(u, i, c.dual, o, e), i.drawFailed && c.dual) {
			let i = [...u.unsupported];
			try {
				t.clearRect(0, 0, n, r);
			} catch {}
			u = s(), Tt(u, null, !1, o, e);
			for (let e of i) u.unsupported.add(e);
		}
	} else {
		if (!c.dual) for (let e of c.failures) u.unsupported.add(e);
		Tt(u, null, !1, o, e);
	}
	return u.unsupported.size > 0 && i.onUnsupported?.([...u.unsupported]), u.drew;
}
function Tt(e, t, n, r, i) {
	let a = e.ctx;
	a.save();
	let s = 0;
	for (; s + 8 <= i.length;) {
		let c = r.getUint32(s, !0), l = r.getUint32(s + 4, !0);
		if (l < 8 || l & 3 || s + l > i.length) {
			e.unsupported.add("EMF record stream (truncated or invalid record size)");
			break;
		}
		let u = s + l;
		if (c === A.EOF) break;
		let d = new ge(r, s + 8, u);
		if (t && c !== A.HEADER) {
			if (c === A.GDICOMMENT) {
				if (t.playComment(r, s, u), n && t.drawFailed) break;
				s = u;
				continue;
			}
			if (!t.gdiAllowed) {
				s = u;
				continue;
			}
		}
		try {
			switch (c) {
				case A.HEADER: {
					let t = r.getInt32(s + 8, !0), n = r.getInt32(s + 12, !0), i = r.getInt32(s + 16, !0), a = r.getInt32(s + 20, !0);
					if (e.left = t, e.top = n, e.boundsW = Math.max(1, i - t), e.boundsH = Math.max(1, a - n), u >= s + 88) {
						let t = r.getInt32(s + 24, !0), n = r.getInt32(s + 28, !0), i = r.getInt32(s + 32, !0), a = r.getInt32(s + 36, !0), o = r.getInt32(s + 72, !0), c = r.getInt32(s + 76, !0), l = r.getInt32(s + 80, !0), u = r.getInt32(s + 84, !0), d = i - t, f = a - n;
						if (d > 0 && f > 0 && o > 0 && c > 0 && l > 0 && u > 0) {
							let r = o / (l * 100), i = c / (u * 100);
							e.left = t * r, e.top = n * i, e.boundsW = Math.max(1, d * r), e.boundsH = Math.max(1, f * i), e.devPxPerMmX = o / l, e.devPxPerMmY = c / u;
						}
					}
					break;
				}
				case A.SETWORLDTRANSFORM:
					e.wt = d.xform();
					break;
				case A.MODIFYWORLDTRANSFORM: {
					let t = d.xform(), n = d.u32();
					n === 1 ? e.wt = me() : n === 2 ? e.wt = he(t, e.wt) : n === 3 ? e.wt = he(e.wt, t) : n === 4 && (e.wt = t);
					break;
				}
				case A.SETMAPMODE:
					Ue(e, d.u32());
					break;
				case A.SETWINDOWORGEX:
					e.winOrgX = d.i32(), e.winOrgY = d.i32();
					break;
				case A.SETWINDOWEXTEX: {
					let t = d.i32(), n = d.i32();
					t !== 0 && (e.winExtX = t), n !== 0 && (e.winExtY = n);
					break;
				}
				case A.SETVIEWPORTORGEX:
					e.vpOrgX = d.i32(), e.vpOrgY = d.i32();
					break;
				case A.SETVIEWPORTEXTEX: {
					let t = d.i32(), n = d.i32();
					t !== 0 && (e.vpExtX = t), n !== 0 && (e.vpExtY = n);
					break;
				}
				case A.SCALEWINDOWEXTEX: {
					let t = d.i32(), n = d.i32(), r = d.i32(), i = d.i32();
					n !== 0 && (e.winExtX = e.winExtX * t / n), i !== 0 && (e.winExtY = e.winExtY * r / i);
					break;
				}
				case A.SCALEVIEWPORTEXTEX: {
					let t = d.i32(), n = d.i32(), r = d.i32(), i = d.i32();
					n !== 0 && (e.vpExtX = e.vpExtX * t / n), i !== 0 && (e.vpExtY = e.vpExtY * r / i);
					break;
				}
				case A.SAVEDC:
					e.ctx.save(), e.stack.push({
						wt: { ...e.wt },
						mapMode: e.mapMode,
						winOrgX: e.winOrgX,
						winOrgY: e.winOrgY,
						winExtX: e.winExtX,
						winExtY: e.winExtY,
						vpOrgX: e.vpOrgX,
						vpOrgY: e.vpOrgY,
						vpExtX: e.vpExtX,
						vpExtY: e.vpExtY,
						curPen: e.curPen,
						curBrush: e.curBrush,
						curFont: e.curFont,
						textColor: e.textColor,
						bkMode: e.bkMode,
						textAlign: e.textAlign,
						fillRule: e.fillRule,
						curX: e.curX,
						curY: e.curY,
						arcDirection: e.arcDirection,
						clipped: e.clipped,
						outerClipped: e.outerClipped,
						pathBuf: e.path.buf,
						pathLength: e.path.buf.ops.length,
						pathCommands: e.path.buf.commands,
						inPath: e.inPath,
						pathHeld: e.pathHeld,
						pathDiscarded: e.pathDiscarded
					}), e.path.buf.saved.push({
						length: e.path.buf.ops.length,
						commands: e.path.buf.commands
					}), e.outerClipped = e.clipped;
					break;
				case A.RESTOREDC: {
					let t = d.i32(), n = Math.min(Math.abs(t) || 1, e.stack.length), r, i = /* @__PURE__ */ new Set();
					for (let t = 0; t < n; t++) r = e.stack.pop(), e.ctx.restore(), r && (r.pathBuf.saved.pop(), i.add(r.pathBuf));
					if (r) {
						e.wt = r.wt, e.mapMode = r.mapMode, e.winOrgX = r.winOrgX, e.winOrgY = r.winOrgY, e.winExtX = r.winExtX, e.winExtY = r.winExtY, e.vpOrgX = r.vpOrgX, e.vpOrgY = r.vpOrgY, e.vpExtX = r.vpExtX, e.vpExtY = r.vpExtY, e.curPen = r.curPen, e.curBrush = r.curBrush, e.curFont = r.curFont, e.textColor = r.textColor, e.bkMode = r.bkMode, e.textAlign = r.textAlign, e.fillRule = r.fillRule, e.curX = r.curX, e.curY = r.curY, e.arcDirection = r.arcDirection, e.clipped = r.clipped, e.outerClipped = r.outerClipped, i.add(e.path.buf);
						let t = r.pathBuf;
						e.path.buf = t, i.delete(t), e.pathRetained -= t.commands - r.pathCommands, t.commands = r.pathCommands, t.ops.length = r.pathLength;
						for (let t of i) be(e, t);
						e.inPath = r.inPath, e.pathHeld = r.pathHeld, e.pathDiscarded = r.pathDiscarded;
					}
					break;
				}
				case A.BEGINPATH:
					De(e), e.inPath = !0;
					break;
				case A.CLOSEFIGURE:
					e.inPath && F(e, 1) && e.path.closePath();
					break;
				case A.ENDPATH:
					e.inPath && (e.pathHeld = !0), e.inPath = !1;
					break;
				case A.FILLPATH:
					et(e, !0, !1);
					break;
				case A.STROKEANDFILLPATH:
					et(e, !0, !0);
					break;
				case A.STROKEPATH:
					et(e, !1, !0);
					break;
				case A.ABORTPATH:
					De(e);
					break;
				case A.FLATTENPATH: break;
				case A.WIDENPATH:
					e.pathHeld && e.unsupported.add("EMR_WIDENPATH");
					break;
				case A.SELECTCLIPPATH: {
					let t = d.remaining >= 4 ? d.u32() : fe;
					if (!e.pathHeld) break;
					t !== fe && t !== j ? e.unsupported.add(`EMR_SELECTCLIPPATH (mode ${t})`) : t === j && ft(e, "EMR_SELECTCLIPPATH"), e.pathDiscarded || (Te(e.ctx, e.path.buf.ops), dt(e, e.fillRule)), De(e);
					break;
				}
				case A.INTERSECTCLIPRECT:
					lt(e, d, !1);
					break;
				case A.EXCLUDECLIPRECT:
					lt(e, d, !0);
					break;
				case A.EXTSELECTCLIPRGN:
					pt(e, d);
					break;
				case A.OFFSETCLIPRGN:
					e.clipped && e.unsupported.add("EMR_OFFSETCLIPRGN");
					break;
				case A.SETARCDIRECTION: {
					let t = d.u32();
					(t === ue || t === de) && (e.arcDirection = t);
					break;
				}
				case A.GDICOMMENT: break;
				case A.SELECTOBJECT: {
					let t = d.u32();
					if (t & 2147483648) Ke(e, t >>> 0);
					else {
						let n = e.objects.get(t);
						n?.kind === "pen" ? e.curPen = n : n?.kind === "brush" ? e.curBrush = n : n?.kind === "font" && (e.curFont = n);
					}
					break;
				}
				case A.DELETEOBJECT: {
					let t = d.u32(), n = e.objects.get(t);
					n && (n === e.curPen && (e.curPen = null), n === e.curBrush && (e.curBrush = null), n === e.curFont && (e.curFont = null), e.objects.delete(t));
					break;
				}
				case A.CREATEPEN: {
					let [t, n] = ht(d);
					e.objects.set(t, n);
					break;
				}
				case A.EXTCREATEPEN: {
					let [t, n] = gt(d);
					e.objects.set(t, n);
					break;
				}
				case A.CREATEBRUSHINDIRECT: {
					let [t, n] = _t(d);
					e.objects.set(t, n);
					break;
				}
				case A.CREATEMONOBRUSH:
				case A.CREATEDIBPATTERNBRUSHPT: {
					let [t, n] = vt(d, r, s);
					e.objects.set(t, n);
					break;
				}
				case A.EXTCREATEFONTINDIRECTW: {
					let [t, n] = yt(d, r, s);
					e.objects.set(t, n);
					break;
				}
				case A.POLYLINE16:
					Je(e, d, z);
					break;
				case A.POLYLINE:
					Je(e, d, B);
					break;
				case A.POLYLINETO16:
					Ye(e, d, z);
					break;
				case A.POLYLINETO:
					Ye(e, d, B);
					break;
				case A.POLYGON16:
					Xe(e, d, z);
					break;
				case A.POLYGON:
					Xe(e, d, B);
					break;
				case A.POLYBEZIER16:
					Ze(e, d, z, !1);
					break;
				case A.POLYBEZIER:
					Ze(e, d, B, !1);
					break;
				case A.POLYBEZIERTO16:
					Ze(e, d, z, !0);
					break;
				case A.POLYBEZIERTO:
					Ze(e, d, B, !0);
					break;
				case A.POLYPOLYGON16:
					Qe(e, d, z, !0);
					break;
				case A.POLYPOLYGON:
					Qe(e, d, B, !0);
					break;
				case A.POLYPOLYLINE16:
					Qe(e, d, z, !1);
					break;
				case A.POLYPOLYLINE:
					Qe(e, d, B, !1);
					break;
				case A.MOVETOEX:
					if (e.curX = d.i32(), e.curY = d.i32(), e.inPath && F(e, 1)) {
						let [t, n] = L(e, e.curX, e.curY);
						e.path.moveTo(t, n);
					}
					break;
				case A.LINETO: {
					let t = d.i32(), n = d.i32();
					if (e.inPath) F(e, 1) && e.path.lineTo(...L(e, t, n));
					else if (e.curPen && e.curPen.stroke != null) {
						let [r, i] = L(e, e.curX, e.curY), [a, o] = L(e, t, n);
						e.ctx.beginPath(), e.ctx.moveTo(r, i), e.ctx.lineTo(a, o), e.ctx.strokeStyle = e.curPen.stroke, e.ctx.lineWidth = R(e, e.curPen.width), e.ctx.stroke(), e.drew = !0;
					}
					e.curX = t, e.curY = n;
					break;
				}
				case A.RECTANGLE:
					$e(e, d.i32(), d.i32(), d.i32(), d.i32());
					break;
				case A.ELLIPSE: {
					let t = d.i32(), n = d.i32(), r = d.i32(), i = d.i32();
					if (e.inPath) {
						if (rt(e)) {
							H(e, "EMR_ELLIPSE (reflected mapping)");
							break;
						}
						let a = Math.abs(r - t) / 2, o = Math.abs(i - n) / 2;
						if (a === 0 || o === 0) break;
						let s = e.arcDirection === de ? 2 * Math.PI : -2 * Math.PI, c = V((t + r) / 2, (n + i) / 2, a, o, 0, s);
						if (!F(e, c.curves.length + 2)) break;
						e.path.moveTo(...L(e, c.start[0], c.start[1])), it(e, e.path, c), e.path.closePath();
						break;
					}
					let [o, s] = [(t + r) / 2, (n + i) / 2], [c, l] = L(e, o, s), [u] = L(e, r, s), [, f] = L(e, o, i), p = Math.abs(u - c), m = Math.abs(f - l);
					a.beginPath(), a.ellipse(c, l, p, m, 0, 0, Math.PI * 2), e.curBrush && e.curBrush.fill != null && (a.fillStyle = e.curBrush.fill, a.fill(e.fillRule), e.drew = !0), e.curPen && e.curPen.stroke != null && (a.strokeStyle = e.curPen.stroke, a.lineWidth = R(e, e.curPen.width), a.stroke(), e.drew = !0);
					break;
				}
				case A.SETPOLYFILLMODE:
					e.fillRule = d.u32() === 1 ? "evenodd" : "nonzero";
					break;
				case A.SETTEXTCOLOR:
					e.textColor = o(d.u32());
					break;
				case A.SETTEXTALIGN:
					e.textAlign = d.u32();
					break;
				case A.SETBKMODE:
					e.bkMode = d.u32();
					break;
				case A.EXTTEXTOUTW:
					e.inPath && H(e, "EMR_EXTTEXTOUTW (glyph path)"), bt(e, d, r, s);
					break;
				case A.BITBLT:
					St(e, d, r, s);
					break;
				case A.STRETCHDIBITS:
					Ct(e, d, r, s);
					break;
				case A.ARC:
					ot(e, d, "arc", "EMR_ARC");
					break;
				case A.ARCTO:
					ot(e, d, "arcTo", "EMR_ARCTO");
					break;
				case A.CHORD:
					ot(e, d, "chord", "EMR_CHORD");
					break;
				case A.PIE:
					ot(e, d, "pie", "EMR_PIE");
					break;
				case A.ANGLEARC:
					st(e, d);
					break;
				case A.ROUNDRECT:
					ct(e, d);
					break;
				default: {
					let t = le[c];
					t && H(e, t);
					break;
				}
			}
		} catch {
			e.unsupported.add(`EMF record ${c} (malformed)`);
		}
		s = u;
	}
	for (let t = 0; t <= e.stack.length; t++) a.restore();
}
async function Et(e, n, r) {
	let i = {
		bitmap: null,
		unsupported: []
	};
	if (!l(e) || n <= 0 || r <= 0) return i;
	let a = t(n, r);
	if (!a) return i;
	let o = a.getContext("2d");
	if (!o) return i;
	o.lineJoin = "round", o.lineCap = "round";
	let s = [];
	return {
		bitmap: wt(e, o, n, r, { onUnsupported: (e) => {
			s = e;
		} }) ? await createImageBitmap(a) : null,
		unsupported: s
	};
}
//#endregion
//#region packages/core/src/image/image-bitmap-lifecycle.ts
function Dt(e) {
	let t = e.close;
	typeof t == "function" && t.call(e);
}
//#endregion
//#region packages/core/src/image/raster-dimensions.ts
function Ot(e, t) {
	return e[t] << 8 | e[t + 1];
}
function kt(e, t) {
	return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0;
}
function U(e, t) {
	return e[t] | e[t + 1] << 8;
}
function At(e, t) {
	return e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24 | 0;
}
function jt(e) {
	let t = e.length;
	return t >= 24 && e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71 && e[4] === 13 && e[5] === 10 && e[6] === 26 && e[7] === 10 ? e[12] === 73 && e[13] === 72 && e[14] === 68 && e[15] === 82 ? {
		width: kt(e, 16),
		height: kt(e, 20)
	} : null : t >= 10 && e[0] === 71 && e[1] === 73 && e[2] === 70 && e[3] === 56 && (e[4] === 55 || e[4] === 57) && e[5] === 97 ? {
		width: U(e, 6),
		height: U(e, 8)
	} : t >= 26 && e[0] === 66 && e[1] === 77 ? Mt(e, 14) === 12 ? {
		width: U(e, 18),
		height: U(e, 20)
	} : {
		width: Math.abs(At(e, 18)),
		height: Math.abs(At(e, 22))
	} : t >= 16 && e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 && e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80 ? Nt(e) : t >= 4 && e[0] === 255 && e[1] === 216 ? It(e) : t >= 4 && (e[0] === 73 && e[1] === 73 || e[0] === 77 && e[1] === 77) ? v(e) : null;
}
function Mt(e, t) {
	return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
}
function Nt(e) {
	let t = e.length, n = e[12], r = e[13], i = e[14], a = e[15];
	if (n === 86 && r === 80 && i === 56 && a === 32) return t < 30 ? null : {
		width: U(e, 26) & 16383,
		height: U(e, 28) & 16383
	};
	if (n === 86 && r === 80 && i === 56 && a === 76) {
		if (t < 25 || e[20] !== 47) return null;
		let n = Mt(e, 21);
		return {
			width: (n & 16383) + 1,
			height: (n >>> 14 & 16383) + 1
		};
	}
	return n === 86 && r === 80 && i === 56 && a === 88 ? t < 30 ? null : {
		width: (e[24] | e[25] << 8 | e[26] << 16) + 1,
		height: (e[27] | e[28] << 8 | e[29] << 16) + 1
	} : null;
}
function Pt(e) {
	return e.length >= 6 && e[0] === 69 && e[1] === 120 && e[2] === 105 && e[3] === 102 && e[4] === 0 && e[5] === 0;
}
function Ft(e) {
	if (e.length < 14 || !Pt(e)) return null;
	let t = e[6] === 73 && e[7] === 73, n = e[6] === 77 && e[7] === 77;
	if (!t && !n) return null;
	let r = new DataView(e.buffer, e.byteOffset, e.byteLength);
	if (r.getUint16(8, t) !== 42) return null;
	let i = r.getUint32(10, t), a = 6 + i;
	if (i < 8 || a + 2 > e.length) return null;
	let o = r.getUint16(a, t), s = a + 2, c = Math.min(o, Math.floor((e.length - s) / 12));
	for (let e = 0; e < c; e++) {
		let n = s + e * 12;
		if (r.getUint16(n, t) !== 274 || r.getUint16(n + 2, t) !== 3 || r.getUint32(n + 4, t) !== 1) continue;
		let i = r.getUint16(n + 8, t);
		if (i >= 1 && i <= 8) return i;
	}
	return null;
}
function W(e, t) {
	return t !== null && t >= 5 && t <= 8 ? {
		width: e.height,
		height: e.width
	} : e;
}
function It(e) {
	let t = e.length, n = 2, r = null, i = !1, a = null;
	for (; n + 1 < t;) {
		if (e[n] !== 255) {
			n += 1;
			continue;
		}
		let o = e[n + 1];
		if (o === 255) {
			n += 1;
			continue;
		}
		if (o === 216 || o === 1 || o >= 208 && o <= 215) {
			n += 2;
			continue;
		}
		if (o === 217 || o === 218) return a ? W(a, r) : null;
		if (n + 3 >= t) return null;
		let s = Ot(e, n + 2);
		if (o >= 192 && o <= 207 && o !== 196 && o !== 200 && o !== 204) {
			if (s < 7 || n + 8 >= t) return null;
			let r = Ot(e, n + 5), i = Ot(e, n + 7);
			a ??= {
				width: i,
				height: r
			};
		}
		if (s < 2) return null;
		let c = n + 2 + s;
		if (c > t) return a ? W(a, r) : null;
		if (o === 225 && !i) {
			let t = e.subarray(n + 4, c);
			Pt(t) && (i = !0, r = Ft(t));
		}
		n = c;
	}
	return a ? W(a, r) : null;
}
function Lt(e) {
	let { width: t, height: n } = e;
	return !Number.isFinite(t) || !Number.isFinite(n) || t <= 0 || n <= 0 || t > 32767 || n > 32767 ? !0 : t * n > h;
}
function Rt(e) {
	let { width: t, height: n } = e;
	return !Number.isFinite(t) || !Number.isFinite(n) || t <= 0 || n <= 0 || t > 134217728 || n > 134217728 ? !0 : t * n > f;
}
//#endregion
//#region packages/core/src/image/raster-blob-inspection.ts
function zt(e) {
	switch (e.split(";", 1)[0]?.trim().toLowerCase()) {
		case "image/png":
		case "image/jpeg":
		case "image/jpg":
		case "image/gif":
		case "image/bmp":
		case "image/x-ms-bmp":
		case "image/webp": return !0;
		default: return !1;
	}
}
function Bt(e, t = !1) {
	return e !== null && e !== "wmf" && e !== "emf" && (e !== "tiff" || t);
}
var Vt = 64 * 1024;
function Ht(e) {
	return n(e) ? "wmf" : l(e) ? "emf" : e.length >= 8 && e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71 && e[4] === 13 && e[5] === 10 && e[6] === 26 && e[7] === 10 ? "png" : e.length >= 2 && e[0] === 255 && e[1] === 216 ? "jpeg" : e.length >= 6 && e[0] === 71 && e[1] === 73 && e[2] === 70 && e[3] === 56 && (e[4] === 55 || e[4] === 57) && e[5] === 97 ? "gif" : e.length >= 2 && e[0] === 66 && e[1] === 77 ? "bmp" : e.length >= 12 && e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 && e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80 ? "webp" : b(e) ? "tiff" : null;
}
function Ut(e) {
	return e >= 192 && e <= 207 && e !== 196 && e !== 200 && e !== 204;
}
async function Wt(e) {
	let t = e.slice(2).stream().getReader(), n = !1, r = -1, i = -1, a = 0, o = null, s = 0, c = 0, l = null, u = null, d = 0, f = null, p = !1;
	try {
		for (;;) {
			let { value: e, done: m } = await t.read();
			if (m) return l ? W(l, f) : null;
			for (let m of e) {
				if (o) {
					if (o[s++] = m, s === o.length) {
						let e = o[1] << 8 | o[2], n = o[3] << 8 | o[4];
						if (l ??= {
							width: n,
							height: e
						}, o = null, s = 0, p) return await t.cancel(), W(l, f);
						a = c, c = 0;
					}
					continue;
				}
				if (u) {
					if (u[d++] = m, d === u.length && (Pt(u) && (p = !0, f = Ft(u)), u = null, d = 0, p && l)) return await t.cancel(), W(l, f);
					continue;
				}
				if (a > 0) {
					a--;
					continue;
				}
				if (r >= 0) {
					if (i < 0) {
						i = m;
						continue;
					}
					let e = i << 8 | m;
					if (e < 2) return null;
					if (Ut(r)) {
						if (e < 7) return null;
						l ? a = e - 2 : (o = new Uint8Array(5), s = 0, c = e - 7);
					} else r === 225 && !p && e > 2 ? (u = new Uint8Array(e - 2), d = 0) : a = e - 2;
					r = -1, i = -1;
					continue;
				}
				if (!n) {
					m === 255 && (n = !0);
					continue;
				}
				if (m !== 255 && (n = !1, m !== 0)) {
					if (m === 217 || m === 218) return await t.cancel(), l ? W(l, f) : null;
					m === 216 || m === 1 || m >= 208 && m <= 215 || (r = m);
				}
			}
		}
	} finally {
		t.releaseLock();
	}
}
async function Gt(e, t) {
	if (t.length < 8 || !b(t)) return null;
	let n = t[0] === 73, r = new DataView(t.buffer, t.byteOffset, t.byteLength).getUint32(4, n);
	if (!Number.isSafeInteger(r) || r < 8 || r > e.size - 2) return null;
	let i = new Uint8Array(await e.slice(r, r + 2).arrayBuffer());
	if (i.length !== 2) return null;
	let a = new DataView(i.buffer, i.byteOffset, 2).getUint16(0, n), o = a * 12;
	if (r + 2 + o > e.size) return null;
	let s = new Uint8Array(await e.slice(r + 2, r + 2 + o).arrayBuffer()), c = new DataView(s.buffer, s.byteOffset, s.byteLength), l, u;
	for (let e = 0; e < a; e++) {
		let t = e * 12, r = c.getUint16(t, n);
		if (r !== 256 && r !== 257) continue;
		let i = c.getUint16(t + 2, n);
		if (c.getUint32(t + 4, n) !== 1 || i !== 1 && i !== 3 && i !== 4) return null;
		let a = i === 1 ? c.getUint8(t + 8) : i === 3 ? c.getUint16(t + 8, n) : c.getUint32(t + 8, n);
		r === 256 ? l = a : u = a;
	}
	return l === void 0 || u === void 0 ? null : {
		width: l,
		height: u
	};
}
async function Kt(e, t) {
	let n = t ?? new Uint8Array(await e.slice(0, Vt).arrayBuffer()), r = Ht(n);
	if (!r) return {
		format: null,
		dimensions: null
	};
	let i = jt(n);
	return r === "jpeg" ? {
		format: r,
		dimensions: await Wt(e) ?? i
	} : i ? {
		format: r,
		dimensions: i
	} : r === "tiff" ? {
		format: r,
		dimensions: await Gt(e, n)
	} : {
		format: r,
		dimensions: null
	};
}
//#endregion
//#region packages/core/src/image/raster-or-metafile.ts
var qt = class e extends Error {
	code = "ooxml-incomplete-metafile";
	constructor(t, n) {
		super(`OOXML ${t} metafile could not be fully played: ${n.join(", ")}`), this.format = t, this.unsupported = n, this.name = "OoxmlIncompleteMetafileError", Object.setPrototypeOf(this, e.prototype);
	}
}, Jt = /* @__PURE__ */ new WeakMap();
function Yt(e, t) {
	if (!e || !t || e === t) return;
	let n = Jt.get(e);
	n && Jt.set(t, n);
}
function Xt(e, t, n, r = "emf") {
	if (t.length === 0) return e;
	if (n === "reject") throw e && Dt(e), new qt(r, t);
	return e && Jt.set(e, {
		format: r,
		unsupported: t
	}), e;
}
function Zt(e, t) {
	return e.width <= 0 || e.height <= 0 || e.width > 32767 || e.height > 32767 || e.width * e.height > t;
}
function Qt(e) {
	let t = e.split(";", 1)[0]?.trim().toLowerCase();
	return t === "image/tiff" || t === "image/x-tiff";
}
function $t(e, t, n, r = !1) {
	let i = {
		retainedDimensions: e,
		resizeOptions: null
	}, a = S(e, typeof t == "number" && Number.isFinite(t) && t > 0 ? t : void 0, typeof n == "number" && Number.isFinite(n) && n > 0 ? n : void 0, r);
	return a ? {
		retainedDimensions: a,
		resizeOptions: {
			resizeWidth: a.width,
			resizeHeight: a.height,
			resizeQuality: "high"
		}
	} : i;
}
function en(e, t, n) {
	let r = Math.max(e.width, e.height);
	if (!Number.isFinite(r) || r > t) return new _("image-dimension", t, Number.isFinite(r) ? r : 2 ** 53 - 1);
	let i = e.width * e.height;
	return new _("image-pixels", n, Number.isSafeInteger(i) && i >= 0 ? i : 2 ** 53 - 1);
}
async function tn(e, t = {}) {
	return nn(e, t);
}
async function nn(t, i = {}, a) {
	let { widthPt: o = 0, heightPt: s = 0, suppressBoundaryFrame: p = !1, tiff: g, targetWidthPx: _, targetHeightPx: v, maxRetainedPixels: S = h, incompleteMetafile: C = "draw-supported" } = i, w = Number.isSafeInteger(S) && S > 0 ? Math.min(S, h) : h, T = new Uint8Array(await t.slice(0, 64 * 1024).arrayBuffer());
	if (n(T)) {
		let { w: e, h: n } = c(o, s), i = [];
		return rn(Xt(await r(new Uint8Array(await t.arrayBuffer()), e, n, p, (e) => {
			i = e;
		}), i, C, "wmf"), w);
	}
	if (l(T)) {
		let { w: e, h: n } = c(o, s), r = await Et(new Uint8Array(await t.arrayBuffer()), e, n);
		return rn(Xt(r.bitmap, r.unsupported, C), w);
	}
	let E = (a ?? await Kt(t, T)).dimensions;
	if (E && Rt(E)) throw en(E, u, f);
	let D = b(T) || Qt(t.type), O = E ? $t(E, _, v, D) : null;
	if (O && Zt(O.retainedDimensions, w)) throw en(O.retainedDimensions, m, w);
	if (D) {
		if (!g) throw new e("tiff");
		let n;
		try {
			n = await g.render(new Uint8Array(await t.arrayBuffer()), {
				targetWidthPx: _,
				targetHeightPx: v,
				maxRetainedPixels: w
			});
		} catch (e) {
			throw d(e) || y(e) ? e : new x("TIFF codec failed to decode the image", { cause: e });
		}
		if (!n) throw new x("TIFF codec failed to decode the image");
		return rn(n, w);
	}
	return rn(O?.resizeOptions ? await createImageBitmap(t, O.resizeOptions) : await createImageBitmap(t), w);
}
function rn(e, t = h) {
	if (!e) return null;
	let n = {
		width: Number(e.width),
		height: Number(e.height)
	};
	if (!Zt(n, t)) return e;
	throw Dt(e), en(n, m, t);
}
//#endregion
//#region packages/core/src/image/decode-gate.ts
var an = /* @__PURE__ */ new WeakMap();
async function on(e, t) {
	let n = an.get(e);
	n || (n = {
		active: 0,
		waiters: []
	}, an.set(e, n)), n.active >= 2 || n.waiters.length > 0 ? await new Promise((e) => n.waiters.push(e)) : n.active++;
	try {
		return await Promise.resolve(), await t();
	} finally {
		let t = n.waiters.shift();
		t ? t() : (n.active--, n.active === 0 && an.delete(e));
	}
}
//#endregion
//#region packages/core/src/image/adaptive-image-budget.ts
function sn(e = void 0) {
	if (e !== void 0 && (typeof e != "object" || !e || Array.isArray(e))) throw TypeError("imageResources must be an object when provided");
	let t = e?.decodedByteBudget ?? 134217728;
	if (!Number.isSafeInteger(t) || t < 4 || t > 536870912) throw RangeError(`imageResources.decodedByteBudget must be a safe integer from 4 to ${g} bytes`);
	let n = e?.strategy ?? "adaptive";
	if (n !== "adaptive" && n !== "strict") throw TypeError("imageResources.strategy must be 'adaptive' or 'strict'");
	let r = e?.resolution ?? "native-if-fit";
	if (r !== "native-if-fit" && r !== "display") throw TypeError("imageResources.resolution must be 'native-if-fit' or 'display'");
	return Object.freeze({
		decodedByteBudget: t,
		strategy: n,
		resolution: r
	});
}
function cn(e) {
	return Number.isFinite(e) && e > 0 ? Math.max(1, Math.ceil(e)) : 1;
}
function ln(e) {
	return Number.isSafeInteger(e) && (e ?? 0) > 0 ? e : 1;
}
function G(e, t) {
	let n = 0;
	for (let r of e.values()) {
		let e = t(r), i = e.width * e.height * r.surfaces * 4;
		n = Math.min(2 ** 53 - 1, n + i);
	}
	return n;
}
function un(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = cn(t.targetWidthPx), r = cn(t.targetHeightPx), i = t.sourceWidthPx !== void 0 && t.sourceHeightPx !== void 0, a = i ? cn(t.sourceWidthPx) : void 0, o = i ? cn(t.sourceHeightPx) : void 0, s = ln(t.retainedSurfaceCount), c = n.get(t.key);
		c ? (c.targetWidth = Math.max(c.targetWidth, e), c.targetHeight = Math.max(c.targetHeight, r), a !== void 0 && o !== void 0 && (c.sourceWidth = Math.max(c.sourceWidth ?? 0, a), c.sourceHeight = Math.max(c.sourceHeight ?? 0, o)), c.surfaces = Math.max(c.surfaces, s)) : n.set(t.key, {
			targetWidth: e,
			targetHeight: r,
			sourceWidth: a,
			sourceHeight: o,
			surfaces: s
		});
	}
	let r = (e) => ({
		width: e.sourceWidth ?? e.targetWidth,
		height: e.sourceHeight ?? e.targetHeight
	}), i = (e, t) => ({
		width: Math.max(1, Math.floor(e.targetWidth * t)),
		height: Math.max(1, Math.floor(e.targetHeight * t))
	}), a = (e, t) => {
		let n = i(e, t);
		return e.sourceWidth === void 0 || e.sourceHeight === void 0 ? n : S({
			width: e.sourceWidth,
			height: e.sourceHeight
		}, n.width, n.height) ?? {
			width: e.sourceWidth,
			height: e.sourceHeight
		};
	}, o = (e, t, n) => {
		let r = i(e, t), o = a(e, t), s = o.width * o.height;
		return Object.freeze({
			...r,
			retainedWidth: o.width,
			retainedHeight: o.height,
			retainedPixels: s,
			maxRetainedPixels: n ?? s
		});
	}, s = G(n, r), c = [...n.values()].every((e) => {
		let t = r(e);
		return t.width * t.height <= h;
	}), l = [...n.values()].some((e) => e.sourceWidth === void 0 || e.sourceHeight === void 0), u = t.resolution === "native-if-fit" && !l && c && s <= t.decodedByteBudget, d = G(n, (e) => a(e, 1));
	if (u) {
		let e = /* @__PURE__ */ new Map();
		for (let [t, i] of n) {
			let n = r(i);
			e.set(t, Object.freeze({
				width: n.width,
				height: n.height,
				retainedWidth: n.width,
				retainedHeight: n.height,
				retainedPixels: n.width * n.height,
				maxRetainedPixels: n.width * n.height
			}));
		}
		return Object.freeze({
			targets: e,
			idealBytes: d,
			plannedBytes: s,
			qualityScale: 1,
			degraded: !1
		});
	}
	if (t.resolution === "native-if-fit" && t.strategy === "adaptive" && l && d <= t.decodedByteBudget) {
		let e = Math.sqrt(t.decodedByteBudget / Math.max(1, d));
		for (let t of n.values()) {
			let n = a(t, 1);
			e = Math.min(e, Math.sqrt(h / (n.width * n.height)));
		}
		let r = /* @__PURE__ */ new Map(), i = Math.floor(t.decodedByteBudget / 4), s = 0;
		for (let [t, c] of n) {
			let n = a(c, 1), l = n.width * n.height, u = Math.max(l, Math.floor(l * e * e)), d = Math.max(1, Math.min(u, Math.floor(i / c.surfaces))), f = Math.min(2, Math.sqrt(d / l));
			r.set(t, o(c, f, d));
			let p = d * c.surfaces;
			i -= p, s += p * 4;
		}
		return Object.freeze({
			targets: r,
			idealBytes: d,
			plannedBytes: s,
			qualityScale: 1,
			degraded: !1
		});
	}
	if (t.strategy === "strict" && d > t.decodedByteBudget) throw new _("active-decoded-bytes", t.decodedByteBudget, d);
	if (t.strategy === "adaptive") {
		let e = G(n, (e) => a(e, 0));
		if (e > t.decodedByteBudget) throw new _("active-decoded-bytes", t.decodedByteBudget, e);
	}
	let f = 1;
	if (t.strategy === "adaptive" && d > t.decodedByteBudget) {
		let e = 0, r = 1;
		for (let i = 0; i < 40; i++) {
			let i = (e + r) / 2;
			G(n, (e) => a(e, i)) <= t.decodedByteBudget ? e = i : r = i;
		}
		f = e;
	}
	let p = /* @__PURE__ */ new Map();
	for (let [e, t] of n) p.set(e, o(t, f));
	let m = G(n, (e) => a(e, f)), g = f < 1 && n.size > 0 ? Math.min(...[...n.entries()].flatMap(([e, t]) => {
		let n = p.get(e);
		return [n.width / t.targetWidth, n.height / t.targetHeight];
	})) : f;
	return Object.freeze({
		targets: p,
		idealBytes: d,
		plannedBytes: m,
		qualityScale: g,
		degraded: f < 1
	});
}
//#endregion
//#region packages/core/src/image/bitmap-image-by-path.ts
function dn(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
var fn = 256, K = /* @__PURE__ */ new WeakMap(), pn = /* @__PURE__ */ new WeakMap(), mn = /* @__PURE__ */ new WeakMap(), hn = /* @__PURE__ */ new WeakMap();
function q(e) {
	return mn.get(e) ?? 0;
}
function gn(e, t) {
	return hn.get(e)?.get(t) ?? 0;
}
function _n(e, t) {
	if (q(e) !== t) throw Error("Decoded bitmap cache was dropped during raster inspection");
}
function vn(e, t) {
	return {
		owner: e,
		ownerGeneration: q(e),
		namespace: t,
		namespaceGeneration: gn(e, t)
	};
}
function yn(e, t) {
	if (t.owner !== e || q(e) !== t.ownerGeneration) throw Error("Decoded bitmap cache was dropped during a derived image operation");
}
function bn(e, t, n) {
	if (yn(e, n), n.namespace !== t || gn(e, t) !== n.namespaceGeneration) throw Error("Decoded bitmap cache namespace was dropped during a derived image operation");
}
function xn(e) {
	let t = pn.get(e);
	if (t) for (let e of t.values()) e.then((e) => {
		e.initialBlob = void 0;
	}).catch(() => {});
}
function Sn(e, t, n, r) {
	let i = pn.get(e);
	i || (i = /* @__PURE__ */ new Map(), pn.set(e, i));
	let a = i.get(t);
	if (a) return a;
	let o = on(e, async () => {
		let e = await r(t, n);
		return {
			inspection: await Kt(e),
			initialBlob: e
		};
	}).catch((e) => {
		throw i?.delete(t), e;
	});
	return i.set(t, o), o;
}
async function Cn(e, t, n, r = n) {
	return (await Sn(r, e, t, n)).inspection;
}
function wn(e) {
	let t = K.get(e);
	return t || (t = {
		entries: /* @__PURE__ */ new Map(),
		retainedBytes: 0,
		retainedLimit: p
	}, K.set(e, t)), t;
}
var J = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap();
async function Tn(e, t, n) {
	let r = Y.get(e);
	if (!r) {
		let i;
		r = {
			tail: new Promise((e) => {
				i = e;
			}),
			pending: 1
		}, Y.set(e, r);
		let a;
		try {
			return a = kn(e, t), await n();
		} finally {
			xn(e), a?.(), i(), r.pending--, r.pending === 0 && Y.delete(e);
		}
	}
	let i = r, a = i.tail.catch(() => {}), o, s = new Promise((e) => {
		o = e;
	});
	i.pending++, i.tail = a.then(() => s), await a;
	let c;
	try {
		return c = kn(e, t), await n();
	} finally {
		xn(e), c?.(), o(), i.pending--, i.pending === 0 && Y.delete(e);
	}
}
var En = /* @__PURE__ */ new WeakSet();
function Dn(e) {
	!e || En.has(e) || (En.add(e), Dt(e));
}
function On(e) {
	try {
		Dn(e);
	} catch {}
}
function kn(e, t) {
	let n = sn(t), r = J.get(e);
	r || (r = {
		count: 0,
		deferred: [],
		activeBytes: 0,
		activeBitmaps: /* @__PURE__ */ new WeakSet(),
		limits: /* @__PURE__ */ new Map(),
		activeLimit: n.decodedByteBudget
	}, J.set(e, r));
	let i = r, a = Symbol("decoded-image-lease");
	i.limits.set(a, n.decodedByteBudget), i.activeLimit = Math.min(...i.limits.values());
	let o = wn(e);
	for (o.retainedLimit = i.activeLimit; o.retainedBytes > o.retainedLimit && Mn(e, o););
	i.count++;
	let s = !1;
	return () => {
		if (s) return;
		if (s = !0, i.count--, i.limits.delete(a), i.count > 0) {
			i.activeLimit = Math.min(...i.limits.values());
			let t = K.get(e);
			t && (t.retainedLimit = i.activeLimit);
			return;
		}
		for (let e of i.deferred) e.then((e) => Dn(e)).catch(() => {});
		i.deferred = [], i.activeBytes = 0, i.activeBitmaps = /* @__PURE__ */ new WeakSet(), J.delete(e);
		let t = K.get(e);
		t && (t.retainedLimit = p);
	};
}
function An(e) {
	if (!e) return 0;
	let t = Number(e.width), n = Number(e.height);
	return Number.isSafeInteger(t) && t > 0 && Number.isSafeInteger(n) && n > 0 ? t * n * 4 : 0;
}
function jn(e, t) {
	if (!t) return;
	let n = J.get(e);
	if (!n || n.count === 0 || n.activeBitmaps.has(t)) return;
	let r = n.activeBytes + An(t);
	if (r > n.activeLimit) throw new _("active-decoded-bytes", n.activeLimit, r);
	n.activeBitmaps.add(t), n.activeBytes = r;
}
function Mn(e, t, n) {
	let r = [...t.entries].find(([e]) => e !== n);
	if (!r) return !1;
	let [i, a] = r;
	return t.entries.delete(i), t.retainedBytes -= a.weight, Nn(e, a.ownedPromise), !0;
}
function Nn(e, t) {
	let n = J.get(e);
	if (n && n.count > 0) {
		n.deferred.push(t);
		return;
	}
	t.then((e) => Dn(e)).catch(() => {});
}
function X(e) {
	if (!(typeof e != "number" || !Number.isFinite(e) || !(e > 0))) return Math.ceil(e);
}
function Pn(e) {
	return {
		...e,
		targetWidthPx: X(e.targetWidthPx),
		targetHeightPx: X(e.targetHeightPx)
	};
}
function Z(e) {
	let t = e.maxRetainedPixels;
	return typeof t == "number" && Number.isSafeInteger(t) && t > 0 ? Math.min(t, p / 4) : p / 4;
}
function Fn(e) {
	return Z(e) < p / 4;
}
function In(e, t) {
	if (!e) return null;
	let n = Z(t), r = Number(e.width), i = Number(e.height), a = Math.max(r, i);
	if (!Number.isFinite(a) || a > 32767) throw new _("image-dimension", m, Number.isFinite(a) ? a : 2 ** 53 - 1);
	let o = r * i;
	if (!(r > 0) || !(i > 0) || o > n) throw new _("image-pixels", n, Number.isSafeInteger(o) && o >= 0 ? o : 2 ** 53 - 1);
	return e;
}
function Q(e, t = {}) {
	let n = X(t.targetWidthPx), r = X(t.targetHeightPx), i = `${e.length}:${e}`, a = Z(t);
	return n || r ? `raster:${i}:${n ?? 0}x${r ?? 0}:p${a}` : `native:${i}`;
}
function Ln(e) {
	return e.inspection.format === "wmf" || e.inspection.format === "emf";
}
function Rn(e) {
	let t = c(e.widthPt ?? 0, e.heightPt ?? 0);
	return {
		width: t.w,
		height: t.h,
		suppressBoundaryFrame: e.suppressBoundaryFrame === !0,
		pixelLimit: Z(e),
		rejectIncomplete: e.incompleteMetafile === "reject"
	};
}
function zn(e, t) {
	let n = `${e.length}:${e}`, r = t.rejectIncomplete ? "r1:" : "";
	return `metafile:${n}:s${+!!t.suppressBoundaryFrame}:p${t.pixelLimit}:${r}`;
}
function Bn(e, t, n) {
	let r = Rn(t), i = X(n?.width) ?? r.width, a = X(n?.height) ?? r.height;
	return `${zn(e, r)}${i}x${a}`;
}
function Vn(e, t, n) {
	let r = Rn(n), i = `${$}${zn(t, r)}`, a;
	for (let t of K.get(e)?.entries.keys() ?? []) {
		if (!t.startsWith(i)) continue;
		let e = /^(\d+)x(\d+)$/.exec(t.slice(i.length));
		if (!e) continue;
		let n = Number(e[1]), o = Number(e[2]);
		if (n < r.width || o < r.height) continue;
		let s = n * o;
		(!a || s < a.pixels) && (a = {
			key: t.slice($.length),
			pixels: s
		});
	}
	return a?.key;
}
function Hn(e, t, n, r) {
	let i = X(n.targetWidthPx), a = X(n.targetHeightPx);
	if (!i && !a) return;
	let o = Z(n), s = `${$}raster:${`${t.length}:${t}`}:`, c;
	for (let [t, n] of K.get(e)?.entries ?? []) {
		if (!t.startsWith(s)) continue;
		let e = /^(\d+)x(\d+):p(\d+)$/.exec(t.slice(s.length));
		if (!e) continue;
		let l = Number(e[1]), u = Number(e[2]);
		if (Number(e[3]) !== o || l < (i ?? 0) || u < (a ?? 0)) continue;
		let d = Number(n.bitmap?.width), f = Number(n.bitmap?.height), p = Number.isFinite(d) && d > 0 && Number.isFinite(f) && f > 0, m = r ? S(r, l, u) ?? r : void 0, h = p ? d * f : m ? m.width * m.height : l * u;
		(!c || h < c.pixels) && (c = {
			key: t.slice($.length),
			pixels: h
		});
	}
	return c?.key;
}
function Un(e, t = {}) {
	let n = Z(t), r = e.inspection.dimensions;
	if (!r) return !1;
	let i = r.width * r.height;
	if (t.maxRetainedPixels !== void 0 && !Lt(r) && i <= n) return !1;
	let a = X(t.targetWidthPx), o = X(t.targetHeightPx);
	return (e.inspection.format === "tiff" ? (a !== void 0 || o !== void 0) && (a === void 0 || a < r.width) && (o === void 0 || o < r.height) : a !== void 0 && o !== void 0 && (a < r.width || o < r.height)) || Lt(r) || i > n;
}
async function Wn(e, t, n, r = {}, i, a) {
	i && yn(n, i);
	let o = Pn(r), s = i?.ownerGeneration ?? q(n), c = await Sn(n, e, t, n);
	i ? yn(n, i) : _n(n, s);
	let l = Ln(c);
	if (a) return l ? Bn(e, o, {
		width: Number(a.width),
		height: Number(a.height)
	}) : Q(e, {
		targetWidthPx: Number(a.width),
		targetHeightPx: Number(a.height),
		maxRetainedPixels: o.maxRetainedPixels
	});
	if (l) return Vn(n, e, o) ?? Bn(e, o);
	if (!o.targetWidthPx && !o.targetHeightPx) return Q(e);
	let u = `${$}${Q(e)}`;
	return !Fn(o) && K.get(n)?.entries.has(u) ? Q(e) : Un(c, o) ? Hn(n, e, o, c.inspection.dimensions) ?? Q(e, o) : Q(e);
}
function Gn(e, t, n) {
	let r = wn(t), i = r.entries, a = i.get(e);
	if (a) return i.delete(e), i.set(e, a), a.promise.then((e) => (jn(t, e), e));
	let o = on(t, n), s = o.then(({ bitmap: e, owned: t }) => t ? e : null).catch(() => null), c = o.then(({ bitmap: e, owned: n }) => {
		try {
			return jn(t, e), e;
		} catch (t) {
			throw n && Dn(e), t;
		}
	}), l = {
		promise: c,
		ownedPromise: s,
		weight: 0
	};
	for (o.then(({ bitmap: n, owned: a }) => {
		if (i.get(e) === l) {
			if (l.bitmap = n, !a) {
				i.delete(e);
				return;
			}
			for (l.weight = An(n), r.retainedBytes += l.weight; r.retainedBytes > r.retainedLimit && Mn(t, r, e););
		}
	}).catch(() => {}), c.catch(() => {
		i.get(e) === l && (i.delete(e), r.retainedBytes -= l.weight, Nn(t, s));
	}), i.set(e, l); i.size > fn && Mn(t, r, e););
	return c;
}
var Kn = "base", $ = `${Kn}:`, qn = "derived:";
function Jn(e, t, n, r) {
	return Gn(`${e}:${t}`, n, r);
}
function Yn(e, t, n, r, i) {
	return i && bn(n, e, i), Jn(`${qn}${e}`, t, n, r);
}
function Xn(e, t, n, r = {}, i = n) {
	let a = Pn(r), { widthPt: o = 0, heightPt: s = 0, suppressBoundaryFrame: c = !1, tiff: l, targetWidthPx: u, targetHeightPx: d, maxRetainedPixels: f, svgDecoder: p, incompleteMetafile: m } = a;
	if (t === "image/svg+xml" && p) return Jn(Kn, Q(e, a), i, async () => ({
		bitmap: await p(await n(e, t), {
			targetWidthPx: u,
			targetHeightPx: d
		}),
		owned: !0
	}));
	let h = (r, p, h = !0) => {
		let g = p?.initialBlob;
		return p && (p.initialBlob = void 0), Jn(Kn, r, i, async () => {
			let r = g ?? await n(e, t), i = {
				widthPt: o,
				heightPt: s,
				suppressBoundaryFrame: c,
				tiff: l,
				targetWidthPx: h ? u : void 0,
				targetHeightPx: h ? d : void 0,
				maxRetainedPixels: f,
				incompleteMetafile: m
			};
			return {
				bitmap: p ? await nn(r, i, p.inspection) : await tn(r, i),
				owned: !0
			};
		}).then((e) => In(e, a));
	}, g = q(i);
	return Sn(i, e, t, n).then((t) => {
		if (_n(i, g), Ln(t)) return h(Vn(i, e, a) ?? Bn(e, a), t);
		if (!u && !d) return h(Q(e), t, !1);
		let n = `${$}${Q(e)}`;
		if (!Fn(a) && K.get(i)?.entries.has(n)) return h(Q(e), t, !1);
		let r = Un(t, a);
		return h(r ? Hn(i, e, a, t.inspection.dimensions) ?? Q(e, a) : Q(e), t, r);
	});
}
function Zn(e, t) {
	return K.get(t)?.entries.get(`${$}${Q(e)}`)?.bitmap;
}
function Qn(e) {
	if (!dn(e)) return;
	mn.set(e, q(e) + 1), hn.delete(e), pn.delete(e);
	let t = K.get(e);
	if (t) {
		for (let n of t.entries.values()) Nn(e, n.ownedPromise);
		t.entries.clear(), t.retainedBytes = 0, K.delete(e);
	}
}
//#endregion
//#region packages/core/src/image/svg-image-by-path.ts
var $n = /* @__PURE__ */ new WeakMap(), er = 256;
function tr(e) {
	let t = $n.get(e);
	return t || (t = { imgs: /* @__PURE__ */ new Map() }, $n.set(e, t)), t;
}
function nr(e, t, n = {}) {
	if (typeof Image > "u") return Xn(e, "image/svg+xml", t, {
		targetWidthPx: n.targetWidthPx,
		targetHeightPx: n.targetHeightPx,
		maxRetainedPixels: n.maxRetainedPixels,
		svgDecoder: n.workerDecoder
	}).then((t) => {
		if (!t) throw Error(`svg decode failed: ${e}`);
		return t;
	});
	let r = tr(t), i = r.imgs.get(e);
	if (i) return r.imgs.delete(e), r.imgs.set(e, i), i.promise;
	let a = {};
	if (a.promise = on(t, async () => {
		if (r.imgs.get(e) !== a) throw Error("SVG decode was superseded before it started");
		let n = await t(e, "image/svg+xml"), i = URL.createObjectURL(n);
		try {
			let t = new Image();
			return await new Promise((n, r) => {
				t.onload = () => {
					typeof t.decode == "function" ? t.decode().then(n).catch(n) : n();
				}, t.onerror = () => r(/* @__PURE__ */ Error(`svg load failed: ${e}`)), t.src = i;
			}), t;
		} finally {
			URL.revokeObjectURL(i);
		}
	}), a.promise.catch(() => {
		r.imgs.get(e) === a && r.imgs.delete(e);
	}), r.imgs.set(e, a), r.imgs.size > er) {
		let e = r.imgs.keys().next().value;
		r.imgs.delete(e);
	}
	return a.promise;
}
function rr(e) {
	let t = $n.get(e);
	t && (t.imgs.clear(), $n.delete(e));
}
//#endregion
//#region packages/core/src/image/duotone.ts
function ir(e) {
	return /^[0-9a-fA-F]{6}$/.test(e) ? [
		parseInt(e.slice(0, 2), 16),
		parseInt(e.slice(2, 4), 16),
		parseInt(e.slice(4, 6), 16)
	] : null;
}
function ar(e, t, n) {
	return (.299 * e + .587 * t + .114 * n) / 255;
}
function or(e, t, n) {
	let r = ir(t), i = ir(n);
	if (!r || !i) return e;
	let [a, o, s] = r, [c, l, u] = i, d = e.data;
	for (let e = 0; e < d.length; e += 4) {
		if (d[e + 3] === 0) continue;
		let t = ar(d[e], d[e + 1], d[e + 2]);
		d[e] = Math.round(a + (c - a) * t), d[e + 1] = Math.round(o + (l - o) * t), d[e + 2] = Math.round(s + (u - s) * t);
	}
	return e;
}
var sr = (e, t) => typeof OffscreenCanvas > "u" ? null : new OffscreenCanvas(e, t);
async function cr(e, t, n) {
	return lr(e, (e) => {
		or(e, t.clr1, t.clr2);
	}, n);
}
async function lr(e, t, n) {
	let { width: r, height: i } = n;
	if (r <= 0 || i <= 0 || typeof createImageBitmap > "u") return e;
	let a = (n.offscreenFactory ?? sr)(r, i);
	if (!a) return e;
	let o = a.getContext("2d");
	if (!o) return e;
	o.drawImage(e, 0, 0);
	let s;
	try {
		s = o.getImageData(0, 0, r, i);
	} catch {
		return e;
	}
	t(s), o.putImageData(s, 0, 0);
	let c = C(r, i, n.targetWidthPx, n.targetHeightPx);
	return c ? createImageBitmap(a, c) : createImageBitmap(a);
}
//#endregion
//#region packages/core/src/image/blip-gate.ts
function ur(e) {
	return e.svgImagePath != null && e.srcRect == null;
}
//#endregion
export { Dt as C, Bt as S, Tn as _, ir as a, Yt as b, nr as c, Xn as d, Yn as f, Wn as g, On as h, or as i, vn as l, Zn as m, cr as n, ar as o, Cn as p, lr as r, rr as s, ur as t, Qn as u, sn as v, zt as x, un as y };
