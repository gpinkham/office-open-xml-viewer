import { existsSync as e, readFileSync as t } from "node:fs";
import { fileURLToPath as n } from "node:url";
import { basename as r, dirname as i, resolve as a } from "node:path";
async function o(e, t) {
	let n = await e(), r;
	try {
		return await t(n);
	} catch (e) {
		throw r = e, e;
	} finally {
		try {
			await n.close();
		} catch (e) {
			if (r === void 0) throw e;
		}
	}
}
function s(e) {
	return e instanceof Uint8Array ? e : new Uint8Array(e);
}
function c(e) {
	let t = e instanceof Date ? e.getTime() : e ?? Date.now();
	if (!Number.isFinite(t)) throw RangeError("currentDate must resolve to finite epoch milliseconds");
	return t;
}
function l(e) {
	return new WebAssembly.Module(t(e));
}
function u(e, t = l) {
	let n = {};
	return () => n.value ??= t(e());
}
function d(t, o, s) {
	let c = i(n(t)), l = a(c, o);
	if (e(l)) return l;
	let u = a(c, r(o));
	return e(u) || !s ? u : n(import.meta.resolve(s));
}
export { o as a, s as i, d as n, c as r, u as t };
