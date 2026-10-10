//#region packages/core/src/worker/rejected-load.ts
function e(e, t) {
	if (t) try {
		t();
		return;
	} catch {}
	try {
		e.terminate();
	} catch {}
}
//#endregion
export { e as t };
