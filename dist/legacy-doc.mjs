import { t as e } from "./legacy-source-DgtUpSt0.js";
//#region packages/legacy-converter/src/wasm-direct-doc/legacy_doc_direct_bg.wasm?url
var t = new URL("legacy_doc_direct_bg.wasm", import.meta.url).href, n = new URL("legacy-doc-source-module.mjs", import.meta.url).href;
//#endregion
//#region packages/legacy-converter/src/legacy-doc.ts
function r(r = {}) {
	return e("doc", r, {
		wasmUrl: new URL(t, import.meta.url).href,
		moduleUrl: new URL(n, import.meta.url).href
	});
}
//#endregion
export { r as legacyDocSource };
