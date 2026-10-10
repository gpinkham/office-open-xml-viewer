import { c as e } from "./resource-policy.generated-BTdyyO9v.js";
import { n as t, t as n } from "./cfb-guard-B9x7ZJTE.js";
import { i as r, r as i } from "./preload-Dufqb9J3.js";
import { a, i as o, n as s, o as c, r as l, t as u } from "./progressive-layout-observers-D4O7o5cV.js";
import { S as d } from "./office-auto-line-Chy1gU-T.js";
import { n as f, r as p } from "./office-fallback-CTP2kjRH.js";
import { A as m, C as h, D as g, E as _, M as v, O as y, S as b, T as x, _ as S, a as ee, b as te, c as C, d as ne, g as w, h as T, j as E, k as D, l as re, m as ie, n as O, o as ae, p as oe, s as se, t as k, u as ce, w as le, x as ue, y as de } from "./document-pull-client-B-aENbZ1.js";
import { n as fe } from "./cjk-fallback-CtkvGQ-i.js";
import { h as pe, s as me, u as he } from "./blip-gate-CVWM87j6.js";
import { n as ge } from "./renderer-module-contract-CNi9alZl.js";
import { i as _e, n as ve, r as ye, t as be } from "./chart-context-DS6myl4P.js";
import { i as xe, n as Se, r as Ce } from "./resource-debug-Bp6LglgZ.js";
import { n as we } from "./error-wire-rJNDxWbL.js";
import { t as Te } from "./rejected-load-CIPydT8y.js";
import "./pull-session-BzHuXyzF.js";
import { t as Ee } from "./bounded-raw-part-cache-zHr9J6Ei.js";
import { s as A } from "./source-key-BiyZtv1t.js";
import { i as De, r as Oe, t as ke } from "./comments-BvsU_VZt.js";
//#region packages/core/src/fonts/open-type-metrics.ts
var j = (e) => (e.charCodeAt(0) << 24 >>> 0 | e.charCodeAt(1) << 16 | e.charCodeAt(2) << 8 | e.charCodeAt(3)) >>> 0, Ae = j("ttcf"), je = j("OTTO"), Me = j("true"), Ne = j("typ1"), Pe = j("head"), Fe = j("hhea"), Ie = j("OS/2"), M = j("cmap"), Le = j("fvar"), N = [
	[4352, 4607],
	[11904, 12287],
	[12352, 12543],
	[12544, 12591],
	[12592, 12687],
	[12704, 12735],
	[12784, 12799],
	[13312, 19903],
	[19968, 40959],
	[40960, 42191],
	[43360, 43391],
	[44032, 55203],
	[63744, 64255],
	[131072, 205743]
];
function P(e, t, n) {
	return Number.isSafeInteger(t) && Number.isSafeInteger(n) && t >= 0 && n >= 0 && t <= e - n;
}
function Re(e, t, n) {
	if (n < 16) return !1;
	let r = e.getUint16(t + 2);
	if (r < 16 || r > n) return !1;
	let i = e.getUint16(t + 6);
	if (i === 0 || i % 2 != 0) return !1;
	let a = i / 2, o = t + 14, s = o + a * 2 + 2, c = s + a * 2, l = c + a * 2;
	if (l + a * 2 > t + r) return !1;
	let u = -1;
	for (let t = 0; t < a; t++) {
		let n = e.getUint16(s + t * 2), r = e.getUint16(o + t * 2);
		if (n > r || n <= u) return !1;
		u = r;
	}
	for (let n = 0; n < a; n++) {
		let i = e.getUint16(s + n * 2), a = e.getUint16(o + n * 2), u = e.getInt16(c + n * 2), d = l + n * 2, f = e.getUint16(d);
		for (let [n, o] of N) {
			let s = Math.max(i, n), c = Math.min(a, o);
			if (!(s > c)) {
				if (f === 0) {
					if (s < c || s + u & 65535) return !0;
					continue;
				}
				for (let n = s; n <= c; n++) {
					let a = d + f + (n - i) * 2;
					if (a + 2 > t + r) break;
					let o = e.getUint16(a);
					if (o !== 0 && o + u & 65535) return !0;
				}
			}
		}
	}
	return !1;
}
function F(e, t, n, r) {
	if (n < 16) return !1;
	let i = e.getUint32(t + 4), a = e.getUint32(t + 12);
	if (i < 16 || i > n || a > (i - 16) / 12) return !1;
	let o = -1;
	for (let n = 0; n < a; n++) {
		let i = t + 16 + n * 12, a = e.getUint32(i), s = e.getUint32(i + 4), c = e.getUint32(i + 8);
		if (a > s || s > 1114111 || a <= o) return !1;
		if (o = s, a > N[N.length - 1][1]) break;
		for (let [e, t] of N) {
			let n = Math.max(a, e), i = Math.min(s, t);
			if (!(n > i)) {
				if (r) {
					if (c !== 0) return !0;
				} else if (n < i || c + (n - a) !== 0) return !0;
			}
		}
	}
	return !1;
}
function ze(e, t) {
	if (!t || t.length < 4) return !1;
	let n = e.getUint16(t.offset + 2);
	if (4 + n * 8 > t.length) return !1;
	for (let r = 0; r < n; r++) {
		let n = t.offset + 4 + r * 8, i = e.getUint16(n), a = e.getUint16(n + 2);
		if (i !== 0 && !(i === 3 && (a === 1 || a === 10))) continue;
		let o = e.getUint32(n + 4);
		if (o > t.length - 2) continue;
		let s = t.offset + o, c = t.length - o, l = e.getUint16(s);
		if (l === 4 && Re(e, s, c) || l === 12 && F(e, s, c, !1) || l === 13 && F(e, s, c, !0)) return !0;
	}
	return !1;
}
var I = 32768, Be = 4096, Ve = 8, He = 262144;
function Ue(e, t, n, r) {
	if (n < 16) return null;
	let i = e.getUint16(t + 2);
	if (i < 16 || i > n) return null;
	let a = e.getUint16(t + 6);
	if (a === 0 || a % 2 != 0) return null;
	let o = a / 2, s = t + 14, c = s + o * 2 + 2, l = c + o * 2, u = l + o * 2;
	if (u + o * 2 > t + i) return null;
	let d = [], f = -1, p = -1, m = (e) => {
		d.length > 0 && p + 1 === e ? (p = e, d[d.length - 1] = [f, p]) : (f = p = e, d.push([e, e]));
	}, h = -1;
	for (let n = 0; n < o; n++) {
		let a = e.getUint16(c + n * 2), o = e.getUint16(s + n * 2);
		if (a > o || a <= h) return null;
		h = o;
		let f = e.getInt16(l + n * 2), p = u + n * 2, g = e.getUint16(p);
		for (let n = a; n <= o && n < 65535; n++) if (--r.remaining < 0 || ((g === 0 ? n + f & 65535 : (() => {
			let r = p + g + (n - a) * 2;
			if (r + 2 > t + i) return 0;
			let o = e.getUint16(r);
			return o === 0 ? 0 : o + f & 65535;
		})()) !== 0 && m(n), d.length > I)) return null;
	}
	return d;
}
function We(e, t, n, r, i) {
	if (n < 16) return null;
	let a = e.getUint32(t + 4), o = e.getUint32(t + 12);
	if (a < 16 || a > n || o > (a - 16) / 12 || o > I) return null;
	let s = [], c = -1;
	for (let n = 0; n < o; n++) {
		if (--i.remaining < 0) return null;
		let a = t + 16 + n * 12, o = e.getUint32(a), l = e.getUint32(a + 4), u = e.getUint32(a + 8);
		if (o > l || l > 1114111 || o <= c) return null;
		if (c = l, r) u !== 0 && s.push([o, l]);
		else {
			let e = u === 0 ? o + 1 : o;
			e <= l && s.push([e, l]);
		}
	}
	return s;
}
function Ge(e, t) {
	if (!t || t.length < 4) return [];
	let n = e.getUint16(t.offset + 2);
	if (n > Be || 4 + n * 8 > t.length) return [];
	let r = /* @__PURE__ */ new Set(), i = [];
	for (let a = 0; a < n; a++) {
		let n = t.offset + 4 + a * 8, o = e.getUint16(n), s = e.getUint16(n + 2);
		if (o !== 0 && !(o === 3 && (s === 1 || s === 10))) continue;
		let c = e.getUint32(n + 4);
		if (c > t.length - 2) return [];
		let l = t.offset + c, u = t.length - c, d = e.getUint16(l);
		if (!(o === 0 && s === 5 && d === 14)) {
			if (d !== 4 && d !== 12 && d !== 13) return [];
			if (!r.has(c)) {
				if (r.add(c), r.size > Ve) return [];
				i.push({
					subtable: l,
					availableLength: u,
					format: d
				});
			}
		}
	}
	let a = { remaining: He }, o = null;
	for (let t of i) {
		let n = t.format === 4 ? Ue(e, t.subtable, t.availableLength, a) : We(e, t.subtable, t.availableLength, t.format === 13, a);
		if (!n?.length) return [];
		if (o === null) {
			o = n;
			continue;
		}
		let r = [], i = 0, s = 0;
		for (; i < o.length && s < n.length;) {
			if (--a.remaining < 0) return [];
			let e = o[i], t = n[s], c = Math.max(e[0], t[0]), l = Math.min(e[1], t[1]);
			if (c <= l) {
				let e = r.at(-1);
				if (e && e[1] + 1 === c) r[r.length - 1] = [e[0], l];
				else {
					if (r.length >= I) return [];
					r.push([c, l]);
				}
			}
			e[1] <= t[1] && i++, t[1] <= e[1] && s++;
		}
		if (!r.length) return [];
		o = r;
	}
	return Object.freeze((o ?? []).map((e) => Object.freeze(e)));
}
function Ke(e) {
	let t = 0, n = 0;
	for (; t < e.length && n < N.length;) {
		let [r, i] = e[t], [a, o] = N[n];
		if (i < a) t++;
		else if (o < r) n++;
		else return !0;
	}
	return !1;
}
function qe(e, t) {
	return Je(e, t, !0);
}
function Je(e, t, n) {
	if (t !== void 0 && (!Number.isSafeInteger(t) || t < 0) || e.byteLength < 12) return null;
	let r = new DataView(e.buffer, e.byteOffset, e.byteLength), i = 0;
	if (r.getUint32(0) === Ae) {
		if (t === void 0 || e.byteLength < 12) return null;
		let n = r.getUint32(8);
		if (t >= n || !P(e.byteLength, 12, n * 4)) return null;
		i = r.getUint32(12 + t * 4);
	} else if (t !== void 0 && t !== 0) return null;
	if (!P(e.byteLength, i, 12)) return null;
	let a = r.getUint32(i);
	if (a !== 65536 && a !== je && a !== Me && a !== Ne) return null;
	let o = r.getUint16(i + 4);
	if (!P(e.byteLength, i + 12, o * 16)) return null;
	let s = /* @__PURE__ */ new Map();
	for (let t = 0; t < o; t++) {
		let n = i + 12 + t * 16, a = r.getUint32(n), o = r.getUint32(n + 8), c = r.getUint32(n + 12);
		if (s.has(a) || !P(e.byteLength, o, c)) return null;
		s.set(a, {
			offset: o,
			length: c
		});
	}
	if (n && s.has(Le)) return null;
	let c = s.get(Pe), l = s.get(Fe);
	if (!c || c.length < 20 || !l || l.length < 10) return null;
	let u = r.getUint16(c.offset + 18);
	if (u < 16 || u > 16384) return null;
	let d = s.get(Ie), f = d !== void 0 && d.length >= 4 ? r.getInt16(d.offset + 2) : 0, p = d !== void 0 && d.length >= 78, m = d !== void 0 && d.length >= 86 && r.getUint16(d.offset) >= 1, h = n ? Ge(r, s.get(M)) : void 0;
	return Object.freeze({
		unitsPerEm: u,
		...f > 0 ? { averageCharWidthRatio: f / u } : {},
		hheaAscent: r.getInt16(l.offset + 4),
		hheaDescent: r.getInt16(l.offset + 6),
		hheaLineGap: r.getInt16(l.offset + 8),
		farEastCodePage: m ? (r.getUint32(d.offset + 78) & 1966080) != 0 : null,
		hasEastAsianCmap: h ? Ke(h) : ze(r, s.get(M)),
		...h === void 0 ? {} : { unicodeRanges: h },
		...p ? {
			typoAscent: r.getInt16(d.offset + 68),
			typoDescent: r.getInt16(d.offset + 70),
			typoLineGap: r.getInt16(d.offset + 72),
			winAscent: r.getUint16(d.offset + 74),
			winDescent: r.getUint16(d.offset + 76),
			useTypoMetrics: (r.getUint16(d.offset + 62) & 128) != 0
		} : {}
	});
}
//#endregion
//#region packages/docx/src/worker.ts?worker&inline
var L = "var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,r.unregister(this),e}free(){let e=this.__destroy_into_raw();_.__wbg_docxarchive_free(e,0)}acknowledge_document_chunk(e,t,n){let r=_.docxarchive_acknowledge_document_chunk(this.__wbg_ptr,e,t,n);if(r[1])throw f(r[0])}assert_healthy(){let e=_.docxarchive_assert_healthy(this.__wbg_ptr);if(e[1])throw f(e[0])}cancel_document_cursor(){_.docxarchive_cancel_document_cursor(this.__wbg_ptr)}close_document_session(){_.docxarchive_close_document_session(this.__wbg_ptr)}document_chunk_done(){let e=_.docxarchive_document_chunk_done(this.__wbg_ptr);if(e[2])throw f(e[1]);return e[0]!==0}document_cursor_resource_usage(){let e=_.docxarchive_document_cursor_resource_usage(this.__wbg_ptr);if(e[3])throw f(e[2]);let t;return e[0]!==0&&(t=i(e[0],e[1]).slice(),_.__wbindgen_free(e[0],e[1]*1,1)),t}extract_image(e){let t=d(e,_.__wbindgen_malloc,_.__wbindgen_realloc),n=g,r=_.docxarchive_extract_image(this.__wbg_ptr,t,n);if(r[3])throw f(r[2]);var a=i(r[0],r[1]).slice();return _.__wbindgen_free(r[0],r[1]*1,1),a}constructor(e,t,n,i){let a=ee(e,_.__wbindgen_malloc),o=g,s=_.docxarchive_new(a,o,!u(t),u(t)?BigInt(0):t,!u(n),u(n)?BigInt(0):n,!u(i),u(i)?BigInt(0):i);if(s[2])throw f(s[1]);return this.__wbg_ptr=s[0]>>>0,r.register(this,this.__wbg_ptr,this),this}open_document_cursor(e,t){let n=_.docxarchive_open_document_cursor(this.__wbg_ptr,e,t);if(n[1])throw f(n[0])}parse(){let e=_.docxarchive_parse(this.__wbg_ptr);if(e[3])throw f(e[2]);var t=i(e[0],e[1]).slice();return _.__wbindgen_free(e[0],e[1]*1,1),t}pull_document_chunk(e,t,n,r){let a=_.docxarchive_pull_document_chunk(this.__wbg_ptr,e,t,n,r);if(a[3])throw f(a[2]);var o=i(a[0],a[1]).slice();return _.__wbindgen_free(a[0],a[1]*1,1),o}resource_usage(){let e=_.docxarchive_resource_usage(this.__wbg_ptr);if(e[3])throw f(e[2]);var t=i(e[0],e[1]).slice();return _.__wbindgen_free(e[0],e[1]*1,1),t}to_markdown(){let e,t;try{let i=_.docxarchive_to_markdown(this.__wbg_ptr);var n=i[0],r=i[1];if(i[3])throw n=0,r=0,f(i[2]);return e=n,t=r,s(n,r)}finally{_.__wbindgen_free(e,t,1)}}};Symbol.dispose&&(t.prototype[Symbol.dispose]=t.prototype.free);function n(){return{__proto__:null,\"./docx_parser_bg.js\":{__proto__:null,__wbg___wbindgen_throw_6b64449b9b9ed33c:function(e,t){throw Error(s(e,t))},__wbg_error_a6fa202b58aa1cd3:function(e,t){let n,r;try{n=e,r=t,console.error(s(e,t))}finally{_.__wbindgen_free(n,r,1)}},__wbg_new_227d7c05414eb861:function(){return Error()},__wbg_stack_3b0d974bbf31e44f:function(e,t){let n=t.stack,r=d(n,_.__wbindgen_malloc,_.__wbindgen_realloc),i=g;o().setInt32(e+4,i,!0),o().setInt32(e+0,r,!0)},__wbindgen_cast_0000000000000001:function(e,t){return s(e,t)},__wbindgen_init_externref_table:function(){let e=_.__wbindgen_externrefs,t=e.grow(4);e.set(0,void 0),e.set(t+0,void 0),e.set(t+1,null),e.set(t+2,!0),e.set(t+3,!1)}}}}const r=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>_.__wbg_docxarchive_free(e>>>0,1));function i(e,t){return e>>>=0,l().subarray(e/1,e/1+t)}let a=null;function o(){return(a===null||a.buffer.detached===!0||a.buffer.detached===void 0&&a.buffer!==_.memory.buffer)&&(a=new DataView(_.memory.buffer)),a}function s(e,t){return e>>>=0,te(e,t)}let c=null;function l(){return(c===null||c.byteLength===0)&&(c=new Uint8Array(_.memory.buffer)),c}function u(e){return e==null}function ee(e,t){let n=t(e.length*1,1)>>>0;return l().set(e,n/1),g=e.length,n}function d(e,t,n){if(n===void 0){let n=h.encode(e),r=t(n.length,1)>>>0;return l().subarray(r,r+n.length).set(n),g=n.length,r}let r=e.length,i=t(r,1)>>>0,a=l(),o=0;for(;o<r;o++){let t=e.charCodeAt(o);if(t>127)break;a[i+o]=t}if(o!==r){o!==0&&(e=e.slice(o)),i=n(i,r,r=o+e.length*3,1)>>>0;let t=l().subarray(i+o,i+r),a=h.encodeInto(e,t);o+=a.written,i=n(i,r,o,1)>>>0}return g=o,i}function f(e){let t=_.__wbindgen_externrefs.get(e);return _.__externref_table_dealloc(e),t}let p=new TextDecoder(`utf-8`,{ignoreBOM:!0,fatal:!0});p.decode();let m=0;function te(e,t){return m+=t,m>=2146435072&&(p=new TextDecoder(`utf-8`,{ignoreBOM:!0,fatal:!0}),p.decode(),m=t),p.decode(l().subarray(e,e+t))}const h=new TextEncoder;`encodeInto`in h||(h.encodeInto=function(e,t){let n=h.encode(e);return t.set(n),{read:e.length,written:n.length}});let g=0,_;function ne(e,t){return _=e.exports,a=null,c=null,_.__wbindgen_start(),_}async function v(e,t){if(typeof Response==`function`&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming==`function`)try{return await WebAssembly.instantiateStreaming(e,t)}catch(t){if(e.ok&&n(e.type)&&e.headers.get(`Content-Type`)!==`application/wasm`)console.warn(\"`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\\n\",t);else throw t}let r=await e.arrayBuffer();return await WebAssembly.instantiate(r,t)}else{let n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}function n(e){switch(e){case`basic`:case`cors`:case`default`:return!0}return!1}}async function y(e){if(_!==void 0)return _;e!==void 0&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn(`using deprecated parameters for the initialization function; pass a single object instead`));let t=n();(typeof e==`string`||typeof Request==`function`&&e instanceof Request||typeof URL==`function`&&e instanceof URL)&&(e=fetch(e));let{instance:r,module:i}=await v(await e,t);return ne(r,i)}async function re(e){return _=void 0,a=null,c=null,y(e)}var b=class e extends Error{code;constructor(t,n){super(n),this.name=`OoxmlError`,this.code=t,Object.setPrototypeOf(this,e.prototype)}},x=class e extends Error{code=`ooxml-resource-limit`;details;constructor(t,n){super(t),this.name=`OoxmlResourceLimitError`;let r=n.violation,i=Object.freeze({format:r.format,operation:r.operation,resource:r.resource,metric:r.metric,...r.part===void 0?{}:{part:r.part},limit:r.limit,observed:r.observed,configurable:r.configurable,usage:Object.freeze({archiveEntryCount:r.usage.archiveEntryCount,declaredInflatedBytes:r.usage.declaredInflatedBytes,...r.usage.largestInflatedEntryBytes===void 0?{}:{largestInflatedEntryBytes:r.usage.largestInflatedEntryBytes},distinctInflatedBytes:r.usage.distinctInflatedBytes,operationInflatedBytes:r.usage.operationInflatedBytes})});this.details=Object.freeze({stage:n.stage,violation:i}),Object.setPrototypeOf(this,e.prototype)}};function ie(e){return e===`image-dimension`||e===`image-pixels`||e===`active-decoded-bytes`||e===`image-effect-count`||e===`image-effect-work`}function S(e){return typeof e==`number`&&Number.isSafeInteger(e)&&e>=0}function ae(e){if(!(!e||typeof e!=`object`))try{let t=e,n=t.code,r=t.metric,i=t.limit,a=t.observed;return n!==`ooxml-decoded-image-limit`||!ie(r)||!S(i)||!S(a)||a<=i?void 0:{metric:r,limit:i,observed:a}}catch{return}}var C,w,T,E,D,oe=e((()=>{C=1<<25,w=1<<27,C*4,w*4,T=Math.floor(C/4),E=w,E/T,D=class e extends RangeError{code=`ooxml-decoded-image-limit`;constructor(t,n,r){super(`OOXML decoded image limit exceeded: ${t} ${r} > ${n}`),this.metric=t,this.limit=n,this.observed=r,this.name=`OoxmlDecodedImageLimitError`,Object.setPrototypeOf(this,e.prototype)}}}));function se(e){if(!(typeof e!=`object`||!e))try{let t=e,n=t.code,r=t.message;return n===`ooxml-tiff-decode`&&typeof r==`string`?{message:r}:void 0}catch{return}}var ce=e((()=>{}));function le(e){if(!e.startsWith(`data:`))return null;let t=e.indexOf(`,`);if(t===-1)return null;let n=atob(e.slice(t+1)),r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r.buffer}var ue=class{state=`uninitialized`;generationValue=0;readiness;poisonListeners=new Set;constructor(e,t,n){this.initialize=e,this.reinitialize=t,this.normalizeFailure=n}get generation(){return this.generationValue}get poisoned(){return this.state===`poisoned`}onPoison(e){return this.poisonListeners.add(e),()=>this.poisonListeners.delete(e)}async ensureReady(){if(this.state!==`ready`){if(!this.readiness){let e=this.state===`uninitialized`?this.initialize:this.reinitialize;this.readiness=Promise.resolve().then(e).then(()=>{this.generationValue+=1,this.state=`ready`,this.readiness=void 0},e=>{throw this.readiness=void 0,e})}await this.readiness}}run(e){try{return e()}catch(e){let t=this.normalizeFailure(e);throw t?(this.poison(t),t):e}}tryRunReady(e){if(this.state!==`ready`)return{current:!1};let t=this.generationValue,n=this.run(e);return this.state!==`ready`||t!==this.generationValue?{current:!1}:{current:!0,generation:t,value:n}}poison(e){this.state=`poisoned`,this.readiness=void 0;for(let t of this.poisonListeners)t(e)}assertCurrent(e){if(this.state!==`ready`||e!==this.generationValue)throw Error(`WASM archive session belongs to a discarded runtime generation`)}},O=class e extends Error{code=`parser-crashed`;constructor(t){super(t),this.name=`WasmTrapError`,Object.setPrototypeOf(this,e.prototype)}};function de(e){let t=globalThis.WebAssembly?.RuntimeError;return t&&e instanceof t||e instanceof RangeError?!0:e instanceof Error?e.name===`RuntimeError`||e.name===`CompileError`||e.name===`LinkError`||e.name===`InternalError`||e.name===`OOMError`:!1}function k(e){try{if((typeof e!=`object`||!e)&&typeof e!=`function`)return;let t=Reflect.get(e,`__destroy_into_raw`);typeof t==`function`&&Reflect.apply(t,e,[])}catch{}}function A(e,t){return e({module_or_path:t})}var fe=class{runtime;wasmInput=null;currentArchive=null;constructor(e,t={}){this.init=e,this.options=t,this.runtime=new ue(()=>this.invokeConfigured(this.init),()=>this.invokeConfigured(this.options.reinit??this.init),pe),this.runtime.onPoison(()=>this.dropPoisonedArchive())}setWasmInput(e){this.wasmInput=e,this.runtime.ensureReady().catch(()=>void 0)}setWasmUrl(e){this.setWasmInput(e)}get archive(){return this.currentArchive}setArchive(e){this.freeArchive(),this.currentArchive=e}disposeArchive(){this.freeArchive()}get poisoned(){return this.runtime.poisoned}async ensureReady(){await this.runtime.ensureReady()}run(e){return this.runtime.run(e)}poison(){this.runtime.poison(new O(`WASM parser was recycled`))}invokeConfigured(e){return this.wasmInput===null?Promise.reject(Error(`WasmParserHost: setWasmInput was never called`)):A(e,this.wasmInput)}freeArchive(){this.currentArchive!==null&&this.options.freeArchive&&this.options.freeArchive(this.currentArchive),this.currentArchive=null}dropPoisonedArchive(){let e=this.currentArchive;this.currentArchive=null,k(e)}};function pe(e){return de(e)?new O(`WASM parser trapped and was recycled: ${e instanceof Error?e.message:String(e)}`):null}function j(e){return typeof e==`number`&&Number.isSafeInteger(e)&&e>0}function me(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;return j(t.requiredBytes)&&j(t.offeredBytes)&&t.requiredBytes>t.offeredBytes}var M=class e extends RangeError{code=`ooxml-insufficient-credit`;requiredBytes;offeredBytes;constructor(t){super(`Pull unit requires ${t.requiredBytes} bytes but credit is ${t.offeredBytes}`),this.name=`PullSessionInsufficientCreditError`,this.requiredBytes=t.requiredBytes,this.offeredBytes=t.offeredBytes,Object.setPrototypeOf(this,e.prototype)}};function N(e){if(e instanceof M)return e;let t=e instanceof Error?e.message:String(e);if(!t.startsWith(`OOXML_INSUFFICIENT_CREDIT:`))return;let n;try{n=JSON.parse(t.slice(26))}catch{return}if(!n||typeof n!=`object`||Array.isArray(n))return;let r=n;if(!(r.code!==`ooxml-insufficient-credit`||!me(r)))return new M(r)}function he(e,t,n){let r=N(e);if(!(!r||r.offeredBytes!==t||r.requiredBytes>n))return r}oe(),ce();const P=`OOXML_RESOURCE_LIMIT:`;function F(e){return typeof e==`number`&&Number.isSafeInteger(e)&&e>=0}function I(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;return F(t.archiveEntryCount)&&F(t.declaredInflatedBytes)&&(t.largestInflatedEntryBytes===void 0||F(t.largestInflatedEntryBytes))&&F(t.distinctInflatedBytes)&&F(t.operationInflatedBytes)}function L(e){let t;try{t=JSON.parse(new TextDecoder().decode(e))}catch{throw TypeError(`OOXML resource usage checkpoint is not valid JSON`)}if(!I(t))throw TypeError(`OOXML resource usage checkpoint is invalid`);return t}function R(e){return e===`docx`||e===`xlsx`||e===`pptx`}function ge(e){return e===`container`||e===`decompression`||e===`parsing`||e===`serialization`||e===`layout`||e===`rendering`||e===`worker`}function z(e,t){return typeof e==`string`&&e.length>0&&e.length<=t&&!/[\\u0000-\\u001f\\u007f]/u.test(e)}function B(e){return z(e,128)&&/^[a-z0-9][a-z0-9-]*$/u.test(e)}function V(e){return!z(e,4096)||e.startsWith(`/`)||e.startsWith(`\\\\`)||e.includes(`\\\\`)||e.includes(`?`)||e.includes(`#`)||e.includes(`://`)||/^[a-z]:/iu.test(e)?!1:e.split(`/`).every(e=>e!==``&&e!==`.`&&e!==`..`)}const H=new Map([[`archive-entry:declared-inflated-bytes`,{stage:`container`,part:`required`}],[`archive-entry:actual-inflated-bytes`,{stage:`decompression`,part:`required`}],[`archive:entry-count`,{stage:`container`,part:`forbidden`}],[`archive:central-directory-bytes`,{stage:`container`,part:`forbidden`,configurable:!1}],[`archive:distinct-inflated-bytes`,{stage:`decompression`,part:`required`}],[`xml-event:bytes`,{stage:`parsing`,part:`optional`,configurable:!1}],[`xml-context:bytes`,{stage:`parsing`,part:`optional`,configurable:!1}],[`chartex-allocation:elements`,{stage:`parsing`,part:`forbidden`,configurable:!1}],[`chartex-allocation:bytes`,{stage:`parsing`,part:`forbidden`,configurable:!1}],[`xml-tree:depth`,{stage:`parsing`,part:`optional`,configurable:!1}],[`worksheet-row:projected-bytes`,{stage:`parsing`,part:`optional`,configurable:!1}],[`worksheet-shell:projected-bytes`,{stage:`parsing`,part:`optional`,configurable:!1}]]),_e=new Set([...H.keys()].map(e=>e.slice(0,e.indexOf(`:`)))),ve=new Set([...H.keys()].map(e=>e.slice(e.indexOf(`:`)+1)));function ye(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;return!R(t.format)||!z(t.operation,256)||!B(t.resource)||!B(t.metric)||!F(t.limit)||!F(t.observed)||typeof t.configurable!=`boolean`||!I(t.usage)?!1:!(`part`in t)||V(t.part)}function U(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;if(!ge(t.stage)||!ye(t.violation))return!1;let n=t.violation,r=H.get(`${n.resource}:${n.metric}`);return r?t.stage!==r.stage||r.configurable===!1&&n.configurable!==!1?!1:r.part===`required`?n.part!==void 0:r.part===`forbidden`?n.part===void 0:!0:!(_e.has(n.resource)&&ve.has(n.metric))}function be(e){return{archiveEntryCount:e.archiveEntryCount,declaredInflatedBytes:e.declaredInflatedBytes,...e.largestInflatedEntryBytes===void 0?{}:{largestInflatedEntryBytes:e.largestInflatedEntryBytes},distinctInflatedBytes:e.distinctInflatedBytes,operationInflatedBytes:e.operationInflatedBytes}}function xe(e){if(!U(e))return;let t=e.violation,n={stage:e.stage,violation:{format:t.format,operation:t.operation,resource:t.resource,metric:t.metric,...t.part===void 0?{}:{part:t.part},limit:t.limit,observed:t.observed,configurable:t.configurable,usage:be(t.usage)}};return U(n)?n:void 0}function W(e){let t=e.violation;return`OOXML resource limit exceeded${t.part?` for ${t.part}`:``}: ${t.metric} ${t.observed} > ${t.limit}`}function Se(e){let t=e instanceof Error?e.message:String(e);if(!t.startsWith(P))return;let n;try{n=JSON.parse(t.slice(21))}catch{return}if(!n||typeof n!=`object`)return;let r=n;if(!(r.code!==`ooxml-resource-limit`||!U(r.details)))return new x(W(r.details),r.details)}function Ce(e){let t=e instanceof Error?e.message:String(e);if(t.startsWith(`OOXML_NOT_OOXML:`))return new b(`not-ooxml`,`This file is not an Office Open XML document: ${t.slice(16)}`)}function we(e){let t=e instanceof Error?e.message:String(e);if(!t.startsWith(`OOXML_DOCX_ILVL:`))return;let n=t.slice(16);if(n===`repair-required:level-definition`)return new b(`invalid-numbering`,`The DOCX defines a numbering level outside Word’s supported 0–8 range and requires repair.`);if(n===`cannot-open:whitespace`||n===`cannot-open:non-decimal`)return new b(`invalid-numbering`,`Word cannot open this DOCX numbering level (${n.slice(12)}).`)}function Te(e){return Se(e)??Ce(e)??we(e)}function Ee(e){let t=ae(e);if(t){let e=new D(t.metric,t.limit,t.observed);return{message:e.message,errorName:e.name,code:e.code,decodedImage:t}}let n=se(e);if(n)return{message:n.message,errorName:`TiffDecodeError`,code:`ooxml-tiff-decode`};let r=N(e);if(r)return{message:r.message,errorName:r.name,code:r.code,insufficientCredit:{requiredBytes:r.requiredBytes,offeredBytes:r.offeredBytes}};let i=e instanceof b||e instanceof x?e:Te(e);if(i instanceof x){let e=xe(i.details);return e?{message:typeof i.message==`string`?i.message:W(e),errorName:`OoxmlResourceLimitError`,code:`ooxml-resource-limit`,resourceLimit:e}:{message:`Invalid OOXML resource-limit error payload`,errorName:`Error`}}if(i instanceof b)return{message:typeof i.message==`string`?i.message:String(i.message),errorName:z(i.name,128)?i.name:`OoxmlError`,...B(i.code)?{code:i.code}:{}};let a=e instanceof Error?e.message:String(e);if(typeof a==`string`&&a.startsWith(P))return{message:`Invalid OOXML resource-limit payload`,errorName:`Error`};let o=e instanceof Error?e:Error(a),s=o;return{message:typeof o.message==`string`?o.message:String(o.message),errorName:z(o.name,128)?o.name:`Error`,...typeof s.code==`string`?{code:s.code}:{}}}function G(e){try{return Ee(e)}catch{return{message:`Worker operation failed with an unreadable error`,errorName:`Error`}}}function De(e){return e.byteOffset===0&&e.byteLength===e.buffer.byteLength&&e.buffer instanceof ArrayBuffer?e.buffer:e.slice().buffer}Object.freeze({maxArchiveEntryBytes:134217728,maxTotalInflatedBytes:268435456,maxArchiveEntries:4096});function Oe(e){return[e.maxArchiveEntryBytes===null?0n:BigInt(e.maxArchiveEntryBytes),e.maxTotalInflatedBytes===null?0n:BigInt(e.maxTotalInflatedBytes),e.maxArchiveEntries===null?0n:BigInt(e.maxArchiveEntries)]}const K=`ooxml-pull-v1`;function q(e,t){if(!Number.isSafeInteger(e)||e<=0)throw RangeError(`${t} must be a positive safe integer`)}function ke(e){if(!(typeof e==`string`&&e.length>0||typeof e==`number`&&Number.isSafeInteger(e)&&e>0))throw RangeError(`session id must be a non-empty string or positive safe integer`)}var J=class{owner;queue=Promise.resolve();leases=new Map;retainedBytes=0;retainedCount=0;maxRetainedBytes;maxRetainedCount;cleanups=new Set;pendingFatalCleanups=[];poisonRunning=!1;fatal;constructor(e){this.maxRetainedBytes=e?.maxRetainedBytes??64*1024*1024,this.maxRetainedCount=e?.maxRetainedCount??256,q(this.maxRetainedBytes,`max retained lease bytes`),q(this.maxRetainedCount,`max retained lease count`)}enqueue(e){let t=this.queue.then(e,e);return this.queue=t.then(()=>void 0,()=>void 0),t}acquire(e){return this.owner===void 0?(this.owner=e,!0):this.owner===e}release(e){this.owner===e&&(this.owner=void 0)}retainLease(e,t,n){if(!Number.isSafeInteger(n)||n<0)throw RangeError(`retained lease bytes are invalid`);let r=this.leases.get(e)??new Map;if(r.has(t))throw Error(`driver returned a duplicate lease id`);if(this.retainedCount+1>this.maxRetainedCount)throw RangeError(`retained lease count exceeds limit`);if(this.retainedBytes+n>this.maxRetainedBytes)throw RangeError(`retained lease bytes exceed limit`);r.set(t,n),this.leases.set(e,r),this.retainedCount++,this.retainedBytes+=n}releaseLease(e,t){let n=this.leases.get(e),r=n?.get(t);r!==void 0&&(n?.delete(t),n?.size===0&&this.leases.delete(e),this.retainedCount--,this.retainedBytes-=r)}registerCleanup(e){return this.fatal?(this.poisonRunning?this.pendingFatalCleanups.push(e):this.enqueue(e).catch(()=>void 0),()=>void 0):(this.cleanups.add(e),()=>this.cleanups.delete(e))}get fatalError(){return this.fatal}get registeredHostCount(){return this.cleanups.size}async poison(e){if(this.fatal??=e,this.poisonRunning)return this.fatal;this.poisonRunning=!0,this.pendingFatalCleanups.push(...this.cleanups);try{let e;for(;(e=this.pendingFatalCleanups.shift())!==void 0;)await e().catch(()=>void 0)}finally{this.poisonRunning=!1}return this.fatal}},Ae=class{options;coordinator;coordinatorOwner=Symbol(`pull-session-host`);unregisterCleanup;sequence=0;unacked;leases=new Map;activeDriverLeases=new Set;nextWireLeaseId;cancelRequested=!1;cancelComplete=!1;closeRequested=!1;closeComplete=!1;driverCancelComplete=!1;driverCloseComplete=!1;completed=!1;constructor(e){ke(e.sessionId),q(e.operationId,`operation id`),q(e.generation,`generation`),q(e.maxByteCredit,`max byte credit`),e.wireLeaseIdStart!==void 0&&q(e.wireLeaseIdStart,`wire lease id start`),this.options=e,this.coordinator=e.coordinator,this.nextWireLeaseId=e.wireLeaseIdStart??1,this.unregisterCleanup=this.coordinator.registerCleanup(()=>this.forceFatalCleanup())}dispatch(e,t){return this.coordinator.enqueue(async()=>{let n=await this.execute(e);try{t(n.response,n.transfer)}catch(e){throw await this.rollbackFailedPost(n),e}})}async rollbackFailedPost(e){let t=e.response;if(t.kind===`chunk`){let n=t.leaseId===void 0?void 0:this.leases.get(t.leaseId);try{await this.options.driver.disposeInvalidChunk?.({payload:t.payload,byteLength:t.byteLength,done:t.done,leaseId:n?.driverLeaseId,retainedBytes:n?.retainedBytes,transfer:e.transfer})}catch{}}this.unacked=void 0,this.coordinator.release(this.coordinatorOwner);for(let[e,t]of[...this.leases])try{await this.options.driver.releaseLease?.(t.driverLeaseId)}catch{}finally{this.leases.delete(e),this.activeDriverLeases.delete(t.driverLeaseId),this.coordinator.releaseLease(this.coordinatorOwner,e)}if(this.cancelRequested=!0,!this.driverCancelComplete)try{await this.options.driver.cancel?.(),this.driverCancelComplete=!0}catch{}this.unregisterCleanup()}async execute(e){try{if(this.isStaleLifecycle(e)){let t=e.kind===`cancel`?`cancel`:`close`;return this.sameOperationIdentity(e)?{response:this.accepted(e,t,!0)}:{response:this.errorResponse(e,{message:`stale lifecycle targets another session or operation`,errorName:`PullSessionProtocolError`,code:`ooxml-stale-lifecycle`})}}this.validateCommandIdentity(e);let t=this.coordinator.fatalError;if(t)return e.kind===`pull`?{response:this.errorResponse(e,t)}:(e.kind===`cancel`?await this.cancel():e.kind===`close`?await this.close():e.kind===`release`&&await this.release(e.leaseId),{response:this.accepted(e,e.kind)});switch(e.kind){case`pull`:return await this.pull(e);case`ack`:return await this.ack(e.sequence),{response:this.accepted(e,`ack`)};case`release`:return await this.release(e.leaseId),{response:this.accepted(e,`release`)};case`cancel`:return await this.cancel(),{response:this.accepted(e,`cancel`)};case`close`:return await this.close(),{response:this.accepted(e,`close`)}}}catch(t){let n=G(t);return n.code===`ooxml-resource-limit`&&(n=await this.coordinator.poison(n)),{response:this.errorResponse(e,n)}}}async pull(e){if(this.closeRequested||this.cancelRequested||this.completed)throw Error(`pull session is closed`);if(this.unacked)throw Error(`previous chunk is not acknowledged`);if(!Number.isSafeInteger(e.sequence)||e.sequence<0||e.sequence!==this.sequence)throw Error(`pull command sequence mismatch`);if(this.validateHostCredit(e.byteCredit),!this.coordinator.acquire(this.coordinatorOwner))throw Error(`another operation has an unacknowledged package chunk`);let t;try{t=await this.options.driver.pull(e.byteCredit)}catch(e){throw this.coordinator.release(this.coordinatorOwner),e}let n=!1,r=!1,i,a;try{let o=this.options.driver.measureChunk(t),s=this.arrayBufferTransferBytes(t.transfer);if(o<s)throw RangeError(`measured chunk bytes are below ArrayBuffer transfer bytes`);if(a=Math.max(o,s),t.leaseId!==void 0){if(q(t.leaseId,`lease id`),t.retainedBytes===void 0)throw Error(`retained lease bytes are required`);if(this.activeDriverLeases.has(t.leaseId))throw r=!0,Error(`driver returned an active duplicate lease id`);i=this.allocateWireLeaseId(),this.coordinator.retainLease(this.coordinatorOwner,i,t.retainedBytes),this.leases.set(i,{driverLeaseId:t.leaseId,retainedBytes:t.retainedBytes}),this.activeDriverLeases.add(t.leaseId),n=!0}else if(t.retainedBytes!==void 0)throw Error(`retained lease bytes require a lease id`);if(!Number.isSafeInteger(a)||a<0)throw RangeError(`host chunk byte length must be a non-negative safe integer`);if(a>e.byteCredit)throw RangeError(`host chunk exceeds byte credit`)}catch(e){let a;try{await this.options.driver.disposeInvalidChunk?.(t)}catch(e){a=e}if(n&&i!==void 0)try{await this.release(i)}catch(e){a??=e}else if(t.leaseId!==void 0&&!r)try{await this.options.driver.releaseLease?.(t.leaseId)}catch(e){a??=e}if(r)try{await this.cancel()}catch(e){a??=e}throw this.coordinator.release(this.coordinatorOwner),a||e}return this.unacked={sequence:this.sequence,done:t.done},{response:{kind:`chunk`,protocol:K,...this.identity(),requestId:e.requestId,sequence:this.sequence,byteLength:a,done:t.done,payload:t.payload,leaseId:i,usage:this.resourceUsage()},transfer:t.transfer}}async ack(e){if(!Number.isSafeInteger(e)||e<0)throw RangeError(`invalid ack sequence`);if(e<this.sequence)return;if(!this.unacked||e!==this.sequence)throw Error(`ack sequence mismatch`);let t=this.unacked.done;await this.options.driver.acknowledge?.(e),this.unacked=void 0,this.coordinator.release(this.coordinatorOwner),this.sequence++,t&&(this.completed=!0,this.maybeUnregisterCompleted())}async release(e){q(e,`wire lease id`);let t=this.leases.get(e);t&&(await this.options.driver.releaseLease?.(t.driverLeaseId),this.leases.delete(e),this.activeDriverLeases.delete(t.driverLeaseId),this.coordinator.releaseLease(this.coordinatorOwner,e),this.maybeUnregisterCompleted())}async cancel(){if(this.cancelComplete)return;this.cancelRequested=!0,this.unacked=void 0,this.coordinator.release(this.coordinatorOwner);let e;try{await this.releaseAllLeases()}catch(t){e=t}if(!this.driverCancelComplete)try{await this.options.driver.cancel?.(),this.driverCancelComplete=!0}catch(t){e??=t}if(e)throw e;this.cancelComplete=!0,this.unregisterCleanup()}async close(){if(this.closeComplete)return;this.closeRequested=!0,this.unacked=void 0,this.coordinator.release(this.coordinatorOwner);let e;try{await this.releaseAllLeases()}catch(t){e=t}if(!this.driverCloseComplete)try{await this.options.driver.close?.(),this.driverCloseComplete=!0}catch(t){e??=t}if(e)throw e;this.closeComplete=!0,this.unregisterCleanup()}async releaseAllLeases(){let e;for(let t of[...this.leases.keys()])try{await this.release(t)}catch(t){e??=t}if(e)throw e}validateCommandIdentity(e){if(e.protocol!==`ooxml-pull-v1`||e.sessionId!==this.options.sessionId||e.operationId!==this.options.operationId||e.generation!==this.options.generation||!Number.isSafeInteger(e.requestId)||e.requestId<=0)throw Error(`stale or mismatched pull session command`)}validateHostCredit(e){if(q(e,`byte credit`),e>this.options.maxByteCredit)throw RangeError(`byte credit exceeds host maximum`)}accepted(e,t,n=!1){return{kind:`accepted`,protocol:K,...n?{sessionId:e.sessionId,operationId:e.operationId,generation:e.generation}:this.identity(),requestId:e.requestId,command:t,usage:this.resourceUsage()}}identity(){return{sessionId:this.options.sessionId,operationId:this.options.operationId,generation:this.options.generation}}isStaleLifecycle(e){return(e.kind===`cancel`||e.kind===`close`)&&e.protocol===`ooxml-pull-v1`&&Number.isSafeInteger(e.requestId)&&e.requestId>0&&Number.isSafeInteger(e.generation)&&e.generation>0&&e.generation<this.options.generation}sameOperationIdentity(e){return e.sessionId===this.options.sessionId&&e.operationId===this.options.operationId}errorResponse(e,t){return{kind:`error`,protocol:K,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,error:t,usage:this.errorResourceUsage()}}async forceFatalCleanup(){this.cancelRequested=!0,this.unacked=void 0,this.coordinator.release(this.coordinatorOwner);let e;for(let t of[...this.leases.keys()])try{await this.release(t)}catch(t){e??=t}if(!this.driverCancelComplete)try{await this.options.driver.cancel?.(),this.driverCancelComplete=!0}catch(t){e??=t}if(e)throw e;this.unregisterCleanup()}allocateWireLeaseId(){if(!Number.isSafeInteger(this.nextWireLeaseId)||this.nextWireLeaseId<=0)throw RangeError(`wire lease id space exhausted`);return this.nextWireLeaseId++}arrayBufferTransferBytes(e){let t=0;for(let n of e??[])if(n instanceof ArrayBuffer&&(t+=n.byteLength,!Number.isSafeInteger(t)))throw RangeError(`ArrayBuffer transfer bytes overflow`);return t}maybeUnregisterCompleted(){this.completed&&this.leases.size===0&&this.unregisterCleanup()}resourceUsage(){return this.options.driver.resourceUsage?.()}errorResourceUsage(){try{return this.resourceUsage()}catch{return}}};function je(e){let t=e(e=>e.document_cursor_resource_usage?.());return t?L(t):void 0}const Y=67108864;var Me=class{coordinator=new J;host=null;identity=null;constructor(e,t=e=>e(this.requireArchive())){this.archive=e,this.executeArchive=t}open(e){if(this.host)throw Error(`a DOCX document pull session is already active`);this.executeArchive(t=>{t.open_document_cursor(e.operationId,e.generation)});let t=0;this.identity=e,this.host=new Ae({...e,maxByteCredit:Y,coordinator:this.coordinator,driver:{pull:n=>{let r;try{r=this.executeArchive(r=>r.pull_document_chunk(t,e.operationId,e.generation,n))}catch(e){throw he(e,n,Y)||e}let i=De(r);return{payload:i,byteLength:i.byteLength,done:this.executeArchive(e=>e.document_chunk_done()),transfer:[i]}},measureChunk:({payload:e})=>e.byteLength,acknowledge:n=>{if(n!==t)throw Error(`DOCX document acknowledgement sequence mismatch`);this.executeArchive(n=>n.acknowledge_document_chunk(t,e.operationId,e.generation)),t+=1},cancel:()=>this.executeArchive(e=>e.cancel_document_cursor()),close:()=>this.executeArchive(e=>e.close_document_session()),resourceUsage:()=>je(this.executeArchive)}})}dispatch(e,t){return!this.host||!this.identity?(t({protocol:K,kind:`error`,sessionId:e.sessionId,operationId:e.operationId,generation:e.generation,requestId:e.requestId,error:G(Error(`DOCX document pull session is not open`))}),Promise.resolve()):this.host.dispatch(e,t)}async reset(){if(this.host)try{this.archive()&&this.executeArchive(e=>e.close_document_session())}finally{this.host=null,this.identity=null,this.coordinator=new J}}requireArchive(){let e=this.archive();if(!e)throw Error(`No docx loaded`);return e}};function Ne(e){return!!e&&typeof e==`object`&&e.protocol===`ooxml-pull-v1`}const X=new fe(y,{freeArchive:e=>e.free(),reinit:re}),Z=new Me(()=>X.archive,e=>X.run(()=>{let t=X.archive;if(!t)throw Error(`No docx loaded`);return e(t)}));let Q=0;const $=(e,t)=>self.postMessage(e,t);self.onmessage=async e=>{let n=e.data;if(Ne(n)){try{await Z.dispatch(n,$)}catch(e){$({protocol:K,kind:`error`,sessionId:n.sessionId,operationId:n.operationId,generation:n.generation,requestId:n.requestId,error:G(e)})}return}if(n.type===`init`){X.setWasmInput(le(n.wasmUrl)??n.wasmUrl);return}let r=n.id;try{if(await X.ensureReady(),n.type!==`parse`&&X.archive){let e=X.archive;X.run(()=>e.assert_healthy())}if(n.type===`parse`){await Z.reset();let[e,i,a]=Oe(n.resourcePolicy),o=new Uint8Array(n.data);X.run(()=>{let n=new t(o,e,i,a);X.setArchive(n)}),Q+=1;let s={sessionId:Q,operationId:Q,generation:Q};Z.open(s),$({type:`documentSessionOpened`,id:r,...s});return}let e=X.archive;if(n.type===`extractImage`){if(!e)throw Error(`No docx loaded`);let t=X.run(()=>e.extract_image(n.path).buffer),i={type:`imageExtracted`,id:r,bytes:t};self.postMessage(i,[t]);return}if(n.type===`resourceUsage`){if(!e)throw Error(`No docx loaded`);$({type:`resourceUsage`,id:r,usage:L(X.run(()=>e.resource_usage()))});return}if(n.type===`toMarkdown`){if(!e)throw Error(`No docx loaded`);$({type:`markdownRendered`,id:r,markdown:X.run(()=>e.to_markdown())});return}}catch(e){$({type:`error`,id:r,...G(e)})}};", R = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", L], { type: "text/javascript;charset=utf-8" });
function Ye(e) {
	let t;
	try {
		if (t = R && (self.URL || self.webkitURL).createObjectURL(R), !t) throw "";
		let n = new Worker(t, {
			type: "module",
			name: e?.name
		});
		return n.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(t);
		}), n;
	} catch {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(L), {
			type: "module",
			name: e?.name
		});
	}
}
//#endregion
//#region packages/docx/src/wasm/docx_parser_bg.wasm?url
var Xe = new URL("docx_parser_bg.wasm", import.meta.url).href;
//#endregion
//#region packages/docx/src/bookmark-nav.ts
function Ze(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.pages) for (let e of n.bookmarkStarts) e.name !== "" && !t.has(e.name) && t.set(e.name, n.pageIndex);
	return t;
}
//#endregion
//#region packages/docx/src/embedded-fonts.ts
var Qe = e, $e = 64, z = 2;
async function et(e, t) {
	let n;
	try {
		n = globalThis.crypto?.subtle ? new Uint8Array(await globalThis.crypto.subtle.digest("SHA-256", e.slice().buffer)) : nt(e);
	} catch {
		n = nt(e);
	}
	let r = Array.from(n, (e) => e.toString(16).padStart(2, "0")).join(""), i = 2166136261;
	for (let e of t.trim().toLocaleLowerCase("en-US")) i ^= e.codePointAt(0), i = Math.imul(i, 16777619);
	return `__ooxml_docx_embedded_${r}_${(i >>> 0).toString(16)}`;
}
var tt = new Uint32Array([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]);
function nt(e) {
	let t = new Uint32Array([
		1779033703,
		3144134277,
		1013904242,
		2773480762,
		1359893119,
		2600822924,
		528734635,
		1541459225
	]), n = new Uint32Array(64), r = Math.ceil((e.length + 9) / 64) * 64, i = e.length * 8, a = (t) => t < e.length ? e[t] : t === e.length ? 128 : t >= r - 8 ? Math.floor(i / 2 ** ((r - t - 1) * 8)) & 255 : 0, o = (e, t) => e >>> t | e << 32 - t;
	for (let e = 0; e < r; e += 64) {
		for (let t = 0; t < 16; t++) {
			let r = e + t * 4;
			n[t] = a(r) << 24 | a(r + 1) << 16 | a(r + 2) << 8 | a(r + 3);
		}
		for (let e = 16; e < 64; e++) {
			let t = n[e - 15], r = n[e - 2], i = o(t, 7) ^ o(t, 18) ^ t >>> 3, a = o(r, 17) ^ o(r, 19) ^ r >>> 10;
			n[e] = n[e - 16] + i + n[e - 7] + a >>> 0;
		}
		let [r, i, s, c, l, u, d, f] = t;
		for (let e = 0; e < 64; e++) {
			let t = o(l, 6) ^ o(l, 11) ^ o(l, 25), a = l & u ^ ~l & d, p = f + t + a + tt[e] + n[e] >>> 0, m = (o(r, 2) ^ o(r, 13) ^ o(r, 22)) + (r & i ^ r & s ^ i & s) >>> 0;
			f = d, d = u, u = l, l = c + p >>> 0, c = s, s = i, i = r, r = p + m >>> 0;
		}
		t[0] = t[0] + r >>> 0, t[1] = t[1] + i >>> 0, t[2] = t[2] + s >>> 0, t[3] = t[3] + c >>> 0, t[4] = t[4] + l >>> 0, t[5] = t[5] + u >>> 0, t[6] = t[6] + d >>> 0, t[7] = t[7] + f >>> 0;
	}
	let s = new Uint8Array(32), c = new DataView(s.buffer);
	return t.forEach((e, t) => c.setUint32(t * 4, e)), s;
}
async function rt(e, t) {
	let n = e.embeddedFonts;
	if (!n || n.length === 0) return {
		faces: [],
		metrics: {},
		routes: []
	};
	let r = [], i = /* @__PURE__ */ new Set();
	for (let e of n) {
		let t = it(e.style) === "bold" ? 700 : 400, n = at(e.style), a = `${v(e.fontName)}:${t}:${n}`;
		i.has(a) || (i.add(a), r.push(e));
	}
	let s = [], u = 0, d = Math.min(r.length, $e), f = r.length - d;
	for (let e = 0; e < d; e += z) {
		let n = r.slice(e, Math.min(e + z, d)), i = await Promise.all(n.map(async (e) => {
			try {
				return await t(e.partPath);
			} catch {
				return null;
			}
		}));
		for (let e = 0; e < n.length; e++) {
			let t = n[e], r = i[e];
			if (r) {
				if (!o(r) || r.byteLength > Qe - u) {
					f++;
					continue;
				}
				try {
					let e = t.partPath.toLowerCase().endsWith(".odttf") ? l(r, t.fontKey ?? "") : r, n = await et(e, t.fontName), i = {
						family: n,
						bytes: e,
						odttf: !1,
						fontKey: "",
						weight: it(t.style),
						style: at(t.style)
					}, a = null;
					try {
						let r = qe(e), o = r?.farEastCodePage == null ? null : x({
							...r,
							farEastCodePage: r.farEastCodePage
						});
						(o || r?.averageCharWidthRatio != null) && (a = Object.freeze({
							family: n,
							requestedFamily: t.fontName,
							weight: i.weight === "bold" ? 700 : 400,
							style: i.style,
							sourceIdentity: `embedded:${n}`,
							synthesized: !1,
							...o ? {
								lineHeightRatio: o.lineHeightRatio,
								designAscentRatio: o.designAscentRatio,
								designDescentRatio: o.designDescentRatio
							} : {},
							...r?.averageCharWidthRatio == null ? {} : { averageCharWidthRatio: r.averageCharWidthRatio },
							unicodeRanges: r?.unicodeRanges ?? [],
							...o && r?.hasEastAsianCmap ? { eastAsianLineHeightRatio: o.lineHeightRatio } : {}
						}));
					} catch {}
					s.push({
						face: i,
						metric: a,
						route: {
							requestedFamily: t.fontName,
							resolvedFamily: i.family,
							weight: i.weight === "bold" ? 700 : 400,
							style: i.style,
							resourceIdentity: `embedded:${i.family}`
						}
					}), u += r.byteLength;
				} catch {
					continue;
				}
			}
		}
	}
	f > 0 && console.warn(`[ooxml] skipped ${f} embedded font face(s) under the document font resource limits`);
	let p = s;
	if (p.length === 0) return {
		faces: [],
		metrics: {},
		routes: []
	};
	let m = [], h = /* @__PURE__ */ new Set();
	try {
		for (let e = 0; e < p.length; e += z) {
			let t = p.slice(e, e + z);
			for (let e of await a(t.map((e) => e.face))) h.has(e) ? c([e]) : (h.add(e), m.push(e));
		}
	} catch (e) {
		throw c(m), e;
	}
	let g = new Set(m.map((e) => {
		let t = e.family.trim().replace(/^(['"])(.*)\1$/, "$2"), n = e.weight === "bold" ? 700 : Number(e.weight) || 400, r = e.style === "italic" ? "italic" : "normal";
		return `${v(t)}:${n}:${r}`;
	})), _ = {}, y = [];
	for (let e of p) {
		let t = v(e.face.family), n = e.face.weight === "bold" ? 700 : 400, r = e.face.style, i = `${t}:${n}:${r}`;
		if (!g.has(i) || (y.push(Object.freeze(e.route)), !e.metric)) continue;
		let a = v(e.route.requestedFamily);
		_[n === 400 && r === "normal" ? a : `${a}:${n}:${r}`] = e.metric;
	}
	return {
		faces: m,
		metrics: Object.freeze(_),
		routes: Object.freeze(y)
	};
}
function it(e) {
	return e === "bold" || e === "boldItalic" ? "bold" : "normal";
}
function at(e) {
	return e === "italic" || e === "boldItalic" ? "italic" : "normal";
}
//#endregion
//#region packages/docx/src/element-context.ts
var ot = be, st = 16384;
function ct(e, t) {
	let n = Math.min(e.length, t);
	if (n > 0 && n < e.length) {
		let t = e.charCodeAt(n - 1), r = e.charCodeAt(n);
		t >= 55296 && t <= 56319 && r >= 56320 && r <= 57343 && n--;
	}
	return e.slice(0, n);
}
function lt(e, t) {
	let n = [], r = 0, i = !1;
	for (let a of e) {
		if (a.length === 0) continue;
		if (r > 0) {
			if (r >= t) {
				i = !0;
				break;
			}
			n.push("\n"), r++;
		}
		let e = ct(a, Math.max(0, t - r));
		if (n.push(e), r += e.length, e.length < a.length) {
			i = !0;
			break;
		}
	}
	let a = n.join("");
	return {
		...a.length === 0 ? {} : { text: a },
		truncated: i
	};
}
function* B(e) {
	if (e.kind === "paragraph") {
		for (let t of e.lines) {
			let e = t.placements.flatMap((e) => e.kind === "text" && !e.optionalHyphenGlyph ? [e.text] : []).join("");
			e && (yield e);
		}
		return;
	}
	if (e.kind === "table") {
		for (let t of e.rows) for (let e of t.cells) for (let t of e.blocks) yield* B(t.layout);
		return;
	}
	if (e.kind === "note") {
		e.leading?.paragraph && (yield* B(e.leading.paragraph));
		for (let t of e.story.blocks) yield* B(t);
		e.trailing?.paragraph && (yield* B(e.trailing.paragraph));
	} else if (e.kind === "textbox") for (let t of e.story.blocks) yield* B(t);
}
function* ut(e) {
	for (let t of e.drawing.commands) (t.kind === "text" || t.kind === "watermark-text") && (yield t.text);
	for (let t of e.textBoxes) yield* B(t);
}
function dt(e) {
	let t = e ?? st;
	if (!Number.isFinite(t) || t < 0) throw RangeError("maxTextCharacters must be a finite non-negative number.");
	return Math.min(ot, Math.floor(t));
}
function ft(e) {
	return {
		story: e.story,
		storyInstance: e.storyInstance,
		path: [...e.path]
	};
}
function pt(e) {
	return "drawing" in e ? e.drawing.inkBounds : e.placement.bounds;
}
function mt(e) {
	let t = pt(e), n = [
		h(e.pointToPage, t),
		h(e.pointToPage, {
			xPt: t.xPt + t.widthPt,
			yPt: t.yPt
		}),
		h(e.pointToPage, {
			xPt: t.xPt,
			yPt: t.yPt + t.heightPt
		}),
		h(e.pointToPage, {
			xPt: t.xPt + t.widthPt,
			yPt: t.yPt + t.heightPt
		})
	], r = Math.min(...n.map((e) => e.xPt)), i = Math.min(...n.map((e) => e.yPt)), a = Math.max(...n.map((e) => e.xPt)), o = Math.max(...n.map((e) => e.yPt));
	return {
		xPt: r,
		yPt: i,
		widthPt: a - r,
		heightPt: o - i
	};
}
function V(e, t) {
	return t.xPt >= e.xPt && t.xPt <= e.xPt + e.widthPt && t.yPt >= e.yPt && t.yPt <= e.yPt + e.heightPt;
}
function ht(e, t) {
	let n = !1;
	for (let r = 0, i = t.length - 1; r < t.length; i = r++) {
		let a = t[r], o = t[i];
		a.yPt > e.yPt != o.yPt > e.yPt && e.xPt < (o.xPt - a.xPt) * (e.yPt - a.yPt) / (o.yPt - a.yPt) + a.xPt && (n = !n);
	}
	return n;
}
function gt(e, t) {
	return V(e.inkBounds, t) ? e.clip ? e.clip.kind === "rect" ? V(e.clip.rect, t) : ht(t, e.clip.points) : !0 : !1;
}
function _t(e, t, n) {
	for (let n of e.clips) {
		let e = b(n.pointToPage, t);
		if (!e || !V(n.bounds, e)) return !1;
	}
	return "drawing" in e ? gt(e.drawing, n) : V(e.placement.bounds, n);
}
function H(e, t) {
	return e.commands.find((e) => e.kind === "resource" && e.resourceKind === t);
}
function vt(e) {
	return H(e, "chart") ? "chart" : e.commands.some((e) => e.kind === "drawingml-shape" || e.kind === "drawingml-image-fill" || e.kind === "fill-rect" || e.kind === "stroke-rect" || e.kind === "text" || e.kind === "watermark-text") ? "shape" : H(e, "image") ? "image" : null;
}
function yt(e, t, n, r, i, a) {
	let o = "drawing" in e ? vt(e.drawing) : e.placement.resourceKind;
	if (!o) return null;
	let s, c = !1, l, u;
	if (o === "chart") {
		let t = "drawing" in e ? H(e.drawing, "chart").resourceKey : e.placement.resourceKey, n = i.resolve(t, "chart"), r = ve(n.model, a);
		s = r.text, c = r.truncated, u = n.model.series.length;
	} else if (o === "image") {
		let t = "drawing" in e ? H(e.drawing, "image").resourceKey : e.placement.resourceKey, n = i.descriptors.find((e) => e.resourceKey === t && e.kind === "image" && "mimeType" in e);
		if (!n) throw Error(`Unknown image paint resource: ${t}`);
		l = n.mimeType;
	} else {
		let t = lt(ut(e), a);
		s = t.text, c = t.truncated;
	}
	return {
		format: "docx",
		kind: "element",
		pageIndex: t,
		elementIndex: n,
		elementType: o,
		point: { ...r },
		bounds: mt(e),
		source: ft("drawing" in e ? e.drawing.source : e.source),
		...s === void 0 ? {} : { text: s },
		...l === void 0 ? {} : { mimeType: l },
		...u === void 0 ? {} : { seriesCount: u },
		truncated: c,
		truncationReasons: c ? ["text"] : [],
		textCharacters: s?.length ?? 0,
		maxTextCharacters: a
	};
}
function bt(e, t, n, r, i = {}) {
	if (!Number.isFinite(n.xPt) || !Number.isFinite(n.yPt)) throw RangeError("DOCX hit-test point must contain finite page coordinates.");
	let a = dt(i.maxTextCharacters), o = te(e, t);
	for (let e = o.length - 1; e >= 0; e--) {
		let i = o[e], s = b(i.pointToPage, n);
		if (!s || !_t(i, n, s)) continue;
		let c = yt(i, t, e, n, r, a);
		if (c) return c;
	}
	return null;
}
function xt(e, t, n, r) {
	return bt(le(e, {
		currentDate: r.currentDate,
		defaultCurrentDateMs: r.defaultCurrentDateMs,
		showTrackedChanges: r.showTrackedChanges
	}, t).layout, t, n, m(e), r);
}
function St(e, t) {
	let n = dt(t), r = e.text === void 0 ? void 0 : ct(e.text, n), i = e.truncated || e.text !== void 0 && r.length < e.text.length;
	return {
		...structuredClone(e),
		...r === void 0 ? {} : { text: r },
		truncated: i,
		truncationReasons: i ? ["text"] : [],
		textCharacters: r?.length ?? 0,
		maxTextCharacters: n
	};
}
//#endregion
//#region packages/docx/src/revisions.ts
function U(e) {
	let t = De(e.id);
	return t === void 0 ? void 0 : `${e.kind}\u0000${t}`;
}
function W(e) {
	return Object.freeze({
		...e,
		path: Object.freeze([...e.path])
	});
}
function G(e, t) {
	return e !== void 0 && e.story === t.story && e.storyInstance === t.storyInstance && e.path.length === t.path.length && e.path.every((e, n) => e === t.path[n]);
}
function K(e, t) {
	let n = 0, r = e.length;
	for (; n < r;) {
		let i = n + Math.floor((r - n) / 2);
		e[i] < t ? n = i + 1 : r = i;
	}
	return n;
}
function Ct(e, t) {
	let n = Array(e.length), r;
	for (let i = e.length - 1; i >= 0; --i) {
		n[i] = r;
		let a = e[i], o = t.get(A(a.source))?.[0];
		o !== void 0 && (r = Object.freeze({
			source: W(a.source),
			sourceRunIndex: o
		}));
	}
	let i = Array(e.length), a;
	for (let n = 0; n < e.length; n += 1) {
		i[n] = a;
		let r = e[n], o = t.get(A(r.source))?.at(-1);
		o !== void 0 && (a = Object.freeze({
			source: W(r.source),
			sourceRunIndex: o
		}));
	}
	return {
		following: n,
		preceding: i
	};
}
function wt(e, t, n, r, i, a) {
	let o = r[e], s = i.get(A(o.source)) ?? [], c = s[K(s, n)], l = s[K(s, t) - 1], u = c ?? l;
	return u === void 0 ? a.following[e] ?? a.preceding[e] : Object.freeze({
		source: W(o.source),
		sourceRunIndex: u
	});
}
function Tt(e, t, n = /* @__PURE__ */ new Map()) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
	e.forEach((e, t) => {
		let n = U(e);
		n === void 0 || i.has(n) || (r.has(n) ? (r.delete(n), i.add(n)) : r.set(n, t));
	});
	let a = t.blocks.sources.flatMap((e) => {
		if (e.story !== "body") return [];
		let n = t.blocks.resolve(e);
		return n.type === "paragraph" ? [{
			source: e,
			runs: n.runs
		}] : [];
	}), o = new Map([...n].map(([e, t]) => [e, Object.freeze([...t].sort((e, t) => e - t))])), s = Ct(a, o), c = [];
	for (let [e, t] of a.entries()) {
		let n = 0;
		for (; n < t.runs.length;) {
			let i = t.runs[n], l = i.revision?.kind ? U({
				kind: i.revision.kind,
				id: i.revision.id
			}) : void 0, u = l === void 0 ? void 0 : r.get(l);
			if (u === void 0) {
				n += 1;
				continue;
			}
			let d = n;
			for (n += 1; n < t.runs.length;) {
				let e = t.runs[n].revision;
				if (!e?.kind || U({
					kind: e.kind,
					id: e.id
				}) !== l) break;
				n += 1;
			}
			let f = n, p = o.get(A(t.source)) ?? [], m = (p[K(p, d)] ?? f) < f ? void 0 : wt(e, d, f, a, o, s);
			c.push(Object.freeze({
				revisionIndex: u,
				source: W(t.source),
				startRunIndex: d,
				endRunIndex: f,
				...m === void 0 ? {} : { geometryFallback: m }
			}));
		}
	}
	return c;
}
function Et(e, t, n = /* @__PURE__ */ new Map(), r = {}) {
	if ((e?.length ?? 0) === 0) return [];
	let i = Tt(e ?? [], t, n), a = r.completedSourceKeys;
	return a === void 0 ? i : i.filter((e) => {
		let t = n.get(A(e.source));
		return t !== void 0 && [...t].some((t) => t >= e.startRunIndex && t < e.endRunIndex) || a.has(A(e.source));
	});
}
function Dt(e, t) {
	let n = t.filter((t) => t.sourceRunIndex !== void 0 && G(t.source, e.source) && t.sourceRunIndex >= e.startRunIndex && t.sourceRunIndex < e.endRunIndex);
	if (n.length > 0) return n;
	let r = e.geometryFallback;
	return r === void 0 ? [] : t.filter((e) => e.sourceRunIndex === r.sourceRunIndex && G(e.source, r.source));
}
//#endregion
//#region packages/docx/src/layout/progressive.ts
var Ot = 12;
async function kt(e, t, n, r = {}) {
	let { onPreview: i, scheduler: a } = r;
	return w(S(e, t, n, i && e.sequence.length > Ot ? { onPages: (e, t) => {
		i(Object.freeze({
			layout: e,
			exact: !1,
			coveredEntries: t
		}));
	} } : void 0), a);
}
//#endregion
//#region packages/docx/src/document-layout-events.ts
var q = /* @__PURE__ */ new WeakMap();
function J(e, t) {
	let n = Object.freeze({ ...t });
	for (let t of [...q.get(e) ?? []]) try {
		t.notify(n);
	} catch (e) {
		try {
			t.report(e);
		} catch {}
	}
}
function At(e, t, n, r) {
	let i = q.get(e);
	i || (i = /* @__PURE__ */ new Set(), q.set(e, i));
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
		i?.delete(a), i?.size === 0 && q.delete(e);
	};
}
//#endregion
//#region packages/docx/src/layout/unchanged-pages.ts
function jt(e, t) {
	if (!e) return 0;
	let n = Math.min(e.length, t.length), r = 0;
	for (; r < n && Y(e[r], t[r]);) r += 1;
	return r;
}
function Y(e, t) {
	if (e === t) return !0;
	if (typeof e != "object" || typeof t != "object" || e === null || t === null) return !1;
	if (Array.isArray(e)) {
		if (!Array.isArray(t) || e.length !== t.length) return !1;
		for (let n = 0; n < e.length; n += 1) if (!Y(e[n], t[n])) return !1;
		return !0;
	}
	if (Array.isArray(t)) return !1;
	let n = Object.keys(e);
	if (n.length !== Object.keys(t).length) return !1;
	for (let r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || !Y(e[r], t[r])) return !1;
	return !0;
}
//#endregion
//#region packages/docx/src/document-layout-view.ts
var X = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap(), Nt = Symbol("docxLayoutViewRequester");
function Z(e) {
	let t = y(e), n = t.activeLayoutOptions;
	return {
		showTrackedChanges: n?.showTrackedChanges === !0,
		currentDate: n?.currentDateMs ?? t.defaultCurrentDateMs
	};
}
async function Pt(e, t, n) {
	let r = y(e), i = _(t.currentDate, r.defaultCurrentDateMs, t.showTrackedChanges === !0), a = Object.freeze({
		showTrackedChanges: i.showTrackedChanges === !0,
		currentDate: i.currentDateMs
	}), o = {
		showTrackedChanges: a.showTrackedChanges,
		currentDate: a.currentDate,
		[Nt]: n
	};
	await e.setLayoutView(o);
	let s = Z(e);
	return s.currentDate === a.currentDate && s.showTrackedChanges === a.showTrackedChanges;
}
async function Ft(e, t, n, r, i) {
	let a = !1, o = () => {
		a || (a = !0, e.destroy());
	};
	try {
		for (; !t.aborted;) {
			let a = n();
			if (a === void 0 || Z(e).showTrackedChanges === a) break;
			t.addEventListener("abort", o, { once: !0 });
			try {
				await Pt(e, {
					showTrackedChanges: a,
					currentDate: r()
				}, i);
			} finally {
				t.removeEventListener("abort", o);
			}
		}
	} catch (e) {
		throw o(), e;
	}
}
function It(e, t) {
	let n = Object.freeze({ ...Z(e) }), r = (Mt.get(e) ?? 0) + 1;
	Mt.set(e, r);
	let i = Object.freeze({
		view: n,
		generation: r,
		requester: t
	});
	for (let t of [...X.get(e) ?? []]) try {
		t.notify(i);
	} catch (e) {
		try {
			t.report(e);
		} catch {}
	}
}
function Lt(e, t, n) {
	let r = X.get(e);
	r || (r = /* @__PURE__ */ new Set(), X.set(e, r));
	let i = Object.freeze({
		notify: t,
		report: n
	});
	return r.add(i), () => {
		r?.delete(i), r?.size === 0 && X.delete(e);
	};
}
//#endregion
//#region packages/docx/src/document.ts
var Rt = Symbol("docxViewerLoadSignal");
function zt(e, t) {
	return e !== null && e.currentDateMs === t.currentDateMs && e.showTrackedChanges === !0 == (t.showTrackedChanges === !0);
}
function Bt() {
	let e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
var Q = Object.freeze([]), Vt = Object.freeze([]), Ht = Object.freeze({
	comments: Object.freeze([]),
	revisions: Object.freeze([])
});
function $(e, t) {
	return E({
		comments: e,
		revisions: t
	}, "DOCX review metadata");
}
var Ut = class a {
	_metrics = null;
	_cjkFallback = "jp";
	_allowFootnoteContinuation = !1;
	_document = null;
	_source = null;
	_meta = null;
	_review = Ht;
	_layoutLifecycle = new s();
	_layoutObservers = new u();
	_layoutCompletion = null;
	_layoutAbort = null;
	_bookmarkPages = null;
	_commentAnchorRanges = null;
	_revisionAnchorRanges = null;
	_reviewProjectionIndex = null;
	_parseRequestId = null;
	_progressive = null;
	_parseWatchdog;
	_parseWatchdogMs;
	_layoutViewGeneration = 0;
	_mode = "main";
	_threeD;
	_regionMap;
	_chartEx;
	_tiff;
	_worker;
	_bridge;
	_rawParts = new Ee({
		maxEntries: 64,
		maxBytes: e
	});
	_embeddedFontFaces = [];
	_officeFontFaces = [];
	_googleFontFaces = [];
	_fetchImage = (e, t) => this.getImage(e, t);
	constructor(e, t, n, r) {
		this._worker = e, this._mode = t, g(this, n), this._bridge = new _e(this._worker, {
			correlate: (e) => "protocol" in e && e.protocol === "ooxml-pull-v1" ? e.requestId : "id" in e ? e.id : void 0,
			onUnsolicited: (e) => this._onWorkerLayoutPush(e),
			toError: (e) => {
				if (!("protocol" in e || e.type !== "error")) return Object.assign(we(e), {
					...e.reason === void 0 ? {} : { reason: e.reason },
					...e.outgoingColumnIndex === void 0 ? {} : { outgoingColumnIndex: e.outgoingColumnIndex },
					...e.outgoingColumnCount === void 0 ? {} : { outgoingColumnCount: e.outgoingColumnCount },
					...e.incomingColumnCount === void 0 ? {} : { incomingColumnCount: e.incomingColumnCount }
				});
			}
		});
		let i = new URL(r ?? Xe, location.href).href;
		this._bridge.post({
			type: "init",
			wasmUrl: i
		});
	}
	static async load(e, o = {}) {
		let s = o[Rt], l = s?.signal, u = () => {
			if (l?.aborted) throw new T();
		};
		if (u(), o.modelSources !== void 0) {
			let { loadDocxModelSource: t } = await import("./document-model-source-Cx5NB_cW.js"), n = await t(e, o, s);
			if (l?.aborted) throw n.destroy(), new T();
			return n;
		}
		let d = fe(o.cjkFallback), m = xe(o), h = Date.now(), g = o.mode ?? "main", v = new Se({
			enabled: !0,
			format: "docx",
			mode: g,
			policy: m.policy,
			onMetrics: m.onResourceMetrics,
			emitToConsole: m.debug
		});
		try {
			if (g === "worker" && (typeof Worker > "u" || typeof OffscreenCanvas > "u")) throw Error("mode: 'worker' requires Worker and OffscreenCanvas support");
			let b;
			if (typeof e == "string") {
				let t = await fetch(e, { signal: l });
				if (!t.ok) throw Error(`Failed to fetch: ${t.status} ${t.statusText}`);
				b = await t.arrayBuffer();
			} else b = e;
			u(), b = t(await n(b, o.password)), u(), v.setSourceBytes(b.byteLength), v.checkpoint("container ready");
			let x = g === "worker" ? (await import("./render-worker-host-B5pgJ3RJ.js")).createRenderWorker() : new Ye(), S = g === "worker" ? ge(o) : void 0, te = g === "worker" && !!o.progressiveLayout, C, w = !1, E = () => {
				w || !C || (w = !0, C.destroy());
			};
			try {
				C = new a(x, g, h, o.wasmUrl), l?.addEventListener("abort", E, { once: !0 }), u(), C._metrics = v, C._cjkFallback = d, C._allowFootnoteContinuation = o.allowFootnoteContinuation !== !1;
				let e = y(C), t = _(o.currentDate, e.defaultCurrentDateMs, o.showTrackedChanges === !0);
				e.activeLayoutOptions = t, await C._parse(b, m.policy, g === "worker" ? !!o.useGoogleFonts : !1, o.workerTimeoutMs, (e) => v.observeUsage(e), S, te ? {
					onPartial: o.onLayoutPartial,
					onComplete: o.onLayoutComplete,
					onProgress: o.onLayoutProgress,
					layoutOptions: t,
					abort: new AbortController(),
					firstPublication: Bt(),
					published: !1,
					settled: !1
				} : void 0), u(), g === "worker" && C._mode === "main" && (v.setMode("main"), console.warn("[ooxml] mode: 'worker' fell back to main-thread rendering because this document requires DOM OpenType vertical glyph selection.")), o.math && C._mode === "worker" && !S?.math && console.warn("[ooxml] a custom math renderer cannot cross the worker boundary; equations will be skipped in mode: 'worker'. Use the math renderer from @silurus/ooxml/math."), o.threeD && C._mode === "worker" && !S?.threeD && console.warn("[ooxml] a custom 3-D chart renderer cannot cross the worker boundary; charts use their 2-D family fallback in mode: 'worker'. Use the renderer from @silurus/ooxml/three-d."), C._threeD = C._mode === "worker" ? void 0 : o.threeD, o.regionMap && C._mode === "worker" && !S?.regionMap && console.warn("[ooxml] a custom Region Map renderer cannot cross the worker boundary; geospatial charts use the unsupported-chart placeholder in mode: 'worker'. Use the renderer from @silurus/ooxml/region-map."), C._regionMap = C._mode === "worker" ? void 0 : o.regionMap, o.chartEx && C._mode === "worker" && !S?.chartEx && console.warn("[ooxml] a custom ChartEx renderer cannot cross the worker boundary; ChartEx charts use the unsupported-chart placeholder in mode: 'worker'. Use the renderer from @silurus/ooxml/chart-ex."), C._chartEx = C._mode === "worker" ? void 0 : o.chartEx, o.tiff && C._mode === "worker" && !S?.tiff && console.warn("[ooxml] a custom TIFF codec cannot cross the worker boundary; recognized TIFF images will use an unavailable-image placeholder in mode: 'worker'. Use the codec from @silurus/ooxml/tiff to display them."), C._tiff = C._mode === "worker" ? void 0 : o.tiff;
				let n, w;
				if (C._mode === "main" && C._document?.embeddedFonts?.length) {
					let e = C, t = await rt(C._document, (t) => e.getFontBytes(t));
					if (l?.aborted) throw c(t.faces), new T();
					C._embeddedFontFaces = t.faces, n = t.metrics, w = t.routes;
				}
				let D = C._mode === "main" && C._document ? await f(ne(C._document, {
					useGoogleFonts: o.useGoogleFonts,
					cjkFallback: d
				}).filter((e) => !w?.some((t) => t.requestedFamily.toLowerCase() === e.family.toLowerCase() && t.weight === (e.weight ?? 400) && t.style === (e.style ?? "normal")))) : {
					faces: [],
					routes: {}
				};
				if (l?.aborted) throw p(D.faces), new T();
				C._officeFontFaces = D.faces;
				let O = [];
				if (C._mode === "main" && o.useGoogleFonts && C._document) {
					let e = ce(C._document, d, D);
					O = e.installedSubstituteFamilies;
					let t = await i(e.names, oe);
					if (l?.aborted) throw r(t), new T();
					C._googleFontFaces = t;
				}
				let k;
				if (C._mode === "main" && o.math && C._document && ae(C._document) && (k = await se(C._document, o.math)), u(), C._mode === "main" && C._document && C._source) {
					let e = C, t = y(C);
					t.services = re(C._source, {
						allowFootnoteContinuation: C._allowFootnoteContinuation,
						fontMetrics: n,
						useGoogleFonts: !!o.useGoogleFonts,
						cjkFallback: d,
						embeddedRoutes: w,
						officeRoutes: Object.values(D.routes),
						googleFaces: C._googleFontFaces,
						installedSubstituteFamilies: O,
						mathResources: k?.records,
						mathDrawables: k?.drawables
					});
					let r = t.services, i = ee(C._source, r, t.defaultCurrentDateMs), a = C._source.fatalParse === null, c = t.activeLayoutOptions;
					if (!c) throw Error("Active layout view was not recorded at load");
					let f = { onProgress: o.onLayoutProgress ? (t) => e._layoutObservers.notify("onLayoutProgress", o.onLayoutProgress, { committedUnits: t }) : void 0 };
					if (a && o.progressiveLayout) {
						let e = i.layoutVariants, t = C, n = new AbortController();
						t._layoutAbort = n;
						let a = Bt(), s = null, l = !0;
						t._layoutCompletion = kt(C._source.bodyLayoutInput, r, c, {
							scheduler: {
								...f,
								signal: n.signal
							},
							onPreview: (n) => {
								if (!l) return;
								let r = s === null, i = jt(s?.pages, n.layout.pages), u = t._replaceMainLayoutPublication(e, c, s, n.layout);
								if (u === null) {
									l = !1;
									return;
								}
								if (s = u, r) t._layoutLifecycle.begin(), J(t, {
									pageCount: n.layout.pages.length,
									exact: n.exact,
									complete: !1
								}), a.resolve();
								else {
									if (!t._isLayoutViewActive(c)) return;
									J(t, {
										pageCount: n.layout.pages.length,
										exact: n.exact,
										complete: !1,
										unchangedPages: i
									}), t._layoutObservers.notify("onLayoutPartial", o.onLayoutPartial, {
										availableUnits: n.layout.pages.length,
										exact: n.exact
									});
								}
							}
						}).then((n) => {
							let r;
							l && (r = jt(s?.pages, n.pages), t._replaceMainLayoutPublication(e, c, s, n) === null && (l = !1)), t._layoutLifecycle.succeed(), J(t, {
								pageCount: t.pageCount,
								exact: !0,
								complete: !0,
								...l && t._isLayoutViewActive(c) && r !== void 0 ? { unchangedPages: r } : {}
							}), t._layoutObservers.notify("onLayoutComplete", o.onLayoutComplete), a.resolve();
						}).catch((e) => {
							if (s === null) {
								a.reject(e);
								return;
							}
							if (e instanceof T) {
								t._layoutLifecycle.succeed();
								return;
							}
							let n = t._layoutLifecycle.fail(e);
							J(t, {
								pageCount: t.pageCount,
								exact: !1,
								complete: !1,
								error: n
							}), t._layoutObservers.notify("onLayoutComplete", o.onLayoutComplete, n);
						}), await a.promise;
					} else if (a && (o.sliceLayout !== !1 || o.onLayoutProgress)) for (;;) {
						u();
						let e = s?.requestedView(), n = e === void 0 ? c : _(o.currentDate, t.defaultCurrentDateMs, e);
						t.activeLayoutOptions = n;
						let a = new AbortController(), d = !1, p = s?.subscribeViewChange(() => {
							let e = s.requestedView();
							d || e === void 0 || e === !0 == (n.showTrackedChanges === !0) || (d = !0, a.abort());
						});
						C._layoutAbort = a;
						try {
							let e = await ie(C._source.bodyLayoutInput, r, n, {
								...f,
								signal: a.signal
							});
							if (u(), d) continue;
							i.layoutVariants.prime(n, e);
							break;
						} catch (e) {
							if (e instanceof T && d && !l?.aborted) continue;
							throw e;
						} finally {
							p?.(), C._layoutAbort = null;
						}
					}
					else i.layoutVariants.layoutFor(c);
				}
				return u(), await C._resourceUsage(o.workerTimeoutMs ?? 1e3).then((e) => v.observeUsage(e), () => void 0), v.checkpoint("model and layout ready"), u(), v.succeed({ pages: C.pageCount }), C;
			} catch (e) {
				throw Te(x, C ? E : void 0), e;
			} finally {
				l?.removeEventListener("abort", E);
			}
		} catch (e) {
			throw v.fail(e), e;
		}
	}
	async _parse(e, t, n = !1, r, i, a, o) {
		if (o) {
			await this._parseProgressively(e, t, n, r, i, a, o);
			return;
		}
		let s = await this._bridge.request((r) => this._mode === "worker" ? {
			type: "parse",
			id: r,
			data: e,
			resourcePolicy: t,
			useGoogleFonts: n,
			allowFootnoteContinuation: this._allowFootnoteContinuation,
			cjkFallback: this._cjkFallback,
			defaultCurrentDateMs: y(this).defaultCurrentDateMs,
			...this._parseViewFields(),
			renderers: a
		} : {
			type: "parse",
			id: r,
			data: e,
			resourcePolicy: t
		}, [e], { timeoutMs: r });
		if ("protocol" in s) throw Error("DOCX parse open returned a pull-protocol response");
		if (this._mode === "worker") if ("usage" in s && s.usage && i?.(s.usage), s.type === "mainThreadVerticalFallback") {
			let e = await O(this._bridge.transport(k), s, {
				timeoutMs: r,
				onUsage: i
			});
			this._source = e.source, this._document = e.document, this._meta = null, this._mode = "main";
		} else this._meta = s.meta;
		else {
			let e = s, t = await O(this._bridge.transport(k), e, {
				timeoutMs: r,
				onUsage: i
			});
			this._source = t.source, this._document = t.document;
		}
		this._review = $(this._meta?.comments ?? this._document?.comments ?? [], this._meta?.revisions ?? this._document?.revisions ?? []);
	}
	_onWorkerLayoutPush(e) {
		if (ye((e, t) => this._worker.postMessage(e, t), e) || !("forId" in e) || e.forId !== this._parseRequestId) return;
		this._rearmParseWatchdog();
		let t = this._progressive;
		if (t?.settled) return;
		if (e.type === "layoutProgress") {
			this._layoutObservers.notify("onLayoutProgress", t?.onProgress, { committedUnits: e.committedPages });
			return;
		}
		if (e.type !== "layoutPartial" || !t) return;
		let n = !t.published || this._isLayoutViewActive(t.layoutOptions);
		if (n && this._applyLayoutPartial(e.partial), t.published) {
			if (!n) return;
			J(this, {
				pageCount: e.partial.pageCount,
				exact: e.partial.exact,
				complete: !1,
				...e.partial.unchangedPages === void 0 ? {} : { unchangedPages: e.partial.unchangedPages }
			}), this._layoutObservers.notify("onLayoutPartial", t.onPartial, {
				availableUnits: e.partial.pageCount,
				exact: e.partial.exact
			});
			return;
		}
		t.published = !0, this._layoutLifecycle.begin(), J(this, {
			pageCount: e.partial.pageCount,
			exact: e.partial.exact,
			complete: !1
		}), t.firstPublication.resolve();
	}
	_applyLayoutPartial(e) {
		let t = e.review ?? this._meta;
		this._meta = {
			pageCount: e.pageCount,
			pageSizes: e.pageSizes,
			bookmarkPages: e.bookmarkPages,
			revisions: t?.revisions ?? [],
			comments: t?.comments ?? [],
			footnotes: t?.footnotes ?? [],
			endnotes: t?.endnotes ?? [],
			commentAnchorRanges: e.commentAnchorRanges,
			revisionAnchorRanges: e.revisionAnchorRanges
		}, e.review && (this._review = $(e.review.comments, e.review.revisions)), this._invalidateLayoutDerivedCaches();
	}
	_onAuthoritativeMeta(e, t) {
		this._clearParseWatchdog();
		let n = this._progressive;
		if (n?.settled) return;
		let r = n !== null && this._meta !== null && this._isLayoutViewActive(n.layoutOptions);
		if (!n || this._isLayoutViewActive(n.layoutOptions) || !this._meta) this._meta = e;
		else {
			let t = this._meta;
			this._meta = {
				...e,
				pageCount: t.pageCount,
				pageSizes: t.pageSizes,
				bookmarkPages: t.bookmarkPages,
				commentAnchorRanges: t.commentAnchorRanges,
				revisionAnchorRanges: t.revisionAnchorRanges
			};
		}
		this._invalidateLayoutDerivedCaches(), this._review = $(e.comments, e.revisions), n && (n.settled = !0, this._layoutLifecycle.succeed(), J(this, {
			pageCount: this.pageCount,
			exact: !0,
			complete: !0,
			...r && t !== void 0 ? { unchangedPages: t } : {}
		}), n.firstPublication.resolve(), this._layoutObservers.notify("onLayoutComplete", n.onComplete));
	}
	_invalidateLayoutDerivedCaches() {
		this._bookmarkPages = null, this._commentAnchorRanges = null, this._revisionAnchorRanges = null, this._reviewProjectionIndex = null;
	}
	_replaceMainLayoutPublication(e, t, n, r) {
		let i = e.replaceIfCurrent(t, n, r);
		return i !== null && this._isLayoutViewActive(t) && this._invalidateLayoutDerivedCaches(), i;
	}
	_isLayoutViewActive(e) {
		return zt(y(this).activeLayoutOptions, e);
	}
	_rearmParseWatchdog() {
		this._parseWatchdogMs !== void 0 && (clearTimeout(this._parseWatchdog), this._parseWatchdog = setTimeout(() => this._onParseWentSilent(), this._parseWatchdogMs));
	}
	_clearParseWatchdog() {
		clearTimeout(this._parseWatchdog), this._parseWatchdog = void 0, this._parseWatchdogMs = void 0;
	}
	_onParseWentSilent() {
		let e = this._progressive, t = this._parseWatchdogMs;
		this._clearParseWatchdog();
		let n = /* @__PURE__ */ Error(`worker layout produced no progress for ${t}ms`);
		e && this._failWorkerProgressive(e, n), this._bridge.terminate();
	}
	_failWorkerProgressive(e, t) {
		if (e.settled) return;
		if (e.settled = !0, this._clearParseWatchdog(), !e.published) {
			e.firstPublication.reject(t);
			return;
		}
		let n = this._layoutLifecycle.fail(t);
		J(this, {
			pageCount: this.pageCount,
			exact: !1,
			complete: !1,
			error: n
		}), this._layoutObservers.notify("onLayoutComplete", e.onComplete, n);
	}
	_parseViewFields() {
		let e = y(this), t = e.activeLayoutOptions;
		return t ? {
			...t.currentDateMs === e.defaultCurrentDateMs ? {} : { currentDateMs: t.currentDateMs },
			...t.showTrackedChanges === !0 ? { showTrackedChanges: !0 } : {}
		} : {};
	}
	async _parseProgressively(e, t, n, r, i, a, o) {
		this._progressive = o, this._layoutAbort = o.abort, this._parseWatchdogMs = r, this._layoutCompletion = this._bridge.request((r) => (this._parseRequestId = r, {
			type: "parse",
			id: r,
			data: e,
			resourcePolicy: t,
			useGoogleFonts: n,
			allowFootnoteContinuation: this._allowFootnoteContinuation,
			cjkFallback: this._cjkFallback,
			defaultCurrentDateMs: y(this).defaultCurrentDateMs,
			...this._parseViewFields(),
			renderers: a,
			progressiveLayout: !0
		}), [e], { timeoutMs: !1 }).then(async (e) => {
			if (this._parseRequestId = null, "protocol" in e) throw Error("DOCX parse open returned a pull-protocol response");
			if ("usage" in e && e.usage && i?.(e.usage), e.type === "mainThreadVerticalFallback") {
				this._clearParseWatchdog(), o.settled = !0, this._progressive = null, this._layoutAbort = null;
				let t = await O(this._bridge.transport(k), e, {
					timeoutMs: r,
					onUsage: i
				});
				this._source = t.source, this._document = t.document, this._meta = null, this._mode = "main", this._review = $(t.document.comments ?? [], t.document.revisions ?? []), o.firstPublication.resolve();
				return;
			}
			let t = e;
			this._onAuthoritativeMeta(t.meta, t.unchangedPages);
		}, (e) => {
			if (this._parseRequestId = null, this._clearParseWatchdog(), !o.settled) {
				if (o.abort.signal.aborted) {
					o.settled = !0, this._layoutLifecycle.succeed(), o.firstPublication.resolve();
					return;
				}
				this._failWorkerProgressive(o, e);
			}
		}), this._rearmParseWatchdog(), await o.firstPublication.promise;
	}
	destroy() {
		this._layoutAbort?.abort(), this._layoutAbort = null, this._clearParseWatchdog(), this._parseRequestId = null, this._progressive = null, this._layoutViewGeneration++, this._bridge.terminate(), this._document = null, this._source = null, this._meta = null, this._review = Ht, y(this).services = null, this._bookmarkPages = null, this._commentAnchorRanges = null, this._revisionAnchorRanges = null, this._reviewProjectionIndex = null, this._rawParts.clear(), this._embeddedFontFaces.length > 0 && (c(this._embeddedFontFaces), this._embeddedFontFaces = []), this._officeFontFaces.length > 0 && (p(this._officeFontFaces), this._officeFontFaces = []), this._googleFontFaces.length > 0 && (r(this._googleFontFaces), this._googleFontFaces = []), he(this._fetchImage), me(this._fetchImage);
	}
	async getImage(e, t) {
		return this._rawParts.get(e, t, () => this._bridge.request((t) => ({
			type: "extractImage",
			id: t,
			path: e
		})).then((e) => {
			let n = e.bytes;
			return new Blob([n], { type: t });
		}));
	}
	async getFontBytes(e) {
		let t = (await this._bridge.request((t) => ({
			type: "extractImage",
			id: t,
			path: e
		}))).bytes;
		return new Uint8Array(t);
	}
	async _resourceUsage(e) {
		return (await this._bridge.request((e) => ({
			type: "resourceUsage",
			id: e
		}), void 0, { timeoutMs: e })).usage;
	}
	async getResourceMetrics() {
		let e = this._metrics;
		if (!e) throw Error("Document not loaded");
		return Ce(e, (e) => this._resourceUsage(e));
	}
	async toMarkdown() {
		return (await this._bridge.request((e) => ({
			type: "toMarkdown",
			id: e
		}))).markdown;
	}
	get pageCount() {
		return this._meta ? this._meta.pageCount : this._document ? this._getLayout()?.pages.length ?? 0 : 0;
	}
	get layoutComplete() {
		return this._layoutLifecycle.complete;
	}
	async waitUntilLayoutComplete() {
		this._layoutCompletion && await this._layoutCompletion, this._layoutLifecycle.throwIfFailed();
	}
	get mode() {
		return this._mode;
	}
	get document() {
		if (this._meta && !this._document) throw Error("the raw document model stays in the worker in mode: 'worker'; use mode: 'main' if you need direct model access");
		if (!this._document) throw Error("Document not loaded");
		return this._document;
	}
	get comments() {
		return this._reviewSnapshot().comments;
	}
	get revisions() {
		return this._reviewSnapshot().revisions;
	}
	commentAnchorRanges() {
		if (this._meta) return this._meta.commentAnchorRanges ?? Q;
		if (!this._document || !this._source) return [];
		let e = this._reviewSnapshot().comments;
		if (e.length === 0) return Q;
		let t = y(this), n = t.services;
		if (!n) throw Error("Document layout services are not initialized");
		let r = D(n);
		if (!r) throw Error("Document layout variant store is not initialized");
		let i = t.activeLayoutOptions, a = i ? r.layoutFor(i) : r.defaultLayout;
		this._reviewProjectionIndex ??= ue(a);
		let o = this._layoutLifecycle?.complete ?? !0 ? void 0 : { completedSourceKeys: this._reviewProjectionIndex.completedSourceKeys };
		return this._commentAnchorRanges ??= ke(e, this._source, this._reviewProjectionIndex.renderedRunIndex, o), this._commentAnchorRanges;
	}
	revisionAnchorRanges() {
		if (this._meta) return this._meta.revisionAnchorRanges ?? Vt;
		if (!this._document || !this._source) return [];
		let e = this._reviewSnapshot().revisions;
		if (e.length === 0) return Vt;
		let t = y(this), n = t.services;
		if (!n) throw Error("Document layout services are not initialized");
		let r = D(n);
		if (!r) throw Error("Document layout variant store is not initialized");
		let i = t.activeLayoutOptions, a = i ? r.layoutFor(i) : r.defaultLayout;
		this._reviewProjectionIndex ??= ue(a);
		let o = this._layoutLifecycle?.complete ?? !0 ? void 0 : { completedSourceKeys: this._reviewProjectionIndex.completedSourceKeys };
		return this._revisionAnchorRanges ??= Et(e, this._source, this._reviewProjectionIndex.renderedRunIndex, o), this._revisionAnchorRanges;
	}
	_reviewSnapshot() {
		return this._review ||= $(this._meta?.comments ?? this._document?.comments ?? [], this._meta?.revisions ?? this._document?.revisions ?? []), this._review;
	}
	get footnotes() {
		return this._meta?.footnotes ?? this._document?.footnotes ?? [];
	}
	get endnotes() {
		return this._meta?.endnotes ?? this._document?.endnotes ?? [];
	}
	_getLayout() {
		if (!this._document) return null;
		let e = y(this), t = e.services;
		if (!t) throw Error("Document layout services are not initialized");
		let n = D(t);
		if (!n) throw Error("Document layout variant store is not initialized");
		let r = e.activeLayoutOptions;
		return r ? n.layoutFor(r) : n.defaultLayout;
	}
	async setLayoutView(e = {}) {
		let t = e[Nt], n = y(this), r = _(e.currentDate, n.defaultCurrentDateMs, e.showTrackedChanges === !0), i = ++this._layoutViewGeneration, a = n.activeLayoutOptions;
		if (!zt(a, r)) {
			if (this._mode === "worker" && this._meta) {
				let e = await this._bridge.request((e) => ({
					type: "selectLayoutView",
					id: e,
					currentDateMs: r.currentDateMs,
					showTrackedChanges: r.showTrackedChanges === !0
				}));
				if (i !== this._layoutViewGeneration) return;
				let a = e;
				n.activeLayoutOptions = r, this._meta = {
					...this._meta,
					...a.meta
				}, this._invalidateLayoutDerivedCaches(), It(this, t);
				return;
			}
			n.activeLayoutOptions = r, this._invalidateLayoutDerivedCaches(), It(this, t);
		}
	}
	_getBookmarkPages() {
		if (this._bookmarkPages) return this._bookmarkPages;
		if (this._meta) return this._bookmarkPages = new Map(this._meta.bookmarkPages), this._bookmarkPages;
		let e = this._getLayout();
		return e ? (this._bookmarkPages = Ze(e), this._bookmarkPages) : null;
	}
	getBookmarkPage(e) {
		return this._getBookmarkPages()?.get(e);
	}
	pageSize(e) {
		if (this._meta) {
			let t = this._meta.pageSizes, n = t[Math.max(0, Math.min(e, t.length - 1))];
			return n ? {
				widthPt: n.widthPt,
				heightPt: n.heightPt
			} : {
				widthPt: 0,
				heightPt: 0
			};
		}
		if (!this._document) return {
			widthPt: 0,
			heightPt: 0
		};
		let t = this._getLayout();
		if (!t || t.pages.length === 0) return {
			widthPt: 0,
			heightPt: 0
		};
		let n = Math.max(0, Math.min(e, t.pages.length - 1)), r = t.pages[n].geometry;
		return {
			widthPt: r.widthPt,
			heightPt: r.heightPt
		};
	}
	_withActiveView(e) {
		let t = y(this).activeLayoutOptions;
		if (!t) return e;
		let n = { ...e };
		return e.currentDate === void 0 && (n.currentDate = t.currentDateMs), e.showTrackedChanges === void 0 && t.showTrackedChanges === !0 && (n.showTrackedChanges = !0), n;
	}
	renderPage(e, t, n = {}) {
		if (this._mode === "worker") throw Error("renderPage(canvas) is unavailable in mode: 'worker'; use renderPageToBitmap() and paint it via an ImageBitmapRenderingContext");
		if (!this._source) throw Error("Document not loaded");
		return C(this._source, e, t, {
			...this._withActiveView(n),
			fetchImage: this._fetchImage,
			layoutServices: y(this).services ?? void 0,
			defaultCurrentDateMs: y(this).defaultCurrentDateMs,
			threeD: this._threeD,
			regionMap: this._regionMap,
			chartEx: this._chartEx,
			tiff: this._tiff
		});
	}
	async renderPageToBitmap(e, t = {}) {
		let { onTextRun: n, ...r } = t, i = {
			...this._withActiveView(r),
			dpr: r.dpr ?? d()
		};
		if (this._mode === "worker") {
			let t = new OffscreenCanvas(1, 1), r = await this._bridge.request((n) => ({
				type: "renderPage",
				id: n,
				pageIndex: e,
				opts: i,
				canvas: t
			}), [t]);
			try {
				if (n) for (let e of r.runs) n(e);
			} catch (e) {
				throw pe(r.bitmap), e;
			}
			return r.bitmap;
		}
		let a = new OffscreenCanvas(1, 1);
		return await this.renderPage(a, e, {
			...i,
			onTextRun: n
		}), a.transferToImageBitmap();
	}
	async collectPageRuns(e, t = {}) {
		let n = { ...this._withActiveView(t) };
		if (this._mode === "worker") return (await this._bridge.request((t) => ({
			type: "collectRuns",
			id: t,
			pageIndex: e,
			opts: n
		}))).runs;
		let r = y(this), i = r.services;
		if (!i) throw Error("Document layout services are not initialized");
		return de(i, e, {
			currentDate: n.currentDate,
			defaultCurrentDateMs: r.defaultCurrentDateMs,
			width: n.width,
			showTrackedChanges: n.showTrackedChanges
		});
	}
	async getCommentThreads(e, t = {}) {
		let { includeResolved: n, ...r } = t, i = await this.collectPageRuns(e, r);
		return Oe(this.comments, this.commentAnchorRanges(), i, { includeResolved: n });
	}
	async getElementContextAt(e, t, n = {}) {
		let r = this._withActiveView(n);
		if (this._mode === "worker") return (await this._bridge.request((n) => ({
			type: "hitTestElement",
			id: n,
			pageIndex: e,
			point: t,
			opts: r
		}))).context;
		let i = y(this), a = i.services;
		if (!a) throw Error("Document layout services are not initialized");
		return xt(a, e, t, {
			...r,
			defaultCurrentDateMs: i.defaultCurrentDateMs
		});
	}
};
//#endregion
export { Pt as a, At as c, ot as d, St as f, Ft as i, kt as l, Rt as n, Lt as o, rt as p, Z as r, J as s, Ut as t, Dt as u };
