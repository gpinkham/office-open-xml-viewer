//#region packages/core/src/fonts/google-fonts.ts
var e = "https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap", t = "https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap", n = "https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap", r = {
	calibri: {
		url: "https://fonts.googleapis.com/css2?family=Carlito:ital,wght@0,400;0,700;1,400;1,700&display=swap",
		loadFamily: "Carlito"
	},
	cambria: {
		url: "https://fonts.googleapis.com/css2?family=Caladea:ital,wght@0,400;0,700;1,400;1,700&display=swap",
		loadFamily: "Caladea"
	},
	"franklin gothic book": {
		url: n,
		loadFamily: "Libre Franklin"
	},
	"franklin gothic medium": {
		url: n,
		loadFamily: "Libre Franklin"
	},
	"nunito sans": { url: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" },
	nunito: { url: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap" },
	"open sans": { url: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" },
	roboto: { url: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap" },
	lato: { url: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap" },
	montserrat: { url: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap" },
	poppins: { url: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap" },
	raleway: { url: "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,700;1,400;1,700&display=swap" },
	"playfair display": { url: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap" },
	ubuntu: { url: "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,700;1,400;1,700&display=swap" },
	"sakkal majalla": {
		url: e,
		loadFamily: "Noto Naskh Arabic",
		script: "arabic"
	},
	"traditional arabic": {
		url: e,
		loadFamily: "Noto Naskh Arabic",
		script: "arabic"
	},
	"simplified arabic": {
		url: e,
		loadFamily: "Noto Naskh Arabic",
		script: "arabic"
	},
	"arabic typesetting": {
		url: e,
		loadFamily: "Noto Naskh Arabic",
		script: "arabic"
	},
	"univers next arabic": {
		url: t,
		loadFamily: "Noto Sans Arabic",
		script: "arabic"
	},
	"noto naskh arabic": {
		url: e,
		loadFamily: "Noto Naskh Arabic"
	},
	"noto sans arabic": {
		url: t,
		loadFamily: "Noto Sans Arabic"
	}
};
function i(e, t = r) {
	let n = /* @__PURE__ */ new Map();
	if (!e) return n;
	for (let r of e) {
		if (r.status !== "loaded" || r.style !== "normal" || r.weight !== "400") continue;
		let e = r.family.replace(/^['"]|['"]$/g, "").trim(), i = e.toLocaleLowerCase("en-US"), a = t[i];
		!a || a.loadFamily && a.loadFamily.toLocaleLowerCase("en-US") !== i || n.set(`${i} regular`, e);
	}
	return n;
}
//#endregion
//#region packages/core/src/fonts/scripts.ts
var a = {
	"noto sans cjk sc": "Noto Sans SC",
	"noto serif cjk sc": "Noto Serif SC",
	"noto sans cjk tc": "Noto Sans TC",
	"noto serif cjk tc": "Noto Serif TC",
	"noto sans cjk jp": "Noto Sans JP",
	"noto serif cjk jp": "Noto Serif JP",
	"noto sans cjk kr": "Noto Sans KR",
	"noto serif cjk kr": "Noto Serif KR",
	"noto sans cjk hk": "Noto Sans HK"
};
function o(e) {
	return e ? a[e.trim().toLowerCase()] ?? null : null;
}
function s(e) {
	if (!e) return null;
	let t = o(e) ?? e.trim(), n = t.toLowerCase(), r = n.match(/^noto\s+(?:sans|serif)\s+(?:cjk\s+)?(sc|tc|hk|jp|kr)$/);
	return r ? r[1] : /[ᄀ-ᇿ㄰-㆏가-힯]/.test(t) ? "kr" : /[぀-ヿ]/.test(t) ? "jp" : /jhenghei|微軟正黑|新細明|細明|pmingliu|mingliu|dfkai|標楷|華康|cns11643|kaiti tc|ming\s*liu/.test(n) || /新細明體|細明體|標楷體|微軟正黑體|華康/.test(t) ? "tc" : /simsun|nsimsun|simhei|simkai|simfang|yahei|dengxian|fangsong|kaiti|youyuan|lisu|stsong|stkaiti|stfangsong|stheiti|stxihei|stzhongsong|songti sc|heiti sc|微软雅黑/.test(n) || /宋体|黑体|楷体|仿宋|等线|微软雅黑|隶书|幼圆/.test(t) ? "sc" : /malgun|batang|gulim|dotum|gungsuh|nanum|new gulim|hancom|hy(gothic|graphic|namu)?/.test(n) ? "kr" : /\bmeiryo\b|\byu\s*(gothic|mincho)\b|yugothic|yumincho|hiragino|\bms\s*(gothic|mincho|pgothic|pmincho|ui\s*gothic)\b|\bms[pg]?(gothic|mincho)\b|ipa(ex)?(gothic|mincho)|noto\s+(sans|serif)\s+jp|游ゴシック|游明朝|ＭＳ|メイリオ|ヒラギノ/.test(n) || /游ゴシック|游明朝|ＭＳ ゴシック|ＭＳ 明朝|ＭＳ Ｐゴシック|メイリオ|ヒラギノ/.test(t) ? "jp" : null;
}
function c(e) {
	if (!e) return "sans";
	let t = e.toLowerCase();
	return /mono|courier|consolas|等幅|gothic_m/.test(t) ? "mono" : /roman|times|cambria|caladea|georgia|garamond|century(?!\s*gothic)|palatino|antiqua|didot|bodoni|playfair|source serif|noto serif|min\s*cho|明朝体|明朝|song|sung|simsun|nsimsun|batang|gungsuh|ming\s*liu|mingliu|pmingliu|fang\s*song|fangsong|kai\s*ti|kaiti|simkai|simfang|stsong|stkaiti|stfangsong|stzhongsong|新細明|細明|宋体|楷体|楷體|仿宋|標楷|游明朝|ＭＳ 明朝|ms mincho|yu mincho|hiragino mincho|ヒラギノ明朝/.test(t) || /新細明體|細明體|宋体|明朝|楷体|楷體|仿宋|標楷體|游明朝|ＭＳ 明朝/.test(e) ? "serif" : "sans";
}
function l(e) {
	return e >= 1424 && e <= 1535 || e >= 1536 && e <= 1791 || e >= 1792 && e <= 1871 || e >= 1872 && e <= 1919 || e >= 1920 && e <= 1983 || e >= 1984 && e <= 2047 || e >= 2048 && e <= 2111 || e >= 2112 && e <= 2143 || e >= 2144 && e <= 2303 || e >= 64285 && e <= 64335 || e >= 64336 && e <= 65023 || e >= 65136 && e <= 65279 || e >= 67584 && e <= 69631 || e >= 124928 && e <= 126975;
}
function u(e, t) {
	if (e === "hk" && t === "serif") return [];
	let n = t === "serif" ? "Noto Serif" : "Noto Sans", r = {
		jp: [
			"jp",
			"sc",
			"tc",
			"kr"
		],
		sc: [
			"sc",
			"tc",
			"jp",
			"kr"
		],
		tc: [
			"tc",
			"sc",
			"jp",
			"kr"
		],
		hk: [
			"hk",
			"tc",
			"sc",
			"jp",
			"kr"
		],
		kr: [
			"kr",
			"jp",
			"sc",
			"tc"
		]
	}, i = {
		kr: "KR",
		sc: "SC",
		tc: "TC",
		hk: "HK",
		jp: "JP"
	};
	return r[e].map((e) => `${n} ${i[e]}`);
}
var d = [
	"Noto Sans",
	"Noto Sans Hebrew",
	"Noto Sans Thai",
	"Noto Sans Devanagari"
], f = ["Noto Serif", "Noto Serif Hebrew"], p = (e) => `https://fonts.googleapis.com/css2?family=${e}:wght@400;700&display=swap`, m = {
	"noto sans kr": { url: p("Noto+Sans+KR") },
	"noto sans sc": { url: p("Noto+Sans+SC") },
	"noto sans tc": { url: p("Noto+Sans+TC") },
	"noto sans hk": { url: p("Noto+Sans+HK") },
	"noto sans jp": { url: p("Noto+Sans+JP") },
	"noto serif kr": { url: p("Noto+Serif+KR") },
	"noto serif sc": { url: p("Noto+Serif+SC") },
	"noto serif tc": { url: p("Noto+Serif+TC") },
	"noto serif jp": { url: p("Noto+Serif+JP") }
}, h = Object.fromEntries(Object.entries(a).map(([e, t]) => [e, {
	...m[t.toLowerCase()],
	loadFamily: t
}])), g = {
	...m,
	...h,
	"noto sans": { url: p("Noto+Sans") },
	"noto serif": { url: p("Noto+Serif") },
	"noto sans devanagari": { url: p("Noto+Sans+Devanagari") },
	"noto sans thai": { url: p("Noto+Sans+Thai") },
	"noto sans hebrew": { url: p("Noto+Sans+Hebrew") },
	"noto serif hebrew": { url: p("Noto+Serif+Hebrew") }
};
function _(e) {
	return /\p{Script=Han}/u.test(e);
}
var v = class e {
	hasHan = !1;
	hasHangul = !1;
	hasKana = !1;
	hasArabic = !1;
	hasThai = !1;
	hasHebrew = !1;
	hasDevanagari = !1;
	hasCyrGreek = !1;
	constructor(e) {
		this.cjkLang = e;
	}
	scriptCjkLanguage() {
		return this.hasHangul ? "kr" : this.hasKana ? "jp" : null;
	}
	preferredCjkLanguage() {
		return this.scriptCjkLanguage() ?? this.cjkLang ?? "jp";
	}
	clone() {
		let t = new e(this.cjkLang);
		return t.hasHan = this.hasHan, t.hasHangul = this.hasHangul, t.hasKana = this.hasKana, t.hasArabic = this.hasArabic, t.hasThai = this.hasThai, t.hasHebrew = this.hasHebrew, t.hasDevanagari = this.hasDevanagari, t.hasCyrGreek = this.hasCyrGreek, t;
	}
	addText(e) {
		let t = () => this.hasHan && this.hasHangul && this.hasKana && this.hasArabic && this.hasThai && this.hasHebrew && this.hasDevanagari && this.hasCyrGreek;
		outer: for (let n of e) if (n) for (let e of n) {
			let n = e.codePointAt(0);
			if (n !== void 0 && !(n <= 591) && (n >= 4352 && n <= 4607 || n >= 12592 && n <= 12687 || n >= 44032 && n <= 55215 ? this.hasHangul = !0 : n >= 12352 && n <= 12543 ? this.hasKana = !0 : _(e) ? this.hasHan = !0 : n >= 1536 && n <= 1791 || n >= 1872 && n <= 1919 || n >= 2208 && n <= 2303 || n >= 64336 && n <= 65023 || n >= 65136 && n <= 65279 ? this.hasArabic = !0 : n >= 3584 && n <= 3711 ? this.hasThai = !0 : n >= 1424 && n <= 1535 || n >= 64285 && n <= 64335 ? this.hasHebrew = !0 : n >= 2304 && n <= 2431 ? this.hasDevanagari = !0 : (n >= 1024 && n <= 1279 || n >= 880 && n <= 1023) && (this.hasCyrGreek = !0), t())) break outer;
		}
	}
	names(e = !1) {
		let t = [], n = /* @__PURE__ */ new Set();
		this.hasHangul && n.add("kr"), this.hasKana && n.add("jp"), this.hasHan && (n.size === 0 || e) && n.add(this.cjkLang ?? "jp");
		for (let e of [
			"kr",
			"sc",
			"tc",
			"hk",
			"jp"
		]) if (n.has(e)) {
			let n = {
				kr: "KR",
				sc: "SC",
				tc: "TC",
				hk: "HK",
				jp: "JP"
			}[e];
			t.push(`Noto Sans ${n}`), e !== "hk" && t.push(`Noto Serif ${n}`);
		}
		return this.hasCyrGreek && t.push("Noto Sans", "Noto Serif"), this.hasArabic && t.push("Noto Naskh Arabic", "Noto Sans Arabic"), this.hasThai && t.push("Noto Sans Thai"), this.hasHebrew && t.push("Noto Sans Hebrew", "Noto Serif Hebrew"), this.hasDevanagari && t.push("Noto Sans Devanagari"), t;
	}
};
function y(e, t, n = !1) {
	let r = new v(t);
	return r.addText(e), r.names(n);
}
function b(e, t) {
	let n = new v(t);
	return n.addText(e), n.preferredCjkLanguage();
}
//#endregion
export { u as a, c, l as d, y as f, v as i, _ as l, i as m, f as n, b as o, r as p, g as r, s, d as t, o as u };
