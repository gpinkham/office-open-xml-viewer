import { n as e } from "./abort-JztSoyw2.js";
import { r as t } from "./error-wire-DcmmIbXu.js";
import { i as n, n as r } from "./resource-debug-BMgDiKq1.js";
import { r as i } from "./presentation-preflight-CI5kmMvH.js";
import { o as a } from "./model-source-BwpDCGYU.js";
var o = [
	"pull_slide",
	"slide_cursor_resource_usage",
	"acknowledge_slide",
	"cancel_slide",
	"close_presentation_session",
	"assert_healthy",
	"presentation_bootstrap",
	"extract_image"
];
function s(e) {
	return a(e, "PPTX", o), e;
}
function c(e) {
	let [t] = Object.keys(e);
	if (t !== void 0) throw TypeError(`unsupported PPTX model source view default: ${t}`);
}
var l = "PPTX presentation session was aborted";
function u(a, o = {}, s) {
	let c = !1, u = () => {
		c || (c = !0, a.closeArchive());
	}, d = s;
	try {
		if (!Number.isSafeInteger(a.sourceByteLength) || a.sourceByteLength < 0) throw RangeError("PPTX sourceByteLength must be a non-negative safe integer");
		let t = n(o);
		d ??= new r({
			enabled: t.debug || t.onResourceMetrics !== void 0,
			format: "pptx",
			mode: "node",
			scope: "session",
			policy: t.policy,
			onMetrics: t.onResourceMetrics,
			emitToConsole: t.debug
		}), s || d.setSourceBytes(a.sourceByteLength), e(o.signal, l);
		let c = i(JSON.parse(new TextDecoder().decode(a.archive.presentation_bootstrap())));
		return e(o.signal, l), d.checkpoint("presentation bootstrap ready"), {
			archive: a.archive,
			bootstrap: c,
			metrics: d,
			closeArchive: u
		};
	} catch (e) {
		try {
			u();
		} catch {}
		let n = t(e) ?? e;
		throw d?.fail(n), n;
	}
}
export { u as acquirePptxSessionFromArchive, s as validatePptxModelSourceArchive, c as validatePptxModelSourceViewDefaults };
