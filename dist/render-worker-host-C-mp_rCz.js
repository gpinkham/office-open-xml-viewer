//#region packages/xlsx/src/render-worker.ts?worker&url
var e = "" + new URL("assets/render-worker-B-2DJmfK.js", import.meta.url).href;
//#endregion
//#region packages/xlsx/src/render-worker-host.ts
function t() {
	return new Worker(e, { type: "module" });
}
//#endregion
export { t as createRenderWorker };
