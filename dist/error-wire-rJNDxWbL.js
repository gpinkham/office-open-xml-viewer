import { S as e, x as t } from "./resource-policy.generated-BTdyyO9v.js";
import { d as n, u as r } from "./pixel-budget-QcsXr21f.js";
import { n as i, t as a } from "./tiff-contract-BtmLs4Ug.js";
//#region packages/core/src/worker/pull-credit-error.ts
var o = "ooxml-insufficient-credit", s = "OOXML_INSUFFICIENT_CREDIT:";
function c(e) {
	return typeof e == "number" && Number.isSafeInteger(e) && e > 0;
}
function l(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return !1;
	let t = e;
	return c(t.requiredBytes) && c(t.offeredBytes) && t.requiredBytes > t.offeredBytes;
}
var u = class e extends RangeError {
	code = o;
	requiredBytes;
	offeredBytes;
	constructor(t) {
		super(`Pull unit requires ${t.requiredBytes} bytes but credit is ${t.offeredBytes}`), this.name = "PullSessionInsufficientCreditError", this.requiredBytes = t.requiredBytes, this.offeredBytes = t.offeredBytes, Object.setPrototypeOf(this, e.prototype);
	}
};
function d(e) {
	if (e instanceof u) return e;
	let t = e instanceof Error ? e.message : String(e);
	if (!t.startsWith(s)) return;
	let n;
	try {
		n = JSON.parse(t.slice(26));
	} catch {
		return;
	}
	if (!n || typeof n != "object" || Array.isArray(n)) return;
	let r = n;
	if (!(r.code !== "ooxml-insufficient-credit" || !l(r))) return new u(r);
}
function f(e, t, n) {
	let r = d(e);
	if (!(!r || r.offeredBytes !== t || r.requiredBytes > n)) return r;
}
function p(e, t, n) {
	if (m(e)) return e.offeredBytes === t && e.requiredBytes <= n ? e.requiredBytes : void 0;
}
function m(e) {
	return e instanceof u || !!e && typeof e == "object" && e.code === "ooxml-insufficient-credit" && l(e);
}
//#endregion
//#region packages/core/src/worker/error-wire.ts
var h = "OOXML_RESOURCE_LIMIT:", g = "OOXML_NOT_OOXML:", _ = "OOXML_DOCX_ILVL:", v = 128, y = 256, b = 4096;
function x(e) {
	return typeof e == "number" && Number.isSafeInteger(e) && e >= 0;
}
function S(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return !1;
	let t = e;
	return x(t.archiveEntryCount) && x(t.declaredInflatedBytes) && (t.largestInflatedEntryBytes === void 0 || x(t.largestInflatedEntryBytes)) && x(t.distinctInflatedBytes) && x(t.operationInflatedBytes);
}
function C(e) {
	let t;
	try {
		t = JSON.parse(new TextDecoder().decode(e));
	} catch {
		throw TypeError("OOXML resource usage checkpoint is not valid JSON");
	}
	if (!S(t)) throw TypeError("OOXML resource usage checkpoint is invalid");
	return t;
}
function w(e) {
	return e === "docx" || e === "xlsx" || e === "pptx";
}
function T(e) {
	return e === "container" || e === "decompression" || e === "parsing" || e === "serialization" || e === "layout" || e === "rendering" || e === "worker";
}
function E(e, t) {
	return typeof e == "string" && e.length > 0 && e.length <= t && !/[\u0000-\u001f\u007f]/u.test(e);
}
function D(e) {
	return E(e, v) && /^[a-z0-9][a-z0-9-]*$/u.test(e);
}
function O(e) {
	return !E(e, b) || e.startsWith("/") || e.startsWith("\\") || e.includes("\\") || e.includes("?") || e.includes("#") || e.includes("://") || /^[a-z]:/iu.test(e) ? !1 : e.split("/").every((e) => e !== "" && e !== "." && e !== "..");
}
var k = new Map([
	["archive-entry:declared-inflated-bytes", {
		stage: "container",
		part: "required"
	}],
	["archive-entry:actual-inflated-bytes", {
		stage: "decompression",
		part: "required"
	}],
	["archive:entry-count", {
		stage: "container",
		part: "forbidden"
	}],
	["archive:central-directory-bytes", {
		stage: "container",
		part: "forbidden",
		configurable: !1
	}],
	["archive:distinct-inflated-bytes", {
		stage: "decompression",
		part: "required"
	}],
	["xml-event:bytes", {
		stage: "parsing",
		part: "optional",
		configurable: !1
	}],
	["xml-context:bytes", {
		stage: "parsing",
		part: "optional",
		configurable: !1
	}],
	["chartex-allocation:elements", {
		stage: "parsing",
		part: "forbidden",
		configurable: !1
	}],
	["chartex-allocation:bytes", {
		stage: "parsing",
		part: "forbidden",
		configurable: !1
	}],
	["xml-tree:depth", {
		stage: "parsing",
		part: "optional",
		configurable: !1
	}],
	["worksheet-row:projected-bytes", {
		stage: "parsing",
		part: "optional",
		configurable: !1
	}],
	["worksheet-shell:projected-bytes", {
		stage: "parsing",
		part: "optional",
		configurable: !1
	}]
]), A = new Set([...k.keys()].map((e) => e.slice(0, e.indexOf(":")))), j = new Set([...k.keys()].map((e) => e.slice(e.indexOf(":") + 1)));
function M(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return !1;
	let t = e;
	return !w(t.format) || !E(t.operation, y) || !D(t.resource) || !D(t.metric) || !x(t.limit) || !x(t.observed) || typeof t.configurable != "boolean" || !S(t.usage) ? !1 : !("part" in t) || O(t.part);
}
function N(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return !1;
	let t = e;
	if (!T(t.stage) || !M(t.violation)) return !1;
	let n = t.violation, r = k.get(`${n.resource}:${n.metric}`);
	return r ? t.stage !== r.stage || r.configurable === !1 && n.configurable !== !1 ? !1 : r.part === "required" ? n.part !== void 0 : r.part === "forbidden" ? n.part === void 0 : !0 : !(A.has(n.resource) && j.has(n.metric));
}
function P(e) {
	return {
		archiveEntryCount: e.archiveEntryCount,
		declaredInflatedBytes: e.declaredInflatedBytes,
		...e.largestInflatedEntryBytes === void 0 ? {} : { largestInflatedEntryBytes: e.largestInflatedEntryBytes },
		distinctInflatedBytes: e.distinctInflatedBytes,
		operationInflatedBytes: e.operationInflatedBytes
	};
}
function F(e) {
	if (!N(e)) return;
	let t = e.violation, n = {
		stage: e.stage,
		violation: {
			format: t.format,
			operation: t.operation,
			resource: t.resource,
			metric: t.metric,
			...t.part === void 0 ? {} : { part: t.part },
			limit: t.limit,
			observed: t.observed,
			configurable: t.configurable,
			usage: P(t.usage)
		}
	};
	return N(n) ? n : void 0;
}
function I(e) {
	let t = e.violation;
	return `OOXML resource limit exceeded${t.part ? ` for ${t.part}` : ""}: ${t.metric} ${t.observed} > ${t.limit}`;
}
function L(t) {
	let n = t instanceof Error ? t.message : String(t);
	if (!n.startsWith(h)) return;
	let r;
	try {
		r = JSON.parse(n.slice(21));
	} catch {
		return;
	}
	if (!r || typeof r != "object") return;
	let i = r;
	if (!(i.code !== "ooxml-resource-limit" || !N(i.details))) return new e(I(i.details), i.details);
}
function R(e) {
	let n = e instanceof Error ? e.message : String(e);
	if (n.startsWith(g)) return new t("not-ooxml", `This file is not an Office Open XML document: ${n.slice(16)}`);
}
function z(e) {
	let n = e instanceof Error ? e.message : String(e);
	if (!n.startsWith(_)) return;
	let r = n.slice(16);
	if (r === "repair-required:level-definition") return new t("invalid-numbering", "The DOCX defines a numbering level outside Word’s supported 0–8 range and requires repair.");
	if (r === "cannot-open:whitespace" || r === "cannot-open:non-decimal") return new t("invalid-numbering", `Word cannot open this DOCX numbering level (${r.slice(12)}).`);
}
function B(e) {
	return L(e) ?? R(e) ?? z(e);
}
function V(a) {
	let o = n(a);
	if (o) {
		let e = new r(o.metric, o.limit, o.observed);
		return {
			message: e.message,
			errorName: e.name,
			code: e.code,
			decodedImage: o
		};
	}
	let s = i(a);
	if (s) return {
		message: s.message,
		errorName: "TiffDecodeError",
		code: "ooxml-tiff-decode"
	};
	let c = d(a);
	if (c) return {
		message: c.message,
		errorName: c.name,
		code: c.code,
		insufficientCredit: {
			requiredBytes: c.requiredBytes,
			offeredBytes: c.offeredBytes
		}
	};
	let l = a instanceof t || a instanceof e ? a : B(a);
	if (l instanceof e) {
		let e = F(l.details);
		return e ? {
			message: typeof l.message == "string" ? l.message : I(e),
			errorName: "OoxmlResourceLimitError",
			code: "ooxml-resource-limit",
			resourceLimit: e
		} : {
			message: "Invalid OOXML resource-limit error payload",
			errorName: "Error"
		};
	}
	if (l instanceof t) return {
		message: typeof l.message == "string" ? l.message : String(l.message),
		errorName: E(l.name, v) ? l.name : "OoxmlError",
		...D(l.code) ? { code: l.code } : {}
	};
	let u = a instanceof Error ? a.message : String(a);
	if (typeof u == "string" && u.startsWith(h)) return {
		message: "Invalid OOXML resource-limit payload",
		errorName: "Error"
	};
	let f = a instanceof Error ? a : Error(u), p = f;
	return {
		message: typeof f.message == "string" ? f.message : String(f.message),
		errorName: E(f.name, v) ? f.name : "Error",
		...typeof p.code == "string" ? { code: p.code } : {}
	};
}
function H(e) {
	try {
		return V(e);
	} catch {
		return {
			message: "Worker operation failed with an unreadable error",
			errorName: "Error"
		};
	}
}
var U = new Set([
	"encrypted",
	"invalid-password",
	"unsupported-encryption",
	"legacy-binary-format",
	"not-ooxml",
	"invalid-numbering"
]), W = {
	"image-dimension": !0,
	"image-pixels": !0,
	"active-decoded-bytes": !0,
	"image-effect-count": !0,
	"image-effect-work": !0
};
function G(e) {
	return typeof e == "string" && Object.prototype.hasOwnProperty.call(W, e);
}
function K(e, t) {
	if (e !== "ooxml-decoded-image-limit" || !t || typeof t != "object") return;
	let n = t, r = n.metric, i = n.limit, a = n.observed;
	if (!(!G(r) || !x(i) || !x(a) || a <= i)) return {
		metric: r,
		limit: i,
		observed: a
	};
}
function q(n) {
	let i = n.message, o = n.errorName, s = n.code, c = n.decodedImage, d = n.insufficientCredit, f = n.resourceLimit, p = typeof i == "string" ? i : "Worker operation failed with an invalid error payload", m = E(o, v) ? o : void 0, h = typeof s == "string" ? s : void 0, g = K(h, c);
	if (g) return new r(g.metric, g.limit, g.observed);
	if (h === "ooxml-tiff-decode") return new a(p);
	if (h === "ooxml-insufficient-credit" && l(d)) return new u(d);
	if (h === "ooxml-resource-limit" && N(f)) return new e(p, f);
	if (h && U.has(h)) return new t(h, p);
	let _ = m === "TypeError" ? TypeError(p) : m === "RangeError" ? RangeError(p) : Error(p);
	return m && (_.name = m), h !== void 0 && Object.assign(_, { code: h }), _;
}
function J(e) {
	try {
		return q(e);
	} catch {
		return /* @__PURE__ */ Error("Worker operation failed with an unreadable error payload");
	}
}
//#endregion
export { H as a, p as c, B as i, J as n, m as o, L as r, f as s, C as t };
