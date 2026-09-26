//#region packages/core/src/fonts/office-auto-line.ts
var e = 1.3;
function t(t) {
	let { unitsPerEm: n, hheaAscent: r, hheaDescent: i, hheaLineGap: a, farEastCodePage: o } = t;
	if (!(Number.isFinite(n) && n > 0 && Number.isFinite(r) && r >= 0 && Number.isFinite(i) && i <= 0 && Number.isFinite(a))) return null;
	let s = r - i;
	if (!(s > 0)) return null;
	let c = (e - 1) / 2 * s, l = o ? r + c : r + a, u = o ? -i + c : -i;
	return l >= 0 && u >= 0 && l + u > 0 ? Object.freeze({
		lineHeightRatio: (l + u) / n,
		designAscentRatio: l / n,
		designDescentRatio: u / n
	}) : null;
}
//#endregion
export { t as n, e as t };
