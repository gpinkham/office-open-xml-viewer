import { t as e } from "./slide-pull-client-BLOpkth-.js";
import { S as t, c as n } from "./resource-policy.generated-BTdyyO9v.js";
import { n as r } from "./cjk-fallback-CtkvGQ-i.js";
import { s as i, u as a } from "./blip-gate-CVWM87j6.js";
import { r as o, t as s } from "./error-wire-rJNDxWbL.js";
import { t as c } from "./bounded-raw-part-cache-zHr9J6Ei.js";
import { n as l, r as u, t as d } from "./wasm-loader-CQMAGKwZ.js";
import { i as f, n as p, r as m } from "./session-DMkiEvh1.js";
import { t as h } from "./in-process-pull-transport-C2_At2ns.js";
//#region packages/node/src/pptx.ts
var g = d(() => l(import.meta.url, "pptx_parser_bg.wasm", "@silurus/ooxml-pptx/wasm-binary"));
async function _(e, t = {}) {
	return v(e, t);
}
async function v(e, t = {}) {
	if (t.modelSources !== void 0) {
		let { openPptxSource: n } = await import("./pptx-model-source-DEYUpXir.js");
		return n(e, t, g);
	}
	let n = r(t.cjkFallback), i = await p(x(e), g(), t);
	return new y(i.closeArchive, i.archive, i.bootstrap, i.metrics, t.signal, n);
}
var y = class {
	slideCount;
	slideWidth;
	slideHeight;
	slidePull;
	slideClient;
	transport;
	started = !1;
	closed = !1;
	closePromise;
	usage;
	consumedSlides = 0;
	resourceFailure;
	renderTail = Promise.resolve();
	fetchImage = (e, t) => this.getPartInternal(e, t, (t) => t.extract_image(e));
	fetchMedia = (e) => this.getPartInternal(e, "application/octet-stream", (t) => t.extract_media(e));
	rawParts = new c({
		maxEntries: 64,
		maxBytes: n
	});
	constructor(t, n, r, i, a, o) {
		this.closeArchive = t, this.archive = n, this.bootstrap = r, this.metrics = i, this.signal = a, this.cjkFallback = o, this.slideCount = r.slideCount, this.slideWidth = r.slideWidth, this.slideHeight = r.slideHeight, this.slidePull = new m(() => this.archive), this.transport = new h((e, t) => this.slidePull.dispatchSafely(e, t), () => void 0), this.slideClient = new e({
			slideCount: this.slideCount,
			transport: this.transport,
			open: async (e, t) => {
				this.slidePull.reserveOpen(t), await this.slidePull.open(e, t);
			},
			onUsage: (e) => {
				this.usage = e, this.metrics.observeUsage(e);
			}
		});
	}
	materialize(e) {
		return {
			slideWidth: this.slideWidth,
			slideHeight: this.slideHeight,
			slides: e,
			defaultTextColor: this.bootstrap.defaultTextColor,
			majorFont: this.bootstrap.majorFont,
			minorFont: this.bootstrap.minorFont,
			...this.bootstrap.hlinkColor ? { hlinkColor: this.bootstrap.hlinkColor } : {},
			...this.bootstrap.folHlinkColor ? { folHlinkColor: this.bootstrap.folHlinkColor } : {}
		};
	}
	get resourceUsage() {
		return this.closed ? this.usage : this.refreshResourceUsage();
	}
	async getImage(e, t) {
		return this.assertOpen(), this.getPartInternal(e, t, (t) => t.extract_image(e)).catch((e) => this.failOperation(e));
	}
	async getMedia(e, t = "application/octet-stream") {
		return this.assertOpen(), this.getPartInternal(e, t, (t) => t.extract_media(e)).catch((e) => this.failOperation(e));
	}
	async renderSlide(e, t, n) {
		return this.assertOpen(), this.enqueueRender(async () => {
			S(this.signal);
			let { renderSlideNode: r } = await import("./render-qLA5Tnsx.js").then((e) => e.i);
			await r(e, {
				slideWidth: this.slideWidth,
				slideHeight: this.slideHeight,
				slides: [t],
				defaultTextColor: this.bootstrap.defaultTextColor,
				majorFont: this.bootstrap.majorFont,
				minorFont: this.bootstrap.minorFont,
				...this.bootstrap.hlinkColor ? { hlinkColor: this.bootstrap.hlinkColor } : {},
				...this.bootstrap.folHlinkColor ? { folHlinkColor: this.bootstrap.folHlinkColor } : {}
			}, 0, {
				...n,
				cjkFallback: this.cjkFallback,
				fetchImage: this.fetchImage,
				fetchMedia: this.fetchMedia
			}), S(this.signal);
		}).catch((e) => this.failOperation(e));
	}
	[Symbol.asyncIterator]() {
		return this.slides();
	}
	async *slides() {
		if (this.closed) throw Error("PPTX presentation session is closed");
		if (this.started) throw Error("PPTX presentation session is one-pass and was already consumed");
		this.started = !0;
		let e;
		try {
			for (let e = 0; e < this.slideCount; e += 1) {
				S(this.signal);
				let t = await this.slideClient.load(e);
				if (!t) throw Error(`PPTX slide ${e} was not decoded`);
				this.usage ??= await this.slidePull.run(() => f((e) => e(this.archive))), this.metrics.observeUsage(this.usage), this.consumedSlides = e + 1, yield t;
			}
		} catch (t) {
			throw e = o(t) ?? t, this.metrics.fail(e), e;
		} finally {
			try {
				await this.close();
			} catch (t) {
				if (e === void 0) throw t;
			}
		}
	}
	close() {
		return this.closePromise ? this.closePromise : (this.closed = !0, this.slideClient.cancelAll(), this.closePromise = this.release(), this.closePromise);
	}
	async release() {
		let e;
		await this.renderTail, a(this.fetchImage), i(this.fetchImage);
		try {
			await this.slidePull.reset();
		} catch (t) {
			e = o(t) ?? t;
		}
		this.transport.terminate(), this.rawParts.clear();
		try {
			this.closeArchive();
		} catch (t) {
			e ??= o(t) ?? t;
		}
		if (e !== void 0) throw this.metrics.fail(e), e;
		this.metrics.checkpoint("presentation session closed"), this.metrics.succeed({ slides: this.consumedSlides });
	}
	enqueueRender(e) {
		let t = this.renderTail.then(e, e);
		return this.renderTail = t.then(() => void 0, () => void 0), t;
	}
	getPartInternal(e, t, n) {
		return this.rawParts.get(e, t, () => {
			S(this.signal);
			let e = n(this.archive);
			return this.refreshResourceUsage(), new Blob([e], { type: t });
		});
	}
	refreshResourceUsage() {
		try {
			this.usage = s(this.archive.resource_usage()), this.metrics.observeUsage(this.usage);
		} catch {}
		return this.usage;
	}
	assertOpen() {
		if (this.closed) throw Error("PPTX presentation session is closed");
		if (this.resourceFailure) throw this.resourceFailure;
	}
	failOperation(e) {
		let n = o(e) ?? e;
		throw n instanceof t && (this.resourceFailure ??= n), this.metrics.fail(n), n;
	}
};
async function b(e, t = {}) {
	return u(() => v(e, t), async (e) => {
		let t = [];
		for await (let n of e.slides()) t.push(n);
		return e.materialize(t);
	});
}
function x(e) {
	return e instanceof Uint8Array ? e : new Uint8Array(e);
}
function S(e) {
	if (!e?.aborted) return;
	let t = /* @__PURE__ */ Error("PPTX presentation session was aborted");
	throw t.name = "AbortError", t;
}
//#endregion
export { b as n, _ as r, y as t };
