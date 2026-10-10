import { a as e, n as t, o as n, s as r } from "./preload-Dufqb9J3.js";
import { q as i } from "./office-auto-line-Chy1gU-T.js";
//#region packages/core/src/fonts/local-metrics.ts
var a = /* @__PURE__ */ new WeakSet();
function o(e) {
	return a.has(e);
}
function s(e) {
	return e.trim().toLowerCase();
}
function c(e) {
	return `local("${e.replaceAll("\\", "\\\\").replaceAll("\"", "\\\"")}")`;
}
function l(e) {
	return `__ooxml_local_${[...e].map((e) => (e.codePointAt(0) ?? 0).toString(16).padStart(6, "0")).join("")}`;
}
function u() {
	return typeof OffscreenCanvas < "u" ? new OffscreenCanvas(1, 1).getContext("2d") : typeof document < "u" && document?.createElement ? document.createElement("canvas").getContext("2d") : null;
}
async function d(i, o = t()) {
	let d = o;
	if (!d || typeof FontFace > "u") return {
		faces: [],
		metrics: {}
	};
	let f = [], p = {}, m = !1, h = /* @__PURE__ */ new Map();
	for (let e of i) {
		let t = e.family.trim(), n = e.localNames.map((e) => e.trim()).filter(Boolean);
		if (!t || n.length === 0 || e.lineHeightMultiplier != null && !(e.lineHeightMultiplier > 0)) continue;
		let r = e.weight ?? 400, i = e.style ?? "normal";
		if (!(r >= 100 && r <= 900) || i !== "normal" && i !== "italic") continue;
		let a = n.map(c).join(", "), o = s(t), l = `local-face:${a}:${r}:${i}`, u = h.get(l) ?? {
			source: a,
			requests: []
		};
		u.requests.push({
			...e,
			family: t,
			normalizedFamily: o,
			source: a,
			weight: r,
			style: i
		}), h.set(l, u);
	}
	for (let [t, i] of h) {
		let a = l(t), { face: o } = r(t, d, () => {
			let e = i.requests[0], t = new FontFace(a, i.source, {
				weight: String(e.weight),
				style: e.style
			});
			return d.add(t), t;
		});
		try {
			let t = await e(o.load());
			if ((!t || o.status !== "loaded") && (m = !0), !t || o.status !== "loaded") throw Error("local font load timed out");
			let n = !1;
			for (let e of i.requests) {
				let t;
				if (e.lineHeightMultiplier != null) {
					let n = u();
					if (!n) continue;
					n.font = `${e.style} ${e.weight} 100px "${a}"`;
					let r = n.measureText("Hg国"), i = r.fontBoundingBoxAscent, o = r.fontBoundingBoxDescent;
					if (!(Number.isFinite(i) && Number.isFinite(o) && i + o > 0)) continue;
					t = (i + o) / 100 * e.lineHeightMultiplier;
				}
				let r = e.weight === 400 && e.style === "normal" ? e.normalizedFamily : `${e.normalizedFamily}:${e.weight}:${e.style}`;
				p[r] = {
					family: a,
					...t == null ? {} : { lineHeightRatio: t },
					requestedFamily: e.family,
					weight: e.weight,
					style: e.style,
					sourceIdentity: e.source,
					synthesized: !1
				}, n = !0;
			}
			if (!n) throw Error("exact local font route unavailable");
			f.push(o);
		} catch {
			n([o]);
		}
	}
	let g = {
		faces: f,
		metrics: p
	};
	return m && a.add(g), g;
}
function f(e) {
	n(e);
}
//#endregion
//#region packages/core/src/fonts/office-fallback.ts
var p = 32, m = 8e3;
function h(e) {
	let t = e.family.trim();
	if (!t) return;
	let n = e.weight ?? 400, r = e.style ?? "normal";
	if (n !== 400 && n !== 700 || r !== "normal" && r !== "italic") return;
	let a = i(t, {
		weight: n,
		style: r
	});
	if (a.length === 0) return;
	let o = new Set(i(t).filter((e) => e.weight !== n || e.style !== r).flatMap((e) => e.aliases.map(s))), c = [...new Set(a.flatMap((e) => e.aliases))].filter((e) => !o.has(s(e)));
	if (n === 400 && r === "normal") for (let e of a) c.some((t) => s(t) === s(e.family)) || c.push(e.family);
	if (c.length !== 0) return {
		family: t,
		weight: n,
		style: r,
		localNames: c
	};
}
function g(e) {
	let t = s(e.family);
	return e.weight === 400 && e.style === "normal" ? t : `${t}:${e.weight}:${e.style}`;
}
function _(e, t) {
	let n = e.trim().toLowerCase();
	if (n === "normal") return t === 400;
	if (n === "bold") return t === 700;
	let r = /^(\d+)(?:\s+(\d+))?$/u.exec(n);
	if (!r) return !1;
	let i = Number(r[1]), a = Number(r[2] ?? r[1]);
	return i <= t && t <= a;
}
function v(e, t) {
	return e.status !== "loaded" || s(e.family.replace(/^(['"])(.*)\1$/u, "$2")) !== s(t.family) || e.style.trim().toLowerCase() !== t.style ? !1 : _(e.weight, t.weight);
}
async function y(e, n = t()) {
	let r = e.filter((e) => e.presenceOnly).map((e) => e.family), [i, a] = await Promise.all([b(e.filter((e) => !e.presenceOnly), n), r.length > 0 ? C(r, n) : Promise.resolve(/* @__PURE__ */ new Set())]);
	return a.size > 0 ? {
		...i,
		installed: [...a].sort()
	} : i;
}
async function b(e, t) {
	if (!t || typeof FontFace > "u") return {
		faces: [],
		routes: {},
		checked: []
	};
	let n = typeof t[Symbol.iterator] == "function" ? [...t] : [], r = [...new Map(e.map(h).filter((e) => !!e).filter((e) => !n.some((t) => v(t, e))).map((e) => [g(e), e])).values()];
	if (r.length === 0) return {
		faces: [],
		routes: {},
		checked: []
	};
	let i = /* @__PURE__ */ new Map();
	for (let e of r) {
		let t = JSON.stringify([
			e.localNames,
			e.weight,
			e.style
		]), n = i.get(t) ?? [];
		n.push(e), i.set(t, n);
	}
	let a = [...i.values()].slice(0, p), s = Array(a.length), c = 0, l = !0, u = Array.from({ length: Math.min(4, a.length) }, async () => {
		for (; l && c < a.length;) {
			let e = c++, n = await d(a[e].map((e) => ({
				family: e.family,
				localNames: e.localNames,
				weight: e.weight,
				style: e.style
			})), t);
			l ? s[e] = n : f(n.faces);
		}
	}), _, y = await Promise.race([Promise.allSettled(u), new Promise((e) => {
		_ = setTimeout(() => e(null), m);
	})]);
	_ !== void 0 && clearTimeout(_), l = !1;
	let b = y?.find((e) => e.status === "rejected");
	if (b) throw f(s.flatMap((e) => e?.faces ?? [])), b.reason;
	let x = Object.assign({}, ...s.flatMap((e) => e ? [e.metrics] : [])), S = {};
	for (let e of r) {
		let t = g(e), n = x[t];
		if (!n) continue;
		let r = `office-local:${n.sourceIdentity ?? e.localNames.join(",")}`;
		S[t] = {
			requestedFamily: e.family,
			family: n.family,
			source: "local",
			resourceIdentity: r,
			weight: e.weight,
			style: e.style,
			metric: {
				...n,
				sourceIdentity: r
			}
		};
	}
	return {
		faces: s.flatMap((e) => e?.faces ?? []),
		routes: S,
		checked: s.flatMap((e, t) => e && !o(e) ? a[t].map(g) : [])
	};
}
function x(e) {
	f(e);
}
function S(e) {
	return [...new Set([e, ...i(e).flatMap((e) => e.aliases)])];
}
async function C(e, t) {
	let n = [...new Map(e.map((e) => e.trim()).filter(Boolean).map((e) => [s(e), e])).values()].slice(0, p), r = /* @__PURE__ */ new Set();
	if (!t || typeof FontFace > "u" || n.length === 0) return r;
	let i = 0, a = !0, o = Array.from({ length: Math.min(4, n.length) }, async () => {
		for (; a && i < n.length;) {
			let e = n[i++], o = await d([{
				family: e,
				localNames: S(e)
			}], t);
			f(o.faces), a && Object.keys(o.metrics).length > 0 && r.add(s(e));
		}
	}), c;
	return await Promise.race([Promise.allSettled(o), new Promise((e) => {
		c = setTimeout(e, m);
	})]), c !== void 0 && clearTimeout(c), a = !1, new Set(r);
}
//#endregion
export { y as n, x as r, _ as t };
