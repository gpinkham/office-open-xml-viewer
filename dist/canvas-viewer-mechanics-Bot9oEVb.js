//#region packages/core/src/autoResize.ts
function e(e, t, n = {}) {
	let r = n.pauseWhenHidden ?? !0, i = null, a = 0, o = 0, s = null, c = !1, l = !1, u = () => {
		if (!l && !(r && typeof document < "u" && document.hidden)) {
			if (s) {
				c = !0;
				return;
			}
			i === null && (i = requestAnimationFrame(d));
		}
	}, d = async () => {
		if (i = null, l) return;
		let t = a, n = o;
		try {
			let r = e(t, n);
			s = r instanceof Promise ? r : Promise.resolve(), await s;
		} catch (e) {
			console.error("[autoResize] render failed:", e);
		} finally {
			s = null, c && !l && (c = !1, u());
		}
	}, f = new ResizeObserver((e) => {
		for (let t of e) {
			let e = t.contentRect;
			a = e.width, o = e.height;
		}
		u();
	});
	f.observe(t);
	let p = () => {
		typeof document < "u" && !document.hidden && u();
	};
	return r && typeof document < "u" && document.addEventListener("visibilitychange", p), () => {
		l = !0, f.disconnect(), i !== null && (cancelAnimationFrame(i), i = null), r && typeof document < "u" && document.removeEventListener("visibilitychange", p);
	};
}
//#endregion
//#region packages/core/src/interaction/zoom.ts
var t = 1.1, n = 10, r = 3, i = 1;
function a(e, t) {
	let a;
	switch (t) {
		case 1:
			a = e / r;
			break;
		case 2:
			a = e / i;
			break;
		default:
			a = e / n;
			break;
	}
	return Math.max(-1, Math.min(1, a));
}
function o(e, n, r = 0) {
	return e * t ** +-a(n, r);
}
function s(e, t, n, r, i) {
	let a = n > 0 ? r / n : 1, o = (e + t) * a - t, s = i.maxScroll > 0 ? i.maxScroll : 0;
	return o < 0 ? 0 : o > s ? s : o;
}
//#endregion
//#region packages/core/src/interaction/zoomable.ts
var c = Object.freeze([
	.25,
	.33,
	.5,
	.67,
	.75,
	.9,
	1,
	1.1,
	1.25,
	1.5,
	1.75,
	2,
	2.5,
	3,
	4
]), l = .005;
function u(e) {
	for (let t of c) if (t > e + l) return t;
	return c[c.length - 1];
}
function d(e, t = c[0]) {
	for (let t = c.length - 1; t >= 0; t--) {
		let n = c[t];
		if (n < e - l) return n;
	}
	return Math.min(t, c[0]);
}
function f(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function p(e, t) {
	let { contentWidth: n, contentHeight: r, containerWidth: i, containerHeight: a } = e;
	if (n <= 0 || i <= 0) return 0;
	let o = i / n;
	if (t === "width") return o;
	if (r <= 0 || a <= 0) return 0;
	let s = a / r;
	return Math.min(o, s);
}
//#endregion
//#region packages/core/src/search/text-index.ts
function m(e) {
	let t = typeof e == "string" ? [e] : e, n = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = typeof e == "string" ? { text: e } : e;
		t.text.length === 0 || n.has(t.text) || n.set(t.text, h({ text: t.text }, t.color));
	}
	return [...n.values()];
}
function h(e, t) {
	return t === void 0 ? e : {
		...e,
		color: t
	};
}
var g = /[\p{L}\p{M}\p{N}_]/u;
function _(e) {
	return e !== void 0 && g.test(String.fromCodePoint(e));
}
function v(e, t) {
	if (t <= 0) return;
	let n = e.charCodeAt(t - 1);
	if (n >= 56320 && n <= 57343 && t >= 2) {
		let n = e.charCodeAt(t - 2);
		if (n >= 55296 && n <= 56319) return e.codePointAt(t - 2);
	}
	return n;
}
function y(e, t, n) {
	let r = _(v(e, t)) && _(e.codePointAt(t)), i = _(e.codePointAt(n)) && _(v(e, n));
	return !r && !i;
}
function b(e, t) {
	let n = new Uint8Array(t), r = [...e].sort((e, t) => t[1] - t[0] - (e[1] - e[0]) || e[0] - t[0]), i = [];
	for (let e of r) {
		let t = !0;
		for (let r = e[0]; r < e[1]; r++) if (n[r]) {
			t = !1;
			break;
		}
		t && (n.fill(1, e[0], e[1]), i.push(e));
	}
	return i.sort((e, t) => e[0] - t[0]);
}
function x(e) {
	let t = e.toLowerCase();
	if (t.length === e.length) return t;
	let n = "";
	for (let t of e) {
		let e = t.toLowerCase();
		n += e.length === t.length ? e : t;
	}
	return n;
}
function S(e) {
	let t = Array(e.length), n = 0, r = "";
	for (let i = 0; i < e.length; i++) t[i] = n, r += e[i].text, n += e[i].text.length;
	return {
		text: r,
		folded: x(r),
		runStart: t,
		runCount: e.length
	};
}
function C(e, t) {
	let { runStart: n } = e, r = 0, i = n.length - 1;
	for (; r < i;) {
		let e = r + i + 1 >> 1;
		n[e] <= t ? r = e : i = e - 1;
	}
	return r;
}
function w(e, t, n) {
	let { runStart: r, runCount: i, text: a } = e, o = [], s = C(e, t), c = t;
	for (; c < n && s < i;) {
		let e = s + 1 < i ? r[s + 1] : a.length, t = Math.min(n, e), l = c - r[s], u = t - r[s];
		u > l && o.push({
			runIndex: s,
			start: l,
			end: u
		}), c = t, s++;
	}
	return o;
}
function T(e, t, n = {}) {
	let r = m(t);
	if (r.length === 0) return [];
	let i = n.caseSensitive ?? !1, a = n.wholeWord ?? !1, o = i ? e.text : e.folded, s = [];
	for (let t = 0; t < r.length; t++) {
		let n = r[t].text, c = i ? n : x(n), l = 0;
		for (;;) {
			let n = o.indexOf(c, l);
			if (n === -1) break;
			let r = n + c.length;
			if (a && !y(e.text, n, r)) {
				l = n + 1;
				continue;
			}
			s.push([
				n,
				r,
				t
			]), l = r;
		}
	}
	return (r.length === 1 ? s : b(s, o.length)).map(([t, n, i], a) => h({
		matchIndex: a,
		slices: w(e, t, n)
	}, r[i].color));
}
//#endregion
//#region packages/core/src/search/find-cursor.ts
function E(e, t) {
	return t <= 0 ? -1 : e < 0 ? 0 : (e + 1) % t;
}
function D(e, t) {
	return t <= 0 ? -1 : e < 0 ? t - 1 : (e - 1 + t) % t;
}
//#endregion
//#region packages/core/src/internal/canvas-viewer-mechanics.ts
var O = 65536, k = 1024;
function A(e, t, n) {
	let r = e ?? t;
	if (!Number.isFinite(r) || r < 0) throw RangeError(`${n} must be a finite non-negative number.`);
	return Math.min(t, Math.floor(r));
}
function j(e, t) {
	let n = Math.min(e.length, t);
	if (n > 0 && n < e.length) {
		let t = e.charCodeAt(n - 1), r = e.charCodeAt(n);
		t >= 55296 && t <= 56319 && r >= 56320 && r <= 57343 && n--;
	}
	return e.slice(0, n);
}
function* M(e) {
	let t = e.firstChild ?? e.childNodes[0] ?? null;
	for (; t;) {
		if (t.nodeType === 3 && (yield t), t.firstChild) {
			t = t.firstChild;
			continue;
		}
		for (; t && t !== e && !t.nextSibling;) t = t.parentNode;
		if (!t || t === e) break;
		t = t.nextSibling;
	}
}
function N(e, t, n, r, i) {
	for (let a of r) {
		let r = !1;
		try {
			r = a.intersectsNode(n);
		} catch {}
		if (r) for (let r of M(n)) {
			let n = r.data, o, s;
			if (a.startContainer === r) o = a.startOffset;
			else try {
				o = a.comparePoint(r, 0) === 0 ? 0 : null;
			} catch {
				o = null;
			}
			if (a.endContainer === r) s = a.endOffset;
			else try {
				s = a.comparePoint(r, n.length) === 0 ? n.length : null;
			} catch {
				s = null;
			}
			if (o === null || s === null || s <= o) continue;
			let c = i - t;
			if (c <= 0) return t;
			let l = n.slice(Math.max(0, o), Math.min(n.length, s, Math.max(0, o) + c));
			if (e.push(l), t += l.length, t >= i) return t;
		}
	}
	return t;
}
function P(e, t, n, r = {}) {
	if (!t || t.isCollapsed || t.rangeCount === 0) return null;
	let i = [...e.matches?.("[data-ooxml-selection-surface]") ? [e] : [], ...e.querySelectorAll("[data-ooxml-selection-surface]")];
	if (i.length === 0) return null;
	let a = (e) => i.some((t) => t.contains(e)), o = [];
	for (let n = 0; n < t.rangeCount; n++) {
		let r = t.getRangeAt(n);
		if (!e.contains(r.startContainer) || !e.contains(r.endContainer) || !a(r.startContainer) || !a(r.endContainer)) return null;
		o.push(r);
	}
	let s = A(r.maxChars, O, "maxTextCharacters"), c = A(r.maxLocators, k, "maxRunLocators"), l = [], u = !1, d = s + 2, f = [], p = 0;
	for (let t of e.querySelectorAll("[data-ooxml-selection-run]")) {
		if (!o.some((e) => {
			try {
				return e.intersectsNode(t);
			} catch {
				return !1;
			}
		})) continue;
		let e = n(t);
		if (e !== null && (l.length >= c ? u = !0 : l.push(structuredClone(e)), p < d && (p = N(f, p, t, o, d)), u && p >= d)) break;
	}
	if (l.length === 0 && !u) return null;
	let m = f.join("");
	if (m.length === 0) return null;
	let h = j(m, s), g = m.length > s;
	return {
		text: h,
		locators: l,
		truncated: g || u,
		truncationReasons: [...g ? ["text"] : [], ...u ? ["runs"] : []],
		textCharacters: h.length,
		maxTextCharacters: s,
		maxLocators: c
	};
}
var F = class {
	wrapper;
	originalParent;
	originalNextSibling;
	originalDisplay;
	originalStyle;
	originalWidth;
	originalHeight;
	restored = !1;
	constructor(e, t) {
		this.canvas = e, this.options = t, this.originalParent = e.parentNode, this.originalNextSibling = e.nextSibling, this.originalDisplay = e.style.display, this.originalStyle = t.restoreMode === "style-and-bitmap" ? e.getAttribute("style") : null, this.originalWidth = e.width, this.originalHeight = e.height, this.wrapper = (e.ownerDocument ?? document).createElement("div"), this.wrapper.style.cssText = t.wrapperCssText, t.forceDisplayBlock && !e.style.display && (e.style.display = "block"), this.originalParent && this.originalParent.insertBefore(this.wrapper, e), this.wrapper.appendChild(e);
	}
	restore() {
		if (!this.restored) {
			if (this.restored = !0, this.originalParent) {
				let e = this.originalNextSibling?.parentNode === this.originalParent ? this.originalNextSibling : null;
				this.originalParent.insertBefore(this.canvas, e);
			} else this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
			(this.options.restoreMode ?? "display") === "style-and-bitmap" ? (this.originalStyle === null ? this.canvas.removeAttribute("style") : this.canvas.setAttribute("style", this.originalStyle), this.canvas.width = this.originalWidth, this.canvas.height = this.originalHeight) : this.canvas.style.display = this.originalDisplay, this.wrapper.remove();
		}
	}
}, I = "position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;pointer-events:none;user-select:text;-webkit-user-select:text;", L = "position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;pointer-events:none;", R = "position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;pointer-events:none;";
function z(e, t) {
	if (!t) return null;
	let n = (e.ownerDocument ?? document).createElement("div");
	return n.setAttribute("data-overlay", "element"), n.style.cssText = R, e.appendChild(n), n;
}
function B(e, t) {
	if (!e || (e.innerHTML = "", !t || !Number.isFinite(t.x) || !Number.isFinite(t.y) || !Number.isFinite(t.width) || !Number.isFinite(t.height) || t.width <= 0 || t.height <= 0)) return;
	let n = (e.ownerDocument ?? document).createElement("div"), r = Number.isFinite(t.rotation) ? t.rotation ?? 0 : 0;
	n.style.cssText = `position:absolute;left:${t.x * 100}%;top:${t.y * 100}%;width:${t.width * 100}%;height:${t.height * 100}%;box-sizing:border-box;border:2px solid #1a73e8;background:color-mix(in srgb, #1a73e8 6%, transparent);transform:rotate(${r}deg);transform-origin:center;pointer-events:none;`, e.appendChild(n);
}
var V = class {
	textLayer;
	highlightLayer;
	elementLayer;
	constructor(e, t, n = !1) {
		let r = e.ownerDocument ?? document;
		this.textLayer = t ? r.createElement("div") : null, this.textLayer && (this.textLayer.setAttribute("data-overlay", "text"), this.textLayer.style.cssText = I, e.appendChild(this.textLayer)), this.highlightLayer = r.createElement("div"), this.highlightLayer.setAttribute("data-overlay", "highlight"), this.highlightLayer.style.cssText = L, e.appendChild(this.highlightLayer), this.elementLayer = z(e, n);
	}
}, H = class {
	layer;
	status;
	constructor(e, t) {
		this.message = t;
		let n = e.ownerDocument ?? document;
		this.layer = n.createElement("div"), this.layer.style.cssText = "position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:rgba(255,255,255,0.72);pointer-events:none;z-index:4;", this.layer.setAttribute("aria-hidden", "true"), e.appendChild(this.layer), this.status = n.createElement("div"), this.status.setAttribute("role", "status"), this.status.setAttribute("aria-live", "polite"), this.status.setAttribute("aria-atomic", "true"), this.status.style.cssText = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;pointer-events:none;user-select:none;-webkit-user-select:none;", e.appendChild(this.status);
	}
	setLoading(e) {
		this.layer.style.display = e ? "flex" : "none";
		let t = e ? this.message : "";
		this.status.textContent !== t && (this.status.textContent = t);
	}
};
function U(e, t, n) {
	if (n && t !== void 0 && t !== n.mode) throw Error(`${e}: opts.mode='${t}' conflicts with the borrowed engine's mode='${n.mode}'. Omit opts.mode when borrowing an engine — the engine owns its render mode.`);
	return n?.mode ?? t ?? "main";
}
var W = class {
	generation = 0;
	resource;
	ownsResource;
	closed = !1;
	constructor(e, t = null, n = !1) {
		this.ownerName = e, this.resource = t, this.ownsResource = t !== null && n;
	}
	get current() {
		return this.resource;
	}
	async replace(e, t) {
		this.assertOpen();
		let n = ++this.generation, r;
		try {
			r = await e();
		} catch (e) {
			if (this.closed) throw this.closedError();
			if (n !== this.generation) return null;
			throw e;
		}
		if (this.closed) throw this.dispose(r), this.closedError();
		if (n !== this.generation) return this.dispose(r), null;
		try {
			t?.(this.resource);
		} catch (e) {
			throw this.dispose(r), e;
		}
		return this.install(r, !0), r;
	}
	install(e, t = !0) {
		this.assertOpen(), this.generation++;
		let n = this.resource, r = this.ownsResource;
		this.resource = e, this.ownsResource = t, r && n && this.dispose(n);
	}
	close() {
		if (this.closed) return;
		this.closed = !0, this.generation++;
		let e = this.resource, t = this.ownsResource;
		this.resource = null, this.ownsResource = !1, t && e && this.dispose(e);
	}
	assertOpen() {
		if (this.closed) throw this.closedError();
	}
	closedError() {
		return /* @__PURE__ */ Error(`${this.ownerName} is closed`);
	}
	dispose(e) {
		try {
			e.destroy();
		} catch {}
	}
}, G = class {
	generation = 0;
	destroyed = !1;
	bitmapContext;
	constructor(e, t) {
		this.canvas = e, this.bitmapContext = t ? e.getContext("bitmaprenderer") : null;
	}
	begin() {
		return ++this.generation;
	}
	isCurrent(e) {
		return !this.destroyed && e === this.generation;
	}
	commitBitmap(e, t, n = {}) {
		if (!this.isCurrent(e)) return t.close(), !1;
		if (!this.bitmapContext) throw t.close(), Error("bitmaprenderer context not available");
		this.canvas.width !== t.width && (this.canvas.width = t.width), this.canvas.height !== t.height && (this.canvas.height = t.height), n.cssWidth !== void 0 && (this.canvas.style.width = `${n.cssWidth}px`), n.cssHeight !== void 0 && (this.canvas.style.height = `${n.cssHeight}px`);
		try {
			this.bitmapContext.transferFromImageBitmap(t);
		} catch (e) {
			throw t.close(), e;
		}
		return !0;
	}
	commitBitmapTo2d(e, t, n = {}) {
		if (!this.isCurrent(e)) return t.close(), !1;
		this.canvas.width !== t.width && (this.canvas.width = t.width), this.canvas.height !== t.height && (this.canvas.height = t.height), n.cssWidth !== void 0 && (this.canvas.style.width = `${n.cssWidth}px`), n.cssHeight !== void 0 && (this.canvas.style.height = `${n.cssHeight}px`);
		let r = this.canvas.getContext("2d");
		if (!r) throw t.close(), Error("2D context not available");
		try {
			r.drawImage(t, 0, 0);
		} finally {
			t.close();
		}
		return !0;
	}
	destroy() {
		this.destroyed || (this.destroyed = !0, this.generation++);
	}
}, K = class {
	closed = !1;
	handled = /* @__PURE__ */ new WeakSet();
	backgroundLifecycleOwners = 0;
	constructor(e, t) {
		this.viewerName = e, this.onError = t;
	}
	report(e) {
		if (this.closed) return;
		let t = e instanceof Error ? e : Error(String(e));
		this.handled.has(t) || (this.handled.add(t), this.onError ? this.onError(t) : console.error(`[ooxml] ${this.viewerName} render failed:`, t));
	}
	markHandled(e) {
		this.closed || !(e instanceof Error) || this.handled.add(e);
	}
	async ownAwaitable(e) {
		try {
			return await e();
		} catch (e) {
			throw this.markHandled(e), e;
		}
	}
	async ownBackgroundLifecycle(e) {
		this.backgroundLifecycleOwners++;
		try {
			return await this.ownAwaitable(e);
		} finally {
			this.backgroundLifecycleOwners--;
		}
	}
	reportBackground(e, t = !1) {
		let n = e instanceof Error ? e : Error(String(e));
		if (t || this.backgroundLifecycleOwners > 0) {
			this.markHandled(n);
			return;
		}
		this.report(n);
	}
	close() {
		this.closed = !0;
	}
};
//#endregion
export { e as C, o as S, f as _, G as a, d as b, P as c, E as d, D as f, h as g, m as h, K as i, B as l, T as m, H as n, W as o, S as p, V as r, z as s, F as t, U as u, p as v, s as x, u as y };
