import { S as e, o as t } from "./resource-policy.generated-BTdyyO9v.js";
import { f as n, i as r, o as i, p as a, r as o, s } from "./scripts-DEuLSUed.js";
import { n as c, t as l } from "./resource-measurement-BEOZEHNY.js";
//#region packages/pptx/src/google-fonts.ts
var u = {
	...a,
	...o
};
function* d(e) {
	for (let t of e?.paragraphs ?? []) for (let e of t.runs) e.type === "text" && (yield e.text);
}
function* f(e) {
	for (let t of e?.paragraphs ?? []) {
		t.defFontFamily && (yield t.defFontFamily);
		for (let e of t.runs) e.type === "text" && (e.fontFamily && (yield e.fontFamily), e.fontFamilyEa && (yield e.fontFamilyEa), e.fontFamilyCs && (yield e.fontFamilyCs), e.fontFamilySym && (yield e.fontFamilySym));
	}
}
function* p(e) {
	for (let t of e.elements) if (t.type === "shape") yield* d(t.textBody);
	else if (t.type === "table") for (let e of t.rows) for (let t of e.cells) yield* d(t.textBody);
	else if (t.type === "chart") {
		t.chart.title && (yield t.chart.title);
		for (let e of t.chart.categories) yield e;
		for (let e of t.chart.series) e.name && (yield e.name);
	}
}
var m = class e {
	scripts;
	families;
	constructor(e, t, n, i, a, o = /* @__PURE__ */ new Set()) {
		this.majorFont = e, this.minorFont = t, this.fallback = a, this.scriptNames = o;
		let c = s(e) ?? s(t) ?? a ?? null;
		this.scripts = n ?? new r(c), this.families = i ?? /* @__PURE__ */ new Set(), e && this.families.add(e), t && this.families.add(t);
	}
	addSlide(e) {
		this.scripts.addText(p(e));
		for (let t of n(p(e), s(this.majorFont) ?? s(this.minorFont) ?? this.fallback ?? null)) this.scriptNames.add(t);
		for (let t of e.elements) if (t.type === "shape") for (let e of f(t.textBody)) this.families.add(e);
		else if (t.type === "table") for (let e of t.rows) for (let t of e.cells) for (let e of f(t.textBody)) this.families.add(e);
	}
	names() {
		return [...new Set([
			...this.families,
			...this.scripts.names(),
			...this.scriptNames
		])];
	}
	withSlide(t) {
		let n = new e(this.majorFont, this.minorFont, this.scripts.clone(), new Set(this.families), this.fallback, new Set(this.scriptNames));
		return n.addSlide(t), n;
	}
};
function h(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = (e) => e ? e.startsWith("+mn-") ? n : e.startsWith("+mj-") ? t : e.split(",")[0]?.trim() ?? null : null, a = (e, t, n) => {
		if (i(e)?.toLowerCase() !== "calibri") return;
		let a = t ? 700 : 400, o = n ? "italic" : "normal";
		r.set(`${a}:${o}`, {
			family: "Calibri",
			weight: a,
			style: o
		});
	}, o = (e) => {
		for (let t of e?.paragraphs ?? []) {
			for (let n of t.runs) {
				if (n.type !== "text") continue;
				let r = n.bold ?? t.defBold ?? e?.defaultBold ?? !1, i = n.italic ?? t.defItalic ?? e?.defaultItalic ?? !1;
				a(n.fontFamily ?? t.defFontFamily, r, i), n.fontFamilyEa && a(n.fontFamilyEa, r, i), n.fontFamilyCs && a(n.fontFamilyCs, r, i), n.fontFamilySym && a(n.fontFamilySym, r, i);
			}
			if (t.bullet.type === "char" || t.bullet.type === "autoNum") {
				let e = t.runs.find((e) => e.type === "text" && !!e.fontFamily), n = e?.type === "text" ? e.fontFamily : null;
				a(t.bullet.fontFamily ?? (t.bullet.type === "autoNum" ? n ?? t.defFontFamily : void 0), !1, !1);
			}
		}
	};
	for (let t of e.elements) if (t.type === "shape" && o(t.textBody), t.type === "table") for (let e of t.rows) for (let t of e.cells) o(t.textBody);
	return [...r.values()];
}
function g(e, t, n, r) {
	return i(p(e), s(t) ?? s(n) ?? r);
}
//#endregion
//#region packages/pptx/src/presentation-preflight.ts
var _ = Object.freeze({
	archiveEntryCount: 0,
	declaredInflatedBytes: 0,
	distinctInflatedBytes: 0,
	operationInflatedBytes: 0
}), v = t;
function y(e, t) {
	if (e !== null && typeof e != "string") throw Error(`invalid PPTX presentation bootstrap ${t}`);
}
function b(e, t) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error(`invalid PPTX presentation bootstrap slide at ${t}`);
	let n = e;
	if (n.index !== t) throw Error(`invalid PPTX presentation bootstrap slide index ${n.index}`);
	if (n.partName !== void 0 && typeof n.partName != "string") throw Error(`invalid PPTX presentation bootstrap slide partName at ${t}`);
	return Object.freeze({
		index: n.index,
		...n.partName === void 0 ? {} : { partName: n.partName }
	});
}
function x(e, t) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error(`invalid PPTX presentation bootstrap embedded font at ${t}`);
	let n = e;
	if (typeof n.fontName != "string" || n.fontName.length === 0 || ![
		"regular",
		"bold",
		"italic",
		"boldItalic"
	].includes(n.style ?? "") || typeof n.partPath != "string" || n.partPath.length === 0 || n.partPath.startsWith("/") || n.partPath.split("/").includes("..") || !["application/x-font-ttf", "application/x-fontdata"].includes(n.contentType ?? "")) throw Error(`invalid PPTX presentation bootstrap embedded font fields at ${t}`);
	return Object.freeze({
		fontName: n.fontName,
		style: n.style,
		partPath: n.partPath,
		contentType: n.contentType
	});
}
function S(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("invalid PPTX presentation bootstrap payload");
	let t = e;
	if (!Number.isSafeInteger(t.slideCount) || (t.slideCount ?? -1) < 0 || !Number.isSafeInteger(t.slideWidth) || (t.slideWidth ?? 0) <= 0 || !Number.isSafeInteger(t.slideHeight) || (t.slideHeight ?? 0) <= 0 || !Array.isArray(t.embeddedFonts) || !Array.isArray(t.slides) || t.slides.length !== t.slideCount) throw Error("invalid PPTX presentation bootstrap dimensions or slide count");
	return y(t.defaultTextColor, "defaultTextColor"), y(t.majorFont, "majorFont"), y(t.minorFont, "minorFont"), y(t.hlinkColor, "hlinkColor"), y(t.folHlinkColor, "folHlinkColor"), Object.freeze({
		slideCount: t.slideCount,
		slideWidth: t.slideWidth,
		slideHeight: t.slideHeight,
		defaultTextColor: t.defaultTextColor,
		majorFont: t.majorFont,
		minorFont: t.minorFont,
		hlinkColor: t.hlinkColor,
		folHlinkColor: t.folHlinkColor,
		embeddedFonts: Object.freeze(t.embeddedFonts.map(x)),
		slides: Object.freeze(t.slides.map(b))
	});
}
function C(e) {
	return Object.freeze({
		type: "media",
		x: e.x,
		y: e.y,
		width: e.width,
		height: e.height,
		rotation: e.rotation,
		flipH: e.flipH,
		flipV: e.flipV,
		mediaKind: e.mediaKind,
		posterPath: e.posterPath,
		posterMimeType: e.posterMimeType,
		mediaPath: e.mediaPath,
		mimeType: e.mimeType
	});
}
function w(e) {
	return Object.freeze({
		...e.id === void 0 ? {} : { id: e.id },
		...e.authorId === void 0 ? {} : { authorId: e.authorId },
		...e.author === void 0 ? {} : { author: e.author },
		...e.date === void 0 ? {} : { date: e.date },
		...e.status === void 0 ? {} : { status: e.status },
		text: e.text
	});
}
function T(e) {
	return Object.freeze({ ...e });
}
function E(e) {
	return Object.freeze({
		...e.authorId === void 0 ? {} : { authorId: e.authorId },
		...e.modernAuthorId === void 0 ? {} : { modernAuthorId: e.modernAuthorId },
		...e.id === void 0 ? {} : { id: e.id },
		...e.index === void 0 ? {} : { index: e.index },
		...e.author === void 0 ? {} : { author: e.author },
		...e.date === void 0 ? {} : { date: e.date },
		...e.x === void 0 ? {} : { x: e.x },
		...e.y === void 0 ? {} : { y: e.y },
		...e.anchors?.length ? { anchors: Object.freeze(e.anchors.map(T)) } : {},
		...e.status === void 0 ? {} : { status: e.status },
		text: e.text,
		...e.replies?.length ? { replies: Object.freeze(e.replies.map(w)) } : {}
	});
}
function D(e, t, n) {
	if (e !== void 0 && typeof e != "string") throw Error(`invalid PPTX presentation preflight comment ${t} at slide ${n}`);
}
function O(e, t) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error(`invalid PPTX presentation preflight comment reply at slide ${t}`);
	let n = e;
	for (let e of [
		"id",
		"authorId",
		"author",
		"date",
		"status"
	]) D(n[e], e, t);
	if (typeof n.text != "string") throw Error(`invalid PPTX presentation preflight comment reply text at slide ${t}`);
	if (n.status !== void 0 && ![
		"active",
		"resolved",
		"closed"
	].includes(n.status)) throw Error(`invalid PPTX presentation preflight comment reply status at slide ${t}`);
	return w(n);
}
function k(e, t) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error(`invalid PPTX presentation preflight comment at slide ${t}`);
	let n = e;
	for (let e of [
		"modernAuthorId",
		"id",
		"author",
		"date",
		"status"
	]) D(n[e], e, t);
	for (let e of [
		"authorId",
		"index",
		"x",
		"y"
	]) {
		let r = n[e];
		if (r !== void 0 && (typeof r != "number" || !Number.isSafeInteger(r))) throw Error(`invalid PPTX presentation preflight comment ${e} at slide ${t}`);
	}
	if (typeof n.text != "string" || n.replies !== void 0 && !Array.isArray(n.replies) || n.anchors !== void 0 && !Array.isArray(n.anchors)) throw Error(`invalid PPTX presentation preflight comment fields at slide ${t}`);
	if (n.status !== void 0 && ![
		"active",
		"resolved",
		"closed"
	].includes(n.status)) throw Error(`invalid PPTX presentation preflight comment status at slide ${t}`);
	return E({
		...n,
		...n.anchors?.length ? { anchors: n.anchors.map((e) => A(e, t)) } : {},
		...n.replies?.length ? { replies: n.replies.map((e) => O(e, t)) } : {}
	});
}
function A(e, t) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error(`invalid PPTX presentation preflight comment anchor at slide ${t}`);
	let n = e;
	if (n.type === "slide" || n.type === "unknown") return Object.freeze({ type: n.type });
	if (n.type === "drawingElement") return D(n.elementId, "anchor.elementId", t), D(n.creationId, "anchor.creationId", t), Object.freeze({
		type: "drawingElement",
		...n.elementId === void 0 ? {} : { elementId: n.elementId },
		...n.creationId === void 0 ? {} : { creationId: n.creationId }
	});
	if (n.type === "textRange") {
		D(n.elementId, "anchor.elementId", t);
		for (let e of ["start", "length"]) {
			let r = n[e];
			if (r !== void 0 && (typeof r != "number" || !Number.isSafeInteger(r))) throw Error(`invalid PPTX presentation preflight comment anchor.${e} at slide ${t}`);
		}
		return Object.freeze({
			type: "textRange",
			...n.elementId === void 0 ? {} : { elementId: n.elementId },
			...n.start === void 0 ? {} : { start: n.start },
			...n.length === void 0 ? {} : { length: n.length }
		});
	}
	throw Error(`invalid PPTX presentation preflight comment anchor type at slide ${t}`);
}
function j(e, t) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error(`invalid PPTX presentation preflight media at slide ${t}`);
	let n = e;
	for (let e of [
		"x",
		"y",
		"width",
		"height",
		"rotation"
	]) if (typeof n[e] != "number" || !Number.isFinite(n[e])) throw Error(`invalid PPTX presentation preflight media ${e} at slide ${t}`);
	if (n.type !== "media" || typeof n.flipH != "boolean" || typeof n.flipV != "boolean" || n.mediaKind !== "audio" && n.mediaKind !== "video" || typeof n.posterPath != "string" || typeof n.posterMimeType != "string" || typeof n.mediaPath != "string" || typeof n.mimeType != "string") throw Error(`invalid PPTX presentation preflight media fields at slide ${t}`);
	return C(n);
}
function M(e, t) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("invalid PPTX presentation preflight payload");
	let n = e;
	if (!Number.isSafeInteger(n.slideCount) || (n.slideCount ?? -1) < 0 || !Number.isSafeInteger(n.slideWidth) || (n.slideWidth ?? 0) <= 0 || !Number.isSafeInteger(n.slideHeight) || (n.slideHeight ?? 0) <= 0 || !Array.isArray(n.embeddedFonts) || !Array.isArray(n.slides) || (t ? n.slides.length > (n.slideCount ?? -1) : n.slides.length !== n.slideCount) || !Array.isArray(n.fontPreloadNames)) throw Error("invalid PPTX presentation preflight dimensions or slide count");
	y(n.defaultTextColor, "defaultTextColor"), y(n.majorFont, "majorFont"), y(n.minorFont, "minorFont"), y(n.hlinkColor, "hlinkColor"), y(n.folHlinkColor, "folHlinkColor");
	let r = n.slides.map((e, t) => {
		if (!e || typeof e != "object" || Array.isArray(e)) throw Error(`invalid PPTX presentation preflight slide at ${t}`);
		let n = e;
		if (n.index !== t || n.partName !== void 0 && typeof n.partName != "string" || n.notes !== null && typeof n.notes != "string" || typeof n.hidden != "boolean" || !Array.isArray(n.mediaElements) || n.comments !== void 0 && !Array.isArray(n.comments)) throw Error(`invalid PPTX presentation preflight slide fields at ${t}`);
		return Object.freeze({
			index: t,
			...n.partName === void 0 ? {} : { partName: n.partName },
			notes: n.notes,
			hidden: n.hidden,
			mediaElements: Object.freeze(n.mediaElements.map((e) => j(e, t))),
			...n.comments?.length ? { comments: Object.freeze(n.comments.map((e) => k(e, t))) } : {}
		});
	}), i;
	if (n.fontPreloadDemand !== void 0) {
		let e = n.fontPreloadDemand;
		if (e === "all") i = "all";
		else if (Array.isArray(e) && e.every((e) => Number.isInteger(e) && e >= 0 && e <= 1114111 && !(e >= 55296 && e <= 57343))) i = Object.freeze([...new Set(e)]);
		else throw Error("invalid PPTX presentation preflight font demand");
	}
	let a = n.fontPreloadNames.map((e, t) => {
		if (e !== null && typeof e != "string") throw Error(`invalid PPTX presentation preflight font at ${t}`);
		return e;
	});
	return Object.freeze({
		slideCount: n.slideCount,
		slideWidth: n.slideWidth,
		slideHeight: n.slideHeight,
		defaultTextColor: n.defaultTextColor,
		majorFont: n.majorFont,
		minorFont: n.minorFont,
		hlinkColor: n.hlinkColor,
		folHlinkColor: n.folHlinkColor,
		embeddedFonts: Object.freeze(n.embeddedFonts.map(x)),
		slides: Object.freeze(r),
		fontPreloadNames: Object.freeze(a),
		...i === void 0 ? {} : { fontPreloadDemand: i }
	});
}
function N(e) {
	return M(e, !1);
}
function P(e) {
	return M(e, !0);
}
function F(e, t) {
	for (let n of e.slides) for (let e of n.mediaElements) {
		if (e.mediaPath === t) return e.mimeType;
		if (e.posterPath === t) return e.posterMimeType;
	}
	return "";
}
function I(e, t) {
	if (e.index !== t.index || e.partName !== t.partName) throw Error(`PPTX pulled slide identity does not match bootstrap index ${t.index}`);
	return Object.freeze({
		index: t.index,
		...t.partName === void 0 ? {} : { partName: t.partName },
		notes: e.notes ?? null,
		hidden: e.hidden ?? !1,
		mediaElements: Object.freeze(e.elements.filter((e) => e.type === "media").map(C)),
		...e.comments?.length ? { comments: Object.freeze(e.comments.map(E)) } : {}
	});
}
function L(t, n, r) {
	if (!(t <= n)) throw new e(`PPTX presentation preflight exceeded its hard limit of ${n} projected bytes`, {
		stage: "parsing",
		violation: {
			format: "pptx",
			operation: "presentation-preflight",
			resource: "presentation-preflight",
			metric: "projected-bytes",
			limit: n,
			observed: Math.min(t, n + 1),
			configurable: !1,
			usage: r
		}
	});
}
var R = class {
	slideCountValue;
	slideWidthValue;
	slideHeightValue;
	defaultTextColorValue;
	majorFontValue;
	minorFontValue;
	hlinkColorValue;
	folHlinkColorValue;
	embeddedFontsValue;
	descriptors;
	slides = [];
	fonts;
	fontPreloadNames;
	fontProjectionBytes;
	projectionBytesValue;
	limit;
	pending = null;
	finished = null;
	demandPoints;
	demandAll = !1;
	demandBytes = 0;
	demandMembershipBytes = 0;
	demandDeltaBytes = 0;
	collectFontDemand;
	demandDelta;
	constructor(e, t = {}) {
		let n = S(e), r = t.hardLimitForTesting ?? v;
		if (!Number.isSafeInteger(r) || r <= 0 || r > v) throw Error("invalid PPTX presentation preflight test limit");
		this.limit = r, this.collectFontDemand = t.collectFontDemand, this.demandPoints = this.collectFontDemand ? /* @__PURE__ */ new Set() : void 0, this.demandBytes = this.collectFontDemand ? c({ fontPreloadDemand: [] }, this.limit).jsonBytes - 1 : 0, this.demandMembershipBytes = this.demandBytes, this.slideCountValue = n.slideCount, this.slideWidthValue = n.slideWidth, this.slideHeightValue = n.slideHeight, this.defaultTextColorValue = n.defaultTextColor, this.majorFontValue = n.majorFont, this.minorFontValue = n.minorFont, this.hlinkColorValue = n.hlinkColor, this.folHlinkColorValue = n.folHlinkColor, this.embeddedFontsValue = n.embeddedFonts, this.descriptors = [...n.slides], this.fonts = new m(this.majorFontValue, this.minorFontValue, void 0, void 0, t.cjkFallback), this.fontPreloadNames = Object.freeze(this.fonts.names()), this.fontProjectionBytes = c(this.fontPreloadNames, this.limit).jsonBytes, this.projectionBytesValue = c({
			slideCount: this.slideCountValue,
			slideWidth: this.slideWidthValue,
			slideHeight: this.slideHeightValue,
			defaultTextColor: this.defaultTextColorValue,
			majorFont: this.majorFontValue,
			minorFont: this.minorFontValue,
			hlinkColor: this.hlinkColorValue,
			folHlinkColor: this.folHlinkColorValue,
			embeddedFonts: this.embeddedFontsValue,
			remainingSlides: this.descriptors,
			slides: [],
			fontPreloadNames: this.fontPreloadNames
		}, this.limit).jsonBytes, this.projectionBytesValue + this.demandBytes > this.limit && (this.demandAll = !0, this.demandBytes = 0, this.demandMembershipBytes = 0), this.projectionBytesValue = l(this.projectionBytesValue, this.demandBytes, this.limit), L(this.projectionBytesValue, this.limit, _);
	}
	get acceptedSlideCount() {
		return this.finished?.slideCount ?? this.slides.length;
	}
	get projectedBytes() {
		return this.projectionBytesValue;
	}
	get remainingDescriptorCount() {
		return this.descriptors.reduce((e, t) => e + Number(t !== void 0), 0);
	}
	get latestSlide() {
		return this.slides[this.slides.length - 1];
	}
	get currentFontPreloadNames() {
		return this.fontPreloadNames;
	}
	get currentFontPreloadDemandDelta() {
		return this.demandDelta;
	}
	snapshot() {
		if (this.finished) return this.finished;
		if (this.pending) throw Error("PPTX presentation preflight has an uncommitted slide");
		return Object.freeze({
			slideCount: this.slideCountValue,
			slideWidth: this.slideWidthValue,
			slideHeight: this.slideHeightValue,
			defaultTextColor: this.defaultTextColorValue,
			majorFont: this.majorFontValue,
			minorFont: this.minorFontValue,
			hlinkColor: this.hlinkColorValue,
			folHlinkColor: this.folHlinkColorValue,
			embeddedFonts: this.embeddedFontsValue,
			slides: Object.freeze([...this.slides]),
			fontPreloadNames: this.fontPreloadNames
		});
	}
	addSlide(e, t = _) {
		this.prepareSlide(e, t).commit();
	}
	prepareSlide(e, t = _) {
		if (this.finished) throw Error("PPTX presentation preflight is already finished");
		if (this.pending) throw Error("PPTX presentation preflight already has a prepared slide");
		let n = this.slides.length, r = this.descriptors[n];
		if (!r) throw Error("PPTX presentation preflight received an extra slide");
		let i = I(e, r), a = this.fonts.withSlide(e), o = Object.freeze(a.names()), s = c(o, this.limit).jsonBytes, u = c(i, this.limit).jsonBytes, d = this.projectionBytesValue - this.demandBytes - this.fontProjectionBytes - c(r, this.limit).jsonBytes + 4;
		d = l(d, s, this.limit), d = l(d, u, this.limit), this.slides.length !== 0 && (d = l(d, 1, this.limit));
		let f = c({
			slide: i,
			fontPreloadNames: o
		}, this.limit).jsonBytes, p = l(this.projectionBytesValue - this.demandBytes, f, this.limit), m = d;
		L(Math.max(p, m), this.limit, t);
		let h = p + this.demandBytes;
		d += this.demandBytes, Math.max(h, d) > this.limit && this.demandBytes && (this.projectionBytesValue -= this.demandBytes, this.demandBytes = 0, this.demandMembershipBytes = 0, this.demandDeltaBytes = 0, this.demandPoints?.clear(), this.demandAll = !0, this.demandDelta = "all", h = p, d = m);
		let g, v = this.demandBytes, y = this.demandMembershipBytes, b = this.demandDeltaBytes;
		if (this.collectFontDemand) {
			let t = c([], this.limit).jsonBytes, n = this.limit - h, r = this.limit - m - this.demandMembershipBytes, i = Math.min(n, Math.floor((r + t - Number((this.demandPoints?.size ?? 0) > 0)) / 2));
			if (g = this.demandAll ? "all" : this.collectFontDemand(e, this.demandPoints, Math.max(0, i)), g === "all") v = 0, y = 0, b = 0;
			else {
				b = c(g, this.limit).jsonBytes;
				let e = g.length === 0 ? 0 : b - t + Number((this.demandPoints?.size ?? 0) > 0);
				y += e, v = y + b, h += b;
			}
			d = m + v;
		}
		L(Math.max(h, d), this.limit, t);
		let x = {
			state: "prepared",
			fact: i,
			fonts: a,
			fontNames: o,
			fontBytes: s,
			committedBytes: d,
			demandDelta: g,
			demandBytes: v,
			demandMembershipBytes: y,
			demandDeltaBytes: b
		};
		return this.pending = x, {
			projectedBytes: h,
			commit: () => {
				if (x.state !== "committed") {
					if (x.state === "rolled-back") throw Error("PPTX presentation preflight cannot commit a rolled-back slide");
					if (this.pending !== x) throw Error("PPTX presentation preflight prepared slide is stale");
					if (this.descriptors[n] = void 0, this.slides.push(x.fact), this.fonts = x.fonts, this.fontPreloadNames = x.fontNames, this.fontProjectionBytes = x.fontBytes, this.projectionBytesValue = x.committedBytes, this.demandDelta = x.demandDelta, x.demandDelta === "all") this.demandAll = !0, this.demandPoints?.clear();
					else for (let e of x.demandDelta ?? []) this.demandPoints?.add(e);
					this.demandBytes = x.demandBytes, this.demandMembershipBytes = x.demandMembershipBytes, this.demandDeltaBytes = x.demandDeltaBytes, x.state = "committed", this.pending = null;
				}
			},
			rollback: () => {
				if (x.state !== "rolled-back") {
					if (x.state === "committed") throw Error("PPTX presentation preflight cannot roll back a committed slide");
					if (this.pending !== x) throw Error("PPTX presentation preflight prepared slide is stale");
					x.state = "rolled-back", this.pending = null;
				}
			}
		};
	}
	finish() {
		if (this.finished) return this.finished;
		if (this.pending) throw Error("PPTX presentation preflight has an uncommitted slide");
		if (this.slides.length !== this.slideCountValue) throw Error(`PPTX presentation preflight is incomplete: ${this.slides.length}/${this.slideCountValue} slides`);
		return this.finished = Object.freeze({
			slideCount: this.slideCountValue,
			slideWidth: this.slideWidthValue,
			slideHeight: this.slideHeightValue,
			defaultTextColor: this.defaultTextColorValue,
			majorFont: this.majorFontValue,
			minorFont: this.minorFontValue,
			hlinkColor: this.hlinkColorValue,
			folHlinkColor: this.folHlinkColorValue,
			embeddedFonts: this.embeddedFontsValue,
			slides: Object.freeze([...this.slides]),
			fontPreloadNames: this.fontPreloadNames,
			...this.collectFontDemand && !this.demandAll && this.demandBytes ? { fontPreloadDemand: Object.freeze([...this.demandPoints ?? []]) } : {}
		}), this.demandPoints?.clear(), this.demandDelta = void 0, this.descriptors = [], this.slides = [], this.projectionBytesValue = c(this.finished, this.limit).jsonBytes, this.finished;
	}
};
//#endregion
export { P as a, h as c, N as i, F as n, u as o, S as r, g as s, R as t };
