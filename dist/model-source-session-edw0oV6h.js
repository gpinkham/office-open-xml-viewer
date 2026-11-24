import { n as e } from "./abort-JztSoyw2.js";
import { i as t, t as n } from "./error-wire-DcmmIbXu.js";
import { i as r, n as i } from "./resource-debug-BMgDiKq1.js";
import { n as a } from "./worksheet-policy-G1KBtmuQ.js";
import { o } from "./model-source-BwpDCGYU.js";
import { t as s } from "./host-layout-Cz_lCuTZ.js";
var c = [
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
function l(e) {
	return o(e, "XLSX", c), e;
}
function u(e) {
	let [t] = Object.keys(e);
	if (t !== void 0) throw TypeError(`unsupported XLSX model source view default: ${t}`);
}
function d(e, t) {
	let r = e(), i = t();
	return {
		workbook: r,
		usage: i === void 0 ? void 0 : n(i)
	};
}
var f = "XLSX workbook session was aborted";
function p(n, o = {}) {
	let s;
	try {
		let t = a(o);
		if (!Number.isSafeInteger(n.sourceByteLength) || n.sourceByteLength < 0) throw RangeError("XLSX sourceByteLength must be a non-negative safe integer");
		let c = r(o);
		s = new i({
			enabled: c.debug || c.onResourceMetrics !== void 0,
			format: "xlsx",
			mode: "node",
			scope: "session",
			policy: c.policy,
			formatLimits: { xlsxWorksheetLimits: { ...t.worksheet } },
			onMetrics: c.onResourceMetrics,
			emitToConsole: c.debug
		}), s.setSourceBytes(n.sourceByteLength), e(o.signal, f);
		let l = n.archive, { workbook: u, usage: p } = d(() => JSON.parse(new TextDecoder().decode(l.parse())), () => l.resource_usage?.());
		return n.layoutMetrics && (u.layoutMetrics = { maximumDigitWidth: n.layoutMetrics.maximumDigitWidth }), s.observeUsage(p), s.checkpoint("workbook index ready"), {
			archive: l,
			workbookIndex: u,
			usage: p,
			metrics: s,
			worksheetPolicy: t,
			closeArchive: () => n.closeArchive()
		};
	} catch (e) {
		try {
			n.closeArchive();
		} catch {}
		let r = t(e) ?? e;
		throw s?.fail(r), r;
	}
}
export { p as acquireXlsxSessionFromArchive, s as configureHostLayout, l as validateXlsxModelSourceArchive, u as validateXlsxModelSourceViewDefaults };
