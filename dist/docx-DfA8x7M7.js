import { t as e } from "./chunk-DmhlhrBa.js";
import { S as t, x as n } from "./resource-policy.generated-BTdyyO9v.js";
import { v as r } from "./document-pull-client-B-aENbZ1.js";
import { a as i, c as a, d as o, f as s, i as c, n as l, o as u, r as d, t as f, u as p } from "./document-2bTuufYF.js";
import { a as m } from "./units-DIk-8W6L.js";
import { f as h, u as g } from "./pixel-budget-QcsXr21f.js";
import { C as _, _ as v, a as y, b, c as x, h as S, i as C, l as w, n as ee, o as T, r as te, s as ne, t as re, u as E, v as ie, y as ae } from "./canvas-viewer-mechanics-Bot9oEVb.js";
import { i as oe, t as se } from "./tiff-contract-BtmLs4Ug.js";
import { C as ce, S as le, _ as ue, a as de, b as fe, c as pe, d as me, f as he, g as ge, h as _e, i as ve, l as D, m as O, n as k, o as A, p as j, r as M, t as N, u as P, v as F, y as ye } from "./comment-overlay-controller-Dt-fhuiq.js";
import { r as I } from "./hyperlink-Q_icYkYZ.js";
import { n as L, t as R } from "./highlight-rect-C0_kwazB.js";
import { n as z, r as be } from "./comments-BvsU_VZt.js";
//#region packages/docx/src/tate-chu-yoko-overlay.ts
function B(e, t) {
	if (!e.eastAsianVert) return 1;
	let n = t(e.text);
	return !(n > 0) || e.w >= n ? 1 : e.w / n;
}
//#endregion
//#region packages/docx/src/text-layer.ts
function V(e, t, n) {
	e.dataset ? n === void 0 ? delete e.dataset[t] : e.dataset[t] = n : n !== void 0 && e.setAttribute?.(`data-${t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`)}`, n);
}
function H(e, t, n, r, i, a, o) {
	e.innerHTML = "", V(e, "ooxmlSelectionSurface", "docx"), V(e, "pageIndex", o === void 0 ? void 0 : String(o));
	let s = e.ownerDocument ?? document;
	for (let [o, c] of t.entries()) {
		let t = s.createElement("span");
		V(t, "ooxmlSelectionRun", "docx"), V(t, "runIndex", String(o)), c.paragraphId !== void 0 && V(t, "paragraphId", c.paragraphId), c.source !== void 0 && (V(t, "sourceStory", c.source.story), V(t, "sourceStoryInstance", c.source.storyInstance), V(t, "sourcePath", JSON.stringify(c.source.path))), t.textContent = c.text;
		let l = c.transform ?? "";
		if (a && c.eastAsianVert) {
			let e = B(c, a(c.font));
			e !== 1 && (l = `${l ? `${l} ` : ""}scaleX(${e})`);
		}
		let u = l ? `transform:${l};transform-origin:top left;` : "", d = i ? c.hyperlink : void 0, f = d ? "pointer" : "text", p = c.letterSpacingPx === void 0 ? "0" : `${c.letterSpacingPx}px`, m = c.trailingSpaceCompressionPx === void 0 ? "" : `width:${R(c.w, n)};overflow:hidden;`;
		t.style.cssText = `position:absolute;left:${R(c.x, n)};top:${R(c.y, r)};font:${c.font};line-height:${c.h}px;letter-spacing:${p};` + m + u + `white-space:pre;color:transparent;cursor:${f};pointer-events:all;`, d && i && (t.title = d.kind === "external" ? d.url : d.ref, t.addEventListener("click", (e) => {
			e.preventDefault(), i(d);
		})), e.appendChild(t);
	}
}
function U(e, t, n, r, i, a, o = {}) {
	e.innerHTML = "";
	let s = o.match ?? "rgba(255, 214, 0, 0.42)", c = o.active ?? "rgba(255, 140, 0, 0.55)";
	for (let o of n) {
		let n = o.active ? c : o.color ?? s;
		for (let s of o.slices) {
			let o = t[s.runIndex];
			if (!o) continue;
			let c = a(o.font), l = L(o.text, s.start, s.end, c), u = o.letterSpacingPx ?? 0, d = Math.max(0, Math.min(s.start, o.text.length)), f = Math.max(d, Math.min(s.end, o.text.length)), p = [...o.text.slice(0, d)].length, m = [...o.text.slice(d, f)].length, h = l.x + p * u, g = l.width + Math.max(0, m - 1) * u, _ = B(o, c), v = h * _, y = g * _;
			if (y <= 0) continue;
			let b = document.createElement("div"), x = o.transform ? `transform:${o.transform};transform-origin:top left;` : "";
			b.style.cssText = `position:absolute;left:${R(o.x + v, r)};top:${R(o.y, i)};width:${R(y, r)};height:${R(o.h, i)};` + x + `background:${n};pointer-events:none;`, e.appendChild(b);
		}
	}
}
//#endregion
//#region packages/docx/src/find.ts
var W = class extends fe {
	constructor(e, t) {
		super(e, t, (e) => ({ page: e }));
	}
	pageRuns(e) {
		return this.unitRuns(e);
	}
	setPageRuns(e, t) {
		this.setUnitRuns(e, t);
	}
	pageHighlights(e) {
		return this.unitHighlights(e);
	}
	activePage() {
		return this.activeUnit();
	}
};
//#endregion
//#region packages/docx/src/selection-context.ts
function xe(e, t, n, r, i = {}) {
	let a = e.find((e) => e.id === n && e.parentId === void 0);
	if (!a) return null;
	let o = new Map(e.map((e) => [e.id, e])), s = e.filter((e) => {
		if (e.parentId === void 0) return !1;
		let t = e, n = /* @__PURE__ */ new Set();
		for (; t.parentId !== void 0 && !n.has(t.id);) {
			n.add(t.id);
			let e = o.get(t.parentId);
			if (!e) return !1;
			if (e.id === a.id) return !0;
			t = e;
		}
		return !1;
	}), c = ye({
		id: a.id,
		author: a.author,
		date: a.date,
		text: a.paragraphs?.join("\n") ?? a.text,
		status: a.resolved ? "resolved" : "active"
	}, s.map((e) => ({
		id: e.id,
		author: e.author,
		date: e.date,
		text: e.paragraphs?.join("\n") ?? e.text,
		status: e.resolved ? "resolved" : "active"
	})), i.maxTextCharacters), l = t.find((e) => e.commentId === n)?.source;
	return Object.freeze({
		format: "docx",
		kind: "comment",
		pageIndex: r,
		commentId: n,
		...l ? { source: Object.freeze({
			...l,
			path: Object.freeze([...l.path])
		}) } : {},
		thread: c.thread,
		truncated: c.truncated,
		truncationReasons: c.truncated ? ["text"] : [],
		textCharacters: c.textCharacters,
		maxTextCharacters: c.maxTextCharacters
	});
}
function G(e) {
	if (e === void 0 || !/^\d+$/.test(e)) return null;
	let t = Number(e);
	return Number.isSafeInteger(t) ? t : null;
}
function Se(e) {
	for (let t = e; t; t = t.parentElement) {
		let e = G(t.dataset.pageIndex);
		if (e !== null) return e;
	}
	return null;
}
var Ce = new Set([
	"body",
	"header",
	"footer",
	"footnote",
	"endnote",
	"textbox"
]);
function K(e) {
	let t = e.dataset.sourceStory, n = e.dataset.sourceStoryInstance, r = e.dataset.sourcePath;
	if (!t || !Ce.has(t) || !n || !r) return null;
	try {
		let e = JSON.parse(r);
		return !Array.isArray(e) || e.length === 0 || e.length > 32 || !e.every((e) => Number.isSafeInteger(e) && e >= 0) ? null : {
			story: t,
			storyInstance: n,
			path: [...e]
		};
	} catch {
		return null;
	}
}
function q(e, t, n = {}) {
	let r = x(e, t, (e) => {
		let t = Se(e), n = G(e.dataset.runIndex);
		return t === null || n === null ? null : {
			pageIndex: t,
			runIndex: n,
			...e.dataset.paragraphId === void 0 ? {} : { paragraphId: e.dataset.paragraphId },
			...K(e) === null ? {} : { source: K(e) }
		};
	}, {
		maxChars: n.maxTextCharacters,
		maxLocators: n.maxRunLocators
	});
	if (!r) return null;
	let i = [...r.locators].sort((e, t) => e.pageIndex - t.pageIndex || e.runIndex - t.runIndex);
	return {
		format: "docx",
		kind: "text",
		text: r.text,
		pageIndexes: [...new Set(i.map((e) => e.pageIndex))],
		paragraphIds: [...new Set(i.flatMap((e) => e.paragraphId ? [e.paragraphId] : []))],
		runs: i,
		truncated: r.truncated,
		truncationReasons: r.truncationReasons,
		textCharacters: r.textCharacters,
		maxTextCharacters: r.maxTextCharacters,
		maxRunLocators: r.maxLocators
	};
}
//#endregion
//#region packages/docx/src/focused-view-runtime.ts
function J(e, t, n, r, i) {
	return r === "worker" ? e.renderPageToBitmap(n, i) : e.renderPage(t, n, i);
}
//#endregion
//#region packages/docx/src/viewer.ts
var Y = Symbol("DocxViewer.borrowedDocument"), X = class e {
	_pendingLoadAbort = null;
	_pendingRequestedView;
	_pendingViewChanged = null;
	_documentOwner;
	get _doc() {
		return this._documentOwner.current;
	}
	_borrowed;
	_hostWindow;
	_currentPage = 0;
	_scale = null;
	_canvas;
	_wrapper;
	_canvasMount;
	_textLayer = null;
	_highlightLayer = null;
	_elementLayer = null;
	_find;
	_findRequestGeneration = 0;
	_measureCtx = null;
	_opts;
	_showTrackedChangesExplicit = !1;
	_mode;
	_renderDispatcher;
	_errorRouter;
	_destroyed = !1;
	_selectionChangeListener = null;
	_selectionContextKey = "null";
	_elementContext = null;
	_elementHitGeneration = 0;
	_layoutViewGeneration = 0;
	_layoutViewPublicationGeneration = 0;
	_navigationGeneration = 0;
	_layoutUnsubscribe = null;
	_internalHyperlinkGeneration = 0;
	_layoutWaiters = /* @__PURE__ */ new Set();
	_layoutFailed = !1;
	_loadingIndicator;
	_elementClickListener = null;
	_contextMenuListener = null;
	static fromDocument(t, n, r = {}) {
		let i = d(n);
		return new e(t, {
			...r,
			currentDate: i.currentDate,
			showTrackedChanges: i.showTrackedChanges,
			[Y]: n
		});
	}
	constructor(e, t = {}) {
		this._canvas = e, this._opts = t, this._showTrackedChangesExplicit = t.showTrackedChanges !== void 0;
		let n = t[Y];
		this._borrowed = n !== void 0, this._mode = E("DocxViewer", t.mode, n), this._documentOwner = new T("DocxViewer", n ?? null, !1);
		let r = e.ownerDocument?.defaultView ?? (typeof window < "u" ? window : null);
		if (!r) throw Error("DocxViewer requires a canvas with an active Window");
		this._hostWindow = r, this._canvasMount = new re(e, {
			wrapperCssText: "position:relative;display:inline-block;vertical-align:top;",
			forceDisplayBlock: !0
		}), this._wrapper = this._canvasMount.wrapper, this._renderDispatcher = new y(e, this._mode === "worker"), this._errorRouter = new C("DocxViewer", t.onError);
		let i = new te(this._wrapper, t.enableTextSelection === !0, t.enableElementSelection === !0);
		this._textLayer = i.textLayer, this._highlightLayer = i.highlightLayer, this._elementLayer = i.elementLayer, this._loadingIndicator = new ee(this._wrapper, "Loading page");
		let a = this._wrapper.ownerDocument.createElement("progress");
		a.setAttribute("aria-hidden", "true"), this._loadingIndicator.layer.appendChild(a), this._wrapper.insertBefore(this._loadingIndicator.layer, this._elementLayer), this._textLayer && (t.onSelectionContextChange || t.enableElementSelection) && (this._selectionChangeListener = () => this._emitSelectionContextChange(), this._wrapper.ownerDocument.addEventListener("selectionchange", this._selectionChangeListener)), t.enableElementSelection && (this._elementClickListener = (e) => {
			this._onElementClick(e).catch((e) => this._reportRenderError(e));
		}, this._wrapper.addEventListener("click", this._elementClickListener)), t.onContextMenu && (this._contextMenuListener = (e) => this._onContextMenu(e), this._wrapper.addEventListener("contextmenu", this._contextMenuListener)), this._find = new W(() => this.pageCount, (e) => this._collectPageRuns(e)), n && this._bindLayoutDocument(n);
	}
	async load(e) {
		if (this._destroyed) throw Error("DocxViewer is destroyed");
		if (this._borrowed) throw Error("DocxViewer.load() is unsupported on a Viewer created by fromDocument(); the borrowed document is already loaded.");
		let t = !1, n = this._pendingRequestedView;
		this._pendingLoadAbort?.abort();
		let r = new AbortController();
		this._pendingLoadAbort = r, this._pendingRequestedView = n;
		try {
			let i = await this._documentOwner.replace(async () => {
				let t = await f.load(e, {
					password: this._opts.password,
					useGoogleFonts: this._opts.useGoogleFonts,
					allowFootnoteContinuation: this._opts.allowFootnoteContinuation,
					cjkFallback: this._opts.cjkFallback,
					maxZipEntryBytes: this._opts.maxZipEntryBytes,
					resourceLimits: this._opts.resourceLimits,
					debug: this._opts.debug,
					onResourceMetrics: this._opts.onResourceMetrics,
					workerTimeoutMs: this._opts.workerTimeoutMs,
					wasmUrl: this._opts.wasmUrl,
					math: this._opts.math,
					threeD: this._opts.threeD,
					regionMap: this._opts.regionMap,
					chartEx: this._opts.chartEx,
					tiff: this._opts.tiff,
					mode: this._mode,
					...this._opts.progressiveLayout ? { progressiveLayout: !0 } : {},
					...this._opts.sliceLayout === void 0 ? {} : { sliceLayout: this._opts.sliceLayout },
					[l]: {
						signal: r.signal,
						requestedView: () => this._pendingRequestedView,
						subscribeViewChange: (e) => (this._pendingViewChanged = e, () => {
							this._pendingViewChanged === e && (this._pendingViewChanged = null);
						})
					},
					onLayoutProgress: this._opts.onLayoutProgress,
					onLayoutPartial: this._opts.onLayoutPartial,
					onLayoutComplete: this._opts.onLayoutComplete,
					...n === void 0 ? this._opts.modelSources === void 0 ? this._opts.showTrackedChanges === !0 ? { showTrackedChanges: !0 } : {} : this._showTrackedChangesExplicit ? { showTrackedChanges: this._opts.showTrackedChanges } : void 0 : { showTrackedChanges: n },
					...this._opts.modelSources === void 0 ? void 0 : { modelSources: this._opts.modelSources },
					...this._opts.currentDate === void 0 ? {} : { currentDate: this._opts.currentDate }
				});
				return await c(t, r.signal, () => this._pendingRequestedView, () => this._opts.currentDate, this), t;
			}, () => {
				this._invalidateElementContext(!1), t = !0, this._renderDispatcher.begin(), this._findRequestGeneration++, this._find.invalidate(), this._unbindLayoutDocument();
			});
			if (!i) return;
			if (this._destroyed) throw Error("DocxViewer is destroyed");
			if (this._pendingLoadAbort !== r || (this._pendingRequestedView !== void 0 && (this._showTrackedChangesExplicit = !0, this._opts = {
				...this._opts,
				showTrackedChanges: this._pendingRequestedView
			}), this._currentPage = 0, this._bindLayoutDocument(i), this._find.invalidate(), await this._render(), this._pendingLoadAbort !== r)) return;
		} catch (e) {
			if (this._destroyed) throw Error("DocxViewer is destroyed");
			if (this._pendingLoadAbort !== r) return;
			throw e instanceof Error ? e : Error(String(e));
		} finally {
			this._pendingLoadAbort === r && (this._pendingLoadAbort = null, this._pendingRequestedView = void 0, this._pendingViewChanged = null);
		}
		t && !this._destroyed && this._emitSelectionContextChange();
	}
	get pageCount() {
		return this._doc?.pageCount ?? 0;
	}
	get currentPage() {
		return this._currentPage;
	}
	get layoutComplete() {
		return this._doc?.layoutComplete ?? !0;
	}
	async waitUntilLayoutComplete() {
		await this._errorRouter.ownBackgroundLifecycle(async () => {
			await this._doc?.waitUntilLayoutComplete?.();
		});
	}
	get canvasElement() {
		return this._canvas;
	}
	async goToPage(e) {
		let t = this._doc;
		if (!t) return;
		let n = this._cancelPendingNavigation(), r = Math.max(0, Number.isNaN(e) ? 0 : Math.trunc(e));
		if (r >= this.pageCount && !this.layoutComplete) {
			this._setLoading(!0);
			try {
				await this._waitForPage(t, r, n);
			} finally {
				n === this._navigationGeneration && this._setLoading(!1);
			}
		}
		if (this._destroyed || n !== this._navigationGeneration || t !== this._doc) return;
		let i = Math.max(0, Math.min(r, this.pageCount - 1)), a = i !== this._currentPage;
		a && this._invalidateElementContext(!1), this._currentPage = i, await this._render(), a && !this._destroyed && this._emitSelectionContextChange();
	}
	async nextPage() {
		await this.goToPage(this._currentPage + 1);
	}
	async prevPage() {
		await this.goToPage(this._currentPage - 1);
	}
	_naturalWidthPx() {
		return !this._doc || this._doc.pageCount === 0 ? 0 : this._doc.pageSize(this._currentPage).widthPt * m;
	}
	_renderWidth() {
		if (this._scale === null) return this._opts.width;
		let e = this._naturalWidthPx();
		return e <= 0 ? this._opts.width : Math.round(e * this._scale);
	}
	getScale() {
		if (this._scale !== null) return this._scale;
		let e = this._naturalWidthPx();
		return e <= 0 ? 1 : this._opts.width && this._opts.width > 0 ? this._opts.width / e : 1;
	}
	_zoomMin() {
		return this._opts.zoomMin ?? .1;
	}
	_zoomMax() {
		return this._opts.zoomMax ?? 4;
	}
	async setScale(e) {
		let t = v(e, this._zoomMin(), this._zoomMax()), n = t !== this.getScale();
		this._scale = t, await this._render(), n && this._opts.onScaleChange?.(t);
	}
	async zoomIn() {
		await this.setScale(ae(this.getScale()));
	}
	async zoomOut() {
		await this.setScale(b(this.getScale()));
	}
	async fitWidth() {
		await this._fit("width");
	}
	async fitPage() {
		await this._fit("page");
	}
	async _fit(e) {
		if (!this._doc || this._doc.pageCount === 0) return;
		let t = this._doc.pageSize(this._currentPage), n = this._fitContainer();
		if (!n) return;
		let r = ie({
			contentWidth: t.widthPt * m,
			contentHeight: t.heightPt * m,
			containerWidth: n.clientWidth,
			containerHeight: n.clientHeight
		}, e);
		r <= 0 || await this.setScale(r);
	}
	_fitContainer() {
		return this._opts.container ?? this._wrapper.parentElement ?? null;
	}
	async findText(e, t = {}) {
		let n = S(e), r = this._doc;
		if (!r) return [];
		let i = ++this._findRequestGeneration;
		if (n.length > 0 && !r.layoutComplete && (await this._errorRouter.ownBackgroundLifecycle(() => r.waitUntilLayoutComplete()), this._destroyed || this._doc !== r || i !== this._findRequestGeneration)) return [];
		let a = await this._errorRouter.ownAwaitable(() => this._find.find(e, t));
		return this._redrawHighlights(), a;
	}
	async findNext() {
		return this._activateMatch(this._find.next());
	}
	async findPrev() {
		return this._activateMatch(this._find.prev());
	}
	clearFind() {
		this._findRequestGeneration++, this._find.invalidate(), this._redrawHighlights();
	}
	async _activateMatch(e) {
		return e ? (e.location.page === this._currentPage ? this._redrawHighlights() : await this.goToPage(e.location.page), e) : (this._redrawHighlights(), null);
	}
	_redrawHighlights() {
		let e = this._find.pageRuns(this._currentPage) ?? [];
		this._buildHighlightLayer(e);
	}
	async getResourceMetrics() {
		if (!this._doc) throw Error("Document not loaded");
		return await this._doc.getResourceMetrics();
	}
	getSelectionContext(e = {}) {
		if (this._destroyed) throw Error("DocxViewer is destroyed");
		return (this._textLayer ? q(this._wrapper, this._wrapper.ownerDocument?.getSelection?.() ?? null, e) : null) ?? (this._elementContext ? s(this._elementContext, e.maxTextCharacters) : null);
	}
	_emitSelectionContextChange() {
		let e = this.getSelectionContext();
		e?.kind === "text" && (this._elementHitGeneration++, this._elementContext = null, this._redrawElementOutline());
		let t = JSON.stringify(e);
		t !== this._selectionContextKey && (this._selectionContextKey = t, this._opts.onSelectionContextChange?.(e ? structuredClone(e) : null));
	}
	_setElementContext(e) {
		this._elementContext = e ? structuredClone(e) : null, this._redrawElementOutline(), this._emitSelectionContextChange();
	}
	_invalidateElementContext(e = !0) {
		this._elementHitGeneration++, this._elementContext = null, this._redrawElementOutline(), e && this._emitSelectionContextChange();
	}
	_redrawElementOutline() {
		let e = this._elementContext, t = this._doc;
		if (!e || !t || e.pageIndex !== this._currentPage) {
			w(this._elementLayer, null);
			return;
		}
		let n = t.pageSize(e.pageIndex);
		w(this._elementLayer, {
			x: e.bounds.xPt / n.widthPt,
			y: e.bounds.yPt / n.heightPt,
			width: e.bounds.widthPt / n.widthPt,
			height: e.bounds.heightPt / n.heightPt
		});
	}
	async _onElementClick(e) {
		this._destroyed || e.defaultPrevented || e.button !== 0 || await this._resolveContextAt(e);
	}
	_onContextMenu(e) {
		let t;
		this._opts.onContextMenu?.({
			originalEvent: e,
			getContext: () => t ??= this._resolveContextAt(e)
		});
	}
	async _resolveContextAt(e) {
		let t = this._doc;
		if (this._destroyed || !t) return null;
		if (this._textLayer && q(this._wrapper, this._wrapper.ownerDocument?.getSelection?.() ?? null)) return this._emitSelectionContextChange(), this._destroyed ? null : this.getSelectionContext();
		if (!this._opts.enableElementSelection) return this.getSelectionContext();
		let n = this._canvas.getBoundingClientRect();
		if (n.width <= 0 || n.height <= 0) return this._invalidateElementContext(), null;
		let r = e.clientX - n.left, i = e.clientY - n.top;
		if (r < 0 || i < 0 || r > n.width || i > n.height) return this._invalidateElementContext(), null;
		let a = ++this._elementHitGeneration, s = this._currentPage, c = t.pageSize(s), l;
		try {
			l = await t.getElementContextAt(s, {
				xPt: r / n.width * c.widthPt,
				yPt: i / n.height * c.heightPt
			}, {
				currentDate: this._opts.currentDate,
				showTrackedChanges: this._opts.showTrackedChanges,
				maxTextCharacters: o
			});
		} catch (e) {
			if (this._destroyed || a !== this._elementHitGeneration || s !== this._currentPage || t !== this._doc) return null;
			throw e;
		}
		return this._destroyed || a !== this._elementHitGeneration || s !== this._currentPage || t !== this._doc ? null : (this._setElementContext(l), this._destroyed ? null : this.getSelectionContext());
	}
	destroy() {
		this._destroyed || (this._destroyed = !0, this._pendingLoadAbort?.abort(), this._pendingLoadAbort = null, this._pendingViewChanged = null, this._findRequestGeneration++, this._layoutViewGeneration++, this._unbindLayoutDocument(), this._errorRouter.close(), this._renderDispatcher.destroy(), r(this._canvas), this._documentOwner.close(), this._find.invalidate(), this._selectionChangeListener &&= (this._wrapper.ownerDocument.removeEventListener("selectionchange", this._selectionChangeListener), null), this._elementHitGeneration++, this._elementClickListener &&= (this._wrapper.removeEventListener("click", this._elementClickListener), null), this._contextMenuListener &&= (this._wrapper.removeEventListener("contextmenu", this._contextMenuListener), null), this._elementContext = null, this._canvasMount.restore());
	}
	async _render() {
		let e = this._renderDispatcher.begin();
		try {
			await this._renderPage(e);
		} catch (t) {
			if (!this._renderDispatcher.isCurrent(e)) return;
			throw t;
		}
	}
	_reportRenderError(e) {
		this._errorRouter.report(e);
	}
	async _renderPage(e) {
		if (!this._doc) return;
		let t = this._mode === "worker", n = this._renderWidth(), r = this._doc.pageSize(this._currentPage), i = n ?? r.widthPt * 1.3333333333333333, a = r.widthPt > 0 ? i * r.heightPt / r.widthPt : 0, o = [], s = (e) => o.push(e), c = this._opts.dpr ?? (typeof window < "u" && window.devicePixelRatio || 1), l = {
			width: n,
			dpr: this._opts.dpr,
			imageResources: this._opts.imageResources,
			defaultTextColor: this._opts.defaultTextColor,
			currentDate: this._opts.currentDate,
			showTrackedChanges: this._opts.showTrackedChanges,
			onTextRun: s
		};
		if (t) {
			let t = await J(this._doc, this._canvas, this._currentPage, "worker", l);
			if (!this._renderDispatcher.commitBitmap(e, t, {
				cssWidth: i > 0 ? i : Math.round(t.width / c),
				cssHeight: a > 0 ? a : Math.round(t.height / c)
			})) return;
		} else if (await J(this._doc, this._canvas, this._currentPage, "main", l), !this._renderDispatcher.isCurrent(e)) return;
		this._textLayer && this._buildTextLayer(this._textLayer, o), this._find.setPageRuns(this._currentPage, o), this._buildHighlightLayer(o), this._opts.onPageChange?.(this._currentPage, this.pageCount, this.layoutComplete);
	}
	_bindLayoutDocument(e) {
		this._unbindLayoutDocument(), this._layoutFailed = !1, this._layoutViewPublicationGeneration = 0;
		let t = u(e, (t) => this._onLayoutViewPublication(e, t), (e) => this._reportRenderError(e)), n = !0, r = a(e, () => ({
			pageCount: e.pageCount,
			exact: e.layoutComplete,
			complete: e.layoutComplete
		}), (t) => {
			if (n) {
				n = !1;
				return;
			}
			this._onLayoutPublication(e, t);
		}, (e) => this._reportRenderError(e));
		this._layoutUnsubscribe = () => {
			r(), t();
		};
	}
	_unbindLayoutDocument() {
		this._layoutUnsubscribe?.(), this._layoutUnsubscribe = null, this._layoutFailed = !1, this._cancelPendingNavigation();
	}
	_onLayoutPublication(e, t) {
		if (!(this._destroyed || e !== this._doc)) {
			if (this._wakeLayoutWaiters(), t.error !== void 0) {
				this._layoutFailed = !0, this._errorRouter.reportBackground(t.error, this._opts.onLayoutComplete !== void 0);
				return;
			}
			this._find.invalidate(), this._currentPage = Math.max(0, Math.min(this._currentPage, t.pageCount - 1)), this._render().catch((e) => this._reportRenderError(e));
		}
	}
	_onLayoutViewPublication(e, t) {
		this._destroyed || e !== this._doc || t.generation <= this._layoutViewPublicationGeneration || (this._layoutViewPublicationGeneration = t.generation, t.requester !== this && (this._layoutViewGeneration++, this._opts = {
			...this._opts,
			currentDate: t.view.currentDate,
			showTrackedChanges: t.view.showTrackedChanges
		}, this._find.invalidate(), this._currentPage = Math.max(0, Math.min(this._currentPage, e.pageCount - 1)), this._render().catch((e) => this._reportRenderError(e))));
	}
	async _waitForPage(e, t, n) {
		await this._errorRouter.ownBackgroundLifecycle(async () => {
			for (; !this._destroyed && n === this._navigationGeneration && e === this._doc && t >= e.pageCount && !e.layoutComplete && !this._layoutFailed;) await new Promise((e) => {
				this._layoutWaiters.add(e);
			});
			e === this._doc && (e.layoutComplete || this._layoutFailed) && await e.waitUntilLayoutComplete();
		});
	}
	_wakeLayoutWaiters() {
		for (let e of this._layoutWaiters) e();
		this._layoutWaiters.clear();
	}
	_cancelPendingNavigation() {
		let e = ++this._navigationGeneration;
		return this._wakeLayoutWaiters(), this._setLoading(!1), e;
	}
	_setLoading(e) {
		this._loadingIndicator.setLoading(e);
	}
	async setShowTrackedChanges(e) {
		let t = ++this._layoutViewGeneration;
		if (this._pendingLoadAbort) {
			let t = this._pendingRequestedView !== e;
			this._pendingRequestedView = e, t && this._pendingViewChanged?.();
		}
		let n = this._doc, r = this._opts.modelSources === void 0 ? this._opts.showTrackedChanges === !0 : n ? d(n).showTrackedChanges : this._opts.showTrackedChanges === !0;
		if ((!n || r === e) && (this._showTrackedChangesExplicit = !0, this._opts = {
			...this._opts,
			showTrackedChanges: e
		}), r === e) {
			n && await i(n, {
				showTrackedChanges: e,
				currentDate: this._opts.currentDate
			}, this);
			return;
		}
		let a = {
			...this._opts,
			showTrackedChanges: e
		};
		(!n || await i(n, {
			showTrackedChanges: e,
			currentDate: a.currentDate
		}, this)) && (this._destroyed || t !== this._layoutViewGeneration || n !== this._doc || (this._showTrackedChangesExplicit = !0, this._opts = a, this._find.invalidate(), this._currentPage = Math.max(0, Math.min(this._currentPage, this.pageCount - 1)), await this._render()));
	}
	_buildHighlightLayer(e) {
		let t = this._highlightLayer;
		if (!t) return;
		let { width: n, height: r } = this._canvasCssPx();
		U(t, e, this._find.pageHighlights(this._currentPage), n, r, (e) => this._measureForFont(e), this._opts.findHighlightColors);
	}
	_canvasCssPx() {
		return {
			width: parseFloat(this._canvas.style.width) || this._canvas.width,
			height: parseFloat(this._canvas.style.height) || this._canvas.height
		};
	}
	_measureForFont(e) {
		this._measureCtx ||= document.createElement("canvas").getContext("2d");
		let t = this._measureCtx;
		return t ? (t.font = e, (e) => t.measureText(e).width) : (e) => e.length;
	}
	async _collectPageRuns(e) {
		return this._doc ? this._doc.collectPageRuns(e, {
			width: this._renderWidth(),
			currentDate: this._opts.currentDate,
			showTrackedChanges: this._opts.showTrackedChanges
		}) : [];
	}
	_buildTextLayer(e, t) {
		let { width: n, height: r } = this._canvasCssPx();
		H(e, t, n, r, this._hyperlinkHandler(), (e) => this._measureForFont(e), this._currentPage);
	}
	_hyperlinkHandler() {
		return this._opts.enableHyperlinks === !1 ? void 0 : this._opts.onHyperlinkClick || ((e) => {
			if (e.kind === "external") {
				I(e.url, void 0, this._hostWindow);
				return;
			}
			let t = this._doc;
			if (!t) return;
			let n = ++this._internalHyperlinkGeneration;
			this._navigateInternalHyperlink(t, e.ref, n).catch((e) => this._reportRenderError(e));
		});
	}
	async _navigateInternalHyperlink(e, t, n) {
		if (e.layoutComplete || await e.waitUntilLayoutComplete(), this._destroyed || this._doc !== e || n !== this._internalHyperlinkGeneration) return;
		let r = e.getBookmarkPage(t);
		r !== void 0 && await this.goToPage(r);
	}
}, we = class {
	pageById = /* @__PURE__ */ new Map();
	runsByPage = /* @__PURE__ */ new Map();
	indexedPages = /* @__PURE__ */ new Set();
	frontier = 0;
	generation = 0;
	constructor(e) {
		this.hooks = e;
	}
	reset() {
		this.generation++, this.pageById.clear(), this.runsByPage.clear(), this.indexedPages.clear(), this.frontier = 0;
	}
	commitRuns(e, t) {
		this.runsByPage.set(e, {
			scale: this.hooks.scale(),
			runs: Promise.resolve(t)
		});
		let n = this.hooks.document();
		n && e === this.frontier && this.indexPage(e, t, n.commentAnchorRanges());
	}
	indexPage(e, t, n) {
		if (!this.indexedPages.has(e)) {
			for (let r of n) !this.pageById.has(r.commentId) && z(r, t).length > 0 && this.pageById.set(r.commentId, e);
			for (this.indexedPages.add(e); this.indexedPages.has(this.frontier);) this.frontier++;
		}
	}
	async runsForPage(e, t) {
		for (; !this.hooks.destroyed() && this.hooks.document() === t;) {
			let n = this.hooks.scale(), r = this.runsByPage.get(e);
			(!r || r.scale !== n) && (r = {
				scale: n,
				runs: t.collectPageRuns(e, {
					width: this.hooks.pageWidth(e),
					currentDate: this.hooks.currentDate(),
					...this.hooks.showTrackedChanges() ? { showTrackedChanges: !0 } : {}
				})
			}, this.runsByPage.set(e, r));
			try {
				let e = await r.runs;
				if (this.hooks.destroyed() || this.hooks.document() !== t) return null;
				if (this.hooks.scale() !== n) continue;
				return e;
			} catch (t) {
				throw this.runsByPage.get(e) === r && this.runsByPage.delete(e), t;
			}
		}
		return null;
	}
	async goToComment(e, t) {
		if (this.hooks.destroyed()) throw Error("DocxScrollViewer is destroyed");
		let n = this.hooks.document();
		if (!n || !n.comments.some((t) => t.id === e && t.parentId === void 0)) return !1;
		let r = ++this.generation, i = !n.layoutComplete, a = n.commentAnchorRanges().filter((t) => t.commentId === e), o = t?.pageIndex;
		if (o !== void 0 && (!Number.isInteger(o) || o < 0)) return !1;
		let s = o ?? this.pageById.get(e), c = async () => {
			let t = n.commentAnchorRanges();
			for (; s === void 0 && this.frontier < n.pageCount;) {
				let i = this.frontier, a = await this.runsForPage(i, n);
				if (this.hooks.destroyed()) throw Error("DocxScrollViewer is destroyed");
				if (this.hooks.document() !== n || r !== this.generation || !a) return;
				this.indexPage(i, a, t), s = this.pageById.get(e);
			}
		};
		if (o === void 0 && s === void 0 && a.length > 0 && await c(), i && (o !== void 0 && o >= n.pageCount || o === void 0 && s === void 0)) {
			if (await this.hooks.waitForLayout(n), this.hooks.destroyed()) throw Error("DocxScrollViewer is destroyed");
			if (this.hooks.document() !== n || r !== this.generation) return !1;
			a = n.commentAnchorRanges().filter((t) => t.commentId === e), this.pageById.clear(), this.runsByPage.clear(), this.indexedPages.clear(), this.frontier = 0, s = o, o === void 0 && a.length > 0 && await c();
		}
		if (a.length === 0 || s === void 0 || o !== void 0 && o >= n.pageCount) return !1;
		let l = await this.runsForPage(s, n);
		if (this.hooks.destroyed()) throw Error("DocxScrollViewer is destroyed");
		if (this.hooks.document() !== n || r !== this.generation || !l) return !1;
		let u = a.flatMap((e) => z(e, l))[0];
		return u ? (this.hooks.select(e, s, u, t), !0) : !1;
	}
	destroy() {
		this.reset();
	}
}, Te = class {
	unsubscribe = null;
	viewGeneration = 0;
	prefix = 0;
	constructor(e) {
		this.hooks = e;
	}
	get presentedPageCount() {
		return this.prefix;
	}
	set presentedPageCount(e) {
		this.prefix = e;
	}
	bind(e) {
		this.unbind(), this.viewGeneration = 0, this.prefix = e.pageCount;
		let t = u(e, (t) => this.onViewPublication(e, t), this.hooks.report), n = !0, r = a(e, () => ({
			pageCount: e.pageCount,
			exact: e.layoutComplete,
			complete: e.layoutComplete
		}), (t) => {
			if (n) {
				n = !1;
				return;
			}
			this.onPublication(e, t);
		}, this.hooks.report);
		this.unsubscribe = () => {
			r(), t();
		};
	}
	unbind() {
		this.unsubscribe?.(), this.unsubscribe = null, this.prefix = 0;
	}
	onPublication(e, t) {
		if (!(this.hooks.destroyed() || e !== this.hooks.current())) {
			if (t.error !== void 0) {
				this.hooks.reportBackground(t.error);
				return;
			}
			this.hooks.invalidateFind(), this.hooks.refreshComments(), this.apply(t);
		}
	}
	onViewPublication(e, t) {
		this.hooks.destroyed() || e !== this.hooks.current() || t.generation <= this.viewGeneration || (this.viewGeneration = t.generation, this.hooks.adoptView(t));
	}
	apply(e) {
		let t = [...this.hooks.mounted()], n = this.prefix;
		if (this.prefix = e.pageCount, (e.unchangedPages ?? 0) >= Math.min(n, e.pageCount)) {
			this.hooks.relayout();
			return;
		}
		this.hooks.invalidateRender(), this.hooks.relayout();
		for (let [e, n] of t) e >= this.prefix || !this.hooks.stillMounted(e, n) || this.hooks.refreshSlot(e, n);
	}
	destroy() {
		this.unbind();
	}
}, Ee = 12, De = 13, Z = Symbol("DocxScrollViewer.borrowedDocument"), Oe;
function ke() {
	return Oe ??= import("./comment-ui-runtime-BrPw9ONO.js");
}
var Q = class e {
	_pendingLoadAbort = null;
	_pendingRequestedView;
	_pendingViewChanged = null;
	_documentOwner;
	get _doc() {
		return this._documentOwner.current;
	}
	_borrowed;
	_opts;
	_errorRouter;
	_container;
	_shell;
	get _wrapper() {
		return this._shell.wrapper;
	}
	get _scrollHost() {
		return this._shell.scrollHost;
	}
	get _spacer() {
		return this._shell.spacer;
	}
	_mode;
	_viewport = new pe({
		options: () => this._opts,
		container: () => this._container,
		scrollHost: () => this._scrollHost
	});
	_zoom = new M({
		scrollHost: () => this._scrollHost,
		spacer: () => this._spacer,
		count: () => this._doc?.pageCount ?? 0,
		zoomMin: () => this._opts.zoomMin ?? .1,
		zoomMax: () => this._opts.zoomMax ?? 4,
		baseScale: () => this._baseScale(),
		fitWidthPx: () => this._viewport.fitWidth(),
		fitContentSize: (e) => {
			if (!this._doc) return null;
			let t = this._doc.pageSize(0);
			return {
				width: (e === "width" ? this._widestPageWidthPt() : t.widthPt) * m,
				height: t.heightPt * m
			};
		},
		indexAt: (e) => this._pageIndexAtOffset(this._range(), e),
		offset: (e) => this._scrollGeometry.offsets[e] ?? 0,
		height: (e) => this._heights[e] || 0,
		totalHeight: () => this._scrollGeometry.totalHeight,
		recomputeHeights: () => this._recomputeHeights(),
		syncSpacerWidth: () => this._syncSpacerWidth(),
		padLeft: () => this._viewport.horizontalPadding().left,
		invalidateRender: () => {
			this._renderEpoch++;
		},
		preview: () => this._previewVisible(),
		scheduleSettle: () => this._scheduleSettle(),
		onScaleChange: (e) => this._opts.onScaleChange?.(e),
		relayout: () => this.relayout(),
		mountVisible: () => this._mountVisible(),
		refitOnResize: () => this._opts.refitOnResize !== !1
	});
	get _scale() {
		return this._zoom.scale;
	}
	get _scaleEstablished() {
		return this._zoom.established;
	}
	_scroller = new me({
		spacer: () => this._spacer,
		count: () => this._doc?.pageCount ?? 0,
		range: () => this._range(),
		createSlot: () => this._createSlot(),
		attachSlot: (e) => this._scrollHost.appendChild(e.wrapper),
		resetSlot: (e, t) => this._resetSlot(e, t),
		positionSlot: (e, t, n) => this._positionSlot(t, e, n),
		renderSlot: (e, t, n) => this._renderSlot(e, t, n),
		previewSlot: (e, t, n) => this._previewSlot(t, e, n),
		settleSlot: (e, t) => this._refreshSlotAtomically(e, t),
		renderedScale: (e) => e.renderedScale,
		scale: () => this._scale,
		syncSpacerWidth: () => this._syncSpacerWidth(),
		onRange: (e) => this._emitVisiblePageChange(e),
		onExistingSlot: (e, t, n) => this._renderSlot(e, t, n)
	});
	_slots = this._scroller.slots;
	_layout = new Te({
		current: () => this._doc,
		destroyed: () => this._destroyed,
		report: (e) => this._reportRenderError(e),
		reportBackground: (e) => this._errorRouter.reportBackground(e, this._opts.onLayoutComplete !== void 0),
		invalidateFind: () => this._find.invalidate(),
		refreshComments: () => this._refreshCommentSurface(),
		adoptView: (e) => {
			e.requester !== this && (this._layoutViewGeneration++, this._showTrackedChanges = e.view.showTrackedChanges, this._currentDate = e.view.currentDate, this._find.invalidate(), this._layout.apply({
				pageCount: this._doc.pageCount,
				exact: !0,
				complete: this._doc.layoutComplete
			}));
		},
		relayout: () => this.relayout(),
		invalidateRender: () => {
			this._renderEpoch++;
		},
		mounted: () => this._slots,
		stillMounted: (e, t) => this._slots.get(e) === t,
		refreshSlot: (e, t) => this._refreshSlotAtomically(e, t)
	});
	_renderHooks = {
		slots: () => this._slots,
		epoch: () => this._renderEpoch,
		scale: () => this._scale,
		slotIndex: (e) => e.renderedPage,
		token: () => 0,
		nextToken: () => 0,
		wantRuns: (e) => !!(this._opts.enableTextSelection && e.textLayer) || this._findActive || !!e.commentTintLayer,
		reportError: (e) => this._reportRenderError(e)
	};
	_bitmap = new ge({
		...this._renderHooks,
		inFlight: () => this._scroller.inFlight,
		destroyed: () => this._destroyed,
		width: (e) => this._pageWidthPx(e),
		dpr: () => this._viewport.dpr(),
		canRetry: () => !0,
		render: (e, t, n, r, i) => J(this._doc, t, e, "worker", {
			width: n,
			dpr: r,
			imageResources: this._opts.imageResources,
			defaultTextColor: this._opts.defaultTextColor,
			currentDate: this._currentDate,
			...this._showTrackedChanges ? { showTrackedChanges: !0 } : {},
			onTextRun: i
		}),
		commitBitmap: (e, t, n, r, i, a) => n.commitBitmap(r, i, {
			cssWidth: a,
			cssHeight: this._pageHeightPx(e)
		}),
		commitRuns: (e, t, n, r, i) => this._commitRenderedRuns(e, t, n, t.canvas, i, !0)
	});
	_main = new _e({
		...this._renderHooks,
		render: (e, t, n, r, i) => J(this._doc, t, e, "main", {
			width: n,
			dpr: r,
			imageResources: this._opts.imageResources,
			defaultTextColor: this._opts.defaultTextColor,
			currentDate: this._currentDate,
			...this._showTrackedChanges ? { showTrackedChanges: !0 } : {},
			onTextRun: i
		}),
		commitRuns: (e, t, n, r, i, a, o) => this._commitRenderedRuns(e, t, n, r, a, o),
		shadow: () => this._pageShadow
	});
	_navigation = new D({
		host: () => this._scrollHost,
		spacer: () => this._spacer,
		count: () => this.pageCount,
		established: () => this._scaleEstablished,
		offset: (e) => this._scrollGeometry.offsets[e] ?? 0,
		height: (e) => this._heights[e] || 0,
		indexAt: (e) => this._pageIndexAtOffset(this._range(), e),
		totalHeight: () => this._scrollGeometry.totalHeight,
		width: (e) => this._pageWidthPx(e),
		padLeft: () => this._viewport.horizontalPadding().left,
		marginOrigin: () => this._commentMargin.originPx,
		mount: () => this._mountVisible()
	});
	_selection = new k({
		wrapper: () => this._wrapper,
		scrollHost: () => this._scrollHost,
		slots: () => this._slots,
		resource: () => this._doc,
		destroyed: () => this._destroyed,
		textSelectionEnabled: () => this._opts.enableTextSelection === !0,
		elementSelectionEnabled: () => this._opts.enableElementSelection === !0,
		textSelected: () => q(this._wrapper, this._wrapper.ownerDocument?.getSelection?.() ?? null) !== null,
		getContext: () => this.getSelectionContext(),
		hitTest: (e, t, n, r) => {
			let i = e.pageSize(t);
			return e.getElementContextAt(t, {
				xPt: n * i.widthPt,
				yPt: r * i.heightPt
			}, {
				currentDate: this._currentDate,
				...this._showTrackedChanges ? { showTrackedChanges: !0 } : {},
				maxTextCharacters: o
			});
		},
		outline: (e, t, n) => {
			if (n.pageIndex !== t) return null;
			let r = e.pageSize(t);
			return {
				x: n.bounds.xPt / r.widthPt,
				y: n.bounds.yPt / r.heightPt,
				width: n.bounds.widthPt / r.widthPt,
				height: n.bounds.heightPt / r.heightPt
			};
		},
		onChange: (e) => this._opts.onSelectionContextChange?.(e),
		onContextMenu: (e, t) => this._opts.onContextMenu?.({
			originalEvent: e,
			getContext: t
		}),
		reportError: (e) => this._reportRenderError(e)
	});
	_heights = [];
	_scrollGeometry = {
		offsets: [],
		totalHeight: 0
	};
	_visibleEvents = new A((e, t, n) => this._opts.onVisiblePageChange?.(e, t, n));
	_loader = new de({
		name: () => "DocxScrollViewer",
		borrowed: () => this._borrowed,
		borrowedMessage: () => "DocxScrollViewer.load() is unsupported on a Viewer created by fromDocument(); the borrowed document is already loaded.",
		destroyed: () => this._destroyed,
		owner: () => this._documentOwner,
		beginLoad: () => {
			let e = this._pendingRequestedView;
			this._pendingLoadAbort?.abort();
			let t = new AbortController();
			return this._pendingLoadAbort = t, this._pendingRequestedView = e, t;
		},
		isCurrentLoad: (e) => this._pendingLoadAbort === e,
		finishLoad: (e) => {
			this._pendingLoadAbort === e && (this._pendingLoadAbort = null, this._pendingRequestedView = void 0, this._pendingViewChanged = null);
		},
		acquire: async (e, t) => {
			let n = this._pendingRequestedView, r = await f.load(e, {
				password: this._opts.password,
				useGoogleFonts: this._opts.useGoogleFonts,
				allowFootnoteContinuation: this._opts.allowFootnoteContinuation,
				cjkFallback: this._opts.cjkFallback,
				maxZipEntryBytes: this._opts.maxZipEntryBytes,
				resourceLimits: this._opts.resourceLimits,
				debug: this._opts.debug,
				onResourceMetrics: this._opts.onResourceMetrics,
				workerTimeoutMs: this._opts.workerTimeoutMs,
				wasmUrl: this._opts.wasmUrl,
				math: this._opts.math,
				threeD: this._opts.threeD,
				regionMap: this._opts.regionMap,
				chartEx: this._opts.chartEx,
				tiff: this._opts.tiff,
				mode: this._mode,
				...n === void 0 ? this._opts.modelSources === void 0 ? this._showTrackedChanges ? { showTrackedChanges: !0 } : {} : this._requestedShowTrackedChanges === void 0 ? void 0 : { showTrackedChanges: this._requestedShowTrackedChanges } : { showTrackedChanges: n },
				...this._currentDate === void 0 ? {} : { currentDate: this._currentDate },
				...this._opts.modelSources === void 0 ? void 0 : { modelSources: this._opts.modelSources },
				...this._opts.progressiveLayout ? { progressiveLayout: !0 } : {},
				...this._opts.sliceLayout === void 0 ? {} : { sliceLayout: this._opts.sliceLayout },
				[l]: {
					signal: t.signal,
					requestedView: () => this._pendingRequestedView,
					subscribeViewChange: (e) => (this._pendingViewChanged = e, () => {
						this._pendingViewChanged === e && (this._pendingViewChanged = null);
					})
				},
				onLayoutProgress: this._opts.onLayoutProgress,
				onLayoutPartial: this._opts.onLayoutPartial,
				onLayoutComplete: this._opts.onLayoutComplete
			});
			return await c(r, t.signal, () => this._pendingRequestedView, () => this._currentDate, this), r;
		},
		beforeReplace: (e) => {
			if (this._selection.invalidateElementContext(!1), this._findRequestGeneration++, this._find.invalidate(), this._findActive = !1, this._activeCommentId = null, this._activeCommentPage = null, this._commentNavigation.reset(), this._layout.unbind(), e) {
				for (let [e, t] of [...this._slots]) this._recycleSlot(e, t);
				this._visibleEvents.reset();
			}
		},
		afterReplace: (e) => {
			this._pendingRequestedView !== void 0 && (this._showTrackedChanges = this._pendingRequestedView, this._requestedShowTrackedChanges = this._pendingRequestedView), this._opts.modelSources !== void 0 && (this._showTrackedChanges = d(e).showTrackedChanges), this._layout.bind(e), this._find.invalidate(), this._findActive = !1, this._activeCommentId = null, this._activeCommentPage = null, this._commentNavigation.reset();
		},
		mountOpeningWindow: async () => {
			let e = [];
			this._relayout(e), await Promise.all(e);
		},
		selectionChanged: () => this._selection.emitChange()
	});
	_layoutUnsubscribe = null;
	_presentedPageCount = 0;
	_activeCommentId = null;
	_activeCommentPage = null;
	_commentUi = null;
	_internalHyperlinkGeneration = 0;
	_commentAnchorRangesForMargin = null;
	_commentAnchorIds = /* @__PURE__ */ new Set();
	_commentMargin = new ve({
		container: () => this._container,
		scrollHost: () => this._scrollHost,
		spacer: () => this._spacer,
		enabled: () => this._commentsEnabled(),
		cards: () => this._commentsOptions()?.cards !== !1,
		hasDisplayableComments: () => this._hasDisplayableComments(),
		requestedSide: () => this._commentsOptions()?.side,
		zoom: () => this._scaleEstablished ? this._scale : 1,
		gapPx: Ee,
		widthPx: 280,
		fontSizePx: De
	});
	_layers = new P({
		markerLayer: (e) => e.commentTintLayer,
		syncMargin: (e) => this._commentMargin.syncMargin(e),
		marginSide: () => this._commentMargin.side(),
		marginExtent: () => this._commentMargin.extent(),
		commentsEnabled: () => this._commentsEnabled(),
		previewMargin: (e, t) => this._commentUi?.previewReadOnlyCommentMargin(e, t),
		disposeMargin: (e) => {
			this._commentUi?.disposeReadOnlyCommentMargin(e), this._commentUi || e.replaceChildren();
		},
		disposeDecoration: (e) => {
			this._commentUi?.disposeReadOnlyCommentDecoration(e), this._commentUi || e.replaceChildren();
		},
		redrawOutline: (e, t) => this._selection.redrawOutlineForSlot(e, t),
		markerRatio: (e) => e,
		resetMarkerTransform: () => !0,
		resetDecorationVisibility: () => !1
	});
	_commentNavigation = new we({
		document: () => this._doc,
		destroyed: () => this._destroyed,
		scale: () => this._scale,
		pageWidth: (e) => this._pageWidthPx(e),
		currentDate: () => this._currentDate,
		showTrackedChanges: () => this._showTrackedChanges,
		waitForLayout: (e) => this._errorRouter.ownBackgroundLifecycle(() => e.waitUntilLayoutComplete()),
		select: (e, t, n, r) => {
			this._activeCommentId = e, this._activeCommentPage = t, this._selection.clearElementContext(), this._scrollToPageTarget(t, n, r);
			for (let [e, t] of this._slots) this._redrawSlotComments(e, t);
			this._selection.emitChange();
		}
	});
	_commentOverlay = new N({
		slots: () => this._slots,
		scale: () => this._scale,
		destroyed: () => this._destroyed,
		ownerWindow: () => this._wrapper.ownerDocument.defaultView,
		width: (e) => this._pageWidthPx(e),
		height: (e) => this._pageHeightPx(e),
		side: () => this._commentMargin.side(),
		marginExtent: () => this._commentMargin.extent(),
		connectorOptions: () => this._commentsOptions()?.connectors,
		runtime: () => this._commentUi,
		redrawComments: (e, t) => this._redrawSlotComments(e, t)
	});
	_destroyed = !1;
	get _renderEpoch() {
		return this._scroller.renderEpoch;
	}
	set _renderEpoch(e) {
		this._scroller.renderEpoch = e;
	}
	get _prevBase() {
		return this._zoom.prevBase;
	}
	set _prevBase(e) {
		this._zoom.prevBase = e;
	}
	_pageShadow;
	_find = new W(() => this.pageCount, (e) => this._collectPageRuns(e));
	_findActive = !1;
	_highlights = new ue({
		slots: () => this._slots,
		active: () => this._findActive,
		runs: (e) => this._find.pageRuns(e),
		setRuns: (e, t) => this._find.setPageRuns(e, t),
		paint: (e, t, n, r) => U(t.highlightLayer, n, this._find.pageHighlights(e), this._pageWidthPx(e), this._pageHeightPx(e), r, this._opts.findHighlightColors),
		reveal: (e) => this.scrollToPage(e),
		unitOf: (e) => e.page
	});
	_findRequestGeneration = 0;
	_showTrackedChanges;
	_currentDate;
	_layoutViewGeneration = 0;
	static fromDocument(t, n, r = {}) {
		let i = d(n);
		return new e(t, {
			...r,
			currentDate: i.currentDate,
			showTrackedChanges: i.showTrackedChanges,
			[Z]: n
		});
	}
	constructor(e, t = {}) {
		if (e.tagName === "CANVAS") throw Error("DocxScrollViewer takes a container element (e.g. a <div>), not a <canvas> — the viewer creates and manages its own canvases. Pass a block container; for the single-page canvas API use DocxViewer.");
		this._container = e, this._opts = t, this._errorRouter = new C("DocxScrollViewer", t.onError), this._showTrackedChanges = t.showTrackedChanges === !0, t.modelSources !== void 0 && (this._requestedShowTrackedChanges = t.showTrackedChanges), this._currentDate = t.currentDate, this._pageShadow = t.pageShadow ?? "0 1px 3px rgba(0,0,0,0.2)";
		let n = t[Z];
		this._borrowed = n !== void 0, n ? (this._documentOwner = new T("DocxScrollViewer", n, !1), this._mode = E("DocxScrollViewer", t.mode, n)) : (this._documentOwner = new T("DocxScrollViewer"), this._mode = E("DocxScrollViewer", t.mode, void 0)), this._shell = new F(e, {
			background: t.background,
			comments: !!t.comments,
			onScroll: () => this._onScroll(),
			onOutsideComment: () => {
				if (this._activeCommentId !== null) {
					this._activeCommentId = null, this._activeCommentPage = null;
					for (let [e, t] of this._slots) this._redrawSlotComments(e, t);
					this._selection.emitChange();
				}
			}
		}), this._commentsEnabled() && ke().then((e) => {
			if (!this._destroyed) {
				this._commentUi = e;
				for (let [e, t] of this._slots) this._redrawSlotComments(e, t);
			}
		}).catch((e) => this._reportRenderError(e)), this._selection.bind(!!t.onSelectionContextChange, !!t.onContextMenu), this._zoom.bind(this._container, this._scrollHost, this._opts.enableZoom !== !1), this._borrowed && (this._layout.bind(n), this.relayout());
	}
	async load(e) {
		await this._loader.load(e);
	}
	get pageCount() {
		return this._doc?.pageCount ?? 0;
	}
	get layoutComplete() {
		return this._doc?.layoutComplete ?? !0;
	}
	async waitUntilLayoutComplete() {
		await this._errorRouter.ownBackgroundLifecycle(async () => {
			await this._doc?.waitUntilLayoutComplete?.();
		});
	}
	_refreshCommentSurface() {
		if (!(!this._commentsEnabled() || this._slots.size === 0)) {
			this._syncSpacerWidth();
			for (let [e, t] of this._slots) this._redrawSlotComments(e, t);
		}
	}
	_pageWidthPx(e) {
		return this._doc.pageSize(e).widthPt * m * this._scale;
	}
	_pageHeightPx(e) {
		return this._doc.pageSize(e).heightPt * m * this._scale;
	}
	_hasDisplayableComments() {
		if (!this._commentsEnabled()) return !1;
		let e = this._doc;
		if (!e) return !1;
		let t = e.commentAnchorRanges();
		if (this._commentAnchorRangesForMargin !== t && (this._commentAnchorRangesForMargin = t, this._commentAnchorIds = new Set(t.map((e) => e.commentId))), this._commentAnchorIds.size === 0) return !1;
		let n = this._commentsOptions()?.includeResolved === !0;
		return e.comments.some((e) => this._commentAnchorIds.has(e.id) && e.parentId === void 0 && (n || e.resolved !== !0));
	}
	_commentsEnabled() {
		return this._opts.comments === !0 || typeof this._opts.comments == "object";
	}
	_commentsOptions() {
		return typeof this._opts.comments == "object" ? this._opts.comments : void 0;
	}
	_widestPageWidthPt() {
		if (!this._doc) return 0;
		let e = 0, t = this._layout.presentedPageCount || this._doc.pageCount;
		for (let n = 0; n < t; n++) {
			let t = this._doc.pageSize(n).widthPt;
			t > e && (e = t);
		}
		return e;
	}
	_baseScale() {
		if (!this._doc || this._doc.pageCount === 0) return 0;
		let e = this._viewport.fitWidth();
		if (e <= 0) return 0;
		let t = this._widestPageWidthPt();
		return t <= 0 ? 0 : e / (t * m);
	}
	relayout() {
		this._relayout();
	}
	_relayout(e) {
		if (this._doc) {
			if (this._doc.layoutComplete !== !1 && (this._layout.presentedPageCount = this._doc.pageCount), this._scaleEstablished) {
				let e = this._baseScale();
				if (e > 0 && e !== this._prevBase) {
					let t = this._prevBase > 0 ? this._scale / this._prevBase : 1;
					this._prevBase = e, this.setScale(e * t);
				}
			} else if (!this._zoom.establishBase()) return;
			this._recomputeHeights(), this._syncSpacer(), this._mountVisible(e);
			for (let [e, t] of this._slots) t.renderedPage === e && t.renderedScale >= 0 && this._redrawSlotComments(e, t);
		}
	}
	_recomputeHeights() {
		let e = Math.min(this._layout.presentedPageCount, this._doc.pageCount), t = Array(e);
		for (let n = 0; n < e; n++) t[n] = this._pageHeightPx(n);
		this._heights = t, this._scrollGeometry = ce(t, this._viewport.gap(), this._viewport.verticalPadding());
	}
	_pageIndexAtOffset(e, t) {
		let { offsets: n } = e, r = 0, i = n.length - 1, a = 0;
		for (; r <= i;) {
			let e = r + i >> 1;
			n[e] <= t ? (a = e, r = e + 1) : i = e - 1;
		}
		return a;
	}
	_range() {
		return le(this._scrollGeometry, this._scrollHost.scrollTop, this._scrollHost.clientHeight, this._viewport.overscan());
	}
	_syncSpacer() {
		this._scroller.syncSpacer();
	}
	_syncSpacerWidth() {
		let { left: e, right: t } = this._viewport.horizontalPadding(), n = 0;
		for (let e = 0; e < this._heights.length; e++) {
			let t = this._pageWidthPx(e);
			t > n && (n = t);
		}
		this._commentMargin.syncSpacerWidth(n, e, t);
	}
	_onScroll() {
		!this._doc || !this._scaleEstablished || this._mountVisible(void 0, !1);
	}
	_mountVisible(e, t = !0) {
		this._scroller.mount(e, t);
	}
	_emitVisiblePageChange(e) {
		this._doc && this._visibleEvents.publish(e, this._doc.pageCount, this.layoutComplete);
	}
	_createSlot() {
		let { wrapper: e, canvas: t, textLayer: n, highlightLayer: r } = O(this._scrollHost, this._opts.enableTextSelection === !0, this._pageShadow), { markerLayer: i, margin: a, decorationLayer: o } = j(e, this._commentsEnabled(), this._commentsOptions()?.cards !== !1, this._commentsOptions()?.connectors !== void 0, (e) => this._commentMargin.syncMargin(e)), s = ne(e, this._opts.enableElementSelection === !0);
		return this._scrollHost.appendChild(e), {
			wrapper: e,
			canvas: t,
			textLayer: n,
			highlightLayer: r,
			elementLayer: s,
			commentTintLayer: i,
			commentMargin: a,
			commentDecorationLayer: o,
			commentRuns: Object.freeze([]),
			commentGeometry: null,
			renderedPage: -1,
			renderedScale: -1,
			dispatcher: new y(t, this._mode === "worker")
		};
	}
	_recycleSlot(e, t) {
		this._scroller.recycleSlot(e, t);
	}
	_resetSlot(e, t) {
		t.dispatcher.destroy(), this._destroyed || (t.dispatcher = new y(t.canvas, this._mode === "worker")), this._layers.reset(t), t.commentRuns = Object.freeze([]), t.commentGeometry = null, t.renderedPage = -1, t.renderedScale = -1, t.wrapper.remove();
	}
	_positionSlot(e, t, n) {
		this._layers.position(t, e, n.offsets[t], this._pageWidthPx(t), this._pageHeightPx(t), this._scrollHost.clientWidth, this._viewport.horizontalPadding().left);
	}
	_renderSlot(e, t, n = !0) {
		if (!this._doc || t.renderedPage === e) return null;
		t.renderedPage = e;
		let r = this._viewport.dpr(), i = this._pageWidthPx(e);
		this._renderEpoch;
		let a = this._scale, o = t.dispatcher, s = o.begin();
		return this._mode === "worker" ? this._renderSlotBitmap(e, t, i, r, a, o, s, n) : this._main.render(e, t, i, r, 0, o, s, n);
	}
	_hyperlinkHandler() {
		return this._opts.enableHyperlinks === !1 ? void 0 : this._opts.onHyperlinkClick || ((e) => {
			if (e.kind === "external") {
				I(e.url);
				return;
			}
			let t = this._doc;
			if (!t) return;
			let n = ++this._internalHyperlinkGeneration;
			this._navigateInternalHyperlink(t, e.ref, n).catch((e) => this._reportRenderError(e));
		});
	}
	async _navigateInternalHyperlink(e, t, n) {
		if (e.layoutComplete || await e.waitUntilLayoutComplete(), this._destroyed || this._doc !== e || n !== this._internalHyperlinkGeneration) return;
		let r = e.getBookmarkPage(t);
		r !== void 0 && this.scrollToPage(r);
	}
	_canvasCssPx(e) {
		return {
			width: parseFloat(e.style.width) || e.width,
			height: parseFloat(e.style.height) || e.height
		};
	}
	_commitRenderedRuns(e, t, n, r, i, a) {
		if (t.textLayer && (a && this._clearTextLayerPreview(t.textLayer), this._opts.enableTextSelection)) {
			let { width: i, height: a } = this._canvasCssPx(r);
			H(t.textLayer, n, i, a, this._hyperlinkHandler(), (e) => this._highlights.measure(e), e);
		}
		i && this._highlights.refreshRuns(e, n), this._commitCommentRuns(e, t, n), this._highlights.redrawSlot(e, t);
	}
	_reportRenderError(e) {
		this._errorRouter.report(e);
	}
	_renderSlotBitmap(e, t, n, r, i, a = t.dispatcher, o = a.begin(), s = !0) {
		return this._bitmap.render(e, t, n, r, i, 0, a, o, s);
	}
	setScale(e) {
		this._zoom.setScale(e);
	}
	getScale() {
		return this._zoom.getScale();
	}
	zoomIn() {
		this._zoom.zoomIn();
	}
	zoomOut() {
		this._zoom.zoomOut();
	}
	fitWidth() {
		this._zoom.fit("width");
	}
	fitPage() {
		this._zoom.fit("page");
	}
	_previewVisible() {
		this._scroller.preview();
	}
	_previewSlot(e, t, n) {
		this._positionSlot(e, t, n), this._layers.preview(e, this._pageWidthPx(t), this._pageHeightPx(t), this._scale);
	}
	_clearTextLayerPreview(e) {
		he(e);
	}
	_scheduleSettle() {
		this._scroller.scheduleSettle(150);
	}
	_refreshSlotAtomically(e, t) {
		if (!this._doc) return;
		let n = this._viewport.dpr(), r = this._pageWidthPx(e), i = this._scale;
		if (this._renderEpoch, this._mode === "worker") {
			this._renderSlotBitmap(e, t, r, n, i);
			return;
		}
		this._main.settle(e, t, r, n);
	}
	async setShowTrackedChanges(e) {
		let t = ++this._layoutViewGeneration;
		if (this._pendingLoadAbort) {
			let t = this._pendingRequestedView !== e;
			this._pendingRequestedView = e, t && this._pendingViewChanged?.();
		}
		let n = this._doc;
		if (this._opts.modelSources !== void 0 && (this._requestedShowTrackedChanges = e), this._showTrackedChanges === e) {
			n && await i(n, {
				showTrackedChanges: e,
				currentDate: this._currentDate
			}, this);
			return;
		}
		(!n || await i(n, {
			showTrackedChanges: e,
			currentDate: this._currentDate
		}, this)) && (this._destroyed || t !== this._layoutViewGeneration || n !== this._doc || (this._showTrackedChanges = e, this._opts.modelSources !== void 0 && (this._requestedShowTrackedChanges = e), this._find.invalidate(), this._layout.apply({
			pageCount: n?.pageCount ?? 0,
			exact: !0,
			complete: n?.layoutComplete !== !1
		})));
	}
	scrollToPage(e, t) {
		this._navigation.scrollToUnit(e, t);
	}
	_scrollToPageTarget(e, t, n) {
		this._navigation.scrollToPoint(e, t.x + t.w / 2, t.y + t.h / 2, n);
	}
	async goToComment(e, t) {
		return this._commentNavigation.goToComment(e, t);
	}
	async findText(e, t = {}) {
		let n = S(e);
		if (!this._doc) return [];
		let r = ++this._findRequestGeneration;
		if (this._doc.layoutComplete === !1) {
			let e = this._doc;
			if (await this._errorRouter.ownBackgroundLifecycle(() => e.waitUntilLayoutComplete()), this._destroyed || this._doc !== e || r !== this._findRequestGeneration) return [];
		}
		this._findActive = n.length > 0;
		let i = await this._errorRouter.ownAwaitable(() => this._find.find(e, t));
		return this._highlights.redrawAll(), i;
	}
	async findNext() {
		return this._highlights.activate(this._find.next());
	}
	async findPrev() {
		return this._highlights.activate(this._find.prev());
	}
	clearFind() {
		this._findRequestGeneration++, this._findActive = !1, this._find.invalidate(), this._highlights.redrawAll();
	}
	async _collectPageRuns(e) {
		return this._doc ? this._doc.collectPageRuns(e, {
			width: this._pageWidthPx(e),
			currentDate: this._currentDate,
			...this._showTrackedChanges ? { showTrackedChanges: !0 } : {}
		}) : [];
	}
	_commitCommentRuns(e, t, n) {
		t.commentTintLayer && (t.commentRuns = Object.freeze([...n]), this._commentNavigation.commitRuns(e, t.commentRuns), t.commentTintLayer.style.transform = "", t.commentTintLayer.style.transformOrigin = "", this._redrawSlotComments(e, t), t.commentTintLayer.style.visibility = "", t.commentMargin && (t.commentMargin.style.visibility = ""), t.commentDecorationLayer && (t.commentDecorationLayer.style.visibility = ""));
	}
	_redrawSlotComments(e, t) {
		if (!this._doc || !t.commentTintLayer) return;
		this._commentMargin.syncMargin(t.commentMargin);
		let n = this._commentUi;
		if (!n) {
			t.commentTintLayer.replaceChildren(), t.commentMargin?.replaceChildren(), t.commentDecorationLayer?.replaceChildren(), t.commentGeometry = null;
			return;
		}
		t.commentGeometry = n.buildDocxCommentMargin(t.commentTintLayer, t.commentMargin, t.commentRuns, {
			comments: this._doc.comments,
			anchors: this._doc.commentAnchorRanges()
		}, this._pageWidthPx(e), this._pageHeightPx(e), this._activeCommentId, (t, n) => {
			let r = n ? t : this._activeCommentId === t ? null : this._activeCommentId;
			if (r !== this._activeCommentId) {
				this._activeCommentId = r, this._activeCommentPage = r ? e : null, this._selection.clearElementContext();
				for (let [e, t] of this._slots) this._redrawSlotComments(e, t);
				this._selection.emitChange();
			}
		}, this._commentMargin.zoom(), 280, this._commentsOptions()?.markers !== !1, this._commentsOptions()?.includeResolved === !0, t.commentDecorationLayer ? () => this._commentOverlay.schedule(e, t, !1) : void 0, t.commentDecorationLayer ? () => this._commentOverlay.schedule(e, t, !0) : void 0), this._commentOverlay.drawConnectors(e, t);
	}
	_onResize() {
		this._zoom.onResize();
	}
	get topVisiblePage() {
		return this._scroller.lastRange?.topIndex ?? 0;
	}
	mountedPageIndicesForTest() {
		return [...this._slots.keys()];
	}
	scaleForTest() {
		return this._scale;
	}
	baseScaleForTest() {
		return this._baseScale();
	}
	renderEpochForTest() {
		return this._renderEpoch;
	}
	resizeForTest() {
		this._onResize();
	}
	contentAtViewportYForTest(e) {
		let t = this._navigation.contentAtViewportY(e);
		return {
			page: t.unit,
			frac: t.frac
		};
	}
	viewportYOfForTest(e, t) {
		return this._navigation.viewportYOf(e, t);
	}
	async getResourceMetrics() {
		if (!this._doc) throw Error("Document not loaded");
		return await this._doc.getResourceMetrics();
	}
	getSelectionContext(e = {}) {
		if (this._destroyed) throw Error("DocxScrollViewer is destroyed");
		return (this._doc && this._activeCommentId !== null && this._activeCommentPage !== null ? xe(this._doc.comments, this._doc.commentAnchorRanges(), this._activeCommentId, this._activeCommentPage, e) : null) || ((this._opts.enableTextSelection ? q(this._wrapper, this._wrapper.ownerDocument?.getSelection?.() ?? null, e) : null) ?? (this._selection.elementContext ? s(this._selection.elementContext, e.maxTextCharacters) : null));
	}
	destroy() {
		this._destroyed || (this._destroyed = !0, this._pendingLoadAbort?.abort(), this._pendingLoadAbort = null, this._pendingViewChanged = null, this._findRequestGeneration++, this._errorRouter.close(), this._layout.unbind(), this._layoutViewGeneration++, this._commentNavigation.reset(), this._find.invalidate(), this._findActive = !1, this._selection.destroy(), this._highlights.destroy(), this._commentOverlay.destroy(), this._selection.clearElementContext(), this._scroller.destroy(), this._zoom.destroy(), this._commentMargin.destroy(), this._documentOwner.close(), this._shell.destroy());
	}
};
//#endregion
//#region packages/docx/src/types.ts
function $(e) {
	let t = [];
	for (let n of e.content) {
		if (n.type !== "paragraph") continue;
		let e = "";
		for (let t of n.runs) t.type === "text" && !t.noteRef && (e += t.text);
		e = e.trim(), e && t.push(e);
	}
	return t.join(" ");
}
//#endregion
//#region src/docx.ts
var Ae = /* @__PURE__ */ e({
	DocxDocument: () => f,
	DocxScrollViewer: () => Q,
	DocxViewer: () => X,
	OoxmlDecodedImageLimitError: () => g,
	OoxmlError: () => n,
	OoxmlResourceLimitError: () => t,
	TiffDecodeError: () => se,
	autoResize: () => _,
	buildDocxHighlightLayer: () => U,
	buildDocxTextLayer: () => H,
	isOoxmlDecodedImageLimitError: () => h,
	isTiffDecodeError: () => oe,
	noteText: () => $,
	openExternalHyperlink: () => I,
	readDocxTextSelectionContext: () => q,
	resolveCommentAnchorRuns: () => z,
	resolveDocxCommentThreads: () => be,
	resolveRevisionAnchorRuns: () => p
});
//#endregion
export { q as a, X as i, $ as n, U as o, Q as r, H as s, Ae as t };
