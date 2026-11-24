import { i as e } from "./embedded-B4q5SDVm.js";
import { i as t } from "./office-fallback-O-L6rrDh.js";
import { Si as n, mt as r } from "./document-content-BYFtqT7U.js";
import { C as i, T as a, a as o, d as s, f as c, g as l, h as u, l as d, o as f, s as p } from "./document-pull-client-DIeWNcQH.js";
import { n as m } from "./cjk-fallback-CxqXJu32.js";
import { n as h } from "./renderer-module-contract-BuTx2FWJ.js";
import { i as g, n as _ } from "./resource-debug-BMgDiKq1.js";
import { t as v } from "./rejected-load-CS5sDp04.js";
import { n as y } from "./bundled-asset-url-Cv8ajMAZ.js";
import { u as b } from "./source-GXgH3t1X.js";
import { t as x } from "./deferred-D2gd0MY2.js";
import { _ as S, d as C, g as w, h as T, l as E, t as D, v as O } from "./document-Bb2PIl7f.js";
import { i as k, n as A, r as j, s as M } from "./model-source-BwpDCGYU.js";
function N(e) {
	let t = y(new URL("./docx-source-worker.mjs", import.meta.url).href, import.meta.url);
	return e.transfer.length > 0 ? {
		source: e.module,
		sourceTransfer: e.transfer,
		sourceOwnerUrl: t
	} : {
		source: e.module,
		sourceOwnerUrl: t
	};
}
function P(e, t) {
	if (t === void 0) return;
	let n = r(e), i = n.activeLayoutOptions;
	if (!i || i.showTrackedChanges === !0 === t) return;
	let o = a(i.currentDateMs, n.defaultCurrentDateMs, t);
	n.activeLayoutOptions = o, e._progressive && (e._progressive.layoutOptions = o);
}
async function F(y, k = {}, N) {
	let F = N?.signal, L = () => {
		if (F?.aborted) throw new l();
	};
	L();
	let R = m(k.cjkFallback), z = g(k), B = Date.now(), V = k.mode ?? "main";
	V === "main" && k.fonts && import("./font-source-load-NwNtcDmq.js").catch(() => void 0);
	let H = new _({
		enabled: !0,
		format: "docx",
		mode: V,
		policy: z.policy,
		onMetrics: z.onResourceMetrics,
		emitToConsole: z.debug
	});
	try {
		if (V === "worker" && (typeof Worker > "u" || typeof OffscreenCanvas > "u")) throw Error("mode: 'worker' requires Worker and OffscreenCanvas support");
		let m;
		if (typeof y == "string") {
			let e = await fetch(y, { signal: F });
			if (!e.ok) throw Error(`Failed to fetch: ${e.status} ${e.statusText}`);
			m = await e.arrayBuffer();
		} else m = y;
		L();
		let g = M(j(k.legacyDoc, k.odt), "docx", new Uint8Array(m));
		if (!g) return D.load(m, {
			...k,
			legacyDoc: void 0,
			odt: void 0
		});
		let _ = A(g, "docx");
		try {
			H.setSourceBytes(m.byteLength), H.checkpoint("container ready");
			let g = V === "worker" ? (await import("./render-worker-host-EYO2QR5R.js")).createRenderWorker() : new (await (import("./worker-source-MOF5MsZF.js"))).default(), y, A, j = !1, M = () => {
				j || !y || (j = !0, y.destroy());
			}, U = I(g, _, k, (e) => {
				y && P(y, e);
			}), W = V === "worker" ? h(k) : void 0, G = V === "worker" && !!k.progressiveLayout;
			try {
				A = Reflect.construct(D, [
					U,
					V,
					B,
					k.wasmUrl
				]), y = A, F?.addEventListener("abort", M, { once: !0 }), L(), y._metrics = H, y._cjkFallback = R, y._allowFootnoteContinuation = k.allowFootnoteContinuation !== !1;
				let h = r(y), g = a(k.currentDate, h.defaultCurrentDateMs, k.showTrackedChanges === !0);
				h.activeLayoutOptions = g, await y._parse(m, z.policy, V === "worker" ? k.fonts : void 0, k.workerTimeoutMs, (e) => H.observeUsage(e), W, G ? {
					onPartial: k.onLayoutPartial,
					onComplete: k.onLayoutComplete,
					onProgress: k.onLayoutProgress,
					layoutOptions: g,
					abort: new AbortController(),
					firstPublication: x(),
					published: !1,
					settled: !1
				} : void 0), V === "worker" && y._mode === "main" && (H.setMode("main"), console.warn(w(y._mainThreadFallbackReason))), k.math && y._mode === "worker" && !W?.math && console.warn("[ooxml] a custom math renderer cannot cross the worker boundary; equations will be skipped in mode: 'worker'. Use the math renderer from @silurus/ooxml/math."), k.threeD && y._mode === "worker" && !W?.threeD && console.warn("[ooxml] a custom 3-D chart renderer cannot cross the worker boundary; charts use their 2-D family fallback in mode: 'worker'. Use the renderer from @silurus/ooxml/three-d."), y._threeD = y._mode === "worker" ? void 0 : k.threeD, k.regionMap && y._mode === "worker" && !W?.regionMap && console.warn("[ooxml] a custom Region Map renderer cannot cross the worker boundary; geospatial charts use the unsupported-chart placeholder in mode: 'worker'. Use the renderer from @silurus/ooxml/region-map."), y._regionMap = y._mode === "worker" ? void 0 : k.regionMap, k.chartEx && y._mode === "worker" && !W?.chartEx && console.warn("[ooxml] a custom ChartEx renderer cannot cross the worker boundary; ChartEx charts use the unsupported-chart placeholder in mode: 'worker'. Use the renderer from @silurus/ooxml/chart-ex."), y._chartEx = y._mode === "worker" ? void 0 : k.chartEx, k.tiff && y._mode === "worker" && !W?.tiff && console.warn("[ooxml] a custom TIFF codec cannot cross the worker boundary; recognized TIFF images will use an unavailable-image placeholder in mode: 'worker'. Use the codec from @silurus/ooxml/tiff to display them."), y._tiff = y._mode === "worker" ? void 0 : k.tiff;
				let v, j;
				if (y._mode === "main" && y._document?.embeddedFonts?.length) {
					let t = y, n = await T(y._document, (e) => t.getFontBytes(e));
					if (F?.aborted) throw e(n.faces), new l();
					S(y, n.diagnostics), y._embeddedFontFaces = n.faces, v = n.metrics, j = n.routes;
				}
				let P = y._mode === "main" && y._document ? await O(c(y._document, {
					fontDemand: !!k.fonts,
					cjkFallback: R
				}).filter((e) => e.presenceOnly || !j?.some((t) => t.requestedFamily.toLowerCase() === e.family.toLowerCase() && t.weight === (e.weight ?? 400) && t.style === (e.style ?? "normal")))) : {
					faces: [],
					routes: {}
				};
				if (F?.aborted) throw t(P.faces), new l();
				y._officeFontFaces = P.faces;
				let { installedSubstituteFamilies: I, sourceFonts: K } = await y._loadFontSources(k.fonts, R, P, F), q;
				if (y._mode === "main" && k.math && y._document && f(y._document) && (q = await p(y._document, k.math)), L(), y._mode === "main" && y._document && y._source) {
					let e = y, c = r(y), f = {
						allowFootnoteContinuation: y._allowFootnoteContinuation,
						fontMetrics: v,
						fontSubstitutes: n(b(k.fonts)),
						cjkFallback: R,
						embeddedRoutes: j,
						officeRoutes: Object.values(P.routes),
						sourceFonts: K,
						installedSubstituteFamilies: I,
						installedFamilies: "installed" in P ? P.installed : void 0,
						mathResources: q?.records,
						mathDrawables: q?.drawables
					}, p = await s(y._source, y._document, {
						fontSubstitutes: n(b(k.fonts)),
						cjkFallback: R
					});
					if (F?.aborted) throw t(p.faces), new l();
					y._officeFontFaces = [...y._officeFontFaces, ...p.faces], c.services = d(y._source, {
						...f,
						nativeRouteMetrics: p.nativeRouteMetrics
					});
					let m = c.services, h = i(y._source, F);
					h && await h;
					let g = o(y._source, m, c.defaultCurrentDateMs), _ = y._source.fatalParse === null, S = c.activeLayoutOptions;
					if (!S) throw Error("Active layout view was not recorded at load");
					let w = { onProgress: k.onLayoutProgress ? (t) => e._layoutObservers.notify("onLayoutProgress", k.onLayoutProgress, { committedUnits: t }) : void 0 };
					if (_ && k.progressiveLayout) {
						let e = g.layoutVariants, t = y, n = new AbortController();
						t._layoutAbort = n;
						let r = x(), i = null, a = !0;
						t._layoutCompletion = C(y._source.bodyLayoutInput, m, S, {
							scheduler: {
								...w,
								signal: n.signal
							},
							onPreview: (n) => {
								if (!a) return;
								let o = i === null, s = t._replaceMainLayoutPublication(e, S, i, n.layout);
								if (s === null) {
									a = !1;
									return;
								}
								if (i = s, o) t._layoutLifecycle.begin(), E(t, {
									pageCount: n.layout.pages.length,
									exact: n.exact,
									complete: !1
								}), r.resolve();
								else {
									if (!t._isLayoutViewActive(S)) return;
									E(t, {
										pageCount: n.layout.pages.length,
										exact: n.exact,
										complete: !1
									}), t._layoutObservers.notify("onLayoutPartial", k.onLayoutPartial, {
										availableUnits: n.layout.pages.length,
										exact: n.exact
									});
								}
							}
						}).then((n) => {
							a && t._replaceMainLayoutPublication(e, S, i, n) === null && (a = !1), t._layoutLifecycle.succeed(), E(t, {
								pageCount: t.pageCount,
								exact: !0,
								complete: !0
							}), t._layoutObservers.notify("onLayoutComplete", k.onLayoutComplete), r.resolve();
						}).catch((e) => {
							if (i === null) {
								r.reject(e);
								return;
							}
							if (e instanceof l) {
								t._layoutLifecycle.succeed();
								return;
							}
							let n = t._layoutLifecycle.fail(e);
							E(t, {
								pageCount: t.pageCount,
								exact: !1,
								complete: !1,
								error: n
							}), t._layoutObservers.notify("onLayoutComplete", k.onLayoutComplete, n);
						}), await r.promise;
					} else if (_ && (k.sliceLayout !== !1 || k.onLayoutProgress)) for (;;) {
						L();
						let e = N?.requestedView(), t = e === void 0 ? S : a(k.currentDate, c.defaultCurrentDateMs, e);
						c.activeLayoutOptions = t;
						let n = new AbortController(), r = !1, i = N?.subscribeViewChange(() => {
							let e = N.requestedView();
							r || e === void 0 || e === !0 == (t.showTrackedChanges === !0) || (r = !0, n.abort());
						});
						y._layoutAbort = n;
						try {
							let e = await u(y._source.bodyLayoutInput, m, t, {
								...w,
								signal: n.signal
							});
							if (L(), r) continue;
							g.layoutVariants.prime(t, e);
							break;
						} catch (e) {
							if (e instanceof l && r && !F?.aborted) continue;
							throw e;
						} finally {
							i?.(), y._layoutAbort = null;
						}
					}
					else g.layoutVariants.layoutFor(S);
				}
				return L(), await y._resourceUsage(k.workerTimeoutMs ?? 1e3).then((e) => H.observeUsage(e), () => void 0), H.checkpoint("model and layout ready"), L(), H.succeed({ pages: y.pageCount }), _.release(), A;
			} catch (e) {
				throw v(g, y ? M : void 0), e;
			} finally {
				F?.removeEventListener("abort", M);
			}
		} finally {
			_.release();
		}
	} catch (e) {
		throw H.fail(e), e;
	}
}
function I(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	return k(e, {
		discriminator: "type",
		load: t,
		parseMessage: (e) => ({
			...e,
			...N(t),
			...n.showTrackedChanges === void 0 ? {} : { showTrackedChanges: n.showTrackedChanges }
		}),
		member: (e, t) => {
			if (t === "addEventListener") return (t, a, o) => {
				if (t !== "message") return e.addEventListener(t, a, o);
				let s = (e) => {
					let t = e.data;
					n.showTrackedChanges === void 0 && (t.type === "documentSessionOpened" || t.type === "mainThreadVerticalFallback") && r(t.viewDefaults?.showTrackedChanges), (t.type === "parsedMeta" || t.type === "layoutPartial") && r(t.showTrackedChanges), typeof a == "function" ? a(e) : a.handleEvent(e);
				};
				i.set(a, s), e.addEventListener("message", s, o);
			};
			if (t === "removeEventListener") return (t, n, r) => e.removeEventListener(t, t === "message" ? i.get(n) ?? n : n, r);
		}
	});
}
export { F as loadDocxModelSource };
