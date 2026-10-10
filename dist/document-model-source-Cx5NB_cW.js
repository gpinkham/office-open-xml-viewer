import { i as e, r as t } from "./preload-Dufqb9J3.js";
import { o as n } from "./progressive-layout-observers-D4O7o5cV.js";
import { n as r, r as i } from "./office-fallback-CTP2kjRH.js";
import { E as a, O as o, a as s, d as c, h as l, l as u, m as d, o as f, p, s as m, u as h } from "./document-pull-client-B-aENbZ1.js";
import { l as g, p as _, s as v, t as y } from "./document-2bTuufYF.js";
import { n as b } from "./cjk-fallback-CtkvGQ-i.js";
import { n as x } from "./renderer-module-contract-CNi9alZl.js";
import { i as S, n as C } from "./resource-debug-Bp6LglgZ.js";
import { t as w } from "./rejected-load-CIPydT8y.js";
import { a as T, n as E } from "./model-source-BsxsLLHq.js";
//#region packages/docx/src/internal/document-model-source.ts
function D(e) {
	let t = new URL("./docx-source-worker.mjs", import.meta.url).href;
	return e.transfer.length > 0 ? {
		source: e.module,
		sourceTransfer: e.transfer,
		sourceOwnerUrl: t
	} : {
		source: e.module,
		sourceOwnerUrl: t
	};
}
function O() {
	let e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function k(e, t) {
	if (t === void 0) return;
	let n = o(e), r = n.activeLayoutOptions;
	if (!r || r.showTrackedChanges === !0 === t) return;
	let i = a(r.currentDateMs, n.defaultCurrentDateMs, t);
	n.activeLayoutOptions = i, e._progressive && (e._progressive.layoutOptions = i);
}
async function A(D, A = {}, M) {
	let N = M?.signal, P = () => {
		if (N?.aborted) throw new l();
	};
	P();
	let F = b(A.cjkFallback), I = S(A), L = Date.now(), R = A.mode ?? "main", z = new C({
		enabled: !0,
		format: "docx",
		mode: R,
		policy: I.policy,
		onMetrics: I.onResourceMetrics,
		emitToConsole: I.debug
	});
	try {
		if (R === "worker" && (typeof Worker > "u" || typeof OffscreenCanvas > "u")) throw Error("mode: 'worker' requires Worker and OffscreenCanvas support");
		let b;
		if (typeof D == "string") {
			let e = await fetch(D, { signal: N });
			if (!e.ok) throw Error(`Failed to fetch: ${e.status} ${e.statusText}`);
			b = await e.arrayBuffer();
		} else b = D;
		P();
		let S = T(A.modelSources, "docx", new Uint8Array(b));
		if (!S) return y.load(b, {
			...A,
			modelSources: void 0
		});
		let C = E(S, "docx");
		try {
			z.setSourceBytes(b.byteLength), z.checkpoint("container ready");
			let S = R === "worker" ? (await import("./render-worker-source-host-Y-qq2fdX.js")).createRenderWorker() : new (await (import("./worker-source-DScSHc7h.js"))).default(), T, E, D = !1, B = () => {
				D || !T || (D = !0, T.destroy());
			}, V = j(S, C, A, (e) => {
				T && k(T, e);
			}), H = R === "worker" ? x(A) : void 0, U = R === "worker" && !!A.progressiveLayout;
			try {
				E = Reflect.construct(y, [
					V,
					R,
					L,
					A.wasmUrl
				]), T = E, N?.addEventListener("abort", B, { once: !0 }), P(), T._metrics = z, T._cjkFallback = F, T._allowFootnoteContinuation = A.allowFootnoteContinuation !== !1;
				let x = o(T), S = a(A.currentDate, x.defaultCurrentDateMs, A.showTrackedChanges === !0);
				x.activeLayoutOptions = S, await T._parse(b, I.policy, R === "worker" ? !!A.useGoogleFonts : !1, A.workerTimeoutMs, (e) => z.observeUsage(e), H, U ? {
					onPartial: A.onLayoutPartial,
					onComplete: A.onLayoutComplete,
					onProgress: A.onLayoutProgress,
					layoutOptions: S,
					abort: new AbortController(),
					firstPublication: O(),
					published: !1,
					settled: !1
				} : void 0), R === "worker" && T._mode === "main" && (z.setMode("main"), console.warn("[ooxml] mode: 'worker' fell back to main-thread rendering because this document requires DOM OpenType vertical glyph selection.")), A.math && T._mode === "worker" && !H?.math && console.warn("[ooxml] a custom math renderer cannot cross the worker boundary; equations will be skipped in mode: 'worker'. Use the math renderer from @silurus/ooxml/math."), A.threeD && T._mode === "worker" && !H?.threeD && console.warn("[ooxml] a custom 3-D chart renderer cannot cross the worker boundary; charts use their 2-D family fallback in mode: 'worker'. Use the renderer from @silurus/ooxml/three-d."), T._threeD = T._mode === "worker" ? void 0 : A.threeD, A.regionMap && T._mode === "worker" && !H?.regionMap && console.warn("[ooxml] a custom Region Map renderer cannot cross the worker boundary; geospatial charts use the unsupported-chart placeholder in mode: 'worker'. Use the renderer from @silurus/ooxml/region-map."), T._regionMap = T._mode === "worker" ? void 0 : A.regionMap, A.chartEx && T._mode === "worker" && !H?.chartEx && console.warn("[ooxml] a custom ChartEx renderer cannot cross the worker boundary; ChartEx charts use the unsupported-chart placeholder in mode: 'worker'. Use the renderer from @silurus/ooxml/chart-ex."), T._chartEx = T._mode === "worker" ? void 0 : A.chartEx, A.tiff && T._mode === "worker" && !H?.tiff && console.warn("[ooxml] a custom TIFF codec cannot cross the worker boundary; recognized TIFF images will use an unavailable-image placeholder in mode: 'worker'. Use the codec from @silurus/ooxml/tiff to display them."), T._tiff = T._mode === "worker" ? void 0 : A.tiff;
				let w, D;
				if (T._mode === "main" && T._document?.embeddedFonts?.length) {
					let e = T, t = await _(T._document, (t) => e.getFontBytes(t));
					if (N?.aborted) throw n(t.faces), new l();
					T._embeddedFontFaces = t.faces, w = t.metrics, D = t.routes;
				}
				let k = T._mode === "main" && T._document ? await r(c(T._document, {
					useGoogleFonts: A.useGoogleFonts,
					cjkFallback: F
				}).filter((e) => !D?.some((t) => t.requestedFamily.toLowerCase() === e.family.toLowerCase() && t.weight === (e.weight ?? 400) && t.style === (e.style ?? "normal")))) : {
					faces: [],
					routes: {}
				};
				if (N?.aborted) throw i(k.faces), new l();
				T._officeFontFaces = k.faces;
				let j = [];
				if (T._mode === "main" && A.useGoogleFonts && T._document) {
					let n = h(T._document, F, k);
					j = n.installedSubstituteFamilies;
					let r = await t(n.names, p);
					if (N?.aborted) throw e(r), new l();
					T._googleFontFaces = r;
				}
				let W;
				if (T._mode === "main" && A.math && T._document && f(T._document) && (W = await m(T._document, A.math)), P(), T._mode === "main" && T._document && T._source) {
					let e = T, t = o(T);
					t.services = u(T._source, {
						allowFootnoteContinuation: T._allowFootnoteContinuation,
						fontMetrics: w,
						useGoogleFonts: !!A.useGoogleFonts,
						cjkFallback: F,
						embeddedRoutes: D,
						officeRoutes: Object.values(k.routes),
						googleFaces: T._googleFontFaces,
						installedSubstituteFamilies: j,
						mathResources: W?.records,
						mathDrawables: W?.drawables
					});
					let n = t.services, r = s(T._source, n, t.defaultCurrentDateMs), i = T._source.fatalParse === null, c = t.activeLayoutOptions;
					if (!c) throw Error("Active layout view was not recorded at load");
					let f = { onProgress: A.onLayoutProgress ? (t) => e._layoutObservers.notify("onLayoutProgress", A.onLayoutProgress, { committedUnits: t }) : void 0 };
					if (i && A.progressiveLayout) {
						let e = r.layoutVariants, t = T, i = new AbortController();
						t._layoutAbort = i;
						let a = O(), o = null, s = !0;
						t._layoutCompletion = g(T._source.bodyLayoutInput, n, c, {
							scheduler: {
								...f,
								signal: i.signal
							},
							onPreview: (n) => {
								if (!s) return;
								let r = o === null, i = t._replaceMainLayoutPublication(e, c, o, n.layout);
								if (i === null) {
									s = !1;
									return;
								}
								if (o = i, r) t._layoutLifecycle.begin(), v(t, {
									pageCount: n.layout.pages.length,
									exact: n.exact,
									complete: !1
								}), a.resolve();
								else {
									if (!t._isLayoutViewActive(c)) return;
									v(t, {
										pageCount: n.layout.pages.length,
										exact: n.exact,
										complete: !1
									}), t._layoutObservers.notify("onLayoutPartial", A.onLayoutPartial, {
										availableUnits: n.layout.pages.length,
										exact: n.exact
									});
								}
							}
						}).then((n) => {
							s && t._replaceMainLayoutPublication(e, c, o, n) === null && (s = !1), t._layoutLifecycle.succeed(), v(t, {
								pageCount: t.pageCount,
								exact: !0,
								complete: !0
							}), t._layoutObservers.notify("onLayoutComplete", A.onLayoutComplete), a.resolve();
						}).catch((e) => {
							if (o === null) {
								a.reject(e);
								return;
							}
							if (e instanceof l) {
								t._layoutLifecycle.succeed();
								return;
							}
							let n = t._layoutLifecycle.fail(e);
							v(t, {
								pageCount: t.pageCount,
								exact: !1,
								complete: !1,
								error: n
							}), t._layoutObservers.notify("onLayoutComplete", A.onLayoutComplete, n);
						}), await a.promise;
					} else if (i && (A.sliceLayout !== !1 || A.onLayoutProgress)) for (;;) {
						P();
						let e = M?.requestedView(), i = e === void 0 ? c : a(A.currentDate, t.defaultCurrentDateMs, e);
						t.activeLayoutOptions = i;
						let o = new AbortController(), s = !1, u = M?.subscribeViewChange(() => {
							let e = M.requestedView();
							s || e === void 0 || e === !0 == (i.showTrackedChanges === !0) || (s = !0, o.abort());
						});
						T._layoutAbort = o;
						try {
							let e = await d(T._source.bodyLayoutInput, n, i, {
								...f,
								signal: o.signal
							});
							if (P(), s) continue;
							r.layoutVariants.prime(i, e);
							break;
						} catch (e) {
							if (e instanceof l && s && !N?.aborted) continue;
							throw e;
						} finally {
							u?.(), T._layoutAbort = null;
						}
					}
					else r.layoutVariants.layoutFor(c);
				}
				return P(), await T._resourceUsage(A.workerTimeoutMs ?? 1e3).then((e) => z.observeUsage(e), () => void 0), z.checkpoint("model and layout ready"), P(), z.succeed({ pages: T.pageCount }), C.release(), E;
			} catch (e) {
				throw w(S, T ? B : void 0), e;
			} finally {
				N?.removeEventListener("abort", B);
			}
		} finally {
			C.release();
		}
	} catch (e) {
		throw z.fail(e), e;
	}
}
function j(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	return new Proxy(e, { get(e, a) {
		if (a === "postMessage") return (r, i) => {
			if (typeof r == "object" && r) {
				let a = r;
				if (a.type === "init") return;
				if (a.type === "parse") {
					e.postMessage({
						...a,
						...D(t),
						...n.showTrackedChanges === void 0 ? {} : { showTrackedChanges: n.showTrackedChanges }
					}, [...i ?? [], ...t.transfer]);
					return;
				}
			}
			e.postMessage(r, i ?? []);
		};
		if (a === "addEventListener") return (t, a, o) => {
			if (t !== "message") return e.addEventListener(t, a, o);
			let s = (e) => {
				let t = e.data;
				n.showTrackedChanges === void 0 && (t.type === "documentSessionOpened" || t.type === "mainThreadVerticalFallback") && r(t.viewDefaults?.showTrackedChanges), (t.type === "parsedMeta" || t.type === "layoutPartial") && r(t.showTrackedChanges), typeof a == "function" ? a(e) : a.handleEvent(e);
			};
			i.set(a, s), e.addEventListener("message", s, o);
		};
		if (a === "removeEventListener") return (t, n, r) => e.removeEventListener(t, t === "message" ? i.get(n) ?? n : n, r);
		let o = Reflect.get(e, a, e);
		return typeof o == "function" ? o.bind(e) : o;
	} });
}
//#endregion
export { A as loadDocxModelSource };
