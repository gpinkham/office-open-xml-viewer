import { i as e } from "./resource-policy.generated-BTdyyO9v.js";
import { a as t, n, o as r, s as i } from "./preload-Dufqb9J3.js";
//#region packages/core/src/fonts/embedded.ts
function a(t, n = e) {
	return t.byteLength > 0 && t.byteLength <= n;
}
function o(e, t) {
	let n = s(t), r = e.slice(), i = Math.min(32, r.length);
	for (let e = 0; e < i; e++) r[e] ^= n[e % 16];
	return r;
}
function s(e) {
	let t = e.replace(/[{}\-\s]/g, "");
	if (t.length !== 32 || /[^0-9a-fA-F]/.test(t)) throw Error(`invalid fontKey GUID: ${e}`);
	let n = new Uint8Array(16);
	for (let e = 0; e < 16; e++) n[e] = parseInt(t.slice(e * 2, e * 2 + 2), 16);
	return n.reverse();
}
function c(e, t, n, r) {
	let i = 2166136261;
	for (let e = 0; e < r.length; e++) i ^= r[e], i = Math.imul(i, 16777619);
	return `${e}|${t}|${n}|${r.length}|${(i >>> 0).toString(16)}`;
}
async function l(s, l = e) {
	let u = n();
	if (!u || typeof FontFace > "u") return [];
	let d = [], f = /* @__PURE__ */ new Set(), p = [];
	for (let e of s) try {
		if (!a(e.bytes, l)) {
			p.push(e.family);
			continue;
		}
		let t = e.odttf ? o(e.bytes, e.fontKey ?? "") : e.bytes, n = `embedded:${c(e.family, e.weight, e.style, t)}`;
		if (f.has(n)) continue;
		f.add(n);
		let { face: r } = i(n, u, () => {
			let n = t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength), r = new FontFace(e.family, n, {
				weight: e.weight,
				style: e.style
			});
			return u.add(r), r;
		});
		d.push(r);
	} catch {
		p.push(e.family);
	}
	let m = d;
	if (d.length > 0) {
		let e = await t(Promise.allSettled(d.map((e) => Promise.resolve().then(() => e.load()))));
		Array.isArray(e) ? (m = [], e.forEach((e, t) => {
			let n = d[t];
			e.status === "fulfilled" ? m.push(n) : (p.push(n.family), r([n]));
		})) : (p.push(...d.map((e) => e.family)), r(d), m = []);
	}
	return p.length > 0 && console.warn(`[ooxml] failed to register embedded font(s): ${[...new Set(p)].join(", ")}; falling back to substitute fonts (text may shift or differ).`), m;
}
function u(e) {
	r(e);
}
//#endregion
//#region packages/core/src/internal/progressive-layout-lifecycle.ts
var d = class {
	state = Object.freeze({ status: "complete" });
	get complete() {
		return this.state.status === "complete";
	}
	get settled() {
		return this.state.status !== "pending";
	}
	begin() {
		this.state = Object.freeze({ status: "pending" });
	}
	succeed() {
		this.state = Object.freeze({ status: "complete" });
	}
	fail(e) {
		let t = e instanceof Error ? e : Error(String(e));
		return this.state = Object.freeze({
			status: "failed",
			error: t
		}), t;
	}
	throwIfFailed() {
		if (this.state.status === "failed") throw this.state.error;
	}
}, f = class {
	failed = /* @__PURE__ */ new WeakMap();
	notify(e, t, ...n) {
		if (!(!t || this.failed.get(t)?.has(e))) try {
			let r = t(...n);
			r && typeof r.then == "function" && Promise.resolve(r).catch((n) => this.reportOnce(e, t, n));
		} catch (n) {
			this.reportOnce(e, t, n);
		}
	}
	reportOnce(e, t, n) {
		let r = this.failed.get(t) ?? /* @__PURE__ */ new Set();
		if (r.has(e)) return;
		r.add(e), this.failed.has(t) || this.failed.set(t, r);
		let i = n instanceof Error ? n : Error(String(n));
		console.error(`[ooxml] ${e} callback failed and was disabled:`, i);
	}
};
//#endregion
export { l as a, a as i, d as n, u as o, o as r, f as t };
