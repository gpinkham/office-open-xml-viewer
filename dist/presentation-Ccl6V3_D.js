import { a as e, n as t, o as n, t as r } from "./slide-pull-client-BLOpkth-.js";
import { S as i, a, c as o } from "./resource-policy.generated-BTdyyO9v.js";
import { n as s, t as c } from "./cfb-guard-B9x7ZJTE.js";
import { t as l } from "./preload-Dufqb9J3.js";
import { a as u, n as d, o as f, t as p } from "./progressive-layout-observers-D4O7o5cV.js";
import { C as m, S as h } from "./office-auto-line-Chy1gU-T.js";
import { n as g, r as _ } from "./office-fallback-CTP2kjRH.js";
import { n as v } from "./cjk-fallback-CtkvGQ-i.js";
import { i as y } from "./units-DIk-8W6L.js";
import { h as b, s as x, u as S } from "./blip-gate-CVWM87j6.js";
import { n as C } from "./renderer-module-contract-CNi9alZl.js";
import { i as w, n as T, r as ee } from "./chart-context-DS6myl4P.js";
import { i as te, n as ne, r as re } from "./resource-debug-Bp6LglgZ.js";
import { n as ie, r as E } from "./error-wire-rJNDxWbL.js";
import { t as ae } from "./rejected-load-CIPydT8y.js";
import "./pull-session-BzHuXyzF.js";
import { a as oe, c as se, i as D, n as ce, o as le, r as O, t as ue } from "./presentation-preflight-HAt3EOyB.js";
import { n as de, t as fe } from "./bounded-raw-part-cache-zHr9J6Ei.js";
import { n as pe } from "./resource-measurement-BEOZEHNY.js";
//#region packages/core/src/nav/internal-target.ts
function me(e, t) {
	let n = t.startsWith("/") ? [] : e.split("/").filter((e) => e !== "");
	for (let e of t.split("/")) if (e === "..") n.pop();
	else if (e === "." || e === "") continue;
	else n.push(e);
	return n.join("/");
}
function he(e) {
	let t = /[?&]jump=([a-zA-Z]+)/.exec(e);
	if (!t) return null;
	let n = t[1].toLowerCase();
	return n === "firstslide" || n === "lastslide" || n === "nextslide" || n === "previousslide" ? n : null;
}
function ge(e, t, n) {
	if (!(n <= 0)) switch (e) {
		case "firstslide": return 0;
		case "lastslide": return n - 1;
		case "nextslide": return Math.min(t + 1, n - 1);
		case "previousslide": return Math.max(t - 1, 0);
	}
}
//#endregion
//#region packages/pptx/src/font-demand-collector.ts
async function _e(e) {
	return e ? (await import("./font-preload-demand-BGxkVViT.js")).collectSlideFontDemand : void 0;
}
//#endregion
//#region packages/pptx/src/tabular-text.ts
var k = (e) => e >= "0" && e <= "9";
function ve(e) {
	let t = 0;
	for (let n = 0; n < 10; n++) t = Math.max(t, e.measureText(String(n)).width);
	return t;
}
function A(e, t, n) {
	let r = 0;
	for (let i of t) r += k(i) ? n : e.measureText(i).width;
	return r;
}
function j(e, t, n, r, i) {
	let a = e.textAlign;
	e.textAlign = "left";
	let o = n;
	for (let n of t) if (k(n)) {
		let t = e.measureText(n).width;
		e.fillText(n, o + (i - t) / 2, r), o += i;
	} else e.fillText(n, o, r), o += e.measureText(n).width;
	e.textAlign = a;
}
//#endregion
//#region packages/pptx/src/presentation-handle.ts
var M = (e, t) => e / y * t;
async function ye(e, t, r) {
	let i = e.getContext("2d");
	if (!i) throw Error("2D context not available");
	let a = r.width / (r.slideWidthEmu / y);
	await r.drawBase();
	let o = document.createElement("canvas");
	o.width = e.width, o.height = e.height;
	let s = o.getContext("2d");
	if (!s) throw Error("base 2D context not available");
	s.drawImage(e, 0, 0);
	let c = [], l = !1, u = () => {
		for (let e of c) {
			e.detachListeners(), e.media.pause(), e.media.removeAttribute("src");
			try {
				e.media.load();
			} catch {}
			URL.revokeObjectURL(e.objectUrl);
		}
		c.length = 0;
	}, d = (e) => {
		l || (r.onError ? r.onError(e) : console.error("[ooxml] PPTX embedded media failed:", e));
	};
	for (let e of t) {
		let t;
		try {
			t = await r.fetchMedia(e.mediaPath);
		} catch (t) {
			throw u(), Se(e, t);
		}
		let n = e.mimeType || t.type, i = t.type === n ? t : new Blob([t], { type: n }), o = URL.createObjectURL(i), s = e.mediaKind === "video" ? document.createElement("video") : document.createElement("audio");
		s.src = o, s.preload = "metadata", e.mediaKind === "video" && (s.playsInline = !0);
		let f = be(e, a), p = {
			el: e,
			rect: e.mediaKind === "audio" ? {
				x: f.x + f.w / 2 - Math.max(f.w, 260) / 2,
				y: f.y,
				w: Math.max(f.w, 260),
				h: f.h + 36
			} : f,
			posterRect: f,
			media: s,
			objectUrl: o,
			loadState: "loading",
			detachListeners: () => {}
		}, m = () => {
			l || (p.loadState = "metadata");
		}, h = () => {
			l || (p.loadState = "ready");
		}, g = () => {
			l || (p.loadState = "error", d(N(e, s, "decode")));
		};
		s.addEventListener("loadedmetadata", m), s.addEventListener("canplay", h), s.addEventListener("error", g), p.detachListeners = () => {
			s.removeEventListener("loadedmetadata", m), s.removeEventListener("canplay", h), s.removeEventListener("error", g);
		}, c.push(p);
		try {
			s.load();
		} catch (t) {
			let n = N(e, s, "load", t);
			throw u(), n;
		}
	}
	let f = null, p = null, m = () => {
		i.setTransform(e.width / r.width, 0, 0, e.height / r.height, 0, 0), i.drawImage(o, 0, 0, e.width, e.height, 0, 0, r.width, r.height);
		for (let e of c) {
			let t = e.media;
			if (e.loadState !== "loading") {
				if (e.loadState === "error") {
					xe(i, e.posterRect, "Media unavailable");
					continue;
				}
				if (e.el.mediaKind === "video" && t.readyState >= 2) {
					let { x: n, y: r, w: a, h: o } = e.posterRect;
					i.drawImage(t, n, r, a, o);
				}
				if (e === p || v?.state === e) Te(i, e, t);
				else if (t.paused) {
					let { x: t, y: r, w: a, h: o } = e.posterRect;
					n(i, t + a / 2, r + o / 2, a, o, "paused");
				}
			}
		}
	}, h = () => {
		l || (m(), f = requestAnimationFrame(h));
	}, g = (t, n) => {
		let i = e.getBoundingClientRect();
		return {
			x: (t - i.left) / i.width * r.width,
			y: (n - i.top) / i.height * r.height
		};
	}, _ = (e, t) => {
		for (let n of c) {
			let { x: r, y: i, w: a, h: o } = n.rect;
			if (e < r || e > r + a || t < i || t > i + o) continue;
			let s = V(n), c = s.y - 12, l = s.y + s.h + 8;
			return (Number.isFinite(n.media.duration) ? n.media.duration : 0) > 0 && e >= s.x && e <= s.x + s.w && t >= c && t <= l ? {
				kind: "seek",
				state: n,
				fraction: Math.max(0, Math.min(1, (e - s.x) / s.w))
			} : {
				kind: "toggle",
				state: n
			};
		}
		return null;
	}, v = null, b = (e, t) => {
		let n = Number.isFinite(e.media.duration) ? e.media.duration : 0;
		n <= 0 || (e.media.currentTime = n * t);
	}, x = (e) => {
		try {
			e.media.play().catch((t) => {
				d(N(e.el, e.media, "play", t));
			});
		} catch (t) {
			d(N(e.el, e.media, "play", t));
		}
	}, S = (t) => {
		let { x: n, y: r } = g(t.clientX, t.clientY), i = _(n, r);
		i && (i.kind === "seek" ? (v = {
			state: i.state,
			wasPlaying: !i.state.media.paused
		}, i.state.media.pause(), b(i.state, i.fraction), e.setPointerCapture(t.pointerId), t.preventDefault()) : i.state.media.paused ? x(i.state) : i.state.media.pause());
	}, C = (e) => {
		let { x: t, y: n } = g(e.clientX, e.clientY);
		p = null;
		for (let e of c) {
			let { x: r, y: i, w: a, h: o } = e.rect;
			if (t >= r && t <= r + a && n >= i && n <= i + o) {
				p = e;
				break;
			}
		}
		if (v) {
			let e = V(v.state), n = Math.max(0, Math.min(1, (t - e.x) / e.w));
			b(v.state, n);
		}
	}, w = () => {
		p = null;
	}, T = (t) => {
		if (!v) return;
		let { wasPlaying: n, state: r } = v;
		v = null, e.releasePointerCapture(t.pointerId), n && x(r);
	};
	return c.length > 0 && (e.addEventListener("pointerdown", S), e.addEventListener("pointermove", C), e.addEventListener("pointerleave", w), e.addEventListener("pointerup", T), e.addEventListener("pointercancel", T), e.style.cursor = "pointer", h()), {
		play(e) {
			for (let t of c) (!e || t.el.mediaPath === e) && x(t);
		},
		pause(e) {
			for (let t of c) (!e || t.el.mediaPath === e) && t.media.pause();
		},
		destroy() {
			l || (l = !0, f !== null && cancelAnimationFrame(f), e.removeEventListener("pointerdown", S), e.removeEventListener("pointermove", C), e.removeEventListener("pointerleave", w), e.removeEventListener("pointerup", T), e.removeEventListener("pointercancel", T), e.style.cursor = "", u());
		}
	};
}
function be(e, t) {
	return {
		x: M(e.x, t),
		y: M(e.y, t),
		w: M(e.width, t),
		h: M(e.height, t)
	};
}
function xe(e, t, n) {
	let r = Math.max(10, Math.min(14, t.h * .12));
	e.save(), e.font = `500 ${r}px system-ui, -apple-system, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
	let i = r + 12, a = Math.min(t.w, Math.max(100, e.measureText(n).width + 24));
	H(e, t.x + (t.w - a) / 2, t.y + (t.h - i) / 2, a, i, i / 2), e.fillStyle = "rgba(20, 20, 20, 0.72)", e.fill(), e.fillStyle = "rgba(255, 255, 255, 0.95)", e.fillText(n, t.x + t.w / 2, t.y + t.h / 2), e.restore();
}
function Se(e, t) {
	return /* @__PURE__ */ Error(`Embedded ${e.mediaKind} fetch failed for "${e.mediaPath}" (mime=${e.mimeType || "unknown"}): ${P(t)}`);
}
function N(e, t, n, r) {
	let i = "";
	try {
		i = e.mimeType ? t.canPlayType(e.mimeType) : "";
	} catch {}
	let a = t.error, o = [
		`mime=${e.mimeType || "unknown"}`,
		`canPlayType=${i || "no"}`,
		`readyState=${t.readyState}`,
		`networkState=${t.networkState}`
	];
	a && o.push(`mediaError=${a.code}${a.message ? ` ${a.message}` : ""}`);
	let s = r === void 0 ? "" : `: ${P(r)}`;
	return /* @__PURE__ */ Error(`Embedded ${e.mediaKind} ${n} failed for "${e.mediaPath}" (${o.join("; ")})${s}`);
}
function P(e) {
	return e instanceof Error ? `${e.name || "Error"}${e.message ? `: ${e.message}` : ""}` : String(e);
}
var F = 28, I = 14, Ce = 72, we = 10, L = 3;
function Te(e, t, r) {
	let i = Number.isFinite(r.duration) ? r.duration : 0, a = i > 0 ? Math.min(1, r.currentTime / i) : 0, o = t.posterRect;
	n(e, o.x + o.w / 2, o.y + o.h / 2, o.w, o.h, r.paused ? "paused" : "playing"), t.el.mediaKind === "audio" ? De(e, t, r, i, a) : Ee(e, t, r, i, a);
}
function Ee(e, t, n, r, i) {
	let { x: a, y: o, w: s, h: c } = t.rect, l = Math.max(28, Math.min(56, c * .22)), u = o + c - l;
	e.save();
	let d = e.createLinearGradient(0, u, 0, o + c);
	d.addColorStop(0, "rgba(0, 0, 0, 0)"), d.addColorStop(1, "rgba(0, 0, 0, 0.55)"), e.fillStyle = d, e.fillRect(a, u, s, l), e.restore();
	let f = V(t);
	z(e, f, i, r > 0), e.save(), e.font = "500 11px system-ui, -apple-system, sans-serif", e.textBaseline = "middle", e.shadowColor = "rgba(0, 0, 0, 0.75)", e.shadowBlur = 3, e.fillStyle = "rgba(255, 255, 255, 0.95)", R(e, n.currentTime, r, f.x, f.y - 10, "bottom"), e.restore();
}
function De(e, t, n, r, i) {
	let a = B(t.rect);
	e.save(), H(e, a.x, a.y, a.w, a.h, a.h / 2), e.fillStyle = "rgba(20, 20, 20, 0.72)", e.fill(), e.font = "500 11px system-ui, -apple-system, sans-serif", e.textBaseline = "middle", e.fillStyle = "rgba(255, 255, 255, 0.95)", R(e, n.currentTime, r, a.x + I, a.y + a.h / 2, "middle"), e.restore(), z(e, V(t), i, r > 0);
}
function R(e, t, n, r, i, a) {
	let o = U(t), s = U(n), c = ve(e), l = A(e, o, c), u = A(e, s, c), d = e.measureText(" / ").width, f = Math.max(l, u);
	j(e, o, r + f - l, i, c);
	let p = e.textAlign;
	e.textAlign = "left", e.fillText(" / ", r + f, i), e.textAlign = p, j(e, s, r + f + d, i, c);
}
function z(e, t, n, r) {
	let i = t.h / 2;
	if (e.save(), H(e, t.x, t.y, t.w, t.h, i), e.fillStyle = "rgba(255, 255, 255, 0.35)", e.fill(), n > 0 && (H(e, t.x, t.y, t.w * n, t.h, i), e.fillStyle = "#fff", e.fill()), r) {
		let r = Math.max(t.x + 5, Math.min(t.x + t.w - 5, t.x + t.w * n));
		e.shadowColor = "rgba(0, 0, 0, 0.3)", e.shadowBlur = 3, e.fillStyle = "#fff", e.beginPath(), e.arc(r, t.y + t.h / 2, 5, 0, Math.PI * 2), e.fill();
	}
	e.restore();
}
function B(e) {
	let t = Math.max(220, e.w - 24);
	return {
		x: e.x + e.w / 2 - t / 2,
		y: e.y + e.h - F - 4,
		w: t,
		h: F
	};
}
function V(e) {
	if (e.el.mediaKind === "audio") {
		let t = B(e.rect), n = t.x + I + Ce + we, r = Math.max(40, t.x + t.w - I - n);
		return {
			x: n,
			y: t.y + (t.h - L) / 2,
			w: r,
			h: L
		};
	}
	let t = e.rect, n = Math.max(12, t.w * .025), r = Math.max(12, Math.min(18, t.h * .05));
	return {
		x: t.x + n,
		y: t.y + t.h - L - r,
		w: t.w - n * 2,
		h: L
	};
}
function H(e, t, n, r, i, a) {
	let o = Math.min(a, i / 2, r / 2);
	e.beginPath(), e.moveTo(t + o, n), e.lineTo(t + r - o, n), e.quadraticCurveTo(t + r, n, t + r, n + o), e.lineTo(t + r, n + i - o), e.quadraticCurveTo(t + r, n + i, t + r - o, n + i), e.lineTo(t + o, n + i), e.quadraticCurveTo(t, n + i, t, n + i - o), e.lineTo(t, n + o), e.quadraticCurveTo(t, n, t + o, n), e.closePath();
}
function U(e) {
	if (!Number.isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e);
	return `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, "0")}`;
}
//#endregion
//#region packages/pptx/src/slide-nav.ts
function Oe(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		r !== void 0 && r !== "" && !t.has(r) && t.set(r, n);
	}
	return t;
}
function ke(e, t) {
	if (e === "") return;
	if (e.startsWith("ppt/")) return t.get(e);
	let n = me("ppt/slides", e);
	return t.get(n);
}
function Ae(e, t, n) {
	let r = he(e);
	return r === null ? ke(e, t) : ge(r, n, t.size);
}
//#endregion
//#region packages/pptx/src/slide-repository.ts
var W = class {
	#e;
	#t;
	#n;
	#r = 0;
	#i = Promise.resolve();
	#a;
	#o;
	constructor(e) {
		if (!Number.isSafeInteger(e.slideCount) || e.slideCount < 0) throw TypeError("slideCount must be a non-negative safe integer");
		this.#e = e.slideCount, this.#t = e.loadSlide, this.#n = new de({
			maxEntries: e.maxCachedSlides,
			maxWeight: e.maxCachedStructuralBytes,
			measure: (e) => pe(e).jsonBytes
		});
	}
	get slideCount() {
		return this.#e;
	}
	get usage() {
		return this.#n.usage;
	}
	withSlide(e, t) {
		this.#c(e);
		let n = this.#r, r = this.#i.then(async () => {
			if (n !== this.#r) throw this.#a ? this.#a : Error("PPTX slide repository generation is stale");
			if (this.#a) throw this.#a;
			let r = await this.#s(e, n);
			try {
				return await t(r);
			} catch (e) {
				let t = G(e);
				throw t ? (this.#l(t, n), this.#o === n ? this.#a ?? t : t) : e;
			}
		});
		return this.#i = r.then(() => void 0, () => void 0), r;
	}
	async #s(e, t) {
		return this.#n.getOrLoad(e, async () => {
			let n;
			try {
				n = await this.#t(e);
			} catch (e) {
				let n = G(e);
				throw n ? (this.#l(n, t), this.#o === t ? this.#a ?? n : n) : e;
			}
			if (this.#o === t && this.#a) throw this.#a;
			return n;
		});
	}
	clear() {
		this.#r += 1, this.#a = void 0, this.#o = void 0, this.#n.clear();
	}
	#c(e) {
		if (!Number.isSafeInteger(e) || e < 0 || e >= this.#e) throw RangeError(`Slide index ${e} out of range (count: ${this.#e})`);
	}
	#l(e, t) {
		t !== this.#r || this.#a || (this.#a = e, this.#o = t, this.#r += 1, this.#n.clear());
	}
};
function G(e) {
	return e instanceof i ? e : E(e);
}
//#endregion
//#region packages/pptx/src/embedded-fonts.ts
function je(e, t) {
	return e.filter((e) => !t.has(`${e.family.toLowerCase()}:${e.weight}:${e.style}`));
}
var Me = 1;
function K(e) {
	return e.trim().toLowerCase();
}
async function q(e, t) {
	if (e.length === 0) return {
		faces: [],
		aliases: /* @__PURE__ */ new Map(),
		authoredFamilies: /* @__PURE__ */ new Map(),
		tuples: /* @__PURE__ */ new Set()
	};
	let n = Me++, r = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = K(t.fontName);
		r.has(e) || r.set(e, `__ooxml_pptx_${n}_${r.size + 1}`);
	}
	let i = [], a = /* @__PURE__ */ new Set();
	for (let n = 0; n < e.length; n += 2) {
		let o = (await Promise.all(e.slice(n, n + 2).map(async (e) => {
			try {
				return {
					family: r.get(K(e.fontName)),
					bytes: await t(e.partPath),
					odttf: !1,
					weight: e.style === "bold" || e.style === "boldItalic" ? "bold" : "normal",
					style: e.style === "italic" || e.style === "boldItalic" ? "italic" : "normal"
				};
			} catch {
				return null;
			}
		}))).filter((e) => e !== null);
		if (o.length !== 0) for (let e of await u(o)) a.has(e) ? f([e]) : (a.add(e), i.push(e));
	}
	let o = new Set(i.map((e) => K(e.family))), s = new Map([...r].filter(([, e]) => o.has(K(e)))), c = new Map([...s].map(([e, t]) => [t, e]));
	return {
		faces: i,
		aliases: s,
		authoredFamilies: c,
		tuples: new Set(i.map((e) => `${c.get(e.family)}:${e.weight === "bold" || e.weight === "700" ? 700 : 400}:${e.style === "italic" ? "italic" : "normal"}`))
	};
}
function J(e, t) {
	return e.filter((e) => e === null || !t.has(e.trim().toLowerCase()));
}
//#endregion
//#region packages/pptx/src/worker.ts?worker&inline
var Y = "var e=Object.defineProperty,t=(e,t)=>()=>(e&&(t=e(e=0)),t),n=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r},r,i,a=t((()=>{r=class e extends Error{code;constructor(t,n){super(n),this.name=`OoxmlError`,this.code=t,Object.setPrototypeOf(this,e.prototype)}},i=class e extends Error{code=`ooxml-resource-limit`;details;constructor(t,n){super(t),this.name=`OoxmlResourceLimitError`;let r=n.violation,i=Object.freeze({format:r.format,operation:r.operation,resource:r.resource,metric:r.metric,...r.part===void 0?{}:{part:r.part},limit:r.limit,observed:r.observed,configurable:r.configurable,usage:Object.freeze({archiveEntryCount:r.usage.archiveEntryCount,declaredInflatedBytes:r.usage.declaredInflatedBytes,...r.usage.largestInflatedEntryBytes===void 0?{}:{largestInflatedEntryBytes:r.usage.largestInflatedEntryBytes},distinctInflatedBytes:r.usage.distinctInflatedBytes,operationInflatedBytes:r.usage.operationInflatedBytes})});this.details=Object.freeze({stage:n.stage,violation:i}),Object.setPrototypeOf(this,e.prototype)}}})),o,s,c,l,u,d=t((()=>{o=134217728,s=268435456,c=4096,l=67108864,u=67108864})),f,p,m,h,g=t((()=>{f=`https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap`,p=`https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap`,m=`https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap`,h={calibri:{url:`https://fonts.googleapis.com/css2?family=Carlito:ital,wght@0,400;0,700;1,400;1,700&display=swap`,loadFamily:`Carlito`},cambria:{url:`https://fonts.googleapis.com/css2?family=Caladea:ital,wght@0,400;0,700;1,400;1,700&display=swap`,loadFamily:`Caladea`},\"franklin gothic book\":{url:m,loadFamily:`Libre Franklin`},\"franklin gothic medium\":{url:m,loadFamily:`Libre Franklin`},\"nunito sans\":{url:`https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap`},nunito:{url:`https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap`},\"open sans\":{url:`https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap`},roboto:{url:`https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap`},lato:{url:`https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap`},montserrat:{url:`https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap`},poppins:{url:`https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap`},raleway:{url:`https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,700;1,400;1,700&display=swap`},\"playfair display\":{url:`https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap`},ubuntu:{url:`https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,700;1,400;1,700&display=swap`},\"sakkal majalla\":{url:f,loadFamily:`Noto Naskh Arabic`,script:`arabic`},\"traditional arabic\":{url:f,loadFamily:`Noto Naskh Arabic`,script:`arabic`},\"simplified arabic\":{url:f,loadFamily:`Noto Naskh Arabic`,script:`arabic`},\"arabic typesetting\":{url:f,loadFamily:`Noto Naskh Arabic`,script:`arabic`},\"univers next arabic\":{url:p,loadFamily:`Noto Sans Arabic`,script:`arabic`},\"noto naskh arabic\":{url:f,loadFamily:`Noto Naskh Arabic`},\"noto sans arabic\":{url:p,loadFamily:`Noto Sans Arabic`}}}));function _(e){return e?ne[e.trim().toLowerCase()]??null:null}function v(e){if(!e)return null;let t=_(e)??e.trim(),n=t.toLowerCase(),r=n.match(/^noto\\s+(?:sans|serif)\\s+(?:cjk\\s+)?(sc|tc|hk|jp|kr)$/);return r?r[1]:/[ᄀ-ᇿ㄰-㆏가-힯]/.test(t)?`kr`:/[぀-ヿ]/.test(t)?`jp`:/jhenghei|微軟正黑|新細明|細明|pmingliu|mingliu|dfkai|標楷|華康|cns11643|kaiti tc|ming\\s*liu/.test(n)||/新細明體|細明體|標楷體|微軟正黑體|華康/.test(t)?`tc`:/simsun|nsimsun|simhei|simkai|simfang|yahei|dengxian|fangsong|kaiti|youyuan|lisu|stsong|stkaiti|stfangsong|stheiti|stxihei|stzhongsong|songti sc|heiti sc|微软雅黑/.test(n)||/宋体|黑体|楷体|仿宋|等线|微软雅黑|隶书|幼圆/.test(t)?`sc`:/malgun|batang|gulim|dotum|gungsuh|nanum|new gulim|hancom|hy(gothic|graphic|namu)?/.test(n)?`kr`:/\\bmeiryo\\b|\\byu\\s*(gothic|mincho)\\b|yugothic|yumincho|hiragino|\\bms\\s*(gothic|mincho|pgothic|pmincho|ui\\s*gothic)\\b|\\bms[pg]?(gothic|mincho)\\b|ipa(ex)?(gothic|mincho)|noto\\s+(sans|serif)\\s+jp|游ゴシック|游明朝|ＭＳ|メイリオ|ヒラギノ/.test(n)||/游ゴシック|游明朝|ＭＳ ゴシック|ＭＳ 明朝|ＭＳ Ｐゴシック|メイリオ|ヒラギノ/.test(t)?`jp`:null}function ee(e){return/\\p{Script=Han}/u.test(e)}function te(e,t,n=!1){let r=new oe(t);return r.addText(e),r.names(n)}var ne,y,re,ie,ae,oe,se=t((()=>{ne={\"noto sans cjk sc\":`Noto Sans SC`,\"noto serif cjk sc\":`Noto Serif SC`,\"noto sans cjk tc\":`Noto Sans TC`,\"noto serif cjk tc\":`Noto Serif TC`,\"noto sans cjk jp\":`Noto Sans JP`,\"noto serif cjk jp\":`Noto Serif JP`,\"noto sans cjk kr\":`Noto Sans KR`,\"noto serif cjk kr\":`Noto Serif KR`,\"noto sans cjk hk\":`Noto Sans HK`},y=e=>`https://fonts.googleapis.com/css2?family=${e}:wght@400;700&display=swap`,re={\"noto sans kr\":{url:y(`Noto+Sans+KR`)},\"noto sans sc\":{url:y(`Noto+Sans+SC`)},\"noto sans tc\":{url:y(`Noto+Sans+TC`)},\"noto sans hk\":{url:y(`Noto+Sans+HK`)},\"noto sans jp\":{url:y(`Noto+Sans+JP`)},\"noto serif kr\":{url:y(`Noto+Serif+KR`)},\"noto serif sc\":{url:y(`Noto+Serif+SC`)},\"noto serif tc\":{url:y(`Noto+Serif+TC`)},\"noto serif jp\":{url:y(`Noto+Serif+JP`)}},ie=Object.fromEntries(Object.entries(ne).map(([e,t])=>[e,{...re[t.toLowerCase()],loadFamily:t}])),ae={...re,...ie,\"noto sans\":{url:y(`Noto+Sans`)},\"noto serif\":{url:y(`Noto+Serif`)},\"noto sans devanagari\":{url:y(`Noto+Sans+Devanagari`)},\"noto sans thai\":{url:y(`Noto+Sans+Thai`)},\"noto sans hebrew\":{url:y(`Noto+Sans+Hebrew`)},\"noto serif hebrew\":{url:y(`Noto+Serif+Hebrew`)}},oe=class e{hasHan=!1;hasHangul=!1;hasKana=!1;hasArabic=!1;hasThai=!1;hasHebrew=!1;hasDevanagari=!1;hasCyrGreek=!1;constructor(e){this.cjkLang=e}scriptCjkLanguage(){return this.hasHangul?`kr`:this.hasKana?`jp`:null}preferredCjkLanguage(){return this.scriptCjkLanguage()??this.cjkLang??`jp`}clone(){let t=new e(this.cjkLang);return t.hasHan=this.hasHan,t.hasHangul=this.hasHangul,t.hasKana=this.hasKana,t.hasArabic=this.hasArabic,t.hasThai=this.hasThai,t.hasHebrew=this.hasHebrew,t.hasDevanagari=this.hasDevanagari,t.hasCyrGreek=this.hasCyrGreek,t}addText(e){let t=()=>this.hasHan&&this.hasHangul&&this.hasKana&&this.hasArabic&&this.hasThai&&this.hasHebrew&&this.hasDevanagari&&this.hasCyrGreek;outer:for(let n of e)if(n)for(let e of n){let n=e.codePointAt(0);if(n!==void 0&&!(n<=591)&&(n>=4352&&n<=4607||n>=12592&&n<=12687||n>=44032&&n<=55215?this.hasHangul=!0:n>=12352&&n<=12543?this.hasKana=!0:ee(e)?this.hasHan=!0:n>=1536&&n<=1791||n>=1872&&n<=1919||n>=2208&&n<=2303||n>=64336&&n<=65023||n>=65136&&n<=65279?this.hasArabic=!0:n>=3584&&n<=3711?this.hasThai=!0:n>=1424&&n<=1535||n>=64285&&n<=64335?this.hasHebrew=!0:n>=2304&&n<=2431?this.hasDevanagari=!0:(n>=1024&&n<=1279||n>=880&&n<=1023)&&(this.hasCyrGreek=!0),t()))break outer}}names(e=!1){let t=[],n=new Set;this.hasHangul&&n.add(`kr`),this.hasKana&&n.add(`jp`),this.hasHan&&(n.size===0||e)&&n.add(this.cjkLang??`jp`);for(let e of[`kr`,`sc`,`tc`,`hk`,`jp`])if(n.has(e)){let n={kr:`KR`,sc:`SC`,tc:`TC`,hk:`HK`,jp:`JP`}[e];t.push(`Noto Sans ${n}`),e!==`hk`&&t.push(`Noto Serif ${n}`)}return this.hasCyrGreek&&t.push(`Noto Sans`,`Noto Serif`),this.hasArabic&&t.push(`Noto Naskh Arabic`,`Noto Sans Arabic`),this.hasThai&&t.push(`Noto Sans Thai`),this.hasHebrew&&t.push(`Noto Sans Hebrew`,`Noto Serif Hebrew`),this.hasDevanagari&&t.push(`Noto Sans Devanagari`),t}}}));function ce(e){return e===`image-dimension`||e===`image-pixels`||e===`active-decoded-bytes`||e===`image-effect-count`||e===`image-effect-work`}function le(e){return typeof e==`number`&&Number.isSafeInteger(e)&&e>=0}function ue(e){if(!(!e||typeof e!=`object`))try{let t=e,n=t.code,r=t.metric,i=t.limit,a=t.observed;return n!==`ooxml-decoded-image-limit`||!ce(r)||!le(i)||!le(a)||a<=i?void 0:{metric:r,limit:i,observed:a}}catch{return}}var de,fe,pe,me,he,ge=t((()=>{de=1<<25,fe=1<<27,de*4,fe*4,pe=Math.floor(de/4),me=fe,me/pe,he=class e extends RangeError{code=`ooxml-decoded-image-limit`;constructor(t,n,r){super(`OOXML decoded image limit exceeded: ${t} ${r} > ${n}`),this.metric=t,this.limit=n,this.observed=r,this.name=`OoxmlDecodedImageLimitError`,Object.setPrototypeOf(this,e.prototype)}}}));function _e(e){if(!(typeof e!=`object`||!e))try{let t=e,n=t.code,r=t.message;return n===`ooxml-tiff-decode`&&typeof r==`string`?{message:r}:void 0}catch{return}}var ve,ye=t((()=>{ve=class e extends Error{code=`ooxml-tiff-decode`;constructor(t,n){super(t,n),this.name=`TiffDecodeError`,Object.setPrototypeOf(this,e.prototype)}}}));function be(e){if(!e.startsWith(`data:`))return null;let t=e.indexOf(`,`);if(t===-1)return null;let n=atob(e.slice(t+1)),r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r.buffer}var xe=t((()=>{})),Se,Ce=t((()=>{Se=class{state=`uninitialized`;generationValue=0;readiness;poisonListeners=new Set;constructor(e,t,n){this.initialize=e,this.reinitialize=t,this.normalizeFailure=n}get generation(){return this.generationValue}get poisoned(){return this.state===`poisoned`}onPoison(e){return this.poisonListeners.add(e),()=>this.poisonListeners.delete(e)}async ensureReady(){if(this.state!==`ready`){if(!this.readiness){let e=this.state===`uninitialized`?this.initialize:this.reinitialize;this.readiness=Promise.resolve().then(e).then(()=>{this.generationValue+=1,this.state=`ready`,this.readiness=void 0},e=>{throw this.readiness=void 0,e})}await this.readiness}}run(e){try{return e()}catch(e){let t=this.normalizeFailure(e);throw t?(this.poison(t),t):e}}tryRunReady(e){if(this.state!==`ready`)return{current:!1};let t=this.generationValue,n=this.run(e);return this.state!==`ready`||t!==this.generationValue?{current:!1}:{current:!0,generation:t,value:n}}poison(e){this.state=`poisoned`,this.readiness=void 0;for(let t of this.poisonListeners)t(e)}assertCurrent(e){if(this.state!==`ready`||e!==this.generationValue)throw Error(`WASM archive session belongs to a discarded runtime generation`)}}}));function we(e){let t=globalThis.WebAssembly?.RuntimeError;return t&&e instanceof t||e instanceof RangeError?!0:e instanceof Error?e.name===`RuntimeError`||e.name===`CompileError`||e.name===`LinkError`||e.name===`InternalError`||e.name===`OOMError`:!1}function Te(e){try{if((typeof e!=`object`||!e)&&typeof e!=`function`)return;let t=Reflect.get(e,`__destroy_into_raw`);typeof t==`function`&&Reflect.apply(t,e,[])}catch{}}function Ee(e,t){return e({module_or_path:t})}function De(e){return we(e)?new Oe(`WASM parser trapped and was recycled: ${e instanceof Error?e.message:String(e)}`):null}var Oe,ke,Ae=t((()=>{Ce(),Oe=class e extends Error{code=`parser-crashed`;constructor(t){super(t),this.name=`WasmTrapError`,Object.setPrototypeOf(this,e.prototype)}},ke=class{runtime;wasmInput=null;currentArchive=null;constructor(e,t={}){this.init=e,this.options=t,this.runtime=new Se(()=>this.invokeConfigured(this.init),()=>this.invokeConfigured(this.options.reinit??this.init),De),this.runtime.onPoison(()=>this.dropPoisonedArchive())}setWasmInput(e){this.wasmInput=e,this.runtime.ensureReady().catch(()=>void 0)}setWasmUrl(e){this.setWasmInput(e)}get archive(){return this.currentArchive}setArchive(e){this.freeArchive(),this.currentArchive=e}disposeArchive(){this.freeArchive()}get poisoned(){return this.runtime.poisoned}async ensureReady(){await this.runtime.ensureReady()}run(e){return this.runtime.run(e)}poison(){this.runtime.poison(new Oe(`WASM parser was recycled`))}invokeConfigured(e){return this.wasmInput===null?Promise.reject(Error(`WasmParserHost: setWasmInput was never called`)):Ee(e,this.wasmInput)}freeArchive(){this.currentArchive!==null&&this.options.freeArchive&&this.options.freeArchive(this.currentArchive),this.currentArchive=null}dropPoisonedArchive(){let e=this.currentArchive;this.currentArchive=null,Te(e)}}}));function je(e){return typeof e==`number`&&Number.isSafeInteger(e)&&e>0}function Me(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;return je(t.requiredBytes)&&je(t.offeredBytes)&&t.requiredBytes>t.offeredBytes}function Ne(e){if(e instanceof b)return e;let t=e instanceof Error?e.message:String(e);if(!t.startsWith(Ie))return;let n;try{n=JSON.parse(t.slice(26))}catch{return}if(!n||typeof n!=`object`||Array.isArray(n))return;let r=n;if(!(r.code!==`ooxml-insufficient-credit`||!Me(r)))return new b(r)}function Pe(e,t,n){let r=Ne(e);if(!(!r||r.offeredBytes!==t||r.requiredBytes>n))return r}var Fe,Ie,b,Le=t((()=>{Fe=`ooxml-insufficient-credit`,Ie=`OOXML_INSUFFICIENT_CREDIT:`,b=class e extends RangeError{code=Fe;requiredBytes;offeredBytes;constructor(t){super(`Pull unit requires ${t.requiredBytes} bytes but credit is ${t.offeredBytes}`),this.name=`PullSessionInsufficientCreditError`,this.requiredBytes=t.requiredBytes,this.offeredBytes=t.offeredBytes,Object.setPrototypeOf(this,e.prototype)}}}));function x(e){return typeof e==`number`&&Number.isSafeInteger(e)&&e>=0}function Re(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;return x(t.archiveEntryCount)&&x(t.declaredInflatedBytes)&&(t.largestInflatedEntryBytes===void 0||x(t.largestInflatedEntryBytes))&&x(t.distinctInflatedBytes)&&x(t.operationInflatedBytes)}function ze(e){let t;try{t=JSON.parse(new TextDecoder().decode(e))}catch{throw TypeError(`OOXML resource usage checkpoint is not valid JSON`)}if(!Re(t))throw TypeError(`OOXML resource usage checkpoint is invalid`);return t}function Be(e){return e===`docx`||e===`xlsx`||e===`pptx`}function Ve(e){return e===`container`||e===`decompression`||e===`parsing`||e===`serialization`||e===`layout`||e===`rendering`||e===`worker`}function S(e,t){return typeof e==`string`&&e.length>0&&e.length<=t&&!/[\\u0000-\\u001f\\u007f]/u.test(e)}function He(e){return S(e,T)&&/^[a-z0-9][a-z0-9-]*$/u.test(e)}function Ue(e){return!S(e,st)||e.startsWith(`/`)||e.startsWith(`\\\\`)||e.includes(`\\\\`)||e.includes(`?`)||e.includes(`#`)||e.includes(`://`)||/^[a-z]:/iu.test(e)?!1:e.split(`/`).every(e=>e!==``&&e!==`.`&&e!==`..`)}function We(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;return!Be(t.format)||!S(t.operation,ot)||!He(t.resource)||!He(t.metric)||!x(t.limit)||!x(t.observed)||typeof t.configurable!=`boolean`||!Re(t.usage)?!1:!(`part`in t)||Ue(t.part)}function C(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;if(!Ve(t.stage)||!We(t.violation))return!1;let n=t.violation,r=E.get(`${n.resource}:${n.metric}`);return r?t.stage!==r.stage||r.configurable===!1&&n.configurable!==!1?!1:r.part===`required`?n.part!==void 0:r.part===`forbidden`?n.part===void 0:!0:!(ct.has(n.resource)&&lt.has(n.metric))}function Ge(e){return{archiveEntryCount:e.archiveEntryCount,declaredInflatedBytes:e.declaredInflatedBytes,...e.largestInflatedEntryBytes===void 0?{}:{largestInflatedEntryBytes:e.largestInflatedEntryBytes},distinctInflatedBytes:e.distinctInflatedBytes,operationInflatedBytes:e.operationInflatedBytes}}function Ke(e){if(!C(e))return;let t=e.violation,n={stage:e.stage,violation:{format:t.format,operation:t.operation,resource:t.resource,metric:t.metric,...t.part===void 0?{}:{part:t.part},limit:t.limit,observed:t.observed,configurable:t.configurable,usage:Ge(t.usage)}};return C(n)?n:void 0}function qe(e){let t=e.violation;return`OOXML resource limit exceeded${t.part?` for ${t.part}`:``}: ${t.metric} ${t.observed} > ${t.limit}`}function Je(e){let t=e instanceof Error?e.message:String(e);if(!t.startsWith(rt))return;let n;try{n=JSON.parse(t.slice(21))}catch{return}if(!n||typeof n!=`object`)return;let r=n;if(!(r.code!==`ooxml-resource-limit`||!C(r.details)))return new i(qe(r.details),r.details)}function Ye(e){let t=e instanceof Error?e.message:String(e);if(t.startsWith(it))return new r(`not-ooxml`,`This file is not an Office Open XML document: ${t.slice(16)}`)}function Xe(e){let t=e instanceof Error?e.message:String(e);if(!t.startsWith(at))return;let n=t.slice(16);if(n===`repair-required:level-definition`)return new r(`invalid-numbering`,`The DOCX defines a numbering level outside Word’s supported 0–8 range and requires repair.`);if(n===`cannot-open:whitespace`||n===`cannot-open:non-decimal`)return new r(`invalid-numbering`,`Word cannot open this DOCX numbering level (${n.slice(12)}).`)}function Ze(e){return Je(e)??Ye(e)??Xe(e)}function Qe(e){let t=ue(e);if(t){let e=new he(t.metric,t.limit,t.observed);return{message:e.message,errorName:e.name,code:e.code,decodedImage:t}}let n=_e(e);if(n)return{message:n.message,errorName:`TiffDecodeError`,code:`ooxml-tiff-decode`};let a=Ne(e);if(a)return{message:a.message,errorName:a.name,code:a.code,insufficientCredit:{requiredBytes:a.requiredBytes,offeredBytes:a.offeredBytes}};let o=e instanceof r||e instanceof i?e:Ze(e);if(o instanceof i){let e=Ke(o.details);return e?{message:typeof o.message==`string`?o.message:qe(e),errorName:`OoxmlResourceLimitError`,code:`ooxml-resource-limit`,resourceLimit:e}:{message:`Invalid OOXML resource-limit error payload`,errorName:`Error`}}if(o instanceof r)return{message:typeof o.message==`string`?o.message:String(o.message),errorName:S(o.name,T)?o.name:`OoxmlError`,...He(o.code)?{code:o.code}:{}};let s=e instanceof Error?e.message:String(e);if(typeof s==`string`&&s.startsWith(rt))return{message:`Invalid OOXML resource-limit payload`,errorName:`Error`};let c=e instanceof Error?e:Error(s),l=c;return{message:typeof c.message==`string`?c.message:String(c.message),errorName:S(c.name,T)?c.name:`Error`,...typeof l.code==`string`?{code:l.code}:{}}}function w(e){try{return Qe(e)}catch{return{message:`Worker operation failed with an unreadable error`,errorName:`Error`}}}function $e(e){return typeof e==`string`&&Object.prototype.hasOwnProperty.call(dt,e)}function et(e,t){if(e!==`ooxml-decoded-image-limit`||!t||typeof t!=`object`)return;let n=t,r=n.metric,i=n.limit,a=n.observed;if(!(!$e(r)||!x(i)||!x(a)||a<=i))return{metric:r,limit:i,observed:a}}function tt(e){let t=e.message,n=e.errorName,a=e.code,o=e.decodedImage,s=e.insufficientCredit,c=e.resourceLimit,l=typeof t==`string`?t:`Worker operation failed with an invalid error payload`,u=S(n,T)?n:void 0,d=typeof a==`string`?a:void 0,f=et(d,o);if(f)return new he(f.metric,f.limit,f.observed);if(d===`ooxml-tiff-decode`)return new ve(l);if(d===`ooxml-insufficient-credit`&&Me(s))return new b(s);if(d===`ooxml-resource-limit`&&C(c))return new i(l,c);if(d&&ut.has(d))return new r(d,l);let p=u===`TypeError`?TypeError(l):u===`RangeError`?RangeError(l):Error(l);return u&&(p.name=u),d!==void 0&&Object.assign(p,{code:d}),p}function nt(e){try{return tt(e)}catch{return Error(`Worker operation failed with an unreadable error payload`)}}var rt,it,at,T,ot,st,E,ct,lt,ut,dt,ft=t((()=>{a(),ge(),ye(),Le(),rt=`OOXML_RESOURCE_LIMIT:`,it=`OOXML_NOT_OOXML:`,at=`OOXML_DOCX_ILVL:`,T=128,ot=256,st=4096,E=new Map([[`archive-entry:declared-inflated-bytes`,{stage:`container`,part:`required`}],[`archive-entry:actual-inflated-bytes`,{stage:`decompression`,part:`required`}],[`archive:entry-count`,{stage:`container`,part:`forbidden`}],[`archive:central-directory-bytes`,{stage:`container`,part:`forbidden`,configurable:!1}],[`archive:distinct-inflated-bytes`,{stage:`decompression`,part:`required`}],[`xml-event:bytes`,{stage:`parsing`,part:`optional`,configurable:!1}],[`xml-context:bytes`,{stage:`parsing`,part:`optional`,configurable:!1}],[`chartex-allocation:elements`,{stage:`parsing`,part:`forbidden`,configurable:!1}],[`chartex-allocation:bytes`,{stage:`parsing`,part:`forbidden`,configurable:!1}],[`xml-tree:depth`,{stage:`parsing`,part:`optional`,configurable:!1}],[`worksheet-row:projected-bytes`,{stage:`parsing`,part:`optional`,configurable:!1}],[`worksheet-shell:projected-bytes`,{stage:`parsing`,part:`optional`,configurable:!1}]]),ct=new Set([...E.keys()].map(e=>e.slice(0,e.indexOf(`:`)))),lt=new Set([...E.keys()].map(e=>e.slice(e.indexOf(`:`)+1))),ut=new Set([`encrypted`,`invalid-password`,`unsupported-encryption`,`legacy-binary-format`,`not-ooxml`,`invalid-numbering`]),dt={\"image-dimension\":!0,\"image-pixels\":!0,\"active-decoded-bytes\":!0,\"image-effect-count\":!0,\"image-effect-work\":!0}}));function pt(e){return e.byteOffset===0&&e.byteLength===e.buffer.byteLength&&e.buffer instanceof ArrayBuffer?e.buffer:e.slice().buffer}var mt=t((()=>{}));function ht(e){return[e.maxArchiveEntryBytes===null?0n:BigInt(e.maxArchiveEntryBytes),e.maxTotalInflatedBytes===null?0n:BigInt(e.maxTotalInflatedBytes),e.maxArchiveEntries===null?0n:BigInt(e.maxArchiveEntries)]}var gt=t((()=>{d(),Object.freeze({maxArchiveEntryBytes:o,maxTotalInflatedBytes:s,maxArchiveEntries:c})}));function D(e,t){if(!Number.isSafeInteger(e)||e<=0)throw RangeError(`${t} must be a positive safe integer`)}function _t(e){if(!(typeof e==`string`&&e.length>0||typeof e==`number`&&Number.isSafeInteger(e)&&e>0))throw RangeError(`session id must be a non-empty string or positive safe integer`)}var O,vt,yt,bt=t((()=>{ft(),Le(),O=`ooxml-pull-v1`,vt=class{owner;queue=Promise.resolve();leases=new Map;retainedBytes=0;retainedCount=0;maxRetainedBytes;maxRetainedCount;cleanups=new Set;pendingFatalCleanups=[];poisonRunning=!1;fatal;constructor(e){this.maxRetainedBytes=e?.maxRetainedBytes??64*1024*1024,this.maxRetainedCount=e?.maxRetainedCount??256,D(this.maxRetainedBytes,`max retained lease bytes`),D(this.maxRetainedCount,`max retained lease count`)}enqueue(e){let t=this.queue.then(e,e);return this.queue=t.then(()=>void 0,()=>void 0),t}acquire(e){return this.owner===void 0?(this.owner=e,!0):this.owner===e}release(e){this.owner===e&&(this.owner=void 0)}retainLease(e,t,n){if(!Number.isSafeInteger(n)||n<0)throw RangeError(`retained lease bytes are invalid`);let r=this.leases.get(e)??new Map;if(r.has(t))throw Error(`driver returned a duplicate lease id`);if(this.retainedCount+1>this.maxRetainedCount)throw RangeError(`retained lease count exceeds limit`);if(this.retainedBytes+n>this.maxRetainedBytes)throw RangeError(`retained lease bytes exceed limit`);r.set(t,n),this.leases.set(e,r),this.retainedCount++,this.retainedBytes+=n}releaseLease(e,t){let n=this.leases.get(e),r=n?.get(t);r!==void 0&&(n?.delete(t),n?.size===0&&this.leases.delete(e),this.retainedCount--,this.retainedBytes-=r)}registerCleanup(e){return this.fatal?(this.poisonRunning?this.pendingFatalCleanups.push(e):this.enqueue(e).catch(()=>void 0),()=>void 0):(this.cleanups.add(e),()=>this.cleanups.delete(e))}get fatalError(){return this.fatal}get registeredHostCount(){return this.cleanups.size}async poison(e){if(this.fatal??=e,this.poisonRunning)return this.fatal;this.poisonRunning=!0,this.pendingFatalCleanups.push(...this.cleanups);try{let e;for(;(e=this.pendingFatalCleanups.shift())!==void 0;)await e().catch(()=>void 0)}finally{this.poisonRunning=!1}return this.fatal}},yt=class{options;coordinator;coordinatorOwner=Symbol(`pull-session-host`);unregisterCleanup;sequence=0;unacked;leases=new Map;activeDriverLeases=new Set;nextWireLeaseId;cancelRequested=!1;cancelComplete=!1;closeRequested=!1;closeComplete=!1;driverCancelComplete=!1;driverCloseComplete=!1;completed=!1;constructor(e){_t(e.sessionId),D(e.operationId,`operation id`),D(e.generation,`generation`),D(e.maxByteCredit,`max byte credit`),e.wireLeaseIdStart!==void 0&&D(e.wireLeaseIdStart,`wire lease id start`),this.options=e,this.coordinator=e.coordinator,this.nextWireLeaseId=e.wireLeaseIdStart??1,this.unregisterCleanup=this.coordinator.registerCleanup(()=>this.forceFatalCleanup())}dispatch(e,t){return this.coordinator.enqueue(async()=>{let n=await this.execute(e);try{t(n.response,n.transfer)}catch(e){throw await this.rollbackFailedPost(n),e}})}async rollbackFailedPost(e){let t=e.response;if(t.kind===`chunk`){let n=t.leaseId===void 0?void 0:this.leases.get(t.leaseId);try{await this.options.driver.disposeInvalidChunk?.({payload:t.payload,byteLength:t.byteLength,done:t.done,leaseId:n?.driverLeaseId,retainedBytes:n?.retainedBytes,transfer:e.transfer})}catch{}}this.unacked=void 0,this.coordinator.release(this.coordinatorOwner);for(let[e,t]of[...this.leases])try{await this.options.driver.releaseLease?.(t.driverLeaseId)}catch{}finally{this.leases.delete(e),this.activeDriverLeases.delete(t.driverLeaseId),this.coordinator.releaseLease(this.coordinatorOwner,e)}if(this.cancelRequested=!0,!this.driverCancelComplete)try{await this.options.driver.cancel?.(),this.driverCancelComplete=!0}catch{}this.unregisterCleanup()}async execute(e){try{if(this.isStaleLifecycle(e)){let t=e.kind===`cancel`?`cancel`:`close`;return this.sameOperationIdentity(e)?{response:this.accepted(e,t,!0)}:{response:this.errorResponse(e,{message:`stale lifecycle targets another session or operation`,errorName:`PullSessionProtocolError`,code:`ooxml-stale-lifecycle`})}}this.validateCommandIdentity(e);let t=this.coordinator.fatalError;if(t)return e.kind===`pull`?{response:this.errorResponse(e,t)}:(e.kind===`cancel`?await this.cancel():e.kind===`close`?await this.close():e.kind===`release`&&await this.release(e.leaseId),{response:this.accepted(e,e.kind)});switch(e.kind){case`pull`:return await this.pull(e);case`ack`:return await this.ack(e.sequence),{response:this.accepted(e,`ack`)};case`release`:return await this.release(e.leaseId),{response:this.accepted(e,`release`)};case`cancel`:return await this.cancel(),{response:this.accepted(e,`cancel`)};case`close`:return await this.close(),{response:this.accepted(e,`close`)}}}catch(t){let n=w(t);return n.code===`ooxml-resource-limit`&&(n=await this.coordinator.poison(n)),{response:this.errorResponse(e,n)}}}async pull(e){if(this.closeRequested||this.cancelRequested||this.completed)throw Error(`pull session is closed`);if(this.unacked)throw Error(`previous chunk is not acknowledged`);if(!Number.isSafeInteger(e.sequence)||e.sequence<0||e.sequence!==this.sequence)throw Error(`pull command sequence mismatch`);if(this.validateHostCredit(e.byteCredit),!this.coordinator.acquire(this.coordinatorOwner))throw Error(`another operation has an unacknowledged package chunk`);let t;try{t=await this.options.driver.pull(e.byteCredit)}catch(e){throw this.coordinator.release(this.coordinatorOwner),e}let n=!1,r=!1,i,a;try{let o=this.options.driver.measureChunk(t),s=this.arrayBufferTransferBytes(t.transfer);if(o<s)throw RangeError(`measured chunk bytes are below ArrayBuffer transfer bytes`);if(a=Math.max(o,s),t.leaseId!==void 0){if(D(t.leaseId,`lease id`),t.retainedBytes===void 0)throw Error(`retained lease bytes are required`);if(this.activeDriverLeases.has(t.leaseId))throw r=!0,Error(`driver returned an active duplicate lease id`);i=this.allocateWireLeaseId(),this.coordinator.retainLease(this.coordinatorOwner,i,t.retainedBytes),this.leases.set(i,{driverLeaseId:t.leaseId,retainedBytes:t.retainedBytes}),this.activeDriverLeases.add(t.leaseId),n=!0}else if(t.retainedBytes!==void 0)throw Error(`retained lease bytes require a lease id`);if(!Number.isSafeInteger(a)||a<0)throw RangeError(`host chunk byte length must be a non-negative safe integer`);if(a>e.byteCredit)throw RangeError(`host chunk exceeds byte credit`)}catch(e){let a;try{await this.options.driver.disposeInvalidChunk?.(t)}catch(e){a=e}if(n&&i!==void 0)try{await this.release(i)}catch(e){a??=e}else if(t.leaseId!==void 0&&!r)try{await this.options.driver.releaseLease?.(t.leaseId)}catch(e){a??=e}if(r)try{await this.cancel()}catch(e){a??=e}throw this.coordinator.release(this.coordinatorOwner),a||e}return this.unacked={sequence:this.sequence,done:t.done},{response:{kind:`chunk`,protocol:O,...this.identity(),requestId:e.requestId,sequence:this.sequence,byteLength:a,done:t.done,payload:t.payload,leaseId:i,usage:this.resourceUsage()},transfer:t.transfer}}async ack(e){if(!Number.isSafeInteger(e)||e<0)throw RangeError(`invalid ack sequence`);if(e<this.sequence)return;if(!this.unacked||e!==this.sequence)throw Error(`ack sequence mismatch`);let t=this.unacked.done;await this.options.driver.acknowledge?.(e),this.unacked=void 0,this.coordinator.release(this.coordinatorOwner),this.sequence++,t&&(this.completed=!0,this.maybeUnregisterCompleted())}async release(e){D(e,`wire lease id`);let t=this.leases.get(e);t&&(await this.options.driver.releaseLease?.(t.driverLeaseId),this.leases.delete(e),this.activeDriverLeases.delete(t.driverLeaseId),this.coordinator.releaseLease(this.coordinatorOwner,e),this.maybeUnregisterCompleted())}async cancel(){if(this.cancelComplete)return;this.cancelRequested=!0,this.unacked=void 0,this.coordinator.release(this.coordinatorOwner);let e;try{await this.releaseAllLeases()}catch(t){e=t}if(!this.driverCancelComplete)try{await this.options.driver.cancel?.(),this.driverCancelComplete=!0}catch(t){e??=t}if(e)throw e;this.cancelComplete=!0,this.unregisterCleanup()}async close(){if(this.closeComplete)return;this.closeRequested=!0,this.unacked=void 0,this.coordinator.release(this.coordinatorOwner);let e;try{await this.releaseAllLeases()}catch(t){e=t}if(!this.driverCloseComplete)try{await this.options.driver.close?.(),this.driverCloseComplete=!0}catch(t){e??=t}if(e)throw e;this.closeComplete=!0,this.unregisterCleanup()}async releaseAllLeases(){let e;for(let t of[...this.leases.keys()])try{await this.release(t)}catch(t){e??=t}if(e)throw e}validateCommandIdentity(e){if(e.protocol!==`ooxml-pull-v1`||e.sessionId!==this.options.sessionId||e.operationId!==this.options.operationId||e.generation!==this.options.generation||!Number.isSafeInteger(e.requestId)||e.requestId<=0)throw Error(`stale or mismatched pull session command`)}validateHostCredit(e){if(D(e,`byte credit`),e>this.options.maxByteCredit)throw RangeError(`byte credit exceeds host maximum`)}accepted(e,t,n=!1){return{kind:`accepted`,protocol:O,...n?{sessionId:e.sessionId,operationId:e.operationId,generation:e.generation}:this.identity(),requestId:e.requestId,command:t,usage:this.resourceUsage()}}identity(){return{sessionId:this.options.sessionId,operationId:this.options.operationId,generation:this.options.generation}}isStaleLifecycle(e){return(e.kind===`cancel`||e.kind===`close`)&&e.protocol===`ooxml-pull-v1`&&Number.isSafeInteger(e.requestId)&&e.requestId>0&&Number.isSafeInteger(e.generation)&&e.generation>0&&e.generation<this.options.generation}sameOperationIdentity(e){return e.sessionId===this.options.sessionId&&e.operationId===this.options.operationId}errorResponse(e,t){return{kind:`error`,protocol:O,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,error:t,usage:this.errorResourceUsage()}}async forceFatalCleanup(){this.cancelRequested=!0,this.unacked=void 0,this.coordinator.release(this.coordinatorOwner);let e;for(let t of[...this.leases.keys()])try{await this.release(t)}catch(t){e??=t}if(!this.driverCancelComplete)try{await this.options.driver.cancel?.(),this.driverCancelComplete=!0}catch(t){e??=t}if(e)throw e;this.unregisterCleanup()}allocateWireLeaseId(){if(!Number.isSafeInteger(this.nextWireLeaseId)||this.nextWireLeaseId<=0)throw RangeError(`wire lease id space exhausted`);return this.nextWireLeaseId++}arrayBufferTransferBytes(e){let t=0;for(let n of e??[])if(n instanceof ArrayBuffer&&(t+=n.byteLength,!Number.isSafeInteger(t)))throw RangeError(`ArrayBuffer transfer bytes overflow`);return t}maybeUnregisterCompleted(){this.completed&&this.leases.size===0&&this.unregisterCleanup()}resourceUsage(){return this.options.driver.resourceUsage?.()}errorResourceUsage(){try{return this.resourceUsage()}catch{return}}}})),k=t((()=>{xe(),Ae(),ft(),Le(),mt(),ge(),ye(),gt(),d(),a(),bt()}));function xt(e){return St.test(e)}var St,Ct=t((()=>{St=/[\\u0590-\\u08FF\\uFB1D-\\uFDFF\\uFE70-\\uFEFF\\u200F\\u202B\\u202E\\u2067]|[\\u{10800}-\\u{10FFF}\\u{1E800}-\\u{1EFFF}]/u})),wt=t((()=>{Ct()})),A=t((()=>{a(),d(),g(),se(),ge(),ye(),k(),wt()})),Tt=t((()=>{}));function Et(){return Dt??=[0,191,198,198,208,208,215,216,222,223,230,230,240,240,247,248,254,254,272,273,294,295,305,307,312,312,319,322,329,331,338,339,358,359,383,415,418,430,433,460,477,477,484,485,497,499,502,503,540,541,544,549,564,767,847,847,880,883,885,887,890,893,895,895,900,900,913,929,931,937,945,969,975,978,981,1023,1026,1026,1028,1030,1032,1035,1039,1048,1050,1080,1082,1103,1106,1106,1108,1110,1112,1115,1119,1141,1144,1154,1160,1216,1219,1231,1236,1237,1240,1241,1248,1249,1256,1257,1270,1271,1274,1327,1329,1366,1369,1418,1421,1423,1470,1470,1472,1472,1475,1475,1478,1478,1488,1514,1519,1524,1536,1551,1563,1569,1575,1610,1632,1647,1649,1727,1729,1729,1731,1746,1748,1749,1757,1758,1765,1766,1769,1769,1774,1805,1807,1808,1810,1839,1869,1969,1984,2026,2036,2042,2046,2069,2074,2074,2084,2084,2088,2088,2096,2110,2112,2136,2142,2142,2144,2154,2160,2193,2208,2249,2274,2274,2304,2344,2346,2352,2354,2355,2357,2363,2365,2380,2382,2384,2389,2391,2400,2435,2437,2444,2447,2448,2451,2472,2474,2480,2482,2482,2486,2489,2493,2493,2495,2500,2503,2504,2510,2510,2528,2531,2534,2557,2561,2563,2565,2570,2575,2576,2579,2600,2602,2608,2610,2610,2613,2613,2616,2617,2622,2626,2631,2632,2635,2636,2641,2641,2652,2652,2662,2678,2689,2691,2693,2701,2703,2705,2707,2728,2730,2736,2738,2739,2741,2745,2749,2757,2759,2761,2763,2764,2768,2768,2784,2787,2790,2801,2809,2815,2817,2819,2821,2828,2831,2832,2835,2856,2858,2864,2866,2867,2869,2873,2877,2877,2879,2884,2887,2887,2901,2901,2911,2915,2918,2935,2946,2947,2949,2954,2958,2960,2962,2963,2965,2965,2969,2970,2972,2972,2974,2975,2979,2980,2984,2986,2990,3001,3007,3010,3014,3016,3024,3024,3046,3066,3072,3084,3086,3088,3090,3112,3114,3129,3133,3140,3142,3143,3146,3148,3160,3162,3164,3165,3168,3171,3174,3183,3191,3212,3214,3216,3218,3240,3242,3251,3253,3257,3261,3263,3265,3265,3267,3268,3270,3270,3276,3276,3292,3294,3296,3299,3302,3311,3313,3315,3328,3340,3342,3344,3346,3386,3389,3389,3391,3396,3398,3400,3406,3407,3412,3414,3416,3427,3430,3455,3457,3459,3461,3478,3482,3505,3507,3515,3517,3517,3520,3526,3536,3540,3542,3542,3544,3545,3547,3547,3558,3567,3570,3572,3585,3639,3647,3655,3660,3675,3713,3714,3716,3716,3718,3722,3724,3747,3749,3749,3751,3767,3771,3773,3776,3780,3782,3782,3788,3790,3792,3801,3804,3807,3840,3863,3866,3892,3894,3894,3896,3896,3898,3906,3908,3911,3913,3916,3918,3921,3923,3926,3928,3931,3933,3944,3946,3948,3959,3959,3961,3961,3966,3967,3973,3973,3976,3986,3988,3991,3993,3996,3998,4001,4003,4006,4008,4011,4013,4020,4022,4022,4024,4024,4026,4028,4030,4037,4039,4044,4046,4058,4096,4133,4135,4141,4143,4150,4152,4152,4155,4236,4238,4293,4295,4295,4301,4301,4304,4351,4371,4448,4470,4519,4547,4680,4682,4685,4688,4694,4696,4696,4698,4701,4704,4744,4746,4749,4752,4784,4786,4789,4792,4798,4800,4800,4802,4805,4808,4822,4824,4880,4882,4885,4888,4954,4960,4988,4992,5017,5024,5109,5112,5117,5120,5788,5792,5880,5888,5907,5919,5939,5941,5942,5952,5971,5984,5996,5998,6e3,6002,6003,6016,6097,6099,6108,6112,6121,6128,6137,6144,6169,6176,6264,6272,6312,6314,6314,6320,6389,6400,6430,6432,6443,6448,6456,6464,6464,6468,6509,6512,6516,6528,6571,6576,6601,6608,6618,6622,6678,6681,6683,6686,6750,6753,6772,6784,6793,6800,6809,6816,6829,6846,6846,6912,6917,6919,6919,6921,6921,6923,6923,6925,6925,6927,6929,6931,6963,6966,6970,6972,6972,6974,6975,6978,6978,6981,6988,6990,7018,7028,7081,7084,7141,7143,7153,7164,7222,7227,7241,7245,7306,7312,7354,7357,7367,7379,7379,7393,7393,7401,7404,7406,7411,7413,7415,7418,7418,7424,7615,7834,7834,7836,7839,7930,7935,8125,8125,8127,8128,8190,8190,8194,8292,8294,8305,8308,8334,8336,8348,8352,8385,8413,8416,8418,8420,8448,8485,8487,8489,8492,8587,8592,8601,8604,8621,8623,8652,8656,8707,8709,8712,8714,8715,8717,8739,8741,8741,8743,8768,8770,8771,8773,8774,8776,8776,8778,8799,8801,8801,8803,8812,8818,8819,8822,8823,8826,8831,8834,8835,8838,8839,8842,8875,8880,8927,8932,8937,8942,9e3,9003,9257,9280,9290,9312,10971,10973,11123,11126,11502,11506,11507,11513,11557,11559,11559,11565,11565,11568,11623,11631,11632,11648,11670,11680,11686,11688,11694,11696,11702,11704,11710,11712,11718,11720,11726,11728,11734,11736,11742,11776,11869,11904,11929,11931,12019,12032,12245,12272,12329,12336,12351,12353,12363,12365,12365,12367,12367,12369,12369,12371,12371,12373,12373,12375,12375,12377,12377,12379,12379,12381,12381,12383,12383,12385,12385,12387,12388,12390,12390,12392,12392,12394,12399,12402,12402,12405,12405,12408,12408,12411,12411,12414,12435,12437,12438,12443,12445,12447,12459,12461,12461,12463,12463,12465,12465,12467,12467,12469,12469,12471,12471,12473,12473,12475,12475,12477,12477,12479,12479,12481,12481,12483,12484,12486,12486,12488,12488,12490,12495,12498,12498,12501,12501,12504,12504,12507,12507,12510,12531,12533,12534,12539,12541,12543,12543,12549,12591,12593,12686,12688,12773,12783,12830,12832,42124,42128,42182,42192,42539,42560,42606,42608,42611,42622,42653,42656,42735,42738,42743,42752,42972,42993,43013,43015,43051,43056,43065,43072,43127,43136,43203,43205,43205,43214,43225,43250,43306,43310,43346,43359,43388,43392,43442,43444,43455,43457,43469,43471,43481,43486,43518,43520,43574,43584,43597,43600,43609,43612,43695,43697,43697,43701,43702,43705,43709,43712,43712,43714,43714,43739,43765,43777,43782,43785,43790,43793,43798,43808,43814,43816,43822,43824,43883,43888,44012,44016,44025,55216,55238,55243,55291,57344,63743,64014,64015,64017,64017,64019,64020,64031,64031,64033,64033,64035,64036,64039,64041,64256,64262,64275,64279,64288,64297,64335,64975,65008,65049,65072,65106,65108,65126,65128,65131,65136,65140,65142,65276,65279,65279,65281,65470,65474,65479,65482,65487,65490,65495,65498,65500,65504,65510,65512,65518,65529,65533,65536,65547,65549,65574,65576,65594,65596,65597,65599,65613,65616,65629,65664,65786,65792,65794,65799,65843,65847,65934,65936,65948,65952,65952,66e3,66044,66176,66204,66208,66256,66273,66299,66304,66339,66349,66378,66384,66421,66432,66461,66463,66499,66504,66517,66560,66717,66720,66729,66736,66771,66776,66811,66816,66855,66864,66915,66927,66938,66940,66954,66956,66962,66964,66965,66967,66977,66979,66993,66995,67001,67003,67004,67008,67016,67018,67043,67045,67059,67072,67382,67392,67413,67424,67431,67456,67461,67463,67504,67506,67514,67584,67589,67592,67592,67594,67637,67639,67640,67644,67644,67647,67669,67671,67742,67751,67759,67808,67826,67828,67829,67835,67867,67871,67897,67903,67929,67968,68023,68028,68047,68050,68099,68101,68102,68108,68108,68110,68110,68112,68115,68117,68119,68121,68149,68160,68168,68176,68184,68192,68255,68288,68324,68331,68342,68352,68405,68409,68437,68440,68466,68472,68497,68505,68508,68521,68527,68608,68680,68736,68786,68800,68850,68858,68899,68912,68921,68928,68965,68974,68997,69006,69007,69216,69246,69248,69289,69293,69293,69296,69297,69314,69319,69328,69336,69372,69372,69376,69415,69424,69445,69457,69465,69488,69505,69510,69513,69552,69579,69600,69622,69632,69701,69703,69709,69714,69743,69745,69749,69760,69785,69787,69787,69789,69802,69804,69816,69819,69826,69837,69837,69840,69864,69872,69881,69891,69926,69928,69933,69936,69938,69942,69959,69968,70002,70004,70006,70016,70079,70081,70089,70091,70111,70113,70132,70144,70161,70163,70196,70199,70209,70272,70278,70280,70280,70282,70285,70287,70301,70303,70313,70320,70376,70384,70393,70400,70403,70405,70412,70415,70416,70419,70440,70442,70448,70450,70451,70453,70457,70461,70461,70463,70468,70471,70472,70480,70480,70493,70499,70528,70530,70532,70532,70534,70537,70539,70539,70544,70544,70546,70581,70583,70583,70585,70586,70588,70592,70602,70602,70604,70605,70609,70613,70615,70616,70625,70626,70656,70721,70723,70725,70727,70747,70749,70749,70751,70753,70784,70831,70833,70841,70847,70849,70852,70855,70864,70873,71040,71086,71088,71093,71096,71097,71100,71102,71105,71133,71168,71230,71232,71236,71248,71257,71264,71276,71296,71349,71352,71353,71360,71369,71376,71395,71424,71450,71453,71466,71472,71494,71680,71736,71739,71739,71840,71922,71935,71942,71945,71945,71948,71955,71957,71958,71960,71983,71985,71989,71991,71991,71995,71996,71999,72002,72004,72006,72016,72025,72096,72103,72106,72151,72154,72159,72161,72164,72192,72243,72245,72262,72272,72344,72346,72354,72368,72440,72448,72457,72544,72551,72640,72673,72688,72697,72704,72712,72714,72758,72760,72766,72768,72773,72784,72812,72816,72847,72850,72871,72873,72886,72960,72966,72968,72969,72971,73014,73018,73018,73020,73021,73023,73025,73027,73027,73030,73031,73040,73049,73056,73061,73063,73064,73066,73102,73104,73105,73107,73110,73112,73112,73120,73129,73136,73179,73184,73193,73440,73464,73472,73488,73490,73530,73534,73536,73539,73562,73648,73648,73664,73713,73727,74649,74752,74862,74864,74868,74880,75075,77712,77810,77824,78933,78944,82938,82944,83526,90368,90397,90410,90414,90416,90425,92160,92728,92736,92766,92768,92777,92782,92862,92864,92873,92880,92909,92917,92917,92928,92975,92983,92997,93008,93017,93019,93025,93027,93047,93053,93071,93504,93542,93547,93561,93760,93850,93856,93880,93883,93907,93952,94026,94031,94087,94095,94111,94176,94180,94194,94198,94208,101589,101631,101662,101760,101874,110576,110579,110581,110587,110589,110590,110592,110882,110898,110898,110928,110930,110933,110933,110948,110951,110960,111355,113664,113770,113776,113788,113792,113800,113808,113817,113820,113821,113823,113827,117760,118012,118016,118451,118458,118480,118496,118512,118528,118573,118576,118598,118608,118723,118784,119029,119040,119078,119081,119133,119146,119148,119155,119162,119171,119172,119180,119209,119214,119226,119233,119274,119296,119361,119365,119365,119488,119507,119520,119539,119552,119638,119648,119672,119808,119892,119894,119964,119966,119967,119970,119970,119973,119974,119977,119980,119982,119993,119995,119995,119997,120003,120005,120069,120071,120074,120077,120084,120086,120092,120094,120121,120123,120126,120128,120132,120134,120134,120138,120144,120146,120485,120488,120779,120782,121483,121499,121503,121505,121519,122624,122654,122661,122666,122928,122989,123136,123180,123191,123197,123200,123209,123214,123215,123536,123565,123584,123627,123632,123641,123647,123647,124112,124139,124144,124153,124368,124397,124400,124410,124415,124415,124608,124638,124640,124642,124644,124645,124647,124653,124656,124660,124670,124671,124896,124902,124904,124907,124909,124910,124912,124926,124928,125124,125127,125135,125184,125251,125259,125259,125264,125273,125278,125279,126065,126132,126209,126269,126464,126467,126469,126495,126497,126498,126500,126500,126503,126503,126505,126514,126516,126519,126521,126521,126523,126523,126530,126530,126535,126535,126537,126537,126539,126539,126541,126543,126545,126546,126548,126548,126551,126551,126553,126553,126555,126555,126557,126557,126559,126559,126561,126562,126564,126564,126567,126570,126572,126578,126580,126583,126585,126588,126590,126590,126592,126601,126603,126619,126625,126627,126629,126633,126635,126651,126704,126705,126976,127019,127024,127123,127136,127150,127153,127167,127169,127183,127185,127221,127232,127405,127462,127490,127504,127547,127552,127560,127568,127569,127584,127589,127744,128728,128732,128748,128752,128764,128768,128985,128992,129003,129008,129008,129024,129035,129040,129095,129104,129113,129120,129159,129168,129197,129200,129211,129216,129217,129232,129240,129280,129623,129632,129645,129648,129660,129664,129674,129678,129734,129736,129736,129741,129756,129759,129770,129775,129784,129792,129938,129940,130042,131072,173791,173824,178205,178208,183981,183984,191456,191472,192093,196608,201546,201552,210041,917505,917505,917536,917631,917760,917999,983040,1048573,1048576,1114109]}var Dt,Ot=t((()=>{}));function kt(e){if(!Number.isInteger(e))return!1;let t=Et(),n=0,r=t.length/2-1;for(;n<=r;){let i=n+r>>>1;if(e<t[i*2])r=i-1;else if(e>t[i*2+1])n=i+1;else return!0}return!1}var At=t((()=>{Ot()}));function jt(e,t){let n=e.fieldType===`slidenum`&&t!==void 0?String(t):e.text;return e.caps===`all`||e.caps===`small`?n.toUpperCase():n}var Mt=t((()=>{})),Nt=n({collectSlideFontDemand:()=>Pt});function Pt(e,t,n){let r=new Set,i=2;if(i>n)return`all`;let a=e=>{if(xt(e))return!1;for(let a of e){let e=a.codePointAt(0);if(!kt(e)||e>=61472&&e<=61695)return!1;if(!t.has(e)&&!r.has(e)){if(i+=String(e).length+1,i>n)return!1;r.add(e)}}return!0},o=t=>{if(!t)return!0;if(t.vert&&t.vert!==`horz`||`textWarp`in t)return!1;for(let n of t.paragraphs){if(n.rtl||n.bullet?.type!==`none`&&n.bullet?.type!==`inherit`)return!1;for(let t of n.runs)if(t.type!==`break`&&(t.type!==`text`||t.fontFamilySym||t.fieldType&&t.fieldType!==`slidenum`||!a(t.text)||!a(jt(t,e.slideNumber))))return!1}return!0};if(e.parseError||!a(`Mii `))return`all`;for(let t of e.elements)if(t.type===`shape`){if(!o(t.textBody))return`all`}else if(t.type===`table`){for(let e of t.rows)for(let t of e.cells)if(!o(t.textBody))return`all`}else return`all`;return[...r]}var Ft=t((()=>{A(),Tt(),At(),Mt()}));async function It(e){return e?(await Promise.resolve().then(()=>(Ft(),Nt))).collectSlideFontDemand:void 0}function j(e,t){if(!Number.isSafeInteger(e)||e<0)throw Error(`${t} must be a non-negative safe integer`)}function M(e,t,n){return j(e,`resource measurement`),j(t,`resource measurement`),j(n,`resource measurement limit`),e>n||t>n||t>n-e?n===2**53-1?n:n+1:e+t}function Lt(e,t=2**53-1){j(t,`resource measurement limit`);let n=0;for(let r=0;r<e.length;r+=1){let i=e.charCodeAt(r),a;if(i<=127)a=1;else if(i<=2047)a=2;else if(i>=55296&&i<=56319&&r+1<e.length){let t=e.charCodeAt(r+1);t>=56320&&t<=57343?(a=4,r+=1):a=3}else a=3;if(n=M(n,a,t),n>t)return n}return n}function Rt(e,t=2**53-1){j(t,`resource measurement limit`);let n=M(0,2,t);if(n>t)return n;for(let r=0;r<e.length;r+=1){let i=e.charCodeAt(r),a;if(i===34||i===92||i===8||i===9||i===10||i===12||i===13)a=2;else if(i<=31)a=6;else if(i<=127)a=1;else if(i<=2047)a=2;else if(i>=55296&&i<=56319&&r+1<e.length){let t=e.charCodeAt(r+1);t>=56320&&t<=57343?(a=4,r+=1):a=6}else a=i>=55296&&i<=57343?6:3;if(n=M(n,a,t),n>t)return n}return n}function N(e,t){return M(0,e,t)}function P(e,t=2**53-1,n=!1){if(j(t,`resource measurement limit`),e===null)return{jsonBytes:N(4,t),stringValueUtf8Bytes:0};if(typeof e==`string`)return{jsonBytes:Rt(e,t),stringValueUtf8Bytes:Lt(e,t)};if(typeof e==`boolean`)return{jsonBytes:N(e?4:5,t),stringValueUtf8Bytes:0};if(typeof e==`number`)return{jsonBytes:N((Number.isFinite(e)?String(Object.is(e,-0)?0:e):`null`).length,t),stringValueUtf8Bytes:0};if(typeof e==`bigint`)throw TypeError(`BigInt values cannot be serialized to JSON`);if(Array.isArray(e)){let n=N(2,t),r=0;for(let i=0;i<e.length;i+=1){i!==0&&(n=M(n,1,t));let a=P(e[i],t,!0);n=M(n,a.jsonBytes,t),r=M(r,a.stringValueUtf8Bytes,t)}return{jsonBytes:n,stringValueUtf8Bytes:r}}if(typeof e==`object`){let n=N(2,t),r=0,i=0;for(let[a,o]of Object.entries(e)){if(o===void 0||typeof o==`function`||typeof o==`symbol`)continue;i++!==0&&(n=M(n,1,t)),n=M(n,Rt(a,t),t),n=M(n,1,t);let e=P(o,t);n=M(n,e.jsonBytes,t),r=M(r,e.stringValueUtf8Bytes,t)}return{jsonBytes:n,stringValueUtf8Bytes:r}}return{jsonBytes:n?N(4,t):0,stringValueUtf8Bytes:0}}A(),{...h,...ae};function*zt(e){for(let t of e?.paragraphs??[])for(let e of t.runs)e.type===`text`&&(yield e.text)}function*Bt(e){for(let t of e?.paragraphs??[]){t.defFontFamily&&(yield t.defFontFamily);for(let e of t.runs)e.type===`text`&&(e.fontFamily&&(yield e.fontFamily),e.fontFamilyEa&&(yield e.fontFamilyEa),e.fontFamilyCs&&(yield e.fontFamilyCs),e.fontFamilySym&&(yield e.fontFamilySym))}}function*Vt(e){for(let t of e.elements)if(t.type===`shape`)yield*zt(t.textBody);else if(t.type===`table`)for(let e of t.rows)for(let t of e.cells)yield*zt(t.textBody);else if(t.type===`chart`){t.chart.title&&(yield t.chart.title);for(let e of t.chart.categories)yield e;for(let e of t.chart.series)e.name&&(yield e.name)}}var Ht=class e{scripts;families;constructor(e,t,n,r,i,a=new Set){this.majorFont=e,this.minorFont=t,this.fallback=i,this.scriptNames=a;let o=v(e)??v(t)??i??null;this.scripts=n??new oe(o),this.families=r??new Set,e&&this.families.add(e),t&&this.families.add(t)}addSlide(e){this.scripts.addText(Vt(e));for(let t of te(Vt(e),v(this.majorFont)??v(this.minorFont)??this.fallback??null))this.scriptNames.add(t);for(let t of e.elements)if(t.type===`shape`)for(let e of Bt(t.textBody))this.families.add(e);else if(t.type===`table`)for(let e of t.rows)for(let t of e.cells)for(let e of Bt(t.textBody))this.families.add(e)}names(){return[...new Set([...this.families,...this.scripts.names(),...this.scriptNames])]}withSlide(t){let n=new e(this.majorFont,this.minorFont,this.scripts.clone(),new Set(this.families),this.fallback,new Set(this.scriptNames));return n.addSlide(t),n}};A(),k();const Ut=Object.freeze({archiveEntryCount:0,declaredInflatedBytes:0,distinctInflatedBytes:0,operationInflatedBytes:0}),Wt=u;function F(e,t){if(e!==null&&typeof e!=`string`)throw Error(`invalid PPTX presentation bootstrap ${t}`)}function Gt(e,t){if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`invalid PPTX presentation bootstrap slide at ${t}`);let n=e;if(n.index!==t)throw Error(`invalid PPTX presentation bootstrap slide index ${n.index}`);if(n.partName!==void 0&&typeof n.partName!=`string`)throw Error(`invalid PPTX presentation bootstrap slide partName at ${t}`);return Object.freeze({index:n.index,...n.partName===void 0?{}:{partName:n.partName}})}function Kt(e,t){if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`invalid PPTX presentation bootstrap embedded font at ${t}`);let n=e;if(typeof n.fontName!=`string`||n.fontName.length===0||![`regular`,`bold`,`italic`,`boldItalic`].includes(n.style??``)||typeof n.partPath!=`string`||n.partPath.length===0||n.partPath.startsWith(`/`)||n.partPath.split(`/`).includes(`..`)||![`application/x-font-ttf`,`application/x-fontdata`].includes(n.contentType??``))throw Error(`invalid PPTX presentation bootstrap embedded font fields at ${t}`);return Object.freeze({fontName:n.fontName,style:n.style,partPath:n.partPath,contentType:n.contentType})}function qt(e){if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`invalid PPTX presentation bootstrap payload`);let t=e;if(!Number.isSafeInteger(t.slideCount)||(t.slideCount??-1)<0||!Number.isSafeInteger(t.slideWidth)||(t.slideWidth??0)<=0||!Number.isSafeInteger(t.slideHeight)||(t.slideHeight??0)<=0||!Array.isArray(t.embeddedFonts)||!Array.isArray(t.slides)||t.slides.length!==t.slideCount)throw Error(`invalid PPTX presentation bootstrap dimensions or slide count`);return F(t.defaultTextColor,`defaultTextColor`),F(t.majorFont,`majorFont`),F(t.minorFont,`minorFont`),F(t.hlinkColor,`hlinkColor`),F(t.folHlinkColor,`folHlinkColor`),Object.freeze({slideCount:t.slideCount,slideWidth:t.slideWidth,slideHeight:t.slideHeight,defaultTextColor:t.defaultTextColor,majorFont:t.majorFont,minorFont:t.minorFont,hlinkColor:t.hlinkColor,folHlinkColor:t.folHlinkColor,embeddedFonts:Object.freeze(t.embeddedFonts.map(Kt)),slides:Object.freeze(t.slides.map(Gt))})}function Jt(e){return Object.freeze({type:`media`,x:e.x,y:e.y,width:e.width,height:e.height,rotation:e.rotation,flipH:e.flipH,flipV:e.flipV,mediaKind:e.mediaKind,posterPath:e.posterPath,posterMimeType:e.posterMimeType,mediaPath:e.mediaPath,mimeType:e.mimeType})}function Yt(e){return Object.freeze({...e.id===void 0?{}:{id:e.id},...e.authorId===void 0?{}:{authorId:e.authorId},...e.author===void 0?{}:{author:e.author},...e.date===void 0?{}:{date:e.date},...e.status===void 0?{}:{status:e.status},text:e.text})}function Xt(e){return Object.freeze({...e})}function Zt(e){return Object.freeze({...e.authorId===void 0?{}:{authorId:e.authorId},...e.modernAuthorId===void 0?{}:{modernAuthorId:e.modernAuthorId},...e.id===void 0?{}:{id:e.id},...e.index===void 0?{}:{index:e.index},...e.author===void 0?{}:{author:e.author},...e.date===void 0?{}:{date:e.date},...e.x===void 0?{}:{x:e.x},...e.y===void 0?{}:{y:e.y},...e.anchors?.length?{anchors:Object.freeze(e.anchors.map(Xt))}:{},...e.status===void 0?{}:{status:e.status},text:e.text,...e.replies?.length?{replies:Object.freeze(e.replies.map(Yt))}:{}})}function Qt(e,t){if(e.index!==t.index||e.partName!==t.partName)throw Error(`PPTX pulled slide identity does not match bootstrap index ${t.index}`);return Object.freeze({index:t.index,...t.partName===void 0?{}:{partName:t.partName},notes:e.notes??null,hidden:e.hidden??!1,mediaElements:Object.freeze(e.elements.filter(e=>e.type===`media`).map(Jt)),...e.comments?.length?{comments:Object.freeze(e.comments.map(Zt))}:{}})}function $t(e,t,n){if(!(e<=t))throw new i(`PPTX presentation preflight exceeded its hard limit of ${t} projected bytes`,{stage:`parsing`,violation:{format:`pptx`,operation:`presentation-preflight`,resource:`presentation-preflight`,metric:`projected-bytes`,limit:t,observed:Math.min(e,t+1),configurable:!1,usage:n}})}var en=class{slideCountValue;slideWidthValue;slideHeightValue;defaultTextColorValue;majorFontValue;minorFontValue;hlinkColorValue;folHlinkColorValue;embeddedFontsValue;descriptors;slides=[];fonts;fontPreloadNames;fontProjectionBytes;projectionBytesValue;limit;pending=null;finished=null;demandPoints;demandAll=!1;demandBytes=0;demandMembershipBytes=0;demandDeltaBytes=0;collectFontDemand;demandDelta;constructor(e,t={}){let n=qt(e),r=t.hardLimitForTesting??Wt;if(!Number.isSafeInteger(r)||r<=0||r>Wt)throw Error(`invalid PPTX presentation preflight test limit`);this.limit=r,this.collectFontDemand=t.collectFontDemand,this.demandPoints=this.collectFontDemand?new Set:void 0,this.demandBytes=this.collectFontDemand?P({fontPreloadDemand:[]},this.limit).jsonBytes-1:0,this.demandMembershipBytes=this.demandBytes,this.slideCountValue=n.slideCount,this.slideWidthValue=n.slideWidth,this.slideHeightValue=n.slideHeight,this.defaultTextColorValue=n.defaultTextColor,this.majorFontValue=n.majorFont,this.minorFontValue=n.minorFont,this.hlinkColorValue=n.hlinkColor,this.folHlinkColorValue=n.folHlinkColor,this.embeddedFontsValue=n.embeddedFonts,this.descriptors=[...n.slides],this.fonts=new Ht(this.majorFontValue,this.minorFontValue,void 0,void 0,t.cjkFallback),this.fontPreloadNames=Object.freeze(this.fonts.names()),this.fontProjectionBytes=P(this.fontPreloadNames,this.limit).jsonBytes,this.projectionBytesValue=P({slideCount:this.slideCountValue,slideWidth:this.slideWidthValue,slideHeight:this.slideHeightValue,defaultTextColor:this.defaultTextColorValue,majorFont:this.majorFontValue,minorFont:this.minorFontValue,hlinkColor:this.hlinkColorValue,folHlinkColor:this.folHlinkColorValue,embeddedFonts:this.embeddedFontsValue,remainingSlides:this.descriptors,slides:[],fontPreloadNames:this.fontPreloadNames},this.limit).jsonBytes,this.projectionBytesValue+this.demandBytes>this.limit&&(this.demandAll=!0,this.demandBytes=0,this.demandMembershipBytes=0),this.projectionBytesValue=M(this.projectionBytesValue,this.demandBytes,this.limit),$t(this.projectionBytesValue,this.limit,Ut)}get acceptedSlideCount(){return this.finished?.slideCount??this.slides.length}get projectedBytes(){return this.projectionBytesValue}get remainingDescriptorCount(){return this.descriptors.reduce((e,t)=>e+Number(t!==void 0),0)}get latestSlide(){return this.slides[this.slides.length-1]}get currentFontPreloadNames(){return this.fontPreloadNames}get currentFontPreloadDemandDelta(){return this.demandDelta}snapshot(){if(this.finished)return this.finished;if(this.pending)throw Error(`PPTX presentation preflight has an uncommitted slide`);return Object.freeze({slideCount:this.slideCountValue,slideWidth:this.slideWidthValue,slideHeight:this.slideHeightValue,defaultTextColor:this.defaultTextColorValue,majorFont:this.majorFontValue,minorFont:this.minorFontValue,hlinkColor:this.hlinkColorValue,folHlinkColor:this.folHlinkColorValue,embeddedFonts:this.embeddedFontsValue,slides:Object.freeze([...this.slides]),fontPreloadNames:this.fontPreloadNames})}addSlide(e,t=Ut){this.prepareSlide(e,t).commit()}prepareSlide(e,t=Ut){if(this.finished)throw Error(`PPTX presentation preflight is already finished`);if(this.pending)throw Error(`PPTX presentation preflight already has a prepared slide`);let n=this.slides.length,r=this.descriptors[n];if(!r)throw Error(`PPTX presentation preflight received an extra slide`);let i=Qt(e,r),a=this.fonts.withSlide(e),o=Object.freeze(a.names()),s=P(o,this.limit).jsonBytes,c=P(i,this.limit).jsonBytes,l=this.projectionBytesValue-this.demandBytes-this.fontProjectionBytes-P(r,this.limit).jsonBytes+4;l=M(l,s,this.limit),l=M(l,c,this.limit),this.slides.length!==0&&(l=M(l,1,this.limit));let u=P({slide:i,fontPreloadNames:o},this.limit).jsonBytes,d=M(this.projectionBytesValue-this.demandBytes,u,this.limit),f=l;$t(Math.max(d,f),this.limit,t);let p=d+this.demandBytes;l+=this.demandBytes,Math.max(p,l)>this.limit&&this.demandBytes&&(this.projectionBytesValue-=this.demandBytes,this.demandBytes=0,this.demandMembershipBytes=0,this.demandDeltaBytes=0,this.demandPoints?.clear(),this.demandAll=!0,this.demandDelta=`all`,p=d,l=f);let m,h=this.demandBytes,g=this.demandMembershipBytes,_=this.demandDeltaBytes;if(this.collectFontDemand){let t=P([],this.limit).jsonBytes,n=this.limit-p,r=this.limit-f-this.demandMembershipBytes,i=Math.min(n,Math.floor((r+t-Number((this.demandPoints?.size??0)>0))/2));if(m=this.demandAll?`all`:this.collectFontDemand(e,this.demandPoints,Math.max(0,i)),m===`all`)h=0,g=0,_=0;else{_=P(m,this.limit).jsonBytes;let e=m.length===0?0:_-t+Number((this.demandPoints?.size??0)>0);g+=e,h=g+_,p+=_}l=f+h}$t(Math.max(p,l),this.limit,t);let v={state:`prepared`,fact:i,fonts:a,fontNames:o,fontBytes:s,committedBytes:l,demandDelta:m,demandBytes:h,demandMembershipBytes:g,demandDeltaBytes:_};return this.pending=v,{projectedBytes:p,commit:()=>{if(v.state!==`committed`){if(v.state===`rolled-back`)throw Error(`PPTX presentation preflight cannot commit a rolled-back slide`);if(this.pending!==v)throw Error(`PPTX presentation preflight prepared slide is stale`);if(this.descriptors[n]=void 0,this.slides.push(v.fact),this.fonts=v.fonts,this.fontPreloadNames=v.fontNames,this.fontProjectionBytes=v.fontBytes,this.projectionBytesValue=v.committedBytes,this.demandDelta=v.demandDelta,v.demandDelta===`all`)this.demandAll=!0,this.demandPoints?.clear();else for(let e of v.demandDelta??[])this.demandPoints?.add(e);this.demandBytes=v.demandBytes,this.demandMembershipBytes=v.demandMembershipBytes,this.demandDeltaBytes=v.demandDeltaBytes,v.state=`committed`,this.pending=null}},rollback:()=>{if(v.state!==`rolled-back`){if(v.state===`committed`)throw Error(`PPTX presentation preflight cannot roll back a committed slide`);if(this.pending!==v)throw Error(`PPTX presentation preflight prepared slide is stale`);v.state=`rolled-back`,this.pending=null}}}}finish(){if(this.finished)return this.finished;if(this.pending)throw Error(`PPTX presentation preflight has an uncommitted slide`);if(this.slides.length!==this.slideCountValue)throw Error(`PPTX presentation preflight is incomplete: ${this.slides.length}/${this.slideCountValue} slides`);return this.finished=Object.freeze({slideCount:this.slideCountValue,slideWidth:this.slideWidthValue,slideHeight:this.slideHeightValue,defaultTextColor:this.defaultTextColorValue,majorFont:this.majorFontValue,minorFont:this.minorFontValue,hlinkColor:this.hlinkColorValue,folHlinkColor:this.folHlinkColorValue,embeddedFonts:this.embeddedFontsValue,slides:Object.freeze([...this.slides]),fontPreloadNames:this.fontPreloadNames,...this.collectFontDemand&&!this.demandAll&&this.demandBytes?{fontPreloadDemand:Object.freeze([...this.demandPoints??[]])}:{}}),this.demandPoints?.clear(),this.demandDelta=void 0,this.descriptors=[],this.slides=[],this.projectionBytesValue=P(this.finished,this.limit).jsonBytes,this.finished}};k();function tn(e){try{return ze(e(e=>e.slide_cursor_resource_usage()))}catch(e){if(String(e).includes(`slide cursor usage is unavailable`))return;throw e}}function nn(e,t,n,r,i){let a,o;try{if(i){if(!r)throw Error(`slide payload is missing before acknowledgement`);let t=i(n,r,tn(e));typeof t==`function`?a=t:t&&({rollback:a,commit:o}=t)}e(e=>e.acknowledge_slide(t.operationId,t.generation)),o?.()}catch(e){try{a?.()}catch{}throw e}}A(),k();var rn=class{coordinatorGeneration=new vt;sessions=new Map;pendingOpens=new Map;operationTail=Promise.resolve();resourceFailure;lifecycleState=`ready`;resetBarrier;resetIdentities=new Map;constructor(e,t,n=e=>e(this.requireArchive())){this.archive=e,this.acceptSlide=t,this.executeArchive=n}get coordinator(){return this.coordinatorGeneration}reserveOpen(e){if(this.assertReady(),on(e),this.pendingOpens.has(e.sessionId)||this.sessions.has(e.sessionId))throw Error(`slide pull session id is already reserved`);this.pendingOpens.set(e.sessionId,{identity:e,canceled:!1})}abandonOpen(e){this.pendingOpens.delete(e)}get pendingOpenCount(){return this.pendingOpens.size}async open(e,t){if(this.assertReady(),this.resourceFailure)throw this.resourceFailure;if(!Number.isSafeInteger(e)||e<0)throw RangeError(`slide index must be a non-negative safe integer`);let n=this.pendingOpens.get(t.sessionId);if(!n||!I(n.identity,t))throw Error(`slide pull session open reservation is stale or missing`);let r,i=new Promise(e=>{r=e}),a=this.operationTail.then(()=>this.coordinator.enqueue(async()=>{if(n.canceled)throw Error(`slide pull session open was canceled`);let i,a=!1,o=new yt({...t,maxByteCredit:l,coordinator:this.coordinator,driver:{pull:n=>{let r;try{r=this.executeArchive(r=>r.pull_slide(e,t.operationId,t.generation,n))}catch(e){throw Pe(e,n,l)||(this.latchResourceFailure(e),e)}let o=pt(r);return this.acceptSlide&&(i=JSON.parse(new TextDecoder().decode(new Uint8Array(o)))),a=!0,{payload:o,byteLength:o.byteLength,done:!0,transfer:[o]}},measureChunk:({payload:e})=>e.byteLength,acknowledge:()=>{if(!a)throw Error(`slide unit is not awaiting acknowledgement`);try{nn(this.executeArchive,t,e,i,this.acceptSlide)}catch(e){throw this.latchResourceFailure(e),e}a=!1,i=void 0,this.sessions.delete(t.sessionId),r()},cancel:async()=>{try{this.archive()&&await this.executeArchive(e=>e.cancel_slide())}finally{i=void 0,a=!1,this.sessions.delete(t.sessionId),r()}},close:async()=>{try{this.archive()&&await this.executeArchive(e=>e.cancel_slide())}finally{i=void 0,a=!1,this.sessions.delete(t.sessionId),r()}},resourceUsage:()=>{try{return this.readResourceUsage()}catch(e){throw this.latchResourceFailure(e),e}}}});this.sessions.set(t.sessionId,{host:o,identity:t}),this.pendingOpens.delete(t.sessionId)}));this.operationTail=a.then(()=>i,()=>void 0);try{await a}catch(e){throw this.pendingOpens.delete(t.sessionId),r(),e}}async postOpenedSafely(e,t,n){if(this.lifecycleState!==`ready`){try{n(this.lifecycleError())}catch{}return}try{t()}catch(t){await this.closeIdentity(e);try{n(t)}catch{}}}dispatch(e,t){if(this.lifecycleState!==`ready`)return t(this.responseDuringReset(e)),Promise.resolve();let n=this.sessions.get(e.sessionId);if(n)return n.host.dispatch(e,t);let r=this.pendingOpens.get(e.sessionId);if(r&&(e.kind===`cancel`||e.kind===`close`)){let n=I(r.identity,e);return n&&(r.canceled=!0),t(n?{protocol:O,kind:`accepted`,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,command:e.kind}:this.staleLifecycleResponse(e)),Promise.resolve()}return e.kind===`cancel`||e.kind===`close`?(t({protocol:O,kind:`accepted`,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,command:e.kind}),Promise.resolve()):(t({protocol:O,kind:`error`,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,error:w(Error(`slide pull session is not open`))}),Promise.resolve())}async dispatchSafely(e,t){try{await this.dispatch(e,t)}catch(n){try{t({protocol:O,kind:`error`,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,error:w(n)})}catch{}}}run(e){if(this.lifecycleState!==`ready`)return Promise.reject(this.lifecycleError());let t=this.operationTail.then(()=>this.coordinator.enqueue(async()=>{if(this.resourceFailure)throw this.resourceFailure;return e()})).catch(e=>{throw this.latchResourceFailure(e),e});return this.operationTail=t.then(()=>void 0,()=>void 0),t}reset(){if(this.resetBarrier)return this.resetBarrier;this.lifecycleState=`resetting`,this.captureResetIdentities();let e=this.performReset().then(()=>{this.resetIdentities.clear(),this.lifecycleState=`ready`},e=>{throw this.lifecycleState=`reset-failed`,e}).finally(()=>{this.resetBarrier===e&&(this.resetBarrier=void 0)});return this.resetBarrier=e,e}async performReset(){for(let e of this.pendingOpens.values())e.canceled=!0;let e=1;for(let{host:t,identity:n}of[...this.sessions.values()]){let r;if(await t.dispatch({protocol:O,kind:`close`,...n,requestId:e++},e=>{e.kind===`error`&&(r=nt(e.error))}),r)throw r}this.sessions.clear(),await this.operationTail,this.pendingOpens.clear(),this.archive()&&await this.executeArchive(e=>e.close_presentation_session()),this.coordinatorGeneration=new vt,this.resourceFailure=void 0}assertReady(){if(this.lifecycleState!==`ready`)throw this.lifecycleError()}lifecycleError(){let e=this.lifecycleState===`reset-failed`,t=Error(e?`slide pull worker reset failed; retry reset before new work`:`slide pull worker reset is in progress`);return t.name=`PullSessionLifecycleError`,Object.assign(t,{code:e?`ooxml-pull-reset-failed`:`ooxml-pull-resetting`})}captureResetIdentities(){for(let{identity:e}of this.sessions.values())this.resetIdentities.set(e.sessionId,e);for(let{identity:e}of this.pendingOpens.values())this.resetIdentities.set(e.sessionId,e)}responseDuringReset(e){if(e.kind===`cancel`||e.kind===`close`){let t=this.resetIdentities.get(e.sessionId);return t&&!I(t,e)?this.staleLifecycleResponse(e):{protocol:O,kind:`accepted`,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,command:e.kind}}return{protocol:O,kind:`error`,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,error:w(this.lifecycleError())}}requireArchive(){let e=this.archive();if(!e)throw Error(`Presentation not loaded`);return e}async closeIdentity(e){if(this.lifecycleState!==`ready`)return;let t=this.sessions.get(e.sessionId);if(t){await t.host.dispatch({protocol:O,kind:`close`,...e,requestId:1},()=>void 0);return}let n=this.pendingOpens.get(e.sessionId);n&&I(n.identity,e)&&(n.canceled=!0)}readResourceUsage(){return tn(this.executeArchive)}latchResourceFailure(e){let t=e instanceof i?e:Je(e);t&&(this.resourceFailure??=t)}staleLifecycleResponse(e){return{protocol:O,kind:`error`,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,error:{message:`stale lifecycle targets another slide operation`,errorName:`PullSessionProtocolError`,code:`ooxml-stale-lifecycle`}}}};function an(e){return!!e&&typeof e==`object`&&e.protocol===`ooxml-pull-v1`}function on(e){if(!Number.isSafeInteger(e.sessionId)||e.sessionId<=0)throw RangeError(`session id must be a positive safe integer`);if(!Number.isSafeInteger(e.operationId)||e.operationId<=0)throw RangeError(`operation id must be a positive safe integer`);if(!Number.isSafeInteger(e.generation)||e.generation<=0)throw RangeError(`generation must be a positive safe integer`)}function I(e,t){return e.sessionId===t.sessionId&&e.operationId===t.operationId&&e.generation===t.generation}var sn=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,ln.unregister(this),e}free(){let e=this.__destroy_into_raw();J.__wbg_pptxarchive_free(e,0)}acknowledge_slide(e,t){let n=J.pptxarchive_acknowledge_slide(this.__wbg_ptr,e,t);if(n[1])throw W(n[0])}assert_healthy(){let e=J.pptxarchive_assert_healthy(this.__wbg_ptr);if(e[1])throw W(e[0])}cancel_slide(){J.pptxarchive_cancel_slide(this.__wbg_ptr)}close_presentation_session(){J.pptxarchive_close_presentation_session(this.__wbg_ptr)}extract_font(e){let t=U(e,J.__wbindgen_malloc,J.__wbindgen_realloc),n=q,r=J.pptxarchive_extract_font(this.__wbg_ptr,t,n);if(r[3])throw W(r[2]);var i=L(r[0],r[1]).slice();return J.__wbindgen_free(r[0],r[1]*1,1),i}extract_image(e){let t=U(e,J.__wbindgen_malloc,J.__wbindgen_realloc),n=q,r=J.pptxarchive_extract_image(this.__wbg_ptr,t,n);if(r[3])throw W(r[2]);var i=L(r[0],r[1]).slice();return J.__wbindgen_free(r[0],r[1]*1,1),i}extract_media(e){let t=U(e,J.__wbindgen_malloc,J.__wbindgen_realloc),n=q,r=J.pptxarchive_extract_media(this.__wbg_ptr,t,n);if(r[3])throw W(r[2]);var i=L(r[0],r[1]).slice();return J.__wbindgen_free(r[0],r[1]*1,1),i}constructor(e,t,n,r){let i=dn(e,J.__wbindgen_malloc),a=q,o=J.pptxarchive_new(i,a,!H(t),H(t)?BigInt(0):t,!H(n),H(n)?BigInt(0):n,!H(r),H(r)?BigInt(0):r);if(o[2])throw W(o[1]);return this.__wbg_ptr=o[0]>>>0,ln.register(this,this.__wbg_ptr,this),this}parse(){let e=J.pptxarchive_parse(this.__wbg_ptr);if(e[3])throw W(e[2]);var t=L(e[0],e[1]).slice();return J.__wbindgen_free(e[0],e[1]*1,1),t}presentation_bootstrap(){let e=J.pptxarchive_presentation_bootstrap(this.__wbg_ptr);if(e[3])throw W(e[2]);var t=L(e[0],e[1]).slice();return J.__wbindgen_free(e[0],e[1]*1,1),t}pull_slide(e,t,n,r){let i=J.pptxarchive_pull_slide(this.__wbg_ptr,e,t,n,r);if(i[3])throw W(i[2]);var a=L(i[0],i[1]).slice();return J.__wbindgen_free(i[0],i[1]*1,1),a}resource_usage(){let e=J.pptxarchive_resource_usage(this.__wbg_ptr);if(e[3])throw W(e[2]);var t=L(e[0],e[1]).slice();return J.__wbindgen_free(e[0],e[1]*1,1),t}slide_cursor_resource_usage(){let e=J.pptxarchive_slide_cursor_resource_usage(this.__wbg_ptr);if(e[3])throw W(e[2]);var t=L(e[0],e[1]).slice();return J.__wbindgen_free(e[0],e[1]*1,1),t}to_markdown(){let e,t;try{let i=J.pptxarchive_to_markdown(this.__wbg_ptr);var n=i[0],r=i[1];if(i[3])throw n=0,r=0,W(i[2]);return e=n,t=r,z(n,r)}finally{J.__wbindgen_free(e,t,1)}}};Symbol.dispose&&(sn.prototype[Symbol.dispose]=sn.prototype.free);function cn(){return{__proto__:null,\"./pptx_parser_bg.js\":{__proto__:null,__wbg___wbindgen_throw_6b64449b9b9ed33c:function(e,t){throw Error(z(e,t))},__wbg_error_a6fa202b58aa1cd3:function(e,t){let n,r;try{n=e,r=t,console.error(z(e,t))}finally{J.__wbindgen_free(n,r,1)}},__wbg_new_227d7c05414eb861:function(){return Error()},__wbg_stack_3b0d974bbf31e44f:function(e,t){let n=t.stack,r=U(n,J.__wbindgen_malloc,J.__wbindgen_realloc),i=q;un().setInt32(e+4,i,!0),un().setInt32(e+0,r,!0)},__wbindgen_cast_0000000000000001:function(e,t){return z(e,t)},__wbindgen_init_externref_table:function(){let e=J.__wbindgen_externrefs,t=e.grow(4);e.set(0,void 0),e.set(t+0,void 0),e.set(t+1,null),e.set(t+2,!0),e.set(t+3,!1)}}}}const ln=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>J.__wbg_pptxarchive_free(e>>>0,1));function L(e,t){return e>>>=0,V().subarray(e/1,e/1+t)}let R=null;function un(){return(R===null||R.buffer.detached===!0||R.buffer.detached===void 0&&R.buffer!==J.memory.buffer)&&(R=new DataView(J.memory.buffer)),R}function z(e,t){return e>>>=0,pn(e,t)}let B=null;function V(){return(B===null||B.byteLength===0)&&(B=new Uint8Array(J.memory.buffer)),B}function H(e){return e==null}function dn(e,t){let n=t(e.length*1,1)>>>0;return V().set(e,n/1),q=e.length,n}function U(e,t,n){if(n===void 0){let n=K.encode(e),r=t(n.length,1)>>>0;return V().subarray(r,r+n.length).set(n),q=n.length,r}let r=e.length,i=t(r,1)>>>0,a=V(),o=0;for(;o<r;o++){let t=e.charCodeAt(o);if(t>127)break;a[i+o]=t}if(o!==r){o!==0&&(e=e.slice(o)),i=n(i,r,r=o+e.length*3,1)>>>0;let t=V().subarray(i+o,i+r),a=K.encodeInto(e,t);o+=a.written,i=n(i,r,o,1)>>>0}return q=o,i}function W(e){let t=J.__wbindgen_externrefs.get(e);return J.__externref_table_dealloc(e),t}let G=new TextDecoder(`utf-8`,{ignoreBOM:!0,fatal:!0});G.decode();let fn=0;function pn(e,t){return fn+=t,fn>=2146435072&&(G=new TextDecoder(`utf-8`,{ignoreBOM:!0,fatal:!0}),G.decode(),fn=t),G.decode(V().subarray(e,e+t))}const K=new TextEncoder;`encodeInto`in K||(K.encodeInto=function(e,t){let n=K.encode(e);return t.set(n),{read:e.length,written:n.length}});let q=0,J;function mn(e,t){return J=e.exports,R=null,B=null,J.__wbindgen_start(),J}async function hn(e,t){if(typeof Response==`function`&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming==`function`)try{return await WebAssembly.instantiateStreaming(e,t)}catch(t){if(e.ok&&n(e.type)&&e.headers.get(`Content-Type`)!==`application/wasm`)console.warn(\"`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\\n\",t);else throw t}let r=await e.arrayBuffer();return await WebAssembly.instantiate(r,t)}else{let n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}function n(e){switch(e){case`basic`:case`cors`:case`default`:return!0}return!1}}async function gn(e){if(J!==void 0)return J;e!==void 0&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn(`using deprecated parameters for the initialization function; pass a single object instead`));let t=cn();(typeof e==`string`||typeof Request==`function`&&e instanceof Request||typeof URL==`function`&&e instanceof URL)&&(e=fetch(e));let{instance:n,module:r}=await hn(await e,t);return mn(n,r)}async function _n(e){return J=void 0,R=null,B=null,gn(e)}A(),k();const Y=new ke(gn,{freeArchive:e=>e.free(),reinit:_n});let X=null,Z=`empty`;function vn(){if(Z!==`empty`){let e=Error(`this PPTX worker already owns a presentation parse`);throw e.name=`PptxWorkerStateError`,Object.assign(e,{code:`ooxml-pptx-parse-already-started`})}Z=`opening`}const Q=new rn(()=>Y.archive,(e,t,n)=>{if(X){if(e!==X.acceptedSlideCount)throw Error(`PPTX preflight expected slide ${X.acceptedSlideCount}, received ${e}`);return X.prepareSlide(t,n)}},e=>{let t=Y.archive;if(!t)throw Error(`Presentation not loaded`);return Y.run(()=>e(t))}),$=(e,t)=>self.postMessage(e,t);self.onmessage=async e=>{let t=e.data;if(an(t)){await Q.dispatchSafely(t,$);return}if(t.kind===`init`){Y.setWasmInput(be(t.wasmUrl)??t.wasmUrl);return}let n=t.id,r=!1;try{if(t.kind===`openSlideSession`&&Q.reserveOpen(t),t.kind===`parse`&&(vn(),r=!0),t.kind===`openSlideSession`){await Y.ensureReady(),await Q.open(t.slideIndex,t),await Q.postOpenedSafely(t,()=>$({kind:`slideSessionOpened`,id:n,sessionId:t.sessionId,operationId:t.operationId,generation:t.generation}),e=>$({kind:`error`,id:n,...w(e)}));return}t.kind===`parse`&&await Q.reset(),await Q.run(async()=>{if(await Y.ensureReady(),t.kind!==`parse`&&Y.archive){let e=Y.archive;Y.run(()=>e.assert_healthy())}if(t.kind===`parse`){X=null;let[e,r,i]=ht(t.resourcePolicy),a=Y.run(()=>{let n=new sn(new Uint8Array(t.buffer),e,r,i);return Y.setArchive(n),JSON.parse(new TextDecoder().decode(n.presentation_bootstrap()))});X=t.progressiveLayout?null:new en(a,{cjkFallback:t.cjkFallback,collectFontDemand:t.collectFontDemand===!0?await It(!0):void 0}),$({kind:`presentationOpened`,id:n,bootstrap:a}),Z=`ready`;return}let e=Y.archive;if(!e)throw Error(`No pptx loaded`);if(t.kind===`finishPresentationPreflight`){if(!X)throw Error(`PPTX presentation preflight is not active`);let e=X.finish();X=null,$({kind:`presentationPreflightReady`,id:n,preflight:e});return}if(t.kind===`extractMedia`){let r=Y.run(()=>e.extract_media(t.path).buffer);$({kind:`mediaExtracted`,id:n,bytes:r},[r]);return}if(t.kind===`extractImage`){let r=Y.run(()=>e.extract_image(t.path).buffer);$({kind:`imageExtracted`,id:n,bytes:r},[r]);return}if(t.kind===`extractFont`){let r=Y.run(()=>e.extract_font(t.path).buffer);$({kind:`fontExtracted`,id:n,bytes:r},[r]);return}if(t.kind===`resourceUsage`){$({kind:`resourceUsage`,id:n,usage:ze(Y.run(()=>e.resource_usage()))});return}t.kind===`toMarkdown`&&$({kind:`markdownRendered`,id:n,markdown:Y.run(()=>e.to_markdown())})})}catch(e){r&&(Z=`failed`),t.kind===`openSlideSession`&&Q.abandonOpen(t.sessionId);try{$({kind:`error`,id:n,...w(e)})}catch{}}};", Ne = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Y], { type: "text/javascript;charset=utf-8" });
function Pe(e) {
	let t;
	try {
		if (t = Ne && (self.URL || self.webkitURL).createObjectURL(Ne), !t) throw "";
		let n = new Worker(t, {
			type: "module",
			name: e?.name
		});
		return n.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(t);
		}), n;
	} catch {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(Y), {
			type: "module",
			name: e?.name
		});
	}
}
//#endregion
//#region packages/pptx/src/wasm/pptx_parser_bg.wasm?url
var Fe = new URL("pptx_parser_bg.wasm", import.meta.url).href, X = 65536, Ie = 16384, Le = new Set(["line", "straightconnector1"]);
function Re(e, t) {
	let n = e.x + e.width / 2, r = e.y + e.height / 2, i = -e.rotation * Math.PI / 180, a = Math.cos(i), o = Math.sin(i), s = t.x - n, c = t.y - r, l = n + a * s - o * c, u = r + o * s + a * c;
	return e.flipH && (l = 2 * n - l), e.flipV && (u = 2 * r - u), {
		x: l,
		y: u
	};
}
function ze(e, t, n) {
	let r = n.x - t.x, i = n.y - t.y, a = r * r + i * i;
	if (a === 0) return Math.hypot(e.x - t.x, e.y - t.y);
	let o = Math.max(0, Math.min(1, ((e.x - t.x) * r + (e.y - t.y) * i) / a));
	return Math.hypot(e.x - (t.x + o * r), e.y - (t.y + o * i));
}
function Be(e, t, n = 0) {
	if (!Number.isFinite(t.x) || !Number.isFinite(t.y)) return !1;
	let r = Re(e, t), i = Number.isFinite(n) && n > 0 ? n : 0;
	if (e.type === "shape" && (Le.has(e.geometry.toLowerCase()) || e.width === 0 || e.height === 0)) return ze(r, {
		x: e.x,
		y: e.y
	}, {
		x: e.x + e.width,
		y: e.y + e.height
	}) <= i;
	let a = Math.min(e.x, e.x + e.width), o = Math.max(e.x, e.x + e.width), s = Math.min(e.y, e.y + e.height), c = Math.max(e.y, e.y + e.height);
	return r.x >= a && r.x <= o && r.y >= s && r.y <= c;
}
function* Ve(e) {
	if (e) for (let t of e.paragraphs) {
		let e = !0;
		for (let n of t.runs) {
			let t = n.type === "text" ? n.text : n.type === "break" ? "\n" : "[equation]";
			t && (yield {
				text: t,
				beginsPart: e
			}, e = !1);
		}
	}
}
function* He(e) {
	if (e.type === "shape") {
		yield* Ve(e.textBody);
		return;
	}
	if (e.type === "table") {
		for (let t of e.rows) for (let e of t.cells) yield* Ve(e.textBody);
		return;
	}
}
function Ue(e, t) {
	let n = Math.min(e.length, t);
	if (n > 0 && n < e.length) {
		let t = e.charCodeAt(n - 1), r = e.charCodeAt(n);
		t >= 55296 && t <= 56319 && r >= 56320 && r <= 57343 && n--;
	}
	return e.slice(0, n);
}
function We(e, t = Ie) {
	if (!Number.isFinite(t) || t < 0) throw RangeError("maxTextCharacters must be a finite non-negative number.");
	let n = Math.min(X, Math.floor(t)), r = e.text, i = r === void 0 ? void 0 : Ue(r, n), a = r !== void 0 && i.length < r.length;
	return {
		...structuredClone(e),
		...i === void 0 ? {} : { text: i },
		truncated: e.truncated || a,
		truncationReasons: e.truncated || a ? ["text"] : [],
		textCharacters: i?.length ?? 0,
		maxTextCharacters: n
	};
}
function Ge(e, t) {
	let n = [], r = 0, i = !1, a = !1;
	for (let o of e) {
		if (a = !0, o.beginsPart && n.length > 0) {
			if (r >= t) {
				i = !0;
				break;
			}
			n.push("\n"), r++;
		}
		let e = Math.max(0, t - r), s = Ue(o.text, e);
		if (n.push(s), r += s.length, s.length < o.text.length) {
			i = !0;
			break;
		}
	}
	return a ? {
		text: n.join(""),
		truncated: i,
		textCharacters: r
	} : {
		truncated: !1,
		textCharacters: 0
	};
}
function Ke(e, t, n, r = {}) {
	if (!Number.isFinite(n.x) || !Number.isFinite(n.y)) throw RangeError("PPTX hit-test point must contain finite coordinates.");
	let i = r.maxTextCharacters ?? Ie;
	if (!Number.isFinite(i) || i < 0) throw RangeError("maxTextCharacters must be a finite non-negative number.");
	let a = Math.min(X, Math.floor(i)), o = r.tolerance ?? 0;
	if (!Number.isFinite(o) || o < 0) throw RangeError("tolerance must be a finite non-negative number.");
	for (let r = t.elements.length - 1; r >= 0; r--) {
		let i = t.elements[r];
		if (!Be(i, n, o)) continue;
		let s = i.type === "chart" ? T(i.chart, a) : Ge(He(i), a);
		return {
			format: "pptx",
			kind: "element",
			slideIndex: e,
			elementIndex: r,
			origin: t.elementSources?.[r]?.origin ?? "unknown",
			elementType: i.type,
			point: { ...n },
			bounds: {
				x: i.x,
				y: i.y,
				width: i.width,
				height: i.height,
				rotation: i.rotation,
				flipH: i.flipH,
				flipV: i.flipV
			},
			...i.type === "shape" ? {
				...i.id === void 0 ? {} : { shapeId: i.id },
				...i.name === void 0 ? {} : { name: i.name },
				geometry: i.geometry
			} : {},
			...s.text === void 0 ? {} : { text: s.text },
			...i.type === "picture" ? { mimeType: i.mimeType } : {},
			...i.type === "media" ? {
				mimeType: i.mimeType,
				mediaKind: i.mediaKind
			} : {},
			...i.type === "table" ? {
				rowCount: i.rows.length,
				columnCount: i.cols.length
			} : {},
			...i.type === "chart" ? { seriesCount: i.chart.series.length } : {},
			truncated: s.truncated,
			truncationReasons: s.truncated ? ["text"] : [],
			textCharacters: s.textCharacters,
			maxTextCharacters: a
		};
	}
	return null;
}
function qe(e, t) {
	let n = new Set(t.filter((e) => e.length > 0));
	if (n.size === 0) return Object.freeze([]);
	let r = /* @__PURE__ */ new Map();
	for (let [t, i] of e.elements.entries()) {
		let a = i.id;
		if (!a || !n.has(a)) continue;
		let o = e.elementSources?.[t]?.origin ?? "unknown", s = o === "slide" ? 3 : o === "layout" ? 2 : +(o === "master"), c = r.get(a), l = c?.origin === "slide" ? 3 : c?.origin === "layout" ? 2 : +(c?.origin === "master");
		c && l > s || r.set(a, Object.freeze({
			elementId: a,
			elementIndex: t,
			origin: o,
			elementType: i.type,
			bounds: Object.freeze({
				x: i.x,
				y: i.y,
				width: i.width,
				height: i.height,
				rotation: i.rotation,
				flipH: i.flipH,
				flipV: i.flipV
			})
		}));
	}
	return Object.freeze(t.flatMap((e) => {
		let t = r.get(e);
		return t ? [t] : [];
	}));
}
//#endregion
//#region packages/pptx/src/presentation-layout-events.ts
var Z = /* @__PURE__ */ new WeakMap();
function Q(e, t) {
	let n = Object.freeze({ ...t });
	for (let t of [...Z.get(e) ?? []]) try {
		t.notify(n);
	} catch (e) {
		try {
			t.report(e);
		} catch {}
	}
}
function Je(e, t, n, r) {
	let i = Z.get(e);
	i || (i = /* @__PURE__ */ new Set(), Z.set(e, i));
	let a = Object.freeze({
		notify: n,
		report: r
	});
	i.add(a);
	try {
		n(Object.freeze({ ...t() }));
	} catch (e) {
		try {
			r(e);
		} catch {}
	}
	return () => {
		i?.delete(a), i?.size === 0 && Z.delete(e);
	};
}
//#endregion
//#region packages/pptx/src/worker-task-scheduler.ts
function $() {
	return new Promise((e) => {
		let t = new MessageChannel();
		t.port1.onmessage = () => {
			t.port1.close(), t.port2.close(), e();
		}, t.port2.postMessage(void 0);
	});
}
//#endregion
//#region packages/pptx/src/presentation.ts
function Ye() {
	let e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
var Xe = class n {
	_cjkFallback = "jp";
	_googleSubstitutes = !1;
	_metrics = null;
	_worker;
	_bridge;
	_mode = "main";
	_bootstrap = null;
	_preflight = null;
	_availableSlideCount = 0;
	_layoutLifecycle = new d();
	_layoutObservers = new p();
	_layoutCompletion = null;
	_parseRequestId = null;
	_progressive = null;
	_progressiveWatchdog;
	_progressiveWatchdogMs;
	_layoutWaiters = /* @__PURE__ */ new Set();
	_slides = null;
	_slidePullClient = null;
	_resourceFailure = null;
	_slidePartIndex = null;
	_rawParts = new fe({
		maxEntries: 64,
		maxBytes: o
	});
	_googleFonts = null;
	_officeFontLoads = /* @__PURE__ */ new Map();
	_embeddedFontFaces = [];
	_embeddedFontAliases = /* @__PURE__ */ new Map();
	_embeddedFontAuthoredFamilies = /* @__PURE__ */ new Map();
	_embeddedFontTuples = /* @__PURE__ */ new Set();
	_destroyed = !1;
	_fetchImage = (e, t) => this.getImage(e, t);
	_fetchMedia = (e) => this.getMedia(e);
	_math;
	_threeD;
	_regionMap;
	_chartEx;
	_tiff;
	constructor(e, t, n) {
		this._worker = e, this._mode = t, this._bridge = new w(this._worker, {
			correlate: (e) => "protocol" in e && e.protocol === "ooxml-pull-v1" ? e.requestId : "id" in e ? e.id : void 0,
			toError: (e) => !("protocol" in e) && e.kind === "error" ? ie(e) : void 0,
			onUnsolicited: (e) => this._onWorkerLayoutPush(e)
		});
		let r = new URL(n ?? Fe, location.href).href;
		this._bridge.post({
			kind: "init",
			wasmUrl: r
		});
	}
	_assertResourceHealthy() {
		if (this._resourceFailure) throw this._resourceFailure;
	}
	_rethrowWithResourceFailure(e) {
		let t = e instanceof i ? e : E(e);
		throw t ? (this._resourceFailure ??= t, this._resourceFailure) : e;
	}
	static async load(e, t = {}) {
		if (t.modelSources !== void 0) {
			let { loadPptxModelSource: n } = await import("./presentation-model-source-DUuyjQDf.js");
			return n(e, t);
		}
		let r = v(t.cjkFallback), i = te(t), a = t.mode ?? "main", o = new ne({
			enabled: !0,
			format: "pptx",
			mode: a,
			policy: i.policy,
			onMetrics: i.onResourceMetrics,
			emitToConsole: i.debug
		});
		try {
			if (a === "worker" && (typeof Worker > "u" || typeof OffscreenCanvas > "u")) throw Error("mode: 'worker' requires Worker and OffscreenCanvas support");
			let l;
			if (typeof e == "string") {
				let t = await fetch(e);
				if (!t.ok) throw Error(`Failed to fetch: ${t.status} ${t.statusText}`);
				l = await t.arrayBuffer();
			} else l = e;
			l = s(await c(l, t.password)), o.setSourceBytes(l.byteLength), o.checkpoint("container ready");
			let u = a === "worker" ? (await import("./render-worker-host-DfuNPmgc.js")).createRenderWorker() : new Pe(), d = a === "worker" ? C(t) : void 0, f;
			try {
				f = new n(u, a, t.wasmUrl), f._metrics = o, t.math && a === "worker" && !d?.math && console.warn("[ooxml] a custom math renderer cannot cross the worker boundary; equations will be skipped in mode: 'worker'. Use the math renderer from @silurus/ooxml/math."), t.threeD && a === "worker" && !d?.threeD && console.warn("[ooxml] a custom 3-D chart renderer cannot cross the worker boundary; charts use their 2-D family fallback in mode: 'worker'. Use the renderer from @silurus/ooxml/three-d."), f._cjkFallback = r, f._math = a === "worker" ? void 0 : t.math, f._threeD = a === "worker" ? void 0 : t.threeD, t.regionMap && a === "worker" && !d?.regionMap && console.warn("[ooxml] a custom Region Map renderer cannot cross the worker boundary; geospatial charts use the unsupported-chart placeholder in mode: 'worker'. Use the renderer from @silurus/ooxml/region-map."), f._regionMap = a === "worker" ? void 0 : t.regionMap, t.chartEx && a === "worker" && !d?.chartEx && console.warn("[ooxml] a custom ChartEx renderer cannot cross the worker boundary; ChartEx charts use the unsupported-chart placeholder in mode: 'worker'. Use the renderer from @silurus/ooxml/chart-ex."), f._chartEx = a === "worker" ? void 0 : t.chartEx, t.tiff && a === "worker" && !d?.tiff && console.warn("[ooxml] a custom TIFF codec cannot cross the worker boundary; recognized TIFF images will use an unavailable-image placeholder in mode: 'worker'. Use the codec from @silurus/ooxml/tiff to display them."), f._tiff = a === "worker" ? void 0 : t.tiff;
				let e = t.progressiveLayout ? {
					onProgress: t.onLayoutProgress,
					onPartial: t.onLayoutPartial,
					onComplete: t.onLayoutComplete,
					firstPublication: Ye(),
					published: !1,
					deferred: !1,
					settled: !1
				} : void 0;
				return f._googleSubstitutes = !!t.useGoogleFonts, await f._parse(l, i.policy, !!t.useGoogleFonts, t.workerTimeoutMs, (e) => o.observeUsage(e), d, e), o.checkpoint("presentation preflight ready"), a === "main" && t.useGoogleFonts && f._preflight && !e && await f._ensureGoogleFonts(J(f._preflight.fontPreloadNames, f._embeddedFontAliases), f._preflight.fontPreloadDemand), o.succeed({ slides: f.slideCount }), f;
			} catch (e) {
				let t = f;
				throw ae(u, t ? () => t.destroy() : void 0), e;
			}
		} catch (e) {
			throw o.fail(e), e;
		}
	}
	async _ensureGoogleFonts(e, t) {
		this._destroyed || (this._googleFonts ??= new l(le), await this._googleFonts.ensure(e, t));
	}
	async _parse(e, n, i = !1, o, s, c, l) {
		if (l) {
			this._progressive = l, this._mode === "worker" ? await this._parseWorkerProgressively(e, n, i, o, s, c, l) : await this._parseMainProgressively(e, n, i, o, s, l, i && !c);
			return;
		}
		let u = await this._bridge.request((t) => this._mode === "worker" ? {
			kind: "parse",
			id: t,
			buffer: e,
			resourcePolicy: n,
			useGoogleFonts: i,
			cjkFallback: this._cjkFallback,
			renderers: c
		} : {
			kind: "parse",
			id: t,
			buffer: e,
			resourcePolicy: n,
			cjkFallback: this._cjkFallback,
			...i && !c ? { collectFontDemand: !0 } : {}
		}, [e], { timeoutMs: o });
		if (this._mode === "worker") {
			let e = u;
			e.usage && s?.(e.usage), this._preflight = D(u.preflight), this._bootstrap = this._preflight, this._availableSlideCount = this._preflight.slideCount;
			return;
		}
		let d = O(u.bootstrap);
		this._bootstrap = d;
		let p = q(d.embeddedFonts, (e) => this.getFontBytes(e)).then((e) => {
			this._destroyed ? f(e.faces) : (this._embeddedFontFaces = e.faces, this._embeddedFontAliases = e.aliases, this._embeddedFontAuthoredFamilies = e.authoredFamilies, this._embeddedFontTuples = e.tuples);
		});
		this._slidePullClient = new r({
			slideCount: d.slideCount,
			transport: this._bridge.transport(t),
			open: async (e, t, n) => {
				await this._bridge.request((n) => ({
					kind: "openSlideSession",
					id: n,
					slideIndex: e,
					...t
				}), void 0, { timeoutMs: n });
			},
			onUsage: s
		});
		let m;
		try {
			for (let e = 0; e < d.slideCount; e += 1) await this._slidePullClient.load(e, !1, o);
			m = await this._bridge.request((e) => ({
				kind: "finishPresentationPreflight",
				id: e
			}), void 0, { timeoutMs: o }), await p;
		} catch (e) {
			throw p.catch(() => void 0), e;
		}
		this._preflight = D(m.preflight), this._availableSlideCount = this._preflight.slideCount, this._slides = new W({
			slideCount: this._preflight.slideCount,
			maxCachedSlides: 8,
			maxCachedStructuralBytes: a,
			loadSlide: async (e) => {
				let t = await this._slidePullClient?.load(e, !0, o);
				if (!t) throw Error("PPTX slide pull client is unavailable");
				return t;
			}
		});
	}
	async _parseMainProgressively(e, t, n, r, i, o, s = n) {
		let c = O((await this._bridge.request((n) => ({
			kind: "parse",
			id: n,
			buffer: e,
			resourcePolicy: t,
			cjkFallback: this._cjkFallback,
			progressiveLayout: !0
		}), [e], { timeoutMs: r })).bootstrap);
		this._bootstrap = c;
		let l = q(c.embeddedFonts, (e) => this.getFontBytes(e)).then((e) => {
			this._destroyed ? f(e.faces) : (this._embeddedFontFaces = e.faces, this._embeddedFontAliases = e.aliases, this._embeddedFontAuthoredFamilies = e.authoredFamilies, this._embeddedFontTuples = e.tuples);
		});
		this._slidePullClient = this._createSlidePullClient(c.slideCount, r, i), this._slides = new W({
			slideCount: c.slideCount,
			maxCachedSlides: 8,
			maxCachedStructuralBytes: a,
			loadSlide: async (e) => {
				let t = await this._slidePullClient?.load(e, !0, r);
				if (!t) throw Error("PPTX slide pull client is unavailable");
				return t;
			}
		});
		let u = new ue(c, {
			cjkFallback: this._cjkFallback,
			collectFontDemand: s ? await _e(!0) : void 0
		}), d = async () => {
			await l, n && await this._ensureGoogleFonts(J(u.currentFontPreloadNames, this._embeddedFontAliases), u.currentFontPreloadDemandDelta);
		};
		this._layoutCompletion = (async () => {
			for (let e = 0; e < c.slideCount; e += 1) await this._slides.withSlide(e, (e) => {
				u.addSlide(e);
			}), await d(), this._applyProgressivePrefix(u.snapshot(), o), e === 0 && o.deferred && await $();
			await l, this._finishProgressiveLayout(u.finish(), o);
		})().then(() => void 0, (e) => this._failProgressiveLayout(e, o)), await o.firstPublication.promise;
	}
	async _parseWorkerProgressively(e, t, n, r, i, a, o) {
		this._progressiveWatchdogMs = r;
		let s = this._bridge.request((r) => (this._parseRequestId = r, {
			kind: "parse",
			id: r,
			buffer: e,
			resourcePolicy: t,
			useGoogleFonts: n,
			cjkFallback: this._cjkFallback,
			renderers: a,
			progressiveLayout: !0
		}), [e], { timeoutMs: !1 });
		this._rearmProgressiveWatchdog(), this._layoutCompletion = s.then((e) => {
			this._parseRequestId = null;
			let t = e;
			t.usage && i?.(t.usage), this._finishProgressiveLayout(D(t.preflight), o);
		}, (e) => {
			this._parseRequestId = null, this._failProgressiveLayout(e, o);
		}), await o.firstPublication.promise;
	}
	_createSlidePullClient(e, n, i) {
		return new r({
			slideCount: e,
			transport: this._bridge.transport(t),
			open: async (e, t, r) => {
				await this._bridge.request((n) => ({
					kind: "openSlideSession",
					id: n,
					slideIndex: e,
					...t
				}), void 0, { timeoutMs: r ?? n });
			},
			onUsage: i
		});
	}
	_onWorkerLayoutPush(e) {
		if (!ee((e, t) => this._worker.postMessage(e, t), e) && !(!("kind" in e) || e.kind !== "presentationLayoutPartial" || e.forId !== this._parseRequestId || !this._progressive)) try {
			this._rearmProgressiveWatchdog(), e.usage && this._metrics?.observeUsage(e.usage), e.bootstrap && (this._bootstrap = O(e.bootstrap));
			let t = this._bootstrap;
			if (!t) throw Error("PPTX progressive worker published before bootstrap");
			let n = this._preflight?.slides ?? [];
			if (e.availableSlides !== n.length + 1 || e.slide.index !== n.length) throw Error("PPTX progressive worker published a non-sequential slide");
			this._applyProgressivePrefix(oe({
				...t,
				slides: [...n, e.slide],
				fontPreloadNames: e.fontPreloadNames
			}), this._progressive), $().then(() => {
				this._destroyed || this._parseRequestId !== e.forId || this._bridge.post({
					kind: "continuePresentationPreflight",
					forId: e.forId,
					availableSlides: e.availableSlides
				});
			}).catch((t) => {
				this._destroyed || this._parseRequestId !== e.forId || !this._progressive || (this._failProgressiveLayout(t, this._progressive), this._bridge.terminate());
			});
		} catch (e) {
			this._failProgressiveLayout(e, this._progressive), this._bridge.terminate();
		}
	}
	_applyProgressivePrefix(e, t) {
		if (!(t.settled || this._destroyed)) {
			if (this._preflight = e, this._availableSlideCount = e.slides.length, !t.published && e.slides.length === e.slideCount) {
				t.published = !0, t.deferred = !1;
				return;
			}
			if (this._layoutLifecycle.begin(), this._wakeLayoutWaiters(), this._layoutObservers.notify("onLayoutProgress", t.onProgress, { committedUnits: this._availableSlideCount }), Q(this, {
				availableSlides: this._availableSlideCount,
				slideCount: this.slideCount,
				exact: !1,
				complete: !1
			}), !t.published) {
				t.published = !0, t.deferred = e.slides.length < e.slideCount, t.firstPublication.resolve();
				return;
			}
			this._layoutObservers.notify("onLayoutPartial", t.onPartial, {
				availableUnits: this._availableSlideCount,
				totalUnits: this.slideCount,
				exact: !1
			});
		}
	}
	_finishProgressiveLayout(e, t) {
		t.settled || this._destroyed || (t.settled = !0, this._clearProgressiveWatchdog(), this._preflight = e, this._bootstrap ??= e, this._availableSlideCount = e.slideCount, this._layoutLifecycle.succeed(), this._wakeLayoutWaiters(), t.firstPublication.resolve(), Q(this, {
			availableSlides: this._availableSlideCount,
			slideCount: this.slideCount,
			exact: !0,
			complete: !0
		}), this._layoutObservers.notify("onLayoutComplete", t.onComplete));
	}
	_failProgressiveLayout(e, t) {
		if (t.settled || (t.settled = !0, this._clearProgressiveWatchdog(), this._destroyed)) return;
		if (!t.deferred) {
			t.firstPublication.reject(e);
			return;
		}
		let n = this._layoutLifecycle.fail(e);
		this._wakeLayoutWaiters(), Q(this, {
			availableSlides: this._availableSlideCount,
			slideCount: this.slideCount,
			exact: !1,
			complete: !1,
			error: n
		}), this._layoutObservers.notify("onLayoutComplete", t.onComplete, n);
	}
	_wakeLayoutWaiters() {
		for (let e of this._layoutWaiters) e();
		this._layoutWaiters.clear();
	}
	_rearmProgressiveWatchdog() {
		this._progressiveWatchdogMs !== void 0 && (clearTimeout(this._progressiveWatchdog), this._progressiveWatchdog = setTimeout(() => {
			let e = this._progressive, t = this._progressiveWatchdogMs;
			if (!e || e.settled || t === void 0 || this._destroyed) return;
			let n = /* @__PURE__ */ Error(`worker layout produced no progress for ${t}ms`);
			this._failProgressiveLayout(n, e), this._bridge.terminate();
		}, this._progressiveWatchdogMs));
	}
	_clearProgressiveWatchdog() {
		clearTimeout(this._progressiveWatchdog), this._progressiveWatchdog = void 0, this._progressiveWatchdogMs = void 0;
	}
	async _waitForSlide(e) {
		for (; !this._destroyed && e >= this._availableSlideCount && !this._layoutLifecycle.settled;) await new Promise((e) => this._layoutWaiters.add(e));
		e >= this._availableSlideCount && await this.waitUntilLayoutComplete();
	}
	_assertSlideIndex(e) {
		if (!Number.isInteger(e) || e < 0 || e >= this.slideCount) throw Error(`Slide index ${e} out of range (count: ${this.slideCount})`);
	}
	get slideCount() {
		return this._bootstrap?.slideCount ?? this._preflight?.slideCount ?? 0;
	}
	get availableSlideCount() {
		return this._availableSlideCount;
	}
	get layoutComplete() {
		return this._layoutLifecycle.complete;
	}
	async waitUntilLayoutComplete() {
		this._layoutCompletion && await this._layoutCompletion, this._layoutLifecycle.throwIfFailed();
	}
	get slideWidth() {
		return this._bootstrap?.slideWidth ?? this._preflight?.slideWidth ?? 0;
	}
	get slideHeight() {
		return this._bootstrap?.slideHeight ?? this._preflight?.slideHeight ?? 0;
	}
	get mode() {
		return this._mode;
	}
	getNotes(e) {
		return Number.isInteger(e) ? this._preflight?.slides[e]?.notes ?? null : null;
	}
	getComments(e) {
		return Number.isInteger(e) ? this._preflight?.slides[e]?.comments ?? [] : [];
	}
	isHidden(e) {
		return Number.isInteger(e) ? this._preflight?.slides[e]?.hidden ?? !1 : !1;
	}
	_partNames() {
		return (this._bootstrap?.slides ?? this._preflight?.slides ?? []).map((e) => e.partName);
	}
	_partIndex() {
		return this._slidePartIndex ||= Oe(this._partNames()), this._slidePartIndex;
	}
	getSlideIndexByPartName(e) {
		return this._partIndex().get(e);
	}
	resolveInternalTarget(e, t = 0) {
		return Ae(e, this._partIndex(), t);
	}
	async _officeRoutesForRequests(e, t) {
		if (this._destroyed) throw Error("Presentation destroyed");
		if (!t) return {};
		let n = je(e, this._embeddedFontTuples), r = this._officeFontLoads.get(t);
		r || (r = /* @__PURE__ */ new Map(), this._officeFontLoads.set(t, r));
		let i = await Promise.all(n.map((e) => {
			let n = `calibri:${e.weight}:${e.style}`, i = r.get(n);
			return i || (i = g([e], t), r.set(n, i)), i;
		}));
		if (this._destroyed) throw Error("Presentation destroyed");
		return Object.assign({}, ...i.map((e) => e.routes));
	}
	async renderSlide(t, n, r = {}) {
		this._assertResourceHealthy();
		try {
			if (this._mode === "worker") throw Error("renderSlide(canvas) is unavailable in mode: 'worker'; use renderSlideToBitmap() and paint it via an ImageBitmapRenderingContext");
			if (this._assertSlideIndex(n), await this._waitForSlide(n), this._destroyed) throw Error("Presentation destroyed");
			let i = this._preflight, a = this._slides;
			if (!i || !a) throw Error("Presentation not loaded");
			let o = r.dpr ?? h(), s = r.width ?? ((m(t) ? t.offsetWidth : 0) || 960), c = await a.withSlide(n, (e) => se(e, i.majorFont, i.minorFont));
			if (this._destroyed) throw Error("Presentation destroyed");
			let l = m(t) ? t.ownerDocument.fonts : typeof document < "u" ? document.fonts : null, u = await this._officeRoutesForRequests(c, l);
			await a.withSlide(n, (n) => {
				if (this._destroyed) throw Error("Presentation destroyed");
				return this._assertResourceHealthy(), e(t, n, i.slideWidth, i.slideHeight, {
					width: s,
					dpr: o,
					defaultTextColor: i.defaultTextColor,
					cjkFallback: this._cjkFallback,
					majorFont: i.majorFont,
					minorFont: i.minorFont,
					hlinkColor: i.hlinkColor,
					embeddedFontAliases: this._embeddedFontAliases,
					embeddedFontAuthoredFamilies: this._embeddedFontAuthoredFamilies,
					embeddedFontTuples: this._embeddedFontTuples,
					officeFontRoutes: u,
					googleSubstitutes: this._googleSubstitutes,
					fetchMedia: this._fetchMedia,
					fetchImage: this._fetchImage,
					skipMediaControls: r.skipMediaControls,
					dim: r.dim,
					math: this._math,
					threeD: this._threeD,
					regionMap: this._regionMap,
					chartEx: this._chartEx,
					tiff: this._tiff,
					imageResources: r.imageResources
				}, r.onTextRun);
			});
		} catch (e) {
			this._rethrowWithResourceFailure(e);
		}
	}
	async renderSlideToBitmap(e, t = {}) {
		this._assertResourceHealthy();
		try {
			this._assertSlideIndex(e), await this._waitForSlide(e);
			let n = t.width ?? 960, r = t.dpr ?? h();
			if (this._mode === "worker") {
				let i = new OffscreenCanvas(1, 1), a = await this._bridge.request((a) => ({
					kind: "renderSlide",
					id: a,
					slideIndex: e,
					width: n,
					dpr: r,
					imageResources: t.imageResources,
					skipMediaControls: t.skipMediaControls,
					dim: t.dim,
					canvas: i
				}), [i]);
				try {
					if (t.onTextRun) for (let e of a.runs) t.onTextRun(e);
				} catch (e) {
					throw b(a.bitmap), e;
				}
				return a.bitmap;
			}
			let i = new OffscreenCanvas(1, 1);
			return await this.renderSlide(i, e, {
				width: n,
				dpr: r,
				imageResources: t.imageResources,
				skipMediaControls: t.skipMediaControls,
				dim: t.dim,
				onTextRun: t.onTextRun
			}), i.transferToImageBitmap();
		} catch (e) {
			this._rethrowWithResourceFailure(e);
		}
	}
	async collectSlideRuns(e, t = 960) {
		this._assertResourceHealthy();
		try {
			if (this._assertSlideIndex(e), await this._waitForSlide(e), this._mode === "worker") {
				let n = new OffscreenCanvas(1, 1);
				return (await this._bridge.request((r) => ({
					kind: "collectRuns",
					id: r,
					slideIndex: e,
					width: t,
					canvas: n
				}), [n])).runs;
			}
			let n = [], r = new OffscreenCanvas(1, 1);
			return await this.renderSlide(r, e, {
				width: t,
				onTextRun: (e) => n.push(e)
			}), n;
		} catch (e) {
			this._rethrowWithResourceFailure(e);
		}
	}
	async getElementContextAt(e, t, n = {}) {
		this._assertResourceHealthy(), this._assertSlideIndex(e);
		try {
			if (await this._waitForSlide(e), this._mode === "worker") return (await this._bridge.request((r) => ({
				kind: "hitTestElement",
				id: r,
				slideIndex: e,
				point: t,
				options: n
			}))).context;
			if (!this._slides) throw Error("Presentation not loaded");
			return await this._slides.withSlide(e, (r) => Ke(e, r, t, n));
		} catch (e) {
			this._rethrowWithResourceFailure(e);
		}
	}
	async getElementBoundsByIds(e, t) {
		this._assertResourceHealthy(), this._assertSlideIndex(e);
		let n = Object.freeze(t.filter((e) => typeof e == "string" && e.length > 0));
		if (n.length === 0) return Object.freeze([]);
		try {
			if (await this._waitForSlide(e), this._mode === "worker") return (await this._bridge.request((t) => ({
				kind: "resolveElementBounds",
				id: t,
				slideIndex: e,
				elementIds: n
			}))).bounds;
			if (!this._slides) throw Error("Presentation not loaded");
			return await this._slides.withSlide(e, (e) => qe(e, n));
		} catch (e) {
			this._rethrowWithResourceFailure(e);
		}
	}
	async getMedia(e) {
		this._assertResourceHealthy();
		try {
			let t = this._findMimeTypeForPath(e);
			return await this._rawParts.get(e, t, async () => {
				let n = (await this._bridge.request((t) => ({
					kind: "extractMedia",
					id: t,
					path: e
				}))).bytes;
				return new Blob([n], { type: t });
			});
		} catch (e) {
			this._rethrowWithResourceFailure(e);
		}
	}
	_findMimeTypeForPath(e) {
		return this._preflight ? ce(this._preflight, e) : "";
	}
	async getImage(e, t) {
		this._assertResourceHealthy();
		try {
			return await this._rawParts.get(e, t, async () => {
				let n = (await this._bridge.request((t) => ({
					kind: "extractImage",
					id: t,
					path: e
				}))).bytes;
				return new Blob([n], { type: t });
			});
		} catch (e) {
			this._rethrowWithResourceFailure(e);
		}
	}
	async getFontBytes(e) {
		this._assertResourceHealthy();
		try {
			let t = await this._bridge.request((t) => ({
				kind: "extractFont",
				id: t,
				path: e
			}));
			return new Uint8Array(t.bytes);
		} catch (e) {
			this._rethrowWithResourceFailure(e);
		}
	}
	async getResourceMetrics() {
		let e = this._metrics;
		if (!e) throw Error("Presentation not loaded");
		return re(e, async (e) => (await this._bridge.request((e) => ({
			kind: "resourceUsage",
			id: e
		}), void 0, { timeoutMs: e })).usage);
	}
	async toMarkdown() {
		this._assertResourceHealthy();
		try {
			return (await this._bridge.request((e) => ({
				kind: "toMarkdown",
				id: e
			}))).markdown;
		} catch (e) {
			this._rethrowWithResourceFailure(e);
		}
	}
	async presentSlide(e, t, n = {}) {
		this._assertResourceHealthy();
		try {
			if (this._assertSlideIndex(t), await this._waitForSlide(t), !this._preflight) throw Error("Presentation not loaded");
			let r = n.dpr ?? h(), i = n.width ?? (e.offsetWidth || 960), a = this.slideWidth > 0 ? i * this.slideHeight / this.slideWidth : 0;
			e.style.width = `${Math.round(i)}px`, e.style.height = `${Math.round(a)}px`, e.style.display || (e.style.display = "block");
			let o = this._mode === "worker" ? async () => {
				let a = await this.renderSlideToBitmap(t, {
					width: i,
					dpr: r,
					imageResources: n.imageResources,
					skipMediaControls: !0,
					dim: n.dim,
					onTextRun: n.onTextRun
				});
				try {
					e.width = a.width, e.height = a.height;
					let t = e.getContext("2d");
					if (!t) throw Error("2D context not available");
					t.drawImage(a, 0, 0);
				} finally {
					b(a);
				}
			} : () => this.renderSlide(e, t, {
				width: i,
				dpr: r,
				imageResources: n.imageResources,
				skipMediaControls: !0,
				dim: n.dim,
				onTextRun: n.onTextRun
			});
			return await ye(e, this._preflight.slides[t]?.mediaElements ?? [], {
				width: i,
				height: a,
				slideWidthEmu: this.slideWidth,
				fetchMedia: this._fetchMedia,
				fetchImage: this._fetchImage,
				drawBase: o,
				onError: n.onError
			});
		} catch (e) {
			this._rethrowWithResourceFailure(e);
		}
	}
	destroy() {
		this._destroyed = !0, this._clearProgressiveWatchdog(), this._slidePullClient?.cancelAll(), this._bridge.terminate(), this._slides?.clear(), this._slides = null, this._slidePullClient = null, this._bootstrap = null, this._preflight = null, this._availableSlideCount = 0, this._layoutLifecycle.succeed(), this._layoutCompletion = null, this._progressive = null, this._parseRequestId = null, this._wakeLayoutWaiters(), this._resourceFailure = null, this._slidePartIndex = null, this._rawParts.clear(), this._googleFonts?.release(), this._googleFonts = null;
		for (let e of this._officeFontLoads.values()) for (let t of e.values()) t.then((e) => _(e.faces));
		this._officeFontLoads.clear(), this._embeddedFontFaces.length > 0 && (f(this._embeddedFontFaces), this._embeddedFontFaces = []), this._embeddedFontAliases = /* @__PURE__ */ new Map(), this._embeddedFontAuthoredFamilies = /* @__PURE__ */ new Map(), this._embeddedFontTuples = /* @__PURE__ */ new Set(), S(this._fetchImage), x(this._fetchImage);
	}
};
//#endregion
export { J as a, We as i, Je as n, X as r, Xe as t };
