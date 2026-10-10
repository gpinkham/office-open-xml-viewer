//#region packages/core/src/source/model-source.ts
var e = "ooxml-model-source-module/v1", t = new Set([
	"docx",
	"xlsx",
	"pptx"
]), n = new Set([
	"http:",
	"https:",
	"file:",
	"blob:"
]), r = [
	"protocol",
	"target",
	"moduleUrl",
	"config"
], i = 16, a = 8192, o = 32, s = 8192, c = 16, l = 32, u = /^[A-Za-z][A-Za-z0-9_]{0,63}$/;
function d(e, t, n) {
	if (e !== void 0) {
		if (!Array.isArray(e)) throw TypeError("modelSources must be an array");
		if (e.length > i) throw RangeError(`modelSources accepts at most ${i} sources`);
		for (let r of e) {
			if (typeof r != "object" || !r) throw TypeError("each model source must be an object");
			let e = r;
			if (e.target !== t) throw TypeError(`a ${String(e.target)} model source cannot load ${t} input`);
			if (typeof e.claim != "function" || typeof e.beginLoad != "function") throw TypeError("a model source must implement claim() and beginLoad()");
			let i = e.claim(n);
			if (typeof i != "boolean") throw TypeError("model source claim() must return a boolean");
			if (i) return e;
		}
	}
}
function f(e, t) {
	let n = e.beginLoad();
	if (typeof n != "object" || !n) throw TypeError("model source beginLoad() must return an object");
	let r = n, i = r.release;
	if (typeof i != "function") throw TypeError("model source load must provide release()");
	let a = !1, o = () => {
		a || (a = !0, i.call(n));
	};
	try {
		let e = p(r.module, t), n = r.transfer === void 0 ? [] : r.transfer;
		if (!Array.isArray(n)) throw TypeError("model source load transfer must be an array");
		if (n.length > l) throw RangeError(`model source load transfer accepts at most ${l} items`);
		let i = /* @__PURE__ */ new Set();
		for (let e of n) {
			if (!(e instanceof ArrayBuffer) && !(typeof MessagePort < "u" && e instanceof MessagePort) && !(typeof ImageBitmap < "u" && e instanceof ImageBitmap) && !(typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas)) throw TypeError("model source load transfer contains an unsupported item");
			if (i.has(e)) throw TypeError("model source load transfer contains a duplicate item");
			i.add(e);
		}
		return Object.freeze({
			module: e,
			transfer: Object.freeze([...n]),
			release: o
		});
	} catch (e) {
		try {
			o();
		} catch {}
		throw e;
	}
}
function p(i, o) {
	if (typeof i != "object" || !i || Array.isArray(i)) throw TypeError("model source module descriptor must be an object");
	let s = Reflect.ownKeys(i);
	if (s.length !== r.length || r.some((e) => !s.includes(e))) throw TypeError("model source module descriptor has unknown or missing fields");
	let c = Object.getOwnPropertyDescriptors(i);
	if (r.some((e) => !c[e]?.enumerable || !("value" in c[e]))) throw TypeError("model source module descriptor fields must be data properties");
	let l = c.protocol.value, u = c.target.value, d = c.moduleUrl.value;
	if (l !== "ooxml-model-source-module/v1") throw TypeError("unsupported model source module protocol");
	if (typeof u != "string" || !t.has(u)) throw TypeError("unsupported model source target");
	if (o !== void 0 && u !== o) throw TypeError(`a ${u} model source module cannot load ${o} input`);
	if (typeof d != "string" || d.length === 0 || d.length > a || d.trim() !== d) throw TypeError("model source moduleUrl must be a nonempty absolute URL");
	let f;
	try {
		f = new URL(d);
	} catch {
		throw TypeError("model source moduleUrl must be a nonempty absolute URL");
	}
	if (!n.has(f.protocol)) throw TypeError("model source moduleUrl protocol is unsupported");
	return Object.freeze({
		protocol: e,
		target: u,
		moduleUrl: d,
		config: m(c.config.value)
	});
}
function m(e) {
	if (!v(e)) throw TypeError("model source config must be a plain object");
	let t = Reflect.ownKeys(e);
	if (t.length > o) throw RangeError(`model source config accepts at most ${o} entries`);
	let n = {};
	for (let r of t) {
		if (typeof r != "string" || !u.test(r)) throw TypeError("model source config keys must be short identifiers");
		let t = Object.getOwnPropertyDescriptor(e, r);
		if (!t?.enumerable || !("value" in t)) throw TypeError("model source config entries must be data properties");
		let i = t.value;
		if (typeof i == "string") {
			if (i.length > s) throw RangeError("model source config string is too long");
		} else if (typeof i == "number") {
			if (!Number.isFinite(i)) throw TypeError("model source config numbers must be finite");
		} else if (typeof i != "boolean" && i !== null) throw TypeError("model source config values must be strings, numbers, booleans or null");
		n[r] = i;
	}
	return Object.freeze(n);
}
async function h(e, t, n, r, i = []) {
	let a = p(e);
	y(r);
	let o = await import(
		/* @vite-ignore */
		a.moduleUrl
), s = typeof o == "object" && o ? o.openModelSource : void 0;
	if (typeof s != "function") throw TypeError("model source module must export openModelSource()");
	y(r);
	let c = await s(t, a.config, r, i);
	if (typeof c != "object" || !c) throw TypeError("openModelSource() must return an object");
	let l = c, u = l.close;
	if (typeof u != "function") throw TypeError("an opened model source must provide close()");
	let d = !1, f = () => {
		d || (d = !0, u.call(c));
	};
	try {
		let e = n(l.archive), t = g(l.viewDefaults);
		return y(r), Object.freeze({
			archive: e,
			viewDefaults: t,
			close: f
		});
	} catch (e) {
		try {
			f();
		} catch {}
		throw e;
	}
}
function g(e) {
	if (e === void 0) return Object.freeze({});
	if (!v(e)) throw TypeError("model source viewDefaults must be a plain object");
	let t = Reflect.ownKeys(e);
	if (t.length > c) throw RangeError("model source viewDefaults has too many entries");
	let n = {};
	for (let r of t) {
		let t = typeof r == "string" ? Object.getOwnPropertyDescriptor(e, r) : void 0;
		if (typeof r != "string" || !u.test(r) || !t?.enumerable || !("value" in t) || typeof t.value != "boolean") throw TypeError("model source viewDefaults entries must be boolean data properties");
		n[r] = t.value;
	}
	return Object.freeze(n);
}
function _(e, t, n) {
	if (typeof e != "object" && typeof e != "function" || e === null) throw TypeError(`${t} model source archive must be an object`);
	for (let r of n) if (typeof e[r] != "function") throw TypeError(`${t} model source archive must implement ${r}()`);
}
function v(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function y(e) {
	if (!e?.aborted) return;
	let t = /* @__PURE__ */ Error("model source load was aborted");
	throw t.name = "AbortError", t;
}
//#endregion
export { d as a, _ as i, f as n, h as r, e as t };
