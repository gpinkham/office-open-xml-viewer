import { S as e } from "./resource-policy.generated-BTdyyO9v.js";
import { a as t, t as n } from "./error-wire-rJNDxWbL.js";
import { t as r } from "./transfer-bsZEzkZu.js";
import { n as i, t as a } from "./xlsx-worksheet-policy-7DZYvldr.js";
import { i as o, n as s, r as c } from "./pull-session-BzHuXyzF.js";
import { t as l } from "./worksheet-policy-context-zBNDS5EA.js";
import { t as u } from "./grid-geometry-MHuKakaD.js";
import { c as d, d as f, f as p, i as m, p as h, u as g } from "./worksheet-pull-client-qpRHeMOv.js";
import { o as _, t as v } from "./xlsx-BUmRM6J5.js";
import { t as y } from "./model-source-BVTa8ePn.js";
//#region packages/xlsx/src/worksheet-pull-source-worker.ts
var b = 64 * 1024 * 1024, x = class {
	coordinator = new o();
	sessions = /* @__PURE__ */ new Map();
	operationTail = Promise.resolve();
	pendingOpens = /* @__PURE__ */ new Map();
	resourceFailure;
	constructor(e, t, n = (e) => e(this.requireArchive()), r, i, o = () => a) {
		this.archive = e, this.acceptWorksheet = t, this.executeArchive = n, this.prepareRows = r, this.provisional = i, this.worksheetPolicy = o;
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
		let o = this.worksheetPolicy(), s, u = new Promise((e) => {
			s = e;
		}), _ = this.operationTail.then(() => this.coordinator.enqueue(async () => {
			if (a.canceled) throw Error("worksheet pull session open was canceled");
			this.executeArchive((e) => e.open_sheet_cursor(t, n));
			let u = [], _ = {
				rows: 0,
				cells: 0,
				ownedUtf8Bytes: 0
			}, v, y = !1, x = new c({
				...i,
				maxByteCredit: b,
				coordinator: this.coordinator,
				driver: {
					pull: () => {
						let n = this.executeArchive((e) => e.pull_sheet_cursor(128)), i = this.executeArchive((e) => e.sheet_cursor_pull_finished());
						if (this.acceptWorksheet) {
							let r = m(n, i, void 0, this.prepareRows);
							try {
								if (r.kind === "preview") r.worksheet && (r.worksheet.rows = u, l(r.worksheet, o), this.provisional?.preview(t, r.worksheet));
								else if (r.kind === "rows") {
									let e = d(_, h(r.rows, o), o);
									f(e, "get-worksheet-worker", void 0, this.readResourceUsage(), o), u.push(...r.rows), _ = e;
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
								} : _, i = p(v, e, o), a = this.readResourceUsage();
								f(i, "get-worksheet-worker", void 0, a, o), g(i.jsonBytes, "get-worksheet-worker", void 0, a, o), l(v, o);
								let s = this.acceptWorksheet(t, v, i, a);
								typeof s == "function" ? n = s : s && ({rollback: n, commit: r} = s);
							}
							this.executeArchive((e) => e.acknowledge_sheet_cursor_terminal()), r?.();
						} catch (t) {
							throw n?.(), t instanceof e && (this.resourceFailure ??= t), t;
						}
						y = !1, this.sessions.delete(i.sessionId), this.provisional?.stop(t), s();
					},
					cancel: () => {
						try {
							this.archive() && this.executeArchive((e) => e.cancel_sheet_cursor());
						} finally {
							this.sessions.delete(i.sessionId), this.provisional?.stop(t), s();
						}
					},
					close: () => {
						try {
							this.archive() && this.executeArchive((e) => e.close_sheet_cursor());
						} finally {
							this.sessions.delete(i.sessionId), this.provisional?.stop(t), s();
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
			throw this.pendingOpens.delete(i.sessionId), s(), e;
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
				protocol: s,
				kind: "accepted",
				sessionId: e.sessionId,
				operationId: e.operationId,
				generation: e.generation,
				requestId: e.requestId,
				command: e.kind
			} : {
				protocol: s,
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
			protocol: s,
			kind: "accepted",
			sessionId: e.sessionId,
			operationId: e.operationId,
			generation: e.generation,
			requestId: e.requestId,
			command: e.kind
		}), Promise.resolve()) : (n({
			protocol: s,
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
					protocol: s,
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
			protocol: s,
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
				protocol: s,
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
//#endregion
//#region packages/node/src/xlsx-model-source.ts
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
	let r = i(t), a = {
		...t,
		xlsxWorksheetLimits: r.worksheet
	}, { acquireXlsxSessionFromArchive: o, configureHostLayout: s, validateXlsxModelSourceArchive: c, validateXlsxModelSourceViewDefaults: l } = await import("./model-source-session-BoJPOhhF.js"), u = await y(e, "xlsx", a, c);
	if (u.kind === "ooxml") return _(u.bytes, n(), a);
	let { opened: d } = u, f;
	try {
		if (l(d.viewDefaults), f = await s(d.archive, async (e) => {
			if (!t.factory) return;
			let { measureHostLayoutFont: n } = await import("./host-layout-measure-GVmi8F1u.js"), r = t.factory.createCanvas(1, 1).getContext("2d");
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
	return o({
		archive: d.archive,
		sourceByteLength: u.sourceByteLength,
		...f === void 0 ? {} : { layoutMetrics: { maximumDigitWidth: f } },
		closeArchive: d.close
	}, a);
}
//#endregion
export { S as openXlsxSource };
