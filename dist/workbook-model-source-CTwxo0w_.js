import { n as e } from "./cjk-fallback-CtkvGQ-i.js";
import { f as t, i as n } from "./renderer-DbiX_8Dl.js";
import { i as r, n as i } from "./resource-debug-Bp6LglgZ.js";
import { n as a } from "./xlsx-worksheet-policy-7DZYvldr.js";
import { t as o } from "./rejected-load-CIPydT8y.js";
import { n as s, r as c } from "./worker-protocol-InkZGMlq.js";
import { a as l, n as u } from "./model-source-BsxsLLHq.js";
import { n as d } from "./host-layout-CA9alpSL.js";
//#region packages/xlsx/src/internal/workbook-model-source.ts
async function f(n, d, f) {
	let m = a(d);
	d = {
		...d,
		xlsxWorksheetLimits: m.worksheet
	}, d = {
		...d,
		cjkFallback: e(d.cjkFallback)
	};
	let h = r(d), g = d.mode ?? "main", _ = new i({
		enabled: !0,
		format: "xlsx",
		mode: g,
		policy: h.policy,
		xlsxWorksheetPolicy: m,
		onMetrics: h.onResourceMetrics,
		emitToConsole: h.debug
	});
	try {
		if (g === "worker" && (typeof Worker > "u" || typeof OffscreenCanvas > "u")) throw Error("mode: 'worker' requires Worker and OffscreenCanvas support");
		let e;
		if (typeof n == "string") {
			let t = await fetch(n);
			if (!t.ok) throw Error(`Failed to fetch: ${t.status} ${t.statusText}`);
			e = await t.arrayBuffer();
		} else e = n;
		let r = l(d.modelSources, "xlsx", new Uint8Array(e));
		if (!r) return f.load(e, {
			...d,
			modelSources: void 0
		});
		let i = f;
		class a extends i {
			sourceMdw;
			async getWorksheet(e) {
				let n = await super.getWorksheet(e);
				return this.sourceMdw !== void 0 && t(n, this.sourceMdw), n;
			}
			async renderViewport(e, t, n, r = {}) {
				let i = this.sourceMdw !== void 0 && !s(r).layoutMetrics ? c(r, this.sourceMdw) : r;
				return super.renderViewport(e, t, n, i);
			}
		}
		let m = u(r, "xlsx");
		try {
			_.setSourceBytes(e.byteLength), _.checkpoint("container ready");
			let t = g === "worker" ? (await import("./render-worker-source-host-d5S1R4J3.js")).createRenderWorker() : new (await (import("./worker-source-LbAPl99l.js"))).default(), n, r = p(t, m, d, (e) => {
				n && (n.sourceMdw = e);
			});
			try {
				n = new a(r, g, d.wasmUrl);
				let t = n;
				return t.metrics = _, await t._load(e, d, h.policy, (e) => _.observeUsage(e), !0), n.sourceMdw !== void 0 && t.parsedWorkbook && (t.parsedWorkbook.layoutMetrics = { maximumDigitWidth: n.sourceMdw }), _.checkpoint("workbook index ready"), _.succeed({ sheets: n.sheetCount }), m.release(), n;
			} catch (e) {
				let r = n;
				throw o(t, r ? () => r.destroy() : void 0), e;
			}
		} finally {
			m.release();
		}
	} catch (e) {
		throw _.fail(e), e;
	}
}
function p(e, t, r, i) {
	let a = new URL("./xlsx-source-worker.mjs", import.meta.url).href;
	return new Proxy(e, { get(e, o) {
		if (o === "postMessage") return (n, r) => {
			if (typeof n == "object" && n) {
				let i = n;
				if (i.type === "init") return;
				if (i.type === "parse") {
					e.postMessage({
						...i,
						source: t.module,
						sourceOwnerUrl: a,
						...t.transfer.length ? { sourceTransfer: t.transfer } : {}
					}, [...r ?? [], ...t.transfer]);
					return;
				}
			}
			e.postMessage(n, r ?? []);
		};
		if (o === "addEventListener") return (t, a) => t === "message" ? e.addEventListener("message", ((o) => {
			let s = o.data;
			s.type === "parsed" && s.layoutMetrics && i(s.layoutMetrics.maximumDigitWidth), t === "message" && d((t) => e.postMessage(t), o.data, (e) => n(e.family, e.sizePt, void 0, !!r.useGoogleFonts, e.bold ? 700 : 400, e.italic ? "italic" : "normal")), a(o);
		})) : e.addEventListener(t, a);
		let s = Reflect.get(e, o, e);
		return typeof s == "function" ? s.bind(e) : s;
	} });
}
//#endregion
export { f as loadXlsxModelSource };
