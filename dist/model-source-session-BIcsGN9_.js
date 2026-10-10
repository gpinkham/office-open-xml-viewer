import { i as e, n as t } from "./resource-debug-Bp6LglgZ.js";
import { r as n } from "./error-wire-rJNDxWbL.js";
import { r } from "./presentation-preflight-HAt3EOyB.js";
import { i } from "./model-source-BsxsLLHq.js";
//#region packages/pptx/src/internal/worker-presentation-source.ts
var a = [
	"pull_slide",
	"slide_cursor_resource_usage",
	"acknowledge_slide",
	"cancel_slide",
	"close_presentation_session",
	"assert_healthy",
	"presentation_bootstrap",
	"extract_image"
];
function o(e) {
	return i(e, "PPTX", a), e;
}
function s(e) {
	let [t] = Object.keys(e);
	if (t !== void 0) throw TypeError(`unsupported PPTX model source view default: ${t}`);
}
//#endregion
//#region packages/pptx/src/internal/node-session-acquisition.ts
function c(i, a = {}, o) {
	let s = !1, c = () => {
		s || (s = !0, i.closeArchive());
	}, u = o;
	try {
		if (!Number.isSafeInteger(i.sourceByteLength) || i.sourceByteLength < 0) throw RangeError("PPTX sourceByteLength must be a non-negative safe integer");
		let n = e(a);
		u ??= new t({
			enabled: n.debug || n.onResourceMetrics !== void 0,
			format: "pptx",
			mode: "node",
			scope: "session",
			policy: n.policy,
			onMetrics: n.onResourceMetrics,
			emitToConsole: n.debug
		}), o || u.setSourceBytes(i.sourceByteLength), l(a.signal);
		let s = r(JSON.parse(new TextDecoder().decode(i.archive.presentation_bootstrap())));
		return l(a.signal), u.checkpoint("presentation bootstrap ready"), {
			archive: i.archive,
			bootstrap: s,
			metrics: u,
			closeArchive: c
		};
	} catch (e) {
		try {
			c();
		} catch {}
		let t = n(e) ?? e;
		throw u?.fail(t), t;
	}
}
function l(e) {
	if (!e?.aborted) return;
	let t = /* @__PURE__ */ Error("PPTX presentation session was aborted");
	throw t.name = "AbortError", t;
}
//#endregion
export { c as acquirePptxSessionFromArchive, o as validatePptxModelSourceArchive, s as validatePptxModelSourceViewDefaults };
