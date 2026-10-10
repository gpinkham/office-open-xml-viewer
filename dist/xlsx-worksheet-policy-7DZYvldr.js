import { _ as e, d as t, f as n, g as r, h as i, l as a, m as o, p as s, u as c } from "./resource-policy.generated-BTdyyO9v.js";
//#region packages/core/src/worker/xlsx-worksheet-policy.ts
var l = 2 ** 53 - 1 - 1;
function u(e) {
	return Object.freeze({
		maxRows: e.maxRows,
		maxCells: e.maxCells,
		maxOwnedUtf8Bytes: e.maxOwnedUtf8Bytes,
		maxJsonBytes: e.maxJsonBytes
	});
}
var d = Object.freeze({
	worksheet: u({
		maxRows: e,
		maxCells: o,
		maxOwnedUtf8Bytes: i,
		maxJsonBytes: r
	}),
	cache: u({
		maxRows: s,
		maxCells: c,
		maxOwnedUtf8Bytes: t,
		maxJsonBytes: n
	}),
	maxCoordinateIndexEntries: a
});
function f(e, t) {
	let n = e[t];
	if (n === void 0) return d.worksheet[t];
	if (typeof n != "number") throw TypeError(`xlsxWorksheetLimits.${t} must be a number`);
	if (!Number.isSafeInteger(n) || n <= 0 || n > l) throw RangeError(`xlsxWorksheetLimits.${t} must be a positive safe integer no greater than ${l}`);
	return n;
}
function p(e = {}) {
	let t = e.xlsxWorksheetLimits, n = {};
	if (t !== void 0) {
		if (typeof t != "object" || !t || Array.isArray(t)) throw TypeError("xlsxWorksheetLimits must be a non-null, non-array object");
		n = t;
	}
	let r = u({
		maxRows: f(n, "maxRows"),
		maxCells: f(n, "maxCells"),
		maxOwnedUtf8Bytes: f(n, "maxOwnedUtf8Bytes"),
		maxJsonBytes: f(n, "maxJsonBytes")
	}), i = d, a = u({
		maxRows: Math.max(i.cache.maxRows, r.maxRows),
		maxCells: Math.max(i.cache.maxCells, r.maxCells),
		maxOwnedUtf8Bytes: Math.max(i.cache.maxOwnedUtf8Bytes, r.maxOwnedUtf8Bytes),
		maxJsonBytes: Math.max(i.cache.maxJsonBytes, r.maxJsonBytes)
	});
	return Object.freeze({
		worksheet: r,
		cache: a,
		maxCoordinateIndexEntries: Math.max(i.maxCoordinateIndexEntries, r.maxCells)
	});
}
function m(e) {
	let { worksheet: t } = e;
	return [
		BigInt(t.maxRows),
		BigInt(t.maxCells),
		BigInt(t.maxOwnedUtf8Bytes),
		BigInt(t.maxJsonBytes)
	];
}
//#endregion
export { p as n, m as r, d as t };
