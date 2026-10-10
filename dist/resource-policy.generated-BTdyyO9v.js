//#region packages/core/src/errors/ooxml-error.ts
var e = class e extends Error {
	code;
	constructor(t, n) {
		super(n), this.name = "OoxmlError", this.code = t, Object.setPrototypeOf(this, e.prototype);
	}
}, t = class e extends Error {
	code = "ooxml-resource-limit";
	details;
	constructor(t, n) {
		super(t), this.name = "OoxmlResourceLimitError";
		let r = n.violation, i = Object.freeze({
			format: r.format,
			operation: r.operation,
			resource: r.resource,
			metric: r.metric,
			...r.part === void 0 ? {} : { part: r.part },
			limit: r.limit,
			observed: r.observed,
			configurable: r.configurable,
			usage: Object.freeze({
				archiveEntryCount: r.usage.archiveEntryCount,
				declaredInflatedBytes: r.usage.declaredInflatedBytes,
				...r.usage.largestInflatedEntryBytes === void 0 ? {} : { largestInflatedEntryBytes: r.usage.largestInflatedEntryBytes },
				distinctInflatedBytes: r.usage.distinctInflatedBytes,
				operationInflatedBytes: r.usage.operationInflatedBytes
			})
		});
		this.details = Object.freeze({
			stage: n.stage,
			violation: i
		}), Object.setPrototypeOf(this, e.prototype);
	}
}, n = 134217728, r = 268435456, i = 4096, a = 2e4, o = 67108864, s = 67108864, c = 67108864, l = 67108864, u = 134217728, d = 134217728, f = 1e5, p = 25e4, m = 33554432, h = 67108864, g = 2e5, _ = 5e5, v = 67108864, y = 134217728, b = 25e4, x = 31457280;
//#endregion
export { t as S, f as _, u as a, r as b, d as c, v as d, y as f, h as g, m as h, x as i, b as l, p as m, o as n, l as o, g as p, s as r, c as s, a as t, _ as u, i as v, e as x, n as y };
