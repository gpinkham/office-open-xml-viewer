import { $ as e, X as t, et as n, nt as r } from "./office-auto-line-Chy1gU-T.js";
//#region packages/core/src/fonts/substitute-script.ts
var i = /^\p{Cf}$/u, a = /^\s$/u, o = /^\p{M}$/u, s = /^\p{Script_Extensions=Arabic}$/u, c = /^(?=\p{Script=Arabic})\p{L}$/u;
function l(e, t) {
	for (let n of t) if (!(a.test(n) || i.test(n))) switch (e) {
		case "arabic": return c.test(n) ? "proof" : s.test(n) ? o.test(n) ? "proof" : "extension" : o.test(n) ? "neutral" : "other";
	}
	return "neutral";
}
function u(e, n, r) {
	let i = [...new Set([
		0,
		...t(n),
		n.length
	])].sort((e, t) => e - t), a = i.slice(0, -1).map((t, a) => {
		let o = i[a + 1], s = l(e, n.slice(t, o));
		return {
			start: t,
			end: o,
			cls: s !== "neutral" && s !== "other" && r && !r(t, o) ? "other" : s
		};
	}), o = [], s = 0;
	for (; s < a.length;) {
		if (a[s].cls === "other") {
			o.push({
				...a[s],
				inScope: !1
			}), s += 1;
			continue;
		}
		let e = s;
		for (; e < a.length && a[e].cls !== "other";) e += 1;
		let t = a.slice(s, e).some((e) => e.cls === "proof"), n = !1;
		for (let r = s; r < e; r += 1) {
			let e = a[r], i = t && (e.cls === "neutral" ? n : !0);
			o.push({
				...e,
				inScope: i
			}), n = i;
		}
		s = e;
	}
	return o;
}
function d(e, t, n) {
	let r = u(e, t), i = r.some((e) => e.cls === "proof");
	return n === "any" ? i : i && r.every((e) => e.cls !== "other");
}
function f(e, t, n) {
	return !e?.script || d(e.script, t, n);
}
//#endregion
//#region packages/core/src/draw/double-border.ts
function p(e, t) {
	let n = Math.max(1, Math.round(e * t / 3)), r = Math.max(1, Math.round(e * t / 3));
	return {
		railDev: n,
		gapDev: r,
		spanDev: 2 * n + r
	};
}
function m(e, t, n, r, i, a, o) {
	let { railDev: s, gapDev: c, spanDev: l } = p(a, o);
	if (n === i) {
		let i = Math.round(n * o - l / 2);
		e.fillRect(t, i / o, r - t, s / o), e.fillRect(t, (i + s + c) / o, r - t, s / o);
	} else {
		let r = Math.round(t * o - l / 2);
		e.fillRect(r / o, n, s / o, i - n), e.fillRect((r + s + c) / o, n, s / o, i - n);
	}
}
//#endregion
//#region packages/core/src/text/line-gaps.ts
var h = (e) => e === 32 || e === 12288;
function g(i, a = {}) {
	let o = a.prefix ? { ...a.prefix } : {
		hasContent: !1,
		pendingWidth: 0,
		pendingCount: 0,
		pendingLastWidth: 0,
		naturalGapSum: 0,
		gapCount: 0
	}, s = [], c = [], l = a.collect !== !1, u = a.segmentOffset ?? 0, d = a.lastDrawnSi ?? i.length - 1, f = a.isWhitespace ?? h, p = a.isGapChar ?? r, m = (e) => a.gapWidth?.(e.si, e.off, e.cp ?? 0) ?? 1, g = (e, t = "space") => ({
		kind: t,
		codePoint: e.cp,
		segIndex: e.si,
		cpOffset: e.off,
		naturalPx: m(e),
		trailing: e.off === e.len - 1
	}), _ = (r) => {
		let i = o.last, u = (e) => e?.cp !== void 0 && e.cp !== 9;
		if (r.ws) {
			o.hasContent && r.si !== d && (o.pendingLastWidth = m(r), o.pendingWidth += o.pendingLastWidth, o.pendingCount += 1, l && c.push(g(r)));
			return;
		}
		if (o.pendingCount > 0) {
			if (a.atomicSpaceGaps && r.cp !== void 0 && !t(` ${String.fromCodePoint(r.cp)}`).includes(1) && (o.pendingWidth -= o.pendingLastWidth, --o.pendingCount, l && c.pop()), (!a.textCellSpaceGaps || u(i) && u(r)) && (o.naturalGapSum += o.pendingWidth, o.gapCount += o.pendingCount, l)) for (let e of c) s.push(e);
			o.pendingWidth = 0, o.pendingCount = 0, o.pendingLastWidth = 0, c = [];
		} else i && i.si !== d && o.hasContent && !v && (i.cp !== void 0 && p(i.cp) || r.cp !== void 0 && p(r.cp) || a.seaClusterGaps && i.cp !== void 0 && r.cp !== void 0 && n(i.cp) && n(r.cp) && !e(r.cp)) && (o.naturalGapSum += m(i), o.gapCount += 1, l && s.push(g(i, "boundary")));
		o.hasContent = !0, o.last = r;
	}, v = (a.prefix?.pendingCount ?? 0) > 0;
	for (let e = a.firstContentSi ?? 0; e < i.length; e++) {
		let t = i[e], n = u + e;
		if (t.text === void 0) {
			_({
				si: n,
				off: 0,
				ws: !1,
				len: 1
			}), v = !1;
			continue;
		}
		let r = [...t.text];
		for (let e = 0; e < r.length; e++) {
			let t = r[e].codePointAt(0), i = f(t);
			_({
				si: n,
				off: e,
				cp: t,
				ws: i,
				len: r.length
			}), v = i;
		}
	}
	return {
		gaps: s,
		state: o
	};
}
//#endregion
//#region packages/core/src/text/line-distribute.ts
function _(e, t, n = {}) {
	let r = n.proportional ?? n.gapWidth !== void 0, { gaps: i, state: a } = n.gapModel ?? g(e, n), o = n.unweightedExpansion, s = t > 0 && o?.gaps.some((e) => e.kind === "boundary" || e.codePoint !== 32);
	if (s && o && (i = o.gaps, a = {
		...a,
		naturalGapSum: i.length
	}, t = o.slack, r = !1), (r ? t === 0 : Math.abs(t) <= .5) || !(a.naturalGapSum > 0) || i.length === 0) return null;
	let c = t / a.naturalGapSum;
	t < 0 && (c = Math.max(c, r ? n.minFactor ?? -Infinity : n.minPerGap ?? -Infinity));
	let l = /* @__PURE__ */ new Map();
	for (let e of i) {
		let t = l.get(e.segIndex);
		t || (t = {
			splitBefore: [],
			trailingGap: !1,
			internalStretch: 0,
			...r ? {
				gapDeltas: [],
				trailingDelta: 0
			} : {}
		}, l.set(e.segIndex, t));
		let n = c * (r ? e.naturalPx : 1);
		e.trailing ? (t.trailingGap = !0, r && (t.trailingDelta = n)) : (t.splitBefore.push(e.cpOffset + 1), t.internalStretch += n, t.gapDeltas?.push(n));
	}
	return {
		perGap: r ? 0 : c,
		perSeg: l,
		...s ? { usedUnweightedExpansion: !0 } : {}
	};
}
//#endregion
export { d as a, m as i, g as n, u as o, p as r, f as s, _ as t };
