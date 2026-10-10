import { n as e } from "./cjk-fallback-CtkvGQ-i.js";
import { n as t } from "./renderer-module-contract-CNi9alZl.js";
import { i as n, n as r } from "./resource-debug-Bp6LglgZ.js";
import { t as i } from "./rejected-load-CIPydT8y.js";
import { a, t as o } from "./presentation-Ccl6V3_D.js";
import { a as s, n as c } from "./model-source-BsxsLLHq.js";
//#region packages/pptx/src/internal/presentation-model-source.ts
async function l(l, p) {
	let m = p.mode ?? "main", h = n(p), g = new r({
		enabled: !0,
		format: "pptx",
		mode: m,
		policy: h.policy,
		onMetrics: h.onResourceMetrics,
		emitToConsole: h.debug
	});
	try {
		if (m === "worker" && (typeof Worker > "u" || typeof OffscreenCanvas > "u")) throw Error("mode: 'worker' requires Worker and OffscreenCanvas support");
		let n;
		if (typeof l == "string") {
			let e = await fetch(l);
			if (!e.ok) throw Error(`Failed to fetch: ${e.status} ${e.statusText}`);
			n = await e.arrayBuffer();
		} else n = l;
		let r = s(p.modelSources, "pptx", new Uint8Array(n));
		if (!r) return o.load(n, {
			...p,
			modelSources: void 0
		});
		let _ = c(r, "pptx");
		try {
			g.setSourceBytes(n.byteLength), g.checkpoint("container ready");
			let r = m === "worker" ? (await import("./render-worker-source-host-DDhoSRv4.js")).createRenderWorker() : new (await (import("./worker-source-BvJ3Aqjl.js"))).default(), s = u(r, _), c = m === "worker" ? t(p) : void 0, l;
			try {
				l = new o(s, m, p.wasmUrl);
				let t = l;
				t._metrics = g, t._cjkFallback = e(p.cjkFallback), t._math = m === "worker" ? void 0 : p.math, t._threeD = m === "worker" ? void 0 : p.threeD, t._regionMap = m === "worker" ? void 0 : p.regionMap, t._chartEx = m === "worker" ? void 0 : p.chartEx, t._tiff = m === "worker" ? void 0 : p.tiff, t._googleSubstitutes = !!p.useGoogleFonts, f(p, m, c);
				let r = p.progressiveLayout ? {
					onProgress: p.onLayoutProgress,
					onPartial: p.onLayoutPartial,
					onComplete: p.onLayoutComplete,
					firstPublication: d(),
					published: !1,
					deferred: !1,
					settled: !1
				} : void 0;
				return await t._parse(n, h.policy, !!p.useGoogleFonts, p.workerTimeoutMs, (e) => g.observeUsage(e), c, r), g.checkpoint("presentation preflight ready"), m === "main" && p.useGoogleFonts && t._preflight && !r && await t._ensureGoogleFonts(a(t._preflight.fontPreloadNames, t._embeddedFontAliases), t._preflight.fontPreloadDemand), g.succeed({ slides: l.slideCount }), _.release(), l;
			} catch (e) {
				let t = l;
				throw i(r, t ? () => t.destroy() : void 0), e;
			}
		} finally {
			_.release();
		}
	} catch (e) {
		throw g.fail(e), e;
	}
}
function u(e, t) {
	let n = new URL("./pptx-source-worker.mjs", import.meta.url).href;
	return new Proxy(e, { get(e, r) {
		if (r === "postMessage") return (r, i) => {
			if (typeof r == "object" && r) {
				let a = r;
				if (a.kind === "init") return;
				if (a.kind === "parse") {
					e.postMessage({
						...a,
						source: t.module,
						sourceOwnerUrl: n,
						...t.transfer.length ? { sourceTransfer: t.transfer } : {}
					}, [...i ?? [], ...t.transfer]);
					return;
				}
			}
			e.postMessage(r, i ?? []);
		};
		let i = Reflect.get(e, r, e);
		return typeof i == "function" ? i.bind(e) : i;
	} });
}
function d() {
	let e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function f(e, t, n) {
	t === "worker" && (e.math && !n?.math && console.warn("[ooxml] a custom math renderer cannot cross the worker boundary; equations will be skipped in mode: 'worker'. Use the math renderer from @silurus/ooxml/math."), e.threeD && !n?.threeD && console.warn("[ooxml] a custom 3-D chart renderer cannot cross the worker boundary; charts use their 2-D family fallback in mode: 'worker'. Use the renderer from @silurus/ooxml/three-d."), e.regionMap && !n?.regionMap && console.warn("[ooxml] a custom Region Map renderer cannot cross the worker boundary; geospatial charts use the unsupported-chart placeholder in mode: 'worker'. Use the renderer from @silurus/ooxml/region-map."), e.chartEx && !n?.chartEx && console.warn("[ooxml] a custom ChartEx renderer cannot cross the worker boundary; ChartEx charts use the unsupported-chart placeholder in mode: 'worker'. Use the renderer from @silurus/ooxml/chart-ex."), e.tiff && !n?.tiff && console.warn("[ooxml] a custom TIFF codec cannot cross the worker boundary; recognized TIFF images will use an unavailable-image placeholder in mode: 'worker'. Use the codec from @silurus/ooxml/tiff to display them."));
}
//#endregion
export { l as loadPptxModelSource };
