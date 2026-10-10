import { o as e, s as t, u as n } from "./pixel-budget-QcsXr21f.js";
import { C as r } from "./blip-gate-CVWM87j6.js";
//#region packages/core/src/worker/bridge.ts
function i() {
	let e = /* @__PURE__ */ Error("worker request aborted");
	return e.name = "AbortError", e;
}
var a = class {
	_worker;
	_opts;
	_pending = /* @__PURE__ */ new Map();
	_orphaned = /* @__PURE__ */ new Map();
	_nextId = 1;
	_terminated = !1;
	_failure;
	constructor(e, t) {
		this._worker = e, this._opts = t, this._worker.addEventListener("message", this._handle), this._worker.addEventListener("messageerror", this._handleWorkerError), this._worker.addEventListener("error", this._handleWorkerError);
	}
	_handle = (e) => {
		let t = e.data, n = this._opts.correlate(t);
		if (n === void 0) {
			this._opts.onUnsolicited?.(t);
			return;
		}
		let r = this._pending.get(n);
		if (!r) {
			try {
				let e = this._orphaned.get(n);
				e ? (this._orphaned.delete(n), e(t)) : this._opts.onOrphanedResponse?.(t);
			} catch {}
			return;
		}
		this._pending.delete(n), r.cleanup();
		let i = this._opts.toError?.(t);
		i === void 0 ? r.resolve(t) : r.reject(i instanceof Error ? i : Error(i));
	};
	_handleWorkerError = (e) => {
		let t = "message" in e && e.message ? `: ${e.message}` : "", n = e.type === "error" && !t && globalThis.origin === "null" ? ": this page has an opaque origin; a sandboxed iframe without allow-same-origin can block Worker loading" : "";
		this._failure ??= /* @__PURE__ */ Error(`Worker error${t}${n}`), this._rejectAll(this._failure);
	};
	_rejectAll(e) {
		let t = [...this._pending.values()];
		this._pending.clear();
		for (let n of t) n.cleanup(), n.reject(e);
	}
	nextId() {
		return this._nextId++;
	}
	request(e, t, n) {
		let r = this._nextId++, a = n?.timeoutMs === !1 ? void 0 : n?.timeoutMs ?? this._opts.timeoutMs, o = n?.signal, s = (e) => {
			try {
				n?.onCancel?.(r, e);
			} catch {}
		};
		return new Promise((c, l) => {
			if (this._terminated) {
				l(/* @__PURE__ */ Error("Worker terminated"));
				return;
			}
			if (this._failure) {
				l(this._failure);
				return;
			}
			if (o?.aborted) {
				s("abort"), l(i());
				return;
			}
			let u, d;
			this._pending.set(r, {
				resolve: c,
				reject: l,
				cleanup: () => {
					u !== void 0 && (clearTimeout(u), u = void 0), d && o && (o.removeEventListener("abort", d), d = void 0);
				},
				onOrphanedResponse: n?.onOrphanedResponse
			}), a !== void 0 && (u = setTimeout(() => {
				let e = this._pending.get(r);
				e && (this._pending.delete(r), e.onOrphanedResponse && this._orphaned.set(r, e.onOrphanedResponse), e.cleanup(), s("timeout"), e.reject(/* @__PURE__ */ Error(`worker request timed out after ${a}ms`)));
			}, a)), o && (d = () => {
				let e = this._pending.get(r);
				e && (this._pending.delete(r), e.onOrphanedResponse && this._orphaned.set(r, e.onOrphanedResponse), e.cleanup(), s("abort"), e.reject(i()));
			}, o.addEventListener("abort", d));
			try {
				this._worker.postMessage(e(r), t);
			} catch (e) {
				let t = this._pending.get(r);
				if (!t) return;
				this._pending.delete(r), t.cleanup(), t.reject(e instanceof Error ? e : Error(String(e)));
			}
		});
	}
	transport(e) {
		return {
			request: (t, n, r) => this.request(t, n, {
				...r,
				onOrphanedResponse: r?.onOrphanedResponse ? (t) => {
					e(t) && r.onOrphanedResponse?.(t);
				} : void 0
			}).then((t) => {
				if (!e(t)) throw Error("worker response does not match the selected transport");
				return t;
			}),
			forgetOrphaned: (e) => this.forgetOrphaned(e),
			terminate: () => this.terminate()
		};
	}
	post(e, t) {
		this._worker.postMessage(e, t);
	}
	forgetOrphaned(e) {
		for (let t of e) this._orphaned.delete(t);
	}
	get orphanedRequestCount() {
		return this._orphaned.size;
	}
	terminate() {
		this._terminated || (this._terminated = !0, this._worker.removeEventListener("message", this._handle), this._worker.removeEventListener("messageerror", this._handleWorkerError), this._worker.removeEventListener("error", this._handleWorkerError), this._worker.terminate(), this._rejectAll(/* @__PURE__ */ Error("Worker terminated")), this._orphaned.clear());
	}
};
//#endregion
//#region packages/core/src/worker/svg-decode-bridge.ts
function o(e) {
	return typeof e == "number" && Number.isFinite(e) && e > 0 ? Math.ceil(e) : void 0;
}
function s(n, r) {
	if (!Number.isFinite(n) || !Number.isFinite(r) || !(n > 0) || !(r > 0)) throw Error(`invalid SVG raster size: ${n}x${r}`);
	let i = Math.sqrt(t) / Math.sqrt(n) / Math.sqrt(r), a = Math.min(1, e / n, e / r, i);
	return {
		width: Math.min(e, Math.max(1, Math.floor(n * a))),
		height: Math.min(e, Math.max(1, Math.floor(r * a)))
	};
}
function c(n, r, i, a) {
	let o = i === void 0 ? 0 : i / n, c = a === void 0 ? 0 : a / r, l = i === void 0 && a === void 0 ? 1 : Math.max(o, c), u = Math.min(e / n, e / r, Math.sqrt(t) / Math.sqrt(n) / Math.sqrt(r));
	if (!Number.isFinite(l) || !(l > 0) || !Number.isFinite(u) || !(u > 0)) throw Error(`invalid SVG raster scale: ${Math.min(l, u)}`);
	return u < l ? s(Math.max(1, Math.floor(n * u)), Math.max(1, Math.floor(r * u))) : i !== void 0 && o >= c ? s(i, Math.max(1, Math.ceil(r * i / n))) : a === void 0 ? s(Math.ceil(n), Math.ceil(r)) : s(Math.max(1, Math.ceil(n * a / r)), a);
}
async function l(e, i = {}) {
	if (typeof Image > "u") throw Error("SVG host decode requires HTMLImageElement");
	let a = URL.createObjectURL(e);
	try {
		let e = new Image(), s = o(i.targetWidthPx), l = o(i.targetHeightPx);
		await new Promise((t, n) => {
			e.onload = () => {
				typeof e.decode == "function" ? e.decode().then(t).catch(t) : t();
			}, e.onerror = () => n(/* @__PURE__ */ Error("SVG host decode failed")), e.src = a;
		});
		let u = Number.isFinite(e.naturalWidth) && e.naturalWidth > 0 && Number.isFinite(e.naturalHeight) && e.naturalHeight > 0, d = c(u ? e.naturalWidth : 300, u ? e.naturalHeight : 150, s, l);
		e.width = d.width, e.height = d.height;
		let f;
		if (typeof OffscreenCanvas < "u") {
			let t = new OffscreenCanvas(d.width, d.height), n = t.getContext("2d");
			if (!n) throw Error("SVG host raster target has no 2-D context");
			n.drawImage(e, 0, 0, d.width, d.height), f = t.transferToImageBitmap();
		} else {
			let t = document.createElement("canvas");
			t.width = d.width, t.height = d.height;
			let n = t.getContext("2d");
			if (!n) throw Error("SVG host raster target has no 2-D context");
			n.drawImage(e, 0, 0, d.width, d.height), f = await createImageBitmap(t);
		}
		let p = f.width * f.height;
		if (f.width > 32767 || f.height > 32767 || p > 33554432) throw r(f), new n("image-pixels", t, p);
		return f;
	} finally {
		URL.revokeObjectURL(a);
	}
}
function u(e) {
	return !!e && typeof e == "object" && e.kind === "ooxmlDecodeSvg";
}
function d(e, t) {
	return u(t) ? (l(new Blob([t.bytes], { type: "image/svg+xml" }), t).then((n) => {
		try {
			e({
				kind: "ooxmlSvgDecoded",
				decodeId: t.decodeId,
				bitmap: n
			}, [n]);
		} catch {
			r(n);
		}
	}).catch((n) => {
		try {
			e({
				kind: "ooxmlSvgDecodeFailed",
				decodeId: t.decodeId,
				message: n instanceof Error ? n.message : String(n)
			});
		} catch {}
	}), !0) : !1;
}
//#endregion
//#region packages/core/src/internal/chart-context.ts
var f = 65536;
function p(e, t) {
	let n = Math.min(e.length, t);
	if (n > 0 && n < e.length) {
		let t = e.charCodeAt(n - 1), r = e.charCodeAt(n);
		t >= 55296 && t <= 56319 && r >= 56320 && r <= 57343 && n--;
	}
	return e.slice(0, n);
}
function m(e) {
	let t = e ?? 16384;
	if (!Number.isFinite(t) || t < 0) throw RangeError("maxTextCharacters must be a finite non-negative number.");
	return Math.min(f, Math.floor(t));
}
function h(e, t) {
	let n = m(t), r = [], i = 0, a = !1, o = !1, s = (e, t) => {
		if (t && o) {
			if (i >= n) return a = !0, !1;
			r.push("\n"), i++;
		}
		o = !0;
		let s = p(e, Math.max(0, n - i));
		return r.push(s), i += s.length, s.length < e.length ? (a = !0, !1) : !0;
	};
	if (!s(`Chart type: ${e.chartType}`, !0) || e.title !== null && !s(`Title: ${e.title}`, !0)) return {
		text: r.join(""),
		truncated: a,
		textCharacters: i,
		maxTextCharacters: n
	};
	if (e.categories.length > 0) {
		if (!s("Categories: ", !0)) return {
			text: r.join(""),
			truncated: a,
			textCharacters: i,
			maxTextCharacters: n
		};
		for (let [t, o] of e.categories.entries()) if (!s(`${t === 0 ? "" : ", "}${o}`, !1)) return {
			text: r.join(""),
			truncated: a,
			textCharacters: i,
			maxTextCharacters: n
		};
	}
	for (let t of e.series) {
		if (!s(`Series ${t.name || "(unnamed)"}: `, !0)) break;
		for (let [e, o] of t.values.entries()) if (!s(`${e === 0 ? "" : ", "}${o === null ? "" : o}`, !1)) return {
			text: r.join(""),
			truncated: a,
			textCharacters: i,
			maxTextCharacters: n
		};
		if (a) break;
	}
	return {
		text: r.join(""),
		truncated: a,
		textCharacters: i,
		maxTextCharacters: n
	};
}
//#endregion
export { a as i, h as n, d as r, f as t };
