import { s as e } from "./error-wire-DcmmIbXu.js";
import { c as t, l as n, s as r, u as i } from "./resource-debug-BMgDiKq1.js";
function a(e) {
	return n(e) ? new r(`WASM parser trapped and was recycled: ${e instanceof Error ? e.message : String(e)}`) : null;
}
var o = class {
	realm;
	live = /* @__PURE__ */ new Set();
	constructor(e, t) {
		this.realm = new i(() => e.initSync({ module: t }), () => e.reinit({ module_or_path: t }), a), this.realm.onPoison((e) => {
			for (let t of this.live) t.poison(e);
			this.live.clear();
		});
	}
	async open(t, n) {
		for (;;) {
			this.throwIfOpenAborted(n), await this.awaitReadyOrAbort(n), this.throwIfOpenAborted(n);
			let r = this.realm.tryRunReady(() => e(t));
			if (!r.current) continue;
			let i = new c(this, r.value, r.generation);
			if (this.live.add(i), n?.signal?.aborted) throw i.close(n.disposeOnAbort), n.abortError?.() ?? new DOMException("The operation was aborted", "AbortError");
			return i;
		}
	}
	async awaitReadyOrAbort(e) {
		let t = e?.signal;
		if (!t) {
			await this.realm.ensureReady();
			return;
		}
		this.throwIfOpenAborted(e), await new Promise((n, r) => {
			let i = () => r(e?.abortError?.() ?? new DOMException("The operation was aborted", "AbortError"));
			t.addEventListener("abort", i, { once: !0 }), this.realm.ensureReady().then(n, r).finally(() => {
				t.removeEventListener("abort", i);
			});
		});
	}
	throwIfOpenAborted(e) {
		if (e?.signal?.aborted) throw e.abortError?.() ?? new DOMException("The operation was aborted", "AbortError");
	}
	async ensureReady() {
		await this.realm.ensureReady();
	}
	run(t, n) {
		let r = t.requireLive(this.realm);
		return e(() => this.realm.run(() => n(r)));
	}
	close(e, t) {
		let n = e.detachForClose();
		this.live.delete(e), n && this.realm.run(() => t(n));
	}
};
function s(e, t) {
	let n, r;
	return (i) => {
		if (!r) n = i, r = new o(e, i);
		else if (n !== i) throw Error(`${t} runtime was already initialized with another WebAssembly.Module`);
		return r;
	};
}
var c = class {
	host;
	generation;
	archive;
	failure;
	proxy;
	constructor(e, t, n) {
		this.host = e, this.generation = n, this.archive = t, this.proxy = new Proxy(t, { get: (e, t) => {
			let n = this.host.run(this, (e) => Reflect.get(e, t, e));
			return typeof n == "function" ? (...e) => this.host.run(this, (n) => {
				let r = Reflect.get(n, t, n);
				return Reflect.apply(r, n, e);
			}) : n;
		} });
	}
	run(e) {
		return this.host.run(this, e);
	}
	close(e) {
		this.host.close(this, e);
	}
	requireLive(e) {
		if (this.failure) throw this.failure;
		if (e.assertCurrent(this.generation), !this.archive) throw Error("WASM archive session belongs to a discarded runtime generation");
		return this.archive;
	}
	detachForClose() {
		let e = this.archive;
		return this.archive = void 0, this.failure ? void 0 : e;
	}
	poison(e) {
		let n = this.archive;
		this.failure = e, this.archive = void 0, t(n);
	}
};
export { s as t };
