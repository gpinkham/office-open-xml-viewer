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
async function l(e, n, r = s()) {
	let l = r;
	if (!l || typeof FontFace > "u" || typeof fetch > "u") return [];
	let u = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (!t) continue;
		let e = t.trim();
		if (!e) continue;
		let r = e.toLowerCase();
		if (u.has(r)) continue;
		u.add(r);
		let i = n[r];
		if (!i) continue;
		let a = i.url;
		f.add(a);
		let o = (i.loadFamily ?? e).toLowerCase();
		d.add(o);
		let s = p.get(a);
		s || (s = /* @__PURE__ */ new Set(), p.set(a, s)), s.add(o);
	}
	if (d.size === 0) return [];
	let h = await i(Promise.all([...f].map(async (e) => {
		let t = a.get(e);
		if (t) return {
			url: e,
			rules: await t
		};
		let n = (async () => {
			try {
				let t = await fetch(e);
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				return o(await t.text(), t.url || e);
			} catch {
				a.delete(e);
				for (let t of p.get(e) ?? []) m.add(t);
				return [];
			}
		})();
		return a.set(e, n), {
			url: e,
			rules: await n
		};
	}))), g = [], _ = [];
	for (let e of Array.isArray(h) ? h : []) for (let n of e.rules) {
		let { face: r, isNew: i } = t(c(e.url, n), l, () => {
			let e = new FontFace(n.family, n.src, n.descriptors);
			return l.add(e), e;
		});
		g.push(r), i && _.push(r);
	}
	return _.length > 0 && await i(Promise.allSettled(_.map((e) => e.load())).then((e) => (e.forEach((e, t) => {
		e.status === "rejected" && m.add(_[t].family.replace(/['"]/g, "").toLowerCase());
	}), l.ready))), m.size > 0 && console.warn(`[ooxml] failed to preload web font(s): ${[...m].join(", ")}; falling back to system fonts (text may shift or differ).`), g;
}
function u(e) {
	n(e);
}
//#endregion
//#region packages/core/src/fonts/local-metrics.ts
var d = /* @__PURE__ */ new WeakSet();
function f(e) {
	return d.has(e);
}
function p(e) {
	return e.trim().toLowerCase();
}
function m(e) {
	return `local("${e.replaceAll("\\", "\\\\").replaceAll("\"", "\\\"")}")`;
}
function h(e) {
	return `__ooxml_local_${[...e].map((e) => (e.codePointAt(0) ?? 0).toString(16).padStart(6, "0")).join("")}`;
}
function g() {
	return typeof OffscreenCanvas < "u" ? new OffscreenCanvas(1, 1).getContext("2d") : typeof document < "u" && document?.createElement ? document.createElement("canvas").getContext("2d") : null;
}
async function _(e, r = s()) {
	let a = r;
	if (!a || typeof FontFace > "u") return {
		faces: [],
		metrics: {}
	};
	let o = [], c = {}, l = !1, u = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = t.family.trim(), n = t.localNames.map((e) => e.trim()).filter(Boolean);
		if (!e || n.length === 0 || t.lineHeightMultiplier != null && !(t.lineHeightMultiplier > 0)) continue;
		let r = t.weight ?? 400, i = t.style ?? "normal";
		if (!(r >= 100 && r <= 900) || i !== "normal" && i !== "italic") continue;
		let a = n.map(m).join(", "), o = p(e), s = `local-face:${a}:${r}:${i}`, c = u.get(s) ?? {
			source: a,
			requests: []
		};
		c.requests.push({
			...t,
			family: e,
			normalizedFamily: o,
			source: a,
			weight: r,
			style: i
		}), u.set(s, c);
	}
	for (let [e, r] of u) {
		let s = h(e), { face: u } = t(e, a, () => {
			let e = r.requests[0], t = new FontFace(s, r.source, {
				weight: String(e.weight),
				style: e.style
			});
			return a.add(t), t;
		});
		try {
			let e = await i(u.load());
			if ((!e || u.status !== "loaded") && (l = !0), !e || u.status !== "loaded") throw Error("local font load timed out");
			let t = !1;
			for (let e of r.requests) {
				let n;
				if (e.lineHeightMultiplier != null) {
					let t = g();
					if (!t) continue;
					t.font = `${e.style} ${e.weight} 100px "${s}"`;
					let r = t.measureText("Hg国"), i = r.fontBoundingBoxAscent, a = r.fontBoundingBoxDescent;
					if (!(Number.isFinite(i) && Number.isFinite(a) && i + a > 0)) continue;
					n = (i + a) / 100 * e.lineHeightMultiplier;
				}
				let r = e.weight === 400 && e.style === "normal" ? e.normalizedFamily : `${e.normalizedFamily}:${e.weight}:${e.style}`;
				c[r] = {
					family: s,
					...n == null ? {} : { lineHeightRatio: n },
					requestedFamily: e.family,
					weight: e.weight,
					style: e.style,
					sourceIdentity: e.source,
					synthesized: !1
				}, t = !0;
			}
			if (!t) throw Error("exact local font route unavailable");
			o.push(u);
		} catch {
			n([u]);
		}
	}
	let f = {
		faces: o,
		metrics: c
	};
	return l && d.add(f), f;
}
function v(e) {
	n(e);
}
var y = {
	schemaVersion: 2,
	notice: "Reference metrics are not proof of the face selected by Canvas, macOS, or Office.",
	profiles: [
		{
			source: "office-mac",
			family: "Abadi MT Condensed Extra Bold",
			aliases: ["Abadi MT Condensed Extra Bold", "AbadiMT-CondensedExtraBold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 806,
			hhea: [
				1788,
				-568,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Abadi MT Condensed Light",
			aliases: ["Abadi MT Condensed Light", "AbadiMT-CondensedLight"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 685,
			hhea: [
				1788,
				-568,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Angsana New",
			aliases: ["Angsana New", "AngsanaNew-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 4096,
			xAvgCharWidth: 1087,
			hhea: [
				3854,
				-1636,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Angsana New",
			aliases: ["Angsana New", "AngsanaNew"],
			weight: 400,
			style: "normal",
			unitsPerEm: 4096,
			xAvgCharWidth: 1084,
			hhea: [
				3854,
				-1679,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Angsana New",
			aliases: ["Angsana New", "AngsanaNew-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 4096,
			xAvgCharWidth: 1114,
			hhea: [
				4066,
				-1725,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Angsana New",
			aliases: ["Angsana New", "AngsanaNew-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 4096,
			xAvgCharWidth: 1154,
			hhea: [
				3949,
				-1724,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos",
			aliases: [
				"Aptos",
				"Aptos Light",
				"Aptos-LightItalic"
			],
			weight: 300,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1122,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos",
			aliases: [
				"Aptos",
				"Aptos Light",
				"Aptos-Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1121,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos",
			aliases: ["Aptos", "Aptos-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1150,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos",
			aliases: ["Aptos"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1148,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos",
			aliases: [
				"Aptos",
				"Aptos SemiBold",
				"Aptos-SemiBoldItalic"
			],
			weight: 600,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1177,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos",
			aliases: [
				"Aptos",
				"Aptos SemiBold",
				"Aptos-SemiBold"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1175,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos",
			aliases: ["Aptos", "Aptos-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1204,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos",
			aliases: ["Aptos", "Aptos-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1202,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos",
			aliases: [
				"Aptos",
				"Aptos ExtraBold",
				"Aptos-ExtraBoldItalic"
			],
			weight: 800,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1226,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos",
			aliases: [
				"Aptos",
				"Aptos ExtraBold",
				"Aptos-ExtraBold"
			],
			weight: 800,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1224,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos",
			aliases: [
				"Aptos",
				"Aptos Black",
				"Aptos-BlackItalic"
			],
			weight: 900,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1262,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos",
			aliases: [
				"Aptos",
				"Aptos Black",
				"Aptos-Black"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1254,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos Narrow",
			aliases: ["Aptos Narrow", "Aptos-Narrow-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1063,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos Narrow",
			aliases: ["Aptos Narrow", "Aptos-Narrow"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1063,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos Narrow",
			aliases: ["Aptos Narrow", "Aptos-Narrow-Bold-Italic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1090,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Aptos Narrow",
			aliases: ["Aptos Narrow", "Aptos-Narrow-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1095,
			hhea: [
				1923,
				-577,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Arial",
			aliases: ["Arial", "Arial-ItalicMT"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 904,
			hhea: [
				1854,
				-434,
				67
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Arial",
			aliases: ["Arial", "ArialMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 904,
			hhea: [
				1854,
				-434,
				67
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Arial",
			aliases: ["Arial", "Arial-BoldItalicMT"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 980,
			hhea: [
				1854,
				-434,
				67
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Arial",
			aliases: ["Arial", "Arial-BoldMT"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 980,
			hhea: [
				1854,
				-434,
				67
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Arial",
			aliases: [
				"Arial",
				"Arial Black",
				"Arial-Black"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1131,
			hhea: [
				2254,
				-634,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Arial Narrow",
			aliases: ["Arial Narrow", "ArialNarrow-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 741,
			hhea: [
				1916,
				-434,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Arial Narrow",
			aliases: ["Arial Narrow", "ArialNarrow-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 803,
			hhea: [
				1916,
				-434,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Arial Rounded MT Bold",
			aliases: ["Arial Rounded MT Bold", "ArialRoundedMTBold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 990,
			hhea: [
				1938,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Baskerville Old Face",
			aliases: ["Baskerville Old Face", "BaskOldFace"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 803,
			hhea: [
				1536,
				-512,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Batang",
			aliases: ["Batang", "바탕"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				879,
				-145,
				152
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "BatangChe",
			aliases: ["BatangChe", "바탕체"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				879,
				-145,
				152
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Bauhaus 93",
			aliases: ["Bauhaus 93", "Bauhaus93"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 909,
			hhea: [
				1841,
				-477,
				673
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Bell MT",
			aliases: ["Bell MT", "BellMTItalic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 751,
			hhea: [
				1723,
				-554,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Bell MT",
			aliases: ["Bell MT", "BellMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 835,
			hhea: [
				1723,
				-554,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Bell MT",
			aliases: ["Bell MT", "BellMTBold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 899,
			hhea: [
				1723,
				-554,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Bernard MT Condensed",
			aliases: ["Bernard MT Condensed", "BernardMT-Condensed"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 793,
			hhea: [
				1986,
				-446,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Book Antiqua",
			aliases: ["Book Antiqua", "BookAntiqua-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 821,
			hhea: [
				1891,
				-578,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Book Antiqua",
			aliases: ["Book Antiqua", "BookAntiqua"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 912,
			hhea: [
				1891,
				-578,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Book Antiqua",
			aliases: ["Book Antiqua", "BookAntiqua-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 915,
			hhea: [
				1891,
				-578,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Book Antiqua",
			aliases: ["Book Antiqua", "BookAntiqua-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 940,
			hhea: [
				1891,
				-578,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Bookman Old Style",
			aliases: ["Bookman Old Style", "BookmanOldStyle-Italic"],
			weight: 300,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 988,
			hhea: [
				1929,
				-475,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Bookman Old Style",
			aliases: ["Bookman Old Style", "BookmanOldStyle"],
			weight: 300,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1008,
			hhea: [
				1929,
				-475,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Bookman Old Style",
			aliases: ["Bookman Old Style", "BookmanOldStyle-BoldItalic"],
			weight: 600,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1102,
			hhea: [
				1929,
				-475,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Bookman Old Style",
			aliases: ["Bookman Old Style", "BookmanOldStyle-Bold"],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1079,
			hhea: [
				1929,
				-475,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Bookshelf Symbol 7",
			aliases: ["Bookshelf Symbol 7", "BookshelfSymbolSeven"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 168,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Braggadocio",
			aliases: ["Braggadocio"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1346,
			hhea: [
				1587,
				-313,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Britannic Bold",
			aliases: ["Britannic Bold", "BritannicBold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 914,
			hhea: [
				1707,
				-341,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Calibri",
			aliases: [
				"Calibri",
				"Calibri Light",
				"Calibri-LightItalic"
			],
			weight: 300,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1067,
			hhea: [
				1950,
				-550,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Calibri",
			aliases: [
				"Calibri",
				"Calibri Light",
				"Calibri-Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1065,
			hhea: [
				1950,
				-550,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Calibri",
			aliases: ["Calibri", "Calibri-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1067,
			hhea: [
				1950,
				-550,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Calibri",
			aliases: ["Calibri"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1067,
			hhea: [
				1950,
				-550,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Calibri",
			aliases: ["Calibri", "Calibri-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1099,
			hhea: [
				1950,
				-550,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Calibri",
			aliases: ["Calibri", "Calibri-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1098,
			hhea: [
				1950,
				-550,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Calisto MT",
			aliases: ["Calisto MT", "CalistoMT-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 765,
			hhea: [
				1848,
				-512,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Calisto MT",
			aliases: ["Calisto MT", "CalistoMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 863,
			hhea: [
				1894,
				-470,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Calisto MT",
			aliases: ["Calisto MT", "CalistoMT-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 805,
			hhea: [
				1894,
				-512,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Calisto MT",
			aliases: ["CalisMTBol", "Calisto MT"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 894,
			hhea: [
				1538,
				-653,
				228
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Cambria",
			aliases: ["Cambria", "Cambria-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1111,
			hhea: [
				1946,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Cambria",
			aliases: ["Cambria"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1260,
			hhea: [
				1946,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Cambria",
			aliases: ["Cambria", "Cambria-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1198,
			hhea: [
				1946,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Cambria",
			aliases: ["Cambria", "Cambria-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1228,
			hhea: [
				1946,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Cambria Math",
			aliases: ["Cambria Math", "CambriaMath"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1260,
			hhea: [
				1946,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Candara",
			aliases: ["Candara", "Candara-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1031,
			hhea: [
				1484,
				-564,
				452
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Candara",
			aliases: ["Candara"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1068,
			hhea: [
				1484,
				-564,
				452
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Candara",
			aliases: ["Candara", "Candara-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1059,
			hhea: [
				1484,
				-564,
				452
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Candara",
			aliases: ["Candara", "Candara-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1082,
			hhea: [
				1484,
				-564,
				452
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Century",
			aliases: ["Century"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 951,
			hhea: [
				2019,
				-443,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Century Gothic",
			aliases: ["Century Gothic", "CenturyGothic-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 995,
			hhea: [
				2060,
				-451,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Century Gothic",
			aliases: ["Century Gothic", "CenturyGothic"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 995,
			hhea: [
				2060,
				-451,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Century Gothic",
			aliases: ["Century Gothic", "CenturyGothic-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 994,
			hhea: [
				2060,
				-451,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Century Gothic",
			aliases: ["Century Gothic", "CenturyGothic-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 994,
			hhea: [
				2060,
				-451,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Century Schoolbook",
			aliases: ["Century Schoolbook", "CenturySchoolbook-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 938,
			hhea: [
				2019,
				-443,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Century Schoolbook",
			aliases: ["Century Schoolbook", "CenturySchoolbook"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 951,
			hhea: [
				2019,
				-443,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Century Schoolbook",
			aliases: ["Century Schoolbook", "CenturySchoolbook-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1054,
			hhea: [
				2019,
				-443,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Century Schoolbook",
			aliases: ["Century Schoolbook", "CenturySchoolbook-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1073,
			hhea: [
				2019,
				-443,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Colonna MT",
			aliases: ["Colonna MT", "ColonnaMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 859,
			hhea: [
				1460,
				-705,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Comic Sans MS",
			aliases: ["Comic Sans MS", "ComicSansMS-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1014,
			hhea: [
				2257,
				-597,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Consolas",
			aliases: ["Consolas", "Consolas-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1126,
			hhea: [
				1521,
				-527,
				350
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Consolas",
			aliases: ["Consolas"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1126,
			hhea: [
				1521,
				-527,
				350
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Consolas",
			aliases: ["Consolas", "Consolas-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1126,
			hhea: [
				1521,
				-527,
				350
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Consolas",
			aliases: ["Consolas", "Consolas-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1126,
			hhea: [
				1521,
				-527,
				350
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Constantia",
			aliases: ["Constantia", "Constantia-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1093,
			hhea: [
				1538,
				-510,
				452
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Constantia",
			aliases: ["Constantia"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1110,
			hhea: [
				1538,
				-510,
				452
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Constantia",
			aliases: ["Constantia", "Constantia-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1166,
			hhea: [
				1538,
				-510,
				452
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Constantia",
			aliases: ["Constantia", "Constantia-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1176,
			hhea: [
				1538,
				-510,
				452
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Cooper Black",
			aliases: ["Cooper Black", "CooperBlack"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1048,
			hhea: [
				1880,
				-469,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Copperplate Gothic Bold",
			aliases: ["Copperplate Gothic Bold", "CopperplateGothic-Bold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1186,
			hhea: [
				1813,
				-465,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Corbel",
			aliases: ["Corbel", "Corbel-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1055,
			hhea: [
				1523,
				-525,
				425
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Corbel",
			aliases: ["Corbel"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1084,
			hhea: [
				1523,
				-525,
				425
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Corbel",
			aliases: ["Corbel", "Corbel-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1111,
			hhea: [
				1523,
				-525,
				425
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Corbel",
			aliases: ["Corbel", "Corbel-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1131,
			hhea: [
				1523,
				-525,
				425
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Cordia New",
			aliases: ["Cordia New", "CordiaNew-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 4096,
			xAvgCharWidth: 1227,
			hhea: [
				3658,
				-1040,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Cordia New",
			aliases: ["Cordia New", "CordiaNew"],
			weight: 400,
			style: "normal",
			unitsPerEm: 4096,
			xAvgCharWidth: 1201,
			hhea: [
				3658,
				-1040,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Cordia New",
			aliases: ["Cordia New", "CordiaNew-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 4096,
			xAvgCharWidth: 1185,
			hhea: [
				3412,
				-1072,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Cordia New",
			aliases: ["Cordia New", "CordiaNew-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 4096,
			xAvgCharWidth: 1214,
			hhea: [
				3412,
				-1070,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "CordiaUPC",
			aliases: ["CordiaUPC", "CordiaUPC-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 4096,
			xAvgCharWidth: 1227,
			hhea: [
				3658,
				-1040,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "CordiaUPC",
			aliases: ["CordiaUPC"],
			weight: 400,
			style: "normal",
			unitsPerEm: 4096,
			xAvgCharWidth: 1201,
			hhea: [
				3658,
				-1040,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "CordiaUPC",
			aliases: ["CordiaUPC", "CordiaUPC-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 4096,
			xAvgCharWidth: 1185,
			hhea: [
				3412,
				-1072,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "CordiaUPC",
			aliases: ["CordiaUPC", "CordiaUPC-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 4096,
			xAvgCharWidth: 1214,
			hhea: [
				3412,
				-1070,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Curlz MT",
			aliases: ["Curlz MT", "CurlzMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 780,
			hhea: [
				2103,
				-614,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "David",
			aliases: ["David"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1028,
			hhea: [
				1505,
				-510,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "David",
			aliases: ["David", "David-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1067,
			hhea: [
				1505,
				-510,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "DengXian",
			aliases: [
				"DengXian",
				"DengXian Light",
				"DengXian-Light",
				"等线",
				"等线 Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 916,
			hhea: [
				1659,
				-475,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "DengXian",
			aliases: [
				"DengXian",
				"DengXian-Regular",
				"等线"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 916,
			hhea: [
				1659,
				-475,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "DengXian",
			aliases: [
				"DengXian",
				"DengXian-Bold",
				"等线"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 934,
			hhea: [
				1659,
				-475,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Desdemona",
			aliases: ["Desdemona"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 931,
			hhea: [
				1948,
				-400,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Dotum",
			aliases: ["Dotum", "돋움"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				879,
				-145,
				152
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "DotumChe",
			aliases: ["DotumChe", "돋움체"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				879,
				-145,
				152
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Dubai",
			aliases: [
				"Dubai",
				"Dubai Light",
				"Dubai-Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 505,
			hhea: [
				1129,
				-559,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Dubai",
			aliases: ["Dubai", "Dubai-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 513,
			hhea: [
				1129,
				-559,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Dubai",
			aliases: [
				"Dubai",
				"Dubai Medium",
				"Dubai-Medium"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 521,
			hhea: [
				1129,
				-559,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Dubai",
			aliases: ["Dubai", "Dubai-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 532,
			hhea: [
				1129,
				-559,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Edwardian Script ITC",
			aliases: ["Edwardian Script ITC", "EdwardianScriptITC"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 522,
			hhea: [
				1742,
				-672,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Engravers MT",
			aliases: ["Engravers MT", "EngraversMT"],
			weight: 500,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1622,
			hhea: [
				1920,
				-465,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Engravers MT",
			aliases: ["Engravers MT", "EngraversMT-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1820,
			hhea: [
				1920,
				-465,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Eurostile",
			aliases: ["Eurostile", "EurostileRegular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 844,
			hhea: [
				1774,
				-428,
				154
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Eurostile",
			aliases: ["Eurostile", "EurostileBold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 882,
			hhea: [
				1638,
				-410,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "FangSong",
			aliases: ["FangSong", "仿宋"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				36
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Footlight MT Light",
			aliases: ["Footlight MT Light", "FootlightMTLight"],
			weight: 300,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 843,
			hhea: [
				1416,
				-458,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Franklin Gothic Book",
			aliases: ["Franklin Gothic Book", "FranklinGothic-BookItalic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 867,
			hhea: [
				1877,
				-445,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Franklin Gothic Book",
			aliases: ["Franklin Gothic Book", "FranklinGothic-Book"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 863,
			hhea: [
				1877,
				-445,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Franklin Gothic Demi",
			aliases: ["Franklin Gothic Demi", "FranklinGothic-DemiItalic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 895,
			hhea: [
				1877,
				-445,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Franklin Gothic Demi",
			aliases: ["Franklin Gothic Demi", "FranklinGothic-Demi"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 898,
			hhea: [
				1877,
				-445,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Franklin Gothic Demi Cond",
			aliases: ["Franklin Gothic Demi Cond", "FranklinGothic-DemiCond"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 768,
			hhea: [
				1877,
				-445,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Franklin Gothic Heavy",
			aliases: ["Franklin Gothic Heavy", "FranklinGothic-HeavyItalic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 962,
			hhea: [
				1877,
				-445,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Franklin Gothic Heavy",
			aliases: ["Franklin Gothic Heavy", "FranklinGothic-Heavy"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 969,
			hhea: [
				1877,
				-445,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Franklin Gothic Medium",
			aliases: ["Franklin Gothic Medium", "FranklinGothic-MediumItalic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 876,
			hhea: [
				1877,
				-445,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Franklin Gothic Medium",
			aliases: ["Franklin Gothic Medium", "FranklinGothic-Medium"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 878,
			hhea: [
				1877,
				-445,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Franklin Gothic Medium Cond",
			aliases: ["Franklin Gothic Medium Cond", "FranklinGothic-MediumCond"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 739,
			hhea: [
				1877,
				-445,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Gabriola",
			aliases: ["Gabriola"],
			weight: 400,
			style: "normal",
			unitsPerEm: 4096,
			xAvgCharWidth: 2017,
			hhea: [
				2800,
				-1296,
				2867
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Garamond",
			aliases: ["Garamond", "Garamond-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 664,
			hhea: [
				1765,
				-539,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Garamond",
			aliases: ["Garamond"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 793,
			hhea: [
				1765,
				-539,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Garamond",
			aliases: ["Garamond", "Garamond-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1161,
			hhea: [
				1765,
				-539,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Garamond",
			aliases: ["Garamond", "Garamond-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 865,
			hhea: [
				1765,
				-539,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Gautami",
			aliases: ["Gautami"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1166,
			hhea: [
				1892,
				-1664,
				348
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Gautami",
			aliases: ["Gautami", "Gautami-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1175,
			hhea: [
				1892,
				-1664,
				348
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Gill Sans MT",
			aliases: ["Gill Sans MT", "GillSansMT-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 769,
			hhea: [
				1903,
				-472,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Gill Sans MT",
			aliases: ["Gill Sans MT", "GillSansMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 834,
			hhea: [
				1903,
				-472,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Gill Sans MT",
			aliases: ["Gill Sans MT", "GillSansMT-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 900,
			hhea: [
				1903,
				-472,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Gill Sans MT",
			aliases: ["Gill Sans MT", "GillSansMT-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 956,
			hhea: [
				1903,
				-472,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Gill Sans MT Condensed",
			aliases: ["Gill Sans MT Condensed", "GillSansMT-Condensed"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 623,
			hhea: [
				1913,
				-553,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Gill Sans MT Ext Condensed Bold",
			aliases: ["Gill Sans MT Ext Condensed Bold", "GillSansMT-ExtraCondensedBold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 469,
			hhea: [
				2045,
				-407,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Gill Sans Ultra Bold",
			aliases: ["Gill Sans Ultra Bold", "GillSans-UltraBold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1290,
			hhea: [
				2036,
				-516,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Gloucester MT Extra Condensed",
			aliases: ["Gloucester MT Extra Condensed", "GloucesterMT-ExtraCondensed"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 566,
			hhea: [
				1936,
				-446,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Goudy Old Style",
			aliases: ["Goudy Old Style", "GoudyOldStyleT-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 718,
			hhea: [
				1832,
				-486,
				140
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Goudy Old Style",
			aliases: ["Goudy Old Style", "GoudyOldStyleT-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 806,
			hhea: [
				1832,
				-486,
				140
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Goudy Old Style",
			aliases: ["Goudy Old Style", "GoudyOldStyleT-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 829,
			hhea: [
				1832,
				-486,
				140
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Gulim",
			aliases: ["Gulim", "굴림"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				879,
				-145,
				152
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "GulimChe",
			aliases: ["GulimChe", "굴림체"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				879,
				-145,
				152
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Gungsuh",
			aliases: ["Gungsuh", "궁서"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				879,
				-145,
				152
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "GungsuhChe",
			aliases: ["GungsuhChe", "궁서체"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				879,
				-145,
				152
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Haettenschweiler",
			aliases: ["Haettenschweiler"],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 311,
			hhea: [
				880,
				-120,
				67
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Harrington",
			aliases: ["Harrington"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 890,
			hhea: [
				1936,
				-472,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "HGGothicE",
			aliases: ["HGGothicE", "HGｺﾞｼｯｸE"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "HGMaruGothicMPRO",
			aliases: ["HGMaruGothicMPRO", "HG丸ｺﾞｼｯｸM-PRO"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "HGMinchoE",
			aliases: ["HGMinchoE", "HG明朝E"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "HGPGothicE",
			aliases: ["HGPGothicE", "HGPｺﾞｼｯｸE"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "HGPMinchoE",
			aliases: ["HGPMinchoE", "HGP明朝E"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "HGPSoeiKakugothicUB",
			aliases: ["HGPSoeiKakugothicUB", "HGP創英角ｺﾞｼｯｸUB"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "HGSGothicE",
			aliases: ["HGSGothicE", "HGSｺﾞｼｯｸE"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "HGSMinchoE",
			aliases: ["HGSMinchoE", "HGS明朝E"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "HGSoeiKakugothicUB",
			aliases: ["HGSoeiKakugothicUB", "HG創英角ｺﾞｼｯｸUB"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "HGSSoeiKakugothicUB",
			aliases: ["HGSSoeiKakugothicUB", "HGS創英角ｺﾞｼｯｸUB"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Imprint MT Shadow",
			aliases: ["Imprint MT Shadow", "ImprintMT-Shadow"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 862,
			hhea: [
				1903,
				-510,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "KaiTi",
			aliases: ["KaiTi", "楷体"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				36
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Kartika",
			aliases: ["Kartika"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1708,
			hhea: [
				2013,
				-908,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Kartika",
			aliases: ["Kartika", "Kartika-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1722,
			hhea: [
				2013,
				-908,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Kino MT",
			aliases: ["Kino MT", "KinoMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 686,
			hhea: [
				1833,
				-486,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Latha",
			aliases: ["Latha"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1481,
			hhea: [
				2048,
				-1352,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Latha",
			aliases: ["Latha", "Latha-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1541,
			hhea: [
				2048,
				-1352,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Blackletter",
			aliases: ["Lucida Blackletter", "LucidaBlackletter"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 880,
			hhea: [
				2159,
				-445,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Bright",
			aliases: ["Lucida Bright", "LucidaBright-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 988,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Bright",
			aliases: ["Lucida Bright", "LucidaBright"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1007,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Bright",
			aliases: ["Lucida Bright", "LucidaBright-DemiItalic"],
			weight: 600,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1040,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Bright",
			aliases: ["Lucida Bright", "LucidaBright-Demi"],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1048,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Calligraphy",
			aliases: ["Lucida Calligraphy", "LucidaCalligraphy-Italic"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1100,
			hhea: [
				2122,
				-666,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Console",
			aliases: ["Lucida Console", "LucidaConsole"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1234,
			hhea: [
				1616,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Fax",
			aliases: ["Lucida Fax", "LucidaFax-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1035,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Fax",
			aliases: ["Lucida Fax", "LucidaFax"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1053,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Fax",
			aliases: ["Lucida Fax", "LucidaFax-DemiItalic"],
			weight: 600,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1087,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Fax",
			aliases: ["Lucida Fax", "LucidaFax-Demi"],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1105,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Handwriting",
			aliases: ["Lucida Handwriting", "LucidaHandwriting-Italic"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1168,
			hhea: [
				2098,
				-727,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Sans",
			aliases: ["Lucida Sans", "LucidaSans-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1003,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Sans",
			aliases: ["Lucida Sans", "LucidaSans"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1003,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Sans",
			aliases: ["Lucida Sans", "LucidaSans-DemiItalic"],
			weight: 600,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1064,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Sans",
			aliases: ["Lucida Sans", "LucidaSans-Demi"],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1068,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Sans Typewriter",
			aliases: ["Lucida Sans Typewriter", "LucidaSans-TypewriterOblique"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1234,
			hhea: [
				1974,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Sans Typewriter",
			aliases: ["Lucida Sans Typewriter", "LucidaSans-Typewriter"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1234,
			hhea: [
				1974,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Sans Typewriter",
			aliases: ["Lucida Sans Typewriter", "LucidaSans-TypewriterBoldOblique"],
			weight: 600,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1234,
			hhea: [
				1974,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Sans Typewriter",
			aliases: ["Lucida Sans Typewriter", "LucidaSans-TypewriterBold"],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1234,
			hhea: [
				1974,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Lucida Sans Unicode",
			aliases: ["Lucida Sans Unicode", "LucidaSansUnicode"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1003,
			hhea: [
				2246,
				-901,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Malgun Gothic",
			aliases: [
				"Malgun Gothic",
				"Malgun Gothic Semilight",
				"MalgunGothic-Semilight",
				"맑은 고딕",
				"맑은 고딕 Semilight"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 2009,
			hhea: [
				2229,
				-495,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Malgun Gothic",
			aliases: [
				"Malgun Gothic",
				"MalgunGothic",
				"맑은 고딕"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 949,
			hhea: [
				2229,
				-495,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Malgun Gothic",
			aliases: [
				"Malgun Gothic",
				"MalgunGothicBold",
				"맑은 고딕"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1e3,
			hhea: [
				2229,
				-495,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Mangal",
			aliases: ["Mangal"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1190,
			hhea: [
				2542,
				-898,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Mangal",
			aliases: ["Mangal", "Mangal-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1196,
			hhea: [
				2542,
				-898,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Marlett",
			aliases: ["Marlett"],
			weight: 500,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1964,
			hhea: [
				1920,
				0,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Matura MT Script Capitals",
			aliases: ["Matura MT Script Capitals", "MaturaMTScriptCapitals"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 877,
			hhea: [
				1755,
				-970,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Meiryo",
			aliases: [
				"Meiryo",
				"Meiryo-Italic",
				"メイリオ"
			],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1958,
			hhea: [
				2171,
				-901,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Meiryo",
			aliases: ["Meiryo", "メイリオ"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1958,
			hhea: [
				2171,
				-901,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Meiryo",
			aliases: [
				"Meiryo",
				"Meiryo-BoldItalic",
				"メイリオ"
			],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1967,
			hhea: [
				2171,
				-901,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Meiryo",
			aliases: [
				"Meiryo",
				"Meiryo-Bold",
				"メイリオ"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1967,
			hhea: [
				2171,
				-901,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Meiryo UI",
			aliases: ["Meiryo UI", "MeiryoUI-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1099,
			hhea: [
				2171,
				-430,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Meiryo UI",
			aliases: ["Meiryo UI", "MeiryoUI"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1099,
			hhea: [
				2171,
				-430,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Meiryo UI",
			aliases: ["Meiryo UI", "MeiryoUI-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1099,
			hhea: [
				2171,
				-430,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Meiryo UI",
			aliases: ["Meiryo UI", "MeiryoUI-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1099,
			hhea: [
				2171,
				-430,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Microsoft Himalaya",
			aliases: ["Microsoft Himalaya", "MicrosoftHimalaya"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 840,
			hhea: [
				1212,
				-836,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Microsoft JhengHei",
			aliases: [
				"Microsoft JhengHei",
				"MicrosoftJhengHeiRegular",
				"微軟正黑體"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 959,
			hhea: [
				2203,
				-521,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Microsoft JhengHei",
			aliases: [
				"Microsoft JhengHei",
				"MicrosoftJhengHeiBold",
				"微軟正黑體"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 987,
			hhea: [
				2203,
				-521,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Microsoft New Tai Lue",
			aliases: ["Microsoft New Tai Lue", "MicrosoftNewTaiLue"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1197,
			hhea: [
				1899,
				-780,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Microsoft New Tai Lue",
			aliases: ["Microsoft New Tai Lue", "MicrosoftNewTaiLue-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1271,
			hhea: [
				1899,
				-780,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Microsoft Tai Le",
			aliases: ["Microsoft Tai Le", "MicrosoftTaiLe"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1202,
			hhea: [
				1899,
				-705,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Microsoft Tai Le",
			aliases: ["Microsoft Tai Le", "MicrosoftTaiLe-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1268,
			hhea: [
				1899,
				-705,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Microsoft YaHei",
			aliases: [
				"Microsoft YaHei",
				"Microsoft YaHei Light",
				"MicrosoftYaHeiLight",
				"微软雅黑",
				"微软雅黑 Light"
			],
			weight: 290,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 975,
			hhea: [
				2210,
				-514,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Microsoft YaHei",
			aliases: [
				"Microsoft YaHei",
				"MicrosoftYaHei",
				"MicrosoftYaHeiRegular",
				"微软雅黑"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 987,
			hhea: [
				2167,
				-536,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Microsoft YaHei",
			aliases: [
				"Microsoft YaHei",
				"MicrosoftYaHei-Bold",
				"微软雅黑"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1040,
			hhea: [
				2167,
				-536,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Microsoft YaHei UI",
			aliases: [
				"Microsoft YaHei UI",
				"Microsoft YaHei UI Light",
				"MicrosoftYaHeiUILight"
			],
			weight: 290,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 975,
			hhea: [
				2080,
				-521,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Microsoft YaHei UI",
			aliases: [
				"Microsoft YaHei UI",
				"MicrosoftYaHeiUI",
				"MicrosoftYaHeiUIRegular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 987,
			hhea: [
				2080,
				-521,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Microsoft YaHei UI",
			aliases: ["Microsoft YaHei UI", "MicrosoftYaHeiUI-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1040,
			hhea: [
				2080,
				-521,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Microsoft Yi Baiti",
			aliases: ["Microsoft Yi Baiti", "Microsoft-Yi-Baiti"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1324,
			hhea: [
				1760,
				-290,
				53
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "MingLiU",
			aliases: ["MingLiU", "細明體"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				820,
				-204,
				204
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "MingLiU-ExtB",
			aliases: ["MingLiU-ExtB", "細明體-ExtB"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				820,
				-204,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "MingLiU_HKSCS",
			aliases: [
				"Ming-Lt-HKSCS-UNI-H",
				"MingLiU_HKSCS",
				"細明體_HKSCS"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				820,
				-204,
				204
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "MingLiU_HKSCS-ExtB",
			aliases: [
				"Ming-Lt-HKSCS-ExtB",
				"MingLiU_HKSCS-ExtB",
				"細明體_HKSCS-ExtB"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				820,
				-204,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Mistral",
			aliases: ["Mistral"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 660,
			hhea: [
				1543,
				-505,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Modern No. 20",
			aliases: ["Modern No. 20", "Modern-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 400,
			hhea: [
				791,
				-209,
				70
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Mongolian Baiti",
			aliases: ["Mongolian Baiti", "MongolianBaiti"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 881,
			hhea: [
				1729,
				-449,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Monotype Corsiva",
			aliases: ["Monotype Corsiva", "MonotypeCorsiva"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 717,
			hhea: [
				1618,
				-620,
				60
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Monotype Sorts",
			aliases: ["Monotype Sorts", "MonotypeSorts"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1531,
			hhea: [
				1641,
				-411,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "MS Gothic",
			aliases: [
				"MS Gothic",
				"ＭＳ ゴシック",
				"MS-Gothic"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "MS Mincho",
			aliases: [
				"MS Mincho",
				"ＭＳ 明朝",
				"MS-Mincho"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "MS PGothic",
			aliases: [
				"MS PGothic",
				"ＭＳ Ｐゴシック",
				"MS-PGothic"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 107,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "MS PMincho",
			aliases: [
				"MS PMincho",
				"ＭＳ Ｐ明朝",
				"MS-PMincho"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 105,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "MS Reference Sans Serif",
			aliases: ["MS Reference Sans Serif", "MSReferenceSansSerif"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1041,
			hhea: [
				2059,
				-430,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "MS Reference Specialty",
			aliases: ["MS Reference Specialty", "MSReferenceSpecialty"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1465,
			hhea: [
				2074,
				-440,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "MS UI Gothic",
			aliases: ["MS UI Gothic", "MS-UIGothic"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 107,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "MT Extra",
			aliases: ["MT Extra", "MT-Extra"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 675,
			hhea: [
				898,
				-313,
				82
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Myanmar Text",
			aliases: ["Myanmar Text", "MyanmarText"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1126,
			hhea: [
				2122,
				-1689,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Myanmar Text",
			aliases: ["Myanmar Text", "MyanmarText-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1185,
			hhea: [
				2210,
				-1689,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "News Gothic MT",
			aliases: ["News Gothic MT", "NewsGothicMT-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 920,
			hhea: [
				2013,
				-463,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "News Gothic MT",
			aliases: ["News Gothic MT", "NewsGothicMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 964,
			hhea: [
				2013,
				-463,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "News Gothic MT",
			aliases: ["News Gothic MT", "NewsGothicMT-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 976,
			hhea: [
				2013,
				-463,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "News Gothic MT",
			aliases: ["News Gothic MT", "NewsGothicMT-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 982,
			hhea: [
				2013,
				-463,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "NSimSun",
			aliases: ["NSimSun", "新宋体"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				36
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Nyala",
			aliases: ["Nyala", "Nyala-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1144,
			hhea: [
				1660,
				-480,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Onyx",
			aliases: ["Onyx"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 490,
			hhea: [
				1819,
				-372,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Palatino Linotype",
			aliases: ["Palatino Linotype", "PalatinoLinotype-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 821,
			hhea: [
				2150,
				-613,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Palatino Linotype",
			aliases: ["Palatino Linotype", "PalatinoLinotype-Roman"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 912,
			hhea: [
				2150,
				-613,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Palatino Linotype",
			aliases: ["Palatino Linotype", "PalatinoLinotype-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 915,
			hhea: [
				2150,
				-613,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Palatino Linotype",
			aliases: ["Palatino Linotype", "PalatinoLinotype-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 940,
			hhea: [
				2150,
				-613,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Perpetua",
			aliases: ["Perpetua", "Perpetua-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 653,
			hhea: [
				1679,
				-668,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Perpetua",
			aliases: ["Perpetua"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 737,
			hhea: [
				1679,
				-668,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Perpetua",
			aliases: ["Perpetua", "Perpetua-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 796,
			hhea: [
				1679,
				-668,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Perpetua",
			aliases: ["Perpetua", "Perpetua-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 873,
			hhea: [
				1679,
				-668,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Perpetua Titling MT",
			aliases: ["Perpetua Titling MT", "PerpetuaTitlingMT-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1219,
			hhea: [
				1536,
				-512,
				375
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Perpetua Titling MT",
			aliases: ["Perpetua Titling MT", "PerpetuaTitlingMT-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1331,
			hhea: [
				1536,
				-512,
				416
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "PMingLiU",
			aliases: ["PMingLiU", "新細明體"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				820,
				-204,
				204
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "PMingLiU-ExtB",
			aliases: ["PMingLiU-ExtB", "新細明體-ExtB"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1024,
			xAvgCharWidth: 512,
			hhea: [
				820,
				-204,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Rockwell",
			aliases: ["Rockwell", "Rockwell-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 912,
			hhea: [
				1937,
				-468,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Rockwell",
			aliases: ["Rockwell"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 943,
			hhea: [
				1937,
				-468,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Rockwell",
			aliases: ["Rockwell", "Rockwell-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 971,
			hhea: [
				1937,
				-468,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Rockwell",
			aliases: ["Rockwell", "Rockwell-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1007,
			hhea: [
				1937,
				-468,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Rockwell Condensed",
			aliases: ["Rockwell Condensed", "Rockwell-Condensed"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 686,
			hhea: [
				1927,
				-481,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Rockwell Condensed",
			aliases: ["Rockwell Condensed", "Rockwell-CondensedBold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 848,
			hhea: [
				1927,
				-481,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Rockwell Extra Bold",
			aliases: ["Rockwell Extra Bold", "Rockwell-ExtraBold"],
			weight: 800,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1233,
			hhea: [
				1937,
				-468,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Segoe Print",
			aliases: ["Segoe Print", "SegoePrint-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1312,
			hhea: [
				2555,
				-1014,
				46
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Segoe Script",
			aliases: ["Segoe Script", "SegoeScript-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1390,
			hhea: [
				2230,
				-1014,
				45
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Segoe UI Historic",
			aliases: ["Segoe UI Historic", "SegoeUIHistoric"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1713,
			hhea: [
				2210,
				-514,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Segoe UI Symbol",
			aliases: ["Segoe UI Symbol", "SegoeUISymbol"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1444,
			hhea: [
				2210,
				-514,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "SimHei",
			aliases: ["SimHei", "黑体"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				36
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "SimSun",
			aliases: ["SimSun", "宋体"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				36
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "SimSun-ExtB",
			aliases: ["SimSun-ExtB"],
			weight: 400,
			style: "normal",
			unitsPerEm: 256,
			xAvgCharWidth: 128,
			hhea: [
				220,
				-36,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Stencil",
			aliases: ["Stencil"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1135,
			hhea: [
				1490,
				-558,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "STHupo",
			aliases: ["STHupo", "华文琥珀"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 443,
			hhea: [
				800,
				-233,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "STLiti",
			aliases: ["STLiti", "华文隶书"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 354,
			hhea: [
				800,
				-259,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "STXingkai",
			aliases: ["STXingkai", "华文行楷"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 313,
			hhea: [
				802,
				-289,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "STXinwei",
			aliases: ["STXinwei", "华文新魏"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 429,
			hhea: [
				800,
				-236,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "STZhongsong",
			aliases: ["STZhongsong", "华文中宋"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 492,
			hhea: [
				1007,
				-318,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Symbol",
			aliases: ["Symbol", "SymbolMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1229,
			hhea: [
				2059,
				-450,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Tahoma",
			aliases: ["Tahoma"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 910,
			hhea: [
				2049,
				-423,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Tahoma",
			aliases: ["Tahoma", "Tahoma-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1036,
			hhea: [
				2049,
				-423,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "TH SarabunPSK",
			aliases: ["TH SarabunPSK", "THSarabunPSK-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 376,
			hhea: [
				850,
				-460,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "TH SarabunPSK",
			aliases: ["TH SarabunPSK", "THSarabunPSK"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 374,
			hhea: [
				850,
				-460,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "TH SarabunPSK",
			aliases: ["TH SarabunPSK", "THSarabunPSK-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 399,
			hhea: [
				850,
				-460,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "TH SarabunPSK",
			aliases: ["TH SarabunPSK", "THSarabunPSK-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 396,
			hhea: [
				850,
				-460,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Times New Roman",
			aliases: ["Times New Roman", "TimesNewRomanPS-ItalicMT"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 823,
			hhea: [
				1825,
				-443,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Times New Roman",
			aliases: ["Times New Roman", "TimesNewRomanPSMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 821,
			hhea: [
				1825,
				-443,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Times New Roman",
			aliases: ["Times New Roman", "TimesNewRomanPS-BoldItalicMT"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 844,
			hhea: [
				1825,
				-443,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Times New Roman",
			aliases: ["Times New Roman", "TimesNewRomanPS-BoldMT"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 874,
			hhea: [
				1825,
				-443,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Trebuchet MS",
			aliases: ["Trebuchet MS", "Trebuchet-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 986,
			hhea: [
				1923,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Tunga",
			aliases: ["Tunga"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1123,
			hhea: [
				2048,
				-1352,
				224
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Tunga",
			aliases: ["Tunga", "Tunga-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1138,
			hhea: [
				2048,
				-1352,
				224
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Tw Cen MT",
			aliases: ["Tw Cen MT", "TwCenMT-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 785,
			hhea: [
				1753,
				-477,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Tw Cen MT",
			aliases: ["Tw Cen MT", "TwCenMT-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 817,
			hhea: [
				1753,
				-477,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Tw Cen MT",
			aliases: ["Tw Cen MT", "TwCenMT-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 781,
			hhea: [
				1753,
				-477,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Tw Cen MT",
			aliases: ["Tw Cen MT", "TwCenMT-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 860,
			hhea: [
				1753,
				-477,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Tw Cen MT Condensed",
			aliases: ["Tw Cen MT Condensed", "TwCenMT-Condensed"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 616,
			hhea: [
				1694,
				-494,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Tw Cen MT Condensed",
			aliases: ["Tw Cen MT Condensed", "TwCenMT-CondensedBold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 724,
			hhea: [
				1694,
				-494,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Tw Cen MT Condensed Extra Bold",
			aliases: ["Tw Cen MT Condensed Extra Bold", "TwCenMT-CondensedExtraBold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 780,
			hhea: [
				1788,
				-430,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Verdana",
			aliases: ["Verdana", "Verdana-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1041,
			hhea: [
				2059,
				-430,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Verdana",
			aliases: ["Verdana"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1041,
			hhea: [
				2059,
				-430,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Verdana",
			aliases: ["Verdana", "Verdana-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1163,
			hhea: [
				2059,
				-430,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Verdana",
			aliases: ["Verdana", "Verdana-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1163,
			hhea: [
				2059,
				-430,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Webdings",
			aliases: ["Webdings"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1989,
			hhea: [
				1638,
				-410,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Wide Latin",
			aliases: ["LatinWide", "Wide Latin"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1693,
			hhea: [
				1616,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Wingdings",
			aliases: ["Wingdings", "Wingdings-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1822,
			hhea: [
				1841,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Wingdings 2",
			aliases: ["Wingdings 2", "Wingdings2"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1700,
			hhea: [
				1727,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Wingdings 3",
			aliases: ["Wingdings 3", "Wingdings3"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1584,
			hhea: [
				1900,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Word Visi Glyphs",
			aliases: ["Word Visi Glyphs", "WordVisiGlyphs"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1862,
			hhea: [
				2048,
				0,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "office-mac",
			family: "Yu Gothic",
			aliases: [
				"Yu Gothic",
				"Yu Gothic Light",
				"YuGothic-Light",
				"游ゴシック",
				"游ゴシック Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1968,
			hhea: [
				1802,
				-455,
				1024
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Yu Gothic",
			aliases: [
				"Yu Gothic",
				"YuGothic-Regular",
				"游ゴシック"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1972,
			hhea: [
				1802,
				-455,
				1024
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Yu Gothic",
			aliases: [
				"Yu Gothic",
				"Yu Gothic Medium",
				"YuGothic-Medium",
				"游ゴシック",
				"游ゴシック Medium"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1972,
			hhea: [
				1802,
				-455,
				1024
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Yu Gothic",
			aliases: [
				"Yu Gothic",
				"YuGothic-Bold",
				"游ゴシック"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1975,
			hhea: [
				1802,
				-455,
				1024
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Yu Gothic UI",
			aliases: [
				"Yu Gothic UI",
				"Yu Gothic UI Light",
				"YuGothicUI-Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1080,
			hhea: [
				2210,
				-514,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Yu Gothic UI",
			aliases: [
				"Yu Gothic UI",
				"Yu Gothic UI Semilight",
				"YuGothicUI-Semilight"
			],
			weight: 350,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1094,
			hhea: [
				2210,
				-514,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Yu Gothic UI",
			aliases: ["Yu Gothic UI", "YuGothicUI-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1103,
			hhea: [
				2210,
				-514,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Yu Gothic UI",
			aliases: [
				"Yu Gothic UI",
				"Yu Gothic UI Semibold",
				"YuGothicUI-Semibold"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1208,
			hhea: [
				2210,
				-514,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Yu Gothic UI",
			aliases: ["Yu Gothic UI", "YuGothicUI-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1208,
			hhea: [
				2210,
				-514,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Yu Mincho",
			aliases: [
				"Yu Mincho",
				"Yu Mincho Light",
				"YuMincho-Light",
				"游明朝",
				"游明朝 Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1981,
			hhea: [
				1802,
				-455,
				1024
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Yu Mincho",
			aliases: [
				"Yu Mincho",
				"YuMincho-Regular",
				"游明朝"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1984,
			hhea: [
				1802,
				-455,
				1024
			],
			farEastCodePage: !0
		},
		{
			source: "office-mac",
			family: "Yu Mincho",
			aliases: [
				"Yu Mincho",
				"Yu Mincho Demibold",
				"YuMincho-Demibold",
				"游明朝",
				"游明朝 Demibold"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1984,
			hhea: [
				1802,
				-455,
				1024
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Apple Color Emoji UI",
			aliases: [".Apple Color Emoji UI", ".AppleColorEmojiUI"],
			weight: 400,
			style: "normal",
			unitsPerEm: 800,
			xAvgCharWidth: 733,
			hhea: [
				773,
				-169,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".Apple SD Gothic NeoI",
			aliases: [
				".Apple SD Gothic NeoI",
				".AppleSDGothicNeoI-Thin",
				"Apple SD 산돌고딕 Neo"
			],
			weight: 100,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 845,
			hhea: [
				860,
				-140,
				30
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Apple SD Gothic NeoI",
			aliases: [
				".Apple SD Gothic NeoI",
				".AppleSDGothicNeoI-UltraLight",
				"Apple SD 산돌고딕 Neo"
			],
			weight: 200,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 846,
			hhea: [
				860,
				-140,
				30
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Apple SD Gothic NeoI",
			aliases: [
				".Apple SD Gothic NeoI",
				".AppleSDGothicNeoI-Light",
				"Apple SD 산돌고딕 Neo"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 846,
			hhea: [
				860,
				-140,
				30
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Apple SD Gothic NeoI",
			aliases: [
				".Apple SD Gothic NeoI",
				".AppleSDGothicNeoI-Regular",
				"Apple SD 산돌고딕 Neo"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 847,
			hhea: [
				860,
				-140,
				30
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Apple SD Gothic NeoI",
			aliases: [
				".Apple SD Gothic NeoI",
				".AppleSDGothicNeoI-Medium",
				"Apple SD 산돌고딕 Neo"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 847,
			hhea: [
				860,
				-140,
				30
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Apple SD Gothic NeoI",
			aliases: [
				".Apple SD Gothic NeoI",
				".AppleSDGothicNeoI-SemiBold",
				"Apple SD 산돌고딕 Neo"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 847,
			hhea: [
				860,
				-140,
				30
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Apple SD Gothic NeoI",
			aliases: [
				".Apple SD Gothic NeoI",
				".AppleSDGothicNeoI-Bold",
				"Apple SD 산돌고딕 Neo"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 847,
			hhea: [
				860,
				-140,
				30
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Apple SD Gothic NeoI",
			aliases: [
				".Apple SD Gothic NeoI",
				".AppleSDGothicNeoI-ExtraBold",
				"Apple SD 산돌고딕 Neo"
			],
			weight: 800,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 858,
			hhea: [
				860,
				-140,
				30
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Apple SD Gothic NeoI",
			aliases: [
				".Apple SD Gothic NeoI",
				".AppleSDGothicNeoI-Heavy",
				"Apple SD 산돌고딕 Neo"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 858,
			hhea: [
				860,
				-140,
				30
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Aqua Kana",
			aliases: [
				".Aqua Kana",
				".Aqua かな",
				"AquaKana"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: -544,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Aqua Kana",
			aliases: [
				".Aqua Kana",
				".Aqua Kana Bold",
				".Aqua かな",
				".Aqua かな ボールド",
				"AquaKana-Bold"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: -970,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Arial Hebrew Desk Interface",
			aliases: [".Arial Hebrew Desk Interface", ".ArialHebrewDeskInterface-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 879,
			xAvgCharWidth: 916,
			hhea: [
				850,
				-185,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".Arial Hebrew Desk Interface",
			aliases: [".Arial Hebrew Desk Interface", ".ArialHebrewDeskInterface"],
			weight: 400,
			style: "normal",
			unitsPerEm: 879,
			xAvgCharWidth: 960,
			hhea: [
				850,
				-185,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".Arial Hebrew Desk Interface",
			aliases: [".Arial Hebrew Desk Interface", ".ArialHebrewDeskInterface-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 866,
			xAvgCharWidth: 1021,
			hhea: [
				837,
				-183,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".DecoType Nastaleeq Urdu UI",
			aliases: [".DecoType Nastaleeq Urdu UI", ".DecoTypeNastaleeqUrduUI-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 1391,
			hhea: [
				952,
				-241,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".DecoType Nastaleeq Urdu UI",
			aliases: [".DecoType Nastaleeq Urdu UI", ".DecoTypeNastaleeqUrduUI-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 935,
			xAvgCharWidth: 1413,
			hhea: [
				952,
				-241,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".Geeza Pro Interface",
			aliases: [".Geeza Pro Interface", ".GeezaProInterface-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 2212,
			xAvgCharWidth: 1550,
			hhea: [
				1980,
				-732,
				300
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".Geeza Pro Interface",
			aliases: [".Geeza Pro Interface", ".GeezaProInterface"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2212,
			xAvgCharWidth: 1061,
			hhea: [
				1980,
				-732,
				300
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".Geeza Pro Interface",
			aliases: [".Geeza Pro Interface", ".GeezaProInterface-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2212,
			xAvgCharWidth: 1224,
			hhea: [
				1980,
				-732,
				300
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".Geeza Pro PUA",
			aliases: [".Geeza Pro PUA", ".GeezaProPUA"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2212,
			xAvgCharWidth: 1061,
			hhea: [
				1980,
				-732,
				300
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".Geeza Pro PUA",
			aliases: [".Geeza Pro PUA", ".GeezaProPUA-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2212,
			xAvgCharWidth: 1224,
			hhea: [
				1980,
				-732,
				300
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".Hiragino Kaku Gothic Interface",
			aliases: [".Hiragino Kaku Gothic Interface", ".HiraKakuInterface-W0"],
			weight: 100,
			style: "normal",
			unitsPerEm: 1083,
			xAvgCharWidth: 497,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Hiragino Kaku Gothic Interface",
			aliases: [".Hiragino Kaku Gothic Interface", ".HiraKakuInterface-W1"],
			weight: 200,
			style: "normal",
			unitsPerEm: 1083,
			xAvgCharWidth: 517,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Hiragino Kaku Gothic Interface",
			aliases: [".Hiragino Kaku Gothic Interface", ".HiraKakuInterface-W2"],
			weight: 250,
			style: "normal",
			unitsPerEm: 1083,
			xAvgCharWidth: 529,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Hiragino Kaku Gothic Interface",
			aliases: [".Hiragino Kaku Gothic Interface", ".HiraKakuInterface-W3"],
			weight: 300,
			style: "normal",
			unitsPerEm: 1083,
			xAvgCharWidth: 544,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Hiragino Kaku Gothic Interface",
			aliases: [".Hiragino Kaku Gothic Interface", ".HiraKakuInterface-W4"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1083,
			xAvgCharWidth: 563,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Hiragino Kaku Gothic Interface",
			aliases: [".Hiragino Kaku Gothic Interface", ".HiraKakuInterface-W5"],
			weight: 500,
			style: "normal",
			unitsPerEm: 1083,
			xAvgCharWidth: 577,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Hiragino Kaku Gothic Interface",
			aliases: [".Hiragino Kaku Gothic Interface", ".HiraKakuInterface-W6"],
			weight: 600,
			style: "normal",
			unitsPerEm: 1083,
			xAvgCharWidth: 600,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Hiragino Kaku Gothic Interface",
			aliases: [".Hiragino Kaku Gothic Interface", ".HiraKakuInterface-W7"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1083,
			xAvgCharWidth: 628,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Hiragino Kaku Gothic Interface",
			aliases: [".Hiragino Kaku Gothic Interface", ".HiraKakuInterface-W8"],
			weight: 800,
			style: "normal",
			unitsPerEm: 1083,
			xAvgCharWidth: 660,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Hiragino Kaku Gothic Interface",
			aliases: [".Hiragino Kaku Gothic Interface", ".HiraKakuInterface-W9"],
			weight: 900,
			style: "normal",
			unitsPerEm: 1083,
			xAvgCharWidth: 699,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Hiragino Sans GB Interface",
			aliases: [
				".Hiragino Sans GB Interface",
				".Hiragino Sans GB Interface W3",
				".HiraginoSansGBInterface-W3"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1083,
			xAvgCharWidth: 544,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Hiragino Sans GB Interface",
			aliases: [
				".Hiragino Sans GB Interface",
				".Hiragino Sans GB Interface W6",
				".HiraginoSansGBInterface-W6"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1109,
			xAvgCharWidth: 600,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: ".Keyboard",
			aliases: [".Keyboard"],
			weight: 100,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: -1910,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".LastResort",
			aliases: [".LastResort", "LastResort"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: null,
			hhea: [
				1950,
				-494,
				0
			],
			farEastCodePage: null
		},
		{
			source: "macos-system",
			family: ".Lucida Grande UI",
			aliases: [".Lucida Grande UI", ".LucidaGrandeUI"],
			weight: 500,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: -1003,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".Lucida Grande UI",
			aliases: [".Lucida Grande UI", ".LucidaGrandeUI-Bold"],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: -1071,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".Noto Nastaliq Urdu UI",
			aliases: [".Noto Nastaliq Urdu UI", ".NotoNastaliqUrduUI"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1440,
			xAvgCharWidth: 553,
			hhea: [
				2076,
				-636,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: ".Noto Nastaliq Urdu UI",
			aliases: [".Noto Nastaliq Urdu UI", ".NotoNastaliqUrduUI-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1440,
			xAvgCharWidth: 609,
			hhea: [
				2076,
				-636,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Apple Braille",
			aliases: ["Apple Braille", "AppleBraille"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1370,
			hhea: [
				1600,
				-512,
				171
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Apple Braille",
			aliases: ["Apple Braille", "AppleBraille-Outline6Dot"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1370,
			hhea: [
				1600,
				-512,
				171
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Apple Braille",
			aliases: ["Apple Braille", "AppleBraille-Outline8Dot"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1370,
			hhea: [
				1600,
				-512,
				171
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Apple Braille",
			aliases: ["Apple Braille", "AppleBraille-Pinpoint6Dot"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1370,
			hhea: [
				1600,
				-512,
				171
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Apple Braille",
			aliases: ["Apple Braille", "AppleBraille-Pinpoint8Dot"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1370,
			hhea: [
				1600,
				-512,
				171
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Apple Color Emoji",
			aliases: ["Apple Color Emoji", "AppleColorEmoji"],
			weight: 400,
			style: "normal",
			unitsPerEm: 800,
			xAvgCharWidth: 733,
			hhea: [
				800,
				-250,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Apple SD Gothic Neo",
			aliases: [
				"Apple SD Gothic Neo",
				"Apple SD 산돌고딕 Neo",
				"AppleSDGothicNeo-Thin"
			],
			weight: 100,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 845,
			hhea: [
				900,
				-300,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Apple SD Gothic Neo",
			aliases: [
				"Apple SD Gothic Neo",
				"Apple SD 산돌고딕 Neo",
				"AppleSDGothicNeo-UltraLight"
			],
			weight: 200,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 846,
			hhea: [
				900,
				-300,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Apple SD Gothic Neo",
			aliases: [
				"Apple SD Gothic Neo",
				"Apple SD 산돌고딕 Neo",
				"AppleSDGothicNeo-Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 846,
			hhea: [
				900,
				-300,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Apple SD Gothic Neo",
			aliases: [
				"Apple SD Gothic Neo",
				"Apple SD 산돌고딕 Neo",
				"AppleSDGothicNeo-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 847,
			hhea: [
				900,
				-300,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Apple SD Gothic Neo",
			aliases: [
				"Apple SD Gothic Neo",
				"Apple SD 산돌고딕 Neo",
				"AppleSDGothicNeo-Medium"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 847,
			hhea: [
				900,
				-300,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Apple SD Gothic Neo",
			aliases: [
				"Apple SD Gothic Neo",
				"Apple SD 산돌고딕 Neo",
				"AppleSDGothicNeo-SemiBold"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 847,
			hhea: [
				900,
				-300,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Apple SD Gothic Neo",
			aliases: [
				"Apple SD Gothic Neo",
				"Apple SD 산돌고딕 Neo",
				"AppleSDGothicNeo-Bold"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 847,
			hhea: [
				900,
				-300,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Apple SD Gothic Neo",
			aliases: [
				"Apple SD Gothic Neo",
				"Apple SD 산돌고딕 Neo",
				"AppleSDGothicNeo-ExtraBold"
			],
			weight: 800,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 858,
			hhea: [
				900,
				-300,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Apple SD Gothic Neo",
			aliases: [
				"Apple SD Gothic Neo",
				"Apple SD 산돌고딕 Neo",
				"AppleSDGothicNeo-Heavy"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 858,
			hhea: [
				900,
				-300,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Apple Symbols",
			aliases: ["Apple Symbols", "AppleSymbols"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1342,
			hhea: [
				1365,
				-512,
				171
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Arial Hebrew",
			aliases: ["Arial Hebrew", "ArialHebrew-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 916,
			hhea: [
				730,
				-335,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Arial Hebrew",
			aliases: ["Arial Hebrew", "ArialHebrew"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 960,
			hhea: [
				730,
				-335,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Arial Hebrew",
			aliases: ["Arial Hebrew", "ArialHebrew-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 1021,
			hhea: [
				730,
				-335,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Arial Hebrew Scholar",
			aliases: ["Arial Hebrew Scholar", "ArialHebrewScholar-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 916,
			hhea: [
				730,
				-335,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Arial Hebrew Scholar",
			aliases: ["Arial Hebrew Scholar", "ArialHebrewScholar"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 960,
			hhea: [
				730,
				-335,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Arial Hebrew Scholar",
			aliases: ["Arial Hebrew Scholar", "ArialHebrewScholar-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 1021,
			hhea: [
				730,
				-335,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir",
			aliases: [
				"Avenir",
				"Avenir Light",
				"Avenir-LightOblique"
			],
			weight: 300,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 522,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir",
			aliases: [
				"Avenir",
				"Avenir Light",
				"Avenir-Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 522,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir",
			aliases: [
				"Avenir",
				"Avenir Book",
				"Avenir-BookOblique"
			],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 527,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir",
			aliases: ["Avenir", "Avenir-Oblique"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 529,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir",
			aliases: [
				"Avenir",
				"Avenir Book",
				"Avenir-Book"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 527,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir",
			aliases: ["Avenir", "Avenir-Roman"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 529,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir",
			aliases: [
				"Avenir",
				"Avenir Medium",
				"Avenir-MediumOblique"
			],
			weight: 500,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 535,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir",
			aliases: [
				"Avenir",
				"Avenir Medium",
				"Avenir-Medium"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 535,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir",
			aliases: [
				"Avenir",
				"Avenir Black Oblique",
				"Avenir-BlackOblique"
			],
			weight: 800,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 557,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir",
			aliases: [
				"Avenir",
				"Avenir Black",
				"Avenir-Black"
			],
			weight: 800,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 557,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir",
			aliases: [
				"Avenir",
				"Avenir Heavy",
				"Avenir-HeavyOblique"
			],
			weight: 900,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 548,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir",
			aliases: [
				"Avenir",
				"Avenir Heavy",
				"Avenir-Heavy"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 548,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next",
			aliases: [
				"Avenir Next",
				"Avenir Next Ultra Light",
				"AvenirNext-UltraLight"
			],
			weight: 275,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 512,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next",
			aliases: [
				"Avenir Next",
				"Avenir Next Ultra Light",
				"AvenirNext-UltraLightItalic"
			],
			weight: 275,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 505,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next",
			aliases: ["Avenir Next", "AvenirNext-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 450,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next",
			aliases: ["Avenir Next", "AvenirNext-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 455,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next",
			aliases: [
				"Avenir Next",
				"Avenir Next Medium",
				"AvenirNext-MediumItalic"
			],
			weight: 500,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 454,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next",
			aliases: [
				"Avenir Next",
				"Avenir Next Medium",
				"AvenirNext-Medium"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 459,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next",
			aliases: [
				"Avenir Next",
				"Avenir Next Demi Bold",
				"AvenirNext-DemiBoldItalic"
			],
			weight: 600,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 458,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next",
			aliases: [
				"Avenir Next",
				"Avenir Next Demi Bold",
				"AvenirNext-DemiBold"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 462,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next",
			aliases: ["Avenir Next", "AvenirNext-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 481,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next",
			aliases: ["Avenir Next", "AvenirNext-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 486,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next",
			aliases: [
				"Avenir Next",
				"Avenir Next Heavy",
				"AvenirNext-HeavyItalic"
			],
			weight: 900,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 607,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next",
			aliases: [
				"Avenir Next",
				"Avenir Next Heavy",
				"AvenirNext-Heavy"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 612,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next Condensed",
			aliases: [
				"Avenir Next Condensed",
				"Avenir Next Condensed Ultra Light",
				"AvenirNextCondensed-UltraLight"
			],
			weight: 275,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 384,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next Condensed",
			aliases: [
				"Avenir Next Condensed",
				"Avenir Next Condensed Ultra Light",
				"AvenirNextCondensed-UltraLightItalic"
			],
			weight: 275,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 384,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next Condensed",
			aliases: ["Avenir Next Condensed", "AvenirNextCondensed-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 344,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next Condensed",
			aliases: ["Avenir Next Condensed", "AvenirNextCondensed-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 348,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next Condensed",
			aliases: [
				"Avenir Next Condensed",
				"Avenir Next Condensed Medium",
				"AvenirNextCondensed-MediumItalic"
			],
			weight: 500,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 355,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next Condensed",
			aliases: [
				"Avenir Next Condensed",
				"Avenir Next Condensed Medium",
				"AvenirNextCondensed-Medium"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 361,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next Condensed",
			aliases: [
				"Avenir Next Condensed",
				"Avenir Next Condensed Demi Bold",
				"AvenirNextCondensed-DemiBoldItalic"
			],
			weight: 600,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 372,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next Condensed",
			aliases: [
				"Avenir Next Condensed",
				"Avenir Next Condensed Demi Bold",
				"AvenirNextCondensed-DemiBold"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 377,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next Condensed",
			aliases: ["Avenir Next Condensed", "AvenirNextCondensed-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 393,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next Condensed",
			aliases: ["Avenir Next Condensed", "AvenirNextCondensed-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 404,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next Condensed",
			aliases: [
				"Avenir Next Condensed",
				"Avenir Next Condensed Heavy",
				"AvenirNextCondensed-Heavy"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 501,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Avenir Next Condensed",
			aliases: [
				"Avenir Next Condensed",
				"Avenir Next Condensed Heavy",
				"AvenirNextCondensed-HeavyItalic"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 496,
			hhea: [
				1e3,
				-366,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Courier",
			aliases: ["Courier", "Courier-BoldOblique"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: null,
			hhea: [
				1544,
				-504,
				0
			],
			farEastCodePage: null
		},
		{
			source: "macos-system",
			family: "Courier",
			aliases: ["Courier", "Courier-Oblique"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: null,
			hhea: [
				1544,
				-504,
				0
			],
			farEastCodePage: null
		},
		{
			source: "macos-system",
			family: "Courier",
			aliases: ["Courier", "Courier-Bold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: null,
			hhea: [
				1544,
				-504,
				0
			],
			farEastCodePage: null
		},
		{
			source: "macos-system",
			family: "Courier",
			aliases: ["Courier"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: null,
			hhea: [
				1544,
				-504,
				0
			],
			farEastCodePage: null
		},
		{
			source: "macos-system",
			family: "Geeza Pro",
			aliases: [
				"Geeza Pro",
				"GeezaPro",
				"جيزة",
				"گیزا پرو",
				"गीज़ा प्रो"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2212,
			xAvgCharWidth: 1061,
			hhea: [
				1980,
				-732,
				300
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Geeza Pro",
			aliases: [
				"Geeza Pro",
				"GeezaPro-Bold",
				"جيزة",
				"گیزا پرو",
				"गीज़ा प्रो"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2212,
			xAvgCharWidth: 1224,
			hhea: [
				1980,
				-732,
				300
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Geneva",
			aliases: ["Geneva"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1258,
			hhea: [
				2048,
				-512,
				171
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Heiti SC",
			aliases: [
				"Heiti SC",
				"Heiti-간체",
				"STHeitiSC-Light",
				"黑体-简",
				"黑體-簡",
				"黒体-簡"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 997,
			hhea: [
				860,
				-140,
				30
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Heiti SC",
			aliases: [
				"Heiti SC",
				"Heiti-간체",
				"STHeitiSC-Medium",
				"黑体-简",
				"黑體-簡",
				"黒体-簡"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 997,
			hhea: [
				860,
				-140,
				30
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Heiti TC",
			aliases: [
				"Heiti TC",
				"Heiti-번체",
				"STHeitiTC-Light",
				"黑体-繁",
				"黑體-繁",
				"黒体-繁"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 997,
			hhea: [
				860,
				-140,
				30
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Heiti TC",
			aliases: [
				"Heiti TC",
				"Heiti-번체",
				"STHeitiTC-Medium",
				"黑体-繁",
				"黑體-繁",
				"黒体-繁"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 997,
			hhea: [
				860,
				-140,
				30
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Helvetica",
			aliases: ["Helvetica", "Helvetica-LightOblique"],
			weight: 300,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 603,
			hhea: [
				770,
				-230,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica",
			aliases: ["Helvetica", "Helvetica-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 600,
			hhea: [
				770,
				-230,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica",
			aliases: ["Helvetica", "Helvetica-Oblique"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: -904,
			hhea: [
				1577,
				-471,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica",
			aliases: ["Helvetica"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 904,
			hhea: [
				1577,
				-471,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica",
			aliases: ["Helvetica", "Helvetica-BoldOblique"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1270,
			hhea: [
				1577,
				-471,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica",
			aliases: ["Helvetica", "Helvetica-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1273,
			hhea: [
				1577,
				-471,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue-UltraLightItalic"],
			weight: 100,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 395,
			hhea: [
				931,
				-213,
				27
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue-UltraLight"],
			weight: 100,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 395,
			hhea: [
				931,
				-213,
				27
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue-ThinItalic"],
			weight: 200,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 515,
			hhea: [
				967,
				-213,
				29
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue-Thin"],
			weight: 200,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 515,
			hhea: [
				967,
				-213,
				29
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue-LightItalic"],
			weight: 300,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 428,
			hhea: [
				951,
				-213,
				28
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 429,
			hhea: [
				967,
				-213,
				29
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 444,
			hhea: [
				957,
				-213,
				28
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 447,
			hhea: [
				952,
				-213,
				28
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue-Medium"],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 463,
			hhea: [
				975,
				-217,
				29
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue-MediumItalic"],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 463,
			hhea: [
				975,
				-217,
				29
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 479,
			hhea: [
				975,
				-217,
				29
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 478,
			hhea: [
				975,
				-217,
				29
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue-CondensedBold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 400,
			hhea: [
				961,
				-221,
				28
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Helvetica Neue",
			aliases: ["Helvetica Neue", "HelveticaNeue-CondensedBlack"],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 420,
			hhea: [
				972,
				-227,
				28
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Hiragino Kaku Gothic Pro",
			aliases: [
				"Hiragino Kaku Gothic Pro",
				"Hiragino Kaku Gothic Pro W3",
				"HiraKakuPro-W3",
				"ヒラギノ角ゴ Pro",
				"ヒラギノ角ゴ Pro W3"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 544,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Kaku Gothic Pro",
			aliases: [
				"Hiragino Kaku Gothic Pro",
				"Hiragino Kaku Gothic Pro W6",
				"HiraKakuPro-W6",
				"ヒラギノ角ゴ Pro",
				"ヒラギノ角ゴ Pro W6"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 600,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Kaku Gothic ProN",
			aliases: [
				"Hiragino Kaku Gothic ProN",
				"Hiragino Kaku Gothic ProN W3",
				"HiraKakuProN-W3",
				"ヒラギノ角ゴ ProN",
				"ヒラギノ角ゴ ProN W3"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 544,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Kaku Gothic ProN",
			aliases: [
				"Hiragino Kaku Gothic ProN",
				"Hiragino Kaku Gothic ProN W6",
				"HiraKakuProN-W6",
				"ヒラギノ角ゴ ProN",
				"ヒラギノ角ゴ ProN W6"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 600,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Kaku Gothic Std",
			aliases: [
				"Hiragino Kaku Gothic Std",
				"Hiragino Kaku Gothic Std W8",
				"HiraKakuStd-W8",
				"ヒラギノ角ゴ Std",
				"ヒラギノ角ゴ Std W8"
			],
			weight: 800,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 660,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Kaku Gothic StdN",
			aliases: [
				"Hiragino Kaku Gothic StdN",
				"Hiragino Kaku Gothic StdN W8",
				"HiraKakuStdN-W8",
				"ヒラギノ角ゴ StdN",
				"ヒラギノ角ゴ StdN W8"
			],
			weight: 800,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 660,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Maru Gothic Pro",
			aliases: [
				"Hiragino Maru Gothic Pro",
				"Hiragino Maru Gothic Pro W4",
				"HiraMaruPro-W4",
				"ヒラギノ丸ゴ Pro",
				"ヒラギノ丸ゴ Pro W4"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 534,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Maru Gothic ProN",
			aliases: [
				"Hiragino Maru Gothic ProN",
				"Hiragino Maru Gothic ProN W4",
				"HiraMaruProN-W4",
				"ヒラギノ丸ゴ ProN",
				"ヒラギノ丸ゴ ProN W4"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 534,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Mincho Pro",
			aliases: [
				"Hiragino Mincho Pro",
				"Hiragino Mincho Pro W3",
				"HiraMinPro-W3",
				"ヒラギノ明朝 Pro",
				"ヒラギノ明朝 Pro W3"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 521,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Mincho Pro",
			aliases: [
				"Hiragino Mincho Pro",
				"Hiragino Mincho Pro W6",
				"HiraMinPro-W6",
				"ヒラギノ明朝 Pro",
				"ヒラギノ明朝 Pro W6"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 554,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Mincho ProN",
			aliases: [
				"Hiragino Mincho ProN",
				"Hiragino Mincho ProN W3",
				"HiraMinProN-W3",
				"ヒラギノ明朝 ProN",
				"ヒラギノ明朝 ProN W3"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 521,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Mincho ProN",
			aliases: [
				"Hiragino Mincho ProN",
				"Hiragino Mincho ProN W6",
				"HiraMinProN-W6",
				"ヒラギノ明朝 ProN",
				"ヒラギノ明朝 ProN W6"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 554,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Sans",
			aliases: [
				"Hiragino Sans",
				"Hiragino Sans W0",
				"HiraginoSans-W0",
				"ヒラギノ角ゴシック",
				"ヒラギノ角ゴシック W0"
			],
			weight: 100,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 497,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Sans",
			aliases: [
				"Hiragino Sans",
				"Hiragino Sans W1",
				"HiraginoSans-W1",
				"ヒラギノ角ゴシック",
				"ヒラギノ角ゴシック W1"
			],
			weight: 200,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 517,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Sans",
			aliases: [
				"Hiragino Sans",
				"Hiragino Sans W2",
				"HiraginoSans-W2",
				"ヒラギノ角ゴシック",
				"ヒラギノ角ゴシック W2"
			],
			weight: 250,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 529,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Sans",
			aliases: [
				"Hiragino Sans",
				"Hiragino Sans W3",
				"HiraginoSans-W3",
				"ヒラギノ角ゴシック",
				"ヒラギノ角ゴシック W3"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 544,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Sans",
			aliases: [
				"Hiragino Sans",
				"Hiragino Sans W4",
				"HiraginoSans-W4",
				"ヒラギノ角ゴシック",
				"ヒラギノ角ゴシック W4"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 563,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Sans",
			aliases: [
				"Hiragino Sans",
				"Hiragino Sans W5",
				"HiraginoSans-W5",
				"ヒラギノ角ゴシック",
				"ヒラギノ角ゴシック W5"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 577,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Sans",
			aliases: [
				"Hiragino Sans",
				"Hiragino Sans W6",
				"HiraginoSans-W6",
				"ヒラギノ角ゴシック",
				"ヒラギノ角ゴシック W6"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 600,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Sans",
			aliases: [
				"Hiragino Sans",
				"Hiragino Sans W7",
				"HiraginoSans-W7",
				"ヒラギノ角ゴシック",
				"ヒラギノ角ゴシック W7"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 628,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Sans",
			aliases: [
				"Hiragino Sans",
				"Hiragino Sans W8",
				"HiraginoSans-W8",
				"ヒラギノ角ゴシック",
				"ヒラギノ角ゴシック W8"
			],
			weight: 800,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 660,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Sans",
			aliases: [
				"Hiragino Sans",
				"Hiragino Sans W9",
				"HiraginoSans-W9",
				"ヒラギノ角ゴシック",
				"ヒラギノ角ゴシック W9"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 699,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Sans GB",
			aliases: [
				"Hiragino Sans GB",
				"Hiragino Sans GB W3",
				"HiraginoSansGB-W3",
				"ヒラギノ角ゴ 簡体中文",
				"ヒラギノ角ゴ 簡体中文 W3",
				"冬青黑体简体中文",
				"冬青黑体简体中文 W3",
				"冬青黑體簡體中文",
				"冬青黑體簡體中文 W3"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 544,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Hiragino Sans GB",
			aliases: [
				"Hiragino Sans GB",
				"Hiragino Sans GB W6",
				"HiraginoSansGB-W6",
				"ヒラギノ角ゴ 簡体中文",
				"ヒラギノ角ゴ 簡体中文 W6",
				"冬青黑体简体中文",
				"冬青黑体简体中文 W6",
				"冬青黑體簡體中文",
				"冬青黑體簡體中文 W6"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 600,
			hhea: [
				880,
				-120,
				500
			],
			farEastCodePage: !0
		},
		{
			source: "macos-system",
			family: "Kohinoor Bangla",
			aliases: [
				"Kohinoor Bangla",
				"KohinoorBangla-Light",
				"कोहिनूर बांग्ला",
				"কোহিনূর বাংলা"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 638,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Bangla",
			aliases: [
				"Kohinoor Bangla",
				"KohinoorBangla-Regular",
				"कोहिनूर बांग्ला",
				"কোহিনূর বাংলা"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 650,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Bangla",
			aliases: [
				"Kohinoor Bangla",
				"KohinoorBangla-Medium",
				"कोहिनूर बांग्ला",
				"কোহিনূর বাংলা"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 663,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Bangla",
			aliases: [
				"Kohinoor Bangla",
				"KohinoorBangla-Semibold",
				"कोहिनूर बांग्ला",
				"কোহিনূর বাংলা"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 678,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Bangla",
			aliases: [
				"Kohinoor Bangla",
				"KohinoorBangla-Bold",
				"कोहिनूर बांग्ला",
				"কোহিনূর বাংলা"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 696,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Devanagari",
			aliases: [
				"Kohinoor Devanagari",
				"KohinoorDevanagari-Light",
				"कोहिनूर देवनागरी"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 647,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Devanagari",
			aliases: [
				"Kohinoor Devanagari",
				"KohinoorDevanagari-Regular",
				"कोहिनूर देवनागरी"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 656,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Devanagari",
			aliases: [
				"Kohinoor Devanagari",
				"KohinoorDevanagari-Medium",
				"कोहिनूर देवनागरी"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 667,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Devanagari",
			aliases: [
				"Kohinoor Devanagari",
				"KohinoorDevanagari-Semibold",
				"कोहिनूर देवनागरी"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 679,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Devanagari",
			aliases: [
				"Kohinoor Devanagari",
				"KohinoorDevanagari-Bold",
				"कोहिनूर देवनागरी"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 693,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Gujarati",
			aliases: [
				"Kohinoor Gujarati",
				"KohinoorGujarati-Light",
				"कोहिनूर गुजराती",
				"કોહિનૂર ગુજરાતી"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 805,
			hhea: [
				1050,
				-450,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Gujarati",
			aliases: [
				"Kohinoor Gujarati",
				"KohinoorGujarati-Regular",
				"कोहिनूर गुजराती",
				"કોહિનૂર ગુજરાતી"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 817,
			hhea: [
				1050,
				-450,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Gujarati",
			aliases: [
				"Kohinoor Gujarati",
				"KohinoorGujarati-Medium",
				"कोहिनूर गुजराती",
				"કોહિનૂર ગુજરાતી"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 831,
			hhea: [
				1050,
				-450,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Gujarati",
			aliases: [
				"Kohinoor Gujarati",
				"KohinoorGujarati-Semibold",
				"कोहिनूर गुजराती",
				"કોહિનૂર ગુજરાતી"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 847,
			hhea: [
				1050,
				-450,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Gujarati",
			aliases: [
				"Kohinoor Gujarati",
				"KohinoorGujarati-Bold",
				"कोहिनूर गुजराती",
				"કોહિનૂર ગુજરાતી"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 865,
			hhea: [
				1050,
				-450,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Telugu",
			aliases: [
				"Kohinoor Telugu",
				"KohinoorTelugu-Light",
				"कोहिनूर तेलुगु",
				"కోహినూర్ తెలుగు"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 743,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Telugu",
			aliases: [
				"Kohinoor Telugu",
				"KohinoorTelugu-Regular",
				"कोहिनूर तेलुगु",
				"కోహినూర్ తెలుగు"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 755,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Telugu",
			aliases: [
				"Kohinoor Telugu",
				"KohinoorTelugu-Medium",
				"कोहिनूर तेलुगु",
				"కోహినూర్ తెలుగు"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 768,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Telugu",
			aliases: [
				"Kohinoor Telugu",
				"KohinoorTelugu-Semibold",
				"कोहिनूर तेलुगु",
				"కోహినూర్ తెలుగు"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 784,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Kohinoor Telugu",
			aliases: [
				"Kohinoor Telugu",
				"KohinoorTelugu-Bold",
				"कोहिनूर तेलुगु",
				"కోహినూర్ తెలుగు"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 801,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Lucida Grande",
			aliases: ["Lucida Grande", "LucidaGrande"],
			weight: 500,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: -1003,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Lucida Grande",
			aliases: ["Lucida Grande", "LucidaGrande-Bold"],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: -1071,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Marker Felt",
			aliases: ["Marker Felt", "MarkerFelt-Thin"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 375,
			hhea: [
				868,
				-218,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Marker Felt",
			aliases: ["Marker Felt", "MarkerFelt-Wide"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: -417,
			hhea: [
				908,
				-237,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Menlo",
			aliases: ["Menlo", "Menlo-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1233,
			hhea: [
				1901,
				-483,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Menlo",
			aliases: ["Menlo", "Menlo-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1233,
			hhea: [
				1901,
				-483,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Menlo",
			aliases: ["Menlo", "Menlo-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1233,
			hhea: [
				1901,
				-483,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Menlo",
			aliases: ["Menlo", "Menlo-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1233,
			hhea: [
				1901,
				-483,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Monaco",
			aliases: ["Monaco"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1228,
			hhea: [
				2048,
				-512,
				171
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Mukta Mahee",
			aliases: [
				"Mukta Mahee",
				"MuktaMahee ExtraLight",
				"MuktaMahee-ExtraLight",
				"मुक्ता माही",
				"मुक्ता माही एक्स्ट्रा लाइट",
				"ਮੁਕਤਾ ਮਾਹੀ",
				"ਮੁਕਤਾ ਮਾਹੀ ਐਕਸਟ੍ਰਾਲਾਈਟ"
			],
			weight: 200,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 488,
			hhea: [
				1130,
				-532,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Mukta Mahee",
			aliases: [
				"Mukta Mahee",
				"MuktaMahee Light",
				"MuktaMahee-Light",
				"मुक्ता माही",
				"मुक्ता माही लाइट",
				"ਮੁਕਤਾ ਮਾਹੀ",
				"ਮੁਕਤਾ ਮਾਹੀ ਲਾਈਟ"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 496,
			hhea: [
				1130,
				-532,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Mukta Mahee",
			aliases: [
				"Mukta Mahee",
				"MuktaMahee Regular",
				"MuktaMahee-Regular",
				"मुक्ता माही",
				"ਮੁਕਤਾ ਮਾਹੀ"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 505,
			hhea: [
				1130,
				-532,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Mukta Mahee",
			aliases: [
				"Mukta Mahee",
				"MuktaMahee Medium",
				"MuktaMahee-Medium",
				"मुक्ता माही",
				"मुक्ता माही मीडियम",
				"ਮੁਕਤਾ ਮਾਹੀ",
				"ਮੁਕਤਾ ਮਾਹੀ ਮੀਡੀਅਮ"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 513,
			hhea: [
				1130,
				-532,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Mukta Mahee",
			aliases: [
				"Mukta Mahee",
				"MuktaMahee SemiBold",
				"MuktaMahee-SemiBold",
				"मुक्ता माही",
				"मुक्ता माही सेमी बोल्ड",
				"ਮੁਕਤਾ ਮਾਹੀ",
				"ਮੁਕਤਾ ਮਾਹੀ ਸੈਮੀਬੋਲਡ"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 522,
			hhea: [
				1130,
				-532,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Mukta Mahee",
			aliases: [
				"Mukta Mahee",
				"MuktaMahee Bold",
				"MuktaMahee-Bold",
				"मुक्ता माही",
				"ਮੁਕਤਾ ਮਾਹੀ"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 530,
			hhea: [
				1130,
				-532,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Mukta Mahee",
			aliases: [
				"Mukta Mahee",
				"MuktaMahee ExtraBold",
				"MuktaMahee-ExtraBold",
				"मुक्ता माही",
				"मुक्ता माही एक्स्ट्रा बोल्ड",
				"ਮੁਕਤਾ ਮਾਹੀ",
				"ਮੁਕਤਾ ਮਾਹੀ ਐਕਸਟ੍ਰਾਬੋਲਡ"
			],
			weight: 800,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 538,
			hhea: [
				1130,
				-532,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noteworthy",
			aliases: ["Noteworthy", "Noteworthy-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 800,
			xAvgCharWidth: 302,
			hhea: [
				1024,
				-256,
				12
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noteworthy",
			aliases: ["Noteworthy", "Noteworthy-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 800,
			xAvgCharWidth: 331,
			hhea: [
				1024,
				-256,
				12
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Nastaliq Urdu",
			aliases: [
				"Noto Nastaliq Urdu",
				"NotoNastaliqUrdu",
				"نوٹو نستعلیق اردو",
				"नोटो नास्तालिक़ उर्दू"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 553,
			hhea: [
				1904,
				-596,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Nastaliq Urdu",
			aliases: [
				"Noto Nastaliq Urdu",
				"NotoNastaliqUrdu-Bold",
				"نوٹو نستعلیق اردو",
				"नोटो नास्तालिक़ उर्दू"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 609,
			hhea: [
				1904,
				-596,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Armenian",
			aliases: [
				"Noto Sans Armenian",
				"Noto Sans Armenian Thin",
				"NotoSansArmenian-Thin"
			],
			weight: 100,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 591,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Armenian",
			aliases: [
				"Noto Sans Armenian",
				"Noto Sans Armenian ExtLt",
				"NotoSansArmenian-ExtraLight"
			],
			weight: 200,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 602,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Armenian",
			aliases: [
				"Noto Sans Armenian",
				"Noto Sans Armenian Light",
				"NotoSansArmenian-Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 618,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Armenian",
			aliases: ["Noto Sans Armenian", "NotoSansArmenian-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 645,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Armenian",
			aliases: [
				"Noto Sans Armenian",
				"Noto Sans Armenian Med",
				"NotoSansArmenian-Medium"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 655,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Armenian",
			aliases: [
				"Noto Sans Armenian",
				"Noto Sans Armenian SemBd",
				"NotoSansArmenian-SemiBold"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 667,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Armenian",
			aliases: ["Noto Sans Armenian", "NotoSansArmenian-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 681,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Armenian",
			aliases: [
				"Noto Sans Armenian",
				"Noto Sans Armenian ExtBd",
				"NotoSansArmenian-ExtraBold"
			],
			weight: 800,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 691,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Armenian",
			aliases: [
				"Noto Sans Armenian",
				"Noto Sans Armenian Blk",
				"NotoSansArmenian-Black"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 702,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Kannada",
			aliases: [
				"Noto Sans Kannada",
				"Noto Sans Kannada Thin",
				"NotoSansKannada-Thin",
				"नोटो संस कन्नड़",
				"नोटो संस कन्नड़ थिन",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ ಥಿನ್"
			],
			weight: 100,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 510,
			hhea: [
				809,
				-540,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Kannada",
			aliases: [
				"Noto Sans Kannada",
				"Noto Sans Kannada ExtraLight",
				"NotoSansKannada-ExtraLight",
				"नोटो संस कन्नड़",
				"नोटो संस कन्नड़ एक्स्ट्रा लाइट",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ ಎಕ್ಸ್‌ಟ್ರಾ ಲೈಟ್"
			],
			weight: 200,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 519,
			hhea: [
				809,
				-540,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Kannada",
			aliases: [
				"Noto Sans Kannada",
				"Noto Sans Kannada Light",
				"NotoSansKannada-Light",
				"नोटो संस कन्नड़",
				"नोटो संस कन्नड़ लाइट",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ ಲೈಟ್"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 533,
			hhea: [
				809,
				-540,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Kannada",
			aliases: [
				"Noto Sans Kannada",
				"NotoSansKannada-Regular",
				"नोटो संस कन्नड़",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 555,
			hhea: [
				809,
				-540,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Kannada",
			aliases: [
				"Noto Sans Kannada",
				"Noto Sans Kannada Medium",
				"NotoSansKannada-Medium",
				"नोटो संस कन्नड़",
				"नोटो संस कन्नड़ मीडियम",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ ಮೀಡಿಯಮ್"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 568,
			hhea: [
				809,
				-540,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Kannada",
			aliases: [
				"Noto Sans Kannada",
				"Noto Sans Kannada SemiBold",
				"NotoSansKannada-SemiBold",
				"नोटो संस कन्नड़",
				"नोटो संस कन्नड़ सेमी बोल्ड",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ ಸೆಮಿಬೋಲ್ಡ್"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 582,
			hhea: [
				809,
				-540,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Kannada",
			aliases: [
				"Noto Sans Kannada",
				"NotoSansKannada-Bold",
				"नोटो संस कन्नड़",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 599,
			hhea: [
				809,
				-540,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Kannada",
			aliases: [
				"Noto Sans Kannada",
				"Noto Sans Kannada ExtraBold",
				"NotoSansKannada-ExtraBold",
				"नोटो संस कन्नड़",
				"नोटो संस कन्नड़ एक्स्ट्रा बोल्ड",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ ಎಕ್ಸ್‌ಟ್ರಾಬೋಲ್ಡ್"
			],
			weight: 800,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 615,
			hhea: [
				809,
				-540,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Kannada",
			aliases: [
				"Noto Sans Kannada",
				"Noto Sans Kannada Black",
				"NotoSansKannada-Black",
				"नोटो संस कन्नड़",
				"नोटो संस कन्नड़ ब्लैक",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ",
				"ನೊಟೊ ಸ್ಯಾನ್ಸ್ ಕನ್ನಡ ಬ್ಲ್ಯಾಕ್"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 633,
			hhea: [
				809,
				-540,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Myanmar",
			aliases: [
				"Noto Sans Myanmar",
				"Noto Sans Myanmar Thin",
				"NotoSansMyanmar-Thin"
			],
			weight: 100,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 597,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Myanmar",
			aliases: [
				"Noto Sans Myanmar",
				"Noto Sans Myanmar ExtLt",
				"NotoSansMyanmar-ExtraLight"
			],
			weight: 200,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 606,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Myanmar",
			aliases: [
				"Noto Sans Myanmar",
				"Noto Sans Myanmar Light",
				"NotoSansMyanmar-Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 619,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Myanmar",
			aliases: ["Noto Sans Myanmar", "NotoSansMyanmar-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 641,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Myanmar",
			aliases: [
				"Noto Sans Myanmar",
				"Noto Sans Myanmar Med",
				"NotoSansMyanmar-Medium"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 652,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Myanmar",
			aliases: [
				"Noto Sans Myanmar",
				"Noto Sans Myanmar SemBd",
				"NotoSansMyanmar-SemiBold"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 665,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Myanmar",
			aliases: ["Noto Sans Myanmar", "NotoSansMyanmar-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 680,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Myanmar",
			aliases: [
				"Noto Sans Myanmar",
				"Noto Sans Myanmar ExtBd",
				"NotoSansMyanmar-ExtraBold"
			],
			weight: 800,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 691,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Myanmar",
			aliases: [
				"Noto Sans Myanmar",
				"Noto Sans Myanmar Blk",
				"NotoSansMyanmar-Black"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 704,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Oriya",
			aliases: [
				"Noto Sans Oriya",
				"NotoSansOriya",
				"नोटो सैंस उडिया",
				"ନୋଟୋ ସାନ୍ସ ଓରିୟା"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1206,
			hhea: [
				1878,
				-990,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Oriya",
			aliases: [
				"Noto Sans Oriya",
				"NotoSansOriya-Bold",
				"नोटो सैंस उडिया",
				"ନୋଟୋ ସାନ୍ସ ଓରିୟା"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1314,
			hhea: [
				1878,
				-990,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Zawgyi",
			aliases: [
				"Noto Sans Zawgyi",
				"Noto Sans Zawgyi Thin",
				"NotoSansZawgyi-Thin"
			],
			weight: 100,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 597,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Zawgyi",
			aliases: [
				"Noto Sans Zawgyi",
				"Noto Sans Zawgyi ExtLt",
				"NotoSansZawgyi-ExtraLight"
			],
			weight: 200,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 606,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Zawgyi",
			aliases: [
				"Noto Sans Zawgyi",
				"Noto Sans Zawgyi Light",
				"NotoSansZawgyi-Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 619,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Zawgyi",
			aliases: ["Noto Sans Zawgyi", "NotoSansZawgyi-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 641,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Zawgyi",
			aliases: [
				"Noto Sans Zawgyi",
				"Noto Sans Zawgyi Med",
				"NotoSansZawgyi-Medium"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 652,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Zawgyi",
			aliases: [
				"Noto Sans Zawgyi",
				"Noto Sans Zawgyi SemBd",
				"NotoSansZawgyi-SemiBold"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 665,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Zawgyi",
			aliases: ["Noto Sans Zawgyi", "NotoSansZawgyi-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 680,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Zawgyi",
			aliases: [
				"Noto Sans Zawgyi",
				"Noto Sans Zawgyi ExtBd",
				"NotoSansZawgyi-ExtraBold"
			],
			weight: 800,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 691,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Sans Zawgyi",
			aliases: [
				"Noto Sans Zawgyi",
				"Noto Sans Zawgyi Blk",
				"NotoSansZawgyi-Black"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 704,
			hhea: [
				1324,
				-860,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Serif Myanmar",
			aliases: [
				"Noto Serif Myanmar",
				"Noto Serif Myanmar Thin",
				"NotoSerifMyanmar-Thin"
			],
			weight: 100,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 568,
			hhea: [
				1239,
				-1260,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Serif Myanmar",
			aliases: [
				"Noto Serif Myanmar",
				"Noto Serif Myanmar ExtLt",
				"NotoSerifMyanmar-ExtraLight"
			],
			weight: 200,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 568,
			hhea: [
				1239,
				-1260,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Serif Myanmar",
			aliases: [
				"Noto Serif Myanmar",
				"Noto Serif Myanmar Light",
				"NotoSerifMyanmar-Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 568,
			hhea: [
				1239,
				-1260,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Serif Myanmar",
			aliases: ["Noto Serif Myanmar", "NotoSerifMyanmar-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 568,
			hhea: [
				1239,
				-1260,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Serif Myanmar",
			aliases: [
				"Noto Serif Myanmar",
				"Noto Serif Myanmar Med",
				"NotoSerifMyanmar-Medium"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 568,
			hhea: [
				1239,
				-1260,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Serif Myanmar",
			aliases: [
				"Noto Serif Myanmar",
				"Noto Serif Myanmar SemBd",
				"NotoSerifMyanmar-SemiBold"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 568,
			hhea: [
				1239,
				-1260,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Serif Myanmar",
			aliases: ["Noto Serif Myanmar", "NotoSerifMyanmar-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 568,
			hhea: [
				1239,
				-1260,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Serif Myanmar",
			aliases: [
				"Noto Serif Myanmar",
				"Noto Serif Myanmar ExtBd",
				"NotoSerifMyanmar-ExtraBold"
			],
			weight: 800,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 569,
			hhea: [
				1239,
				-1260,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Noto Serif Myanmar",
			aliases: [
				"Noto Serif Myanmar",
				"Noto Serif Myanmar Blk",
				"NotoSerifMyanmar-Black"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 570,
			hhea: [
				1239,
				-1260,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Optima",
			aliases: ["Optima", "Optima-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 430,
			hhea: [
				923,
				-262,
				25
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Optima",
			aliases: ["Optima", "Optima-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 432,
			hhea: [
				919,
				-268,
				25
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Optima",
			aliases: ["Optima", "Optima-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 438,
			hhea: [
				931,
				-261,
				25
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Optima",
			aliases: ["Optima", "Optima-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 439,
			hhea: [
				921,
				-268,
				25
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Optima",
			aliases: ["Optima", "Optima-ExtraBlack"],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 502,
			hhea: [
				961,
				-262,
				26
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Palatino",
			aliases: ["Palatino", "Palatino-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1161,
			hhea: [
				1685,
				-568,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Palatino",
			aliases: ["Palatino", "Palatino-Roman"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1225,
			hhea: [
				1685,
				-568,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Palatino",
			aliases: ["Palatino", "Palatino-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1225,
			hhea: [
				1685,
				-568,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Palatino",
			aliases: ["Palatino", "Palatino-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1277,
			hhea: [
				1685,
				-568,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Symbol",
			aliases: ["Symbol"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1172,
			hhea: [
				1436,
				-612,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Times",
			aliases: ["Times", "Times-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1182,
			hhea: [
				1536,
				-512,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Times",
			aliases: ["Times", "Times-Roman"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1210,
			hhea: [
				1536,
				-512,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Times",
			aliases: ["Times", "Times-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1227,
			hhea: [
				1536,
				-512,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Times",
			aliases: ["Times", "Times-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1255,
			hhea: [
				1536,
				-512,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-system",
			family: "Zapf Dingbats",
			aliases: ["Zapf Dingbats", "ZapfDingbatsITC"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1369,
			hhea: [
				1667,
				-362,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Al Bayan PUA",
			aliases: [".Al Bayan PUA", ".AlBayanPUA"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 471,
			hhea: [
				991,
				-509,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Al Bayan PUA",
			aliases: [".Al Bayan PUA", ".AlBayanPUA-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 489,
			hhea: [
				991,
				-564,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Al Nile PUA",
			aliases: [".Al Nile PUA", ".AlNilePUA"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 0,
			hhea: [
				830,
				-535,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Al Nile PUA",
			aliases: [".Al Nile PUA", ".AlNilePUA-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 0,
			hhea: [
				830,
				-535,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Al Tarikh PUA",
			aliases: [".Al Tarikh PUA", ".AlTarikhPUA"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1135,
				-913,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Baghdad PUA",
			aliases: [".Baghdad PUA", ".BaghdadPUA"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 832,
			hhea: [
				1880,
				-914,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Beirut PUA",
			aliases: [".Beirut PUA", ".BeirutPUA"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1570,
				-563,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Damascus PUA",
			aliases: [".Damascus PUA", ".DamascusPUA"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 926,
			hhea: [
				1188,
				-860,
				44
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Damascus PUA",
			aliases: [".Damascus PUA", ".DamascusPUALight"],
			weight: 500,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 955,
			hhea: [
				1188,
				-860,
				44
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Damascus PUA",
			aliases: [".Damascus PUA", ".DamascusPUAMedium"],
			weight: 500,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 955,
			hhea: [
				1188,
				-860,
				44
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Damascus PUA",
			aliases: [".Damascus PUA", ".DamascusPUASemiBold"],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1009,
			hhea: [
				1188,
				-860,
				44
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Damascus PUA",
			aliases: [".Damascus PUA", ".DamascusPUABold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1051,
			hhea: [
				1188,
				-860,
				44
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".DecoType Naskh PUA",
			aliases: [".DecoType Naskh PUA", ".DecoTypeNaskhPUA"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1147,
			xAvgCharWidth: 437,
			hhea: [
				1348,
				-733,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Diwan Kufi PUA",
			aliases: [".Diwan Kufi PUA", ".DiwanKufiPUA"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				2850,
				-1e3,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Farah PUA",
			aliases: [".Farah PUA", ".FarahPUA"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1545,
				-503,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".KufiStandardGK PUA",
			aliases: [".KufiStandardGK PUA", ".KufiStandardGKPUA"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1025,
			hhea: [
				1932,
				-956,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Muna PUA",
			aliases: [".Muna PUA", ".MunaPUA"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1508,
				-686,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Muna PUA",
			aliases: [".Muna PUA", ".MunaPUABold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1508,
				-686,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Muna PUA",
			aliases: [".Muna PUA", ".MunaPUABlack"],
			weight: 900,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1508,
				-686,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Nadeem PUA",
			aliases: [".Nadeem PUA", ".NadeemPUA"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 889,
			hhea: [
				1880,
				-928,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Sana PUA",
			aliases: [".Sana PUA", ".SanaPUA"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1528,
				-520,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: ".Savoye LET CC.",
			aliases: [".Savoye LET CC.", ".SavoyeLetPlainCC"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1300,
			xAvgCharWidth: 847,
			hhea: [
				1410,
				-1024,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Academy Engraved LET",
			aliases: ["Academy Engraved LET", "AcademyEngravedLetPlain"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 857,
			hhea: [
				1400,
				-1024,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Al Bayan",
			aliases: [
				"Al Bayan",
				"AlBayan",
				"البيان"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 471,
			hhea: [
				991,
				-509,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Al Bayan",
			aliases: [
				"Al Bayan",
				"AlBayan-Bold",
				"البيان"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 489,
			hhea: [
				991,
				-564,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Al Nile",
			aliases: [
				"Al Nile",
				"AlNile",
				"النيل"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 0,
			hhea: [
				830,
				-535,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Al Nile",
			aliases: [
				"Al Nile",
				"AlNile-Bold",
				"النيل"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 0,
			hhea: [
				830,
				-535,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Al Tarikh",
			aliases: [
				"Al Tarikh",
				"AlTarikh",
				"التاريخ"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1135,
				-913,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "American Typewriter",
			aliases: ["American Typewriter", "AmericanTypewriter-CondensedLight"],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 374,
			hhea: [
				824,
				-250,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "American Typewriter",
			aliases: ["American Typewriter", "AmericanTypewriter-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 476,
			hhea: [
				889,
				-250,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "American Typewriter",
			aliases: ["American Typewriter", "AmericanTypewriter"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 479,
			hhea: [
				904,
				-250,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "American Typewriter",
			aliases: ["American Typewriter", "AmericanTypewriter-Condensed"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 386,
			hhea: [
				881,
				-250,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "American Typewriter",
			aliases: ["American Typewriter", "AmericanTypewriter-Semibold"],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 479,
			hhea: [
				904,
				-250,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "American Typewriter",
			aliases: ["American Typewriter", "AmericanTypewriter-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 504,
			hhea: [
				948,
				-278,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "American Typewriter",
			aliases: ["American Typewriter", "AmericanTypewriter-CondensedBold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 395,
			hhea: [
				927,
				-266,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Andale Mono",
			aliases: ["Andale Mono", "AndaleMono"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1229,
			hhea: [
				1858,
				-446,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Apple Chancery",
			aliases: ["Apple Chancery", "Apple-Chancery"],
			weight: 0,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1188,
			hhea: [
				2289,
				-952,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "AppleGothic",
			aliases: ["AppleGothic"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: null,
			hhea: [
				891,
				-325,
				0
			],
			farEastCodePage: null
		},
		{
			source: "macos-supplemental",
			family: "AppleMyungjo",
			aliases: ["AppleMyungjo"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1025,
			xAvgCharWidth: null,
			hhea: [
				891,
				-326,
				0
			],
			farEastCodePage: null
		},
		{
			source: "macos-supplemental",
			family: "Arial",
			aliases: ["Arial", "Arial-ItalicMT"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 904,
			hhea: [
				1854,
				-434,
				67
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Arial",
			aliases: ["Arial", "ArialMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 904,
			hhea: [
				1854,
				-434,
				67
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Arial",
			aliases: ["Arial", "Arial-BoldItalicMT"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 980,
			hhea: [
				1854,
				-434,
				67
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Arial",
			aliases: ["Arial", "Arial-BoldMT"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 980,
			hhea: [
				1854,
				-434,
				67
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Arial Black",
			aliases: ["Arial Black", "Arial-Black"],
			weight: 900,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1131,
			hhea: [
				2254,
				-634,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Arial Narrow",
			aliases: ["Arial Narrow", "ArialNarrow-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 741,
			hhea: [
				1916,
				-434,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Arial Narrow",
			aliases: ["Arial Narrow", "ArialNarrow"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 741,
			hhea: [
				1916,
				-434,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Arial Narrow",
			aliases: ["Arial Narrow", "ArialNarrow-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 803,
			hhea: [
				1916,
				-434,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Arial Narrow",
			aliases: ["Arial Narrow", "ArialNarrow-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 803,
			hhea: [
				1916,
				-434,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Arial Rounded MT Bold",
			aliases: ["Arial Rounded MT Bold", "ArialRoundedMTBold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 990,
			hhea: [
				1938,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Arial Unicode MS",
			aliases: ["Arial Unicode MS", "ArialUnicodeMS"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 904,
			hhea: [
				2189,
				-555,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-supplemental",
			family: "Athelas",
			aliases: ["Athelas", "Athelas-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 378,
			hhea: [
				880,
				-240,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Athelas",
			aliases: ["Athelas", "Athelas-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 414,
			hhea: [
				880,
				-240,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Athelas",
			aliases: ["Athelas", "Athelas-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 388,
			hhea: [
				880,
				-240,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Athelas",
			aliases: ["Athelas", "Athelas-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 431,
			hhea: [
				880,
				-240,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Ayuthaya",
			aliases: ["Ayuthaya"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2100,
			xAvgCharWidth: 1257,
			hhea: [
				2241,
				-674,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Baghdad",
			aliases: ["Baghdad", "بغداد"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 832,
			hhea: [
				1880,
				-914,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Bangla MN",
			aliases: [
				"Bangla MN",
				"BanglaMN",
				"बांग्ला एमएन",
				"বাংলা এমএন"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1800,
			xAvgCharWidth: 1289,
			hhea: [
				1895,
				-1398,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Bangla MN",
			aliases: [
				"Bangla MN",
				"BanglaMN-Bold",
				"बांग्ला एमएन",
				"বাংলা এমএন"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1800,
			xAvgCharWidth: 1408,
			hhea: [
				1895,
				-1398,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Bangla Sangam MN",
			aliases: [
				"Bangla Sangam MN",
				"BanglaSangamMN",
				"बांग्ला संगम एमएन",
				"বাংলা সংগ্রাম এমএন"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1239,
			hhea: [
				1664,
				-768,
				240
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Bangla Sangam MN",
			aliases: [
				"Bangla Sangam MN",
				"BanglaSangamMN-Bold",
				"बांग्ला संगम एमएन",
				"বাংলা সংগ্রাম এমএন"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1248,
			hhea: [
				1664,
				-768,
				240
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Baskerville",
			aliases: ["Baskerville", "Baskerville-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1086,
			hhea: [
				1804,
				-504,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Baskerville",
			aliases: ["Baskerville"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1185,
			hhea: [
				1839,
				-504,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Baskerville",
			aliases: ["Baskerville", "Baskerville-SemiBoldItalic"],
			weight: 600,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1277,
			hhea: [
				1849,
				-504,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Baskerville",
			aliases: ["Baskerville", "Baskerville-SemiBold"],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1267,
			hhea: [
				1835,
				-506,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Baskerville",
			aliases: ["Baskerville", "Baskerville-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1317,
			hhea: [
				1802,
				-511,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Baskerville",
			aliases: ["Baskerville", "Baskerville-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1293,
			hhea: [
				1836,
				-522,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Beirut",
			aliases: ["Beirut", "بيروت"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1570,
				-563,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Big Caslon",
			aliases: ["Big Caslon", "BigCaslon-Medium"],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 540,
			hhea: [
				934,
				-257,
				18
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Bodoni 72",
			aliases: ["Bodoni 72", "BodoniSvtyTwoITCTT-BookIta"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 367,
			hhea: [
				947,
				-292,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Bodoni 72",
			aliases: ["Bodoni 72", "BodoniSvtyTwoITCTT-Book"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 367,
			hhea: [
				936,
				-266,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Bodoni 72",
			aliases: ["Bodoni 72", "BodoniSvtyTwoITCTT-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 390,
			hhea: [
				923,
				-272,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Bodoni 72 Oldstyle",
			aliases: ["Bodoni 72 Oldstyle", "BodoniSvtyTwoOSITCTT-BookIt"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 367,
			hhea: [
				947,
				-292,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Bodoni 72 Oldstyle",
			aliases: ["Bodoni 72 Oldstyle", "BodoniSvtyTwoOSITCTT-Book"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 367,
			hhea: [
				936,
				-266,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Bodoni 72 Oldstyle",
			aliases: ["Bodoni 72 Oldstyle", "BodoniSvtyTwoOSITCTT-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 390,
			hhea: [
				923,
				-272,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Bodoni 72 Smallcaps",
			aliases: ["Bodoni 72 Smallcaps", "BodoniSvtyTwoSCITCTT-Book"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 393,
			hhea: [
				936,
				-262,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Bodoni Ornaments",
			aliases: ["Bodoni Ornaments", "BodoniOrnamentsITCTT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 1013,
			hhea: [
				810,
				-191,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Bradley Hand",
			aliases: ["Bradley Hand", "BradleyHandITCTT-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 628,
			hhea: [
				850,
				-399,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Brush Script MT",
			aliases: ["Brush Script MT", "BrushScriptMT"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 654,
			hhea: [
				1820,
				-692,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-supplemental",
			family: "Chalkboard",
			aliases: ["Chalkboard"],
			weight: 400,
			style: "normal",
			unitsPerEm: 905,
			xAvgCharWidth: -428,
			hhea: [
				887,
				-256,
				12
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Chalkboard",
			aliases: ["Chalkboard", "Chalkboard-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 905,
			xAvgCharWidth: 474,
			hhea: [
				887,
				-256,
				12
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Chalkboard SE",
			aliases: ["Chalkboard SE", "ChalkboardSE-Light"],
			weight: 400,
			style: "normal",
			unitsPerEm: 905,
			xAvgCharWidth: 428,
			hhea: [
				1024,
				-256,
				12
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Chalkboard SE",
			aliases: ["Chalkboard SE", "ChalkboardSE-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 905,
			xAvgCharWidth: 428,
			hhea: [
				1024,
				-256,
				12
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Chalkboard SE",
			aliases: ["Chalkboard SE", "ChalkboardSE-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 905,
			xAvgCharWidth: 541,
			hhea: [
				1024,
				-256,
				12
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Chalkduster",
			aliases: ["Chalkduster"],
			weight: 400,
			style: "normal",
			unitsPerEm: 905,
			xAvgCharWidth: 535,
			hhea: [
				887,
				-256,
				12
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Charter",
			aliases: ["Charter", "Charter-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 862,
			hhea: [
				2007,
				-492,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Charter",
			aliases: ["Charter", "Charter-Roman"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 898,
			hhea: [
				2007,
				-492,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Charter",
			aliases: ["Charter", "Charter-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 938,
			hhea: [
				2007,
				-492,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Charter",
			aliases: ["Charter", "Charter-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 959,
			hhea: [
				2007,
				-492,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Charter",
			aliases: [
				"Charter",
				"Charter Black",
				"Charter-BlackItalic"
			],
			weight: 900,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1058,
			hhea: [
				2007,
				-492,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Charter",
			aliases: [
				"Charter",
				"Charter Black",
				"Charter-Black"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1080,
			hhea: [
				2007,
				-492,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Cochin",
			aliases: ["Cochin", "Cochin-Italic"],
			weight: 500,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: -358,
			hhea: [
				886,
				-234,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Cochin",
			aliases: ["Cochin"],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 583,
			hhea: [
				897,
				-250,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Cochin",
			aliases: ["Cochin", "Cochin-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 551,
			hhea: [
				915,
				-234,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Cochin",
			aliases: ["Cochin", "Cochin-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: -433,
			hhea: [
				914,
				-250,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Comic Sans MS",
			aliases: ["Comic Sans MS", "ComicSansMS"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 959,
			hhea: [
				2257,
				-597,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Comic Sans MS",
			aliases: ["Comic Sans MS", "ComicSansMS-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1014,
			hhea: [
				2257,
				-597,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Copperplate",
			aliases: ["Copperplate", "Copperplate-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 650,
			hhea: [
				760,
				-249,
				19
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Copperplate",
			aliases: ["Copperplate"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 661,
			hhea: [
				763,
				-248,
				19
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Copperplate",
			aliases: ["Copperplate", "Copperplate-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 685,
			hhea: [
				767,
				-248,
				20
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Corsiva Hebrew",
			aliases: ["Corsiva Hebrew", "CorsivaHebrew"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 759,
			hhea: [
				1280,
				-630,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Corsiva Hebrew",
			aliases: ["Corsiva Hebrew", "CorsivaHebrew-Bold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 905,
			hhea: [
				1280,
				-630,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Courier New",
			aliases: ["Courier New", "CourierNewPS-ItalicMT"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1229,
			hhea: [
				1705,
				-615,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Courier New",
			aliases: ["Courier New", "CourierNewPSMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1229,
			hhea: [
				1705,
				-615,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Courier New",
			aliases: ["Courier New", "CourierNewPS-BoldItalicMT"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1229,
			hhea: [
				1705,
				-615,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Courier New",
			aliases: ["Courier New", "CourierNewPS-BoldMT"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1229,
			hhea: [
				1705,
				-615,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Damascus",
			aliases: [
				"Damascus",
				"دمشق",
				"दमिश्कश"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 926,
			hhea: [
				1188,
				-860,
				44
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Damascus",
			aliases: [
				"Damascus",
				"DamascusLight",
				"دمشق",
				"दमिश्कश"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 955,
			hhea: [
				1188,
				-860,
				44
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Damascus",
			aliases: [
				"Damascus",
				"DamascusMedium",
				"دمشق",
				"दमिश्कश"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 955,
			hhea: [
				1188,
				-860,
				44
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Damascus",
			aliases: [
				"Damascus",
				"DamascusSemiBold",
				"دمشق",
				"दमिश्कश"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1009,
			hhea: [
				1188,
				-860,
				44
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Damascus",
			aliases: [
				"Damascus",
				"DamascusBold",
				"دمشق",
				"दमिश्कश"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1051,
			hhea: [
				1188,
				-860,
				44
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "DecoType Naskh",
			aliases: [
				"DecoType Naskh",
				"DecoTypeNaskh",
				"نسخ"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1147,
			xAvgCharWidth: 437,
			hhea: [
				1348,
				-733,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Devanagari MT",
			aliases: [
				"Devanagari MT",
				"DevanagariMT",
				"देवनागरी एमटी"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1198,
			hhea: [
				1895,
				-1398,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Devanagari MT",
			aliases: [
				"Devanagari MT",
				"DevanagariMT-Bold",
				"देवनागरी एमटी"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1213,
			hhea: [
				1895,
				-1398,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Devanagari Sangam MN",
			aliases: [
				"Devanagari Sangam MN",
				"DevanagariSangamMN",
				"देवनागरी संगम एमएन"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 762,
			hhea: [
				1900,
				-874,
				280
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Devanagari Sangam MN",
			aliases: [
				"Devanagari Sangam MN",
				"DevanagariSangamMN-Bold",
				"देवनागरी संगम एमएन"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 766,
			hhea: [
				1900,
				-874,
				280
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Didot",
			aliases: ["Didot", "Didot-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 537,
			hhea: [
				942,
				-290,
				25
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Didot",
			aliases: ["Didot"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 549,
			hhea: [
				941,
				-299,
				24
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Didot",
			aliases: ["Didot", "Didot-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 569,
			hhea: [
				969,
				-294,
				26
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "DIN Alternate",
			aliases: ["DIN Alternate", "DINAlternate-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 986,
			hhea: [
				1921,
				-463,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "DIN Condensed",
			aliases: ["DIN Condensed", "DINCondensed-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 374,
			hhea: [
				712,
				-288,
				200
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Diwan Kufi",
			aliases: [
				"Diwan Kufi",
				"DiwanKufi",
				"ديوان كوفي"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				2850,
				-1e3,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Diwan Thuluth",
			aliases: [
				"Diwan Thuluth",
				"DiwanThuluth",
				"ديوان ثلث"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 396,
			hhea: [
				2071,
				-1439,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Euphemia UCAS",
			aliases: ["Euphemia UCAS", "EuphemiaUCAS-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1436,
			hhea: [
				2237,
				-466,
				84
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Euphemia UCAS",
			aliases: ["Euphemia UCAS", "EuphemiaUCAS"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1437,
			hhea: [
				2237,
				-466,
				84
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Euphemia UCAS",
			aliases: ["Euphemia UCAS", "EuphemiaUCAS-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1532,
			hhea: [
				2237,
				-466,
				84
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Farah",
			aliases: ["Farah", "فرح"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1545,
				-503,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Farisi",
			aliases: ["Farisi", "فارسي"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 899,
			hhea: [
				2263,
				-2e3,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Futura",
			aliases: ["Futura", "Futura-MediumItalic"],
			weight: 500,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1157,
			hhea: [
				2126,
				-539,
				60
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Futura",
			aliases: ["Futura", "Futura-CondensedMedium"],
			weight: 500,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 828,
			hhea: [
				2014,
				-448,
				60
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Futura",
			aliases: ["Futura", "Futura-Medium"],
			weight: 500,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1165,
			hhea: [
				2127,
				-532,
				61
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Futura",
			aliases: ["Futura", "Futura-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 646,
			hhea: [
				1039,
				-260,
				30
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Futura",
			aliases: ["Futura", "Futura-CondensedExtraBold"],
			weight: 800,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1094,
			hhea: [
				2055,
				-553,
				56
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Galvji",
			aliases: ["Galvji", "Galvji-Oblique"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1278,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Galvji",
			aliases: ["Galvji"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1279,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Galvji",
			aliases: ["Galvji", "Galvji-BoldOblique"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1370,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Galvji",
			aliases: ["Galvji", "Galvji-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1371,
			hhea: [
				1980,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Georgia",
			aliases: ["Georgia", "Georgia-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 920,
			hhea: [
				1878,
				-449,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Georgia",
			aliases: ["Georgia"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 901,
			hhea: [
				1878,
				-449,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Georgia",
			aliases: ["Georgia", "Georgia-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1073,
			hhea: [
				1878,
				-449,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Georgia",
			aliases: ["Georgia", "Georgia-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1051,
			hhea: [
				1878,
				-449,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gill Sans",
			aliases: ["Gill Sans", "GillSans-LightItalic"],
			weight: 300,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 999,
			hhea: [
				1832,
				-488,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gill Sans",
			aliases: ["Gill Sans", "GillSans-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1058,
			hhea: [
				1839,
				-488,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gill Sans",
			aliases: ["Gill Sans", "GillSans-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1010,
			hhea: [
				1862,
				-471,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gill Sans",
			aliases: ["Gill Sans", "GillSans"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1082,
			hhea: [
				1880,
				-472,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gill Sans",
			aliases: ["Gill Sans", "GillSans-SemiBoldItalic"],
			weight: 600,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1080,
			hhea: [
				1931,
				-512,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gill Sans",
			aliases: ["Gill Sans", "GillSans-SemiBold"],
			weight: 600,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1154,
			hhea: [
				1931,
				-512,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gill Sans",
			aliases: ["Gill Sans", "GillSans-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1227,
			hhea: [
				1886,
				-481,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gill Sans",
			aliases: ["Gill Sans", "GillSans-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1295,
			hhea: [
				1890,
				-481,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gill Sans",
			aliases: ["Gill Sans", "GillSans-UltraBold"],
			weight: 1e3,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1599,
			hhea: [
				2036,
				-516,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Grantha Sangam MN",
			aliases: [
				"Grantha Sangam MN",
				"GranthaSangamMN-Regular",
				"ग्रंथ संगम एमएन",
				"கிரந்த சங்கம் எம்என்"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1559,
			hhea: [
				1780,
				-1760,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Grantha Sangam MN",
			aliases: [
				"Grantha Sangam MN",
				"GranthaSangamMN-Bold",
				"ग्रंथ संगम एमएन",
				"கிரந்த சங்கம் எம்என்"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1586,
			hhea: [
				1780,
				-1760,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gujarati MT",
			aliases: [
				"Gujarati MT",
				"GujaratiMT",
				"गुजराती एचटी",
				"ગુજરાતી એમટી"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1024,
			hhea: [
				1860,
				-1295,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gujarati MT",
			aliases: [
				"Gujarati MT",
				"GujaratiMT-Bold",
				"गुजराती एचटी",
				"ગુજરાતી એમટી"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1053,
			hhea: [
				1860,
				-1295,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gujarati Sangam MN",
			aliases: [
				"Gujarati Sangam MN",
				"GujaratiSangamMN",
				"गुजराती संगम एमएन",
				"ગુજરાતી સંગમ એમએન"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1666,
			xAvgCharWidth: 991,
			hhea: [
				1749,
				-583,
				167
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gujarati Sangam MN",
			aliases: [
				"Gujarati Sangam MN",
				"GujaratiSangamMN-Bold",
				"गुजराती संगम एमएन",
				"ગુજરાતી સંગમ એમએન"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1666,
			xAvgCharWidth: 1001,
			hhea: [
				1749,
				-583,
				167
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gurmukhi MN",
			aliases: [
				"Gurmukhi MN",
				"GurmukhiMN",
				"गुरुमुखी एमएन",
				"ਗੁਰਮੁਖੀ ਐਮਐੱਨ"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: -821,
			hhea: [
				1946,
				-502,
				600
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gurmukhi MN",
			aliases: [
				"Gurmukhi MN",
				"GurmukhiMN-Bold",
				"गुरुमुखी एमएन",
				"ਗੁਰਮੁਖੀ ਐਮਐੱਨ"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 400,
			hhea: [
				1946,
				-502,
				600
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gurmukhi MT",
			aliases: [
				"Gurmukhi MT",
				"MonotypeGurmukhi",
				"गुरुमुखी एमटी",
				"ਗੁਰਮੁਖੀ ਐਮਜੀ"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 904,
			hhea: [
				1770,
				-900,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gurmukhi Sangam MN",
			aliases: [
				"Gurmukhi Sangam MN",
				"GurmukhiSangamMN",
				"गुरुमुखी संगति एमएन",
				"ਗੁਰਮੁਖੀ ਸੰਗਮ ਐਮਐੱਨ"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1159,
			hhea: [
				2045,
				-613,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Gurmukhi Sangam MN",
			aliases: [
				"Gurmukhi Sangam MN",
				"GurmukhiSangamMN-Bold",
				"गुरुमुखी संगति एमएन",
				"ਗੁਰਮੁਖੀ ਸੰਗਮ ਐਮਐੱਨ"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1179,
			hhea: [
				2045,
				-613,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Herculanum",
			aliases: ["Herculanum"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 568,
			hhea: [
				795,
				-205,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Hoefler Text",
			aliases: ["Hoefler Text", "HoeflerText-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2e3,
			xAvgCharWidth: -841,
			hhea: [
				1442,
				-558,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Hoefler Text",
			aliases: [
				"Hoefler Text",
				"Hoefler Text Ornaments",
				"HoeflerText-Ornaments"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2e3,
			xAvgCharWidth: 1809,
			hhea: [
				1613,
				-416,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Hoefler Text",
			aliases: ["Hoefler Text", "HoeflerText-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2e3,
			xAvgCharWidth: 831,
			hhea: [
				1442,
				-558,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Hoefler Text",
			aliases: ["Hoefler Text", "HoeflerText-BlackItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2e3,
			xAvgCharWidth: 1102,
			hhea: [
				1442,
				-558,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Hoefler Text",
			aliases: ["Hoefler Text", "HoeflerText-Black"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2e3,
			xAvgCharWidth: -1108,
			hhea: [
				1442,
				-558,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Impact",
			aliases: ["Impact"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 838,
			hhea: [
				2066,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "InaiMathi",
			aliases: [
				"InaiMathi",
				"इनाईमाथी",
				"இணைமதி"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 928,
			hhea: [
				850,
				-400,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "InaiMathi",
			aliases: [
				"InaiMathi",
				"InaiMathi-Bold",
				"इनाईमाथी",
				"இணைமதி"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 733,
			hhea: [
				850,
				-400,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Iowan Old Style",
			aliases: ["Iowan Old Style", "IowanOldStyle-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 790,
			hhea: [
				2122,
				-674,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Iowan Old Style",
			aliases: ["Iowan Old Style", "IowanOldStyle-Roman"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 915,
			hhea: [
				2122,
				-674,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Iowan Old Style",
			aliases: ["Iowan Old Style", "IowanOldStyle-Titling"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1130,
			hhea: [
				2122,
				-674,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Iowan Old Style",
			aliases: ["Iowan Old Style", "IowanOldStyle-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 887,
			hhea: [
				2122,
				-674,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Iowan Old Style",
			aliases: ["Iowan Old Style", "IowanOldStyle-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 986,
			hhea: [
				2122,
				-674,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Iowan Old Style",
			aliases: [
				"Iowan Old Style",
				"Iowan Old Style Black",
				"IowanOldStyle-BlackItalic"
			],
			weight: 900,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1016,
			hhea: [
				2122,
				-674,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Iowan Old Style",
			aliases: [
				"Iowan Old Style",
				"Iowan Old Style Black",
				"IowanOldStyle-Black"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1105,
			hhea: [
				2122,
				-674,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "ITF Devanagari",
			aliases: [
				"ITF Devanagari",
				"ITFDevanagari-Light",
				"आईटीएफ़ देवनागरी",
				"आयटीएफ देवनागरी"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 712,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "ITF Devanagari",
			aliases: [
				"ITF Devanagari",
				"ITFDevanagari-Book",
				"आईटीएफ़ देवनागरी",
				"आयटीएफ देवनागरी"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 725,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "ITF Devanagari",
			aliases: [
				"ITF Devanagari",
				"ITFDevanagari-Medium",
				"आईटीएफ़ देवनागरी",
				"आयटीएफ देवनागरी"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 736,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "ITF Devanagari",
			aliases: [
				"ITF Devanagari",
				"ITFDevanagari-Demi",
				"आईटीएफ़ देवनागरी",
				"आयटीएफ देवनागरी"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 751,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "ITF Devanagari",
			aliases: [
				"ITF Devanagari",
				"ITFDevanagari-Bold",
				"आईटीएफ़ देवनागरी",
				"आयटीएफ देवनागरी"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 766,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "ITF Devanagari Marathi",
			aliases: [
				"ITF Devanagari Marathi",
				"ITFDevanagariMarathi-Light",
				"आईटीएफ़ देवनागरी मराठी",
				"आयटीएफ देवनागरी मराठी"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 712,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "ITF Devanagari Marathi",
			aliases: [
				"ITF Devanagari Marathi",
				"ITFDevanagariMarathi-Book",
				"आईटीएफ़ देवनागरी मराठी",
				"आयटीएफ देवनागरी मराठी"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 725,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "ITF Devanagari Marathi",
			aliases: [
				"ITF Devanagari Marathi",
				"ITFDevanagariMarathi-Medium",
				"आईटीएफ़ देवनागरी मराठी",
				"आयटीएफ देवनागरी मराठी"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 736,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "ITF Devanagari Marathi",
			aliases: [
				"ITF Devanagari Marathi",
				"ITFDevanagariMarathi-Demi",
				"आईटीएफ़ देवनागरी मराठी",
				"आयटीएफ देवनागरी मराठी"
			],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 751,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "ITF Devanagari Marathi",
			aliases: [
				"ITF Devanagari Marathi",
				"ITFDevanagariMarathi-Bold",
				"आईटीएफ़ देवनागरी मराठी",
				"आयटीएफ देवनागरी मराठी"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 766,
			hhea: [
				1050,
				-350,
				100
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Kailasa",
			aliases: ["Kailasa", "Kailasa-Bold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2600,
			xAvgCharWidth: 1282,
			hhea: [
				2195,
				-1169,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Kailasa",
			aliases: ["Kailasa"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2600,
			xAvgCharWidth: 1282,
			hhea: [
				2195,
				-1169,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Kannada MN",
			aliases: [
				"Kannada MN",
				"KannadaMN",
				"कन्नड़ एमएन",
				"ಕನ್ನಡ ಎಮ್ಎನ್"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1376,
			hhea: [
				1825,
				-575,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Kannada MN",
			aliases: [
				"Kannada MN",
				"KannadaMN-Bold",
				"कन्नड़ एमएन",
				"ಕನ್ನಡ ಎಮ್ಎನ್"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1432,
			hhea: [
				1825,
				-575,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Kannada Sangam MN",
			aliases: [
				"Kannada Sangam MN",
				"KannadaSangamMN",
				"कन्नड़ संगम एमएन",
				"ಕನ್ನಡ ಸಂಗಂ ಎಮ್ಎನ್"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1470,
			hhea: [
				1992,
				-646,
				695
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Kannada Sangam MN",
			aliases: [
				"Kannada Sangam MN",
				"KannadaSangamMN-Bold",
				"कन्नड़ संगम एमएन",
				"ಕನ್ನಡ ಸಂಗಂ ಎಮ್ಎನ್"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1475,
			hhea: [
				1992,
				-646,
				695
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Khmer MN",
			aliases: ["Khmer MN", "KhmerMN"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1276,
			hhea: [
				2020,
				-1693,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Khmer MN",
			aliases: ["Khmer MN", "KhmerMN-Bold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1372,
			hhea: [
				2020,
				-1693,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Khmer Sangam MN",
			aliases: ["Khmer Sangam MN", "KhmerSangamMN"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 434,
			hhea: [
				2294,
				-1393,
				380
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Kokonor",
			aliases: ["Kokonor"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2600,
			xAvgCharWidth: 1513,
			hhea: [
				2714,
				-1596,
				42
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Krungthep",
			aliases: ["Krungthep"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2560,
			xAvgCharWidth: 1396,
			hhea: [
				2587,
				-672,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "KufiStandardGK",
			aliases: ["KufiStandardGK", "كوفي"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1025,
			hhea: [
				1932,
				-956,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Lao MN",
			aliases: ["Lao MN", "LaoMN"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1124,
			hhea: [
				1825,
				-900,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Lao MN",
			aliases: ["Lao MN", "LaoMN-Bold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1197,
			hhea: [
				1825,
				-900,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Lao Sangam MN",
			aliases: ["Lao Sangam MN", "LaoSangamMN"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1095,
			hhea: [
				2052,
				-646,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Luminari",
			aliases: ["Luminari", "Luminari-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 461,
			hhea: [
				983,
				-356,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Malayalam MN",
			aliases: [
				"Malayalam MN",
				"MalayalamMN",
				"मलयालम एमएन",
				"മലയാളം എംഎൻ"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1692,
			hhea: [
				2056,
				-502,
				359
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Malayalam MN",
			aliases: [
				"Malayalam MN",
				"MalayalamMN-Bold",
				"मलयालम एमएन",
				"മലയാളം എംഎൻ"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1914,
			hhea: [
				2056,
				-502,
				359
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Malayalam Sangam MN",
			aliases: [
				"Malayalam Sangam MN",
				"MalayalamSangamMN",
				"मलयालम संगम एमएन",
				"മലയാളം സംഗം എംഎൻ"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1619,
			hhea: [
				1664,
				-768,
				240
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Malayalam Sangam MN",
			aliases: [
				"Malayalam Sangam MN",
				"MalayalamSangamMN-Bold",
				"मलयालम संगम एमएन",
				"മലയാളം സംഗം എംഎൻ"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1625,
			hhea: [
				1664,
				-768,
				240
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Marion",
			aliases: ["Marion", "Marion-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 336,
			hhea: [
				700,
				-300,
				51
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Marion",
			aliases: ["Marion", "Marion-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 411,
			hhea: [
				700,
				-300,
				51
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Marion",
			aliases: ["Marion", "Marion-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 443,
			hhea: [
				700,
				-300,
				51
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Microsoft Sans Serif",
			aliases: ["Microsoft Sans Serif", "MicrosoftSansSerif"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 901,
			hhea: [
				1888,
				-430,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Mishafi",
			aliases: [
				"DiwanMishafi",
				"Mishafi",
				"مِصحفي"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 501,
			hhea: [
				1607,
				-1356,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Mishafi Gold",
			aliases: [
				"DiwanMishafiGold",
				"Mishafi Gold",
				"مِصحفي ذهبي"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 899,
			hhea: [
				1607,
				-1356,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Mshtakan",
			aliases: ["Mshtakan", "MshtakanOblique"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: -1070,
			hhea: [
				1825,
				-443,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Mshtakan",
			aliases: ["Mshtakan"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: -1072,
			hhea: [
				1825,
				-443,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Mshtakan",
			aliases: ["Mshtakan", "MshtakanBoldOblique"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1070,
			hhea: [
				1825,
				-443,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Mshtakan",
			aliases: ["Mshtakan", "MshtakanBold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1070,
			hhea: [
				1825,
				-443,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Muna",
			aliases: ["Muna", "منى"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1508,
				-686,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Muna",
			aliases: [
				"Muna",
				"MunaBold",
				"منى"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1508,
				-686,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Muna",
			aliases: [
				"Muna",
				"MunaBlack",
				"منى"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1508,
				-686,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Myanmar MN",
			aliases: ["Myanmar MN", "MyanmarMN"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1189,
			hhea: [
				2e3,
				-900,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Myanmar MN",
			aliases: ["Myanmar MN", "MyanmarMN-Bold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1232,
			hhea: [
				2e3,
				-900,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Myanmar Sangam MN",
			aliases: ["Myanmar Sangam MN", "MyanmarSangamMN"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1178,
			hhea: [
				1886,
				-1323,
				-417
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Myanmar Sangam MN",
			aliases: ["Myanmar Sangam MN", "MyanmarSangamMN-Bold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1204,
			hhea: [
				1886,
				-1323,
				-417
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Nadeem",
			aliases: ["Nadeem", "نديم"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 889,
			hhea: [
				1880,
				-928,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "New Peninim MT",
			aliases: ["New Peninim MT", "NewPeninimMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 794,
			hhea: [
				1489,
				-607,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "New Peninim MT",
			aliases: ["New Peninim MT", "NewPeninimMT-Bold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 836,
			hhea: [
				1489,
				-607,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "New Peninim MT",
			aliases: ["New Peninim MT", "NewPeninimMT-BoldInclined"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 819,
			hhea: [
				1489,
				-607,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "New Peninim MT",
			aliases: ["New Peninim MT", "NewPeninimMT-Inclined"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 775,
			hhea: [
				1489,
				-607,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Adlam",
			aliases: ["Noto Sans Adlam", "NotoSansAdlam-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 647,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Avestan",
			aliases: ["Noto Sans Avestan", "NotoSansAvestan-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 681,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Bamum",
			aliases: ["Noto Sans Bamum", "NotoSansBamum-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 700,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Bassa Vah",
			aliases: ["Noto Sans Bassa Vah", "NotoSansBassaVah-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 664,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Batak",
			aliases: ["Noto Sans Batak", "NotoSansBatak-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 899,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Bhaiksuki",
			aliases: ["Noto Sans Bhaiksuki", "NotoSansBhaiksuki-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 785,
			hhea: [
				960,
				-460,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Buginese",
			aliases: ["Noto Sans Buginese", "NotoSansBuginese-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 814,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Buhid",
			aliases: ["Noto Sans Buhid", "NotoSansBuhid-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 680,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Carian",
			aliases: ["Noto Sans Carian", "NotoSansCarian-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 661,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Caucasian Albanian",
			aliases: [
				"Noto Sans CaucAlban",
				"Noto Sans Caucasian Albanian",
				"NotoSansCaucasianAlbanian-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 561,
			hhea: [
				976,
				-274,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Chakma",
			aliases: ["Noto Sans Chakma", "NotoSansChakma-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 769,
			hhea: [
				1140,
				-320,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Cham",
			aliases: ["Noto Sans Cham", "NotoSansCham-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 835,
			hhea: [
				1117,
				-351,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Coptic",
			aliases: ["Noto Sans Coptic", "NotoSansCoptic-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 593,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Cuneiform",
			aliases: ["Noto Sans Cuneiform", "NotoSansCuneiform-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 1604,
			hhea: [
				1596,
				-690,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Cypriot",
			aliases: ["Noto Sans Cypriot", "NotoSansCypriot-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 694,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Duployan",
			aliases: ["Noto Sans Duployan", "NotoSansDuployan-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 591,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Egyptian Hieroglyphs",
			aliases: [
				"Noto Sans EgyptHiero",
				"Noto Sans Egyptian Hieroglyphs",
				"NotoSansEgyptianHieroglyphs-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 965,
			hhea: [
				1324,
				-326,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Elbasan",
			aliases: ["Noto Sans Elbasan", "NotoSansElbasan-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 603,
			hhea: [
				847,
				-270,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Glagolitic",
			aliases: ["Noto Sans Glagolitic", "NotoSansGlagolitic-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 759,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Gothic",
			aliases: ["Noto Sans Gothic", "NotoSansGothic-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 596,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Gunjala Gondi",
			aliases: ["Noto Sans Gunjala Gondi", "NotoSansGunjalaGondi-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 846,
			hhea: [
				1014,
				-252,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Hanifi Rohingya",
			aliases: [
				"Noto Sans Hanifi Rohingya",
				"Noto Sans HanifiRohg",
				"NotoSansHanifiRohingya-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 518,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Hanunoo",
			aliases: ["Noto Sans Hanunoo", "NotoSansHanunoo-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 732,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Hatran",
			aliases: ["Noto Sans Hatran", "NotoSansHatran-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 569,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Imperial Aramaic",
			aliases: [
				"Noto Sans ImpAramaic",
				"Noto Sans Imperial Aramaic",
				"NotoSansImperialAramaic-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 629,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Inscriptional Pahlavi",
			aliases: [
				"Noto Sans Inscriptional Pahlavi",
				"Noto Sans InsPahlavi",
				"NotoSansInscriptionalPahlavi-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 581,
			hhea: [
				1069,
				-352,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Inscriptional Parthian",
			aliases: [
				"Noto Sans Inscriptional Parthian",
				"Noto Sans InsParthi",
				"NotoSansInscriptionalParthian-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 695,
			hhea: [
				1069,
				-301,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Javanese",
			aliases: ["Noto Sans Javanese", "NotoSansJavanese-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 945,
			hhea: [
				1120,
				-916,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Kaithi",
			aliases: ["Noto Sans Kaithi", "NotoSansKaithi-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 625,
			hhea: [
				1077,
				-425,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Kayah Li",
			aliases: ["Noto Sans Kayah Li", "NotoSansKayahLi-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 704,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Kharoshthi",
			aliases: ["Noto Sans Kharoshthi", "NotoSansKharoshthi-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 619,
			hhea: [
				1069,
				-301,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Khojki",
			aliases: ["Noto Sans Khojki", "NotoSansKhojki-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 670,
			hhea: [
				1409,
				-447,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Khudawadi",
			aliases: ["Noto Sans Khudawadi", "NotoSansKhudawadi-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 683,
			hhea: [
				944,
				-373,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Lepcha",
			aliases: ["Noto Sans Lepcha", "NotoSansLepcha-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 700,
			hhea: [
				1069,
				-450,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Limbu",
			aliases: ["Noto Sans Limbu", "NotoSansLimbu-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 544,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Linear A",
			aliases: ["Noto Sans Linear A", "NotoSansLinearA-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 741,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Linear B",
			aliases: ["Noto Sans Linear B", "NotoSansLinearB-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 841,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Lisu",
			aliases: ["Noto Sans Lisu", "NotoSansLisu-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 550,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Lycian",
			aliases: ["Noto Sans Lycian", "NotoSansLycian-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 596,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Lydian",
			aliases: ["Noto Sans Lydian", "NotoSansLydian-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 584,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Mahajani",
			aliases: ["Noto Sans Mahajani", "NotoSansMahajani-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 553,
			hhea: [
				757,
				-243,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Mandaic",
			aliases: ["Noto Sans Mandaic", "NotoSansMandaic-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 663,
			hhea: [
				724,
				-423,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Manichaean",
			aliases: ["Noto Sans Manichaean", "NotoSansManichaean-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 688,
			hhea: [
				790,
				-340,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Marchen",
			aliases: ["Noto Sans Marchen", "NotoSansMarchen-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 662,
			hhea: [
				1107,
				-534,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Masaram Gondi",
			aliases: ["Noto Sans Masaram Gondi", "NotoSansMasaramGondi-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 567,
			hhea: [
				1e3,
				-200,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Meetei Mayek",
			aliases: [
				"Noto Sans Meetei Mayek",
				"Noto Sans MeeteiMayek",
				"NotoSansMeeteiMayek-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 660,
			hhea: [
				1069,
				-321,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Mende Kikakui",
			aliases: ["Noto Sans Mende Kikakui", "NotoSansMendeKikakui-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 710,
			hhea: [
				1030,
				-237,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Meroitic",
			aliases: ["Noto Sans Meroitic", "NotoSansMeroitic-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 949,
			hhea: [
				928,
				-415,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Miao",
			aliases: ["Noto Sans Miao", "NotoSansMiao-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 448,
			hhea: [
				1142,
				-350,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Modi",
			aliases: ["Noto Sans Modi", "NotoSansModi-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 579,
			hhea: [
				891,
				-463,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Mongolian",
			aliases: ["Noto Sans Mongolian", "NotoSansMongolian-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 778,
			hhea: [
				1457,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Mro",
			aliases: ["Noto Sans Mro", "NotoSansMro-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 647,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Multani",
			aliases: ["Noto Sans Multani", "NotoSansMultani-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 614,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Nabataean",
			aliases: ["Noto Sans Nabataean", "NotoSansNabataean-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 517,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans New Tai Lue",
			aliases: [
				"Noto Sans New Tai Lue",
				"Noto Sans NewTaiLue",
				"NotoSansNewTaiLue-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 674,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Newa",
			aliases: ["Noto Sans Newa", "NotoSansNewa-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 552,
			hhea: [
				1036,
				-396,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans NKo",
			aliases: ["Noto Sans NKo", "NotoSansNKo-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 530,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Ol Chiki",
			aliases: ["Noto Sans Ol Chiki", "NotoSansOlChiki-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 562,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Old Hungarian",
			aliases: [
				"Noto Sans Old Hungarian",
				"Noto Sans OldHung",
				"NotoSansOldHungarian-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 641,
			hhea: [
				859,
				-177,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Old Italic",
			aliases: ["Noto Sans Old Italic", "NotoSansOldItalic-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 619,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Old North Arabian",
			aliases: [
				"Noto Sans Old North Arabian",
				"Noto Sans OldNorArab",
				"NotoSansOldNorthArabian-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 603,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Old Permic",
			aliases: ["Noto Sans Old Permic", "NotoSansOldPermic-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 607,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Old Persian",
			aliases: [
				"Noto Sans Old Persian",
				"Noto Sans OldPersian",
				"NotoSansOldPersian-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 1078,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Old South Arabian",
			aliases: [
				"Noto Sans Old South Arabian",
				"Noto Sans OldSouArab",
				"NotoSansOldSouthArabian-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 541,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Old Turkic",
			aliases: ["Noto Sans Old Turkic", "NotoSansOldTurkic-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 602,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Osage",
			aliases: ["Noto Sans Osage", "NotoSansOsage-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 613,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Osmanya",
			aliases: ["Noto Sans Osmanya", "NotoSansOsmanya-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 575,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Pahawh Hmong",
			aliases: ["Noto Sans Pahawh Hmong", "NotoSansPahawhHmong-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 686,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Palmyrene",
			aliases: ["Noto Sans Palmyrene", "NotoSansPalmyrene-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 787,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Pau Cin Hau",
			aliases: [
				"Noto Sans Pau Cin Hau",
				"Noto Sans PauCinHau",
				"NotoSansPauCinHau-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 597,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans PhagsPa",
			aliases: ["Noto Sans PhagsPa", "NotoSansPhagsPa-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 656,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Phoenician",
			aliases: ["Noto Sans Phoenician", "NotoSansPhoenician-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 599,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Psalter Pahlavi",
			aliases: [
				"Noto Sans Psalter Pahlavi",
				"Noto Sans PsaPahlavi",
				"NotoSansPsalterPahlavi-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 611,
			hhea: [
				737,
				-554,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Rejang",
			aliases: ["Noto Sans Rejang", "NotoSansRejang-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 560,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Samaritan",
			aliases: ["Noto Sans Samaritan", "NotoSansSamaritan-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 717,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Saurashtra",
			aliases: ["Noto Sans Saurashtra", "NotoSansSaurashtra-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 665,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Sharada",
			aliases: ["Noto Sans Sharada", "NotoSansSharada-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 597,
			hhea: [
				925,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Siddham",
			aliases: ["Noto Sans Siddham", "NotoSansSiddham-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 625,
			hhea: [
				1e3,
				-1030,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Sora Sompeng",
			aliases: [
				"Noto Sans Sora Sompeng",
				"Noto Sans SoraSomp",
				"NotoSansSoraSompeng-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 444,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Sundanese",
			aliases: ["Noto Sans Sundanese", "NotoSansSundanese-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 750,
			hhea: [
				1069,
				-368,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Sunuwar",
			aliases: ["Noto Sans Sunuwar", "NotoSansSunuwar-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 533,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Syloti Nagri",
			aliases: ["Noto Sans Syloti Nagri", "NotoSansSylotiNagri-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 663,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Tagalog",
			aliases: ["Noto Sans Tagalog", "NotoSansTagalog-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 773,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Tagbanwa",
			aliases: ["Noto Sans Tagbanwa", "NotoSansTagbanwa-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 711,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Tai Le",
			aliases: ["Noto Sans Tai Le", "NotoSansTaiLe-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 548,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Tai Tham",
			aliases: ["Noto Sans Tai Tham", "NotoSansTaiTham"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1298,
			hhea: [
				2189,
				-1e3,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Tai Viet",
			aliases: ["Noto Sans Tai Viet", "NotoSansTaiViet-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 728,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Takri",
			aliases: ["Noto Sans Takri", "NotoSansTakri-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 516,
			hhea: [
				955,
				-307,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Thaana",
			aliases: ["Noto Sans Thaana", "NotoSansThaana-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 560,
			hhea: [
				1069,
				-424,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Tifinagh",
			aliases: ["Noto Sans Tifinagh", "NotoSansTifinagh-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 656,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Tirhuta",
			aliases: ["Noto Sans Tirhuta", "NotoSansTirhuta-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 618,
			hhea: [
				1026,
				-519,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Ugaritic",
			aliases: ["Noto Sans Ugaritic", "NotoSansUgaritic-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 888,
			hhea: [
				743,
				-381,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Vai",
			aliases: ["Noto Sans Vai", "NotoSansVai-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 756,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Wancho",
			aliases: ["Noto Sans Wancho", "NotoSansWancho-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 524,
			hhea: [
				1096,
				-161,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Warang Citi",
			aliases: [
				"Noto Sans Warang Citi",
				"Noto Sans WarangCiti",
				"NotoSansWarangCiti-Regular"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 619,
			hhea: [
				1042,
				-100,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Sans Yi",
			aliases: ["Noto Sans Yi", "NotoSansYi-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 565,
			hhea: [
				1069,
				-293,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Serif Ahom",
			aliases: ["Noto Serif Ahom", "NotoSerifAhom-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 807,
			hhea: [
				980,
				-675,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Serif Balinese",
			aliases: ["Noto Serif Balinese", "NotoSerifBalinese-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 843,
			hhea: [
				1069,
				-726,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Serif Hmong Nyiakeng",
			aliases: ["Noto Serif Hmong Nyiakeng", "NotoSerifHmongNyiakeng-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 585,
			hhea: [
				1068,
				-292,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Noto Serif Yezidi",
			aliases: ["Noto Serif Yezidi", "NotoSerifYezidi-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 479,
			hhea: [
				1068,
				-292,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Oriya MN",
			aliases: [
				"Oriya MN",
				"OriyaMN",
				"उड़िया एमएन",
				"ଓରିୟା ଏମ୍ଏନ୍"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1152,
			hhea: [
				1825,
				-575,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Oriya MN",
			aliases: [
				"Oriya MN",
				"OriyaMN-Bold",
				"उड़िया एमएन",
				"ଓରିୟା ଏମ୍ଏନ୍"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1288,
			hhea: [
				1825,
				-575,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Oriya Sangam MN",
			aliases: [
				"Oriya Sangam MN",
				"OriyaSangamMN",
				"उड़िया संग एमएन",
				"ଓରିୟା ସଙ୍ଗମ ଏମ୍ଏନ୍"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1747,
			xAvgCharWidth: 1012,
			hhea: [
				1834,
				-611,
				175
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Oriya Sangam MN",
			aliases: [
				"Oriya Sangam MN",
				"OriyaSangamMN-Bold",
				"उड़िया संग एमएन",
				"ଓରିୟା ସଙ୍ଗମ ଏମ୍ଏନ୍"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1747,
			xAvgCharWidth: 1178,
			hhea: [
				1834,
				-611,
				175
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Papyrus",
			aliases: ["Papyrus", "Papyrus-Condensed"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 854,
			hhea: [
				1925,
				-1235,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Papyrus",
			aliases: ["Papyrus"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1238,
			hhea: [
				1925,
				-1235,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Party LET",
			aliases: ["Party LET", "PartyLetPlain"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 936,
			hhea: [
				1365,
				-1024,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Phosphate",
			aliases: ["Phosphate", "Phosphate-Inline"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 496,
			hhea: [
				940,
				-260,
				50
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Phosphate",
			aliases: ["Phosphate", "Phosphate-Solid"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 496,
			hhea: [
				940,
				-260,
				50
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Plantagenet Cherokee",
			aliases: ["Plantagenet Cherokee", "PlantagenetCherokee"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 568,
			hhea: [
				697,
				-285,
				74
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Mono",
			aliases: ["PT Mono", "PTMono-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 600,
			hhea: [
				885,
				-235,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Mono",
			aliases: ["PT Mono", "PTMono-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 600,
			hhea: [
				885,
				-235,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Sans",
			aliases: ["PT Sans", "PTSans-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 408,
			hhea: [
				900,
				-276,
				119
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Sans",
			aliases: ["PT Sans", "PTSans-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 431,
			hhea: [
				900,
				-276,
				119
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Sans",
			aliases: ["PT Sans", "PTSans-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 408,
			hhea: [
				900,
				-276,
				119
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Sans",
			aliases: ["PT Sans", "PTSans-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 429,
			hhea: [
				900,
				-276,
				119
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Sans Caption",
			aliases: ["PT Sans Caption", "PTSans-Caption"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 500,
			hhea: [
				900,
				-276,
				119
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Sans Caption",
			aliases: ["PT Sans Caption", "PTSans-CaptionBold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 495,
			hhea: [
				900,
				-276,
				119
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Sans Narrow",
			aliases: ["PT Sans Narrow", "PTSans-Narrow"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 346,
			hhea: [
				900,
				-276,
				119
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Sans Narrow",
			aliases: ["PT Sans Narrow", "PTSans-NarrowBold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 355,
			hhea: [
				900,
				-276,
				119
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Serif",
			aliases: ["PT Serif", "PTSerif-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 547,
			hhea: [
				1018,
				-276,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Serif",
			aliases: ["PT Serif", "PTSerif-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 564,
			hhea: [
				1018,
				-276,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Serif",
			aliases: ["PT Serif", "PTSerif-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 590,
			hhea: [
				1018,
				-276,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Serif",
			aliases: ["PT Serif", "PTSerif-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 601,
			hhea: [
				1018,
				-276,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Serif Caption",
			aliases: ["PT Serif Caption", "PTSerif-CaptionItalic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 614,
			hhea: [
				1018,
				-276,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "PT Serif Caption",
			aliases: ["PT Serif Caption", "PTSerif-Caption"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 633,
			hhea: [
				1018,
				-276,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Raanana",
			aliases: ["Raanana", "RaananaBold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 938,
			hhea: [
				1466,
				-582,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Raanana",
			aliases: ["Raanana"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 891,
			hhea: [
				1466,
				-582,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Rockwell",
			aliases: ["Rockwell", "Rockwell-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1228,
			hhea: [
				1391,
				-657,
				410
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Rockwell",
			aliases: ["Rockwell", "Rockwell-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1285,
			hhea: [
				1391,
				-657,
				410
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Rockwell",
			aliases: ["Rockwell", "Rockwell-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1332,
			hhea: [
				1391,
				-657,
				410
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Rockwell",
			aliases: ["Rockwell", "Rockwell-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1373,
			hhea: [
				1391,
				-657,
				410
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Sana",
			aliases: ["Sana", "صنعاء"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 0,
			hhea: [
				1528,
				-520,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Sathu",
			aliases: ["Sathu"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1274,
			xAvgCharWidth: 591,
			hhea: [
				1151,
				-404,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Savoye LET",
			aliases: ["Savoye LET", "SavoyeLetPlain"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 847,
			hhea: [
				1410,
				-1024,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Seravek",
			aliases: [
				"Seravek",
				"Seravek ExtraLight",
				"Seravek-ExtraLightItalic"
			],
			weight: 250,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 393,
			hhea: [
				925,
				-302,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Seravek",
			aliases: [
				"Seravek",
				"Seravek ExtraLight",
				"Seravek-ExtraLight"
			],
			weight: 250,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 403,
			hhea: [
				925,
				-302,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Seravek",
			aliases: [
				"Seravek",
				"Seravek Light",
				"Seravek-LightItalic"
			],
			weight: 300,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 403,
			hhea: [
				925,
				-302,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Seravek",
			aliases: [
				"Seravek",
				"Seravek Light",
				"Seravek-Light"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 418,
			hhea: [
				925,
				-302,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Seravek",
			aliases: ["Seravek", "Seravek-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 410,
			hhea: [
				925,
				-302,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Seravek",
			aliases: ["Seravek"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 425,
			hhea: [
				925,
				-302,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Seravek",
			aliases: [
				"Seravek",
				"Seravek Medium",
				"Seravek-MediumItalic"
			],
			weight: 500,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 431,
			hhea: [
				925,
				-302,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Seravek",
			aliases: [
				"Seravek",
				"Seravek Medium",
				"Seravek-Medium"
			],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 443,
			hhea: [
				925,
				-302,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Seravek",
			aliases: ["Seravek", "Seravek-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 437,
			hhea: [
				925,
				-302,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Seravek",
			aliases: ["Seravek", "Seravek-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 449,
			hhea: [
				925,
				-302,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Shree Devanagari 714",
			aliases: [
				"Shree Devanagari 714",
				"ShreeDev0714-Italic",
				"श्री देवनागरी 714"
			],
			weight: 400,
			style: "italic",
			unitsPerEm: 805,
			xAvgCharWidth: 500,
			hhea: [
				744,
				-344,
				107
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Shree Devanagari 714",
			aliases: [
				"Shree Devanagari 714",
				"ShreeDev0714",
				"श्री देवनागरी 714"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 805,
			xAvgCharWidth: 500,
			hhea: [
				744,
				-344,
				107
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Shree Devanagari 714",
			aliases: [
				"Shree Devanagari 714",
				"ShreeDev0714-BoldItalic",
				"श्री देवनागरी 714"
			],
			weight: 700,
			style: "italic",
			unitsPerEm: 805,
			xAvgCharWidth: 469,
			hhea: [
				744,
				-344,
				107
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Shree Devanagari 714",
			aliases: [
				"Shree Devanagari 714",
				"ShreeDev0714-Bold",
				"श्री देवनागरी 714"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 805,
			xAvgCharWidth: 469,
			hhea: [
				744,
				-344,
				107
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "SignPainter",
			aliases: [
				"SignPainter",
				"SignPainter-HouseScript",
				"SignPainter-HouseScriptSemibold"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 430,
			hhea: [
				700,
				-200,
				68
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "SignPainter",
			aliases: ["SignPainter", "SignPainter-HouseScript"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 403,
			hhea: [
				700,
				-200,
				68
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Silom",
			aliases: ["Silom"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 546,
			hhea: [
				959,
				-316,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Sinhala MN",
			aliases: ["Sinhala MN", "SinhalaMN"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1588,
			hhea: [
				1825,
				-575,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Sinhala MN",
			aliases: ["Sinhala MN", "SinhalaMN-Bold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1623,
			hhea: [
				1825,
				-575,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Sinhala Sangam MN",
			aliases: ["Sinhala Sangam MN", "SinhalaSangamMN"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1534,
			hhea: [
				2102,
				-646,
				259
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Sinhala Sangam MN",
			aliases: ["Sinhala Sangam MN", "SinhalaSangamMN-Bold"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1534,
			hhea: [
				2102,
				-646,
				259
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Snell Roundhand",
			aliases: ["Snell Roundhand", "SnellRoundhand"],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 573,
			hhea: [
				937,
				-324,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Snell Roundhand",
			aliases: ["Snell Roundhand", "SnellRoundhand-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 615,
			hhea: [
				937,
				-324,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Snell Roundhand",
			aliases: ["Snell Roundhand", "SnellRoundhand-Black"],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 667,
			hhea: [
				937,
				-324,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Songti SC",
			aliases: [
				"Songti SC",
				"STSongti-SC-Light",
				"宋体-简",
				"宋體-簡"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 408,
			hhea: [
				1060,
				-340,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-supplemental",
			family: "Songti SC",
			aliases: [
				"Songti SC",
				"STSongti-SC-Regular",
				"宋体-简",
				"宋體-簡"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 407,
			hhea: [
				1060,
				-340,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-supplemental",
			family: "Songti SC",
			aliases: [
				"Songti SC",
				"STSongti-SC-Bold",
				"宋体-简",
				"宋體-簡"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 407,
			hhea: [
				1060,
				-340,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-supplemental",
			family: "Songti SC",
			aliases: [
				"Songti SC",
				"STSongti-SC-Black",
				"宋体-简",
				"宋體-簡"
			],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 408,
			hhea: [
				1060,
				-340,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-supplemental",
			family: "Songti TC",
			aliases: [
				"Songti TC",
				"STSongti-TC-Light",
				"宋体-繁",
				"宋體-繁"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 408,
			hhea: [
				1060,
				-340,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-supplemental",
			family: "Songti TC",
			aliases: [
				"Songti TC",
				"STSongti-TC-Regular",
				"宋体-繁",
				"宋體-繁"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 407,
			hhea: [
				1060,
				-340,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-supplemental",
			family: "Songti TC",
			aliases: [
				"Songti TC",
				"STSongti-TC-Bold",
				"宋体-繁",
				"宋體-繁"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 407,
			hhea: [
				1060,
				-340,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-supplemental",
			family: "STIX Two Math",
			aliases: ["STIX Two Math", "STIXTwoMath-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 709,
			hhea: [
				762,
				-238,
				250
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXGeneral",
			aliases: ["STIXGeneral", "STIXGeneral-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 402,
			hhea: [
				1055,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXGeneral",
			aliases: ["STIXGeneral", "STIXGeneral-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 401,
			hhea: [
				1055,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXGeneral",
			aliases: ["STIXGeneral", "STIXGeneral-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 412,
			hhea: [
				1042,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXGeneral",
			aliases: ["STIXGeneral", "STIXGeneral-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 426,
			hhea: [
				1055,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXIntegralsD",
			aliases: ["STIXIntegralsD", "STIXIntegralsD-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 733,
			hhea: [
				2182,
				-451,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXIntegralsD",
			aliases: ["STIXIntegralsD", "STIXIntegralsD-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 848,
			hhea: [
				2182,
				-451,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXIntegralsSm",
			aliases: ["STIXIntegralsSm", "STIXIntegralsSm-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 582,
			hhea: [
				1055,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXIntegralsSm",
			aliases: ["STIXIntegralsSm", "STIXIntegralsSm-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 669,
			hhea: [
				1055,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXIntegralsUp",
			aliases: ["STIXIntegralsUp", "STIXIntegralsUp-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 507,
			hhea: [
				1055,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXIntegralsUp",
			aliases: ["STIXIntegralsUp", "STIXIntegralsUp-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 551,
			hhea: [
				1055,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXIntegralsUpD",
			aliases: ["STIXIntegralsUpD", "STIXIntegralsUpD-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 689,
			hhea: [
				2182,
				-451,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXIntegralsUpD",
			aliases: ["STIXIntegralsUpD", "STIXIntegralsUpD-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 735,
			hhea: [
				2182,
				-451,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXIntegralsUpSm",
			aliases: ["STIXIntegralsUpSm", "STIXIntegralsUpSm-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 501,
			hhea: [
				1055,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXIntegralsUpSm",
			aliases: ["STIXIntegralsUpSm", "STIXIntegralsUpSm-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 549,
			hhea: [
				1055,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXNonUnicode",
			aliases: ["STIXNonUnicode", "STIXNonUnicode-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 592,
			hhea: [
				1450,
				-552,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXNonUnicode",
			aliases: ["STIXNonUnicode", "STIXNonUnicode-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 730,
			hhea: [
				1450,
				-552,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXNonUnicode",
			aliases: ["STIXNonUnicode", "STIXNonUnicode-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 632,
			hhea: [
				1450,
				-552,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXNonUnicode",
			aliases: ["STIXNonUnicode", "STIXNonUnicode-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 648,
			hhea: [
				1450,
				-552,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXSizeFiveSym",
			aliases: ["STIXSizeFiveSym", "STIXSizeFiveSym-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 2597,
			hhea: [
				960,
				-454,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXSizeFourSym",
			aliases: ["STIXSizeFourSym", "STIXSizeFourSym-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 1394,
			hhea: [
				2604,
				-510,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXSizeFourSym",
			aliases: ["STIXSizeFourSym", "STIXSizeFourSym-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 840,
			hhea: [
				2604,
				-510,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXSizeOneSym",
			aliases: ["STIXSizeOneSym", "STIXSizeOneSym-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 812,
			hhea: [
				1588,
				-363,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXSizeOneSym",
			aliases: ["STIXSizeOneSym", "STIXSizeOneSym-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 669,
			hhea: [
				1588,
				-363,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXSizeThreeSym",
			aliases: ["STIXSizeThreeSym", "STIXSizeThreeSym-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 1154,
			hhea: [
				2604,
				-510,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXSizeThreeSym",
			aliases: ["STIXSizeThreeSym", "STIXSizeThreeSym-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 710,
			hhea: [
				2604,
				-510,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXSizeTwoSym",
			aliases: ["STIXSizeTwoSym", "STIXSizeTwoSym-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 915,
			hhea: [
				2095,
				-404,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXSizeTwoSym",
			aliases: ["STIXSizeTwoSym", "STIXSizeTwoSym-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 598,
			hhea: [
				2095,
				-404,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXVariants",
			aliases: ["STIXVariants", "STIXVariants-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 636,
			hhea: [
				1055,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STIXVariants",
			aliases: ["STIXVariants", "STIXVariants-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 663,
			hhea: [
				1055,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "STSong",
			aliases: ["STSong", "华文宋体"],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 408,
			hhea: [
				860,
				-140,
				0
			],
			farEastCodePage: !0
		},
		{
			source: "macos-supplemental",
			family: "Sukhumvit Set",
			aliases: ["Sukhumvit Set", "SukhumvitSet-Thin"],
			weight: 250,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 515,
			hhea: [
				1103,
				-474,
				10
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Sukhumvit Set",
			aliases: ["Sukhumvit Set", "SukhumvitSet-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 528,
			hhea: [
				1103,
				-474,
				10
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Sukhumvit Set",
			aliases: ["Sukhumvit Set", "SukhumvitSet-Text"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 528,
			hhea: [
				1103,
				-474,
				10
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Sukhumvit Set",
			aliases: ["Sukhumvit Set", "SukhumvitSet-Medium"],
			weight: 500,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 532,
			hhea: [
				1103,
				-474,
				10
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Sukhumvit Set",
			aliases: ["Sukhumvit Set", "SukhumvitSet-SemiBold"],
			weight: 600,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 540,
			hhea: [
				1103,
				-474,
				10
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Sukhumvit Set",
			aliases: ["Sukhumvit Set", "SukhumvitSet-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 548,
			hhea: [
				1103,
				-474,
				10
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Superclarendon",
			aliases: ["Superclarendon", "Superclarendon-LightItalic"],
			weight: 300,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 559,
			hhea: [
				980,
				-225,
				56
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Superclarendon",
			aliases: ["Superclarendon", "Superclarendon-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 686,
			hhea: [
				980,
				-225,
				56
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Superclarendon",
			aliases: ["Superclarendon", "Superclarendon-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 588,
			hhea: [
				980,
				-225,
				56
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Superclarendon",
			aliases: ["Superclarendon", "Superclarendon-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 725,
			hhea: [
				980,
				-225,
				56
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Superclarendon",
			aliases: ["Superclarendon", "Superclarendon-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 616,
			hhea: [
				980,
				-225,
				56
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Superclarendon",
			aliases: ["Superclarendon", "Superclarendon-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 748,
			hhea: [
				980,
				-225,
				56
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Superclarendon",
			aliases: ["Superclarendon", "Superclarendon-BlackItalic"],
			weight: 900,
			style: "italic",
			unitsPerEm: 1e3,
			xAvgCharWidth: 645,
			hhea: [
				980,
				-225,
				56
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Superclarendon",
			aliases: ["Superclarendon", "Superclarendon-Black"],
			weight: 900,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 765,
			hhea: [
				980,
				-225,
				56
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Tahoma",
			aliases: ["Tahoma"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 910,
			hhea: [
				2049,
				-423,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Tahoma",
			aliases: ["Tahoma", "Tahoma-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1036,
			hhea: [
				2049,
				-423,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Tamil MN",
			aliases: [
				"Tamil MN",
				"TamilMN",
				"तमिल एमएन",
				"தமிழ் எம்என்"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1736,
			hhea: [
				1825,
				-575,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Tamil MN",
			aliases: [
				"Tamil MN",
				"TamilMN-Bold",
				"तमिल एमएन",
				"தமிழ் எம்என்"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1838,
			hhea: [
				1825,
				-576,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Tamil Sangam MN",
			aliases: [
				"Tamil Sangam MN",
				"TamilSangamMN",
				"तमिल संगम एमएन",
				"தமிழ் சங்கம் எம்என்"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1559,
			hhea: [
				1550,
				-717,
				-210
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Tamil Sangam MN",
			aliases: [
				"Tamil Sangam MN",
				"TamilSangamMN-Bold",
				"तमिल संगम एमएन",
				"தமிழ் சங்கம் எம்என்"
			],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1586,
			hhea: [
				1550,
				-717,
				-210
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Telugu MN",
			aliases: [
				"Telugu MN",
				"TeluguMN",
				"तेलुगु एमएन",
				"తెలుగు ఎమ్ఎన్"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1518,
			hhea: [
				1825,
				-575,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Telugu MN",
			aliases: [
				"Telugu MN",
				"TeluguMN-Bold",
				"तेलुगु एमएन",
				"తెలుగు ఎమ్ఎన్"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1591,
			hhea: [
				1825,
				-575,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Telugu Sangam MN",
			aliases: [
				"Telugu Sangam MN",
				"TeluguSangamMN",
				"तेलुगु संगम एमएन",
				"తెలుగు సంగం ఎమ్ఎన్"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1900,
			xAvgCharWidth: 1729,
			hhea: [
				1875,
				-1178,
				26
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Telugu Sangam MN",
			aliases: [
				"Telugu Sangam MN",
				"TeluguSangamMN-Bold",
				"तेलुगु संगम एमएन",
				"తెలుగు సంగం ఎమ్ఎన్"
			],
			weight: 400,
			style: "normal",
			unitsPerEm: 1900,
			xAvgCharWidth: 1799,
			hhea: [
				1875,
				-1178,
				26
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Thonburi",
			aliases: ["Thonburi", "Thonburi-Light"],
			weight: 300,
			style: "normal",
			unitsPerEm: 2560,
			xAvgCharWidth: 1158,
			hhea: [
				2769,
				-584,
				171
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Thonburi",
			aliases: ["Thonburi"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2560,
			xAvgCharWidth: 1158,
			hhea: [
				2769,
				-584,
				171
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Thonburi",
			aliases: ["Thonburi", "Thonburi-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2560,
			xAvgCharWidth: 1158,
			hhea: [
				2769,
				-584,
				171
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Times New Roman",
			aliases: ["Times New Roman", "TimesNewRomanPS-ItalicMT"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 823,
			hhea: [
				1825,
				-443,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Times New Roman",
			aliases: ["Times New Roman", "TimesNewRomanPSMT"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 821,
			hhea: [
				1825,
				-443,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Times New Roman",
			aliases: ["Times New Roman", "TimesNewRomanPS-BoldItalicMT"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 844,
			hhea: [
				1825,
				-443,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Times New Roman",
			aliases: ["Times New Roman", "TimesNewRomanPS-BoldMT"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 874,
			hhea: [
				1825,
				-443,
				87
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Trattatello",
			aliases: ["Trattatello"],
			weight: 400,
			style: "normal",
			unitsPerEm: 1e3,
			xAvgCharWidth: 209,
			hhea: [
				1150,
				-662,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Trebuchet MS",
			aliases: ["Trebuchet MS", "TrebuchetMS-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 939,
			hhea: [
				1923,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Trebuchet MS",
			aliases: ["Trebuchet MS", "TrebuchetMS"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 929,
			hhea: [
				1923,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Trebuchet MS",
			aliases: ["Trebuchet MS", "Trebuchet-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 986,
			hhea: [
				1923,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Trebuchet MS",
			aliases: ["Trebuchet MS", "TrebuchetMS-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 970,
			hhea: [
				1923,
				-455,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Verdana",
			aliases: ["Verdana", "Verdana-Italic"],
			weight: 400,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1041,
			hhea: [
				2059,
				-430,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Verdana",
			aliases: ["Verdana"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1041,
			hhea: [
				2059,
				-430,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Verdana",
			aliases: ["Verdana", "Verdana-BoldItalic"],
			weight: 700,
			style: "italic",
			unitsPerEm: 2048,
			xAvgCharWidth: 1163,
			hhea: [
				2059,
				-430,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Verdana",
			aliases: ["Verdana", "Verdana-Bold"],
			weight: 700,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1163,
			hhea: [
				2059,
				-430,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Waseem",
			aliases: [
				"Waseem",
				"WaseemLight",
				"وسيم"
			],
			weight: 300,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 308,
			hhea: [
				1827,
				-1131,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Waseem",
			aliases: ["Waseem", "وسيم"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 326,
			hhea: [
				1827,
				-1131,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Webdings",
			aliases: ["Webdings"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1989,
			hhea: [
				1638,
				-410,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Wingdings",
			aliases: ["Wingdings", "Wingdings-Regular"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1822,
			hhea: [
				1841,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Wingdings 2",
			aliases: ["Wingdings 2", "Wingdings2"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1700,
			hhea: [
				1727,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Wingdings 3",
			aliases: ["Wingdings 3", "Wingdings3"],
			weight: 400,
			style: "normal",
			unitsPerEm: 2048,
			xAvgCharWidth: 1584,
			hhea: [
				1900,
				-432,
				0
			],
			farEastCodePage: !1
		},
		{
			source: "macos-supplemental",
			family: "Zapfino",
			aliases: ["Zapfino"],
			weight: 400,
			style: "italic",
			unitsPerEm: 400,
			xAvgCharWidth: 226,
			hhea: [
				750,
				-601,
				0
			],
			farEastCodePage: !1
		}
	]
}, b = [
	{
		source: "published-open-font",
		family: "BIZ UDGothic",
		aliases: ["BIZ UDGothic", "BIZUDGothic-Regular"],
		weight: 400,
		style: "normal",
		unitsPerEm: 2048,
		hhea: [
			1802,
			-246,
			0
		],
		farEastCodePage: !0,
		xAvgCharWidth: 1718
	},
	{
		source: "published-open-font",
		family: "BIZ UDGothic",
		aliases: ["BIZ UDGothic", "BIZUDGothic-Bold"],
		weight: 700,
		style: "normal",
		unitsPerEm: 2048,
		hhea: [
			1802,
			-246,
			0
		],
		farEastCodePage: !0,
		xAvgCharWidth: 1718
	},
	{
		source: "published-open-font",
		family: "BIZ UDMincho",
		aliases: ["BIZ UDMincho", "BIZUDMincho-Regular"],
		weight: 400,
		style: "normal",
		unitsPerEm: 2048,
		hhea: [
			1802,
			-246,
			0
		],
		farEastCodePage: !0,
		xAvgCharWidth: 1959
	},
	{
		source: "published-open-font",
		family: "BIZ UDMincho",
		aliases: ["BIZ UDMincho", "BIZUDMincho-Bold"],
		weight: 700,
		style: "normal",
		unitsPerEm: 2048,
		hhea: [
			1802,
			-246,
			0
		],
		farEastCodePage: !0,
		xAvgCharWidth: 1963
	}
];
//#endregion
//#region packages/core/src/fonts/reference-font-metrics.ts
function x(e) {
	return Object.freeze(e.aliases), Object.freeze(e.hhea), Object.freeze(e);
}
var S;
function C() {
	return S ??= Object.freeze([...y.profiles, ...b].map(x));
}
var w, T = Object.freeze([]);
function E(e) {
	return e.normalize("NFKC").trim().replace(/\s+/gu, " ").toLocaleLowerCase("en-US");
}
function D(e) {
	return `${e.source ?? "*"}|${e.weight ?? "*"}|${e.style ?? "*"}`;
}
function O() {
	if (w !== void 0) return w;
	let e = /* @__PURE__ */ new Map();
	for (let t of C()) {
		let n = new Set(t.aliases.map(E)), r = /* @__PURE__ */ new Set();
		for (let e of [void 0, t.source]) for (let n of [void 0, t.weight]) for (let i of [void 0, t.style]) r.add(D({
			source: e,
			weight: n,
			style: i
		}));
		for (let i of n) {
			let n = e.get(i);
			n === void 0 && (n = /* @__PURE__ */ new Map(), e.set(i, n));
			for (let e of r) {
				let r = n.get(e);
				r === void 0 ? n.set(e, [t]) : r.push(t);
			}
		}
	}
	for (let t of e.values()) for (let e of t.values()) Object.freeze(e);
	return w = e, w;
}
function k(e, t = {}) {
	let n = E(e);
	return n ? O().get(n)?.get(D(t)) ?? T : T;
}
//#endregion
//#region packages/core/src/fonts/office-fallback.ts
var A = 32, j = 8e3;
function M(e) {
	let t = e.family.trim();
	if (!t) return;
	let n = e.weight ?? 400, r = e.style ?? "normal";
	if (n !== 400 && n !== 700 || r !== "normal" && r !== "italic") return;
	let i = k(t, {
		weight: n,
		style: r
	});
	if (i.length === 0) return;
	let a = new Set(k(t).filter((e) => e.weight !== n || e.style !== r).flatMap((e) => e.aliases.map(p))), o = [...new Set(i.flatMap((e) => e.aliases))].filter((e) => !a.has(p(e)));
	if (n === 400 && r === "normal") for (let e of i) o.some((t) => p(t) === p(e.family)) || o.push(e.family);
	if (o.length !== 0) return {
		family: t,
		weight: n,
		style: r,
		localNames: o
	};
}
function N(e) {
	let t = p(e.family);
	return e.weight === 400 && e.style === "normal" ? t : `${t}:${e.weight}:${e.style}`;
}
function P(e, t) {
	let n = e.trim().toLowerCase();
	if (n === "normal") return t === 400;
	if (n === "bold") return t === 700;
	let r = /^(\d+)(?:\s+(\d+))?$/u.exec(n);
	if (!r) return !1;
	let i = Number(r[1]), a = Number(r[2] ?? r[1]);
	return i <= t && t <= a;
}
function F(e, t) {
	return e.status !== "loaded" || p(e.family.replace(/^(['"])(.*)\1$/u, "$2")) !== p(t.family) || e.style.trim().toLowerCase() !== t.style ? !1 : P(e.weight, t.weight);
}
async function I(e, t = s()) {
	if (!t || typeof FontFace > "u") return {
		faces: [],
		routes: {},
		checked: []
	};
	let n = typeof t[Symbol.iterator] == "function" ? [...t] : [], r = [...new Map(e.map(M).filter((e) => !!e).filter((e) => !n.some((t) => F(t, e))).map((e) => [N(e), e])).values()];
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
	let a = [...i.values()].slice(0, A), o = Array(a.length), c = 0, l = !0, u = Array.from({ length: Math.min(4, a.length) }, async () => {
		for (; l && c < a.length;) {
			let e = c++, n = await _(a[e].map((e) => ({
				family: e.family,
				localNames: e.localNames,
				weight: e.weight,
				style: e.style
			})), t);
			l ? o[e] = n : v(n.faces);
		}
	}), d, p = await Promise.race([Promise.allSettled(u), new Promise((e) => {
		d = setTimeout(() => e(null), j);
	})]);
	d !== void 0 && clearTimeout(d), l = !1;
	let m = p?.find((e) => e.status === "rejected");
	if (m) throw v(o.flatMap((e) => e?.faces ?? [])), m.reason;
	let h = Object.assign({}, ...o.flatMap((e) => e ? [e.metrics] : [])), g = {};
	for (let e of r) {
		let t = N(e), n = h[t];
		if (!n) continue;
		let r = `office-local:${n.sourceIdentity ?? e.localNames.join(",")}`;
		g[t] = {
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
		faces: o.flatMap((e) => e?.faces ?? []),
		routes: g,
		checked: o.flatMap((e, t) => e && !f(e) ? a[t].map(N) : [])
	};
}
function L(e) {
	v(e);
}
//#endregion
//#region packages/core/src/internal/bounded-async-lru-cache.ts
function R(e, t) {
	if (!Number.isSafeInteger(e) || e <= 0) throw TypeError(`${t} must be a positive safe integer`);
}
function z(e) {
	if (!Number.isSafeInteger(e) || e < 0) throw TypeError("cache entry weight must be a non-negative safe integer");
}
var B = class {
	#e;
	#t;
	#n;
	#r;
	#i = /* @__PURE__ */ new Map();
	#a = /* @__PURE__ */ new Map();
	#o = 0;
	constructor(e) {
		R(e.maxEntries, "maxEntries"), R(e.maxWeight, "maxWeight"), this.#e = e.maxEntries, this.#t = e.maxWeight, this.#n = e.measure, this.#r = e.onRemove;
	}
	get usage() {
		return {
			entries: this.#i.size,
			weight: this.#o,
			pending: this.#a.size
		};
	}
	has(e) {
		return this.#i.has(e);
	}
	get(e) {
		let t = this.#i.get(e);
		if (t !== void 0) return this.#i.delete(e), this.#i.set(e, t), t.value;
	}
	getOrLoad(e, t) {
		let n = this.get(e);
		if (n !== void 0 || this.#i.has(e)) return Promise.resolve(n);
		let r = this.#a.get(e);
		if (r !== void 0) return r.promise;
		let i = {}, a = Promise.resolve().then(t).then((t) => this.#c(e, i, t), (t) => {
			throw this.#s(e, i), t;
		});
		return this.#a.set(e, {
			token: i,
			promise: a
		}), a;
	}
	delete(e) {
		let t = this.#a.delete(e), n = this.#i.get(e);
		return n === void 0 ? t : (this.#i.delete(e), this.#o -= n.weight, this.#l(n.value, e, "deleted"), !0);
	}
	clear() {
		this.#a.clear();
		let e = [...this.#i];
		this.#i.clear(), this.#o = 0;
		for (let [t, n] of e) this.#l(n.value, t, "cleared");
	}
	#s(e, t) {
		this.#a.get(e)?.token === t && this.#a.delete(e);
	}
	#c(e, t, n) {
		if (this.#a.get(e)?.token !== t) return n;
		let r;
		try {
			r = this.#n(n), z(r);
		} catch (n) {
			throw this.#s(e, t), n;
		}
		if (this.#a.get(e)?.token !== t || (this.#a.delete(e), r > this.#t)) return n;
		let i = [];
		for (; this.#i.size >= this.#e || r > this.#t - this.#o;) {
			let e = this.#i.entries().next().value;
			if (e === void 0) break;
			let [t, n] = e;
			this.#i.delete(t), this.#o -= n.weight, i.push([t, n]);
		}
		this.#i.set(e, {
			value: n,
			weight: r
		}), this.#o += r;
		for (let [e, t] of i) this.#l(t.value, e, "evicted");
		return n;
	}
	#l(e, t, n) {
		try {
			this.#r?.(e, t, n);
		} catch {}
	}
}, V = class {
	#e;
	constructor(e) {
		this.#e = new B({
			maxEntries: e.maxEntries,
			maxWeight: e.maxBytes,
			measure: (e) => e.size
		});
	}
	get usage() {
		let e = this.#e.usage;
		return {
			entries: e.entries,
			bytes: e.weight,
			pending: e.pending
		};
	}
	async get(e, t, n) {
		if (typeof e != "string" || e.length === 0) throw TypeError("raw package part path must be a non-empty string");
		if (typeof t != "string") throw TypeError("raw package part MIME type must be a string");
		let r = await this.#e.getOrLoad(e, async () => {
			let e = await n();
			if (!(e instanceof Blob)) throw TypeError("raw package part loader must return a Blob");
			return e;
		});
		return t === "" || r.type === t ? r : r.slice(0, r.size, t);
	}
	clear() {
		this.#e.clear();
	}
};
//#endregion
export { L as a, l as c, n as d, t as f, I as i, u as l, B as n, k as o, P as r, s, V as t, i as u };
