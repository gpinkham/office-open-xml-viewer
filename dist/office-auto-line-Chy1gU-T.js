import { Gn as e, In as t, Wn as n, _r as r, qn as i } from "./plot-area-frame-DvwuejI0.js";
import { t as a } from "./mathjax-CpYcThTp.js";
import { n as o, r as s, t as c } from "./line-order-Bk3VRyjc.js";
//#region packages/core/src/text/cjk-ranges.ts
function l(e) {
	return e >= 12288 && e <= 40959 || e >= 44032 && e <= 55203 || e >= 63744 && e <= 64255 || e >= 65280 && e <= 65519;
}
function u(e) {
	return e === 32 || e === 9 || e === 10 || e === 13 ? !1 : !l(e);
}
//#endregion
//#region packages/core/src/text/sea-break.ts
function d(e) {
	return e === "my" || e === "bo";
}
function f(e) {
	return e >= 3584 && e <= 3711 || e >= 3712 && e <= 3839 || e >= 6016 && e <= 6143 || e >= 4096 && e <= 4255 || e >= 43616 && e <= 43647 || e >= 43488 && e <= 43519 || e >= 3840 && e <= 4095;
}
function p(e) {
	return e === 3633 || e >= 3635 && e <= 3642 || e >= 3655 && e <= 3662 || e === 3761 || e >= 3763 && e <= 3772 || e >= 3784 && e <= 3790 || e >= 6068 && e <= 6099 || e === 6109;
}
function m(e) {
	return e <= 3711 ? "th" : e <= 3839 ? "lo" : e <= 4095 ? "bo" : e <= 4255 ? "my" : e <= 6143 ? "km" : "my";
}
function h(e) {
	for (let t of e) if (f(t.codePointAt(0))) return !0;
	return !1;
}
function g(e) {
	for (let t of e) {
		let e = t.codePointAt(0);
		if (f(e)) return d(m(e));
	}
	return !1;
}
function _(e) {
	let t = !1;
	for (let n of e) {
		let e = n.codePointAt(0);
		if (f(e)) {
			if (d(m(e))) return !1;
			t = !0;
		}
	}
	return t;
}
var v, y = /* @__PURE__ */ new Map();
function b(e) {
	let t = y.get(e);
	if (t !== void 0) return t;
	let n = null;
	try {
		typeof Intl < "u" && typeof Intl.Segmenter == "function" && (n = new Intl.Segmenter(e, { granularity: "word" }));
	} catch {
		n = null;
	}
	return y.set(e, n), n;
}
function x(e) {
	if (v === null) return null;
	if (typeof v == "function") {
		let t = v;
		return (n) => t(n, e);
	}
	let t = b(e);
	return t ? (e) => t.segment(e) : null;
}
function S(e) {
	if (!h(e)) return [];
	let t = [], n = e.length, r = 0;
	for (; r < n;) {
		let i = e.codePointAt(r), a = i > 65535 ? 2 : 1;
		if (!f(i)) {
			r += a;
			continue;
		}
		let o = m(i), s = d(o), c = r + a;
		for (; c < n;) {
			let t = e.codePointAt(c);
			if (!f(t) || d(m(t)) !== s) break;
			c += t > 65535 ? 2 : 1;
		}
		let l = e.slice(r, c);
		if (s) for (let e of A(l)) t.push(r + e);
		else {
			let e = x(o);
			if (e) {
				let n = [];
				try {
					for (let t of e(l)) t.index > 0 && (t.isWordLike ?? !0) && n.push(r + t.index);
					for (let e of n) t.push(e);
				} catch {}
			}
		}
		r = c;
	}
	return t;
}
function C(e) {
	if (!h(e)) return [];
	let t = [], n = e.length, r = e.codePointAt(0), i = r > 65535 ? 2 : 1;
	for (; i < n;) {
		let n = e.codePointAt(i), a = n > 65535 ? 2 : 1;
		f(r) !== f(n) && !w(r) && !w(n) && t.push(i), r = n, i += a;
	}
	return t;
}
function w(e) {
	return e === 32 || e === 9 || e === 10 || e === 13 || e === 12288 || e === 160 || e === 8199 || e === 8239 || e === 8288 || e === 65279;
}
function T(e, t) {
	if (!h(e)) return [];
	let n = e.length, r = new Set(S(e)), i = new Set(A(e)), a = (e) => {
		i.has(e) && r.add(e);
	};
	for (let t of C(e)) a(t);
	if (t?.cjk) {
		let t = e.codePointAt(0), r = t > 65535 ? 2 : 1;
		for (; r < n;) {
			let n = e.codePointAt(r);
			(l(n) || l(t)) && a(r), t = n, r += n > 65535 ? 2 : 1;
		}
	}
	let o = t?.kinsoku, s = o != null && o.enabled !== !1, c = [];
	for (let t of r) if (!(t <= 0 || t >= n)) {
		if (s) {
			let n = e.codePointAt(t), r = E(e, t);
			if (r !== void 0 && o.lineEndForbidden.has(r) || o.lineStartForbidden.has(n)) continue;
		}
		c.push(t);
	}
	return c.sort((e, t) => e - t), c;
}
function E(e, t) {
	if (t <= 0) return;
	let n = e.charCodeAt(t - 1);
	if (n >= 56320 && n <= 57343 && t >= 2) {
		let n = e.charCodeAt(t - 2);
		if (n >= 55296 && n <= 56319) return e.codePointAt(t - 2);
	}
	return n;
}
function D(e, t, n, r, i, a = !1) {
	let o = e.length;
	if (n >= o) return n;
	if (a) {
		if (i(e.slice(n, o)) <= r) return o;
		let a = 0, s = t.length - 1, c = n;
		for (; a <= s;) {
			let l = a + s >> 1, u = t[l];
			u <= n ? a = l + 1 : u >= o ? s = l - 1 : i(e.slice(n, u)) <= r ? (c = u, a = l + 1) : s = l - 1;
		}
		return c;
	}
	let s = n;
	for (let a of t) a <= n || a >= o || i(e.slice(n, a)) <= r && (s = a);
	return i(e.slice(n, o)) <= r && (s = o), s;
}
var O;
function k() {
	if (O !== void 0) return O;
	let e = null;
	try {
		typeof Intl < "u" && typeof Intl.Segmenter == "function" && (e = new Intl.Segmenter(void 0, { granularity: "grapheme" }));
	} catch {
		e = null;
	}
	return O = e, e;
}
function A(e) {
	let t = k();
	if (t) try {
		let n = [];
		for (let r of t.segment(e)) r.index > 0 && n.push(r.index);
		return n;
	} catch {}
	let n = [];
	for (let t = 0; t < e.length;) {
		let r = e.codePointAt(t);
		t += r > 65535 ? 2 : 1, t < e.length && n.push(t);
	}
	return n;
}
var j = {
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
			farEastCodePage: !1,
			win: [1788, 568],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1788, 568],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [3854, 1636],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [3854, 1679],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [4066, 1725],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [3949, 1724],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [2068, 563],
			panose: [2, 11],
			typoMetrics: [
				1923,
				-577,
				0
			]
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
			farEastCodePage: !1,
			win: [1854, 434],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1854, 434],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1854, 434],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1854, 434],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2254, 634],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1873, 431],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1916, 434],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1938, 432],
			panose: [2, 15]
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
			farEastCodePage: !1,
			win: [1805, 531],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [879, 145],
			panose: [2, 3]
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
			farEastCodePage: !0,
			win: [879, 145],
			panose: [2, 3]
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
			farEastCodePage: !1,
			win: [1841, 477],
			panose: [4, 3]
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
			farEastCodePage: !1,
			win: [1768, 554],
			panose: [2, 3]
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
			farEastCodePage: !1,
			win: [1716, 546],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1772, 547],
			panose: [2, 3]
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
			farEastCodePage: !1,
			win: [1986, 446],
			panose: [2, 5]
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
			farEastCodePage: !1,
			win: [1889, 573],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1967, 578],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1888, 575],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1891, 543],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1791, 475],
			panose: [2, 5]
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
			farEastCodePage: !1,
			win: [1831, 473],
			panose: [2, 5]
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
			farEastCodePage: !1,
			win: [1929, 473],
			panose: [2, 5]
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
			farEastCodePage: !1,
			win: [1927, 473],
			panose: [2, 5]
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
			farEastCodePage: !1,
			win: [220, 36],
			panose: [5, 1]
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
			farEastCodePage: !1,
			win: [2021, 455],
			panose: [4, 3]
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
			farEastCodePage: !1,
			win: [1835, 434],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 15]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 15]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 15]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 15]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 15]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 15]
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
			farEastCodePage: !1,
			win: [1848, 512],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1894, 470],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1894, 512],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1884, 465],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1946, 455],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1946, 455],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1946, 455],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1946, 455],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [6383, 5045],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 14]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 14]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 14]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 14]
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
			farEastCodePage: !1,
			win: [2019, 442],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1989, 451],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1989, 451],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2060, 451],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2032, 451],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1985, 441],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [2019, 442],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [2018, 443],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1978, 441],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1460, 705],
			panose: [4, 2]
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
			farEastCodePage: !1,
			win: [2257, 597],
			panose: [3, 15]
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
			farEastCodePage: !1,
			win: [1884, 514],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1884, 514],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1884, 514],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1884, 514],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 3]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 3]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 3]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 3]
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
			farEastCodePage: !1,
			win: [1880, 469],
			panose: [2, 8]
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
			farEastCodePage: !1,
			win: [1813, 466],
			panose: [2, 14]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1950, 550],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [3678, 1876],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [3678, 2e3],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [3412, 1634],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [3412, 1708],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [3678, 1876],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [3678, 2e3],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [3412, 1634],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [3412, 1708],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2103, 614],
			panose: [4, 4]
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
			farEastCodePage: !1,
			win: [1505, 510],
			panose: [2, 14]
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
			farEastCodePage: !1,
			win: [1505, 510],
			panose: [2, 14]
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
			farEastCodePage: !0,
			win: [1659, 475],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [1659, 475],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [1659, 475],
			panose: [2, 1]
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
			farEastCodePage: !1,
			win: [1948, 400],
			panose: [4, 2]
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
			farEastCodePage: !0,
			win: [879, 145],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [879, 145],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1129, 559],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1129, 559],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1129, 559],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1129, 559],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1742, 672],
			panose: [3, 3]
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
			farEastCodePage: !1,
			win: [1920, 465],
			panose: [2, 9]
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
			farEastCodePage: !1,
			win: [1920, 465],
			panose: [2, 10]
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
			farEastCodePage: !1,
			win: [1774, 428],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1789, 426],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 1]
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
			farEastCodePage: !1,
			win: [1702, 460],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1877, 445],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1877, 445],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1877, 445],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1877, 445],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1877, 445],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1877, 445],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1877, 445],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1877, 445],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1877, 445],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1877, 445],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [4880, 2660],
			panose: [4, 4],
			typoMetrics: [
				2800,
				-1296,
				2867
			]
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
			farEastCodePage: !1,
			win: [1765, 539],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1765, 539],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1765, 539],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1765, 539],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1892, 1664],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1892, 1664],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1903, 472],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1903, 472],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1903, 472],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1903, 472],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1913, 553],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2045, 407],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2036, 516],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1936, 446],
			panose: [2, 3]
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
			farEastCodePage: !1,
			win: [1777, 398],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1792, 486],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1820, 487],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [879, 145],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [879, 145],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [879, 145],
			panose: [2, 3]
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
			farEastCodePage: !0,
			win: [879, 145],
			panose: [2, 3]
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
			farEastCodePage: !1,
			win: [920, 120],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1936, 472],
			panose: [4, 4]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 15]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1903, 510],
			panose: [4, 2]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 1]
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
			farEastCodePage: !1,
			win: [2013, 908],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [2013, 908],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1833, 486],
			panose: [4, 3]
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
			farEastCodePage: !1,
			win: [2048, 762],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2048, 762],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1900, 432],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1900, 432],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1900, 432],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1900, 420],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1900, 420],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1900, 666],
			panose: [3, 1]
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
			farEastCodePage: !1,
			win: [1616, 432],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1900, 420],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1925, 420],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1900, 420],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1900, 420],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1964, 666],
			panose: [3, 1]
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
			farEastCodePage: !1,
			win: [1900, 432],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1900, 432],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1900, 420],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1900, 420],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1900, 420],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1900, 420],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1900, 420],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1900, 420],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2246, 901],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2229, 495],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2229, 495],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2229, 495],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2542, 898],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [2542, 898],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [2048, 0],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1755, 970],
			panose: [3, 2]
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
			farEastCodePage: !0,
			win: [2171, 901],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2171, 901],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2171, 901],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2171, 901],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2171, 430],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2171, 430],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2171, 430],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2171, 430],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1212, 836],
			panose: [1, 1]
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
			farEastCodePage: !0,
			win: [2203, 521],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2203, 521],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1899, 780],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1899, 780],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1899, 705],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1899, 705],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2080, 536],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2167, 536],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2167, 536],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2167, 521],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2080, 521],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2080, 521],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1760, 290],
			panose: [3, 0]
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
			farEastCodePage: !0,
			win: [820, 204],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [820, 204],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [820, 204],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [820, 204],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1848, 647],
			panose: [3, 9]
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
			farEastCodePage: !1,
			win: [815, 209],
			panose: [2, 7]
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
			farEastCodePage: !1,
			win: [1729, 449],
			panose: [3, 0]
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
			farEastCodePage: !1,
			win: [1618, 620],
			panose: [3, 1]
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
			farEastCodePage: !1,
			win: [1641, 411],
			panose: [1, 1]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [2059, 430],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2074, 440],
			panose: [5, 0]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [898, 313],
			panose: [5, 5]
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
			farEastCodePage: !1,
			win: [2122, 1689],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2210, 1689],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2013, 463],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2013, 463],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2013, 463],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2013, 463],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 1]
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
			farEastCodePage: !1,
			win: [1660, 480],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1908, 442],
			panose: [4, 5]
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
			farEastCodePage: !1,
			win: [2150, 613],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [2150, 613],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [2150, 613],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [2150, 613],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1679, 668],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1679, 668],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1679, 668],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1679, 668],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1966, 457],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [2007, 457],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [820, 204],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [820, 204],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1937, 468],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1937, 468],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1937, 468],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1937, 468],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1927, 481],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1927, 481],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1937, 468],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [2555, 1014],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [2230, 1014],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2210, 514],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2210, 514],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [220, 36],
			panose: [2, 1]
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
			farEastCodePage: !1,
			win: [1860, 567],
			panose: [4, 4]
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
			farEastCodePage: !0,
			win: [798, 233],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [752, 259],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [761, 289],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [781, 236],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [912, 225],
			panose: [2, 1]
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
			farEastCodePage: !1,
			win: [2059, 450],
			panose: [5, 5]
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
			farEastCodePage: !1,
			win: [2049, 423],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2049, 423],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [850, 460],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [850, 460],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [850, 460],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [850, 460],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1825, 443],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1825, 443],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1825, 443],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1825, 443],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1923, 455],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2048, 1352],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2048, 1352],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1753, 477],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1753, 477],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1753, 477],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1753, 477],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1694, 494],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1694, 494],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1788, 430],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2059, 430],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2059, 430],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2059, 430],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2059, 430],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1638, 410],
			panose: [5, 3]
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
			farEastCodePage: !1,
			win: [1975, 546],
			panose: [2, 10]
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
			farEastCodePage: !1,
			win: [1841, 432],
			panose: [5, 0]
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
			farEastCodePage: !1,
			win: [1727, 432],
			panose: [5, 2]
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
			farEastCodePage: !1,
			win: [1900, 432],
			panose: [5, 4]
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
			farEastCodePage: !1,
			win: [2048, 0],
			panose: [1, 0]
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
			farEastCodePage: !0,
			win: [2026, 610],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2017, 619],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2028, 608],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2024, 612],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2210, 514],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2210, 514],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2210, 514],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2210, 514],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2210, 514],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [2038, 598],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [2038, 598],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [2005, 631],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [0, 0],
			panose: [0, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [1e3, 234],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1058, 274],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [850, 185],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [850, 185],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [837, 183],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1900, 1e3],
			panose: [1, 0],
			typoMetrics: [
				1900,
				-1e3,
				0
			]
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
			farEastCodePage: !1,
			win: [1900, 1e3],
			panose: [1, 0],
			typoMetrics: [
				1900,
				-1e3,
				0
			]
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
			farEastCodePage: !1,
			win: [1980, 732],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1980, 732],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1980, 732],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1980, 732],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1980, 732],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [934, 278],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [974, 227],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [985, 230],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1e3, 234],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1015, 242],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1033, 256],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1058, 274],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1090, 297],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1125, 324],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1167, 355],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [951, 211],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1032, 208],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1980, 432],
			panose: [2, 11]
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
			farEastCodePage: null,
			win: null,
			panose: null
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
			farEastCodePage: !1,
			win: [1980, 432],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1980, 432],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1904, 596],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1904, 596],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1807, 347],
			panose: [5, 0]
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
			farEastCodePage: !1,
			win: [1807, 347],
			panose: [5, 0]
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
			farEastCodePage: !1,
			win: [1807, 347],
			panose: [5, 0]
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
			farEastCodePage: !1,
			win: [1807, 347],
			panose: [5, 0]
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
			farEastCodePage: !1,
			win: [1807, 347],
			panose: [5, 0]
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
			farEastCodePage: !1,
			win: [0, 0],
			panose: [0, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [900, 300],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1807, 347],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [730, 335],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [730, 335],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [730, 335],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [730, 335],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [730, 335],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [730, 335],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1e3, 325],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 325],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 325],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1e3, 325],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 325],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1e3, 325],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 325],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1e3, 325],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 325],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 325],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 366],
			panose: [2, 11]
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
			farEastCodePage: null,
			win: null,
			panose: null
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
			farEastCodePage: null,
			win: null,
			panose: null
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
			farEastCodePage: null,
			win: null,
			panose: null
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
			farEastCodePage: null,
			win: null,
			panose: null
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
			farEastCodePage: !1,
			win: [1980, 732],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1980, 732],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1924, 481],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [860, 140],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [860, 140],
			panose: [0, 0]
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
			farEastCodePage: !0,
			win: [860, 140],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [860, 140],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [979, 273],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [979, 250],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1946, 461],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1946, 461],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1966, 475],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1966, 475],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [931, 213],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [931, 213],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [967, 213],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [967, 213],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [951, 213],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [967, 213],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [957, 213],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [952, 213],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [975, 217],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [975, 217],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [975, 217],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [975, 217],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [961, 221],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [972, 227],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [1e3, 234],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1058, 274],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1e3, 234],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1058, 274],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1125, 324],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1125, 324],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1029, 249],
			panose: [2, 15]
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
			farEastCodePage: !0,
			win: [1029, 249],
			panose: [2, 15]
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
			farEastCodePage: !0,
			win: [985, 182],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [1001, 203],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [985, 182],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [1001, 203],
			panose: [2, 2]
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
			farEastCodePage: !0,
			win: [934, 278],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [974, 227],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [985, 230],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1e3, 234],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1015, 242],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1033, 256],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1058, 274],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1090, 297],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1125, 324],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1167, 355],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [951, 211],
			panose: [2, 11]
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
			farEastCodePage: !0,
			win: [1032, 208],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1050, 450],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1050, 450],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1050, 450],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1050, 450],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1050, 450],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1050, 450],
			panose: [0, 0],
			typoMetrics: [
				800,
				-200,
				0
			]
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
			farEastCodePage: !1,
			win: [1050, 450],
			panose: [0, 0],
			typoMetrics: [
				800,
				-200,
				0
			]
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
			farEastCodePage: !1,
			win: [1050, 450],
			panose: [0, 0],
			typoMetrics: [
				800,
				-200,
				0
			]
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
			farEastCodePage: !1,
			win: [1050, 450],
			panose: [0, 0],
			typoMetrics: [
				800,
				-200,
				0
			]
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
			farEastCodePage: !1,
			win: [1050, 450],
			panose: [0, 0],
			typoMetrics: [
				800,
				-200,
				0
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1980, 432],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1980, 432],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [868, 218],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [908, 237],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1901, 483],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1901, 483],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1901, 483],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1901, 483],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2504, 862],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1130, 532],
			panose: [0, 0],
			typoMetrics: [
				1130,
				-532,
				0
			]
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
			farEastCodePage: !1,
			win: [1130, 532],
			panose: [0, 0],
			typoMetrics: [
				1130,
				-532,
				0
			]
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
			farEastCodePage: !1,
			win: [1130, 532],
			panose: [0, 0],
			typoMetrics: [
				1130,
				-532,
				0
			]
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
			farEastCodePage: !1,
			win: [1130, 532],
			panose: [0, 0],
			typoMetrics: [
				1130,
				-532,
				0
			]
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
			farEastCodePage: !1,
			win: [1130, 532],
			panose: [0, 0],
			typoMetrics: [
				1130,
				-532,
				0
			]
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
			farEastCodePage: !1,
			win: [1130, 532],
			panose: [0, 0],
			typoMetrics: [
				1130,
				-532,
				0
			]
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
			farEastCodePage: !1,
			win: [1130, 532],
			panose: [0, 0],
			typoMetrics: [
				1130,
				-532,
				0
			]
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
			farEastCodePage: !1,
			win: [846, 283],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [846, 283],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1904, 596],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1904, 596],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [809, 540],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [809, 540],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [809, 540],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [809, 540],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [809, 540],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [809, 540],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [809, 540],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [809, 540],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [809, 540],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1878, 990],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1878, 990],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 860],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1239, 1260],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1239, 1260],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1239, 1260],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1239, 1260],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1239, 1260],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1239, 1260],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1239, 1260],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1239, 1260],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1239, 1260],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [923, 262],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [919, 268],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [931, 261],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [921, 268],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [961, 262],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [2325, 963],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2403, 989],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2325, 974],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2445, 951],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1694, 612],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2468, 845],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2604, 877],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2611, 872],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2652, 834],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1667, 293],
			panose: [5, 2]
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
			farEastCodePage: !1,
			win: [991, 509],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [991, 564],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [854, 438],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [916, 616],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1135, 913],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1888, 1076],
			panose: [1, 0]
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
			farEastCodePage: !1,
			win: [2095, 979],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1188, 860],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1188, 860],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1188, 860],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1188, 860],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1188, 860],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1348, 733],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2845, 963],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1545, 503],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1958, 979],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1373, 675],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1508, 540],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1362, 686],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1950, 1020],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1528, 520],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1989, 763],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1798, 554],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [991, 509],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [991, 564],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [854, 438],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [916, 616],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1135, 913],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [824, 250],
			panose: [2, 9]
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
			farEastCodePage: !1,
			win: [889, 250],
			panose: [2, 9]
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
			farEastCodePage: !1,
			win: [904, 250],
			panose: [2, 9]
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
			farEastCodePage: !1,
			win: [881, 250],
			panose: [2, 9]
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
			farEastCodePage: !1,
			win: [904, 250],
			panose: [2, 9]
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
			farEastCodePage: !1,
			win: [948, 278],
			panose: [2, 9]
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
			farEastCodePage: !1,
			win: [927, 266],
			panose: [2, 9]
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
			farEastCodePage: !1,
			win: [1858, 446],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1896, 803],
			panose: [3, 2]
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
			farEastCodePage: null,
			win: null,
			panose: null
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
			farEastCodePage: null,
			win: null,
			panose: null
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
			farEastCodePage: !1,
			win: [1854, 434],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1854, 434],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1854, 434],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1854, 434],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2254, 634],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1873, 431],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1888, 431],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1916, 434],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1910, 431],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1938, 432],
			panose: [2, 15]
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
			farEastCodePage: !0,
			win: [2189, 555],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [878, 255],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [882, 252],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [878, 256],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [901, 255],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [2100, 510],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1888, 1076],
			panose: [1, 0]
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
			farEastCodePage: !1,
			win: [1895, 897],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1893, 1017],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1462, 675],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1462, 675],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [2024, 705],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1968, 705],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [2056, 745],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [2104, 739],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [2085, 757],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [2094, 797],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [2095, 979],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [934, 257],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [947, 292],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [936, 266],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [923, 272],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [947, 292],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [936, 266],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [923, 272],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [936, 262],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [810, 191],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [850, 399],
			panose: [0, 0]
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
			farEastCodePage: !0,
			win: [1820, 692],
			panose: [3, 6]
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
			farEastCodePage: !1,
			win: [887, 256],
			panose: [3, 5]
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
			farEastCodePage: !1,
			win: [887, 256],
			panose: [3, 5]
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
			farEastCodePage: !1,
			win: [887, 256],
			panose: [3, 5]
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
			farEastCodePage: !1,
			win: [887, 256],
			panose: [3, 5]
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
			farEastCodePage: !1,
			win: [887, 256],
			panose: [3, 5]
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
			farEastCodePage: !1,
			win: [887, 256],
			panose: [3, 5]
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
			farEastCodePage: !1,
			win: [2007, 483],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1972, 483],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1989, 483],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1972, 483],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1972, 483],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1972, 483],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [886, 234],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [897, 250],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [915, 234],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [914, 250],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [2257, 597],
			panose: [3, 15]
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
			farEastCodePage: !1,
			win: [2257, 597],
			panose: [3, 15]
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
			farEastCodePage: !1,
			win: [760, 249],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [763, 248],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [767, 248],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1280, 600],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1280, 600],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1705, 615],
			panose: [2, 7]
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
			farEastCodePage: !1,
			win: [1705, 615],
			panose: [2, 7]
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
			farEastCodePage: !1,
			win: [1705, 615],
			panose: [2, 7]
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
			farEastCodePage: !1,
			win: [1705, 615],
			panose: [2, 7]
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
			farEastCodePage: !1,
			win: [1188, 860],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1188, 860],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1188, 860],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1188, 860],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1188, 860],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1348, 733],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1885, 1398],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1895, 1395],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1462, 675],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1462, 675],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [942, 290],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [941, 299],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [969, 294],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1921, 463],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [937, 250],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2845, 963],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2176, 1513],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2237, 466],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2237, 466],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2237, 466],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1545, 503],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2263, 2e3],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2126, 539],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2014, 448],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2127, 532],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1045, 282],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2055, 553],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1935, 491],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1902, 535],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1941, 496],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1945, 494],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1878, 449],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1878, 449],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1878, 449],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1878, 449],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1832, 488],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1839, 482],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1862, 471],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1880, 472],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1931, 512],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1931, 512],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1886, 481],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1890, 481],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2036, 516],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1780, 1760],
			panose: [0, 0],
			typoMetrics: [
				1780,
				-1760,
				0
			]
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
			farEastCodePage: !1,
			win: [1780, 1760],
			panose: [0, 0],
			typoMetrics: [
				1780,
				-1760,
				0
			]
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
			farEastCodePage: !1,
			win: [1860, 1295],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1860, 1295],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1915, 768],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1915, 768],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [891, 281],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [891, 281],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1770, 900],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1939, 1080],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1922, 989],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [795, 205],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1864, 1063],
			panose: [2, 3]
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
			farEastCodePage: !1,
			win: [1632, 558],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1864, 636],
			panose: [2, 3]
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
			farEastCodePage: !1,
			win: [2029, 1194],
			panose: [2, 3]
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
			farEastCodePage: !1,
			win: [1991, 1166],
			panose: [2, 3]
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
			farEastCodePage: !1,
			win: [2066, 432],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [858, 276],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [800, 266],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2103, 537],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [2074, 537],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1915, 537],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [2112, 559],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [2081, 555],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [2122, 629],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [2099, 674],
			panose: [2, 4]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [0, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [0, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [0, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [0, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [0, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [2, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [1100, 400],
			panose: [0, 0],
			typoMetrics: [
				1050,
				-350,
				100
			]
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
			farEastCodePage: !1,
			win: [2494, 1415],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [2494, 1415],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1765, 1320],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1790, 1277],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1965, 1379],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1985, 1293],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2294, 64143],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2294, 64143],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1120, 863],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [3047, 2308],
			panose: [1, 0]
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
			farEastCodePage: !1,
			win: [2561, 640],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1958, 979],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2167, 1036],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2197, 1036],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2040, 1088],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [983, 356],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1664, 785],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1664, 800],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1664, 768],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1664, 911],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [893, 222],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [911, 222],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [904, 222],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1888, 430],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1607, 1354],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1610, 1191],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1825, 536],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1825, 536],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1825, 536],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1825, 536],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1373, 675],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1508, 540],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1362, 686],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1886, 64213],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1886, 64213],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1886, 1323],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1870, 1292],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1950, 1020],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1366, 557],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1389, 557],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1366, 557],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1366, 557],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 319],
			panose: [2, 11],
			typoMetrics: [
				1069,
				-293,
				0
			]
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
			farEastCodePage: !1,
			win: [960, 460],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [976, 274],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1140, 320],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1117, 351],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1596, 690],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1324, 326],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [847, 270],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1014, 252],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 352],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 301],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1120, 916],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1077, 425],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 301],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1409, 447],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [944, 373],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 450],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [757, 243],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [724, 423],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [790, 340],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1107, 534],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 200],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1069, 321],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1030, 237],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [928, 415],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1142, 350],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [891, 463],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1642, 388],
			panose: [2, 11],
			typoMetrics: [
				1457,
				-293,
				0
			]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1036, 396],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11],
			typoMetrics: [
				1069,
				-293,
				0
			]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [859, 177],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [737, 554],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [925, 455],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1e3, 1030],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 368],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [0, 0],
			typoMetrics: [
				1069,
				-293,
				0
			]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11],
			typoMetrics: [
				1069,
				-293,
				0
			]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2189, 1e3],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [955, 307],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 424],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1190, 293],
			panose: [0, 0],
			typoMetrics: [
				1069,
				-293,
				0
			]
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
			farEastCodePage: !1,
			win: [1026, 519],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [743, 381],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1096, 161],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1042, 100],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1069, 293],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [980, 675],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1069, 726],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1068, 292],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1068, 292],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1761, 703],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1820, 731],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1910, 791],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1899, 806],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1925, 1235],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1925, 1235],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1789, 1140],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [940, 260],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [940, 260],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [915, 315],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [885, 235],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [885, 235],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1019, 276],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1019, 276],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1019, 276],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1019, 276],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1019, 276],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1019, 276],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1019, 276],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1019, 276],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1018, 276],
			panose: [2, 10]
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
			farEastCodePage: !1,
			win: [1018, 276],
			panose: [2, 10]
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
			farEastCodePage: !1,
			win: [1018, 276],
			panose: [2, 10]
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
			farEastCodePage: !1,
			win: [1018, 276],
			panose: [2, 10]
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
			farEastCodePage: !1,
			win: [1018, 276],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1018, 276],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1536, 434],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1536, 459],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2099, 600],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [2099, 600],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [2099, 600],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [2099, 600],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [1528, 520],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1151, 404],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1989, 763],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [840, 250],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [840, 250],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [841, 250],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [841, 250],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [853, 250],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [843, 250],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [867, 250],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [863, 250],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [882, 250],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [866, 250],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [775, 387],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [775, 387],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [808, 415],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [808, 415],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [764, 392],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [764, 392],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [1e3, 250],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1556, 492],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1591, 474],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1699, 512],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1738, 540],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [894, 324],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [937, 324],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [941, 324],
			panose: [2, 0]
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
			farEastCodePage: !0,
			win: [860, 140],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [860, 140],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [860, 140],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [860, 140],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [860, 140],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [860, 140],
			panose: [2, 1]
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
			farEastCodePage: !0,
			win: [860, 140],
			panose: [2, 1]
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
			farEastCodePage: !1,
			win: [2627, 1641],
			panose: [2, 2],
			typoMetrics: [
				762,
				-238,
				250
			]
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
			farEastCodePage: !1,
			win: [1055, 455],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1055, 455],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1042, 455],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1055, 455],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2182, 451],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2182, 451],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1055, 455],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1055, 455],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1055, 455],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1055, 455],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2182, 451],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2182, 451],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1055, 455],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1055, 455],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1450, 552],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1450, 552],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1450, 552],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1450, 552],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [960, 454],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2604, 510],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2604, 510],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1588, 363],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1588, 363],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2604, 510],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2604, 510],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2095, 404],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2095, 404],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1055, 455],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1055, 455],
			panose: [0, 0]
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
			farEastCodePage: !0,
			win: [860, 140],
			panose: [2, 1]
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
			farEastCodePage: !1,
			win: [834, 250],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [834, 250],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [834, 250],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [834, 250],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [834, 250],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [834, 250],
			panose: [2, 0]
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
			farEastCodePage: !1,
			win: [977, 236],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [977, 236],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [977, 236],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [977, 236],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [977, 236],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [977, 236],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [977, 236],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [977, 236],
			panose: [2, 6]
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
			farEastCodePage: !1,
			win: [2049, 423],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2049, 423],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2012, 692],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2012, 696],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1780, 1760],
			panose: [0, 0],
			typoMetrics: [
				1550,
				-717,
				-210
			]
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
			farEastCodePage: !1,
			win: [1780, 1760],
			panose: [0, 0],
			typoMetrics: [
				1550,
				-717,
				-210
			]
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
			farEastCodePage: !1,
			win: [1858, 1302],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1889, 1519],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2022, 1367],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2074, 1723],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2405, 601],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2405, 601],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [2405, 601],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1825, 443],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1825, 443],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1825, 443],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1825, 443],
			panose: [2, 2]
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
			farEastCodePage: !1,
			win: [1150, 662],
			panose: [2, 15]
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
			farEastCodePage: !1,
			win: [1923, 455],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1923, 455],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1923, 455],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1923, 455],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2059, 430],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2059, 430],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2059, 430],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [2059, 430],
			panose: [2, 11]
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
			farEastCodePage: !1,
			win: [1890, 1191],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1827, 1131],
			panose: [0, 0]
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
			farEastCodePage: !1,
			win: [1638, 410],
			panose: [5, 3]
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
			farEastCodePage: !1,
			win: [1841, 432],
			panose: [5, 0]
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
			farEastCodePage: !1,
			win: [1727, 432],
			panose: [5, 2]
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
			farEastCodePage: !1,
			win: [1900, 432],
			panose: [5, 4]
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
			farEastCodePage: !1,
			win: [750, 1264],
			panose: [3, 3]
		}
	]
}, M = [
	{
		source: "published-open-font",
		family: "BIZ UDGothic",
		aliases: [
			"BIZ UDGothic",
			"BIZUDGothic-Regular",
			"BIZ UDゴシック"
		],
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
		aliases: [
			"BIZ UDGothic",
			"BIZUDGothic-Bold",
			"BIZ UDゴシック"
		],
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
		aliases: [
			"BIZ UDMincho",
			"BIZUDMincho-Regular",
			"BIZ UD明朝"
		],
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
		aliases: [
			"BIZ UDMincho",
			"BIZUDMincho-Bold",
			"BIZ UD明朝"
		],
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
function N(e) {
	return Object.freeze(e.aliases), Object.freeze(e.hhea), e.win && Object.freeze(e.win), e.typoMetrics && Object.freeze(e.typoMetrics), e.panose && Object.freeze(e.panose), Object.freeze(e);
}
var P;
function F() {
	return P ??= Object.freeze([...j.profiles, ...M].map(N));
}
var I, L = Object.freeze([]);
function ee(e) {
	return e.normalize("NFKC").trim().replace(/\s+/gu, " ").toLocaleLowerCase("en-US");
}
function te(e) {
	return `${e.source ?? "*"}|${e.weight ?? "*"}|${e.style ?? "*"}`;
}
function ne() {
	if (I !== void 0) return I;
	let e = /* @__PURE__ */ new Map();
	for (let t of F()) {
		let n = new Set(t.aliases.map(ee)), r = /* @__PURE__ */ new Set();
		for (let e of [void 0, t.source]) for (let n of [void 0, t.weight]) for (let i of [void 0, t.style]) r.add(te({
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
	return I = e, I;
}
function re(e, t = {}) {
	let n = ee(e);
	return n ? ne().get(n)?.get(te(t)) ?? L : L;
}
//#endregion
//#region packages/core/src/shape/custGeom.ts
function ie(e, t, n, r, i) {
	let a = Infinity, o = Infinity, s = -Infinity, c = -Infinity, l = (e, t) => {
		!Number.isFinite(e) || !Number.isFinite(t) || (a = Math.min(a, e), o = Math.min(o, t), s = Math.max(s, e), c = Math.max(c, t));
	};
	for (let a of e) {
		let e = 0, o = 0;
		for (let s of a) switch (s.cmd) {
			case "moveTo":
			case "lineTo":
				e = s.x, o = s.y, l(t + e * r, n + o * i);
				break;
			case "cubicBezTo":
				l(t + s.x1 * r, n + s.y1 * i), l(t + s.x2 * r, n + s.y2 * i), e = s.x, o = s.y, l(t + e * r, n + o * i);
				break;
			case "quadBezTo":
				l(t + s.x1 * r, n + s.y1 * i), e = s.x, o = s.y, l(t + e * r, n + o * i);
				break;
			case "arcTo": {
				let a = Math.abs(s.wr * r), c = Math.abs(s.hr * i);
				if (a <= 0 || c <= 0) break;
				let u = s.stAng * Math.PI / 180, d = s.swAng * Math.PI / 180, f = t + e * r, p = n + o * i, m = f - a * Math.cos(u), h = p - c * Math.sin(u);
				l(m - a, h - c), l(m + a, h + c);
				let g = u + d;
				e = (m + a * Math.cos(g) - t) / r, o = (h + c * Math.sin(g) - n) / i;
				break;
			}
			case "close": break;
		}
	}
	return Number.isFinite(a) ? {
		x: a,
		y: o,
		w: s - a,
		h: c - o
	} : null;
}
function ae(e, t, n, r, i, a) {
	for (let o of t) {
		let t = 0, s = 0;
		for (let c of o) switch (c.cmd) {
			case "moveTo":
				e.moveTo(n + c.x * i, r + c.y * a), t = c.x, s = c.y;
				break;
			case "lineTo":
				e.lineTo(n + c.x * i, r + c.y * a), t = c.x, s = c.y;
				break;
			case "cubicBezTo":
				e.bezierCurveTo(n + c.x1 * i, r + c.y1 * a, n + c.x2 * i, r + c.y2 * a, n + c.x * i, r + c.y * a), t = c.x, s = c.y;
				break;
			case "quadBezTo":
				e.quadraticCurveTo(n + c.x1 * i, r + c.y1 * a, n + c.x * i, r + c.y * a), t = c.x, s = c.y;
				break;
			case "arcTo": {
				let o = c.wr * i, l = c.hr * a;
				if (o <= 0 || l <= 0) break;
				let u = c.stAng * Math.PI / 180, d = c.swAng * Math.PI / 180, f = n + t * i, p = r + s * a, m = f - o * Math.cos(u), h = p - l * Math.sin(u), g = u + d;
				e.ellipse(m, h, o, l, 0, u, g, d < 0), t = (m + o * Math.cos(g) - n) / i, s = (h + l * Math.sin(g) - r) / a;
				break;
			}
			case "close":
				e.closePath();
				break;
		}
	}
}
//#endregion
//#region packages/core/src/shape/custgeom-endpoints.ts
var R = 1e-9;
function oe(e) {
	return e.cmd === "lineTo" || e.cmd === "cubicBezTo" || e.cmd === "quadBezTo" || e.cmd === "arcTo";
}
function se(e, t, n, r) {
	let i = n === 0 ? 0 : n, a = r === 0 ? 0 : r;
	return {
		x: e,
		y: t,
		dx: i,
		dy: a,
		angle: Math.atan2(a, i)
	};
}
function ce(e, t, n) {
	switch (n.cmd) {
		case "lineTo": return {
			dx: n.x - e,
			dy: n.y - t
		};
		case "cubicBezTo": {
			let r = n.x1 - e, i = n.y1 - t;
			return Math.abs(r) < R && Math.abs(i) < R && (r = n.x2 - e, i = n.y2 - t), Math.abs(r) < R && Math.abs(i) < R && (r = n.x - e, i = n.y - t), {
				dx: r,
				dy: i
			};
		}
		case "quadBezTo": {
			let r = n.x1 - e, i = n.y1 - t;
			return Math.abs(r) < R && Math.abs(i) < R && (r = n.x - e, i = n.y - t), {
				dx: r,
				dy: i
			};
		}
		case "arcTo": {
			let e = n.stAng * Math.PI / 180, t = n.swAng < 0 ? -1 : 1;
			return {
				dx: -n.wr * Math.sin(e) * t,
				dy: n.hr * Math.cos(e) * t
			};
		}
		default: return {
			dx: 0,
			dy: 0
		};
	}
}
function le(e, t, n) {
	switch (n.cmd) {
		case "moveTo":
		case "lineTo":
		case "cubicBezTo":
		case "quadBezTo": return {
			x: n.x,
			y: n.y
		};
		case "arcTo": {
			if (n.wr <= 0 || n.hr <= 0) return {
				x: e,
				y: t
			};
			let r = n.stAng * Math.PI / 180, i = r + n.swAng * Math.PI / 180, a = e - n.wr * Math.cos(r), o = t - n.hr * Math.sin(r);
			return {
				x: a + n.wr * Math.cos(i),
				y: o + n.hr * Math.sin(i)
			};
		}
		default: return {
			x: e,
			y: t
		};
	}
}
function ue(e, t, n) {
	let { x: r, y: i } = le(e, t, n);
	switch (n.cmd) {
		case "lineTo": return {
			dx: n.x - e,
			dy: n.y - t,
			x: r,
			y: i
		};
		case "cubicBezTo": {
			let a = n.x - n.x2, o = n.y - n.y2;
			return Math.abs(a) < R && Math.abs(o) < R && (a = n.x - n.x1, o = n.y - n.y1), Math.abs(a) < R && Math.abs(o) < R && (a = n.x - e, o = n.y - t), {
				dx: a,
				dy: o,
				x: r,
				y: i
			};
		}
		case "quadBezTo": {
			let a = n.x - n.x1, o = n.y - n.y1;
			return Math.abs(a) < R && Math.abs(o) < R && (a = n.x - e, o = n.y - t), {
				dx: a,
				dy: o,
				x: r,
				y: i
			};
		}
		case "arcTo": {
			if (n.wr <= 0 || n.hr <= 0) return {
				dx: 0,
				dy: 0,
				x: r,
				y: i
			};
			let e = n.stAng * Math.PI / 180 + n.swAng * Math.PI / 180, t = n.swAng < 0 ? -1 : 1;
			return {
				dx: -n.wr * Math.sin(e) * t,
				dy: n.hr * Math.cos(e) * t,
				x: r,
				y: i
			};
		}
		default: return {
			dx: 0,
			dy: 0,
			x: r,
			y: i
		};
	}
}
function de(e) {
	let t = 0, n = 0, r = !1;
	for (let i of e) i.cmd === "moveTo" && (r = !0), {x: t, y: n} = le(t, n, i);
	return r ? {
		x: t,
		y: n
	} : null;
}
function fe(e) {
	if (e.some((e) => e.cmd === "close")) return !0;
	let t = e.find((e) => e.cmd === "moveTo");
	if (!t) return !1;
	let n = de(e);
	return !n || !e.some(oe) ? !1 : Math.abs(n.x - t.x) < R && Math.abs(n.y - t.y) < R;
}
function pe(e) {
	let t = {
		start: null,
		end: null
	};
	if (!e || e.length === 0) return t;
	let n = e[0];
	if (n && n.length > 0 && !fe(n)) {
		let e = n.find((e) => e.cmd === "moveTo"), r = n.find(oe);
		if (e && r) {
			let n = ce(e.x, e.y, r);
			(Math.abs(n.dx) > R || Math.abs(n.dy) > R) && (t.start = se(e.x, e.y, -n.dx, -n.dy));
		}
	}
	let r = e[e.length - 1];
	if (r && r.length > 0 && !fe(r)) {
		let e = 0, n = 0, i = -1;
		for (let e = 0; e < r.length; e++) oe(r[e]) && (i = e);
		if (i >= 0) {
			for (let t = 0; t < i; t++) ({x: e, y: n} = le(e, n, r[t]));
			let a = ue(e, n, r[i]);
			(Math.abs(a.dx) > R || Math.abs(a.dy) > R) && (t.end = se(a.x, a.y, a.dx, a.dy));
		}
	}
	return t;
}
var me = {
	accentbordercallout1: {
		adj: [
			["adj1", "val 18750"],
			["adj2", "val -8333"],
			["adj3", "val 112500"],
			["adj4", "val -38333"]
		],
		gd: [
			["y1", "*/ h adj1 100000"],
			["x1", "*/ w adj2 100000"],
			["y2", "*/ h adj3 100000"],
			["x2", "*/ w adj4 100000"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x1",
						"t"
					],
					["c"],
					[
						"l",
						"x1",
						"b"
					]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [[
					"m",
					"x1",
					"y1"
				], [
					"l",
					"x2",
					"y2"
				]]
			}
		]
	},
	accentbordercallout2: {
		adj: [
			["adj1", "val 18750"],
			["adj2", "val -8333"],
			["adj3", "val 18750"],
			["adj4", "val -16667"],
			["adj5", "val 112500"],
			["adj6", "val -46667"]
		],
		gd: [
			["y1", "*/ h adj1 100000"],
			["x1", "*/ w adj2 100000"],
			["y2", "*/ h adj3 100000"],
			["x2", "*/ w adj4 100000"],
			["y3", "*/ h adj5 100000"],
			["x3", "*/ w adj6 100000"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x1",
						"t"
					],
					["c"],
					[
						"l",
						"x1",
						"b"
					]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x1",
						"y1"
					],
					[
						"l",
						"x2",
						"y2"
					],
					[
						"l",
						"x3",
						"y3"
					]
				]
			}
		]
	},
	accentbordercallout3: {
		adj: [
			["adj1", "val 18750"],
			["adj2", "val -8333"],
			["adj3", "val 18750"],
			["adj4", "val -16667"],
			["adj5", "val 100000"],
			["adj6", "val -16667"],
			["adj7", "val 112963"],
			["adj8", "val -8333"]
		],
		gd: [
			["y1", "*/ h adj1 100000"],
			["x1", "*/ w adj2 100000"],
			["y2", "*/ h adj3 100000"],
			["x2", "*/ w adj4 100000"],
			["y3", "*/ h adj5 100000"],
			["x3", "*/ w adj6 100000"],
			["y4", "*/ h adj7 100000"],
			["x4", "*/ w adj8 100000"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x1",
						"t"
					],
					["c"],
					[
						"l",
						"x1",
						"b"
					]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x1",
						"y1"
					],
					[
						"l",
						"x2",
						"y2"
					],
					[
						"l",
						"x3",
						"y3"
					],
					[
						"l",
						"x4",
						"y4"
					]
				]
			}
		]
	},
	accentcallout1: {
		adj: [
			["adj1", "val 18750"],
			["adj2", "val -8333"],
			["adj3", "val 112500"],
			["adj4", "val -38333"]
		],
		gd: [
			["y1", "*/ h adj1 100000"],
			["x1", "*/ w adj2 100000"],
			["y2", "*/ h adj3 100000"],
			["x2", "*/ w adj4 100000"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x1",
						"t"
					],
					["c"],
					[
						"l",
						"x1",
						"b"
					]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [[
					"m",
					"x1",
					"y1"
				], [
					"l",
					"x2",
					"y2"
				]]
			}
		]
	},
	accentcallout2: {
		adj: [
			["adj1", "val 18750"],
			["adj2", "val -8333"],
			["adj3", "val 18750"],
			["adj4", "val -16667"],
			["adj5", "val 112500"],
			["adj6", "val -46667"]
		],
		gd: [
			["y1", "*/ h adj1 100000"],
			["x1", "*/ w adj2 100000"],
			["y2", "*/ h adj3 100000"],
			["x2", "*/ w adj4 100000"],
			["y3", "*/ h adj5 100000"],
			["x3", "*/ w adj6 100000"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x1",
						"t"
					],
					["c"],
					[
						"l",
						"x1",
						"b"
					]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x1",
						"y1"
					],
					[
						"l",
						"x2",
						"y2"
					],
					[
						"l",
						"x3",
						"y3"
					]
				]
			}
		]
	},
	accentcallout3: {
		adj: [
			["adj1", "val 18750"],
			["adj2", "val -8333"],
			["adj3", "val 18750"],
			["adj4", "val -16667"],
			["adj5", "val 100000"],
			["adj6", "val -16667"],
			["adj7", "val 112963"],
			["adj8", "val -8333"]
		],
		gd: [
			["y1", "*/ h adj1 100000"],
			["x1", "*/ w adj2 100000"],
			["y2", "*/ h adj3 100000"],
			["x2", "*/ w adj4 100000"],
			["y3", "*/ h adj5 100000"],
			["x3", "*/ w adj6 100000"],
			["y4", "*/ h adj7 100000"],
			["x4", "*/ w adj8 100000"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x1",
						"t"
					],
					["c"],
					[
						"l",
						"x1",
						"b"
					]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x1",
						"y1"
					],
					[
						"l",
						"x2",
						"y2"
					],
					[
						"l",
						"x3",
						"y3"
					],
					[
						"l",
						"x4",
						"y4"
					]
				]
			}
		]
	},
	actionbuttonbackprevious: {
		adj: [],
		gd: [
			["dx2", "*/ ss 3 8"],
			["g9", "+- vc 0 dx2"],
			["g10", "+- vc dx2 0"],
			["g11", "+- hc 0 dx2"],
			["g12", "+- hc dx2 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"g11",
						"vc"
					],
					[
						"l",
						"g12",
						"g9"
					],
					[
						"l",
						"g12",
						"g10"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darken",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g11",
						"vc"
					],
					[
						"l",
						"g12",
						"g9"
					],
					[
						"l",
						"g12",
						"g10"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g11",
						"vc"
					],
					[
						"l",
						"g12",
						"g9"
					],
					[
						"l",
						"g12",
						"g10"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			}
		]
	},
	actionbuttonbeginning: {
		adj: [],
		gd: [
			["dx2", "*/ ss 3 8"],
			["g9", "+- vc 0 dx2"],
			["g10", "+- vc dx2 0"],
			["g11", "+- hc 0 dx2"],
			["g12", "+- hc dx2 0"],
			["g13", "*/ ss 3 4"],
			["g14", "*/ g13 1 8"],
			["g15", "*/ g13 1 4"],
			["g16", "+- g11 g14 0"],
			["g17", "+- g11 g15 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"g17",
						"vc"
					],
					[
						"l",
						"g12",
						"g9"
					],
					[
						"l",
						"g12",
						"g10"
					],
					["c"],
					[
						"m",
						"g16",
						"g9"
					],
					[
						"l",
						"g11",
						"g9"
					],
					[
						"l",
						"g11",
						"g10"
					],
					[
						"l",
						"g16",
						"g10"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darken",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g17",
						"vc"
					],
					[
						"l",
						"g12",
						"g9"
					],
					[
						"l",
						"g12",
						"g10"
					],
					["c"],
					[
						"m",
						"g16",
						"g9"
					],
					[
						"l",
						"g11",
						"g9"
					],
					[
						"l",
						"g11",
						"g10"
					],
					[
						"l",
						"g16",
						"g10"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g17",
						"vc"
					],
					[
						"l",
						"g12",
						"g9"
					],
					[
						"l",
						"g12",
						"g10"
					],
					["c"],
					[
						"m",
						"g16",
						"g9"
					],
					[
						"l",
						"g16",
						"g10"
					],
					[
						"l",
						"g11",
						"g10"
					],
					[
						"l",
						"g11",
						"g9"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			}
		]
	},
	actionbuttonblank: {
		adj: [],
		gd: [],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}]
	},
	actionbuttondocument: {
		adj: [],
		gd: [
			["dx2", "*/ ss 3 8"],
			["g9", "+- vc 0 dx2"],
			["g10", "+- vc dx2 0"],
			["dx1", "*/ ss 9 32"],
			["g11", "+- hc 0 dx1"],
			["g12", "+- hc dx1 0"],
			["g13", "*/ ss 3 16"],
			["g14", "+- g12 0 g13"],
			["g15", "+- g9 g13 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"g11",
						"g9"
					],
					[
						"l",
						"g14",
						"g9"
					],
					[
						"l",
						"g12",
						"g15"
					],
					[
						"l",
						"g12",
						"g10"
					],
					[
						"l",
						"g11",
						"g10"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g11",
						"g9"
					],
					[
						"l",
						"g14",
						"g9"
					],
					[
						"l",
						"g14",
						"g15"
					],
					[
						"l",
						"g12",
						"g15"
					],
					[
						"l",
						"g12",
						"g10"
					],
					[
						"l",
						"g11",
						"g10"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darken",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g14",
						"g9"
					],
					[
						"l",
						"g14",
						"g15"
					],
					[
						"l",
						"g12",
						"g15"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g11",
						"g9"
					],
					[
						"l",
						"g14",
						"g9"
					],
					[
						"l",
						"g12",
						"g15"
					],
					[
						"l",
						"g12",
						"g10"
					],
					[
						"l",
						"g11",
						"g10"
					],
					["c"],
					[
						"m",
						"g12",
						"g15"
					],
					[
						"l",
						"g14",
						"g15"
					],
					[
						"l",
						"g14",
						"g9"
					]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			}
		]
	},
	actionbuttonend: {
		adj: [],
		gd: [
			["dx2", "*/ ss 3 8"],
			["g9", "+- vc 0 dx2"],
			["g10", "+- vc dx2 0"],
			["g11", "+- hc 0 dx2"],
			["g12", "+- hc dx2 0"],
			["g13", "*/ ss 3 4"],
			["g14", "*/ g13 3 4"],
			["g15", "*/ g13 7 8"],
			["g16", "+- g11 g14 0"],
			["g17", "+- g11 g15 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"g16",
						"vc"
					],
					[
						"l",
						"g11",
						"g9"
					],
					[
						"l",
						"g11",
						"g10"
					],
					["c"],
					[
						"m",
						"g17",
						"g9"
					],
					[
						"l",
						"g12",
						"g9"
					],
					[
						"l",
						"g12",
						"g10"
					],
					[
						"l",
						"g17",
						"g10"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darken",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g16",
						"vc"
					],
					[
						"l",
						"g11",
						"g9"
					],
					[
						"l",
						"g11",
						"g10"
					],
					["c"],
					[
						"m",
						"g17",
						"g9"
					],
					[
						"l",
						"g12",
						"g9"
					],
					[
						"l",
						"g12",
						"g10"
					],
					[
						"l",
						"g17",
						"g10"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g16",
						"vc"
					],
					[
						"l",
						"g11",
						"g10"
					],
					[
						"l",
						"g11",
						"g9"
					],
					["c"],
					[
						"m",
						"g17",
						"g9"
					],
					[
						"l",
						"g12",
						"g9"
					],
					[
						"l",
						"g12",
						"g10"
					],
					[
						"l",
						"g17",
						"g10"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			}
		]
	},
	actionbuttonforwardnext: {
		adj: [],
		gd: [
			["dx2", "*/ ss 3 8"],
			["g9", "+- vc 0 dx2"],
			["g10", "+- vc dx2 0"],
			["g11", "+- hc 0 dx2"],
			["g12", "+- hc dx2 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"g12",
						"vc"
					],
					[
						"l",
						"g11",
						"g9"
					],
					[
						"l",
						"g11",
						"g10"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darken",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g12",
						"vc"
					],
					[
						"l",
						"g11",
						"g9"
					],
					[
						"l",
						"g11",
						"g10"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g12",
						"vc"
					],
					[
						"l",
						"g11",
						"g10"
					],
					[
						"l",
						"g11",
						"g9"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			}
		]
	},
	actionbuttonhelp: {
		adj: [],
		gd: [
			["dx2", "*/ ss 3 8"],
			["g9", "+- vc 0 dx2"],
			["g11", "+- hc 0 dx2"],
			["g13", "*/ ss 3 4"],
			["g14", "*/ g13 1 7"],
			["g15", "*/ g13 3 14"],
			["g16", "*/ g13 2 7"],
			["g19", "*/ g13 3 7"],
			["g20", "*/ g13 4 7"],
			["g21", "*/ g13 17 28"],
			["g23", "*/ g13 21 28"],
			["g24", "*/ g13 11 14"],
			["g27", "+- g9 g16 0"],
			["g29", "+- g9 g21 0"],
			["g30", "+- g9 g23 0"],
			["g31", "+- g9 g24 0"],
			["g33", "+- g11 g15 0"],
			["g36", "+- g11 g19 0"],
			["g37", "+- g11 g20 0"],
			["g41", "*/ g13 1 14"],
			["g42", "*/ g13 3 28"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"g33",
						"g27"
					],
					[
						"a",
						"g16",
						"g16",
						"cd2",
						"cd2"
					],
					[
						"a",
						"g14",
						"g15",
						"0",
						"cd4"
					],
					[
						"a",
						"g41",
						"g42",
						"3cd4",
						"-5400000"
					],
					[
						"l",
						"g37",
						"g30"
					],
					[
						"l",
						"g36",
						"g30"
					],
					[
						"l",
						"g36",
						"g29"
					],
					[
						"a",
						"g14",
						"g15",
						"cd2",
						"cd4"
					],
					[
						"a",
						"g41",
						"g42",
						"cd4",
						"-5400000"
					],
					[
						"a",
						"g14",
						"g14",
						"0",
						"-10800000"
					],
					["c"],
					[
						"m",
						"hc",
						"g31"
					],
					[
						"a",
						"g42",
						"g42",
						"3cd4",
						"21600000"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darken",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g33",
						"g27"
					],
					[
						"a",
						"g16",
						"g16",
						"cd2",
						"cd2"
					],
					[
						"a",
						"g14",
						"g15",
						"0",
						"cd4"
					],
					[
						"a",
						"g41",
						"g42",
						"3cd4",
						"-5400000"
					],
					[
						"l",
						"g37",
						"g30"
					],
					[
						"l",
						"g36",
						"g30"
					],
					[
						"l",
						"g36",
						"g29"
					],
					[
						"a",
						"g14",
						"g15",
						"cd2",
						"cd4"
					],
					[
						"a",
						"g41",
						"g42",
						"cd4",
						"-5400000"
					],
					[
						"a",
						"g14",
						"g14",
						"0",
						"-10800000"
					],
					["c"],
					[
						"m",
						"hc",
						"g31"
					],
					[
						"a",
						"g42",
						"g42",
						"3cd4",
						"21600000"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g33",
						"g27"
					],
					[
						"a",
						"g16",
						"g16",
						"cd2",
						"cd2"
					],
					[
						"a",
						"g14",
						"g15",
						"0",
						"cd4"
					],
					[
						"a",
						"g41",
						"g42",
						"3cd4",
						"-5400000"
					],
					[
						"l",
						"g37",
						"g30"
					],
					[
						"l",
						"g36",
						"g30"
					],
					[
						"l",
						"g36",
						"g29"
					],
					[
						"a",
						"g14",
						"g15",
						"cd2",
						"cd4"
					],
					[
						"a",
						"g41",
						"g42",
						"cd4",
						"-5400000"
					],
					[
						"a",
						"g14",
						"g14",
						"0",
						"-10800000"
					],
					["c"],
					[
						"m",
						"hc",
						"g31"
					],
					[
						"a",
						"g42",
						"g42",
						"3cd4",
						"21600000"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			}
		]
	},
	actionbuttonhome: {
		adj: [],
		gd: [
			["dx2", "*/ ss 3 8"],
			["g9", "+- vc 0 dx2"],
			["g10", "+- vc dx2 0"],
			["g11", "+- hc 0 dx2"],
			["g12", "+- hc dx2 0"],
			["g13", "*/ ss 3 4"],
			["g14", "*/ g13 1 16"],
			["g15", "*/ g13 1 8"],
			["g16", "*/ g13 3 16"],
			["g17", "*/ g13 5 16"],
			["g18", "*/ g13 7 16"],
			["g19", "*/ g13 9 16"],
			["g20", "*/ g13 11 16"],
			["g21", "*/ g13 3 4"],
			["g22", "*/ g13 13 16"],
			["g23", "*/ g13 7 8"],
			["g24", "+- g9 g14 0"],
			["g25", "+- g9 g16 0"],
			["g26", "+- g9 g17 0"],
			["g27", "+- g9 g21 0"],
			["g28", "+- g11 g15 0"],
			["g29", "+- g11 g18 0"],
			["g30", "+- g11 g19 0"],
			["g31", "+- g11 g20 0"],
			["g32", "+- g11 g22 0"],
			["g33", "+- g11 g23 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"hc",
						"g9"
					],
					[
						"l",
						"g11",
						"vc"
					],
					[
						"l",
						"g28",
						"vc"
					],
					[
						"l",
						"g28",
						"g10"
					],
					[
						"l",
						"g33",
						"g10"
					],
					[
						"l",
						"g33",
						"vc"
					],
					[
						"l",
						"g12",
						"vc"
					],
					[
						"l",
						"g32",
						"g26"
					],
					[
						"l",
						"g32",
						"g24"
					],
					[
						"l",
						"g31",
						"g24"
					],
					[
						"l",
						"g31",
						"g25"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g32",
						"g26"
					],
					[
						"l",
						"g32",
						"g24"
					],
					[
						"l",
						"g31",
						"g24"
					],
					[
						"l",
						"g31",
						"g25"
					],
					["c"],
					[
						"m",
						"g28",
						"vc"
					],
					[
						"l",
						"g28",
						"g10"
					],
					[
						"l",
						"g29",
						"g10"
					],
					[
						"l",
						"g29",
						"g27"
					],
					[
						"l",
						"g30",
						"g27"
					],
					[
						"l",
						"g30",
						"g10"
					],
					[
						"l",
						"g33",
						"g10"
					],
					[
						"l",
						"g33",
						"vc"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darken",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"hc",
						"g9"
					],
					[
						"l",
						"g11",
						"vc"
					],
					[
						"l",
						"g12",
						"vc"
					],
					["c"],
					[
						"m",
						"g29",
						"g27"
					],
					[
						"l",
						"g30",
						"g27"
					],
					[
						"l",
						"g30",
						"g10"
					],
					[
						"l",
						"g29",
						"g10"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"hc",
						"g9"
					],
					[
						"l",
						"g31",
						"g25"
					],
					[
						"l",
						"g31",
						"g24"
					],
					[
						"l",
						"g32",
						"g24"
					],
					[
						"l",
						"g32",
						"g26"
					],
					[
						"l",
						"g12",
						"vc"
					],
					[
						"l",
						"g33",
						"vc"
					],
					[
						"l",
						"g33",
						"g10"
					],
					[
						"l",
						"g28",
						"g10"
					],
					[
						"l",
						"g28",
						"vc"
					],
					[
						"l",
						"g11",
						"vc"
					],
					["c"],
					[
						"m",
						"g31",
						"g25"
					],
					[
						"l",
						"g32",
						"g26"
					],
					[
						"m",
						"g33",
						"vc"
					],
					[
						"l",
						"g28",
						"vc"
					],
					[
						"m",
						"g29",
						"g10"
					],
					[
						"l",
						"g29",
						"g27"
					],
					[
						"l",
						"g30",
						"g27"
					],
					[
						"l",
						"g30",
						"g10"
					]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			}
		]
	},
	actionbuttoninformation: {
		adj: [],
		gd: [
			["dx2", "*/ ss 3 8"],
			["g9", "+- vc 0 dx2"],
			["g11", "+- hc 0 dx2"],
			["g13", "*/ ss 3 4"],
			["g14", "*/ g13 1 32"],
			["g17", "*/ g13 5 16"],
			["g18", "*/ g13 3 8"],
			["g19", "*/ g13 13 32"],
			["g20", "*/ g13 19 32"],
			["g22", "*/ g13 11 16"],
			["g23", "*/ g13 13 16"],
			["g24", "*/ g13 7 8"],
			["g25", "+- g9 g14 0"],
			["g28", "+- g9 g17 0"],
			["g29", "+- g9 g18 0"],
			["g30", "+- g9 g23 0"],
			["g31", "+- g9 g24 0"],
			["g32", "+- g11 g17 0"],
			["g34", "+- g11 g19 0"],
			["g35", "+- g11 g20 0"],
			["g37", "+- g11 g22 0"],
			["g38", "*/ g13 3 32"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"hc",
						"g9"
					],
					[
						"a",
						"dx2",
						"dx2",
						"3cd4",
						"21600000"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darken",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"hc",
						"g9"
					],
					[
						"a",
						"dx2",
						"dx2",
						"3cd4",
						"21600000"
					],
					["c"],
					[
						"m",
						"hc",
						"g25"
					],
					[
						"a",
						"g38",
						"g38",
						"3cd4",
						"21600000"
					],
					[
						"m",
						"g32",
						"g28"
					],
					[
						"l",
						"g32",
						"g29"
					],
					[
						"l",
						"g34",
						"g29"
					],
					[
						"l",
						"g34",
						"g30"
					],
					[
						"l",
						"g32",
						"g30"
					],
					[
						"l",
						"g32",
						"g31"
					],
					[
						"l",
						"g37",
						"g31"
					],
					[
						"l",
						"g37",
						"g30"
					],
					[
						"l",
						"g35",
						"g30"
					],
					[
						"l",
						"g35",
						"g28"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "lighten",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"hc",
						"g25"
					],
					[
						"a",
						"g38",
						"g38",
						"3cd4",
						"21600000"
					],
					[
						"m",
						"g32",
						"g28"
					],
					[
						"l",
						"g35",
						"g28"
					],
					[
						"l",
						"g35",
						"g30"
					],
					[
						"l",
						"g37",
						"g30"
					],
					[
						"l",
						"g37",
						"g31"
					],
					[
						"l",
						"g32",
						"g31"
					],
					[
						"l",
						"g32",
						"g30"
					],
					[
						"l",
						"g34",
						"g30"
					],
					[
						"l",
						"g34",
						"g29"
					],
					[
						"l",
						"g32",
						"g29"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"hc",
						"g9"
					],
					[
						"a",
						"dx2",
						"dx2",
						"3cd4",
						"21600000"
					],
					["c"],
					[
						"m",
						"hc",
						"g25"
					],
					[
						"a",
						"g38",
						"g38",
						"3cd4",
						"21600000"
					],
					[
						"m",
						"g32",
						"g28"
					],
					[
						"l",
						"g35",
						"g28"
					],
					[
						"l",
						"g35",
						"g30"
					],
					[
						"l",
						"g37",
						"g30"
					],
					[
						"l",
						"g37",
						"g31"
					],
					[
						"l",
						"g32",
						"g31"
					],
					[
						"l",
						"g32",
						"g30"
					],
					[
						"l",
						"g34",
						"g30"
					],
					[
						"l",
						"g34",
						"g29"
					],
					[
						"l",
						"g32",
						"g29"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			}
		]
	},
	actionbuttonmovie: {
		adj: [],
		gd: [
			["dx2", "*/ ss 3 8"],
			["g9", "+- vc 0 dx2"],
			["g10", "+- vc dx2 0"],
			["g11", "+- hc 0 dx2"],
			["g12", "+- hc dx2 0"],
			["g13", "*/ ss 3 4"],
			["g14", "*/ g13 1455 21600"],
			["g15", "*/ g13 1905 21600"],
			["g16", "*/ g13 2325 21600"],
			["g17", "*/ g13 16155 21600"],
			["g18", "*/ g13 17010 21600"],
			["g19", "*/ g13 19335 21600"],
			["g20", "*/ g13 19725 21600"],
			["g21", "*/ g13 20595 21600"],
			["g22", "*/ g13 5280 21600"],
			["g23", "*/ g13 5730 21600"],
			["g24", "*/ g13 6630 21600"],
			["g25", "*/ g13 7492 21600"],
			["g26", "*/ g13 9067 21600"],
			["g27", "*/ g13 9555 21600"],
			["g28", "*/ g13 13342 21600"],
			["g29", "*/ g13 14580 21600"],
			["g30", "*/ g13 15592 21600"],
			["g31", "+- g11 g14 0"],
			["g32", "+- g11 g15 0"],
			["g33", "+- g11 g16 0"],
			["g34", "+- g11 g17 0"],
			["g35", "+- g11 g18 0"],
			["g36", "+- g11 g19 0"],
			["g37", "+- g11 g20 0"],
			["g38", "+- g11 g21 0"],
			["g39", "+- g9 g22 0"],
			["g40", "+- g9 g23 0"],
			["g41", "+- g9 g24 0"],
			["g42", "+- g9 g25 0"],
			["g43", "+- g9 g26 0"],
			["g44", "+- g9 g27 0"],
			["g45", "+- g9 g28 0"],
			["g46", "+- g9 g29 0"],
			["g47", "+- g9 g30 0"],
			["g48", "+- g9 g31 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"g11",
						"g39"
					],
					[
						"l",
						"g11",
						"g44"
					],
					[
						"l",
						"g31",
						"g44"
					],
					[
						"l",
						"g32",
						"g43"
					],
					[
						"l",
						"g33",
						"g43"
					],
					[
						"l",
						"g33",
						"g47"
					],
					[
						"l",
						"g35",
						"g47"
					],
					[
						"l",
						"g35",
						"g45"
					],
					[
						"l",
						"g36",
						"g45"
					],
					[
						"l",
						"g38",
						"g46"
					],
					[
						"l",
						"g12",
						"g46"
					],
					[
						"l",
						"g12",
						"g41"
					],
					[
						"l",
						"g38",
						"g41"
					],
					[
						"l",
						"g37",
						"g42"
					],
					[
						"l",
						"g35",
						"g42"
					],
					[
						"l",
						"g35",
						"g41"
					],
					[
						"l",
						"g34",
						"g40"
					],
					[
						"l",
						"g32",
						"g40"
					],
					[
						"l",
						"g31",
						"g39"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darken",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g11",
						"g39"
					],
					[
						"l",
						"g11",
						"g44"
					],
					[
						"l",
						"g31",
						"g44"
					],
					[
						"l",
						"g32",
						"g43"
					],
					[
						"l",
						"g33",
						"g43"
					],
					[
						"l",
						"g33",
						"g47"
					],
					[
						"l",
						"g35",
						"g47"
					],
					[
						"l",
						"g35",
						"g45"
					],
					[
						"l",
						"g36",
						"g45"
					],
					[
						"l",
						"g38",
						"g46"
					],
					[
						"l",
						"g12",
						"g46"
					],
					[
						"l",
						"g12",
						"g41"
					],
					[
						"l",
						"g38",
						"g41"
					],
					[
						"l",
						"g37",
						"g42"
					],
					[
						"l",
						"g35",
						"g42"
					],
					[
						"l",
						"g35",
						"g41"
					],
					[
						"l",
						"g34",
						"g40"
					],
					[
						"l",
						"g32",
						"g40"
					],
					[
						"l",
						"g31",
						"g39"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g11",
						"g39"
					],
					[
						"l",
						"g31",
						"g39"
					],
					[
						"l",
						"g32",
						"g40"
					],
					[
						"l",
						"g34",
						"g40"
					],
					[
						"l",
						"g35",
						"g41"
					],
					[
						"l",
						"g35",
						"g42"
					],
					[
						"l",
						"g37",
						"g42"
					],
					[
						"l",
						"g38",
						"g41"
					],
					[
						"l",
						"g12",
						"g41"
					],
					[
						"l",
						"g12",
						"g46"
					],
					[
						"l",
						"g38",
						"g46"
					],
					[
						"l",
						"g36",
						"g45"
					],
					[
						"l",
						"g35",
						"g45"
					],
					[
						"l",
						"g35",
						"g47"
					],
					[
						"l",
						"g33",
						"g47"
					],
					[
						"l",
						"g33",
						"g43"
					],
					[
						"l",
						"g32",
						"g43"
					],
					[
						"l",
						"g31",
						"g44"
					],
					[
						"l",
						"g11",
						"g44"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			}
		]
	},
	actionbuttonreturn: {
		adj: [],
		gd: [
			["dx2", "*/ ss 3 8"],
			["g9", "+- vc 0 dx2"],
			["g10", "+- vc dx2 0"],
			["g11", "+- hc 0 dx2"],
			["g12", "+- hc dx2 0"],
			["g13", "*/ ss 3 4"],
			["g14", "*/ g13 7 8"],
			["g15", "*/ g13 3 4"],
			["g16", "*/ g13 5 8"],
			["g17", "*/ g13 3 8"],
			["g18", "*/ g13 1 4"],
			["g19", "+- g9 g15 0"],
			["g20", "+- g9 g16 0"],
			["g21", "+- g9 g18 0"],
			["g22", "+- g11 g14 0"],
			["g23", "+- g11 g15 0"],
			["g24", "+- g11 g16 0"],
			["g25", "+- g11 g17 0"],
			["g26", "+- g11 g18 0"],
			["g27", "*/ g13 1 8"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"g12",
						"g21"
					],
					[
						"l",
						"g23",
						"g9"
					],
					[
						"l",
						"hc",
						"g21"
					],
					[
						"l",
						"g24",
						"g21"
					],
					[
						"l",
						"g24",
						"g20"
					],
					[
						"a",
						"g27",
						"g27",
						"0",
						"cd4"
					],
					[
						"l",
						"g25",
						"g19"
					],
					[
						"a",
						"g27",
						"g27",
						"cd4",
						"cd4"
					],
					[
						"l",
						"g26",
						"g21"
					],
					[
						"l",
						"g11",
						"g21"
					],
					[
						"l",
						"g11",
						"g20"
					],
					[
						"a",
						"g17",
						"g17",
						"cd2",
						"-5400000"
					],
					[
						"l",
						"hc",
						"g10"
					],
					[
						"a",
						"g17",
						"g17",
						"cd4",
						"-5400000"
					],
					[
						"l",
						"g22",
						"g21"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darken",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g12",
						"g21"
					],
					[
						"l",
						"g23",
						"g9"
					],
					[
						"l",
						"hc",
						"g21"
					],
					[
						"l",
						"g24",
						"g21"
					],
					[
						"l",
						"g24",
						"g20"
					],
					[
						"a",
						"g27",
						"g27",
						"0",
						"cd4"
					],
					[
						"l",
						"g25",
						"g19"
					],
					[
						"a",
						"g27",
						"g27",
						"cd4",
						"cd4"
					],
					[
						"l",
						"g26",
						"g21"
					],
					[
						"l",
						"g11",
						"g21"
					],
					[
						"l",
						"g11",
						"g20"
					],
					[
						"a",
						"g17",
						"g17",
						"cd2",
						"-5400000"
					],
					[
						"l",
						"hc",
						"g10"
					],
					[
						"a",
						"g17",
						"g17",
						"cd4",
						"-5400000"
					],
					[
						"l",
						"g22",
						"g21"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g12",
						"g21"
					],
					[
						"l",
						"g22",
						"g21"
					],
					[
						"l",
						"g22",
						"g20"
					],
					[
						"a",
						"g17",
						"g17",
						"0",
						"cd4"
					],
					[
						"l",
						"g25",
						"g10"
					],
					[
						"a",
						"g17",
						"g17",
						"cd4",
						"cd4"
					],
					[
						"l",
						"g11",
						"g21"
					],
					[
						"l",
						"g26",
						"g21"
					],
					[
						"l",
						"g26",
						"g20"
					],
					[
						"a",
						"g27",
						"g27",
						"cd2",
						"-5400000"
					],
					[
						"l",
						"hc",
						"g19"
					],
					[
						"a",
						"g27",
						"g27",
						"cd4",
						"-5400000"
					],
					[
						"l",
						"g24",
						"g21"
					],
					[
						"l",
						"hc",
						"g21"
					],
					[
						"l",
						"g23",
						"g9"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			}
		]
	},
	actionbuttonsound: {
		adj: [],
		gd: [
			["dx2", "*/ ss 3 8"],
			["g9", "+- vc 0 dx2"],
			["g10", "+- vc dx2 0"],
			["g11", "+- hc 0 dx2"],
			["g12", "+- hc dx2 0"],
			["g13", "*/ ss 3 4"],
			["g14", "*/ g13 1 8"],
			["g15", "*/ g13 5 16"],
			["g16", "*/ g13 5 8"],
			["g17", "*/ g13 11 16"],
			["g18", "*/ g13 3 4"],
			["g19", "*/ g13 7 8"],
			["g20", "+- g9 g14 0"],
			["g21", "+- g9 g15 0"],
			["g22", "+- g9 g17 0"],
			["g23", "+- g9 g19 0"],
			["g24", "+- g11 g15 0"],
			["g25", "+- g11 g16 0"],
			["g26", "+- g11 g18 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"g11",
						"g21"
					],
					[
						"l",
						"g11",
						"g22"
					],
					[
						"l",
						"g24",
						"g22"
					],
					[
						"l",
						"g25",
						"g10"
					],
					[
						"l",
						"g25",
						"g9"
					],
					[
						"l",
						"g24",
						"g21"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darken",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g11",
						"g21"
					],
					[
						"l",
						"g11",
						"g22"
					],
					[
						"l",
						"g24",
						"g22"
					],
					[
						"l",
						"g25",
						"g10"
					],
					[
						"l",
						"g25",
						"g9"
					],
					[
						"l",
						"g24",
						"g21"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"g11",
						"g21"
					],
					[
						"l",
						"g24",
						"g21"
					],
					[
						"l",
						"g25",
						"g9"
					],
					[
						"l",
						"g25",
						"g10"
					],
					[
						"l",
						"g24",
						"g22"
					],
					[
						"l",
						"g11",
						"g22"
					],
					["c"],
					[
						"m",
						"g26",
						"g21"
					],
					[
						"l",
						"g12",
						"g20"
					],
					[
						"m",
						"g26",
						"vc"
					],
					[
						"l",
						"g12",
						"vc"
					],
					[
						"m",
						"g26",
						"g22"
					],
					[
						"l",
						"g12",
						"g23"
					]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			}
		]
	},
	arc: {
		adj: [["adj1", "val 16200000"], ["adj2", "val 0"]],
		gd: [
			["stAng", "pin 0 adj1 21599999"],
			["enAng", "pin 0 adj2 21599999"],
			["sw11", "+- enAng 0 stAng"],
			["sw12", "+- sw11 21600000 0"],
			["swAng", "?: sw11 sw11 sw12"],
			["wt1", "sin wd2 stAng"],
			["ht1", "cos hd2 stAng"],
			["dx1", "cat2 wd2 ht1 wt1"],
			["dy1", "sat2 hd2 ht1 wt1"],
			["wt2", "sin wd2 enAng"],
			["ht2", "cos hd2 enAng"],
			["dx2", "cat2 wd2 ht2 wt2"],
			["dy2", "sat2 hd2 ht2 wt2"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"],
			["x2", "+- hc dx2 0"],
			["y2", "+- vc dy2 0"],
			["sw0", "+- 21600000 0 stAng"],
			["da1", "+- swAng 0 sw0"],
			["g1", "max x1 x2"],
			["ir", "?: da1 r g1"],
			["sw1", "+- cd4 0 stAng"],
			["sw2", "+- 27000000 0 stAng"],
			["sw3", "?: sw1 sw1 sw2"],
			["da2", "+- swAng 0 sw3"],
			["g5", "max y1 y2"],
			["ib", "?: da2 b g5"],
			["sw4", "+- cd2 0 stAng"],
			["sw5", "+- 32400000 0 stAng"],
			["sw6", "?: sw4 sw4 sw5"],
			["da3", "+- swAng 0 sw6"],
			["g9", "min x1 x2"],
			["il", "?: da3 l g9"],
			["sw7", "+- 3cd4 0 stAng"],
			["sw8", "+- 37800000 0 stAng"],
			["sw9", "?: sw7 sw7 sw8"],
			["da4", "+- swAng 0 sw9"],
			["g13", "min y1 y2"],
			["it", "?: da4 t g13"],
			["cang1", "+- stAng 0 cd4"],
			["cang2", "+- enAng cd4 0"],
			["cang3", "+/ cang1 cang2 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !1,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"a",
					"wd2",
					"hd2",
					"stAng",
					"swAng"
				],
				[
					"l",
					"hc",
					"vc"
				],
				["c"]
			]
		}, {
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x1",
				"y1"
			], [
				"a",
				"wd2",
				"hd2",
				"stAng",
				"swAng"
			]]
		}]
	},
	bentarrow: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 25000"],
			["adj3", "val 25000"],
			["adj4", "val 43750"]
		],
		gd: [
			["a2", "pin 0 adj2 50000"],
			["maxAdj1", "*/ a2 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["a3", "pin 0 adj3 50000"],
			["th", "*/ ss a1 100000"],
			["aw2", "*/ ss a2 100000"],
			["th2", "*/ th 1 2"],
			["dh2", "+- aw2 0 th2"],
			["ah", "*/ ss a3 100000"],
			["bw", "+- r 0 ah"],
			["bh", "+- b 0 dh2"],
			["bs", "min bw bh"],
			["maxAdj4", "*/ 100000 bs ss"],
			["a4", "pin 0 adj4 maxAdj4"],
			["bd", "*/ ss a4 100000"],
			["bd3", "+- bd 0 th"],
			["bd2", "max bd3 0"],
			["x3", "+- th bd2 0"],
			["x4", "+- r 0 ah"],
			["y3", "+- dh2 th 0"],
			["y4", "+- y3 dh2 0"],
			["y5", "+- dh2 bd 0"],
			["y6", "+- y3 bd2 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"b"
				],
				[
					"l",
					"l",
					"y5"
				],
				[
					"a",
					"bd",
					"bd",
					"cd2",
					"cd4"
				],
				[
					"l",
					"x4",
					"dh2"
				],
				[
					"l",
					"x4",
					"t"
				],
				[
					"l",
					"r",
					"aw2"
				],
				[
					"l",
					"x4",
					"y4"
				],
				[
					"l",
					"x4",
					"y3"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"a",
					"bd2",
					"bd2",
					"3cd4",
					"-5400000"
				],
				[
					"l",
					"th",
					"b"
				],
				["c"]
			]
		}]
	},
	bentconnector2: {
		adj: [],
		gd: [],
		paths: [{
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"r",
					"b"
				]
			]
		}]
	},
	bentconnector3: {
		adj: [["adj1", "val 50000"]],
		gd: [["x1", "*/ w adj1 100000"]],
		paths: [{
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"l",
					"x1",
					"b"
				],
				[
					"l",
					"r",
					"b"
				]
			]
		}]
	},
	bentconnector4: {
		adj: [["adj1", "val 50000"], ["adj2", "val 50000"]],
		gd: [
			["x1", "*/ w adj1 100000"],
			["x2", "+/ x1 r 2"],
			["y2", "*/ h adj2 100000"],
			["y1", "+/ t y2 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"l",
					"x1",
					"y2"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"l",
					"r",
					"b"
				]
			]
		}]
	},
	bentconnector5: {
		adj: [
			["adj1", "val 50000"],
			["adj2", "val 50000"],
			["adj3", "val 50000"]
		],
		gd: [
			["x1", "*/ w adj1 100000"],
			["x3", "*/ w adj3 100000"],
			["x2", "+/ x1 x3 2"],
			["y2", "*/ h adj2 100000"],
			["y1", "+/ t y2 2"],
			["y3", "+/ b y2 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"l",
					"x1",
					"y2"
				],
				[
					"l",
					"x3",
					"y2"
				],
				[
					"l",
					"x3",
					"b"
				],
				[
					"l",
					"r",
					"b"
				]
			]
		}]
	},
	bentuparrow: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 25000"],
			["adj3", "val 25000"]
		],
		gd: [
			["a1", "pin 0 adj1 50000"],
			["a2", "pin 0 adj2 50000"],
			["a3", "pin 0 adj3 50000"],
			["y1", "*/ ss a3 100000"],
			["dx1", "*/ ss a2 50000"],
			["x1", "+- r 0 dx1"],
			["dx3", "*/ ss a2 100000"],
			["x3", "+- r 0 dx3"],
			["dx2", "*/ ss a1 200000"],
			["x2", "+- x3 0 dx2"],
			["x4", "+- x3 dx2 0"],
			["dy2", "*/ ss a1 100000"],
			["y2", "+- b 0 dy2"],
			["x0", "*/ x4 1 2"],
			["y3", "+/ y2 b 2"],
			["y15", "+/ y1 b 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y2"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"x1",
					"y1"
				],
				[
					"l",
					"x3",
					"t"
				],
				[
					"l",
					"r",
					"y1"
				],
				[
					"l",
					"x4",
					"y1"
				],
				[
					"l",
					"x4",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}]
	},
	bevel: {
		adj: [["adj", "val 12500"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["x1", "*/ ss a 100000"],
			["x2", "+- r 0 x1"],
			["y2", "+- b 0 x1"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x1",
						"x1"
					],
					[
						"l",
						"x2",
						"x1"
					],
					[
						"l",
						"x2",
						"y2"
					],
					[
						"l",
						"x1",
						"y2"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "lightenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"x2",
						"x1"
					],
					[
						"l",
						"x1",
						"x1"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"b"
					],
					[
						"l",
						"x1",
						"y2"
					],
					[
						"l",
						"x2",
						"y2"
					],
					[
						"l",
						"r",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "lighten",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"x1",
						"x1"
					],
					[
						"l",
						"x1",
						"y2"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darken",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"x2",
						"y2"
					],
					[
						"l",
						"x2",
						"x1"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"x1",
						"x1"
					],
					[
						"l",
						"x2",
						"x1"
					],
					[
						"l",
						"x2",
						"y2"
					],
					[
						"l",
						"x1",
						"y2"
					],
					["c"],
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"x1",
						"x1"
					],
					[
						"m",
						"l",
						"b"
					],
					[
						"l",
						"x1",
						"y2"
					],
					[
						"m",
						"r",
						"t"
					],
					[
						"l",
						"x2",
						"x1"
					],
					[
						"m",
						"r",
						"b"
					],
					[
						"l",
						"x2",
						"y2"
					]
				]
			}
		]
	},
	blockarc: {
		adj: [
			["adj1", "val 10800000"],
			["adj2", "val 0"],
			["adj3", "val 25000"]
		],
		gd: [
			["stAng", "pin 0 adj1 21599999"],
			["istAng", "pin 0 adj2 21599999"],
			["a3", "pin 0 adj3 50000"],
			["sw11", "+- istAng 0 stAng"],
			["sw12", "+- sw11 21600000 0"],
			["swAng", "?: sw11 sw11 sw12"],
			["iswAng", "+- 0 0 swAng"],
			["wt1", "sin wd2 stAng"],
			["ht1", "cos hd2 stAng"],
			["wt3", "sin wd2 istAng"],
			["ht3", "cos hd2 istAng"],
			["dx1", "cat2 wd2 ht1 wt1"],
			["dy1", "sat2 hd2 ht1 wt1"],
			["dx3", "cat2 wd2 ht3 wt3"],
			["dy3", "sat2 hd2 ht3 wt3"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"],
			["x3", "+- hc dx3 0"],
			["y3", "+- vc dy3 0"],
			["dr", "*/ ss a3 100000"],
			["iwd2", "+- wd2 0 dr"],
			["ihd2", "+- hd2 0 dr"],
			["wt2", "sin iwd2 istAng"],
			["ht2", "cos ihd2 istAng"],
			["wt4", "sin iwd2 stAng"],
			["ht4", "cos ihd2 stAng"],
			["dx2", "cat2 iwd2 ht2 wt2"],
			["dy2", "sat2 ihd2 ht2 wt2"],
			["dx4", "cat2 iwd2 ht4 wt4"],
			["dy4", "sat2 ihd2 ht4 wt4"],
			["x2", "+- hc dx2 0"],
			["y2", "+- vc dy2 0"],
			["x4", "+- hc dx4 0"],
			["y4", "+- vc dy4 0"],
			["sw0", "+- 21600000 0 stAng"],
			["da1", "+- swAng 0 sw0"],
			["g1", "max x1 x2"],
			["g2", "max x3 x4"],
			["g3", "max g1 g2"],
			["ir", "?: da1 r g3"],
			["sw1", "+- cd4 0 stAng"],
			["sw2", "+- 27000000 0 stAng"],
			["sw3", "?: sw1 sw1 sw2"],
			["da2", "+- swAng 0 sw3"],
			["g5", "max y1 y2"],
			["g6", "max y3 y4"],
			["g7", "max g5 g6"],
			["ib", "?: da2 b g7"],
			["sw4", "+- cd2 0 stAng"],
			["sw5", "+- 32400000 0 stAng"],
			["sw6", "?: sw4 sw4 sw5"],
			["da3", "+- swAng 0 sw6"],
			["g9", "min x1 x2"],
			["g10", "min x3 x4"],
			["g11", "min g9 g10"],
			["il", "?: da3 l g11"],
			["sw7", "+- 3cd4 0 stAng"],
			["sw8", "+- 37800000 0 stAng"],
			["sw9", "?: sw7 sw7 sw8"],
			["da4", "+- swAng 0 sw9"],
			["g13", "min y1 y2"],
			["g14", "min y3 y4"],
			["g15", "min g13 g14"],
			["it", "?: da4 t g15"],
			["x5", "+/ x1 x4 2"],
			["y5", "+/ y1 y4 2"],
			["x6", "+/ x3 x2 2"],
			["y6", "+/ y3 y2 2"],
			["cang1", "+- stAng 0 cd4"],
			["cang2", "+- istAng cd4 0"],
			["cang3", "+/ cang1 cang2 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"a",
					"wd2",
					"hd2",
					"stAng",
					"swAng"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"a",
					"iwd2",
					"ihd2",
					"istAng",
					"iswAng"
				],
				["c"]
			]
		}]
	},
	bordercallout1: {
		adj: [
			["adj1", "val 18750"],
			["adj2", "val -8333"],
			["adj3", "val 112500"],
			["adj4", "val -38333"]
		],
		gd: [
			["y1", "*/ h adj1 100000"],
			["x1", "*/ w adj2 100000"],
			["y2", "*/ h adj3 100000"],
			["x2", "*/ w adj4 100000"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}, {
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !1,
			cmds: [[
				"m",
				"x1",
				"y1"
			], [
				"l",
				"x2",
				"y2"
			]]
		}]
	},
	bordercallout2: {
		adj: [
			["adj1", "val 18750"],
			["adj2", "val -8333"],
			["adj3", "val 18750"],
			["adj4", "val -16667"],
			["adj5", "val 112500"],
			["adj6", "val -46667"]
		],
		gd: [
			["y1", "*/ h adj1 100000"],
			["x1", "*/ w adj2 100000"],
			["y2", "*/ h adj3 100000"],
			["x2", "*/ w adj4 100000"],
			["y3", "*/ h adj5 100000"],
			["x3", "*/ w adj6 100000"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}, {
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x3",
					"y3"
				]
			]
		}]
	},
	bordercallout3: {
		adj: [
			["adj1", "val 18750"],
			["adj2", "val -8333"],
			["adj3", "val 18750"],
			["adj4", "val -16667"],
			["adj5", "val 100000"],
			["adj6", "val -16667"],
			["adj7", "val 112963"],
			["adj8", "val -8333"]
		],
		gd: [
			["y1", "*/ h adj1 100000"],
			["x1", "*/ w adj2 100000"],
			["y2", "*/ h adj3 100000"],
			["x2", "*/ w adj4 100000"],
			["y3", "*/ h adj5 100000"],
			["x3", "*/ w adj6 100000"],
			["y4", "*/ h adj7 100000"],
			["x4", "*/ w adj8 100000"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}, {
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"l",
					"x4",
					"y4"
				]
			]
		}]
	},
	bracepair: {
		adj: [["adj", "val 8333"]],
		gd: [
			["a", "pin 0 adj 25000"],
			["x1", "*/ ss a 100000"],
			["x2", "*/ ss a 50000"],
			["x3", "+- r 0 x2"],
			["x4", "+- r 0 x1"],
			["y2", "+- vc 0 x1"],
			["y3", "+- vc x1 0"],
			["y4", "+- b 0 x1"],
			["it", "*/ x1 29289 100000"],
			["il", "+- x1 it 0"],
			["ir", "+- r 0 il"],
			["ib", "+- b 0 it"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !1,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"x2",
					"b"
				],
				[
					"a",
					"x1",
					"x1",
					"cd4",
					"cd4"
				],
				[
					"l",
					"x1",
					"y3"
				],
				[
					"a",
					"x1",
					"x1",
					"0",
					"-5400000"
				],
				[
					"a",
					"x1",
					"x1",
					"cd4",
					"-5400000"
				],
				[
					"l",
					"x1",
					"x1"
				],
				[
					"a",
					"x1",
					"x1",
					"cd2",
					"cd4"
				],
				[
					"l",
					"x3",
					"t"
				],
				[
					"a",
					"x1",
					"x1",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"x4",
					"y2"
				],
				[
					"a",
					"x1",
					"x1",
					"cd2",
					"-5400000"
				],
				[
					"a",
					"x1",
					"x1",
					"3cd4",
					"-5400000"
				],
				[
					"l",
					"x4",
					"y4"
				],
				[
					"a",
					"x1",
					"x1",
					"0",
					"cd4"
				],
				["c"]
			]
		}, {
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x2",
					"b"
				],
				[
					"a",
					"x1",
					"x1",
					"cd4",
					"cd4"
				],
				[
					"l",
					"x1",
					"y3"
				],
				[
					"a",
					"x1",
					"x1",
					"0",
					"-5400000"
				],
				[
					"a",
					"x1",
					"x1",
					"cd4",
					"-5400000"
				],
				[
					"l",
					"x1",
					"x1"
				],
				[
					"a",
					"x1",
					"x1",
					"cd2",
					"cd4"
				],
				[
					"m",
					"x3",
					"t"
				],
				[
					"a",
					"x1",
					"x1",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"x4",
					"y2"
				],
				[
					"a",
					"x1",
					"x1",
					"cd2",
					"-5400000"
				],
				[
					"a",
					"x1",
					"x1",
					"3cd4",
					"-5400000"
				],
				[
					"l",
					"x4",
					"y4"
				],
				[
					"a",
					"x1",
					"x1",
					"0",
					"cd4"
				]
			]
		}]
	},
	bracketpair: {
		adj: [["adj", "val 16667"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["x1", "*/ ss a 100000"],
			["x2", "+- r 0 x1"],
			["y2", "+- b 0 x1"],
			["il", "*/ x1 29289 100000"],
			["ir", "+- r 0 il"],
			["ib", "+- b 0 il"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !1,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"l",
					"x1"
				],
				[
					"a",
					"x1",
					"x1",
					"cd2",
					"cd4"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"a",
					"x1",
					"x1",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"a",
					"x1",
					"x1",
					"0",
					"cd4"
				],
				[
					"l",
					"x1",
					"b"
				],
				[
					"a",
					"x1",
					"x1",
					"cd4",
					"cd4"
				],
				["c"]
			]
		}, {
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"b"
				],
				[
					"a",
					"x1",
					"x1",
					"cd4",
					"cd4"
				],
				[
					"l",
					"l",
					"x1"
				],
				[
					"a",
					"x1",
					"x1",
					"cd2",
					"cd4"
				],
				[
					"m",
					"x2",
					"t"
				],
				[
					"a",
					"x1",
					"x1",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"a",
					"x1",
					"x1",
					"0",
					"cd4"
				]
			]
		}]
	},
	callout1: {
		adj: [
			["adj1", "val 18750"],
			["adj2", "val -8333"],
			["adj3", "val 112500"],
			["adj4", "val -38333"]
		],
		gd: [
			["y1", "*/ h adj1 100000"],
			["x1", "*/ w adj2 100000"],
			["y2", "*/ h adj3 100000"],
			["x2", "*/ w adj4 100000"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !1,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}, {
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !1,
			cmds: [[
				"m",
				"x1",
				"y1"
			], [
				"l",
				"x2",
				"y2"
			]]
		}]
	},
	callout2: {
		adj: [
			["adj1", "val 18750"],
			["adj2", "val -8333"],
			["adj3", "val 18750"],
			["adj4", "val -16667"],
			["adj5", "val 112500"],
			["adj6", "val -46667"]
		],
		gd: [
			["y1", "*/ h adj1 100000"],
			["x1", "*/ w adj2 100000"],
			["y2", "*/ h adj3 100000"],
			["x2", "*/ w adj4 100000"],
			["y3", "*/ h adj5 100000"],
			["x3", "*/ w adj6 100000"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !1,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}, {
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x3",
					"y3"
				]
			]
		}]
	},
	callout3: {
		adj: [
			["adj1", "val 18750"],
			["adj2", "val -8333"],
			["adj3", "val 18750"],
			["adj4", "val -16667"],
			["adj5", "val 100000"],
			["adj6", "val -16667"],
			["adj7", "val 112963"],
			["adj8", "val -8333"]
		],
		gd: [
			["y1", "*/ h adj1 100000"],
			["x1", "*/ w adj2 100000"],
			["y2", "*/ h adj3 100000"],
			["x2", "*/ w adj4 100000"],
			["y3", "*/ h adj5 100000"],
			["x3", "*/ w adj6 100000"],
			["y4", "*/ h adj7 100000"],
			["x4", "*/ w adj8 100000"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !1,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}, {
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"l",
					"x4",
					"y4"
				]
			]
		}]
	},
	can: {
		adj: [["adj", "val 25000"]],
		gd: [
			["maxAdj", "*/ 50000 h ss"],
			["a", "pin 0 adj maxAdj"],
			["y1", "*/ ss a 200000"],
			["y2", "+- y1 y1 0"],
			["y3", "+- b 0 y1"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"y1"
					],
					[
						"a",
						"wd2",
						"y1",
						"cd2",
						"-10800000"
					],
					[
						"l",
						"r",
						"y3"
					],
					[
						"a",
						"wd2",
						"y1",
						"0",
						"cd2"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "lighten",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"y1"
					],
					[
						"a",
						"wd2",
						"y1",
						"cd2",
						"cd2"
					],
					[
						"a",
						"wd2",
						"y1",
						"0",
						"cd2"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"r",
						"y1"
					],
					[
						"a",
						"wd2",
						"y1",
						"0",
						"cd2"
					],
					[
						"a",
						"wd2",
						"y1",
						"cd2",
						"cd2"
					],
					[
						"l",
						"r",
						"y3"
					],
					[
						"a",
						"wd2",
						"y1",
						"0",
						"cd2"
					],
					[
						"l",
						"l",
						"y1"
					]
				]
			}
		]
	},
	chartplus: {
		adj: [],
		gd: [],
		paths: [{
			w: 10,
			h: 10,
			fill: "none",
			stroke: !0,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"5",
					"0"
				],
				[
					"l",
					"5",
					"10"
				],
				[
					"m",
					"0",
					"5"
				],
				[
					"l",
					"10",
					"5"
				]
			]
		}, {
			w: 10,
			h: 10,
			fill: null,
			stroke: !1,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"0"
				],
				[
					"l",
					"0",
					"10"
				],
				[
					"l",
					"10",
					"10"
				],
				[
					"l",
					"10",
					"0"
				],
				["c"]
			]
		}]
	},
	chartstar: {
		adj: [],
		gd: [],
		paths: [{
			w: 10,
			h: 10,
			fill: "none",
			stroke: !0,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"0",
					"0"
				],
				[
					"l",
					"10",
					"10"
				],
				[
					"m",
					"0",
					"10"
				],
				[
					"l",
					"10",
					"0"
				],
				[
					"m",
					"5",
					"0"
				],
				[
					"l",
					"5",
					"10"
				]
			]
		}, {
			w: 10,
			h: 10,
			fill: null,
			stroke: !1,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"0"
				],
				[
					"l",
					"0",
					"10"
				],
				[
					"l",
					"10",
					"10"
				],
				[
					"l",
					"10",
					"0"
				],
				["c"]
			]
		}]
	},
	chartx: {
		adj: [],
		gd: [],
		paths: [{
			w: 10,
			h: 10,
			fill: "none",
			stroke: !0,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"0",
					"0"
				],
				[
					"l",
					"10",
					"10"
				],
				[
					"m",
					"0",
					"10"
				],
				[
					"l",
					"10",
					"0"
				]
			]
		}, {
			w: 10,
			h: 10,
			fill: null,
			stroke: !1,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"0"
				],
				[
					"l",
					"0",
					"10"
				],
				[
					"l",
					"10",
					"10"
				],
				[
					"l",
					"10",
					"0"
				],
				["c"]
			]
		}]
	},
	chevron: {
		adj: [["adj", "val 50000"]],
		gd: [
			["maxAdj", "*/ 100000 w ss"],
			["a", "pin 0 adj maxAdj"],
			["x1", "*/ ss a 100000"],
			["x2", "+- r 0 x1"],
			["x3", "*/ x2 1 2"],
			["dx", "+- x2 0 x1"],
			["il", "?: dx x1 l"],
			["ir", "?: dx x2 r"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"x2",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				[
					"l",
					"x1",
					"vc"
				],
				["c"]
			]
		}]
	},
	chord: {
		adj: [["adj1", "val 2700000"], ["adj2", "val 16200000"]],
		gd: [
			["stAng", "pin 0 adj1 21599999"],
			["enAng", "pin 0 adj2 21599999"],
			["sw1", "+- enAng 0 stAng"],
			["sw2", "+- sw1 21600000 0"],
			["swAng", "?: sw1 sw1 sw2"],
			["wt1", "sin wd2 stAng"],
			["ht1", "cos hd2 stAng"],
			["dx1", "cat2 wd2 ht1 wt1"],
			["dy1", "sat2 hd2 ht1 wt1"],
			["wt2", "sin wd2 enAng"],
			["ht2", "cos hd2 enAng"],
			["dx2", "cat2 wd2 ht2 wt2"],
			["dy2", "sat2 hd2 ht2 wt2"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"],
			["x2", "+- hc dx2 0"],
			["y2", "+- vc dy2 0"],
			["x3", "+/ x1 x2 2"],
			["y3", "+/ y1 y2 2"],
			["midAng0", "*/ swAng 1 2"],
			["midAng", "+- stAng midAng0 cd2"],
			["idx", "cos wd2 2700000"],
			["idy", "sin hd2 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"a",
					"wd2",
					"hd2",
					"stAng",
					"swAng"
				],
				["c"]
			]
		}]
	},
	circulararrow: {
		adj: [
			["adj1", "val 12500"],
			["adj2", "val 1142319"],
			["adj3", "val 20457681"],
			["adj4", "val 10800000"],
			["adj5", "val 12500"]
		],
		gd: [
			["a5", "pin 0 adj5 25000"],
			["maxAdj1", "*/ a5 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["enAng", "pin 1 adj3 21599999"],
			["stAng", "pin 0 adj4 21599999"],
			["th", "*/ ss a1 100000"],
			["thh", "*/ ss a5 100000"],
			["th2", "*/ th 1 2"],
			["rw1", "+- wd2 th2 thh"],
			["rh1", "+- hd2 th2 thh"],
			["rw2", "+- rw1 0 th"],
			["rh2", "+- rh1 0 th"],
			["rw3", "+- rw2 th2 0"],
			["rh3", "+- rh2 th2 0"],
			["wtH", "sin rw3 enAng"],
			["htH", "cos rh3 enAng"],
			["dxH", "cat2 rw3 htH wtH"],
			["dyH", "sat2 rh3 htH wtH"],
			["xH", "+- hc dxH 0"],
			["yH", "+- vc dyH 0"],
			["rI", "min rw2 rh2"],
			["u1", "*/ dxH dxH 1"],
			["u2", "*/ dyH dyH 1"],
			["u3", "*/ rI rI 1"],
			["u4", "+- u1 0 u3"],
			["u5", "+- u2 0 u3"],
			["u6", "*/ u4 u5 u1"],
			["u7", "*/ u6 1 u2"],
			["u8", "+- 1 0 u7"],
			["u9", "sqrt u8"],
			["u10", "*/ u4 1 dxH"],
			["u11", "*/ u10 1 dyH"],
			["u12", "+/ 1 u9 u11"],
			["u13", "at2 1 u12"],
			["u14", "+- u13 21600000 0"],
			["u15", "?: u13 u13 u14"],
			["u16", "+- u15 0 enAng"],
			["u17", "+- u16 21600000 0"],
			["u18", "?: u16 u16 u17"],
			["u19", "+- u18 0 cd2"],
			["u20", "+- u18 0 21600000"],
			["u21", "?: u19 u20 u18"],
			["maxAng", "abs u21"],
			["aAng", "pin 0 adj2 maxAng"],
			["ptAng", "+- enAng aAng 0"],
			["wtA", "sin rw3 ptAng"],
			["htA", "cos rh3 ptAng"],
			["dxA", "cat2 rw3 htA wtA"],
			["dyA", "sat2 rh3 htA wtA"],
			["xA", "+- hc dxA 0"],
			["yA", "+- vc dyA 0"],
			["wtE", "sin rw1 stAng"],
			["htE", "cos rh1 stAng"],
			["dxE", "cat2 rw1 htE wtE"],
			["dyE", "sat2 rh1 htE wtE"],
			["xE", "+- hc dxE 0"],
			["yE", "+- vc dyE 0"],
			["dxG", "cos thh ptAng"],
			["dyG", "sin thh ptAng"],
			["xG", "+- xH dxG 0"],
			["yG", "+- yH dyG 0"],
			["dxB", "cos thh ptAng"],
			["dyB", "sin thh ptAng"],
			["xB", "+- xH 0 dxB 0"],
			["yB", "+- yH 0 dyB 0"],
			["sx1", "+- xB 0 hc"],
			["sy1", "+- yB 0 vc"],
			["sx2", "+- xG 0 hc"],
			["sy2", "+- yG 0 vc"],
			["rO", "min rw1 rh1"],
			["x1O", "*/ sx1 rO rw1"],
			["y1O", "*/ sy1 rO rh1"],
			["x2O", "*/ sx2 rO rw1"],
			["y2O", "*/ sy2 rO rh1"],
			["dxO", "+- x2O 0 x1O"],
			["dyO", "+- y2O 0 y1O"],
			["dO", "mod dxO dyO 0"],
			["q1", "*/ x1O y2O 1"],
			["q2", "*/ x2O y1O 1"],
			["DO", "+- q1 0 q2"],
			["q3", "*/ rO rO 1"],
			["q4", "*/ dO dO 1"],
			["q5", "*/ q3 q4 1"],
			["q6", "*/ DO DO 1"],
			["q7", "+- q5 0 q6"],
			["q8", "max q7 0"],
			["sdelO", "sqrt q8"],
			["ndyO", "*/ dyO -1 1"],
			["sdyO", "?: ndyO -1 1"],
			["q9", "*/ sdyO dxO 1"],
			["q10", "*/ q9 sdelO 1"],
			["q11", "*/ DO dyO 1"],
			["dxF1", "+/ q11 q10 q4"],
			["q12", "+- q11 0 q10"],
			["dxF2", "*/ q12 1 q4"],
			["adyO", "abs dyO"],
			["q13", "*/ adyO sdelO 1"],
			["q14", "*/ DO dxO -1"],
			["dyF1", "+/ q14 q13 q4"],
			["q15", "+- q14 0 q13"],
			["dyF2", "*/ q15 1 q4"],
			["q16", "+- x2O 0 dxF1"],
			["q17", "+- x2O 0 dxF2"],
			["q18", "+- y2O 0 dyF1"],
			["q19", "+- y2O 0 dyF2"],
			["q20", "mod q16 q18 0"],
			["q21", "mod q17 q19 0"],
			["q22", "+- q21 0 q20"],
			["dxF", "?: q22 dxF1 dxF2"],
			["dyF", "?: q22 dyF1 dyF2"],
			["sdxF", "*/ dxF rw1 rO"],
			["sdyF", "*/ dyF rh1 rO"],
			["xF", "+- hc sdxF 0"],
			["yF", "+- vc sdyF 0"],
			["x1I", "*/ sx1 rI rw2"],
			["y1I", "*/ sy1 rI rh2"],
			["x2I", "*/ sx2 rI rw2"],
			["y2I", "*/ sy2 rI rh2"],
			["dxI", "+- x2I 0 x1I"],
			["dyI", "+- y2I 0 y1I"],
			["dI", "mod dxI dyI 0"],
			["v1", "*/ x1I y2I 1"],
			["v2", "*/ x2I y1I 1"],
			["DI", "+- v1 0 v2"],
			["v3", "*/ rI rI 1"],
			["v4", "*/ dI dI 1"],
			["v5", "*/ v3 v4 1"],
			["v6", "*/ DI DI 1"],
			["v7", "+- v5 0 v6"],
			["v8", "max v7 0"],
			["sdelI", "sqrt v8"],
			["v9", "*/ sdyO dxI 1"],
			["v10", "*/ v9 sdelI 1"],
			["v11", "*/ DI dyI 1"],
			["dxC1", "+/ v11 v10 v4"],
			["v12", "+- v11 0 v10"],
			["dxC2", "*/ v12 1 v4"],
			["adyI", "abs dyI"],
			["v13", "*/ adyI sdelI 1"],
			["v14", "*/ DI dxI -1"],
			["dyC1", "+/ v14 v13 v4"],
			["v15", "+- v14 0 v13"],
			["dyC2", "*/ v15 1 v4"],
			["v16", "+- x1I 0 dxC1"],
			["v17", "+- x1I 0 dxC2"],
			["v18", "+- y1I 0 dyC1"],
			["v19", "+- y1I 0 dyC2"],
			["v20", "mod v16 v18 0"],
			["v21", "mod v17 v19 0"],
			["v22", "+- v21 0 v20"],
			["dxC", "?: v22 dxC1 dxC2"],
			["dyC", "?: v22 dyC1 dyC2"],
			["sdxC", "*/ dxC rw2 rI"],
			["sdyC", "*/ dyC rh2 rI"],
			["xC", "+- hc sdxC 0"],
			["yC", "+- vc sdyC 0"],
			["ist0", "at2 sdxC sdyC"],
			["ist1", "+- ist0 21600000 0"],
			["istAng", "?: ist0 ist0 ist1"],
			["isw1", "+- stAng 0 istAng"],
			["isw2", "+- isw1 0 21600000"],
			["iswAng", "?: isw1 isw2 isw1"],
			["p1", "+- xF 0 xC"],
			["p2", "+- yF 0 yC"],
			["p3", "mod p1 p2 0"],
			["p4", "*/ p3 1 2"],
			["p5", "+- p4 0 thh"],
			["xGp", "?: p5 xF xG"],
			["yGp", "?: p5 yF yG"],
			["xBp", "?: p5 xC xB"],
			["yBp", "?: p5 yC yB"],
			["en0", "at2 sdxF sdyF"],
			["en1", "+- en0 21600000 0"],
			["en2", "?: en0 en0 en1"],
			["sw0", "+- en2 0 stAng"],
			["sw1", "+- sw0 21600000 0"],
			["swAng", "?: sw0 sw0 sw1"],
			["wtI", "sin rw3 stAng"],
			["htI", "cos rh3 stAng"],
			["dxI", "cat2 rw3 htI wtI"],
			["dyI", "sat2 rh3 htI wtI"],
			["xI", "+- hc dxI 0"],
			["yI", "+- vc dyI 0"],
			["aI", "+- stAng 0 cd4"],
			["aA", "+- ptAng cd4 0"],
			["aB", "+- ptAng cd2 0"],
			["idx", "cos rw1 2700000"],
			["idy", "sin rh1 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"xE",
					"yE"
				],
				[
					"a",
					"rw1",
					"rh1",
					"stAng",
					"swAng"
				],
				[
					"l",
					"xGp",
					"yGp"
				],
				[
					"l",
					"xA",
					"yA"
				],
				[
					"l",
					"xBp",
					"yBp"
				],
				[
					"l",
					"xC",
					"yC"
				],
				[
					"a",
					"rw2",
					"rh2",
					"istAng",
					"iswAng"
				],
				["c"]
			]
		}]
	},
	cloud: {
		adj: [],
		gd: [
			["il", "*/ w 2977 21600"],
			["it", "*/ h 3262 21600"],
			["ir", "*/ w 17087 21600"],
			["ib", "*/ h 17337 21600"],
			["g27", "*/ w 67 21600"],
			["g28", "*/ h 21577 21600"],
			["g29", "*/ w 21582 21600"],
			["g30", "*/ h 1235 21600"]
		],
		paths: [{
			w: 43200,
			h: 43200,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"3900",
					"14370"
				],
				[
					"a",
					"6753",
					"9190",
					"-11429249",
					"7426832"
				],
				[
					"a",
					"5333",
					"7267",
					"-8646143",
					"5396714"
				],
				[
					"a",
					"4365",
					"5945",
					"-8748475",
					"5983381"
				],
				[
					"a",
					"4857",
					"6595",
					"-7859164",
					"7034504"
				],
				[
					"a",
					"5333",
					"7273",
					"-4722533",
					"6541615"
				],
				[
					"a",
					"6775",
					"9220",
					"-2776035",
					"7816140"
				],
				[
					"a",
					"5785",
					"7867",
					"37501",
					"6842000"
				],
				[
					"a",
					"6752",
					"9215",
					"1347096",
					"6910353"
				],
				[
					"a",
					"7720",
					"10543",
					"3974558",
					"4542661"
				],
				[
					"a",
					"4360",
					"5918",
					"-16496525",
					"8804134"
				],
				[
					"a",
					"4345",
					"5945",
					"-14809710",
					"9151131"
				],
				["c"]
			]
		}, {
			w: 43200,
			h: 43200,
			fill: "none",
			stroke: !0,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"4693",
					"26177"
				],
				[
					"a",
					"4345",
					"5945",
					"5204520",
					"1585770"
				],
				[
					"m",
					"6928",
					"34899"
				],
				[
					"a",
					"4360",
					"5918",
					"4416628",
					"686848"
				],
				[
					"m",
					"16478",
					"39090"
				],
				[
					"a",
					"6752",
					"9215",
					"8257449",
					"844866"
				],
				[
					"m",
					"28827",
					"34751"
				],
				[
					"a",
					"6752",
					"9215",
					"387196",
					"959901"
				],
				[
					"m",
					"34129",
					"22954"
				],
				[
					"a",
					"5785",
					"7867",
					"-4217541",
					"4255042"
				],
				[
					"m",
					"41798",
					"15354"
				],
				[
					"a",
					"5333",
					"7273",
					"1819082",
					"1665090"
				],
				[
					"m",
					"38324",
					"5426"
				],
				[
					"a",
					"4857",
					"6595",
					"-824660",
					"891534"
				],
				[
					"m",
					"29078",
					"3952"
				],
				[
					"a",
					"4857",
					"6595",
					"-8950887",
					"1091722"
				],
				[
					"m",
					"22141",
					"4720"
				],
				[
					"a",
					"4365",
					"5945",
					"-9809656",
					"1061181"
				],
				[
					"m",
					"14000",
					"5192"
				],
				[
					"a",
					"6753",
					"9190",
					"-4002417",
					"739161"
				],
				[
					"m",
					"4127",
					"15789"
				],
				[
					"a",
					"6753",
					"9190",
					"9459261",
					"711490"
				]
			]
		}]
	},
	cloudcallout: {
		adj: [["adj1", "val -20833"], ["adj2", "val 62500"]],
		gd: [
			["dxPos", "*/ w adj1 100000"],
			["dyPos", "*/ h adj2 100000"],
			["xPos", "+- hc dxPos 0"],
			["yPos", "+- vc dyPos 0"],
			["ht", "cat2 hd2 dxPos dyPos"],
			["wt", "sat2 wd2 dxPos dyPos"],
			["g2", "cat2 wd2 ht wt"],
			["g3", "sat2 hd2 ht wt"],
			["g4", "+- hc g2 0"],
			["g5", "+- vc g3 0"],
			["g6", "+- g4 0 xPos"],
			["g7", "+- g5 0 yPos"],
			["g8", "mod g6 g7 0"],
			["g9", "*/ ss 6600 21600"],
			["g10", "+- g8 0 g9"],
			["g11", "*/ g10 1 3"],
			["g12", "*/ ss 1800 21600"],
			["g13", "+- g11 g12 0"],
			["g14", "*/ g13 g6 g8"],
			["g15", "*/ g13 g7 g8"],
			["g16", "+- g14 xPos 0"],
			["g17", "+- g15 yPos 0"],
			["g18", "*/ ss 4800 21600"],
			["g19", "*/ g11 2 1"],
			["g20", "+- g18 g19 0"],
			["g21", "*/ g20 g6 g8"],
			["g22", "*/ g20 g7 g8"],
			["g23", "+- g21 xPos 0"],
			["g24", "+- g22 yPos 0"],
			["g25", "*/ ss 1200 21600"],
			["g26", "*/ ss 600 21600"],
			["x23", "+- xPos g26 0"],
			["x24", "+- g16 g25 0"],
			["x25", "+- g23 g12 0"],
			["il", "*/ w 2977 21600"],
			["it", "*/ h 3262 21600"],
			["ir", "*/ w 17087 21600"],
			["ib", "*/ h 17337 21600"],
			["g27", "*/ w 67 21600"],
			["g28", "*/ h 21577 21600"],
			["g29", "*/ w 21582 21600"],
			["g30", "*/ h 1235 21600"],
			["pang", "at2 dxPos dyPos"]
		],
		paths: [
			{
				w: 43200,
				h: 43200,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"3900",
						"14370"
					],
					[
						"a",
						"6753",
						"9190",
						"-11429249",
						"7426832"
					],
					[
						"a",
						"5333",
						"7267",
						"-8646143",
						"5396714"
					],
					[
						"a",
						"4365",
						"5945",
						"-8748475",
						"5983381"
					],
					[
						"a",
						"4857",
						"6595",
						"-7859164",
						"7034504"
					],
					[
						"a",
						"5333",
						"7273",
						"-4722533",
						"6541615"
					],
					[
						"a",
						"6775",
						"9220",
						"-2776035",
						"7816140"
					],
					[
						"a",
						"5785",
						"7867",
						"37501",
						"6842000"
					],
					[
						"a",
						"6752",
						"9215",
						"1347096",
						"6910353"
					],
					[
						"a",
						"7720",
						"10543",
						"3974558",
						"4542661"
					],
					[
						"a",
						"4360",
						"5918",
						"-16496525",
						"8804134"
					],
					[
						"a",
						"4345",
						"5945",
						"-14809710",
						"9151131"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"x23",
						"yPos"
					],
					[
						"a",
						"g26",
						"g26",
						"0",
						"21600000"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"x24",
						"g17"
					],
					[
						"a",
						"g25",
						"g25",
						"0",
						"21600000"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"x25",
						"g24"
					],
					[
						"a",
						"g12",
						"g12",
						"0",
						"21600000"
					],
					["c"]
				]
			},
			{
				w: 43200,
				h: 43200,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"4693",
						"26177"
					],
					[
						"a",
						"4345",
						"5945",
						"5204520",
						"1585770"
					],
					[
						"m",
						"6928",
						"34899"
					],
					[
						"a",
						"4360",
						"5918",
						"4416628",
						"686848"
					],
					[
						"m",
						"16478",
						"39090"
					],
					[
						"a",
						"6752",
						"9215",
						"8257449",
						"844866"
					],
					[
						"m",
						"28827",
						"34751"
					],
					[
						"a",
						"6752",
						"9215",
						"387196",
						"959901"
					],
					[
						"m",
						"34129",
						"22954"
					],
					[
						"a",
						"5785",
						"7867",
						"-4217541",
						"4255042"
					],
					[
						"m",
						"41798",
						"15354"
					],
					[
						"a",
						"5333",
						"7273",
						"1819082",
						"1665090"
					],
					[
						"m",
						"38324",
						"5426"
					],
					[
						"a",
						"4857",
						"6595",
						"-824660",
						"891534"
					],
					[
						"m",
						"29078",
						"3952"
					],
					[
						"a",
						"4857",
						"6595",
						"-8950887",
						"1091722"
					],
					[
						"m",
						"22141",
						"4720"
					],
					[
						"a",
						"4365",
						"5945",
						"-9809656",
						"1061181"
					],
					[
						"m",
						"14000",
						"5192"
					],
					[
						"a",
						"6753",
						"9190",
						"-4002417",
						"739161"
					],
					[
						"m",
						"4127",
						"15789"
					],
					[
						"a",
						"6753",
						"9190",
						"9459261",
						"711490"
					]
				]
			}
		]
	},
	corner: {
		adj: [["adj1", "val 50000"], ["adj2", "val 50000"]],
		gd: [
			["maxAdj1", "*/ 100000 h ss"],
			["maxAdj2", "*/ 100000 w ss"],
			["a1", "pin 0 adj1 maxAdj1"],
			["a2", "pin 0 adj2 maxAdj2"],
			["x1", "*/ ss a2 100000"],
			["dy1", "*/ ss a1 100000"],
			["y1", "+- b 0 dy1"],
			["cx1", "*/ x1 1 2"],
			["cy1", "+/ y1 b 2"],
			["d", "+- w 0 h"],
			["it", "?: d y1 t"],
			["ir", "?: d r x1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"l",
					"x1",
					"y1"
				],
				[
					"l",
					"r",
					"y1"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}]
	},
	cornertabs: {
		adj: [],
		gd: [
			["md", "mod w h 0"],
			["dx", "*/ 1 md 20"],
			["y1", "+- 0 b dx"],
			["x1", "+- 0 r dx"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"dx",
						"t"
					],
					[
						"l",
						"l",
						"dx"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"y1"
					],
					[
						"l",
						"dx",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"x1",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"dx"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"r",
						"y1"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"x1",
						"b"
					],
					["c"]
				]
			}
		]
	},
	cube: {
		adj: [["adj", "val 25000"]],
		gd: [
			["a", "pin 0 adj 100000"],
			["y1", "*/ ss a 100000"],
			["y4", "+- b 0 y1"],
			["y2", "*/ y4 1 2"],
			["y3", "+/ y1 b 2"],
			["x4", "+- r 0 y1"],
			["x2", "*/ x4 1 2"],
			["x3", "+/ y1 r 2"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"y1"
					],
					[
						"l",
						"x4",
						"y1"
					],
					[
						"l",
						"x4",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x4",
						"y1"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"y4"
					],
					[
						"l",
						"x4",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "lightenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"y1"
					],
					[
						"l",
						"y1",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"x4",
						"y1"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"y1"
					],
					[
						"l",
						"y1",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"y4"
					],
					[
						"l",
						"x4",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"l",
						"y1"
					],
					[
						"l",
						"x4",
						"y1"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"m",
						"x4",
						"y1"
					],
					[
						"l",
						"x4",
						"b"
					]
				]
			}
		]
	},
	curvedconnector2: {
		adj: [],
		gd: [],
		paths: [{
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"C",
				"wd2",
				"t",
				"r",
				"hd2",
				"r",
				"b"
			]]
		}]
	},
	curvedconnector3: {
		adj: [["adj1", "val 50000"]],
		gd: [
			["x2", "*/ w adj1 100000"],
			["x1", "+/ l x2 2"],
			["x3", "+/ r x2 2"],
			["y3", "*/ h 3 4"]
		],
		paths: [{
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"C",
					"x1",
					"t",
					"x2",
					"hd4",
					"x2",
					"vc"
				],
				[
					"C",
					"x2",
					"y3",
					"x3",
					"b",
					"r",
					"b"
				]
			]
		}]
	},
	curvedconnector4: {
		adj: [["adj1", "val 50000"], ["adj2", "val 50000"]],
		gd: [
			["x2", "*/ w adj1 100000"],
			["x1", "+/ l x2 2"],
			["x3", "+/ r x2 2"],
			["x4", "+/ x2 x3 2"],
			["x5", "+/ x3 r 2"],
			["y4", "*/ h adj2 100000"],
			["y1", "+/ t y4 2"],
			["y2", "+/ t y1 2"],
			["y3", "+/ y1 y4 2"],
			["y5", "+/ b y4 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"C",
					"x1",
					"t",
					"x2",
					"y2",
					"x2",
					"y1"
				],
				[
					"C",
					"x2",
					"y3",
					"x4",
					"y4",
					"x3",
					"y4"
				],
				[
					"C",
					"x5",
					"y4",
					"r",
					"y5",
					"r",
					"b"
				]
			]
		}]
	},
	curvedconnector5: {
		adj: [
			["adj1", "val 50000"],
			["adj2", "val 50000"],
			["adj3", "val 50000"]
		],
		gd: [
			["x3", "*/ w adj1 100000"],
			["x6", "*/ w adj3 100000"],
			["x1", "+/ x3 x6 2"],
			["x2", "+/ l x3 2"],
			["x4", "+/ x3 x1 2"],
			["x5", "+/ x6 x1 2"],
			["x7", "+/ x6 r 2"],
			["y4", "*/ h adj2 100000"],
			["y1", "+/ t y4 2"],
			["y2", "+/ t y1 2"],
			["y3", "+/ y1 y4 2"],
			["y5", "+/ b y4 2"],
			["y6", "+/ y5 y4 2"],
			["y7", "+/ y5 b 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"C",
					"x2",
					"t",
					"x3",
					"y2",
					"x3",
					"y1"
				],
				[
					"C",
					"x3",
					"y3",
					"x4",
					"y4",
					"x1",
					"y4"
				],
				[
					"C",
					"x5",
					"y4",
					"x6",
					"y6",
					"x6",
					"y5"
				],
				[
					"C",
					"x6",
					"y7",
					"x7",
					"b",
					"r",
					"b"
				]
			]
		}]
	},
	curveddownarrow: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 50000"],
			["adj3", "val 25000"]
		],
		gd: [
			["maxAdj2", "*/ 50000 w ss"],
			["a2", "pin 0 adj2 maxAdj2"],
			["a1", "pin 0 adj1 100000"],
			["th", "*/ ss a1 100000"],
			["aw", "*/ ss a2 100000"],
			["q1", "+/ th aw 4"],
			["wR", "+- wd2 0 q1"],
			["q7", "*/ wR 2 1"],
			["q8", "*/ q7 q7 1"],
			["q9", "*/ th th 1"],
			["q10", "+- q8 0 q9"],
			["q11", "sqrt q10"],
			["idy", "*/ q11 h q7"],
			["maxAdj3", "*/ 100000 idy ss"],
			["a3", "pin 0 adj3 maxAdj3"],
			["ah", "*/ ss adj3 100000"],
			["x3", "+- wR th 0"],
			["q2", "*/ h h 1"],
			["q3", "*/ ah ah 1"],
			["q4", "+- q2 0 q3"],
			["q5", "sqrt q4"],
			["dx", "*/ q5 wR h"],
			["x5", "+- wR dx 0"],
			["x7", "+- x3 dx 0"],
			["q6", "+- aw 0 th"],
			["dh", "*/ q6 1 2"],
			["x4", "+- x5 0 dh"],
			["x8", "+- x7 dh 0"],
			["aw2", "*/ aw 1 2"],
			["x6", "+- r 0 aw2"],
			["y1", "+- b 0 ah"],
			["swAng", "at2 ah dx"],
			["mswAng", "+- 0 0 swAng"],
			["iy", "+- b 0 idy"],
			["ix", "+/ wR x3 2"],
			["q12", "*/ th 1 2"],
			["dang2", "at2 idy q12"],
			["stAng", "+- 3cd4 swAng 0"],
			["stAng2", "+- 3cd4 0 dang2"],
			["swAng2", "+- dang2 0 cd4"],
			["swAng3", "+- cd4 dang2 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x6",
						"b"
					],
					[
						"l",
						"x4",
						"y1"
					],
					[
						"l",
						"x5",
						"y1"
					],
					[
						"a",
						"wR",
						"h",
						"stAng",
						"mswAng"
					],
					[
						"l",
						"x3",
						"t"
					],
					[
						"a",
						"wR",
						"h",
						"3cd4",
						"swAng"
					],
					[
						"l",
						"x8",
						"y1"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"ix",
						"iy"
					],
					[
						"a",
						"wR",
						"h",
						"stAng2",
						"swAng2"
					],
					[
						"l",
						"l",
						"b"
					],
					[
						"a",
						"wR",
						"h",
						"cd2",
						"swAng3"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"ix",
						"iy"
					],
					[
						"a",
						"wR",
						"h",
						"stAng2",
						"swAng2"
					],
					[
						"l",
						"l",
						"b"
					],
					[
						"a",
						"wR",
						"h",
						"cd2",
						"cd4"
					],
					[
						"l",
						"x3",
						"t"
					],
					[
						"a",
						"wR",
						"h",
						"3cd4",
						"swAng"
					],
					[
						"l",
						"x8",
						"y1"
					],
					[
						"l",
						"x6",
						"b"
					],
					[
						"l",
						"x4",
						"y1"
					],
					[
						"l",
						"x5",
						"y1"
					],
					[
						"a",
						"wR",
						"h",
						"stAng",
						"mswAng"
					]
				]
			}
		]
	},
	curvedleftarrow: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 50000"],
			["adj3", "val 25000"]
		],
		gd: [
			["maxAdj2", "*/ 50000 h ss"],
			["a2", "pin 0 adj2 maxAdj2"],
			["a1", "pin 0 adj1 a2"],
			["th", "*/ ss a1 100000"],
			["aw", "*/ ss a2 100000"],
			["q1", "+/ th aw 4"],
			["hR", "+- hd2 0 q1"],
			["q7", "*/ hR 2 1"],
			["q8", "*/ q7 q7 1"],
			["q9", "*/ th th 1"],
			["q10", "+- q8 0 q9"],
			["q11", "sqrt q10"],
			["idx", "*/ q11 w q7"],
			["maxAdj3", "*/ 100000 idx ss"],
			["a3", "pin 0 adj3 maxAdj3"],
			["ah", "*/ ss a3 100000"],
			["y3", "+- hR th 0"],
			["q2", "*/ w w 1"],
			["q3", "*/ ah ah 1"],
			["q4", "+- q2 0 q3"],
			["q5", "sqrt q4"],
			["dy", "*/ q5 hR w"],
			["y5", "+- hR dy 0"],
			["y7", "+- y3 dy 0"],
			["q6", "+- aw 0 th"],
			["dh", "*/ q6 1 2"],
			["y4", "+- y5 0 dh"],
			["y8", "+- y7 dh 0"],
			["aw2", "*/ aw 1 2"],
			["y6", "+- b 0 aw2"],
			["x1", "+- l ah 0"],
			["swAng", "at2 ah dy"],
			["mswAng", "+- 0 0 swAng"],
			["ix", "+- l idx 0"],
			["iy", "+/ hR y3 2"],
			["q12", "*/ th 1 2"],
			["dang2", "at2 idx q12"],
			["swAng2", "+- dang2 0 swAng"],
			["swAng3", "+- swAng dang2 0"],
			["stAng3", "+- 0 0 dang2"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"y6"
					],
					[
						"l",
						"x1",
						"y4"
					],
					[
						"l",
						"x1",
						"y5"
					],
					[
						"a",
						"w",
						"hR",
						"swAng",
						"swAng2"
					],
					[
						"a",
						"w",
						"hR",
						"stAng3",
						"swAng3"
					],
					[
						"l",
						"x1",
						"y8"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"r",
						"y3"
					],
					[
						"a",
						"w",
						"hR",
						"0",
						"-5400000"
					],
					[
						"l",
						"l",
						"t"
					],
					[
						"a",
						"w",
						"hR",
						"3cd4",
						"cd4"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"r",
						"y3"
					],
					[
						"a",
						"w",
						"hR",
						"0",
						"-5400000"
					],
					[
						"l",
						"l",
						"t"
					],
					[
						"a",
						"w",
						"hR",
						"3cd4",
						"cd4"
					],
					[
						"l",
						"r",
						"y3"
					],
					[
						"a",
						"w",
						"hR",
						"0",
						"swAng"
					],
					[
						"l",
						"x1",
						"y8"
					],
					[
						"l",
						"l",
						"y6"
					],
					[
						"l",
						"x1",
						"y4"
					],
					[
						"l",
						"x1",
						"y5"
					],
					[
						"a",
						"w",
						"hR",
						"swAng",
						"swAng2"
					]
				]
			}
		]
	},
	curvedrightarrow: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 50000"],
			["adj3", "val 25000"]
		],
		gd: [
			["maxAdj2", "*/ 50000 h ss"],
			["a2", "pin 0 adj2 maxAdj2"],
			["a1", "pin 0 adj1 a2"],
			["th", "*/ ss a1 100000"],
			["aw", "*/ ss a2 100000"],
			["q1", "+/ th aw 4"],
			["hR", "+- hd2 0 q1"],
			["q7", "*/ hR 2 1"],
			["q8", "*/ q7 q7 1"],
			["q9", "*/ th th 1"],
			["q10", "+- q8 0 q9"],
			["q11", "sqrt q10"],
			["idx", "*/ q11 w q7"],
			["maxAdj3", "*/ 100000 idx ss"],
			["a3", "pin 0 adj3 maxAdj3"],
			["ah", "*/ ss a3 100000"],
			["y3", "+- hR th 0"],
			["q2", "*/ w w 1"],
			["q3", "*/ ah ah 1"],
			["q4", "+- q2 0 q3"],
			["q5", "sqrt q4"],
			["dy", "*/ q5 hR w"],
			["y5", "+- hR dy 0"],
			["y7", "+- y3 dy 0"],
			["q6", "+- aw 0 th"],
			["dh", "*/ q6 1 2"],
			["y4", "+- y5 0 dh"],
			["y8", "+- y7 dh 0"],
			["aw2", "*/ aw 1 2"],
			["y6", "+- b 0 aw2"],
			["x1", "+- r 0 ah"],
			["swAng", "at2 ah dy"],
			["stAng", "+- cd2 0 swAng"],
			["mswAng", "+- 0 0 swAng"],
			["ix", "+- r 0 idx"],
			["iy", "+/ hR y3 2"],
			["q12", "*/ th 1 2"],
			["dang2", "at2 idx q12"],
			["swAng2", "+- dang2 0 cd4"],
			["swAng3", "+- cd4 dang2 0"],
			["stAng3", "+- cd2 0 dang2"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"hR"
					],
					[
						"a",
						"w",
						"hR",
						"cd2",
						"mswAng"
					],
					[
						"l",
						"x1",
						"y4"
					],
					[
						"l",
						"r",
						"y6"
					],
					[
						"l",
						"x1",
						"y8"
					],
					[
						"l",
						"x1",
						"y7"
					],
					[
						"a",
						"w",
						"hR",
						"stAng",
						"swAng"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"r",
						"th"
					],
					[
						"a",
						"w",
						"hR",
						"3cd4",
						"swAng2"
					],
					[
						"a",
						"w",
						"hR",
						"stAng3",
						"swAng3"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"hR"
					],
					[
						"a",
						"w",
						"hR",
						"cd2",
						"mswAng"
					],
					[
						"l",
						"x1",
						"y4"
					],
					[
						"l",
						"r",
						"y6"
					],
					[
						"l",
						"x1",
						"y8"
					],
					[
						"l",
						"x1",
						"y7"
					],
					[
						"a",
						"w",
						"hR",
						"stAng",
						"swAng"
					],
					[
						"l",
						"l",
						"hR"
					],
					[
						"a",
						"w",
						"hR",
						"cd2",
						"cd4"
					],
					[
						"l",
						"r",
						"th"
					],
					[
						"a",
						"w",
						"hR",
						"3cd4",
						"swAng2"
					]
				]
			}
		]
	},
	curveduparrow: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 50000"],
			["adj3", "val 25000"]
		],
		gd: [
			["maxAdj2", "*/ 50000 w ss"],
			["a2", "pin 0 adj2 maxAdj2"],
			["a1", "pin 0 adj1 100000"],
			["th", "*/ ss a1 100000"],
			["aw", "*/ ss a2 100000"],
			["q1", "+/ th aw 4"],
			["wR", "+- wd2 0 q1"],
			["q7", "*/ wR 2 1"],
			["q8", "*/ q7 q7 1"],
			["q9", "*/ th th 1"],
			["q10", "+- q8 0 q9"],
			["q11", "sqrt q10"],
			["idy", "*/ q11 h q7"],
			["maxAdj3", "*/ 100000 idy ss"],
			["a3", "pin 0 adj3 maxAdj3"],
			["ah", "*/ ss adj3 100000"],
			["x3", "+- wR th 0"],
			["q2", "*/ h h 1"],
			["q3", "*/ ah ah 1"],
			["q4", "+- q2 0 q3"],
			["q5", "sqrt q4"],
			["dx", "*/ q5 wR h"],
			["x5", "+- wR dx 0"],
			["x7", "+- x3 dx 0"],
			["q6", "+- aw 0 th"],
			["dh", "*/ q6 1 2"],
			["x4", "+- x5 0 dh"],
			["x8", "+- x7 dh 0"],
			["aw2", "*/ aw 1 2"],
			["x6", "+- r 0 aw2"],
			["y1", "+- t ah 0"],
			["swAng", "at2 ah dx"],
			["mswAng", "+- 0 0 swAng"],
			["iy", "+- t idy 0"],
			["ix", "+/ wR x3 2"],
			["q12", "*/ th 1 2"],
			["dang2", "at2 idy q12"],
			["swAng2", "+- dang2 0 swAng"],
			["mswAng2", "+- 0 0 swAng2"],
			["stAng3", "+- cd4 0 swAng"],
			["swAng3", "+- swAng dang2 0"],
			["stAng2", "+- cd4 0 dang2"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x6",
						"t"
					],
					[
						"l",
						"x8",
						"y1"
					],
					[
						"l",
						"x7",
						"y1"
					],
					[
						"a",
						"wR",
						"h",
						"stAng3",
						"swAng3"
					],
					[
						"a",
						"wR",
						"h",
						"stAng2",
						"swAng2"
					],
					[
						"l",
						"x4",
						"y1"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"wR",
						"b"
					],
					[
						"a",
						"wR",
						"h",
						"cd4",
						"cd4"
					],
					[
						"l",
						"th",
						"t"
					],
					[
						"a",
						"wR",
						"h",
						"cd2",
						"-5400000"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"ix",
						"iy"
					],
					[
						"a",
						"wR",
						"h",
						"stAng2",
						"swAng2"
					],
					[
						"l",
						"x4",
						"y1"
					],
					[
						"l",
						"x6",
						"t"
					],
					[
						"l",
						"x8",
						"y1"
					],
					[
						"l",
						"x7",
						"y1"
					],
					[
						"a",
						"wR",
						"h",
						"stAng3",
						"swAng"
					],
					[
						"l",
						"wR",
						"b"
					],
					[
						"a",
						"wR",
						"h",
						"cd4",
						"cd4"
					],
					[
						"l",
						"th",
						"t"
					],
					[
						"a",
						"wR",
						"h",
						"cd2",
						"-5400000"
					]
				]
			}
		]
	},
	decagon: {
		adj: [["vf", "val 105146"]],
		gd: [
			["shd2", "*/ hd2 vf 100000"],
			["dx1", "cos wd2 2160000"],
			["dx2", "cos wd2 4320000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc dx2 0"],
			["x4", "+- hc dx1 0"],
			["dy1", "sin shd2 4320000"],
			["dy2", "sin shd2 2160000"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc 0 dy2"],
			["y3", "+- vc dy2 0"],
			["y4", "+- vc dy1 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"x1",
					"y2"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"x3",
					"y1"
				],
				[
					"l",
					"x4",
					"y2"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"x4",
					"y3"
				],
				[
					"l",
					"x3",
					"y4"
				],
				[
					"l",
					"x2",
					"y4"
				],
				[
					"l",
					"x1",
					"y3"
				],
				["c"]
			]
		}]
	},
	diagstripe: {
		adj: [["adj", "val 50000"]],
		gd: [
			["a", "pin 0 adj 100000"],
			["x2", "*/ w a 100000"],
			["x1", "*/ x2 1 2"],
			["x3", "+/ x2 r 2"],
			["y2", "*/ h a 100000"],
			["y1", "*/ y2 1 2"],
			["y3", "+/ y2 b 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y2"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}]
	},
	diamond: {
		adj: [],
		gd: [["ir", "*/ w 3 4"], ["ib", "*/ h 3 4"]],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"hc",
					"b"
				],
				["c"]
			]
		}]
	},
	dodecagon: {
		adj: [],
		gd: [
			["x1", "*/ w 2894 21600"],
			["x2", "*/ w 7906 21600"],
			["x3", "*/ w 13694 21600"],
			["x4", "*/ w 18706 21600"],
			["y1", "*/ h 2894 21600"],
			["y2", "*/ h 7906 21600"],
			["y3", "*/ h 13694 21600"],
			["y4", "*/ h 18706 21600"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y2"
				],
				[
					"l",
					"x1",
					"y1"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"x3",
					"t"
				],
				[
					"l",
					"x4",
					"y1"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"l",
					"r",
					"y3"
				],
				[
					"l",
					"x4",
					"y4"
				],
				[
					"l",
					"x3",
					"b"
				],
				[
					"l",
					"x2",
					"b"
				],
				[
					"l",
					"x1",
					"y4"
				],
				[
					"l",
					"l",
					"y3"
				],
				["c"]
			]
		}]
	},
	donut: {
		adj: [["adj", "val 25000"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["dr", "*/ ss a 100000"],
			["iwd2", "+- wd2 0 dr"],
			["ihd2", "+- hd2 0 dr"],
			["idx", "cos wd2 2700000"],
			["idy", "sin hd2 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"a",
					"wd2",
					"hd2",
					"cd2",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"3cd4",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"0",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"cd4",
					"cd4"
				],
				["c"],
				[
					"m",
					"dr",
					"vc"
				],
				[
					"a",
					"iwd2",
					"ihd2",
					"cd2",
					"-5400000"
				],
				[
					"a",
					"iwd2",
					"ihd2",
					"cd4",
					"-5400000"
				],
				[
					"a",
					"iwd2",
					"ihd2",
					"0",
					"-5400000"
				],
				[
					"a",
					"iwd2",
					"ihd2",
					"3cd4",
					"-5400000"
				],
				["c"]
			]
		}]
	},
	doublewave: {
		adj: [["adj1", "val 6250"], ["adj2", "val 0"]],
		gd: [
			["a1", "pin 0 adj1 12500"],
			["a2", "pin -10000 adj2 10000"],
			["y1", "*/ h a1 100000"],
			["dy2", "*/ y1 10 3"],
			["y2", "+- y1 0 dy2"],
			["y3", "+- y1 dy2 0"],
			["y4", "+- b 0 y1"],
			["y5", "+- y4 0 dy2"],
			["y6", "+- y4 dy2 0"],
			["dx1", "*/ w a2 100000"],
			["of2", "*/ w a2 50000"],
			["x1", "abs dx1"],
			["dx2", "?: of2 0 of2"],
			["x2", "+- l 0 dx2"],
			["dx8", "?: of2 of2 0"],
			["x8", "+- r 0 dx8"],
			["dx3", "+/ dx2 x8 6"],
			["x3", "+- x2 dx3 0"],
			["dx4", "+/ dx2 x8 3"],
			["x4", "+- x2 dx4 0"],
			["x5", "+/ x2 x8 2"],
			["x6", "+- x5 dx3 0"],
			["x7", "+/ x6 x8 2"],
			["x9", "+- l dx8 0"],
			["x15", "+- r dx2 0"],
			["x10", "+- x9 dx3 0"],
			["x11", "+- x9 dx4 0"],
			["x12", "+/ x9 x15 2"],
			["x13", "+- x12 dx3 0"],
			["x14", "+/ x13 x15 2"],
			["x16", "+- r 0 x1"],
			["xAdj", "+- hc dx1 0"],
			["il", "max x2 x9"],
			["ir", "min x8 x15"],
			["it", "*/ h a1 50000"],
			["ib", "+- b 0 it"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x2",
					"y1"
				],
				[
					"C",
					"x3",
					"y2",
					"x4",
					"y3",
					"x5",
					"y1"
				],
				[
					"C",
					"x6",
					"y2",
					"x7",
					"y3",
					"x8",
					"y1"
				],
				[
					"l",
					"x15",
					"y4"
				],
				[
					"C",
					"x14",
					"y6",
					"x13",
					"y5",
					"x12",
					"y4"
				],
				[
					"C",
					"x11",
					"y6",
					"x10",
					"y5",
					"x9",
					"y4"
				],
				["c"]
			]
		}]
	},
	downarrow: {
		adj: [["adj1", "val 50000"], ["adj2", "val 50000"]],
		gd: [
			["maxAdj2", "*/ 100000 h ss"],
			["a1", "pin 0 adj1 100000"],
			["a2", "pin 0 adj2 maxAdj2"],
			["dy1", "*/ ss a2 100000"],
			["y1", "+- b 0 dy1"],
			["dx1", "*/ w a1 200000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc dx1 0"],
			["dy2", "*/ x1 dy1 wd2"],
			["y2", "+- y1 dy2 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y1"
				],
				[
					"l",
					"x1",
					"y1"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"r",
					"y1"
				],
				[
					"l",
					"hc",
					"b"
				],
				["c"]
			]
		}]
	},
	downarrowcallout: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 25000"],
			["adj3", "val 25000"],
			["adj4", "val 64977"]
		],
		gd: [
			["maxAdj2", "*/ 50000 w ss"],
			["a2", "pin 0 adj2 maxAdj2"],
			["maxAdj1", "*/ a2 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["maxAdj3", "*/ 100000 h ss"],
			["a3", "pin 0 adj3 maxAdj3"],
			["q2", "*/ a3 ss h"],
			["maxAdj4", "+- 100000 0 q2"],
			["a4", "pin 0 adj4 maxAdj4"],
			["dx1", "*/ ss a2 100000"],
			["dx2", "*/ ss a1 200000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc dx2 0"],
			["x4", "+- hc dx1 0"],
			["dy3", "*/ ss a3 100000"],
			["y3", "+- b 0 dy3"],
			["y2", "*/ h a4 100000"],
			["y1", "*/ y2 1 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"l",
					"x3",
					"y2"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"l",
					"x4",
					"y3"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"x1",
					"y3"
				],
				[
					"l",
					"x2",
					"y3"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"l",
					"y2"
				],
				["c"]
			]
		}]
	},
	ellipse: {
		adj: [],
		gd: [
			["idx", "cos wd2 2700000"],
			["idy", "sin hd2 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"a",
					"wd2",
					"hd2",
					"cd2",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"3cd4",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"0",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"cd4",
					"cd4"
				],
				["c"]
			]
		}]
	},
	ellipseribbon: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 50000"],
			["adj3", "val 12500"]
		],
		gd: [
			["a1", "pin 0 adj1 100000"],
			["a2", "pin 25000 adj2 75000"],
			["q10", "+- 100000 0 a1"],
			["q11", "*/ q10 1 2"],
			["q12", "+- a1 0 q11"],
			["minAdj3", "max 0 q12"],
			["a3", "pin minAdj3 adj3 a1"],
			["dx2", "*/ w a2 200000"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- x2 wd8 0"],
			["x4", "+- r 0 x3"],
			["x5", "+- r 0 x2"],
			["x6", "+- r 0 wd8"],
			["dy1", "*/ h a3 100000"],
			["f1", "*/ 4 dy1 w"],
			["q1", "*/ x3 x3 w"],
			["q2", "+- x3 0 q1"],
			["y1", "*/ f1 q2 1"],
			["cx1", "*/ x3 1 2"],
			["cy1", "*/ f1 cx1 1"],
			["cx2", "+- r 0 cx1"],
			["q1", "*/ h a1 100000"],
			["dy3", "+- q1 0 dy1"],
			["q3", "*/ x2 x2 w"],
			["q4", "+- x2 0 q3"],
			["q5", "*/ f1 q4 1"],
			["y3", "+- q5 dy3 0"],
			["q6", "+- dy1 dy3 y3"],
			["q7", "+- q6 dy1 0"],
			["cy3", "+- q7 dy3 0"],
			["rh", "+- b 0 q1"],
			["q8", "*/ dy1 14 16"],
			["y2", "+/ q8 rh 2"],
			["y5", "+- q5 rh 0"],
			["y6", "+- y3 rh 0"],
			["cx4", "*/ x2 1 2"],
			["q9", "*/ f1 cx4 1"],
			["cy4", "+- q9 rh 0"],
			["cx5", "+- r 0 cx4"],
			["cy6", "+- cy3 rh 0"],
			["y7", "+- y1 dy3 0"],
			["cy7", "+- q1 q1 y7"],
			["y8", "+- b 0 dy1"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"Q",
						"cx1",
						"cy1",
						"x3",
						"y1"
					],
					[
						"l",
						"x2",
						"y3"
					],
					[
						"Q",
						"hc",
						"cy3",
						"x5",
						"y3"
					],
					[
						"l",
						"x4",
						"y1"
					],
					[
						"Q",
						"cx2",
						"cy1",
						"r",
						"t"
					],
					[
						"l",
						"x6",
						"y2"
					],
					[
						"l",
						"r",
						"rh"
					],
					[
						"Q",
						"cx5",
						"cy4",
						"x5",
						"y5"
					],
					[
						"l",
						"x5",
						"y6"
					],
					[
						"Q",
						"hc",
						"cy6",
						"x2",
						"y6"
					],
					[
						"l",
						"x2",
						"y5"
					],
					[
						"Q",
						"cx4",
						"cy4",
						"l",
						"rh"
					],
					[
						"l",
						"wd8",
						"y2"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x3",
						"y7"
					],
					[
						"l",
						"x3",
						"y1"
					],
					[
						"l",
						"x2",
						"y3"
					],
					[
						"Q",
						"hc",
						"cy3",
						"x5",
						"y3"
					],
					[
						"l",
						"x4",
						"y1"
					],
					[
						"l",
						"x4",
						"y7"
					],
					[
						"Q",
						"hc",
						"cy7",
						"x3",
						"y7"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"Q",
						"cx1",
						"cy1",
						"x3",
						"y1"
					],
					[
						"l",
						"x2",
						"y3"
					],
					[
						"Q",
						"hc",
						"cy3",
						"x5",
						"y3"
					],
					[
						"l",
						"x4",
						"y1"
					],
					[
						"Q",
						"cx2",
						"cy1",
						"r",
						"t"
					],
					[
						"l",
						"x6",
						"y2"
					],
					[
						"l",
						"r",
						"rh"
					],
					[
						"Q",
						"cx5",
						"cy4",
						"x5",
						"y5"
					],
					[
						"l",
						"x5",
						"y6"
					],
					[
						"Q",
						"hc",
						"cy6",
						"x2",
						"y6"
					],
					[
						"l",
						"x2",
						"y5"
					],
					[
						"Q",
						"cx4",
						"cy4",
						"l",
						"rh"
					],
					[
						"l",
						"wd8",
						"y2"
					],
					["c"],
					[
						"m",
						"x2",
						"y5"
					],
					[
						"l",
						"x2",
						"y3"
					],
					[
						"m",
						"x5",
						"y3"
					],
					[
						"l",
						"x5",
						"y5"
					],
					[
						"m",
						"x3",
						"y1"
					],
					[
						"l",
						"x3",
						"y7"
					],
					[
						"m",
						"x4",
						"y7"
					],
					[
						"l",
						"x4",
						"y1"
					]
				]
			}
		]
	},
	ellipseribbon2: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 50000"],
			["adj3", "val 12500"]
		],
		gd: [
			["a1", "pin 0 adj1 100000"],
			["a2", "pin 25000 adj2 75000"],
			["q10", "+- 100000 0 a1"],
			["q11", "*/ q10 1 2"],
			["q12", "+- a1 0 q11"],
			["minAdj3", "max 0 q12"],
			["a3", "pin minAdj3 adj3 a1"],
			["dx2", "*/ w a2 200000"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- x2 wd8 0"],
			["x4", "+- r 0 x3"],
			["x5", "+- r 0 x2"],
			["x6", "+- r 0 wd8"],
			["dy1", "*/ h a3 100000"],
			["f1", "*/ 4 dy1 w"],
			["q1", "*/ x3 x3 w"],
			["q2", "+- x3 0 q1"],
			["u1", "*/ f1 q2 1"],
			["y1", "+- b 0 u1"],
			["cx1", "*/ x3 1 2"],
			["cu1", "*/ f1 cx1 1"],
			["cy1", "+- b 0 cu1"],
			["cx2", "+- r 0 cx1"],
			["q1", "*/ h a1 100000"],
			["dy3", "+- q1 0 dy1"],
			["q3", "*/ x2 x2 w"],
			["q4", "+- x2 0 q3"],
			["q5", "*/ f1 q4 1"],
			["u3", "+- q5 dy3 0"],
			["y3", "+- b 0 u3"],
			["q6", "+- dy1 dy3 u3"],
			["q7", "+- q6 dy1 0"],
			["cu3", "+- q7 dy3 0"],
			["cy3", "+- b 0 cu3"],
			["rh", "+- b 0 q1"],
			["q8", "*/ dy1 14 16"],
			["u2", "+/ q8 rh 2"],
			["y2", "+- b 0 u2"],
			["u5", "+- q5 rh 0"],
			["y5", "+- b 0 u5"],
			["u6", "+- u3 rh 0"],
			["y6", "+- b 0 u6"],
			["cx4", "*/ x2 1 2"],
			["q9", "*/ f1 cx4 1"],
			["cu4", "+- q9 rh 0"],
			["cy4", "+- b 0 cu4"],
			["cx5", "+- r 0 cx4"],
			["cu6", "+- cu3 rh 0"],
			["cy6", "+- b 0 cu6"],
			["u7", "+- u1 dy3 0"],
			["y7", "+- b 0 u7"],
			["cu7", "+- q1 q1 u7"],
			["cy7", "+- b 0 cu7"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"b"
					],
					[
						"Q",
						"cx1",
						"cy1",
						"x3",
						"y1"
					],
					[
						"l",
						"x2",
						"y3"
					],
					[
						"Q",
						"hc",
						"cy3",
						"x5",
						"y3"
					],
					[
						"l",
						"x4",
						"y1"
					],
					[
						"Q",
						"cx2",
						"cy1",
						"r",
						"b"
					],
					[
						"l",
						"x6",
						"y2"
					],
					[
						"l",
						"r",
						"q1"
					],
					[
						"Q",
						"cx5",
						"cy4",
						"x5",
						"y5"
					],
					[
						"l",
						"x5",
						"y6"
					],
					[
						"Q",
						"hc",
						"cy6",
						"x2",
						"y6"
					],
					[
						"l",
						"x2",
						"y5"
					],
					[
						"Q",
						"cx4",
						"cy4",
						"l",
						"q1"
					],
					[
						"l",
						"wd8",
						"y2"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x3",
						"y7"
					],
					[
						"l",
						"x3",
						"y1"
					],
					[
						"l",
						"x2",
						"y3"
					],
					[
						"Q",
						"hc",
						"cy3",
						"x5",
						"y3"
					],
					[
						"l",
						"x4",
						"y1"
					],
					[
						"l",
						"x4",
						"y7"
					],
					[
						"Q",
						"hc",
						"cy7",
						"x3",
						"y7"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"b"
					],
					[
						"l",
						"wd8",
						"y2"
					],
					[
						"l",
						"l",
						"q1"
					],
					[
						"Q",
						"cx4",
						"cy4",
						"x2",
						"y5"
					],
					[
						"l",
						"x2",
						"y6"
					],
					[
						"Q",
						"hc",
						"cy6",
						"x5",
						"y6"
					],
					[
						"l",
						"x5",
						"y5"
					],
					[
						"Q",
						"cx5",
						"cy4",
						"r",
						"q1"
					],
					[
						"l",
						"x6",
						"y2"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"Q",
						"cx2",
						"cy1",
						"x4",
						"y1"
					],
					[
						"l",
						"x5",
						"y3"
					],
					[
						"Q",
						"hc",
						"cy3",
						"x2",
						"y3"
					],
					[
						"l",
						"x3",
						"y1"
					],
					[
						"Q",
						"cx1",
						"cy1",
						"l",
						"b"
					],
					["c"],
					[
						"m",
						"x2",
						"y3"
					],
					[
						"l",
						"x2",
						"y5"
					],
					[
						"m",
						"x5",
						"y5"
					],
					[
						"l",
						"x5",
						"y3"
					],
					[
						"m",
						"x3",
						"y7"
					],
					[
						"l",
						"x3",
						"y1"
					],
					[
						"m",
						"x4",
						"y1"
					],
					[
						"l",
						"x4",
						"y7"
					]
				]
			}
		]
	},
	flowchartalternateprocess: {
		adj: [],
		gd: [
			["x2", "+- r 0 ssd6"],
			["y2", "+- b 0 ssd6"],
			["il", "*/ ssd6 29289 100000"],
			["ir", "+- r 0 il"],
			["ib", "+- b 0 il"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"ssd6"
				],
				[
					"a",
					"ssd6",
					"ssd6",
					"cd2",
					"cd4"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"a",
					"ssd6",
					"ssd6",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"a",
					"ssd6",
					"ssd6",
					"0",
					"cd4"
				],
				[
					"l",
					"ssd6",
					"b"
				],
				[
					"a",
					"ssd6",
					"ssd6",
					"cd4",
					"cd4"
				],
				["c"]
			]
		}]
	},
	flowchartcollate: {
		adj: [],
		gd: [["ir", "*/ w 3 4"], ["ib", "*/ h 3 4"]],
		paths: [{
			w: 2,
			h: 2,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"0"
				],
				[
					"l",
					"2",
					"0"
				],
				[
					"l",
					"1",
					"1"
				],
				[
					"l",
					"2",
					"2"
				],
				[
					"l",
					"0",
					"2"
				],
				[
					"l",
					"1",
					"1"
				],
				["c"]
			]
		}]
	},
	flowchartconnector: {
		adj: [],
		gd: [
			["idx", "cos wd2 2700000"],
			["idy", "sin hd2 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"a",
					"wd2",
					"hd2",
					"cd2",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"3cd4",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"0",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"cd4",
					"cd4"
				],
				["c"]
			]
		}]
	},
	flowchartdecision: {
		adj: [],
		gd: [["ir", "*/ w 3 4"], ["ib", "*/ h 3 4"]],
		paths: [{
			w: 2,
			h: 2,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"1"
				],
				[
					"l",
					"1",
					"0"
				],
				[
					"l",
					"2",
					"1"
				],
				[
					"l",
					"1",
					"2"
				],
				["c"]
			]
		}]
	},
	flowchartdelay: {
		adj: [],
		gd: [
			["idx", "cos wd2 2700000"],
			["idy", "sin hd2 2700000"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"a",
					"wd2",
					"hd2",
					"3cd4",
					"cd2"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}]
	},
	flowchartdisplay: {
		adj: [],
		gd: [["x2", "*/ w 5 6"]],
		paths: [{
			w: 6,
			h: 6,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"3"
				],
				[
					"l",
					"1",
					"0"
				],
				[
					"l",
					"5",
					"0"
				],
				[
					"a",
					"1",
					"3",
					"3cd4",
					"cd2"
				],
				[
					"l",
					"1",
					"6"
				],
				["c"]
			]
		}]
	},
	flowchartdocument: {
		adj: [],
		gd: [["y1", "*/ h 17322 21600"], ["y2", "*/ h 20172 21600"]],
		paths: [{
			w: 21600,
			h: 21600,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"0"
				],
				[
					"l",
					"21600",
					"0"
				],
				[
					"l",
					"21600",
					"17322"
				],
				[
					"C",
					"10800",
					"17322",
					"10800",
					"23922",
					"0",
					"20172"
				],
				["c"]
			]
		}]
	},
	flowchartextract: {
		adj: [],
		gd: [["x2", "*/ w 3 4"]],
		paths: [{
			w: 2,
			h: 2,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"2"
				],
				[
					"l",
					"1",
					"0"
				],
				[
					"l",
					"2",
					"2"
				],
				["c"]
			]
		}]
	},
	flowchartinputoutput: {
		adj: [],
		gd: [
			["x3", "*/ w 2 5"],
			["x4", "*/ w 3 5"],
			["x5", "*/ w 4 5"],
			["x6", "*/ w 9 10"]
		],
		paths: [{
			w: 5,
			h: 5,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"5"
				],
				[
					"l",
					"1",
					"0"
				],
				[
					"l",
					"5",
					"0"
				],
				[
					"l",
					"4",
					"5"
				],
				["c"]
			]
		}]
	},
	flowchartinternalstorage: {
		adj: [],
		gd: [],
		paths: [
			{
				w: 1,
				h: 1,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"0",
						"0"
					],
					[
						"l",
						"1",
						"0"
					],
					[
						"l",
						"1",
						"1"
					],
					[
						"l",
						"0",
						"1"
					],
					["c"]
				]
			},
			{
				w: 8,
				h: 8,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"1",
						"0"
					],
					[
						"l",
						"1",
						"8"
					],
					[
						"m",
						"0",
						"1"
					],
					[
						"l",
						"8",
						"1"
					]
				]
			},
			{
				w: 1,
				h: 1,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"0",
						"0"
					],
					[
						"l",
						"1",
						"0"
					],
					[
						"l",
						"1",
						"1"
					],
					[
						"l",
						"0",
						"1"
					],
					["c"]
				]
			}
		]
	},
	flowchartmagneticdisk: {
		adj: [],
		gd: [["y3", "*/ h 5 6"]],
		paths: [
			{
				w: 6,
				h: 6,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"0",
						"1"
					],
					[
						"a",
						"3",
						"1",
						"cd2",
						"cd2"
					],
					[
						"l",
						"6",
						"5"
					],
					[
						"a",
						"3",
						"1",
						"0",
						"cd2"
					],
					["c"]
				]
			},
			{
				w: 6,
				h: 6,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [[
					"m",
					"6",
					"1"
				], [
					"a",
					"3",
					"1",
					"0",
					"cd2"
				]]
			},
			{
				w: 6,
				h: 6,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"0",
						"1"
					],
					[
						"a",
						"3",
						"1",
						"cd2",
						"cd2"
					],
					[
						"l",
						"6",
						"5"
					],
					[
						"a",
						"3",
						"1",
						"0",
						"cd2"
					],
					["c"]
				]
			}
		]
	},
	flowchartmagneticdrum: {
		adj: [],
		gd: [["x2", "*/ w 2 3"]],
		paths: [
			{
				w: 6,
				h: 6,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"1",
						"0"
					],
					[
						"l",
						"5",
						"0"
					],
					[
						"a",
						"1",
						"3",
						"3cd4",
						"cd2"
					],
					[
						"l",
						"1",
						"6"
					],
					[
						"a",
						"1",
						"3",
						"cd4",
						"cd2"
					],
					["c"]
				]
			},
			{
				w: 6,
				h: 6,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [[
					"m",
					"5",
					"6"
				], [
					"a",
					"1",
					"3",
					"cd4",
					"cd2"
				]]
			},
			{
				w: 6,
				h: 6,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"1",
						"0"
					],
					[
						"l",
						"5",
						"0"
					],
					[
						"a",
						"1",
						"3",
						"3cd4",
						"cd2"
					],
					[
						"l",
						"1",
						"6"
					],
					[
						"a",
						"1",
						"3",
						"cd4",
						"cd2"
					],
					["c"]
				]
			}
		]
	},
	flowchartmagnetictape: {
		adj: [],
		gd: [
			["idx", "cos wd2 2700000"],
			["idy", "sin hd2 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"],
			["ang1", "at2 w h"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"hc",
					"b"
				],
				[
					"a",
					"wd2",
					"hd2",
					"cd4",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"cd2",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"3cd4",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"0",
					"ang1"
				],
				[
					"l",
					"r",
					"ib"
				],
				[
					"l",
					"r",
					"b"
				],
				["c"]
			]
		}]
	},
	flowchartmanualinput: {
		adj: [],
		gd: [],
		paths: [{
			w: 5,
			h: 5,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"1"
				],
				[
					"l",
					"5",
					"0"
				],
				[
					"l",
					"5",
					"5"
				],
				[
					"l",
					"0",
					"5"
				],
				["c"]
			]
		}]
	},
	flowchartmanualoperation: {
		adj: [],
		gd: [["x3", "*/ w 4 5"], ["x4", "*/ w 9 10"]],
		paths: [{
			w: 5,
			h: 5,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"0"
				],
				[
					"l",
					"5",
					"0"
				],
				[
					"l",
					"4",
					"5"
				],
				[
					"l",
					"1",
					"5"
				],
				["c"]
			]
		}]
	},
	flowchartmerge: {
		adj: [],
		gd: [["x2", "*/ w 3 4"]],
		paths: [{
			w: 2,
			h: 2,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"0"
				],
				[
					"l",
					"2",
					"0"
				],
				[
					"l",
					"1",
					"2"
				],
				["c"]
			]
		}]
	},
	flowchartmultidocument: {
		adj: [],
		gd: [
			["y2", "*/ h 3675 21600"],
			["y8", "*/ h 20782 21600"],
			["x3", "*/ w 9298 21600"],
			["x4", "*/ w 12286 21600"],
			["x5", "*/ w 18595 21600"]
		],
		paths: [
			{
				w: 21600,
				h: 21600,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"0",
						"20782"
					],
					[
						"C",
						"9298",
						"23542",
						"9298",
						"18022",
						"18595",
						"18022"
					],
					[
						"l",
						"18595",
						"3675"
					],
					[
						"l",
						"0",
						"3675"
					],
					["c"],
					[
						"m",
						"1532",
						"3675"
					],
					[
						"l",
						"1532",
						"1815"
					],
					[
						"l",
						"20000",
						"1815"
					],
					[
						"l",
						"20000",
						"16252"
					],
					[
						"C",
						"19298",
						"16252",
						"18595",
						"16352",
						"18595",
						"16352"
					],
					[
						"l",
						"18595",
						"3675"
					],
					["c"],
					[
						"m",
						"2972",
						"1815"
					],
					[
						"l",
						"2972",
						"0"
					],
					[
						"l",
						"21600",
						"0"
					],
					[
						"l",
						"21600",
						"14392"
					],
					[
						"C",
						"20800",
						"14392",
						"20000",
						"14467",
						"20000",
						"14467"
					],
					[
						"l",
						"20000",
						"1815"
					],
					["c"]
				]
			},
			{
				w: 21600,
				h: 21600,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"0",
						"3675"
					],
					[
						"l",
						"18595",
						"3675"
					],
					[
						"l",
						"18595",
						"18022"
					],
					[
						"C",
						"9298",
						"18022",
						"9298",
						"23542",
						"0",
						"20782"
					],
					["c"],
					[
						"m",
						"1532",
						"3675"
					],
					[
						"l",
						"1532",
						"1815"
					],
					[
						"l",
						"20000",
						"1815"
					],
					[
						"l",
						"20000",
						"16252"
					],
					[
						"C",
						"19298",
						"16252",
						"18595",
						"16352",
						"18595",
						"16352"
					],
					[
						"m",
						"2972",
						"1815"
					],
					[
						"l",
						"2972",
						"0"
					],
					[
						"l",
						"21600",
						"0"
					],
					[
						"l",
						"21600",
						"14392"
					],
					[
						"C",
						"20800",
						"14392",
						"20000",
						"14467",
						"20000",
						"14467"
					]
				]
			},
			{
				w: 21600,
				h: 21600,
				fill: "none",
				stroke: !1,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"0",
						"20782"
					],
					[
						"C",
						"9298",
						"23542",
						"9298",
						"18022",
						"18595",
						"18022"
					],
					[
						"l",
						"18595",
						"16352"
					],
					[
						"C",
						"18595",
						"16352",
						"19298",
						"16252",
						"20000",
						"16252"
					],
					[
						"l",
						"20000",
						"14467"
					],
					[
						"C",
						"20000",
						"14467",
						"20800",
						"14392",
						"21600",
						"14392"
					],
					[
						"l",
						"21600",
						"0"
					],
					[
						"l",
						"2972",
						"0"
					],
					[
						"l",
						"2972",
						"1815"
					],
					[
						"l",
						"1532",
						"1815"
					],
					[
						"l",
						"1532",
						"3675"
					],
					[
						"l",
						"0",
						"3675"
					],
					["c"]
				]
			}
		]
	},
	flowchartofflinestorage: {
		adj: [],
		gd: [["x4", "*/ w 3 4"]],
		paths: [
			{
				w: 2,
				h: 2,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"0",
						"0"
					],
					[
						"l",
						"2",
						"0"
					],
					[
						"l",
						"1",
						"2"
					],
					["c"]
				]
			},
			{
				w: 5,
				h: 5,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [[
					"m",
					"2",
					"4"
				], [
					"l",
					"3",
					"4"
				]]
			},
			{
				w: 2,
				h: 2,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"0",
						"0"
					],
					[
						"l",
						"2",
						"0"
					],
					[
						"l",
						"1",
						"2"
					],
					["c"]
				]
			}
		]
	},
	flowchartoffpageconnector: {
		adj: [],
		gd: [["y1", "*/ h 4 5"]],
		paths: [{
			w: 10,
			h: 10,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"0"
				],
				[
					"l",
					"10",
					"0"
				],
				[
					"l",
					"10",
					"8"
				],
				[
					"l",
					"5",
					"10"
				],
				[
					"l",
					"0",
					"8"
				],
				["c"]
			]
		}]
	},
	flowchartonlinestorage: {
		adj: [],
		gd: [["x2", "*/ w 5 6"]],
		paths: [{
			w: 6,
			h: 6,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"1",
					"0"
				],
				[
					"l",
					"6",
					"0"
				],
				[
					"a",
					"1",
					"3",
					"3cd4",
					"-10800000"
				],
				[
					"l",
					"1",
					"6"
				],
				[
					"a",
					"1",
					"3",
					"cd4",
					"cd2"
				],
				["c"]
			]
		}]
	},
	flowchartor: {
		adj: [],
		gd: [
			["idx", "cos wd2 2700000"],
			["idy", "sin hd2 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"vc"
					],
					[
						"a",
						"wd2",
						"hd2",
						"cd2",
						"cd4"
					],
					[
						"a",
						"wd2",
						"hd2",
						"3cd4",
						"cd4"
					],
					[
						"a",
						"wd2",
						"hd2",
						"0",
						"cd4"
					],
					[
						"a",
						"wd2",
						"hd2",
						"cd4",
						"cd4"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"hc",
						"t"
					],
					[
						"l",
						"hc",
						"b"
					],
					[
						"m",
						"l",
						"vc"
					],
					[
						"l",
						"r",
						"vc"
					]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"vc"
					],
					[
						"a",
						"wd2",
						"hd2",
						"cd2",
						"cd4"
					],
					[
						"a",
						"wd2",
						"hd2",
						"3cd4",
						"cd4"
					],
					[
						"a",
						"wd2",
						"hd2",
						"0",
						"cd4"
					],
					[
						"a",
						"wd2",
						"hd2",
						"cd4",
						"cd4"
					],
					["c"]
				]
			}
		]
	},
	flowchartpredefinedprocess: {
		adj: [],
		gd: [["x2", "*/ w 7 8"]],
		paths: [
			{
				w: 1,
				h: 1,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"0",
						"0"
					],
					[
						"l",
						"1",
						"0"
					],
					[
						"l",
						"1",
						"1"
					],
					[
						"l",
						"0",
						"1"
					],
					["c"]
				]
			},
			{
				w: 8,
				h: 8,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"1",
						"0"
					],
					[
						"l",
						"1",
						"8"
					],
					[
						"m",
						"7",
						"0"
					],
					[
						"l",
						"7",
						"8"
					]
				]
			},
			{
				w: 1,
				h: 1,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"0",
						"0"
					],
					[
						"l",
						"1",
						"0"
					],
					[
						"l",
						"1",
						"1"
					],
					[
						"l",
						"0",
						"1"
					],
					["c"]
				]
			}
		]
	},
	flowchartpreparation: {
		adj: [],
		gd: [["x2", "*/ w 4 5"]],
		paths: [{
			w: 10,
			h: 10,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"5"
				],
				[
					"l",
					"2",
					"0"
				],
				[
					"l",
					"8",
					"0"
				],
				[
					"l",
					"10",
					"5"
				],
				[
					"l",
					"8",
					"10"
				],
				[
					"l",
					"2",
					"10"
				],
				["c"]
			]
		}]
	},
	flowchartprocess: {
		adj: [],
		gd: [],
		paths: [{
			w: 1,
			h: 1,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"0"
				],
				[
					"l",
					"1",
					"0"
				],
				[
					"l",
					"1",
					"1"
				],
				[
					"l",
					"0",
					"1"
				],
				["c"]
			]
		}]
	},
	flowchartpunchedcard: {
		adj: [],
		gd: [],
		paths: [{
			w: 5,
			h: 5,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"1"
				],
				[
					"l",
					"1",
					"0"
				],
				[
					"l",
					"5",
					"0"
				],
				[
					"l",
					"5",
					"5"
				],
				[
					"l",
					"0",
					"5"
				],
				["c"]
			]
		}]
	},
	flowchartpunchedtape: {
		adj: [],
		gd: [["y2", "*/ h 9 10"], ["ib", "*/ h 4 5"]],
		paths: [{
			w: 20,
			h: 20,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"0",
					"2"
				],
				[
					"a",
					"5",
					"2",
					"cd2",
					"-10800000"
				],
				[
					"a",
					"5",
					"2",
					"cd2",
					"cd2"
				],
				[
					"l",
					"20",
					"18"
				],
				[
					"a",
					"5",
					"2",
					"0",
					"-10800000"
				],
				[
					"a",
					"5",
					"2",
					"0",
					"cd2"
				],
				["c"]
			]
		}]
	},
	flowchartsort: {
		adj: [],
		gd: [["ir", "*/ w 3 4"], ["ib", "*/ h 3 4"]],
		paths: [
			{
				w: 2,
				h: 2,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"0",
						"1"
					],
					[
						"l",
						"1",
						"0"
					],
					[
						"l",
						"2",
						"1"
					],
					[
						"l",
						"1",
						"2"
					],
					["c"]
				]
			},
			{
				w: 2,
				h: 2,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [[
					"m",
					"0",
					"1"
				], [
					"l",
					"2",
					"1"
				]]
			},
			{
				w: 2,
				h: 2,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"0",
						"1"
					],
					[
						"l",
						"1",
						"0"
					],
					[
						"l",
						"2",
						"1"
					],
					[
						"l",
						"1",
						"2"
					],
					["c"]
				]
			}
		]
	},
	flowchartsummingjunction: {
		adj: [],
		gd: [
			["idx", "cos wd2 2700000"],
			["idy", "sin hd2 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"vc"
					],
					[
						"a",
						"wd2",
						"hd2",
						"cd2",
						"cd4"
					],
					[
						"a",
						"wd2",
						"hd2",
						"3cd4",
						"cd4"
					],
					[
						"a",
						"wd2",
						"hd2",
						"0",
						"cd4"
					],
					[
						"a",
						"wd2",
						"hd2",
						"cd4",
						"cd4"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"il",
						"it"
					],
					[
						"l",
						"ir",
						"ib"
					],
					[
						"m",
						"ir",
						"it"
					],
					[
						"l",
						"il",
						"ib"
					]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"vc"
					],
					[
						"a",
						"wd2",
						"hd2",
						"cd2",
						"cd4"
					],
					[
						"a",
						"wd2",
						"hd2",
						"3cd4",
						"cd4"
					],
					[
						"a",
						"wd2",
						"hd2",
						"0",
						"cd4"
					],
					[
						"a",
						"wd2",
						"hd2",
						"cd4",
						"cd4"
					],
					["c"]
				]
			}
		]
	},
	flowchartterminator: {
		adj: [],
		gd: [
			["il", "*/ w 1018 21600"],
			["ir", "*/ w 20582 21600"],
			["it", "*/ h 3163 21600"],
			["ib", "*/ h 18437 21600"]
		],
		paths: [{
			w: 21600,
			h: 21600,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"3475",
					"0"
				],
				[
					"l",
					"18125",
					"0"
				],
				[
					"a",
					"3475",
					"10800",
					"3cd4",
					"cd2"
				],
				[
					"l",
					"3475",
					"21600"
				],
				[
					"a",
					"3475",
					"10800",
					"cd4",
					"cd2"
				],
				["c"]
			]
		}]
	},
	foldedcorner: {
		adj: [["adj", "val 16667"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["dy2", "*/ ss a 100000"],
			["dy1", "*/ dy2 1 5"],
			["x1", "+- r 0 dy2"],
			["x2", "+- x1 dy1 0"],
			["y2", "+- b 0 dy2"],
			["y1", "+- y2 dy1 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"y2"
					],
					[
						"l",
						"x1",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x1",
						"b"
					],
					[
						"l",
						"x2",
						"y1"
					],
					[
						"l",
						"r",
						"y2"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x1",
						"b"
					],
					[
						"l",
						"x2",
						"y1"
					],
					[
						"l",
						"r",
						"y2"
					],
					[
						"l",
						"x1",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					[
						"l",
						"l",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"y2"
					]
				]
			}
		]
	},
	frame: {
		adj: [["adj1", "val 12500"]],
		gd: [
			["a1", "pin 0 adj1 50000"],
			["x1", "*/ ss a1 100000"],
			["x4", "+- r 0 x1"],
			["y4", "+- b 0 x1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"],
				[
					"m",
					"x1",
					"x1"
				],
				[
					"l",
					"x1",
					"y4"
				],
				[
					"l",
					"x4",
					"y4"
				],
				[
					"l",
					"x4",
					"x1"
				],
				["c"]
			]
		}]
	},
	funnel: {
		adj: [],
		gd: [
			["d", "*/ ss 1 20"],
			["rw2", "+- wd2 0 d"],
			["rh2", "+- hd4 0 d"],
			["t1", "cos wd2 480000"],
			["t2", "sin hd4 480000"],
			["da", "at2 t1 t2"],
			["2da", "*/ da 2 1"],
			["stAng1", "+- cd2 0 da"],
			["swAng1", "+- cd2 2da 0"],
			["swAng3", "+- cd2 0 2da"],
			["rw3", "*/ wd2 1 4"],
			["rh3", "*/ hd4 1 4"],
			["ct1", "cos hd4 stAng1"],
			["st1", "sin wd2 stAng1"],
			["m1", "mod ct1 st1 0"],
			["n1", "*/ wd2 hd4 m1"],
			["dx1", "cos n1 stAng1"],
			["dy1", "sin n1 stAng1"],
			["x1", "+- hc dx1 0"],
			["y1", "+- hd4 dy1 0"],
			["ct3", "cos rh3 da"],
			["st3", "sin rw3 da"],
			["m3", "mod ct3 st3 0"],
			["n3", "*/ rw3 rh3 m3"],
			["dx3", "cos n3 da"],
			["dy3", "sin n3 da"],
			["x3", "+- hc dx3 0"],
			["vc3", "+- b 0 rh3"],
			["y2", "+- vc3 dy3 0"],
			["x2", "+- wd2 0 rw2"],
			["cd", "*/ cd2 2 1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"a",
					"wd2",
					"hd4",
					"stAng1",
					"swAng1"
				],
				[
					"l",
					"x3",
					"y2"
				],
				[
					"a",
					"rw3",
					"rh3",
					"da",
					"swAng3"
				],
				["c"],
				[
					"m",
					"x2",
					"hd4"
				],
				[
					"a",
					"rw2",
					"rh2",
					"cd2",
					"-21600000"
				],
				["c"]
			]
		}]
	},
	gear6: {
		adj: [["adj1", "val 15000"], ["adj2", "val 3526"]],
		gd: [
			["a1", "pin 0 adj1 20000"],
			["a2", "pin 0 adj2 5358"],
			["th", "*/ ss a1 100000"],
			["lFD", "*/ ss a2 100000"],
			["th2", "*/ th 1 2"],
			["l2", "*/ lFD 1 2"],
			["l3", "+- th2 l2 0"],
			["rh", "+- hd2 0 th"],
			["rw", "+- wd2 0 th"],
			["dr", "+- rw 0 rh"],
			["maxr", "?: dr rh rw"],
			["ha", "at2 maxr l3"],
			["aA1", "+- 19800000 0 ha"],
			["aD1", "+- 19800000 ha 0"],
			["ta11", "cos rw aA1"],
			["ta12", "sin rh aA1"],
			["bA1", "at2 ta11 ta12"],
			["cta1", "cos rh bA1"],
			["sta1", "sin rw bA1"],
			["ma1", "mod cta1 sta1 0"],
			["na1", "*/ rw rh ma1"],
			["dxa1", "cos na1 bA1"],
			["dya1", "sin na1 bA1"],
			["xA1", "+- hc dxa1 0"],
			["yA1", "+- vc dya1 0"],
			["td11", "cos rw aD1"],
			["td12", "sin rh aD1"],
			["bD1", "at2 td11 td12"],
			["ctd1", "cos rh bD1"],
			["std1", "sin rw bD1"],
			["md1", "mod ctd1 std1 0"],
			["nd1", "*/ rw rh md1"],
			["dxd1", "cos nd1 bD1"],
			["dyd1", "sin nd1 bD1"],
			["xD1", "+- hc dxd1 0"],
			["yD1", "+- vc dyd1 0"],
			["xAD1", "+- xA1 0 xD1"],
			["yAD1", "+- yA1 0 yD1"],
			["lAD1", "mod xAD1 yAD1 0"],
			["a1", "at2 yAD1 xAD1"],
			["dxF1", "sin lFD a1"],
			["dyF1", "cos lFD a1"],
			["xF1", "+- xD1 dxF1 0"],
			["yF1", "+- yD1 dyF1 0"],
			["xE1", "+- xA1 0 dxF1"],
			["yE1", "+- yA1 0 dyF1"],
			["yC1t", "sin th a1"],
			["xC1t", "cos th a1"],
			["yC1", "+- yF1 yC1t 0"],
			["xC1", "+- xF1 0 xC1t"],
			["yB1", "+- yE1 yC1t 0"],
			["xB1", "+- xE1 0 xC1t"],
			["aD6", "+- 3cd4 ha 0"],
			["td61", "cos rw aD6"],
			["td62", "sin rh aD6"],
			["bD6", "at2 td61 td62"],
			["ctd6", "cos rh bD6"],
			["std6", "sin rw bD6"],
			["md6", "mod ctd6 std6 0"],
			["nd6", "*/ rw rh md6"],
			["dxd6", "cos nd6 bD6"],
			["dyd6", "sin nd6 bD6"],
			["xD6", "+- hc dxd6 0"],
			["yD6", "+- vc dyd6 0"],
			["xA6", "+- hc 0 dxd6"],
			["xF6", "+- xD6 0 lFD"],
			["xE6", "+- xA6 lFD 0"],
			["yC6", "+- yD6 0 th"],
			["swAng1", "+- bA1 0 bD6"],
			["aA2", "+- 1800000 0 ha"],
			["aD2", "+- 1800000 ha 0"],
			["ta21", "cos rw aA2"],
			["ta22", "sin rh aA2"],
			["bA2", "at2 ta21 ta22"],
			["yA2", "+- h 0 yD1"],
			["td21", "cos rw aD2"],
			["td22", "sin rh aD2"],
			["bD2", "at2 td21 td22"],
			["yD2", "+- h 0 yA1"],
			["yC2", "+- h 0 yB1"],
			["yB2", "+- h 0 yC1"],
			["xB2", "val xC1"],
			["swAng2", "+- bA2 0 bD1"],
			["aD3", "+- cd4 ha 0"],
			["td31", "cos rw aD3"],
			["td32", "sin rh aD3"],
			["bD3", "at2 td31 td32"],
			["yD3", "+- h 0 yD6"],
			["yB3", "+- h 0 yC6"],
			["aD4", "+- 9000000 ha 0"],
			["td41", "cos rw aD4"],
			["td42", "sin rh aD4"],
			["bD4", "at2 td41 td42"],
			["xD4", "+- w 0 xD1"],
			["xC4", "+- w 0 xC1"],
			["xB4", "+- w 0 xB1"],
			["aD5", "+- 12600000 ha 0"],
			["td51", "cos rw aD5"],
			["td52", "sin rh aD5"],
			["bD5", "at2 td51 td52"],
			["xD5", "+- w 0 xA1"],
			["xC5", "+- w 0 xB1"],
			["xB5", "+- w 0 xC1"],
			["xCxn1", "+/ xB1 xC1 2"],
			["yCxn1", "+/ yB1 yC1 2"],
			["yCxn2", "+- b 0 yCxn1"],
			["xCxn4", "+/ r 0 xCxn1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"xA1",
					"yA1"
				],
				[
					"l",
					"xB1",
					"yB1"
				],
				[
					"l",
					"xC1",
					"yC1"
				],
				[
					"l",
					"xD1",
					"yD1"
				],
				[
					"a",
					"rw",
					"rh",
					"bD1",
					"swAng2"
				],
				[
					"l",
					"xC1",
					"yB2"
				],
				[
					"l",
					"xB1",
					"yC2"
				],
				[
					"l",
					"xA1",
					"yD2"
				],
				[
					"a",
					"rw",
					"rh",
					"bD2",
					"swAng1"
				],
				[
					"l",
					"xF6",
					"yB3"
				],
				[
					"l",
					"xE6",
					"yB3"
				],
				[
					"l",
					"xA6",
					"yD3"
				],
				[
					"a",
					"rw",
					"rh",
					"bD3",
					"swAng1"
				],
				[
					"l",
					"xB4",
					"yC2"
				],
				[
					"l",
					"xC4",
					"yB2"
				],
				[
					"l",
					"xD4",
					"yA2"
				],
				[
					"a",
					"rw",
					"rh",
					"bD4",
					"swAng2"
				],
				[
					"l",
					"xB5",
					"yC1"
				],
				[
					"l",
					"xC5",
					"yB1"
				],
				[
					"l",
					"xD5",
					"yA1"
				],
				[
					"a",
					"rw",
					"rh",
					"bD5",
					"swAng1"
				],
				[
					"l",
					"xE6",
					"yC6"
				],
				[
					"l",
					"xF6",
					"yC6"
				],
				[
					"l",
					"xD6",
					"yD6"
				],
				[
					"a",
					"rw",
					"rh",
					"bD6",
					"swAng1"
				],
				["c"]
			]
		}]
	},
	gear9: {
		adj: [["adj1", "val 10000"], ["adj2", "val 1763"]],
		gd: [
			["a1", "pin 0 adj1 20000"],
			["a2", "pin 0 adj2 2679"],
			["th", "*/ ss a1 100000"],
			["lFD", "*/ ss a2 100000"],
			["th2", "*/ th 1 2"],
			["l2", "*/ lFD 1 2"],
			["l3", "+- th2 l2 0"],
			["rh", "+- hd2 0 th"],
			["rw", "+- wd2 0 th"],
			["dr", "+- rw 0 rh"],
			["maxr", "?: dr rh rw"],
			["ha", "at2 maxr l3"],
			["aA1", "+- 18600000 0 ha"],
			["aD1", "+- 18600000 ha 0"],
			["ta11", "cos rw aA1"],
			["ta12", "sin rh aA1"],
			["bA1", "at2 ta11 ta12"],
			["cta1", "cos rh bA1"],
			["sta1", "sin rw bA1"],
			["ma1", "mod cta1 sta1 0"],
			["na1", "*/ rw rh ma1"],
			["dxa1", "cos na1 bA1"],
			["dya1", "sin na1 bA1"],
			["xA1", "+- hc dxa1 0"],
			["yA1", "+- vc dya1 0"],
			["td11", "cos rw aD1"],
			["td12", "sin rh aD1"],
			["bD1", "at2 td11 td12"],
			["ctd1", "cos rh bD1"],
			["std1", "sin rw bD1"],
			["md1", "mod ctd1 std1 0"],
			["nd1", "*/ rw rh md1"],
			["dxd1", "cos nd1 bD1"],
			["dyd1", "sin nd1 bD1"],
			["xD1", "+- hc dxd1 0"],
			["yD1", "+- vc dyd1 0"],
			["xAD1", "+- xA1 0 xD1"],
			["yAD1", "+- yA1 0 yD1"],
			["lAD1", "mod xAD1 yAD1 0"],
			["a1", "at2 yAD1 xAD1"],
			["dxF1", "sin lFD a1"],
			["dyF1", "cos lFD a1"],
			["xF1", "+- xD1 dxF1 0"],
			["yF1", "+- yD1 dyF1 0"],
			["xE1", "+- xA1 0 dxF1"],
			["yE1", "+- yA1 0 dyF1"],
			["yC1t", "sin th a1"],
			["xC1t", "cos th a1"],
			["yC1", "+- yF1 yC1t 0"],
			["xC1", "+- xF1 0 xC1t"],
			["yB1", "+- yE1 yC1t 0"],
			["xB1", "+- xE1 0 xC1t"],
			["aA2", "+- 21000000 0 ha"],
			["aD2", "+- 21000000 ha 0"],
			["ta21", "cos rw aA2"],
			["ta22", "sin rh aA2"],
			["bA2", "at2 ta21 ta22"],
			["cta2", "cos rh bA2"],
			["sta2", "sin rw bA2"],
			["ma2", "mod cta2 sta2 0"],
			["na2", "*/ rw rh ma2"],
			["dxa2", "cos na2 bA2"],
			["dya2", "sin na2 bA2"],
			["xA2", "+- hc dxa2 0"],
			["yA2", "+- vc dya2 0"],
			["td21", "cos rw aD2"],
			["td22", "sin rh aD2"],
			["bD2", "at2 td21 td22"],
			["ctd2", "cos rh bD2"],
			["std2", "sin rw bD2"],
			["md2", "mod ctd2 std2 0"],
			["nd2", "*/ rw rh md2"],
			["dxd2", "cos nd2 bD2"],
			["dyd2", "sin nd2 bD2"],
			["xD2", "+- hc dxd2 0"],
			["yD2", "+- vc dyd2 0"],
			["xAD2", "+- xA2 0 xD2"],
			["yAD2", "+- yA2 0 yD2"],
			["lAD2", "mod xAD2 yAD2 0"],
			["a2", "at2 yAD2 xAD2"],
			["dxF2", "sin lFD a2"],
			["dyF2", "cos lFD a2"],
			["xF2", "+- xD2 dxF2 0"],
			["yF2", "+- yD2 dyF2 0"],
			["xE2", "+- xA2 0 dxF2"],
			["yE2", "+- yA2 0 dyF2"],
			["yC2t", "sin th a2"],
			["xC2t", "cos th a2"],
			["yC2", "+- yF2 yC2t 0"],
			["xC2", "+- xF2 0 xC2t"],
			["yB2", "+- yE2 yC2t 0"],
			["xB2", "+- xE2 0 xC2t"],
			["swAng1", "+- bA2 0 bD1"],
			["aA3", "+- 1800000 0 ha"],
			["aD3", "+- 1800000 ha 0"],
			["ta31", "cos rw aA3"],
			["ta32", "sin rh aA3"],
			["bA3", "at2 ta31 ta32"],
			["cta3", "cos rh bA3"],
			["sta3", "sin rw bA3"],
			["ma3", "mod cta3 sta3 0"],
			["na3", "*/ rw rh ma3"],
			["dxa3", "cos na3 bA3"],
			["dya3", "sin na3 bA3"],
			["xA3", "+- hc dxa3 0"],
			["yA3", "+- vc dya3 0"],
			["td31", "cos rw aD3"],
			["td32", "sin rh aD3"],
			["bD3", "at2 td31 td32"],
			["ctd3", "cos rh bD3"],
			["std3", "sin rw bD3"],
			["md3", "mod ctd3 std3 0"],
			["nd3", "*/ rw rh md3"],
			["dxd3", "cos nd3 bD3"],
			["dyd3", "sin nd3 bD3"],
			["xD3", "+- hc dxd3 0"],
			["yD3", "+- vc dyd3 0"],
			["xAD3", "+- xA3 0 xD3"],
			["yAD3", "+- yA3 0 yD3"],
			["lAD3", "mod xAD3 yAD3 0"],
			["a3", "at2 yAD3 xAD3"],
			["dxF3", "sin lFD a3"],
			["dyF3", "cos lFD a3"],
			["xF3", "+- xD3 dxF3 0"],
			["yF3", "+- yD3 dyF3 0"],
			["xE3", "+- xA3 0 dxF3"],
			["yE3", "+- yA3 0 dyF3"],
			["yC3t", "sin th a3"],
			["xC3t", "cos th a3"],
			["yC3", "+- yF3 yC3t 0"],
			["xC3", "+- xF3 0 xC3t"],
			["yB3", "+- yE3 yC3t 0"],
			["xB3", "+- xE3 0 xC3t"],
			["swAng2", "+- bA3 0 bD2"],
			["aA4", "+- 4200000 0 ha"],
			["aD4", "+- 4200000 ha 0"],
			["ta41", "cos rw aA4"],
			["ta42", "sin rh aA4"],
			["bA4", "at2 ta41 ta42"],
			["cta4", "cos rh bA4"],
			["sta4", "sin rw bA4"],
			["ma4", "mod cta4 sta4 0"],
			["na4", "*/ rw rh ma4"],
			["dxa4", "cos na4 bA4"],
			["dya4", "sin na4 bA4"],
			["xA4", "+- hc dxa4 0"],
			["yA4", "+- vc dya4 0"],
			["td41", "cos rw aD4"],
			["td42", "sin rh aD4"],
			["bD4", "at2 td41 td42"],
			["ctd4", "cos rh bD4"],
			["std4", "sin rw bD4"],
			["md4", "mod ctd4 std4 0"],
			["nd4", "*/ rw rh md4"],
			["dxd4", "cos nd4 bD4"],
			["dyd4", "sin nd4 bD4"],
			["xD4", "+- hc dxd4 0"],
			["yD4", "+- vc dyd4 0"],
			["xAD4", "+- xA4 0 xD4"],
			["yAD4", "+- yA4 0 yD4"],
			["lAD4", "mod xAD4 yAD4 0"],
			["a4", "at2 yAD4 xAD4"],
			["dxF4", "sin lFD a4"],
			["dyF4", "cos lFD a4"],
			["xF4", "+- xD4 dxF4 0"],
			["yF4", "+- yD4 dyF4 0"],
			["xE4", "+- xA4 0 dxF4"],
			["yE4", "+- yA4 0 dyF4"],
			["yC4t", "sin th a4"],
			["xC4t", "cos th a4"],
			["yC4", "+- yF4 yC4t 0"],
			["xC4", "+- xF4 0 xC4t"],
			["yB4", "+- yE4 yC4t 0"],
			["xB4", "+- xE4 0 xC4t"],
			["swAng3", "+- bA4 0 bD3"],
			["aA5", "+- 6600000 0 ha"],
			["aD5", "+- 6600000 ha 0"],
			["ta51", "cos rw aA5"],
			["ta52", "sin rh aA5"],
			["bA5", "at2 ta51 ta52"],
			["td51", "cos rw aD5"],
			["td52", "sin rh aD5"],
			["bD5", "at2 td51 td52"],
			["xD5", "+- w 0 xA4"],
			["xC5", "+- w 0 xB4"],
			["xB5", "+- w 0 xC4"],
			["swAng4", "+- bA5 0 bD4"],
			["aD6", "+- 9000000 ha 0"],
			["td61", "cos rw aD6"],
			["td62", "sin rh aD6"],
			["bD6", "at2 td61 td62"],
			["xD6", "+- w 0 xA3"],
			["xC6", "+- w 0 xB3"],
			["xB6", "+- w 0 xC3"],
			["aD7", "+- 11400000 ha 0"],
			["td71", "cos rw aD7"],
			["td72", "sin rh aD7"],
			["bD7", "at2 td71 td72"],
			["xD7", "+- w 0 xA2"],
			["xC7", "+- w 0 xB2"],
			["xB7", "+- w 0 xC2"],
			["aD8", "+- 13800000 ha 0"],
			["td81", "cos rw aD8"],
			["td82", "sin rh aD8"],
			["bD8", "at2 td81 td82"],
			["xA8", "+- w 0 xD1"],
			["xD8", "+- w 0 xA1"],
			["xC8", "+- w 0 xB1"],
			["xB8", "+- w 0 xC1"],
			["aA9", "+- 3cd4 0 ha"],
			["aD9", "+- 3cd4 ha 0"],
			["td91", "cos rw aD9"],
			["td92", "sin rh aD9"],
			["bD9", "at2 td91 td92"],
			["ctd9", "cos rh bD9"],
			["std9", "sin rw bD9"],
			["md9", "mod ctd9 std9 0"],
			["nd9", "*/ rw rh md9"],
			["dxd9", "cos nd9 bD9"],
			["dyd9", "sin nd9 bD9"],
			["xD9", "+- hc dxd9 0"],
			["yD9", "+- vc dyd9 0"],
			["ta91", "cos rw aA9"],
			["ta92", "sin rh aA9"],
			["bA9", "at2 ta91 ta92"],
			["xA9", "+- hc 0 dxd9"],
			["xF9", "+- xD9 0 lFD"],
			["xE9", "+- xA9 lFD 0"],
			["yC9", "+- yD9 0 th"],
			["swAng5", "+- bA9 0 bD8"],
			["xCxn1", "+/ xB1 xC1 2"],
			["yCxn1", "+/ yB1 yC1 2"],
			["xCxn2", "+/ xB2 xC2 2"],
			["yCxn2", "+/ yB2 yC2 2"],
			["xCxn3", "+/ xB3 xC3 2"],
			["yCxn3", "+/ yB3 yC3 2"],
			["xCxn4", "+/ xB4 xC4 2"],
			["yCxn4", "+/ yB4 yC4 2"],
			["xCxn5", "+/ r 0 xCxn4"],
			["xCxn6", "+/ r 0 xCxn3"],
			["xCxn7", "+/ r 0 xCxn2"],
			["xCxn8", "+/ r 0 xCxn1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"xA1",
					"yA1"
				],
				[
					"l",
					"xB1",
					"yB1"
				],
				[
					"l",
					"xC1",
					"yC1"
				],
				[
					"l",
					"xD1",
					"yD1"
				],
				[
					"a",
					"rw",
					"rh",
					"bD1",
					"swAng1"
				],
				[
					"l",
					"xB2",
					"yB2"
				],
				[
					"l",
					"xC2",
					"yC2"
				],
				[
					"l",
					"xD2",
					"yD2"
				],
				[
					"a",
					"rw",
					"rh",
					"bD2",
					"swAng2"
				],
				[
					"l",
					"xB3",
					"yB3"
				],
				[
					"l",
					"xC3",
					"yC3"
				],
				[
					"l",
					"xD3",
					"yD3"
				],
				[
					"a",
					"rw",
					"rh",
					"bD3",
					"swAng3"
				],
				[
					"l",
					"xB4",
					"yB4"
				],
				[
					"l",
					"xC4",
					"yC4"
				],
				[
					"l",
					"xD4",
					"yD4"
				],
				[
					"a",
					"rw",
					"rh",
					"bD4",
					"swAng4"
				],
				[
					"l",
					"xB5",
					"yC4"
				],
				[
					"l",
					"xC5",
					"yB4"
				],
				[
					"l",
					"xD5",
					"yA4"
				],
				[
					"a",
					"rw",
					"rh",
					"bD5",
					"swAng3"
				],
				[
					"l",
					"xB6",
					"yC3"
				],
				[
					"l",
					"xC6",
					"yB3"
				],
				[
					"l",
					"xD6",
					"yA3"
				],
				[
					"a",
					"rw",
					"rh",
					"bD6",
					"swAng2"
				],
				[
					"l",
					"xB7",
					"yC2"
				],
				[
					"l",
					"xC7",
					"yB2"
				],
				[
					"l",
					"xD7",
					"yA2"
				],
				[
					"a",
					"rw",
					"rh",
					"bD7",
					"swAng1"
				],
				[
					"l",
					"xB8",
					"yC1"
				],
				[
					"l",
					"xC8",
					"yB1"
				],
				[
					"l",
					"xD8",
					"yA1"
				],
				[
					"a",
					"rw",
					"rh",
					"bD8",
					"swAng5"
				],
				[
					"l",
					"xE9",
					"yC9"
				],
				[
					"l",
					"xF9",
					"yC9"
				],
				[
					"l",
					"xD9",
					"yD9"
				],
				[
					"a",
					"rw",
					"rh",
					"bD9",
					"swAng5"
				],
				["c"]
			]
		}]
	},
	halfframe: {
		adj: [["adj1", "val 33333"], ["adj2", "val 33333"]],
		gd: [
			["maxAdj2", "*/ 100000 w ss"],
			["a2", "pin 0 adj2 maxAdj2"],
			["x1", "*/ ss a2 100000"],
			["g1", "*/ h x1 w"],
			["g2", "+- h 0 g1"],
			["maxAdj1", "*/ 100000 g2 ss"],
			["a1", "pin 0 adj1 maxAdj1"],
			["y1", "*/ ss a1 100000"],
			["dx2", "*/ y1 w h"],
			["x2", "+- r 0 dx2"],
			["dy2", "*/ x1 h w"],
			["y2", "+- b 0 dy2"],
			["cx1", "*/ x1 1 2"],
			["cy1", "+/ y2 b 2"],
			["cx2", "+/ x2 r 2"],
			["cy2", "*/ y1 1 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"x1",
					"y1"
				],
				[
					"l",
					"x1",
					"y2"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}]
	},
	heart: {
		adj: [],
		gd: [
			["dx1", "*/ w 49 48"],
			["dx2", "*/ w 10 48"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc dx2 0"],
			["x4", "+- hc dx1 0"],
			["y1", "+- t 0 hd3"],
			["il", "*/ w 1 6"],
			["ir", "*/ w 5 6"],
			["ib", "*/ h 2 3"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"hc",
					"hd4"
				],
				[
					"C",
					"x3",
					"y1",
					"x4",
					"hd4",
					"hc",
					"b"
				],
				[
					"C",
					"x1",
					"hd4",
					"x2",
					"y1",
					"hc",
					"hd4"
				],
				["c"]
			]
		}]
	},
	heptagon: {
		adj: [["hf", "val 102572"], ["vf", "val 105210"]],
		gd: [
			["swd2", "*/ wd2 hf 100000"],
			["shd2", "*/ hd2 vf 100000"],
			["svc", "*/ vc  vf 100000"],
			["dx1", "*/ swd2 97493 100000"],
			["dx2", "*/ swd2 78183 100000"],
			["dx3", "*/ swd2 43388 100000"],
			["dy1", "*/ shd2 62349 100000"],
			["dy2", "*/ shd2 22252 100000"],
			["dy3", "*/ shd2 90097 100000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc 0 dx3"],
			["x4", "+- hc dx3 0"],
			["x5", "+- hc dx2 0"],
			["x6", "+- hc dx1 0"],
			["y1", "+- svc 0 dy1"],
			["y2", "+- svc dy2 0"],
			["y3", "+- svc dy3 0"],
			["ib", "+- b 0 y1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"y2"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"x5",
					"y1"
				],
				[
					"l",
					"x6",
					"y2"
				],
				[
					"l",
					"x4",
					"y3"
				],
				[
					"l",
					"x3",
					"y3"
				],
				["c"]
			]
		}]
	},
	hexagon: {
		adj: [["adj", "val 25000"], ["vf", "val 115470"]],
		gd: [
			["maxAdj", "*/ 50000 w ss"],
			["a", "pin 0 adj maxAdj"],
			["shd2", "*/ hd2 vf 100000"],
			["x1", "*/ ss a 100000"],
			["x2", "+- r 0 x1"],
			["dy1", "sin shd2 3600000"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc dy1 0"],
			["q1", "*/ maxAdj -1 2"],
			["q2", "+- a q1 0"],
			["q3", "?: q2 4 2"],
			["q4", "?: q2 3 2"],
			["q5", "?: q2 q1 0"],
			["q6", "+/ a q5 q1"],
			["q7", "*/ q6 q4 -1"],
			["q8", "+- q3 q7 0"],
			["il", "*/ w q8 24"],
			["it", "*/ h q8 24"],
			["ir", "+- r 0 il"],
			["ib", "+- b 0 it"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"x1",
					"y1"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x1",
					"y2"
				],
				["c"]
			]
		}]
	},
	homeplate: {
		adj: [["adj", "val 50000"]],
		gd: [
			["maxAdj", "*/ 100000 w ss"],
			["a", "pin 0 adj maxAdj"],
			["dx1", "*/ ss a 100000"],
			["x1", "+- r 0 dx1"],
			["ir", "+/ x1 r 2"],
			["x2", "*/ x1 1 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"x1",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}]
	},
	horizontalscroll: {
		adj: [["adj", "val 12500"]],
		gd: [
			["a", "pin 0 adj 25000"],
			["ch", "*/ ss a 100000"],
			["ch2", "*/ ch 1 2"],
			["ch4", "*/ ch 1 4"],
			["y3", "+- ch ch2 0"],
			["y4", "+- ch ch 0"],
			["y6", "+- b 0 ch"],
			["y7", "+- b 0 ch2"],
			["y5", "+- y6 0 ch2"],
			["x3", "+- r 0 ch"],
			["x4", "+- r 0 ch2"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"r",
						"ch2"
					],
					[
						"a",
						"ch2",
						"ch2",
						"0",
						"cd4"
					],
					[
						"l",
						"x4",
						"ch2"
					],
					[
						"a",
						"ch4",
						"ch4",
						"0",
						"cd2"
					],
					[
						"l",
						"x3",
						"ch"
					],
					[
						"l",
						"ch2",
						"ch"
					],
					[
						"a",
						"ch2",
						"ch2",
						"3cd4",
						"-5400000"
					],
					[
						"l",
						"l",
						"y7"
					],
					[
						"a",
						"ch2",
						"ch2",
						"cd2",
						"-10800000"
					],
					[
						"l",
						"ch",
						"y6"
					],
					[
						"l",
						"x4",
						"y6"
					],
					[
						"a",
						"ch2",
						"ch2",
						"cd4",
						"-5400000"
					],
					["c"],
					[
						"m",
						"ch2",
						"y4"
					],
					[
						"a",
						"ch2",
						"ch2",
						"cd4",
						"-5400000"
					],
					[
						"a",
						"ch4",
						"ch4",
						"0",
						"-10800000"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"ch2",
						"y4"
					],
					[
						"a",
						"ch2",
						"ch2",
						"cd4",
						"-5400000"
					],
					[
						"a",
						"ch4",
						"ch4",
						"0",
						"-10800000"
					],
					["c"],
					[
						"m",
						"x4",
						"ch"
					],
					[
						"a",
						"ch2",
						"ch2",
						"cd4",
						"-16200000"
					],
					[
						"a",
						"ch4",
						"ch4",
						"cd2",
						"-10800000"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"y3"
					],
					[
						"a",
						"ch2",
						"ch2",
						"cd2",
						"cd4"
					],
					[
						"l",
						"x3",
						"ch"
					],
					[
						"l",
						"x3",
						"ch2"
					],
					[
						"a",
						"ch2",
						"ch2",
						"cd2",
						"cd2"
					],
					[
						"l",
						"r",
						"y5"
					],
					[
						"a",
						"ch2",
						"ch2",
						"0",
						"cd4"
					],
					[
						"l",
						"ch",
						"y6"
					],
					[
						"l",
						"ch",
						"y7"
					],
					[
						"a",
						"ch2",
						"ch2",
						"0",
						"cd2"
					],
					["c"],
					[
						"m",
						"x3",
						"ch"
					],
					[
						"l",
						"x4",
						"ch"
					],
					[
						"a",
						"ch2",
						"ch2",
						"cd4",
						"-5400000"
					],
					[
						"m",
						"x4",
						"ch"
					],
					[
						"l",
						"x4",
						"ch2"
					],
					[
						"a",
						"ch4",
						"ch4",
						"0",
						"cd2"
					],
					[
						"m",
						"ch2",
						"y4"
					],
					[
						"l",
						"ch2",
						"y3"
					],
					[
						"a",
						"ch4",
						"ch4",
						"cd2",
						"cd2"
					],
					[
						"a",
						"ch2",
						"ch2",
						"0",
						"cd2"
					],
					[
						"m",
						"ch",
						"y3"
					],
					[
						"l",
						"ch",
						"y6"
					]
				]
			}
		]
	},
	irregularseal1: {
		adj: [],
		gd: [
			["x5", "*/ w 4627 21600"],
			["x12", "*/ w 8485 21600"],
			["x21", "*/ w 16702 21600"],
			["x24", "*/ w 14522 21600"],
			["y3", "*/ h 6320 21600"],
			["y6", "*/ h 8615 21600"],
			["y9", "*/ h 13937 21600"],
			["y18", "*/ h 13290 21600"]
		],
		paths: [{
			w: 21600,
			h: 21600,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"10800",
					"5800"
				],
				[
					"l",
					"14522",
					"0"
				],
				[
					"l",
					"14155",
					"5325"
				],
				[
					"l",
					"18380",
					"4457"
				],
				[
					"l",
					"16702",
					"7315"
				],
				[
					"l",
					"21097",
					"8137"
				],
				[
					"l",
					"17607",
					"10475"
				],
				[
					"l",
					"21600",
					"13290"
				],
				[
					"l",
					"16837",
					"12942"
				],
				[
					"l",
					"18145",
					"18095"
				],
				[
					"l",
					"14020",
					"14457"
				],
				[
					"l",
					"13247",
					"19737"
				],
				[
					"l",
					"10532",
					"14935"
				],
				[
					"l",
					"8485",
					"21600"
				],
				[
					"l",
					"7715",
					"15627"
				],
				[
					"l",
					"4762",
					"17617"
				],
				[
					"l",
					"5667",
					"13937"
				],
				[
					"l",
					"135",
					"14587"
				],
				[
					"l",
					"3722",
					"11775"
				],
				[
					"l",
					"0",
					"8615"
				],
				[
					"l",
					"4627",
					"7617"
				],
				[
					"l",
					"370",
					"2295"
				],
				[
					"l",
					"7312",
					"6320"
				],
				[
					"l",
					"8352",
					"2295"
				],
				["c"]
			]
		}]
	},
	irregularseal2: {
		adj: [],
		gd: [
			["x2", "*/ w 9722 21600"],
			["x5", "*/ w 5372 21600"],
			["x16", "*/ w 11612 21600"],
			["x19", "*/ w 14640 21600"],
			["y2", "*/ h 1887 21600"],
			["y3", "*/ h 6382 21600"],
			["y8", "*/ h 12877 21600"],
			["y14", "*/ h 19712 21600"],
			["y16", "*/ h 18842 21600"],
			["y17", "*/ h 15935 21600"],
			["y24", "*/ h 6645 21600"]
		],
		paths: [{
			w: 21600,
			h: 21600,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"11462",
					"4342"
				],
				[
					"l",
					"14790",
					"0"
				],
				[
					"l",
					"14525",
					"5777"
				],
				[
					"l",
					"18007",
					"3172"
				],
				[
					"l",
					"16380",
					"6532"
				],
				[
					"l",
					"21600",
					"6645"
				],
				[
					"l",
					"16985",
					"9402"
				],
				[
					"l",
					"18270",
					"11290"
				],
				[
					"l",
					"16380",
					"12310"
				],
				[
					"l",
					"18877",
					"15632"
				],
				[
					"l",
					"14640",
					"14350"
				],
				[
					"l",
					"14942",
					"17370"
				],
				[
					"l",
					"12180",
					"15935"
				],
				[
					"l",
					"11612",
					"18842"
				],
				[
					"l",
					"9872",
					"17370"
				],
				[
					"l",
					"8700",
					"19712"
				],
				[
					"l",
					"7527",
					"18125"
				],
				[
					"l",
					"4917",
					"21600"
				],
				[
					"l",
					"4805",
					"18240"
				],
				[
					"l",
					"1285",
					"17825"
				],
				[
					"l",
					"3330",
					"15370"
				],
				[
					"l",
					"0",
					"12877"
				],
				[
					"l",
					"3935",
					"11592"
				],
				[
					"l",
					"1172",
					"8270"
				],
				[
					"l",
					"5372",
					"7817"
				],
				[
					"l",
					"4502",
					"3625"
				],
				[
					"l",
					"8550",
					"6382"
				],
				[
					"l",
					"9722",
					"1887"
				],
				["c"]
			]
		}]
	},
	leftarrow: {
		adj: [["adj1", "val 50000"], ["adj2", "val 50000"]],
		gd: [
			["maxAdj2", "*/ 100000 w ss"],
			["a1", "pin 0 adj1 100000"],
			["a2", "pin 0 adj2 maxAdj2"],
			["dx2", "*/ ss a2 100000"],
			["x2", "+- l dx2 0"],
			["dy1", "*/ h a1 200000"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc dy1 0"],
			["dx1", "*/ y1 dx2 hd2"],
			["x1", "+- x2  0 dx1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"r",
					"y1"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x2",
					"b"
				],
				["c"]
			]
		}]
	},
	leftarrowcallout: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 25000"],
			["adj3", "val 25000"],
			["adj4", "val 64977"]
		],
		gd: [
			["maxAdj2", "*/ 50000 h ss"],
			["a2", "pin 0 adj2 maxAdj2"],
			["maxAdj1", "*/ a2 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["maxAdj3", "*/ 100000 w ss"],
			["a3", "pin 0 adj3 maxAdj3"],
			["q2", "*/ a3 ss w"],
			["maxAdj4", "+- 100000 0 q2"],
			["a4", "pin 0 adj4 maxAdj4"],
			["dy1", "*/ ss a2 100000"],
			["dy2", "*/ ss a1 200000"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc 0 dy2"],
			["y3", "+- vc dy2 0"],
			["y4", "+- vc dy1 0"],
			["x1", "*/ ss a3 100000"],
			["dx2", "*/ w a4 100000"],
			["x2", "+- r 0 dx2"],
			["x3", "+/ x2 r 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"x1",
					"y1"
				],
				[
					"l",
					"x1",
					"y2"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"x2",
					"b"
				],
				[
					"l",
					"x2",
					"y3"
				],
				[
					"l",
					"x1",
					"y3"
				],
				[
					"l",
					"x1",
					"y4"
				],
				["c"]
			]
		}]
	},
	leftbrace: {
		adj: [["adj1", "val 8333"], ["adj2", "val 50000"]],
		gd: [
			["a2", "pin 0 adj2 100000"],
			["q1", "+- 100000 0 a2"],
			["q2", "min q1 a2"],
			["q3", "*/ q2 1 2"],
			["maxAdj1", "*/ q3 h ss"],
			["a1", "pin 0 adj1 maxAdj1"],
			["y1", "*/ ss a1 100000"],
			["y3", "*/ h a2 100000"],
			["y4", "+- y3 y1 0"],
			["dx1", "cos wd2 2700000"],
			["dy1", "sin y1 2700000"],
			["il", "+- r 0 dx1"],
			["it", "+- y1 0 dy1"],
			["ib", "+- b dy1 y1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !1,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"r",
					"b"
				],
				[
					"a",
					"wd2",
					"y1",
					"cd4",
					"cd4"
				],
				[
					"l",
					"hc",
					"y4"
				],
				[
					"a",
					"wd2",
					"y1",
					"0",
					"-5400000"
				],
				[
					"a",
					"wd2",
					"y1",
					"cd4",
					"-5400000"
				],
				[
					"l",
					"hc",
					"y1"
				],
				[
					"a",
					"wd2",
					"y1",
					"cd2",
					"cd4"
				],
				["c"]
			]
		}, {
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"r",
					"b"
				],
				[
					"a",
					"wd2",
					"y1",
					"cd4",
					"cd4"
				],
				[
					"l",
					"hc",
					"y4"
				],
				[
					"a",
					"wd2",
					"y1",
					"0",
					"-5400000"
				],
				[
					"a",
					"wd2",
					"y1",
					"cd4",
					"-5400000"
				],
				[
					"l",
					"hc",
					"y1"
				],
				[
					"a",
					"wd2",
					"y1",
					"cd2",
					"cd4"
				]
			]
		}]
	},
	leftbracket: {
		adj: [["adj", "val 8333"]],
		gd: [
			["maxAdj", "*/ 50000 h ss"],
			["a", "pin 0 adj maxAdj"],
			["y1", "*/ ss a 100000"],
			["y2", "+- b 0 y1"],
			["dx1", "cos w 2700000"],
			["dy1", "sin y1 2700000"],
			["il", "+- r 0 dx1"],
			["it", "+- y1 0 dy1"],
			["ib", "+- b dy1 y1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !1,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"r",
					"b"
				],
				[
					"a",
					"w",
					"y1",
					"cd4",
					"cd4"
				],
				[
					"l",
					"l",
					"y1"
				],
				[
					"a",
					"w",
					"y1",
					"cd2",
					"cd4"
				],
				["c"]
			]
		}, {
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"r",
					"b"
				],
				[
					"a",
					"w",
					"y1",
					"cd4",
					"cd4"
				],
				[
					"l",
					"l",
					"y1"
				],
				[
					"a",
					"w",
					"y1",
					"cd2",
					"cd4"
				]
			]
		}]
	},
	leftcirculararrow: {
		adj: [
			["adj1", "val 12500"],
			["adj2", "val -1142319"],
			["adj3", "val 1142319"],
			["adj4", "val 10800000"],
			["adj5", "val 12500"]
		],
		gd: [
			["a5", "pin 0 adj5 25000"],
			["maxAdj1", "*/ a5 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["enAng", "pin 1 adj3 21599999"],
			["stAng", "pin 0 adj4 21599999"],
			["th", "*/ ss a1 100000"],
			["thh", "*/ ss a5 100000"],
			["th2", "*/ th 1 2"],
			["rw1", "+- wd2 th2 thh"],
			["rh1", "+- hd2 th2 thh"],
			["rw2", "+- rw1 0 th"],
			["rh2", "+- rh1 0 th"],
			["rw3", "+- rw2 th2 0"],
			["rh3", "+- rh2 th2 0"],
			["wtH", "sin rw3 enAng"],
			["htH", "cos rh3 enAng"],
			["dxH", "cat2 rw3 htH wtH"],
			["dyH", "sat2 rh3 htH wtH"],
			["xH", "+- hc dxH 0"],
			["yH", "+- vc dyH 0"],
			["rI", "min rw2 rh2"],
			["u1", "*/ dxH dxH 1"],
			["u2", "*/ dyH dyH 1"],
			["u3", "*/ rI rI 1"],
			["u4", "+- u1 0 u3"],
			["u5", "+- u2 0 u3"],
			["u6", "*/ u4 u5 u1"],
			["u7", "*/ u6 1 u2"],
			["u8", "+- 1 0 u7"],
			["u9", "sqrt u8"],
			["u10", "*/ u4 1 dxH"],
			["u11", "*/ u10 1 dyH"],
			["u12", "+/ 1 u9 u11"],
			["u13", "at2 1 u12"],
			["u14", "+- u13 21600000 0"],
			["u15", "?: u13 u13 u14"],
			["u16", "+- u15 0 enAng"],
			["u17", "+- u16 21600000 0"],
			["u18", "?: u16 u16 u17"],
			["u19", "+- u18 0 cd2"],
			["u20", "+- u18 0 21600000"],
			["u21", "?: u19 u20 u18"],
			["u22", "abs u21"],
			["minAng", "*/ u22 -1 1"],
			["u23", "abs adj2"],
			["a2", "*/ u23 -1 1"],
			["aAng", "pin minAng a2 0"],
			["ptAng", "+- enAng aAng 0"],
			["wtA", "sin rw3 ptAng"],
			["htA", "cos rh3 ptAng"],
			["dxA", "cat2 rw3 htA wtA"],
			["dyA", "sat2 rh3 htA wtA"],
			["xA", "+- hc dxA 0"],
			["yA", "+- vc dyA 0"],
			["wtE", "sin rw1 stAng"],
			["htE", "cos rh1 stAng"],
			["dxE", "cat2 rw1 htE wtE"],
			["dyE", "sat2 rh1 htE wtE"],
			["xE", "+- hc dxE 0"],
			["yE", "+- vc dyE 0"],
			["wtD", "sin rw2 stAng"],
			["htD", "cos rh2 stAng"],
			["dxD", "cat2 rw2 htD wtD"],
			["dyD", "sat2 rh2 htD wtD"],
			["xD", "+- hc dxD 0"],
			["yD", "+- vc dyD 0"],
			["dxG", "cos thh ptAng"],
			["dyG", "sin thh ptAng"],
			["xG", "+- xH dxG 0"],
			["yG", "+- yH dyG 0"],
			["dxB", "cos thh ptAng"],
			["dyB", "sin thh ptAng"],
			["xB", "+- xH 0 dxB 0"],
			["yB", "+- yH 0 dyB 0"],
			["sx1", "+- xB 0 hc"],
			["sy1", "+- yB 0 vc"],
			["sx2", "+- xG 0 hc"],
			["sy2", "+- yG 0 vc"],
			["rO", "min rw1 rh1"],
			["x1O", "*/ sx1 rO rw1"],
			["y1O", "*/ sy1 rO rh1"],
			["x2O", "*/ sx2 rO rw1"],
			["y2O", "*/ sy2 rO rh1"],
			["dxO", "+- x2O 0 x1O"],
			["dyO", "+- y2O 0 y1O"],
			["dO", "mod dxO dyO 0"],
			["q1", "*/ x1O y2O 1"],
			["q2", "*/ x2O y1O 1"],
			["DO", "+- q1 0 q2"],
			["q3", "*/ rO rO 1"],
			["q4", "*/ dO dO 1"],
			["q5", "*/ q3 q4 1"],
			["q6", "*/ DO DO 1"],
			["q7", "+- q5 0 q6"],
			["q8", "max q7 0"],
			["sdelO", "sqrt q8"],
			["ndyO", "*/ dyO -1 1"],
			["sdyO", "?: ndyO -1 1"],
			["q9", "*/ sdyO dxO 1"],
			["q10", "*/ q9 sdelO 1"],
			["q11", "*/ DO dyO 1"],
			["dxF1", "+/ q11 q10 q4"],
			["q12", "+- q11 0 q10"],
			["dxF2", "*/ q12 1 q4"],
			["adyO", "abs dyO"],
			["q13", "*/ adyO sdelO 1"],
			["q14", "*/ DO dxO -1"],
			["dyF1", "+/ q14 q13 q4"],
			["q15", "+- q14 0 q13"],
			["dyF2", "*/ q15 1 q4"],
			["q16", "+- x2O 0 dxF1"],
			["q17", "+- x2O 0 dxF2"],
			["q18", "+- y2O 0 dyF1"],
			["q19", "+- y2O 0 dyF2"],
			["q20", "mod q16 q18 0"],
			["q21", "mod q17 q19 0"],
			["q22", "+- q21 0 q20"],
			["dxF", "?: q22 dxF1 dxF2"],
			["dyF", "?: q22 dyF1 dyF2"],
			["sdxF", "*/ dxF rw1 rO"],
			["sdyF", "*/ dyF rh1 rO"],
			["xF", "+- hc sdxF 0"],
			["yF", "+- vc sdyF 0"],
			["x1I", "*/ sx1 rI rw2"],
			["y1I", "*/ sy1 rI rh2"],
			["x2I", "*/ sx2 rI rw2"],
			["y2I", "*/ sy2 rI rh2"],
			["dxI", "+- x2I 0 x1I"],
			["dyI", "+- y2I 0 y1I"],
			["dI", "mod dxI dyI 0"],
			["v1", "*/ x1I y2I 1"],
			["v2", "*/ x2I y1I 1"],
			["DI", "+- v1 0 v2"],
			["v3", "*/ rI rI 1"],
			["v4", "*/ dI dI 1"],
			["v5", "*/ v3 v4 1"],
			["v6", "*/ DI DI 1"],
			["v7", "+- v5 0 v6"],
			["v8", "max v7 0"],
			["sdelI", "sqrt v8"],
			["v9", "*/ sdyO dxI 1"],
			["v10", "*/ v9 sdelI 1"],
			["v11", "*/ DI dyI 1"],
			["dxC1", "+/ v11 v10 v4"],
			["v12", "+- v11 0 v10"],
			["dxC2", "*/ v12 1 v4"],
			["adyI", "abs dyI"],
			["v13", "*/ adyI sdelI 1"],
			["v14", "*/ DI dxI -1"],
			["dyC1", "+/ v14 v13 v4"],
			["v15", "+- v14 0 v13"],
			["dyC2", "*/ v15 1 v4"],
			["v16", "+- x1I 0 dxC1"],
			["v17", "+- x1I 0 dxC2"],
			["v18", "+- y1I 0 dyC1"],
			["v19", "+- y1I 0 dyC2"],
			["v20", "mod v16 v18 0"],
			["v21", "mod v17 v19 0"],
			["v22", "+- v21 0 v20"],
			["dxC", "?: v22 dxC1 dxC2"],
			["dyC", "?: v22 dyC1 dyC2"],
			["sdxC", "*/ dxC rw2 rI"],
			["sdyC", "*/ dyC rh2 rI"],
			["xC", "+- hc sdxC 0"],
			["yC", "+- vc sdyC 0"],
			["ist0", "at2 sdxC sdyC"],
			["ist1", "+- ist0 21600000 0"],
			["istAng0", "?: ist0 ist0 ist1"],
			["isw1", "+- stAng 0 istAng0"],
			["isw2", "+- isw1 21600000 0"],
			["iswAng0", "?: isw1 isw1 isw2"],
			["istAng", "+- istAng0 iswAng0 0"],
			["iswAng", "+- 0 0 iswAng0"],
			["p1", "+- xF 0 xC"],
			["p2", "+- yF 0 yC"],
			["p3", "mod p1 p2 0"],
			["p4", "*/ p3 1 2"],
			["p5", "+- p4 0 thh"],
			["xGp", "?: p5 xF xG"],
			["yGp", "?: p5 yF yG"],
			["xBp", "?: p5 xC xB"],
			["yBp", "?: p5 yC yB"],
			["en0", "at2 sdxF sdyF"],
			["en1", "+- en0 21600000 0"],
			["en2", "?: en0 en0 en1"],
			["sw0", "+- en2 0 stAng"],
			["sw1", "+- sw0 0 21600000"],
			["swAng", "?: sw0 sw1 sw0"],
			["stAng0", "+- stAng swAng 0"],
			["swAng0", "+- 0 0 swAng"],
			["wtI", "sin rw3 stAng"],
			["htI", "cos rh3 stAng"],
			["dxI", "cat2 rw3 htI wtI"],
			["dyI", "sat2 rh3 htI wtI"],
			["xI", "+- hc dxI 0"],
			["yI", "+- vc dyI 0"],
			["aI", "+- stAng cd4 0"],
			["aA", "+- ptAng 0 cd4"],
			["aB", "+- ptAng cd2 0"],
			["idx", "cos rw1 2700000"],
			["idy", "sin rh1 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"xE",
					"yE"
				],
				[
					"l",
					"xD",
					"yD"
				],
				[
					"a",
					"rw2",
					"rh2",
					"istAng",
					"iswAng"
				],
				[
					"l",
					"xBp",
					"yBp"
				],
				[
					"l",
					"xA",
					"yA"
				],
				[
					"l",
					"xGp",
					"yGp"
				],
				[
					"l",
					"xF",
					"yF"
				],
				[
					"a",
					"rw1",
					"rh1",
					"stAng0",
					"swAng0"
				],
				["c"]
			]
		}]
	},
	leftrightarrow: {
		adj: [["adj1", "val 50000"], ["adj2", "val 50000"]],
		gd: [
			["maxAdj2", "*/ 50000 w ss"],
			["a1", "pin 0 adj1 100000"],
			["a2", "pin 0 adj2 maxAdj2"],
			["x2", "*/ ss a2 100000"],
			["x3", "+- r 0 x2"],
			["dy", "*/ h a1 200000"],
			["y1", "+- vc 0 dy"],
			["y2", "+- vc dy 0"],
			["dx1", "*/ y1 x2 hd2"],
			["x1", "+- x2 0 dx1"],
			["x4", "+- x3 dx1 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"x3",
					"y1"
				],
				[
					"l",
					"x3",
					"t"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"x3",
					"b"
				],
				[
					"l",
					"x3",
					"y2"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x2",
					"b"
				],
				["c"]
			]
		}]
	},
	leftrightarrowcallout: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 25000"],
			["adj3", "val 25000"],
			["adj4", "val 48123"]
		],
		gd: [
			["maxAdj2", "*/ 50000 h ss"],
			["a2", "pin 0 adj2 maxAdj2"],
			["maxAdj1", "*/ a2 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["maxAdj3", "*/ 50000 w ss"],
			["a3", "pin 0 adj3 maxAdj3"],
			["q2", "*/ a3 ss wd2"],
			["maxAdj4", "+- 100000 0 q2"],
			["a4", "pin 0 adj4 maxAdj4"],
			["dy1", "*/ ss a2 100000"],
			["dy2", "*/ ss a1 200000"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc 0 dy2"],
			["y3", "+- vc dy2 0"],
			["y4", "+- vc dy1 0"],
			["x1", "*/ ss a3 100000"],
			["x4", "+- r 0 x1"],
			["dx2", "*/ w a4 200000"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc dx2 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"x1",
					"y1"
				],
				[
					"l",
					"x1",
					"y2"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"x3",
					"t"
				],
				[
					"l",
					"x3",
					"y2"
				],
				[
					"l",
					"x4",
					"y2"
				],
				[
					"l",
					"x4",
					"y1"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"x4",
					"y4"
				],
				[
					"l",
					"x4",
					"y3"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"l",
					"x3",
					"b"
				],
				[
					"l",
					"x2",
					"b"
				],
				[
					"l",
					"x2",
					"y3"
				],
				[
					"l",
					"x1",
					"y3"
				],
				[
					"l",
					"x1",
					"y4"
				],
				["c"]
			]
		}]
	},
	leftrightcirculararrow: {
		adj: [
			["adj1", "val 12500"],
			["adj2", "val 1142319"],
			["adj3", "val 20457681"],
			["adj4", "val 11942319"],
			["adj5", "val 12500"]
		],
		gd: [
			["a5", "pin 0 adj5 25000"],
			["maxAdj1", "*/ a5 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["enAng", "pin 1 adj3 21599999"],
			["stAng", "pin 0 adj4 21599999"],
			["th", "*/ ss a1 100000"],
			["thh", "*/ ss a5 100000"],
			["th2", "*/ th 1 2"],
			["rw1", "+- wd2 th2 thh"],
			["rh1", "+- hd2 th2 thh"],
			["rw2", "+- rw1 0 th"],
			["rh2", "+- rh1 0 th"],
			["rw3", "+- rw2 th2 0"],
			["rh3", "+- rh2 th2 0"],
			["wtH", "sin rw3 enAng"],
			["htH", "cos rh3 enAng"],
			["dxH", "cat2 rw3 htH wtH"],
			["dyH", "sat2 rh3 htH wtH"],
			["xH", "+- hc dxH 0"],
			["yH", "+- vc dyH 0"],
			["rI", "min rw2 rh2"],
			["u1", "*/ dxH dxH 1"],
			["u2", "*/ dyH dyH 1"],
			["u3", "*/ rI rI 1"],
			["u4", "+- u1 0 u3"],
			["u5", "+- u2 0 u3"],
			["u6", "*/ u4 u5 u1"],
			["u7", "*/ u6 1 u2"],
			["u8", "+- 1 0 u7"],
			["u9", "sqrt u8"],
			["u10", "*/ u4 1 dxH"],
			["u11", "*/ u10 1 dyH"],
			["u12", "+/ 1 u9 u11"],
			["u13", "at2 1 u12"],
			["u14", "+- u13 21600000 0"],
			["u15", "?: u13 u13 u14"],
			["u16", "+- u15 0 enAng"],
			["u17", "+- u16 21600000 0"],
			["u18", "?: u16 u16 u17"],
			["u19", "+- u18 0 cd2"],
			["u20", "+- u18 0 21600000"],
			["u21", "?: u19 u20 u18"],
			["maxAng", "abs u21"],
			["aAng", "pin 0 adj2 maxAng"],
			["ptAng", "+- enAng aAng 0"],
			["wtA", "sin rw3 ptAng"],
			["htA", "cos rh3 ptAng"],
			["dxA", "cat2 rw3 htA wtA"],
			["dyA", "sat2 rh3 htA wtA"],
			["xA", "+- hc dxA 0"],
			["yA", "+- vc dyA 0"],
			["dxG", "cos thh ptAng"],
			["dyG", "sin thh ptAng"],
			["xG", "+- xH dxG 0"],
			["yG", "+- yH dyG 0"],
			["dxB", "cos thh ptAng"],
			["dyB", "sin thh ptAng"],
			["xB", "+- xH 0 dxB 0"],
			["yB", "+- yH 0 dyB 0"],
			["sx1", "+- xB 0 hc"],
			["sy1", "+- yB 0 vc"],
			["sx2", "+- xG 0 hc"],
			["sy2", "+- yG 0 vc"],
			["rO", "min rw1 rh1"],
			["x1O", "*/ sx1 rO rw1"],
			["y1O", "*/ sy1 rO rh1"],
			["x2O", "*/ sx2 rO rw1"],
			["y2O", "*/ sy2 rO rh1"],
			["dxO", "+- x2O 0 x1O"],
			["dyO", "+- y2O 0 y1O"],
			["dO", "mod dxO dyO 0"],
			["q1", "*/ x1O y2O 1"],
			["q2", "*/ x2O y1O 1"],
			["DO", "+- q1 0 q2"],
			["q3", "*/ rO rO 1"],
			["q4", "*/ dO dO 1"],
			["q5", "*/ q3 q4 1"],
			["q6", "*/ DO DO 1"],
			["q7", "+- q5 0 q6"],
			["q8", "max q7 0"],
			["sdelO", "sqrt q8"],
			["ndyO", "*/ dyO -1 1"],
			["sdyO", "?: ndyO -1 1"],
			["q9", "*/ sdyO dxO 1"],
			["q10", "*/ q9 sdelO 1"],
			["q11", "*/ DO dyO 1"],
			["dxF1", "+/ q11 q10 q4"],
			["q12", "+- q11 0 q10"],
			["dxF2", "*/ q12 1 q4"],
			["adyO", "abs dyO"],
			["q13", "*/ adyO sdelO 1"],
			["q14", "*/ DO dxO -1"],
			["dyF1", "+/ q14 q13 q4"],
			["q15", "+- q14 0 q13"],
			["dyF2", "*/ q15 1 q4"],
			["q16", "+- x2O 0 dxF1"],
			["q17", "+- x2O 0 dxF2"],
			["q18", "+- y2O 0 dyF1"],
			["q19", "+- y2O 0 dyF2"],
			["q20", "mod q16 q18 0"],
			["q21", "mod q17 q19 0"],
			["q22", "+- q21 0 q20"],
			["dxF", "?: q22 dxF1 dxF2"],
			["dyF", "?: q22 dyF1 dyF2"],
			["sdxF", "*/ dxF rw1 rO"],
			["sdyF", "*/ dyF rh1 rO"],
			["xF", "+- hc sdxF 0"],
			["yF", "+- vc sdyF 0"],
			["x1I", "*/ sx1 rI rw2"],
			["y1I", "*/ sy1 rI rh2"],
			["x2I", "*/ sx2 rI rw2"],
			["y2I", "*/ sy2 rI rh2"],
			["dxI", "+- x2I 0 x1I"],
			["dyI", "+- y2I 0 y1I"],
			["dI", "mod dxI dyI 0"],
			["v1", "*/ x1I y2I 1"],
			["v2", "*/ x2I y1I 1"],
			["DI", "+- v1 0 v2"],
			["v3", "*/ rI rI 1"],
			["v4", "*/ dI dI 1"],
			["v5", "*/ v3 v4 1"],
			["v6", "*/ DI DI 1"],
			["v7", "+- v5 0 v6"],
			["v8", "max v7 0"],
			["sdelI", "sqrt v8"],
			["v9", "*/ sdyO dxI 1"],
			["v10", "*/ v9 sdelI 1"],
			["v11", "*/ DI dyI 1"],
			["dxC1", "+/ v11 v10 v4"],
			["v12", "+- v11 0 v10"],
			["dxC2", "*/ v12 1 v4"],
			["adyI", "abs dyI"],
			["v13", "*/ adyI sdelI 1"],
			["v14", "*/ DI dxI -1"],
			["dyC1", "+/ v14 v13 v4"],
			["v15", "+- v14 0 v13"],
			["dyC2", "*/ v15 1 v4"],
			["v16", "+- x1I 0 dxC1"],
			["v17", "+- x1I 0 dxC2"],
			["v18", "+- y1I 0 dyC1"],
			["v19", "+- y1I 0 dyC2"],
			["v20", "mod v16 v18 0"],
			["v21", "mod v17 v19 0"],
			["v22", "+- v21 0 v20"],
			["dxC", "?: v22 dxC1 dxC2"],
			["dyC", "?: v22 dyC1 dyC2"],
			["sdxC", "*/ dxC rw2 rI"],
			["sdyC", "*/ dyC rh2 rI"],
			["xC", "+- hc sdxC 0"],
			["yC", "+- vc sdyC 0"],
			["wtI", "sin rw3 stAng"],
			["htI", "cos rh3 stAng"],
			["dxI", "cat2 rw3 htI wtI"],
			["dyI", "sat2 rh3 htI wtI"],
			["xI", "+- hc dxI 0"],
			["yI", "+- vc dyI 0"],
			["lptAng", "+- stAng 0 aAng"],
			["wtL", "sin rw3 lptAng"],
			["htL", "cos rh3 lptAng"],
			["dxL", "cat2 rw3 htL wtL"],
			["dyL", "sat2 rh3 htL wtL"],
			["xL", "+- hc dxL 0"],
			["yL", "+- vc dyL 0"],
			["dxK", "cos thh lptAng"],
			["dyK", "sin thh lptAng"],
			["xK", "+- xI dxK 0"],
			["yK", "+- yI dyK 0"],
			["dxJ", "cos thh lptAng"],
			["dyJ", "sin thh lptAng"],
			["xJ", "+- xI 0 dxJ 0"],
			["yJ", "+- yI 0 dyJ 0"],
			["p1", "+- xF 0 xC"],
			["p2", "+- yF 0 yC"],
			["p3", "mod p1 p2 0"],
			["p4", "*/ p3 1 2"],
			["p5", "+- p4 0 thh"],
			["xGp", "?: p5 xF xG"],
			["yGp", "?: p5 yF yG"],
			["xBp", "?: p5 xC xB"],
			["yBp", "?: p5 yC yB"],
			["en0", "at2 sdxF sdyF"],
			["en1", "+- en0 21600000 0"],
			["en2", "?: en0 en0 en1"],
			["od0", "+- en2 0 enAng"],
			["od1", "+- od0 21600000 0"],
			["od2", "?: od0 od0 od1"],
			["st0", "+- stAng 0 od2"],
			["st1", "+- st0 21600000 0"],
			["st2", "?: st0 st0 st1"],
			["sw0", "+- en2 0 st2"],
			["sw1", "+- sw0 21600000 0"],
			["swAng", "?: sw0 sw0 sw1"],
			["ist0", "at2 sdxC sdyC"],
			["ist1", "+- ist0 21600000 0"],
			["istAng", "?: ist0 ist0 ist1"],
			["id0", "+- istAng 0 enAng"],
			["id1", "+- id0 0 21600000"],
			["id2", "?: id0 id1 id0"],
			["ien0", "+- stAng 0 id2"],
			["ien1", "+- ien0 0 21600000"],
			["ien2", "?: ien1 ien1 ien0"],
			["isw1", "+- ien2 0 istAng"],
			["isw2", "+- isw1 0 21600000"],
			["iswAng", "?: isw1 isw2 isw1"],
			["wtE", "sin rw1 st2"],
			["htE", "cos rh1 st2"],
			["dxE", "cat2 rw1 htE wtE"],
			["dyE", "sat2 rh1 htE wtE"],
			["xE", "+- hc dxE 0"],
			["yE", "+- vc dyE 0"],
			["wtD", "sin rw2 ien2"],
			["htD", "cos rh2 ien2"],
			["dxD", "cat2 rw2 htD wtD"],
			["dyD", "sat2 rh2 htD wtD"],
			["xD", "+- hc dxD 0"],
			["yD", "+- vc dyD 0"],
			["xKp", "?: p5 xE xK"],
			["yKp", "?: p5 yE yK"],
			["xJp", "?: p5 xD xJ"],
			["yJp", "?: p5 yD yJ"],
			["aL", "+- lptAng 0 cd4"],
			["aA", "+- ptAng cd4 0"],
			["aB", "+- ptAng cd2 0"],
			["aJ", "+- lptAng cd2 0"],
			["idx", "cos rw1 2700000"],
			["idy", "sin rh1 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"xL",
					"yL"
				],
				[
					"l",
					"xKp",
					"yKp"
				],
				[
					"l",
					"xE",
					"yE"
				],
				[
					"a",
					"rw1",
					"rh1",
					"st2",
					"swAng"
				],
				[
					"l",
					"xGp",
					"yGp"
				],
				[
					"l",
					"xA",
					"yA"
				],
				[
					"l",
					"xBp",
					"yBp"
				],
				[
					"l",
					"xC",
					"yC"
				],
				[
					"a",
					"rw2",
					"rh2",
					"istAng",
					"iswAng"
				],
				[
					"l",
					"xJp",
					"yJp"
				],
				["c"]
			]
		}]
	},
	leftrightribbon: {
		adj: [
			["adj1", "val 50000"],
			["adj2", "val 50000"],
			["adj3", "val 16667"]
		],
		gd: [
			["a3", "pin 0 adj3 33333"],
			["maxAdj1", "+- 100000 0 a3"],
			["a1", "pin 0 adj1 maxAdj1"],
			["w1", "+- wd2 0 wd32"],
			["maxAdj2", "*/ 100000 w1 ss"],
			["a2", "pin 0 adj2 maxAdj2"],
			["x1", "*/ ss a2 100000"],
			["x4", "+- r 0 x1"],
			["dy1", "*/ h a1 200000"],
			["dy2", "*/ h a3 -200000"],
			["ly1", "+- vc dy2 dy1"],
			["ry4", "+- vc dy1 dy2"],
			["ly2", "+- ly1 dy1 0"],
			["ry3", "+- b 0 ly2"],
			["ly4", "*/ ly2 2 1"],
			["ry1", "+- b 0 ly4"],
			["ly3", "+- ly4 0 ly1"],
			["ry2", "+- b 0 ly3"],
			["hR", "*/ a3 ss 400000"],
			["x2", "+- hc 0 wd32"],
			["x3", "+- hc wd32 0"],
			["y1", "+- ly1 hR 0"],
			["y2", "+- ry2 0 hR"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"ly2"
					],
					[
						"l",
						"x1",
						"t"
					],
					[
						"l",
						"x1",
						"ly1"
					],
					[
						"l",
						"hc",
						"ly1"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"cd2"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"-10800000"
					],
					[
						"l",
						"x4",
						"ry2"
					],
					[
						"l",
						"x4",
						"ry1"
					],
					[
						"l",
						"r",
						"ry3"
					],
					[
						"l",
						"x4",
						"b"
					],
					[
						"l",
						"x4",
						"ry4"
					],
					[
						"l",
						"hc",
						"ry4"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"cd4"
					],
					[
						"l",
						"x2",
						"ly3"
					],
					[
						"l",
						"x1",
						"ly3"
					],
					[
						"l",
						"x1",
						"ly4"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x3",
						"y1"
					],
					[
						"a",
						"wd32",
						"hR",
						"0",
						"cd4"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"-10800000"
					],
					[
						"l",
						"x3",
						"ry2"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"ly2"
					],
					[
						"l",
						"x1",
						"t"
					],
					[
						"l",
						"x1",
						"ly1"
					],
					[
						"l",
						"hc",
						"ly1"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"cd2"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"-10800000"
					],
					[
						"l",
						"x4",
						"ry2"
					],
					[
						"l",
						"x4",
						"ry1"
					],
					[
						"l",
						"r",
						"ry3"
					],
					[
						"l",
						"x4",
						"b"
					],
					[
						"l",
						"x4",
						"ry4"
					],
					[
						"l",
						"hc",
						"ry4"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"cd4"
					],
					[
						"l",
						"x2",
						"ly3"
					],
					[
						"l",
						"x1",
						"ly3"
					],
					[
						"l",
						"x1",
						"ly4"
					],
					["c"],
					[
						"m",
						"x3",
						"y1"
					],
					[
						"l",
						"x3",
						"ry2"
					],
					[
						"m",
						"x2",
						"y2"
					],
					[
						"l",
						"x2",
						"ly3"
					]
				]
			}
		]
	},
	leftrightuparrow: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 25000"],
			["adj3", "val 25000"]
		],
		gd: [
			["a2", "pin 0 adj2 50000"],
			["maxAdj1", "*/ a2 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["q1", "+- 100000 0 maxAdj1"],
			["maxAdj3", "*/ q1 1 2"],
			["a3", "pin 0 adj3 maxAdj3"],
			["x1", "*/ ss a3 100000"],
			["dx2", "*/ ss a2 100000"],
			["x2", "+- hc 0 dx2"],
			["x5", "+- hc dx2 0"],
			["dx3", "*/ ss a1 200000"],
			["x3", "+- hc 0 dx3"],
			["x4", "+- hc dx3 0"],
			["x6", "+- r 0 x1"],
			["dy2", "*/ ss a2 50000"],
			["y2", "+- b 0 dy2"],
			["y4", "+- b 0 dx2"],
			["y3", "+- y4 0 dx3"],
			["y5", "+- y4 dx3 0"],
			["il", "*/ dx3 x1 dx2"],
			["ir", "+- r 0 il"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y4"
				],
				[
					"l",
					"x1",
					"y2"
				],
				[
					"l",
					"x1",
					"y3"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"l",
					"x3",
					"x1"
				],
				[
					"l",
					"x2",
					"x1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"x5",
					"x1"
				],
				[
					"l",
					"x4",
					"x1"
				],
				[
					"l",
					"x4",
					"y3"
				],
				[
					"l",
					"x6",
					"y3"
				],
				[
					"l",
					"x6",
					"y2"
				],
				[
					"l",
					"r",
					"y4"
				],
				[
					"l",
					"x6",
					"b"
				],
				[
					"l",
					"x6",
					"y5"
				],
				[
					"l",
					"x1",
					"y5"
				],
				[
					"l",
					"x1",
					"b"
				],
				["c"]
			]
		}]
	},
	leftuparrow: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 25000"],
			["adj3", "val 25000"]
		],
		gd: [
			["a2", "pin 0 adj2 50000"],
			["maxAdj1", "*/ a2 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["maxAdj3", "+- 100000 0 maxAdj1"],
			["a3", "pin 0 adj3 maxAdj3"],
			["x1", "*/ ss a3 100000"],
			["dx2", "*/ ss a2 50000"],
			["x2", "+- r 0 dx2"],
			["y2", "+- b 0 dx2"],
			["dx4", "*/ ss a2 100000"],
			["x4", "+- r 0 dx4"],
			["y4", "+- b 0 dx4"],
			["dx3", "*/ ss a1 200000"],
			["x3", "+- x4 0 dx3"],
			["x5", "+- x4 dx3 0"],
			["y3", "+- y4 0 dx3"],
			["y5", "+- y4 dx3 0"],
			["il", "*/ dx3 x1 dx4"],
			["cx1", "+/ x1 x5 2"],
			["cy1", "+/ x1 y5 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y4"
				],
				[
					"l",
					"x1",
					"y2"
				],
				[
					"l",
					"x1",
					"y3"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"l",
					"x3",
					"x1"
				],
				[
					"l",
					"x2",
					"x1"
				],
				[
					"l",
					"x4",
					"t"
				],
				[
					"l",
					"r",
					"x1"
				],
				[
					"l",
					"x5",
					"x1"
				],
				[
					"l",
					"x5",
					"y5"
				],
				[
					"l",
					"x1",
					"y5"
				],
				[
					"l",
					"x1",
					"b"
				],
				["c"]
			]
		}]
	},
	lightningbolt: {
		adj: [],
		gd: [
			["x1", "*/ w 5022 21600"],
			["x3", "*/ w 8472 21600"],
			["x4", "*/ w 8757 21600"],
			["x5", "*/ w 10012 21600"],
			["x8", "*/ w 12860 21600"],
			["x9", "*/ w 13917 21600"],
			["x11", "*/ w 16577 21600"],
			["y1", "*/ h 3890 21600"],
			["y2", "*/ h 6080 21600"],
			["y4", "*/ h 7437 21600"],
			["y6", "*/ h 9705 21600"],
			["y7", "*/ h 12007 21600"],
			["y10", "*/ h 14277 21600"],
			["y11", "*/ h 14915 21600"]
		],
		paths: [{
			w: 21600,
			h: 21600,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"8472",
					"0"
				],
				[
					"l",
					"12860",
					"6080"
				],
				[
					"l",
					"11050",
					"6797"
				],
				[
					"l",
					"16577",
					"12007"
				],
				[
					"l",
					"14767",
					"12877"
				],
				[
					"l",
					"21600",
					"21600"
				],
				[
					"l",
					"10012",
					"14915"
				],
				[
					"l",
					"12222",
					"13987"
				],
				[
					"l",
					"5022",
					"9705"
				],
				[
					"l",
					"7602",
					"8382"
				],
				[
					"l",
					"0",
					"3890"
				],
				["c"]
			]
		}]
	},
	line: {
		adj: [],
		gd: [],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"l",
				"r",
				"b"
			]]
		}]
	},
	lineinv: {
		adj: [],
		gd: [],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"b"
			], [
				"l",
				"r",
				"t"
			]]
		}]
	},
	mathdivide: {
		adj: [
			["adj1", "val 23520"],
			["adj2", "val 5880"],
			["adj3", "val 11760"]
		],
		gd: [
			["a1", "pin 1000 adj1 36745"],
			["ma1", "+- 0 0 a1"],
			["ma3h", "+/ 73490 ma1 4"],
			["ma3w", "*/ 36745 w h"],
			["maxAdj3", "min ma3h ma3w"],
			["a3", "pin 1000 adj3 maxAdj3"],
			["m4a3", "*/ -4 a3 1"],
			["maxAdj2", "+- 73490 m4a3 a1"],
			["a2", "pin 0 adj2 maxAdj2"],
			["dy1", "*/ h a1 200000"],
			["yg", "*/ h a2 100000"],
			["rad", "*/ h a3 100000"],
			["dx1", "*/ w 73490 200000"],
			["y3", "+- vc 0 dy1"],
			["y4", "+- vc dy1 0"],
			["a", "+- yg rad 0"],
			["y2", "+- y3 0 a"],
			["y1", "+- y2 0 rad"],
			["y5", "+- b 0 y1"],
			["x1", "+- hc 0 dx1"],
			["x3", "+- hc dx1 0"],
			["x2", "+- hc 0 rad"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"hc",
					"y1"
				],
				[
					"a",
					"rad",
					"rad",
					"3cd4",
					"21600000"
				],
				["c"],
				[
					"m",
					"hc",
					"y5"
				],
				[
					"a",
					"rad",
					"rad",
					"cd4",
					"21600000"
				],
				["c"],
				[
					"m",
					"x1",
					"y3"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"l",
					"x3",
					"y4"
				],
				[
					"l",
					"x1",
					"y4"
				],
				["c"]
			]
		}]
	},
	mathequal: {
		adj: [["adj1", "val 23520"], ["adj2", "val 11760"]],
		gd: [
			["a1", "pin 0 adj1 36745"],
			["2a1", "*/ a1 2 1"],
			["mAdj2", "+- 100000 0 2a1"],
			["a2", "pin 0 adj2 mAdj2"],
			["dy1", "*/ h a1 100000"],
			["dy2", "*/ h a2 200000"],
			["dx1", "*/ w 73490 200000"],
			["y2", "+- vc 0 dy2"],
			["y3", "+- vc dy2 0"],
			["y1", "+- y2 0 dy1"],
			["y4", "+- y3 dy1 0"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc dx1 0"],
			["yC1", "+/ y1 y2 2"],
			["yC2", "+/ y3 y4 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x1",
					"y2"
				],
				["c"],
				[
					"m",
					"x1",
					"y3"
				],
				[
					"l",
					"x2",
					"y3"
				],
				[
					"l",
					"x2",
					"y4"
				],
				[
					"l",
					"x1",
					"y4"
				],
				["c"]
			]
		}]
	},
	mathminus: {
		adj: [["adj1", "val 23520"]],
		gd: [
			["a1", "pin 0 adj1 100000"],
			["dy1", "*/ h a1 200000"],
			["dx1", "*/ w 73490 200000"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc dy1 0"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc dx1 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x1",
					"y2"
				],
				["c"]
			]
		}]
	},
	mathmultiply: {
		adj: [["adj1", "val 23520"]],
		gd: [
			["a1", "pin 0 adj1 51965"],
			["th", "*/ ss a1 100000"],
			["a", "at2 w h"],
			["sa", "sin 1 a"],
			["ca", "cos 1 a"],
			["ta", "tan 1 a"],
			["dl", "mod w h 0"],
			["rw", "*/ dl 51965 100000"],
			["lM", "+- dl 0 rw"],
			["xM", "*/ ca lM 2"],
			["yM", "*/ sa lM 2"],
			["dxAM", "*/ sa th 2"],
			["dyAM", "*/ ca th 2"],
			["xA", "+- xM 0 dxAM"],
			["yA", "+- yM dyAM 0"],
			["xB", "+- xM dxAM 0"],
			["yB", "+- yM 0 dyAM"],
			["xBC", "+- hc 0 xB"],
			["yBC", "*/ xBC ta 1"],
			["yC", "+- yBC yB 0"],
			["xD", "+- r 0 xB"],
			["xE", "+- r 0 xA"],
			["yFE", "+- vc 0 yA"],
			["xFE", "*/ yFE 1 ta"],
			["xF", "+- xE 0 xFE"],
			["xL", "+- xA xFE 0"],
			["yG", "+- b 0 yA"],
			["yH", "+- b 0 yB"],
			["yI", "+- b 0 yC"],
			["xC2", "+- r 0 xM"],
			["yC3", "+- b 0 yM"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"xA",
					"yA"
				],
				[
					"l",
					"xB",
					"yB"
				],
				[
					"l",
					"hc",
					"yC"
				],
				[
					"l",
					"xD",
					"yB"
				],
				[
					"l",
					"xE",
					"yA"
				],
				[
					"l",
					"xF",
					"vc"
				],
				[
					"l",
					"xE",
					"yG"
				],
				[
					"l",
					"xD",
					"yH"
				],
				[
					"l",
					"hc",
					"yI"
				],
				[
					"l",
					"xB",
					"yH"
				],
				[
					"l",
					"xA",
					"yG"
				],
				[
					"l",
					"xL",
					"vc"
				],
				["c"]
			]
		}]
	},
	mathnotequal: {
		adj: [
			["adj1", "val 23520"],
			["adj2", "val 6600000"],
			["adj3", "val 11760"]
		],
		gd: [
			["a1", "pin 0 adj1 50000"],
			["crAng", "pin 4200000 adj2 6600000"],
			["2a1", "*/ a1 2 1"],
			["maxAdj3", "+- 100000 0 2a1"],
			["a3", "pin 0 adj3 maxAdj3"],
			["dy1", "*/ h a1 100000"],
			["dy2", "*/ h a3 200000"],
			["dx1", "*/ w 73490 200000"],
			["x1", "+- hc 0 dx1"],
			["x8", "+- hc dx1 0"],
			["y2", "+- vc 0 dy2"],
			["y3", "+- vc dy2 0"],
			["y1", "+- y2 0 dy1"],
			["y4", "+- y3 dy1 0"],
			["cadj2", "+- crAng 0 cd4"],
			["xadj2", "tan hd2 cadj2"],
			["len", "mod xadj2 hd2 0"],
			["bhw", "*/ len dy1 hd2"],
			["bhw2", "*/ bhw 1 2"],
			["x7", "+- hc xadj2 bhw2"],
			["dx67", "*/ xadj2 y1 hd2"],
			["x6", "+- x7 0 dx67"],
			["dx57", "*/ xadj2 y2 hd2"],
			["x5", "+- x7 0 dx57"],
			["dx47", "*/ xadj2 y3 hd2"],
			["x4", "+- x7 0 dx47"],
			["dx37", "*/ xadj2 y4 hd2"],
			["x3", "+- x7 0 dx37"],
			["dx27", "*/ xadj2 2 1"],
			["x2", "+- x7 0 dx27"],
			["rx7", "+- x7 bhw 0"],
			["rx6", "+- x6 bhw 0"],
			["rx5", "+- x5 bhw 0"],
			["rx4", "+- x4 bhw 0"],
			["rx3", "+- x3 bhw 0"],
			["rx2", "+- x2 bhw 0"],
			["dx7", "*/ dy1 hd2 len"],
			["rxt", "+- x7 dx7 0"],
			["lxt", "+- rx7 0 dx7"],
			["rx", "?: cadj2 rxt rx7"],
			["lx", "?: cadj2 x7 lxt"],
			["dy3", "*/ dy1 xadj2 len"],
			["dy4", "+- 0 0 dy3"],
			["ry", "?: cadj2 dy3 t"],
			["ly", "?: cadj2 t dy4"],
			["dlx", "+- w 0 rx"],
			["drx", "+- w 0 lx"],
			["dly", "+- h 0 ry"],
			["dry", "+- h 0 ly"],
			["xC1", "+/ rx lx 2"],
			["xC2", "+/ drx dlx 2"],
			["yC1", "+/ ry ly 2"],
			["yC2", "+/ y1 y2 2"],
			["yC3", "+/ y3 y4 2"],
			["yC4", "+/ dry dly 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"l",
					"x6",
					"y1"
				],
				[
					"l",
					"lx",
					"ly"
				],
				[
					"l",
					"rx",
					"ry"
				],
				[
					"l",
					"rx6",
					"y1"
				],
				[
					"l",
					"x8",
					"y1"
				],
				[
					"l",
					"x8",
					"y2"
				],
				[
					"l",
					"rx5",
					"y2"
				],
				[
					"l",
					"rx4",
					"y3"
				],
				[
					"l",
					"x8",
					"y3"
				],
				[
					"l",
					"x8",
					"y4"
				],
				[
					"l",
					"rx3",
					"y4"
				],
				[
					"l",
					"drx",
					"dry"
				],
				[
					"l",
					"dlx",
					"dly"
				],
				[
					"l",
					"x3",
					"y4"
				],
				[
					"l",
					"x1",
					"y4"
				],
				[
					"l",
					"x1",
					"y3"
				],
				[
					"l",
					"x4",
					"y3"
				],
				[
					"l",
					"x5",
					"y2"
				],
				[
					"l",
					"x1",
					"y2"
				],
				["c"]
			]
		}]
	},
	mathplus: {
		adj: [["adj1", "val 23520"]],
		gd: [
			["a1", "pin 0 adj1 73490"],
			["dx1", "*/ w 73490 200000"],
			["dy1", "*/ h 73490 200000"],
			["dx2", "*/ ss a1 200000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc dx2 0"],
			["x4", "+- hc dx1 0"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc 0 dx2"],
			["y3", "+- vc dx2 0"],
			["y4", "+- vc dy1 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"y2"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"x3",
					"y1"
				],
				[
					"l",
					"x3",
					"y2"
				],
				[
					"l",
					"x4",
					"y2"
				],
				[
					"l",
					"x4",
					"y3"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"l",
					"x3",
					"y4"
				],
				[
					"l",
					"x2",
					"y4"
				],
				[
					"l",
					"x2",
					"y3"
				],
				[
					"l",
					"x1",
					"y3"
				],
				["c"]
			]
		}]
	},
	moon: {
		adj: [["adj", "val 50000"]],
		gd: [
			["a", "pin 0 adj 87500"],
			["g0", "*/ ss a 100000"],
			["g0w", "*/ g0 w ss"],
			["g1", "+- ss 0 g0"],
			["g2", "*/ g0 g0 g1"],
			["g3", "*/ ss ss g1"],
			["g4", "*/ g3 2 1"],
			["g5", "+- g4 0 g2"],
			["g6", "+- g5 0 g0"],
			["g6w", "*/ g6 w ss"],
			["g7", "*/ g5 1 2"],
			["g8", "+- g7 0 g0"],
			["dy1", "*/ g8 hd2 ss"],
			["g10h", "+- vc 0 dy1"],
			["g11h", "+- vc dy1 0"],
			["g12", "*/ g0 9598 32768"],
			["g12w", "*/ g12 w ss"],
			["g13", "+- ss 0 g12"],
			["q1", "*/ ss ss 1"],
			["q2", "*/ g13 g13 1"],
			["q3", "+- q1 0 q2"],
			["q4", "sqrt q3"],
			["dy4", "*/ q4 hd2 ss"],
			["g15h", "+- vc 0 dy4"],
			["g16h", "+- vc dy4 0"],
			["g17w", "+- g6w 0 g0w"],
			["g18w", "*/ g17w 1 2"],
			["dx2p", "+- g0w g18w w"],
			["dx2", "*/ dx2p -1 1"],
			["dy2", "*/ hd2 -1 1"],
			["stAng1", "at2 dx2 dy2"],
			["enAngp1", "at2 dx2 hd2"],
			["enAng1", "+- enAngp1 0 21600000"],
			["swAng1", "+- enAng1 0 stAng1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"r",
					"b"
				],
				[
					"a",
					"w",
					"hd2",
					"cd4",
					"cd2"
				],
				[
					"a",
					"g18w",
					"dy1",
					"stAng1",
					"swAng1"
				],
				["c"]
			]
		}]
	},
	nonisoscelestrapezoid: {
		adj: [["adj1", "val 25000"], ["adj2", "val 25000"]],
		gd: [
			["maxAdj", "*/ 50000 w ss"],
			["a1", "pin 0 adj1 maxAdj"],
			["a2", "pin 0 adj2 maxAdj"],
			["x1", "*/ ss a1 200000"],
			["x2", "*/ ss a1 100000"],
			["dx3", "*/ ss a2 100000"],
			["x3", "+- r 0 dx3"],
			["x4", "+/ r x3 2"],
			["il", "*/ wd3 a1 maxAdj"],
			["adjm", "max a1 a2"],
			["it", "*/ hd3 adjm maxAdj"],
			["irt", "*/ wd3 a2 maxAdj"],
			["ir", "+- r 0 irt"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"b"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"x3",
					"t"
				],
				[
					"l",
					"r",
					"b"
				],
				["c"]
			]
		}]
	},
	nosmoking: {
		adj: [["adj", "val 18750"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["dr", "*/ ss a 100000"],
			["iwd2", "+- wd2 0 dr"],
			["ihd2", "+- hd2 0 dr"],
			["ang", "at2 w h"],
			["ct", "cos ihd2 ang"],
			["st", "sin iwd2 ang"],
			["m", "mod ct st 0"],
			["n", "*/ iwd2 ihd2 m"],
			["drd2", "*/ dr 1 2"],
			["dang", "at2 n drd2"],
			["dang2", "*/ dang 2 1"],
			["swAng", "+- -10800000 dang2 0"],
			["t3", "at2 w h"],
			["stAng1", "+- t3 0 dang"],
			["stAng2", "+- stAng1 0 cd2"],
			["ct1", "cos ihd2 stAng1"],
			["st1", "sin iwd2 stAng1"],
			["m1", "mod ct1 st1 0"],
			["n1", "*/ iwd2 ihd2 m1"],
			["dx1", "cos n1 stAng1"],
			["dy1", "sin n1 stAng1"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"],
			["x2", "+- hc 0 dx1"],
			["y2", "+- vc 0 dy1"],
			["idx", "cos wd2 2700000"],
			["idy", "sin hd2 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"a",
					"wd2",
					"hd2",
					"cd2",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"3cd4",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"0",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"cd4",
					"cd4"
				],
				["c"],
				[
					"m",
					"x1",
					"y1"
				],
				[
					"a",
					"iwd2",
					"ihd2",
					"stAng1",
					"swAng"
				],
				["c"],
				[
					"m",
					"x2",
					"y2"
				],
				[
					"a",
					"iwd2",
					"ihd2",
					"stAng2",
					"swAng"
				],
				["c"]
			]
		}]
	},
	notchedrightarrow: {
		adj: [["adj1", "val 50000"], ["adj2", "val 50000"]],
		gd: [
			["maxAdj2", "*/ 100000 w ss"],
			["a1", "pin 0 adj1 100000"],
			["a2", "pin 0 adj2 maxAdj2"],
			["dx2", "*/ ss a2 100000"],
			["x2", "+- r 0 dx2"],
			["dy1", "*/ h a1 200000"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc dy1 0"],
			["x1", "*/ dy1 dx2 hd2"],
			["x3", "+- r 0 x1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y1"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"x2",
					"b"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"l",
					"y2"
				],
				[
					"l",
					"x1",
					"vc"
				],
				["c"]
			]
		}]
	},
	octagon: {
		adj: [["adj", "val 29289"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["x1", "*/ ss a 100000"],
			["x2", "+- r 0 x1"],
			["y2", "+- b 0 x1"],
			["il", "*/ x1 1 2"],
			["ir", "+- r 0 il"],
			["ib", "+- b 0 il"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"x1"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"r",
					"x1"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"l",
					"x2",
					"b"
				],
				[
					"l",
					"x1",
					"b"
				],
				[
					"l",
					"l",
					"y2"
				],
				["c"]
			]
		}]
	},
	parallelogram: {
		adj: [["adj", "val 25000"]],
		gd: [
			["maxAdj", "*/ 100000 w ss"],
			["a", "pin 0 adj maxAdj"],
			["x1", "*/ ss a 200000"],
			["x2", "*/ ss a 100000"],
			["x6", "+- r 0 x1"],
			["x5", "+- r 0 x2"],
			["x3", "*/ x5 1 2"],
			["x4", "+- r 0 x3"],
			["il", "*/ wd2 a maxAdj"],
			["q1", "*/ 5 a maxAdj"],
			["q2", "+/ 1 q1 12"],
			["il", "*/ q2 w 1"],
			["it", "*/ q2 h 1"],
			["ir", "+- r 0 il"],
			["ib", "+- b 0 it"],
			["q3", "*/ h hc x2"],
			["y1", "pin 0 q3 h"],
			["y2", "+- b 0 y1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"b"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"x5",
					"b"
				],
				["c"]
			]
		}]
	},
	pentagon: {
		adj: [["hf", "val 105146"], ["vf", "val 110557"]],
		gd: [
			["swd2", "*/ wd2 hf 100000"],
			["shd2", "*/ hd2 vf 100000"],
			["svc", "*/ vc  vf 100000"],
			["dx1", "cos swd2 1080000"],
			["dx2", "cos swd2 18360000"],
			["dy1", "sin shd2 1080000"],
			["dy2", "sin shd2 18360000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc dx2 0"],
			["x4", "+- hc dx1 0"],
			["y1", "+- svc 0 dy1"],
			["y2", "+- svc 0 dy2"],
			["it", "*/ y1 dx2 dx1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"x4",
					"y1"
				],
				[
					"l",
					"x3",
					"y2"
				],
				[
					"l",
					"x2",
					"y2"
				],
				["c"]
			]
		}]
	},
	pie: {
		adj: [["adj1", "val 0"], ["adj2", "val 16200000"]],
		gd: [
			["stAng", "pin 0 adj1 21599999"],
			["enAng", "pin 0 adj2 21599999"],
			["sw1", "+- enAng 0 stAng"],
			["sw2", "+- sw1 21600000 0"],
			["swAng", "?: sw1 sw1 sw2"],
			["wt1", "sin wd2 stAng"],
			["ht1", "cos hd2 stAng"],
			["dx1", "cat2 wd2 ht1 wt1"],
			["dy1", "sat2 hd2 ht1 wt1"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"],
			["wt2", "sin wd2 enAng"],
			["ht2", "cos hd2 enAng"],
			["dx2", "cat2 wd2 ht2 wt2"],
			["dy2", "sat2 hd2 ht2 wt2"],
			["x2", "+- hc dx2 0"],
			["y2", "+- vc dy2 0"],
			["idx", "cos wd2 2700000"],
			["idy", "sin hd2 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"a",
					"wd2",
					"hd2",
					"stAng",
					"swAng"
				],
				[
					"l",
					"hc",
					"vc"
				],
				["c"]
			]
		}]
	},
	piewedge: {
		adj: [],
		gd: [
			["g1", "cos w 13500000"],
			["g2", "sin h 13500000"],
			["x1", "+- r g1 0"],
			["y1", "+- b g2 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"b"
				],
				[
					"a",
					"w",
					"h",
					"cd2",
					"cd4"
				],
				[
					"l",
					"r",
					"b"
				],
				["c"]
			]
		}]
	},
	plaque: {
		adj: [["adj", "val 16667"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["x1", "*/ ss a 100000"],
			["x2", "+- r 0 x1"],
			["y2", "+- b 0 x1"],
			["il", "*/ x1 70711 100000"],
			["ir", "+- r 0 il"],
			["ib", "+- b 0 il"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"x1"
				],
				[
					"a",
					"x1",
					"x1",
					"cd4",
					"-5400000"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"a",
					"x1",
					"x1",
					"cd2",
					"-5400000"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"a",
					"x1",
					"x1",
					"3cd4",
					"-5400000"
				],
				[
					"l",
					"x1",
					"b"
				],
				[
					"a",
					"x1",
					"x1",
					"0",
					"-5400000"
				],
				["c"]
			]
		}]
	},
	plaquetabs: {
		adj: [],
		gd: [
			["md", "mod w h 0"],
			["dx", "*/ 1 md 20"],
			["y1", "+- 0 b dx"],
			["x1", "+- 0 r dx"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"dx",
						"t"
					],
					[
						"a",
						"dx",
						"dx",
						"0",
						"cd4"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"y1"
					],
					[
						"a",
						"dx",
						"dx",
						"3cd4",
						"cd4"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"dx"
					],
					[
						"a",
						"dx",
						"dx",
						"cd4",
						"cd4"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"x1",
						"b"
					],
					[
						"a",
						"dx",
						"dx",
						"cd2",
						"cd4"
					],
					[
						"l",
						"r",
						"b"
					],
					["c"]
				]
			}
		]
	},
	plus: {
		adj: [["adj", "val 25000"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["x1", "*/ ss a 100000"],
			["x2", "+- r 0 x1"],
			["y2", "+- b 0 x1"],
			["d", "+- w 0 h"],
			["il", "?: d l x1"],
			["ir", "?: d r x2"],
			["it", "?: d x1 t"],
			["ib", "?: d y2 b"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"x1"
				],
				[
					"l",
					"x1",
					"x1"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"x2",
					"x1"
				],
				[
					"l",
					"r",
					"x1"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x2",
					"b"
				],
				[
					"l",
					"x1",
					"b"
				],
				[
					"l",
					"x1",
					"y2"
				],
				[
					"l",
					"l",
					"y2"
				],
				["c"]
			]
		}]
	},
	quadarrow: {
		adj: [
			["adj1", "val 22500"],
			["adj2", "val 22500"],
			["adj3", "val 22500"]
		],
		gd: [
			["a2", "pin 0 adj2 50000"],
			["maxAdj1", "*/ a2 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["q1", "+- 100000 0 maxAdj1"],
			["maxAdj3", "*/ q1 1 2"],
			["a3", "pin 0 adj3 maxAdj3"],
			["x1", "*/ ss a3 100000"],
			["dx2", "*/ ss a2 100000"],
			["x2", "+- hc 0 dx2"],
			["x5", "+- hc dx2 0"],
			["dx3", "*/ ss a1 200000"],
			["x3", "+- hc 0 dx3"],
			["x4", "+- hc dx3 0"],
			["x6", "+- r 0 x1"],
			["y2", "+- vc 0 dx2"],
			["y5", "+- vc dx2 0"],
			["y3", "+- vc 0 dx3"],
			["y4", "+- vc dx3 0"],
			["y6", "+- b 0 x1"],
			["il", "*/ dx3 x1 dx2"],
			["ir", "+- r 0 il"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"x1",
					"y2"
				],
				[
					"l",
					"x1",
					"y3"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"l",
					"x3",
					"x1"
				],
				[
					"l",
					"x2",
					"x1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"x5",
					"x1"
				],
				[
					"l",
					"x4",
					"x1"
				],
				[
					"l",
					"x4",
					"y3"
				],
				[
					"l",
					"x6",
					"y3"
				],
				[
					"l",
					"x6",
					"y2"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"x6",
					"y5"
				],
				[
					"l",
					"x6",
					"y4"
				],
				[
					"l",
					"x4",
					"y4"
				],
				[
					"l",
					"x4",
					"y6"
				],
				[
					"l",
					"x5",
					"y6"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"x2",
					"y6"
				],
				[
					"l",
					"x3",
					"y6"
				],
				[
					"l",
					"x3",
					"y4"
				],
				[
					"l",
					"x1",
					"y4"
				],
				[
					"l",
					"x1",
					"y5"
				],
				["c"]
			]
		}]
	},
	quadarrowcallout: {
		adj: [
			["adj1", "val 18515"],
			["adj2", "val 18515"],
			["adj3", "val 18515"],
			["adj4", "val 48123"]
		],
		gd: [
			["a2", "pin 0 adj2 50000"],
			["maxAdj1", "*/ a2 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["maxAdj3", "+- 50000 0 a2"],
			["a3", "pin 0 adj3 maxAdj3"],
			["q2", "*/ a3 2 1"],
			["maxAdj4", "+- 100000 0 q2"],
			["a4", "pin a1 adj4 maxAdj4"],
			["dx2", "*/ ss a2 100000"],
			["dx3", "*/ ss a1 200000"],
			["ah", "*/ ss a3 100000"],
			["dx1", "*/ w a4 200000"],
			["dy1", "*/ h a4 200000"],
			["x8", "+- r 0 ah"],
			["x2", "+- hc 0 dx1"],
			["x7", "+- hc dx1 0"],
			["x3", "+- hc 0 dx2"],
			["x6", "+- hc dx2 0"],
			["x4", "+- hc 0 dx3"],
			["x5", "+- hc dx3 0"],
			["y8", "+- b 0 ah"],
			["y2", "+- vc 0 dy1"],
			["y7", "+- vc dy1 0"],
			["y3", "+- vc 0 dx2"],
			["y6", "+- vc dx2 0"],
			["y4", "+- vc 0 dx3"],
			["y5", "+- vc dx3 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"ah",
					"y3"
				],
				[
					"l",
					"ah",
					"y4"
				],
				[
					"l",
					"x2",
					"y4"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x4",
					"y2"
				],
				[
					"l",
					"x4",
					"ah"
				],
				[
					"l",
					"x3",
					"ah"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"x6",
					"ah"
				],
				[
					"l",
					"x5",
					"ah"
				],
				[
					"l",
					"x5",
					"y2"
				],
				[
					"l",
					"x7",
					"y2"
				],
				[
					"l",
					"x7",
					"y4"
				],
				[
					"l",
					"x8",
					"y4"
				],
				[
					"l",
					"x8",
					"y3"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"x8",
					"y6"
				],
				[
					"l",
					"x8",
					"y5"
				],
				[
					"l",
					"x7",
					"y5"
				],
				[
					"l",
					"x7",
					"y7"
				],
				[
					"l",
					"x5",
					"y7"
				],
				[
					"l",
					"x5",
					"y8"
				],
				[
					"l",
					"x6",
					"y8"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"x3",
					"y8"
				],
				[
					"l",
					"x4",
					"y8"
				],
				[
					"l",
					"x4",
					"y7"
				],
				[
					"l",
					"x2",
					"y7"
				],
				[
					"l",
					"x2",
					"y5"
				],
				[
					"l",
					"ah",
					"y5"
				],
				[
					"l",
					"ah",
					"y6"
				],
				["c"]
			]
		}]
	},
	ribbon: {
		adj: [["adj1", "val 16667"], ["adj2", "val 50000"]],
		gd: [
			["a1", "pin 0 adj1 33333"],
			["a2", "pin 25000 adj2 75000"],
			["x10", "+- r 0 wd8"],
			["dx2", "*/ w a2 200000"],
			["x2", "+- hc 0 dx2"],
			["x9", "+- hc dx2 0"],
			["x3", "+- x2 wd32 0"],
			["x8", "+- x9 0 wd32"],
			["x5", "+- x2 wd8 0"],
			["x6", "+- x9 0 wd8"],
			["x4", "+- x5 0 wd32"],
			["x7", "+- x6 wd32 0"],
			["y1", "*/ h a1 200000"],
			["y2", "*/ h a1 100000"],
			["y4", "+- b 0 y2"],
			["y3", "*/ y4 1 2"],
			["hR", "*/ h a1 400000"],
			["y5", "+- b 0 hR"],
			["y6", "+- y2 0 hR"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"x4",
						"t"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"cd2"
					],
					[
						"l",
						"x3",
						"y1"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"-10800000"
					],
					[
						"l",
						"x8",
						"y2"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"-10800000"
					],
					[
						"l",
						"x7",
						"y1"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"cd2"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"x10",
						"y3"
					],
					[
						"l",
						"r",
						"y4"
					],
					[
						"l",
						"x9",
						"y4"
					],
					[
						"l",
						"x9",
						"y5"
					],
					[
						"a",
						"wd32",
						"hR",
						"0",
						"cd4"
					],
					[
						"l",
						"x3",
						"b"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"cd4"
					],
					[
						"l",
						"x2",
						"y4"
					],
					[
						"l",
						"l",
						"y4"
					],
					[
						"l",
						"wd8",
						"y3"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x5",
						"hR"
					],
					[
						"a",
						"wd32",
						"hR",
						"0",
						"cd4"
					],
					[
						"l",
						"x3",
						"y1"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"-10800000"
					],
					[
						"l",
						"x5",
						"y2"
					],
					["c"],
					[
						"m",
						"x6",
						"hR"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd2",
						"-5400000"
					],
					[
						"l",
						"x8",
						"y1"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"cd2"
					],
					[
						"l",
						"x6",
						"y2"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"x4",
						"t"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"cd2"
					],
					[
						"l",
						"x3",
						"y1"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"-10800000"
					],
					[
						"l",
						"x8",
						"y2"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"-10800000"
					],
					[
						"l",
						"x7",
						"y1"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"cd2"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"x10",
						"y3"
					],
					[
						"l",
						"r",
						"y4"
					],
					[
						"l",
						"x9",
						"y4"
					],
					[
						"l",
						"x9",
						"y5"
					],
					[
						"a",
						"wd32",
						"hR",
						"0",
						"cd4"
					],
					[
						"l",
						"x3",
						"b"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"cd4"
					],
					[
						"l",
						"x2",
						"y4"
					],
					[
						"l",
						"l",
						"y4"
					],
					[
						"l",
						"wd8",
						"y3"
					],
					["c"],
					[
						"m",
						"x5",
						"hR"
					],
					[
						"l",
						"x5",
						"y2"
					],
					[
						"m",
						"x6",
						"y2"
					],
					[
						"l",
						"x6",
						"hR"
					],
					[
						"m",
						"x2",
						"y4"
					],
					[
						"l",
						"x2",
						"y6"
					],
					[
						"m",
						"x9",
						"y6"
					],
					[
						"l",
						"x9",
						"y4"
					]
				]
			}
		]
	},
	ribbon2: {
		adj: [["adj1", "val 16667"], ["adj2", "val 50000"]],
		gd: [
			["a1", "pin 0 adj1 33333"],
			["a2", "pin 25000 adj2 75000"],
			["x10", "+- r 0 wd8"],
			["dx2", "*/ w a2 200000"],
			["x2", "+- hc 0 dx2"],
			["x9", "+- hc dx2 0"],
			["x3", "+- x2 wd32 0"],
			["x8", "+- x9 0 wd32"],
			["x5", "+- x2 wd8 0"],
			["x6", "+- x9 0 wd8"],
			["x4", "+- x5 0 wd32"],
			["x7", "+- x6 wd32 0"],
			["dy1", "*/ h a1 200000"],
			["y1", "+- b 0 dy1"],
			["dy2", "*/ h a1 100000"],
			["y2", "+- b 0 dy2"],
			["y4", "+- t dy2 0"],
			["y3", "+/ y4 b 2"],
			["hR", "*/ h a1 400000"],
			["y6", "+- b 0 hR"],
			["y7", "+- y1 0 hR"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"b"
					],
					[
						"l",
						"x4",
						"b"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"-10800000"
					],
					[
						"l",
						"x3",
						"y1"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"cd2"
					],
					[
						"l",
						"x8",
						"y2"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"cd2"
					],
					[
						"l",
						"x7",
						"y1"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"-10800000"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"x10",
						"y3"
					],
					[
						"l",
						"r",
						"y4"
					],
					[
						"l",
						"x9",
						"y4"
					],
					[
						"l",
						"x9",
						"hR"
					],
					[
						"a",
						"wd32",
						"hR",
						"0",
						"-5400000"
					],
					[
						"l",
						"x3",
						"t"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"-5400000"
					],
					[
						"l",
						"x2",
						"y4"
					],
					[
						"l",
						"l",
						"y4"
					],
					[
						"l",
						"wd8",
						"y3"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x5",
						"y6"
					],
					[
						"a",
						"wd32",
						"hR",
						"0",
						"-5400000"
					],
					[
						"l",
						"x3",
						"y1"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"cd2"
					],
					[
						"l",
						"x5",
						"y2"
					],
					["c"],
					[
						"m",
						"x6",
						"y6"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd2",
						"cd4"
					],
					[
						"l",
						"x8",
						"y1"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"-10800000"
					],
					[
						"l",
						"x6",
						"y2"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"b"
					],
					[
						"l",
						"wd8",
						"y3"
					],
					[
						"l",
						"l",
						"y4"
					],
					[
						"l",
						"x2",
						"y4"
					],
					[
						"l",
						"x2",
						"hR"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd2",
						"cd4"
					],
					[
						"l",
						"x8",
						"t"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"cd4"
					],
					[
						"l",
						"x9",
						"y4"
					],
					[
						"l",
						"x9",
						"y4"
					],
					[
						"l",
						"r",
						"y4"
					],
					[
						"l",
						"x10",
						"y3"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"x7",
						"b"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"cd2"
					],
					[
						"l",
						"x8",
						"y1"
					],
					[
						"a",
						"wd32",
						"hR",
						"cd4",
						"-10800000"
					],
					[
						"l",
						"x3",
						"y2"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"-10800000"
					],
					[
						"l",
						"x4",
						"y1"
					],
					[
						"a",
						"wd32",
						"hR",
						"3cd4",
						"cd2"
					],
					["c"],
					[
						"m",
						"x5",
						"y2"
					],
					[
						"l",
						"x5",
						"y6"
					],
					[
						"m",
						"x6",
						"y6"
					],
					[
						"l",
						"x6",
						"y2"
					],
					[
						"m",
						"x2",
						"y7"
					],
					[
						"l",
						"x2",
						"y4"
					],
					[
						"m",
						"x9",
						"y4"
					],
					[
						"l",
						"x9",
						"y7"
					]
				]
			}
		]
	},
	rightarrow: {
		adj: [["adj1", "val 50000"], ["adj2", "val 50000"]],
		gd: [
			["maxAdj2", "*/ 100000 w ss"],
			["a1", "pin 0 adj1 100000"],
			["a2", "pin 0 adj2 maxAdj2"],
			["dx1", "*/ ss a2 100000"],
			["x1", "+- r 0 dx1"],
			["dy1", "*/ h a1 200000"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc dy1 0"],
			["dx2", "*/ y1 dx1 hd2"],
			["x2", "+- x1 dx2 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y1"
				],
				[
					"l",
					"x1",
					"y1"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"x1",
					"b"
				],
				[
					"l",
					"x1",
					"y2"
				],
				[
					"l",
					"l",
					"y2"
				],
				["c"]
			]
		}]
	},
	rightarrowcallout: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 25000"],
			["adj3", "val 25000"],
			["adj4", "val 64977"]
		],
		gd: [
			["maxAdj2", "*/ 50000 h ss"],
			["a2", "pin 0 adj2 maxAdj2"],
			["maxAdj1", "*/ a2 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["maxAdj3", "*/ 100000 w ss"],
			["a3", "pin 0 adj3 maxAdj3"],
			["q2", "*/ a3 ss w"],
			["maxAdj4", "+- 100000 0 q2"],
			["a4", "pin 0 adj4 maxAdj4"],
			["dy1", "*/ ss a2 100000"],
			["dy2", "*/ ss a1 200000"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc 0 dy2"],
			["y3", "+- vc dy2 0"],
			["y4", "+- vc dy1 0"],
			["dx3", "*/ ss a3 100000"],
			["x3", "+- r 0 dx3"],
			["x2", "*/ w a4 100000"],
			["x1", "*/ x2 1 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x3",
					"y2"
				],
				[
					"l",
					"x3",
					"y1"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"x3",
					"y4"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"l",
					"x2",
					"y3"
				],
				[
					"l",
					"x2",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}]
	},
	rightbrace: {
		adj: [["adj1", "val 8333"], ["adj2", "val 50000"]],
		gd: [
			["a2", "pin 0 adj2 100000"],
			["q1", "+- 100000 0 a2"],
			["q2", "min q1 a2"],
			["q3", "*/ q2 1 2"],
			["maxAdj1", "*/ q3 h ss"],
			["a1", "pin 0 adj1 maxAdj1"],
			["y1", "*/ ss a1 100000"],
			["y3", "*/ h a2 100000"],
			["y2", "+- y3 0 y1"],
			["y4", "+- b 0 y1"],
			["dx1", "cos wd2 2700000"],
			["dy1", "sin y1 2700000"],
			["ir", "+- l dx1 0"],
			["it", "+- y1 0 dy1"],
			["ib", "+- b dy1 y1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !1,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"a",
					"wd2",
					"y1",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"hc",
					"y2"
				],
				[
					"a",
					"wd2",
					"y1",
					"cd2",
					"-5400000"
				],
				[
					"a",
					"wd2",
					"y1",
					"3cd4",
					"-5400000"
				],
				[
					"l",
					"hc",
					"y4"
				],
				[
					"a",
					"wd2",
					"y1",
					"0",
					"cd4"
				],
				["c"]
			]
		}, {
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"a",
					"wd2",
					"y1",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"hc",
					"y2"
				],
				[
					"a",
					"wd2",
					"y1",
					"cd2",
					"-5400000"
				],
				[
					"a",
					"wd2",
					"y1",
					"3cd4",
					"-5400000"
				],
				[
					"l",
					"hc",
					"y4"
				],
				[
					"a",
					"wd2",
					"y1",
					"0",
					"cd4"
				]
			]
		}]
	},
	rightbracket: {
		adj: [["adj", "val 8333"]],
		gd: [
			["maxAdj", "*/ 50000 h ss"],
			["a", "pin 0 adj maxAdj"],
			["y1", "*/ ss a 100000"],
			["y2", "+- b 0 y1"],
			["dx1", "cos w 2700000"],
			["dy1", "sin y1 2700000"],
			["ir", "+- l dx1 0"],
			["it", "+- y1 0 dy1"],
			["ib", "+- b dy1 y1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !1,
			extrusionOk: !1,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"a",
					"w",
					"y1",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"a",
					"w",
					"y1",
					"0",
					"cd4"
				],
				["c"]
			]
		}, {
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"a",
					"w",
					"y1",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"a",
					"w",
					"y1",
					"0",
					"cd4"
				]
			]
		}]
	},
	round1rect: {
		adj: [["adj", "val 16667"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["dx1", "*/ ss a 100000"],
			["x1", "+- r 0 dx1"],
			["idx", "*/ dx1 29289 100000"],
			["ir", "+- r 0 idx"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"a",
					"dx1",
					"dx1",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}]
	},
	round2diagrect: {
		adj: [["adj1", "val 16667"], ["adj2", "val 0"]],
		gd: [
			["a1", "pin 0 adj1 50000"],
			["a2", "pin 0 adj2 50000"],
			["x1", "*/ ss a1 100000"],
			["y1", "+- b 0 x1"],
			["a", "*/ ss a2 100000"],
			["x2", "+- r 0 a"],
			["y2", "+- b 0 a"],
			["dx1", "*/ x1 29289 100000"],
			["dx2", "*/ a 29289 100000"],
			["d", "+- dx1 0 dx2"],
			["dx", "?: d dx1 dx2"],
			["ir", "+- r 0 dx"],
			["ib", "+- b 0 dx"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"t"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"a",
					"a",
					"a",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"r",
					"y1"
				],
				[
					"a",
					"x1",
					"x1",
					"0",
					"cd4"
				],
				[
					"l",
					"a",
					"b"
				],
				[
					"a",
					"a",
					"a",
					"cd4",
					"cd4"
				],
				[
					"l",
					"l",
					"x1"
				],
				[
					"a",
					"x1",
					"x1",
					"cd2",
					"cd4"
				],
				["c"]
			]
		}]
	},
	round2samerect: {
		adj: [["adj1", "val 16667"], ["adj2", "val 0"]],
		gd: [
			["a1", "pin 0 adj1 50000"],
			["a2", "pin 0 adj2 50000"],
			["tx1", "*/ ss a1 100000"],
			["tx2", "+- r 0 tx1"],
			["bx1", "*/ ss a2 100000"],
			["bx2", "+- r 0 bx1"],
			["by1", "+- b 0 bx1"],
			["d", "+- tx1 0 bx1"],
			["tdx", "*/ tx1 29289 100000"],
			["bdx", "*/ bx1 29289 100000"],
			["il", "?: d tdx bdx"],
			["ir", "+- r 0 il"],
			["ib", "+- b 0 bdx"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"tx1",
					"t"
				],
				[
					"l",
					"tx2",
					"t"
				],
				[
					"a",
					"tx1",
					"tx1",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"r",
					"by1"
				],
				[
					"a",
					"bx1",
					"bx1",
					"0",
					"cd4"
				],
				[
					"l",
					"bx1",
					"b"
				],
				[
					"a",
					"bx1",
					"bx1",
					"cd4",
					"cd4"
				],
				[
					"l",
					"l",
					"tx1"
				],
				[
					"a",
					"tx1",
					"tx1",
					"cd2",
					"cd4"
				],
				["c"]
			]
		}]
	},
	roundrect: {
		adj: [["adj", "val 16667"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["x1", "*/ ss a 100000"],
			["x2", "+- r 0 x1"],
			["y2", "+- b 0 x1"],
			["il", "*/ x1 29289 100000"],
			["ir", "+- r 0 il"],
			["ib", "+- b 0 il"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"x1"
				],
				[
					"a",
					"x1",
					"x1",
					"cd2",
					"cd4"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"a",
					"x1",
					"x1",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"a",
					"x1",
					"x1",
					"0",
					"cd4"
				],
				[
					"l",
					"x1",
					"b"
				],
				[
					"a",
					"x1",
					"x1",
					"cd4",
					"cd4"
				],
				["c"]
			]
		}]
	},
	rttriangle: {
		adj: [],
		gd: [
			["it", "*/ h 7 12"],
			["ir", "*/ w 7 12"],
			["ib", "*/ h 11 12"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"b"
				],
				[
					"l",
					"l",
					"t"
				],
				[
					"l",
					"r",
					"b"
				],
				["c"]
			]
		}]
	},
	smileyface: {
		adj: [["adj", "val 4653"]],
		gd: [
			["a", "pin -4653 adj 4653"],
			["x1", "*/ w 4969 21699"],
			["x2", "*/ w 6215 21600"],
			["x3", "*/ w 13135 21600"],
			["x4", "*/ w 16640 21600"],
			["y1", "*/ h 7570 21600"],
			["y3", "*/ h 16515 21600"],
			["dy2", "*/ h a 100000"],
			["y2", "+- y3 0 dy2"],
			["y4", "+- y3 dy2 0"],
			["dy3", "*/ h a 50000"],
			["y5", "+- y4 dy3 0"],
			["idx", "cos wd2 2700000"],
			["idy", "sin hd2 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"],
			["wR", "*/ w 1125 21600"],
			["hR", "*/ h 1125 21600"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"l",
						"vc"
					],
					[
						"a",
						"wd2",
						"hd2",
						"cd2",
						"21600000"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x2",
						"y1"
					],
					[
						"a",
						"wR",
						"hR",
						"cd2",
						"21600000"
					],
					[
						"m",
						"x3",
						"y1"
					],
					[
						"a",
						"wR",
						"hR",
						"cd2",
						"21600000"
					]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [[
					"m",
					"x1",
					"y2"
				], [
					"Q",
					"hc",
					"y5",
					"x4",
					"y2"
				]]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"vc"
					],
					[
						"a",
						"wd2",
						"hd2",
						"cd2",
						"21600000"
					],
					["c"]
				]
			}
		]
	},
	snip1rect: {
		adj: [["adj", "val 16667"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["dx1", "*/ ss a 100000"],
			["x1", "+- r 0 dx1"],
			["it", "*/ dx1 1 2"],
			["ir", "+/ x1 r 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"l",
					"r",
					"dx1"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}]
	},
	snip2diagrect: {
		adj: [["adj1", "val 0"], ["adj2", "val 16667"]],
		gd: [
			["a1", "pin 0 adj1 50000"],
			["a2", "pin 0 adj2 50000"],
			["lx1", "*/ ss a1 100000"],
			["lx2", "+- r 0 lx1"],
			["ly1", "+- b 0 lx1"],
			["rx1", "*/ ss a2 100000"],
			["rx2", "+- r 0 rx1"],
			["ry1", "+- b 0 rx1"],
			["d", "+- lx1 0 rx1"],
			["dx", "?: d lx1 rx1"],
			["il", "*/ dx 1 2"],
			["ir", "+- r 0 il"],
			["ib", "+- b 0 il"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"lx1",
					"t"
				],
				[
					"l",
					"rx2",
					"t"
				],
				[
					"l",
					"r",
					"rx1"
				],
				[
					"l",
					"r",
					"ly1"
				],
				[
					"l",
					"lx2",
					"b"
				],
				[
					"l",
					"rx1",
					"b"
				],
				[
					"l",
					"l",
					"ry1"
				],
				[
					"l",
					"l",
					"lx1"
				],
				["c"]
			]
		}]
	},
	snip2samerect: {
		adj: [["adj1", "val 16667"], ["adj2", "val 0"]],
		gd: [
			["a1", "pin 0 adj1 50000"],
			["a2", "pin 0 adj2 50000"],
			["tx1", "*/ ss a1 100000"],
			["tx2", "+- r 0 tx1"],
			["bx1", "*/ ss a2 100000"],
			["bx2", "+- r 0 bx1"],
			["by1", "+- b 0 bx1"],
			["d", "+- tx1 0 bx1"],
			["dx", "?: d tx1 bx1"],
			["il", "*/ dx 1 2"],
			["ir", "+- r 0 il"],
			["it", "*/ tx1 1 2"],
			["ib", "+/ by1 b 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"tx1",
					"t"
				],
				[
					"l",
					"tx2",
					"t"
				],
				[
					"l",
					"r",
					"tx1"
				],
				[
					"l",
					"r",
					"by1"
				],
				[
					"l",
					"bx2",
					"b"
				],
				[
					"l",
					"bx1",
					"b"
				],
				[
					"l",
					"l",
					"by1"
				],
				[
					"l",
					"l",
					"tx1"
				],
				["c"]
			]
		}]
	},
	sniproundrect: {
		adj: [["adj1", "val 16667"], ["adj2", "val 16667"]],
		gd: [
			["a1", "pin 0 adj1 50000"],
			["a2", "pin 0 adj2 50000"],
			["x1", "*/ ss a1 100000"],
			["dx2", "*/ ss a2 100000"],
			["x2", "+- r 0 dx2"],
			["il", "*/ x1 29289 100000"],
			["ir", "+/ x2 r 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"t"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"r",
					"dx2"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				[
					"l",
					"l",
					"x1"
				],
				[
					"a",
					"x1",
					"x1",
					"cd2",
					"cd4"
				],
				["c"]
			]
		}]
	},
	squaretabs: {
		adj: [],
		gd: [
			["md", "mod w h 0"],
			["dx", "*/ 1 md 20"],
			["y1", "+- 0 b dx"],
			["x1", "+- 0 r dx"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"t"
					],
					[
						"l",
						"dx",
						"t"
					],
					[
						"l",
						"dx",
						"dx"
					],
					[
						"l",
						"l",
						"dx"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"l",
						"y1"
					],
					[
						"l",
						"dx",
						"y1"
					],
					[
						"l",
						"dx",
						"b"
					],
					[
						"l",
						"l",
						"b"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"x1",
						"t"
					],
					[
						"l",
						"r",
						"t"
					],
					[
						"l",
						"r",
						"dx"
					],
					[
						"l",
						"x1",
						"dx"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [
					[
						"m",
						"x1",
						"y1"
					],
					[
						"l",
						"r",
						"y1"
					],
					[
						"l",
						"r",
						"b"
					],
					[
						"l",
						"x1",
						"b"
					],
					["c"]
				]
			}
		]
	},
	star10: {
		adj: [["adj", "val 42533"], ["hf", "val 105146"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["swd2", "*/ wd2 hf 100000"],
			["dx1", "*/ swd2 95106 100000"],
			["dx2", "*/ swd2 58779 100000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc dx2 0"],
			["x4", "+- hc dx1 0"],
			["dy1", "*/ hd2 80902 100000"],
			["dy2", "*/ hd2 30902 100000"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc 0 dy2"],
			["y3", "+- vc dy2 0"],
			["y4", "+- vc dy1 0"],
			["iwd2", "*/ swd2 a 50000"],
			["ihd2", "*/ hd2 a 50000"],
			["sdx1", "*/ iwd2 80902 100000"],
			["sdx2", "*/ iwd2 30902 100000"],
			["sdy1", "*/ ihd2 95106 100000"],
			["sdy2", "*/ ihd2 58779 100000"],
			["sx1", "+- hc 0 iwd2"],
			["sx2", "+- hc 0 sdx1"],
			["sx3", "+- hc 0 sdx2"],
			["sx4", "+- hc sdx2 0"],
			["sx5", "+- hc sdx1 0"],
			["sx6", "+- hc iwd2 0"],
			["sy1", "+- vc 0 sdy1"],
			["sy2", "+- vc 0 sdy2"],
			["sy3", "+- vc sdy2 0"],
			["sy4", "+- vc sdy1 0"],
			["yAdj", "+- vc 0 ihd2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"y2"
				],
				[
					"l",
					"sx2",
					"sy2"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"sx3",
					"sy1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"sx4",
					"sy1"
				],
				[
					"l",
					"x3",
					"y1"
				],
				[
					"l",
					"sx5",
					"sy2"
				],
				[
					"l",
					"x4",
					"y2"
				],
				[
					"l",
					"sx6",
					"vc"
				],
				[
					"l",
					"x4",
					"y3"
				],
				[
					"l",
					"sx5",
					"sy3"
				],
				[
					"l",
					"x3",
					"y4"
				],
				[
					"l",
					"sx4",
					"sy4"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"sx3",
					"sy4"
				],
				[
					"l",
					"x2",
					"y4"
				],
				[
					"l",
					"sx2",
					"sy3"
				],
				[
					"l",
					"x1",
					"y3"
				],
				[
					"l",
					"sx1",
					"vc"
				],
				["c"]
			]
		}]
	},
	star12: {
		adj: [["adj", "val 37500"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["dx1", "cos wd2 1800000"],
			["dy1", "sin hd2 3600000"],
			["x1", "+- hc 0 dx1"],
			["x3", "*/ w 3 4"],
			["x4", "+- hc dx1 0"],
			["y1", "+- vc 0 dy1"],
			["y3", "*/ h 3 4"],
			["y4", "+- vc dy1 0"],
			["iwd2", "*/ wd2 a 50000"],
			["ihd2", "*/ hd2 a 50000"],
			["sdx1", "cos iwd2 900000"],
			["sdx2", "cos iwd2 2700000"],
			["sdx3", "cos iwd2 4500000"],
			["sdy1", "sin ihd2 4500000"],
			["sdy2", "sin ihd2 2700000"],
			["sdy3", "sin ihd2 900000"],
			["sx1", "+- hc 0 sdx1"],
			["sx2", "+- hc 0 sdx2"],
			["sx3", "+- hc 0 sdx3"],
			["sx4", "+- hc sdx3 0"],
			["sx5", "+- hc sdx2 0"],
			["sx6", "+- hc sdx1 0"],
			["sy1", "+- vc 0 sdy1"],
			["sy2", "+- vc 0 sdy2"],
			["sy3", "+- vc 0 sdy3"],
			["sy4", "+- vc sdy3 0"],
			["sy5", "+- vc sdy2 0"],
			["sy6", "+- vc sdy1 0"],
			["yAdj", "+- vc 0 ihd2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"sx1",
					"sy3"
				],
				[
					"l",
					"x1",
					"hd4"
				],
				[
					"l",
					"sx2",
					"sy2"
				],
				[
					"l",
					"wd4",
					"y1"
				],
				[
					"l",
					"sx3",
					"sy1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"sx4",
					"sy1"
				],
				[
					"l",
					"x3",
					"y1"
				],
				[
					"l",
					"sx5",
					"sy2"
				],
				[
					"l",
					"x4",
					"hd4"
				],
				[
					"l",
					"sx6",
					"sy3"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"sx6",
					"sy4"
				],
				[
					"l",
					"x4",
					"y3"
				],
				[
					"l",
					"sx5",
					"sy5"
				],
				[
					"l",
					"x3",
					"y4"
				],
				[
					"l",
					"sx4",
					"sy6"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"sx3",
					"sy6"
				],
				[
					"l",
					"wd4",
					"y4"
				],
				[
					"l",
					"sx2",
					"sy5"
				],
				[
					"l",
					"x1",
					"y3"
				],
				[
					"l",
					"sx1",
					"sy4"
				],
				["c"]
			]
		}]
	},
	star16: {
		adj: [["adj", "val 37500"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["dx1", "*/ wd2 92388 100000"],
			["dx2", "*/ wd2 70711 100000"],
			["dx3", "*/ wd2 38268 100000"],
			["dy1", "*/ hd2 92388 100000"],
			["dy2", "*/ hd2 70711 100000"],
			["dy3", "*/ hd2 38268 100000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc 0 dx3"],
			["x4", "+- hc dx3 0"],
			["x5", "+- hc dx2 0"],
			["x6", "+- hc dx1 0"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc 0 dy2"],
			["y3", "+- vc 0 dy3"],
			["y4", "+- vc dy3 0"],
			["y5", "+- vc dy2 0"],
			["y6", "+- vc dy1 0"],
			["iwd2", "*/ wd2 a 50000"],
			["ihd2", "*/ hd2 a 50000"],
			["sdx1", "*/ iwd2 98079 100000"],
			["sdx2", "*/ iwd2 83147 100000"],
			["sdx3", "*/ iwd2 55557 100000"],
			["sdx4", "*/ iwd2 19509 100000"],
			["sdy1", "*/ ihd2 98079 100000"],
			["sdy2", "*/ ihd2 83147 100000"],
			["sdy3", "*/ ihd2 55557 100000"],
			["sdy4", "*/ ihd2 19509 100000"],
			["sx1", "+- hc 0 sdx1"],
			["sx2", "+- hc 0 sdx2"],
			["sx3", "+- hc 0 sdx3"],
			["sx4", "+- hc 0 sdx4"],
			["sx5", "+- hc sdx4 0"],
			["sx6", "+- hc sdx3 0"],
			["sx7", "+- hc sdx2 0"],
			["sx8", "+- hc sdx1 0"],
			["sy1", "+- vc 0 sdy1"],
			["sy2", "+- vc 0 sdy2"],
			["sy3", "+- vc 0 sdy3"],
			["sy4", "+- vc 0 sdy4"],
			["sy5", "+- vc sdy4 0"],
			["sy6", "+- vc sdy3 0"],
			["sy7", "+- vc sdy2 0"],
			["sy8", "+- vc sdy1 0"],
			["idx", "cos iwd2 2700000"],
			["idy", "sin ihd2 2700000"],
			["il", "+- hc 0 idx"],
			["it", "+- vc 0 idy"],
			["ir", "+- hc idx 0"],
			["ib", "+- vc idy 0"],
			["yAdj", "+- vc 0 ihd2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"sx1",
					"sy4"
				],
				[
					"l",
					"x1",
					"y3"
				],
				[
					"l",
					"sx2",
					"sy3"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"sx3",
					"sy2"
				],
				[
					"l",
					"x3",
					"y1"
				],
				[
					"l",
					"sx4",
					"sy1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"sx5",
					"sy1"
				],
				[
					"l",
					"x4",
					"y1"
				],
				[
					"l",
					"sx6",
					"sy2"
				],
				[
					"l",
					"x5",
					"y2"
				],
				[
					"l",
					"sx7",
					"sy3"
				],
				[
					"l",
					"x6",
					"y3"
				],
				[
					"l",
					"sx8",
					"sy4"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"sx8",
					"sy5"
				],
				[
					"l",
					"x6",
					"y4"
				],
				[
					"l",
					"sx7",
					"sy6"
				],
				[
					"l",
					"x5",
					"y5"
				],
				[
					"l",
					"sx6",
					"sy7"
				],
				[
					"l",
					"x4",
					"y6"
				],
				[
					"l",
					"sx5",
					"sy8"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"sx4",
					"sy8"
				],
				[
					"l",
					"x3",
					"y6"
				],
				[
					"l",
					"sx3",
					"sy7"
				],
				[
					"l",
					"x2",
					"y5"
				],
				[
					"l",
					"sx2",
					"sy6"
				],
				[
					"l",
					"x1",
					"y4"
				],
				[
					"l",
					"sx1",
					"sy5"
				],
				["c"]
			]
		}]
	},
	star24: {
		adj: [["adj", "val 37500"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["dx1", "cos wd2 900000"],
			["dx2", "cos wd2 1800000"],
			["dx3", "cos wd2 2700000"],
			["dx4", "val wd4"],
			["dx5", "cos wd2 4500000"],
			["dy1", "sin hd2 4500000"],
			["dy2", "sin hd2 3600000"],
			["dy3", "sin hd2 2700000"],
			["dy4", "val hd4"],
			["dy5", "sin hd2 900000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc 0 dx3"],
			["x4", "+- hc 0 dx4"],
			["x5", "+- hc 0 dx5"],
			["x6", "+- hc dx5 0"],
			["x7", "+- hc dx4 0"],
			["x8", "+- hc dx3 0"],
			["x9", "+- hc dx2 0"],
			["x10", "+- hc dx1 0"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc 0 dy2"],
			["y3", "+- vc 0 dy3"],
			["y4", "+- vc 0 dy4"],
			["y5", "+- vc 0 dy5"],
			["y6", "+- vc dy5 0"],
			["y7", "+- vc dy4 0"],
			["y8", "+- vc dy3 0"],
			["y9", "+- vc dy2 0"],
			["y10", "+- vc dy1 0"],
			["iwd2", "*/ wd2 a 50000"],
			["ihd2", "*/ hd2 a 50000"],
			["sdx1", "*/ iwd2 99144 100000"],
			["sdx2", "*/ iwd2 92388 100000"],
			["sdx3", "*/ iwd2 79335 100000"],
			["sdx4", "*/ iwd2 60876 100000"],
			["sdx5", "*/ iwd2 38268 100000"],
			["sdx6", "*/ iwd2 13053 100000"],
			["sdy1", "*/ ihd2 99144 100000"],
			["sdy2", "*/ ihd2 92388 100000"],
			["sdy3", "*/ ihd2 79335 100000"],
			["sdy4", "*/ ihd2 60876 100000"],
			["sdy5", "*/ ihd2 38268 100000"],
			["sdy6", "*/ ihd2 13053 100000"],
			["sx1", "+- hc 0 sdx1"],
			["sx2", "+- hc 0 sdx2"],
			["sx3", "+- hc 0 sdx3"],
			["sx4", "+- hc 0 sdx4"],
			["sx5", "+- hc 0 sdx5"],
			["sx6", "+- hc 0 sdx6"],
			["sx7", "+- hc sdx6 0"],
			["sx8", "+- hc sdx5 0"],
			["sx9", "+- hc sdx4 0"],
			["sx10", "+- hc sdx3 0"],
			["sx11", "+- hc sdx2 0"],
			["sx12", "+- hc sdx1 0"],
			["sy1", "+- vc 0 sdy1"],
			["sy2", "+- vc 0 sdy2"],
			["sy3", "+- vc 0 sdy3"],
			["sy4", "+- vc 0 sdy4"],
			["sy5", "+- vc 0 sdy5"],
			["sy6", "+- vc 0 sdy6"],
			["sy7", "+- vc sdy6 0"],
			["sy8", "+- vc sdy5 0"],
			["sy9", "+- vc sdy4 0"],
			["sy10", "+- vc sdy3 0"],
			["sy11", "+- vc sdy2 0"],
			["sy12", "+- vc sdy1 0"],
			["idx", "cos iwd2 2700000"],
			["idy", "sin ihd2 2700000"],
			["il", "+- hc 0 idx"],
			["it", "+- vc 0 idy"],
			["ir", "+- hc idx 0"],
			["ib", "+- vc idy 0"],
			["yAdj", "+- vc 0 ihd2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"sx1",
					"sy6"
				],
				[
					"l",
					"x1",
					"y5"
				],
				[
					"l",
					"sx2",
					"sy5"
				],
				[
					"l",
					"x2",
					"y4"
				],
				[
					"l",
					"sx3",
					"sy4"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"l",
					"sx4",
					"sy3"
				],
				[
					"l",
					"x4",
					"y2"
				],
				[
					"l",
					"sx5",
					"sy2"
				],
				[
					"l",
					"x5",
					"y1"
				],
				[
					"l",
					"sx6",
					"sy1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"sx7",
					"sy1"
				],
				[
					"l",
					"x6",
					"y1"
				],
				[
					"l",
					"sx8",
					"sy2"
				],
				[
					"l",
					"x7",
					"y2"
				],
				[
					"l",
					"sx9",
					"sy3"
				],
				[
					"l",
					"x8",
					"y3"
				],
				[
					"l",
					"sx10",
					"sy4"
				],
				[
					"l",
					"x9",
					"y4"
				],
				[
					"l",
					"sx11",
					"sy5"
				],
				[
					"l",
					"x10",
					"y5"
				],
				[
					"l",
					"sx12",
					"sy6"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"sx12",
					"sy7"
				],
				[
					"l",
					"x10",
					"y6"
				],
				[
					"l",
					"sx11",
					"sy8"
				],
				[
					"l",
					"x9",
					"y7"
				],
				[
					"l",
					"sx10",
					"sy9"
				],
				[
					"l",
					"x8",
					"y8"
				],
				[
					"l",
					"sx9",
					"sy10"
				],
				[
					"l",
					"x7",
					"y9"
				],
				[
					"l",
					"sx8",
					"sy11"
				],
				[
					"l",
					"x6",
					"y10"
				],
				[
					"l",
					"sx7",
					"sy12"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"sx6",
					"sy12"
				],
				[
					"l",
					"x5",
					"y10"
				],
				[
					"l",
					"sx5",
					"sy11"
				],
				[
					"l",
					"x4",
					"y9"
				],
				[
					"l",
					"sx4",
					"sy10"
				],
				[
					"l",
					"x3",
					"y8"
				],
				[
					"l",
					"sx3",
					"sy9"
				],
				[
					"l",
					"x2",
					"y7"
				],
				[
					"l",
					"sx2",
					"sy8"
				],
				[
					"l",
					"x1",
					"y6"
				],
				[
					"l",
					"sx1",
					"sy7"
				],
				["c"]
			]
		}]
	},
	star32: {
		adj: [["adj", "val 37500"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["dx1", "*/ wd2 98079 100000"],
			["dx2", "*/ wd2 92388 100000"],
			["dx3", "*/ wd2 83147 100000"],
			["dx4", "cos wd2 2700000"],
			["dx5", "*/ wd2 55557 100000"],
			["dx6", "*/ wd2 38268 100000"],
			["dx7", "*/ wd2 19509 100000"],
			["dy1", "*/ hd2 98079 100000"],
			["dy2", "*/ hd2 92388 100000"],
			["dy3", "*/ hd2 83147 100000"],
			["dy4", "sin hd2 2700000"],
			["dy5", "*/ hd2 55557 100000"],
			["dy6", "*/ hd2 38268 100000"],
			["dy7", "*/ hd2 19509 100000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc 0 dx3"],
			["x4", "+- hc 0 dx4"],
			["x5", "+- hc 0 dx5"],
			["x6", "+- hc 0 dx6"],
			["x7", "+- hc 0 dx7"],
			["x8", "+- hc dx7 0"],
			["x9", "+- hc dx6 0"],
			["x10", "+- hc dx5 0"],
			["x11", "+- hc dx4 0"],
			["x12", "+- hc dx3 0"],
			["x13", "+- hc dx2 0"],
			["x14", "+- hc dx1 0"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc 0 dy2"],
			["y3", "+- vc 0 dy3"],
			["y4", "+- vc 0 dy4"],
			["y5", "+- vc 0 dy5"],
			["y6", "+- vc 0 dy6"],
			["y7", "+- vc 0 dy7"],
			["y8", "+- vc dy7 0"],
			["y9", "+- vc dy6 0"],
			["y10", "+- vc dy5 0"],
			["y11", "+- vc dy4 0"],
			["y12", "+- vc dy3 0"],
			["y13", "+- vc dy2 0"],
			["y14", "+- vc dy1 0"],
			["iwd2", "*/ wd2 a 50000"],
			["ihd2", "*/ hd2 a 50000"],
			["sdx1", "*/ iwd2 99518 100000"],
			["sdx2", "*/ iwd2 95694 100000"],
			["sdx3", "*/ iwd2 88192 100000"],
			["sdx4", "*/ iwd2 77301 100000"],
			["sdx5", "*/ iwd2 63439 100000"],
			["sdx6", "*/ iwd2 47140 100000"],
			["sdx7", "*/ iwd2 29028 100000"],
			["sdx8", "*/ iwd2 9802 100000"],
			["sdy1", "*/ ihd2 99518 100000"],
			["sdy2", "*/ ihd2 95694 100000"],
			["sdy3", "*/ ihd2 88192 100000"],
			["sdy4", "*/ ihd2 77301 100000"],
			["sdy5", "*/ ihd2 63439 100000"],
			["sdy6", "*/ ihd2 47140 100000"],
			["sdy7", "*/ ihd2 29028 100000"],
			["sdy8", "*/ ihd2 9802 100000"],
			["sx1", "+- hc 0 sdx1"],
			["sx2", "+- hc 0 sdx2"],
			["sx3", "+- hc 0 sdx3"],
			["sx4", "+- hc 0 sdx4"],
			["sx5", "+- hc 0 sdx5"],
			["sx6", "+- hc 0 sdx6"],
			["sx7", "+- hc 0 sdx7"],
			["sx8", "+- hc 0 sdx8"],
			["sx9", "+- hc sdx8 0"],
			["sx10", "+- hc sdx7 0"],
			["sx11", "+- hc sdx6 0"],
			["sx12", "+- hc sdx5 0"],
			["sx13", "+- hc sdx4 0"],
			["sx14", "+- hc sdx3 0"],
			["sx15", "+- hc sdx2 0"],
			["sx16", "+- hc sdx1 0"],
			["sy1", "+- vc 0 sdy1"],
			["sy2", "+- vc 0 sdy2"],
			["sy3", "+- vc 0 sdy3"],
			["sy4", "+- vc 0 sdy4"],
			["sy5", "+- vc 0 sdy5"],
			["sy6", "+- vc 0 sdy6"],
			["sy7", "+- vc 0 sdy7"],
			["sy8", "+- vc 0 sdy8"],
			["sy9", "+- vc sdy8 0"],
			["sy10", "+- vc sdy7 0"],
			["sy11", "+- vc sdy6 0"],
			["sy12", "+- vc sdy5 0"],
			["sy13", "+- vc sdy4 0"],
			["sy14", "+- vc sdy3 0"],
			["sy15", "+- vc sdy2 0"],
			["sy16", "+- vc sdy1 0"],
			["idx", "cos iwd2 2700000"],
			["idy", "sin ihd2 2700000"],
			["il", "+- hc 0 idx"],
			["it", "+- vc 0 idy"],
			["ir", "+- hc idx 0"],
			["ib", "+- vc idy 0"],
			["yAdj", "+- vc 0 ihd2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"sx1",
					"sy8"
				],
				[
					"l",
					"x1",
					"y7"
				],
				[
					"l",
					"sx2",
					"sy7"
				],
				[
					"l",
					"x2",
					"y6"
				],
				[
					"l",
					"sx3",
					"sy6"
				],
				[
					"l",
					"x3",
					"y5"
				],
				[
					"l",
					"sx4",
					"sy5"
				],
				[
					"l",
					"x4",
					"y4"
				],
				[
					"l",
					"sx5",
					"sy4"
				],
				[
					"l",
					"x5",
					"y3"
				],
				[
					"l",
					"sx6",
					"sy3"
				],
				[
					"l",
					"x6",
					"y2"
				],
				[
					"l",
					"sx7",
					"sy2"
				],
				[
					"l",
					"x7",
					"y1"
				],
				[
					"l",
					"sx8",
					"sy1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"sx9",
					"sy1"
				],
				[
					"l",
					"x8",
					"y1"
				],
				[
					"l",
					"sx10",
					"sy2"
				],
				[
					"l",
					"x9",
					"y2"
				],
				[
					"l",
					"sx11",
					"sy3"
				],
				[
					"l",
					"x10",
					"y3"
				],
				[
					"l",
					"sx12",
					"sy4"
				],
				[
					"l",
					"x11",
					"y4"
				],
				[
					"l",
					"sx13",
					"sy5"
				],
				[
					"l",
					"x12",
					"y5"
				],
				[
					"l",
					"sx14",
					"sy6"
				],
				[
					"l",
					"x13",
					"y6"
				],
				[
					"l",
					"sx15",
					"sy7"
				],
				[
					"l",
					"x14",
					"y7"
				],
				[
					"l",
					"sx16",
					"sy8"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"sx16",
					"sy9"
				],
				[
					"l",
					"x14",
					"y8"
				],
				[
					"l",
					"sx15",
					"sy10"
				],
				[
					"l",
					"x13",
					"y9"
				],
				[
					"l",
					"sx14",
					"sy11"
				],
				[
					"l",
					"x12",
					"y10"
				],
				[
					"l",
					"sx13",
					"sy12"
				],
				[
					"l",
					"x11",
					"y11"
				],
				[
					"l",
					"sx12",
					"sy13"
				],
				[
					"l",
					"x10",
					"y12"
				],
				[
					"l",
					"sx11",
					"sy14"
				],
				[
					"l",
					"x9",
					"y13"
				],
				[
					"l",
					"sx10",
					"sy15"
				],
				[
					"l",
					"x8",
					"y14"
				],
				[
					"l",
					"sx9",
					"sy16"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"sx8",
					"sy16"
				],
				[
					"l",
					"x7",
					"y14"
				],
				[
					"l",
					"sx7",
					"sy15"
				],
				[
					"l",
					"x6",
					"y13"
				],
				[
					"l",
					"sx6",
					"sy14"
				],
				[
					"l",
					"x5",
					"y12"
				],
				[
					"l",
					"sx5",
					"sy13"
				],
				[
					"l",
					"x4",
					"y11"
				],
				[
					"l",
					"sx4",
					"sy12"
				],
				[
					"l",
					"x3",
					"y10"
				],
				[
					"l",
					"sx3",
					"sy11"
				],
				[
					"l",
					"x2",
					"y9"
				],
				[
					"l",
					"sx2",
					"sy10"
				],
				[
					"l",
					"x1",
					"y8"
				],
				[
					"l",
					"sx1",
					"sy9"
				],
				["c"]
			]
		}]
	},
	star4: {
		adj: [["adj", "val 12500"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["iwd2", "*/ wd2 a 50000"],
			["ihd2", "*/ hd2 a 50000"],
			["sdx", "cos iwd2 2700000"],
			["sdy", "sin ihd2 2700000"],
			["sx1", "+- hc 0 sdx"],
			["sx2", "+- hc sdx 0"],
			["sy1", "+- vc 0 sdy"],
			["sy2", "+- vc sdy 0"],
			["yAdj", "+- vc 0 ihd2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"sx1",
					"sy1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"sx2",
					"sy1"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"sx2",
					"sy2"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"sx1",
					"sy2"
				],
				["c"]
			]
		}]
	},
	star5: {
		adj: [
			["adj", "val 19098"],
			["hf", "val 105146"],
			["vf", "val 110557"]
		],
		gd: [
			["a", "pin 0 adj 50000"],
			["swd2", "*/ wd2 hf 100000"],
			["shd2", "*/ hd2 vf 100000"],
			["svc", "*/ vc  vf 100000"],
			["dx1", "cos swd2 1080000"],
			["dx2", "cos swd2 18360000"],
			["dy1", "sin shd2 1080000"],
			["dy2", "sin shd2 18360000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc dx2 0"],
			["x4", "+- hc dx1 0"],
			["y1", "+- svc 0 dy1"],
			["y2", "+- svc 0 dy2"],
			["iwd2", "*/ swd2 a 50000"],
			["ihd2", "*/ shd2 a 50000"],
			["sdx1", "cos iwd2 20520000"],
			["sdx2", "cos iwd2 3240000"],
			["sdy1", "sin ihd2 3240000"],
			["sdy2", "sin ihd2 20520000"],
			["sx1", "+- hc 0 sdx1"],
			["sx2", "+- hc 0 sdx2"],
			["sx3", "+- hc sdx2 0"],
			["sx4", "+- hc sdx1 0"],
			["sy1", "+- svc 0 sdy1"],
			["sy2", "+- svc 0 sdy2"],
			["sy3", "+- svc ihd2 0"],
			["yAdj", "+- svc 0 ihd2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"y1"
				],
				[
					"l",
					"sx2",
					"sy1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"sx3",
					"sy1"
				],
				[
					"l",
					"x4",
					"y1"
				],
				[
					"l",
					"sx4",
					"sy2"
				],
				[
					"l",
					"x3",
					"y2"
				],
				[
					"l",
					"hc",
					"sy3"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"sx1",
					"sy2"
				],
				["c"]
			]
		}]
	},
	star6: {
		adj: [["adj", "val 28868"], ["hf", "val 115470"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["swd2", "*/ wd2 hf 100000"],
			["dx1", "cos swd2 1800000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc dx1 0"],
			["y2", "+- vc hd4 0"],
			["iwd2", "*/ swd2 a 50000"],
			["ihd2", "*/ hd2 a 50000"],
			["sdx2", "*/ iwd2 1 2"],
			["sx1", "+- hc 0 iwd2"],
			["sx2", "+- hc 0 sdx2"],
			["sx3", "+- hc sdx2 0"],
			["sx4", "+- hc iwd2 0"],
			["sdy1", "sin ihd2 3600000"],
			["sy1", "+- vc 0 sdy1"],
			["sy2", "+- vc sdy1 0"],
			["yAdj", "+- vc 0 ihd2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"hd4"
				],
				[
					"l",
					"sx2",
					"sy1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"sx3",
					"sy1"
				],
				[
					"l",
					"x2",
					"hd4"
				],
				[
					"l",
					"sx4",
					"vc"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"sx3",
					"sy2"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"sx2",
					"sy2"
				],
				[
					"l",
					"x1",
					"y2"
				],
				[
					"l",
					"sx1",
					"vc"
				],
				["c"]
			]
		}]
	},
	star7: {
		adj: [
			["adj", "val 34601"],
			["hf", "val 102572"],
			["vf", "val 105210"]
		],
		gd: [
			["a", "pin 0 adj 50000"],
			["swd2", "*/ wd2 hf 100000"],
			["shd2", "*/ hd2 vf 100000"],
			["svc", "*/ vc  vf 100000"],
			["dx1", "*/ swd2 97493 100000"],
			["dx2", "*/ swd2 78183 100000"],
			["dx3", "*/ swd2 43388 100000"],
			["dy1", "*/ shd2 62349 100000"],
			["dy2", "*/ shd2 22252 100000"],
			["dy3", "*/ shd2 90097 100000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc 0 dx3"],
			["x4", "+- hc dx3 0"],
			["x5", "+- hc dx2 0"],
			["x6", "+- hc dx1 0"],
			["y1", "+- svc 0 dy1"],
			["y2", "+- svc dy2 0"],
			["y3", "+- svc dy3 0"],
			["iwd2", "*/ swd2 a 50000"],
			["ihd2", "*/ shd2 a 50000"],
			["sdx1", "*/ iwd2 97493 100000"],
			["sdx2", "*/ iwd2 78183 100000"],
			["sdx3", "*/ iwd2 43388 100000"],
			["sx1", "+- hc 0 sdx1"],
			["sx2", "+- hc 0 sdx2"],
			["sx3", "+- hc 0 sdx3"],
			["sx4", "+- hc sdx3 0"],
			["sx5", "+- hc sdx2 0"],
			["sx6", "+- hc sdx1 0"],
			["sdy1", "*/ ihd2 90097 100000"],
			["sdy2", "*/ ihd2 22252 100000"],
			["sdy3", "*/ ihd2 62349 100000"],
			["sy1", "+- svc 0 sdy1"],
			["sy2", "+- svc 0 sdy2"],
			["sy3", "+- svc sdy3 0"],
			["sy4", "+- svc ihd2 0"],
			["yAdj", "+- svc 0 ihd2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x1",
					"y2"
				],
				[
					"l",
					"sx1",
					"sy2"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"sx3",
					"sy1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"sx4",
					"sy1"
				],
				[
					"l",
					"x5",
					"y1"
				],
				[
					"l",
					"sx6",
					"sy2"
				],
				[
					"l",
					"x6",
					"y2"
				],
				[
					"l",
					"sx5",
					"sy3"
				],
				[
					"l",
					"x4",
					"y3"
				],
				[
					"l",
					"hc",
					"sy4"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"l",
					"sx2",
					"sy3"
				],
				["c"]
			]
		}]
	},
	star8: {
		adj: [["adj", "val 37500"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["dx1", "cos wd2 2700000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc dx1 0"],
			["dy1", "sin hd2 2700000"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc dy1 0"],
			["iwd2", "*/ wd2 a 50000"],
			["ihd2", "*/ hd2 a 50000"],
			["sdx1", "*/ iwd2 92388 100000"],
			["sdx2", "*/ iwd2 38268 100000"],
			["sdy1", "*/ ihd2 92388 100000"],
			["sdy2", "*/ ihd2 38268 100000"],
			["sx1", "+- hc 0 sdx1"],
			["sx2", "+- hc 0 sdx2"],
			["sx3", "+- hc sdx2 0"],
			["sx4", "+- hc sdx1 0"],
			["sy1", "+- vc 0 sdy1"],
			["sy2", "+- vc 0 sdy2"],
			["sy3", "+- vc sdy2 0"],
			["sy4", "+- vc sdy1 0"],
			["yAdj", "+- vc 0 ihd2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"sx1",
					"sy2"
				],
				[
					"l",
					"x1",
					"y1"
				],
				[
					"l",
					"sx2",
					"sy1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"sx3",
					"sy1"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"sx4",
					"sy2"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"sx4",
					"sy3"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"sx3",
					"sy4"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"sx2",
					"sy4"
				],
				[
					"l",
					"x1",
					"y2"
				],
				[
					"l",
					"sx1",
					"sy3"
				],
				["c"]
			]
		}]
	},
	straightconnector1: {
		adj: [],
		gd: [],
		paths: [{
			w: null,
			h: null,
			fill: "none",
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"l",
				"r",
				"b"
			]]
		}]
	},
	stripedrightarrow: {
		adj: [["adj1", "val 50000"], ["adj2", "val 50000"]],
		gd: [
			["maxAdj2", "*/ 84375 w ss"],
			["a1", "pin 0 adj1 100000"],
			["a2", "pin 0 adj2 maxAdj2"],
			["x4", "*/ ss 5 32"],
			["dx5", "*/ ss a2 100000"],
			["x5", "+- r 0 dx5"],
			["dy1", "*/ h a1 200000"],
			["y1", "+- vc 0 dy1"],
			["y2", "+- vc dy1 0"],
			["dx6", "*/ dy1 dx5 hd2"],
			["x6", "+- r 0 dx6"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y1"
				],
				[
					"l",
					"ssd32",
					"y1"
				],
				[
					"l",
					"ssd32",
					"y2"
				],
				[
					"l",
					"l",
					"y2"
				],
				["c"],
				[
					"m",
					"ssd16",
					"y1"
				],
				[
					"l",
					"ssd8",
					"y1"
				],
				[
					"l",
					"ssd8",
					"y2"
				],
				[
					"l",
					"ssd16",
					"y2"
				],
				["c"],
				[
					"m",
					"x4",
					"y1"
				],
				[
					"l",
					"x5",
					"y1"
				],
				[
					"l",
					"x5",
					"t"
				],
				[
					"l",
					"r",
					"vc"
				],
				[
					"l",
					"x5",
					"b"
				],
				[
					"l",
					"x5",
					"y2"
				],
				[
					"l",
					"x4",
					"y2"
				],
				["c"]
			]
		}]
	},
	sun: {
		adj: [["adj", "val 25000"]],
		gd: [
			["a", "pin 12500 adj 46875"],
			["g0", "+- 50000 0 a"],
			["g1", "*/ g0 30274 32768"],
			["g2", "*/ g0 12540 32768"],
			["g3", "+- g1 50000 0"],
			["g4", "+- g2 50000 0"],
			["g5", "+- 50000 0 g1"],
			["g6", "+- 50000 0 g2"],
			["g7", "*/ g0 23170 32768"],
			["g8", "+- 50000 g7 0"],
			["g9", "+- 50000 0 g7"],
			["g10", "*/ g5 3 4"],
			["g11", "*/ g6 3 4"],
			["g12", "+- g10 3662 0"],
			["g13", "+- g11 3662 0"],
			["g14", "+- g11 12500 0"],
			["g15", "+- 100000 0 g10"],
			["g16", "+- 100000 0 g12"],
			["g17", "+- 100000 0 g13"],
			["g18", "+- 100000 0 g14"],
			["ox1", "*/ w 18436 21600"],
			["oy1", "*/ h 3163 21600"],
			["ox2", "*/ w 3163 21600"],
			["oy2", "*/ h 18436 21600"],
			["x8", "*/ w g8 100000"],
			["x9", "*/ w g9 100000"],
			["x10", "*/ w g10 100000"],
			["x12", "*/ w g12 100000"],
			["x13", "*/ w g13 100000"],
			["x14", "*/ w g14 100000"],
			["x15", "*/ w g15 100000"],
			["x16", "*/ w g16 100000"],
			["x17", "*/ w g17 100000"],
			["x18", "*/ w g18 100000"],
			["x19", "*/ w a 100000"],
			["wR", "*/ w g0 100000"],
			["hR", "*/ h g0 100000"],
			["y8", "*/ h g8 100000"],
			["y9", "*/ h g9 100000"],
			["y10", "*/ h g10 100000"],
			["y12", "*/ h g12 100000"],
			["y13", "*/ h g13 100000"],
			["y14", "*/ h g14 100000"],
			["y15", "*/ h g15 100000"],
			["y16", "*/ h g16 100000"],
			["y17", "*/ h g17 100000"],
			["y18", "*/ h g18 100000"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"r",
					"vc"
				],
				[
					"l",
					"x15",
					"y18"
				],
				[
					"l",
					"x15",
					"y14"
				],
				["c"],
				[
					"m",
					"ox1",
					"oy1"
				],
				[
					"l",
					"x16",
					"y13"
				],
				[
					"l",
					"x17",
					"y12"
				],
				["c"],
				[
					"m",
					"hc",
					"t"
				],
				[
					"l",
					"x18",
					"y10"
				],
				[
					"l",
					"x14",
					"y10"
				],
				["c"],
				[
					"m",
					"ox2",
					"oy1"
				],
				[
					"l",
					"x13",
					"y12"
				],
				[
					"l",
					"x12",
					"y13"
				],
				["c"],
				[
					"m",
					"l",
					"vc"
				],
				[
					"l",
					"x10",
					"y14"
				],
				[
					"l",
					"x10",
					"y18"
				],
				["c"],
				[
					"m",
					"ox2",
					"oy2"
				],
				[
					"l",
					"x12",
					"y17"
				],
				[
					"l",
					"x13",
					"y16"
				],
				["c"],
				[
					"m",
					"hc",
					"b"
				],
				[
					"l",
					"x14",
					"y15"
				],
				[
					"l",
					"x18",
					"y15"
				],
				["c"],
				[
					"m",
					"ox1",
					"oy2"
				],
				[
					"l",
					"x17",
					"y16"
				],
				[
					"l",
					"x16",
					"y17"
				],
				["c"],
				[
					"m",
					"x19",
					"vc"
				],
				[
					"a",
					"wR",
					"hR",
					"cd2",
					"21600000"
				],
				["c"]
			]
		}]
	},
	swoosharrow: {
		adj: [["adj1", "val 25000"], ["adj2", "val 16667"]],
		gd: [
			["a1", "pin 1 adj1 75000"],
			["maxAdj2", "*/ 70000 w ss"],
			["a2", "pin 0 adj2 maxAdj2"],
			["ad1", "*/ h a1 100000"],
			["ad2", "*/ ss a2 100000"],
			["xB", "+- r 0 ad2"],
			["yB", "+- t ssd8 0"],
			["alfa", "*/ cd4 1 14"],
			["dx0", "tan ssd8 alfa"],
			["xC", "+- xB 0 dx0"],
			["dx1", "tan ad1 alfa"],
			["yF", "+- yB ad1 0"],
			["xF", "+- xB dx1 0"],
			["xE", "+- xF dx0 0"],
			["yE", "+- yF ssd8 0"],
			["dy2", "+- yE 0 t"],
			["dy22", "*/ dy2 1 2"],
			["dy3", "*/ h 1 20"],
			["yD", "+- t dy22 dy3"],
			["dy4", "*/ hd6 1 1"],
			["yP1", "+- hd6 dy4 0"],
			["xP1", "val wd6"],
			["dy5", "*/ hd6 1 2"],
			["yP2", "+- yF dy5 0"],
			["xP2", "val wd4"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"b"
				],
				[
					"Q",
					"xP1",
					"yP1",
					"xB",
					"yB"
				],
				[
					"l",
					"xC",
					"t"
				],
				[
					"l",
					"r",
					"yD"
				],
				[
					"l",
					"xE",
					"yE"
				],
				[
					"l",
					"xF",
					"yF"
				],
				[
					"Q",
					"xP2",
					"yP2",
					"l",
					"b"
				],
				["c"]
			]
		}]
	},
	teardrop: {
		adj: [["adj", "val 100000"]],
		gd: [
			["a", "pin 0 adj 200000"],
			["r2", "sqrt 2"],
			["tw", "*/ wd2 r2 1"],
			["th", "*/ hd2 r2 1"],
			["sw", "*/ tw a 100000"],
			["sh", "*/ th a 100000"],
			["dx1", "cos sw 2700000"],
			["dy1", "sin sh 2700000"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc 0 dy1"],
			["x2", "+/ hc x1 2"],
			["y2", "+/ vc y1 2"],
			["idx", "cos wd2 2700000"],
			["idy", "sin hd2 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"vc"
				],
				[
					"a",
					"wd2",
					"hd2",
					"cd2",
					"cd4"
				],
				[
					"Q",
					"x2",
					"t",
					"x1",
					"y1"
				],
				[
					"Q",
					"r",
					"y2",
					"r",
					"vc"
				],
				[
					"a",
					"wd2",
					"hd2",
					"0",
					"cd4"
				],
				[
					"a",
					"wd2",
					"hd2",
					"cd4",
					"cd4"
				],
				["c"]
			]
		}]
	},
	trapezoid: {
		adj: [["adj", "val 25000"]],
		gd: [
			["maxAdj", "*/ 50000 w ss"],
			["a", "pin 0 adj maxAdj"],
			["x1", "*/ ss a 200000"],
			["x2", "*/ ss a 100000"],
			["x3", "+- r 0 x2"],
			["x4", "+- r 0 x1"],
			["il", "*/ wd3 a maxAdj"],
			["it", "*/ hd3 a maxAdj"],
			["ir", "+- r 0 il"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"b"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"x3",
					"t"
				],
				[
					"l",
					"r",
					"b"
				],
				["c"]
			]
		}]
	},
	triangle: {
		adj: [["adj", "val 50000"]],
		gd: [
			["a", "pin 0 adj 100000"],
			["x1", "*/ w a 200000"],
			["x2", "*/ w a 100000"],
			["x3", "+- x1 wd2 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"b"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"r",
					"b"
				],
				["c"]
			]
		}]
	},
	uparrowcallout: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 25000"],
			["adj3", "val 25000"],
			["adj4", "val 64977"]
		],
		gd: [
			["maxAdj2", "*/ 50000 w ss"],
			["a2", "pin 0 adj2 maxAdj2"],
			["maxAdj1", "*/ a2 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["maxAdj3", "*/ 100000 h ss"],
			["a3", "pin 0 adj3 maxAdj3"],
			["q2", "*/ a3 ss h"],
			["maxAdj4", "+- 100000 0 q2"],
			["a4", "pin 0 adj4 maxAdj4"],
			["dx1", "*/ ss a2 100000"],
			["dx2", "*/ ss a1 200000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc dx2 0"],
			["x4", "+- hc dx1 0"],
			["y1", "*/ ss a3 100000"],
			["dy2", "*/ h a4 100000"],
			["y2", "+- b 0 dy2"],
			["y3", "+/ y2 b 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y2"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"x1",
					"y1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"x4",
					"y1"
				],
				[
					"l",
					"x3",
					"y1"
				],
				[
					"l",
					"x3",
					"y2"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				["c"]
			]
		}]
	},
	updownarrow: {
		adj: [["adj1", "val 50000"], ["adj2", "val 50000"]],
		gd: [
			["maxAdj2", "*/ 50000 h ss"],
			["a1", "pin 0 adj1 100000"],
			["a2", "pin 0 adj2 maxAdj2"],
			["y2", "*/ ss a2 100000"],
			["y3", "+- b 0 y2"],
			["dx1", "*/ w a1 200000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc dx1 0"],
			["dy1", "*/ x1 y2 wd2"],
			["y1", "+- y2 0 dy1"],
			["y4", "+- y3 dy1 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y2"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x2",
					"y3"
				],
				[
					"l",
					"r",
					"y3"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"l",
					"y3"
				],
				[
					"l",
					"x1",
					"y3"
				],
				[
					"l",
					"x1",
					"y2"
				],
				["c"]
			]
		}]
	},
	uparrow: {
		adj: [["adj1", "val 50000"], ["adj2", "val 50000"]],
		gd: [
			["maxAdj2", "*/ 100000 h ss"],
			["a1", "pin 0 adj1 100000"],
			["a2", "pin 0 adj2 maxAdj2"],
			["dy2", "*/ ss a2 100000"],
			["y2", "+- t dy2 0"],
			["dx1", "*/ w a1 200000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc dx1 0"],
			["dy1", "*/ x1 dy2 wd2"],
			["y1", "+- y2  0 dy1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y2"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x2",
					"b"
				],
				[
					"l",
					"x1",
					"b"
				],
				[
					"l",
					"x1",
					"y2"
				],
				["c"]
			]
		}]
	},
	updownarrowcallout: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 25000"],
			["adj3", "val 25000"],
			["adj4", "val 48123"]
		],
		gd: [
			["maxAdj2", "*/ 50000 w ss"],
			["a2", "pin 0 adj2 maxAdj2"],
			["maxAdj1", "*/ a2 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["maxAdj3", "*/ 50000 h ss"],
			["a3", "pin 0 adj3 maxAdj3"],
			["q2", "*/ a3 ss hd2"],
			["maxAdj4", "+- 100000 0 q2"],
			["a4", "pin 0 adj4 maxAdj4"],
			["dx1", "*/ ss a2 100000"],
			["dx2", "*/ ss a1 200000"],
			["x1", "+- hc 0 dx1"],
			["x2", "+- hc 0 dx2"],
			["x3", "+- hc dx2 0"],
			["x4", "+- hc dx1 0"],
			["y1", "*/ ss a3 100000"],
			["y4", "+- b 0 y1"],
			["dy2", "*/ h a4 200000"],
			["y2", "+- vc 0 dy2"],
			["y3", "+- vc dy2 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y2"
				],
				[
					"l",
					"x2",
					"y2"
				],
				[
					"l",
					"x2",
					"y1"
				],
				[
					"l",
					"x1",
					"y1"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"x4",
					"y1"
				],
				[
					"l",
					"x3",
					"y1"
				],
				[
					"l",
					"x3",
					"y2"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"l",
					"r",
					"y3"
				],
				[
					"l",
					"x3",
					"y3"
				],
				[
					"l",
					"x3",
					"y4"
				],
				[
					"l",
					"x4",
					"y4"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"x1",
					"y4"
				],
				[
					"l",
					"x2",
					"y4"
				],
				[
					"l",
					"x2",
					"y3"
				],
				[
					"l",
					"l",
					"y3"
				],
				["c"]
			]
		}]
	},
	uturnarrow: {
		adj: [
			["adj1", "val 25000"],
			["adj2", "val 25000"],
			["adj3", "val 25000"],
			["adj4", "val 43750"],
			["adj5", "val 75000"]
		],
		gd: [
			["a2", "pin 0 adj2 25000"],
			["maxAdj1", "*/ a2 2 1"],
			["a1", "pin 0 adj1 maxAdj1"],
			["q2", "*/ a1 ss h"],
			["q3", "+- 100000 0 q2"],
			["maxAdj3", "*/ q3 h ss"],
			["a3", "pin 0 adj3 maxAdj3"],
			["q1", "+- a3 a1 0"],
			["minAdj5", "*/ q1 ss h"],
			["a5", "pin minAdj5 adj5 100000"],
			["th", "*/ ss a1 100000"],
			["aw2", "*/ ss a2 100000"],
			["th2", "*/ th 1 2"],
			["dh2", "+- aw2 0 th2"],
			["y5", "*/ h a5 100000"],
			["ah", "*/ ss a3 100000"],
			["y4", "+- y5 0 ah"],
			["x9", "+- r 0 dh2"],
			["bw", "*/ x9 1 2"],
			["bs", "min bw y4"],
			["maxAdj4", "*/ bs 100000 ss"],
			["a4", "pin 0 adj4 maxAdj4"],
			["bd", "*/ ss a4 100000"],
			["bd3", "+- bd 0 th"],
			["bd2", "max bd3 0"],
			["x3", "+- th bd2 0"],
			["x8", "+- r 0 aw2"],
			["x6", "+- x8 0 aw2"],
			["x7", "+- x6 dh2 0"],
			["x4", "+- x9 0 bd"],
			["x5", "+- x7 0 bd2"],
			["cx", "+/ th x7 2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"b"
				],
				[
					"l",
					"l",
					"bd"
				],
				[
					"a",
					"bd",
					"bd",
					"cd2",
					"cd4"
				],
				[
					"l",
					"x4",
					"t"
				],
				[
					"a",
					"bd",
					"bd",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"x9",
					"y4"
				],
				[
					"l",
					"r",
					"y4"
				],
				[
					"l",
					"x8",
					"y5"
				],
				[
					"l",
					"x6",
					"y4"
				],
				[
					"l",
					"x7",
					"y4"
				],
				[
					"l",
					"x7",
					"x3"
				],
				[
					"a",
					"bd2",
					"bd2",
					"0",
					"-5400000"
				],
				[
					"l",
					"x3",
					"th"
				],
				[
					"a",
					"bd2",
					"bd2",
					"3cd4",
					"-5400000"
				],
				[
					"l",
					"th",
					"b"
				],
				["c"]
			]
		}]
	},
	verticalscroll: {
		adj: [["adj", "val 12500"]],
		gd: [
			["a", "pin 0 adj 25000"],
			["ch", "*/ ss a 100000"],
			["ch2", "*/ ch 1 2"],
			["ch4", "*/ ch 1 4"],
			["x3", "+- ch ch2 0"],
			["x4", "+- ch ch 0"],
			["x6", "+- r 0 ch"],
			["x7", "+- r 0 ch2"],
			["x5", "+- x6 0 ch2"],
			["y3", "+- b 0 ch"],
			["y4", "+- b 0 ch2"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"ch2",
						"b"
					],
					[
						"a",
						"ch2",
						"ch2",
						"cd4",
						"-5400000"
					],
					[
						"l",
						"ch2",
						"y4"
					],
					[
						"a",
						"ch4",
						"ch4",
						"cd4",
						"-10800000"
					],
					[
						"l",
						"ch",
						"y3"
					],
					[
						"l",
						"ch",
						"ch2"
					],
					[
						"a",
						"ch2",
						"ch2",
						"cd2",
						"cd4"
					],
					[
						"l",
						"x7",
						"t"
					],
					[
						"a",
						"ch2",
						"ch2",
						"3cd4",
						"cd2"
					],
					[
						"l",
						"x6",
						"ch"
					],
					[
						"l",
						"x6",
						"y4"
					],
					[
						"a",
						"ch2",
						"ch2",
						"0",
						"cd4"
					],
					["c"],
					[
						"m",
						"x4",
						"ch2"
					],
					[
						"a",
						"ch2",
						"ch2",
						"0",
						"cd4"
					],
					[
						"a",
						"ch4",
						"ch4",
						"cd4",
						"cd2"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "darkenLess",
				stroke: !1,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"x4",
						"ch2"
					],
					[
						"a",
						"ch2",
						"ch2",
						"0",
						"cd4"
					],
					[
						"a",
						"ch4",
						"ch4",
						"cd4",
						"cd2"
					],
					["c"],
					[
						"m",
						"ch",
						"y4"
					],
					[
						"a",
						"ch2",
						"ch2",
						"0",
						"3cd4"
					],
					[
						"a",
						"ch4",
						"ch4",
						"3cd4",
						"cd2"
					],
					["c"]
				]
			},
			{
				w: null,
				h: null,
				fill: "none",
				stroke: !0,
				extrusionOk: !1,
				cmds: [
					[
						"m",
						"ch",
						"y3"
					],
					[
						"l",
						"ch",
						"ch2"
					],
					[
						"a",
						"ch2",
						"ch2",
						"cd2",
						"cd4"
					],
					[
						"l",
						"x7",
						"t"
					],
					[
						"a",
						"ch2",
						"ch2",
						"3cd4",
						"cd2"
					],
					[
						"l",
						"x6",
						"ch"
					],
					[
						"l",
						"x6",
						"y4"
					],
					[
						"a",
						"ch2",
						"ch2",
						"0",
						"cd4"
					],
					[
						"l",
						"ch2",
						"b"
					],
					[
						"a",
						"ch2",
						"ch2",
						"cd4",
						"cd2"
					],
					["c"],
					[
						"m",
						"x3",
						"t"
					],
					[
						"a",
						"ch2",
						"ch2",
						"3cd4",
						"cd2"
					],
					[
						"a",
						"ch4",
						"ch4",
						"cd4",
						"cd2"
					],
					[
						"l",
						"x4",
						"ch2"
					],
					[
						"m",
						"x6",
						"ch"
					],
					[
						"l",
						"x3",
						"ch"
					],
					[
						"m",
						"ch2",
						"y3"
					],
					[
						"a",
						"ch4",
						"ch4",
						"3cd4",
						"cd2"
					],
					[
						"l",
						"ch",
						"y4"
					],
					[
						"m",
						"ch2",
						"b"
					],
					[
						"a",
						"ch2",
						"ch2",
						"cd4",
						"-5400000"
					],
					[
						"l",
						"ch",
						"y3"
					]
				]
			}
		]
	},
	wave: {
		adj: [["adj1", "val 12500"], ["adj2", "val 0"]],
		gd: [
			["a1", "pin 0 adj1 20000"],
			["a2", "pin -10000 adj2 10000"],
			["y1", "*/ h a1 100000"],
			["dy2", "*/ y1 10 3"],
			["y2", "+- y1 0 dy2"],
			["y3", "+- y1 dy2 0"],
			["y4", "+- b 0 y1"],
			["y5", "+- y4 0 dy2"],
			["y6", "+- y4 dy2 0"],
			["dx1", "*/ w a2 100000"],
			["of2", "*/ w a2 50000"],
			["x1", "abs dx1"],
			["dx2", "?: of2 0 of2"],
			["x2", "+- l 0 dx2"],
			["dx5", "?: of2 of2 0"],
			["x5", "+- r 0 dx5"],
			["dx3", "+/ dx2 x5 3"],
			["x3", "+- x2 dx3 0"],
			["x4", "+/ x3 x5 2"],
			["x6", "+- l dx5 0"],
			["x10", "+- r dx2 0"],
			["x7", "+- x6 dx3 0"],
			["x8", "+/ x7 x10 2"],
			["x9", "+- r 0 x1"],
			["xAdj", "+- hc dx1 0"],
			["xAdj2", "+- hc 0 dx1"],
			["il", "max x2 x6"],
			["ir", "min x5 x10"],
			["it", "*/ h a1 50000"],
			["ib", "+- b 0 it"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x2",
					"y1"
				],
				[
					"C",
					"x3",
					"y2",
					"x4",
					"y3",
					"x5",
					"y1"
				],
				[
					"l",
					"x10",
					"y4"
				],
				[
					"C",
					"x8",
					"y6",
					"x7",
					"y5",
					"x6",
					"y4"
				],
				["c"]
			]
		}]
	},
	wedgeellipsecallout: {
		adj: [["adj1", "val -20833"], ["adj2", "val 62500"]],
		gd: [
			["dxPos", "*/ w adj1 100000"],
			["dyPos", "*/ h adj2 100000"],
			["xPos", "+- hc dxPos 0"],
			["yPos", "+- vc dyPos 0"],
			["sdx", "*/ dxPos h 1"],
			["sdy", "*/ dyPos w 1"],
			["pang", "at2 sdx sdy"],
			["stAng", "+- pang 660000 0"],
			["enAng", "+- pang 0 660000"],
			["dx1", "cos wd2 stAng"],
			["dy1", "sin hd2 stAng"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"],
			["dx2", "cos wd2 enAng"],
			["dy2", "sin hd2 enAng"],
			["x2", "+- hc dx2 0"],
			["y2", "+- vc dy2 0"],
			["stAng1", "at2 dx1 dy1"],
			["enAng1", "at2 dx2 dy2"],
			["swAng1", "+- enAng1 0 stAng1"],
			["swAng2", "+- swAng1 21600000 0"],
			["swAng", "?: swAng1 swAng1 swAng2"],
			["idx", "cos wd2 2700000"],
			["idy", "sin hd2 2700000"],
			["il", "+- hc 0 idx"],
			["ir", "+- hc idx 0"],
			["it", "+- vc 0 idy"],
			["ib", "+- vc idy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"xPos",
					"yPos"
				],
				[
					"l",
					"x1",
					"y1"
				],
				[
					"a",
					"wd2",
					"hd2",
					"stAng1",
					"swAng"
				],
				["c"]
			]
		}]
	},
	wedgerectcallout: {
		adj: [["adj1", "val -20833"], ["adj2", "val 62500"]],
		gd: [
			["dxPos", "*/ w adj1 100000"],
			["dyPos", "*/ h adj2 100000"],
			["xPos", "+- hc dxPos 0"],
			["yPos", "+- vc dyPos 0"],
			["dx", "+- xPos 0 hc"],
			["dy", "+- yPos 0 vc"],
			["dq", "*/ dxPos h w"],
			["ady", "abs dyPos"],
			["adq", "abs dq"],
			["dz", "+- ady 0 adq"],
			["xg1", "?: dxPos 7 2"],
			["xg2", "?: dxPos 10 5"],
			["x1", "*/ w xg1 12"],
			["x2", "*/ w xg2 12"],
			["yg1", "?: dyPos 7 2"],
			["yg2", "?: dyPos 10 5"],
			["y1", "*/ h yg1 12"],
			["y2", "*/ h yg2 12"],
			["t1", "?: dxPos l xPos"],
			["xl", "?: dz l t1"],
			["t2", "?: dyPos x1 xPos"],
			["xt", "?: dz t2 x1"],
			["t3", "?: dxPos xPos r"],
			["xr", "?: dz r t3"],
			["t4", "?: dyPos xPos x1"],
			["xb", "?: dz t4 x1"],
			["t5", "?: dxPos y1 yPos"],
			["yl", "?: dz y1 t5"],
			["t6", "?: dyPos t yPos"],
			["yt", "?: dz t6 t"],
			["t7", "?: dxPos yPos y1"],
			["yr", "?: dz y1 t7"],
			["t8", "?: dyPos yPos b"],
			["yb", "?: dz t8 b"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"l",
					"xt",
					"yt"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"r",
					"t"
				],
				[
					"l",
					"r",
					"y1"
				],
				[
					"l",
					"xr",
					"yr"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"l",
					"r",
					"b"
				],
				[
					"l",
					"x2",
					"b"
				],
				[
					"l",
					"xb",
					"yb"
				],
				[
					"l",
					"x1",
					"b"
				],
				[
					"l",
					"l",
					"b"
				],
				[
					"l",
					"l",
					"y2"
				],
				[
					"l",
					"xl",
					"yl"
				],
				[
					"l",
					"l",
					"y1"
				],
				["c"]
			]
		}]
	},
	wedgeroundrectcallout: {
		adj: [
			["adj1", "val -20833"],
			["adj2", "val 62500"],
			["adj3", "val 16667"]
		],
		gd: [
			["dxPos", "*/ w adj1 100000"],
			["dyPos", "*/ h adj2 100000"],
			["xPos", "+- hc dxPos 0"],
			["yPos", "+- vc dyPos 0"],
			["dq", "*/ dxPos h w"],
			["ady", "abs dyPos"],
			["adq", "abs dq"],
			["dz", "+- ady 0 adq"],
			["xg1", "?: dxPos 7 2"],
			["xg2", "?: dxPos 10 5"],
			["x1", "*/ w xg1 12"],
			["x2", "*/ w xg2 12"],
			["yg1", "?: dyPos 7 2"],
			["yg2", "?: dyPos 10 5"],
			["y1", "*/ h yg1 12"],
			["y2", "*/ h yg2 12"],
			["t1", "?: dxPos l xPos"],
			["xl", "?: dz l t1"],
			["t2", "?: dyPos x1 xPos"],
			["xt", "?: dz t2 x1"],
			["t3", "?: dxPos xPos r"],
			["xr", "?: dz r t3"],
			["t4", "?: dyPos xPos x1"],
			["xb", "?: dz t4 x1"],
			["t5", "?: dxPos y1 yPos"],
			["yl", "?: dz y1 t5"],
			["t6", "?: dyPos t yPos"],
			["yt", "?: dz t6 t"],
			["t7", "?: dxPos yPos y1"],
			["yr", "?: dz y1 t7"],
			["t8", "?: dyPos yPos b"],
			["yb", "?: dz t8 b"],
			["u1", "*/ ss adj3 100000"],
			["u2", "+- r 0 u1"],
			["v2", "+- b 0 u1"],
			["il", "*/ u1 29289 100000"],
			["ir", "+- r 0 il"],
			["ib", "+- b 0 il"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"u1"
				],
				[
					"a",
					"u1",
					"u1",
					"cd2",
					"cd4"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"l",
					"xt",
					"yt"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"u2",
					"t"
				],
				[
					"a",
					"u1",
					"u1",
					"3cd4",
					"cd4"
				],
				[
					"l",
					"r",
					"y1"
				],
				[
					"l",
					"xr",
					"yr"
				],
				[
					"l",
					"r",
					"y2"
				],
				[
					"l",
					"r",
					"v2"
				],
				[
					"a",
					"u1",
					"u1",
					"0",
					"cd4"
				],
				[
					"l",
					"x2",
					"b"
				],
				[
					"l",
					"xb",
					"yb"
				],
				[
					"l",
					"x1",
					"b"
				],
				[
					"l",
					"u1",
					"b"
				],
				[
					"a",
					"u1",
					"u1",
					"cd4",
					"cd4"
				],
				[
					"l",
					"l",
					"y2"
				],
				[
					"l",
					"xl",
					"yl"
				],
				[
					"l",
					"l",
					"y1"
				],
				["c"]
			]
		}]
	}
}, z = 216e5, B = Math.PI * 2 / z;
function he(e) {
	let t = e.trim().split(/\s+/);
	return {
		op: t[0],
		argTokens: t.slice(1)
	};
}
function ge(e, t, n) {
	let { w: r, h: i, adj: a } = e, o = Math.min(r, i), s = Math.max(r, i), c = Object.create(null);
	Object.assign(c, {
		w: r,
		h: i,
		l: 0,
		t: 0,
		r,
		b: i,
		hc: r / 2,
		vc: i / 2,
		wd2: r / 2,
		wd3: r / 3,
		wd4: r / 4,
		wd5: r / 5,
		wd6: r / 6,
		wd8: r / 8,
		wd10: r / 10,
		wd12: r / 12,
		wd16: r / 16,
		wd32: r / 32,
		hd2: i / 2,
		hd3: i / 3,
		hd4: i / 4,
		hd5: i / 5,
		hd6: i / 6,
		hd8: i / 8,
		hd10: i / 10,
		hd12: i / 12,
		hd16: i / 16,
		hd32: i / 32,
		ss: o,
		ssd2: o / 2,
		ssd4: o / 4,
		ssd6: o / 6,
		ssd8: o / 8,
		ssd16: o / 16,
		ssd32: o / 32,
		ls: s,
		lsd2: s / 2,
		lsd4: s / 4,
		lsd6: s / 6,
		lsd8: s / 8,
		lsd16: s / 16,
		lsd32: s / 32,
		cd: z,
		cd2: z / 2,
		cd4: z / 4,
		cd8: z / 8,
		"3cd4": 3 * z / 4,
		"3cd8": 3 * z / 8,
		"5cd8": 5 * z / 8,
		"7cd8": 7 * z / 8
	}), t.forEach(([e, t], n) => {
		let r = a[n];
		c[e] = typeof r == "number" ? r : u(t), e === "adj" && (c.adj1 = c.adj), e === "adj1" && (c.adj = c.adj1);
	});
	for (let [e, t] of n) c[e] = u(t);
	return {
		v: (e) => {
			if (e in c) return c[e];
			throw Error(`preset-shape: unknown name "${e}"`);
		},
		fmla: u,
		resolve: l
	};
	function l(e) {
		if (e in c) return c[e];
		let t = Number(e);
		if (Number.isFinite(t)) return t;
		throw Error(`preset-shape: cannot resolve "${e}"`);
	}
	function u(e) {
		let t = e.argTokens.map(l);
		return d(e.op, t, e);
	}
	function d(e, t, n) {
		switch (e) {
			case "val": return t[0];
			case "*/": return t[0] * t[1] / t[2];
			case "+-": return t[0] + t[1] - t[2];
			case "+/": return (t[0] + t[1]) / t[2];
			case "?:": return t[0] > 0 ? t[1] : t[2];
			case "abs": return Math.abs(t[0]);
			case "min": return Math.min(t[0], t[1]);
			case "max": return Math.max(t[0], t[1]);
			case "pin": return t[1] < t[0] ? t[0] : t[1] > t[2] ? t[2] : t[1];
			case "sqrt": return Math.sqrt(Math.max(0, t[0]));
			case "mod": return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
			case "sin": return t[0] * Math.sin(t[1] * B);
			case "cos": return t[0] * Math.cos(t[1] * B);
			case "tan": return t[0] * Math.tan(t[1] * B);
			case "at2": return Math.atan2(t[1], t[0]) / B;
			case "cat2": return t[0] * Math.cos(Math.atan2(t[2], t[1]));
			case "sat2": return t[0] * Math.sin(Math.atan2(t[2], t[1]));
			default: throw Error(`preset-shape: unknown operator "${e}" in "${[n.op, ...n.argTokens].join(" ")}"`);
		}
	}
}
//#endregion
//#region packages/core/src/shape/preset-geometry/path-executor.ts
var _e = Math.PI * 2 / 216e5;
function V(e, t, n, r, i, a, o) {
	let s = t.w == null ? 1 : a / t.w, c = t.h == null ? 1 : o / t.h, l = (e) => r + e * s, u = (e) => i + e * c, d = 0, f = 0;
	for (let r of t.cmds) switch (r[0]) {
		case "m": {
			let t = l(n.resolve(r[1])), i = u(n.resolve(r[2]));
			e.moveTo(t, i), d = t, f = i;
			break;
		}
		case "l": {
			let t = l(n.resolve(r[1])), i = u(n.resolve(r[2]));
			e.lineTo(t, i), d = t, f = i;
			break;
		}
		case "C": {
			let t = l(n.resolve(r[1])), i = u(n.resolve(r[2])), a = l(n.resolve(r[3])), o = u(n.resolve(r[4])), s = l(n.resolve(r[5])), c = u(n.resolve(r[6]));
			e.bezierCurveTo(t, i, a, o, s, c), d = s, f = c;
			break;
		}
		case "Q": {
			let t = l(n.resolve(r[1])), i = u(n.resolve(r[2])), a = l(n.resolve(r[3])), o = u(n.resolve(r[4]));
			e.quadraticCurveTo(t, i, a, o), d = a, f = o;
			break;
		}
		case "a": {
			let t = n.resolve(r[1]), i = n.resolve(r[2]), a = t * s, o = i * c, l = n.resolve(r[3]) * _e, u = n.resolve(r[4]) * _e, p = Math.PI * 2, m = (e) => Math.atan2(t * Math.sin(e), i * Math.cos(e)), h = m(l), g = Math.trunc(u / p), _ = u - g * p, v = m(l + _) - h;
			_ > 0 && v < 0 ? v += p : _ < 0 && v > 0 && (v -= p);
			let y = h + v + g * p, b = d - a * Math.cos(h), x = f - o * Math.sin(h);
			Math.abs(a) > 1e-6 && Math.abs(o) > 1e-6 && (e.ellipse(b, x, Math.abs(a), Math.abs(o), 0, h, y, u < 0), d = b + a * Math.cos(y), f = x + o * Math.sin(y));
			break;
		}
		case "c":
			e.closePath();
			break;
	}
}
//#endregion
//#region packages/core/src/shape/preset-geometry/index.ts
var H = me, ve = /* @__PURE__ */ new WeakMap();
function ye(e) {
	let t = ve.get(e);
	return t || (t = {
		adj: e.adj.map(([e, t]) => [e, he(t)]),
		gd: e.gd.map(([e, t]) => [e, he(t)])
	}, ve.set(e, t)), t;
}
function U(e, t, n, r) {
	let i = ye(e);
	return ge({
		w: t,
		h: n,
		adj: r
	}, i.adj, i.gd);
}
function be(e) {
	return e.toLowerCase() in H;
}
function xe(e, t, n, r, i, a, o = []) {
	let s = H[t.toLowerCase()];
	if (!s) return !1;
	let c = U(s, i, a, o);
	for (let t of s.paths) V(e, t, c, n, r, i, a);
	return !0;
}
function Se(e, t, n, r, i, a, o = []) {
	let s = H[t.toLowerCase()];
	if (!s) return !1;
	let c = U(s, i, a, o);
	for (let t of s.paths) t.fill !== "none" && V(e, t, c, n, r, i, a);
	return !0;
}
var Ce = {
	wedgeroundrectcallout: "roundrect",
	wedgeellipsecallout: "ellipse",
	wedgerectcallout: null
}, we = {
	adj: [],
	gd: [],
	paths: [{
		w: null,
		h: null,
		fill: null,
		stroke: !0,
		extrusionOk: !1,
		cmds: [
			[
				"m",
				"l",
				"t"
			],
			[
				"l",
				"r",
				"t"
			],
			[
				"l",
				"r",
				"b"
			],
			[
				"l",
				"l",
				"b"
			],
			["c"]
		]
	}]
};
function Te(e, t, n) {
	let r = e[n];
	if (typeof r == "number") return r;
	let i = t.adj[n];
	return i && Number(i[1].replace(/^val\s+/, "")) || 0;
}
function Ee(e, t, n, r) {
	let i = H[e];
	if (!i) return null;
	if (e in Ce) {
		let a = Te(r, i, 0), o = Te(r, i, 1), s = t / 2 + t * a / 1e5, c = n / 2 + n * o / 1e5;
		if (s >= 0 && s <= t && c >= 0 && c <= n) {
			let t = Ce[e];
			t === "roundrect" ? (i = H.roundrect, r = [Te(r, H[e], 2)]) : t && H[t] ? (i = H[t], r = []) : (i = we, r = []);
		}
	}
	return {
		def: i,
		adj: r
	};
}
function De(e, t, n, r, i, a = []) {
	let o = Ee(e.toLowerCase(), r, i, a);
	if (!o) return null;
	let s = Infinity, c = Infinity, l = -Infinity, u = -Infinity, d = (e, t) => {
		!Number.isFinite(e) || !Number.isFinite(t) || (s = Math.min(s, e), c = Math.min(c, t), l = Math.max(l, e), u = Math.max(u, t));
	}, f = {
		moveTo: d,
		lineTo: d,
		bezierCurveTo(e, t, n, r, i, a) {
			d(e, t), d(n, r), d(i, a);
		},
		quadraticCurveTo(e, t, n, r) {
			d(e, t), d(n, r);
		},
		ellipse(e, t, n, r) {
			d(e - Math.abs(n), t - Math.abs(r)), d(e + Math.abs(n), t + Math.abs(r));
		},
		closePath() {}
	}, p = U(o.def, r, i, o.adj);
	for (let e of o.def.paths) V(f, e, p, t, n, r, i);
	return Number.isFinite(s) ? {
		x: s,
		y: c,
		w: l - s,
		h: u - c
	} : {
		x: t,
		y: n,
		w: r,
		h: i
	};
}
function Oe(e, t, n, r, i, a, o, s, c, l, u) {
	let d = Ee(t.toLowerCase(), i, a, o);
	if (!d) return !1;
	let { def: f } = d;
	o = d.adj;
	let p = U(f, i, a, o), m = !1, h = f.paths.length - 1;
	for (let t = 0; t < f.paths.length; t++) {
		let o = f.paths[t];
		e.beginPath(), V(e, o, p, n, r, i, a);
		let d = o.fill, g = d !== "none" && s != null;
		if (d !== "none" && u?.paintFill) {
			let t = !1;
			e.save();
			try {
				t = u.paintFill(e);
			} finally {
				e.restore();
			}
			if (t) {
				let t = Ae(d);
				t && (e.save(), e.fillStyle = t, e.fill(), e.restore()), m ||= (l(), !0);
			}
		} else if (g) {
			e.save(), e.fillStyle = s, e.fill();
			let t = Ae(d);
			t && (e.fillStyle = t, e.fill()), e.restore(), m ||= (l(), !0);
		}
		if (o.stroke && c) {
			let e = t === h && (o.fill === "none" || o.fill == null);
			u?.skipTrailingStroke && e || c();
		}
	}
	return !0;
}
function ke(e, t, n, r, i, a) {
	let o = H[e.toLowerCase()];
	if (!o || o.paths.length === 0) return null;
	let s = o.paths[o.paths.length - 1], c = U(o, r, i, a), l = s.w == null ? 1 : r / s.w, u = s.h == null ? 1 : i / s.h, d = (e) => t + e * l, f = (e) => n + e * u, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0, y = !1, b = 0, x = 0, S = [];
	for (let e of s.cmds) switch (e[0]) {
		case "m":
			h = d(c.resolve(e[1])), g = f(c.resolve(e[2])), p = h, m = g, S.push({
				x: h,
				y: g
			});
			break;
		case "l": {
			let t = d(c.resolve(e[1])), n = f(c.resolve(e[2]));
			y ||= (_ = t - h, v = n - g, !0), b = t - h, x = n - g, h = t, g = n, S.push({
				x: h,
				y: g
			});
			break;
		}
		case "C": {
			let t = d(c.resolve(e[1])), n = f(c.resolve(e[2])), r = d(c.resolve(e[3])), i = f(c.resolve(e[4])), a = d(c.resolve(e[5])), o = f(c.resolve(e[6]));
			y ||= (_ = t - h, v = n - g, !0), b = a - r, x = o - i, h = a, g = o, S.push({
				x: h,
				y: g
			});
			break;
		}
	}
	let C = Math.atan2(v, _) + Math.PI;
	return {
		start: {
			x: p,
			y: m,
			angle: C
		},
		end: {
			x: h,
			y: g,
			angle: Math.atan2(x, b)
		},
		vertices: S
	};
}
function Ae(e) {
	switch (e) {
		case "lighten": return `rgba(255,255,255,${102 / 255})`;
		case "lightenLess": return `rgba(255,255,255,${50 / 255})`;
		case "darken": return `rgba(0,0,0,${102 / 255})`;
		case "darkenLess": return `rgba(0,0,0,${50 / 255})`;
		default: return null;
	}
}
//#endregion
//#region packages/core/src/shape/preset.ts
function je(e, t, n, r, i, a, o, s = -Math.PI / 2) {
	let c = a * 2;
	for (let l = 0; l < c; l++) {
		let c = s + l * Math.PI / a, u = l % 2 == 0 ? 1 : o, d = t + r * u * Math.cos(c), f = n + i * u * Math.sin(c);
		l === 0 ? e.moveTo(d, f) : e.lineTo(d, f);
	}
	e.closePath();
}
function W(e, t, n, r, i, a, o = -Math.PI / 2) {
	for (let s = 0; s < a; s++) {
		let c = o + s * 2 * Math.PI / a, l = t + r * Math.cos(c), u = n + i * Math.sin(c);
		s === 0 ? e.moveTo(l, u) : e.lineTo(l, u);
	}
	e.closePath();
}
function G(e, t, n, r, i, a, o) {
	let s = (e) => Math.atan2(r * Math.sin(e), i * Math.cos(e)), c = s(a), l = s(a + o), u = t - r * Math.cos(c), d = n - i * Math.sin(c);
	return e.ellipse(u, d, Math.abs(r), Math.abs(i), 0, c, l, o < 0), {
		x: u + r * Math.cos(l),
		y: d + i * Math.sin(l)
	};
}
var Me = {
	oval: "ellipse",
	rtriangle: "rttriangle",
	roundrectangle: "roundrect",
	flowchartsumingjunction: "flowchartsummingjunction"
}, Ne = new Set(/* @__PURE__ */ "ellipse.rttriangle.triangle.diamond.trapezoid.roundrect.snip1rect.frame.irregularseal1.irregularseal2.star4.star8.star12.star16.star24.star32.line.straightconnector1.callout1.bordercallout1.leftuparrow.quadarrowcallout.mathequal.mathplus.mathminus.flowchartdecision.flowchartmanualinput.flowchartconnector.flowchartinputoutput.flowchartmerge.flowchartextract.flowchartpreparation.flowchartcollate".split(".")), Pe = new Set([
	"accentcallout1",
	"accentbordercallout1",
	"flowchartpredefinedprocess",
	"flowchartsort",
	"flowchartinternalstorage",
	"flowchartsummingjunction"
]), Fe = new Set([
	"round2samerect",
	"round2diagrect",
	"dodecagon",
	"star10"
]);
function Ie(e, t, n, r, i, a, o = null, s = null, c = null, l = null) {
	let u = n + i / 2, d = r + a / 2;
	{
		let u = t.toLowerCase(), d = Me[u] ?? u;
		if ((Ne.has(d) || Pe.has(d) || Fe.has(d)) && xe(e, d, n, r, i, a, [
			o,
			s,
			c,
			l
		])) return;
	}
	switch (t.toLowerCase()) {
		case "parallelogram": {
			let t = i * Math.min(.5, (o ?? 25e3) / 1e5);
			e.moveTo(n + t, r), e.lineTo(n + i, r), e.lineTo(n + i - t, r + a), e.lineTo(n, r + a), e.closePath();
			break;
		}
		case "pentagon":
			W(e, u, d, i / 2, a / 2, 5);
			break;
		case "hexagon":
			W(e, u, d, i / 2, a / 2, 6, 0);
			break;
		case "heptagon":
			W(e, u, d, i / 2, a / 2, 7);
			break;
		case "octagon":
			W(e, u, d, i / 2, a / 2, 8, -Math.PI / 8);
			break;
		case "decagon":
			W(e, u, d, i / 2, a / 2, 10);
			break;
		case "star5":
		case "star":
			je(e, u, d, i / 2, a / 2, 5, (o ?? 19098) / 5e4);
			break;
		case "star6":
			je(e, u, d, i / 2, a / 2, 6, (o ?? 28868) / 5e4, 0);
			break;
		case "star7":
			je(e, u, d, i / 2, a / 2, 7, (o ?? 34142) / 5e4);
			break;
		case "rightarrow": {
			let t = a * Math.min(1, (o ?? 5e4) / 1e5), c = i * Math.min(1, (s ?? 5e4) / 1e5), l = r + (a - t) / 2;
			e.moveTo(n, l), e.lineTo(n + i - c, l), e.lineTo(n + i - c, r), e.lineTo(n + i, d), e.lineTo(n + i - c, r + a), e.lineTo(n + i - c, l + t), e.lineTo(n, l + t), e.closePath();
			break;
		}
		case "leftarrow": {
			let t = a * Math.min(1, (o ?? 5e4) / 1e5), c = i * Math.min(1, (s ?? 5e4) / 1e5), l = r + (a - t) / 2;
			e.moveTo(n + i, l), e.lineTo(n + c, l), e.lineTo(n + c, r), e.lineTo(n, d), e.lineTo(n + c, r + a), e.lineTo(n + c, l + t), e.lineTo(n + i, l + t), e.closePath();
			break;
		}
		case "uparrow": {
			let t = i * Math.min(1, (o ?? 5e4) / 1e5), c = a * Math.min(1, (s ?? 5e4) / 1e5), l = n + (i - t) / 2;
			e.moveTo(u, r), e.lineTo(n + i, r + c), e.lineTo(l + t, r + c), e.lineTo(l + t, r + a), e.lineTo(l, r + a), e.lineTo(l, r + c), e.lineTo(n, r + c), e.closePath();
			break;
		}
		case "downarrow": {
			let t = i * Math.min(1, (o ?? 5e4) / 1e5), c = a * Math.min(1, (s ?? 5e4) / 1e5), l = n + (i - t) / 2;
			e.moveTo(u, r + a), e.lineTo(n + i, r + a - c), e.lineTo(l + t, r + a - c), e.lineTo(l + t, r), e.lineTo(l, r), e.lineTo(l, r + a - c), e.lineTo(n, r + a - c), e.closePath();
			break;
		}
		case "leftrightarrow": {
			let t = a * Math.min(1, (o ?? 5e4) / 1e5), c = i * Math.min(.5, (s ?? 25e3) / 1e5), l = r + (a - t) / 2;
			e.moveTo(n, d), e.lineTo(n + c, r), e.lineTo(n + c, l), e.lineTo(n + i - c, l), e.lineTo(n + i - c, r), e.lineTo(n + i, d), e.lineTo(n + i - c, r + a), e.lineTo(n + i - c, l + t), e.lineTo(n + c, l + t), e.lineTo(n + c, r + a), e.closePath();
			break;
		}
		case "updownarrow": {
			let t = i * Math.min(1, (o ?? 5e4) / 1e5), c = a * Math.min(.5, (s ?? 25e3) / 1e5), l = n + (i - t) / 2;
			e.moveTo(u, r), e.lineTo(n + i, r + c), e.lineTo(l + t, r + c), e.lineTo(l + t, r + a - c), e.lineTo(n + i, r + a - c), e.lineTo(u, r + a), e.lineTo(n, r + a - c), e.lineTo(l, r + a - c), e.lineTo(l, r + c), e.lineTo(n, r + c), e.closePath();
			break;
		}
		case "notchedrightarrow": {
			let t = a * Math.min(1, (o ?? 5e4) / 1e5), c = i * Math.min(1, (s ?? 35e3) / 1e5), l = r + (a - t) / 2, u = c * .43;
			e.moveTo(n, l), e.lineTo(n + i - c, l), e.lineTo(n + i - c, r), e.lineTo(n + i, d), e.lineTo(n + i - c, r + a), e.lineTo(n + i - c, l + t), e.lineTo(n, l + t), e.lineTo(n + u, d), e.closePath();
			break;
		}
		case "chevron": {
			let t = i * Math.min(1, Math.max(0, (o ?? 5e4) / 1e5));
			e.moveTo(n, r), e.lineTo(n + t, r), e.lineTo(n + i, d), e.lineTo(n + t, r + a), e.lineTo(n, r + a), t > 0 && e.lineTo(n + t, d), e.closePath();
			break;
		}
		case "homeplate": {
			let t = a * .4;
			e.moveTo(n, r), e.lineTo(n + i, r), e.lineTo(n + i, r + a - t), e.lineTo(u, r + a), e.lineTo(n, r + a - t), e.closePath();
			break;
		}
		case "leftbracket": {
			let t = Math.min(a * Math.min(5e4, Math.max(0, o ?? 8333)) / 1e5, a / 2);
			e.moveTo(n + i, r), e.quadraticCurveTo(n, r, n, r + t), a - 2 * t > .5 && e.lineTo(n, r + a - t), e.quadraticCurveTo(n, r + a, n + i, r + a);
			break;
		}
		case "rightbracket": {
			let t = Math.min(a * Math.min(5e4, Math.max(0, o ?? 8333)) / 1e5, a / 2);
			e.moveTo(n, r), e.quadraticCurveTo(n + i, r, n + i, r + t), a - 2 * t > .5 && e.lineTo(n + i, r + a - t), e.quadraticCurveTo(n + i, r + a, n, r + a);
			break;
		}
		case "leftbrace": {
			let t = d, o = i * .45;
			e.moveTo(n + i, r), e.bezierCurveTo(n + i - o, r, n + i - o, t - a * .08, n, t), e.bezierCurveTo(n + i - o, t + a * .08, n + i - o, r + a, n + i, r + a);
			break;
		}
		case "rightbrace": {
			let t = d, o = i * .45;
			e.moveTo(n, r), e.bezierCurveTo(n + o, r, n + o, t - a * .08, n + i, t), e.bezierCurveTo(n + o, t + a * .08, n + o, r + a, n, r + a);
			break;
		}
		case "wedgerectcallout": {
			e.rect(n, r, i, a * .8);
			let t = n + i * .2, o = r + a;
			e.moveTo(n + i * .1, r + a * .8), e.lineTo(t, o), e.lineTo(n + i * .3, r + a * .8), e.closePath();
			break;
		}
		case "wedgeellipsecallout": {
			let t = (o ?? -2e4) / 1e5 * i, n = (s ?? 12e4) / 1e5 * a, r = u + t, c = d + n;
			e.ellipse(u, d, i / 2, a / 2, 0, 0, Math.PI * 2);
			let l = Math.atan2(n, t), f = Math.PI / 10, p = i / 2, m = a / 2, h = u + p * Math.cos(l - f), g = d + m * Math.sin(l - f), _ = u + p * Math.cos(l + f), v = d + m * Math.sin(l + f);
			e.moveTo(h, g), e.lineTo(r, c), e.lineTo(_, v), e.closePath();
			break;
		}
		case "cloudcallout": {
			let t = Math.min(i, a) * .22, n = [
				[u - i * .25, r + a * .35],
				[u - i * .1, r + a * .15],
				[u + i * .1, r + a * .1],
				[u + i * .28, r + a * .2],
				[u + i * .35, r + a * .4]
			];
			e.moveTo(n[0][0] - t, n[0][1]);
			for (let [r, i] of n) e.arc(r, i, t, Math.PI, 0);
			e.arc(u, r + a * .65, i * .45, 0, Math.PI), e.closePath();
			let c = u + (o ?? -2e4) / 1e5 * i, l = d + (s ?? 12e4) / 1e5 * a;
			e.moveTo(u + i * .05, r + a * .8), e.arc(c, l, Math.min(i, a) * .07, 0, Math.PI * 2);
			break;
		}
		case "bentconnector2":
		case "bentconnector3":
		case "bentconnector4":
		case "bentconnector5":
		case "curvedconnector2":
		case "curvedconnector3":
		case "curvedconnector4":
		case "curvedconnector5":
			e.moveTo(n, r), e.lineTo(n + i, r + a);
			break;
		case "heart":
			e.moveTo(u, r + a * .32), e.bezierCurveTo(u, r, n + i * .05, r, n, r + a * .3), e.bezierCurveTo(n, r + a * .68, u - i * .05, r + a * .78, u, r + a), e.bezierCurveTo(u + i * .05, r + a * .78, n + i, r + a * .68, n + i, r + a * .3), e.bezierCurveTo(n + i - i * .05, r, u, r, u, r + a * .32);
			break;
		case "donut": {
			let t = i / 2, n = a / 2, r = Math.min(t, n) * (o ?? 25e3) / 1e5, s = t - r, c = n - r;
			e.ellipse(u, d, t, n, 0, 0, Math.PI * 2, !1), e.moveTo(u + s, d), e.ellipse(u, d, s, c, 0, 0, Math.PI * 2, !0);
			break;
		}
		case "nosmoking":
		case "nosmokingsign": {
			let t = (o ?? 18750) / 1e5, n = i / 2, r = a / 2, s = n * (1 - 2 * t), c = r * (1 - 2 * t);
			e.ellipse(u, d, n, r, 0, 0, Math.PI * 2, !1), e.moveTo(u + s, d), e.ellipse(u, d, s, c, 0, 0, Math.PI * 2, !0), e.moveTo(u + s, d), e.ellipse(u, d, s, c, 0, 0, Math.PI / 2, !1), e.lineTo(u - s, d), e.ellipse(u, d, s, c, 0, Math.PI, 3 * Math.PI / 2, !1), e.closePath();
			break;
		}
		case "pie": {
			let t = (o ?? 0) / 216e5 * Math.PI * 2, n = (s ?? 162e5) / 216e5 * Math.PI * 2;
			e.moveTo(u, d), e.arc(u, d, Math.min(i, a) / 2, t, n), e.closePath();
			break;
		}
		case "cloud": {
			let t = a * .28;
			e.arc(n + i * .25, r + a * .55, t, Math.PI, Math.PI * 1.8), e.arc(n + i * .45, r + a * .35, t * 1.1, Math.PI * 1.3, Math.PI * 1.9), e.arc(n + i * .65, r + a * .4, t, Math.PI * 1.5, Math.PI * 2), e.arc(n + i * .8, r + a * .6, t * .9, Math.PI * 1.6, Math.PI * .1), e.arc(n + i * .55, r + a * .75, t, 0, Math.PI * .7), e.arc(n + i * .25, r + a * .7, t * .9, 0, Math.PI), e.closePath();
			break;
		}
		case "funnel":
			e.moveTo(n, r), e.lineTo(n + i, r), e.lineTo(u + i * .15, r + a), e.lineTo(u - i * .15, r + a), e.closePath();
			break;
		case "smileyface": {
			e.ellipse(u, d, i / 2, a / 2, 0, 0, Math.PI * 2), e.closePath();
			let t = i * .05, n = a * .05, r = d - a * .12;
			e.moveTo(u - i * .2 + t, r), e.ellipse(u - i * .2, r, t, n, 0, 0, Math.PI * 2), e.moveTo(u + i * .2 + t, r), e.ellipse(u + i * .2, r, t, n, 0, 0, Math.PI * 2), e.moveTo(u - i * .25, d + a * .05), e.quadraticCurveTo(u, d + a * .3, u + i * .25, d + a * .05);
			break;
		}
		case "document":
		case "foldedcorner": {
			let t = Math.min(i, a) * .15;
			e.moveTo(n, r), e.lineTo(n + i - t, r), e.lineTo(n + i, r + t), e.lineTo(n + i, r + a), e.lineTo(n, r + a), e.closePath(), e.moveTo(n + i - t, r), e.lineTo(n + i - t, r + t), e.lineTo(n + i, r + t);
			break;
		}
		case "snip2samerect": {
			let t = Math.min(i, a) * Math.min(5e4, Math.max(0, o ?? 16667)) / 1e5;
			e.moveTo(n, r), e.lineTo(n + i - t, r), e.lineTo(n + i, r + t), e.lineTo(n + i, r + a), e.lineTo(n + t, r + a), e.lineTo(n, r + a - t), e.closePath();
			break;
		}
		case "snip2diagrect": {
			let t = Math.min(i, a) * Math.min(5e4, Math.max(0, o ?? 16667)) / 1e5;
			e.moveTo(n + t, r), e.lineTo(n + i - t, r), e.lineTo(n + i, r + t), e.lineTo(n + i, r + a - t), e.lineTo(n + i - t, r + a), e.lineTo(n + t, r + a), e.lineTo(n, r + a - t), e.lineTo(n, r + t), e.closePath();
			break;
		}
		case "sniproundrect": {
			let t = Math.min(i, a) * Math.min(5e4, Math.max(0, o ?? 16667)) / 1e5;
			e.moveTo(n + t, r), e.lineTo(n + i - t, r), e.lineTo(n + i, r + t), e.lineTo(n + i, r + a), e.lineTo(n, r + a), e.quadraticCurveTo(n, r, n + t, r), e.closePath();
			break;
		}
		case "round1rect": {
			let t = Math.min(i, a) * Math.min(5e4, Math.max(0, o ?? 16667)) / 1e5;
			e.moveTo(n + t, r), e.lineTo(n + i, r), e.lineTo(n + i, r + a), e.lineTo(n, r + a), e.lineTo(n, r + t), e.quadraticCurveTo(n, r, n + t, r), e.closePath();
			break;
		}
		case "plaque": {
			let t = Math.min(i, a) * .25;
			e.moveTo(n + t, r), e.lineTo(n + i - t, r), e.quadraticCurveTo(n + i, r, n + i, r + t), e.lineTo(n + i, r + a - t), e.quadraticCurveTo(n + i, r + a, n + i - t, r + a), e.lineTo(n + t, r + a), e.quadraticCurveTo(n, r + a, n, r + a - t), e.lineTo(n, r + t), e.quadraticCurveTo(n, r, n + t, r), e.closePath();
			break;
		}
		case "can": {
			let t = a * .1;
			e.ellipse(u, r + t, i / 2, t, 0, 0, Math.PI * 2), e.moveTo(n, r + t), e.lineTo(n, r + a - t), e.ellipse(u, r + a - t, i / 2, t, 0, Math.PI, 2 * Math.PI), e.lineTo(n + i, r + t);
			break;
		}
		case "cube": {
			let t = Math.min(i, a) * .2;
			e.moveTo(n + t, r), e.lineTo(n + i, r), e.lineTo(n + i, r + a - t), e.lineTo(n + i - t, r + a), e.lineTo(n, r + a), e.lineTo(n, r + t), e.closePath(), e.moveTo(n + t, r), e.lineTo(n + t, r + t), e.lineTo(n + i - t, r + t), e.moveTo(n + t, r + t), e.lineTo(n, r + t);
			break;
		}
		case "bevel": {
			let t = Math.min(i, a) * .1;
			e.rect(n, r, i, a), e.moveTo(n, r), e.lineTo(n + t, r + t), e.lineTo(n + i - t, r + t), e.lineTo(n + i, r), e.moveTo(n + i - t, r + t), e.lineTo(n + i - t, r + a - t), e.lineTo(n + i, r + a), e.moveTo(n + i - t, r + a - t), e.lineTo(n + t, r + a - t), e.lineTo(n, r + a), e.moveTo(n + t, r + a - t), e.lineTo(n + t, r + t);
			break;
		}
		case "halfframe": {
			let t = Math.min(i, a) * .25;
			e.moveTo(n, r), e.lineTo(n + i, r), e.lineTo(n + i, r + t), e.lineTo(n + t, r + t), e.lineTo(n + t, r + a), e.lineTo(n, r + a), e.closePath();
			break;
		}
		case "corner": {
			let t = Math.min(i, a) * .25;
			e.moveTo(n, r), e.lineTo(n + i, r), e.lineTo(n + i, r + t), e.lineTo(n + t, r + t), e.lineTo(n + t, r + a), e.lineTo(n, r + a), e.closePath();
			break;
		}
		case "flowchartalternateprocess":
		case "flowchartprocess": {
			let t = Math.min(i, a) * Math.min(5e4, Math.max(0, o ?? 16667)) / 1e5;
			e.roundRect(n, r, i, a, [{
				x: t,
				y: t
			}]);
			break;
		}
		case "flowchartterminator": {
			let t = Math.min(i, a) / 2;
			e.roundRect(n, r, i, a, [{
				x: t,
				y: t
			}]);
			break;
		}
		case "flowchartdocument": {
			let t = a * .1;
			e.moveTo(n, r), e.lineTo(n + i, r), e.lineTo(n + i, r + a - t), e.bezierCurveTo(n + i * .75, r + a, n + i * .25, r + a - t * 2, n, r + a - t), e.closePath();
			break;
		}
		case "moon":
			e.arc(u, d, Math.min(i, a) / 2, -Math.PI / 2, Math.PI / 2), e.arc(u - i * .2, d, Math.min(i, a) / 2, Math.PI / 2, -Math.PI / 2, !0), e.closePath();
			break;
		case "arc": {
			let t = 216e5, n = (o ?? 162e5) / t * Math.PI * 2, r = (s ?? 54e5) / t * Math.PI * 2;
			e.ellipse(u, d, i / 2, a / 2, 0, n, n + r, r < 0);
			break;
		}
		case "mathmultiply": {
			let t = Math.min(i, a) * Math.min(51965, Math.max(0, o ?? 23520)) / 1e5, s = Math.atan2(a, i), c = Math.sin(s), l = Math.cos(s), u = t / 2 * c, d = t / 2 * l;
			e.moveTo(n + u, r - d), e.lineTo(n - u, r + d), e.lineTo(n + i - u, r + a + d), e.lineTo(n + i + u, r + a - d), e.closePath(), e.moveTo(n + i - u, r - d), e.lineTo(n + i + u, r + d), e.lineTo(n + u, r + a + d), e.lineTo(n - u, r + a - d), e.closePath();
			break;
		}
		case "mathdivide": {
			let t = Math.min(36745, Math.max(1e3, o ?? 23520)), n = (73490 + -t) / 4, l = 36745 * i / a, f = Math.min(Math.min(n, l), Math.max(1e3, c ?? 11760)), p = 73490 + 4 * f - t, m = Math.min(p, Math.max(0, s ?? 5880)), h = a * t / 2e5, g = a * m / 1e5, _ = a * f / 1e5, v = i * 73490 / 2e5, y = d - h, b = d + h, x = y - (g + _) - _, S = r + a - x, C = u - v, w = u + v;
			e.rect(C, y, w - C, b - y), e.moveTo(u + _, x + _), e.arc(u, x + _, _, 0, Math.PI * 2), e.moveTo(u + _, S - _), e.arc(u, S - _, _, 0, Math.PI * 2);
			break;
		}
		case "quadarrow": {
			let t = i * (o ?? 23e3) / 1e5, c = i * (s ?? 3e4) / 1e5, l = n + (i - t) / 2, f = r + (a - t) / 2;
			e.moveTo(u, r), e.lineTo(n + i - c, r + c), e.lineTo(n + i - c, f), e.lineTo(l + t, f), e.lineTo(l + t, r + c), e.lineTo(n + c, r + c), e.lineTo(n + i, d), e.lineTo(n + i - c, r + a - c), e.lineTo(l + t, r + a - c), e.lineTo(l + t, f + t), e.lineTo(n + i - c, f + t), e.lineTo(n + i - c, r + a - c), e.lineTo(u, r + a), e.lineTo(n + c, r + a - c), e.lineTo(n + c, f + t), e.lineTo(l, f + t), e.lineTo(l, r + a - c), e.lineTo(n, d), e.lineTo(n + c, r + c), e.lineTo(l, r + c), e.lineTo(l, f), e.lineTo(n + c, f), e.closePath();
			break;
		}
		case "wave": {
			let t = a * (o ?? 12500) / 1e5, s = r + t, c = r + a - t;
			e.moveTo(n, s), e.bezierCurveTo(n + i * .25, r, n + i * .25, r + t * 2, n + i * .5, s), e.bezierCurveTo(n + i * .75, r + t * 2, n + i * .75, r, n + i, s), e.lineTo(n + i, c), e.bezierCurveTo(n + i * .75, r + a, n + i * .75, r + a - t * 2, n + i * .5, c), e.bezierCurveTo(n + i * .25, r + a - t * 2, n + i * .25, r + a, n, c), e.closePath();
			break;
		}
		case "doublewave": {
			let t = a * (o ?? 6250) / 1e5, s = r + t, c = r + a - t;
			e.moveTo(n, s), e.bezierCurveTo(n + i * .25, r, n + i * .25, r + t * 2, n + i * .5, s), e.bezierCurveTo(n + i * .75, r + t * 2, n + i * .75, r, n + i, s), e.lineTo(n + i, c), e.bezierCurveTo(n + i * .75, r + a, n + i * .75, r + a - t * 2, n + i * .5, c), e.bezierCurveTo(n + i * .25, r + a - t * 2, n + i * .25, r + a, n, c), e.closePath();
			break;
		}
		case "sun": {
			let t = Math.min(i, a) / 2, n = t * ((o ?? 25e3) / 1e5 + .5), r = Math.min(n, t * .9), s = Math.PI / 16;
			for (let n = 0; n < 8; n++) {
				let i = n / 8 * Math.PI * 2;
				e.moveTo(u + r * Math.cos(i - s), d + r * Math.sin(i - s)), e.lineTo(u + t * Math.cos(i), d + t * Math.sin(i)), e.lineTo(u + r * Math.cos(i + s), d + r * Math.sin(i + s)), e.closePath();
			}
			e.moveTo(u + r, d), e.arc(u, d, r, 0, Math.PI * 2);
			break;
		}
		case "lightningbolt":
			e.moveTo(u + i * .1, r), e.lineTo(n, d - a * .05), e.lineTo(u + i * .05, d - a * .05), e.lineTo(u - i * .1, r + a), e.lineTo(n + i, d + a * .05), e.lineTo(u - i * .05, d + a * .05), e.closePath();
			break;
		case "bracketpair": {
			let t = a * Math.min(5e4, Math.max(0, o ?? 8333)) / 1e5;
			e.moveTo(n + i * .4, r), e.quadraticCurveTo(n, r, n, r + t), a - 2 * t > 0 && e.lineTo(n, r + a - t), e.quadraticCurveTo(n, r + a, n + i * .4, r + a), e.moveTo(n + i * .6, r), e.quadraticCurveTo(n + i, r, n + i, r + t), a - 2 * t > 0 && e.lineTo(n + i, r + a - t), e.quadraticCurveTo(n + i, r + a, n + i * .6, r + a);
			break;
		}
		case "bracepair": {
			let t = i * .2;
			e.moveTo(n + i * .4, r), e.bezierCurveTo(n + i * .4 - t, r, n + i * .4 - t, d - a * .08, n, d), e.bezierCurveTo(n + i * .4 - t, d + a * .08, n + i * .4 - t, r + a, n + i * .4, r + a), e.moveTo(n + i * .6, r), e.bezierCurveTo(n + i * .6 + t, r, n + i * .6 + t, d - a * .08, n + i, d), e.bezierCurveTo(n + i * .6 + t, d + a * .08, n + i * .6 + t, r + a, n + i * .6, r + a);
			break;
		}
		case "chord": {
			let t = (o ?? 27e5) / 216e5 * Math.PI * 2, n = (s ?? 162e5) / 216e5 * Math.PI * 2;
			e.ellipse(u, d, i / 2, a / 2, 0, t, n), e.closePath();
			break;
		}
		case "blockarc": {
			let t = Math.min(i, a) / 2, n = o ?? 108e5, r = s ?? 0, l = t * (1 - (c ?? 25e3) / 1e5), f = n / 216e5 * Math.PI * 2, p = r / 216e5 * Math.PI * 2;
			e.arc(u, d, t, f, p, !1), e.arc(u, d, l, p, f, !0), e.closePath();
			break;
		}
		case "teardrop": {
			let t = Math.min(i, a) * .4, o = n + t, s = r + a - t;
			e.arc(o, s, t, 0, Math.PI * 2 * .75), e.bezierCurveTo(o - t * .1, s - t, n + i - t, r + t, n + i, r), e.bezierCurveTo(n + i - t * .2, r + t * .5, o + t, s - t * 1.1, o + t, s), e.closePath();
			break;
		}
		case "diagstripe": {
			let t = a * (o ?? 5e4) / 1e5 * i / a;
			e.moveTo(n + t, r), e.lineTo(n + i, r), e.lineTo(n + i - t, r + a), e.lineTo(n, r + a), e.closePath();
			break;
		}
		case "wedgeroundrectcallout": {
			let t = Math.min(i, a) * .1;
			e.roundRect(n, r, i, a * .85, t), e.moveTo(n + i * .1, r + a * .85), e.lineTo(n + i * .2, r + a), e.lineTo(n + i * .3, r + a * .85), e.closePath();
			break;
		}
		case "rightarrowcallout": {
			let t = a * (o ?? 5e4) / 1e5, c = i * (s ?? 5e4) / 1e5, l = r + (a - t) / 2;
			e.rect(n, l, c, t), e.moveTo(n + c, r), e.lineTo(n + i, d), e.lineTo(n + c, r + a), e.closePath();
			break;
		}
		case "leftarrowcallout": {
			let t = a * (o ?? 5e4) / 1e5, c = i * (s ?? 5e4) / 1e5, l = r + (a - t) / 2;
			e.rect(n + i - c, l, c, t), e.moveTo(n + i - c, r), e.lineTo(n, d), e.lineTo(n + i - c, r + a), e.closePath();
			break;
		}
		case "uparrowcallout": {
			let t = i * (o ?? 5e4) / 1e5, c = a * (s ?? 5e4) / 1e5, l = n + (i - t) / 2;
			e.rect(l, r + c, t, a - c), e.moveTo(n, r + c), e.lineTo(u, r), e.lineTo(n + i, r + c), e.closePath();
			break;
		}
		case "downarrowcallout": {
			let t = i * (o ?? 5e4) / 1e5, c = a * (s ?? 5e4) / 1e5, l = n + (i - t) / 2;
			e.rect(l, r, t, a - c), e.moveTo(n, r + a - c), e.lineTo(u, r + a), e.lineTo(n + i, r + a - c), e.closePath();
			break;
		}
		case "leftrightarrowcallout": {
			let t = a * (o ?? 5e4) / 1e5, c = i * (s ?? 25e3) / 1e5, l = r + (a - t) / 2;
			e.rect(n + c, l, i - 2 * c, t), e.moveTo(n + c, r), e.lineTo(n, d), e.lineTo(n + c, r + a), e.closePath(), e.moveTo(n + i - c, r), e.lineTo(n + i, d), e.lineTo(n + i - c, r + a), e.closePath();
			break;
		}
		case "leftrightuparrow": {
			let t = i * (o ?? 25e3) / 1e5, c = a * (s ?? 3e4) / 1e5, l = n + (i - t) / 2;
			e.moveTo(u, r), e.lineTo(n + i, r + c), e.lineTo(l + t, r + c), e.lineTo(l + t, r + a), e.lineTo(l, r + a), e.lineTo(l, r + c), e.lineTo(n, r + c), e.closePath();
			break;
		}
		case "uturnarrow": {
			let t = i * (o ?? 25e3) / 1e5, s = (i - t) / 2, c = Math.max(0, s - t), l = n + t + s, u = r + t + s, d = t * 2, f = r + a - t * 2.5;
			e.moveTo(n, r + a), e.lineTo(n, u), e.arc(l, u, s, Math.PI, 0), e.lineTo(n + i, f), e.lineTo(n + i + (d - t) / 2, f), e.lineTo(l + t / 2, r + a), e.lineTo(n + i - (d - t) / 2 - t, f), e.lineTo(n + i - t, f), e.lineTo(n + i - t, u), e.arc(l, u, c, 0, Math.PI, !0), e.lineTo(n + t, r + a), e.closePath();
			break;
		}
		case "bentarrow":
		case "bentuparrow": {
			let t = Math.min(i, a) * .25;
			e.moveTo(n, d - t / 2), e.lineTo(n + i - t * 2, d - t / 2), e.lineTo(n + i - t * 2, r + t), e.lineTo(n + i, d), e.lineTo(n + i - t * 2, r + a - t), e.lineTo(n + i - t * 2, d + t / 2), e.lineTo(n, d + t / 2), e.closePath();
			break;
		}
		case "plus": {
			let t = Math.min(i, a) * (o ?? 25e3) / 1e5;
			e.rect(u - t, r, 2 * t, a), e.rect(n, d - t, i, 2 * t);
			break;
		}
		case "mathnotequal": {
			let t = Math.min(5e4, Math.max(0, o ?? 23520)), n = Math.min(66e5, Math.max(42e5, s ?? 66e5)), l = Math.min(1e5 - 2 * t, Math.max(0, c ?? 11760)), f = a * t / 1e5, p = a * l / 2e5, m = i * 73490 / 2e5, h = a / 2, g = (n / 6e4 - 90) * Math.PI / 180, _ = h * Math.tan(g), v = Math.hypot(_, h) * f / h;
			e.rect(u - m, d - p - f, 2 * m, f), e.rect(u - m, d + p, 2 * m, f), e.moveTo(u + _ - v / 2, r), e.lineTo(u + _ + v / 2, r), e.lineTo(u - _ + v / 2, r + a), e.lineTo(u - _ - v / 2, r + a), e.closePath();
			break;
		}
		case "flowchartdelay": {
			let t = a / 2;
			e.moveTo(n, r), e.lineTo(n + i - t, r), e.arc(n + i - t, d, t, -Math.PI / 2, Math.PI / 2), e.lineTo(n, r + a), e.closePath();
			break;
		}
		case "flowchartdisplay": {
			let t = i * .2, o = i * .15;
			e.moveTo(n + t, r), e.lineTo(n + i - o, r), e.arc(n + i - o, d, a / 2, -Math.PI / 2, Math.PI / 2), e.lineTo(n + t, r + a), e.lineTo(n, d), e.closePath();
			break;
		}
		case "flowchartpunchedcard": {
			let t = i * .2;
			e.moveTo(n + t, r), e.lineTo(n + i, r), e.lineTo(n + i - t, r + a), e.lineTo(n, r + a), e.closePath();
			break;
		}
		case "flowchartoffpageconnector": {
			let t = a * .3;
			e.moveTo(n, r), e.lineTo(n + i, r), e.lineTo(n + i, r + a - t), e.lineTo(u, r + a), e.lineTo(n, r + a - t), e.closePath();
			break;
		}
		case "flowchartonlinestorage":
		case "flowchartmanuallabel":
		case "flowchartpuncheddisk":
			e.rect(n, r, i, a);
			break;
		case "horizontalscroll": {
			let t = Math.min(i, a) * .15;
			e.roundRect(n + t, r, i - t, a, t), e.moveTo(n + t, r + t * 2), e.arc(n + t, r + t, t, Math.PI / 2, Math.PI * 2.5);
			break;
		}
		case "verticalscroll": {
			let t = Math.min(i, a) * .15;
			e.roundRect(n, r + t, i, a - t, t), e.moveTo(n + t * 2, r + t), e.arc(n + t, r + t, t, 0, Math.PI * 2);
			break;
		}
		case "ribbon": {
			let t = Math.min(33333, Math.max(0, o ?? 16667)), c = i * Math.min(75e3, Math.max(25e3, s ?? 5e4)) / 2e5, l = i / 8, u = i / 32, d = i / 2 - c, f = i / 2 + c, p = d + u, m = f - u, h = d + l, g = f - l, _ = h - u, v = g + u, y = i - l, b = a * t / 2e5, x = a * t / 1e5, S = a - x, C = S / 2;
			e.moveTo(n, r), e.lineTo(n + _, r), e.lineTo(n + p, r + b), e.lineTo(n + m, r + x), e.lineTo(n + v, r + b), e.lineTo(n + i, r), e.lineTo(n + y, r + C), e.lineTo(n + i, r + S), e.lineTo(n + f, r + S), e.lineTo(n + f, r + a), e.lineTo(n + p, r + a), e.lineTo(n + d, r + S), e.lineTo(n, r + S), e.lineTo(n + l, r + C), e.closePath();
			break;
		}
		case "ribbon2": {
			let t = Math.min(33333, Math.max(0, o ?? 16667)), c = i * Math.min(75e3, Math.max(25e3, s ?? 5e4)) / 2e5, l = i / 8, u = i / 32, d = i / 2 - c, f = i / 2 + c, p = d + u, m = f - u, h = d + l, g = f - l, _ = h - u, v = g + u, y = i - l, b = a * t / 2e5, x = a * t / 1e5, S = a - b, C = a - x, w = x, T = (w + a) / 2;
			e.moveTo(n, r + a), e.lineTo(n + _, r + a), e.lineTo(n + p, r + S), e.lineTo(n + m, r + C), e.lineTo(n + v, r + S), e.lineTo(n + i, r + a), e.lineTo(n + y, r + T), e.lineTo(n + i, r + w), e.lineTo(n + f, r + w), e.lineTo(n + f, r), e.lineTo(n + p, r), e.lineTo(n + d, r + w), e.lineTo(n, r + w), e.lineTo(n + l, r + T), e.closePath();
			break;
		}
		case "ellipseribbon": {
			let t = Math.min(1e5, Math.max(0, o ?? 25e3)), l = Math.min(75e3, Math.max(25e3, s ?? 5e4)), u = Math.max(0, t - (1e5 - t) / 2), d = Math.min(t, Math.max(u, c ?? 12500)), f = i / 8, p = i * l / 2e5, m = i / 2 - p, h = m + f, g = i - h, _ = i - m, v = i - f, y = a * d / 1e5, b = 4 * y / i, x = b * (h - h * h / i), S = h / 2, C = b * S, w = i - S, T = a * t / 1e5, E = T - y, D = b * (m - m * m / i), O = D + E, k = y + E - O + y + E, A = a - T, j = (y * 14 / 16 + A) / 2, M = D + A, N = O + A, P = m / 2, F = b * P + A, I = i - P, L = k + A;
			e.moveTo(n, r), e.quadraticCurveTo(n + S, r + C, n + h, r + x), e.lineTo(n + m, r + O), e.quadraticCurveTo(n + i / 2, r + k, n + _, r + O), e.lineTo(n + g, r + x), e.quadraticCurveTo(n + w, r + C, n + i, r), e.lineTo(n + v, r + j), e.lineTo(n + i, r + A), e.quadraticCurveTo(n + I, r + F, n + _, r + M), e.lineTo(n + _, r + N), e.quadraticCurveTo(n + i / 2, r + L, n + m, r + N), e.lineTo(n + m, r + M), e.quadraticCurveTo(n + P, r + F, n, r + A), e.lineTo(n + f, r + j), e.closePath();
			break;
		}
		case "ellipseribbon2": {
			let t = Math.min(1e5, Math.max(0, o ?? 25e3)), l = Math.min(75e3, Math.max(25e3, s ?? 5e4)), u = Math.max(0, t - (1e5 - t) / 2), d = Math.min(t, Math.max(u, c ?? 12500)), f = i / 8, p = i * l / 2e5, m = i / 2 - p, h = m + f, g = i - h, _ = i - m, v = i - f, y = a * d / 1e5, b = 4 * y / i, x = a - b * (h - h * h / i), S = h / 2, C = a - b * S, w = i - S, T = a * t / 1e5, E = T - y, D = b * (m - m * m / i), O = D + E, k = a - O, A = y + E - O + y + E, j = a - A, M = a - T, N = a - (y * 14 / 16 + M) / 2, P = a - (D + M), F = a - (O + M), I = m / 2, L = a - (b * I + M), ee = i - I, te = a - (A + M);
			e.moveTo(n, r + a), e.quadraticCurveTo(n + S, r + C, n + h, r + x), e.lineTo(n + m, r + k), e.quadraticCurveTo(n + i / 2, r + j, n + _, r + k), e.lineTo(n + g, r + x), e.quadraticCurveTo(n + w, r + C, n + i, r + a), e.lineTo(n + v, r + N), e.lineTo(n + i, r + T), e.quadraticCurveTo(n + ee, r + L, n + _, r + P), e.lineTo(n + _, r + F), e.quadraticCurveTo(n + i / 2, r + te, n + m, r + F), e.lineTo(n + m, r + P), e.quadraticCurveTo(n + I, r + L, n, r + T), e.lineTo(n + f, r + N), e.closePath();
			break;
		}
		case "circulararrow": {
			let t = (s ?? 0) / 6e4 * Math.PI / 180, n = (o ?? 162e5) / 6e4 * Math.PI / 180, r = (c ?? 5e4) / 1e5, l = Math.min(i, a) / 2, f = l * (1 - r), p = (l + f) / 2, m = l - f, h = t + n;
			e.arc(u, d, l, t, h, !1), e.arc(u, d, f, h, t, !0), e.closePath();
			let g = Math.sin(h), _ = -Math.cos(h), v = m * 1.5, y = u + p * Math.cos(h) + v * g, b = d + p * Math.sin(h) + v * _;
			e.moveTo(y, b), e.lineTo(u + l * Math.cos(h), d + l * Math.sin(h)), e.lineTo(u + f * Math.cos(h), d + f * Math.sin(h)), e.closePath();
			break;
		}
		case "curvedrightarrow": {
			let t = Math.min(i, a), l = a / 2, u = 5e4 * a / t, d = Math.min(u, Math.max(0, s ?? 5e4)), f = t * Math.min(d, Math.max(0, o ?? 25e3)) / 1e5, p = t * d / 1e5, m = l - (f + p) / 4, h = (2 * m) ** 2 - f ** 2, g = 1e5 * (Math.sqrt(Math.max(0, h)) * i / (2 * m)) / t, _ = t * Math.min(g, Math.max(0, c ?? 25e3)) / 1e5, v = Math.sqrt(Math.max(0, i * i - _ * _)) * m / i, y = m + f, b = m + v, x = y + v, S = (p - f) / 2, C = b - S, w = x + S, T = a - p / 2, E = i - _, D = Math.atan2(_, v), O = -D, k = Math.PI - D;
			e.moveTo(n, r + m), G(e, n, r + m, i, m, Math.PI, O), e.lineTo(n + E, r + C), e.lineTo(n + i, r + T), e.lineTo(n + E, r + w), e.lineTo(n + E, r + x), G(e, n + E, r + x, i, m, k, D), e.closePath();
			break;
		}
		case "curvedleftarrow": {
			let t = Math.min(i, a), l = a / 2, u = 5e4 * a / t, d = Math.min(u, Math.max(0, s ?? 5e4)), f = t * Math.min(d, Math.max(0, o ?? 25e3)) / 1e5, p = t * d / 1e5, m = l - (f + p) / 4, h = (2 * m) ** 2 - f ** 2, g = Math.sqrt(Math.max(0, h)) * i / (2 * m), _ = 1e5 * g / t, v = t * Math.min(_, Math.max(0, c ?? 25e3)) / 1e5, y = Math.sqrt(Math.max(0, i * i - v * v)) * m / i, b = m + f, x = m + y, S = b + y, C = (p - f) / 2, w = x - C, T = S + C, E = a - p / 2, D = v, O = Math.atan2(v, y), k = f / 2, A = Math.atan2(k, g), j = A - O, M = O - A, N = -A;
			e.moveTo(n, r + E), e.lineTo(n + D, r + w), e.lineTo(n + D, r + x);
			let P = G(e, n + D, r + x, i, m, O, j);
			G(e, P.x, P.y, i, m, N, M), e.lineTo(n + D, r + T), e.closePath();
			break;
		}
		case "curveduparrow": {
			let t = Math.min(i, a), l = i / 2, u = 5e4 * i / t, d = Math.min(u, Math.max(0, s ?? 5e4)), f = t * Math.min(1e5, Math.max(0, o ?? 25e3)) / 1e5, p = t * d / 1e5, m = l - (f + p) / 4, h = (2 * m) ** 2 - f ** 2, g = Math.sqrt(Math.max(0, h)) * a / (2 * m), _ = 1e5 * g / t, v = t * Math.min(_, Math.max(0, c ?? 25e3)) / 1e5, y = Math.sqrt(Math.max(0, a * a - v * v)) * m / a, b = m + f, x = m + y, S = b + y, C = (p - f) / 2, w = x - C, T = S + C, E = i - p / 2, D = v, O = Math.atan2(v, y), k = f / 2, A = Math.atan2(k, g), j = A - O, M = O - A, N = Math.PI / 2 - O, P = Math.PI / 2 - A;
			e.moveTo(n + E, r), e.lineTo(n + T, r + D), e.lineTo(n + S, r + D);
			let F = G(e, n + S, r + D, m, a, N, M);
			G(e, F.x, F.y, m, a, P, j), e.lineTo(n + w, r + D), e.closePath();
			break;
		}
		case "curveddownarrow": {
			let t = Math.min(i, a), l = i / 2, u = 5e4 * i / t, d = Math.min(u, Math.max(0, s ?? 5e4)), f = t * Math.min(1e5, Math.max(0, o ?? 25e3)) / 1e5, p = t * d / 1e5, m = l - (f + p) / 4, h = (2 * m) ** 2 - f ** 2, g = Math.sqrt(Math.max(0, h)) * a / (2 * m), _ = 1e5 * g / t, v = t * Math.min(_, Math.max(0, c ?? 25e3)) / 1e5, y = Math.sqrt(Math.max(0, a * a - v * v)) * m / a, b = m + f, x = m + y, S = b + y, C = (p - f) / 2, w = x - C, T = S + C, E = i - p / 2, D = a - v, O = Math.atan2(v, y), k = f / 2, A = Math.atan2(k, g), j = 3 * Math.PI / 2 + O;
			3 * Math.PI / 2 - A, A - Math.PI / 2, Math.PI / 2 - A, e.moveTo(n + E, r + a), e.lineTo(n + w, r + D), e.lineTo(n + x, r + D), G(e, n + x, r + D, m, a, j, -O), e.lineTo(n + b, r), G(e, n + b, r, m, a, 3 * Math.PI / 2, O), e.lineTo(n + T, r + D), e.closePath();
			break;
		}
		case "stripedrightarrow": {
			let t = Math.min(i, a), c = t / 32, l = t / 16, u = t / 8, f = t * (o ?? 5e4) / 1e5, p = i * (s ?? 5e4) / 1e5, m = d - f / 2, h = d + f / 2, g = n + i - p;
			e.rect(n, m, c, f), e.rect(n + l, m, l, f), e.rect(n + u, m, u, f), e.moveTo(g, m), e.lineTo(g, r), e.lineTo(n + i, d), e.lineTo(g, r + a), e.lineTo(g, h), e.lineTo(n + u * 2, h), e.lineTo(n + u * 2, m), e.closePath();
			break;
		}
		case "flowchartmagneticdisk": {
			let t = a * .15;
			e.moveTo(n, r + t), e.ellipse(u, r + t, i / 2, t, 0, Math.PI, 0), e.lineTo(n + i, r + a - t), e.ellipse(u, r + a - t, i / 2, t, 0, 0, Math.PI), e.lineTo(n, r + t), e.closePath(), e.moveTo(n + i, r + t), e.ellipse(u, r + t, i / 2, t, 0, 0, Math.PI);
			break;
		}
		case "flowchartmagneticdrum": {
			let t = i * .15;
			e.moveTo(n + t, r), e.lineTo(n + i, r), e.lineTo(n + i, r + a), e.lineTo(n + t, r + a), e.ellipse(n + t, d, t, a / 2, 0, Math.PI / 2, -Math.PI / 2, !0), e.closePath(), e.moveTo(n + i, r), e.ellipse(n + i, d, t, a / 2, 0, -Math.PI / 2, Math.PI / 2);
			break;
		}
		case "flowchartmagnetictape": {
			let t = Math.min(i, a) / 2, n = u + t * .5;
			e.moveTo(u, r + a), e.arc(u, d, t, Math.PI / 2, Math.PI / 2 + Math.PI * 2 * .875), e.lineTo(n, d + t * .5), e.lineTo(n, r + a), e.closePath();
			break;
		}
		case "flowchartpunchedtape": {
			let t = a * .12;
			e.moveTo(n, r), e.lineTo(n + i, r), e.lineTo(n + i, r + a - t), e.bezierCurveTo(n + i * .75, r + a, n + i * .25, r + a - t * 2, n, r + a - t), e.closePath(), e.moveTo(n, r + t), e.bezierCurveTo(n + i * .25, r, n + i * .75, r + t * 2, n + i, r + t);
			break;
		}
		case "flowchartmanualoperation": {
			let t = i * .15;
			e.moveTo(n + t, r), e.lineTo(n + i - t, r), e.lineTo(n + i, r + a), e.lineTo(n, r + a), e.closePath();
			break;
		}
		case "flowchartmultidocument": {
			let t = a * .1, o = i * .04;
			e.rect(n + o * 2, r - a * .08, i - o * 2, a * .1), e.rect(n + o, r - a * .04, i - o, a * .06), e.moveTo(n, r), e.lineTo(n + i, r), e.lineTo(n + i, r + a - t), e.bezierCurveTo(n + i * .75, r + a, n + i * .25, r + a - t * 2, n, r + a - t), e.closePath();
			break;
		}
		case "rttriangle":
			e.moveTo(n, r), e.lineTo(n, r + a), e.lineTo(n + i, r + a), e.closePath();
			break;
		default:
			e.rect(n, r, i, a);
			break;
	}
}
//#endregion
//#region packages/core/src/shape/arrow.ts
function K(e, t, n) {
	let r = Math.max(.5, t.width * n), i = e.w === "sm" ? 4 : e.w === "lg" ? 8 : 6, a = e.len === "sm" ? 4 : e.len === "lg" ? 8 : 6;
	return {
		lw: r,
		halfW: r * i / 2,
		len: r * a
	};
}
var Le = new Set([
	"triangle",
	"stealth",
	"diamond",
	"oval"
]);
function Re(e, t, n) {
	return Le.has(e.type) ? K(e, t, n).len : 0;
}
function ze(e, t, n) {
	if (e.type === "none") return 0;
	let { lw: r, halfW: i, len: a } = K(e, t, n);
	return Math.max(a, i) + r / 2;
}
function Be(e, t, n) {
	if (n <= 0) return {
		x: e.x,
		y: e.y
	};
	let r = t.x - e.x, i = t.y - e.y, a = Math.hypot(r, i);
	if (a < 1e-9) return {
		x: e.x,
		y: e.y
	};
	let o = Math.min(n, a) / a;
	return {
		x: e.x + r * o,
		y: e.y + i * o
	};
}
function Ve(e, t, r, a, o, s, c, l) {
	if (o.type === "none") return;
	let { lw: u, halfW: d, len: f } = K(o, s, c), p = l ?? n(s.color), m = i(s.fill) && typeof e.getTransform == "function" ? e.getTransform() : void 0, h = () => {
		m && typeof p == "object" && "setTransform" in p && e.setTransform(m);
	};
	switch (e.save(), e.translate(t, r), e.rotate(a), e.fillStyle = p, e.strokeStyle = p, e.lineWidth = u, e.setLineDash([]), e.beginPath(), o.type) {
		case "triangle":
		case "stealth":
			e.moveTo(0, 0), e.lineTo(-f, -d), e.lineTo(-f, d), e.closePath(), h(), e.fill();
			break;
		case "arrow":
			e.lineCap = "round", e.lineJoin = "round", e.moveTo(-f, -d), e.lineTo(0, 0), e.lineTo(-f, d), h(), e.stroke();
			break;
		case "diamond":
			e.moveTo(0, 0), e.lineTo(-f / 2, -d), e.lineTo(-f, 0), e.lineTo(-f / 2, d), e.closePath(), h(), e.fill();
			break;
		case "oval":
			e.ellipse(-f / 2, 0, f / 2, d, 0, 0, Math.PI * 2), h(), e.fill();
			break;
	}
	e.restore();
}
function He(t, n, r, a, o, s, c, l, u, d) {
	if (!n.fill || c.type === "none") return;
	if (!i(n.fill) || typeof t.getTransform != "function") return e(n.fill, t, l.x, l.y, l.w, l.h, u, d) ?? void 0;
	let { lw: f, halfW: p, len: m } = K(c, n, r), h = t.getTransform(), g = Math.cos(s), _ = Math.sin(s), v = h.a * g + h.c * _, y = h.b * g + h.d * _, b = -h.a * _ + h.c * g, x = -h.b * _ + h.d * g, S = h.a * a + h.c * o + h.e - v * m / 2, C = h.b * a + h.d * o + h.f - y * m / 2, w = c.type === "oval" ? Math.hypot(v * m / 2, b * p) : Math.abs(v) * m / 2 + Math.abs(b) * p, T = c.type === "oval" ? Math.hypot(y * m / 2, x * p) : Math.abs(y) * m / 2 + Math.abs(x) * p, E = c.type === "arrow" ? f / 2 * Math.hypot(v, b) : 0, D = c.type === "arrow" ? f / 2 * Math.hypot(y, x) : 0;
	return e(n.fill, t, l.x, l.y, l.w, l.h, u, d, void 0, void 0, {
		x: S - w - E,
		y: C - T - D,
		w: 2 * (w + E),
		h: 2 * (T + D)
	}) ?? void 0;
}
//#endregion
//#region packages/core/src/image/optional-image-fallback.ts
var Ue = class e extends Error {
	code = "ooxml-optional-image-codec-unavailable";
	constructor(t) {
		super(`${t.toUpperCase()} image requires an optional codec`), this.codec = t, this.name = "OptionalImageCodecUnavailableError", Object.setPrototypeOf(this, e.prototype);
	}
};
function We(e, t) {
	if (typeof e != "object" || !e) return !1;
	try {
		let n = e;
		return n.code === "ooxml-optional-image-codec-unavailable" && n.codec === "tiff" && (t === void 0 || n.codec === t);
	} catch {
		return !1;
	}
}
var Ge = {
	tiff: "TIFF image unavailable",
	pict: "PICT image unsupported"
};
function Ke(e, t, n) {
	if (!(![
		n.x,
		n.y,
		n.width,
		n.height
	].every(Number.isFinite) || n.width <= 0 || n.height <= 0)) {
		e.save();
		try {
			e.fillStyle = "#888", e.font = "11px sans-serif", e.textAlign = "center", e.textBaseline = "middle";
			let r = Ge[t];
			e.fillText(r, n.x + n.width / 2, n.y + n.height / 2, n.width);
		} finally {
			e.restore();
		}
	}
}
//#endregion
//#region packages/core/src/math/mathml.ts
var qe = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
}, q = (e) => e.replace(/[&<>"]/g, (e) => qe[e]);
function Je(e, t = "roman") {
	if (t === "double-struck" || t === "monospace") return t;
	if (t === "fraktur") return e === "bold" || e === "boldItalic" ? "bold-fraktur" : "fraktur";
	if (t === "script") return e === "bold" || e === "boldItalic" ? "bold-script" : "script";
	if (t === "sans-serif") switch (e) {
		case "roman": return "sans-serif";
		case "italic": return "sans-serif-italic";
		case "bold": return "bold-sans-serif";
		case "boldItalic": return "sans-serif-bold-italic";
	}
	switch (e) {
		case "roman": return "normal";
		case "bold": return "bold";
		case "boldItalic": return "bold-italic";
		case "italic": return null;
	}
}
var Ye = new Set([..."⏞⏟⎴⎵︷︸⏜⏝{}[]()¯_‾"]), Xe = "+−±∓×÷·∗⋅∘∙*/", Ze = "=≠<>≤≥≈≡∼≅≃→←↔⇒∈∉⊂⊆⊃⊇∝≪≫⊥≔", Qe = "([{⟨⌈⌊", $e = ")]}⟩⌉⌋", et = ",;";
function tt(e, t, n) {
	let r = Je(t, n), i = r ? ` mathvariant="${r}"` : "", a = "", o = "", s = () => {
		o &&= (a += `<mn${i}>${q(o)}</mn>`, "");
	};
	for (let t of e) {
		if (t === " ") {
			s();
			continue;
		}
		if (t >= "0" && t <= "9") {
			o += t;
			continue;
		}
		s(), Xe.includes(t) || Ze.includes(t) || et.includes(t) ? a += `<mo>${q(t)}</mo>` : Qe.includes(t) || $e.includes(t) ? a += `<mo fence="true" stretchy="false">${q(t)}</mo>` : a += `<mi${i}>${q(t)}</mi>`;
	}
	return s(), a;
}
function J(e) {
	return e.map(nt).join("");
}
function Y(e) {
	return `<mrow>${J(e)}</mrow>`;
}
function nt(e) {
	switch (e.kind) {
		case "run": return tt(e.text, e.style, e.__script);
		case "group": return Y(e.items);
		case "fraction": return `<mfrac${e.bar === !1 ? " linethickness=\"0\"" : ""}>${Y(e.num)}${Y(e.den)}</mfrac>`;
		case "sup": return `<msup>${Y(e.base)}${Y(e.sup ?? [])}</msup>`;
		case "sub": return `<msub>${Y(e.base)}${Y(e.sub ?? [])}</msub>`;
		case "subSup": return `<msubsup>${Y(e.base)}${Y(e.sub ?? [])}${Y(e.sup ?? [])}</msubsup>`;
		case "nary": return dt(e);
		case "delimiter": return ft(e);
		case "radical": return e.index && e.index.length ? `<mroot>${Y(e.radicand)}${Y(e.index)}</mroot>` : `<msqrt>${J(e.radicand)}</msqrt>`;
		case "limit": return ct(e);
		case "array": return lt(e);
		case "groupChr": {
			let t = Y(e.base), n = Ye.has(e.char), r = e.pos === "top" ? "mover" : "munder", i = `<mo stretchy="${n}">${q(e.char)}</mo>`;
			return n ? `<${r}>${t}${i}</${r}>` : `<${r} accent="true">${t}${i}</${r}>`;
		}
		case "bar": {
			let t = Y(e.base), n = "<mo stretchy=\"true\">&#x2015;</mo>";
			return e.pos === "bot" ? `<munder>${t}${n}</munder>` : `<mover>${t}${n}</mover>`;
		}
		case "accent": return st(e);
		case "func": return `<mrow>${Y(e.name)}<mo>&#x2061;</mo>${Y(e.arg)}</mrow>`;
		case "phant": return rt(e);
		case "sPre": return `<mmultiscripts>${Y(e.base)}<mprescripts/>${Y(e.sub)}${Y(e.sup)}</mmultiscripts>`;
		case "box": return Y(e.base);
		case "borderBox": return it(e);
	}
}
function rt(e) {
	let t = e.show ? J(e.base) : `<mphantom>${J(e.base)}</mphantom>`, n = [];
	return e.zeroWid && n.push("width=\"0\""), e.zeroAsc && n.push("height=\"0\""), e.zeroDesc && n.push("depth=\"0\""), n.length ? `<mpadded ${n.join(" ")}>${t}</mpadded>` : `<mrow>${t}</mrow>`;
}
function it(e) {
	let t = [], n = !e.hideTop, r = !e.hideBot, i = !e.hideLeft, a = !e.hideRight;
	n && r && i && a ? t.push("box") : (n && t.push("top"), r && t.push("bottom"), i && t.push("left"), a && t.push("right")), e.strikeH && t.push("horizontalstrike"), e.strikeV && t.push("verticalstrike"), e.strikeBltr && t.push("updiagonalstrike"), e.strikeTlbr && t.push("downdiagonalstrike");
	let o = J(e.base);
	return t.length ? `<menclose notation="${t.join(" ")}">${o}</menclose>` : `<mrow>${o}</mrow>`;
}
var at = {
	"̀": "`",
	"́": "´",
	"̂": "^",
	"̃": "~",
	"̆": "˘",
	"̇": "˙",
	"̈": "¨",
	"̌": "ˇ",
	"⃗": "→",
	"⃖": "←"
}, ot = new Set([
	"̅",
	"̄",
	"¯",
	"‾",
	"̲",
	"̳"
]);
function st(e) {
	let t = Y(e.base);
	if (ot.has(e.char)) return `<mover>${t}<mo stretchy="true">&#x2015;</mo></mover>`;
	let n = at[e.char] ?? e.char;
	return `<mover accent="true">${t}<mo stretchy="${n === "→" || n === "←" ? "true" : "false"}">${q(n)}</mo></mover>`;
}
function ct(e) {
	let t = Y(e.base), n = e.lower && e.lower.length ? Y(e.lower) : null, r = e.upper && e.upper.length ? Y(e.upper) : null;
	return n && r ? `<munderover>${t}${n}${r}</munderover>` : n ? `<munder>${t}${n}</munder>` : r ? `<mover>${t}${r}</mover>` : t;
}
function lt(e) {
	let t = Math.max(1, ...e.rows.map((e) => e.length)), n;
	n = e.align === "eq" ? Array.from({ length: t }, (e, t) => t % 2 == 0 ? "right" : "left").join(" ") : e.align === "left" ? "left" : "center";
	let r = e.rows.map((e) => `<mtr>${e.map((e) => `<mtd>${J(e)}</mtd>`).join("")}</mtr>`).join("");
	return `<mtable columnalign="${n}" rowspacing="0.2em" columnspacing="0.3em">${r}</mtable>`;
}
var ut = new Set([..."∫∬∭∮∯∰∱∲∳⨌⨍⨎⨏⨐⨑⨒⨓⨔⨕⨖⨗"]);
function dt(e) {
	let t = e.limLoc === "subSup" ? !0 : e.limLoc === "undOvr" ? !1 : ut.has(e.op), n = `<mo largeop="true">${q(e.op)}</mo>`, r = e.sub ?? [], i = e.sup ?? [], a;
	return a = t ? r.length && i.length ? `<msubsup>${n}${Y(r)}${Y(i)}</msubsup>` : r.length ? `<msub>${n}${Y(r)}</msub>` : i.length ? `<msup>${n}${Y(i)}</msup>` : n : r.length && i.length ? `<munderover>${n}${Y(r)}${Y(i)}</munderover>` : r.length ? `<munder>${n}${Y(r)}</munder>` : i.length ? `<mover>${n}${Y(i)}</mover>` : n, `<mrow>${a}${J(e.body)}</mrow>`;
}
function ft(e) {
	let t = (e) => `<mo fence="true" stretchy="true">${q(e)}</mo>`, n = e.items.map((e) => Y(e)).join("<mo separator=\"true\">,</mo>");
	return `<mrow>${t(e.begChar)}${n}${t(e.endChar)}</mrow>`;
}
function pt(e, t) {
	return `<math xmlns="http://www.w3.org/1998/Math/MathML" display="${t ? "block" : "inline"}">${J(e)}</math>`;
}
var mt = 64;
function ht(e, t, n) {
	let r = Math.max(1, Math.round(t * 256)), i = Math.max(1, Math.round(n * 256));
	return e.replace(/<svg([^>]*?)>/, (e, t) => `<svg${t.replace(/\s(?:width|height)="[^"]*"/g, "")} width="${r}" height="${i}">`);
}
function X(e, t) {
	return RegExp(`(?:^|\\s)${t}="([^"]*)"`).exec(e)?.[1];
}
function Z(e, t, n = 0) {
	let r = Number.parseFloat(X(e, t) ?? "");
	return Number.isFinite(r) ? r : n;
}
function gt(e) {
	return e.replace(/&(#(?:x[\da-fA-F]+|\d+)|amp|lt|gt|quot|apos);/g, (e, t) => {
		if (t[0] === "#") {
			let n = t[1] === "x" ? Number.parseInt(t.slice(2), 16) : Number.parseInt(t.slice(1), 10);
			return n <= 1114111 ? String.fromCodePoint(n) : e;
		}
		return {
			amp: "&",
			lt: "<",
			gt: ">",
			quot: "\"",
			apos: "'"
		}[t];
	});
}
function _t(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of [
		"fill",
		"stroke",
		"stroke-width",
		"stroke-linecap",
		"stroke-linejoin",
		"fill-rule",
		"opacity"
	]) {
		let r = X(e, n);
		r !== void 0 && t.set(n, r);
	}
	let n = X(e, "style");
	if (n) for (let e of n.split(";")) {
		let n = e.indexOf(":");
		if (n < 0) continue;
		let r = e.slice(0, n).trim(), i = e.slice(n + 1).trim();
		r && i && t.set(r, i);
	}
	return t;
}
function vt(e, t, n) {
	let r = _t(t), i = { ...n }, a = r.get("fill");
	a === "none" ? i.fill = !1 : a && (i.fill = !0, e.fillStyle = a);
	let o = r.get("stroke");
	o === "none" ? i.stroke = !1 : o && (i.stroke = !0, e.strokeStyle = o);
	let s = Number.parseFloat(r.get("stroke-width") ?? "");
	Number.isFinite(s) && (e.lineWidth = s);
	let c = r.get("stroke-linecap");
	(c === "butt" || c === "round" || c === "square") && (e.lineCap = c);
	let l = r.get("stroke-linejoin");
	(l === "bevel" || l === "round" || l === "miter") && (e.lineJoin = l);
	let u = r.get("fill-rule");
	(u === "evenodd" || u === "nonzero") && (i.fillRule = u);
	let d = Number.parseFloat(r.get("opacity") ?? "");
	return Number.isFinite(d) && (e.globalAlpha *= Math.max(0, Math.min(1, d))), i;
}
function yt(e, t) {
	if (!t) return;
	let n = /([a-zA-Z]+)\(([^)]*)\)/g;
	for (let r = n.exec(t); r; r = n.exec(t)) {
		let t = r[2].trim().split(/[\s,]+/).filter(Boolean).map(Number);
		if (!t.some((e) => !Number.isFinite(e))) switch (r[1]) {
			case "matrix":
				t.length >= 6 && e.transform(...t.slice(0, 6));
				break;
			case "translate":
				e.translate(t[0] ?? 0, t[1] ?? 0);
				break;
			case "scale": {
				let n = t[0] ?? 1;
				e.scale(n, t[1] ?? n);
				break;
			}
			case "rotate": {
				let n = (t[0] ?? 0) * Math.PI / 180;
				t.length >= 3 ? (e.translate(t[1], t[2]), e.rotate(n), e.translate(-t[1], -t[2])) : e.rotate(n);
				break;
			}
		}
	}
}
function bt(e, t, n) {
	n.fill && e.fill(t, n.fillRule), n.stroke && e.lineWidth > 0 && e.stroke(t);
}
function xt(e, t, n, r) {
	let i = X(t.slice(0, t.indexOf(">") + 1), "viewBox")?.trim().split(/[\s,]+/).map(Number);
	if (!i || i.length !== 4 || i.some((e) => !Number.isFinite(e))) throw TypeError("MathJax SVG must contain a finite viewBox");
	let [a, o, s, c] = i;
	if (!(s > 0) || !(c > 0)) throw TypeError("MathJax SVG viewBox must have positive dimensions");
	let l = Math.min(o, 0), u = Math.max(o + c, 0) - l;
	e.save(), e.setTransform(n / s, 0, 0, r / u, -a * n / s, -l * r / u), e.fillStyle = "#000000", e.strokeStyle = "#000000", e.lineWidth = 1;
	let d = {
		fill: !0,
		stroke: !1,
		fillRule: "nonzero"
	}, f = [], p = /<\/?([A-Za-z][\w:-]*)([^>]*)>/g;
	for (let n = p.exec(t); n; n = p.exec(t)) {
		let [r, i, a = ""] = n, o = i.toLowerCase(), s = r.startsWith("</");
		if (o === "svg") continue;
		if (s) {
			o === "g" && (e.restore(), d = f.pop() ?? d);
			continue;
		}
		if (o === "g") {
			f.push(d), e.save(), d = vt(e, a, d), yt(e, X(a, "transform"));
			continue;
		}
		if (o === "text") {
			let n = t.indexOf("</text>", p.lastIndex);
			if (n < 0) throw TypeError("MathJax SVG text must have a closing tag");
			e.save();
			let r = vt(e, a, d);
			yt(e, X(a, "transform")), e.font = `${X(a, "font-style") === "italic" ? "italic " : ""}${X(a, "font-weight") === "bold" ? "bold " : ""}${Z(a, "font-size", 1e3)}px ${X(a, "font-family") ?? "serif"}`, e.textBaseline = "alphabetic";
			let i = gt(t.slice(p.lastIndex, n)), o = Z(a, "x"), s = Z(a, "y");
			r.fill && e.fillText(i, o, s), r.stroke && e.lineWidth > 0 && e.strokeText(i, o, s), e.restore(), p.lastIndex = n + 7;
			continue;
		}
		if (o !== "path" && o !== "rect" && o !== "line") continue;
		e.save();
		let c = vt(e, a, d);
		yt(e, X(a, "transform"));
		let l = o === "path" ? new Path2D(X(a, "d") ?? "") : new Path2D();
		o === "rect" ? l.rect(Z(a, "x"), Z(a, "y"), Z(a, "width"), Z(a, "height")) : o === "line" && (l.moveTo(Z(a, "x1"), Z(a, "y1")), l.lineTo(Z(a, "x2"), Z(a, "y2"))), bt(e, l, c), e.restore();
	}
	e.restore();
}
async function St(e, n) {
	let { width: i, height: o } = t(e.widthEm * 256, (e.ascentEm + e.descentEm) * 256), s = r(i, o), c = s?.getContext("2d");
	if (!s || !c || typeof Path2D > "u") throw Error("Math SVG rasterization requires Canvas 2D and Path2D support");
	xt(c, ht(a(e.svg, n), e.widthEm, e.ascentEm + e.descentEm), i, o);
	let l = s, u = i, d = o, f = mt / 256, p = Math.max(1, Math.round(i * f)), m = Math.max(1, Math.round(o * f));
	for (; u > p || d > m;) {
		let e = Math.max(p, Math.ceil(u / 2)), t = Math.max(m, Math.ceil(d / 2)), n = r(e, t), i = n?.getContext("2d");
		if (!n || !i) break;
		i.imageSmoothingEnabled = !0, i.imageSmoothingQuality = "high", i.drawImage(l, 0, 0, e, t), l = n, u = e, d = t;
	}
	return {
		source: l,
		widthPx: u,
		heightPx: d
	};
}
function Ct(e, t) {
	let n = r(e.widthPx, e.heightPx);
	if (!n) return e.source;
	let i = n.getContext("2d");
	return i ? (i.drawImage(e.source, 0, 0, e.widthPx, e.heightPx), i.globalCompositeOperation = "source-in", i.fillStyle = t, i.fillRect(0, 0, e.widthPx, e.heightPx), n) : e.source;
}
//#endregion
//#region packages/core/src/canvas/env.ts
function wt(e) {
	if (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) return !0;
	if (typeof e != "object" || !e) return !1;
	let t = e;
	if (t.nodeType !== 1 || t.localName !== "canvas") return !1;
	let n = t.ownerDocument?.defaultView?.HTMLCanvasElement;
	return typeof n == "function" && e instanceof n;
}
function Tt(e = 1) {
	return typeof window < "u" && window.devicePixelRatio || e;
}
//#endregion
//#region packages/core/src/canvas/crisp.ts
function Et(e, t, n) {
	let r = Math.round(t * n) % 2 == 1 ? .5 : 0, i = e * n;
	return (Math.round(i - r) + r) / n - e;
}
//#endregion
//#region packages/core/src/text/kinsoku/rules.ts
var Dt = "”’）〕］｝〉》」』】〙〗〟｠»、。，．・：；／？！‐ー゠–〜～ぁぃぅぇぉっゃゅょゎゕゖァィゥェォッャュョヮヵヶㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ々〻ゝゞヽヾ゛゜％‰℃°′″｡｣､･ｰﾞﾟ!),.:;?]}｠", Ot = "“‘（〔［｛〈《「『【〘〖〝｟«＄￥＃￡￠([{｟";
function kt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) t.add(n.codePointAt(0));
	return t;
}
function At(e) {
	return {
		enabled: e?.kinsoku !== !1,
		lineStartForbidden: kt(e?.noLineBreaksBefore ?? Dt),
		lineEndForbidden: kt(e?.noLineBreaksAfter ?? Ot)
	};
}
var jt = At();
//#endregion
//#region packages/core/src/text/kinsoku/split.ts
function Mt(e, t, n, r = 1) {
	if (!n.enabled || t <= 0 || t >= e.length) return t;
	let i = (t) => t < e.length && n.lineStartForbidden.has(e[t].codePointAt(0)), a = (t) => t >= 0 && n.lineEndForbidden.has(e[t].codePointAt(0)), o = t;
	for (; o > r && (i(o) || a(o - 1));) o--;
	return o <= r && (i(o) || a(o - 1)) ? t : o;
}
function Nt(e, t, n) {
	if (!t.enabled) return 0;
	let r = e.length - n;
	for (let n = 1; n <= r; n++) {
		let r = e[e.length - n];
		if (/\s/.test(r) || t.lineStartForbidden.has(r.codePointAt(0))) continue;
		let i = e[e.length - n - 1];
		if (!(i && t.lineEndForbidden.has(i.codePointAt(0)))) return n;
	}
	return 0;
}
//#endregion
//#region packages/core/src/text/line-break-class.generated.ts
var Pt = /* @__PURE__ */ "BK.CM.CR.GL.LF.NL.SP.WJ.ZW.ZWJ.AK.AL.AP.AS.B2.BA.BB.CB.CL.CP.EB.EM.EX.H2.H3.HL.HH.HY.ID.IN.IS.JL.JT.JV.NS.NU.OP.PO.PR.QU.RI.SY.VF.VI".split("."), Ft = [
	0,
	9,
	10,
	11,
	13,
	14,
	32,
	33,
	34,
	35,
	36,
	37,
	38,
	39,
	40,
	41,
	42,
	43,
	44,
	45,
	46,
	47,
	48,
	58,
	60,
	63,
	64,
	91,
	92,
	93,
	94,
	123,
	124,
	125,
	126,
	127,
	133,
	134,
	160,
	161,
	162,
	163,
	166,
	171,
	172,
	173,
	174,
	176,
	177,
	178,
	180,
	181,
	187,
	188,
	191,
	192,
	712,
	713,
	716,
	717,
	735,
	736,
	768,
	860,
	867,
	880,
	894,
	895,
	1155,
	1162,
	1417,
	1418,
	1419,
	1423,
	1424,
	1425,
	1470,
	1471,
	1472,
	1473,
	1475,
	1476,
	1478,
	1479,
	1480,
	1488,
	1515,
	1519,
	1523,
	1536,
	1542,
	1545,
	1548,
	1550,
	1552,
	1563,
	1564,
	1565,
	1568,
	1611,
	1632,
	1642,
	1643,
	1645,
	1648,
	1649,
	1748,
	1749,
	1750,
	1757,
	1758,
	1759,
	1765,
	1767,
	1769,
	1770,
	1774,
	1776,
	1786,
	1809,
	1810,
	1840,
	1867,
	1958,
	1969,
	1984,
	1994,
	2027,
	2036,
	2040,
	2041,
	2042,
	2045,
	2046,
	2048,
	2070,
	2074,
	2075,
	2084,
	2085,
	2088,
	2089,
	2094,
	2137,
	2140,
	2192,
	2194,
	2199,
	2208,
	2250,
	2274,
	2275,
	2308,
	2362,
	2365,
	2366,
	2384,
	2385,
	2392,
	2402,
	2404,
	2406,
	2416,
	2433,
	2436,
	2492,
	2493,
	2494,
	2501,
	2503,
	2505,
	2507,
	2510,
	2519,
	2520,
	2530,
	2532,
	2534,
	2544,
	2546,
	2548,
	2553,
	2554,
	2555,
	2556,
	2558,
	2559,
	2561,
	2564,
	2620,
	2621,
	2622,
	2627,
	2631,
	2633,
	2635,
	2638,
	2641,
	2642,
	2662,
	2672,
	2674,
	2677,
	2678,
	2689,
	2692,
	2748,
	2749,
	2750,
	2758,
	2759,
	2762,
	2763,
	2766,
	2786,
	2788,
	2790,
	2800,
	2801,
	2802,
	2810,
	2816,
	2817,
	2820,
	2876,
	2877,
	2878,
	2885,
	2887,
	2889,
	2891,
	2894,
	2901,
	2904,
	2914,
	2916,
	2918,
	2928,
	2946,
	2947,
	3006,
	3011,
	3014,
	3017,
	3018,
	3022,
	3031,
	3032,
	3046,
	3056,
	3065,
	3066,
	3072,
	3077,
	3132,
	3133,
	3134,
	3141,
	3142,
	3145,
	3146,
	3150,
	3157,
	3159,
	3170,
	3172,
	3174,
	3184,
	3191,
	3192,
	3201,
	3204,
	3205,
	3260,
	3261,
	3262,
	3269,
	3270,
	3273,
	3274,
	3278,
	3285,
	3287,
	3298,
	3300,
	3302,
	3312,
	3315,
	3316,
	3328,
	3332,
	3387,
	3389,
	3390,
	3397,
	3398,
	3401,
	3402,
	3406,
	3415,
	3416,
	3426,
	3428,
	3430,
	3440,
	3449,
	3450,
	3457,
	3460,
	3530,
	3531,
	3535,
	3541,
	3542,
	3543,
	3544,
	3552,
	3558,
	3568,
	3570,
	3572,
	3633,
	3634,
	3636,
	3643,
	3647,
	3648,
	3655,
	3663,
	3664,
	3674,
	3676,
	3761,
	3762,
	3764,
	3773,
	3784,
	3791,
	3792,
	3802,
	3841,
	3845,
	3846,
	3848,
	3849,
	3851,
	3852,
	3853,
	3858,
	3859,
	3860,
	3861,
	3864,
	3866,
	3872,
	3882,
	3892,
	3893,
	3894,
	3895,
	3896,
	3897,
	3898,
	3899,
	3900,
	3901,
	3902,
	3904,
	3953,
	3967,
	3968,
	3973,
	3974,
	3976,
	3981,
	3992,
	3993,
	4029,
	4030,
	4032,
	4038,
	4039,
	4048,
	4050,
	4051,
	4052,
	4057,
	4059,
	4139,
	4159,
	4160,
	4170,
	4172,
	4182,
	4186,
	4190,
	4193,
	4194,
	4197,
	4199,
	4206,
	4209,
	4213,
	4226,
	4238,
	4239,
	4240,
	4250,
	4254,
	4352,
	4448,
	4520,
	4608,
	4957,
	4960,
	4961,
	4962,
	5120,
	5121,
	5760,
	5761,
	5787,
	5788,
	5789,
	5867,
	5870,
	5906,
	5910,
	5938,
	5941,
	5943,
	5970,
	5972,
	6002,
	6004,
	6068,
	6100,
	6102,
	6103,
	6104,
	6105,
	6106,
	6107,
	6108,
	6109,
	6110,
	6112,
	6122,
	6146,
	6148,
	6150,
	6151,
	6152,
	6154,
	6155,
	6158,
	6159,
	6160,
	6170,
	6277,
	6279,
	6313,
	6314,
	6432,
	6444,
	6448,
	6460,
	6468,
	6470,
	6480,
	6608,
	6619,
	6679,
	6684,
	6741,
	6751,
	6752,
	6781,
	6783,
	6784,
	6794,
	6800,
	6810,
	6832,
	6878,
	6880,
	6891,
	6892,
	6912,
	6917,
	6964,
	6980,
	6981,
	6989,
	6990,
	6992,
	7002,
	7004,
	7005,
	7009,
	7019,
	7028,
	7037,
	7040,
	7043,
	7073,
	7086,
	7088,
	7098,
	7104,
	7142,
	7154,
	7156,
	7204,
	7224,
	7227,
	7232,
	7242,
	7248,
	7258,
	7294,
	7296,
	7376,
	7379,
	7380,
	7401,
	7405,
	7406,
	7412,
	7413,
	7415,
	7418,
	7616,
	7629,
	7630,
	7676,
	7677,
	7680,
	8189,
	8190,
	8192,
	8199,
	8200,
	8203,
	8204,
	8205,
	8206,
	8208,
	8209,
	8210,
	8212,
	8213,
	8216,
	8218,
	8219,
	8222,
	8223,
	8224,
	8228,
	8231,
	8232,
	8234,
	8239,
	8240,
	8248,
	8249,
	8251,
	8252,
	8254,
	8260,
	8261,
	8262,
	8263,
	8266,
	8278,
	8279,
	8280,
	8284,
	8285,
	8288,
	8289,
	8294,
	8304,
	8317,
	8318,
	8319,
	8333,
	8334,
	8335,
	8352,
	8359,
	8360,
	8374,
	8375,
	8379,
	8380,
	8382,
	8383,
	8384,
	8385,
	8400,
	8433,
	8451,
	8452,
	8457,
	8458,
	8470,
	8471,
	8722,
	8724,
	8943,
	8944,
	8968,
	8969,
	8970,
	8971,
	8972,
	8986,
	8988,
	9001,
	9002,
	9003,
	9200,
	9204,
	9728,
	9732,
	9748,
	9750,
	9752,
	9753,
	9754,
	9757,
	9758,
	9760,
	9785,
	9788,
	9832,
	9833,
	9855,
	9856,
	9917,
	9929,
	9933,
	9934,
	9935,
	9938,
	9939,
	9941,
	9944,
	9946,
	9948,
	9949,
	9951,
	9954,
	9962,
	9963,
	9969,
	9974,
	9975,
	9977,
	9978,
	9979,
	9981,
	9989,
	9992,
	9994,
	9998,
	10075,
	10081,
	10082,
	10084,
	10085,
	10088,
	10089,
	10090,
	10091,
	10092,
	10093,
	10094,
	10095,
	10096,
	10097,
	10098,
	10099,
	10100,
	10101,
	10102,
	10181,
	10182,
	10183,
	10214,
	10215,
	10216,
	10217,
	10218,
	10219,
	10220,
	10221,
	10222,
	10223,
	10224,
	10240,
	10241,
	10627,
	10628,
	10629,
	10630,
	10631,
	10632,
	10633,
	10634,
	10635,
	10636,
	10637,
	10638,
	10639,
	10640,
	10641,
	10642,
	10643,
	10644,
	10645,
	10646,
	10647,
	10648,
	10649,
	10712,
	10713,
	10714,
	10715,
	10716,
	10748,
	10749,
	10750,
	11503,
	11506,
	11513,
	11514,
	11517,
	11518,
	11519,
	11520,
	11632,
	11633,
	11647,
	11648,
	11744,
	11776,
	11790,
	11798,
	11799,
	11800,
	11801,
	11802,
	11804,
	11806,
	11808,
	11810,
	11811,
	11812,
	11813,
	11814,
	11815,
	11816,
	11817,
	11818,
	11822,
	11823,
	11824,
	11826,
	11827,
	11829,
	11834,
	11836,
	11839,
	11840,
	11841,
	11842,
	11843,
	11851,
	11852,
	11853,
	11854,
	11856,
	11859,
	11861,
	11862,
	11863,
	11864,
	11865,
	11866,
	11867,
	11868,
	11869,
	11870,
	11904,
	11930,
	11931,
	12020,
	12032,
	12246,
	12272,
	12288,
	12289,
	12291,
	12293,
	12294,
	12296,
	12297,
	12298,
	12299,
	12300,
	12301,
	12302,
	12303,
	12304,
	12305,
	12306,
	12308,
	12309,
	12310,
	12311,
	12312,
	12313,
	12314,
	12315,
	12316,
	12317,
	12318,
	12320,
	12330,
	12336,
	12341,
	12342,
	12347,
	12349,
	12352,
	12353,
	12354,
	12355,
	12356,
	12357,
	12358,
	12359,
	12360,
	12361,
	12362,
	12387,
	12388,
	12419,
	12420,
	12421,
	12422,
	12423,
	12424,
	12430,
	12431,
	12437,
	12439,
	12441,
	12443,
	12447,
	12448,
	12450,
	12451,
	12452,
	12453,
	12454,
	12455,
	12456,
	12457,
	12458,
	12483,
	12484,
	12515,
	12516,
	12517,
	12518,
	12519,
	12520,
	12526,
	12527,
	12533,
	12535,
	12539,
	12543,
	12544,
	12549,
	12592,
	12593,
	12687,
	12688,
	12774,
	12783,
	12784,
	12800,
	12831,
	12832,
	12872,
	12880,
	19904,
	19968,
	40981,
	40982,
	42125,
	42128,
	42183,
	42238,
	42240,
	42509,
	42510,
	42511,
	42512,
	42528,
	42538,
	42607,
	42611,
	42612,
	42622,
	42654,
	42656,
	42736,
	42738,
	42739,
	42744,
	43010,
	43011,
	43014,
	43015,
	43019,
	43020,
	43043,
	43048,
	43052,
	43053,
	43064,
	43065,
	43124,
	43126,
	43128,
	43136,
	43138,
	43188,
	43206,
	43214,
	43216,
	43226,
	43232,
	43250,
	43260,
	43261,
	43263,
	43264,
	43274,
	43302,
	43310,
	43312,
	43335,
	43348,
	43360,
	43389,
	43392,
	43396,
	43443,
	43456,
	43457,
	43463,
	43466,
	43470,
	43471,
	43472,
	43482,
	43486,
	43488,
	43493,
	43494,
	43504,
	43514,
	43520,
	43561,
	43575,
	43584,
	43587,
	43588,
	43596,
	43598,
	43600,
	43610,
	43612,
	43613,
	43616,
	43643,
	43646,
	43696,
	43697,
	43698,
	43701,
	43703,
	43705,
	43710,
	43712,
	43713,
	43714,
	43755,
	43760,
	43762,
	43765,
	43767,
	44003,
	44011,
	44012,
	44014,
	44016,
	44026,
	44032,
	44033,
	44060,
	44061,
	44088,
	44089,
	44116,
	44117,
	44144,
	44145,
	44172,
	44173,
	44200,
	44201,
	44228,
	44229,
	44256,
	44257,
	44284,
	44285,
	44312,
	44313,
	44340,
	44341,
	44368,
	44369,
	44396,
	44397,
	44424,
	44425,
	44452,
	44453,
	44480,
	44481,
	44508,
	44509,
	44536,
	44537,
	44564,
	44565,
	44592,
	44593,
	44620,
	44621,
	44648,
	44649,
	44676,
	44677,
	44704,
	44705,
	44732,
	44733,
	44760,
	44761,
	44788,
	44789,
	44816,
	44817,
	44844,
	44845,
	44872,
	44873,
	44900,
	44901,
	44928,
	44929,
	44956,
	44957,
	44984,
	44985,
	45012,
	45013,
	45040,
	45041,
	45068,
	45069,
	45096,
	45097,
	45124,
	45125,
	45152,
	45153,
	45180,
	45181,
	45208,
	45209,
	45236,
	45237,
	45264,
	45265,
	45292,
	45293,
	45320,
	45321,
	45348,
	45349,
	45376,
	45377,
	45404,
	45405,
	45432,
	45433,
	45460,
	45461,
	45488,
	45489,
	45516,
	45517,
	45544,
	45545,
	45572,
	45573,
	45600,
	45601,
	45628,
	45629,
	45656,
	45657,
	45684,
	45685,
	45712,
	45713,
	45740,
	45741,
	45768,
	45769,
	45796,
	45797,
	45824,
	45825,
	45852,
	45853,
	45880,
	45881,
	45908,
	45909,
	45936,
	45937,
	45964,
	45965,
	45992,
	45993,
	46020,
	46021,
	46048,
	46049,
	46076,
	46077,
	46104,
	46105,
	46132,
	46133,
	46160,
	46161,
	46188,
	46189,
	46216,
	46217,
	46244,
	46245,
	46272,
	46273,
	46300,
	46301,
	46328,
	46329,
	46356,
	46357,
	46384,
	46385,
	46412,
	46413,
	46440,
	46441,
	46468,
	46469,
	46496,
	46497,
	46524,
	46525,
	46552,
	46553,
	46580,
	46581,
	46608,
	46609,
	46636,
	46637,
	46664,
	46665,
	46692,
	46693,
	46720,
	46721,
	46748,
	46749,
	46776,
	46777,
	46804,
	46805,
	46832,
	46833,
	46860,
	46861,
	46888,
	46889,
	46916,
	46917,
	46944,
	46945,
	46972,
	46973,
	47e3,
	47001,
	47028,
	47029,
	47056,
	47057,
	47084,
	47085,
	47112,
	47113,
	47140,
	47141,
	47168,
	47169,
	47196,
	47197,
	47224,
	47225,
	47252,
	47253,
	47280,
	47281,
	47308,
	47309,
	47336,
	47337,
	47364,
	47365,
	47392,
	47393,
	47420,
	47421,
	47448,
	47449,
	47476,
	47477,
	47504,
	47505,
	47532,
	47533,
	47560,
	47561,
	47588,
	47589,
	47616,
	47617,
	47644,
	47645,
	47672,
	47673,
	47700,
	47701,
	47728,
	47729,
	47756,
	47757,
	47784,
	47785,
	47812,
	47813,
	47840,
	47841,
	47868,
	47869,
	47896,
	47897,
	47924,
	47925,
	47952,
	47953,
	47980,
	47981,
	48008,
	48009,
	48036,
	48037,
	48064,
	48065,
	48092,
	48093,
	48120,
	48121,
	48148,
	48149,
	48176,
	48177,
	48204,
	48205,
	48232,
	48233,
	48260,
	48261,
	48288,
	48289,
	48316,
	48317,
	48344,
	48345,
	48372,
	48373,
	48400,
	48401,
	48428,
	48429,
	48456,
	48457,
	48484,
	48485,
	48512,
	48513,
	48540,
	48541,
	48568,
	48569,
	48596,
	48597,
	48624,
	48625,
	48652,
	48653,
	48680,
	48681,
	48708,
	48709,
	48736,
	48737,
	48764,
	48765,
	48792,
	48793,
	48820,
	48821,
	48848,
	48849,
	48876,
	48877,
	48904,
	48905,
	48932,
	48933,
	48960,
	48961,
	48988,
	48989,
	49016,
	49017,
	49044,
	49045,
	49072,
	49073,
	49100,
	49101,
	49128,
	49129,
	49156,
	49157,
	49184,
	49185,
	49212,
	49213,
	49240,
	49241,
	49268,
	49269,
	49296,
	49297,
	49324,
	49325,
	49352,
	49353,
	49380,
	49381,
	49408,
	49409,
	49436,
	49437,
	49464,
	49465,
	49492,
	49493,
	49520,
	49521,
	49548,
	49549,
	49576,
	49577,
	49604,
	49605,
	49632,
	49633,
	49660,
	49661,
	49688,
	49689,
	49716,
	49717,
	49744,
	49745,
	49772,
	49773,
	49800,
	49801,
	49828,
	49829,
	49856,
	49857,
	49884,
	49885,
	49912,
	49913,
	49940,
	49941,
	49968,
	49969,
	49996,
	49997,
	50024,
	50025,
	50052,
	50053,
	50080,
	50081,
	50108,
	50109,
	50136,
	50137,
	50164,
	50165,
	50192,
	50193,
	50220,
	50221,
	50248,
	50249,
	50276,
	50277,
	50304,
	50305,
	50332,
	50333,
	50360,
	50361,
	50388,
	50389,
	50416,
	50417,
	50444,
	50445,
	50472,
	50473,
	50500,
	50501,
	50528,
	50529,
	50556,
	50557,
	50584,
	50585,
	50612,
	50613,
	50640,
	50641,
	50668,
	50669,
	50696,
	50697,
	50724,
	50725,
	50752,
	50753,
	50780,
	50781,
	50808,
	50809,
	50836,
	50837,
	50864,
	50865,
	50892,
	50893,
	50920,
	50921,
	50948,
	50949,
	50976,
	50977,
	51004,
	51005,
	51032,
	51033,
	51060,
	51061,
	51088,
	51089,
	51116,
	51117,
	51144,
	51145,
	51172,
	51173,
	51200,
	51201,
	51228,
	51229,
	51256,
	51257,
	51284,
	51285,
	51312,
	51313,
	51340,
	51341,
	51368,
	51369,
	51396,
	51397,
	51424,
	51425,
	51452,
	51453,
	51480,
	51481,
	51508,
	51509,
	51536,
	51537,
	51564,
	51565,
	51592,
	51593,
	51620,
	51621,
	51648,
	51649,
	51676,
	51677,
	51704,
	51705,
	51732,
	51733,
	51760,
	51761,
	51788,
	51789,
	51816,
	51817,
	51844,
	51845,
	51872,
	51873,
	51900,
	51901,
	51928,
	51929,
	51956,
	51957,
	51984,
	51985,
	52012,
	52013,
	52040,
	52041,
	52068,
	52069,
	52096,
	52097,
	52124,
	52125,
	52152,
	52153,
	52180,
	52181,
	52208,
	52209,
	52236,
	52237,
	52264,
	52265,
	52292,
	52293,
	52320,
	52321,
	52348,
	52349,
	52376,
	52377,
	52404,
	52405,
	52432,
	52433,
	52460,
	52461,
	52488,
	52489,
	52516,
	52517,
	52544,
	52545,
	52572,
	52573,
	52600,
	52601,
	52628,
	52629,
	52656,
	52657,
	52684,
	52685,
	52712,
	52713,
	52740,
	52741,
	52768,
	52769,
	52796,
	52797,
	52824,
	52825,
	52852,
	52853,
	52880,
	52881,
	52908,
	52909,
	52936,
	52937,
	52964,
	52965,
	52992,
	52993,
	53020,
	53021,
	53048,
	53049,
	53076,
	53077,
	53104,
	53105,
	53132,
	53133,
	53160,
	53161,
	53188,
	53189,
	53216,
	53217,
	53244,
	53245,
	53272,
	53273,
	53300,
	53301,
	53328,
	53329,
	53356,
	53357,
	53384,
	53385,
	53412,
	53413,
	53440,
	53441,
	53468,
	53469,
	53496,
	53497,
	53524,
	53525,
	53552,
	53553,
	53580,
	53581,
	53608,
	53609,
	53636,
	53637,
	53664,
	53665,
	53692,
	53693,
	53720,
	53721,
	53748,
	53749,
	53776,
	53777,
	53804,
	53805,
	53832,
	53833,
	53860,
	53861,
	53888,
	53889,
	53916,
	53917,
	53944,
	53945,
	53972,
	53973,
	54e3,
	54001,
	54028,
	54029,
	54056,
	54057,
	54084,
	54085,
	54112,
	54113,
	54140,
	54141,
	54168,
	54169,
	54196,
	54197,
	54224,
	54225,
	54252,
	54253,
	54280,
	54281,
	54308,
	54309,
	54336,
	54337,
	54364,
	54365,
	54392,
	54393,
	54420,
	54421,
	54448,
	54449,
	54476,
	54477,
	54504,
	54505,
	54532,
	54533,
	54560,
	54561,
	54588,
	54589,
	54616,
	54617,
	54644,
	54645,
	54672,
	54673,
	54700,
	54701,
	54728,
	54729,
	54756,
	54757,
	54784,
	54785,
	54812,
	54813,
	54840,
	54841,
	54868,
	54869,
	54896,
	54897,
	54924,
	54925,
	54952,
	54953,
	54980,
	54981,
	55008,
	55009,
	55036,
	55037,
	55064,
	55065,
	55092,
	55093,
	55120,
	55121,
	55148,
	55149,
	55176,
	55177,
	55204,
	55216,
	55239,
	55243,
	55292,
	63744,
	64256,
	64285,
	64286,
	64287,
	64297,
	64298,
	64311,
	64312,
	64317,
	64318,
	64319,
	64320,
	64322,
	64323,
	64325,
	64326,
	64336,
	64830,
	64831,
	64832,
	65020,
	65021,
	65024,
	65040,
	65043,
	65045,
	65047,
	65048,
	65049,
	65050,
	65056,
	65057,
	65058,
	65059,
	65060,
	65061,
	65062,
	65064,
	65065,
	65066,
	65067,
	65068,
	65069,
	65071,
	65072,
	65077,
	65078,
	65079,
	65080,
	65081,
	65082,
	65083,
	65084,
	65085,
	65086,
	65087,
	65088,
	65089,
	65090,
	65091,
	65092,
	65093,
	65095,
	65096,
	65097,
	65104,
	65105,
	65106,
	65107,
	65108,
	65110,
	65112,
	65113,
	65114,
	65115,
	65116,
	65117,
	65118,
	65119,
	65127,
	65128,
	65129,
	65130,
	65131,
	65132,
	65279,
	65280,
	65281,
	65282,
	65284,
	65285,
	65286,
	65288,
	65289,
	65290,
	65292,
	65293,
	65294,
	65295,
	65306,
	65308,
	65311,
	65312,
	65339,
	65340,
	65341,
	65342,
	65371,
	65372,
	65373,
	65374,
	65375,
	65376,
	65378,
	65379,
	65381,
	65382,
	65383,
	65393,
	65438,
	65440,
	65471,
	65474,
	65480,
	65482,
	65488,
	65490,
	65496,
	65498,
	65501,
	65504,
	65505,
	65506,
	65509,
	65511,
	65529,
	65532,
	65533,
	65792,
	65795,
	66045,
	66046,
	66272,
	66273,
	66422,
	66427,
	66463,
	66464,
	66512,
	66513,
	66720,
	66730,
	67671,
	67672,
	67871,
	67872,
	68097,
	68100,
	68101,
	68103,
	68108,
	68112,
	68152,
	68155,
	68159,
	68160,
	68176,
	68184,
	68325,
	68327,
	68336,
	68342,
	68343,
	68409,
	68416,
	68900,
	68904,
	68912,
	68922,
	68928,
	68938,
	68969,
	68974,
	68975,
	69291,
	69293,
	69294,
	69328,
	69329,
	69370,
	69376,
	69446,
	69457,
	69506,
	69510,
	69632,
	69635,
	69637,
	69688,
	69702,
	69703,
	69705,
	69710,
	69714,
	69734,
	69744,
	69745,
	69747,
	69749,
	69750,
	69759,
	69760,
	69763,
	69808,
	69819,
	69821,
	69822,
	69826,
	69827,
	69837,
	69838,
	69872,
	69882,
	69888,
	69891,
	69927,
	69941,
	69942,
	69952,
	69956,
	69957,
	69959,
	70003,
	70004,
	70005,
	70006,
	70016,
	70019,
	70067,
	70081,
	70085,
	70087,
	70088,
	70089,
	70093,
	70094,
	70096,
	70106,
	70107,
	70108,
	70109,
	70112,
	70188,
	70200,
	70202,
	70203,
	70205,
	70206,
	70207,
	70209,
	70210,
	70313,
	70314,
	70367,
	70379,
	70384,
	70394,
	70400,
	70404,
	70405,
	70413,
	70415,
	70417,
	70419,
	70441,
	70442,
	70449,
	70450,
	70452,
	70453,
	70458,
	70459,
	70461,
	70462,
	70469,
	70471,
	70473,
	70475,
	70477,
	70478,
	70480,
	70481,
	70487,
	70488,
	70493,
	70494,
	70496,
	70498,
	70500,
	70502,
	70509,
	70512,
	70517,
	70528,
	70538,
	70539,
	70540,
	70542,
	70543,
	70544,
	70546,
	70582,
	70583,
	70584,
	70593,
	70594,
	70595,
	70597,
	70598,
	70599,
	70603,
	70604,
	70608,
	70609,
	70610,
	70611,
	70614,
	70615,
	70617,
	70625,
	70627,
	70709,
	70727,
	70731,
	70735,
	70736,
	70746,
	70748,
	70750,
	70751,
	70832,
	70852,
	70864,
	70874,
	71087,
	71094,
	71096,
	71105,
	71106,
	71108,
	71110,
	71113,
	71128,
	71132,
	71134,
	71216,
	71233,
	71235,
	71248,
	71258,
	71264,
	71277,
	71339,
	71352,
	71360,
	71370,
	71376,
	71396,
	71453,
	71468,
	71472,
	71482,
	71484,
	71487,
	71724,
	71739,
	71904,
	71914,
	71936,
	71943,
	71945,
	71946,
	71948,
	71956,
	71957,
	71959,
	71960,
	71984,
	71990,
	71991,
	71993,
	71995,
	71998,
	71999,
	72e3,
	72001,
	72002,
	72004,
	72007,
	72016,
	72026,
	72145,
	72152,
	72154,
	72161,
	72162,
	72163,
	72164,
	72165,
	72193,
	72203,
	72243,
	72250,
	72251,
	72255,
	72256,
	72257,
	72261,
	72262,
	72263,
	72264,
	72273,
	72284,
	72330,
	72346,
	72349,
	72350,
	72353,
	72355,
	72448,
	72458,
	72544,
	72552,
	72688,
	72698,
	72751,
	72759,
	72760,
	72768,
	72769,
	72774,
	72784,
	72794,
	72816,
	72817,
	72818,
	72850,
	72872,
	72873,
	72887,
	73009,
	73015,
	73018,
	73019,
	73020,
	73022,
	73023,
	73030,
	73031,
	73032,
	73040,
	73050,
	73098,
	73103,
	73104,
	73106,
	73107,
	73112,
	73120,
	73130,
	73184,
	73194,
	73440,
	73458,
	73459,
	73463,
	73465,
	73472,
	73474,
	73475,
	73476,
	73489,
	73490,
	73524,
	73531,
	73534,
	73538,
	73539,
	73541,
	73552,
	73562,
	73563,
	73693,
	73697,
	73727,
	73728,
	74864,
	74869,
	78424,
	78427,
	78430,
	78466,
	78467,
	78470,
	78471,
	78472,
	78473,
	78474,
	78713,
	78714,
	78716,
	78895,
	78896,
	78903,
	78904,
	78905,
	78908,
	78909,
	78910,
	78911,
	78912,
	78913,
	78919,
	78934,
	83406,
	83407,
	83408,
	90368,
	90398,
	90416,
	90426,
	92768,
	92778,
	92782,
	92784,
	92864,
	92874,
	92912,
	92917,
	92918,
	92976,
	92983,
	92986,
	92996,
	92997,
	93008,
	93018,
	93550,
	93552,
	93562,
	93847,
	93849,
	94031,
	94032,
	94033,
	94088,
	94095,
	94099,
	94176,
	94180,
	94181,
	94192,
	94194,
	94196,
	94199,
	94208,
	101120,
	101632,
	101663,
	101760,
	101875,
	110592,
	110883,
	110898,
	110899,
	110928,
	110931,
	110933,
	110934,
	110948,
	110952,
	110960,
	111356,
	113821,
	113823,
	113824,
	113828,
	118e3,
	118010,
	118528,
	118574,
	118576,
	118599,
	119141,
	119146,
	119149,
	119171,
	119173,
	119180,
	119210,
	119214,
	119362,
	119365,
	120782,
	120832,
	121344,
	121399,
	121403,
	121453,
	121461,
	121462,
	121476,
	121477,
	121479,
	121483,
	121499,
	121504,
	121505,
	121520,
	122880,
	122887,
	122888,
	122905,
	122907,
	122914,
	122915,
	122917,
	122918,
	122923,
	123023,
	123024,
	123184,
	123191,
	123200,
	123210,
	123566,
	123567,
	123628,
	123632,
	123642,
	123647,
	123648,
	124140,
	124144,
	124154,
	124398,
	124400,
	124401,
	124411,
	124643,
	124644,
	124646,
	124647,
	124654,
	124656,
	124661,
	124662,
	125136,
	125143,
	125252,
	125259,
	125264,
	125274,
	125278,
	125280,
	126124,
	126125,
	126128,
	126129,
	126976,
	127232,
	127406,
	127462,
	127488,
	127877,
	127878,
	127900,
	127902,
	127925,
	127927,
	127932,
	127933,
	127938,
	127941,
	127943,
	127944,
	127946,
	127949,
	127995,
	128e3,
	128066,
	128068,
	128070,
	128081,
	128102,
	128121,
	128124,
	128125,
	128129,
	128132,
	128133,
	128136,
	128143,
	128144,
	128145,
	128146,
	128160,
	128161,
	128162,
	128163,
	128164,
	128165,
	128170,
	128171,
	128175,
	128176,
	128177,
	128179,
	128256,
	128263,
	128279,
	128293,
	128306,
	128330,
	128372,
	128374,
	128378,
	128379,
	128400,
	128401,
	128405,
	128407,
	128468,
	128476,
	128500,
	128506,
	128581,
	128584,
	128587,
	128592,
	128630,
	128633,
	128636,
	128640,
	128675,
	128676,
	128692,
	128695,
	128704,
	128705,
	128716,
	128717,
	128768,
	128884,
	128887,
	128891,
	128896,
	128981,
	129024,
	129292,
	129293,
	129295,
	129296,
	129304,
	129312,
	129318,
	129319,
	129328,
	129338,
	129340,
	129343,
	129399,
	129400,
	129461,
	129463,
	129464,
	129466,
	129467,
	129468,
	129485,
	129488,
	129489,
	129502,
	129536,
	129624,
	129731,
	129734,
	129776,
	129785,
	129792,
	130032,
	130042,
	130048,
	131070,
	131072,
	196606,
	196608,
	262142,
	917505,
	917506,
	917536,
	917632,
	917760,
	918e3
], It = [
	1,
	15,
	4,
	0,
	2,
	1,
	6,
	22,
	39,
	11,
	38,
	37,
	11,
	39,
	36,
	19,
	11,
	38,
	30,
	27,
	30,
	41,
	35,
	30,
	11,
	22,
	11,
	36,
	38,
	19,
	11,
	36,
	15,
	18,
	11,
	1,
	5,
	1,
	3,
	36,
	37,
	38,
	11,
	39,
	11,
	15,
	11,
	37,
	38,
	11,
	16,
	11,
	39,
	11,
	36,
	11,
	16,
	11,
	16,
	11,
	16,
	11,
	1,
	3,
	1,
	11,
	30,
	11,
	1,
	11,
	30,
	26,
	11,
	38,
	11,
	1,
	26,
	1,
	11,
	1,
	11,
	1,
	22,
	1,
	11,
	25,
	11,
	25,
	11,
	35,
	11,
	37,
	30,
	11,
	1,
	22,
	1,
	22,
	11,
	1,
	35,
	37,
	35,
	11,
	1,
	11,
	22,
	11,
	1,
	35,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	1,
	11,
	30,
	22,
	11,
	1,
	38,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	1,
	11,
	1,
	35,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	15,
	35,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	37,
	11,
	37,
	11,
	38,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	38,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	38,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	16,
	11,
	1,
	16,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	37,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	38,
	11,
	1,
	11,
	35,
	15,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	16,
	11,
	16,
	3,
	16,
	15,
	3,
	22,
	3,
	11,
	22,
	11,
	1,
	11,
	35,
	11,
	15,
	1,
	11,
	1,
	11,
	1,
	36,
	18,
	36,
	18,
	1,
	11,
	1,
	15,
	1,
	15,
	1,
	11,
	1,
	11,
	1,
	11,
	15,
	11,
	1,
	11,
	16,
	15,
	16,
	11,
	3,
	11,
	1,
	11,
	35,
	15,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	35,
	1,
	11,
	31,
	33,
	32,
	11,
	1,
	11,
	15,
	11,
	26,
	11,
	15,
	11,
	36,
	18,
	11,
	15,
	11,
	1,
	11,
	1,
	15,
	11,
	1,
	11,
	1,
	11,
	1,
	15,
	34,
	11,
	15,
	11,
	15,
	38,
	11,
	1,
	11,
	35,
	11,
	22,
	15,
	16,
	11,
	22,
	11,
	1,
	3,
	1,
	35,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	22,
	35,
	11,
	35,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	35,
	11,
	35,
	11,
	1,
	11,
	1,
	3,
	11,
	1,
	10,
	1,
	43,
	10,
	11,
	15,
	13,
	15,
	28,
	15,
	28,
	1,
	28,
	15,
	1,
	11,
	1,
	11,
	35,
	11,
	13,
	1,
	42,
	11,
	1,
	11,
	15,
	35,
	11,
	35,
	11,
	15,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	3,
	1,
	3,
	1,
	11,
	16,
	11,
	15,
	3,
	15,
	8,
	1,
	9,
	1,
	26,
	3,
	26,
	14,
	11,
	39,
	36,
	39,
	36,
	39,
	11,
	29,
	15,
	0,
	1,
	3,
	37,
	11,
	39,
	11,
	34,
	11,
	30,
	36,
	18,
	34,
	11,
	15,
	37,
	15,
	11,
	15,
	7,
	11,
	1,
	11,
	36,
	18,
	11,
	36,
	18,
	11,
	38,
	37,
	38,
	37,
	38,
	37,
	38,
	37,
	38,
	37,
	38,
	1,
	11,
	37,
	11,
	37,
	11,
	38,
	11,
	38,
	11,
	29,
	11,
	36,
	18,
	36,
	18,
	11,
	28,
	11,
	36,
	18,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	20,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	20,
	28,
	11,
	28,
	11,
	28,
	20,
	11,
	39,
	11,
	22,
	28,
	11,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	11,
	36,
	18,
	11,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	11,
	15,
	11,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	11,
	36,
	18,
	36,
	18,
	11,
	36,
	18,
	11,
	1,
	11,
	22,
	15,
	11,
	22,
	15,
	11,
	15,
	11,
	1,
	11,
	1,
	39,
	15,
	11,
	26,
	36,
	15,
	11,
	39,
	11,
	39,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	15,
	22,
	11,
	15,
	11,
	15,
	11,
	14,
	15,
	11,
	26,
	15,
	36,
	15,
	11,
	15,
	11,
	15,
	11,
	22,
	36,
	19,
	36,
	19,
	36,
	19,
	36,
	19,
	26,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	15,
	18,
	28,
	34,
	28,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	28,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	34,
	36,
	18,
	28,
	1,
	28,
	1,
	28,
	34,
	28,
	11,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	11,
	1,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	34,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	34,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	34,
	28,
	11,
	28,
	11,
	15,
	11,
	15,
	22,
	15,
	11,
	35,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	15,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	37,
	11,
	16,
	22,
	11,
	1,
	11,
	1,
	11,
	15,
	35,
	11,
	1,
	11,
	16,
	11,
	1,
	35,
	11,
	1,
	15,
	11,
	1,
	11,
	31,
	11,
	1,
	10,
	1,
	43,
	28,
	15,
	28,
	11,
	15,
	13,
	11,
	28,
	11,
	1,
	11,
	35,
	11,
	13,
	1,
	11,
	15,
	1,
	15,
	1,
	11,
	13,
	11,
	28,
	15,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	15,
	11,
	1,
	11,
	1,
	15,
	1,
	11,
	35,
	11,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	23,
	24,
	11,
	33,
	11,
	32,
	11,
	28,
	11,
	25,
	1,
	25,
	11,
	25,
	11,
	25,
	11,
	25,
	11,
	25,
	11,
	25,
	11,
	25,
	11,
	18,
	36,
	11,
	37,
	11,
	1,
	18,
	34,
	22,
	36,
	18,
	29,
	11,
	3,
	1,
	3,
	1,
	3,
	1,
	3,
	1,
	3,
	1,
	3,
	1,
	3,
	1,
	28,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	36,
	18,
	28,
	36,
	18,
	28,
	18,
	28,
	18,
	11,
	34,
	22,
	28,
	36,
	18,
	36,
	18,
	36,
	18,
	28,
	11,
	28,
	38,
	37,
	28,
	11,
	7,
	11,
	22,
	28,
	38,
	37,
	28,
	36,
	18,
	28,
	18,
	28,
	18,
	28,
	34,
	28,
	22,
	28,
	36,
	28,
	18,
	28,
	36,
	28,
	18,
	28,
	36,
	18,
	36,
	18,
	34,
	28,
	34,
	28,
	34,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	37,
	38,
	28,
	38,
	11,
	1,
	17,
	11,
	15,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	15,
	11,
	15,
	11,
	35,
	11,
	15,
	11,
	15,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	15,
	11,
	1,
	11,
	15,
	29,
	11,
	15,
	11,
	1,
	11,
	35,
	11,
	35,
	11,
	1,
	26,
	11,
	1,
	26,
	11,
	15,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	12,
	10,
	1,
	43,
	15,
	28,
	11,
	28,
	13,
	1,
	10,
	1,
	10,
	11,
	3,
	1,
	11,
	1,
	11,
	35,
	15,
	1,
	11,
	35,
	11,
	35,
	11,
	1,
	11,
	1,
	11,
	35,
	15,
	11,
	1,
	11,
	1,
	11,
	16,
	11,
	1,
	11,
	1,
	11,
	15,
	11,
	15,
	1,
	11,
	1,
	35,
	11,
	16,
	11,
	15,
	11,
	1,
	15,
	11,
	15,
	11,
	1,
	11,
	1,
	11,
	15,
	11,
	1,
	11,
	35,
	11,
	1,
	11,
	10,
	11,
	10,
	11,
	10,
	11,
	10,
	11,
	10,
	11,
	10,
	11,
	1,
	15,
	1,
	11,
	1,
	11,
	1,
	43,
	11,
	13,
	11,
	1,
	11,
	15,
	13,
	10,
	1,
	11,
	1,
	11,
	1,
	11,
	13,
	11,
	13,
	11,
	13,
	11,
	13,
	10,
	11,
	28,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	43,
	12,
	1,
	28,
	11,
	28,
	11,
	1,
	11,
	1,
	11,
	15,
	11,
	35,
	15,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	1,
	11,
	1,
	16,
	15,
	22,
	11,
	15,
	11,
	1,
	11,
	1,
	15,
	11,
	35,
	11,
	16,
	11,
	1,
	11,
	35,
	11,
	35,
	11,
	1,
	11,
	35,
	11,
	15,
	11,
	1,
	11,
	35,
	11,
	10,
	11,
	10,
	11,
	10,
	11,
	10,
	11,
	10,
	1,
	11,
	1,
	11,
	1,
	43,
	12,
	1,
	12,
	1,
	15,
	11,
	13,
	11,
	1,
	11,
	1,
	11,
	16,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	16,
	11,
	15,
	16,
	11,
	1,
	11,
	1,
	11,
	1,
	15,
	11,
	16,
	15,
	11,
	16,
	11,
	1,
	11,
	35,
	11,
	1,
	11,
	1,
	11,
	15,
	11,
	35,
	11,
	16,
	22,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	35,
	11,
	13,
	15,
	1,
	15,
	11,
	1,
	12,
	1,
	10,
	11,
	10,
	1,
	11,
	1,
	43,
	15,
	28,
	13,
	1,
	11,
	37,
	11,
	15,
	11,
	15,
	11,
	36,
	18,
	11,
	18,
	11,
	36,
	18,
	36,
	18,
	11,
	36,
	18,
	11,
	36,
	3,
	36,
	18,
	3,
	36,
	18,
	36,
	18,
	1,
	11,
	1,
	11,
	36,
	18,
	11,
	13,
	1,
	13,
	11,
	35,
	11,
	15,
	11,
	35,
	11,
	1,
	15,
	11,
	1,
	15,
	11,
	15,
	11,
	35,
	11,
	15,
	35,
	11,
	15,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	34,
	3,
	11,
	1,
	34,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	34,
	11,
	34,
	11,
	34,
	11,
	34,
	11,
	28,
	11,
	1,
	15,
	1,
	11,
	35,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	15,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	1,
	11,
	1,
	35,
	11,
	38,
	11,
	1,
	35,
	11,
	1,
	11,
	35,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	1,
	11,
	35,
	11,
	36,
	11,
	37,
	11,
	37,
	11,
	28,
	11,
	28,
	40,
	28,
	20,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	21,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	20,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	11,
	28,
	11,
	28,
	20,
	28,
	20,
	11,
	39,
	34,
	11,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	20,
	28,
	11,
	28,
	20,
	28,
	20,
	28,
	11,
	35,
	11,
	28,
	11,
	28,
	11,
	28,
	11,
	1,
	11,
	1,
	11,
	1,
	11
], Lt = [
	4352,
	8361,
	8986,
	9001,
	9193,
	9200,
	9203,
	9725,
	9748,
	9776,
	9800,
	9855,
	9866,
	9875,
	9889,
	9898,
	9917,
	9924,
	9934,
	9940,
	9962,
	9970,
	9973,
	9978,
	9981,
	9989,
	9994,
	10024,
	10060,
	10062,
	10067,
	10071,
	10133,
	10160,
	10175,
	11035,
	11088,
	11093,
	11904,
	11931,
	12032,
	12272,
	12353,
	12441,
	12549,
	12593,
	12688,
	12783,
	12832,
	12880,
	42128,
	43360,
	44032,
	63744,
	65040,
	65072,
	65108,
	65128,
	65281,
	65474,
	65482,
	65490,
	65498,
	65504,
	65512,
	94176,
	94192,
	94208,
	101631,
	101760,
	110576,
	110581,
	110589,
	110592,
	110898,
	110928,
	110933,
	110948,
	110960,
	119552,
	119648,
	126980,
	127183,
	127374,
	127377,
	127488,
	127504,
	127552,
	127568,
	127584,
	127744,
	127789,
	127799,
	127870,
	127904,
	127951,
	127968,
	127988,
	127992,
	128064,
	128066,
	128255,
	128331,
	128336,
	128378,
	128405,
	128420,
	128507,
	128640,
	128716,
	128720,
	128725,
	128732,
	128747,
	128756,
	128992,
	129008,
	129292,
	129340,
	129351,
	129648,
	129664,
	129678,
	129736,
	129741,
	129759,
	129775,
	131072,
	196608
], Rt = [
	4448,
	8362,
	8988,
	9003,
	9197,
	9201,
	9204,
	9727,
	9750,
	9784,
	9812,
	9856,
	9872,
	9876,
	9890,
	9900,
	9919,
	9926,
	9935,
	9941,
	9963,
	9972,
	9974,
	9979,
	9982,
	9990,
	9996,
	10025,
	10061,
	10063,
	10070,
	10072,
	10136,
	10161,
	10176,
	11037,
	11089,
	11094,
	11930,
	12020,
	12246,
	12351,
	12439,
	12544,
	12592,
	12687,
	12774,
	12831,
	12872,
	42125,
	42183,
	43389,
	55204,
	64256,
	65050,
	65107,
	65127,
	65132,
	65471,
	65480,
	65488,
	65496,
	65501,
	65511,
	65519,
	94181,
	94199,
	101590,
	101663,
	101875,
	110580,
	110588,
	110591,
	110883,
	110899,
	110931,
	110934,
	110952,
	111356,
	119639,
	119671,
	126981,
	127184,
	127375,
	127387,
	127491,
	127548,
	127561,
	127570,
	127590,
	127777,
	127798,
	127869,
	127892,
	127947,
	127956,
	127985,
	127989,
	128063,
	128065,
	128253,
	128318,
	128335,
	128360,
	128379,
	128407,
	128421,
	128592,
	128710,
	128717,
	128723,
	128729,
	128736,
	128749,
	128765,
	129004,
	129009,
	129339,
	129350,
	129536,
	129661,
	129675,
	129735,
	129737,
	129757,
	129771,
	129785,
	196606,
	262142
];
//#endregion
//#region packages/core/src/text/line-break.ts
function zt(e) {
	let t = 0, n = Ft.length - 1;
	for (; t < n;) {
		let r = t + n + 1 >> 1;
		Ft[r] <= e ? t = r : n = r - 1;
	}
	return Pt[It[t]];
}
function Bt(e) {
	let t = 0, n = Lt.length - 1;
	if (n < 0 || e < Lt[0]) return !1;
	for (; t < n;) {
		let r = t + n + 1 >> 1;
		Lt[r] <= e ? t = r : n = r - 1;
	}
	return e < Rt[t];
}
function Vt(e, t) {
	let n = zt(e);
	if (n === "OP") return !0;
	let r = zt(t), i = n === "AL" || n === "HL", a = r === "AL" || r === "HL";
	return !!(i && (a || r === "NU" || r === "PR" || r === "PO") || a && (n === "NU" || n === "PR" || n === "PO") || n === "PR" && (r === "ID" || r === "EB" || r === "EM") || (n === "ID" || n === "EB" || n === "EM") && r === "PO" || n === "NU" && (r === "NU" || r === "PO" || r === "PR") || r === "NU" && (n === "PO" || n === "PR" || n === "HY" || n === "IS") || (i || n === "NU") && r === "OP" && !Bt(t) || n === "CP" && !Bt(e) && (a || r === "NU"));
}
//#endregion
//#region packages/core/src/text/vertical-orientation.generated.ts
var Ht = [
	"U",
	"R",
	"Tu",
	"Tr"
], Ut = [
	0,
	167,
	168,
	169,
	170,
	174,
	175,
	177,
	178,
	188,
	191,
	215,
	216,
	247,
	248,
	746,
	748,
	4352,
	4608,
	5121,
	5760,
	6320,
	6400,
	8214,
	8215,
	8216,
	8218,
	8220,
	8222,
	8224,
	8226,
	8240,
	8242,
	8251,
	8253,
	8258,
	8259,
	8263,
	8266,
	8273,
	8274,
	8293,
	8294,
	8413,
	8417,
	8418,
	8421,
	8448,
	8450,
	8451,
	8458,
	8463,
	8464,
	8467,
	8469,
	8470,
	8472,
	8478,
	8484,
	8485,
	8486,
	8487,
	8488,
	8489,
	8490,
	8494,
	8495,
	8501,
	8512,
	8517,
	8523,
	8524,
	8526,
	8527,
	8586,
	8588,
	8592,
	8734,
	8735,
	8756,
	8758,
	8960,
	8968,
	8972,
	8992,
	8996,
	9001,
	9003,
	9004,
	9085,
	9115,
	9150,
	9166,
	9167,
	9168,
	9169,
	9180,
	9186,
	9251,
	9252,
	9472,
	9632,
	9754,
	9760,
	10088,
	10102,
	10132,
	11026,
	11056,
	11088,
	11098,
	11159,
	11160,
	11192,
	11218,
	11219,
	11244,
	11248,
	11264,
	11856,
	11858,
	11904,
	12289,
	12291,
	12296,
	12306,
	12308,
	12320,
	12336,
	12337,
	12353,
	12354,
	12355,
	12356,
	12357,
	12358,
	12359,
	12360,
	12361,
	12362,
	12387,
	12388,
	12419,
	12420,
	12421,
	12422,
	12423,
	12424,
	12430,
	12431,
	12437,
	12439,
	12443,
	12445,
	12448,
	12449,
	12450,
	12451,
	12452,
	12453,
	12454,
	12455,
	12456,
	12457,
	12458,
	12483,
	12484,
	12515,
	12516,
	12517,
	12518,
	12519,
	12520,
	12526,
	12527,
	12533,
	12535,
	12540,
	12541,
	12583,
	12584,
	12724,
	12728,
	12731,
	12732,
	12784,
	12800,
	13055,
	13144,
	13179,
	13184,
	42192,
	43360,
	43392,
	44032,
	55296,
	57344,
	64256,
	65040,
	65056,
	65072,
	65097,
	65104,
	65107,
	65112,
	65113,
	65119,
	65123,
	65127,
	65136,
	65281,
	65282,
	65288,
	65290,
	65292,
	65293,
	65294,
	65295,
	65306,
	65308,
	65311,
	65312,
	65339,
	65340,
	65341,
	65342,
	65343,
	65344,
	65371,
	65377,
	65504,
	65507,
	65508,
	65512,
	65520,
	65529,
	65532,
	65534,
	67968,
	68e3,
	71040,
	71168,
	72192,
	72384,
	77824,
	83584,
	94176,
	101888,
	110576,
	110898,
	110899,
	110928,
	110931,
	110933,
	110934,
	110948,
	110952,
	111360,
	118464,
	118736,
	118784,
	119296,
	119520,
	119680,
	120832,
	121520,
	126976,
	127488,
	127490,
	129024,
	129280,
	129792,
	131072,
	196606,
	196608,
	262142,
	983040,
	1048574,
	1048576,
	1114110
], Wt = [
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	3,
	1,
	3,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	3,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	2,
	0,
	3,
	0,
	3,
	0,
	3,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	3,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	3,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	2,
	0,
	1,
	3,
	0,
	1,
	0,
	1,
	2,
	0,
	3,
	0,
	2,
	1,
	2,
	0,
	3,
	1,
	2,
	0,
	3,
	0,
	3,
	0,
	3,
	0,
	3,
	1,
	0,
	3,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	2,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	1
];
//#endregion
//#region packages/core/src/text/vertical-orientation.ts
function Gt(e) {
	let t = 0, n = Ut.length - 1;
	for (; t < n;) {
		let r = t + n + 1 >> 1;
		Ut[r] <= e ? t = r : n = r - 1;
	}
	return Wt[t];
}
function Kt(e) {
	return Ht[Gt(e)];
}
function qt(e) {
	return Jt.get(e) ?? null;
}
var Jt = new Map([
	[65292, 65040],
	[12289, 65041],
	[12290, 65042]
]);
function Yt(e) {
	return Xt.get(e) ?? null;
}
var Xt = new Map([
	[65288, 65077],
	[65289, 65078],
	[65371, 65079],
	[65373, 65080],
	[12308, 65081],
	[12309, 65082],
	[12304, 65083],
	[12305, 65084],
	[12298, 65085],
	[12299, 65086],
	[12296, 65087],
	[12297, 65088],
	[12300, 65089],
	[12301, 65090],
	[12302, 65091],
	[12303, 65092],
	[12310, 65047],
	[12311, 65048]
]), Zt = new Set([65307]);
function Qt(e) {
	return Zt.has(e);
}
var $t = new Set([
	12540,
	12316,
	65374
]);
function en(e) {
	return $t.has(e);
}
//#endregion
//#region packages/core/src/text/vertical-vert-feature.ts
var tn = 256, nn = 200, rn = /* @__PURE__ */ new WeakMap();
function an(e) {
	let t = e.canvas, n = t?.ownerDocument?.defaultView?.HTMLCanvasElement;
	return typeof n == "function" && t instanceof n || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement ? t : null;
}
function on(e, t) {
	return e.replace(/(^|\s)\d*\.?\d+(?:px|pt|pc|in|cm|mm|q|em|rem|%)(?:\/[^\s]+)?(?=\s)/i, `$1${t}`);
}
function sn(e, t = !0) {
	let n = e.trim();
	return [...n === "" || n.toLowerCase() === "normal" ? [] : n.split(",").map((e) => e.trim()).filter((e) => !/^(["'])vert\1(?:\s+(?:on|off|\d+))?$/i.test(e)), `"vert" ${+!!t}`].join(", ");
}
function cn(e) {
	try {
		let t = e.ownerDocument?.defaultView, n = t?.getComputedStyle ? t.getComputedStyle(e) : typeof getComputedStyle == "function" ? getComputedStyle(e) : null;
		if (n?.fontFeatureSettings) return n.fontFeatureSettings;
	} catch {}
	return e.style.fontFeatureSettings;
}
function ln(e, t) {
	if (e.isConnected) return t();
	let n = e.ownerDocument ?? (typeof document > "u" ? null : document), r = n?.body ?? n?.documentElement;
	if (!r) return t();
	let i = e.parentNode, a = e.nextSibling, o = e.style, s = {
		position: o.position,
		left: o.left,
		top: o.top,
		opacity: o.opacity,
		pointerEvents: o.pointerEvents
	};
	Object.assign(o, {
		position: "fixed",
		left: "-99999px",
		top: "0",
		opacity: "0",
		pointerEvents: "none"
	}), r.appendChild(e);
	let c = !1;
	try {
		return t();
	} catch (e) {
		throw c = !0, e;
	} finally {
		let t;
		try {
			if (i) {
				let t = a?.parentNode === i ? a : null;
				i.insertBefore(e, t);
			} else e.remove();
		} catch (n) {
			t = n;
			try {
				e.remove();
			} catch {}
		} finally {
			Object.assign(o, s);
		}
		if (t !== void 0 && !c) throw t;
	}
}
function un(e, t) {
	let n = an(e);
	return n === null ? t() : ln(n, t);
}
function dn(e) {
	let t = rn.get(e);
	if (t) return t;
	let n = e.createElement("canvas");
	n.width = tn, n.height = tn, n.setAttribute("aria-hidden", "true"), Object.assign(n.style, {
		position: "fixed",
		left: "-99999px",
		top: "0",
		opacity: "0",
		pointerEvents: "none"
	});
	let r = {
		canvas: n,
		cache: /* @__PURE__ */ new Map(),
		epoch: 0
	}, i = () => {
		r.epoch += 1, r.cache.clear();
	};
	return e.fonts?.addEventListener?.("loadingdone", i), e.fonts?.addEventListener?.("loadingerror", i), rn.set(e, r), r;
}
function fn(e, t) {
	let { width: n, height: r } = e.canvas, i = e.getImageData(0, 0, n, r).data, a = new Uint8ClampedArray(n * r), o = n, s = r, c = -1, l = -1, u = 0, d = 0, f = 0;
	for (let e = 0; e < r; e += 1) for (let t = 0; t < n; t += 1) {
		let r = i[(e * n + t) * 4 + 3];
		a[e * n + t] = r, r !== 0 && (o = Math.min(o, t), s = Math.min(s, e), c = Math.max(c, t), l = Math.max(l, e), u += r, d += t * r, f += e * r);
	}
	if (c < o || l < s || u === 0) return null;
	let p = e.measureText(t), m = (e) => typeof e == "number" && Number.isFinite(e) ? e : 0;
	return {
		alpha: a,
		geometry: [
			o,
			s,
			c,
			l,
			d / u,
			f / u
		],
		metrics: [
			m(p.width),
			m(p.actualBoundingBoxLeft),
			m(p.actualBoundingBoxRight),
			m(p.actualBoundingBoxAscent),
			m(p.actualBoundingBoxDescent)
		]
	};
}
function Q(e, t, n) {
	let r = e.canvas;
	r.style.fontFeatureSettings = n, e.font = e.font, e.clearRect(0, 0, r.width, r.height);
	let i = String.fromCodePoint(t);
	return e.fillText(i, r.width / 2, r.height / 2), fn(e, i);
}
function $(e, t) {
	let n = 0, r = Math.min(e.length, t.length);
	for (let i = 0; i < r; i += 1) n += Math.abs(e[i] - t[i]);
	return n;
}
function pn(e, t, n, r) {
	let i = (e, t, n, r) => {
		let i = Math.max($(e, t), $(n, r));
		return Math.min($(e, n), $(e, r), $(t, n), $(t, r)) > i;
	};
	return i(e.alpha, t.alpha, n.alpha, r.alpha) || i(e.geometry, t.geometry, n.geometry, r.geometry) || i(e.metrics, t.metrics, n.metrics, r.metrics);
}
function mn(e, t) {
	let n = an(e);
	if (n === null || typeof document > "u") return !1;
	let r = n.ownerDocument ?? document, i = dn(r), a = cn(n), o = `${i.epoch}:${on(e.font, "<size>")}:${a}:${t}`, s = i.cache.get(o);
	if (s !== void 0) return s;
	let c = !1, l = r.body ?? r.documentElement;
	if (!l) return !1;
	let u = i.canvas.isConnected;
	u || l.appendChild(i.canvas);
	let d = i.canvas.getContext("2d", { willReadFrequently: !0 });
	if (d !== null) {
		let n = i.canvas.style.fontFeatureSettings;
		try {
			d.font = on(e.font, `${nn}px`), d.fillStyle = "#000", d.textAlign = "center", d.textBaseline = "middle";
			let n = sn(a, !1), r = sn(a, !0), i = Q(d, t, n), o = Q(d, t, n), s = Q(d, t, r), l = Q(d, t, r);
			c = i !== null && o !== null && s !== null && l !== null && pn(i, o, s, l);
		} catch {
			c = !1;
		} finally {
			i.canvas.style.fontFeatureSettings = n, d.font = d.font, d.clearRect(0, 0, i.canvas.width, i.canvas.height), u || i.canvas.remove();
		}
	}
	return i.cache.set(o, c), c;
}
function hn(e, t) {
	let n = e.canvas;
	return n?.style ? un(e, () => {
		let r = n.style, i = r.fontFeatureSettings;
		r.fontFeatureSettings = sn(cn(n)), e.font = e.font;
		try {
			return t();
		} finally {
			r.fontFeatureSettings = i, e.font = e.font;
		}
	}) : t();
}
function gn(e, t) {
	return hn(e, () => {
		let n = e.textAlign, r = e.textBaseline;
		e.textAlign = "center", e.textBaseline = "middle";
		try {
			let n = e.measureText(t), r = Number.isFinite(n.width) ? Math.max(0, n.width) : 0, i = typeof n.actualBoundingBoxAscent == "number" && Number.isFinite(n.actualBoundingBoxAscent) && typeof n.actualBoundingBoxDescent == "number" && Number.isFinite(n.actualBoundingBoxDescent);
			return {
				advancePx: r,
				inkBeforePx: i ? n.actualBoundingBoxAscent : 0,
				inkAfterPx: i ? n.actualBoundingBoxDescent : 0,
				cellAdvancePx: r,
				originInCellPx: r / 2
			};
		} finally {
			e.textAlign = n, e.textBaseline = r;
		}
	});
}
//#endregion
//#region packages/core/src/text/bidi/segment-line.ts
var _n = (e) => {
	let t = e.text;
	return typeof t == "string" ? t : void 0;
};
function vn(e, t = {}) {
	return e.some((e) => t.isRtlMarked?.(e) || o(_n(e) ?? ""));
}
function yn(e, t, n = {}) {
	let r = e.length;
	if (r === 0) return {
		order: [],
		rtl: []
	};
	let i = "", a = Array(r), o = Array(r), l;
	for (let t = 0; t < r; t++) {
		let r = e[t], s = _n(r) ?? "", c = n.digitsAsAN?.(r) === !0, u = n.isRtlMarked?.(r) === !0;
		if (a[t] = i.length, i += s.length > 0 ? s : "￼", o[t] = i.length, n.isTab?.(r)) (l ??= [])[a[t]] = "S";
		else if (s.length > 0 && (c || u)) {
			let e = l ??= [];
			for (let r = a[t]; r < o[t]; r++) {
				let t = i.charCodeAt(r);
				c && t >= 48 && t <= 57 ? e[r] = "AN" : u && n.isRtlAmbiguous?.(i[r]) && (e[r] = "R");
			}
		}
	}
	let { levels: u, paragraphLevel: d } = s().computeLevels(i, t ? "rtl" : "ltr", l);
	if (!n.directionFromAnyOdd) {
		let { order: e, segLevels: t } = c(u, d, a);
		return {
			order: e,
			rtl: Array.from(t, (e) => (e & 1) == 1)
		};
	}
	let f = Array(r), p = Array(r);
	for (let e = 0; e < r; e++) {
		let t = o[e];
		for (; t > a[e] && i[t - 1] === " ";) t--;
		let n = -1, r = -1;
		for (let i = a[e]; i < t; i++) {
			let e = u[i];
			e !== 255 && ((e & 1) == 1 && n < 0 ? n = i : !(e & 1) && r < 0 && (r = i));
		}
		f[e] = n >= 0, p[e] = n >= 0 ? n : r >= 0 ? r : a[e];
	}
	return {
		order: c(u, d, p).order,
		rtl: f
	};
}
//#endregion
//#region packages/core/src/fonts/office-auto-line.ts
var bn = 1.3;
function xn(e) {
	let { unitsPerEm: t, hheaAscent: n, hheaDescent: r, hheaLineGap: i, farEastCodePage: a } = e;
	if (!(Number.isFinite(t) && t > 0 && Number.isFinite(n) && n >= 0 && Number.isFinite(r) && r <= 0 && Number.isFinite(i))) return null;
	let o = n - r;
	if (!(o > 0)) return null;
	let s = (bn - 1) / 2 * o, c = a ? n + s : n + i, l = a ? -r + s : -r;
	return c >= 0 && l >= 0 && c + l > 0 ? Object.freeze({
		lineHeightRatio: (c + l) / t,
		designAscentRatio: c / t,
		designDescentRatio: l / t
	}) : null;
}
function Sn(e) {
	let { faceSource: t, unitsPerEm: n, hhea: r, win: i, typoMetrics: a, farEastCodePage: o } = e, s = [
		n,
		...r,
		...i,
		...a ?? []
	];
	if (!(n > 0) || !s.every(Number.isFinite)) return null;
	let [c, l, u] = r, [d, f] = i, p, m;
	if (t === "system") {
		if (o) return null;
		p = c + Math.max(0, u), m = -l;
	} else if (o) {
		let e = d + f, t = (bn - 1) / 2 * e;
		p = d + t, m = f + t;
	} else if (a) p = a[0] + Math.max(0, a[2]), m = -a[1];
	else {
		let e = d + f;
		p = d + Math.max(0, u - (e - (c - l))), m = f;
	}
	return p >= 0 && m >= 0 && p + m > 0 ? Object.freeze({
		ascentRatio: p / n,
		descentRatio: m / n
	}) : null;
}
//#endregion
export { p as $, Ve as A, Ae as B, wt as C, Ue as D, pt as E, Ie as F, ae as G, he as H, Se as I, h as J, ie as K, ke as L, Re as M, He as N, We as O, Be as P, g as Q, De as R, Tt as S, Ct as T, ge as U, Oe as V, pe as W, A as X, D as Y, _ as Z, Nt as _, vn as a, At as b, hn as c, qt as d, f as et, Kt as f, zt as g, Vt as h, yn as i, ze as j, Ke as k, un as l, Qt as m, Sn as n, l as nt, gn as o, en as p, re as q, xn as r, u as rt, mn as s, bn as t, T as tt, Yt as u, Mt as v, St as w, Et as x, jt as y, be as z };
