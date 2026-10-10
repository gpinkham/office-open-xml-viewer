import { or as e } from "./plot-area-frame-DvwuejI0.js";
import { a as t, i as n, r, u as i } from "./pixel-budget-QcsXr21f.js";
import { a, b as o, d as s, f as c, g as l, i as u, l as d, n as f, r as p } from "./blip-gate-CVWM87j6.js";
import { r as m } from "./raster-target-DAN1p0JY.js";
//#region packages/core/src/image/blip-effects.ts
function h(e) {
	return typeof e == "object" && !!e && Array.isArray(e.effects);
}
function g(e) {
	let t = e.effects.map((t) => {
		switch (t.type) {
			case "grayscale": return "g";
			case "biLevel": return `b${t.thresh}`;
			case "colorChange": return `c${t.from}.${t.fromAlpha}>${t.to}.${t.toAlpha}${t.useAlpha ? "a" : ""}`;
			case "luminance": return `l${t.bright}.${t.contrast}`;
			case "duotone": return e.duotone ? `d${e.duotone.clr1}.${e.duotone.clr2}` : "d";
		}
	});
	return e.duotone && !e.effects.some((e) => e.type === "duotone") && t.push(`d${e.duotone.clr1}.${e.duotone.clr2}`), t.join(",");
}
function _(e, t, n) {
	return (.2126 * e + .7152 * t + .0722 * n) / 255;
}
function v(e, t, n) {
	return Math.floor(_(e, t, n) * 255 + 1e-6);
}
function y(e) {
	let t = e.duotone && !e.effects.some((e) => e.type === "duotone");
	return e.effects.length + +!!t;
}
function b(e, r) {
	let a = y(e);
	if (a > n) throw new i("image-effect-count", n, a);
	let o = a * Math.max(0, Math.ceil(r));
	if (!Number.isSafeInteger(o) || o > 134217728) throw new i("image-effect-work", t, Number.isSafeInteger(o) ? o : 2 ** 53 - 1);
}
function x(e, t) {
	let n = e.data;
	b(t, n.length / 4);
	let r = !1;
	for (let i of t.effects) switch (i.type) {
		case "grayscale":
			for (let e = 0; e < n.length; e += 4) {
				let t = v(n[e], n[e + 1], n[e + 2]);
				n[e] = t, n[e + 1] = t, n[e + 2] = t;
			}
			break;
		case "biLevel":
			for (let e = 0; e < n.length; e += 4) {
				let t = _(n[e], n[e + 1], n[e + 2]) >= i.thresh ? 255 : 0;
				n[e] = t, n[e + 1] = t, n[e + 2] = t;
			}
			break;
		case "colorChange": {
			let e = a(i.from), t = a(i.to);
			if (!e || !t) break;
			let r = Math.round(i.fromAlpha * 255), o = Math.round(i.toAlpha * 255);
			for (let a = 0; a < n.length; a += 4) n[a] !== e[0] || n[a + 1] !== e[1] || n[a + 2] !== e[2] || i.useAlpha && n[a + 3] !== r || (n[a] = t[0], n[a + 1] = t[1], n[a + 2] = t[2], n[a + 3] = o);
			break;
		}
		case "luminance": {
			let e = S(i.bright, i.contrast);
			for (let t = 0; t < n.length; t += 4) n[t] = e[n[t]], n[t + 1] = e[n[t + 1]], n[t + 2] = e[n[t + 2]];
			break;
		}
		case "duotone":
			t.duotone && u(e, t.duotone.clr1, t.duotone.clr2), r = !0;
			break;
	}
	return !r && t.duotone && u(e, t.duotone.clr1, t.duotone.clr2), e;
}
function S(e, t) {
	let n = new Uint8ClampedArray(256), r = Math.max(-1, Math.min(1, e)), i = Math.max(-1, Math.min(1, t));
	for (let e = 0; e < 256; e++) {
		let t = e / 255 + r / 2 - .5, a;
		a = i >= 1 ? t > 0 ? 1 : t < 0 ? 0 : .5 + r / 2 : (i <= 0 ? 1 + i : 1 / (1 - i)) * t + .5 + r / 2, n[e] = Math.round(Math.max(0, Math.min(1, a)) * 255);
	}
	return n;
}
//#endregion
//#region packages/core/src/image/duotone-bitmap-by-path.ts
function C(e, t) {
	return h(t) ? `${e}|fx:${g(t)}` : t ? `${e}|duo:${t.clr1}:${t.clr2}` : e;
}
var w = "duotone";
async function T(t, n, i, a, u = {}) {
	let { offscreenFactory: g, failClosedOnDuotoneFailure: _ = !1, ...v } = u, y = i ? {
		...v,
		maxRetainedPixels: Math.min(v.maxRetainedPixels ?? 33554432, r)
	} : v, S = i ? {
		...y,
		targetWidthPx: void 0,
		targetHeightPx: void 0
	} : y;
	h(i) && b(i, 0);
	let T = i ? d(a, w) : void 0, E = await s(t, n, a, S);
	if (!i || !E) return E;
	let D = await l(t, n, a, S, T, E), O = m(Number(E.width), Number(E.height), v.targetWidthPx, v.targetHeightPx), k = O ? `|resize:${O.resizeWidth}x${O.resizeHeight}` : "";
	return c(w, `${C(D, i)}${k}${_ ? "|strict" : ""}`, a, async () => {
		let { w: t, h: n } = e(E);
		if (t <= 0 || n <= 0) return {
			bitmap: _ ? null : E,
			owned: !1
		};
		h(i) && b(i, t * n);
		let r = {
			width: t,
			height: n,
			offscreenFactory: g,
			targetWidthPx: v.targetWidthPx,
			targetHeightPx: v.targetHeightPx
		}, a = h(i) ? await p(E, (e) => {
			x(e, i);
		}, r) : await f(E, i, r);
		if (a === E) {
			if (_) return {
				bitmap: null,
				owned: !1
			};
			if (!O) return {
				bitmap: E,
				owned: !1
			};
			if (typeof createImageBitmap > "u") throw Error("createImageBitmap is unavailable for duotone fallback resampling");
			let e = await createImageBitmap(E, O);
			return o(E, e), {
				bitmap: e,
				owned: e !== E
			};
		}
		let s = a;
		return o(E, s), {
			bitmap: s,
			owned: s !== E
		};
	}, T);
}
//#endregion
export { T as n, C as t };
