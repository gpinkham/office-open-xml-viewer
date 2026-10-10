import { i as e, n as t } from "./resource-debug-Bp6LglgZ.js";
import { i as n } from "./error-wire-rJNDxWbL.js";
import { i as r } from "./model-source-BsxsLLHq.js";
import { t as i } from "./in-process-pull-transport-C2_At2ns.js";
import { n as a, t as o } from "./document-pull-worker-DuUmPK10.js";
//#region packages/docx/src/internal/worker-document-source.ts
var s = [
	"open_document_cursor",
	"pull_document_chunk",
	"document_chunk_done",
	"acknowledge_document_chunk",
	"cancel_document_cursor",
	"close_document_session",
	"assert_healthy",
	"extract_image"
];
function c(e) {
	return r(e, "DOCX", s), e;
}
function l(e) {
	for (let t of Object.keys(e)) if (t !== "showTrackedChanges") throw TypeError(`unsupported DOCX model source view default: ${t}`);
	return e.showTrackedChanges === void 0 ? {} : { showTrackedChanges: e.showTrackedChanges };
}
//#endregion
//#region packages/docx/src/internal/node-model-source-acquisition.ts
function u(e) {
	if (!e?.aborted) return;
	let t = /* @__PURE__ */ Error("DOCX document session was aborted");
	throw t.name = "AbortError", t;
}
async function d(r, i, a) {
	let o = !1, s = () => {
		o || (o = !0, r.closeArchive());
	}, c;
	try {
		if (!Number.isSafeInteger(r.sourceByteLength) || r.sourceByteLength < 0) throw RangeError("DOCX sourceByteLength must be a non-negative safe integer");
		let n = e(i);
		c = new t({
			enabled: n.debug || n.onResourceMetrics !== void 0,
			format: "docx",
			mode: "node",
			scope: "session",
			policy: n.policy,
			onMetrics: n.onResourceMetrics,
			emitToConsole: n.debug
		}), c.setSourceBytes(r.sourceByteLength), u(i.signal), c.checkpoint("container ready");
	} catch (e) {
		try {
			s();
		} catch {}
		let t = n(e) ?? e;
		throw c?.fail(t), t;
	}
	return f(r.archive, s, c, i, a);
}
async function f(e, t, r, s, c) {
	let l, u;
	try {
		l = new o(() => e);
		let n = {
			sessionId: 1,
			operationId: 1,
			generation: 1
		};
		l.open(n), u = new i((e, t) => l?.dispatch(e, t), () => void 0);
		let d, f = await c(u, n, {
			signal: s.signal,
			onUsage: (e) => {
				d = e, r.observeUsage(e);
			}
		});
		return d ??= a((t) => t(e)), r.observeUsage(d), r.checkpoint("model streamed"), await l.reset(), u.terminate(), {
			archive: e,
			result: f,
			usage: d,
			metrics: r,
			closeArchive: t
		};
	} catch (e) {
		await l?.reset().catch(() => void 0), u?.terminate();
		try {
			t();
		} catch {}
		let i = n(e) ?? e;
		throw r.fail(i), i;
	}
}
//#endregion
export { d as acquireDocxSessionFromArchive, c as validateDocxModelSourceArchive, l as validateDocxModelSourceViewDefaults };
