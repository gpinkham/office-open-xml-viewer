import { E as e, a as t, f as n, i as r, l as i, r as a } from "./document-pull-client-B-aENbZ1.js";
import { n as o } from "./cjk-fallback-CtkvGQ-i.js";
import { r as s } from "./error-wire-rJNDxWbL.js";
import { r as c } from "./wasm-loader-CQMAGKwZ.js";
import { i as l, t as u } from "./docx-BAGlOGAX.js";
import { t as d } from "./model-source-BVTa8ePn.js";
//#region packages/node/src/docx-model-source.ts
var f = class extends u {
	constructor(...e) {
		super(...e);
	}
	renderPage(e, t = {}) {
		return super.renderPage(e, {
			...t,
			showTrackedChanges: !0
		});
	}
};
async function p(n, r, c) {
	let l = o(r.cjkFallback), { acquired: d, viewDefaults: p } = await g(n, r, c, a);
	try {
		if (r.signal?.aborted) {
			let e = /* @__PURE__ */ Error("DOCX document session was aborted");
			throw e.name = "AbortError", e;
		}
		let n = r.factory.createCanvas(1, 1), a = i(d.result, {
			cjkFallback: l,
			measureContext: n.getContext("2d"),
			allowFootnoteContinuation: r.allowFootnoteContinuation !== !1
		}), o = h(r.currentDate), s = t(d.result, a, o), c = p.showTrackedChanges === !0, m = c ? s.layoutVariants.layoutFor(e(o, o, !0)) : s.layoutVariants.defaultLayout, g = new (c ? f : u)(d.closeArchive, d.archive, d.result, a, m, r.factory, o, d.usage, d.metrics, r.signal);
		return d.metrics.observeUsage(g.resourceUsage), d.metrics.checkpoint("pagination ready"), g;
	} catch (e) {
		try {
			d.closeArchive();
		} catch {}
		let t = s(e) ?? e;
		throw d.metrics.fail(t), t;
	}
}
async function m(e, t, i) {
	return c(async () => {
		let { acquired: n } = await g(e, t, i, r), a = !1;
		return {
			acquired: n,
			markSucceeded: () => {
				a = !0;
			},
			close: async () => {
				try {
					n.closeArchive(), a && n.metrics.succeed({ documents: 1 });
				} catch (e) {
					throw n.metrics.fail(e), e;
				}
			}
		};
	}, async ({ acquired: e, markSucceeded: t }) => {
		try {
			let r = n(e.result);
			return e.metrics.checkpoint("document materialized", e.usage), t(), r;
		} catch (t) {
			throw e.metrics.fail(t), t;
		}
	});
}
function h(e) {
	let t = e instanceof Date ? e.getTime() : e ?? Date.now();
	if (!Number.isFinite(t)) throw RangeError("currentDate must resolve to finite epoch milliseconds");
	return t;
}
async function g(e, t, n, r) {
	let { acquireDocxSessionFromArchive: i, validateDocxModelSourceArchive: a, validateDocxModelSourceViewDefaults: o } = await import("./model-source-session-IDdPa9So.js"), s = await d(e, "docx", t, a);
	if (s.kind === "ooxml") return {
		acquired: await l(s.bytes, n(), t, r),
		viewDefaults: {}
	};
	let c;
	try {
		c = o(s.opened.viewDefaults);
	} catch (e) {
		try {
			s.opened.close();
		} catch {}
		throw e;
	}
	return {
		acquired: await i({
			archive: s.opened.archive,
			sourceByteLength: s.sourceByteLength,
			closeArchive: s.opened.close
		}, t, r),
		viewDefaults: c
	};
}
//#endregion
export { m as materializeDocxSource, p as openDocxSource };
