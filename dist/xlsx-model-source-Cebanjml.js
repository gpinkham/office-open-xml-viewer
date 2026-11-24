import { n as e } from "./ooxml-error-DbICW35n.js";
import { o as t, t as n } from "./error-wire-DcmmIbXu.js";
import { t as r } from "./transfer-D3T5fQj4.js";
import { i, n as a, r as o } from "./pull-session-Dgx2Lp1_.js";
import { n as s, t as c } from "./worksheet-policy-G1KBtmuQ.js";
import { t as l } from "./worksheet-policy-context-CntId_kd.js";
import { t as u } from "./grid-geometry-yvWZvfnR.js";
import { c as d, d as f, f as p, i as m, p as h, u as g } from "./worksheet-pull-client-DazoAB6G.js";
import { o as _, t as v } from "./xlsx-BpOY1G33.js";
import { t as y } from "./model-source-BG04h_7Q.js";
var b = 64 * 1024 * 1024, x = class {
	archive;
	acceptWorksheet;
	executeArchive;
	prepareRows;
	provisional;
	worksheetPolicy;
	coordinator = new i();
	sessions = /* @__PURE__ */ new Map();
	operationTail = Promise.resolve();
	pendingOpens = /* @__PURE__ */ new Map();
	resourceFailure;
	constructor(e, t, n = (e) => e(this.requireArchive()), r, i, a = () => c) {
		this.archive = e, this.acceptWorksheet = t, this.executeArchive = n, this.prepareRows = r, this.provisional = i, this.worksheetPolicy = a;
	}
	reserveOpen(e) {
		this.pendingOpens.set(e.sessionId, {
			identity: e,
			canceled: !1
		});
	}
	abandonOpen(e) {
		this.pendingOpens.delete(e);
	}
	get pendingOpenCount() {
		return this.pendingOpens.size;
	}
	runDuringPull(t) {
		return this.sessions.size === 0 ? this.run(t) : this.coordinator.enqueue(async () => {
			if (this.resourceFailure) throw this.resourceFailure;
			try {
				return t();
			} catch (t) {
				throw t instanceof e && (this.resourceFailure ??= t), t;
			}
		});
	}
	async open(t, n, i) {
		if (this.resourceFailure) throw this.resourceFailure;
		let a = this.pendingOpens.get(i.sessionId);
		if (!a || a.identity.operationId !== i.operationId || a.identity.generation !== i.generation) throw Error("worksheet pull session open reservation is stale or missing");
		let s = this.worksheetPolicy(), c, u = new Promise((e) => {
			c = e;
		}), _ = this.operationTail.then(() => this.coordinator.enqueue(async () => {
			if (a.canceled) throw Error("worksheet pull session open was canceled");
			this.executeArchive((e) => e.open_sheet_cursor(t, n));
			let u = [], _ = {
				rows: 0,
				cells: 0,
				ownedUtf8Bytes: 0
			}, v, y = !1, x = new o({
				...i,
				maxByteCredit: b,
				coordinator: this.coordinator,
				driver: {
					pull: () => {
						let n = this.executeArchive((e) => e.pull_sheet_cursor(128)), i = this.executeArchive((e) => e.sheet_cursor_pull_finished());
						if (this.acceptWorksheet) {
							let r = m(n, i, void 0, this.prepareRows);
							try {
								if (r.kind === "preview") r.worksheet && (r.worksheet.rows = u, l(r.worksheet, s), this.provisional?.preview(t, r.worksheet));
								else if (r.kind === "rows") {
									let e = d(_, h(r.rows, s), s);
									f(e, "get-worksheet-worker", void 0, this.readResourceUsage(), s), u.push(...r.rows), _ = e;
								} else r.kind === "finished" && (v = r.worksheet);
							} catch (t) {
								throw t instanceof e && (this.resourceFailure ??= t), t;
							}
						}
						y = i;
						let a = r(n);
						return {
							payload: a,
							byteLength: a.byteLength,
							done: i,
							transfer: [a]
						};
					},
					measureChunk: ({ payload: e }) => e.byteLength,
					acknowledge: () => {
						if (!y) return;
						let n, r;
						try {
							if (this.acceptWorksheet) {
								if (!v) throw Error("worksheet terminal payload is missing");
								v.rows = v.parseError ? [] : u;
								let e = v.parseError ? {
									rows: 0,
									cells: 0,
									ownedUtf8Bytes: 0
								} : _, i = p(v, e, s), a = this.readResourceUsage();
								f(i, "get-worksheet-worker", void 0, a, s), g(i.jsonBytes, "get-worksheet-worker", void 0, a, s), l(v, s);
								let o = this.acceptWorksheet(t, v, i, a);
								typeof o == "function" ? n = o : o && ({rollback: n, commit: r} = o);
							}
							this.executeArchive((e) => e.acknowledge_sheet_cursor_terminal()), r?.();
						} catch (t) {
							throw n?.(), t instanceof e && (this.resourceFailure ??= t), t;
						}
						y = !1, this.sessions.delete(i.sessionId), this.provisional?.stop(t), c();
					},
					cancel: () => {
						try {
							this.archive() && this.executeArchive((e) => e.cancel_sheet_cursor());
						} finally {
							this.sessions.delete(i.sessionId), this.provisional?.stop(t), c();
						}
					},
					close: () => {
						try {
							this.archive() && this.executeArchive((e) => e.close_sheet_cursor());
						} finally {
							this.sessions.delete(i.sessionId), this.provisional?.stop(t), c();
						}
					},
					resourceUsage: () => this.readResourceUsage()
				}
			});
			this.sessions.set(i.sessionId, {
				host: x,
				identity: i
			}), this.pendingOpens.delete(i.sessionId);
		}));
		this.operationTail = _.then(() => u, () => void 0);
		try {
			await _;
		} catch (e) {
			throw this.pendingOpens.delete(i.sessionId), c(), e;
		}
	}
	async postOpenedSafely(e, t, n) {
		try {
			t();
		} catch (t) {
			await this.closeIdentity(e);
			try {
				n(t);
			} catch {}
		}
	}
	dispatch(e, n) {
		let r = this.sessions.get(e.sessionId);
		if (r) return r.host.dispatch(e, n);
		let i = this.pendingOpens.get(e.sessionId);
		if (i && (e.kind === "cancel" || e.kind === "close")) {
			let t = i.identity.operationId === e.operationId && i.identity.generation === e.generation;
			return t && (i.canceled = !0), n(t ? {
				protocol: a,
				kind: "accepted",
				sessionId: e.sessionId,
				operationId: e.operationId,
				generation: e.generation,
				requestId: e.requestId,
				command: e.kind
			} : {
				protocol: a,
				kind: "error",
				sessionId: e.sessionId,
				operationId: e.operationId,
				generation: e.generation,
				requestId: e.requestId,
				error: {
					message: "stale lifecycle targets another pending worksheet operation",
					errorName: "PullSessionProtocolError",
					code: "ooxml-stale-lifecycle"
				}
			}), Promise.resolve();
		}
		return e.kind === "cancel" || e.kind === "close" ? (n({
			protocol: a,
			kind: "accepted",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			command: e.kind
		}), Promise.resolve()) : (n({
			protocol: a,
			kind: "error",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			error: t(/* @__PURE__ */ Error("worksheet pull session is not open"))
		}), Promise.resolve());
	}
	async dispatchSafely(e, n) {
		try {
			await this.dispatch(e, n);
		} catch (r) {
			try {
				n({
					protocol: a,
					kind: "error",
					sessionId: e.sessionId,
					operationId: e.operationId,
					generation: e.generation,
					requestId: e.requestId,
					error: t(r)
				});
			} catch {}
		}
	}
	run(t) {
		let n = this.operationTail.then(() => this.coordinator.enqueue(async () => {
			if (this.resourceFailure) throw this.resourceFailure;
			return t();
		})).catch((t) => {
			throw t instanceof e && (this.resourceFailure ??= t), t;
		});
		return this.operationTail = n.then(() => void 0, () => void 0), n;
	}
	async reset() {
		for (let e of this.pendingOpens.values()) e.canceled = !0;
		let e = 1;
		for (let { host: t, identity: n } of [...this.sessions.values()]) await t.dispatch({
			protocol: a,
			kind: "close",
			...n,
			requestId: e++
		}, () => void 0);
		this.sessions.clear(), await this.operationTail, this.pendingOpens.clear(), this.resourceFailure = void 0;
	}
	requireArchive() {
		let e = this.archive();
		if (!e) throw Error("Workbook not loaded");
		return e;
	}
	async closeIdentity(e) {
		let t = this.sessions.get(e.sessionId);
		if (t) {
			await t.host.dispatch({
				protocol: a,
				kind: "close",
				...e,
				requestId: 1
			}, () => void 0);
			return;
		}
		let n = this.pendingOpens.get(e.sessionId);
		n && n.identity.operationId === e.operationId && n.identity.generation === e.generation && (n.canceled = !0);
	}
	readResourceUsage() {
		let e = this.executeArchive((e) => e.sheet_cursor_resource_usage?.());
		return e === void 0 ? void 0 : n(e);
	}
};
async function S(e, t, n) {
	return new C(await w(e, t, n), t.signal);
}
var C = class extends v {
	constructor(e, t) {
		super(e.closeArchive, e.archive, e.workbookIndex, e.metrics, e.usage, t, e.worksheetPolicy);
		let n = e.worksheetPolicy;
		this.pull = new x(() => e.archive, void 0, void 0, void 0, void 0, () => n);
	}
	async *worksheetRows(e) {
		for await (let t of super.worksheetRows(e)) {
			if (t.kind === "finished") {
				let e = this.workbookIndex.layoutMetrics?.maximumDigitWidth;
				e !== void 0 && u.forWorksheet(t.worksheet, e);
			}
			yield t;
		}
	}
};
async function w(e, t, n) {
	let r = s(t), i = {
		...t,
		xlsxWorksheetLimits: r.worksheet
	}, { acquireXlsxSessionFromArchive: a, configureHostLayout: o, validateXlsxModelSourceArchive: c, validateXlsxModelSourceViewDefaults: l } = await import("./model-source-session-edw0oV6h.js"), u = await y(e, "xlsx", {
		...i,
		sources: [i.legacyXls, i.ods],
		worksheetPolicy: r
	}, c);
	if (u.kind === "ooxml") return _(u.bytes, n(), i);
	let { opened: d } = u, f;
	try {
		if (l(d.viewDefaults), f = await o(d.archive, async (e) => {
			if (!t.factory) return;
			let { measureHostLayoutFont: n } = await import("./host-layout-measure-Drz0NYRQ.js"), r = t.factory.createCanvas(1, 1).getContext("2d");
			return r ? n(e, r) : void 0;
		}), t.signal?.aborted) {
			let e = /* @__PURE__ */ Error("XLSX workbook session was aborted");
			throw e.name = "AbortError", e;
		}
	} catch (e) {
		try {
			d.close();
		} catch {}
		throw e;
	}
	return a({
		archive: d.archive,
		sourceByteLength: u.sourceByteLength,
		...f === void 0 ? {} : { layoutMetrics: { maximumDigitWidth: f } },
		closeArchive: d.close
	}, i);
}
export { S as openXlsxSource };
