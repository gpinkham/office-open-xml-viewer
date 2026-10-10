//#region packages/core/src/fonts/font-registry.ts
var e = /* @__PURE__ */ new Map();
function t(t, n, r) {
	let i = e.get(t), a = i?.get(n);
	if (a) return a.refs++, {
		face: a.face,
		isNew: !1
	};
	let o = r(), s = i ?? /* @__PURE__ */ new Map();
	return s.set(n, {
		face: o,
		set: n,
		refs: 1
	}), e.set(t, s), {
		face: o,
		isNew: !0
	};
}
function n(t) {
	let n = /* @__PURE__ */ new Set();
	for (let r of t) if (!n.has(r)) {
		n.add(r);
		for (let [t, n] of e) {
			let i = !1;
			for (let [a, o] of n) if (o.face === r) {
				if (i = !0, o.refs--, o.refs <= 0) {
					try {
						o.set.delete(r);
					} catch {}
					n.delete(a), n.size === 0 && e.delete(t);
				}
				break;
			}
			if (i) break;
		}
	}
}
//#endregion
//#region packages/core/src/fonts/preload.ts
var r = 15e3;
function i(e) {
	return Promise.race([e, new Promise((e) => setTimeout(e, r))]);
}
var a = /* @__PURE__ */ new Map();
function o(e, t) {
	let n = [], r = /@font-face\s*\{([^}]*)\}/g, i;
	for (; i = r.exec(e);) {
		let e = i[1], r = (t) => e.match(RegExp(`(?:^|;|\\n)\\s*${t}\\s*:\\s*([^;]+)`, "i"))?.[1].trim(), a = r("font-family"), o = r("src");
		if (!a || !o) continue;
		let s = t ? o.replace(/url\(\s*(?:(['"])(.*?)\1|([^)]*?))\s*\)/gi, (e, n, r, i) => {
			let a = (r ?? i ?? "").trim();
			if (!a) return e;
			try {
				return `url("${new URL(a, t).href}")`;
			} catch {
				return e;
			}
		}) : o, c = {}, l = r("font-style");
		l && (c.style = l);
		let u = r("font-weight");
		u && (c.weight = u);
		let d = r("font-stretch");
		d && (c.stretch = d);
		let f = r("unicode-range");
		f && (c.unicodeRange = f), n.push({
			family: a.replace(/^['"]|['"]$/g, ""),
			src: s,
			descriptors: c
		});
	}
	return n;
}
function s() {
	return typeof document < "u" && document && document.fonts ? document.fonts : typeof self < "u" && self && "fonts" in self ? self.fonts : null;
}
function c(e, t) {
	let n = t.descriptors;
	return [
		"gfonts",
		e,
		t.family.toLowerCase(),
		n.style ?? "",
		n.weight ?? "",
		n.stretch ?? "",
		n.unicodeRange ?? "",
		t.src
	].join("|");
}
function l(e) {
	if (!e?.trim()) return null;
	let t = [];
	for (let n of e.split(",")) {
		let e = n.trim(), r, i, a = /^U\+([0-9A-F]{1,6})(?:-([0-9A-F]{1,6}))?$/i.exec(e), o = /^U\+([0-9A-F]{0,5})(\?{1,6})$/i.exec(e);
		if (a) r = parseInt(a[1], 16), i = parseInt(a[2] ?? a[1], 16);
		else if (o && o[1].length + o[2].length <= 6) r = parseInt(o[1] + "0".repeat(o[2].length), 16), i = parseInt(o[1] + "F".repeat(o[2].length), 16);
		else return null;
		if (r > i || i > 1114111) return null;
		t.push([r, i]);
	}
	return t;
}
function u(e, t) {
	if (e === null) return !0;
	for (let [n, r] of e) {
		let e = 0, i = t.length;
		for (; e < i;) {
			let r = e + i >>> 1;
			t[r] < n ? e = r + 1 : i = r;
		}
		if (e < t.length && t[e] <= r) return !0;
	}
	return !1;
}
var d = class {
	closed = !1;
	all = !1;
	points = /* @__PURE__ */ new Set();
	urls = /* @__PURE__ */ new Set();
	owned = /* @__PURE__ */ new Map();
	queue = Promise.resolve();
	constructor(e, t = s()) {
		this.map = e, this.fonts = t;
	}
	get faces() {
		return [...this.owned.values()].map((e) => e.face);
	}
	ensure(e, t = "all") {
		let n = [...e], r = t === "all" ? t : [...t], i = this.queue.then(() => this.ensureNow(n, r));
		return this.queue = i.catch(() => void 0), i;
	}
	async ensureNow(e, n) {
		if (this.closed || !this.fonts || typeof FontFace > "u" || typeof fetch > "u") return;
		let r = /* @__PURE__ */ new Set(), s = n === "all" && !this.all;
		if (n === "all") this.all = !0, this.points.clear();
		else if (!this.all) for (let e of n) this.points.has(e) || (this.points.add(e), r.add(e));
		let d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Map();
		for (let t of e) {
			let e = t?.trim().toLowerCase(), n = e && this.map[e];
			if (!n) continue;
			let r = f.get(n.url) ?? /* @__PURE__ */ new Set();
			r.add((n.loadFamily ?? t.trim()).toLowerCase()), f.set(n.url, r);
		}
		let p = /* @__PURE__ */ new Set();
		try {
			let e = await i(Promise.all([...f.keys()].filter((e) => !this.urls.has(e)).map(async (e) => {
				let t = a.get(e);
				return t || (t = (async () => {
					try {
						let t = await fetch(e);
						if (!t.ok) throw Error(`HTTP ${t.status}`);
						return o(await t.text(), t.url || e);
					} catch {
						return a.delete(e), [];
					}
				})(), a.set(e, t)), {
					url: e,
					rules: await t
				};
			})));
			if (this.closed) return;
			for (let n of Array.isArray(e) ? e : []) {
				if (!n.rules.length) {
					for (let e of f.get(n.url) ?? []) p.add(e);
					continue;
				}
				for (let e of n.rules) {
					let r = c(n.url, e);
					if (this.owned.has(r)) continue;
					let { face: i } = t(r, this.fonts, () => {
						let t = new FontFace(e.family, e.src, e.descriptors);
						try {
							this.fonts.add(t);
						} catch (e) {
							throw this.fonts.delete(t), e;
						}
						return t;
					}), a = {
						face: i,
						ranges: l(e.descriptors.unicodeRange)
					};
					this.owned.set(r, a), d.add(a);
				}
				this.urls.add(n.url);
			}
			let n = [...r].sort((e, t) => e - t), m = d.size ? [...this.points].sort((e, t) => e - t) : n, h = [];
			for (let e of this.owned.values()) {
				if (e.readiness) {
					h.push(e.readiness);
					continue;
				}
				let t = d.has(e) ? m : n;
				(this.all && (s || d.has(e)) || e.ranges === null || u(e.ranges, t)) && (e.readiness ??= Promise.resolve().then(() => this.closed ? void 0 : e.face.load()).then(() => void 0, () => {
					p.add(e.face.family.replace(/['"]/g, "").toLowerCase());
				}), h.push(e.readiness));
			}
			await i(Promise.all(h)), !this.closed && p.size && console.warn(`[ooxml] failed to preload web font(s): ${[...p].join(", ")}; falling back to system fonts (text may shift or differ).`);
		} catch (e) {
			throw this.release(), e;
		}
	}
	release() {
		this.closed || (this.closed = !0, n(this.faces), this.owned.clear(), this.points.clear(), this.urls.clear());
	}
};
async function f(e, t, n = s()) {
	let r = new d(t, n);
	return await r.ensure(e), r.faces;
}
function p(e) {
	n(e);
}
//#endregion
export { i as a, p as i, s as n, n as o, f as r, t as s, d as t };
