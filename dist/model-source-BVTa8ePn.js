import { t as e } from "./cfb-guard-B9x7ZJTE.js";
import { a as t, n, r } from "./model-source-BsxsLLHq.js";
//#region packages/node/src/model-source.ts
async function i(i, a, o, s) {
	let c = i instanceof Uint8Array ? i : new Uint8Array(i), l = o.modelSources === void 0 ? void 0 : t(o.modelSources, a, c);
	if (!l) return {
		kind: "ooxml",
		bytes: await e(c, o.password)
	};
	let u = n(l, a);
	try {
		let e = await r(u.module, c, s, o.signal, u.transfer);
		try {
			u.release();
		} catch (t) {
			try {
				e.close();
			} catch {}
			throw t;
		}
		return {
			kind: "model-source",
			opened: e,
			sourceByteLength: c.byteLength
		};
	} finally {
		u.release();
	}
}
//#endregion
export { i as t };
