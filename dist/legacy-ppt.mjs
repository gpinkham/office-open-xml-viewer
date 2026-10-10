import { t as e } from "./legacy-source-DgtUpSt0.js";
//#region packages/legacy-converter/src/wasm-direct-ppt/legacy_ppt_direct_bg.wasm?url
var t = new URL("legacy_ppt_direct_bg.wasm", import.meta.url).href, n = new URL("legacy-ppt-source-module.mjs", import.meta.url).href;
//#endregion
//#region packages/legacy-converter/src/legacy-ppt.ts
function r(r = {}) {
	return e("ppt", r, {
		wasmUrl: new URL(t, import.meta.url).href,
		moduleUrl: new URL(n, import.meta.url).href
	});
}
//#endregion
export { r as legacyPptSource };
