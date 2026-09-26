import { t as e } from "./chunk-DmhlhrBa.js";
import { n as t } from "./cjk-fallback-D--USve7.js";
//#region packages/node/src/render.ts
var n = /* @__PURE__ */ e({
	installImageBitmapShim: () => a,
	installOffscreenCanvasShim: () => i,
	renderSlideNode: () => s,
	withNodeCanvasRuntime: () => o
}), r = Promise.resolve();
function i(e) {
	let t = globalThis, n = t.OffscreenCanvas, r = Object.prototype.hasOwnProperty.call(globalThis, "OffscreenCanvas");
	if (n !== void 0) return () => {};
	class i {
		constructor(t, n) {
			return e.createCanvas(t, n);
		}
	}
	return t.OffscreenCanvas = i, () => {
		r ? t.OffscreenCanvas = n : delete t.OffscreenCanvas;
	};
}
function a(e) {
	let t = globalThis, n = t.createImageBitmap;
	return t.createImageBitmap = async (t, n) => {
		if (t && typeof t.getContext == "function") return t;
		let r;
		if (t instanceof Uint8Array || t instanceof ArrayBuffer) r = t;
		else if (typeof t.arrayBuffer == "function") r = await t.arrayBuffer();
		else throw Error("createImageBitmap shim: unsupported source type");
		let i = n?.resizeWidth, a = n?.resizeHeight, o = typeof i == "number" && i > 0 ? { width: i } : typeof a == "number" && a > 0 ? { height: a } : void 0, s = await e.loadImage(r, o);
		if (!o || o.width !== void 0 && s.width === o.width || o.height !== void 0 && s.height === o.height) return s;
		let c = o.width === void 0 ? typeof o.height == "number" ? o.height / s.height : 1 : o.width / s.width, l = Math.max(1, Math.round(s.width * c)), u = Math.max(1, Math.round(s.height * c)), d = e.createCanvas(l, u), f = d.getContext("2d");
		return typeof f.drawImage == "function" ? (f.drawImage(s, 0, 0, l, u), s.close?.(), d) : s;
	}, () => {
		t.createImageBitmap = n;
	};
}
function o(e, t) {
	let n = async () => {
		let n = typeof globalThis.createImageBitmap == "function" ? () => void 0 : a(e), r = i(e);
		try {
			return await t();
		} finally {
			r(), n();
		}
	}, o = r.then(n, n);
	return r = o.then(() => void 0, () => void 0), o;
}
async function s(e, n, r, i = {}) {
	let a = t(i.cjkFallback), { renderSlide: s } = await import("./session-gj5cntj4.js").then((e) => e.t), c = n.slides[r];
	if (!c) throw Error(`Slide index ${r} out of range`);
	let l = i.width ?? 960, u = i.dpr ?? 2, d = i.fetchImage ?? (async () => new Blob([])), f = async () => {
		await s(e, c, n.slideWidth, n.slideHeight, {
			width: l,
			dpr: u,
			cjkFallback: a,
			defaultTextColor: n.defaultTextColor,
			majorFont: n.majorFont,
			minorFont: n.minorFont,
			hlinkColor: n.hlinkColor ?? null,
			fetchMedia: i.fetchMedia ?? (async () => new Blob([])),
			fetchImage: d,
			skipMediaControls: !0
		});
	};
	await (i.factory ? o(i.factory, f) : f());
}
//#endregion
export { o as a, n as i, i as n, s as r, a as t };
