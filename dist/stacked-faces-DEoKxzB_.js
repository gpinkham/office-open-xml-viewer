import { J as e, X as t, g as n, h as r, nt as i, q as a, tt as o, v as s, y as c } from "./office-auto-line-Chy1gU-T.js";
//#region packages/core/src/drawingml-text/tab.ts
function l(e, t, n, r, i, a = 0) {
	let o = e.map((e) => e.width), s = (t) => {
		let n = 0;
		for (let r = t; r < e.length && !e[r].isTab; r++) n += o[r];
		return n;
	}, c = n;
	for (let n = 0; n < e.length; n++) {
		if (!e[n].isTab) {
			c += o[n];
			continue;
		}
		let l = null;
		for (let e of t) e.pos > c && (l === null || e.pos < l.pos) && (l = e);
		if (l === null) if (a > 0) l = {
			pos: (Math.floor(c / a) + 1) * a,
			algn: "l"
		};
		else {
			o[n] = i, c += i;
			continue;
		}
		let u = s(n + 1), d = l.algn === "ctr" ? .5 : +(l.algn === "r" || l.algn === "dec"), f = l.pos - u * d;
		f + u > r && (f = r - u), f < c && (f = c), o[n] = f - c, c = f;
	}
	return o;
}
//#endregion
//#region packages/core/src/drawingml-text/break.ts
var u = /^\p{Script_Extensions=Latin}$/u, d = (e) => e.type === "text" && e.text === " ", f = (e) => e.type === "text" && i(e.text.codePointAt(0) ?? 0);
function p(i, a) {
	let p = a.sameStyle ?? ((e, t) => e === t), m = [[]], h = [], g = [-1], _ = [], v = 0;
	for (let e of i) {
		if (h.push(m.length - 1), e.type === "break") {
			_[m.length - 1] = v, m.push([]), g.push(-1), v++;
			continue;
		}
		if (e.type === "object") {
			e.display && m.at(-1).length > 0 && (m.push([]), g.push(-1)), m.at(-1).push({
				type: "object",
				style: e.style,
				run: v,
				width: e.width,
				payload: e.payload
			}), e.display && (m.push([]), g.push(-1)), v++;
			continue;
		}
		let n = [
			0,
			...t(e.text),
			e.text.length
		];
		for (let t = 0; t + 1 < n.length; t++) {
			let r = e.text.slice(n[t], n[t + 1]);
			r === "\n" ? (m.push([]), g.push(v)) : r === "	" ? m.at(-1).push({
				type: "tab",
				style: e.style,
				run: v
			}) : r !== "\r" && m.at(-1).push({
				type: "text",
				text: r,
				style: e.style,
				run: v
			});
		}
		v++;
	}
	let y = [], b = [], x = [], S = new Uint8Array(i.length);
	for (let t = 0; t < m.length; t++) {
		let i = m[t];
		if (b.push(y.length), t === m.length - 1) for (; i.length > 0 && d(i.at(-1));) i.pop();
		let h = i.length, v = /* @__PURE__ */ new Set();
		if (i.some((t) => t.type === "text" && e(t.text))) {
			let e = "", t = [0];
			for (let n of i) e += n.type === "text" ? n.text : "￼", t.push(e.length);
			let n = new Set(o(e, { cjk: !0 }));
			for (let e = 1; e < t.length; e++) n.has(t[e]) && v.add(e);
		}
		let C = a.eastAsianLineBreak !== !1, w = (e) => e === 160 || e === 8239 || e === 8288 || e === 65279, T = (e) => {
			if (e <= 0 || e >= h) return !1;
			let t = i[e - 1], a = i[e];
			if (a.type === "tab") return !0;
			if (t.type === "tab") return !1;
			if (d(t) || d(a) || v.has(e) || t.type === "object" || a.type === "object") return !0;
			let o = [...t.text].at(-1)?.codePointAt(0), s = a.text.codePointAt(0);
			if (o === void 0 || s === void 0) return !1;
			if (o === 8203 || !C && (f(t) || f(a)) && !w(o) && !w(s)) return !0;
			if (r(o, s)) return !1;
			if (f(t) || f(a)) return !0;
			if (e > 1 && (n(o) === "HY" || n(o) === "HH")) {
				let t = i[e - 2];
				if (t.type === "text" && u.test([...t.text].at(-1) ?? "") && u.test([...a.text][0] ?? "")) return !0;
			}
			return !1;
		}, E = new Uint8Array(h + 1);
		for (let e = 1; e < h; e++) E[e] = +!!T(e);
		let D = i[0]?.style, O = h > 0 && i.every((e) => e.type === "text" && p(D, e.style)) ? i.map((e) => e.type === "text" ? e.text : "").join("") : null, k = O === null ? null : new Int32Array(h + 1);
		if (k) for (let e = 0; e < h; e++) {
			let t = i[e];
			k[e + 1] = k[e] + (t.type === "text" ? t.text.length : 0);
		}
		let A = null, j = 0, M = (e) => {
			let t = i[e], n = i[e + 1];
			if (t?.type !== "tab" || !a.tabStops?.length || n?.type !== "text" || !/^[\p{Script_Extensions=Latin}\p{Number}]$/u.test(n.text)) return !1;
			if (A === null) {
				j = $, A = new Uint8Array(h - j + 1), A[h - j] = 1;
				for (let e = h - 1; e >= j; e--) {
					let t = i[e], n = e - j;
					A[n] = A[n + 1] && t.type === "text" && !d(t) && !f(t) ? 1 : 0;
				}
			}
			return A[e + 1 - j] === 1;
		}, N = null, P = 0, F = () => {
			if (N === null) {
				P = $;
				let e = [], t = new Int32Array(h - P + 1);
				for (let n = P; n < h; n++) {
					let r = i[n];
					if (r.type === "text") for (let t of r.text) e.push(t);
					t[n + 1 - P] = e.length;
				}
				N = {
					chars: e,
					offsets: t
				};
			}
			return N;
		}, I = (e, t) => e.type === "text" && t.type === "text" && a.kinsokuAcrossRuns?.(e.style, t.style, e.text, t.text) === !0, L = null, R = 0, z = (e) => {
			if (L === null) {
				R = $, L = new Int32Array(h - $ + 1);
				let e = $ + 1;
				for (let t = $ + 1; t < h; t++) {
					let n = i[t - 1], r = i[t];
					(n.type !== "text" || r.type !== "text" || n.run !== r.run && !I(n, r)) && (e = t), L[t - R] = e;
				}
			}
			return Math.max($ + 1, L[e - R]);
		}, B = (e, t) => {
			if (t.type === "text") {
				let n = e.at(-1);
				if (n?.type === "text" && p(n.style, t.style)) {
					n.text += t.text;
					return;
				}
				e.push({
					type: "text",
					text: t.text,
					style: t.style,
					width: 0
				});
			} else t.type === "tab" ? e.push({
				type: "tab",
				style: t.style,
				width: 0
			}) : e.push({
				type: "object",
				style: t.style,
				width: t.width,
				payload: t.payload
			});
		}, V = (e, t) => {
			let n = 0, r = e.map((t, r) => {
				if (t.type === "text") {
					t.width = a.measureText(t.text, t.style);
					let n = e[r - 1];
					n?.type === "text" && (t.width += a.boundaryAdvance?.(n.style, t.style) ?? 0);
				}
				return t.type === "tab" && (t.width = 0, n = a.measureText(" ", t.style)), {
					isTab: t.type === "tab",
					width: t.width
				};
			});
			if (r.some((e) => e.isTab)) {
				let i = l(r, a.tabStops ?? [], a.tabStartPen?.(t) ?? (t === 0 ? a.firstLineIndent ?? 0 : 0), Infinity, n, a.defaultTabSize ?? 0);
				for (let t = 0; t < e.length; t++) e[t].width = i[t];
			}
			return e.reduce((e, t) => e + t.width, 0);
		}, H = (e, t, n) => {
			if (O !== null && k && D !== void 0) {
				let n = O.slice(k[e], k[t]), r = a.measureText(n, D);
				return {
					segments: [{
						type: "text",
						text: n,
						style: D,
						width: r
					}],
					width: r
				};
			}
			let r = [];
			for (let n = e; n < t; n++) B(r, i[n]);
			return {
				segments: r,
				width: V(r, n)
			};
		}, U = null, W = (e, t) => {
			let n = "";
			for (let r = e; r < t; r++) {
				let e = i[r];
				e.type === "text" && (n += e.text);
			}
			return n;
		}, G = (e) => {
			let t = new Float64Array(Math.ceil(e.length / 32)).fill(Infinity);
			for (let n = 0; n < e.length; n++) {
				let r = Math.floor(n / 32);
				e[n] < t[r] && (t[r] = e[n]);
			}
			return t;
		}, K = () => {
			let e = new Int32Array(h).fill(-1), t = new Int32Array(h).fill(-1), n = new Float64Array(h).fill(NaN), r = new Float64Array(h), o = new Float64Array(h + 1), s = new Float64Array(h + 1), c = new Int32Array(h + 1), l = -1, u, d = null, f = 0, m = 0, g = (e) => {
				for (let n = l; l >= 0 && n < e; n++) t[n] = e;
			};
			for (let t = 0; t < h; t++) {
				let h = i[t];
				if (c[t + 1] = c[t] + +(h.type === "tab"), h.type === "text" && l >= 0 && p(u, h.style) || (g(t), f = s[t], h.type === "text" ? (d = l >= 0 ? a.boundaryAdvance?.(u, h.style) ?? 0 : null, l = t, u = h.style) : (l = -1, u = void 0)), h.type === "text") {
					let i = u;
					if (e[t] = l, t - l <= 8) m = a.measureText(W(l, t + 1), i), n[t] = m;
					else {
						let e = W(t - 8, t);
						r[t] = a.measureText(e + h.text, i) - a.measureText(e, i), m += r[t];
					}
					s[t + 1] = f + (d === null ? m : m + d);
				} else s[t + 1] = f + (h.type === "object" ? h.width : 0);
				o[t + 1] = o[t] + r[t];
			}
			g(h);
			let _ = new Float64Array(h + 1);
			_[h] = s[h];
			for (let e = h - 1; e >= 0; e--) _[e] = Math.min(s[e], _[e + 1]);
			let v = new Float64Array(h + 1).fill(Infinity);
			for (let e = h; e >= 1; e--) i[e - 1].type === "text" && (v[e] = e === t[e - 1] ? o[e] : Math.min(o[e], v[e + 1]));
			let y = new Int32Array(h), b = [];
			for (let e = 0; e < h; e++) {
				let t = i[e];
				if (t.type !== "tab" || (a.defaultTabSize ?? 0) > 0) continue;
				let n = a.measureText(" ", t.style), r = b.indexOf(n);
				r < 0 && (r = b.push(n) - 1), y[e] = r;
			}
			return b.length === 0 && b.push(0), {
				segStart: e,
				segEnd: t,
				head: n,
				tail: r,
				tailSum: o,
				tailBlockMin: G(o),
				natural: s,
				naturalBlockMin: G(s),
				naturalSuffixMin: _,
				tailSuffixMin: v,
				tabsBefore: c,
				tabGap: y,
				gapValues: b
			};
		}, q = (e, t, n, r, i, a) => {
			let o = i;
			for (; o > r;) {
				let i = Math.floor(o / 32) * 32;
				if (i > r && n + t[i / 32] > a) {
					o = i - 1;
					continue;
				}
				if (n + e[o] <= a) return o;
				o--;
			}
			return -1;
		}, J = /* @__PURE__ */ new Map(), Y = (e, t, n) => {
			if (t === e.segStart[t]) {
				let r = Math.min(n, t + 8 + 1) - 1;
				return e.head[r] + (e.tailSum[n] - e.tailSum[r + 1]);
			}
			let r = Math.min(n, t + 8 + 1), o = J.get(r);
			return o === void 0 && (o = a.measureText(W(t, r), i[t].style), J.set(r, o)), o + (e.tailSum[n] - e.tailSum[r]);
		}, ee = (e, t, n) => {
			let r = U ??= K();
			if (J.clear(), r.tabsBefore[h] !== r.tabsBefore[e]) return te(r, e, t, n);
			let o = i[e], s = o.type === "text" ? r.segEnd[e] : e + 1, c = o.type === "text" ? Y(r, e, s) : o.type === "object" ? o.width : 0;
			if (s < h) {
				let t = i[s], l = o.type === "text" && t.type === "text" && a.boundaryAdvance ? a.boundaryAdvance(o.style, t.style) - a.boundaryAdvance(i[r.segStart[e]].style, t.style) : 0, u = q(r.natural, r.naturalBlockMin, c + l - r.natural[s], s, h, n);
				if (u >= 0) return u;
			}
			if (c <= n) return s;
			if (o.type !== "text") return e;
			let l = e + 8 + 1;
			if (s - 1 > l) {
				let t = Y(r, e, l) - r.tailSum[l], i = q(r.tailSum, r.tailBlockMin, t, l, s - 1, n);
				if (i >= 0) return i;
			}
			for (let t = Math.min(s - 1, l); t > e; t--) if (Y(r, e, t) <= n) return t;
			return e;
		}, te = (e, t, n, r) => {
			let o = a.tabStartPen?.(n) ?? (n === 0 ? a.firstLineIndent ?? 0 : 0), s = a.tabStops ?? [], c = a.defaultTabSize ?? 0, l = e.gapValues, u = l.length, d = new Float64Array(u), f = new Float64Array(u).fill(o), p = new Float64Array(u), m = new Float64Array(u), g = new Float64Array(u), _ = new Uint8Array(u), v = new Float64Array(u), y = !1, b = 0, x = 0, S = !1, C = i[t], w = C.type === "text" ? e.segEnd[t] : t + 1, T = C.type === "text" ? Y(e, t, w) : C.type === "object" ? C.width : 0, E = i[w], D = T + (w < h && C.type === "text" && E.type === "text" && a.boundaryAdvance ? a.boundaryAdvance(C.style, E.style) - a.boundaryAdvance(i[e.segStart[t]].style, E.style) : 0) - e.natural[w], O = t + 8 + 1, k = C.type === "text" && w > O ? Y(e, t, O) - e.tailSum[O] : 0, A = l.every((e) => e >= 0), j = 1e-9 * Math.max(1, Math.abs(r)), M = (t) => {
				if (!A || t < O && t < w) return !1;
				let n = Infinity;
				return t < w && (n = k + e.tailSuffixMin[t + 1]), w < h && (n = Math.min(n, D + e.naturalSuffixMin[Math.max(t + 1, w + 1)])), n > r + j;
			}, N = t, P = -1, F = null;
			for (let n = t + 1; n <= h; n++) {
				let o = n - 1, C = i[o];
				if (C.type === "text" && P >= 0 && e.segStart[o] === e.segStart[o - 1]) {
					let r = X(e, P, t, n);
					x = F === null ? r : r + F;
				} else {
					if (S) for (let e = 0; e < u; e++) y ? v[e] += x : (d[e] += x, f[e] += x);
					if (C.type === "tab") {
						for (let e = 0; e < u; e++) {
							if (y) {
								let t = v[e], n = p[e] + l[e];
								_[e] || (n = m[e] - t * g[e], n < p[e] && (n = p[e])), d[e] += n - p[e] + t, f[e] = n + t;
							}
							p[e] = f[e];
							let t = null;
							for (let n of s) n.pos > f[e] && (t === null || n.pos < t.pos) && (t = n);
							t === null && c > 0 && (t = {
								pos: (Math.floor(f[e] / c) + 1) * c,
								algn: "l"
							}), _[e] = +(t === null), m[e] = t?.pos ?? 0, g[e] = t?.algn === "ctr" ? .5 : +(t?.algn === "r" || t?.algn === "dec"), v[e] = 0;
						}
						y = !0, b = e.tabGap[o], P = -1, x = 0, S = !1;
					} else if (C.type === "text") {
						let r = P >= 0 ? i[P] : void 0;
						F = r?.type === "text" ? a.boundaryAdvance?.(r.style, C.style) ?? 0 : null, P = o;
						let s = X(e, P, t, n);
						x = F === null ? s : s + F, S = !0;
					} else P = -1, x = C.width, S = !0;
				}
				let w;
				if (!y) w = d[b] + x;
				else {
					let e = v[b] + x, t = l[b];
					if (!_[b]) {
						let n = m[b] - e * g[b];
						n < p[b] && (n = p[b]), t = n - p[b];
					}
					w = d[b] + t + e;
				}
				if (w <= r) {
					if (n === h) return h;
					N = n;
				}
				if (n < h && M(n)) break;
			}
			return N;
		}, X = (e, t, n, r) => t === n ? Y(e, n, r) : Y(e, t, r), Z = new Int32Array(h).fill(-1);
		x.push(Z);
		let Q = (e, t) => {
			for (let n = e; n < t; n++) Z[n] = y.length - 1, S[i[n].run] = 1;
		}, $ = 0;
		if (h === 0) {
			y.push({
				segments: [],
				width: 0,
				...t + 1 < m.length ? { endsWithBreak: !0 } : {},
				...g[t] >= 0 ? { lineFeedRun: g[t] } : {},
				..._[t] === void 0 ? {} : { endBreakRun: _[t] }
			});
			continue;
		}
		for (; $ < h;) {
			let e = y.length, n = a.maxWidth - (e === 0 ? a.firstLineIndent ?? 0 : 0), r = (t) => O !== null && k && D !== void 0 ? a.measureText(O.slice(k[$], k[t]), D) : H($, t, e).width, o = h;
			if (Number.isFinite(n) && a.nonMonotoneMeasure) o = ee($, e, n);
			else if (Number.isFinite(n)) {
				let e = $, t = h, i = 1;
				for (; e < h;) {
					let a = Math.min(h, $ + i);
					if (r(a) <= n) {
						if (e = a, a === h) break;
						i *= 2;
					} else {
						t = a - 1;
						break;
					}
				}
				for (; e < t;) {
					let i = Math.ceil((e + t) / 2);
					r(i) <= n ? e = i : t = i - 1;
				}
				o = e;
			}
			if (o >= h) {
				let n = H($, h, e);
				t + 1 < m.length && (n.endsWithBreak = !0), y.push(n), Q($, h);
				break;
			}
			let l = 0;
			for (let e = $ + 1; e <= o; e++) E[e] && (l = e);
			if (l > $ && M(l) && (l = h), M($)) for (l = $ + 2; l < h && !d(i[l]) && i[l].type !== "tab";) l++;
			if (l === 0) if (i[$].type === "tab" && o <= $ + 1) {
				if (l = $ + 1, l < h && i[l].type === "text") for (l++; l < h && !E[l];) l++;
			} else l = Math.max($ + 1, o);
			let u = i[l - 1], p = l < h ? i[l] : void 0;
			if (C && p && (f(u) || f(p)) && (u.run === p.run || I(u, p))) {
				let { chars: e, offsets: t } = F(), n = t[$ - P], r = t[l - P];
				if (r - n > 1 && r < e.length) {
					let i = u.run !== p.run, a = i ? z(l) : $ + 1, o = s(e, r, c, i ? t[a - P] : n + 1), d = r - o;
					if (d > 0) if (i) {
						let e = a, n = l;
						for (; e < n;) {
							let r = Math.floor((e + n) / 2);
							t[r - P] < o ? e = r + 1 : n = r;
						}
						l = e;
					} else l - d > $ && (l -= d);
				}
			}
			for (y.push(H($, l, e)), Q($, l), $ = l; $ < h && d(i[$]);) $++;
		}
	}
	for (let e = 0; e < _.length; e++) {
		let t = _[e];
		if (t === void 0) continue;
		let n = b[e], r = e + 1 < b.length ? b[e + 1] : y.length;
		r > n && (y[r - 1].endBreakRun = t);
	}
	for (let e = 0; e < i.length; e++) {
		if (i[e].type !== "text" || S[e]) continue;
		let t = h[e], n = m[t], r = x[t], a = 0, o = n.length;
		for (; a < o;) {
			let t = a + o >> 1;
			n[t].run < e ? a = t + 1 : o = t;
		}
		let s = b[t];
		for (let e = a - 1; e >= 0; e--) if (r[e] >= 0) {
			s = r[e];
			break;
		}
		(y[s].hiddenRuns ??= []).push(e);
	}
	return y;
}
//#endregion
//#region packages/core/src/drawingml-text/metrics.ts
function m(e, t, n, r) {
	let i = n.lIns * r, a = n.rIns * r, o = n.tIns * r, s = n.bIns * r;
	return {
		left: i,
		top: o,
		width: Math.max(0, e - i - a),
		height: Math.max(0, t - o - s)
	};
}
function h(e, t, n, r = 0) {
	let i = t?.type === "pts" ? t.val * n : e * (t?.type === "pct" ? t.val / 1e5 : 1);
	return t?.type === "pts" ? i : i * (1 - r);
}
function g(e, t, n, r = 0) {
	let i = e.ascent + e.descent, a = h(i, t, n, r);
	if (a === i) return {
		ascent: e.ascent,
		descent: e.descent
	};
	let o = Math.max(0, e.descent - .25 * i), s = a < i ? Math.min(e.descent, .25 * a + o) : .25 * a <= e.descent ? e.descent : .25 * a + o;
	return {
		ascent: a - s,
		descent: s
	};
}
function _(e, t, n) {
	return e ? e.type === "pts" ? e.val * n : t * (e.val / 1e5) : 0;
}
function v(e, t, n) {
	return e === "ctr" ? t.top + (t.height - n) / 2 : e === "b" ? t.top + Math.max(0, t.height - n) : t.top;
}
//#endregion
//#region packages/core/src/drawingml-text/align.ts
function y(e, t, n, r, i = !1, a = !1) {
	let o = a ? n - r : Math.max(0, n - r);
	return e === "ctr" ? t + o / 2 : e === "r" || i && (e === "l" || e == null) ? t + o : t;
}
function b(e, t, n) {
	return e === "dist" || e === "thaiDist" ? !0 : e === "just" || e === "justLow" ? !t && !n : !1;
}
//#endregion
//#region packages/core/src/drawingml-text/stacked.ts
var x = (e) => e.reduce((e, t) => e + t.advance, 0);
function S(e) {
	let t = e.length;
	for (; t > 0 && e[t - 1].space;) t--;
	return t;
}
function C(e, t) {
	let { rect: n, pxPerPt: r } = t, i = t.lnSpcReduction ?? 0, a = [], o = [];
	e.forEach((s, c) => {
		let l = p(s.runs, {
			maxWidth: t.wrap ? n.height : Infinity,
			measureText: (e, n) => x(t.glyphs(e, n)),
			sameStyle: t.sameStyle,
			eastAsianLineBreak: s.eastAsianLineBreak
		}), u = l.map((e, n) => {
			let a = e.segments.flatMap((e) => {
				if (e.type === "text") return t.glyphs(e.text, e.style);
				if (e.type === "object") {
					if (!t.objectGlyph) throw Error("Stacked inline objects require a host object adapter");
					let n = t.objectGlyph(e);
					return n.advance === 0 && n.thickness === 0 ? [] : [n];
				}
				return [];
			}), o = a.length > 0 ? 0 : s.emptyThickness;
			for (let e of a) e.thickness > o && (o = e.thickness);
			let u = g({
				ascent: o / 2,
				descent: o / 2
			}, s.lineSpacing, r, i);
			return {
				glyphs: a,
				paragraph: c,
				lastInParagraph: n === l.length - 1,
				endsWithBreak: e.endsWithBreak === !0,
				thickness: o,
				ascent: u.ascent,
				descent: u.descent
			};
		});
		if (u.length === 0) {
			let e = s.emptyThickness, t = g({
				ascent: e / 2,
				descent: e / 2
			}, s.lineSpacing, r, i);
			u.push({
				glyphs: [],
				paragraph: c,
				lastInParagraph: !0,
				endsWithBreak: !1,
				thickness: e,
				ascent: t.ascent,
				descent: t.descent
			});
		}
		let d = c === 0, f = c === e.length - 1, m = t.spcFirstLastPara === !0, h = d && !m ? 0 : _(s.spaceBefore, u[0].thickness, r), v = f && !m ? 0 : _(s.spaceAfter, u[u.length - 1].thickness, r), y = [];
		h && y.push({
			type: "gap",
			size: h
		});
		for (let e of u) y.push({
			type: "line",
			line: e
		}), a.push(e);
		v && y.push({
			type: "gap",
			size: v
		}), o.push(y);
	});
	let s = a[a.length - 1];
	s && s.descent < s.thickness / 2 && (s.descent = s.thickness / 2);
	let c = t.direction === "wordArtVertRtl", l = [], u = 0;
	for (let e of o) {
		let t = c ? e : e.slice().reverse(), n = e.filter((e) => e.type === "line"), r = 0;
		for (let e of t) {
			if (e.type === "gap") {
				u += e.size;
				continue;
			}
			let t = n[r++].line;
			l.push(u + (c ? t.ascent : t.descent)), u += t.ascent + t.descent;
		}
	}
	let d = u, f = n.width - d, m = t.anchor === "ctr" ? f / 2 : t.anchor === "b" ? Math.max(0, f) : 0, h = n.top, v = n.height;
	if (t.anchorCtr) {
		let e = 0;
		for (let t of a) e = Math.max(e, x(t.glyphs.slice(0, S(t.glyphs))));
		h = n.top + (n.height - e) / 2, v = e;
	}
	let y = [], C = [];
	return a.forEach((t, r) => {
		let i = c ? n.left + n.width - m - l[r] : n.left + m + l[r];
		C.push({
			axisX: i,
			thickness: t.thickness,
			paragraph: t.paragraph
		});
		let a = e[t.paragraph].alignment, o = S(t.glyphs), s = x(t.glyphs.slice(0, o)), u = v - s, d = h, f = () => 0, p = t.lastInParagraph;
		if (a === "dist" || a === "thaiDist") o <= 1 ? d = h + u / 2 : f = (e) => e < o - 1 ? Math.max(0, u) / (o - 1) : 0;
		else if (b(a, p, t.endsWithBreak)) {
			let e = t.glyphs.slice(0, o).filter((e) => e.space).length;
			e > 0 && (f = (n) => n < o && t.glyphs[n].space ? Math.max(0, u) / e : 0);
		} else a === "ctr" ? d = h + u / 2 : a === "r" && (d = h + u);
		let g = d;
		t.glyphs.forEach((e, t) => {
			y.push({
				...e,
				axisX: i,
				cellTop: g,
				column: r
			}), g += e.advance + f(t);
		});
	}), {
		glyphs: y,
		columns: C,
		blockWidth: d
	};
}
//#endregion
//#region packages/core/src/drawingml-text/stacked-faces.ts
var w = 7 / 6;
function T(e) {
	return e.normalize("NFKC").trim().replace(/\s+/gu, " ").toLocaleLowerCase("en-US");
}
function E(e) {
	let t = a(e);
	return T(t.length > 0 ? t[0].family : e);
}
var D = new Map([
	["yu gothic", 1.5084],
	["yu gothic medium", 1.5084],
	["simsun", 1.038],
	["nsimsun", 1.038],
	["mingliu", 1.1132],
	["pmingliu", 1.1132],
	["mingliu_hkscs", 1.1132],
	["mingliu-extb", 1.1137],
	["pmingliu-extb", 1.1137],
	["gulim", 1.0481],
	["dotum", 1.0481],
	["stzhongsong", 1.2165]
]);
function O(e, t, n) {
	let r = a(e, {
		weight: t ? 700 : 400,
		style: n ? "italic" : "normal"
	});
	r.length === 0 && (r = a(e));
	let i = r.find((e) => e.source === "macos-supplemental") ?? r.find((e) => e.source === "office-mac") ?? r[0];
	if (!(!i || !(i.unitsPerEm > 0))) {
		if (i.typoMetrics) {
			let [e, t, n] = i.typoMetrics;
			return {
				ascent: (e + Math.max(0, n)) / i.unitsPerEm,
				descent: -t / i.unitsPerEm
			};
		}
		if (i.win) return {
			ascent: i.win[0] / i.unitsPerEm,
			descent: i.win[1] / i.unitsPerEm
		};
	}
}
function k(e) {
	return D.get(E(e)) ?? D.get(T(e));
}
var A = new Set([..."()<>[]{}…‥‐←→↑↓―∥、。ー～＝＿￣｜（）〔〕［］｛｝〈〉《》「」『』【】〖〗"].map((e) => e.codePointAt(0)));
function j(e) {
	return A.has(e);
}
var M = "…‥‐←→↑↓―∥、。ー～＝＿￣｜（）〔〕［］｛｝〈〉《》「」『』【】〖〗", N = "…‥‐←→↑↓―、。ー～＝＿￣｜（）〔〕［］｛｝〈〉《》「」『』【】〖〗", P = new Map([
	[[
		"ms gothic",
		"ms pgothic",
		"ms ui gothic",
		"ms mincho",
		"ms pmincho",
		"hggothice",
		"hgpgothice",
		"hgsgothice",
		"hgminchoe",
		"hgpminchoe",
		"hgsminchoe",
		"hgmarugothicmpro",
		"hgsoeikakugothicub",
		"hgpsoeikakugothicub",
		"hgssoeikakugothicub"
	], M],
	[["yu gothic"], N + "∥"],
	[[
		"meiryo",
		"meiryo ui",
		"yu gothic ui",
		"yu mincho",
		"yu mincho demibold"
	], N],
	[["yu gothic medium"], "…‥‐←→↑↓―、。ー～＝＿￣｜（）〔〕［］｛｝《》「」『』【】〖〗"],
	[[
		"simsun",
		"nsimsun",
		"stzhongsong"
	], "…‥←→↑↓―∥、。ー～＝＿￣｜（）〔〕［］｛｝〈〉《》「」『』【】〖〗"],
	[[
		"simhei",
		"kaiti",
		"fangsong",
		"sthupo",
		"stliti",
		"stxingkai",
		"stxinwei"
	], "…←→↑↓、。～＿￣｜（）〔〕［］｛｝〈〉《》「」『』【】〖〗"],
	[["dengxian"], "←→↑↓∥、。ー～＝＿￣｜（）〔〕［］｛｝〈〉《》「」『』【】〖〗"],
	[["microsoft yahei", "microsoft yahei ui"], "…‥←→↑↓―∥、。ー～＝＿（）〔〕［］｛｝〈〉《》「」『』【】〖〗"],
	[["microsoft jhenghei"], "…‥、。ー（）〔〕［］｛｝〈〉《》「」『』【】〖〗"],
	[[
		"batang",
		"batangche",
		"gungsuh",
		"gungsuhche",
		"gulim",
		"gulimche",
		"dotum",
		"dotumche",
		"malgun gothic"
	], "…‥、。（）〔〕［］｛｝〈〉《》「」『』【】"],
	[["mingliu", "pmingliu"], "…‥（）〔〕［］｛｝〈〉《》「」『』【】"],
	[["mingliu_hkscs"], "…‥（）〔〕｛｝〈〉《》「」『』【】"]
].flatMap(([e, t]) => {
	let n = new Set([...t].map((e) => e.codePointAt(0)));
	return e.map((e) => [e, n]);
}));
function F(e, t) {
	return (P.get(E(e)) ?? P.get(T(e)))?.has(t) ?? !1;
}
//#endregion
export { F as a, y as c, _ as d, g as f, j as i, v as l, p as m, k as n, C as o, m as p, O as r, b as s, w as t, h as u };
