import { t as e } from "./chunk-DmhlhrBa.js";
import { $ as t, A as n, B as r, Bt as i, C as a, Ct as o, D as s, E as c, Ft as l, Gt as u, Ht as d, It as f, Kt as p, L as m, Lt as h, Mt as g, Q as _, R as v, St as y, Tt as b, U as x, Ut as S, Vt as C, Wt as w, _ as T, a as E, b as D, bt as O, c as k, d as A, dn as j, en as M, et as N, f as P, ft as F, h as ee, ht as te, it as I, j as L, k as ne, l as R, lt as z, m as B, nt as re, o as ie, p as V, qt as H, r as ae, rt as U, tn as oe, tt as se, u as ce, un as le, ut as ue, w as de, wt as fe, x as pe, xt as me, yt as he, z as W, zt as G } from "./hyperlink-BDaF40fS.js";
import { C as K, D as ge, E as _e, O as ve, S as ye, T as be, _ as q, a as xe, b as Se, d as Ce, f as we, g as Te, h as Ee, i as De, k as Oe, l as ke, m as Ae, p as je, t as Me, u as Ne, w as Pe, x as Fe, y as Ie } from "./canvas-viewer-mechanics-CZPQG4jR.js";
import { a as Le, c as Re, i as ze, l as Be, o as Ve, s as He, t as Ue } from "./bounded-raw-part-cache-lw607spG.js";
import { n as We } from "./cjk-fallback-D--USve7.js";
import { Ct as Ge, Et as Ke, G as qe, J as Je, K as Ye, Pt as Xe, Tt as Ze, a as Qe, c as $e, gt as et, ht as J, l as tt, lt as nt, n as rt, pt as it, q as at, xt as ot } from "./plot-area-frame-DJnay5Wh.js";
import { a as st, i as Y, r as ct } from "./units-EJdC96r6.js";
import { l as lt, s as ut } from "./pixel-budget-DEZjGJ9f.js";
import { j as dt } from "./renderer-DF1NP7gt.js";
import { i as ft, s as pt } from "./raster-target-Bbyiwmtp.js";
import { a as mt } from "./resource-measurement-_TvQgSDr.js";
import { n as ht } from "./renderer-module-contract-D4NrNIR1.js";
import { n as gt, r as _t, t as vt } from "./visible-index-DRzqcnfP.js";
import { n as yt } from "./office-auto-line-C6pn2RDx.js";
import { a as bt, c as xt, d as St, f as Ct, i as wt, l as Tt, m as Et, n as Dt, o as Ot, p as kt, s as At, t as jt, u as Mt } from "./worksheet-pull-client-D_QgAVbo.js";
//#region packages/core/src/sparkline/renderer.ts
function Nt(e, t, n) {
	let { values: r } = n;
	if (r.length === 0 || t.w <= 0 || t.h <= 0) return;
	let i = n.colorSeries ?? "#5B9BD5", a = Math.min(2, t.w * .08), o = Math.max(2, t.h * .2), s = t.x + a, c = t.y + o, l = Math.max(1, t.w - a * 2), u = Math.max(1, t.h - o * 2), d = r.filter((e) => typeof e == "number");
	if (d.length === 0) return;
	let f = Math.min(...d), p = Math.max(...d), m = n.min ?? f, h = n.max ?? p;
	m === h && (h = m + 1, --m);
	let g = h - m, _ = (e) => c + u - (e - m) / g * u;
	if (n.kind === "stem") {
		It(e, n, s, c, l, u);
		return;
	}
	if (n.kind === "column") {
		Ft(e, n, r, s, c, l, u, m, h);
		return;
	}
	if (n.displayXAxis && m < 0 && h > 0) {
		e.save(), e.strokeStyle = n.colorAxis ?? "#000000", e.lineWidth = 1, e.beginPath();
		let t = _(0);
		e.moveTo(s, t), e.lineTo(s + l, t), e.stroke(), e.restore();
	}
	let v = r.length, y = (e) => v === 1 ? s + l / 2 : s + e / (v - 1) * l;
	e.save(), e.strokeStyle = i, e.lineCap = "round", e.lineJoin = "round", e.lineWidth = (n.lineWeight ?? .75) * st, e.beginPath();
	let b = !1, x = n.displayEmptyCellsAs ?? "gap";
	for (let t = 0; t < v; t++) {
		let n = r[t];
		if (n == null) {
			if (x === "zero") {
				let n = y(t), r = _(0);
				b ? e.lineTo(n, r) : (e.moveTo(n, r), b = !0);
			} else x === "gap" && (b = !1);
			continue;
		}
		let i = y(t), a = _(n);
		b ? e.lineTo(i, a) : (e.moveTo(i, a), b = !0);
	}
	e.stroke(), e.restore();
	let S = Math.max(1, Math.min(2.5, u * .12)), C = Pt(r, n);
	for (let t = 0; t < v; t++) {
		let a = r[t];
		if (a == null) continue;
		let o = C[t];
		(n.markers || o != null) && (e.save(), e.fillStyle = o ?? n.colorMarkers ?? i, e.beginPath(), e.arc(y(t), _(a), S, 0, Math.PI * 2), e.fill(), e.restore());
	}
}
function Pt(e, t) {
	let n = e.map(() => null), r = e.map((e) => typeof e == "number" ? e : null), i = r.findIndex((e) => e != null), a = -1;
	for (let e = r.length - 1; e >= 0; e--) if (r[e] != null) {
		a = e;
		break;
	}
	let o = r.filter((e) => e != null), s = NaN, c = NaN;
	if (o.length > 0 && (s = Math.max(...o), c = Math.min(...o)), t.negative && t.colorNegative) for (let e = 0; e < r.length; e++) {
		let i = r[e];
		i != null && i < 0 && (n[e] = t.colorNegative);
	}
	if (t.first && t.colorFirst && i >= 0 && (n[i] = t.colorFirst), t.last && t.colorLast && a >= 0 && (n[a] = t.colorLast), t.high && t.colorHigh && !Number.isNaN(s)) for (let e = 0; e < r.length; e++) r[e] === s && (n[e] = t.colorHigh);
	if (t.low && t.colorLow && !Number.isNaN(c)) for (let e = 0; e < r.length; e++) r[e] === c && (n[e] = t.colorLow);
	return n;
}
function Ft(e, t, n, r, i, a, o, s, c) {
	let l = n.length;
	if (l === 0) return;
	let u = s < 0 && c > 0 ? 0 : s, d = c - s, f = (e) => i + o - (e - s) / d * o, p = f(u), m = a / l, h = Math.min(1.5, m * .15), g = Pt(n, t);
	for (let i = 0; i < l; i++) {
		let a = n[i];
		if (a == null) continue;
		let o = g[i] ?? (a < 0 && t.colorNegative ? t.colorNegative : t.colorSeries ?? "#5B9BD5"), s = f(a), c = r + m * i + h / 2, l = Math.max(1, m - h);
		e.save(), e.fillStyle = o, e.fillRect(c, Math.min(p, s), l, Math.abs(p - s)), e.restore();
	}
}
function It(e, t, n, r, i, a) {
	let o = t.values.length;
	if (o === 0) return;
	let s = r + a / 2, c = a / 2, l = i / o, u = Math.min(1.5, l * .15), d = Pt(t.values, t);
	for (let r = 0; r < o; r++) {
		let i = t.values[r];
		if (i == null || i === 0) continue;
		let a = i < 0, o = d[r] ?? (a && t.colorNegative ? t.colorNegative : t.colorSeries ?? "#5B9BD5"), f = n + l * r + u / 2, p = Math.max(1, l - u);
		e.save(), e.fillStyle = o, a ? e.fillRect(f, s, p, c) : e.fillRect(f, s - c, p, c), e.restore();
	}
}
//#endregion
//#region packages/core/src/text/bidi/segments.ts
function Lt(e, t) {
	return e === !0 ? "rtl" : e === !1 ? "ltr" : L().computeLevels(t, "auto").paragraphLevel === 1 ? "rtl" : "ltr";
}
//#endregion
//#region packages/xlsx/src/shape-office-line.ts
function Rt(e) {
	if (e.autoFit && e.autoFit !== "none" || e.paragraphs.length !== 1) return;
	let t = e.paragraphs[0];
	if (t.spaceLine != null || t.runs.length !== 1) return;
	let n = t.runs[0];
	if (!(n.type !== "text" || !n.text || n.text.includes("\n") || !n.fontFace?.trim()) && !(n.fontFaceEa && n.fontFaceEa.toLocaleLowerCase("en-US") !== n.fontFace.toLocaleLowerCase("en-US")) && !(n.fontFaceCs && n.fontFaceCs.toLocaleLowerCase("en-US") !== n.fontFace.toLocaleLowerCase("en-US"))) return n;
}
function zt(e) {
	let t = e.family.trim().toLowerCase(), n = e.weight ?? 400, r = e.style ?? "normal";
	return n === 400 && r === "normal" ? t : `${t}:${n}:${r}`;
}
function Bt(e) {
	return zt({
		family: e.fontFace,
		weight: e.bold ? 700 : 400,
		style: e.italic ? "italic" : "normal"
	});
}
function Vt(e, t) {
	if (!t || t.source !== "local" || t.metric.synthesized || !t.resourceIdentity.startsWith("office-local:")) return;
	let n = e.fontFace.trim();
	if (t.requestedFamily.toLocaleLowerCase("en-US") !== n.toLocaleLowerCase("en-US") || t.weight !== (e.bold ? 700 : 400) || t.style !== (e.italic ? "italic" : "normal")) return;
	let r = Ve(n, {
		weight: t.weight,
		style: t.style
	});
	if (r.length === 0) return;
	let i;
	for (let e of r) {
		if (e.farEastCodePage == null) return;
		let t = yt({
			unitsPerEm: e.unitsPerEm,
			hheaAscent: e.hhea[0],
			hheaDescent: e.hhea[1],
			hheaLineGap: e.hhea[2],
			farEastCodePage: e.farEastCodePage
		})?.lineHeightRatio;
		if (t == null || i !== void 0 && t !== i) return;
		i = t;
	}
	return i;
}
//#endregion
//#region packages/xlsx/src/google-fonts.ts
var Ht = {
	...p,
	...h
};
function* Ut(e) {
	for (let t of e?.sharedStrings ?? []) if (t.runs && t.runs.length > 0) for (let e of t.runs) yield e.text;
	else yield t.text;
}
function Wt(e, t) {
	let n = /* @__PURE__ */ new Set(), r = null;
	for (let t of e?.styles?.fonts ?? []) if (t.name) {
		n.add(t.name);
		let e = /^(.*?)\s+Regular$/i.exec(t.name.trim());
		if (e) {
			let t = e[1].trim(), r = Ht[t.toLocaleLowerCase("en-US")];
			r && (!r.loadFamily || r.loadFamily.toLocaleLowerCase("en-US") === t.toLocaleLowerCase("en-US")) && n.add(t);
		}
		r ??= C(t.name);
	}
	for (let i of u(Ut(e), r ?? t ?? null)) n.add(i);
	return n;
}
function Gt(e, t) {
	for (let t of e?.styles?.fonts ?? []) {
		let n = C(t.name);
		if (n) return i(Ut(e), n);
	}
	return i(Ut(e), t);
}
function Kt(e) {
	let t = /* @__PURE__ */ new Map(), n = (e, n, r) => {
		if ((e?.trim().toLowerCase() || "calibri") !== "calibri") return;
		let i = n ? 700 : 400, a = r ? "italic" : "normal";
		t.set(`${i}:${a}`, {
			family: "Calibri",
			weight: i,
			style: a
		});
	};
	for (let t of e?.styles?.fonts ?? []) n(t.name, t.bold, t.italic);
	for (let t of e?.sharedStrings ?? []) for (let e of t.runs ?? []) e.font && n(e.font.name, e.font.bold, e.font.italic);
	return [...t.values()];
}
function qt(e) {
	let t = /* @__PURE__ */ new Map(), n = e.defaultFontFamily?.trim(), r = e.defaultFontBold ? 700 : 400, i = e.defaultFontItalic ? "italic" : "normal";
	if (n && Ve(n, {
		weight: r,
		style: i
	}).length) {
		let e = {
			family: n,
			weight: r,
			style: i
		};
		t.set(zt(e), e);
	}
	for (let n of e.rows) for (let e of n.cells) if (e.value.type === "text") for (let n of e.value.runs ?? []) {
		let e = n.font;
		if (!e || (e.name?.trim().toLowerCase() || "calibri") !== "calibri") continue;
		let r = {
			family: "Calibri",
			weight: e.bold ? 700 : 400,
			style: e.italic ? "italic" : "normal"
		};
		t.set(zt(r), r);
	}
	for (let n of e.shapeGroups ?? []) for (let e of n.shapes) {
		if (!e.text) continue;
		let n = Rt(e.text);
		if (!n) continue;
		let r = n.bold ? 700 : 400, i = n.italic ? "italic" : "normal";
		if (Ve(n.fontFace, {
			weight: r,
			style: i
		}).length === 0) continue;
		let a = {
			family: n.fontFace.trim(),
			weight: r,
			style: i
		};
		t.set(zt(a), a);
	}
	return [...t.values()];
}
//#endregion
//#region packages/xlsx/src/worker.ts?worker&inline
var Jt = "var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,r.unregister(this),e}free(){let e=this.__destroy_into_raw();_.__wbg_xlsxarchive_free(e,0)}acknowledge_sheet_cursor_terminal(){let e=_.xlsxarchive_acknowledge_sheet_cursor_terminal(this.__wbg_ptr);if(e[1])throw f(e[0])}assert_healthy(){let e=_.xlsxarchive_assert_healthy(this.__wbg_ptr);if(e[1])throw f(e[0])}cancel_sheet_cursor(){_.xlsxarchive_cancel_sheet_cursor(this.__wbg_ptr)}close_sheet_cursor(){_.xlsxarchive_close_sheet_cursor(this.__wbg_ptr)}extract_image(e){let t=d(e,_.__wbindgen_malloc,_.__wbindgen_realloc),n=g,r=_.xlsxarchive_extract_image(this.__wbg_ptr,t,n);if(r[3])throw f(r[2]);var a=i(r[0],r[1]).slice();return _.__wbindgen_free(r[0],r[1]*1,1),a}constructor(e,t,n,i){let a=ee(e,_.__wbindgen_malloc),o=g,s=_.xlsxarchive_new(a,o,!u(t),u(t)?BigInt(0):t,!u(n),u(n)?BigInt(0):n,!u(i),u(i)?BigInt(0):i);if(s[2])throw f(s[1]);return this.__wbg_ptr=s[0]>>>0,r.register(this,this.__wbg_ptr,this),this}open_sheet_cursor(e,t){let n=d(t,_.__wbindgen_malloc,_.__wbindgen_realloc),r=g,i=_.xlsxarchive_open_sheet_cursor(this.__wbg_ptr,e,n,r);if(i[1])throw f(i[0])}parse(){let e=_.xlsxarchive_parse(this.__wbg_ptr);if(e[3])throw f(e[2]);var t=i(e[0],e[1]).slice();return _.__wbindgen_free(e[0],e[1]*1,1),t}pull_sheet_cursor(e){let t=_.xlsxarchive_pull_sheet_cursor(this.__wbg_ptr,e);if(t[3])throw f(t[2]);var n=i(t[0],t[1]).slice();return _.__wbindgen_free(t[0],t[1]*1,1),n}resource_usage(){let e=_.xlsxarchive_resource_usage(this.__wbg_ptr);if(e[3])throw f(e[2]);var t=i(e[0],e[1]).slice();return _.__wbindgen_free(e[0],e[1]*1,1),t}sheet_cursor_pull_finished(){return _.xlsxarchive_sheet_cursor_pull_finished(this.__wbg_ptr)!==0}sheet_cursor_resource_usage(){let e=_.xlsxarchive_sheet_cursor_resource_usage(this.__wbg_ptr);if(e[3])throw f(e[2]);var t=i(e[0],e[1]).slice();return _.__wbindgen_free(e[0],e[1]*1,1),t}to_markdown(){let e,t;try{let i=_.xlsxarchive_to_markdown(this.__wbg_ptr);var n=i[0],r=i[1];if(i[3])throw n=0,r=0,f(i[2]);return e=n,t=r,s(n,r)}finally{_.__wbindgen_free(e,t,1)}}};Symbol.dispose&&(t.prototype[Symbol.dispose]=t.prototype.free);function n(){return{__proto__:null,\"./xlsx_parser_bg.js\":{__proto__:null,__wbg___wbindgen_throw_6b64449b9b9ed33c:function(e,t){throw Error(s(e,t))},__wbg_error_a6fa202b58aa1cd3:function(e,t){let n,r;try{n=e,r=t,console.error(s(e,t))}finally{_.__wbindgen_free(n,r,1)}},__wbg_new_227d7c05414eb861:function(){return Error()},__wbg_stack_3b0d974bbf31e44f:function(e,t){let n=t.stack,r=d(n,_.__wbindgen_malloc,_.__wbindgen_realloc),i=g;o().setInt32(e+4,i,!0),o().setInt32(e+0,r,!0)},__wbindgen_cast_0000000000000001:function(e,t){return s(e,t)},__wbindgen_init_externref_table:function(){let e=_.__wbindgen_externrefs,t=e.grow(4);e.set(0,void 0),e.set(t+0,void 0),e.set(t+1,null),e.set(t+2,!0),e.set(t+3,!1)}}}}const r=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>_.__wbg_xlsxarchive_free(e>>>0,1));function i(e,t){return e>>>=0,l().subarray(e/1,e/1+t)}let a=null;function o(){return(a===null||a.buffer.detached===!0||a.buffer.detached===void 0&&a.buffer!==_.memory.buffer)&&(a=new DataView(_.memory.buffer)),a}function s(e,t){return e>>>=0,te(e,t)}let c=null;function l(){return(c===null||c.byteLength===0)&&(c=new Uint8Array(_.memory.buffer)),c}function u(e){return e==null}function ee(e,t){let n=t(e.length*1,1)>>>0;return l().set(e,n/1),g=e.length,n}function d(e,t,n){if(n===void 0){let n=h.encode(e),r=t(n.length,1)>>>0;return l().subarray(r,r+n.length).set(n),g=n.length,r}let r=e.length,i=t(r,1)>>>0,a=l(),o=0;for(;o<r;o++){let t=e.charCodeAt(o);if(t>127)break;a[i+o]=t}if(o!==r){o!==0&&(e=e.slice(o)),i=n(i,r,r=o+e.length*3,1)>>>0;let t=l().subarray(i+o,i+r),a=h.encodeInto(e,t);o+=a.written,i=n(i,r,o,1)>>>0}return g=o,i}function f(e){let t=_.__wbindgen_externrefs.get(e);return _.__externref_table_dealloc(e),t}let p=new TextDecoder(`utf-8`,{ignoreBOM:!0,fatal:!0});p.decode();let m=0;function te(e,t){return m+=t,m>=2146435072&&(p=new TextDecoder(`utf-8`,{ignoreBOM:!0,fatal:!0}),p.decode(),m=t),p.decode(l().subarray(e,e+t))}const h=new TextEncoder;`encodeInto`in h||(h.encodeInto=function(e,t){let n=h.encode(e);return t.set(n),{read:e.length,written:n.length}});let g=0,_;function ne(e,t){return _=e.exports,a=null,c=null,_.__wbindgen_start(),_}async function re(e,t){if(typeof Response==`function`&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming==`function`)try{return await WebAssembly.instantiateStreaming(e,t)}catch(t){if(e.ok&&n(e.type)&&e.headers.get(`Content-Type`)!==`application/wasm`)console.warn(\"`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\\n\",t);else throw t}let r=await e.arrayBuffer();return await WebAssembly.instantiate(r,t)}else{let n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}function n(e){switch(e){case`basic`:case`cors`:case`default`:return!0}return!1}}async function v(e){if(_!==void 0)return _;e!==void 0&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn(`using deprecated parameters for the initialization function; pass a single object instead`));let t=n();(typeof e==`string`||typeof Request==`function`&&e instanceof Request||typeof URL==`function`&&e instanceof URL)&&(e=fetch(e));let{instance:r,module:i}=await re(await e,t);return ne(r,i)}async function ie(e){return _=void 0,a=null,c=null,v(e)}var y=class e extends Error{code;constructor(t,n){super(n),this.name=`OoxmlError`,this.code=t,Object.setPrototypeOf(this,e.prototype)}},b=class e extends Error{code=`ooxml-resource-limit`;details;constructor(t,n){super(t),this.name=`OoxmlResourceLimitError`;let r=n.violation,i=Object.freeze({format:r.format,operation:r.operation,resource:r.resource,metric:r.metric,...r.part===void 0?{}:{part:r.part},limit:r.limit,observed:r.observed,configurable:r.configurable,usage:Object.freeze({archiveEntryCount:r.usage.archiveEntryCount,declaredInflatedBytes:r.usage.declaredInflatedBytes,...r.usage.largestInflatedEntryBytes===void 0?{}:{largestInflatedEntryBytes:r.usage.largestInflatedEntryBytes},distinctInflatedBytes:r.usage.distinctInflatedBytes,operationInflatedBytes:r.usage.operationInflatedBytes})});this.details=Object.freeze({stage:n.stage,violation:i}),Object.setPrototypeOf(this,e.prototype)}};function ae(e){return e===`image-dimension`||e===`image-pixels`||e===`active-decoded-bytes`}function x(e){return typeof e==`number`&&Number.isSafeInteger(e)&&e>=0}function oe(e){if(!(!e||typeof e!=`object`))try{let t=e,n=t.code,r=t.metric,i=t.limit,a=t.observed;return n!==`ooxml-decoded-image-limit`||!ae(r)||!x(i)||!x(a)||a<=i?void 0:{metric:r,limit:i,observed:a}}catch{return}}var S,C,w,se=e((()=>{S=1<<25,C=1<<27,S*4,C*4,w=class e extends RangeError{code=`ooxml-decoded-image-limit`;constructor(t,n,r){super(`OOXML decoded image limit exceeded: ${t} ${r} > ${n}`),this.metric=t,this.limit=n,this.observed=r,this.name=`OoxmlDecodedImageLimitError`,Object.setPrototypeOf(this,e.prototype)}}}));function ce(e){if(!(typeof e!=`object`||!e))try{let t=e,n=t.code,r=t.message;return n===`ooxml-tiff-decode`&&typeof r==`string`?{message:r}:void 0}catch{return}}var le=e((()=>{}));function ue(e){if(!e.startsWith(`data:`))return null;let t=e.indexOf(`,`);if(t===-1)return null;let n=atob(e.slice(t+1)),r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r.buffer}var de=class{state=`uninitialized`;generationValue=0;readiness;poisonListeners=new Set;constructor(e,t,n){this.initialize=e,this.reinitialize=t,this.normalizeFailure=n}get generation(){return this.generationValue}get poisoned(){return this.state===`poisoned`}onPoison(e){return this.poisonListeners.add(e),()=>this.poisonListeners.delete(e)}async ensureReady(){if(this.state!==`ready`){if(!this.readiness){let e=this.state===`uninitialized`?this.initialize:this.reinitialize;this.readiness=Promise.resolve().then(e).then(()=>{this.generationValue+=1,this.state=`ready`,this.readiness=void 0},e=>{throw this.readiness=void 0,e})}await this.readiness}}run(e){try{return e()}catch(e){let t=this.normalizeFailure(e);throw t?(this.poison(t),t):e}}tryRunReady(e){if(this.state!==`ready`)return{current:!1};let t=this.generationValue,n=this.run(e);return this.state!==`ready`||t!==this.generationValue?{current:!1}:{current:!0,generation:t,value:n}}poison(e){this.state=`poisoned`,this.readiness=void 0;for(let t of this.poisonListeners)t(e)}assertCurrent(e){if(this.state!==`ready`||e!==this.generationValue)throw Error(`WASM archive session belongs to a discarded runtime generation`)}},T=class e extends Error{code=`parser-crashed`;constructor(t){super(t),this.name=`WasmTrapError`,Object.setPrototypeOf(this,e.prototype)}};function fe(e){let t=globalThis.WebAssembly?.RuntimeError;return t&&e instanceof t||e instanceof RangeError?!0:e instanceof Error?e.name===`RuntimeError`||e.name===`CompileError`||e.name===`LinkError`||e.name===`InternalError`||e.name===`OOMError`:!1}function pe(e){try{if((typeof e!=`object`||!e)&&typeof e!=`function`)return;let t=Reflect.get(e,`__destroy_into_raw`);typeof t==`function`&&Reflect.apply(t,e,[])}catch{}}function me(e,t){return e({module_or_path:t})}var he=class{runtime;wasmInput=null;currentArchive=null;constructor(e,t={}){this.init=e,this.options=t,this.runtime=new de(()=>this.invokeConfigured(this.init),()=>this.invokeConfigured(this.options.reinit??this.init),ge),this.runtime.onPoison(()=>this.dropPoisonedArchive())}setWasmInput(e){this.wasmInput=e,this.runtime.ensureReady().catch(()=>void 0)}setWasmUrl(e){this.setWasmInput(e)}get archive(){return this.currentArchive}setArchive(e){this.freeArchive(),this.currentArchive=e}disposeArchive(){this.freeArchive()}get poisoned(){return this.runtime.poisoned}async ensureReady(){await this.runtime.ensureReady()}run(e){return this.runtime.run(e)}poison(){this.runtime.poison(new T(`WASM parser was recycled`))}invokeConfigured(e){return this.wasmInput===null?Promise.reject(Error(`WasmParserHost: setWasmInput was never called`)):me(e,this.wasmInput)}freeArchive(){this.currentArchive!==null&&this.options.freeArchive&&this.options.freeArchive(this.currentArchive),this.currentArchive=null}dropPoisonedArchive(){let e=this.currentArchive;this.currentArchive=null,pe(e)}};function ge(e){return fe(e)?new T(`WASM parser trapped and was recycled: ${e instanceof Error?e.message:String(e)}`):null}function E(e){return typeof e==`number`&&Number.isSafeInteger(e)&&e>0}function _e(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;return E(t.requiredBytes)&&E(t.offeredBytes)&&t.requiredBytes>t.offeredBytes}var D=class e extends RangeError{code=`ooxml-insufficient-credit`;requiredBytes;offeredBytes;constructor(t){super(`Pull unit requires ${t.requiredBytes} bytes but credit is ${t.offeredBytes}`),this.name=`PullSessionInsufficientCreditError`,this.requiredBytes=t.requiredBytes,this.offeredBytes=t.offeredBytes,Object.setPrototypeOf(this,e.prototype)}};function ve(e){if(e instanceof D)return e;let t=e instanceof Error?e.message:String(e);if(!t.startsWith(`OOXML_INSUFFICIENT_CREDIT:`))return;let n;try{n=JSON.parse(t.slice(26))}catch{return}if(!n||typeof n!=`object`||Array.isArray(n))return;let r=n;if(!(r.code!==`ooxml-insufficient-credit`||!_e(r)))return new D(r)}se(),le();const O=`OOXML_RESOURCE_LIMIT:`;function k(e){return typeof e==`number`&&Number.isSafeInteger(e)&&e>=0}function A(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;return k(t.archiveEntryCount)&&k(t.declaredInflatedBytes)&&(t.largestInflatedEntryBytes===void 0||k(t.largestInflatedEntryBytes))&&k(t.distinctInflatedBytes)&&k(t.operationInflatedBytes)}function j(e){let t;try{t=JSON.parse(new TextDecoder().decode(e))}catch{throw TypeError(`OOXML resource usage checkpoint is not valid JSON`)}if(!A(t))throw TypeError(`OOXML resource usage checkpoint is invalid`);return t}function ye(e){return e===`docx`||e===`xlsx`||e===`pptx`}function be(e){return e===`container`||e===`decompression`||e===`parsing`||e===`serialization`||e===`layout`||e===`rendering`||e===`worker`}function M(e,t){return typeof e==`string`&&e.length>0&&e.length<=t&&!/[\\u0000-\\u001f\\u007f]/u.test(e)}function N(e){return M(e,128)&&/^[a-z0-9][a-z0-9-]*$/u.test(e)}function xe(e){return!M(e,4096)||e.startsWith(`/`)||e.startsWith(`\\\\`)||e.includes(`\\\\`)||e.includes(`?`)||e.includes(`#`)||e.includes(`://`)||/^[a-z]:/iu.test(e)?!1:e.split(`/`).every(e=>e!==``&&e!==`.`&&e!==`..`)}const P=new Map([[`archive-entry:declared-inflated-bytes`,{stage:`container`,part:`required`}],[`archive-entry:actual-inflated-bytes`,{stage:`decompression`,part:`required`}],[`archive:entry-count`,{stage:`container`,part:`forbidden`}],[`archive:central-directory-bytes`,{stage:`container`,part:`forbidden`,configurable:!1}],[`archive:distinct-inflated-bytes`,{stage:`decompression`,part:`required`}],[`xml-event:bytes`,{stage:`parsing`,part:`optional`,configurable:!1}],[`xml-context:bytes`,{stage:`parsing`,part:`optional`,configurable:!1}],[`xml-tree:depth`,{stage:`parsing`,part:`optional`,configurable:!1}],[`worksheet-row:projected-bytes`,{stage:`parsing`,part:`optional`,configurable:!1}],[`worksheet-shell:projected-bytes`,{stage:`parsing`,part:`optional`,configurable:!1}]]),Se=new Set([...P.keys()].map(e=>e.slice(0,e.indexOf(`:`)))),Ce=new Set([...P.keys()].map(e=>e.slice(e.indexOf(`:`)+1)));function we(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;return!ye(t.format)||!M(t.operation,256)||!N(t.resource)||!N(t.metric)||!k(t.limit)||!k(t.observed)||typeof t.configurable!=`boolean`||!A(t.usage)?!1:!(`part`in t)||xe(t.part)}function F(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;if(!be(t.stage)||!we(t.violation))return!1;let n=t.violation,r=P.get(`${n.resource}:${n.metric}`);return r?t.stage!==r.stage||r.configurable===!1&&n.configurable!==!1?!1:r.part===`required`?n.part!==void 0:r.part===`forbidden`?n.part===void 0:!0:!(Se.has(n.resource)&&Ce.has(n.metric))}function Te(e){return{archiveEntryCount:e.archiveEntryCount,declaredInflatedBytes:e.declaredInflatedBytes,...e.largestInflatedEntryBytes===void 0?{}:{largestInflatedEntryBytes:e.largestInflatedEntryBytes},distinctInflatedBytes:e.distinctInflatedBytes,operationInflatedBytes:e.operationInflatedBytes}}function Ee(e){if(!F(e))return;let t=e.violation,n={stage:e.stage,violation:{format:t.format,operation:t.operation,resource:t.resource,metric:t.metric,...t.part===void 0?{}:{part:t.part},limit:t.limit,observed:t.observed,configurable:t.configurable,usage:Te(t.usage)}};return F(n)?n:void 0}function I(e){let t=e.violation;return`OOXML resource limit exceeded${t.part?` for ${t.part}`:``}: ${t.metric} ${t.observed} > ${t.limit}`}function De(e){let t=e instanceof Error?e.message:String(e);if(!t.startsWith(O))return;let n;try{n=JSON.parse(t.slice(21))}catch{return}if(!n||typeof n!=`object`)return;let r=n;if(!(r.code!==`ooxml-resource-limit`||!F(r.details)))return new b(I(r.details),r.details)}function Oe(e){let t=oe(e);if(t){let e=new w(t.metric,t.limit,t.observed);return{message:e.message,errorName:e.name,code:e.code,decodedImage:t}}let n=ce(e);if(n)return{message:n.message,errorName:`TiffDecodeError`,code:`ooxml-tiff-decode`};let r=ve(e);if(r)return{message:r.message,errorName:r.name,code:r.code,insufficientCredit:{requiredBytes:r.requiredBytes,offeredBytes:r.offeredBytes}};let i=e instanceof y||e instanceof b?e:De(e);if(i instanceof b){let e=Ee(i.details);return e?{message:typeof i.message==`string`?i.message:I(e),errorName:`OoxmlResourceLimitError`,code:`ooxml-resource-limit`,resourceLimit:e}:{message:`Invalid OOXML resource-limit error payload`,errorName:`Error`}}if(i instanceof y)return{message:typeof i.message==`string`?i.message:String(i.message),errorName:M(i.name,128)?i.name:`OoxmlError`,...N(i.code)?{code:i.code}:{}};let a=e instanceof Error?e.message:String(e);if(typeof a==`string`&&a.startsWith(O))return{message:`Invalid OOXML resource-limit payload`,errorName:`Error`};let o=e instanceof Error?e:Error(a),s=o;return{message:typeof o.message==`string`?o.message:String(o.message),errorName:M(o.name,128)?o.name:`Error`,...typeof s.code==`string`?{code:s.code}:{}}}function L(e){try{return Oe(e)}catch{return{message:`Worker operation failed with an unreadable error`,errorName:`Error`}}}function ke(e){return e.byteOffset===0&&e.byteLength===e.buffer.byteLength&&e.buffer instanceof ArrayBuffer?e.buffer:e.slice().buffer}Object.freeze({maxArchiveEntryBytes:134217728,maxTotalInflatedBytes:268435456,maxArchiveEntries:4096});function Ae(e){return[e.maxArchiveEntryBytes===null?0n:BigInt(e.maxArchiveEntryBytes),e.maxTotalInflatedBytes===null?0n:BigInt(e.maxTotalInflatedBytes),e.maxArchiveEntries===null?0n:BigInt(e.maxArchiveEntries)]}const R=`ooxml-pull-v1`;function z(e,t){if(!Number.isSafeInteger(e)||e<=0)throw RangeError(`${t} must be a positive safe integer`)}function je(e){if(!(typeof e==`string`&&e.length>0||typeof e==`number`&&Number.isSafeInteger(e)&&e>0))throw RangeError(`session id must be a non-empty string or positive safe integer`)}var Me=class{owner;queue=Promise.resolve();leases=new Map;retainedBytes=0;retainedCount=0;maxRetainedBytes;maxRetainedCount;cleanups=new Set;pendingFatalCleanups=[];poisonRunning=!1;fatal;constructor(e){this.maxRetainedBytes=e?.maxRetainedBytes??64*1024*1024,this.maxRetainedCount=e?.maxRetainedCount??256,z(this.maxRetainedBytes,`max retained lease bytes`),z(this.maxRetainedCount,`max retained lease count`)}enqueue(e){let t=this.queue.then(e,e);return this.queue=t.then(()=>void 0,()=>void 0),t}acquire(e){return this.owner===void 0?(this.owner=e,!0):this.owner===e}release(e){this.owner===e&&(this.owner=void 0)}retainLease(e,t,n){if(!Number.isSafeInteger(n)||n<0)throw RangeError(`retained lease bytes are invalid`);let r=this.leases.get(e)??new Map;if(r.has(t))throw Error(`driver returned a duplicate lease id`);if(this.retainedCount+1>this.maxRetainedCount)throw RangeError(`retained lease count exceeds limit`);if(this.retainedBytes+n>this.maxRetainedBytes)throw RangeError(`retained lease bytes exceed limit`);r.set(t,n),this.leases.set(e,r),this.retainedCount++,this.retainedBytes+=n}releaseLease(e,t){let n=this.leases.get(e),r=n?.get(t);r!==void 0&&(n?.delete(t),n?.size===0&&this.leases.delete(e),this.retainedCount--,this.retainedBytes-=r)}registerCleanup(e){return this.fatal?(this.poisonRunning?this.pendingFatalCleanups.push(e):this.enqueue(e).catch(()=>void 0),()=>void 0):(this.cleanups.add(e),()=>this.cleanups.delete(e))}get fatalError(){return this.fatal}get registeredHostCount(){return this.cleanups.size}async poison(e){if(this.fatal??=e,this.poisonRunning)return this.fatal;this.poisonRunning=!0,this.pendingFatalCleanups.push(...this.cleanups);try{let e;for(;(e=this.pendingFatalCleanups.shift())!==void 0;)await e().catch(()=>void 0)}finally{this.poisonRunning=!1}return this.fatal}},Ne=class{options;coordinator;coordinatorOwner=Symbol(`pull-session-host`);unregisterCleanup;sequence=0;unacked;leases=new Map;activeDriverLeases=new Set;nextWireLeaseId;cancelRequested=!1;cancelComplete=!1;closeRequested=!1;closeComplete=!1;driverCancelComplete=!1;driverCloseComplete=!1;completed=!1;constructor(e){je(e.sessionId),z(e.operationId,`operation id`),z(e.generation,`generation`),z(e.maxByteCredit,`max byte credit`),e.wireLeaseIdStart!==void 0&&z(e.wireLeaseIdStart,`wire lease id start`),this.options=e,this.coordinator=e.coordinator,this.nextWireLeaseId=e.wireLeaseIdStart??1,this.unregisterCleanup=this.coordinator.registerCleanup(()=>this.forceFatalCleanup())}dispatch(e,t){return this.coordinator.enqueue(async()=>{let n=await this.execute(e);try{t(n.response,n.transfer)}catch(e){throw await this.rollbackFailedPost(n),e}})}async rollbackFailedPost(e){let t=e.response;if(t.kind===`chunk`){let n=t.leaseId===void 0?void 0:this.leases.get(t.leaseId);try{await this.options.driver.disposeInvalidChunk?.({payload:t.payload,byteLength:t.byteLength,done:t.done,leaseId:n?.driverLeaseId,retainedBytes:n?.retainedBytes,transfer:e.transfer})}catch{}}this.unacked=void 0,this.coordinator.release(this.coordinatorOwner);for(let[e,t]of[...this.leases])try{await this.options.driver.releaseLease?.(t.driverLeaseId)}catch{}finally{this.leases.delete(e),this.activeDriverLeases.delete(t.driverLeaseId),this.coordinator.releaseLease(this.coordinatorOwner,e)}if(this.cancelRequested=!0,!this.driverCancelComplete)try{await this.options.driver.cancel?.(),this.driverCancelComplete=!0}catch{}this.unregisterCleanup()}async execute(e){try{if(this.isStaleLifecycle(e)){let t=e.kind===`cancel`?`cancel`:`close`;return this.sameOperationIdentity(e)?{response:this.accepted(e,t,!0)}:{response:this.errorResponse(e,{message:`stale lifecycle targets another session or operation`,errorName:`PullSessionProtocolError`,code:`ooxml-stale-lifecycle`})}}this.validateCommandIdentity(e);let t=this.coordinator.fatalError;if(t)return e.kind===`pull`?{response:this.errorResponse(e,t)}:(e.kind===`cancel`?await this.cancel():e.kind===`close`?await this.close():e.kind===`release`&&await this.release(e.leaseId),{response:this.accepted(e,e.kind)});switch(e.kind){case`pull`:return await this.pull(e);case`ack`:return await this.ack(e.sequence),{response:this.accepted(e,`ack`)};case`release`:return await this.release(e.leaseId),{response:this.accepted(e,`release`)};case`cancel`:return await this.cancel(),{response:this.accepted(e,`cancel`)};case`close`:return await this.close(),{response:this.accepted(e,`close`)}}}catch(t){let n=L(t);return n.code===`ooxml-resource-limit`&&(n=await this.coordinator.poison(n)),{response:this.errorResponse(e,n)}}}async pull(e){if(this.closeRequested||this.cancelRequested||this.completed)throw Error(`pull session is closed`);if(this.unacked)throw Error(`previous chunk is not acknowledged`);if(!Number.isSafeInteger(e.sequence)||e.sequence<0||e.sequence!==this.sequence)throw Error(`pull command sequence mismatch`);if(this.validateHostCredit(e.byteCredit),!this.coordinator.acquire(this.coordinatorOwner))throw Error(`another operation has an unacknowledged package chunk`);let t;try{t=await this.options.driver.pull(e.byteCredit)}catch(e){throw this.coordinator.release(this.coordinatorOwner),e}let n=!1,r=!1,i,a;try{let o=this.options.driver.measureChunk(t),s=this.arrayBufferTransferBytes(t.transfer);if(o<s)throw RangeError(`measured chunk bytes are below ArrayBuffer transfer bytes`);if(a=Math.max(o,s),t.leaseId!==void 0){if(z(t.leaseId,`lease id`),t.retainedBytes===void 0)throw Error(`retained lease bytes are required`);if(this.activeDriverLeases.has(t.leaseId))throw r=!0,Error(`driver returned an active duplicate lease id`);i=this.allocateWireLeaseId(),this.coordinator.retainLease(this.coordinatorOwner,i,t.retainedBytes),this.leases.set(i,{driverLeaseId:t.leaseId,retainedBytes:t.retainedBytes}),this.activeDriverLeases.add(t.leaseId),n=!0}else if(t.retainedBytes!==void 0)throw Error(`retained lease bytes require a lease id`);if(!Number.isSafeInteger(a)||a<0)throw RangeError(`host chunk byte length must be a non-negative safe integer`);if(a>e.byteCredit)throw RangeError(`host chunk exceeds byte credit`)}catch(e){let a;try{await this.options.driver.disposeInvalidChunk?.(t)}catch(e){a=e}if(n&&i!==void 0)try{await this.release(i)}catch(e){a??=e}else if(t.leaseId!==void 0&&!r)try{await this.options.driver.releaseLease?.(t.leaseId)}catch(e){a??=e}if(r)try{await this.cancel()}catch(e){a??=e}throw this.coordinator.release(this.coordinatorOwner),a||e}return this.unacked={sequence:this.sequence,done:t.done},{response:{kind:`chunk`,protocol:R,...this.identity(),requestId:e.requestId,sequence:this.sequence,byteLength:a,done:t.done,payload:t.payload,leaseId:i,usage:this.resourceUsage()},transfer:t.transfer}}async ack(e){if(!Number.isSafeInteger(e)||e<0)throw RangeError(`invalid ack sequence`);if(e<this.sequence)return;if(!this.unacked||e!==this.sequence)throw Error(`ack sequence mismatch`);let t=this.unacked.done;await this.options.driver.acknowledge?.(e),this.unacked=void 0,this.coordinator.release(this.coordinatorOwner),this.sequence++,t&&(this.completed=!0,this.maybeUnregisterCompleted())}async release(e){z(e,`wire lease id`);let t=this.leases.get(e);t&&(await this.options.driver.releaseLease?.(t.driverLeaseId),this.leases.delete(e),this.activeDriverLeases.delete(t.driverLeaseId),this.coordinator.releaseLease(this.coordinatorOwner,e),this.maybeUnregisterCompleted())}async cancel(){if(this.cancelComplete)return;this.cancelRequested=!0,this.unacked=void 0,this.coordinator.release(this.coordinatorOwner);let e;try{await this.releaseAllLeases()}catch(t){e=t}if(!this.driverCancelComplete)try{await this.options.driver.cancel?.(),this.driverCancelComplete=!0}catch(t){e??=t}if(e)throw e;this.cancelComplete=!0,this.unregisterCleanup()}async close(){if(this.closeComplete)return;this.closeRequested=!0,this.unacked=void 0,this.coordinator.release(this.coordinatorOwner);let e;try{await this.releaseAllLeases()}catch(t){e=t}if(!this.driverCloseComplete)try{await this.options.driver.close?.(),this.driverCloseComplete=!0}catch(t){e??=t}if(e)throw e;this.closeComplete=!0,this.unregisterCleanup()}async releaseAllLeases(){let e;for(let t of[...this.leases.keys()])try{await this.release(t)}catch(t){e??=t}if(e)throw e}validateCommandIdentity(e){if(e.protocol!==`ooxml-pull-v1`||e.sessionId!==this.options.sessionId||e.operationId!==this.options.operationId||e.generation!==this.options.generation||!Number.isSafeInteger(e.requestId)||e.requestId<=0)throw Error(`stale or mismatched pull session command`)}validateHostCredit(e){if(z(e,`byte credit`),e>this.options.maxByteCredit)throw RangeError(`byte credit exceeds host maximum`)}accepted(e,t,n=!1){return{kind:`accepted`,protocol:R,...n?{sessionId:e.sessionId,operationId:e.operationId,generation:e.generation}:this.identity(),requestId:e.requestId,command:t,usage:this.resourceUsage()}}identity(){return{sessionId:this.options.sessionId,operationId:this.options.operationId,generation:this.options.generation}}isStaleLifecycle(e){return(e.kind===`cancel`||e.kind===`close`)&&e.protocol===`ooxml-pull-v1`&&Number.isSafeInteger(e.requestId)&&e.requestId>0&&Number.isSafeInteger(e.generation)&&e.generation>0&&e.generation<this.options.generation}sameOperationIdentity(e){return e.sessionId===this.options.sessionId&&e.operationId===this.options.operationId}errorResponse(e,t){return{kind:`error`,protocol:R,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,error:t,usage:this.errorResourceUsage()}}async forceFatalCleanup(){this.cancelRequested=!0,this.unacked=void 0,this.coordinator.release(this.coordinatorOwner);let e;for(let t of[...this.leases.keys()])try{await this.release(t)}catch(t){e??=t}if(!this.driverCancelComplete)try{await this.options.driver.cancel?.(),this.driverCancelComplete=!0}catch(t){e??=t}if(e)throw e;this.unregisterCleanup()}allocateWireLeaseId(){if(!Number.isSafeInteger(this.nextWireLeaseId)||this.nextWireLeaseId<=0)throw RangeError(`wire lease id space exhausted`);return this.nextWireLeaseId++}arrayBufferTransferBytes(e){let t=0;for(let n of e??[])if(n instanceof ArrayBuffer&&(t+=n.byteLength,!Number.isSafeInteger(t)))throw RangeError(`ArrayBuffer transfer bytes overflow`);return t}maybeUnregisterCompleted(){this.completed&&this.leases.size===0&&this.unregisterCleanup()}resourceUsage(){return this.options.driver.resourceUsage?.()}errorResourceUsage(){try{return this.resourceUsage()}catch{return}}};function Pe(e,t){let n=e();try{return{workbook:n,usage:j(t())}}catch(e){if((e instanceof Error?e.message:String(e))===`xlsx resource usage is unavailable`)return{workbook:n,usage:void 0};throw e}}function Fe(e,t){for(let n of e)for(let e of n.cells){let n=e.value;if(n.type===`shared`){let r=t[n.si];if(r){let t={type:`text`,text:r.text};r.runs!==void 0&&(t.runs=r.runs),r.phoneticRuns!==void 0&&(t.phoneticRuns=r.phoneticRuns),r.phoneticPr!==void 0&&(t.phoneticPr=r.phoneticPr),e.value=t}else e.value={type:`text`,text:``}}}return e}function Ie(e,t,n,r){let i=e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength),a=JSON.parse(new TextDecoder().decode(i));if(!a||typeof a!=`object`||!(`kind`in a))throw Error(`worksheet cursor returned an invalid unit`);let o=a;if(t!==(o.kind===`finished`))throw Error(`worksheet cursor terminal marker mismatch`);if(o.kind===`rows`){if(!Array.isArray(o.rows))throw Error(`worksheet row unit is missing rows`);return n&&Fe(o.rows,n),r?.(o.rows),{kind:`rows`,rows:o.rows}}if(o.kind===`finished`){if(!o.worksheet||typeof o.worksheet!=`object`)throw Error(`worksheet terminal unit is missing its worksheet`);return o.worksheet.rows=[],{kind:`finished`,worksheet:o.worksheet}}throw Error(`worksheet cursor returned an unknown unit kind`)}function B(e,t){if(!Number.isSafeInteger(e)||e<0)throw Error(`${t} must be a non-negative safe integer`)}function V(e,t,n){return B(e,`resource measurement`),B(t,`resource measurement`),B(n,`resource measurement limit`),e>n||t>n||t>n-e?n===2**53-1?n:n+1:e+t}function H(e,t=2**53-1){B(t,`resource measurement limit`);let n=0;for(let r=0;r<e.length;r+=1){let i=e.charCodeAt(r),a;if(i<=127)a=1;else if(i<=2047)a=2;else if(i>=55296&&i<=56319&&r+1<e.length){let t=e.charCodeAt(r+1);t>=56320&&t<=57343?(a=4,r+=1):a=3}else a=3;if(n=V(n,a,t),n>t)return n}return n}function U(e,t=2**53-1){B(t,`resource measurement limit`);let n=V(0,2,t);if(n>t)return n;for(let r=0;r<e.length;r+=1){let i=e.charCodeAt(r),a;if(i===34||i===92||i===8||i===9||i===10||i===12||i===13)a=2;else if(i<=31)a=6;else if(i<=127)a=1;else if(i<=2047)a=2;else if(i>=55296&&i<=56319&&r+1<e.length){let t=e.charCodeAt(r+1);t>=56320&&t<=57343?(a=4,r+=1):a=6}else a=i>=55296&&i<=57343?6:3;if(n=V(n,a,t),n>t)return n}return n}function W(e,t){return V(0,e,t)}function G(e,t=2**53-1,n=!1){if(B(t,`resource measurement limit`),e===null)return{jsonBytes:W(4,t),stringValueUtf8Bytes:0};if(typeof e==`string`)return{jsonBytes:U(e,t),stringValueUtf8Bytes:H(e,t)};if(typeof e==`boolean`)return{jsonBytes:W(e?4:5,t),stringValueUtf8Bytes:0};if(typeof e==`number`)return{jsonBytes:W((Number.isFinite(e)?String(Object.is(e,-0)?0:e):`null`).length,t),stringValueUtf8Bytes:0};if(typeof e==`bigint`)throw TypeError(`BigInt values cannot be serialized to JSON`);if(Array.isArray(e)){let n=W(2,t),r=0;for(let i=0;i<e.length;i+=1){i!==0&&(n=V(n,1,t));let a=G(e[i],t,!0);n=V(n,a.jsonBytes,t),r=V(r,a.stringValueUtf8Bytes,t)}return{jsonBytes:n,stringValueUtf8Bytes:r}}if(typeof e==`object`){let n=W(2,t),r=0,i=0;for(let[a,o]of Object.entries(e)){if(o===void 0||typeof o==`function`||typeof o==`symbol`)continue;i++!==0&&(n=V(n,1,t)),n=V(n,U(a,t),t),n=V(n,1,t);let e=G(o,t);n=V(n,e.jsonBytes,t),r=V(r,e.stringValueUtf8Bytes,t)}return{jsonBytes:n,stringValueUtf8Bytes:r}}return{jsonBytes:n?W(4,t):0,stringValueUtf8Bytes:0}}const K=1e5,q=25e4,J=33554432,Y=67108864,Le=Object.freeze({archiveEntryCount:0,declaredInflatedBytes:0,distinctInflatedBytes:0,operationInflatedBytes:0});function Re(e){let t=e.reduce((e,t)=>V(e,t.cells.length,q),0);return{rows:e.length,cells:t,ownedUtf8Bytes:e.reduce((e,t)=>t.cells.reduce((e,t)=>{let n=G(t.value,J).stringValueUtf8Bytes;return V(e,V(n,t.formula===void 0?0:H(t.formula,J),J),J)},e),0)}}function ze(e,t){let n=G(e,67108864);return{...t,jsonBytes:n.jsonBytes}}function Be(e,t){return{rows:V(e.rows,t.rows,K),cells:V(e.cells,t.cells,q),ownedUtf8Bytes:V(e.ownedUtf8Bytes,t.ownedUtf8Bytes,J)}}function X(e,t,n,r,i,a,o){let s=n===`worksheet-json`?`serialization`:`parsing`;return new b(`OOXML resource limit exceeded${t?` for ${t}`:``}: ${r} ${a} > ${i}`,{stage:s,violation:{format:`xlsx`,operation:e,resource:n,metric:r,...t===void 0?{}:{part:t},limit:i,observed:Math.min(a,i+1),configurable:!1,usage:o??Le}})}function Z(e,t,n,r){let i=[[`rows`,e.rows,K],[`cells`,e.cells,q],[`owned-utf8-bytes`,e.ownedUtf8Bytes,J]];for(let[e,a,o]of i)if(a>o)throw X(t,n,e===`owned-utf8-bytes`?`worksheet-cell-content`:`worksheet-model`,e,o,a,r)}function Ve(e,t,n,r){if(e>Y)throw X(t,n,`worksheet-json`,`bytes`,Y,e,r)}var He=class{coordinator=new Me;sessions=new Map;operationTail=Promise.resolve();pendingOpens=new Map;resourceFailure;constructor(e,t,n=e=>e(this.requireArchive()),r){this.archive=e,this.acceptWorksheet=t,this.executeArchive=n,this.prepareRows=r}reserveOpen(e){this.pendingOpens.set(e.sessionId,{identity:e,canceled:!1})}abandonOpen(e){this.pendingOpens.delete(e)}get pendingOpenCount(){return this.pendingOpens.size}async open(e,t,n){if(this.resourceFailure)throw this.resourceFailure;let r=this.pendingOpens.get(n.sessionId);if(!r||r.identity.operationId!==n.operationId||r.identity.generation!==n.generation)throw Error(`worksheet pull session open reservation is stale or missing`);let i,a=new Promise(e=>{i=e}),o=this.operationTail.then(()=>this.coordinator.enqueue(async()=>{if(r.canceled)throw Error(`worksheet pull session open was canceled`);this.executeArchive(n=>n.open_sheet_cursor(e,t));let a=[],o={rows:0,cells:0,ownedUtf8Bytes:0},s,c=!1,l=new Ne({...n,maxByteCredit:67108864,coordinator:this.coordinator,driver:{pull:()=>{let e=this.executeArchive(e=>e.pull_sheet_cursor(128)),t=this.executeArchive(e=>e.sheet_cursor_pull_finished());if(this.acceptWorksheet){let n=Ie(e,t,void 0,this.prepareRows);try{if(n.kind===`rows`){let e=Be(o,Re(n.rows));Z(e,`get-worksheet-worker`,void 0,this.readResourceUsage()),a.push(...n.rows),o=e}else s=n.worksheet}catch(e){throw e instanceof b&&(this.resourceFailure??=e),e}}c=t;let n=ke(e);return{payload:n,byteLength:n.byteLength,done:t,transfer:[n]}},measureChunk:({payload:e})=>e.byteLength,acknowledge:()=>{if(!c)return;let t,r;try{if(this.acceptWorksheet){if(!s)throw Error(`worksheet terminal payload is missing`);s.rows=s.parseError?[]:a;let n=s.parseError?{rows:0,cells:0,ownedUtf8Bytes:0}:o,i=ze(s,n),c=this.readResourceUsage();Z(i,`get-worksheet-worker`,void 0,c),Ve(i.jsonBytes,`get-worksheet-worker`,void 0,c);let l=this.acceptWorksheet(e,s,i,c);typeof l==`function`?t=l:l&&({rollback:t,commit:r}=l)}this.executeArchive(e=>e.acknowledge_sheet_cursor_terminal()),r?.()}catch(e){throw t?.(),e instanceof b&&(this.resourceFailure??=e),e}c=!1,this.sessions.delete(n.sessionId),i()},cancel:()=>{try{this.archive()&&this.executeArchive(e=>e.cancel_sheet_cursor())}finally{this.sessions.delete(n.sessionId),i()}},close:()=>{try{this.archive()&&this.executeArchive(e=>e.close_sheet_cursor())}finally{this.sessions.delete(n.sessionId),i()}},resourceUsage:()=>this.readResourceUsage()}});this.sessions.set(n.sessionId,{host:l,identity:n}),this.pendingOpens.delete(n.sessionId)}));this.operationTail=o.then(()=>a,()=>void 0);try{await o}catch(e){throw this.pendingOpens.delete(n.sessionId),i(),e}}async postOpenedSafely(e,t,n){try{t()}catch(t){await this.closeIdentity(e);try{n(t)}catch{}}}dispatch(e,t){let n=this.sessions.get(e.sessionId);if(n)return n.host.dispatch(e,t);let r=this.pendingOpens.get(e.sessionId);if(r&&(e.kind===`cancel`||e.kind===`close`)){let n=r.identity.operationId===e.operationId&&r.identity.generation===e.generation;return n&&(r.canceled=!0),t(n?{protocol:R,kind:`accepted`,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,command:e.kind}:{protocol:R,kind:`error`,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,error:{message:`stale lifecycle targets another pending worksheet operation`,errorName:`PullSessionProtocolError`,code:`ooxml-stale-lifecycle`}}),Promise.resolve()}return e.kind===`cancel`||e.kind===`close`?(t({protocol:R,kind:`accepted`,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,command:e.kind}),Promise.resolve()):(t({protocol:R,kind:`error`,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,error:L(Error(`worksheet pull session is not open`))}),Promise.resolve())}async dispatchSafely(e,t){try{await this.dispatch(e,t)}catch(n){try{t({protocol:R,kind:`error`,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,error:L(n)})}catch{}}}run(e){let t=this.operationTail.then(()=>this.coordinator.enqueue(async()=>{if(this.resourceFailure)throw this.resourceFailure;return e()})).catch(e=>{throw e instanceof b&&(this.resourceFailure??=e),e});return this.operationTail=t.then(()=>void 0,()=>void 0),t}async reset(){for(let e of this.pendingOpens.values())e.canceled=!0;let e=1;for(let{host:t,identity:n}of[...this.sessions.values()])await t.dispatch({protocol:R,kind:`close`,...n,requestId:e++},()=>void 0);this.sessions.clear(),await this.operationTail,this.pendingOpens.clear(),this.resourceFailure=void 0}requireArchive(){let e=this.archive();if(!e)throw Error(`Workbook not loaded`);return e}async closeIdentity(e){let t=this.sessions.get(e.sessionId);if(t){await t.host.dispatch({protocol:R,kind:`close`,...e,requestId:1},()=>void 0);return}let n=this.pendingOpens.get(e.sessionId);n&&n.identity.operationId===e.operationId&&n.identity.generation===e.generation&&(n.canceled=!0)}readResourceUsage(){try{return j(this.executeArchive(e=>e.sheet_cursor_resource_usage()))}catch(e){if(String(e).includes(`worksheet cursor usage is unavailable`))return;throw e}}};function Ue(e){return!!e&&typeof e==`object`&&e.protocol===`ooxml-pull-v1`}const Q=new he(v,{freeArchive:e=>e.free(),reinit:ie}),$=new He(()=>Q.archive,void 0,e=>{let t=Q.archive;if(!t)throw Error(`Workbook not loaded`);return Q.run(()=>e(t))});self.onmessage=async e=>{let n=e.data;if(Ue(n)){await $.dispatchSafely(n,(e,t)=>self.postMessage(e,t));return}if(n.type===`init`){Q.setWasmInput(ue(n.wasmUrl)??n.wasmUrl);return}let r=n.id;n.type===`openSheetSession`&&$.reserveOpen(n);try{if(n.type===`openSheetSession`){await Q.ensureReady(),Q.archive&&Q.run(()=>Q.archive?.assert_healthy()),await $.open(n.sheetIndex,n.sheetName,n),await $.postOpenedSafely(n,()=>self.postMessage({type:`sheetSessionOpened`,id:r,sessionId:n.sessionId,operationId:n.operationId,generation:n.generation}),e=>self.postMessage({type:`error`,id:r,...L(e)}));return}n.type===`parse`&&await $.reset(),await $.run(async()=>{if(await Q.ensureReady(),n.type!==`parse`&&Q.archive){let e=Q.archive;Q.run(()=>e.assert_healthy())}if(n.type===`parse`){let[e,i,a]=Ae(n.resourcePolicy),o=new Uint8Array(n.data),{workbook:s,usage:c}=Pe(()=>Q.run(()=>{let n=new t(o,e,i,a);return Q.setArchive(n),n.parse()}),()=>Q.run(()=>Q.archive.resource_usage())),l=s.buffer,u={type:`parsed`,id:r,workbookJson:l,usage:c};self.postMessage(u,[l]);return}let e=Q.archive;if(n.type===`extractImage`){if(!e)throw Error(`No xlsx loaded`);let t=Q.run(()=>e.extract_image(n.path).buffer),i={type:`imageExtracted`,id:r,bytes:t};self.postMessage(i,[t]);return}if(n.type===`resourceUsage`){if(!e)throw Error(`No xlsx loaded`);let t=Q.run(()=>j(e.resource_usage()));self.postMessage({type:`resourceUsage`,id:r,usage:t});return}if(n.type===`toMarkdown`){if(!e)throw Error(`No xlsx loaded`);let t={type:`markdownRendered`,id:r,markdown:Q.run(()=>e.to_markdown())};self.postMessage(t);return}})}catch(e){n.type===`openSheetSession`&&$.abandonOpen(n.sessionId);let t={type:`error`,id:r,...L(e)};try{self.postMessage(t)}catch{}}};", Yt = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Jt], { type: "text/javascript;charset=utf-8" });
function Xt(e) {
	let t;
	try {
		if (t = Yt && (self.URL || self.webkitURL).createObjectURL(Yt), !t) throw "";
		let n = new Worker(t, {
			type: "module",
			name: e?.name
		});
		return n.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(t);
		}), n;
	} catch {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(Jt), {
			type: "module",
			name: e?.name
		});
	}
}
//#endregion
//#region packages/xlsx/src/wasm/xlsx_parser_bg.wasm?url
var Zt = new URL("xlsx_parser_bg.wasm", import.meta.url).href;
//#endregion
//#region packages/xlsx/src/sheet-visibility.ts
function Qt(e, t) {
	return !Number.isInteger(t) || t < 0 || t >= e.length ? "visible" : e[t].visibility ?? "visible";
}
//#endregion
//#region packages/xlsx/src/phonetic.ts
function $t(e) {
	return Array.from(e);
}
function en(e, t, n, r, i) {
	let a = $t(t), o = a.length, s = [];
	for (let t of e) {
		let e = t.sb, c = t.eb;
		if (!(e < c) || e >= o) continue;
		let l = Math.min(c, o), u = n + i(a.slice(0, e).join("")), d = i(a.slice(e, l).join("")), f = r === "center" ? "center" : r === "distributed" ? "distribute" : "start";
		s.push({
			text: t.text,
			x: u,
			width: d,
			spread: f
		});
	}
	return s;
}
//#endregion
//#region packages/xlsx/src/internal/platform.ts
function tn() {
	let e = typeof navigator < "u" ? navigator : void 0;
	return !!(e && /Mac/.test(e.platform || e.userAgent || "") && !(e.platform === "MacIntel" && e.maxTouchPoints > 1));
}
//#endregion
//#region packages/xlsx/src/formula.ts
function nn(e) {
	return Array.isArray(e) ? e : [e];
}
function rn(e) {
	return Array.isArray(e) ? e[0] ?? 0 : e;
}
var an = 8;
function on(e, t) {
	try {
		return sn(mn(e, t));
	} catch {
		return !1;
	}
}
function sn(e) {
	let t = rn(e);
	return typeof t == "boolean" ? t : typeof t == "number" ? t !== 0 : typeof t == "string" ? t.length > 0 && t.toUpperCase() !== "FALSE" : !1;
}
function X(e) {
	let t = rn(e);
	if (typeof t == "number") return t;
	if (typeof t == "boolean") return +!!t;
	if (t == null) return 0;
	let n = parseFloat(String(t));
	return isNaN(n) ? 0 : n;
}
function cn(e) {
	let t = rn(e);
	return t == null ? "" : typeof t == "boolean" ? t ? "TRUE" : "FALSE" : String(t);
}
var ln = new Set([
	"<",
	">",
	"=",
	"+",
	"-",
	"*",
	"/",
	"&",
	"^",
	"%"
]);
function un(e) {
	let t = [], n = 0, r = e;
	for (; n < r.length;) {
		let e = r[n];
		if (e === " " || e === "	" || e === "\n" || e === "\r") {
			n++;
			continue;
		}
		if (e === "(") {
			t.push({
				kind: "lparen",
				text: e
			}), n++;
			continue;
		}
		if (e === ")") {
			t.push({
				kind: "rparen",
				text: e
			}), n++;
			continue;
		}
		if (e === ",") {
			t.push({
				kind: "comma",
				text: e
			}), n++;
			continue;
		}
		if (e === ":") {
			t.push({
				kind: "colon",
				text: e
			}), n++;
			continue;
		}
		if (e === "\"") {
			let e = n + 1, i = "";
			for (; e < r.length;) {
				if (r[e] === "\"" && r[e + 1] === "\"") {
					i += "\"", e += 2;
					continue;
				}
				if (r[e] === "\"") break;
				i += r[e], e++;
			}
			t.push({
				kind: "str",
				text: i
			}), n = e + 1;
			continue;
		}
		if (e >= "0" && e <= "9") {
			let e = n;
			for (; e < r.length && (r[e] >= "0" && r[e] <= "9" || r[e] === ".");) e++;
			t.push({
				kind: "num",
				text: r.slice(n, e)
			}), n = e;
			continue;
		}
		if (ln.has(e)) {
			(e === "<" || e === ">") && (r[n + 1] === "=" || e === "<" && r[n + 1] === ">") ? (t.push({
				kind: "op",
				text: r.slice(n, n + 2)
			}), n += 2) : (t.push({
				kind: "op",
				text: e
			}), n++);
			continue;
		}
		if (e === "$" || dn(e)) {
			let e = n;
			for (; e < r.length && (r[e] === "$" || fn(r[e]));) e++;
			let i = r.slice(n, e);
			n = e;
			let a = pn(i);
			if (a) t.push({
				kind: "ref",
				text: i,
				ref: a
			});
			else {
				let e = i.toUpperCase();
				e === "TRUE" || e === "FALSE" ? t.push({
					kind: "bool",
					text: e
				}) : t.push({
					kind: "name",
					text: i
				});
			}
			continue;
		}
		n++;
	}
	return t;
}
function dn(e) {
	return e >= "A" && e <= "Z" || e >= "a" && e <= "z" || e === "_";
}
function fn(e) {
	return dn(e) || e >= "0" && e <= "9" || e === ".";
}
function pn(e) {
	let t = 0, n = !1, r = !1;
	e[t] === "$" && (n = !0, t++);
	let i = t;
	for (; t < e.length && e[t] >= "A" && e[t].toUpperCase() <= "Z" && !(!(e[t] >= "A" && e[t] <= "Z") && !(e[t] >= "a" && e[t] <= "z"));) t++;
	if (t === i) return null;
	let a = e.slice(i, t).toUpperCase();
	e[t] === "$" && (r = !0, t++);
	let o = t;
	for (; t < e.length && e[t] >= "0" && e[t] <= "9";) t++;
	if (t === o || t !== e.length) return null;
	let s = parseInt(e.slice(o, t), 10), c = 0;
	for (let e = 0; e < a.length; e++) c = c * 26 + (a.charCodeAt(e) - 64);
	return {
		colAbs: n,
		col: c,
		rowAbs: r,
		row: s
	};
}
function mn(e, t) {
	return _n({
		toks: un(e),
		pos: 0
	}, t);
}
function hn(e) {
	return e.toks[e.pos];
}
function gn(e) {
	return e.toks[e.pos++];
}
function _n(e, t) {
	return vn(e, t);
}
function vn(e, t) {
	let n = yn(e, t), r = hn(e);
	if (r && r.kind === "op" && (r.text === "<" || r.text === ">" || r.text === "<=" || r.text === ">=" || r.text === "=" || r.text === "<>")) {
		gn(e);
		let i = yn(e, t);
		return bn(r.text, n, i);
	}
	return n;
}
function yn(e, t) {
	let n = xn(e, t);
	for (;;) {
		let r = hn(e);
		if (!r || r.kind !== "op" || r.text !== "&") break;
		gn(e);
		let i = xn(e, t);
		n = cn(n) + cn(i);
	}
	return n;
}
function bn(e, t, n) {
	let r = typeof t == "string" && isNaN(parseFloat(t)) ? null : X(t), i = typeof n == "string" && isNaN(parseFloat(n)) ? null : X(n);
	if (r !== null && i !== null) switch (e) {
		case "<": return r < i;
		case ">": return r > i;
		case "<=": return r <= i;
		case ">=": return r >= i;
		case "=": return r === i;
		case "<>": return r !== i;
	}
	let a = String(t ?? ""), o = String(n ?? "");
	switch (e) {
		case "<": return a < o;
		case ">": return a > o;
		case "<=": return a <= o;
		case ">=": return a >= o;
		case "=": return a === o;
		case "<>": return a !== o;
	}
	return !1;
}
function xn(e, t) {
	let n = Sn(e, t);
	for (;;) {
		let r = hn(e);
		if (!r || r.kind !== "op" || r.text !== "+" && r.text !== "-") break;
		gn(e);
		let i = Sn(e, t);
		n = r.text === "+" ? X(n) + X(i) : X(n) - X(i);
	}
	return n;
}
function Sn(e, t) {
	let n = Cn(e, t);
	for (;;) {
		let r = hn(e);
		if (!r || r.kind !== "op" || r.text !== "*" && r.text !== "/") break;
		gn(e);
		let i = Cn(e, t);
		if (r.text === "*") n = X(n) * X(i);
		else {
			let e = X(i);
			n = e === 0 ? 0 : X(n) / e;
		}
	}
	return n;
}
function Cn(e, t) {
	let n = hn(e);
	return n && n.kind === "op" && n.text === "-" ? (gn(e), -X(Cn(e, t))) : n && n.kind === "op" && n.text === "+" ? (gn(e), X(Cn(e, t))) : wn(e, t);
}
function wn(e, t) {
	let n = gn(e);
	if (!n) return 0;
	if (n.kind === "num") return parseFloat(n.text);
	if (n.kind === "str") return n.text;
	if (n.kind === "bool") return n.text === "TRUE";
	if (n.kind === "lparen") {
		let n = _n(e, t), r = gn(e);
		if (!r || r.kind !== "rparen") throw Error("missing )");
		return n;
	}
	if (n.kind === "ref") {
		if (hn(e)?.kind === "colon") {
			gn(e);
			let r = gn(e);
			if (r?.kind !== "ref" || !r.ref) throw Error("range: expected ref after :");
			return Dn(n.ref, r.ref, t);
		}
		return En(n.ref, t);
	}
	if (n.kind === "name") {
		if (hn(e)?.kind === "lparen") {
			gn(e);
			let r = [];
			if (hn(e)?.kind !== "rparen") for (r.push(_n(e, t)); hn(e)?.kind === "comma";) gn(e), r.push(_n(e, t));
			let i = gn(e);
			if (!i || i.kind !== "rparen") throw Error("missing )");
			return kn(n.text, r, t);
		}
		let r = t.definedNames.get(n.text);
		return r && t.depth < an ? mn(Tn(r.formula), {
			...t,
			anchorRow: 1,
			anchorCol: 1,
			depth: t.depth + 1
		}) : 0;
	}
	return 0;
}
function Tn(e) {
	let t = e.match(/^(?:'[^']*'|[A-Za-z_][A-Za-z0-9_.]*)!(.*)$/);
	return t ? t[1] : e;
}
function En(e, t) {
	let n = e.colAbs ? e.col : e.col + (t.col - t.anchorCol), r = e.rowAbs ? e.row : e.row + (t.row - t.anchorRow);
	return On(t.cellIndex.get(`${r}:${n}`));
}
function Dn(e, t, n) {
	let r = e.colAbs ? e.col : e.col + (n.col - n.anchorCol), i = e.rowAbs ? e.row : e.row + (n.row - n.anchorRow), a = t.colAbs ? t.col : t.col + (n.col - n.anchorCol), o = t.rowAbs ? t.row : t.row + (n.row - n.anchorRow), s = Math.min(r, a), c = Math.max(r, a), l = Math.min(i, o), u = Math.max(i, o), d = [], f = 4096;
	for (let e = l; e <= u && d.length < f; e++) for (let t = s; t <= c && d.length < f; t++) d.push(On(n.cellIndex.get(`${e}:${t}`)));
	return d;
}
function On(e) {
	if (!e) return null;
	switch (e.value.type) {
		case "number": return e.value.number;
		case "bool": return e.value.bool;
		case "text": return e.value.text;
		case "error": return null;
		default: return null;
	}
}
function kn(e, t, n) {
	switch (e.toUpperCase()) {
		case "AND": return t.flatMap(nn).every((e) => sn(e));
		case "OR": return t.flatMap(nn).some((e) => sn(e));
		case "NOT": return !sn(t[0]);
		case "IF": return sn(t[0]) ? t[1] ?? !0 : t[2] ?? !1;
		case "IFERROR": return t[0] == null ? t[1] ?? 0 : t[0];
		case "IFS":
			for (let e = 0; e + 1 < t.length; e += 2) if (sn(t[e])) return t[e + 1];
			return null;
		case "TRUE": return !0;
		case "FALSE": return !1;
		case "ISBLANK": {
			let e = rn(t[0]);
			return e == null || e === "";
		}
		case "ISNUMBER": return typeof rn(t[0]) == "number";
		case "ISTEXT": return typeof rn(t[0]) == "string";
		case "ISNONTEXT": return typeof rn(t[0]) != "string";
		case "ISERROR":
		case "ISERR":
		case "ISNA": return rn(t[0]) == null;
		case "ISLOGICAL": return typeof rn(t[0]) == "boolean";
		case "ROUNDDOWN": {
			let e = X(t[0]), n = 10 ** X(t[1]);
			return (e >= 0 ? Math.floor(e * n) : Math.ceil(e * n)) / n;
		}
		case "ROUNDUP": {
			let e = X(t[0]), n = 10 ** X(t[1]);
			return (e >= 0 ? Math.ceil(e * n) : Math.floor(e * n)) / n;
		}
		case "ROUND": {
			let e = X(t[0]), n = 10 ** X(t[1]);
			return Math.round(e * n) / n;
		}
		case "INT": return Math.floor(X(t[0]));
		case "TRUNC": {
			let e = X(t[0]), n = 10 ** X(t[1] ?? 0);
			return (e >= 0 ? Math.floor(e * n) : Math.ceil(e * n)) / n;
		}
		case "CEILING": {
			let e = X(t[0]), n = X(t[1] ?? 1);
			return n === 0 ? 0 : Math.ceil(e / n) * n;
		}
		case "FLOOR": {
			let e = X(t[0]), n = X(t[1] ?? 1);
			return n === 0 ? 0 : Math.floor(e / n) * n;
		}
		case "MOD": {
			let e = X(t[0]), n = X(t[1]);
			return n === 0 ? null : e - Math.floor(e / n) * n;
		}
		case "POWER": return X(t[0]) ** +X(t[1]);
		case "SQRT": {
			let e = X(t[0]);
			return e < 0 ? null : Math.sqrt(e);
		}
		case "ABS": return Math.abs(X(t[0]));
		case "SIGN": {
			let e = X(t[0]);
			return e > 0 ? 1 : e < 0 ? -1 : 0;
		}
		case "EXP": return Math.exp(X(t[0]));
		case "LN": {
			let e = X(t[0]);
			return e <= 0 ? null : Math.log(e);
		}
		case "LOG10": {
			let e = X(t[0]);
			return e <= 0 ? null : Math.log10(e);
		}
		case "MIN": {
			let e = t.flatMap(nn).filter((e) => typeof e == "number");
			return e.length ? Math.min(...e) : 0;
		}
		case "MAX": {
			let e = t.flatMap(nn).filter((e) => typeof e == "number");
			return e.length ? Math.max(...e) : 0;
		}
		case "SUM": return t.flatMap(nn).reduce((e, t) => e + (typeof t == "number" ? t : 0), 0);
		case "AVERAGE": {
			let e = t.flatMap(nn).filter((e) => typeof e == "number");
			return e.length ? e.reduce((e, t) => e + t, 0) / e.length : null;
		}
		case "COUNT": return t.flatMap(nn).filter((e) => typeof e == "number").length;
		case "COUNTA": return t.flatMap(nn).filter((e) => e != null && e !== "").length;
		case "COUNTBLANK": return t.flatMap(nn).filter((e) => e == null || e === "").length;
		case "COUNTIF": return An(nn(t[0]), t[1]);
		case "SUMIF": return jn(nn(t[0]), t[1], t[2] === void 0 ? null : nn(t[2]));
		case "AVERAGEIF": {
			let e = nn(t[0]), n = jn(e, t[1], t[2] === void 0 ? null : nn(t[2])), r = An(e, t[1]);
			return r === 0 ? null : X(n) / r;
		}
		case "LEN": return cn(t[0]).length;
		case "LEFT": return cn(t[0]).slice(0, Math.max(0, X(t[1] ?? 1)));
		case "RIGHT": {
			let e = cn(t[0]), n = Math.max(0, X(t[1] ?? 1));
			return n >= e.length ? e : e.slice(e.length - n);
		}
		case "MID": {
			let e = cn(t[0]), n = Math.max(1, X(t[1])) - 1, r = Math.max(0, X(t[2]));
			return e.slice(n, n + r);
		}
		case "UPPER": return cn(t[0]).toUpperCase();
		case "LOWER": return cn(t[0]).toLowerCase();
		case "TRIM": return cn(t[0]).replace(/\s+/g, " ").trim();
		case "EXACT": return cn(t[0]) === cn(t[1]);
		case "FIND": {
			let e = cn(t[0]), n = cn(t[1]), r = Math.max(1, X(t[2] ?? 1)) - 1, i = n.indexOf(e, r);
			return i < 0 ? null : i + 1;
		}
		case "SEARCH": {
			let e = cn(t[0]).toLowerCase(), n = cn(t[1]).toLowerCase(), r = Math.max(1, X(t[2] ?? 1)) - 1, i = n.indexOf(e, r);
			return i < 0 ? null : i + 1;
		}
		case "CONCATENATE":
		case "CONCAT": return t.flatMap(nn).map((e) => e == null ? "" : typeof e == "boolean" ? e ? "TRUE" : "FALSE" : String(e)).join("");
		case "T": {
			let e = rn(t[0]);
			return typeof e == "string" ? e : "";
		}
		case "N": {
			let e = rn(t[0]);
			return typeof e == "number" ? e : typeof e == "boolean" ? +!!e : 0;
		}
		case "VALUE": return X(t[0]);
		case "ROW": return n.row;
		case "COLUMN": return n.col;
		case "TODAY": return Nn();
		case "NOW": return Pn();
		case "DATE": return Fn(X(t[0]), X(t[1]), X(t[2]));
		case "YEAR": return Ln(X(t[0])).y;
		case "MONTH": return Ln(X(t[0])).m;
		case "DAY": return Ln(X(t[0])).d;
		case "WEEKDAY": {
			let e = In(X(t[0])).getUTCDay(), n = X(t[1] ?? 1);
			return n === 2 ? e === 0 ? 7 : e : n === 3 ? e === 0 ? 6 : e - 1 : e + 1;
		}
		default: return 0;
	}
}
function An(e, t) {
	let n = Mn(t), r = 0;
	for (let t of e) n(t) && r++;
	return r;
}
function jn(e, t, n) {
	let r = Mn(t), i = n ?? e, a = 0;
	for (let t = 0; t < e.length; t++) if (r(e[t])) {
		let e = i[t];
		typeof e == "number" && (a += e);
	}
	return a;
}
function Mn(e) {
	let t = rn(e);
	if (typeof t != "string") {
		let e = typeof t == "number" ? t : null;
		return (n) => e !== null && typeof n == "number" ? n === e : n === t;
	}
	let n = t.match(/^(<=|>=|<>|<|>|=)(.*)$/), r = n ? n[1] : "=", i = n ? n[2] : t, a = i.trim() === "" ? NaN : parseFloat(i), o = !isNaN(a) && /^-?\d+(\.\d+)?$/.test(i.trim());
	return (e) => {
		if (o && typeof e == "number") switch (r) {
			case "<": return e < a;
			case ">": return e > a;
			case "<=": return e <= a;
			case ">=": return e >= a;
			case "<>": return e !== a;
			default: return e === a;
		}
		let t = e == null ? "" : typeof e == "boolean" ? e ? "TRUE" : "FALSE" : String(e);
		switch (r) {
			case "<>": return t !== i;
			case "<": return t < i;
			case ">": return t > i;
			case "<=": return t <= i;
			case ">=": return t >= i;
			default: return t === i;
		}
	};
}
function Nn() {
	let e = /* @__PURE__ */ new Date();
	return Je(new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())), !1);
}
function Pn() {
	return Je(new Date(Date.now()), !1);
}
function Fn(e, t, n) {
	return Math.floor(Je(new Date(Date.UTC(e, t - 1, n)), !1));
}
function In(e) {
	return at(Math.floor(e), !1);
}
function Ln(e) {
	let t = In(e);
	return {
		y: t.getUTCFullYear(),
		m: t.getUTCMonth() + 1,
		d: t.getUTCDate()
	};
}
//#endregion
//#region packages/xlsx/src/number-format.ts
function Rn(e) {
	switch (e.type) {
		case "empty": return "";
		case "text": return e.text;
		case "number": return String(e.number);
		case "bool": return e.bool ? "TRUE" : "FALSE";
		case "error": return e.error;
		case "shared": return "";
	}
}
function zn(e, t, n, r = !1) {
	return Bn(e, t, n, r).text;
}
function Bn(e, t, n, r = !1) {
	let i = t.cellXfs[e.styleIndex ?? 0]?.numFmtId ?? 0, a = t.numFmts?.find((e) => e.numFmtId === i)?.formatCode ?? null, o = n?.numFmtId ?? i, s = n?.formatCode ?? a;
	if (e.value.type !== "number") {
		let t = Rn(e.value);
		return { text: s ? Vn(t, s) : t };
	}
	let c = Hn(e.formula);
	return ir(c ?? e.value.number, o, s, c === null ? r : !1);
}
function Vn(e, t) {
	let n = sr(t), r;
	if (n.length >= 4) r = n[3];
	else {
		let t = n[n.length - 1];
		if (!t.includes("@")) return e;
		r = t;
	}
	if (r === "") return "";
	let i = "", a = 0;
	for (; a < r.length;) {
		let t = r[a];
		if (t === "\"") {
			for (a++; a < r.length && r[a] !== "\"";) i += r[a++];
			a < r.length && a++;
		} else if (t === "\\") a + 1 < r.length && (i += r[a + 1]), a += 2;
		else if (t === "[") {
			for (; a < r.length && r[a] !== "]";) a++;
			a < r.length && a++;
		} else t === "@" ? (i += e, a++) : t === "_" || t === "*" ? a += 2 : (i += t, a++);
	}
	return i;
}
function Hn(e) {
	if (!e) return null;
	let t = e.trim().replace(/^=/, "").toUpperCase().replace(/\s+/g, "");
	return t === "TODAY()" ? Nn() : t === "NOW()" ? Pn() : null;
}
var Un = {
	15: "d-mmm-yy",
	16: "d-mmm",
	17: "mmm-yy",
	18: "h:mm AM/PM",
	19: "h:mm:ss AM/PM",
	20: "h:mm",
	21: "h:mm:ss",
	22: "m/d/yyyy h:mm",
	27: "[$-411]ge.m.d",
	28: "[$-411]ggge\"年\"m\"月\"d\"日\"",
	29: "[$-411]ggge\"年\"m\"月\"d\"日\"",
	30: "m/d/yy",
	31: "yyyy\"年\"m\"月\"d\"日\"",
	50: "[$-411]ge.m.d",
	51: "[$-411]ggge\"年\"m\"月\"d\"日\"",
	52: "yyyy\"年\"m\"月\"",
	53: "m\"月\"d\"日\"",
	54: "[$-411]ggge\"年\"m\"月\"d\"日\"",
	55: "yyyy\"年\"m\"月\"",
	56: "m\"月\"d\"日\"",
	57: "[$-411]ge.m.d",
	58: "[$-411]ggge\"年\"m\"月\"d\"日\""
}, Wn = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
], Gn = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
], Kn = [
	"日",
	"月",
	"火",
	"水",
	"木",
	"金",
	"土"
], qn = [
	"日曜日",
	"月曜日",
	"火曜日",
	"水曜日",
	"木曜日",
	"金曜日",
	"土曜日"
], Jn = [
	{
		start: new Date(Date.UTC(2019, 4, 1)),
		abbr: "R",
		short: "令",
		long: "令和"
	},
	{
		start: new Date(Date.UTC(1989, 0, 8)),
		abbr: "H",
		short: "平",
		long: "平成"
	},
	{
		start: new Date(Date.UTC(1926, 11, 25)),
		abbr: "S",
		short: "昭",
		long: "昭和"
	},
	{
		start: new Date(Date.UTC(1912, 6, 30)),
		abbr: "T",
		short: "大",
		long: "大正"
	},
	{
		start: new Date(Date.UTC(1868, 0, 25)),
		abbr: "M",
		short: "明",
		long: "明治"
	}
];
function Yn(e) {
	for (let t of Jn) if (e.getTime() >= t.start.getTime()) return {
		abbr: t.abbr,
		short: t.short,
		long: t.long,
		year: e.getUTCFullYear() - t.start.getUTCFullYear() + 1
	};
	let t = Jn[Jn.length - 1];
	return {
		abbr: t.abbr,
		short: t.short,
		long: t.long,
		year: e.getUTCFullYear()
	};
}
function Xn(e, t, n = !1) {
	let r = at(e, n), i = r.getUTCFullYear(), a = r.getUTCMonth() + 1, o = r.getUTCDate(), s = r.getUTCDay(), c = r.getUTCHours(), l = r.getUTCMinutes(), u = r.getUTCSeconds(), d = t.split(";")[0], f = /am\/pm|a\/p/i.test(d), p = null, m = () => p ??= Yn(r), h = "", g = 0, _ = !1;
	for (; g < d.length;) {
		let t = d[g];
		if (t === "\"") {
			for (g++; g < d.length && d[g] !== "\"";) h += d[g++];
			g < d.length && g++, _ = !1;
		} else if (t === "[") {
			let t = d.indexOf("]", g), n = t > g ? d.slice(g + 1, t) : "", r = n.match(/^([hms])\1*$/i);
			if (r) {
				let i = r[1].toLowerCase(), a = e < 0 ? "-" : "", o = Math.floor(Math.abs(e) * 86400), s;
				s = i === "h" ? Math.floor(o / 3600) : i === "m" ? Math.floor(o / 60) : o;
				let c = n.length >= 2 ? String(s).padStart(n.length, "0") : String(s);
				h += a + c, g = t + 1, _ = i === "h";
			} else {
				for (; g < d.length && d[g] !== "]";) g++;
				g < d.length && g++;
			}
		} else if (t === "_") g += 2;
		else if (t === "*") g += 2;
		else if (t === "\\") g + 1 < d.length && (h += d[g + 1]), g += 2, _ = !1;
		else if (t === "y" || t === "Y") {
			let e = 0;
			for (; g < d.length && d[g].toLowerCase() === "y";) e++, g++;
			h += e <= 2 ? String(i).slice(-2) : String(i).padStart(4, "0"), _ = !1;
		} else if (t === "m" || t === "M") {
			let e = 0;
			for (; g < d.length && d[g].toLowerCase() === "m";) e++, g++;
			let t = d.slice(g).replace(/\[[^\]]*\]/g, "");
			_ || /^:s/i.test(t) ? h += e >= 2 ? String(l).padStart(2, "0") : String(l) : e === 1 ? h += String(a) : e === 2 ? h += String(a).padStart(2, "0") : e === 3 ? h += Wn[a - 1].slice(0, 3) : e === 4 ? h += Wn[a - 1] : h += Wn[a - 1][0], _ = !1;
		} else if (t === "d" || t === "D") {
			let e = 0;
			for (; g < d.length && d[g].toLowerCase() === "d";) e++, g++;
			e === 1 ? h += String(o) : e === 2 ? h += String(o).padStart(2, "0") : e === 3 ? h += Gn[s].slice(0, 3) : h += Gn[s], _ = !1;
		} else if (t === "h" || t === "H") {
			let e = 0;
			for (; g < d.length && d[g].toLowerCase() === "h";) e++, g++;
			let t = f ? c % 12 || 12 : c;
			h += e >= 2 ? String(t).padStart(2, "0") : String(t), _ = !0;
		} else if (t === "s" || t === "S") {
			let e = 0;
			for (; g < d.length && d[g].toLowerCase() === "s";) e++, g++;
			h += e >= 2 ? String(u).padStart(2, "0") : String(u), _ = !1;
		} else if (t === "g" || t === "G") {
			let e = 0;
			for (; g < d.length && d[g].toLowerCase() === "g";) e++, g++;
			let t = m();
			e === 1 ? h += t.abbr : e === 2 ? h += t.short : h += t.long, _ = !1;
		} else if (t === "e" || t === "E") {
			let e = 0;
			for (; g < d.length && d[g].toLowerCase() === "e";) e++, g++;
			let t = m().year;
			h += e >= 2 ? String(t).padStart(2, "0") : String(t), _ = !1;
		} else if (t === "r" || t === "R") {
			let e = 0;
			for (; g < d.length && d[g].toLowerCase() === "r";) e++, g++;
			let t = m().year;
			h += e >= 2 ? String(t).padStart(2, "0") : String(t), _ = !1;
		} else if (t === "A" || t === "a") {
			let e = d.slice(g).toUpperCase();
			e.startsWith("AAAA") ? (h += qn[s], g += 4) : e.startsWith("AAA") ? (h += Kn[s], g += 3) : e.startsWith("AM/PM") ? (h += c < 12 ? "AM" : "PM", g += 5) : e.startsWith("A/P") ? (h += c < 12 ? "A" : "P", g += 3) : (h += t, g++), _ = !1;
		} else h += t, g++, t !== ":" && t !== "/" && t !== "-" && t !== "." && t !== " " && (_ = !1);
	}
	return h;
}
function Zn(e) {
	if (/\[[hms]+\]/i.test(e)) return !0;
	let t = e.replace(/"[^"]*"/g, "").replace(/\[[^\]]*\]/g, "");
	return /[yd]/i.test(t) || /a{3,}/i.test(t);
}
var Qn = 11, $n = 6;
function er(e) {
	return e.includes(".") ? e.replace(/0+$/, "").replace(/\.$/, "") : e;
}
function tr(e) {
	return `${e >= 0 ? "+" : "-"}${Math.abs(e).toString().padStart(2, "0")}`;
}
function nr(e) {
	let [t, n] = e.toExponential($n - 1).split("e");
	return `${er(t)}E${tr(Number(n))}`;
}
function rr(e) {
	if (!Number.isFinite(e)) return String(e);
	if (e === 0) return "0";
	let t = e < 0, n = Math.abs(e), r = Number(n.toExponential(Qn - 1).split("e")[1]), i = r >= Qn || r < -5 ? nr(n) : er(n.toPrecision(Qn));
	return t ? `-${i}` : i;
}
function ir(e, t, n, r = !1) {
	if (t === 14 && !n) return { text: qe(e, r) };
	let i = Un[t];
	if (i) return { text: Xn(e, i, r) };
	if (n && n.trim().toLowerCase() === "general") return { text: rr(e) };
	if (n) return Zn(n) ? { text: Xn(e, n, r) } : _r(e, n);
	switch (t) {
		case 0: return { text: rr(e) };
		case 1: return _r(e, "0");
		case 2: return _r(e, "0.00");
		case 3: return _r(e, "#,##0");
		case 4: return _r(e, "#,##0.00");
		case 9: return _r(e, "0%");
		case 10: return _r(e, "0.00%");
		case 11: return _r(e, "0.00E+00");
		case 37: return _r(e, "#,##0 ;(#,##0)");
		case 38: return _r(e, "#,##0 ;[Red](#,##0)");
		case 39: return _r(e, "#,##0.00;(#,##0.00)");
		case 40: return _r(e, "#,##0.00;[Red](#,##0.00)");
		case 48: return _r(e, "##0.0E+0");
		case 49: return { text: String(e) };
		default: return { text: rr(e) };
	}
}
var ar = {
	black: "#000000",
	blue: "#0000FF",
	cyan: "#00FFFF",
	green: "#008000",
	magenta: "#FF00FF",
	red: "#FF0000",
	white: "#FFFFFF",
	yellow: "#FFFF00"
}, or = /* @__PURE__ */ "#000000.#FFFFFF.#FF0000.#00FF00.#0000FF.#FFFF00.#FF00FF.#00FFFF.#000000.#FFFFFF.#FF0000.#00FF00.#0000FF.#FFFF00.#FF00FF.#00FFFF.#800000.#008000.#000080.#808000.#800080.#008080.#C0C0C0.#808080.#9999FF.#993366.#FFFFCC.#CCFFFF.#660066.#FF8080.#0066CC.#CCCCFF.#000080.#FF00FF.#FFFF00.#00FFFF.#800080.#800000.#008080.#0000FF.#00CCFF.#CCFFFF.#CCFFCC.#FFFF99.#99CCFF.#FF99CC.#CC99FF.#FFCC99.#3366FF.#33CCCC.#99CC00.#FFCC00.#FF9900.#FF6600.#666699.#969696.#003366.#339966.#003300.#333300.#993300.#993366.#333399.#333333".split(".");
function sr(e) {
	let t = [], n = "", r = 0;
	for (; r < e.length;) {
		let i = e[r];
		if (i === "\"") {
			for (n += i, r++; r < e.length && e[r] !== "\"";) n += e[r++];
			r < e.length && (n += e[r++]);
		} else if (i === "\\") n += i, r + 1 < e.length && (n += e[r + 1]), r += 2;
		else if (i === "[") {
			for (n += i, r++; r < e.length && e[r] !== "]";) n += e[r++];
			r < e.length && (n += e[r++]);
		} else i === ";" ? (t.push(n), n = "", r++) : (n += i, r++);
	}
	return t.push(n), t;
}
function cr(e) {
	let t = "", n, r, i = 0;
	for (; i < e.length;) {
		let a = e[i];
		if (a === "\"") {
			for (t += a, i++; i < e.length && e[i] !== "\"";) t += e[i++];
			i < e.length && (t += e[i++]);
		} else if (a === "\\") t += a, i + 1 < e.length && (t += e[i + 1]), i += 2;
		else if (a === "[") {
			let o = e.indexOf("]", i);
			if (o < 0) {
				t += a, i++;
				continue;
			}
			let s = e.slice(i + 1, o), c = s.toLowerCase(), l = c.match(/^color(\d{1,2})$/), u = s.match(/^(<=|>=|<>|<|>|=)\s*(-?[0-9.]+(?:[eE][-+]?\d+)?)$/);
			if (c in ar) n = ar[c];
			else if (l) {
				let e = parseInt(l[1], 10);
				e >= 1 && e <= 56 && (n = or[e + 7] ?? n);
			} else u ? r = {
				op: u[1],
				value: Number(u[2])
			} : t += e.slice(i, o + 1);
			i = o + 1;
		} else t += a, i++;
	}
	return {
		body: t,
		color: n,
		condition: r
	};
}
function lr(e, t) {
	switch (e.op) {
		case "<": return t < e.value;
		case "<=": return t <= e.value;
		case ">": return t > e.value;
		case ">=": return t >= e.value;
		case "=": return t === e.value;
		case "<>": return t !== e.value;
	}
}
function ur(e) {
	let t = [], n = "", r = "", i = !1, a = !1, o, s = !1, c = 0, l = 0, u = (e) => {
		if (!e) return;
		!a && !s && (c = n.replace(/,/g, "").length);
		let r = t[t.length - 1];
		r && r.kind === "lit" ? r.text += e : t.push({
			kind: "lit",
			text: e
		});
	}, d = 0;
	for (; d < e.length;) {
		let c = e[d];
		if (c === "\"") {
			d++;
			let t = "";
			for (; d < e.length && e[d] !== "\"";) t += e[d++];
			d < e.length && d++, u(t);
		} else if (c === "\\") d + 1 < e.length && u(e[d + 1]), d += 2;
		else if (c === "[") {
			let t = e.indexOf("]", d), n = t > d ? e.slice(d + 1, t) : "";
			if (n.startsWith("$")) {
				let e = n.slice(1), t = e.indexOf("-");
				u(t >= 0 ? e.slice(0, t) : e);
			}
			d = t < 0 ? e.length : t + 1;
		} else if (c === "_") u(" "), d += 2;
		else if (c === "*") u(e[d + 1] ?? ""), d += 2;
		else if (c === "#" || c === "0" || c === "?") a ? (r += c, t.push({
			kind: "fracph",
			ph: c
		})) : (n += c, t.push({
			kind: "intph",
			ph: c
		})), l = 0, d++;
		else if (c === ".") a = !0, t.push({ kind: "dot" }), d++;
		else if (c === ",") a || (n += ","), l++, d++;
		else if (c === "/" && n.replace(/,/g, "").length > 0) {
			s = !0, t.push({ kind: "fraction" }), d++;
			let n = "";
			for (; d < e.length && /[0-9#?]/.test(e[d]);) n += e[d++];
			t[t.length - 1].den = n;
		} else if (c === "%") i = !0, t.push({ kind: "percent" }), d++;
		else if ((c === "E" || c === "e") && (e[d + 1] === "+" || e[d + 1] === "-")) {
			let n = e[d + 1] === "+";
			d += 2;
			let r = 0;
			for (; d < e.length && (e[d] === "0" || e[d] === "#" || e[d] === "?");) r++, d++;
			o = {
				plus: n,
				width: Math.max(r, 1)
			}, t.push({ kind: "exp" });
		} else u(c), d++;
	}
	let f = l, p = /,(?=[#0?])/.test(n), m = n.replace(/,/g, ""), h;
	if (s) {
		let e = t.find((e) => e.kind === "fraction")?.den ?? "?", n = e.match(/[0-9]+/);
		h = {
			wholeSpec: m.slice(0, c),
			numSpec: m.slice(c) || "?",
			denSpec: e.replace(/[^0#?]/g, ""),
			fixedDen: n ? parseInt(n[0], 10) : null
		};
	}
	return {
		parts: t,
		intSpec: m,
		fracSpec: r,
		hasPercent: i,
		commaScale: f,
		grouping: p,
		exp: o,
		fraction: h
	};
}
function dr(e) {
	return e.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function fr(e, t, n) {
	let r = t.split(""), i = e.split(""), a = [], o = i.length - 1, s = [];
	for (let e = r.length - 1; e >= 0; e--) o >= 0 ? (a.unshift(i[o]), s.unshift(i[o]), o--) : r[e] === "0" ? (a.unshift("0"), s.unshift("0")) : r[e] === "?" && a.unshift(" ");
	for (; o >= 0;) a.unshift(i[o]), s.unshift(i[o]), o--;
	if (n) {
		let e = dr(s.join(""));
		return (a.length - s.length > 0 ? a.slice(0, a.length - s.length).join("") : "") + e;
	}
	return a.join("");
}
function pr(e, t) {
	let n = t.length;
	if (n === 0) return "";
	let r = e.padEnd(n, "0").slice(0, n).split("");
	for (let e = n - 1; e >= 0; e--) {
		let n = t[e] ?? "#";
		if (r[e] === "0" && n === "#") r[e] = "";
		else if (r[e] === "0" && n === "?") r[e] = " ";
		else break;
	}
	return r.join("");
}
function mr(e, t, n) {
	if (n !== null) return [Math.round(e * n), n];
	let r = 10 ** Math.max(t, 1) - 1, i = 0, a = 1, o = Math.abs(e), s = [0, 1], c = [1, 1];
	for (let t = 0; t < 100; t++) {
		let t = s[0] + c[0], n = s[1] + c[1];
		if (n > r) break;
		let l = t / n, u = Math.abs(l - e);
		if (u < o && (o = u, i = t, a = n), l < e) s = [t, n];
		else if (l > e) c = [t, n];
		else break;
	}
	return [i, a];
}
function hr(e, t, n) {
	let r = ur(t), i = n ? Math.abs(e) : e;
	r.hasPercent && (i *= 100), r.commaScale > 0 && (i /= 1e3 ** r.commaScale);
	let a = i < 0 ? "-" : "", o = Math.abs(i);
	if (r.fraction) {
		let e = Math.floor(o), t = o - e, { wholeSpec: n, numSpec: i, denSpec: s, fixedDen: c } = r.fraction, l = n.length > 0, [u, d] = mr(t, s.length, c), f = (e, t) => {
			let n = String(e), r = t.includes("0") ? "0" : " ";
			for (; n.length < t.length;) n = r + n;
			return n;
		}, p = (e, t) => {
			let n = String(e), r = t.includes("0") ? "0" : " ";
			for (; n.length < t.length;) n += r;
			return n;
		}, m = a;
		if (l) {
			let t = e > 0 ? String(e) : n.includes("0") ? "0" : "";
			if (u === 0) {
				let e = c === null ? s.length || 1 : String(c).length;
				m += t + " ".repeat(1 + i.length + 1 + e);
			} else {
				let e = c === null ? p(d, s) : String(c);
				m += t + " " + f(u, i) + "/" + e;
			}
		} else {
			let t = u + e * d, n = c === null ? p(d, s) : String(c);
			m += f(t, i) + "/" + n;
		}
		return m;
	}
	if (r.exp) {
		let e = Math.max(r.intSpec.length, 1), t = r.fracSpec.length, n = 0, i = 0;
		o !== 0 && (i = Math.floor(Math.log10(o)), i = Math.floor(i / e) * e, n = o / 10 ** i, parseFloat(Ye(n, t)) >= 10 ** e && (i += e, n = o / 10 ** i));
		let [s, c = ""] = Ye(n, t).split(".");
		return a + gr(r, fr(s, r.intSpec, !1), pr(c, r.fracSpec), "E" + (i < 0 ? "-" : r.exp.plus ? "+" : "") + String(Math.abs(i)).padStart(r.exp.width, "0"));
	}
	let s = r.fracSpec.length, [c, l = ""] = Ye(o, s).split("."), u = c.replace(/^0+/, ""), d = /[0]/.test(r.intSpec) || r.intSpec === "" && !1;
	return u === "" && d && (u = "0"), a + gr(r, fr(u, r.intSpec, r.grouping), pr(l, r.fracSpec), "");
}
function gr(e, t, n, r) {
	let i = t.split(""), a = [];
	e.parts.forEach((e, t) => {
		e.kind === "intph" && a.push(t);
	});
	let o = n.split(""), s = [];
	e.parts.forEach((e, t) => {
		e.kind === "fracph" && s.push(t);
	});
	let c = /* @__PURE__ */ new Map(), l = i.length - 1;
	for (let e = a.length - 1; e >= 0; e--) if (e === 0) {
		let t = "";
		for (; l >= 0;) t = i[l--] + t;
		c.set(a[e], t);
	} else l >= 0 ? c.set(a[e], i[l--]) : c.set(a[e], "");
	let u = /* @__PURE__ */ new Map();
	for (let e = 0; e < s.length; e++) u.set(s[e], o[e] ?? "");
	let d = e.fracSpec.length > 0 && (n.length > 0 || /[0?]/.test(e.fracSpec)), f = "";
	for (let t = 0; t < e.parts.length; t++) {
		let n = e.parts[t];
		n.kind === "lit" ? f += n.text : n.kind === "intph" ? f += c.get(t) ?? "" : n.kind === "fracph" ? f += u.get(t) ?? "" : n.kind === "dot" ? f += d ? "." : "" : n.kind === "percent" ? f += "%" : n.kind === "exp" && (f += r);
	}
	return f;
}
function _r(e, t) {
	let n = sr(t).map(cr), r = n.some((e) => e.condition), i, a = !1;
	if (r) {
		let t = !1;
		for (let r of n) if (r.condition) {
			if (lr(r.condition, e)) {
				i = r, t = !0;
				break;
			}
		} else if (i ??= r, i === r) break;
		if (!i) return { text: "#" };
		a = t && e < 0;
	} else e > 0 ? i = n[0] : e < 0 ? n.length > 1 ? (i = n[1], a = !0) : i = n[0] : i = n.length > 2 ? n[2] : n[0];
	let o = hr(e, i.body, a);
	return i.color ? {
		text: o,
		color: i.color
	} : { text: o };
}
//#endregion
//#region packages/xlsx/src/renderer-coordinate-index.ts
var vr = oe;
function yr(e, t) {
	let n = vr;
	return new j(`XLSX renderer ${e.resource} exceeded its hard limit of ${n} entries`, {
		stage: "rendering",
		violation: {
			format: "xlsx",
			operation: e.operation,
			resource: e.resource,
			metric: "entry-count",
			limit: n,
			observed: t,
			configurable: !1,
			usage: {
				archiveEntryCount: 0,
				declaredInflatedBytes: 0,
				distinctInflatedBytes: 0,
				operationInflatedBytes: 0
			}
		}
	});
}
function br(e, t, n = 0) {
	let { top: r, bottom: i, left: a, right: o } = e;
	if (i < r || o < a) return 0;
	if (![
		r,
		i,
		a,
		o
	].every(Number.isSafeInteger) || !Number.isSafeInteger(n) || n < 0) throw yr(t, vr + 1);
	let s = i - r + 1, c = o - a + 1, l = vr + n;
	if (!Number.isSafeInteger(s) || !Number.isSafeInteger(c) || s > l || c > Math.floor(l / s)) throw yr(t, vr + 1);
	let u = s * c - n;
	if (u > vr) throw yr(t, u);
	return u;
}
function xr(e, t, n, r) {
	if (!e.has(t) && e.size >= vr) throw yr(r, e.size + 1);
	e.set(t, n);
}
function Sr(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e) for (let e of r.cells) xr(n, `${e.row}:${e.col}`, e, t);
	return n;
}
function Cr(e, t, n) {
	if (!e.has(t) && e.size >= vr) throw yr(n, e.size + 1);
	e.add(t);
}
//#endregion
//#region packages/xlsx/src/conditional-format.ts
function wr(e, t, n) {
	for (let r of e) if (t >= r.top && t <= r.bottom && n >= r.left && n <= r.right) return !0;
	return !1;
}
function Tr(e) {
	return e && e.value.type === "number" ? e.value.number : null;
}
function Er(e) {
	return e && e.value.type === "text" ? e.value.text : null;
}
function Dr(e, t) {
	let n = [];
	for (let r of e.rows) for (let e of r.cells) e.value.type === "number" && wr(t, e.row, e.col) && n.push(e.value.number);
	return n;
}
function Or(e, t) {
	let n = t.length ? Math.min(...t) : 0, r = t.length ? Math.max(...t) : 0, i = e.value == null ? NaN : parseFloat(e.value);
	switch (e.kind) {
		case "min": return n;
		case "max": return r;
		case "num": return isNaN(i) ? 0 : i;
		case "percent": {
			let e = isNaN(i) ? 50 : i;
			return n + (r - n) * (e / 100);
		}
		case "percentile": {
			if (!t.length) return 0;
			let e = [...t].sort((e, t) => e - t), n = (isNaN(i) ? 50 : i) / 100;
			return e[Math.max(0, Math.min(e.length - 1, Math.round(n * (e.length - 1))))];
		}
		default: return isNaN(i) ? 0 : i;
	}
}
function kr(e, t = Ar(e)) {
	let n = [], r = /* @__PURE__ */ new Map();
	for (let t of e.definedNames ?? []) r.set(t.name, t);
	for (let t of e.conditionalFormats ?? []) {
		let r = Dr(e, t.sqref);
		for (let e of t.rules) {
			let i = {
				rule: e,
				sqref: t.sqref
			};
			if (e.type === "colorScale") i.scaleStops = e.stops.map((e) => Or(e, r));
			else if (e.type === "dataBar") i.barMin = Or(e.min, r), i.barMax = Or(e.max, r);
			else if (e.type === "top10") {
				let t = [...r].sort((e, t) => e - t), n = t.length;
				if (n > 0) {
					let r = Math.min(e.rank, n);
					if (e.percent) {
						let a = e.top ? 1 - r / 100 : r / 100;
						i.top10Threshold = t[Math.max(0, Math.min(n - 1, Math.round(a * (n - 1))))];
					} else i.top10Threshold = e.top ? t[Math.max(0, n - r)] : t[Math.min(n - 1, r - 1)];
					i.top10IsTop = e.top;
				}
			} else if (e.type === "aboveAverage") {
				if (r.length > 0) {
					let t = r.reduce((e, t) => e + t, 0) / r.length;
					if (i.avgValue = t, i.avgIsAbove = e.aboveAverage, e.stdDev && e.stdDev > 0) {
						let e = r.reduce((e, n) => e + (n - t) * (n - t), 0) / r.length;
						i.avgStdDev = Math.sqrt(e);
					}
				}
			} else e.type === "iconSet" && (i.iconThresholds = e.cfvos.map((e) => Or(e, r)));
			n.push(i);
		}
	}
	return n.sort((e, t) => (e.rule.priority ?? 0) - (t.rule.priority ?? 0)), {
		compiled: n,
		worksheet: e,
		cellIndex: t,
		definedNames: r
	};
}
function Ar(e) {
	return Sr(e.rows, {
		resource: "worksheet-cell-index",
		operation: "index-worksheet-cells"
	});
}
function jr(e, t, n) {
	switch (t) {
		case "greaterThan": return e > (n[0] ?? 0);
		case "greaterThanOrEqual": return e >= (n[0] ?? 0);
		case "lessThan": return e < (n[0] ?? 0);
		case "lessThanOrEqual": return e <= (n[0] ?? 0);
		case "equal": return e === (n[0] ?? 0);
		case "notEqual": return e !== (n[0] ?? 0);
		case "between": return e >= (n[0] ?? 0) && e <= (n[1] ?? 0);
		case "notBetween": return e < (n[0] ?? 0) || e > (n[1] ?? 0);
		default: return !1;
	}
}
function Mr(e) {
	let t = e.trim();
	if (t.length >= 2 && t.startsWith("\"") && t.endsWith("\"")) return { text: t.slice(1, -1).replace(/""/g, "\"") };
	let n = parseFloat(t);
	return isNaN(n) ? { text: t } : { num: n };
}
function Nr(e, t, n) {
	let r = n[0] ?? "", i = n[1] ?? "", a = (e) => e.toLowerCase();
	switch (t) {
		case "equal": return a(e) === a(r);
		case "notEqual": return a(e) !== a(r);
		case "containsText": return a(e).includes(a(r));
		case "notContains": return !a(e).includes(a(r));
		case "beginsWith": return a(e).startsWith(a(r));
		case "endsWith": return a(e).endsWith(a(r));
		case "between": return a(e) >= a(r) && a(e) <= a(i);
		case "notBetween": return a(e) < a(r) || a(e) > a(i);
		default: return !1;
	}
}
function Pr(e, t, n) {
	let r = e.replace("#", ""), i = t.replace("#", ""), a = parseInt(r.slice(0, 2), 16), o = parseInt(r.slice(2, 4), 16), s = parseInt(r.slice(4, 6), 16), c = parseInt(i.slice(0, 2), 16), l = parseInt(i.slice(2, 4), 16), u = parseInt(i.slice(4, 6), 16), d = Math.round(a + (c - a) * n), f = Math.round(o + (l - o) * n), p = Math.round(s + (u - s) * n);
	return `#${d.toString(16).padStart(2, "0").toUpperCase()}${f.toString(16).padStart(2, "0").toUpperCase()}${p.toString(16).padStart(2, "0").toUpperCase()}`;
}
function Fr(e, t, n) {
	if (!t.length) return "#FFFFFF";
	if (e <= n[0]) return t[0].color;
	if (e >= n[n.length - 1]) return t[t.length - 1].color;
	for (let r = 1; r < n.length; r++) if (e <= n[r]) {
		let i = n[r - 1], a = n[r], o = a === i ? 0 : (e - i) / (a - i);
		return Pr(t[r - 1].color, t[r].color, o);
	}
	return t[t.length - 1].color;
}
function Ir(e, t) {
	if (t && (t.fill && !e.fill && (e.fill = t.fill), t.font?.color && e.fontColor == null && (e.fontColor = t.font.color), t.font?.bold && e.fontBold == null && (e.fontBold = !0), t.font?.italic && e.fontItalic == null && (e.fontItalic = !0), t.font?.underline && e.fontUnderline == null && (e.fontUnderline = !0), t.font?.strike && e.fontStrike == null && (e.fontStrike = !0), t.numFmt && e.numFmt == null && (e.numFmt = {
		numFmtId: t.numFmt.numFmtId,
		formatCode: t.numFmt.formatCode || null
	}), t.border)) {
		let n = e.border ?? {};
		e.border = {
			left: n.left ?? t.border.left,
			right: n.right ?? t.border.right,
			top: n.top ?? t.border.top,
			bottom: n.bottom ?? t.border.bottom,
			diagonalUp: n.diagonalUp ?? t.border.diagonalUp,
			diagonalDown: n.diagonalDown ?? t.border.diagonalDown
		};
	}
}
function Lr(e, t, n, r, i) {
	let a = {};
	if (!r.compiled.length) return a;
	for (let o of r.compiled) {
		if (!wr(o.sqref, t, n)) continue;
		let s = o.rule, c = Tr(e);
		if (s.type === "expression") {
			let e = o.sqref[0];
			if (!e) continue;
			if (on(s.formula, {
				row: t,
				col: n,
				anchorRow: e.top,
				anchorCol: e.left,
				cellIndex: r.cellIndex,
				definedNames: r.definedNames,
				depth: 0
			}) && (Ir(a, s.dxfId == null ? null : i[s.dxfId]), s.stopIfTrue)) break;
			continue;
		}
		if (s.type === "cellIs") {
			let t = s.formulas.map(Mr), n = Er(e), r = !1;
			c != null && t.every((e) => e.num != null) ? r = jr(c, s.operator, t.map((e) => e.num)) : n != null && t.every((e) => e.text != null) && (r = Nr(n, s.operator, t.map((e) => e.text))), r && Ir(a, s.dxfId == null ? null : i[s.dxfId]);
		} else if (s.type === "top10") {
			if (c == null || o.top10Threshold == null) continue;
			(o.top10IsTop ? c >= o.top10Threshold : c <= o.top10Threshold) && Ir(a, s.dxfId == null ? null : i[s.dxfId]);
		} else if (s.type === "aboveAverage") {
			if (c == null || o.avgValue == null) continue;
			let e = o.avgStdDev == null ? 0 : o.avgStdDev * (s.stdDev ?? 1), t = o.avgIsAbove ? o.avgValue + e : o.avgValue - e, n = s.equalAverage === !0;
			(o.avgIsAbove ? n ? c >= t : c > t : n ? c <= t : c < t) && Ir(a, s.dxfId == null ? null : i[s.dxfId]);
		} else if (s.type === "iconSet") {
			if (c == null || !o.iconThresholds?.length) continue;
			let e = o.iconThresholds, t = e.length, n = 0;
			for (let r = 1; r < t; r++) c >= e[r] && (n = r);
			if (s.reverse && (n = t - 1 - n), s.customIcons && s.customIcons[n]) {
				let e = s.customIcons[n];
				e.iconSet !== "NoIcons" && (a.iconSet = {
					name: e.iconSet,
					index: e.iconId
				});
			} else a.iconSet = {
				name: s.iconSet,
				index: n
			};
		} else if (s.type === "colorScale") {
			if (c == null || !o.scaleStops || a.fill) continue;
			let e = Fr(c, s.stops, o.scaleStops);
			a.fill = {
				patternType: "solid",
				fgColor: e,
				bgColor: e
			};
		} else if (s.type === "dataBar") {
			if (c == null || o.barMin == null || o.barMax == null || a.dataBar) continue;
			let e = o.barMax - o.barMin, t = e === 0 ? 0 : Math.max(0, Math.min(1, (c - o.barMin) / e));
			a.dataBar = {
				color: s.color,
				ratio: t,
				gradient: s.gradient
			};
		}
	}
	return a;
}
//#endregion
//#region packages/xlsx/src/bidi-line.ts
function Rr(e, t) {
	return e === 2 ? !0 : e === 1 ? !1 : Lt(void 0, t) === "rtl";
}
var zr = (e) => {
	let t = e.text;
	return typeof t == "string" ? t : void 0;
};
function Br(e, t) {
	let r = e === 2 || n(t);
	return {
		needBidi: r,
		baseRtl: r && Rr(e, t)
	};
}
function Vr(e, t) {
	let n = e.length;
	if (n === 0) return {
		order: [],
		rtl: []
	};
	let r = "", i = Array(n);
	for (let t = 0; t < n; t++) {
		i[t] = r.length;
		let n = zr(e[t]) ?? "";
		r += n.length > 0 ? n : "￼";
	}
	let { levels: a, paragraphLevel: o } = L().computeLevels(r, t ? "rtl" : "ltr"), { order: s, segLevels: c } = ne(a, o, i), l = Array(n);
	for (let e = 0; e < n; e++) l[e] = (c[e] & 1) == 1;
	return {
		order: s,
		rtl: l
	};
}
function Hr(e, t = 8) {
	return Math.trunc((256 * e + Math.trunc(128 / t)) / 256 * t);
}
function Ur(e, t, n) {
	if (n) {
		let n = Math.round(t / st);
		return Math.round((e * n + 5) * st);
	}
	return Math.round(e * t + 5);
}
function Wr(e, t = 8) {
	return e / t;
}
function Gr(e) {
	return Math.round(e * st);
}
function Kr(e) {
	return e / st;
}
//#endregion
//#region packages/xlsx/src/internal/grid-axis-geometry.ts
var qr = class e {
	indices;
	cumulativeDelta;
	customPx;
	defaultPx;
	constructor(e, t, n, r, i) {
		this.maxIndex = r, this.defaultPx = Number.isFinite(t) && t >= 0 ? t : 0, this.indices = i ? i.map((e) => e.index) : Object.keys(e).map(Number).filter((e) => e >= 1 && e <= r).sort((e, t) => e - t), this.cumulativeDelta = Array(this.indices.length), this.customPx = Array(this.indices.length);
		let a = 0;
		for (let t = 0; t < this.indices.length; t++) {
			let r = i?.[t]?.px ?? n(e[this.indices[t]]), o = Number.isFinite(r) && r >= 0 ? r : this.defaultPx;
			this.customPx[t] = o, a += o - this.defaultPx, this.cumulativeDelta[t] = a;
		}
	}
	deltaBefore(e) {
		let t = 0, n = this.indices.length;
		for (; t < n;) {
			let r = t + n >> 1;
			this.indices[r] < e ? t = r + 1 : n = r;
		}
		return t === 0 ? 0 : this.cumulativeDelta[t - 1];
	}
	offsetOf(e) {
		return (e - 1) * this.defaultPx + this.deltaBefore(e);
	}
	indexAt(e) {
		if (e < 0) return {
			index: 1,
			partial: 0
		};
		let t = 1, n = this.maxIndex;
		for (; t < n;) {
			let r = t + n + 1 >> 1;
			this.offsetOf(r) <= e ? t = r : n = r - 1;
		}
		return {
			index: t,
			partial: e - this.offsetOf(t)
		};
	}
	scrollableIndexAt(e, t) {
		let n = e + this.offsetOf(t);
		return n >= this.offsetOf(this.maxIndex) + this.sizeOf(this.maxIndex) ? null : this.indexAt(n).index;
	}
	sizeOf(e) {
		return this.offsetOf(e + 1) - this.offsetOf(e);
	}
	scaled(t) {
		return new e({}, Math.round(this.defaultPx * t), (e) => e, this.maxIndex, this.indices.map((e, n) => ({
			index: e,
			px: Math.round(this.customPx[n] * t)
		})));
	}
	countToCover(e, t) {
		if (e > this.maxIndex || t <= 0) return 0;
		let n = this.offsetOf(e) + t;
		if (n >= this.offsetOf(this.maxIndex) + this.sizeOf(this.maxIndex)) return this.maxIndex - e + 1;
		let r = this.indexAt(n);
		return r.index - e + +(r.partial > 0);
	}
	bandsToCover(e, t, n = Infinity) {
		let r = Math.max(1, e), i = Math.min(this.maxIndex, t);
		if (r > i || n <= 0) return [];
		let a = [], o = 0, s = Math.max(r, this.indexAt(this.offsetOf(r)).index);
		for (; s <= i && o < n;) {
			let e = this.sizeOf(s);
			if (Number.isFinite(e) && e > 0 && (a.push({
				index: s,
				size: e
			}), o += e), s >= i) break;
			let t = this.offsetOf(s + 1), n = this.indexAt(t).index;
			s = Math.max(s + 1, n);
		}
		return a;
	}
}, Jr = 1048576, Z = 16384, Yr = class e {
	static cache = /* @__PURE__ */ new WeakMap();
	static forWorksheet(t, n) {
		let r = this.cache.get(t);
		if (r && Object.is(r.mdw, n)) return r.geometry;
		let i = new e(t, n);
		return this.cache.set(t, {
			mdw: n,
			geometry: i
		}), i;
	}
	static forWorksheetMeasured(e, t) {
		let n = this.cache.get(e);
		return n ? n.geometry : this.forWorksheet(e, t());
	}
	static invalidate(e) {
		this.cache.delete(e);
	}
	col;
	row;
	maximumDigitWidth;
	freezeRows;
	freezeCols;
	scaledCache = null;
	constructor(e, t) {
		this.maximumDigitWidth = t, this.freezeRows = Math.min(Jr, Math.max(0, e.freezeRows ?? 0)), this.freezeCols = Math.min(Z, Math.max(0, e.freezeCols ?? 0));
		let n = e.baseColWidth === void 0 ? Hr(e.defaultColWidth, t) : Ur(e.baseColWidth, t, tn()), r = new Float64Array(Z + 1);
		r.fill(NaN);
		let i = new Int32Array(Z + 2);
		for (let e = 1; e < i.length; e++) i[e] = e;
		let a = (e) => {
			let t = e;
			for (; i[t] !== t;) t = i[t];
			let n = e;
			for (; i[n] !== n;) {
				let e = i[n];
				i[n] = t, n = e;
			}
			return t;
		}, o = e.colWidthRanges ?? [];
		for (let e = o.length - 1; e >= 0; e--) {
			let t = o[e], n = Math.max(1, Math.min(Z, Math.trunc(t.min))), s = Math.max(1, Math.min(Z, Math.trunc(t.max)));
			if (s < n || !Number.isFinite(t.width) || t.width < 0) continue;
			let c = a(n);
			for (; c <= s;) r[c] = t.width, i[c] = a(c + 1), c = i[c];
		}
		for (let [t, n] of Object.entries(e.colWidths)) {
			let e = Number(t);
			Number.isInteger(e) && e >= 1 && e <= 16384 && (r[e] = n);
		}
		let s = [];
		for (let e = 1; e <= Z; e++) {
			let i = r[e];
			if (!Number.isFinite(i) || i < 0) continue;
			let a = Hr(i, t);
			a !== n && s.push({
				index: e,
				px: a
			});
		}
		this.col = new qr({}, n, (e) => Hr(e, t), Z, s), this.row = new qr(e.rowHeights, Gr(e.defaultRowHeight), Gr, Jr);
	}
	logicalFrozenExtent() {
		return {
			width: this.col.offsetOf(this.freezeCols + 1),
			height: this.row.offsetOf(this.freezeRows + 1)
		};
	}
	roundedFrozenExtent(e) {
		let t = this.axesAtScale(e);
		return {
			width: t.col.offsetOf(this.freezeCols + 1),
			height: t.row.offsetOf(this.freezeRows + 1)
		};
	}
	effectiveFrozenBands(e) {
		let t = this.axesAtScale(e.scale), n = t.row.bandsToCover(1, Math.max(0, e.rows), Math.max(0, e.height - Math.round(e.headerHeight * e.scale))), r = t.col.bandsToCover(1, Math.max(0, e.cols), Math.max(0, e.width - Math.round(e.headerWidth * e.scale)));
		return {
			rows: n.at(-1)?.index ?? 0,
			cols: r.at(-1)?.index ?? 0
		};
	}
	logicalContentExtent(e, t, n, r) {
		return {
			width: n + this.col.offsetOf(Math.min(Z, t) + 1),
			height: r + this.row.offsetOf(Math.min(Jr, e) + 1)
		};
	}
	roundedContentExtent(e, t, n, r, i) {
		let a = this.axesAtScale(n);
		return {
			width: Math.round(r * n) + a.col.offsetOf(Math.min(Z, t) + 1),
			height: Math.round(i * n) + a.row.offsetOf(Math.min(Jr, e) + 1)
		};
	}
	cellAt(e, t, n) {
		if (e < 0 || t < 0) return null;
		let r = this.rowAt(t, n.scrollY, n.scale);
		if (r === null) return null;
		let i = this.colAt(e, n.scrollX, n.scale);
		return i === null ? null : {
			row: r,
			col: i
		};
	}
	rowAt(e, t, n = 1) {
		if (e < 0) return null;
		let r = this.axesAtScale(n).row, i = r.offsetOf(this.freezeRows + 1);
		return e < i ? this.indexWithinFrozen(r, e, this.freezeRows) : r.scrollableIndexAt(e - i + t, this.freezeRows + 1);
	}
	colAt(e, t, n = 1) {
		if (e < 0) return null;
		let r = this.axesAtScale(n).col, i = r.offsetOf(this.freezeCols + 1);
		return e < i ? this.indexWithinFrozen(r, e, this.freezeCols) : r.scrollableIndexAt(e - i + t, this.freezeCols + 1);
	}
	cellRect(e, t, n) {
		if (e < 1 || e > 1048576 || t < 1 || t > 16384) return null;
		let r = this.axesAtScale(n.scale), i = Math.round(n.headerWidth * n.scale), a = Math.round(n.headerHeight * n.scale), o = this.roundedFrozenExtent(n.scale);
		return {
			x: t <= this.freezeCols ? i + r.col.offsetOf(t) : this.scrollableCellPosition(r.col, t, this.freezeCols, n.scrollX, i + o.width),
			y: e <= this.freezeRows ? a + r.row.offsetOf(e) : this.scrollableCellPosition(r.row, e, this.freezeRows, n.scrollY, a + o.height),
			w: r.col.sizeOf(t),
			h: r.row.sizeOf(e)
		};
	}
	visibleRange(e) {
		let t = this.axesAtScale(e.scale), n = this.roundedFrozenExtent(e.scale), r = t.col.indexAt(e.scrollX + t.col.offsetOf(this.freezeCols + 1)), i = t.row.indexAt(e.scrollY + t.row.offsetOf(this.freezeRows + 1)), a = e.width - Math.round(e.headerWidth * e.scale) - n.width, o = e.height - Math.round(e.headerHeight * e.scale) - n.height, s = e.buffer ?? 0;
		return {
			range: {
				row: i.index,
				col: r.index,
				rows: t.row.countToCover(i.index, o + i.partial * 2) + s,
				cols: t.col.countToCover(r.index, a + r.partial * 2) + s
			},
			offsetX: r.partial / e.scale,
			offsetY: i.partial / e.scale,
			frozenWidth: n.width / e.scale,
			frozenHeight: n.height / e.scale
		};
	}
	scrollOffsetForCell(e, t, n) {
		let r = this.roundedFrozenExtent(n.scale), i = Math.round(n.headerHeight * n.scale) + r.height, a = Math.round(n.headerWidth * n.scale) + r.width, o = n.currentY, s = this.axesAtScale(n.scale);
		if (e > this.freezeRows && e <= 1048576) {
			let t = s.row.offsetOf(e) - s.row.offsetOf(this.freezeRows + 1), r = s.row.sizeOf(e);
			o = this.alignedOffset(t, r, n.currentY, i, n.viewportHeight, n.align);
		}
		let c = n.currentX;
		if (t > this.freezeCols && t <= 16384) {
			let e = s.col.offsetOf(t) - s.col.offsetOf(this.freezeCols + 1), r = s.col.sizeOf(t);
			c = this.alignedOffset(e, r, n.currentX, a, n.viewportWidth, n.align);
		}
		return {
			x: Math.max(0, c),
			y: Math.max(0, o)
		};
	}
	axesAtScale(e) {
		if (this.scaledCache?.scale === e) return this.scaledCache;
		let t = {
			scale: e,
			row: this.row.scaled(e),
			col: this.col.scaled(e)
		};
		return this.scaledCache = t, t;
	}
	indexWithinFrozen(e, t, n) {
		if (n === 0) return null;
		let r = e.indexAt(t).index;
		return r <= n ? r : null;
	}
	scrollableCellPosition(e, t, n, r, i) {
		let a = e.indexAt(r + e.offsetOf(n + 1));
		return i - a.partial + e.offsetOf(t) - e.offsetOf(a.index);
	}
	alignedOffset(e, t, n, r, i, a) {
		let o = r + e - n;
		return a === "start" ? e : a === "center" ? e - (i - r - t) / 2 : a === "end" ? e - (i - r - t) : o < r ? e : o + t > i ? e - (i - r - t) : n;
	}
};
//#endregion
//#region packages/xlsx/src/a1.ts
function Xr(e) {
	let t = /^\$?([A-Z]+)\$?(\d+)$/.exec(e.trim());
	if (!t) return null;
	let n = t[1], r = 0;
	for (let e = 0; e < n.length; e++) r = r * 26 + (n.charCodeAt(e) - 64);
	let i = parseInt(t[2], 10);
	return i < 1 || i > 1048576 || r > 16384 ? null : {
		row: i,
		col: r
	};
}
function Zr(e, t) {
	let n = "", r = t;
	for (; r > 0;) {
		let e = (r - 1) % 26;
		n = String.fromCharCode(65 + e) + n, r = Math.floor((r - 1) / 26);
	}
	return `${n}${e}`;
}
//#endregion
//#region packages/xlsx/src/vertical-text.ts
function Qr(e, t, n, r, i, a = !1) {
	let o = t.codePointAt(0) ?? 0, s = ce(o);
	if (a && A(o)) {
		e.save(), e.translate(n, r + i / 2), e.textAlign = "center", e.textBaseline = "middle", ie(e, () => e.fillText(t, 0, 0)), e.restore();
		return;
	}
	if (s === "Tr") {
		let a = k(o);
		if (a !== null) {
			e.fillText(String.fromCodePoint(a), n, r);
			return;
		}
		if (P(o)) {
			e.fillText(t, n, r);
			return;
		}
		e.save(), e.translate(n, r + i / 2), e.rotate(Math.PI / 2), e.textAlign = "center", e.textBaseline = "middle", e.fillText(t, 0, 0), e.restore();
		return;
	}
	let c = s === "Tu" ? R(o) : null;
	e.fillText(c === null ? t : String.fromCodePoint(c), n, r);
}
//#endregion
//#region packages/xlsx/src/internal/cell-anchor-geometry.ts
function $r(e) {
	return e.editAs === "oneCell" && (e.nativeExtCx ?? 0) > 0 && (e.nativeExtCy ?? 0) > 0;
}
//#endregion
//#region packages/xlsx/src/internal/optional-image-fallback.ts
var ei = /* @__PURE__ */ new WeakMap();
function ti(e) {
	ei.delete(e);
}
function ni(e, t, n) {
	let r = ei.get(e);
	r || (r = /* @__PURE__ */ new Map(), ei.set(e, r)), r.set(t, n);
}
function ri(e, t, n) {
	return e !== void 0 && ei.get(e)?.get(t) === n;
}
//#endregion
//#region packages/xlsx/src/renderer.ts
function ii(e, t) {
	return t ? `${e}|duo:${t.clr1}:${t.clr2}` : e;
}
var ai = l.map((e) => `"${e}"`).join(", "), oi = f.map((e) => `"${e}"`).join(", "), si = `"Calibri", Arial, ${ai}, sans-serif`, ci = `"Calibri", "Carlito", Arial, ${ai}, sans-serif`, li = `Arial, Helvetica, "Liberation Sans", ${ai}, sans-serif`, ui = `"Times New Roman", "Liberation Serif", ${oi}, serif`, di = `"Carlito", ${li}`, fi = `"Caladea", ${ui}`, pi = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u, mi = /* @__PURE__ */ new WeakMap(), hi = /* @__PURE__ */ new WeakMap(), gi = /* @__PURE__ */ new WeakMap(), _i = /* @__PURE__ */ new WeakMap(), vi = /* @__PURE__ */ new WeakMap(), yi = /* @__PURE__ */ new WeakMap(), bi = /* @__PURE__ */ new WeakMap(), xi = /* @__PURE__ */ new WeakMap(), Si = /* @__PURE__ */ new WeakMap();
function Ci(e, t, n, r, i, a = /* @__PURE__ */ new Map()) {
	let o = e.defaultFontFamily ? zt({
		family: e.defaultFontFamily,
		weight: e.defaultFontBold ? 700 : 400,
		style: e.defaultFontItalic ? "italic" : "normal"
	}) : null, s = o === null ? void 0 : t?.[o], c = {
		tupleKey: o,
		route: s,
		hasDeclaredFace: e.defaultFontFamily ? Ri(e.defaultFontFamily, n) : !1,
		canvasMdw: i && e.defaultFontFamily && e.defaultFontSize ? Ii(e.defaultFontFamily, e.defaultFontSize, s, r, e.defaultFontBold ? 700 : 400, e.defaultFontItalic ? "italic" : "normal", i, a.get(e.defaultFontFamily.trim().toLocaleLowerCase("en-US"))) : void 0
	}, l = gi.get(e);
	(!l || l.tupleKey !== c.tupleKey || l.route !== c.route || l.hasDeclaredFace !== c.hasDeclaredFace || l.canvasMdw !== c.canvasMdw) && Yr.invalidate(e), gi.set(e, c);
}
function wi(e, t, n, r = !1) {
	xi.set(e, t), (hi.get(t) !== n || vi.get(t) !== r) && Yr.invalidate(t), _i.set(e, r);
	let i = (N(e.canvas) ? e.canvas.ownerDocument?.fonts : void 0) ?? He(), a = r ? H(i, Ht) : /* @__PURE__ */ new Map();
	yi.set(e, a), bi.set(t, a), Ci(t, n, i, r, e, a), vi.set(t, r), n ? (mi.set(e, n), hi.set(t, n)) : (mi.delete(e), hi.delete(t));
}
function Ti(e, t) {
	return t ? yi.get(e)?.get(t.trim().toLocaleLowerCase("en-US")) : void 0;
}
function Ei(e, t, n = !1) {
	(hi.get(e) !== t || vi.get(e) !== n) && Yr.invalidate(e), t ? hi.set(e, t) : hi.delete(e), vi.set(e, n);
	let r = He(), i = n ? H(r, Ht) : /* @__PURE__ */ new Map();
	bi.set(e, i), Ci(e, t, r, n, void 0, i);
}
function Di(e, t, n = !1, r = !1) {
	let i = zt({
		family: t?.trim() || "Calibri",
		weight: n ? 700 : 400,
		style: r ? "italic" : "normal"
	});
	return mi.get(e)?.[i];
}
function Oi(e, t) {
	if (t !== void 0) {
		if (!Number.isFinite(t) || t <= 0) throw Error("XLSX maximum digit width must be a finite positive number");
		Yr.forWorksheet(e, t);
	}
}
var ki = "\"Courier New\", \"Liberation Mono\", monospace";
function Ai(e, t, n = !1, r = "") {
	let i = e?.trim() || null, a = i ? C(i) : null, o = d(i), s = (e, n = !0) => {
		let i = [...n && t ? G(t, o === "serif" ? "serif" : "sans") : [], ...pi.test(r) ? o === "serif" ? ["Noto Naskh Arabic", "Noto Sans Arabic"] : ["Noto Sans Arabic"] : []];
		if (i.length === 0) return e;
		let a = e.lastIndexOf(",");
		return `${e.slice(0, a)}, ${i.map((e) => `"${e}"`).join(", ")}${e.slice(a)}`;
	};
	if (!a) return s(i ? i.toLowerCase() === "calibri" ? n ? di : li : i.toLowerCase() === "cambria" ? n ? fi : ui : o === "serif" ? ui : o === "mono" ? ki : li : n ? ci : si);
	let c = o === "serif", l = w(i), u = [...l ? [l] : [], ...G(a, c ? "serif" : "sans").filter((e) => e !== l)].map((e) => `"${e}"`).join(", ");
	return s(`${u ? `${u}, ` : ""}${c ? ui : li}`, !1);
}
function ji(e, t, n = "", r, i = !1, a, o) {
	let s = e?.trim(), c = S(n) ? t : void 0, l = r && (s?.toLocaleLowerCase("en-US") || "calibri") === r.requestedFamily.trim().toLocaleLowerCase("en-US") ? r : void 0, u = a && a.toLocaleLowerCase("en-US") !== s?.toLocaleLowerCase("en-US") ? `"${a}", ` : "", d = o && o.toLocaleLowerCase("en-US") !== s?.toLocaleLowerCase("en-US") ? `"${o}", ` : "";
	return l ? `"${l.family}", ${u}${d}${Ai(s, c, i, n)}` : s ? `"${s}", ${u}${d}${Ai(s, c, i, n)}` : Ai(null, c, i, n);
}
var Mi = 11;
function Ni(e, t, n) {
	return n - e - t;
}
function Pi(e, t, n, r) {
	return r ? Ni(e, t, n) : e;
}
var Fi = "#7a7a7a";
function Ii(e, t, n, r = !1, i = 400, a = "normal", o, s) {
	let c = t * st, l = o ? null : typeof OffscreenCanvas < "u" ? new OffscreenCanvas(1, 1) : typeof document < "u" ? document.createElement("canvas") : null, u = o ?? l?.getContext("2d");
	if (!u) return 8;
	let d = i !== 400 || a !== "normal" ? `${a} ${i} ` : "";
	o && u.save();
	try {
		u.font = `${d}${c}px ${ji(e, void 0, "", n, r, void 0, s)}`;
		let t = 0;
		for (let e of "0123456789") {
			let n = u.measureText(e).width;
			n > t && (t = n);
		}
		return Li(t);
	} finally {
		o && u.restore();
	}
}
function Li(e) {
	return (tn() ? Math.round(Math.round(e / 1.3333333333333333) * 1.3333333333333333) : Math.round(e)) || 8;
}
function Ri(e, t) {
	if (!t || typeof t[Symbol.iterator] != "function") return !1;
	let n = e.trim().toLocaleLowerCase("en-US");
	for (let e of t) if (e.family.trim().replace(/^(['"])(.*)\1$/u, "$2").toLocaleLowerCase("en-US") === n) return !0;
	return !1;
}
function zi(e) {
	if (!e.defaultFontFamily || !e.defaultFontSize) return 8;
	let t = e.defaultFontBold ? 700 : 400, n = e.defaultFontItalic ? "italic" : "normal", r = zt({
		family: e.defaultFontFamily,
		weight: t,
		style: n
	}), i = hi.get(e)?.[r];
	return gi.get(e)?.canvasMdw ?? Ii(e.defaultFontFamily, e.defaultFontSize, i, vi.get(e) === !0, t, n, void 0, bi.get(e)?.get(e.defaultFontFamily.trim().toLocaleLowerCase("en-US")));
}
function Q(e) {
	return Yr.forWorksheetMeasured(e, () => zi(e));
}
function Bi(e, t, n, r, i, a, o) {
	if (!(i <= 0 || a <= 0)) {
		if (o) {
			let a = e.createLinearGradient(n, r, n + i, r);
			a.addColorStop(0, J(t, .85)), a.addColorStop(1, J(t, .15)), e.fillStyle = a;
		} else e.fillStyle = J(t);
		e.fillRect(n, r, i, a);
	}
}
function Vi(e) {
	switch (e) {
		case "solid": return 1;
		case "darkGray": return .75;
		case "mediumGray": return .5;
		case "lightGray": return .25;
		case "gray125": return .125;
		case "gray0625": return .0625;
		case "darkHorizontal":
		case "darkVertical":
		case "darkDown":
		case "darkUp":
		case "darkGrid":
		case "darkTrellis": return .5;
		case "lightHorizontal":
		case "lightVertical":
		case "lightDown":
		case "lightUp":
		case "lightGrid":
		case "lightTrellis": return .25;
		default: return 1;
	}
}
var Hi = /* @__PURE__ */ new Map(), Ui = {
	gray0625: [
		128,
		0,
		8,
		0,
		128,
		0,
		8,
		0
	],
	gray125: [
		136,
		0,
		34,
		0,
		136,
		0,
		34,
		0
	],
	lightGray: [
		170,
		0,
		85,
		0,
		170,
		0,
		85,
		0
	],
	mediumGray: [
		170,
		85,
		170,
		85,
		170,
		85,
		170,
		85
	],
	darkGray: [
		119,
		221,
		119,
		221,
		119,
		221,
		119,
		221
	],
	darkHorizontal: [
		4095,
		4095,
		0,
		4095,
		4095,
		0,
		4095,
		4095,
		0,
		4095,
		4095,
		0
	],
	lightHorizontal: [
		4095,
		0,
		0,
		4095,
		0,
		0,
		4095,
		0,
		0,
		4095,
		0,
		0
	],
	darkVertical: Array(12).fill(3510),
	lightVertical: Array(12).fill(2340),
	darkGrid: [
		204,
		204,
		51,
		51,
		204,
		204,
		51,
		51
	],
	lightGrid: [
		255,
		136,
		136,
		136,
		255,
		136,
		136,
		136
	],
	darkDown: [
		204,
		102,
		51,
		153,
		204,
		102,
		51,
		153
	],
	lightDown: [
		136,
		68,
		34,
		17,
		136,
		68,
		34,
		17
	],
	darkUp: [
		51,
		102,
		204,
		153,
		51,
		102,
		204,
		153
	],
	lightUp: [
		17,
		34,
		68,
		136,
		17,
		34,
		68,
		136
	],
	darkTrellis: [
		255,
		102,
		255,
		153,
		255,
		102,
		255,
		153
	],
	lightTrellis: [
		153,
		102,
		102,
		153,
		153,
		102,
		102,
		153
	]
};
function Wi(e, t, n, r) {
	let i = e.getTransform(), a = Math.max(1, Math.round(Math.hypot(i.a, i.b))), o = Math.max(1, Math.round(Math.hypot(i.c, i.d))), s = `${t}|${n}|${r}|${a}|${o}`;
	if (Hi.has(s)) return Hi.get(s);
	let c = Ui[t];
	if (!c) return Hi.set(s, null), null;
	let l = c.length, u = Xe(l, l);
	if (!u) return Hi.set(s, null), null;
	let d = u.getContext("2d");
	if (!d) return Hi.set(s, null), null;
	d.fillStyle = J(r), d.fillRect(0, 0, l, l), d.fillStyle = J(n);
	for (let e = 0; e < l; e++) {
		let t = c[e];
		for (let n = 0; n < l; n++) t & 1 << l - 1 - n && d.fillRect(n, e, 1, 1);
	}
	let f = e.createPattern(u, "repeat");
	if (f && typeof DOMMatrix < "u" && (a >= 2 || o >= 2)) {
		let e = new DOMMatrix();
		e.scaleSelf(1 / a, 1 / o), f.setTransform(e);
	}
	return Hi.set(s, f), f;
}
function Gi(e, t, n, r, i, a) {
	if (t.gradient && t.gradient.stops.length > 0) return e.fillStyle = Ki(e, t.gradient, n, r, i, a), e.fillRect(n, r, i, a), !0;
	let o = t.patternType;
	if (!o || o === "none") return !1;
	let s = t.fgColor ?? "000000", c = t.bgColor ?? "FFFFFF";
	if (o === "solid") return e.fillStyle = J(s), e.fillRect(n, r, i, a), !0;
	let l = Wi(e, o, s, c);
	if (l) e.fillStyle = l;
	else {
		let t = Vi(o);
		e.fillStyle = t >= 1 ? J(s) : Yi(s, c, t);
	}
	return e.fillRect(n, r, i, a), !0;
}
function Ki(e, t, n, r, i, a) {
	let o;
	if (t.gradientType === "path") {
		let s = n + i * (t.left + (1 - t.right - t.left) / 2), c = r + a * (t.top + (1 - t.bottom - t.top) / 2), l = Math.hypot(Math.max(s - n, n + i - s), Math.max(c - r, r + a - c));
		o = e.createRadialGradient(s, c, 0, s, c, l);
	} else {
		let s = t.degree * Math.PI / 180, c = n + i / 2, l = r + a / 2, u = (Math.abs(Math.cos(s)) * i + Math.abs(Math.sin(s)) * a) / 2;
		o = e.createLinearGradient(c - Math.cos(s) * u, l - Math.sin(s) * u, c + Math.cos(s) * u, l + Math.sin(s) * u);
	}
	for (let e of t.stops) {
		let t = Math.min(1, Math.max(0, e.position));
		o.addColorStop(t, J(e.color));
	}
	return o;
}
var qi = Xr;
function Ji(e, t, n, r, i) {
	let a = Math.max(4, Math.min(8, Math.min(r, i) * .18));
	e.save(), e.fillStyle = "#D40000", e.beginPath(), e.moveTo(t + r - a, n), e.lineTo(t + r, n), e.lineTo(t + r, n + a), e.closePath(), e.fill(), e.restore();
}
function Yi(e, t, n) {
	let r = e.replace("#", ""), i = t.replace("#", ""), a = parseInt(r.slice(0, 2), 16), o = parseInt(r.slice(2, 4), 16), s = parseInt(r.slice(4, 6), 16), c = parseInt(i.slice(0, 2), 16), l = parseInt(i.slice(2, 4), 16), u = parseInt(i.slice(4, 6), 16), d = Math.min(1, Math.max(0, n));
	return `rgb(${Math.round(a * d + c * (1 - d))},${Math.round(o * d + l * (1 - d))},${Math.round(s * d + u * (1 - d))})`;
}
function $(e, t, n = 1) {
	return Math.round(e * st * n * t);
}
function Xi(e, t) {
	let n = {
		family: e.name,
		weight: e.bold ? 700 : 400
	};
	if (!Zi()) return n;
	let r = Qi(e, t);
	if (!r) return n;
	let i = Ve(r, {
		source: "office-mac",
		weight: e.bold ? 700 : 400,
		style: e.italic ? "italic" : "normal"
	}), a = i.length ? i : Ve(r, { source: "office-mac" }), o = new Set(a.flatMap((e) => e.aliases).filter((e) => /-(?:Regular|Bold|Italic|BoldItalic|Light|Medium)$/i.test(e)).map((e) => e.replace(/-(?:Regular|Bold|Italic|BoldItalic|Light|Medium)$/i, ""))), s = new Set(a.map((e) => e.family)), c = i.length === 0 && a.length === 1 && ![400, 700].includes(a[0].weight) ? a[0].weight : n.weight, l = o.size === 1 ? [...o][0] : s.size === 1 ? [...s][0] : void 0;
	return {
		family: r,
		weight: c,
		...l && l.toLocaleLowerCase("en-US") !== r.toLocaleLowerCase("en-US") ? { fallbackAlias: l } : {}
	};
}
function Zi() {
	let e = typeof navigator < "u" ? navigator : void 0;
	return !!(tn() && e && (e.language || "").toLowerCase().startsWith("ja"));
}
function Qi(e, t) {
	return e.scheme === "major" ? t?.themeJapaneseMajorFont : e.scheme === "minor" ? t?.themeJapaneseMinorFont : void 0;
}
function $i(e, t) {
	let n = Zi() && Qi(e, t);
	if (!t || !n) return {
		family: e.name,
		weight: e.bold ? 700 : 400
	};
	let r = Si.get(t);
	r || (r = /* @__PURE__ */ new Map(), Si.set(t, r));
	let i = `${e.scheme}:${n}:${+!!e.bold}:${+!!e.italic}`, a = r.get(i);
	return a || (a = Xi(e, t), r.size < 8 && r.set(i, a)), a;
}
function ea(e, t, n = 1, r, i = "") {
	let a = t.italic ? "italic " : "", o = Math.max(1, Math.round(t.size * st * n)), s = $i(t, xi.get(e));
	return `${a}${s.weight === 400 ? "" : `${s.weight} `}${o}px ${ji(s.family, r, i, Di(e, s.family, t.bold, t.italic), _i.get(e) === !0, s.fallbackAlias, Ti(e, s.family))}`;
}
function ta(e, t, n, r, i, a, o, s, c, l, u) {
	if (t.length === 0) return;
	let d = n?.fontId ?? 0, f = a.fonts[d] ?? a.fonts[0];
	if (!f) return;
	let p = n?.alignment ?? "left";
	e.save(), e.font = ea(e, f, c, u, t.map((e) => e.text).join("")), e.textBaseline = "top", e.textAlign = "left", e.fillStyle = l;
	let m = s + Math.round(2 * c);
	if (p === "noControl") {
		let n = o;
		for (let r of t) e.fillText(r.text, n, m), n += e.measureText(r.text).width;
		e.restore();
		return;
	}
	let h = en(t, r, o, p, (t) => na(e, t, i));
	for (let t of h) {
		let n = e.measureText(t.text).width, r = [...t.text];
		if (t.spread === "distribute" && r.length > 1 && n < t.width) {
			let i = (t.width - n) / (r.length - 1);
			try {
				e.letterSpacing = `${i}px`;
			} catch {}
			e.fillText(t.text, t.x, m);
			try {
				e.letterSpacing = "0px";
			} catch {}
		} else t.spread === "center" ? e.fillText(t.text, t.x + (t.width - n) / 2, m) : e.fillText(t.text, t.x, m);
	}
	e.restore();
}
function na(e, t, n) {
	let r = e.font;
	e.font = n;
	let i = e.measureText(t).width;
	return e.font = r, i;
}
function ra(e, t, n, r, i, a, o = 1) {
	if (e.save(), e.strokeStyle = i, e.lineWidth = .5, e.beginPath(), a) {
		let i = r - 1, a = r + 1, s = i + _(i, .5, o), c = a + _(a, .5, o);
		e.moveTo(t, s), e.lineTo(n, s), e.moveTo(t, c), e.lineTo(n, c);
	} else {
		let i = r + _(r, .5, o);
		e.moveTo(t, i), e.lineTo(n, i);
	}
	e.stroke(), e.restore();
}
function ia(e, t) {
	let n = t.font;
	return n ? {
		bold: n.bold,
		italic: n.italic,
		underline: n.underline,
		underlineStyle: n.underlineStyle,
		strike: n.strike,
		size: n.size ?? e.size,
		color: n.color ?? e.color,
		name: n.name ?? e.name,
		vertAlign: n.vertAlign
	} : e;
}
function aa(e, t) {
	let n = e.cellXfs[t] ?? e.cellXfs[0] ?? {
		fontId: 0,
		fillId: 0,
		borderId: 0,
		numFmtId: 0,
		alignH: null,
		alignV: null,
		wrapText: !1
	};
	return {
		font: e.fonts[n.fontId] ?? {
			bold: !1,
			italic: !1,
			underline: !1,
			strike: !1,
			size: Mi,
			color: null,
			name: null
		},
		fill: e.fills[n.fillId] ?? {
			patternType: "none",
			fgColor: null,
			bgColor: null
		},
		border: e.borders[n.borderId] ?? {
			left: null,
			right: null,
			top: null,
			bottom: null
		},
		xf: n
	};
}
function oa(e, t) {
	let n = e.colStyleRanges ?? [];
	for (let e = n.length - 1; e >= 0; e--) {
		let r = n[e];
		if (t >= r.min && t <= r.max) return r.styleIndex;
	}
	return 0;
}
function sa(e, t, n) {
	return t?.styleIndex ?? oa(e, n);
}
function ca(e, t, n, r) {
	let i = [];
	for (let a of t.split("\n")) i.push(...fa(e, a, n, r));
	return i;
}
function la(e, t) {
	if (e.length === 0 || t.length === 0) return 0;
	let n = [...e, ...t], r = e.length;
	return r - c(n, r, s, 1);
}
function ua(e, t) {
	let n = t;
	for (; n < e.length;) {
		let t = e[e.length - n - 1], r = e[e.length - n], i = t?.codePointAt(0), a = r?.codePointAt(0);
		if (i !== void 0 && a !== void 0 && de(i) && de(a)) n++;
		else break;
	}
	return n >= e.length ? t : n;
}
function da(e, t) {
	if (e.length === 0 || t.length === 0) return 0;
	let n = t[0].codePointAt(0), r = e.length - 1, i = e[r].codePointAt(0);
	if (i === void 0 || n === void 0 || i === 8203 || n === 8203 || !pe(i, n)) return 0;
	for (; r > 0;) {
		let t = e[r - 1].codePointAt(0), n = e[r].codePointAt(0);
		if (t === void 0 || n === void 0 || !pe(t, n)) break;
		r--;
	}
	return r === 0 ? 0 : e.length - r;
}
function fa(e, t, n, r = (t) => e.measureText(t).width) {
	let i = [], o = [], s = 0;
	for (; s < t.length;) {
		let e = t[s], n = e.codePointAt(0) ?? 0;
		if (a(n)) o.push(e), s += n > 65535 ? 2 : 1;
		else if (e === " ") {
			let e = s;
			for (; e < t.length && t[e] === " ";) e++;
			o.push(t.slice(s, e)), s = e;
		} else {
			let e = s;
			for (; e < t.length;) {
				let n = t[e], r = n.codePointAt(0) ?? 0;
				if (n === " " || a(r)) break;
				e += r > 65535 ? 2 : 1;
			}
			let n = t.slice(s, e), r = V(n) ? D(n) : null;
			if (r && r.length > 0) {
				let e = 0;
				for (let t of r) o.push(n.slice(e, t)), e = t;
				o.push(n.slice(e));
			} else o.push(n);
			s = e;
		}
	}
	let c = "";
	for (let e of o) {
		if (c === "") {
			c = e;
			continue;
		}
		let t = c + e;
		if (r(t) <= n) c = t;
		else {
			let t = e.replace(/^ +/, "");
			t === "" && (t = e);
			let n = [...c], r = la(n, [...t]);
			if (r > 0) {
				let e = n.length - r;
				i.push(n.slice(0, e).join("")), c = n.slice(e).join("") + t;
			} else i.push(c), c = t;
		}
	}
	return i.push(c), i;
}
function pa(e, t, n, r, i, o) {
	let s = [], c = [], l = 0, u = 0, d = n.size, f = 0, p = () => {
		c.length !== 0 && (s.push({
			segments: c,
			maxFontSize: u,
			para: f
		}), c = [], l = 0, u = 0);
	}, m = () => {
		if (c.length === 0) {
			s.push({
				segments: [],
				maxFontSize: d || Mi,
				para: f
			});
			return;
		}
		p();
	}, h = (t, n) => {
		if (!t) return;
		d = n.size, e.font = ea(e, ga(n), r, o, t);
		let a = e.measureText(t).width;
		if (c.length > 0 && l + a > i) {
			let i = c.flatMap((e) => [...e.text]), a = la(i, [...t]);
			a > 0 ? a = ua(i, a) : !V(t) && !V(c[c.length - 1]?.text ?? "") && !/^\s/u.test(t) && !/\s$/u.test(i.at(-1) ?? "") && (a = da(i, [...t]));
			let s = c[c.length - 1], d = [...s.text];
			a > d.length && (a = d.length);
			let f = null;
			if (a > 0) {
				let t = d.slice(0, d.length - a), n = d.slice(d.length - a);
				if (t.length === 0) c.pop();
				else {
					let n = t.join("");
					e.font = ea(e, ga(s.font), r, o, n), s.text = n, s.width = e.measureText(n).width;
				}
				let i = n.join("");
				e.font = ea(e, ga(s.font), r, o, i), f = {
					text: i,
					font: s.font,
					width: e.measureText(i).width
				};
			}
			p(), f && (c.push(f), l += f.width, f.font.size > u && (u = f.font.size)), e.font = ea(e, ga(n), r, o, t);
		}
		c.push({
			text: t,
			font: n,
			width: a
		}), l += a, n.size > u && (u = n.size);
	}, g = (t, n) => {
		let a = D(t);
		if (a.length === 0) {
			h(t, n);
			return;
		}
		e.font = ea(e, ga(n), r, o, t);
		let s = (t) => e.measureText(t).width, c = T(t), u = t.length, d = 0;
		for (; d < u;) {
			let e = i - l, r = B(t, a, d, e, s, c);
			if (r <= d) {
				if (l > 0) {
					p();
					continue;
				}
				let n = a.find((e) => e > d) ?? u, i = t.slice(d, n), o = ee(i), f = B(i, o, 0, e, s, c);
				f <= 0 && (f = o.length > 0 ? o[0] : i.length), r = d + f;
			}
			h(t.slice(d, r), n), d = r, d < u && p();
		}
	};
	for (let e of t) {
		let t = ia(n, e), r = [], i = 0;
		for (; i < e.text.length;) {
			let t = e.text[i], n = t.codePointAt(0) ?? 0;
			if (n === 10) r.push("\n"), i += 1;
			else if (a(n)) r.push(t), i += n > 65535 ? 2 : 1;
			else if (t === " ") {
				let t = i;
				for (; t < e.text.length && e.text[t] === " ";) t++;
				r.push(e.text.slice(i, t)), i = t;
			} else {
				let t = i;
				for (; t < e.text.length;) {
					let n = e.text[t], r = n.codePointAt(0) ?? 0;
					if (n === " " || n === "\n" || a(r)) break;
					t += r > 65535 ? 2 : 1;
				}
				r.push(e.text.slice(i, t)), i = t;
			}
		}
		for (let e of r) e === "\n" ? (m(), f++) : V(e) ? g(e, t) : h(e, t);
	}
	return (c.length > 0 || s.length > 0) && m(), s;
}
function ma(e, t, n) {
	return e === "middle" ? {
		underline: t + Math.round(n * .55),
		strike: t
	} : e === "bottom" ? {
		underline: t + 1,
		strike: t - Math.round(n * .35)
	} : {
		underline: t + n + 1,
		strike: t + Math.round(n * .5)
	};
}
function ha(e) {
	let { alignV: t, cy: n, cellH: r, paddingY: i } = e;
	return t === "top" ? {
		baseline: "top",
		textY: n + i
	} : t === "center" ? {
		baseline: "middle",
		textY: n + r / 2
	} : {
		baseline: "bottom",
		textY: n + r - i
	};
}
function ga(e) {
	return e.vertAlign === "superscript" || e.vertAlign === "subscript" ? {
		...e,
		size: e.size * .65
	} : e;
}
function _a(e, t, n, r, i, a, o, s, c) {
	e.textAlign = "left", e.textBaseline = i;
	let l = s.needBidi ? Vr(t, s.baseRtl ?? !1) : null, u = e, d = n;
	for (let n = 0; n < t.length; n++) {
		let f = l ? l.order[n] : n;
		if (l) try {
			u.direction = l.rtl[f] ? "rtl" : "ltr";
		} catch {}
		let p = t[f], m = ga(p.font);
		e.font = ea(e, m, a, c, p.text);
		let h = s.fontColor ?? p.font.color;
		e.fillStyle = h ? J(h) : "#000000";
		let g = $(p.font.size, a), v = 0;
		p.font.vertAlign === "superscript" ? v = -Math.round(g * .35) : p.font.vertAlign === "subscript" && (v = Math.round(g * .1)), e.fillText(p.text, d, r + v);
		let y = $(m.size, a);
		if (p.font.underline || p.font.strike) {
			let t = ma(i, r, y);
			if (p.font.underline) {
				let n = h ? J(h) : "#000000", r = p.font.underlineStyle === "double" || p.font.underlineStyle === "doubleAccounting";
				ra(e, d, d + p.width, t.underline + v, n, r, o);
			}
			if (p.font.strike) {
				let n = t.strike + v, r = n + _(n, .5, o);
				e.save(), e.strokeStyle = h ? J(h) : "#000000", e.lineWidth = .5, e.beginPath(), e.moveTo(d, r), e.lineTo(d + p.width, r), e.stroke(), e.restore();
			}
		}
		d += p.width;
	}
	if (l) try {
		u.direction = "ltr";
	} catch {}
}
function va(e, t, n, r, i, a, o, s, c) {
	let { alignH: l, cx: u, cellW: d, leftPad: f, paddingX: p } = n, m = t.reduce((e, t) => e + t.width, 0), h;
	h = l === "right" ? u + d - p - m : l === "center" ? u + d / 2 - m / 2 : u + f;
	let { needBidi: g, baseRtl: _ } = Br(a.readingOrder, t.map((e) => e.text).join(""));
	_a(e, t, h, o, s, r, i, {
		fontColor: a.fontColor,
		needBidi: g,
		baseRtl: _
	}, c);
}
function ya(e, t, n, r, i, a, o, s, c, l) {
	va(e, t.map((t) => {
		let r = ia(n, t);
		return e.font = ea(e, ga(r), i, l, t.text), {
			text: t.text,
			font: r,
			width: e.measureText(t.text).width
		};
	}), r, i, a, o, s, c, l);
}
function ba(e, t, n, r, i, a, o = {}, s) {
	let { baseline: c, textY: l } = ha(r);
	ya(e, t, n, r, i, a, o, l, c, s);
}
function xa(e, t, n, r, i, a, o = {}, s) {
	let { alignV: c, cy: l, cellH: u, paddingY: d } = r, f = Va(t, n, i), p = f.reduce((e, t) => e + t.heightPx, 0), m;
	m = c === "top" ? l + d : c === "center" ? l + (u - p) / 2 : l + u - p - d;
	for (let t of f) t.runs.length > 0 && ya(e, t.runs, n, r, i, a, o, m, "top", s), m += t.heightPx;
}
function Sa(e, t, n, r, i, a, o = {}, s) {
	t.some((e) => e.text.includes("\n")) ? xa(e, t, n, r, i, a, o, s) : ba(e, t, n, r, i, a, o, s);
}
function Ca(e, t, n, r, i, a) {
	let { alignV: o, cy: s, cellH: c, leftPad: l, paddingX: u, paddingY: d } = i, f = ca(e, t, i.cellW - l - u);
	if (f.length === 1) {
		let { baseline: t, textY: r } = ha(i);
		e.textBaseline = t, e.fillText(f[0], n, r);
		return;
	}
	let p = $(r.size, a, 1.2), m = f.length * p, h;
	h = o === "top" ? s + d : o === "center" ? s + (c - m) / 2 : s + c - m - d, e.textBaseline = "top";
	for (let t = 0; t < f.length; t++) e.fillText(f[t], n, h + t * p);
}
function wa(e, t, n, r, i, a, o = {}, s) {
	let { alignH: c, alignV: l, cx: u, cy: d, cellW: f, cellH: p, leftPad: m, paddingX: h, paddingY: g } = r, _ = pa(e, t, n, i, f - m - h, s);
	if (_.length === 1) {
		let { baseline: t, textY: n } = ha(r);
		va(e, _[0].segments, r, i, a, o, n, t, s);
		return;
	}
	let v = _.reduce((e, t) => e + $(t.maxFontSize, i, 1.2), 0), y;
	y = l === "top" ? d + g : l === "center" ? d + (p - v) / 2 : d + p - v - g;
	let b = t.map((e) => e.text).join("").split("\n").map((e) => Br(o.readingOrder, e));
	for (let t of _) {
		let n = t.segments.reduce((e, t) => e + t.width, 0), r;
		r = c === "right" ? u + f - h - n : c === "center" ? u + f / 2 - n / 2 : u + m;
		let { needBidi: l, baseRtl: d } = b[t.para];
		_a(e, t.segments, r, y, "top", i, a, {
			fontColor: o.fontColor,
			needBidi: l,
			baseRtl: d
		}, s), y += $(t.maxFontSize, i, 1.2);
	}
}
function Ta(e) {
	let t = "";
	for (; e > 0;) {
		let n = (e - 1) % 26;
		t = String.fromCharCode(65 + n) + t, e = Math.floor((e - 1) / 26);
	}
	return t;
}
var Ea = [
	"#FF0000",
	"#FFFF00",
	"#00B050"
], Da = [
	"#FF0000",
	"#FF6600",
	"#FFFF00",
	"#00B050"
], Oa = [
	"#FF0000",
	"#FF6600",
	"#FFFF00",
	"#92D050",
	"#00B050"
];
function ka(e, t, n, r, i, a) {
	if (t === "NoIcons") return;
	let o = t || "3TrafficLights1", s = parseInt(o[0]) || 3, c = s === 5 ? Oa : s === 4 ? Da : Ea, l = c[Math.max(0, Math.min(n, c.length - 1))];
	if (e.save(), e.fillStyle = l, o.includes("Arrow")) {
		let t = a / 2;
		e.beginPath(), n === s - 1 ? (e.moveTo(r + t, i), e.lineTo(r + a, i + a), e.lineTo(r, i + a)) : n === 0 ? (e.moveTo(r, i), e.lineTo(r + a, i), e.lineTo(r + t, i + a)) : (e.moveTo(r, i + a * .3), e.lineTo(r + a, i + t), e.lineTo(r, i + a * .7)), e.closePath(), e.fill();
	} else o.includes("Flag") ? (e.beginPath(), e.moveTo(r, i), e.lineTo(r + a, i), e.lineTo(r, i + a), e.closePath(), e.fill()) : (e.beginPath(), e.arc(r + a / 2, i + a / 2, a / 2, 0, Math.PI * 2), e.fill());
	e.restore();
}
function Aa(e, t, n, r, i) {
	let a = Math.max(6, Math.round(Math.min(r, i) * .45)), o = t + r - a - 1, s = n + i - a - 1;
	e.save(), e.fillStyle = "#D0D0D0", e.fillRect(o, s, a, a), e.fillStyle = "#444444";
	let c = a * .55, l = o + (a - c) / 2, u = s + (a - c * .5) / 2;
	e.beginPath(), e.moveTo(l, u), e.lineTo(l + c, u), e.lineTo(l + c / 2, u + c * .5), e.closePath(), e.fill(), e.restore();
}
function ja(e) {
	let t = /* @__PURE__ */ new Map(), n = La("worksheet-table-style-index", "expand-styled-table-coordinates");
	for (let r of e.tables ?? []) {
		if (!r.styleName) continue;
		let { top: e, bottom: i, left: a, right: o } = r.range;
		br(r.range, n);
		let s = r.accentColor || "#808080", c = !!r.isCustom, l = Math.max(0, r.headerRowCount ?? 1), u = Math.max(0, r.totalsRowCount ?? 0), d = e + l - 1, f = i - u + 1;
		for (let p = e; p <= i; p++) {
			let m = l > 0 && p <= d, h = u > 0 && p >= f, g = !m && !h ? p - d - 1 : -1, _ = r.showRowStripes && g >= 0 ? g % 2 == 1 ? r.band1HorizontalDxf : r.band2HorizontalDxf : void 0;
			for (let l = a; l <= o; l++) xr(t, `${p}:${l}`, {
				accent: s,
				isCustom: c,
				isHeader: m,
				isTotals: h,
				isBanded: r.showRowStripes && g >= 0 && g % 2 == 1,
				isFirstCol: r.showFirstColumn && l === a,
				isLastCol: r.showLastColumn && l === o,
				isTopEdge: p === e,
				isBottomEdge: p === i,
				wholeTableDxf: r.wholeTableDxf,
				headerRowDxf: r.headerRowDxf,
				totalRowDxf: r.totalRowDxf,
				firstColumnDxf: r.firstColumnDxf,
				lastColumnDxf: r.lastColumnDxf,
				stripeDxf: _
			}, n);
		}
	}
	return t;
}
function Ma(e, t, n, r) {
	let i = t?.border?.horizontal, a = t?.border?.top, o = t?.border?.bottom, s = t?.border?.left, c = t?.border?.right, l = n?.border?.bottom, u = n?.border?.top;
	if (i || a || o || s || c || l || u) {
		let t = {
			left: null,
			right: null,
			top: null,
			bottom: null
		};
		return e.isTopEdge ? t.top = a ?? null : i && (t.top = i), e.isHeader && l ? t.bottom = l : e.isBottomEdge ? t.bottom = o ?? null : i && (t.bottom = i), (e.isFirstCol || r === 0) && (t.left = s ?? null), e.isLastCol && (t.right = c ?? null), {
			kind: "dxf",
			border: t
		};
	}
	return e.isCustom ? { kind: "none" } : {
		kind: "accent",
		color: e.accent,
		lineWidth: e.isHeader ? 1.5 : 1,
		topEdge: e.isTopEdge
	};
}
function Na(e) {
	let t = /* @__PURE__ */ new Map(), n = La("worksheet-sparkline-index", "index-sparkline-coordinates");
	for (let r of e.sparklineGroups ?? []) {
		let e = Infinity, i = -Infinity;
		if (r.minAxisType === "group" || r.maxAxisType === "group") {
			for (let t of r.sparklines) for (let n of t.values) typeof n == "number" && (n < e && (e = n), n > i && (i = n));
			(!isFinite(e) || !isFinite(i)) && (e = 0, i = 1);
		}
		for (let a of r.sparklines) {
			let o = a.values.filter((e) => typeof e == "number"), s = o.length ? Math.min(...o) : 0, c = o.length ? Math.max(...o) : 1, l = r.minAxisType === "custom" && typeof r.manualMin == "number" ? r.manualMin : r.minAxisType === "group" ? e : s, u = r.maxAxisType === "custom" && typeof r.manualMax == "number" ? r.manualMax : r.maxAxisType === "group" ? i : c;
			xr(t, `${a.row}:${a.col}`, {
				kind: r.kind,
				values: a.values,
				min: l,
				max: u,
				displayEmptyCellsAs: r.displayEmptyCellsAs === "zero" || r.displayEmptyCellsAs === "span" ? r.displayEmptyCellsAs : "gap",
				displayXAxis: r.displayXAxis,
				lineWeight: r.lineWeight,
				markers: r.markers,
				high: r.high,
				low: r.low,
				first: r.first,
				last: r.last,
				negative: r.negative,
				colorSeries: r.colorSeries,
				colorNegative: r.colorNegative,
				colorAxis: r.colorAxis,
				colorMarkers: r.colorMarkers,
				colorFirst: r.colorFirst,
				colorLast: r.colorLast,
				colorHigh: r.colorHigh,
				colorLow: r.colorLow
			}, n);
		}
	}
	return t;
}
function Pa(e) {
	let t = e.replace("#", "");
	if (t.length < 6) return "#F2F2F2";
	let n = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), i = parseInt(t.slice(4, 6), 16), a = (e) => Math.round(e * .2 + 255 * .8), o = (e) => e.toString(16).padStart(2, "0").toUpperCase();
	return `#${o(a(n))}${o(a(r))}${o(a(i))}`;
}
function Fa(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g) {
	if (m <= 0 || h <= 0) return;
	let { styles: v, cellMap: y, mergeAnchorMap: b, mergeSkipSet: x, cfContext: S, cs: C, dpr: w } = t, T = i.length, D = a.length, O = new Set(s), k = new Set(o), j = (e, n) => t.rtl ? Ni(e, n, t.canvasW) : e, M = [], N = -c;
	for (let e = 0; e < T; e++) M.push(N), N += i[e];
	let P = [], F = -l;
	for (let e = 0; e < D; e++) P.push(F), F += a[e];
	e.save(), e.beginPath(), e.rect(j(f, m), p, m, h), e.clip();
	let ee = [], te = [], I = [];
	for (let i of t.worksheet.mergeCells ?? []) {
		let a = i.top, f = i.left;
		if (O.has(a) && k.has(f) || !s.some((e) => e >= i.top && e <= i.bottom) || !o.some((e) => e >= i.left && e <= i.right)) continue;
		let p = t.mergeAnchorMap.get(`${a}:${f}`);
		if (!p) continue;
		let m = u - c + t.colAxis.offsetOf(f) - t.colAxis.offsetOf(r), h = d - l + t.rowAxis.offsetOf(a) - t.rowAxis.offsetOf(n), _ = p.totalW, y = p.totalH;
		m = j(m, _);
		let b = `${a}:${f}`, x = t.cellMap.get(b), { font: T, fill: E, border: D, xf: A } = aa(v, sa(t.worksheet, x, f)), M = Lr(x, a, f, S, v.dxfs ?? []);
		if (Gi(e, M.fill ?? E, m, h, _, y), M.dataBar && M.dataBar.ratio > 0) {
			let t = Math.max(0, (_ - 4) * M.dataBar.ratio);
			Bi(e, M.dataBar.color, m + 2, h + 2, t, y - 4, M.dataBar.gradient);
		}
		let N = vo(_o(D, a, f, p.right, p.bottom, t.cellMap, v), M.border);
		if (te.push(() => bo(e, N, m, h, _, y, w)), !x) continue;
		let P = Bn(x, v, M.numFmt, t.worksheet.date1904), F = P.text;
		if (!F || F === "0" && t.worksheet.showZeros === !1) continue;
		let ee = T.bold || !!M.fontBold, I = T.italic || !!M.fontItalic, L = T.underline || !!M.fontUnderline, ne = T.strike || !!M.fontStrike, R = ee !== T.bold || I !== T.italic || L !== T.underline || ne !== T.strike ? {
			...T,
			bold: ee,
			italic: I,
			underline: L,
			strike: ne
		} : T;
		e.font = ea(e, R, C, g, F);
		let z = t.hyperlinkMap.get(b) ? "#0563C1" : M.fontColor ?? P.color ?? T.color;
		e.fillStyle = z ? J(z) : "#000000";
		let B = x.value.type === "number", re = A.alignH ?? (B ? "right" : "left"), ie = A.alignV ?? "bottom", V = A.indent ? Math.round(A.indent * 3 * t.mdw) : 0, H = 3 + (re === "left" || !A.alignH ? V : 0);
		e.save(), e.beginPath(), e.rect(m, h, _, y), e.clip();
		let ae;
		re === "right" ? (ae = m + _ - 3, e.textAlign = "right") : re === "center" ? (ae = m + _ / 2, e.textAlign = "center") : (ae = m + H, e.textAlign = "left");
		let U = x.value.type === "text" ? x.value.runs : void 0, oe = U && U.length > 0;
		if (A.wrapText && oe) wa(e, U, R, {
			alignH: re,
			alignV: ie,
			cx: m,
			cy: h,
			cellW: _,
			cellH: y,
			leftPad: H,
			paddingX: 3,
			paddingY: 2
		}, C, w, {
			fontColor: M.fontColor,
			readingOrder: A.readingOrder
		}, g);
		else if (A.wrapText) Ca(e, F, ae, R, {
			alignH: re,
			alignV: ie,
			cx: m,
			cy: h,
			cellW: _,
			cellH: y,
			leftPad: H,
			paddingX: 3,
			paddingY: 2
		}, C);
		else if (oe) Sa(e, U, R, {
			alignH: re,
			alignV: ie,
			cx: m,
			cy: h,
			cellW: _,
			cellH: y,
			leftPad: H,
			paddingX: 3,
			paddingY: 2
		}, C, w, {
			fontColor: M.fontColor,
			readingOrder: A.readingOrder
		}, g);
		else {
			let { baseline: t, textY: n } = ha({
				alignH: re,
				alignV: ie,
				cx: m,
				cy: h,
				cellW: _,
				cellH: y,
				leftPad: H,
				paddingX: 3,
				paddingY: 2
			});
			e.textBaseline = t, e.fillText(F, ae, n);
		}
		e.restore();
	}
	for (let n = 0; n < D; n++) {
		let r = s[n], c = d + P[n], l = a[n];
		if ((c + l <= p || c >= p + h) && !o.some((e) => {
			let t = b.get(`${r}:${e}`);
			return t != null && c + t.totalH > p && c < p + h;
		})) continue;
		let D = /* @__PURE__ */ new Set(), O = /* @__PURE__ */ new Set(), k = -1, N = (e) => {
			if (k >= 0 && e - k >= 2) {
				for (let t = k; t < e - 1; t++) D.add(t);
				for (let t = k + 1; t < e; t++) O.add(t);
			}
			k = -1;
		};
		for (let e = 0; e <= T; e++) {
			let n = !1, i = !1;
			if (e < T) {
				let a = `${r}:${o[e]}`;
				if (!x.has(a) && !b.has(a)) {
					let r = y.get(a);
					n = aa(v, sa(t.worksheet, r, o[e])).xf.alignH === "centerContinuous", i = !!(r && r.value && r.value.type !== "empty");
				}
			}
			n ? i && k >= 0 && e > k ? (N(e), k = e) : k < 0 && (k = e) : N(e);
		}
		for (let a = 0; a < T; a++) {
			let s = o[a], d = u + M[a], k = i[a], N = `${r}:${s}`;
			if (x.has(N)) continue;
			let P = b.get(N), F = P ? P.totalW : k, L = P ? P.totalH : l, ne = d + F <= f || d >= f + m;
			if (c + L <= p || c >= p + h || ne && !t.overflowTextAnchors.has(N)) continue;
			let R = j(d, F), z = y.get(N), { font: B, fill: re, border: ie, xf: V } = aa(v, sa(t.worksheet, z, s)), H = Lr(z, r, s, S, v.dxfs ?? []), ae = H.fill ?? re, U = t.tableStyleMap.get(N), oe = v.dxfs ?? [], se = (e) => e == null ? void 0 : oe[e], ce = se(U?.wholeTableDxf), le = se(U?.headerRowDxf), ue = se(U?.totalRowDxf), de = se(U?.firstColumnDxf), fe = se(U?.lastColumnDxf), pe = se(U?.stripeDxf), me = U?.isHeader && le?.fill?.fgColor ? le : U?.isTotals && ue?.fill?.fgColor ? ue : U?.isLastCol && fe?.fill?.fgColor ? fe : U?.isFirstCol && de?.fill?.fgColor ? de : pe?.fill?.fgColor ? pe : !U?.isHeader && !U?.isTotals && ce?.fill?.fgColor ? ce : void 0, he = Gi(e, ae, R, c, F, L);
			if (he || (U && me?.fill?.fgColor ? (e.fillStyle = J(me.fill.fgColor), e.fillRect(R, c, F, L), he = !0) : U && !U.isCustom && U.isBanded && (e.fillStyle = Pa(U.accent), e.fillRect(R, c, F, L), he = !0)), t.commentCells.has(N) && Ji(e, R, c, F, L), H.dataBar && H.dataBar.ratio > 0) {
				let t = Math.max(0, (F - 4) * H.dataBar.ratio);
				Bi(e, H.dataBar.color, R + 2, c + 2, t, L - 4, H.dataBar.gradient);
			}
			let W = t.sparklineMap.get(N);
			if (W && Nt(e, {
				x: R,
				y: c,
				w: F,
				h: L
			}, W), t.worksheet.isChartSheet !== !0 && t.worksheet.showGridlines !== !1 && !he) {
				if (e.strokeStyle = "#d0d0d0", e.lineWidth = .5, e.beginPath(), !D.has(a)) {
					let t = R + F + _(R + F, .5, w);
					e.moveTo(t, c), e.lineTo(t, c + L);
				}
				let t = c + L + _(c + L, .5, w);
				if (e.moveTo(R, t), e.lineTo(R + F, t), n === 0) {
					let t = c + _(c, .5, w);
					e.moveTo(R, t), e.lineTo(R + F, t);
				}
				if (a === 0) {
					let t = R + _(R, .5, w);
					e.moveTo(t, c), e.lineTo(t, c + L);
				}
				e.stroke();
			}
			let G = vo(P ? _o(ie, r, s, P.right, P.bottom, y, v) : ie, H.border);
			(D.has(a) || O.has(a)) && (G = {
				...G,
				left: O.has(a) ? null : G.left,
				right: D.has(a) ? null : G.right
			});
			let K = y.get(`${r - 1}:${s}`), ge = K ? aa(v, sa(t.worksheet, K, s)).border.bottom : null;
			if (ge?.style && (n === 0 || G.top?.style) && (G = {
				...G,
				top: wo(G.top, ge)
			}), !O.has(a)) {
				let e = y.get(`${r}:${s - 1}`), n = e ? aa(v, sa(t.worksheet, e, s - 1)).border.right : null;
				n?.style && (a === 0 || G.left?.style) && (G = {
					...G,
					left: wo(G.left, n)
				});
			}
			let _e = U ? Ma(U, ce, le, s) : null, ve = t.autoFilterCells.has(N), ye = () => {
				if (_e) {
					if (_e.kind === "dxf") bo(e, _e.border, R, c, F, L, w);
					else if (_e.kind === "accent") {
						let t = .5 / w;
						if (e.strokeStyle = _e.color, e.lineWidth = _e.lineWidth, e.beginPath(), e.moveTo(R, c + L - t), e.lineTo(R + F, c + L - t), _e.topEdge) {
							let t = c + _(c, _e.lineWidth, w);
							e.moveTo(R, t), e.lineTo(R + F, t);
						}
						e.stroke();
					}
				}
				ve && Aa(e, R, c, k, L);
			};
			if (P) {
				let t = G;
				te.push(() => bo(e, t, R, c, F, L, w)), ye();
			} else {
				let t = G;
				I.push(() => {
					bo(e, t, R, c, F, L, w), ye();
				});
			}
			if (!z) continue;
			let be = Bn(z, v, H.numFmt, t.worksheet.date1904), q = be.text;
			!q || q === "0" && t.worksheet.showZeros === !1 || ee.push(() => {
				let n = U?.isHeader ? le : U?.isTotals ? ue : U?.isLastCol && fe ? fe : U?.isFirstCol && de ? de : pe || (U ? ce : void 0), l = U ? U.isCustom ? !!n?.font?.bold : U.isHeader || U.isTotals : !1, u = B.bold || !!H.fontBold || l, d = B.italic || !!H.fontItalic, f = B.underline || !!H.fontUnderline, p = B.strike || !!H.fontStrike, m = u !== B.bold || d !== B.italic || f !== B.underline || p !== B.strike ? {
					...B,
					bold: u,
					italic: d,
					underline: f,
					strike: p
				} : B;
				e.font = ea(e, m, C, g, q);
				let h = t.hyperlinkMap.get(N), S = n?.font?.color ?? null, D = h ? "#0563C1" : H.fontColor ?? be.color ?? S ?? B.color;
				e.fillStyle = D ? J(D) : "#000000";
				let O = z.value.type === "number", k = V.alignH ?? (O ? "right" : "left"), j = V.alignV ?? "bottom", M = V.indent ? Math.round(V.indent * 3 * t.mdw) : 0, ee = H.iconSet ? Math.max(8, Math.round(Math.min(F, L) * .55)) : 0, te = ee > 0 ? ee + 4 : 0, I = 3 + (k === "left" || !V.alignH ? M : 0) + te, ne = F, re = a;
				if (k === "centerContinuous" && !P) for (let e = a + 1; e < T; e++) {
					let n = `${r}:${o[e]}`;
					if (x.has(n) || b.has(n)) break;
					let a = y.get(n);
					if (a && a.value.type !== "empty" || aa(v, sa(t.worksheet, a, o[e])).xf.alignH !== "centerContinuous") break;
					ne += i[e], re = e;
				}
				let ie = t.rtl ? R - (ne - F) : R, ae = k === "centerContinuous" ? ie : R, oe = k === "centerContinuous" ? ne : F, se = q.includes("\n");
				if (!P && !V.wrapText && !V.textRotation && !O && !se) {
					let n = e.measureText(q).width, s = k === "centerContinuous", c = s ? n + 6 : n + I + 3, l = s ? ne : F;
					if (c > l) {
						let e = c - l, n = 0, u = 0;
						k === "right" ? u = e : k === "center" || s ? (u = e / 2, n = e / 2) : n = e;
						let d = t.rtl ? -1 : 1, f = t.rtl ? a - 1 : re + 1, p = t.rtl ? 1 : -1, m = t.rtl ? re + 1 : a - 1;
						if (n > 0) {
							let e = n;
							for (let t = f; t >= 0 && t < T && e > 0; t += d) {
								let n = `${r}:${o[t]}`;
								if (x.has(n) || b.has(n)) break;
								let a = y.get(n);
								if (a && a.value.type !== "empty") break;
								oe += i[t], e -= i[t];
							}
						}
						if (u > 0) {
							let e = u;
							for (let t = m; t >= 0 && t < T && e > 0; t += p) {
								let n = `${r}:${o[t]}`;
								if (x.has(n) || b.has(n)) break;
								let a = y.get(n);
								if (a && a.value.type !== "empty") break;
								ae -= i[t], oe += i[t], e -= i[t];
							}
						}
					}
				}
				let me = q, he = 0;
				if (k === "fill" && !O && q.length > 0) {
					let t = Math.max(1, F - 6), n = e.measureText(q).width;
					if (n > 0 && n < t) {
						let e = Math.max(1, Math.floor(t / n));
						me = q.repeat(e);
					}
				}
				if (k === "distributed" || k === "justify" && !V.wrapText && !se) {
					let t = Math.max(1, F - 6), n = e.measureText(me).width, r = Math.max(1, [...me].length - 1);
					n < t && (he = Math.max(0, (t - n) / r));
				}
				let W, G;
				k === "right" ? (W = R + F - 3, G = "right") : k === "center" ? (W = R + F / 2, G = "center") : k === "centerContinuous" ? (W = ie + ne / 2, G = "center") : k === "distributed" || k === "justify" && !V.wrapText && !se ? (W = R + 3, G = "left") : (W = R + I, G = "left");
				let K = V.textRotation ?? 0, ge = K === 255, _e = K > 0 && K !== 255;
				if (H.iconSet && ee > 0 && (e.save(), e.beginPath(), e.rect(R, c, F, L), e.clip(), ka(e, H.iconSet.name, H.iconSet.index, R + 2, c + (L - ee) / 2, ee), e.restore()), e.save(), e.beginPath(), e.rect(ae, c, oe, L), e.clip(), ge) {
					let t = $(B.size, C, 1.1), n = [...q].length * t, r = j === "top" ? c + 2 : j === "center" ? c + (L - n) / 2 : c + L - n - 2;
					e.textAlign = "center", e.textBaseline = "top";
					for (let n of q) {
						let i = n.codePointAt(0) ?? 0, a = A(i) && E(e, i);
						Qr(e, n, R + F / 2, r, t, a), r += t;
					}
					e.restore();
					return;
				}
				if (_e) {
					let t = K <= 90 ? -(K * Math.PI / 180) : (K - 90) * Math.PI / 180;
					e.translate(R + F / 2, c + L / 2), e.rotate(t), e.textAlign = "center", e.textBaseline = "middle", e.fillText(q, 0, 0), e.restore();
					return;
				}
				if (V.shrinkToFit) {
					let t = e.measureText(q).width, n = F - I - 3;
					if (t > n && t > 0) {
						let r = n / t, i = k === "right" ? R + F - 3 : k === "center" ? R + F / 2 : R + I;
						e.transform(r, 0, 0, 1, i * (1 - r), 0);
					}
				}
				if (e.textAlign = G, he > 0) try {
					e.letterSpacing = `${he}px`;
				} catch {}
				try {
					e.direction = Rr(V.readingOrder, q) ? "rtl" : "ltr";
				} catch {}
				let ve = z.value.type === "text" ? z.value.runs : void 0, ye = ve && ve.length > 0;
				if (V.wrapText && ye) wa(e, ve, m, {
					alignH: k,
					alignV: j,
					cx: R,
					cy: c,
					cellW: F,
					cellH: L,
					leftPad: I,
					paddingX: 3,
					paddingY: 2
				}, C, w, {
					fontColor: H.fontColor,
					readingOrder: V.readingOrder
				}, g);
				else if (V.wrapText) Ca(e, q, W, m, {
					alignH: k,
					alignV: j,
					cx: R,
					cy: c,
					cellW: F,
					cellH: L,
					leftPad: I,
					paddingX: 3,
					paddingY: 2
				}, C);
				else if (ye) Sa(e, ve, m, {
					alignH: k,
					alignV: j,
					cx: R,
					cy: c,
					cellW: F,
					cellH: L,
					leftPad: I,
					paddingX: 3,
					paddingY: 2
				}, C, w, {
					fontColor: H.fontColor,
					readingOrder: V.readingOrder
				}, g);
				else {
					let t = m.vertAlign, n = $(B.size, C), r = 0;
					t === "superscript" ? r = -Math.round(n * .35) : t === "subscript" && (r = Math.round(n * .1));
					let i = t ? {
						...m,
						size: m.size * .65
					} : m;
					t && (e.font = ea(e, i, C, g, q));
					let a = null, o = () => a ??= e.measureText(q), s = () => {
						let e = Math.min(o().width, oe - I - 3);
						return {
							x: k === "right" ? R + F - 3 - e : k === "center" ? R + F / 2 - e / 2 : R + I,
							width: e
						};
					}, l = $(i.size, C);
					if (m.underline || h) {
						let { x: t, width: n } = s(), i = (j === "top" ? c + 2 + l + 1 : j === "center" ? c + L / 2 + Math.round(l * .55) : c + L - 2 + 1) + r, a = h ? "#0563C1" : D ? J(D) : "#000000", o = m.underlineStyle === "double" || m.underlineStyle === "doubleAccounting";
						ra(e, t, t + n, i, a, o, w);
					}
					if (m.strike) {
						let { x: t, width: n } = s(), i = (j === "top" ? c + 2 + Math.round(l * .5) : j === "center" ? c + L / 2 : c + L - 2 - Math.round(l * .35)) + r, a = i + _(i, .5, w);
						e.save(), e.strokeStyle = D ? J(D) : "#000000", e.lineWidth = .5, e.beginPath(), e.moveTo(t, a), e.lineTo(t + n, a), e.stroke(), e.restore();
					}
					if (q.includes("\n")) {
						let t = q.split("\n"), n = $(B.size, C, 1.2), i = t.length * n, a;
						j === "top" ? (a = c + 2, e.textBaseline = "top") : j === "center" ? (a = c + (L - i) / 2, e.textBaseline = "top") : (a = c + L - i - 2, e.textBaseline = "top");
						for (let i = 0; i < t.length; i++) e.fillText(t[i], W, a + i * n + r);
					} else {
						let { baseline: t, textY: n } = ha({
							alignH: k,
							alignV: j,
							cx: R,
							cy: c,
							cellW: F,
							cellH: L,
							leftPad: I,
							paddingX: 3,
							paddingY: 2
						});
						e.textBaseline = t, e.fillText(me, W, n + r);
					}
				}
				let xe = z.value.type === "text" ? z.value.phoneticRuns : void 0;
				if (z.showPhonetic && xe && xe.length > 0 && !q.includes("\n")) {
					let t = ea(e, m, C, g, q), n = na(e, q, t), r;
					r = k === "right" ? R + F - 3 - n : k === "center" ? R + F / 2 - n / 2 : R + I;
					let i = D ? J(D) : "#000000";
					ta(e, xe, z.value.type === "text" ? z.value.phoneticPr : void 0, q, t, v, r, c, C, i, g);
				}
				e.restore(), q && t.onTextRun && t.onTextRun({
					sheetName: t.worksheet.name,
					cellRef: Zr(r, s),
					text: q,
					x: R,
					y: c,
					width: F,
					height: L,
					row: r,
					col: s
				});
			});
		}
	}
	for (let e of I) e();
	for (let e of te) e();
	for (let e of ee) e();
	e.restore();
}
var Ia = /* @__PURE__ */ new WeakMap();
function La(e, t) {
	return {
		resource: e,
		operation: t
	};
}
function Ra(e) {
	let t = Ia.get(e);
	if (t) return t;
	let n = La("worksheet-cell-index", "index-worksheet-cells"), r = Sr(e.rows, n), i = /* @__PURE__ */ new Map();
	for (let t of e.rows) {
		let e = t.cells.filter((e) => e.value.type !== "empty").map((e) => e.col).sort((e, t) => e - t);
		e.length > 0 && i.set(t.index, e);
	}
	let a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), s = La("worksheet-merge-anchor-index", "index-merge-anchor-coordinates"), c = La("worksheet-merge-skip-index", "expand-merged-cell-coordinates");
	for (let t of e.mergeCells ?? []) {
		Cr(o, `${t.top}:${t.left}`, s), br(t, c, 1);
		for (let e = t.top; e <= t.bottom; e++) for (let n = t.left; n <= t.right; n++) e === t.top && n === t.left || Cr(a, `${e}:${n}`, c);
	}
	let l = /* @__PURE__ */ new Set();
	if (e.autoFilter) {
		let t = e.autoFilter, n = La("worksheet-auto-filter-index", "expand-auto-filter-coordinates");
		br({
			top: t.top,
			bottom: t.top,
			left: t.left,
			right: t.right
		}, n);
		for (let e = t.left; e <= t.right; e++) Cr(l, `${t.top}:${e}`, n);
	}
	let u = /* @__PURE__ */ new Map(), d = La("worksheet-hyperlink-index", "index-hyperlink-coordinates");
	for (let t of e.hyperlinks ?? []) t.url && xr(u, `${t.row}:${t.col}`, t.url, d);
	let f = /* @__PURE__ */ new Set(), p = La("worksheet-comment-index", "index-comment-coordinates");
	for (let t of e.commentRefs ?? []) {
		let e = qi(t);
		e && Cr(f, `${e.row}:${e.col}`, p);
	}
	let m = {
		cellMap: r,
		nonEmptyColsByRow: i,
		cfContext: kr(e, r),
		mergeAnchorSet: o,
		mergeSkipSet: a,
		autoFilterCells: l,
		hyperlinkMap: u,
		commentCells: f,
		tableStyleMap: ja(e),
		sparklineMap: Na(e)
	};
	return Ia.set(e, m), m;
}
var za = /* @__PURE__ */ new WeakMap();
function Ba(e, t, n, r) {
	let i = r.dxfs ?? [], a = n ? n.isHeader ? i[n.headerRowDxf ?? -1] : n.isTotals ? i[n.totalRowDxf ?? -1] : n.isLastCol && n.lastColumnDxf != null ? i[n.lastColumnDxf] : n.isFirstCol && n.firstColumnDxf != null ? i[n.firstColumnDxf] : n.stripeDxf == null ? i[n.wholeTableDxf ?? -1] : i[n.stripeDxf] : void 0, o = n ? n.isCustom ? !!a?.font?.bold : n.isHeader || n.isTotals : !1, s = e.bold || !!t.fontBold || o, c = e.italic || !!t.fontItalic;
	return s === e.bold && c === e.italic ? e : {
		...e,
		bold: s,
		italic: c
	};
}
function Va(e, t, n) {
	let r = [[]];
	for (let t of e) {
		let e = t.text.split("\n");
		for (let n = 0; n < e.length; n++) n > 0 && r.push([]), e[n] !== "" && r[r.length - 1].push({
			...t,
			text: e[n]
		});
	}
	let i = t.size;
	return r.map((e) => {
		if (e.length === 0) return {
			runs: e,
			heightPx: $(i || Mi, n, 1.2)
		};
		let r = 0;
		for (let n of e) {
			let e = ia(t, n);
			e.size > r && (r = e.size), i = e.size;
		}
		return {
			runs: e,
			heightPx: $(r, n, 1.2)
		};
	});
}
function Ha(e, t, n, r, i, a, o, s, c, l) {
	let u = i.alignH ?? (t.value.type === "number" ? "right" : "left"), d = i.indent ? Math.round(i.indent * 3 * o) : 0, f = s ? Math.max(8, Math.round(Math.min(a, c) * .55)) : 0, p = f > 0 ? f + 4 : 0, m = 3 + (u === "left" || !i.alignH ? d : 0) + p, h = Math.max(1, a - m - 3), g = t.value.type === "text" ? t.value.runs : void 0, _ = !!g?.length, v = i.textRotation ?? 0;
	if (e.font = ea(e, r, 1, l, n), v === 255) return [...n].length * $(r.size, 1, 1.1) + 4;
	if (v > 0) {
		let t = v <= 90 ? v * Math.PI / 180 : (v - 90) * Math.PI / 180, i = $(r.size, 1, 1.2), a = e.measureText(n.replace(/\n/g, " ")).width;
		return Math.abs(Math.sin(t)) * a + Math.abs(Math.cos(t)) * i + 4;
	}
	let y;
	if (i.wrapText && _) y = pa(e, g, r, 1, h, l).map((e) => $(e.maxFontSize, 1, 1.2));
	else if (i.wrapText) {
		e.font = ea(e, r, 1, l, n);
		let t = $(r.size, 1, 1.2);
		y = ca(e, n, h).map(() => t);
	} else if (_) y = Va(g, r, 1).map((e) => e.heightPx);
	else {
		let e = Math.max(1, n.split("\n").length), t = $(r.size, 1, 1.2);
		y = Array.from({ length: e }, () => t);
	}
	return y.reduce((e, t) => e + t, 0) + (y.length > 1 ? 4 : 2);
}
function Ua(e, t, n, r) {
	if (n.wrapText || (n.textRotation ?? 0) > 0) return !0;
	if (e.value.type === "text") {
		if (e.value.text.includes("\n")) return !0;
		for (let n of e.value.runs ?? []) if ($(ia(t, n).size, 1, 1.2) > r) return !0;
	}
	return $(t.size, 1, 1.2) > r;
}
function Wa(e, t, n, r) {
	if (za.has(t) || t.isChartSheet) return !1;
	if (t.defaultRowHeightCustom === !0) return za.set(t, { derived: /* @__PURE__ */ new Map() }), !1;
	let i = Q(t), a = Gr(t.defaultRowHeight), o = $(t.defaultFontSize ?? Mi, 1, 1.2), { cfContext: s, mergeAnchorSet: c, mergeSkipSet: l, tableStyleMap: u } = Ra(t), d = /* @__PURE__ */ new Map(), f = !1;
	e.save();
	try {
		for (let p of t.rows) {
			if (p.hidden || p.customHeight === !0 || p.height !== null || Object.hasOwn(t.rowHeights, p.index)) continue;
			let m = a, h = [];
			for (let a of p.cells) {
				let d = `${p.index}:${a.col}`;
				if (a.value.type === "empty" || c.has(d) || l.has(d)) continue;
				let { font: f, xf: g } = aa(n, a.styleIndex ?? 0);
				if (!Ua(a, f, g, o)) continue;
				let _ = Lr(a, p.index, a.col, s, n.dxfs ?? []), v = Ba(f, _, u.get(d), n), y = Bn(a, n, _.numFmt, t.date1904).text;
				if (!y || y === "0" && t.showZeros === !1) continue;
				let b = i.col.sizeOf(a.col);
				m = Math.max(m, Ha(e, a, y, v, g, b, i.maximumDigitWidth, _.iconSet, Math.ceil(m), r)), _.iconSet && h.push({
					cell: a,
					text: y,
					font: v,
					xf: g,
					cellWidthPx: b,
					iconSet: _.iconSet
				});
			}
			let g = h.length === 0;
			for (let t = 0; !g && t < 32; t++) {
				let t = Math.ceil(m), n = m;
				for (let a of h) n = Math.max(n, Ha(e, a.cell, a.text, a.font, a.xf, a.cellWidthPx, i.maximumDigitWidth, a.iconSet, t, r));
				m = n, g = Math.ceil(m) === t;
			}
			if (!g) for (let t of h) m = Math.max(m, Ha(e, t.cell, t.text, t.font, t.xf, t.cellWidthPx, i.maximumDigitWidth, t.iconSet, t.cellWidthPx, r));
			let _ = Math.ceil(m);
			if (_ > a) {
				let e = Kr(_);
				t.rowHeights[p.index] = e, d.set(p.index, e), f = !0;
			}
		}
	} finally {
		e.restore();
	}
	return za.set(t, { derived: d }), f && Yr.invalidate(t), f;
}
function Ga(e) {
	return za.has(e);
}
function Ka(e) {
	return za.get(e)?.derived ?? /* @__PURE__ */ new Map();
}
function qa(e, t = []) {
	let n = za.get(e);
	if (!n) return;
	let r = new Set(t), i = !1;
	for (let [t, a] of n.derived) r.has(t) || e.rowHeights[t] === a && (delete e.rowHeights[t], i = !0);
	za.delete(e), i && Yr.invalidate(e);
}
function Ja(e, t) {
	let n = 0, r = e.length;
	for (; n < r;) {
		let i = n + r >> 1;
		e[i] < t ? n = i + 1 : r = i;
	}
	return n > 0 ? e[n - 1] : void 0;
}
function Ya(e, t) {
	let n = 0, r = e.length;
	for (; n < r;) {
		let i = n + r >> 1;
		e[i] <= t ? n = i + 1 : r = i;
	}
	return n < e.length ? e[n] : void 0;
}
function Xa(e, t, n, r) {
	return (e.mergeCells ?? []).some((e) => t >= e.top && t <= e.bottom && e.right >= n && e.left <= r);
}
function Za(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _) {
	let v = d, y = f, b = /* @__PURE__ */ new Set(), x = (i, u, d, f) => {
		let p = `${i}:${u}`, v = r.get(p);
		if (!v || v.value.type === "empty" || s.has(p)) return !1;
		let { font: y, xf: b } = aa(n, v.styleIndex ?? 0), x = Lr(v, i, u, a, n.dxfs ?? []), S = Bn(v, n, x.numFmt, t.date1904).text;
		if (!S || S === "0" && t.showZeros === !1 || v.value.type === "number" || b.wrapText || b.textRotation || S.includes("\n")) return !1;
		let C = o.get(p), w = C?.isHeader ? C.headerRowDxf : C?.isTotals ? C.totalRowDxf : C?.isLastCol && C.lastColumnDxf != null ? C.lastColumnDxf : C?.isFirstCol && C.firstColumnDxf != null ? C.firstColumnDxf : C?.stripeDxf ?? C?.wholeTableDxf, T = w == null ? void 0 : n.dxfs?.[w], E = !!C && !C.isCustom && (C.isHeader || C.isTotals), D = y.bold || !!x.fontBold || E || !!T?.font?.bold, O = y.italic || !!x.fontItalic;
		e.font = ea(e, D !== y.bold || O !== y.italic ? {
			...y,
			bold: D,
			italic: O
		} : y, m, _, S);
		let k = b.alignH ?? "left", A = b.indent ? Math.round(b.indent * 3 * h) : 0, j = c.sizeOf(u), M = l.sizeOf(i), N = x.iconSet ? Math.max(8, Math.round(Math.min(j, M) * .55)) : 0, P = N > 0 ? N + 4 : 0, F = 3 + (k === "left" || !b.alignH ? A : 0) + P, ee = e.measureText(S).width + F + 3, te = Math.max(0, ee - j);
		return te <= 0 ? !1 : (k === "center" || k === "centerContinuous" ? te / 2 : ((g ? d === "higher" ? "left" : "right" : d === "higher" ? "right" : "left") == "left" ? k === "right" : k !== "right") ? te : 0) > f;
	};
	for (let e of u) {
		let n = i.get(e);
		if (!n) continue;
		let a = Ja(n, d), o = r.get(`${e}:${d}`);
		a != null && a >= p && (!o || o.value.type === "empty") && !Xa(t, e, a + 1, d) && x(e, a, "higher", c.offsetOf(d) - c.offsetOf(a + 1)) && (v = Math.min(v, a), b.add(`${e}:${a}`));
		let s = Ya(n, f), l = r.get(`${e}:${f}`);
		s != null && s <= 16384 && (!l || l.value.type === "empty") && !Xa(t, e, f, s - 1) && x(e, s, "lower", c.offsetOf(s) - c.offsetOf(f + 1)) && (y = Math.max(y, s), b.add(`${e}:${s}`));
	}
	return {
		startCol: v,
		endCol: y,
		anchorKeys: b
	};
}
function Qa(e, t) {
	Ia.set(t, Ra(e));
}
function $a(e, t, n, r, i = {}, a) {
	wi(e, t, i.officeFontRoutes, i.googleSubstitutes === !0), Oi(t, i.authoritativeMdw);
	let o = i.dpr ?? 1, s = i.cellScale ?? 1, c = t.isChartSheet === !0, l = Q(t), u = l.maximumDigitWidth, d = e.canvas.width / o, f = e.canvas.height / o;
	e.clearRect(0, 0, d, f), e.fillStyle = "#ffffff", e.fillRect(0, 0, d, f);
	let p = (e) => Math.round(e * s), m = c ? 0 : p(50), h = c ? 0 : p(22), { row: g, col: v, rows: y, cols: b } = r, x = (i.scrollOffsetX ?? 0) * s, S = (i.scrollOffsetY ?? 0) * s, { col: C, row: w } = l.axesAtScale(s), T = C.bandsToCover(1, c ? 0 : i.freezeCols ?? 0, Math.max(0, d - m)), E = w.bandsToCover(1, c ? 0 : i.freezeRows ?? 0, Math.max(0, f - h)), D = E.at(-1)?.index ?? 0, O = T.at(-1)?.index ?? 0, k = T.map(({ index: e }) => e), A = E.map(({ index: e }) => e), j = T.map(({ size: e }) => e), M = E.map(({ size: e }) => e), N = j.reduce((e, t) => e + t, 0), P = M.reduce((e, t) => e + t, 0), F = C.bandsToCover(v, Math.min(16384, v + b - 1)), ee = w.bandsToCover(g, Math.min(1048576, g + y - 1)), te = F.map(({ index: e }) => e), I = ee.map(({ index: e }) => e), L = F.map(({ size: e }) => e), ne = ee.map(({ size: e }) => e), { cellMap: R, cfContext: z, mergeSkipSet: B, autoFilterCells: re, hyperlinkMap: ie, commentCells: V, tableStyleMap: H, sparklineMap: ae, nonEmptyColsByRow: U } = Ra(t), oe = /* @__PURE__ */ new Map(), se = La("worksheet-merge-anchor-index", "index-merge-anchor-coordinates");
	for (let e of t.mergeCells ?? []) {
		let t = C.offsetOf(e.right + 1) - C.offsetOf(e.left), n = w.offsetOf(e.bottom + 1) - w.offsetOf(e.top);
		xr(oe, `${e.top}:${e.left}`, {
			totalW: t,
			totalH: n,
			right: e.right,
			bottom: e.bottom
		}, se);
	}
	let ce = te[0] ?? v, le = te.at(-1) ?? Math.min(16384, v + b - 1), ue = Za(e, t, n, R, U, z, H, oe, C, w, [...new Set([...A, ...I])], ce, le, O + 1, s, u, t.rightToLeft === !0, a), de = C.bandsToCover(ue.startCol, ue.endCol), fe = de.map(({ index: e }) => e), pe = de.map(({ size: e }) => e), me = x + C.offsetOf(ce) - C.offsetOf(ue.startCol), he = {
		worksheet: t,
		styles: n,
		cellMap: R,
		mergeAnchorMap: oe,
		mergeSkipSet: B,
		cfContext: z,
		colWidths: pe,
		rowHeights: ne,
		colAxis: C,
		rowAxis: w,
		frozenColWidths: j,
		frozenRowHeights: M,
		frozenW: N,
		frozenH: P,
		startRow: g,
		startCol: v,
		cs: s,
		dpr: o,
		autoFilterCells: re,
		hyperlinkMap: ie,
		commentCells: V,
		tableStyleMap: H,
		sparklineMap: ae,
		overflowTextAnchors: ue.anchorKeys,
		mdw: u,
		onTextRun: i.onTextRun,
		rtl: t.rightToLeft === !0,
		canvasW: d,
		threeD: i.threeD
	}, W = m, G = h, K = W + N, ge = G + P, _e = Math.max(0, d - K), ve = Math.max(0, f - ge);
	D > 0 && O > 0 && Fa(e, he, 1, 1, j, M, k, A, 0, 0, W, G, W, G, N, P, a), D > 0 && Fa(e, he, 1, ue.startCol, pe, M, fe, A, me, 0, K, G, K, G, _e, P, a), O > 0 && Fa(e, he, g, 1, j, ne, k, I, 0, S, W, ge, W, ge, N, ve, a), c || Fa(e, he, g, ue.startCol, pe, ne, fe, I, me, S, K, ge, K, ge, _e, ve, a), to(e, t, C, w, i.loadedImages, s, g, v, x, S, K, ge, _e, ve, t.rightToLeft === !0, d, i.threeD, i.regionMap, i.chartEx, a), !c && t.slicers && t.slicers.length > 0 && Ro(e, t, C, w, s, g, v, x, S, K, ge, _e, ve, t.rightToLeft === !0, d), c || eo(e, d, f, g, v, y, b, L, ne, te, I, x, S, j, M, k, A, N, P, m, h, s, o, i.selectedRowRange ?? null, i.selectedColRange ?? null, t.rightToLeft === !0, i.chromeColors);
	let ye = t.rightToLeft === !0;
	if (D > 0) {
		e.save(), e.strokeStyle = Fi, e.lineWidth = .5, e.beginPath();
		let t = ge + _(ge, .5, o);
		e.moveTo(0, t), e.lineTo(d, t), e.stroke(), e.restore();
	}
	if (O > 0) {
		e.save(), e.strokeStyle = Fi, e.lineWidth = .5, e.beginPath();
		let t = ye ? d - K : K, n = t + _(t, .5, o);
		e.moveTo(n, h), e.lineTo(n, f), e.stroke(), e.restore();
	}
}
function eo(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, v, y, b, x, S, C, w, T, E, D) {
	let O = D?.surface ?? "#f8f9fa", k = D?.mutedSurface ?? "#e8eaed", A = D?.selectedSurface ?? "#caddf6", j = D?.border ?? "#c8ccd0", M = D?.accent ?? "#5b9bd5", N = D?.text ?? "#444", P = (e) => !T || e < T.start || e > T.end ? O : T.strong ? A : k, F = (e) => !T || e < T.start || e > T.end ? j : T.strong ? M : j, ee = (e) => !w || e < w.start || e > w.end ? O : w.strong ? A : k, te = (e) => !w || e < w.start || e > w.end ? j : w.strong ? M : j, I = `${Math.max(1, Math.round(11 * S))}px ${si}`, L = b + v, ne = x + y, R = .5 / C, z = (e, n) => E ? Ni(e, n, t) : e, B = E ? t - b : 0;
	e.fillStyle = O, e.fillRect(B, 0, b, x), e.strokeStyle = j, e.lineWidth = .5, e.beginPath();
	let re = E ? B + _(B, .5, C) : B + b - R;
	e.moveTo(re, 0), e.lineTo(re, x), e.moveTo(B, x - R), e.lineTo(B + b, x - R), e.stroke(), e.font = I, e.fillStyle = N;
	let ie = (t, n, r) => {
		let i = z(n, r);
		e.fillStyle = P(t), e.fillRect(i, 0, r, x), e.strokeStyle = F(t), e.lineWidth = .5, e.beginPath();
		let a = i + _(i, .5, C);
		e.moveTo(a, 0), e.lineTo(a, x), e.moveTo(i, x - R), e.lineTo(i + r, x - R), e.stroke(), e.fillStyle = N, e.textAlign = "center", e.textBaseline = "middle", e.fillText(Ta(t), i + r / 2, x / 2);
	}, V = (t, n, r) => {
		let i = B;
		e.fillStyle = ee(t), e.fillRect(i, n, b, r), e.strokeStyle = te(t), e.lineWidth = .5, e.beginPath();
		let a = n + _(n, .5, C), o = E ? i + _(i, .5, C) : i + b - R;
		e.moveTo(o, n), e.lineTo(o, n + r), e.moveTo(i, a), e.lineTo(i + b, a), e.stroke(), e.fillStyle = N, e.textBaseline = "middle";
		let s = Math.max(2, Math.round(4 * S));
		E ? (e.textAlign = "left", e.fillText(String(t), i + s, n + r / 2)) : (e.textAlign = "right", e.fillText(String(t), i + b - s, n + r / 2));
	};
	if (p.length > 0) {
		e.save(), e.beginPath(), e.rect(z(b, v), 0, v, x), e.clip();
		let t = b;
		for (let e = 0; e < p.length; e++) ie(h[e], t, p[e]), t += p[e];
		e.restore();
	}
	e.save(), e.beginPath(), e.rect(z(L, t - L), 0, t - L, x), e.clip();
	let H = L - d;
	for (let e = 0; e < s.length; e++) {
		let n = s[e];
		H + n > L && H < t && ie(l[e], H, n), H += n;
	}
	if (e.restore(), m.length > 0) {
		e.save(), e.beginPath(), e.rect(B, x, b, y), e.clip();
		let t = x;
		for (let e = 0; e < m.length; e++) V(g[e], t, m[e]), t += m[e];
		e.restore();
	}
	e.save(), e.beginPath(), e.rect(B, ne, b, n - ne), e.clip();
	let ae = ne - f;
	for (let e = 0; e < c.length; e++) {
		let t = c[e];
		ae + t > ne && ae < n && V(u[e], ae, t), ae += t;
	}
	e.restore();
}
function to(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y) {
	let b = [], x = 0;
	if (i) for (let e of t.images ?? []) b.push({
		kind: "image",
		zOrder: e.zOrder ?? 2 ** 53 - 1,
		fallbackOrder: x++,
		anchor: e
	});
	for (let e of t.shapeGroups ?? []) for (let t of e.shapes) b.push({
		kind: "shape",
		zOrder: t.zOrder ?? 2 ** 53 - 1,
		fallbackOrder: x++,
		anchor: e,
		shape: t
	});
	for (let e of t.charts ?? []) b.push({
		kind: "chart",
		zOrder: e.zOrder ?? 2 ** 53 - 1,
		fallbackOrder: x++,
		anchor: e
	});
	b.sort((e, t) => e.zOrder - t.zOrder || e.fallbackOrder - t.fallbackOrder);
	for (let x of b) x.kind === "image" ? io(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, [x.anchor]) : x.kind === "shape" ? ao(e, t, n, r, a, o, s, c, l, u, d, f, p, i, m, h, [{
		...x.anchor,
		shapes: [x.shape]
	}], y) : To(e, t, n, r, a, o, s, c, l, u, d, f, p, m, h, i, [x.anchor], g, _, v);
}
function no(e, t) {
	return e.offsetOf(t);
}
function ro(e, t) {
	return e.offsetOf(t);
}
function io(e, t, n, r, i, a, s, c, l, u, d, f, p, m, h, g, _ = t.images) {
	if (p <= 0 || m <= 0) return;
	let v = no(n, c), y = ro(r, s);
	e.save(), e.beginPath();
	let b = Pi(d, p, g, h);
	e.rect(b, f, p, m), e.clip();
	for (let t of _) {
		let s = ii(t.imagePath, t.duotone), c = i.get(s), _ = ri(i, s, "tiff");
		if (!c && !_) continue;
		let x = t.fromCol + 1, S = t.fromRow + 1, C = no(n, x) + t.fromColOff * a / Y, w = ro(r, S) + t.fromRowOff * a / Y, T, E;
		if ($r(t)) T = t.nativeExtCx * a / Y, E = t.nativeExtCy * a / Y;
		else {
			let e = t.toCol + 1, i = t.toRow + 1, o = no(n, e) + t.toColOff * a / Y, s = ro(r, i) + t.toRowOff * a / Y;
			T = o - C, E = s - w;
		}
		if (T <= 0 || E <= 0) continue;
		let D = Pi(d + (C - v) - l, T, g, h), O = f + (w - y) - u;
		if (D + T < b || D > b + p || O + E < f || O > f + m) continue;
		let k = () => {
			c ? Ge(e, c, t.srcRect, D, O, T, E) : o(e, "tiff", {
				x: D,
				y: O,
				width: T,
				height: E
			});
		};
		t.alpha != null && t.alpha < 1 ? (e.save(), e.globalAlpha = t.alpha, k(), e.restore()) : k();
	}
	e.restore();
}
function ao(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g = t.shapeGroups ?? [], _) {
	if (d <= 0 || f <= 0 || g.length === 0) return;
	let v = no(n, o), y = ro(r, a);
	e.save(), e.beginPath();
	let b = Pi(l, d, h, m);
	e.rect(b, u, d, f), e.clip();
	for (let t of g) {
		let a = t.fromCol + 1, o = t.fromRow + 1, g = no(n, a) + t.fromColOff * i / Y, x = ro(r, o) + t.fromRowOff * i / Y, S, C;
		if ($r(t)) S = t.nativeExtCx * i / Y, C = t.nativeExtCy * i / Y;
		else {
			let e = t.toCol + 1, a = t.toRow + 1, o = no(n, e) + t.toColOff * i / Y, s = ro(r, a) + t.toRowOff * i / Y;
			S = o - g, C = s - x;
		}
		if (S <= 0 || C <= 0) continue;
		let w = Pi(l + (g - v) - s, S, h, m), T = u + (x - y) - c;
		if (!(w + S < b || w > b + d) && !(T + C < u || T > u + f)) for (let n of t.shapes) {
			let t = w + n.x * S, r = T + n.y * C, a = n.w * S, o = n.h * C;
			a <= 0 || o <= 0 || oo(e, n, t, r, a, o, i, p, _);
		}
	}
	e.restore();
}
function oo(e, t, n, r, i, a, s, c, l) {
	if (e.save(), t.rot !== 0 || t.flipH || t.flipV ? (e.translate(n + i / 2, r + a / 2), e.rotate(t.rot * Math.PI / 180), e.scale(t.flipH ? -1 : 1, t.flipV ? -1 : 1), e.translate(-i / 2, -a / 2)) : e.translate(n, r), t.geom.type === "custom") for (let n of t.geom.paths) {
		if (n.w <= 0 || n.h <= 0) continue;
		let r = i / n.w, o = a / n.h;
		e.beginPath();
		let s = 0, c = 0, l = 0, u = 0;
		for (let t of n.commands) switch (t.op) {
			case "moveTo": {
				let n = t.x * r, i = t.y * o;
				e.moveTo(n, i), s = l = n, c = u = i;
				break;
			}
			case "lineTo": {
				let n = t.x * r, i = t.y * o;
				e.lineTo(n, i), s = n, c = i;
				break;
			}
			case "cubicBezTo": {
				let n = t.x3 * r, i = t.y3 * o;
				e.bezierCurveTo(t.x1 * r, t.y1 * o, t.x2 * r, t.y2 * o, n, i), s = n, c = i;
				break;
			}
			case "quadBezTo": {
				let n = t.x2 * r, i = t.y2 * o;
				e.quadraticCurveTo(t.x1 * r, t.y1 * o, n, i), s = n, c = i;
				break;
			}
			case "arcTo": {
				let n = t.wr * r, i = t.hr * o;
				if (n <= 0 || i <= 0) break;
				let a = t.stAng / 6e4 * (Math.PI / 180), l = t.swAng / 6e4 * (Math.PI / 180), u = s - Math.cos(a) * n, d = c - Math.sin(a) * i, f = a + l;
				e.ellipse(u, d, n, i, 0, a, f, l < 0), s = u + Math.cos(f) * n, c = d + Math.sin(f) * i;
				break;
			}
			case "close":
				e.closePath(), s = l, c = u;
				break;
		}
		mo(e, t, i, a);
	}
	else if (t.geom.type === "preset") {
		let n = et(t.fill ?? (t.fillColor ? {
			fillType: "solid",
			color: t.fillColor
		} : null), e, 0, 0, i, a, t.rot), r = t.strokeColor && t.strokeWidth > 0 ? () => go(e, t, i, a) : null;
		g(e, t.geom.name, 0, 0, i, a, t.geom.adj ?? [], n, r, () => {}) || (e.beginPath(), e.rect(0, 0, i, a), mo(e, t, i, a));
	} else if (t.geom.type === "image") {
		let n = t.geom, r = ii(n.imagePath, n.duotone), s = c?.get(r), l = ri(c, r, "tiff");
		if (s || l) {
			let t = n.alpha, r = () => {
				s ? Ge(e, s, n.srcRect, 0, 0, i, a) : o(e, "tiff", {
					x: 0,
					y: 0,
					width: i,
					height: a
				});
			};
			t != null && t < 1 ? (e.save(), e.globalAlpha = t, r(), e.restore()) : r();
		}
	}
	t.text && po(e, t.text, i, a, s, l), e.restore();
}
var so = /* @__PURE__ */ new WeakMap();
function co(e, t) {
	let n = e.tinted.get(t);
	if (n) return n;
	let r = re(e.raster, t);
	return e.tinted.set(t, r), r;
}
function lo(e) {
	let t = [];
	for (let n of e.shapeGroups ?? []) for (let e of n.shapes) for (let n of e.text?.paragraphs ?? []) for (let e of n.runs) e.type === "math" && t.push({
		nodes: e.nodes,
		display: e.display
	});
	return t;
}
function uo(e) {
	for (let t of e.shapeGroups ?? []) for (let e of t.shapes) for (let t of e.text?.paragraphs ?? []) for (let e of t.runs) if (e.type === "math" && !so.has(e.nodes)) return !0;
	return !1;
}
async function fo(e, t) {
	let n = lo(e).filter((e) => !so.has(e.nodes));
	if (n.length !== 0) {
		await t.loadMathJax();
		for (let e of n) if (!so.has(e.nodes)) try {
			let n = await t.mathMLToSvg(U(e.nodes, e.display)), r = await se(n, "#000000");
			so.set(e.nodes, {
				raster: r,
				widthEm: n.widthEm,
				ascentEm: n.ascentEm,
				descentEm: n.descentEm,
				tinted: /* @__PURE__ */ new Map()
			});
		} catch {}
	}
}
function po(e, t, n, r, i, a) {
	if (n <= 0 || r <= 0 || t.paragraphs.length === 0) return;
	let o = t.lIns / Y * i, s = t.rIns / Y * i, c = t.tIns / Y * i, l = t.bIns / Y * i, u = Math.max(0, n - o - s), d = Math.max(0, r - c - l);
	if (u <= 0 || d <= 0) return;
	let f = Rt(t), p = f ? mi.get(e)?.[Bt(f)] : void 0, m = f ? Vt(f, p) : void 0, h = !1;
	if (f && p && m !== void 0) {
		let n = t.paragraphs[0], r = (f.size > 0 ? f.size : Mi) * st * i, a = `${f.italic ? "italic " : ""}${f.bold ? "bold " : ""}${r}px "${p.family}"`, o = u - ((n.marL ?? 0) + (n.marR ?? 0) + Math.max(0, n.indent ?? 0)) / Y * i, s = e.font;
		e.font = a;
		let c = e.measureText(f.text).width;
		e.font = s, h = t.wrap === "none" || c <= o;
	}
	let g = (t) => {
		let n = (t.size > 0 ? t.size : Mi) * st * i, r = t === f && h && p ? `"${p.family}", ${ji(t.fontFace, a, t.text, void 0, _i.get(e) === !0, void 0, Ti(e, t.fontFace))}` : ji(t.fontFace, a, t.text, Di(e, t.fontFace, t.bold, t.italic), _i.get(e) === !0, void 0, Ti(e, t.fontFace));
		return {
			font: `${t.italic ? "italic " : ""}${t.bold ? "bold " : ""}${n}px ${r}`,
			px: n
		};
	}, _ = (t, n) => {
		let r = e.font;
		e.font = t;
		let i = e.measureText("M").actualBoundingBoxAscent;
		return e.font = r, i > 0 ? i : n * .85;
	}, v = t.wrap !== "none", y = [];
	for (let n of t.paragraphs) {
		let r = n.align || "l", a = (n.marL ?? 0) / Y * i, o = (n.marR ?? 0) / Y * i, s = (n.indent ?? 0) / Y * i, c = Math.max(0, s), l = Math.max(0, u - a - o), d = !1, f = () => d ? a : a + c, p = () => d ? l : l - c, m = [], h = 0, b = 0, x = 0, S = !1, C = (e) => {
			let r = e;
			return n.spaceLine && (n.spaceLine.type === "pct" ? r *= n.spaceLine.val / 1e5 : r = n.spaceLine.val * st * i), t.autoFit === "norm" && t.lnSpcReduction != null && n.spaceLine?.type !== "pts" && (r *= 1 - t.lnSpcReduction), r;
		}, w = () => {
			if (b === 0) {
				let t = (T || Mi) * st * i;
				b = t * 1.2, x = _(`${t}px ${ji(E, void 0, "", Di(e, E), _i.get(e) === !0, void 0, Ti(e, E))}`, t);
			}
			b = C(b), y.push({
				segs: m,
				align: r,
				height: b,
				ascent: x,
				hasMath: S,
				leftInset: f(),
				availW: p()
			}), d = !0, m = [], h = 0, b = 0, x = 0, S = !1;
		}, T = 0, E;
		for (let t of n.runs) {
			if (t.type === "break") {
				w();
				continue;
			}
			if (t.type === "math") {
				let e = so.get(t.nodes);
				if (!e) continue;
				let n = (t.fontSize ?? (T || Mi)) * st * i, o = e.widthEm * n, s = e.ascentEm * n, c = e.descentEm * n, u = t.color ?? "#000000";
				if (t.display) {
					w(), y.push({
						segs: [{
							kind: "math",
							render: e,
							color: u,
							w: o,
							ascent: s,
							descent: c
						}],
						align: r,
						height: C(s + c),
						ascent: s,
						hasMath: !0,
						leftInset: a,
						availW: l
					}), d = !0;
					continue;
				}
				v && h + o > p() && m.length > 0 && w(), m.push({
					kind: "math",
					render: e,
					color: u,
					w: o,
					ascent: s,
					descent: c
				}), h += o, b = Math.max(b, s + c), x = Math.max(x, s), S = !0;
				continue;
			}
			T = t.size > 0 ? t.size : Mi, E = t.fontFace;
			let { font: n, px: o } = g(t), s = t.color ?? "#000000", c = o * 1.2;
			b = Math.max(b, c), x = Math.max(x, _(n, o)), e.font = n;
			let u = t.text.split("\n");
			for (let t = 0; t < u.length; t++) {
				t > 0 && w();
				let r = u[t];
				if (!r) continue;
				if (!v) {
					let t = e.measureText(r).width;
					m.push({
						kind: "text",
						text: r,
						font: n,
						color: s,
						w: t
					}), h += t;
					continue;
				}
				let i = "";
				for (let t of r) {
					let r = i + t, a = e.measureText(r).width;
					if (h + a > p() && (i.length > 0 || m.length > 0)) {
						if (i) {
							let t = e.measureText(i).width;
							m.push({
								kind: "text",
								text: i,
								font: n,
								color: s,
								w: t
							}), h += t;
						}
						w(), i = t, e.font = n, b = Math.max(b, c), x = Math.max(x, _(n, o));
					} else i = r;
				}
				if (i) {
					let t = e.measureText(i).width;
					m.push({
						kind: "text",
						text: i,
						font: n,
						color: s,
						w: t
					}), h += t;
				}
			}
		}
		w();
	}
	if (h && f && m !== void 0 && y.length === 1) {
		let e = (f.size > 0 ? f.size : Mi) * st * i;
		y[0].height = e * m;
	}
	let b = y.reduce((e, t) => e + t.height, 0), x = c;
	t.anchor === "ctr" ? x = c + (d - b) / 2 : t.anchor === "b" && (x = c + Math.max(0, d - b));
	let S = x;
	for (let t of y) {
		let n = t.segs.reduce((e, t) => e + t.w, 0), r = o + t.leftInset, i = r;
		if (t.align === "ctr" ? i = r + Math.max(0, (t.availW - n) / 2) : t.align === "r" && (i = r + Math.max(0, t.availW - n)), t.hasMath) {
			e.textBaseline = "alphabetic";
			let n = S + t.ascent;
			for (let r of t.segs) {
				if (r.kind === "text") e.font = r.font, e.fillStyle = r.color, e.fillText(r.text, i, n);
				else {
					let t = co(r.render, r.color);
					e.drawImage(t, i, n - r.ascent, r.w, r.ascent + r.descent);
				}
				i += r.w;
			}
		} else {
			e.textBaseline = "middle";
			let n = S + t.height / 2;
			for (let r of t.segs) r.kind === "text" && (e.font = r.font, e.fillStyle = r.color, e.fillText(r.text, i, n)), i += r.w;
		}
		S += t.height;
	}
}
function mo(e, t, n, r) {
	let i = et(t.fill ?? (t.fillColor ? {
		fillType: "solid",
		color: t.fillColor
	} : null), e, 0, 0, n, r, t.rot);
	i && (e.fillStyle = i, e.fill()), go(e, t, n, r);
}
function ho(e) {
	return !e.strokeColor || e.strokeWidth <= 0 ? null : {
		color: e.strokeColor,
		width: e.strokeWidth,
		...e.strokeFill ? { fill: e.strokeFill } : {},
		...e.strokeDashStyle ? { dashStyle: e.strokeDashStyle } : {},
		...e.strokeCustomDash?.length ? { customDash: e.strokeCustomDash } : {},
		...e.strokeLineCap ? { lineCap: e.strokeLineCap } : {},
		...e.strokeLineJoin ? { lineJoin: e.strokeLineJoin } : {},
		...e.strokeMiterLimit === void 0 ? {} : { miterLimit: e.strokeMiterLimit },
		...e.strokeAlignment ? { alignment: e.strokeAlignment } : {},
		...e.strokeCmpd ? { cmpd: e.strokeCmpd } : {},
		...e.strokeHeadEnd ? { headEnd: e.strokeHeadEnd } : {},
		...e.strokeTailEnd ? { tailEnd: e.strokeTailEnd } : {}
	};
}
function go(e, t, n, r) {
	let i = ho(t);
	if (i) {
		if (it(e, i, 1 / Y), i.fill) {
			let a = et(i.fill, e, 0, 0, n, r, t.rot);
			a && (e.strokeStyle = a);
		}
		e.stroke();
	}
}
function _o(e, t, n, r, i, a, o) {
	if (r === n && i === t) return e;
	let s = (e, r) => {
		if (e === t && r === n) return null;
		let i = a.get(`${e}:${r}`);
		return i ? aa(o, i.styleIndex ?? 0).border : null;
	}, c = s(t, r), l = s(i, n), u = s(i, r), d = (e, ...t) => {
		if (e?.style) return e;
		for (let e of t) if (e?.style) return e;
		return e ?? null;
	};
	return {
		left: e.left,
		top: e.top,
		right: d(c?.right, u?.right, e.right),
		bottom: d(l?.bottom, u?.bottom, e.bottom),
		diagonalUp: e.diagonalUp ?? null,
		diagonalDown: e.diagonalDown ?? null
	};
}
function vo(e, t) {
	if (!t) return e;
	let n = (e, t) => t && t.style ? t : e ?? null;
	return {
		left: n(e.left, t.left),
		right: n(e.right, t.right),
		top: n(e.top, t.top),
		bottom: n(e.bottom, t.bottom),
		diagonalUp: n(e.diagonalUp, t.diagonalUp),
		diagonalDown: n(e.diagonalDown, t.diagonalDown)
	};
}
function yo(e, t, n, r, i = 1) {
	return {
		outerStart: n ? e - i : e,
		outerEnd: r ? t + i : t,
		innerStart: n ? e + i : e,
		innerEnd: r ? t - i : t
	};
}
function bo(e, t, n, r, i, a, o = 1) {
	let s = [
		{
			edge: t.top,
			x1: n,
			y1: r,
			x2: n + i,
			y2: r,
			kind: "h"
		},
		{
			edge: t.bottom,
			x1: n,
			y1: r + a,
			x2: n + i,
			y2: r + a,
			kind: "h"
		},
		{
			edge: t.left,
			x1: n,
			y1: r,
			x2: n,
			y2: r + a,
			kind: "v"
		},
		{
			edge: t.right,
			x1: n + i,
			y1: r,
			x2: n + i,
			y2: r + a,
			kind: "v"
		},
		{
			edge: t.diagonalUp,
			x1: n,
			y1: r + a,
			x2: n + i,
			y2: r,
			kind: "d"
		},
		{
			edge: t.diagonalDown,
			x1: n,
			y1: r,
			x2: n + i,
			y2: r + a,
			kind: "d"
		}
	];
	for (let { edge: c, x1: l, y1: u, x2: d, y2: f, kind: p } of s) {
		if (!c || !c.style || c.style === "none") continue;
		let s = c.color ? J(c.color) : "#000000";
		if (c.style === "double" && p === "d") {
			e.strokeStyle = s, e.lineWidth = 1, e.setLineDash([]);
			let t = d - l, n = f - u, r = Math.hypot(t, n), i = -n / r * 1, a = t / r * 1;
			e.beginPath(), e.moveTo(l + i, u + a), e.lineTo(d + i, f + a), e.moveTo(l - i, u - a), e.lineTo(d - i, f - a), e.stroke();
			continue;
		}
		if (c.style === "double" && p !== "d") {
			if (e.strokeStyle = s, e.lineWidth = 1, e.setLineDash([]), e.beginPath(), p === "h") {
				let o = u === r, s = o ? r - 1 : r + a + 1, c = o ? r + 1 : r + a - 1, l = yo(n, n + i, !!t.left?.style && t.left.style !== "none", !!t.right?.style && t.right.style !== "none", 1);
				e.moveTo(l.outerStart, s), e.lineTo(l.outerEnd, s), e.moveTo(l.innerStart, c), e.lineTo(l.innerEnd, c);
			} else {
				let o = l === n, s = o ? n - 1 : n + i + 1, c = o ? n + 1 : n + i - 1, u = yo(r, r + a, !!t.top?.style && t.top.style !== "none", !!t.bottom?.style && t.bottom.style !== "none", 1);
				e.moveTo(s, u.outerStart), e.lineTo(s, u.outerEnd), e.moveTo(c, u.innerStart), e.lineTo(c, u.innerEnd);
			}
			e.stroke();
			continue;
		}
		e.beginPath(), e.strokeStyle = s;
		let m = xo(c.style);
		e.lineWidth = m;
		let h = So(c.style);
		e.setLineDash(h);
		let g = p === "v" ? _(l, m, o) : 0, v = p === "h" ? _(u, m, o) : 0;
		e.moveTo(l + g, u + v), e.lineTo(d + g, f + v), e.stroke(), e.setLineDash([]);
	}
}
function xo(e) {
	switch (e) {
		case "thick": return 3;
		case "medium":
		case "mediumDashed":
		case "mediumDashDot":
		case "mediumDashDotDot":
		case "slantDashDot": return 2;
		case "hair": return .5;
		default: return 1;
	}
}
function So(e) {
	return ot(e);
}
function Co(e) {
	switch (e) {
		case "double": return 13;
		case "thick": return 12;
		case "medium": return 11;
		case "mediumDashed": return 10;
		case "mediumDashDot": return 9;
		case "slantDashDot": return 8;
		case "mediumDashDotDot": return 7;
		case "thin": return 6;
		case "dashed": return 5;
		case "dashDot": return 4;
		case "dashDotDot": return 3;
		case "dotted": return 2;
		case "hair": return 1;
		default: return 0;
	}
}
function wo(e, t) {
	let n = Co(e?.style), r = Co(t?.style);
	return n === 0 && r === 0 ? null : n >= r ? e ?? null : t ?? null;
}
function To(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g = t.charts, _, v, y) {
	if (d <= 0 || f <= 0) return;
	let b = no(n, o), x = ro(r, a), S = Pi(l, d, m, p);
	for (let t of g) {
		let a = t.fromCol + 1, o = t.fromRow + 1, g = t.toCol + 1, C = t.toRow + 1, w = no(n, a) + t.fromColOff * i / Y, T = ro(r, o) + t.fromRowOff * i / Y, E = no(n, g) + t.toColOff * i / Y, D = ro(r, C) + t.toRowOff * i / Y, O = E - w, k = D - T;
		if (O <= 0 || k <= 0) continue;
		let A = Pi(l + (w - b) - s, O, m, p), j = u + (T - x) - c;
		A + O < S || A > S + d || j + k < u || j > u + f || (e.save(), e.beginPath(), e.rect(S, u, d, f), e.clip(), e.save(), i !== 1 && e.scale(i, i), dt(e, t.chart, i === 1 ? {
			x: A,
			y: j,
			w: O,
			h: k
		} : {
			x: A / i,
			y: j / i,
			w: O / i,
			h: k / i
		}, st, 0, _, v, (e) => h?.get(rt(e)), y), e.restore(), e.restore());
	}
}
var Eo = "600 12px \"Meiryo UI\", \"Segoe UI\", sans-serif", Do = "11px \"Meiryo UI\", \"Segoe UI\", sans-serif", Oo = "#FFFFFF", ko = "#BFBFBF", Ao = "#F2F2F2", jo = "#404040", Mo = "#FFFFFF", No = "#000000", Po = "#A5A5A5", Fo = "#E7E6E6", Io = "#A6A6A6", Lo = "#C6C6C6";
function Ro(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) {
	if (d <= 0 || f <= 0) return;
	let h = t.slicers;
	if (!h) return;
	let g = no(n, o), _ = ro(r, a), v = Pi(l, d, m, p);
	for (let t of h) {
		let a = t.fromCol + 1, o = t.fromRow + 1, h = t.toCol + 1, y = t.toRow + 1, b = no(n, a) + t.fromColOff * i / Y, x = ro(r, o) + t.fromRowOff * i / Y, S = no(n, h) + t.toColOff * i / Y, C = ro(r, y) + t.toRowOff * i / Y, w = S - b, T = C - x;
		if (w <= 0 || T <= 0) continue;
		let E = Pi(l + (b - g) - s, w, m, p), D = u + (x - _) - c;
		E + w < v || E > v + d || D + T < u || D > u + f || (e.save(), e.beginPath(), e.rect(v, u, d, f), e.clip(), zo(e, t.caption, t.items, E, D, w, T, i, t.style), e.restore());
	}
}
function zo(e, t, n, r, i, a, o, s, c) {
	let l = c != null;
	e.fillStyle = c?.whole?.fillColor ?? Oo, e.fillRect(r, i, a, o);
	let u = l ? c.whole?.borderColor : ko;
	u && (e.strokeStyle = u, e.lineWidth = 1, e.strokeRect(r + .5, i + .5, a - 1, o - 1));
	let d = Math.max(20 * s, 14), f = l ? c.header?.fillColor : Ao;
	f && (e.fillStyle = f, e.fillRect(r + 1, i + 1, a - 2, d)), e.fillStyle = c?.header?.fontColor ?? jo, e.font = Vo(c?.header, Eo, s), e.textBaseline = "middle", e.textAlign = "left";
	let p = 6 * s;
	if (Uo(e, t, r + p, i + d / 2 + 1, a - 2 * p), n.length === 0) return;
	let m = Math.max(1, Math.round(2 * s)), h = 4 * s, g = r + h, _ = i + d + h, v = a - 2 * h, y = o - d - 2 * h;
	if (v <= 0 || y <= 0) return;
	let b = Math.max(18 * s, 16), x = Math.max(1, Math.floor((y + m) / (b + m))), S = Math.min(n.length, x), C = Math.min(b, (y - m * (S - 1)) / S);
	if (C <= 0) return;
	e.font = Ho(Do, s);
	let w = 8 * s;
	for (let t = 0; t < S; t++) {
		let r = n[t], i = _ + t * (C + m), a = r.selected, o = a ? c?.selectedItemWithData : c?.unselectedItemWithData, u = o?.fillColor ?? (a ? Mo : Fo), d = l ? o?.borderColor : a ? Po : Lo;
		e.fillStyle = u, l ? (Bo(e, g, i, v, C, Math.min(4 * s, C / 4)), e.fill(), d && (e.strokeStyle = d, e.lineWidth = 1, e.stroke())) : (e.fillRect(g, i, v, C), d && (e.strokeStyle = d, e.lineWidth = 1, e.strokeRect(g + .5, i + .5, v - 1, C - 1))), e.font = Vo(o, Do, s), e.fillStyle = o?.fontColor ?? (a ? No : Io), Uo(e, r.name, g + w, i + C / 2 + 1, v - 2 * w);
	}
}
function Bo(e, t, n, r, i, a) {
	let o = Math.max(0, Math.min(a, r / 2, i / 2));
	e.beginPath(), e.moveTo(t + o, n), e.lineTo(t + r - o, n), e.quadraticCurveTo(t + r, n, t + r, n + o), e.lineTo(t + r, n + i - o), e.quadraticCurveTo(t + r, n + i, t + r - o, n + i), e.lineTo(t + o, n + i), e.quadraticCurveTo(t, n + i, t, n + i - o), e.lineTo(t, n + o), e.quadraticCurveTo(t, n, t + o, n), e.closePath();
}
function Vo(e, t, n) {
	if (!e) return Ho(t, n);
	let r = Math.round((e.fontSize ?? 11) * n);
	return `${e.fontBold ? "bold " : ""}${r}px ${e.fontFamily ? `"${e.fontFamily}", "Segoe UI", sans-serif` : "\"Meiryo UI\", \"Segoe UI\", sans-serif"}`;
}
function Ho(e, t) {
	return e.replace(/(\d+(?:\.\d+)?)px/, (e, n) => `${Math.round(Number(n) * t)}px`);
}
function Uo(e, t, n, r, i) {
	if (i <= 0) return;
	let a = t;
	if (e.measureText(a).width > i) {
		for (; a.length > 0 && e.measureText(a + "…").width > i;) a = a.slice(0, -1);
		a = a.length > 0 ? a + "…" : "";
	}
	e.fillText(a, n, r);
}
//#endregion
//#region packages/xlsx/src/render-orchestrator.ts
var Wo = Symbol("xlsx-render-commit-guard");
function Go(e, t) {
	return {
		...e,
		[Wo]: t
	};
}
function Ko(e, t) {
	return e === void 0 ? t : t === void 0 ? e : Math.max(e, t);
}
function qo(e, t) {
	if (!e && !t) return null;
	let n = e ? 1 - e.l - e.r : 1, r = (t ? 1 - t.l - t.r : 1) < n ? t : e, i = e ? 1 - e.t - e.b : 1, a = (t ? 1 - t.t - t.b : 1) < i ? t : e;
	return {
		l: r?.l ?? 0,
		r: r?.r ?? 0,
		t: a?.t ?? 0,
		b: a?.b ?? 0
	};
}
function Jo(e, t) {
	return e ? t ? e === t ? e : void 0 : e : t;
}
function Yo(e, t) {
	return {
		...e,
		svgImagePath: Jo(e.svgImagePath, t.svgImagePath),
		widthPt: Ko(e.widthPt, t.widthPt),
		heightPt: Ko(e.heightPt, t.heightPt),
		srcRect: qo(e.srcRect, t.srcRect),
		failClosedOnDuotoneFailure: e.failClosedOnDuotoneFailure || t.failClosedOnDuotoneFailure || void 0,
		targetWidthPx: Ko(e.targetWidthPx, t.targetWidthPx),
		targetHeightPx: Ko(e.targetHeightPx, t.targetHeightPx)
	};
}
function Xo(e, t, n) {
	let r = e.get(t);
	e.set(t, r ? Yo(r, n) : n);
}
function Zo(e, t, n, r) {
	let { col: i, row: a } = (n ?? Q(t)).axesAtScale(r), o = (e, t, n) => e.offsetOf(t + 1) + n * r / Y, s = o(i, e.fromCol, e.fromColOff), c = o(a, e.fromRow, e.fromRowOff), l = $r(e) ? s + e.nativeExtCx * r / Y : o(i, e.toCol, e.toColOff), u = $r(e) ? c + e.nativeExtCy * r / Y : o(a, e.toRow, e.toRowOff);
	return l > s && u > c ? {
		width: l - s,
		height: u - c
	} : null;
}
function Qo(e, t, n, r, i) {
	if (!n) return !0;
	let a = r ?? Q(t), o = i?.scale ?? 1, { col: s, row: c } = a.axesAtScale(o), l = (e, t, n) => e.offsetOf(t + 1) + n * o / Y, u = l(s, e.fromCol, e.fromColOff), d = l(c, e.fromRow, e.fromRowOff), f = $r(e), p = f ? u + e.nativeExtCx * o / Y : l(s, e.toCol, e.toColOff), m = f ? d + e.nativeExtCy * o / Y : l(c, e.toRow, e.toRowOff);
	if (p <= u || m <= d) return !1;
	let h = i ? a.effectiveFrozenBands({
		scale: o,
		width: i.width,
		height: i.height,
		headerWidth: 50,
		headerHeight: 22,
		rows: i.freezeRows,
		cols: i.freezeCols
	}) : {
		rows: t.freezeRows ?? 0,
		cols: t.freezeCols ?? 0
	}, g = (e, t, n, r, i) => {
		let a = Math.min(e, t), o = Math.max(e, t);
		return a < n && o > 0 || a < i && o > r;
	};
	return g(u, p, s.offsetOf(h.cols + 1), s.offsetOf(n.col), s.offsetOf(n.col + n.cols)) && g(d, m, c.offsetOf(h.rows + 1), c.offsetOf(n.row), c.offsetOf(n.row + n.rows));
}
async function $o(e, t, n, r, i = 0, a = 0, o = null, s = null, c, l = !1, u, d, f, p) {
	let m = t === "image/svg+xml";
	if (m && s) return null;
	let h = Ze(t, o, i, a);
	if (!h) return null;
	let g = () => mt(e, t, s, r, {
		widthPt: h.widthPt,
		heightPt: h.heightPt,
		offscreenFactory: c,
		failClosedOnDuotoneFailure: l,
		tiff: u,
		...d ?? {},
		...p ? { maxRetainedPixels: p } : {}
	}), _ = {
		svgImagePath: n,
		srcRect: o
	};
	if (!s && I(_)) try {
		return await ue(_.svgImagePath, r, {
			...d,
			maxRetainedPixels: p,
			workerDecoder: f
		});
	} catch {
		return m ? ue(e, r, {
			...d,
			maxRetainedPixels: p,
			workerDecoder: f
		}) : g();
	}
	return m ? ue(e, r, {
		...d,
		maxRetainedPixels: p,
		workerDecoder: f
	}) : g();
}
async function es(e, t, n, r) {
	if (t.clear(), ti(t), !n) return;
	let i = n, a = /* @__PURE__ */ new Map(), o = r?.viewport ? Q(e) : void 0, s = r?.viewport && r.width !== void 0 && r.height !== void 0 ? {
		width: r.width,
		height: r.height,
		scale: r.cellScale ?? 1,
		freezeRows: r.freezeRows ?? e.freezeRows ?? 0,
		freezeCols: r.freezeCols ?? e.freezeCols ?? 0
	} : void 0;
	if (e.images) for (let t of e.images) Qo(t, e, r?.viewport, o, s) && Xo(a, ii(t.imagePath, t.duotone), {
		imagePath: t.imagePath,
		mimeType: t.mimeType,
		svgImagePath: t.svgImagePath,
		widthPt: t.nativeExtCx > 0 ? t.nativeExtCx / ct : 0,
		heightPt: t.nativeExtCy > 0 ? t.nativeExtCy / ct : 0,
		srcRect: t.srcRect ?? null,
		duotone: t.duotone ?? null,
		...(() => {
			let n = Zo(t, e, o, r?.cellScale ?? 1), i = n && r?.effectiveDpr ? Ke(n.width * r.effectiveDpr, n.height * r.effectiveDpr, t.srcRect) : null;
			return i ? {
				targetWidthPx: i.width,
				targetHeightPx: i.height
			} : {};
		})()
	});
	if (e.shapeGroups) {
		for (let t of e.shapeGroups) if (Qo(t, e, r?.viewport, o, s)) for (let n of t.shapes) n.geom.type === "image" && Xo(a, ii(n.geom.imagePath, n.geom.duotone), {
			imagePath: n.geom.imagePath,
			mimeType: n.geom.mimeType,
			svgImagePath: n.geom.svgImagePath,
			widthPt: t.nativeExtCx > 0 ? t.nativeExtCx * n.w / ct : 0,
			heightPt: t.nativeExtCy > 0 ? t.nativeExtCy * n.h / ct : 0,
			srcRect: n.geom.srcRect ?? null,
			duotone: n.geom.duotone ?? null,
			...(() => {
				let i = Zo(t, e, o, r?.cellScale ?? 1), a = i && r?.effectiveDpr ? Ke(i.width * n.w * r.effectiveDpr, i.height * n.h * r.effectiveDpr, n.geom.srcRect) : null;
				return a ? {
					targetWidthPx: a.width,
					targetHeightPx: a.height
				} : {};
			})()
		});
	}
	let c = e.charts ?? [], l = c.length > 0 ? o ?? Q(e) : o, u = [];
	for (let t of c) {
		if (!Qo(t, e, r?.viewport, l, s)) continue;
		let n = Zo(t, e, l, r?.cellScale ?? 1);
		if (!n || !Number.isFinite(n.width) || !Number.isFinite(n.height) || n.width <= 0 || n.height <= 0) continue;
		let i = $e(t.chart), a = {
			widthPt: n.width * (Y / ct),
			heightPt: n.height * (Y / ct),
			targetWidthPx: r?.effectiveDpr === void 0 ? void 0 : n.width * r.effectiveDpr,
			targetHeightPx: r?.effectiveDpr === void 0 ? void 0 : n.height * r.effectiveDpr
		}, o = [], c = !0;
		for (let e of i) {
			let t = Qe(e, a);
			if (!t) {
				c = !1;
				break;
			}
			o.push({
				usage: e,
				size: t
			});
		}
		c && u.push({
			chart: t,
			frame: a,
			usages: o
		});
	}
	let d = tt(u.map(({ chart: e }) => e.chart), (e, t) => Qe(e, u[t].frame) != null), f = /* @__PURE__ */ new Map();
	for (let e of d) {
		let { fill: t } = e, n = rt(t);
		f.set(n, {
			fill: t,
			widthPt: 0,
			heightPt: 0,
			preserveNaturalSize: e.preserveNaturalSize,
			hasSourceCrop: e.hasSourceCrop
		});
	}
	for (let e of u) for (let { usage: t, size: n } of e.usages) {
		let { fill: e } = t, r = rt(e), i = f.get(r);
		if (!i) continue;
		let a = i.preserveNaturalSize || t.preserveNaturalSize;
		f.set(r, {
			...i,
			widthPt: Math.max(i.widthPt, n.widthPt),
			heightPt: Math.max(i.heightPt, n.heightPt),
			targetWidthPx: a ? void 0 : Math.max(i.targetWidthPx ?? 0, n.targetWidthPx ?? 0) || void 0,
			targetHeightPx: a ? void 0 : Math.max(i.targetHeightPx ?? 0, n.targetHeightPx ?? 0) || void 0,
			preserveNaturalSize: a,
			hasSourceCrop: i.hasSourceCrop || t.hasSourceCrop
		});
	}
	for (let [e, t] of f) {
		let { fill: n, widthPt: r, heightPt: i, targetWidthPx: o, targetHeightPx: s, hasSourceCrop: c } = t;
		Xo(a, e, {
			imagePath: n.imagePath,
			mimeType: n.mimeType,
			svgImagePath: n.svgImagePath,
			widthPt: r,
			heightPt: i,
			srcRect: c ? {
				l: 0,
				t: 0,
				r: 0,
				b: 0
			} : null,
			duotone: n.duotone ?? null,
			failClosedOnDuotoneFailure: !0,
			...o && s ? {
				targetWidthPx: o,
				targetHeightPx: s
			} : {}
		});
	}
	if (a.size === 0) return;
	let p = O(r?.imageResources), m = me((await Promise.all([...a].map(async ([e, t]) => {
		if (!t.targetWidthPx || !t.targetHeightPx || t.mimeType === "image/svg+xml" || t.duotone || !t.duotone && I({
			svgImagePath: t.svgImagePath,
			srcRect: t.srcRect
		})) return null;
		if (fe(t.mimeType) && (p.resolution === "display" || p.strategy === "adaptive")) return {
			key: e,
			targetWidthPx: t.targetWidthPx,
			targetHeightPx: t.targetHeightPx,
			retainedSurfaceCount: 1
		};
		let n = await te(t.imagePath, t.mimeType, i).catch(() => null);
		return !n?.dimensions || !b(n.format, r?.tiff !== void 0) ? null : {
			key: e,
			targetWidthPx: t.targetWidthPx,
			targetHeightPx: t.targetHeightPx,
			sourceWidthPx: n.dimensions.width,
			sourceHeightPx: n.dimensions.height,
			retainedSurfaceCount: 1
		};
	}))).filter((e) => e !== null), p);
	for (let [e, t] of a) {
		if (t.mimeType === "image/svg+xml" || !t.duotone && I({
			svgImagePath: t.svgImagePath,
			srcRect: t.srcRect
		})) continue;
		let n = m.targets.get(e);
		t.targetWidthPx = n?.width, t.targetHeightPx = n?.height, t.plannedPixelLimit = n?.maxRetainedPixels;
	}
	await Promise.all([...a.entries()].map(async ([e, n]) => {
		try {
			let a = await $o(n.imagePath, n.mimeType, n.svgImagePath, i, n.widthPt, n.heightPt, n.srcRect, n.duotone, r?.offscreenFactory, n.failClosedOnDuotoneFailure ?? !1, r?.tiff, n.targetWidthPx && n.targetHeightPx ? {
				targetWidthPx: n.targetWidthPx,
				targetHeightPx: n.targetHeightPx
			} : void 0, r?.svgDecoder, n.plannedPixelLimit);
			t.set(e, a);
		} catch (n) {
			if (y(n, "tiff") || pt(n)) {
				t.set(e, null), ni(t, e, "tiff");
				return;
			}
			if (lt(n)) throw n;
			t.delete(e);
		}
	}));
}
var ts = /* @__PURE__ */ new WeakMap();
function ns(e, t, n, r) {
	if (Ga(t)) return t;
	let i = ts.get(t);
	if (i) return i;
	let a = {
		...t,
		rowHeights: { ...t.rowHeights }
	};
	Qa(t, a);
	let o = Q(t).maximumDigitWidth;
	return Yr.forWorksheet(a, o), Wa(e, a, n, r), Yr.forWorksheet(a, o), ts.set(t, a), a;
}
async function rs(e, t, n, r = {}, i) {
	let a = () => is(e, t, n, r, i), o = !e.ws.isDialogSheet && ((e.ws.images?.length ?? 0) > 0 || (e.ws.shapeGroups?.some((e) => e.shapes.some((e) => e.geom.type === "image")) ?? !1) || tt((e.ws.charts ?? []).map((e) => e.chart)).length > 0);
	return r.fetchImage && o ? he(r.fetchImage, r.imageResources, a) : a();
}
async function is(e, n, r, i = {}, a) {
	if (i[Wo]?.() === !1) return;
	let o = e.styles, s = n.getContext("2d");
	if (!s) throw Error("XLSX render target does not provide a 2-D canvas context");
	wi(s, e.ws, i.officeFontRoutes, i.googleSubstitutes === !0), Oi(e.ws, i.authoritativeMdw);
	let c = e.ws.isDialogSheet ? e.ws : ns(s, e.ws, o, e.cjkFallback), l = N(n) ? n.clientWidth || 800 : n.width, u = N(n) ? n.clientHeight || 600 : n.height, d = i.width ?? l, f = i.height ?? u, p = i.dpr ?? t(), m = nt(d * p, f * p), h = m.clamped ? p * m.scale : p, g = /* @__PURE__ */ new Map();
	if (c.isDialogSheet || await es(c, g, i.fetchImage, {
		viewport: r,
		width: d,
		height: f,
		cellScale: i.cellScale,
		freezeRows: i.freezeRows,
		freezeCols: i.freezeCols,
		tiff: e.tiff,
		effectiveDpr: h,
		svgDecoder: a,
		imageResources: i.imageResources
	}), !c.isDialogSheet && e.math && uo(c) && await fo(c, e.math), i[Wo]?.() === !1) return;
	let _ = m.width, v = m.height;
	if (n.width !== _ && (n.width = _), n.height !== v && (n.height = v), N(n)) {
		let e = `${d}px`, t = `${f}px`;
		n.style.width !== e && (n.style.width = e), n.style.height !== t && (n.style.height = t);
	}
	let y = n.getContext("2d");
	if (y.setTransform(h, 0, 0, h, 0, 0), c.parseError) {
		os(y, d, f, c.name, c.parseError);
		return;
	}
	if (c.isDialogSheet) {
		as(y, d, f);
		return;
	}
	$a(y, c, o, r, {
		...i,
		dpr: h,
		loadedImages: g,
		threeD: e.threeD,
		regionMap: e.regionMap,
		chartEx: e.chartEx
	}, e.cjkFallback);
}
function as(e, t, n) {
	e.save(), e.fillStyle = "#f7f7f8", e.fillRect(0, 0, t, n);
	let r = Math.min(t, n);
	e.fillStyle = "#555555", e.textAlign = "center", e.textBaseline = "middle", e.font = `${Math.max(13, r * .035)}px sans-serif`, e.fillText("Legacy dialog sheets are not displayed", t / 2, n / 2), e.restore();
}
function os(e, t, n, r, i) {
	e.save(), e.fillStyle = "#f7f7f8", e.fillRect(0, 0, t, n);
	let a = t / 2, o = Math.min(t, n), s = Math.max(20, o * .1);
	e.fillStyle = "#b23b3b", e.textAlign = "center", e.textBaseline = "middle", e.font = `${s}px sans-serif`, e.fillText("⚠", a, n * .32);
	let c = Math.max(13, o * .035);
	e.fillStyle = "#333333", e.font = `600 ${c}px sans-serif`, e.fillText(`Sheet "${r}" could not be displayed`, a, n * .46);
	let l = Math.max(10, o * .022);
	e.fillStyle = "#666666", e.font = `${l}px sans-serif`;
	let u = Math.min(t * .8, 640), d = i.split(/\s+/), f = [], p = "";
	for (let t of d) {
		let n = p ? `${p} ${t}` : t;
		if (e.measureText(n).width > u && p ? (f.push(p), p = t) : p = n, f.length >= 4) break;
	}
	p && f.length < 4 && f.push(p);
	let m = l * 1.4, h = n * .52 + m;
	for (let t of f.slice(0, 4)) e.fillText(t, a, h), h += m;
	e.restore();
}
function ss(e) {
	let t = (e ?? "").trim();
	if (!t) return {
		kind: "unresolved",
		formula: ""
	};
	if (t.length >= 2 && t.startsWith("\"") && t.endsWith("\"")) return {
		kind: "inline",
		values: t.slice(1, -1).split(",").map((e) => e.trim()).filter((e) => e.length > 0)
	};
	let n, r = t, i = t.indexOf("!");
	if (i >= 0) {
		let e = t.slice(0, i);
		e.startsWith("'") && e.endsWith("'") && e.length >= 2 && (e = e.slice(1, -1).replace(/''/g, "'")), n = e, r = t.slice(i + 1);
	}
	let [a, o] = r.split(":"), s = Xr(a ?? "");
	if (s) {
		let e = o ? Xr(o) : s;
		if (e) {
			let t = {
				row: Math.min(s.row, e.row),
				col: Math.min(s.col, e.col)
			}, r = {
				row: Math.max(s.row, e.row),
				col: Math.max(s.col, e.col)
			};
			return {
				kind: "range",
				sheet: n,
				start: t,
				end: r
			};
		}
	}
	return {
		kind: "unresolved",
		formula: t
	};
}
function cs(e, t) {
	if (e.kind === "inline") return {
		kind: "values",
		values: e.values
	};
	if (e.kind === "unresolved") return {
		kind: "formula",
		formula: e.formula
	};
	let n = [];
	for (let r = e.start.row; r <= e.end.row; r++) for (let i = e.start.col; i <= e.end.col; i++) {
		let e = t(r, i);
		e != null && e !== "" && n.push(e);
	}
	return {
		kind: "values",
		values: n
	};
}
function ls(e) {
	let { cell: t, panel: n, viewport: r, rtl: i } = e, a = t.y + t.h + 2, o = t.y - 2 - n.h, s;
	s = a + n.h <= r.h ? a : o >= 0 ? o : a, s = Math.max(0, Math.min(s, r.h - n.h));
	let c = i ? t.x + t.w - n.w : t.x;
	return c = Math.max(0, Math.min(c, r.w - n.w)), {
		left: c,
		top: s
	};
}
//#endregion
//#region packages/xlsx/src/worker-protocol.ts
function us(e, t) {
	if (!t) return;
	let n = !1;
	if (t.rows) for (let [r, i] of Object.entries(t.rows)) {
		let t = Number(r);
		i === null ? Object.hasOwn(e.rowHeights, t) && (delete e.rowHeights[t], n = !0) : e.rowHeights[t] !== i && (e.rowHeights[t] = i, n = !0);
	}
	if (t.cols) for (let [r, i] of Object.entries(t.cols)) {
		let t = Number(r);
		i === null ? Object.hasOwn(e.colWidths, t) && (delete e.colWidths[t], n = !0) : e.colWidths[t] !== i && (e.colWidths[t] = i, n = !0);
	}
	n && Yr.invalidate(e);
}
function ds(e, t) {
	if (!t) return e;
	let n = {
		...e,
		rowHeights: { ...e.rowHeights },
		colWidths: { ...e.colWidths }
	};
	return us(n, t), n;
}
var fs = Symbol("xlsx-viewer-render-context");
function ps(e, t, n) {
	if (!Number.isFinite(t) || t <= 0) throw Error("XLSX maximum digit width must be a finite positive number");
	return {
		...e,
		[fs]: {
			maximumDigitWidth: t,
			worksheet: n?.worksheet,
			projection: n?.projection
		}
	};
}
function ms(e) {
	let t = e[fs], n = { ...e };
	return delete n[fs], t ? {
		opts: n,
		layoutMetrics: { maximumDigitWidth: t.maximumDigitWidth },
		worksheet: t.worksheet,
		projection: t.projection
	} : { opts: n };
}
//#endregion
//#region packages/xlsx/src/delimited-text.ts
var hs = "load-delimited-text", gs = bt;
function _s(e) {
	if (e > gs) throw Et(hs, void 0, "delimited-text-source", "bytes", gs, e);
}
Object.freeze({
	fonts: [Object.freeze({
		bold: !1,
		italic: !1,
		underline: !1,
		strike: !1,
		size: 11,
		color: null,
		name: "Calibri"
	})],
	fills: [Object.freeze({
		patternType: "none",
		fgColor: null,
		bgColor: null
	})],
	borders: [Object.freeze({
		left: null,
		right: null,
		top: null,
		bottom: null
	})],
	cellXfs: [Object.freeze({
		fontId: 0,
		fillId: 0,
		borderId: 0,
		numFmtId: 0,
		alignH: null,
		alignV: null,
		wrapText: !1
	})],
	numFmts: [],
	dxfs: []
});
function vs(e) {
	if (!e || e.format !== "csv" && e.format !== "tsv" && e.format !== "delimited-text") throw TypeError("format must be 'csv', 'tsv', or 'delimited-text'");
	let t = e.delimiter ?? (e.format === "tsv" ? "	" : e.format === "csv" ? "," : void 0);
	if (t === void 0) throw TypeError("delimiter is required for format 'delimited-text'");
	if (t.length !== 1) throw TypeError("delimiter must be exactly one character");
	if (t === "\"" || t === "\r" || t === "\n") throw TypeError("delimiter cannot be a quote or record separator");
	let n = e.encoding ?? "utf-8";
	if (typeof n != "string" || n.trim() === "") throw TypeError("encoding must be a non-empty TextDecoder label");
	let r = e.sheetName ?? "Sheet1";
	if (typeof r != "string" || r.trim() === "") throw TypeError("sheetName must be a non-empty string");
	return Object.freeze({
		delimiter: t,
		encoding: n,
		sheetName: r
	});
}
//#endregion
//#region packages/xlsx/src/delimited-text-source.ts
async function ys(e) {
	let t = e.headers.get("content-encoding")?.trim().toLowerCase(), n = e.headers.get("content-length");
	if ((!t || t === "identity") && n !== null && /^\d+$/.test(n.trim())) {
		let t = Number(n);
		t > gs && (await e.body?.cancel().catch(() => void 0), _s(t));
	}
	let r = e.body;
	if (!r) return /* @__PURE__ */ new ArrayBuffer(0);
	let i = r.getReader(), a = [], o = 0;
	try {
		for (;;) {
			let { done: e, value: t } = await i.read();
			if (e) break;
			!t || t.byteLength === 0 || (t.byteLength > gs - o && (await i.cancel().catch(() => void 0), _s(gs + 1)), a.push(t), o += t.byteLength);
		}
	} finally {
		i.releaseLock();
	}
	let s = new Uint8Array(o), c = 0;
	for (let e of a) s.set(e, c), c += e.byteLength;
	return s.buffer;
}
//#endregion
//#region packages/xlsx/src/workbook.ts
var bs = Symbol("retain-xlsx-viewer-fonts"), xs = Symbol("prepare-xlsx-viewer-row-heights"), Ss = Symbol("release-xlsx-viewer-projection"), Cs = Symbol("load-xlsx-sheet-source"), ws = class e {
	metrics = null;
	bridge = null;
	delimitedTextBacked = !1;
	parsedWorkbook = null;
	sheetCache = /* @__PURE__ */ new Map();
	sheetLoads = /* @__PURE__ */ new Map();
	rawParts = new Ue({
		maxEntries: 64,
		maxBytes: M
	});
	queuedImageLoads = /* @__PURE__ */ new Map();
	_fetchImage = (e, t) => this.getImageWithinArchiveOperation(e, t);
	resourcePolicy = null;
	cjkFallback = "jp";
	math;
	threeD;
	regionMap;
	chartEx;
	tiff;
	googleFontNames = [];
	googleSubstitutes = !1;
	officeFontRequests = [];
	retainedFontSets = /* @__PURE__ */ new Map();
	fontsDestroyed = !1;
	_mode = "main";
	generation = 0;
	archiveOperationTail = Promise.resolve();
	worksheetPullClient = null;
	workerTimeoutMs;
	retainedSheetUsage = {
		rows: 0,
		cells: 0,
		ownedUtf8Bytes: 0,
		jsonBytes: 0
	};
	resourceFailure = null;
	constructor(e, t, n, r = !0) {
		if (this._mode = t, e && (this.bridge = new _e(e, {
			correlate: (e) => "protocol" in e && e.protocol === "ooxml-pull-v1" ? e.requestId : "id" in e ? e.id : void 0,
			toError: (e) => "type" in e && e.type === "error" ? x(e) : void 0,
			onUnsolicited: (t) => {
				Pe((t, n) => e.postMessage(t, n), t);
			}
		}), r)) {
			let e = new URL(n ?? Zt, location.href).href;
			this.bridge.post({
				type: "init",
				wasmUrl: e
			});
		}
	}
	get mode() {
		return this._mode;
	}
	static async [Cs](e, t, n = {}) {
		if (n.format === void 0 || n.format === "xlsx") return await this.load(e, t);
		if (n.format === "csv" || n.format === "tsv" || n.format === "delimited-text") return await this.loadDelimitedText(e, t, n);
		throw TypeError("Unsupported XlsxSheetViewer source format");
	}
	static async loadDelimitedText(t, n, r) {
		n = {
			...n,
			cjkFallback: We(n.cjkFallback)
		};
		let i = vs(r), a = W(n), o = n.mode ?? "main", s = new m({
			enabled: !0,
			format: "xlsx",
			mode: o,
			policy: a.policy,
			onMetrics: a.onResourceMetrics,
			emitToConsole: a.debug
		});
		try {
			if (o === "worker" && (typeof Worker > "u" || typeof OffscreenCanvas > "u")) throw Error("mode: 'worker' requires Worker and OffscreenCanvas support");
			let r = typeof t == "string" ? void 0 : t, c;
			if (typeof t == "string") {
				let e = await fetch(t);
				if (!e.ok) throw Error(`Failed to fetch: ${e.status} ${e.statusText}`);
				c = await ys(e);
			} else c = t;
			_s(c.byteLength), s.setSourceBytes(c.byteLength), s.checkpoint("source ready");
			let l = o === "worker" ? (await import("./render-worker-host-BEKACgii.js")).createRenderWorker() : (await import("./delimited-text-worker-host-BVY-Ecni.js")).createDelimitedTextWorker(), u;
			try {
				let t = new e(l, o, void 0, !1);
				return u = t, t.metrics = s, await t._loadDelimitedText(r === c ? c.slice(0) : c, n, a.policy, i), o === "main" && (t.bridge?.terminate(), t.bridge = null), s.checkpoint("worksheet ready"), s.succeed({ sheets: 1 }), t;
			} catch (e) {
				let t = u;
				throw be(l, t ? () => t.destroy() : void 0), e;
			}
		} catch (e) {
			throw s.fail(e), e;
		}
	}
	static async load(t, n = {}) {
		n = {
			...n,
			cjkFallback: We(n.cjkFallback)
		};
		let r = W(n), i = n.mode ?? "main", a = new m({
			enabled: !0,
			format: "xlsx",
			mode: i,
			policy: r.policy,
			onMetrics: r.onResourceMetrics,
			emitToConsole: r.debug
		});
		try {
			if (i === "worker" && (typeof Worker > "u" || typeof OffscreenCanvas > "u")) throw Error("mode: 'worker' requires Worker and OffscreenCanvas support");
			let o = typeof t == "string" ? void 0 : t, s;
			if (typeof t == "string") {
				let e = await fetch(t);
				if (!e.ok) throw Error(`Failed to fetch: ${e.status} ${e.statusText}`);
				s = await e.arrayBuffer();
			} else s = t;
			s = Oe(await ve(s, n.password));
			let c = s === o;
			a.setSourceBytes(s.byteLength), a.checkpoint("container ready");
			let l = i === "worker" ? (await import("./render-worker-host-BEKACgii.js")).createRenderWorker() : new Xt(), u;
			try {
				return u = new e(l, i, n.wasmUrl), u.metrics = a, await u._load(s, n, r.policy, (e) => a.observeUsage(e), c), a.checkpoint("workbook index ready"), a.succeed({ sheets: u.sheetCount }), u;
			} catch (e) {
				let t = u;
				throw be(l, t ? () => t.destroy() : void 0), e;
			}
		} catch (e) {
			throw a.fail(e), e;
		}
	}
	async _load(e, t = {}, n = r(t), i, a = !1) {
		let o = this.requireBridge();
		this.resourceFailure = null, this.retainedSheetUsage = {
			rows: 0,
			cells: 0,
			ownedUtf8Bytes: 0,
			jsonBytes: 0
		}, this.sheetCache.clear(), await this.worksheetPullClient?.cancelAll("closed"), this.worksheetPullClient = null, this.generation = (this.generation ?? 0) + 1, this.resourcePolicy = n, this.workerTimeoutMs = t.workerTimeoutMs, this.googleSubstitutes = t.useGoogleFonts === !0, this.cjkFallback = We(t.cjkFallback), this.math = this._mode === "worker" ? void 0 : t.math, this.threeD = this._mode === "worker" ? void 0 : t.threeD, this.regionMap = this._mode === "worker" ? void 0 : t.regionMap, this.chartEx = this._mode === "worker" ? void 0 : t.chartEx, this.tiff = this._mode === "worker" ? void 0 : t.tiff;
		let s = this._mode === "worker" ? ht(t) : void 0;
		t.math && this._mode === "worker" && !s?.math && console.warn("[ooxml] a custom math renderer cannot cross the worker boundary; equations will be skipped in mode: 'worker'. Use the math renderer from @silurus/ooxml/math."), t.threeD && this._mode === "worker" && !s?.threeD && console.warn("[ooxml] a custom 3-D chart renderer cannot cross the worker boundary; charts use their 2-D family fallback in mode: 'worker'. Use the renderer from @silurus/ooxml/three-d."), t.regionMap && this._mode === "worker" && !s?.regionMap && console.warn("[ooxml] a custom Region Map renderer cannot cross the worker boundary; geospatial charts use the unsupported-chart placeholder in mode: 'worker'. Use the renderer from @silurus/ooxml/region-map."), t.chartEx && this._mode === "worker" && !s?.chartEx && console.warn("[ooxml] a custom ChartEx renderer cannot cross the worker boundary; ChartEx charts use the unsupported-chart placeholder in mode: 'worker'. Use the renderer from @silurus/ooxml/chart-ex."), t.tiff && this._mode === "worker" && !s?.tiff && console.warn("[ooxml] a custom TIFF codec cannot cross the worker boundary; recognized TIFF images will use an unavailable-image placeholder in mode: 'worker'. Use the codec from @silurus/ooxml/tiff to display them.");
		let c = a ? e.slice(0) : e, l = await o.request((e) => this._mode === "worker" ? {
			type: "parse",
			id: e,
			data: c,
			resourcePolicy: n,
			useGoogleFonts: !!t.useGoogleFonts,
			cjkFallback: this.cjkFallback,
			renderers: s
		} : {
			type: "parse",
			id: e,
			data: c,
			resourcePolicy: n
		}, [c], { timeoutMs: t.workerTimeoutMs });
		if (this._mode === "worker") {
			let e = l;
			this.parsedWorkbook = e.workbook, e.usage && i?.(e.usage);
		} else {
			let { workbookJson: e, usage: t } = l;
			t && i?.(t), this.parsedWorkbook = JSON.parse(new TextDecoder().decode(new Uint8Array(e)));
		}
		let u = this.parsedWorkbook;
		if (!u) throw Error("XLSX worker returned no workbook metadata");
		this.cjkFallback = Gt(u, this.cjkFallback), this.ensureWorksheetPullClient();
		let d = u.workbook.parseError;
		d && console.warn(`[ooxml] xlsx opened with a degraded part: ${d}`), this.officeFontRequests = Kt(u), t.useGoogleFonts && (this.googleFontNames = [...Wt(u, this.cjkFallback)]), typeof document < "u" && document.fonts && await this.retainFontsInSet(document.fonts);
	}
	async _loadDelimitedText(e, t, n, r) {
		let i = this.requireBridge();
		this.delimitedTextBacked = !0, this.resourcePolicy = n, this.workerTimeoutMs = t.workerTimeoutMs, this.googleSubstitutes = t.useGoogleFonts === !0, this.cjkFallback = We(t.cjkFallback), this.generation++, this.math = this._mode === "worker" ? void 0 : t.math, this.threeD = this._mode === "worker" ? void 0 : t.threeD, this.regionMap = this._mode === "worker" ? void 0 : t.regionMap, this.chartEx = this._mode === "worker" ? void 0 : t.chartEx, this.tiff = this._mode === "worker" ? void 0 : t.tiff;
		let a = this._mode === "worker" ? ht(t) : void 0, o = await i.request((n) => ({
			type: "parseDelimitedText",
			id: n,
			data: e,
			options: r,
			useGoogleFonts: !!t.useGoogleFonts,
			cjkFallback: this.cjkFallback,
			renderers: a
		}), [e], { timeoutMs: t.workerTimeoutMs }), s = JSON.parse(new TextDecoder().decode(o.worksheetJson)), c = o.workbook.workbook.sheets;
		if (c.length !== 1 || c[0]?.name !== s.name) throw Error("Delimited text worker returned inconsistent worksheet metadata");
		let l = kt(s);
		if (Mt(l, "load-delimited-text", void 0), Tt(l.jsonBytes, "load-delimited-text", void 0), xt(l, "load-delimited-text", void 0), this.parsedWorkbook = o.workbook, this.cjkFallback = Gt(o.workbook, this.cjkFallback), this.sheetCache.set(0, s), this.retainedSheetUsage = l, this.officeFontRequests = Kt(o.workbook), t.useGoogleFonts && (this.googleFontNames = [...Wt(o.workbook, this.cjkFallback)]), typeof document < "u" && document.fonts) {
			await this.retainFontsInSet(document.fonts), await this.retainWorksheetOfficeFonts(s);
			let e = this.retainedFontSets.get(document.fonts)?.loaded?.office;
			Ei(s, e?.routes, this.googleSubstitutes);
		}
	}
	async retainFontsInSet(e) {
		if (this.fontsDestroyed) return () => void 0;
		let t = this.retainedFontSets.get(e);
		if (t) t.refs++;
		else {
			let n = Promise.all([Re(this.googleFontNames, Ht, e), ze(this.officeFontRequests, e)]).then(([e, t]) => ({
				google: e,
				office: t
			}));
			t = {
				refs: 1,
				loaded: null,
				loading: n
			}, this.retainedFontSets.set(e, t), n.then((e) => {
				t.loaded = e, this.fontsDestroyed && (Be(e.google), Le(e.office.faces));
			});
		}
		await t.loading;
		let n = !1;
		return () => {
			if (n) return;
			n = !0;
			let r = this.retainedFontSets.get(e);
			r === t && (r.refs--, !(r.refs > 0) && (this.retainedFontSets.delete(e), r.loaded ? (Be(r.loaded.google), Le(r.loaded.office.faces)) : r.loading.then((e) => {
				Be(e.google), Le(e.office.faces);
			})));
		};
	}
	async retainWorksheetOfficeFonts(e) {
		let t = qt(e).filter((e) => !this.officeFontRequests.some((t) => zt(t) === zt(e)));
		t.length !== 0 && (this.officeFontRequests.push(...t), await Promise.all([...this.retainedFontSets].map(async ([e, n]) => {
			let r = await n.loading, i = await ze(t, e);
			if (this.fontsDestroyed || this.retainedFontSets.get(e) !== n || n.refs <= 0) Le(i.faces);
			else {
				r.office.faces.push(...i.faces);
				let e = new Set(r.office.checked);
				for (let t of i.checked) e.has(t) || (e.add(t), r.office.checked.push(t));
				Object.assign(r.office.routes, i.routes);
			}
		})));
	}
	async [bs](e) {
		return await this.retainFontsInSet(e.fonts);
	}
	[xs](e, t) {
		if (!this.parsedWorkbook) return;
		let n = N(t.canvas) ? t.canvas.ownerDocument.fonts : null;
		wi(t, e, n ? this.retainedFontSets.get(n)?.loaded?.office.routes : void 0, this.googleSubstitutes), Q(e), Wa(t, e, this.parsedWorkbook.styles, this.cjkFallback);
	}
	get sheetNames() {
		return this.parsedWorkbook?.workbook.sheets.map((e) => e.name) ?? [];
	}
	get sheetCount() {
		return this.parsedWorkbook?.workbook.sheets.length ?? 0;
	}
	get tabColors() {
		return this.parsedWorkbook?.workbook.sheets.map((e) => e.tabColor ?? null) ?? [];
	}
	sheetVisibility(e) {
		return Qt(this.parsedWorkbook?.workbook.sheets ?? [], e);
	}
	isHidden(e) {
		return this.sheetVisibility(e) !== "visible";
	}
	async getWorksheet(e) {
		this.assertResourceHealthy();
		let t = this.sheetCache.get(e);
		if (t) return t;
		let n = this.sheetLoads.get(e);
		if (n) return n;
		let r = this.loadWorksheet(e);
		this.sheetLoads.set(e, r);
		try {
			return await r;
		} finally {
			this.sheetLoads.get(e) === r && this.sheetLoads.delete(e);
		}
	}
	async getComments(e) {
		let t = await this.getWorksheet(e);
		return structuredClone(t.comments ?? []);
	}
	async getResourceMetrics() {
		let e = this.metrics;
		if (!e) throw Error("Workbook not loaded");
		if (this.delimitedTextBacked) {
			let t = e.current();
			if (!t) throw Error("OOXML resource metrics are not ready");
			return t;
		}
		return v(e, async (e) => (await this.requireBridge().request((e) => ({
			type: "resourceUsage",
			id: e
		}), void 0, { timeoutMs: e })).usage);
	}
	async loadWorksheet(e) {
		if (!this.parsedWorkbook) throw Error("Workbook not loaded");
		let t = this.parsedWorkbook.workbook.sheets[e];
		if (!t) throw Error(`Sheet index ${e} out of range`);
		return this.runArchiveOperation(() => this.loadWorksheetStream(e, t.name));
	}
	async loadWorksheetStream(e, t) {
		let n = this.ensureWorksheetPullClient(), r = [], i = {
			rows: 0,
			cells: 0,
			ownedUtf8Bytes: 0
		}, a, o;
		try {
			for await (let s of n.stream(e, t)) {
				if (s.kind === "rows") {
					let e = At(i, Ct(s.rows));
					Mt(e, "get-worksheet", void 0, s.usage), r.push(...s.rows), i = e;
					continue;
				}
				let e = s.worksheet;
				e.rows = e.parseError ? [] : r;
				let t = St(e, e.parseError ? {
					rows: 0,
					cells: 0,
					ownedUtf8Bytes: 0
				} : i);
				Mt(t, "get-worksheet", void 0, s.usage), Tt(t.jsonBytes, "get-worksheet", void 0, s.usage);
				let n = Ot(this.retainedSheetUsage ?? {
					rows: 0,
					cells: 0,
					ownedUtf8Bytes: 0,
					jsonBytes: 0
				}, t);
				xt(n, "get-worksheet", void 0, s.usage), a = e, o = n;
			}
			if (!a || !o) throw Error(`XLSX worksheet ${e} did not produce a terminal model`);
			this.retainedSheetUsage = o, await this.retainWorksheetOfficeFonts(a), this.sheetCache.set(e, a);
			let s = typeof document < "u" ? this.retainedFontSets.get(document.fonts)?.loaded?.office : void 0;
			return Ei(a, s?.routes, this.googleSubstitutes), a;
		} catch (e) {
			throw e instanceof j && (this.resourceFailure ??= e), e;
		}
	}
	ensureWorksheetPullClient() {
		if (this.worksheetPullClient) return this.worksheetPullClient;
		if (!this.parsedWorkbook) throw Error("Workbook not loaded");
		return this.worksheetPullClient = new jt({
			generation: this.generation || 1,
			transport: this.requireBridge().transport(Dt),
			sharedStrings: this.parsedWorkbook.sharedStrings,
			timeoutMs: this.workerTimeoutMs,
			open: async (e, t, n, r) => {
				await this.requireBridge().request((r) => ({
					type: "openSheetSession",
					id: r,
					sheetIndex: e,
					sheetName: t,
					...n
				}), void 0, { timeoutMs: r });
			}
		}), this.worksheetPullClient;
	}
	runArchiveOperation(e) {
		let t = async () => {
			this.assertResourceHealthy();
			try {
				return await e();
			} catch (e) {
				throw e instanceof j && (this.resourceFailure ??= e), e;
			}
		}, n = (this.archiveOperationTail ?? Promise.resolve()).then(t, t);
		return this.archiveOperationTail = n.then(() => void 0, () => void 0), n;
	}
	async getImage(e, t) {
		this.assertResourceHealthy(), this.requireArchiveBridge();
		let n = this.queuedImageLoads?.get(e);
		if (n) return n;
		let r = this.runArchiveOperation(() => this.getImageWithinArchiveOperation(e, t));
		return this.queuedImageLoads ??= /* @__PURE__ */ new Map(), this.queuedImageLoads.set(e, r), r.finally(() => {
			this.queuedImageLoads.get(e) === r && this.queuedImageLoads.delete(e);
		}).catch(() => void 0), r;
	}
	getImageWithinArchiveOperation(e, t) {
		return this.rawParts.get(e, t, () => this.requestImage(e, t));
	}
	requestImage(e, t) {
		return this.requireArchiveBridge().request((t) => ({
			type: "extractImage",
			id: t,
			path: e
		})).then((e) => {
			let n = e.bytes;
			return new Blob([n], { type: t });
		});
	}
	async toMarkdown() {
		return this.assertResourceHealthy(), (await this.runArchiveOperation(() => this.requireArchiveBridge().request((e) => ({
			type: "toMarkdown",
			id: e
		})))).markdown;
	}
	async resolveValidationList(e, t) {
		if (this.assertResourceHealthy(), !this.parsedWorkbook) throw Error("Workbook not loaded");
		let n = ss(t);
		if (n.kind !== "range") return cs(n, () => null);
		let r = e;
		if (n.sheet) {
			let e = this.sheetNames.findIndex((e) => e.toLowerCase() === n.sheet?.toLowerCase());
			if (e < 0) return {
				kind: "formula",
				formula: t ?? ""
			};
			r = e;
		}
		let i = await this.getWorksheet(r), a = this.parsedWorkbook.styles, o = /* @__PURE__ */ new Map();
		for (let e of i.rows) for (let t of e.cells) o.set(`${t.row}:${t.col}`, t);
		return cs(n, (e, t) => {
			let n = o.get(`${e}:${t}`);
			return n ? zn(n, a, null, i.date1904) : null;
		});
	}
	cellText(e, t) {
		return this.parsedWorkbook ? zn(t, this.parsedWorkbook.styles, null, e.date1904) : "";
	}
	async renderViewport(e, t, n, r = {}) {
		if (this.assertResourceHealthy(), this._mode === "worker") throw Error("renderViewport(canvas) is unavailable in mode: 'worker'; use renderViewportToBitmap() and paint it via an ImageBitmapRenderingContext");
		if (!this.parsedWorkbook) throw Error("Workbook not loaded");
		let i = this.parsedWorkbook.styles, a = ms(r), { sizeOverrides: o, ...s } = a.opts, c = N(e) ? e.ownerDocument.fonts : typeof document < "u" ? document.fonts : null;
		return this.withWorksheetArchiveOperation(t, (t) => {
			let r = a.worksheet ?? ds(t, o);
			return r !== t && Qa(t, r), rs({
				ws: r,
				styles: i,
				cjkFallback: this.cjkFallback,
				math: this.math,
				threeD: this.threeD,
				regionMap: this.regionMap,
				chartEx: this.chartEx,
				tiff: this.tiff
			}, e, n, {
				...s,
				authoritativeMdw: a.layoutMetrics?.maximumDigitWidth,
				officeFontRoutes: c ? this.retainedFontSets.get(c)?.loaded?.office.routes : void 0,
				googleSubstitutes: this.googleSubstitutes,
				fetchImage: this._fetchImage
			});
		});
	}
	async renderViewportToBitmap(e, n, r) {
		this.assertResourceHealthy();
		let i = ms(r), a = {
			...i.opts,
			dpr: r.dpr ?? t()
		};
		if (this._mode === "worker") {
			if (!Number.isInteger(e) || e < 0 || e >= this.sheetCount) throw Error(`Sheet index ${e} out of range (count: ${this.sheetCount})`);
			return (await this.withWorksheetArchiveOperation(e, () => this.requireBridge().request((t) => ({
				type: "renderViewport",
				id: t,
				sheetIndex: e,
				viewport: n,
				opts: a,
				layoutMetrics: i.layoutMetrics,
				viewProjection: i.projection
			})))).bitmap;
		}
		let o = new OffscreenCanvas(1, 1);
		return await this.renderViewport(o, e, n, a), o.transferToImageBitmap();
	}
	[Ss](e) {
		this._mode === "worker" && this.requireBridge().post({
			type: "releaseViewProjection",
			projectionId: e
		});
	}
	withWorksheetArchiveOperation(e, t) {
		let n = this.sheetCache.get(e);
		if (n) return this.runArchiveOperation(() => t(n));
		let r = this.sheetLoads.get(e);
		if (r) return this.runArchiveOperation(async () => t(await r));
		if (!this.parsedWorkbook) return Promise.reject(/* @__PURE__ */ Error("Workbook not loaded"));
		let i = this.parsedWorkbook.workbook.sheets[e];
		if (!i) return Promise.reject(/* @__PURE__ */ Error(`Sheet index ${e} out of range`));
		let a, o, s = new Promise((e, t) => {
			a = e, o = t;
		});
		return s.catch(() => void 0), this.sheetLoads.set(e, s), this.runArchiveOperation(async () => {
			try {
				let n = await this.loadWorksheetStream(e, i.name);
				return a(n), await t(n);
			} catch (e) {
				throw o(e), e;
			} finally {
				this.sheetLoads.get(e) === s && this.sheetLoads.delete(e);
			}
		});
	}
	destroy() {
		this.generation = (this.generation ?? 1) + 1, this.worksheetPullClient?.cancelAll("closed").catch(() => void 0), this.worksheetPullClient = null, this.bridge?.terminate(), this.bridge = null, this.parsedWorkbook = null, this.sheetCache.clear(), this.sheetLoads.clear(), this.fontsDestroyed = !0;
		for (let e of this.retainedFontSets.values()) e.loaded && (Be(e.loaded.google), Le(e.loaded.office.faces));
		this.retainedFontSets.clear(), this.googleFontNames = [], this.googleSubstitutes = !1, this.officeFontRequests = [], F(this._fetchImage), z(this._fetchImage), this.rawParts.clear(), this.queuedImageLoads?.clear();
	}
	assertResourceHealthy() {
		if (this.resourceFailure) throw this.resourceFailure;
	}
	requireBridge() {
		if (!this.bridge) throw Error("This operation requires an active workbook worker");
		return this.bridge;
	}
	requireArchiveBridge() {
		if (this.delimitedTextBacked || !this.bridge) throw Error("This operation requires an active archive-backed workbook");
		return this.bridge;
	}
};
//#endregion
//#region packages/xlsx/src/data-validation.ts
function Ts(e, t, n) {
	if (!e) return !1;
	for (let r of e.split(/\s+/)) {
		if (!r) continue;
		let [e, i] = r.split(":"), a = Xr(e);
		if (!a) continue;
		if (!i) {
			if (a.row === t && a.col === n) return !0;
			continue;
		}
		let o = Xr(i);
		if (!o) continue;
		let s = Math.min(a.row, o.row), c = Math.max(a.row, o.row), l = Math.min(a.col, o.col), u = Math.max(a.col, o.col);
		if (t >= s && t <= c && n >= l && n <= u) return !0;
	}
	return !1;
}
function Es(e, t, n) {
	if (!e) return null;
	for (let r of e) if (r.validationType === "list" && Ts(r.sqref, t, n)) return r;
	return null;
}
//#endregion
//#region packages/xlsx/src/internal-hyperlink.ts
function Ds(e) {
	let t = e.trim();
	return t.startsWith("#") && (t = t.slice(1).trim()), t.startsWith("=") && (t = t.slice(1).trim()), t;
}
function Os(e) {
	let t = !1, n = -1;
	for (let r = 0; r < e.length; r++) e[r] === "'" ? t && e[r + 1] === "'" ? r++ : t = !t : e[r] === "!" && !t && (n = r);
	return t ? -1 : n;
}
function ks(e) {
	let t = e.trim();
	return t.length >= 2 && t.startsWith("'") && t.endsWith("'") ? t.slice(1, -1).replace(/''/g, "'") : t;
}
function As(e, t, n) {
	let r = Os(e), i = r >= 0 ? ks(e.slice(0, r)) : void 0, a = (r >= 0 ? e.slice(r + 1) : e).split(":", 1)[0]?.trim() ?? "";
	if (!Xr(a)) return null;
	let o = t;
	if (i !== void 0) {
		let e = i.toLocaleLowerCase("en-US");
		if (o = n.findIndex((t) => t.toLocaleLowerCase("en-US") === e), o < 0) return null;
	}
	return o < 0 || o >= n.length ? null : {
		sheetIndex: o,
		cellRef: a
	};
}
function js(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	for (let e of r) i.set(e.name.toLocaleLowerCase("en-US"), e);
	let a = Ds(e), o = /* @__PURE__ */ new Set();
	for (;;) {
		let e = As(a, t, n);
		if (e) return e;
		let r = a.toLocaleLowerCase("en-US");
		if (!r || o.has(r)) return null;
		o.add(r);
		let s = i.get(r);
		if (!s) return null;
		a = Ds(s.formula);
	}
}
//#endregion
//#region packages/xlsx/src/element-context.ts
function Ms(e, t) {
	let n = t.colAxis.offsetOf(e.fromCol + 1) + e.fromColOff * t.scale / Y, r = t.rowAxis.offsetOf(e.fromRow + 1) + e.fromRowOff * t.scale / Y, i, a;
	if ($r(e)) i = e.nativeExtCx * t.scale / Y, a = e.nativeExtCy * t.scale / Y;
	else {
		let o = t.colAxis.offsetOf(e.toCol + 1) + e.toColOff * t.scale / Y, s = t.rowAxis.offsetOf(e.toRow + 1) + e.toRowOff * t.scale / Y;
		i = o - n, a = s - r;
	}
	if (i <= 0 || a <= 0) return null;
	let o = t.colAxis.offsetOf(t.startCol), s = t.rowAxis.offsetOf(t.startRow);
	return {
		x: Pi(t.scrollAreaX + (n - o) - t.scrollOffsetX, i, t.canvasWidth, t.rtl),
		y: t.scrollAreaY + (r - s) - t.scrollOffsetY,
		width: i,
		height: a
	};
}
function Ns(e, t) {
	return e.x >= t.x && e.x <= t.x + t.width && e.y >= t.y && e.y <= t.y + t.height;
}
function Ps(e, t) {
	let n = Pi(t.scrollAreaX, t.scrollAreaW, t.canvasWidth, t.rtl);
	return e.x + e.width >= n && e.x <= n + t.scrollAreaW && e.y + e.height >= t.scrollAreaY && e.y <= t.scrollAreaY + t.scrollAreaH;
}
function Fs(e, t) {
	let n = Pi(t.scrollAreaX, t.scrollAreaW, t.canvasWidth, t.rtl);
	return e.x >= n && e.x <= n + t.scrollAreaW && e.y >= t.scrollAreaY && e.y <= t.scrollAreaY + t.scrollAreaH;
}
function Is(e, t) {
	let n = Q(e), r = t.cellScale, { col: i, row: a } = n.axesAtScale(r), o = Math.round(50 * r), s = Math.round(22 * r), c = i.bandsToCover(1, t.freezeCols, Math.max(0, t.width - o)), l = a.bandsToCover(1, t.freezeRows, Math.max(0, t.height - s)), u = c.reduce((e, t) => e + t.size, 0), d = l.reduce((e, t) => e + t.size, 0);
	return {
		colAxis: i,
		rowAxis: a,
		scale: r,
		startRow: t.viewport.row,
		startCol: t.viewport.col,
		scrollOffsetX: t.scrollOffsetX * r,
		scrollOffsetY: t.scrollOffsetY * r,
		scrollAreaX: o + u,
		scrollAreaY: s + d,
		scrollAreaW: Math.max(0, t.width - o - u),
		scrollAreaH: Math.max(0, t.height - s - d),
		rtl: e.rightToLeft === !0,
		canvasWidth: t.width
	};
}
function Ls(e, t, n) {
	let r = Is(e, n), i, a = 0;
	if (i = t.elementType === "chart" ? e.charts[t.elementIndex] : t.elementType === "image" ? e.images[t.elementIndex] : (e.shapeGroups ?? [])[t.elementIndex], !i) return null;
	let o = Ms(i, r);
	if (!o || !Ps(o, r)) return null;
	if (t.elementType === "shape") {
		let n = (e.shapeGroups ?? [])[t.elementIndex], r = t.shapeIndex === void 0 ? void 0 : n?.shapes[t.shapeIndex];
		r && (o = {
			x: o.x + r.x * o.width,
			y: o.y + r.y * o.height,
			width: r.w * o.width,
			height: r.h * o.height
		}, a = r.rot);
	}
	let s = Pi(r.scrollAreaX, r.scrollAreaW, r.canvasWidth, r.rtl);
	return {
		rect: o,
		clip: {
			x: s,
			y: r.scrollAreaY,
			width: r.scrollAreaW,
			height: r.scrollAreaH
		},
		rotation: a
	};
}
function Rs(e) {
	return {
		from: {
			row: e.fromRow + 1,
			col: e.fromCol + 1,
			offsetX: e.fromColOff,
			offsetY: e.fromRowOff
		},
		to: {
			row: e.toRow + 1,
			col: e.toCol + 1,
			offsetX: e.toColOff,
			offsetY: e.toRowOff
		}
	};
}
function zs(e, t) {
	let n = Math.min(e.length, t);
	if (n > 0 && n < e.length) {
		let t = e.charCodeAt(n - 1), r = e.charCodeAt(n);
		t >= 55296 && t <= 56319 && r >= 56320 && r <= 57343 && n--;
	}
	return e.slice(0, n);
}
function Bs(e, t) {
	if (!e.text) return {
		truncated: !1,
		textCharacters: 0
	};
	let n = [], r = 0, i = !1;
	for (let [a, o] of e.text.paragraphs.entries()) {
		if (a > 0) {
			if (r >= t) {
				i = !0;
				break;
			}
			n.push("\n"), r++;
		}
		for (let e of o.runs) {
			let a = e.type === "text" ? e.text : e.type === "break" ? "\n" : "[equation]", o = zs(a, Math.max(0, t - r));
			if (n.push(o), r += o.length, o.length < a.length) {
				i = !0;
				break;
			}
		}
		if (i) break;
	}
	return {
		text: n.join(""),
		truncated: i,
		textCharacters: r
	};
}
function Vs(e, t, n, r, i, a, o, s) {
	return {
		format: "xlsx",
		kind: "element",
		sheetIndex: t,
		sheetName: e.name,
		elementType: n,
		elementIndex: r,
		anchor: Rs(i),
		...a === void 0 ? {} : { text: a },
		truncated: o,
		truncationReasons: o ? ["text"] : [],
		textCharacters: a?.length ?? 0,
		maxTextCharacters: s
	};
}
function Hs(e, t, n, r, i) {
	for (let a = e.charts.length - 1; a >= 0; a--) {
		let o = e.charts[a], s = Ms(o, r);
		if (!s || !Ps(s, r) || !Ns(n, s)) continue;
		let c = Ce(o.chart, i);
		return {
			...Vs(e, t, "chart", a, o, c.text, c.truncated, c.maxTextCharacters),
			seriesCount: o.chart.series.length
		};
	}
	return null;
}
function Us(e, t, n) {
	let r = {
		x: t.x + n.x * t.width,
		y: t.y + n.y * t.height,
		width: n.w * t.width,
		height: n.h * t.height
	}, i = r.x + r.width / 2, a = r.y + r.height / 2, o = -n.rot * Math.PI / 180, s = e.x - i, c = e.y - a, l = i + Math.cos(o) * s - Math.sin(o) * c, u = a + Math.sin(o) * s + Math.cos(o) * c;
	return n.flipH && (l = 2 * i - l), n.flipV && (u = 2 * a - u), {
		x: l,
		y: u
	};
}
function Ws(e, t, n, r, i) {
	let a = e.shapeGroups ?? [];
	for (let o = a.length - 1; o >= 0; o--) {
		let s = a[o], c = Ms(s, r);
		if (!(!c || !Ps(c, r))) for (let r = s.shapes.length - 1; r >= 0; r--) {
			let a = s.shapes[r];
			if (!Ns(Us(n, c, a), {
				x: c.x + a.x * c.width,
				y: c.y + a.y * c.height,
				width: a.w * c.width,
				height: a.h * c.height
			})) continue;
			let l = Bs(a, i);
			return {
				...Vs(e, t, "shape", o, s, l.text, l.truncated, i),
				shapeIndex: r,
				shapeCount: s.shapes.length,
				...a.geom.type === "image" ? { mimeType: a.geom.mimeType } : {}
			};
		}
	}
	return null;
}
function Gs(e, t, n, r, i) {
	for (let a = e.images.length - 1; a >= 0; a--) {
		let o = e.images[a], s = Ms(o, r);
		if (!(!s || !Ps(s, r) || !Ns(n, s))) return {
			...Vs(e, t, "image", a, o, void 0, !1, i),
			mimeType: o.svgImagePath ? "image/svg+xml" : o.mimeType
		};
	}
	return null;
}
function Ks(e, t, n, r, i = Ne) {
	if (!Number.isFinite(n.x) || !Number.isFinite(n.y)) throw RangeError("XLSX hit-test point must contain finite coordinates.");
	if (!Number.isFinite(i) || i < 0) throw RangeError("maxTextCharacters must be a finite non-negative number.");
	let a = Math.min(Ne, Math.floor(i)), o = Is(e, r);
	return Fs(n, o) ? Hs(e, t, n, o, a) ?? Ws(e, t, n, o, a) ?? Gs(e, t, n, o, a) : null;
}
function qs(e, t) {
	let n = t ?? e.maxTextCharacters;
	if (!Number.isFinite(n) || n < 0) throw RangeError("maxTextCharacters must be a finite non-negative number.");
	let r = Math.min(Ne, Math.floor(n)), i = e.text === void 0 ? void 0 : zs(e.text, r), a = e.truncated || e.text !== void 0 && i.length < e.text.length;
	return {
		...structuredClone(e),
		...i === void 0 ? {} : { text: i },
		truncated: a,
		truncationReasons: a ? ["text"] : [],
		textCharacters: i?.length ?? 0,
		maxTextCharacters: r
	};
}
//#endregion
//#region packages/xlsx/src/selection.ts
var Js = 128, Ys = 1e4, Xs = 8 * 1024 * 1024;
function Zs(e) {
	return e.areas.reduce((e, t) => e + (t.kind === "cells" ? (t.bottom - t.top + 1) * (t.right - t.left + 1) : t.kind === "rows" ? (t.lastRow - t.firstRow + 1) * Z : t.kind === "columns" ? (t.lastColumn - t.firstColumn + 1) * Jr : Jr * Z), 0);
}
function Qs(e, t) {
	return Number.isInteger(e) && e >= 1 && e <= t;
}
function $s(e) {
	switch (e.kind) {
		case "cells":
			if (!Qs(e.top, 1048576) || !Qs(e.bottom, 1048576) || !Qs(e.left, 16384) || !Qs(e.right, 16384)) throw RangeError("Cell selection bounds must be inside the XLSX grid.");
			return {
				kind: "cells",
				top: Math.min(e.top, e.bottom),
				left: Math.min(e.left, e.right),
				bottom: Math.max(e.top, e.bottom),
				right: Math.max(e.left, e.right)
			};
		case "rows":
			if (!Qs(e.firstRow, 1048576) || !Qs(e.lastRow, 1048576)) throw RangeError("Row selection bounds must be inside the XLSX grid.");
			return {
				kind: "rows",
				firstRow: Math.min(e.firstRow, e.lastRow),
				lastRow: Math.max(e.firstRow, e.lastRow)
			};
		case "columns":
			if (!Qs(e.firstColumn, 16384) || !Qs(e.lastColumn, 16384)) throw RangeError("Column selection bounds must be inside the XLSX grid.");
			return {
				kind: "columns",
				firstColumn: Math.min(e.firstColumn, e.lastColumn),
				lastColumn: Math.max(e.firstColumn, e.lastColumn)
			};
		case "sheet": return { kind: "sheet" };
	}
}
function ec(e, t) {
	switch (e.kind) {
		case "cells": return t.row >= e.top && t.row <= e.bottom && t.col >= e.left && t.col <= e.right;
		case "rows": return t.row >= e.firstRow && t.row <= e.lastRow;
		case "columns": return t.col >= e.firstColumn && t.col <= e.lastColumn;
		case "sheet": return !0;
	}
}
function tc(e, t) {
	if (!Qs(e.row, 1048576) || !Qs(e.col, 16384)) throw RangeError(`${t} must be inside the XLSX grid.`);
	return {
		row: e.row,
		col: e.col
	};
}
function nc(e) {
	if (!Array.isArray(e.areas) || e.areas.length === 0) throw TypeError("A selection must contain at least one area.");
	if (e.areas.length > 128) throw RangeError("A selection may contain at most 128 areas.");
	if (!Number.isInteger(e.activeAreaIndex) || e.activeAreaIndex < 0 || e.activeAreaIndex >= e.areas.length) throw RangeError("activeAreaIndex must identify an area in the selection.");
	let t = e.areas.map($s), n = [], r = /* @__PURE__ */ new Map(), i = 0;
	for (let a = 0; a < t.length; a++) {
		let o = t[a], s = o.kind === "cells" ? `c:${o.top}:${o.left}:${o.bottom}:${o.right}` : o.kind === "rows" ? `r:${o.firstRow}:${o.lastRow}` : o.kind === "columns" ? `k:${o.firstColumn}:${o.lastColumn}` : "s", c = r.get(s);
		c === void 0 && (c = n.length, r.set(s, c), n.push(o)), a === e.activeAreaIndex && (i = c);
	}
	let a = tc(e.activeCell, "activeCell"), o = tc(e.extensionAnchor, "extensionAnchor"), s = n[i];
	if (!ec(s, a)) throw RangeError("activeCell must be inside the active selection area.");
	if (!ec(s, o)) throw RangeError("extensionAnchor must be inside the active selection area.");
	return {
		areas: n,
		activeAreaIndex: i,
		activeCell: a,
		extensionAnchor: o
	};
}
function rc(e) {
	let t = 0;
	for (let n of e) t = t * 26 + n.charCodeAt(0) - 64;
	return t >= 1 && t <= 16384 ? t : null;
}
function ic(e) {
	let t = e.trim().toUpperCase(), n = /^\$?(\d+):\$?(\d+)$/.exec(t);
	if (n) {
		let e = Number(n[1]), t = Number(n[2]);
		if (!Qs(e, 1048576) || !Qs(t, 1048576)) return null;
		let r = Math.min(e, t);
		return {
			areas: [{
				kind: "rows",
				firstRow: r,
				lastRow: Math.max(e, t)
			}],
			activeAreaIndex: 0,
			activeCell: {
				row: r,
				col: 1
			},
			extensionAnchor: {
				row: r,
				col: 1
			}
		};
	}
	let r = /^\$?([A-Z]+):\$?([A-Z]+)$/.exec(t);
	if (r) {
		let e = rc(r[1]), t = rc(r[2]);
		if (e === null || t === null) return null;
		let n = Math.min(e, t);
		return {
			areas: [{
				kind: "columns",
				firstColumn: n,
				lastColumn: Math.max(e, t)
			}],
			activeAreaIndex: 0,
			activeCell: {
				row: 1,
				col: n
			},
			extensionAnchor: {
				row: 1,
				col: n
			}
		};
	}
	let i = t.split(":");
	if (i.length > 2) return null;
	let a = Xr(i[0]), o = i.length === 2 ? Xr(i[1]) : a;
	if (!a || !o) return null;
	let s = {
		kind: "cells",
		top: Math.min(a.row, o.row),
		left: Math.min(a.col, o.col),
		bottom: Math.max(a.row, o.row),
		right: Math.max(a.col, o.col)
	}, c = {
		row: s.top,
		col: s.left
	};
	return {
		areas: [s],
		activeAreaIndex: 0,
		activeCell: c,
		extensionAnchor: c
	};
}
function ac(e, t) {
	return e === t ? !0 : !e || !t || e.activeAreaIndex !== t.activeAreaIndex || e.areas.length !== t.areas.length || e.activeCell.row !== t.activeCell.row || e.activeCell.col !== t.activeCell.col || e.extensionAnchor.row !== t.extensionAnchor.row || e.extensionAnchor.col !== t.extensionAnchor.col ? !1 : e.areas.every((e, n) => JSON.stringify(e) === JSON.stringify(t.areas[n]));
}
//#endregion
//#region packages/xlsx/src/find.ts
var oc = class {
	_matches = [];
	_active = -1;
	_generation = 0;
	constructor(e, t, n) {
		this._sheetCount = e, this._sheetName = t, this._collectSheetCells = n;
	}
	invalidate() {
		this._generation++, this._matches = [], this._active = -1;
	}
	sheetHighlights(e) {
		let t = [];
		for (let n = 0; n < this._matches.length; n++) {
			let r = this._matches[n];
			r.sheet === e && t.push(q({
				row: r.row,
				col: r.col,
				active: n === this._active
			}, r.color));
		}
		return t;
	}
	activeLocation() {
		return this._locationAt(this._active);
	}
	_locationAt(e) {
		let t = this._matches[e];
		return t ? {
			sheet: t.sheet,
			sheetName: t.sheetName,
			ref: Zr(t.row, t.col),
			row: t.row,
			col: t.col
		} : null;
	}
	matches() {
		return this._matches.map((e, t) => {
			let n = this._locationAt(t);
			return q({
				matchIndex: t,
				text: e.text,
				location: n
			}, e.color);
		});
	}
	async find(e, t = {}) {
		let n = ++this._generation;
		if (Te(e).length === 0) return this._matches = [], this._active = -1, [];
		let r = this._sheetCount(), i = [];
		for (let a = 0; a < r; a++) {
			let r;
			try {
				r = await this._collectSheetCells(a);
			} catch (e) {
				if (n !== this._generation) return [];
				throw e;
			}
			if (n !== this._generation) return [];
			let o = this._sheetName(a);
			for (let n of r) {
				let r = Ee(Ae([{ text: n.text }]), e, t);
				for (let e of r) {
					let t = e.slices[0], r = n.text.slice(t.start, t.end);
					i.push(q({
						sheet: a,
						sheetName: o,
						row: n.row,
						col: n.col,
						text: r
					}, e.color));
				}
			}
		}
		return n === this._generation ? (this._matches = i, this._active = -1, this.matches()) : [];
	}
	next() {
		return this._active = we(this._active, this._matches.length), this._activePublic();
	}
	prev() {
		return this._active = je(this._active, this._matches.length), this._activePublic();
	}
	_activePublic() {
		let e = this._locationAt(this._active);
		if (!e) return null;
		let t = this._matches[this._active];
		return q({
			matchIndex: this._active,
			text: t.text,
			location: e
		}, t.color);
	}
};
function sc(e) {
	let { cell: t, popup: n, viewport: r, rtl: i } = e, a = t.x + t.w + 8, o = t.x - 8 - n.w, s = a + n.w <= r.w, c = o >= 0, l;
	l = i ? c ? o : s ? a : o : s ? a : c ? o : a, l = Math.max(0, Math.min(l, r.w - n.w));
	let u = t.y;
	return u = Math.max(0, Math.min(u, r.h - n.h)), {
		left: l,
		top: u
	};
}
function cc(e) {
	return 8 + (e - 1) * 14;
}
function lc(e) {
	return e > 0 ? (e + 1) * 19 : 0;
}
function uc(e, t, n, r, i, a, o, s, c = !1) {
	if (e === "row") {
		let e = Math.min(s, i + a), c = Math.min(s, i), l = s;
		return r > 0 && n <= r ? l = e : r > 0 && t > r && (c = e), {
			x: 0,
			y: c,
			w: o,
			h: Math.max(0, l - c)
		};
	}
	if (!c) {
		let e = Math.min(o, i + a), c = Math.min(o, i), l = o;
		return r > 0 && n <= r ? l = e : r > 0 && t > r && (c = e), {
			x: c,
			y: 0,
			w: Math.max(0, l - c),
			h: s
		};
	}
	let l = Math.max(0, o - i), u = Math.max(0, l - a), d = 0, f = l;
	return r > 0 && n <= r ? d = u : r > 0 && t > r && (f = u), {
		x: d,
		y: 0,
		w: Math.max(0, f - d),
		h: s
	};
}
function dc(e, t, n, r, i) {
	let a = Math.min(n, r), o = Math.max(n, r);
	return e === "row" ? [{
		x1: t,
		y1: a,
		x2: t,
		y2: o
	}, {
		x1: t,
		y1: n,
		x2: t + i / 2,
		y2: n
	}] : [{
		x1: a,
		y1: t,
		x2: o,
		y2: t
	}, {
		x1: n,
		y1: t,
		x2: n,
		y2: t + i / 2
	}];
}
function fc(e, t) {
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = 0, a = 0;
	for (let t of e) t.level > 0 && n.set(t.index, t.level), t.collapsed && r.set(t.index, !0), t.index > i && (i = t.index), t.level > a && (a = t.level);
	let o = i, s = [];
	if (a === 0) return {
		maxLevel: 0,
		groups: s
	};
	let c = (e) => n.get(e) ?? 0;
	for (let e = 1; e <= a; e++) {
		let n = null;
		for (let i = 1; i <= o + 1; i++) c(i) >= e ? n ? n.end = i : n = {
			start: i,
			end: i
		} : n &&= (s.push(pc(e, n, t, r, c)), null);
		n && s.push(pc(e, n, t, r, c));
	}
	return {
		maxLevel: a,
		groups: s
	};
}
function pc(e, t, n, r, i) {
	let a = null;
	if (n) {
		let n = t.end + 1;
		n >= 1 && i(n) < e && (a = n);
	} else {
		let n = t.start - 1;
		n >= 1 && i(n) < e && (a = n);
	}
	let o = a != null && (r.get(a) ?? !1);
	return {
		level: e,
		start: t.start,
		end: t.end,
		summary: a,
		collapsed: o
	};
}
function mc(e, t) {
	let n = !e.collapsed, r = /* @__PURE__ */ new Map();
	for (let e of t) r.set(e.index, e);
	let i = [], a = [];
	if (n) for (let t = e.start; t <= e.end; t++) i.push(t);
	else {
		let n = /* @__PURE__ */ new Set();
		for (let r of t) r.index >= e.start && r.index <= e.end && r.collapsed && n.add(r.index);
		for (let t = e.start; t <= e.end; t++) hc(t, e, r, n) || a.push(t);
	}
	return {
		hide: i,
		show: a,
		nowCollapsed: n
	};
}
function hc(e, t, n, r) {
	let i = n.get(e)?.level ?? 0;
	if (i <= t.level) return !1;
	for (let e of r) {
		let r = n.get(e)?.level ?? 0;
		if (!(r >= i) && !(r < t.level)) return !0;
	}
	return !1;
}
function gc(e, t) {
	let n = [], r = [];
	for (let i of e) i.level >= t ? n.push(i.index) : r.push(i.index);
	return {
		hide: n,
		show: r
	};
}
function _c(e) {
	let t = [];
	for (let n of e.rows) {
		let e = n.outlineLevel ?? 0, r = n.collapsed ?? !1;
		e === 0 && !r || t.push({
			index: n.index,
			level: e,
			collapsed: r,
			hidden: n.hidden ?? !1
		});
	}
	return t;
}
function vc(e) {
	let t = e.colOutlineLevels ?? {}, n = e.colCollapsed ?? {}, r = e.colHidden ?? {}, i = /* @__PURE__ */ new Set();
	for (let e of Object.keys(t)) i.add(Number(e));
	for (let e of Object.keys(n)) i.add(Number(e));
	let a = [];
	for (let e of [...i].sort((e, t) => e - t)) a.push({
		index: e,
		level: t[e] ?? 0,
		collapsed: n[e] ?? !1,
		hidden: r[e] ?? !1
	});
	return a;
}
function yc(e, t) {
	let n = e.outlinePr;
	return n ? t === "row" ? n.summaryBelow : n.summaryRight : !0;
}
//#endregion
//#region packages/xlsx/src/internal/sheet-viewer-runtime.ts
var bc = class {
	owner = new xe("SheetAcquisition");
	get current() {
		return this.owner.current;
	}
	async replace(e, t) {
		return await this.owner.replace(e, t);
	}
	install(e, t = !0) {
		this.owner.install(e, t);
	}
	destroy() {
		this.owner.close();
	}
};
function xc(e) {
	return {
		...e,
		rows: e.rows.map((e) => ({ ...e })),
		rowHeights: { ...e.rowHeights },
		colWidths: { ...e.colWidths },
		colCollapsed: e.colCollapsed ? { ...e.colCollapsed } : void 0
	};
}
var Sc = class {
	offsetX = 0;
	offsetY = 0;
	contentWidth = 0;
	contentHeight = 0;
	viewportWidth = 0;
	viewportHeight = 0;
	constructor(e) {
		this.scaleValue = e;
	}
	get x() {
		return this.offsetX;
	}
	get y() {
		return this.offsetY;
	}
	get scale() {
		return this.scaleValue;
	}
	get maxX() {
		return Math.max(0, this.contentWidth - this.viewportWidth);
	}
	get maxY() {
		return Math.max(0, this.contentHeight - this.viewportHeight);
	}
	setScale(e) {
		this.scaleValue = e;
	}
	setExtent(e, t) {
		this.contentWidth = Math.max(0, e), this.contentHeight = Math.max(0, t), this.setOffset(this.offsetX, this.offsetY);
	}
	ensureExtent(e, t) {
		this.contentWidth = Math.max(this.contentWidth, Math.max(0, e)), this.contentHeight = Math.max(this.contentHeight, Math.max(0, t));
	}
	setViewportSize(e, t) {
		this.viewportWidth = Math.max(0, e), this.viewportHeight = Math.max(0, t), this.setOffset(this.offsetX, this.offsetY);
	}
	setOffset(e, t) {
		this.offsetX = Math.min(this.maxX, Math.max(0, e)), this.offsetY = Math.min(this.maxY, Math.max(0, t));
	}
	adoptNativeOffset(e, t) {
		this.offsetX = Math.max(0, e), this.offsetY = Math.max(0, t);
	}
	reset() {
		this.offsetX = 0, this.offsetY = 0;
	}
}, Cc = class {
	animationFrame = null;
	activeRender = !1;
	pendingRender = null;
	staticDispatcher;
	frameScheduler;
	generation = 0;
	destroyed = !1;
	constructor(e, t = !1, n) {
		let r = n ?? globalThis;
		this.frameScheduler = typeof r.requestAnimationFrame == "function" && typeof r.cancelAnimationFrame == "function" ? {
			requestAnimationFrame: (e) => r.requestAnimationFrame(e),
			cancelAnimationFrame: (e) => r.cancelAnimationFrame(e)
		} : null, this.staticDispatcher = e ? new De(e, t) : null;
	}
	begin() {
		return this.staticDispatcher ? this.staticDispatcher.begin() : ++this.generation;
	}
	isCurrent(e) {
		return this.staticDispatcher ? this.staticDispatcher.isCurrent(e) : !this.destroyed && e === this.generation;
	}
	commitBitmap(e, t, n, r) {
		if (!this.isCurrent(e)) return t.close(), !1;
		if (!this.staticDispatcher) throw t.close(), Error("SheetRenderDispatcher is not configured for worker bitmap rendering");
		return this.staticDispatcher.commitBitmap(e, t, {
			cssWidth: n,
			cssHeight: r
		});
	}
	schedule(e) {
		if (!this.destroyed) {
			if (this.pendingRender = e, this.activeRender) {
				this.begin();
				return;
			}
			this.animationFrame === null && this.queuePendingRender();
		}
	}
	queuePendingRender() {
		if (!this.frameScheduler) {
			this.startPendingRender();
			return;
		}
		this.animationFrame = this.frameScheduler.requestAnimationFrame(() => {
			this.animationFrame = null, this.startPendingRender();
		});
	}
	startPendingRender() {
		if (this.destroyed || this.activeRender) return;
		let e = this.pendingRender;
		if (this.pendingRender = null, !e) return;
		this.activeRender = !0;
		let t;
		try {
			t = e();
		} catch {
			t = void 0;
		}
		Promise.resolve(t).catch(() => void 0).finally(() => {
			this.activeRender = !1, !this.destroyed && this.pendingRender && this.queuePendingRender();
		});
	}
	destroy() {
		this.destroyed || (this.destroyed = !0, this.pendingRender = null, this.animationFrame !== null && this.frameScheduler && (this.frameScheduler.cancelAnimationFrame(this.animationFrame), this.animationFrame = null), this.staticDispatcher?.destroy(), this.generation++);
	}
}, wc = class {
	state = null;
	dragPointerId = null;
	get anchor() {
		return this.state ? { ...this.state.extensionAnchor } : null;
	}
	get active() {
		return this.state ? { ...this.state.activeCell } : null;
	}
	get mode() {
		let e = this.activeArea;
		return e ? e.kind === "columns" ? "cols" : e.kind === "sheet" ? "all" : e.kind : "cells";
	}
	get dragging() {
		return this.dragPointerId !== null;
	}
	get draggingPointerId() {
		return this.dragPointerId;
	}
	get activeArea() {
		return this.state?.areas[this.state.activeAreaIndex] ?? null;
	}
	beginDrag(e) {
		this.dragPointerId = e;
	}
	endDrag(e) {
		(e === void 0 || e === this.dragPointerId) && (this.dragPointerId = null);
	}
	reset() {
		this.state = null, this.dragPointerId = null;
	}
	setState(e) {
		this.state = e ? nc(e) : null;
	}
	select(e, t = "cells") {
		this.state = nc({
			areas: [t === "rows" ? {
				kind: "rows",
				firstRow: e.row,
				lastRow: e.row
			} : t === "cols" ? {
				kind: "columns",
				firstColumn: e.col,
				lastColumn: e.col
			} : t === "all" ? { kind: "sheet" } : {
				kind: "cells",
				top: e.row,
				left: e.col,
				bottom: e.row,
				right: e.col
			}],
			activeAreaIndex: 0,
			activeCell: e,
			extensionAnchor: e
		});
	}
	add(e, t = "cells") {
		if (!this.state) return this.select(e, t), !0;
		let n = this.state.areas.findIndex((n) => (t === "rows" ? n.kind === "rows" : t === "cols" ? n.kind === "columns" : t === "all" ? n.kind === "sheet" : n.kind === "cells") && ec(n, e));
		if (n >= 0) return this.state = nc({
			...this.state,
			activeAreaIndex: n,
			activeCell: e,
			extensionAnchor: e
		}), !1;
		if (this.state.areas.length >= 128) return !1;
		let r = t === "rows" ? {
			kind: "rows",
			firstRow: e.row,
			lastRow: e.row
		} : t === "cols" ? {
			kind: "columns",
			firstColumn: e.col,
			lastColumn: e.col
		} : t === "all" ? { kind: "sheet" } : {
			kind: "cells",
			top: e.row,
			left: e.col,
			bottom: e.row,
			right: e.col
		}, i = [...this.state.areas, r];
		return this.state = nc({
			areas: i,
			activeAreaIndex: i.length - 1,
			activeCell: e,
			extensionAnchor: e
		}), !0;
	}
	extend(e) {
		if (!this.state) {
			this.select(e);
			return;
		}
		let t = this.state.extensionAnchor, n = this.activeArea;
		if (!n) return;
		let r = n.kind === "rows" ? {
			kind: "rows",
			firstRow: Math.min(t.row, e.row),
			lastRow: Math.max(t.row, e.row)
		} : n.kind === "columns" ? {
			kind: "columns",
			firstColumn: Math.min(t.col, e.col),
			lastColumn: Math.max(t.col, e.col)
		} : n.kind === "sheet" ? n : {
			kind: "cells",
			top: Math.min(t.row, e.row),
			left: Math.min(t.col, e.col),
			bottom: Math.max(t.row, e.row),
			right: Math.max(t.col, e.col)
		}, i = [...this.state.areas];
		i[this.state.activeAreaIndex] = r, this.state = nc({
			...this.state,
			areas: i
		});
	}
	snapshot() {
		return this.state ? structuredClone(this.state) : null;
	}
	headerHighlight() {
		let e = this.activeArea;
		if (!e) return {
			selectedRowRange: null,
			selectedColRange: null
		};
		let t = e.kind === "cells" ? e.top : e.kind === "rows" ? e.firstRow : 1, n = e.kind === "cells" ? e.bottom : e.kind === "rows" ? e.lastRow : 2 ** 53 - 1, r = e.kind === "cells" ? e.left : e.kind === "columns" ? e.firstColumn : 1, i = e.kind === "cells" ? e.right : e.kind === "columns" ? e.lastColumn : 2 ** 53 - 1, a = 2 ** 53 - 1;
		switch (e.kind) {
			case "cells": return {
				selectedRowRange: {
					start: t,
					end: n,
					strong: !1
				},
				selectedColRange: {
					start: r,
					end: i,
					strong: !1
				}
			};
			case "rows": return {
				selectedRowRange: {
					start: t,
					end: n,
					strong: !0
				},
				selectedColRange: {
					start: 1,
					end: a,
					strong: !1
				}
			};
			case "columns": return {
				selectedRowRange: {
					start: 1,
					end: a,
					strong: !1
				},
				selectedColRange: {
					start: r,
					end: i,
					strong: !0
				}
			};
			case "sheet": return {
				selectedRowRange: {
					start: 1,
					end: a,
					strong: !0
				},
				selectedColRange: {
					start: 1,
					end: a,
					strong: !0
				}
			};
		}
	}
}, Tc = class {
	cleanups = [];
	ownerDocument;
	ownerWindow;
	constructor(e, t, n) {
		this.canvas = e, this.area = t, this.input = n, this.ownerDocument = n.ownerDocument ?? document, this.ownerWindow = this.ownerDocument.defaultView;
	}
	on(e, t, n) {
		this.input.addEventListener(e, t, n);
		let r = () => this.input.removeEventListener(e, t, n);
		return this.cleanups.push(r), r;
	}
	get viewportSize() {
		return {
			width: this.input.clientWidth,
			height: this.input.clientHeight
		};
	}
	get dpr() {
		return this.ownerWindow?.devicePixelRatio ?? 1;
	}
	localPoint(e, t) {
		let n = this.area.getBoundingClientRect();
		return {
			x: e - n.left,
			y: t - n.top
		};
	}
	sizeCanvas(e, t, n) {
		let r = this.dpr;
		return e.width = Math.round(t * r), e.height = Math.round(n * r), e.style.width = `${t}px`, e.style.height = `${n}px`, r;
	}
	destroy() {
		for (let e of this.cleanups.splice(0)) e();
	}
}, Ec = class {
	selection;
	find;
	comment;
	commentStatus;
	validation;
	constructor(e, t, n, r) {
		let i = e.ownerDocument ?? document;
		this.selection = i.createElement("div"), this.selection.style.cssText = "position:absolute;top:0;left:0;z-index:1;pointer-events:none;overflow:hidden;width:100%;height:100%;", this.find = i.createElement("div"), this.find.style.cssText = "position:absolute;top:0;left:0;z-index:1;pointer-events:none;overflow:hidden;width:100%;height:100%;", this.comment = i.createElement("div"), this.comment.dataset.ooxmlCommentUi = "popup", this.comment.setAttribute("role", "note"), this.comment.setAttribute("aria-hidden", "true"), this.comment.style.cssText = `position:absolute;z-index:3;pointer-events:none;display:none;max-width:${r.commentMaxWidth}px;max-height:${r.commentMaxHeight}px;overflow:hidden;font:13px/1.45 var(--ooxml-comment-font-family,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif);`, this.commentStatus = i.createElement("div"), this.commentStatus.setAttribute("role", "status"), this.commentStatus.setAttribute("aria-live", "polite"), this.commentStatus.setAttribute("aria-atomic", "true"), this.commentStatus.setAttribute("data-xlsx-comment-status", ""), this.commentStatus.style.cssText = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;", this.validation = i.createElement("div"), this.validation.setAttribute("data-xlsx-validation-panel", ""), this.validation.style.cssText = `position:absolute;z-index:4;pointer-events:auto;display:none;min-width:80px;max-width:${r.validationMaxWidth}px;max-height:${r.validationMaxHeight}px;overflow-y:auto;box-sizing:border-box;background:#fff;border:1px solid #7f7f7f;box-shadow:1px 2px 5px rgba(0,0,0,0.25);font:12px/1.4 sans-serif;color:#222;`, this.validation.addEventListener("wheel", (e) => e.stopPropagation()), e.appendChild(t), e.appendChild(this.selection), e.appendChild(this.find), e.appendChild(n), e.appendChild(this.comment), e.appendChild(this.commentStatus), e.appendChild(this.validation);
	}
	clearSelection() {
		this.selection.textContent = "";
	}
	appendSelection(e) {
		this.selection.appendChild(e);
	}
	clearFind() {
		this.find.textContent = "";
	}
	appendFind(e) {
		this.find.appendChild(e);
	}
	hideComment() {
		this.comment.style.display = "none", this.comment.setAttribute("aria-hidden", "true"), this.commentStatus.textContent = "";
	}
	announceComment(e) {
		this.commentStatus.textContent = e;
	}
	showComment(e, t) {
		this.comment.style.left = `${e}px`, this.comment.style.top = `${t}px`, this.comment.style.display = "block", this.comment.setAttribute("aria-hidden", "false");
	}
	hideValidation() {
		this.validation.style.display = "none";
	}
	showValidation(e, t) {
		this.validation.style.left = `${e}px`, this.validation.style.top = `${t}px`, this.validation.style.display = "block";
	}
};
function Dc(e, t) {
	if (t <= 0) return 0;
	let n = Math.min(40, t / 2);
	return e < n ? -900 * Math.min(1, Math.max(0, (n - e) / n)) : e > t - n ? 900 * Math.min(1, Math.max(0, (e - (t - n)) / n)) : 0;
}
function Oc(e, t, n, r) {
	if (r === "all") return {
		x: 0,
		y: 0
	};
	let i = r === "rows" ? 0 : Dc(e.x, t.width), a = r === "cols" ? 0 : Dc(e.y, t.height);
	return {
		x: n ? -i : i,
		y: a
	};
}
//#endregion
//#region packages/xlsx/src/internal/worksheet-content-bounds.ts
function kc(e) {
	let t = Math.max(50, e.freezeRows ?? 0), n = Math.max(26, e.freezeCols ?? 0);
	for (let r of e.rows) {
		r.index > t && (t = r.index);
		for (let e of r.cells) e.col > n && (n = e.col);
	}
	let r = [
		...e.charts,
		...e.images,
		...e.shapeGroups ?? [],
		...e.slicers ?? []
	];
	for (let e of r) {
		let r = Number.isSafeInteger(e.fromRow) ? e.fromRow + 1 : 0, i = Number.isSafeInteger(e.toRow) ? e.toRow + 1 : 0, a = Number.isSafeInteger(e.fromCol) ? e.fromCol + 1 : 0, o = Number.isSafeInteger(e.toCol) ? e.toCol + 1 : 0;
		t = Math.max(t, r, i), n = Math.max(n, a, o);
	}
	return {
		maxRow: Math.min(Jr, t),
		maxCol: Math.min(Z, n)
	};
}
//#endregion
//#region packages/xlsx/src/viewer.ts
var Ac = Symbol("XlsxViewer.borrowedWorkbook"), jc = Symbol("XlsxViewer.loadSource"), Mc;
function Nc() {
	return Mc ??= import("./comment-ui-runtime-BsK8pmUT.js");
}
var Pc = 150, Fc = 280, Ic = 200, Lc = 240, Rc = 200, zc = 30, Bc = 2, Vc = 50, Hc = 1, Uc = 1, Wc = .45, Gc = "data-xlsx-viewer-styles", Kc = ".xlsx-tab-strip::-webkit-scrollbar{display:none}[data-xlsx-viewport-input]:focus{outline:none}[data-xlsx-viewport-input]:focus-visible{outline:2px solid var(--ooxml-xlsx-focus-ring,transparent);outline-offset:-2px}.xlsx-tab-nav{background:transparent;transition:background 0.1s;}.xlsx-tab-nav:hover{background:color-mix(in srgb,var(--ooxml-xlsx-chrome-text,#444) 8%,transparent);}.xlsx-zoom-slider{-webkit-appearance:none;appearance:none;background:transparent;height:15px;margin:0;}.xlsx-zoom-slider::-webkit-slider-runnable-track{height:4px;background:var(--ooxml-xlsx-chrome-border,#c4c4c4);border-radius:2px;}.xlsx-zoom-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:12px;height:12px;margin-top:-4px;border-radius:50%;background:var(--ooxml-xlsx-chrome-text-muted,#808080);cursor:pointer;}.xlsx-zoom-slider:hover::-webkit-slider-thumb{background:var(--ooxml-xlsx-chrome-text,#5f5f5f);}.xlsx-zoom-slider::-moz-range-track{height:4px;background:var(--ooxml-xlsx-chrome-border,#c4c4c4);border-radius:2px;}.xlsx-zoom-slider::-moz-range-thumb{width:12px;height:12px;border:none;border-radius:50%;background:var(--ooxml-xlsx-chrome-text-muted,#808080);cursor:pointer;}";
function qc(e) {
	if (!e.head || e.head.querySelector(`style[${Gc}]`)) return;
	let t = e.createElement("style");
	t.setAttribute(Gc, ""), t.textContent = Kc, e.head.appendChild(t);
}
var Jc = {
	background: "--ooxml-xlsx-chrome-background",
	surface: "--ooxml-xlsx-chrome-surface",
	mutedSurface: "--ooxml-xlsx-chrome-surface-muted",
	text: "--ooxml-xlsx-chrome-text",
	mutedText: "--ooxml-xlsx-chrome-text-muted",
	border: "--ooxml-xlsx-chrome-border",
	selectedSurface: "--ooxml-xlsx-chrome-selection-background",
	accent: "--ooxml-xlsx-chrome-accent"
};
function Yc(e, t) {
	return Object.keys(Jc).every((n) => e[n] === t[n]);
}
function Xc(e) {
	let t = [...e].sort((e, t) => e.first - t.first || e.last - t.last), n = [];
	for (let e of t) {
		let t = n.at(-1);
		!t || e.first > t.last + 1 ? n.push({ ...e }) : e.last > t.last && (n[n.length - 1] = {
			first: t.first,
			last: e.last
		});
	}
	return n;
}
function Zc(e, t) {
	let n = 0, r = e.length - 1;
	for (; n <= r;) {
		let i = n + r >>> 1, a = e[i];
		if (t < a.first) r = i - 1;
		else if (t > a.last) n = i + 1;
		else return !0;
	}
	return !1;
}
function Qc(e, t, n) {
	let r = 0, i = e.length;
	for (; r < i;) {
		let a = r + i >>> 1;
		n(e[a]) < t ? r = a + 1 : i = a;
	}
	return r;
}
function $c(e, t) {
	for (let n = 1; n < e.length; n++) if (t(e[n - 1]) > t(e[n])) return [...e].sort((e, n) => t(e) - t(n));
	return e;
}
var el = "#1a73e8", tl = 4, nl = 5, rl = 25e4, il = 8 * 1024 * 1024, al = 1 * 1024 * 1024, ol = 65536, sl = 65536, cl = 100;
function ll(e, t) {
	let n = Math.min(e.length, Math.max(0, t));
	if (n > 0 && n < e.length) {
		let t = e.charCodeAt(n - 1), r = e.charCodeAt(n);
		t >= 55296 && t <= 56319 && r >= 56320 && r <= 57343 && n--;
	}
	return e.slice(0, n);
}
function ul(e, t) {
	let n = 0, r = !1;
	for (let t = 0; t < e.length; t++) {
		let i = e.charCodeAt(t);
		i === 34 ? (n++, r = !0) : (i === 9 || i === 10 || i === 13) && (r = !0);
	}
	return e.length + (r ? n + 2 : 0) > t ? null : r ? `"${e.replace(/"/g, "\"\"")}"` : e;
}
function dl(e, t, n, r) {
	for (let { index: i, edge: a } of t) if (!(a <= r) && Math.abs(e - a) <= n) return i;
	return null;
}
function fl(e) {
	return {
		border: `2px solid ${e}`,
		background: `color-mix(in srgb, ${e} 8%, transparent)`
	};
}
function pl(e) {
	let t = [];
	for (let n of e) {
		let e = n.x + n.width, r = n.y + n.height;
		n.top && t.push({
			axis: "h",
			fixed: n.y,
			start: n.x,
			end: e
		}), n.right && t.push({
			axis: "v",
			fixed: e,
			start: n.y,
			end: r
		}), n.bottom && t.push({
			axis: "h",
			fixed: r,
			start: n.x,
			end: e
		}), n.left && t.push({
			axis: "v",
			fixed: n.x,
			start: n.y,
			end: r
		});
	}
	let n = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = `${e.axis}:${e.fixed}`, r = n.get(t);
		r ? r.push(e) : n.set(t, [e]);
	}
	let r = [];
	for (let e of n.values()) {
		let t = [...new Set(e.flatMap(({ start: e, end: t }) => [e, t]))].sort((e, t) => e - t), n = null, i = 0, a = () => {
			if (n === null || i <= n) return;
			let { axis: t, fixed: a } = e[0];
			r.push(t === "h" ? `M${n} ${a}H${i}` : `M${a} ${n}V${i}`), n = null;
		};
		for (let r = 0; r + 1 < t.length; r++) {
			let o = t[r], s = t[r + 1], c = e.some((e) => e.start < s && e.end > o);
			c && n !== null && o === i ? i = s : (a(), c && (n = o, i = s));
		}
		a();
	}
	return r.join("");
}
var ml = 0, hl = "color-mix(in srgb, #ffb300 8%, transparent)", gl = "color-mix(in srgb, #fb8c00 8%, transparent)";
function _l(e, t = {}, n) {
	let r = e ? "#fb8c00" : "#ffb300", i = e ? t.active : n ?? t.match, a = i ?? (e ? gl : hl);
	return {
		border: `2px solid ${i ?? r}`,
		background: a
	};
}
var vl = class {
	container;
	hostDocument;
	hostWindow;
	acquisition = new bc();
	viewport;
	renderDispatcher;
	wrapper;
	canvas;
	gridRegion;
	rowGutter;
	colGutter;
	cornerGutter;
	gutter = {
		w: 0,
		h: 0
	};
	rowOutline = null;
	colOutline = null;
	rowOutlineBands = [];
	colOutlineBands = [];
	stashedRowHeights = /* @__PURE__ */ new Map();
	stashedColWidths = /* @__PURE__ */ new Map();
	sizeOverrideStore = /* @__PURE__ */ new Map();
	projectionId = Uc++;
	canvasArea;
	scrollHost;
	spacer;
	surface;
	overlayHost;
	tabBar;
	tabStrip;
	tabList;
	navPrev;
	navNext;
	tabs = [];
	tabColors = [];
	zoomSlider = null;
	zoomLabel = null;
	currentSheet = 0;
	sheetRequestGeneration = 0;
	fontBindingGeneration = 0;
	fontBinding = null;
	_hiddenSheetMode;
	currentWorksheet = null;
	currentSourceComments = [];
	commentNavigationGeneration = 0;
	sourceCommentMap = /* @__PURE__ */ new Map();
	sheetViews = /* @__PURE__ */ new Map();
	opts;
	_mountKind;
	_nativeScrollbars;
	_mode;
	_borrowed = !1;
	preparedWorkbook = null;
	_destroyed = !1;
	resizeObserver = null;
	chromeColors = {};
	chromeStyleObserver = null;
	chromeSchemeMedia = null;
	chromeSchemeListener = null;
	_lastViewportNotification = null;
	get anchorCell() {
		return this.selectionController.anchor;
	}
	get activeCell() {
		return this.selectionController.active;
	}
	get selectionMode() {
		return this.selectionController.mode;
	}
	get isSelecting() {
		return this.selectionController.dragging;
	}
	get selectionPointerId() {
		return this.selectionController.draggingPointerId;
	}
	beginSelectionDrag(e) {
		this.pendingTap?.pointerId !== e && (this.pendingTap = null), this.pendingClick?.pointerId !== e && (this.pendingClick = null), this.selectionController.beginDrag(e);
	}
	_pendingZoomAnchor = null;
	selectionController = new wc();
	lastNotifiedSelectionState = null;
	emittingSelectionChange = !1;
	pendingSelectionChange = !1;
	selectionNotificationScheduled = !1;
	selectionNotificationCount = 0;
	selectionContextNotificationFrame = null;
	selectionContextNotificationMicrotask = !1;
	selectionContextRows = /* @__PURE__ */ new WeakMap();
	selectionContextCells = /* @__PURE__ */ new WeakMap();
	elementContext = null;
	selectionOverlay;
	findOverlay;
	_find;
	keydownHandler = null;
	pendingTap = null;
	pendingClick = null;
	pendingElementClick = null;
	resizeDrag = null;
	selectionAutoScrollPointer = null;
	selectionAutoScrollFrame = null;
	selectionAutoScrollLastTime = null;
	commentPopup;
	commentMap = /* @__PURE__ */ new Map();
	hyperlinkMap = /* @__PURE__ */ new Map();
	commentPopupKey = null;
	commentPopupTimer = null;
	commentPopupCell = null;
	commentPopupPositionScheduled = !1;
	commentPopupResizeObserver = null;
	commentUi = null;
	commentPopupRenderGeneration = 0;
	validationPanel;
	validationPanelKey = null;
	validationRequestGeneration = 0;
	validationArrowRect = null;
	validationOutsideHandler = null;
	constructor(e, t = {}, n) {
		this.container = e, this.hostDocument = (n.kind === "sheet" ? n.canvas.ownerDocument : e.ownerDocument) ?? document;
		let r = this.hostDocument.defaultView;
		if (!r) throw Error("XlsxViewer requires a document with an active Window");
		this.hostWindow = r, this.opts = t, this._mountKind = n.kind, this._nativeScrollbars = t.showScrollbars ?? !0;
		let i = t[Ac];
		this._borrowed = i !== void 0, this._mode = n.kind === "sheet" ? n.mode : ke("XlsxViewer", t.mode, i), this._hiddenSheetMode = t.hiddenSheetMode ?? "show", this.viewport = new Sc(t.cellScale ?? 1), this.wrapper = this.hostDocument.createElement("div"), this.wrapper.style.cssText = `position:relative;width:100%;height:100%;background:${n.kind === "composite" ? "var(--ooxml-xlsx-chrome-surface,#fff)" : "transparent"};box-sizing:border-box;font-family:sans-serif;display:flex;flex-direction:column;`, this.gridRegion = this.hostDocument.createElement("div"), this.gridRegion.style.cssText = "position:relative;flex:1;min-height:0;overflow:hidden;";
		let a = "position:absolute;top:0;left:0;z-index:3;display:none;background:var(--ooxml-xlsx-chrome-background,#f5f5f5);";
		this.cornerGutter = this.hostDocument.createElement("canvas"), this.cornerGutter.style.cssText = a, this.cornerGutter.setAttribute("data-xlsx-outline", "corner"), this.colGutter = this.hostDocument.createElement("canvas"), this.colGutter.style.cssText = a, this.colGutter.setAttribute("data-xlsx-outline", "col"), this.rowGutter = this.hostDocument.createElement("canvas"), this.rowGutter.style.cssText = a, this.rowGutter.setAttribute("data-xlsx-outline", "row"), this.canvasArea = this.hostDocument.createElement("div"), this.canvasArea.style.cssText = "position:absolute;inset:0;overflow:hidden;", this.canvas = n.kind === "sheet" ? n.canvas : this.hostDocument.createElement("canvas"), this.canvas.style.cssText = "position:absolute;top:0;left:0;z-index:0;display:block;", this.renderDispatcher = new Cc(this.canvas, this._mode === "worker", this.hostWindow), this.scrollHost = this.hostDocument.createElement("div"), this.scrollHost.setAttribute("data-xlsx-viewport-input", n.kind), this.scrollHost.setAttribute("role", "region"), this.scrollHost.setAttribute("aria-label", "Spreadsheet viewport. Use Arrow keys to move the selected cell. Press Enter to show its comment."), this.scrollHost.tabIndex = 0, this.scrollHost.style.cssText = `position:absolute;inset:0;overflow:${this._nativeScrollbars ? "auto" : "clip"};z-index:2;background:transparent;scrollbar-color:var(--ooxml-xlsx-chrome-scrollbar-color,auto);`, this.spacer = this.hostDocument.createElement("div"), this.spacer.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;", this._nativeScrollbars && this.scrollHost.appendChild(this.spacer), this.surface = new Tc(this.canvas, this.canvasArea, this.scrollHost), this.overlayHost = new Ec(this.canvasArea, this.canvas, this.scrollHost, {
			commentMaxWidth: Fc,
			commentMaxHeight: Ic,
			validationMaxWidth: Lc,
			validationMaxHeight: Rc
		}), this.selectionOverlay = this.overlayHost.selection, this.findOverlay = this.overlayHost.find, this.commentPopup = this.overlayHost.comment;
		let o = this.hostDocument.defaultView?.ResizeObserver ?? globalThis.ResizeObserver;
		if (o && (this.commentPopupResizeObserver = new o(() => {
			this.scheduleCommentPopupPosition();
		}), this.commentPopupResizeObserver.observe(this.commentPopup)), this.validationPanel = this.overlayHost.validation, qc(this.hostDocument), n.kind === "composite") {
			this.tabBar = this.hostDocument.createElement("div"), this.tabBar.style.cssText = `display:flex;align-items:flex-end;height:${zc}px;flex-shrink:0;background:var(--ooxml-xlsx-chrome-background,#f0f0f0);border-top:1px solid var(--ooxml-xlsx-chrome-border,#c8ccd0);`, this.navPrev = this.makeNavButton("◀", "Scroll tabs left", () => this.scrollTabs(-1)), this.navNext = this.makeNavButton("▶", "Scroll tabs right", () => this.scrollTabs(1)), this.navPrev.dataset.xlsxTabNav = "prev", this.navNext.dataset.xlsxTabNav = "next";
			let e = this.hostDocument.createElement("div");
			e.style.cssText = `display:flex;flex-shrink:0;width:${Vc}px;height:100%;`, e.appendChild(this.navPrev), e.appendChild(this.navNext), this.tabStrip = this.hostDocument.createElement("div"), this.tabStrip.style.cssText = `position:relative;display:block;flex:1;min-width:0;height:100%;margin-left:${Hc}px;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;`, this.tabStrip.classList.add("xlsx-tab-strip"), this.tabStrip.addEventListener("scroll", () => this.updateNavButtons()), this.tabList = this.hostDocument.createElement("div"), this.tabList.style.cssText = `display:flex;align-items:flex-end;height:100%;gap:${Hc}px;box-sizing:border-box;`, this.tabList.style.width = "max-content", this.tabList.style.minWidth = "100%", this.tabStrip.appendChild(this.tabList), this.tabBar.appendChild(e), this.tabBar.appendChild(this.tabStrip), this.opts.showZoomSlider !== !1 && this.tabBar.appendChild(this.buildZoomControl());
		}
		this.gridRegion.appendChild(this.canvasArea), this.wrapper.appendChild(this.gridRegion), n.kind === "composite" && this.wrapper.appendChild(this.tabBar), e.appendChild(this.wrapper), this.installChromeThemeRefresh(), this.rowGutter.addEventListener("pointerdown", (e) => this.onGutterPointerDown(e, "row")), this.colGutter.addEventListener("pointerdown", (e) => this.onGutterPointerDown(e, "col")), this._nativeScrollbars && this.surface.on("scroll", () => {
			if (this.pendingTap = null, this.pendingElementClick = null, this.hideCommentPopup(), this.hideValidationPanel(), this.scrollHost.clientWidth > 0) {
				let e = this.scrollHost.scrollLeft, t = this.isRtl ? this.maxScrollLeft - e : e;
				this.viewport.setViewportSize(this.scrollHost.clientWidth, this.scrollHost.clientHeight), this.viewport.setOffset(t, this.scrollHost.scrollTop);
			}
			this.emitViewportChange(), this.scheduleRender(), this.updateSelectionOverlay(), this.updateFindOverlay();
		});
		let s = new this.hostWindow.ResizeObserver(() => {
			let e = {
				x: this.viewport.x,
				y: this.viewport.y
			};
			this.viewport.setViewportSize(this.scrollHost.clientWidth, this.scrollHost.clientHeight), this.setViewportLeft(e.x), this.viewportTop = e.y, this.reanchorHorizontalScroll(), this.layoutGutters(), this.scheduleRender(), this.updateSelectionOverlay(), this.updateFindOverlay(), this.updateNavButtons();
		});
		s.observe(this.gridRegion), this.resizeObserver = s, this.setupSelectionEvents(), this._find = new oc(() => this.sheetCount, (e) => this.wb?.sheetNames[e] ?? "", (e) => this._collectSheetCells(e)), i && (this.acquisition.install(i, !1), this._mountKind === "composite" && this.activateWorkbook(i).catch((e) => this._reportRenderError(e)));
	}
	refreshChromeTheme() {
		if (this._destroyed) return;
		let e = this.hostWindow.getComputedStyle?.bind(this.hostWindow);
		if (!e) return;
		let t = e(this.wrapper), n = {};
		for (let [e, r] of Object.entries(Jc)) {
			let i = t.getPropertyValue(r).trim();
			i && (n[e] = i);
		}
		let r = n;
		Yc(this.chromeColors, r) || (this.chromeColors = r, this.renderGutters(), this.scheduleRender());
	}
	installChromeThemeRefresh() {
		this.refreshChromeTheme();
		let e = this.hostWindow.MutationObserver ?? globalThis.MutationObserver;
		if (e) {
			this.chromeStyleObserver = new e(() => this.refreshChromeTheme());
			for (let e = this.container; e; e = e.parentElement) this.chromeStyleObserver.observe(e, {
				attributes: !0,
				attributeFilter: [
					"class",
					"style",
					"data-theme"
				]
			});
		}
		let t = this.hostWindow.matchMedia?.("(prefers-color-scheme: dark)") ?? null;
		if (t) {
			let e = () => this.refreshChromeTheme();
			t.addEventListener?.("change", e), this.chromeSchemeMedia = t, this.chromeSchemeListener = e;
		}
	}
	async _collectSheetCells(e) {
		let t = this.wb;
		if (!t) return [];
		let n = await t.getWorksheet(e), r = [];
		for (let e of n.rows) for (let i of e.cells) {
			let e = t.cellText(n, i);
			e !== "" && r.push({
				row: i.row,
				col: i.col,
				text: e
			});
		}
		return r;
	}
	async [jc](e, t = {}) {
		if (this.assertOpen(), this._borrowed) throw Error(`${this._mountKind === "sheet" ? "XlsxSheetViewer" : "XlsxViewer"}.load() is unsupported on a Viewer created by fromWorkbook(); the borrowed workbook is already loaded.`);
		try {
			let n = await this.acquisition.replace(() => ws[Cs](e, {
				password: this.opts.password,
				useGoogleFonts: this.opts.useGoogleFonts,
				cjkFallback: this.opts.cjkFallback,
				maxZipEntryBytes: this.opts.maxZipEntryBytes,
				resourceLimits: this.opts.resourceLimits,
				debug: this.opts.debug,
				onResourceMetrics: this.opts.onResourceMetrics,
				workerTimeoutMs: this.opts.workerTimeoutMs,
				wasmUrl: this.opts.wasmUrl,
				math: this.opts.math,
				threeD: this.opts.threeD,
				regionMap: this.opts.regionMap,
				chartEx: this.opts.chartEx,
				tiff: this.opts.tiff,
				mode: this._mode
			}, t), () => {
				this.sheetRequestGeneration++, this.renderDispatcher.begin(), this._find.invalidate(), this.hideValidationPanel(), this.releaseHostFonts();
			});
			if (!n) return;
			if (this._destroyed) throw this.destroyedError();
			await this.activateWorkbook(n);
		} catch (e) {
			throw this._destroyed ? this.destroyedError() : e instanceof Error ? e : Error(String(e));
		}
	}
	async activateWorkbook(e, t) {
		this.prepareWorkbook(e) && await this.showSheet(t ?? this._initialSheet());
	}
	async ensureHostFonts(e) {
		if (this.fontBinding?.workbook === e) return !0;
		let t = e[bs];
		if (typeof t != "function") return !0;
		let n = ++this.fontBindingGeneration, r = await t.call(e, this.hostDocument);
		return this._destroyed || n !== this.fontBindingGeneration || this.wb !== e ? (r(), !1) : (this.fontBinding?.release(), this.fontBinding = {
			workbook: e,
			release: r
		}, !0);
	}
	releaseHostFonts() {
		this.fontBindingGeneration++, this.fontBinding?.release(), this.fontBinding = null;
	}
	prepareWorkbook(e) {
		return this._destroyed || this.wb !== e ? !1 : this.preparedWorkbook === e ? !0 : (this._find.invalidate(), this.sizeOverrideStore.clear(), this.sheetViews.clear(), this.buildTabs(), this.preparedWorkbook = e, this.opts.onReady?.(e.sheetNames), !0);
	}
	get workbook() {
		let e = this.acquisition.current;
		if (!e) throw Error("Workbook not loaded");
		return e;
	}
	get wb() {
		return this.acquisition.current;
	}
	set wb(e) {
		e ? this.acquisition.install(e) : this.acquisition.destroy();
	}
	async showSheet(e) {
		let t = ++this.sheetRequestGeneration, n = this.workbook, r, i;
		try {
			if (!await this.ensureHostFonts(n)) return;
			i = await n.getWorksheet(e), r = this.sheetViews.get(e) ?? this.createVisibleSheetView(i);
			let t = n[xs];
			if (typeof t == "function") {
				let e = this.hostDocument.createElement("canvas").getContext("2d");
				e && t.call(n, r, e);
			}
			this.syncAutomaticRowOverrides(e, r), this.sheetViews.set(e, r);
		} catch (e) {
			if (!this.isCurrentSheetRequest(t, n)) return;
			throw e;
		}
		this.isCurrentSheetRequest(t, n) && (this.currentSheet = e, this.currentWorksheet = r, this.currentSourceComments = i.comments ?? [], this.opts.comments !== !1 && this.currentSourceComments.length > 0 && this.loadCommentUi().catch((e) => this._reportRenderError(e)), this.sourceCommentMap = this.createCommentMap(this.currentSourceComments), this.setElementContext(null), this.pendingElementClick = null, this.updateFooterDirection(), this.viewportTop = 0, this.selectionController.reset(), this.emitSelectionChange(), this.hideCommentPopup(), this.hideValidationPanel(), this.updateSelectionOverlay(), this.updateTabActive(e), this.buildCommentMap(this.currentWorksheet), this.buildHyperlinkMap(this.currentWorksheet), this.buildOutline(this.currentWorksheet), this.layoutGutters(), this.updateSpacerSize(this.currentWorksheet), this.resetHorizontalScroll(), await this.renderCurrentSheet(), this.isCurrentSheetRequest(t, n) && (this.updateFindOverlay(), this.emitViewportChange(), this.opts.onSheetChange?.(e, this.workbook.sheetNames.length)));
	}
	isCurrentSheetRequest(e, t) {
		return !this._destroyed && e === this.sheetRequestGeneration && this.wb === t;
	}
	buildOutline(e) {
		this.stashedRowHeights.clear(), this.stashedColWidths.clear(), this.rowOutlineBands = _c(e), this.colOutlineBands = vc(e);
		let t = fc(this.rowOutlineBands, yc(e, "row")), n = fc(this.colOutlineBands, yc(e, "col"));
		this.rowOutline = t.maxLevel > 0 ? t : null, this.colOutline = n.maxLevel > 0 ? n : null;
	}
	layoutGutters() {
		let e = this.viewport.scale, t = this.rowOutline ? Math.round(lc(this.rowOutline.maxLevel) * e) : 0, n = this.colOutline ? Math.round(lc(this.colOutline.maxLevel) * e) : 0;
		this.gutter = {
			w: t,
			h: n
		}, t > 0 || n > 0 ? this.colGutter.parentElement || (this.gridRegion.appendChild(this.colGutter), this.gridRegion.appendChild(this.rowGutter), this.gridRegion.appendChild(this.cornerGutter)) : (this.colGutter.remove(), this.rowGutter.remove(), this.cornerGutter.remove()), this.canvasArea.style.left = `${t}px`, this.canvasArea.style.top = `${n}px`;
		let r = (e, t, n, r, i) => {
			if (r <= 0 || i <= 0) {
				e.style.display = "none";
				return;
			}
			e.style.display = "block", e.style.left = `${t}px`, e.style.top = `${n}px`, e.style.width = `${r}px`, e.style.height = `${i}px`;
		}, i = this.gridRegion.clientWidth, a = this.gridRegion.clientHeight;
		r(this.cornerGutter, 0, 0, t, n), r(this.colGutter, t, 0, Math.max(0, i - t), n), r(this.rowGutter, 0, n, t, Math.max(0, a - n));
	}
	renderGutters() {
		this.currentWorksheet && (this.gutter.h > 0 && this.colOutline && this.paintAxisGutter("col"), this.gutter.w > 0 && this.rowOutline && this.paintAxisGutter("row"), (this.gutter.w > 0 || this.gutter.h > 0) && this.paintCornerGutter());
	}
	paintAxisGutter(e) {
		let t = this.currentWorksheet;
		if (!t) return;
		let n = this.viewport.scale, r = e === "row", i = r ? this.rowGutter : this.colGutter, a = r ? this.rowOutline : this.colOutline;
		if (!a) return;
		let o = parseFloat(i.style.width) || 0, s = parseFloat(i.style.height) || 0;
		if (o <= 0 || s <= 0) return;
		let c = this.surface.sizeCanvas(i, o, s), l = i.getContext("2d");
		if (!l) return;
		l.setTransform(c, 0, 0, c, 0, 0), l.clearRect(0, 0, o, s), l.fillStyle = this.chromeColors.background ?? "#f5f5f5", l.fillRect(0, 0, o, s);
		let u = 19 * n;
		l.strokeStyle = this.chromeColors.border ?? "#808080", l.lineWidth = 1, l.fillStyle = this.chromeColors.text ?? "#404040";
		let d = Q(t), f = d.effectiveFrozenBands({
			scale: n,
			width: this.canvasArea.clientWidth,
			height: this.canvasArea.clientHeight,
			headerWidth: 50,
			headerHeight: 22,
			rows: t.freezeRows ?? 0,
			cols: t.freezeCols ?? 0
		}), p = d.axesAtScale(n), m = r ? f.rows : f.cols, h = r ? p.row.offsetOf(f.rows + 1) : p.col.offsetOf(f.cols + 1), g = (r ? 22 : 50) * n, _ = (n, i) => uc(e, n, i, m, g, h, o, s, !r && t.rightToLeft === !0), v = (e, t) => {
			let n = _(e, t);
			return n.w <= 0 || n.h <= 0 ? !1 : (l.save(), l.beginPath(), l.rect(n.x, n.y, n.w, n.h), l.clip(), !0);
		};
		for (let t of a.groups) {
			let i = (t.level - 1 + .5) * u, a = r ? this._cellRect(t.start, 1) : this._cellRect(1, t.start), o = r ? this._cellRect(t.end, 1) : this._cellRect(1, t.end);
			if (!a || !o) continue;
			let s = r ? a.y : this.screenX(a.x, a.w), c = r ? o.y + o.h : this.screenX(o.x, o.w) + o.w, d = Math.min(s, c), f = Math.max(s, c);
			if (!t.collapsed && f - d > 1 && v(t.start, t.end)) {
				l.beginPath();
				for (let t of dc(e, i, s, c, u)) l.moveTo(t.x1, t.y1), l.lineTo(t.x2, t.y2);
				l.stroke(), l.restore();
			}
			if (t.summary != null) {
				let e = r ? this._cellRect(t.summary, 1) : this._cellRect(1, t.summary);
				if (e) {
					let a = r ? e.y + e.h / 2 : this.screenX(e.x, e.w) + e.w / 2;
					v(t.summary, t.summary) && (this.drawToggleBox(l, r ? i : a, r ? a : i, t.collapsed, n), l.restore());
				}
			}
		}
		let y = r ? 22 * n / 2 : 50 * n / 2;
		for (let e = 1; e <= a.maxLevel + 1; e++) {
			let t = cc(e) * n;
			if (t + 12 * n / 2 > (r ? o : s) + .5) break;
			this.drawLevelButton(l, r ? t : y, r ? y : t, String(e), n);
		}
		if (m > 0) {
			let e = r ? g + h : t.rightToLeft === !0 ? o - g - h : g + h;
			l.save(), l.strokeStyle = this.chromeColors.border ?? "#7a7a7a", l.lineWidth = .5, l.beginPath(), r ? (l.moveTo(0, e), l.lineTo(o, e)) : (l.moveTo(e, 0), l.lineTo(e, s)), l.stroke(), l.restore();
		}
	}
	drawToggleBox(e, t, n, r, i) {
		let a = Math.round(9 * i), o = Math.round(t - a / 2), s = Math.round(n - a / 2);
		e.save(), e.fillStyle = this.chromeColors.surface ?? "#ffffff", e.strokeStyle = this.chromeColors.border ?? "#808080", e.lineWidth = 1, e.fillRect(o + .5, s + .5, a, a), e.strokeRect(o + .5, s + .5, a, a), e.strokeStyle = this.chromeColors.text ?? "#404040", e.beginPath(), e.moveTo(o + 2.5, s + a / 2 + .5), e.lineTo(o + a - 1.5, s + a / 2 + .5), r && (e.moveTo(o + a / 2 + .5, s + 2.5), e.lineTo(o + a / 2 + .5, s + a - 1.5)), e.stroke(), e.restore();
	}
	drawLevelButton(e, t, n, r, i) {
		let a = Math.round(12 * i), o = Math.round(t - a / 2), s = Math.round(n - a / 2);
		e.save(), e.font = `${Math.round(9 * i)}px sans-serif`, e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = this.chromeColors.surface ?? "#ffffff", e.strokeStyle = this.chromeColors.border ?? "#808080", e.lineWidth = 1, e.fillRect(o + .5, s + .5, a, a), e.strokeRect(o + .5, s + .5, a, a), e.fillStyle = this.chromeColors.text ?? "#404040", e.fillText(r, t, n + .5), e.restore();
	}
	paintCornerGutter() {
		let e = this.cornerGutter, t = parseFloat(e.style.width) || 0, n = parseFloat(e.style.height) || 0;
		if (t <= 0 || n <= 0) return;
		let r = this.surface.sizeCanvas(e, t, n), i = e.getContext("2d");
		i && (i.setTransform(r, 0, 0, r, 0, 0), i.clearRect(0, 0, t, n), i.fillStyle = this.chromeColors.background ?? "#f5f5f5", i.fillRect(0, 0, t, n));
	}
	onGutterPointerDown(e, t) {
		if (!this.currentWorksheet) return;
		let n = t === "row", r = n ? this.rowOutline : this.colOutline;
		if (!r) return;
		let i = (n ? this.rowGutter : this.colGutter).getBoundingClientRect(), a = e.clientX - i.left, o = e.clientY - i.top, s = this.viewport.scale, c = 19 * s, l = 7 * s, u = n ? 22 * s / 2 : 50 * s / 2;
		if ((n ? o : a) <= (n ? 22 : 50) * s) {
			for (let i = 1; i <= r.maxLevel + 1; i++) {
				let r = cc(i) * s, c = n ? r : u, l = n ? u : r, d = 12 * s / 2;
				if (Math.abs(a - c) <= d && Math.abs(o - l) <= d) {
					e.preventDefault(), this.applyLevelButton(i, t);
					return;
				}
			}
			return;
		}
		for (let i of r.groups) {
			if (i.summary == null) continue;
			let r = (i.level - 1 + .5) * c, s = n ? this._cellRect(i.summary, 1) : this._cellRect(1, i.summary);
			if (!s) continue;
			let u = n ? s.y + s.h / 2 : this.screenX(s.x, s.w) + s.w / 2, d = n ? r : u, f = n ? u : r;
			if (Math.abs(a - d) <= l && Math.abs(o - f) <= l) {
				e.preventDefault(), this.applyGroupToggle(i, t);
				return;
			}
		}
	}
	applyGroupToggle(e, t) {
		let n = this.currentWorksheet;
		if (!n) return;
		let { hide: r, show: i, nowCollapsed: a } = mc(e, t === "row" ? this.rowOutlineBands : this.colOutlineBands);
		for (let e of r) this.setBandHidden(t, e, !0);
		for (let e of i) this.setBandHidden(t, e, !1);
		e.summary != null && this.setBandCollapsed(t, e.summary, a), this.afterOutlineMutation(n, a && e.summary != null ? {
			axis: t,
			summary: e.summary
		} : void 0);
	}
	scrollOutlineSummaryToStart(e, t) {
		let n = this.currentWorksheet;
		if (!n) return;
		let r = this.viewport.scale, i = Q(n).scrollOffsetForCell(e === "row" ? t : 1, e === "col" ? t : 1, {
			scale: r,
			viewportWidth: this.canvasArea.clientWidth,
			viewportHeight: this.canvasArea.clientHeight,
			currentX: this.effectiveScrollLeft,
			currentY: this.viewportTop,
			headerWidth: 50,
			headerHeight: 22,
			align: "start"
		});
		e === "row" ? this.viewportTop = i.y : this.setViewportLeft(i.x);
	}
	applyLevelButton(e, t) {
		let n = this.currentWorksheet;
		if (!n) return;
		let { hide: r, show: i } = gc(t === "row" ? this.rowOutlineBands : this.colOutlineBands, e);
		for (let e of r) this.setBandHidden(t, e, !0);
		for (let e of i) this.setBandHidden(t, e, !1);
		let a = t === "row" ? this.rowOutline : this.colOutline;
		if (a) for (let n of a.groups) n.summary != null && this.setBandCollapsed(t, n.summary, n.level >= e);
		this.afterOutlineMutation(n);
	}
	setBandHidden(e, t, n) {
		let r = this.currentWorksheet;
		if (r) {
			if (e === "row") if (n) this.stashedRowHeights.has(t) || this.stashedRowHeights.set(t, r.rowHeights[t]), r.rowHeights[t] = 0;
			else if (this.stashedRowHeights.has(t)) {
				let e = this.stashedRowHeights.get(t);
				e === void 0 ? delete r.rowHeights[t] : r.rowHeights[t] = e, this.stashedRowHeights.delete(t);
			} else r.rowHeights[t] === 0 && delete r.rowHeights[t];
			else if (n) this.stashedColWidths.has(t) || this.stashedColWidths.set(t, r.colWidths[t]), r.colWidths[t] = 0;
			else if (this.stashedColWidths.has(t)) {
				let e = this.stashedColWidths.get(t);
				e === void 0 ? delete r.colWidths[t] : r.colWidths[t] = e, this.stashedColWidths.delete(t);
			} else r.colWidths[t] === 0 && delete r.colWidths[t];
			this.recordSizeOverride(e, t);
		}
	}
	recordSizeOverride(e, t) {
		let n = this.currentWorksheet;
		if (!n) return;
		let r = this.sizeOverrideStore.get(this.currentSheet);
		r || (r = {
			rows: /* @__PURE__ */ new Map(),
			automaticRows: /* @__PURE__ */ new Map(),
			cols: /* @__PURE__ */ new Map(),
			revision: 0
		}, this.sizeOverrideStore.set(this.currentSheet, r));
		let i = e === "row" ? r.rows : r.cols;
		e === "row" && r.automaticRows.delete(t);
		let a = e === "row" ? n.rowHeights[t] ?? null : n.colWidths[t] ?? null;
		i.get(t) === a && i.has(t) || (i.set(t, a), r.revision++, r.wire = void 0);
	}
	wireSizeOverrides() {
		let e = this.sizeOverrideStore.get(this.currentSheet);
		if (!(!e || e.rows.size === 0 && e.automaticRows.size === 0 && e.cols.size === 0)) {
			if (!e.wire) {
				let t = {};
				(e.rows.size > 0 || e.automaticRows.size > 0) && (t.rows = Object.fromEntries([...e.automaticRows, ...e.rows])), e.cols.size > 0 && (t.cols = Object.fromEntries(e.cols)), e.wire = t;
			}
			return {
				overrides: e.wire,
				revision: e.revision
			};
		}
	}
	syncAutomaticRowOverrides(e, t) {
		let n = new Map(Ka(t)), r = this.sizeOverrideStore.get(e);
		!r && n.size === 0 || (r || (r = {
			rows: /* @__PURE__ */ new Map(),
			automaticRows: /* @__PURE__ */ new Map(),
			cols: /* @__PURE__ */ new Map(),
			revision: 0
		}, this.sizeOverrideStore.set(e, r)), r.automaticRows = n, r.revision++, r.wire = void 0);
	}
	setBandCollapsed(e, t, n) {
		let r = this.currentWorksheet;
		if (r) if (e === "row") {
			let e = r.rows.find((e) => e.index === t);
			e && (e.collapsed = n);
		} else r.colCollapsed = r.colCollapsed ?? {}, n ? r.colCollapsed[t] = !0 : delete r.colCollapsed[t];
	}
	afterOutlineMutation(e, t) {
		Yr.invalidate(e), this.buildOutlineLayoutOnly(e), this.updateSpacerSize(e), t && this.scrollOutlineSummaryToStart(t.axis, t.summary), this.updateSelectionOverlay(), this.updateFindOverlay(), this.scheduleRender(), t && this.emitViewportChange();
	}
	buildOutlineLayoutOnly(e) {
		this.rowOutlineBands = _c(e), this.colOutlineBands = vc(e);
		let t = fc(this.rowOutlineBands, yc(e, "row")), n = fc(this.colOutlineBands, yc(e, "col"));
		this.rowOutline = t.maxLevel > 0 ? t : null, this.colOutline = n.maxLevel > 0 ? n : null;
	}
	get isRtl() {
		return this.currentWorksheet?.rightToLeft === !0;
	}
	updateFooterDirection() {
		this._mountKind === "composite" && (this.tabBar.style.flexDirection = this.isRtl ? "row-reverse" : "row", this.tabStrip.style.marginLeft = this.isRtl ? "0" : `${Hc}px`, this.tabStrip.style.marginRight = this.isRtl ? `${Hc}px` : "0", this.tabList.style.flexDirection = this.isRtl ? "row-reverse" : "row");
	}
	get maxScrollLeft() {
		return this.syncNativeViewportExtent(), this.viewport.maxX;
	}
	get maxScrollTop() {
		return this.syncNativeViewportExtent(), this.viewport.maxY;
	}
	syncNativeViewportExtent() {
		this._nativeScrollbars && (this.viewport.setViewportSize(this.scrollHost.clientWidth, this.scrollHost.clientHeight), this.viewport.ensureExtent(this.scrollHost.scrollWidth, this.scrollHost.scrollHeight));
	}
	get viewportTop() {
		return this._nativeScrollbars && (this.syncNativeViewportExtent(), this.viewport.adoptNativeOffset(this.viewport.x, this.scrollHost.scrollTop)), this.viewport.y;
	}
	set viewportTop(e) {
		this.viewport.setOffset(this.viewport.x, e), this._nativeScrollbars && (this.scrollHost.scrollTop = this.viewport.y);
	}
	get effectiveScrollLeft() {
		if (this._nativeScrollbars) {
			this.syncNativeViewportExtent();
			let e = this.scrollHost.scrollLeft;
			this.viewport.adoptNativeOffset(this.isRtl ? this.maxScrollLeft - e : e, this.viewport.y);
		}
		return this.viewport.x;
	}
	setViewportLeft(e) {
		this.viewport.setOffset(e, this.viewport.y), this._nativeScrollbars && (this.scrollHost.scrollLeft = this.isRtl ? Math.max(0, this.maxScrollLeft - this.viewport.x) : this.viewport.x);
	}
	screenX(e, t) {
		return this.isRtl ? Ni(e, t, this.canvasArea.clientWidth) : e;
	}
	resetHorizontalScroll() {
		this.viewport.setOffset(0, this.viewport.y), this._nativeScrollbars && (this.scrollHost.scrollLeft = this.isRtl ? this.maxScrollLeft : 0);
	}
	reanchorHorizontalScroll() {
		if (!this._nativeScrollbars || !this.isRtl || this.scrollHost.clientWidth === 0) return;
		let e = Math.max(0, this.maxScrollLeft - this.viewport.x);
		Math.abs(this.scrollHost.scrollLeft - e) > 1 && (this.scrollHost.scrollLeft = e);
	}
	get sheetIndex() {
		return this.currentSheet;
	}
	get sheetCount() {
		return this.wb?.sheetCount ?? 0;
	}
	async goToSheet(e) {
		if (this.sheetCount === 0) return;
		let t = this.workbook;
		this.prepareWorkbook(t) && await this.showSheet(Math.max(0, Math.min(e, this.sheetCount - 1)));
	}
	async nextSheet() {
		await this.goToSheet(this._stepSheet(1));
	}
	async prevSheet() {
		await this.goToSheet(this._stepSheet(-1));
	}
	getViewportOffset() {
		return {
			x: Math.max(0, this.effectiveScrollLeft),
			y: Math.max(0, this.viewportTop)
		};
	}
	emitViewportChange() {
		let e = this.opts.onViewportChange;
		if (!e) return;
		let t = this.getViewportOffset(), n = this._lastViewportNotification;
		n && n.x === t.x && n.y === t.y || (this._lastViewportNotification = t, e(t));
	}
	async setViewportOffset(e) {
		if (!Number.isFinite(e.x) || !Number.isFinite(e.y)) throw TypeError("XLSX viewport offsets must be finite numbers");
		let t = Math.min(this.maxScrollLeft, Math.max(0, e.x)), n = Math.min(this.maxScrollTop, Math.max(0, e.y));
		this.setViewportLeft(t), this.viewportTop = n, await this.renderCurrentSheet(), this.updateSelectionOverlay(), this.updateFindOverlay(), this.emitViewportChange();
	}
	async relayout() {
		this.reanchorHorizontalScroll(), this.layoutGutters(), this.currentWorksheet && this.updateSpacerSize(this.currentWorksheet), await this.renderCurrentSheet(), this.updateSelectionOverlay(), this.updateFindOverlay();
	}
	async scrollToCell(e, t = {}) {
		let n = Xr(e);
		!n || !this.currentWorksheet || (this._scrollCellIntoView(n.row, n.col, t.align ?? "nearest"), await this.renderCurrentSheet(), this.updateSelectionOverlay(), this.updateFindOverlay(), this.emitViewportChange());
	}
	_stepSheet(e) {
		return this._hiddenSheetMode === "skip" && this.wb ? gt(this.currentSheet, e, (e) => this.wb.isHidden(e), this.sheetCount) : this.currentSheet + e;
	}
	_initialSheet() {
		return this._hiddenSheetMode === "skip" && this.wb ? _t(0, (e) => this.wb.isHidden(e), this.sheetCount) : 0;
	}
	getCellAt(e, t) {
		if (this._destroyed) return null;
		let n = this.currentWorksheet;
		if (!n) return null;
		let r = this.viewport.scale, i = this.canvasArea.getBoundingClientRect(), a = this.screenX(e - i.left, 0), o = t - i.top, s = Math.round(50 * r), c = Math.round(22 * r);
		if (a < s || o < c) return null;
		let l = a - s, u = o - c;
		return Q(n).cellAt(l, u, {
			scrollX: this.effectiveScrollLeft,
			scrollY: this.viewportTop,
			scale: r
		});
	}
	elementContextViewport() {
		let e = this.currentWorksheet;
		if (!e) return null;
		let t = this.canvasArea.clientWidth, n = this.canvasArea.clientHeight;
		if (t <= 0 || n <= 0) return null;
		let r = this.viewport.scale, i = Q(e).visibleRange({
			width: t,
			height: n,
			scale: r,
			scrollX: this.effectiveScrollLeft,
			scrollY: this.viewportTop,
			headerWidth: 50,
			headerHeight: 22,
			buffer: 2
		});
		return {
			width: t,
			height: n,
			cellScale: r,
			viewport: i.range,
			scrollOffsetX: i.offsetX,
			scrollOffsetY: i.offsetY,
			freezeRows: e.freezeRows ?? 0,
			freezeCols: e.freezeCols ?? 0
		};
	}
	elementContextAt(e, t) {
		if (!this.opts.enableElementSelection || this._destroyed) return null;
		let n = this.currentWorksheet, r = this.elementContextViewport();
		if (!n || !r) return null;
		let i = this.canvasArea.getBoundingClientRect();
		return Ks(n, this.currentSheet, {
			x: e - i.left,
			y: t - i.top
		}, r);
	}
	_cellRect(e, t) {
		let n = this.currentWorksheet;
		if (!n) return null;
		let r = this.viewport.scale;
		return Q(n).cellRect(e, t, {
			scale: r,
			scrollX: this.effectiveScrollLeft,
			scrollY: this.viewportTop,
			headerWidth: 50,
			headerHeight: 22
		});
	}
	getCellViewportRect(e) {
		if (this._destroyed) return null;
		let t = typeof e == "string" ? Xr(e) : e;
		if (!t || t.row < 1 || t.col < 1) return null;
		let n = this._cellRect(t.row, t.col);
		return n ? Object.freeze({
			x: this.screenX(n.x, n.w),
			y: n.y,
			width: n.w,
			height: n.h
		}) : null;
	}
	getComments() {
		return this.assertOpen(), structuredClone(this.currentSourceComments);
	}
	async goToComment(e, t, n) {
		let r = Xr(t), i = this.wb;
		if (!r || !i || !Number.isInteger(e) || e < 0 || e >= i.sheetCount) return !1;
		let a = ++this.commentNavigationGeneration, o = e === this.currentSheet && this.currentWorksheet !== null ? this.currentSourceComments : await i.getComments(e);
		if (this._destroyed) throw this.destroyedError();
		if (a !== this.commentNavigationGeneration || i !== this.wb || !o.some((e) => {
			let t = Xr(e.cellRef);
			return t?.row === r.row && t.col === r.col;
		})) return !1;
		if (e !== this.currentSheet || this.currentWorksheet === null) {
			if (await this.goToSheet(e), this._destroyed) throw this.destroyedError();
			if (a !== this.commentNavigationGeneration || i !== this.wb || e !== this.currentSheet) return !1;
		}
		let s = this.sheetRequestGeneration, c = this.currentSheet, l = this.currentWorksheet;
		if (await this.scrollToCell(t, n), this._destroyed) throw this.destroyedError();
		return a !== this.commentNavigationGeneration || i !== this.wb || s !== this.sheetRequestGeneration || c !== this.currentSheet || l !== this.currentWorksheet ? !1 : (this.setSelection(t), !0);
	}
	get selectionState() {
		return this.selectionController.snapshot();
	}
	setSelection(e) {
		if (this._destroyed) throw Error("XlsxViewer has been destroyed");
		let t;
		if (typeof e == "string") {
			if (t = ic(e), !t) throw SyntaxError(`Invalid XLSX selection reference: ${e}`);
		} else t = e ? nc(e) : null;
		this.commitSelection(t);
	}
	getSelectionContext(e = {}) {
		if (this.assertOpen(), this.elementContext) return qs(this.elementContext, e.maxTextCharacters);
		let t = this.currentWorksheet, n = this.selectionState;
		if (!t || !n) return null;
		let r = e.maxCells ?? 1e3;
		if (!Number.isFinite(r) || r < 0) throw RangeError("maxCells must be a finite non-negative number.");
		let i = Math.min(Ys, Math.floor(r)), a = e.maxTextCharacters ?? al;
		if (!Number.isFinite(a) || a < 0) throw RangeError("maxTextCharacters must be a finite non-negative number.");
		let o = Math.min(Xs, Math.floor(a)), s = 0, c = !1, l = (e) => {
			let t = typeof e == "string" ? [e] : e, n = [], r = 0;
			for (let e = 0; e < t.length; e++) {
				let i = t[e], a = typeof i == "string" ? i : i.text, l = Math.max(0, Math.min(sl - r, o - s)), u = ll(a, l);
				if (n.push(u), r += u.length, s += u.length, u.length < a.length || e + 1 < t.length && l === 0) {
					c = !0;
					break;
				}
			}
			return n.join("");
		}, u = n.areas.some((e) => e.kind === "sheet"), d = Xc(n.areas.flatMap((e) => e.kind === "rows" ? [{
			first: e.firstRow,
			last: e.lastRow
		}] : [])), f = Xc(n.areas.flatMap((e) => e.kind === "columns" ? [{
			first: e.firstColumn,
			last: e.lastColumn
		}] : [])), p = n.areas.flatMap((e) => e.kind === "cells" ? [e] : []), m = p.flatMap((e, t) => [{
			row: e.top,
			index: t,
			active: !0
		}, {
			row: e.bottom + 1,
			index: t,
			active: !1
		}]).sort((e, t) => e.row - t.row || Number(e.active) - Number(t.active)), h = /* @__PURE__ */ new Set(), g = 0, _ = [], v = [], y = !1, b = u || f.length > 0 ? [{
			first: 1,
			last: Jr
		}] : Xc([...d, ...p.map((e) => ({
			first: e.top,
			last: e.bottom
		}))]), x = this.selectionContextRows.get(t);
		x || (x = $c(t.rows, (e) => e.index), this.selectionContextRows.set(t, x));
		cellScan: for (let e of b) {
			let n = Qc(x, e.first, (e) => e.index);
			for (; n < x.length;) {
				let r = x[n++];
				if (r.index > e.last) break;
				let a = !1;
				for (; g < m.length && m[g].row <= r.index;) {
					let e = m[g++];
					e.active ? h.add(e.index) : h.delete(e.index), a = !0;
				}
				a && (_ = Xc([...h].map((e) => ({
					first: p[e].left,
					last: p[e].right
				}))));
				let o = u || Zc(d, r.index) ? [{
					first: 1,
					last: Z
				}] : Xc([...f, ..._]);
				for (let e of o) {
					let n = this.selectionContextCells.get(r);
					n || (n = $c(r.cells, (e) => e.col), this.selectionContextCells.set(r, n));
					let a = Qc(n, e.first, (e) => e.col);
					for (; a < n.length;) {
						let r = n[a++];
						if (r.col > e.last) break;
						let o = r.value, s = this.sourceCommentMap.get(`${r.row}:${r.col}`);
						if (o.type === "empty" && r.formula === void 0 && !s) continue;
						if (v.length >= i) {
							y = !0;
							break cellScan;
						}
						let u = l(this.wb?.cellText(t, r) ?? ""), d = o.type === "text" ? l(o.runs ?? o.text) : o.type === "number" ? o.number : o.type === "bool" ? o.bool : o.type === "error" ? l(o.error) : null, f = s ? {
							root: {
								id: s.id,
								author: s.author,
								date: s.date,
								text: l(s.rootText ?? s.text),
								status: s.resolved ? "resolved" : "active"
							},
							replies: (s.replies ?? []).map((e) => ({
								id: e.id,
								author: e.author,
								date: e.date,
								text: l(e.text),
								status: e.resolved ? "resolved" : "active"
							}))
						} : void 0;
						if (v.push({
							address: {
								row: r.row,
								col: r.col
							},
							displayText: u,
							valueType: o.type,
							value: d,
							...r.formula === void 0 ? {} : { formula: l(r.formula) },
							...f === void 0 ? {} : { comment: f }
						}), c) break cellScan;
					}
				}
			}
		}
		let S = [];
		return y && S.push("cells"), c && S.push("text"), {
			format: "xlsx",
			kind: "range",
			sheetIndex: this.currentSheet,
			sheetName: t.name,
			selection: n,
			coordinateCountUpperBound: Zs(n),
			cells: v,
			truncated: S.length > 0,
			truncationReasons: S,
			maxCells: i,
			textCharacters: s,
			maxTextCharacters: o
		};
	}
	commitSelection(e) {
		this.setElementContext(null);
		let t = this.selectionState;
		ac(t, e) || (this.hideValidationPanel(), this.selectionController.setState(e), this.updateSelectionOverlay(), this.wb && this.scheduleRender(), this.emitSelectionChange());
	}
	setElementContext(e) {
		return JSON.stringify(this.elementContext) === JSON.stringify(e) ? !1 : (this.elementContext = e ? structuredClone(e) : null, this.updateSelectionOverlay(), this.scheduleSelectionContextNotification(), !0);
	}
	scheduleSelectionContextNotification() {
		if (!this.opts.onSelectionContextChange || this._destroyed || this.selectionContextNotificationFrame !== null || this.selectionContextNotificationMicrotask) return;
		let e = () => {
			if (this.selectionContextNotificationFrame = null, this.selectionContextNotificationMicrotask = !1, this._destroyed) return;
			let e = this.getSelectionContext({ maxTextCharacters: ol });
			this.opts.onSelectionContextChange?.(e ? structuredClone(e) : null);
		};
		typeof this.hostWindow.requestAnimationFrame == "function" ? this.selectionContextNotificationFrame = this.hostWindow.requestAnimationFrame(e) : (this.selectionContextNotificationMicrotask = !0, queueMicrotask(e));
	}
	emitSelectionChange() {
		let e = this.selectionState;
		if (ac(e, this.lastNotifiedSelectionState) || this.scheduleSelectionContextNotification(), this.emittingSelectionChange) {
			this.pendingSelectionChange = !0, this.scheduleSelectionNotification();
			return;
		}
		if (this.pendingSelectionChange = !1, ac(e, this.lastNotifiedSelectionState)) {
			this.finishSelectionNotificationChain();
			return;
		}
		if (this.selectionNotificationCount >= cl) {
			this.lastNotifiedSelectionState = e ? structuredClone(e) : null, this.finishSelectionNotificationChain();
			return;
		}
		this.selectionNotificationCount++, this.lastNotifiedSelectionState = e ? structuredClone(e) : null, this.emittingSelectionChange = !0;
		try {
			this.opts.onSelectionStateChange?.(e ? structuredClone(e) : null);
		} finally {
			this.emittingSelectionChange = !1, this.pendingSelectionChange || !ac(this.selectionState, this.lastNotifiedSelectionState) ? this.scheduleSelectionNotification() : this.finishSelectionNotificationChain();
		}
	}
	scheduleSelectionNotification() {
		this.selectionNotificationScheduled || this._destroyed || (this.selectionNotificationScheduled = !0, queueMicrotask(() => {
			this.selectionNotificationScheduled = !1, this._destroyed || this.emitSelectionChange();
		}));
	}
	finishSelectionNotificationChain() {
		this.pendingSelectionChange = !1, this.selectionNotificationCount = 0;
	}
	getHeaderHit(e, t) {
		let n = this.currentWorksheet;
		if (!n) return null;
		let r = this.viewport.scale, i = this.canvasArea.getBoundingClientRect(), a = this.screenX(e - i.left, 0), o = t - i.top, s = Math.round(50 * r), c = Math.round(22 * r), l = a < s, u = o < c;
		if (!l && !u) return null;
		if (l && u) return { kind: "corner" };
		let d = Q(n);
		if (l) {
			let e = o - c;
			if (e < 0) return { kind: "corner" };
			let t = d.rowAt(e, this.viewportTop, r);
			return t === null ? null : {
				kind: "row",
				row: t
			};
		}
		let f = a - s;
		if (f < 0) return { kind: "corner" };
		let p = d.colAt(f, this.effectiveScrollLeft, r);
		return p === null ? null : {
			kind: "col",
			col: p
		};
	}
	getResizeTarget(e, t) {
		let n = this.currentWorksheet;
		if (!n) return null;
		let r = this.viewport.scale, i = this.canvasArea.getBoundingClientRect(), a = this.screenX(e - i.left, 0), o = t - i.top, s = Math.round(50 * r), c = Math.round(22 * r), l = Q(n).maximumDigitWidth;
		if (o <= c && a > s) {
			let n = this.getHeaderHit(e, t);
			if (n?.kind !== "col") return null;
			let r = /* @__PURE__ */ new Map(), i = [];
			for (let e of [n.col - 1, n.col]) {
				if (e < 1) continue;
				let t = this._cellRect(1, e);
				t && (r.set(e, t.x), i.push({
					index: e,
					edge: t.x + t.w
				}));
			}
			let o = dl(a, i, tl, s);
			return o === null ? null : {
				kind: "col",
				index: o,
				originScaled: r.get(o),
				mdw: l
			};
		}
		if (a <= s && o > c) {
			let n = this.getHeaderHit(e, t);
			if (n?.kind !== "row") return null;
			let r = /* @__PURE__ */ new Map(), i = [];
			for (let e of [n.row - 1, n.row]) {
				if (e < 1) continue;
				let t = this._cellRect(e, 1);
				t && (r.set(e, t.y), i.push({
					index: e,
					edge: t.y + t.h
				}));
			}
			let a = dl(o, i, tl, c);
			return a === null ? null : {
				kind: "row",
				index: a,
				originScaled: r.get(a),
				mdw: l
			};
		}
		return null;
	}
	applyResize(e, t) {
		let n = this.resizeDrag, r = this.currentWorksheet;
		if (!n || !r) return;
		let i = this.viewport.scale, a = this.canvasArea.getBoundingClientRect();
		if (n.kind === "col") {
			let t = this.screenX(e - a.left, 0), o = Math.max(nl, Math.round((t - n.originScaled) / i));
			r.colWidths[n.index] = Wr(o, n.mdw), this.recordSizeOverride("col", n.index);
		} else {
			let e = t - a.top, o = Math.max(nl, Math.round((e - n.originScaled) / i));
			r.rowHeights[n.index] = Kr(o), this.recordSizeOverride("row", n.index);
		}
		Yr.invalidate(r), this.updateSpacerSize(r), this.updateSelectionOverlay(), this.scheduleRender();
	}
	refitAutoRowsAfterColumnResize() {
		let e = this.currentWorksheet, t = this.preparedWorkbook;
		if (!e || !t) return;
		qa(e, this.sizeOverrideStore.get(this.currentSheet)?.rows.keys() ?? []);
		let n = t[xs];
		if (typeof n != "function") return;
		let r = this.hostDocument.createElement("canvas").getContext("2d");
		r && (n.call(t, e, r), this.syncAutomaticRowOverrides(this.currentSheet, e), this.updateSpacerSize(e), this.updateSelectionOverlay(), this.scheduleRender());
	}
	setSelectionColor(e) {
		this.opts.selectionColor = e, this.updateSelectionOverlay();
	}
	async setHiddenSheetMode(e) {
		this._hiddenSheetMode = e, this.buildTabs(), e === "skip" && this.wb && this.wb.isHidden(this.currentSheet) ? await this.showSheet(_t(this.currentSheet, (e) => this.wb.isHidden(e), this.sheetCount)) : this.updateTabActive(this.currentSheet);
	}
	get hiddenSheetMode() {
		return this._hiddenSheetMode;
	}
	get visibleSheetCount() {
		if (!this.wb) return 0;
		let e = this.wb;
		return vt((t) => e.isHidden(t), this.sheetCount);
	}
	async copySelection() {
		this.assertOpen();
		let e = this.currentWorksheet, t = this.selectionState;
		if (!e || !t) return { status: "empty-selection" };
		if (t.areas.length !== 1) return { status: "unsupported-multiple-areas" };
		let n = t.areas[0], r = 1, i = 1;
		for (let t of e.rows) {
			t.index > r && (r = t.index);
			for (let e of t.cells) e.col > i && (i = e.col);
		}
		let { r1: a, r2: o, c1: s, c2: c } = n.kind === "sheet" ? {
			r1: 1,
			r2: r,
			c1: 1,
			c2: i
		} : n.kind === "rows" ? {
			r1: n.firstRow,
			r2: n.lastRow,
			c1: 1,
			c2: i
		} : n.kind === "columns" ? {
			r1: 1,
			r2: r,
			c1: n.firstColumn,
			c2: n.lastColumn
		} : {
			r1: n.top,
			r2: n.bottom,
			c1: n.left,
			c2: n.right
		}, l = o - a + 1, u = c - s + 1;
		if (l > Math.floor(rl / u)) return {
			status: "too-large",
			limit: "cells"
		};
		let d = l * u, f = Math.max(0, l - 1) + l * Math.max(0, u - 1);
		if (f > il) return {
			status: "too-large",
			limit: "text"
		};
		let p = /* @__PURE__ */ new Map();
		for (let t of e.rows) if (!(t.index < a || t.index > o)) for (let n of t.cells) {
			if (n.col < s || n.col > c) continue;
			let r = n.value, i = this.wb?.cellText(e, n) ?? "";
			if (this.wb || (r.type === "text" ? i = r.runs ? r.runs.map((e) => e.text).join("") : r.text : r.type === "number" ? i = String(r.number) : r.type === "bool" ? i = r.bool ? "TRUE" : "FALSE" : r.type === "error" && (i = r.error)), i) {
				let e = ul(i, il - f);
				if (e === null) return {
					status: "too-large",
					limit: "text"
				};
				f += e.length;
				let r = p.get(t.index);
				r || (r = /* @__PURE__ */ new Map(), p.set(t.index, r)), r.set(n.col, e);
			}
		}
		let m = [];
		for (let e = a; e <= o; e++) {
			let t = [], n = p.get(e);
			for (let e = s; e <= c; e++) {
				let r = n?.get(e) ?? "";
				t.push(r);
			}
			m.push(t.join("	"));
		}
		let h = this.hostWindow.navigator.clipboard;
		if (!h) return { status: "clipboard-unavailable" };
		try {
			return await h.writeText(m.join("\n")), {
				status: "copied",
				cellCount: d,
				utf16CodeUnits: f
			};
		} catch {
			return { status: "clipboard-denied" };
		}
	}
	updateSelectionOverlay() {
		if (this.overlayHost.clearSelection(), this.elementContext) {
			this.drawElementContextOverlay();
			return;
		}
		let e = this.selectionState;
		if (!e) return;
		let t = this.viewport.scale, n = this.currentWorksheet;
		if (!n) return;
		let r = (e) => Math.round(e * t), i = r(50), a = r(22), o = this.canvasArea.clientWidth, s = this.canvasArea.clientHeight, c = Q(n), l = c.effectiveFrozenBands({
			scale: t,
			width: o,
			height: s,
			headerWidth: 50,
			headerHeight: 22,
			rows: n.freezeRows ?? 0,
			cols: n.freezeCols ?? 0
		}), u = c.axesAtScale(t), d = u.col.offsetOf(l.cols + 1), f = u.row.offsetOf(l.rows + 1), p = l.cols > 0 ? [{
			first: 1,
			last: l.cols,
			start: i,
			end: Math.min(o, i + d)
		}, {
			first: l.cols + 1,
			last: Z,
			start: Math.min(o, i + d),
			end: o
		}] : [{
			first: 1,
			last: Z,
			start: i,
			end: o
		}], m = l.rows > 0 ? [{
			first: 1,
			last: l.rows,
			start: a,
			end: Math.min(s, a + f)
		}, {
			first: l.rows + 1,
			last: Jr,
			start: Math.min(s, a + f),
			end: s
		}] : [{
			first: 1,
			last: Jr,
			start: a,
			end: s
		}], h = this.opts.selectionColor ?? el, { background: g } = fl(h), _ = /* @__PURE__ */ new Set(), v = [], y = [];
		for (let t of e.areas) {
			let e = t.kind === "cells" ? {
				top: t.top,
				bottom: t.bottom,
				left: t.left,
				right: t.right,
				topEdge: !0,
				bottomEdge: !0,
				leftEdge: !0,
				rightEdge: !0
			} : t.kind === "rows" ? {
				top: t.firstRow,
				bottom: t.lastRow,
				left: 1,
				right: Z,
				topEdge: !0,
				bottomEdge: !0,
				leftEdge: !1,
				rightEdge: !1
			} : t.kind === "columns" ? {
				top: 1,
				bottom: Jr,
				left: t.firstColumn,
				right: t.lastColumn,
				topEdge: !1,
				bottomEdge: !1,
				leftEdge: !0,
				rightEdge: !0
			} : {
				top: 1,
				bottom: Jr,
				left: 1,
				right: Z,
				topEdge: !1,
				bottomEdge: !1,
				leftEdge: !1,
				rightEdge: !1
			};
			for (let t of m) for (let n of p) {
				if (n.end <= n.start || t.end <= t.start) continue;
				let r = Math.max(e.top, t.first), i = Math.min(e.bottom, t.last), a = Math.max(e.left, n.first), o = Math.min(e.right, n.last);
				if (r > i || a > o) continue;
				let s = this._cellRect(r, a), c = this._cellRect(i, o);
				if (!s || !c) continue;
				let l = s.x, u = s.y, d = c.x + c.w, f = c.y + c.h, p = Math.max(l, n.start), m = Math.max(u, t.start), h = Math.min(d, n.end), g = Math.min(f, t.end), b = h - p, x = g - m;
				if (b <= 0 || x <= 0) continue;
				let S = e.topEdge && r === e.top && u >= t.start, C = e.bottomEdge && i === e.bottom && f <= t.end, w = e.leftEdge && a === e.left && l >= n.start, T = e.rightEdge && o === e.right && d <= n.end, E = this.screenX(p, b), D = this.isRtl ? T : w, O = this.isRtl ? w : T, k = [
					E,
					m,
					b,
					x,
					S,
					O,
					C,
					D
				].join("|");
				_.has(k) || (_.add(k), v.push(`M${E} ${m}h${b}v${x}h${-b}Z`), y.push({
					x: E,
					y: m,
					width: b,
					height: x,
					top: S,
					right: O,
					bottom: C,
					left: D
				}));
			}
		}
		if (v.length > 0) {
			let t = "http://www.w3.org/2000/svg", n = this.hostDocument.createElementNS(t, "svg");
			n.setAttribute("data-xlsx-selection-fill", ""), n.style.cssText = "position:absolute;inset:0;width:100%;height:100%;overflow:hidden;pointer-events:none;";
			let r = e.areas.length > 1, i = this._cellRect(e.activeCell.row, e.activeCell.col), a = `xlsx-selection-mask-${++ml}`, c = this.hostDocument.createElementNS(t, "defs"), l = this.hostDocument.createElementNS(t, "mask");
			l.setAttribute("id", a), l.setAttribute("maskUnits", "userSpaceOnUse"), l.setAttribute("x", "0"), l.setAttribute("y", "0"), l.setAttribute("width", String(o)), l.setAttribute("height", String(s));
			let u = this.hostDocument.createElementNS(t, "path");
			if (u.setAttribute("d", v.join("")), u.setAttribute("fill", "#fff"), l.appendChild(u), i) for (let e of m) for (let n of p) {
				let r = Math.max(i.x, n.start), a = Math.max(i.y, e.start), o = Math.min(i.x + i.w, n.end), s = Math.min(i.y + i.h, e.end);
				if (o <= r || s <= a) continue;
				let c = this.hostDocument.createElementNS(t, "rect");
				c.setAttribute("data-xlsx-active-cell-cutout", ""), c.setAttribute("x", String(this.screenX(r, o - r))), c.setAttribute("y", String(a)), c.setAttribute("width", String(o - r)), c.setAttribute("height", String(s - a)), c.setAttribute("fill", "#000"), l.appendChild(c);
			}
			c.appendChild(l), n.appendChild(c);
			let d = this.hostDocument.createElementNS(t, "rect");
			d.setAttribute("x", "0"), d.setAttribute("y", "0"), d.setAttribute("width", String(o)), d.setAttribute("height", String(s)), d.setAttribute("fill", g), d.setAttribute("mask", `url(#${a})`), n.appendChild(d);
			let f = r ? "" : pl(y);
			if (f) {
				let e = this.hostDocument.createElementNS(t, "path");
				e.setAttribute("data-xlsx-selection-border", ""), e.setAttribute("d", f), e.setAttribute("fill", "none"), e.setAttribute("stroke", h), e.setAttribute("stroke-width", "2"), e.setAttribute("stroke-linecap", "square"), e.setAttribute("stroke-linejoin", "miter"), n.appendChild(e);
			}
			if (i && r) for (let e of m) for (let r of p) {
				let a = Math.max(i.x, r.start), o = Math.max(i.y, e.start), s = Math.min(i.x + i.w, r.end), c = Math.min(i.y + i.h, e.end);
				if (s <= a || c <= o) continue;
				let l = this.hostDocument.createElementNS(t, "rect");
				l.setAttribute("data-xlsx-active-cell-border", ""), l.setAttribute("x", String(this.screenX(a, s - a))), l.setAttribute("y", String(o)), l.setAttribute("width", String(s - a)), l.setAttribute("height", String(c - o)), l.setAttribute("fill", "none"), l.setAttribute("stroke", h), l.setAttribute("stroke-width", "1"), n.appendChild(l);
			}
			this.overlayHost.appendSelection(n);
		}
		this.maybeDrawValidationDropdown();
	}
	drawElementContextOverlay() {
		let e = this.elementContext, t = this.currentWorksheet, n = this.elementContextViewport();
		if (!e || !t || !n || e.sheetIndex !== this.currentSheet) return;
		let r = Ls(t, e, n);
		if (!r) return;
		let i = this.hostDocument.createElement("div");
		i.setAttribute("data-xlsx-element-context-clip", ""), i.style.cssText = `position:absolute;left:${r.clip.x}px;top:${r.clip.y}px;width:${r.clip.width}px;height:${r.clip.height}px;overflow:hidden;pointer-events:none;`;
		let a = this.hostDocument.createElement("div");
		a.setAttribute("data-xlsx-element-context-outline", e.elementType);
		let o = this.opts.selectionColor ?? el;
		a.style.cssText = `position:absolute;left:${r.rect.x - r.clip.x}px;top:${r.rect.y - r.clip.y}px;width:${r.rect.width}px;height:${r.rect.height}px;box-sizing:border-box;border:2px solid ${o};background:color-mix(in srgb, ${o} 6%, transparent);transform:rotate(${r.rotation}deg);transform-origin:center;pointer-events:none;`, i.appendChild(a), this.overlayHost.appendSelection(i);
	}
	maybeDrawValidationDropdown() {
		if (this.validationArrowRect = null, this.selectionMode !== "cells") return;
		let e = this.currentWorksheet, t = this.activeCell;
		if (!e || !t || !Es(e.dataValidations, t.row, t.col)) return;
		let n = this._cellRect(t.row, t.col);
		if (!n) return;
		let r = this.viewport.scale, i = Math.round(50 * r), a = Math.round(22 * r), o = Math.max(14, Math.min(n.h, 22 * r)), s = n.x + n.w, c = n.y;
		if (s + o <= i || c + o <= a) return;
		let l = this.screenX(s, o), u = this.hostDocument.createElement("div");
		u.setAttribute("data-xlsx-validation-dropdown", ""), u.style.cssText = `position:absolute;left:${l}px;top:${c}px;width:${o}px;height:${o}px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;background:#f0f0f0;border:1px solid #7f7f7f;pointer-events:none;`;
		let d = Math.max(4, Math.round(o * .42));
		u.innerHTML = `<svg width="${d}" height="${d}" viewBox="0 0 10 6" aria-hidden="true"><path d="M0 0 L10 0 L5 6 Z" fill="#333"/></svg>`, this.overlayHost.appendSelection(u), this.validationArrowRect = {
			x: l,
			y: c,
			w: o,
			h: o
		}, this.validationPanel.style.display !== "none" && (this.validationPanelKey === `${t.row}:${t.col}` ? this.positionValidationPanel() : this.hideValidationPanel());
	}
	updateFindOverlay() {
		this.overlayHost.clearFind();
		let e = this.currentWorksheet;
		if (!e) return;
		let t = this.viewport.scale, n = (e) => Math.round(e * t), r = n(50), i = n(22), a = e.freezeRows ?? 0, o = e.freezeCols ?? 0, s = Q(e).roundedFrozenExtent(t), c = r + s.width, l = i + s.height, u = this.opts.findHighlightColors, d = _l(!0, u);
		for (let e of this._find.sheetHighlights(this.currentSheet)) {
			let t = this._cellRect(e.row, e.col);
			if (!t) continue;
			let { x: n, y: s, w: f, h: p } = t;
			if (n < r && (f -= r - n, n = r), s < i && (p -= i - s, s = i), e.col > o && n < c && (f -= c - n, n = c), e.row > a && s < l && (p -= l - s, s = l), f <= 0 || p <= 0) continue;
			let m = this.screenX(n, f), { border: h, background: g } = e.active ? d : _l(!1, u, e.color), _ = this.hostDocument.createElement("div");
			_.style.cssText = `position:absolute;left:${m}px;top:${s}px;width:${f}px;height:${p}px;box-sizing:border-box;border:${h};background:${g};pointer-events:none;`, this.overlayHost.appendFind(_);
		}
	}
	async findText(e, t = {}) {
		if (!this.wb) return [];
		let n = await this._find.find(e, t);
		return this.updateFindOverlay(), n;
	}
	async findNext() {
		return this._activateMatch(this._find.next());
	}
	async findPrev() {
		return this._activateMatch(this._find.prev());
	}
	clearFind() {
		this._find.invalidate(), this.updateFindOverlay();
	}
	async _activateMatch(e) {
		if (!e) return this.updateFindOverlay(), null;
		let { sheet: t, row: n, col: r } = e.location;
		return t !== this.currentSheet && await this.goToSheet(t), this._scrollCellIntoView(n, r), this.updateFindOverlay(), e;
	}
	_scrollCellIntoView(e, t, n = "nearest") {
		let r = this.currentWorksheet;
		if (!r) return;
		let i = this.viewport.scale, a = Q(r).scrollOffsetForCell(e, t, {
			scale: i,
			viewportWidth: this.canvasArea.clientWidth,
			viewportHeight: this.canvasArea.clientHeight,
			currentX: this.effectiveScrollLeft,
			currentY: this.viewportTop,
			headerWidth: 50,
			headerHeight: 22,
			align: n
		});
		this.viewportTop = a.y, this.setViewportLeft(a.x);
	}
	toggleValidationPanel() {
		let e = this.currentWorksheet, t = this.activeCell;
		if (!e || !t) return;
		let n = `${t.row}:${t.col}`;
		if (this.validationPanelKey === n) {
			this.hideValidationPanel();
			return;
		}
		let r = Es(e.dataValidations, t.row, t.col);
		r && (this.hideValidationPanel(), this.validationPanelKey = n, this.openValidationPanel(t, r.formula1));
	}
	async openValidationPanel(e, t) {
		let n = ++this.validationRequestGeneration, r = this.wb, i = this.currentSheet;
		if (!r || this._destroyed) return;
		let a;
		try {
			a = await r.resolveValidationList(i, t);
		} catch {
			if (!this.isCurrentValidationRequest(n, r, i, e)) return;
			a = {
				kind: "formula",
				formula: t ?? ""
			};
		}
		this.isCurrentValidationRequest(n, r, i, e) && (this.renderValidationPanel(a), this.positionValidationPanel(), this.installValidationOutsideHandler());
	}
	isCurrentValidationRequest(e, t, n, r) {
		let i = this.activeCell;
		return !this._destroyed && e === this.validationRequestGeneration && this.wb === t && this.currentSheet === n && this.validationPanelKey === `${r.row}:${r.col}` && i?.row === r.row && i?.col === r.col;
	}
	renderValidationPanel(e) {
		let t = this.validationPanel;
		if (t.textContent = "", e.kind === "formula" || e.values.length === 0) {
			let n = this.hostDocument.createElement("div");
			n.style.cssText = "padding:4px 8px;color:#666;font-style:italic;white-space:pre-wrap;word-break:break-word;", n.textContent = e.kind === "formula" ? e.formula ? `= ${e.formula}` : "(no list)" : "(empty list)", t.appendChild(n);
			return;
		}
		for (let n of e.values) {
			let e = this.hostDocument.createElement("div");
			e.setAttribute("data-xlsx-validation-item", ""), e.style.cssText = "padding:3px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:default;", e.textContent = n, e.addEventListener("pointerenter", () => {
				e.style.background = "#cfe3ff";
			}), e.addEventListener("pointerleave", () => {
				e.style.background = "";
			}), t.appendChild(e);
		}
	}
	positionValidationPanel() {
		let e = this.activeCell;
		if (!e) return;
		let t = this._cellRect(e.row, e.col);
		if (!t) return;
		let n = this.screenX(t.x, t.w);
		this.validationPanel.style.left = "-9999px", this.validationPanel.style.top = "-9999px", this.validationPanel.style.display = "block";
		let r = ls({
			cell: {
				x: n,
				y: t.y,
				w: t.w,
				h: t.h
			},
			panel: {
				w: this.validationPanel.offsetWidth,
				h: this.validationPanel.offsetHeight
			},
			viewport: {
				w: this.canvasArea.clientWidth,
				h: this.canvasArea.clientHeight
			},
			rtl: this.isRtl
		});
		this.overlayHost.showValidation(r.left, r.top);
	}
	installValidationOutsideHandler() {
		this.validationOutsideHandler || (this.validationOutsideHandler = (e) => {
			let t = e.target;
			if (t && this.validationPanel.contains(t)) return;
			let { x: n, y: r } = this.surface.localPoint(e.clientX, e.clientY), i = this.validationArrowRect;
			i && n >= i.x && n <= i.x + i.w && r >= i.y && r <= i.y + i.h || this.hideValidationPanel();
		}, this.hostDocument.addEventListener("pointerdown", this.validationOutsideHandler, !0));
	}
	hideValidationPanel() {
		this.validationRequestGeneration++, this.overlayHost.hideValidation(), this.validationPanelKey = null, this.validationOutsideHandler &&= (this.hostDocument.removeEventListener("pointerdown", this.validationOutsideHandler, !0), null);
	}
	buildCommentMap(e) {
		this.commentMap = this.createCommentMap(e.comments ?? []);
	}
	createCommentMap(e) {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) {
			let e = Xr(n.cellRef);
			e && t.set(`${e.row}:${e.col}`, n);
		}
		return t;
	}
	createVisibleSheetView(e) {
		let t = xc(e);
		if (this.opts.comments === !1) return {
			...t,
			commentRefs: [],
			comments: []
		};
		if ((typeof this.opts.comments == "object" ? this.opts.comments : void 0)?.includeResolved !== !1) return t;
		let n = new Set((t.comments ?? []).filter((e) => e.resolved === !0).map((e) => e.cellRef));
		return n.size === 0 ? t : {
			...t,
			commentRefs: t.commentRefs?.filter((e) => !n.has(e)),
			comments: t.comments?.filter((e) => !n.has(e.cellRef))
		};
	}
	buildHyperlinkMap(e) {
		this.hyperlinkMap = /* @__PURE__ */ new Map();
		for (let t of e.hyperlinks ?? []) this.hyperlinkMap.set(`${t.row}:${t.col}`, t);
	}
	hyperlinkAtCell(e) {
		return this.opts.enableHyperlinks === !1 ? null : this.hyperlinkMap.get(`${e.row}:${e.col}`) ?? null;
	}
	dispatchHyperlink(e) {
		let t = this.hyperlinkAtCell(e);
		if (!t) return !1;
		let n;
		if (t.url) n = {
			kind: "external",
			url: t.url
		};
		else if (t.location) n = {
			kind: "internal",
			ref: t.location
		};
		else return !1;
		let r = this.opts.onHyperlinkClick;
		return r ? (r(n), !0) : (n.kind === "external" ? ae(n.url, void 0, this.hostWindow) : this.navigateInternalHyperlink(n.ref).catch((e) => this._reportRenderError(e)), !0);
	}
	async navigateInternalHyperlink(e) {
		let t = js(e, this.currentSheet, this.sheetNames, this.currentWorksheet?.definedNames ?? []);
		t && (t.sheetIndex !== this.currentSheet && await this.goToSheet(t.sheetIndex), await this.scrollToCell(t.cellRef));
	}
	scheduleCommentPopup(e) {
		let t = `${e.row}:${e.col}`, n = this.commentMap.get(t);
		if (!n) {
			this.hideCommentPopup();
			return;
		}
		this.commentPopupKey !== t && (this.hideCommentPopup(), this.commentPopupKey = t, this.commentPopupTimer = setTimeout(() => {
			this.commentPopupTimer = null, this.renderCommentPopup(e, n).catch((e) => this._reportRenderError(e));
		}, Pc));
	}
	async loadCommentUi() {
		let e = this.commentUi ?? await Nc();
		return this._destroyed || (this.commentUi = e), e;
	}
	async renderCommentPopup(e, t) {
		if (!this._cellRect(e.row, e.col)) return;
		let n = ++this.commentPopupRenderGeneration, r = await this.loadCommentUi();
		if (this._destroyed || n !== this.commentPopupRenderGeneration || !this._cellRect(e.row, e.col)) return;
		this.commentPopupCell = e;
		let i = `sheet:${this.currentSheet}:cell:${t.cellRef}:comment:${t.id ?? "root"}`, a = {
			occurrenceKey: i,
			root: {
				messageKey: `${i}:root`,
				sourceId: t.id,
				author: t.author,
				date: t.date,
				text: t.rootText ?? t.text,
				status: t.resolved ? "resolved" : "active"
			},
			replies: (t.replies ?? []).map((e, t) => ({
				messageKey: `${i}:reply:${e.id ?? t}`,
				sourceId: e.id,
				author: e.author,
				date: e.date,
				text: e.text,
				status: e.resolved ? "resolved" : "active"
			}))
		};
		r.paintReadOnlyCommentCard(this.commentPopup, a, {
			interactive: !1,
			standalone: !0
		});
		let o = (t.rootText ?? t.text).trim(), s = t.author?.trim() ? ` by ${t.author.trim()}` : "", c = t.replies?.length ?? 0, l = c === 0 ? "" : `; ${c} ${c === 1 ? "reply" : "replies"}`;
		this.overlayHost.announceComment(`Comment on ${t.cellRef}${s}${o ? `: ${o}` : ""}${l}`), this.commentPopup.dataset.ooxmlCommentUi = "popup", this.commentPopup.style.maxWidth = `${Fc}px`, this.commentPopup.style.maxHeight = `${Ic}px`, this.commentPopup.style.left = "-9999px", this.commentPopup.style.top = "-9999px", this.commentPopup.style.display = "", this.positionCommentPopup();
	}
	scheduleCommentPopupPosition() {
		if (this.commentPopupPositionScheduled || !this.commentPopupCell) return;
		this.commentPopupPositionScheduled = !0;
		let e = () => {
			this.commentPopupPositionScheduled = !1, this.positionCommentPopup();
		}, t = this.hostDocument.defaultView;
		t?.requestAnimationFrame ? t.requestAnimationFrame(e) : queueMicrotask(e);
	}
	positionCommentPopup() {
		let e = this.commentPopupCell;
		if (!e || this.commentPopup.style.display === "none") return;
		let t = this._cellRect(e.row, e.col);
		if (!t) return;
		let n = sc({
			cell: {
				x: this.screenX(t.x, t.w),
				y: t.y,
				w: t.w,
				h: t.h
			},
			popup: {
				w: this.commentPopup.offsetWidth,
				h: this.commentPopup.offsetHeight
			},
			viewport: {
				w: this.canvasArea.clientWidth,
				h: this.canvasArea.clientHeight
			},
			rtl: this.isRtl
		});
		this.overlayHost.showComment(n.left, n.top);
	}
	hideCommentPopup() {
		this.commentPopupRenderGeneration++, this.commentPopupTimer !== null && (clearTimeout(this.commentPopupTimer), this.commentPopupTimer = null), this.commentPopupKey = null, this.commentPopupCell = null, this.overlayHost.hideComment(), this.commentPopup.replaceChildren();
	}
	applyPointerSelection(e, t, n, r, i, a) {
		let o = this.getHeaderHit(e, t);
		if (o) {
			if (o.kind === "corner") this.selectionController.select({
				row: 1,
				col: 1
			}, "all"), this.selectionController.endDrag();
			else if (o.kind === "row") if (n && this.anchorCell && this.selectionMode === "rows") this.selectionController.extend({
				row: o.row,
				col: 1
			});
			else {
				let e = r ? this.selectionController.add({
					row: o.row,
					col: 1
				}, "rows") : (this.selectionController.select({
					row: o.row,
					col: 1
				}, "rows"), !0);
				a && e && (this.beginSelectionDrag(i), this.scrollHost.setPointerCapture(i));
			}
			else if (n && this.anchorCell && this.selectionMode === "cols") this.selectionController.extend({
				row: 1,
				col: o.col
			});
			else {
				let e = r ? this.selectionController.add({
					row: 1,
					col: o.col
				}, "cols") : (this.selectionController.select({
					row: 1,
					col: o.col
				}, "cols"), !0);
				a && e && (this.beginSelectionDrag(i), this.scrollHost.setPointerCapture(i));
			}
			this.updateSelectionOverlay(), this.renderCurrentSheet().catch((e) => this._reportRenderError(e)), this.emitSelectionChange();
			return;
		}
		let s = this.getCellAt(e, t);
		if (!s) return;
		let c = !0;
		n && this.anchorCell && this.selectionMode === "cells" ? this.selectionController.extend(s) : c = r ? this.selectionController.add(s, "cells") : (this.selectionController.select(s, "cells"), !0), a && c && (this.beginSelectionDrag(i), this.scrollHost.setPointerCapture(i)), this.updateSelectionOverlay(), this.wb && this.renderCurrentSheet().catch((e) => this._reportRenderError(e)), this.emitSelectionChange();
	}
	viewportInputBounds() {
		let e = this.canvasArea.getBoundingClientRect(), t = e.left + this.scrollHost.clientLeft, n = e.top + this.scrollHost.clientTop, r = Math.max(0, e.width - this.scrollHost.clientLeft), i = Math.max(0, e.height - this.scrollHost.clientTop);
		return {
			left: t,
			top: n,
			width: Math.min(r, this.scrollHost.clientWidth || r),
			height: Math.min(i, this.scrollHost.clientHeight || i)
		};
	}
	extendDragSelection(e, t, n) {
		let r = e, i = t, a = this.viewportInputBounds(), o = e < a.left || e >= a.left + a.width || t < a.top || t >= a.top + a.height;
		if (n || o) {
			let e = this.viewport.scale, t = Math.round(50 * e), n = Math.round(22 * e), o = a.left + (this.isRtl ? 0 : t), s = a.left + a.width - (this.isRtl ? t : 0);
			r = Math.min(s - 1, Math.max(o + 1, r)), i = Math.min(a.top + a.height - 1, Math.max(a.top + n + 1, i));
		}
		if (this.selectionMode === "rows") {
			let e = n ? null : this.getHeaderHit(r, i), t = e?.kind === "row" ? e.row : this.getCellAt(r, i)?.row;
			return !t || t === this.activeCell?.row ? !1 : (this.selectionController.extend({
				row: t,
				col: 1
			}), !0);
		}
		if (this.selectionMode === "cols") {
			let e = n ? null : this.getHeaderHit(r, i), t = e?.kind === "col" ? e.col : this.getCellAt(r, i)?.col;
			return !t || t === this.activeCell?.col ? !1 : (this.selectionController.extend({
				row: 1,
				col: t
			}), !0);
		}
		let s = this.getCellAt(r, i);
		return !s || s.row === this.activeCell?.row && s.col === this.activeCell?.col ? !1 : (this.selectionController.extend(s), !0);
	}
	selectionAutoScrollSpeed() {
		let e = this.selectionAutoScrollPointer;
		if (!e) return {
			x: 0,
			y: 0
		};
		let t = this.viewportInputBounds();
		return Oc({
			x: e.clientX - t.left,
			y: e.clientY - t.top
		}, {
			width: t.width,
			height: t.height
		}, this.isRtl, this.selectionMode);
	}
	trackSelectionAutoScroll(e) {
		if (e.pointerId !== this.selectionPointerId) return;
		this.selectionAutoScrollPointer = {
			clientX: e.clientX,
			clientY: e.clientY,
			pointerId: e.pointerId
		};
		let t = this.selectionAutoScrollSpeed();
		if (t.x === 0 && t.y === 0) {
			this.stopSelectionAutoScroll();
			return;
		}
		this.selectionAutoScrollFrame === null && (this.selectionAutoScrollLastTime = null, this.selectionAutoScrollFrame = this.hostWindow.requestAnimationFrame((e) => this.runSelectionAutoScroll(e)));
	}
	runSelectionAutoScroll(e) {
		this.selectionAutoScrollFrame = null;
		let t = this.selectionAutoScrollPointer;
		if (!t || t.pointerId !== this.selectionPointerId || !this.isSelecting || this._destroyed) {
			this.stopSelectionAutoScroll();
			return;
		}
		let n = this.selectionAutoScrollSpeed();
		if (n.x === 0 && n.y === 0) {
			this.stopSelectionAutoScroll();
			return;
		}
		let r = this.selectionAutoScrollLastTime, i = r === null ? 1 / 60 : Math.min(.05, Math.max(0, e - r) / 1e3);
		this.selectionAutoScrollLastTime = e;
		let a = this.effectiveScrollLeft, o = this.viewportTop;
		this.setViewportLeft(a + n.x * i), this.viewportTop = o + n.y * i;
		let s = this.effectiveScrollLeft !== a || this.viewportTop !== o, c = s && this.extendDragSelection(t.clientX, t.clientY, !0);
		if (s && (this.updateSelectionOverlay(), this.updateFindOverlay(), this.scheduleRender(), this.emitViewportChange(), c && this.emitSelectionChange()), !s) {
			this.stopSelectionAutoScroll();
			return;
		}
		this.selectionAutoScrollFrame = this.hostWindow.requestAnimationFrame((e) => this.runSelectionAutoScroll(e));
	}
	stopSelectionAutoScroll() {
		this.selectionAutoScrollFrame !== null && (this.hostWindow.cancelAnimationFrame(this.selectionAutoScrollFrame), this.selectionAutoScrollFrame = null), this.selectionAutoScrollPointer = null, this.selectionAutoScrollLastTime = null;
	}
	contextMenuTargetIsSelected(e, t) {
		let n = this.selectionState;
		if (!n) return !1;
		let r = this.getHeaderHit(e, t);
		if (r?.kind === "corner") return n.areas.some((e) => e.kind === "sheet");
		if (r?.kind === "row") return n.areas.some((e) => e.kind === "sheet" || e.kind === "rows" && r.row >= e.firstRow && r.row <= e.lastRow);
		if (r?.kind === "col") return n.areas.some((e) => e.kind === "sheet" || e.kind === "columns" && r.col >= e.firstColumn && r.col <= e.lastColumn);
		let i = this.getCellAt(e, t);
		return i !== null && n.areas.some((e) => ec(e, i));
	}
	resolveContextMenuContext(e) {
		if (this._destroyed) return Promise.resolve(null);
		let t = this.elementContextAt(e.clientX, e.clientY);
		t ? this.setElementContext(t) : (this.setElementContext(null), this.contextMenuTargetIsSelected(e.clientX, e.clientY) || this.applyPointerSelection(e.clientX, e.clientY, !1, !1, -1, !1));
		let n = this.getSelectionContext();
		return Promise.resolve(n ? structuredClone(n) : null);
	}
	setupSelectionEvents() {
		this.opts.onContextMenu && this.surface.on("contextmenu", (e) => {
			let t;
			this.opts.onContextMenu?.({
				originalEvent: e,
				getContext: () => t ??= this.resolveContextMenuContext(e)
			});
		}), this.surface.on("pointerdown", (e) => {
			if (this.scrollHost.focus?.({ preventScroll: !0 }), e.button !== 0 || this.isSelecting && e.pointerId !== this.selectionPointerId) return;
			let t = this.opts.resizable ?? !0 ? this.getResizeTarget(e.clientX, e.clientY) : null;
			if (t) {
				e.preventDefault(), this.resizeDrag = {
					...t,
					pointerId: e.pointerId
				}, this.scrollHost.setPointerCapture(e.pointerId), this.hideCommentPopup();
				return;
			}
			let n = this.validationArrowRect;
			if (n) {
				let { x: t, y: r } = this.surface.localPoint(e.clientX, e.clientY);
				if (t >= n.x && t <= n.x + n.w && r >= n.y && r <= n.y + n.h) {
					e.preventDefault(), this.toggleValidationPanel();
					return;
				}
			}
			let r = this.scrollHost.getBoundingClientRect(), i = e.clientX - r.left - this.scrollHost.clientLeft, a = e.clientY - r.top - this.scrollHost.clientTop;
			if (i >= this.scrollHost.clientWidth || a >= this.scrollHost.clientHeight) return;
			let o = this._nativeScrollbars && (this.scrollHost.scrollWidth > this.scrollHost.clientWidth && this.scrollHost.clientHeight - a <= 16 || this.scrollHost.scrollHeight > this.scrollHost.clientHeight && this.scrollHost.clientWidth - i <= 16), s = this.elementContextAt(e.clientX, e.clientY);
			if (s) {
				this.pendingTap = null, this.pendingClick = null, this.pendingElementClick = {
					x: e.clientX,
					y: e.clientY,
					pointerId: e.pointerId,
					context: s
				};
				return;
			}
			if (this.setElementContext(null), e.pointerType !== "mouse" || o) {
				this.pendingTap = {
					x: e.clientX,
					y: e.clientY,
					shiftKey: e.shiftKey,
					additiveKey: e.ctrlKey || e.metaKey,
					pointerId: e.pointerId
				};
				return;
			}
			let c = this.getCellAt(e.clientX, e.clientY);
			this.pendingClick = c ? {
				x: e.clientX,
				y: e.clientY,
				pointerId: e.pointerId,
				cell: c
			} : null, this.applyPointerSelection(e.clientX, e.clientY, e.shiftKey, e.ctrlKey || e.metaKey, e.pointerId, !0);
		}), this.surface.on("pointermove", (e) => {
			if (this.resizeDrag && this.resizeDrag.pointerId === e.pointerId) {
				e.preventDefault(), this.applyResize(e.clientX, e.clientY);
				return;
			}
			if (e.pointerType === "mouse" && !this.isSelecting && (this.opts.resizable ?? !0)) {
				let t = this.getResizeTarget(e.clientX, e.clientY);
				if (this.scrollHost.style.cursor = t ? t.kind === "col" ? "col-resize" : "row-resize" : "", t) {
					this.hideCommentPopup();
					return;
				}
			}
			if (this.pendingTap && this.pendingTap.pointerId === e.pointerId) {
				let t = e.clientX - this.pendingTap.x, n = e.clientY - this.pendingTap.y;
				t * t + n * n > 64 && (this.pendingTap = null);
			}
			if (this.pendingClick && this.pendingClick.pointerId === e.pointerId) {
				let t = e.clientX - this.pendingClick.x, n = e.clientY - this.pendingClick.y;
				t * t + n * n > 64 && (this.pendingClick = null);
			}
			if (this.pendingElementClick?.pointerId === e.pointerId) {
				let t = e.clientX - this.pendingElementClick.x, n = e.clientY - this.pendingElementClick.y;
				t * t + n * n > 64 && (this.pendingElementClick = null);
			}
			if (e.pointerType === "mouse" && !this.isSelecting) {
				let t = this.getCellAt(e.clientX, e.clientY);
				t ? this.scheduleCommentPopup(t) : this.hideCommentPopup(), this.scrollHost.style.cursor = t && this.hyperlinkAtCell(t) ? "pointer" : "";
			}
			!this.isSelecting || e.pointerId !== this.selectionPointerId || (this.trackSelectionAutoScroll(e), this.extendDragSelection(e.clientX, e.clientY, !1) && (this.updateSelectionOverlay(), this.scheduleRender(), this.emitSelectionChange()));
		}), this.surface.on("pointerup", (e) => {
			if (this.resizeDrag && this.resizeDrag.pointerId === e.pointerId) {
				this.resizeDrag.kind === "col" && this.refitAutoRowsAfterColumnResize(), this.scrollHost.releasePointerCapture(e.pointerId), this.resizeDrag = null;
				return;
			}
			if (this.pendingElementClick?.pointerId === e.pointerId) {
				let t = this.pendingElementClick;
				this.pendingElementClick = null;
				let n = e.clientX - t.x, r = e.clientY - t.y, i = n * n + r * r <= 64 ? this.elementContextAt(e.clientX, e.clientY) : null;
				i && i.sheetIndex === t.context.sheetIndex && i.elementType === t.context.elementType && i.elementIndex === t.context.elementIndex && i.shapeIndex === t.context.shapeIndex && this.setElementContext(i);
				return;
			}
			if (this.pendingTap && this.pendingTap.pointerId === e.pointerId) {
				let t = e.clientX - this.pendingTap.x, n = e.clientY - this.pendingTap.y;
				if (t * t + n * n <= 64) {
					if (this.applyPointerSelection(e.clientX, e.clientY, this.pendingTap.shiftKey, this.pendingTap.additiveKey, e.pointerId, !1), e.pointerType !== "mouse" && this.activeCell) {
						let e = `${this.activeCell.row}:${this.activeCell.col}`, t = this.commentMap.get(e);
						t ? (this.hideCommentPopup(), this.renderCommentPopup(this.activeCell, t).catch((e) => this._reportRenderError(e))) : this.hideCommentPopup();
					}
					this.activeCell && this.dispatchHyperlink(this.activeCell);
				}
				this.pendingTap = null;
			}
			let t = e.pointerId === this.selectionPointerId;
			if (t && this.stopSelectionAutoScroll(), this.pendingClick && this.pendingClick.pointerId === e.pointerId) {
				let t = e.clientX - this.pendingClick.x, n = e.clientY - this.pendingClick.y, r = this.getCellAt(e.clientX, e.clientY);
				t * t + n * n <= 64 && r && r.row === this.pendingClick.cell.row && r.col === this.pendingClick.cell.col && this.dispatchHyperlink(this.pendingClick.cell), this.pendingClick = null;
			}
			t && this.selectionController.endDrag(e.pointerId);
		}), this.surface.on("pointercancel", (e) => {
			this.resizeDrag && this.resizeDrag.pointerId === e.pointerId && (this.resizeDrag.kind === "col" && this.refitAutoRowsAfterColumnResize(), this.resizeDrag = null), this.pendingTap && this.pendingTap.pointerId === e.pointerId && (this.pendingTap = null), this.pendingClick && this.pendingClick.pointerId === e.pointerId && (this.pendingClick = null), this.pendingElementClick?.pointerId === e.pointerId && (this.pendingElementClick = null), e.pointerId === this.selectionPointerId && (this.stopSelectionAutoScroll(), this.selectionController.endDrag(e.pointerId));
		}), this.surface.on("wheel", (e) => {
			if (!(e.ctrlKey || e.metaKey)) {
				if (!this._nativeScrollbars) {
					e.preventDefault();
					let t = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : e.deltaMode === WheelEvent.DOM_DELTA_PAGE ? Math.max(1, this.scrollHost.clientHeight) : 1, n = (e.shiftKey ? e.deltaY : e.deltaX) * t, r = (e.shiftKey ? 0 : e.deltaY) * t;
					this.setViewportLeft(this.effectiveScrollLeft + n), this.viewportTop += r, this.scheduleRender(), this.updateSelectionOverlay(), this.updateFindOverlay(), this.emitViewportChange();
				}
				return;
			}
			if (e.preventDefault(), e.deltaY === 0) return;
			let { x: t, y: n } = this.surface.localPoint(e.clientX, e.clientY);
			this._pendingZoomAnchor = Number.isFinite(t) && Number.isFinite(n) ? {
				x: t,
				y: n
			} : null, this.setScale(K(this.viewport.scale, e.deltaY, e.deltaMode));
		}, { passive: !1 }), this.surface.on("pointerleave", (e) => {
			let t = e.relatedTarget;
			t && this.commentPopup.contains(t) || this.hideCommentPopup();
		}), this.surface.on("focus", () => {
			this.currentWorksheet && !this.activeCell && this.setSelection("A1");
		}), this.keydownHandler = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "c") {
				if (e.defaultPrevented || e.isComposing) return;
				let t = e.target, n = t?.tagName;
				if (t?.isContentEditable || n === "INPUT" || n === "TEXTAREA" || n === "SELECT") return;
				e.preventDefault(), this.copySelection();
			} else if (!e.defaultPrevented && !e.isComposing && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey && (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")) {
				let t = this.activeCell, n = e.key === "ArrowUp" ? -1 : +(e.key === "ArrowDown"), r = e.key === "ArrowLeft" ? this.isRtl ? 1 : -1 : e.key === "ArrowRight" ? this.isRtl ? -1 : 1 : 0, i = t ? {
					row: Math.max(1, Math.min(Jr, t.row + n)),
					col: Math.max(1, Math.min(Z, t.col + r))
				} : {
					row: 1,
					col: 1
				};
				e.preventDefault(), this.hideCommentPopup();
				let a = Zr(i.row, i.col);
				this.setSelection(a), this._scrollCellIntoView(i.row, i.col), this.updateSelectionOverlay(), this.updateFindOverlay(), this.emitViewportChange();
			} else if (e.key === "Escape" && this.validationPanel.style.display !== "none") this.hideValidationPanel();
			else if (e.key === "Escape" && this.commentPopup.style.display !== "none") this.hideCommentPopup();
			else if (e.key === "Enter" && this.activeCell && !e.defaultPrevented && !e.isComposing && !e.ctrlKey && !e.metaKey && !e.altKey) {
				let t = this.commentMap.get(`${this.activeCell.row}:${this.activeCell.col}`);
				t && (e.preventDefault(), this.hideCommentPopup(), this.renderCommentPopup(this.activeCell, t).catch((e) => this._reportRenderError(e)));
			}
		}, this.surface.on("keydown", this.keydownHandler);
	}
	buildTabs() {
		this._mountKind !== "sheet" && (this.tabList.innerHTML = "", this.tabs = [], this.tabColors = this.workbook.tabColors, this.workbook.sheetNames.forEach((e, t) => {
			let n = this.hostDocument.createElement("button");
			n.textContent = e, n.title = e, n.style.cssText = this.tabCss(t, !1), n.addEventListener("click", () => {
				this.goToSheet(t).catch((e) => this._reportRenderError(e));
			}), this.tabList.appendChild(n), this.tabs.push(n);
		}), this.updateNavButtons());
	}
	makeNavButton(e, t, n) {
		let r = this.hostDocument.createElement("button");
		return r.textContent = e, r.setAttribute("aria-label", t), r.title = t, r.classList.add("xlsx-tab-nav"), r.style.cssText = this.navButtonStyle(!1), r.addEventListener("click", n), r;
	}
	navButtonStyle(e) {
		return e ? "flex:1;height:100%;padding:0;display:flex;align-items:center;justify-content:center;border:none;color:var(--ooxml-xlsx-chrome-text-muted,#666);font-size:9px;line-height:1;box-sizing:border-box;outline:none;opacity:0.3;cursor:default;pointer-events:none;" : "flex:1;height:100%;padding:0;display:flex;align-items:center;justify-content:center;border:none;color:var(--ooxml-xlsx-chrome-text-muted,#666);font-size:9px;line-height:1;box-sizing:border-box;outline:none;cursor:pointer;";
	}
	scrollTabs(e) {
		let t = this.tabStrip, n = t.scrollLeft, r = n + t.clientWidth, i = null;
		if (e === 1) {
			let e = Infinity;
			for (let t of this.tabs) {
				let n = t.offsetLeft + t.offsetWidth;
				n > r + 1 && (e = Math.min(e, n));
			}
			Number.isFinite(e) && (i = e - t.clientWidth);
		} else {
			let e = -Infinity;
			for (let t of this.tabs) {
				let r = t.offsetLeft;
				r < n - 1 && (e = Math.max(e, r));
			}
			Number.isFinite(e) && (i = e);
		}
		i !== null && (t.scrollLeft = Math.max(0, Math.min(i, t.scrollWidth - t.clientWidth))), this.updateNavButtons();
	}
	updateNavButtons() {
		if (this._mountKind === "sheet") return;
		let e = this.tabStrip, t = e.scrollLeft <= 0, n = e.scrollLeft + e.clientWidth >= e.scrollWidth - 1;
		this.navPrev.style.cssText = this.navButtonStyle(t), this.navNext.style.cssText = this.navButtonStyle(n);
	}
	updateTabActive(e) {
		this.tabs.forEach((t, n) => {
			t.style.cssText = this.tabCss(n, n === e);
		});
		let t = this.tabs[e];
		if (t && t.offsetParent !== null) {
			let e = this.tabStrip, n = t.getBoundingClientRect(), r = e.getBoundingClientRect();
			n.left < r.left ? e.scrollLeft -= r.left - n.left : n.right > r.right && (e.scrollLeft += n.right - r.right);
		}
		this.updateNavButtons();
	}
	tabStyle(e, t) {
		let n = zc - 2, r = zc - 5, i = t ? `box-shadow:inset 0 -${e ? 2 : 3}px 0 0 ${t};` : "";
		return e ? `display:inline-block;flex:none;padding:0 14px;position:relative;border:1px solid var(--ooxml-xlsx-chrome-border,#c8ccd0);border-bottom:none;border-radius:3px 3px 0 0;cursor:pointer;white-space:nowrap;max-width:160px;overflow:hidden;text-overflow:ellipsis;outline:none;box-sizing:border-box;height:${n}px;font-size:13px;background:var(--ooxml-xlsx-chrome-surface,#fff);color:var(--ooxml-xlsx-chrome-text,#000);border-bottom:1px solid var(--ooxml-xlsx-chrome-surface,#fff);font-weight:600;top:1px;` + i : `display:inline-block;flex:none;padding:0 14px;position:relative;border:1px solid var(--ooxml-xlsx-chrome-border,#c8ccd0);border-bottom:none;border-radius:3px 3px 0 0;cursor:pointer;white-space:nowrap;max-width:160px;overflow:hidden;text-overflow:ellipsis;outline:none;box-sizing:border-box;height:${r}px;font-size:11px;background:var(--ooxml-xlsx-chrome-surface-muted,#e0e0e0);color:var(--ooxml-xlsx-chrome-text-muted,#555);` + i;
	}
	tabCss(e, t) {
		let n = this.tabStyle(t, this.tabColors[e]);
		return this._hiddenSheetMode !== "show" && this.wb?.isHidden(e) && (n += this._hiddenSheetMode === "skip" ? "display:none;" : `opacity:${Wc};`), n;
	}
	buildZoomControl() {
		let e = this.opts.zoomMin ?? .1, t = this.opts.zoomMax ?? 4, n = this.viewport.scale, r = this.hostDocument.createElement("div");
		r.style.cssText = "display:flex;align-items:center;flex-shrink:0;gap:2px;padding:0 10px;height:100%;color:var(--ooxml-xlsx-chrome-text-muted,#555);font-size:12px;user-select:none;";
		let i = (e, t, n) => {
			let r = this.hostDocument.createElement("button");
			return r.type = "button", r.textContent = e, r.setAttribute("aria-label", t), r.title = t, r.style.cssText = "width:18px;height:18px;padding:0;border:none;background:transparent;color:var(--ooxml-xlsx-chrome-text-muted,#555);font-size:14px;line-height:1;cursor:pointer;border-radius:3px;", r.addEventListener("click", n), r;
		}, a = this.hostDocument.createElement("input");
		a.type = "range", a.min = "0", a.max = "100", a.step = "any", a.value = String(this.zoomScaleToPos(n, e, t)), a.setAttribute("aria-label", "Zoom"), a.title = "Zoom", a.classList.add("xlsx-zoom-slider"), a.style.cssText = "width:90px;cursor:pointer;", a.addEventListener("input", () => {
			let n = Number(a.value), r = Math.abs(n - 50) <= Bc ? 50 : n;
			r === 50 && (a.value = "50"), this.setScale(this.zoomPosToScale(r, e, t));
		});
		let o = this.hostDocument.createElement("span");
		return o.textContent = `${Math.round(n * 100)}%`, o.style.cssText = "min-width:42px;margin-left:6px;text-align:right;font-variant-numeric:tabular-nums;", r.appendChild(i("−", "Zoom out", () => this.zoomOut())), r.appendChild(a), r.appendChild(i("+", "Zoom in", () => this.zoomIn())), r.appendChild(o), this.zoomSlider = a, this.zoomLabel = o, r;
	}
	zoomPosToScale(e, t, n) {
		return e <= 50 ? t + e / 50 * (1 - t) : 1 + (e - 50) / 50 * (n - 1);
	}
	zoomScaleToPos(e, t, n) {
		let r = Math.min(n, Math.max(t, e));
		return r <= 1 ? (r - t) / (1 - t) * 50 : 50 + (r - 1) / (n - 1) * 50;
	}
	setScale(e) {
		let t = this.opts.zoomMin ?? .1, n = this.opts.zoomMax ?? 4, r = Math.min(Math.round(n * 100), Math.max(Math.round(t * 100), Math.round(e * 100))), i = r / 100, a = this.viewport.scale, o = this._pendingZoomAnchor;
		if (this._pendingZoomAnchor = null, i !== a) {
			if (this.viewport.setScale(i), this.zoomSlider && (this.zoomSlider.value = String(this.zoomScaleToPos(i, t, n))), this.zoomLabel && (this.zoomLabel.textContent = `${r}%`), this.currentWorksheet) {
				let e = this.effectiveScrollLeft, t = this.viewportTop;
				if (this.layoutGutters(), this.updateSpacerSize(this.currentWorksheet), o) {
					this.viewportTop = ye(t, o.y, a, i, { maxScroll: this.maxScrollTop });
					let n = this.screenX(o.x, 0), r = this.maxScrollLeft, s = ye(e, n, a, i, { maxScroll: r });
					this.setViewportLeft(s);
				} else this.setViewportLeft(e);
			}
			this.renderCurrentSheet().catch((e) => this._reportRenderError(e)), this.updateSelectionOverlay(), this.updateFindOverlay(), this.updateNavButtons(), this.opts.onScaleChange?.(i);
		}
	}
	getScale() {
		return this.viewport.scale;
	}
	zoomIn() {
		this.setScale(Se(this.getScale()));
	}
	zoomOut() {
		this.setScale(Fe(this.getScale()));
	}
	fitWidth() {
		this._fit("width");
	}
	fitPage() {
		this._fit("page");
	}
	_fit(e) {
		let t = this.currentWorksheet;
		if (!t) return;
		let { width: n, height: r } = this._naturalContentExtent(t), i = Ie({
			contentWidth: n,
			contentHeight: r,
			containerWidth: this.canvasArea.clientWidth,
			containerHeight: this.canvasArea.clientHeight
		}, e);
		i <= 0 || this.setScale(i);
	}
	_naturalContentExtent(e) {
		let { maxRow: t, maxCol: n } = kc(e);
		return Q(e).logicalContentExtent(t, n, 50, 22);
	}
	updateSpacerSize(e) {
		let t = this.viewport.scale;
		e.freezeRows, e.freezeCols;
		let { maxRow: n, maxCol: r } = kc(e);
		n += 30, r += 10;
		let i = Q(e).roundedContentExtent(n, r, t, 50, 22), a = i.width, o = i.height;
		this.spacer.style.width = `${a}px`, this.spacer.style.height = `${o}px`, this.viewport.setViewportSize(this.scrollHost.clientWidth, this.scrollHost.clientHeight), this.viewport.setExtent(a, o), this.setViewportLeft(this.viewport.x), this.viewportTop = this.viewport.y;
	}
	scheduleRender() {
		this.renderDispatcher.schedule(() => this.renderCurrentSheet().catch((e) => this._reportRenderError(e)));
	}
	async renderCurrentSheet() {
		let e = this.renderDispatcher.begin();
		try {
			await this._renderCurrentSheet(e);
		} catch (t) {
			if (!this.renderDispatcher.isCurrent(e)) return;
			throw t;
		}
	}
	_reportRenderError(e) {
		if (this._destroyed) return;
		let t = e instanceof Error ? e : Error(String(e));
		this.opts.onError ? this.opts.onError(t) : console.error("[ooxml] XlsxViewer render failed:", t);
	}
	async _renderCurrentSheet(e) {
		if (!this.currentWorksheet) return;
		let t = this.currentWorksheet, n = this.canvasArea.clientWidth, r = this.canvasArea.clientHeight;
		if (n <= 0 || r <= 0) return;
		let i = this.viewport.scale, a = this.surface.dpr, o = t.freezeRows ?? 0, s = t.freezeCols ?? 0, c = Q(t).visibleRange({
			width: n,
			height: r,
			scale: i,
			scrollX: this.effectiveScrollLeft,
			scrollY: this.viewportTop,
			headerWidth: 50,
			headerHeight: 22,
			buffer: 2
		}), l = c.range, { offsetX: u, offsetY: d } = c, { selectedRowRange: f, selectedColRange: p } = this.computeHeaderHighlight(), m = {
			width: n,
			height: r,
			dpr: a,
			imageResources: this.opts.imageResources,
			cellScale: i,
			scrollOffsetX: u,
			scrollOffsetY: d,
			freezeRows: o,
			freezeCols: s,
			selectedRowRange: f,
			selectedColRange: p,
			chromeColors: this.chromeColors
		}, h = this.wireSizeOverrides(), g = ps(h ? {
			...m,
			sizeOverrides: h.overrides
		} : m, Q(t).maximumDigitWidth, {
			worksheet: t,
			projection: h ? {
				id: this.projectionId,
				revision: h.revision,
				autoRowHeightsPrepared: !0
			} : void 0
		});
		if (this._mode === "worker") {
			let t = await this.workbook.renderViewportToBitmap(this.currentSheet, l, g);
			if (!this.renderDispatcher.commitBitmap(e, t, n, r)) return;
		} else if (await this.workbook.renderViewport(this.canvas, this.currentSheet, l, Go(g, () => !this._destroyed && this.renderDispatcher.isCurrent(e))), !this.renderDispatcher.isCurrent(e) || this._destroyed) return;
		this.renderGutters();
	}
	computeHeaderHighlight() {
		return this.selectionController.headerHighlight();
	}
	get sheetNames() {
		return this.wb?.sheetNames ?? [];
	}
	get canvasElement() {
		return this.canvas;
	}
	async getResourceMetrics() {
		if (!this.wb) throw Error("Workbook not loaded");
		return await this.wb.getResourceMetrics();
	}
	destroy() {
		if (this._destroyed) return;
		this._destroyed = !0, this.selectionContextNotificationFrame !== null && (this.hostWindow.cancelAnimationFrame(this.selectionContextNotificationFrame), this.selectionContextNotificationFrame = null), this.selectionContextNotificationMicrotask = !1, this.stopSelectionAutoScroll(), this.sheetRequestGeneration++, this.resizeObserver?.disconnect(), this.chromeStyleObserver?.disconnect(), this.chromeStyleObserver = null, this.chromeSchemeMedia && this.chromeSchemeListener && this.chromeSchemeMedia.removeEventListener?.("change", this.chromeSchemeListener), this.chromeSchemeMedia = null, this.chromeSchemeListener = null, this.commentPopupResizeObserver?.disconnect(), this.commentPopupResizeObserver = null, this.renderDispatcher.destroy(), this.surface.destroy(), this.hideCommentPopup(), this.hideValidationPanel(), this._find.invalidate(), this.releaseHostFonts();
		let e = this.wb?.[Ss];
		typeof e == "function" && e.call(this.wb, this.projectionId), this.currentWorksheet = null, this.currentSourceComments = [], this.sourceCommentMap.clear(), this.elementContext = null, this.pendingElementClick = null, this.selectionController.reset(), this.lastNotifiedSelectionState = null, this.finishSelectionNotificationChain(), this.acquisition.destroy(), this.wrapper.remove();
	}
	assertOpen() {
		if (this._destroyed) throw this.destroyedError();
	}
	destroyedError() {
		return /* @__PURE__ */ Error(this._mountKind === "sheet" ? "XlsxSheetViewer is destroyed" : "XlsxViewer is destroyed");
	}
}, yl = class e extends vl {
	static fromWorkbook(t, n, r = {}) {
		return new e(t, {
			...r,
			[Ac]: n
		});
	}
	constructor(e, t = {}) {
		super(e, t, { kind: "composite" });
	}
	async load(e) {
		await this[jc](e);
	}
}, bl = class e {
	engine;
	canvasMount;
	destroyed = !1;
	snapshot;
	lastMetrics;
	static fromWorkbook(t, n, r = {}) {
		return new e(t, {
			...r,
			[Ac]: n
		});
	}
	constructor(e, t = {}) {
		this.canvasElement = e;
		let n = t[Ac], r = ke("XlsxSheetViewer", t.mode, n), i = e.getBoundingClientRect();
		this.canvasMount = new Me(e, {
			wrapperCssText: `position:relative;display:inline-block;vertical-align:top;overflow:hidden;width:${e.style.width || `${i.width || e.width}px`};height:${e.style.height || `${i.height || e.height}px`};`,
			restoreMode: "style-and-bitmap"
		}), this.engine = new vl(this.canvasMount.wrapper, {
			...t,
			onResourceMetrics: (e) => {
				this.lastMetrics = e, t.onResourceMetrics?.(e);
			}
		}, {
			kind: "sheet",
			canvas: e,
			mode: r
		}), this.snapshot = {
			sheetIndex: 0,
			sheetCount: 0,
			sheetNames: [],
			viewport: {
				x: 0,
				y: 0
			},
			selectionState: null,
			scale: this.engine.getScale(),
			hiddenSheetMode: this.engine.hiddenSheetMode,
			visibleSheetCount: 0
		};
	}
	async load(e, t = {}) {
		this.assertOpen();
		try {
			await this.engine[jc](e, t);
		} finally {
			this.destroyed || this.captureSnapshot();
		}
		this.assertOpen();
	}
	get sheetIndex() {
		return this.destroyed ? this.snapshot.sheetIndex : this.engine.sheetIndex;
	}
	get sheetCount() {
		return this.destroyed ? this.snapshot.sheetCount : this.engine.sheetCount;
	}
	get sheetNames() {
		return this.destroyed ? [...this.snapshot.sheetNames] : [...this.engine.sheetNames];
	}
	async goToSheet(e) {
		this.assertOpen(), await this.engine.goToSheet(e), this.assertOpen(), this.captureSnapshot();
	}
	async nextSheet() {
		this.assertOpen(), await this.engine.nextSheet(), this.assertOpen(), this.captureSnapshot();
	}
	async prevSheet() {
		this.assertOpen(), await this.engine.prevSheet(), this.assertOpen(), this.captureSnapshot();
	}
	getViewportOffset() {
		return this.destroyed ? { ...this.snapshot.viewport } : this.engine.getViewportOffset();
	}
	async setViewportOffset(e) {
		this.assertOpen(), await this.engine.setViewportOffset(e), this.assertOpen(), this.captureSnapshot();
	}
	async scrollToCell(e, t) {
		this.assertOpen(), await this.engine.scrollToCell(e, t), this.assertOpen(), this.captureSnapshot();
	}
	async relayout() {
		this.assertOpen();
		let e = this.canvasElement.getBoundingClientRect();
		e.width > 0 && (this.canvasMount.wrapper.style.width = `${e.width}px`), e.height > 0 && (this.canvasMount.wrapper.style.height = `${e.height}px`), await this.engine.relayout(), this.assertOpen(), this.captureSnapshot();
	}
	getScale() {
		return this.destroyed ? this.snapshot.scale : this.engine.getScale();
	}
	setScale(e) {
		this.assertOpen(), this.engine.setScale(e), this.captureSnapshot();
	}
	zoomIn() {
		this.assertOpen(), this.engine.zoomIn(), this.captureSnapshot();
	}
	zoomOut() {
		this.assertOpen(), this.engine.zoomOut(), this.captureSnapshot();
	}
	fitWidth() {
		this.assertOpen(), this.engine.fitWidth(), this.captureSnapshot();
	}
	fitPage() {
		this.assertOpen(), this.engine.fitPage(), this.captureSnapshot();
	}
	getCellAt(e, t) {
		return this.destroyed ? null : this.engine.getCellAt(e, t);
	}
	getCellViewportRect(e) {
		return this.destroyed ? null : this.engine.getCellViewportRect(e);
	}
	getComments() {
		return this.assertOpen(), this.engine.getComments();
	}
	async goToComment(e, t, n) {
		this.assertOpen();
		let r = await this.engine.goToComment(e, t, n);
		return this.assertOpen(), this.captureSnapshot(), r;
	}
	get selectionState() {
		let e = this.destroyed ? this.snapshot.selectionState : this.engine.selectionState;
		return e ? structuredClone(e) : null;
	}
	setSelection(e) {
		this.assertOpen(), this.engine.setSelection(e), this.captureSnapshot();
	}
	getSelectionContext(e) {
		return this.assertOpen(), this.engine.getSelectionContext(e);
	}
	async copySelection() {
		return this.assertOpen(), await this.engine.copySelection();
	}
	setSelectionColor(e) {
		this.assertOpen(), this.engine.setSelectionColor(e);
	}
	async setHiddenSheetMode(e) {
		this.assertOpen(), await this.engine.setHiddenSheetMode(e), this.assertOpen(), this.captureSnapshot();
	}
	get hiddenSheetMode() {
		return this.destroyed ? this.snapshot.hiddenSheetMode : this.engine.hiddenSheetMode;
	}
	get visibleSheetCount() {
		return this.destroyed ? this.snapshot.visibleSheetCount : this.engine.visibleSheetCount;
	}
	async findText(e, t) {
		this.assertOpen();
		let n = await this.engine.findText(e, t);
		return this.assertOpen(), n;
	}
	async findNext() {
		this.assertOpen();
		let e = await this.engine.findNext();
		return this.assertOpen(), this.captureSnapshot(), e;
	}
	async findPrev() {
		this.assertOpen();
		let e = await this.engine.findPrev();
		return this.assertOpen(), this.captureSnapshot(), e;
	}
	clearFind() {
		this.assertOpen(), this.engine.clearFind();
	}
	async getResourceMetrics() {
		if (this.destroyed) {
			if (this.lastMetrics) return this.lastMetrics;
			throw this.destroyedError();
		}
		return this.lastMetrics = await this.engine.getResourceMetrics(), this.lastMetrics;
	}
	destroy() {
		this.destroyed || (this.captureSnapshot(), this.destroyed = !0, this.engine.destroy(), this.canvasMount.restore());
	}
	captureSnapshot() {
		let e = this.engine.selectionState;
		this.snapshot = {
			sheetIndex: this.engine.sheetIndex,
			sheetCount: this.engine.sheetCount,
			sheetNames: [...this.engine.sheetNames],
			viewport: { ...this.engine.getViewportOffset() },
			selectionState: e ? structuredClone(e) : null,
			scale: this.engine.getScale(),
			hiddenSheetMode: this.engine.hiddenSheetMode,
			visibleSheetCount: this.engine.visibleSheetCount
		};
	}
	assertOpen() {
		if (this.destroyed) throw this.destroyedError();
	}
	destroyedError() {
		return /* @__PURE__ */ Error("XlsxSheetViewer is destroyed");
	}
}, xl = /* @__PURE__ */ e({
	MAX_SELECTION_AREAS: () => 128,
	MAX_SELECTION_CONTEXT_CELLS: () => Ys,
	MAX_SELECTION_CONTEXT_TEXT_CHARACTERS: () => Xs,
	OoxmlDecodedImageLimitError: () => ut,
	OoxmlError: () => le,
	OoxmlResourceLimitError: () => j,
	TiffDecodeError: () => ft,
	XlsxSheetViewer: () => bl,
	XlsxViewer: () => yl,
	XlsxWorkbook: () => ws,
	autoResize: () => ge,
	isOoxmlDecodedImageLimitError: () => lt,
	isTiffDecodeError: () => pt,
	openExternalHyperlink: () => ae,
	resolveSharedStrings: () => wt
});
//#endregion
export { Ys as a, Js as i, bl as n, Xs as o, yl as r, ws as s, xl as t };
