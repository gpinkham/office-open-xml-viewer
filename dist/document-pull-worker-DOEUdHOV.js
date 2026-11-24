import { t as e } from "./ooxml-error-DbICW35n.js";
import { n as t, r as n } from "./resource-policy.generated-D_HlV2Rm.js";
import { l as r, o as i, t as a } from "./error-wire-DcmmIbXu.js";
import { t as o } from "./transfer-D3T5fQj4.js";
import { i as s, n as c, r as l } from "./pull-session-Dgx2Lp1_.js";
var u = "OOXML_DOCX_ILVL:";
function d(t) {
	let n = t instanceof Error ? t.message : String(t);
	if (!n.startsWith(u)) return;
	let r = n.slice(16);
	if (r === "repair-required:level-definition") return new e("invalid-numbering", "The DOCX defines a numbering level outside Word’s supported 0–8 range and requires repair.");
	if (r === "cannot-open:whitespace" || r === "cannot-open:non-decimal") return new e("invalid-numbering", `Word cannot open this DOCX numbering level (${r.slice(12)}).`);
}
function f(e) {
	try {
		return d(e) ?? e;
	} catch {
		return e;
	}
}
function p(e) {
	try {
		return e();
	} catch (e) {
		throw f(e);
	}
}
function m(e) {
	let t = e((e) => e.document_cursor_resource_usage?.());
	return t ? a(t) : void 0;
}
var h = Math.max(t, n), g = class {
	archive;
	coordinator = new s();
	host = null;
	identity = null;
	executeArchive;
	constructor(e, t = (e) => e(this.requireArchive())) {
		this.archive = e, this.executeArchive = (e) => p(() => t(e));
	}
	open(e) {
		if (this.host) throw Error("a DOCX document pull session is already active");
		this.executeArchive((t) => {
			t.open_document_cursor(e.operationId, e.generation);
		});
		let t = 0;
		this.identity = e, this.host = new l({
			...e,
			maxByteCredit: h,
			coordinator: this.coordinator,
			driver: {
				pull: (n) => {
					let i;
					try {
						i = this.executeArchive((r) => r.pull_document_chunk(t, e.operationId, e.generation, n));
					} catch (e) {
						throw r(e, n, h) || e;
					}
					let a = o(i);
					return {
						payload: a,
						byteLength: a.byteLength,
						done: this.executeArchive((e) => e.document_chunk_done()),
						transfer: [a]
					};
				},
				measureChunk: ({ payload: e }) => e.byteLength,
				acknowledge: (n) => {
					if (n !== t) throw Error("DOCX document acknowledgement sequence mismatch");
					this.executeArchive((n) => n.acknowledge_document_chunk(t, e.operationId, e.generation)), t += 1;
				},
				cancel: () => this.executeArchive((e) => e.cancel_document_cursor()),
				close: () => this.executeArchive((e) => e.close_document_session()),
				resourceUsage: () => m(this.executeArchive)
			}
		});
	}
	dispatch(e, t) {
		return !this.host || !this.identity ? (t({
			protocol: c,
			kind: "error",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			error: i(/* @__PURE__ */ Error("DOCX document pull session is not open"))
		}), Promise.resolve()) : this.host.dispatch(e, t);
	}
	async reset() {
		if (this.host) try {
			this.archive() && this.executeArchive((e) => e.close_document_session());
		} finally {
			this.host = null, this.identity = null, this.coordinator = new s();
		}
	}
	requireArchive() {
		let e = this.archive();
		if (!e) throw Error("No docx loaded");
		return e;
	}
};
export { m as n, f as r, g as t };
