import { $ as e, A as t, C as n, Ct as r, D as i, Dt as a, E as o, Ft as s, Gt as c, Ht as l, It as u, Jt as d, Kt as f, Lt as p, M as m, Mt as h, O as g, Q as _, Rt as v, St as y, T as b, Tt as x, Ut as S, Vt as C, Yt as w, _ as T, a as E, b as D, bt as O, c as k, dt as A, et as j, f as M, g as N, h as P, ht as ee, i as te, it as F, j as ne, jt as re, k as ie, kt as ae, l as I, m as oe, mt as se, o as ce, ot as le, p as ue, pt as de, q as fe, rt as pe, s as me, tt as he, u as ge, ut as _e, vt as ve, wt as ye, x as be, xt as xe, yt as Se, zt as Ce } from "./hyperlink-BDaF40fS.js";
import { o as we, r as Te, s as L } from "./bounded-raw-part-cache-lw607spG.js";
import { t as Ee } from "./cjk-fallback-D--USve7.js";
import { c as De, f as Oe, i as ke, l as Ae, m as je, n as Me, o as Ne, p as R, s as Pe, t as Fe, u as Ie } from "./line-distribute-CdIbiyUu.js";
import { Ct as Le, Et as Re, Tt as ze, _t as Be, a as Ve, c as He, gt as z, l as Ue, lt as We, mt as Ge, n as Ke, pt as qe } from "./plot-area-frame-DJnay5Wh.js";
import "./units-EJdC96r6.js";
import { i as Je, l as Ye } from "./pixel-budget-DEZjGJ9f.js";
import { j as Xe } from "./renderer-DF1NP7gt.js";
import { r as Ze, s as Qe } from "./raster-target-Bbyiwmtp.js";
import { n as $e, t as et } from "./office-auto-line-C6pn2RDx.js";
import { a as tt, c as nt, i as rt, n as it, o as at, r as ot, s as B, t as st } from "./source-key-DqqXUX8s.js";
//#region packages/core/src/fonts/canvas-route.ts
function ct(e, t) {
	let n = e.trim();
	if (!n) throw TypeError("Canvas font route requires a family list");
	return Object.freeze({
		familyList: n,
		scope: t,
		fingerprint: `canvas-font-route-v1:${encodeURIComponent(t)}:${encodeURIComponent(n)}`
	});
}
function lt(e, t, n, r) {
	if (!Number.isFinite(t) || t < 0) throw RangeError("Canvas font size must be finite and non-negative");
	if (!Number.isFinite(n) || n < 1 || n > 1e3) throw RangeError("Canvas font weight must be finite and between 1 and 1000");
	if (!e.familyList.trim()) throw TypeError("Canvas font route requires a family list");
	return `${r} ${n} ${t}px ${e.familyList}`;
}
//#endregion
//#region packages/core/src/fonts/canvas-font-box.ts
var ut = "__ooxml_missing_font_control_6f33c9b4__";
function dt(e) {
	let t = "";
	for (let n of e) {
		let e = n.codePointAt(0) ?? 0;
		n === "\"" || n === "\\" || e <= 31 || e === 127 ? t += `\\${e.toString(16)} ` : t += n;
	}
	return `"${t}"`;
}
function ft(e, t, n, r) {
	return `${r} ${n} ${t}px ${dt(e)}, ${dt(ut)}, serif`;
}
function pt(e) {
	return [
		e.width,
		e.actualBoundingBoxAscent,
		e.actualBoundingBoxDescent
	];
}
function mt(e, t, n) {
	let r = t.trim(), i = n.text, a = n.emPx ?? 100, o = n.weight ?? 400, s = n.style ?? "normal";
	if (!r || r === ut || !i || !Number.isFinite(a) || a <= 0 || !Number.isInteger(o) || o < 1 || o > 1e3) return null;
	let c = e.font;
	try {
		e.font = ft(r, a, o, s);
		let t = e.measureText(i);
		e.font = ft(ut, a, o, s);
		let n = e.measureText(i), c = pt(t), l = pt(n);
		if (c.every((e, t) => Object.is(e, l[t]))) return null;
		let u = t.fontBoundingBoxAscent, d = t.fontBoundingBoxDescent;
		return Number.isFinite(u) && Number.isFinite(d) && u + d > 0 ? (u + d) / a : null;
	} finally {
		e.font = c;
	}
}
//#endregion
//#region packages/core/src/shape/drawingml-shape.ts
function ht(e, t, n) {
	let { x: r, y: i, w: a, h: o } = t.rect, { rotationDeg: s, flipH: c, flipV: l } = t.transform;
	e.save();
	try {
		(s !== 0 || c || l) && (e.translate(r + a / 2, i + o / 2), s !== 0 && e.rotate(s * Math.PI / 180), e.scale(c ? -1 : 1, l ? -1 : 1), e.translate(-(r + a / 2), -(i + o / 2))), n();
	} finally {
		e.restore();
	}
}
function gt(e, t) {
	let { x: n, y: r, w: i, h: o } = t.rect;
	if (e.beginPath(), t.geometry.kind === "preset") {
		let s = [...t.geometry.adjustments];
		a(e, t.geometry.name, n, r, i, o, s) || De(e, t.geometry.name, n, r, i, o, s[0], s[1], s[2], s[3]);
	} else Ie(e, t.geometry.subpaths, n, r, i, o);
	e.clip();
}
var _t = new Set([
	"line",
	"straightconnector1",
	"bentconnector2",
	"bentconnector3",
	"bentconnector4",
	"bentconnector5",
	"curvedconnector2",
	"curvedconnector3",
	"curvedconnector4",
	"curvedconnector5"
]), vt = new Set([
	"callout1",
	"callout2",
	"callout3",
	"bordercallout1",
	"bordercallout2",
	"bordercallout3",
	"accentcallout1",
	"accentcallout2",
	"accentcallout3",
	"accentbordercallout1",
	"accentbordercallout2",
	"accentbordercallout3"
]);
function yt(e) {
	return vt.has(e) || e === "line" || e === "straightconnector1" || e.startsWith("bentconnector");
}
function bt(e, t, n, r, i) {
	if (qe(e, t, n), t.fill) {
		let n = z(t.fill, e, r.x, r.y, r.w, r.h, i);
		n && (e.strokeStyle = n);
	}
}
function xt(e, t, n, r) {
	let i = t.stroke;
	if (!i || !_t.has(n) && !vt.has(n)) return;
	let { x: a, y: o, w: s, h: c } = t.rect, l = i.fill ? z(i.fill, e, a, o, s, c, t.transform.rotationDeg) ?? void 0 : void 0, u = ae(n, a, o, s, c, [...t.geometry.kind === "preset" ? t.geometry.adjustments : []]);
	if (u) {
		if (yt(n) && u.vertices.length >= 2 && (i.headEnd || i.tailEnd)) {
			let n = u.vertices.map((e) => ({
				x: e.x,
				y: e.y
			}));
			i.tailEnd && (n[n.length - 1] = Pe(n[n.length - 1], n[n.length - 2], Ne(i.tailEnd, i, r))), i.headEnd && (n[0] = Pe(n[0], n[1], Ne(i.headEnd, i, r))), bt(e, i, r, t.rect, t.transform.rotationDeg), e.beginPath(), e.moveTo(n[0].x, n[0].y);
			for (let t = 1; t < n.length; t++) e.lineTo(n[t].x, n[t].y);
			e.stroke();
		}
		i.tailEnd && ke(e, u.end.x, u.end.y, u.end.angle, i.tailEnd, i, r, l), i.headEnd && ke(e, u.start.x, u.start.y, u.start.angle, i.headEnd, i, r, l);
	}
}
function St(e, t, n) {
	if (t.geometry.kind !== "custom") return;
	let r = t.stroke;
	if (!r || !r.headEnd && !r.tailEnd) return;
	let i = Ae(t.geometry.subpaths), { x: a, y: o, w: s, h: c } = t.rect, l = r.fill ? z(r.fill, e, a, o, s, c, t.transform.rotationDeg) ?? void 0 : void 0;
	i.start && r.headEnd && ke(e, a + i.start.x * s, o + i.start.y * c, Math.atan2(i.start.dy * c, i.start.dx * s), r.headEnd, r, n, l), i.end && r.tailEnd && ke(e, a + i.end.x * s, o + i.end.y * c, Math.atan2(i.end.dy * c, i.end.dx * s), r.tailEnd, r, n, l);
}
function Ct(e, t, n) {
	let { x: r, y: i, w: a, h: o } = t.rect;
	ht(e, t, () => {
		let s = z(t.fill, e, r, i, a, o, t.transform.rotationDeg), c = t.stroke, l = c ? () => {
			bt(e, c, n, t.rect, t.transform.rotationDeg), e.stroke();
		} : null;
		if (t.geometry.kind === "preset") {
			let u = t.geometry.name.toLowerCase(), d = [...t.geometry.adjustments], f = yt(u) && !!(c?.headEnd || c?.tailEnd);
			re(u) && h(e, u, r, i, a, o, d, s, l, () => {}, f ? { skipTrailingStroke: !0 } : void 0) || (e.beginPath(), De(e, u, r, i, a, o, d[0], d[1], d[2], d[3]), s && u !== "arc" && (e.fillStyle = s, u === "donut" || u === "smileyface" || u === "frame" ? e.fill("evenodd") : e.fill()), l && l()), xt(e, t, u, n);
		} else e.beginPath(), Ie(e, t.geometry.subpaths, r, i, a, o), s && (e.fillStyle = s, e.fill()), l && l(), St(e, t, n);
	});
}
//#endregion
//#region packages/core/src/text/number-format.ts
var wt = [
	[1e3, "M"],
	[900, "CM"],
	[500, "D"],
	[400, "CD"],
	[100, "C"],
	[90, "XC"],
	[50, "L"],
	[40, "XL"],
	[10, "X"],
	[9, "IX"],
	[5, "V"],
	[4, "IV"],
	[1, "I"]
];
function Tt(e) {
	let t = "", n = e;
	for (let [e, r] of wt) for (; n >= e;) t += r, n -= e;
	return t;
}
function Et(e, t) {
	let n = t.length, r = Math.floor((e - 1) / n) + 1;
	return t[(e - 1) % n].repeat(r);
}
var Dt = Array.from({ length: 26 }, (e, t) => String.fromCharCode(65 + t)), Ot = /* @__PURE__ */ "أ.ب.ت.ث.ج.ح.خ.د.ذ.ر.ز.س.ش.ص.ض.ط.ظ.ع.غ.ف.ق.ك.ل.م.ن.ه.و.ي".split("."), kt = /* @__PURE__ */ "أ.ب.ج.د.ه.و.ز.ح.ط.ي.ك.ل.م.ن.س.ع.ف.ص.ق.ر.ش.ت.ث.خ.ذ.ض.غ.ظ".split("."), At = [
	"א",
	"ב",
	"ג",
	"ד",
	"ה",
	"ו",
	"ז",
	"ח",
	"ט",
	"י",
	"כ",
	"ל",
	"מ",
	"נ",
	"ס",
	"ע",
	"פ",
	"צ",
	"ק",
	"ר",
	"ש",
	"ת"
], jt = [
	...Rt(1072, 1080),
	...Rt(1082, 1087),
	...Rt(1088, 1097),
	"ы",
	"э",
	"ю",
	"я"
], Mt = [
	...Rt(1040, 1048),
	...Rt(1050, 1055),
	...Rt(1056, 1065),
	"Ы",
	"Э",
	"Ю",
	"Я"
], Nt = [
	"ก",
	"ข",
	"ค",
	...Rt(3591, 3619),
	"ล",
	...Rt(3623, 3630)
], Pt = [
	"ㄱ",
	"ㄴ",
	"ㄷ",
	"ㄹ",
	"ㅁ",
	"ㅂ",
	"ㅅ",
	"ㅇ",
	"ㅈ",
	"ㅊ",
	"ㅋ",
	"ㅌ",
	"ㅍ",
	"ㅎ"
], Ft = [
	"가",
	"나",
	"다",
	"라",
	"마",
	"바",
	"사",
	"아",
	"자",
	"차",
	"카",
	"타",
	"파",
	"하"
], It = Rt(2325, 2361), Lt = [
	...Rt(2309, 2324),
	"अं",
	"अः"
];
function Rt(e, t) {
	let n = [];
	for (let r = e; r <= t; r++) n.push(String.fromCodePoint(r));
	return n;
}
var zt = /* @__PURE__ */ "ア.イ.ウ.エ.オ.カ.キ.ク.ケ.コ.サ.シ.ス.セ.ソ.タ.チ.ツ.テ.ト.ナ.ニ.ヌ.ネ.ノ.ハ.ヒ.フ.ヘ.ホ.マ.ミ.ム.メ.モ.ヤ.ユ.ヨ.ラ.リ.ル.レ.ロ.ワ.ヰ.ヱ.ヲ.ン".split("."), Bt = [
	...Rt(65393, 65436),
	"ｦ",
	"ﾝ"
];
function Vt(e) {
	return e <= 20 ? String.fromCodePoint(9312 + (e - 1)) : String(e);
}
function Ht(e, t) {
	return String(e).split("").map((e) => t[e.charCodeAt(0) - 48]).join("");
}
var Ut = Rt(65296, 65305), Wt = Rt(3664, 3673), Gt = Rt(2406, 2415), Kt = [
	"〇",
	"一",
	"二",
	"三",
	"四",
	"五",
	"六",
	"七",
	"八",
	"九"
], qt = [
	"영",
	"일",
	"이",
	"삼",
	"사",
	"오",
	"육",
	"칠",
	"팔",
	"구"
], Jt = [
	"零",
	"一",
	"二",
	"三",
	"四",
	"五",
	"六",
	"七",
	"八",
	"九"
], Yt = [
	"○",
	"一",
	"二",
	"三",
	"四",
	"五",
	"六",
	"七",
	"八",
	"九"
];
function Xt(e, t) {
	if (e < 10) return t[e];
	if (e < 100) {
		let n = Math.floor(e / 10), r = e % 10, i = n === 1 ? "十" : t[n] + "十";
		return r === 0 ? i : i + t[r];
	}
	return Ht(e, t);
}
function Zt(e, t) {
	switch (t) {
		case "upperRoman": return e >= 1 ? Tt(e) : String(e);
		case "lowerRoman": return e >= 1 ? Tt(e).toLowerCase() : String(e);
		case "upperLetter": return e >= 1 ? Et(e, Dt) : String(e);
		case "lowerLetter": return e >= 1 ? Et(e, Dt).toLowerCase() : String(e);
		case "arabicAlpha": return e >= 1 ? Et(e, Ot) : String(e);
		case "arabicAbjad": return e >= 1 ? Et(e, kt) : String(e);
		case "russianLower": return e >= 1 ? Et(e, jt) : String(e);
		case "russianUpper": return e >= 1 ? Et(e, Mt) : String(e);
		case "thaiLetters": return e >= 1 ? Et(e, Nt) : String(e);
		case "chosung": return e >= 1 ? Et(e, Pt) : String(e);
		case "ganada": return e >= 1 ? Et(e, Ft) : String(e);
		case "hindiVowels": return e >= 1 ? Et(e, It) : String(e);
		case "hindiConsonants": return e >= 1 ? Et(e, Lt) : String(e);
		case "aiueoFullWidth": return e >= 1 ? Et(e, zt) : String(e);
		case "aiueo": return e >= 1 ? Et(e, Bt) : String(e);
		case "decimalEnclosedCircle": return e >= 1 ? Vt(e) : String(e);
		case "hebrew1": return e >= 1 ? tn(e) : String(e);
		case "hebrew2": return e >= 1 ? nn(e) : String(e);
		case "hex": return e >= 1 ? e.toString(16).toUpperCase() : String(e);
		case "numberInDash": return e >= 1 ? `- ${e} -` : String(e);
		case "decimalZero": return e >= 1 && e <= 9 ? `0${e}` : String(e);
		case "decimalFullWidth": return e >= 1 ? Ht(e, Ut) : String(e);
		case "decimalHalfWidth": return String(e);
		case "thaiNumbers": return e >= 1 ? Ht(e, Wt) : String(e);
		case "hindiNumbers": return e >= 1 ? Ht(e, Gt) : String(e);
		case "ideographDigital":
		case "japaneseDigitalTenThousand": return e >= 1 ? Ht(e, Kt) : String(e);
		case "koreanDigital": return e >= 1 ? Ht(e, qt) : String(e);
		case "koreanDigital2": return e >= 1 ? Ht(e, Jt) : String(e);
		case "taiwaneseDigital": return e >= 1 ? Ht(e, Yt) : String(e);
		case "chineseCounting": return e >= 1 ? Xt(e, Kt) : String(e);
		case "taiwaneseCounting": return e >= 1 ? Xt(e, Yt) : String(e);
		case "chineseCountingThousand": return e >= 1 ? fn(e, an) : String(e);
		case "taiwaneseCountingThousand": return e >= 1 ? fn(e, on) : String(e);
		case "chineseLegalSimplified": return e >= 1 ? fn(e, cn) : String(e);
		case "ideographLegalTraditional": return e >= 1 ? fn(e, un) : String(e);
		case "japaneseCounting": return e >= 1 ? fn(e, rn) : String(e);
		case "japaneseLegal": return e >= 1 ? fn(e, ln) : String(e);
		case "koreanCounting": return e >= 1 ? fn(e, sn) : String(e);
		case "koreanLegal": return e >= 1 ? hn(e) : String(e);
		default: return String(e);
	}
}
var Qt = [
	"",
	"א",
	"ב",
	"ג",
	"ד",
	"ה",
	"ו",
	"ז",
	"ח",
	"ט"
], $t = [
	"",
	"י",
	"כ",
	"ל",
	"מ",
	"נ",
	"ס",
	"ע",
	"פ",
	"צ"
], en = [
	"",
	"ק",
	"ר",
	"ש",
	"ת",
	"ך",
	"ם",
	"ן",
	"ף",
	"ץ"
];
function tn(e) {
	let t = "", n = e, r = Math.floor(n / 1e3);
	n %= 1e3;
	let i = Math.floor(n / 100);
	if (n %= 100, r > 0 && (t += Qt[r % 10]), t += en[i], n === 15) return t + "טו";
	if (n === 16) return t + "טז";
	let a = Math.floor(n / 10), o = n % 10;
	return t += $t[a], t += Qt[o], t;
}
function nn(e) {
	let t = At.length, n = Math.floor((e - 1) / t);
	return At[e - t * n - 1] + "ת".repeat(n);
}
var rn = {
	digits: Jt,
	ten: "十",
	hundred: "百",
	thousand: "千",
	myriad: "万",
	elideOne: !0,
	insertZero: !1
}, an = {
	...rn,
	elideOne: !1,
	insertZero: !0
}, on = { ...an }, sn = {
	digits: [
		"영",
		"일",
		"이",
		"삼",
		"사",
		"오",
		"육",
		"칠",
		"팔",
		"구"
	],
	ten: "십",
	hundred: "백",
	thousand: "천",
	myriad: "만",
	elideOne: !0,
	insertZero: !1
}, cn = {
	digits: [
		"零",
		"壹",
		"贰",
		"叁",
		"肆",
		"伍",
		"陆",
		"柒",
		"捌",
		"玖"
	],
	ten: "拾",
	hundred: "佰",
	thousand: "仟",
	myriad: "万",
	elideOne: !1,
	insertZero: !0
}, ln = {
	digits: [
		"零",
		"壱",
		"弐",
		"参",
		"四",
		"伍",
		"六",
		"七",
		"八",
		"九"
	],
	ten: "拾",
	hundred: "百",
	thousand: "阡",
	myriad: "萬",
	elideOne: !1,
	insertZero: !1
}, un = {
	digits: [
		"零",
		"壹",
		"貳",
		"參",
		"肆",
		"伍",
		"陸",
		"柒",
		"捌",
		"玖"
	],
	ten: "拾",
	hundred: "佰",
	thousand: "仟",
	myriad: "萬",
	elideOne: !1,
	insertZero: !1
};
function dn(e, t, n) {
	let r = Math.floor(e / 1e3) % 10, i = Math.floor(e / 100) % 10, a = Math.floor(e / 10) % 10, o = e % 10, s = [
		{
			digit: r,
			unit: t.thousand
		},
		{
			digit: i,
			unit: t.hundred
		},
		{
			digit: a,
			unit: t.ten
		},
		{
			digit: o,
			unit: ""
		}
	], c = "", l = !1, u = !1;
	for (let { digit: e, unit: r } of s) {
		if (e === 0) {
			l && (u = !0);
			continue;
		}
		u &&= (t.insertZero && (c += t.digits[0]), !1), n && e === 1 && r ? c += r : c += t.digits[e] + r, l = !0;
	}
	return c;
}
function fn(e, t) {
	if (e >= 1e8) {
		let n = Math.floor(e / 1e8), r = e % 1e8, i = fn(n, t) + "億";
		return r === 0 ? i : i + (t.insertZero && r < 1e7 ? t.digits[0] : "") + fn(r, t);
	}
	let n = Math.floor(e / 1e4), r = e % 1e4, i = "";
	return n > 0 && (i += dn(n, t, t.elideOne) + t.myriad), r > 0 && (t.insertZero && n > 0 && r < 1e3 && (i += t.digits[0]), i += dn(r, t, t.elideOne)), i;
}
var pn = [
	"",
	"하나",
	"둘",
	"셋",
	"넷",
	"다섯",
	"여섯",
	"일곱",
	"여덟",
	"아홉"
], mn = [
	"",
	"열",
	"스물",
	"서른",
	"마흔",
	"쉰",
	"예순",
	"일흔",
	"여든",
	"아흔"
];
function hn(e) {
	if (e >= 100) return String(e);
	let t = Math.floor(e / 10), n = e % 10;
	return mn[t] + pn[n];
}
//#endregion
//#region packages/core/src/text/field-format-switch.ts
var gn = {
	Arabic: "decimal",
	ArabicDash: "numberInDash",
	Hex: "hex",
	Roman: "upperRoman",
	roman: "lowerRoman",
	ALPHABETIC: "upperLetter",
	alphabetic: "lowerLetter",
	ARABICABJAD: "arabicAbjad",
	ARABICALPHA: "arabicAlpha",
	HEBREW1: "hebrew1",
	HEBREW2: "hebrew2",
	HINDIARABIC: "hindiNumbers",
	HINDILETTER1: "hindiVowels",
	HINDILETTER2: "hindiConsonants",
	THAIARABIC: "thaiNumbers",
	THAILETTER: "thaiLetters",
	CHOSUNG: "chosung",
	GANADA: "ganada",
	DBCHAR: "decimalFullWidth",
	SBCHAR: "decimalHalfWidth"
};
function _n(e) {
	let t = /\\\*\s+(\S+)/g, n;
	for (; (n = t.exec(e)) !== null;) {
		let e = gn[n[1]];
		if (e) return e;
	}
	return null;
}
//#endregion
//#region packages/core/src/text/date-time-picture.ts
var vn = [
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
], yn = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
], bn = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
], xn = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
], Sn = (e) => e < 10 ? `0${e}` : `${e}`;
function Cn(e) {
	let t = /\\@\s*"([^"]*)"/.exec(e);
	if (t) return t[1];
	let n = /\\@\s*(\S+)/.exec(e);
	return n ? n[1] : null;
}
function wn(e, t) {
	let n = t.getFullYear(), r = t.getMonth(), i = t.getDate(), a = t.getDay(), o = t.getHours(), s = o % 12 == 0 ? 12 : o % 12, c = t.getMinutes(), l = t.getSeconds(), u = o >= 12, d = "", f = 0, p = e.length;
	for (; f < p;) {
		let t = e[f];
		if (t === "'") {
			f++;
			let t = "";
			for (; f < p;) {
				if (e[f] === "'") {
					if (e[f + 1] === "'") {
						t += "'", f += 2;
						continue;
					}
					f++;
					break;
				}
				t += e[f++];
			}
			d += t;
			continue;
		}
		if (/[A-Za-z]/.test(t)) {
			let u = f;
			for (; u < p && e[u] === t;) u++;
			let m = e.slice(f, u).length, h = t.toLowerCase(), g = null;
			if (t === "y" || t === "Y" ? g = m >= 4 ? String(n).padStart(4, "0") : Sn(n % 100) : t === "M" ? g = m >= 4 ? vn[r] : m === 3 ? yn[r] : m === 2 ? Sn(r + 1) : String(r + 1) : h === "d" ? g = m >= 4 ? bn[a] : m === 3 ? xn[a] : m === 2 ? Sn(i) : String(i) : t === "H" ? g = m >= 2 ? Sn(o) : String(o) : t === "h" ? g = m >= 2 ? Sn(s) : String(s) : t === "m" ? g = m >= 2 ? Sn(c) : String(c) : t === "s" ? g = m >= 2 ? Sn(l) : String(l) : (h === "a" || h === "p") && (g = null), g !== null) {
				d += g, f = u;
				continue;
			}
			if (!(h === "a" || h === "p")) return null;
		}
		let m = /^([AaPp])([Mm])?\/([AaPp])([Mm])?/.exec(e.slice(f));
		if (m) {
			let e = m[2] !== void 0;
			d += e ? u ? "PM" : "AM" : u ? "P" : "A", f += m[0].length;
			continue;
		}
		d += t, f++;
	}
	return d;
}
//#endregion
//#region packages/core/src/fonts/resource-metrics.ts
function Tn(e) {
	return e.trim().toLowerCase();
}
//#endregion
//#region packages/docx/src/layout/validation-policy.ts
function En() {
	let e = globalThis.process?.env;
	return e ? e.VITEST !== void 0 || e.NODE_ENV === "test" : !1;
}
var Dn = En();
function On() {
	return Dn;
}
//#endregion
//#region packages/docx/src/layout/plain-data.ts
var kn = class extends TypeError {}, An = /* @__PURE__ */ new WeakSet(), jn = /* @__PURE__ */ new WeakSet();
function Mn(e, t, n = /* @__PURE__ */ new WeakSet(), r = /* @__PURE__ */ new WeakSet()) {
	if (e == null || typeof e == "string" || typeof e == "boolean") return;
	if (typeof e == "number") {
		if (!Number.isFinite(e)) throw TypeError(`${t} must contain finite numbers`);
		return;
	}
	if (typeof e != "object" || n.has(e)) throw TypeError(`${t} must be structured-clone-safe plain data`);
	if (r.has(e) || An.has(e)) return;
	let i = Object.getPrototypeOf(e);
	if (!Array.isArray(e) && i !== Object.prototype && i !== null) throw TypeError(`${t} must be structured-clone-safe plain data`);
	if (Object.getOwnPropertySymbols(e).length !== 0) throw TypeError(`${t} must contain only enumerable string data properties`);
	n.add(e);
	try {
		for (let i of Object.getOwnPropertyNames(e)) {
			if (Array.isArray(e) && i === "length") continue;
			if (Array.isArray(e) && String(Number(i)) !== i) throw TypeError(`${t}.${i} must be an array index`);
			let a = Object.getOwnPropertyDescriptor(e, i);
			if (!a || !a.enumerable || !("value" in a)) throw TypeError(`${t}.${i} must be an enumerable data property`);
			Mn(a.value, `${t}.${i}`, n, r);
		}
	} finally {
		n.delete(e);
	}
	r.add(e);
}
function Nn(e, t = /* @__PURE__ */ new WeakSet()) {
	if (typeof e != "object" || !e || t.has(e)) {
		if (typeof e == "number" && !Number.isFinite(e)) throw new kn("must contain finite numbers");
		return e;
	}
	if (An.has(e) || jn.has(e)) return e;
	if (t.add(e), Array.isArray(e)) {
		for (let n = 0; n < e.length; n += 1) Nn(e[n], t);
		for (let n in e) String(Number(n)) !== n && Object.prototype.hasOwnProperty.call(e, n) && Nn(e[n], t);
	} else for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && Nn(e[n], t);
	return Object.freeze(e), jn.add(e), e;
}
function Pn(e, t) {
	if (typeof e != "object" || !e) {
		if (typeof e == "function" || typeof e == "symbol") throw TypeError("value must be structured-clone-safe plain data");
		if (typeof e == "number" && !Number.isFinite(e)) throw new kn("must contain finite numbers");
		return e;
	}
	if (Object.isFrozen(e) && An.has(e)) return e;
	let n = t.get(e);
	if (n !== void 0) return n;
	if (Array.isArray(e)) {
		let n = Array(e.length);
		t.set(e, n);
		for (let r = 0; r < e.length; r += 1) Object.prototype.hasOwnProperty.call(e, r) && (n[r] = Pn(e[r], t));
		return Object.freeze(n), n;
	}
	let r = Object.getPrototypeOf(e);
	if (r !== Object.prototype && r !== null) throw TypeError("value must be structured-clone-safe plain data");
	let i = {};
	t.set(e, i);
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n)) {
		let r = Pn(e[n], t);
		n === "__proto__" ? Object.defineProperty(i, n, {
			value: r,
			enumerable: !0,
			writable: !0,
			configurable: !0
		}) : i[n] = r;
	}
	return Object.freeze(i), i;
}
function V(e, t) {
	if (typeof e == "object" && e && An.has(e)) return e;
	On() && In(e, t);
	try {
		let t = Pn(e, /* @__PURE__ */ new Map());
		return typeof t == "object" && t && An.add(t), t;
	} catch (e) {
		let n = e instanceof kn ? e.message : "must be structured-clone-safe plain data";
		throw TypeError(`${t} ${n}`);
	}
}
function Fn(e, t) {
	return On() && In(e, t), Ln(e, /* @__PURE__ */ new WeakSet());
}
function In(e, t) {
	try {
		structuredClone(e);
	} catch {
		throw TypeError(`${t} must be structured-clone-safe plain data`);
	}
	Mn(e, t);
}
function Ln(e, t) {
	if (typeof e != "object" || !e || t.has(e)) {
		if (typeof e == "number" && !Number.isFinite(e)) throw new kn("must contain finite numbers");
		return e;
	}
	if (An.has(e)) return e;
	if (t.add(e), Array.isArray(e)) {
		for (let n = 0; n < e.length; n += 1) Ln(e[n], t);
		for (let n in e) String(Number(n)) !== n && Object.prototype.hasOwnProperty.call(e, n) && Ln(e[n], t);
	} else for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && Ln(e[n], t);
	return Object.freeze(e), An.add(e), e;
}
//#endregion
//#region packages/docx/src/layout/paint-resources.ts
function Rn(e, t) {
	if (typeof e != "string" || e.trim().length === 0) throw TypeError(`${t} must be a non-empty string`);
}
function zn(e, t) {
	if (!Number.isFinite(e) || e < 0) throw TypeError(`${t} must be finite and non-negative`);
}
function Bn(e, t) {
	if (!Number.isFinite(e)) throw TypeError(`${t} must be finite`);
}
function Vn(e, t) {
	if (!Number.isFinite(e) || e < 0 || e > 1) throw TypeError(`${t} must be between 0 and 1`);
}
function Hn(e, t) {
	zn(e.widthPt, `${t}.widthPt`), zn(e.heightPt, `${t}.heightPt`);
}
function Un(e) {
	switch (Rn(e.resourceKey, "resourceKey"), e.kind) {
		case "image":
		case "picture-bullet":
			if (e.documentOrder !== void 0 && (!Number.isSafeInteger(e.documentOrder) || e.documentOrder < 0)) throw TypeError("documentOrder must be a non-negative safe integer");
			if (Rn(e.partPath, "partPath"), Rn(e.mimeType, "mimeType"), e.svgImagePath !== void 0 && Rn(e.svgImagePath, "svgImagePath"), Hn(e.intrinsicSize, "intrinsicSize"), e.alpha !== void 0 && Vn(e.alpha, "alpha"), e.rotation !== void 0 && !Number.isFinite(e.rotation)) throw TypeError("rotation must be finite");
			e.srcRect !== void 0 && (Bn(e.srcRect.l, "srcRect.l"), Bn(e.srcRect.t, "srcRect.t"), Bn(e.srcRect.r, "srcRect.r"), Bn(e.srcRect.b, "srcRect.b"));
			break;
		case "chart":
			Hn(e.intrinsicSize, "intrinsicSize");
			break;
		case "math": break;
		default: throw TypeError(`Unknown paint resource kind: ${String(e)}`);
	}
}
function Wn(e) {
	return Un(e), V(e, `paint resource ${e.resourceKey}`);
}
function Gn(e, t, n) {
	return /* @__PURE__ */ Error(`Paint resource kind mismatch for ${e}: expected ${t}, got ${n}`);
}
function Kn(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		if (t.has(n.resourceKey)) throw Error(`Duplicate paint resource key: ${n.resourceKey}`);
		t.add(n.resourceKey);
	}
	let n = e.map(Wn).sort((e, t) => e.resourceKey.localeCompare(t.resourceKey));
	return qn(Object.freeze(n));
}
function qn(e) {
	if (!Object.isFrozen(e)) throw TypeError("Owned paint descriptors must be sealed");
	let t = null;
	for (let n of e) {
		if (Un(n), !Object.isFrozen(n)) throw TypeError(`Owned paint descriptor must be sealed: ${n.resourceKey}`);
		if (t !== null && n.resourceKey.localeCompare(t) <= 0) throw Error(`Owned paint descriptors must have unique sorted keys: ${n.resourceKey}`);
		t = n.resourceKey;
	}
	let n = e, r = new Map(n.map((e) => [e.resourceKey, e])), i = Object.freeze(n.map((e) => e.resourceKey));
	return Object.freeze({
		keys: i,
		descriptors: n,
		resolve(e, t) {
			let n = r.get(e);
			if (!n) throw Error(`Unknown paint resource: ${e}`);
			if (n.kind !== t) throw Gn(e, t, n.kind);
			return n;
		}
	});
}
//#endregion
//#region packages/docx/src/layout/production-paint-resources.ts
function Jn(e) {
	return rt(e);
}
function Yn(e, t, n, r = {}) {
	return {
		kind: e,
		resourceKey: t,
		partPath: n,
		...r.svgImagePath === void 0 ? {} : { svgImagePath: r.svgImagePath },
		...r.srcRect == null ? {} : { srcRect: { ...r.srcRect } },
		...r.rotation === void 0 ? {} : { rotation: r.rotation },
		...r.flipH === void 0 ? {} : { flipH: r.flipH },
		...r.flipV === void 0 ? {} : { flipV: r.flipV },
		...r.alpha === void 0 ? {} : { alpha: r.alpha },
		...r.colorReplaceFrom === void 0 ? {} : { colorReplaceFrom: r.colorReplaceFrom },
		...r.duotone === void 0 ? {} : { duotone: { ...r.duotone } }
	};
}
function Xn(e, t, n, r) {
	let i = [], a = [], o = [], s = (e, t, n, r, o, s, c = {}) => {
		let l = tt(t, n);
		i.push(Yn(e, l, n, c)), a.push({
			resourceKey: l,
			mimeType: r,
			widthPt: o,
			heightPt: s
		});
	}, c = (e, t) => {
		if (e.type === "image") {
			s("image", t, e.imagePath, e.mimeType, e.widthPt, e.heightPt, e);
			return;
		}
		if (e.type === "chart") {
			o.push({
				kind: "chart",
				resourceKey: Jn(t),
				intrinsicSize: {
					widthPt: e.widthPt,
					heightPt: e.heightPt
				},
				model: e.chart
			});
			return;
		}
		if (e.type !== "shape") return;
		let n = e;
		n.fill?.fillType === "image" && s("image", t, n.fill.imagePath, n.fill.mimeType, n.widthPt, n.heightPt, {
			...n.fill.svgImagePath === void 0 ? {} : { svgImagePath: n.fill.svgImagePath },
			...n.fill.srcRect === void 0 ? {} : { srcRect: { ...n.fill.srcRect } },
			...n.fill.alpha === void 0 ? {} : { alpha: n.fill.alpha },
			...n.fill.duotone === void 0 ? {} : { duotone: n.fill.duotone }
		});
		let r = `${t.story}:${t.storyInstance}:${t.path.join(".")}`;
		if (n.textBoxContent !== void 0) {
			f(n.textBoxContent, "textbox", r);
			return;
		}
		n.textBlocks?.forEach((e, t) => {
			if (e.imagePath) {
				if (!e.mimeType || e.imageWidthPt == null || e.imageHeightPt == null) throw Error("Text-box compatibility image requires complete metadata");
				s("image", {
					story: "textbox",
					storyInstance: r,
					path: [t, 0]
				}, e.imagePath, e.mimeType, e.imageWidthPt, e.imageHeightPt, { svgImagePath: e.svgImagePath });
			}
		});
	}, l = (e, t, n, r) => {
		e.rows.forEach((e, i) => e.cells.forEach((e, a) => {
			f(e.content, t, n, [
				...r,
				i,
				a
			]);
		}));
	}, u = (e, t, n) => {
		if (e) for (let r of [
			"default",
			"first",
			"even"
		]) {
			let i = e[r];
			i && f(i.body, t, n ? `${n}:${r}` : r);
		}
	}, d = (e, n) => {
		let i = e.numbering;
		if (i?.picBulletImagePath) {
			let t = r?.(e), a = i.picBulletWidthPt ?? t?.widthPt, o = i.picBulletHeightPt ?? t?.heightPt;
			if (!i.picBulletMimeType || a == null || o == null) throw Error("Picture bullet requires complete metadata");
			s("picture-bullet", n, i.picBulletImagePath, i.picBulletMimeType, a, o);
		}
		let a = t?.paragraphAcquisitionInput(e, n).runs ?? e.runs, o = 0;
		a.forEach((t, r) => {
			if (t.type === "unavailableDrawing") return;
			let i = e.runs[o++];
			i && (i.type === "image" || i.type === "chart" || i.type === "shape") && c(i, {
				...n,
				path: [...n.path, r]
			});
		});
	}, f = (e, t, n, r = []) => {
		e.forEach((e, i) => {
			let a = [...r, i];
			e.type === "paragraph" ? d(e, {
				story: t,
				storyInstance: n,
				path: a
			}) : e.type === "table" ? l(e, t, n, a) : e.type === "sectionBreak" && (u(e.headers, "header", `section:${i}`), u(e.footers, "footer", `section:${i}`));
		});
	};
	f(e.body, "body", "body"), u(e.headers, "header"), u(e.footers, "footer");
	for (let t of e.footnotes ?? []) f(t.content, "footnote", t.id);
	for (let t of e.endnotes ?? []) f(t.content, "endnote", t.id);
	let p = new Map(a.map((e) => [e.resourceKey, e]));
	if (p.size !== a.length) throw Error("Duplicate image resource key");
	for (let [e, t] of i.entries()) {
		let n = p.get(t.resourceKey);
		if (!n) throw Error(`Missing layout image metadata: ${t.resourceKey}`);
		o.push({
			...t,
			documentOrder: e,
			mimeType: n.mimeType,
			intrinsicSize: {
				widthPt: n.widthPt,
				heightPt: n.heightPt
			}
		});
	}
	for (let e of n) o.push({
		kind: "math",
		resourceKey: e.resourceKey
	});
	return {
		imageMetadata: a,
		descriptors: o
	};
}
function Zn(e, t, n, r) {
	let i = Xn(e, t, n, r);
	return Object.freeze({
		imageMetadata: Object.freeze(i.imageMetadata.map((e) => Object.freeze({ ...e }))),
		paintResources: Kn(i.descriptors)
	});
}
//#endregion
//#region packages/docx/src/layout/resources.ts
function Qn(e, t = "body", n = "body") {
	let r = [], i = (e, a = []) => {
		e.forEach((e, o) => {
			let s = [...a, o];
			e.type === "paragraph" ? e.runs.forEach((e, i) => {
				e.type === "math" && r.push({
					nodes: e.nodes,
					display: e.display,
					source: {
						story: t,
						storyInstance: n,
						path: [...s, i]
					},
					resourceKey: at({
						story: t,
						storyInstance: n,
						path: [...s, i]
					}, e.display ? "display" : "inline")
				});
			}) : e.type === "table" && e.rows.forEach((e, t) => e.cells.forEach((e, n) => {
				i(e.content, [
					...s,
					t,
					n
				]);
			}));
		});
	};
	return i(e), r;
}
function $n(e, t) {
	if (!Number.isFinite(e) || e < 0) throw RangeError(`${t} must be finite and non-negative`);
	return e;
}
function er(e) {
	let t = [...e].map((e) => Object.freeze({
		resourceKey: e.resourceKey,
		widthPt: $n(e.widthPt, "widthPt"),
		heightPt: $n(e.heightPt, "heightPt"),
		mimeType: e.mimeType
	})).sort((e, t) => e.resourceKey.localeCompare(t.resourceKey)), n = new Map(t.map(({ resourceKey: e, ...t }) => [e, Object.freeze(t)]));
	if (n.size !== t.length) throw Error("Duplicate image resource key");
	return Object.freeze({
		fingerprint: nt("images", t),
		resolve(e) {
			let t = n.get(e);
			if (!t) throw Error(`Unknown image resource: ${e}`);
			return t;
		}
	});
}
function tr(e) {
	let t = [...e].map((e) => Object.freeze({
		resourceKey: e.resourceKey,
		widthEm: $n(e.widthEm, "widthEm"),
		ascentEm: $n(e.ascentEm, "ascentEm"),
		descentEm: $n(e.descentEm, "descentEm"),
		diagnostics: Object.freeze(e.diagnostics.map((e) => Object.freeze({ ...e }))),
		...e.available === !1 ? { available: !1 } : {}
	})).sort((e, t) => e.resourceKey.localeCompare(t.resourceKey)), n = new Map(t.map((e) => [e.resourceKey, e]));
	if (n.size !== t.length) throw Error("Duplicate math resource key");
	return Object.freeze({
		fingerprint: nt("math", t),
		resolve(e) {
			let t = n.get(e);
			if (!t) throw Error(`Unknown math resource: ${e}`);
			return t;
		}
	});
}
//#endregion
//#region packages/docx/src/layout/diagnostics.ts
var nr = Object.freeze({
	UNSUPPORTED_TEXT_EFFECT: Object.freeze({
		severity: "warning",
		layoutCode: "UNSUPPORTED_FEATURE",
		message: "WordprocessingML text effects are not rendered"
	}),
	INVALID_TEXT_EFFECT_VALUE: Object.freeze({
		severity: "warning",
		layoutCode: "INVALID_VALUE",
		message: "An invalid WordprocessingML text-effect value was ignored"
	}),
	MISSING_DRAWING_EXTENT: Object.freeze({
		severity: "error",
		layoutCode: "INVALID_GEOMETRY",
		message: "A drawing with a missing required extent was omitted"
	}),
	INVALID_DRAWING_EXTENT: Object.freeze({
		severity: "error",
		layoutCode: "INVALID_GEOMETRY",
		message: "A drawing with an invalid extent was omitted"
	}),
	DEGENERATE_DRAWING_EXTENT: Object.freeze({
		severity: "warning",
		layoutCode: "INVALID_GEOMETRY",
		message: "A drawing has a schema-valid zero-area extent"
	})
}), rr = Object.freeze({
	code: "INVALID_VALUE",
	severity: "warning",
	message: "The parser diagnostic contract did not match this renderer build"
});
function ir(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ar(e, t) {
	if (!Array.isArray(e) || !e.every((e) => Number.isSafeInteger(e) && e >= 0)) return !1;
	let [n] = e;
	return n === void 0 || n < t;
}
function or(e) {
	return Object.freeze({
		story: "body",
		storyInstance: "body",
		path: Object.freeze([...e])
	});
}
function sr(e, t) {
	if (e === void 0) return Object.freeze([]);
	if (!Array.isArray(e)) return Object.freeze([rr]);
	let n = [], r = !1;
	for (let i of e) {
		if (!ir(i) || typeof i.code != "string" || !Object.hasOwn(nr, i.code) || i.part !== "word/document.xml" || !ar(i.path, t)) {
			r = !0;
			continue;
		}
		let e = nr[i.code];
		if (i.severity !== e.severity) {
			r = !0;
			continue;
		}
		n.push(Object.freeze({
			code: e.layoutCode,
			severity: e.severity,
			source: or(i.path),
			message: e.message
		}));
	}
	return r && n.push(rr), Object.freeze(n);
}
var H = class extends Error {
	code;
	constructor(e, t) {
		super(`${e}: ${t}`), this.name = "LayoutInvariantError", this.code = e;
	}
}, cr = Symbol("document-layout-runtime");
function lr(e, t) {
	Object.defineProperty(e, cr, {
		configurable: !1,
		enumerable: !1,
		writable: !1,
		value: {
			services: null,
			defaultCurrentDateMs: t,
			activeLayoutOptions: null
		}
	});
}
function ur(e) {
	let t = e[cr];
	if (t) return t;
	throw Error("Document layout runtime is not initialized; attach it explicitly");
}
function dr(e) {
	let t = new Map(e), n = Object.freeze([...t.keys()].sort());
	return Object.freeze({
		keys: n,
		resolve(e) {
			let n = t.get(e);
			if (n === void 0) throw Error(`Unknown runtime resource: ${e}`);
			return n;
		}
	});
}
var fr = /* @__PURE__ */ new WeakMap(), pr = /* @__PURE__ */ new WeakMap(), mr = /* @__PURE__ */ new WeakMap(), hr = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakMap(), _r = /* @__PURE__ */ new WeakMap(), vr = 25e3, yr = /* @__PURE__ */ new WeakMap();
function br() {
	let e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), n = 1, r = 0;
	return Object.freeze({
		objectIdentity(t) {
			let r = e.get(t);
			return r === void 0 && (r = n, n += 1, e.set(t, r)), r;
		},
		get(e, n) {
			let r = t.get(e);
			if (!r?.has(n)) return;
			let i = r.get(n);
			return r.delete(n), r.set(n, i), i;
		},
		set(e, n, r) {
			let i = t.get(e);
			for (i || (i = /* @__PURE__ */ new Map(), t.set(e, i)), i.set(n, r); i.size > 2;) i.delete(i.keys().next().value);
		},
		noteMiss() {
			if (r += 1, r > 25e3) throw new H("NON_CONVERGENCE", `paragraph acquisition exceeded the operational miss budget ${vr}`);
		}
	});
}
function xr(e, t) {
	let n = [
		e.text,
		e.images,
		e.math
	], r = new Set(n.flatMap((e) => {
		let t = pr.get(e);
		return t ? [t] : [];
	}));
	if (r.size > 1) throw Error("Layout services combine foreign runtime owners");
	let i = r.values().next().value, a = n.filter((e) => !pr.has(e));
	if (i && a.length > 1) throw Error("Layout services are missing service lineage for multiple components");
	if (!i && !t) return;
	let o = i ?? {};
	for (let e of n) {
		let t = pr.get(e);
		if (t && t !== o) throw Error("Layout services combine foreign runtime owners");
		pr.set(e, o);
	}
	return o;
}
function Sr(e, t) {
	let n = xr(e, !0);
	if (mr.has(n)) throw Error("Body layout kernel is already attached");
	mr.set(n, t);
}
function Cr(e) {
	let t = xr(e, !1);
	return t ? mr.get(t) : void 0;
}
function wr(e, t) {
	let n = xr(e, !0);
	if (hr.has(n)) throw Error("Layout source store is already attached");
	hr.set(n, t);
}
function Tr(e) {
	let t = xr(e, !1);
	return t ? hr.get(t) : void 0;
}
function Er(e, t) {
	let n = xr(e, !0);
	if (gr.has(n)) throw Error("Vertical glyph measurement service is already attached");
	gr.set(n, t);
}
function Dr(e) {
	let t = xr(e, !1), n = t ? gr.get(t) : void 0;
	if (!n) throw Error("Vertical glyph measurement service is not attached");
	return n;
}
function Or(e, t) {
	if (_r.has(e)) throw Error("Layout variant store is already attached");
	_r.set(e, t);
}
function kr(e) {
	return _r.get(e);
}
function Ar(e, t, n = t.keys()) {
	if (fr.has(e)) throw Error("Private resource lookup is already attached");
	let r = new Set(t.keys()), i = new Set(n), a = [...i].filter((e) => !r.has(e)).sort(), o = [...r].filter((e) => !i.has(e)).sort();
	if (a.length > 0 || o.length > 0) throw Error(`Runtime resource membership mismatch: missing [${a.join(", ")}]; extra [${o.join(", ")}]`);
	fr.set(e, dr(t));
}
function jr(e) {
	return fr.get(e);
}
var Mr = /* @__PURE__ */ new WeakMap(), Nr = /* @__PURE__ */ new WeakMap();
function Pr(e, t = {}) {
	let n = Object.freeze({
		...e,
		...t
	}), r = Cr(e);
	if (!r) throw Error("Body layout kernel is not attached to the supplied services");
	if (Cr(n) !== r) throw Error("Layout service view did not retain its body layout kernel owner");
	let i = fr.get(e);
	i && fr.set(n, i);
	let a = Mr.get(e);
	a && Mr.set(n, a);
	let o = yr.get(e);
	return o && yr.set(n, o), n;
}
function Fr(e) {
	let t = Pr(e);
	return yr.set(t, br()), t;
}
function Ir(e) {
	return yr.get(e);
}
function Lr(e, t) {
	if (!Number.isInteger(t.totalPages) || t.totalPages < 1) throw RangeError("Field acquisition totalPages must be a positive integer");
	let n = Pr(e);
	return Nr.set(n, Object.freeze({ ...t })), n;
}
function Rr(e) {
	return Nr.get(e) ?? Object.freeze({ totalPages: 1 });
}
function zr(e, t) {
	if (Mr.has(e)) throw Error("Paint resource registry is already attached");
	Mr.set(e, t);
}
function Br(e) {
	let t = Mr.get(e);
	if (!t) throw Error("Paint resource registry is not attached");
	return t;
}
//#endregion
//#region packages/docx/src/layout/page-layers.ts
var Vr = [
	"background",
	"behindText",
	"header",
	"body",
	"notes",
	"front",
	"footer"
], Hr = Object.freeze({
	a: 1,
	b: 0,
	c: 0,
	d: 1,
	e: 0,
	f: 0
});
function Ur(e) {
	return Object.freeze({
		kind: "clip",
		clip: e
	});
}
function Wr(e, t) {
	return Object.freeze({
		kind: "transform",
		transform: Object.freeze({
			...Hr,
			e,
			f: t
		})
	});
}
function Gr(e, t) {
	if (!t.textBoxIds?.length) return Object.freeze([]);
	let n = new Map(e.textBoxes.map((e) => [e.id, e]));
	return Object.freeze(t.textBoxIds.flatMap((e) => {
		let t = n.get(e);
		return t ? [t] : [];
	}));
}
function Kr(e, t, n, r, i) {
	if (e.kind === "drawing") {
		if (!e.anchorLayer) return;
		i.push(Object.freeze({
			drawing: e,
			textBoxes: Object.freeze([]),
			frames: Object.freeze([...n]),
			layoutTranslationPt: Object.freeze({ ...r }),
			encounterOrder: i.length,
			root: t
		}));
		return;
	}
	if (e.kind !== "textbox") {
		if (e.kind === "note") {
			let a = e.story.clipBounds ? Object.freeze([...n, Ur(e.story.clipBounds)]) : n;
			for (let n of e.story.blocks) Kr(n, t, a, r, i);
			return;
		}
		if (e.kind === "paragraph") {
			let a = e.clipBounds ? Object.freeze([...n, Ur(e.clipBounds)]) : n;
			for (let n of e.drawings) n.anchorLayer && i.push(Object.freeze({
				drawing: n,
				owner: e,
				textBoxes: Gr(e, n),
				frames: Object.freeze([...a]),
				layoutTranslationPt: Object.freeze({ ...r }),
				encounterOrder: i.length,
				root: t
			}));
			return;
		}
		Yr(e, t, n, r, i);
	}
}
function qr(e, t, n, r, i, a) {
	let o = t.xPt - e.flowBounds.xPt, s = t.yPt - e.flowBounds.yPt;
	Kr(e, n, Object.freeze([...r, Wr(o, s)]), Object.freeze({
		xPt: i.xPt + o,
		yPt: i.yPt + s
	}), a);
}
function Jr(e, t, n, r, i) {
	qr(e.child, {
		xPt: e.xPt - r.xPt,
		yPt: e.yPt - r.yPt
	}, t, n, r, i);
}
function Yr(e, t, n, r, i) {
	let a = e.clipBounds ? Object.freeze([...n, Ur(e.clipBounds)]) : n;
	for (let n of e.rows) for (let e of n.cells) {
		let n = "visualMergeOwnership" in e && e.visualMergeOwnership === "continuation";
		if (e.verticalMerge === "continue" && !n) continue;
		let o = e.clipBounds ? Object.freeze([...a, Ur(e.clipBounds)]) : a;
		for (let n of e.blocks) qr(n.layout, {
			xPt: e.contentBounds.xPt + (n.layout.kind === "table" ? n.layout.flowBounds.xPt : 0),
			yPt: e.flowBounds.yPt + n.offsetPt + (n.layout.kind === "table" ? n.layout.flowBounds.yPt : 0)
		}, t, o, r, i);
	}
	for (let n of e.resolvedFloatingTables ?? []) Jr(n, t, a, r, i);
}
function Xr(e) {
	let t = e.drawing.anchorLayer;
	return Object.freeze({
		kind: "drawing",
		layer: t.behindDoc ? "behindText" : "front",
		sourceLayer: e.root.layer,
		rootNodeId: e.root.node.id,
		coordinateSpace: e.root.coordinateSpace,
		flowDomainId: e.root.node.flowDomainId,
		node: e.drawing,
		...e.owner ? { ownerNodeId: e.owner.id } : {},
		textBoxes: e.textBoxes,
		frames: e.frames,
		layoutTranslationPt: e.layoutTranslationPt
	});
}
function Zr(e, t) {
	return Object.freeze({
		kind: "node",
		layer: e.layer,
		sourceLayer: e.layer,
		rootNodeId: e.node.id,
		coordinateSpace: e.coordinateSpace,
		flowDomainId: e.node.flowDomainId,
		node: e.node,
		omitAnchoredDrawings: t
	});
}
function Qr(e, t) {
	return e.drawing.anchorLayer.relativeHeight - t.drawing.anchorLayer.relativeHeight || e.drawing.anchorLayer.sourceOrder - t.drawing.anchorLayer.sourceOrder || e.encounterOrder - t.encounterOrder;
}
function $r(e) {
	let t = [];
	for (let n of e) Kr(n.node, n, Object.freeze([]), Object.freeze({
		xPt: 0,
		yPt: 0
	}), t);
	let n = t.filter(({ drawing: e }) => e.anchorLayer.behindDoc).sort(Qr).map(Xr), r = t.filter(({ drawing: e }) => !e.anchorLayer.behindDoc).sort(Qr).map(Xr), i = new Set(t.map(({ root: e }) => e.node)), a = e.flatMap((e) => e.node.kind === "drawing" && e.node.anchorLayer ? [] : [Zr(e, i.has(e.node))]);
	return Object.freeze([
		...n,
		...a,
		...r
	]);
}
function ei(e, t) {
	return t.has(e) || (t.add(e), e.kind === "drawing") ? !1 : e.kind === "paragraph" ? e.lines.some((e) => e.placements.some((e) => e.kind === "text" && e.paintOps?.some((e) => e.verticalFeature === !0) === !0)) || e.textBoxes.some((e) => ei(e, t)) : e.kind === "textbox" || e.kind === "note" ? e.story.blocks.some((e) => ei(e, t)) : e.rows.some((e) => e.cells.some((e) => e.blocks.some((e) => ei(e.layout, t)))) || (e.resolvedFloatingTables ?? []).some((e) => ei(e.child, t));
}
function ti(e, t, n) {
	if (!n.has(e)) {
		if (n.add(e), e.kind === "drawing") {
			for (let n of e.commands) (n.kind === "resource" || n.kind === "drawingml-image-fill") && t.add(n.resourceKey);
			return;
		}
		if (e.kind === "paragraph") {
			for (let n of e.resources) t.add(n.resourceKey);
			for (let r of e.drawings) ti(r, t, n);
			for (let r of e.textBoxes) ti(r, t, n);
			return;
		}
		if (e.kind === "textbox" || e.kind === "note") {
			for (let r of e.story.blocks) ti(r, t, n);
			return;
		}
		for (let r of e.rows) for (let e of r.cells) for (let r of e.blocks) ti(r.layout, t, n);
		for (let r of e.resolvedFloatingTables ?? []) ti(r.child, t, n);
	}
}
function ni(e) {
	let t = Object.freeze(e.map(({ layer: e, node: t, coordinateSpace: n }) => Object.freeze({
		layer: e,
		node: t,
		coordinateSpace: n ?? "section-logical"
	}))), n = new Map(Vr.map((e) => [e, []]));
	for (let e of t) n.get(e.layer).push(e.node);
	let r = [];
	for (let e = 0; e < t.length;) {
		let n = t[e].layer, i = e + 1;
		for (; t[i]?.layer === n;) i += 1;
		let a = t.slice(e, i);
		n === "header" || n === "body" || n === "notes" || n === "footer" ? r.push(...$r(a)) : r.push(...a.map((e) => Zr(e, !1))), e = i;
	}
	let i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
	for (let { node: e } of t) ti(e, a, o);
	return Object.freeze({
		roots: t,
		paintOrder: Object.freeze(r),
		capabilities: Object.freeze({
			requiresElementBackedVerticalGlyphPaint: t.some(({ node: e }) => ei(e, i)),
			resourceKeys: Object.freeze([...a])
		}),
		background: Object.freeze(n.get("background")),
		behindText: Object.freeze(n.get("behindText")),
		header: Object.freeze(n.get("header")),
		body: Object.freeze(n.get("body")),
		notes: Object.freeze(n.get("notes")),
		front: Object.freeze(n.get("front")),
		footer: Object.freeze(n.get("footer"))
	});
}
//#endregion
//#region packages/docx/src/layout/page-graph.ts
var ri = class extends Error {
	constructor(e) {
		super(e), this.name = "PageGraphError";
	}
}, ii = ni;
function ai(e, t, n) {
	let r = new Map(n.map((e) => [e.id, e]));
	if (r.size !== n.length || n.length !== e[t].length) throw new ri(`Replacement ${t} layer must preserve unique paint node identities`);
	return ii(e.roots.map((e) => {
		if (e.layer !== t) return e;
		let n = r.get(e.node.id);
		if (!n) throw new ri(`Missing replacement paint node ${e.node.id}`);
		return {
			...e,
			node: n
		};
	}));
}
function oi(e) {
	return e.layers.roots;
}
function si(e) {
	let t = !1, n = !1;
	for (let r of e.layers.roots) if (r.layer === "body") {
		if (n) throw new ri(`Paint sequence must contain one contiguous body paint run; re-entered at ${r.node.id}`);
		t = !0;
	} else t && (n = !0);
	let r = /* @__PURE__ */ new Map();
	for (let t of e.layers.roots) {
		if (r.has(t.node.id)) throw new ri(`Duplicate paint node ${t.node.id}`);
		r.set(t.node.id, t);
	}
	let i = /* @__PURE__ */ new Map();
	for (let t of Vr) for (let n of e.layers[t]) {
		if (i.has(n.id)) throw new ri(`Duplicate semantic page node ${n.id}`);
		i.set(n.id, {
			layer: t,
			node: n
		});
	}
	if (i.size !== r.size) throw new ri("Semantic page layers do not match retained roots");
	for (let [e, t] of r) {
		let n = i.get(e);
		if (!n || n.layer !== t.layer || n.node !== t.node) throw new ri(`Paint root ${e} is not the retained ${t.layer} node`);
	}
	let a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
	for (let t of e.layers.paintOrder) {
		let e = r.get(t.rootNodeId);
		if (!e) throw new ri(`Missing paint root ${t.rootNodeId}`);
		if (e.layer !== t.sourceLayer) throw new ri(`Paint root ${t.rootNodeId} belongs to ${e.layer}, not ${t.sourceLayer}`);
		if (a.add(t.rootNodeId), t.kind === "node") {
			if (t.node !== e.node || t.node.id !== t.rootNodeId) throw new ri(`Paint root ${t.rootNodeId} is not the retained ${t.sourceLayer} node`);
			continue;
		}
		if (!t.node.anchorLayer) throw new ri(`Drawing paint entry ${t.node.id} is not anchored`);
		if (o.has(t.node.id)) throw new ri(`Duplicate drawing paint reference ${t.node.id}`);
		o.add(t.node.id);
	}
	if (a.size !== r.size) throw new ri(`Missing paint-order reference for ${[...r.keys()].find((e) => !a.has(e)) ?? "<unknown>"}`);
	return e.layers.roots.map(({ node: e }) => e);
}
//#endregion
//#region packages/docx/src/layout/error-page.ts
var ci = Object.freeze({
	story: "body",
	storyInstance: "parse-error",
	path: Object.freeze([])
});
function li(e, t, n, r, i) {
	let a = e.trim().split(/\s+/).filter(Boolean), o = [], s = "", c = (e) => r.shape({
		text: e,
		fontSizePt: n,
		fonts: {},
		genericFamily: "sans-serif"
	}).advancePt, l = (e) => {
		let n = [
			0,
			...P(e),
			e.length
		].filter((e, t, n) => t === 0 || e !== n[t - 1]), r = n.length - 1;
		for (; r > 0 && c(`${e.slice(0, n[r])}…`) > t;) --r;
		return `${e.slice(0, n[r] ?? 0)}…`;
	}, u = () => {
		o.length === 0 ? o.push(l("")) : o[o.length - 1] = l(o[o.length - 1]);
	}, d = (e) => {
		let n = [
			0,
			...P(e),
			e.length
		].filter((e, t, n) => t === 0 || e !== n[t - 1]), r = 0;
		for (; r < n.length - 1;) {
			if (o.length >= i) return u(), !0;
			let a = r + 1;
			for (; a < n.length && c(e.slice(n[r], n[a])) <= t;) a += 1;
			let s = Math.max(r + 1, a - 1), d = e.slice(n[r], n[s]);
			if (o.length >= i - 1 && s < n.length - 1) return o.push(l(d)), !0;
			o.push(d), r = s;
		}
		return !1;
	};
	for (let e = 0; e < a.length; e += 1) {
		let n = a[e], r = s ? `${s} ${n}` : n, l = c(r);
		if (s && l > t) {
			if (o.push(s), s = "", o.length >= i) {
				u();
				break;
			}
			if (c(n) > t) {
				if (d(n)) break;
			} else s = n;
		} else if (!s && l > t) {
			if (d(n)) break;
		} else s = r;
		if (e < a.length - 1 && o.length >= i && !s) {
			u();
			break;
		}
	}
	return s && o.length < i && o.push(s), o;
}
function ui(e, t, n) {
	if (!(t.widthPt > 0 && t.heightPt > 0)) throw RangeError("Error page size must be positive");
	let r = Math.max(18, Math.min(t.widthPt, t.heightPt) * .06), i = {
		xPt: r,
		yPt: r,
		widthPt: t.widthPt - r * 2,
		heightPt: t.heightPt - r * 2
	}, a = Math.max(8, Math.min(t.widthPt, t.heightPt) * .02), o = n.resolve({
		fonts: {},
		slot: "ascii",
		genericFamily: "sans-serif"
	}).route, s = li(e, t.widthPt - r * 4, a, n, 4), c = a * 1.4, l = [
		{
			kind: "fill-rect",
			rect: {
				xPt: 0,
				yPt: 0,
				widthPt: t.widthPt,
				heightPt: t.heightPt
			},
			fill: "#ffffff"
		},
		{
			kind: "stroke-rect",
			rect: i,
			stroke: "#c8ccd2",
			lineWidthPt: 1,
			dashPt: [6, 5]
		},
		{
			kind: "text",
			rect: {
				xPt: 0,
				yPt: t.heightPt * .27,
				widthPt: t.widthPt,
				heightPt: 36
			},
			text: "⚠",
			fill: "#b23b3b",
			fontRoute: o,
			fontSizePt: 28,
			fontWeight: 400,
			fontStyle: "normal",
			align: "center",
			baseline: "middle"
		},
		{
			kind: "text",
			rect: {
				xPt: r * 2,
				yPt: t.heightPt * .4,
				widthPt: t.widthPt - r * 4,
				heightPt: 24
			},
			text: "This document could not be displayed",
			fill: "#333333",
			fontRoute: o,
			fontSizePt: 13,
			fontWeight: 600,
			fontStyle: "normal",
			align: "center",
			baseline: "middle"
		},
		...s.map((e, n) => ({
			kind: "text",
			rect: {
				xPt: r * 2,
				yPt: t.heightPt * .5 + c * n,
				widthPt: t.widthPt - r * 4,
				heightPt: c
			},
			text: e,
			fill: "#666666",
			fontRoute: o,
			fontSizePt: a,
			fontWeight: 400,
			fontStyle: "normal",
			align: "center",
			baseline: "middle"
		}))
	], u = {
		kind: "drawing",
		id: "parse-error-page",
		source: ci,
		flowDomainId: "parse-error",
		flowBounds: i,
		inkBounds: i,
		advancePt: i.heightPt,
		ordinaryFlow: !1,
		commands: l
	}, d = {
		geometry: {
			pageWidth: t.widthPt,
			pageHeight: t.heightPt,
			marginTop: r,
			marginRight: r,
			marginBottom: r,
			marginLeft: r,
			headerDistance: 0,
			footerDistance: 0
		},
		columns: [{
			xPt: r,
			wPt: i.widthPt
		}],
		columnSeparator: !1,
		grid: {
			kind: "none",
			linePitchPt: null,
			charSpacePt: null
		},
		textDirection: "lrTb",
		verticalAlignment: "top"
	};
	return {
		pages: [{
			pageIndex: 0,
			geometry: {
				xPt: 0,
				yPt: 0,
				widthPt: t.widthPt,
				heightPt: t.heightPt,
				contentTopPt: r,
				contentBottomPt: t.heightPt - r
			},
			flowDomains: [{
				id: "parse-error",
				kind: "body",
				logicalBounds: i,
				physicalBounds: i
			}],
			section: d,
			sectionOccurrenceId: "parse-error-section",
			pageBorder: null,
			parityBlank: !1,
			bookmarkStarts: [],
			pageNumber: {
				displayNumber: 1,
				format: "decimal",
				sectionOccurrenceId: "parse-error-section"
			},
			columnSeparators: [],
			sectionRegions: [{
				id: "parse-error-region",
				sectionOccurrenceId: "parse-error-section",
				coordinateSpace: {
					writingMode: "horizontal-tb",
					logicalToPhysical: {
						a: 1,
						b: 0,
						c: 0,
						d: 1,
						e: 0,
						f: 0
					},
					physicalToLogical: {
						a: 1,
						b: 0,
						c: 0,
						d: 1,
						e: 0,
						f: 0
					}
				},
				blockStartPt: r,
				blockEndPt: t.heightPt - r,
				columnFlowDirection: "ltr",
				columnIndexes: [0],
				flowDomainIds: ["parse-error"],
				section: d
			}],
			layers: ii([{
				layer: "body",
				node: u
			}]),
			readingOrder: [u.id]
		}],
		diagnostics: [{
			code: "UNSUPPORTED_FEATURE",
			severity: "error",
			source: ci,
			message: e
		}]
	};
}
//#endregion
//#region packages/docx/src/layout/options.ts
function di(e, t, n = !1) {
	let r = e == null ? t : typeof e == "number" ? e : e.getTime();
	if (!Number.isFinite(r)) throw RangeError("currentDate must resolve to finite epoch milliseconds");
	return Object.freeze({
		currentDateMs: r,
		...n === !0 ? { showTrackedChanges: !0 } : {}
	});
}
function fi(e) {
	return di(e.currentDate, e.defaultCurrentDateMs, e.showTrackedChanges);
}
function pi(e, t) {
	return nt("layout", {
		currentDateMs: e.currentDateMs,
		showTrackedChanges: e.showTrackedChanges === !0,
		text: t.text.fingerprint,
		images: t.images.fingerprint,
		math: t.math.fingerprint,
		verticalGlyphs: t.verticalGlyphFingerprint ?? null
	});
}
//#endregion
//#region packages/docx/src/layout/coordinate-space.ts
function mi(e) {
	switch (e) {
		case "tb":
		case "tbV":
		case "lrTb":
		case "lrTbV": return "horizontal-tb";
		case "rl":
		case "rlV":
		case "tbRl":
		case "tbRlV": return "vertical-rl";
		case "btLr": return "vertical-rl";
		case "lr":
		case "lrV":
		case "tbLrV": return "vertical-lr";
		default: throw RangeError(`Unsupported Transitional text direction ${JSON.stringify(e)}`);
	}
}
function hi(e) {
	if (!Number.isFinite(e.widthPt) || !Number.isFinite(e.heightPt) || e.widthPt <= 0 || e.heightPt <= 0) throw RangeError("Physical page extents must be positive and finite");
}
function gi(e) {
	if (!Number.isFinite(e.xPt) || !Number.isFinite(e.yPt)) throw RangeError("Point coordinates must be finite");
}
function _i(e) {
	if (![
		e.a,
		e.b,
		e.c,
		e.d,
		e.e,
		e.f
	].every(Number.isFinite)) throw RangeError("Matrix coefficients must be finite");
}
function vi(e) {
	if (gi(e), !Number.isFinite(e.widthPt) || !Number.isFinite(e.heightPt) || e.widthPt < 0 || e.heightPt < 0) throw RangeError("Rectangle extents must be finite and non-negative");
}
function yi(e, t) {
	switch (hi(e), t) {
		case "horizontal-tb": return {
			widthPt: e.widthPt,
			heightPt: e.heightPt
		};
		case "vertical-rl":
		case "vertical-lr": return {
			widthPt: e.heightPt,
			heightPt: e.widthPt
		};
		default: throw RangeError(`Unsupported writing mode ${String(t)}`);
	}
}
function bi(e, t) {
	switch (hi(e), t) {
		case "horizontal-tb": return {
			widthPt: e.widthPt,
			heightPt: e.heightPt
		};
		case "vertical-rl":
		case "vertical-lr": return {
			widthPt: e.heightPt,
			heightPt: e.widthPt
		};
		default: throw RangeError(`Unsupported writing mode ${String(t)}`);
	}
}
function xi(e, t) {
	switch (hi(t), e) {
		case "horizontal-tb": return {
			a: 1,
			b: 0,
			c: 0,
			d: 1,
			e: 0,
			f: 0
		};
		case "vertical-rl": return {
			a: 0,
			b: 1,
			c: -1,
			d: 0,
			e: t.widthPt,
			f: 0
		};
		case "vertical-lr": return {
			a: 0,
			b: 1,
			c: 1,
			d: 0,
			e: 0,
			f: 0
		};
		default: throw RangeError(`Unsupported writing mode ${String(e)}`);
	}
}
function Si(e, t) {
	switch (hi(t), e) {
		case "horizontal-tb": return {
			a: 1,
			b: 0,
			c: 0,
			d: 1,
			e: 0,
			f: 0
		};
		case "vertical-rl": return {
			a: 0,
			b: -1,
			c: 1,
			d: 0,
			e: 0,
			f: t.widthPt
		};
		case "vertical-lr": return {
			a: 0,
			b: 1,
			c: 1,
			d: 0,
			e: 0,
			f: 0
		};
		default: throw RangeError(`Unsupported writing mode ${String(e)}`);
	}
}
function Ci(e, t) {
	return _i(e), gi(t), {
		xPt: e.a * t.xPt + e.c * t.yPt + e.e,
		yPt: e.b * t.xPt + e.d * t.yPt + e.f
	};
}
function wi(e, t) {
	vi(t);
	let n = [
		Ci(e, t),
		Ci(e, {
			xPt: t.xPt + t.widthPt,
			yPt: t.yPt
		}),
		Ci(e, {
			xPt: t.xPt,
			yPt: t.yPt + t.heightPt
		}),
		Ci(e, {
			xPt: t.xPt + t.widthPt,
			yPt: t.yPt + t.heightPt
		})
	], r = n.map(({ xPt: e }) => e), i = n.map(({ yPt: e }) => e), a = Math.min(...r), o = Math.min(...i);
	return {
		xPt: a,
		yPt: o,
		widthPt: Math.max(...r) - a,
		heightPt: Math.max(...i) - o
	};
}
function Ti(e, t) {
	_i(e);
	let n = Ci(e, {
		xPt: 0,
		yPt: 0
	}), r = {
		top: {
			xPt: 0,
			yPt: -1
		},
		right: {
			xPt: 1,
			yPt: 0
		},
		bottom: {
			xPt: 0,
			yPt: 1
		},
		left: {
			xPt: -1,
			yPt: 0
		}
	}, i = {}, a = /* @__PURE__ */ new Set();
	for (let o of [
		"top",
		"right",
		"bottom",
		"left"
	]) {
		let s = Ci(e, r[o]), c = s.xPt - n.xPt, l = s.yPt - n.yPt, u = l === 0 && c !== 0 ? c > 0 ? "right" : "left" : c === 0 && l !== 0 ? l > 0 ? "bottom" : "top" : null;
		if (u === null || a.has(u)) throw RangeError("Edge transforms require a non-degenerate axis-aligned matrix");
		i[u] = t[o], a.add(u);
	}
	if (a.size !== 4) throw RangeError("Edge transform must map every physical edge exactly once");
	return i;
}
function Ei(e, t) {
	return {
		writingMode: e,
		logicalToPhysical: xi(e, t),
		physicalToLogical: Si(e, t)
	};
}
//#endregion
//#region packages/docx/src/layout/column-separators.ts
function Di(e) {
	return Object.freeze(e);
}
function Oi(e) {
	let t = [];
	for (let n of e) {
		let { columns: e, columnSeparator: r } = n.section;
		if (!r || e.length < 2 || n.blockEndPt <= n.blockStartPt) continue;
		let i = new Set(n.columnIndexes), a = n.columnFlowDirection === "rtl" ? e.map((e, t) => t).reverse() : e.map((e, t) => t);
		for (let r = 0; r < a.length - 1; r += 1) {
			let o = a[r];
			if (!i.has(o)) continue;
			let s = a[r + 1], c = Math.min(o, s), l = Math.max(o, s), u = e[c], d = e[l], f = (u.xPt + u.wPt + d.xPt) / 2;
			t.push(Object.freeze({
				start: Di(Ci(n.coordinateSpace.logicalToPhysical, {
					xPt: f,
					yPt: n.blockStartPt
				})),
				end: Di(Ci(n.coordinateSpace.logicalToPhysical, {
					xPt: f,
					yPt: n.blockEndPt
				}))
			}));
		}
	}
	return Object.freeze(t);
}
//#endregion
//#region packages/docx/src/layout/border-treatment.ts
function ki(e, t) {
	let n = Be(e, t), r = e === "triple" || /^(?:thinThick|thickThin|thinThickThin)(?:Small|Medium|Large)Gap$/.test(e);
	return Object.freeze({
		authoredStyle: e,
		style: e === "double" ? "double" : r ? "compound" : n.length > 0 ? "dashed" : e.includes("wave") ? "wavy" : "solid",
		dashPatternPt: Object.freeze(n)
	});
}
//#endregion
//#region packages/docx/src/layout/text.ts
function Ai(e, t) {
	let n = (e.smallCaps ? Math.max(e.fontSize - 2, 1) : e.fontSize) * t;
	return e.vertAlign && (n *= .65), n;
}
var ji = /[ᄀ-ᇿ⺀-⿟　-〿぀-ヿ㄰-㆏㐀-䶿一-鿿ꥠ-꥿가-퟿豈-﫿＀-￯]/u;
function Mi(e, t, n) {
	let r = null, i = 0;
	for (let n of t) n.alignment !== "bar" && (n.pos > i && (i = n.pos), n.pos > e && (r === null || n.pos < r.pos) && (r = n));
	let a = null;
	if (n > 0) {
		let t = Math.ceil((Math.max(e, i) + 1e-6) / n) * n;
		t <= e && (t += n), a = {
			pos: t,
			alignment: "left"
		};
	}
	return r && a ? r.pos <= a.pos ? r : a : r ?? a;
}
function Ni(e, t, n) {
	return Mi(e, t, n);
}
function Pi(e, t) {
	let n = t === "vert" || t === "vert270" || t === "eaVert" || t === "mongolianVert";
	return {
		type: "text",
		text: e.text,
		bold: e.bold ?? !1,
		italic: e.italic ?? !1,
		underline: !1,
		strikethrough: !1,
		fontSize: e.fontSizePt,
		color: e.color ?? null,
		fontFamily: e.fontFamily ?? null,
		fontFamilyEastAsia: e.fontFamilyEastAsia ?? null,
		isLink: !1,
		background: null,
		vertAlign: null,
		hyperlink: null,
		ruby: e.ruby ?? void 0,
		textBoxLineFloor: !0,
		textBoxVertical: n
	};
}
function Fi(e, t = {}, n = {}) {
	if (!e) return "sans-serif";
	let r = t[e];
	if (r === "roman") return "serif";
	if (r === "swiss") return "sans-serif";
	if (r === "modern" && n[e] === "fixed") return "monospace";
	let i = l(e);
	return i === "mono" ? "monospace" : i === "serif" ? "serif" : "sans-serif";
}
function Ii(e) {
	return e === "eastAsia" ? "sans-serif" : "serif";
}
var Li = Symbol("docx.fontMetricSnapshot");
function Ri(e) {
	if (e.length > 32768) throw RangeError("Font cmap coverage has too many ranges");
	let t = e.map(([e, t]) => {
		if (!Number.isInteger(e) || !Number.isInteger(t) || e < 0 || t > 1114111 || e > t) throw RangeError("Font cmap coverage contains an invalid range");
		return [e, t];
	}).sort((e, t) => e[0] - t[0] || e[1] - t[1]), n = [];
	for (let [e, r] of t) {
		let t = n[n.length - 1];
		t && e <= t[1] + 1 ? n[n.length - 1] = [t[0], Math.max(t[1], r)] : n.push([e, r]);
	}
	return Object.freeze(n.map((e) => Object.freeze(e)));
}
function zi(e = {}) {
	if (e[Li]) return e;
	let t = Object.entries(e).map(([e, t]) => {
		if (!t.family?.trim()) throw TypeError(`Font metric ${e} requires a family`);
		if (t.lineHeightRatio !== void 0 && (!Number.isFinite(t.lineHeightRatio) || t.lineHeightRatio < 0)) throw RangeError(`Font metric ${e} lineHeightRatio must be finite and non-negative`);
		if (t.designAscentRatio !== void 0 && (!Number.isFinite(t.designAscentRatio) || t.designAscentRatio < 0)) throw RangeError(`Font metric ${e} designAscentRatio must be finite and non-negative`);
		if (t.designDescentRatio !== void 0 && (!Number.isFinite(t.designDescentRatio) || t.designDescentRatio < 0)) throw RangeError(`Font metric ${e} designDescentRatio must be finite and non-negative`);
		if (t.eastAsianLineHeightRatio !== void 0 && (!Number.isFinite(t.eastAsianLineHeightRatio) || t.eastAsianLineHeightRatio < 0)) throw RangeError(`Font metric ${e} eastAsianLineHeightRatio must be finite and non-negative`);
		if (t.fontBoxRatio !== void 0 && (!Number.isFinite(t.fontBoxRatio) || t.fontBoxRatio <= 0)) throw RangeError(`Font metric ${e} fontBoxRatio must be finite and positive`);
		if (t.averageCharWidthRatio !== void 0 && (!Number.isFinite(t.averageCharWidthRatio) || t.averageCharWidthRatio <= 0)) throw RangeError(`Font metric ${e} averageCharWidthRatio must be finite and positive`);
		if (t.weight !== void 0 && (!Number.isFinite(t.weight) || t.weight < 1 || t.weight > 1e3)) throw RangeError(`Font metric ${e} weight must be finite and between 1 and 1000`);
		let n = {
			family: t.family,
			...t.lineHeightRatio === void 0 ? {} : { lineHeightRatio: t.lineHeightRatio },
			...t.designAscentRatio === void 0 ? {} : { designAscentRatio: t.designAscentRatio },
			...t.designDescentRatio === void 0 ? {} : { designDescentRatio: t.designDescentRatio },
			...t.eastAsianLineHeightRatio === void 0 ? {} : { eastAsianLineHeightRatio: t.eastAsianLineHeightRatio },
			...t.fontBoxRatio === void 0 ? {} : { fontBoxRatio: t.fontBoxRatio },
			...t.averageCharWidthRatio === void 0 ? {} : { averageCharWidthRatio: t.averageCharWidthRatio },
			...t.unicodeRanges === void 0 ? {} : { unicodeRanges: Ri(t.unicodeRanges) },
			...t.requestedFamily === void 0 ? {} : { requestedFamily: t.requestedFamily },
			...t.weight === void 0 ? {} : { weight: t.weight },
			...t.style === void 0 ? {} : { style: t.style },
			...t.sourceIdentity === void 0 ? {} : { sourceIdentity: t.sourceIdentity },
			...t.synthesized === void 0 ? {} : { synthesized: t.synthesized }
		};
		return [Tn(e), Object.freeze(n)];
	}).sort(([e], [t]) => e.localeCompare(t)), n = Object.fromEntries(t);
	return Object.defineProperty(n, Li, { value: !0 }), Object.freeze(n);
}
var Bi = new Set([
	161,
	164,
	167,
	168,
	170,
	173,
	175,
	176,
	177,
	178,
	179,
	180,
	182,
	183,
	184,
	185,
	186,
	188,
	189,
	190,
	191,
	215,
	247
]), Vi = new Set([
	224,
	225,
	232,
	233,
	234,
	236,
	237,
	242,
	243,
	249,
	250,
	252
]);
function Hi(e, t, n, r, i) {
	let a = n === "eastAsia", o = r?.split(/[-_]/, 1)[0]?.toLowerCase() === "zh", s = /^(?:86|88)$/i.test(i?.trim() ?? ""), c = "highAnsi";
	return e <= 127 ? c = "ascii" : e <= 255 ? c = a && (Bi.has(e) || o && Vi.has(e)) ? "eastAsia" : "highAnsi" : e >= 256 && e <= 687 ? c = a && (o || s) ? "eastAsia" : "highAnsi" : e >= 688 && e <= 767 || e >= 768 && e <= 879 || e >= 880 && e <= 975 || e >= 1024 && e <= 1279 ? c = a ? "eastAsia" : "highAnsi" : e >= 1424 && e <= 1983 || e >= 64285 && e <= 65023 || e >= 65136 && e <= 65278 ? c = "ascii" : e >= 4352 && e <= 4607 || e >= 11904 && e <= 12031 || e >= 12032 && e <= 12255 || e >= 12272 && e <= 12687 || e >= 12688 && e <= 12703 || e >= 12800 && e <= 19903 || e >= 19968 && e <= 40879 || e >= 40960 && e <= 42127 || e >= 42128 && e <= 42191 || e >= 44032 && e <= 55215 || e >= 63744 && e <= 64255 || e >= 65072 && e <= 65103 || e >= 65104 && e <= 65135 || e >= 65280 && e <= 65519 || e >= 65536 && e <= 1114111 ? c = "eastAsia" : e >= 7680 && e <= 7935 ? c = a && o ? "eastAsia" : "highAnsi" : (e >= 8192 && e <= 10175 || e >= 57344 && e <= 63743 || e >= 64256 && e <= 64284) && (c = a ? "eastAsia" : "highAnsi"), c === "eastAsia" && a ? c : t ? "complexScript" : c;
}
function Ui(e, t) {
	return e.themeFontPresence?.[t] ?? e.themeFonts?.[t] != null ? e.themeFonts?.[t] : e.fonts[t] ?? (e.themeFontPresence?.ascii ?? e.themeFonts?.ascii != null ? e.themeFonts?.ascii : e.fonts.ascii);
}
function Wi(e) {
	let t = zi({
		...e.localMetrics,
		...e.fontMetrics
	}), n = Object.freeze(Object.fromEntries(Object.entries(e.genericFamilies ?? {}).map(([e, t]) => [e.trim().toLocaleLowerCase("en-US"), t]).sort(([e], [t]) => e.localeCompare(t)))), r = Object.freeze(Object.fromEntries(Object.entries(e.eastAsiaFontCharsets ?? {}).map(([e, t]) => [e.trim().toLocaleLowerCase("en-US"), t.trim()]).sort(([e], [t]) => e.localeCompare(t)))), i = nt("text", {
		fonts: e.fonts.fingerprint,
		measurer: e.measurer.fingerprint,
		cjkFallback: e.cjkFallback ?? null,
		fontMetrics: t,
		eastAsiaFontCharsets: r,
		genericFamilies: n
	}), a = (t) => {
		let r = Ui(t, t.slot), i = r ? n[r.trim().toLocaleLowerCase("en-US")] ?? t.genericFamily ?? "sans-serif" : t.genericFamily ?? Ii(t.slot), a = S(t.text ?? "");
		return e.fonts.resolve({
			requestedFamily: r,
			cjkFallback: a ? e.cjkFallback : void 0,
			language: t.slot === "eastAsia" && a ? t.eastAsiaLanguage : void 0,
			genericFamily: i,
			weight: t.weight,
			style: t.style
		});
	}, o = /* @__PURE__ */ new Map(), s = (t) => {
		let n = JSON.stringify([
			t.text,
			t.fontRoute.familyList,
			t.fontRoute.scope,
			t.fontRoute.fingerprint,
			t.fontSizePt,
			t.weight,
			t.style,
			t.letterSpacingPt,
			t.kerning ?? null
		]), r = o.get(n);
		if (r) return r;
		let i = e.measurer.measure(t), a = Object.freeze({
			...i,
			...i.inkBounds ? { inkBounds: Object.freeze({ ...i.inkBounds }) } : {}
		});
		return o.set(n, a), a;
	}, c = (t) => e.measurer.measure(t).advancePt, l = /* @__PURE__ */ new Map();
	return Object.freeze({
		fingerprint: i,
		fontMetrics: t,
		localMetrics: t,
		resolve: a,
		shape(e) {
			if (!Number.isFinite(e.fontSizePt) || e.fontSizePt < 0) throw RangeError("fontSizePt must be a finite non-negative number");
			let t = JSON.stringify([
				e.text,
				e.fontSizePt,
				[
					e.fonts.ascii ?? null,
					e.fonts.highAnsi ?? null,
					e.fonts.eastAsia ?? null,
					e.fonts.complexScript ?? null
				],
				[
					e.themeFonts?.ascii ?? null,
					e.themeFonts?.highAnsi ?? null,
					e.themeFonts?.eastAsia ?? null,
					e.themeFonts?.complexScript ?? null
				],
				[
					e.themeFontPresence?.ascii ?? null,
					e.themeFontPresence?.highAnsi ?? null,
					e.themeFontPresence?.eastAsia ?? null,
					e.themeFontPresence?.complexScript ?? null
				],
				e.weight ?? null,
				e.style ?? null,
				e.complexScript ?? null,
				e.fontHint ?? null,
				e.eastAsiaLanguage ?? null,
				e.eastAsiaFontCharset ?? null,
				e.genericFamily ?? null,
				e.letterSpacingPt ?? null,
				e.kerning ?? null,
				e.measure ?? null,
				e.clusterGeometry ?? null
			]), n = l.get(t);
			if (n) return n;
			let i = [], o = Object.freeze([...new Set([
				0,
				...P(e.text),
				e.text.length
			])].sort((e, t) => e - t)), u = new Set(o), d = 0;
			for (let t of e.text) {
				let n = d + t.length, a = Ui(e, "eastAsia"), o = e.eastAsiaFontCharset ?? (a ? r[a.trim().toLocaleLowerCase("en-US")] : void 0), s = Hi(t.codePointAt(0) ?? 0, e.complexScript ?? !1, e.fontHint, e.eastAsiaLanguage, o), c = i.at(-1);
				c?.script === s ? (c.text += t, c.end = n) : i.push({
					text: t,
					start: d,
					end: n,
					script: s,
					breakBefore: u.has(d)
				}), d = n;
			}
			let f = i.map((t) => {
				let n = a({
					fonts: e.fonts,
					themeFonts: e.themeFonts,
					themeFontPresence: e.themeFontPresence,
					slot: t.script,
					text: t.text,
					eastAsiaLanguage: e.eastAsiaLanguage,
					weight: e.weight,
					style: e.style,
					genericFamily: e.genericFamily
				}), r = e.measure === !1 ? {
					advancePt: 0,
					ascentPt: 0,
					descentPt: 0
				} : s({
					text: t.text,
					fontRoute: n.route,
					fontSizePt: e.fontSizePt,
					weight: n.weight,
					style: n.style,
					letterSpacingPt: e.letterSpacingPt ?? 0,
					kerning: e.kerning
				});
				return Object.freeze({
					...t,
					...r,
					font: n,
					fontRoute: n.route
				});
			}), p = f.flatMap((e) => e.font.diagnostics), m = f.length > 0 && f.every((e) => e.inkBounds !== void 0) ? (() => {
				let e = 0, t = Infinity, n = -Infinity, r = 0, i = 0;
				for (let a of f) {
					let o = a.inkBounds;
					t = Math.min(t, e + o.xMinPt), n = Math.max(n, e + o.xMaxPt), r = Math.max(r, o.ascentPt), i = Math.max(i, o.descentPt), e += a.advancePt;
				}
				return Object.freeze({
					xMinPt: t,
					xMaxPt: n,
					ascentPt: r,
					descentPt: i
				});
			})() : void 0, h = f.reduce((e, t) => e + t.advancePt, 0), g = e.clusterGeometry === !1 ? void 0 : (() => {
				let t = new Map([[0, 0], [e.text.length, h]]), n = (n) => {
					if (e.measure === !1 || n <= 0) return 0;
					let r = t.get(n);
					if (r !== void 0) return r;
					let i = 0;
					for (let t of f) {
						if (n >= t.end) {
							i += t.advancePt;
							continue;
						}
						if (n <= t.start) break;
						i += c({
							text: t.text.slice(0, n - t.start),
							fontRoute: t.fontRoute,
							fontSizePt: e.fontSizePt,
							weight: t.font.weight,
							style: t.font.style,
							letterSpacingPt: e.letterSpacingPt ?? 0,
							kerning: e.kerning
						});
						break;
					}
					return t.set(n, i), i;
				};
				return Object.freeze(o.slice(0, -1).map((e, t) => {
					let r = o[t + 1] ?? e, i = n(e);
					return Object.freeze({
						range: Object.freeze({
							start: e,
							end: r
						}),
						offsetPt: i,
						advancePt: n(r) - i
					});
				}));
			})(), _ = Object.freeze({
				advancePt: h,
				ascentPt: Math.max(0, ...f.map((e) => e.ascentPt)),
				descentPt: Math.max(0, ...f.map((e) => e.descentPt)),
				...m ? { inkBounds: m } : {},
				...m && f.every((e) => e.horizontalInkBoundsAreTight === !0) ? { horizontalInkBoundsAreTight: !0 } : {},
				spans: Object.freeze(f),
				graphemeBoundaries: o,
				...g ? { clusters: g } : {},
				diagnostics: Object.freeze(p)
			});
			return l.set(t, _), _;
		}
	});
}
//#endregion
//#region packages/docx/src/fit-text.ts
function Gi(e, t) {
	let n = [];
	for (let r = 0; r < e.length;) {
		let i = e[r];
		if (i.fitTextValTwips === void 0) {
			r += 1;
			continue;
		}
		let a = r + 1;
		if (i.fitTextId !== void 0) for (; a < e.length && e[a].fitTextValTwips !== void 0 && e[a].fitTextId === i.fitTextId;) a += 1;
		let o = 0, s = 0;
		for (let t = r; t < a; t += 1) {
			let n = e[t];
			o += n.naturalWidthPx * (n.charScale ?? 1), s += n.charCount;
		}
		let c = i.fitTextValTwips / 20 * t, l = s > 1 ? (c - o) / (s - 1) : 0, u = c - o - Math.max(0, s - 1) * l;
		n.push({
			start: r,
			end: a,
			targetPx: c,
			naturalPx: o,
			charCount: s,
			perGapPx: l,
			trailingPadPx: u
		}), r = a;
	}
	return n;
}
//#endregion
//#region packages/docx/src/layout/exact-geometry.ts
function Ki(e) {
	return e < 0n ? -e : e;
}
function qi(e, t) {
	let n = Ki(e), r = Ki(t);
	for (; r !== 0n;) {
		let e = n % r;
		n = r, r = e;
	}
	return n;
}
function Ji(e, t) {
	if (t === 0n) throw Error("Exact rational denominator must be nonzero");
	if (e === 0n) return Object.freeze({
		numerator: 0n,
		denominator: 1n
	});
	let n = t < 0n ? -1n : 1n, r = qi(e, t);
	return Object.freeze({
		numerator: n * e / r,
		denominator: n * t / r
	});
}
function U(e, t) {
	let n = e.numerator * t.denominator - t.numerator * e.denominator;
	return n < 0n ? -1 : +(n > 0n);
}
function Yi(e, t) {
	return Ji(e.numerator * t.denominator - t.numerator * e.denominator, e.denominator * t.denominator);
}
function Xi(e, t) {
	return Ji(e.numerator * t.denominator + t.numerator * e.denominator, 2n * e.denominator * t.denominator);
}
function Zi(e) {
	return `${e.numerator}/${e.denominator}`;
}
var Qi = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(8));
function $i(e) {
	if (!Number.isFinite(e)) throw Error("Exact geometry requires a finite binary64 value");
	if (e === 0) return Object.freeze({
		coefficient: 0n,
		exponent: 0
	});
	Qi.setFloat64(0, e, !1);
	let t = Qi.getBigUint64(0, !1), n = t >> 63n != 0n, r = Number(t >> 52n & 2047n), i = t & (1n << 52n) - 1n, a = r === 0 ? i : 1n << 52n | i, o = r === 0 ? -1074 : r - 1023 - 52;
	for (; (a & 1n) == 0n;) a >>= 1n, o += 1;
	return Object.freeze({
		coefficient: n ? -a : a,
		exponent: o
	});
}
function ea(e) {
	return e === 0n ? 0 : e.toString(2).length;
}
function ta(e, t, n) {
	let r = n >= 0 ? e : e << BigInt(-n), i = n >= 0 ? t << BigInt(n) : t;
	return r < i ? -1 : +(r > i);
}
function na(e, t, n) {
	let r = n >= 0 ? e << BigInt(n) : e, i = n >= 0 ? t : t << BigInt(-n), a = r / i, o = r % i * 2n;
	return (o > i || o === i && (a & 1n) != 0n) && (a += 1n), a;
}
function ra(e) {
	return Qi.setBigUint64(0, e, !1), Qi.getFloat64(0, !1);
}
function ia(e) {
	if (e.numerator === 0n) return 0;
	let t = e.numerator < 0n, n = Ki(e.numerator), r = e.denominator, i = ea(n) - ea(r);
	ta(n, r, i) < 0 && --i;
	let a = t ? 1n << 63n : 0n;
	if (i < -1022) {
		let e = na(n, r, 1074);
		return ra(e === 0n ? a : e >= 1n << 52n ? a | 1n << 52n : a | e);
	}
	let o = na(n, r, 52 - i);
	if (o === 1n << 53n && (o >>= 1n, i += 1), i > 1023) return t ? -Infinity : Infinity;
	let s = BigInt(i + 1023) << 52n, c = o - (1n << 52n);
	return ra(a | s | c);
}
function aa(e) {
	if (e === Infinity) return e;
	if (Object.is(e, -0) || e === 0) return Number.MIN_VALUE;
	Qi.setFloat64(0, e, !1);
	let t = Qi.getBigUint64(0, !1);
	return ra(e > 0 ? t + 1n : t - 1n);
}
function oa(e) {
	let t = ia(e);
	if (t === Infinity) return t;
	if (t === -Infinity) return -Number.MAX_VALUE;
	let n = $i(t);
	return U(n.exponent >= 0 ? {
		numerator: n.coefficient << BigInt(n.exponent),
		denominator: 1n
	} : {
		numerator: n.coefficient,
		denominator: 1n << BigInt(-n.exponent)
	}, e) >= 0 ? t : aa(t);
}
function sa(e) {
	return -oa({
		numerator: -e.numerator,
		denominator: e.denominator
	});
}
//#endregion
//#region packages/docx/src/layout/polygon-wrap.ts
function ca(e) {
	if (!e.points || e.points.length < 3 || e.points.some((e) => !Number.isFinite(e.xPt) || !Number.isFinite(e.yPt))) throw Error(`Invalid ${e.kind} wrapPolygon for ${e.imageKey}`);
	if (![
		e.xLeftPt,
		e.xRightPt,
		e.yTopPt,
		e.yBottomPt
	].every(Number.isFinite) || e.xRightPt < e.xLeftPt || e.yBottomPt < e.yTopPt) throw Error(`Invalid finite wrap bounds for ${e.imageKey}`);
}
var la = /* @__PURE__ */ new WeakMap();
function ua(e, t) {
	return e.x === t.x && e.y === t.y;
}
function da(e, t, n, r) {
	return e * r - t * n;
}
function fa(e, t) {
	return t > 0n ? e >= 0n && e <= t : e <= 0n && e >= t;
}
function pa(e, t) {
	let n = ua(e.from, t.from) || ua(e.from, t.to) ? e.from : ua(e.to, t.from) || ua(e.to, t.to) ? e.to : null;
	if (n) return Object.freeze({
		y: Ji(n.y, 1n),
		contact: "shared-endpoint"
	});
	let r = e.to.x - e.from.x, i = e.to.y - e.from.y, a = t.to.x - t.from.x, o = t.to.y - t.from.y, s = da(r, i, a, o);
	if (s === 0n) return null;
	let c = t.from.x - e.from.x, l = t.from.y - e.from.y, u = da(c, l, a, o), d = da(c, l, r, i);
	return !fa(u, s) || !fa(d, s) ? null : Object.freeze({
		y: Ji(e.from.y * s + i * u, s),
		contact: i === 0n || o === 0n ? "horizontal" : "active-crossing"
	});
}
function ma(e, t) {
	return `${e}:${t}`;
}
function ha(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let i of t) {
		if (i < 0 || i >= Math.floor(e.length / 2)) continue;
		n();
		let t = e[i * 2], a = e[i * 2 + 1];
		r.add(ma(t, a));
	}
	return r;
}
function ga(e) {
	let t = (e) => {
		if (e.length === 0) return null;
		let n = e[Math.floor(e.length / 2)].yTopPt, r = [], i = [], a = [];
		for (let t of e) t.yBottomPt <= n ? r.push(t) : t.yTopPt > n ? i.push(t) : a.push(t);
		return Object.freeze({
			centerYPt: n,
			crossingByTop: Object.freeze(a),
			crossingByBottom: Object.freeze(a.slice().sort((e, t) => t.yBottomPt - e.yBottomPt)),
			below: t(r),
			above: t(i)
		});
	};
	return t(e.slice().sort((e, t) => e.yTopPt - t.yTopPt || e.yBottomPt - t.yBottomPt));
}
function _a(e, t) {
	return ia(t >= 0 ? {
		numerator: e.numerator << BigInt(t),
		denominator: e.denominator
	} : {
		numerator: e.numerator,
		denominator: e.denominator << BigInt(-t)
	});
}
function va(e, t) {
	return oa(t >= 0 ? {
		numerator: e.numerator << BigInt(t),
		denominator: e.denominator
	} : {
		numerator: e.numerator,
		denominator: e.denominator << BigInt(-t)
	});
}
function ya(e, t) {
	let n = $i(e), r = n.exponent - t;
	return r >= 0 ? {
		numerator: n.coefficient << BigInt(r),
		denominator: 1n
	} : {
		numerator: n.coefficient,
		denominator: 1n << BigInt(-r)
	};
}
function ba(e, t, n) {
	let r = e.dx * n.numerator - e.c * n.denominator, i = t.dx * n.numerator - t.c * n.denominator, a = r * t.dy - i * e.dy;
	return a < 0n ? -1 : +(a > 0n);
}
function xa(e) {
	let t = (e) => {
		if (e.length === 0) return null;
		let n = e[Math.floor(e.length / 2)].yTop, r = [], i = [], a = [];
		for (let t of e) U(t.yBottom, n) <= 0 ? r.push(t) : U(t.yTop, n) > 0 ? i.push(t) : a.push(t);
		return Object.freeze({
			centerY: n,
			crossingByTop: Object.freeze(a),
			crossingByBottom: Object.freeze(a.slice().sort((e, t) => U(t.yBottom, e.yBottom))),
			below: t(r),
			above: t(i)
		});
	};
	return t(e.slice().sort((e, t) => U(e.yTop, t.yTop) || U(e.yBottom, t.yBottom)));
}
function Sa(e, t, n, r) {
	if (!(!e || U(n, t) <= 0)) {
		if (U(n, e.centerY) <= 0) {
			for (let t of e.crossingByTop) {
				if (U(t.yTop, n) >= 0) break;
				r.push(t);
			}
			Sa(e.below, t, n, r);
			return;
		}
		if (U(t, e.centerY) >= 0) {
			for (let n of e.crossingByBottom) {
				if (U(n.yBottom, t) <= 0) break;
				r.push(n);
			}
			Sa(e.above, t, n, r);
			return;
		}
		r.push(...e.crossingByTop), Sa(e.below, t, n, r), Sa(e.above, t, n, r);
	}
}
function Ca(e, t, n, r, i) {
	let a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
	t.forEach((e, t) => {
		if (e.minY === e.maxY) return;
		let n = Zi(Ji(e.minY, 1n)), r = Zi(Ji(e.maxY, 1n)), i = a.get(n);
		i ? i.push(t) : a.set(n, [t]);
		let s = o.get(r);
		s ? s.push(t) : o.set(r, [t]);
	});
	let s = /* @__PURE__ */ new Map();
	for (let e of i) {
		if (e.contact !== "active-crossing") continue;
		let t = Zi(e.y), n = s.get(t);
		n || s.set(t, n = /* @__PURE__ */ new Set()), n.add(e.leftEdge), n.add(e.rightEdge);
	}
	let c = [], l = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Map(), d = [], f = [], p = 0, m = 0, h = (t, n, i) => {
		for (let a of t) {
			if (n.has(a)) continue;
			let t = u.get(a);
			if (t && U(i, t.yTop) > 0) {
				let n = Object.freeze({
					yTop: t.yTop,
					yBottom: i,
					leftEdge: t.leftEdge,
					rightEdge: t.rightEdge
				});
				d.push(n);
				let a = _a(t.yTop, r), o = _a(i, r);
				o > a && f.push(Object.freeze({
					yTopPt: a,
					yBottomPt: o,
					left: e[t.leftEdge],
					right: e[t.rightEdge]
				}));
			}
			u.delete(a);
		}
		for (let e of n) {
			if (t.has(e)) continue;
			let n = e.indexOf(":");
			u.set(e, {
				leftEdge: Number(e.slice(0, n)),
				rightEdge: Number(e.slice(n + 1)),
				yTop: i
			});
		}
	}, g = /* @__PURE__ */ new Map(), _ = (e, t) => {
		e.add(Math.floor((t - 1) / 2)), e.add(Math.floor(t / 2)), e.add(Math.floor((t + 1) / 2));
	}, v = (e) => ha(c, e, () => {
		m += 2;
	}), y = () => {
		let e = /* @__PURE__ */ new Set();
		for (let t = 0; t + 1 < c.length; t += 2) m += 2, e.add(ma(c[t], c[t + 1]));
		return e;
	};
	for (let e = 0; e < n.length; e += 1) {
		let r = n[e], i = n[e + 1], u = i ? Xi(r, i) : r, d = (e, n) => (p += 1, ba(t[e], t[n], u) || e - n), f = (e) => {
			let t = 0, n = c.length;
			for (; t < n;) {
				let r = t + n >>> 1;
				d(c[r], e) <= 0 ? t = r + 1 : n = r;
			}
			c.splice(t, 0, e);
			for (let e = t; e < c.length; e += 1) g.set(c[e], e);
		}, m = (e) => {
			let t = g.get(e);
			if (t !== void 0) {
				c.splice(t, 1), g.delete(e);
				for (let e = t; e < c.length; e += 1) g.set(c[e], e);
			}
		}, b = (e) => {
			let n = [...e].filter((e) => g.has(e) && U(Ji(t[e].minY, 1n), r) <= 0 && U(r, Ji(t[e].maxY, 1n)) < 0), i = n.map((e) => g.get(e)).sort((e, t) => e - t);
			n.sort(d);
			for (let e = 0; e < i.length; e += 1) {
				let t = i[e], r = n[e];
				c[t] = r, g.set(r, t);
			}
		}, x = Zi(r), S = o.get(x) ?? [], C = a.get(x) ?? [], w = s.get(x) ?? l;
		if (S.length === 0 && C.length === 0 && (w.size === 0 || i === void 0)) continue;
		let T = S.length > 0 || C.length > 0, E = /* @__PURE__ */ new Set();
		if (!T) for (let e of w) {
			let t = g.get(e);
			t !== void 0 && _(E, t);
		}
		let D = T ? y() : v(E);
		for (let e of S) m(e);
		for (let e of C) f(e);
		if (w.size > 0 && i !== void 0 && b(w), c.length % 2 != 0) throw Error("Compiled wrapPolygon produced an odd open-slab crossing count");
		if (T) h(D, y(), r);
		else {
			let e = /* @__PURE__ */ new Set();
			for (let t of w) {
				let n = g.get(t);
				n !== void 0 && _(e, n);
			}
			h(D, v(e), r);
		}
	}
	return Object.freeze({
		spans: Object.freeze(f),
		exactSpans: Object.freeze(d),
		orderComparisonCount: p,
		pairMembershipVisitCount: m
	});
}
function wa(e) {
	ca(e);
	let t = e.points, n = Object.freeze(t.map((e) => Object.freeze({ ...e }))), r = [
		...n.flatMap((e) => [e.xPt, e.yPt]),
		e.xLeftPt,
		e.xRightPt,
		e.yTopPt,
		e.yBottomPt
	].map($i).filter(({ coefficient: e }) => e !== 0n), i = r.length === 0 ? 0 : Math.min(...r.map(({ exponent: e }) => e)), a = (e) => {
		let t = $i(e);
		return t.coefficient === 0n ? 0n : t.coefficient << BigInt(t.exponent - i);
	}, o = n.map((e) => Object.freeze({
		x: a(e.xPt),
		y: a(e.yPt)
	})), s = n.map((e, t) => {
		let r = n[(t + 1) % n.length], i = r.yPt - e.yPt, a = i === 0 ? 0 : (r.xPt - e.xPt) / i;
		return Object.freeze({
			from: e,
			to: r,
			minYPt: Math.min(e.yPt, r.yPt),
			maxYPt: Math.max(e.yPt, r.yPt),
			slopeXPerY: a,
			interceptX: i === 0 ? e.xPt : e.xPt - a * e.yPt
		});
	}), c = o.map((e, t) => {
		let n = o[(t + 1) % o.length], r = e.y <= n.y ? e : n, i = e.y <= n.y ? n : e, a = i.x - r.x, s = i.y - r.y;
		return Object.freeze({
			index: t,
			from: e,
			to: n,
			minY: r.y,
			maxY: i.y,
			dx: a,
			dy: s,
			c: a * r.y - s * r.x
		});
	}), l = [];
	for (let e = 0; e < c.length; e += 1) for (let t = e + 1; t < c.length; t += 1) {
		let n = pa(c[e], c[t]);
		n && l.push(Object.freeze({
			y: n.y,
			contact: n.contact,
			leftEdge: e,
			rightEdge: t
		}));
	}
	let u = Infinity, d = -Infinity, f = Infinity, p = -Infinity;
	for (let e of n) u = Math.min(u, e.xPt), d = Math.max(d, e.xPt), f = Math.min(f, e.yPt), p = Math.max(p, e.yPt);
	let m = /* @__PURE__ */ new Map();
	for (let e of o) {
		let t = Ji(e.y, 1n);
		m.set(Zi(t), t);
	}
	for (let e of l) m.set(Zi(e.y), e.y);
	let h = Object.freeze([...m.values()].sort(U)), g = Object.freeze([...new Set(h.map((e) => _a(e, i)))].sort((e, t) => e - t)), _ = Ca(s, c, h, i, l), v = Ji(o.reduce((e, t) => t.x < e ? t.x : e, o[0].x), 1n), y = Ji(o.reduce((e, t) => t.x > e ? t.x : e, o[0].x), 1n), b = Ji(o.reduce((e, t) => t.y < e ? t.y : e, o[0].y), 1n), x = Ji(o.reduce((e, t) => t.y > e ? t.y : e, o[0].y), 1n), S = Ji(0n, 1n), C = (e, t) => {
		let n = Yi(e, t);
		return U(n, S) > 0 ? n : S;
	}, w = Object.freeze({
		scaleExponent: i,
		edges: Object.freeze(c),
		eventYs: h,
		spans: _.exactSpans,
		spanIndex: xa(_.exactSpans),
		polygonLeft: v,
		polygonRight: y,
		polygonTop: b,
		polygonBottom: x,
		padLeft: C(v, Ji(a(e.xLeftPt), 1n)),
		padRight: C(Ji(a(e.xRightPt), 1n), y),
		padTop: C(b, Ji(a(e.yTopPt), 1n)),
		padBottom: C(Ji(a(e.yBottomPt), 1n), x)
	}), T = Object.freeze({
		kind: e.kind,
		edges: Object.freeze(s),
		eventYPts: g,
		contourSpans: _.spans,
		contourSpanIndex: ga(_.spans),
		intersectionCount: l.length,
		compileOrderComparisonCount: _.orderComparisonCount,
		compilePairMembershipVisitCount: _.pairMembershipVisitCount,
		polygonLeftPt: u,
		polygonRightPt: d,
		polygonTopPt: f,
		polygonBottomPt: p,
		padLeftPt: Math.max(0, u - e.xLeftPt),
		padRightPt: Math.max(0, e.xRightPt - d),
		padTopPt: Math.max(0, f - e.yTopPt),
		padBottomPt: Math.max(0, e.yBottomPt - p)
	});
	return la.set(T, w), T;
}
function Ta(e, t) {
	return {
		numerator: e.dx * t.numerator - e.c * t.denominator,
		denominator: e.dy * t.denominator
	};
}
function Ea(e, t) {
	return e.dx * t.dy === t.dx * e.dy && e.c * t.dy === t.c * e.dy;
}
function Da(e) {
	let t = e.filter((e) => U(e.r, e.l) > 0).slice().sort((e, t) => U(e.l, t.l) || U(e.r, t.r)), n = [];
	for (let e of t) {
		let t = n.at(-1);
		!t || U(e.l, t.r) > 0 ? n.push({ ...e }) : U(e.r, t.r) > 0 && (n[n.length - 1] = {
			l: t.l,
			r: e.r
		});
	}
	return n;
}
function Oa(e, t) {
	return {
		numerator: e.numerator * t.denominator + t.numerator * e.denominator,
		denominator: e.denominator * t.denominator
	};
}
function ka(e, t) {
	return {
		numerator: e.numerator * t.denominator - t.numerator * e.denominator,
		denominator: e.denominator * t.denominator
	};
}
function Aa(e, t, n) {
	let r = la.get(e);
	if (!r) throw Error("Compiled polygon omitted its exact geometry authority");
	let i = ka(t, r.padBottom), a = Oa(n, r.padTop), o = U(r.polygonTop, i) >= 0 ? r.polygonTop : i, s = U(r.polygonBottom, a) <= 0 ? r.polygonBottom : a;
	if (U(s, o) <= 0) return [];
	let c = [], l = [];
	Sa(r.spanIndex, o, s, l);
	for (let e of l) {
		let t = U(o, e.yTop) >= 0 ? o : e.yTop, n = U(s, e.yBottom) <= 0 ? s : e.yBottom;
		if (U(n, t) <= 0) continue;
		let i = r.edges[e.leftEdge], a = r.edges[e.rightEdge];
		if (Ea(i, a)) continue;
		let l = Ta(i, t), u = Ta(i, n), d = Ta(a, t), f = Ta(a, n);
		c.push({
			l: ka(U(l, u) <= 0 ? l : u, r.padLeft),
			r: Oa(U(d, f) >= 0 ? d : f, r.padRight)
		});
	}
	let u = Da(c);
	return e.kind === "through" || u.length === 0 ? u : [{
		l: u[0].l,
		r: u.at(-1).r
	}];
}
function ja(e, t, n) {
	let r = la.get(e);
	if (!r) throw Error("Compiled polygon omitted its exact geometry authority");
	let i = ya(t, r.scaleExponent), a = Oa(i, ya(n, r.scaleExponent)), o = (e) => r.scaleExponent >= 0 ? {
		numerator: e.numerator << BigInt(r.scaleExponent),
		denominator: e.denominator
	} : {
		numerator: e.numerator,
		denominator: e.denominator << BigInt(-r.scaleExponent)
	};
	return Object.freeze(Aa(e, i, a).map((e) => Object.freeze({
		l: o(e.l),
		r: o(e.r)
	})));
}
function Ma(e, t) {
	let n = la.get(e);
	if (!n) throw Error("Compiled polygon omitted its exact geometry authority");
	let r = ya(t, n.scaleExponent), i = /* @__PURE__ */ new Set();
	for (let e of n.eventYs) i.add(va(Oa(e, n.padBottom), n.scaleExponent)), i.add(va(ka(ka(e, r), n.padTop), n.scaleExponent));
	return Object.freeze([...i].filter(Number.isFinite).sort((e, t) => e - t));
}
function Na(e, t, n, r) {
	let i = la.get(e);
	if (!i) throw Error("Compiled polygon omitted its exact geometry authority");
	let a = Xi(ya(n, i.scaleExponent), ya(r, i.scaleExponent)), o = ya(t, i.scaleExponent), s = ka(a, i.padBottom), c = Oa(o, i.padTop), l = Oa(a, c), u = U(i.polygonTop, s) >= 0 ? i.polygonTop : s, d = U(i.polygonBottom, l) <= 0 ? i.polygonBottom : l, f = [], p = [];
	Sa(i.spanIndex, u, d, p);
	for (let e of p) {
		let t = U(u, e.yTop) >= 0 ? u : e.yTop;
		if (U(U(d, e.yBottom) <= 0 ? d : e.yBottom, t) <= 0) continue;
		let n = i.edges[e.leftEdge], r = i.edges[e.rightEdge];
		if (Ea(n, r)) continue;
		let a = U(s, e.yTop) > 0, o = U(l, e.yBottom) < 0, p = (e, t, n, r) => {
			let a = t ? n : r, o = {
				numerator: e.dx * a.numerator - e.c * a.denominator,
				denominator: e.dy * a.denominator
			};
			return {
				slope: t ? {
					numerator: e.dx,
					denominator: e.dy
				} : {
					numerator: 0n,
					denominator: 1n
				},
				intercept: i.scaleExponent >= 0 ? {
					numerator: o.numerator << BigInt(i.scaleExponent),
					denominator: o.denominator
				} : {
					numerator: o.numerator,
					denominator: o.denominator << BigInt(-i.scaleExponent)
				}
			};
		}, m = p(n, a, {
			numerator: -i.padBottom.numerator,
			denominator: i.padBottom.denominator
		}, e.yTop), h = p(n, o, c, e.yBottom), g = p(r, a, {
			numerator: -i.padBottom.numerator,
			denominator: i.padBottom.denominator
		}, e.yTop), _ = p(r, o, c, e.yBottom), v = n.dx >= 0n ? m : h, y = r.dx >= 0n ? _ : g, b = Object.freeze({
			left: Object.freeze({
				slope: v.slope,
				intercept: ka(v.intercept, i.scaleExponent >= 0 ? {
					numerator: i.padLeft.numerator << BigInt(i.scaleExponent),
					denominator: i.padLeft.denominator
				} : {
					numerator: i.padLeft.numerator,
					denominator: i.padLeft.denominator << BigInt(-i.scaleExponent)
				})
			}),
			right: Object.freeze({
				slope: y.slope,
				intercept: Oa(y.intercept, i.scaleExponent >= 0 ? {
					numerator: i.padRight.numerator << BigInt(i.scaleExponent),
					denominator: i.padRight.denominator
				} : {
					numerator: i.padRight.numerator,
					denominator: i.padRight.denominator << BigInt(-i.scaleExponent)
				})
			})
		});
		f.push(b);
	}
	return Object.freeze(f);
}
//#endregion
//#region packages/docx/src/layout/axis-aligned-overlap.ts
function Pa(e, t, n) {
	return e.left < t.right - n && e.right > t.left + n && e.top < t.bottom - n && e.bottom > t.top + n;
}
function Fa(e, t, n) {
	let r = e.right - e.left, i = e.bottom - e.top;
	if (r < 0 || i < 0) throw RangeError("Overlap rectangle has negative extent");
	let a = e.left, o = e.top;
	for (let e = 0; e <= t.length; e += 1) {
		let s = {
			left: a,
			right: a + r,
			top: o,
			bottom: o + i
		}, c = t.map((e) => ({
			left: e.left,
			right: e.right,
			top: e.top,
			bottom: e.bottom
		})).filter((e) => Pa(s, e, n.overlapEpsilon));
		if (c.length === 0) return Object.freeze({
			left: a,
			top: o
		});
		if (e === t.length) throw Error("Axis-aligned overlap resolution did not converge");
		let l = Math.max(...c.map((e) => e.right));
		if (l + r <= n.rightBoundary + n.rightBoundarySlack) {
			a = l;
			continue;
		}
		o = Math.max(...c.map((e) => e.bottom));
	}
	throw Error("Axis-aligned overlap resolution did not converge");
}
//#endregion
//#region packages/docx/src/layout/compatibility.ts
function Ia(e, t) {
	if (e.trim() === "") throw Error(`CompatibilityRule.${t} must not be empty`);
}
function W(e) {
	if (Ia(e.id, "id"), Ia(e.description, "description"), !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.id)) throw Error("CompatibilityRule.id must be a stable kebab-case identifier");
	if (e.evidence.kind === "microsoft-note") {
		if (Ia(e.evidence.reference, "evidence.reference"), !/^\[MS-[A-Z0-9]+\] §§?\d/.test(e.evidence.reference)) throw Error("CompatibilityRule.evidence.reference must identify a Microsoft specification section");
	} else if (e.evidence.kind === "regression-test") {
		if (Ia(e.evidence.reference, "evidence.reference"), !/^packages\/docx\/src\/.+\.(?:test|spec)\.tsx?#[^#]+$/.test(e.evidence.reference)) throw Error("CompatibilityRule.evidence.reference must use DOCX path#test-title");
	} else if (Ia(e.evidence.syntheticFixtureId, "evidence.syntheticFixtureId"), Ia(e.evidence.application, "evidence.application"), Ia(e.evidence.version, "evidence.version"), Ia(e.evidence.platform, "evidence.platform"), !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.evidence.syntheticFixtureId)) throw Error("CompatibilityRule.evidence.syntheticFixtureId must be kebab-case");
	return Object.freeze(e.evidence), Object.freeze(e);
}
W({
	id: "word-section-btlr-tbrl-page-frame",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/coordinate-space.test.ts#maps Transitional text direction %s to %s"
	},
	description: "Issue #988 comment 4950296007 records that, unlike the normative ECMA-376 Part 4 §14.11.7 equivalence to lr, Word uses the tbRl page frame for section-level btLr; this rule covers only the page frame, while glyph orientation is paint-owned."
}), W({
	id: "word-square-line-start-one-inch",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/float-line-start-one-inch.test.ts#(e) the boundary is identical across scales (absolute pt width)"
	},
	description: "Issue #676 records that Word starts a content line beside a square-wrapped object only when the free side gap is at least one inch; tight and through polygon openings and empty paragraph marks are outside this rule."
});
var La = W({
	id: "word-float-different-paragraph-displacement",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/floats.test.ts#keeps observed different-paragraph displacement on exclusion bounds"
	},
	description: "Preserve the established Word-compatible policy that an overlap-permitted float is displaced by exclusion geometry from floats anchored in other paragraphs, while same-paragraph floats may overlap."
}), Ra = W({
	id: "word-page-anchored-table-collision-deferral",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/float-table-page-fit.test.ts#(g) DEFERS a page-anchored floating table when its raw band intersects an existing table float"
	},
	description: "Preserve the established Word-compatible pagination behavior that defers an absolute page- or margin-anchored floating table when its authored object band intersects an existing floating-table text-exclusion band on the page."
});
W({
	id: "word-empty-mark-float-side-gap",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/float-line-start-one-inch.test.ts#keeps an anchor-host metric-only line on the paragraph-mark threshold"
	},
	description: "An empty or anchor-only paragraph-mark line may start beside a square-wrapped object when the available side gap can hold the paragraph mark em; the one-inch content-line threshold does not apply."
});
var za = .05;
function Ba(e) {
	return (72 - za) * e;
}
function Va(e, t) {
	return e * t;
}
//#endregion
//#region packages/docx/src/layout/floats.ts
var Ha = .01, Ua = .5;
function Wa(e, t) {
	return Object.freeze(e === "overlap" ? {
		kind: "word-different-paragraph",
		paragraphId: t
	} : { kind: "none" });
}
function Ga(e, t) {
	return Object.freeze(e ? {
		kind: "word-different-paragraph",
		paragraphId: t
	} : { kind: "drawingml-normative" });
}
function Ka(e) {
	let t = {
		occurrenceId: e.occurrenceId,
		paragraphId: e.paragraphId,
		bounds: e.bounds,
		exclusionBounds: e.exclusionBounds
	};
	return e.kind === "table" ? {
		...t,
		kind: "table",
		tableOverlap: e.overlap
	} : {
		...t,
		kind: e.kind === "shape" ? "drawingml" : "frame"
	};
}
function qa(e, t) {
	let n = e.imageX, r = e.imageY, i = e.imageW, a = e.imageH, o = e.xLeft, s = e.xRight, c = e.yTop, l = e.yBottom, u = {
		occurrenceId: e.anchorOccurrenceId ?? e.acquisitionOccurrenceId ?? `display-float:${t}`,
		paragraphId: e.paraId,
		bounds: {
			xPt: n,
			yPt: r,
			widthPt: i,
			heightPt: a
		},
		exclusionBounds: {
			xPt: o,
			yPt: c,
			widthPt: s - o,
			heightPt: l - c
		}
	};
	return e.kind === "table" ? {
		...u,
		kind: "table",
		tableOverlap: e.tableOverlap
	} : {
		...u,
		kind: e.kind === "shape" ? "drawingml" : "frame"
	};
}
function Ja(e) {
	let t = e.xPt, n = e.yPt, r = e.widthPt, i = e.heightPt;
	return {
		left: t,
		right: t + r,
		top: n,
		bottom: n + i
	};
}
function Ya(e, t, n) {
	return t === 0 && n === 0 ? e : Object.freeze({
		xPt: e.xPt + t,
		yPt: e.yPt + n,
		widthPt: e.widthPt,
		heightPt: e.heightPt
	});
}
function Xa(e, t, n, r) {
	return Object.freeze({
		bounds: Ya(e.bounds, t, n),
		exclusionBounds: Ya(e.exclusionBounds, t, n),
		displacement: Object.freeze({
			xPt: t,
			yPt: n
		}),
		appliedCompatibilityRuleIds: Object.freeze([...r])
	});
}
function Za(e, t) {
	let n = e.bounds.xPt - e.exclusionBounds.xPt, r = e.bounds.yPt - e.exclusionBounds.yPt, i = e.exclusionBounds.xPt + e.exclusionBounds.widthPt - e.bounds.xPt - e.bounds.widthPt, a = e.exclusionBounds.yPt + e.exclusionBounds.heightPt - e.bounds.yPt - e.bounds.heightPt, o = Ja(t.exclusionBounds);
	return {
		left: o.left - i,
		right: o.right + n,
		top: o.top - a,
		bottom: o.bottom + r
	};
}
function Qa(e, t, n = e.rightBoundaryPt) {
	let r = Ja(e.moving.bounds);
	return t.length === 0 ? Object.freeze({
		left: r.left,
		top: r.top
	}) : Fa(r, t, {
		overlapEpsilon: e.overlapEpsilonPt ?? 0,
		rightBoundary: n,
		rightBoundarySlack: e.rightBoundarySlackPt ?? 0
	});
}
function $a(e) {
	let { moving: t, avoidance: n } = e, r = e.blockers.flatMap((e) => t.kind === "table" && e.kind === "table" && (t.tableOverlap === "never" || e.tableOverlap === "never") || n.kind === "drawingml-normative" && e.kind === "drawingml" ? [Ja(e.bounds)] : []), i = n.kind === "word-different-paragraph" ? e.blockers.flatMap((e) => e.paragraphId === n.paragraphId ? [] : [Za(t, e)]) : [], a = t.exclusionBounds.xPt + t.exclusionBounds.widthPt - t.bounds.xPt - t.bounds.widthPt, o = n.kind === "word-different-paragraph" ? e.rightBoundaryPt - a : e.rightBoundaryPt, s = Qa(e, r, o), c = i.length === 0 ? s : Qa(e, [...r, ...i], o);
	return Xa(t, c.left - t.bounds.xPt, c.top - t.bounds.yPt, c.left !== s.left || c.top !== s.top ? [La.id] : []);
}
function eo(e) {
	if (e.inlineEndPt < e.inlineStartPt || e.blockExtentPt < 0) throw RangeError("Block-flow admission received a negative extent");
	let t = e.blockers.filter((t) => {
		let n = t.exclusionBounds;
		return t.kind === "table" && e.inlineEndPt - n.xPt > e.overlapEpsilonPt && n.xPt + n.widthPt - e.inlineStartPt > e.overlapEpsilonPt;
	}), n = e.blockStartPt;
	for (let r = 0; r <= t.length; r += 1) {
		let i = t.filter((t) => {
			let r = t.exclusionBounds;
			return n + e.blockExtentPt - r.yPt > e.overlapEpsilonPt && r.yPt + r.heightPt - n > e.overlapEpsilonPt;
		});
		if (i.length === 0) return Object.freeze({ blockStartPt: n });
		if (r === t.length) throw Error("Block-flow float admission did not converge");
		n = Math.max(...i.map((e) => e.exclusionBounds.yPt + e.exclusionBounds.heightPt));
	}
	throw Error("Block-flow float admission did not converge");
}
function to(e) {
	let t = Ja(e.bounds), n = e.blockers.some((n) => n.kind === "table" && Pa(t, Ja(n.exclusionBounds), e.overlapEpsilonPt));
	return Object.freeze({
		defer: n,
		appliedCompatibilityRuleIds: Object.freeze(n ? [Ra.id] : [])
	});
}
//#endregion
//#region packages/docx/src/layout/float-wrap.ts
function G(e) {
	let t = $i(e);
	return t.exponent >= 0 ? {
		numerator: t.coefficient << BigInt(t.exponent),
		denominator: 1n
	} : {
		numerator: t.coefficient,
		denominator: 1n << BigInt(-t.exponent)
	};
}
function no(e, t) {
	return {
		numerator: e.numerator * t.denominator + t.numerator * e.denominator,
		denominator: e.denominator * t.denominator
	};
}
function ro(e, t) {
	return {
		numerator: e.numerator * t.denominator - t.numerator * e.denominator,
		denominator: e.denominator * t.denominator
	};
}
function io(e, t) {
	return {
		numerator: e.numerator * t.numerator,
		denominator: e.denominator * t.denominator
	};
}
function ao(e, t) {
	let n = t.numerator < 0n;
	return {
		numerator: (n ? -e.numerator : e.numerator) * t.denominator,
		denominator: e.denominator * (n ? -t.numerator : t.numerator)
	};
}
function oo(e, t) {
	let n = G(e), r = G(t);
	return ia({
		numerator: n.numerator * r.denominator + r.numerator * n.denominator,
		denominator: 2n * n.denominator * r.denominator
	});
}
function so(e) {
	switch (e) {
		case "left":
		case "right":
		case "largest":
		case "bothSides": return e;
		default: return "bothSides";
	}
}
function co(e) {
	return e === "square" || e === "topAndBottom" || e === "tight" || e === "through";
}
function lo(e, t, n) {
	return e.xRight > t + .01 && e.xLeft < n - .01;
}
var uo = /* @__PURE__ */ new WeakMap(), fo = 4, po = /* @__PURE__ */ new WeakMap();
function mo(e) {
	return Object.isFrozen(e) && e.every((e) => Object.isFrozen(e));
}
function ho(e, t, n, r, i, a) {
	return e.kind === t && Object.is(e.xLeftPt, n) && Object.is(e.xRightPt, r) && Object.is(e.yTopPt, i) && Object.is(e.yBottomPt, a);
}
function go(e, t, n) {
	let r = e.authoredWrap;
	if (r !== "tight" && r !== "through") throw Error("Polygon compilation requires tight or through wrap");
	let i = {
		kind: r,
		imageKey: e.imageKey,
		points: e.wrapPolygon,
		xLeftPt: e.xLeft,
		xRightPt: e.xRight,
		yTopPt: e.yTop,
		yBottomPt: e.yBottom
	};
	ca(i);
	let a = mo(t);
	if (a) {
		let i = po.get(t)?.find((t) => ho(t, r, e.xLeft, e.xRight, e.yTop, e.yBottom));
		if (i) return n && (n.polygonCacheHitCount += 1), i.compiled;
	}
	n && (n.polygonCompileCount += 1);
	let o = wa(i);
	if (a) {
		let n = Object.freeze({
			kind: r,
			xLeftPt: e.xLeft,
			xRightPt: e.xRight,
			yTopPt: e.yTop,
			yBottomPt: e.yBottom,
			compiled: o
		});
		po.set(t, Object.freeze([n, ...(po.get(t) ?? []).slice(0, fo - 1)]));
	}
	return o;
}
function _o(e, t) {
	let n = e.map((e) => {
		let n = e.wrapPolygon;
		t && n && (t.polygonSnapshotPointCount += n.length);
		let r = Object.freeze({
			...e,
			...n ? { wrapPolygon: Object.freeze(n.map((e) => Object.freeze({ ...e }))) } : {}
		}), i = r.authoredWrap === "tight" || r.authoredWrap === "through" ? go(r, n ?? [], t) : null;
		return Object.freeze({
			rect: r,
			polygon: i,
			wrapMaximumLeftPt: i ? Math.min(r.xLeft, i.polygonLeftPt) : r.xLeft,
			wrapMaximumRightPt: i ? Math.max(r.xRight, i.polygonRightPt) : r.xRight
		});
	}), r = Object.freeze({ floats: Object.freeze(n) });
	return uo.set(r, /* @__PURE__ */ new Map()), r;
}
function vo(e, t) {
	let n = so(e.rect.side);
	if (n !== "largest") return n;
	let r = U(ro(G(e.wrapMaximumLeftPt), G(t.xLeftPt)), ro(G(t.xRightPt), G(e.wrapMaximumRightPt)));
	return r === 0 ? t.readingDirection === "ltr" ? "left" : "right" : r > 0 ? "left" : "right";
}
function yo(e, t, n, r, i, a) {
	let { rect: o, polygon: s } = e, c = s ? ja(s, t, n) : [{
		l: G(o.xLeft),
		r: G(o.xRight)
	}];
	if (c.length === 0) return [];
	let l = s === null, u = c.reduce((e, t) => U(t.l, e) < 0 ? t.l : e, c[0].l), d = c.reduce((e, t) => U(t.r, e) > 0 ? t.r : e, c[0].r);
	switch (vo(e, a)) {
		case "left": return [{
			l: u,
			r: G(i),
			leftSquareBoundary: l,
			rightSquareBoundary: !1
		}];
		case "right": return [{
			l: G(r),
			r: d,
			leftSquareBoundary: !1,
			rightSquareBoundary: l
		}];
		case "bothSides": return c.map((e) => ({
			...e,
			leftSquareBoundary: l,
			rightSquareBoundary: l
		}));
	}
}
function bo(e, t) {
	let n = uo.get(t);
	if (!n) throw Error("Prepared float geometry omitted its sweep cache");
	let r = n.get(e);
	if (r) return r;
	let i = /* @__PURE__ */ new Set(), a = (e) => {
		Number.isFinite(e) && i.add(e);
	};
	for (let { rect: n, polygon: r } of t.floats) if (a(oa(ro(G(n.yTop), G(e)))), a(n.yBottom), r) for (let t of Ma(r, e)) a(t);
	let o = Object.freeze([...i].sort((e, t) => e - t));
	return n.set(e, o), o;
}
function xo(e) {
	let t = e.filter((e) => U(e.r, e.l) > 0).slice().sort((e, t) => U(e.l, t.l) || U(e.r, t.r)), n = [];
	for (let e of t) {
		let t = n.at(-1);
		if (!t || U(e.l, t.r) > 0) {
			n.push({ ...e });
			continue;
		}
		U(e.l, t.l) === 0 && (t.leftSquareBoundary = t.leftSquareBoundary && e.leftSquareBoundary);
		let r = U(e.r, t.r);
		r > 0 ? (t.r = e.r, t.rightSquareBoundary = e.rightSquareBoundary) : r === 0 && (t.rightSquareBoundary = t.rightSquareBoundary && e.rightSquareBoundary);
	}
	return n;
}
function So(e, t, n, r, i) {
	let a = xo(e), o = G(t), s = G(n), c = [], l = (e, t, n) => {
		let r = U(o, e) >= 0 ? o : e, i = U(s, t) <= 0 ? s : t;
		U(i, r) > 0 && c.push({
			l: r,
			r: i,
			squareConstrained: n
		});
	}, u = o, d = !1;
	for (let e of a) {
		if (U(e.r, o) <= 0) {
			d = e.rightSquareBoundary;
			continue;
		}
		if (U(e.l, s) >= 0) {
			l(u, s, d), u = s;
			break;
		}
		U(e.l, u) > 0 && l(u, e.l, d || e.leftSquareBoundary);
		let t = U(e.r, u);
		if (t > 0 ? (u = e.r, d = e.rightSquareBoundary) : t === 0 && (d &&= e.rightSquareBoundary), U(u, s) >= 0) break;
	}
	U(u, s) < 0 && l(u, s, d);
	let f = {
		numerator: 0n,
		denominator: 1n
	};
	for (let e of c) {
		let t = ro(e.r, e.l);
		U(t, f) > 0 && (f = t);
	}
	for (let e of c) {
		let t = ro(e.r, e.l);
		if (U(t, f) === 0 && U(t, G(Math.max(1, e.squareConstrained ? i : r))) >= 0) return {
			l: e.l,
			r: e.r,
			squareConstrained: e.squareConstrained
		};
	}
	return null;
}
function Co(e, t, n, r, i, a, o, s, c, l, u) {
	let d = G(e), f = no(d, G(t)), p = (e) => G(e);
	if (a.floats.some(({ rect: e }) => e.mode === "topAndBottom" && lo(e, o, s) && U(f, p(e.yTop)) > 0 && U(d, p(e.yBottom)) < 0)) return null;
	let m = [];
	for (let i of a.floats) {
		let { rect: a } = i;
		if (a.mode !== "square" || U(f, p(a.yTop)) <= 0 || U(d, p(a.yBottom)) >= 0 || !lo(a, n, r)) continue;
		let o = yo(i, e, t, n, r, c);
		o.length !== 0 && m.push(...o);
	}
	if (m.length === 0) return {
		topY: e,
		xOffset: 0,
		maxWidth: i
	};
	let h = So(m, n, r, l, u);
	if (!h) return null;
	let g = {
		numerator: 0n,
		denominator: 1n
	}, _ = ro(h.l, G(n)), v = U(_, g) > 0 ? _ : g, y = G(n), b = oa(v), x = n + b, S = G(x);
	if (U(S, h.l) < 0 && (b = oa(ro(G(oa(h.l)), y)), x = n + b, S = G(x)), U(S, h.l) < 0) throw Error("Exact float window could not represent a contained start");
	let C = G(r), w = U(h.r, C) <= 0 ? h.r : C, T = ro(G(sa(w)), S), E = sa(U(T, g) > 0 ? T : g);
	if (U(G(x + E), w) > 0) throw Error("Exact float window could not represent a contained end");
	return {
		topY: e,
		xOffset: b,
		maxWidth: E
	};
}
function wo(e, t) {
	return no(io(e.exact.slope, G(t)), e.exact.intercept);
}
function To(e, t) {
	return U(e.exact.slope, t.exact.slope) === 0 && U(e.exact.intercept, t.exact.intercept) === 0;
}
function Eo(e, t, n) {
	return U(wo(e, n), wo(t, n)) || U(e.exact.slope, t.exact.slope);
}
function Do(e, t, n) {
	let r = ro(e.slope, t.slope);
	if (r.numerator === 0n) return null;
	let i = ro(e.intercept, t.intercept);
	return ao(ro(G(n), i), r);
}
function Oo(e, t, n, r, i) {
	t === null || U(t, G(n)) <= 0 || U(t, G(r)) >= 0 || (e.push(oa(t)), i && (i.localRootCandidateCount += 1));
}
function ko(e, t, n, r, i, a) {
	let o = e[0];
	for (let r of e.slice(1)) {
		let e = Eo(r, o, n);
		(t === "min" && e < 0 || t === "max" && e > 0) && (o = r);
	}
	let s = o.square;
	for (let c of e) if (c !== o) {
		if (To(c, o)) {
			s &&= c.square;
			continue;
		}
		(t === "min" ? U(c.exact.slope, o.exact.slope) < 0 : U(c.exact.slope, o.exact.slope) > 0) && Oo(i, Do(c.exact, o.exact, 0), n, r, a);
	}
	return {
		exact: o.exact,
		square: s
	};
}
function Ao(e, t = !1) {
	return {
		exact: {
			slope: {
				numerator: 0n,
				denominator: 1n
			},
			intercept: G(e)
		},
		square: t
	};
}
function jo(e, t, n, r, i, a, o, s, c) {
	let { rect: l, polygon: u } = e, d = G(oo(n, r));
	if (U(no(d, G(t)), G(l.yTop)) <= 0 || U(d, G(l.yBottom)) >= 0) return [];
	let f = u ? Na(u, t, n, r).map((e) => ({
		left: {
			exact: e.left,
			square: !1
		},
		right: {
			exact: e.right,
			square: !1
		}
	})) : [{
		left: Ao(l.xLeft, !0),
		right: Ao(l.xRight, !0)
	}];
	if (f.length === 0) return [];
	let p = ko(f.map((e) => e.left), "min", n, r, s, c), m = ko(f.map((e) => e.right), "max", n, r, s, c);
	switch (u?.kind === "tight" && (f = [{
		left: p,
		right: m
	}]), vo(e, o)) {
		case "left": return [{
			left: p,
			right: Ao(a)
		}];
		case "right": return [{
			left: Ao(i),
			right: m
		}];
		case "bothSides": return f;
	}
}
function Mo(e, t, n, r, i) {
	let a = e.slice().sort((e, n) => Eo(e.left, n.left, t) || Eo(e.right, n.right, t));
	for (let e = 0; e + 1 < a.length; e += 1) Oo(r, Do(a[e].left.exact, a[e + 1].left.exact, 0), t, n, i);
	let o = [];
	for (let e of a) {
		let a = o.at(-1);
		if (!a) {
			o.push(e);
			continue;
		}
		if (Oo(r, Do(e.left.exact, a.right.exact, 0), t, n, i), Eo(e.left, a.right, t) > 0) {
			o.push(e);
			continue;
		}
		let s = ko([a.right, e.right], "max", t, n, r, i), c = To(a.left, e.left) ? {
			exact: a.left.exact,
			square: a.left.square && e.left.square
		} : a.left;
		o[o.length - 1] = {
			left: c,
			right: s
		};
	}
	return o;
}
function No(e, t, n, r, i, a, o, s, c, l, u, d) {
	let f = G(oo(e, t)), p = no(f, G(n));
	if (a.floats.some(({ rect: e }) => e.mode === "topAndBottom" && lo(e, o, s) && U(p, G(e.yTop)) > 0 && U(f, G(e.yBottom)) < 0)) return null;
	let m = [], h = [];
	for (let o of a.floats) {
		let { rect: a } = o;
		a.mode === "square" && lo(a, r, i) && h.push(...jo(o, n, e, t, r, i, c, m, d));
	}
	if (h.length === 0) return null;
	let g = Mo(h, e, t, m, d), _ = Ao(r), v = Ao(i), y = [], b = (n, r, i) => {
		let a = {
			slope: ro(r.exact.slope, n.exact.slope),
			intercept: ro(r.exact.intercept, n.exact.intercept)
		};
		y.push({ exactWidth: a });
		let o = Math.max(1, i ? u : l);
		U(no(io(a.slope, G(e)), a.intercept), G(o)) < 0 && a.slope.numerator > 0n && Oo(m, Do(r.exact, n.exact, o), e, t, d);
	}, x = _;
	for (let e of g) b(x, e.left, x.square || e.left.square), x = e.right;
	b(x, v, x.square);
	let S = y[0];
	for (let t of y.slice(1)) (U(no(io(t.exactWidth.slope, G(e)), t.exactWidth.intercept), no(io(S.exactWidth.slope, G(e)), S.exactWidth.intercept)) || U(t.exactWidth.slope, S.exactWidth.slope)) > 0 && (S = t);
	if (S) for (let n of y) n === S || U(n.exactWidth.slope, S.exactWidth.slope) <= 0 || Oo(m, Do(n.exactWidth, S.exactWidth, 0), e, t, d);
	return m.length === 0 ? null : Math.min(...m);
}
function Po(e, t, n, r, i, a, o = r, s = r + i, c = {
	xLeftPt: r,
	xRightPt: r + i,
	readingDirection: "ltr"
}, l = t, u = null) {
	let d = r, f = r + i, p = bo(n, a);
	if (u) {
		u.structuralEventCount = p.length;
		for (let { polygon: e } of a.floats) e && (u.compiledIntersectionCount += e.intersectionCount, u.compiledContourSpanCount += e.contourSpans.length, u.compileOrderComparisonCount += e.compileOrderComparisonCount, u.compilePairMembershipVisitCount += e.compilePairMembershipVisitCount);
	}
	let m = (e) => (u && (u.evaluatedYCount += 1), Co(e, n, d, f, i, a, o, s, c, t, l)), h = m(e);
	if (h) return h;
	let g = e, _ = p.findIndex((e) => e > g);
	for (; _ >= 0 && _ < p.length;) {
		let e = p[_], r = No(g, e, n, d, f, a, o, s, c, t, l, u);
		if (r !== null) {
			u && (u.localRootEventCount += 1);
			let e = m(r);
			if (e) return e;
			g = r;
			continue;
		}
		let i = m(e);
		if (i) return i;
		g = e;
		do
			_ += 1;
		while (_ < p.length && p[_] <= g);
	}
	throw Error("Finite float line-window event sweep found no usable terminal Y");
}
function Fo(e, t, n, r, i, a, o = r, s = r + i, c = {
	xLeftPt: r,
	xRightPt: r + i,
	readingDirection: "ltr"
}, l = t) {
	return Po(e, t, n, r, i, a, o, s, c, l);
}
function Io(e, t, n, r) {
	let i = /* @__PURE__ */ new Set();
	for (;;) {
		let a = e;
		for (let i of t) i.mode === "topAndBottom" && lo(i, n, r) && e >= i.yTop && e < i.yBottom && (a = Math.max(a, i.yBottom));
		if (a === e) return e;
		if (!Number.isFinite(a) || a < e || i.has(a)) throw Error("Top-and-bottom solver violated strictly increasing finite-bottom progress");
		i.add(a), e = a;
	}
}
//#endregion
//#region packages/docx/src/layout/math-fallback-text.ts
var Lo = new Set([
	"+",
	"-",
	"−",
	"=",
	"±",
	"×",
	"÷"
]);
function Ro(e) {
	return Lo.has(e) ? ` ${e} ` : e;
}
function K(e) {
	return e.map((e) => {
		switch (e.kind) {
			case "run": return Ro(e.text);
			case "fraction": return `${K(e.num)}/${K(e.den)}`;
			case "sup": return `${K(e.base)}^${K(e.sup ?? [])}`;
			case "sub": return `${K(e.base)}_${K(e.sub ?? [])}`;
			case "subSup": return `${K(e.base)}_${K(e.sub ?? [])}^${K(e.sup ?? [])}`;
			case "nary": return `${e.op}${K(e.sub ?? [])}${K(e.sup ?? [])}${K(e.body)}`;
			case "delimiter": return `${e.begChar}${e.items.map(K).join(",")}${e.endChar}`;
			case "radical": return `${e.index?.length ? K(e.index) : ""}√${K(e.radicand)}`;
			case "limit": return `${K(e.base)}${K(e.lower ?? [])}${K(e.upper ?? [])}`;
			case "array": return e.rows.map((e) => e.map(K).join(" ")).join(" ");
			case "groupChr": return `${e.char}${K(e.base)}`;
			case "bar":
			case "box":
			case "borderBox": return K(e.base);
			case "accent": return `${e.char}${K(e.base)}`;
			case "func": return `${K(e.name)}(${K(e.arg)})`;
			case "group": return K(e.items);
			case "phant": return e.show ? K(e.base) : "";
			case "sPre": return `${K(e.sub)}${K(e.sup)}${K(e.base)}`;
		}
	}).join("").replace(/[ \t]{2,}/g, " ");
}
//#endregion
//#region packages/docx/src/layout/convergence.ts
var zo = class extends H {
	reason;
	states;
	passes;
	constructor(e, t, n) {
		super("NON_CONVERGENCE", e === "cycle" ? `repeated exact-state cycle at ${t.at(-1) ?? "<missing>"}` : `hard exact-state pass limit ${n} reached`), this.name = "ExactConvergenceError", this.reason = e, this.states = Object.freeze([...t]), this.passes = n;
	}
};
function Bo(e) {
	let t = Vo({
		...e,
		step: function* (t, n) {
			return e.step(t, n);
		}
	}), n = t.next();
	for (; !n.done;) n = t.next();
	return n.value;
}
function* Vo(e) {
	let { seedState: t, step: n, stateOf: r, limit: i } = e, a = t === void 0 ? 2 : 1;
	if (!Number.isInteger(i) || i < a) throw RangeError(`Exact convergence limit must be an integer >= ${a}`);
	let o = t === void 0 ? [] : [t], s = new Set(o), c = null;
	for (let e = 1; e <= i; e += 1) {
		let t = yield* n(c, e), a = r(t), l = o.at(-1);
		if (o.push(a), l === a) return Object.freeze({
			value: t,
			passes: e
		});
		if (s.has(a)) throw new zo("cycle", o, e);
		if (s.add(a), e === i) throw new zo("limit", o, e);
		c = t;
	}
	throw new zo("limit", o, i);
}
function* Ho(e, t, n) {
	if (!Number.isInteger(n) || n < 1) throw new H("NON_CONVERGENCE", "limit must be a positive integer");
	try {
		return (yield* Vo({
			seedState: e.fingerprint,
			step: function* (n) {
				return yield* t(n ?? e);
			},
			stateOf: (e) => e.fingerprint,
			limit: n
		})).value;
	} catch (e) {
		throw e instanceof zo ? new H("NON_CONVERGENCE", e.reason === "cycle" ? `repeated geometry fingerprint cycle at ${e.states.at(-1) ?? "<missing>"}` : `hard iteration limit ${n} reached`) : e;
	}
}
//#endregion
//#region packages/docx/src/layout/line-wrap-convergence.ts
var Uo = class extends H {
	reason;
	states;
	constructor(e, t) {
		super("NON_CONVERGENCE", e === "cycle" ? `line wrap measure/resolve cycle did not converge (${t.length} states)` : `line wrap measure/resolve pass limit did not converge (${t.length} states)`), this.name = "LineWrapNonConvergenceError", this.reason = e, this.states = Object.freeze([...t]);
	}
};
function Wo(e) {
	return e.map((e) => ({ ...e }));
}
function Go(e, t) {
	return JSON.stringify(e.map((e, n) => ({
		end: e.consumedEnd,
		topY: e.topY,
		xOffset: e.xOffset,
		availableWidth: e.availWidth,
		probeHeight: t[n],
		segments: e.segments.map((e) => ({
			source: e.src,
			...e.text === void 0 ? {} : { text: e.text }
		}))
	})));
}
var Ko = 16;
function qo(e, t) {
	try {
		return Bo({
			step: (n) => {
				let r = e(n?.probeHeights ?? null), i = Object.freeze(r.map(t));
				return Object.freeze({
					lines: r,
					probeHeights: i,
					state: Go(r, i)
				});
			},
			stateOf: (e) => e.state,
			limit: Ko
		}).value.lines;
	} catch (e) {
		throw e instanceof zo ? new Uo(e.reason, e.states) : e;
	}
}
W({
	id: "word-opentype-features-compat-kerning",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/run-char-metrics-render.test.ts#enables absent-threshold kerning only under enableOpenTypeFeatures"
	},
	description: "[MS-DOCX] §2.3.3 stores enableOpenTypeFeatures as a named compatibility setting. When enabled, an unqualified run enables OpenType kerning; an explicit or style-resolved w:kern threshold remains authoritative. Both line measurement and paint use the same resolved threshold."
}), W({
	id: "word-numbering-marker-first-line-union",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "numbering-marker-font-size-line-box-matrix",
		application: "Microsoft Word",
		version: "16.113.2",
		platform: "macOS 27.0"
	},
	description: "In a non-grid paragraph with 1.15 automatic spacing, a text marker participates in the first-line ascent/descent union. Relative to a marker-free control, 8, 14, and 20 pt markers added 0, 1.68, and 7.68 pt to the line advance; changing the marker alone shifted subsequent paragraph baselines by the same amount. Added automatic leading follows the body text single-line height rather than scaling the taller marker box. Exact spacing, grids, ruby, wrapping floats, picture markers, and continuation lines are outside the measured scope."
}), W({
	id: "word-east-asian-grid-line-allocation",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "word-font-metrics-resource-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "Across eight East-Asian resources, six sizes, and no-grid/grid/useFELayout variants, Word allocated grid cells from the selected face line height, rounding up to whole pitches. A later controlled font-table intervention found that OS/2 code-page bits 17–20, rather than cmap/script alone, select the 1.3-times-hhea line box in Word for Mac. The grid-cell rule takes the resulting height as input; it does not itself classify the face. Mixed rFonts slots also prevent a family-wide Latin override."
}), W({
	id: "word-table-cell-ignores-grid-right-indent-adjustment",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "table-cell-adjust-right-indent-width-position-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "In the observed linesAndChars matrix, paragraphs inside fixed-width table cells retain the same line breaks for omitted (default true) and explicit-false w:adjustRightInd across four boundary widths and both left/right cell positions. Scope this Word-only exception to table-cell containers; ordinary body paragraphs retain the ECMA-376 §17.3.1.1 adjustment."
}), W({
	id: "word-snap-to-chars-east-asian-cell-fit",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "snap-to-chars-east-asian-cell-fit-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "For snapToChars, Word centers each East-Asian grapheme independently in the smallest whole number of character-pitch units that contains its natural advance. A grapheme that fits uses the one-unit placement described by [MS-OI29500] §2.1.534; an undersized authored pitch expands only that grapheme to additional units."
}), W({
	id: "word-snap-to-chars-script-block-allocation",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §2.1.534"
	},
	description: "Allocate snapToChars Latin text in contiguous blocks centered across the required grid units, complex-script blocks from their leading edge, and East-Asian graphemes independently by character cell."
});
function Jo(e, t) {
	return !(t > 0) || !Number.isFinite(e) ? 1 : Math.max(1, Math.ceil(Math.max(0, e) / t - 1e-9));
}
function Yo(e) {
	return !e;
}
W({
	id: "word-grid-right-indent-pitch-alignment",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "grid-right-indent-character-pitch-boundary-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "For body paragraphs whose ECMA-376 §17.3.1.1 adjustment is enabled on a linesAndChars character grid, Word reduces the physical line width to the greatest whole character-pitch multiple not exceeding the available width. The observed matrix covers exact and non-exact widths, zero and negative charSpace, explicit opt-out, line-only control, both physical indent sides, and the separately registered table-cell exception."
});
function Xo(e, t) {
	if (!(t > 0) || !Number.isFinite(e) || e <= 0) return 0;
	let n = (e % t + t) % t, r = 1e-9;
	return n <= r || t - n <= r ? 0 : n;
}
W({
	id: "word-hanging-tab-same-position-precedence",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "hanging-indent-authored-tab-collision-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "When the implicit tab created by a hanging indent shares its coordinate with an authored center, end, or start stop, Word resolves one advancing stop at that coordinate using the authored alignment. An authored bar remains an independent drawing rule, so the implicit advancing stop survives beside it. If center/end alignment would place following text before the current pen, the tab contributes zero advance."
});
function Zo(e) {
	return e !== "bar" && e !== "clear";
}
W({
	id: "word-rtl-decimal-tab-physical-alignment",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "rtl-decimal-tab-run-boundary-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "For LTR numeric cells embedded in a bidi paragraph, Word aligns the physical left edge of the first halfwidth period to the decimal stop across source-run boundaries. When no period exists, it aligns the numeric cell's physical right edge to the stop."
}), W({
	id: "word-decimal-tab-separator-resolution",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §2.1.556"
	},
	description: "Use the first explicit halfwidth period as the decimal-tab alignment point; when absent, use the implicit separator after the final digit of the first Unicode decimal-number sequence."
}), W({
	id: "word-use-fe-layout-inherited-grid-minimum",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "use-fe-layout-visible-script-grid-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "With useFELayout enabled, a visible Latin line with a resolved eastAsia font axis participates in Far East grid metrics even when w:rFonts@hint is absent; inherited automatic spacing keeps the larger of its whole-cell design allocation and one grid pitch multiplied by the inherited spacing value."
}), W({
	id: "word-use-fe-layout-empty-mark-grid-allocation",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "use-fe-layout-empty-mark-grid-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "With useFELayout enabled, a content-less paragraph mark participates in Far East whole-cell document-grid allocation even when the document contains no literal East Asian text. Its face-specific Far East design height governs the cell count; exact spacing and snapToGrid=false remain the document-grid overrides named by ECMA-376 §17.6.5. Observed Word output gives signed atLeast spacing a discontinuous boundary on an active grid: negative values use their absolute magnitude as the mark advance, zero keeps the ordinary atLeast-zero advance regardless of inheritance source, and positive values retain whole-cell allocation."
});
function Qo(e) {
	let { ordinaryAdvancePx: t, allocatedGridAdvancePx: n, atLeastZeroAdvancePx: r, lineSpacing: i, gridAllocationActive: a, scale: o } = e;
	return a ? i?.rule === "atLeast" && i.value < 0 ? Math.abs(i.value) * o : i?.rule === "atLeast" && i.value === 0 ? r : i?.rule === "exact" ? t : Math.max(t, n) : t;
}
W({
	id: "word-contiguous-underline-geometry",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/paragraph.test.ts#keeps a solid underline continuous across floating-precision retained run seams"
	},
	description: "Adjacent compatible underlined source runs share one safe baseline and continuous authored cadence while style, color, and thickness boundaries remain distinct."
}), W({
	id: "word-grid-at-least-tall-line-unsnapped",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/line-box-height.test.ts#does not round tall East Asian content up to an additional grid cell"
	},
	description: "An explicitly authored atLeast line on an active document grid keeps the maximum of its natural height, authored minimum, and one pitch instead of rounding tall content to another whole cell."
}), W({
	id: "word-degenerate-line-spacing-single",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-DOC] §2.9.146"
	},
	description: "Preserve a non-collapsing single-line fallback for exact or automatic line spacing at or below zero, consistent with the native LSPD representation."
}), W({
	id: "word-auto-multiple-baseline-pin",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "auto-multiple-baseline-pin",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "Paint a positive automatic line-spacing multiplier with its glyph baseline pinned inside the single design line, placing extra leading or compressed overflow toward block-end; this is draw-only and does not replace the centered trailing-mark pagination metric."
}), W({
	id: "word-mixed-anchor-visible-line-metrics",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/anchor-host-metrics.test.ts#reserves host line height without using its zero-ink box for a visible run baseline"
	},
	description: "A zero-ink drawing anchor host reserves its line and grid height while visible neighboring glyphs retain their own ascent, descent, and design-line baseline."
}), W({
	id: "word-justification-leading-indent-exclusion",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/text-distribute.test.ts#forwards (segs, slack, firstContentSi, lastDrawnSi) positionally"
	},
	description: "Keep leading whitespace used as a first-line text indent fixed while distributing justified-line slack across content in a left-to-right line."
}), W({
	id: "word-justified-candidate-separator-fit",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/justify-shrink-overshoot.test.ts#counts a candidate trailing space when the prospective line will justify"
	},
	description: "On a full paragraph-width line that will be fully justified, include the candidate word separator in its wrap-fit width; lines narrowed by DrawingML wrap exclusions retain collapsible line-end separator fit behavior."
}), W({
	id: "word-overflow-punctuation-language-sets",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OE376] §2.1.56"
	},
	description: "Apply the language-specific punctuation sets documented for Word in [MS-OE376] §2.1.56 to Chinese, Japanese, and Korean language runs, and let overflowPunct override kinsoku when both rules affect the same character. When an effective East Asian language is absent, content that actually selects the East Asian script path retains the union as a bounded fallback."
}), W({
	id: "word-overflow-punctuation-latin-parent-run",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "latin-ascii-punctuation-advance-boundary-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "Although [MS-OE376] §2.1.56 presents concrete punctuation sets by CJK language, Office-produced Latin boundary controls admit `.` and `,` beyond the ordinary word-fit extent. Controls at 9 and 14 points in Calibri and Arial instead wrap `)` and `}` with the word at the measured advance boundary; 10-point controls also wrap `!`, `%`, `:`, `;`, `>`, `?`, and `]`. Complex-script segments with no explicit RTL-primary bidi language retain their separate observed fallback; an explicit `ar-SA` bidi language is its counterexample."
}), W({
	id: "word-full-width-character-spacing-scope",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OE376] §2.1.562"
	},
	description: "Interpret ST_CharacterSpacing as applying whitespace compression to full-width punctuation characters. This rule establishes only which characters are eligible; it does not define a universal compression amount."
}), W({
	id: "word-japanese-punctuation-compression-cell",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "japanese-fullwidth-punctuation-compression-cell",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "In the observed Japanese compatibility matrix, 、。 ，． and the closing forms 」』】）］｝ on a full ideographic-cell advance retain at least half of that cell. U+3017 and full-width !/? remain full-cell. A fontTable w:pitch value classifies the authored face for font selection; it is not a switch for document-level characterSpacingControl. Punctuation that the selected face already exposes on a smaller proportional advance is retained as measured rather than compressed a second time. Tight adjacent glyph ink can require a larger retained extent to prevent collision. This is an Office-observed compression amount, not a normative interpretation of ST_CharacterSpacing."
}), W({
	id: "word-authored-character-spacing-pitch-priority",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "authored-character-spacing-punctuation-pitch",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "When a run authors a positive w:spacing character pitch, Word preserves that expanded pitch instead of additionally applying the document-level punctuation whitespace compression. Omitted, zero, or overlapping run spacing leaves characterSpacingControl active."
}), W({
	id: "word-source-run-space-sequence",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "source-run-space-sequence-wrap-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "At a source-run boundary, Word keeps a space-only continuation attached when the preceding run already ends in a space. A single leading space in a distinct run without a preceding space remains a break opportunity. This isolates source-boundary compatibility from the ordinary UAX #14 LB7 handling within one authored run."
}), W({
	id: "word-balanced-consecutive-space-cell",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "single-double-byte-width-space-grid-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "With ECMA-376 §17.15.3.3 balanceSingleByteDoubleByteWidth enabled, Word retains one ordinary inter-word U+0020 at its proportional natural advance, while a sequence of two or more authored U+0020 spaces advances each space by half of the selected East-Asian ideographic cell. The observed matrix covers one, two, four, and eight spaces; same-run and source-run boundaries; proportional and fixed-pitch faces; linesAndChars with negative/zero charSpace; and a line-only grid."
});
function $o(e) {
	return Number.isInteger(e) && e >= 2;
}
function es(e) {
	return e !== "snapToChars";
}
W({
	id: "word-balanced-lines-and-chars-grid-delta",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "single-double-byte-width-grid-observation-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "With balanceSingleByteDoubleByteWidth enabled on linesAndChars, Word applies half of the authored charSpace delta to ASCII SBCS text and to U+0020/U+3000 space characters, while applying the full delta to CJK ideographs and full-width ASCII forms. The Word-output evidence covers ASCII digits, letters, punctuation, spaces, CJK, full-width ASCII, mixed text, proportional/fixed-pitch faces, negative/zero/positive charSpace, and line-only controls. Non-ASCII high-ANSI and complex-script text are outside the observed matrix and retain the preexisting grid behavior."
}), W({
	id: "word-latin-interword-xavg-floor",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "latin-space-os2-xavg-one-twip-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "For left-aligned homogeneous Latin words using one U+0020 separator and characterSpacingControl=compressPunctuation, Word reduces each natural inter-word space only as far as half the selected static face's positive OS/2 xAvgCharWidth. First-fit and beta-origin controls varied only U+0020 hmtx, then only xAvg, with fixed outlines and non-space advances at 8/11/16pt; a distinct Carlito outline provided a counterexample where natural U+0020 was narrower than the floor. Two-gap controls showed equal required-deficit allocation. A one-twip linesAndChars control preserved the xAvg-dependent deficit while moving both control and natural boundaries by the separate character-grid pitch. [MS-OE376] §2.1.472 documents lineWrapLikeWord6 as an explicit uncompressed-fit override. Mixed faces, explicit run spacing or scaling, justification, and snapToChars remain outside the observed scope."
}), W({
	id: "word-ideographic-space-line-end-allowance",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "ideographic-space-line-end-count-and-run-boundary-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "Word keeps a single U+3000 immediately following visible East-Asian text on that line when the visible glyph is force-fitted into a narrow table cell. A paragraph-final sequence of two or more U+3000 characters remains authored width-bearing content and may form blank continuation lines. The observed matrix covers single and trailing multiple spaces, linesAndChars with negative/positive charSpace, line-only grids, and snapToGrid opt-out."
});
function ts(e, t) {
	return e && t === 1 ? 1 : 0;
}
function ns(e, t) {
	if (t !== "complexScript") return e.length > 0 && [...e].every((e) => e === " " || e === "　") ? .5 : t === "eastAsia" ? 1 : [...e].every((e) => (e.codePointAt(0) ?? 128) <= 127) ? .5 : void 0;
}
function rs(e) {
	let t = Math.max(0, e.punctuationAdvancePt), n = Math.max(0, e.ideographicCellAdvancePt);
	return t < n ? t : Math.min(t, Math.max(0, e.punctuationInkEndPt, n / 2));
}
function is(e) {
	return e === void 0 || e <= 0;
}
function as(e, t) {
	return e.endsWith(" ") && t.startsWith(" ");
}
var os = {
	ja: new Set([...",.’”、。」』】），．］｝｡､"]),
	zhHans: new Set([..."!%),.:;>?]}¢°·ˇ’”‰′″℃∶、。〃〉》」』】〗〕〞﹚﹜﹞！＂％＇），．：；？］｝￠"]),
	zhHant: new Set([..."!),.:;?]}’”′、。〉》」』】〕〞﹚﹜﹞！），．：；？］｝"]),
	ko: new Set([..."!%),.:;?]}¢°’”′″℃〉》」』】〕！％），．：；？］｝￠"])
}, ss = new Set([
	...os.ja,
	...os.zhHans,
	...os.zhHant,
	...os.ko
]), cs = new Set([".", ","]), ls = new Set([
	"ar",
	"fa",
	"ur",
	"he",
	"iw",
	"yi",
	"ji",
	"ps",
	"sd",
	"ug",
	"dv",
	"syr",
	"ckb"
]);
function us(e, t, n = !1, r = !1, i = !1, a) {
	let o = t?.toLowerCase();
	if (o?.startsWith("ja")) return os.ja.has(e);
	if (o?.startsWith("ko")) return os.ko.has(e);
	if (o?.startsWith("zh")) return (/(?:^|-)(?:tw|hk|mo)(?:-|$)|hant/u.test(o) ? os.zhHant : os.zhHans).has(e);
	let s = a?.split("-")[0].toLowerCase(), c = s != null && ls.has(s);
	return n || i && !c ? ss.has(e) : r && cs.has(e);
}
function ds(e) {
	return e.lineWillJustify && e.wrapNarrowed !== !0 ? e.widthPx : e.widthPx - e.trailingSpacePx;
}
W({
	id: "word-ruby-paragraph-uniform-line-advance",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/paragraph-measure.test.ts#uses one uniform snapped advance for every line in a ruby paragraph"
	},
	description: "Every line in a ruby-bearing paragraph uses the paragraph-wide maximum snapped line advance so its baseline rhythm remains uniform."
}), W({
	id: "word-fit-text-inter-character-expansion",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/fit-text.test.ts#distributes (val − Σnatural)/(n−1) as the inter-character gap, no trailing gap"
	},
	description: "Expand a multi-character fitText region to its authored width by distributing the residual evenly across interior character gaps."
}), W({
	id: "word-cjk-both-inter-character-expansion",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/text-distribute.test.ts#§17.18.44: fills a wrapped pure-CJK line via inter-CJK pitch (expansion default)"
	},
	description: "Treat inter-CJK boundaries as eligible inter-word gaps when expanding a non-final both-justified line that contains no spaces."
}), W({
	id: "word-thai-distribute-cluster-policy",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/thai-distribute.test.ts#fills non-final lines to the right margin under thaiDistribute"
	},
	description: "Expand non-final thaiDistribute lines at Thai grapheme-cluster boundaries while retaining a natural-width final line."
}), W({
	id: "word-numeric-decimal-tab-inference",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/decimal-tab-autoalign.test.ts#right-aligns numbers of different digit counts at the decimal tab"
	},
	description: "Right-align an otherwise tab-less numeric paragraph at its leading decimal tab while leaving non-numeric and no-decimal-tab paragraphs unchanged."
}), W({
	id: "word-numbering-marker-overflow-tab-advance",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/numbered-marker-tab-advance.test.ts#advances the body past the marker to the next tab stop, not onto indentLeft"
	},
	description: "When a numbering marker overruns its hanging-indent budget, advance the body to the next reachable tab stop beyond the marker edge."
}), W({
	id: "word-numbering-suffix-coincident-list-tab",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/numbering-marker.test.ts#keeps a suffix tab on the list stop coincident with the marker end"
	},
	description: "For the tab synthesized by a numbering suffix, accept an authored numeric list tab coincident with the shaped marker end instead of advancing to the next automatic tab stop."
}), W({
	id: "word-numbering-marker-paragraph-mark-fallback",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "numbering-marker-paragraph-mark-formatting",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "When numbering-level rPr omits a marker formatting axis, Word takes that axis from the effective paragraph-mark rPr rather than a content run. A numbering-level concrete value or explicit auto remains authoritative, and body and text-box stories use the same cascade."
});
function fs(e, t) {
	return t.alignment === "num" && Math.abs(t.pos - e) <= 1e-6;
}
W({
	id: "word-tab-stop-page-edge-clamp",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/rtl-tab-stops.test.ts#pins a page number to the left text margin when the stop is past it"
	},
	description: "Clamp content assigned to a tab stop beyond the trailing text edge back onto that edge instead of placing ink outside the page content band."
}), W({
	id: "word-dictionary-sea-atomic-chunk",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/sea-justified-fit.test.ts#Rule 2: a no-space chunk that fits a full line moves whole instead of splitting"
	},
	description: "Move a glued dictionary Southeast-Asian chunk to a fresh line whole when it fits that full line, using dictionary breaks only when the chunk itself is overlong."
}), W({
	id: "word-overlong-token-emergency-break",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/run-inline-formatting.test.ts#breaks a no-space token wider than the line at the character level"
	},
	description: "Emergency-break an overlong token at grapheme-safe character boundaries on an empty line so the complete token remains inside the content band."
}), W({
	id: "word-external-link-syntax-breaks",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "external-link-syntax-formatting-seam-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "Treat readable separators in the path and query of displayed external URLs as line-break opportunities, while keeping the scheme and authority intact and preserving authored no-break hyphens and grapheme clusters."
});
function ps(e, t, n) {
	let r = /^[A-Za-z][A-Za-z0-9+.-]*:\/\//u.exec(e);
	if (!r) return [];
	let i = r[0].length, a = e.slice(i).search(/[/?#]/u), o = a < 0 ? e.length : i + a, s = [];
	for (let r = o; r < e.length; r += 1) {
		let i = e[r], a = r + 1;
		(i === "/" && r > o || i === "-" || i === "?" || i === "&") && t.has(a) && !n.has(a) && s.push(a);
	}
	return s;
}
W({
	id: "word-run-vertical-align-baseline-shift",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/run-char-metrics-render.test.ts#w:vertAlign raises superscript, lowers subscript, and leaves ordinary baselines unchanged"
	},
	description: "Retain the established run-level baseline displacement for vertically aligned text: superscript rises by 0.35 of its authored font size and subscript falls by 0.15, while the separately authored w:position remains additive."
}), W({
	id: "word-uniform-run-position-leading",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "uniform-run-position-leading",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "When every metric-bearing item on a line has the same non-zero w:position, Word places the allocated line box around the positioned glyphs. A line containing a differently-positioned item retains the full relative displacement; automatic line allocation is handled separately."
});
function ms(e, t) {
	return t === 0 ? e : e - t / 2;
}
function hs(e, t) {
	return e === "super" ? t * .35 : e === "sub" ? -t * .15 : 0;
}
var gs = et;
W({
	id: "word-inline-picture-auto-leading",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "inline-picture-auto-leading-height-matrix",
		application: "Microsoft Word",
		version: "16.113.2",
		platform: "macOS 27.0"
	},
	description: "For an inline picture with automatic spacing at or above one line, add the authored leading of the selected text/paragraph-mark face to the natural picture/text baseline union, rather than multiplying the picture height. Image-only, text-only and alternating 28.35pt-picture controls at line=240/259 and exact=259 distinguish the two advances; earlier Word controls covered picture heights 5–255pt at auto multiples 1, 1.079 and 1.15. Exact spacing and non-picture lines retain their own allocation."
});
function _s(e, t, n) {
	return e + t * (n - 1);
}
function vs(e) {
	return $e(e);
}
function ys(e, t) {
	return t > 0 ? Math.max(1, Math.ceil(e / t)) : 1;
}
function bs(e, t) {
	return e > 0 ? e : t * gs;
}
function xs(e, t, n) {
	return Math.max(e, t * n);
}
function Ss(e, t, n) {
	return Math.max(e, t, n);
}
function Cs(e, t) {
	return (e === "exact" || e === "auto") && t <= 0;
}
//#endregion
//#region packages/docx/src/reference-font-line-metrics.ts
var ws = typeof navigator < "u" ? /Mac/u.test(navigator.platform) ? "macos" : "other" : globalThis.process?.platform === "darwin" ? "macos" : "other", Ts = /* @__PURE__ */ new WeakMap();
function Es(e, t, n, r) {
	if (!e?.trim()) return [];
	let i = r === "macos" ? [
		["macos-system", "macos-supplemental"],
		["office-mac"],
		["published-open-font"]
	] : [
		["office-mac"],
		["macos-system", "macos-supplemental"],
		["published-open-font"]
	];
	for (let r of i) {
		let i = r.flatMap((r) => we(e, {
			source: r,
			weight: t,
			style: n
		}));
		if (i.length > 0) return i;
	}
	return [];
}
function Ds(e) {
	let t = Ts.get(e);
	if (t !== void 0) return t;
	let n = e.farEastCodePage == null ? null : vs({
		unitsPerEm: e.unitsPerEm,
		hheaAscent: e.hhea[0],
		hheaDescent: e.hhea[1],
		hheaLineGap: e.hhea[2],
		farEastCodePage: e.farEastCodePage
	}), r = n?.lineHeightRatio != null && n.designAscentRatio != null && n.designDescentRatio != null ? Object.freeze({
		lineHeightRatio: n.lineHeightRatio,
		designAscentRatio: n.designAscentRatio,
		designDescentRatio: n.designDescentRatio
	}) : null;
	return Ts.set(e, r), r;
}
function Os(e) {
	let t = e.map(Ds), n = t[0];
	if (!(!n || t.some((e) => !e || e.lineHeightRatio !== n.lineHeightRatio || e.designAscentRatio !== n.designAscentRatio || e.designDescentRatio !== n.designDescentRatio))) return n;
}
function ks(e, t = 400, n = "normal", r = ws) {
	return Os(Es(e, t, n, r));
}
function As(e, t = 400, n = "normal", r = ws) {
	let i = Es(e, t, n, r).map((e) => e.xAvgCharWidth != null && e.xAvgCharWidth > 0 ? e.xAvgCharWidth / e.unitsPerEm : void 0);
	return i[0] != null && i.every((e) => e === i[0]) ? i[0] : void 0;
}
W({
	id: "word-neutral-script-attachment",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/compatibility.test.ts#keeps neutral characters attached to the active script slice"
	},
	description: "Weak and neutral non-letter characters stay with the active complex-script slice instead of opening additional formatting segments."
}), W({
	id: "word-rtl-run-ambiguous-class-override",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/bidi-line.test.ts#keeps LTR word order for English text in rtl-marked runs"
	},
	description: "Model an rtl-marked run as a higher-level UAX #9 override for punctuation and symbols only, leaving whitespace and strong letters at their ordinary classes."
}), W({
	id: "word-rtl-complex-script-european-digits-an",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/bidi-line.test.ts#orders an AN-classified date as 2026-02-28"
	},
	description: "Classify European digits as Arabic Number within an Arabic or Hebrew complex-script run so UAX #9 preserves the compatible visual ordering of digit groups and separators."
}), W({
	id: "word-kashida-final-form-priority",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/kashida-priority.test.ts#uses the BaRa join (Beh->Yeh) over the final-letter join in بين"
	},
	description: "Apply the measured kashida final-letter priority classes only at a word-final following letter instead of copying the broader Qt final-form conditions."
}), W({
	id: "word-vertical-tu-corner-placement",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/vertical-text.test.ts#does NOT ink-centre a substituted Tu comma even when ink metrics are present"
	},
	description: "Keep a substituted vertical Tu comma or full stop at the font-designed upper-right cell position rather than ink-centering it geometrically."
});
var js = /[\p{P}\p{S}]/u;
function Ms(e) {
	return js.test(e);
}
function Ns(e, t) {
	return e === t;
}
function Ps(e) {
	return e !== null;
}
//#endregion
//#region packages/docx/src/line-layout.ts
var Fs = {
	shapedClusters: void 0,
	selectedFaceInkBounds: void 0,
	selectedFaceFontBox: void 0,
	snapGridClass: void 0,
	snapGridNaturalWidthPx: void 0,
	snapGridLeadingPadPx: void 0,
	snapGridTrailingPadPx: void 0,
	snapGridCellPitchPx: void 0
};
function Is(e, t, n, r, i, a = {}) {
	if (t != null) return t * n;
	if (!r?.ruby || !i) throw Error(`Ruby at ${e}pt without hpsRaise requires retained base and guide ink`);
	if (r.textLayoutService && r.textShapeRequest) {
		let e = r.textLayoutService.shape({
			...r.textShapeRequest,
			text: r.text,
			fontSizePt: Ai(r, n),
			measure: !0,
			clusterGeometry: !1
		}), t = r.textLayoutService.shape({
			...r.textShapeRequest,
			text: r.ruby.text,
			fontSizePt: r.ruby.fontSizePt * n,
			measure: !0,
			clusterGeometry: !1
		});
		if (e.inkBounds && t.inkBounds) return e.inkBounds.ascentPt + t.inkBounds.descentPt;
	}
	let o = i.font;
	try {
		i.font = Zs(r.bold, r.italic, Ai(r, n), r.fontFamily, a, r.fontRoute);
		let t = i.measureText(r.text);
		i.font = Zs(r.bold, r.italic, e * n, r.fontFamily, a, r.fontRoute);
		let o = i.measureText(r.ruby.text);
		if (Number.isFinite(t.actualBoundingBoxAscent) && Number.isFinite(o.actualBoundingBoxDescent)) return t.actualBoundingBoxAscent + o.actualBoundingBoxDescent;
	} finally {
		i.font = o;
	}
	throw Error("Ruby without hpsRaise requires retained base and guide ink");
}
var Ls = new Set([
	"sakkal majalla",
	"traditional arabic",
	"simplified arabic",
	"arabic typesetting",
	"univers next arabic",
	"noto naskh arabic",
	"noto sans arabic"
]), Rs = new Set([
	"sakkal majalla",
	"traditional arabic",
	"simplified arabic",
	"arabic typesetting",
	"noto naskh arabic"
]);
function zs(e) {
	return Ls.has(e.toLowerCase());
}
function Bs(e) {
	return e.map((e) => `"${e}"`).join(", ");
}
var Vs = ["Noto Naskh Arabic", "Noto Sans Arabic"];
function Hs(e, t) {
	let n = (e ?? t) && (e ?? t) !== "jp" ? Ce(e ?? t, "sans") : [
		"Noto Sans JP",
		"Hiragino Sans",
		"Meiryo",
		...Ce("jp", "sans").slice(1)
	];
	return e == null ? `${Bs([
		...s,
		"Arial",
		"Helvetica",
		"Liberation Sans",
		...n,
		...Vs
	])}, sans-serif` : `${Bs([
		...n,
		...Vs,
		...s
	])}, sans-serif`;
}
function Us(e, t) {
	let n = (e ?? t) && (e ?? t) !== "jp" ? Ce(e ?? t, "serif") : [
		"Yu Mincho",
		"YuMincho",
		"Hiragino Mincho ProN",
		"MS Mincho",
		"Noto Serif JP",
		...Ce("jp", "serif").slice(1)
	];
	return e == null ? `${Bs([
		...u,
		"Times New Roman",
		"Cambria",
		"Liberation Serif",
		...n,
		...Vs
	])}, serif` : `${Bs([
		...n,
		...Vs,
		...u
	])}, serif`;
}
var Ws = /* @__PURE__ */ new WeakMap(), Gs = /* @__PURE__ */ new WeakMap(), Ks = /* @__PURE__ */ new WeakMap();
function qs(e, t) {
	let n = Ks.get(e);
	if (!n) {
		n = /* @__PURE__ */ new Map();
		for (let [t, r] of Object.entries(e)) {
			let e = Tn(t);
			n.has(e) ? n.get(e) !== r && n.set(e, null) : n.set(e, r);
		}
		Ks.set(e, n);
	}
	return n.get(Tn(t)) ?? void 0;
}
function Js(e, t) {
	let n = e ?? {};
	return t && Object.keys(t).length > 0 && Gs.set(n, t), n;
}
function Ys(e, t = {}) {
	let n = Ws.get(t) ?? (() => {
		let e = /* @__PURE__ */ new Map();
		return Ws.set(t, e), e;
	})(), r = e ?? "\0null", i = n.get(r);
	if (i !== void 0) return i;
	let a = Xs(e, t, Gs.get(t));
	return n.set(r, a), a;
}
function Xs(e, t, n = {}, r) {
	if (!e || e === "sans-serif") return Hs(null, r);
	if (e === "serif") return Us(null, r);
	let i = r ? `"Courier New", ${Bs(Ce(r, "sans"))}, monospace` : "\"Courier New\", monospace";
	if (e === "monospace") return i;
	let a = `"${((e) => e.replace(/"/g, "\\\""))(e)}"`, o = e.toLowerCase(), c = C(e), u = qs(t, e);
	if (u && u !== "auto") switch (u) {
		case "roman": return `${a}, ${Us(c, r)}`;
		case "swiss": return `${a}, ${Hs(c, r)}`;
		case "modern":
			if (qs(n, e) === "fixed") return c == null ? `${a}, ${i}` : `${a}, ${Bs([...c === "jp" ? [
				"Yu Gothic",
				"YuGothic",
				"Hiragino Sans",
				"Meiryo",
				"Noto Sans JP"
			] : Ce(c, "sans"), "Courier New"])}, monospace`;
			break;
		default: break;
	}
	if (zs(e)) return Rs.has(o) ? r ? `${a}, "Noto Naskh Arabic", "Noto Sans Arabic", "Noto Serif", ${Hs(null, r).replace(/sans-serif$/, "serif")}` : `${a}, "Noto Naskh Arabic", "Noto Sans Arabic", "Noto Serif", "Noto Sans JP", "Hiragino Sans", serif` : r ? `${a}, "Noto Sans Arabic", "Noto Naskh Arabic", ${Hs(null, r)}` : `${a}, "Noto Sans Arabic", "Noto Naskh Arabic", "Noto Sans JP", "Hiragino Sans", sans-serif`;
	let d = l(e);
	if (d === "serif") return `${a}, ${Us(c, r)}`;
	if (d === "mono") return `${a}, ${i}`;
	if (c == null || c === "jp") {
		if (o.includes("meiryo") || e.includes("メイリオ")) return `${a}, "Meiryo UI", "Meiryo", ${Hs(c, r)}`;
		if (e.includes("游ゴシック") || /\byu\s*gothic\b/i.test(e) || o.includes("yugothic")) return `${a}, "Yu Gothic", "YuGothic", ${Hs(c, r)}`;
		if (o.includes("ipa")) return `${a}, "IPAexGothic", ${Hs(c, r)}`;
		if (o.includes("segoe")) return r ? `${a}, "Segoe UI", ${Hs(null, r)}` : `${a}, "Segoe UI", ${Bs([...Vs, ...s])}, sans-serif`;
	}
	return `${a}, ${Hs(c, r)}`;
}
function Zs(e, t, n, r, i = {}, a) {
	return a ? lt(a, n, e ? 700 : 400, t ? "italic" : "normal") : `${t ? "italic" : "normal"} ${e ? "bold" : "normal"} ${n}px ${Ys(r, i)}`;
}
function Qs(e, t, n = !1) {
	return (n ? e.resolvedEastAsianLineHeightRatio ?? e.resolvedLineHeightRatio ?? 0 : e.resolvedLineHeightRatio ?? 0) * t;
}
function $s(e, t, n = !1) {
	return (n ? e.resolvedEaFloorEastAsianLineHeightRatio ?? e.resolvedEaFloorLineHeightRatio ?? 0 : e.resolvedEaFloorLineHeightRatio ?? 0) * t;
}
function ec(e) {
	for (let t of e.runs) if (t.type === "text" || t.type === "field") return t.fontSize;
	return typeof e.defaultFontSize == "number" ? e.defaultFontSize : 10;
}
function tc(e, t = !1) {
	for (let t of e.runs) if (t.type === "text" || t.type === "field") return t.fontFamily;
	return t && e.defaultFontFamilyEastAsia ? e.defaultFontFamilyEastAsia : e.defaultFontFamily ?? null;
}
function nc(e, t) {
	return !e || e.charSpacePt == null || e.type !== "linesAndChars" && e.type !== "snapToChars" ? 0 : e.charSpacePt * t;
}
function rc(e) {
	let t = 0;
	for (let n of e) ji.test(n) && t++;
	return t;
}
function ic(e, t, n) {
	let r = nc(t, n);
	if (r === 0 || e.length === 0) return 0;
	let i = [...e];
	return t?.type === "linesAndChars" || rc(e) === i.length ? i.length * r : 0;
}
function ac(e, t, n) {
	return e.snapToCharacterGrid === !1 || t?.type === "snapToChars" ? 0 : t?.type === "linesAndChars" && e.widthBalanceGridDeltaFactor !== void 0 ? nc(t, n) * e.widthBalanceGridDeltaFactor : ic(e.text, t, n) === 0 ? 0 : nc(t, n);
}
function oc(e, t) {
	return e.fitTextPerGapPx === void 0 ? sc(e) * t : e.fitTextPerGapPx;
}
function sc(e) {
	return e.charSpacing ?? 0;
}
function cc(e) {
	return e.punctuationCompressions?.reduce((e, t) => e + t.adjustmentPt, 0) ?? 0;
}
function lc(e, t) {
	return uc(e, e.text, t);
}
function uc(e, t, n) {
	if (e.fitTextPerGapPx !== void 0 || e.tateChuYoko || !es(n?.type) || !e.widthBalanceSpaceSequence || e.widthBalanceSpaceAdjustmentPt === void 0) return 0;
	let r = 0;
	for (let e of t) e === " " && (r += 1);
	return r * e.widthBalanceSpaceAdjustmentPt;
}
function dc(e, t, n) {
	let r = e.punctuationCompressions?.filter((e) => e.end > t && e.end <= n).map((e) => Object.freeze({
		end: e.end - t,
		adjustmentPt: e.adjustmentPt
	}));
	return r && r.length > 0 ? Object.freeze(r) : void 0;
}
function fc(e, t, n) {
	let r = e.noBreakRanges?.filter((e) => e.start >= t && e.end <= n).map((e) => Object.freeze({
		start: e.start - t,
		end: e.end - t
	}));
	return r && r.length > 0 ? Object.freeze(r) : void 0;
}
function pc(e) {
	return new Set(e.noBreakRanges?.flatMap((e) => [e.start, e.end]) ?? []);
}
function mc(e, t, n = 0) {
	let r = pc(e);
	return [
		0,
		...P(e.text),
		e.text.length
	].filter((e, t, n) => n.indexOf(e) === t).filter((e) => e >= n && e <= t && !r.has(e)).at(-1) ?? 0;
}
function hc(e) {
	if (e.hardJoinPrev !== !0 || e.text.length === 0) return;
	let t = pc(e);
	return [...P(e.text), e.text.length].find((e) => e > 0 && !t.has(e)) ?? e.text.length;
}
function q(e, t, n) {
	return {
		punctuationCompressions: dc(e, t, n),
		noBreakRanges: fc(e, t, n),
		externalLinkBreakOffsets: gc(e, t, n)
	};
}
function gc(e, t, n) {
	let r = e.externalLinkBreakOffsets?.filter((e) => e > t && e < n).map((e) => e - t);
	return r && r.length > 0 ? Object.freeze(r) : void 0;
}
function _c(e, t) {
	if (!e.textLayoutService || !e.textShapeRequest || t.length === 0) return;
	let n = e.textLayoutService.shape({
		...e.textShapeRequest,
		text: t,
		measure: !0,
		clusterGeometry: !1
	});
	if (n.horizontalInkBoundsAreTight !== !0 || !n.inkBounds || !Number.isFinite(n.advancePt) || !Number.isFinite(n.inkBounds.xMinPt) || !Number.isFinite(n.inkBounds.xMaxPt)) return;
	let r = e.charScale ?? 1;
	return {
		advancePt: n.advancePt * r,
		xMinPt: n.inkBounds.xMinPt * r,
		xMaxPt: n.inkBounds.xMaxPt * r
	};
}
function vc(e) {
	if (!e.textLayoutService || !e.textShapeRequest || e.text.length === 0) return;
	let t = e.textLayoutService.shape({
		...e.textShapeRequest,
		text: e.text,
		measure: !0,
		clusterGeometry: !0
	});
	if (!t.clusters?.length) return;
	let n = e.charScale ?? 1, r = /* @__PURE__ */ new Map();
	for (let e of t.clusters) {
		if (!Number.isFinite(e.advancePt)) return;
		r.set(e.range.end, e.advancePt * n);
	}
	return r;
}
function yc(e) {
	let t, n = /* @__PURE__ */ new Map();
	for (let r of e) {
		if (!("text" in r) || r.verticalRun) {
			t = void 0;
			continue;
		}
		let e = r, i = e.punctuationCompressions ?? [], a = new Map(i.map((e, t) => [e.end, t])), o = i.length > 0 ? vc(e) : void 0, s = [
			0,
			...P(e.text),
			e.text.length
		];
		for (let r = 0; r < s.length - 1; r += 1) {
			let i = s[r], c = s[r + 1];
			if (c <= i) continue;
			let l = a.get(c), u = t || l !== void 0 ? _c(e, e.text.slice(i, c)) : void 0;
			if (t && u) {
				let e = n.get(t.segment) ?? t.segment.punctuationCompressions.map((e) => ({ ...e })), r = e[t.compressionIndex], i = Math.max(0, t.ink.advancePt + r.adjustmentPt), a = Math.min(0, i - t.contextualAdvancePt), o = Math.min(0, t.ink.xMaxPt - u.xMinPt - t.contextualAdvancePt), s = Math.max(r.adjustmentPt, a, o);
				s !== r.adjustmentPt && (e[t.compressionIndex] = {
					end: r.end,
					adjustmentPt: s
				}, n.set(t.segment, e));
			}
			t = l !== void 0 && u ? {
				segment: e,
				compressionIndex: l,
				ink: u,
				contextualAdvancePt: o?.get(c) ?? u.advancePt
			} : void 0;
		}
	}
	for (let [e, t] of n) e.punctuationCompressions = Object.freeze(t.map((e) => Object.freeze(e)));
}
function bc(e) {
	return e.charScale ?? 1;
}
function xc(e, t, n, r, i) {
	return e * r + [...t].length * n + [...t].length * i;
}
function Sc(e, t, n) {
	return e.fitTextPerGapPx === void 0 ? ac(e, t, n) + oc(e, n) : e.fitTextPerGapPx;
}
function Cc(e, t, n, r) {
	if (e.fitTextPerGapPx !== void 0) {
		let n = [...e.text].length, r = e.fitTextRegionEnd ? Math.max(0, n - 1) : n;
		return t * bc(e) + r * e.fitTextPerGapPx + (e.fitTextTrailingPadPx ?? 0);
	}
	if (e.tateChuYoko) return e.fontSize * r;
	let i = ac(e, n, r);
	return xc(t, e.text, i, bc(e), oc(e, r)) + lc(e, n) * r * bc(e) + cc(e) * r;
}
function wc(e, t) {
	return t?.type !== "snapToChars" || !t.characterPitchPt || t.characterPitchPt <= 0 || e.snapToCharacterGrid === !1 || e.metricOnly || e.fitTextRegionIndex !== void 0 || e.tateChuYoko ? null : e.script === "eastAsia" ? "eastAsia" : e.script === "complexScript" ? "complexScript" : "latin";
}
function Tc(e, t, n, r = 1) {
	return !(n > 0) || !Number.isFinite(e) ? e : t === "eastAsia" ? Math.max(1, r) * n : Math.max(1, Math.ceil(Math.max(0, e) / n - 1e-9)) * n;
}
function Ec(e) {
	return !e || !e.linePitchPt || e.linePitchPt <= 0 ? !1 : e.type === "lines" || e.type === "linesAndChars" || e.type === "snapToChars";
}
function Dc(e, t) {
	return ys(e, t);
}
function Oc(e, t) {
	return bs(e, t);
}
function kc(e, t, n, r, i, a, o = 0, s = !1, c, l, u, d = 0) {
	let f = t + n, p = Math.max(f, o), m = Ec(i), h = m ? i.linePitchPt * r : 0, g = () => s ? a ? Math.max(h, Math.ceil(f / h) * h) : Dc(c ?? (o > 0 ? o : l === void 0 ? h : Oc(0, l)), h) * h : Math.max(p, h), _ = e !== null && e.explicit !== !0;
	if (!e || Cs(e.rule, e.value)) return m ? g() : p;
	if (e.rule === "auto") {
		if (m) {
			if (_) {
				let t = g();
				return s ? xs(t, h, e.value) : t;
			}
			return Math.max(p, h * e.value);
		}
		return d > 0 && e.value >= 1 ? _s(p, d, e.value) : u ? u.normalSinglePx * e.value + Math.max(0, u.positionPx - u.designDescentPx) : p * e.value;
	}
	if (e.rule === "exact") return e.value * r;
	if (e.rule === "atLeast") {
		let t = m ? a || _ ? g() : h : 0;
		return Ss(p, e.value * r, t);
	}
	return p;
}
function Ac(e, t) {
	return {
		asc: e * t * .8,
		desc: e * t * .2
	};
}
function jc(e, t) {
	return {
		ascent: e.fontBoundingBoxAscent ?? e.actualBoundingBoxAscent ?? t * .8,
		descent: e.fontBoundingBoxDescent ?? e.actualBoundingBoxDescent ?? t * .2
	};
}
var Mc = 200, Nc = 1e3, Pc = /* @__PURE__ */ new WeakMap();
function Fc(e, t, n, r, i, a, o) {
	if (n?.scope !== "native" || !r) return null;
	let s = "";
	for (let e of o) if (!/\s/u.test(e)) {
		s = e;
		break;
	}
	if (!s) return null;
	let c = Pc.get(e);
	c || (c = /* @__PURE__ */ new WeakMap(), Pc.set(e, c));
	let l = c.get(t);
	l || (l = /* @__PURE__ */ new Map(), c.set(t, l));
	let u = JSON.stringify([
		n.fingerprint,
		r,
		i,
		a,
		s
	]);
	if (l.has(u)) return l.get(u) ?? null;
	let d = mt(e, r, {
		text: s,
		emPx: Mc,
		weight: i,
		style: a
	}), f = d === null ? null : mt(e, r, {
		text: s,
		emPx: Nc,
		weight: i,
		style: a
	}), p = d !== null && f !== null && Math.abs(d - f) <= 2 / Mc + 2 / Nc ? f : null;
	return l.size >= 128 && l.clear(), l.set(u, p), p;
}
function Ic(e, t, n, r, i = !1, a, o = {}, s = e.lineSpacing, c = {}, l, u, d = !1) {
	let f = u, p = i || f?.fontHint === "eastAsia", m = f?.complexScript === !0, h = f?.fontSizePt ?? ec(e), g = tc(e, p), _ = f?.weight ?? 400, v = f?.style ?? "normal", y = p ? "あ" : "x", b, x = s?.rule !== "exact", S = g, C, w, T, E = null;
	if (l) {
		let n = _ >= 600, r = v === "italic", i = f?.fonts.ascii ?? e.defaultFontFamily ?? g, s = l.shape({
			text: y,
			fontSizePt: h * t,
			fonts: f?.fonts ?? {
				ascii: i,
				highAnsi: i,
				eastAsia: e.defaultFontFamilyEastAsia ?? i,
				complexScript: i
			},
			themeFonts: f?.themeFonts,
			themeFontPresence: f?.themeFontPresence,
			weight: n ? 700 : 400,
			style: r ? "italic" : "normal",
			complexScript: m,
			fontHint: f?.fontHint,
			eastAsiaLanguage: f?.eastAsiaLanguage,
			kerning: f?.kerning,
			measure: !0
		}), c = s.spans[0]?.font;
		b = c ? dl(ul(l.fontMetrics ?? l.localMetrics), c, y) : void 0, !x && b?.designAscentRatio != null && (b = void 0), T = x && !b && ml(c) ? ks(c.requestedFamily, c.weight, c.style) : void 0, x && !b && !T && c?.source === "native" && a && (E = Fc(a, o, c.route, c.resolvedFamily, c.weight, c.style, y));
		let u = {
			width: s.advancePt,
			actualBoundingBoxAscent: s.ascentPt,
			actualBoundingBoxDescent: s.descentPt,
			fontBoundingBoxAscent: s.ascentPt,
			fontBoundingBoxDescent: s.descentPt
		};
		({ascent: C, descent: w} = jc(u, h * t));
	} else if (a) {
		let e = a.font;
		a.font = Zs(!1, !1, h * t, S, o);
		let n = a.measureText(y);
		a.font = e, {ascent: C, descent: w} = jc(n, h * t);
	} else ({asc: C, desc: w} = Ac(h, t));
	let D = b?.designAscentRatio != null && b?.designDescentRatio != null ? b : T;
	D && (C = D.designAscentRatio * h * t, w = D.designDescentRatio * h * t);
	let O = p ? b?.eastAsianLineHeightRatio ?? b?.lineHeightRatio : b?.lineHeightRatio, k = T ? T.lineHeightRatio * h * t : O == null ? 0 : O * h * t, A = Math.max(k, (E ?? 0) * h * t), j = i ? Oc(k, h * t) : void 0, M = kc(s, C, w, t, n, r, A, i, j), N = d && i && Ec(n), P = N ? kc(null, C, w, t, n, r, A, i, j) : M, ee = N ? kc({
		rule: "atLeast",
		value: 0,
		explicit: !0
	}, C, w, t, n, r, A, i, j) : M;
	return {
		advancePx: d ? Qo({
			ordinaryAdvancePx: M,
			allocatedGridAdvancePx: P,
			atLeastZeroAdvancePx: ee,
			lineSpacing: s,
			gridAllocationActive: N,
			scale: t
		}) : M,
		ascentPx: C,
		descentPx: w
	};
}
function Lc(e, t, n, r, i = !1, a, o = {}, s = e.lineSpacing, c = {}, l, u, d = !1) {
	return Ic(e, t, n, r, i, a, o, s, c, l, u, d).advancePx;
}
function Rc(e, t, n) {
	return Math.max(0, (e - t + n) / 2);
}
function zc(e, t, n, r, i, a, o, s = {}, c, l, u = !1) {
	let d = Ic(e, 1, t, n, r, i, a, o, s, c, l, u);
	return Rc(d.advancePx, d.ascentPx, d.descentPx);
}
function Bc(e) {
	let t = [];
	for (let n of e) {
		let e = n.toLowerCase() === n && n.toUpperCase() !== n, r = /\s/.test(n) ? t[t.length - 1]?.reduced ?? !1 : e, i = t[t.length - 1];
		i && i.reduced === r ? i.text += n : t.push({
			text: n,
			reduced: r
		});
	}
	return t.length ? t : [{
		text: e,
		reduced: !1
	}];
}
function Vc(e, t) {
	for (let n = t - 1; n >= 0; n--) {
		let t = e[n];
		if (t.type === "text" || t.type === "field") return t.fontSize;
	}
	for (let n = t + 1; n < e.length; n++) {
		let t = e[n];
		if (t.type === "text" || t.type === "field") return t.fontSize;
	}
	return 10;
}
function Hc(e, t) {
	if (e.fieldType === "page") return Zt(t.displayPageNumber ?? t.pageIndex + 1, _n(e.instruction) ?? t.pageNumberFormat ?? "decimal");
	if (e.fieldType === "numPages") {
		let n = _n(e.instruction) ?? "decimal";
		return Zt(t.totalPages, n);
	}
	if (e.fieldType === "date" || e.fieldType === "time") {
		let n = Cn(e.instruction);
		if (n) {
			let e = wn(n, new Date(t.currentDateMs ?? Date.now()));
			if (e !== null) return e;
		}
		return e.fallbackText;
	}
	return e.fallbackText;
}
function Uc(e) {
	for (let t = 0; t < e.length;) {
		let r = e.codePointAt(t);
		if (n(r)) return !0;
		t += r > 65535 ? 2 : 1;
	}
	return !1;
}
var Wc = new Set([
	"、",
	"。",
	"，",
	"．",
	"」",
	"』",
	"】",
	"）",
	"］",
	"｝"
]);
function Gc(e) {
	let t = e.codePointAt(0);
	return t === void 0 ? !1 : t >= 12353 && t <= 12438 || t >= 12445 && t <= 12447 || t >= 12449 && t <= 12538 || t === 12540 || t >= 12541 && t <= 12543 || t >= 12784 && t <= 12799 || t >= 110576 && t <= 110591 || t >= 110592 && t <= 110959;
}
function Kc(e, t) {
	switch (t) {
		case "compressPunctuation": return Wc.has(e);
		case "compressPunctuationAndJapaneseKana": return Wc.has(e) || Gc(e);
		default: return !1;
	}
}
function qc(e, t) {
	if (e === void 0) return;
	let n = [];
	for (let r of e) r > t && n.push(r - t);
	return n;
}
function Jc(e, t, n = Infinity) {
	if (t <= 0 || n <= 0 || Number.isFinite(n) && e[t - 1] === "　") return t;
	let r = t, i = n;
	for (; r < e.length && e[r] === "　" && i > 0;) r++, i--;
	return r;
}
function Yc(e) {
	let t = [...e];
	for (let e = t.length - 1; e >= 0; --e) if (t[e] !== "　") return ji.test(t[e]);
	return !1;
}
function Xc(e, t, n, r = 0, i = 1, a = 0, o = !1, s, c, l = Infinity) {
	let u = [...t], d = (t) => c?.(t) ?? (() => {
		let n = 0;
		if (o) {
			if (!s) throw Error("Vertical glyph measurement capability is required for vertical text");
			n = s.measureRunInkExtra(t);
		}
		return xc(e.measureText(t).width + n, t, r, i, a);
	})(), f = (e) => {
		let t = e, r = l;
		if (r > 0) {
			for (; t > 0 && u[t - 1] === "　";) t--;
			let n = e - t;
			t += Math.max(0, n - r);
		}
		return d(u.slice(0, t).join("")) <= n;
	}, p = 0, m = u.length;
	for (; p < m;) {
		let e = p + m + 1 >> 1;
		f(e) ? p = e : m = e - 1;
	}
	return u.slice(0, p).join("");
}
function Zc(e, t) {
	if (e) {
		let t = e.split("-")[0].toLowerCase();
		if (ls.has(t)) return !0;
	}
	return t;
}
function Qc(e) {
	let t = [], r = null, i = "";
	for (let a of e) {
		let e = n(a.codePointAt(0));
		r === null || e === r ? (r = e, i += a) : (t.push({
			text: i,
			ea: r
		}), r = e, i = a);
	}
	return i.length > 0 && t.push({
		text: i,
		ea: r ?? !1
	}), t;
}
function $c(e) {
	let t = (e) => e >= 48 && e <= 57, n = (e) => e === "." || e === "," || e === ":" || e === "/" || e === "\xA0", r = [], i = "", a = null;
	for (let o = 0; o < e.length; o++) {
		let s = e[o], c = t(s.charCodeAt(0));
		!c && a === !0 && n(s) && t(e.charCodeAt(o + 1)) && (c = !0), a === null || c === a ? i += s : (r.push(i), i = s), a = c;
	}
	return i.length > 0 && r.push(i), r.length ? r : [e];
}
function el(e) {
	let t = [], n = 0;
	for (; n < e.length;) {
		let r = n;
		for (; r < e.length && e[r] !== " ";) r++;
		for (; r < e.length && e[r] === " ";) r++;
		r > n && t.push(e.slice(n, r)), n = r;
	}
	return t.length ? t : [e];
}
function tl(e) {
	let t = e?.defaultTabStop;
	return t != null && t > 0 ? t : 36;
}
function nl(e) {
	return e === "center" ? "center" : e === "decimal" ? "decimal" : e === "right" || e === "end" ? "trailing" : "leading";
}
function rl(e, t, n, r, i) {
	let a = e.length, o = e.map((e) => e.width), s = Array(a).fill(void 0), c = (t, n) => {
		let r = 0, i;
		for (let n = t; n < a && !e[n].isTab; n++) i === void 0 && e[n].decimalOffset !== void 0 && (i = r + e[n].decimalOffset), r += o[n];
		return {
			total: r,
			alignment: n === "center" ? r / 2 : n === "trailing" ? r : n === "decimal" ? i === void 0 ? 0 : r - i : 0
		};
	}, l = n;
	for (let n = 0; n < a; n++) {
		if (!e[n].isTab) {
			l += o[n];
			continue;
		}
		let a = Ni(l, t, i);
		if (!a) {
			o[n] = 0;
			continue;
		}
		let u = nl(a.alignment), d = c(n + 1, u), f = d.total, p;
		p = u === "leading" ? a.pos : a.pos - d.alignment, p + f > r && (p = r - f), p < l && (p = l), o[n] = p - l, s[n] = a.leader, l = p;
	}
	return e.map((e, t) => ({
		width: o[t],
		leader: s[t]
	}));
}
function il(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let t of e) {
		if (t.fitTextRegionIndex === void 0) continue;
		let e = r.get(t.fitTextRegionIndex) ?? [];
		e.push(t), r.set(t.fitTextRegionIndex, e);
	}
	for (let e of r.values()) {
		let r = e.find((e) => e.fitTextVal !== void 0);
		if (!r || r.fitTextVal === void 0) continue;
		let i = 0, a = 0;
		for (let t of e) i += n(t) * bc(t), a += [...t.text].length;
		let o = Gi([{
			fitTextValTwips: r.fitTextVal,
			charCount: a,
			naturalWidthPx: i
		}], t)[0];
		o && e.forEach((t, n) => {
			t.fitTextPerGapPx = o.perGapPx, t.fitTextTrailingPadPx = n === e.length - 1 ? o.trailingPadPx : void 0, t.fitTextRegionStart = n === 0 ? !0 : void 0, t.fitTextRegionEnd = n === e.length - 1 ? !0 : void 0;
		});
	}
}
function al(e, t) {
	let n = e.unicodeRanges;
	if (n === void 0 || t.length === 0) return !0;
	for (let e of t) {
		let t = e.codePointAt(0), r = 0, i = n.length;
		for (; r < i;) {
			let e = r + i >>> 1;
			n[e][1] < t ? r = e + 1 : i = e;
		}
		if (r >= n.length || n[r][0] > t) return !1;
	}
	return !0;
}
function ol(e, t, n) {
	if (Tn(e.family) !== Tn(t.resolvedFamily) || (e.weight ?? 400) !== t.weight || (e.style ?? "normal") !== t.style || !al(e, n)) return !1;
	let r = e.sourceIdentity;
	return t.source === "embedded" ? t.resourceIdentity === void 0 ? r?.startsWith("embedded:") === !0 : r === t.resourceIdentity : t.source === "local" || t.source === "substitute" ? r !== void 0 && r === t.resourceIdentity : !1;
}
function sl(e, t) {
	return e.lineHeightRatio === t.lineHeightRatio && e.designAscentRatio === t.designAscentRatio && e.designDescentRatio === t.designDescentRatio && e.lineGapRatio === t.lineGapRatio && e.eastAsianLineHeightRatio === t.eastAsianLineHeightRatio && e.fontBoxRatio === t.fontBoxRatio;
}
var cl = /* @__PURE__ */ new WeakMap();
function ll(e, t, n) {
	return `${Tn(e)}\0${t}\0${n}`;
}
function ul(e) {
	let t = Object.isFrozen(e);
	if (t) {
		let t = cl.get(e);
		if (t) return t;
	}
	let n = Object.values(e), r = t && n.every((e) => Object.isFrozen(e)), i = /* @__PURE__ */ new Map();
	for (let e of n) {
		let t = ll(e.family, e.weight ?? 400, e.style ?? "normal"), n = i.get(t);
		n ? n.push(e) : i.set(t, [e]);
	}
	for (let e of i.values()) Object.freeze(e);
	return r && cl.set(e, i), i;
}
function dl(e, t, n) {
	if (t.source !== "embedded" && t.source !== "local" && t.source !== "substitute") return;
	let r = e.get(ll(t.resolvedFamily, t.weight, t.style)) ?? [], i;
	for (let e of r) ol(e, t, n) && (i ??= e);
	if (i) {
		for (let e of r) if (al(e, n) && !sl(i, e)) return;
		return i;
	}
}
function fl(e, t, n) {
	if (t.source !== "embedded" && t.source !== "local" && t.source !== "substitute") return;
	let r = e.get(ll(t.resolvedFamily, t.weight, t.style)) ?? [], i = `${n} `, a = r.find((e) => ol(e, t, i))?.averageCharWidthRatio;
	if (!(a == null || a <= 0)) return r.every((e) => !al(e, i) || e.averageCharWidthRatio === a) ? a : void 0;
}
function pl(e) {
	return e?.source === "local" && e.resourceIdentity?.startsWith("office-local:") === !0;
}
function ml(e) {
	return e?.source === "native" || pl(e);
}
function hl(e, t) {
	let n = [], r = t.layoutServices?.text.fontMetrics ?? t.layoutServices?.text.localMetrics ?? {}, a, o = () => a ??= ul(r), s = (e, t) => {
		if (e) return dl(o(), e, t);
	}, c = /* @__PURE__ */ new Map(), l = (e, t) => {
		if (!e) return;
		if (e.source !== "native") {
			let n = fl(o(), e, t);
			if (n !== void 0) return n;
			if (e.source !== "local" || !e.resourceIdentity?.startsWith("office-local:")) return;
		}
		if (!pl(e)) return;
		let n = `${e.requestedFamily}\0${e.weight}\0${e.style}`;
		if (!c.has(n)) {
			let t = As(e.requestedFamily, e.weight, e.style);
			t !== void 0 && c.set(n, t);
		}
		return c.get(n);
	}, u = /* @__PURE__ */ new Map(), d = [];
	for (let [t, n] of e.entries()) {
		if (n.type !== "text") {
			d.push({
				charCount: 0,
				naturalWidthPx: 0
			});
			continue;
		}
		let e = n.text.split("	");
		for (let r = 0; r < e.length; r += 1) u.set(`${t}:${r}`, d.length), d.push({
			fitTextValTwips: n.fitTextVal,
			fitTextId: n.fitTextId,
			charCount: [...e[r]].length,
			naturalWidthPx: 0,
			charScale: n.charScale
		}), r < e.length - 1 && d.push({
			charCount: 0,
			naturalWidthPx: 0
		});
	}
	let f = /* @__PURE__ */ new Map();
	Gi(d, 1).forEach((e, t) => {
		for (let n = e.start; n < e.end; n += 1) f.set(n, t);
	});
	let p = (e, r, i, a, o, c = !1) => {
		let d = r, p = ji.test(e) ? !0 : void 0, m = d.typographyInput, h = (e, t) => e?.status === "valid" && e.value !== null ? e.value : t, g = h(m?.verticalAlign, i ?? void 0) ?? null, _ = h(m?.positionPt, d.position), v = m?.characterSpacingPt ?? d.charSpacing, y = is(v), b = m?.characterScale ?? d.charScale, x = m?.kerningThresholdPt ?? d.kerning ?? (t.enableOpenTypeFeatures ? 0 : void 0), S = m?.snapToGrid ?? d.snapToGrid, C = !1, w = d.ruby, T = w ? {
			text: w.text,
			fontSizePt: w.fontSizePt,
			...w.hpsRaisePt == null ? {} : { hpsRaisePt: w.hpsRaisePt }
		} : void 0, E = d.revision, D = d.rtl === !0 ? !0 : void 0, O = o === void 0 ? void 0 : u.get(`${a}:${o}`), k = O === void 0 ? void 0 : f.get(O), A = d.hyperlink ? {
			kind: "external",
			url: d.hyperlink
		} : d.hyperlinkAnchor ? {
			kind: "internal",
			ref: d.hyperlinkAnchor
		} : void 0, j = d.rtl === !0 || d.cs === !0, M = d.fontSizeCs ?? r.fontSize, N = d.fontFamilyCs ?? r.fontFamily, ee = d.fontFamilyHighAnsi ?? r.fontFamily, te = d.boldCs ?? !1, F = d.italicCs ?? !1, ne = d.fontFamilyEastAsia ?? r.fontFamily, re = (j || !!d.rtl) && Zc(d.langBidi, !!d.rtl), ie = !0, ae = !1, I = (e, i, a, o, u = !1, f = !1) => {
			if (t.balanceSingleByteDoubleByteWidth && !i && e.includes("　") && [...e].some((e) => e !== "　")) {
				for (let t of e.split(/(\u3000+)/u).filter(Boolean)) I(t, i, a, void 0, u, f);
				return;
			}
			if (!u && y && k === void 0) {
				let n = [
					0,
					...P(e),
					e.length
				];
				if (n.slice(0, -1).map((t, r) => e.slice(t, n[r + 1])).some((e) => Kc(e, t.characterSpacingControl))) {
					I(e, i, a, void 0, !0, f);
					return;
				}
			}
			let m = i ? te : r.bold, h = i ? F : r.italic, w = m ? 700 : 400, j = h ? "italic" : "normal", oe = Object.freeze({
				text: e,
				fontSizePt: i ? M : r.fontSize,
				fonts: f ? {
					ascii: null,
					highAnsi: null,
					eastAsia: null,
					complexScript: null
				} : d.fontSlots?.direct ?? {
					ascii: r.fontFamily,
					highAnsi: ee,
					eastAsia: ne,
					complexScript: N
				},
				themeFonts: f ? void 0 : d.fontSlots?.theme,
				themeFontPresence: f ? void 0 : d.fontSlots?.themePresent,
				weight: w,
				style: j,
				complexScript: i,
				fontHint: d.fontHint,
				eastAsiaLanguage: d.langEastAsia,
				kerning: x != null && (i ? M : r.fontSize) >= x,
				measure: !1
			}), se = o ? { spans: [o] } : t.layoutServices?.text.shape(oe), ce = u && y ? (() => {
				let n = [
					0,
					...P(e),
					e.length
				], r = [];
				for (let i = 0; i < n.length - 1; i += 1) {
					let a = n[i], o = n[i + 1], s = e.slice(a, o);
					if (!Kc(s, t.characterSpacingControl)) continue;
					let c = t.layoutServices?.text.shape({
						...oe,
						text: s,
						measure: !0,
						clusterGeometry: !1
					}), l = (c?.inkBounds && c.horizontalInkBoundsAreTight === !0 ? (() => {
						let e = Math.max(0, Math.min(c.advancePt, c.advancePt - c.inkBounds.xMaxPt));
						if (!Wc.has(s)) return e;
						let n = c.spans[0]?.fontRoute.fingerprint, r = t.layoutServices?.text.shape({
							...oe,
							text: "一",
							fontHint: "eastAsia",
							measure: !0,
							clusterGeometry: !1
						}), i = r?.spans[0]?.fontRoute.fingerprint, a = r?.advancePt;
						if (!n || i !== n || a === void 0 || !Number.isFinite(a) || a <= 0) return 0;
						let o = rs({
							punctuationAdvancePt: c.advancePt,
							punctuationInkEndPt: c.inkBounds.xMaxPt,
							ideographicCellAdvancePt: a
						});
						return Math.max(0, Math.min(e, c.advancePt - o));
					})() : 0) * (b ?? 1);
					l > 0 && r.push({
						end: o,
						adjustmentPt: -l
					});
				}
				return r.length === 0 ? void 0 : Object.freeze(r.map((e) => Object.freeze(e)));
			})() : void 0, le = se?.spans.some((e) => e.script === "complexScript" !== i) ?? !1;
			if (se && (se.spans.length > 1 || le)) {
				for (let e = 0; e < se.spans.length; e += 1) {
					let n = se.spans[e], i = n.script === "complexScript", a = i ? N : n.script === "eastAsia" ? ne : n.script === "highAnsi" ? ee : r.fontFamily, o = y && u && [...n.text].some((e) => Kc(e, t.characterSpacingControl));
					I(n.text, i, a, n, o);
				}
				return;
			}
			let ue = se?.spans[0], de = ue ? s(ue.font, e) : void 0, fe = t.layoutServices?.text.resolve({
				fonts: oe.fonts,
				themeFonts: oe.themeFonts,
				themeFontPresence: oe.themeFontPresence,
				slot: "eastAsia",
				weight: w,
				style: j
			}), pe = d.textBoxLineFloor ? "" : e, me = fe ? s(fe, pe) : void 0, he = t.lineSpacing?.rule !== "exact", ge = (he || de?.designAscentRatio == null) && (de?.lineHeightRatio != null || de?.designAscentRatio != null || de?.eastAsianLineHeightRatio != null) ? de : void 0, _e = he && !ge && ml(ue?.font) ? ks(ue.font.requestedFamily, ue.font.weight, ue.font.style) : void 0, ve = ge ?? _e, ye = (he || me?.designAscentRatio == null) && (me?.lineHeightRatio != null || me?.designAscentRatio != null || me?.eastAsianLineHeightRatio != null) ? me : void 0, be = he && !ye && ml(fe) ? ks(fe.requestedFamily, fe.weight, fe.style) : void 0, xe = ye ?? be, Se = fe?.resolvedFamily ?? me?.family ?? ne, Ce = t.useFeLayout && t.lineGridActive && (d.fontHint === "eastAsia" || !!Se?.trim()), we = ue?.script ?? o?.script ?? (i ? "complexScript" : ji.test(e) ? "eastAsia" : "ascii"), Te = t.characterSpacingControl === "compressPunctuation" && t.lineWrapLikeWord6 !== !0 && t.verticalCJK !== !0 && y && (we === "ascii" || we === "highAnsi") && !C && g == null && (v == null || v === 0) && (b == null || b === 1) && x == null ? l(ue?.font, e) : void 0, L = t.balanceSingleByteDoubleByteWidth ? ns(e, we) : void 0;
			n.push({
				text: e,
				script: we,
				...L === void 0 ? {} : { widthBalanceGridDeltaFactor: L },
				...Ce ? { metricEastAsian: !0 } : {},
				bold: m,
				italic: h,
				underline: r.underline,
				underlineStyle: d.underlineStyle,
				underlineColor: d.underlineColor,
				strikethrough: r.strikethrough,
				fontSize: i ? M : r.fontSize,
				color: r.color,
				fontFamily: ue?.font.resolvedFamily ?? de?.family ?? a,
				fontRoute: ue?.fontRoute,
				resolvedLineHeightRatio: ve?.lineHeightRatio,
				...ge?.lineHeightRatio == null ? {} : {
					resolvedResourceVerticalMetric: !0,
					resolvedDesignAscentRatio: ge.designAscentRatio,
					resolvedDesignDescentRatio: ge.designDescentRatio
				},
				..._e ? {
					referenceFontVerticalMetric: !0,
					resolvedDesignAscentRatio: _e.designAscentRatio,
					resolvedDesignDescentRatio: _e.designDescentRatio
				} : {},
				resolvedEastAsianLineHeightRatio: ve?.eastAsianLineHeightRatio,
				...Te != null && Te > 0 ? {
					latinSpaceAverageWidthRatio: Te,
					latinSpaceCompressionEligible: !0
				} : {},
				vertAlign: g,
				measuredWidth: 0,
				textLayoutService: t.layoutServices?.text,
				textShapeRequest: oe,
				breakBefore: ue?.breakBefore ?? o?.breakBefore ?? !0,
				smallCaps: C,
				joinPrev: ie && (d.noBreakBefore === !0 || c) || ae || o?.breakBefore === !1 ? !0 : void 0,
				hardJoinPrev: ie && (d.noBreakBefore === !0 || c) ? !0 : void 0,
				doubleStrikethrough: r.doubleStrikethrough ?? !1,
				highlight: r.highlight ?? null,
				emphasisMark: r.emphasisMark,
				background: r.background ?? null,
				colorAuto: d.colorAuto ?? !1,
				border: d.border ?? null,
				ruby: ie ? T : void 0,
				revision: E,
				...E && t.showTrackedChanges === !0 ? { trackChangesMarkup: {
					kind: E.kind,
					authorColor: t.revisionAuthorColor?.(E.author) ?? "#C00000"
				} } : {},
				rtl: D,
				digitsAsAN: re ? !0 : void 0,
				eaFloorFamily: Se,
				eaFloorRoute: fe?.route,
				resolvedEaFloorLineHeightRatio: xe?.lineHeightRatio,
				resolvedEaFloorEastAsianLineHeightRatio: xe?.eastAsianLineHeightRatio,
				textBoxLineFloor: d.textBoxLineFloor,
				textBoxVertical: d.textBoxVertical,
				hyperlink: A,
				snapToCharacterGrid: S !== !1,
				charSpacing: v,
				punctuationCompressions: ce,
				eastAsiaLanguage: d.langEastAsia,
				overflowPunctuationEastAsianRun: p,
				overflowPunctuationBidiLanguage: d.langBidi,
				charScale: b,
				fitTextVal: k === void 0 ? void 0 : d.fitTextVal,
				fitTextId: k === void 0 ? void 0 : d.fitTextId,
				fitTextRegionIndex: k,
				fitTextRunIndex: k === void 0 ? void 0 : O,
				position: _,
				positionExtendsLineBox: t.positionExtendsLineBox !== !1,
				kerning: x,
				tateChuYoko: t.verticalCJK && d.eastAsianVert === !0 ? !0 : void 0,
				tateChuYokoCompress: t.verticalCJK && d.eastAsianVert === !0 && d.eastAsianVertCompress === !0 ? !0 : void 0,
				verticalRun: t.verticalCJK && d.eastAsianVert !== !0 ? !0 : void 0
			}), ie = !1, ae = !1;
		}, oe = (e, t) => {
			let n = t === "cs", i = t === "cs" ? N : t === "ea" ? ne : r.fontFamily;
			if (Oe(i)) {
				for (let t of je(e, i)) I(t.text, n, t.mapped ? null : i, void 0, !1, t.mapped);
				return;
			}
			I(e, n, i);
		}, se = (e) => {
			if (t.layoutServices?.text) {
				if (Oe(r.fontFamily)) {
					oe(e, "latin");
					return;
				}
				I(e, !1, r.fontFamily);
				return;
			}
			for (let t of Qc(e)) oe(t.text, t.ea ? "ea" : "latin");
		}, ce = r.smallCaps ? Bc(e) : [{
			text: e,
			reduced: !1
		}], le = "";
		for (let e of ce) {
			C = e.reduced, ae = le.length > 0 && !/\s$/.test(le), le = e.text;
			let t = r.allCaps || r.smallCaps ? e.text.toUpperCase() : e.text;
			for (let e of el(t)) if (j) if (re) for (let t of $c(e)) oe(t, "cs");
			else oe(e, "cs");
			else se(e);
		}
	}, m = !1;
	for (let [r, i] of e.entries()) {
		let a = i.revision?.kind;
		if (t.showTrackedChanges !== !0 && (a === "deletion" || a === "moveFrom")) continue;
		let o = m;
		m = i.type === "text" && i.noBreakAfter === !0;
		let c = n.length;
		if (i.type === "text") {
			let e = i, a = e.noteRef ? e.noteRef.id ? t.noteNumbers?.get(`${e.noteRef.kind}:${e.noteRef.id}`) : t.noteReferenceNumber : void 0;
			if (e.noteRef) {
				let t = a == null ? e.text || "" : String(a);
				t.length > 0 && p(t, e, e.vertAlign ?? "super", r, 0, o);
				for (let e = c; e < n.length; e += 1) n[e].sourceRunIndex = r;
				continue;
			}
			let s = e.text.split("	");
			for (let t = 0; t < s.length; t++) s[t].length > 0 && p(s[t], e, e.vertAlign, r, t, t === 0 && o), t < s.length - 1 && n.push({
				isTab: !0,
				fontSize: e.fontSize,
				measuredWidth: 0,
				bold: e.bold,
				italic: e.italic,
				sourceRunIndex: r
			});
		} else if (i.type === "image") {
			let e = i;
			n.push({
				imagePath: e.imagePath,
				mimeType: e.mimeType,
				...e.anchor ? {} : { inlinePicture: !0 },
				widthPt: e.widthPt,
				heightPt: e.heightPt,
				rotation: e.rotation,
				flipH: e.flipH,
				flipV: e.flipV,
				anchor: e.anchor ?? !1,
				anchorXPt: e.anchorXPt ?? 0,
				anchorYPt: e.anchorYPt ?? 0,
				anchorXFromMargin: e.anchorXFromMargin ?? !1,
				anchorYFromPara: e.anchorYFromPara ?? !1,
				colorReplaceFrom: e.colorReplaceFrom,
				duotone: e.duotone,
				alpha: e.alpha,
				srcRect: e.srcRect ?? void 0,
				measuredWidth: 0
			});
		} else if (i.type === "chart") {
			let e = i;
			n.push({
				imagePath: "",
				mimeType: "",
				widthPt: e.widthPt,
				heightPt: e.heightPt,
				anchor: e.anchor ?? !1,
				anchorXPt: e.anchorXPt ?? 0,
				anchorYPt: e.anchorYPt ?? 0,
				anchorXFromMargin: e.anchorXFromMargin ?? !1,
				anchorYFromPara: e.anchorYFromPara ?? !1,
				chart: !0,
				chartResourceKey: e.resourceKey,
				measuredWidth: 0
			});
		} else if (i.type === "shape" && i.inline === !0) n.push({
			imagePath: "",
			mimeType: "",
			widthPt: i.widthPt,
			heightPt: i.heightPt,
			anchor: !1,
			anchorXPt: 0,
			anchorYPt: 0,
			anchorXFromMargin: !1,
			anchorYFromPara: !1,
			inlineShape: !0,
			measuredWidth: 0
		});
		else if (i.type === "unavailableDrawing") {
			let e = "anchorAcquisitionInput" in i ? i.anchorAcquisitionInput : void 0;
			n.push({
				imagePath: "",
				mimeType: "",
				widthPt: i.widthPt,
				heightPt: i.heightPt,
				anchor: e !== void 0,
				anchorXPt: 0,
				anchorYPt: 0,
				anchorXFromMargin: !1,
				anchorYFromPara: !1,
				unavailableResourceKind: i.resourceKind,
				measuredWidth: 0
			});
		} else if (i.type === "break") {
			if (i.breakType === "line") {
				let t = Vc(e, e.indexOf(i));
				n.push({
					lineBreak: !0,
					fontSize: t,
					measuredWidth: 0
				});
			}
		} else if (i.type === "field") {
			let e = i, n = Hc(e, t);
			n && p(n, e, e.vertAlign, r, void 0, o);
		} else if (i.type === "math") {
			let r = i.fontSize || Vc(e, e.indexOf(i)), a = "resourceKey" in i ? i.resourceKey : void 0;
			if (t.layoutServices && !a) throw Error("Service-backed math layout requires a normalized structural resource key");
			let o = a ? t.layoutServices?.math.resolve(a) : void 0;
			n.push({
				math: !0,
				mathResourceKey: a ?? "",
				mathMetadata: o,
				display: i.display,
				fontSize: r,
				color: null,
				fallbackText: "fallbackText" in i ? i.fallbackText : K(i.nodes),
				measuredWidth: 0,
				mathAscent: 0,
				mathDescent: 0,
				jc: i.jc
			});
		} else if (i.type === "ptab") n.push({
			isTab: !0,
			fontSize: i.fontSize || Vc(e, e.indexOf(i)),
			measuredWidth: 0,
			leader: i.leader,
			ptab: {
				alignment: i.alignment,
				relativeTo: i.relativeTo
			}
		});
		else if (i.type === "anchorHost") {
			let e = i.fontFamilyEastAsia != null, r = i.bold ?? !1, a = i.italic ?? !1, o = i.fontFamilyEastAsia ?? i.fontFamily ?? null, c = r ? 700 : 400, l = a ? "italic" : "normal", u = e ? "あ" : "x", d = t.layoutServices?.text.resolve({
				text: u,
				fonts: {
					ascii: i.fontFamily,
					highAnsi: i.fontFamily,
					eastAsia: i.fontFamilyEastAsia,
					complexScript: i.fontFamily
				},
				slot: e ? "eastAsia" : "ascii",
				weight: c,
				style: l
			}), f = s(d, u), p = t.lineSpacing?.rule !== "exact", m = p || f?.designAscentRatio == null ? f : void 0, h = p && !m && ml(d) ? ks(d.requestedFamily, c, l) : void 0, g = m ?? h;
			n.push({
				text: "",
				metricOnly: !0,
				...e ? { metricEastAsian: !0 } : {},
				bold: r,
				italic: a,
				underline: !1,
				strikethrough: !1,
				fontSize: i.fontSize,
				color: null,
				fontFamily: d?.resolvedFamily ?? o,
				fontRoute: d?.route,
				resolvedLineHeightRatio: g?.lineHeightRatio,
				...m?.lineHeightRatio == null ? {} : {
					resolvedResourceVerticalMetric: !0,
					resolvedDesignAscentRatio: m.designAscentRatio,
					resolvedDesignDescentRatio: m.designDescentRatio
				},
				...h ? {
					referenceFontVerticalMetric: !0,
					resolvedDesignAscentRatio: h.designAscentRatio,
					resolvedDesignDescentRatio: h.designDescentRatio
				} : {},
				resolvedEastAsianLineHeightRatio: g?.eastAsianLineHeightRatio,
				vertAlign: null,
				measuredWidth: 0,
				eaFloorFamily: e ? d?.resolvedFamily ?? o : null,
				resolvedEaFloorLineHeightRatio: e ? g?.lineHeightRatio : void 0,
				resolvedEaFloorEastAsianLineHeightRatio: e ? g?.eastAsianLineHeightRatio : void 0,
				snapToCharacterGrid: !1
			});
		}
		for (let e = c; e < n.length; e += 1) n[e].sourceRunIndex = r;
	}
	for (let [t, r] of e.entries()) {
		if (r.type !== "text") continue;
		let e = r, i = e.noBreakRanges;
		if (!i || i.length === 0) continue;
		let a = i.map((t) => {
			let n = (t) => {
				let n = e.text.slice(0, t);
				return e.allCaps || e.smallCaps ? n.toUpperCase().length : n.length;
			};
			return {
				start: n(t.start),
				end: n(t.end)
			};
		}), o = 0;
		for (let e of n) {
			if (e.sourceRunIndex !== t) continue;
			if (!("text" in e)) {
				"isTab" in e && (o += 1);
				continue;
			}
			let n = o + e.text.length;
			o > 0 && a.some((e) => e.start === o || e.end === o) && (e.joinPrev = !0, e.hardJoinPrev = !0);
			let r = a.filter((e) => e.start >= o && e.end <= n).map((e) => Object.freeze({
				start: e.start - o,
				end: e.end - o
			}));
			r.length > 0 && (e.noBreakRanges = Object.freeze(r)), o = n;
		}
	}
	for (let e = 0; e < n.length;) {
		let t = n[e];
		if (!("text" in t) || t.hyperlink?.kind !== "external") {
			e += 1;
			continue;
		}
		let r = t.hyperlink.url, i = e, a = [];
		for (; i < n.length;) {
			let e = n[i];
			if (!("text" in e) || e.hyperlink?.kind !== "external" || e.hyperlink.url !== r) break;
			a.push(e), i += 1;
		}
		let o = a.map((e) => e.text).join(""), s = /* @__PURE__ */ new Set(), c = 0;
		for (let e of a) {
			for (let t of e.noBreakRanges ?? []) {
				let e = [t.start, t.end];
				for (let t of e) s.add(c + t);
			}
			c += e.text.length;
		}
		let l = /* @__PURE__ */ new Set();
		for (let e of o.matchAll(/\S+/gu)) {
			let t = e[0], n = e.index, r = new Set(P(t).map((e) => n + e)), i = new Set([...s].filter((e) => e > n && e <= n + t.length).map((e) => e - n)), a = new Set([...r].map((e) => e - n));
			for (let e of ps(t, a, i)) l.add(n + e);
		}
		if (l.size === 0) {
			e = i;
			continue;
		}
		c = 0;
		for (let e = 0; e < a.length; e += 1) {
			let t = a[e], n = c, r = n + t.text.length, i = [...l].filter((e) => e > n && e < r).map((e) => e - n).sort((e, t) => e - t);
			i.length > 0 && (t.externalLinkBreakOffsets = Object.freeze(i)), e > 0 && l.has(n) && (t.joinPrev = void 0, t.externalLinkBreakBefore = !0), c = r;
		}
		e = i;
	}
	if (t.balanceSingleByteDoubleByteWidth) {
		let e = /* @__PURE__ */ new Map(), t = (t) => {
			let n = t.textLayoutService, r = t.textShapeRequest;
			if (!n || !r) return;
			let i = Ai(t, 1), a = [
				n.fingerprint,
				t.fontRoute?.fingerprint ?? "implicit-latin",
				t.eaFloorRoute?.fingerprint ?? "implicit-east-asia",
				i,
				t.bold ? 700 : 400,
				t.italic ? "italic" : "normal",
				t.kerning ?? "none"
			].join("|"), o = e.get(a);
			if (o !== void 0) return o;
			let s = n.shape({
				...r,
				text: " ",
				fontSizePt: i,
				measure: !0,
				clusterGeometry: !1
			}).advancePt, c = n.shape({
				...r,
				text: "一",
				fontSizePt: i,
				fontHint: "eastAsia",
				measure: !0,
				clusterGeometry: !1
			}).advancePt;
			if (!Number.isFinite(s) || !Number.isFinite(c) || s < 0 || c <= 0) return;
			let l = c / 2 - s;
			return e.set(a, l), l;
		}, r = [], i = 0, a = () => {
			if ($o(i)) for (let e of r) {
				e.widthBalanceSpaceSequence = !0;
				let n = t(e);
				n !== void 0 && (e.widthBalanceSpaceAdjustmentPt = n);
			}
			r = [], i = 0;
		};
		for (let e of n) {
			if (!("text" in e) || e.script === "complexScript") {
				a();
				continue;
			}
			let t = e.text.length - e.text.replace(/ +$/u, "").length;
			t > 0 && t === e.text.length || a(), t > 0 ? (r.push(e), i += t) : a();
		}
		a();
	}
	for (let e = 1; e < n.length; e++) {
		let t = n[e];
		if (!("text" in t) || t.joinPrev) continue;
		let r = t.text.codePointAt(0);
		if (r === void 0 || !i.lineStartForbidden.has(r)) continue;
		let a = n[e - 1];
		!("text" in a) || /\s$/.test(a.text) || (t.joinPrev = !0);
	}
	for (let e = 1; e < n.length; e++) {
		let t = n[e];
		if (!("text" in t) || t.joinPrev || t.text[0] !== " " && t.text[0] !== "　") continue;
		let r = n[e - 1];
		if (!("text" in r)) continue;
		let i = t.sourceRunIndex === r.sourceRunIndex, a = as(r.text, t.text);
		!i && !a || (t.joinPrev = !0);
	}
	for (let e = 1; e < n.length; e++) {
		let t = n[e];
		if (!("text" in t) || t.joinPrev || t.externalLinkBreakBefore || t.text.length === 0) continue;
		let r = n[e - 1];
		if (!("text" in r) || r.text.length === 0 || /\s$/u.test(r.text) || /^\s/u.test(t.text)) continue;
		let i = [...r.text].at(-1), a = [...t.text][0], o = i?.codePointAt(0), s = a?.codePointAt(0);
		o === void 0 || s === void 0 || o === 8203 || s === 8203 || ue(r.text) || ue(t.text) || Uc(r.text) || Uc(t.text) || be(o, s) && (t.joinPrev = !0);
	}
	let h = /* @__PURE__ */ new Set();
	for (let e of n) !("text" in e) || e.fitTextRegionIndex === void 0 || (h.has(e.fitTextRegionIndex) ? e.joinPrev = !0 : (e.fitTextRegionStart = !0, h.add(e.fitTextRegionIndex)));
	return yc(n), n;
}
function gl(e, t, n, r, a, s = [], c, l = {}, u = 0, d = i, f = void 0, p = 36, m = n, h = !1, g = !1, _ = !1, v, y = "bounded", x, S = !1, C) {
	if (C === void 0) {
		let i = (i, o) => gl(e, Wo(t), n, r, a, s, c, l, u, d, f, p, m, h, g, _, v, y, x, S, {
			probeHeights: i,
			preparedFloatWrap: o
		});
		if (!c || y === "intrinsic") return i(null);
		let o = c.lineWindow ? void 0 : _o(c.floats);
		return qo((e) => i(e, o), (e) => c.lineBoxH(e.ascent, e.descent, e.hasRuby, e.intendedSingle, e.eastAsian, e.gridCountSingle, e.uniformPositionAuto, e.inlinePictureTextSingle));
	}
	let { probeHeights: w, preparedFloatWrap: E } = C, O = [], k = [], A = 0, j = (e, t) => e.latinSpaceCompressionEligible === !0 && !e.verticalRun && !t.verticalRun && !e.tateChuYoko && !t.tateChuYoko && e.latinSpaceAverageWidthRatio === t.latinSpaceAverageWidthRatio && e.fontRoute?.fingerprint === t.fontRoute?.fingerprint && e.fontFamily === t.fontFamily && e.fontSize === t.fontSize && e.bold === t.bold && e.italic === t.italic && (e.charScale == null || e.charScale === 1) && (t.charScale == null || t.charScale === 1) && e.kerning === t.kerning && e.widthBalanceGridDeltaFactor === t.widthBalanceGridDeltaFactor && !e.rtl && e.fitTextRegionIndex === void 0, M, ee = !0, te = [], F, ne = 0, re = 0, ie = () => {
		for (let e = 0; e < ne; e += 1) {
			let t = te[e];
			t.measuredWidth -= re, t.latinSpaceCompressionPx = re;
		}
		ne = 0, re = 0;
	}, ae = f?.type === "snapToChars" && f.characterPitchPt != null && f.characterPitchPt > 0 ? f.characterPitchPt * a : null, I = null, se = 0, ce = 0, le = 0, de = 0, fe = !1, pe = 0, me = 0, he = 0, ge = 0, _e = 0, ve = !1, ye = !0, be = n, xe = 0, Se = c?.startPageY ?? 0, Ce = () => Ba(a), we = t.length > 0 && t.every((e) => "text" in e && e.metricOnly === !0 || "imagePath" in e && !!e.anchor), Te = (e = 0) => {
		if (I = null, xe = 0, be = n, !c) return;
		let t = w?.[O.length];
		if (t === void 0) return;
		let r = {
			xLeftPt: c.referenceXPt ?? c.paraX,
			xRightPt: (c.referenceXPt ?? c.paraX) + (c.referenceWidthPt ?? n),
			readingDirection: c.readingDirection ?? (h ? "rtl" : "ltr")
		};
		if (c.lineWindow) {
			let r = c.lineWindow({
				topYPt: Se,
				minimumStartWidthPt: 1,
				squareMinimumStartWidthPt: e,
				probeHeightPt: t,
				paragraphXPt: c.paraX,
				maximumWidthPt: n,
				columnXPt: c.columnXPt,
				columnWidthPt: c.columnWidthPt
			});
			Se = r.topYPt, xe = r.xOffsetPt, be = r.maximumWidthPt;
		} else {
			let i = Fo(Se, 1, t, c.paraX, n, E ?? _o(c.floats), c.columnXPt, c.columnXPt + c.columnWidthPt, r, e);
			Se = i.topY, xe = i.xOffset, be = i.maxWidth;
		}
	}, L = () => y === "intrinsic" ? Infinity : be - (ye ? r : 0), Ee = (e, t) => e <= t ? !0 : y === "intrinsic" || !Number.isFinite(e) || !Number.isFinite(be) ? !1 : e + (ye ? r : 0) <= be, De = h ? s.map((e) => ({
		pos: e.pos * a,
		alignment: e.alignment,
		leader: e.leader
	})) : [], Oe = p * a, ke = () => {
		if (!h || !k.some((e) => "isTab" in e)) return;
		let e = k.map((e) => ({
			isTab: "isTab" in e,
			width: e.measuredWidth
		}));
		for (let t = 0; t < k.length; t += 1) {
			if (!("isTab" in k[t])) continue;
			let n = t + 1;
			for (; n < k.length && !("isTab" in k[n]);) n += 1;
			let r = nt(k.slice(t + 1, n));
			if (!r) continue;
			let i = t + 1 + r.segmentIndex, a = k[i];
			"text" in a && (e[i].decimalOffset = Ze(a, a.text.slice(0, r.charOffset)));
		}
		let t = rl(e, De, m - (xe + be) + (ye ? r : 0), m + u, Oe), n = 0;
		for (let e = 0; e < k.length; e++) {
			let r = k[e];
			"isTab" in r && (n += t[e].width - r.measuredWidth, r.measuredWidth = t[e].width, r.leader = t[e].leader);
		}
		A += n;
	}, Ae = !1, je = !1, Me = (e, t = !1, n) => {
		ie(), ke();
		let r, i = !1;
		for (let e of k) {
			if ("isTab" in e) continue;
			let t = "text" in e ? e.position ?? 0 : 0;
			if ("text" in e && e.positionExtendsLineBox === !1) {
				r = 0, i = !0;
				break;
			}
			if (!i) r = t, i = !0;
			else if (r !== t) {
				r = 0;
				break;
			}
		}
		let o = i ? r ?? 0 : 0;
		if (o !== 0) for (let e of k) "text" in e && (e.lineRelativePosition = ms(e.position ?? 0, o));
		let s = e === void 0 ? se || 10 : Math.max(se, e), l = ce > 0 || le > 0, u = l ? ce : s * a * .8, d = l ? le : s * a * .2, f = ve ? he : u, p = ve ? ge : d, m = ve ? _e : de, h = me || (je ? Oc(de, s * a) : u + d), g = fe ? Math.max(de, pe) : 0, _ = k.filter((e) => "text" in e), v = _[0], y = o !== 0 && _.length > 0 && k.every((e) => "isTab" in e || "text" in e) && v?.resolvedDesignDescentRatio != null && (v.referenceFontVerticalMetric || v.resolvedResourceVerticalMetric) && _.every((e) => e.text.length > 0 && !e.metricOnly && !e.ruby && !e.vertAlign && e.positionExtendsLineBox !== !1 && e.position === o && e.fontFamily === v.fontFamily && e.fontRoute?.fingerprint === v.fontRoute?.fingerprint && e.bold === v.bold && e.italic === v.italic && e.fontSize === v.fontSize && e.resolvedDesignDescentRatio === v.resolvedDesignDescentRatio && e.referenceFontVerticalMetric === v.referenceFontVerticalMetric && e.resolvedResourceVerticalMetric === v.resolvedResourceVerticalMetric && (e.referenceFontVerticalMetric || e.resolvedResourceVerticalMetric)) ? {
			normalSinglePx: Math.max(u + d - Math.abs(o * a), de),
			positionPx: o * a,
			designDescentPx: v.resolvedDesignDescentRatio * v.fontSize * a
		} : void 0;
		O.push({
			segments: k,
			height: s,
			ascent: u,
			descent: d,
			visibleAscent: f,
			visibleDescent: p,
			visibleIntendedSingle: m,
			intendedSingle: de,
			...g > 0 ? { inlinePictureTextSingle: g } : {},
			uniformPositionAuto: y,
			gridCountSingle: h,
			xOffset: xe,
			availWidth: be,
			topY: c ? Se : void 0,
			hasRuby: Ae,
			eastAsian: je,
			endsWithBreak: t,
			consumedEnd: n ?? z[0]?.src ?? Ve
		}), c && (Se += c.lineBoxH(u, d, Ae, de, je, h, y, g)), k = [], A = 0, M = void 0, ee = !0, te = [], F = void 0, se = 0, ce = 0, le = 0, de = 0, fe = !1, pe = 0, me = 0, he = 0, ge = 0, _e = 0, ve = !1, Ae = !1, je = !1, ye = !1, Te(Ce());
	}, Ne = (e, t) => {
		let n = wc(e, f);
		return !n || ae == null ? t : n === "eastAsia" ? Tc(t, n, ae, Xe(e)) : I?.kind === n ? Tc(I.naturalWidthPx + t, n, ae) - I.allocatedWidthPx : Tc(t, n, ae);
	}, R = (t, n, r, i, o) => {
		let s = n;
		if ("text" in t) {
			let e = wc(t, f), r = t.snapGridNaturalWidthPx ?? n;
			if (e && ae != null) if (t.snapGridClass = e, t.snapGridNaturalWidthPx = r, t.snapGridCellPitchPx = ae, e === "eastAsia") s = Tc(r, e, ae, Xe(t)), t.snapGridLeadingPadPx = 0, t.snapGridTrailingPadPx = s - r, t.measuredWidth = s, I = null;
			else if (I?.kind === e) {
				let n = I.first.snapGridLeadingPadPx ?? 0, i = I.last.snapGridTrailingPadPx ?? 0, a = I.naturalWidthPx + r, o = Tc(a, e, ae), c = o - a, l = e === "latin" ? c / 2 : 0, u = c - l;
				I.first.measuredWidth -= n, I.first.snapGridLeadingPadPx = l, I.first.measuredWidth += l, I.last.measuredWidth -= i, t.snapGridLeadingPadPx = 0, t.snapGridTrailingPadPx = u, t.measuredWidth = r + u, s = o - I.allocatedWidthPx, I = {
					kind: e,
					first: I.first,
					last: t,
					naturalWidthPx: a,
					allocatedWidthPx: o
				};
			} else {
				let n = Tc(r, e, ae), i = n - r, a = e === "latin" ? i / 2 : 0, o = i - a;
				t.snapGridLeadingPadPx = a, t.snapGridTrailingPadPx = o, t.measuredWidth = n, s = n, I = {
					kind: e,
					first: t,
					last: t,
					naturalWidthPx: r,
					allocatedWidthPx: n
				};
			}
			else t.snapGridClass = void 0, t.snapGridLeadingPadPx = void 0, t.snapGridTrailingPadPx = void 0, t.snapGridCellPitchPx = void 0, t.measuredWidth = n, I = null;
		} else I = null;
		if (k.push(t), A += s, "text" in t && t.latinSpaceCompressionEligible === !0 && t.latinSpaceAverageWidthRatio != null && t.fontRoute) {
			if (M && !j(t, M) && (ie(), ee = !1), M ??= t, t.latinNaturalTrailingSpacePx !== void 0) {
				let e = Ai(t, a) * t.latinSpaceAverageWidthRatio / 2 * bc(t) + ac(t, f, a), n = Math.max(0, t.latinNaturalTrailingSpacePx - e);
				F !== void 0 && Math.abs(n - F) > 1e-6 && (ie(), ee = !1), F ??= n, te.push(t);
			}
		} else ie(), ee = !1;
		r > se && (se = r), "imagePath" in t && t.inlinePicture === !0 && (fe = !0, pe = Math.max(pe, (t.paragraphMarkSinglePx ?? 0) * a)), i > ce && (ce = i), o > le && (le = o);
		let c = !("text" in t) || t.metricOnly !== !0;
		c && (ve = !0, i > he && (he = i), o > ge && (ge = o));
		let u = 0;
		if (!("isTab" in t) && !("imagePath" in t) && !("math" in t)) {
			let n = t;
			n.ruby && (Ae = !0);
			let r = n.metricEastAsian === !0 || ji.test(n.text);
			!je && r && (je = !0);
			let i = n.smallCaps && !n.vertAlign ? n.fontSize * a : Pe(n), o = r && !n.ruby, s = n.resolvedLineHeightRatio == null ? Fc(e, l, n.fontRoute, n.fontFamily, n.bold ? 700 : 400, n.italic ? "italic" : "normal", n.text) : null, d = n.textBoxLineFloor && n.ruby ? 0 : Math.max(Qs(n, i, o), n.textBoxLineFloor || n.metricEastAsian === !0 ? $s(n, i, o) : 0), f = Math.max(d, (s ?? 0) * i);
			f > de && (de = f), c && f > _e && (_e = f), o && (u = Oc(d, i));
		} else "isTab" in t || (u = i + o);
		u > me && (me = u);
	}, Pe = (e) => Ai(e, a), Fe = null, Ie = (t) => {
		t !== Fe && (e.font = t, Fe = t);
	}, Le = (t) => {
		let n = e.fontKerning;
		return e.fontKerning = t.kerning != null && t.fontSize >= t.kerning ? "normal" : "none", n;
	}, Re = (t) => {
		t != null && (e.fontKerning = t);
	}, ze = (t, n = !1) => {
		if (t.textLayoutService && t.textShapeRequest) {
			let e = t.textLayoutService.shape({
				...t.textShapeRequest,
				text: t.text,
				fontSizePt: Pe(t),
				measure: !0,
				clusterGeometry: n
			});
			return n && (t.shapedClusters = e.clusters, t.selectedFaceFontBox = {
				ascentPt: e.ascentPt,
				descentPt: e.descentPt
			}, t.selectedFaceInkBounds = e.inkBounds ?? {
				xMinPt: 0,
				xMaxPt: e.advancePt,
				ascentPt: e.ascentPt,
				descentPt: e.descentPt
			}), {
				width: e.advancePt,
				actualBoundingBoxAscent: e.ascentPt,
				actualBoundingBoxDescent: e.descentPt,
				fontBoundingBoxAscent: e.ascentPt,
				fontBoundingBoxDescent: e.descentPt
			};
		}
		Ie(Zs(t.bold, t.italic, Pe(t), t.fontFamily, l, t.fontRoute));
		let r = Le(t), i = e.measureText(t.text);
		return Re(r), i;
	}, Be = (e, t) => {
		if (!e.verticalRun) return 0;
		if (!x) throw Error("Vertical glyph measurement capability is required for vertical text");
		Ie(Zs(e.bold, e.italic, Pe(e), e.fontFamily, l, e.fontRoute));
		let n = Le(e);
		try {
			return x.measureRunInkExtra(t);
		} finally {
			Re(n);
		}
	}, Ve = {
		segIndex: t.length,
		charOffset: 0
	}, He = t.map((e, t) => {
		if (e.src = {
			segIndex: t,
			charOffset: 0
		}, "text" in e && ue(e.text)) {
			let t = pc(e);
			e.seaBreaks = D(e.text, {
				cjk: !0,
				kinsoku: d
			}).filter((e) => !t.has(e));
		}
		return e;
	}), z;
	if (!v) z = He;
	else if (v.segIndex >= He.length) z = [];
	else {
		let e = He[v.segIndex];
		if (v.charOffset > 0) if (!("text" in e) || v.charOffset > e.text.length) z = [];
		else {
			let t = e.text.slice(v.charOffset);
			z = t ? [{
				...e,
				text: t,
				measuredWidth: 0,
				src: { ...v },
				joinPrev: void 0,
				hardJoinPrev: void 0,
				...q(e, v.charOffset, e.text.length),
				seaBreaks: qc(e.seaBreaks, v.charOffset)
			}, ...He.slice(v.segIndex + 1)] : He.slice(v.segIndex + 1);
		}
		else z = He.slice(v.segIndex);
	}
	let Ue = 0, We = -1, Ge = [];
	for (let e = z.length - 1; e >= 0; --e) {
		let t = z[e];
		if (!t || !("text" in t) || t.text.length === 0) break;
		if (t.fitTextRegionIndex !== void 0 || t.tateChuYoko === !0 || t.ruby !== void 0) {
			if (t.sourceRunIndex !== void 0) {
				for (let e = Ge.length - 1; e >= 0; --e) {
					let n = Ge[e];
					n.segment.sourceRunIndex === t.sourceRunIndex && (n.segment.paragraphFinalIdeographicSpaceTail = void 0, n.segment.paragraphFinalIdeographicSpaceLocalCount = void 0, n.segment.paragraphFinalIdeographicSpaceCount = void 0, n.segment.paragraphFinalIdeographicSpaceTailStart = void 0, Ge.splice(e, 1));
				}
				We = Ge.at(-1)?.index ?? -1;
			}
			break;
		}
		let n = /^\u3000+$/u.test(t.text), r = /[^\u3000]\u3000+$/u.test(t.text);
		if (!n && !r) break;
		let i = n ? [...t.text].length : [...t.text].reverse().findIndex((e) => e !== "　");
		if (Ue += i, t.paragraphFinalIdeographicSpaceTail = !0, t.paragraphFinalIdeographicSpaceLocalCount = i, t.paragraphFinalIdeographicSpaceCount = Ue, We = e, Ge.push({
			index: e,
			segment: t
		}), r) break;
	}
	if (We >= 0) {
		let e = z[We];
		e && "text" in e && (e.paragraphFinalIdeographicSpaceTailStart = !0);
	}
	il(z.filter((e) => "text" in e), a, (e) => ze(e).width + Be(e, e.text));
	let Ke = (e) => Cc(e, ze(e).width + Be(e, e.text), f, a), qe = (e, t) => {
		let n = wc(e, f);
		return !n || ae == null || e.text.length === 0 ? t : Tc(t, n, ae, n === "eastAsia" ? Xe(e) : 1);
	}, Je = (e) => qe(e, Ke(e)), Ye = (t, n, r = !1) => {
		let i = r ? t.text.length - n.length : 0, o = {
			...t,
			text: n,
			punctuationCompressions: dc(t, Math.max(0, i), Math.max(0, i) + n.length)
		};
		if (t.textLayoutService && t.textShapeRequest) return Cc(o, t.textLayoutService.shape({
			...t.textShapeRequest,
			text: n,
			fontSizePt: Pe(t),
			measure: !0,
			clusterGeometry: !1
		}).advancePt + Be(t, n), f, a);
		Ie(Zs(t.bold, t.italic, Pe(t), t.fontFamily, l, t.fontRoute));
		let s = Le(t), c = e.measureText(n).width;
		return Re(s), Cc(o, c + Be(t, n), f, a);
	}, Xe = (t) => {
		if (ae == null) return 1;
		t.textLayoutService && t.textShapeRequest && !t.shapedClusters && ze(t, !0);
		let n = t.shapedClusters?.length ? t.shapedClusters : null, r = n == null ? [...new Set([
			0,
			...P(t.text),
			t.text.length
		])].sort((e, t) => e - t) : null, i = n?.map((e) => ({
			start: e.range.start,
			end: e.range.end,
			advancePx: e.advancePt
		})) ?? r.slice(0, -1).map((e, t) => ({
			start: e,
			end: r[t + 1],
			advancePx: void 0
		})), o = 0;
		for (let n of i) {
			let { start: r, end: i } = n;
			if (i <= r) continue;
			let s = t.text.slice(r, i), c = {
				...t,
				text: s,
				punctuationCompressions: dc(t, r, i)
			}, u;
			if (n.advancePx != null) u = Cc(c, n.advancePx + Be(t, s), f, a);
			else {
				Ie(Zs(t.bold, t.italic, Pe(t), t.fontFamily, l, t.fontRoute));
				let n = Le(t), r = e.measureText(s).width;
				Re(n), u = Cc(c, r + Be(t, s), f, a);
			}
			o += Jo(u, ae);
		}
		return Math.max(1, o);
	}, Ze = (e, t, n = !1) => qe({
		...e,
		text: t,
		shapedClusters: t === e.text ? e.shapedClusters : void 0
	}, Ye(e, t, n)), Qe = (e, t) => {
		if (g || h || y !== "bounded" || f?.type === "snapToChars" || f?.type === "linesAndChars" && e.widthBalanceGridDeltaFactor !== .5 || e.latinSpaceCompressionEligible !== !0 || e.latinSpaceAverageWidthRatio == null || !e.fontRoute || e.rtl || e.verticalRun || e.tateChuYoko || e.fitTextRegionIndex !== void 0 || !ee || !M || !j(e, M) || te.length === 0) return !1;
		let n = (F ?? 0) * te.length;
		if (n <= 0) return !1;
		let r = re * ne, i = Math.max(0, A + r + t - L());
		return i > n || !Ee(A + r + t - i, L()) ? !1 : (A += r - i, ne = te.length, re = i / ne, !0);
	}, $e = (t) => {
		let n = ze(t, wc(t, f) === "eastAsia"), r = Cc(t, n.width + Be(t, t.text), f, a);
		t.snapGridNaturalWidthPx = r;
		let i = t.fontSize * a, o = n, s = Pe(t);
		if (t.smallCaps && !t.vertAlign && s !== i) {
			if (t.textLayoutService && t.textShapeRequest) {
				let e = t.textLayoutService.shape({
					...t.textShapeRequest,
					text: t.text || "X",
					fontSizePt: i,
					measure: !0,
					clusterGeometry: !1
				});
				o = {
					width: e.advancePt,
					actualBoundingBoxAscent: e.ascentPt,
					actualBoundingBoxDescent: e.descentPt,
					fontBoundingBoxAscent: e.ascentPt,
					fontBoundingBoxDescent: e.descentPt
				};
			} else {
				let n = e.font;
				e.font = Zs(t.bold, t.italic, i, t.fontFamily, l, t.fontRoute), o = e.measureText(t.text || "X"), e.font = n;
			}
			s = i;
		}
		let c = jc(o, i), u = (t.resolvedResourceVerticalMetric || t.referenceFontVerticalMetric) && !t.ruby && (t.position ?? 0) === 0 && t.resolvedDesignAscentRatio != null && t.resolvedDesignDescentRatio != null, d = u ? t.resolvedDesignAscentRatio * s : c.ascent, p = u ? t.resolvedDesignDescentRatio * s : c.descent;
		if (t.positionExtendsLineBox !== !1) {
			let e = (t.position ?? 0) * a;
			e > 0 ? d += e : e < 0 && (p -= e);
		}
		return t.ruby && (!t.textBoxLineFloor || t.textBoxVertical) && (d += Is(t.ruby.fontSizePt, t.ruby.hpsRaisePt, a, t, e, l)), {
			width: r,
			height: t.fontSize,
			ascent: d,
			descent: p
		};
	}, et = (e) => {
		if (/\s$/u.test(e.text) || e.ruby !== void 0 || e.tateChuYoko === !0 || e.fitTextRegionIndex !== void 0) return;
		let t = z[0];
		if (!t || !("text" in t) || t.joinPrev !== !0 || t.text.length === 0 || [...t.text].some((e) => e !== "　")) return;
		z.shift();
		let n = ts(Yc(e.text), t.paragraphFinalIdeographicSpaceCount ?? [...t.text].length);
		if (n === 0) {
			z.unshift(t);
			return;
		}
		let r = t.text.slice(0, n), i = {
			...t,
			...Fs,
			text: r,
			measuredWidth: 0,
			...q(t, 0, r.length)
		}, a = $e(i);
		i.measuredWidth = a.width, R(i, a.width, a.height, a.ascent, a.descent);
		let o = t.text.slice(r.length);
		o.length > 0 && z.unshift({
			...t,
			...Fs,
			text: o,
			measuredWidth: 0,
			joinPrev: void 0,
			hardJoinPrev: void 0,
			...q(t, r.length, t.text.length),
			src: t.src ? {
				segIndex: t.src.segIndex,
				charOffset: t.src.charOffset + r.length
			} : void 0
		});
	}, tt = (e) => "isTab" in e ? e.measuredWidth || 0 : "imagePath" in e ? e.widthPt * a : "math" in e ? e.measuredWidth || 0 : "lineBreak" in e ? 0 : Je(e), nt = (e) => {
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			if (!("text" in n)) continue;
			let r = n.text.indexOf(".");
			if (r >= 0) return {
				segmentIndex: t,
				charOffset: r
			};
		}
		let t = null, n = !1;
		for (let r = 0; r < e.length; r += 1) {
			let i = e[r];
			if (!("text" in i)) {
				if (n) return t;
				continue;
			}
			let a = 0;
			for (let e of i.text) if (a += e.length, /\p{Decimal_Number}/u.test(e)) n = !0, t = {
				segmentIndex: r,
				charOffset: a
			};
			else if (n) return t;
		}
		return t;
	}, rt = (e) => {
		let t = nt(e);
		if (!t) return;
		let n = 0;
		for (let r = 0; r < t.segmentIndex; r += 1) n += tt(e[r]);
		let r = e[t.segmentIndex];
		return "text" in r ? n + Ze(r, r.text.slice(0, t.charOffset)) : n;
	}, it = () => {
		let e = [], t = 0;
		for (let n of z) {
			if ("isTab" in n || "lineBreak" in n) break;
			e.push(n), t += tt(n);
		}
		let n = rt(e);
		return n === void 0 ? { totalWidth: t } : {
			totalWidth: t,
			decimalPrefixWidth: n
		};
	}, at = null;
	Te(we ? c?.paragraphMarkLineStartWidth ?? Ce() : Ce());
	let ot = (t, n, r = !0) => {
		let i = pc(t), o = [
			0,
			...P(t.text),
			t.text.length
		].filter((e, t, n) => n.indexOf(e) === t), s = 0;
		if (n > 0) if (oc(t, a) >= 0 && wc(t, f) !== "latin") {
			Ie(Zs(t.bold, t.italic, Pe(t), t.fontFamily, l, t.fontRoute));
			let r = Le(t);
			try {
				let r = Xc(e, t.text, n, ac(t, f, a), bc(t), oc(t, a), t.verticalRun === !0, x, (e) => Ze(t, e)).length;
				s = o.filter((e) => e <= r && !i.has(e)).at(-1) ?? 0;
			} finally {
				Re(r);
			}
		} else for (let e of o) e <= 0 || i.has(e) || Ne(t, Ye(t, t.text.slice(0, e))) <= n + 1e-9 && (s = e);
		for (s <= 0 && r && (s = o.find((e) => e > 0 && !i.has(e)) ?? t.text.length); t.text.startsWith("　", s);) s += 1;
		return s;
	}, B = (e, t) => {
		if (!(t > 0) || !e.externalLinkBreakOffsets?.length) return 0;
		let n = 0;
		for (let r of e.externalLinkBreakOffsets) r <= 0 || r >= e.text.length || Ne(e, Ye(e, e.text.slice(0, r))) <= t + 1e-9 && (n = r);
		return n;
	}, st = (e, t) => {
		z.unshift({
			...e,
			...Fs,
			text: e.text.slice(t),
			...q(e, t, e.text.length),
			seaBreaks: qc(e.seaBreaks, t),
			measuredWidth: 0,
			joinPrev: void 0,
			hardJoinPrev: void 0,
			src: {
				segIndex: e.src.segIndex,
				charOffset: e.src.charOffset + t
			}
		});
	}, ct = (e) => {
		let t = e.text.codePointAt(0), n = k[k.length - 1];
		if (t === void 0 || !d.lineStartForbidden.has(t) || n === void 0 || !("text" in n)) return { kind: "none" };
		let r = n, i = [...r.text], a = b(i, d, k.length > 1 ? 0 : 1);
		if (a <= 0) return { kind: "none" };
		let o = i.slice(0, i.length - a).join(""), s = o.length;
		if (s === 0 && r.hardJoinPrev === !0 || pc(r).has(s)) return { kind: "blocked" };
		ie(), ee = !1;
		let c = r.text.slice(s), l = {
			...r,
			...Fs,
			text: c,
			...q(r, s, r.text.length),
			measuredWidth: Ze(r, c, !0),
			joinPrev: void 0,
			hardJoinPrev: void 0,
			src: {
				segIndex: r.src.segIndex,
				charOffset: r.src.charOffset + s
			},
			seaBreaks: qc(r.seaBreaks, s)
		};
		if (o) {
			let e = Ze(r, o);
			A -= r.measuredWidth - e, k[k.length - 1] = {
				...r,
				...Fs,
				text: o,
				measuredWidth: e,
				...q(r, 0, s)
			};
		} else A -= r.measuredWidth, k.pop();
		return {
			kind: "retracted",
			tail: l
		};
	}, lt = (e, t, n, r) => {
		let i = P(e.text)[0] ?? e.text.length;
		if (i <= 0) return !1;
		let a = e.text.slice(0, i), o = Ye(e, a);
		return R({
			...e,
			...Fs,
			text: a,
			measuredWidth: o,
			...q(e, 0, i)
		}, o, t, n, r), i < e.text.length && st(e, i), !0;
	};
	for (; z.length > 0;) {
		let t = z.shift();
		if ("lineBreak" in t) {
			Me(t.fontSize, !0), at = t.fontSize;
			continue;
		}
		if (at = null, "isTab" in t) {
			if (h && !t.ptab) {
				t.measuredWidth = 0, R(t, 0, t.fontSize, t.fontSize * a * .8, t.fontSize * a * .2);
				continue;
			}
			let e = A + (ye ? r : 0);
			if (t.ptab) {
				t.resolvedAlignment = t.ptab.alignment;
				let r = t.ptab.relativeTo === "indent" ? 0 : -u, i = t.ptab.relativeTo === "indent" ? n : m, o = t.ptab.alignment === "left" ? r : t.ptab.alignment === "center" ? (r + i) / 2 : i, s = 0;
				for (let e of z) {
					if ("isTab" in e || "lineBreak" in e) break;
					s += tt(e);
				}
				let c = t.ptab.alignment === "center" ? .5 : +(t.ptab.alignment === "right"), l = o - e - s * c;
				if (l <= 0) {
					if (k.length > 0) {
						Me(void 0, !1, t.src), z.unshift(t);
						continue;
					}
					l = 0;
				}
				if (t.measuredWidth = l, R(t, l, t.fontSize, t.fontSize * a * .8, t.fontSize * a * .2), t.ptab.alignment !== "left") for (; z.length > 0;) {
					let e = z[0];
					if ("isTab" in e || "lineBreak" in e) break;
					if (z.shift(), "imagePath" in e) {
						let t = e.widthPt * a;
						e.measuredWidth = t, R(e, t, e.heightPt, e.heightPt * a, 0);
					} else if ("math" in e) R(e, e.measuredWidth || 0, e.fontSize, e.mathAscent || 0, e.mathDescent || 0);
					else {
						let t = ze(e), n = Cc(e, t.width + Be(e, e.text), f, a);
						e.measuredWidth = n;
						let r = t.fontBoundingBoxAscent ?? t.actualBoundingBoxAscent ?? e.fontSize * a * .8, i = t.fontBoundingBoxDescent ?? t.actualBoundingBoxDescent ?? e.fontSize * a * .2;
						R(e, n, e.fontSize, r, i);
					}
				}
				continue;
			}
			let i = Mi(e + u, s.map((e) => ({
				pos: e.pos * a,
				alignment: e.alignment,
				leader: e.leader
			})), p * a);
			t.resolvedAlignment = i?.alignment ?? "left";
			let o = i ? i.pos - u : e, c = i ? nl(i.alignment) : "leading";
			if (i && c !== "leading") {
				let n = o;
				t.leader = i.leader;
				let r = it(), s = c === "center" ? r.totalWidth / 2 : c === "decimal" ? r.decimalPrefixWidth ?? r.totalWidth : r.totalWidth, l = n - e - s;
				for (l <= 0 && (l = 0), t.measuredWidth = l, R(t, l, t.fontSize, t.fontSize * a * .8, t.fontSize * a * .2); z.length > 0;) {
					let e = z[0];
					if ("isTab" in e || "lineBreak" in e) break;
					if (z.shift(), "imagePath" in e) {
						let t = e.widthPt * a;
						e.measuredWidth = t, R(e, t, e.heightPt, e.heightPt * a, 0);
					} else if ("math" in e) R(e, e.measuredWidth || 0, e.fontSize, e.mathAscent || 0, e.mathDescent || 0);
					else {
						let t = ze(e), n = Cc(e, t.width + Be(e, e.text), f, a);
						e.measuredWidth = n;
						let r = t.fontBoundingBoxAscent ?? t.actualBoundingBoxAscent ?? e.fontSize * a * .8, i = t.fontBoundingBoxDescent ?? t.actualBoundingBoxDescent ?? e.fontSize * a * .2;
						R(e, n, e.fontSize, r, i);
					}
				}
				continue;
			}
			let l = o - e;
			if (i && (t.leader = i.leader), l <= 0) {
				Me(void 0, !1, t.src), z.unshift(t);
				continue;
			}
			if (A + l > L() && k.length > 0) {
				Me(void 0, !1, t.src), z.unshift(t);
				continue;
			}
			t.measuredWidth = l, R(t, l, t.fontSize, t.fontSize * a * .8, t.fontSize * a * .2);
			continue;
		}
		if ("imagePath" in t) {
			if (t.anchor) {
				t.measuredWidth = 0;
				continue;
			}
			let e = t.widthPt * a, n = t.heightPt, r = t.heightPt * a;
			t.measuredWidth = e, k.length > 0 && A + e > L() && Me(void 0, !1, t.src), R(t, e, n, r, 0);
			continue;
		}
		if ("math" in t) {
			let n = t.mathMetadata;
			if (!n || n.available === !1) {
				let n = t.fontSize * a;
				Ie(Zs(!1, !1, n, null, l));
				let r = e.measureText(t.fallbackText), i = r.width, o = r.fontBoundingBoxAscent ?? r.actualBoundingBoxAscent ?? n * .8, s = r.fontBoundingBoxDescent ?? r.actualBoundingBoxDescent ?? n * .2;
				t.measuredWidth = i, t.mathAscent = o, t.mathDescent = s, k.length > 0 && A + i > L() && Me(void 0, !1, t.src), R(t, i, t.fontSize, Math.max(o, n * .8), Math.max(s, n * .2));
				continue;
			}
			let r = t.fontSize * a, i = n.widthEm * r, o = n.ascentEm * r, s = n.descentEm * r;
			t.measuredWidth = i, t.mathAscent = o, t.mathDescent = s;
			let c = Math.max(o, r * .8), u = Math.max(s, r * .2);
			k.length > 0 && A + i > L() && Me(void 0, !1, t.src), R(t, i, t.fontSize, c, u);
			continue;
		}
		let c = t, v = $e(c), y = v.width, b = Ne(c, y), C = v.height, w = v.ascent, E = v.descent, D = c.paragraphFinalIdeographicSpaceTail === !0, O = c.paragraphFinalIdeographicSpaceCount ?? 0, te = c.paragraphFinalIdeographicSpaceLocalCount ?? 0, F = D ? c.text.slice(0, Math.max(0, c.text.length - te)) : c.text;
		if (D && O > 1 && F.length > 0) {
			let e = {
				...c,
				...Fs,
				text: F,
				paragraphFinalIdeographicSpaceTail: void 0,
				paragraphFinalIdeographicSpaceLocalCount: void 0,
				paragraphFinalIdeographicSpaceCount: void 0,
				paragraphFinalIdeographicSpaceTailStart: void 0,
				measuredWidth: 0,
				...q(c, 0, F.length)
			}, t = {
				...c,
				...Fs,
				text: c.text.slice(F.length),
				paragraphFinalIdeographicSpaceLocalCount: te,
				joinPrev: void 0,
				hardJoinPrev: void 0,
				paragraphFinalIdeographicSpaceTailStart: !0,
				measuredWidth: 0,
				...q(c, F.length, c.text.length),
				src: c.src ? {
					segIndex: c.src.segIndex,
					charOffset: c.src.charOffset + F.length
				} : void 0
			};
			z.unshift(t), z.unshift(e);
			continue;
		}
		if (D && /^\u3000+$/u.test(c.text) && c.paragraphFinalIdeographicSpaceTailStart === !0 && k.some((e) => "text" in e && /[^\u3000]/u.test(e.text))) {
			let e = y;
			for (let t of z) {
				if (!("text" in t) || t.paragraphFinalIdeographicSpaceTail !== !0) break;
				e += Je(t);
			}
			if (A + e > L()) {
				Me(void 0, !1, c.src), z.unshift(c);
				continue;
			}
		}
		if (c.fitTextRegionIndex !== void 0) {
			if (c.fitTextRegionStart) {
				let e = y;
				for (let t of z) {
					if (!("text" in t) || t.fitTextRegionIndex !== c.fitTextRegionIndex) break;
					e += Je(t);
				}
				k.length > 0 && A + e > L() && Me(void 0, !1, c.src);
			}
			c.measuredWidth = y, R(c, y, C, w, E);
			continue;
		}
		let ne = c.text.replace(/ +$/, ""), ie = wc(c, f) ? 0 : c.text.endsWith(" ") ? y - Ze(c, ne) : 0;
		c.latinNaturalTrailingSpacePx = c.latinSpaceCompressionEligible === !0 && /^[^ ]+ $/u.test(c.text) && ie > 0 ? ie : void 0, c.latinSpaceCompressionPx = void 0;
		let ae = (e) => {
			let t = e === void 0 || "lineBreak" in e;
			return g && (!t || _);
		}, I = (e, t, r) => ds({
			widthPx: e,
			trailingSpacePx: t,
			lineWillJustify: ae(r),
			wrapNarrowed: be !== n || xe !== 0
		}), se = I(b, ie, z[0]), ce = c.seaBreaks !== void 0 && N(c.text);
		if (!c.joinPrev && k.length > 0 && z[0]?.joinPrev && (z[0]?.hardJoinPrev === !0 || !Uc(c.text)) && (z[0]?.hardJoinPrev === !0 || !(c.seaBreaks && c.seaBreaks.length > 0))) {
			let e = y, t = ie, n = 0;
			for (; n < z.length && z[n].joinPrev; n++) {
				let r = z[n], a = hc(r);
				if (a !== void 0) {
					let n = r.text.slice(0, a), i = Ze(r, n);
					if (e += i, t = n.endsWith(" ") ? i - Ze(r, n.replace(/ +$/, "")) : 0, a < r.text.length) break;
					continue;
				}
				let o = r.externalLinkBreakOffsets?.[0];
				if (o !== void 0) {
					let n = Ze(r, r.text.slice(0, o));
					e += n, t = 0;
					break;
				}
				if (Uc(r.text)) {
					let n = [...r.text], a = 0;
					for (; a < n.length && i.lineStartForbidden.has(n[a].codePointAt(0));) a++;
					if (a < n.length) {
						let i = Ze(r, n.slice(0, a).join(""));
						e += i, t = 0;
						break;
					}
				}
				let s = Je(r);
				e += s;
				let c = r.text.replace(/ +$/, ""), l = r.text.endsWith(" ") ? s - Ze(r, c) : 0;
				t = c.length === 0 && t > 0 ? t + l : l;
			}
			A + I(e, t, z[n]) > L() && Me(void 0, !1, c.src);
		}
		if (ce && k.length > 0 && (() => {
			let e = k[k.length - 1];
			return !("text" in e) || e.text.endsWith(" ");
		})()) {
			let e = y, t = ie, n = 0;
			if (!c.text.endsWith(" ")) for (; n < z.length; n++) {
				let r = z[n];
				if (!("text" in r) || r.seaBreaks === void 0 || !N(r.text)) break;
				let i = r, a = Je(i), o = i.text.replace(/ +$/, "");
				if (e += a, t = i.text.endsWith(" ") ? a - Ze(i, o) : 0, i.text.endsWith(" ")) {
					n++;
					break;
				}
			}
			let r = I(e, t, z[n]);
			A + r > L() && r <= be && Me(void 0, !1, c.src);
		}
		let le = [...ne], ue = le.at(-1), de = le.slice(0, -1).join(""), fe = S && ue !== void 0 && (k.length > 0 || de.length > 0) && us(ue, c.eastAsiaLanguage, c.overflowPunctuationEastAsianRun === !0, c.script === "ascii" || c.script === "highAnsi", c.script === "complexScript", c.overflowPunctuationBidiLanguage) && A + Ze(c, de) <= L();
		if (re > 0 && (!ee || !M || !j(c, M))) {
			Me(void 0, !1, c.src), z.unshift(c);
			continue;
		}
		if (Ee(A + se, L()) && re === 0 || Qe(c, se) || Ee(A + se, L())) c.measuredWidth = y, R(c, y, C, w, E), et(c);
		else if (fe) c.measuredWidth = y, R(c, y, C, w, E), et(c);
		else if (Uc(c.text) && c.seaBreaks === void 0 && c.hardJoinPrev !== !0) {
			let t = L() - A, n = "", r = D ? ts(Yc(c.text), c.paragraphFinalIdeographicSpaceCount ?? 0) : Infinity;
			if (t > 0) if (oc(c, a) < 0 || wc(c, f) === "latin") n = c.text.slice(0, ot(c, t, !1));
			else {
				Ie(Zs(c.bold, c.italic, Pe(c), c.fontFamily, l, c.fontRoute));
				let i = Le(c);
				try {
					n = Xc(e, c.text, t, ac(c, f, a), bc(c), oc(c, a), c.verticalRun === !0, x, (e) => Ze(c, e), r);
				} finally {
					Re(i);
				}
			}
			let i = [...c.text], s = [...n].length, u = k.length > 0 ? 0 : 1, p = Jc(i, (S && s < i.length && (k.length > 0 || s > 0) && us(i[s], c.eastAsiaLanguage, c.overflowPunctuationEastAsianRun === !0, c.script === "ascii" || c.script === "highAnsi", c.script === "complexScript", c.overflowPunctuationBidiLanguage) ? s + 1 : null) ?? o(i, s, d, u), D && r === 0 ? 0 : r), m = i.slice(0, p).join("").length, h = mc(c, m, +(u > 0)), g = c.text.slice(0, h);
			if (g.length > 0) {
				let e = Ye(c, g);
				R({
					...c,
					...Fs,
					text: g,
					measuredWidth: e,
					...q(c, 0, g.length)
				}, e, C, w, E);
				let t = c.text.slice(g.length);
				t ? z.unshift({
					...c,
					...Fs,
					text: t,
					...q(c, g.length, c.text.length),
					measuredWidth: 0,
					src: {
						segIndex: c.src.segIndex,
						charOffset: c.src.charOffset + g.length
					}
				}) : et(c);
			} else if (k.length > 0) {
				let e = ct(c);
				if (e.kind === "blocked") {
					lt(c, C, w, E);
					continue;
				}
				Me(void 0, !1, e.kind === "retracted" ? e.tail.src : c.src), z.unshift(c), e.kind === "retracted" && z.unshift(e.tail);
			} else {
				let e = [...c.text], t = e.length > 0 ? Jc(e, 1, c.paragraphFinalIdeographicSpaceTail === !0 ? ts(ji.test(e[0] ?? ""), c.paragraphFinalIdeographicSpaceCount ?? 0) : Infinity) : 0, n = e.slice(0, t).join("").length, r = mc(c, n) || ot(c, L(), !0), i = c.text.slice(0, r);
				if (i) {
					let e = Ye(c, i);
					R({
						...c,
						...Fs,
						text: i,
						measuredWidth: e,
						...q(c, 0, i.length)
					}, e, C, w, E);
					let t = c.text.slice(i.length);
					t ? z.unshift({
						...c,
						...Fs,
						text: t,
						...q(c, i.length, c.text.length),
						measuredWidth: 0,
						src: {
							segIndex: c.src.segIndex,
							charOffset: c.src.charOffset + i.length
						}
					}) : et(c);
				}
			}
		} else if (c.seaBreaks !== void 0 && c.hardJoinPrev !== !0) {
			let e = L() - A, t = (e) => Ze(c, e), n = T(c.text) && oc(c, a) >= 0 && wc(c, f) !== "latin", r = oe(c.text, c.seaBreaks, 0, e, t, n);
			if (r > 0) {
				let e = c.text.slice(0, r), t = Ye(c, e);
				R({
					...c,
					...Fs,
					text: e,
					measuredWidth: t,
					...q(c, 0, e.length)
				}, t, C, w, E);
				let n = c.text.slice(r);
				n && z.unshift({
					...c,
					...Fs,
					text: n,
					...q(c, r, c.text.length),
					measuredWidth: 0,
					src: {
						segIndex: c.src.segIndex,
						charOffset: c.src.charOffset + r
					},
					seaBreaks: qc(c.seaBreaks, r)
				});
			} else if (k.length > 0) {
				let e = ct(c);
				if (e.kind === "blocked") {
					lt(c, C, w, E);
					continue;
				}
				Me(void 0, !1, e.kind === "retracted" ? e.tail.src : c.src), z.unshift(c), e.kind === "retracted" && z.unshift(e.tail);
			} else {
				let r = c.seaBreaks[0] ?? c.text.length, i = c.text.slice(0, r), a = P(i), o = oe(i, a, 0, e, t, n);
				o <= 0 && (o = a.length > 0 ? a[0] : i.length), o = mc(c, o) || ot(c, e, !0);
				let s = c.text.slice(0, o), l = Ye(c, s);
				R({
					...c,
					...Fs,
					text: s,
					measuredWidth: l,
					...q(c, 0, s.length)
				}, l, C, w, E);
				let u = c.text.slice(o);
				u && z.unshift({
					...c,
					...Fs,
					text: u,
					...q(c, o, c.text.length),
					measuredWidth: 0,
					src: {
						segIndex: c.src.segIndex,
						charOffset: c.src.charOffset + o
					},
					seaBreaks: qc(c.seaBreaks, o)
				});
			}
		} else if (k.length === 0) {
			let e = B(c, L()) || ot(c, L());
			if (e >= c.text.length) c.measuredWidth = y, R(c, y, C, w, E);
			else {
				let t = c.text.slice(0, e), n = Ye(c, t);
				R({
					...c,
					...Fs,
					text: t,
					measuredWidth: n,
					...q(c, 0, t.length)
				}, n, C, w, E), st(c, e);
			}
		} else {
			let e = B(c, L() - A);
			if (e > 0 && e < c.text.length) {
				let t = c.text.slice(0, e), n = Ye(c, t);
				R({
					...c,
					...Fs,
					text: t,
					measuredWidth: n,
					...q(c, 0, t.length)
				}, n, C, w, E), st(c, e);
				continue;
			}
			if (c.joinPrev) {
				let e = L() - A, t = ot(c, e, !0);
				if ((e > 0 || c.hardJoinPrev === !0) && t > 0 && t < c.text.length) {
					let e = c.text.slice(0, t), n = Ye(c, e);
					R({
						...c,
						...Fs,
						text: e,
						measuredWidth: n,
						...q(c, 0, e.length)
					}, n, C, w, E), st(c, t);
					continue;
				}
				c.measuredWidth = y, R(c, y, C, w, E);
				continue;
			}
			Me(void 0, !1, c.src), z.unshift(c);
		}
	}
	if (k.length > 0 ? Me() : at !== null && Me(at), y === "bounded") for (let e of O) for (let t of e.segments) !("text" in t) || t.metricOnly || t.text.length === 0 || (t.shapedClusters = void 0, t.textLayoutService && t.textShapeRequest && ze(t, !0));
	return O;
}
//#endregion
//#region packages/docx/src/bidi-line.ts
var _l = (e) => {
	let t = e.text;
	return typeof t == "string" ? t : void 0;
}, vl = (e) => e.rtl === !0, yl = (e) => e.digitsAsAN === !0, bl = (e) => "isTab" in e;
function xl(e) {
	for (let n of e) {
		if (vl(n)) return !0;
		let e = _l(n);
		if (e !== void 0 && t(e)) return !0;
	}
	return !1;
}
function Sl(e, t) {
	let n = e.length;
	if (n === 0) return {
		order: [],
		rtl: []
	};
	let r = "", i = Array(n), a = Array(n), o, s = () => {
		for (o ||= []; o.length < r.length;) o.push(null);
		return o;
	};
	for (let t = 0; t < n; t++) {
		let n = _l(e[t]) ?? "";
		if (i[t] = r.length, r += n.length > 0 ? n : "￼", a[t] = r.length, bl(e[t])) s()[i[t]] = "S";
		else if (n.length > 0 && (yl(e[t]) || vl(e[t]))) {
			let n = s(), o = yl(e[t]), c = vl(e[t]);
			for (let e = i[t]; e < a[t]; e++) {
				let t = r.charCodeAt(e);
				o && t >= 48 && t <= 57 ? n[e] = "AN" : c && Ms(r[e]) && (n[e] = "R");
			}
		}
	}
	if (o) for (; o.length < r.length;) o.push(null);
	let { levels: c, paragraphLevel: l } = ne().computeLevels(r, t ? "rtl" : "ltr", o), u = Array(n), d = Array(n);
	for (let e = 0; e < n; e++) {
		let t = a[e];
		for (; t > i[e] && r[t - 1] === " ";) t--;
		let n = !1;
		for (let r = i[e]; r < t; r++) {
			let e = c[r];
			if (e !== 255 && (e & 1) == 1) {
				n = !0;
				break;
			}
		}
		u[e] = n, d[e] = i[e];
		for (let r = i[e]; r < t; r++) {
			let t = c[r];
			if (t !== 255 && (t & 1) == 1 === n) {
				d[e] = r;
				break;
			}
		}
	}
	let { order: f } = ie(c, l, d);
	return {
		order: f,
		rtl: u
	};
}
function Cl(e, t) {
	switch (e) {
		case "center": return "center";
		case "both":
		case "justify":
		case "distribute":
		case "lowKashida":
		case "mediumKashida":
		case "highKashida":
		case "thaiDistribute": return "justify";
		case "end":
		case "right": return t ? "left" : "right";
		case "start":
		case "left":
		case void 0:
		default: return t ? "right" : "left";
	}
}
function wl(e) {
	switch (e) {
		case "both":
		case "justify":
		case "distribute":
		case "lowKashida":
		case "mediumKashida":
		case "highKashida":
		case "thaiDistribute": return !0;
		default: return !1;
	}
}
function Tl(e) {
	return e === "distribute";
}
//#endregion
//#region packages/docx/src/layout/float-wrap-oracle.ts
function El(e, t) {
	let n = e.map((e) => Object.freeze({ ...e })), r = _o(n);
	return {
		lineWindow: ({ topYPt: e, minimumStartWidthPt: n, squareMinimumStartWidthPt: i, probeHeightPt: a, paragraphXPt: o, maximumWidthPt: s, columnXPt: c, columnWidthPt: l }) => {
			let u = Fo(e, n, a, o, s, r, c, c + l, t ?? {
				xLeftPt: o,
				xRightPt: o + s,
				readingDirection: "ltr"
			}, i ?? n);
			return {
				topYPt: u.topY,
				xOffsetPt: u.xOffset,
				maximumWidthPt: u.maxWidth
			};
		},
		skipTopAndBottomBands: ({ yPt: e, columnXPt: t, columnWidthPt: r }) => Io(e, n, t, t + r)
	};
}
//#endregion
//#region packages/docx/src/paragraph-measure.ts
function Dl(e) {
	if (e.characterGrid.active) return {
		type: e.characterGrid.kind,
		linePitchPt: null,
		characterPitchPt: e.characterGrid.pitchPt,
		charSpacePt: e.characterGrid.deltaPt
	};
}
function Ol(e) {
	let t = Dl(e);
	return {
		type: t ? t.type : e.lineGrid.active ? "lines" : null,
		linePitchPt: e.lineGrid.active ? e.lineGrid.pitchPt : null,
		characterPitchPt: e.characterGrid.active ? e.characterGrid.pitchPt : null,
		charSpacePt: e.characterGrid.active ? e.characterGrid.deltaPt : null
	};
}
function kl(e, t) {
	if (!Ec(t)) return e;
	let n = t.linePitchPt;
	return n <= 0 ? e : e <= n ? n : Math.ceil(e / n) * n;
}
function Al(e, t, n, r, i, a) {
	let o = Ol(t), s = Iu(t, n.availableWidthPt), c = Math.max(1, n.availableWidthPt - t.physicalIndentLeftPt - t.physicalIndentRightPt - s), l = n.paragraphXPt + t.physicalIndentLeftPt, u = t.spaceBeforePt, d = t.spaceAfterPt, f = Object.freeze({ ...n }), p = r.fontFamilyClasses, m = i.documentHasEastAsianText === !0 || i.useFeLayout === !0, h = n.startYPt + (n.suppressSpaceBefore ? 0 : u);
	n.wrap && (h = n.wrap.skipTopAndBottomBands({
		yPt: h,
		columnXPt: n.paragraphXPt,
		columnWidthPt: n.availableWidthPt
	}));
	let g = () => {
		let a = h, s = Lc(e, 1, o, t.hasRuby, m, r.context, p, t.lineSpacing, i.resolvedLocalFonts, i.layoutServices?.text, i.paragraphMarkShapeInput, i.useFeLayout === !0);
		return n.wrap && (a = n.wrap.lineWindow({
			topYPt: a,
			minimumStartWidthPt: ec(e),
			squareMinimumStartWidthPt: Va(ec(e), 1),
			probeHeightPt: s,
			paragraphXPt: l,
			maximumWidthPt: c,
			columnXPt: n.paragraphXPt,
			columnWidthPt: n.availableWidthPt
		}).topYPt), {
			lines: [],
			markOnly: !0,
			requestedSpaceBeforePt: u,
			requestedSpaceAfterPt: d,
			uniformRubyAdvancePt: 0,
			contentStartYPt: a,
			contentEndYPt: a + s,
			lastLineBelowBaselinePt: zc(e, o, t.hasRuby, m, r.context, p, t.lineSpacing, i.resolvedLocalFonts, i.layoutServices?.text, i.paragraphMarkShapeInput, i.useFeLayout === !0),
			placement: f
		};
	}, _ = hl(e.runs, {
		...i,
		lineSpacing: t.lineSpacing,
		lineGridActive: t.lineGrid.active
	});
	if (_.length === 0) return g();
	if (t.lineSpacing?.rule === "auto" && t.lineSpacing.value > 1 && _.some((e) => "imagePath" in e && e.inlinePicture === !0)) {
		let t = Ic(e, 1, void 0, !1, m, r.context, p, null, i.resolvedLocalFonts, i.layoutServices?.text, i.paragraphMarkShapeInput).advancePx;
		for (let e of _) "imagePath" in e && e.inlinePicture === !0 && (e.paragraphMarkSinglePx = t);
	}
	let v = n.wrap ? {
		startPageY: h,
		paraX: l,
		columnXPt: n.paragraphXPt,
		columnWidthPt: n.availableWidthPt,
		floats: [],
		paragraphMarkLineStartWidth: Va(ec(e), 1),
		lineWindow: (e) => n.wrap.lineWindow(e),
		lineBoxH: (e, n, r, i, a, s, c, l) => kc(t.lineSpacing, e, n, 1, o, t.hasRuby, i ?? 0, t.hasRuby ? t.hasEastAsianText : a ?? !1, s, void 0, c, l),
		pageH: n.maximumYPt
	} : void 0, y = gl(r.context, _, c, a ? 0 : t.firstIndentPt, 1, [...t.tabStops], v, p, t.physicalIndentLeftPt, t.kinsoku, o, t.defaultTabPt, c + t.physicalIndentRightPt + s, t.baseRtl, t.isJustified, t.stretchLastLine, a?.boundary, void 0, i.verticalGlyphMeasurement, t.overflowPunct !== !1);
	if (y.length === 0) return g();
	let b = t.hasRuby ? kl(Math.max(0, ...y.map((e) => kc(t.lineSpacing, e.ascent, e.descent, 1, o, !0, e.intendedSingle, t.hasEastAsianText))), o) : 0;
	t.hasRuby && a?.uniformRubyAdvancePt !== void 0 && (b = Math.max(b, a.uniformRubyAdvancePt));
	let x = [];
	for (let [e, r] of y.entries()) {
		let s = e === 0 && !a && !n.wrap && !t.lineGrid.active && t.lineSpacing?.rule === "auto" && t.lineSpacing.value >= 1 && !t.hasRuby && !r.uniformPositionAuto && !r.inlinePictureTextSingle ? i.firstLineNumberingMarkerBox : void 0, c = s?.ascentPt, l = s?.descentPt, u = c !== void 0 && l !== void 0 && Number.isFinite(c) && Number.isFinite(l) ? {
			...r,
			ascent: Math.max(r.ascent, c),
			descent: Math.max(r.descent, l),
			visibleAscent: Math.max(r.visibleAscent ?? r.ascent, c),
			visibleDescent: Math.max(r.visibleDescent ?? r.descent, l)
		} : r, d = u.topY !== void 0 && u.topY > h ? u.topY : h, f = Math.max(r.ascent + r.descent, r.intendedSingle), p = u.ascent + u.descent, m = u !== r && p > f ? p + f * ((t.lineSpacing?.value ?? 1) - 1) : t.hasRuby ? b : kc(t.lineSpacing, u.ascent, u.descent, 1, o, !1, u.intendedSingle, u.eastAsian ?? !1, u.gridCountSingle, void 0, u.uniformPositionAuto, u.inlinePictureTextSingle);
		x.push({
			layout: u,
			topYPt: d,
			advancePt: m
		}), h = d + m;
	}
	let S = x[x.length - 1];
	return {
		lines: x,
		markOnly: !1,
		requestedSpaceBeforePt: u,
		requestedSpaceAfterPt: d,
		uniformRubyAdvancePt: b,
		contentStartYPt: x[0].topYPt,
		contentEndYPt: h,
		lastLineBelowBaselinePt: Rc(S.advancePt, S.layout.ascent, S.layout.descent),
		placement: f
	};
}
//#endregion
//#region packages/docx/src/layout/numbering-marker.ts
function jl(e) {
	let t = e.leadingIndentPt + e.authoredFirstIndentPt + e.markerShiftPt;
	return {
		startPt: t,
		endPt: t + e.markerWidthPt
	};
}
function Ml(e) {
	let t = e.authoredFirstIndentPt + e.markerShiftPt;
	return e.baseRtl ? e.alignedLeadingEdgePt - t - e.markerWidthPt : e.alignedLeadingEdgePt + t;
}
function Nl(e, t) {
	let { numbering: n, markerInput: r, service: i } = t, a = n != null && (n.text !== "" || n.picBulletImagePath != null) && (!e.baseRtl || (n?.suff || "tab") === "tab" && t.authoredFirstIndentPt < 0);
	if (!n || !r || !i || !a) return e;
	let o = Il(n, r, {
		authoredFirstIndentPt: t.authoredFirstIndentPt,
		physicalIndentLeftPt: e.physicalIndentLeftPt,
		tabStops: t.tabStops,
		defaultTabPt: t.defaultTabPt ?? e.defaultTabPt
	}, i, t.clusterGeometry ?? !0);
	return {
		...e,
		firstIndentPt: o.bodyOffsetPt,
		numberingMarkerGeometry: o
	};
}
function Pl(e, t, n, r, i = !0) {
	return r ? {
		shape: r.shape({
			text: t,
			fontSizePt: e.fontSizePt * n,
			fonts: e.fonts,
			themeFonts: e.themeFonts,
			themeFontPresence: e.themeFontPresence,
			weight: e.weight,
			style: e.style,
			complexScript: e.complexScript,
			fontHint: e.fontHint,
			eastAsiaLanguage: e.eastAsiaLanguage,
			kerning: e.kerning ?? !1,
			measure: !0,
			clusterGeometry: i
		}),
		fontSizePx: e.fontSizePt * n
	} : null;
}
function Fl(e, t, n) {
	return t.find((t) => fs(e, t)) ?? Mi(e, [...t], n);
}
function Il(e, t, n, r, i = !0) {
	let a = e.picBulletImagePath ? "" : R(e.text, e.fontFamily ?? null), o = a ? Pl(t, a, 1, r, i)?.shape ?? null : null, s = e.picBulletImagePath ? e.picBulletWidthPt ?? t.fontSizePt : o?.advancePt ?? 0, c = e.jc === "right" ? -s : e.jc === "center" ? -s / 2 : 0, l = n.authoredFirstIndentPt + c + s, u = e.suff || "tab", d = l;
	if (u === "space") d += Pl(t, " ", 1, r, i)?.shape.advancePt ?? 0;
	else if (u === "tab" && (d = 0, l > 0)) {
		let e = Fl(n.physicalIndentLeftPt + l, n.tabStops, n.defaultTabPt);
		d = e ? e.pos - n.physicalIndentLeftPt : l;
	}
	return d = Math.max(0, d), {
		bodyOffsetPt: d,
		markerText: a,
		markerWidthPt: s,
		markerShiftPt: c,
		shape: o
	};
}
W({
	id: "word-autofit-empty-paragraph-content-width",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "autofit-empty-paragraph-boundary-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "For table AutoFit content width, Word gives an empty unnumbered paragraph no intrinsic content width regardless of effective right, left, first-line, or hanging indentation. Cell margins still contribute, while whitespace, non-breaking space, visible text, and numbering remain content-bearing controls."
});
function Ll(e) {
	return e.runs.length === 0 && e.numbering == null;
}
W({
	id: "word-exact-row-height-bottom-padding",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §2.1.180(d)"
	},
	description: "Word adds the largest bottom cell margin to an exact trHeight instead of treating that margin as part of the authored height."
}), W({
	id: "word-table-border-layer-cascade",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §2.1.169"
	},
	description: "During per-side border acquisition, none falls through to a lower-precedence layer while nil remains authored and blocks fallback only on that side."
}), W({
	id: "word-spaced-cell-inside-border-conflict",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §§2.1.136, 2.1.138"
	},
	description: "With non-zero cell spacing, Word retains the narrow conditional tcBorders insideH/insideV conflict against the corresponding table inside border."
}), W({
	id: "word-table-indent-all-alignments",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §2.1.155"
	},
	description: "Word applies tblInd as a signed leading-edge translation for every table alignment, reversing the translation for bidi visual order."
}), W({
	id: "word-exact-row-vertical-clip-only",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/table.test.ts#clips an overflowing merged owner when every row in its span is exact"
	},
	description: "Preserve the established exact-row overflow behavior that clips the owned vertical interval without clipping nested table ink horizontally to the cell box."
}), W({
	id: "word-over-page-cant-split-clip",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §2.1.120"
	},
	description: "Word starts an over-page cantSplit row on a fresh page and clips its overflow instead of synthesizing a row continuation."
}), W({
	id: "word-over-page-cell-break-occupancy",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "over-page-cell-followed-by-authored-break",
		application: "Microsoft Word",
		version: "16.113.2",
		platform: "macOS 27.0"
	},
	description: "A table-cell paragraph taller than the body band counts its invisible continuation page before a following authored page break. A fitting paragraph does not. This holds with and without cantSplit; without the authored break, the next paragraph starts at the top of the continuation page. Tested at 500pt and 800pt against a 648pt body band, so farther overflow remains an inferred geometric extension."
}), W({
	id: "word-authored-row-height-page-boundary",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "ordinary-table-row-height-boundary-matrix",
		application: "Microsoft Word",
		version: "16.113.2",
		platform: "macOS 27.0"
	},
	description: "Word relocates an ordinary splittable exact-height row, or an atLeast row whose authored minimum governs its complete height, when that height exceeds the remaining page band and fits a fresh page. A shorter atLeast minimum permits content fragmentation; an auto row may fragment. Tested with cantSplit on/off, fitting/overflow bands, and keepLines/widow controls. Repeated headers and atLeast rows expanded by content are outside this observation."
}), W({
	id: "word-cell-owned-anchor-page-cut",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "cell-owned-anchor-page-band-boundary",
		application: "Microsoft Word",
		version: "16.113.2",
		platform: "macOS 27.0"
	},
	description: "For an atLeast row without cantSplit containing a layoutInCell, allowOverlap wrapNone image, Word permits the image past its row border while the image stays in the page body band. Controlled preceding-spacing cases at 0pt and 40pt kept the row; at 80pt Word moved the complete row to the next page. A separate near-edge control confirmed that trailing empty cell paragraphs may still form an empty row continuation. Other anchor wrap/row-height combinations and over-page images are outside this observation."
});
function Rl(e) {
	return e.compatibility === "word" && e.availableHeightPt + e.epsilonPt < e.freshPageHeightPt;
}
W({
	id: "word-parallel-paragraph-row-cut",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "parallel-paragraph-row-cut-boundary-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "When a page cut crosses a row containing parallel paragraph content, Word emits no cell content unless every unfinished paragraph cell can reach at least its first legal line or block boundary in that page band. The observed rule does not cover nested-table child boundaries."
}), W({
	id: "word-positioned-table-adjacency-exclusion",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §2.1.149(a)"
	},
	description: "Word excludes effectively positioned tables from the logical adjacent-table sequence before retained layout consumes the parser-owned sequence identity."
}), W({
	id: "word-table-border-weight-precedence",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §2.1.169"
	},
	description: "Use the documented Word border numbers for shared-cell conflict weight and force dotted and dashed borders to a complete weight of one."
}), W({
	id: "word-omitted-row-height-rule-at-least",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §2.1.180"
	},
	description: "Treat an omitted trHeight hRule as atLeast while retaining an explicitly authored auto rule as authored input."
}), W({
	id: "word-authored-auto-row-height-floor",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/table-row-height.test.ts#auto with @val — @val is honored as a lower bound"
	},
	description: "Preserve the established legacy-model behavior that an auto row with an authored height value uses that value as a lower bound."
}), W({
	id: "word-collapsed-border-row-track-footprint",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "collapsed-border-row-track-matrix",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "For automatic and at-least table rows with collapsed cell boundaries, Word includes half of the winning top and bottom rule widths in each row track. Exact rows retain their authored complete height, and cell spacing keeps independent edges out of the collapsed footprint."
}), W({
	id: "word-effective-floating-table-positioning",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §2.1.162"
	},
	description: "Use parser-retained effective positioning status rather than lexical tblpPr presence to decide whether a table leaves ordinary flow."
}), W({
	id: "word-table-cell-spacing-scope-shadow",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §§2.1.152, 2.1.153, 2.1.154"
	},
	description: "At each table-cell-spacing precedence scope, pct, auto, and nil resolve to zero and shadow lower scopes instead of being treated as absent."
}), W({
	id: "word-table-margin-scope-shadow",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §§2.1.116, 2.1.125, 2.1.146, 2.1.177"
	},
	description: "Preserve the documented scope-specific treatment of non-dxa table cell margins: leading/trailing defaults may resolve to zero while cell/exception and nil top/bottom values remain ignored."
}), W({
	id: "word-first-row-table-exception-scope",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §§2.1.156, 2.1.158, 2.1.167"
	},
	description: "Apply the supported first-row table-property exception facts at table scope, including authored preferred-width shadowing."
}), W({
	id: "word-trailing-structural-cell-marker",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/compatibility.test.ts#drops only an empty trailing paragraph after a non-paragraph cell block"
	},
	description: "Exclude the required empty trailing cell paragraph from row-height and vertical-alignment measurements when it follows a visible non-paragraph block."
}), W({
	id: "word-cell-vertical-alignment-ink-block",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/cell-valign-leading-spacing.test.ts#inked block is vertically centred in the cell (midpoint = cell midpoint)"
	},
	description: "Center or bottom-align the visible cell ink block without charging the first paragraph spaceBefore or final paragraph spaceAfter at the cell edges."
}), W({
	id: "word-vertical-merge-terminal-border",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/cell-border-conflict-render.test.ts#uses the final continuation cell border at the bottom of a vertical merge"
	},
	description: "Resolve the bottom edge of a vertically merged cell from its terminal continuation cell before applying shared-edge conflict rules."
}), W({
	id: "word-vertical-section-upright-block-table",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/vertical-table-upright.test.ts#the table advances the flow by its PHYSICAL WIDTH; body text stays vertical"
	},
	description: "Paint a block table in an upright physical frame within a vertical section and charge its physical width as the body-flow advance."
});
function zl(e, t) {
	return Math.max(0, e ?? 0) + Math.max(0, ...t);
}
function Bl(e, t) {
	return (Math.max(0, e) + Math.max(0, t)) / 2;
}
function Vl(e) {
	return e != null && e !== "none";
}
function Hl(e, t, n) {
	return n ? e - t : e + t;
}
function Ul(e) {
	return e.spacingPt > 0 && !Vl(e.directStyle) && Vl(e.conditionalInsideStyle);
}
function Wl(e, t) {
	let n = Math.min(e.xPt, t.xPt), r = Math.max(e.xPt + e.widthPt, t.xPt + t.widthPt);
	return Object.freeze({
		xPt: n,
		yPt: e.yPt,
		widthPt: r - n,
		heightPt: e.heightPt
	});
}
function Gl(e) {
	return e.compatibility === "word" && e.availableHeightPt + e.epsilonPt >= e.freshPageHeightPt;
}
function Kl(e) {
	return e.compatibility === "word" && !e.repeatedHeader && (e.heightRule === "exact" || e.heightRule === "atLeast") && e.authoredHeightPt !== null && (e.heightRule === "exact" || e.wholeHeightPt <= e.authoredHeightPt + e.epsilonPt) && e.authoredHeightPt > e.availableHeightPt + e.epsilonPt && e.wholeHeightPt <= e.freshAvailableHeightPt + e.epsilonPt;
}
function ql(e) {
	return e.compatibility === "word" && e.hasUnfinishedParagraphWithoutProgress;
}
var Jl = Object.freeze([
	"single",
	"thick",
	"double",
	"dotted",
	"dashed",
	"dotDash",
	"dotDotDash",
	"triple",
	"thinThickSmallGap",
	"thickThinSmallGap",
	"thinThickThinSmallGap",
	"thinThickMediumGap",
	"thickThinMediumGap",
	"thinThickThinMediumGap",
	"thinThickLargeGap",
	"thickThinLargeGap",
	"thinThickThinLargeGap",
	"wave",
	"doubleWave",
	"dashSmallGap",
	"dashDotStroked",
	"threeDEmboss",
	"threeDEngrave",
	"outset",
	"inset"
]), Yl = Object.freeze({
	single: 1,
	thick: 2,
	double: 3,
	dotDash: 8,
	dotDotDash: 9,
	triple: 10,
	thinThickSmallGap: 11,
	thickThinSmallGap: 12,
	thinThickThinSmallGap: 13,
	thinThickMediumGap: 14,
	thickThinMediumGap: 15,
	thinThickThinMediumGap: 16,
	thinThickLargeGap: 17,
	thickThinLargeGap: 18,
	thinThickThinLargeGap: 19,
	wave: 20,
	doubleWave: 21,
	dashSmallGap: 22,
	dashDotStroked: 23,
	threeDEmboss: 24,
	threeDEngrave: 25,
	outset: 26,
	inset: 27
});
function Xl(e, t) {
	return e === "dotted" || e === "dashed" ? 1 : Math.max(0, t) * 8 * (Yl[e] ?? 0);
}
function Zl(e, t) {
	return t ? e : "atLeast";
}
function Ql(e, t) {
	return e === "pct" || e === "auto" || e === "nil" ? 0 : t;
}
function $l(e) {
	return e.kind === "dxa" ? e.dxaValuePt : e.scope === "cell" || e.scope === "exception" ? null : (e.edge === "start" || e.edge === "end") && (e.kind === "pct" || e.kind === "auto" || e.kind === "nil") ? 0 : null;
}
//#endregion
//#region packages/docx/src/layout/intrinsic-width.ts
function eu(e, t, n) {
	let r = 0, i = 0;
	for (let t of e.content) {
		let e = t.type === "paragraph" && Ll(t), a = t.type === "paragraph" ? e ? {
			minWidthPt: 0,
			maxWidthPt: 0
		} : n.paragraph(t) : n.nestedTable(t);
		r = Math.max(r, a.minWidthPt), i = Math.max(i, a.maxWidthPt);
	}
	let a = Math.max(0, t.left) + Math.max(0, t.right);
	return {
		minWidthPt: r + a,
		maxWidthPt: Math.max(r, i) + a
	};
}
function tu(e) {
	let t = e.textShapeRequest, n = (e) => e ? [
		e.ascii ?? null,
		e.highAnsi ?? null,
		e.eastAsia ?? null,
		e.complexScript ?? null
	] : null;
	return nt("paragraph-intrinsic-text", [
		e.textLayoutService?.fingerprint ?? null,
		t ? [
			n(t.fonts),
			n(t.themeFonts),
			t.themeFontPresence ? [
				t.themeFontPresence.ascii ?? !1,
				t.themeFontPresence.highAnsi ?? !1,
				t.themeFontPresence.eastAsia ?? !1,
				t.themeFontPresence.complexScript ?? !1
			] : null,
			t.fontHint ?? null,
			t.fontSizePt,
			t.weight ?? null,
			t.style ?? null,
			t.complexScript ?? !1,
			t.eastAsiaLanguage ?? null,
			t.eastAsiaFontCharset ?? null,
			t.genericFamily ?? null,
			t.letterSpacingPt ?? null,
			t.kerning ?? null
		] : null,
		e.bold,
		e.italic,
		Ai(e, 1),
		e.fontFamily,
		e.fontRoute ?? null,
		e.charScale ?? 1,
		e.charSpacing ?? 0,
		e.fitTextPerGapPx ?? null,
		e.fitTextTrailingPadPx ?? null,
		e.fitTextRegionIndex ?? null,
		e.snapToCharacterGrid !== !1,
		e.widthBalanceGridDeltaFactor ?? null,
		e.widthBalanceSpaceSequence ?? !1,
		e.widthBalanceSpaceAdjustmentPt ?? null,
		e.script ?? null,
		e.tateChuYoko ?? !1,
		e.tateChuYoko ? e.sourceRunIndex ?? null : null,
		e.ruby ? [
			e.sourceRunIndex ?? null,
			e.ruby.text,
			e.ruby.fontSizePt,
			e.ruby.hpsRaisePt ?? null
		] : null,
		e.verticalRun ?? !1
	]);
}
function nu(e) {
	let t = [];
	for (let n of e) {
		let e = t.at(-1);
		if (e && "text" in e && "text" in n && tu(e) === tu(n)) {
			let r = e.text.length, i = e.text + n.text, a = [...e.punctuationCompressions ?? [], ...(n.punctuationCompressions ?? []).map((e) => ({
				end: r + e.end,
				adjustmentPt: e.adjustmentPt
			}))];
			t[t.length - 1] = {
				...e,
				text: i,
				punctuationCompressions: a.length > 0 ? a : void 0,
				textShapeRequest: e.textShapeRequest ? {
					...e.textShapeRequest,
					text: i
				} : void 0
			};
			continue;
		}
		t.push({ ...n });
	}
	return t;
}
function ru(e, t, n, r, i, a) {
	let o = 0, s = null, c = a?.type === "snapToChars" && a.characterPitchPt != null && a.characterPitchPt > 0 ? a.characterPitchPt : null, l = () => {
		!s || c == null || (o += Tc(s.naturalWidthPt, s.kind, c), s = null);
	};
	for (let u of e) {
		let e = Math.max(n, u.start), d = Math.min(r, u.end);
		if (e >= d) continue;
		let f = t.slice(e, d), p = e - u.start, m = d - u.start, h = {
			...u.segment,
			text: f,
			punctuationCompressions: dc(u.segment, p, m)
		}, g = (e) => e.textLayoutService && e.textShapeRequest ? Cc(e, e.textLayoutService.shape({
			...e.textShapeRequest,
			text: e.text,
			fontSizePt: Ai(e, 1),
			measure: !0,
			clusterGeometry: !1
		}).advancePt, a, 1) : (i.context.font = Zs(e.bold, e.italic, Ai(e, 1), e.fontFamily, i.fontFamilyClasses, e.fontRoute), Cc(e, i.context.measureText(e.text).width, a, 1)), _ = wc(h, a);
		if (_ === "eastAsia" && c != null) {
			l();
			let e = h.textLayoutService && h.textShapeRequest ? h.textLayoutService.shape({
				...h.textShapeRequest,
				text: f,
				fontSizePt: Ai(h, 1),
				measure: !0,
				clusterGeometry: !0
			}).clusters : void 0, t = e?.length ? null : [...new Set([
				0,
				...P(f),
				f.length
			])].sort((e, t) => e - t), n = e?.map((e) => ({
				start: e.range.start,
				end: e.range.end,
				naturalWidthPt: Cc({
					...h,
					text: f.slice(e.range.start, e.range.end),
					punctuationCompressions: dc(h, e.range.start, e.range.end)
				}, e.advancePt, a, 1)
			})) ?? t.slice(0, -1).map((e, n) => {
				let r = t[n + 1];
				return {
					start: e,
					end: r,
					naturalWidthPt: g({
						...h,
						text: f.slice(e, r),
						punctuationCompressions: dc(h, e, r)
					})
				};
			}), r = 0;
			for (let e of n) e.end <= e.start || (r += Jo(e.naturalWidthPt, c));
			o += Tc(n.reduce((e, t) => e + t.naturalWidthPt, 0), _, c, Math.max(1, r));
		} else {
			let e = g(h);
			if ((_ === "latin" || _ === "complexScript") && c != null) {
				let t = s;
				t?.kind === _ ? s = {
					kind: _,
					naturalWidthPt: t.naturalWidthPt + e
				} : (l(), s = {
					kind: _,
					naturalWidthPt: e
				});
			} else l(), o += e;
		}
	}
	return l(), o;
}
function iu(e, t, n) {
	let r = Dl(t), i = 0;
	for (let a = 0; a < e.length; a += 1) {
		let o = e[a];
		if (!("text" in o) || o.text.length === 0) continue;
		let s = [], c = "", l = (e) => {
			let t = c.length;
			c += e.text, s.push({
				segment: e,
				start: t,
				end: c.length
			});
		};
		for (l(o); a + 1 < e.length;) {
			let t = e[a + 1];
			if (!("text" in t) || t.joinPrev !== !0) break;
			l(t), a += 1;
		}
		let u = 0;
		for (let e of el(c)) {
			let a = e.replace(/\s+$/u, ""), o = u, l = u + a.length;
			if (u += e.length, !a) continue;
			if (!Uc(a)) {
				i = Math.max(i, ru(s, c, o, l, n, r));
				continue;
			}
			let d = [
				0,
				...P(a),
				a.length
			], f = [];
			for (let e = 1; e < d.length; e += 1) f.push({
				text: a.slice(d[e - 1], d[e]),
				start: o + d[e - 1],
				end: o + d[e]
			});
			let p = [], m = f[0];
			for (let e = 1; e < f.length; e += 1) {
				let n = [...m.text].at(-1)?.codePointAt(0), r = f[e].text.codePointAt(0);
				n !== void 0 && r !== void 0 && !t.kinsoku.lineEndForbidden.has(n) && !t.kinsoku.lineStartForbidden.has(r) ? (p.push(m), m = f[e]) : m = {
					text: m.text + f[e].text,
					start: m.start,
					end: f[e].end
				};
			}
			m && p.push(m);
			for (let e of p) i = Math.max(i, ru(s, c, e.start, e.end, n, r));
		}
	}
	return i;
}
function au(e, t, n) {
	let r = (n.baseRtl ? n.physicalIndentRightPt : n.physicalIndentLeftPt) + (t === 0 ? n.firstIndentPt : 0) + e.xOffset;
	return {
		startPt: r,
		endPt: r + e.segments.reduce((e, t) => e + t.measuredWidth, 0)
	};
}
function ou(e, t, n, r, i, a, o = {}) {
	if (!Number.isFinite(n) || n < 0) throw RangeError("maximumWidthPt must be finite and non-negative");
	if (n === 0) return {
		minWidthPt: 0,
		maxWidthPt: 0
	};
	let s = nu(hl(e.runs, {
		...i,
		lineSpacing: t.lineSpacing,
		lineGridActive: t.lineGrid.active
	})), c = Math.max(1, n - t.physicalIndentLeftPt - t.physicalIndentRightPt), l = s.length === 0 ? [] : gl(r.context, s, c, t.firstIndentPt, 1, [...t.tabStops], void 0, r.fontFamilyClasses, t.physicalIndentLeftPt, t.kinsoku, Dl(t), t.defaultTabPt, c + t.physicalIndentRightPt, t.baseRtl, t.isJustified, t.stretchLastLine, void 0, "intrinsic", i.verticalGlyphMeasurement, t.overflowPunct !== !1), u = t.baseRtl ? t.physicalIndentLeftPt : t.physicalIndentRightPt, d = 0, f = 0;
	l.forEach((e, n) => {
		let r = au(e, n, t);
		d = Math.min(d, r.startPt), f = Math.max(f, r.endPt);
	});
	let p = a ? jl({
		leadingIndentPt: t.baseRtl ? t.physicalIndentRightPt : t.physicalIndentLeftPt,
		authoredFirstIndentPt: e.indentFirst,
		markerShiftPt: a.markerShiftPt,
		markerWidthPt: a.markerWidthPt
	}) : void 0;
	p && (d = Math.min(d, p.startPt), f = Math.max(f, p.endPt));
	let m = iu(s, t, r);
	for (let e of l) {
		let t = 0, n = e.segments.reduce((e, t) => e + t.measuredWidth, 0);
		for (let r of e.segments) t += r.measuredWidth, "imagePath" in r && !r.anchor || "math" in r ? m = Math.max(m, r.measuredWidth) : "isTab" in r && (m = Math.max(m, r.resolvedAlignment === "left" ? t : n));
	}
	let h = t.baseRtl ? t.physicalIndentRightPt : t.physicalIndentLeftPt, g = o.preserveWhitespaceOnlyContent && s.length > 0 && s.every((e) => "text" in e && /^[\s\u00a0]+$/u.test(e.text)) ? s : null, _ = g ? (() => {
		let e = "";
		return ru(g.map((t) => {
			let n = e.length;
			return e += t.text, {
				segment: t,
				start: n,
				end: e.length
			};
		}), e, 0, e.length, r, Dl(t));
	})() : 0;
	if (_ > 0) {
		let e = h + t.firstIndentPt;
		d = Math.min(d, e), f = Math.max(f, e + _);
	}
	let v = Math.min(n, Math.max(0, f - d + u)), y = h, b = Math.min(0, y);
	m = Math.max(m, _);
	let x = Math.max(0, y + m), S = h + t.firstIndentPt;
	return b = Math.min(b, S), x = Math.max(x, S + m), p && (b = Math.min(b, p.startPt), x = Math.max(x, p.endPt)), {
		minWidthPt: Math.min(n, Math.max(0, x - b + u)),
		maxWidthPt: v
	};
}
//#endregion
//#region packages/docx/src/layout/paragraph-border-adjacency.ts
function su(e, t) {
	if (!e || t?.suppressBottom) return 0;
	let n = e.bottom;
	return !n || n.style === "none" ? 0 : (n.space ?? 0) + (n.width ?? 0) / 2;
}
function cu(e, t) {
	if (!e || t === "none") return 0;
	let n = e[t];
	return !n || n.style === "none" || n.style === "nil" ? 0 : (n.space ?? 0) + (n.width ?? 0) / 2;
}
function lu(e) {
	return e == null || e.style === "none" ? null : e;
}
function uu(e, t) {
	let n = lu(e), r = lu(t);
	return n == null || r == null ? n == null && r == null : n.style === r.style && n.width === r.width && (n.space ?? 0) === (r.space ?? 0) && (n.color ?? null) === (r.color ?? null);
}
function du(e, t) {
	return !e || !t ? !1 : uu(e.top, t.top) && uu(e.bottom, t.bottom) && uu(e.left, t.left) && uu(e.right, t.right) && uu(e.between, t.between);
}
function fu(e) {
	return e ? [
		e.top,
		e.right,
		e.bottom,
		e.left,
		e.between
	].some((e) => e != null && e.style !== "none") : !1;
}
function pu(e, t) {
	return !e || !t || e.framePr || t.framePr ? !1 : fu(e.borders) && fu(t.borders) && du(e.borders, t.borders);
}
function mu(e, t, n, r = !1) {
	let i = (e, t) => r ? !!e && !!t && !!e.framePr && !!t.framePr && fu(e.borders) && fu(t.borders) && du(e.borders, t.borders) : pu(e, t), a = i(e, t), o = i(t, n), s = t.borders?.between;
	return Object.freeze({
		top: a ? s && s.style !== "none" ? "between" : "none" : "top",
		bottom: o ? "none" : "bottom"
	});
}
//#endregion
//#region packages/docx/src/layout/frame.ts
function hu(e, t, n, r, i, a) {
	return ou(e, t, n, r, i, a).maxWidthPt;
}
function gu(e) {
	let t = e;
	return nt("w:framePr", [
		t.dropCap,
		t.lines,
		t.wrap,
		t.hAnchor,
		t.vAnchor,
		t.hRule,
		t.hSpace,
		t.vSpace,
		t.w ?? null,
		t.h ?? null,
		t.x ?? null,
		t.y ?? null,
		t.xAlign ?? null,
		t.yAlign ?? null,
		t.__anchorLock === !0
	]);
}
function _u(e) {
	let t = /* @__PURE__ */ new WeakMap();
	for (let n = 0; n < e.length;) {
		let r = e[n];
		if (r?.type !== "paragraph" || !r.framePr) {
			n += 1;
			continue;
		}
		let i = gu(r.framePr), a = [r], o = [n], s = n + 1;
		for (; s < e.length;) {
			let t = e[s];
			if (t?.type !== "paragraph" || !t.framePr || gu(t.framePr) !== i) break;
			a.push(t), o.push(s), s += 1;
		}
		let c = Object.freeze({
			id: `${i}:${n}`,
			owner: r,
			members: Object.freeze(a),
			sourceIndices: Object.freeze(o),
			framePr: r.framePr
		});
		for (let e of a) t.set(e, c);
		n = s;
	}
	return t;
}
var vu = /* @__PURE__ */ new WeakMap(), yu = /* @__PURE__ */ new WeakMap();
function bu(e) {
	let t = _u(e);
	for (let n = 0; n < e.length; n += 1) {
		let r = e[n];
		if (r.type !== "paragraph") continue;
		let i = t.get(r);
		i && vu.set(r, i);
		let a = e[n - 1], o = e[n + 1], s = a?.type === "paragraph" && t.get(a) === i ? a : null, c = o?.type === "paragraph" && t.get(o) === i ? o : null;
		yu.set(r, mu(i ? s : a?.type === "paragraph" ? a : null, r, i ? c : o?.type === "paragraph" ? o : null, i !== void 0));
	}
}
var xu = (e) => vu.get(e), Su = (e) => yu.get(e);
//#endregion
//#region packages/docx/src/layout-context.ts
function Cu(e) {
	return {
		story: e.story,
		containers: [...e.containers, { kind: "tableCell" }],
		lineNumberingEligible: !1
	};
}
function wu(e) {
	return e.runs.some((e) => e.type === "text" && !!e.ruby);
}
function Tu(e) {
	return e.runs.some((e) => e.type === "text" && ji.test(e.text));
}
function Eu(e) {
	for (let t of e) {
		if (t.type === "paragraph") {
			if (Tu(t)) return !0;
			continue;
		}
		if (t.type === "table") {
			for (let e of t.rows) for (let t of e.cells) if (Eu(t.content)) return !0;
		}
	}
	return !1;
}
function Du(e, t = { normalStyleFontSizePt: 10 }) {
	return bu(e.body), {
		kinsoku: g(e.settings),
		defaultTabPt: tl(e.settings),
		characterSpacingControl: e.settings?.characterSpacingControl,
		mathDefJc: e.settings?.mathDefJc,
		documentHasEastAsianText: Eu(e.body),
		normalStyleFontSizePt: t.normalStyleFontSizePt,
		compat: {
			adjustLineHeightInTable: e.settings?.adjustLineHeightInTable ?? !1,
			useFeLayout: e.settings?.useFeLayout ?? !1,
			balanceSingleByteDoubleByteWidth: e.settings?.balanceSingleByteDoubleByteWidth ?? !1,
			lineWrapLikeWord6: e.settings?.lineWrapLikeWord6 ?? !1,
			enableOpenTypeFeatures: e.settings?.enableOpenTypeFeatures ?? !1
		}
	};
}
function Ou(e) {
	let t = e.pageWidth - e.marginLeft - e.marginRight, n = e.columns;
	if (!n || n.count <= 1) return [{
		xPt: e.marginLeft,
		wPt: Math.max(1, t)
	}];
	if (!n.equalWidth && n.cols.length > 0) {
		let t = [], r = e.marginLeft;
		for (let e of n.cols) t.push({
			xPt: r,
			wPt: Math.max(1, e.widthPt)
		}), r += e.widthPt + e.spacePt;
		return t;
	}
	let r = Math.max(1, (t - (n.count - 1) * n.spacePt) / n.count);
	return Array.from({ length: n.count }, (t, i) => ({
		xPt: e.marginLeft + i * (r + n.spacePt),
		wPt: r
	}));
}
function ku(e) {
	switch (e) {
		case "lines":
		case "linesAndChars":
		case "snapToChars": return e;
		default: return "none";
	}
}
function Au(e) {
	return e === "lines" || e === "linesAndChars" || e === "snapToChars";
}
function ju(e) {
	return e === "linesAndChars" || e === "snapToChars";
}
function Mu(e, t) {
	return {
		geometry: {
			pageWidth: t.pageWidth,
			pageHeight: t.pageHeight,
			marginTop: t.marginTop,
			marginRight: t.marginRight,
			marginBottom: t.marginBottom,
			marginLeft: t.marginLeft,
			headerDistance: t.headerDistance,
			footerDistance: t.footerDistance
		},
		columns: Ou(t),
		columnSeparator: t.columns?.sep === !0,
		grid: {
			kind: ku(t.docGridType),
			linePitchPt: t.docGridLinePitch ?? null,
			charSpacePt: t.docGridCharSpace == null ? null : t.docGridCharSpace / 4096
		},
		textDirection: t.textDirection ?? "lrTb",
		sectionBidi: !1,
		verticalAlignment: t.vAlign ?? "top",
		lineNumbering: t.lineNumbering ?? void 0
	};
}
function Nu(e) {
	return e.containers.some((e) => e.kind === "tableCell");
}
function Pu(e, t, n, r) {
	let i = Au(t.grid.kind) && t.grid.linePitchPt != null && t.grid.linePitchPt > 0 && r.snapToGrid !== !1 && r.lineSpacing?.rule !== "exact" && (!Nu(n) || e.compat.adjustLineHeightInTable), a = ju(t.grid.kind), o = r.bidi === !0, s = Nu(n), c = a ? e.normalStyleFontSizePt + (t.grid.charSpacePt ?? 0) : null, l = t.grid.kind === "linesAndChars" ? c : null, u = r.numbering, d = u != null && (u.text !== "" || u.picBulletImagePath != null), f = o && d && (u.suff || "tab") === "tab" && r.indentFirst < 0;
	return {
		lineGrid: {
			active: i,
			pitchPt: i ? t.grid.linePitchPt : null
		},
		characterGrid: {
			active: a,
			kind: a ? t.grid.kind : null,
			deltaPt: a ? t.grid.charSpacePt ?? 0 : 0,
			pitchPt: c != null && c > 0 ? c : null
		},
		rightIndentGrid: {
			pitchPt: l != null && l > 0 ? l : null,
			paragraphAllowsAdjustment: r.adjustRightInd !== !1 && Yo(s)
		},
		physicalIndentLeftPt: o ? r.indentRight : r.indentLeft,
		physicalIndentRightPt: o ? r.indentLeft : r.indentRight,
		firstIndentPt: f ? 0 : r.indentFirst,
		lineSpacing: r.lineSpacing,
		spaceBeforePt: r.spaceBefore,
		spaceAfterPt: r.spaceAfter,
		baseRtl: o,
		isJustified: wl(r.alignment),
		stretchLastLine: Tl(r.alignment),
		tabStops: Fu(r),
		hasRuby: wu(r),
		hasEastAsianText: Tu(r),
		kinsoku: e.kinsoku,
		defaultTabPt: e.defaultTabPt,
		overflowPunct: r.overflowPunct !== !1,
		mathDefJc: e.mathDefJc
	};
}
function Fu(e) {
	let t = e.tabStops.filter((e) => e.alignment !== "clear").map((e) => ({ ...e })), n = e.indentLeft, r = t.some((e) => e.pos === n && Zo(e.alignment));
	return (e.indentFirst < 0 && !r ? [{
		pos: n,
		alignment: "left",
		leader: "none"
	}, ...t] : t).sort((e, t) => e.pos - t.pos);
}
function Iu(e, t) {
	let { pitchPt: n, paragraphAllowsAdjustment: r } = e.rightIndentGrid;
	return !r || n == null ? 0 : Xo(t, n);
}
W({
	id: "word-default-line-number-distance",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/compatibility.test.ts#uses Word's observed 18pt line-number distance only when omitted"
	},
	description: "ECMA-376 §17.6.8 leaves an omitted line-number distance implementation-defined. Preserve Word-compatible 18pt placement only when the authored distance is absent."
}), W({
	id: "word-continuous-section-page-number-restart",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/page-number-field-render.test.ts#restarts a spilling continuous section after its shared first page"
	},
	description: "Issue #804 records that Word anchors a continuous section page-number restart to the first physical page containing that section body content, even when another section owns the page top. An empty same-page region does not consume the restart."
}), W({
	id: "word-trailing-empty-mark-baseline-admission",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/paginate-trailing-empty-mark-fit.test.ts#KEEPS an inkless empty paragraph on the page when ink-bearing content follows and only its below-baseline whitespace overflows"
	},
	description: "At the unreserved physical body edge, Word admits an undecorated non-terminal empty paragraph mark by its baseline when later ink follows in the same flow and the mark does not occupy a document-grid line cell. An observed 18pt line-grid mark with only 17.65pt remaining moves to the next page with its complete cell. Next-page section marks retain their separate blank-page suppression."
}), W({
	id: "word-section-mark-blank-page-suppression",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "next-page-section-mark-bottom-edge-admission",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "For the observed nextPage boundary, Word consumes an undecorated inkless paragraph that carries the section boundary on the outgoing page instead of creating an otherwise empty intermediate page solely for that non-painting mark. The following section still starts its requested page. Other section-start kinds remain outside this observation."
}), W({
	id: "word-book-fold-gutter-right-edge",
	evidence: {
		kind: "microsoft-note",
		reference: "[MS-OI29500] §§2.1.389, 2.1.391"
	},
	description: "For book-fold printing Word places the automatic gutter at the right-margin bisector edge, including reverse book-fold mode."
});
function Lu(e) {
	return e ?? 18;
}
function Ru(e, t, n) {
	return e + t - n;
}
function zu(e) {
	return !e.hasContinuationBoundary && e.inkless && e.undecorated && !e.keepNext && e.markReservePt === 0 && e.pageBottomIsUnreserved && e.physicalRegionBottomIsActive ? e.followsNextPageSectionBoundary ? Math.max(0, e.markExtentPt) : e.markOnLineGrid ? 0 : e.hasFollowingInk ? e.markBelowBaselinePt : 0 : 0;
}
function Bu() {
	return "right";
}
//#endregion
//#region packages/docx/src/layout/context.ts
function Vu(e) {
	if (e.sectionOccurrenceId.length === 0) throw RangeError("Section occurrence id must not be empty");
	if (e.columns.length === 0) throw RangeError("A page-flow section requires at least one column");
	return Object.freeze({
		sectionOccurrenceId: e.sectionOccurrenceId,
		geometry: Object.freeze({ ...e.geometry }),
		columns: Object.freeze(e.columns.map((e) => Object.freeze({ ...e }))),
		textDirection: e.textDirection,
		sectionBidi: e.sectionBidi ?? !1,
		grid: Object.freeze(e.grid ?? {
			kind: "none",
			linePitchPt: null,
			charSpacePt: null
		})
	});
}
function Hu(e) {
	return Wu(e.geometry.marginTop);
}
function Uu(e) {
	return e.geometry.pageHeight - Wu(e.geometry.marginBottom);
}
function Wu(e) {
	return Math.abs(e);
}
function Gu(e) {
	return {
		pageWidth: e.pageHeight,
		pageHeight: e.pageWidth,
		marginLeft: e.marginTop,
		marginTop: e.marginRight,
		marginRight: e.marginBottom,
		marginBottom: e.marginLeft,
		headerDistance: e.headerDistance,
		footerDistance: e.footerDistance
	};
}
function Ku(e) {
	return {
		pageWidth: e.pageHeight,
		pageHeight: e.pageWidth,
		marginTop: e.marginLeft,
		marginRight: e.marginTop,
		marginBottom: e.marginRight,
		marginLeft: e.marginBottom,
		headerDistance: e.headerDistance,
		footerDistance: e.footerDistance
	};
}
function qu(e) {
	return e === "tbRl" || e === "tbRlV" || e === "tbLrV" || e === "btLr";
}
function Ju(e, t) {
	if (!Number.isInteger(t) || t < 0) throw RangeError("Physical page index must be a non-negative integer");
	let { pageWidth: n, pageHeight: r } = e.physicalGeometry, { marginTop: i, marginRight: a, marginBottom: o, marginLeft: s } = e.physicalGeometry, c = e.bookFoldPrinting || e.bookFoldRevPrinting;
	return c ? (n /= 2, Bu() === "right" && (a += e.gutterPt)) : e.printTwoOnOne ? (r /= 2, i += e.gutterPt) : e.gutterAtTop && !e.mirrorMargins ? i += e.gutterPt : e.rtlGutter ? a += e.gutterPt : s += e.gutterPt, !c && !e.printTwoOnOne && e.mirrorMargins && t % 2 == 1 && ([s, a] = [a, s]), {
		...e.physicalGeometry,
		pageWidth: n,
		pageHeight: r,
		marginTop: i,
		marginRight: a,
		marginBottom: o,
		marginLeft: s
	};
}
function Yu(e, t, n) {
	let r = Ju(t, n), i = qu(t.textDirection) ? Gu(r) : r;
	return Object.freeze({
		...e,
		geometry: Object.freeze(i),
		columns: Object.freeze(Ou({
			...i,
			titlePage: !1,
			evenAndOddHeaders: !1,
			columns: t.columns
		}).map((e) => Object.freeze(e)))
	});
}
function Xu(e) {
	return {
		pageWidth: e.pageWidth,
		pageHeight: e.pageHeight,
		marginTop: e.marginTop,
		marginRight: e.marginRight,
		marginBottom: e.marginBottom,
		marginLeft: e.marginLeft,
		headerDistance: e.headerDistance,
		footerDistance: e.footerDistance
	};
}
function Zu() {
	return {
		pageWidth: 612,
		pageHeight: 792,
		marginTop: 72,
		marginRight: 72,
		marginBottom: 72,
		marginLeft: 72,
		headerDistance: 36,
		footerDistance: 36
	};
}
function Qu(e, t = !1) {
	let n = e.docGridType === "lines" || e.docGridType === "linesAndChars" || e.docGridType === "snapToChars" ? e.docGridType : "none";
	return Object.freeze({
		geometry: Object.freeze(Xu(e)),
		columns: Object.freeze(Ou(e).map((e) => Object.freeze(e))),
		columnSeparator: e.columns?.sep === !0,
		grid: Object.freeze({
			kind: n,
			linePitchPt: e.docGridLinePitch ?? null,
			charSpacePt: e.docGridCharSpace == null ? null : e.docGridCharSpace / 4096
		}),
		textDirection: e.textDirection ?? "lrTb",
		sectionBidi: t,
		verticalAlignment: e.vAlign ?? "top",
		...e.lineNumbering === null || e.lineNumbering === void 0 ? {} : { lineNumbering: Object.freeze({ ...e.lineNumbering }) }
	});
}
//#endregion
//#region packages/docx/src/layout/page-border.ts
function $u(e, t) {
	switch (e.display) {
		case "firstPage": return t;
		case "notFirstPage": return !t;
		default: return !0;
	}
}
function ed(e) {
	return e !== void 0 && /^[0-9a-fA-F]{6}$/.test(e) ? `#${e}` : "#000000";
}
function td(e) {
	return e !== void 0 && Number.isFinite(e.space) ? e.space : 0;
}
function nd(e, t, n, r) {
	let i = Number.isFinite(e.width) ? e.width : .5;
	return Object.freeze({
		edge: t,
		from: Object.freeze(n),
		to: Object.freeze(r),
		color: ed(e.color),
		widthPt: i,
		...ki(e.style, i)
	});
}
function rd(e, t, n, r) {
	if (!e || !$u(e, r)) return null;
	let { geometry: i } = t, a = e.offsetFrom === "text", o = a ? i.marginLeft : 0, s = a ? i.pageWidth - i.marginRight : i.pageWidth, c = a ? Wu(i.marginTop) : 0, l = a ? i.pageHeight - Wu(i.marginBottom) : i.pageHeight, u = c + td(e.top), d = l - td(e.bottom), f = o + td(e.left), p = s - td(e.right), m = [];
	if (e.top && m.push(nd(e.top, "top", {
		xPt: f,
		yPt: u
	}, {
		xPt: p,
		yPt: u
	})), e.bottom && m.push(nd(e.bottom, "bottom", {
		xPt: f,
		yPt: d
	}, {
		xPt: p,
		yPt: d
	})), e.left && m.push(nd(e.left, "left", {
		xPt: f,
		yPt: u
	}, {
		xPt: f,
		yPt: d
	})), e.right && m.push(nd(e.right, "right", {
		xPt: p,
		yPt: u
	}, {
		xPt: p,
		yPt: d
	})), m.length === 0) return null;
	let h = Ei(mi(t.textDirection), n);
	return Object.freeze({
		zOrder: e.zOrder === "back" ? "back" : "front",
		logicalToPhysical: Object.freeze({ ...h.logicalToPhysical }),
		segments: Object.freeze(m)
	});
}
//#endregion
//#region packages/docx/src/layout/page-factory.ts
function id(e, t, n) {
	return `page:${e}:region:${encodeURIComponent(t)}:column:${n}`;
}
function ad(e) {
	return od(e), {
		xPt: 0,
		yPt: 0,
		widthPt: e.widthPt,
		heightPt: e.heightPt,
		contentTopPt: e.contentTopPt,
		contentBottomPt: e.contentBottomPt
	};
}
function od(e) {
	if (!Number.isFinite(e.widthPt) || !Number.isFinite(e.heightPt) || !Number.isFinite(e.contentTopPt) || !Number.isFinite(e.contentBottomPt) || e.widthPt <= 0 || e.heightPt <= 0 || e.contentTopPt < 0 || e.contentTopPt > e.contentBottomPt || e.contentBottomPt > e.heightPt) throw RangeError("Effective page edges must satisfy 0 <= contentTopPt <= contentBottomPt <= heightPt");
}
function sd(e, t) {
	if (e.length === 0) throw RangeError(`${t} must not be empty`);
}
function cd(e, t) {
	if (e && t === void 0) throw RangeError("Page-border finalization requires explicit section-owned page identity");
	return t ?? !1;
}
function ld(e, t) {
	return e.length === t.length && e.every((e, n) => {
		let r = t[n];
		return r !== void 0 && e.xPt === r.xPt && e.wPt === r.wPt;
	});
}
function ud(e, t) {
	return e === t || e !== void 0 && t !== void 0 && e.start === t.start && e.countBy === t.countBy && e.distance === t.distance && e.restart === t.restart;
}
function dd(e, t) {
	return e.geometry.pageWidth === t.geometry.pageWidth && e.geometry.pageHeight === t.geometry.pageHeight && e.geometry.marginTop === t.geometry.marginTop && e.geometry.marginRight === t.geometry.marginRight && e.geometry.marginBottom === t.geometry.marginBottom && e.geometry.marginLeft === t.geometry.marginLeft && e.geometry.headerDistance === t.geometry.headerDistance && e.geometry.footerDistance === t.geometry.footerDistance && ld(e.columns, t.columns) && e.columnSeparator === t.columnSeparator && e.textDirection === t.textDirection && e.sectionBidi === !0 == (t.sectionBidi === !0) && e.grid.kind === t.grid.kind && e.grid.linePitchPt === t.grid.linePitchPt && e.grid.charSpacePt === t.grid.charSpacePt && e.verticalAlignment === t.verticalAlignment && ud(e.lineNumbering, t.lineNumbering);
}
function fd(e) {
	if (mi(e.section.textDirection) !== e.writingMode) throw RangeError("Section region writing mode must agree with its section text direction");
	let t = e.section.sectionBidi === !0 ? "rtl" : "ltr";
	if (e.columnFlowDirection !== void 0 && e.columnFlowDirection !== t) throw RangeError("Section region column flow direction must agree with sectPr bidi");
	let n = e.columnIndexes ?? e.section.columns.map((e, t) => t);
	if (e.columns.length !== n.length || n.some((t, r) => !Number.isInteger(t) || t < 0 || t >= e.section.columns.length || r > 0 && t <= n[r - 1]) || e.columns.some((t, r) => {
		let i = e.section.columns[n[r]];
		return i === void 0 || t.inlineStartPt !== i.xPt || t.inlineExtentPt !== i.wPt;
	})) throw RangeError("Section region columns must equal its normalized section columns");
}
function pd(e) {
	if (!Number.isInteger(e) || e < 0) throw RangeError("Layout page index must be a non-negative integer");
}
function md(e, t, n) {
	let r = [], i = [], a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), c, l = [];
	for (let u of n) {
		if (sd(u.id, "Section region id"), sd(u.sectionOccurrenceId, "Section occurrence id"), o.has(u.id) || s.has(u.sectionOccurrenceId)) throw RangeError("Section region and occurrence identities must be unique");
		if (o.add(u.id), s.add(u.sectionOccurrenceId), c !== void 0 && c !== u.writingMode) throw RangeError("One physical page cannot mix writing modes");
		c = u.writingMode, fd(u);
		let n = bi({
			widthPt: u.section.geometry.pageWidth,
			heightPt: u.section.geometry.pageHeight
		}, u.writingMode);
		if (n.widthPt !== t.widthPt || n.heightPt !== t.heightPt) throw RangeError(`Section regions on one physical page must use the same page box: expected ${n.widthPt}x${n.heightPt}, got ${t.widthPt}x${t.heightPt}`);
		let d = yi(t, u.writingMode), f = d.widthPt, p = d.heightPt;
		if (!Number.isFinite(u.blockStartPt) || !Number.isFinite(u.blockEndPt) || u.blockStartPt < 0 || u.blockEndPt < u.blockStartPt || u.blockEndPt > p) throw RangeError("Section regions must be inside the logical page");
		if (u.columns.length === 0) throw RangeError("Section region must contain a column");
		let m = u.columnIndexes ?? u.section.columns.map((e, t) => t), h = 0, g = Ei(u.writingMode, t), _ = u.columns.map((t, n) => {
			let r = m[n];
			if (!Number.isFinite(t.inlineStartPt) || !Number.isFinite(t.inlineExtentPt) || t.inlineStartPt < 0 || t.inlineExtentPt <= 0 || t.inlineStartPt + t.inlineExtentPt > f || t.inlineStartPt < h) throw RangeError("Columns must be ordered, disjoint, and inside the logical page");
			h = t.inlineStartPt + t.inlineExtentPt;
			let o = id(e, u.id, r);
			if (a.has(o)) throw RangeError(`Duplicate flow domain ${o}`);
			let s = {
				xPt: t.inlineStartPt,
				yPt: u.blockStartPt,
				widthPt: t.inlineExtentPt,
				heightPt: u.blockEndPt - u.blockStartPt
			}, c = wi(g.logicalToPhysical, s);
			if (l.some((e) => c.xPt < e.xPt + e.widthPt && e.xPt < c.xPt + c.widthPt && c.yPt < e.yPt + e.heightPt && e.yPt < c.yPt + c.heightPt)) throw RangeError("Section flow domains on one page must be physically disjoint");
			return l.push(c), i.push({
				id: o,
				kind: "body",
				logicalBounds: s,
				physicalBounds: c
			}), a.set(o, u.sectionOccurrenceId), o;
		});
		r.push({
			id: u.id,
			sectionOccurrenceId: u.sectionOccurrenceId,
			coordinateSpace: g,
			blockStartPt: u.blockStartPt,
			blockEndPt: u.blockEndPt,
			columnFlowDirection: u.columnFlowDirection ?? (u.section.sectionBidi === !0 ? "rtl" : "ltr"),
			columnIndexes: Object.freeze([...m]),
			flowDomainIds: _,
			section: u.section
		});
	}
	return {
		regions: r,
		domains: i,
		sectionByDomain: a
	};
}
function hd(e, t) {
	if (e.kind === "paragraph") {
		t(e), e.drawings.forEach((e) => hd(e, t)), e.textBoxes.forEach((e) => hd(e, t));
		return;
	}
	if (e.kind === "table") {
		gd(e, t);
		return;
	}
	e.kind === "textbox" && _d(e, t);
}
function gd(e, t) {
	for (let n of e.rows) for (let e of n.cells) for (let n of e.blocks) hd(n.layout, t);
}
function _d(e, t) {
	e.story.blocks.forEach((e) => hd(e, t));
}
function vd(e, t, n) {
	let r = [], i = /* @__PURE__ */ new Set();
	for (let a of e) {
		let e = n.get(a.flowDomainId) ?? t;
		hd(a, (t) => {
			for (let n of t.bookmarkStarts ?? []) !n || i.has(n) || (i.add(n), r.push({
				name: n,
				nodeId: t.id,
				sectionOccurrenceId: e
			}));
		});
	}
	return r;
}
function yd(e) {
	let t = e.sectionRegions ?? [], n = new Map(t.map((e) => [e.id, e])), r = /* @__PURE__ */ new Map();
	for (let e of t) for (let t of e.flowDomainIds) r.set(t, e.sectionOccurrenceId);
	for (let i of e.flowDomains) {
		if (i.kind !== "footnote" && i.kind !== "endnote") continue;
		let e = i.sectionRegionId ? n.get(i.sectionRegionId) : t[0];
		e && r.set(i.id, e.sectionOccurrenceId);
	}
	return r;
}
function bd(e, t = yd(e)) {
	return vd(si(e), e.sectionOccurrenceId ?? "", t);
}
function xd(e) {
	return e.parityBlank ? e : Object.freeze({
		...e,
		bookmarkStarts: Object.freeze([...bd(e)])
	});
}
function Sd(e) {
	pd(e.pageIndex), sd(e.sectionOccurrenceId, "Page-start section occurrence id");
	let { regions: t, domains: n, sectionByDomain: r } = md(e.pageIndex, e.physicalPage, e.sectionRegions), i = e.sectionRegions[0], a = i?.pageBorders ?? e.pageBorders;
	if (i !== void 0 && (e.sectionOccurrenceId !== i.sectionOccurrenceId || !dd(e.section, i.section))) throw RangeError("Page-start section context must equal the first section region");
	return {
		pageIndex: e.pageIndex,
		geometry: ad(e.physicalPage),
		flowDomains: n,
		section: e.section,
		sectionOccurrenceId: e.sectionOccurrenceId,
		parityBlank: !1,
		bookmarkStarts: vd(e.paint.map(({ node: e }) => e), e.sectionOccurrenceId, r),
		pageNumber: e.pageNumber,
		sectionRegions: t,
		columnSeparators: Oi(t),
		pageBorder: rd(a, e.section, e.physicalPage, cd(a, e.firstSectionOwnedPage)),
		layers: ii(e.paint),
		readingOrder: e.readingOrder.map((e) => e.id)
	};
}
function Cd(e) {
	return pd(e.pageIndex), sd(e.sectionOccurrenceId, "Page-start section occurrence id"), od(e.physicalPage), Object.freeze({
		...e,
		sectionRegions: Object.freeze([]),
		paint: Object.freeze([]),
		readingOrder: Object.freeze([])
	});
}
function wd(e, t) {
	return Object.freeze({
		...e,
		sectionRegions: Object.freeze([...e.sectionRegions, t])
	});
}
function Td(e, t, n) {
	return Object.freeze({
		...e,
		paint: Object.freeze([...e.paint, t]),
		readingOrder: n ? Object.freeze([...e.readingOrder, t.node]) : e.readingOrder
	});
}
function Ed(e, t, n) {
	return Sd({
		...e,
		pageNumber: t,
		firstSectionOwnedPage: n
	});
}
function Dd(e) {
	return pd(e.pageIndex), sd(e.sectionOccurrenceId, "Page-start section occurrence id"), {
		pageIndex: e.pageIndex,
		geometry: ad(e.physicalPage),
		flowDomains: [],
		section: e.section,
		sectionOccurrenceId: e.sectionOccurrenceId,
		parityBlank: !0,
		bookmarkStarts: [],
		pageNumber: e.pageNumber,
		sectionRegions: [],
		columnSeparators: [],
		pageBorder: rd(e.pageBorders, e.section, e.physicalPage, cd(e.pageBorders, e.firstSectionOwnedPage)),
		layers: ii([]),
		readingOrder: []
	};
}
//#endregion
//#region packages/docx/src/layout/rect-union.ts
function Od(e) {
	if (e.length === 0) return null;
	let t = Math.min(...e.map((e) => e.xPt)), n = Math.min(...e.map((e) => e.yPt)), r = Math.max(...e.map((e) => e.xPt + e.widthPt)), i = Math.max(...e.map((e) => e.yPt + e.heightPt));
	return {
		xPt: t,
		yPt: n,
		widthPt: r - t,
		heightPt: i - n
	};
}
//#endregion
//#region packages/docx/src/layout/invariants.ts
var kd = {
	FLOW_OVERLAP: !0,
	BOTTOM_MARGIN_INVASION: !0,
	FLOW_DOMAIN_INVASION: !0,
	INVALID_REFERENCE: !0,
	INVALID_GEOMETRY: !0,
	INVALID_VALUE: !0,
	MISSING_RESOURCE: !0,
	NON_CONVERGENCE: !0,
	UNSUPPORTED_FEATURE: !0
}, Ad = {
	body: !0,
	header: !0,
	footer: !0,
	footnote: !0,
	endnote: !0,
	textbox: !0
}, jd = new Set(Object.keys(kd)), Md = new Set(Object.keys(Ad));
function Nd(e, t, n = /* @__PURE__ */ new WeakSet()) {
	if (!(e === null || typeof e == "string" || typeof e == "boolean")) {
		if (typeof e == "number") {
			if (!Number.isFinite(e)) throw new H("INVALID_GEOMETRY", `${t} is not finite`);
			return;
		}
		if (typeof e != "object") throw new H("INVALID_GEOMETRY", `${t} contains ${typeof e}`);
		if (n.has(e)) throw new H("INVALID_GEOMETRY", `${t} contains a cycle`);
		n.add(e);
		try {
			if (Array.isArray(e)) {
				let r = 0;
				for (let i of Reflect.ownKeys(e)) {
					if (i === "length") continue;
					if (typeof i != "string") throw new H("INVALID_GEOMETRY", `${t} has a symbol key`);
					let a = Number(i);
					if (!Number.isInteger(a) || a < 0 || String(a) !== i || a >= e.length) throw new H("INVALID_GEOMETRY", `${t}.${i} is not an array index`);
					let o = Object.getOwnPropertyDescriptor(e, i);
					if (!o?.enumerable || !("value" in o)) throw new H("INVALID_GEOMETRY", `${t}[${i}] is not plain data`);
					Nd(o.value, `${t}[${i}]`, n), r += 1;
				}
				if (r !== e.length) throw new H("INVALID_GEOMETRY", `${t} is sparse`);
				return;
			}
			let r = Object.getPrototypeOf(e);
			if (r !== Object.prototype && r !== null) throw new H("INVALID_GEOMETRY", `${t} is not a plain record`);
			for (let r of Reflect.ownKeys(e)) {
				if (typeof r != "string") throw new H("INVALID_GEOMETRY", `${t} has a symbol key`);
				let i = Object.getOwnPropertyDescriptor(e, r);
				if (!i?.enumerable || !("value" in i)) throw new H("INVALID_GEOMETRY", `${t}.${r} is not plain data`);
				Nd(i.value, `${t}.${r}`, n);
			}
		} finally {
			n.delete(e);
		}
	}
}
function J(e, t) {
	if (!Number.isFinite(e)) throw new H("INVALID_GEOMETRY", `${t} is not finite`);
}
function Pd(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Fd(e, t) {
	if (!Pd(e)) throw new H("INVALID_GEOMETRY", `${t} is not a point`);
	J(e.xPt, `${t}.xPt`), J(e.yPt, `${t}.yPt`);
}
function Id(e, t) {
	if (Fd(e, t), J(e.widthPt, `${t}.widthPt`), J(e.heightPt, `${t}.heightPt`), e.widthPt < 0 || e.heightPt < 0) throw new H("INVALID_GEOMETRY", `${t} has a negative extent`);
}
function Ld(e, t) {
	if (!Pd(e)) throw new H("INVALID_GEOMETRY", `${t} is not a matrix`);
	for (let n of [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f"
	]) J(e[n], `${t}.${n}`);
}
function Rd(e, t) {
	if (e !== "horizontal-tb" && e !== "vertical-rl" && e !== "vertical-lr") throw new H("INVALID_GEOMETRY", `${t} is unsupported`);
}
function zd(e, t) {
	if (!Pd(e)) throw new H("INVALID_GEOMETRY", `${t} is not a coordinate space`);
	Rd(e.writingMode, `${t}.writingMode`), Ld(e.logicalToPhysical, `${t}.logicalToPhysical`), Ld(e.physicalToLogical, `${t}.physicalToLogical`);
}
function Bd(e, t) {
	let { plan: n } = e;
	if (Nd(n, `${t}.plan`), J(n.rect.x, `${t}.plan.rect.x`), J(n.rect.y, `${t}.plan.rect.y`), J(n.rect.w, `${t}.plan.rect.w`), J(n.rect.h, `${t}.plan.rect.h`), n.rect.w < 0 || n.rect.h < 0) throw new H("INVALID_GEOMETRY", `${t}.plan.rect has a negative extent`);
	if (J(n.transform.rotationDeg, `${t}.plan.transform.rotationDeg`), n.geometry.kind === "preset") {
		if (n.geometry.name.length === 0) throw new H("INVALID_GEOMETRY", `${t}.plan.geometry.name is empty`);
		n.geometry.adjustments.forEach((e, n) => {
			e !== null && J(e, `${t}.plan.geometry.adjustments[${n}]`);
		});
	} else n.geometry.subpaths.forEach((e, n) => {
		e.forEach((e, r) => {
			if (e.cmd.length === 0) throw new H("INVALID_GEOMETRY", `${t}.plan.geometry.subpaths[${n}][${r}].cmd is empty`);
		});
	});
	if (n.stroke && (J(n.stroke.width, `${t}.plan.stroke.width`), n.stroke.width < 0)) throw new H("INVALID_GEOMETRY", `${t}.plan.stroke.width is negative`);
}
function Vd(e, t) {
	if (e <= t) return !0;
	let n = 2 ** -52 * Math.max(1, Math.abs(e), Math.abs(t));
	return e - t <= n;
}
function Hd(e, t) {
	return e < t && !Vd(t, e);
}
function Ud(e, t) {
	return Hd(e.xPt, t.xPt + t.widthPt) && Hd(t.xPt, e.xPt + e.widthPt) && Hd(e.yPt, t.yPt + t.heightPt) && Hd(t.yPt, e.yPt + e.heightPt);
}
function Wd(e, t) {
	return Vd(e.xPt, t.xPt) && Vd(e.yPt, t.yPt) && Vd(t.xPt + t.widthPt, e.xPt + e.widthPt) && Vd(t.yPt + t.heightPt, e.yPt + e.heightPt);
}
function Gd(e, t) {
	return Vd(e.xPt, t.xPt) && Vd(t.xPt + t.widthPt, e.xPt + e.widthPt);
}
function Kd(e, t, n) {
	return Vd(e, n.yPt) && Vd(n.yPt + n.heightPt, t);
}
function qd(e, t) {
	return Vd(e.yPt, t.yPt) && Vd(t.yPt + t.heightPt, e.yPt + e.heightPt);
}
function Jd(e, t) {
	return e.xPt === t.xPt && e.yPt === t.yPt && e.widthPt === t.widthPt && e.heightPt === t.heightPt;
}
function Yd(e, t) {
	return e.a === t.a && e.b === t.b && e.c === t.c && e.d === t.d && e.e === t.e && e.f === t.f;
}
function Xd(e, t) {
	let n = e.pageBorder;
	if (n === null) return;
	if (n.zOrder !== "front" && n.zOrder !== "back") throw new H("INVALID_REFERENCE", `${t}.zOrder is invalid`);
	Ld(n.logicalToPhysical, `${t}.logicalToPhysical`);
	let r = Ei(mi(e.section.textDirection), e.geometry).logicalToPhysical;
	if (!Yd(n.logicalToPhysical, r)) throw new H("INVALID_GEOMETRY", `${t}.logicalToPhysical contradicts the page-start section`);
	if (!Array.isArray(n.segments) || n.segments.length === 0) throw new H("INVALID_GEOMETRY", `${t}.segments is empty`);
	n.segments.forEach((e, n) => {
		let r = `${t}.segments[${n}]`;
		if (Fd(e.from, `${r}.from`), Fd(e.to, `${r}.to`), J(e.widthPt, `${r}.widthPt`), e.from.xPt !== e.to.xPt && e.from.yPt !== e.to.yPt) throw new H("INVALID_GEOMETRY", `${r} is not an axis-aligned page edge`);
		if (!/^#[0-9a-fA-F]{6}$/.test(e.color)) throw new H("INVALID_REFERENCE", `${r}.color is invalid`);
	});
}
function Zd(e, t, n) {
	if (n.has(e)) throw new H("INVALID_REFERENCE", `duplicate retained node id ${e}`);
	n.add(e), t.add(e);
}
function Qd(e, t, n) {
	if (Zd(e.id, t, n), e.kind === "paragraph") {
		e.drawings.forEach((e) => Qd(e, t, n)), e.textBoxes.forEach((e) => Qd(e, t, n));
		return;
	}
	if (e.kind === "table") {
		e.rows.forEach((e) => {
			Zd(e.id, t, n), e.cells.forEach((e) => {
				Zd(e.id, t, n), e.blocks.forEach((e) => Qd(e.layout, t, n));
			});
		});
		return;
	}
	if (e.kind === "note") {
		e.story.blocks.forEach((e) => Qd(e, t, n));
		return;
	}
	e.kind === "textbox" && e.story.blocks.forEach((e) => Qd(e, t, n));
}
function $d(e, t) {
	if (e.kind === "paragraph") {
		let n = Od(e.drawings.filter((e) => e.anchorLayer?.cellContainment === !0).map((e) => e.flowBounds));
		if (e.cellContainmentBounds && Id(e.cellContainmentBounds, `${t}.cellContainmentBounds`), n === null != (e.cellContainmentBounds === void 0) || n && e.cellContainmentBounds && !Jd(n, e.cellContainmentBounds)) throw new H("INVALID_GEOMETRY", `${t}.cellContainmentBounds does not match its retained layoutInCell drawings`);
		let r = /* @__PURE__ */ new Set();
		(e.anchorCollisions ?? []).forEach((e, n) => {
			let i = `${t}.anchorCollisions[${n}]`;
			if (e.occurrenceId.length === 0 || r.has(e.occurrenceId)) throw new H("INVALID_REFERENCE", `${i}.occurrenceId is empty or duplicated`);
			if (r.add(e.occurrenceId), Id(e.bounds, `${i}.bounds`), e.horizontalOwnership !== "page" && e.horizontalOwnership !== "host" || e.verticalOwnership !== "page" && e.verticalOwnership !== "host") throw new H("INVALID_REFERENCE", `${i} has invalid axis ownership`);
		}), e.textBoxes.forEach((e, n) => $d(e, `${t}.textBoxes[${n}]`));
		return;
	}
	if (e.kind === "table") {
		e.rows.forEach((e, n) => e.cells.forEach((e, r) => e.blocks.forEach((e, i) => $d(e.layout, `${t}.rows[${n}].cells[${r}].blocks[${i}]`))));
		return;
	}
	e.kind === "textbox" && e.story.blocks.forEach((e, n) => $d(e, `${t}.story.blocks[${n}]`));
}
function ef(e, t) {
	if (e.orientation === "upright-physical" && !e.transform) throw new H("INVALID_GEOMETRY", `${t} upright physical drawing is missing its logical transform`);
	if (e.transform) for (let n of [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f"
	]) J(e.transform[n], `${t}.transform.${n}`);
	e.clip?.kind === "rect" && Id(e.clip.rect, `${t}.clip.rect`), e.clip?.kind === "polygon" && e.clip.points.forEach((e, n) => Fd(e, `${t}.clip.points[${n}]`)), e.commands.forEach((e, n) => {
		let r = `${t}.commands[${n}]`;
		if (e.kind !== "noop") {
			if (e.kind === "drawingml-shape") {
				Bd(e, r);
				return;
			}
			if (e.kind === "drawingml-image-fill") {
				if (Bd(e, r), e.resourceKey.length === 0) throw new H("INVALID_GEOMETRY", `${r}.resourceKey is empty`);
				if (e.fillRect) for (let t of [
					"l",
					"t",
					"r",
					"b"
				]) J(e.fillRect[t], `${r}.fillRect.${t}`);
				return;
			}
			if (Id(e.rect, `${r}.rect`), e.kind === "stroke-rect" && (J(e.lineWidthPt, `${r}.lineWidthPt`), e.dashPt.forEach((e, t) => J(e, `${r}.dashPt[${t}]`))), e.kind === "text" && (J(e.fontSizePt, `${r}.fontSizePt`), J(e.fontWeight, `${r}.fontWeight`)), e.kind === "watermark-text") {
				if (Id(e.sourceBounds, `${r}.sourceBounds`), e.sourceBounds.widthPt <= 0 || e.sourceBounds.heightPt <= 0) throw new H("INVALID_GEOMETRY", `${r}.sourceBounds must have positive extents`);
				if (J(e.opacity, `${r}.opacity`), J(e.rotationDeg, `${r}.rotationDeg`), J(e.fontSizePt, `${r}.fontSizePt`), e.opacity < 0 || e.opacity > 1 || e.fontSizePt <= 0) throw new H("INVALID_GEOMETRY", `${r} has invalid textPath paint metrics`);
				e.spans.forEach((e, t) => {
					J(e.advancePt, `${r}.spans[${t}].advancePt`), J(e.fontWeight, `${r}.spans[${t}].fontWeight`);
				});
			}
		}
	});
}
function tf(e) {
	Nd(e, "layout"), e.diagnostics.forEach((e, t) => {
		let n = `diagnostics[${t}]`;
		if (!jd.has(e.code)) throw new H("INVALID_REFERENCE", `${n}.code is unknown`);
		if (e.severity !== "warning" && e.severity !== "error") throw new H("INVALID_REFERENCE", `${n}.severity is unknown`);
		if (typeof e.message != "string" || e.message.length === 0) throw new H("INVALID_REFERENCE", `${n}.message is empty`);
		if (e.source !== void 0 && (!Md.has(e.source.story) || typeof e.source.storyInstance != "string" || e.source.storyInstance.length === 0 || !Array.isArray(e.source.path) || e.source.path.some((e) => !Number.isSafeInteger(e) || e < 0))) throw new H("INVALID_REFERENCE", `${n}.source is invalid`);
	});
	let t = /* @__PURE__ */ new Set();
	e.pages.forEach((e, n) => {
		if (!Number.isInteger(e.pageIndex) || e.pageIndex !== n) throw new H("INVALID_REFERENCE", `pages[${n}] has invalid page index ${e.pageIndex}`);
		if (Id(e.geometry, `pages[${n}].geometry`), J(e.geometry.contentTopPt, `pages[${n}].geometry.contentTopPt`), J(e.geometry.contentBottomPt, `pages[${n}].geometry.contentBottomPt`), e.geometry.widthPt <= 0 || e.geometry.heightPt <= 0 || e.geometry.contentTopPt < 0 || e.geometry.contentTopPt > e.geometry.contentBottomPt || e.geometry.contentBottomPt > e.geometry.heightPt) throw new H("INVALID_GEOMETRY", `pages[${n}] has invalid effective page edges`);
		Xd(e, `pages[${n}].pageBorder`);
		let r = /* @__PURE__ */ new Map();
		if (e.flowDomains.forEach((e, t) => {
			if (Id(e.logicalBounds, `pages[${n}].flowDomains[${t}].logicalBounds`), Id(e.physicalBounds, `pages[${n}].flowDomains[${t}].physicalBounds`), r.has(e.id)) throw new H("INVALID_REFERENCE", `duplicate flow domain ${e.id}`);
			r.set(e.id, e);
		}), e.parityBlank && (e.flowDomains.length > 0 || (e.sectionRegions?.length ?? 0) > 0 || (e.columnSeparators?.length ?? 0) > 0 || oi(e).length > 0 || e.layers.roots.length > 0 || e.readingOrder.length > 0 || (e.bookmarkStarts?.length ?? 0) > 0)) throw new H("INVALID_REFERENCE", `pages[${n}] parity blank retains page content`);
		let i = /* @__PURE__ */ new Set();
		if (e.sectionOccurrenceId !== void 0) {
			if (e.sectionOccurrenceId.length === 0) throw new H("INVALID_REFERENCE", `pages[${n}] has an empty section occurrence id`);
			i.add(e.sectionOccurrenceId);
		}
		let a = /* @__PURE__ */ new Map();
		if (e.sectionRegions) {
			let t = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map(), c = [], l;
			if (e.sectionRegions.forEach((u, d) => {
				let f = `pages[${n}].sectionRegions[${d}]`;
				if (u.id.length === 0 || t.has(u.id)) throw new H("INVALID_REFERENCE", `${f} has an invalid region id`);
				if (t.add(u.id), u.sectionOccurrenceId.length === 0) throw new H("INVALID_REFERENCE", `${f} has an empty section occurrence id`);
				if (o.has(u.sectionOccurrenceId)) throw new H("INVALID_REFERENCE", `${f} has a duplicate section occurrence id`);
				o.add(u.sectionOccurrenceId), i.add(u.sectionOccurrenceId), zd(u.coordinateSpace, `${f}.coordinateSpace`);
				let p = u.coordinateSpace.writingMode;
				if (l !== void 0 && l !== p) throw new H("INVALID_GEOMETRY", `${f} mixes coordinate systems on one physical page`);
				l = p;
				let m;
				try {
					m = mi(u.section.textDirection);
				} catch (e) {
					throw new H("INVALID_GEOMETRY", `${f}.section.textDirection is unsupported: ${e.message}`);
				}
				if (p !== m) throw new H("INVALID_GEOMETRY", `${f} writing mode contradicts its section text direction`);
				let h = yi(e.geometry, p), g = bi({
					widthPt: u.section.geometry.pageWidth,
					heightPt: u.section.geometry.pageHeight
				}, p);
				if (g.widthPt !== e.geometry.widthPt || g.heightPt !== e.geometry.heightPt) throw new H("INVALID_GEOMETRY", `${f} section geometry does not match the upright physical page`);
				if (J(u.blockStartPt, `${f}.blockStartPt`), J(u.blockEndPt, `${f}.blockEndPt`), u.columnFlowDirection !== "ltr" && u.columnFlowDirection !== "rtl") throw new H("INVALID_GEOMETRY", `${f} has an invalid column flow direction`);
				let _ = u.section.sectionBidi === !0 ? "rtl" : "ltr";
				if (u.columnFlowDirection !== _) throw new H("INVALID_GEOMETRY", `${f} column flow direction contradicts its section bidi`);
				if (u.blockStartPt < 0 || u.blockEndPt < u.blockStartPt || u.blockEndPt > h.heightPt) throw new H("INVALID_GEOMETRY", `${f} has an invalid block interval`);
				let v = Ei(u.coordinateSpace.writingMode, e.geometry);
				if (!Yd(u.coordinateSpace.logicalToPhysical, v.logicalToPhysical) || !Yd(u.coordinateSpace.physicalToLogical, v.physicalToLogical)) throw new H("INVALID_GEOMETRY", `${f} has an invalid coordinate transform`);
				let y = u.columnIndexes;
				if (u.flowDomainIds.length !== y.length || y.some((e, t) => !Number.isInteger(e) || e < 0 || e >= u.section.columns.length || t > 0 && e <= y[t - 1])) throw new H("INVALID_GEOMETRY", `${f} columns contradict its section`);
				let b = 0;
				u.flowDomainIds.forEach((t, n) => {
					let i = r.get(t);
					if (!i) throw new H("INVALID_REFERENCE", `${f} references missing flow domain ${t}`);
					if (i.kind !== "body") throw new H("INVALID_REFERENCE", `${f} owns non-body flow domain ${t}`);
					s.set(t, (s.get(t) ?? 0) + 1), a.set(t, u);
					let o = i.logicalBounds, l = u.section.columns[y[n]];
					if (o.widthPt <= 0 || o.heightPt < 0 || o.yPt !== u.blockStartPt || o.heightPt !== u.blockEndPt - u.blockStartPt || o.xPt < 0 || o.xPt < b || o.xPt + o.widthPt > h.widthPt || l === void 0 || o.xPt !== l.xPt || o.widthPt !== l.wPt) throw new H("INVALID_GEOMETRY", `${t} is not the section column's non-negative logical region`);
					if (b = o.xPt + o.widthPt, !Jd(wi(u.coordinateSpace.logicalToPhysical, i.logicalBounds), i.physicalBounds)) throw new H("INVALID_GEOMETRY", `${t} physical bounds do not match its section region transform`);
					if (!Wd(e.geometry, i.physicalBounds)) throw new H("INVALID_GEOMETRY", `${t} physical bounds leave the upright physical page`);
					if (c.some((e) => e.regionId !== u.id && Ud(e.bounds, i.physicalBounds))) throw new H("INVALID_GEOMETRY", `${t} overlaps a body flow domain owned by another section region`);
					c.push({
						regionId: u.id,
						bounds: i.physicalBounds
					});
				});
			}), e.flowDomains.filter((e) => e.kind === "body").forEach((e) => {
				if (s.get(e.id) !== 1) throw new H("INVALID_REFERENCE", `${e.id} has invalid section region ownership`);
			}), !e.parityBlank && e.sectionRegions.length > 0) {
				let t = e.sectionRegions[0];
				if (e.sectionOccurrenceId !== t.sectionOccurrenceId) throw new H("INVALID_REFERENCE", `pages[${n}] page-start section occurrence does not match its first region`);
				if (!dd(e.section, t.section)) throw new H("INVALID_GEOMETRY", `pages[${n}] page-start section facts do not match its first region`);
			}
		}
		let o = Oi(e.sectionRegions ?? []);
		if (!Array.isArray(e.columnSeparators) || e.columnSeparators.length !== o.length || e.columnSeparators.some((e, t) => {
			let n = o[t];
			return n === void 0 || e.start.xPt !== n.start.xPt || e.start.yPt !== n.start.yPt || e.end.xPt !== n.end.xPt || e.end.yPt !== n.end.yPt;
		})) throw new H("INVALID_GEOMETRY", `pages[${n}].columnSeparators contradict the retained section regions`);
		let s = new Map(e.sectionRegions.map((e) => [e.id, e]));
		for (let t of e.flowDomains) {
			if (t.kind !== "footnote" && t.kind !== "endnote") continue;
			let n = t.sectionRegionId ? s.get(t.sectionRegionId) : e.sectionRegions[0];
			if (!n) throw new H("INVALID_REFERENCE", `${t.id} references missing page story region ${t.sectionRegionId ?? "<default>"}`);
			if (!Jd(wi(n.coordinateSpace.logicalToPhysical, t.logicalBounds), t.physicalBounds)) throw new H("INVALID_GEOMETRY", `${t.id} physical bounds do not match the page story transform`);
			a.set(t.id, n);
		}
		for (let t of e.flowDomains) if (!a.has(t.id) && !Jd(t.logicalBounds, t.physicalBounds)) throw new H("INVALID_GEOMETRY", `${t.id} has unequal logical and physical bounds without a section region`);
		if (e.pageNumber) {
			if (J(e.pageNumber.displayNumber, `pages[${n}].pageNumber.displayNumber`), !Number.isInteger(e.pageNumber.displayNumber)) throw new H("INVALID_GEOMETRY", `pages[${n}] page number is not an integer`);
			if (e.pageNumber.format.length === 0 || !i.has(e.pageNumber.sectionOccurrenceId)) throw new H("INVALID_REFERENCE", `pages[${n}] has an invalid page number section owner`);
		}
		let c = [];
		try {
			si(e);
		} catch (e) {
			throw e instanceof ri ? new H("INVALID_REFERENCE", e.message) : e;
		}
		let l = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Set();
		oi(e).forEach(({ node: e }, i) => {
			let o = `pages[${n}].nodes[${i}]`;
			l.set(e.id, e), Qd(e, u, t), $d(e, o), Id(e.flowBounds, `${o}.flowBounds`), Id(e.inkBounds, `${o}.inkBounds`), e.clipBounds && Id(e.clipBounds, `${o}.clipBounds`), J(e.advancePt, `${o}.advancePt`), e.kind === "drawing" && ef(e, o);
			let s = r.get(e.flowDomainId);
			if (!s) throw new H("INVALID_REFERENCE", `${e.id} references missing flow domain ${e.flowDomainId}`);
			if (e.ordinaryFlow && s.kind === "body" && s.logicalBounds.heightPt === 0) throw new H("FLOW_DOMAIN_INVASION", `${e.id} claims ordinary flow in an empty body domain`);
			if (!e.ordinaryFlow) return;
			let d = s.kind === "body" ? a.get(s.id) : void 0;
			if (s.kind === "body") {
				if (!d) throw new H("INVALID_REFERENCE", `${e.id} references a body flow domain without a section region`);
				if (!Vd(e.flowBounds.yPt + e.flowBounds.heightPt, d.blockEndPt)) throw new H("BOTTOM_MARGIN_INVASION", `${e.id} crosses logical block end`);
			}
			if (!(d ? Kd(d.blockStartPt, d.blockEndPt, e.flowBounds) && (e.kind === "table" || Gd(s.logicalBounds, e.flowBounds)) : e.kind === "table" ? qd(s.logicalBounds, e.flowBounds) : Wd(s.logicalBounds, e.flowBounds))) throw new H("FLOW_DOMAIN_INVASION", `${e.id} crosses flow domain ${s.id}`);
			c.push(e);
		});
		let d = /* @__PURE__ */ new Set();
		if (e.readingOrder.forEach((e) => {
			if (!l.has(e) || d.has(e)) throw new H("INVALID_REFERENCE", `invalid reading-order reference ${e}`);
			d.add(e);
		}), e.bookmarkStarts !== void 0) {
			let t = bd(e, new Map([...a].map(([e, t]) => [e, t.sectionOccurrenceId]))), r = t.every((e) => e.sectionOccurrenceId.length > 0 && i.has(e.sectionOccurrenceId)), o = e.bookmarkStarts.length === t.length && e.bookmarkStarts.every((e, n) => {
				let r = t[n];
				return r !== void 0 && e.name === r.name && e.nodeId === r.nodeId && e.sectionOccurrenceId === r.sectionOccurrenceId;
			});
			if (!r || !o) throw new H("INVALID_REFERENCE", `pages[${n}] bookmark metadata does not match its retained graph (invalid bookmark node or ownership)`);
		}
		for (let e = 0; e < c.length; e += 1) for (let t = e + 1; t < c.length; t += 1) {
			let n = c[e], i = c[t];
			if (!n || !i) continue;
			let a = r.get(n.flowDomainId), o = r.get(i.flowDomainId), s = n.flowDomainId === i.flowDomainId, l = a?.kind === "body" && (o?.kind === "footnote" || o?.kind === "endnote") || o?.kind === "body" && (a?.kind === "footnote" || a?.kind === "endnote"), u = a?.id !== o?.id && (a?.kind === "footnote" || a?.kind === "endnote") && (o?.kind === "footnote" || o?.kind === "endnote");
			if ((s || l || u) && Ud(n.flowBounds, i.flowBounds)) throw new H("FLOW_OVERLAP", `${n.id} overlaps ${i.id}`);
		}
	});
}
function nf(e) {
	try {
		tf(e);
	} catch (e) {
		throw e instanceof H ? e : e instanceof TypeError || e instanceof RangeError ? new H("INVALID_GEOMETRY", e.message) : e;
	}
}
function rf(e, t) {
	if (typeof e != "object" || !e) {
		if (typeof e == "number" && !Number.isFinite(e)) throw new H("INVALID_GEOMETRY", "retained layout contains a non-finite number");
		return e;
	}
	if (t.has(e)) return e;
	t.add(e);
	for (let n of Object.values(e)) rf(n, t);
	return Object.freeze(e);
}
var af = /* @__PURE__ */ new WeakSet(), of = /* @__PURE__ */ new WeakSet();
function sf(e) {
	if (af.has(e)) return e;
	let t = rf(e, /* @__PURE__ */ new WeakSet());
	return af.add(t), t;
}
function cf(e) {
	return af.has(e) ? e : (On() && Nd(e, "layout"), sf(e));
}
function lf(e) {
	if (of.has(e)) return e;
	nf(e);
	let t = sf(e);
	return of.add(t), t;
}
//#endregion
//#region packages/docx/src/layout/variant-store.ts
function uf(e, t) {
	if (!Number.isInteger(t) || t < 0 || t >= e.pages.length) throw RangeError(`Page index ${t} out of range (count: ${e.pages.length})`);
	return e.pages[t];
}
var df = class {
	#e;
	#t;
	#n = /* @__PURE__ */ new Map();
	#r;
	#i;
	#a = null;
	#o = /* @__PURE__ */ new Set();
	constructor(e, t, n) {
		this.#e = e, this.#r = Object.freeze({ ...t }), this.#i = pi(this.#r, this.#e), this.#t = n;
	}
	get defaultLayout() {
		return this.layoutFor(this.#r);
	}
	layoutFor(e) {
		return this.select(e).layout;
	}
	select(e) {
		let t = Object.isFrozen(e) ? e : Object.freeze({ ...e }), n = pi(t, this.#e), r = this.#n.get(n);
		return r || (this.#c(n, t), r = cf(this.#t(t)), this.#n.set(n, r)), Object.freeze({
			key: n,
			options: t,
			layout: r
		});
	}
	selectPage(e, t) {
		let n = this.select(e);
		return Object.freeze({
			...n,
			page: uf(n.layout, t)
		});
	}
	prime(e, t) {
		let n = Object.isFrozen(e) ? e : Object.freeze({ ...e }), r = pi(n, this.#e);
		return this.#n.get(r) || this.#s(r, n, t);
	}
	replaceIfCurrent(e, t, n) {
		let r = Object.isFrozen(e) ? e : Object.freeze({ ...e }), i = pi(r, this.#e);
		return (this.#n.get(i) ?? null) === t ? this.#s(i, r, n) : null;
	}
	#s(e, t, n) {
		this.#c(e, t);
		let r = cf(n);
		return this.#n.set(e, r), r;
	}
	#c(e, t) {
		if (e !== this.#i) {
			if (this.#a !== t.currentDateMs) {
				for (let e of this.#o) this.#n.delete(e);
				this.#o.clear(), this.#a = t.currentDateMs;
			}
			this.#o.add(e);
		}
	}
	hasLayoutFor(e) {
		return this.#n.has(pi(e, this.#e));
	}
	isDefault(e) {
		return pi(e, this.#e) === this.#i;
	}
};
//#endregion
//#region packages/docx/src/layout/document-layout-variants.ts
function ff(e) {
	let { services: t, defaultCurrentDateMs: n, buildLayout: r } = e, i = fi({ defaultCurrentDateMs: n }), a = e.source.fatalParse, o = a === null ? null : ui(a.message, a.pageSize, t.text), s = new df(t, i, o === null ? r : () => o);
	return Or(t, s), Object.freeze({
		store: s,
		defaultOptions: i
	});
}
function pf(e, t, n) {
	let r = kr(e);
	if (!r) throw Error("Document layout variant store is not attached to the supplied services");
	return r.selectPage(fi(t), n);
}
//#endregion
//#region packages/docx/src/layout/affine.ts
function mf(e, t) {
	return Object.freeze({
		a: e.a * t.a + e.c * t.b,
		b: e.b * t.a + e.d * t.b,
		c: e.a * t.c + e.c * t.d,
		d: e.b * t.c + e.d * t.d,
		e: e.a * t.e + e.c * t.f + e.e,
		f: e.b * t.e + e.d * t.f + e.f
	});
}
function hf(e) {
	return Object.freeze({
		a: e,
		b: 0,
		c: 0,
		d: e,
		e: 0,
		f: 0
	});
}
function gf(e, t) {
	return Object.freeze({
		a: 1,
		b: 0,
		c: 0,
		d: 1,
		e,
		f: t
	});
}
function _f(e) {
	return Object.freeze(e === 1 ? {
		a: 0,
		b: 1,
		c: -1,
		d: 0,
		e: 0,
		f: 0
	} : {
		a: 0,
		b: -1,
		c: 1,
		d: 0,
		e: 0,
		f: 0
	});
}
function vf(e, t) {
	return {
		xPt: e.a * t.xPt + e.c * t.yPt + e.e,
		yPt: e.b * t.xPt + e.d * t.yPt + e.f
	};
}
function yf(e, t) {
	let n = e.a * e.d - e.b * e.c;
	if (!Number.isFinite(n) || n === 0) return null;
	let r = t.xPt - e.e, i = t.yPt - e.f, a = {
		xPt: (e.d * r - e.c * i) / n,
		yPt: (-e.b * r + e.a * i) / n
	};
	return Number.isFinite(a.xPt) && Number.isFinite(a.yPt) ? a : null;
}
function bf(e, t) {
	let n = e.a * e.d - e.b * e.c;
	if (!Number.isFinite(n) || n === 0) return null;
	let r = {
		xPt: (e.d * t.xPt - e.c * t.yPt) / n,
		yPt: (-e.b * t.xPt + e.a * t.yPt) / n
	};
	return Number.isFinite(r.xPt) && Number.isFinite(r.yPt) ? r : null;
}
//#endregion
//#region packages/docx/src/layout/text-index.ts
var xf = Object.freeze({
	a: 1,
	b: 0,
	c: 0,
	d: 1,
	e: 0,
	f: 0
}), Sf = Object.freeze([]), Cf = _f(1), wf = _f(-1);
function Tf(e, t, n, r, i, a = {}) {
	if (!e.collectRasterPaintOccurrences) return;
	let o = i, s = r.widthPt, c = r.heightPt;
	a.textBoxVerticalMode && (o = mf(o, a.textBoxVerticalMode === "vert270" ? Cf : wf), [s, c] = [c, s]), a.orientation === "upright-physical" && (o = mf(o, wf), [s, c] = [c, s]);
	let l = s * Math.hypot(o.a, o.b), u = c * Math.hypot(o.c, o.d);
	!Number.isFinite(l) || !Number.isFinite(u) || !(l > 0) || !(u > 0) || e.rasterPaintOccurrences.push(Object.freeze({
		resourceKey: t,
		resourceKind: n,
		widthPt: l,
		heightPt: u
	}));
}
function Ef(e, t, n) {
	if (!(!n.collectRasterPaintOccurrences || n.emittedRasterDrawings.has(e.id))) {
		n.emittedRasterDrawings.add(e.id);
		for (let r of e.commands) {
			if (r.kind === "resource" && r.resourceKind !== "math") {
				Tf(n, r.resourceKey, r.resourceKind, r.rect, t.pointToPage, { orientation: r.orientation });
				continue;
			}
			if (r.kind !== "drawingml-image-fill") continue;
			let { x: e, y: i, w: a, h: o } = r.plan.rect, s = r.fillRect ?? {
				l: 0,
				t: 0,
				r: 0,
				b: 0
			};
			Tf(n, r.resourceKey, "image", {
				xPt: e + s.l * a,
				yPt: i + s.t * o,
				widthPt: a * (1 - s.l - s.r),
				heightPt: o * (1 - s.t - s.b)
			}, t.pointToPage);
		}
	}
}
function Df(e) {
	let t = new Map(e.sectionRegions.map((e) => [e.id, e])), n = /* @__PURE__ */ new Map();
	for (let t of e.sectionRegions) for (let e of t.flowDomainIds) n.set(e, t);
	for (let r of e.flowDomains) {
		if (r.kind !== "footnote" && r.kind !== "endnote") continue;
		let i = r.sectionRegionId ? t.get(r.sectionRegionId) : e.sectionRegions[0];
		if (!i) throw Error(`${r.id} references missing page story region ${r.sectionRegionId ?? "<default>"}`);
		n.set(r.id, i);
	}
	return n;
}
function Of(e, t) {
	return t.coordinateSpace === "upright-physical" ? xf : e.get(t.node.flowDomainId)?.coordinateSpace.logicalToPhysical ?? xf;
}
function kf(e, t) {
	let n = e.rootPointToPage.get(t.rootNodeId);
	if (!n) throw Error(`Drawing entry ${t.node.id} references missing root ${t.rootNodeId}`);
	let r = n, i = [];
	for (let e of t.frames) e.kind === "transform" ? r = mf(r, e.transform) : i.push(Object.freeze({
		bounds: e.clip,
		pointToPage: r
	}));
	return {
		pointToPage: r,
		layoutTranslationPt: t.layoutTranslationPt,
		rootNodeId: t.rootNodeId,
		paintOrderIndex: e.drawingPaintOrder.get(t.node.id) ?? -1,
		clips: Object.freeze(i)
	};
}
function Af(e, t) {
	return t ? {
		...e,
		clips: Object.freeze([...e.clips, Object.freeze({
			bounds: t,
			pointToPage: e.pointToPage
		})])
	} : e;
}
function jf(e, t, n) {
	let r = t.xPt - e.flowBounds.xPt, i = t.yPt - e.flowBounds.yPt;
	return {
		...n,
		pointToPage: mf(n.pointToPage, gf(r, i)),
		layoutTranslationPt: {
			xPt: n.layoutTranslationPt.xPt + r,
			yPt: n.layoutTranslationPt.yPt + i
		}
	};
}
function Mf(e, t) {
	return (t.textBoxIds ?? []).flatMap((t) => {
		let n = e.get(t);
		return n ? [n] : [];
	});
}
function Nf(e, t, n) {
	if (n.emittedTextBoxes.has(e.id)) return;
	n.emittedTextBoxes.add(e.id);
	let r = Af({
		...t,
		pointToPage: mf(t.pointToPage, e.transform),
		textBoxVerticalMode: e.verticalMode ?? t.textBoxVerticalMode
	}, e.clipBounds);
	for (let t of e.story.blocks) Rf(t, r, n);
}
function Pf(e, t, n, r) {
	let i = Mf(e, t), a = Ff(t, n, r);
	Ef(t, a, r), r.collectDrawings && !r.emittedDrawings.has(t.id) && (r.emittedDrawings.add(t.id), r.drawings.push(Object.freeze({
		drawing: t,
		textBoxes: i,
		pointToPage: a.pointToPage,
		clips: a.clips,
		paintOrderIndex: a.paintOrderIndex,
		sourceOrder: r.drawingSourceOrder++
	})));
	for (let e of i) Nf(e, a, r);
}
function Ff(e, t, n) {
	let r = n.drawingEntries.get(e.id), i = t;
	r && r.rootNodeId === t.rootNodeId && (i = kf(n, r));
	let a = i.layoutTranslationPt, o = e.anchorLayer?.horizontalOwnership === "page" ? -a.xPt : 0, s = e.anchorLayer?.verticalOwnership === "page" ? -a.yPt : 0, c = o === 0 && s === 0 ? i : {
		...i,
		pointToPage: mf(i.pointToPage, gf(o, s))
	};
	if (e.orientation === "upright-physical") {
		if (!e.transform) throw Error(`Upright physical drawing ${e.id} is missing its logical transform`);
		c = {
			...c,
			pointToPage: mf(c.pointToPage, e.transform)
		};
	}
	return c;
}
function If(e, t, n) {
	let r = Af(t, e.clipBounds);
	if (n.collectCompletedParagraphSources && e.continuation?.continuesOnNext !== !0 && n.completedParagraphSources.add(B(e.source)), n.collectTextRuns || n.collectTextRunSources) {
		for (let r of e.lines) for (let i of r.placements) if (i.kind === "text" && (n.collectTextRuns && n.runs.push(Object.freeze({
			placement: i,
			pointToPage: t.pointToPage,
			source: e.source,
			...e.paragraphId === void 0 ? {} : { paragraphId: e.paragraphId }
		})), n.collectTextRunSources && i.sourceRunIndex !== void 0 && i.text.length > 0)) {
			let t = B(e.source), r = n.sourceRuns.get(t) ?? /* @__PURE__ */ new Set();
			n.sourceRuns.has(t) || n.sourceRuns.set(t, r), r.add(i.sourceRunIndex);
		}
	}
	if (n.collectRasterPaintOccurrences) for (let t of e.lines) for (let e of t.placements) e.kind !== "resource" || e.resourceKind === "math" || Tf(n, e.resourceKey, e.resourceKind, e.bounds, r.pointToPage, {
		orientation: e.orientation,
		textBoxVerticalMode: r.textBoxVerticalMode
	});
	let i = new Map(e.textBoxes.map((e) => [e.id, e])), a = /* @__PURE__ */ new Set(), o = e.drawings.map((e, t) => {
		let n = e.source.path.at(-1);
		if (n === void 0 || !Number.isSafeInteger(n) || n < 0) throw Error(`Drawing ${e.id} has no retained paragraph run index`);
		return {
			drawing: e,
			index: t,
			runIndex: n
		};
	}).sort((e, t) => e.runIndex - t.runIndex || e.index - t.index), s = n.collectDrawings ? e.lines.flatMap((e) => e.placements.flatMap((e, t) => e.kind !== "resource" || e.resourceKind !== "image" && e.resourceKind !== "chart" || e.sourceRunIndex === void 0 ? [] : [{
		placement: e,
		index: t,
		runIndex: e.sourceRunIndex
	}])) : [];
	for (let { drawing: e } of o) for (let t of e.textBoxIds ?? []) a.add(t);
	let c = [...o.map((e) => ({
		kind: "drawing",
		...e
	})), ...s.map((e) => ({
		kind: "resource",
		...e
	}))].sort((e, t) => e.runIndex - t.runIndex || e.index - t.index);
	for (let t of c) {
		if (t.kind === "drawing") {
			Pf(i, t.drawing, r, n);
			continue;
		}
		n.collectDrawings && n.inlineResources.push(Object.freeze({
			placement: t.placement,
			source: Object.freeze({
				...e.source,
				path: Object.freeze([...e.source.path, t.runIndex])
			}),
			pointToPage: r.pointToPage,
			clips: r.clips,
			paintOrderIndex: r.paintOrderIndex,
			sourceOrder: n.drawingSourceOrder++
		}));
	}
	for (let t of e.textBoxes) a.has(t.id) || Nf(t, r, n);
}
function Lf(e, t, n) {
	let r = Af(t, e.clipBounds);
	for (let t of e.rows) for (let e of t.cells) {
		let t = "visualMergeOwnership" in e && e.visualMergeOwnership === "continuation";
		if (e.verticalMerge === "continue" && !t) continue;
		let i = Af(r, e.clipBounds);
		for (let t of e.blocks) {
			let r = t.layout;
			Rf(r, jf(r, {
				xPt: e.contentBounds.xPt + (r.kind === "table" ? r.flowBounds.xPt : 0),
				yPt: e.flowBounds.yPt + t.offsetPt + (r.kind === "table" ? r.flowBounds.yPt : 0)
			}, i), n);
		}
	}
	for (let i of e.resolvedFloatingTables ?? []) Rf(i.child, jf(i.child, {
		xPt: i.xPt - t.layoutTranslationPt.xPt,
		yPt: i.yPt - t.layoutTranslationPt.yPt
	}, r), n);
}
function Rf(e, t, n) {
	switch (e.kind) {
		case "paragraph":
			If(e, t, n);
			return;
		case "table":
			Lf(e, t, n);
			return;
		case "note":
			for (let r of e.story.blocks) Rf(r, Af(t, e.story.clipBounds), n);
			return;
		case "textbox":
			Nf(e, t, n);
			return;
		case "drawing": {
			let r = n.drawingEntries.get(e.id);
			Pf(new Map((r?.textBoxes ?? []).map((e) => [e.id, e])), e, t, n);
			return;
		}
		default: throw Error(`Unknown text-index node: ${String(e)}`);
	}
}
function zf(e, t, n) {
	let r = e.pages[t];
	if (!r) throw RangeError(`Page index ${t} is out of range`);
	let i = new Map(r.layers.roots.map((e) => [e.node.id, e])), a = Df(r), o = new Map(r.layers.roots.map((e) => [e.node.id, Of(a, e)])), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
	for (let [e, t] of r.layers.paintOrder.entries()) t.kind === "drawing" && s.set(t.node.id, t), t.kind === "drawing" ? c.set(t.node.id, e) : l.set(t.node.id, e);
	let u = {
		...n,
		collectCompletedParagraphSources: n.collectCompletedParagraphSources === !0,
		collectRasterPaintOccurrences: n.collectRasterPaintOccurrences === !0,
		drawingEntries: s,
		rootPointToPage: o,
		rootPaintOrder: l,
		drawingPaintOrder: c,
		emittedTextBoxes: /* @__PURE__ */ new Set(),
		emittedDrawings: /* @__PURE__ */ new Set(),
		runs: [],
		sourceRuns: /* @__PURE__ */ new Map(),
		completedParagraphSources: /* @__PURE__ */ new Set(),
		drawings: [],
		inlineResources: [],
		rasterPaintOccurrences: [],
		emittedRasterDrawings: /* @__PURE__ */ new Set(),
		drawingSourceOrder: 0
	}, d = u.collectRasterPaintOccurrences ? r.layers.roots.map(({ node: e }) => e.id) : r.readingOrder;
	for (let e of d) {
		let t = i.get(e);
		if (!t) throw Error(`Reading-order node ${e} is not a page root`);
		let n = o.get(e);
		if (!n) throw Error(`Reading-order node ${e} has no page projection`);
		Rf(t.node, {
			pointToPage: n,
			layoutTranslationPt: {
				xPt: 0,
				yPt: 0
			},
			rootNodeId: t.node.id,
			paintOrderIndex: l.get(t.node.id) ?? -1,
			clips: Sf
		}, u);
	}
	return u;
}
function Bf(e, t) {
	return Object.freeze(zf(e, t, {
		collectTextRuns: !0,
		collectTextRunSources: !1,
		collectDrawings: !1
	}).runs);
}
function Vf(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set();
	for (let r = 0; r < e.pages.length; r += 1) {
		let i = zf(e, r, {
			collectTextRuns: !1,
			collectTextRunSources: !0,
			collectCompletedParagraphSources: !0,
			collectDrawings: !1
		});
		for (let [e, n] of i.sourceRuns) {
			let r = t.get(e) ?? /* @__PURE__ */ new Set();
			t.has(e) || t.set(e, r);
			for (let e of n) r.add(e);
		}
		for (let e of i.completedParagraphSources) n.add(e);
	}
	return Object.freeze({
		renderedRunIndex: t,
		completedSourceKeys: n
	});
}
function Hf(e, t) {
	let n = zf(e, t, {
		collectTextRuns: !1,
		collectTextRunSources: !1,
		collectDrawings: !0
	}), r = [...n.drawings, ...n.inlineResources];
	return r.sort((e, t) => e.paintOrderIndex - t.paintOrderIndex || e.sourceOrder - t.sourceOrder), Object.freeze(r);
}
function Uf(e, t) {
	return Object.freeze(zf(e, t, {
		collectTextRuns: !1,
		collectTextRunSources: !1,
		collectDrawings: !1,
		collectRasterPaintOccurrences: !0
	}).rasterPaintOccurrences);
}
//#endregion
//#region packages/docx/src/paint/affine.ts
function Wf(e) {
	let t = Math.hypot(e.a, e.b), n = Math.hypot(e.c, e.d), r = e.a / t, i = e.b / t, a = e.c / n, o = e.d / n;
	if (!(r === 1 && i === 0 && a === 0 && o === 1)) return r === 0 && i === 1 && a === -1 && o === 0 ? "rotate(90deg)" : r === 0 && i === -1 && a === 1 && o === 0 ? "rotate(-90deg)" : `matrix(${r}, ${i}, ${a}, ${o}, 0, 0)`;
}
//#endregion
//#region packages/docx/src/text-run-projection.ts
function Gf(e, t) {
	let { placement: n } = e, r = vf(t, n.bounds), i = n.highlightBounds ? vf(t, n.highlightBounds) : void 0, a = Math.hypot(t.a, t.b), o = Math.hypot(t.c, t.d), s = Wf(t), c = n.paintOps[0]?.letterSpacingPt ?? 0;
	return {
		source: {
			story: e.source.story,
			storyInstance: e.source.storyInstance,
			path: [...e.source.path]
		},
		...e.paragraphId === void 0 ? {} : { paragraphId: e.paragraphId },
		...n.sourceRunIndex === void 0 ? {} : { sourceRunIndex: n.sourceRunIndex },
		direction: n.direction,
		text: n.text,
		x: r.xPt,
		y: r.yPt,
		w: n.bounds.widthPt * a,
		...n.trailingSpaceCompressionPt === void 0 ? {} : { trailingSpaceCompressionPx: n.trailingSpaceCompressionPt * a },
		h: n.bounds.heightPt * o,
		...n.highlightBounds && i ? { highlightBounds: Object.freeze({
			x: i.xPt,
			y: i.yPt,
			width: n.highlightBounds.widthPt * a,
			height: n.highlightBounds.heightPt * o
		}) } : {},
		fontSize: n.fontSizePt * o,
		font: lt(n.fontRoute, n.fontSizePt * o, n.fontWeight, n.fontStyle),
		...c === 0 ? {} : { letterSpacingPx: c * a },
		...s ? { transform: s } : {},
		...n.hyperlink ? { hyperlink: n.hyperlink } : {},
		...n.tateChuYoko ? { eastAsianVert: !0 } : {}
	};
}
function Kf(e, t, n) {
	if (!Number.isFinite(n.scale) || n.scale <= 0) throw RangeError(`Text projection scale must be positive: ${n.scale}`);
	let r = hf(n.scale);
	return Bf(e, t).map((e) => Gf(e, mf(r, e.pointToPage)));
}
function qf(e, t, n) {
	let r = pf(e, {
		currentDate: n.currentDate,
		defaultCurrentDateMs: n.defaultCurrentDateMs,
		showTrackedChanges: n.showTrackedChanges
	}, t), i = (n.width ?? r.page.geometry.widthPt * 1.3333333333333333) / r.page.geometry.widthPt;
	return Kf(r.layout, t, { scale: i });
}
//#endregion
//#region packages/docx/src/paint/browser-images.ts
function Jf(e, t, n) {
	return `${e}${t ? `|clr:${t}` : ""}${n ? `|duo:${n.clr1}:${n.clr2}` : ""}`;
}
function Yf(e) {
	return e.cacheKey ?? Jf(e.imagePath, e.colorReplaceFrom, e.duotone);
}
var Xf = "docx-color-effects";
function Zf(e, t) {
	let n = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), i = parseInt(t.slice(4, 6), 16);
	for (let t = 0; t < e.data.length; t += 4) e.data[t] === n && e.data[t + 1] === r && e.data[t + 2] === i && (e.data[t + 3] = 0);
}
async function Qf(e, t, n, r, i) {
	let a = async (n) => {
		if (t) throw n instanceof Error ? n : /* @__PURE__ */ Error("2D canvas is unavailable for image color effects");
		if (r) return null;
		let a = Ze(e.width, e.height, i?.targetWidthPx, i?.targetHeightPx);
		if (!a) return e;
		if (typeof createImageBitmap > "u") throw Error("createImageBitmap is unavailable for duotone fallback resampling");
		return createImageBitmap(e, a);
	};
	if (typeof OffscreenCanvas > "u") return a();
	let o, s;
	try {
		o = new OffscreenCanvas(e.width, e.height), s = o.getContext("2d");
	} catch (e) {
		return a(e);
	}
	if (!s) return a();
	s.drawImage(e, 0, 0);
	let c;
	try {
		c = s.getImageData(0, 0, e.width, e.height);
	} catch (e) {
		return a(e);
	}
	if (t && Zf(c, t), n) try {
		le(c, n.clr1, n.clr2);
	} catch {
		if (r) return null;
	}
	s.putImageData(c, 0, 0);
	let l = Ze(e.width, e.height, i?.targetWidthPx, i?.targetHeightPx);
	return l ? createImageBitmap(o, l) : createImageBitmap(o);
}
async function $f(e, t, n, r, i = 0, a = 0, o, s = !1, c, l, u) {
	let d = Math.floor(Je / (n || o ? 4 : 1)), f = Number.isSafeInteger(u) && (u ?? 0) > 0 ? Math.min(d, u) : d, p = n || o ? A(r, Xf) : void 0, m = {
		widthPt: i,
		heightPt: a,
		suppressBoundaryFrame: !0,
		tiff: c,
		maxRetainedPixels: f,
		...l ?? {}
	}, h = await de(e, t, r, { ...m });
	if (!h) return null;
	if (!n && !o) return h;
	let g = await ve(e, t, r, m, p, h), _ = Ze(h.width, h.height, l?.targetWidthPx, l?.targetHeightPx), v = _ ? `|resize:${_.resizeWidth}x${_.resizeHeight}` : "";
	return se(Xf, `${Jf(g, n, o)}${v}${s ? "|strict" : ""}`, r, async () => {
		let e = await Qf(h, n, o, s, l);
		return {
			bitmap: e,
			owned: e !== null && e !== h
		};
	}, p);
}
function ep(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let e of t) {
		if (e.resourceKind !== "image" && e.resourceKind !== "picture-bullet" || !Number.isFinite(e.widthPt) || e.widthPt <= 0 || !Number.isFinite(e.heightPt) || e.heightPt <= 0) continue;
		let t = `${e.resourceKind}:${e.resourceKey}`, n = i.get(t);
		i.set(t, {
			widthPt: Math.max(n?.widthPt ?? 0, e.widthPt),
			heightPt: Math.max(n?.heightPt ?? 0, e.heightPt)
		});
	}
	let a = e.filter((e) => e.kind === "image" || e.kind === "picture-bullet").sort((e, t) => (e.documentOrder ?? 2 ** 53 - 1) - (t.documentOrder ?? 2 ** 53 - 1));
	for (let e of a) {
		let t = i.get(`${e.kind}:${e.resourceKey}`);
		if (!t) continue;
		let a = ze(e.mimeType, e.srcRect, t.widthPt, t.heightPt);
		if (!a) continue;
		let o = {
			imagePath: e.partPath,
			mimeType: e.mimeType,
			...e.svgImagePath === void 0 ? {} : { svgImagePath: e.svgImagePath },
			...e.colorReplaceFrom === void 0 ? {} : { colorReplaceFrom: e.colorReplaceFrom },
			...e.duotone === void 0 ? {} : { duotone: e.duotone },
			widthPt: a.widthPt,
			heightPt: a.heightPt,
			hasCrop: e.srcRect != null
		}, s = n === void 0 ? null : Re(t.widthPt * n, t.heightPt * n, e.srcRect);
		s && (o.targetWidthPx = s.width, o.targetHeightPx = s.height);
		let c = Yf(o), l = r.get(c);
		l ? (l.widthPt = Math.max(l.widthPt, o.widthPt), l.heightPt = Math.max(l.heightPt, o.heightPt), l.hasCrop ||= o.hasCrop, l.targetWidthPx = Math.max(l.targetWidthPx ?? 0, o.targetWidthPx ?? 0) || void 0, l.targetHeightPx = Math.max(l.targetHeightPx ?? 0, o.targetHeightPx ?? 0) || void 0) : r.set(c, o);
	}
	let o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map();
	for (let e of t) {
		if (e.resourceKind !== "chart") continue;
		let t = s.get(e.resourceKey) ?? [];
		s.has(e.resourceKey) || s.set(e.resourceKey, t), t.push(e);
	}
	for (let t of e) if (t.kind === "chart") for (let e of s.get(t.resourceKey) ?? []) {
		if (!Number.isFinite(e.widthPt) || e.widthPt <= 0 || !Number.isFinite(e.heightPt) || e.heightPt <= 0) continue;
		let i = {
			widthPt: e.widthPt,
			heightPt: e.heightPt,
			targetWidthPx: n === void 0 ? void 0 : e.widthPt * n,
			targetHeightPx: n === void 0 ? void 0 : e.heightPt * n
		}, a = He(t.model).map((e) => ({
			usage: e,
			size: Ve(e, i)
		}));
		if (!a.some(({ size: e }) => e === null)) for (let { usage: e, size: t } of a) {
			if (!t) continue;
			let n = e.fill, i = ze(n.mimeType, n.srcRect, t.widthPt, t.heightPt);
			if (!i) continue;
			let a = {
				cacheKey: Ke(n),
				imagePath: n.imagePath,
				mimeType: n.mimeType,
				...n.svgImagePath === void 0 ? {} : { svgImagePath: n.svgImagePath },
				...n.duotone === void 0 ? {} : { duotone: n.duotone },
				widthPt: i.widthPt,
				heightPt: i.heightPt,
				hasCrop: n.srcRect != null,
				failClosedOnDuotoneFailure: !0,
				...!e.preserveNaturalSize && t.targetWidthPx && t.targetHeightPx ? {
					targetWidthPx: t.targetWidthPx,
					targetHeightPx: t.targetHeightPx
				} : {}
			}, s = Yf(a), c = r.get(s);
			c ? (c.widthPt = Math.max(c.widthPt, a.widthPt), c.heightPt = Math.max(c.heightPt, a.heightPt), c.hasCrop ||= a.hasCrop) : r.set(s, a), e.preserveNaturalSize && o.add(s);
			let l = r.get(s);
			o.has(s) ? (l.targetWidthPx = void 0, l.targetHeightPx = void 0) : (l.targetWidthPx = Math.max(l.targetWidthPx ?? 0, a.targetWidthPx ?? 0) || void 0, l.targetHeightPx = Math.max(l.targetHeightPx ?? 0, a.targetHeightPx ?? 0) || void 0);
		}
	}
	return [...r.values()];
}
async function tp(e, t, n, r, i, a, o) {
	if (!n) return /* @__PURE__ */ new Map();
	let s = O(o), c = (e, t) => a ? _e(e, n, {
		targetWidthPx: t.targetWidthPx,
		targetHeightPx: t.targetHeightPx,
		maxRetainedPixels: t.targetWidthPx && t.targetHeightPx ? t.targetWidthPx * t.targetHeightPx : void 0,
		workerDecoder: a
	}) : _e(e, n), l = ep(e, t, i), u = xe((await Promise.all(l.map(async (e) => {
		if (!e.targetWidthPx || !e.targetHeightPx || e.colorReplaceFrom || e.duotone) return null;
		let t = e.mimeType === "image/svg+xml", i = {
			svgImagePath: e.svgImagePath,
			srcRect: e.hasCrop || null
		};
		if (t || F(i)) return null;
		if (ye(e.mimeType) && (s.resolution === "display" || s.strategy === "adaptive")) return {
			key: Yf(e),
			targetWidthPx: e.targetWidthPx,
			targetHeightPx: e.targetHeightPx,
			retainedSurfaceCount: 1
		};
		let a = await ee(e.imagePath, e.mimeType, n).catch(() => null);
		return !a?.dimensions || !x(a.format, r !== void 0) ? null : {
			key: Yf(e),
			targetWidthPx: e.targetWidthPx,
			targetHeightPx: e.targetHeightPx,
			sourceWidthPx: a.dimensions.width,
			sourceHeightPx: a.dimensions.height,
			retainedSurfaceCount: 1
		};
	}))).filter((e) => e !== null), s);
	for (let e of l) {
		if (e.mimeType === "image/svg+xml" || !e.colorReplaceFrom && !e.duotone && F({
			svgImagePath: e.svgImagePath,
			srcRect: e.hasCrop || null
		})) continue;
		let t = u.targets.get(Yf(e));
		e.targetWidthPx = t?.width, e.targetHeightPx = t?.height, e.plannedPixelLimit = t?.maxRetainedPixels;
	}
	let d = await Promise.all(l.map(async (e) => {
		try {
			let t = e.mimeType === "image/svg+xml", i = {
				svgImagePath: e.svgImagePath,
				srcRect: e.hasCrop || null
			}, a;
			if (F(i)) try {
				a = await c(i.svgImagePath, e);
			} catch (i) {
				let o = t ? await c(e.imagePath, e) : await $f(e.imagePath, e.mimeType, e.colorReplaceFrom, n, e.widthPt, e.heightPt, e.duotone, e.failClosedOnDuotoneFailure ?? !1, r, e.targetWidthPx && e.targetHeightPx ? {
					targetWidthPx: e.targetWidthPx,
					targetHeightPx: e.targetHeightPx
				} : void 0, e.plannedPixelLimit);
				if (!o) throw i;
				a = o;
			}
			else a = t ? await c(e.imagePath, e) : await $f(e.imagePath, e.mimeType, e.colorReplaceFrom, n, e.widthPt, e.heightPt, e.duotone, e.failClosedOnDuotoneFailure ?? !1, r, e.targetWidthPx && e.targetHeightPx ? {
				targetWidthPx: e.targetWidthPx,
				targetHeightPx: e.targetHeightPx
			} : void 0, e.plannedPixelLimit);
			return a == null ? null : [Yf(e), a];
		} catch (t) {
			if (y(t, "tiff")) return [Yf(e), t];
			throw t;
		}
	})), f = /* @__PURE__ */ new Map();
	for (let e of d) e && f.set(e[0], e[1]);
	return f;
}
//#endregion
//#region packages/docx/src/paint/column-separator-raster.ts
function np(e, t) {
	return Math.round(e * t) / t;
}
function rp(e, t, n) {
	let r = e * t;
	return (n % 2 == 0 ? Math.round(r) : Math.round(r - .5) + .5) / t;
}
function ip(e, t, n) {
	let r = t * n, i = Math.max(1, Math.round(.5 * t)), a = Math.max(1, Math.round(i * n)), o = a / r;
	if (e.start.xPt === e.end.xPt) {
		let t = rp(e.start.xPt, r, a);
		return {
			segment: {
				start: {
					xPt: t,
					yPt: np(e.start.yPt, r)
				},
				end: {
					xPt: t,
					yPt: np(e.end.yPt, r)
				}
			},
			widthPt: o
		};
	}
	if (e.start.yPt === e.end.yPt) {
		let t = rp(e.start.yPt, r, a);
		return {
			segment: {
				start: {
					xPt: np(e.start.xPt, r),
					yPt: t
				},
				end: {
					xPt: np(e.end.xPt, r),
					yPt: t
				}
			},
			widthPt: o
		};
	}
	return {
		segment: e,
		widthPt: o
	};
}
//#endregion
//#region packages/docx/src/paint/canvas-resource.ts
function ap(e, t, n, r, i) {
	if (r !== "upright-physical") {
		i.resources.paint(e, t, n, i.ctx);
		return;
	}
	let { ctx: a } = i;
	a.save(), a.translate(n.xPt + n.widthPt / 2, n.yPt + n.heightPt / 2), a.rotate(-Math.PI / 2), i.resources.paint(e, t, {
		xPt: -n.heightPt / 2,
		yPt: -n.widthPt / 2,
		widthPt: n.heightPt,
		heightPt: n.widthPt
	}, a), a.restore();
}
//#endregion
//#region packages/docx/src/paint/canvas-drawing.ts
function op(e, t) {
	for (let n of e.commands) {
		if (n.kind === "noop") continue;
		if (n.kind === "drawingml-shape") {
			Ct(t.ctx, n.plan, 1);
			continue;
		}
		if (n.kind === "drawingml-image-fill") {
			if (!t.resources) throw Error(`Missing retained resource painter for ${n.resourceKey}`);
			let { x: e, y: r, w: i, h: a } = n.plan.rect, o = n.fillRect ?? {
				l: 0,
				t: 0,
				r: 0,
				b: 0
			}, s = {
				xPt: e + o.l * i,
				yPt: r + o.t * a,
				widthPt: i * (1 - o.l - o.r),
				heightPt: a * (1 - o.t - o.b)
			};
			s.widthPt > 0 && s.heightPt > 0 && ht(t.ctx, n.plan, () => {
				gt(t.ctx, n.plan), ap(n.resourceKey, "image", s, void 0, t);
			}), Ct(t.ctx, n.plan, 1);
			continue;
		}
		if (n.kind === "resource") {
			if (!t.resources) throw Error(`Missing retained resource painter for ${n.resourceKey}`);
			ap(n.resourceKey, n.resourceKind, n.rect, n.orientation, t);
			continue;
		}
		if (n.kind === "fill-rect") {
			t.ctx.fillStyle = n.fill, t.ctx.fillRect(n.rect.xPt, n.rect.yPt, n.rect.widthPt, n.rect.heightPt);
			continue;
		}
		if (n.kind === "stroke-rect") {
			t.ctx.strokeStyle = n.stroke, t.ctx.lineWidth = n.lineWidthPt, t.ctx.setLineDash([...n.dashPt]), t.ctx.strokeRect(n.rect.xPt, n.rect.yPt, n.rect.widthPt, n.rect.heightPt), t.ctx.setLineDash([]);
			continue;
		}
		if (n.kind === "watermark-text") {
			let e = z(n.fill, t.ctx, n.rect.xPt, n.rect.yPt, n.rect.widthPt, n.rect.heightPt);
			if (e === null) continue;
			t.ctx.save();
			let r = n.rect.xPt + n.rect.widthPt / 2, i = n.rect.yPt + n.rect.heightPt / 2;
			t.ctx.translate(r, i), n.rotationDeg !== 0 && t.ctx.rotate(n.rotationDeg * Math.PI / 180), n.fitShape ? (t.ctx.scale(n.rect.widthPt / n.sourceBounds.widthPt, n.rect.heightPt / n.sourceBounds.heightPt), t.ctx.translate(-(n.sourceBounds.xPt + n.sourceBounds.widthPt / 2), -(n.sourceBounds.yPt + n.sourceBounds.heightPt / 2))) : t.ctx.translate(n.rect.xPt - r - n.sourceBounds.xPt, n.rect.yPt - i - n.sourceBounds.yPt), t.ctx.globalAlpha *= n.opacity, t.ctx.fillStyle = e, t.ctx.textAlign = "left", t.ctx.textBaseline = "alphabetic";
			let a = 0;
			for (let e of n.spans) t.ctx.font = lt(e.fontRoute, n.fontSizePt, e.fontWeight, e.fontStyle), t.ctx.fillText(e.text, a, 0), a += e.advancePt;
			t.ctx.restore();
			continue;
		}
		t.ctx.fillStyle = n.fill, t.ctx.font = lt(n.fontRoute, n.fontSizePt, n.fontWeight, n.fontStyle), t.ctx.textAlign = n.align === "start" ? "left" : n.align === "end" ? "right" : "center", t.ctx.textBaseline = n.baseline;
		let e = n.align === "start" ? n.rect.xPt : n.align === "end" ? n.rect.xPt + n.rect.widthPt : n.rect.xPt + n.rect.widthPt / 2, r = n.baseline === "top" ? n.rect.yPt : n.baseline === "bottom" ? n.rect.yPt + n.rect.heightPt : n.rect.yPt + n.rect.heightPt / 2;
		t.ctx.fillText(n.text, e, r);
	}
}
//#endregion
//#region packages/docx/src/paint/canvas-border.ts
function sp(e, t, n) {
	let r = e === "triple", i = /^(thinThick|thickThin|thinThickThin)(Small|Medium|Large)Gap$/.exec(e);
	if (!r && !i) return null;
	let a = r ? [
		1,
		1,
		1
	] : i?.[1] === "thinThick" ? [1, 2] : i?.[1] === "thickThin" ? [2, 1] : [
		1,
		2,
		1
	], o = r || i?.[2] === "Small" ? 1 : i?.[2] === "Medium" ? 2 : 3, s = t / (a.reduce((e, t) => e + t, 0) + o * (a.length - 1)), c = a.map((e) => Math.max(1, Math.round(s * e * n))), l = Math.max(1, Math.round(s * o * n)), u = 0;
	return {
		bands: c.map((e, t) => {
			let n = {
				offsetDev: u,
				widthDev: e
			};
			return u += e + (t < c.length - 1 ? l : 0), n;
		}),
		spanDev: u
	};
}
function cp(e) {
	return [...e.bands].reverse().map((t) => ({
		offsetDev: e.spanDev - t.offsetDev - t.widthDev,
		widthDev: t.widthDev
	}));
}
function lp(e, t, n) {
	if (t.style !== "compound") return !1;
	let r = n.pointToCss ?? hf(n.scale);
	if (r.b !== 0 || r.c !== 0 || r.a <= 0 || r.d <= 0) return !1;
	let i = vf(r, {
		xPt: e.xPt,
		yPt: e.yPt
	}), a = vf(r, {
		xPt: e.xPt + e.widthPt,
		yPt: e.yPt + e.heightPt
	}), o = sp(t.authoredStyle, t.widthPt * r.d, n.dpr), s = sp(t.authoredStyle, t.widthPt * r.a, n.dpr);
	if (!o || !s || o.bands.length !== s.bands.length) return !1;
	let c = cp(o), l = cp(s), u = (e, t, i, a) => {
		let o = [
			{
				xPt: e,
				yPt: t
			},
			{
				xPt: e + i,
				yPt: t
			},
			{
				xPt: e,
				yPt: t + a
			},
			{
				xPt: e + i,
				yPt: t + a
			}
		].map((e) => yf(r, e));
		if (o.some((e) => e === null)) return !1;
		let s = o.filter((e) => e !== null), c = s.map((e) => e.xPt), l = s.map((e) => e.yPt);
		return n.ctx.fillRect(Math.min(...c), Math.min(...l), Math.max(...c) - Math.min(...c), Math.max(...l) - Math.min(...l)), !0;
	}, d = Math.round(i.xPt * n.dpr - s.spanDev / 2), f = Math.round(a.xPt * n.dpr + s.spanDev / 2), p = Math.round(i.yPt * n.dpr - o.spanDev / 2), m = Math.round(a.yPt * n.dpr + o.spanDev / 2);
	n.ctx.fillStyle = t.color;
	for (let e = 0; e < c.length; e += 1) {
		let t = c[e], r = l[e], i = d + r.offsetDev, a = f - r.offsetDev, o = p + t.offsetDev, s = m - t.offsetDev, h = i / n.dpr, g = a / n.dpr, _ = o / n.dpr, v = s / n.dpr, y = r.widthDev / n.dpr, b = t.widthDev / n.dpr;
		if (!u(h, _, g - h, b) || !u(h, v - b, g - h, b) || !u(h, _, y, v - _) || !u(g - y, _, y, v - _)) return !1;
	}
	return n.ctx.setLineDash([]), !0;
}
function up(e) {
	return 1 / e.dpr;
}
function dp(e, t, n = 0) {
	let r = n / t.scale, i = r > e.widthPt ? {
		...e,
		widthPt: r,
		...typeof e.authoredStyle == "string" ? { dashPatternPt: Object.freeze(Be(e.authoredStyle, r)) } : {}
	} : e, { ctx: a } = t;
	a.strokeStyle = i.color, a.lineWidth = i.widthPt, a.setLineDash("dashPatternPt" in i && i.dashPatternPt ? [...i.dashPatternPt] : []), a.beginPath();
	let o = "path" in i && i.path?.length ? i.path : [i.from, i.to], s = o.length === 2 && (o[0].xPt === o[1].xPt || o[0].yPt === o[1].yPt), c = s && o[0].yPt === o[1].yPt, l = s && o[0].xPt === o[1].xPt, u = t.pointToCss ?? hf(t.scale), d = o.map((e) => vf(u, e)), f = s ? o[1].xPt - o[0].xPt : 0, p = s ? o[1].yPt - o[0].yPt : 0, m = u.a * f + u.c * p, h = u.b * f + u.d * p, g = s && h === 0, v = s && m === 0, y = c ? Math.hypot(u.c, u.d) : l ? Math.hypot(u.a, u.b) : 0, b = i.style === "compound" && s && y > 0 ? sp(i.authoredStyle, i.widthPt * y, t.dpr) : null;
	if (b) {
		a.fillStyle = i.color;
		let e = (e, t, n, r) => {
			let i = [
				{
					xPt: e,
					yPt: t
				},
				{
					xPt: e + n,
					yPt: t
				},
				{
					xPt: e,
					yPt: t + r
				},
				{
					xPt: e + n,
					yPt: t + r
				}
			].map((e) => yf(u, e));
			if (i.some((e) => e === null)) return;
			let o = i.filter((e) => e !== null), s = o.map((e) => e.xPt), c = o.map((e) => e.yPt);
			a.fillRect(Math.min(...s), Math.min(...c), Math.max(...s) - Math.min(...s), Math.max(...c) - Math.min(...c));
		}, n = Math.round((g ? d[0].yPt : d[0].xPt) * t.dpr - b.spanDev / 2);
		for (let r of b.bands) {
			let i = (n + r.offsetDev) / t.dpr, s = r.widthDev / t.dpr;
			if (g) e(Math.min(d[0].xPt, d[1].xPt), i, Math.abs(m), s);
			else if (v) e(i, Math.min(d[0].yPt, d[1].yPt), s, Math.abs(h));
			else {
				let e = (r.offsetDev - b.spanDev / 2) / t.dpr / y, n = r.widthDev / t.dpr / y;
				c ? a.fillRect(Math.min(o[0].xPt, o[1].xPt), o[0].yPt + e, Math.abs(o[1].xPt - o[0].xPt), n) : a.fillRect(o[0].xPt + e, Math.min(o[0].yPt, o[1].yPt), n, Math.abs(o[1].yPt - o[0].yPt));
			}
		}
		a.setLineDash([]);
		return;
	}
	if (i.style === "double" && s && y > 0) {
		if (a.fillStyle = i.color, g || v) {
			let e = (e, t, n, r) => {
				let i = [
					{
						xPt: e,
						yPt: t
					},
					{
						xPt: e + n,
						yPt: t
					},
					{
						xPt: e,
						yPt: t + r
					},
					{
						xPt: e + n,
						yPt: t + r
					}
				].map((e) => yf(u, e));
				if (i.some((e) => e === null)) return;
				let o = i.filter((e) => e !== null), s = o.map((e) => e.xPt), c = o.map((e) => e.yPt);
				a.fillRect(Math.min(...s), Math.min(...c), Math.max(...s) - Math.min(...s), Math.max(...c) - Math.min(...c));
			}, { railDev: n, gapDev: r, spanDev: o } = Me(i.widthPt * y, t.dpr), s = n / t.dpr;
			if (g) {
				let i = Math.round(d[0].yPt * t.dpr - o / 2), a = Math.min(d[0].xPt, d[1].xPt), c = Math.abs(d[1].xPt - d[0].xPt);
				e(a, i / t.dpr, c, s), e(a, (i + n + r) / t.dpr, c, s);
			} else {
				let i = Math.round(d[0].xPt * t.dpr - o / 2), a = Math.min(d[0].yPt, d[1].yPt), c = Math.abs(d[1].yPt - d[0].yPt);
				e(i / t.dpr, a, s, c), e((i + n + r) / t.dpr, a, s, c);
			}
		} else {
			let { railDev: e, gapDev: n, spanDev: r } = Me(i.widthPt * y, t.dpr), s = e / t.dpr / y, l = n / t.dpr / y, u = r / t.dpr / y;
			if (c) {
				let e = Math.min(o[0].xPt, o[1].xPt), t = Math.abs(o[1].xPt - o[0].xPt);
				a.fillRect(e, o[0].yPt - u / 2, t, s), a.fillRect(e, o[0].yPt - u / 2 + s + l, t, s);
			} else {
				let e = Math.min(o[0].yPt, o[1].yPt), t = Math.abs(o[1].yPt - o[0].yPt);
				a.fillRect(o[0].xPt - u / 2, e, s, t), a.fillRect(o[0].xPt - u / 2 + s + l, e, s, t);
			}
		}
		a.setLineDash([]);
		return;
	}
	let x = bf(u, v && y > 0 ? {
		xPt: _(d[0].xPt, i.widthPt * y, t.dpr),
		yPt: 0
	} : g && y > 0 ? {
		xPt: 0,
		yPt: _(d[0].yPt, i.widthPt * y, t.dpr)
	} : {
		xPt: 0,
		yPt: 0
	}) ?? {
		xPt: 0,
		yPt: 0
	}, S = o[0];
	a.moveTo(S.xPt + x.xPt, S.yPt + x.yPt);
	for (let e of o.slice(1)) a.lineTo(e.xPt + x.xPt, e.yPt + x.yPt);
	let C = i.style === "wavy" && o.length > 2;
	C && (a.save(), a.lineJoin = "bevel"), a.stroke(), C && a.restore(), a.setLineDash([]);
}
//#endregion
//#region packages/docx/src/paint/deferred-paint-frame.ts
function fp(e, t) {
	return (n) => () => {
		e.save();
		try {
			t(), n();
		} finally {
			e.restore();
		}
	};
}
//#endregion
//#region packages/docx/src/paint/canvas-table.ts
function pp(e, t) {
	let n = t.pointToCss ?? hf(t.scale);
	if (n.b !== 0 || n.c !== 0) return e;
	let r = [
		{
			xPt: e.xPt,
			yPt: e.yPt
		},
		{
			xPt: e.xPt + e.widthPt,
			yPt: e.yPt
		},
		{
			xPt: e.xPt,
			yPt: e.yPt + e.heightPt
		},
		{
			xPt: e.xPt + e.widthPt,
			yPt: e.yPt + e.heightPt
		}
	].map((e) => vf(n, e)), i = r.map((e) => e.xPt), a = r.map((e) => e.yPt), o = Math.floor(Math.min(...i) * t.dpr) / t.dpr, s = Math.floor(Math.min(...a) * t.dpr) / t.dpr, c = Math.ceil(Math.max(...i) * t.dpr) / t.dpr, l = Math.ceil(Math.max(...a) * t.dpr) / t.dpr, u = [
		{
			xPt: o,
			yPt: s
		},
		{
			xPt: c,
			yPt: s
		},
		{
			xPt: o,
			yPt: l
		},
		{
			xPt: c,
			yPt: l
		}
	].map((e) => yf(n, e));
	if (u.some((e) => e === null)) return e;
	let d = u.filter((e) => e !== null), f = d.map((e) => e.xPt), p = d.map((e) => e.yPt);
	return {
		xPt: Math.min(...f),
		yPt: Math.min(...p),
		widthPt: Math.max(...f) - Math.min(...f),
		heightPt: Math.max(...p) - Math.min(...p)
	};
}
function mp(e, t, n, r = !0) {
	let i = t.xPt - e.flowBounds.xPt, a = t.yPt - e.flowBounds.yPt, o = n.layoutTranslationPt ?? {
		xPt: 0,
		yPt: 0
	}, s = mf(n.pointToCss ?? hf(n.scale), gf(i, a)), c = fp(n.ctx, () => n.ctx.translate(i, a)), l = {
		...n,
		pointToCss: s,
		layoutTranslationPt: {
			xPt: o.xPt + i,
			yPt: o.yPt + a
		}
	};
	c(() => {
		e.kind === "paragraph" ? jp(e, l) : vp(e, l, e.resolvedFloatingTables ?? [], r);
	})();
}
function hp(e, t) {
	let n = up(t), r = /* @__PURE__ */ new Set();
	for (let n of e.compoundBorderFrames ?? []) lp(n.bounds, n.border, t) && n.segmentIndexes.forEach((e) => r.add(e));
	e.borders.forEach((e, i) => {
		r.has(i) || dp(e, t, n);
	});
}
function gp(e, t, n) {
	let r = t.xPt - e.flowBounds.xPt, i = t.yPt - e.flowBounds.yPt, a = n.layoutTranslationPt ?? {
		xPt: 0,
		yPt: 0
	}, o = mf(n.pointToCss ?? hf(n.scale), gf(r, i)), s = fp(n.ctx, () => n.ctx.translate(r, i)), c = {
		...n,
		pointToCss: o,
		layoutTranslationPt: {
			xPt: a.xPt + r,
			yPt: a.yPt + i
		}
	};
	s(() => {
		let t = () => hp(e, c);
		if (!e.clipBounds) {
			t();
			return;
		}
		fp(n.ctx, () => {
			n.ctx.beginPath(), n.ctx.rect(e.clipBounds.xPt, e.clipBounds.yPt, e.clipBounds.widthPt, e.clipBounds.heightPt), n.ctx.clip();
		})(t)();
	})();
}
function _p(e, t, n, r) {
	for (let n of e.rows) for (let e of n.cells) {
		let n = "visualMergeOwnership" in e && e.visualMergeOwnership === "continuation";
		if (e.verticalMerge === "continue" && !n) continue;
		e.background && (t.ctx.fillStyle = e.background.color, t.ctx.fillRect(e.flowBounds.xPt, e.flowBounds.yPt, e.flowBounds.widthPt, e.flowBounds.heightPt));
		let r = (t, n = !0) => {
			for (let r of e.blocks) mp(r.layout, {
				xPt: e.contentBounds.xPt + (r.layout.kind === "table" ? r.layout.flowBounds.xPt : 0),
				yPt: e.flowBounds.yPt + r.offsetPt + (r.layout.kind === "table" ? r.layout.flowBounds.yPt : 0)
			}, t, r.layout.kind !== "table" || n);
		};
		if (!e.clipBounds) {
			r(t);
			continue;
		}
		if (fp(t.ctx, () => {
			t.ctx.beginPath(), t.ctx.rect(e.clipBounds.xPt, e.clipBounds.yPt, e.clipBounds.widthPt, e.clipBounds.heightPt), t.ctx.clip();
		})(() => r(t, !1))(), e.blocks.some((e) => e.layout.kind === "table")) {
			let n = pp(e.clipBounds, t);
			fp(t.ctx, () => {
				t.ctx.beginPath(), t.ctx.rect(n.xPt, n.yPt, n.widthPt, n.heightPt), t.ctx.clip();
			})(() => {
				for (let n of e.blocks) n.layout.kind === "table" && gp(n.layout, {
					xPt: e.contentBounds.xPt + n.layout.flowBounds.xPt,
					yPt: e.flowBounds.yPt + n.offsetPt + n.layout.flowBounds.yPt
				}, t);
			})();
		}
	}
	bp(n, t), r && hp(e, t);
}
function vp(e, t, n, r) {
	if (!e.clipBounds) {
		_p(e, t, n, r);
		return;
	}
	let i = e.clipBounds;
	fp(t.ctx, () => {
		t.ctx.beginPath(), t.ctx.rect(i.xPt, i.yPt, i.widthPt, i.heightPt), t.ctx.clip();
	})(() => _p(e, t, n, r))();
}
function yp(e, t, n) {
	vp(e, t, n ?? e.resolvedFloatingTables ?? [], !0);
}
function bp(e, t) {
	let n = t.layoutTranslationPt ?? {
		xPt: 0,
		yPt: 0
	};
	for (let r of e) mp(r.child, {
		xPt: r.xPt - n.xPt,
		yPt: r.yPt - n.yPt
	}, t);
}
//#endregion
//#region packages/docx/src/paint/canvas-transform.ts
function xp(e, t) {
	let n = e.transform;
	if (n) {
		n.call(e, t.a, t.b, t.c, t.d, t.e, t.f);
		return;
	}
	if (e.translate(t.e, t.f), t.a === 0 && t.b === 1 && t.c === -1 && t.d === 0) e.rotate(Math.PI / 2);
	else if (t.a === 0 && t.b === -1 && t.c === 1 && t.d === 0) e.rotate(-Math.PI / 2);
	else if (t.b === 0 && t.c === 0) e.scale(t.a, t.d);
	else throw Error("Canvas context cannot apply the retained point-space transform");
}
//#endregion
//#region packages/docx/src/paint/canvas-text.ts
function Sp(e) {
	if (e.text.length !== e.range.end - e.range.start) throw Error("UTF-16 text range is inconsistent");
	if (e.clusters.length === 0) throw Error("Retained glyph slices are incomplete (clusters)");
	let t = e.range.start;
	for (let n of e.clusters) {
		let { advancePt: r, offset: i, range: a } = n;
		if (!Number.isFinite(r) || !Number.isFinite(i.xPt) || !Number.isFinite(i.yPt) || a.start !== t || a.end <= a.start || a.end > e.range.end) throw Error(`Retained glyph slices are incomplete (cluster range ${t}:${a.start}-${a.end}/${e.range.end}; advance ${r}; offset ${i.xPt},${i.yPt})`);
		t = a.end;
	}
	if (t !== e.range.end) throw Error(`Retained glyph slices are incomplete (cluster end ${t}/${e.range.end})`);
	if (e.paintOps.length === 0) throw Error("Retained glyph slices are incomplete (paint ops)");
	let n = e.range.start;
	for (let t of e.paintOps) {
		let r = t.sourceMapping !== "kashida" && t.text.length !== t.range.end - t.range.start, i = !Number.isFinite(t.offset.xPt) || !Number.isFinite(t.offset.yPt) || t.glyphOffsetPt !== void 0 && (!Number.isFinite(t.glyphOffsetPt.xPt) || !Number.isFinite(t.glyphOffsetPt.yPt)) || t.blockAxisInkBounds !== void 0 && (!Number.isFinite(t.blockAxisInkBounds.startPt) || !Number.isFinite(t.blockAxisInkBounds.endPt) || t.blockAxisInkBounds.endPt < t.blockAxisInkBounds.startPt) || !Number.isFinite(t.letterSpacingPt) || !Number.isFinite(t.scaleX) || t.scaleX <= 0 || t.scaleY !== void 0 && (!Number.isFinite(t.scaleY) || t.scaleY <= 0), a = t.range.start !== n || t.range.end <= t.range.start || t.range.end > e.range.end;
		if (r || i || a) throw Error(`Retained glyph slices are incomplete (${r ? "text" : i ? "geometry" : `range ${n}:${t.range.start}-${t.range.end}/${e.range.end}`})`);
		n = t.range.end;
	}
	let r = e.text.slice(n - e.range.start);
	if (r !== "" && !/^\s+$/u.test(r)) throw Error(`Retained glyph slices are incomplete (paint end ${n}/${e.range.end})`);
}
function Cp(e, t) {
	return e.kind === "explicit" ? e.color : e.kind === "auto" ? Ge(e.background ?? "#FFFFFF") : t.defaultTextColor ?? "#000000";
}
function wp(e, t) {
	return Cp(e.color, t);
}
function Tp(e, t, n = !1) {
	let { ctx: r } = t;
	r.fillStyle = Cp(e.color, t), r.font = lt(e.fontRoute, e.fontSizePt, e.fontWeight, e.fontStyle), n ? (r.save(), r.translate(e.origin.xPt, e.origin.yPt), r.rotate(-Math.PI / 2), r.fillText(e.text, 0, 0), r.restore()) : r.fillText(e.text, e.origin.xPt, e.origin.yPt);
}
function Ep(e, t) {
	let { ctx: n } = t;
	if (n.beginPath(), e.points.length > 0) {
		let t = e.points[0];
		n.moveTo(t.xPt, t.yPt);
		for (let t of e.points.slice(1)) n.lineTo(t.xPt, t.yPt);
	}
	e.stroke !== null && (n.strokeStyle = e.stroke, n.lineWidth = e.strokeWidthPt, n.stroke()), e.fill !== null && (n.fillStyle = e.fill, n.fill());
}
function Dp(e, t) {
	let n = new Map(e.textBoxes.map((e) => [e.id, e]));
	return (t.textBoxIds ?? []).flatMap((e) => {
		let t = n.get(e);
		return t ? [t] : [];
	});
}
function Op(e, t, n) {
	let r = n.layoutTranslationPt, i = e.anchorLayer?.horizontalOwnership === "page" ? -(r?.xPt ?? 0) : 0, a = e.anchorLayer?.verticalOwnership === "page" ? -(r?.yPt ?? 0) : 0;
	(i !== 0 || a !== 0) && (n.ctx.save(), n.ctx.translate(i, a));
	let o = (n) => {
		op(e, n);
		for (let e of t) Mp(e, {
			...n,
			omitAnchoredDrawings: !1
		});
	};
	try {
		if (e.orientation === "upright-physical") {
			if (!e.transform) throw Error("Upright physical drawing requires its retained logical transform");
			let t = mf(n.pointToCss ?? hf(n.scale), e.transform);
			fp(n.ctx, () => {
				xp(n.ctx, e.transform);
			})(() => o({
				...n,
				pointToCss: t
			}))();
		} else o(n);
	} finally {
		(i !== 0 || a !== 0) && n.ctx.restore();
	}
}
function kp(e, t, n) {
	Op(t, Dp(e, t), n);
}
function Ap(e, t) {
	let { ctx: n } = t, r = new Set(e.drawings.flatMap((e) => e.textBoxIds ?? [])), i = (n) => kp(e, n, t), a = e.drawings.filter((e) => e.anchorLayer?.behindDoc === !0).sort((e, t) => e.anchorLayer.relativeHeight - t.anchorLayer.relativeHeight || e.anchorLayer.sourceOrder - t.anchorLayer.sourceOrder);
	if (!t.omitAnchoredDrawings) for (let e of a) i(e);
	for (let t of e.lineNumbers ?? []) for (let e of t.paintOps) n.fillStyle = e.color, n.font = e.font, n.textAlign = e.textAlign, n.textBaseline = "alphabetic", n.fillText(e.text, e.origin.xPt, e.origin.yPt);
	e.shading && (n.fillStyle = e.shading.color, n.fillRect(e.inkBounds.xPt, e.inkBounds.yPt, e.inkBounds.widthPt, e.inkBounds.heightPt));
	for (let r of e.lines) {
		for (let e of r.barTabRules ?? []) dp(e, t, up(t));
		for (let e of r.placements) {
			if (e.kind === "resource") {
				if (!t.resources) throw Error(`Missing retained resource painter for ${e.resourceKey}`);
				if (t.textBoxVerticalMode) {
					let r = t.textBoxVerticalMode === "vert270" ? Math.PI / 2 : -Math.PI / 2;
					n.save(), n.translate(e.bounds.xPt + e.bounds.widthPt / 2, e.bounds.yPt + e.bounds.heightPt / 2), n.rotate(r), ap(e.resourceKey, e.resourceKind, {
						xPt: -e.bounds.heightPt / 2,
						yPt: -e.bounds.widthPt / 2,
						widthPt: e.bounds.heightPt,
						heightPt: e.bounds.widthPt
					}, e.orientation, t), n.restore();
				} else ap(e.resourceKey, e.resourceKind, e.bounds, e.orientation, t);
				continue;
			}
			if (e.kind === "tab") {
				if (e.leader !== "none") {
					if (!e.leaderGlyphs) throw Error("Retained tab leader geometry is missing");
					for (let n of e.leaderGlyphs) Tp(n, t);
				}
				for (let n of e.decorations ?? []) dp(n, t);
				continue;
			}
			if (e.kind !== "text") continue;
			if (Sp(e), e.unsupportedGeometry?.length) throw Error(`Unsupported retained typography geometry: ${e.unsupportedGeometry.join(", ")}`);
			if (e.highlightFragments) for (let t of e.highlightFragments) n.fillStyle = t.color, n.fillRect(t.rect.xPt, t.rect.yPt, t.rect.widthPt, t.rect.heightPt);
			else (e.background || e.highlight) && (n.fillStyle = e.highlight ?? e.background ?? "#000000", n.fillRect(e.bounds.xPt, e.bounds.yPt, e.bounds.widthPt, e.bounds.heightPt));
			n.fillStyle = wp(e, t), n.font = lt(e.fontRoute, e.fontSizePt, e.fontWeight, e.fontStyle), n.textAlign = "left", n.textBaseline = "alphabetic";
			let r = n.letterSpacing, i = n.fontKerning;
			for (let t of e.paintOps) {
				n.direction = t.direction, n.fontKerning = t.kerning;
				let r = e.origin.xPt + t.offset.xPt, i = e.origin.yPt + t.offset.yPt, a = t.glyphOffsetPt?.xPt ?? 0, o = t.glyphOffsetPt?.yPt ?? 0;
				if (t.glyphOrientation === "upright") {
					n.save(), n.translate(r, i), n.rotate(-Math.PI / 2), (t.scaleX !== 1 || t.scaleY !== void 0) && (t.writingMode === "vertical-rl" ? n.scale(1, t.scaleX) : n.scale(t.scaleX, t.scaleY ?? 1)), n.textAlign = "center", n.textBaseline = "middle", n.letterSpacing = `${t.letterSpacingPt}px`;
					let e = () => n.fillText(t.text, a, o);
					t.verticalFeature ? ce(n, e) : e(), n.restore();
				} else t.glyphOrientation === "rotate" ? (n.save(), n.translate(r, i), t.scaleX !== 1 && n.scale(t.scaleX, 1), n.textAlign = "center", n.textBaseline = "middle", n.letterSpacing = `${t.letterSpacingPt / t.scaleX}px`, n.fillText(t.text, a, o), n.restore()) : t.scaleX === 1 ? (n.letterSpacing = `${t.letterSpacingPt}px`, n.fillText(t.text, r + a, i + o)) : (n.save(), n.translate(r + a, i + o), n.scale(t.scaleX, 1), n.letterSpacing = `${t.letterSpacingPt / t.scaleX}px`, n.fillText(t.text, 0, 0), n.restore());
			}
			if (n.letterSpacing = r, n.fontKerning = i, e.ruby) {
				let n = t.textBoxVerticalMode === "eaVert" || t.textBoxVerticalMode === "mongolianVert";
				for (let r of e.ruby.paintOps) Tp(r, t, n);
			}
			for (let n of e.emphasis?.glyphs ?? []) Tp(n, t);
			for (let n of e.emphasis?.paths ?? []) Ep(n, t);
			for (let n of e.decorations) dp(n, t);
			for (let n of e.runBorderFragments ?? []) dp(n, t);
		}
	}
	let o = up(t);
	for (let n of e.borders) dp(n, t, o);
	for (let t of e.drawings.filter((e) => !e.anchorLayer)) i(t);
	let s = e.drawings.filter((e) => e.anchorLayer && !e.anchorLayer.behindDoc).sort((e, t) => e.anchorLayer.relativeHeight - t.anchorLayer.relativeHeight || e.anchorLayer.sourceOrder - t.anchorLayer.sourceOrder);
	if (!t.omitAnchoredDrawings) for (let e of s) i(e);
	for (let n of e.textBoxes) r.has(n.id) || Mp(n, {
		...t,
		omitAnchoredDrawings: !1
	});
}
function jp(e, t) {
	if (!e.clipBounds) {
		Ap(e, t);
		return;
	}
	let n = e.clipBounds;
	fp(t.ctx, () => {
		t.ctx.beginPath(), t.ctx.rect(n.xPt, n.yPt, n.widthPt, n.heightPt), t.ctx.clip();
	})(() => Ap(e, t))();
}
function Mp(e, t) {
	let n = (t) => {
		for (let n of e.story.blocks) if (n.kind === "paragraph") jp(n, t);
		else if (n.kind === "table") yp(n, t, n.resolvedFloatingTables ?? []);
		else throw Error(`Text-box story contains unsupported retained node: ${n.kind}`);
	}, r = mf(t.pointToCss ?? hf(t.scale), e.transform), i = e.transform.a !== 1 || e.transform.b !== 0 || e.transform.c !== 0 || e.transform.d !== 1 || e.transform.e !== 0 || e.transform.f !== 0, a = fp(t.ctx, () => {
		i && (e.verticalMode ? (t.ctx.translate(e.transform.e, e.transform.f), t.ctx.rotate(e.verticalMode === "vert270" ? -Math.PI / 2 : Math.PI / 2)) : t.ctx.transform(e.transform.a, e.transform.b, e.transform.c, e.transform.d, e.transform.e, e.transform.f));
	}), o = e.clipBounds ? fp(t.ctx, () => {
		t.ctx.beginPath(), t.ctx.rect(e.clipBounds.xPt, e.clipBounds.yPt, e.clipBounds.widthPt, e.clipBounds.heightPt), t.ctx.clip();
	}) : null, s = t.documentDefaultTextColor ?? t.defaultTextColor ?? "#000000", c = {
		...t,
		pointToCss: r,
		documentDefaultTextColor: s,
		defaultTextColor: e.defaultTextColor ?? s,
		...e.verticalMode ? { textBoxVerticalMode: e.verticalMode } : {}
	};
	a(() => {
		o ? o(() => n(c))() : n(c);
	})();
}
//#endregion
//#region packages/docx/src/paint/page-border.ts
function Np(e, t) {
	let n = mf(t.pointToCss ?? hf(t.scale), e.logicalToPhysical), r = {
		...t,
		pointToCss: n
	};
	fp(t.ctx, () => {
		xp(t.ctx, e.logicalToPhysical);
	})(() => {
		for (let t of e.segments) dp(t, r, .5);
	})();
}
//#endregion
//#region packages/docx/src/paint/canvas-page.ts
var Pp = Object.freeze({ paint(e, t) {
	throw Error(`Missing retained resource painter for ${e}: expected ${t}`);
} });
function Fp(e, t) {
	return Object.freeze({ paint(n, r, i, a) {
		switch (r) {
			case "image":
				t.image(e.resolve(n, r), i, a);
				return;
			case "chart":
				t.chart(e.resolve(n, r), i, a);
				return;
			case "math":
				t.math(e.resolve(n, r), i, a);
				return;
			case "picture-bullet":
				t["picture-bullet"](e.resolve(n, r), i, a);
				return;
			default: throw Error(`Unknown retained resource kind: ${String(r)}`);
		}
	} });
}
function Ip(e, t) {
	switch (e.kind) {
		case "drawing":
			op(e, t);
			return;
		case "paragraph":
			jp(e, t);
			return;
		case "table":
			yp(e, t, e.resolvedFloatingTables ?? []);
			return;
		case "note": {
			e.separator.forEach((e) => dp(e, t));
			let n = () => e.story.blocks.forEach((e) => Ip(e, t));
			if (!e.story.clipBounds) {
				n();
				return;
			}
			let r = e.story.clipBounds;
			t.ctx.save();
			try {
				t.ctx.beginPath(), t.ctx.rect(r.xPt, r.yPt, r.widthPt, r.heightPt), t.ctx.clip(), n();
			} finally {
				t.ctx.restore();
			}
			return;
		}
		case "textbox": throw Error(`Unsupported page paint node kind: ${e.kind}`);
		default: throw Error(`Unknown page paint node kind: ${String(e)}`);
	}
}
function Lp(e, t) {
	let n = e.columnSeparators;
	if (n.length === 0) return;
	let { ctx: r } = t;
	r.save(), r.strokeStyle = "#000000";
	for (let e of n) {
		let n = ip(e, t.scale, t.dpr);
		r.lineWidth = n.widthPt, r.beginPath(), r.moveTo(n.segment.start.xPt, n.segment.start.yPt), r.lineTo(n.segment.end.xPt, n.segment.end.yPt), r.stroke();
	}
	r.restore();
}
function Rp(e, t, n, r) {
	let i = n.get(e.flowDomainId), a = e.coordinateSpace === "upright-physical" ? void 0 : i?.coordinateSpace.logicalToPhysical, o = fp(t.ctx, () => {
		a && (a.a !== 1 || a.b !== 0 || a.c !== 0 || a.d !== 1 || a.e !== 0 || a.f !== 0) && xp(t.ctx, a);
	}), s = {
		...t,
		...a ? { pointToCss: {
			a: a.a * t.scale,
			b: a.b * t.scale,
			c: a.c * t.scale,
			d: a.d * t.scale,
			e: a.e * t.scale,
			f: a.f * t.scale
		} } : {}
	};
	o(() => r(s))();
}
function zp(e, t) {
	if (e.kind === "transform") {
		let n = t.transform;
		if (n) n.call(t, e.transform.a, e.transform.b, e.transform.c, e.transform.d, e.transform.e, e.transform.f);
		else if (e.transform.a === 1 && e.transform.b === 0 && e.transform.c === 0 && e.transform.d === 1) t.translate(e.transform.e, e.transform.f);
		else throw Error("Canvas context cannot apply the retained page paint transform");
		return;
	}
	t.beginPath(), t.rect(e.clip.xPt, e.clip.yPt, e.clip.widthPt, e.clip.heightPt), t.clip();
}
function Bp(e, t) {
	let n = t.pointToCss ?? hf(t.scale);
	for (let t of e.frames) t.kind === "transform" && (n = mf(n, t.transform));
	let r = {
		...t,
		pointToCss: n,
		layoutTranslationPt: e.layoutTranslationPt,
		omitAnchoredDrawings: !1
	}, i = 0;
	try {
		for (let n of e.frames) t.ctx.save(), i += 1, zp(n, t.ctx);
		Op(e.node, e.textBoxes, r);
	} finally {
		for (; i > 0;) t.ctx.restore(), --i;
	}
}
function Vp(e, t) {
	let n = new Map(e.sectionRegions.flatMap((e) => e.flowDomainIds.map((t) => [t, e]))), r = new Map(e.sectionRegions.map((e) => [e.id, e]));
	for (let t of e.flowDomains) if (t.kind === "footnote" || t.kind === "endnote") {
		let i = t.sectionRegionId ? r.get(t.sectionRegionId) : e.sectionRegions[0];
		if (!i) throw Error(`${t.id} references missing page story region ${t.sectionRegionId ?? "<default>"}`);
		n.set(t.id, i);
	}
	let i = e.layers.paintOrder, a = i.findIndex((e) => e.sourceLayer !== "background" && e.sourceLayer !== "behindText" && e.sourceLayer !== "header"), o = a === -1 ? i.length : a, s = (e) => {
		for (let r of e) Rp(r, t, n, (e) => {
			r.kind === "drawing" ? Bp(r, e) : Ip(r.node, {
				...e,
				omitAnchoredDrawings: r.omitAnchoredDrawings
			});
		});
	};
	e.pageBorder?.zOrder === "back" && Np(e.pageBorder, t), s(i.slice(0, o)), Lp(e, t), s(i.slice(o));
	for (let n of e.changeBars ?? []) t.ctx.fillStyle = "#000000", t.ctx.fillRect(n.bounds.xPt, n.bounds.yPt, n.bounds.widthPt, n.bounds.heightPt);
	e.pageBorder?.zOrder !== "back" && e.pageBorder && Np(e.pageBorder, t);
}
async function Hp(e, t, n, r, i = Pp) {
	let a = e.pages[t];
	if (!a) throw RangeError(`Page ${t} is outside the layout`);
	let o = n.getContext("2d");
	if (!o) throw Error("Canvas 2D context is unavailable");
	let s = r.scale * r.dpr;
	n.width = Math.ceil(a.geometry.widthPt * s), n.height = Math.ceil(a.geometry.heightPt * s), o.save();
	try {
		o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, n.width, n.height), o.setTransform(s, 0, 0, s, 0, 0), Vp(a, {
			ctx: o,
			scale: r.scale,
			dpr: r.dpr,
			resources: i
		});
	} finally {
		o.restore();
	}
}
//#endregion
//#region packages/docx/src/paint/resource-session.ts
function Up(e, t) {
	if (typeof e != "string" || e.trim().length === 0) throw TypeError(`${t} must be a non-empty string`);
}
function Wp(e, t = {}) {
	return Up(e, "unavailable paint resource reason"), Object.freeze({
		status: "unavailable",
		reason: e,
		...t
	});
}
function Gp(e) {
	return typeof e == "object" && !!e && e.status === "unavailable" && typeof e.reason == "string" && e.reason.trim().length > 0 && (e.placeholder === void 0 || e.placeholder === "tiff");
}
function Kp(e) {
	if (typeof e != "object" || !e || e.status !== "unavailable") return;
	Up(e.reason, "unavailable paint resource reason");
	let t = e.placeholder;
	if (t !== void 0 && t !== "tiff") throw TypeError("unavailable paint resource placeholder must be tiff when supplied");
}
function qp(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of t) {
		if (n.has(r.resourceKey)) throw Error(`Duplicate paint resource handle: ${r.resourceKey}`);
		Kp(r.handle), e.resolve(r.resourceKey, r.kind), n.set(r.resourceKey, Object.freeze({
			kind: r.kind,
			handle: r.handle
		}));
	}
	let r = Object.freeze([...n.keys()].sort());
	return Object.freeze({
		keys: r,
		resolve(t, r) {
			let i = e.resolve(t, r), a = n.get(t);
			if (!a) throw Error(`Missing paint resource handle for ${t}: expected ${r}`);
			if (a.kind !== r) throw Error(`Paint resource kind mismatch for ${t}: expected ${r}, got ${a.kind}`);
			return Object.freeze({
				descriptor: i,
				handle: a.handle
			});
		}
	});
}
function Jp(e, t) {
	return qp(e, e.descriptors.map((e) => {
		if (e.kind === "chart") return {
			resourceKey: e.resourceKey,
			kind: e.kind,
			handle: null
		};
		let n = t(e);
		if (n == null) throw Error(`Missing ${e.kind} paint handle for ${e.resourceKey}`);
		return {
			resourceKey: e.resourceKey,
			kind: e.kind,
			handle: n
		};
	}));
}
//#endregion
//#region packages/docx/src/paint/canonical-resource-handlers.ts
function Yp(e) {
	if (!Gp(e.handle)) {
		if (e.handle === void 0 || e.handle === null) throw Error(`Missing ${e.descriptor.kind} drawable for ${e.descriptor.resourceKey}`);
		return e.handle;
	}
}
function Xp(e, t, n) {
	let i = e.descriptor, a = Yp(e), o = Gp(e.handle) ? e.handle.placeholder : void 0;
	if (!a && !o) return;
	let s = (e, s) => {
		a ? Le(n, a, i.srcRect, e, s, t.widthPt, t.heightPt) : o === "tiff" && r(n, "tiff", {
			x: e,
			y: s,
			width: t.widthPt,
			height: t.heightPt
		});
	}, c = i.alpha !== void 0 && i.alpha < 1;
	c && (n.save(), n.globalAlpha *= i.alpha);
	let l = i.rotation ?? 0;
	l === 0 && !i.flipH && !i.flipV ? s(t.xPt, t.yPt) : (n.save(), n.translate(t.xPt + t.widthPt / 2, t.yPt + t.heightPt / 2), n.rotate(l * Math.PI / 180), n.scale(i.flipH ? -1 : 1, i.flipV ? -1 : 1), s(-t.widthPt / 2, -t.heightPt / 2), n.restore()), c && n.restore();
}
function Zp(e, t, n) {
	let i = Yp(e);
	if (!i) {
		Gp(e.handle) && e.handle.placeholder === "tiff" && r(n, "tiff", {
			x: t.xPt,
			y: t.yPt,
			width: t.widthPt,
			height: t.heightPt
		});
		return;
	}
	n.drawImage(i, t.xPt, t.yPt, t.widthPt, t.heightPt);
}
function Qp(e, t, n, r) {
	return Object.freeze({
		image(e, t, n) {
			Xp(e, t, n);
		},
		chart(i, a, o) {
			Xe(o, i.descriptor.model, {
				x: a.xPt,
				y: a.yPt,
				w: a.widthPt,
				h: a.heightPt
			}, 1, 0, e, t, n, r);
		},
		math(e, t, n) {
			Zp(e, t, n);
		},
		"picture-bullet"(e, t, n) {
			Zp(e, t, n);
		}
	});
}
var $p = Qp(), em = /* @__PURE__ */ new WeakMap();
function tm(e) {
	em.set(e, (em.get(e) ?? 0) + 1);
}
function nm(e, t) {
	return (t ?? e.geometry.widthPt * 1.3333333333333333) / e.geometry.widthPt;
}
function rm(e) {
	if (j(e)) return e.ownerDocument ?? (typeof document > "u" ? null : document);
	let t = e.ownerDocument, n = t?.defaultView?.HTMLCanvasElement;
	return n && e instanceof n ? t : null;
}
function im(e) {
	return rm(e) !== null;
}
function am(e, t) {
	let n = rm(e);
	if (!t || n && e.isConnected) return { canvas: e };
	let r = n ?? (typeof document > "u" ? void 0 : document);
	if (!r) throw Error("OpenType vertical glyph paint requires an element-backed document surface");
	let i = r.body ?? r.documentElement;
	if (!i) throw Error("OpenType vertical glyph paint requires an attached document surface");
	let a = r.createElement("canvas");
	return a.setAttribute("aria-hidden", "true"), Object.assign(a.style, {
		position: "fixed",
		left: "-99999px",
		top: "0",
		opacity: "0",
		pointerEvents: "none"
	}), i.appendChild(a), {
		canvas: a,
		release: () => a.remove()
	};
}
async function om(e, t, n, r) {
	let i = (em.get(n) ?? 0) + 1;
	em.set(n, i);
	let a = () => em.get(n) !== i, o = t.layers.capabilities.resourceKeys, s = new Map(r.registry.descriptors.map((e) => [e.resourceKey, e])), c = o ? o.map((e) => {
		let t = s.get(e);
		if (!t) throw Error(`Missing retained paint resource descriptor: ${e}`);
		return t;
	}) : r.registry.descriptors, l = c.some((e) => e.kind === "image" || e.kind === "picture-bullet" || e.kind === "chart" && He(e.model).length > 0), u = () => a() ? Promise.resolve() : sm(e, t, n, r, c, a);
	return r.fetchImage && l ? Se(r.fetchImage, r.imageResources, u) : u();
}
async function sm(t, n, r, i, a, o) {
	let s;
	try {
		let c = i.dpr ?? e(), l = am(r, !i.parseError && n.layers.capabilities.requiresElementBackedVerticalGlyphPaint), u = l.canvas;
		s = l.release;
		let d = u.getContext("2d");
		if (!d) throw Error("2D canvas is unavailable for DOCX paint");
		let f = nm(n, i.width), p = n.geometry.widthPt * f, m = n.geometry.heightPt * f, h = We(p * c, m * c), g = h.clamped ? c * h.scale : c;
		if (r.width = h.width, r.height = h.height, u !== r && (u.width = h.width, u.height = h.height), im(r) && (r.style.width = `${p}px`, r.style.height = `${m}px`, r.style.display || (r.style.display = "block")), im(u) && u !== r && (u.style.width = `${p}px`, u.style.height = `${m}px`), d.scale(g, g), d.fillStyle = "#ffffff", d.fillRect(0, 0, p, m), i.parseError) {
			await Hp(t, 0, r, {
				scale: f,
				dpr: g
			});
			return;
		}
		let _;
		try {
			_ = await tp(a, i.rasterPaintOccurrences, i.fetchImage, i.tiff, f * g, i.svgDecoder, i.imageResources);
		} catch (e) {
			if (o()) return;
			throw e;
		}
		if (o()) return;
		let v = /* @__PURE__ */ new Map();
		if (i.fetchImage) {
			let e = i.fetchImage, t = /* @__PURE__ */ new Map();
			for (let e of i.rasterPaintOccurrences) {
				if (e.resourceKind !== "chart") continue;
				let n = t.get(e.resourceKey) ?? [];
				t.has(e.resourceKey) || t.set(e.resourceKey, n), n.push(e);
			}
			let n = [];
			for (let e of a) if (e.kind === "chart") for (let r of t.get(e.resourceKey) ?? []) {
				if (!Number.isFinite(r.widthPt) || r.widthPt <= 0 || !Number.isFinite(r.heightPt) || r.heightPt <= 0) continue;
				let t = {
					widthPt: r.widthPt,
					heightPt: r.heightPt,
					targetWidthPx: r.widthPt * f * g,
					targetHeightPx: r.heightPt * f * g
				}, i = [], a = !0;
				for (let n of He(e.model)) {
					let e = Ve(n, t);
					if (!e) {
						a = !1;
						break;
					}
					i.push({
						usage: n,
						size: e
					});
				}
				a && n.push({
					descriptor: e,
					frame: t,
					usages: i
				});
			}
			let r = /* @__PURE__ */ new Map();
			for (let e of Ue(n.map(({ descriptor: e }) => e.model), (e, t) => Ve(e, n[t].frame) != null)) {
				let { fill: t } = e, n = Ke(t);
				r.has(n) || r.set(n, {
					fill: t,
					widthPt: 0,
					heightPt: 0,
					preserveNaturalSize: e.preserveNaturalSize,
					hasSourceCrop: e.hasSourceCrop
				});
			}
			for (let { usages: e } of n) for (let { usage: t, size: n } of e) {
				let { fill: e } = t, i = Ke(e), a = r.get(i);
				if (!a) continue;
				let o = a.preserveNaturalSize || t.preserveNaturalSize;
				r.set(i, {
					...a,
					widthPt: Math.max(a.widthPt, n.widthPt),
					heightPt: Math.max(a.heightPt, n.heightPt),
					targetWidthPx: o ? void 0 : Math.max(a.targetWidthPx ?? 0, n.targetWidthPx ?? 0) || void 0,
					targetHeightPx: o ? void 0 : Math.max(a.targetHeightPx ?? 0, n.targetHeightPx ?? 0) || void 0,
					preserveNaturalSize: o,
					hasSourceCrop: a.hasSourceCrop || t.hasSourceCrop
				});
			}
			await Promise.all([...r].map(async ([t, n]) => {
				if (_.has(t)) {
					let e = _.get(t);
					v.set(t, y(e, "tiff") ? null : e ?? null);
					return;
				}
				let { fill: r, widthPt: a, heightPt: o, targetWidthPx: s, targetHeightPx: c, hasSourceCrop: l } = n, u = s && c ? {
					targetWidthPx: s,
					targetHeightPx: c
				} : void 0;
				try {
					let n = (t) => i.svgDecoder ? _e(t, e, {
						...u ?? {},
						workerDecoder: i.svgDecoder
					}) : _e(t, e), s = () => r.mimeType === "image/svg+xml" ? r.duotone ? Promise.resolve(null) : n(r.imagePath) : $f(r.imagePath, r.mimeType, void 0, e, a, o, r.duotone, !0, i.tiff, u), c, d = {
						svgImagePath: r.svgImagePath,
						srcRect: l ? !0 : null
					};
					if (!r.duotone && F(d)) try {
						c = await n(d.svgImagePath);
					} catch {
						c = await s();
					}
					else c = await s();
					v.set(t, c);
				} catch (e) {
					if (y(e, "tiff")) {
						v.set(t, null);
						return;
					}
					if (Ye(e) || Qe(e)) throw e;
					v.set(t, null);
				}
			}));
		}
		if (o()) return;
		let b = Fp(Jp(i.registry, (e) => {
			if (e.kind === "math") return i.privateResources?.keys.includes(e.resourceKey) ? i.privateResources.resolve(e.resourceKey) : Wp("optional math renderer unavailable");
			if (e.kind === "image" || e.kind === "picture-bullet") {
				let t = _.get(Jf(e.partPath, e.colorReplaceFrom, e.duotone));
				return y(t, "tiff") ? Wp("optional TIFF codec unavailable", { placeholder: "tiff" }) : t ?? Wp(i.fetchImage ? "unsupported image format produced no drawable output" : "image byte source unavailable");
			}
		}), i.threeD || i.regionMap || i.chartEx || v.size > 0 ? Qp(i.threeD, i.regionMap, (e) => v.get(Ke(e)), i.chartEx) : $p);
		d.save();
		try {
			d.scale(f, f), Vp(n, {
				ctx: d,
				scale: f,
				dpr: g,
				resources: b,
				documentDefaultTextColor: i.defaultTextColor ?? "#000000",
				defaultTextColor: i.defaultTextColor ?? "#000000"
			});
		} finally {
			d.restore();
		}
		if (u !== r) {
			if (o()) return;
			let e = r.getContext("2d");
			if (!e) throw Error("2D canvas is unavailable for DOCX paint projection");
			e.drawImage(u, 0, 0);
		}
		if (i.onTextRun) for (let e of i.textRuns) i.onTextRun(e);
	} finally {
		s?.();
	}
}
//#endregion
//#region packages/docx/src/layout/body-layout-kernel.ts
var cm = class extends Error {
	code = "NOTE_CAPACITY_EXCEEDED";
	constructor(e, t, n) {
		super(`${e} story exceeds ${n} on page ${t}`), this.kind = e, this.pageIndex = t, this.containerId = n, this.name = "NoteCapacityExceededError";
	}
};
//#endregion
//#region packages/docx/src/layout/body-pagination.ts
function lm(e) {
	return Object.freeze({
		...e,
		pages: Object.freeze([...e.pages])
	});
}
function um(e) {
	let { kind: t, region: n, ...r } = e, i = Cd(r);
	if (n && (i = wd(i, n)), t === "content" && i.sectionRegions.length === 0) throw RangeError("A content page draft requires an initial section region");
	if (t === "parity-blank" && i.sectionRegions.length !== 0) throw RangeError("A parity blank cannot retain a section region");
	return Object.freeze({
		kind: t,
		accumulator: i
	});
}
function dm(e, t) {
	if (t.kind !== "content" || t.accumulator.pageIndex !== e.pageIndex) throw Error("The initial body page must be owned by the active flow");
	return lm({
		flow: e,
		pages: [t],
		footnoteReservePt: 0,
		balanceTargetPt: null
	});
}
function fm(e, t) {
	if (t !== null && (!Number.isFinite(t) || t < 0)) throw RangeError("A body balance target must be finite and non-negative");
	return lm({
		...e,
		balanceTargetPt: t
	});
}
function pm(e, t) {
	if (!Number.isFinite(t) || t < 0) throw RangeError("A footnote reserve increment must be finite and non-negative");
	return t === 0 ? e : lm({
		...e,
		footnoteReservePt: e.footnoteReservePt + t
	});
}
function mm(e, t, n) {
	let r = [...e.pages], i = t.state, a = !1;
	for (let e of t.events) {
		if (e.type === "place") throw Error("Occurrence acceptance owns place events");
		if (e.type !== "next-column") {
			if (e.type === "next-page") {
				if (e.parityBlank) r.push(n.openParityBlankPage(e));
				else {
					let a = n.openContentPage(e, t.state);
					r.push(a.page), i = a.flow;
				}
				a = !0;
				continue;
			}
			if (!a) {
				let t = r.at(-1);
				if (!t || t.kind !== "content") throw Error("A continuous section requires an active content page");
				r[r.length - 1] = n.openSamePageSectionRegion(t, e, i);
			}
		}
	}
	let o = r.at(-1);
	if (!o || o.kind !== "content" || o.accumulator.pageIndex !== i.pageIndex) throw Error("A page transition must end on the active content page");
	return lm({
		...e,
		flow: i,
		pages: r,
		footnoteReservePt: a ? 0 : e.footnoteReservePt,
		balanceTargetPt: a ? null : e.balanceTargetPt
	});
}
//#endregion
//#region packages/docx/src/layout/retained-geometry-translation.ts
function hm(e) {
	if (e.length === 0) return null;
	let t = Math.min(...e.map((e) => e.xPt)), n = Math.min(...e.map((e) => e.yPt)), r = Math.max(...e.map((e) => e.xPt + e.widthPt)), i = Math.max(...e.map((e) => e.yPt + e.heightPt));
	return {
		xPt: t,
		yPt: n,
		widthPt: r - t,
		heightPt: i - n
	};
}
function gm(e) {
	return {
		x: !e.horzSpecified || e.horzAnchor !== "page" && e.horzAnchor !== "margin",
		y: e.vertAnchor !== "page" && e.vertAnchor !== "margin"
	};
}
function _m(e, t) {
	return {
		...e,
		xPt: e.xPt + t.xPt,
		yPt: e.yPt + t.yPt
	};
}
function Y(e, t) {
	return {
		...e,
		xPt: e.xPt + t.xPt,
		yPt: e.yPt + t.yPt
	};
}
function vm(e, t) {
	return {
		...e,
		from: _m(e.from, t),
		to: _m(e.to, t)
	};
}
function ym(e, t) {
	return e.kind === "rect" ? {
		...e,
		rect: Y(e.rect, t)
	} : {
		...e,
		points: e.points.map((e) => _m(e, t))
	};
}
function bm(e, t) {
	return e.kind === "noop" ? e : e.kind === "drawingml-shape" || e.kind === "drawingml-image-fill" ? {
		...e,
		plan: {
			...e.plan,
			rect: {
				...e.plan.rect,
				x: e.plan.rect.x + t.xPt,
				y: e.plan.rect.y + t.yPt
			}
		}
	} : {
		...e,
		rect: Y(e.rect, t)
	};
}
function xm(e, t) {
	let n = e.orientation === "upright-physical" ? {
		xPt: 0,
		yPt: 0
	} : t;
	return {
		...e,
		flowBounds: Y(e.flowBounds, t),
		inkBounds: Y(e.inkBounds, t),
		...e.clipBounds ? { clipBounds: Y(e.clipBounds, t) } : {},
		...e.transform ? { transform: {
			...e.transform,
			e: e.transform.e + t.xPt,
			f: e.transform.f + t.yPt
		} } : {},
		...e.clip ? { clip: ym(e.clip, t) } : {},
		commands: e.commands.map((e) => bm(e, n))
	};
}
function Sm(e, t, n) {
	let r = `${t.xPt}\u0000${t.yPt}`, i = n.drawingMemo.get(e);
	if (i) {
		if (i.key !== r) throw Error("incompatible projection ownership");
		return i.value;
	}
	let a = xm(e, t);
	return n.drawingMemo.set(e, {
		key: r,
		value: a
	}), a;
}
function Cm(e, t, n) {
	return e.kind === "text" ? {
		...e,
		origin: _m(e.origin, t),
		bounds: Y(e.bounds, t),
		decorations: e.decorations.map((e) => ({
			...e,
			from: _m(e.from, t),
			to: _m(e.to, t),
			...e.path ? { path: e.path.map((e) => _m(e, t)) } : {}
		})),
		...e.highlightFragments ? { highlightFragments: e.highlightFragments.map((e) => ({
			...e,
			rect: Y(e.rect, t)
		})) } : {},
		...e.ruby ? { ruby: {
			...e.ruby,
			paintOps: e.ruby.paintOps.map((e) => ({
				...e,
				origin: _m(e.origin, t)
			}))
		} } : {},
		...e.emphasis ? { emphasis: {
			...e.emphasis,
			...e.emphasis.glyphs ? { glyphs: e.emphasis.glyphs.map((e) => ({
				...e,
				origin: _m(e.origin, t)
			})) } : {},
			...e.emphasis.paths ? { paths: e.emphasis.paths.map((e) => ({
				...e,
				points: e.points.map((e) => _m(e, t))
			})) } : {}
		} } : {},
		...e.runBorderFragments ? { runBorderFragments: e.runBorderFragments.map((e) => vm(e, t)) } : {}
	} : e.kind === "anchor-host" ? {
		...e,
		bounds: Y(e.bounds, t),
		baselinePt: e.baselinePt + t.yPt
	} : e.kind === "drawing" ? {
		...e,
		bounds: Y(e.bounds, n?.get(e.drawingId) ?? t)
	} : e.kind === "tab" && (e.leaderGlyphs || e.decorations) ? {
		...e,
		...e.bounds ? { bounds: Y(e.bounds, t) } : {},
		...e.leaderGlyphs ? { leaderGlyphs: e.leaderGlyphs.map((e) => ({
			...e,
			origin: _m(e.origin, t)
		})) } : {},
		...e.decorations ? { decorations: e.decorations.map((e) => ({
			...e,
			from: _m(e.from, t),
			to: _m(e.to, t),
			...e.path ? { path: e.path.map((e) => _m(e, t)) } : {}
		})) } : {}
	} : e.bounds ? {
		...e,
		bounds: Y(e.bounds, t)
	} : e;
}
function wm(e, t, n) {
	return {
		...e,
		bounds: Y(e.bounds, t),
		baselinePt: e.baselinePt + t.yPt,
		placements: e.placements.map((e) => Cm(e, t, n)),
		...e.barTabRules ? { barTabRules: e.barTabRules.map((e) => ({
			...e,
			from: _m(e.from, t),
			to: _m(e.to, t)
		})) } : {}
	};
}
function Tm(e, t) {
	let n = e.axes[t];
	return n.status === "resolved" && [
		"page",
		"margin",
		"leftMargin",
		"rightMargin",
		"topMargin",
		"bottomMargin"
	].includes(n.referenceFrame);
}
function Em(e, t) {
	let n = Tm(e, "horizontal") ? 0 : t.xPt, r = Tm(e, "vertical") ? 0 : t.yPt, i = {
		xPt: n,
		yPt: r
	}, a = {
		horizontal: e.axes.horizontal.status === "resolved" ? {
			...e.axes.horizontal,
			baseStartPt: e.axes.horizontal.baseStartPt + n,
			baseEndPt: e.axes.horizontal.baseEndPt + n,
			resolvedOriginPt: e.axes.horizontal.resolvedOriginPt + n
		} : e.axes.horizontal,
		vertical: e.axes.vertical.status === "resolved" ? {
			...e.axes.vertical,
			baseStartPt: e.axes.vertical.baseStartPt + r,
			baseEndPt: e.axes.vertical.baseEndPt + r,
			resolvedOriginPt: e.axes.vertical.resolvedOriginPt + r
		} : e.axes.vertical
	};
	return e.status === "unsupported" ? {
		...e,
		axes: a
	} : {
		...e,
		axes: a,
		geometry: {
			...e.geometry,
			objectFrame: Y(e.geometry.objectFrame, i),
			inkBounds: Y(e.geometry.inkBounds, i),
			wrapBounds: e.geometry.wrapBounds ? Y(e.geometry.wrapBounds, i) : null,
			wrap: {
				...e.geometry.wrap,
				polygon: e.geometry.wrap.polygon ? {
					...e.geometry.wrap.polygon,
					points: e.geometry.wrap.polygon.points.map((e) => _m(e, i))
				} : null
			}
		}
	};
}
function Dm(e, t) {
	return Om(e, t, {
		memo: /* @__PURE__ */ new WeakMap(),
		drawingMemo: /* @__PURE__ */ new WeakMap()
	});
}
function Om(e, t, n) {
	let r = `${t.xPt}\u0000${t.yPt}`, i = n.memo.get(e);
	if (i) {
		if (i.key !== r) throw Error("incompatible projection ownership");
		return i.value;
	}
	let a = new Map(e.drawings.flatMap((e) => e.anchorLayer ? [[e.anchorLayer.occurrenceId, e.anchorLayer]] : [])), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
	for (let n of e.drawings) {
		let e = {
			xPt: n.anchorLayer?.horizontalOwnership === "page" ? 0 : t.xPt,
			yPt: n.anchorLayer?.verticalOwnership === "page" ? 0 : t.yPt
		};
		s.set(n.id, e), n.textBoxIds?.forEach((t) => o.set(t, n.orientation === "upright-physical" ? {
			xPt: 0,
			yPt: 0
		} : e));
	}
	let c = e.drawings.map((e) => Sm(e, s.get(e.id) ?? t, n)), l = hm(c.filter((e) => e.anchorLayer?.cellContainment === !0).map((e) => e.flowBounds)), u = {
		...e,
		flowBounds: Y(e.flowBounds, t),
		inkBounds: Y(e.inkBounds, t),
		...e.clipBounds ? { clipBounds: Y(e.clipBounds, t) } : {},
		lines: e.lines.map((e) => wm(e, t, s)),
		borders: e.borders.map((e) => vm(e, t)),
		drawings: c,
		...l ? { cellContainmentBounds: l } : {},
		textBoxes: e.textBoxes.map((e) => Am(e, o.get(e.id) ?? t, n)),
		exclusions: e.exclusions.map((e) => {
			let n = e.anchorOccurrenceId ? a.get(e.anchorOccurrenceId) : void 0, r = {
				xPt: n?.horizontalOwnership === "page" ? 0 : t.xPt,
				yPt: e.verticalOwnership === "page" || n?.verticalOwnership === "page" ? 0 : t.yPt
			};
			return {
				...e,
				bounds: Y(e.bounds, r),
				polygon: e.polygon.map((e) => _m(e, r))
			};
		}),
		...e.anchorCollisions ? { anchorCollisions: e.anchorCollisions.map((e) => ({
			...e,
			bounds: Y(e.bounds, {
				xPt: e.horizontalOwnership === "page" ? 0 : t.xPt,
				yPt: e.verticalOwnership === "page" ? 0 : t.yPt
			})
		})) } : {},
		...e.anchorFrames ? { anchorFrames: e.anchorFrames.map((e) => Em(e, t)) } : {},
		...e.paragraphMark ? { paragraphMark: {
			...e.paragraphMark,
			bounds: Y(e.paragraphMark.bounds, t)
		} } : {},
		...e.lineNumbers ? { lineNumbers: e.lineNumbers.map((e) => ({
			...e,
			bounds: Y(e.bounds, t),
			paintOps: e.paintOps.map((e) => ({
				...e,
				origin: _m(e.origin, t)
			}))
		})) } : {}
	};
	return n.memo.set(e, {
		key: r,
		value: u
	}), u;
}
function km(e, t) {
	return Am(e, t, {
		memo: /* @__PURE__ */ new WeakMap(),
		drawingMemo: /* @__PURE__ */ new WeakMap()
	});
}
function Am(e, t, n) {
	let r = e.verticalMode === void 0;
	return {
		...e,
		flowBounds: Y(e.flowBounds, t),
		inkBounds: Y(e.inkBounds, t),
		...e.clipBounds ? { clipBounds: r ? Y(e.clipBounds, t) : e.clipBounds } : {},
		...e.contentBounds ? { contentBounds: r ? Y(e.contentBounds, t) : e.contentBounds } : {},
		transform: r ? e.transform : {
			...e.transform,
			e: e.transform.e + t.xPt,
			f: e.transform.f + t.yPt
		},
		story: r ? {
			...e.story,
			flowBounds: Y(e.story.flowBounds, t),
			inkBounds: Y(e.story.inkBounds, t),
			...e.story.clipBounds ? { clipBounds: Y(e.story.clipBounds, t) } : {},
			blocks: e.story.blocks.map((e) => {
				if (e.kind === "paragraph") return Om(e, t, n);
				if (e.kind === "table") return Mm(e, t);
				throw Error(`Text-box story contains unsupported retained node: ${e.kind}`);
			})
		} : e.story
	};
}
function jm(e, t) {
	return Dm(e, t);
}
function Mm(e, t) {
	return {
		...e,
		flowBounds: Y(e.flowBounds, t),
		inkBounds: Y(e.inkBounds, t),
		...e.clipBounds ? { clipBounds: Y(e.clipBounds, t) } : {},
		borders: e.borders.map((e) => vm(e, t)),
		...e.compoundBorderFrames ? { compoundBorderFrames: e.compoundBorderFrames.map((e) => ({
			...e,
			bounds: Y(e.bounds, t)
		})) } : {},
		rows: e.rows.map((e) => ({
			...e,
			flowBounds: Y(e.flowBounds, t),
			inkBounds: Y(e.inkBounds, t),
			...e.clipBounds ? { clipBounds: Y(e.clipBounds, t) } : {},
			cells: e.cells.map((e) => ({
				...e,
				flowBounds: Y(e.flowBounds, t),
				inkBounds: Y(e.inkBounds, t),
				...e.clipBounds ? { clipBounds: Y(e.clipBounds, t) } : {},
				contentBounds: Y(e.contentBounds, t),
				blocks: e.blocks
			}))
		}))
	};
}
//#endregion
//#region packages/docx/src/layout/occurrence-projection.ts
function Nm(e, t) {
	return `${e}/occurrence/${encodeURIComponent(t).replaceAll("%3A", ":")}`;
}
function Pm(e) {
	if (!Number.isFinite(e.xPt) || !Number.isFinite(e.yPt)) throw RangeError("body occurrence translation must be finite");
}
function Fm(e) {
	if (e.occurrenceId.length === 0) throw RangeError("occurrenceId must not be empty");
	if (e.destination.flowDomainId.length === 0) throw RangeError("flowDomainId must not be empty");
	Pm(e.destination.translation);
}
function Im(e, t) {
	let n = gm(e.positioning);
	return {
		xPt: n.x ? t.xPt : 0,
		yPt: n.y ? t.yPt : 0
	};
}
function Lm(e) {
	let t = /* @__PURE__ */ new WeakSet(), n = /* @__PURE__ */ new WeakSet(), r = (e) => {
		if (t.has(e)) throw TypeError("body occurrence layout graph must be acyclic");
		if (!n.has(e)) {
			if (t.add(e), e.kind === "paragraph") for (let t of e.textBoxes) for (let e of t.story.blocks) (e.kind === "paragraph" || e.kind === "table") && r(e);
			else {
				for (let t of e.rows) for (let e of t.cells) for (let t of e.blocks) r(t.layout);
				for (let t of e.floatingTables ?? []) r(t.child);
				for (let t of e.resolvedFloatingTables ?? []) r(t.source.child), r(t.child);
			}
			t.delete(e), n.add(e);
		}
	};
	r(e);
}
function Rm(e, t) {
	Lm(e);
	let n = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), i = (e) => `${e.xPt}\u0000${e.yPt}`, a = (e, t) => {
		let n = i(t), a = r.get(e);
		if (a) {
			if (a.key !== n) throw Error("incompatible projection ownership");
			return a.value;
		}
		let o = jm(e, t), s = Object.freeze({
			...o,
			...e.sectionFlowOwnership === void 0 ? {} : { sectionFlowOwnership: e.sectionFlowOwnership }
		});
		return r.set(e, {
			key: n,
			value: s
		}), s;
	}, o = (e, t) => {
		let r = i(t), a = n.get(e);
		if (a) {
			if (a.key !== r) throw Error("incompatible projection ownership");
			return a.value;
		}
		let s = {
			...Mm(e, t),
			...e.sectionFlowOwnership === void 0 ? {} : { sectionFlowOwnership: e.sectionFlowOwnership }
		};
		n.set(e, {
			key: r,
			value: s
		});
		let c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set();
		for (let n of e.resolvedFloatingTables ?? []) {
			let r = e.resolvedFloatingTableCoordinateSpace !== void 0;
			c.set(n.source, r ? {
				xPt: 0,
				yPt: 0
			} : Im(n.source, t)), r && l.add(n.source);
		}
		let u = /* @__PURE__ */ new Map(), d = (e) => {
			let n = u.get(e);
			if (n) return n;
			let r = c.get(e) ?? t, i = l.has(e) ? {
				xPt: 0,
				yPt: 0
			} : t, a = {
				...e,
				anchorBounds: Y(e.anchorBounds, i),
				...e.columnBounds ? { columnBounds: Y(e.columnBounds, i) } : {},
				child: o(e.child, r)
			};
			return u.set(e, a), a;
		}, f = (e.floatingTables ?? []).map(d), p = (e.resolvedFloatingTables ?? []).map((e) => {
			let n = d(e.source), r = c.get(e.source) ?? Im(e.source, t);
			return {
				...e,
				xPt: e.xPt + r.xPt,
				yPt: e.yPt + r.yPt,
				bounds: Y(e.bounds, r),
				exclusionBounds: Y(e.exclusionBounds, r),
				child: n.child,
				source: n
			};
		});
		return (e.floatingTables || e.resolvedFloatingTables) && Object.assign(s, {
			floatingTables: f,
			resolvedFloatingTables: p
		}), s;
	};
	return e.kind === "paragraph" ? a(e, t) : o(e, t);
}
function zm(e, t) {
	return Pm(t), Rm(e, t);
}
function Bm(e, t) {
	Fm(t);
	let n = Rm(e, t.destination.translation), r = encodeURIComponent(t.occurrenceId), i = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), l = (e) => `${t.occurrenceId}/node/${encodeURIComponent(e)}`, u = (e) => `${t.occurrenceId}/anchor/${encodeURIComponent(e)}`, d = (e) => Nm(t.occurrenceId, e), f = (e, n) => `${t.destination.flowDomainId}/occurrence/${r}/${e}/${encodeURIComponent(n)}`, p = (e) => e.kind === "drawing" ? {
		...e,
		drawingId: l(e.drawingId)
	} : e.kind === "anchor-host" && e.anchorOccurrenceId ? {
		...e,
		anchorOccurrenceId: u(e.anchorOccurrenceId)
	} : e, m = (e, t) => {
		let n = o.get(e);
		if (n) {
			if (n.domain !== t) throw Error("incompatible projection ownership");
			return n.value;
		}
		if (e.anchorLayer) {
			let t = s.get(e.anchorLayer.occurrenceId);
			if (t && t !== e) throw Error("duplicate anchor occurrence owner");
			s.set(e.anchorLayer.occurrenceId, e);
		}
		let r = {
			...e,
			id: l(e.id),
			flowDomainId: t,
			...e.textBoxIds ? { textBoxIds: e.textBoxIds.map(l) } : {},
			...e.anchorLayer ? { anchorLayer: {
				...e.anchorLayer,
				occurrenceId: u(e.anchorLayer.occurrenceId),
				acquisitionOccurrenceId: e.anchorLayer.acquisitionOccurrenceId ?? e.anchorLayer.occurrenceId
			} } : {}
		};
		return o.set(e, {
			domain: t,
			value: r
		}), r;
	}, h = (e) => {
		let t = f("textbox", e.id);
		return {
			...e,
			id: l(e.id),
			flowDomainId: t,
			story: {
				...e.story,
				blocks: e.story.blocks.map((e) => {
					if (e.kind === "paragraph") return g(e, t);
					if (e.kind === "table") return b(e, t);
					throw Error(`Text-box story contains unsupported retained node: ${e.kind}`);
				})
			}
		};
	}, g = (e, t) => {
		let n = a.get(e);
		if (n) {
			if (n.domain !== t) throw Error("incompatible projection ownership");
			return n.value;
		}
		let r = {
			...e,
			id: l(e.id),
			flowDomainId: t,
			lines: e.lines.map((e) => ({
				...e,
				placements: e.placements.map(p)
			})),
			drawings: e.drawings.map((e) => m(e, t)),
			textBoxes: e.textBoxes.map(h),
			exclusions: e.exclusions.map((e) => ({
				...e,
				id: e.verticalOwnership === "page" && !e.anchorOccurrenceId ? e.id : l(e.id),
				...e.anchorOccurrenceId ? { anchorOccurrenceId: u(e.anchorOccurrenceId) } : {}
			})),
			...e.anchorCollisions ? { anchorCollisions: e.anchorCollisions.map((e) => ({
				...e,
				occurrenceId: u(e.occurrenceId)
			})) } : {},
			...e.anchorFrames ? { anchorFrames: e.anchorFrames.map((e) => ({
				...e,
				occurrenceId: u(e.occurrenceId)
			})) } : {}
		};
		return a.set(e, {
			domain: t,
			value: r
		}), r;
	}, _ = (e) => {
		let t = f("cell", e.id);
		return {
			...e,
			id: l(e.id),
			flowDomainId: t,
			blocks: e.blocks.map((e) => ({
				...e,
				layout: x(e.layout, t)
			}))
		};
	}, v = (e, t) => ({
		...e,
		id: l(e.id),
		flowDomainId: t,
		..."occurrenceId" in e && typeof e.occurrenceId == "string" ? { occurrenceId: d(e.occurrenceId) } : {},
		cells: e.cells.map(_)
	}), y = (e) => {
		let t = f("cell", e.hostCellId);
		return {
			...e,
			occurrenceId: d(e.occurrenceId),
			hostCellId: l(e.hostCellId),
			tableId: l(e.tableId),
			child: b(e.child, t)
		};
	}, b = (e, t) => {
		let n = i.get(e);
		if (n) {
			if (n.domain !== t) throw Error("incompatible projection ownership");
			return n.value;
		}
		let r = {
			...e,
			id: l(e.id),
			flowDomainId: t,
			rows: e.rows.map((e) => v(e, t))
		};
		i.set(e, {
			domain: t,
			value: r
		});
		let a = /* @__PURE__ */ new Map(), o = (e) => {
			let t = a.get(e);
			if (t) return t;
			let n = c.get(e.occurrenceId);
			if (n && n !== e) throw Error("duplicate floating placement occurrence owner");
			c.set(e.occurrenceId, e);
			let r = y(e);
			return a.set(e, r), r;
		}, s = (e.floatingTables ?? []).map(o), u = (e.resolvedFloatingTables ?? []).map((e) => {
			let t = o(e.source);
			return {
				...e,
				occurrenceId: d(e.occurrenceId),
				child: t.child,
				source: t
			};
		});
		return (e.floatingTables || e.resolvedFloatingTables) && Object.assign(r, {
			floatingTables: s,
			resolvedFloatingTables: u
		}), r;
	};
	function x(e, t) {
		return e.kind === "paragraph" ? g(e, t) : b(e, t);
	}
	let S = V(x(n, t.destination.flowDomainId), "DOCX body occurrence projection");
	if (S.kind !== "table" || e.kind !== "table") return S;
	let C = Object.isFrozen(e.columnWidthsPt) ? e.columnWidthsPt : Object.freeze([...e.columnWidthsPt]);
	return Object.freeze({
		...S,
		columnWidthsPt: C
	});
}
//#endregion
//#region packages/docx/src/layout/paginator.ts
var Vm = class extends Error {
	code = "NEXT_COLUMN_DESTINATION_UNAVAILABLE";
	constructor(e, t, n, r) {
		super(`nextColumn requires a following column on the current page, but column ${e + 1} is unavailable (outgoing columns: ${t}, incoming columns: ${n}, reason: ${r})`), this.outgoingColumnIndex = e, this.outgoingColumnCount = t, this.incomingColumnCount = n, this.reason = r, this.name = "UnsupportedPageFlowTransitionError";
	}
};
function Hm(e, t) {
	return e.sectionBidi ? [...t].reverse() : [...t];
}
function Um(e) {
	let t = Hm(e.section, e.columnSubset);
	return t[t.indexOf(e.columnIndex) + 1];
}
function Wm(e, t = {}) {
	let n = Hu(e), r = Uu(e), i = t.pageContentStartBlockPt ?? n, a = t.pageContentEndBlockPt ?? r, o = t.regionStartBlockPt ?? i, s = t.regionEndBlockPt ?? a, c = t.cursorBlockPt ?? o, l = t.deepestColumnBlockPt ?? c, u = t.pageIndex ?? 0, d = Object.freeze([...t.columnSubset ?? e.columns.map((e, t) => t)]), f = Hm(e, d), p = t.columnIndex ?? f[0] ?? -1;
	if (!Number.isInteger(u) || u < 0) throw RangeError("Page index must be a non-negative integer");
	if (!Number.isInteger(p) || p < 0 || p >= e.columns.length) throw RangeError("Column index must identify a column in the active section");
	if (d.length === 0 || d.some((t, n) => !Number.isInteger(t) || t < 0 || t >= e.columns.length || n > 0 && t <= d[n - 1]) || !d.includes(p)) throw RangeError("Column subset must be ordered, unique, and contain the active column");
	if (![
		i,
		a,
		o,
		s,
		c,
		l
	].every(Number.isFinite)) throw RangeError("Page-flow cursors and bounds must be finite");
	if (i > o || o > s || s > a || o > c || c > s || c > l) throw RangeError("Page-flow bounds must contain the region and live cursor");
	return Object.freeze({
		pageIndex: u,
		columnIndex: p,
		pageHasContent: t.pageHasContent ?? !1,
		cursorBlockPt: c,
		pageContentStartBlockPt: i,
		pageContentEndBlockPt: a,
		regionStartBlockPt: o,
		regionEndBlockPt: s,
		columnSubset: d,
		deepestColumnBlockPt: l,
		section: e
	});
}
function Gm(e, t) {
	return Object.freeze({
		state: e,
		events: Object.freeze(t.map((e) => Object.freeze({ ...e })))
	});
}
function Km(e, t, n) {
	if (!Number.isFinite(n) || n < 0) throw RangeError("A flow node charge must be a finite non-negative value");
	let r = e.cursorBlockPt, i = r + n;
	return Gm(Object.freeze({
		...e,
		pageHasContent: !0,
		cursorBlockPt: i,
		deepestColumnBlockPt: Math.max(e.deepestColumnBlockPt, i)
	}), [{
		type: "place",
		node: t,
		blockStartPt: r,
		blockEndPt: i
	}]);
}
function qm(e, t) {
	let n = Math.max(e.deepestColumnBlockPt, e.cursorBlockPt), r = Um(e);
	if (r !== void 0) return Gm(Object.freeze({
		...e,
		columnIndex: r,
		cursorBlockPt: e.regionStartBlockPt,
		deepestColumnBlockPt: n
	}), [{ type: "next-column" }]);
	let i = e.pageIndex + 1;
	return Gm(Wm(e.section, { pageIndex: i }), [{
		type: "next-page",
		reason: t,
		pageIndex: i,
		sectionOccurrenceId: e.section.sectionOccurrenceId,
		parityBlank: !1
	}]);
}
function Jm(e, t) {
	return e.kind === t.kind && e.linePitchPt === t.linePitchPt && e.charSpacePt === t.charSpacePt;
}
function Ym(e, t) {
	return e.xPt === t.xPt && e.yPt === t.yPt && e.widthPt === t.widthPt && e.heightPt === t.heightPt;
}
function Xm(e, t) {
	return e.xPt < t.xPt + t.widthPt && t.xPt < e.xPt + e.widthPt && e.yPt < t.yPt + t.heightPt && t.yPt < e.yPt + e.heightPt;
}
function Zm(e, t, n) {
	let r = (n) => {
		throw new Vm(e.columnIndex, e.section.columns.length, t.columns.length, n);
	}, i = mi(e.section.textDirection), a = mi(t.textDirection);
	i !== a && r("writing-mode");
	let o = bi({
		widthPt: e.section.geometry.pageWidth,
		heightPt: e.section.geometry.pageHeight
	}, i), s = bi({
		widthPt: t.geometry.pageWidth,
		heightPt: t.geometry.pageHeight
	}, a);
	(o.widthPt !== s.widthPt || o.heightPt !== s.heightPt) && r("page-extent");
	let c = n.incomingPageContentStartBlockPt ?? Hu(t), l = n.incomingPageContentEndBlockPt ?? Uu(t);
	(c !== e.pageContentStartBlockPt || l !== e.pageContentEndBlockPt) && r("block-band"), Jm(e.section.grid, t.grid) || r("grid");
	let u = Hm(e.section, e.columnSubset), d = u.indexOf(e.columnIndex), f = u[d + 1];
	if (f === void 0) throw Error("nextColumn destination resolution requires a same-page successor");
	let p = Ei(i, o), m = e.section.columns[f], h = wi(p.logicalToPhysical, {
		xPt: m.xPt,
		yPt: e.regionStartBlockPt,
		widthPt: m.wPt,
		heightPt: e.regionEndBlockPt - e.regionStartBlockPt
	}), g = t.columns.findIndex((t) => Ym(h, wi(p.logicalToPhysical, {
		xPt: t.xPt,
		yPt: e.regionStartBlockPt,
		widthPt: t.wPt,
		heightPt: e.regionEndBlockPt - e.regionStartBlockPt
	})));
	g < 0 && r("physical-column");
	let _ = Hm(t, t.columns.map((e, t) => t)), v = _.indexOf(g);
	v < 0 && r("physical-column");
	let y = Object.freeze(_.slice(v).sort((e, t) => e - t)), b = Object.freeze(u.slice(0, d + 1).sort((e, t) => e - t)), x = (t, n) => {
		let r = t.columns[n];
		return wi(p.logicalToPhysical, {
			xPt: r.xPt,
			yPt: e.regionStartBlockPt,
			widthPt: r.wPt,
			heightPt: e.regionEndBlockPt - e.regionStartBlockPt
		});
	}, S = b.map((t) => x(e.section, t));
	return y.some((e) => {
		let n = x(t, e);
		return S.some((e) => Xm(e, n));
	}) && r("physical-overlap"), Object.freeze({
		targetColumnIndex: g,
		targetColumnOrdinal: v,
		columnSubset: y,
		outgoingColumnSubset: b
	});
}
function Qm(e, t, n) {
	let r = e.pageIndex + 1;
	return Gm(Wm(t, { pageIndex: r }), [{
		type: "next-page",
		reason: n,
		pageIndex: r,
		sectionOccurrenceId: t.sectionOccurrenceId,
		parityBlank: !1
	}]);
}
function $m(e, t) {
	let n = e % 2 == 0;
	return t === "odd" ? n : !n;
}
function eh(e, t, n, r) {
	let i = e.pageIndex + 1, a = [];
	return r !== void 0 && !$m(i, r) && (a.push({
		type: "next-page",
		reason: "parity",
		pageIndex: i,
		sectionOccurrenceId: e.section.sectionOccurrenceId,
		parityBlank: !0
	}), i += 1), a.push({
		type: "next-page",
		reason: n,
		pageIndex: i,
		sectionOccurrenceId: t.sectionOccurrenceId,
		parityBlank: !1
	}), Gm(Wm(t, { pageIndex: i }), a);
}
function th(e, t, n) {
	return t === "lastRenderedPageBreak" ? Gm(e, []) : t === "column" ? qm(e, "explicit-break") : t === "pageBreakBefore" && !e.pageHasContent && e.columnIndex === Hm(e.section, e.columnSubset)[0] && e.cursorBlockPt === e.pageContentStartBlockPt ? Gm(e, []) : t === "page" ? eh(e, e.section, "explicit-break", n) : Qm(e, e.section, "page-break-before");
}
function nh(e, t, n, r = {}) {
	if (n === "continuous" && !r.hasFootnoteReferenceOnCurrentPage) {
		let n = e.section.columns.length > 1 ? Math.max(e.cursorBlockPt, e.deepestColumnBlockPt) : e.cursorBlockPt;
		return Gm(Wm(t, {
			pageIndex: e.pageIndex,
			pageContentStartBlockPt: e.pageContentStartBlockPt,
			pageContentEndBlockPt: e.pageContentEndBlockPt,
			cursorBlockPt: n,
			regionStartBlockPt: n,
			regionEndBlockPt: e.pageContentEndBlockPt,
			deepestColumnBlockPt: n,
			pageHasContent: e.pageHasContent
		}), [{
			type: "begin-section",
			placement: "same-page-block",
			section: t,
			targetColumnOrdinal: 0,
			columnSubset: t.columns.map((e, t) => t)
		}]);
	}
	if (n === "nextColumn") {
		if (Um(e) === void 0) {
			let n = Qm(e, t, "section-break");
			return Gm(n.state, [...n.events, {
				type: "begin-section",
				section: t
			}]);
		}
		let n = Zm(e, t, r);
		return Gm(Object.freeze({
			...e,
			columnIndex: n.targetColumnIndex,
			columnSubset: n.columnSubset,
			cursorBlockPt: e.regionStartBlockPt,
			deepestColumnBlockPt: Math.max(e.deepestColumnBlockPt, e.cursorBlockPt),
			section: t
		}), [{ type: "next-column" }, {
			type: "begin-section",
			placement: "same-page-column",
			section: t,
			targetColumnOrdinal: n.targetColumnOrdinal,
			columnSubset: n.columnSubset,
			outgoingColumnSubset: n.outgoingColumnSubset
		}]);
	}
	if (n === "continuous") {
		let n = Qm(e, t, "section-break");
		return Gm(n.state, [...n.events, {
			type: "begin-section",
			section: t
		}]);
	}
	let i = eh(e, t, "section-break", n === "oddPage" ? "odd" : n === "evenPage" ? "even" : void 0);
	return Gm(i.state, [...i.events, {
		type: "begin-section",
		section: t
	}]);
}
//#endregion
//#region packages/docx/src/line-fit-policy.ts
function rh(e, t, n, r) {
	let i = e, a = 0;
	for (let o = e + 1; o <= t; o++) {
		let e = r(o);
		if (!(e <= n)) break;
		i = o, a = e;
	}
	return {
		end: i,
		fitValue: a
	};
}
function ih(e) {
	return !e.widowControl || e.end >= e.totalLines ? { kind: "keep" } : e.totalLines - e.end === 1 && e.end - e.start >= 2 ? { kind: "dropLastLine" } : e.start === 0 && e.end - e.start === 1 && e.canRelocate ? { kind: "relocate" } : { kind: "keep" };
}
W({
	id: "word-terminal-column-break",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/pagination.test.ts#ignores a terminal last-column break before a hard page boundary"
	},
	description: "The established pagination regression contract does not materialize a column transition when no body flow content occurs before the next forced page or non-continuous section boundary."
}), W({
	id: "word-pre-break-anchor-paragraph",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/pagination.test.ts#does not push an anchor-only pre-break paragraph to a new page just for its empty mark"
	},
	description: "The established pagination regression contract keeps an anchor-only paragraph immediately before an authored page break in the pre-break flow region without charging its otherwise visible paragraph mark."
}), W({
	id: "word-pre-break-inline-drawing-group",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/pagination.test.ts#moves a preceding image with its pre-break callout when the pair only fits fresh"
	},
	description: "The established pagination regression contract relocates a preceding inline DrawingML resource with an immediately following host-owned anchor paragraph before an authored page break when the pair fits only in a fresh flow region."
}), W({
	id: "word-continuous-section-mark-spacing",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/body-layout-input.test.ts#projects mutually exclusive collapsed-mark and drop-previous-after roles"
	},
	description: "The retained body input projects the established continuous-section empty-mark spacing behavior into one mutually exclusive role before pagination."
}), W({
	id: "word-contextual-spacing-per-side",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/contextual-spacing-body-paint.test.ts#paints the adjudicated six-case gap table"
	},
	description: "For same-style adjacent paragraphs, contextualSpacing removes only the contribution owned by each toggling side; a current-only toggle preserves the previous paragraph spaceAfter contribution."
}), W({
	id: "word-empty-keep-next-bridge",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/body-paginator-production.test.ts#bridges an undecorated empty keepNext mark through the following paragraph"
	},
	description: "Word print pagination treats an undecorated empty keep-with-next paragraph as a bridge: the following paragraph is admitted completely with the first indivisible content of its successor."
}), W({
	id: "word-automatic-keep-next-start-spacing",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/body-paginator-production.test.ts#suppresses leading spacing when a $kind keepNext unit moves to an automatic page"
	},
	description: "When automatic overflow relocates a keep-with-next unit to a fresh physical page, suppress the leading paragraph space-before for that grouped relocation. Standalone authored hard page breaks use a separate rule."
}), W({
	id: "word-automatic-paragraph-top-spacing",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "automatic-paragraph-top-spacing",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "A controlled ordinary-text exact-line paragraph with before=6pt does not retain that before spacing when ordinary overflow moves the complete paragraph to a fresh physical page. A before=0pt paragraph defines the page-top control. Empty mark-only paragraphs retain authored before spacing in observed Word output. Image-only and mixed-object paragraphs are outside these controls, so the library conservatively retains their authored spacing. Table and float overflow, same-page columns, and paragraph continuations have separate ownership."
}), W({
	id: "word-standalone-hard-page-break-top-spacing",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "standalone-hard-page-break-top-spacing",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "Controlled before=0/6pt documents in compatibility modes 14 and 15 place the first paragraph after a standalone hard page break at the same page-top origin: its before spacing is suppressed. The first paragraph of a document or a new section retains before spacing. A pageBreakBefore paragraph differs by mode (retained in 14, suppressed in 15); compatibilityMode is not yet represented in the parser model. This rule applies only to parser-proven authored breaks, excluding synthetic Cover Pages breaks, parity section breaks, and inline breaks after visible content."
}), W({
	id: "word-trailing-space-after-fit-admission",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/paragraph-pagination.test.ts#admits final visible content when only authored spaceAfter crosses the region edge"
	},
	description: "Admit the final visible paragraph content at a flow-region edge when only its authored trailing space crosses the edge, while retaining that space for placement and paint."
}), W({
	id: "word-vertical-rl-final-line-baseline-admission",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "vertical-rl-final-line-baseline-admission",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "In a vertical-rl section, Word admits the final visible text column when its transformed baseline and retained visible ink remain inside the block-end edge even if the complete logical line box crosses that edge. The complete retained advance remains authoritative after admission."
}), W({
	id: "word-lowered-drop-cap-anchor-leading",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "lowered-drop-cap-anchor-leading",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "Word keeps the following anchor text below a baseline-lowered drop-cap glyph while preserving the drop cap exclusion height authored by framePr lines. ECMA-376 specifies those two inputs independently but does not prescribe this interaction."
});
function ah(e) {
	return Math.max(0, e);
}
function oh(e) {
	return e === "none";
}
function sh(e) {
	return Math.max(0, e.advancePt - Math.min(e.authoredSpaceAfterPt, e.retainedSpaceAfterPt));
}
function ch(e) {
	return e.origin.yPt + (e.inkBounds?.descentPt ?? 0);
}
function lh(e) {
	if (e.kind === "resource" || e.kind === "drawing") return e.bounds.yPt + e.bounds.heightPt;
	if (e.kind === "anchor-host") return null;
	if (e.kind === "tab") {
		let t = e.leaderGlyphs ?? [];
		return t.length > 0 ? Math.max(...t.map(ch)) : null;
	}
	let t = e.paintOps ?? [], n = t.length > 0 ? t.map((t) => e.origin.yPt + t.offset.yPt + (t.blockAxisInkBounds?.endPt ?? t.inkBounds?.descentPt ?? 0)) : [e.origin.yPt];
	for (let t of e.decorations) {
		let e = t.widthPt / 2;
		n.push(t.from.yPt + e, t.to.yPt + e);
		for (let r of t.path ?? []) n.push(r.yPt + e);
	}
	for (let t of e.highlightFragments ?? []) n.push(t.rect.yPt + t.rect.heightPt);
	for (let t of e.runBorderFragments ?? []) {
		let e = t.widthPt / 2;
		n.push(t.from.yPt + e, t.to.yPt + e);
	}
	for (let t of e.emphasis?.glyphs ?? []) n.push(ch(t));
	for (let t of e.ruby?.paintOps ?? []) n.push(ch(t));
	for (let t of e.emphasis?.paths ?? []) {
		let e = t.stroke === null ? 0 : t.strokeWidthPt / 2;
		for (let r of t.points) n.push(r.yPt + e);
	}
	return Math.max(...n);
}
function uh(e) {
	if (e.writingMode !== "vertical-rl" || e.logicalLineBoxExtentPt <= e.availableBlockExtentPt) return e.logicalLineBoxExtentPt;
	let t = e.paragraph.lines.at(-1);
	if (!t || t.placements.some((e) => e.kind === "text" && (e.paintOps ?? []).some((e) => e.glyphOrientation !== void 0 && e.blockAxisInkBounds === void 0))) return e.logicalLineBoxExtentPt;
	let n = t.placements.flatMap((e) => {
		let t = lh(e);
		return t === null ? [] : [t];
	});
	if (n.length === 0 || e.paragraph.shading) return e.logicalLineBoxExtentPt;
	for (let t of e.paragraph.borders) {
		let e = t.widthPt / 2;
		n.push(t.from.yPt + e, t.to.yPt + e);
	}
	if (e.paragraph.paragraphMark && !e.paragraph.paragraphMark.hidden) {
		let t = e.paragraph.paragraphMark.bounds;
		n.push(t.yPt + t.heightPt);
	}
	return Math.max(0, Math.max(...n) - e.paragraph.flowBounds.yPt);
}
function dh(e) {
	return e.keepNext && e.inkless && e.undecoratedMark;
}
function fh(e, t) {
	let n = e[t];
	if (n?.kind !== "body-block" || n.block.kind !== "paragraph") return;
	let r = e[t + 1], i = e[t + 2], a = n.block.inkless === !0 && r?.kind === "begin-section" && r.section.startType === "continuous";
	return a && n.block.spaceBeforePt === 0 ? "collapse-mark" : a ? "suppress-before" : n.block.inkless === !0 && r?.kind === "body-block" && r.block.kind === "paragraph" && r.block.inkless === !0 && r.block.spaceBeforePt === 0 && i?.kind === "begin-section" && i.section.startType === "continuous" ? "drop-previous-after" : void 0;
}
function ph(e) {
	return e.drawings.length > 0 && e.lines.every((e) => e.placements.every((e) => e.kind === "drawing" || e.kind === "anchor-host"));
}
function mh(e) {
	return e.lines.some((e) => e.placements.some((e) => (e.kind === "resource" && (e.resourceKind === "image" || e.resourceKind === "chart") || e.kind === "drawing") && e.advancePt > 0 && e.bounds !== void 0 && e.bounds.widthPt > 0 && e.bounds.heightPt > 0));
}
function hh(e, t) {
	if (!ph(e)) return null;
	let n = e.drawings.filter((e) => e.anchorLayer?.verticalOwnership === "host" && Number.isFinite(e.flowBounds.xPt) && Number.isFinite(e.flowBounds.yPt) && Number.isFinite(e.flowBounds.widthPt) && Number.isFinite(e.flowBounds.heightPt) && e.flowBounds.widthPt > 0 && e.flowBounds.heightPt > 0);
	if (n.length !== e.drawings.length) return null;
	let r = Math.max(...n.map((e) => e.flowBounds.yPt + e.flowBounds.heightPt));
	return Math.max(0, r - t);
}
function gh(e) {
	if (!ph(e)) return null;
	let { paragraphMark: t, ...n } = e;
	return Object.freeze({
		...n,
		advancePt: 0,
		flowBounds: Object.freeze({
			...e.flowBounds,
			heightPt: 0
		})
	});
}
function _h(e) {
	let t = /* @__PURE__ */ new Set(), n = !1;
	for (let r = e.length - 1; r >= 0; --r) {
		let i = e[r];
		if (i.kind === "body-block") {
			n = i.block.kind !== "paragraph" || !i.block.pageBreakBefore;
			continue;
		}
		if (i.kind === "adjacent-table-group") {
			n = !0;
			continue;
		}
		if (i.kind === "authored-break") {
			i.break === "column" ? n && t.add(r) : n = !1;
			continue;
		}
		i.kind === "begin-section" && i.section.startType !== "continuous" && (n = !1);
	}
	return t;
}
W({
	id: "word-classic-chart-space-frame",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "classic-chart-space-frame-style-matrix",
		application: "Microsoft Word",
		version: "16.112.4",
		platform: "macOS 26.6.2"
	},
	description: "For classic DOCX charts with omitted direct frame properties, the complete ST_Style 1..48 matrix uses 10pt rounded chart-space corners; omitted style and styles 1..40 use a 0.5pt #898989 outline, while styles 41..48 use no outline. Direct roundedCorners and line paint remain authoritative, followed by a linked chartStyle chartArea role."
}), W({
	id: "word-track-change-author-palette",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/compatibility.test.ts#pins the eight track-change author colors independently of author indexing"
	},
	description: "Use the established eight-color revision-author palette while keeping the renderer deterministic author-index policy outside this compatibility claim."
}), W({
	id: "word-track-change-decoration",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/compatibility.test.ts#maps visible track-change kinds to their revision decorations"
	},
	description: "When revision markup is visible, underline inserted text and strike through deleted text in the selected revision-author color."
}), W({
	id: "word-paragraph-shading-border-box",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/paragraph.test.ts#extends paragraph shading through visible border spacing"
	},
	description: "Extend paragraph shading through each visible paragraph-border spacing interval so the fill reaches the painted border box."
}), W({
	id: "word-auto-text-contrast-effective-background",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/cell-shading-auto-contrast.test.ts#paints a color-less run white inside a near-black cell"
	},
	description: "Resolve automatic or never-authored text color against the nearest effective run, paragraph, or cell background before applying the deterministic contrast picker."
}), W({
	id: "word-run-decoration-justified-advance",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/run-inline-formatting.test.ts#extends the border frame across justified inter-word slack"
	},
	description: "Extend run shading, borders, underline, and strike decoration through the justification pitch owned by that run, including widened spaces."
}), W({
	id: "word-snap-to-chars-terminal-underline",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "snap-to-chars-terminal-underline-boundaries",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "In the observed horizontal LTR snapToChars matrix, retain trailing character-cell slack in line advance while ending a terminal underline at the retained final-glyph ink extent. Authored trailing spaces remain content, and RTL/vertical text stays outside this rule."
}), W({
	id: "word-paragraph-border-flow-reservation",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/para-bottom-border-flow.test.ts#a bottom border drops the following paragraph by exactly space + width/2"
	},
	description: "Reserve a visible bottom paragraph border through its spacing interval and half stroke width so following flow begins below its painted outer edge."
});
var vh = Object.freeze([
	"#C00000",
	"#0070C0",
	"#00B050",
	"#7030A0",
	"#E97132",
	"#196B24",
	"#9E480E",
	"#525252"
]);
W({
	id: "word-track-change-bar",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/track-changes-markup-layout.test.ts#emits one margin change bar per line containing revision text in the markup view"
	},
	description: "In the markup view, draw a vertical change bar in the margin beside every line that contains tracked-change content, matching the Word reviewing-pane convention (an app convention; ECMA-376 defines no bar geometry)."
});
var yh = Object.freeze({
	underline: !1,
	strike: !1
}), bh = Object.freeze({
	underline: !0,
	strike: !1
}), xh = Object.freeze({
	underline: !1,
	strike: !0
});
function Sh(e) {
	return e === "insertion" || e === "moveTo" ? bh : e === "deletion" || e === "moveFrom" ? xh : yh;
}
//#endregion
//#region packages/docx/src/text-distribute.ts
function Ch(e, t, n, r, i = -Infinity, a = !0, o = !1) {
	return Fe(e, t, {
		firstContentSi: n,
		lastDrawnSi: r,
		minPerGap: i,
		seaClusterGaps: o,
		...a ? {} : { isGapChar: () => !1 }
	});
}
function wh(e) {
	if (!e) return 0;
	let t = 0;
	for (let n of e.perSeg.values()) t += n.splitBefore.length + +!!n.trailingGap;
	return e.perGap * t;
}
//#endregion
//#region packages/docx/src/arabic-joining.generated.ts
var Th = [
	"U",
	"C",
	"D",
	"L",
	"R",
	"T"
], Eh = [
	0,
	173,
	174,
	768,
	880,
	1155,
	1162,
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
	1552,
	1563,
	1564,
	1565,
	1568,
	1569,
	1570,
	1574,
	1575,
	1576,
	1577,
	1578,
	1583,
	1587,
	1600,
	1601,
	1608,
	1609,
	1611,
	1632,
	1646,
	1648,
	1649,
	1652,
	1653,
	1656,
	1672,
	1690,
	1728,
	1729,
	1731,
	1740,
	1741,
	1742,
	1743,
	1744,
	1746,
	1748,
	1749,
	1750,
	1757,
	1759,
	1765,
	1767,
	1769,
	1770,
	1774,
	1776,
	1786,
	1789,
	1791,
	1792,
	1807,
	1808,
	1809,
	1810,
	1813,
	1818,
	1822,
	1823,
	1832,
	1833,
	1834,
	1835,
	1836,
	1837,
	1839,
	1840,
	1867,
	1869,
	1870,
	1881,
	1884,
	1899,
	1901,
	1905,
	1906,
	1907,
	1909,
	1912,
	1914,
	1920,
	1958,
	1969,
	1994,
	2027,
	2036,
	2042,
	2043,
	2045,
	2046,
	2070,
	2074,
	2075,
	2084,
	2085,
	2088,
	2089,
	2094,
	2112,
	2113,
	2118,
	2120,
	2121,
	2122,
	2132,
	2133,
	2134,
	2137,
	2140,
	2144,
	2145,
	2146,
	2150,
	2151,
	2152,
	2153,
	2155,
	2160,
	2179,
	2182,
	2183,
	2185,
	2190,
	2191,
	2192,
	2199,
	2208,
	2218,
	2221,
	2222,
	2223,
	2225,
	2227,
	2233,
	2234,
	2249,
	2250,
	2274,
	2275,
	2307,
	2362,
	2363,
	2364,
	2365,
	2369,
	2377,
	2381,
	2382,
	2385,
	2392,
	2402,
	2404,
	2433,
	2434,
	2492,
	2493,
	2497,
	2501,
	2509,
	2510,
	2530,
	2532,
	2558,
	2559,
	2561,
	2563,
	2620,
	2621,
	2625,
	2627,
	2631,
	2633,
	2635,
	2638,
	2641,
	2642,
	2672,
	2674,
	2677,
	2678,
	2689,
	2691,
	2748,
	2749,
	2753,
	2758,
	2759,
	2761,
	2765,
	2766,
	2786,
	2788,
	2810,
	2816,
	2817,
	2818,
	2876,
	2877,
	2879,
	2880,
	2881,
	2885,
	2893,
	2894,
	2901,
	2903,
	2914,
	2916,
	2946,
	2947,
	3008,
	3009,
	3021,
	3022,
	3072,
	3073,
	3076,
	3077,
	3132,
	3133,
	3134,
	3137,
	3142,
	3145,
	3146,
	3150,
	3157,
	3159,
	3170,
	3172,
	3201,
	3202,
	3260,
	3261,
	3263,
	3264,
	3270,
	3271,
	3276,
	3278,
	3298,
	3300,
	3328,
	3330,
	3387,
	3389,
	3393,
	3397,
	3405,
	3406,
	3426,
	3428,
	3457,
	3458,
	3530,
	3531,
	3538,
	3541,
	3542,
	3543,
	3633,
	3634,
	3636,
	3643,
	3655,
	3663,
	3761,
	3762,
	3764,
	3773,
	3784,
	3791,
	3864,
	3866,
	3893,
	3894,
	3895,
	3896,
	3897,
	3898,
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
	4038,
	4039,
	4141,
	4145,
	4146,
	4152,
	4153,
	4155,
	4157,
	4159,
	4184,
	4186,
	4190,
	4193,
	4209,
	4213,
	4226,
	4227,
	4229,
	4231,
	4237,
	4238,
	4253,
	4254,
	4957,
	4960,
	5906,
	5909,
	5938,
	5940,
	5970,
	5972,
	6002,
	6004,
	6068,
	6070,
	6071,
	6078,
	6086,
	6087,
	6089,
	6100,
	6109,
	6110,
	6151,
	6152,
	6154,
	6155,
	6158,
	6159,
	6160,
	6176,
	6265,
	6277,
	6279,
	6313,
	6314,
	6315,
	6432,
	6435,
	6439,
	6441,
	6450,
	6451,
	6457,
	6460,
	6679,
	6681,
	6683,
	6684,
	6742,
	6743,
	6744,
	6751,
	6752,
	6753,
	6754,
	6755,
	6757,
	6765,
	6771,
	6781,
	6783,
	6784,
	6832,
	6878,
	6880,
	6892,
	6912,
	6916,
	6964,
	6965,
	6966,
	6971,
	6972,
	6973,
	6978,
	6979,
	7019,
	7028,
	7040,
	7042,
	7074,
	7078,
	7080,
	7082,
	7083,
	7086,
	7142,
	7143,
	7144,
	7146,
	7149,
	7150,
	7151,
	7154,
	7212,
	7220,
	7222,
	7224,
	7376,
	7379,
	7380,
	7393,
	7394,
	7401,
	7405,
	7406,
	7412,
	7413,
	7416,
	7418,
	7616,
	7680,
	8203,
	8204,
	8205,
	8206,
	8208,
	8234,
	8239,
	8288,
	8293,
	8298,
	8304,
	8400,
	8433,
	11503,
	11506,
	11647,
	11648,
	11744,
	11776,
	12330,
	12334,
	12441,
	12443,
	42607,
	42611,
	42612,
	42622,
	42654,
	42656,
	42736,
	42738,
	43010,
	43011,
	43014,
	43015,
	43019,
	43020,
	43045,
	43047,
	43052,
	43053,
	43072,
	43122,
	43123,
	43204,
	43206,
	43232,
	43250,
	43263,
	43264,
	43302,
	43310,
	43335,
	43346,
	43392,
	43395,
	43443,
	43444,
	43446,
	43450,
	43452,
	43454,
	43493,
	43494,
	43561,
	43567,
	43569,
	43571,
	43573,
	43575,
	43587,
	43588,
	43596,
	43597,
	43644,
	43645,
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
	43756,
	43758,
	43766,
	43767,
	44005,
	44006,
	44008,
	44009,
	44013,
	44014,
	64286,
	64287,
	65024,
	65040,
	65056,
	65072,
	65279,
	65280,
	65529,
	65532,
	66045,
	66046,
	66272,
	66273,
	66422,
	66427,
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
	68288,
	68293,
	68294,
	68295,
	68296,
	68297,
	68299,
	68301,
	68302,
	68307,
	68311,
	68312,
	68317,
	68318,
	68321,
	68322,
	68324,
	68325,
	68327,
	68331,
	68335,
	68336,
	68480,
	68481,
	68482,
	68483,
	68486,
	68489,
	68490,
	68492,
	68493,
	68494,
	68496,
	68497,
	68498,
	68521,
	68525,
	68527,
	68864,
	68865,
	68898,
	68899,
	68900,
	68904,
	68969,
	68974,
	69291,
	69293,
	69314,
	69315,
	69317,
	69318,
	69320,
	69370,
	69376,
	69424,
	69427,
	69428,
	69445,
	69446,
	69457,
	69460,
	69461,
	69488,
	69492,
	69494,
	69506,
	69510,
	69552,
	69553,
	69554,
	69556,
	69559,
	69560,
	69561,
	69563,
	69565,
	69566,
	69568,
	69569,
	69570,
	69572,
	69573,
	69577,
	69578,
	69579,
	69580,
	69633,
	69634,
	69688,
	69703,
	69744,
	69745,
	69747,
	69749,
	69759,
	69762,
	69811,
	69815,
	69817,
	69819,
	69826,
	69827,
	69888,
	69891,
	69927,
	69932,
	69933,
	69941,
	70003,
	70004,
	70016,
	70018,
	70070,
	70079,
	70089,
	70093,
	70095,
	70096,
	70191,
	70194,
	70196,
	70197,
	70198,
	70200,
	70206,
	70207,
	70209,
	70210,
	70367,
	70368,
	70371,
	70379,
	70400,
	70402,
	70459,
	70461,
	70464,
	70465,
	70502,
	70509,
	70512,
	70517,
	70587,
	70593,
	70606,
	70607,
	70608,
	70609,
	70610,
	70611,
	70625,
	70627,
	70712,
	70720,
	70722,
	70725,
	70726,
	70727,
	70750,
	70751,
	70835,
	70841,
	70842,
	70843,
	70847,
	70849,
	70850,
	70852,
	71090,
	71094,
	71100,
	71102,
	71103,
	71105,
	71132,
	71134,
	71219,
	71227,
	71229,
	71230,
	71231,
	71233,
	71339,
	71340,
	71341,
	71342,
	71344,
	71350,
	71351,
	71352,
	71453,
	71454,
	71455,
	71456,
	71458,
	71462,
	71463,
	71468,
	71727,
	71736,
	71737,
	71739,
	71995,
	71997,
	71998,
	71999,
	72003,
	72004,
	72148,
	72152,
	72154,
	72156,
	72160,
	72161,
	72193,
	72203,
	72243,
	72249,
	72251,
	72255,
	72263,
	72264,
	72273,
	72279,
	72281,
	72284,
	72330,
	72343,
	72344,
	72346,
	72544,
	72545,
	72546,
	72549,
	72550,
	72551,
	72752,
	72759,
	72760,
	72766,
	72767,
	72768,
	72850,
	72872,
	72874,
	72881,
	72882,
	72884,
	72885,
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
	73104,
	73106,
	73109,
	73110,
	73111,
	73112,
	73459,
	73461,
	73472,
	73474,
	73526,
	73531,
	73536,
	73537,
	73538,
	73539,
	73562,
	73563,
	78896,
	78913,
	78919,
	78934,
	90398,
	90410,
	90413,
	90416,
	92912,
	92917,
	92976,
	92983,
	94031,
	94032,
	94095,
	94099,
	94180,
	94181,
	113821,
	113823,
	113824,
	113828,
	118528,
	118574,
	118576,
	118599,
	119143,
	119146,
	119155,
	119171,
	119173,
	119180,
	119210,
	119214,
	119362,
	119365,
	121344,
	121399,
	121403,
	121453,
	121461,
	121462,
	121476,
	121477,
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
	123566,
	123567,
	123628,
	123632,
	124140,
	124144,
	124398,
	124400,
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
	125184,
	125252,
	125260,
	917505,
	917506,
	917536,
	917632,
	917760,
	918e3
], Dh = [
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	2,
	0,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	1,
	2,
	4,
	2,
	5,
	0,
	2,
	5,
	4,
	0,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	0,
	4,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	4,
	0,
	2,
	0,
	2,
	0,
	5,
	4,
	5,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	5,
	0,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	0,
	5,
	0,
	2,
	5,
	0,
	1,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	5,
	0,
	2,
	0,
	2,
	0,
	4,
	2,
	4,
	0,
	4,
	1,
	2,
	0,
	2,
	4,
	2,
	0,
	5,
	2,
	4,
	0,
	4,
	2,
	4,
	2,
	4,
	2,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	2,
	0,
	1,
	5,
	0,
	5,
	0,
	2,
	0,
	5,
	2,
	5,
	2,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	1,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	2,
	3,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	2,
	4,
	0,
	4,
	0,
	4,
	0,
	3,
	4,
	2,
	3,
	2,
	4,
	2,
	4,
	0,
	4,
	5,
	0,
	2,
	4,
	0,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	2,
	4,
	0,
	4,
	2,
	0,
	3,
	2,
	4,
	2,
	5,
	0,
	5,
	0,
	5,
	0,
	4,
	2,
	0,
	2,
	0,
	5,
	0,
	2,
	4,
	2,
	0,
	5,
	2,
	4,
	0,
	2,
	4,
	2,
	5,
	0,
	2,
	0,
	2,
	4,
	0,
	2,
	4,
	2,
	4,
	2,
	0,
	2,
	4,
	2,
	0,
	4,
	2,
	3,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0,
	2,
	5,
	0,
	5,
	0,
	5,
	0,
	5,
	0
], Oh = [
	1587,
	1588,
	1589,
	1590,
	1690,
	1691,
	1692,
	1693,
	1694,
	1786,
	1787,
	1884,
	1901,
	1904,
	1917,
	1918,
	2223
], kh = [
	1580,
	1581,
	1582,
	1665,
	1666,
	1667,
	1668,
	1669,
	1670,
	1671,
	1727,
	1879,
	1880,
	1902,
	1903,
	1906,
	1916,
	2186,
	2210,
	2241,
	2245,
	2246
], Ah = [
	1576,
	1578,
	1579,
	1646,
	1657,
	1658,
	1659,
	1660,
	1661,
	1662,
	1663,
	1664,
	1872,
	1873,
	1874,
	1875,
	1876,
	1877,
	1878,
	2208,
	2209,
	2230,
	2231,
	2232,
	2238,
	2239,
	2240
], jh = [
	1574,
	1585,
	1586,
	1597,
	1598,
	1599,
	1609,
	1610,
	1656,
	1681,
	1682,
	1683,
	1684,
	1685,
	1686,
	1687,
	1688,
	1689,
	1740,
	1742,
	1744,
	1745,
	1775,
	1883,
	1899,
	1900,
	1905,
	1909,
	1910,
	1911,
	2216,
	2217,
	2218,
	2226,
	2233,
	2234,
	69319
], Mh = [
	1570,
	1571,
	1573,
	1575,
	1591,
	1592,
	1595,
	1596,
	1603,
	1604,
	1649,
	1650,
	1651,
	1653,
	1695,
	1705,
	1707,
	1708,
	1709,
	1710,
	1711,
	1712,
	1713,
	1714,
	1715,
	1716,
	1717,
	1718,
	1719,
	1720,
	1890,
	1891,
	1892,
	1898,
	1907,
	1908,
	1919,
	2160,
	2161,
	2162,
	2163,
	2164,
	2165,
	2166,
	2167,
	2168,
	2169,
	2170,
	2171,
	2172,
	2173,
	2174,
	2175,
	2176,
	2177,
	2178,
	2187,
	2188,
	2189,
	2211,
	2214,
	2224,
	2228,
	2242,
	2247,
	2248,
	69315,
	69316
], Nh = [
	1572,
	1593,
	1594,
	1601,
	1602,
	1608,
	1647,
	1654,
	1655,
	1696,
	1697,
	1698,
	1699,
	1700,
	1701,
	1702,
	1703,
	1704,
	1732,
	1733,
	1734,
	1735,
	1736,
	1737,
	1738,
	1739,
	1743,
	1788,
	1885,
	1886,
	1887,
	1888,
	1889,
	1912,
	1913,
	2212,
	2213,
	2219,
	2227,
	2229,
	2243
];
//#endregion
//#region packages/docx/src/arabic-joining.ts
function Ph(e) {
	let t = 0, n = Eh.length - 1, r = -1;
	for (; t <= n;) {
		let i = t + (n - t >> 1);
		Eh[i] <= e ? (r = i, t = i + 1) : n = i - 1;
	}
	return r < 0 ? "U" : Th[Dh[r]] ?? "U";
}
function Fh(e) {
	let t = Ph(e);
	return t === "D" || t === "L" || t === "C";
}
function Ih(e) {
	let t = Ph(e);
	return t === "D" || t === "R" || t === "C";
}
var Lh = 1604, Rh = new Set([
	1575,
	1570,
	1571,
	1573,
	1649
]), zh = 1600, Bh = new Set(Oh), Vh = new Set(kh), Hh = new Set(Ah), Uh = new Set(jh), Wh = new Set(Mh), Gh = new Set(Nh), Kh = /* @__PURE__ */ function(e) {
	return e[e.Normal = 7] = "Normal", e[e.Waw = 8] = "Waw", e[e.BaRa = 9] = "BaRa", e[e.Alef = 10] = "Alef", e[e.HahDal = 11] = "HahDal", e[e.Seen = 12] = "Seen", e[e.Kashida = 13] = "Kashida", e;
}(Kh || {});
function qh(e) {
	let t = [...e].map((e) => e.codePointAt(0)), n = [], r = t.length > 0 && Ph(t[0]) !== "T" ? 0 : -1;
	for (let e = 1; e < t.length; e++) {
		let i = t[e];
		if (Ph(i) !== "T") {
			if (r >= 0) {
				let a = t[r];
				!(a === Lh && Rh.has(i)) && Fh(a) && Ih(i) && n.push(e);
			}
			r = e;
		}
	}
	return n;
}
function Jh(e, t, n) {
	let r = t - 1;
	for (; r >= 0 && Ph(e[r]) === "T";) r--;
	let i = e[r], a = e[t];
	return i === zh ? Kh.Kashida : Bh.has(i) ? Kh.Seen : Vh.has(i) ? Kh.HahDal : Ns(t, n) && Wh.has(a) ? Kh.Alef : Hh.has(i) && Uh.has(a) ? Kh.BaRa : Ns(t, n) && Gh.has(a) ? Kh.Waw : Kh.Normal;
}
function Yh(e) {
	let t = [...e], n = [];
	for (let e = 0; e < t.length;) {
		for (; e < t.length && /\s/u.test(t[e]);) e++;
		if (e >= t.length) break;
		let r = e + 1;
		for (; r < t.length && !/\s/u.test(t[r]);) r++;
		let i = t.slice(e, r), a = i.map((e) => e.codePointAt(0)), o = a.length - 1;
		for (; o >= 0 && Ph(a[o]) === "T";) o--;
		let s = -1, c = -1;
		for (let e of qh(i.join(""))) {
			let t = Jh(a, e, o);
			t >= c && (s = e, c = t);
		}
		s >= 0 && n.push({
			beforeCp: e + s,
			priority: c
		}), e = r;
	}
	return n;
}
//#endregion
//#region packages/docx/src/kashida-justify.ts
var Xh = "ـ";
function Zh(e, t) {
	let n = [...e], r = "";
	for (let e = 0; e < n.length; e++) {
		let i = t.get(e) ?? 0;
		i > 0 && (r += Xh.repeat(i)), r += n[e];
	}
	return r;
}
function Qh(e, t, n, r) {
	if (t <= .5) return null;
	let i = [];
	for (let t = 0; t < e.length; t++) {
		let n = e[t].text;
		if (n !== void 0) for (let { beforeCp: e, priority: r } of Yh(n)) i.push({
			si: t,
			beforeCp: e,
			priority: r,
			textOrder: i.length
		});
	}
	if (i.length === 0) return null;
	i.sort((e, t) => t.priority - e.priority || e.textOrder - t.textOrder);
	let a = n === "low" ? 1 : n === "medium" ? 2 : Infinity, o = a, s = i.length * 64, c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
	for (let { si: t } of i) {
		if (u.has(t)) continue;
		let n = r(t, e[t].text);
		l.set(t, n), u.set(t, n);
	}
	let d = t, f = 0;
	for (let t = 0; t < o && d > .5 && f < s; t++) {
		let t = !1;
		for (let { si: n, beforeCp: o } of i) {
			if (d <= .5 || f >= s) break;
			let i = c.get(n);
			i || (i = /* @__PURE__ */ new Map(), c.set(n, i));
			let l = i.get(o) ?? 0;
			if (l >= a) continue;
			i.set(o, l + 1);
			let p = r(n, Zh(e[n].text, i)), m = p - u.get(n);
			m > 0 && m <= d + 1e-6 ? (u.set(n, p), d -= m, f++, t = !0) : l === 0 ? i.delete(o) : i.set(o, l);
		}
		if (!t) break;
	}
	let p = /* @__PURE__ */ new Map();
	for (let [t, n] of c) {
		let r = [...n.entries()].filter(([, e]) => e > 0).sort(([e], [t]) => e - t).map(([e, t]) => ({
			beforeCp: e,
			count: t
		}));
		r.length !== 0 && p.set(t, {
			text: Zh(e[t].text, n),
			insertions: r,
			advanceDeltaPx: u.get(t) - l.get(t)
		});
	}
	if (p.size === 0) return null;
	let m = [...p.values()].reduce((e, t) => e + t.advanceDeltaPx, 0);
	return {
		perSeg: p,
		appliedPx: m,
		residualPx: t - m
	};
}
//#endregion
//#region packages/docx/src/layout/shape-drawing-plan.ts
var $h = 1;
function eg(e) {
	return Object.freeze({
		status: "unsupported",
		command: Object.freeze({ kind: "noop" }),
		diagnostics: Object.freeze([Object.freeze({
			code: "UNSUPPORTED_FEATURE",
			severity: "error",
			message: e
		})])
	});
}
function tg(e) {
	return e ? {
		type: e.type,
		w: e.w,
		len: e.len
	} : void 0;
}
function ng(e) {
	if (e) return e.fillType === "gradient" ? {
		fillType: "gradient",
		stops: e.stops.map((e) => ({
			position: e.position,
			color: e.color
		})),
		angle: e.angle,
		gradType: e.gradType,
		...e.scaled === void 0 ? {} : { scaled: e.scaled },
		...e.path === void 0 ? {} : { path: e.path },
		...e.fillToRect === void 0 ? {} : { fillToRect: { ...e.fillToRect } },
		...e.tileRect === void 0 ? {} : { tileRect: { ...e.tileRect } },
		...e.flip === void 0 ? {} : { flip: e.flip },
		...e.rotWithShape === void 0 ? {} : { rotWithShape: e.rotWithShape }
	} : {
		fillType: "pattern",
		fg: e.fg,
		bg: e.bg,
		preset: e.preset
	};
}
function rg(e) {
	if (!e.stroke || !e.strokeWidth || e.strokeWidth <= 0) return null;
	let t = ng(e.strokeFill);
	return {
		color: e.stroke,
		width: e.strokeWidth,
		...t ? { fill: t } : {},
		...e.strokeDash ? { dashStyle: e.strokeDash } : {},
		...e.strokeCustomDash?.length ? { customDash: e.strokeCustomDash } : {},
		...e.strokeCap ? { lineCap: e.strokeCap } : {},
		...e.strokeJoin ? { lineJoin: e.strokeJoin } : {},
		...e.strokeMiterLimit !== void 0 && e.strokeMiterLimit !== null ? { miterLimit: e.strokeMiterLimit } : {},
		...e.strokeAlignment ? { alignment: e.strokeAlignment } : {},
		...e.strokeCompound ? { cmpd: e.strokeCompound } : {},
		...tg(e.headEnd) ? { headEnd: tg(e.headEnd) } : {},
		...tg(e.tailEnd) ? { tailEnd: tg(e.tailEnd) } : {}
	};
}
function ig(e, t, n, r, i) {
	let a = r !== void 0 && (r.textPathOk !== void 0 || r.on !== void 0 || r.fitShape !== void 0 || r.fitPath !== void 0 || r.trim !== void 0 || r.xScale !== void 0);
	if (r !== void 0 && (!a || r.textPathOk === !0 && r.on === !0)) {
		if (e.fill?.fillType === "image") return eg("VML textPath with a DrawingML image fill is not rendered");
		if (r.fitPath === !0) return eg("VML textPath fitPath=true is not rendered");
		if (r.xScale === !0) return eg("VML textPath xScale=true is not rendered");
		if (r.string.trim().length === 0) return Object.freeze({
			status: "planned",
			command: Object.freeze({ kind: "noop" })
		});
		if (!n) throw Error("Shape textPath acquisition requires TextLayoutService");
		let i = a ? r.fitShape === !0 : !0;
		if (r.fontSizePt !== void 0 && (!Number.isFinite(r.fontSizePt) || r.fontSizePt < 0)) throw RangeError("VML textPath fontSizePt must be finite and non-negative");
		if (!i && r.fontSizePt === void 0) return eg("VML textPath fitShape=false requires an authored font-size");
		if (r.fontSizePt === 0) return Object.freeze({
			status: "planned",
			command: Object.freeze({ kind: "noop" })
		});
		let o = r.fontSizePt ?? $h, s = r.fontFamily ?? void 0, c = n.shape({
			text: r.string,
			fontSizePt: o,
			fonts: {
				ascii: s,
				highAnsi: s,
				eastAsia: s,
				complexScript: s
			},
			weight: r.bold ? 700 : 400,
			style: r.italic ? "italic" : "normal",
			measure: !0
		});
		if (r.trim === !0 && !c.inkBounds) return eg("VML textPath trim=true requires glyph ink bounds");
		let l = r.trim === !0 ? c.inkBounds?.xMinPt ?? 0 : 0, u = r.trim === !0 ? c.inkBounds?.xMaxPt ?? 0 : c.advancePt, d = r.trim === !0 ? c.inkBounds?.ascentPt ?? 0 : c.ascentPt, f = r.trim === !0 ? c.inkBounds?.descentPt ?? 0 : c.descentPt, p = {
			xPt: l,
			yPt: -d,
			widthPt: u - l,
			heightPt: d + f
		};
		if (!Number.isFinite(c.advancePt) || Object.values(p).some((e) => !Number.isFinite(e)) || c.spans.some((e) => !Number.isFinite(e.advancePt))) throw Error("Shape textPath acquisition produced non-finite metrics");
		return p.widthPt <= 0 || p.heightPt <= 0 || c.spans.length === 0 ? eg("VML textPath produced empty glyph metrics") : Object.freeze({
			status: "planned",
			command: V({
				kind: "watermark-text",
				rect: { ...t },
				text: r.string,
				fill: e.fill ? {
					...e.fill,
					...e.fill.fillType === "gradient" ? { stops: e.fill.stops.map((e) => ({ ...e })) } : {}
				} : null,
				opacity: Math.max(0, Math.min(1, e.fillOpacity ?? 1)),
				rotationDeg: e.rotation ?? 0,
				fitShape: i,
				fontSizePt: o,
				sourceBounds: p,
				spans: c.spans.map((e) => ({
					text: e.text,
					advancePt: e.advancePt,
					fontRoute: e.fontRoute,
					fontWeight: e.font.weight,
					fontStyle: e.font.style
				}))
			}, "VML textPath command")
		});
	}
	let o = {
		rect: {
			x: t.xPt,
			y: t.yPt,
			w: t.widthPt,
			h: t.heightPt
		},
		geometry: e.presetGeometry ? {
			kind: "preset",
			name: e.presetGeometry,
			adjustments: [...e.adjValues ?? []]
		} : {
			kind: "custom",
			subpaths: e.subpaths.map((e) => e.map((e) => ({ ...e })))
		},
		fill: e.fill && e.fill.fillType !== "image" ? {
			...e.fill,
			...e.fill.fillType === "gradient" ? { stops: e.fill.stops.map((e) => ({ ...e })) } : {}
		} : null,
		stroke: rg(e),
		transform: {
			rotationDeg: e.rotation ?? 0,
			flipH: e.flipH ?? !1,
			flipV: e.flipV ?? !1
		}
	};
	if (e.fill?.fillType === "image") {
		if (e.fill.tile !== void 0) return Object.freeze({
			status: "unsupported",
			command: Object.freeze({ kind: "noop" }),
			diagnostics: Object.freeze([Object.freeze({
				code: "UNSUPPORTED_FEATURE",
				severity: "error",
				message: "Tiled DrawingML shape image fills are not rendered"
			})])
		});
		if (!i) throw Error("DrawingML shape image fill requires a retained image resource key");
		return Object.freeze({
			status: "planned",
			command: V({
				kind: "drawingml-image-fill",
				plan: o,
				resourceKey: i,
				...e.fill.fillRect === void 0 ? {} : { fillRect: {
					l: e.fill.fillRect.l ?? 0,
					t: e.fill.fillRect.t ?? 0,
					r: e.fill.fillRect.r ?? 0,
					b: e.fill.fillRect.b ?? 0
				} }
			}, "DrawingML shape image-fill command")
		});
	}
	return Object.freeze({
		status: "planned",
		command: V({
			kind: "drawingml-shape",
			plan: o
		}, "DrawingML shape command")
	});
}
//#endregion
//#region packages/docx/src/layout/textbox-input.ts
function ag(e, t) {
	let n = e.fontFamily ?? null;
	return {
		fontSizePt: t,
		fonts: {
			ascii: n,
			highAnsi: n,
			eastAsia: e.fontFamilyEastAsia ?? n,
			complexScript: n
		},
		weight: 400,
		style: "normal",
		complexScript: !1
	};
}
function og(e, t = {
	story: "textbox",
	storyInstance: "shape",
	path: []
}, n = ag) {
	return V((e.textBlocks ?? []).map((e, r) => {
		let i = {
			story: "textbox",
			storyInstance: t.storyInstance,
			path: [...t.path, r]
		}, a = e.runs?.length ? e.runs : [{
			text: e.text,
			fontSizePt: e.fontSizePt,
			color: e.color,
			fontFamily: e.fontFamily,
			bold: e.bold,
			italic: e.italic
		}], o = e.paragraphMarkColor === void 0 ? e.color ?? a[0]?.color : e.paragraphMarkColor ?? void 0, s = e.numbering ? {
			...e.numbering,
			...e.numbering.color == null && !e.numbering.colorAuto && o ? { color: o } : {}
		} : null;
		return {
			source: i,
			spacing: {
				beforePt: e.spaceBefore ?? 0,
				afterPt: e.spaceAfter ?? 0
			},
			runs: a.map((t) => ({
				text: t.text,
				fontSizePt: t.fontSizePt,
				...t.color ?? e.color ? { color: `#${t.color ?? e.color}` } : {},
				...t.fontFamily || e.fontFamily ? { fontFamily: t.fontFamily ?? e.fontFamily ?? void 0 } : {},
				...t.fontFamilyEastAsia ? { fontFamilyEastAsia: t.fontFamilyEastAsia } : {},
				bold: t.bold ?? e.bold ?? !1,
				italic: t.italic ?? e.italic ?? !1,
				...t.ruby ? { ruby: t.ruby } : {}
			})),
			alignment: e.alignment ?? "left",
			indentLeftPt: e.indentLeft ?? 0,
			indentRightPt: e.indentRight ?? 0,
			indentFirstPt: e.indentFirst ?? 0,
			lineSpacing: e.lineSpacingVal == null ? null : {
				value: e.lineSpacingVal,
				rule: e.lineSpacingRule === "exact" || e.lineSpacingRule === "atLeast" ? e.lineSpacingRule : "auto",
				explicit: !0
			},
			tabStops: (e.tabStops ?? []).map((e) => ({ ...e })),
			...e.bidi === void 0 ? {} : { bidi: e.bidi },
			contextualSpacing: e.contextualSpacing ?? !1,
			...e.styleId === void 0 ? {} : { styleId: e.styleId },
			...s ? {
				numbering: s,
				numberingMarkerShapeInput: n(s, e.fontSizePt)
			} : {},
			...e.imagePath ? { image: {
				imagePath: e.imagePath,
				mimeType: e.mimeType ?? "application/octet-stream",
				...e.svgImagePath ? { svgImagePath: e.svgImagePath } : {},
				widthPt: e.imageWidthPt ?? 0,
				heightPt: e.imageHeightPt ?? 0
			} } : {}
		};
	}), "DOCX text box acquisition input");
}
//#endregion
//#region packages/docx/src/layout/retained-typography.ts
function sg(e) {
	if (!Number.isFinite(e.advancePt) || e.advancePt <= 0) throw RangeError("Tab leader glyph advance must be finite and positive");
	let t = Math.floor(e.interval.widthPt / e.advancePt), n = e.interval.widthPt - t * e.advancePt;
	return Array.from({ length: t }, (t, r) => ({
		text: e.glyph,
		origin: {
			xPt: e.interval.xPt + n / 2 + r * e.advancePt,
			yPt: e.baselinePt
		},
		fontRoute: e.fontRoute,
		fontSizePt: e.fontSizePt,
		fontWeight: e.fontWeight,
		fontStyle: e.fontStyle,
		color: e.color
	}));
}
function cg(e) {
	let t;
	if (e.raisePt !== void 0) t = e.baseOrigin.yPt - e.raisePt;
	else if (e.baseInkTopPt !== void 0 && e.guideInkBottomFromBaselinePt !== void 0) t = e.baseInkTopPt - e.guideInkBottomFromBaselinePt;
	else throw Error("Ruby geometry requires authored w:hpsRaise or retained base/guide ink bounds");
	let n = e.baseOrigin.xPt + (e.baseAdvancePt - e.guideAdvancePt) / 2;
	return e.spans.map((e) => ({
		text: e.text,
		origin: {
			xPt: n + e.offsetPt,
			yPt: t
		},
		fontRoute: e.fontRoute,
		fontSizePt: e.fontSizePt,
		fontWeight: e.fontWeight,
		fontStyle: e.fontStyle,
		color: e.color
	}));
}
function lg(e) {
	return -(e.inkBounds?.ascentPt ?? e.ascentPt);
}
function ug(e) {
	return e.inkBounds?.descentPt ?? e.descentPt;
}
function dg(e) {
	let t = e.inkBounds ? e.inkBounds.ascentPt + e.inkBounds.descentPt : Math.min(e.ascentPt, e.descentPt);
	if (!Number.isFinite(t) || t <= 0) throw Error("Retained decoration probe requires positive selected-face ink");
	return t;
}
function fg(e) {
	return e === "double" || e === "dbl" ? "double" : e?.includes("dot") ? "dotted" : e?.includes("dash") ? "dashed" : e?.includes("wave") ? "wavy" : "solid";
}
function pg(e, t, n) {
	let r = Math.max(0, t.xPt - e.xPt), i = n * 2, a = Math.max(1, Math.ceil(r / i));
	return Array.from({ length: a + 1 }, (t, i) => ({
		xPt: e.xPt + r * i / a,
		yPt: e.yPt + (i % 2 == 0 ? -n / 2 : n / 2)
	}));
}
function mg(e) {
	let t = [], n = e.origin.xPt + e.advancePt;
	if (e.underline) {
		let r = dg(e.underline.probe), i = e.origin.yPt + (lg(e.underline.probe) + ug(e.underline.probe)) / 2, a = e.origin.yPt + ug(e.base) + r / 2, o = Math.max(i, a), s = fg(e.underline.authoredStyle), c = {
			kind: "underline",
			...e.underline.authoredStyle === void 0 ? {} : { authoredStyle: e.underline.authoredStyle },
			color: e.underline.color,
			widthPt: r
		};
		if (s === "double") {
			let i = o + r * 2;
			t.push({
				...c,
				style: "solid",
				from: {
					xPt: e.origin.xPt,
					yPt: o
				},
				to: {
					xPt: n,
					yPt: o
				}
			}, {
				...c,
				style: "solid",
				from: {
					xPt: e.origin.xPt,
					yPt: i
				},
				to: {
					xPt: n,
					yPt: i
				}
			});
		} else {
			let i = {
				xPt: e.origin.xPt,
				yPt: o
			}, a = {
				xPt: n,
				yPt: o
			};
			t.push({
				...c,
				style: s,
				from: i,
				to: a,
				...s === "wavy" ? { path: pg(i, a, r) } : {},
				...s === "dotted" ? { dashPatternPt: [r, r * 2] } : {},
				...s === "dashed" ? { dashPatternPt: [r * 4, r * 3] } : {}
			});
		}
	}
	if (e.strike) {
		let r = dg(e.strike.probe), i = e.strike.color ?? e.color;
		if (e.strike.double && e.strike.doubleProbe) {
			let a = e.origin.yPt + lg(e.strike.doubleProbe) + r / 2, o = e.origin.yPt + ug(e.strike.doubleProbe) - r / 2;
			for (let s of [a, o]) t.push({
				kind: "strikethrough",
				color: i,
				widthPt: r,
				style: "solid",
				from: {
					xPt: e.origin.xPt,
					yPt: s
				},
				to: {
					xPt: n,
					yPt: s
				}
			});
		} else {
			let a = e.origin.yPt + (lg(e.strike.probe) + ug(e.strike.probe)) / 2;
			t.push({
				kind: "strikethrough",
				color: i,
				widthPt: r,
				style: "solid",
				from: {
					xPt: e.origin.xPt,
					yPt: a
				},
				to: {
					xPt: n,
					yPt: a
				}
			});
		}
	}
	return t;
}
function hg(e) {
	let t = e.mark.inkBounds.xMaxPt - e.mark.inkBounds.xMinPt, n = e.mark.inkBounds.ascentPt + e.mark.inkBounds.descentPt;
	if (!(t > 0) || !(n > 0)) throw Error("Retained emphasis glyph requires positive selected-face ink bounds");
	let r = [];
	for (let t of e.clusterInk) {
		if (/^\s+$/u.test(t.text)) continue;
		let n = e.clusters.find((e) => e.range.start === t.range.start && e.range.end === t.range.end);
		if (!n) throw Error("Retained emphasis cluster ink does not match shaped cluster geometry");
		let i = (e.origin.xPt + n.offset.xPt + t.ink.xMinPt * e.scaleX + (e.origin.xPt + n.offset.xPt + t.ink.xMaxPt * e.scaleX)) / 2 - (e.mark.inkBounds.xMinPt + e.mark.inkBounds.xMaxPt) / 2, a = e.authored === "underDot" ? e.origin.yPt + t.ink.descentPt + e.mark.inkBounds.ascentPt : e.origin.yPt - t.ink.ascentPt - e.mark.inkBounds.descentPt;
		r.push({
			text: e.glyph,
			origin: {
				xPt: i,
				yPt: a
			},
			fontRoute: e.mark.fontRoute,
			fontSizePt: e.mark.fontSizePt,
			fontWeight: e.mark.fontWeight,
			fontStyle: e.mark.fontStyle,
			color: e.mark.color,
			inkBounds: e.mark.inkBounds
		});
	}
	return r;
}
function gg(e, t) {
	return e.val === t.val && e.color === t.color && e.widthPt === t.widthPt && e.spacePt === t.spacePt && e.themeColor === t.themeColor && e.themeTint === t.themeTint && e.themeShade === t.themeShade && e.shadow === t.shadow && e.frame === t.frame;
}
function _g(e) {
	let t = [], n = 0;
	for (; n < e.length;) {
		let r = e[n], i = n + 1, a = r.bounds.xPt + r.bounds.widthPt + r.trailingSlackPt;
		for (; i < e.length;) {
			let t = e[i];
			if (!gg(r.border, t.border) || Math.abs(t.bounds.xPt - a) > 1e-6 || t.bounds.yPt !== r.bounds.yPt || t.bounds.heightPt !== r.bounds.heightPt) break;
			a = t.bounds.xPt + t.bounds.widthPt + t.trailingSlackPt, i += 1;
		}
		let o = r.bounds.xPt - r.border.spacePt, s = r.bounds.yPt - r.border.spacePt, c = a + r.border.spacePt, l = r.bounds.yPt + r.bounds.heightPt + r.border.spacePt, u = {
			color: r.border.color,
			widthPt: r.border.widthPt,
			...ki(r.border.val, r.border.widthPt)
		};
		t.push({
			...u,
			edge: "top",
			from: {
				xPt: o,
				yPt: s
			},
			to: {
				xPt: c,
				yPt: s
			}
		}, {
			...u,
			edge: "right",
			from: {
				xPt: c,
				yPt: s
			},
			to: {
				xPt: c,
				yPt: l
			}
		}, {
			...u,
			edge: "bottom",
			from: {
				xPt: o,
				yPt: l
			},
			to: {
				xPt: c,
				yPt: l
			}
		}, {
			...u,
			edge: "left",
			from: {
				xPt: o,
				yPt: s
			},
			to: {
				xPt: o,
				yPt: l
			}
		}), n = i;
	}
	return t;
}
//#endregion
//#region packages/docx/src/layout/anchor-compatibility.ts
var vg = W({
	id: "word-zero-relative-size",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/layout/anchor-frame.test.ts#uses wp:extent when Word does not support an exact-zero relative size"
	},
	description: "Word 2010 accepts only positive wp14:pctWidth and wp14:pctHeight values under [MS-ODRAWXML] notes 125/126. Preserve an authored zero as acquisition evidence while resolving the object from wp:extent."
});
W({
	id: "word-vertical-section-physical-drawing-layer",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/anchor-vertical-physical.test.ts#lands an upright-section anchor at the recorded physical centroid"
	},
	description: "Resolve anchored drawings in an upright vertical section against the physical page frame independently of the rotated text-flow coordinate space."
}), W({
	id: "word-page-level-float-prescan",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/page-anchor-prescan.test.ts#pre-scan REGISTERS a page-level (relativeFrom=\"margin\") wrap float on an earlier-scanned paragraph"
	},
	description: "A wrapping drawing whose vertical reference is page-level participates from page start so source-earlier paragraphs on that page see its exclusion."
}), W({
	id: "word-paragraph-anchor-pre-spacing-origin",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/anchor-paragraph-spacebefore.test.ts#anchors a wrapSquare paragraph float at the pre-spaceBefore paragraph top"
	},
	description: "Resolve a paragraph-relative anchored drawing from the paragraph top before applying the paragraph spaceBefore contribution."
}), W({
	id: "word-vertical-section-physical-header-footer",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/vertical-header-footer.test.ts#recovers the physical page box + margins from the logical (swapped) section"
	},
	description: "Paint a vertical section header and footer in the unrotated physical page frame rather than rotating them with the body text flow."
}), W({
	id: "word-frame-auto-wrap-around",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/frame-geometry.test.ts#wrap=\"around\" and \"auto\" → square float (auto ≡ around in Word)"
	},
	description: "Resolve an authored frame wrap value of auto through the same square side-wrap path as around."
}), W({
	id: "word-lower-layer-same-paragraph-anchor-composition",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "lower-layer-same-paragraph-anchor-composition",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "Word preserves a source-later, lower-z, page-owned drawing at its authored position when it belongs to the same anchor paragraph as already composed higher layers. This is a Word-observed compatibility override to ECMA-376 §20.4.2.3, not a normative OOXML rule."
}), W({
	id: "word-textbox-visible-anchor-extent",
	evidence: {
		kind: "office-observation",
		syntheticFixtureId: "textbox-visible-anchor-extent",
		application: "Microsoft Word",
		version: "16.111.1",
		platform: "macOS 26.5.2"
	},
	description: "For DrawingML middle and bottom text anchoring, derive the positioned extent through the last visible retained block while preserving structural trailing empty paragraphs and terminal paragraph spacing in the complete story."
}), W({
	id: "word-overlapping-layout-in-cell-overlay",
	evidence: {
		kind: "regression-test",
		reference: "packages/docx/src/table-cell-anchor-reflow.test.ts#does not grow an automatic row for an overlapping layoutInCell wrapNone object"
	},
	description: "Word leaves an overlap-permitted, non-wrapping layoutInCell drawing as an overlay instead of growing its automatic table row. This is an Office compatibility exception to the general resize behavior in ECMA-376 §20.4.2.3 layoutInCell; non-overlap drawings retain normative cell containment."
});
function yg(e, t) {
	return !e || t !== "none";
}
function bg(e) {
	return e.shading || e.borders.length > 0 || e.resources.length > 0 || e.drawings.length > 0 || e.textBoxes.length > 0 || e.lineNumbers?.some((e) => e.paintOps.length > 0) ? !0 : e.lines.some((e) => e.placements.some((e) => e.kind === "text" || e.kind === "resource" || e.kind === "drawing" ? !0 : e.kind === "tab" && (e.leaderGlyphs?.length ?? 0) > 0));
}
function xg(e) {
	let t = e.flowBounds.yPt, n;
	for (let r of e.blocks) {
		if (r.kind === "table") {
			n = Math.max(n ?? t, r.flowBounds.yPt + r.advancePt);
			continue;
		}
		r.kind !== "paragraph" || !bg(r) || (n = Math.max(n ?? t, r.flowBounds.yPt + Math.max(0, r.advancePt - r.spacing.afterPt)));
	}
	return n === void 0 ? 0 : Math.max(0, n - t);
}
function Sg(e) {
	return e === 0;
}
function Cg(e, t) {
	return e == null ? !t : e !== "paragraph" && e !== "line" && e !== "character";
}
function wg(e, t, n) {
	return e === "page" && t !== null && n !== void 0 && t < n;
}
//#endregion
//#region packages/docx/src/layout/anchor-frame.ts
var Tg = 21600;
function X(e, t, n) {
	return {
		code: e,
		path: t,
		message: n
	};
}
function Eg(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function Dg(e) {
	return Eg(e.xPt) && Eg(e.yPt) && Eg(e.widthPt) && Eg(e.heightPt) && e.widthPt >= 0 && e.heightPt >= 0;
}
function Og(e) {
	return e.kind === "align" ? e.value : e.kind === "offset" ? e.valuePt : e.kind === "percent" ? e.fraction : null;
}
function Z(e, t, n, r = !1) {
	let i = t[e];
	return {
		axis: e,
		status: "unsupported",
		relativeFrom: r ? "page" : i.relativeFrom,
		choiceKind: r ? "simple-position" : i.choice.kind,
		choiceValue: r ? e === "horizontal" ? t.simplePosition.xPt : t.simplePosition.yPt : Og(i.choice),
		issueCode: n.code
	};
}
function kg(e, t, n, r) {
	let i = n[e];
	return i === null ? { problem: X("missing-reference-frame", r, `${e} frame is required`) } : Dg(i) ? { base: {
		startPt: t === "horizontal" ? i.xPt : i.yPt,
		endPt: t === "horizontal" ? i.xPt + i.widthPt : i.yPt + i.heightPt,
		referenceFrame: e
	} } : { problem: X("invalid-reference-frame", r, `${e} frame must be finite and non-negative`) };
}
function Ag(e, t, n, r) {
	let i = kg("page", t, n, r);
	if (!i.base) return i;
	let a = kg("margin", t, n, r);
	if (!a.base) return a;
	let o = n.page, s = n.margin, c = e === "leftMargin" || e === "rightMargin";
	if (c !== (t === "horizontal")) return { problem: X("unsupported-relative-from", r, `${e} is not valid for the ${t} axis`) };
	let l = c ? o.xPt : o.yPt, u = c ? o.xPt + o.widthPt : o.yPt + o.heightPt, d = c ? s.xPt : s.yPt, f = c ? s.xPt + s.widthPt : s.yPt + s.heightPt;
	if (d < l || f > u) return { problem: X("invalid-reference-frame", r, "margin frame must be contained by the page frame") };
	let p = e === "leftMargin" || e === "topMargin";
	return { base: {
		startPt: p ? l : f,
		endPt: p ? d : u,
		referenceFrame: e
	} };
}
function jg(e, t, n, r) {
	if (t === "page" || t === "margin" || e === "horizontal" && (t === "column" || t === "character") || e === "vertical" && (t === "paragraph" || t === "line")) return kg(t, e, n, r);
	if (e === "horizontal" && (t === "leftMargin" || t === "rightMargin") || e === "vertical" && (t === "topMargin" || t === "bottomMargin")) return Ag(t, e, n, r);
	if (t === "insideMargin" || t === "outsideMargin") {
		if (n.pageParity === null) return { problem: X("missing-page-parity", r, `${t} requires explicit page parity`) };
		let i = t === "insideMargin" == (n.pageParity === "odd");
		return {
			...Ag(e === "horizontal" ? i ? "leftMargin" : "rightMargin" : i ? "topMargin" : "bottomMargin", e, n, r),
			parityRequired: !0
		};
	}
	return { problem: X("unsupported-relative-from", r, `${t} is not a valid ${e} reference`) };
}
function Mg(e, t, n) {
	let r = t.relativeSize[e], i = e === "horizontal" ? "width" : "height", a = (n = null) => {
		let r = e === "horizontal" ? t.extent.widthStatus : t.extent.heightStatus, a = e === "horizontal" ? t.extent.widthPt : t.extent.heightPt;
		return r === "missing" ? { problem: X("missing-size", `extent.${i}`, `${i} is required`) } : r !== "valid" || !Eg(a) || a <= 0 ? { problem: X("invalid-size", `extent.${i}`, `${i} extent must be finite and positive`) } : { resolved: {
			valuePt: a,
			diagnostic: {
				source: "extent",
				valuePt: a,
				relativeFrom: n?.relativeFrom ?? null,
				referenceFrame: null,
				fraction: n?.fraction ?? null,
				...n === null ? {} : { compatibilityFallback: vg.id }
			}
		} };
	};
	if (r === null) return a();
	let o = `relativeSize.${e}`;
	if (r.fractionStatus === "missing" || r.fraction === null) return { problem: X("missing-relative-size-fraction", `${o}.fraction`, "relative size fraction is required") };
	if (r.fractionStatus !== "valid" || !Eg(r.fraction)) return { problem: X("invalid-relative-size-fraction", `${o}.fraction`, "relative size fraction must be finite") };
	if (r.fraction < 0) return { problem: X("invalid-relative-size-fraction", `${o}.fraction`, "relative size fraction must be non-negative") };
	if (Sg(r.fraction)) return a({
		relativeFrom: r.relativeFrom,
		fraction: r.fraction
	});
	if (r.relativeFromStatus === "missing" || r.relativeFrom === null) return { problem: X("missing-relative-size-reference", `${o}.relativeFrom`, "relative size reference is required") };
	if (r.relativeFromStatus !== "valid") return { problem: X("invalid-relative-size-reference", `${o}.relativeFrom`, "relative size reference is invalid") };
	let s = jg(e, r.relativeFrom, n, `${o}.relativeFrom`);
	if (!s.base) return { problem: X(s.problem?.code === "missing-reference-frame" ? "missing-relative-size-reference" : "invalid-relative-size-reference", `${o}.relativeFrom`, s.problem?.message ?? "relative size reference cannot be resolved") };
	let c = (s.base.endPt - s.base.startPt) * r.fraction;
	return !Eg(c) || c < 0 ? { problem: X("invalid-relative-size-fraction", `${o}.fraction`, "relative size result must be finite and non-negative") } : { resolved: {
		valuePt: c,
		diagnostic: {
			source: "relative",
			valuePt: c,
			relativeFrom: r.relativeFrom,
			referenceFrame: s.base.referenceFrame,
			fraction: r.fraction
		}
	} };
}
function Ng(e, t, n, r) {
	let i = n[e], a = e;
	if (i.relativeFromStatus === "missing" || i.relativeFrom === null) {
		let t = X("missing-relative-from", `${a}.relativeFrom`, `${e} relativeFrom is required`);
		return {
			diagnostic: Z(e, n, t),
			problem: t
		};
	}
	if (i.relativeFromStatus !== "valid") {
		let t = X("invalid-relative-from", `${a}.relativeFrom`, `${e} relativeFrom is invalid`);
		return {
			diagnostic: Z(e, n, t),
			problem: t
		};
	}
	let o = jg(e, i.relativeFrom, r, `${a}.relativeFrom`);
	if (!o.base) {
		let t = o.problem;
		return {
			diagnostic: Z(e, n, t),
			problem: t
		};
	}
	let s = i.choice;
	if (s.kind === "missing") {
		let t = X("missing-axis-choice", `${a}.choice`, `${e} choice is required`);
		return {
			diagnostic: Z(e, n, t),
			problem: t
		};
	}
	if (s.kind === "invalid") {
		let t = X("invalid-axis-choice", `${a}.choice`, `${e} choice is invalid`);
		return {
			diagnostic: Z(e, n, t),
			problem: t
		};
	}
	let c = o.base.endPt - o.base.startPt, l, u;
	if (s.kind === "offset") {
		if (!Eg(s.valuePt)) {
			let t = X("invalid-axis-value", `${a}.choice`, "offset must be finite");
			return {
				diagnostic: Z(e, n, t),
				problem: t
			};
		}
		l = o.base.startPt + s.valuePt, u = s.valuePt;
	} else if (s.kind === "percent") {
		if (!Eg(s.fraction)) {
			let t = X("invalid-axis-value", `${a}.choice`, "percentage must be finite");
			return {
				diagnostic: Z(e, n, t),
				problem: t
			};
		}
		l = o.base.startPt + c * s.fraction, u = s.fraction;
	} else if (s.kind === "align") {
		if (!(e === "horizontal" ? [
			"left",
			"center",
			"right",
			"inside",
			"outside"
		].includes(s.value) : [
			"top",
			"center",
			"bottom",
			"inside",
			"outside"
		].includes(s.value))) {
			let t = X("invalid-axis-value", `${a}.choice`, `${s.value} is invalid`);
			return {
				diagnostic: Z(e, n, t),
				problem: t
			};
		}
		if ((s.value === "inside" || s.value === "outside") && r.pageParity === null) {
			let t = X("missing-page-parity", "frames.pageParity", `${s.value} alignment requires explicit page parity`);
			return {
				diagnostic: Z(e, n, t),
				problem: t
			};
		}
		let i = e === "horizontal" ? "left" : "top", d = e === "horizontal" ? "right" : "bottom", f = s.value === "inside", p = r.pageParity === "odd", m = s.value === i || f && p || s.value === "outside" && !p, h = s.value === d || f && !p || s.value === "outside" && p;
		l = m ? o.base.startPt : h ? o.base.endPt - t : o.base.startPt + (c - t) / 2, u = s.value;
	} else {
		let t = X("invalid-axis-choice", `${a}.choice`, `${e} choice is invalid`);
		return {
			diagnostic: Z(e, n, t),
			problem: t
		};
	}
	if (!Eg(l)) {
		let t = X("invalid-axis-value", `${a}.choice`, "resolved origin is not finite");
		return {
			diagnostic: Z(e, n, t),
			problem: t
		};
	}
	return {
		valuePt: l,
		diagnostic: {
			axis: e,
			status: "resolved",
			relativeFrom: i.relativeFrom,
			referenceFrame: o.base.referenceFrame,
			choiceKind: s.kind,
			choiceValue: u,
			baseStartPt: o.base.startPt,
			baseEndPt: o.base.endPt,
			resolvedOriginPt: l,
			pageParity: s.kind === "align" && (s.value === "inside" || s.value === "outside") ? r.pageParity : null
		}
	};
}
function Pg(e, t, n) {
	let r = e === "horizontal" ? n.xPt : n.yPt, i = e === "horizontal" ? n.xPt + n.widthPt : n.yPt + n.heightPt, a = r + t;
	return {
		valuePt: a,
		diagnostic: {
			axis: e,
			status: "resolved",
			relativeFrom: "page",
			referenceFrame: "page",
			choiceKind: "simple-position",
			choiceValue: t,
			baseStartPt: r,
			baseEndPt: i,
			resolvedOriginPt: a,
			pageParity: null
		}
	};
}
var Fg = [
	"top",
	"right",
	"bottom",
	"left"
];
function Ig(e, t) {
	return e[`${t}Status`];
}
function Lg(e, t) {
	return e[`${t}Pt`];
}
function Rg(e, t, n) {
	let r = Fg.some((t) => Ig(e, t) !== "missing");
	if (!n && !r) return { values: {
		topPt: 0,
		rightPt: 0,
		bottomPt: 0,
		leftPt: 0
	} };
	let i = {
		topPt: 0,
		rightPt: 0,
		bottomPt: 0,
		leftPt: 0
	};
	for (let n of Fg) {
		let r = Ig(e, n), a = Lg(e, n);
		if (r !== "valid" || !Eg(a)) return { problem: X("invalid-effect-extent", `${t}.${n}`, "present effectExtent requires four finite edge values") };
		i[`${n}Pt`] = a;
	}
	return { values: i };
}
function zg(e, t) {
	let n = {
		topPt: 0,
		rightPt: 0,
		bottomPt: 0,
		leftPt: 0
	}, r = {};
	for (let i of Fg) {
		let a = Ig(t, i), o = Ig(e, i), s = a === "valid" || a === "invalid" ? {
			status: a,
			value: Lg(t, i),
			source: "wrap"
		} : o === "valid" || o === "invalid" ? {
			status: o,
			value: Lg(e, i),
			source: "anchor"
		} : {
			status: "missing",
			value: null,
			source: "implicit-zero"
		};
		if (s.status === "invalid" || s.status === "valid" && (!Eg(s.value) || s.value < 0)) return { problem: X("invalid-distance", `${s.source === "wrap" ? "wrap.distances" : "anchorDistances"}.${i}`, "wrap distance must be finite and non-negative") };
		n[`${i}Pt`] = s.status === "missing" ? 0 : s.value, r[i] = s.source;
	}
	return { resolved: {
		values: n,
		sources: r
	} };
}
function Bg(e, t) {
	let n = {
		xPt: e.xPt - t.leftPt,
		yPt: e.yPt - t.topPt,
		widthPt: e.widthPt + t.leftPt + t.rightPt,
		heightPt: e.heightPt + t.topPt + t.bottomPt
	};
	return Dg(n) ? n : null;
}
function Vg(e, t) {
	let n = e.wrap.polygon;
	if (n === null || n.invalidPointCount !== 0 || n.coordinateSpace.width !== Tg || n.coordinateSpace.height !== Tg || n.points.length < 3) return { problem: X("invalid-wrap-polygon", "wrap.polygon", "tight and through wrapping require a valid fixed 21600 by 21600 polygon") };
	let r = [];
	for (let [e, i] of n.points.entries()) {
		if (!Eg(i.x) || !Eg(i.y)) return { problem: X("invalid-wrap-polygon", `wrap.polygon.points.${e}`, "polygon coordinates must be finite") };
		r.push({
			xPt: t.xPt + i.x / Tg * t.widthPt,
			yPt: t.yPt + i.y / Tg * t.heightPt
		});
	}
	let i = r.map((e) => e.xPt), a = r.map((e) => e.yPt), o = Math.min(...i), s = Math.max(...i), c = Math.min(...a), l = Math.max(...a);
	return {
		polygon: {
			edited: n.edited,
			points: r
		},
		bounds: {
			xPt: o,
			yPt: c,
			widthPt: s - o,
			heightPt: l - c
		}
	};
}
function Hg(e) {
	return {
		coordinateSpace: "anchor-frame",
		groupApplication: "parser-resolved-child-frame",
		group: e === null ? null : {
			childSourceId: e.childSourceId,
			sourceIndex: e.sourceIndex,
			sourceCount: e.sourceCount,
			transformChain: e.transformChain.map((e) => ({ ...e })),
			childTransform: e.childTransform === null ? null : { ...e.childTransform },
			resolvedChildFrame: { ...e.resolvedChildFrame }
		}
	};
}
function Ug(e) {
	return V(e, "anchor frame result");
}
function Wg(e) {
	let { acquisition: t, frames: n } = e;
	for (let e of [
		"relativeHeight",
		"behindDoc",
		"locked",
		"layoutInCell",
		"allowOverlap"
	]) {
		let n = t.behavior[`${e}Status`], r = t.behavior[e];
		if (n === "valid" && r !== null) continue;
		let i = X(n === "missing" ? "missing-required-behavior" : "invalid-required-behavior", `behavior.${e}`, `CT_Anchor requires a ${e} value`);
		return Ug({
			status: "unsupported",
			occurrenceId: t.occurrenceId,
			axes: {
				horizontal: Z("horizontal", t, i),
				vertical: Z("vertical", t, i)
			},
			issues: [i]
		});
	}
	let r = [], i = Mg("horizontal", t, n), a = Mg("vertical", t, n);
	i.problem && r.push(i.problem), a.problem && r.push(a.problem);
	let o, s, c = i.problem ?? a.problem;
	if (c || !i.resolved || !a.resolved) {
		let e = c;
		o = { diagnostic: Z("horizontal", t, e) }, s = { diagnostic: Z("vertical", t, e) };
	} else if (t.simplePosition.status === "invalid") {
		let e = X("invalid-simple-position", "simplePosition.enabled", "simplePos enablement is invalid");
		r.push(e), o = {
			diagnostic: Z("horizontal", t, e, !0),
			problem: e
		}, s = {
			diagnostic: Z("vertical", t, e, !0),
			problem: e
		};
	} else if (t.simplePosition.status === "valid" && t.simplePosition.enabled === !0) {
		let e = kg("page", "horizontal", n, "frames.page"), i = t.simplePosition.xPt, a = t.simplePosition.yPt;
		if (!e.base || n.page === null || !Dg(n.page)) {
			let n = e.problem ?? X("invalid-reference-frame", "frames.page", "simple positioning requires a valid page frame");
			r.push(n), o = {
				diagnostic: Z("horizontal", t, n, !0),
				problem: n
			}, s = {
				diagnostic: Z("vertical", t, n, !0),
				problem: n
			};
		} else if (t.simplePosition.xStatus !== "valid" || !Eg(i)) {
			let e = t.simplePosition.xStatus === "invalid", n = X(e ? "invalid-simple-position" : "missing-simple-coordinate", "simplePosition.x", e ? "simple position x is lexically invalid" : "simple position x is required");
			r.push(n), o = {
				diagnostic: Z("horizontal", t, n, !0),
				problem: n
			}, s = {
				diagnostic: Z("vertical", t, n, !0),
				problem: n
			};
		} else if (t.simplePosition.yStatus !== "valid" || !Eg(a)) {
			let e = t.simplePosition.yStatus === "invalid", n = X(e ? "invalid-simple-position" : "missing-simple-coordinate", "simplePosition.y", e ? "simple position y is lexically invalid" : "simple position y is required");
			r.push(n), o = {
				diagnostic: Z("horizontal", t, n, !0),
				problem: n
			}, s = {
				diagnostic: Z("vertical", t, n, !0),
				problem: n
			};
		} else o = Pg("horizontal", i, n.page), s = Pg("vertical", a, n.page);
	} else {
		let e = Ng("horizontal", i.resolved.valuePt, t, n), c = Ng("vertical", a.resolved.valuePt, t, n);
		o = {
			...e,
			diagnostic: e.diagnostic
		}, s = {
			...c,
			diagnostic: c.diagnostic
		}, e.problem && r.push(e.problem), c.problem && r.push(c.problem);
	}
	if (r.length > 0 || !i.resolved || !a.resolved || o.valuePt === void 0 || s.valuePt === void 0) return Ug({
		status: "unsupported",
		occurrenceId: t.occurrenceId,
		axes: {
			horizontal: o.diagnostic,
			vertical: s.diagnostic
		},
		issues: r
	});
	let l = {
		xPt: o.valuePt,
		yPt: s.valuePt,
		widthPt: i.resolved.valuePt,
		heightPt: a.resolved.valuePt
	}, u = Rg(t.parentEffectExtent, "parentEffectExtent", !1);
	if (u.problem || !u.values) {
		let e = u.problem;
		return Ug({
			status: "unsupported",
			occurrenceId: t.occurrenceId,
			axes: {
				horizontal: o.diagnostic,
				vertical: s.diagnostic
			},
			issues: [e]
		});
	}
	let d = Bg(l, u.values);
	if (d === null) {
		let e = X("invalid-effect-extent", "parentEffectExtent", "parent effect extents produce invalid ink bounds");
		return Ug({
			status: "unsupported",
			occurrenceId: t.occurrenceId,
			axes: {
				horizontal: o.diagnostic,
				vertical: s.diagnostic
			},
			issues: [e]
		});
	}
	if (t.wrap.kind === "missing" || t.wrap.kind === "invalid") {
		let e = X(t.wrap.kind === "missing" ? "missing-wrap-kind" : "invalid-wrap-kind", "wrap.kind", "exactly one valid wrap kind is required");
		return Ug({
			status: "unsupported",
			occurrenceId: t.occurrenceId,
			axes: {
				horizontal: o.diagnostic,
				vertical: s.diagnostic
			},
			issues: [e]
		});
	}
	let f = zg(t.anchorDistances, t.wrap.distances);
	if (f.problem || !f.resolved) return Ug({
		status: "unsupported",
		occurrenceId: t.occurrenceId,
		axes: {
			horizontal: o.diagnostic,
			vertical: s.diagnostic
		},
		issues: [f.problem]
	});
	let p = t.wrap.kind === "square" || t.wrap.kind === "tight" || t.wrap.kind === "through", m = p && [
		"bothSides",
		"left",
		"right",
		"largest"
	].includes(t.wrap.side ?? "") ? t.wrap.side : null;
	if (p && m === null) {
		let e = X("invalid-wrap-side", "wrap.side", "square, tight, and through wrapping require an authored wrap side");
		return Ug({
			status: "unsupported",
			occurrenceId: t.occurrenceId,
			axes: {
				horizontal: o.diagnostic,
				vertical: s.diagnostic
			},
			issues: [e]
		});
	}
	let h = u.values, g = Fg.some((e) => Ig(t.parentEffectExtent, e) !== "missing") ? "parent" : "none";
	if (t.wrap.effectExtent !== null) {
		let e = Rg(t.wrap.effectExtent, "wrap.effectExtent", !0);
		if (e.problem || !e.values) return Ug({
			status: "unsupported",
			occurrenceId: t.occurrenceId,
			axes: {
				horizontal: o.diagnostic,
				vertical: s.diagnostic
			},
			issues: [e.problem]
		});
		h = e.values, g = "wrap-child";
	}
	let _ = null, v = null, y = null;
	if (t.wrap.kind === "tight" || t.wrap.kind === "through") {
		let e = Vg(t, l);
		if (e.problem || !e.polygon || !e.bounds) return Ug({
			status: "unsupported",
			occurrenceId: t.occurrenceId,
			axes: {
				horizontal: o.diagnostic,
				vertical: s.diagnostic
			},
			issues: [e.problem]
		});
		_ = e.polygon, v = {
			width: 21600,
			height: 21600
		}, y = e.bounds, h = {
			topPt: 0,
			rightPt: 0,
			bottomPt: 0,
			leftPt: 0
		}, g = "none";
	} else if (t.wrap.kind !== "none" && (y = Bg(l, h), y === null)) {
		let e = X("invalid-effect-extent", "wrap.effectExtent", "wrapping effect extents produce invalid bounds");
		return Ug({
			status: "unsupported",
			occurrenceId: t.occurrenceId,
			axes: {
				horizontal: o.diagnostic,
				vertical: s.diagnostic
			},
			issues: [e]
		});
	}
	let b = y === null ? null : Bg(y, f.resolved.values);
	if (y !== null && b === null) {
		let e = X("invalid-distance", "wrap.distances", "distances produce invalid bounds");
		return Ug({
			status: "unsupported",
			occurrenceId: t.occurrenceId,
			axes: {
				horizontal: o.diagnostic,
				vertical: s.diagnostic
			},
			issues: [e]
		});
	}
	return Ug({
		status: "resolved",
		occurrenceId: t.occurrenceId,
		axes: {
			horizontal: o.diagnostic,
			vertical: s.diagnostic
		},
		issues: [],
		geometry: {
			objectFrame: l,
			inkBounds: d,
			wrapBounds: b,
			size: {
				horizontal: i.resolved.diagnostic,
				vertical: a.resolved.diagnostic
			},
			parentEffectExtent: u.values,
			wrap: {
				kind: t.wrap.kind,
				side: m,
				distances: f.resolved.values,
				distanceSources: f.resolved.sources,
				effectExtent: h,
				effectExtentSource: g,
				coordinateSpace: v,
				polygon: _
			},
			transform: Hg(t.group)
		}
	});
}
//#endregion
//#region packages/docx/src/layout/paragraph-spacing.ts
function Gg(e, t, n, r) {
	if (!e) return r;
	let i = !!(e.styleId && e.styleId === t.styleId), a = !!(i && e.contextualSpacing), o = !!(i && t.contextualSpacing);
	return a && o ? 0 : o ? n : a ? Math.max(r - n, 0) : Math.max(n, r);
}
function Kg(e, t, n, r) {
	let i = Gg(e, t, n, r), a = i <= n;
	return {
		suppressBefore: a,
		overlap: n + (a ? 0 : r) - i
	};
}
//#endregion
//#region packages/docx/src/layout/pagination-fields.ts
function qg(e) {
	return Object.freeze(e.pages.map((e) => Object.freeze({
		pageIndex: e.pageIndex,
		displayPageNumber: e.pageNumber.displayNumber,
		pageNumberFormat: e.pageNumber.format
	})));
}
function Jg(e) {
	if (e.fieldType === "page") return "page";
	if (/numPages/i.test(e.fieldType) || /NUMPAGES/i.test(e.instruction)) return "total-pages";
}
function Yg(e) {
	return e.some((e) => e.type === "paragraph" ? e.runs.some((e) => e.type === "field" ? Jg(e) !== void 0 : !1) : e.type === "table" ? e.rows.some((e) => e.cells.some((e) => Yg(e.content))) : !1);
}
function Xg(e, t = [], n = []) {
	return Yg(e) || t.some((e) => Yg(e.content)) || n.some((e) => Yg(e));
}
//#endregion
//#region packages/docx/src/layout/paragraph-wrap-registry.ts
var Zg = /* @__PURE__ */ new WeakMap(), Qg = "table-final-frame:";
function $g(e) {
	let t = new Set(e.drawings.flatMap((e) => {
		let t = e.anchorLayer?.acquisitionOccurrenceId ?? e.anchorLayer?.occurrenceId;
		return t === void 0 ? [] : [t];
	}));
	return Object.freeze({
		exclusions: Object.freeze(e.exclusions.filter((e) => !e.id.startsWith("table-final-frame:") && (e.anchorOccurrenceId === void 0 || !t.has(e.anchorOccurrenceId)))),
		collisions: Object.freeze((e.anchorCollisions ?? []).filter((e) => !t.has(e.occurrenceId)))
	});
}
function e_(e) {
	return new Set((e.anchorFrames ?? []).flatMap((e) => e.status === "resolved" ? [e.occurrenceId] : []));
}
function t_(e) {
	let t = e_(e), n = (e.anchorCollisions ?? []).filter((e) => t.has(e.occurrenceId)), r = new Set(n.map((e) => e.occurrenceId));
	for (let e of t) if (!r.has(e)) throw Error(`Paragraph anchor omitted collision geometry: ${e}`);
	return Object.freeze(n);
}
function n_(e) {
	let t = e_(e);
	return Object.freeze(e.exclusions.filter((e) => e.anchorOccurrenceId !== void 0 && t.has(e.anchorOccurrenceId)));
}
function r_(e) {
	return Object.freeze({
		flowDomainId: e,
		collisions: Object.freeze([]),
		exclusions: Object.freeze([])
	});
}
function i_(e, t) {
	let n = Zg.get(e);
	n || (n = /* @__PURE__ */ new Map(), Zg.set(e, n));
	let r = n.get(t);
	if (r) return r;
	let i = r_(t);
	return n.set(t, i), i;
}
function a_(e, t, n) {
	let r = Zg.get(e);
	if (!r || r.get(t.flowDomainId) !== t) throw Error("Paragraph wrap registry transaction is stale");
	r.set(t.flowDomainId, o_(t, n));
}
function o_(e, t) {
	if (t.flowDomainId !== e.flowDomainId) throw Error("Paragraph wrap registry cannot cross flow domains");
	let n = new Set(e.collisions.map((e) => e.occurrenceId)), r = t_(t);
	for (let e of r) {
		if (n.has(e.occurrenceId)) throw Error(`Paragraph wrap occurrence committed twice: ${e.occurrenceId}`);
		n.add(e.occurrenceId);
	}
	let i = n_(t), a = new Set(r.map((e) => e.occurrenceId)), o = /* @__PURE__ */ new Set();
	for (let e of i) {
		let t = e.anchorOccurrenceId;
		if (t === void 0 || !a.has(t)) throw Error("Owned paragraph wrap exclusion omitted its collision occurrence");
		if (o.has(t)) throw Error(`Paragraph wrap occurrence produced duplicate exclusions: ${t}`);
		o.add(t);
	}
	return Object.freeze({
		flowDomainId: e.flowDomainId,
		collisions: Object.freeze([...e.collisions, ...r]),
		exclusions: Object.freeze([...e.exclusions, ...i])
	});
}
//#endregion
//#region packages/docx/src/layout/paragraph.ts
function s_(e, t) {
	if (!Number.isFinite(e) || e < 0) throw RangeError(`${t} must be finite and non-negative`);
	return e;
}
function c_(e) {
	if (!(!e || e.type !== "text" && e.type !== "field")) return e.typographyInput;
}
function l_(e) {
	switch (e) {
		case "left": return "left";
		case "right": return "right";
		default: return "center";
	}
}
function u_(e) {
	return s_(e.measuredWidthPt, "segment.measuredWidthPt");
}
function d_(e) {
	return e.map((e) => e.kind === "text" && !e.fixedPitch ? { text: e.text } : {});
}
function f_(e) {
	return e === "lowKashida" ? "low" : e === "mediumKashida" ? "medium" : e === "highKashida" ? "high" : null;
}
function p_(e, t) {
	if (!e.textLayoutService || !e.textShapeRequest) throw Error("Kashida acquisition requires the retained TextLayoutService authority");
	let n = e.textLayoutService.shape({
		...e.textShapeRequest,
		text: t,
		measure: !0
	}), r = e.basePaintOps[0]?.scaleX ?? 1, i = e.basePaintOps[0]?.letterSpacingPt ?? 0;
	return n.advancePt * r + [...t].length * i;
}
function m_(e, t) {
	if (!e) return null;
	let n = wh(e), r = /* @__PURE__ */ new Map(), i = 0;
	for (let [n, a] of e.perSeg) {
		let e = t[n], o = a.splitBefore;
		if (e?.kind === "text") {
			let t = new Set(e.clusters.slice(1).map((t) => t.range.start - e.range.start)), n = [...e.text], r = [0];
			for (let e of n) r.push((r.at(-1) ?? 0) + e.length);
			o = o.filter((e) => t.has(r[e] ?? -1));
		}
		let s = t[n + 1], c = a.trailingGap && !(s?.kind === "text" && s.breakBefore === !1);
		i += o.length + +!!c, r.set(n, {
			splitBefore: [...o],
			trailingGap: c,
			internalStretch: 0
		});
	}
	if (i === 0) return null;
	let a = n / i;
	for (let e of r.values()) e.internalStretch = e.splitBefore.length * a;
	return {
		perGap: a,
		perSeg: r
	};
}
function h_(e, t, n) {
	if (!t || t.splitBefore.length === 0) return {
		clusters: e.clusters,
		paintOps: e.basePaintOps
	};
	let r = [...e.text], i = [...t.splitBefore];
	if (i.some((e, t) => e <= 0 || e >= r.length || t > 0 && e <= (i[t - 1] ?? 0))) throw Error("Internal paragraph justification contains an invalid code-point cut");
	let a = [0];
	for (let e of r) a.push((a.at(-1) ?? 0) + e.length);
	let o = i.map((e) => a[e] ?? -1), s = new Set(e.clusters.map((t) => t.range.start - e.range.start));
	if (o.some((e) => !s.has(e))) throw Error("Internal paragraph justification must split at shaped cluster boundaries");
	let c = [
		0,
		...i,
		r.length
	], l = [];
	for (let t = 0; t < c.length - 1; t += 1) {
		let r = c[t] ?? 0, i = c[t + 1] ?? r, o = e.range.start + (a[r] ?? 0), s = e.clusters.find((e) => e.range.start === o);
		if (!s) throw Error("Internal paragraph justification is missing shaped cluster geometry");
		l.push({
			range: {
				start: o,
				end: e.range.start + (a[i] ?? 0)
			},
			offset: {
				xPt: s.offset.xPt + t * n,
				yPt: s.offset.yPt
			}
		});
	}
	let u = e.clusters.map((t) => {
		let r = t.range.start - e.range.start, i = o.filter((e) => e <= r).length;
		return {
			...t,
			offset: {
				...t.offset,
				xPt: t.offset.xPt + i * n
			}
		};
	});
	if (e.basePaintOps.length > 1) {
		let t = e.range.start;
		for (let n of e.basePaintOps) {
			if (n.range.start !== t || n.range.end <= n.range.start) throw Error("Internal paragraph justification has incomplete retained paint operations");
			t = n.range.end;
		}
		if (t !== e.range.end) throw Error("Internal paragraph justification has incomplete retained paint operations");
		let r = o.map((t) => e.range.start + t), i = [...new Set([
			e.range.start,
			e.range.end,
			...r,
			...e.basePaintOps.flatMap((e) => [e.range.start, e.range.end])
		])].sort((e, t) => e - t), a = [];
		for (let t = 0; t < i.length - 1; t += 1) {
			let o = i[t] ?? e.range.start, s = i[t + 1] ?? o, c = e.basePaintOps.find((e) => e.range.start <= o && e.range.end >= s);
			if (!c) throw Error("Internal paragraph justification lost a retained paint slice");
			let l = r.filter((e) => e <= o).length, d = u.find((e) => e.range.start === o);
			if (!d) throw Error("Internal paragraph justification is missing retained slice geometry");
			a.push({
				...c,
				text: c.text.slice(o - c.range.start, s - c.range.start),
				range: {
					start: o,
					end: s
				},
				offset: o === c.range.start ? {
					...c.offset,
					xPt: c.offset.xPt + l * n
				} : d.offset
			});
		}
		return {
			clusters: u,
			paintOps: a
		};
	}
	let d = e.basePaintOps.length === 1 ? e.basePaintOps[0] : void 0;
	if (!d) throw Error("Internal paragraph justification requires one contextual paint op");
	return i.length === r.length - 1 && i.every((e, t) => e === t + 1) ? {
		clusters: u,
		paintOps: [{
			...d,
			letterSpacingPt: d.letterSpacingPt + n
		}]
	} : {
		clusters: u,
		paintOps: l.map((t) => ({
			...d,
			text: e.text.slice(t.range.start - e.range.start, t.range.end - e.range.start),
			range: t.range,
			offset: t.offset
		}))
	};
}
function g_(e, t) {
	return e.flatMap((e) => {
		let n = e.text.trimEnd();
		if (n === "" || n.length === e.text.length) return [e];
		if (e.sourceMapping === "kashida") return [{
			...e,
			text: n
		}];
		let r = e.range.start + n.length, i = t.find((e) => e.range.start === r), { inkBounds: a, blockAxisInkBounds: o, ...s } = e;
		return [{
			...e,
			text: n,
			range: {
				...e.range,
				end: r
			}
		}, {
			...s,
			text: e.text.slice(n.length),
			range: {
				start: r,
				end: e.range.end
			},
			offset: i?.offset ?? e.offset
		}];
	});
}
function __(e, t) {
	return e === void 0 || t === void 0 ? e === t : e.length === t.length && e.every((e, n) => e === t[n]);
}
function v_(e, t) {
	if (e === t) return !0;
	let n = 2 ** -52 * Math.max(1, Math.abs(e) + Math.abs(t));
	return Math.abs(e - t) <= n;
}
function y_(e, t) {
	return e.kind === "underline" && e.kind === t.kind && e.authoredStyle === t.authoredStyle && e.style === t.style && e.color === t.color && e.widthPt === t.widthPt && v_(e.to.xPt, t.from.xPt) && __(e.dashPatternPt, t.dashPatternPt);
}
function b_(e, t) {
	let n = Math.max(e.from.yPt, t.from.yPt), r = {
		xPt: e.from.xPt,
		yPt: n
	}, i = {
		xPt: t.to.xPt,
		yPt: n
	}, { path: a, ...o } = e;
	return {
		...o,
		from: r,
		to: i,
		...e.style === "wavy" ? { path: pg(r, i, e.widthPt) } : {}
	};
}
function x_(e, t) {
	let n = Math.min(t, Math.max(0, e.to.xPt - e.from.xPt)), r = e.from, i = {
		...e.to,
		xPt: e.to.xPt - n
	}, { path: a, ...o } = e;
	return {
		...o,
		from: r,
		to: i,
		...e.style === "wavy" ? { path: pg(r, i, e.widthPt) } : {}
	};
}
function S_(e) {
	let t = [];
	e.forEach((n, r) => {
		if (n.kind !== "text" && n.kind !== "tab" || !n.decorations) {
			t = [];
			return;
		}
		let i = [], a = [], o = /* @__PURE__ */ new Set();
		for (let s of n.decorations) {
			let n = t.filter((e) => !o.has(e) && y_(e.decoration, s)).sort((e, t) => Math.abs(e.decoration.from.yPt - s.from.yPt) - Math.abs(t.decoration.from.yPt - s.from.yPt))[0];
			if (n) {
				o.add(n);
				let t = e[n.placementIndex];
				if (!t || t.kind !== "text" && t.kind !== "tab" || !t.decorations) throw Error("Continuous decoration owner left the retained line");
				let r = [...t.decorations], i = b_(n.decoration, s);
				r[n.decorationIndex] = i, e[n.placementIndex] = {
					...t,
					decorations: r
				}, a.push({
					...n,
					decoration: i
				});
			} else {
				let e = i.length;
				i.push(s), a.push({
					placementIndex: r,
					decorationIndex: e,
					decoration: s
				});
			}
		}
		e[r] = {
			...n,
			decorations: i
		}, t = a;
	});
}
function C_(e) {
	let { line: t } = e, n = t.segments, r = e.baseRtl || xl(n), i = Sl(n.map((e) => e.kind === "tab" ? { isTab: !0 } : e.kind === "text" ? {
		text: e.text,
		rtl: e.rtl,
		digitsAsAN: e.digitsAsAN
	} : {}), e.baseRtl), a = n.reduce((e, t) => e + u_(t), 0), o = e.paragraphXPt + t.xOffsetPt, s = Math.min(e.availableWidthPt, t.availableWidthPt), c = e.isFirstLine ? e.numbering ? s_(e.numbering.bodyOffsetPt, "numbering.bodyOffsetPt") : e.firstLineIndentPt ?? 0 : 0, l = e.baseRtl ? 0 : c, u = (e.baseRtl ? s - c : s) - l - a, d = e.isLastLine || t.endsWithBreak, f = e.displayMathJustification === void 0 ? Cl(e.alignment, e.baseRtl) : l_(e.displayMathJustification), p = f === "justify" && (!d || e.stretchLastLine), m = p ? f_(e.alignment) : null;
	if (m && u > 0) {
		let e = Qh(n.map((e) => e.kind === "text" ? { text: e.text } : {}), u, m, (e, t) => {
			let r = n[e];
			return r?.kind === "text" ? p_(r, t) : 0;
		});
		e && (n = n.map((t, n) => {
			if (t.kind !== "text") return t;
			let r = e.perSeg.get(n);
			if (!r) return t;
			let i = t.basePaintOps[0];
			if (!i) throw Error("Kashida acquisition requires a contextual text paint operation");
			return {
				...t,
				measuredWidthPt: t.measuredWidthPt + r.advanceDeltaPx,
				basePaintOps: [{
					...i,
					text: r.text,
					sourceMapping: "kashida"
				}]
			};
		}), a += e.appliedPx, u = e.residualPx);
	}
	let h = i.order.at(-1) ?? -1, g = 0;
	if (!r) {
		let e = n.findIndex((e) => e.kind !== "text" || /\S/.test(e.text));
		g = e < 0 ? 0 : e;
	}
	let _ = null, v = 0, y = 0, b = d_(n);
	if (p) {
		let i = m_(Ch(b, u, g, r ? h : n.length, -(t.baselinePt - t.topPt) * .25, u > 0, e.alignment === "thaiDistribute" && u > 0), n);
		_ = i?.perSeg ?? null, v = i?.perGap ?? 0, y = wh(i);
	}
	let x = a + y, S = u - y, C = f === "right" ? S : f === "center" ? S / 2 : f === "justify" && e.baseRtl && !p ? S : 0, w = o + l, T = e.decimalAutoTabPt === void 0 ? C : Math.max(0, e.paragraphXPt + e.decimalAutoTabPt - x - w), E = w + T, D = [], O = /* @__PURE__ */ new Map();
	for (let r of i.order) {
		let a = n[r];
		if (!a) continue;
		let o = _?.get(r), s = o?.internalStretch ?? 0, c = u_(a) + s;
		if (a.kind === "tab") {
			let e = {
				xPt: E,
				yPt: t.topPt,
				widthPt: a.measuredWidthPt,
				heightPt: t.advancePt
			}, n = a.underline ? mg({
				origin: {
					xPt: E,
					yPt: t.baselinePt
				},
				advancePt: a.measuredWidthPt,
				base: a.underline.base,
				color: a.underline.color,
				underline: a.underline
			}) : void 0;
			D.push({
				kind: "tab",
				range: a.range,
				bounds: e,
				advancePt: a.measuredWidthPt,
				leader: a.leader,
				...n?.length ? { decorations: n } : {},
				...a.leader === "none" ? {} : a.leaderShape ? { leaderGlyphs: sg({
					interval: e,
					baselinePt: t.baselinePt,
					...a.leaderShape
				}) } : {}
			});
		} else if (a.kind === "resource") D.push({
			kind: "resource",
			range: a.range,
			...a.sourceRunIndex === void 0 ? {} : { sourceRunIndex: a.sourceRunIndex },
			resourceKey: a.resourceKey,
			resourceKind: a.resourceKind,
			...a.orientation ? { orientation: a.orientation } : {},
			bounds: {
				xPt: E,
				yPt: t.baselinePt + a.topOffsetPt,
				widthPt: a.widthPt,
				heightPt: a.heightPt
			},
			advancePt: a.measuredWidthPt
		});
		else if (a.kind === "unavailable-resource" || a.kind === "inline-drawing") D.push({
			kind: "drawing",
			range: a.range,
			drawingId: a.drawingId,
			bounds: {
				xPt: E,
				yPt: t.baselinePt + a.topOffsetPt,
				widthPt: a.widthPt,
				heightPt: a.heightPt
			},
			advancePt: a.measuredWidthPt
		});
		else if (a.kind === "anchor-host") D.push({
			kind: "anchor-host",
			range: a.range,
			bounds: {
				xPt: E,
				yPt: t.topPt,
				widthPt: 0,
				heightPt: t.advancePt
			},
			baselinePt: t.baselinePt,
			...a.sourceMetrics ? { sourceMetrics: a.sourceMetrics } : {},
			...a.anchorOccurrenceId ? { anchorOccurrenceId: a.anchorOccurrenceId } : {}
		});
		else {
			let { measuredWidthPt: n, breakBefore: s, rtl: l, digitsAsAN: u, fixedPitch: d, decorationTerminalAdvancePt: f, textLayoutService: p, textShapeRequest: m, selectedFaceFontBox: h, retainedGeometry: g, direction: _, ...y } = a, b = h_(a, o, v), x = i.rtl[r] ? "rtl" : "ltr", S = x === "rtl" ? g_(b.paintOps, b.clusters) : b.paintOps, C = a.text.trimEnd().length, w = x === "rtl" ? (y.fitText?.trailingPadPt ?? 0) + a.clusters.filter((e) => e.range.start >= a.range.start + C).reduce((e, t) => e + t.advancePt, 0) : 0, T = o?.trailingGap ? v : 0, k = {
				xPt: E + w,
				yPt: t.baselinePt
			}, A = b.paintOps[0]?.offset.yPt ?? 0, j = {
				xPt: E,
				yPt: t.baselinePt + A
			}, M = g ? mg({
				origin: j,
				advancePt: c + T,
				base: g.base,
				color: K_(y.color),
				...g.underline ? { underline: g.underline } : {},
				...g.strike ? { strike: g.strike } : {}
			}) : y.decorations, N = g?.emphasis ? {
				authored: g.emphasis.authored,
				glyphs: hg({
					authored: g.emphasis.authored,
					glyph: g.emphasis.glyph,
					origin: {
						xPt: k.xPt,
						yPt: t.baselinePt + A
					},
					clusters: b.clusters,
					clusterInk: g.emphasis.clusterInk,
					mark: g.emphasis.mark,
					scaleX: a.basePaintOps[0]?.scaleX ?? 1
				})
			} : void 0, P = h ?? g?.base, ee = P ? {
				xPt: E,
				yPt: t.baselinePt + A - P.ascentPt,
				widthPt: c + T,
				heightPt: P.ascentPt + P.descentPt
			} : {
				xPt: E,
				yPt: t.topPt,
				widthPt: c + T,
				heightPt: t.advancePt
			}, te = {
				...y,
				kind: "text",
				origin: k,
				bounds: {
					xPt: E,
					yPt: t.topPt,
					widthPt: c,
					heightPt: t.advancePt
				},
				highlightBounds: ee,
				advancePt: c,
				clusters: b.clusters,
				paintOps: S.map((e) => ({
					...e,
					direction: x
				})),
				decorations: M,
				...N ? { emphasis: N } : {},
				direction: x,
				...T === 0 ? {} : { ownedTrailingSlackPt: T },
				...y.highlight || y.background ? { highlightFragments: [{
					rect: y.highlight || !e.exactLineSpacing ? ee : {
						xPt: E,
						yPt: t.topPt,
						widthPt: c + T,
						heightPt: t.advancePt
					},
					color: y.highlight ?? y.background
				}] } : {},
				...y.ruby ? { ruby: {
					...y.ruby,
					paintOps: y.ruby.paintOps.map((e) => ({
						...e,
						origin: {
							xPt: e.origin.xPt + E + (c - a.measuredWidthPt) / 2,
							yPt: e.origin.yPt + t.baselinePt
						}
					}))
				} } : {}
			}, F = f === void 0 ? 0 : Math.max(0, c + T - f);
			x === "ltr" && F > 0 && O.set(D.length, F), D.push(te);
		}
		E += c, o?.trailingGap && (E += v);
	}
	for (let [e, t] of O) {
		let n = D[e];
		if (n?.kind !== "text" || !n.decorations) continue;
		let r = D[e + 1], i = n.decorations.map((e) => e.kind === "underline" ? (r?.kind === "text" || r?.kind === "tab") && r.decorations?.some((t) => y_(e, t)) ? e : x_(e, t) : e);
		D[e] = {
			...n,
			decorations: i
		};
	}
	for (let e = 0; e < D.length;) {
		let t = D[e];
		if (t?.kind !== "text" || !t.runBorder) {
			e += 1;
			continue;
		}
		let n = e + 1;
		for (; n < D.length;) {
			let e = D[n];
			if (e?.kind !== "text" || !e.runBorder) break;
			n += 1;
		}
		let r = _g(D.slice(e, n).map((e) => ({
			bounds: e.bounds,
			trailingSlackPt: e.ownedTrailingSlackPt ?? 0,
			border: e.runBorder
		})));
		D[e] = {
			...t,
			runBorderFragments: r
		}, e = n;
	}
	return S_(D), Nn({
		range: t.range,
		bounds: {
			xPt: w + T,
			yPt: t.topPt,
			widthPt: x,
			heightPt: t.advancePt
		},
		baselinePt: t.baselinePt,
		advancePt: t.advancePt,
		placements: D
	});
}
function w_(e) {
	let t = e.continuation, n = t?.lineStart ?? 0, r = t?.lineEnd ?? e.lines.length;
	if (n < 0 || r < n || r > e.lines.length) throw RangeError("Paragraph continuation line range is outside the retained lines");
	let i = t?.continuesFromPrevious ? 0 : e.spacing.beforePt;
	for (let a = n; a < r; a += 1) {
		let r = e.lines[a];
		if (r) {
			if (a === 0 && !t?.continuesFromPrevious) i += Math.max(0, r.bounds.yPt - (e.flowBounds.yPt + e.spacing.beforePt));
			else if (a > n) {
				let t = e.lines[a - 1];
				i += Math.max(0, r.bounds.yPt - ((t?.bounds.yPt ?? r.bounds.yPt) + (t?.advancePt ?? 0)));
			}
			i += s_(r.advancePt, "line.advancePt");
		}
	}
	return e.lines.length === 0 && e.paragraphMark && (i += s_(e.paragraphMark.bounds.heightPt, "paragraphMark.heightPt")), t?.continuesOnNext || (i += e.spacing.afterPt), i;
}
function T_(e) {
	let t = e.continuation?.lineStart ?? 0, n = e.continuation?.lineEnd ?? e.lines.length, r = e.lines.slice(t, n), i = e.continuation ? w_(e) : s_(e.flowBounds.heightPt, "flowBounds.heightPt");
	return Nn({
		kind: "paragraph",
		id: e.id,
		source: e.source,
		...e.paragraphId === void 0 ? {} : { paragraphId: e.paragraphId },
		flowDomainId: e.flowDomainId,
		ordinaryFlow: e.ordinaryFlow,
		...e.styleId === void 0 ? {} : { styleId: e.styleId },
		...e.bookmarkStarts?.length ? { bookmarkStarts: e.bookmarkStarts } : {},
		flowBounds: {
			...e.flowBounds,
			heightPt: i
		},
		inkBounds: e.inkBounds,
		...e.clipBounds ? { clipBounds: e.clipBounds } : {},
		advancePt: i,
		spacing: e.spacing,
		contextualSpacing: e.contextualSpacing ?? !1,
		lines: r,
		borders: e.borders,
		...e.shading ? { shading: e.shading } : {},
		resources: e.resources,
		drawings: e.drawings,
		textBoxes: e.textBoxes,
		events: e.events,
		exclusions: e.exclusions,
		...e.cellContainmentBounds ? { cellContainmentBounds: e.cellContainmentBounds } : {},
		...e.anchorCollisions?.length ? { anchorCollisions: e.anchorCollisions } : {},
		...e.anchorFrames ? { anchorFrames: e.anchorFrames } : {},
		...e.paragraphMark ? { paragraphMark: e.paragraphMark } : {},
		...e.continuation ? { continuation: e.continuation } : {}
	});
}
function E_(e, t) {
	return {
		...e,
		path: [...e.path, t]
	};
}
function D_(e, t) {
	if (e.status === "planned") return Object.freeze([]);
	let n = Object.freeze({
		...t,
		path: Object.freeze([...t.path])
	});
	return Object.freeze(e.diagnostics.map((e) => Object.freeze({
		...e,
		source: n
	})));
}
function O_(e) {
	return rt(e);
}
function k_(e, t) {
	return nt("unavailable-drawing", E_(e, t));
}
function A_(e, t) {
	return Object.freeze({
		code: "MISSING_RESOURCE",
		severity: "warning",
		source: Object.freeze({
			...t,
			path: Object.freeze([...t.path])
		}),
		message: `Drawing ${e} resource is unavailable`
	});
}
function j_(e) {
	return Jg(e) || (/^date$/i.test(e.fieldType) ? "date" : /^time$/i.test(e.fieldType) ? "time" : "document");
}
function M_(e) {
	return e.sourceRunIndex;
}
function N_(e) {
	if (!e.textLayoutService || !e.textShapeRequest) return;
	let t = e.textLayoutService.shape({
		...e.textShapeRequest,
		text: e.text,
		measure: !0
	});
	return {
		ascentPt: t.ascentPt,
		descentPt: t.descentPt
	};
}
var P_ = Object.freeze({
	yellow: "#FFFF00",
	cyan: "#00FFFF",
	green: "#00FF00",
	magenta: "#FF00FF",
	blue: "#0000FF",
	red: "#FF0000",
	darkBlue: "#000080",
	darkCyan: "#008080",
	darkGreen: "#008000",
	darkMagenta: "#800080",
	darkRed: "#800000",
	darkYellow: "#808000",
	darkGray: "#808080",
	lightGray: "#C0C0C0",
	black: "#000000",
	white: "#FFFFFF"
});
function F_(e) {
	return e.startsWith("#") ? e : P_[e] ?? "#FFFF00";
}
function I_(e) {
	let t = hs(e.vertAlign, e.fontSize) + (e.lineRelativePosition ?? e.position ?? 0);
	return t === 0 ? 0 : -t;
}
function L_(e, t, n, r, i, a, o) {
	let s = M_(e), c = s === void 0 ? void 0 : t.runs[s], l = c_(c);
	if (e.metricOnly) {
		let t = N_(e);
		return {
			kind: "anchor-host",
			range: {
				start: n,
				end: n
			},
			bounds: {
				xPt: r,
				yPt: a,
				widthPt: 0,
				heightPt: o
			},
			baselinePt: i,
			...t ? { sourceMetrics: t } : {}
		};
	}
	let u = e.color ? {
		kind: "explicit",
		color: `#${e.color}`
	} : e.colorAuto ? {
		kind: "auto",
		...e.background ? { background: `#${e.background}` } : {}
	} : { kind: "default" }, d = e.fontRoute ?? ct(e.fontFamily ? `"${e.fontFamily.replaceAll("\"", "\\\"")}"` : "sans-serif", e.fontFamily ? "native" : "generic"), f = e.ruby && e.textLayoutService && e.textShapeRequest ? e.textLayoutService.shape({
		...e.textShapeRequest,
		text: e.text,
		measure: !0
	}) : void 0, p = e.ruby && e.textLayoutService && e.textShapeRequest ? e.textLayoutService.shape({
		...e.textShapeRequest,
		text: e.ruby.text,
		fontSizePt: e.ruby.fontSizePt,
		measure: !0
	}) : void 0, m = e.ruby && p ? (p.clusters ?? []).map((t) => {
		let n = p.spans.find((e) => e.start <= t.range.start && e.end >= t.range.end) ?? p.spans[0];
		if (!n) throw Error("Ruby shaping produced no selected-face span");
		return {
			text: e.ruby.text.slice(t.range.start, t.range.end),
			offsetPt: t.offsetPt,
			fontRoute: n.fontRoute,
			fontSizePt: e.ruby.fontSizePt,
			fontWeight: n.font.weight,
			fontStyle: n.font.style,
			color: u
		};
	}) : [], h = l?.ruby?.raisePt.status === "valid" ? l.ruby.raisePt.value ?? void 0 : e.ruby?.hpsRaisePt, g = e.ruby && p ? cg({
		baseOrigin: {
			xPt: 0,
			yPt: 0
		},
		baseAdvancePt: e.measuredWidth,
		guideAdvancePt: p.advancePt,
		...h === void 0 ? {} : { raisePt: h },
		...f?.inkBounds && p.inkBounds ? {
			baseInkTopPt: -f.inkBounds.ascentPt,
			guideInkBottomFromBaselinePt: p.inkBounds.descentPt
		} : {},
		spans: m
	}) : [], _ = I_(e);
	return {
		kind: "text",
		text: e.text,
		...s === void 0 ? {} : { sourceRunIndex: s },
		...c?.type === "field" ? {
			role: "field-result",
			dependency: j_(c)
		} : {},
		...c?.type === "text" && (c.noteRef?.kind === "footnote" || c.noteRef?.kind === "endnote") ? { noteReference: {
			kind: c.noteRef.kind,
			id: c.noteRef.id
		} } : {},
		range: {
			start: n,
			end: n + e.text.length
		},
		origin: {
			xPt: r,
			yPt: i + _
		},
		bounds: {
			xPt: r,
			yPt: a,
			widthPt: e.measuredWidth,
			heightPt: o
		},
		advancePt: e.measuredWidth,
		clusters: [{
			range: {
				start: n,
				end: n + e.text.length
			},
			offset: {
				xPt: 0,
				yPt: 0
			},
			advancePt: e.measuredWidth
		}],
		color: u,
		fontRoute: d,
		fontSizePt: Ai(e, 1),
		fontWeight: e.bold ? 700 : 400,
		fontStyle: e.italic ? "italic" : "normal",
		direction: e.rtl ? "rtl" : "ltr",
		...e.verticalRun ? { writingMode: "vertical-rl" } : {},
		...e.charSpacing === void 0 ? {} : { characterSpacingPt: e.charSpacing },
		...e.charScale === void 0 ? {} : { characterScale: e.charScale },
		...e.fitTextRegionIndex === void 0 ? {} : { fitText: {
			regionIndex: e.fitTextRegionIndex,
			perGapPt: e.fitTextPerGapPx ?? 0,
			trailingPadPt: e.fitTextTrailingPadPx ?? 0
		} },
		kerning: e.kerning !== void 0 && e.fontSize >= e.kerning,
		...e.position === void 0 ? {} : { positionPt: e.position },
		...e.vertAlign ? { verticalAlign: e.vertAlign } : {},
		...e.tateChuYoko ? { tateChuYoko: !0 } : {},
		...e.tateChuYokoCompress ? { tateChuYokoCompress: !0 } : {},
		...e.ruby && p ? { ruby: {
			text: e.ruby.text,
			advancePt: p.advancePt,
			authored: {
				...l?.ruby?.align.status === "valid" && l.ruby.align.value ? { align: l.ruby.align.value } : {},
				...l?.ruby?.baseFontSizePt.status === "valid" && l.ruby.baseFontSizePt.value !== null ? { baseFontSizePt: l.ruby.baseFontSizePt.value } : {},
				...h === void 0 ? {} : { raisePt: h },
				...l?.ruby?.language.status === "valid" && l.ruby.language.value ? { language: l.ruby.language.value } : {}
			},
			paintOps: g
		} } : {},
		...e.emphasisMark ? { emphasisMark: e.emphasisMark } : {},
		...e.highlight ? { highlight: F_(e.highlight) } : {},
		...e.background ? { background: `#${e.background}` } : {},
		...e.border ? { runBorder: {
			val: l?.border?.val.value ?? e.border.style,
			color: e.border.color ? `#${e.border.color}` : "#000000",
			widthPt: e.border.width,
			spacePt: e.border.space ?? 0,
			...l?.border?.themeColor.value ? { themeColor: l.border.themeColor.value } : {},
			...l?.border?.themeTint.value ? { themeTint: l.border.themeTint.value } : {},
			...l?.border?.themeShade.value ? { themeShade: l.border.themeShade.value } : {},
			...l?.border?.shadow.status === "valid" && l.border.shadow.value !== null ? { shadow: l.border.shadow.value } : {},
			...l?.border?.frame.status === "valid" && l.border.frame.value !== null ? { frame: l.border.frame.value } : {}
		} } : {},
		...e.revision ? { revision: e.revision } : {},
		typography: {
			caps: l?.caps ?? !1,
			smallCaps: l?.smallCaps ?? e.smallCaps === !0,
			strike: l?.strike ?? e.strikethrough,
			doubleStrike: l?.doubleStrike ?? e.doubleStrikethrough === !0,
			verticalAlign: l?.verticalAlign ?? {
				status: e.vertAlign ? "valid" : "missing",
				raw: e.vertAlign ?? null,
				value: e.vertAlign ?? null
			},
			positionPt: l?.positionPt ?? {
				status: e.position === void 0 ? "missing" : "valid",
				raw: e.position === void 0 ? null : String(e.position * 2),
				value: e.position ?? null
			},
			emphasis: l?.emphasis ?? {
				status: e.emphasisMark ? "valid" : "missing",
				raw: e.emphasisMark ?? null,
				value: e.emphasisMark ?? null
			},
			...l?.underline ? { underline: l.underline } : {}
		},
		decorations: [],
		paintOps: [{
			text: e.text,
			range: {
				start: n,
				end: n + e.text.length
			},
			offset: {
				xPt: 0,
				yPt: _
			},
			letterSpacingPt: sc(e),
			scaleX: e.charScale ?? 1,
			direction: e.rtl ? "rtl" : "ltr",
			kerning: e.kerning === void 0 ? "none" : e.fontSize >= e.kerning ? "normal" : "none",
			writingMode: e.verticalRun ? "vertical-rl" : "horizontal-tb"
		}],
		...e.hyperlink ? { hyperlink: e.hyperlink } : {}
	};
}
function R_(e, t) {
	let n = e.layout, r = n.visibleAscent ?? n.ascent, i = r + (n.visibleDescent ?? n.descent), a = t.lineSpacing?.rule === "auto" && !t.hasRuby && !t.lineGrid.active, o = a && (t.lineSpacing?.value ?? 1) < 1, s = a && !o ? Math.max(i, n.visibleIntendedSingle ?? n.intendedSingle) : e.advancePt;
	return e.topYPt + (s - i) / 2 + r;
}
function z_(e, t, n) {
	let r = e.numbering;
	if (!r) return;
	if (t.numberingMarkerGeometry) return t.numberingMarkerGeometry;
	let i = e.numberingMarkerShapeInput, a = n.environment.layoutServices?.text;
	if (!(!i || !a)) return Il(r, i, {
		authoredFirstIndentPt: e.indentFirst,
		physicalIndentLeftPt: t.physicalIndentLeftPt,
		tabStops: e.tabStops,
		defaultTabPt: t.defaultTabPt
	}, a);
}
function B_(e, t, n, r, i) {
	return i.bounds.widthPt <= 0 ? t.baseRtl ? n + r : n : t.baseRtl ? i.bounds.xPt + i.bounds.widthPt + e.bodyOffsetPt : i.bounds.xPt - e.bodyOffsetPt;
}
function V_(e, t, n, r, i, a) {
	if (!e.shape || e.markerText === "") return [];
	let o = e.shape, s = Ml({
		baseRtl: n.baseRtl,
		alignedLeadingEdgePt: B_(e, n, r, i, a),
		authoredFirstIndentPt: t.indentFirst,
		markerShiftPt: e.markerShiftPt,
		markerWidthPt: e.markerWidthPt
	}), c = -e.markerText.length, l = t.numbering?.color ? {
		kind: "explicit",
		color: `#${t.numbering.color}`
	} : t.numbering?.colorAuto ? { kind: "auto" } : t.paragraphMarkColor ? {
		kind: "explicit",
		color: `#${t.paragraphMarkColor}`
	} : { kind: "default" }, u = 0;
	return o.spans.map((e) => {
		let r = u;
		u += e.advancePt;
		let i = o.clusters ? o.clusters.filter((t) => t.range.start >= e.start && t.range.end <= e.end).map((e) => ({
			range: {
				start: c + e.range.start,
				end: c + e.range.end
			},
			offset: {
				xPt: e.offsetPt - r,
				yPt: 0
			},
			advancePt: e.advancePt
		})) : [{
			range: {
				start: c + e.start,
				end: c + e.end
			},
			offset: {
				xPt: 0,
				yPt: 0
			},
			advancePt: e.advancePt
		}], d = s + r;
		return {
			kind: "text",
			role: "numbering-marker",
			text: e.text,
			range: {
				start: c + e.start,
				end: c + e.end
			},
			origin: {
				xPt: d,
				yPt: a.baselinePt
			},
			bounds: {
				xPt: d,
				yPt: a.baselinePt - e.ascentPt,
				widthPt: e.advancePt,
				heightPt: e.ascentPt + e.descentPt
			},
			advancePt: e.advancePt,
			clusters: i,
			paintOps: [{
				text: e.text,
				range: {
					start: c + e.start,
					end: c + e.end
				},
				offset: {
					xPt: 0,
					yPt: 0
				},
				letterSpacingPt: 0,
				scaleX: 1,
				direction: n.baseRtl ? "rtl" : "ltr",
				kerning: t.numberingMarkerShapeInput?.kerning ? "normal" : "none",
				writingMode: "horizontal-tb"
			}],
			color: l,
			fontRoute: e.fontRoute,
			fontSizePt: t.numberingMarkerShapeInput?.fontSizePt ?? e.ascentPt + e.descentPt,
			fontWeight: e.font.weight,
			fontStyle: e.font.style,
			direction: n.baseRtl ? "rtl" : "ltr",
			decorations: []
		};
	});
}
function H_(e) {
	if (e) return e.startsWith("#") ? e : `#${e}`;
}
function U_(e, t, n) {
	let r = H_(t), i = H_(n);
	return e.map((e) => ({
		...e,
		placements: e.placements.map((e) => {
			if (e.kind !== "text") return e;
			let t = e.background ?? r ?? i;
			return !t || e.color.kind === "explicit" ? e : {
				...e,
				color: {
					kind: "auto",
					background: t
				}
			};
		})
	}));
}
function W_(e) {
	return e != null && e.style !== "none";
}
function G_(e, t, n, r, i, a, o) {
	let s = n, c = n + r;
	e.indentFirst < 0 && (e.bidi ? c -= e.indentFirst : s += e.indentFirst);
	for (let e of t.flatMap((e) => e.placements)) !(e.kind === "text" && e.role === "numbering-marker" || e.kind === "resource" && e.resourceKind === "picture-bullet") || !e.bounds || (s = Math.min(s, e.bounds.xPt), c = Math.max(c, e.bounds.xPt + e.bounds.widthPt));
	let l = e.borders, u = o.top === "none" ? null : l?.[o.top] ?? null, d = o.bottom === "none" ? null : l?.bottom ?? null, f = W_(l?.left ?? null) ? l.left.space ?? 0 : 0, p = W_(l?.right ?? null) ? l.right.space ?? 0 : 0, m = W_(u) ? u.space ?? 0 : 0, h = W_(d) ? d.space ?? 0 : 0;
	return {
		xPt: s - f,
		yPt: i - m,
		widthPt: c - s + f + p,
		heightPt: a + m + h
	};
}
function K_(e) {
	return e.kind === "explicit" ? e.color : e.kind === "auto" ? Ge(e.background ?? "#FFFFFF") : "#000000";
}
function q_(e) {
	return e.inkBounds ?? {
		xMinPt: 0,
		xMaxPt: e.advancePt,
		ascentPt: e.ascentPt,
		descentPt: e.descentPt
	};
}
function J_(e) {
	return e === "circle" ? "○" : e === "comma" ? "﹅" : "•";
}
function Y_(e, t, n) {
	let r = e.trackChangesMarkup, i = Sh(r?.kind);
	if (!(e.highlight || e.underline || e.strikethrough || e.doubleStrikethrough || e.emphasisMark || i.underline || i.strike)) return;
	let a = e.textLayoutService, o = e.textShapeRequest;
	if (!a || !o) throw Error("Retained typography geometry requires TextLayoutService");
	let s = (e) => a.shape({
		...o,
		text: e,
		measure: !0
	}), c = (e) => {
		let t = s(e), n = t.spans[0];
		if (!n || t.spans.length !== 1 || n.start !== 0 || n.end !== e.length) throw Error("Retained decoration probe requires one selected-face span");
		return {
			ascentPt: n.ascentPt,
			descentPt: n.descentPt,
			...n.inkBounds ? { inkBounds: n.inkBounds } : {}
		};
	}, l = e.selectedFaceFontBox;
	if (!l || !e.selectedFaceInkBounds) throw Error("Retained typography geometry requires authoritative selected-face metrics");
	let u = {
		ascentPt: l.ascentPt,
		descentPt: l.descentPt,
		inkBounds: e.selectedFaceInkBounds
	}, d = K_(n), f = e.underline ? {
		...e.underlineStyle ? { authoredStyle: e.underlineStyle } : {},
		color: e.underlineColor && e.underlineColor !== "auto" ? `#${e.underlineColor}` : d,
		probe: c("_")
	} : r && i.underline ? {
		color: r.authorColor,
		probe: c("_")
	} : void 0, p = e.strikethrough || e.doubleStrikethrough ? {
		double: e.doubleStrikethrough === !0,
		probe: c("-"),
		...e.doubleStrikethrough ? { doubleProbe: c("=") } : {}
	} : r && i.strike ? {
		double: !1,
		probe: c("-"),
		color: r.authorColor
	} : void 0, m = e.emphasisMark ? (() => {
		let r = J_(e.emphasisMark), i = s(r), a = i.spans[0];
		if (!a) throw Error("Emphasis shaping produced no selected-face span");
		let c = (e.shapedClusters ?? []).map((n) => {
			let r = e.text.slice(n.range.start, n.range.end);
			return {
				text: r,
				range: {
					start: t + n.range.start,
					end: t + n.range.end
				},
				ink: q_(s(r))
			};
		});
		return {
			authored: e.emphasisMark,
			glyph: r,
			mark: {
				inkBounds: q_(i),
				fontRoute: a.fontRoute,
				fontSizePt: o.fontSizePt,
				fontWeight: a.font.weight,
				fontStyle: a.font.style,
				color: n
			},
			clusterInk: c
		};
	})() : void 0;
	return {
		base: u,
		...f ? { underline: f } : {},
		...p ? { strike: p } : {},
		...m ? { emphasis: m } : {}
	};
}
function X_(e, t, n, r, i, a) {
	if (e.metricOnly) {
		let t = N_(e);
		return {
			kind: "anchor-host",
			measuredWidthPt: 0,
			range: {
				start: n,
				end: n
			},
			...t ? { sourceMetrics: t } : {},
			...i?.type === "anchorHost" && i.anchorOccurrenceId ? { anchorOccurrenceId: i.anchorOccurrenceId } : {}
		};
	}
	let o = L_(e, t, n, 0, 0, 0, 0);
	if (o.kind !== "text") throw Error("Visible text segment projected as anchor host");
	let s = Sc(e, r, 1), c = e.charScale ?? 1, l = I_(e), u = Y_(e, n, o.color), d = e.shapedClusters, f = d?.length && d[0]?.range.start === 0 && d.at(-1)?.range.end === e.text.length && d.every((e, t) => t === 0 || d[t - 1]?.range.end === e.range.start) && d.every((e) => e.range.start < e.range.end && Number.isFinite(e.offsetPt) && Number.isFinite(e.advancePt)) ? d : void 0;
	if (e.text.length > 0 && !f) throw Error("Visible text acquisition requires complete authoritative grapheme clusters from TextLayoutService");
	let p = (f ?? []).map((t, i) => {
		let a = e.text.slice(0, t.range.start), o = e.text.slice(t.range.start, t.range.end), u = [...a].length, d = [...o].length, p = i === (f?.length ?? 0) - 1 ? e.fitTextTrailingPadPx ?? 0 : 0, m = e.punctuationCompressions?.filter((e) => e.end <= t.range.start).reduce((e, t) => e + t.adjustmentPt, 0) ?? 0, h = e.punctuationCompressions?.filter((e) => e.end > t.range.start && e.end <= t.range.end).reduce((e, t) => e + t.adjustmentPt, 0) ?? 0, g = uc(e, a, r) * c, _ = uc(e, o, r) * c;
		return {
			range: {
				start: n + t.range.start,
				end: n + t.range.end
			},
			offset: {
				xPt: t.offsetPt * c + u * s + g + m,
				yPt: l
			},
			advancePt: t.advancePt * c + d * s + _ + p + h
		};
	});
	if (e.latinSpaceCompressionPx && e.text.endsWith(" ") && p.length > 0) {
		let t = p.length - 1;
		p[t] = {
			...p[t],
			advancePt: Math.max(0, p[t].advancePt - e.latinSpaceCompressionPx)
		};
	}
	let m = e.snapGridLeadingPadPx ?? 0, h = e.measuredWidth - (e.snapGridTrailingPadPx ?? 0), g;
	if (e.snapGridClass === "eastAsia" && e.snapGridCellPitchPx) {
		let t = e.snapGridCellPitchPx, r = 0;
		p = p.map((i, a) => {
			e.text.slice(i.range.start - n, i.range.end - n);
			let o = Jo(i.advancePt, t), s = o * t, l = r * t + (s - i.advancePt) / 2;
			if (a === p.length - 1) {
				h = l + i.advancePt;
				let t = f?.[a]?.offsetPt;
				e.selectedFaceInkBounds && t !== void 0 && !/\s$/u.test(e.text) && (g = l + Math.max(0, (e.selectedFaceInkBounds.xMaxPt - t) * c));
			}
			let u = {
				...i,
				offset: {
					xPt: l,
					yPt: i.offset.yPt
				},
				advancePt: s
			};
			return r += o, u;
		});
	} else m !== 0 && (p = p.map((e) => ({
		...e,
		offset: {
			xPt: e.offset.xPt + m,
			yPt: e.offset.yPt
		}
	})));
	let { origin: _, bounds: v, advancePt: y, paintOps: b, clusters: x, ...S } = o, C = e.tateChuYoko && e.tateChuYokoCompress ? (() => {
		if (!e.textLayoutService || !e.textShapeRequest) throw Error("Tate-chu-yoko compression requires TextLayoutService");
		let t = e.textLayoutService.shape({
			...e.textShapeRequest,
			text: e.text,
			fontSizePt: o.fontSizePt,
			measure: !0,
			clusterGeometry: !1
		}), n = t.ascentPt + t.descentPt;
		return n > o.fontSizePt && n > 0 ? o.fontSizePt / n : 1;
	})() : 1, w = e.punctuationCompressions?.some((t) => t.end < e.text.length) ?? !1, T = e.verticalRun ? (() => {
		if (!a) throw Error("Vertical glyph planning capability is required for vertical text");
		let t = b[0];
		return a.planRun({
			text: e.text,
			font: lt(o.fontRoute, o.fontSizePt, o.fontWeight, o.fontStyle),
			fontKerning: t.kerning,
			fontSizePt: o.fontSizePt,
			letterSpacingPt: s,
			charScale: c,
			growTrRotateInk: !0,
			writingMode: t.writingMode
		}).map((r) => ({
			...t,
			text: r.text,
			range: {
				start: n + r.range.start,
				end: n + r.range.end
			},
			offset: {
				xPt: r.originPt + (e.punctuationCompressions?.filter((e) => e.end <= r.range.start).reduce((e, t) => e + t.adjustmentPt, 0) ?? 0),
				yPt: l
			},
			letterSpacingPt: s,
			glyphOrientation: r.orientation,
			...r.verticalFeature ? { verticalFeature: !0 } : {},
			...r.blockAxisInkBounds ? { blockAxisInkBounds: r.blockAxisInkBounds } : {},
			...r.drawOffsetPt.xPt !== 0 || r.drawOffsetPt.yPt !== 0 ? { glyphOffsetPt: r.drawOffsetPt } : {}
		}));
	})() : e.tateChuYoko ? b.map((t) => ({
		...t,
		offset: {
			xPt: t.offset.xPt + e.measuredWidth / 2,
			yPt: t.offset.yPt
		},
		glyphOrientation: "upright",
		...C === 1 ? {} : { scaleY: C }
	})) : w ? (() => {
		let t = b[0], r = [];
		for (let t of p) {
			let i = t.range.end - n, a = e.punctuationCompressions?.find((e) => e.end === i)?.adjustmentPt ?? null, o = r.at(-1);
			o && o.adjustmentPt === a ? o.end = t.range.end : r.push({
				start: t.range.start,
				end: t.range.end,
				offset: t.offset,
				adjustmentPt: a
			});
		}
		return r.map((r) => ({
			...t,
			text: e.text.slice(r.start - n, r.end - n),
			range: {
				start: r.start,
				end: r.end
			},
			offset: r.offset,
			letterSpacingPt: s + (r.adjustmentPt ?? 0)
		}));
	})() : b, E = e.snapGridClass === "eastAsia" ? (() => {
		let t = T[0];
		return t ? p.map((r) => ({
			...t,
			text: e.text.slice(r.range.start - n, r.range.end - n),
			range: r.range,
			offset: r.offset
		})) : T;
	})() : m === 0 ? T : T.map((e) => ({
		...e,
		offset: {
			xPt: e.offset.xPt + m,
			yPt: e.offset.yPt
		}
	})), D = r?.type === "snapToChars" && e.underline && !e.verticalRun && t.bidi !== !0 && e.selectedFaceInkBounds ? g ?? (E.length === 1 ? E[0].offset.xPt + (E[0].glyphOffsetPt?.xPt ?? 0) + e.selectedFaceInkBounds.xMaxPt * (E[0].scaleX ?? 1) : h) : h;
	return {
		...S,
		kind: "text",
		measuredWidthPt: e.measuredWidth,
		...e.latinSpaceCompressionPx ? { trailingSpaceCompressionPt: e.latinSpaceCompressionPx } : {},
		clusters: p,
		basePaintOps: E.map((t) => ({
			...t,
			letterSpacingPt: e.verticalRun && t.glyphOrientation !== "sideways" ? 0 : w ? t.letterSpacingPt : s,
			...!e.verticalRun && e.selectedFaceInkBounds ? { inkBounds: e.selectedFaceInkBounds } : {},
			...!e.verticalRun && e.selectedFaceInkBounds && t.glyphOrientation === void 0 ? { blockAxisInkBounds: {
				startPt: (t.glyphOffsetPt?.yPt ?? 0) - e.selectedFaceInkBounds.ascentPt,
				endPt: (t.glyphOffsetPt?.yPt ?? 0) + e.selectedFaceInkBounds.descentPt
			} } : {}
		})),
		breakBefore: e.breakBefore !== !1 && !e.joinPrev,
		rtl: e.rtl,
		digitsAsAN: e.digitsAsAN,
		fixedPitch: e.fitTextRegionIndex !== void 0 || e.snapGridClass !== void 0,
		...r?.type === "snapToChars" && e.underline ? { decorationTerminalAdvancePt: D } : {},
		...u ? { retainedGeometry: u } : {},
		...e.selectedFaceFontBox ? { selectedFaceFontBox: e.selectedFaceFontBox } : {},
		...e.textLayoutService ? { textLayoutService: e.textLayoutService } : {},
		...e.textShapeRequest ? { textShapeRequest: e.textShapeRequest } : {}
	};
}
function Z_(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t.lines) for (let t of e.layout.segments) {
		let e = M_(t);
		if (e === void 0) continue;
		let r = "text" in t ? t.metricOnly ? 0 : t.text.length : "math" in t ? t.fallbackText.length : +("isTab" in t || "imagePath" in t);
		n.set(e, (n.get(e) ?? 0) + r);
	}
	let r = e.runs.map((e, t) => {
		let r = n.get(t);
		return r === void 0 ? e.type === "text" ? e.text.length : e.type === "field" ? e.fallbackText.length : e.type === "anchorHost" ? 0 : 1 : r;
	}), i = 0;
	return {
		runStarts: r.map((e) => {
			let t = i;
			return i += e, t;
		}),
		runLengths: r
	};
}
function Q_(e) {
	return "text" in e ? e.metricOnly ? 0 : e.text.length : "math" in e ? e.fallbackText.length : 1;
}
function $_(e, t, n, r, i, a, o, s, c, l, u, d = !1) {
	let f = 0, p = /* @__PURE__ */ new Map(), m = e.lines.some((e) => e.layout.segments.some((e) => "isTab" in e)), h = t.tabStops?.reduce((e, t) => !e || t.pos < e.pos ? t : e, void 0), g = e.lines.flatMap((e) => e.layout.segments.flatMap((e) => "text" in e && !e.metricOnly ? [e.text] : [])).join("").trim(), _ = !m && h?.alignment === "decimal" && g !== "" && /^[+\-(]?[\d., ]+\)?%?$/u.test(g) ? h.pos - o.physicalIndentLeftPt : void 0;
	return e.lines.map((m, h) => {
		let g = m.layout, v = R_(m, o), y = Infinity, b = f, x = [];
		for (let e of g.segments) {
			let n = M_(e), r = n === void 0 ? void 0 : t.runs[n], c = Q_(e), m = n === void 0 ? f : (s.runStarts[n] ?? f) + (p.get(n) ?? 0);
			if (n !== void 0 && p.set(n, (p.get(n) ?? 0) + c), y = Math.min(y, m), b = Math.max(b, m + c), "isTab" in e) {
				let t = e, n = t.leader ?? "none", i, a, o = r?.type === "text" || r?.type === "field" ? r : void 0, s = o, u = (e) => {
					if (!l) throw Error("Formatted tab acquisition requires TextLayoutService");
					return l.shape({
						text: e,
						fontSizePt: t.fontSize,
						fonts: s?.fontSlots?.direct ?? (o?.fontFamily ? { ascii: o.fontFamily } : {}),
						themeFonts: s?.fontSlots?.theme,
						themeFontPresence: s?.fontSlots?.themePresent,
						weight: t.bold ? 700 : 400,
						style: t.italic ? "italic" : "normal",
						measure: !0
					});
				}, d = (e) => {
					let t = u(e), n = t.spans[0];
					if (!n || t.spans.length !== 1 || n.start !== 0 || n.end !== e.length) throw Error("Formatted tab probe requires one selected-face span");
					return {
						ascentPt: n.ascentPt,
						descentPt: n.descentPt,
						...n.inkBounds ? { inkBounds: n.inkBounds } : {}
					};
				};
				if (o?.underline) {
					let e = o.color ? `#${o.color}` : "#000000";
					a = {
						base: d("M"),
						probe: d("_"),
						color: s?.underlineColor && s.underlineColor !== "auto" ? `#${s.underlineColor}` : e,
						...s?.underlineStyle ? { authoredStyle: s.underlineStyle } : {}
					};
				}
				if (n !== "none") {
					if (!l) throw Error("Tab leader acquisition requires TextLayoutService");
					let e = n === "hyphen" ? "-" : n === "underscore" || n === "heavy" ? "_" : n === "middleDot" ? "·" : ".", r = u(e), a = r.spans[0];
					if (!a || !Number.isFinite(r.advancePt) || r.advancePt <= 0) throw Error("Tab leader acquisition produced no shaped glyph advance");
					i = {
						glyph: e,
						advancePt: r.advancePt,
						fontRoute: a.fontRoute,
						fontSizePt: t.fontSize,
						fontWeight: a.font.weight,
						fontStyle: a.font.style,
						color: o?.color ? {
							kind: "explicit",
							color: `#${o.color}`
						} : s?.colorAuto ? { kind: "auto" } : { kind: "default" }
					};
				}
				x.push({
					kind: "tab",
					range: {
						start: m,
						end: m + c
					},
					measuredWidthPt: t.measuredWidth,
					leader: n,
					fontSizePt: t.fontSize,
					bold: t.bold,
					italic: t.italic,
					...a ? { underline: a } : {},
					...i ? { leaderShape: i } : {}
				});
			} else if ("imagePath" in e) {
				let t = e;
				if (t.anchor) continue;
				let n = M_(e), r = E_(i, n ?? 0);
				if (t.inlineShape) {
					x.push({
						kind: "inline-drawing",
						range: {
							start: m,
							end: m + c
						},
						drawingId: `${a}:drawing:${n ?? 0}`,
						measuredWidthPt: t.measuredWidth,
						widthPt: t.widthPt,
						heightPt: t.heightPt,
						topOffsetPt: -t.heightPt
					}), f = Math.max(f, m + c);
					continue;
				}
				if (t.unavailableResourceKind) {
					x.push({
						kind: "unavailable-resource",
						range: {
							start: m,
							end: m + c
						},
						resourceKind: t.unavailableResourceKind,
						measuredWidthPt: t.measuredWidth,
						widthPt: t.widthPt,
						heightPt: t.heightPt,
						topOffsetPt: -t.heightPt,
						drawingId: k_(i, n ?? 0)
					}), f = Math.max(f, m + c);
					continue;
				}
				let o = t.chart ? "chart" : "image", s = t.chartResourceKey ?? (t.chart ? O_(r) : tt(r, t.imagePath));
				x.push({
					kind: "resource",
					range: {
						start: m,
						end: m + c
					},
					...n === void 0 ? {} : { sourceRunIndex: n },
					resourceKey: s,
					resourceKind: o,
					measuredWidthPt: t.measuredWidth,
					widthPt: t.widthPt,
					heightPt: t.heightPt,
					topOffsetPt: -t.heightPt,
					...d ? { orientation: "upright-physical" } : {}
				});
			} else if ("math" in e) {
				let t = e;
				x.push({
					kind: "resource",
					range: {
						start: m,
						end: m + c
					},
					...M_(e) === void 0 ? {} : { sourceRunIndex: M_(e) },
					resourceKey: t.mathResourceKey,
					resourceKind: "math",
					measuredWidthPt: t.measuredWidth,
					widthPt: t.measuredWidth,
					heightPt: t.mathAscent + t.mathDescent,
					topOffsetPt: -t.mathAscent
				});
			} else x.push(X_(e, t, m, Dl(o), r, u));
			f = Math.max(f, m + c);
		}
		let S = g.segments.length === 1 && "math" in (g.segments[0] ?? {}) ? g.segments[0] : void 0;
		return C_({
			paragraphXPt: n,
			availableWidthPt: r,
			alignment: t.alignment,
			baseRtl: o.baseRtl,
			isFirstLine: h === 0,
			isLastLine: h === e.lines.length - 1,
			stretchLastLine: o.stretchLastLine,
			exactLineSpacing: o.lineSpacing?.rule === "exact",
			firstLineIndentPt: o.firstIndentPt,
			...h === 0 && c ? { numbering: { bodyOffsetPt: c.bodyOffsetPt } } : {},
			..._ === void 0 ? {} : { decimalAutoTabPt: _ },
			...S?.display ? { displayMathJustification: S.jc ?? o.mathDefJc ?? "centerGroup" } : {},
			line: {
				range: {
					start: Number.isFinite(y) ? y : f,
					end: b
				},
				topPt: m.topYPt,
				baselinePt: v,
				advancePt: m.advancePt,
				xOffsetPt: g.xOffset,
				availableWidthPt: g.availWidth,
				endsWithBreak: g.endsWithBreak ?? !1,
				segments: x
			}
		});
	});
}
function ev(e, t, n, r, i) {
	let a = i.filter((e) => e.alignment === "bar");
	return a.length === 0 ? e : e.map((e) => ({
		...e,
		barTabRules: a.map((i) => {
			let a = r ? t + n - i.pos : t + i.pos;
			return {
				from: {
					xPt: a,
					yPt: e.bounds.yPt
				},
				to: {
					xPt: a,
					yPt: e.bounds.yPt + e.bounds.heightPt
				},
				color: "#000000",
				widthPt: 0,
				authoredStyle: "single",
				style: "solid"
			};
		})
	}));
}
function tv(e, t) {
	return {
		start: e.start + t,
		end: e.end + t
	};
}
function nv(e, t) {
	if (!Number.isFinite(t) || t < 0) throw RangeError("Paragraph continuation source range must be finite and non-negative");
	let n = e[0];
	if (!n) return e;
	let r = t - n.range.start;
	return r === 0 ? e : e.map((e) => ({
		...e,
		range: tv(e.range, r),
		placements: e.placements.map((e) => {
			let t = tv(e.range, r);
			return e.kind === "text" ? {
				...e,
				range: t,
				clusters: e.clusters.map((e) => ({
					...e,
					range: tv(e.range, r)
				})),
				paintOps: e.paintOps.map((e) => ({
					...e,
					range: tv(e.range, r)
				}))
			} : {
				...e,
				range: t
			};
		})
	}));
}
function rv(e, t, n, r, i) {
	let a = e.contentEndYPt - e.contentStartYPt;
	return C_({
		paragraphXPt: n,
		availableWidthPt: r,
		alignment: t.alignment,
		baseRtl: i.baseRtl,
		isFirstLine: !0,
		isLastLine: !0,
		stretchLastLine: i.stretchLastLine,
		line: {
			range: {
				start: 0,
				end: 0
			},
			topPt: e.contentStartYPt,
			baselinePt: e.contentEndYPt - e.lastLineBelowBaselinePt,
			advancePt: a,
			xOffsetPt: 0,
			availableWidthPt: r,
			endsWithBreak: !1,
			segments: []
		}
	});
}
function iv(e, t) {
	let n = t.anchorFrames, r = e.anchorXRelativeFrom ?? (e.anchorXFromMargin ? "margin" : "page"), i = e.anchorYRelativeFrom ?? (e.anchorYFromPara ? "paragraph" : "page"), a = n?.page, o = n?.margin, s = a && o ? {
		xPt: a.xPt,
		yPt: a.yPt,
		widthPt: Math.max(0, o.xPt - a.xPt),
		heightPt: a.heightPt
	} : null, c = a && o ? {
		xPt: o.xPt + o.widthPt,
		yPt: a.yPt,
		widthPt: Math.max(0, a.xPt + a.widthPt - o.xPt - o.widthPt),
		heightPt: a.heightPt
	} : null, l = a && o ? {
		xPt: a.xPt,
		yPt: a.yPt,
		widthPt: a.widthPt,
		heightPt: Math.max(0, o.yPt - a.yPt)
	} : null, u = a && o ? {
		xPt: a.xPt,
		yPt: o.yPt + o.heightPt,
		widthPt: a.widthPt,
		heightPt: Math.max(0, a.yPt + a.heightPt - o.yPt - o.heightPt)
	} : null, d = n?.pageParity === "even", f = r === "page" ? a : r === "column" || r === "character" ? n?.column : r === "leftMargin" ? s : r === "rightMargin" ? c : r === "insideMargin" ? d ? c : s : r === "outsideMargin" ? d ? s : c : o, p = i === "paragraph" || i === "line" || i === "character" ? {
		xPt: t.placement.paragraphXPt,
		yPt: t.placement.startYPt,
		widthPt: t.placement.availableWidthPt,
		heightPt: 0
	} : i === "page" ? a : i === "column" ? n?.column : i === "topMargin" ? l : i === "bottomMargin" ? u : i === "insideMargin" ? d ? u : l : i === "outsideMargin" ? d ? l : u : o;
	if (!f || !p) return null;
	let m = e.widthPt, h = e.heightPt, g = e.anchorXPt ?? 0, _ = e.anchorYPt ?? 0, v = e.type === "shape" ? e.pctPosH : null, y = e.type === "shape" ? e.pctPosV : null;
	return {
		xPt: v == null ? e.anchorXAlign === "center" ? f.xPt + (f.widthPt - m) / 2 : e.anchorXAlign === "right" || e.anchorXAlign === "outside" && !d || e.anchorXAlign === "inside" && d ? f.xPt + f.widthPt - m : f.xPt + g : f.xPt + f.widthPt * v + g,
		yPt: y == null ? e.anchorYAlign === "center" ? p.yPt + (p.heightPt - h) / 2 : e.anchorYAlign === "bottom" || e.anchorYAlign === "outside" && !d || e.anchorYAlign === "inside" && d ? p.yPt + p.heightPt - h : p.yPt + _ : p.yPt + p.heightPt * y + _,
		widthPt: m,
		heightPt: h
	};
}
function av(e, t) {
	return iv(e, t) ?? {
		xPt: e.anchorXPt + (e.anchorXFromMargin ? t.placement.paragraphXPt : 0),
		yPt: e.anchorYPt + (e.anchorYFromPara ? t.placement.startYPt : 0),
		widthPt: e.widthPt,
		heightPt: e.heightPt
	};
}
function ov(e, t, n, r, i = !1) {
	let a = E_(n.source, r), o = ig(e, t, n.environment.layoutServices?.text, e.vmlTextPathInput, e.fill?.fillType === "image" ? tt(a, e.fill.imagePath) : void 0), s = [o.command], c = D_(o, a);
	return {
		kind: "drawing",
		id: `${n.id}:drawing:${r}`,
		source: a,
		flowDomainId: n.flowDomainId,
		flowBounds: t,
		inkBounds: t,
		advancePt: 0,
		ordinaryFlow: !1,
		commands: s,
		...c.length === 0 ? {} : { diagnostics: c },
		...i ? {} : { anchorLayer: {
			occurrenceId: `public-shape:${n.id}:${r}`,
			behindDoc: e.behindDoc === !0,
			relativeHeight: Number.isFinite(e.zOrder) ? e.zOrder : r,
			sourceOrder: r,
			horizontalOwnership: e.anchorXRelativeFrom === "character" || e.anchorXRelativeFrom === "column" ? "host" : "page",
			verticalOwnership: e.anchorYRelativeFrom === "paragraph" || e.anchorYRelativeFrom === "line" || e.anchorYRelativeFrom === "character" || !e.anchorYRelativeFrom && e.anchorYFromPara ? "host" : "page"
		} }
	};
}
function sv(e, t, n) {
	if (!e.anchor || e.anchorAcquisitionInput) return null;
	let r = iv(e, t);
	if (!r) return null;
	let i = e.anchorYRelativeFrom ?? (e.anchorYFromPara ? "paragraph" : "page"), a = E_(t.source, n);
	return {
		kind: "drawing",
		id: `${t.id}:public-anchor-drawing:${n}`,
		source: a,
		flowDomainId: t.flowDomainId,
		flowBounds: r,
		inkBounds: r,
		advancePt: 0,
		ordinaryFlow: !1,
		commands: [{
			kind: "resource",
			resourceKind: e.type,
			resourceKey: e.type === "image" ? tt(a, e.imagePath) : O_(a),
			rect: r,
			...t.environment.verticalPageFrame ? { orientation: "upright-physical" } : {}
		}],
		anchorLayer: {
			occurrenceId: `public-anchor:${t.id}:${n}`,
			behindDoc: !1,
			relativeHeight: n,
			sourceOrder: n,
			horizontalOwnership: "page",
			verticalOwnership: i === "paragraph" ? "host" : "page"
		}
	};
}
function cv(e) {
	return (e.type === "image" || e.type === "chart" || e.type === "shape" || e.type === "unavailableDrawing") && e.anchorAcquisitionInput !== void 0;
}
function lv(e) {
	return [
		{
			xPt: e.xPt,
			yPt: e.yPt
		},
		{
			xPt: e.xPt + e.widthPt,
			yPt: e.yPt
		},
		{
			xPt: e.xPt + e.widthPt,
			yPt: e.yPt + e.heightPt
		},
		{
			xPt: e.xPt,
			yPt: e.yPt + e.heightPt
		}
	];
}
function uv(e, t, n) {
	let r = t.xPt - e.xPt, i = t.yPt - e.yPt, a = e.xPt + e.widthPt - t.xPt - t.widthPt, o = e.yPt + e.heightPt - t.yPt - t.heightPt;
	return {
		xPt: n.xPt - r,
		yPt: n.yPt - i,
		widthPt: Math.max(0, n.widthPt + r + a),
		heightPt: Math.max(0, n.heightPt + i + o)
	};
}
function dv(e, t) {
	return {
		a: t.a,
		b: t.b,
		c: t.c,
		d: t.d,
		e: e.xPt + e.widthPt / 2,
		f: e.yPt + e.heightPt / 2
	};
}
function fv(e, t) {
	let n = [
		yf(t, e),
		yf(t, {
			xPt: e.xPt + e.widthPt,
			yPt: e.yPt
		}),
		yf(t, {
			xPt: e.xPt,
			yPt: e.yPt + e.heightPt
		}),
		yf(t, {
			xPt: e.xPt + e.widthPt,
			yPt: e.yPt + e.heightPt
		})
	];
	if (n.some((e) => e === null)) throw Error("Upright drawing transform must be invertible");
	let r = n, i = Math.min(...r.map((e) => e.xPt)), a = Math.min(...r.map((e) => e.yPt));
	return {
		xPt: i,
		yPt: a,
		widthPt: Math.max(...r.map((e) => e.xPt)) - i,
		heightPt: Math.max(...r.map((e) => e.yPt)) - a
	};
}
function pv(e, t) {
	return wi(t, e);
}
function mv(e, t) {
	let n = (e) => {
		let n = Ti(t, {
			top: e.topPt,
			right: e.rightPt,
			bottom: e.bottomPt,
			left: e.leftPt
		});
		return {
			topPt: n.top,
			rightPt: n.right,
			bottomPt: n.bottom,
			leftPt: n.left
		};
	};
	return {
		...e,
		axes: {
			horizontal: e.axes.vertical,
			vertical: e.axes.horizontal
		},
		geometry: {
			...e.geometry,
			objectFrame: wi(t, e.geometry.objectFrame),
			inkBounds: wi(t, e.geometry.inkBounds),
			wrapBounds: e.geometry.wrapBounds ? wi(t, e.geometry.wrapBounds) : null,
			size: {
				horizontal: e.geometry.size.vertical,
				vertical: e.geometry.size.horizontal
			},
			parentEffectExtent: n(e.geometry.parentEffectExtent),
			wrap: {
				...e.geometry.wrap,
				distances: n(e.geometry.wrap.distances),
				distanceSources: Ti(t, e.geometry.wrap.distanceSources),
				effectExtent: n(e.geometry.wrap.effectExtent),
				...e.geometry.wrap.polygon ? { polygon: {
					...e.geometry.wrap.polygon,
					points: e.geometry.wrap.polygon.points.map((e) => Ci(t, e))
				} } : {}
			}
		}
	};
}
function hv(e, t) {
	let n = e.geometry.objectFrame;
	if (n.xPt === t.xPt && n.yPt === t.yPt && n.widthPt === t.widthPt && n.heightPt === t.heightPt) return e;
	let r = n.widthPt === 0 ? 1 : t.widthPt / n.widthPt, i = n.heightPt === 0 ? 1 : t.heightPt / n.heightPt, a = e.geometry.wrap.polygon;
	return {
		...e,
		geometry: {
			...e.geometry,
			objectFrame: t,
			inkBounds: uv(e.geometry.inkBounds, n, t),
			wrapBounds: e.geometry.wrapBounds ? uv(e.geometry.wrapBounds, n, t) : null,
			wrap: {
				...e.geometry.wrap,
				polygon: a ? {
					...a,
					points: a.points.map((e) => ({
						xPt: t.xPt + (e.xPt - n.xPt) * r,
						yPt: t.yPt + (e.yPt - n.yPt) * i
					}))
				} : null
			}
		}
	};
}
function gv(e, t, n) {
	let r = e.group?.resolvedChildFrame;
	if (!r) return t;
	let i = e.extent.widthPt, a = e.extent.heightPt;
	if (e.extent.widthStatus !== "valid" || e.extent.heightStatus !== "valid" || i === null || a === null || i <= 0 || a <= 0) throw Error("resolved grouped anchor requires its authored wp:extent");
	let o = n === void 0 ? t : wi(n.logicalToPhysical, t), s = o.widthPt / i, c = o.heightPt / a, l = {
		xPt: o.xPt + r.offsetXPt * s,
		yPt: o.yPt + r.offsetYPt * c,
		widthPt: r.widthPt * s,
		heightPt: r.heightPt * c
	};
	return n === void 0 ? l : wi(n.physicalToLogical, l);
}
function _v(e, t, n = !1) {
	let r = e.axes[t];
	return r.status !== "resolved" || n || r.referenceFrame === "paragraph" || r.referenceFrame === "line" || r.referenceFrame === "character" ? "host" : "page";
}
function vv(e, t, n, r, i, a, o, s, c, l) {
	let u = -1, d;
	for (let t = 0; t < n.length; t += 1) {
		let r = n[t]?.placements.find((t) => t.kind === "anchor-host" && t.anchorOccurrenceId === e);
		if (r?.kind === "anchor-host") {
			u = t, d = r;
			break;
		}
	}
	if (!d || u < 0) return null;
	let f = [...t].sort((e, t) => (e.run.anchorAcquisitionInput?.group?.sourceIndex ?? 0) - (t.run.anchorAcquisitionInput?.group?.sourceIndex ?? 0) || e.runIndex - t.runIndex), p = f[0];
	if (!p?.run.anchorAcquisitionInput) return null;
	let m = n[u], h = i.anchorFrames, g = p.run.anchorAcquisitionInput.behavior, _ = g.layoutInCellStatus === "valid" && g.layoutInCell === !0 && i.anchorCellBounds !== void 0 ? i.anchorCellBounds : null, v = Wg({
		acquisition: p.run.anchorAcquisitionInput,
		frames: {
			page: h?.page ? _ ? {
				...h.page,
				..._
			} : h.page : null,
			margin: h?.margin ? _ ? {
				...h.margin,
				..._
			} : h.margin : null,
			column: h?.column ? _ ? {
				...h.column,
				..._
			} : h.column : null,
			paragraph: {
				xPt: i.placement.paragraphXPt,
				yPt: i.placement.startYPt,
				widthPt: i.placement.availableWidthPt,
				heightPt: Math.max(0, a)
			},
			line: m.bounds,
			character: d.bounds,
			pageParity: h?.pageParity ?? null
		}
	});
	if (v.status !== "resolved") return {
		result: v,
		textBoxes: [],
		hostLineIndex: u,
		hostRange: d.range
	};
	let y = i.environment.verticalPageFrame && h?.page ? bi(h.page, i.environment.pageWritingMode) : void 0, b = y === void 0 ? void 0 : Ei(i.environment.pageWritingMode, y), x = y === void 0 ? v : mv(v, b.physicalToLogical);
	if (g.behindDocStatus !== "valid" || g.relativeHeightStatus !== "valid" || g.behindDoc === null || g.relativeHeight === null) throw Error("resolved anchor frame must retain required CT_Anchor behavior");
	let S = x.geometry.objectFrame, C = y === void 0 ? void 0 : dv(S, b.physicalToLogical), w = C ? {
		...i.environment,
		verticalCJK: !1,
		verticalPageFrame: !1
	} : i.environment, T = [], E = [], D = [], O = [], k = /* @__PURE__ */ new Map(), A = S;
	if (p.run.type === "shape" && p.run.anchorAcquisitionInput.group === null) {
		let t = E_(i.source, p.runIndex), n = C ? fv(S, C) : S, r = Dv(p.run, n, {
			id: `${i.id}:anchor-textbox:${e}:${p.runIndex}`,
			source: t,
			flowDomainId: i.flowDomainId,
			context: i.context,
			measurer: i.measurer,
			environment: w,
			input: p.run.textBoxInput,
			acquireCompleteStory: i.acquireCompleteStory,
			...C ? { coordinateSpace: "upright-physical" } : {}
		});
		r && (k.set(p.runIndex, r), A = C ? pv(r.flowBounds, C) : r.flowBounds);
	}
	let j = hv(x, A);
	if (g.allowOverlapStatus !== "valid" || g.allowOverlap === null || g.layoutInCellStatus !== "valid" || g.layoutInCell === null) throw Error("resolved anchor frame must retain overlap and cell behavior");
	let M = j.geometry.wrapBounds, N = !g.allowOverlap, P = g.allowOverlap && i.ordinaryFlow && M !== null;
	if (N || P) {
		let t = _v(j, "vertical", g.layoutInCell && i.anchorCellBounds !== void 0), n = l.filter((e) => !wg(t, g.relativeHeight, e.relativeHeight)), r = (N ? [...c, ...n].filter((t) => t.occurrenceId !== e).map((e) => ({
			occurrenceId: e.occurrenceId,
			bounds: e.bounds
		})) : o.filter((t) => t.anchorOccurrenceId !== e).map((e) => ({
			occurrenceId: e.anchorOccurrenceId ?? e.id,
			bounds: e.bounds
		}))).map((e) => ({
			occurrenceId: e.occurrenceId,
			kind: "drawingml",
			paragraphId: 0,
			bounds: e.bounds,
			exclusionBounds: e.bounds
		})), a = i.anchorFrames?.page, s = N && g.layoutInCell && i.anchorCellBounds ? i.anchorCellBounds.xPt + i.anchorCellBounds.widthPt : a ? a.xPt + a.widthPt : Infinity, u = $a({
			moving: {
				occurrenceId: e,
				kind: "drawingml",
				paragraphId: 1,
				bounds: A,
				exclusionBounds: M ?? A
			},
			blockers: r,
			avoidance: N ? { kind: "drawingml-normative" } : {
				kind: "word-different-paragraph",
				paragraphId: 1
			},
			rightBoundaryPt: s
		}).displacement;
		if (u.xPt !== 0 || u.yPt !== 0) {
			if (A = Y(A, u), C) C = {
				...C,
				e: C.e + u.xPt,
				f: C.f + u.yPt
			};
			else {
				let e = k.get(p.runIndex);
				e && k.set(p.runIndex, km(e, u));
			}
			j = hv(x, A);
		}
	}
	for (let { run: t, runIndex: n } of f) {
		let r = E_(i.source, n), a = t.anchorAcquisitionInput, o = gv(a, A, b), s = C ? fv(o, C) : o;
		if (t.type === "image") T.push({
			kind: "resource",
			resourceKind: "image",
			resourceKey: tt(r, t.imagePath),
			rect: s
		});
		else if (t.type === "chart") T.push({
			kind: "resource",
			resourceKind: "chart",
			resourceKey: O_(r),
			rect: s
		});
		else if (t.type === "unavailableDrawing") T.push({ kind: "noop" }), E.push(A_(t.resourceKind, r));
		else {
			let o = a.group?.resolvedChildFrame, c = ig(o ? {
				...t,
				rotation: o.rotationDeg,
				flipH: o.flipH,
				flipV: o.flipV
			} : t, s, i.environment.layoutServices?.text, t.vmlTextPathInput, t.fill?.fillType === "image" ? tt(r, t.fill.imagePath) : void 0);
			T.push(c.command), E.push(...D_(c, r));
			let l = `${i.id}:anchor-textbox:${e}:${n}`, u = k.get(n) ?? Dv(t, s, {
				id: l,
				source: r,
				flowDomainId: i.flowDomainId,
				context: i.context,
				measurer: i.measurer,
				environment: w,
				input: t.textBoxInput,
				acquireCompleteStory: i.acquireCompleteStory,
				...C ? { coordinateSpace: "upright-physical" } : {}
			});
			u && (D.push(u), O.push(l));
		}
	}
	let ee = {
		kind: "drawing",
		id: `${i.id}:anchor-drawing:${e}`,
		source: E_(i.source, p.runIndex),
		flowDomainId: i.flowDomainId,
		flowBounds: A,
		inkBounds: j.geometry.inkBounds,
		advancePt: 0,
		ordinaryFlow: !1,
		...C ? {
			orientation: "upright-physical",
			transform: C
		} : {},
		commands: T,
		...E.length === 0 ? {} : { diagnostics: Object.freeze(E) },
		anchorLayer: {
			occurrenceId: e,
			behindDoc: g.behindDoc,
			relativeHeight: g.relativeHeight,
			sourceOrder: p.runIndex,
			horizontalOwnership: _v(j, "horizontal", g.layoutInCell && i.anchorCellBounds !== void 0),
			verticalOwnership: _v(j, "vertical", g.layoutInCell && i.anchorCellBounds !== void 0),
			...g.layoutInCell && i.anchorCellBounds ? { layoutInCell: !0 } : {},
			...g.layoutInCell && yg(g.allowOverlap, j.geometry.wrap.kind) && i.anchorCellBounds ? { cellContainment: !0 } : {}
		},
		...O.length ? { textBoxIds: O } : {}
	}, te = j.geometry.wrapBounds, F = te && j.geometry.wrap.kind !== "none" ? {
		id: `${i.id}:anchor-exclusion:${e}`,
		wrap: j.geometry.wrap.kind,
		...j.geometry.wrap.side ? { wrapSide: j.geometry.wrap.side } : {},
		bounds: te,
		polygon: j.geometry.wrap.polygon?.points ?? lv(te),
		anchorOccurrenceId: e,
		verticalOwnership: _v(j, "vertical", g.layoutInCell && i.anchorCellBounds !== void 0)
	} : void 0, ne = {
		occurrenceId: e,
		bounds: A,
		horizontalOwnership: _v(j, "horizontal", g.layoutInCell && i.anchorCellBounds !== void 0),
		verticalOwnership: _v(j, "vertical", g.layoutInCell && i.anchorCellBounds !== void 0),
		...g.relativeHeight === null ? {} : { relativeHeight: g.relativeHeight }
	};
	return {
		result: j,
		drawing: ee,
		exclusion: F,
		collision: ne,
		textBoxes: D,
		...g.layoutInCell && yg(g.allowOverlap, j.geometry.wrap.kind) && i.anchorCellBounds ? { cellContainmentBounds: A } : {},
		hostLineIndex: u,
		hostRange: d.range
	};
}
function yv(e, t) {
	let n = t.bidi === !0, r = t.runs.some((e) => e.type === "text" && !!e.ruby), i = t.runs.some((e) => e.type === "text" && ji.test(e.text));
	return {
		...e,
		rightIndentGrid: {
			...e.rightIndentGrid,
			paragraphAllowsAdjustment: t.adjustRightInd !== !1
		},
		physicalIndentLeftPt: n ? t.indentRight : t.indentLeft,
		physicalIndentRightPt: n ? t.indentLeft : t.indentRight,
		firstIndentPt: t.indentFirst,
		lineSpacing: t.lineSpacing,
		spaceBeforePt: t.spaceBefore,
		spaceAfterPt: t.spaceAfter,
		baseRtl: n,
		isJustified: wl(t.alignment),
		stretchLastLine: Tl(t.alignment),
		tabStops: Fu(t),
		hasRuby: r,
		hasEastAsianText: i
	};
}
function bv(e) {
	return e === "vert" || e === "vert270" || e === "eaVert" || e === "mongolianVert" ? e : void 0;
}
function xv(e, t, n) {
	let r = Math.max(0, t - n);
	return e === "b" ? r : e === "ctr" ? r / 2 : 0;
}
function Sv(e, t, n, r) {
	let i = t === "eaVert" || t === "mongolianVert", a = e.lines.map((e) => {
		let a = t === "mongolianVert" ? e.placements.reduce((t, n) => n.kind === "text" && n.ruby ? Math.max(t, e.baselinePt - Math.min(e.baselinePt, ...n.ruby.paintOps.map((e) => e.origin.yPt))) : t, 0) : 0, o = (t === "mongolianVert" ? 2 * n.yPt + n.heightPt - e.baselinePt + r.bottomPt - r.leftPt + a : e.baselinePt) - e.baselinePt, s = e.bounds.yPt + o, c = e.placements.map((e) => {
			if (e.kind !== "text") return "bounds" in e && e.bounds ? {
				...e,
				bounds: {
					...e.bounds,
					yPt: e.bounds.yPt + o
				}
			} : e;
			let t = i ? e.clusters.map((t) => {
				let n = e.text.slice(t.range.start - e.range.start, t.range.end - e.range.start), r = e.paintOps.find((e) => e.range.start <= t.range.start && e.range.end >= t.range.end) ?? e.paintOps[0], i = ji.test(n);
				return {
					...r,
					text: n,
					range: t.range,
					offset: i ? {
						xPt: t.offset.xPt + t.advancePt / 2,
						yPt: t.offset.yPt
					} : t.offset,
					glyphOrientation: i ? "upright" : "sideways"
				};
			}) : e.paintOps;
			return Jv({
				...e,
				paintOps: t
			}, o);
		});
		return {
			...e,
			bounds: {
				...e.bounds,
				yPt: s
			},
			baselinePt: e.baselinePt + o,
			placements: c
		};
	});
	return {
		...e,
		lines: a
	};
}
function Cv(e, t) {
	let n = (e, n) => e.kind === "paragraph" ? Sv(e, t === "mongolianVert" ? "eaVert" : t, n, {
		topPt: 0,
		rightPt: 0,
		bottomPt: 0,
		leftPt: 0
	}) : Cv(e, t), r = {
		...e,
		rows: e.rows.map((e) => ({
			...e,
			cells: e.cells.map((e) => ({
				...e,
				blocks: e.blocks.map((t) => ({
					...t,
					layout: n(t.layout, e.contentBounds)
				}))
			}))
		}))
	}, i = /* @__PURE__ */ new Map(), a = (e) => {
		let n = i.get(e);
		if (n) return n;
		let r = {
			...e,
			child: Cv(e.child, t)
		};
		return i.set(e, r), r;
	}, o = e.floatingTables?.map(a), s = e.resolvedFloatingTables?.map((e) => {
		let t = a(e.source);
		return {
			...e,
			source: t,
			child: t.child
		};
	});
	return {
		...r,
		...o ? { floatingTables: o } : {},
		...s ? { resolvedFloatingTables: s } : {}
	};
}
function wv(e, t, n, r) {
	return {
		...e,
		blocks: e.blocks.map((e) => {
			if (e.kind === "paragraph") return Sv(e, t, n, r);
			if (e.kind === "table") return Cv(e, t);
			throw Error(`Text-box story contains unsupported retained node: ${e.kind}`);
		})
	};
}
function Tv(e, t, n = !0) {
	if (t === 0) return e;
	let r = {
		xPt: 0,
		yPt: t
	};
	return {
		...e,
		flowBounds: Y(e.flowBounds, r),
		inkBounds: Y(e.inkBounds, r),
		...e.clipBounds ? { clipBounds: n ? Y(e.clipBounds, r) : e.clipBounds } : {},
		blocks: e.blocks.map((e) => {
			if (e.kind === "paragraph") return Dm(e, r);
			if (e.kind === "table") return Ev(e, r);
			throw Error(`Text-box story contains unsupported retained node: ${e.kind}`);
		})
	};
}
function Ev(e, t) {
	let n = Mm(e, t), r = /* @__PURE__ */ new Map(), i = (e) => {
		let n = r.get(e);
		if (n) return n;
		let i = {
			...e,
			anchorBounds: Y(e.anchorBounds, t),
			...e.columnBounds ? { columnBounds: Y(e.columnBounds, t) } : {},
			child: Ev(e.child, t)
		};
		return r.set(e, i), i;
	}, a = e.floatingTables?.map(i), o = e.resolvedFloatingTables?.map((e) => {
		let n = i(e.source);
		return {
			...e,
			xPt: e.xPt + t.xPt,
			yPt: e.yPt + t.yPt,
			bounds: Y(e.bounds, t),
			exclusionBounds: Y(e.exclusionBounds, t),
			source: n,
			child: n.child
		};
	});
	return {
		...n,
		...a ? { floatingTables: a } : {},
		...o ? { resolvedFloatingTables: o } : {}
	};
}
function Dv(e, t, n) {
	let r = n.source, i = n.input ?? {
		kind: "compatibility",
		source: {
			story: "textbox",
			storyInstance: `${r.story}:${r.storyInstance}:${r.path.join(".")}`,
			path: []
		},
		paragraphs: og(e, {
			story: "textbox",
			storyInstance: `${r.story}:${r.storyInstance}:${r.path.join(".")}`,
			path: []
		})
	}, a = i.source, o = i.kind === "complete" ? i.blockCount : i.paragraphs.length;
	if (o === 0) return;
	let s = bv(e.textVert), c = s ? {
		xPt: -t.heightPt / 2,
		yPt: -t.widthPt / 2,
		widthPt: t.heightPt,
		heightPt: t.widthPt
	} : t, l = i.kind === "compatibility" ? i.paragraphs : Object.freeze([]), u = {
		topPt: e.textInsetT ?? 0,
		rightPt: e.textInsetR ?? 0,
		bottomPt: e.textInsetB ?? 0,
		leftPt: e.textInsetL ?? 0
	}, d = {
		xPt: c.xPt + u.leftPt,
		yPt: c.yPt + u.topPt,
		widthPt: Math.max(0, c.widthPt - u.leftPt - u.rightPt),
		heightPt: Math.max(0, c.heightPt - u.topPt - u.bottomPt)
	}, f;
	if (i.kind === "complete") {
		if (!n.acquireCompleteStory) throw Error("Complete text-box content requires the shared story acquisition adapter");
		f = n.acquireCompleteStory({
			source: a,
			container: {
				id: `${n.id}:story`,
				kind: "textbox",
				bounds: d,
				capacity: "unbounded"
			},
			coordinateSpace: n.coordinateSpace ?? "section-logical"
		});
	}
	let p = c.yPt + u.topPt, m = null, h = l.map((t, r) => {
		let i = t.runs.map((t) => Pi({
			text: t.text,
			fontSizePt: t.fontSizePt,
			color: t.color?.slice(1) ?? null,
			fontFamily: t.fontFamily ?? null,
			fontFamilyEastAsia: t.fontFamilyEastAsia ?? null,
			bold: t.bold,
			italic: t.italic,
			ruby: t.ruby
		}, e.textVert)), a = Math.max(0, c.widthPt - u.leftPt - u.rightPt - t.indentLeftPt - t.indentRightPt - Math.max(0, t.indentFirstPt)), o = s ? t.image?.heightPt ?? 0 : t.image?.widthPt ?? 0, l = s ? t.image?.widthPt ?? 0 : t.image?.heightPt ?? 0, f = o > a && o > 0 ? a / o : 1, h = t.image ? [{
			type: "image",
			imagePath: t.image.imagePath,
			mimeType: t.image.mimeType,
			...t.image.svgImagePath ? { svgImagePath: t.image.svgImagePath } : {},
			widthPt: o > 0 ? o * f : a,
			heightPt: l > 0 ? l * f : a,
			anchor: !1
		}] : i, g = {
			alignment: t.alignment,
			indentLeft: t.indentLeftPt,
			indentRight: t.indentRightPt,
			indentFirst: t.indentFirstPt,
			spaceBefore: t.spacing.beforePt,
			spaceAfter: t.spacing.afterPt,
			lineSpacing: t.lineSpacing,
			numbering: t.numbering ?? null,
			numberingMarkerShapeInput: t.numberingMarkerShapeInput,
			tabStops: [...t.tabStops],
			bidi: t.bidi,
			contextualSpacing: t.contextualSpacing,
			styleId: t.styleId,
			runs: h
		}, _ = yv(n.context, g), v = Gg(m, t, m?.spacing.afterPt ?? 0, t.spacing.beforePt);
		p += v;
		let y = zv(g, {
			id: `${n.id}:paragraph:${r}`,
			source: t.source,
			flowDomainId: `${n.flowDomainId}:textbox`,
			ordinaryFlow: !0,
			context: _,
			placement: {
				startYPt: p,
				paragraphXPt: c.xPt + u.leftPt,
				availableWidthPt: Math.max(0, c.widthPt - u.leftPt - u.rightPt),
				maximumYPt: c.yPt + c.heightPt - u.bottomPt,
				suppressSpaceBefore: !0
			},
			measurer: n.measurer,
			environment: n.environment,
			exclusions: []
		});
		return p += y.advancePt - y.spacing.afterPt, m = t, s ? Sv(y, s, d, u) : y;
	}), g = f ? Math.max(0, f.advancePt + u.topPt + u.bottomPt) : Math.max(0, p - c.yPt + u.bottomPt), _ = e.textAutofit === "sp" && o > 0 && (!s || l.every((e) => e.image === void 0)) && Number.isFinite(g) && g > 0 ? s ? {
		...t,
		widthPt: g
	} : {
		...t,
		heightPt: g
	} : t, v = s ? {
		xPt: -_.heightPt / 2,
		yPt: -_.widthPt / 2,
		widthPt: _.heightPt,
		heightPt: _.widthPt
	} : _;
	if (s && _.widthPt !== t.widthPt && s !== "mongolianVert") {
		let e = v.yPt - c.yPt;
		h = h.map((t) => Xv(t, e));
	}
	let y = {
		xPt: v.xPt + u.leftPt,
		yPt: v.yPt + u.topPt,
		widthPt: Math.max(0, v.widthPt - u.leftPt - u.rightPt),
		heightPt: Math.max(0, v.heightPt - u.topPt - u.bottomPt)
	}, b = Od(h.map((e) => e.flowBounds)) ?? {
		xPt: y.xPt,
		yPt: y.yPt,
		widthPt: 0,
		heightPt: 0
	}, x = Od(h.map((e) => e.inkBounds)) ?? {
		xPt: y.xPt,
		yPt: y.yPt,
		widthPt: 0,
		heightPt: 0
	}, S = f ?? {
		story: "textbox",
		flowBounds: b,
		inkBounds: x,
		clipBounds: y,
		blocks: h,
		advancePt: Math.max(0, g - u.topPt - u.bottomPt),
		diagnostics: []
	}, C = xg(S);
	return f && s && (S = wv(Tv(S, v.yPt - c.yPt), s, y, u)), S = Tv(S, xv(e.textAnchor, y.heightPt, C), !1), Nn({
		kind: "textbox",
		id: n.id,
		source: l[0]?.source ?? a,
		flowDomainId: `${n.flowDomainId}:textbox`,
		flowBounds: _,
		inkBounds: _,
		...e.defaultTextColor ? { defaultTextColor: `#${e.defaultTextColor.replace(/^#/u, "")}` } : {},
		...e.textAutofit === "none" ? { clipBounds: y } : {},
		advancePt: 0,
		ordinaryFlow: !1,
		story: S,
		transform: s ? {
			a: 0,
			b: s === "vert270" ? -1 : 1,
			c: s === "vert270" ? 1 : -1,
			d: 0,
			e: _.xPt + _.widthPt / 2,
			f: _.yPt + _.heightPt / 2
		} : {
			a: 1,
			b: 0,
			c: 0,
			d: 1,
			e: 0,
			f: 0
		},
		writingMode: e.textVert === "vert270" ? "vertical-lr" : e.textVert ? "vertical-rl" : "horizontal-tb",
		insets: u,
		contentBounds: v,
		...s ? { verticalMode: s } : {}
	});
}
var Ov = class extends H {
	reason;
	states;
	occurrenceCapacity;
	constructor(e, t, n) {
		super("NON_CONVERGENCE", `parser-owned paragraph anchor reflow did not converge (${e}; ${n} occurrences; ${t.length} states)`), this.name = "ParagraphAnchorReflowNonConvergenceError", this.reason = e, this.states = Object.freeze([...t]), this.occurrenceCapacity = n;
	}
};
function kv(e, t) {
	if (t.length === 0) return e.placement;
	if (e.placement.wrap) throw Error("Conflicting paragraph wrap authorities: placement.wrap and effective exclusions");
	let n = e.anchorFrames?.page, r = El(t.map((e, t) => ({
		kind: "shape",
		mode: e.wrap === "topAndBottom" ? "topAndBottom" : "square",
		authoredWrap: e.wrap,
		wrapPolygon: e.polygon,
		imageKey: e.id,
		imageX: e.bounds.xPt,
		imageY: e.bounds.yPt,
		imageW: e.bounds.widthPt,
		imageH: e.bounds.heightPt,
		xLeft: e.bounds.xPt,
		xRight: e.bounds.xPt + e.bounds.widthPt,
		yTop: e.bounds.yPt,
		yBottom: e.bounds.yPt + e.bounds.heightPt,
		side: e.wrapSide ?? "bothSides",
		distLeft: 0,
		distRight: 0,
		distTop: 0,
		distBottom: 0,
		paraId: t
	})), {
		xLeftPt: n?.xPt ?? e.placement.paragraphXPt,
		xRightPt: n ? n.xPt + n.widthPt : e.placement.paragraphXPt + e.placement.availableWidthPt,
		readingDirection: e.context.baseRtl ? "rtl" : "ltr"
	});
	return {
		...e.placement,
		wrap: r
	};
}
function Av(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e.exclusions) {
		let e = r.anchorOccurrenceId;
		if (!(!e || !t.has(e))) {
			if (n.has(e)) throw Error(`Paragraph anchor occurrence produced duplicate exclusions: ${e}`);
			n.set(e, r);
		}
	}
	return Object.freeze([...n.values()]);
}
function jv(e) {
	return nt("paragraph-effective-wrap-exclusions", e.map((e) => ({
		id: e.id,
		...e.anchorOccurrenceId === void 0 ? {} : { occurrenceId: e.anchorOccurrenceId },
		wrap: e.wrap,
		...e.wrapSide === void 0 ? {} : { wrapSide: e.wrapSide },
		bounds: e.bounds,
		polygon: e.polygon,
		...e.verticalOwnership === void 0 ? {} : { verticalOwnership: e.verticalOwnership }
	})));
}
function Mv(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = n.anchorOccurrenceId;
		if (e) {
			if (t.has(e)) throw Error(`Duplicate external paragraph exclusion occurrence: ${e}`);
			t.add(e);
		}
	}
	return t;
}
function Nv(e, t) {
	let n = Mv(e);
	return Object.freeze([...e, ...t.filter((e) => !e.anchorOccurrenceId || !n.has(e.anchorOccurrenceId))]);
}
function Pv(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (n.has(t.occurrenceId)) throw Error(`Duplicate external anchor collision occurrence: ${t.occurrenceId}`);
		n.add(t.occurrenceId);
	}
	return Object.freeze([...e, ...t.filter((e) => !n.has(e.occurrenceId))]);
}
function Fv(e, t, n, r) {
	let i = n.environment.layoutServices, a = n.environment.verticalGlyphMeasurement, o = n.anchorFrames, s = t.runs.some(cv), c = t.runs.some((e) => e.type === "shape" && e.textBoxInput?.kind === "complete"), { wrap: l, ...u } = n.placement, d = n.context, f = n.environment;
	return `paragraph-acquisition-v1:${JSON.stringify([
		n.id,
		[
			n.source.story,
			n.source.storyInstance,
			n.source.path
		],
		n.flowDomainId,
		n.ordinaryFlow,
		[
			u.startYPt,
			u.paragraphXPt,
			u.availableWidthPt,
			u.maximumYPt,
			u.suppressSpaceBefore,
			l ? e.objectIdentity(l) : null
		],
		[
			d.lineGrid.active,
			d.lineGrid.pitchPt,
			d.characterGrid.active,
			d.characterGrid.kind,
			d.characterGrid.deltaPt,
			d.rightIndentGrid.pitchPt,
			d.rightIndentGrid.paragraphAllowsAdjustment,
			d.physicalIndentLeftPt,
			d.physicalIndentRightPt,
			d.firstIndentPt,
			d.lineSpacing ? [
				d.lineSpacing.value,
				d.lineSpacing.rule,
				d.lineSpacing.explicit ?? null
			] : null,
			d.spaceBeforePt,
			d.spaceAfterPt,
			d.baseRtl,
			d.isJustified,
			d.stretchLastLine,
			d.tabStops.map((e) => [
				e.pos,
				e.alignment,
				e.leader
			]),
			d.hasRuby,
			d.hasEastAsianText,
			[
				d.kinsoku.enabled,
				[...d.kinsoku.lineStartForbidden].sort((e, t) => e - t),
				[...d.kinsoku.lineEndForbidden].sort((e, t) => e - t)
			],
			d.defaultTabPt,
			d.overflowPunct !== !1,
			d.numberingMarkerGeometry ? JSON.stringify(d.numberingMarkerGeometry) : null,
			d.mathDefJc ?? null
		],
		[e.objectIdentity(n.measurer.context), e.objectIdentity(n.measurer.fontFamilyClasses)],
		[
			f.pageIndex,
			f.totalPages,
			f.displayPageNumber ?? null,
			f.pageNumberFormat ?? null,
			f.currentDateMs ?? null,
			f.noteNumbers ? [...f.noteNumbers.entries()].sort(([e], [t]) => e.localeCompare(t)) : null,
			f.noteReferenceNumber ?? null,
			f.pageWritingMode,
			f.verticalCJK ?? null,
			f.verticalPageFrame ?? null,
			f.documentHasEastAsianText,
			f.useFeLayout ?? null,
			f.balanceSingleByteDoubleByteWidth ?? null,
			f.characterSpacingControl ?? null,
			f.lineWrapLikeWord6 ?? null,
			f.resolvedLocalFonts ? e.objectIdentity(f.resolvedLocalFonts) : null,
			i?.text.fingerprint ?? null,
			i?.images.fingerprint ?? null,
			i?.math.fingerprint ?? null,
			i?.verticalGlyphFingerprint ?? null,
			a?.fingerprint ?? null
		],
		JSON.stringify(n.exclusions),
		s ? JSON.stringify(n.anchorCollisions ?? []) : null,
		r ? JSON.stringify(r) : null,
		n.paragraphBorderEdges ? [n.paragraphBorderEdges.top, n.paragraphBorderEdges.bottom] : null,
		n.trailingExtentPt ?? null,
		n.containerShading ?? null,
		n.continuesFromPrevious ?? null,
		n.sourceRangeStart ?? null,
		o ? [
			o.page ? [
				o.page.xPt,
				o.page.yPt,
				o.page.widthPt,
				o.page.heightPt
			] : null,
			o.margin ? [
				o.margin.xPt,
				o.margin.yPt,
				o.margin.widthPt,
				o.margin.heightPt
			] : null,
			o.column ? [
				o.column.xPt,
				o.column.yPt,
				o.column.widthPt,
				o.column.heightPt
			] : null,
			o.pageParity
		] : null,
		s ? JSON.stringify(n.anchorCellBounds ?? null) : null,
		c && n.acquireCompleteStory ? e.objectIdentity(n.acquireCompleteStory) : null
	])}`;
}
function Iv(e) {
	let t = e.src ? Object.freeze({ ...e.src }) : void 0;
	return "text" in e ? Object.freeze({
		...e,
		...t ? { src: t } : {},
		...e.shapedClusters ? { shapedClusters: Object.freeze(e.shapedClusters.map((e) => Object.freeze({
			...e,
			range: Object.freeze({ ...e.range })
		}))) } : {},
		...e.selectedFaceInkBounds ? { selectedFaceInkBounds: Object.freeze({ ...e.selectedFaceInkBounds }) } : {},
		...e.selectedFaceFontBox ? { selectedFaceFontBox: Object.freeze({ ...e.selectedFaceFontBox }) } : {},
		...e.ruby ? { ruby: Object.freeze({ ...e.ruby }) } : {},
		...e.border ? { border: Object.freeze({ ...e.border }) } : {},
		...e.revision ? { revision: Object.freeze({ ...e.revision }) } : {},
		...e.hyperlink ? { hyperlink: Object.freeze({ ...e.hyperlink }) } : {},
		...e.seaBreaks ? { seaBreaks: Object.freeze([...e.seaBreaks]) } : {}
	}) : "imagePath" in e ? Object.freeze({
		...e,
		...t ? { src: t } : {},
		...e.srcRect ? { srcRect: Object.freeze({ ...e.srcRect }) } : {},
		...e.duotone ? { duotone: Object.freeze({ ...e.duotone }) } : {}
	}) : "isTab" in e ? Object.freeze({
		...e,
		...t ? { src: t } : {},
		...e.ptab ? { ptab: Object.freeze({ ...e.ptab }) } : {}
	}) : Object.freeze({
		...e,
		...t ? { src: t } : {}
	});
}
function Lv(e) {
	return Object.freeze({
		...e,
		layout: Object.freeze({
			...e.layout,
			segments: Object.freeze(e.layout.segments.map(Iv)),
			...e.layout.consumedEnd ? { consumedEnd: Object.freeze({ ...e.layout.consumedEnd }) } : {}
		})
	});
}
function Rv(e, t, n) {
	let r = t.environment.layoutServices ? Ir(t.environment.layoutServices) : void 0, i = r ? Fv(r, e, t, n) : void 0, a = i === void 0 ? void 0 : r.get(e, i);
	if (a) return a;
	r?.noteMiss();
	let o = Mv(t.exclusions), s = new Set(e.runs.flatMap((e) => cv(e) ? [e.anchorAcquisitionInput.occurrenceId] : []));
	for (let e of o) s.delete(e);
	let c = s.size, l = Object.freeze([]), u = Nv(t.exclusions, l), d = n || t.continuesFromPrevious ? void 0 : z_(e, t.context, t), f = d && !t.context.numberingMarkerGeometry ? {
		...t,
		context: {
			...t.context,
			numberingMarkerGeometry: d
		}
	} : t;
	try {
		let a = Bo({
			seedState: jv(u),
			step: (r) => {
				let i = Nv(t.exclusions, r?.ownedExclusions ?? l), a = Al(e, f.context, kv(t, i), t.measurer, {
					...t.environment,
					paragraphMarkShapeInput: e.paragraphMarkShapeInput,
					...d?.shape && d.markerText ? { firstLineNumberingMarkerBox: {
						ascentPt: d.shape.ascentPt,
						descentPt: d.shape.descentPt
					} } : {}
				}, n), o = Wv(e, f, a), c = Av(o, s), u = jv(Nv(t.exclusions, c));
				if (jv(o.exclusions) !== u) throw Error("Paragraph retained exclusions differ from the measured exclusion authority");
				return Object.freeze({
					measured: a,
					layout: o,
					ownedExclusions: c,
					state: u
				});
			},
			stateOf: (e) => e.state,
			limit: 16
		}).value, o = Object.freeze({
			...a.measured,
			lines: Object.freeze(a.measured.lines.map(Lv)),
			placement: Object.freeze({ ...a.measured.placement })
		}), c = Object.freeze({
			measured: o,
			layout: a.layout
		});
		return i !== void 0 && r.set(e, i, c), c;
	} catch (e) {
		throw e instanceof zo ? new Ov(e.reason, e.states, c) : e;
	}
}
function zv(e, t) {
	return Rv(e, t).layout;
}
function Bv(e) {
	let t = 0;
	for (let n of e.members) for (let e of n.fragment.lines) for (let n of e.placements) n.kind === "text" && (t = Math.max(t, -(n.positionPt ?? 0)));
	return t;
}
var Vv = /* @__PURE__ */ new WeakMap();
function Hv(e) {
	return e === void 0 ? null : e instanceof Date ? { date: e.toISOString() } : e instanceof Set ? { set: [...e].map(Hv).sort((e, t) => JSON.stringify(e).localeCompare(JSON.stringify(t))) } : e instanceof Map ? { map: [...e.entries()].map(([e, t]) => [Hv(e), Hv(t)]).sort((e, t) => JSON.stringify(e[0]).localeCompare(JSON.stringify(t[0]))) } : Array.isArray(e) ? e.map(Hv) : e && typeof e == "object" ? Object.fromEntries(Object.entries(e).map(([e, t]) => [e, Hv(t)])) : e;
}
function Uv(e, t) {
	if (t.contexts.length !== e.members.length || t.inputs.length !== e.members.length || t.borderEdges.length !== e.members.length || t.borderExtentsPt.length !== e.members.length) throw Error("Frame acquisition metadata must align with every group member");
	if (!Number.isFinite(t.maximumWidthPt) || t.maximumWidthPt < 0) throw RangeError("Frame maximumWidthPt must be finite and non-negative");
	let n = Vv.get(t.acquisitionSession);
	n || (n = /* @__PURE__ */ new Map(), Vv.set(t.acquisitionSession, n));
	let r = nt("w:frame-acquisition", [
		e.id,
		t.placementSignature,
		t.maximumWidthPt,
		t.environment.pageIndex,
		t.environment.totalPages,
		t.environment.displayPageNumber ?? null,
		t.environment.pageNumberFormat ?? null,
		t.environment.currentDateMs ?? null,
		t.environment.documentHasEastAsianText,
		t.environment.layoutServices?.text.fingerprint ?? null,
		t.environment.layoutServices?.images.fingerprint ?? null,
		t.environment.layoutServices?.math.fingerprint ?? null,
		t.environment.layoutServices?.verticalGlyphFingerprint ?? null,
		Hv(t.contexts),
		Hv(t.inputs),
		Hv(t.borderEdges),
		Hv(t.borderExtentsPt),
		t.containerShading ?? null,
		Hv(t.anchorFrames)
	]), i = n.get(r);
	if (i) return i;
	let a = e.framePr, o = a.w == null ? Math.max(0, ...e.members.map((e, n) => hu(e, t.contexts[n], t.maximumWidthPt, t.measurer, t.environment, z_(t.inputs[n], t.contexts[n], t)))) : Math.max(0, a.w), s = Math.max(1, o), c = (() => {
		let n = r_(`body-frame:${e.id}`), r = 0, i = null, a = 0, o = 0, c = [];
		return e.members.forEach((l, u) => {
			let d = t.contexts[u], f = Math.max(Gg(i, l, a, d.spaceBeforePt), o), p = {
				startYPt: r + f,
				paragraphXPt: 0,
				availableWidthPt: s,
				maximumYPt: Infinity,
				suppressSpaceBefore: !0
			}, m = t.borderExtentsPt[u] ?? 0, h = {
				story: "body",
				storyInstance: "body",
				path: [e.sourceIndices[u]]
			}, { measured: g, layout: _ } = Rv(t.inputs[u], {
				id: `body-frame:${e.id}:${u}`,
				source: h,
				flowDomainId: `body-frame:${e.id}`,
				ordinaryFlow: !1,
				context: d,
				placement: p,
				measurer: t.measurer,
				environment: {
					...t.environment,
					positionExtendsLineBox: oh(e.framePr.dropCap)
				},
				exclusions: n.exclusions,
				anchorCollisions: n.collisions,
				containerShading: t.containerShading,
				paragraphBorderEdges: t.borderEdges[u],
				trailingExtentPt: Math.max(d.spaceAfterPt, m),
				anchorFrames: t.anchorFrames
			});
			n = o_(n, _), c.push({
				paragraph: l,
				fragment: _,
				source: h
			}), r = g.contentEndYPt, i = l, a = g.requestedSpaceAfterPt, o = m;
		}), {
			heightPt: Math.max(0, r + Math.max(a, o)),
			members: c
		};
	})(), l = t.place(o, c.heightPt), u = Object.freeze(c.members.map((e) => {
		let t = Dm(e.fragment, {
			xPt: l.bounds.xPt,
			yPt: l.bounds.yPt
		}), n = T_(a.hRule === "exact" && a.h != null ? {
			...t,
			clipBounds: l.bounds
		} : t), r = Object.freeze({
			...n,
			advancePt: 0
		});
		return Object.freeze({
			...e,
			fragment: r
		});
	})), d = Object.freeze({
		box: Object.freeze({
			bounds: l.bounds,
			exclusionBounds: l.exclusionBounds,
			exclusionId: `frame:${e.id}`
		}),
		members: u
	});
	return n.set(r, d), d;
}
function Wv(e, t, n) {
	let r = t.continuesFromPrevious ? {
		...t.context,
		firstIndentPt: 0
	} : t.context, i = t.placement.paragraphXPt + r.physicalIndentLeftPt, a = Iu(r, t.placement.availableWidthPt), o = t.placement.availableWidthPt - r.physicalIndentLeftPt - r.physicalIndentRightPt - a, s = Z_(e, n), c = t.continuesFromPrevious ? void 0 : z_(e, r, t), l = $_(n, e, i, o, t.source, t.id, r, s, c, t.environment.layoutServices?.text, t.environment.verticalGlyphMeasurement, t.environment.verticalPageFrame);
	t.sourceRangeStart !== void 0 && (l = nv(l, t.sourceRangeStart)), l = ev(l, t.placement.paragraphXPt, t.placement.availableWidthPt, r.baseRtl, r.tabStops), c && n.markOnly && l.length === 0 && (c.markerText !== "" || e.numbering?.picBulletImagePath) && (l = [rv(n, e, i, o, r)]);
	let u = [], d = [], f = [], p = [], m = [], h = [], g = [], _ = e.runs.map((e, t) => e.type === "break" ? {
		kind: "break",
		breakKind: e.breakType,
		offset: s.runStarts[t] ?? 0
	} : void 0).filter((e) => e !== void 0), v = /* @__PURE__ */ new Map();
	e.runs.forEach((e, t) => {
		if (!cv(e)) return;
		let n = v.get(e.anchorAcquisitionInput.occurrenceId) ?? [];
		n.push({
			run: e,
			runIndex: t
		}), v.set(e.anchorAcquisitionInput.occurrenceId, n);
	});
	for (let [r, i] of v) {
		let a = vv(r, i, l, e, t, n.contentEndYPt - t.placement.startYPt, t.exclusions, m, t.anchorCollisions ?? [], h);
		a && (p.push(a.result), a.cellContainmentBounds && g.push(a.cellContainmentBounds), a.drawing && (d.push(a.drawing), f.push(...a.textBoxes), a.exclusion && m.push(a.exclusion), a.collision && h.push(a.collision), l[a.hostLineIndex] && (l = l.map((e, t) => t === a.hostLineIndex ? {
			...e,
			placements: [...e.placements, {
				kind: "drawing",
				range: a.hostRange,
				drawingId: a.drawing.id,
				bounds: a.drawing.inkBounds,
				advancePt: 0
			}]
		} : e))));
	}
	if (c && l[0]) {
		let n = V_(c, e, t.context, i, o, l[0]);
		n.length > 0 && (l = [{
			...l[0],
			placements: [...n, ...l[0].placements]
		}, ...l.slice(1)]);
	}
	if (e.runs.forEach((e, n) => {
		let r = E_(t.source, n);
		if (e.type === "unavailableDrawing" && e.anchorAcquisitionInput === void 0) {
			let i = k_(t.source, n), a = l.flatMap((e) => e.placements).find((e) => e.kind === "drawing" && e.drawingId === i);
			a?.kind === "drawing" && d.push({
				kind: "drawing",
				id: i,
				source: r,
				flowDomainId: t.flowDomainId,
				flowBounds: a.bounds,
				inkBounds: a.bounds,
				advancePt: 0,
				ordinaryFlow: !1,
				commands: Object.freeze([{ kind: "noop" }]),
				diagnostics: Object.freeze([A_(e.resourceKind, r)])
			});
		}
		if (e.type === "image" && u.push({
			kind: "image",
			resourceKey: tt(r, e.imagePath),
			intrinsicSize: {
				widthPt: e.widthPt,
				heightPt: e.heightPt
			}
		}), e.type === "chart" && u.push({
			kind: "chart",
			resourceKey: O_(r),
			intrinsicSize: {
				widthPt: e.widthPt,
				heightPt: e.heightPt
			}
		}), e.type === "math" && u.push({
			kind: "math",
			resourceKey: e.resourceKey ?? nt("math-resource", r),
			intrinsicSize: {
				widthPt: l.flatMap((e) => e.placements).find((e) => e.kind === "resource" && e.resourceKind === "math")?.bounds?.widthPt ?? 0,
				heightPt: e.fontSize
			}
		}), (e.type === "image" || e.type === "chart") && !t.continuesFromPrevious) {
			let r = sv(e, t, n);
			if (r) {
				d.push(r);
				let e = l[0];
				e && (l = [{
					...e,
					placements: [...e.placements, {
						kind: "drawing",
						range: {
							start: s.runStarts[n] ?? 0,
							end: (s.runStarts[n] ?? 0) + (s.runLengths[n] ?? 1)
						},
						drawingId: r.id,
						bounds: r.inkBounds,
						advancePt: 0
					}]
				}, ...l.slice(1)]);
			}
		}
		if (e.type === "shape" && !e.anchorAcquisitionInput && !t.continuesFromPrevious) {
			let i = `${t.id}:drawing:${n}`, a = e.inline === !0 ? l.flatMap((e) => e.placements).find((e) => e.kind === "drawing" && e.drawingId === i) : void 0;
			if (e.inline === !0 && !a) throw Error(`Inline shape ${i} has no retained line placement`);
			let o = a?.bounds ?? av(e, t), c = `${t.id}:textbox:${n}`, u = Dv(e, o, {
				id: c,
				source: r,
				flowDomainId: t.flowDomainId,
				context: t.context,
				measurer: t.measurer,
				environment: t.environment,
				input: e.textBoxInput,
				acquireCompleteStory: t.acquireCompleteStory
			}), p = ov(e, e.inline === !0 ? o : u?.flowBounds ?? o, t, n, e.inline === !0);
			u && (f.push(u), p = {
				...p,
				textBoxIds: [c]
			}), d.push(p);
			let m = e.inline === !0 ? void 0 : l[0];
			m && (l = [{
				...m,
				placements: [...m.placements, {
					kind: "drawing",
					range: {
						start: s.runStarts[n] ?? 0,
						end: (s.runStarts[n] ?? 0) + (s.runLengths[n] ?? 1)
					},
					drawingId: p.id,
					bounds: p.inkBounds,
					advancePt: 0
				}]
			}, ...l.slice(1)]);
		}
	}), e.numbering?.picBulletImagePath && !t.continuesFromPrevious && u.push({
		kind: "picture-bullet",
		resourceKey: tt(t.source, e.numbering.picBulletImagePath),
		intrinsicSize: {
			widthPt: e.numbering.picBulletWidthPt ?? e.numberingMarkerShapeInput?.fontSizePt ?? 0,
			heightPt: e.numbering.picBulletHeightPt ?? e.numberingMarkerShapeInput?.fontSizePt ?? 0
		}
	}), e.numbering?.picBulletImagePath && l[0] && !t.continuesFromPrevious) {
		if (!c) throw Error("Picture-bullet acquisition requires resolved marker font geometry");
		let n = e.numbering.picBulletWidthPt ?? c.markerWidthPt, r = e.numbering.picBulletHeightPt ?? e.numberingMarkerShapeInput?.fontSizePt;
		if (r === void 0) throw Error("Picture-bullet acquisition requires resolved marker height");
		let a = Ml({
			baseRtl: t.context.baseRtl,
			alignedLeadingEdgePt: B_(c, t.context, i, o, l[0]),
			authoredFirstIndentPt: e.indentFirst,
			markerShiftPt: c.markerShiftPt,
			markerWidthPt: n
		});
		l = [{
			...l[0],
			placements: [{
				kind: "resource",
				resourceKind: "picture-bullet",
				range: {
					start: -1,
					end: 0
				},
				resourceKey: tt(t.source, e.numbering.picBulletImagePath),
				bounds: {
					xPt: a,
					yPt: l[0].baselinePt - r,
					widthPt: n,
					heightPt: r
				},
				advancePt: 0
			}, ...l[0].placements]
		}, ...l.slice(1)];
	}
	l = U_(l, e.shading, t.containerShading);
	let y = n.contentEndYPt - n.contentStartYPt, b = t.paragraphBorderEdges ?? {
		top: "top",
		bottom: "bottom"
	}, x = G_(e, l, i, o, n.contentStartYPt, y, b), S = e.borders ? [
		...b.top === "none" ? [] : [[b.top, e.borders[b.top]]],
		["right", e.borders.right],
		...b.bottom === "none" ? [] : [["bottom", e.borders.bottom]],
		["left", e.borders.left]
	] : [], C = e.borders ? S.flatMap(([e, t]) => {
		if (!W_(t)) return [];
		let n = e === "top" || e === "between" || e === "bottom", r = e === "right" || e === "bottom", i = n ? x.yPt + (r ? x.heightPt : 0) : x.xPt + (r ? x.widthPt : 0);
		return [{
			edge: e,
			from: n ? {
				xPt: x.xPt,
				yPt: i
			} : {
				xPt: i,
				yPt: x.yPt
			},
			to: n ? {
				xPt: x.xPt + x.widthPt,
				yPt: i
			} : {
				xPt: i,
				yPt: x.yPt + x.heightPt
			},
			color: t.color ? `#${t.color}` : "#000000",
			widthPt: t.width,
			...ki(t.style, t.width)
		}];
	}) : [], w = t.trailingExtentPt ?? n.requestedSpaceAfterPt, T = Od(g);
	return T_({
		kind: "paragraph",
		id: t.id,
		source: t.source,
		...e.paragraphId === void 0 ? {} : { paragraphId: e.paragraphId },
		flowDomainId: t.flowDomainId,
		ordinaryFlow: t.ordinaryFlow,
		...e.styleId === void 0 ? {} : { styleId: e.styleId },
		...!t.continuesFromPrevious && e.bookmarks?.length ? { bookmarkStarts: e.bookmarks } : {},
		flowBounds: {
			xPt: t.placement.paragraphXPt,
			yPt: t.placement.startYPt,
			widthPt: t.placement.availableWidthPt,
			heightPt: n.contentEndYPt - t.placement.startYPt + w
		},
		inkBounds: { ...e.shading || e.borders ? x : {
			xPt: i,
			yPt: n.contentStartYPt,
			widthPt: Math.max(0, ...l.map((e) => e.bounds.widthPt)),
			heightPt: y
		} },
		spacing: {
			beforePt: t.placement.suppressSpaceBefore ? 0 : n.requestedSpaceBeforePt,
			afterPt: w
		},
		contextualSpacing: e.contextualSpacing ?? !1,
		lines: l,
		borders: C,
		shading: e.shading ? { color: `#${e.shading}` } : void 0,
		resources: u,
		drawings: d,
		textBoxes: f,
		events: _,
		exclusions: Nv(t.exclusions, m),
		...T ? { cellContainmentBounds: T } : {},
		anchorCollisions: Pv(t.anchorCollisions ?? [], h),
		...p.length ? { anchorFrames: p } : {},
		paragraphMark: n.markOnly ? {
			hidden: e.markVanish === !0,
			bounds: {
				xPt: i,
				yPt: n.contentStartYPt,
				widthPt: 0,
				heightPt: y
			}
		} : void 0
	});
}
var Gv = (e, t) => _m(e, {
	xPt: 0,
	yPt: t
}), Kv = (e, t) => Y(e, {
	xPt: 0,
	yPt: t
}), qv = (e, t) => xm(e, {
	xPt: 0,
	yPt: t
}), Jv = (e, t) => Cm(e, {
	xPt: 0,
	yPt: t
}), Yv = (e, t) => wm(e, {
	xPt: 0,
	yPt: t
}), Xv = (e, t) => Dm(e, {
	xPt: 0,
	yPt: t
}), Zv = (e, t) => km(e, {
	xPt: 0,
	yPt: t
});
function Qv(e, t, n, r) {
	if (!e.shading && e.borders.length === 0) return null;
	let i = t[0], a = t.at(-1);
	if (!i || !a) return {
		box: Kv(e.inkBounds, n),
		borders: []
	};
	let o = e.inkBounds.yPt, s = o + e.inkBounds.heightPt, c = r.continuesFromPrevious ? Math.max(o, i.bounds.yPt) : o, l = r.continuesOnNext ? Math.min(s, a.bounds.yPt + a.advancePt) : s, u = {
		xPt: e.inkBounds.xPt,
		yPt: c + n,
		widthPt: e.inkBounds.widthPt,
		heightPt: Math.max(0, l - c)
	}, d = u.xPt, f = d + u.widthPt, p = u.yPt, m = p + u.heightPt;
	return {
		box: u,
		borders: e.borders.flatMap((e) => (e.edge === "top" || e.edge === "between") && r.continuesFromPrevious || e.edge === "bottom" && r.continuesOnNext ? [] : e.edge === "top" || e.edge === "between" ? [{
			...e,
			from: {
				xPt: d,
				yPt: p
			},
			to: {
				xPt: f,
				yPt: p
			}
		}] : e.edge === "bottom" ? [{
			...e,
			from: {
				xPt: d,
				yPt: m
			},
			to: {
				xPt: f,
				yPt: m
			}
		}] : e.edge === "left" ? [{
			...e,
			from: {
				xPt: d,
				yPt: p
			},
			to: {
				xPt: d,
				yPt: m
			}
		}] : e.edge === "right" ? [{
			...e,
			from: {
				xPt: f,
				yPt: p
			},
			to: {
				xPt: f,
				yPt: m
			}
		}] : [{
			...e,
			from: Gv(e.from, n),
			to: Gv(e.to, n)
		}])
	};
}
function $v(e, t, n = `${e.id}:${t.lineStart}-${t.lineEnd}`) {
	let r = e.lines.slice(t.lineStart, t.lineEnd), i = r[0], a = r.at(-1), o = t.continuesFromPrevious && i ? e.flowBounds.yPt - i.bounds.yPt : 0, s = o === 0 ? r : r.map((e) => Yv(e, o)), c = s[0], l = s.at(-1), u = e.lines.map((e, n) => n >= t.lineStart && n < t.lineEnd ? s[n - t.lineStart] : e), d = c && l ? {
		xPt: Math.min(...s.map((e) => e.bounds.xPt)),
		yPt: c.bounds.yPt,
		widthPt: Math.max(...s.map((e) => e.bounds.xPt + e.bounds.widthPt)) - Math.min(...s.map((e) => e.bounds.xPt)),
		heightPt: l.bounds.yPt + l.bounds.heightPt - c.bounds.yPt
	} : e.inkBounds, f = Qv(e, r, o, t), p = new Set(r.flatMap((e) => e.placements.flatMap((e) => e.kind === "drawing" ? [e.drawingId] : []))), m = e.drawings.filter((e) => p.has(e.id)).map((e) => e.anchorLayer?.verticalOwnership === "page" ? e : qv(e, o)), h = Od(m.filter((e) => e.anchorLayer?.cellContainment === !0).map((e) => e.flowBounds)), g = new Set(e.drawings.flatMap((e) => {
		if (e.anchorLayer?.verticalOwnership !== "host") return [];
		let t = e.anchorLayer.acquisitionOccurrenceId ?? e.anchorLayer.occurrenceId;
		return t === void 0 ? [] : [t];
	})), _ = new Set(m.flatMap((e) => {
		if (e.anchorLayer?.verticalOwnership !== "host") return [];
		let t = e.anchorLayer.acquisitionOccurrenceId ?? e.anchorLayer.occurrenceId;
		return t === void 0 ? [] : [t];
	})), v = new Set(r.flatMap((e) => e.placements.flatMap((e) => e.kind === "resource" ? [e.resourceKey] : [])));
	for (let e of m) for (let t of e.commands) t.kind === "resource" && v.add(t.resourceKey);
	let y = new Set(m.flatMap((e) => [e.id.replace(":drawing:", ":textbox:"), ...e.textBoxIds ?? []])), b = new Set(m.filter((e) => e.anchorLayer?.verticalOwnership === "page" || e.orientation === "upright-physical").flatMap((e) => e.textBoxIds ?? [])), x = new Set(m.map((e) => nt("source-occurrence", e.source))), S = i?.range.start, C = a?.range.end, { bookmarkStarts: w, ...T } = e;
	return T_({
		...T,
		kind: "paragraph",
		id: n,
		...!t.continuesFromPrevious && w?.length ? { bookmarkStarts: w } : {},
		lines: u,
		flowBounds: {
			...e.flowBounds,
			yPt: e.flowBounds.yPt
		},
		...e.clipBounds ? { clipBounds: Kv(e.clipBounds, o) } : {},
		spacing: {
			beforePt: t.continuesFromPrevious ? 0 : e.spacing.beforePt,
			afterPt: t.continuesOnNext ? 0 : e.spacing.afterPt
		},
		inkBounds: f?.box ?? d,
		borders: f?.borders ?? e.borders.map((e) => ({
			...e,
			from: Gv(e.from, o),
			to: Gv(e.to, o)
		})),
		resources: e.resources.filter((e) => v.has(e.resourceKey)),
		drawings: m,
		cellContainmentBounds: h ?? void 0,
		textBoxes: e.textBoxes.filter((e) => y.has(e.id) || x.has(nt("source-occurrence", e.source))).map((e) => b.has(e.id) ? e : Zv(e, o)),
		events: S === void 0 || C === void 0 ? [] : e.events.filter((e) => e.offset >= S && (e.offset < C || !t.continuesOnNext && e.offset === C)),
		exclusions: e.exclusions.filter((e) => e.verticalOwnership === "page" || e.anchorOccurrenceId === void 0 || !g.has(e.anchorOccurrenceId) || _.has(e.anchorOccurrenceId)).map((e) => ({
			...e,
			bounds: e.verticalOwnership === "page" ? e.bounds : Kv(e.bounds, o),
			polygon: e.verticalOwnership === "page" ? e.polygon : e.polygon.map((e) => Gv(e, o))
		})),
		anchorCollisions: (e.anchorCollisions ?? []).filter((e) => e.verticalOwnership === "page" || !g.has(e.occurrenceId) || _.has(e.occurrenceId)).map((e) => ({
			...e,
			bounds: e.verticalOwnership === "page" ? e.bounds : Kv(e.bounds, o)
		})),
		...t.continuesOnNext ? { paragraphMark: void 0 } : e.paragraphMark ? { paragraphMark: {
			...e.paragraphMark,
			bounds: Kv(e.paragraphMark.bounds, o)
		} } : {},
		continuation: t
	});
}
//#endregion
//#region packages/docx/src/layout/paragraph-pagination.ts
function ey(e, t) {
	return e.segIndex - t.segIndex || e.charOffset - t.charOffset;
}
function ty(e, t, n, r, i, a, o, s, c, l) {
	if (![r, i].every((e) => Number.isFinite(e) && e >= 0)) throw RangeError("Paragraph fragment extents must be finite and non-negative");
	if (n.kind === "splittable" && n.lineEndBoundaries.length !== e.lines.length) throw RangeError("Splittable paragraph source boundaries must align with retained lines");
	if (n.kind === "indivisible" && t.boundary !== null) throw RangeError("Indivisible paragraph cannot carry a continuation boundary");
	let u = o.authoredSpaceAfterPt ?? 0;
	if (!Number.isFinite(u) || u < 0) throw RangeError("Authored paragraph spaceAfter must be finite and non-negative");
	let d = e.lines.length, f = (n) => $v(e, {
		lineStart: 0,
		lineEnd: n,
		continuesFromPrevious: t.boundary !== null,
		continuesOnNext: n < d
	}), p = (e) => {
		let t = s?.(e) ?? 0;
		if (!Number.isFinite(t) || t < 0) throw RangeError("Paragraph page-local reserve must be finite and non-negative");
		return t;
	}, m = (e) => l?.(e) ?? !0, h = (e, t) => {
		if (!t) return e.advancePt;
		let n = sh({
			advancePt: e.advancePt,
			retainedSpaceAfterPt: e.spacing.afterPt,
			authoredSpaceAfterPt: u
		});
		return uh({
			paragraph: e,
			writingMode: o.writingMode ?? "horizontal-tb",
			logicalLineBoxExtentPt: n,
			availableBlockExtentPt: r
		});
	};
	if (n.kind === "indivisible") {
		let n = p(e), o = h(e, !0);
		return a && (o + n > r || !m(n)) && o + n <= i ? {
			fragment: null,
			nextCursor: t,
			requiresFreshFlowRegion: !0,
			additionalReservePt: 0,
			admittedBlockExtentPt: 0
		} : {
			fragment: e,
			nextCursor: null,
			requiresFreshFlowRegion: !1,
			additionalReservePt: n,
			admittedBlockExtentPt: Math.min(e.advancePt, r)
		};
	}
	if (d === 0) {
		let n = p(e), o = h(e, !0);
		return a && (o + n > r || !m(n)) && o + n <= i ? {
			fragment: null,
			nextCursor: t,
			requiresFreshFlowRegion: !0,
			additionalReservePt: 0,
			admittedBlockExtentPt: 0
		} : {
			fragment: e,
			nextCursor: null,
			requiresFreshFlowRegion: !1,
			additionalReservePt: n,
			admittedBlockExtentPt: Math.min(e.advancePt, r)
		};
	}
	let g = p(e), _ = h(e, !0);
	if (t.boundary === null && o.keepLines && a && (_ + g > r || !m(g)) && _ + g <= i) return {
		fragment: null,
		nextCursor: t,
		requiresFreshFlowRegion: !0,
		additionalReservePt: 0,
		admittedBlockExtentPt: 0
	};
	let v = rh(0, d, r, (e) => (() => {
		let t = f(e), n = p(t);
		return m(n) ? h(t, e === d) + n : r + 1;
	})()).end;
	if (v === 0) {
		if (a) return {
			fragment: null,
			nextCursor: t,
			requiresFreshFlowRegion: !0,
			additionalReservePt: 0,
			admittedBlockExtentPt: 0
		};
		v = 1;
	}
	for (;;) {
		let e = ih({
			widowControl: o.widowControl,
			start: 0,
			end: v,
			totalLines: d,
			canRelocate: a
		});
		if (e.kind === "relocate") return {
			fragment: null,
			nextCursor: t,
			requiresFreshFlowRegion: !0,
			additionalReservePt: 0,
			admittedBlockExtentPt: 0
		};
		if (e.kind !== "dropLastLine") break;
		--v;
	}
	let y = f(v), b = v < d ? n.lineEndBoundaries[v - 1] : null;
	if (b !== null && t.boundary !== null && ey(b, t.boundary) <= 0) throw Error("Paragraph continuation source boundary did not advance");
	return {
		fragment: y,
		nextCursor: b === null ? null : Object.freeze({
			boundary: b,
			sourceRangeStart: y.lines.at(-1).range.end,
			...c === void 0 ? {} : { uniformRubyAdvancePt: c }
		}),
		requiresFreshFlowRegion: !1,
		additionalReservePt: p(y),
		admittedBlockExtentPt: Math.min(y.advancePt, r)
	};
}
//#endregion
//#region packages/docx/src/layout/note-reference-ownership.ts
function ny(e, t) {
	let n = /* @__PURE__ */ new Map();
	if (!e) return n;
	let r = new Set(e.map((e) => e.id));
	return t.forEach((e) => {
		r.has(e) && !n.has(e) && n.set(e, n.size + 1);
	}), n;
}
function ry(e) {
	let t = /* @__PURE__ */ new Map();
	if (!e) return t;
	for (let n of e) t.set(n.id, n);
	return t;
}
function iy(e, t) {
	let n = [], r = /* @__PURE__ */ new Set();
	for (let i of e) if (i.type === "paragraph" && "runs" in i) for (let e of i.runs) e.type !== "text" || e.noteRef?.kind !== t || e.noteRef.id.length === 0 || r.has(e.noteRef.id) || (r.add(e.noteRef.id), n.push(e.noteRef.id));
	else if (i.type === "table" && "rows" in i) for (let e of i.rows) for (let i of e.cells) for (let e of iy(i.content, t)) r.has(e) || (r.add(e), n.push(e));
	return Object.freeze(n);
}
function ay(e, t) {
	return Object.freeze([...new Set(e.flatMap((e) => e.placements.flatMap((e) => e.kind === "text" && e.noteReference?.kind === t ? [e.noteReference.id] : [])))]);
}
function oy(e, t) {
	return e.rows.flatMap((e) => e.cells.flatMap((e) => e.blocks.flatMap((e) => sy(e.layout, t))));
}
function sy(e, t) {
	let n = e.kind === "paragraph" ? ay(e.lines, t) : oy(e, t);
	return Object.freeze([...new Set(n)]);
}
function cy(e) {
	return ay(e, "footnote");
}
function ly(e) {
	return sy(e, "footnote");
}
function uy(e) {
	return sy(e, "endnote");
}
//#endregion
//#region packages/docx/src/layout/column-balancing.ts
function dy(e) {
	if (!Number.isInteger(e.columnCount) || e.columnCount <= 0) throw RangeError("Column count must be a positive integer");
	for (let t of e.fragments) if (!Number.isFinite(t.extentPt) || t.extentPt < 0) throw RangeError("Column balance fragment extents must be finite and non-negative");
	if (e.fragments.length === 0) return Object.freeze({
		targetPt: 0,
		cutIndexes: Object.freeze([]),
		transitionExpansions: 0
	});
	let t = [0], n = [0], r = [];
	e.fragments.forEach((i, a) => {
		t.push(t[a] + i.extentPt);
		let o = a + 1;
		(i.breakAfter !== "forbidden" || o === e.fragments.length) && n.push(o), i.breakAfter === "forced" && o < e.fragments.length && r.push(o);
	});
	let i = Math.min(e.columnCount, n.length - 1), a = Array.from({ length: i + 1 }, () => Array(n.length).fill(Infinity)), o = Array.from({ length: i + 1 }, () => Array(n.length).fill(-1));
	a[0][0] = 0;
	let s = 0;
	for (let e = 1; e <= i; e += 1) {
		let i = a[e - 1], c = a[e], l = i.flatMap((e, t) => Number.isFinite(e) ? [t] : []), u = 0, d = 0, f = 0, p = 0;
		for (let a = 1; a < n.length; a += 1) {
			let m = n[a];
			for (; d < r.length && r[d] < m;) f = r[d], d += 1;
			for (; n[p] < f;) p += 1;
			for (; u < l.length && l[u] < p;) u += 1;
			let h = l[u];
			if (h === void 0 || h >= a) continue;
			let g = (e) => {
				s += 1;
				let r = n[e];
				return Math.max(i[e], t[m] - t[r]);
			}, _ = h, v = g(_);
			for (; u + 1 < l.length;) {
				let e = l[u + 1];
				if (e >= a) break;
				let t = g(e);
				if (t > v) break;
				u += 1, _ = e, v = t;
			}
			c[a] = v, o[e][a] = _;
		}
	}
	let c = n.length - 1, l = -1, u = Infinity;
	for (let e = 1; e <= i; e += 1) {
		let t = a[e][c];
		t <= u && (u = t, l = e);
	}
	if (l < 0 || !Number.isFinite(u)) throw Error("Authored column breaks exceed the available column frontier");
	let d = [], f = c;
	for (let e = l; e > 0; --e) if (d.push(n[f]), f = o[e][f], f < 0) throw Error("Column balance frontier omitted a predecessor");
	return d.reverse(), Object.freeze({
		targetPt: u,
		cutIndexes: Object.freeze(d),
		transitionExpansions: s
	});
}
//#endregion
//#region packages/docx/src/layout/column-balance-frontier.ts
function fy(e) {
	let t = /* @__PURE__ */ new Map();
	return e.sequence.forEach((e, n) => {
		if (e.kind === "body-block") {
			let r = e.block;
			t.set(B(r.source), Object.freeze({
				sequenceIndex: n,
				keepLines: r.kind === "paragraph" && r.keepLines,
				keepNext: r.kind === "paragraph" && r.keepNext,
				widowControl: r.kind === "paragraph" && r.widowControl
			}));
			return;
		}
		e.kind === "adjacent-table-group" && e.tables.forEach((e) => t.set(B(e.source), Object.freeze({
			sequenceIndex: n,
			keepLines: !1,
			keepNext: !1,
			widowControl: !1
		})));
	}), t;
}
function py(e, t, n) {
	let r = t - e;
	if (n.length <= 1) return Object.freeze([r]);
	let i = [], a = e;
	for (let e of n) {
		if (!Number.isFinite(e) || e < a || e > t) return Object.freeze([r]);
		i.push(e - a), a = e;
	}
	return i[i.length - 1] = i.at(-1) + t - a, Object.freeze(i);
}
function my(e, t, n, r) {
	let i = new Set(r.flowDomainIds), a = new Map(n.layers.body.map((e) => [e.id, e])), o = fy(e), s = [];
	for (let e of t) {
		if (!i.has(e.flowDomainId)) continue;
		let t = a.get(e.nodeId);
		if (!t || !t.ordinaryFlow) continue;
		let n = B(t.source), r = o.get(n);
		if (!r) continue;
		let c = t.kind === "paragraph" && !r.keepLines && t.lines.length > 1 ? t.lines.map((e) => e.bounds.yPt + e.advancePt) : t.kind === "table" && t.rows.length > 1 ? t.rows.map((e) => e.flowBounds.yPt + e.advancePt) : [e.blockEndPt];
		py(e.blockStartPt, e.blockEndPt, c).forEach((e) => s.push({
			extentPt: e,
			breakAfter: "allowed",
			sequenceIndex: r.sequenceIndex,
			sourceIdentity: n,
			paragraphLine: t.kind === "paragraph" && !r.keepLines && t.lines.length > 0
		}));
	}
	let c = /* @__PURE__ */ new Map();
	s.forEach((e, t) => {
		let n = c.get(e.sourceIdentity) ?? [];
		n.push(t), c.set(e.sourceIdentity, n);
	});
	for (let [e, t] of c) {
		let n = o.get(e);
		if (!n) continue;
		let r = t.filter((e) => s[e].paragraphLine);
		n.keepLines && t.slice(0, -1).forEach((e) => {
			s[e].breakAfter = "forbidden";
		});
		for (let e = 0; e + 1 < r.length; e += 1) ih({
			widowControl: n.widowControl,
			start: 0,
			end: e + 1,
			totalLines: r.length,
			canRelocate: !0
		}).kind !== "keep" && (s[r[e]].breakAfter = "forbidden");
		n.keepNext && (s[t.at(-1)].breakAfter = "forbidden");
	}
	let l = e.initialSection.sectionOccurrenceId;
	return e.sequence.forEach((e, t) => {
		if (e.kind === "begin-section") {
			l = e.section.sectionOccurrenceId;
			return;
		}
		if (!(l !== r.sectionOccurrenceId || e.kind !== "authored-break" || e.break !== "column")) {
			for (let e = s.length - 1; e >= 0; --e) if (!(s[e].sequenceIndex >= t)) {
				s[e].breakAfter = "forced";
				break;
			}
		}
	}), Object.freeze(s.map((e) => Object.freeze(e)));
}
function hy(e, t, n, r, i) {
	let a = my(e, t, r, i), o = n.get(r.pageIndex) ?? 0;
	return dy({
		columnCount: i.flowDomainIds.length,
		fragments: a
	}).targetPt + o;
}
//#endregion
//#region packages/docx/src/layout/section-flow-composition.ts
function gy(e, t, n, r, i) {
	let a = t, o = e.lines.map((t, o) => {
		let s = a++, c = String(s), l = i.measureLineNumberGlyph(c), u = Object.freeze({
			xPt: e.flowBounds.xPt - r,
			yPt: t.baselinePt
		});
		return Object.freeze({
			lineIndex: o,
			counterValue: s,
			bounds: Object.freeze({
				xPt: u.xPt - l.widthPt,
				yPt: u.yPt - l.ascentPt,
				widthPt: l.widthPt,
				heightPt: l.ascentPt + l.descentPt
			}),
			paintOps: s % n === 0 ? Object.freeze([Object.freeze({
				kind: "text",
				text: c,
				origin: u,
				font: l.font ?? "",
				color: "#000000",
				textAlign: "right"
			})]) : Object.freeze([])
		});
	});
	return Object.freeze({
		paragraph: Object.freeze({
			...e,
			lineNumbers: Object.freeze(o)
		}),
		counterEnd: a
	});
}
function _y(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i, a = e.pages.map((e) => {
		if (e.parityBlank) return e;
		let a = [...e.layers.body];
		for (let o = 0; o < e.sectionRegions.length; o += 1) {
			let s = e.sectionRegions[o], c = new Set(s.flowDomainIds), l = a.flatMap((e, t) => c.has(e.flowDomainId) ? [t] : []), u = new Map(l.map((e) => [a[e].id, a[e]])), d = n.filter((e) => {
				let t = u.get(e.nodeId);
				return c.has(e.flowDomainId) && e.blockEndPt > e.blockStartPt && t !== void 0 && (t.ordinaryFlow || t.sectionFlowOwnership === "host-flow");
			}), f = d.length === 0 ? s.blockStartPt : Math.min(...d.map((e) => e.blockStartPt)), p = d.length === 0 ? f : Math.max(...d.map((e) => e.blockEndPt)), m = s.blockEndPt, h = Math.max(0, m - s.blockStartPt), g = Math.max(0, p - f), _ = s.section.verticalAlignment, v = d.length > 0 && g < h ? _ === "center" ? s.blockStartPt + (h - g) / 2 - f : _ === "bottom" ? m - g - f : 0 : 0, y = s.section.lineNumbering, b = y?.restart === "newPage" ? y.start : y?.restart === "newSection" ? r.get(s.sectionOccurrenceId) ?? y.start : r.get(s.sectionOccurrenceId) ?? i ?? y?.start ?? 1;
			b ??= 1;
			for (let e of l) {
				let n = a[e];
				if (n.kind === "paragraph" && n.ordinaryFlow && y) {
					let e = gy(n, b, Math.max(1, y.countBy), Lu(y.distance), t);
					n = e.paragraph, b = e.counterEnd;
				}
				v !== 0 && (n.ordinaryFlow || n.sectionFlowOwnership === "host-flow") && (n.kind === "paragraph" || n.kind === "table") && (n = zm(n, {
					xPt: 0,
					yPt: v
				})), a[e] = n;
			}
			y && (r.set(s.sectionOccurrenceId, b), i = b);
		}
		return Object.freeze({
			...e,
			layers: ai(e.layers, "body", a)
		});
	});
	return Object.freeze({
		...e,
		pages: Object.freeze(a)
	});
}
//#endregion
//#region packages/docx/src/layout/track-changes.ts
function vy(e) {
	let t = /* @__PURE__ */ new Map(), n = (e) => {
		t.has(e) || t.set(e, t.size);
	}, r = (e) => {
		for (let t of e) if (t.type === "paragraph" && t.runs) for (let e of t.runs) e.revision?.kind && n(e.revision.author ?? "");
		else if (t.type === "table" && t.rows) for (let e of t.rows) for (let t of e.cells) r(t.content);
	};
	return r(e), (e) => {
		let r = e ?? "";
		return n(r), vh[(t.get(r) ?? 0) % vh.length];
	};
}
var yy = .75;
function by(e) {
	return e.placements.some((e) => e.kind === "text" && e.revision !== void 0);
}
function xy(e) {
	return e.kind === "paragraph" ? e.lines.filter(by) : e.rows.flatMap((e) => e.cells.flatMap((e) => e.blocks.flatMap((e) => xy(e.layout))));
}
function Sy(e) {
	let t = !1, n = e.pages.map((e) => {
		let n = e.layers.body.flatMap((e) => e.kind === "paragraph" || e.kind === "table" ? xy(e) : []);
		if (n.length === 0) return e;
		t = !0;
		let r = Math.max(0, e.section.geometry.marginLeft / 2 - yy / 2), i = Object.freeze(n.map((e) => Object.freeze({ bounds: Object.freeze({
			xPt: r,
			yPt: e.bounds.yPt,
			widthPt: yy,
			heightPt: e.bounds.heightPt
		}) })));
		return Object.freeze({
			...e,
			changeBars: i
		});
	});
	return t ? Object.freeze({
		...e,
		pages: Object.freeze(n)
	}) : e;
}
//#endregion
//#region packages/docx/src/layout/section-page-identity.ts
function Cy(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = new Set(n.contentFlowDomainIds);
		for (let r of n.sectionRegions) !t.has(r.sectionOccurrenceId) && r.flowDomainIds.some((t) => e.has(t)) && t.set(r.sectionOccurrenceId, n.pageIndex);
	}
	return t;
}
function wy(e, t) {
	let n = e[t];
	return n ? t === 0 || e[t - 1]?.sectionOccurrenceId !== n.sectionOccurrenceId : !1;
}
//#endregion
//#region packages/docx/src/layout/header-footer-reserve.ts
function Ty(e, t) {
	return t.titlePage && t.firstPageOfSection ? e.first : t.evenAndOddHeaders && t.displayPageNumber % 2 == 0 ? e.even : e.default;
}
function Ey(e, t) {
	if (![
		e.pageHeight,
		e.marginTop,
		e.marginBottom,
		t.top,
		t.bottom
	].every(Number.isFinite)) throw RangeError("Reserved body interval inputs must be finite");
	if (e.pageHeight <= 0 || t.top < 0 || t.bottom < 0) throw RangeError("Reserved body interval requires a positive page and non-negative reserves");
	let n = Math.min(e.pageHeight, Math.abs(e.marginTop) + t.top), r = e.pageHeight - Math.abs(e.marginBottom) - t.bottom;
	return Object.freeze({
		blockStartPt: n,
		blockEndPt: Math.max(n, Math.min(e.pageHeight, r))
	});
}
function Dy(e, t, n) {
	if (![
		e,
		t,
		n
	].every(Number.isFinite)) throw RangeError("Header/footer reserve inputs must be finite");
	if (e < 0) throw RangeError("Story extent must be non-negative");
	return e === 0 || t < 0 ? 0 : Math.max(0, e - (t - n));
}
function Oy(e) {
	return e.blocks.length <= 1 && e.blocks.every((e) => e.kind === "paragraph" && e.borders.length === 0 && e.shading === void 0 && e.resources.length === 0 && e.drawings.length === 0 && e.textBoxes.length === 0 && e.events.length === 0 && e.exclusions.length === 0 && (e.lineNumbers?.length ?? 0) === 0 && (e.anchorFrames?.length ?? 0) === 0 && e.lines.every((e) => (e.barTabRules?.length ?? 0) === 0 && e.placements.every((e) => e.kind === "text" && /^ *$/.test(e.text) && e.role !== "field-result" && e.dependency === void 0 && e.hyperlink === void 0 && e.paintOps.every((e) => /^ *$/.test(e.text)) && e.decorations.length === 0 && e.highlight === void 0 && (e.highlightFragments?.length ?? 0) === 0 && e.background === void 0 && e.runBorder === void 0 && (e.runBorderFragments?.length ?? 0) === 0 && e.ruby === void 0 && e.emphasis === void 0 && e.emphasisMark === void 0 && e.noteReference === void 0))) ? 0 : e.advancePt;
}
function* ky(e) {
	let t = (t) => {
		let n = Object.freeze(e.measure(t).map((e) => Object.freeze({ ...e })));
		return Object.freeze({
			result: t,
			reserves: n,
			pageCount: n.length,
			fingerprint: nt("header-footer-reserve-v1", {
				identity: e.identity(t),
				reserves: n
			})
		});
	}, n = t(e.seed);
	return !e.requiresConvergence && n.reserves.every((e) => e.top === 0 && e.bottom === 0) ? n : yield* Ho(n, function* (n) {
		return t(yield* e.repaginate(n.reserves, n.result));
	}, e.limit ?? 16);
}
//#endregion
//#region packages/docx/src/layout/flow.ts
var Ay = class extends H {
	constructor(e, t) {
		super("INVALID_GEOMETRY", `${t} exceeds the available flow capacity`), this.containerId = e, this.layoutId = t, this.name = "FlowCapacityExceededError";
	}
};
function jy(e, t) {
	if (e.length === 0) return {
		xPt: t.xPt,
		yPt: t.yPt,
		widthPt: 0,
		heightPt: 0
	};
	let n = Math.min(...e.map((e) => e.xPt)), r = Math.min(...e.map((e) => e.yPt)), i = Math.max(...e.map((e) => e.xPt + e.widthPt)), a = Math.max(...e.map((e) => e.yPt + e.heightPt));
	return {
		xPt: n,
		yPt: r,
		widthPt: i - n,
		heightPt: a - r
	};
}
function My(e, t, n) {
	let r = [], i = e.cursor, a = e.container.bounds;
	if (![
		a.xPt,
		a.yPt,
		a.widthPt,
		a.heightPt
	].every(Number.isFinite) || a.widthPt < 0 || a.heightPt < 0) throw new H("INVALID_GEOMETRY", `${e.container.id} has invalid bounds`);
	let o = e.container.bounds.yPt + e.container.bounds.heightPt, s = e.container.capacity === "unbounded" ? 2 ** 53 - 1 : o, c = e.container.bounds.xPt + e.container.bounds.widthPt;
	if (!Number.isFinite(i.xPt) || !Number.isFinite(i.yPt) || i.xPt < a.xPt || i.xPt > c || i.yPt < a.yPt || i.yPt > o) throw new H("INVALID_GEOMETRY", `${e.container.id} has an invalid initial flow cursor`);
	for (let a of e.blocks) {
		let l = {
			container: e.container,
			cursor: i,
			availableBounds: {
				xPt: e.container.bounds.xPt,
				yPt: i.yPt,
				widthPt: e.container.bounds.widthPt,
				heightPt: Math.max(0, s - i.yPt)
			}
		}, u = a.kind === "paragraph" ? n.layoutParagraph(a, l, t) : n.layoutTable(a, l, t);
		if (u.layout.flowDomainId !== e.container.id) throw new H("INVALID_REFERENCE", `${u.layout.id} belongs to ${u.layout.flowDomainId}, not ${e.container.id}`);
		if (e.container.capacity !== "unbounded" && Number.isFinite(u.nextCursor.yPt) && u.nextCursor.yPt > o) throw new Ay(e.container.id, u.layout.id);
		if (!Number.isFinite(u.nextCursor.xPt) || !Number.isFinite(u.nextCursor.yPt) || u.nextCursor.xPt < e.container.bounds.xPt || u.nextCursor.xPt > c || u.nextCursor.yPt < i.yPt) throw new H("INVALID_GEOMETRY", `${u.layout.id} returned an invalid flow cursor`);
		r.push(u.layout), i = u.nextCursor;
	}
	return {
		source: e.source,
		container: e.container,
		blocks: r,
		nextCursor: i,
		flowDomainId: e.container.id,
		flowBounds: jy(r.map((e) => e.flowBounds), e.container.bounds),
		inkBounds: jy(r.map((e) => e.inkBounds), e.container.bounds),
		...e.container.capacity === "unbounded" ? {} : { clipBounds: e.container.bounds },
		advancePt: i.yPt - e.cursor.yPt,
		ordinaryFlow: !0
	};
}
//#endregion
//#region packages/docx/src/layout/stories.ts
var Ny = /* @__PURE__ */ new WeakMap(), Py = (e) => "type" in e && e.type === "unsupportedTextBoxBlock";
function Fy(e, t) {
	if (Ny.has(e)) throw Error("Story block layout algorithms are already attached");
	Ny.set(e, Object.freeze({ ...t }));
}
function Iy(e, t) {
	return Object.freeze({
		...e,
		flowBounds: Y(e.flowBounds, t),
		inkBounds: Y(e.inkBounds, t),
		...e.clipBounds ? { clipBounds: Y(e.clipBounds, t) } : {},
		blocks: Object.freeze(e.blocks.map((e) => {
			if (e.kind === "paragraph") return jm(e, t);
			if (e.kind === "table") return Mm(e, t);
			throw Error(`Story contains unsupported retained node: ${e.kind}`);
		}))
	});
}
function Ly(e, t) {
	return Object.freeze({
		...e,
		flowBounds: Y(e.flowBounds, t),
		inkBounds: Y(e.inkBounds, t),
		...e.clipBounds ? { clipBounds: Y(e.clipBounds, t) } : {},
		separator: Object.freeze(e.separator.map((e) => vm(e, t))),
		story: Iy(e.story, t)
	});
}
function Ry(e, t) {
	for (let t of e.blocks) if (!Py(t) && (t.source.story !== e.source.story || t.source.storyInstance !== e.source.storyInstance)) throw new H("INVALID_REFERENCE", `Story block ${t.source.story}:${t.source.storyInstance} is not owned by ${e.source.story}:${e.source.storyInstance}`);
	let n = Ny.get(t);
	if (!n) throw Error("Story block layout algorithms are not attached to the supplied services");
	let r = e.blocks.filter(Py), i = My({
		blocks: e.blocks.filter((e) => !Py(e)),
		container: e.container,
		cursor: {
			xPt: e.container.bounds.xPt,
			yPt: e.container.bounds.yPt
		},
		source: e.source
	}, t, n);
	return Object.freeze({
		story: e.source.story,
		flowBounds: i.flowBounds,
		inkBounds: i.inkBounds,
		...i.clipBounds ? { clipBounds: i.clipBounds } : {},
		blocks: Object.freeze([...i.blocks]),
		advancePt: i.advancePt,
		diagnostics: Object.freeze(r.map((t) => Object.freeze({
			code: "UNSUPPORTED_FEATURE",
			severity: "warning",
			source: Object.freeze({
				story: e.source.story,
				storyInstance: e.source.storyInstance,
				path: Object.freeze([...t.sourcePath])
			}),
			message: `Unsupported text-box block ${t.qName}`
		})))
	});
}
//#endregion
//#region packages/docx/src/layout/body-paginator.ts
var zy = 1e4, By = class extends Error {
	code = "FOOTNOTE_RESERVE_EXCEEDS_FRESH_PAGE";
	constructor(e, t, n) {
		super(`Body footnote admission cannot fit a fresh physical page (reserve: ${e}, charge: ${t}, fresh page: ${n})`), this.reservePt = e, this.admissionChargePt = t, this.freshPageExtentPt = n, this.name = "FootnoteAdmissionOverflowError";
	}
};
function Vy(e, t) {
	if (t.has(e)) return [];
	t.add(e);
	let n = e.diagnostics ?? [];
	return e.kind === "paragraph" ? [
		...n,
		...e.drawings.flatMap((e) => Vy(e, t)),
		...e.textBoxes.flatMap((e) => Vy(e, t))
	] : e.kind === "table" ? [
		...n,
		...e.rows.flatMap((e) => e.cells.flatMap((e) => e.blocks.flatMap((e) => Vy(e.layout, t)))),
		...(e.floatingTables ?? []).flatMap((e) => Vy(e.child, t)),
		...(e.resolvedFloatingTables ?? []).flatMap((e) => Vy(e.child, t))
	] : e.kind === "textbox" || e.kind === "note" ? [
		...n,
		...e.story.diagnostics,
		...e.story.blocks.flatMap((e) => Vy(e, t))
	] : n;
}
function Hy(e, t, n) {
	if (e > 0 && t > n) throw new By(e, t, n);
}
function Uy(e) {
	let t = /* @__PURE__ */ new Set(), n = (e) => {
		for (let r of e.resolvedFloatingTables ?? []) t.add(r.occurrenceId), n(r.child);
	};
	return n(e), t;
}
function Wy(e, t, n) {
	if (!e.floats) throw Error("Accepted floating table omitted its float registry delta");
	let r = Uy(t);
	return Object.freeze({
		...e,
		floats: Object.freeze({
			...e.floats,
			entries: Object.freeze(e.floats.entries.map((e) => {
				let i = r.has(e.occurrenceId) ? Nm(n, e.occurrenceId) : t.ordinaryFlow ? null : n;
				return i === null ? e : Object.freeze({
					...e,
					occurrenceId: i,
					exclusionId: i
				});
			}))
		})
	});
}
function Gy(e, t) {
	let n = new Set(t.drawings.flatMap((e) => {
		let t = e.anchorLayer?.acquisitionOccurrenceId ?? e.anchorLayer?.occurrenceId;
		return t === void 0 ? [] : [t];
	})), r = e.floats?.entries.filter((e) => n.has(e.occurrenceId)) ?? [], i = e.drawingCollisions?.entries.filter((e) => n.has(e.occurrenceId)) ?? [];
	return r.length === 0 && i.length === 0 ? null : Object.freeze({
		...e.floats && r.length > 0 ? { floats: Object.freeze({
			...e.floats,
			entries: Object.freeze(r),
			nextParagraphId: e.floats.baseNextParagraphId + r.length
		}) } : {},
		...e.drawingCollisions && i.length > 0 ? { drawingCollisions: Object.freeze({
			...e.drawingCollisions,
			entries: Object.freeze(i)
		}) } : {}
	});
}
function Ky(e) {
	let t = new Map([[e.initialSection.sectionOccurrenceId, e.initialSection]]);
	for (let n = 0; n < e.sequence.length; n += 1) {
		let r = e.sequence[n];
		r.kind === "begin-section" && t.set(r.section.sectionOccurrenceId, r.section);
	}
	return t;
}
function qy(e, t) {
	return Yu(e.context, e.pageLayout, t);
}
function Jy(e, t) {
	let n = qy(e, t);
	return Vu({
		sectionOccurrenceId: e.sectionOccurrenceId,
		geometry: n.geometry,
		columns: n.columns,
		textDirection: n.textDirection,
		sectionBidi: n.sectionBidi === !0,
		grid: n.grid
	});
}
function Yy(e, t, n, r = n.blockStartPt, i = qy(e, t).columns.map((e, t) => t)) {
	let a = qy(e, t);
	return Object.freeze({
		id: `page:${t}:section:${encodeURIComponent(e.sectionOccurrenceId)}`,
		sectionOccurrenceId: e.sectionOccurrenceId,
		section: a,
		pageBorders: e.pageBordersAuthored ? e.pageBorders : null,
		writingMode: mi(a.textDirection),
		blockStartPt: r,
		blockEndPt: n.blockEndPt,
		columnFlowDirection: a.sectionBidi === !0 ? "rtl" : "ltr",
		columnIndexes: Object.freeze([...i]),
		columns: Object.freeze(i.map((e) => {
			let t = a.columns[e];
			if (!t) throw Error("Missing authored section column");
			return Object.freeze({
				inlineStartPt: t.xPt,
				inlineExtentPt: t.wPt
			});
		}))
	});
}
function Xy(e, t) {
	let n = mi(e.textDirection), r = bi({
		widthPt: e.geometry.pageWidth,
		heightPt: e.geometry.pageHeight
	}, n);
	return Object.freeze(n === "horizontal-tb" ? {
		...r,
		contentTopPt: t.blockStartPt,
		contentBottomPt: t.blockEndPt
	} : {
		...r,
		contentTopPt: 0,
		contentBottomPt: r.heightPt
	});
}
function Zy(e, t, n) {
	return Ey(qy(e, t).geometry, n);
}
function Qy(e, t, n) {
	let r = qy(e, t);
	return um({
		kind: "content",
		pageIndex: t,
		physicalPage: Xy(r, n),
		sectionOccurrenceId: e.sectionOccurrenceId,
		section: r,
		region: Yy(e, t, n)
	});
}
function $y(e) {
	let t = e.pages.at(-1), n = t?.accumulator.sectionRegions.at(-1);
	if (!t || t.kind !== "content" || !n) throw Error("Missing active body region");
	return n;
}
function eb(e) {
	let t = $y(e), n = t.columnIndexes ?? t.section.columns.map((e, t) => t), r = (t.columnFlowDirection === "rtl" ? [...n].reverse() : [...n]).at(-1) === e.flow.columnIndex;
	return e.balanceTargetPt === null || r ? t.blockEndPt : Math.min(t.blockEndPt, t.blockStartPt + e.balanceTargetPt);
}
function tb(e) {
	let t = $y(e), n = t.columnIndexes ?? t.section.columns.map((e, t) => t), r = t.columns[n.indexOf(e.flow.columnIndex)];
	if (!r) throw Error("Missing active body column");
	return Object.freeze({
		pageIndex: e.flow.pageIndex,
		columnIndex: e.flow.columnIndex,
		flowDomainId: id(e.flow.pageIndex, t.id, e.flow.columnIndex),
		section: t.section,
		cursorPt: Object.freeze({
			xPt: r.inlineStartPt,
			yPt: e.flow.cursorBlockPt
		}),
		availableBounds: Object.freeze({
			xPt: r.inlineStartPt,
			yPt: e.flow.cursorBlockPt,
			widthPt: r.inlineExtentPt,
			heightPt: Math.max(0, eb(e) - e.footnoteReservePt - e.flow.cursorBlockPt)
		})
	});
}
function nb(e, t) {
	let n = (t) => {
		let n = e.get(t);
		if (!n) throw Error(`Unknown body section ${t}`);
		return n;
	};
	return {
		openContentPage(e) {
			let r = n(e.sectionOccurrenceId), i = t[e.pageIndex] ?? {
				top: 0,
				bottom: 0
			}, a = Zy(r, e.pageIndex, i), o = Wm(Jy(r, e.pageIndex), {
				pageIndex: e.pageIndex,
				pageContentStartBlockPt: a.blockStartPt,
				pageContentEndBlockPt: a.blockEndPt
			});
			return {
				page: Qy(r, e.pageIndex, a),
				flow: o
			};
		},
		openParityBlankPage(e) {
			let r = n(e.sectionOccurrenceId), i = qy(r, e.pageIndex), a = Zy(r, e.pageIndex, t[e.pageIndex] ?? {
				top: 0,
				bottom: 0
			});
			return um({
				kind: "parity-blank",
				pageIndex: e.pageIndex,
				physicalPage: Xy(i, a),
				sectionOccurrenceId: r.sectionOccurrenceId,
				section: i,
				pageBorders: r.pageBordersAuthored ? r.pageBorders : null
			});
		},
		openSamePageSectionRegion(e, t, r) {
			let i = n(t.section.sectionOccurrenceId), a = e.accumulator.sectionRegions, o = a.at(-1);
			if (!o || !("placement" in t)) throw Error("A same-page section requires explicit retained placement");
			let s = Object.freeze({
				blockStartPt: e.accumulator.sectionRegions[0].blockStartPt,
				blockEndPt: o.blockEndPt
			}), c = t.placement === "same-page-block" ? Object.freeze({
				...o,
				blockEndPt: r.regionStartBlockPt
			}) : (() => {
				let e = t.outgoingColumnSubset;
				if (!e || e.length === 0) throw Error("A same-page-column transition requires outgoing column ownership");
				return Object.freeze({
					...o,
					columnIndexes: Object.freeze([...e]),
					columns: Object.freeze(e.map((e) => {
						let t = o.section.columns[e];
						if (!t) throw Error("Missing outgoing authored column");
						return Object.freeze({
							inlineStartPt: t.xPt,
							inlineExtentPt: t.wPt
						});
					}))
				});
			})(), l = Object.freeze([...a.slice(0, -1), c]);
			return Object.freeze({
				...e,
				accumulator: wd(Object.freeze({
					...e.accumulator,
					sectionRegions: l
				}), Yy(i, r.pageIndex, s, r.regionStartBlockPt, t.columnSubset))
			});
		}
	};
}
function rb(e, t, n, r, i, a, o, s) {
	let c = e.pages.at(-1);
	if (!c || c.kind !== "content") throw Error("Body content requires an active page");
	let l = $y(e), u = l.columnIndexes ?? l.section.columns.map((e, t) => t), d = l.columns[u.indexOf(e.flow.columnIndex)], f = id(e.flow.pageIndex, l.id, e.flow.columnIndex), p = it(n, f, i);
	if (a.has(p)) throw Error(`Duplicate body occurrence acceptance: ${p}`);
	a.add(p);
	let m = Bm(t, {
		occurrenceId: p,
		destination: {
			coordinateSpace: "logical-page-points",
			flowDomainId: f,
			translation: {
				xPt: s ? s.xPt - t.flowBounds.xPt : t.kind === "table" ? d.inlineStartPt : d.inlineStartPt - t.flowBounds.xPt,
				yPt: (s?.yPt ?? e.flow.cursorBlockPt) - t.flowBounds.yPt
			}
		}
	}), h = s?.sectionFlowOwnership === void 0 ? m : Object.freeze({
		...m,
		sectionFlowOwnership: s.sectionFlowOwnership
	}), g = s?.yPt ?? e.flow.cursorBlockPt, _ = h.kind === "paragraph" && h.ordinaryFlow ? (() => {
		let e = g + h.spacing.beforePt, t = g + r - h.spacing.afterPt;
		return Object.freeze({
			...h,
			flowBounds: Object.freeze({
				...h.flowBounds,
				yPt: e,
				heightPt: Math.max(0, t - e)
			})
		});
	})() : h, v = s?.coordinateSpace === "upright-physical" ? {
		..._,
		ordinaryFlow: !1,
		flowBounds: Object.freeze({
			..._.flowBounds,
			heightPt: r
		})
	} : _, y = Km(e.flow, v, r), b = y.events[0];
	if (!b || b.type !== "place") throw Error("Flow placement did not emit an allocation");
	o.push(Object.freeze({
		nodeId: v.id,
		flowDomainId: v.flowDomainId,
		blockStartPt: b.blockStartPt,
		blockEndPt: b.blockEndPt
	}));
	let x = Td(c.accumulator, {
		layer: "body",
		node: v,
		...s?.coordinateSpace === "upright-physical" ? { coordinateSpace: "upright-physical" } : {}
	}, !0), S = [...e.pages];
	return S[S.length - 1] = Object.freeze({
		...c,
		accumulator: x
	}), Object.freeze({
		...e,
		flow: y.state,
		pages: Object.freeze(S)
	});
}
function ib(e) {
	return e.boundary === null ? "root" : `paragraph:${e.boundary.segIndex}:${e.boundary.charOffset}`;
}
function ab(e, t) {
	for (let n = t; n < e.sequence.length; n += 1) {
		let t = e.sequence[n];
		if (t.kind === "consume-source") continue;
		if (t.kind === "authored-break") {
			if (t.break !== "lastRenderedPageBreak") return !1;
			continue;
		}
		if (t.kind === "begin-section") {
			if (t.section.startType !== "continuous") return !1;
			continue;
		}
		let r = t.kind === "adjacent-table-group" ? t : t.block;
		if (r.kind !== "paragraph") return !0;
		if (r.pageBreakBefore) return !1;
		if (r.inkless !== !0) return !0;
	}
	return !1;
}
function ob(e) {
	return e.paragraphMark !== void 0 && e.lines.length === 0 && e.shading === void 0 && e.borders.length === 0 && e.resources.length === 0 && e.drawings.length === 0 && e.textBoxes.length === 0;
}
function sb(e) {
	return [
		e.rowIndex,
		e.rowFragmentIndex,
		e.cells.map((e) => [
			e.blockIndex,
			e.paragraphLineStart,
			e.nestedFragmentIndex,
			e.nestedCursor === null ? null : sb(e.nestedCursor)
		])
	];
}
function cb(e) {
	if (e === void 0) return "root";
	if (e.kind === "table") return `table:${JSON.stringify(sb(e.cursor))}`;
	let t = e.cursor.tableCursor;
	return `adjacent-table:${e.cursor.tableIndex}:${e.cursor.sourceRowIndex}:${JSON.stringify(t === void 0 ? null : sb(t))}`;
}
function lb(e, t) {
	let n = e.cursorPt.yPt + t, r = e.availableBounds.yPt + e.availableBounds.heightPt;
	return Object.freeze({
		...e,
		cursorPt: Object.freeze({
			...e.cursorPt,
			yPt: n
		}),
		availableBounds: Object.freeze({
			...e.availableBounds,
			yPt: n,
			heightPt: Math.max(0, r - n)
		})
	});
}
function ub(e, t) {
	let n = Cy(e.pages.map((e) => ({
		pageIndex: e.accumulator.pageIndex,
		sectionRegions: e.accumulator.sectionRegions.map((t) => ({
			sectionOccurrenceId: t.sectionOccurrenceId,
			flowDomainIds: (t.columnIndexes ?? t.section.columns.map((e, t) => t)).map((n) => id(e.accumulator.pageIndex, t.id, n))
		})),
		contentFlowDomainIds: e.accumulator.readingOrder.map((e) => e.flowDomainId)
	}))), r = 0, i = null, a = e.pages.map((e) => {
		let a = t.get(e.accumulator.sectionOccurrenceId), o = a.sectionOccurrenceId !== i;
		a.sectionOccurrenceId !== i && a.pageNumbering.start !== null ? r = Ru(a.pageNumbering.start, e.accumulator.pageIndex, n.get(a.sectionOccurrenceId) ?? e.accumulator.pageIndex) : r += 1, i = a.sectionOccurrenceId;
		let s = {
			displayNumber: r,
			format: a.pageNumbering.format ?? "decimal",
			sectionOccurrenceId: a.sectionOccurrenceId
		};
		return e.kind === "parity-blank" ? Dd({
			pageIndex: e.accumulator.pageIndex,
			physicalPage: e.accumulator.physicalPage,
			sectionOccurrenceId: e.accumulator.sectionOccurrenceId,
			section: e.accumulator.section,
			pageBorders: e.accumulator.pageBorders,
			firstSectionOwnedPage: o,
			pageNumber: s
		}) : Ed(e.accumulator, s, o);
	}), o = /* @__PURE__ */ new WeakSet();
	return {
		pages: a,
		diagnostics: a.flatMap((e) => oi(e).flatMap(({ node: e }) => Vy(e, o)))
	};
}
function db(e, t, n, r, i, a, o) {
	let s = ub(e, t), c = new Set(s.pages.map((e) => e.pageIndex)), l = new Set(s.pages.flatMap((e) => oi(e).map(({ node: e }) => e.id)));
	return Object.freeze({
		layout: s,
		session: n,
		allocations: Object.freeze(r.filter((e) => l.has(e.nodeId))),
		footnoteReserveByPage: new Map([...i].filter(([e]) => c.has(e))),
		footnoteLayoutsByPage: new Map([...a].filter(([e]) => c.has(e))),
		terminalDiagnostic: o
	});
}
function fb(e) {
	let t = e.next();
	for (; !t.done;) t = e.next();
	return t.value;
}
function* pb(e, t, n, r, i, a, o, s) {
	let c = Cr(t);
	if (!c) throw Error("Body layout kernel is not attached to the supplied services");
	let l = Ky(e), u = /* @__PURE__ */ new Set(), d = [], f = r[0] ?? {
		top: 0,
		bottom: 0
	}, p = Zy(e.initialSection, 0, f), m = dm(Wm(Jy(e.initialSection, 0), {
		pageContentStartBlockPt: p.blockStartPt,
		pageContentEndBlockPt: p.blockEndPt
	}), Qy(e.initialSection, 0, p)), h = (e) => {
		let t = o.get(e.flow.section.sectionOccurrenceId);
		return t?.pageIndex === e.flow.pageIndex ? t.targetPt : null;
	};
	m = fm(m, h(m));
	let g = nb(l, r), _ = null, v = null, y = c.openBodyLayoutSession({
		source: e.source,
		section: e.initialSection.context,
		initialLocation: tb(m)
	}, t, n), b = (e) => {
		let t = l.get(e.flow.section.sectionOccurrenceId);
		if (!t) throw Error(`Unknown body section ${e.flow.section.sectionOccurrenceId}`);
		let n = e.flow.pageIndex + 1, i = Zy(t, n, r[n] ?? {
			top: 0,
			bottom: 0
		});
		return i.blockEndPt - i.blockStartPt;
	}, x = (t, n) => {
		if (i !== null) {
			let e = tb(t);
			return Object.freeze([...i.values()].filter((t) => t.pageIndex === e.pageIndex && t.flowDomainId === e.flowDomainId).map((e) => e.kind === "drawing" ? Object.freeze({
				kind: "drawing",
				occurrenceId: e.occurrenceId,
				paragraphSource: e.paragraphSource
			}) : Object.freeze({
				kind: "floating-table",
				occurrenceId: e.occurrenceId,
				tableSource: e.tableSource,
				bounds: e.bounds
			})));
		}
		let r = [];
		for (let t = n; t < e.sequence.length; t += 1) {
			let i = e.sequence[t];
			if (i.kind === "authored-break" && i.break !== "column" || i.kind === "begin-section" && i.section.startType !== "continuous") break;
			if (!(i.kind !== "body-block" || i.block.kind !== "paragraph")) {
				if (t > n && i.block.pageBreakBefore) break;
				i.block.pageOwnedAnchorOccurrenceIds?.forEach((e) => r.push(Object.freeze({
					kind: "drawing",
					occurrenceId: e,
					paragraphSource: i.block.source
				})));
			}
		}
		return Object.freeze(r);
	}, S = (e, t) => {
		let n = x(e, t);
		if (n.length === 0) return;
		if (!y.prescanPageAnchors) throw Error("Page-owned anchors require canonical prescan acquisition");
		let r = tb(e), i = y.prescanPageAnchors({
			anchors: n,
			location: r,
			availableInlineExtentPt: r.availableBounds.widthPt
		});
		i && y.commitFlowRegistryDelta(i);
	};
	S(m, 0);
	let C = (e, t, n = !1, r = !1) => {
		if (e.state.pageIndex >= zy) throw Error(`Document page budget exceeded (${zy} pages)`);
		let i = m.flow.pageIndex, a = e.events.some((e) => e.type === "next-page" && e.reason === "overflow"), o = e.events.some((e) => e.type === "begin-section" && "placement" in e && e.placement === "same-page-column");
		if (m = mm(m, e, g), m = fm(m, h(m)), m.flow.pageIndex !== i) {
			_ = a && n ? t : null;
			let e = tb(m);
			y.resetPageAcquisition(e), r || S(m, t);
		} else {
			let e = tb(m);
			y.moveAcquisitionCursor(e), o && S(m, t);
		}
	}, w = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map(), D = (e) => (w.get(e)?.size ?? 0) > 0, O = (e, t, n) => k(n ?? ly(e), t), k = (e, t) => {
		let n = w.get(m.flow.pageIndex) ?? /* @__PURE__ */ new Set(), r = [...new Set(e)].filter((e) => !n.has(e)), i = tb(m);
		if (r.length > 0 && !y.layoutNotes) throw Error("Footnote layout requires a note-capable layout session");
		let a = r.length === 0 ? Object.freeze([]) : y.layoutNotes({
			kind: "footnote",
			referenceIds: Object.freeze(r),
			pageIndex: m.flow.pageIndex,
			section: i.section,
			container: {
				id: `notes:page:${m.flow.pageIndex}`,
				kind: "footnote",
				bounds: {
					xPt: i.availableBounds.xPt,
					yPt: 0,
					widthPt: t,
					heightPt: i.section.geometry.pageHeight
				}
			},
			firstOnPage: n.size === 0
		});
		return Object.freeze({
			ids: Object.freeze(r),
			layouts: a,
			reservePt: a.reduce((e, t) => e + t.advancePt, 0)
		});
	}, A = (e, t, n) => {
		let r = w.get(m.flow.pageIndex);
		r || (r = /* @__PURE__ */ new Set(), w.set(m.flow.pageIndex, r)), e.forEach((e) => r.add(e));
		let i = E.get(m.flow.pageIndex) ?? [];
		i.push(...t), E.set(m.flow.pageIndex, i), T.set(m.flow.pageIndex, (T.get(m.flow.pageIndex) ?? 0) + n), m = pm(m, n);
	}, j = () => Math.max(0, eb(m) - m.footnoteReservePt - m.flow.deepestColumnBlockPt), M = (e) => e > j(), N = null, P = _h(e.sequence), ee = null;
	bodyEntries: for (let t = 0; t < e.sequence.length; t += 1) {
		yield m.pages.length, s?.shouldPublish(m.pages.length) && s.publish(db(m, l, y, d, T, E, ee), t);
		let n = e.sequence[t];
		if (n.kind === "consume-source") continue;
		if (n.kind === "authored-break") {
			if (N = null, n.break === "column" && !P.has(t)) continue;
			let e = m.flow.pageIndex;
			C(th(m.flow, n.break, n.parity), t + 1), v = n.break === "page" && n.origin === "authored" && n.parity === void 0 && n.sameSourceParagraphAsPrevious !== !0 && m.flow.pageIndex !== e ? t + 1 : null;
			continue;
		}
		if (n.kind === "begin-section") {
			N = null;
			let e = mi($y(m).section.textDirection), i = mi(qy(n.section, m.flow.pageIndex).textDirection), a = bi({
				widthPt: $y(m).section.geometry.pageWidth,
				heightPt: $y(m).section.geometry.pageHeight
			}, e), o = qy(n.section, m.flow.pageIndex), s = bi({
				widthPt: o.geometry.pageWidth,
				heightPt: o.geometry.pageHeight
			}, i), c = n.section.startType === "continuous" && (e !== i || a.widthPt !== s.widthPt || a.heightPt !== s.heightPt) ? "nextPage" : n.section.startType, l = Zy(n.section, m.flow.pageIndex, r[m.flow.pageIndex] ?? {
				top: 0,
				bottom: 0
			});
			try {
				C(nh(m.flow, Jy(n.section, m.flow.pageIndex), c, {
					hasFootnoteReferenceOnCurrentPage: D(m.flow.pageIndex),
					incomingPageContentStartBlockPt: l.blockStartPt,
					incomingPageContentEndBlockPt: l.blockEndPt
				}), t + 1);
			} catch (e) {
				if (!(e instanceof Vm) || m.flow.pageIndex === 0) throw e;
				let t = m.flow.pageIndex;
				m = Object.freeze({
					...m,
					pages: Object.freeze(m.pages.filter((e) => e.accumulator.pageIndex < t))
				}), ee = Object.freeze({
					code: "UNSUPPORTED_FEATURE",
					severity: "error",
					source: n.source,
					message: `Document layout stopped after the last complete page because a nextColumn section could not be placed safely (${e.reason})`
				});
				break bodyEntries;
			}
			continue;
		}
		let i = n.kind === "adjacent-table-group" ? n : n.block;
		if (i.kind === "paragraph") {
			if (i.continuousSectionRole === "collapse-mark") continue;
			i.pageBreakBefore && C(th(m.flow, "pageBreakBefore"), t);
			let n = N?.spaceAfterPt ?? 0, a = Kg(N, i, n, i.continuousSectionRole === "suppress-before" ? 0 : i.spaceBeforePt), o = i.continuousSectionRole === "drop-previous-after" ? n : a.overlap;
			o > 0 && (m = Object.freeze({
				...m,
				flow: Object.freeze({
					...m.flow,
					cursorBlockPt: Math.max(m.flow.regionStartBlockPt, m.flow.cursorBlockPt - o)
				})
			}));
			let s = Object.freeze({ boundary: null });
			for (; s;) {
				let n = ib(s), o = tb(m), c = y.measureParagraph({
					input: i,
					location: o,
					availableInlineExtentPt: o.availableBounds.widthPt,
					suppressSpaceBefore: s.boundary !== null || i.continuousSectionRole === "suppress-before" || a.suppressBefore || s.boundary === null && i.inkless !== !0 && i.onlyVisibleText === !0 && !m.flow.pageHasContent && _ === t || s.boundary === null && i.keepNext && i.inkless !== !0 && !m.flow.pageHasContent && _ === t || s.boundary === null && !i.pageBreakBefore && !m.flow.pageHasContent && v === t,
					continuation: s
				});
				if (c.placement) {
					let e = O(c.layout, o.availableBounds.widthPt, c.retainedFootnoteReferenceIds), r = c.relocationBlockExtentPt, a = c.placement.sectionFlowOwnership === "page" ? e.reservePt : (r ?? c.blockExtentPt) + e.reservePt, l = b(m), f = M(e.reservePt);
					if (Hy(e.reservePt, a, l), (a > o.availableBounds.heightPt || f) && a <= l && m.flow.pageHasContent) {
						C(f ? Qm(m.flow, m.flow.section, "overflow") : qm(m.flow, "overflow"), t);
						continue;
					}
					m = rb(m, c.layout, i.source, c.blockExtentPt, n, u, d, c.placement), A(e.ids, e.layouts, e.reservePt), c.flowRegistryDelta && y.commitFlowRegistryDelta(c.flowRegistryDelta), s = null, y.moveAcquisitionCursor(tb(m));
					continue;
				}
				if (s.boundary === null && i.keepNext && m.flow.pageHasContent) {
					let n = c.blockExtentPt, r = new Set(ly(c.layout)), a = !1, s = dh({
						keepNext: i.keepNext,
						inkless: i.inkless === !0,
						undecoratedMark: ob(c.layout)
					});
					for (let i = t + 1; i < e.sequence.length; i += 1) {
						let t = e.sequence[i];
						if (t.kind === "consume-source") continue;
						if (t.kind === "authored-break" || t.kind === "begin-section") break;
						let c = t.kind === "adjacent-table-group" ? t : t.block;
						if (c.kind === "paragraph" && c.pageBreakBefore) break;
						let l = y.measureFollowingBlock({
							input: c,
							location: o,
							availableInlineExtentPt: o.availableBounds.widthPt
						}), u = c.kind === "paragraph" && (c.keepNext || s);
						if (s = !1, n += u ? l.fullExtentPt : l.leadContentExtentPt, (u ? l.fullFootnoteReferenceIds : l.leadFootnoteReferenceIds)?.forEach((e) => r.add(e)), !u) {
							a = !0;
							break;
						}
						if (n > b(m)) break;
					}
					let l = k([...r], o.availableBounds.widthPt).reservePt, u = n + l;
					if (a && u > o.availableBounds.heightPt && u <= b(m)) {
						C(qm(m.flow, "overflow"), t, !0);
						continue;
					}
				}
				let l = e.sequence[t + 1], f = e.sequence[t + 2], p = l?.kind === "body-block" && l.block.kind === "paragraph" && f?.kind === "authored-break" && f.break === "page" && f.sameSourceParagraphAsPrevious !== !0, h = mh(c.layout);
				if (s.boundary === null && h && p && m.flow.pageHasContent) {
					let e = lb(o, c.blockExtentPt), n = y.measureParagraph({
						input: l.block,
						location: e,
						availableInlineExtentPt: e.availableBounds.widthPt,
						suppressSpaceBefore: !1,
						continuation: Object.freeze({ boundary: null })
					});
					y.moveAcquisitionCursor(o);
					let r = hh(n.layout, e.cursorPt.yPt);
					if (r !== null) {
						let e = c.blockExtentPt + r;
						if (e > o.availableBounds.heightPt && e <= b(m)) {
							C(qm(m.flow, "overflow"), t);
							continue;
						}
					}
				}
				let g = e.sequence[t + 1], x = g?.kind === "authored-break" && g.break === "page";
				if (s.boundary === null && x) {
					let e = gh(c.layout);
					if (e !== null) {
						m = rb(m, e, i.source, 0, n, u, d), c.flowRegistryDelta && y.commitFlowRegistryDelta(c.flowRegistryDelta), s = null, y.moveAcquisitionCursor(tb(m));
						continue;
					}
				}
				let S = O(c.layout, o.availableBounds.widthPt).reservePt, w = (r[m.flow.pageIndex]?.bottom ?? 0) === 0 && m.footnoteReservePt === 0, T = eb(m) === $y(m).blockEndPt, E = g?.kind === "begin-section" && g.section.startType === "nextPage", D = zu({
					hasContinuationBoundary: s.boundary !== null,
					inkless: i.inkless === !0,
					undecorated: ob(c.layout),
					keepNext: i.keepNext,
					markReservePt: S,
					pageBottomIsUnreserved: w,
					physicalRegionBottomIsActive: T,
					hasFollowingInk: ab(e, t + 1),
					followsNextPageSectionBoundary: E,
					markExtentPt: c.blockExtentPt,
					markBelowBaselinePt: c.markBelowBaselinePt ?? 0,
					markOnLineGrid: c.markOnLineGrid === !0
				}), j = ty(c.layout, s, c.fragmentation, o.availableBounds.heightPt + D, b(m), m.flow.pageHasContent, {
					keepLines: i.keepLines,
					widowControl: i.widowControl,
					authoredSpaceAfterPt: i.spaceAfterPt,
					writingMode: $y(m).writingMode
				}, (e) => O(e, o.availableBounds.widthPt).reservePt, c.uniformRubyAdvancePt, (e) => !M(e));
				if (j.requiresFreshFlowRegion) {
					C(qm(m.flow, "overflow"), t, !0);
					continue;
				}
				if (!j.fragment) throw Error("Paragraph acquisition made no progress");
				m = rb(m, j.fragment, i.source, Math.min(j.admittedBlockExtentPt, o.availableBounds.heightPt), n, u, d, c.placement);
				let N = O(j.fragment, o.availableBounds.widthPt);
				if (Hy(N.reservePt, j.fragment.advancePt + N.reservePt, b(m)), A(N.ids, N.layouts, N.reservePt), c.flowRegistryDelta) {
					let e = Gy(c.flowRegistryDelta, j.fragment);
					e && y.commitFlowRegistryDelta(e);
				}
				s = j.nextCursor, s && C(qm(m.flow, "overflow"), t), o = tb(m), y.moveAcquisitionCursor(o);
			}
			N = i;
		} else {
			if (N = null, i.kind === "table") {
				let e = a?.get(`table:${B(i.source)}`);
				if (e !== void 0) for (; m.flow.pageIndex < e;) C(Qm(m.flow, m.flow.section, "overflow"), t);
			}
			let e, n = !1;
			for (; !n;) {
				let r = cb(e), a = tb(m), o = (t) => y.measureTable({
					input: i,
					location: a,
					availableInlineExtentPt: a.availableBounds.widthPt,
					availableBlockExtentPt: t,
					freshPageBlockExtentPt: b(m),
					...e ? { cursor: e } : {}
				}), s = a.availableBounds.heightPt, c = o(s);
				if (c.retryAtBlockStartPt !== void 0) {
					if (!Number.isFinite(c.retryAtBlockStartPt) || c.retryAtBlockStartPt <= m.flow.cursorBlockPt) throw Error("Table repositioning must advance the block cursor");
					m = Object.freeze({
						...m,
						flow: Object.freeze({
							...m.flow,
							cursorBlockPt: c.retryAtBlockStartPt
						})
					}), y.moveAcquisitionCursor(tb(m));
					continue;
				}
				let l = c.requiresFreshFlowRegion ? Object.freeze({
					ids: Object.freeze([]),
					layouts: Object.freeze([]),
					reservePt: 0
				}) : O(c.layout, a.availableBounds.widthPt), f = Object.freeze({
					reservePt: l.reservePt,
					chargePt: c.blockExtentPt + l.reservePt
				}), p = /* @__PURE__ */ new Set(), h = (e, t) => e <= t || e - t <= 2 ** -52 * Math.max(1, Math.abs(e), Math.abs(t));
				for (; !c.requiresFreshFlowRegion && !h(c.blockExtentPt + l.reservePt, a.availableBounds.heightPt);) {
					let e = JSON.stringify({
						advancePt: c.blockExtentPt,
						nextCursor: c.nextCursor ?? null,
						noteIds: l.ids,
						reservePt: l.reservePt
					});
					if (p.has(e)) throw Hy(f.reservePt, f.chargePt, b(m)), Error("Table footnote admission did not converge");
					p.add(e), s = Math.max(0, a.availableBounds.heightPt - l.reservePt), c = o(s), l = c.requiresFreshFlowRegion ? Object.freeze({
						ids: Object.freeze([]),
						layouts: Object.freeze([]),
						reservePt: 0
					}) : O(c.layout, a.availableBounds.widthPt), c.requiresFreshFlowRegion || (f = Object.freeze({
						reservePt: l.reservePt,
						chargePt: c.blockExtentPt + l.reservePt
					}));
				}
				if (c.requiresFreshFlowRegion) {
					Hy(f.reservePt, f.chargePt, b(m));
					let n = !m.flow.pageHasContent && c.nextCursor?.kind === "table" && c.nextCursor.floatingContinuationFrame === "fresh-text" && !(e?.kind === "table" && e.floatingContinuationFrame !== void 0);
					if (c.nextCursor?.kind === "table" && c.nextCursor.floatingContinuationFrame !== void 0 && (e = c.nextCursor), n) continue;
					C(qm(m.flow, "overflow"), t);
					continue;
				}
				if (M(l.reservePt) && m.flow.pageHasContent) {
					C(Qm(m.flow, m.flow.section, "overflow"), t);
					continue;
				}
				m = rb(m, c.layout, i.source, c.blockExtentPt, r, u, d, c.placement), A(l.ids, l.layouts, l.reservePt), c.flowRegistryDelta && y.commitFlowRegistryDelta(Wy(c.flowRegistryDelta, c.layout, it(i.source, a.flowDomainId, r))), e = c.nextCursor ?? void 0, n = e === void 0;
				let g = c.unpaintedOverflowPt ?? 0;
				if (g > 0) {
					if (!Number.isFinite(g)) throw Error("Table overflow extent must be finite");
					let e = Math.max(m.flow.section.geometry.pageWidth, m.flow.section.geometry.pageHeight);
					if (!Number.isFinite(e) || e <= 0) throw Error("Table overflow requires a finite positive page extent");
					let n = Math.ceil(g / e);
					if (m.flow.pageIndex + n >= zy) throw Error(`Document page budget exceeded (${zy} pages)`);
					for (; g > 0;) {
						let e = b(m);
						if (!Number.isFinite(e) || e <= 0) throw Error("Table overflow requires a finite positive page extent");
						let n = g > e;
						C(Qm(m.flow, m.flow.section, "overflow"), t, !1, n), g -= e;
					}
				} else e && C(qm(m.flow, "overflow"), t);
			}
		}
		y.moveAcquisitionCursor(tb(m));
	}
	let te = new Set([...T.keys(), ...E.keys()]);
	for (let e of te) {
		let t = T.get(e) ?? 0, n = (E.get(e) ?? []).reduce((e, t) => e + t.advancePt, 0);
		if (t !== n) throw new H("INVALID_GEOMETRY", `Page ${e} footnote reserve ${t} does not equal retained advance ${n}`);
	}
	return db(m, l, y, d, T, E, ee);
}
function mb(e, t) {
	return Object.freeze(e.layout.pages.map((n, r) => {
		if (n.parityBlank || mi(n.section.textDirection) !== "horizontal-tb") return Object.freeze({
			top: 0,
			bottom: 0
		});
		let i = t.get(n.sectionOccurrenceId);
		if (!i) throw Error(`Unknown body section ${n.sectionOccurrenceId}`);
		let a = Math.max(0, n.section.geometry.pageWidth - Math.abs(n.section.geometry.marginLeft) - Math.abs(n.section.geometry.marginRight)), o = (t) => {
			let o = Ty(t === "header" ? i.headers : i.footers, {
				titlePage: i.titlePage,
				firstPageOfSection: wy(e.layout.pages, r),
				evenAndOddHeaders: i.evenAndOddHeaders,
				displayPageNumber: n.pageNumber.displayNumber
			});
			if (o === null) return 0;
			if (!e.session.layoutStory) throw Error("Header/footer story layout requires a story-capable layout session");
			let s = e.session.layoutStory({
				source: o,
				pageIndex: n.pageIndex,
				section: n.section,
				container: {
					id: `story:${t}:page:${n.pageIndex}`,
					kind: t,
					bounds: {
						xPt: Math.abs(n.section.geometry.marginLeft),
						yPt: 0,
						widthPt: a,
						heightPt: n.section.geometry.pageHeight
					}
				}
			});
			return t === "header" ? Oy(s) : s.advancePt;
		};
		return Object.freeze({
			top: Dy(o("header"), n.section.geometry.marginTop, n.section.geometry.headerDistance),
			bottom: Dy(o("footer"), n.section.geometry.marginBottom, n.section.geometry.footerDistance)
		});
	}));
}
function hb(e, t, n, r) {
	let i = e.pages.map((i, a) => {
		if (i.parityBlank) return i;
		let o = n.get(i.sectionOccurrenceId);
		if (!o) throw Error(`Unknown body section ${i.sectionOccurrenceId}`);
		if (!t.layoutStory) {
			if (!(Object.values(o.headers).some((e) => e !== null) || Object.values(o.footers).some((e) => e !== null) || (r.get(i.pageIndex)?.length ?? 0) > 0)) return i;
			throw Error("Page-story composition requires a story-capable layout session");
		}
		let s = mi(i.section.textDirection) !== "horizontal-tb", c = s ? Ku(i.section.geometry) : i.section.geometry, l = Math.abs(c.marginLeft), u = Math.max(0, c.pageWidth - Math.abs(c.marginLeft) - Math.abs(c.marginRight)), d = s ? "upright-physical" : "section-logical", f = s ? Object.freeze({
			...i.section,
			geometry: Object.freeze({ ...c }),
			columns: Object.freeze([Object.freeze({
				xPt: l,
				wPt: u
			})]),
			textDirection: "lrTb"
		}) : i.section, p = (t) => Ty(t === "header" ? o.headers : o.footers, {
			titlePage: o.titlePage,
			firstPageOfSection: wy(e.pages, a),
			evenAndOddHeaders: o.evenAndOddHeaders,
			displayPageNumber: i.pageNumber.displayNumber
		}), m = (e) => {
			let n = p(e);
			if (n === null) return null;
			let r = t.layoutStory({
				source: n,
				pageIndex: i.pageIndex,
				section: f,
				container: {
					id: `story:${e}:page:${i.pageIndex}`,
					kind: e,
					bounds: {
						xPt: l,
						yPt: 0,
						widthPt: u,
						heightPt: c.pageHeight
					}
				}
			});
			return Iy(r, {
				xPt: 0,
				yPt: (e === "header" ? c.headerDistance : c.pageHeight - c.footerDistance - r.advancePt) - r.flowBounds.yPt
			});
		}, h = m("header"), g = m("footer"), _ = r.get(i.pageIndex) ?? [], v = _.reduce((e, t) => e + t.advancePt, 0), y = i.sectionRegions[0], b = (y?.blockEndPt ?? Math.max(0, i.section.geometry.pageHeight - Math.abs(i.section.geometry.marginBottom))) - v, x = b, S = _.map((e) => {
			let t = Ly(e, {
				xPt: 0,
				yPt: x - e.flowBounds.yPt
			});
			return x += e.advancePt, t;
		}), C = S.length === 0 ? 0 : Math.min(...S.map((e) => e.flowBounds.xPt)), w = S.length === 0 ? 0 : Math.max(...S.map((e) => e.flowBounds.xPt + e.flowBounds.widthPt)), T = Object.freeze({
			xPt: C,
			yPt: b,
			widthPt: w - C,
			heightPt: v
		}), E = y ? Object.freeze(wi(y.coordinateSpace.logicalToPhysical, T)) : T, D = [
			...h ? [Object.freeze({
				id: `story:header:page:${i.pageIndex}`,
				kind: "header",
				logicalBounds: Object.freeze({
					xPt: l,
					yPt: h.flowBounds.yPt,
					widthPt: u,
					heightPt: h.advancePt
				}),
				physicalBounds: Object.freeze({
					xPt: l,
					yPt: h.flowBounds.yPt,
					widthPt: u,
					heightPt: h.advancePt
				})
			})] : [],
			...S.length > 0 ? [Object.freeze({
				id: `notes:page:${i.pageIndex}`,
				kind: "footnote",
				...y ? { sectionRegionId: y.id } : {},
				logicalBounds: T,
				physicalBounds: E
			})] : [],
			...g ? [Object.freeze({
				id: `story:footer:page:${i.pageIndex}`,
				kind: "footer",
				logicalBounds: Object.freeze({
					xPt: l,
					yPt: g.flowBounds.yPt,
					widthPt: u,
					heightPt: g.advancePt
				}),
				physicalBounds: Object.freeze({
					xPt: l,
					yPt: g.flowBounds.yPt,
					widthPt: u,
					heightPt: g.advancePt
				})
			})] : []
		], O = i.layers.roots.map((e) => e), k = O.findIndex((e) => e.layer !== "background" && e.layer !== "behindText"), A = k < 0 ? O.length : k, j = [
			...O.slice(0, A),
			...h?.blocks.map((e) => ({
				layer: "header",
				node: e,
				coordinateSpace: d
			})) ?? [],
			...O.slice(A)
		], M = -1;
		for (let e = 0; e < j.length; e += 1) j[e].layer === "body" && (M = e);
		let N = M < 0 ? j.length : M + 1, P = [
			...j.slice(0, N),
			...S.map((e) => ({
				layer: "notes",
				node: e,
				coordinateSpace: "section-logical"
			})),
			...j.slice(N),
			...g?.blocks.map((e) => ({
				layer: "footer",
				node: e,
				coordinateSpace: d
			})) ?? []
		];
		return Object.freeze({
			...i,
			flowDomains: Object.freeze([...i.flowDomains, ...D]),
			layers: ii(P),
			readingOrder: Object.freeze([
				...h?.blocks.map((e) => e.id) ?? [],
				...i.readingOrder,
				...S.map((e) => e.id),
				...g?.blocks.map((e) => e.id) ?? []
			])
		});
	});
	return Object.freeze({
		...e,
		pages: Object.freeze(i)
	});
}
function gb(e, t, n) {
	if (n.length === 0) return e;
	let r = -1;
	for (let t = e.pages.length - 1; t >= 0; --t) if (!e.pages[t].parityBlank) {
		r = t;
		break;
	}
	if (r < 0) return e;
	let i = e.pages[r];
	if (!t.layoutNotes) return Object.freeze({
		...e,
		diagnostics: Object.freeze([...e.diagnostics, Object.freeze({
			code: "UNSUPPORTED_FEATURE",
			severity: "error",
			source: Object.freeze({
				story: "endnote",
				storyInstance: n[0],
				path: Object.freeze([])
			}),
			message: "Document-end notes require a note-capable layout session"
		})])
	});
	let a = new Map(i.flowDomains.map((e) => [e.id, e])), o = i.layers.body.filter((e) => e.ordinaryFlow && a.get(e.flowDomainId)?.kind === "body").reduce((e, t) => e === null || t.flowBounds.yPt + t.flowBounds.heightPt > e.flowBounds.yPt + e.flowBounds.heightPt ? t : e, null), s = o ? a.get(o.flowDomainId) : [...i.flowDomains].reverse().find((e) => e.kind === "body");
	if (!s) return Object.freeze({
		...e,
		diagnostics: Object.freeze([...e.diagnostics, Object.freeze({
			code: "UNSUPPORTED_FEATURE",
			severity: "error",
			message: "Document-end notes require a retained body flow domain"
		})])
	});
	let c = i.sectionRegions.find((e) => e.flowDomainIds.includes(s.id)) ?? i.sectionRegions[0], l = o ? o.flowBounds.yPt + o.flowBounds.heightPt : s.logicalBounds.yPt, u = i.layers.notes.filter((e) => e.kind === "note" && e.source.story === "footnote").reduce((e, t) => Math.min(e, t.flowBounds.yPt), s.logicalBounds.yPt + s.logicalBounds.heightPt), d = Math.min(s.logicalBounds.yPt + s.logicalBounds.heightPt, u), f = `endnotes:page:${i.pageIndex}`;
	try {
		let a = t.layoutNotes({
			kind: "endnote",
			referenceIds: Object.freeze([...n]),
			pageIndex: i.pageIndex,
			section: c?.section ?? i.section,
			container: {
				id: f,
				kind: "endnote",
				bounds: {
					xPt: s.logicalBounds.xPt,
					yPt: l,
					widthPt: s.logicalBounds.widthPt,
					heightPt: Math.max(0, d - l)
				}
			},
			firstOnPage: !0
		});
		if (a.length === 0) return e;
		let o = a.reduce((e, t) => e + t.advancePt, 0), u = Object.freeze({
			xPt: s.logicalBounds.xPt,
			yPt: l,
			widthPt: s.logicalBounds.widthPt,
			heightPt: o
		}), p = Object.freeze({
			id: f,
			kind: "endnote",
			...c ? { sectionRegionId: c.id } : {},
			logicalBounds: u,
			physicalBounds: c ? Object.freeze(wi(c.coordinateSpace.logicalToPhysical, u)) : u
		}), m = i.layers.roots.map((e) => e), h = -1;
		for (let e = 0; e < m.length; e += 1) m[e].layer === "body" && (h = e);
		h += 1, m.splice(h, 0, ...a.map((e) => ({
			layer: "notes",
			node: e,
			coordinateSpace: "section-logical"
		})));
		let g = new Set(i.layers.body.map((e) => e.id)), _ = -1;
		for (let e = 0; e < i.readingOrder.length; e += 1) g.has(i.readingOrder[e]) && (_ = e);
		_ += 1;
		let v = [...i.readingOrder];
		v.splice(_, 0, ...a.map((e) => e.id));
		let y = [...e.pages];
		return y[r] = Object.freeze({
			...i,
			flowDomains: Object.freeze([...i.flowDomains, p]),
			layers: ii(m),
			readingOrder: Object.freeze(v)
		}), Object.freeze({
			...e,
			pages: Object.freeze(y)
		});
	} catch (t) {
		if (!(t instanceof cm) || t.kind !== "endnote" || t.pageIndex !== i.pageIndex || t.containerId !== f) throw t;
		return Object.freeze({
			...e,
			diagnostics: Object.freeze([...e.diagnostics, Object.freeze({
				code: "UNSUPPORTED_FEATURE",
				severity: "error",
				source: Object.freeze({
					story: "endnote",
					storyInstance: n[0],
					path: Object.freeze([])
				}),
				message: `Document-end notes do not fit the retained terminal flow region: ${t instanceof Error ? t.message : String(t)}`
			})])
		});
	}
}
function _b(e, t, n, r) {
	return Object.freeze({
		...e,
		diagnostics: Object.freeze([...e.diagnostics, Object.freeze({
			code: "UNSUPPORTED_FEATURE",
			severity: "error",
			message: `Unsupported ${t} position ${JSON.stringify(n)}; retained layout uses the ${r} fallback`
		})])
	});
}
function vb(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.pages) for (let e of n.layers.body) {
		if (e.kind === "table" && !e.ordinaryFlow && e.sectionFlowOwnership === "page") {
			let r = ot(e.source, n.pageIndex, 0, 0);
			t.set(`table:${B(e.source)}`, Object.freeze({
				kind: "floating-table",
				occurrenceId: r,
				tableSource: e.source,
				bounds: Object.freeze({ ...e.flowBounds }),
				pageIndex: n.pageIndex,
				flowDomainId: e.flowDomainId
			}));
			continue;
		}
		if (e.kind === "paragraph") for (let r of e.drawings) {
			let i = r.anchorLayer;
			if (!i || i.horizontalOwnership !== "page" || i.verticalOwnership !== "page") continue;
			let a = i.acquisitionOccurrenceId ?? i.occurrenceId;
			t.set(a, Object.freeze({
				kind: "drawing",
				occurrenceId: a,
				paragraphSource: e.source,
				pageIndex: n.pageIndex,
				flowDomainId: e.flowDomainId
			}));
		}
	}
	return t;
}
function yb(e) {
	return JSON.stringify([...e].sort(([e], [t]) => e.localeCompare(t)));
}
function bb(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let [r, i] of e) JSON.stringify(i) !== JSON.stringify(t.get(r)) && n.add(r);
	for (let r of t.keys()) e.has(r) || n.add(r);
	return n;
}
function* xb(e, t, n, r, i, a, o) {
	if (!e.sequence.some((e) => e.kind === "body-block" && (e.block.kind === "paragraph" ? (e.block.pageOwnedAnchorOccurrenceIds?.length ?? 0) > 0 : e.block.pageOwnedFloatingTable === !0))) return yield* pb(e, t, n, r, null, null, i, a);
	let s = function* (o) {
		return (yield* Vo({
			...o ? { seedState: yb(o) } : {},
			step: function* (s) {
				let c = s?.plan ?? o ?? null, l = yield* pb(e, t, n, r, c, s?.minimumTablePageBySource ?? null, i, s === void 0 ? a : void 0), u = vb(l.layout), d = /* @__PURE__ */ new Map(), f = s && c ? bb(c, u) : null;
				for (let [e, t] of u) {
					if (t.kind !== "floating-table") continue;
					let n = c?.get(e);
					if (n?.kind !== "floating-table" || !f || f.size > 1 || f.size === 1 && !f.has(e)) continue;
					let r = t.pageIndex > n.pageIndex ? n.pageIndex + 1 : s?.minimumTablePageBySource.get(e);
					r !== void 0 && d.set(e, r);
				}
				return Object.freeze({
					pass: l,
					plan: u,
					minimumTablePageBySource: d
				});
			},
			stateOf: (e) => yb(e.plan),
			limit: 16
		})).value.pass;
	};
	try {
		try {
			return yield* s(o);
		} catch (e) {
			if (!o || !(e instanceof zo)) throw e;
			return yield* s();
		}
	} catch (e) {
		throw e instanceof zo ? new H("NON_CONVERGENCE", e.reason === "cycle" ? "Page-anchor destination acquisition repeated an exact-state cycle" : "Page-anchor destination acquisition reached the operational pass limit 16") : e;
	}
}
function Sb(e) {
	let t = [], n = e.initialSection;
	for (let r of e.sequence) r.kind === "begin-section" && (r.section.startType === "continuous" && t.push(Object.freeze({
		outgoingSectionOccurrenceId: n.sectionOccurrenceId,
		incomingSectionOccurrenceId: r.section.sectionOccurrenceId
	})), n = r.section);
	return Object.freeze(t);
}
function Cb(e, t, n) {
	for (let r of e.pages) for (let e = 0; e + 1 < r.sectionRegions.length; e += 1) {
		let i = r.sectionRegions[e], a = r.sectionRegions[e + 1];
		if (i.sectionOccurrenceId === t && a.sectionOccurrenceId === n) return Object.freeze({
			page: r,
			outgoing: i
		});
	}
	return null;
}
function* wb(e, t, n, r, i, a) {
	let o = /* @__PURE__ */ new Map(), s = yield* xb(e, t, n, r, o, i, a);
	if (s.terminalDiagnostic !== null) return s;
	for (let i of Sb(e)) {
		let a = Cb(s.layout, i.outgoingSectionOccurrenceId, i.incomingSectionOccurrenceId);
		if (a === null || a.outgoing.flowDomainIds.length < 2) continue;
		let c = a.page.pageIndex, l = hy(e, s.allocations, s.footnoteReserveByPage, a.page, a.outgoing), u = new Map(o);
		if (u.set(i.outgoingSectionOccurrenceId, Object.freeze({
			pageIndex: c,
			targetPt: l
		})), o = u, s = yield* xb(e, t, n, r, o, void 0, vb(s.layout)), s.terminalDiagnostic !== null) return s;
	}
	return s;
}
function Tb(e, t, n, r, i) {
	let a = _y(e.layout, e.session, e.allocations), o = t.noteLayoutSettings ?? Object.freeze({
		footnotePosition: "pageBottom",
		endnotePosition: "docEnd"
	}), s = hb(a, e.session, n, e.footnoteLayoutsByPage), c = s.pages.some((e) => e.layers.notes.some((e) => e.source.story === "footnote")) && o.footnotePosition !== "pageBottom" ? _b(s, "footnote", o.footnotePosition, "pageBottom") : s, l = i ? new Set(a.pages.flatMap((e) => e.layers.body.flatMap((e) => e.kind === "paragraph" || e.kind === "table" ? uy(e) : []))) : /* @__PURE__ */ new Set(), u = (t.endnoteIds ?? []).filter((e) => l.has(e)), d = gb(c, e.session, u), f = u.length > 0 && o.endnotePosition !== "docEnd" ? _b(d, "endnote", o.endnotePosition, "docEnd") : d, p = [...t.parserDiagnostics ?? [], ...e.terminalDiagnostic === null ? [] : [e.terminalDiagnostic]], m = p.length === 0 ? f : Object.freeze({
		...f,
		diagnostics: Object.freeze([...p, ...f.diagnostics])
	}), h = Object.freeze({
		...m,
		pages: Object.freeze(m.pages.map(xd))
	});
	return r.showTrackedChanges === !0 ? Sy(h) : h;
}
function* Eb(e, t, n, r) {
	t = Fr(t);
	let i = Ky(e), a = 1, o = !1, s = yield* wb(e, t, n, [], r ? {
		shouldPublish: (e) => !o && e >= a,
		publish: (t, s) => {
			try {
				let o = Tb(t, e, i, n, !1), c = Object.freeze({
					...o,
					pages: Object.freeze(o.pages.slice(0, -1))
				});
				c.pages.length > 0 && r.onPages(c, s), a = Math.max(t.layout.pages.length + 1, t.layout.pages.length * 2);
			} catch {
				o = !0;
			}
		}
	} : void 0), c = (yield* ky({
		seed: s,
		measure: (e) => mb(e, i),
		repaginate: function* (r, i) {
			let a = qg(i.layout);
			return yield* wb(e, Lr(t, {
				totalPages: i.layout.pages.length,
				resolveDestinationPage: (e) => a[e]
			}), n, r, void 0, vb(i.layout));
		},
		identity: (e) => qg(e.layout),
		requiresConvergence: s.session.hasPaginationFields
	})).result;
	return lf(Tb(c, e, i, n, !0));
}
function Db(e, t, n) {
	return fb(Eb(e, t, n));
}
//#endregion
//#region packages/docx/src/layout/pagination-scheduler.ts
var Ob = 16;
function kb() {
	let e = globalThis.performance?.now;
	return e ? e.call(globalThis.performance) : Date.now();
}
function Ab() {
	let e = globalThis.MessageChannel;
	return e ? new Promise((t) => {
		let n = new e();
		n.port1.onmessage = () => {
			n.port1.close(), n.port2.close(), t();
		}, n.port2.postMessage(null);
	}) : new Promise((e) => {
		setTimeout(e, 0);
	});
}
var jb = class extends Error {
	constructor() {
		super("Pagination was aborted"), this.name = "PaginationAbortError";
	}
};
async function Mb(e, t = {}) {
	let n = t.sliceMs ?? Ob, r = t.now ?? kb, i = t.yieldToHost ?? Ab, { signal: a, onProgress: o } = t, s = r(), c = e.next();
	for (; !c.done;) {
		if (o?.(c.value), a?.aborted) throw e.return(void 0), new jb();
		r() - s >= n && (await i(), s = r()), c = e.next();
	}
	return c.value;
}
//#endregion
//#region packages/docx/src/layout/document.ts
function Nb(e, t, n = di(void 0, Date.now())) {
	return Db(e, t, n);
}
function Pb(e, t, n = di(void 0, Date.now()), r) {
	return Mb(Eb(e, t, n), r);
}
function Fb(e, t, n) {
	if (kr(e)) return;
	let r = n();
	ff({
		source: r,
		services: e,
		defaultCurrentDateMs: t,
		buildLayout: (t) => Nb(r.bodyLayoutInput, e, t)
	});
}
//#endregion
//#region packages/docx/src/paint/math-resources.ts
async function Ib(e, t) {
	if (e.length === 0) return {
		records: [],
		drawables: /* @__PURE__ */ new Map()
	};
	await t.loadMathJax();
	let n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
	for (let a of e) {
		if (i.has(a.resourceKey)) throw Error(`Duplicate math occurrence: ${a.resourceKey}`);
		i.add(a.resourceKey);
		try {
			let e = await t.mathMLToSvg(pe(a.nodes, a.display)), i = await he(e, "#000000");
			n.push({
				resourceKey: a.resourceKey,
				widthEm: e.widthEm,
				ascentEm: e.ascentEm,
				descentEm: e.descentEm,
				diagnostics: []
			}), r.set(a.resourceKey, i.source);
		} catch {
			n.push({
				resourceKey: a.resourceKey,
				widthEm: 0,
				ascentEm: 0,
				descentEm: 0,
				available: !1,
				diagnostics: [{
					code: "UNSUPPORTED_FEATURE",
					severity: "warning",
					message: "Math conversion failed; using the deterministic text fallback"
				}]
			});
		}
	}
	return {
		records: n,
		drawables: r
	};
}
//#endregion
//#region packages/docx/src/frame-geometry.ts
function Lb(e, t) {
	switch (e) {
		case "margin": return {
			left: t.marginLeft,
			right: t.pageWidth - t.marginRight
		};
		case "page": return {
			left: 0,
			right: t.pageWidth
		};
		default: return {
			left: t.contentX,
			right: t.contentX + t.contentW
		};
	}
}
function Rb(e, t, n, r) {
	switch (e) {
		case "margin": return {
			start: r.marginTop,
			end: r.pageH - r.marginBottom
		};
		case "page": return {
			start: 0,
			end: r.pageH
		};
		default: return {
			start: t,
			end: t + n
		};
	}
}
function zb(e, t, n, r) {
	switch (e) {
		case "center": return t + (n - t - r) / 2;
		case "right":
		case "outside": return n - r;
		default: return t;
	}
}
function Bb(e, t, n) {
	switch (e) {
		case "center": return t.start + (t.end - t.start - n) / 2;
		case "bottom":
		case "outside": return t.end - n;
		default: return t.start;
	}
}
function Vb(e, t, n) {
	return e + t <= n.end ? e : Math.max(n.start, n.end - t);
}
function Hb(e, t, n, r, i, a) {
	let o = e.dropCap === "drop" || e.dropCap === "margin", s = Lb(e.hAnchor, t), c = Rb(e.vAnchor, n, i, t), l = e.w == null ? r : e.w, u;
	if (o) u = Math.max(1, e.lines) * a;
	else {
		let t = e.h ?? 0;
		u = e.hRule === "exact" ? t : e.hRule === "atLeast" ? Math.max(t, i) : i;
	}
	let d;
	d = e.dropCap === "drop" ? s.left : e.dropCap === "margin" ? s.left - l : e.xAlign ? zb(e.xAlign, s.left, s.right, l) : s.left + (e.x ?? 0);
	let f;
	f = o ? c.start : e.yAlign && e.vAnchor !== "text" ? Bb(e.yAlign, c, u) : c.start + (e.y ?? 0), (e.vAnchor === "page" || e.vAnchor === "margin") && (f = Vb(f, u, c));
	let p = e.wrap === "around" || e.wrap === "auto" ? e.hSpace : 0, m = e.vSpace;
	return {
		x: d,
		y: f,
		w: l,
		h: u,
		exLeft: d - p,
		exRight: d + l + p,
		exTop: f - m,
		exBottom: f + u + m
	};
}
function Ub(e, t) {
	if (t.kind === "table" && t.tableOverlap === void 0) throw Error("Floating-table transport omitted tblOverlap");
	let n = t.x, r = t.y;
	if (t.avoidOverlap) {
		let i = {
			occurrenceId: "display-moving-float",
			paragraphId: t.paraId,
			bounds: {
				xPt: n,
				yPt: r,
				widthPt: t.w,
				heightPt: t.h
			},
			exclusionBounds: {
				xPt: n - t.dl,
				yPt: r - t.dt,
				widthPt: t.w + t.dl + t.dr,
				heightPt: t.h + t.dt + t.db
			}
		}, a = $a({
			moving: t.kind === "table" ? {
				...i,
				kind: "table",
				tableOverlap: t.tableOverlap
			} : {
				...i,
				kind: t.kind === "frame" ? "frame" : "drawingml"
			},
			blockers: e.floats.map(qa),
			avoidance: t.kind === "table" ? Wa(t.tableOverlap, t.paraId) : Ga(t.allowOverlap ?? !0, t.paraId),
			rightBoundaryPt: e.pageWidth,
			overlapEpsilonPt: Ha,
			rightBoundarySlackPt: Ua
		});
		n = a.bounds.xPt, r = a.bounds.yPt;
	}
	let i = {
		mode: t.mode,
		imageKey: t.imageKey,
		imageX: n,
		imageY: r,
		imageW: t.w,
		imageH: t.h,
		xLeft: n - t.dl,
		xRight: n + t.w + t.dr,
		yTop: r - t.dt,
		yBottom: r + t.h + t.db,
		side: t.side,
		distLeft: t.dl,
		distRight: t.dr,
		distTop: t.dt,
		distBottom: t.db,
		paraId: t.paraId
	}, a = t.kind === "table" ? {
		...i,
		kind: "table",
		tableOverlap: t.tableOverlap
	} : {
		...i,
		kind: t.kind
	};
	return e.floats.push(a), a;
}
//#endregion
//#region packages/docx/src/layout/floating-table-transaction.ts
function Wb(e) {
	return e.xPt + e.widthPt;
}
function Gb(e) {
	return e.yPt + e.heightPt;
}
function Kb(e, t, n, r) {
	return e === "center" ? t + (n - t - r) / 2 : e === "right" || e === "outside" ? n - r : t;
}
function qb(e, t, n, r) {
	return e === "center" ? t + (n - t - r) / 2 : e === "bottom" || e === "outside" ? n - r : t;
}
function Jb(e, t, n, r, i = !1) {
	let a = e.horzSpecified ? e.horzAnchor === "page" ? t.page : e.horzAnchor === "margin" ? t.margin : t.text : t.text, o = e.vertAnchor === "page" ? t.page : e.vertAnchor === "margin" ? t.margin : t.text, s = e.xAlign ? Kb(e.xAlign, a.xPt, Wb(a), n) : a.xPt + e.xPt, c = e.yAlign && e.vertAnchor !== "text" ? qb(e.yAlign, o.yPt, Gb(o), r) : o.yPt + e.yPt;
	return !i && (e.vertAnchor === "page" || e.vertAnchor === "margin") && c + r > Gb(o) && (c = Math.max(o.yPt, Gb(o) - r)), Object.freeze({
		x: s,
		y: c,
		w: n,
		h: r
	});
}
function Yb(e, t, n, r) {
	return Jb(e, t, n, r);
}
function Xb(e, t, n) {
	let r = e.child.columnWidthsPt.reduce((e, t) => e + t, 0), i = e.child.advancePt, a = e.positioning, o = Object.freeze({
		xPt: t,
		yPt: n,
		widthPt: r,
		heightPt: i
	}), s = Object.freeze({
		xPt: t - a.leftFromTextPt,
		yPt: n - a.topFromTextPt,
		widthPt: r + a.leftFromTextPt + a.rightFromTextPt,
		heightPt: i + a.topFromTextPt + a.bottomFromTextPt
	});
	return Object.freeze({
		kind: "resolved-floating-table-placement",
		occurrenceId: e.occurrenceId,
		xPt: t,
		yPt: n,
		bounds: o,
		exclusionBounds: s,
		overlap: e.overlap,
		child: e.child,
		source: e
	});
}
function Zb(e, t) {
	let n = e.child.columnWidthsPt.reduce((e, t) => e + t, 0), r = e.child.advancePt, i = Yb(e.positioning, t, n, r), a = gm(e.positioning);
	return Xb(e, a.x && e.acquiredTextOffsetPt ? t.text.xPt + e.acquiredTextOffsetPt.xPt : i.x, a.y && e.acquiredTextOffsetPt ? t.text.yPt + e.acquiredTextOffsetPt.yPt : i.y);
}
function Qb(e, t, n) {
	return Object.freeze({
		coordinateSpace: e.coordinateSpace,
		flowDomainId: e.flowDomainId,
		baseEntries: e.entries,
		baseNextParagraphId: e.nextParagraphId,
		nextParagraphId: n,
		entries: Object.freeze([...t])
	});
}
function $b(e, t) {
	if (t.coordinateSpace !== e.coordinateSpace || t.flowDomainId !== e.flowDomainId || t.entries !== e.baseEntries || t.nextParagraphId !== e.baseNextParagraphId) throw Error("Floating table registry delta base/domain mismatch");
	let n = new Set(t.entries.map((e) => e.occurrenceId));
	if (e.entries.some((e) => n.has(e.occurrenceId))) throw Error("Floating table registry delta was already committed");
	if (e.nextParagraphId !== e.baseNextParagraphId + e.entries.length) throw Error("Floating table registry delta sequence mismatch");
}
function ex(e, t, n = "logical-page-points", r = "logical-page") {
	let i = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (i.has(t.occurrenceId)) throw Error(`Duplicate float registry occurrence: ${t.occurrenceId}`);
		i.add(t.occurrenceId);
	}
	return Object.freeze({
		coordinateSpace: n,
		flowDomainId: r,
		base: Object.freeze([...e]),
		delta: Object.freeze([]),
		nextParagraphId: t
	});
}
function tx(e, t, n) {
	let r = [...n.base, ...n.delta], i = r.find((t) => t.occurrenceId === e.occurrenceId);
	if (i) return Object.freeze({
		placement: Object.freeze({
			...Xb(e, i.bounds.xPt, i.bounds.yPt),
			bounds: i.bounds,
			exclusionBounds: i.exclusionBounds
		}),
		transaction: n
	});
	let a = Zb(e, t), o = $a({
		moving: {
			occurrenceId: e.occurrenceId,
			kind: "table",
			tableOverlap: e.overlap,
			paragraphId: n.nextParagraphId,
			bounds: a.bounds,
			exclusionBounds: a.exclusionBounds
		},
		blockers: r.filter((e) => e.kind !== "shape" || e.wrap !== void 0).map(Ka),
		avoidance: Wa(e.overlap, n.nextParagraphId),
		rightBoundaryPt: Wb(t.page),
		overlapEpsilonPt: Ha,
		rightBoundarySlackPt: Ua
	}), s = Xb(e, o.bounds.xPt, o.bounds.yPt), c = Object.freeze({
		kind: "table",
		occurrenceId: e.occurrenceId,
		overlap: e.overlap,
		paragraphId: n.nextParagraphId,
		bounds: s.bounds,
		exclusionBounds: s.exclusionBounds
	});
	return Object.freeze({
		placement: s,
		transaction: Object.freeze({
			coordinateSpace: n.coordinateSpace,
			flowDomainId: n.flowDomainId,
			base: n.base,
			delta: Object.freeze([...n.delta, c]),
			nextParagraphId: n.nextParagraphId + 1
		})
	});
}
//#endregion
//#region packages/docx/src/anchor-geometry.ts
function nx(e, t, n) {
	let r = n.pageWidth, i = n.marginLeft, a = n.marginRight;
	switch (e ?? (t ? "margin" : "page")) {
		case "page": return {
			start: 0,
			end: r
		};
		case "leftMargin": return {
			start: 0,
			end: i
		};
		case "rightMargin": return {
			start: r - a,
			end: r
		};
		case "insideMargin": return {
			start: 0,
			end: i
		};
		case "outsideMargin": return {
			start: r - a,
			end: r
		};
		case "character":
		case "column": return {
			start: n.contentX,
			end: n.contentX + n.contentW
		};
		default: return {
			start: i,
			end: r - a
		};
	}
}
function rx(e, t, n, r) {
	let i = r.marginTop, a = r.marginBottom;
	switch (e ?? (t ? "paragraph" : "page")) {
		case "page": return {
			start: 0,
			end: r.pageH
		};
		case "topMargin": return {
			start: 0,
			end: i
		};
		case "bottomMargin": return {
			start: r.pageH - a,
			end: r.pageH
		};
		case "paragraph":
		case "line": return {
			start: n,
			end: r.pageH
		};
		default: return {
			start: i,
			end: r.pageH - a
		};
	}
}
function ix(e, t, n, r, i, a, o, s) {
	let c = nx(a, t, i);
	if (o != null) return c.start + (c.end - c.start) * o + n;
	if (!e) return c.start + n;
	let l = c.end - c.start, u = s ?? r, d = s == null ? 0 : n;
	switch (e) {
		case "center": return c.start + (l - u) / 2 + d;
		case "right":
		case "outside": return c.end - u + d;
		default: return c.start + d;
	}
}
function ax(e, t, n, r, i, a, o, s, c) {
	let l = rx(o, t, i, a);
	if (s != null) return l.start + (l.end - l.start) * s + n;
	if (!e) return l.start + n;
	let u = l.end - l.start, d = c ?? r, f = c == null ? 0 : n;
	switch (e) {
		case "center": return l.start + (u - d) / 2 + f;
		case "bottom":
		case "outside": return l.end - d + f;
		default: return l.start + f;
	}
}
//#endregion
//#region packages/docx/src/layout/section-orientation.ts
function ox(e) {
	return sx(e.textDirection);
}
function sx(e) {
	return typeof e == "string" && qu(e);
}
function cx(e) {
	return e === "btLr";
}
function lx(e) {
	return {
		...e,
		...Gu(e)
	};
}
function ux(e) {
	return {
		...e,
		...Ku(e)
	};
}
//#endregion
//#region packages/docx/src/layout/measurement-environment.ts
function dx(e) {
	for (let t of e.body) {
		if (t.type !== "paragraph") continue;
		let e = t;
		if (typeof e.defaultFontSize == "number") return e.defaultFontSize;
		for (let t of e.runs) if (t.type === "text") return t.fontSize;
	}
	return 10;
}
function fx(e) {
	return {
		pageIndex: e.pageIndex,
		totalPages: e.totalPages,
		displayPageNumber: e.displayPageNumber,
		pageNumberFormat: e.pageNumberFormat,
		currentDateMs: e.currentDateMs,
		showTrackedChanges: e.showTrackedChanges,
		revisionAuthorColor: e.revisionAuthorColor,
		noteNumbers: e.noteNumbers,
		noteReferenceNumber: e.noteReferenceNumber,
		pageWritingMode: mi(e.sectionLayout.textDirection),
		verticalCJK: e.verticalCJK && !e.verticalAllRotated,
		verticalPageFrame: e.verticalCJK === !0,
		documentHasEastAsianText: e.docEastAsian,
		useFeLayout: e.layoutSettings.compat.useFeLayout,
		balanceSingleByteDoubleByteWidth: e.layoutSettings.compat.balanceSingleByteDoubleByteWidth,
		characterSpacingControl: e.layoutSettings.characterSpacingControl,
		lineWrapLikeWord6: e.layoutSettings.compat.lineWrapLikeWord6,
		enableOpenTypeFeatures: e.layoutSettings.compat.enableOpenTypeFeatures,
		resolvedLocalFonts: e.resolvedLocalFonts,
		layoutServices: e.layoutServices,
		verticalGlyphMeasurement: e.verticalGlyphMeasurement
	};
}
function px(e, t) {
	let n = Dl(t);
	return {
		type: n ? n.type : t.lineGrid.active ? e.sectionLayout.grid.kind : null,
		linePitchPt: t.lineGrid.active ? t.lineGrid.pitchPt : null,
		characterPitchPt: n?.characterPitchPt ?? null,
		charSpacePt: n?.charSpacePt ?? null
	};
}
//#endregion
//#region packages/docx/src/layout/acquisition-state.ts
var mx = Object.freeze({
	story: "body",
	containers: Object.freeze([]),
	lineNumberingEligible: !0
});
function hx(e) {
	let t = Math.max(0, e.pageH - e.marginTop - e.marginBottom);
	return {
		page: {
			xPt: 0,
			yPt: 0,
			widthPt: e.pageWidth,
			heightPt: e.pageH
		},
		margin: {
			xPt: e.marginLeft,
			yPt: e.marginTop,
			widthPt: Math.max(0, e.pageWidth - e.marginLeft - e.marginRight),
			heightPt: t
		},
		column: {
			xPt: e.contentX,
			yPt: e.marginTop,
			widthPt: e.contentW,
			heightPt: t
		},
		pageParity: e.pageIndex % 2 == 0 ? "odd" : "even"
	};
}
function gx(e, t, n) {
	return Nl(n, {
		numbering: t.numbering,
		...t.numbering ? { markerInput: e.acquisitionInputs.numberingMarkerShapeInput(t.numbering, ec(t)) } : {},
		authoredFirstIndentPt: t.indentFirst,
		tabStops: t.tabStops,
		defaultTabPt: e.defaultTabPt,
		service: e.layoutServices?.text
	});
}
function _x(e, t) {
	return gx(e, t, Pu(e.layoutSettings, e.sectionLayout, mx, t));
}
function vx(e, t) {
	return gx(e, t, Pu(e.layoutSettings, e.sectionLayout, e.storyContext ?? mx, t));
}
function yx(e) {
	return {
		...e,
		storyContext: Cu(e.storyContext ?? mx)
	};
}
function bx(e, t) {
	let n = e.retainedTablesBySourceIndex?.get(t);
	if (!n) throw Error("Table placement requires retained table acquisition");
	return n;
}
//#endregion
//#region packages/docx/src/layout/exact-length.ts
function xx(e, t) {
	let n = e < 0n ? -e : e, r = t < 0n ? -t : t;
	for (; r !== 0n;) [n, r] = [r, n % r];
	return n === 0n ? 1n : n;
}
function Sx(e, t) {
	if (t === 0n) throw RangeError("Exact length denominator must not be zero");
	let n = t < 0n ? -1n : 1n, r = xx(e, t);
	return Object.freeze({
		numerator: n * e / r,
		denominator: n * t / r
	});
}
var Cx = 768, wx = 1100;
function Tx(e) {
	let t = /^([+-]?)(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:[eE]([+-]?\d+))?$/.exec(e);
	if (!t) return null;
	let n = t[1] === "-", r = t[2] ?? "", i = t[3] ?? t[4] ?? "", a = Number(t[5] ?? "0");
	if (!Number.isSafeInteger(a)) return null;
	let o = `${r}${i}`, s = 0;
	for (; s < o.length && o.charCodeAt(s) === 48;) s += 1;
	if (s === o.length) return Sx(0n, 1n);
	let c = o.length - 1;
	for (; c > s && o.charCodeAt(c) === 48;) --c;
	let l = o.slice(s, c + 1), u = o.length - 1 - c, d = a - i.length + u, f = d + l.length - 1;
	if (l.length > Cx || Math.abs(f) > wx) return null;
	let p = BigInt(l), m = 1n;
	return d >= 0 ? p *= 10n ** BigInt(d) : m = 10n ** BigInt(-d), n && (p = -p), Sx(p, m);
}
function Ex(e) {
	let t = /^(-?\d+)\/([1-9]\d*)$/.exec(e);
	if (!t) throw RangeError(`Invalid exact length key: ${e}`);
	return Sx(BigInt(t[1]), BigInt(t[2]));
}
function Dx(e) {
	let t = Sx(e.numerator, e.denominator);
	return `${t.numerator}/${t.denominator}`;
}
function Ox(e) {
	let t = Tx(e);
	return t ? Dx(t) : null;
}
function kx(e) {
	if (!Number.isFinite(e) || e < 0) return null;
	let t = Tx(e.toString());
	return t ? Dx(t) : null;
}
function Ax(e, t) {
	let n = e.toString(2).length - t.toString(2).length;
	return (n >= 0 ? e < t << BigInt(n) : e << BigInt(-n) < t) && --n, n;
}
function jx(e, t, n) {
	let r = n >= 0 ? e << BigInt(n) : e, i = n < 0 ? t << BigInt(-n) : t, a = r / i, o = r % i * 2n - i;
	return o > 0n || o === 0n && a % 2n != 0n ? a + 1n : a;
}
function Mx(e) {
	let t = Ex(e);
	if (t.numerator === 0n) return 0;
	let n = t.numerator < 0n, r = n ? -t.numerator : t.numerator, i = Ax(r, t.denominator), a;
	if (i < -1022) {
		let e = jx(r, t.denominator, 1074);
		a = Number(e) * Number.MIN_VALUE;
	} else {
		let e = jx(r, t.denominator, 52 - i);
		e === 1n << 53n && (e >>= 1n, i += 1), a = i > 1023 ? Infinity : Number(e) * 2 ** (i - 52);
	}
	return n ? -a : a;
}
function Nx(e, t) {
	let n = Ex(e), r = Ex(t);
	return Dx(Sx(n.numerator * r.denominator + r.numerator * n.denominator, n.denominator * r.denominator));
}
function Px(e, t) {
	let n = Ex(e), r = Ex(t);
	return Dx(Sx(n.numerator * r.numerator, n.denominator * r.denominator));
}
function Fx(e, t) {
	let n = Ex(e), r = Ex(t);
	return Dx(Sx(n.numerator * r.denominator - r.numerator * n.denominator, n.denominator * r.denominator));
}
function Ix(e, t) {
	if (t === 0n) throw RangeError("Exact length divisor must not be zero");
	let n = Ex(e);
	return Dx(Sx(n.numerator, n.denominator * t));
}
function Lx(e, t) {
	let n = Ex(e), r = Ex(t), i = n.numerator * r.denominator - r.numerator * n.denominator;
	return i < 0n ? -1 : +(i > 0n);
}
//#endregion
//#region packages/docx/src/layout/table-columns.ts
var Q = 1e-9;
function Rx(e, t, n, r) {
	let i = Number.isFinite(e) ? Math.max(0, e) : 0, a = Math.max(0, t), o = a + Math.max(1, n);
	return {
		startPt: a === 0 ? i : i / 2,
		endPt: o >= Math.max(0, r) ? i : i / 2
	};
}
function zx(e) {
	return typeof e == "number" && Number.isFinite(e) ? Math.max(0, e) : 0;
}
function Bx(e) {
	return e.map((e) => Math.abs(e) <= Q ? 0 : e);
}
function Vx(e) {
	let t = e.gridWidthsPt.length;
	for (let n of e.rows) {
		for (let e of n.cells) t = Math.max(t, e.columnStart + Math.max(1, e.columnSpan));
		let e = n.cells.reduce((e, t) => Math.max(e, t.columnStart + Math.max(1, t.columnSpan)), n.before?.columnSpan ?? 0);
		t = Math.max(t, e + (n.after?.columnSpan ?? 0));
	}
	return t;
}
function Hx(e, t, n) {
	let r = 0, i = Math.min(e.length, t + Math.max(1, n));
	for (let n = Math.max(0, t); n < i; n += 1) r += e[n] ?? 0;
	return r;
}
function Ux(e, t) {
	return e ? e.kind === "pct" ? zx(e.value) * t : zx(e.value) : null;
}
function Wx(e, t, n, r) {
	let i = Math.max(0, t), a = Math.max(1, Math.min(n, e.length - i));
	if (a <= 0) return;
	let o = Hx(e, i, a);
	if (o <= Q) {
		e[i + a - 1] = r;
		return;
	}
	let s = r / o;
	for (let t = i; t < i + a; t += 1) e[t] = (e[t] ?? 0) * s;
}
function Gx(e, t, n, r) {
	let i = Math.max(0, t), a = Math.max(1, Math.min(n, e.length - i));
	if (a <= 0) return;
	let o = Hx(e, i, a);
	r <= o + Q || (e[i + a - 1] += r - o);
}
function Kx(e, t) {
	let n = [];
	e.before && e.before.columnSpan > 0 && n.push({
		start: 0,
		span: e.before.columnSpan,
		preferred: e.before.preferredWidth
	});
	for (let t of e.cells) n.push({
		start: t.columnStart,
		span: t.columnSpan,
		preferred: t.preferredWidth
	});
	return e.after && e.after.columnSpan > 0 && n.push({
		start: Math.max(0, t - e.after.columnSpan),
		span: e.after.columnSpan,
		preferred: e.after.preferredWidth
	}), n;
}
function qx(e, t) {
	let n = Array.from({ length: t }, (t, n) => zx(e.gridWidthsPt[n] ?? 0)), r = n.reduce((e, t) => e + t, 0), i = e.tablePreferredWidthPt ?? (r > 0 ? r : zx(e.availableWidthPt));
	e.rows.forEach((e, r) => {
		for (let a of Kx(e, t)) {
			let e = Ux(a.preferred, i);
			e !== null && (r === 0 ? Wx(n, a.start, a.span, e) : Gx(n, a.start, a.span, e));
		}
	}), e.tablePreferredWidthPt === null && Jx(n, e.rows);
	let a = e.tablePreferredWidthPt, o = n.reduce((e, t) => e + t, 0);
	if (a !== null && a >= 0 && o <= Q && n.length > 0) return n.map(() => a / n.length);
	if (a !== null && a >= 0 && o > Q) {
		let e = a / o;
		return n.map((t) => t * e);
	}
	return n;
}
function Jx(e, t) {
	let n = Array(e.length).fill(0);
	for (let r of t) for (let t of r.cells) {
		if (t.columnSpan !== 1 || t.preferredWidth?.kind !== "pct") continue;
		let r = t.columnStart;
		r < 0 || r >= e.length || (n[r] = Math.max(n[r] ?? 0, zx(t.preferredWidth.value)));
	}
	let r = e.reduce((e, t) => e + t, 0), i = n.map((t, n) => t * r > e[n] + Q), a = /* @__PURE__ */ new Set();
	for (; i.some(Boolean);) {
		let t = i.map((e) => e ? "1" : "0").join("");
		if (a.has(t)) return;
		a.add(t);
		let o = 0, s = 0;
		for (let t = 0; t < e.length; t += 1) i[t] ? s += n[t] ?? 0 : o += e[t] ?? 0;
		if (s >= 1 - Q) return;
		r = o / (1 - s);
		let c = n.map((t, n) => t * r > e[n] + Q);
		if (c.every((e, t) => e === i[t])) {
			for (let t = 0; t < e.length; t += 1) i[t] && (e[t] = n[t] * r);
			return;
		}
		i = c;
	}
}
function Yx(e, t, n) {
	let r = Array(t).fill(0), i = Array(t).fill(0);
	for (let n of e) for (let e of n.cells) e.columnSpan !== 1 || e.columnStart < 0 || e.columnStart >= t || (r[e.columnStart] = Math.max(r[e.columnStart] ?? 0, zx(e.minContentWidthPt)), i[e.columnStart] = Math.max(i[e.columnStart] ?? 0, zx(e.maxContentWidthPt)));
	let a = Array(t).fill(!1);
	for (let o of e) for (let e of o.cells) {
		let o = e.columnStart;
		if (e.columnSpan !== 1 || o < 0 || o >= t || a[o] || e.preferredWidth === null) continue;
		let s = Ux(e.preferredWidth, n);
		s !== null && (i[o] = Math.max(r[o] ?? 0, s), a[o] = !0);
	}
	for (let e = 0; e < t; e += 1) i[e] = Math.max(r[e] ?? 0, i[e] ?? 0);
	return {
		minimums: r,
		maximums: i
	};
}
function Xx(e, t, n, r, i) {
	let a = Math.min(e.length, n + r), o = e.map((e, t) => t).filter((e) => e < n || e >= a), s = o.map((n) => Math.max(0, e[n] - (t[n] ?? 0))), c = s.reduce((e, t) => e + t, 0), l = Math.min(i, c);
	return l <= Q || c <= Q ? 0 : (o.forEach((t, n) => {
		e[t] -= l * ((s[n] ?? 0) / c);
	}), l);
}
function Zx(e, t, n, r) {
	if (r <= Q || n <= 0) return;
	let i = Hx(e, t, n);
	for (let a = 0; a < n; a += 1) {
		let o = t + a, s = i > Q ? (e[o] ?? 0) / i : 1 / n;
		e[o] += r * s;
	}
}
function Qx(e) {
	let t = Vx(e);
	if (e.layout === "fixed") {
		let n = qx(e, t).reduce((e, t) => e + t, 0);
		return Object.freeze({
			minWidthPt: n,
			maxWidthPt: n
		});
	}
	let n = Array(t).fill(0), r = Array(t).fill(0), i = e.rows.flatMap((e) => e.cells).sort((e, t) => e.columnSpan - t.columnSpan), a = (e, t, n) => {
		let r = Math.max(0, t.columnStart), i = Math.max(1, Math.min(t.columnSpan, e.length - r));
		if (i <= 0) return;
		let a = zx(n) - Hx(e, r, i);
		a > Q && Zx(e, r, i, a);
	};
	for (let e of i) a(n, e, e.minContentWidthPt), a(r, e, Math.max(e.minContentWidthPt, e.maxContentWidthPt));
	let o = n.reduce((e, t) => e + t, 0), s = Math.max(o, r.reduce((e, t) => e + t, 0));
	return Object.freeze({
		minWidthPt: o,
		maxWidthPt: s
	});
}
function $x(e, t, n, r) {
	let i = Math.max(0, r.columnStart), a = Math.max(1, Math.min(r.columnSpan, e.length - i));
	if (a <= 0) return;
	let o = zx(r.minContentWidthPt), s = Hx(e, i, a);
	if (o <= s + Q) return;
	let c = a === 1 ? n[i] ?? o : Math.max(o, zx(r.maxContentWidthPt));
	Zx(e, i, a, Xx(e, t, i, a, Math.max(0, c - s)));
	let l = Hx(e, i, a);
	l < o - Q && Zx(e, i, a, o - l);
}
function eS(e, t, n, r) {
	let i = e.reduce((e, t) => e + t, 0);
	if (i <= r + Q || i <= Q) return e;
	let a = [...e], o = a.map((e, n) => Math.max(0, e - (t[n] ?? 0))), s = o.reduce((e, t) => e + t, 0), c = Math.min(i - r, s);
	c > Q && s > Q && a.forEach((e, t) => {
		a[t] -= c * ((o[t] ?? 0) / s);
	});
	for (let e of n) {
		if (e.columnSpan <= 1) continue;
		let n = Math.max(0, e.columnStart), r = Math.max(1, Math.min(e.columnSpan, a.length - n)), i = zx(e.minContentWidthPt) - Hx(a, n, r);
		if (i <= Q) continue;
		let o = Xx(a, t, n, r, i);
		Zx(a, n, r, o), o < i - Q && Zx(a, n, r, i - o);
	}
	let l = a.reduce((e, t) => e + t, 0);
	if (l <= r + Q || l <= Q) return Bx(a);
	let u = Math.max(0, r) / l;
	return Bx(a.map((e) => e * u));
}
function tS(e) {
	let t = Vx(e);
	if (t === 0) return Object.freeze([]);
	let n = qx(e, t);
	if (e.layout === "fixed") {
		if (e.availableWidthPt === null) return Object.freeze(n);
		let t = n.reduce((e, t) => e + t, 0), r = zx(e.availableWidthPt);
		if (t <= r + Q || t <= Q) return Object.freeze(n);
		let i = r / t;
		return Object.freeze(Bx(n.map((e) => e * i)));
	}
	let r = n.reduce((e, t) => e + t, 0), { minimums: i, maximums: a } = Yx(e.rows, t, r), o = e.rows.flatMap((e) => e.cells);
	o.sort((e, t) => e.columnSpan - t.columnSpan);
	for (let e of o) $x(n, i, a, e);
	return Object.freeze(eS(n, i, o, zx(e.availableWidthPt)));
}
function nS(e) {
	let t = tS(e), n = t.map((t, n) => {
		let r = t !== e.gridWidthsPt[n];
		return !r && e.gridWidthKeys?.[n] === null ? null : !r && e.gridWidthKeys?.[n] !== void 0 ? e.gridWidthKeys[n] : kx(t) ?? "0/1";
	});
	return Object.freeze({
		widthsPt: Object.freeze([...t]),
		widthKeys: Object.freeze(n)
	});
}
function rS(e) {
	return nS(e).widthsPt;
}
//#endregion
//#region packages/docx/src/layout/table-cell-blocks.ts
function iS(e, t) {
	if (t !== e.length - 1 || t === 0) return !1;
	let n = e[t], r = e[t - 1];
	return n?.type === "paragraph" && r?.type === "table" && n.runs.length === 0;
}
function aS(e, t) {
	let { cell: n, table: r, cellTotalWidthPt: i, outerState: a, sourcePath: o } = e, s = t.resolveContentWidthPt(n, r, i), c = t.createCellState(a, s, n), l = [];
	for (let e = 0; e < n.content.length; e += 1) {
		let r = n.content[e];
		if (!r) continue;
		let i = [...o, e];
		if (r.type === "paragraph") {
			let a = n.content[e - 1], o = n.content[e + 1], u = r, d = t.acquireParagraph(c, u, s, i, mu(a?.type === "paragraph" ? a : null, u, o?.type === "paragraph" ? o : null));
			l.push(d), t.advanceState(c, d.advancePt);
			continue;
		}
		let a = r, u = r;
		l.push(t.acquireNestedTable(c, a, s, i, {
			fromPrevious: u.nestedSliceContinuesFromPrevious ?? !1,
			onNext: u.nestedSliceContinuesOnNext ?? !1
		}, (e, n, r, i, a) => aS({
			cell: e,
			table: n,
			cellTotalWidthPt: r,
			outerState: i,
			sourcePath: a
		}, t)));
	}
	return l;
}
//#endregion
//#region packages/docx/src/cell-border-conflict.ts
function oS(e) {
	return Xl(e.style, e.width);
}
function sS(e) {
	let t = Jl.indexOf(e);
	return t === -1 ? Jl.length : t;
}
function cS(e) {
	if (!e) return {
		r: 0,
		g: 0,
		b: 0
	};
	let t = e.replace(/^#/, "");
	return t.length !== 6 || /[^0-9a-fA-F]/.test(t) ? {
		r: 0,
		g: 0,
		b: 0
	} : {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	};
}
function lS(e, t) {
	let n = cS(e), r = cS(t), i = (e) => e.r + e.b + 2 * e.g, a = (e) => e.b + 2 * e.g, o = (e) => e.g;
	for (let e of [
		i,
		a,
		o
	]) {
		let t = e(n) - e(r);
		if (t !== 0) return t;
	}
	return 0;
}
function uS(e, t) {
	let n = (e) => e && e.spec.style !== "nil" && e.spec.style !== "none" ? e : null, r = n(e), i = n(t);
	if (!r && !i) return null;
	if (!r) return i;
	if (!i || r.source === "cell" && i.source === "table") return r;
	if (i.source === "cell" && r.source === "table") return i;
	let a = oS(r.spec), o = oS(i.spec);
	if (a !== o) return a > o ? r : i;
	let s = sS(r.spec.style), c = sS(i.spec.style);
	if (s !== c) return s < c ? r : i;
	let l = lS(r.spec.color, i.spec.color);
	return l === 0 || l < 0 ? r : i;
}
//#endregion
//#region packages/docx/src/layout/table-border-layer.ts
function dS(...e) {
	for (let t of e) if (t && Vl(t.authoredStyle)) return t;
	return null;
}
//#endregion
//#region packages/docx/src/layout/table.ts
function fS(e) {
	return Math.max(0, e.advancePt - e.spacing.beforePt - e.spacing.afterPt);
}
function pS(e) {
	let t = [], n = 0, r = null, i = 0, a, o = 0, s = null, c = null;
	for (let l of e) {
		let e = l.layout;
		if (e.kind === "paragraph") {
			let u = e.spacing.beforePt, d = e.spacing.afterPt, f = r ? Gg(r, e, i, u) : u, p = l.structuralTrailing ? 0 : fS(e), m = n + (l.structuralTrailing ? 0 : f);
			if (t.push({
				layout: e,
				offsetPt: m,
				advancePt: p
			}), l.structuralTrailing || (n = m + p, a ??= m, o = Math.max(o, n), r = e, i = d), e.cellContainmentBounds) {
				let t = m + e.cellContainmentBounds.yPt - e.flowBounds.yPt, n = t + e.cellContainmentBounds.heightPt;
				a = a === void 0 ? t : Math.min(a, t), o = Math.max(o, n), s = s === null ? t : Math.min(s, t), c = c === null ? n : Math.max(c, n);
			}
			continue;
		}
		r && (n += i);
		let u = e.advancePt;
		t.push({
			layout: e,
			offsetPt: n,
			advancePt: u
		}), a ??= n, n += u, o = n, r = null, i = 0;
	}
	let l = n + (r ? i : 0), u = a ?? 0;
	return {
		blocks: t,
		flowHeightPt: l,
		inkTopPt: u,
		inkHeightPt: Math.max(0, o - u),
		cellContainmentTopPt: s,
		cellContainmentBottomPt: c
	};
}
function mS(e) {
	let t = e.cellContainmentTopPt ?? 0, n = e.cellContainmentBottomPt ?? 0;
	return Math.max(e.flowHeightPt, n) - Math.min(0, t);
}
function hS(e) {
	return mS(pS(e));
}
function gS(e) {
	return Number.isFinite(e?.cellSpacingPt) ? Math.max(0, e?.cellSpacingPt ?? 0) : 0;
}
function _S(e, t) {
	let n = gS(e[t]), r = gS(e[t - 1]), i = gS(e[t + 1]);
	return {
		topPt: t === 0 ? n : Math.max(r, n) / 2,
		bottomPt: t === e.length - 1 ? n : Math.max(n, i) / 2
	};
}
function vS(e, t, n) {
	return n.topPt + e.margins.topPt + mS(t) + e.margins.bottomPt + n.bottomPt;
}
function yS(e, t, n, r) {
	let i = t;
	for (let a = t + 1; a < e.length && e[a]?.cells.find((e) => e.columnStart === n && e.columnSpan === r && e.verticalMerge === "continue"); a += 1) i = a;
	return i;
}
function bS(e) {
	return e.heightRule === "exact" ? zl(e.heightPt, e.cells.map((e) => e.margins.bottomPt)) : e.heightRule === "atLeast" ? Math.max(0, e.heightPt ?? 0) : 0;
}
function xS(e, t, n) {
	let r = e.map((e) => bS(e)), i = e.map((n, r) => Math.max(0, ...n.cells.filter((e) => e.verticalMerge !== "continue").map((n) => {
		let i = n.verticalMerge === "restart" ? yS(e, r, n.columnStart, n.columnSpan) : r, a = _S(e, r), o = _S(e, i);
		return vS(n, t.get(n.id) ?? pS([]), {
			topPt: a.topPt,
			bottomPt: o.bottomPt
		});
	})));
	e.forEach((n, i) => {
		let a = _S(e, i);
		for (let e of n.cells) {
			if (e.verticalMerge !== "none") continue;
			let o = vS(e, t.get(e.id) ?? pS([]), a);
			n.heightRule !== "exact" && (r[i] = Math.max(r[i] ?? 0, o));
		}
	});
	let a = [];
	e.forEach((n, r) => {
		for (let i of n.cells) i.verticalMerge === "restart" && a.push({
			start: r,
			end: yS(e, r, i.columnStart, i.columnSpan),
			requiredPt: vS(i, t.get(i.id) ?? pS([]), {
				topPt: _S(e, r).topPt,
				bottomPt: _S(e, yS(e, r, i.columnStart, i.columnSpan)).bottomPt
			})
		});
	}), a.sort((e, t) => e.end - t.end || e.start - t.start);
	for (let t of a) {
		let n = 0;
		for (let e = t.start; e <= t.end; e += 1) n += r[e] ?? 0;
		let i = t.requiredPt - n;
		if (!(i <= 0)) {
			for (let n = t.end; n >= t.start; --n) if (e[n]?.heightRule !== "exact") {
				r[n] = (r[n] ?? 0) + i;
				break;
			}
		}
	}
	return e.forEach((e, t) => {
		e.heightRule !== "exact" && (r[t] = (r[t] ?? 0) + (n[t] ?? 0));
	}), {
		heights: r,
		contentHeights: i
	};
}
function SS(e, t) {
	return e ? {
		source: t,
		spec: {
			width: e.widthPt,
			color: e.color,
			style: e.authoredStyle
		}
	} : null;
}
function CS(e, t, n, r, i, a, o, s) {
	let c = (e, t, n, r, i, a, o) => {
		let s = dS(e, o ? t : null);
		return s ? SS(s, "cell") : SS(o ? dS(r, a) : dS(n, i), "table");
	}, l = c(e.borders.top, e.borders.insideH, n?.top ?? null, n?.insideH ?? null, t.top, t.insideH, r !== 0), u = c(e.borders.bottom, e.borders.insideH, n?.bottom ?? null, n?.insideH ?? null, t.bottom, t.insideH, i !== a - 1), d = c(e.borders.left, e.borders.insideV, n?.left ?? null, n?.insideV ?? null, t.left, t.insideV, e.columnStart !== 0), f = c(e.borders.right, e.borders.insideV, n?.right ?? null, n?.insideV ?? null, t.right, t.insideV, e.columnStart + e.columnSpan !== o);
	return s ? {
		top: l,
		right: d,
		bottom: u,
		left: f
	} : {
		top: l,
		right: f,
		bottom: u,
		left: d
	};
}
function wS(e) {
	return e ? {
		widthPt: e.spec.width,
		color: e.spec.color ?? "#000000",
		authoredStyle: e.spec.style
	} : null;
}
function TS(e, t, n) {
	let r = wS(uS(e, t));
	return r ? {
		border: r,
		edge: n
	} : null;
}
function ES(e) {
	let t = e.columnWidthsPt.length, n = [], r = e.rows.map(() => Array(t).fill(-1));
	return e.rows.forEach((i, a) => {
		for (let o of i.cells) {
			if (o.verticalMerge === "continue") continue;
			let i = o.verticalMerge === "restart" ? yS(e.rows, a, o.columnStart, o.columnSpan) : a, s = n.length;
			n.push({
				input: o,
				rowIndex: a,
				lastRowIndex: i
			});
			let c = Math.min(t, o.columnStart + o.columnSpan);
			for (let e = a; e <= i; e += 1) for (let t = Math.max(0, o.columnStart); t < c; t += 1) r[e][t] = s;
		}
	}), {
		owners: n,
		occupancy: r
	};
}
function DS(e, t) {
	return t.lastRowIndex === t.rowIndex ? t.input : e.rows[t.lastRowIndex]?.cells.find((e) => e.columnStart === t.input.columnStart && e.columnSpan === t.input.columnSpan && e.verticalMerge === "continue") ?? t.input;
}
function OS(e) {
	let t = e.rows.length, n = e.columnWidthsPt.length, { owners: r, occupancy: i } = ES(e), a = (i, a = !1) => {
		let o = r[i];
		if (!o) return null;
		let s = a ? DS(e, o) : o.input, c = a && s !== o.input ? o.lastRowIndex : o.rowIndex;
		return CS(s, e.borders, e.rows[c]?.exceptionBorders ?? null, o.rowIndex, o.lastRowIndex, t, n, e.bidiVisual);
	};
	return {
		horizontal: Array.from({ length: t + 1 }, (e, o) => Array.from({ length: n }, (e, n) => {
			let s = o > 0 ? i[o - 1]?.[n] ?? -1 : -1, c = o < t ? i[o]?.[n] ?? -1 : -1;
			if (s >= 0 && s === c) return null;
			let l = a(c), u = o === 0 ? "top" : o === t ? "bottom" : "between";
			return {
				above: {
					owner: r[s] ?? null,
					border: a(s, !0)?.bottom ?? null
				},
				below: {
					owner: r[c] ?? null,
					border: l?.top ?? null
				},
				edge: u
			};
		})),
		vertical: Array.from({ length: n + 1 }, (r, o) => Array.from({ length: t }, (t, r) => {
			let s = o > 0 ? i[r]?.[o - 1] ?? -1 : -1, c = o < n ? i[r]?.[o] ?? -1 : -1, l = e.bidiVisual ? c : s, u = e.bidiVisual ? s : c;
			return l >= 0 && l === u ? null : TS(a(l)?.right ?? null, a(u)?.left ?? null, o === 0 ? e.bidiVisual ? "right" : "left" : o === n ? e.bidiVisual ? "left" : "right" : "between");
		})),
		occupancy: i
	};
}
function kS(e, t) {
	return t.horizontal.map((t, n) => gS(e.rows[n - 1]) > 0 || gS(e.rows[n]) > 0 ? 0 : t.reduce((e, t) => {
		if (!t) return e;
		let n = TS(t.above.border, t.below.border, t.edge);
		return Math.max(e, n?.border.widthPt ?? 0);
	}, 0));
}
function AS(e, t) {
	let n = kS(e, t);
	return e.rows.map((e, t) => e.heightRule === "exact" ? 0 : Bl(n[t] ?? 0, n[t + 1] ?? 0));
}
function jS(e) {
	return AS(e, OS(e));
}
function MS(e, t, n) {
	return {
		edge: e.edge,
		from: t,
		to: n,
		color: e.border.color,
		widthPt: e.border.widthPt,
		...ki(e.border.authoredStyle, e.border.widthPt)
	};
}
var NS = Object.freeze({
	top: null,
	right: null,
	bottom: null,
	left: null,
	insideH: null,
	insideV: null
});
function PS(e) {
	let t = wS(e);
	return t && t.authoredStyle !== "nil" && t.authoredStyle !== "none" ? t : null;
}
function FS(e, t, n, r, i) {
	let a = [0];
	for (let t of e.columnWidthsPt) a.push((a.at(-1) ?? 0) + t);
	let o = [0];
	for (let e of r) o.push((o.at(-1) ?? 0) + e);
	let s = a.at(-1) ?? 0, c = (n, r) => (t[n] ?? 0) + (e.bidiVisual ? s - (a[r] ?? 0) : a[r] ?? 0), l = (e) => n + (o[e] ?? 0), u = [], d = (e, t, n, r) => {
		!e || e.authoredStyle === "nil" || e.authoredStyle === "none" || u.push(MS({
			border: e,
			edge: t
		}, n, r));
	}, f = /* @__PURE__ */ new Set(), p = (t, n, r, i) => {
		let a = t.owner;
		if (!a) return;
		let o = `${n}:${r}:${a.input.id}`;
		if (f.has(o)) return;
		f.add(o);
		let s = e.rows[a.rowIndex];
		if (!s) return;
		let u = gS(s), p = c(a.rowIndex, a.input.columnStart), m = c(a.rowIndex, Math.min(e.columnWidthsPt.length, a.input.columnStart + a.input.columnSpan)), { startPt: h, endPt: g } = Rx(u, a.input.columnStart, a.input.columnSpan, e.columnWidthsPt.length), _ = Math.min(p, m) + (e.bidiVisual ? g : h), v = Math.max(p, m) - (e.bidiVisual ? h : g), y = l(a.rowIndex) + _S(e.rows, a.rowIndex).topPt, b = l(a.lastRowIndex + 1) - _S(e.rows, a.lastRowIndex).bottomPt, x = CS(a.input, NS, null, a.rowIndex, a.lastRowIndex, e.rows.length, e.columnWidthsPt.length, e.bidiVisual), S = r === "top" ? x.top : x.bottom, C = r === "top" ? y : b;
		d(PS(S), i, {
			xPt: _,
			yPt: C
		}, {
			xPt: v,
			yPt: C
		});
	};
	return i.horizontal.forEach((n, r) => {
		let a = r > 0 && gS(e.rows[r - 1]) > 0, o = r < e.rows.length && gS(e.rows[r]) > 0;
		if (a || o) {
			let a = Math.max(gS(e.rows[r - 1]), gS(e.rows[r])), u = o ? r : r - 1, f = t[u] ?? 0, m = r === 0 ? "top" : r === e.rows.length ? "bottom" : "between";
			r === 0 || r === e.rows.length ? d(dS(r === 0 ? e.rows[0]?.exceptionBorders?.top ?? null : e.rows.at(-1)?.exceptionBorders?.bottom ?? null, r === 0 ? e.borders.top : e.borders.bottom), m, {
				xPt: f,
				yPt: l(r)
			}, {
				xPt: f + s,
				yPt: l(r)
			}) : n.forEach((t, n) => {
				let o = i.occupancy[r - 1]?.[n] ?? -1, s = i.occupancy[r]?.[n] ?? -1;
				if (!t || !(o !== s && (o >= 0 || s >= 0)) || [{
					side: t.above,
					directEdge: "bottom"
				}, {
					side: t.below,
					directEdge: "top"
				}].some(({ side: e, directEdge: t }) => {
					let n = e.owner;
					return n ? Ul({
						spacingPt: a,
						directStyle: n.input.borders[t]?.authoredStyle,
						conditionalInsideStyle: n.input.borders.insideH?.authoredStyle
					}) : !1;
				})) return;
				let f = c(u, n), p = c(u, n + 1), h = dS(e.rows[r - 1]?.exceptionBorders?.insideH ?? null, e.borders.insideH), g = dS(e.rows[r]?.exceptionBorders?.insideH ?? null, e.borders.insideH);
				d(TS(SS(h, "table"), SS(g, "table"), m)?.border ?? null, m, {
					xPt: Math.min(f, p),
					yPt: l(r)
				}, {
					xPt: Math.max(f, p),
					yPt: l(r)
				});
			}), n.forEach((e) => {
				e && (p(e.above, r, "bottom", e.edge), p(e.below, r, "top", e.edge));
			});
			return;
		}
		let f = [], m = /* @__PURE__ */ new Map();
		n.forEach((t) => {
			if (!t) return;
			let n = (t, n) => {
				if (!n.owner || !n.border) return;
				let r = `${t}:${n.owner.input.id}`;
				if (m.has(r)) return;
				let i = c(n.owner.rowIndex, n.owner.input.columnStart), a = c(n.owner.rowIndex, Math.min(e.columnWidthsPt.length, n.owner.input.columnStart + n.owner.input.columnSpan));
				m.set(r, {
					side: t,
					border: n.border,
					leftPt: Math.min(i, a),
					rightPt: Math.max(i, a)
				});
			};
			n("above", t.above), n("below", t.below);
		});
		let h = [...m.values()], g = [...new Set(h.flatMap((e) => [e.leftPt, e.rightPt]))].sort((e, t) => e - t), _ = r === 0 ? "top" : r === e.rows.length ? "bottom" : "between";
		for (let e = 1; e < g.length; e += 1) {
			let t = g[e - 1] ?? 0, n = g[e] ?? t;
			if (n <= t) continue;
			let r = (t + n) / 2, i = h.filter((e) => r > e.leftPt && r < e.rightPt), a = TS(i.find((e) => e.side === "above")?.border ?? null, i.find((e) => e.side === "below")?.border ?? null, _);
			a && f.push({
				resolved: a,
				leftPt: t,
				rightPt: n
			});
		}
		f.sort((e, t) => e.leftPt - t.leftPt);
		let v = [];
		for (let e of f) {
			let t = v.at(-1);
			t && t.rightPt === e.leftPt && t.resolved.edge === e.resolved.edge && t.resolved.border.widthPt === e.resolved.border.widthPt && t.resolved.border.color === e.resolved.border.color && t.resolved.border.authoredStyle === e.resolved.border.authoredStyle ? t.rightPt = e.rightPt : v.push({ ...e });
		}
		for (let e of v) u.push(MS(e.resolved, {
			xPt: e.leftPt,
			yPt: l(r)
		}, {
			xPt: e.rightPt,
			yPt: l(r)
		}));
	}), i.vertical.forEach((t, n) => {
		t.forEach((t, r) => {
			gS(e.rows[r]) > 0 || t && u.push(MS(t, {
				xPt: c(r, n),
				yPt: l(r)
			}, {
				xPt: c(r, n),
				yPt: l(r + 1)
			}));
		});
	}), e.rows.forEach((n, r) => {
		let a = gS(n);
		if (a <= 0) return;
		let o = l(r), u = l(r + 1), f = t[r] ?? 0;
		d(dS(n.exceptionBorders?.left ?? null, e.borders.left), "left", {
			xPt: f,
			yPt: o
		}, {
			xPt: f,
			yPt: u
		}), d(dS(n.exceptionBorders?.right ?? null, e.borders.right), "right", {
			xPt: f + s,
			yPt: o
		}, {
			xPt: f + s,
			yPt: u
		});
		let p = /* @__PURE__ */ new Set();
		for (let e of n.cells) Ul({
			spacingPt: a,
			directStyle: e.borders.left?.authoredStyle,
			conditionalInsideStyle: e.borders.insideV?.authoredStyle
		}) && p.add(e.columnStart), Ul({
			spacingPt: a,
			directStyle: e.borders.right?.authoredStyle,
			conditionalInsideStyle: e.borders.insideV?.authoredStyle
		}) && p.add(e.columnStart + e.columnSpan);
		for (let t = 1; t < e.columnWidthsPt.length; t += 1) {
			let a = i.occupancy[r]?.[t - 1] ?? -1, s = i.occupancy[r]?.[t] ?? -1;
			if (!(a !== s && (a >= 0 || s >= 0))) continue;
			let l = c(r, t);
			p.has(t) || d(dS(n.exceptionBorders?.insideV ?? null, e.borders.insideV), "between", {
				xPt: l,
				yPt: o
			}, {
				xPt: l,
				yPt: u
			});
		}
		for (let t of n.cells) {
			if (t.verticalMerge === "continue") continue;
			let n = t.verticalMerge === "restart" ? yS(e.rows, r, t.columnStart, t.columnSpan) : r, i = c(r, t.columnStart), o = c(r, Math.min(e.columnWidthsPt.length, t.columnStart + t.columnSpan)), { startPt: s, endPt: u } = Rx(a, t.columnStart, t.columnSpan, e.columnWidthsPt.length), f = Math.min(i, o) + (e.bidiVisual ? u : s), p = Math.max(i, o) - (e.bidiVisual ? s : u), m = l(r) + _S(e.rows, r).topPt, h = l(n + 1) - _S(e.rows, n).bottomPt, g = CS(t, NS, null, r, n, e.rows.length, e.columnWidthsPt.length, e.bidiVisual);
			d(PS(g.right), "right", {
				xPt: p,
				yPt: m
			}, {
				xPt: p,
				yPt: h
			}), d(PS(g.left), "left", {
				xPt: f,
				yPt: m
			}, {
				xPt: f,
				yPt: h
			});
		}
	}), u;
}
function IS(e, t, n, r, i) {
	let a = r.availableBounds, o = e === "center" ? a.xPt + (a.widthPt - i) / 2 : e === "right" ? a.xPt + a.widthPt - i : a.xPt;
	return t === 0 ? o : Hl(o, t, n);
}
function LS(e, t) {
	if (t.length === 0) return e;
	let n = Math.min(e.xPt, ...t.map((e) => Math.min(e.from.xPt, e.to.xPt) - e.widthPt / 2)), r = Math.min(e.yPt, ...t.map((e) => Math.min(e.from.yPt, e.to.yPt) - e.widthPt / 2)), i = Math.max(e.xPt + e.widthPt, ...t.map((e) => Math.max(e.from.xPt, e.to.xPt) + e.widthPt / 2)), a = Math.max(e.yPt + e.heightPt, ...t.map((e) => Math.max(e.from.yPt, e.to.yPt) + e.widthPt / 2));
	return {
		xPt: n,
		yPt: r,
		widthPt: i - n,
		heightPt: a - r
	};
}
function RS(e) {
	let t = /* @__PURE__ */ new Map();
	e.forEach((e, n) => {
		if (e.style !== "compound" || !e.edge || e.edge === "between") return;
		let r = `${e.authoredStyle}\u0000${e.color}\u0000${e.widthPt}`, i = t.get(r) ?? [];
		i.push({
			border: e,
			index: n
		}), t.set(r, i);
	});
	let n = [];
	for (let e of t.values()) {
		let t = (t) => e.filter((e) => e.border.edge === t), r = t("top"), i = t("right"), a = t("bottom"), o = t("left");
		if (!r.length || !i.length || !a.length || !o.length) continue;
		let s = Math.min(...r.flatMap(({ border: e }) => [e.from.xPt, e.to.xPt])), c = Math.max(...r.flatMap(({ border: e }) => [e.from.xPt, e.to.xPt])), l = r[0].border.from.yPt, u = a[0].border.from.yPt, d = (e, t, n, r) => {
			let i = e.map(({ border: e }) => r(e)).map(([e, t]) => [Math.min(e, t), Math.max(e, t)]).sort((e, t) => e[0] - t[0]);
			if (i[0]?.[0] !== t) return !1;
			let a = t;
			for (let e of i) {
				if (e[0] > a) return !1;
				a = Math.max(a, e[1]);
			}
			return a === n;
		};
		if (!(r.every(({ border: e }) => e.from.yPt === l && e.to.yPt === l) && a.every(({ border: e }) => e.from.yPt === u && e.to.yPt === u) && o.every(({ border: e }) => e.from.xPt === s && e.to.xPt === s) && i.every(({ border: e }) => e.from.xPt === c && e.to.xPt === c) && d(r, s, c, (e) => [e.from.xPt, e.to.xPt]) && d(a, s, c, (e) => [e.from.xPt, e.to.xPt]) && d(o, l, u, (e) => [e.from.yPt, e.to.yPt]) && d(i, l, u, (e) => [e.from.yPt, e.to.yPt]))) continue;
		let f = e[0].border;
		n.push({
			bounds: {
				xPt: s,
				yPt: l,
				widthPt: c - s,
				heightPt: u - l
			},
			border: {
				authoredStyle: f.authoredStyle,
				color: f.color,
				widthPt: f.widthPt,
				style: f.style
			},
			segmentIndexes: e.map(({ index: e }) => e)
		});
	}
	return n;
}
function zS(e, t) {
	let n = Math.max(e.xPt, t.xPt), r = Math.max(e.yPt, t.yPt), i = Math.min(e.xPt + e.widthPt, t.xPt + t.widthPt), a = Math.min(e.yPt + e.heightPt, t.yPt + t.heightPt);
	return i > n && a > r ? {
		xPt: n,
		yPt: r,
		widthPt: i - n,
		heightPt: a - r
	} : null;
}
function BS(e, t, n) {
	let r = e.layout, i = t + (r.kind === "table" ? r.flowBounds.xPt : 0), a = n + e.offsetPt + (r.kind === "table" ? r.flowBounds.yPt : 0), o = i - r.flowBounds.xPt, s = a - r.flowBounds.yPt;
	return {
		xPt: r.inkBounds.xPt + o,
		yPt: r.inkBounds.yPt + s,
		widthPt: r.inkBounds.widthPt,
		heightPt: r.inkBounds.heightPt
	};
}
function VS(e, t, n) {
	let r = V(e, "TableLayoutInput");
	if (r.columnWidthsPt.some((e) => !Number.isFinite(e) || e < 0)) throw TypeError("TableLayoutInput.columnWidthsPt must contain finite non-negative widths");
	let i = /* @__PURE__ */ new Map();
	r.rows.forEach((e) => e.cells.forEach((e) => {
		i.set(e.id, pS(e.verticalMerge === "continue" ? [] : e.blocks));
	}));
	let a = OS(r), o = xS(r.rows, i, AS(r, a)), s = o.heights, c = r.columnWidthsPt.reduce((e, t) => e + t, 0), l = s.reduce((e, t) => e + t, 0), u = t.cursor.yPt, d = r.rows.map((e) => IS(e.alignment ?? r.alignment, Number.isFinite(e.indentPt) ? e.indentPt : r.indentPt, r.bidiVisual, t, c)), f = d[0] ?? IS(r.alignment, r.indentPt, r.bidiVisual, t, c), p = FS(r, d, u, s, a), m = RS(p), h = [0];
	for (let e of r.columnWidthsPt) h.push((h.at(-1) ?? 0) + e);
	let g = [0];
	for (let e of s) g.push((g.at(-1) ?? 0) + e);
	let _ = (e, t) => (d[e] ?? f) + (r.bidiVisual ? c - (h[t] ?? 0) : h[t] ?? 0), v = r.rows.map((e, n) => {
		let a = u + (g[n] ?? 0), l = s[n] ?? 0, p = d[n] ?? f, m = _S(r.rows, n), h = gS(e), v = e.cells.map((e) => {
			let o = e.verticalMerge === "restart" ? yS(r.rows, n, e.columnStart, e.columnSpan) : n, s = _S(r.rows, o), c = u + (g[o + 1] ?? g[n + 1] ?? 0) - s.bottomPt, d = _(n, e.columnStart), f = _(n, Math.min(r.columnWidthsPt.length, e.columnStart + e.columnSpan)), p = Math.min(d, f), v = Math.max(d, f), { startPt: y, endPt: b } = Rx(h, e.columnStart, e.columnSpan, r.columnWidthsPt.length), x = p + (r.bidiVisual ? b : y), S = v - (r.bidiVisual ? y : b), C = Math.max(0, S - x), w = a + m.topPt, T = e.verticalMerge === "restart" ? Math.max(0, c - w) : Math.max(0, l - m.topPt - m.bottomPt), E = i.get(e.id) ?? pS([]), D = Math.max(0, T - e.margins.topPt - e.margins.bottomPt), O = e.margins.topPt - Math.min(0, E.inkTopPt), k = E.inkHeightPt >= D ? O : e.vAlign === "center" ? e.margins.topPt + (D - E.inkHeightPt) / 2 - E.inkTopPt : e.vAlign === "bottom" ? T - e.margins.bottomPt - E.inkHeightPt - E.inkTopPt : O, A = {
				xPt: x + e.margins.leftPt,
				yPt: w + k,
				widthPt: Math.max(0, C - (e.margins.leftPt + e.margins.rightPt)),
				heightPt: D
			}, j = {
				xPt: x,
				yPt: w,
				widthPt: C,
				heightPt: T
			}, M = e.verticalMerge !== "continue" && r.rows.slice(n, o + 1).every((e) => e.heightRule === "exact") ? Wl(j, t.availableBounds) : void 0, N = e.verticalMerge === "continue" ? [] : E.blocks.map((e) => ({
				...e,
				offsetPt: k + e.offsetPt
			})), P = Od([j, ...N.map((e) => BS(e, A.xPt, j.yPt)).map((e) => M ? zS(e, M) : e).filter((e) => e !== null)]) ?? j;
			return {
				kind: "table-cell",
				id: e.id,
				source: e.source,
				flowDomainId: r.flowDomainId,
				ordinaryFlow: r.ordinaryFlow,
				flowBounds: j,
				inkBounds: P,
				...M ? { clipBounds: M } : {},
				contentBounds: A,
				advancePt: T,
				verticalMerge: e.verticalMerge,
				vAlign: e.vAlign,
				...e.background ? { background: e.background } : {},
				blocks: N
			};
		}), y = {
			xPt: p,
			yPt: a,
			widthPt: c,
			heightPt: l
		}, b = Od([y, ...v.map((e) => e.inkBounds)]) ?? y;
		return {
			kind: "table-row",
			id: e.id,
			source: e.source,
			flowDomainId: r.flowDomainId,
			ordinaryFlow: r.ordinaryFlow,
			flowBounds: y,
			inkBounds: b,
			advancePt: l,
			heightPt: l,
			contentHeightPt: o.contentHeights[n] ?? 0,
			...e.repeatedHeader ? { repeatedHeader: !0 } : {},
			cells: v
		};
	}), y = d.length > 0 ? Math.min(...d) : f, b = d.length > 0 ? Math.max(...d.map((e) => e + c)) : f + c, x = {
		xPt: y,
		yPt: u,
		widthPt: Math.max(0, b - y),
		heightPt: l
	}, S = Od([x, ...v.map((e) => e.inkBounds)]) ?? x;
	return V({
		layout: {
			kind: "table",
			id: r.id,
			source: r.source,
			flowDomainId: r.flowDomainId,
			ordinaryFlow: r.ordinaryFlow,
			flowBounds: x,
			inkBounds: LS(S, p),
			advancePt: l,
			columnWidthsPt: r.columnWidthsPt,
			rows: v,
			borders: p,
			...m.length ? { compoundBorderFrames: m } : {}
		},
		nextCursor: {
			xPt: t.cursor.xPt,
			yPt: t.cursor.yPt + l
		}
	}, "TableLayoutResult");
}
//#endregion
//#region packages/docx/src/layout/table-acquisition.ts
function HS(e, t) {
	return t.has(e) ? !0 : (t.add(e), e.kind === "drawing" ? e.anchorLayer === void 0 : e.kind === "paragraph" ? e.lines.every((e) => e.placements.every((e) => e.kind !== "text" || e.dependency !== "page")) && e.drawings.every((e) => HS(e, t)) && e.textBoxes.every((e) => HS(e, t)) : e.kind === "textbox" || e.kind === "note" ? e.story.blocks.every((e) => HS(e, t)) : e.rows.every((e) => e.cells.every((e) => e.blocks.every((e) => HS(e.layout, t)))) && (e.floatingTables ?? []).every((e) => HS(e.child, t)) && (e.resolvedFloatingTables ?? []).every((e) => HS(e.child, t)));
}
function US(e, t) {
	return e.input.rows.every((e) => e.cells.every((e) => e.blocks.every((e) => e.pageDependent !== !0 && HS(e.layout, t)))) && Object.values(e.nestedById).every((e) => US(e, t));
}
function WS(e) {
	return US(e, /* @__PURE__ */ new Set());
}
function GS(e, t) {
	let n = e.findIndex((e, n) => n > t && e.type === "paragraph" && e.framePr == null);
	if (n < 0) throw Error("A nested floating table requires a following regular paragraph anchor");
	return n;
}
function KS(e) {
	if (!e) return null;
	let t = e.color ?? "000000";
	return Object.freeze({
		widthPt: e.width,
		color: t.startsWith("#") ? t : `#${t}`,
		authoredStyle: e.style
	});
}
function qS(e) {
	return Object.freeze({
		top: KS(e.top),
		right: KS(e.right),
		bottom: KS(e.bottom),
		left: KS(e.left),
		insideH: KS(e.insideH),
		insideV: KS(e.insideV)
	});
}
function JS(e, t) {
	if (e === "center") return "center";
	let n = e === "right" || e === "end";
	return (t ? !n : n) ? "right" : "left";
}
function YS(e) {
	return e.lines.some((e) => e.placements.some((e) => e.kind === "text" && e.dependency === "page"));
}
function XS(e, t, n, r, i, a) {
	let o = Array.isArray(i) ? {
		story: "body",
		storyInstance: "body",
		path: i
	} : i, s = o.path, c = (e) => ({
		story: o.story,
		storyInstance: o.storyInstance,
		path: e
	}), l = a.layoutServices(r);
	if (!l) throw Error("Retained table acquisition requires layout services");
	let u = o.story === "body" && o.storyInstance === "body" ? `table:${s.join(".")}` : `${o.story}:${o.storyInstance}:table:${s.join(".")}`, d = a.tableFormat(e), f = e.bidiVisual === !0, p = d.firstRowException, m = p?.indentAuthored ? p.indentPt ?? 0 : e.tblInd ?? 0, h = {}, g = [], _ = e.rows.map((n, i) => {
		let o = d.rows[i], l = Math.max(0, Math.min(t.length, n.gridBefore ?? 0)), p = n.cells.map((n, d) => {
			let f = o?.cells[d]?.marginsPt ?? {
				top: n.marginTop ?? e.cellMarginTop,
				right: n.marginRight ?? e.cellMarginRight,
				bottom: n.marginBottom ?? e.cellMarginBottom,
				left: n.marginLeft ?? e.cellMarginLeft
			}, p = l, m = Math.min(Math.max(1, n.colSpan), Math.max(0, t.length - p));
			l += m;
			let _ = t.slice(p, p + m).reduce((e, t) => e + t, 0), v = Rx(o?.cellSpacingPt ?? 0, p, m, t.length), y = [
				...s,
				i,
				d
			], b = `${u}:cell:${i}.${d}`, x = n.vMerge === !1 ? [] : aS({
				cell: n,
				table: e,
				cellTotalWidthPt: _,
				outerState: r,
				sourcePath: y
			}, {
				resolveContentWidthPt: (e, t, n) => Math.max(0, n - (v.startPt + v.endPt) - (f.left + f.right)),
				createCellState: a.createCellState,
				acquireParagraph: (e, t, n, r, o) => a.acquireParagraph(e, t, n, r, `${u}:cell:${i}.${d}`, o, void 0, c(r)),
				acquireNestedTable: (e, t, r, i) => {
					let o = XS(t, a.resolveColumns(t, r, e), r, e, c(i), a);
					h[o.layout.id] = o;
					let s = a.tableFormat(t).positioning;
					if (s) {
						let r = i[i.length - 1], c = s, l = t.overlap === "never" ? "never" : "overlap", u = a.registerFloatingTable(e, {
							child: o.layout,
							positioning: c,
							overlap: l
						}), d = {
							hostCellId: b,
							sourceBlockIndex: r,
							anchorBlockIndex: GS(n.content, r),
							tableId: o.layout.id,
							overlap: l,
							positioning: c,
							...u == null ? {} : { acquiredTextOffsetPt: Object.freeze({ ...u }) }
						};
						g.push(d);
					}
					return o.layout;
				},
				advanceState: a.advanceState
			});
			return {
				id: b,
				source: c(y),
				columnStart: p,
				columnSpan: m,
				verticalMerge: n.vMerge === !0 ? "restart" : n.vMerge === !1 ? "continue" : "none",
				margins: {
					topPt: f.top,
					rightPt: f.right,
					bottomPt: f.bottom,
					leftPt: f.left
				},
				vAlign: n.vAlign,
				...n.background ? { background: { color: n.background.startsWith("#") ? n.background : `#${n.background}` } } : {},
				borders: qS(n.borders),
				blocks: x.flatMap((e, t) => {
					let r = n.content[t];
					return r?.type === "table" && a.tableFormat(r).ordinaryFlow === !1 ? [] : [{
						layout: e,
						sourceBlockIndex: t,
						...r?.type === "paragraph" ? {
							keepLines: r.keepLines === !0,
							widowControl: r.widowControl !== !1
						} : {},
						...e.kind === "paragraph" && YS(e) ? { pageDependent: !0 } : {},
						...iS(n.content, t) ? { structuralTrailing: !0 } : {}
					}];
				})
			};
		}), _ = o?.height?.rule ?? "auto";
		return {
			id: `${u}:row:${i}`,
			source: c([...s, i]),
			logicalRowIndex: i,
			cantSplit: o?.cantSplit ?? n.cantSplit === !0,
			heightPt: o?.height?.valuePt ?? null,
			heightRule: _,
			cellSpacingPt: o?.cellSpacingPt ?? 0,
			exceptionBorders: o?.exception?.borders ? qS(o.exception.borders) : null,
			alignment: JS(o?.justification ?? e.jc, f),
			indentPt: m,
			cells: p,
			repeatedHeader: o?.repeatedHeader ?? n.isHeader === !0
		};
	}), v = V({
		kind: "table",
		id: u,
		source: c([...s]),
		flowDomainId: u,
		ordinaryFlow: d.ordinaryFlow,
		alignment: JS(e.jc, f),
		indentPt: m,
		bidiVisual: f,
		columnWidthsPt: t,
		borders: qS(e.borders),
		rows: _
	}, "RetainedTableAcquisition.input"), y = {
		xPt: 0,
		yPt: 0,
		widthPt: n,
		heightPt: 1
	}, b = VS(v, {
		container: {
			id: u,
			kind: "tableCell",
			bounds: y
		},
		cursor: {
			xPt: 0,
			yPt: 0
		},
		availableBounds: y
	}, l).layout;
	return Object.freeze({
		input: v,
		layout: b,
		nestedById: Object.freeze(h),
		floatingTables: V(g, "RetainedTableAcquisition.floatingTables")
	});
}
//#endregion
//#region packages/docx/src/layout/adjacent-table-layout-input.ts
function ZS(e, t, n) {
	return t === n ? e : Object.freeze({
		...e,
		left: e.right,
		right: e.left
	});
}
function QS(e, t, n) {
	let r = ZS(e.borders, e.bidiVisual, n), i = t.exceptionBorders == null ? null : ZS(t.exceptionBorders, e.bidiVisual, n);
	return i ? Object.freeze({
		top: dS(i.top, r.top),
		right: dS(i.right, r.right),
		bottom: dS(i.bottom, r.bottom),
		left: dS(i.left, r.left),
		insideH: dS(i.insideH, r.insideH),
		insideV: dS(i.insideV, r.insideV)
	}) : r;
}
var $S = class {
	nodes = [Object.freeze({ kind: "zero" })];
	interned = new Map([["Z", 0]]);
	intern(e, t) {
		let n = this.interned.get(e);
		if (n !== void 0) return n;
		let r = this.nodes.length;
		return this.nodes.push(Object.freeze(t)), this.interned.set(e, r), r;
	}
	token(e, t) {
		return this.intern(`T:${e}:${t}`, { kind: "token" });
	}
	add(e, t) {
		if (e === 0) return t;
		if (t === 0) return e;
		let n = this.nodes[e], r = this.nodes[t];
		return n.kind === "sub" && n.right === t ? n.left : r.kind === "sub" && r.right === e ? r.left : this.intern(`A:${e}:${t}`, {
			kind: "add",
			left: e,
			right: t
		});
	}
	subtract(e, t) {
		if (e === t) return 0;
		if (t === 0) return e;
		let n = this.nodes[t];
		return n.kind === "sub" && n.left === e ? n.right : this.intern(`S:${e}:${t}`, {
			kind: "sub",
			left: e,
			right: t
		});
	}
	divide(e, t) {
		return e === 0 ? 0 : this.intern(`D:${e}:${t}`, {
			kind: "div",
			value: e,
			divisor: t
		});
	}
};
function eC(e, t = 0) {
	return Object.freeze({
		position: e,
		sym: t,
		identity: `${e}|${t}`
	});
}
function tC(e, t, n) {
	return eC(Nx(t.position, n.position), e.add(t.sym, n.sym));
}
function nC(e, t, n) {
	return eC(Fx(t.position, n.position), e.subtract(t.sym, n.sym));
}
function rC(e, t, n) {
	return eC(Ix(t.position, n), e.divide(t.sym, n));
}
function iC(e, t, n) {
	let r = [eC("0/1")];
	return t.columnWidthsPt.forEach((i, a) => {
		let o = t.columnWidthKeys?.[a], s = kx(i) ?? "0/1", c = o === null ? eC(s, e.token(n, a)) : eC(o ?? s);
		r.push(tC(e, r.at(-1), c));
	}), Object.freeze(r);
}
function aC(e, t, n, r) {
	let i = nC(e, r, n);
	return t.alignment === "right" ? i : t.alignment === "center" ? rC(e, i, 2n) : eC("0/1");
}
function oC(e, t, n, r, i) {
	return tC(e, i, r ? nC(e, n, t) : t);
}
function sC(e, t) {
	if (e.length === 0) throw RangeError("Adjacent table group id must not be empty");
	if (t.length === 0) throw RangeError("Adjacent table group requires at least one table");
	if (t.some((e) => !e.ordinaryFlow)) throw Error("An absolutely positioned table cannot join an adjacent table group");
	let n = t[0], r = n.bidiVisual, i = new $S(), a = eC("0/1"), o = t.map((e, t) => iC(i, e, t)), s = o.map((e) => e.at(-1) ?? a), c = s.reduce((e, t) => Lx(t.position, e.position) > 0 ? t : e, a), l = (e, t, n, a) => {
		let o = oC(i, e, t, n, a);
		return r ? nC(i, c, o) : o;
	}, u = [];
	t.forEach((e, t) => {
		let n = o[t], a = s[t], d = e.bidiVisual !== r;
		e.rows.forEach((t) => {
			let r = aC(i, t, a, c), o = n.map((t) => l(t, a, e.bidiVisual, r));
			u.push({
				input: e,
				row: t,
				groupBoundaries: o,
				descending: d
			});
		});
	});
	let d = /* @__PURE__ */ new Map();
	for (let e of [a, c]) d.set(e.identity, {
		boundary: e,
		count: 1
	});
	for (let e of u) {
		let t = /* @__PURE__ */ new Map();
		for (let n of e.groupBoundaries) {
			let e = t.get(n.identity);
			t.set(n.identity, {
				boundary: n,
				count: (e?.count ?? 0) + 1
			});
		}
		for (let [e, n] of t) {
			let t = d.get(e);
			n.count > (t?.count ?? 0) && d.set(e, n);
		}
	}
	let f = /* @__PURE__ */ new Map(), p = (e) => {
		let t = f.get(e);
		return t || (t = {
			position: e,
			identities: /* @__PURE__ */ new Map(),
			edges: /* @__PURE__ */ new Map(),
			firstSeen: /* @__PURE__ */ new Map()
		}, f.set(e, t)), t;
	};
	for (let [e, t] of d) p(t.boundary.position).identities.set(e, t);
	let m = 0;
	for (let e of u) {
		let t = e.descending ? [...e.groupBoundaries].reverse() : e.groupBoundaries, n = null, r = null;
		for (let e of t) {
			let t = p(e.position);
			if (t.firstSeen.has(e.identity) || t.firstSeen.set(e.identity, m++), n !== e.position && (n = e.position, r = null), r !== null && r !== e.identity) {
				let n = t.edges.get(r);
				n || (n = /* @__PURE__ */ new Set(), t.edges.set(r, n)), n.add(e.identity);
			}
			r = e.identity;
		}
	}
	for (let e of f.values()) for (let t of e.identities.keys()) e.firstSeen.has(t) || e.firstSeen.set(t, m++);
	let h = [...f.values()].sort((e, t) => Lx(e.position, t.position)), g = [], _ = /* @__PURE__ */ new Map();
	for (let e of h) {
		let t = new Map([...e.identities.keys()].map((e) => [e, 0]));
		for (let n of e.edges.values()) for (let e of n) t.set(e, (t.get(e) ?? 0) + 1);
		let n = [], r = (t) => {
			n.push(t);
			let r = n.length - 1;
			for (; r > 0;) {
				let t = Math.floor((r - 1) / 2);
				if (e.firstSeen.get(n[t]) <= e.firstSeen.get(n[r])) break;
				[n[t], n[r]] = [n[r], n[t]], r = t;
			}
		}, i = () => {
			let t = n[0], r = n.pop();
			if (n.length > 0) {
				n[0] = r;
				let t = 0;
				for (;;) {
					let r = t * 2 + 1, i = r + 1;
					if (r >= n.length) break;
					let a = r;
					if (i < n.length && e.firstSeen.get(n[i]) < e.firstSeen.get(n[r]) && (a = i), e.firstSeen.get(n[t]) <= e.firstSeen.get(n[a])) break;
					[n[t], n[a]] = [n[a], n[t]], t = a;
				}
			}
			return t;
		};
		for (let n of e.identities.keys()) t.get(n) === 0 && r(n);
		let a = [];
		for (; n.length > 0;) {
			let n = i();
			a.push(n);
			for (let i of e.edges.get(n) ?? []) {
				let e = t.get(i) - 1;
				t.set(i, e), e === 0 && r(i);
			}
		}
		if (a.length !== e.identities.size) throw Error(`Adjacent table symbolic boundary ordering cycle at ${e.position}`);
		for (let t of a) {
			let { boundary: n, count: r } = e.identities.get(t);
			_.set(t, g.length);
			for (let e = 0; e < r; e += 1) g.push(n);
		}
	}
	let v = g.slice(1).map((e, t) => {
		let n = g[t];
		return e.sym === n.sym ? Fx(e.position, n.position) : null;
	}), y = g.slice(1).map((e, t) => Mx(Fx(e.position, g[t].position))), b = (e, t) => {
		let n = /* @__PURE__ */ new Map(), r = Array(e.length);
		return e.forEach((e, i) => {
			let a = n.get(e.identity) ?? 0;
			n.set(e.identity, a + 1);
			let o = _.get(e.identity), s = d.get(e.identity).count;
			r[i] = t ? o + (s - 1 - a) : o + a;
		}), r;
	}, x = 0, S = u.map((e) => {
		let { input: t, row: n, groupBoundaries: i, descending: a } = e, o = b(i, a), s = o[0], c = o[i.length - 1], l = n.cells.map((e) => {
			let n = o[e.columnStart], i = o[e.columnStart + e.columnSpan];
			if (n == null || i == null) throw RangeError(`Table cell ${e.id} exceeds its authored grid`);
			let a = Math.min(n, i), s = Math.max(n, i);
			if (s <= a) throw Error(`Table cell ${e.id} cannot be mapped into the logical group grid`);
			let c = ZS(e.borders, t.bidiVisual, r);
			return Object.freeze({
				...e,
				columnStart: a,
				columnSpan: s - a,
				borders: c
			});
		});
		return Object.freeze({
			...n,
			logicalRowIndex: x++,
			exceptionBorders: null,
			sourceTableEdges: QS(t, n, r),
			indentPt: t.bidiVisual === r ? n.indentPt : -n.indentPt,
			sourceOuterColumnStart: Math.min(s, c),
			sourceOuterColumnEnd: Math.max(s, c),
			cells: Object.freeze(l)
		});
	});
	return i.nodes.length, Object.freeze({
		kind: "adjacent-table-group-grid",
		id: e,
		source: n.source,
		flowDomainId: `${n.flowDomainId}:adjacent-group:${e}`,
		alignment: n.alignment,
		indentPt: n.indentPt,
		bidiVisual: r,
		columnWidthsPt: Object.freeze(y),
		columnWidthKeys: Object.freeze(v),
		rows: Object.freeze(S)
	});
}
//#endregion
//#region packages/docx/src/layout/table-pagination.ts
var $ = 1e-4;
function cC() {
	return Object.freeze({
		blockIndex: 0,
		paragraphLineStart: 0,
		nestedCursor: null,
		nestedFragmentIndex: 0
	});
}
function lC() {
	return Object.freeze({
		rowIndex: 0,
		rowFragmentIndex: 0,
		cells: Object.freeze([])
	});
}
function uC(e) {
	let t = 0;
	for (; e.rows[t]?.repeatedHeader === !0;) t += 1;
	return t;
}
function dC(e, t) {
	let n = e.layout.rows[t];
	return n ? e.input.rows[t]?.heightRule === "exact" ? Math.max(0, n.heightPt) : Math.max(0, n.heightPt, n.contentHeightPt) : 0;
}
function fC(e, t, n, r) {
	let i = e.layout.rows.flatMap((e) => e.cells).find((e) => e.id === t.id);
	if (!i) throw new H("INVALID_REFERENCE", `nested table fragment lost parent cell geometry: ${t.id}`);
	let a = Object.freeze({
		xPt: 0,
		yPt: 0,
		widthPt: i.contentBounds.widthPt,
		heightPt: Math.max(0, r)
	});
	return Object.freeze({
		...n,
		availableHeightPt: a.heightPt,
		placement: Object.freeze({
			...n.placement,
			container: Object.freeze({
				...n.placement.container,
				bounds: a
			}),
			cursor: Object.freeze({
				xPt: 0,
				yPt: 0
			}),
			availableBounds: a
		})
	});
}
function pC(e, t, n, r) {
	if (t === e.input.rows[n]) return dC(e, n);
	let i = VS({
		...e.input,
		id: `${e.input.id}:row-occurrence:${r.page.occurrenceId}:${t.logicalRowIndex}`,
		rows: [t]
	}, r.placement, r.services).layout;
	return Math.max(0, i.rows[0]?.heightPt ?? i.advancePt);
}
function mC(e, t, n, r) {
	return t === e.input.rows[n] ? Math.max(0, e.layout.rows[n]?.heightPt ?? 0) : pC(e, t, n, r);
}
function hC(e, t, n) {
	let r = n;
	for (let i = n; i <= r && i < t.length; i += 1) {
		let a = i === n ? e.cells : t[i].cells;
		for (let e of a) e.verticalMerge === "restart" && (r = Math.max(r, yS(t, i, e.columnStart, e.columnSpan)));
	}
	return r;
}
function gC(e, t, n, r) {
	let i = e.input.rows, a = hC(t, i, n), o = Math.min(i.length, a + 2), s = VS({
		...e.input,
		id: `${e.input.id}:completed-partial:${r.page.occurrenceId}:${t.logicalRowIndex}`,
		rows: [t, ...i.slice(n + 1, o)]
	}, r.placement, r.services).layout;
	return Math.max(0, s.rows[0]?.heightPt ?? 0);
}
function _C(e) {
	return e.cells.map((e) => e.blocks.map((e) => ({
		kind: "whole",
		blockIndex: e.sourceBlockIndex
	})));
}
function vC(e, t, n, r) {
	let i = r.reacquirePageDependentBlock;
	return !i || !t.cells.some((e) => e.blocks.some((e) => e.pageDependent === !0)) ? t : {
		...t,
		cells: t.cells.map((e, a) => ({
			...e,
			blocks: e.blocks.map((e) => e.pageDependent === !0 ? {
				...e,
				layout: i({
					logicalRowIndex: t.logicalRowIndex,
					logicalCellIndex: a,
					sourceBlockIndex: e.sourceBlockIndex,
					ownership: n,
					page: r.page,
					acquired: e.layout
				})
			} : e)
		}))
	};
}
function yC(e) {
	let t = e.positioning.horzSpecified && (e.positioning.horzAnchor === "page" || e.positioning.horzAnchor === "margin"), n = e.positioning.vertAnchor === "page" || e.positioning.vertAnchor === "margin";
	return t || n;
}
function bC(e, t, n, r, i) {
	return {
		...t,
		heightPt: null,
		heightRule: "auto",
		cells: t.cells.map((t, a) => {
			let o = n.cells[a] ?? cC();
			return {
				...t,
				blocks: t.blocks.slice(o.blockIndex).map((n, a) => {
					if (a === 0 && o.nestedCursor && n.layout.kind === "table") {
						let a = e.nestedById[n.layout.id];
						if (a) {
							let s = NC(a, o.nestedCursor, fC(e, t, r, r.freshPageHeightPt)), c = i.get(t.id);
							if (s.nextCursor && c !== void 0 && n.sourceBlockIndex < c) throw Error("Floating table anchor cannot follow an incomplete nested-table candidate");
							if (s.fragment) return {
								...n,
								layout: s.fragment
							};
						}
					}
					return a !== 0 || o.paragraphLineStart === 0 || n.layout.kind !== "paragraph" ? n : {
						...n,
						layout: DC(n.layout, o.paragraphLineStart, n.layout.lines.length)
					};
				})
			};
		})
	};
}
function xC(e, t, n, r, i, a, o, s, c) {
	let l = i.floatingTableFrames, u = i.reacquirePageDependentBlock, d = e.input.rows[t.logicalRowIndex];
	if (!l || !u || !d) return {
		row: t,
		resolved: [],
		registry: a,
		nextParagraphId: o
	};
	let f = e.floatingTables.filter((e) => d.cells.some((t) => t.id === e.hostCellId) && c(e));
	if (f.length === 0) return {
		row: t,
		resolved: [],
		registry: a,
		nextParagraphId: o
	};
	let p = /* @__PURE__ */ new Map();
	for (let e of f) p.set(e.hostCellId, Math.min(p.get(e.hostCellId) ?? Infinity, e.anchorBlockIndex));
	let m = {
		...i.placement,
		cursor: {
			...i.placement.cursor,
			yPt: i.placement.cursor.yPt + r
		}
	}, h = bC(e, t, s, i, p), g = VS({
		...e.input,
		id: `${e.input.id}:float-probe:${i.page.occurrenceId}:${t.logicalRowIndex}`,
		rows: [h]
	}, m, i.services).layout, _ = i.finalPlacementTranslationPt ?? {
		xPt: 0,
		yPt: 0
	}, v = (t, r, a) => {
		let o = a.cells.findIndex((e) => e.id === t.hostCellId), s = r.rows[0]?.cells[o], c = a.cells[o]?.blocks.findIndex((e) => e.sourceBlockIndex === t.anchorBlockIndex) ?? -1, l = c < 0 ? void 0 : s?.blocks[c], u = e.nestedById[t.tableId]?.layout;
		return !s || !l || !u ? null : Object.freeze({
			kind: "floating-table-placement",
			occurrenceId: [
				i.page.occurrenceId,
				t.hostCellId,
				t.sourceBlockIndex,
				t.tableId
			].join(":"),
			ownership: n,
			physicalPageIndex: i.page.physicalPageIndex,
			displayPageNumber: i.page.displayPageNumber,
			...t,
			columnBounds: Object.freeze({
				xPt: s.contentBounds.xPt + _.xPt,
				yPt: s.contentBounds.yPt + _.yPt,
				widthPt: s.contentBounds.widthPt,
				heightPt: s.contentBounds.heightPt
			}),
			anchorBounds: Object.freeze({
				xPt: s.contentBounds.xPt + _.xPt,
				yPt: s.flowBounds.yPt + l.offsetPt + _.yPt,
				widthPt: l.layout.flowBounds.widthPt,
				heightPt: l.layout.flowBounds.heightPt
			}),
			child: u
		});
	}, y = (n) => {
		let r = bC(e, n, s, i, p), c = n === t ? g : VS({
			...e.input,
			id: `${e.input.id}:float-converge:${i.page.occurrenceId}:${t.logicalRowIndex}`,
			rows: [r]
		}, m, i.services).layout, u = ex(a, o, i.floatingTableRegistry?.coordinateSpace ?? "logical-page-points", i.floatingTableRegistry?.flowDomainId ?? e.input.flowDomainId), d = [];
		for (let e of f) {
			let t = v(e, c, r);
			if (!t || i.floatingTableRegistry?.coordinateSpace !== "upright-physical-page-points" && !yC(t)) continue;
			let n = tx(t, {
				page: l.page,
				margin: l.margin,
				text: {
					xPt: t.columnBounds?.xPt ?? t.anchorBounds.xPt,
					yPt: t.anchorBounds.yPt,
					widthPt: t.columnBounds?.widthPt ?? t.anchorBounds.widthPt,
					heightPt: t.anchorBounds.heightPt
				}
			}, u);
			d.push(n.placement), u = n.transaction;
		}
		return {
			resolved: Object.freeze(d),
			transaction: u
		};
	}, b = (e) => ({
		...t,
		cells: t.cells.map((r, a) => ({
			...r,
			blocks: r.blocks.map((o) => {
				let s = e.filter((e) => e.source.hostCellId === r.id && e.source.anchorBlockIndex === o.sourceBlockIndex).map((e) => Object.freeze({
					xPt: e.exclusionBounds.xPt - e.source.anchorBounds.xPt,
					yPt: e.exclusionBounds.yPt - e.source.anchorBounds.yPt,
					widthPt: e.exclusionBounds.widthPt,
					heightPt: e.exclusionBounds.heightPt
				}));
				return s.length === 0 || o.layout.kind !== "paragraph" ? o : {
					...o,
					layout: u({
						logicalRowIndex: t.logicalRowIndex,
						logicalCellIndex: a,
						sourceBlockIndex: o.sourceBlockIndex,
						ownership: n,
						page: i.page,
						acquired: o.layout,
						floatingTableExclusions: Object.freeze(s)
					})
				};
			})
		}))
	}), x = (e, t) => JSON.stringify({
		blocks: e.cells.map((e) => e.blocks.map((e) => ({
			sourceBlockIndex: e.sourceBlockIndex,
			layout: e.layout
		}))),
		placements: t
	}), S = y(t);
	if (S.resolved.length === 0) return {
		row: t,
		resolved: [],
		registry: a,
		nextParagraphId: o
	};
	try {
		let e = Bo({
			seedState: x(t, S.resolved),
			step: (e) => {
				let t = b(e?.resolution.resolved ?? S.resolved), n = y(t);
				return Object.freeze({
					candidate: t,
					resolution: n,
					state: x(t, n.resolved)
				});
			},
			stateOf: (e) => e.state,
			limit: 16
		}).value;
		return {
			row: e.candidate,
			resolved: e.resolution.resolved,
			registry: Object.freeze([...e.resolution.transaction.base, ...e.resolution.transaction.delta]),
			nextParagraphId: e.resolution.transaction.nextParagraphId
		};
	} catch (e) {
		throw e instanceof zo ? new H("NON_CONVERGENCE", `floating table final-frame reflow did not converge (${e.reason}; ${e.states.length} states)`) : e;
	}
}
function SC(e, t, n) {
	let r = e.input.rows[t.logicalRowIndex]?.cells.findIndex((e) => e.id === n.hostCellId) ?? -1;
	return r >= 0 && (t.ranges[r]?.some((e) => e.blockIndex === n.anchorBlockIndex && (e.kind === "whole" || e.kind === "paragraph" && e.lineStart === 0 || e.kind === "nested-table" && e.childFragmentIndex === 0)) ?? !1);
}
function CC(e) {
	return `${e.hostCellId}:${e.sourceBlockIndex}:${e.tableId}`;
}
function wC(e, t) {
	return new Set(e.floatingTables.filter((n) => SC(e, t, n)).map(CC));
}
function TC(e, t) {
	return e.size === t.size && [...e].every((e) => t.has(e));
}
function EC(e, t, n = 0, r = !1, i = []) {
	return {
		input: e,
		logicalRowIndex: e.logicalRowIndex,
		fragmentIndex: n,
		ownership: t,
		ranges: _C(e),
		...r ? { clipAtPageEnd: !0 } : {},
		...i.length ? { resolvedFloatingTables: i } : {}
	};
}
function DC(e, t, n) {
	return $v(e, {
		lineStart: t,
		lineEnd: n,
		continuesFromPrevious: t > 0,
		continuesOnNext: n < e.lines.length
	});
}
function OC(e, t, n, r, i, a, o) {
	let s = null, c = n;
	for (let a = n + 1; a <= e.lines.length; a += 1) {
		let o = DC(e, n, a), s = {
			...t,
			layout: o
		};
		if (hS([...r, s]) > i + $) break;
		c = a;
	}
	if (c === n) return {
		block: null,
		range: null,
		lineEnd: n,
		advancePt: 0
	};
	let l = n === 0 && (r.length > 0 || o);
	if (t.keepLines === !0 && c < e.lines.length && l && hS([{
		...t,
		layout: e
	}]) <= a + $) return {
		block: null,
		range: null,
		lineEnd: n,
		advancePt: 0
	};
	for (;;) {
		let r = ih({
			widowControl: t.widowControl === !0,
			start: n,
			end: c,
			totalLines: e.lines.length,
			canRelocate: l
		});
		if (r.kind === "relocate") return {
			block: null,
			range: null,
			lineEnd: n,
			advancePt: 0
		};
		if (r.kind !== "dropLastLine") break;
		--c;
	}
	return s = DC(e, n, c), {
		block: {
			...t,
			layout: s
		},
		range: {
			kind: "paragraph",
			blockIndex: t.sourceBlockIndex,
			lineStart: n,
			lineEnd: c
		},
		lineEnd: c,
		advancePt: s.advancePt
	};
}
function kC(e, t, n, r, i, a, o) {
	if (t.verticalMerge === "continue") return {
		input: t,
		range: [],
		next: n,
		complete: !0
	};
	let s = [], c = [], l = n.blockIndex, u = n.paragraphLineStart, d = n.nestedCursor, f = n.nestedFragmentIndex;
	for (; l < t.blocks.length;) {
		let n = t.blocks[l], p = n.layout;
		if (p.kind === "paragraph") {
			if (n.structuralTrailing) {
				s.push(n), c.push({
					kind: "whole",
					blockIndex: n.sourceBlockIndex
				}), l += 1, u = 0;
				continue;
			}
			if (p.lines.length === 0) {
				if (hS([...s, n]) > r + $) break;
				s.push(n), c.push({
					kind: "whole",
					blockIndex: n.sourceBlockIndex
				}), l += 1, u = 0;
				continue;
			}
			let e = OC(p, n, u, s, r, i, a);
			if (!e.block || !e.range) break;
			if (s.push({
				...e.block,
				...n.structuralTrailing ? { structuralTrailing: !0 } : {}
			}), c.push(e.range), e.lineEnd < p.lines.length) {
				u = e.lineEnd;
				break;
			}
			l += 1, u = 0;
			continue;
		}
		let m = e.nestedById[p.id];
		if (m) {
			let i = Math.max(0, r - hS(s)), a = NC(m, d ?? lC(), fC(e, t, o, i));
			if (!a.fragment) break;
			if (s.push({
				layout: a.fragment,
				sourceBlockIndex: n.sourceBlockIndex
			}), c.push({
				kind: "nested-table",
				blockIndex: n.sourceBlockIndex,
				childFragmentIndex: f
			}), a.nextCursor) {
				d = a.nextCursor, f += 1;
				break;
			}
			l += 1, d = null, f = 0;
			continue;
		}
		if (hS([...s, n]) > r + $) break;
		s.push(n), c.push({
			kind: "whole",
			blockIndex: n.sourceBlockIndex
		}), l += 1;
	}
	let p = l >= t.blocks.length;
	return {
		input: {
			...t,
			blocks: s
		},
		range: c,
		next: Object.freeze({
			blockIndex: l,
			paragraphLineStart: u,
			nestedCursor: d,
			nestedFragmentIndex: f
		}),
		complete: p
	};
}
function AC(e, t, n, r, i, a, o) {
	let s = t.cells.map((e, t) => n.cells[t] ?? cC()), c = Math.max(0, ...t.cells.map((e) => e.margins.topPt + e.margins.bottomPt)), l = Math.max(0, t.cellSpacingPt) * 2, u = {
		...t,
		heightPt: null,
		heightRule: "auto"
	}, d = jS({
		...e.input,
		rows: [u]
	})[0] ?? 0, f = Math.max(0, r - c - l - d), p = Math.max(0, i - c - l - d), m = t.cells.map((t, n) => kC(e, t, s[n], f, p, a, o)), h = (e, t) => e.next.blockIndex !== s[t]?.blockIndex || e.next.paragraphLineStart !== s[t]?.paragraphLineStart || e.next.nestedFragmentIndex !== s[t]?.nestedFragmentIndex, g = m.some((e, n) => !e.complete && !h(e, n) && t.cells[n]?.blocks[s[n]?.blockIndex ?? 0]?.layout.kind === "paragraph");
	if (ql({
		compatibility: o.compatibility,
		hasUnfinishedParagraphWithoutProgress: g
	}) || !m.some(h)) return {
		selected: null,
		next: n,
		complete: !1
	};
	let _ = m.every((e) => e.complete);
	return _ && n.rowFragmentIndex === 0 ? {
		selected: EC(t, "source"),
		next: Object.freeze({
			rowIndex: n.rowIndex + 1,
			rowFragmentIndex: 0,
			cells: Object.freeze([])
		}),
		complete: !0
	} : {
		selected: {
			input: {
				...u,
				id: `${t.id}:fragment:${n.rowFragmentIndex}`,
				heightPt: null,
				heightRule: "auto",
				cells: m.map((e, t) => ({
					...e.input,
					id: `${e.input.id}:fragment:${n.rowFragmentIndex}:${t}`
				}))
			},
			logicalRowIndex: t.logicalRowIndex,
			fragmentIndex: n.rowFragmentIndex,
			ownership: "source",
			ranges: m.map((e) => e.range)
		},
		next: Object.freeze({
			rowIndex: _ ? n.rowIndex + 1 : n.rowIndex,
			rowFragmentIndex: _ ? 0 : n.rowFragmentIndex + 1,
			cells: Object.freeze(_ ? [] : m.map((e) => e.next))
		}),
		complete: _
	};
}
function jC(e, t, n) {
	let r = VS({
		...e.input,
		id: `${e.input.id}:fragment:${n.page.occurrenceId}`,
		rows: t.map((e) => e.input)
	}, n.placement, n.services).layout, i = r.rows.map((e, r) => {
		let i = t[r];
		return Object.freeze({
			...e,
			logicalRowIndex: i.logicalRowIndex,
			fragmentIndex: i.fragmentIndex,
			ownership: i.ownership,
			occurrenceId: n.page.occurrenceId,
			physicalPageIndex: n.page.physicalPageIndex,
			displayPageNumber: n.page.displayPageNumber,
			cells: Object.freeze(e.cells.map((e, n) => {
				let a = i.input.cells[n]?.verticalMerge ?? "none", o = i.input.cells[n], s = a === "continue" && t.slice(0, r).some((e) => e.input.cells.some((e) => e.verticalMerge === "restart" && e.columnStart === o?.columnStart && e.columnSpan === o?.columnSpan));
				return Object.freeze({
					...e,
					contentRanges: Object.freeze([...i.ranges[n] ?? []]),
					...a === "continue" && !s ? { visualMergeOwnership: "continuation" } : {}
				});
			}))
		});
	}), a = t.flatMap((t, r) => {
		let a = e.input.rows[t.logicalRowIndex];
		return a ? e.floatingTables.flatMap((o) => {
			let s = a.cells.findIndex((e) => e.id === o.hostCellId);
			if (s < 0 || !(t.ranges[s]?.some((e) => e.blockIndex === o.anchorBlockIndex && (e.kind === "whole" || e.kind === "paragraph" && e.lineStart === 0)) ?? !1)) return [];
			let c = t.input.cells[s], l = i[r]?.cells[s], u = c?.blocks.findIndex((e) => e.sourceBlockIndex === o.anchorBlockIndex) ?? -1, d = u < 0 ? void 0 : l?.blocks[u], f = e.nestedById[o.tableId]?.layout;
			if (!l || !d || !f) throw Error("Floating table occurrence references missing retained layout data");
			let p = Object.freeze({
				xPt: l.contentBounds.xPt,
				yPt: l.flowBounds.yPt + d.offsetPt,
				widthPt: d.layout.flowBounds.widthPt,
				heightPt: d.layout.flowBounds.heightPt
			});
			return [Object.freeze({
				kind: "floating-table-placement",
				occurrenceId: [
					n.page.occurrenceId,
					o.hostCellId,
					o.sourceBlockIndex,
					o.tableId
				].join(":"),
				ownership: t.ownership,
				physicalPageIndex: n.page.physicalPageIndex,
				displayPageNumber: n.page.displayPageNumber,
				...o,
				anchorBounds: p,
				child: f
			})];
		}) : [];
	}), o = Object.freeze(t.flatMap((e) => e.resolvedFloatingTables ?? [])), s = new Set(o.map((e) => e.occurrenceId)), c = t.some((e) => e.clipAtPageEnd === !0), l = c ? Math.min(r.advancePt, n.availableHeightPt) : r.advancePt, u = c ? {
		...r.flowBounds,
		heightPt: l
	} : r.flowBounds;
	return Object.freeze({
		...r,
		flowBounds: u,
		...c ? {
			unpaintedOverflowPt: Math.max(0, r.advancePt - l),
			inkBounds: u,
			clipBounds: u,
			advancePt: l
		} : {},
		columnWidthsPt: e.layout.columnWidthsPt,
		rows: Object.freeze(i),
		floatingTables: Object.freeze(a.filter((e) => !s.has(e.occurrenceId))),
		resolvedFloatingTables: o,
		...n.floatingTableRegistry ? { resolvedFloatingTableCoordinateSpace: n.floatingTableRegistry.coordinateSpace } : {}
	});
}
function MC(e, t) {
	for (let n = 0; n < e.rows.length; n += 1) {
		let r = e.rows[n];
		for (let e of r.cells) for (let r of e.blocks) {
			let i = r.layout;
			if (i.kind === "paragraph") {
				for (let a of i.drawings) if (!(a.anchorLayer?.layoutInCell !== !0 || a.anchorLayer.cellContainment === !0 || a.anchorLayer.verticalOwnership !== "host" || a.orientation === "upright-physical") && e.contentBounds.yPt + r.offsetPt + a.flowBounds.yPt - i.flowBounds.yPt + a.flowBounds.heightPt > t + $) return n;
			}
		}
	}
	return -1;
}
function NC(e, t, n) {
	if (t.rowIndex >= e.input.rows.length) return {
		fragment: null,
		nextCursor: null,
		requiresFreshPage: !1
	};
	let r = [], i = n.floatingTableRegistry;
	if (i && i.flowDomainId.length === 0) throw Error("Floating table registry coordinate/domain mismatch");
	let a = Object.freeze([...i?.entries ?? []]), o = i?.nextParagraphId ?? 0, s = Math.max(0, n.availableHeightPt), c = uC(e.input);
	if (t.rowIndex >= c && t.rowIndex > 0 && c > 0) for (let i = 0; i < c; i += 1) {
		let c = xC(e, vC(e, e.input.rows[i], "repeated-header", n), "repeated-header", n.availableHeightPt - s, n, a, o, lC(), () => !0), l = c.row, u = pC(e, l, i, n);
		if (u > s + $) return {
			fragment: null,
			nextCursor: t,
			requiresFreshPage: !0
		};
		r.push(EC(l, "repeated-header", 0, !1, c.resolved)), a = c.registry, o = c.nextParagraphId, s -= u;
	}
	let l = n.availableHeightPt - s, u = Math.max(0, n.freshPageHeightPt - l), d = t, f = t.rowIndex, p = t.rowFragmentIndex === 0 && t.cells.length === 0 && e.layout.rows.slice(t.rowIndex).reduce((e, t) => e + Math.max(0, t.heightPt), 0) <= s + $, m = !1;
	for (; f < e.input.rows.length;) {
		let i = "source", c = vC(e, e.input.rows[f], i, n), l = f === t.rowIndex ? t : Object.freeze({
			rowIndex: f,
			rowFragmentIndex: 0,
			cells: Object.freeze([])
		}), h = f !== t.rowIndex || t.rowFragmentIndex === 0, g = h ? xC(e, c, i, n.availableHeightPt - s, n, a, o, l, (e) => {
			let t = c.cells.findIndex((t) => t.id === e.hostCellId), n = c.cells[t]?.blocks.findIndex((t) => t.sourceBlockIndex === e.anchorBlockIndex) ?? -1;
			if (n < 0) return !1;
			let r = l.cells[t] ?? cC();
			return r.blockIndex < n || r.blockIndex === n && r.paragraphLineStart === 0;
		}) : {
			row: c,
			resolved: Object.freeze([]),
			registry: a,
			nextParagraphId: o
		}, _ = g.row, v = p || m ? mC(e, _, f, n) : pC(e, _, f, n);
		if (h && v <= s + $) {
			r.push(EC(_, "source", 0, !1, g.resolved)), a = g.registry, o = g.nextParagraphId, s -= v, f += 1, d = f < e.input.rows.length ? Object.freeze({
				rowIndex: f,
				rowFragmentIndex: 0,
				cells: Object.freeze([])
			}) : null;
			continue;
		}
		if (_.cantSplit) {
			if (r.some((e) => e.ownership === "source")) break;
			if (v + (n.availableHeightPt - s) <= n.freshPageHeightPt + $ || n.availableHeightPt + $ < n.freshPageHeightPt) return {
				fragment: null,
				nextCursor: t,
				requiresFreshPage: !0
			};
			if (Gl({
				compatibility: n.compatibility,
				availableHeightPt: n.availableHeightPt,
				freshPageHeightPt: n.freshPageHeightPt,
				epsilonPt: $
			})) {
				r.push(EC(_, "source", 0, !0, g.resolved)), a = g.registry, o = g.nextParagraphId, d = f + 1 < e.input.rows.length ? Object.freeze({
					rowIndex: f + 1,
					rowFragmentIndex: 0,
					cells: Object.freeze([])
				}) : null;
				break;
			}
		}
		if (h && Kl({
			compatibility: n.compatibility,
			heightRule: _.heightRule,
			repeatedHeader: _.repeatedHeader,
			authoredHeightPt: _.heightPt,
			availableHeightPt: s,
			wholeHeightPt: v,
			freshAvailableHeightPt: u,
			epsilonPt: $
		})) {
			if (r.some((e) => e.ownership === "source")) break;
			return {
				fragment: null,
				nextCursor: t,
				requiresFreshPage: !0
			};
		}
		if (n.oversizedRowPolicy === "atomic" && r.every((e) => e.ownership === "repeated-header") && n.availableHeightPt + $ >= n.freshPageHeightPt && v > n.freshPageHeightPt + $) {
			r.push(EC(_, "source", 0, !1, g.resolved)), a = g.registry, o = g.nextParagraphId, d = f + 1 < e.input.rows.length ? Object.freeze({
				rowIndex: f + 1,
				rowFragmentIndex: 0,
				cells: Object.freeze([])
			}) : null;
			break;
		}
		let y = n.availableHeightPt + $ < n.freshPageHeightPt || r.some((e) => e.ownership === "source"), b = AC(e, c, l, s, u, y, n), x = null, S = /* @__PURE__ */ new Set();
		for (; b.selected;) {
			let t = wC(e, b.selected), r = JSON.stringify([...t].sort());
			if (S.has(r)) throw Error("Floating table selected ownership did not converge");
			S.add(r), x = xC(e, c, i, n.availableHeightPt - s, n, a, o, l, (e) => t.has(CC(e)));
			let d = AC(e, x.row, l, s, u, y, n);
			if (!d.selected) {
				b = d;
				break;
			}
			let f = wC(e, d.selected);
			if (b = d, TC(t, f)) break;
			x = null;
		}
		if (b.selected && x === null) throw Error("Floating table selected ownership did not converge");
		if (b.selected) {
			let t = x?.resolved ?? [];
			if (t.some((t) => !SC(e, b.selected, t.source))) throw Error("Floating table transaction included an unowned occurrence");
			let i = a.length, c = (x?.registry ?? a).slice(i);
			if (r.push({
				...b.selected,
				...t.length ? { resolvedFloatingTables: Object.freeze(t) } : {}
			}), a = Object.freeze([...a, ...c]), o += c.length, d = b.next.rowIndex >= e.input.rows.length ? null : b.next, b.complete && b.next.rowIndex < e.input.rows.length) {
				s = Math.max(0, s - gC(e, b.selected.input, f, n)), m = !0, f = b.next.rowIndex;
				continue;
			}
		}
		break;
	}
	if (r.filter((e) => e.ownership === "source").length === 0) {
		if (!(n.availableHeightPt + $ < n.freshPageHeightPt)) throw new H("NON_CONVERGENCE", "Table pagination cannot advance from a fresh page");
		return {
			fragment: null,
			nextCursor: t,
			requiresFreshPage: !0
		};
	}
	let h = jC(e, r, n), g = n.placement.cursor.yPt + n.availableHeightPt;
	for (; Rl({
		compatibility: n.compatibility,
		availableHeightPt: n.availableHeightPt,
		freshPageHeightPt: n.freshPageHeightPt,
		epsilonPt: $
	});) {
		let i = MC(h, g);
		if (i < 0) break;
		let a = r[i], o = a && e.input.rows[a.logicalRowIndex];
		if (a?.ownership !== "source" || a.fragmentIndex !== 0 || o?.heightRule !== "atLeast" || o.cantSplit) break;
		if (r.slice(0, i).every((e) => e.ownership !== "source")) return {
			fragment: null,
			nextCursor: t,
			requiresFreshPage: !0
		};
		r.splice(i), d = Object.freeze({
			rowIndex: a.logicalRowIndex,
			rowFragmentIndex: 0,
			cells: Object.freeze([])
		}), h = jC(e, r, n);
	}
	for (; h.advancePt > n.availableHeightPt + $;) {
		let t = r.at(-1), i = r.filter((e) => e.ownership === "source").length;
		if (!(t?.ownership === "source" && t.fragmentIndex === 0) || i <= 1) break;
		r.pop(), d = Object.freeze({
			rowIndex: t.logicalRowIndex,
			rowFragmentIndex: 0,
			cells: Object.freeze([])
		}), h = jC(e, r, n);
	}
	return h.advancePt > n.availableHeightPt + $ && n.availableHeightPt + $ < n.freshPageHeightPt && h.advancePt <= n.freshPageHeightPt + $ ? {
		fragment: null,
		nextCursor: t,
		requiresFreshPage: !0
	} : {
		fragment: h,
		nextCursor: d,
		requiresFreshPage: !1,
		floatingTablePlacements: h.resolvedFloatingTables,
		...i ? { floatingTableRegistryDelta: (() => {
			let e = a.slice(i.entries.length).filter((e) => h.resolvedFloatingTables.some((t) => t.occurrenceId === e.occurrenceId));
			return Qb(i, e, i.nextParagraphId + e.length);
		})() } : {}
	};
}
//#endregion
//#region packages/docx/src/layout/registered-paragraph-acquisition.ts
function PC(e, t, n, r) {
	let i = i_(e, n.flowDomainId), a = Rv(t, {
		...n,
		exclusions: Object.freeze([
			...n.exclusions,
			...i.exclusions,
			...r?.exclusions ?? []
		]),
		anchorCollisions: Object.freeze([
			...n.anchorCollisions ?? [],
			...i.collisions,
			...r?.collisions ?? []
		])
	});
	return a_(e, i, a.layout), a;
}
//#endregion
//#region packages/docx/src/layout/paragraph-float-authority.ts
function FC(e, t) {
	return e.flatMap((e, n) => e.kind === "shape" && e.anchorOccurrenceId && e.authoredWrap === void 0 ? [] : [{
		id: e.imageKey || `${t}:float:${n}`,
		wrap: e.authoredWrap ?? (e.mode === "topAndBottom" ? "topAndBottom" : "square"),
		wrapSide: so(e.side),
		bounds: {
			xPt: e.xLeft,
			yPt: e.yTop,
			widthPt: Math.max(0, e.xRight - e.xLeft),
			heightPt: Math.max(0, e.yBottom - e.yTop)
		},
		polygon: e.wrapPolygon ?? [
			{
				xPt: e.xLeft,
				yPt: e.yTop
			},
			{
				xPt: e.xRight,
				yPt: e.yTop
			},
			{
				xPt: e.xRight,
				yPt: e.yBottom
			},
			{
				xPt: e.xLeft,
				yPt: e.yBottom
			}
		],
		...e.kind === "table" && !e.anchorOccurrenceId ? { verticalOwnership: "page" } : {},
		...e.anchorOccurrenceId ? {
			anchorOccurrenceId: e.anchorOccurrenceId,
			verticalOwnership: "page"
		} : {}
	}]);
}
function IC(e) {
	return e.flatMap((e) => e.kind !== "shape" || !e.anchorOccurrenceId ? [] : [{
		occurrenceId: e.anchorOccurrenceId,
		bounds: {
			xPt: e.imageX,
			yPt: e.imageY,
			widthPt: e.imageW,
			heightPt: e.imageH
		},
		horizontalOwnership: "page",
		verticalOwnership: "page"
	}]);
}
//#endregion
//#region packages/docx/src/layout/drawingml-collision-registry.ts
function LC(e) {
	if (e.occurrenceId.length === 0) throw Error("DrawingML collision occurrence ID must not be empty");
	let { xPt: t, yPt: n, widthPt: r, heightPt: i } = e.bounds;
	if (![
		t,
		n,
		r,
		i
	].every(Number.isFinite) || r < 0 || i < 0) throw Error(`DrawingML collision bounds are invalid: ${e.occurrenceId}`);
	if (e.horizontalOwnership !== "page" && e.horizontalOwnership !== "host" || e.verticalOwnership !== "page" && e.verticalOwnership !== "host") throw Error(`DrawingML collision ownership is invalid: ${e.occurrenceId}`);
}
function RC(e) {
	return LC(e), Object.freeze({
		occurrenceId: e.occurrenceId,
		bounds: Object.freeze({ ...e.bounds }),
		horizontalOwnership: e.horizontalOwnership,
		verticalOwnership: e.verticalOwnership,
		...e.relativeHeight === void 0 ? {} : { relativeHeight: e.relativeHeight }
	});
}
function zC(e, t) {
	return Object.freeze({
		coordinateSpace: t,
		flowDomainId: e,
		entries: Object.freeze([])
	});
}
function BC(e, t) {
	return Object.freeze({
		coordinateSpace: e.coordinateSpace,
		flowDomainId: e.flowDomainId,
		baseEntries: e.entries,
		baseEntryCount: e.entries.length,
		entries: Object.freeze(t.map(RC))
	});
}
function VC(e, t) {
	if (t.coordinateSpace !== e.coordinateSpace) throw Error("DrawingML collision registry coordinate space mismatch");
	if (t.flowDomainId !== e.flowDomainId) throw Error("DrawingML collision registry flow domain mismatch");
	if (t.baseEntries !== e.entries || t.baseEntryCount !== e.entries.length) throw Error("DrawingML collision registry delta is stale");
	let n = new Set(e.entries.map((e) => e.occurrenceId));
	for (let e of t.entries) {
		if (LC(e), n.has(e.occurrenceId)) throw Error(`DrawingML collision occurrence committed twice: ${e.occurrenceId}`);
		n.add(e.occurrenceId);
	}
}
function HC(e, t) {
	return VC(e, t), Object.freeze({
		coordinateSpace: e.coordinateSpace,
		flowDomainId: e.flowDomainId,
		entries: Object.freeze([...e.entries, ...t.entries])
	});
}
//#endregion
//#region packages/docx/src/layout/anchor-classification.ts
function UC(e, t) {
	return Cg(e, t);
}
function WC(e) {
	return co(e.wrapMode) && UC(e.anchorYRelativeFrom ?? null, e.anchorYFromPara ?? !1);
}
//#endregion
//#region packages/docx/src/vertical-text.ts
function GC(e) {
	let t = ge(e);
	return t === "U" || t === "Tu" ? "upright" : t === "Tr" ? "rotate" : "sideways";
}
var KC = new Set([65294]);
function qC(e) {
	return KC.has(e) ? {
		dx: .4,
		dy: -.4
	} : {
		dx: 0,
		dy: 0
	};
}
function JC(e) {
	let t = [], n = "", r = null;
	for (let i of e) {
		let e = GC(i.codePointAt(0) ?? 0);
		r === null ? (r = e, n = i) : e === r ? n += i : (t.push({
			text: n,
			mode: r
		}), n = i, r = e);
	}
	return n !== "" && r !== null && t.push({
		text: n,
		mode: r
	}), t;
}
var YC = () => !1;
function XC(e, t, n) {
	let r = e.textBaseline;
	e.textBaseline = "alphabetic";
	let i = e.measureText(t);
	e.textBaseline = r;
	let a = i.fontBoundingBoxAscent, o = i.fontBoundingBoxDescent;
	return typeof a == "number" && typeof o == "number" && (a !== 0 || o !== 0) ? (a - o) / 2 : .38 * n;
}
function ZC(e, t) {
	let n = e.textAlign, r = e.textBaseline;
	e.textAlign = "center", e.textBaseline = "middle";
	let i = e.measureText(t);
	e.textAlign = n, e.textBaseline = r;
	let a = i.actualBoundingBoxAscent, o = i.actualBoundingBoxDescent;
	return typeof a == "number" && typeof o == "number" ? (a - o) / 2 : 0;
}
function QC(e) {
	return GC(e) === "rotate" && k(e) === null && !M(e);
}
function $C(e) {
	let t = ge(e);
	return t === "Tu" || t === "Tr";
}
function ew(e, t) {
	let n = e.textAlign, r = e.textBaseline;
	e.textAlign = "center", e.textBaseline = "middle";
	let i = e.measureText(t);
	e.textAlign = n, e.textBaseline = r;
	let a = i.actualBoundingBoxLeft, o = i.actualBoundingBoxRight;
	return typeof a != "number" || typeof o != "number" || !Number.isFinite(a) || !Number.isFinite(o) ? null : {
		extentPx: a + o,
		shiftPx: (a - o) / 2
	};
}
function tw(e, t, n, r, i, a, o) {
	let s = e.textAlign, c = e.textBaseline, l = () => (e.textAlign = n === "sideways" ? "left" : "center", e.textBaseline = n === "sideways" ? "alphabetic" : "middle", e.measureText(t)), u;
	try {
		u = o ? ce(e, l) : l();
	} finally {
		e.textAlign = s, e.textBaseline = c;
	}
	if (n === "upright") {
		if (!Number.isFinite(u.actualBoundingBoxLeft) || !Number.isFinite(u.actualBoundingBoxRight)) return;
		let e = u.actualBoundingBoxLeft, t = u.actualBoundingBoxRight, n = a === "vertical-rl" ? 1 : i, o = -(r.xPt - e) * n, s = -(r.xPt + t) * n;
		return Object.freeze({
			startPt: Math.min(o, s),
			endPt: Math.max(o, s)
		});
	}
	if (!Number.isFinite(u.actualBoundingBoxAscent) || !Number.isFinite(u.actualBoundingBoxDescent)) return;
	let d = u.actualBoundingBoxAscent, f = u.actualBoundingBoxDescent, p = r.yPt - d, m = r.yPt + f;
	return Object.freeze({
		startPt: Math.min(p, m),
		endPt: Math.max(p, m)
	});
}
function nw(e, t, n, r, i) {
	let a = e.measureText(t).width;
	if ($C(n) && r(n)) {
		let n = te(e, t);
		return {
			naturalPx: n.cellAdvancePx,
			vert: n,
			rotateInkShiftPx: 0
		};
	}
	if (i && QC(n)) {
		let n = ew(e, t);
		if (n !== null && n.extentPx > a) return {
			naturalPx: n.extentPx,
			vert: null,
			rotateInkShiftPx: n.shiftPx
		};
	}
	return {
		naturalPx: a,
		vert: null,
		rotateInkShiftPx: 0
	};
}
function rw(e, t, n, r, i = 1, a = !1, o = YC, s = "vertical-rl") {
	let c = [], l = XC(e, t, n), u = 0, d = 0;
	for (let f of JC(t)) {
		if (f.mode === "sideways") {
			let t = [...f.text].length, n = e.measureText(f.text).width * i + r * t, a = {
				xPt: 0,
				yPt: l
			}, o = tw(e, f.text, "sideways", a, i, s, !1);
			c.push({
				range: {
					start: d,
					end: d + f.text.length
				},
				text: f.text,
				orientation: "sideways",
				originPt: u,
				advancePt: n,
				drawOffsetPt: a,
				verticalFeature: !1,
				...o ? { blockAxisInkBounds: o } : {}
			}), u += n, d += f.text.length;
			continue;
		}
		for (let t of f.text) {
			let l = t.codePointAt(0) ?? 0, f = GC(l), p = f === "rotate" ? k(l) : null, m = f === "rotate" && p === null && M(l), h = nw(e, t, l, o, a), g = h.naturalPx * i + r, _ = {
				start: d,
				end: d + t.length
			};
			if (h.vert !== null) {
				let n = {
					xPt: 0,
					yPt: 0
				}, r = tw(e, t, "upright", n, i, s, !0);
				c.push({
					range: _,
					text: t,
					orientation: "upright",
					originPt: u + h.vert.originInCellPx * i,
					advancePt: g,
					drawOffsetPt: n,
					verticalFeature: !0,
					...r ? { blockAxisInkBounds: r } : {}
				});
			} else if (f === "upright" || p !== null || m) {
				let r = p === null ? I(l) : null, a = p ?? r, o = a === null ? t : String.fromCodePoint(a), d = a === null ? qC(l) : {
					dx: 0,
					dy: 0
				}, f = Ps(r), m = d.dy === 0 && !f ? ZC(e, o) / n : 0, h = {
					xPt: d.dx * n,
					yPt: (m + d.dy) * n
				}, v = tw(e, o, "upright", h, i, s, !1);
				c.push({
					range: _,
					text: o,
					orientation: "upright",
					originPt: u + g / 2,
					advancePt: g,
					drawOffsetPt: h,
					verticalFeature: !1,
					...v ? { blockAxisInkBounds: v } : {}
				});
			} else {
				let n = {
					xPt: 0,
					yPt: 0
				}, r = tw(e, t, "rotate", n, i, s, !1);
				c.push({
					range: _,
					text: t,
					orientation: "rotate",
					originPt: u + g / 2 + i * h.rotateInkShiftPx,
					advancePt: g,
					drawOffsetPt: n,
					verticalFeature: !1,
					...r ? { blockAxisInkBounds: r } : {}
				});
			}
			u += g, d += t.length;
		}
	}
	return c;
}
function iw(e, t, n) {
	let r = 0;
	for (let i of JC(t)) {
		if (i.mode === "sideways") {
			r += e.measureText(i.text).width;
			continue;
		}
		for (let t of i.text) {
			let i = nw(e, t, t.codePointAt(0) ?? 0, n, !0);
			r += i.naturalPx;
		}
	}
	return r - e.measureText(t).width;
}
function aw(e, t) {
	return iw(e, t, (t) => E(e, t));
}
function ow(e, t, n, r, i) {
	return {
		x: t,
		y: i - (e + n),
		w: r,
		h: n
	};
}
//#endregion
//#region packages/docx/src/layout/production-body-layout.ts
function sw(e, t, n, r) {
	bu(e.blocks.body);
	let i = e.acquisition, a = i.acquisitionInputs, o = i.effectiveTablePositioning, s = i.publicAnchorBridge, c = Js(e.fonts.familyClasses, e.fonts.familyPitches), l = (e, t, n) => `${e}${t ? `|clr:${t}` : ""}${n ? `|duo:${n.clr1}:${n.clr2}` : ""}`;
	function u(e, t, n, r, i = !1) {
		let a = i ? 0 : cu(t.borders, n);
		return a === 0 ? {
			context: e,
			suppressSpaceBefore: r
		} : {
			context: {
				...e,
				spaceBeforePt: (r ? 0 : e.spaceBeforePt) + a
			},
			suppressSpaceBefore: !1
		};
	}
	function d(e, t, n = {}, r, i = {}, o, c) {
		let l = Mu(r, t), d = o;
		return {
			ctx: e,
			verticalGlyphMeasurement: Dr(d),
			acquisitionInputs: a,
			contentX: t.marginLeft,
			contentW: t.pageWidth - t.marginLeft - t.marginRight,
			y: 0,
			pageH: t.pageHeight,
			pageIndex: 0,
			totalPages: Rr(d).totalPages,
			marginLeft: t.marginLeft,
			marginRight: t.marginRight,
			marginTop: Wu(t.marginTop),
			marginBottom: Wu(t.marginBottom),
			pageWidth: t.pageWidth,
			floats: [],
			floatParaSeq: 0,
			layoutSettings: r,
			sectionLayout: l,
			storyContext: mx,
			docEastAsian: r.documentHasEastAsianText,
			fontFamilyClasses: n,
			resolvedLocalFonts: i,
			layoutServices: d,
			retainedTableAcquisition: {
				layoutServices: (e) => e.layoutServices,
				tableFormat: a.tableFormatInput,
				resolveColumns: h,
				createCellState: (e, t, n) => ({
					...yx(e),
					contentX: 0,
					contentW: t,
					y: 0,
					containerShading: n.background ?? e.containerShading,
					floats: [],
					floatParaSeq: 0,
					pageAnchorPrescanned: /* @__PURE__ */ new Set()
				}),
				acquireParagraph: (e, t, n, r, i, a, o, c) => {
					let l = c ?? {
						story: "body",
						storyInstance: "body",
						path: [...r]
					}, d = t.runs.filter((e, t) => s(l, t) !== null);
					d.length > 0 && D({
						...t,
						runs: d
					}, e, e.y);
					let f = vx(e, t), p = u(f, t, a?.top ?? "top", !0), m = PC(e, e.acquisitionInputs.paragraphAcquisitionInput(t, l), {
						id: `${l.story}:${l.storyInstance}:${l.path.join(".")}`,
						source: l,
						flowDomainId: i,
						ordinaryFlow: !0,
						context: p.context,
						placement: {
							startYPt: e.y,
							paragraphXPt: 0,
							availableWidthPt: n,
							maximumYPt: e.pageH,
							suppressSpaceBefore: p.suppressSpaceBefore
						},
						measurer: {
							context: e.ctx,
							fontFamilyClasses: e.fontFamilyClasses
						},
						environment: fx(e),
						exclusions: FC(e.floats, i),
						anchorCollisions: IC(e.floats),
						anchorCellBounds: {
							xPt: 0,
							yPt: 0,
							widthPt: n,
							heightPt: e.pageH
						},
						containerShading: e.containerShading,
						...a ? { paragraphBorderEdges: a } : {},
						trailingExtentPt: Math.max(f.spaceAfterPt, a?.bottom === "none" ? 0 : su(t.borders)),
						continuesFromPrevious: !1,
						anchorFrames: hx(e),
						acquireCompleteStory: e.acquireCompleteTextBoxStory
					}, o).layout;
					return t.spaceBefore === 0 ? m : Object.freeze({
						...m,
						flowBounds: Object.freeze({
							...m.flowBounds,
							heightPt: m.flowBounds.heightPt + t.spaceBefore
						}),
						advancePt: m.advancePt + t.spaceBefore,
						spacing: Object.freeze({
							...m.spacing,
							beforePt: (m.spacing?.beforePt ?? 0) + t.spaceBefore
						})
					});
				},
				registerFloatingTable: (e, t) => {
					let n = !t.positioning.horzSpecified || t.positioning.horzAnchor !== "page" && t.positioning.horzAnchor !== "margin", r = t.positioning.vertAnchor !== "page" && t.positioning.vertAnchor !== "margin";
					if (!n || !r) return null;
					let i = e.pageH, a = {
						xPt: e.contentX,
						yPt: e.y,
						widthPt: e.contentW,
						heightPt: t.child.advancePt
					}, o = Yb(t.positioning, {
						page: {
							xPt: 0,
							yPt: 0,
							widthPt: e.pageWidth,
							heightPt: i
						},
						margin: {
							xPt: e.marginLeft,
							yPt: e.marginTop,
							widthPt: Math.max(0, e.pageWidth - e.marginLeft - e.marginRight),
							heightPt: Math.max(0, i - e.marginTop - e.marginBottom)
						},
						text: a
					}, t.child.columnWidthsPt.reduce((e, t) => e + t, 0), t.child.advancePt), s = Ub(e, {
						x: o.x,
						y: o.y,
						w: o.w,
						h: o.h,
						dl: t.positioning.leftFromTextPt,
						dr: t.positioning.rightFromTextPt,
						dt: t.positioning.topFromTextPt,
						db: t.positioning.bottomFromTextPt,
						kind: "table",
						mode: "square",
						side: "bothSides",
						imageKey: "",
						paraId: e.floatParaSeq++,
						avoidOverlap: !0,
						tableOverlap: t.overlap
					});
					return Object.freeze({
						xPt: s.imageX - a.xPt,
						yPt: s.imageY - a.yPt
					});
				},
				advanceState: (e, t) => {
					e.y += t;
				}
			},
			retainedTablesBySourceIndex: /* @__PURE__ */ new Map(),
			currentDateMs: c?.currentDateMs,
			showTrackedChanges: c?.showTrackedChanges,
			kinsoku: r.kinsoku,
			defaultTabPt: r.defaultTabPt,
			get verticalCJK() {
				return sx(this.sectionLayout.textDirection);
			},
			get verticalAllRotated() {
				return sx(this.sectionLayout.textDirection) && cx(this.sectionLayout.textDirection);
			},
			verticalPhys: ox(t) ? (() => {
				let e = ux(t);
				return {
					pageWidth: e.pageWidth,
					pageHeight: e.pageHeight,
					marginLeft: e.marginLeft,
					marginRight: e.marginRight,
					marginTop: Wu(e.marginTop),
					marginBottom: Wu(e.marginBottom),
					physicalPageWidthPt: e.pageWidth
				};
			})() : void 0
		};
	}
	function f(e, t, n) {
		let r = (e) => {
			let t = Object.freeze({
				top: null,
				right: null,
				bottom: null,
				left: null,
				insideH: null,
				insideV: null
			});
			return Object.freeze({
				kind: "table",
				id: e.id,
				source: e.source,
				flowDomainId: e.flowDomainId,
				ordinaryFlow: !0,
				alignment: e.alignment,
				indentPt: e.indentPt,
				bidiVisual: e.bidiVisual,
				columnWidthsPt: e.columnWidthsPt,
				columnWidthKeys: e.columnWidthKeys,
				borders: t,
				rows: Object.freeze(e.rows.map((e) => Object.freeze({
					...e,
					exceptionBorders: e.sourceTableEdges
				})))
			});
		}, i = (t) => {
			if (t.story !== "body" || t.storyInstance !== "body" || t.path.length !== 1) throw Error("Body acquisition requires a top-level body source");
			let n = e.blocks.resolve(t);
			if (!n || n.type !== "paragraph" && n.type !== "table") throw Error(`Body source does not identify a flow block: ${t.path.join(".")}`);
			return n;
		}, a = (t) => e.blocks.resolve(t), l = (e, t, n, r, i, a, o = Object.freeze({ boundary: null }), s) => {
			let c = Su(t) ?? {
				top: "top",
				bottom: "bottom"
			}, l = _x(e, t), d = u(l, t, c.top, a, o.boundary !== null);
			return Rv(t, {
				id: `${n.story}:${n.storyInstance}:${n.path.join(".")}`,
				source: n,
				flowDomainId: r.flowDomainId,
				ordinaryFlow: !0,
				context: d.context,
				placement: {
					startYPt: e.y,
					paragraphXPt: r.availableBounds.xPt,
					availableWidthPt: i,
					maximumYPt: e.pageH,
					suppressSpaceBefore: d.suppressSpaceBefore
				},
				measurer: {
					context: e.ctx,
					fontFamilyClasses: e.fontFamilyClasses
				},
				environment: fx(e),
				exclusions: FC(e.floats, r.flowDomainId),
				anchorCollisions: s ?? IC(e.floats),
				containerShading: e.containerShading,
				paragraphBorderEdges: c,
				trailingExtentPt: Math.max(l.spaceAfterPt, c.bottom === "none" ? 0 : su(t.borders)),
				continuesFromPrevious: o.boundary !== null,
				...o.sourceRangeStart === void 0 ? {} : { sourceRangeStart: o.sourceRangeStart },
				anchorFrames: hx(e),
				acquireCompleteStory: e.acquireCompleteTextBoxStory
			}, o.boundary === null ? void 0 : {
				boundary: o.boundary,
				...o.uniformRubyAdvancePt === void 0 ? {} : { uniformRubyAdvancePt: o.uniformRubyAdvancePt }
			});
		};
		return Object.freeze({ openBodyLayoutSession(f, p, v) {
			if (!t) throw Error("Body layout acquisition requires a measurement context");
			let y = {
				...e.section,
				...f.section.geometry,
				textDirection: f.section.textDirection,
				vAlign: f.section.verticalAlignment
			}, b = d(t, sx(y.textDirection) ? lx(y) : y, c, e.documentLayoutSettings, n, p, v);
			v.showTrackedChanges === !0 && (b.revisionAuthorColor = vy(e.blocks.body));
			let x = e.blocks.footnotes, S = e.blocks.endnotes, C = ry(x);
			b.noteNumbers = new Map([...[...ny(x, iy(e.blocks.body, "footnote"))].map(([e, t]) => [`footnote:${e}`, t]), ...[...ny(S, iy(e.blocks.body, "endnote"))].map(([e, t]) => [`endnote:${e}`, t])]);
			let w = f.initialLocation, T = (e) => `body:page:${e}:registry`, E = Object.freeze({
				coordinateSpace: "logical-page-points",
				flowDomainId: T(w.pageIndex),
				entries: Object.freeze([]),
				nextParagraphId: 0
			}), k = zC(T(w.pageIndex), "logical-page-points"), A = (e, t) => {
				let n = t.section.geometry;
				e.sectionLayout = t.section, e.pageIndex = t.pageIndex;
				let r = Rr(p).resolveDestinationPage?.(t.pageIndex);
				e.displayPageNumber = r?.displayPageNumber ?? t.pageIndex + 1, e.pageNumberFormat = r?.pageNumberFormat ?? e.pageNumberFormat, e.pageWidth = n.pageWidth, e.pageH = n.pageHeight, e.marginLeft = n.marginLeft, e.marginRight = n.marginRight, e.marginTop = Wu(n.marginTop), e.marginBottom = Wu(n.marginBottom), e.contentX = t.availableBounds.xPt, e.contentW = t.availableBounds.widthPt, e.y = t.cursorPt.yPt;
			}, j = (e) => {
				w = e, A(b, e);
			};
			j(w);
			let M = (e, t, n, r, i = E.nextParagraphId) => {
				let a = new Set(E.entries.map((e) => e.occurrenceId)), o = e.runs.flatMap((i, o) => {
					if (i.type !== "shape" && i.type !== "image" && i.type !== "chart") return [];
					let c = s(t, o);
					return !c || r && !r.has(c.occurrenceId) || a.has(c.occurrenceId) || c.pageOwned && n.pageAnchorPrescanned?.has(e) ? [] : [{
						run: i,
						occurrenceId: c.occurrenceId
					}];
				});
				if (o.length === 0) return Object.freeze([]);
				let c = n.floats.length;
				D({
					...e,
					runs: o.map(({ run: e }) => e)
				}, n, n.y);
				let l = n.floats.slice(c);
				if (l.length !== o.length) throw Error("Public paragraph anchor acquisition did not retain every wrap float");
				return Object.freeze(l.map((e, t) => {
					let n = o[t].occurrenceId;
					return Object.freeze({
						kind: "shape",
						occurrenceId: n,
						exclusionId: n,
						paragraphId: i,
						bounds: Object.freeze({
							xPt: e.imageX,
							yPt: e.imageY,
							widthPt: e.imageW,
							heightPt: e.imageH
						}),
						exclusionBounds: Object.freeze({
							xPt: e.xLeft,
							yPt: e.yTop,
							widthPt: e.xRight - e.xLeft,
							heightPt: e.yBottom - e.yTop
						}),
						wrap: o[t].run.wrapMode,
						wrapSide: e.side,
						wrapDistances: Object.freeze({
							topPt: e.distTop,
							rightPt: e.distRight,
							bottomPt: e.distBottom,
							leftPt: e.distLeft
						}),
						...e.wrapPolygon ? { wrapPolygon: Object.freeze([...e.wrapPolygon]) } : {}
					});
				}));
			}, N = (e) => {
				let t = new Map((e.anchorFrames ?? []).flatMap((e) => {
					if (e.status !== "resolved") return [];
					let t = (e) => e.status === "resolved" && (e.referenceFrame === "paragraph" || e.referenceFrame === "line" || e.referenceFrame === "character");
					return t(e.axes.horizontal) || t(e.axes.vertical) ? [[e.occurrenceId, e]] : [];
				}));
				if (t.size === 0) return Object.freeze([]);
				let n = new Map(e.exclusions.flatMap((e) => e.anchorOccurrenceId ? [[e.anchorOccurrenceId, e]] : []));
				return Object.freeze((e.anchorCollisions ?? []).flatMap((e) => {
					let r = t.get(e.occurrenceId);
					if (!r || r.geometry.wrap.kind === "none") return [];
					let i = n.get(e.occurrenceId);
					if (!i) throw Error(`Wrapped anchor omitted exclusion geometry: ${e.occurrenceId}`);
					return [Object.freeze({
						kind: "shape",
						occurrenceId: e.occurrenceId,
						exclusionId: e.occurrenceId,
						paragraphId: E.nextParagraphId,
						bounds: e.bounds,
						exclusionBounds: i.bounds,
						horizontalOwnership: e.horizontalOwnership,
						verticalOwnership: e.verticalOwnership,
						wrap: r.geometry.wrap.kind,
						wrapSide: r.geometry.wrap.side,
						wrapDistances: r.geometry.wrap.distances,
						...r.geometry.wrap.polygon ? { wrapPolygon: r.geometry.wrap.polygon.points } : {}
					})];
				}));
			}, P = (e) => {
				if (e.acquired.kind !== "paragraph") return e.acquired;
				let t = a(e.acquired.source);
				if (t.type !== "paragraph") throw Error("Table paragraph re-acquisition source kind mismatch");
				let n = {
					...yx(b),
					contentX: 0,
					contentW: e.acquired.flowBounds.widthPt,
					y: e.acquired.flowBounds.yPt,
					floats: (e.floatingTableExclusions ?? []).map((e, t) => ({
						kind: "table",
						tableOverlap: "never",
						mode: "square",
						imageKey: `${Qg}${t}`,
						imageX: e.xPt,
						imageY: e.yPt,
						imageW: e.widthPt,
						imageH: e.heightPt,
						xLeft: e.xPt,
						xRight: e.xPt + e.widthPt,
						yTop: e.yPt,
						yBottom: e.yPt + e.heightPt,
						side: "bothSides",
						distLeft: 0,
						distRight: 0,
						distTop: 0,
						distBottom: 0,
						paraId: t
					})),
					floatParaSeq: e.floatingTableExclusions?.length ?? 0,
					pageAnchorPrescanned: /* @__PURE__ */ new Set()
				}, r = $g(e.acquired);
				return b.retainedTableAcquisition.acquireParagraph(n, t, e.acquired.flowBounds.widthPt, e.acquired.source.path, e.acquired.flowDomainId, void 0, r);
			}, ee = ry(e.blocks.endnotes), te = /* @__PURE__ */ new Map(), F = (t) => {
				if (t.path.length !== 0) throw Error("Story acquisition requires a story-root source");
				return e.blocks.storyRoot(t);
			}, ne = (t) => {
				if (t.path.length === 0 || (t.path.length - 1) % 3 != 0) throw Error("Story block acquisition requires a canonical source path");
				return e.blocks.resolve(t);
			}, re = (e) => {
				let t = JSON.stringify({
					source: e.source,
					pageIndex: e.pageIndex,
					section: e.section,
					container: e.container
				}), n = te.get(t);
				if (n) return n;
				let r = F(e.source), i = e.source.story === "footnote" || e.source.story === "endnote" ? b.noteNumbers?.get(`${e.source.story}:${e.source.storyInstance}`) : void 0, a = Rr(p), o = a.resolveDestinationPage?.(e.pageIndex), c = sx(e.section.textDirection), l = {
					...b,
					sectionLayout: e.section,
					pageIndex: e.pageIndex,
					totalPages: a.totalPages,
					displayPageNumber: o?.displayPageNumber ?? e.pageIndex + 1,
					pageNumberFormat: o?.pageNumberFormat ?? b.pageNumberFormat,
					pageWidth: e.section.geometry.pageWidth,
					pageH: e.container.capacity === "unbounded" ? 2 ** 53 - 1 : e.section.geometry.pageHeight,
					marginLeft: e.section.geometry.marginLeft,
					marginRight: e.section.geometry.marginRight,
					marginTop: Wu(e.section.geometry.marginTop),
					marginBottom: Wu(e.section.geometry.marginBottom),
					contentX: e.container.bounds.xPt,
					contentW: e.container.bounds.widthPt,
					y: e.container.bounds.yPt,
					floats: [],
					floatParaSeq: 0,
					retainedTablesBySourceIndex: /* @__PURE__ */ new Map(),
					pageAnchorPrescanned: /* @__PURE__ */ new Set(),
					noteReferenceNumber: i,
					verticalCJK: c,
					verticalAllRotated: c && cx(e.section.textDirection),
					...c ? {} : { verticalPhys: void 0 },
					storyContext: {
						story: e.source.story,
						containers: [],
						lineNumberingEligible: !1
					}
				};
				O(r, 0, l);
				let d = Pr(p);
				l.layoutServices = d;
				let f = r.flatMap((t, n) => {
					let r = {
						story: e.source.story,
						storyInstance: e.source.storyInstance,
						path: [n]
					};
					if (t.type === "unsupportedTextBoxBlock") return [{
						type: "unsupportedTextBoxBlock",
						qName: t.qName,
						sourcePath: t.sourcePath
					}];
					if (t.type === "paragraph") return [{
						kind: "paragraph",
						source: r
					}];
					if (t.type !== "table") throw Error(`Unsupported ${e.source.story} story block: ${t.type}`);
					let i = l.retainedTableAcquisition, a = t;
					return [XS(a, h(a, e.container.bounds.widthPt, l), e.container.bounds.widthPt, l, r, i).input];
				}), m = null;
				Fy(d, {
					layoutParagraph(e, t) {
						let n = ne(e.source);
						if (n.type !== "paragraph") throw Error("Story paragraph source kind mismatch");
						let i = e.source.path[0], a = i > 0 ? r[i - 1] : void 0, o = a?.type === "paragraph" ? a : null, c = r[i + 1], d = c?.type === "paragraph" ? c : null, f = m?.spaceAfter ?? 0, p = Kg(m, n, f, n.spaceBefore), h = Math.max(t.container.bounds.yPt, t.cursor.yPt - p.overlap);
						l.y = h, l.contentX = t.container.bounds.xPt, l.contentW = t.container.bounds.widthPt;
						let g = n.runs.filter((t, n) => s(e.source, n) !== null);
						g.length > 0 && D(Object.freeze({
							...n,
							runs: Object.freeze(g)
						}), l, l.y);
						let _ = vx(l, n), v = mu(o, n, d), y = u(_, n, v.top, p.suppressBefore), b = PC(l, n, {
							id: `${e.source.story}:${e.source.storyInstance}:${e.source.path.join(".")}`,
							source: e.source,
							flowDomainId: t.container.id,
							ordinaryFlow: !0,
							context: y.context,
							placement: {
								startYPt: h,
								paragraphXPt: t.container.bounds.xPt,
								availableWidthPt: t.container.bounds.widthPt,
								maximumYPt: t.availableBounds.yPt + t.availableBounds.heightPt,
								suppressSpaceBefore: y.suppressSpaceBefore
							},
							measurer: {
								context: l.ctx,
								fontFamilyClasses: l.fontFamilyClasses
							},
							environment: fx(l),
							exclusions: FC(l.floats, t.container.id),
							anchorCollisions: IC(l.floats),
							containerShading: l.containerShading,
							paragraphBorderEdges: v,
							trailingExtentPt: Math.max(_.spaceAfterPt, v.bottom === "none" ? 0 : su(n.borders)),
							continuesFromPrevious: !1,
							anchorFrames: hx(l),
							acquireCompleteStory: l.acquireCompleteTextBoxStory
						});
						m = n;
						let x = {
							xPt: t.cursor.xPt,
							yPt: h + b.layout.advancePt
						};
						return l.y = x.yPt, {
							layout: b.layout,
							nextCursor: x
						};
					},
					layoutTable(e, t) {
						m = null;
						let n = VS({
							...e,
							flowDomainId: t.container.id
						}, t, d);
						return l.y = n.nextCursor.yPt, n;
					}
				});
				let g = Ry({
					source: e.source,
					container: e.container,
					blocks: Object.freeze(f)
				}, d), _ = Object.freeze({
					...g,
					blocks: Object.freeze(g.blocks.map((t, n) => {
						if (t.kind !== "paragraph" && t.kind !== "table") throw Error(`Shared story emitted unsupported node: ${t.kind}`);
						return Bm(t, {
							occurrenceId: `${e.container.id}:block:${n}`,
							destination: {
								coordinateSpace: "logical-page-points",
								flowDomainId: e.container.id,
								translation: {
									xPt: 0,
									yPt: 0
								}
							}
						});
					}))
				});
				return te.set(t, _), _;
			};
			b.acquireCompleteTextBoxStory = (e) => {
				let t = e.coordinateSpace === "upright-physical" ? {
					...b.sectionLayout,
					geometry: Ku(b.sectionLayout.geometry),
					textDirection: "lrTb"
				} : b.sectionLayout;
				return re({
					source: e.source,
					pageIndex: b.pageIndex,
					section: t,
					container: e.container
				});
			};
			let ie = {
				hasPaginationFields: e.hasPaginationFields,
				measureParagraph(t) {
					j(t.location);
					let n = i(t.input.source);
					if (n.type !== "paragraph") throw Error("Paragraph source kind mismatch");
					if (n.framePr) {
						if (t.continuation.boundary !== null) throw Error("Body frame acquisition cannot continue across flow regions");
						let r, i = xu(n);
						if (!i) throw Error("Body frame acquisition requires an indexed adjacency group");
						let a = _(n, i, b, g(e.blocks.body, n, b), (e) => {
							r = e;
						});
						if (!r) throw Error("Body frame acquisition omitted its retained group");
						let o = r.members.find((e) => e.paragraph === n);
						if (!o) throw Error("Body frame acquisition omitted its retained member");
						let s = n === i.members.at(-1) && i.framePr.dropCap !== "none" ? ah(Bv(r)) : 0, c = n.framePr.vAnchor === "page" || n.framePr.vAnchor === "margin", l = a.exclusionId ?? `frame:${t.input.source.path.join(":")}`, u = Object.freeze({
							kind: "frame",
							occurrenceId: l,
							exclusionId: l,
							paragraphId: E.nextParagraphId,
							bounds: Object.freeze({
								xPt: a.x,
								yPt: a.y,
								widthPt: a.w,
								heightPt: a.h
							}),
							exclusionBounds: Object.freeze({
								xPt: a.exLeft,
								yPt: a.exTop,
								widthPt: a.exRight - a.exLeft,
								heightPt: a.exBottom - a.exTop
							})
						});
						return Object.freeze({
							layout: o.fragment,
							blockExtentPt: s,
							fragmentation: Object.freeze({ kind: "indivisible" }),
							placement: Object.freeze({
								coordinateSpace: "logical-body",
								xPt: o.fragment.flowBounds.xPt,
								yPt: o.fragment.flowBounds.yPt,
								sectionFlowOwnership: c ? "page" : "host-flow"
							}),
							...n === i.owner ? { retainedFootnoteReferenceIds: Object.freeze([...new Set(r.members.flatMap((e) => ly(e.fragment)))]) } : {},
							...c ? {} : { relocationBlockExtentPt: Math.max(0, a.y + a.h - t.location.cursorPt.yPt) },
							...a.registerExclusion === !1 ? {} : { flowRegistryDelta: Object.freeze({ floats: Qb(E, Object.freeze([u]), E.nextParagraphId + 1) }) }
						});
					}
					let r = {
						...b,
						floats: [...b.floats],
						pageAnchorPrescanned: new Set(b.pageAnchorPrescanned)
					};
					A(r, t.location);
					let a = t.continuation.boundary === null ? M(n, t.input.source, r) : Object.freeze([]), { measured: o, layout: s } = l(r, n, t.input.source, t.location, t.availableInlineExtentPt, t.suppressSpaceBefore, t.continuation, k.entries), c = o.markOnly && _x(r, n).lineGrid.active, u = o.lines.map((e) => {
						let t = e.layout.consumedEnd;
						if (!t) throw Error("Measured line omitted its source boundary");
						return t;
					}), d = N(s), f = Object.freeze([...a, ...d]), p = t_(s);
					return Object.freeze({
						layout: s,
						blockExtentPt: s.advancePt,
						fragmentation: o.markOnly ? Object.freeze({ kind: "indivisible" }) : Object.freeze({
							kind: "splittable",
							lineEndBoundaries: Object.freeze(u)
						}),
						...o.markOnly ? {
							markBelowBaselinePt: o.lastLineBelowBaselinePt,
							markOnLineGrid: c
						} : {},
						...o.uniformRubyAdvancePt == null ? {} : { uniformRubyAdvancePt: o.uniformRubyAdvancePt },
						...f.length === 0 && p.length === 0 ? {} : { flowRegistryDelta: Object.freeze({
							...f.length === 0 ? {} : { floats: Qb(E, f, E.nextParagraphId + f.length) },
							...p.length === 0 ? {} : { drawingCollisions: BC(k, p) }
						}) }
					});
				},
				measureTable(e) {
					if (j(e.location), e.input.kind === "adjacent-table-group") {
						if (e.cursor && e.cursor.kind !== "adjacent-table-group") throw Error("Adjacent table group acquisition received an ordinary table cursor");
						let t = e.input.tables.map((t) => {
							let n = i(t.source);
							if (n.type !== "table") throw Error("Table source kind mismatch");
							let r = t.source.path[0];
							return m(b, n, e.availableInlineExtentPt, r), bx(b, r).acquisition;
						}), n = r(sC(e.input.logicalSequenceId, t.map((e) => e.input))), a = {
							container: {
								id: e.location.flowDomainId,
								kind: "body",
								bounds: {
									xPt: 0,
									yPt: 0,
									widthPt: e.availableInlineExtentPt,
									heightPt: e.freshPageBlockExtentPt
								}
							},
							cursor: {
								xPt: 0,
								yPt: 0
							},
							availableBounds: {
								xPt: 0,
								yPt: 0,
								widthPt: e.availableInlineExtentPt,
								heightPt: e.freshPageBlockExtentPt
							}
						}, o = VS(n, a, p).layout, s = {};
						t.forEach((e) => Object.entries(e.nestedById).forEach(([e, t]) => {
							if (s[e] && s[e] !== t) throw Error(`Adjacent table group has duplicate nested table id: ${e}`);
							s[e] = t;
						}));
						let c = Object.freeze({
							input: n,
							layout: o,
							nestedById: Object.freeze(s),
							floatingTables: Object.freeze(t.flatMap((e) => e.floatingTables))
						}), l = e.cursor?.cursor ?? Object.freeze({
							tableIndex: 0,
							sourceRowIndex: 0
						}), u = e.input.tables.slice(0, l.tableIndex).reduce((e, t) => e + (t.rowCount ?? 0), 0) + l.sourceRowIndex, d = l.tableCursor ?? Object.freeze({
							...lC(),
							rowIndex: u
						});
						if (d.rowIndex !== u) throw Error("Adjacent-table group and table-fragment cursors disagree");
						let f = NC(c, d, {
							availableHeightPt: e.availableBlockExtentPt,
							freshPageHeightPt: e.freshPageBlockExtentPt,
							placement: a,
							services: p,
							compatibility: "word",
							page: {
								physicalPageIndex: e.location.pageIndex,
								displayPageNumber: e.location.pageIndex + 1,
								occurrenceId: `${n.id}:body:${e.location.pageIndex}`
							}
						});
						if (!f.fragment || f.requiresFreshPage) return Object.freeze({
							layout: c.layout,
							blockExtentPt: 0,
							nextCursor: Object.freeze({
								kind: "adjacent-table-group",
								cursor: l
							}),
							requiresFreshFlowRegion: !0
						});
						let h = f.nextCursor ? (() => {
							let t = 0, n = 0;
							for (; t < e.input.tables.length;) {
								let r = e.input.tables[t].rowCount ?? 0;
								if (f.nextCursor.rowIndex < n + r) break;
								n += r, t += 1;
							}
							return t >= e.input.tables.length ? null : Object.freeze({
								tableIndex: t,
								sourceRowIndex: f.nextCursor.rowIndex - n,
								tableCursor: f.nextCursor
							});
						})() : null;
						return Object.freeze({
							layout: f.fragment,
							blockExtentPt: f.fragment.advancePt,
							...f.fragment.unpaintedOverflowPt === void 0 ? {} : { unpaintedOverflowPt: f.fragment.unpaintedOverflowPt },
							nextCursor: h ? Object.freeze({
								kind: "adjacent-table-group",
								cursor: h
							}) : null,
							...f.floatingTableRegistryDelta ? { flowRegistryDelta: Object.freeze({ floats: f.floatingTableRegistryDelta }) } : {}
						});
					}
					let t = i(e.input.source);
					if (t.type !== "table") throw Error("Table source kind mismatch");
					let n = e.input.source.path[0];
					m(b, t, e.availableInlineExtentPt, n);
					let a = bx(b, n).acquisition;
					if (e.cursor && e.cursor.kind !== "table") throw Error("Ordinary table acquisition received an adjacent-group cursor");
					let s = e.cursor?.cursor ?? lC(), c = b.pageH, l = b.acquisitionInputs.tableFormatInput(t).positioning;
					if (l) {
						let n = e.cursor?.kind === "table" && e.cursor.floatingContinuationFrame === "fresh-text" ? Object.freeze({
							...l,
							vertAnchor: "text",
							yPt: 0,
							yAlign: void 0
						}) : l, r = a.layout.columnWidthsPt.reduce((e, t) => e + t, 0), i = Object.freeze({
							page: Object.freeze({
								xPt: 0,
								yPt: 0,
								widthPt: b.pageWidth,
								heightPt: c
							}),
							margin: Object.freeze({
								xPt: b.marginLeft,
								yPt: b.marginTop,
								widthPt: Math.max(0, b.pageWidth - b.marginLeft - b.marginRight),
								heightPt: Math.max(0, c - b.marginTop - b.marginBottom)
							}),
							text: Object.freeze({
								xPt: e.location.cursorPt.xPt,
								yPt: e.location.cursorPt.yPt,
								widthPt: e.availableInlineExtentPt,
								heightPt: a.layout.advancePt
							})
						}), o = Yb(n, i, r, a.layout.advancePt), u = ot(e.input.source, e.location.pageIndex, s.rowIndex, s.rowFragmentIndex), d = (n.vertAnchor === "page" || n.vertAnchor === "margin") && E.entries.some((e) => e.occurrenceId === u) ? Object.freeze({
							...E,
							entries: Object.freeze(E.entries.filter((e) => e.occurrenceId !== u))
						}) : E;
						if (e.cursor?.kind !== "table" && (n.vertAnchor === "page" || n.vertAnchor === "margin") && to({
							bounds: {
								xPt: o.x,
								yPt: o.y,
								widthPt: o.w,
								heightPt: o.h
							},
							blockers: E.entries.filter((e) => e.occurrenceId !== u).map(Ka),
							overlapEpsilonPt: .01
						}).defer) return Object.freeze({
							layout: a.layout,
							blockExtentPt: 0,
							nextCursor: Object.freeze({
								kind: "table",
								cursor: s,
								floatingContinuationFrame: "authored"
							}),
							requiresFreshFlowRegion: !0
						});
						let f = (n.vertAnchor === "page" || n.vertAnchor === "margin") && a.layout.advancePt > e.freshPageBlockExtentPt, m = f ? e.location.availableBounds.yPt + e.location.availableBounds.heightPt : n.vertAnchor === "page" ? i.page.yPt + i.page.heightPt : n.vertAnchor === "margin" ? i.margin.yPt + i.margin.heightPt : e.location.availableBounds.yPt + e.location.availableBounds.heightPt, h = f ? e.freshPageBlockExtentPt : n.vertAnchor === "page" ? i.page.heightPt : n.vertAnchor === "margin" ? i.margin.heightPt : e.freshPageBlockExtentPt, g;
						try {
							g = Bo({
								step: (r) => {
									if (r?.kind === "fresh-flow-region" || r?.kind === "candidate" && r.resolved.placement.xPt === r.parentFrame.xPt && r.resolved.placement.yPt === r.parentFrame.yPt) return r;
									let c = r?.resolved.placement ?? {
										xPt: o.x,
										yPt: o.y
									}, l = Math.max(0, m - c.yPt), u = NC(a, s, {
										availableHeightPt: l,
										freshPageHeightPt: h,
										placement: {
											container: {
												id: `${e.location.flowDomainId}:floating-table`,
												kind: "body",
												bounds: {
													xPt: 0,
													yPt: 0,
													widthPt: e.availableInlineExtentPt,
													heightPt: l
												}
											},
											cursor: {
												xPt: 0,
												yPt: 0
											},
											availableBounds: {
												xPt: 0,
												yPt: 0,
												widthPt: e.availableInlineExtentPt,
												heightPt: l
											}
										},
										services: p,
										compatibility: "word",
										oversizedRowPolicy: "atomic",
										page: {
											physicalPageIndex: e.location.pageIndex,
											displayPageNumber: b.displayPageNumber ?? e.location.pageIndex + 1,
											occurrenceId: `${a.input.id}:fitting-outer:${e.location.pageIndex}:${s.rowIndex}:${s.rowFragmentIndex}`
										},
										floatingTableFrames: {
											page: i.page,
											margin: i.margin,
											column: i.text
										},
										floatingTableRegistry: d,
										finalPlacementTranslationPt: c,
										reacquirePageDependentBlock: P
									});
									if (!u.fragment || u.requiresFreshPage) return Object.freeze({
										kind: "fresh-flow-region",
										result: u
									});
									let f = Object.freeze({
										kind: "floating-table-placement",
										occurrenceId: ot(e.input.source, e.location.pageIndex, s.rowIndex, s.rowFragmentIndex),
										ownership: "source",
										physicalPageIndex: e.location.pageIndex,
										displayPageNumber: b.displayPageNumber ?? e.location.pageIndex + 1,
										hostCellId: e.location.flowDomainId,
										sourceBlockIndex: e.input.source.path[0],
										anchorBlockIndex: e.input.source.path[0],
										tableId: u.fragment.id,
										overlap: t.overlap === "never" ? "never" : "overlap",
										positioning: n,
										anchorBounds: i.text,
										child: u.fragment
									}), g = u.floatingTableRegistryDelta?.entries ?? [], _ = u.floatingTableRegistryDelta?.nextParagraphId ?? E.nextParagraphId, v = tx(f, i, ex(E.entries, _, E.coordinateSpace, E.flowDomainId)), y = JSON.stringify({
										parentFrame: {
											xPt: v.placement.xPt,
											yPt: v.placement.yPt
										},
										fragment: u.fragment,
										nestedEntries: g,
										resolvedBounds: v.placement.bounds
									});
									return Object.freeze({
										kind: "candidate",
										parentFrame: Object.freeze({
											xPt: c.xPt,
											yPt: c.yPt
										}),
										result: u,
										fragment: u.fragment,
										resolved: v,
										nestedEntries: g,
										fingerprint: y
									});
								},
								stateOf: (e) => e.kind === "fresh-flow-region" ? "fresh-flow-region" : e.fingerprint,
								limit: 16
							}).value;
						} catch (e) {
							throw e instanceof zo ? new H("NON_CONVERGENCE", e.reason === "cycle" ? "Floating table parent/child transaction repeated an exact-state cycle" : "Floating table parent/child transaction reached the operational pass limit 16") : e;
						}
						if (g.kind === "fresh-flow-region") return Object.freeze({
							layout: a.layout,
							blockExtentPt: 0,
							nextCursor: Object.freeze({
								kind: "table",
								cursor: s,
								floatingContinuationFrame: "fresh-text"
							}),
							requiresFreshFlowRegion: !0
						});
						let { result: _, fragment: v, resolved: y, nestedEntries: x } = g, S = e.cursor?.kind === "table" && e.cursor.floatingContinuationFrame !== void 0, C = e.location.availableBounds.yPt + e.location.availableBounds.heightPt, w = [...v.resolvedFloatingTables ?? [], y.placement].filter((e) => e.source.positioning.vertAnchor === "text");
						return !S && w.some((e) => e.exclusionBounds.yPt + e.exclusionBounds.heightPt > C) ? Object.freeze({
							layout: v,
							blockExtentPt: 0,
							nextCursor: Object.freeze({
								kind: "table",
								cursor: s,
								floatingContinuationFrame: "fresh-text"
							}),
							requiresFreshFlowRegion: !0
						}) : Object.freeze({
							layout: v,
							blockExtentPt: 0,
							nextCursor: _.nextCursor ? Object.freeze({
								kind: "table",
								cursor: _.nextCursor,
								floatingContinuationFrame: "fresh-text"
							}) : null,
							flowRegistryDelta: Object.freeze({ floats: Qb(E, Object.freeze([...x, ...y.transaction.delta]), y.transaction.nextParagraphId) }),
							placement: Object.freeze({
								coordinateSpace: "logical-body",
								xPt: y.placement.xPt,
								yPt: y.placement.yPt,
								sectionFlowOwnership: n.vertAnchor === "page" || n.vertAnchor === "margin" ? "page" : "host-flow"
							})
						});
					}
					if (b.verticalPhys && !o(t)) {
						if (e.cursor) throw Error("An upright physical table must remain atomic");
						let t = b.verticalPhys, n = a.layout.columnWidthsPt.reduce((e, t) => e + t, 0);
						if (n > e.availableBlockExtentPt && e.availableBlockExtentPt < e.freshPageBlockExtentPt) return Object.freeze({
							layout: a.layout,
							blockExtentPt: 0,
							nextCursor: Object.freeze({
								kind: "table",
								cursor: s
							}),
							requiresFreshFlowRegion: !0
						});
						let r = t.physicalPageWidthPt - e.location.cursorPt.yPt - n, i = e.location.cursorPt.xPt, o = Math.max(a.layout.advancePt, t.pageHeight - t.marginTop - t.marginBottom), c = `upright-physical-page:${e.location.pageIndex}`, l = NC(a, lC(), {
							availableHeightPt: o,
							freshPageHeightPt: o,
							placement: {
								container: {
									id: c,
									kind: "body",
									bounds: {
										xPt: 0,
										yPt: 0,
										widthPt: n,
										heightPt: o
									}
								},
								cursor: {
									xPt: 0,
									yPt: 0
								},
								availableBounds: {
									xPt: 0,
									yPt: 0,
									widthPt: n,
									heightPt: o
								}
							},
							services: p,
							compatibility: "word",
							oversizedRowPolicy: "atomic",
							page: {
								physicalPageIndex: e.location.pageIndex,
								displayPageNumber: b.displayPageNumber ?? e.location.pageIndex + 1,
								occurrenceId: `${a.input.id}:upright-page:${e.location.pageIndex}`
							},
							floatingTableFrames: {
								page: {
									xPt: 0,
									yPt: 0,
									widthPt: t.pageWidth,
									heightPt: t.pageHeight
								},
								margin: {
									xPt: t.marginLeft,
									yPt: t.marginTop,
									widthPt: Math.max(0, t.pageWidth - t.marginLeft - t.marginRight),
									heightPt: Math.max(0, t.pageHeight - t.marginTop - t.marginBottom)
								},
								column: {
									xPt: t.marginLeft,
									yPt: t.marginTop,
									widthPt: Math.max(0, t.pageWidth - t.marginLeft - t.marginRight),
									heightPt: Math.max(0, t.pageHeight - t.marginTop - t.marginBottom)
								}
							},
							floatingTableRegistry: Object.freeze({
								coordinateSpace: "upright-physical-page-points",
								flowDomainId: c,
								entries: Object.freeze([]),
								nextParagraphId: 0
							}),
							finalPlacementTranslationPt: {
								xPt: r,
								yPt: i
							},
							reacquirePageDependentBlock: P
						});
						if (!l.fragment || l.nextCursor || l.requiresFreshPage) throw Error("Upright table final-frame layout must remain atomic");
						return Object.freeze({
							layout: l.fragment,
							blockExtentPt: n,
							nextCursor: null,
							placement: Object.freeze({
								coordinateSpace: "upright-physical",
								xPt: r + l.fragment.flowBounds.xPt,
								yPt: i + l.fragment.flowBounds.yPt,
								sectionFlowOwnership: "host-flow"
							})
						});
					}
					let u = NC(a, s, {
						availableHeightPt: e.availableBlockExtentPt,
						freshPageHeightPt: e.freshPageBlockExtentPt,
						placement: {
							container: {
								id: e.location.flowDomainId,
								kind: "body",
								bounds: {
									xPt: 0,
									yPt: 0,
									widthPt: e.availableInlineExtentPt,
									heightPt: e.availableBlockExtentPt
								}
							},
							cursor: {
								xPt: 0,
								yPt: 0
							},
							availableBounds: {
								xPt: 0,
								yPt: 0,
								widthPt: e.availableInlineExtentPt,
								heightPt: e.availableBlockExtentPt
							}
						},
						services: p,
						compatibility: "word",
						page: {
							physicalPageIndex: e.location.pageIndex,
							displayPageNumber: e.location.pageIndex + 1,
							occurrenceId: `${a.input.id}:body:${e.location.pageIndex}`
						},
						floatingTableFrames: {
							page: {
								xPt: 0,
								yPt: 0,
								widthPt: b.pageWidth,
								heightPt: c
							},
							margin: {
								xPt: b.marginLeft,
								yPt: b.marginTop,
								widthPt: Math.max(0, b.pageWidth - b.marginLeft - b.marginRight),
								heightPt: Math.max(0, c - b.marginTop - b.marginBottom)
							},
							column: e.location.availableBounds
						},
						floatingTableRegistry: E,
						finalPlacementTranslationPt: {
							xPt: e.location.availableBounds.xPt,
							yPt: e.location.cursorPt.yPt
						},
						reacquirePageDependentBlock: P
					}), d = e.location.availableBounds.xPt + a.layout.flowBounds.xPt, f = d + a.layout.flowBounds.widthPt, h = u.fragment?.advancePt ?? 0, g = eo({
						inlineStartPt: d,
						inlineEndPt: f,
						blockStartPt: e.location.cursorPt.yPt,
						blockExtentPt: h,
						blockers: E.entries.map(Ka),
						overlapEpsilonPt: Ha
					}).blockStartPt;
					return g > e.location.cursorPt.yPt ? Object.freeze({
						layout: a.layout,
						blockExtentPt: 0,
						nextCursor: e.cursor ?? null,
						retryAtBlockStartPt: g
					}) : !u.fragment || u.requiresFreshPage ? Object.freeze({
						layout: a.layout,
						blockExtentPt: 0,
						nextCursor: Object.freeze({
							kind: "table",
							cursor: s
						}),
						requiresFreshFlowRegion: !0
					}) : Object.freeze({
						layout: u.fragment,
						blockExtentPt: u.fragment.advancePt,
						...u.fragment.unpaintedOverflowPt === void 0 ? {} : { unpaintedOverflowPt: u.fragment.unpaintedOverflowPt },
						nextCursor: u.nextCursor ? Object.freeze({
							kind: "table",
							cursor: u.nextCursor
						}) : null,
						...u.floatingTableRegistryDelta ? { flowRegistryDelta: Object.freeze({ floats: u.floatingTableRegistryDelta }) } : {}
					});
				},
				layoutStory: re,
				layoutNotes(e) {
					let t = [], n = e.container.bounds.yPt, r = e.firstOnPage;
					for (let i of e.referenceIds) {
						if (!(e.kind === "footnote" ? C : ee).has(i)) continue;
						let a = {
							story: e.kind,
							storyInstance: i,
							path: []
						}, o = r ? 6 : 0, s = {
							...e.container,
							id: `${e.container.id}:${e.kind}:${i}`,
							bounds: {
								...e.container.bounds,
								yPt: n + o,
								heightPt: Math.max(0, e.container.bounds.yPt + e.container.bounds.heightPt - n - o)
							}
						}, c;
						try {
							c = re({
								source: a,
								pageIndex: e.pageIndex,
								section: e.section,
								container: s
							});
						} catch (t) {
							throw t instanceof Ay && t.containerId === s.id ? new cm(e.kind, e.pageIndex, e.container.id) : t;
						}
						let l = Object.freeze(r ? [Object.freeze({
							edge: "top",
							from: Object.freeze({
								xPt: e.container.bounds.xPt,
								yPt: n + o / 2
							}),
							to: Object.freeze({
								xPt: e.container.bounds.xPt + e.container.bounds.widthPt / 3,
								yPt: n + o / 2
							}),
							color: "#000000",
							widthPt: .5,
							authoredStyle: "single",
							style: "solid"
						})] : []), u = o + c.advancePt, d = Object.freeze({
							xPt: e.container.bounds.xPt,
							yPt: n,
							widthPt: e.container.bounds.widthPt,
							heightPt: u
						}), f = Object.freeze({
							kind: "note",
							id: `${e.kind}:${i}:page:${e.pageIndex}`,
							source: a,
							flowDomainId: e.container.id,
							ordinaryFlow: !0,
							flowBounds: d,
							inkBounds: Object.freeze({
								xPt: Math.min(d.xPt, c.inkBounds.xPt),
								yPt: Math.min(d.yPt, c.inkBounds.yPt),
								widthPt: Math.max(d.xPt + d.widthPt, c.inkBounds.xPt + c.inkBounds.widthPt) - Math.min(d.xPt, c.inkBounds.xPt),
								heightPt: Math.max(d.yPt + d.heightPt, c.inkBounds.yPt + c.inkBounds.heightPt) - Math.min(d.yPt, c.inkBounds.yPt)
							}),
							clipBounds: e.container.bounds,
							advancePt: u,
							separator: l,
							story: c
						});
						t.push(f), n += u, r = !1;
					}
					return Object.freeze(t);
				},
				measureFollowingBlock(e) {
					let t = {
						...b,
						floats: [...b.floats],
						retainedTablesBySourceIndex: new Map(b.retainedTablesBySourceIndex)
					};
					if (A(t, e.location), e.input.kind === "adjacent-table-group") {
						let n = e.input.tables.map((n) => {
							let r = i(n.source);
							if (r.type !== "table") throw Error("Following table source kind mismatch");
							let a = n.source.path[0];
							return m(t, r, e.availableInlineExtentPt, a), bx(t, a).acquisition;
						}), a = VS(r(sC(e.input.logicalSequenceId, n.map((e) => e.input))), {
							container: {
								id: e.location.flowDomainId,
								kind: "body",
								bounds: e.location.availableBounds
							},
							cursor: e.location.cursorPt,
							availableBounds: e.location.availableBounds
						}, p).layout;
						return Object.freeze({
							fullExtentPt: a.advancePt,
							leadContentExtentPt: a.rows[0]?.advancePt ?? a.advancePt,
							fullFootnoteReferenceIds: ly(a),
							leadFootnoteReferenceIds: ly({
								...a,
								rows: a.rows.slice(0, 1)
							})
						});
					}
					let n = i(e.input.source);
					if (e.input.kind === "paragraph") {
						if (n.type !== "paragraph") throw Error("Following paragraph source kind mismatch");
						let { layout: r } = l(t, n, e.input.source, e.location, e.availableInlineExtentPt, !1, void 0, k.entries), i = r.lines[0];
						return Object.freeze({
							fullExtentPt: r.advancePt,
							leadContentExtentPt: i ? i.bounds.yPt + i.advancePt - r.flowBounds.yPt : r.advancePt,
							fullFootnoteReferenceIds: ly(r),
							leadFootnoteReferenceIds: i ? cy([i]) : []
						});
					}
					if (n.type !== "table") throw Error("Following table source kind mismatch");
					let a = e.input.source.path[0];
					m(t, n, e.availableInlineExtentPt, a);
					let o = bx(t, a).acquisition.layout;
					return Object.freeze({
						fullExtentPt: o.advancePt,
						leadContentExtentPt: o.rows[0]?.advancePt ?? o.advancePt,
						fullFootnoteReferenceIds: ly(o),
						leadFootnoteReferenceIds: ly({
							...o,
							rows: o.rows.slice(0, 1)
						})
					});
				},
				prescanPageAnchors(e) {
					let t = e.location.section.geometry, n = Wu(t.marginTop), r = Wu(t.marginBottom), a = Object.freeze({
						page: Object.freeze({
							xPt: 0,
							yPt: 0,
							widthPt: t.pageWidth,
							heightPt: t.pageHeight
						}),
						margin: Object.freeze({
							xPt: t.marginLeft,
							yPt: n,
							widthPt: Math.max(0, t.pageWidth - t.marginLeft - t.marginRight),
							heightPt: Math.max(0, t.pageHeight - n - r)
						}),
						column: Object.freeze({
							xPt: e.location.availableBounds.xPt,
							yPt: n,
							widthPt: e.availableInlineExtentPt,
							heightPt: Math.max(0, t.pageHeight - n - r)
						}),
						paragraph: null,
						line: null,
						character: null,
						pageParity: e.location.pageIndex % 2 == 0 ? "odd" : "even"
					}), o = /* @__PURE__ */ new Set(), c = (e) => `${e.story}:${e.storyInstance}:${e.path.join(".")}`, l = /* @__PURE__ */ new Map(), u = (e) => {
						let t = c(e);
						return l.has(t) || l.set(t, E.nextParagraphId + l.size), l.get(t);
					}, d = e.anchors.flatMap((t) => {
						if (t.kind === "floating-table") {
							let e = i(t.tableSource);
							if (e.type !== "table") throw Error("Page-positioned table prescan source kind mismatch");
							let n = b.acquisitionInputs.tableFormatInput(e).positioning;
							if (!n || n.vertAnchor !== "page" && n.vertAnchor !== "margin") throw Error("Page-positioned table prescan requires a page-owned vertical axis");
							let { bounds: r } = t;
							return [Object.freeze({
								kind: "table",
								occurrenceId: t.occurrenceId,
								overlap: e.overlap === "never" ? "never" : "overlap",
								paragraphId: u(t.tableSource),
								bounds: r,
								exclusionBounds: Object.freeze({
									xPt: r.xPt - n.leftFromTextPt,
									yPt: r.yPt - n.topFromTextPt,
									widthPt: r.widthPt + n.leftFromTextPt + n.rightFromTextPt,
									heightPt: r.heightPt + n.topFromTextPt + n.bottomFromTextPt
								})
							})];
						}
						let n = i(t.paragraphSource);
						if (n.type !== "paragraph") throw Error("Page-anchor prescan source kind mismatch");
						let r = n, c = r.runs.filter((e) => e.type === "anchorHost" && e.anchorOccurrenceId === t.occurrenceId), l = r.runs.map((e, t) => ({
							run: e,
							runIndex: t
						})).filter((e) => (e.run.type === "image" || e.run.type === "chart" || e.run.type === "shape" || e.run.type === "unavailableDrawing") && e.run.anchorAcquisitionInput?.occurrenceId === t.occurrenceId).sort((e, t) => (e.run.anchorAcquisitionInput.group?.sourceIndex ?? 0) - (t.run.anchorAcquisitionInput.group?.sourceIndex ?? 0) || e.runIndex - t.runIndex);
						if (c.length !== 1 || l.length === 0) {
							let r = n.runs.find((e, n) => s(t.paragraphSource, n)?.occurrenceId === t.occurrenceId);
							if (r) {
								if ((r.type === "image" || r.type === "chart" || r.type === "shape") && r.wrapMode === "none") return [];
								let i = {
									...b,
									floats: [...b.floats],
									pageAnchorPrescanned: new Set(b.pageAnchorPrescanned)
								};
								A(i, e.location);
								let a = M(n, t.paragraphSource, i, new Set([t.occurrenceId]), u(t.paragraphSource));
								if (a.length !== 1) throw Error(`Public page-anchor prescan occurrence mismatch: ${t.occurrenceId}`);
								return o.add(n), a;
							}
							throw Error(`Page-anchor prescan occurrence acquisition mismatch: ${t.occurrenceId}`);
						}
						let d = Wg({
							acquisition: l[0].run.anchorAcquisitionInput,
							frames: a
						});
						if (d.status !== "resolved") throw Error(`Page-anchor prescan could not resolve occurrence: ${t.occurrenceId}`);
						let f = sx(e.location.section.textDirection) ? (() => {
							let t = mi(e.location.section.textDirection);
							return mv(d, Si(t, bi({
								widthPt: a.page.widthPt,
								heightPt: a.page.heightPt
							}, t)));
						})() : d, p = f.geometry.wrapBounds;
						if (p === null || f.geometry.wrap.kind === "none") return [];
						let m = f.geometry.wrap.polygon?.points ?? Object.freeze([
							Object.freeze({
								xPt: p.xPt,
								yPt: p.yPt
							}),
							Object.freeze({
								xPt: p.xPt + p.widthPt,
								yPt: p.yPt
							}),
							Object.freeze({
								xPt: p.xPt + p.widthPt,
								yPt: p.yPt + p.heightPt
							}),
							Object.freeze({
								xPt: p.xPt,
								yPt: p.yPt + p.heightPt
							})
						]);
						return [Object.freeze({
							kind: "shape",
							occurrenceId: t.occurrenceId,
							paragraphId: u(t.paragraphSource),
							bounds: f.geometry.objectFrame,
							exclusionBounds: p,
							wrap: f.geometry.wrap.kind,
							wrapSide: f.geometry.wrap.side,
							wrapDistances: f.geometry.wrap.distances,
							wrapPolygon: Object.freeze([...m])
						})];
					});
					return o.forEach((e) => b.pageAnchorPrescanned?.add(e)), d.length === 0 ? null : Object.freeze({ floats: Object.freeze({
						coordinateSpace: "logical-page-points",
						flowDomainId: E.flowDomainId,
						baseEntries: E.entries,
						baseNextParagraphId: E.nextParagraphId,
						nextParagraphId: E.nextParagraphId + d.length,
						entries: Object.freeze(d)
					}) });
				},
				measureLineNumberGlyph(n) {
					let r = t.font;
					try {
						let r = e.fonts.defaultBodyFontSizePt, i = Zs(!1, !1, r, null, {});
						t.font = i;
						let a = t.measureText(n);
						return Object.freeze({
							widthPt: a.width,
							ascentPt: a.fontBoundingBoxAscent ?? a.actualBoundingBoxAscent ?? r * .8,
							descentPt: a.fontBoundingBoxDescent ?? a.actualBoundingBoxDescent ?? r * .2,
							font: i
						});
					} finally {
						t.font = r;
					}
				},
				resetPageAcquisition(e) {
					b.floats = [], b.floatParaSeq = 0, b.pageAnchorPrescanned = /* @__PURE__ */ new Set(), E = Object.freeze({
						coordinateSpace: "logical-page-points",
						flowDomainId: T(e.pageIndex),
						entries: Object.freeze([]),
						nextParagraphId: 0
					}), k = zC(T(e.pageIndex), "logical-page-points"), j(e);
				},
				moveAcquisitionCursor: j,
				flowRegistrySnapshot() {
					return Object.freeze({
						floats: E,
						drawingCollisions: k
					});
				},
				commitFlowRegistryDelta(e) {
					if (!e.floats && !e.drawingCollisions) throw Error("Body flow registry delta must update at least one registry");
					e.floats && $b(e.floats, {
						coordinateSpace: E.coordinateSpace,
						flowDomainId: E.flowDomainId,
						entries: E.entries,
						nextParagraphId: E.nextParagraphId
					}), e.drawingCollisions && VC(k, e.drawingCollisions);
					let t = e.drawingCollisions ? HC(k, e.drawingCollisions) : k, n = (e.floats?.entries ?? []).map((e) => {
						let t = e.wrapDistances?.leftPt ?? e.bounds.xPt - e.exclusionBounds.xPt, n = e.wrapDistances?.topPt ?? e.bounds.yPt - e.exclusionBounds.yPt, r = e.wrapDistances?.rightPt ?? e.exclusionBounds.xPt + e.exclusionBounds.widthPt - e.bounds.xPt - e.bounds.widthPt, i = e.wrapDistances?.bottomPt ?? e.exclusionBounds.yPt + e.exclusionBounds.heightPt - e.bounds.yPt - e.bounds.heightPt, a = {
							mode: e.wrap === "topAndBottom" ? "topAndBottom" : "square",
							...e.kind === "shape" ? {
								anchorOccurrenceId: e.occurrenceId,
								acquisitionOccurrenceId: e.occurrenceId
							} : {},
							...e.wrap ? {
								authoredWrap: e.wrap,
								wrapPolygon: e.wrapPolygon
							} : {},
							imageKey: e.exclusionId ?? (e.kind === "table" ? `body:float:${e.paragraphId}` : ""),
							imageX: e.bounds.xPt,
							imageY: e.bounds.yPt,
							imageW: e.bounds.widthPt,
							imageH: e.bounds.heightPt,
							xLeft: e.exclusionBounds.xPt,
							xRight: e.exclusionBounds.xPt + e.exclusionBounds.widthPt,
							yTop: e.exclusionBounds.yPt,
							yBottom: e.exclusionBounds.yPt + e.exclusionBounds.heightPt,
							side: e.wrapSide ?? "bothSides",
							distLeft: t,
							distRight: r,
							distTop: n,
							distBottom: i,
							paraId: e.paragraphId
						};
						return e.kind === "table" ? {
							...a,
							kind: "table",
							tableOverlap: e.overlap
						} : {
							...a,
							kind: e.kind
						};
					});
					e.floats && (b.floats.push(...n), E = Object.freeze({
						...E,
						entries: Object.freeze([...E.entries, ...e.floats.entries]),
						nextParagraphId: e.floats.nextParagraphId
					}), b.floatParaSeq = e.floats.nextParagraphId), k = t;
				}
			};
			return Object.freeze(ie);
		} });
	}
	function p(e, t) {
		return px(t, vx(t, e));
	}
	function m(e, t, n, r) {
		let i = e.retainedTablesBySourceIndex.get(r);
		if (i?.contentWidthPt === n && i.reusableAcrossPages) {
			let e = i.acquisition.layout.rows.map((e) => e.advancePt);
			return {
				colWidthsPt: [...i.acquisition.layout.columnWidthsPt],
				rowContentHeightsPt: e,
				rowHeightsPt: e
			};
		}
		let a = h(t, n, e), o = e.retainedTableAcquisition, s = XS(t, a, n, e, [r], o), c = i?.contentWidthPt === n ? Object.freeze({
			...s,
			layout: Object.freeze({
				...s.layout,
				columnWidthsPt: i.acquisition.layout.columnWidthsPt
			})
		}) : s;
		e.retainedTablesBySourceIndex.set(r, Object.freeze({
			sourceIndex: r,
			acquisition: c,
			contentWidthPt: n,
			reusableAcrossPages: WS(c),
			anchorYPt: e.y
		}));
		let l = c.layout.rows.map((e) => e.advancePt);
		return {
			colWidthsPt: a,
			rowContentHeightsPt: l,
			rowHeightsPt: l
		};
	}
	function h(e, t, n) {
		let r = n.acquisitionInputs.tableFormatInput(e), i = Number.isFinite(e.tblInd) ? e.tblInd ?? 0 : 0, a = r.rows.map((e) => {
			let t = e.exception;
			return t?.indentAuthored ? t.indentPt ?? 0 : i;
		}), o = n.storyContext?.story, s = n.storyContext?.containers.length === 0 && (o === "header" || o === "footer" || o === "body" && n.sectionLayout?.columns.length === 1), c = r.ordinaryFlow && s && !sx(n.sectionLayout.textDirection) && [i, ...a].some((e) => e < 0), l = r.rows.length === 0 ? [{
			justification: e.jc,
			indentPt: i
		}] : r.rows.map((t, n) => ({
			justification: t.justification ?? e.jc,
			indentPt: a[n] ?? i
		})), u = e.bidiVisual === !0, d = Math.min(n.pageWidth, ...l.map(({ justification: e, indentPt: r }) => {
			let i = e === "right" || e === "end", a = e === "center" ? "center" : (u ? !i : i) ? "right" : "left", o = u ? -r : r;
			if (a === "left") {
				let e = n.contentX + o;
				return n.pageWidth - e;
			}
			if (a === "right") return n.contentX + t + o;
			let s = n.contentX + t / 2 + o;
			return 2 * Math.min(s, n.pageWidth - s);
		})), f = c ? Math.max(t, d) : t, p = (r.firstRowException?.layout === "fixed" ? "fixed" : e.layout) === "fixed" && n.storyContext?.containers.some((e) => e.kind === "tableCell"), m = (e, r = n.acquisitionInputs.tableFormatInput(e)) => {
			let i = /* @__PURE__ */ new WeakMap();
			return e.rows.forEach((t, n) => t.cells.forEach((t, a) => {
				let o = r.rows[n]?.cells[a]?.marginsPt;
				i.set(t, o ?? M(t, e));
			})), (r) => eu(r, i.get(r) ?? M(r, e), {
				paragraph: (e) => {
					let r = Pu(n.layoutSettings, n.sectionLayout, n.storyContext ?? mx, e), i = e.numbering ? n.acquisitionInputs.numberingMarkerShapeInput(e.numbering, ec(e)) : void 0, a = Nl(r, {
						numbering: e.numbering,
						...i ? { markerInput: i } : {},
						authoredFirstIndentPt: e.indentFirst,
						tabStops: e.tabStops,
						defaultTabPt: n.defaultTabPt,
						service: n.layoutServices?.text,
						clusterGeometry: !1
					}), o = a.numberingMarkerGeometry ?? (e.numbering && i && n.layoutServices?.text ? Il(e.numbering, i, {
						authoredFirstIndentPt: e.indentFirst,
						physicalIndentLeftPt: a.physicalIndentLeftPt,
						tabStops: e.tabStops,
						defaultTabPt: n.defaultTabPt
					}, n.layoutServices.text, !1) : void 0);
					return ou(e, a, t, {
						context: n.ctx,
						fontFamilyClasses: n.fontFamilyClasses
					}, fx(n), o, { preserveWhitespaceOnlyContent: !0 });
				},
				nestedTable: (e) => Qx(n.acquisitionInputs.tableColumnLayoutInput(e, t, m(e), t))
			});
		};
		return [...rS(n.acquisitionInputs.tableColumnLayoutInput(e, t, m(e, r), p ? null : n.acquisitionInputs.tableParticipatesInOrdinaryFlow(e) ? f : Math.max(t, n.pageWidth)))];
	}
	function g(e, t, n) {
		let r = e.indexOf(t);
		for (let t = r + 1; t < e.length; t++) {
			let r = e[t];
			if (r.type !== "paragraph") continue;
			let i = r;
			if (!i.framePr) return Lc(i, 1, p(i, n), _x(n, i).hasRuby, n.docEastAsian, n.ctx, n.fontFamilyClasses, i.lineSpacing, n.resolvedLocalFonts, n.layoutServices?.text, n.acquisitionInputs.paragraphMarkShapeInput(i), n.layoutSettings.compat.useFeLayout);
		}
		let i = t;
		return Lc(i, 1, p(i, n), _x(n, i).hasRuby, n.docEastAsian, n.ctx, n.fontFamilyClasses, i.lineSpacing, n.resolvedLocalFonts, n.layoutServices?.text, n.acquisitionInputs.paragraphMarkShapeInput(i), n.layoutSettings.compat.useFeLayout);
	}
	function _(e, t, n, r, i) {
		let a = {
			context: n.ctx,
			fontFamilyClasses: n.fontFamilyClasses
		}, o = fx(n), s = t.members.map(Su), c = Lb(t.framePr.hAnchor, n), l = {
			contentXPt: n.contentX,
			contentWidthPt: n.contentW,
			pageHeightPt: n.pageH,
			yPt: n.y,
			anchorLineHeightPt: r
		}, u = Uv(t, {
			contexts: t.members.map((e) => _x(n, e)),
			inputs: t.members,
			borderEdges: s,
			borderExtentsPt: t.members.map((e, t) => s[t]?.bottom === "none" ? 0 : su(e.borders)),
			measurer: a,
			environment: o,
			containerShading: n.containerShading,
			maximumWidthPt: Math.max(0, c.right - c.left),
			acquisitionSession: n,
			placementSignature: [
				l.contentXPt,
				l.contentWidthPt,
				l.pageHeightPt,
				l.yPt,
				l.anchorLineHeightPt,
				n.pageWidth,
				n.marginLeft,
				n.marginRight,
				n.marginTop,
				n.marginBottom
			].join("|"),
			place: (e, r) => {
				let i = Hb(t.framePr, n, l.yPt, e, r, l.anchorLineHeightPt);
				return Object.freeze({
					bounds: Object.freeze({
						xPt: i.x,
						yPt: i.y,
						widthPt: i.w,
						heightPt: i.h
					}),
					exclusionBounds: Object.freeze({
						xPt: i.exLeft,
						yPt: i.exTop,
						widthPt: i.exRight - i.exLeft,
						heightPt: i.exBottom - i.exTop
					})
				});
			},
			anchorFrames: hx(n)
		});
		i?.(u);
		let d = {
			x: u.box.bounds.xPt,
			y: u.box.bounds.yPt,
			w: u.box.bounds.widthPt,
			h: u.box.bounds.heightPt,
			exLeft: u.box.exclusionBounds.xPt,
			exTop: u.box.exclusionBounds.yPt,
			exRight: u.box.exclusionBounds.xPt + u.box.exclusionBounds.widthPt,
			exBottom: u.box.exclusionBounds.yPt + u.box.exclusionBounds.heightPt,
			registerExclusion: !0,
			exclusionId: u.box.exclusionId
		};
		return e === t.owner ? d : {
			...d,
			registerExclusion: !1
		};
	}
	function v(e, t, n) {
		if (t.verticalPhys) {
			let n = v(e, T(t), t.contentX);
			return ow(n.x, n.y, n.w, n.h, t.verticalPhys.physicalPageWidthPt);
		}
		let r = e.widthPt, i = e.heightPt, a = e.anchorXPt, o = e.anchorYPt, s = e.groupWidthPt ?? null, c = e.groupHeightPt ?? null;
		if (e.widthPct != null) {
			let n = nx(e.widthRelativeFrom, !1, t), i = (n.end - n.start) * e.widthPct;
			if (e.groupWidthPt != null && e.groupWidthPt > 0) {
				let t = i / e.groupWidthPt;
				r = e.widthPt * t, a = e.anchorXPt * t;
			} else r = i;
			s = i;
		}
		if (e.heightPct != null) {
			let r = rx(e.heightRelativeFrom, !1, n, t), a = (r.end - r.start) * e.heightPct;
			if (e.groupHeightPt != null && e.groupHeightPt > 0) {
				let t = a / e.groupHeightPt;
				i = e.heightPt * t, o = e.anchorYPt * t;
			} else i = a;
			c = a;
		}
		return {
			x: ix(e.anchorXAlign, e.anchorXFromMargin, a, r, t, e.anchorXRelativeFrom, e.pctPosH, s),
			y: ax(e.anchorYAlign, e.anchorYFromPara, o, i, n, t, e.anchorYRelativeFrom, e.pctPosV, c),
			w: r,
			h: i
		};
	}
	let y = (e, t, n) => E(e, t, n), b = (e, t, n) => v(e, t, n), x = (e) => ux(e), S = (e) => lx(e), C = (e, t, n) => O(e, t, n);
	function w(e) {
		let t = e.verticalPhys;
		return t ? {
			...e,
			pageWidth: t.pageWidth,
			marginLeft: t.marginLeft,
			marginRight: t.marginRight,
			marginTop: t.marginTop,
			marginBottom: t.marginBottom,
			pageH: t.pageHeight
		} : e;
	}
	function T(e) {
		let t = e.verticalPhys;
		return t ? {
			...w(e),
			contentX: t.marginLeft,
			contentW: t.pageWidth - t.marginLeft - t.marginRight,
			verticalCJK: !1,
			verticalAllRotated: !1,
			verticalPhys: void 0,
			floats: []
		} : e;
	}
	function E(e, t, n) {
		let r = e.widthPt, i = e.heightPt, a = e.distLeft ?? 0, o = e.distRight ?? 0, s = e.distTop ?? 0, c = e.distBottom ?? 0;
		if (t.verticalPhys) {
			let n = w(t), l = ow(ix(e.anchorXAlign, e.anchorXFromMargin ?? !1, e.anchorXPt ?? 0, r, n, e.anchorXRelativeFrom ?? null, null, null), ax(e.anchorYAlign, e.anchorYFromPara ?? !1, e.anchorYPt ?? 0, i, t.contentX, n, e.anchorYRelativeFrom ?? null, null, null), r, i, t.verticalPhys.physicalPageWidthPt);
			return {
				x: l.x,
				y: l.y,
				w: l.w,
				h: l.h,
				dl: s,
				dr: c,
				dt: o,
				db: a
			};
		}
		return {
			x: ix(e.anchorXAlign, e.anchorXFromMargin ?? !1, e.anchorXPt ?? 0, r, t, e.anchorXRelativeFrom ?? null, null, null),
			y: ax(e.anchorYAlign, e.anchorYFromPara ?? !1, e.anchorYPt ?? 0, i, n, t, e.anchorYRelativeFrom ?? null, null, null),
			w: r,
			h: i,
			dl: a,
			dr: o,
			dt: s,
			db: c
		};
	}
	function D(e, t, n) {
		let r = t.floatParaSeq++, i = t.pageAnchorPrescanned?.has(e) ?? !1;
		for (let a of e.runs) if (a.type === "image") {
			let e = a;
			if (i && WC(e)) continue;
			k(e, t, n, r);
		} else if (a.type === "chart") {
			let e = a;
			if (i && WC(e)) continue;
			A(e, t, n, r);
		} else if (a.type === "shape") {
			let e = a;
			if (i && WC(e)) continue;
			j(e, t, n, r);
		}
	}
	function O(e, t, n) {
		n.pageAnchorPrescanned ||= /* @__PURE__ */ new Set();
		for (let r = t; r < e.length; r++) {
			let t = e[r];
			if (!t) continue;
			if (t.type === "pageBreak") break;
			if (t.type === "sectionBreak") {
				let e = t;
				if (e.kind && e.kind !== "continuous") break;
				continue;
			}
			if (t.type !== "paragraph") continue;
			let i = t;
			if (n.pageAnchorPrescanned.has(i)) continue;
			let a = !1;
			for (let e of i.runs) if (e.type === "image") {
				if (WC(e)) {
					a = !0;
					break;
				}
			} else if (e.type === "chart") {
				if (WC(e)) {
					a = !0;
					break;
				}
			} else if (e.type === "shape" && WC(e)) {
				a = !0;
				break;
			}
			if (!a) continue;
			let o = n.floatParaSeq++;
			for (let e of i.runs) if (e.type === "image") {
				let t = e;
				if (!WC(t)) continue;
				k(t, n, 0, o);
			} else if (e.type === "chart") {
				let t = e;
				if (!WC(t)) continue;
				A(t, n, 0, o);
			} else if (e.type === "shape") {
				let t = e;
				if (!WC(t)) continue;
				j(t, n, 0, o);
			}
			n.pageAnchorPrescanned.add(i);
		}
	}
	function k(e, t, n, r) {
		if (!e.anchor || !co(e.wrapMode)) return;
		let i = e.wrapMode === "topAndBottom" ? "topAndBottom" : "square", a = E(e, t, n), { w: o, h: s, dl: c, dr: u, dt: d, db: f } = a, p = e.allowOverlap ?? !0, m = l(e.imagePath, e.colorReplaceFrom, e.duotone);
		Ub(t, {
			x: a.x,
			y: a.y,
			w: o,
			h: s,
			dl: c,
			dr: u,
			dt: d,
			db: f,
			kind: "shape",
			mode: i,
			side: e.wrapSide ?? "bothSides",
			imageKey: m,
			paraId: r,
			avoidOverlap: !0,
			allowOverlap: p
		});
	}
	function A(e, t, n, r) {
		if (!e.anchor || !co(e.wrapMode)) return;
		let i = E(e, t, n), { w: a, h: o, dl: s, dr: c, dt: l, db: u } = i;
		a <= 0 || o <= 0 || Ub(t, {
			x: i.x,
			y: i.y,
			w: a,
			h: o,
			dl: s,
			dr: c,
			dt: l,
			db: u,
			kind: "shape",
			mode: e.wrapMode === "topAndBottom" ? "topAndBottom" : "square",
			side: e.wrapSide ?? "bothSides",
			allowOverlap: e.allowOverlap ?? !0,
			avoidOverlap: !0,
			paraId: r,
			imageKey: ""
		});
	}
	function j(e, t, n, r) {
		if (!co(e.wrapMode)) return;
		let { x: i, y: a, w: o, h: s } = v(e, t, n);
		if (o <= 0 || s <= 0) return;
		let c = e.wrapMode === "topAndBottom" ? "topAndBottom" : "square", l = e.distLeft ?? 0, u = e.distRight ?? 0, d = e.distTop ?? 0, f = e.distBottom ?? 0, p = !!t.verticalPhys;
		Ub(t, {
			x: i,
			y: a,
			w: o,
			h: s,
			dl: p ? d : l,
			dr: p ? f : u,
			dt: p ? u : d,
			db: p ? l : f,
			kind: "shape",
			mode: c,
			side: e.wrapSide ?? "bothSides",
			imageKey: "",
			paraId: r,
			avoidOverlap: !0,
			allowOverlap: !0
		});
	}
	function M(e, t) {
		return {
			top: e.marginTop ?? t.cellMarginTop,
			bottom: e.marginBottom ?? t.cellMarginBottom,
			left: e.marginLeft ?? t.cellMarginLeft,
			right: e.marginRight ?? t.cellMarginRight
		};
	}
	let N = f(e, t, n);
	return Object.freeze({
		kernel: N,
		internals: Object.freeze({
			resolveColumnWidths: h,
			resolveAnchorBox: y,
			resolveShapeBox: b,
			physicalLayoutSection: x,
			verticalLayoutSection: S,
			preRegisterPageFloats: C
		})
	});
}
//#endregion
//#region packages/docx/src/document-content.ts
function* cw(e) {
	e.textPath && (yield {
		text: e.textPath.string,
		fontFamilies: [e.textPath.fontFamily]
	});
	for (let t of e.textBlocks ?? []) yield* lw(t);
}
function* lw(e) {
	if (e.numbering && (yield {
		text: e.numbering.text,
		fontFamilies: [e.numbering.fontFamily, e.numbering.fontFamilyEastAsia]
	}), e.runs?.length) for (let t of e.runs) yield {
		text: t.text,
		fontFamilies: [
			t.fontFamily,
			t.fontFamilyEastAsia,
			e.fontFamily
		],
		latinFontFamily: t.fontFamily ?? e.fontFamily ?? null,
		bold: t.bold ?? e.bold,
		italic: t.italic ?? e.italic
	};
	else yield {
		text: e.text,
		fontFamilies: [e.fontFamily],
		latinFontFamily: e.fontFamily ?? null,
		bold: e.bold,
		italic: e.italic
	};
}
function* uw(e) {
	if (e.type === "text") {
		let t = e;
		yield {
			text: e.text,
			eastAsiaLanguage: t.langEastAsia,
			fontFamilies: [
				e.fontFamily,
				t.fontFamilyHighAnsi,
				e.fontFamilyEastAsia
			],
			latinFontFamily: e.fontFamily ?? t.fontFamilyHighAnsi ?? null,
			bold: e.bold,
			italic: e.italic
		}, e.fontFamilyCs && (yield {
			text: e.text,
			eastAsiaLanguage: t.langEastAsia,
			fontFamilies: [e.fontFamilyCs],
			bold: e.boldCs ?? !1,
			italic: e.italicCs ?? !1
		});
	} else if (e.type === "field") {
		let t = e;
		yield {
			text: t.fallbackText,
			eastAsiaLanguage: t.langEastAsia,
			fontFamilies: [
				t.fontFamily,
				t.fontFamilyHighAnsi,
				t.fontFamilyEastAsia
			],
			latinFontFamily: t.fontFamily ?? t.fontFamilyHighAnsi ?? null,
			bold: t.bold,
			italic: t.italic
		}, t.fontFamilyCs && (yield {
			text: t.fallbackText,
			eastAsiaLanguage: t.langEastAsia,
			fontFamilies: [t.fontFamilyCs],
			bold: t.boldCs ?? !1,
			italic: t.italicCs ?? !1
		});
	} else e.type === "shape" ? yield* cw(e) : e.type === "anchorHost" && (yield {
		text: "",
		fontFamilies: [e.fontFamily, e.fontFamilyEastAsia],
		bold: e.bold,
		italic: e.italic
	});
}
function* dw(e) {
	yield {
		text: "",
		fontFamilies: [e.defaultFontFamily, e.defaultFontFamilyEastAsia]
	}, e.numbering && (yield {
		text: e.numbering.text,
		fontFamilies: [e.numbering.fontFamily, e.numbering.fontFamilyEastAsia]
	});
	for (let t of e.runs) for (let n of uw(t)) {
		let t = n.fontFamilies.some(Boolean) ? n.fontFamilies : [e.defaultFontFamily, e.defaultFontFamilyEastAsia];
		yield {
			...n,
			fontFamilies: t,
			...n.latinFontFamily === null ? { latinFontFamily: e.defaultFontFamily ?? null } : {}
		};
	}
}
function* fw(e) {
	for (let t of e.rows) for (let e of t.cells) yield* mw(e.content);
}
function* pw(e) {
	if (e) for (let t of [
		e.default,
		e.first,
		e.even
	]) t && (yield* mw(t.body));
}
function* mw(e) {
	for (let t of e) t.type === "paragraph" ? yield* dw(t) : t.type === "table" ? yield* fw(t) : t.type === "sectionBreak" && (yield* pw(t.headers), yield* pw(t.footers));
}
function* hw(e) {
	yield* mw(e.body ?? []), yield* pw(e.headers), yield* pw(e.footers);
	for (let t of [...e.footnotes ?? [], ...e.endnotes ?? []]) yield* mw(t.content);
}
function gw(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of hw(e)) for (let e of n.fontFamilies) {
		let n = e?.trim();
		n && t.add(n);
	}
	return [...t];
}
//#endregion
//#region packages/docx/src/google-fonts.ts
var _w = {
	...f,
	...p
};
function* vw(e) {
	for (let t of hw(e)) yield t.text;
}
function yw(e, t) {
	let n = new v(C(e.majorFont) ?? C(e.minorFont) ?? t ?? null), r = /* @__PURE__ */ new Set();
	for (let t of hw(e)) {
		let e = Ee(t.eastAsiaLanguage);
		if (e) for (let n of c([t.text], e, !0)) r.add(n);
		else n.addText([t.text]);
	}
	return [
		e.majorFont,
		e.minorFont,
		...new Set([...n.names(), ...r])
	];
}
function bw(e) {
	let t = /* @__PURE__ */ new Map(), n = (e, n = !1, r = !1) => {
		let i = e?.trim();
		if (!i) return;
		let a = n ? 700 : 400, o = r ? "italic" : "normal";
		t.set(`${i.toLocaleLowerCase("en-US")}:${a}:${o}`, {
			family: i,
			weight: a,
			style: o
		});
	};
	n(e.majorFont), n(e.minorFont);
	for (let t of hw(e)) {
		for (let e of t.fontFamilies) n(e, t.bold, t.italic);
		t.text && (t.latinFontFamily === null || t.latinFontFamily === void 0 && !t.fontFamilies.some(Boolean)) && n(e.minorFont, t.bold, t.italic);
	}
	return [...t.values()];
}
function xw(e) {
	let t = new v(null);
	return t.addText(vw(e)), t.scriptCjkLanguage();
}
//#endregion
//#region packages/docx/src/layout/font-service.ts
function Sw(e) {
	return e.trim().toLocaleLowerCase("en-US");
}
function Cw(e) {
	return e == null || !Number.isFinite(e) ? 400 : Math.min(900, Math.max(100, Math.round(e / 100) * 100));
}
function ww(e) {
	return Object.freeze({
		...e,
		diagnostics: Object.freeze([...e.diagnostics])
	});
}
function Tw(e) {
	return `"${e.replaceAll("\\", "\\\\").replaceAll("\"", "\\\"")}"`;
}
function Ew(e, t) {
	return `${Tw(e)}, ${t}`;
}
function Dw(e, t = {}) {
	let n = {
		embedded: 0,
		local: 1,
		css: 2,
		google: 3,
		substitute: 4
	}, r = e.filter((e) => e.requestedFamily.trim() && e.resolvedFamily.trim()).map((e) => Object.freeze({
		...e,
		weight: Cw(e.weight),
		style: e.style ?? "normal"
	})).sort((e, t) => Sw(e.requestedFamily).localeCompare(Sw(t.requestedFamily)) || n[e.source] - n[t.source] || e.resolvedFamily.localeCompare(t.resolvedFamily) || e.weight - t.weight || e.style.localeCompare(t.style)), i = /* @__PURE__ */ new Map();
	for (let e of r) {
		let t = Sw(e.requestedFamily);
		i.set(t, [...i.get(t) ?? [], e]);
	}
	let a = Object.freeze(Object.fromEntries(Object.entries(t.nativeFamilyLists ?? {}).filter(([e, t]) => e.trim() && t.trim()).map(([e, t]) => [Sw(e), t]).sort(([e], [t]) => e.localeCompare(t)))), o = Object.freeze(Object.fromEntries(Object.entries(t.regionalFamilyLists ?? {}).map(([e, t]) => [e, Object.freeze(Object.fromEntries(Object.entries(t).map(([e, t]) => [Sw(e), t]).sort(([e], [t]) => e.localeCompare(t))))]).sort(([e], [t]) => String(e).localeCompare(String(t))))), s = (e, t, n) => {
		let r = Ee(t) ?? n;
		return (r ? o[r]?.[Sw(e)] : void 0) ?? a[Sw(e)];
	}, c = nt("fonts", {
		faces: r,
		nativeFamilyLists: a,
		regionalFamilyLists: o
	});
	return Object.freeze({
		fingerprint: c,
		resolve(e) {
			let t = e.requestedFamily?.trim() || e.genericFamily || "sans-serif", n = Cw(e.weight), r = e.style ?? "normal", a = (i.get(Sw(t)) ?? []).find((e) => e.weight === n && e.style === r);
			if (a) {
				let i = a.source === "substitute" ? [{
					code: "UNSUPPORTED_FEATURE",
					severity: "warning",
					message: `ECMA-376 §17.8.2 implementation-dependent font substitution: ${t} resolved to ${a.resolvedFamily}`
				}] : [], o = s(t, e.language, e.cjkFallback), c = o ? `${Tw(a.resolvedFamily)}, ${o}` : Ew(a.resolvedFamily, e.genericFamily ?? "sans-serif");
				return ww({
					requestedFamily: t,
					resolvedFamily: a.resolvedFamily,
					route: ct(c, "registered"),
					source: a.source,
					...a.resourceIdentity === void 0 ? {} : { resourceIdentity: a.resourceIdentity },
					weight: n,
					style: r,
					diagnostics: i,
					genericFamily: e.genericFamily ?? "sans-serif"
				});
			}
			let o = e.genericFamily ?? "sans-serif", c = e.requestedFamily?.trim();
			return ww(c ? {
				requestedFamily: t,
				resolvedFamily: c,
				route: ct(s(c, e.language, e.cjkFallback) ?? Ew(c, o), "native"),
				source: "native",
				weight: n,
				style: r,
				diagnostics: [],
				genericFamily: o
			} : {
				requestedFamily: t,
				resolvedFamily: o,
				route: ct(s(o, e.language, e.cjkFallback) ?? o, "generic"),
				source: "generic",
				weight: n,
				style: r,
				diagnostics: [],
				genericFamily: o
			});
		}
	});
}
//#endregion
//#region packages/docx/src/layout/production-services.ts
function Ow(e, t) {
	let n = Object.freeze(Object.fromEntries(Object.entries(e.fontFamilyCharsets).map(([e, t]) => [e.trim().toLowerCase(), t]))), r = (e) => e.trim().replace(/^(['"])(.*)\1$/, "$2"), i = (e) => r(e).toLocaleLowerCase("en-US"), a = (e) => {
		let t = e.style.trim().toLocaleLowerCase("en-US");
		return t === "normal" || t === "italic" ? t : null;
	}, o = (e) => {
		let t = e.weight.trim().toLocaleLowerCase("en-US");
		if (t === "normal") return [400];
		if (t === "bold") return [700];
		if (/^\d+$/.test(t)) {
			let e = Number(t);
			return e >= 100 && e <= 900 ? [e] : [];
		}
		return [400, 700].filter((e) => Te(t, e));
	}, s = (e) => e.flatMap((e) => {
		if (e.status !== "loaded") return [];
		let t = a(e);
		return t == null ? [] : o(e).map((n) => ({
			family: i(e.family),
			displayFamily: r(e.family),
			weight: n,
			style: t
		}));
	}), c = (t.embeddedRoutes ?? []).map((e) => ({
		requestedFamily: e.requestedFamily,
		resolvedFamily: e.resolvedFamily,
		resourceIdentity: e.resourceIdentity,
		source: "embedded",
		weight: e.weight,
		style: e.style
	})), l = new Set(c.map((e) => `${i(e.requestedFamily)}:${e.weight}:${e.style}`)), u = (e = {}) => Object.fromEntries(Object.entries(e).filter(([e, t]) => !t.sourceIdentity?.startsWith("provided-sfnt:") || !l.has(`${i(t.requestedFamily ?? e)}:${t.weight ?? 400}:${t.style ?? "normal"}`))), d = zi(u(t.localMetrics)), f = new Set(Object.entries(d).map(([e, t]) => `${i(t.requestedFamily ?? e)}:${t.weight ?? 400}:${t.style ?? "normal"}`)), p = (t.officeRoutes ?? []).filter((e) => {
		let t = `${i(e.requestedFamily)}:${e.weight}:${e.style}`;
		return !l.has(t) && !f.has(t);
	}), m = Object.fromEntries(p.flatMap((e) => {
		if (e.metric.lineHeightRatio == null) return [];
		let t = i(e.requestedFamily);
		return [[e.weight === 400 && e.style === "normal" ? t : `${t}:${e.weight}:${e.style}`, e.metric]];
	})), h = zi({
		...d,
		...m,
		...u(t.fontMetrics)
	});
	for (let e of p) c.push({
		requestedFamily: e.requestedFamily,
		resolvedFamily: e.family,
		source: e.source,
		resourceIdentity: e.resourceIdentity,
		weight: e.weight,
		style: e.style
	});
	for (let [e, t] of Object.entries(d)) c.push({
		requestedFamily: t.requestedFamily ?? e,
		resolvedFamily: t.family,
		source: "local",
		...t.sourceIdentity === void 0 ? {} : { resourceIdentity: t.sourceIdentity },
		weight: t.weight ?? 400,
		style: t.style ?? "normal"
	});
	if (t.useGoogleFonts) {
		let n = s(t.googleFaces ?? []), r = /* @__PURE__ */ new Set();
		for (let t of e.fonts.preloadNames) {
			if (!t) continue;
			let e = t.toLocaleLowerCase("en-US");
			if (r.has(e)) continue;
			r.add(e);
			let a = _w[e], o = a?.loadFamily ?? t;
			if (a) for (let e of n.filter((e) => e.family === i(o))) c.push({
				requestedFamily: t,
				resolvedFamily: e.displayFamily,
				source: i(o) === i(t) ? "google" : "substitute",
				weight: e.weight,
				style: e.style
			});
		}
	}
	let g = t.measureContext, _ = [...new Set([
		...Object.keys(e.fonts.familyClasses),
		...Object.keys(e.fonts.familyPitches),
		...e.fonts.renderedFamilies,
		...e.fonts.majorFamily ? [e.fonts.majorFamily] : [],
		...e.fonts.minorFamily ? [e.fonts.minorFamily] : []
	])], v = new Set(_.map(i)), y = t.fontSet === void 0 ? L() : t.fontSet;
	if (y && typeof y[Symbol.iterator] == "function") {
		for (let e of y) if (v.has(i(e.family))) for (let t of s([e])) c.push({
			requestedFamily: t.displayFamily,
			resolvedFamily: t.displayFamily,
			source: "css",
			weight: t.weight,
			style: t.style
		});
	}
	let b = Wi({
		fonts: Dw(c, {
			regionalFamilyLists: Object.fromEntries([
				"sc",
				"tc",
				"hk",
				"jp",
				"kr"
			].map((t) => [t, Object.fromEntries([...new Set([
				..._,
				"sans-serif",
				"serif",
				"monospace"
			])].map((n) => [n, Xs(n, e.fonts.familyClasses, e.fonts.familyPitches, t)]))])),
			nativeFamilyLists: Object.fromEntries(_.map((t) => [t, Xs(t, e.fonts.familyClasses, e.fonts.familyPitches)]))
		}),
		cjkFallback: t.cjkFallback,
		fontMetrics: h,
		eastAsiaFontCharsets: n,
		genericFamilies: Object.fromEntries(_.map((t) => [t, Fi(t, e.fonts.familyClasses, e.fonts.familyPitches)])),
		measurer: {
			fingerprint: g ? "canvas-text-metrics-v1" : "deterministic-text-metrics-v1",
			measure(e) {
				if (!g) return {
					advancePt: [...e.text].length * e.fontSizePt * .5,
					ascentPt: e.fontSizePt * .8,
					descentPt: e.fontSizePt * .2
				};
				let t = g.font, n = g.letterSpacing, r = g.fontKerning;
				try {
					g.font = lt(e.fontRoute, e.fontSizePt, e.weight, e.style), g.letterSpacing = `${e.letterSpacingPt}px`, e.kerning != null && (g.fontKerning = e.kerning ? "normal" : "none");
					let t = g.measureText(e.text), n = Number.isFinite(t.actualBoundingBoxLeft) && Number.isFinite(t.actualBoundingBoxRight), r = {
						xMinPt: n ? -t.actualBoundingBoxLeft : 0,
						xMaxPt: n ? t.actualBoundingBoxRight : t.width,
						ascentPt: t.actualBoundingBoxAscent,
						descentPt: t.actualBoundingBoxDescent
					};
					return {
						advancePt: t.width,
						ascentPt: t.fontBoundingBoxAscent ?? t.actualBoundingBoxAscent ?? 0,
						descentPt: t.fontBoundingBoxDescent ?? t.actualBoundingBoxDescent ?? 0,
						...Object.values(r).every(Number.isFinite) ? {
							inkBounds: r,
							...n ? { horizontalInkBoundsAreTight: !0 } : {}
						} : {}
					};
				} finally {
					g.font = t, g.letterSpacing = n, e.kerning != null && (g.fontKerning = r);
				}
			}
		}
	}), x = t.mathResources ?? e.mathOccurrences.map(({ display: e, source: t }) => ({
		resourceKey: at(t, e ? "display" : "inline"),
		widthEm: 0,
		ascentEm: 0,
		descentEm: 0,
		available: !1,
		diagnostics: [{
			code: "UNSUPPORTED_FEATURE",
			severity: "warning",
			message: "The optional math renderer is unavailable; using the deterministic text fallback"
		}]
	})), S = e.imageMetadata, C = Object.freeze({
		text: b,
		images: er(S),
		math: tr(x),
		verticalGlyphFingerprint: t.verticalGlyphMeasurement.fingerprint
	}), w = e.mathOccurrences.map(({ source: e, display: t }) => at(e, t ? "display" : "inline")), T = x.map((e) => e.resourceKey), E = w.filter((e) => !T.includes(e)), D = T.filter((e) => !w.includes(e));
	if (E.length || D.length) throw Error(`Math metadata membership mismatch: missing [${E.join(", ")}]; extra [${D.join(", ")}]`);
	return Ar(C, t.mathDrawables ?? /* @__PURE__ */ new Map(), x.filter((e) => e.available !== !1).map((e) => e.resourceKey)), zr(C, e.paintResources), Er(C, t.verticalGlyphMeasurement), C;
}
//#endregion
//#region packages/docx/src/layout/table-source-acquisition.ts
function kw(e, t) {
	if (e === null) return null;
	let n = e.trim(), r = t && n.endsWith("%") ? n.slice(0, -1) : n;
	if (r.length === 0) return null;
	let i = Number(r);
	return Number.isFinite(i) ? i : null;
}
function Aw(e) {
	return e.value?.trim().endsWith("%") ? "pct" : e.kind ?? "dxa";
}
function jw(e) {
	if (!e) return null;
	let t = e.value?.trim() ?? "", n = Aw(e);
	if (n === "dxa") {
		let t = kw(e.value ?? "0", !1);
		return t === null ? null : {
			kind: "dxa",
			value: t / 20
		};
	}
	if (n !== "pct") return null;
	let r = kw(e.value ?? "0", !0);
	return r === null ? null : {
		kind: "pct",
		value: t.endsWith("%") ? r / 100 : r / 5e3
	};
}
function Mw(e) {
	let t = jw(e);
	return t?.kind === "dxa" ? t.value : null;
}
function Nw(e) {
	return e.widthPt == null ? e.widthPct == null ? null : {
		kind: "pct",
		value: e.widthPct / 5e3
	} : {
		kind: "dxa",
		value: e.widthPt
	};
}
function Pw(e, t) {
	let n = e.format.firstRowException?.preferredWidth ?? null;
	if (e.format.firstRowException?.preferredWidthAuthored) return n?.kind === "dxa" ? n.value > 0 ? n.value : null : n?.kind === "pct" && n.value > 0 ? n.value * t : null;
	let r = jw(e.lexical.table?.preferredWidth);
	return r?.kind === "dxa" ? r.value > 0 ? r.value : null : r?.kind === "pct" ? r.value > 0 ? r.value * t : null : e.semantic.widthPt != null && e.semantic.widthPt > 0 ? e.semantic.widthPt : e.semantic.widthPct != null && e.semantic.widthPct > 0 ? e.semantic.widthPct / 5e3 * t : null;
}
var Fw = Object.freeze({
	pt: "1/1",
	in: "72/1",
	cm: "3600/127",
	mm: "360/127",
	pc: "12/1",
	pi: "12/1"
}), Iw = "18446744073709551615";
function Lw(e) {
	let t = e.replace(/[\u0009\u000a\u000d\u0020]+/g, " ").replace(/^ | $/g, ""), n = /^([+-]?)([0-9]+)$/.exec(t);
	if (!n) return null;
	let [, r, i] = n;
	if (r === "-" && /[1-9]/.test(i)) return null;
	let a = i.replace(/^0+/, "") || "0";
	return a.length > 20 || a.length === 20 && a > Iw ? null : t;
}
var Rw = {
	key: "0/1",
	widthPt: 0
};
function zw(e) {
	let t = Mx(e);
	return Number.isFinite(t) ? {
		key: e,
		widthPt: t
	} : Rw;
}
function Bw(e, t) {
	let n = Number(e);
	if (!Number.isFinite(n)) return Rw;
	let r = kx(n), i = r === null ? 0 : Mx(Px(r, t));
	return Number.isFinite(i) ? {
		key: null,
		widthPt: i
	} : Rw;
}
function Vw(e) {
	if (e == null) return Rw;
	let t = Lw(e);
	if (t !== null) {
		let e = Ox(t);
		return e === null ? Rw : zw(Ix(e, 20n));
	}
	let n = /^([0-9]+(?:\.[0-9]+)?)(mm|cm|in|pt|pc|pi)$/.exec(e);
	if (!n) return Rw;
	let r = Fw[n[2]], i = Ox(n[1]);
	return i === null ? Bw(n[1], r) : zw(Px(i, r));
}
function Hw(e) {
	let t = e.lexical.table?.grid;
	if (!t) {
		let t = e.semantic.colWidths.map((e) => Number.isFinite(e) && e >= 0 ? {
			widthPt: e,
			key: kx(e) ?? "0/1"
		} : Rw);
		return {
			widthsPt: t.map((e) => e.widthPt),
			widthKeys: t.map((e) => e.key)
		};
	}
	let n = Math.max(t.requiredColumnCount, t.columns.length), r = Array.from({ length: n }, (e, n) => Vw(t.columns[n]?.width ?? null));
	return {
		widthsPt: r.map((e) => e.widthPt),
		widthKeys: r.map((e) => e.key)
	};
}
function Uw(e, t) {
	let n = jw(e);
	return n?.kind === "pct" ? {
		kind: "dxa",
		value: Math.max(0, n.value) * Math.max(0, t)
	} : n;
}
function Ww(e, t, n, r = t) {
	let i = e.semantic, { widthsPt: a, widthKeys: o } = Hw(e), s = e.format.firstRowException?.layout === "fixed" ? "fixed" : e.lexical.table?.layout?.kind ?? i.layout, c = e.lexical.table?.grid.authored ? e.lexical.table.grid.columns.length : null, l = i.rows.map((e) => {
		let t = Math.max(0, e.gridBefore ?? 0);
		return c !== null && t > c ? 0 : t;
	}), u = Math.max(c ?? 0, e.lexical.table?.grid.requiredColumnCount ?? 0, ...i.rows.map((e, t) => (l[t] ?? 0) + e.cells.reduce((e, t) => e + Math.max(1, t.colSpan), 0)));
	return {
		layout: s === "fixed" ? "fixed" : "autofit",
		availableWidthPt: r === null ? null : Math.max(0, r),
		gridWidthsPt: a,
		gridWidthKeys: o,
		tablePreferredWidthPt: Pw(e, t),
		rows: i.rows.map((r, i) => {
			let o = e.lexical.rows[i], d = l[i] ?? 0, f = Math.max(0, r.gridAfter ?? 0), p = d + r.cells.reduce((e, t) => e + Math.max(1, t.colSpan), 0), m = c !== null && p + f > u ? 0 : f, h = d;
			return {
				before: d > 0 ? {
					columnSpan: d,
					preferredWidth: Uw(o?.row?.beforeWidth, t)
				} : null,
				after: m > 0 ? {
					columnSpan: m,
					preferredWidth: Uw(o?.row?.afterWidth, t)
				} : null,
				cells: r.cells.map((t, r) => {
					let c = o?.cells[r] ?? null, l = Math.max(1, t.colSpan), u = s === "fixed" ? {
						minWidthPt: 0,
						maxWidthPt: 0
					} : n(i, r), d = Rx(e.format.rows[i]?.cellSpacingPt ?? 0, h, l, a.length), f = d.startPt + d.endPt, p = {
						columnStart: h,
						columnSpan: l,
						preferredWidth: jw(c?.preferredWidth) ?? Nw(t),
						minContentWidthPt: Math.max(0, u.minWidthPt) + f,
						maxContentWidthPt: Math.max(u.minWidthPt, u.maxWidthPt) + f
					};
					return h += l, p;
				})
			};
		})
	};
}
//#endregion
//#region packages/docx/src/layout/layout-source-store.ts
var Gw = /* @__PURE__ */ new WeakSet();
function Kw(e) {
	return typeof e == "object" && !!e && Gw.has(e);
}
function qw(e, t, n) {
	let r = Object.keys(e).sort(), i = [...t].sort();
	if (r.length !== i.length || r.some((e, t) => e !== i[t])) throw TypeError(`${n} has unexpected fields: ${r.join(",")}`);
}
function Jw(e, t, n) {
	let r = [...t].filter((t) => !e.has(t)), i = [...e].filter((e) => !t.has(e));
	if (r.length !== 0 || i.length !== 0) throw TypeError(`${n} membership mismatch; missing=${r.join(",")} extra=${i.join(",")}`);
}
function Yw(e, t) {
	let n = (e) => {
		e && t.storyRoot(e);
	}, r = (e) => {
		if (e.story !== "body" || e.storyInstance !== "body" || e.path.length !== 1 || t.body[e.path[0]] === void 0) throw TypeError(`Unknown body layout occurrence source: ${B(e)}`);
	}, i = (e) => {
		for (let t of [
			e.headers.default,
			e.headers.first,
			e.headers.even,
			e.footers.default,
			e.footers.first,
			e.footers.even
		]) n(t);
	};
	if (e.source.story !== "body" || e.source.storyInstance !== "body" || e.source.path.length !== 0) throw TypeError("Body layout input requires the canonical body root");
	i(e.initialSection);
	for (let n of e.sequence) if (r(n.kind === "body-block" ? n.block.source : n.source), n.kind === "body-block") {
		if (t.resolve(n.block.source).type !== n.block.kind) throw TypeError("Body layout block source kind mismatch");
	} else if (n.kind === "adjacent-table-group") {
		for (let e of n.tables) if (t.resolve(e.source).type !== "table") throw TypeError("Adjacent table source kind mismatch");
	} else n.kind === "begin-section" && i(n.section);
}
function Xw(e, t, n, r, i) {
	let a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map(), u = (e, t = "image") => {
		if (a.has(e)) throw TypeError(`Duplicate canonical image resource: ${e}`);
		a.add(e), o.set(e, t);
	};
	for (let n of t.paragraphs) {
		let t = e.resolve(n.source);
		if (t.type === "paragraph") {
			if (n.publicAnchorBridges.length !== t.runs.length) throw TypeError(`Paragraph anchor bridge cardinality mismatch: ${B(n.source)}`);
			t.numbering?.picBulletImagePath && u(tt(n.source, t.numbering.picBulletImagePath), "picture-bullet"), t.runs.forEach((e, t) => {
				let r = {
					...n.source,
					path: [...n.source.path, t]
				};
				if (e.type === "image" && u(tt(r, e.imagePath)), e.type === "chart") {
					if (s.has(e.resourceKey)) throw TypeError(`Duplicate canonical chart resource: ${e.resourceKey}`);
					s.add(e.resourceKey);
				}
				if (e.type === "math") {
					if (c.has(e.resourceKey)) throw TypeError(`Duplicate canonical math resource: ${e.resourceKey}`);
					c.add(e.resourceKey), l.set(e.resourceKey, B(e.source));
				}
				if (e.type === "shape" && e.textBoxInput?.kind === "compatibility") for (let t of e.textBoxInput.paragraphs) t.image && u(tt({
					...t.source,
					path: [...t.source.path, 0]
				}, t.image.imagePath));
				e.type === "shape" && e.fill?.fillType === "image" && u(tt(r, e.fill.imagePath));
			});
		}
	}
	let d = new Set(r.map((e) => e.resourceKey));
	if (d.size !== r.length) throw TypeError("Duplicate image metadata resource");
	Jw(d, a, "Image metadata");
	let f = /* @__PURE__ */ new Set();
	for (let e of n) {
		if (f.has(e.resourceKey)) throw TypeError("Duplicate math occurrence resource");
		if (f.add(e.resourceKey), l.get(e.resourceKey) !== B(e.source)) throw TypeError(`Math occurrence source mismatch: ${e.resourceKey}`);
	}
	Jw(f, c, "Math occurrence");
	let p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Set();
	for (let e of i) {
		if (p.has(e.resourceKey)) throw TypeError("Duplicate paint resource descriptor");
		if (p.add(e.resourceKey), e.kind === "image" || e.kind === "picture-bullet") {
			if (m.add(e.resourceKey), o.get(e.resourceKey) !== e.kind) throw TypeError(`Image paint resource kind mismatch: ${e.resourceKey}`);
		} else e.kind === "chart" ? h.add(e.resourceKey) : g.add(e.resourceKey);
	}
	Jw(p, new Set([
		...a,
		...s,
		...c
	]), "Paint resource"), Jw(m, a, "Image paint resource"), Jw(h, s, "Chart paint resource"), Jw(g, c, "Math paint resource");
}
function Zw(e, t) {
	let n = eT(e.blockRepository);
	Yw(t, n), Fn(e.acquisitionFacts, "layout source acquisition facts"), Fn(e.section, "layout source section"), Fn(e.documentLayoutFacts, "layout source document facts"), Fn(e.fonts, "layout source font facts"), Fn(e.fontFamilyCharsets, "layout source font charsets"), Fn(e.mathOccurrences, "layout source math facts"), Fn(e.imageMetadata, "layout source image facts"), Fn(e.paintDescriptors, "layout source paint descriptors"), e.fatalParse && Fn(e.fatalParse, "layout source fatal parse fact");
	for (let [t, r] of [
		["block repository", n],
		["body blocks", n.body],
		["footnotes", n.footnotes],
		["endnotes", n.endnotes],
		["acquisition facts", e.acquisitionFacts],
		["paragraph facts", e.acquisitionFacts.paragraphs],
		["table facts", e.acquisitionFacts.tables],
		["section", e.section],
		["document facts", e.documentLayoutFacts],
		["font facts", e.fonts],
		["math facts", e.mathOccurrences],
		["image facts", e.imageMetadata],
		["paint descriptors", e.paintDescriptors]
	]) if (!Object.isFrozen(r)) throw TypeError(`Layout source ${t} must be sealed`);
	let r = /* @__PURE__ */ new Map();
	for (let t of e.acquisitionFacts.paragraphs) {
		qw(t, [
			"source",
			"publicAnchorBridges",
			"numberingMarkerFallbackFontSizePt"
		], "Paragraph acquisition fact");
		let e = B(t.source);
		if (r.has(e)) throw TypeError(`Duplicate paragraph acquisition source: ${e}`);
		r.set(e, t);
	}
	let i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new WeakMap();
	for (let t of e.acquisitionFacts.tables) {
		qw(t, ["source", "input"], "Table acquisition fact");
		let e = B(t.source);
		if (i.has(e)) throw TypeError(`Duplicate table acquisition source: ${e}`);
		i.add(e);
		let r = n.resolve(t.source);
		if (r.type !== "table") throw TypeError("Table acquisition fact must identify a table");
		a.set(r, t);
	}
	for (let e of n.sources) {
		let t = n.resolve(e), a = B(e);
		if (t.type === "paragraph" && !r.has(a)) throw TypeError(`Missing paragraph acquisition source: ${a}`);
		if (t.type === "table" && !i.has(a)) throw TypeError(`Missing table acquisition source: ${a}`);
	}
	Xw(n, e.acquisitionFacts, e.mathOccurrences, e.imageMetadata, e.paintDescriptors);
	let o = /* @__PURE__ */ new WeakMap();
	for (let t of e.acquisitionFacts.paragraphs) {
		let e = n.resolve(t.source);
		if (e.type !== "paragraph") throw TypeError("Paragraph acquisition fact must identify a paragraph");
		for (let t of e.runs) {
			if (t.type !== "shape" || t.textBoxInput?.kind !== "complete") continue;
			let e;
			try {
				e = n.storyRoot(t.textBoxInput.source);
			} catch (e) {
				throw TypeError(`Missing complete text-box story source: ${B(t.textBoxInput.source)}`, { cause: e });
			}
			if (e.length !== t.textBoxInput.blockCount) throw TypeError(`Complete text-box block count mismatch: ${B(t.textBoxInput.source)}`);
		}
		if (e.numbering && e.numberingMarkerShapeInput && t.numberingMarkerFallbackFontSizePt !== null) {
			let n = o.get(e.numbering);
			n || (n = /* @__PURE__ */ new Map(), o.set(e.numbering, n)), n.set(t.numberingMarkerFallbackFontSizePt, e.numberingMarkerShapeInput);
		}
	}
	let s = Object.freeze({
		numberingMarkerShapeInput(e, t) {
			let n = o.get(e)?.get(t);
			if (n) return n;
			throw Error("Unknown numbering marker acquisition input");
		},
		paragraphMarkShapeInput(e) {
			return e.paragraphMarkShapeInput;
		},
		tableFormatInput(e) {
			let t = a.get(e);
			if (!t) throw Error("Unknown table acquisition input");
			return t.input.format;
		},
		tableColumnLayoutInput(e, t, n, r) {
			let i = a.get(e);
			if (!i) throw Error("Unknown table acquisition input");
			return Ww(i.input, t, (t, r) => n(e.rows[t].cells[r]), r);
		},
		tableParticipatesInOrdinaryFlow(e) {
			let t = a.get(e);
			if (!t) throw Error("Unknown table acquisition input");
			return t.input.format.ordinaryFlow;
		},
		paragraphAcquisitionInput(e, t) {
			if (!r.get(B(t))) throw Error(`Unknown paragraph acquisition source: ${B(t)}`);
			let i = n.resolve(t);
			if (i.type !== "paragraph") throw Error(`Paragraph source kind mismatch: ${B(t)}`);
			return i;
		}
	}), c = Object.freeze({
		acquisitionInputs: s,
		effectiveTablePositioning(e) {
			let t = a.get(e);
			if (!t) throw Error("Unknown table acquisition input");
			return t.input.format.positioning === null ? null : e.tblpPr ?? null;
		},
		publicAnchorBridge(e, t) {
			let n = r.get(B(e));
			if (!n) throw Error(`Unknown paragraph acquisition source: ${B(e)}`);
			if (!Number.isSafeInteger(t) || t < 0 || t >= n.publicAnchorBridges.length) throw RangeError(`Unknown paragraph anchor bridge index: ${t}`);
			return n.publicAnchorBridges[t] ?? null;
		}
	}), l = (e) => {
		let t = new Set(e), n = Object.create(null);
		return Object.defineProperties(n, {
			size: { get: () => t.size },
			has: { value: (e) => t.has(e) },
			entries: { value: () => t.entries() },
			keys: { value: () => t.keys() },
			values: { value: () => t.values() },
			forEach: { value: (e, r) => {
				t.forEach((t) => e.call(r, t, t, n));
			} },
			[Symbol.iterator]: { value: () => t[Symbol.iterator]() },
			[Symbol.toStringTag]: { value: "Set" }
		}), Object.freeze(n);
	}, u = Object.freeze({
		...e.documentLayoutFacts,
		kinsoku: Object.freeze({
			enabled: e.documentLayoutFacts.kinsoku.enabled,
			lineStartForbidden: l(e.documentLayoutFacts.kinsoku.lineStartForbidden),
			lineEndForbidden: l(e.documentLayoutFacts.kinsoku.lineEndForbidden)
		})
	}), d = Object.freeze({
		blocks: n,
		bodyLayoutInput: t,
		section: e.section,
		documentLayoutSettings: u,
		fonts: e.fonts,
		fontFamilyCharsets: e.fontFamilyCharsets,
		mathOccurrences: e.mathOccurrences,
		imageMetadata: e.imageMetadata,
		hasPaginationFields: e.hasPaginationFields,
		requiresDomVerticalGlyphLayout: e.requiresDomVerticalGlyphLayout,
		fatalParse: e.fatalParse,
		acquisition: c,
		paintResources: qn(e.paintDescriptors)
	});
	return Gw.add(d), d;
}
function Qw(e) {
	let { bodyLayoutInput: t, ...n } = e;
	return Zw(n, Fn(t, "layout source body input"));
}
function $w(e) {
	return `${e.story}:${e.storyInstance}`;
}
function eT(e) {
	Fn(e.body, "layout source body blocks"), Fn(e.stories, "layout source story blocks"), Fn(e.footnotes, "layout source footnotes"), Fn(e.endnotes, "layout source endnotes");
	let t = /* @__PURE__ */ new Map();
	for (let { source: n, body: r } of e.stories) {
		if (n.path.length !== 0) throw TypeError("Story repository roots require an empty source path");
		if (n.story !== "header" && n.story !== "footer" && n.story !== "textbox") throw TypeError(`Unsupported repository story kind: ${n.story}`);
		let e = $w(n);
		if (t.has(e)) throw TypeError(`Duplicate story source: ${e}`);
		t.set(e, r);
	}
	let n = (e, t) => {
		let n = /* @__PURE__ */ new Map();
		for (let r of e) {
			if (n.has(r.id)) throw TypeError(`Duplicate ${t} story source: ${r.id}`);
			n.set(r.id, r.content);
		}
		return n;
	}, r = n(e.footnotes, "footnote"), i = n(e.endnotes, "endnote"), a = (n) => {
		if (n.path.length !== 0) throw Error("Story lookup requires a root-only source");
		if (n.story === "body" && n.storyInstance === "body") return e.body;
		if (n.story === "footnote") {
			let e = r.get(n.storyInstance);
			if (e) return e;
		}
		if (n.story === "endnote") {
			let e = i.get(n.storyInstance);
			if (e) return e;
		}
		let a = t.get($w(n));
		if (a) return a;
		throw Error(`Unknown ${n.story} story source: ${n.storyInstance}`);
	}, o = /* @__PURE__ */ new Map(), s = [], c = (e, t, n = []) => {
		e.forEach((e, r) => {
			let i = [...n, r];
			if (e.type !== "paragraph" && e.type !== "table") return;
			let a = {
				...t,
				path: i
			}, l = B(a);
			if (o.has(l)) throw TypeError(`Duplicate block source: ${l}`);
			o.set(l, e), s.push(Object.freeze({
				...a,
				path: Object.freeze([...i])
			})), e.type === "table" && e.rows.forEach((e, n) => e.cells.forEach((e, r) => {
				c(e.content, t, [
					...i,
					n,
					r
				]);
			}));
		});
	};
	c(e.body, {
		story: "body",
		storyInstance: "body",
		path: []
	});
	for (let { source: t, body: n } of e.stories) c(n, t);
	for (let t of e.footnotes) c(t.content, {
		story: "footnote",
		storyInstance: t.id,
		path: []
	});
	for (let t of e.endnotes) c(t.content, {
		story: "endnote",
		storyInstance: t.id,
		path: []
	});
	return Object.freeze({
		body: e.body,
		footnotes: e.footnotes,
		endnotes: e.endnotes,
		sources: Object.freeze(s),
		resolve(e) {
			let t = o.get(B(e));
			if (!t) throw Error(`Unknown block source: ${B(e)}`);
			return t;
		},
		storyRoot: a
	});
}
//#endregion
//#region packages/docx/src/layout/typography-input.ts
function tT(e) {
	let t = e.__typographyAcquisition;
	if (t !== void 0) return V({
		sourceText: "text" in e ? e.text : e.fallbackText,
		...t
	}, "DOCX run typography acquisition input");
}
function nT(e) {
	let t = e.__paragraphTypographyAcquisition;
	if (t !== void 0) return V(t, "DOCX paragraph typography acquisition input");
}
//#endregion
//#region packages/docx/src/layout/adjacent-tables.ts
function rT(e, t) {
	let n = t[0].logicalTotalRows, r = 0;
	for (let i of t) {
		if (i.logicalTotalRows !== n || !Number.isInteger(i.rowCount) || i.rowCount < 0 || i.logicalRowOffset !== r) throw Error(`Parser-owned adjacent table sequence ${e} is inconsistent`);
		r += i.rowCount;
	}
	if (r !== n) throw Error(`Parser-owned adjacent table sequence ${e} is incomplete`);
}
function iT(e) {
	let t = [], n = null, r = [], i = () => {
		r.length > 0 && rT(n, r), r.length === 1 ? t.push(Object.freeze({
			kind: "body-element",
			element: r[0].element
		})) : r.length > 1 && t.push(Object.freeze({
			kind: "adjacent-table-group",
			logicalSequenceId: n,
			tables: Object.freeze(r.map((e) => e.element))
		})), n = null, r = [];
	};
	for (let { element: a, table: o } of e) {
		if (a.type === "table" && o !== null) {
			r.length > 0 && n !== o.logicalSequenceId && i(), n = o.logicalSequenceId, r.push(Object.freeze({
				element: a,
				logicalRowOffset: o.logicalRowOffset,
				logicalTotalRows: o.logicalTotalRows,
				rowCount: o.rowCount
			}));
			continue;
		}
		i(), t.push(Object.freeze({
			kind: "body-element",
			element: a
		}));
	}
	return i(), Object.freeze(t);
}
//#endregion
//#region packages/docx/src/layout/body-layout-input.ts
function aT(e) {
	switch (e) {
		case "continuous":
		case "nextColumn":
		case "nextPage":
		case "oddPage":
		case "evenPage": return e;
		default: return "nextPage";
	}
}
function oT(e, t, n) {
	let r = n === null ? null : `section:${n}`, i = (n) => e[n] === null ? null : {
		story: t,
		storyInstance: r === null ? n : `${r}:${n}`,
		path: []
	};
	return Object.freeze({
		default: i("default"),
		first: i("first"),
		even: i("even")
	});
}
function sT(e) {
	return {
		...e.geometry,
		titlePage: e.titlePage,
		evenAndOddHeaders: !1,
		sectionStart: e.startType,
		columns: e.columns,
		textDirection: e.textDirection,
		docGridType: e.docGridType,
		docGridLinePitch: e.docGridLinePitch,
		docGridCharSpace: e.docGridCharSpace,
		pageNumType: e.pageNumType,
		vAlign: e.vAlign,
		lineNumbering: e.lineNumbering
	};
}
function cT(e, t) {
	let n = e.markerBodyIndex;
	return Object.freeze({
		sectionOccurrenceId: e.sectionOccurrenceId,
		source: Object.freeze(n === null ? {
			story: "body",
			storyInstance: "body",
			path: Object.freeze([])
		} : {
			story: "body",
			storyInstance: "body",
			path: Object.freeze([n])
		}),
		startType: aT(e.startType),
		context: Object.freeze(Qu(sT(e), e.sectionBidi)),
		pageNumbering: Object.freeze({
			start: e.pageNumType?.start ?? null,
			format: e.pageNumType?.fmt ?? null
		}),
		titlePage: e.titlePage,
		evenAndOddHeaders: t.evenAndOddHeaders,
		headers: oT(e.headers, "header", n),
		footers: oT(e.footers, "footer", n),
		pageBordersAuthored: e.pageBordersAuthored,
		pageBorders: e.pageBorders,
		pageLayout: Object.freeze({
			physicalGeometry: Object.freeze({ ...e.geometry }),
			columns: e.columns,
			textDirection: e.textDirection ?? "lrTb",
			gutterPt: e.gutterPt,
			rtlGutter: e.rtlGutter,
			...t.pageLayoutSettings
		})
	});
}
function lT(e) {
	let t = new Map(e.sectionIndex.occurrences.map((t) => [t.sectionOccurrenceId, cT(t, e)])), n = e.sectionIndex.occurrences[0];
	if (!n) throw Error("DOCX body requires a final section owner");
	let r = t.get(n.sectionOccurrenceId), i = e.sequence.map((e) => {
		if (e.kind !== "begin-section") return e;
		let n = t.get(e.section.sectionOccurrenceId);
		if (!n) throw Error(`Missing body section owner: ${e.section.sectionOccurrenceId}`);
		return Object.freeze({
			...e,
			section: n
		});
	});
	return V({
		source: {
			story: "body",
			storyInstance: "body",
			path: []
		},
		initialSection: r,
		sequence: i.map((e, t) => {
			if (e.kind !== "body-block" || e.block.kind !== "paragraph") return e;
			let n = fh(i, t);
			return n === void 0 ? e : Object.freeze({
				...e,
				block: Object.freeze({
					...e.block,
					continuousSectionRole: n
				})
			});
		}),
		parserDiagnostics: e.parserDiagnostics ?? [],
		endnoteIds: e.endnoteIds ?? [],
		noteLayoutSettings: e.noteLayoutSettings
	}, "DOCX body layout input");
}
//#endregion
//#region packages/docx/src/layout/paragraph-visibility.ts
function uT(e) {
	return !(e.runs ?? []).some((e) => e.type === "text" ? e.text.length > 0 : !0);
}
//#endregion
//#region packages/docx/src/parser-model.ts
var dT = /* @__PURE__ */ new WeakMap();
function fT(e) {
	return dT.get(e) ?? [];
}
function pT(e) {
	let t = fT(e);
	if (t.length === 0) return e.runs;
	let n = [], r = 0;
	for (let i = 0; i <= e.runs.length; i += 1) {
		for (; t[r]?.publicRunIndex === i;) n.push(t[r].run), r += 1;
		i < e.runs.length && n.push(e.runs[i]);
	}
	return n;
}
function mT(e) {
	return fT(e).length > 0;
}
function hT(e) {
	let t = e.__documentTypographySettings?.normalStyleFontSizePt;
	return V({ normalStyleFontSizePt: typeof t == "number" && Number.isFinite(t) && t > 0 ? t : 10 }, "DOCX document typography settings input");
}
function gT(e) {
	let t = e.__pageLayoutSettings;
	return V({
		mirrorMargins: t?.mirrorMargins === !0,
		gutterAtTop: t?.gutterAtTop === !0,
		bookFoldPrinting: t?.bookFoldPrinting === !0,
		bookFoldRevPrinting: t?.bookFoldRevPrinting === !0,
		printTwoOnOne: t?.printTwoOnOne === !0
	}, "DOCX page layout settings input");
}
function _T(e) {
	let t = e.__noteLayoutSettings;
	return V({
		footnotePosition: t?.footnotePosition ?? "pageBottom",
		endnotePosition: t?.endnotePosition ?? "docEnd"
	}, "DOCX note layout settings input");
}
function vT(e) {
	return Object.freeze(e ? Object.fromEntries(Object.entries(e).filter((e) => typeof e[1] == "number")) : {});
}
function yT(e) {
	return Object.freeze({
		...e,
		pageGeometry: vT(e.pageGeometry)
	});
}
var bT = /* @__PURE__ */ new WeakMap(), xT = /* @__PURE__ */ new WeakMap(), ST = /* @__PURE__ */ new WeakMap(), CT = /* @__PURE__ */ new WeakMap(), wT = /* @__PURE__ */ new WeakMap();
function TT(e) {
	let t = ST.get(e);
	if (t) return t;
	let n = V({
		table: e.__tableLayout ?? null,
		rows: e.rows.map((e) => ({
			row: e.__tableRowLayout ?? null,
			cells: e.cells.map((e) => e.__tableCellLayout ?? null)
		}))
	}, "DOCX table acquisition input");
	return ST.set(e, n), n;
}
var ET = (e) => e != null && Number.isFinite(e) ? e : null;
function DT(e) {
	return V({
		colWidths: (e.colWidths ?? []).map((e) => Number.isFinite(e) && e >= 0 ? e : 0),
		layout: e.layout ?? null,
		widthPt: ET(e.widthPt),
		widthPct: ET(e.widthPct),
		rows: e.rows.map((e) => ({
			gridBefore: ET(e.gridBefore) ?? 0,
			gridAfter: ET(e.gridAfter) ?? 0,
			cells: e.cells.map((e) => ({
				colSpan: ET(e.colSpan) ?? 1,
				widthPt: ET(e.widthPt),
				widthPct: ET(e.widthPct)
			}))
		}))
	}, "DOCX table column semantic input");
}
function OT(e) {
	let t = wT.get(e);
	if (t) return t;
	let n = Nn({
		semantic: DT(e),
		lexical: TT(e),
		format: VT(e)
	});
	return wT.set(e, n), n;
}
function kT(e) {
	return OT(e).format.ordinaryFlow;
}
function AT(e) {
	return OT(e).format.positioning === null ? null : e.tblpPr ?? null;
}
function jT(e) {
	return {
		leftFromTextPt: e.leftFromText,
		rightFromTextPt: e.rightFromText,
		topFromTextPt: e.topFromText,
		bottomFromTextPt: e.bottomFromText,
		horzAnchor: e.horzAnchor,
		horzSpecified: e.horzSpecified,
		vertAnchor: e.vertAnchor,
		xPt: e.tblpX,
		yPt: e.tblpY,
		...e.tblpXSpec == null ? {} : { xAlign: e.tblpXSpec },
		...e.tblpYSpec == null ? {} : { yAlign: e.tblpYSpec }
	};
}
function MT(e, t) {
	if (e === null) return null;
	let n = e.trim(), r = t && n.endsWith("%") ? n.slice(0, -1) : n;
	if (r.length === 0) return null;
	let i = Number(r);
	return Number.isFinite(i) ? i : null;
}
function NT(e) {
	let t = MT(e ?? null, !1);
	return t === null ? null : t / 20;
}
function PT(e) {
	return e === "exact" || e === "atLeast" ? e : "auto";
}
function FT(e) {
	return {
		rule: Zl(PT(e.rule), e.ruleAuthored),
		valuePt: NT(e.value)
	};
}
function IT(e) {
	if (e.rowHeight === null || !Number.isFinite(e.rowHeight)) return null;
	let t = PT(e.rowHeightRule);
	return {
		rule: t === "auto" ? "atLeast" : t,
		valuePt: e.rowHeight
	};
}
function LT(...e) {
	for (let t of e) {
		if (!t) continue;
		let e = Ql(Aw(t), Mw(t));
		if (e !== null) return e;
	}
	return null;
}
function RT(e, t, n) {
	if (!e) return null;
	let r = Aw(e);
	return $l({
		kind: r,
		dxaValuePt: r === "dxa" ? NT(e.value ?? "0") : null,
		scope: t,
		edge: n
	});
}
function zT(e, t, n, r, i, a, o) {
	let s = e.bidiVisual === !0, c = (e, t) => {
		let n = t === "left" ? s ? "end" : "start" : s ? "start" : "end";
		return {
			width: e?.[t] ?? e?.[n],
			edge: n
		};
	}, l = (e, ...t) => {
		for (let n of t) {
			let t = RT(n.width, n.scope, n.edge ?? e);
			if (t !== null) return t;
		}
		return null;
	}, u = c(r, "left"), d = c(i, "left"), f = c(a, "left"), p = c(o, "left"), m = c(r, "right"), h = c(i, "right"), g = c(a, "right"), _ = c(o, "right"), v = (e) => !n && e != null && Number.isFinite(e) ? e : null;
	return {
		top: l("top", {
			width: r?.top,
			scope: "cell"
		}) ?? v(t.marginTop) ?? l("top", {
			width: i?.top,
			scope: "exception"
		}, {
			width: a?.top,
			scope: "table"
		}, {
			width: o?.top,
			scope: "style"
		}) ?? e.cellMarginTop,
		bottom: l("bottom", {
			width: r?.bottom,
			scope: "cell"
		}) ?? v(t.marginBottom) ?? l("bottom", {
			width: i?.bottom,
			scope: "exception"
		}, {
			width: a?.bottom,
			scope: "table"
		}, {
			width: o?.bottom,
			scope: "style"
		}) ?? e.cellMarginBottom,
		left: l(u.edge, {
			...u,
			scope: "cell"
		}) ?? v(t.marginLeft) ?? l(d.edge, {
			...d,
			scope: "exception"
		}, {
			...f,
			scope: "table"
		}, {
			...p,
			scope: "style"
		}) ?? e.cellMarginLeft,
		right: l(m.edge, {
			...m,
			scope: "cell"
		}) ?? v(t.marginRight) ?? l(h.edge, {
			...h,
			scope: "exception"
		}, {
			...g,
			scope: "table"
		}, {
			..._,
			scope: "style"
		}) ?? e.cellMarginRight
	};
}
function BT(e) {
	if (!e) return null;
	let t = e.indent ? Aw(e.indent) : null;
	return {
		preferredWidthAuthored: e.preferredWidth != null,
		preferredWidth: jw(e.preferredWidth),
		layout: e.layout?.kind === "fixed" || e.layout?.kind === "autofit" ? e.layout.kind : null,
		justification: e.justification,
		indentAuthored: e.indent != null && (t === "dxa" || t === "nil"),
		indentPt: t === "nil" ? 0 : Mw(e.indent),
		borders: e.borders
	};
}
function VT(e) {
	let t = CT.get(e);
	if (t) return t;
	let n = TT(e), r = n.table?.ordinaryFlow ?? e.tblpPr == null, i = e.rows.map((t, r) => {
		let i = n.rows[r]?.row ?? null, a = i?.exception ?? null;
		return {
			height: i?.height ? FT(i.height) : IT(t),
			cantSplit: t.cantSplit === !0,
			repeatedHeader: t.isHeader === !0,
			cellSpacingPt: LT(i?.cellSpacing, a?.cellSpacing, n.table?.cellSpacing, i?.styleCellSpacing) ?? 0,
			justification: i?.justification ?? a?.justification ?? null,
			exception: BT(a),
			cells: t.cells.map((t, o) => ({ marginsPt: zT(e, t, n.rows[r]?.cells[o] !== null && n.rows[r]?.cells[o] !== void 0, n.rows[r]?.cells[o]?.margins, a?.cellMargins, n.table?.cellMargins, i?.styleCellMargins) }))
		};
	}), a = V({
		effectiveStyleId: n.table?.effectiveStyleId ?? null,
		ordinaryFlow: r,
		logicalSequenceId: n.table?.logicalSequenceId ?? null,
		logicalRowOffset: n.table?.logicalRowOffset ?? 0,
		logicalTotalRows: n.table?.logicalTotalRows ?? 0,
		positioning: r || e.tblpPr == null ? null : jT(e.tblpPr),
		rows: i,
		firstRowException: i[0]?.exception ?? null
	}, "DOCX table format input");
	return CT.set(e, a), a;
}
function HT(e) {
	return Object.freeze(e.map((e) => {
		if (e.type !== "table") return Object.freeze({
			element: e,
			table: null
		});
		let t = VT(e);
		return t.logicalSequenceId == null ? Object.freeze({
			element: e,
			table: null
		}) : Object.freeze({
			element: e,
			table: Object.freeze({
				logicalSequenceId: t.logicalSequenceId,
				logicalRowOffset: t.logicalRowOffset ?? 0,
				logicalTotalRows: t.logicalTotalRows ?? 0,
				rowCount: e.rows.length
			})
		});
	}));
}
var UT = (e) => Object.freeze({
	story: "body",
	storyInstance: "body",
	path: Object.freeze([e])
}), WT = new Set([
	"paragraph",
	"line",
	"character"
]);
function GT(e, t, n) {
	if (e.type !== "shape" && e.type !== "image" && e.type !== "chart" || nE(e) !== void 0 || !co(e.wrapMode) || e.type !== "shape" && !e.anchor || e.widthPt <= 0 || e.heightPt <= 0) return null;
	let r = e.anchorXRelativeFrom ?? (e.anchorXFromMargin ? "margin" : "page"), i = e.anchorYRelativeFrom ?? (e.anchorYFromPara ? "paragraph" : "page"), a = `${t.story}:${t.storyInstance}:${t.path.join(".")}`;
	return Object.freeze({
		occurrenceId: e.type === "shape" ? `public-shape:${a}:${n}` : `public-anchor:${a}:${n}`,
		pageOwned: !WT.has(r) && !WT.has(i)
	});
}
function KT(e, t) {
	let n = new Set([
		"paragraph",
		"line",
		"character"
	]), r = Object.freeze([...new Set(pT(e).flatMap((e, r) => {
		let i = e;
		if (e.type !== "shape" && e.type !== "image" && e.type !== "chart" && i.type !== "unavailableDrawing") return [];
		let a = nE(i);
		if (!a) {
			let e = i.type === "unavailableDrawing" ? null : GT(i, t, r);
			return e?.pageOwned ? [e.occurrenceId] : [];
		}
		return a.horizontal.relativeFromStatus !== "valid" || a.vertical.relativeFromStatus !== "valid" || a.horizontal.relativeFrom === null || a.vertical.relativeFrom === null || a.wrap.kind === "none" || n.has(a.horizontal.relativeFrom) || n.has(a.vertical.relativeFrom) ? [] : [st(t, a.occurrenceId)];
	}))]);
	return Object.freeze({
		kind: "paragraph",
		source: t,
		pageBreakBefore: e.pageBreakBefore === !0,
		keepLines: e.keepLines === !0,
		keepNext: e.keepNext === !0,
		widowControl: e.widowControl !== !1,
		spaceBeforePt: e.spaceBefore ?? 0,
		spaceAfterPt: e.spaceAfter ?? 0,
		contextualSpacing: e.contextualSpacing === !0,
		styleId: e.styleId ?? null,
		inkless: !mT(e) && uT(e),
		onlyVisibleText: e.runs.every((e) => e.type === "text") && e.runs.some((e) => e.type === "text" && /\S/u.test(e.text)),
		...r.length === 0 ? {} : { pageOwnedAnchorOccurrenceIds: r }
	});
}
function qT(e, t) {
	let n = AT(t);
	return Object.freeze({
		kind: "table",
		source: e,
		...n?.vertAnchor === "page" || n?.vertAnchor === "margin" ? { pageOwnedFloatingTable: !0 } : {}
	});
}
function JT(e, t) {
	let n = 0;
	return Object.freeze(iT(HT(e)).map((e) => {
		if (e.kind === "adjacent-table-group") {
			let t = n;
			return n += e.tables.length, Object.freeze({
				kind: "adjacent-table-group",
				logicalSequenceId: e.logicalSequenceId,
				source: UT(t),
				tables: Object.freeze(e.tables.map((e, n) => Object.freeze({
					...qT(UT(t + n), e),
					rowCount: e.rows.length
				})))
			});
		}
		let r = e.element, i = n, a = UT(i);
		if (n += 1, r.type === "paragraph") return r.markVanish === !0 && !mT(r) && uT(r) ? Object.freeze({
			kind: "consume-source",
			source: a,
			reason: "hidden-paragraph"
		}) : Object.freeze({
			kind: "body-block",
			block: KT(r, a)
		});
		if (r.type === "table") return Object.freeze({
			kind: "body-block",
			block: qT(a, r)
		});
		if (r.type === "pageBreak" || r.type === "columnBreak") return Object.freeze({
			kind: "authored-break",
			source: a,
			break: r.type === "pageBreak" ? "page" : "column",
			...r.type === "pageBreak" && r.origin !== void 0 ? { origin: r.origin } : {},
			...r.type === "pageBreak" && r.parity !== void 0 ? { parity: r.parity } : {},
			...r.type === "pageBreak" && r.sameParagraphAsPrevious === !0 ? { sameSourceParagraphAsPrevious: !0 } : {}
		});
		if (r.type === "sectionBreak") return Object.freeze({
			kind: "begin-section",
			source: a,
			section: t(i)
		});
		throw Error(`Unsupported body layout source at ${i}`);
	}));
}
function YT(e, t, n, r = t) {
	return Ww(OT(e), t, (t, r) => n(e.rows[t].cells[r]), r);
}
function XT(e, t, n) {
	if (!t || typeof t != "object") return;
	let r = xT.get(e);
	r || (r = /* @__PURE__ */ new WeakMap(), xT.set(e, r)), r.set(t, n);
}
function ZT(e) {
	let t = /* @__PURE__ */ new Map(), n = 0;
	e.body.forEach((e, r) => {
		if (e.type !== "sectionBreak") return;
		let i = e.__sectionPlacement;
		t.set(r, V({
			sectionId: i?.sectionId ?? `section:${n}`,
			sectionBidi: i?.sectionBidi === !0,
			vAlign: i?.vAlign ?? null,
			lineNumbering: i?.lineNumbering ?? null,
			docGridType: i?.docGridType ?? null,
			docGridLinePitch: i?.docGridLinePitch ?? null,
			docGridCharSpace: i?.docGridCharSpace ?? null,
			gutterPt: i?.gutterPt ?? null,
			rtlGutter: i?.rtlGutter ?? null,
			pageBordersAuthored: i?.pageBordersAuthored ?? !1,
			pageBorders: i?.pageBorders ?? null,
			pageGeometry: i?.pageGeometry ?? e.geom ?? {}
		}, "DOCX ending-section placement input")), n += 1;
	});
	let r = e.section?.__sectionPlacement;
	return Object.freeze({
		endingSections: t,
		finalSection: V({
			sectionId: r?.sectionId ?? `section:${n}`,
			sectionBidi: r?.sectionBidi === !0,
			vAlign: r?.vAlign ?? e.section?.vAlign ?? null,
			lineNumbering: r?.lineNumbering ?? e.section?.lineNumbering ?? null,
			docGridType: r?.docGridType ?? e.section?.docGridType ?? null,
			docGridLinePitch: r?.docGridLinePitch ?? e.section?.docGridLinePitch ?? null,
			docGridCharSpace: r?.docGridCharSpace ?? e.section?.docGridCharSpace ?? null,
			gutterPt: r?.gutterPt ?? null,
			rtlGutter: r?.rtlGutter ?? null,
			pageBordersAuthored: r?.pageBordersAuthored ?? e.section?.pageBorders != null,
			pageBorders: r?.pageBorders ?? e.section?.pageBorders ?? null,
			pageGeometry: r?.pageGeometry ?? (e.section ? Xu(e.section) : {})
		}, "DOCX final-section placement input")
	});
}
var QT = Object.freeze({
	default: null,
	first: null,
	even: null
});
function $T(e) {
	let t = [], n = ZT(e), r = 0;
	e.body.forEach((e, i) => {
		if (e.type !== "sectionBreak") return;
		let a = n.endingSections.get(i) ?? n.finalSection, o = t.length;
		t.push({
			sectionOccurrenceId: a.sectionId,
			ordinal: o,
			startBodyIndex: r,
			endBodyIndex: i,
			markerBodyIndex: i,
			final: !1,
			startType: e.kind ?? "nextPage",
			columns: e.columns ?? null,
			authoredGeometry: vT(a.pageGeometry),
			textDirection: e.textDirection ?? null,
			pageNumType: e.pageNumType ?? null,
			headers: e.headers ?? QT,
			footers: e.footers ?? QT,
			titlePage: e.titlePage ?? !1,
			sectionBidi: a.sectionBidi,
			vAlign: a.vAlign,
			lineNumbering: a.lineNumbering,
			docGridType: a.docGridType,
			docGridLinePitch: a.docGridLinePitch,
			docGridCharSpace: a.docGridCharSpace,
			authoredGutterPt: a.gutterPt,
			rtlGutter: a.rtlGutter === !0,
			pageBordersAuthored: a.pageBordersAuthored,
			pageBorders: a.pageBorders,
			placement: yT(a)
		}), r = i + 1;
	});
	let i = n.finalSection;
	t.push({
		sectionOccurrenceId: i.sectionId,
		ordinal: t.length,
		startBodyIndex: r,
		endBodyIndex: e.body.length - 1,
		markerBodyIndex: null,
		final: !0,
		startType: e.section.sectionStart ?? "nextPage",
		columns: e.section.columns ?? null,
		authoredGeometry: i.pageGeometry == null ? Xu(e.section) : vT(i.pageGeometry),
		textDirection: e.section.textDirection ?? null,
		pageNumType: e.section.pageNumType ?? null,
		headers: e.headers ?? QT,
		footers: e.footers ?? QT,
		titlePage: e.section.titlePage,
		sectionBidi: i.sectionBidi,
		vAlign: i.vAlign,
		lineNumbering: i.lineNumbering,
		docGridType: i.docGridType,
		docGridLinePitch: i.docGridLinePitch,
		docGridCharSpace: i.docGridCharSpace,
		authoredGutterPt: i.gutterPt,
		rtlGutter: i.rtlGutter === !0,
		pageBordersAuthored: i.pageBordersAuthored,
		pageBorders: i.pageBorders,
		placement: yT(i)
	});
	let a = Array(t.length), o = Xu(e.section), s = null, c = null;
	for (let e = t.length - 1; e >= 0; --e) {
		let n = t[e], r = n.startType === "continuous" && s !== null ? s : o, i = n.authoredGeometry, l = {
			pageWidth: i.pageWidth ?? r.pageWidth,
			pageHeight: i.pageHeight ?? r.pageHeight,
			marginTop: i.marginTop ?? r.marginTop,
			marginRight: i.marginRight ?? r.marginRight,
			marginBottom: i.marginBottom ?? r.marginBottom,
			marginLeft: i.marginLeft ?? r.marginLeft,
			headerDistance: i.headerDistance ?? r.headerDistance,
			footerDistance: i.footerDistance ?? r.footerDistance
		}, u = n.authoredGutterPt ?? (n.startType === "continuous" ? c : null) ?? 0, { authoredGeometry: d, authoredGutterPt: f, ...p } = n;
		a[e] = {
			...p,
			geometry: l,
			gutterPt: u
		}, s = l, c = u;
	}
	return V({
		bodyLength: e.body.length,
		occurrences: a
	}, "DOCX body section index input");
}
function eE(e) {
	let t = $T(e), n = /* @__PURE__ */ new Map();
	for (let e of t.occurrences) e.startBodyIndex !== 0 && n.set(e.startBodyIndex - 1, e);
	let r = JT(e.body, (e) => {
		let t = n.get(e);
		if (!t) throw Error(`Missing incoming body section at ${e}`);
		return Object.freeze({
			sectionOccurrenceId: t.sectionOccurrenceId,
			startType: t.startType
		});
	});
	return V({
		sectionIndex: t,
		evenAndOddHeaders: e.section.evenAndOddHeaders,
		endnoteIds: (e.endnotes ?? []).map((e) => e.id),
		noteLayoutSettings: _T(e),
		pageLayoutSettings: gT(e),
		parserDiagnostics: sr(e.diagnostics, e.body.length),
		sequence: r
	}, "DOCX body layout acquisition input");
}
function tE(e) {
	let t = e.textPath;
	if (t) return V({
		string: t.string,
		...t.fontFamily === void 0 ? {} : { fontFamily: t.fontFamily },
		bold: t.bold ?? !1,
		italic: t.italic ?? !1,
		...t.textPathOk === void 0 ? {} : { textPathOk: t.textPathOk },
		...t.on === void 0 ? {} : { on: t.on },
		...t.fitShape === void 0 ? {} : { fitShape: t.fitShape },
		...t.fitPath === void 0 ? {} : { fitPath: t.fitPath },
		...t.trim === void 0 ? {} : { trim: t.trim },
		...t.xScale === void 0 ? {} : { xScale: t.xScale },
		...t.fontSizePt === void 0 ? {} : { fontSizePt: t.fontSizePt }
	}, "DOCX VML text path acquisition input");
}
function nE(e) {
	let t = e.__anchorAcquisition;
	if (t !== void 0) return V(t, "DOCX anchor acquisition input");
}
function rE(e, t) {
	let n = dE(e).fontFacts, r = n?.rtl === !0 || n?.cs === !0, i = r ? n?.fontSizeCs ?? n?.fontSize ?? t : n?.fontSize ?? t, a = n?.fontFamily ?? e.fontFamily ?? null, o = {
		ascii: a,
		highAnsi: n?.fontFamilyHighAnsi ?? a,
		eastAsia: n?.fontFamilyEastAsia ?? e.fontFamilyEastAsia ?? a,
		complexScript: n?.fontFamilyCs ?? a
	}, s = n?.fontSlots;
	return Object.freeze({
		fontSizePt: i,
		fonts: Object.freeze({ ...s?.direct ?? o }),
		themeFonts: s?.theme ? Object.freeze({ ...s.theme }) : void 0,
		themeFontPresence: s?.themePresent ? Object.freeze({ ...s.themePresent }) : void 0,
		weight: (r ? n?.boldCs ?? !1 : n?.bold ?? !1) ? 700 : 400,
		style: (r ? n?.italicCs ?? !1 : n?.italic ?? !1) ? "italic" : "normal",
		complexScript: r,
		fontHint: n?.fontHint,
		eastAsiaLanguage: n?.langEastAsia,
		kerning: n?.kerning == null ? void 0 : i >= n.kerning
	});
}
function iE(e, t) {
	let n = e.textBoxContent;
	return n === void 0 ? V({
		kind: "compatibility",
		source: t,
		paragraphs: og(e, t, rE)
	}, "DOCX public text box acquisition input") : V({
		kind: "complete",
		source: t,
		blockCount: n.length
	}, "DOCX complete text box acquisition input");
}
function aE(e) {
	let t = fE(e).paragraphMarkFontFacts;
	if (!t) return;
	let n = t.rtl === !0 || t.cs === !0, r = e.runs.find((e) => e.type === "text" || e.type === "field")?.fontSize ?? e.defaultFontSize ?? 10, i = n ? t.fontSizeCs ?? t.fontSize ?? r : t.fontSize ?? r, a = t.fontFamily ?? e.defaultFontFamily ?? null, o = {
		ascii: a,
		highAnsi: t.fontFamilyHighAnsi ?? a,
		eastAsia: t.fontFamilyEastAsia ?? e.defaultFontFamilyEastAsia ?? a,
		complexScript: t.fontFamilyCs ?? a
	};
	return Object.freeze({
		fontSizePt: i,
		fonts: Object.freeze({ ...t.fontSlots?.direct ?? o }),
		themeFonts: t.fontSlots?.theme ? Object.freeze({ ...t.fontSlots.theme }) : void 0,
		themeFontPresence: t.fontSlots?.themePresent ? Object.freeze({ ...t.fontSlots.themePresent }) : void 0,
		weight: (n ? t.boldCs ?? !1 : t.bold ?? !1) ? 700 : 400,
		style: (n ? t.italicCs ?? !1 : t.italic ?? !1) ? "italic" : "normal",
		complexScript: n,
		fontHint: t.fontHint,
		eastAsiaLanguage: t.langEastAsia,
		kerning: t.kerning == null ? void 0 : i >= t.kerning
	});
}
function oE(e, t) {
	let n = e, { layoutLines: r, lineSlice: i, runs: a, paragraphMarkFontFacts: o, __paragraphTypographyAcquisition: s, __complexFieldBoundaries: c, __runRevisions: l, ...u } = e, d = nT(n), f = e.__complexFieldBoundaries?.map((e) => ({
		occurrenceKey: [
			"complex-field",
			t.story,
			t.storyInstance,
			t.path.slice(0, -1).join("."),
			String(e.occurrenceId)
		].join(":"),
		boundary: e.boundary,
		runIndex: e.runIndex,
		fieldType: e.fieldType,
		instruction: e.instruction,
		...e.hyperlinkAnchor === void 0 ? {} : { hyperlinkAnchor: e.hyperlinkAnchor }
	})), p = u.numbering, m = p == null ? null : (({ fontFacts: e, ...t }) => t)(p), h = structuredClone({
		...u,
		numbering: m
	}), g = fT(n), _ = [];
	if (g.length === 0) n.runs.forEach((e, t) => {
		_.push({
			run: e,
			originalRun: n.runs[t]
		});
	});
	else {
		let e = 0;
		for (let t = 0; t <= n.runs.length; t += 1) {
			for (; g[e]?.publicRunIndex === t;) {
				let t = g[e].run;
				_.push({
					run: t,
					originalRun: t
				}), e += 1;
			}
			t < n.runs.length && _.push({
				run: n.runs[t],
				originalRun: n.runs[t]
			});
		}
	}
	let v = _.map(({ run: e, originalRun: n }, r) => {
		let i = e;
		if (i.type === "unavailableDrawing") {
			let e = nE(n), r = e === void 0 ? void 0 : V({
				...e,
				occurrenceId: st(t, e.occurrenceId)
			}, "DOCX scoped unavailable drawing anchor acquisition input"), { __anchorAcquisition: a, ...o } = i;
			return Object.freeze({
				...o,
				...r === void 0 ? {} : { anchorAcquisitionInput: r }
			});
		}
		if (e.type === "math") {
			let n = Object.freeze({
				...t,
				path: Object.freeze([...t.path, r])
			}), i = e;
			return Object.freeze({
				type: "math",
				display: e.display,
				fontSize: e.fontSize,
				...e.jc === void 0 ? {} : { jc: e.jc },
				source: i.source ?? n,
				resourceKey: i.resourceKey ?? at(n, e.display ? "display" : "inline"),
				fallbackText: K(e.nodes)
			});
		}
		if (e.type === "anchorHost") {
			let { __anchorOccurrenceId: n, ...r } = e;
			return Object.freeze({
				...r,
				...n === void 0 ? {} : { anchorOccurrenceId: st(t, n) }
			});
		}
		if (e.type === "shape" || e.type === "image" || e.type === "chart") {
			let i = nE(n), a = i === void 0 ? void 0 : V({
				...i,
				occurrenceId: st(t, i.occurrenceId)
			}, "DOCX scoped anchor acquisition input"), { __anchorAcquisition: o, ...s } = e;
			if (e.type !== "shape") {
				let n = e.type === "chart" ? (({ chart: e, ...n }) => ({
					...n,
					resourceKey: rt({
						...t,
						path: [...t.path, r]
					})
				}))(s) : s;
				return Object.freeze({
					...structuredClone(n),
					...a === void 0 ? {} : { anchorAcquisitionInput: a }
				});
			}
			let c = n, l = tE(c), u = Object.freeze({
				...t,
				path: Object.freeze([...t.path, r])
			}), d = iE(c, {
				story: "textbox",
				storyInstance: `${u.story}:${u.storyInstance}:${u.path.join(".")}`,
				path: []
			}), { textBoxContent: f, textBlocks: p, textPath: m, ...h } = s;
			return Object.freeze({
				type: "shape",
				...structuredClone(h),
				...l === void 0 ? {} : { vmlTextPathInput: l },
				...(d.kind === "complete" ? d.blockCount : d.paragraphs.length) === 0 ? {} : { textBoxInput: d },
				...a === void 0 ? {} : { anchorAcquisitionInput: a }
			});
		}
		if (e.type === "text" || e.type === "field") {
			let t = tT(n), { __typographyAcquisition: r, __noBreakBefore: i, __noBreakAfter: a, __noBreakHyphenOffsets: o, ...s } = e, c = e.type === "text" ? o?.filter((t) => Number.isInteger(t) && t > 0 && t <= e.text.length).map((e) => Object.freeze({
				start: e - 1,
				end: e
			})) : void 0;
			return Object.freeze({
				...structuredClone(s),
				...i === !0 ? { noBreakBefore: !0 } : {},
				...a === !0 ? { noBreakAfter: !0 } : {},
				...c?.length ? { noBreakRanges: Object.freeze(c) } : {},
				...t === void 0 ? {} : { typographyInput: t }
			});
		}
		return Object.freeze(structuredClone(e));
	});
	return Nn({
		...h,
		runs: v,
		...f?.length ? { complexFieldBoundaries: f } : {},
		numberingMarkerShapeInput: e.numbering ? rE(e.numbering, n.runs.find((e) => e.type === "text" || e.type === "field")?.fontSize ?? e.defaultFontSize ?? 10) : void 0,
		paragraphMarkShapeInput: aE(e),
		...d === void 0 ? {} : { typographyInput: d }
	});
}
function sE(e) {
	return lE(e, !1);
}
function cE(e) {
	return lE(e, !0);
}
function lE(e, t) {
	let n = [], r = (e, a, o, s) => {
		if (e.type === "paragraph") {
			let i = e, c = i.__runRevisions ?? [], l = i.__runRevisions !== void 0, u = [], d = [], f = e.runs.some((e) => e.type === "unavailableDrawing");
			pT(e).forEach((e, i) => {
				let p = c[i] ?? void 0, m = e.revision, h = p === void 0 || m !== void 0 ? e : {
					...e,
					revision: p
				};
				if (h !== e && (l = !0), h.type === "unavailableDrawing") {
					d.push(Object.freeze({
						publicRunIndex: u.length,
						run: V(h, "DOCX unavailable drawing parser sidecar")
					})), f && (l = !0);
					return;
				}
				if (h.type === "math") {
					l = !0;
					let e = Object.freeze({
						story: a,
						storyInstance: o,
						path: Object.freeze([...s, i])
					}), t = at(e, h.display ? "display" : "inline");
					n.push(Object.freeze({
						nodes: h.nodes,
						display: h.display,
						source: e,
						resourceKey: t
					})), u.push(Object.freeze({
						...h,
						source: e,
						resourceKey: t
					}));
					return;
				}
				if (h.type !== "shape") {
					u.push(h);
					return;
				}
				let g = h, _ = g.textBoxContent;
				if (_ === void 0) {
					u.push(h);
					return;
				}
				let v = {
					story: a,
					storyInstance: o,
					path: [...s, i]
				}, y = `${v.story}:${v.storyInstance}:${v.path.join(".")}`, b = !1, x = t ? _ : Array(_.length);
				if (_.forEach((e, t) => {
					if (e.type === "unsupportedTextBoxBlock") {
						x[t] = e;
						return;
					}
					let n = r(e, "textbox", y, [t]);
					n !== e && (b = !0), x[t] = n;
				}), !b) {
					u.push(h);
					return;
				}
				l = !0, t ? (g.textBoxContent = x, u.push(h)) : u.push({
					...h,
					textBoxContent: x
				});
			});
			let p;
			if (t) l && Object.assign(e, { runs: u }), delete e.__runRevisions, p = e;
			else if (l) {
				let { __runRevisions: e, ...t } = i;
				p = {
					...t,
					runs: u
				};
			} else p = e;
			return d.length > 0 && dT.set(p, Object.freeze(d)), p;
		}
		if (e.type === "table") {
			if (t) return e.rows.forEach((e, t) => e.cells.forEach((e, n) => {
				e.content = i(e.content, a, o, [
					...s,
					t,
					n
				]);
			})), e;
			let n = !1, r = e.rows.map((e, t) => {
				let r = !1, c = e.cells.map((e, n) => {
					let c = i(e.content, a, o, [
						...s,
						t,
						n
					]);
					return c === e.content ? e : (r = !0, {
						...e,
						content: c
					});
				});
				return r ? (n = !0, {
					...e,
					cells: c
				}) : e;
			});
			return n ? {
				...e,
				rows: r
			} : e;
		}
		if (e.type !== "sectionBreak") return e;
		let c = s.at(-1) ?? 0, l = !1, u = (e, t) => {
			if (!e) return e;
			let n = e;
			for (let r of [
				"default",
				"first",
				"even"
			]) {
				let a = e[r];
				if (!a) continue;
				let o = i(a.body, t, `section:${c}:${r}`);
				o !== a.body && (n === e && (n = { ...e }), n[r] = {
					...a,
					body: o
				}, l = !0);
			}
			return n;
		}, d = u(e.headers, "header"), f = u(e.footers, "footer");
		return l ? {
			...e,
			headers: d,
			footers: f
		} : e;
	}, i = (e, n, i, a = []) => {
		if (t) {
			for (let t = 0; t < e.length; t += 1) e[t] = r(e[t], n, i, [...a, t]);
			return e;
		}
		let o = !1, s = e.map((e, t) => {
			let s = r(e, n, i, [...a, t]);
			return s !== e && (o = !0), s;
		});
		return o ? s : e;
	}, a = (e, t) => {
		if (!e) return {
			default: null,
			first: null,
			even: null
		};
		let n = e;
		for (let r of [
			"default",
			"first",
			"even"
		]) {
			let a = e[r];
			if (!a) continue;
			let o = i(a.body, t, r);
			o !== a.body && (n === e && (n = { ...e }), n[r] = {
				...a,
				body: o
			});
		}
		return n;
	}, o = i(e.body, "body", "body"), s = a(e.headers, "header"), c = a(e.footers, "footer"), l = (e, n) => {
		if (!e) return e;
		if (t) {
			for (let t of e) t.content = i(t.content, n, t.id);
			return e;
		}
		let r = !1, a = e.map((e) => {
			let t = i(e.content, n, e.id);
			return t === e.content ? e : (r = !0, {
				...e,
				content: t
			});
		});
		return r ? a : e;
	}, u = l(e.footnotes, "footnote"), d = l(e.endnotes, "endnote"), f = o !== e.body || s !== e.headers || c !== e.footers || u !== e.footnotes || d !== e.endnotes ? {
		...e,
		body: o,
		headers: s,
		footers: c,
		footnotes: u,
		endnotes: d
	} : e, p = ZT(f);
	bT.set(f, p), XT(f.body, f.section, p);
	let m, h = () => m ??= eE(f), g = hE();
	return Object.freeze({
		document: f,
		mathOccurrences: Object.freeze(n),
		fontFamilyCharsets: Object.freeze({ ...pE(f).fontFamilyCharsets ?? {} }),
		get bodyLayoutInput() {
			return lT(h());
		},
		bodyModelGateway: Object.freeze({
			acquisitionInputs: g,
			get bodySectionIndex() {
				return h().sectionIndex;
			},
			effectiveTablePositioning: AT,
			publicAnchorBridge: GT
		})
	});
}
function uE(e) {
	return sE(e).document;
}
function dE(e) {
	return e;
}
function fE(e) {
	return e;
}
function pE(e) {
	return e;
}
var mE = Object.freeze({
	numberingMarkerShapeInput: rE,
	paragraphMarkShapeInput: aE,
	tableFormatInput: VT,
	tableColumnLayoutInput: YT,
	tableParticipatesInOrdinaryFlow: kT,
	paragraphAcquisitionInput: oE
});
function hE() {
	let e = /* @__PURE__ */ new WeakMap(), t = (t, n) => {
		let r = e.get(t);
		r || (r = /* @__PURE__ */ new Map(), e.set(t, r));
		let i = B(n), a = r.get(i);
		if (a) return a;
		let o = oE(t, n);
		return r.set(i, o), o;
	};
	return Object.freeze({
		...mE,
		paragraphAcquisitionInput: t
	});
}
//#endregion
//#region packages/docx/src/vertical-render-capability.ts
var gE = new Set([
	"tbRl",
	"tbRlV",
	"tbLrV"
]);
function _E(e) {
	let t = [e], n = /* @__PURE__ */ new Set();
	for (; t.length > 0;) {
		let e = t.pop();
		if (!(typeof e != "object" || !e || n.has(e))) {
			if (n.add(e), !Array.isArray(e)) {
				let t = e;
				if (typeof t.textDirection == "string" && gE.has(t.textDirection)) return !0;
			}
			t.push(...Object.values(e));
		}
	}
	return !1;
}
//#endregion
//#region packages/docx/src/layout-source-model-adapter.ts
var vE = /* @__PURE__ */ new WeakMap();
function yE(e) {
	let t = Zu(), n = e.section ?? {}, r = (e, t) => Number.isFinite(e) ? e : t, i = (e) => ({
		default: e?.default ?? null,
		first: e?.first ?? null,
		even: e?.even ?? null
	});
	return {
		...e,
		body: e.body ?? [],
		section: {
			...t,
			...n,
			pageWidth: r(n.pageWidth, t.pageWidth),
			pageHeight: r(n.pageHeight, t.pageHeight),
			marginTop: r(n.marginTop, t.marginTop),
			marginRight: r(n.marginRight, t.marginRight),
			marginBottom: r(n.marginBottom, t.marginBottom),
			marginLeft: r(n.marginLeft, t.marginLeft),
			headerDistance: r(n.headerDistance, t.headerDistance),
			footerDistance: r(n.footerDistance, t.footerDistance)
		},
		headers: i(e.headers),
		footers: i(e.footers)
	};
}
function bE(e, t, n, r) {
	if (e) for (let i of [
		"default",
		"first",
		"even"
	]) {
		let a = e[i];
		a && r(a.body, {
			story: t,
			storyInstance: n === null ? i : `${n}:${i}`,
			path: []
		});
	}
}
function xE(e, t, n, r = () => {}, i = () => {}) {
	let a = (e, o, s = []) => {
		e.forEach((c, l) => {
			let u = [...s, l];
			if (c.type === "paragraph") {
				let r = {
					...o,
					path: u
				}, s = t.paragraphAcquisitionInput(c, r), d = n(c, r, s);
				d && (e[l] = d);
				let f = 0;
				s.runs.forEach((e, t) => {
					if (e.type === "unavailableDrawing") return;
					let n = c.runs[f++];
					if (e.type !== "shape" || n?.type !== "shape") return;
					let r = n.textBoxContent;
					if (!r) return;
					let s = {
						story: "textbox",
						storyInstance: `${o.story}:${o.storyInstance}:${u.join(".")}.${t}`,
						path: []
					};
					i(r, s), a(r, s);
				});
			} else c.type === "table" ? (r(c, {
				...o,
				path: u
			}), c.rows.forEach((e, t) => e.cells.forEach((e, n) => {
				a(e.content, o, [
					...u,
					t,
					n
				]);
			}))) : c.type === "sectionBreak" && (bE(c.headers, "header", `section:${l}`, a), bE(c.footers, "footer", `section:${l}`, a));
		});
	};
	a(e.body, {
		story: "body",
		storyInstance: "body",
		path: []
	}), bE(e.headers, "header", null, a), bE(e.footers, "footer", null, a);
	for (let t of e.footnotes ?? []) a(t.content, {
		story: "footnote",
		storyInstance: t.id,
		path: []
	});
	for (let t of e.endnotes ?? []) a(t.content, {
		story: "endnote",
		storyInstance: t.id,
		path: []
	});
}
function SE(e) {
	let t = [], n = (e, n) => {
		t.push({
			source: n,
			body: e
		});
	};
	return bE(e.headers, "header", null, n), bE(e.footers, "footer", null, n), e.body.forEach((e, t) => {
		e.type === "sectionBreak" && (bE(e.headers, "header", `section:${t}`, n), bE(e.footers, "footer", `section:${t}`, n));
	}), t;
}
function CE(e) {
	return SE(e).map(({ body: e }) => e);
}
function wE(e) {
	return e ?? Object.freeze([]);
}
function TE(e, t, n, r = []) {
	let i = (e, t, r) => e && Object.fromEntries([
		"default",
		"first",
		"even"
	].map((i) => {
		let a = e[i];
		return [i, a ? {
			...structuredClone(Object.fromEntries(Object.entries(a).filter(([e]) => e !== "body"))),
			body: TE(a.body, {
				story: t,
				storyInstance: `${r}:${i}`,
				path: []
			}, n)
		} : null];
	}));
	return e.map((e, a) => {
		let o = [...r, a];
		if (e.type === "paragraph") {
			let e = n.get(B({
				...t,
				path: o
			}));
			if (!e) throw Error(`Missing canonical paragraph source: ${B({
				...t,
				path: o
			})}`);
			return e;
		}
		if (e.type === "table") {
			let r = structuredClone(e), { __tableLayout: i, ...a } = r;
			return {
				...a,
				rows: r.rows.map((e, r) => {
					let { __tableRowLayout: i, ...a } = e;
					return {
						...a,
						cells: e.cells.map((e, i) => {
							let { __tableCellLayout: a, ...s } = e;
							return {
								...s,
								content: TE(e.content, t, n, [
									...o,
									r,
									i
								])
							};
						})
					};
				})
			};
		}
		if (e.type !== "sectionBreak") return structuredClone(e);
		let { __sectionPlacement: s, headers: c, footers: l, ...u } = e;
		return {
			...structuredClone(u),
			headers: i(e.headers, "header", `section:${a}`),
			footers: i(e.footers, "footer", `section:${a}`)
		};
	});
}
function EE(e) {
	let { __sectionPlacement: t, ...n } = e;
	return structuredClone(n);
}
function DE(e) {
	let t = e;
	return delete t.__sectionPlacement, t;
}
function OE(e, t, n) {
	return Object.fromEntries([
		"default",
		"first",
		"even"
	].map((r) => {
		let i = e[r];
		return [r, i ? {
			...structuredClone(Object.fromEntries(Object.entries(i).filter(([e]) => e !== "body"))),
			body: TE(i.body, {
				story: t,
				storyInstance: r,
				path: []
			}, n)
		} : null];
	}));
}
function kE(e, t, n, r = []) {
	let i = (e, t, r) => {
		if (!e) return e;
		for (let i of [
			"default",
			"first",
			"even"
		]) {
			let a = e[i];
			a && (a.body = kE(a.body, {
				story: t,
				storyInstance: `${r}:${i}`,
				path: []
			}, n));
		}
		return e;
	}, a = e;
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e], s = [...r, e];
		if (o.type === "paragraph") {
			let r = n.get(B({
				...t,
				path: s
			}));
			if (!r) throw Error(`Missing canonical paragraph source: ${B({
				...t,
				path: s
			})}`);
			a[e] = r;
			continue;
		}
		if (o.type === "table") {
			let r = o;
			delete r.__tableLayout, r.rows.forEach((e, r) => {
				let i = e;
				delete i.__tableRowLayout, i.cells.forEach((e, i) => {
					let a = e;
					delete a.__tableCellLayout, a.content = kE(a.content, t, n, [
						...s,
						r,
						i
					]);
				});
			}), a[e] = r;
			continue;
		}
		if (o.type !== "sectionBreak") continue;
		let c = o;
		delete c.__sectionPlacement, c.headers = i(c.headers, "header", `section:${e}`), c.footers = i(c.footers, "footer", `section:${e}`);
	}
	return a;
}
function AE(e, t, n) {
	for (let r of [
		"default",
		"first",
		"even"
	]) {
		let i = e[r];
		i && (i.body = kE(i.body, {
			story: t,
			storyInstance: r,
			path: []
		}, n));
	}
	return e;
}
function jE(e) {
	let t = vE.get(e);
	if (t) return t;
	let n = sE(yE(e));
	return PE(n, n, !1, e);
}
function ME(e, t) {
	return vE.get(e) || PE(cE(yE(e)), cE(yE(t)), !0, e);
}
function NE(e) {
	let t = cE(yE(e));
	return PE(t, t, !0, e).source;
}
function PE(e, t, n, r) {
	let i = t.document, a = t.bodyModelGateway.acquisitionInputs, o = t.bodyLayoutInput, s = Du(i, hT(i)), c = Zn(i, a, t.mathOccurrences, (e) => {
		let t = e.numbering;
		if (!t) throw Error("Picture-bullet metadata requires numbering");
		let n = a.numberingMarkerShapeInput(t, ec(e));
		return {
			widthPt: t.picBulletWidthPt ?? n.fontSizePt,
			heightPt: t.picBulletHeightPt ?? n.fontSizePt
		};
	}), l = wE(i.footnotes), u = wE(i.endnotes), d = Xg(i.body, l, [...CE(i), ...u.map((e) => e.content)]), f = _E(i), p = i.parseError === void 0 ? null : {
		message: i.parseError,
		pageSize: {
			widthPt: i.section.pageWidth,
			heightPt: i.section.pageHeight
		}
	}, m = {
		familyClasses: { ...i.fontFamilyClasses ?? {} },
		familyPitches: { ...i.fontFamilyPitches ?? {} },
		majorFamily: i.majorFont ?? null,
		minorFamily: i.minorFont ?? null,
		embeddedFonts: [...i.embeddedFonts ?? []],
		renderedFamilies: gw(i),
		preloadNames: yw(i),
		scriptCjkLanguage: xw(i),
		defaultBodyFontSizePt: dx(i)
	}, h = /* @__PURE__ */ new Map(), g = [], _ = [], v = [];
	xE(i, a, (e, r, i) => {
		let a = B(r);
		if (h.has(a)) throw Error(`Duplicate paragraph source: ${a}`);
		h.set(a, i);
		let o = 0, s = i.runs.map((n, i) => {
			if (n.type === "unavailableDrawing") return null;
			let a = e.runs[o++];
			return a ? t.bodyModelGateway.publicAnchorBridge(a, r, i) : null;
		});
		return g.push(Object.freeze({
			source: Nn({
				...r,
				path: [...r.path]
			}),
			publicAnchorBridges: Object.freeze(s),
			numberingMarkerFallbackFontSizePt: e.numbering ? ec(e) : null
		})), n ? i : void 0;
	}, (e, t) => {
		_.push(Object.freeze({
			source: Nn({
				...t,
				path: [...t.path]
			}),
			input: OT(e)
		}));
	}, (e, t) => {
		v.push({
			body: e,
			source: t
		});
	}), Object.freeze({
		...a,
		paragraphAcquisitionInput(e, t) {
			let n = h.get(B(t));
			if (!n) throw Error(`Unknown paragraph acquisition source: ${B(t)}`);
			return n;
		}
	});
	let y = n ? kE : TE, b = n ? AE : OE, x = {
		...i,
		body: y(i.body, {
			story: "body",
			storyInstance: "body",
			path: []
		}, h),
		headers: b(i.headers, "header", h),
		footers: b(i.footers, "footer", h),
		footnotes: l.map(({ content: e, ...t }) => ({
			...structuredClone(t),
			content: y(e, {
				story: "footnote",
				storyInstance: t.id,
				path: []
			}, h)
		})),
		endnotes: u.map(({ content: e, ...t }) => ({
			...structuredClone(t),
			content: y(e, {
				story: "endnote",
				storyInstance: t.id,
				path: []
			}, h)
		}))
	}, S = v.map(({ source: e, body: t }) => ({
		source: e,
		body: y(t, e, h)
	}));
	Nn(h);
	let C = Qw({
		bodyLayoutInput: o,
		blockRepository: {
			body: x.body,
			stories: [...SE(x).map(({ source: e, body: t }) => ({
				source: e,
				body: t
			})), ...S],
			footnotes: x.footnotes ?? [],
			endnotes: x.endnotes ?? []
		},
		section: n ? DE(i.section) : EE(i.section),
		documentLayoutFacts: Nn({
			...s,
			kinsoku: {
				enabled: s.kinsoku.enabled,
				lineStartForbidden: [...s.kinsoku.lineStartForbidden].sort((e, t) => e - t),
				lineEndForbidden: [...s.kinsoku.lineEndForbidden].sort((e, t) => e - t)
			}
		}),
		fonts: Nn(m),
		fontFamilyCharsets: t.fontFamilyCharsets,
		acquisitionFacts: Object.freeze({
			paragraphs: Object.freeze(g),
			tables: Object.freeze(_)
		}),
		mathOccurrences: t.mathOccurrences,
		imageMetadata: c.imageMetadata,
		paintDescriptors: c.paintResources.descriptors,
		hasPaginationFields: d,
		requiresDomVerticalGlyphLayout: f,
		fatalParse: p === null ? null : Nn(p)
	}), w = Object.freeze({
		document: e.document,
		source: C
	});
	return vE.set(r, w), vE.set(e.document, w), w;
}
function FE(e) {
	return jE(e).source;
}
//#endregion
//#region packages/docx/src/layout-runtime.ts
function IE(e, t, n, r) {
	return sw(e, t, n, r).kernel;
}
function LE(e, t = {}) {
	let n = Kw(e) ? e : FE(e), r = t.measureContext ?? (() => {
		if (typeof document < "u") {
			let e = document.createElement("canvas").getContext("2d");
			if (e !== null) return e;
		}
		return typeof OffscreenCanvas < "u" ? new OffscreenCanvas(1, 1).getContext("2d") : null;
	})(), i = r === null ? null : Object.freeze({
		get font() {
			return r.font;
		},
		set font(e) {
			r.font = e;
		},
		get letterSpacing() {
			return r.letterSpacing;
		},
		set letterSpacing(e) {
			r.letterSpacing = e;
		},
		get fontKerning() {
			return r.fontKerning;
		},
		set fontKerning(e) {
			r.fontKerning = e;
		},
		measureText(e) {
			return r.measureText(e);
		}
	}), a = r?.canvas, o = a?.ownerDocument?.defaultView?.HTMLCanvasElement, s = r !== null && (typeof o == "function" && a instanceof o || typeof HTMLCanvasElement < "u" && a instanceof HTMLCanvasElement), c = Object.freeze({
		fingerprint: r === null ? "vertical-glyph-measurement:deterministic-v1" : s ? "vertical-glyph-measurement:dom-vert-probe-v2" : "vertical-glyph-measurement:no-dom-vert-probe-v1",
		measureRunInkExtra(e) {
			if (r === null) throw Error("Vertical glyph measurement requires a concrete text context");
			return me(r, () => aw(r, e));
		},
		planRun(e) {
			if (r === null) throw Error("Vertical glyph planning requires a concrete text context");
			return me(r, () => {
				let t = r.font, n = r.fontKerning;
				r.font = e.font, r.fontKerning = e.fontKerning;
				try {
					return rw(r, e.text, e.fontSizePt, e.letterSpacingPt, e.charScale, e.growTrRotateInk, (e) => E(r, e), e.writingMode);
				} finally {
					r.font = t, r.fontKerning = n;
				}
			});
		}
	}), l = zi(t.localMetrics), u = zi({
		...l,
		...t.fontMetrics
	}), d = n.fonts.scriptCjkLanguage ?? C(n.fonts.majorFamily) ?? C(n.fonts.minorFamily) ?? t.cjkFallback, f = Ow(n, {
		...t,
		cjkFallback: d,
		localMetrics: l,
		fontMetrics: u,
		measureContext: i,
		fontSet: (j(a) ? a.ownerDocument?.fonts : void 0) ?? L(),
		verticalGlyphMeasurement: c
	}), p = f.text.fontMetrics ?? u;
	return wr(f, n), Sr(f, IE(n, i, p, d)), f;
}
//#endregion
//#region packages/docx/src/renderer.ts
function RE(e) {
	return (Array.isArray(e) ? Qn(e) : FE(e).mathOccurrences).length > 0;
}
async function zE(e, t) {
	if (Array.isArray(e)) throw TypeError("prepareMathRuns requires a document model so every story has an explicit structural source");
	return Ib(FE(e).mathOccurrences, t);
}
function BE(e, t, n, r) {
	let i = r.layoutServices ?? LE(e, e.fatalParse === null ? { measureContext: t.getContext("2d") } : {}), a = Tr(i);
	if (a && a !== e) throw Error("Layout services belong to a different document source");
	let o = r.defaultCurrentDateMs ?? Date.now();
	Fb(i, o, () => e);
	let s = pf(i, {
		currentDate: r.currentDate,
		defaultCurrentDateMs: o,
		showTrackedChanges: r.showTrackedChanges
	}, n), c = nm(s.page, r.width);
	return {
		selection: s,
		paintOptions: {
			width: r.width,
			dpr: r.dpr,
			defaultTextColor: r.defaultTextColor,
			fetchImage: r.fetchImage,
			svgDecoder: r.svgDecoder,
			parseError: e.fatalParse !== null,
			registry: Br(i),
			rasterPaintOccurrences: Uf(s.layout, n),
			privateResources: jr(i),
			textRuns: r.onTextRun ? Kf(s.layout, n, { scale: c }) : [],
			onTextRun: r.onTextRun,
			threeD: r.threeD,
			regionMap: r.regionMap,
			chartEx: r.chartEx,
			tiff: r.tiff,
			imageResources: r.imageResources
		}
	};
}
async function VE(e, t, n, r = {}) {
	let i = BE(e, t, n, r);
	return om(i.selection.layout, i.selection.page, t, i.paintOptions);
}
//#endregion
//#region packages/docx/src/document-layout.ts
function HE(e, t = LE(e), n) {
	let r = Kw(e) ? e : FE(e), i = Tr(t);
	if (i && i !== r) throw Error("Layout services belong to a different document source");
	return Nb(r.bodyLayoutInput, t, n);
}
//#endregion
//#region packages/docx/src/render-worker-layout.ts
function UE(e, t, n) {
	let r = Tr(t);
	if (r && r !== e) throw Error("Layout services belong to a different document source");
	let i = ff({
		source: e,
		services: t,
		defaultCurrentDateMs: n,
		buildLayout: (n) => HE(e, t, n)
	});
	return Object.freeze({
		layoutServices: t,
		layoutVariants: i.store,
		defaultCurrentDateMs: n
	});
}
//#endregion
//#region packages/docx/src/document-pull-client.ts
var WE = 1024 * 1024, GE = Math.max(d, w);
async function KE(e, t, n = {}) {
	let r = [];
	return XE(e, t, n, {
		acceptBody: (e) => {
			r.push(...e);
		},
		complete: (e) => (e.body = r, e)
	});
}
async function qE(e, t, n = {}) {
	let r = [];
	return XE(e, t, n, {
		acceptBody: (e) => {
			r.push(...e);
		},
		complete: (e) => (e.body = r, NE(e))
	});
}
async function JE(e, t, n = {}) {
	let r = await YE(e, t, n);
	return ME(r.document, r.ownedLayoutDocument);
}
async function YE(e, t, n = {}) {
	let r = [], i = [];
	return XE(e, t, n, {
		acceptBody: (e) => {
			let t = structuredClone(e);
			for (let t of e) r.push(t);
			for (let e of t) i.push(e);
		},
		complete: (e) => {
			let t = structuredClone(e);
			return e.body = r, t.body = i, Object.freeze({
				document: e,
				ownedLayoutDocument: t
			});
		}
	});
}
async function XE(e, t, n, r) {
	let i = new m(e, {
		...t,
		maxByteCredit: GE,
		timeoutMs: n.timeoutMs
	});
	try {
		for (;;) {
			let e = await $E(i, n.signal);
			try {
				let t = e.usage ?? i.usageCheckpoint;
				t && n.onUsage?.(t);
				let a = QE(e.payload);
				if (e.done !== (a.kind === "complete")) throw TypeError("DOCX document unit terminal flag does not match its payload");
				if (a.kind === "body") {
					r.acceptBody(a.body), await e.ack({ signal: n.signal });
					continue;
				}
				if (!Array.isArray(a.document.body) || a.document.body.length !== 0) throw TypeError("DOCX terminal document must not duplicate streamed body blocks");
				let o = r.complete(a.document);
				return await e.ack({ signal: n.signal }), o;
			} finally {
				e.disposeTransferred();
			}
		}
	} catch (e) {
		throw await i.cancel("request-error").catch(() => void 0), e;
	}
}
function ZE(e) {
	return !!e && typeof e == "object" && e.protocol === "ooxml-pull-v1";
}
function QE(e) {
	let t = JSON.parse(new TextDecoder().decode(new Uint8Array(e)));
	if (!t || typeof t != "object") throw TypeError("DOCX document unit must be an object");
	let n = t;
	if (n.kind === "body" && Array.isArray(n.body) || n.kind === "complete" && n.document && typeof n.document == "object") return n;
	throw TypeError("DOCX document unit has an unknown shape");
}
async function $E(e, t) {
	try {
		return await e.pull(WE, { signal: t });
	} catch (n) {
		let r = eD(n);
		if (r === void 0) throw n;
		return e.pull(r, { signal: t });
	}
}
function eD(e) {
	return fe(e, WE, GE);
}
//#endregion
export { Br as A, vf as C, lr as D, di as E, Tn as M, ur as O, yf as S, vs as T, Eb as _, UE as a, Hf as b, VE as c, _w as d, yw as f, Mb as g, jb as h, KE as i, V as j, kr as k, LE as l, Pb as m, JE as n, RE as o, bw as p, qE as r, zE as s, ZE as t, uE as u, tm as v, pf as w, Vf as x, qf as y };
