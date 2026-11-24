import { t as e } from "./cfb-guard-reswPjey.js";
import { i as t } from "./error-wire-DcmmIbXu.js";
import { i as n } from "./resource-debug-BMgDiKq1.js";
import { a as r, n as i, r as a, s as o } from "./model-source-BwpDCGYU.js";
async function s(s, l, u, d, f = (e) => t(e) ?? e) {
	let p = s instanceof Uint8Array ? s : new Uint8Array(s), m = o(a(...u.sources ?? []), l, p);
	if (!m) return {
		kind: "ooxml",
		bytes: await e(p, u.password)
	};
	let h = i(m, l);
	try {
		let e = await r(h.module, p, d, u.signal, h.transfer, {
			resourcePolicy: n(u).policy,
			...u.worksheetPolicy === void 0 ? {} : { worksheetPolicy: u.worksheetPolicy }
		});
		try {
			h.release();
		} catch (t) {
			try {
				e.close();
			} catch {}
			throw t;
		}
		return {
			kind: "model-source",
			opened: {
				...e,
				archive: c(e.archive, f),
				close() {
					try {
						e.close();
					} catch (e) {
						throw f(e);
					}
				}
			},
			sourceByteLength: p.byteLength
		};
	} catch (e) {
		throw f(e);
	} finally {
		h.release();
	}
}
function c(e, t) {
	let n = e;
	return new Proxy(Object.create(n), { get(e, r) {
		try {
			let e = Reflect.get(n, r, n);
			return typeof e == "function" ? (...r) => {
				try {
					return Reflect.apply(e, n, r);
				} catch (e) {
					throw t(e);
				}
			} : e;
		} catch (e) {
			throw t(e);
		}
	} });
}
export { s as t };
