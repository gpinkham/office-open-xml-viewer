import { i as e, n as t } from "./resource-debug-Bp6LglgZ.js";
import { i as n, t as r } from "./error-wire-rJNDxWbL.js";
import { n as i } from "./xlsx-worksheet-policy-7DZYvldr.js";
import { i as a } from "./model-source-BsxsLLHq.js";
import { t as o } from "./host-layout-CA9alpSL.js";
//#region packages/xlsx/src/internal/worker-worksheet-source.ts
var s = [
	"open_sheet_cursor",
	"pull_sheet_cursor",
	"sheet_cursor_pull_finished",
	"acknowledge_sheet_cursor_terminal",
	"cancel_sheet_cursor",
	"close_sheet_cursor",
	"assert_healthy",
	"parse",
	"extract_image"
];
function c(e) {
	return a(e, "XLSX", s), e;
}
function l(e) {
	let [t] = Object.keys(e);
	if (t !== void 0) throw TypeError(`unsupported XLSX model source view default: ${t}`);
}
//#endregion
//#region packages/xlsx/src/internal/archive-bootstrap-source.ts
function u(e, t) {
	let n = e(), i = t();
	return {
		workbook: n,
		usage: i === void 0 ? void 0 : r(i)
	};
}
//#endregion
//#region packages/xlsx/src/internal/node-model-source-acquisition.ts
function d(e) {
	if (!e?.aborted) return;
	let t = /* @__PURE__ */ Error("XLSX workbook session was aborted");
	throw t.name = "AbortError", t;
}
function f(r, a = {}) {
	let o;
	try {
		let n = i(a);
		if (!Number.isSafeInteger(r.sourceByteLength) || r.sourceByteLength < 0) throw RangeError("XLSX sourceByteLength must be a non-negative safe integer");
		let s = e(a);
		o = new t({
			enabled: s.debug || s.onResourceMetrics !== void 0,
			format: "xlsx",
			mode: "node",
			scope: "session",
			policy: s.policy,
			xlsxWorksheetPolicy: n,
			onMetrics: s.onResourceMetrics,
			emitToConsole: s.debug
		}), o.setSourceBytes(r.sourceByteLength), d(a.signal);
		let c = r.archive, { workbook: l, usage: f } = u(() => JSON.parse(new TextDecoder().decode(c.parse())), () => c.resource_usage?.());
		return r.layoutMetrics && (l.layoutMetrics = { maximumDigitWidth: r.layoutMetrics.maximumDigitWidth }), o.observeUsage(f), o.checkpoint("workbook index ready"), {
			archive: c,
			workbookIndex: l,
			usage: f,
			metrics: o,
			worksheetPolicy: n,
			closeArchive: () => r.closeArchive()
		};
	} catch (e) {
		try {
			r.closeArchive();
		} catch {}
		let t = n(e) ?? e;
		throw o?.fail(t), t;
	}
}
//#endregion
export { f as acquireXlsxSessionFromArchive, o as configureHostLayout, c as validateXlsxModelSourceArchive, l as validateXlsxModelSourceViewDefaults };
