import { i as e } from "./document-content-BYFtqT7U.js";
import { C as t, T as n, a as r, i, l as a, r as o } from "./document-pull-client-DIeWNcQH.js";
import { n as s } from "./cjk-fallback-CxqXJu32.js";
import { i as c, r as l } from "./error-wire-DcmmIbXu.js";
import { a as u, r as d } from "./wasm-loader-aCVZKhJM.js";
import { r as f } from "./document-pull-worker-DOEUdHOV.js";
import { i as p, t as m } from "./docx-D8EvTkr_.js";
import { t as h } from "./model-source-BG04h_7Q.js";
var g = class extends m {
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
async function _(e, i, c) {
	let u = s(i.cjkFallback), { acquired: f, viewDefaults: p } = await y(e, i, c, o);
	try {
		if (i.signal?.aborted) {
			let e = /* @__PURE__ */ Error("DOCX document session was aborted");
			throw e.name = "AbortError", e;
		}
		let e = i.factory.createCanvas(1, 1), o = a(f.result, {
			cjkFallback: u,
			measureContext: e.getContext("2d"),
			createCanvas: (e, t) => i.factory.createCanvas(e, t),
			allowFootnoteContinuation: i.allowFootnoteContinuation !== !1
		}), s = d(i.currentDate), c = t(f.result, i.signal);
		c && await c;
		let l = r(f.result, o, s), h = p.showTrackedChanges === !0, _ = h ? l.layoutVariants.layoutFor(n(s, s, !0)) : l.layoutVariants.defaultLayout, v = new (h ? g : m)(f.closeArchive, f.archive, f.result, o, _, i.factory, s, f.usage, f.metrics, i.signal);
		return f.metrics.observeUsage(v.resourceUsage), f.metrics.checkpoint("pagination ready"), v;
	} catch (e) {
		try {
			f.closeArchive();
		} catch {}
		let t = l(e) ?? e;
		throw f.metrics.fail(t), t;
	}
}
async function v(t, n, r) {
	return u(async () => {
		let { acquired: e } = await y(t, n, r, i), a = !1;
		return {
			acquired: e,
			markSucceeded: () => {
				a = !0;
			},
			close: async () => {
				try {
					e.closeArchive(), a && e.metrics.succeed({ documents: 1 });
				} catch (t) {
					throw e.metrics.fail(t), t;
				}
			}
		};
	}, async ({ acquired: t, markSucceeded: n }) => {
		try {
			let r = e(t.result);
			return t.metrics.checkpoint("document materialized", t.usage), n(), r;
		} catch (e) {
			throw t.metrics.fail(e), e;
		}
	});
}
async function y(e, t, n, r) {
	let { acquireDocxSessionFromArchive: i, validateDocxModelSourceArchive: a, validateDocxModelSourceViewDefaults: o } = await import("./model-source-session-Cd5WH87s.js"), s = await h(e, "docx", {
		...t,
		sources: [t.legacyDoc, t.odt]
	}, a, (e) => c(e) ?? f(e));
	if (s.kind === "ooxml") return {
		acquired: await p(s.bytes, n(), t, r),
		viewDefaults: {}
	};
	let l;
	try {
		l = o(s.opened.viewDefaults);
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
		viewDefaults: l
	};
}
export { v as materializeDocxSource, _ as openDocxSource };
