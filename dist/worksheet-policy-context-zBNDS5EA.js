import { t as e } from "./xlsx-worksheet-policy-7DZYvldr.js";
//#region packages/xlsx/src/worksheet-policy-context.ts
var t = /* @__PURE__ */ new WeakMap();
function n(e, n) {
	t.set(e, n);
}
function r(n) {
	return t.get(n) ?? e;
}
function i(e, n) {
	let r = t.get(e);
	r === void 0 ? t.delete(n) : t.set(n, r);
}
//#endregion
export { r as n, i as r, n as t };
