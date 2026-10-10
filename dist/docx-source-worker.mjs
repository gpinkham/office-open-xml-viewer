//#region packages/core/src/worker/wasm-guard.ts
function e(e) {
	let t = globalThis.WebAssembly?.RuntimeError;
	return t && e instanceof t || e instanceof RangeError ? !0 : e instanceof Error ? e.name === "RuntimeError" || e.name === "CompileError" || e.name === "LinkError" || e.name === "InternalError" || e.name === "OOMError" : !1;
}
//#endregion
//#region packages/core/src/source/model-source.ts
var t = "ooxml-model-source-module/v1", n = new Set([
	"docx",
	"xlsx",
	"pptx"
]), r = new Set([
	"http:",
	"https:",
	"file:",
	"blob:"
]), i = [
	"protocol",
	"target",
	"moduleUrl",
	"config"
], a = 8192, o = 32, s = 8192, c = 16, l = /^[A-Za-z][A-Za-z0-9_]{0,63}$/;
function u(e) {
	if (!(e instanceof Uint8Array)) throw TypeError("model source archive must return Uint8Array bytes");
	let t = new Uint8Array(e.byteLength);
	return t.set(e), t.buffer;
}
function d(e, o) {
	if (typeof e != "object" || !e || Array.isArray(e)) throw TypeError("model source module descriptor must be an object");
	let s = Reflect.ownKeys(e);
	if (s.length !== i.length || i.some((e) => !s.includes(e))) throw TypeError("model source module descriptor has unknown or missing fields");
	let c = Object.getOwnPropertyDescriptors(e);
	if (i.some((e) => !c[e]?.enumerable || !("value" in c[e]))) throw TypeError("model source module descriptor fields must be data properties");
	let l = c.protocol.value, u = c.target.value, d = c.moduleUrl.value;
	if (l !== "ooxml-model-source-module/v1") throw TypeError("unsupported model source module protocol");
	if (typeof u != "string" || !n.has(u)) throw TypeError("unsupported model source target");
	if (o !== void 0 && u !== o) throw TypeError(`a ${u} model source module cannot load ${o} input`);
	if (typeof d != "string" || d.length === 0 || d.length > a || d.trim() !== d) throw TypeError("model source moduleUrl must be a nonempty absolute URL");
	let p;
	try {
		p = new URL(d);
	} catch {
		throw TypeError("model source moduleUrl must be a nonempty absolute URL");
	}
	if (!r.has(p.protocol)) throw TypeError("model source moduleUrl protocol is unsupported");
	return Object.freeze({
		protocol: t,
		target: u,
		moduleUrl: d,
		config: f(c.config.value)
	});
}
function f(e) {
	if (!v(e)) throw TypeError("model source config must be a plain object");
	let t = Reflect.ownKeys(e);
	if (t.length > o) throw RangeError(`model source config accepts at most ${o} entries`);
	let n = {};
	for (let r of t) {
		if (typeof r != "string" || !l.test(r)) throw TypeError("model source config keys must be short identifiers");
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
async function p(e, t, n, r, i = []) {
	let a = d(e);
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
	let f = !1, p = () => {
		f || (f = !0, u.call(c));
	};
	try {
		let e = n(l.archive), t = m(l.viewDefaults);
		return y(r), Object.freeze({
			archive: e,
			viewDefaults: t,
			close: p
		});
	} catch (e) {
		try {
			p();
		} catch {}
		throw e;
	}
}
function m(e) {
	if (e === void 0) return Object.freeze({});
	if (!v(e)) throw TypeError("model source viewDefaults must be a plain object");
	let t = Reflect.ownKeys(e);
	if (t.length > c) throw RangeError("model source viewDefaults has too many entries");
	let n = {};
	for (let r of t) {
		let t = typeof r == "string" ? Object.getOwnPropertyDescriptor(e, r) : void 0;
		if (typeof r != "string" || !l.test(r) || !t?.enumerable || !("value" in t) || typeof t.value != "boolean") throw TypeError("model source viewDefaults entries must be boolean data properties");
		n[r] = t.value;
	}
	return Object.freeze(n);
}
function h(e, t, n) {
	if (typeof e != "object" && typeof e != "function" || e === null) throw TypeError(`${t} model source archive must be an object`);
	for (let r of n) if (typeof e[r] != "function") throw TypeError(`${t} model source archive must implement ${r}()`);
}
function g(e, t) {
	return (typeof e == "object" || typeof e == "function") && e !== null && typeof e[t] == "function";
}
function _(e) {
	return /* @__PURE__ */ Error(`${e} is unsupported for this source`);
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
//#region packages/docx/src/internal/worker-document-source.ts
var b = [
	"open_document_cursor",
	"pull_document_chunk",
	"document_chunk_done",
	"acknowledge_document_chunk",
	"cancel_document_cursor",
	"close_document_session",
	"assert_healthy",
	"extract_image"
];
function x(e) {
	return h(e, "DOCX", b), e;
}
function S(e) {
	for (let t of Object.keys(e)) if (t !== "showTrackedChanges") throw TypeError(`unsupported DOCX model source view default: ${t}`);
	return e.showTrackedChanges === void 0 ? {} : { showTrackedChanges: e.showTrackedChanges };
}
var C = (e, t, n) => p(e, t, x, void 0, n), w = class {
	modelSource;
	pending;
	copyBytes(e) {
		return u(e);
	}
	extractImage(e) {
		return this.execute((t) => this.copyBytes(t.extract_image(e)));
	}
	constructor(e, t = C) {
		this.ooxmlHost = e, this.openSource = t;
	}
	get kind() {
		return this.modelSource ? "model-source" : "ooxml";
	}
	async openModelSource(e, t, n = []) {
		if (this.modelSource || this.pending || this.ooxmlHost.archive) throw Error("Document source already loaded or opening");
		let r = {};
		this.pending = r;
		try {
			let i = await this.openSource(t, e, n), a;
			try {
				if (a = S(i.viewDefaults), this.pending !== r || this.ooxmlHost.archive) throw Error("Document source open was superseded");
			} catch (e) {
				try {
					i.close();
				} catch {}
				throw e;
			}
			let o = new Proxy(i.archive, { get(e, t) {
				if (t === "pull_document_chunk") return (...t) => new Uint8Array(u(e.pull_document_chunk(...t)));
				let n = Reflect.get(e, t);
				return typeof n == "function" ? n.bind(e) : n;
			} });
			return this.modelSource = {
				archive: i.archive,
				transferArchive: o,
				viewDefaults: a,
				close: i.close
			}, a;
		} finally {
			this.pending === r && (this.pending = void 0);
		}
	}
	get viewDefaults() {
		return this.modelSource?.viewDefaults ?? {};
	}
	cursor() {
		return this.modelSource?.archive ?? this.ooxmlHost.archive;
	}
	execute(t) {
		let n = this.modelSource;
		if (!n) {
			let e = this.ooxmlHost.archive;
			if (!e) throw Error("Document not loaded");
			return this.ooxmlHost.run(() => t(e));
		}
		try {
			return t(n.transferArchive);
		} catch (t) {
			if (e(t) && this.modelSource === n) try {
				this.closeModelSource();
			} catch {}
			throw t;
		}
	}
	resourceUsage() {
		let e = this.modelSource;
		if (e) return g(e.archive, "resource_usage") ? this.execute(() => e.archive.resource_usage()) : void 0;
		let t = this.ooxml();
		return this.ooxmlHost.run(() => t.resource_usage());
	}
	toMarkdown() {
		let e = this.modelSource;
		if (e) {
			if (!g(e.archive, "to_markdown")) throw _("Markdown conversion");
			return this.execute(() => e.archive.to_markdown());
		}
		let t = this.ooxml();
		return this.ooxmlHost.run(() => t.to_markdown());
	}
	closeModelSource() {
		this.pending = void 0;
		let e = this.modelSource;
		this.modelSource = void 0, e?.close();
	}
	ooxml() {
		let e = this.ooxmlHost.archive;
		if (!e) throw Error("Document not loaded");
		return e;
	}
};
//#endregion
export { w as WorkerDocumentSourceOwner };
