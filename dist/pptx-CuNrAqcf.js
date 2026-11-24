import { t as e } from "./slide-pull-client-EYGi51IN.js";
import { n as t } from "./ooxml-error-DbICW35n.js";
import { m as n } from "./resource-policy.generated-D_HlV2Rm.js";
import { n as r } from "./cjk-fallback-CxqXJu32.js";
import { i, l as a } from "./duotone-bitmap-by-path-Ci-q8taI.js";
import { n as o } from "./abort-JztSoyw2.js";
import { r as s, t as c } from "./error-wire-DcmmIbXu.js";
import { t as l } from "./bounded-raw-part-cache-TU72wntZ.js";
import { a as u, i as d, n as f, t as p } from "./wasm-loader-aCVZKhJM.js";
import { i as m, n as h, r as g } from "./session-CvGXtgO4.js";
import { t as _ } from "./in-process-pull-transport-BPJ7M0uC.js";
import { n as v } from "./pptx-parsed-slides-BMGr4khe.js";
var y = "PPTX presentation session was aborted", b = p(() => f(import.meta.url, "pptx_parser_bg.wasm", "@silurus/ooxml-pptx/wasm-binary"));
async function x(e, t = {}) {
	return S(e, t);
}
async function S(e, t = {}) {
	if (t.legacyPpt !== void 0 || t.odp !== void 0) {
		let { openPptxSource: n } = await import("./pptx-model-source-DaQYDIcM.js");
		return n(e, t, b);
	}
	let n = r(t.cjkFallback), i = await h(d(e), b(), t);
	return new C(i.closeArchive, i.archive, i.bootstrap, i.metrics, t.signal, n);
}
var C = class {
	closeArchive;
	archive;
	bootstrap;
	metrics;
	signal;
	cjkFallback;
	parsedTextChain;
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
	rawParts = new l({
		maxEntries: 64,
		maxBytes: n
	});
	constructor(t, n, r, i, a, o, s = !0) {
		this.closeArchive = t, this.archive = n, this.bootstrap = r, this.metrics = i, this.signal = a, this.cjkFallback = o, this.parsedTextChain = s, this.slideCount = r.slideCount, this.slideWidth = r.slideWidth, this.slideHeight = r.slideHeight, this.slidePull = new g(() => this.archive), this.transport = new _((e, t) => this.slidePull.dispatchSafely(e, t), () => void 0), this.slideClient = new e({
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
		return this.assertOpen(), this.getPartInternal(e, t, (t) => t.extract_image(e)).catch((e) => this.failPartRead(e));
	}
	async getMedia(e, t = "application/octet-stream") {
		return this.assertOpen(), this.getPartInternal(e, t, (t) => t.extract_media(e)).catch((e) => this.failPartRead(e));
	}
	async renderSlide(e, t, n) {
		return this.assertOpen(), this.enqueueRender(async () => {
			o(this.signal, y);
			let { renderSlideNode: r } = await import("./render-DebhM3GH.js").then((e) => e.i);
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
			}), o(this.signal, y);
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
				o(this.signal, y);
				let t = await this.slideClient.load(e);
				if (!t) throw Error(`PPTX slide ${e} was not decoded`);
				this.usage ??= await this.slidePull.run(() => m((e) => e(this.archive))), this.metrics.observeUsage(this.usage), this.consumedSlides = e + 1, this.parsedTextChain && v(t), yield t;
			}
		} catch (t) {
			throw e = s(t) ?? t, this.metrics.fail(e), e;
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
			e = s(t) ?? t;
		}
		this.transport.terminate(), this.rawParts.clear();
		try {
			this.closeArchive();
		} catch (t) {
			e ??= s(t) ?? t;
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
			o(this.signal, y);
			let e = n(this.archive);
			return this.refreshResourceUsage(), new Blob([e], { type: t });
		});
	}
	refreshResourceUsage() {
		try {
			this.usage = c(this.archive.resource_usage()), this.metrics.observeUsage(this.usage);
		} catch {}
		return this.usage;
	}
	assertOpen() {
		if (this.closed) throw Error("PPTX presentation session is closed");
		if (this.resourceFailure) throw this.resourceFailure;
	}
	failPartRead(e) {
		let n = s(e) ?? e;
		throw n instanceof t && this.failOperation(n), n;
	}
	failOperation(e) {
		let n = s(e) ?? e;
		throw n instanceof t && (this.resourceFailure ??= n), this.metrics.fail(n), n;
	}
};
async function w(e, t = {}) {
	return u(() => S(e, t), async (e) => {
		let t = [];
		for await (let n of e.slides()) t.push(n);
		return e.materialize(t);
	});
}
export { w as n, x as r, C as t };
