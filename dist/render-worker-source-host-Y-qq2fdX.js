//#region packages/docx/src/render-worker-source.ts?worker&url
var e = "" + new URL("assets/render-worker-source-C7hljURm.js", import.meta.url).href;
//#endregion
//#region packages/docx/src/render-worker-source-host.ts
function t() {
	return new Worker(e, { type: "module" });
}
//#endregion
export { t as createRenderWorker };
