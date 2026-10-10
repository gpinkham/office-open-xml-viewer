import { n as e, r as t } from "./resource-policy.generated-BTdyyO9v.js";
import { a as n, s as r, t as i } from "./error-wire-rJNDxWbL.js";
import { t as a } from "./transfer-bsZEzkZu.js";
import { i as o, n as s, r as c } from "./pull-session-BzHuXyzF.js";
//#region packages/docx/src/document-pull-worker.ts
function l(e) {
	let t = e((e) => e.document_cursor_resource_usage?.());
	return t ? i(t) : void 0;
}
var u = Math.max(e, t), d = class {
	coordinator = new o();
	host = null;
	identity = null;
	constructor(e, t = (e) => e(this.requireArchive())) {
		this.archive = e, this.executeArchive = t;
	}
	open(e) {
		if (this.host) throw Error("a DOCX document pull session is already active");
		this.executeArchive((t) => {
			t.open_document_cursor(e.operationId, e.generation);
		});
		let t = 0;
		this.identity = e, this.host = new c({
			...e,
			maxByteCredit: u,
			coordinator: this.coordinator,
			driver: {
				pull: (n) => {
					let i;
					try {
						i = this.executeArchive((r) => r.pull_document_chunk(t, e.operationId, e.generation, n));
					} catch (e) {
						throw r(e, n, u) || e;
					}
					let o = a(i);
					return {
						payload: o,
						byteLength: o.byteLength,
						done: this.executeArchive((e) => e.document_chunk_done()),
						transfer: [o]
					};
				},
				measureChunk: ({ payload: e }) => e.byteLength,
				acknowledge: (n) => {
					if (n !== t) throw Error("DOCX document acknowledgement sequence mismatch");
					this.executeArchive((n) => n.acknowledge_document_chunk(t, e.operationId, e.generation)), t += 1;
				},
				cancel: () => this.executeArchive((e) => e.cancel_document_cursor()),
				close: () => this.executeArchive((e) => e.close_document_session()),
				resourceUsage: () => l(this.executeArchive)
			}
		});
	}
	dispatch(e, t) {
		return !this.host || !this.identity ? (t({
			protocol: s,
			kind: "error",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			error: n(/* @__PURE__ */ Error("DOCX document pull session is not open"))
		}), Promise.resolve()) : this.host.dispatch(e, t);
	}
	async reset() {
		if (this.host) try {
			this.archive() && this.executeArchive((e) => e.close_document_session());
		} finally {
			this.host = null, this.identity = null, this.coordinator = new o();
		}
	}
	requireArchive() {
		let e = this.archive();
		if (!e) throw Error("No docx loaded");
		return e;
	}
};
//#endregion
export { l as n, d as t };
