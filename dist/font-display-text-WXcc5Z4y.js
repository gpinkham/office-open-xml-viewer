//#region packages/pptx/src/font-display-text.ts
function e(e, t) {
	let n = e.fieldType === "slidenum" && t !== void 0 ? String(t) : e.text;
	return e.caps === "all" || e.caps === "small" ? n.toUpperCase() : n;
}
//#endregion
export { e as t };
