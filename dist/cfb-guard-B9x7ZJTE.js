import { x as e } from "./resource-policy.generated-BTdyyO9v.js";
import { i as t, n } from "./cfb-sniff-B0ZvlWx2.js";
//#region packages/core/src/crypto/encryption-info.ts
function r(e) {
	if (typeof atob == "function") {
		let t = atob(e), n = new Uint8Array(t.length);
		for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
		return n;
	}
	let t = globalThis.Buffer;
	if (t) return new Uint8Array(t.from(e, "base64"));
	throw Error("no base64 decoder available");
}
function i(e, t, n) {
	let r = RegExp(`<(?:[\\w]+:)?${t}\\b[^>]*>`).exec(e);
	if (!r) return null;
	let i = r[0], a = RegExp(`\\b${n}\\s*=\\s*"([^"]*)"`).exec(i);
	return a ? a[1] : null;
}
function a(e) {
	if (e === null) return null;
	let t = Number(e);
	return Number.isFinite(t) ? t : null;
}
function o(e, t) {
	let n = a(i(e, t, "saltSize")), o = a(i(e, t, "blockSize")), s = a(i(e, t, "keyBits")), c = a(i(e, t, "hashSize")), l = i(e, t, "cipherAlgorithm"), u = i(e, t, "cipherChaining"), d = i(e, t, "hashAlgorithm"), f = i(e, t, "saltValue");
	return n === null || o === null || s === null || c === null || !l || !u || !d || f === null ? null : {
		saltSize: n,
		blockSize: o,
		keyBits: s,
		hashSize: c,
		cipherAlgorithm: l,
		cipherChaining: u,
		hashAlgorithm: d,
		saltValue: r(f)
	};
}
function s(e) {
	if (e.length < 8) return { kind: "unknown" };
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength), n = t.getUint16(0, !0), r = t.getUint16(2, !0);
	if (n === 4 && r === 4) {
		let t = c(e.subarray(8));
		return t ? {
			kind: "agile",
			descriptor: t
		} : { kind: "unknown" };
	}
	return r === 16 && (n === 3 || n === 4) ? { kind: "extensible" } : r === 2 && (n === 2 || n === 3 || n === 4) ? { kind: "standard" } : { kind: "unknown" };
}
function c(e) {
	let t = new TextDecoder("utf-8").decode(e), n = o(t, "keyData"), s = o(t, "encryptedKey");
	if (!n || !s) return null;
	let c = a(i(t, "encryptedKey", "spinCount")), l = i(t, "encryptedKey", "encryptedVerifierHashInput"), u = i(t, "encryptedKey", "encryptedVerifierHashValue"), d = i(t, "encryptedKey", "encryptedKeyValue");
	if (c === null || l === null || u === null || d === null) return null;
	let f = {
		...s,
		spinCount: c,
		encryptedVerifierHashInput: r(l),
		encryptedVerifierHashValue: r(u),
		encryptedKeyValue: r(d)
	}, p = null, m = i(t, "dataIntegrity", "encryptedHmacKey"), h = i(t, "dataIntegrity", "encryptedHmacValue");
	return m !== null && h !== null && (p = {
		encryptedHmacKey: r(m),
		encryptedHmacValue: r(h)
	}), {
		keyData: n,
		passwordKeyEncryptor: f,
		dataIntegrity: p
	};
}
//#endregion
//#region packages/core/src/crypto/agile.ts
var l = {
	verifierHashInput: new Uint8Array([
		254,
		167,
		210,
		118,
		59,
		75,
		158,
		121
	]),
	verifierHashValue: new Uint8Array([
		215,
		170,
		15,
		109,
		48,
		97,
		52,
		78
	]),
	keyValue: new Uint8Array([
		20,
		110,
		11,
		231,
		171,
		172,
		208,
		214
	]),
	hmacKey: new Uint8Array([
		95,
		178,
		173,
		1,
		12,
		185,
		225,
		246
	]),
	hmacValue: new Uint8Array([
		160,
		103,
		127,
		2,
		178,
		44,
		132,
		51
	])
}, u = 54, d = 4096, f = class extends Error {
	reason;
	constructor(e, t) {
		super(t), this.name = "AgileDecryptError", this.reason = e;
	}
};
function p() {
	let e = globalThis.crypto;
	if (!e || !e.subtle) throw new f("unsupported-encryption", "WebCrypto (globalThis.crypto.subtle) is unavailable; cannot decrypt.");
	return e.subtle;
}
function m(e) {
	switch (e.toUpperCase().replace(/[-_]/g, "")) {
		case "SHA512": return "SHA-512";
		case "SHA384": return "SHA-384";
		case "SHA256": return "SHA-256";
		case "SHA1": return "SHA-1";
		default: throw new f("unsupported-encryption", `Unsupported hashAlgorithm "${e}" (only SHA-1/256/384/512).`);
	}
}
function h(e) {
	if (e.cipherAlgorithm.toUpperCase() !== "AES") throw new f("unsupported-encryption", `Unsupported cipherAlgorithm "${e.cipherAlgorithm}" (only AES).`);
	if (e.cipherChaining.toLowerCase() !== "chainingmodecbc") throw new f("unsupported-encryption", `Unsupported cipherChaining "${e.cipherChaining}" (only ChainingModeCBC).`);
	if (e.keyBits !== 128 && e.keyBits !== 192 && e.keyBits !== 256) throw new f("unsupported-encryption", `Unsupported keyBits ${e.keyBits} (only 128/192/256).`);
}
function g(...e) {
	let t = e.reduce((e, t) => e + t.length, 0), n = new Uint8Array(t), r = 0;
	for (let t of e) n.set(t, r), r += t.length;
	return n;
}
function _(e) {
	let t = new Uint8Array(4);
	return new DataView(t.buffer).setUint32(0, e >>> 0, !0), t;
}
function v(e) {
	let t = new Uint8Array(e.length * 2), n = new DataView(t.buffer);
	for (let t = 0; t < e.length; t++) n.setUint16(t * 2, e.charCodeAt(t), !0);
	return t;
}
async function y(e, t) {
	return new Uint8Array(await p().digest(e, t));
}
function b(e, t) {
	if (e.length > t) return e.slice(0, t);
	let n = new Uint8Array(t);
	return n.set(e), e.length < t && n.fill(u, e.length), n;
}
async function x(e, t, n, r) {
	let i = m(t.hashAlgorithm), a = await y(i, g(t.saltValue, v(e)));
	for (let e = 0; e < n; e++) a = await y(i, g(_(e), a));
	return b(await y(i, g(a, r)), t.keyBits / 8);
}
async function S(e, t, n) {
	return b(n ? await y(m(e.hashAlgorithm), g(t, n)) : t, e.blockSize);
}
async function C(e, t, n) {
	let r = t.length;
	if (n.length === 0) return new Uint8Array();
	if (n.length % r !== 0) throw new f("corrupt", "ciphertext length is not a multiple of the block size");
	let i = await p().importKey("raw", e, { name: "AES-CBC" }, !1, ["decrypt"]), a = await p().importKey("raw", e, { name: "AES-CBC" }, !1, ["encrypt"]), o = n.subarray(n.length - r), s = w(new Uint8Array(r).fill(r), o), c = g(n, new Uint8Array(await p().encrypt({
		name: "AES-CBC",
		iv: new Uint8Array(r)
	}, a, s)).subarray(0, r)), l = new Uint8Array(await p().decrypt({
		name: "AES-CBC",
		iv: t
	}, i, c));
	return l.length >= n.length ? l.subarray(0, n.length) : l;
}
function w(e, t) {
	let n = new Uint8Array(e.length);
	for (let r = 0; r < e.length; r++) n[r] = e[r] ^ t[r];
	return n;
}
async function T(e, t) {
	h(t);
	let n = m(t.hashAlgorithm), r = await C(await x(e, t, t.spinCount, l.verifierHashInput), await S(t, t.saltValue, null), t.encryptedVerifierHashInput), i = await C(await x(e, t, t.spinCount, l.verifierHashValue), await S(t, t.saltValue, null), t.encryptedVerifierHashValue);
	return E((await y(n, r)).subarray(0, t.hashSize), i.subarray(0, t.hashSize));
}
function E(e, t) {
	if (e.length !== t.length) return !1;
	let n = 0;
	for (let r = 0; r < e.length; r++) n |= e[r] ^ t[r];
	return n === 0;
}
async function D(e, t) {
	return await C(await x(e, t, t.spinCount, l.keyValue), await S(t, t.saltValue, null), t.encryptedKeyValue);
}
async function O(e, t, n) {
	if (h(t), e.length < 8) throw new f("corrupt", "EncryptedPackage is shorter than its size prefix");
	let r = new DataView(e.buffer, e.byteOffset, e.byteLength), i = Number(r.getBigUint64(0, !0)), a = e.subarray(8);
	if (i > a.length) throw new f("corrupt", "EncryptedPackage size prefix exceeds the ciphertext");
	let o = n.slice(0, t.keyBits / 8), s = new Uint8Array(i), c = 0, l = 0;
	for (let e = 0; e < a.length; e += d) {
		let n = a.subarray(e, e + d), r = await C(o, await S(t, t.saltValue, _(l)), n), u = Math.min(r.length, i - c);
		if (s.set(r.subarray(0, u), c), c += u, l++, c >= i) break;
	}
	if (c !== i) throw new f("corrupt", "decrypted output is shorter than the declared size");
	return s;
}
async function k(e, t, n) {
	let { keyData: r, passwordKeyEncryptor: i } = e;
	if (h(r), h(i), !await T(n, i)) throw new f("invalid-password", "The supplied password is incorrect.");
	return O(t, r, await D(n, i));
}
//#endregion
//#region packages/core/src/crypto/decrypt-ooxml.ts
var A = "EncryptionInfo", j = "EncryptedPackage";
async function M(e, n) {
	let r = t(e, A), i = t(e, j);
	if (r === null || i === null) return {
		ok: !1,
		reason: "corrupt"
	};
	let a = s(r);
	if (a.kind !== "agile") return {
		ok: !1,
		reason: "unsupported-encryption"
	};
	try {
		return {
			ok: !0,
			data: await k(a.descriptor, i, n)
		};
	} catch (e) {
		return e instanceof f ? {
			ok: !1,
			reason: e.reason
		} : {
			ok: !1,
			reason: "corrupt"
		};
	}
}
//#endregion
//#region packages/core/src/errors/cfb-guard.ts
function N(t) {
	let r = n(t instanceof Uint8Array ? t : new Uint8Array(t));
	if (r !== null) switch (r) {
		case "encrypted": throw new e("encrypted", "This file is password-protected (MS-OFFCRYPTO). Pass LoadOptions.password to decrypt it.");
		case "legacy-binary-format": throw new e("legacy-binary-format", "This is a legacy binary Office file (.doc/.xls/.ppt), not OOXML.");
		case "cfb-unknown": throw new e("not-ooxml", "This file is an OLE2/Compound File container, not an OOXML (ZIP) document.");
		default: throw new e("not-ooxml", "This file is an OLE2/Compound File container of an unrecognised kind, not an OOXML (ZIP) document.");
	}
}
async function P(t, r) {
	let i = t instanceof Uint8Array ? t : new Uint8Array(t), a = n(i);
	if (a === null) return i;
	if (a === "encrypted") {
		if (r === void 0) throw new e("encrypted", "This file is password-protected (MS-OFFCRYPTO). Pass LoadOptions.password to decrypt it.");
		let t = await M(i, r);
		if (t.ok) return t.data;
		switch (t.reason) {
			case "invalid-password": throw new e("invalid-password", "The supplied password is incorrect.");
			case "unsupported-encryption": throw new e("unsupported-encryption", "This file uses an encryption scheme other than Agile ([MS-OFFCRYPTO]) that is not supported (Standard / Extensible / legacy binary encryption).");
			case "corrupt": throw new e("not-ooxml", "This file is an encrypted OLE2/Compound File container but its structure could not be read.");
			default: throw t.reason, new e("not-ooxml", "This encrypted file could not be decrypted.");
		}
	}
	return N(i), i;
}
function F(e) {
	if (e.byteOffset === 0 && e.byteLength === e.buffer.byteLength && e.buffer instanceof ArrayBuffer) return e.buffer;
	let t = new Uint8Array(e.byteLength);
	return t.set(e), t.buffer;
}
//#endregion
export { F as n, P as t };
