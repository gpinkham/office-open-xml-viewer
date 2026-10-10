import { t as e } from "./font-display-text-WXcc5Z4y.js";
import { s as t } from "./resource-policy.generated-BTdyyO9v.js";
import { a as n, c as r, d as i, l as a, n as o, p as s, s as c, t as l, u } from "./scripts-DEuLSUed.js";
import { A as d, B as f, C as p, E as m, F as h, G as g, H as _, I as v, K as y, L as b, M as x, N as S, O as C, P as w, R as T, S as E, T as D, U as O, V as k, W as A, X as j, a as M, c as N, d as P, f as F, i as I, j as L, k as R, m as z, n as B, nt as V, p as H, q as U, s as W, u as G, w as K, x as q, z as ee } from "./office-auto-line-Chy1gU-T.js";
import { i as te, s as ne, t as J } from "./line-distribute-BY0FYamv.js";
import { An as re, Gn as ie, Hn as ae, In as oe, Jn as se, Mn as ce, Nn as le, Qn as ue, Wn as de, Yn as fe, Zn as pe, _r as me, a as he, ar as ge, c as _e, cr as ve, ia as ye, jn as be, l as xe, n as Se, nr as Ce, qn as we, ra as Te, sr as Ee } from "./plot-area-frame-DvwuejI0.js";
import { r as Y } from "./units-DIk-8W6L.js";
import { f as De } from "./pixel-budget-QcsXr21f.js";
import { t as Oe } from "./renderer-VcLL4hOT.js";
import { g as ke, h as Ae, m as je } from "./three-d-DzM4SQVr.js";
import { S as Me, _ as Ne, a as Pe, c as Fe, d as Ie, m as Le, o as Re, p as ze, t as Be, v as Ve, x as He, y as Ue } from "./blip-gate-CVWM87j6.js";
import { i as We } from "./tiff-contract-BtmLs4Ug.js";
import { n as Ge, t as Ke } from "./duotone-bitmap-by-path-Dtvm46Ye.js";
import { c as qe } from "./error-wire-rJNDxWbL.js";
import { t as Je } from "./pull-session-BzHuXyzF.js";
import { n as Ye, t as Xe } from "./hyperlink-Q_icYkYZ.js";
import { s as Ze } from "./presentation-preflight-HAt3EOyB.js";
import { a as Qe, c as $e, f as et, i as tt, l as nt, m as rt, n as it, o as at, p as ot, r as st, s as ct, t as lt, u as ut } from "./stacked-faces-DEoKxzB_.js";
//#region packages/core/src/internal/canvas-clip.ts
function dt(e, t, n) {
	let r = typeof e.getTransform == "function" ? e.getTransform() : {
		a: 1,
		b: 0,
		c: 0,
		d: 1,
		e: 0,
		f: 0
	};
	if (![
		t,
		n,
		t + n,
		e.canvas.width,
		e.canvas.height,
		r.a,
		r.b,
		r.c,
		r.d,
		r.e,
		r.f
	].every(Number.isFinite)) return;
	let i = Math.max(Math.abs(r.a), Math.abs(r.c)), a = Math.max(Math.abs(r.b), Math.abs(r.d));
	if (i === 0 || a === 0) return;
	let o = r.a / i, s = r.c / i, c = r.b / a, l = o * (r.d / a) - c * s;
	if (l === 0) return;
	let u = Infinity, d = -Infinity;
	for (let t of [0, e.canvas.width]) for (let n of [0, e.canvas.height]) {
		let e = ((c === 0 ? 0 : -c * ((t - r.e) / i)) + (o === 0 ? 0 : o * ((n - r.f) / a))) / l;
		if (!Number.isFinite(e)) return;
		u = Math.min(u, e), d = Math.max(d, e);
	}
	let f = d - u;
	Number.isFinite(f) && (e.beginPath(), e.rect(t, u, n, f), e.clip());
}
var ft = {
	textarchdown: {
		adj: [["adj", "val 0"]],
		gd: [
			["adval", "pin 0 adj 21599999"],
			["v1", "+- 10800000 0 adval"],
			["v2", "+- 32400000 0 adval"],
			["nv1", "+- 0 0 v1"],
			["stAng", "?: nv1 v2 v1"],
			["w1", "+- 5400000 0 adval"],
			["w2", "+- 16200000 0 adval"],
			["d1", "+- adval 0 stAng"],
			["d2", "+- d1 0 21600000"],
			["v3", "+- 0 0 10800000"],
			["c2", "?: w2 d1 d2"],
			["c1", "?: v1 d2 c2"],
			["c0", "?: w1 d1 c1"],
			["swAng", "?: stAng c0 v3"],
			["wt1", "sin wd2 adj"],
			["ht1", "cos hd2 adj"],
			["dx1", "cat2 wd2 ht1 wt1"],
			["dy1", "sat2 hd2 ht1 wt1"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"],
			["wt2", "sin wd2 stAng"],
			["ht2", "cos hd2 stAng"],
			["dx2", "cat2 wd2 ht2 wt2"],
			["dy2", "sat2 hd2 ht2 wt2"],
			["x2", "+- hc dx2 0"],
			["y2", "+- vc dy2 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x2",
				"y2"
			], [
				"a",
				"wd2",
				"hd2",
				"stAng",
				"swAng"
			]]
		}]
	},
	textarchdownpour: {
		adj: [["adj1", "val 0"], ["adj2", "val 25000"]],
		gd: [
			["adval", "pin 0 adj1 21599999"],
			["v1", "+- 10800000 0 adval"],
			["v2", "+- 32400000 0 adval"],
			["nv1", "+- 0 0 v1"],
			["stAng", "?: nv1 v2 v1"],
			["w1", "+- 5400000 0 adval"],
			["w2", "+- 16200000 0 adval"],
			["d1", "+- adval 0 stAng"],
			["d2", "+- d1 0 21600000"],
			["v3", "+- 0 0 10800000"],
			["c2", "?: w2 d1 d2"],
			["c1", "?: v1 d2 c2"],
			["c0", "?: w1 d1 c1"],
			["swAng", "?: stAng c0 v3"],
			["wt1", "sin wd2 stAng"],
			["ht1", "cos hd2 stAng"],
			["dx1", "cat2 wd2 ht1 wt1"],
			["dy1", "sat2 hd2 ht1 wt1"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"],
			["adval2", "pin 0 adj2 99000"],
			["ratio", "*/ adval2 1 100000"],
			["iwd2", "*/ wd2 ratio 1"],
			["ihd2", "*/ hd2 ratio 1"],
			["wt2", "sin iwd2 adval"],
			["ht2", "cos ihd2 adval"],
			["dx2", "cat2 iwd2 ht2 wt2"],
			["dy2", "sat2 ihd2 ht2 wt2"],
			["x2", "+- hc dx2 0"],
			["y2", "+- vc dy2 0"],
			["wt3", "sin iwd2 stAng"],
			["ht3", "cos ihd2 stAng"],
			["dx3", "cat2 iwd2 ht3 wt3"],
			["dy3", "sat2 ihd2 ht3 wt3"],
			["x3", "+- hc dx3 0"],
			["y3", "+- vc dy3 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x3",
				"y3"
			], [
				"a",
				"iwd2",
				"ihd2",
				"stAng",
				"swAng"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x1",
				"y1"
			], [
				"a",
				"wd2",
				"hd2",
				"stAng",
				"swAng"
			]]
		}]
	},
	textarchup: {
		adj: [["adj", "val cd2"]],
		gd: [
			["adval", "pin 0 adj 21599999"],
			["v1", "+- 10800000 0 adval"],
			["v2", "+- 32400000 0 adval"],
			["end", "?: v1 v1 v2"],
			["w1", "+- 5400000 0 adval"],
			["w2", "+- 16200000 0 adval"],
			["d1", "+- end 0 adval"],
			["d2", "+- 21600000 d1 0"],
			["c2", "?: w2 d1 d2"],
			["c1", "?: v1 d2 c2"],
			["swAng", "?: w1 d1 c1"],
			["wt1", "sin wd2 adj"],
			["ht1", "cos hd2 adj"],
			["dx1", "cat2 wd2 ht1 wt1"],
			["dy1", "sat2 hd2 ht1 wt1"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x1",
				"y1"
			], [
				"a",
				"wd2",
				"hd2",
				"adval",
				"swAng"
			]]
		}]
	},
	textarchuppour: {
		adj: [["adj1", "val cd2"], ["adj2", "val 50000"]],
		gd: [
			["adval", "pin 0 adj1 21599999"],
			["v1", "+- 10800000 0 adval"],
			["v2", "+- 32400000 0 adval"],
			["end", "?: v1 v1 v2"],
			["w1", "+- 5400000 0 adval"],
			["w2", "+- 16200000 0 adval"],
			["d1", "+- end 0 adval"],
			["d2", "+- 21600000 d1 0"],
			["c2", "?: w2 d1 d2"],
			["c1", "?: v1 d2 c2"],
			["swAng", "?: w1 d1 c1"],
			["wt1", "sin wd2 adval"],
			["ht1", "cos hd2 adval"],
			["dx1", "cat2 wd2 ht1 wt1"],
			["dy1", "sat2 hd2 ht1 wt1"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"],
			["adval2", "pin 0 adj2 99000"],
			["ratio", "*/ adval2 1 100000"],
			["iwd2", "*/ wd2 ratio 1"],
			["ihd2", "*/ hd2 ratio 1"],
			["wt2", "sin iwd2 adval"],
			["ht2", "cos ihd2 adval"],
			["dx2", "cat2 iwd2 ht2 wt2"],
			["dy2", "sat2 ihd2 ht2 wt2"],
			["x2", "+- hc dx2 0"],
			["y2", "+- vc dy2 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x1",
				"y1"
			], [
				"a",
				"wd2",
				"hd2",
				"adval",
				"swAng"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x2",
				"y2"
			], [
				"a",
				"iwd2",
				"ihd2",
				"adval",
				"swAng"
			]]
		}]
	},
	textbutton: {
		adj: [["adj", "val 10800000"]],
		gd: [
			["adval", "pin 0 adj 21599999"],
			["bot", "+- 5400000 0 adval"],
			["lef", "+- 10800000 0 adval"],
			["top", "+- 16200000 0 adval"],
			["rig", "+- 21600000 0 adval"],
			["c3", "?: top adval 0"],
			["c2", "?: lef 10800000 c3"],
			["c1", "?: bot rig c2"],
			["stAng", "?: adval c1 0"],
			["w1", "+- 21600000 0 stAng"],
			["stAngB", "?: stAng w1 0"],
			["td1", "*/ bot 2 1"],
			["td2", "*/ top 2 1"],
			["ntd2", "+- 0 0 td2"],
			["w2", "+- 0 0 10800000"],
			["c6", "?: top ntd2 w2"],
			["c5", "?: lef 10800000 c6"],
			["c4", "?: bot td1 c5"],
			["v1", "?: adval c4 10800000"],
			["swAngT", "+- 0 0 v1"],
			["stT", "?: lef stAngB stAng"],
			["stB", "?: lef stAng stAngB"],
			["swT", "?: lef v1 swAngT"],
			["swB", "?: lef swAngT v1"],
			["wt1", "sin wd2 stT"],
			["ht1", "cos hd2 stT"],
			["dx1", "cat2 wd2 ht1 wt1"],
			["dy1", "sat2 hd2 ht1 wt1"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"],
			["wt2", "sin wd2 stB"],
			["ht2", "cos hd2 stB"],
			["dx2", "cat2 wd2 ht2 wt2"],
			["dy2", "sat2 hd2 ht2 wt2"],
			["x2", "+- hc dx2 0"],
			["y2", "+- vc dy2 0"],
			["wt3", "sin wd2 adj"],
			["ht3", "cos hd2 adj"],
			["dx3", "cat2 wd2 ht3 wt3"],
			["dy3", "sat2 hd2 ht3 wt3"],
			["x3", "+- hc dx3 0"],
			["y3", "+- vc dy3 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"x1",
					"y1"
				], [
					"a",
					"wd2",
					"hd2",
					"stT",
					"swT"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"l",
					"vc"
				], [
					"l",
					"r",
					"vc"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"x2",
					"y2"
				], [
					"a",
					"wd2",
					"hd2",
					"stB",
					"swB"
				]]
			}
		]
	},
	textbuttonpour: {
		adj: [["adj1", "val cd2"], ["adj2", "val 50000"]],
		gd: [
			["adval", "pin 0 adj1 21599999"],
			["bot", "+- 5400000 0 adval"],
			["lef", "+- 10800000 0 adval"],
			["top", "+- 16200000 0 adval"],
			["rig", "+- 21600000 0 adval"],
			["c3", "?: top adval 0"],
			["c2", "?: lef 10800000 c3"],
			["c1", "?: bot rig c2"],
			["stAng", "?: adval c1 0"],
			["w1", "+- 21600000 0 stAng"],
			["stAngB", "?: stAng w1 0"],
			["td1", "*/ bot 2 1"],
			["td2", "*/ top 2 1"],
			["ntd2", "+- 0 0 td2"],
			["w2", "+- 0 0 10800000"],
			["c6", "?: top ntd2 w2"],
			["c5", "?: lef 10800000 c6"],
			["c4", "?: bot td1 c5"],
			["v1", "?: adval c4 10800000"],
			["swAngT", "+- 0 0 v1"],
			["stT", "?: lef stAngB stAng"],
			["stB", "?: lef stAng stAngB"],
			["swT", "?: lef v1 swAngT"],
			["swB", "?: lef swAngT v1"],
			["wt1", "sin wd2 stT"],
			["ht1", "cos hd2 stT"],
			["dx1", "cat2 wd2 ht1 wt1"],
			["dy1", "sat2 hd2 ht1 wt1"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"],
			["wt6", "sin wd2 stB"],
			["ht6", "cos hd2 stB"],
			["dx6", "cat2 wd2 ht6 wt6"],
			["dy6", "sat2 hd2 ht6 wt6"],
			["x6", "+- hc dx6 0"],
			["y6", "+- vc dy6 0"],
			["adval2", "pin 40000 adj2 99000"],
			["ratio", "*/ adval2 1 100000"],
			["iwd2", "*/ wd2 ratio 1"],
			["ihd2", "*/ hd2 ratio 1"],
			["wt2", "sin iwd2 stT"],
			["ht2", "cos ihd2 stT"],
			["dx2", "cat2 iwd2 ht2 wt2"],
			["dy2", "sat2 ihd2 ht2 wt2"],
			["x2", "+- hc dx2 0"],
			["y2", "+- vc dy2 0"],
			["wt5", "sin iwd2 stB"],
			["ht5", "cos ihd2 stB"],
			["dx5", "cat2 iwd2 ht5 wt5"],
			["dy5", "sat2 ihd2 ht5 wt5"],
			["x5", "+- hc dx5 0"],
			["y5", "+- vc dy5 0"],
			["d1", "+- hd2 0 ihd2"],
			["d12", "*/ d1 1 2"],
			["yu", "+- vc 0 d12"],
			["yd", "+- vc d12 0"],
			["v1", "*/ d12 d12 1"],
			["v2", "*/ ihd2 ihd2 1"],
			["v3", "*/ v1 1 v2"],
			["v4", "+- 1 0 v3"],
			["v5", "*/ iwd2 iwd2 1"],
			["v6", "*/ v4 v5 1"],
			["v7", "sqrt v6"],
			["xl", "+- hc 0 v7"],
			["xr", "+- hc v7 0"],
			["wtadj", "sin iwd2 adj1"],
			["htadj", "cos ihd2 adj1"],
			["dxadj", "cat2 iwd2 htadj wtadj"],
			["dyadj", "sat2 ihd2 htadj wtadj"],
			["xadj", "+- hc dxadj 0"],
			["yadj", "+- vc dyadj 0"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"x1",
					"y1"
				], [
					"a",
					"wd2",
					"hd2",
					"stT",
					"swT"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"x2",
					"y2"
				], [
					"a",
					"iwd2",
					"ihd2",
					"stT",
					"swT"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"xl",
					"yu"
				], [
					"l",
					"xr",
					"yu"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"xl",
					"yd"
				], [
					"l",
					"xr",
					"yd"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"x5",
					"y5"
				], [
					"a",
					"iwd2",
					"ihd2",
					"stB",
					"swB"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"x6",
					"y6"
				], [
					"a",
					"wd2",
					"hd2",
					"stB",
					"swB"
				]]
			}
		]
	},
	textcandown: {
		adj: [["adj", "val 14286"]],
		gd: [
			["a", "pin 0 adj 33333"],
			["dy", "*/ a h 100000"],
			["y0", "+- t dy 0"],
			["y1", "+- b 0 dy"],
			["ncd2", "*/ cd2 -1 1"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"a",
				"wd2",
				"dy",
				"cd2",
				"ncd2"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y1"
			], [
				"a",
				"wd2",
				"dy",
				"cd2",
				"ncd2"
			]]
		}]
	},
	textcanup: {
		adj: [["adj", "val 85714"]],
		gd: [
			["a", "pin 66667 adj 100000"],
			["dy1", "*/ a h 100000"],
			["dy", "+- h 0 dy1"],
			["y0", "+- t dy1 0"],
			["y1", "+- t dy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y1"
			], [
				"a",
				"wd2",
				"dy",
				"cd2",
				"cd2"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"b"
			], [
				"a",
				"wd2",
				"dy",
				"cd2",
				"cd2"
			]]
		}]
	},
	textcascadedown: {
		adj: [["adj", "val 44444"]],
		gd: [
			["a", "pin 28570 adj 100000"],
			["dy", "*/ a h 100000"],
			["y1", "+- t dy 0"],
			["dy2", "+- h 0 dy"],
			["dy3", "*/ dy2 1 4"],
			["y2", "+- t dy3 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"l",
				"r",
				"y2"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y1"
			], [
				"l",
				"r",
				"b"
			]]
		}]
	},
	textcascadeup: {
		adj: [["adj", "val 44444"]],
		gd: [
			["a", "pin 28570 adj 100000"],
			["dy", "*/ a h 100000"],
			["y1", "+- t dy 0"],
			["dy2", "+- h 0 dy"],
			["dy3", "*/ dy2 1 4"],
			["y2", "+- t dy3 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y2"
			], [
				"l",
				"r",
				"t"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"b"
			], [
				"l",
				"r",
				"y1"
			]]
		}]
	},
	textchevron: {
		adj: [["adj", "val 25000"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["y", "*/ a h 100000"],
			["y1", "+- t b y"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"r",
					"y"
				]
			]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"b"
				],
				[
					"l",
					"hc",
					"y1"
				],
				[
					"l",
					"r",
					"b"
				]
			]
		}]
	},
	textchevroninverted: {
		adj: [["adj", "val 75000"]],
		gd: [
			["a", "pin 50000 adj 100000"],
			["y", "*/ a h 100000"],
			["y1", "+- b 0 y"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"t"
				],
				[
					"l",
					"hc",
					"y1"
				],
				[
					"l",
					"r",
					"t"
				]
			]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"r",
					"y"
				]
			]
		}]
	},
	textcircle: {
		adj: [["adj", "val 10800000"]],
		gd: [
			["adval", "pin 0 adj 21599999"],
			["d0", "+- adval 0 10800000"],
			["d1", "+- 10800000 0 adval"],
			["d2", "+- 21600000 0 adval"],
			["d3", "?: d1 d1 10799999"],
			["d4", "?: d0 d2 d3"],
			["swAng", "*/ d4 2 1"],
			["wt1", "sin wd2 adj"],
			["ht1", "cos hd2 adj"],
			["dx1", "cat2 wd2 ht1 wt1"],
			["dy1", "sat2 hd2 ht1 wt1"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x1",
				"y1"
			], [
				"a",
				"wd2",
				"hd2",
				"adval",
				"swAng"
			]]
		}]
	},
	textcirclepour: {
		adj: [["adj1", "val cd2"], ["adj2", "val 50000"]],
		gd: [
			["adval", "pin 0 adj1 21599999"],
			["d0", "+- adval 0 10800000"],
			["d1", "+- 10800000 0 adval"],
			["d2", "+- 21600000 0 adval"],
			["d3", "?: d1 d1 10799999"],
			["d4", "?: d0 d2 d3"],
			["swAng", "*/ d4 2 1"],
			["wt1", "sin wd2 adval"],
			["ht1", "cos hd2 adval"],
			["dx1", "cat2 wd2 ht1 wt1"],
			["dy1", "sat2 hd2 ht1 wt1"],
			["x1", "+- hc dx1 0"],
			["y1", "+- vc dy1 0"],
			["adval2", "pin 0 adj2 99000"],
			["ratio", "*/ adval2 1 100000"],
			["iwd2", "*/ wd2 ratio 1"],
			["ihd2", "*/ hd2 ratio 1"],
			["wt2", "sin iwd2 adval"],
			["ht2", "cos ihd2 adval"],
			["dx2", "cat2 iwd2 ht2 wt2"],
			["dy2", "sat2 ihd2 ht2 wt2"],
			["x2", "+- hc dx2 0"],
			["y2", "+- vc dy2 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x1",
				"y1"
			], [
				"a",
				"wd2",
				"hd2",
				"adval",
				"swAng"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x2",
				"y2"
			], [
				"a",
				"iwd2",
				"ihd2",
				"adval",
				"swAng"
			]]
		}]
	},
	textcurvedown: {
		adj: [["adj", "val 45977"]],
		gd: [
			["a", "pin 0 adj 56338"],
			["dy", "*/ a h 100000"],
			["gd1", "*/ dy 3 4"],
			["gd2", "*/ dy 5 4"],
			["gd3", "*/ dy 3 8"],
			["gd4", "*/ dy 1 8"],
			["gd5", "+- h 0 gd3"],
			["gd6", "+- gd4 h 0"],
			["y0", "+- t dy 0"],
			["y1", "+- t gd1 0"],
			["y2", "+- t gd2 0"],
			["y3", "+- t gd3 0"],
			["y4", "+- t gd4 0"],
			["y5", "+- t gd5 0"],
			["y6", "+- t gd6 0"],
			["x1", "+- l wd3 0"],
			["x2", "+- r 0 wd3"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"C",
				"x1",
				"y1",
				"x2",
				"y2",
				"r",
				"y0"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y5"
			], [
				"C",
				"x1",
				"y6",
				"x2",
				"y6",
				"r",
				"y5"
			]]
		}]
	},
	textcurveup: {
		adj: [["adj", "val 45977"]],
		gd: [
			["a", "pin 0 adj 56338"],
			["dy", "*/ a h 100000"],
			["gd1", "*/ dy 3 4"],
			["gd2", "*/ dy 5 4"],
			["gd3", "*/ dy 3 8"],
			["gd4", "*/ dy 1 8"],
			["gd5", "+- h 0 gd3"],
			["gd6", "+- gd4 h 0"],
			["y0", "+- t dy 0"],
			["y1", "+- t gd1 0"],
			["y2", "+- t gd2 0"],
			["y3", "+- t gd3 0"],
			["y4", "+- t gd4 0"],
			["y5", "+- t gd5 0"],
			["y6", "+- t gd6 0"],
			["x1", "+- l wd3 0"],
			["x2", "+- r 0 wd3"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y0"
			], [
				"C",
				"x1",
				"y2",
				"x2",
				"y1",
				"r",
				"t"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y5"
			], [
				"C",
				"x1",
				"y6",
				"x2",
				"y6",
				"r",
				"y5"
			]]
		}]
	},
	textdeflate: {
		adj: [["adj", "val 18750"]],
		gd: [
			["a", "pin 0 adj 37500"],
			["dy", "*/ a ss 100000"],
			["gd0", "*/ dy 4 3"],
			["gd1", "+- h 0 gd0"],
			["adjY", "+- t dy 0"],
			["y0", "+- t gd0 0"],
			["y1", "+- t gd1 0"],
			["x0", "+- l wd3 0"],
			["x1", "+- r 0 wd3"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"C",
				"x0",
				"y0",
				"x1",
				"y0",
				"r",
				"t"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"b"
			], [
				"C",
				"x0",
				"y1",
				"x1",
				"y1",
				"r",
				"b"
			]]
		}]
	},
	textdeflatebottom: {
		adj: [["adj", "val 50000"]],
		gd: [
			["a", "pin 6250 adj 100000"],
			["dy", "*/ a ss 100000"],
			["dy2", "+- h 0 dy"],
			["y1", "+- t dy 0"],
			["cp", "+- y1 0 dy2"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"l",
				"r",
				"t"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"b"
			], [
				"Q",
				"hc",
				"cp",
				"r",
				"b"
			]]
		}]
	},
	textdeflateinflate: {
		adj: [["adj", "val 35000"]],
		gd: [
			["a", "pin 5000 adj 95000"],
			["dy", "*/ a h 100000"],
			["del", "*/ h 5 100"],
			["dh1", "*/ h 45 100"],
			["dh2", "*/ h 55 100"],
			["yh", "+- dy 0 del"],
			["yl", "+- dy del 0"],
			["y3", "+- yh yh dh1"],
			["y4", "+- yl yl dh2"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"l",
					"t"
				], [
					"l",
					"r",
					"t"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"l",
					"dh1"
				], [
					"Q",
					"hc",
					"y3",
					"r",
					"dh1"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"l",
					"dh2"
				], [
					"Q",
					"hc",
					"y4",
					"r",
					"dh2"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"l",
					"b"
				], [
					"l",
					"r",
					"b"
				]]
			}
		]
	},
	textdeflateinflatedeflate: {
		adj: [["adj", "val 25000"]],
		gd: [
			["a", "pin 3000 adj 47000"],
			["dy", "*/ a h 100000"],
			["del", "*/ h 3 100"],
			["ey1", "*/ h 30 100"],
			["ey2", "*/ h 36 100"],
			["ey3", "*/ h 63 100"],
			["ey4", "*/ h 70 100"],
			["by", "+- b 0 dy"],
			["yh1", "+- dy 0 del"],
			["yl1", "+- dy del 0"],
			["yh2", "+- by 0 del"],
			["yl2", "+- by del 0"],
			["y1", "+- yh1 yh1 ey1"],
			["y2", "+- yl1 yl1 ey2"],
			["y3", "+- yh2 yh2 ey3"],
			["y4", "+- yl2 yl2 ey4"]
		],
		paths: [
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"l",
					"t"
				], [
					"l",
					"r",
					"t"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"l",
					"ey1"
				], [
					"Q",
					"hc",
					"y1",
					"r",
					"ey1"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"l",
					"ey2"
				], [
					"Q",
					"hc",
					"y2",
					"r",
					"ey2"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"l",
					"ey3"
				], [
					"Q",
					"hc",
					"y3",
					"r",
					"ey3"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"l",
					"ey4"
				], [
					"Q",
					"hc",
					"y4",
					"r",
					"ey4"
				]]
			},
			{
				w: null,
				h: null,
				fill: null,
				stroke: !0,
				extrusionOk: !0,
				cmds: [[
					"m",
					"l",
					"b"
				], [
					"l",
					"r",
					"b"
				]]
			}
		]
	},
	textdeflatetop: {
		adj: [["adj", "val 50000"]],
		gd: [
			["a", "pin 0 adj 93750"],
			["dy", "*/ a h 100000"],
			["y1", "+- t dy 0"],
			["cp", "+- y1 dy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"Q",
				"hc",
				"cp",
				"r",
				"t"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"b"
			], [
				"l",
				"r",
				"b"
			]]
		}]
	},
	textdoublewave1: {
		adj: [["adj1", "val 6250"], ["adj2", "val 0"]],
		gd: [
			["a1", "pin 0 adj1 12500"],
			["a2", "pin -10000 adj2 10000"],
			["y1", "*/ h a1 100000"],
			["dy2", "*/ y1 10 3"],
			["y2", "+- y1 0 dy2"],
			["y3", "+- y1 dy2 0"],
			["y4", "+- b 0 y1"],
			["y5", "+- y4 0 dy2"],
			["y6", "+- y4 dy2 0"],
			["of", "*/ w a2 100000"],
			["of2", "*/ w a2 50000"],
			["x1", "abs of"],
			["dx2", "?: of2 0 of2"],
			["x2", "+- l 0 dx2"],
			["dx8", "?: of2 of2 0"],
			["x8", "+- r 0 dx8"],
			["dx3", "+/ dx2 x8 6"],
			["x3", "+- x2 dx3 0"],
			["dx4", "+/ dx2 x8 3"],
			["x4", "+- x2 dx4 0"],
			["x5", "+/ x2 x8 2"],
			["x6", "+- x5 dx3 0"],
			["x7", "+/ x6 x8 2"],
			["x9", "+- l dx8 0"],
			["x15", "+- r dx2 0"],
			["x10", "+- x9 dx3 0"],
			["x11", "+- x9 dx4 0"],
			["x12", "+/ x9 x15 2"],
			["x13", "+- x12 dx3 0"],
			["x14", "+/ x13 x15 2"],
			["x16", "+- r 0 x1"],
			["xAdj", "+- hc of 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x2",
					"y1"
				],
				[
					"C",
					"x3",
					"y2",
					"x4",
					"y3",
					"x5",
					"y1"
				],
				[
					"C",
					"x6",
					"y2",
					"x7",
					"y3",
					"x8",
					"y1"
				]
			]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x9",
					"y4"
				],
				[
					"C",
					"x10",
					"y5",
					"x11",
					"y6",
					"x12",
					"y4"
				],
				[
					"C",
					"x13",
					"y5",
					"x14",
					"y6",
					"x15",
					"y4"
				]
			]
		}]
	},
	textfadedown: {
		adj: [["adj", "val 33333"]],
		gd: [
			["a", "pin 0 adj 49999"],
			["dx", "*/ a w 100000"],
			["x1", "+- l dx 0"],
			["x2", "+- r 0 dx"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"l",
				"r",
				"t"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x1",
				"b"
			], [
				"l",
				"x2",
				"b"
			]]
		}]
	},
	textfadeleft: {
		adj: [["adj", "val 33333"]],
		gd: [
			["a", "pin 0 adj 49999"],
			["dy", "*/ a h 100000"],
			["y1", "+- t dy 0"],
			["y2", "+- b 0 dy"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y1"
			], [
				"l",
				"r",
				"t"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y2"
			], [
				"l",
				"r",
				"b"
			]]
		}]
	},
	textfaderight: {
		adj: [["adj", "val 33333"]],
		gd: [
			["a", "pin 0 adj 49999"],
			["dy", "*/ a h 100000"],
			["y1", "+- t dy 0"],
			["y2", "+- b 0 dy"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"l",
				"r",
				"y1"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"b"
			], [
				"l",
				"r",
				"y2"
			]]
		}]
	},
	textfadeup: {
		adj: [["adj", "val 33333"]],
		gd: [
			["a", "pin 0 adj 49999"],
			["dx", "*/ a w 100000"],
			["x1", "+- l dx 0"],
			["x2", "+- r 0 dx"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x1",
				"t"
			], [
				"l",
				"x2",
				"t"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"b"
			], [
				"l",
				"r",
				"b"
			]]
		}]
	},
	textinflate: {
		adj: [["adj", "val 18750"]],
		gd: [
			["a", "pin 0 adj 20000"],
			["dy", "*/ a h 100000"],
			["gd", "*/ dy 1 3"],
			["gd0", "+- 0 0 gd"],
			["gd1", "+- h 0 gd0"],
			["ty", "+- t dy 0"],
			["by", "+- b 0 dy"],
			["y0", "+- t gd0 0"],
			["y1", "+- t gd1 0"],
			["x0", "+- l wd3 0"],
			["x1", "+- r 0 wd3"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"ty"
			], [
				"C",
				"x0",
				"y0",
				"x1",
				"y0",
				"r",
				"ty"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"by"
			], [
				"C",
				"x0",
				"y1",
				"x1",
				"y1",
				"r",
				"by"
			]]
		}]
	},
	textinflatebottom: {
		adj: [["adj", "val 60000"]],
		gd: [
			["a", "pin 60000 adj 100000"],
			["dy", "*/ a h 100000"],
			["ty", "+- t dy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"l",
				"r",
				"t"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"ty"
			], [
				"Q",
				"hc",
				"b",
				"r",
				"ty"
			]]
		}]
	},
	textinflatetop: {
		adj: [["adj", "val 40000"]],
		gd: [
			["a", "pin 0 adj 50000"],
			["dy", "*/ a h 100000"],
			["ty", "+- t dy 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"ty"
			], [
				"Q",
				"hc",
				"t",
				"r",
				"ty"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"b"
			], [
				"l",
				"r",
				"b"
			]]
		}]
	},
	textplain: {
		adj: [["adj", "val 50000"]],
		gd: [
			["a", "pin 30000 adj 70000"],
			["mid", "*/ a w 100000"],
			["midDir", "+- mid 0 hc"],
			["dl", "+- mid 0 l"],
			["dr", "+- r 0 mid"],
			["dl2", "*/ dl 2 1"],
			["dr2", "*/ dr 2 1"],
			["dx", "?: midDir dr2 dl2"],
			["xr", "+- l dx 0"],
			["xl", "+- r 0 dx"],
			["tlx", "?: midDir l xl"],
			["trx", "?: midDir xr r"],
			["blx", "?: midDir xl l"],
			["brx", "?: midDir r xr"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"tlx",
				"t"
			], [
				"l",
				"trx",
				"t"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"blx",
				"b"
			], [
				"l",
				"brx",
				"b"
			]]
		}]
	},
	textringinside: {
		adj: [["adj", "val 60000"]],
		gd: [
			["a", "pin 50000 adj 99000"],
			["dy", "*/ a h 100000"],
			["y", "+- t dy 0"],
			["r", "*/ dy 1 2"],
			["y1", "+- t r 0"],
			["y2", "+- b 0 r"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y1"
			], [
				"a",
				"wd2",
				"r",
				"10800000",
				"21599999"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y2"
			], [
				"a",
				"wd2",
				"r",
				"10800000",
				"21599999"
			]]
		}]
	},
	textringoutside: {
		adj: [["adj", "val 60000"]],
		gd: [
			["a", "pin 50000 adj 99000"],
			["dy", "*/ a h 100000"],
			["y", "+- t dy 0"],
			["r", "*/ dy 1 2"],
			["y1", "+- t r 0"],
			["y2", "+- b 0 r"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y1"
			], [
				"a",
				"wd2",
				"r",
				"10800000",
				"-21599999"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y2"
			], [
				"a",
				"wd2",
				"r",
				"10800000",
				"-21599999"
			]]
		}]
	},
	textslantdown: {
		adj: [["adj", "val 44445"]],
		gd: [
			["a", "pin 28569 adj 100000"],
			["dy", "*/ a h 100000"],
			["y1", "+- t dy 0"],
			["y2", "+- b 0 dy"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"l",
				"r",
				"y2"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y1"
			], [
				"l",
				"r",
				"b"
			]]
		}]
	},
	textslantup: {
		adj: [["adj", "val 55555"]],
		gd: [
			["a", "pin 0 adj 71431"],
			["dy", "*/ a h 100000"],
			["y1", "+- t dy 0"],
			["y2", "+- b 0 dy"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"y1"
			], [
				"l",
				"r",
				"t"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"b"
			], [
				"l",
				"r",
				"y2"
			]]
		}]
	},
	textstop: {
		adj: [["adj", "val 25000"]],
		gd: [
			["a", "pin 14286 adj 50000"],
			["dx", "*/ w 1 3"],
			["dy", "*/ a h 100000"],
			["x1", "+- l dx 0"],
			["x2", "+- r 0 dx"],
			["y1", "+- t dy 0"],
			["y2", "+- b 0 dy"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y1"
				],
				[
					"l",
					"x1",
					"t"
				],
				[
					"l",
					"x2",
					"t"
				],
				[
					"l",
					"r",
					"y1"
				]
			]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y2"
				],
				[
					"l",
					"x1",
					"b"
				],
				[
					"l",
					"x2",
					"b"
				],
				[
					"l",
					"r",
					"y2"
				]
			]
		}]
	},
	texttriangle: {
		adj: [["adj", "val 50000"]],
		gd: [["a", "pin 0 adj 100000"], ["y", "*/ a h 100000"]],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y"
				],
				[
					"l",
					"hc",
					"t"
				],
				[
					"l",
					"r",
					"y"
				]
			]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"b"
			], [
				"l",
				"r",
				"b"
			]]
		}]
	},
	texttriangleinverted: {
		adj: [["adj", "val 50000"]],
		gd: [["a", "pin 0 adj 100000"], ["y", "*/ a h 100000"]],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"l",
				"t"
			], [
				"l",
				"r",
				"t"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"l",
					"y"
				],
				[
					"l",
					"hc",
					"b"
				],
				[
					"l",
					"r",
					"y"
				]
			]
		}]
	},
	textwave1: {
		adj: [["adj1", "val 12500"], ["adj2", "val 0"]],
		gd: [
			["a1", "pin 0 adj1 20000"],
			["a2", "pin -10000 adj2 10000"],
			["y1", "*/ h a1 100000"],
			["dy2", "*/ y1 10 3"],
			["y2", "+- y1 0 dy2"],
			["y3", "+- y1 dy2 0"],
			["y4", "+- b 0 y1"],
			["y5", "+- y4 0 dy2"],
			["y6", "+- y4 dy2 0"],
			["of", "*/ w a2 100000"],
			["of2", "*/ w a2 50000"],
			["x1", "abs of"],
			["dx2", "?: of2 0 of2"],
			["x2", "+- l 0 dx2"],
			["dx5", "?: of2 of2 0"],
			["x5", "+- r 0 dx5"],
			["dx3", "+/ dx2 x5 3"],
			["x3", "+- x2 dx3 0"],
			["x4", "+/ x3 x5 2"],
			["x6", "+- l dx5 0"],
			["x10", "+- r dx2 0"],
			["x7", "+- x6 dx3 0"],
			["x8", "+/ x7 x10 2"],
			["x9", "+- r 0 x1"],
			["xAdj", "+- hc of 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x2",
				"y1"
			], [
				"C",
				"x3",
				"y2",
				"x4",
				"y3",
				"x5",
				"y1"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x6",
				"y4"
			], [
				"C",
				"x7",
				"y5",
				"x8",
				"y6",
				"x10",
				"y4"
			]]
		}]
	},
	textwave2: {
		adj: [["adj1", "val 12500"], ["adj2", "val 0"]],
		gd: [
			["a1", "pin 0 adj1 20000"],
			["a2", "pin -10000 adj2 10000"],
			["y1", "*/ h a1 100000"],
			["dy2", "*/ y1 10 3"],
			["y2", "+- y1 0 dy2"],
			["y3", "+- y1 dy2 0"],
			["y4", "+- b 0 y1"],
			["y5", "+- y4 0 dy2"],
			["y6", "+- y4 dy2 0"],
			["of", "*/ w a2 100000"],
			["of2", "*/ w a2 50000"],
			["x1", "abs of"],
			["dx2", "?: of2 0 of2"],
			["x2", "+- l 0 dx2"],
			["dx5", "?: of2 of2 0"],
			["x5", "+- r 0 dx5"],
			["dx3", "+/ dx2 x5 3"],
			["x3", "+- x2 dx3 0"],
			["x4", "+/ x3 x5 2"],
			["x6", "+- l dx5 0"],
			["x10", "+- r dx2 0"],
			["x7", "+- x6 dx3 0"],
			["x8", "+/ x7 x10 2"],
			["x9", "+- r 0 x1"],
			["xAdj", "+- hc of 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x2",
				"y1"
			], [
				"C",
				"x3",
				"y3",
				"x4",
				"y2",
				"x5",
				"y1"
			]]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [[
				"m",
				"x6",
				"y4"
			], [
				"C",
				"x7",
				"y6",
				"x8",
				"y5",
				"x10",
				"y4"
			]]
		}]
	},
	textwave4: {
		adj: [["adj1", "val 6250"], ["adj2", "val 0"]],
		gd: [
			["a1", "pin 0 adj1 12500"],
			["a2", "pin -10000 adj2 10000"],
			["y1", "*/ h a1 100000"],
			["dy2", "*/ y1 10 3"],
			["y2", "+- y1 0 dy2"],
			["y3", "+- y1 dy2 0"],
			["y4", "+- b 0 y1"],
			["y5", "+- y4 0 dy2"],
			["y6", "+- y4 dy2 0"],
			["of", "*/ w a2 100000"],
			["of2", "*/ w a2 50000"],
			["x1", "abs of"],
			["dx2", "?: of2 0 of2"],
			["x2", "+- l 0 dx2"],
			["dx8", "?: of2 of2 0"],
			["x8", "+- r 0 dx8"],
			["dx3", "+/ dx2 x8 6"],
			["x3", "+- x2 dx3 0"],
			["dx4", "+/ dx2 x8 3"],
			["x4", "+- x2 dx4 0"],
			["x5", "+/ x2 x8 2"],
			["x6", "+- x5 dx3 0"],
			["x7", "+/ x6 x8 2"],
			["x9", "+- l dx8 0"],
			["x15", "+- r dx2 0"],
			["x10", "+- x9 dx3 0"],
			["x11", "+- x9 dx4 0"],
			["x12", "+/ x9 x15 2"],
			["x13", "+- x12 dx3 0"],
			["x14", "+/ x13 x15 2"],
			["x16", "+- r 0 x1"],
			["xAdj", "+- hc of 0"]
		],
		paths: [{
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x2",
					"y1"
				],
				[
					"C",
					"x3",
					"y3",
					"x4",
					"y2",
					"x5",
					"y1"
				],
				[
					"C",
					"x6",
					"y3",
					"x7",
					"y2",
					"x8",
					"y1"
				]
			]
		}, {
			w: null,
			h: null,
			fill: null,
			stroke: !0,
			extrusionOk: !0,
			cmds: [
				[
					"m",
					"x9",
					"y4"
				],
				[
					"C",
					"x10",
					"y6",
					"x11",
					"y5",
					"x12",
					"y4"
				],
				[
					"C",
					"x13",
					"y6",
					"x14",
					"y5",
					"x15",
					"y4"
				]
			]
		}]
	}
}, pt = Math.PI * 2 / 216e5, mt = ft, ht = /* @__PURE__ */ new Map();
function gt(e) {
	return e.toLowerCase() in mt;
}
function _t(e) {
	let t = ht.get(e);
	if (t) return t;
	let n = mt[e];
	return n ? (t = {
		adj: n.adj.map(([e, t]) => [e, _(t)]),
		gd: n.gd.map(([e, t]) => [e, _(t)]),
		paths: n.paths
	}, ht.set(e, t), t) : null;
}
var vt = 48;
function yt(e, t, n, r) {
	let i = e.w == null ? 1 : n / e.w, a = e.h == null ? 1 : r / e.h, o = (e) => e * i, s = (e) => e * a, c = [], l = 0, u = 0;
	for (let n of e.cmds) switch (n[0]) {
		case "m":
			l = o(t.resolve(n[1])), u = s(t.resolve(n[2])), c.push({
				x: l,
				y: u
			});
			break;
		case "l":
			l = o(t.resolve(n[1])), u = s(t.resolve(n[2])), c.push({
				x: l,
				y: u
			});
			break;
		case "C": {
			let e = o(t.resolve(n[1])), r = s(t.resolve(n[2])), i = o(t.resolve(n[3])), a = s(t.resolve(n[4])), d = o(t.resolve(n[5])), f = s(t.resolve(n[6]));
			for (let t = 1; t <= vt; t++) {
				let n = t / vt, o = 1 - n, s = o * o * o * l + 3 * o * o * n * e + 3 * o * n * n * i + n * n * n * d, p = o * o * o * u + 3 * o * o * n * r + 3 * o * n * n * a + n * n * n * f;
				c.push({
					x: s,
					y: p
				});
			}
			l = d, u = f;
			break;
		}
		case "Q": {
			let e = o(t.resolve(n[1])), r = s(t.resolve(n[2])), i = o(t.resolve(n[3])), a = s(t.resolve(n[4]));
			for (let t = 1; t <= vt; t++) {
				let n = t / vt, o = 1 - n, s = o * o * l + 2 * o * n * e + n * n * i, d = o * o * u + 2 * o * n * r + n * n * a;
				c.push({
					x: s,
					y: d
				});
			}
			l = i, u = a;
			break;
		}
		case "a": {
			let e = t.resolve(n[1]), r = t.resolve(n[2]), o = e * i, s = r * a, d = t.resolve(n[3]) * pt, f = t.resolve(n[4]) * pt, p = (t) => Math.atan2(e * Math.sin(t), r * Math.cos(t)), m = Math.PI * 2, h = p(d), g = Math.trunc(f / m), _ = f - g * m, v = p(d + _) - h;
			_ > 0 && v < 0 ? v += m : _ < 0 && v > 0 && (v -= m);
			let y = v + g * m, b = l - o * Math.cos(h), x = u - s * Math.sin(h), S = Math.max(vt, Math.ceil(Math.abs(y) / m * 96));
			for (let e = 1; e <= S; e++) {
				let t = h + y * e / S;
				c.push({
					x: b + o * Math.cos(t),
					y: x + s * Math.sin(t)
				});
			}
			l = b + o * Math.cos(h + y), u = x + s * Math.sin(h + y);
			break;
		}
		case "c": break;
	}
	return c;
}
function bt(e) {
	let t = [0];
	for (let n = 1; n < e.length; n++) {
		let r = e[n].x - e[n - 1].x, i = e[n].y - e[n - 1].y;
		t.push(t[n - 1] + Math.hypot(r, i));
	}
	return t;
}
function xt(e, t, n, r) {
	let i = _t(e.toLowerCase());
	if (!i || i.paths.length === 0) return null;
	let a = O({
		w: n,
		h: r,
		adj: t
	}, i.adj, i.gd), o = i.paths.length === 1, s = yt(i.paths[0], a, n, r), c = o ? s : yt(i.paths[i.paths.length - 1], a, n, r);
	return {
		top: s,
		bottom: c,
		topLen: bt(s),
		bottomLen: bt(c),
		singleEdge: o
	};
}
function St(e, t, n) {
	let r = t[t.length - 1];
	if (e.length === 1 || r === 0) return {
		x: e[0].x,
		y: e[0].y,
		tx: 1,
		ty: 0
	};
	let i = Math.max(0, Math.min(1, n)) * r, a = 0, o = t.length - 1;
	for (; a < o - 1;) {
		let e = a + o >> 1;
		t[e] <= i ? a = e : o = e;
	}
	let s = t[o] - t[a] || 1, c = (i - t[a]) / s, l = e[a], u = e[o], d = u.x - l.x, f = u.y - l.y, p = Math.hypot(d, f) || 1;
	return {
		x: l.x + d * c,
		y: l.y + f * c,
		tx: d / p,
		ty: f / p
	};
}
function Ct(e) {
	return e.topLen[e.topLen.length - 1] ?? 0;
}
function wt(e, t) {
	if (!e.singleEdge) return 1;
	let n = Ct(e);
	return n <= 0 ? 1 : Math.max(0, Math.min(1, t / n));
}
function Tt(e, t, n, r) {
	if (e.singleEdge) {
		let i = St(e.top, e.topLen, t), a = Math.atan2(i.ty, i.tx), o = i.ty, s = -i.tx, c = n * (1 - r);
		return {
			x: i.x - o * c,
			y: i.y - s * c,
			angle: a,
			vScale: 1,
			shear: 0
		};
	}
	let i = St(e.top, e.topLen, t), a = St(e.bottom, e.bottomLen, t), o = a.x - i.x, s = a.y - i.y, c = i.x + o * r, l = i.y + s * r, u = i.tx + a.tx, d = i.ty + a.ty, f = Math.atan2(d, u), p = Math.cos(f), m = Math.sin(f), h = (p * o + m * s) / (n > 0 ? n : 1), g = (-m * o + p * s) / (n > 0 ? n : 1);
	return {
		x: c,
		y: l,
		angle: f,
		vScale: g === 0 ? n > 0 ? Math.hypot(o, s) / n : 1 : g,
		shear: g === 0 ? 0 : h / g
	};
}
//#endregion
//#region packages/core/src/shape/scene3d-camera.ts
var Et = 26, Dt = {
	orthographicFront: {
		kind: "orthographic",
		baseLat: 0,
		baseLon: 0,
		baseRev: 0,
		fovDeg: 0
	},
	perspectiveFront: {
		kind: "perspective",
		baseLat: 0,
		baseLon: 0,
		baseRev: 0,
		fovDeg: Et
	},
	perspectiveRelaxed: {
		kind: "perspective",
		baseLat: 0,
		baseLon: 0,
		baseRev: 0,
		fovDeg: Et
	},
	perspectiveRelaxedModerately: {
		kind: "perspective",
		baseLat: 0,
		baseLon: 0,
		baseRev: 0,
		fovDeg: Et
	},
	perspectiveAbove: {
		kind: "perspective",
		baseLat: -20,
		baseLon: 0,
		baseRev: 0,
		fovDeg: Et
	},
	perspectiveBelow: {
		kind: "perspective",
		baseLat: 20,
		baseLon: 0,
		baseRev: 0,
		fovDeg: Et
	},
	perspectiveLeft: {
		kind: "perspective",
		baseLat: 0,
		baseLon: -20,
		baseRev: 0,
		fovDeg: Et
	},
	perspectiveRight: {
		kind: "perspective",
		baseLat: 0,
		baseLon: 20,
		baseRev: 0,
		fovDeg: Et
	}
};
function Ot(e, t) {
	let n = Array(9).fill(0);
	for (let r = 0; r < 3; r++) for (let i = 0; i < 3; i++) {
		let a = 0;
		for (let n = 0; n < 3; n++) a += e[r * 3 + n] * t[n * 3 + i];
		n[r * 3 + i] = a;
	}
	return n;
}
function kt(e) {
	let t = e * Math.PI / 180, n = Math.cos(t), r = Math.sin(t);
	return [
		1,
		0,
		0,
		0,
		n,
		-r,
		0,
		r,
		n
	];
}
function At(e) {
	let t = e * Math.PI / 180, n = Math.cos(t), r = Math.sin(t);
	return [
		n,
		0,
		r,
		0,
		1,
		0,
		-r,
		0,
		n
	];
}
function jt(e) {
	let t = e * Math.PI / 180, n = Math.cos(t), r = Math.sin(t);
	return [
		n,
		-r,
		0,
		r,
		n,
		0,
		0,
		0,
		1
	];
}
function Mt(e, t, n, r) {
	return [
		e[0] * t + e[1] * n + e[2] * r,
		e[3] * t + e[4] * n + e[5] * r,
		e[6] * t + e[7] * n + e[8] * r
	];
}
function Nt(e, t) {
	let n = t ? t.lat : e.baseLat, r = t ? t.lon : e.baseLon;
	return Ot(jt(-(t ? t.rev : e.baseRev)), Ot(kt(-n), At(-r)));
}
function Pt(e) {
	return Dt[e] || (e.startsWith("perspective") ? Dt.perspectiveFront : Dt.orthographicFront);
}
function Ft(e, t, n) {
	let r = Pt(e.prst), i = Nt(r, e.rot);
	if (t <= 0 || n <= 0) return {
		corners: [
			{
				x: 0,
				y: 0
			},
			{
				x: t,
				y: 0
			},
			{
				x: t,
				y: n
			},
			{
				x: 0,
				y: n
			}
		],
		isAffine: !0,
		isIdentity: !0
	};
	let a = t / 2, o = n / 2, s = [
		[-a, -o],
		[a, -o],
		[a, o],
		[-a, o]
	], c = e.zoom ?? 1, l = Math.max(a, o), u;
	if (r.kind === "perspective") {
		let t = e.fov ?? r.fovDeg, n = Math.max(1, Math.min(179, t)) * Math.PI / 180, a = l / Math.tan(n / 2);
		u = s.map(([e, t]) => {
			let [n, r, o] = Mt(i, e, t, 0), s = a - o, c = a / (Math.abs(s) < 1e-6 ? 1e-6 * Math.sign(s || 1) : s);
			return [n * c, r * c];
		});
	} else u = s.map(([e, t]) => {
		let [n, r] = Mt(i, e, t, 0);
		return [n, r];
	});
	u = u.map(([e, t]) => [e * c, t * c]);
	let d = u.map(([e, r]) => ({
		x: t / 2 + e,
		y: n / 2 + r
	})), f = .001 * Math.max(t, n), p = d[0].x + d[2].x - (d[1].x + d[3].x), m = d[0].y + d[2].y - (d[1].y + d[3].y), h = Math.abs(p) < f && Math.abs(m) < f, g = [
		[0, 0],
		[t, 0],
		[t, n],
		[0, n]
	], _ = !0;
	for (let e = 0; e < 4; e++) if (Math.abs(d[e].x - g[e][0]) > f || Math.abs(d[e].y - g[e][1]) > f) {
		_ = !1;
		break;
	}
	return {
		corners: d,
		isAffine: h,
		isIdentity: _
	};
}
function It(e) {
	let { isIdentity: t } = Ft(e, 1e3, 1e3);
	return !t;
}
function Lt(e, t, n, r) {
	let i = Pt(e.prst), a = Nt(i, e.rot);
	if (t <= 0 || n <= 0 || r === 0) return {
		x: 0,
		y: 0
	};
	let o = t / 2, s = n / 2, c = Math.max(o, s), l = e.zoom ?? 1, u = (t) => {
		let [n, r, o] = Mt(a, 0, 0, t);
		if (i.kind === "perspective") {
			let t = e.fov ?? i.fovDeg, a = Math.max(1, Math.min(179, t)) * Math.PI / 180, s = c / Math.tan(a / 2), u = s - o, d = s / (Math.abs(u) < 1e-6 ? 1e-6 * Math.sign(u || 1) : u);
			return [n * d * l, r * d * l];
		}
		return [n * l, r * l];
	}, [d, f] = u(0), [p, m] = u(-r);
	return {
		x: p - d,
		y: m - f
	};
}
//#endregion
//#region packages/core/src/shape/bevel-shading.ts
function Rt(e, t) {
	if (t <= 0) return () => 1;
	let n = (e) => Math.max(0, Math.min(1, e / t));
	switch (e) {
		case "hardEdge": {
			let e = Kt;
			return (t) => {
				let r = Math.min(1, n(t) / e);
				return r * r * (3 - 2 * r);
			};
		}
		case "angle":
		case "slope": return (e) => n(e);
		case "circle":
		case "convex":
		case "softRound": return (e) => {
			let t = 1 - n(e);
			return Math.sqrt(Math.max(0, 1 - t * t));
		};
		default: return (e) => {
			let t = n(e);
			return t * t * (3 - 2 * t);
		};
	}
}
function zt(e) {
	let t = e.length, n = new Float64Array(t);
	if (t === 0) return n;
	let r = new Int32Array(t), i = new Float64Array(t + 1), a = 0;
	r[0] = 0, i[0] = -Infinity, i[1] = Infinity;
	for (let n = 1; n < t; n++) {
		let t = (e[n] + n * n - (e[r[a]] + r[a] * r[a])) / (2 * n - 2 * r[a]);
		for (; t <= i[a];) a--, t = (e[n] + n * n - (e[r[a]] + r[a] * r[a])) / (2 * n - 2 * r[a]);
		a++, r[a] = n, i[a] = t, i[a + 1] = Infinity;
	}
	a = 0;
	for (let o = 0; o < t; o++) {
		for (; i[a + 1] < o;) a++;
		let t = o - r[a];
		n[o] = t * t + e[r[a]];
	}
	return n;
}
function Bt(e, t = 3) {
	if (e <= 0) return Array(t).fill(1);
	let n = Math.sqrt(12 * e * e / t + 1), r = Math.floor(n);
	r % 2 == 0 && r--;
	let i = r + 2, a = (12 * e * e - t * r * r - 4 * t * r - 3 * t) / (-4 * r - 4), o = Math.round(a), s = [];
	for (let e = 0; e < t; e++) s.push(e < o ? r : i);
	return s;
}
function Vt(e, t, n, r, i, a) {
	let o = 1 / (2 * i + 1);
	if (a) for (let a = 0; a < r; a++) {
		let r = a * n, s = 0;
		for (let t = 0; t <= i; t++) t < n && (s += e[r + t]);
		for (let a = 0; a < n; a++) {
			t[r + a] = s * o;
			let c = a + i + 1, l = a - i;
			c < n && (s += e[r + c]), l >= 0 && (s -= e[r + l]);
		}
	}
	else for (let a = 0; a < n; a++) {
		let s = 0;
		for (let t = 0; t <= i; t++) t < r && (s += e[t * n + a]);
		for (let c = 0; c < r; c++) {
			t[c * n + a] = s * o;
			let l = c + i + 1, u = c - i;
			l < r && (s += e[l * n + a]), u >= 0 && (s -= e[u * n + a]);
		}
	}
}
function Ht(e, t, n, r) {
	let i = Float64Array.from(e);
	if (r <= 0 || t <= 0 || n <= 0) return i;
	let a = new Float64Array(t * n);
	for (let e of Bt(r, 3)) {
		let r = Math.max(1, (e - 1) / 2);
		Vt(i, a, t, n, r, !0), Vt(a, i, t, n, r, !1);
	}
	return i;
}
function Ut(e, t, n, r = 128) {
	let i = new Float64Array(t * n);
	for (let a = 0; a < t * n; a++) i[a] = (e[a] ?? 0) >= r ? 0x56bc75e2d63100000 : 0;
	let a = new Float64Array(n);
	for (let e = 0; e < t; e++) {
		for (let r = 0; r < n; r++) a[r] = i[r * t + e];
		let r = zt(a);
		for (let a = 0; a < n; a++) i[a * t + e] = r[a];
	}
	let o = new Float64Array(t);
	for (let e = 0; e < n; e++) {
		for (let n = 0; n < t; n++) o[n] = i[e * t + n];
		let n = zt(o);
		for (let r = 0; r < t; r++) i[e * t + r] = n[r];
	}
	for (let e = 0; e < n; e++) for (let r = 0; r < t; r++) {
		let a = e * t + r;
		if (i[a] === 0) continue;
		let o = (e + 1) * (e + 1), s = (n - e) * (n - e), c = (r + 1) * (r + 1), l = (t - r) * (t - r), u = Math.min(o, s, c, l);
		u < i[a] && (i[a] = u);
	}
	for (let e = 0; e < t * n; e++) i[e] = Math.sqrt(i[e]);
	return i;
}
var Wt = .25, Gt = .35, Kt = .5;
function qt(e, t, n, r, i, a) {
	let o = new Float32Array(t * n * 3), s = new Uint8Array(t * n), c = new Float32Array(t * n);
	if (t <= 0 || n <= 0) return {
		normals: o,
		bandMask: s,
		bandWeight: c
	};
	let l = Ut(e, t, n), u = Rt(i, r), d = (n, r) => (e[r * t + n] ?? 0) >= 128, f = (r > 0 ? a / r : 0) * r, p = Ht(l, t, n, Math.max(1, r * Wt)), m = (e) => {
		let t = u(Math.max(0, e - .5));
		return u(e + .5) - t;
	};
	for (let e = 0; e < n; e++) for (let i = 0; i < t; i++) {
		let a = e * t + i;
		if (!d(i, e)) {
			o[a * 3 + 2] = 1;
			continue;
		}
		let u = l[a], h = u > 0 && u < r;
		if (s[a] = +!!h, !h) {
			o[a * 3 + 2] = 1;
			continue;
		}
		let g = u / r, _ = 1 - Gt, v = 1;
		if (g > _) {
			let e = Math.min(1, (g - _) / Gt);
			v = 1 - e * e * (3 - 2 * e);
		}
		c[a] = v;
		let y = i > 0 ? i - 1 : i, b = i < t - 1 ? i + 1 : i, x = e > 0 ? e - 1 : e, S = e < n - 1 ? e + 1 : e, C = (p[e * t + b] - p[e * t + y]) / (b - y || 1), w = (p[S * t + i] - p[x * t + i]) / (S - x || 1), T = Math.hypot(C, w), E = 0, D = 0;
		T > 1e-9 && (E = -C / T, D = -w / T);
		let O = m(u) * f, k = O * E, A = O * D, j = 1, M = Math.hypot(k, A, j) || 1;
		k /= M, A /= M, j /= M, o[a * 3] = k, o[a * 3 + 1] = A, o[a * 3 + 2] = j;
	}
	return {
		normals: o,
		bandMask: s,
		bandWeight: c
	};
}
var Jt = 35 * Math.PI / 180, Yt = 12 * Math.PI / 180, Xt = {
	t: {
		x: 0,
		y: -1
	},
	b: {
		x: 0,
		y: 1
	},
	l: {
		x: -1,
		y: 0
	},
	r: {
		x: 1,
		y: 0
	},
	tl: {
		x: -1,
		y: -1
	},
	tr: {
		x: 1,
		y: -1
	},
	bl: {
		x: -1,
		y: 1
	},
	br: {
		x: 1,
		y: 1
	}
};
function Zt(e, t, n) {
	let r = n * Math.PI / 180, i = Math.cos(r), a = Math.sin(r);
	return {
		x: e * i - t * a,
		y: e * a + t * i
	};
}
function Qt(e, t, n) {
	let r = Xt[t] ?? Xt.t;
	return n && n.rev && (r = Zt(r.x, r.y, n.rev)), en(r.x, r.y, Jt);
}
function $t(e) {
	let t = Math.hypot(e.x, e.y) || 1;
	return en(-e.x / t, -e.y / t, Yt);
}
function en(e, t, n) {
	let r = Math.hypot(e, t) || 1, i = Math.cos(n), a = Math.sin(n), o = e / r * i, s = t / r * i, c = a, l = Math.hypot(o, s, c) || 1;
	return {
		x: o / l,
		y: s / l,
		z: c / l
	};
}
var tn = 2, nn = {
	matte: {
		ambient: .62,
		diffuse: .45,
		specular: 0,
		shininess: 8
	},
	plastic: {
		ambient: .55,
		diffuse: .5,
		specular: .35,
		shininess: 22
	}
}, rn = .8;
function an(e) {
	switch (e) {
		case "plastic":
		case "metal":
		case "clear":
		case "softEdge":
		case "shiny":
		case "softmetal": return "plastic";
		default: return "matte";
	}
}
function on(e, t, n = !0) {
	let r = nn[e], i = {
		light: t,
		material: e,
		ambient: r.ambient,
		diffuse: r.diffuse,
		specular: r.specular,
		shininess: r.shininess
	};
	return n && (i.fillLight = $t(t), i.fillDiffuse = i.diffuse * rn), i;
}
function sn(e, t) {
	let n = e.x * t.light.x + e.y * t.light.y + e.z * t.light.z, r = t.diffuse * Math.max(0, n), i = 0;
	if (t.fillLight && t.fillDiffuse) {
		let n = e.x * t.fillLight.x + e.y * t.fillLight.y + e.z * t.fillLight.z;
		i = t.fillDiffuse * Math.max(0, n);
	}
	let a = 0;
	if (t.specular > 0) {
		let n = t.light.x, r = t.light.y, i = t.light.z + 1, o = Math.hypot(n, r, i) || 1, s = (e.x * n + e.y * r + e.z * i) / o;
		a = t.specular * Math.max(0, s) ** +t.shininess;
	}
	return Math.max(0, t.ambient + r + i + a);
}
function cn(e, t, n) {
	if (!e) return {
		x: 0,
		y: 0,
		w: t,
		h: n
	};
	let r = Math.max(0, Math.floor(e.x)), i = Math.max(0, Math.floor(e.y)), a = Math.min(t, Math.ceil(e.x + e.w)), o = Math.min(n, Math.ceil(e.y + e.h));
	return {
		x: r,
		y: i,
		w: Math.max(0, a - r),
		h: Math.max(0, o - i)
	};
}
function ln(e, t, n) {
	let r = e.canvas.width, i = e.canvas.height;
	if (r <= 0 || i <= 0) return;
	let a = t.widthPx;
	if (a < .75) return;
	let { x: o, y: s, w: c, h: l } = cn(n, r, i);
	if (c <= 0 || l <= 0) return;
	let u = e.getImageData(o, s, c, l), d = u.data, f = new Uint8ClampedArray(c * l);
	for (let e = 0; e < c * l; e++) f[e] = d[e * 4 + 3];
	let { bandMask: p, bandWeight: m, normals: h } = qt(f, c, l, a, t.prst, t.heightPx), g = on(t.material, t.light), _ = sn({
		x: 0,
		y: 0,
		z: 1
	}, g) || 1;
	for (let e = 0; e < c * l; e++) {
		if (p[e] === 0) continue;
		let n = m[e];
		if (n <= 0) continue;
		let r = h[e * 3], i = h[e * 3 + 1], a = h[e * 3 + 2];
		t.bottom && (r = -r, i = -i);
		let o = 1 + (sn({
			x: r,
			y: i,
			z: a
		}, g) / _ - 1) * n, s = e * 4;
		if (o >= 1) {
			let e = Math.min(1, (o - 1) * tn);
			for (let t = 0; t < 3; t++) {
				let n = Math.min(255, d[s + t] * o);
				d[s + t] = n + (255 - n) * e;
			}
		} else d[s] = Math.max(0, d[s] * o), d[s + 1] = Math.max(0, d[s + 1] * o), d[s + 2] = Math.max(0, d[s + 2] * o);
	}
	e.putImageData(u, o, s);
}
function un(e, t, n) {
	let r = e.canvas.width, i = e.canvas.height;
	if (r <= 0 || i <= 0) return;
	let a = t.offsetX, o = t.offsetY, s = Math.hypot(a, o);
	if (s < .75) return;
	let { x: c, y: l, w: u, h: d } = cn(n, r, i);
	if (u <= 0 || d <= 0) return;
	let f = e.getImageData(c, l, u, d), p = f.data, m = new Uint8ClampedArray(u * d);
	for (let e = 0; e < u * d; e++) m[e] = p[e * 4 + 3];
	let h = Math.max(1, Math.ceil(s)), [g, _, v] = t.rgb;
	for (let e = 0; e < d; e++) for (let t = 0; t < u; t++) {
		let n = e * u + t;
		if (m[n] >= 128) continue;
		let r = !1;
		for (let n = 1; n <= h; n++) {
			let i = n / h, s = Math.round(t - a * i), c = Math.round(e - o * i);
			if (!(s < 0 || c < 0 || s >= u || c >= d) && m[c * u + s] >= 128) {
				r = !0;
				break;
			}
		}
		if (!r) continue;
		let i = n * 4;
		p[i] = g, p[i + 1] = _, p[i + 2] = v, p[i + 3] = 255;
	}
	e.putImageData(f, c, l);
}
//#endregion
//#region packages/core/src/text/underline.ts
function dn(e, t, n, r, i, a, o, s = 1, c) {
	let l = c == null ? Math.max(1, i * .05) : Math.max(0, c), u = o === "heavy" || (o?.endsWith("Heavy") ?? !1) ? l * 1.8 : l, d = n + Math.max(2, u), f = q(d, u, s);
	if (e.strokeStyle = a, e.lineWidth = u, e.setLineDash([]), o && o.startsWith("wavy")) {
		let n = u, i = u * 6;
		e.beginPath(), e.moveTo(t, d);
		let a = Math.max(1, u * .5);
		for (let o = 0; o <= r; o += a) {
			let r = d + Math.sin(o / i * Math.PI * 2) * n;
			e.lineTo(t + o, r);
		}
		if (e.stroke(), o === "wavyDbl") {
			e.beginPath(), e.moveTo(t, d + n * 2.5);
			for (let o = 0; o <= r; o += a) {
				let r = d + n * 2.5 + Math.sin(o / i * Math.PI * 2) * n;
				e.lineTo(t + o, r);
			}
			e.stroke();
		}
		return;
	}
	if (o === "dbl") {
		let n = u * 1.4, i = d - n / 2, a = d + n / 2;
		e.beginPath(), e.moveTo(t, i + q(i, u, s)), e.lineTo(t + r, i + q(i, u, s)), e.moveTo(t, a + q(a, u, s)), e.lineTo(t + r, a + q(a, u, s)), e.stroke();
		return;
	}
	e.setLineDash(Ce(o ?? "sng", u)), e.beginPath(), e.moveTo(t, d + f), e.lineTo(t + r, d + f), e.stroke(), e.setLineDash([]);
}
//#endregion
//#region packages/core/src/text/highlight-box.ts
function fn(e, t) {
	return {
		top: e - t * .85,
		height: t * 1.1
	};
}
//#endregion
//#region packages/core/src/text/justify-positions.ts
function pn(e, t, n, r, i = 0) {
	let a = [], o = 0, s = 0;
	for (let c of t) a.push({
		text: e.slice(o, c).join(""),
		dx: r(e.slice(0, o).join("")) + o * i + s * n
	}), o = c, s++;
	return a.push({
		text: e.slice(o).join(""),
		dx: r(e.slice(0, o).join("")) + o * i + s * n
	}), a;
}
//#endregion
//#region packages/pptx/src/types.ts
function mn(e) {
	return e;
}
//#endregion
//#region packages/pptx/src/reflection-blur.ts
var hn = .5;
function gn(e, t) {
	if (!(t > 0) || !(e.h > 0)) return [{
		y: e.y,
		h: Math.max(0, e.h),
		radius: 0
	}];
	let n = Math.max(4, Math.min(24, Math.ceil(t / hn) + 1)), r = e.y + e.h, i = [];
	for (let a = 0; a < n; a++) {
		let o = Math.sqrt(a / (n - 1)), s = a === 0 ? 0 : Math.sqrt((a - 1) / (n - 1)), c = a === n - 1 ? 1 : Math.sqrt((a + 1) / (n - 1)), l = a === 0 ? 0 : (s + o) / 2, u = a === n - 1 ? 1 : (o + c) / 2, d = r - u * e.h;
		i.push({
			y: d,
			h: (u - l) * e.h,
			radius: t * a / (n - 1)
		});
	}
	return i;
}
function _n(e, t, n, r, i) {
	for (let a of gn(n, r)) e.save(), e.beginPath(), e.rect(0, a.y, i, a.h), e.clip(), e.filter = a.radius > 0 ? `blur(${a.radius}px)` : "none", e.drawImage(t, 0, 0), e.restore();
}
//#endregion
//#region packages/pptx/src/hyperlink.ts
function vn(e, t) {
	let n = e !== void 0 && e !== "" ? e : void 0, r = t !== void 0 && t !== "" ? t : void 0;
	if (n === void 0 && r === void 0) return;
	if (r !== void 0) return {
		kind: "internal",
		ref: n ?? r
	};
	let i = n, a = Ye(i);
	return a !== null && Xe.includes(a) ? {
		kind: "external",
		url: i
	} : {
		kind: "internal",
		ref: i
	};
}
//#endregion
//#region packages/pptx/src/media-chrome.ts
function yn(e, t, n, r, i, a) {
	let o = Math.max(18, Math.min(32, Math.min(r, i) * .25));
	if (e.save(), e.shadowColor = "rgba(0, 0, 0, 0.3)", e.shadowBlur = o * .35, e.fillStyle = "rgba(20, 20, 20, 0.7)", e.beginPath(), e.arc(t, n, o, 0, Math.PI * 2), e.fill(), e.shadowColor = "transparent", e.shadowBlur = 0, e.fillStyle = "#fff", a === "paused") {
		e.beginPath();
		let r = o * .48;
		e.moveTo(t - r * .4, n - r), e.lineTo(t - r * .4, n + r), e.lineTo(t + r * .75, n), e.closePath(), e.fill();
	} else {
		let r = o * .2, i = o * .8, a = o * .15;
		e.fillRect(t - a - r, n - i / 2, r, i), e.fillRect(t + a, n - i / 2, r, i);
	}
	e.restore();
}
//#endregion
//#region packages/pptx/src/bidi-line.ts
var bn = { isTab: (e) => "isTab" in e }, xn = (e) => M(e), Sn = (e, t) => I(e, t, bn), Cn = (e) => /\s/.test(String.fromCodePoint(e));
function wn(e, t, n, r, i) {
	if (r === "just" && i) return null;
	let a = t - n;
	if (a <= .5) return null;
	let o = J(e, a, {
		firstContentSi: 0,
		lastDrawnSi: e.length,
		isGapChar: V,
		isWhitespace: Cn,
		seaClusterGaps: r === "thaiDist"
	});
	if (!o) return null;
	let { perGap: s, perSeg: c } = o, l = [];
	for (let t = 0; t < e.length; t++) {
		let n = e[t], r = c.get(t), i = r?.trailingGap ? s : 0, a = r?.splitBefore;
		a && a.length > 0 ? l.push({
			...n,
			jext: i,
			splitBefore: [...a],
			perGap: s
		}) : l.push({
			...n,
			jext: i
		});
	}
	return l;
}
//#endregion
//#region packages/pptx/src/table-border-conflict.ts
function Tn(e) {
	if (!e) return {
		r: 0,
		g: 0,
		b: 0
	};
	let t = e.replace(/^#/, "");
	return t.length < 6 || /[^0-9a-fA-F]/.test(t.slice(0, 6)) ? {
		r: 0,
		g: 0,
		b: 0
	} : {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	};
}
function En(e) {
	let t = Tn(e);
	return .299 * t.r + .587 * t.g + .114 * t.b;
}
function Dn(e, t) {
	if (!e && !t) return null;
	if (!e) return t;
	if (!t) return e;
	if (e.width !== t.width) return e.width > t.width ? e : t;
	let n = En(e.color), r = En(t.color);
	return n === r || n < r ? e : t;
}
//#endregion
//#region packages/pptx/src/smartart-fallback-contrast.ts
function On(e) {
	let t = Pe(e.length === 8 ? e.slice(0, 6) : e);
	if (!t) return null;
	let n = Re(t[0], t[1], t[2]);
	if (e.length !== 8) return n;
	let r = Number.parseInt(e.slice(6, 8), 16);
	if (Number.isNaN(r)) return null;
	let i = r / 255;
	return i * n + (1 - i);
}
function kn(e) {
	if (!e) return null;
	if (e.fillType === "solid") return On(e.color);
	if (e.fillType === "gradient") {
		let t = e.stops.map((e) => ({
			p: Math.min(1, Math.max(0, e.position)),
			l: On(e.color)
		})).filter((e) => e.l !== null).sort((e, t) => e.p - t.p);
		if (t.length === 0) return null;
		let n = t[0], r = t[t.length - 1], i = n.l * n.p + r.l * (1 - r.p);
		for (let e = 0; e + 1 < t.length; e++) i += (t[e].l + t[e + 1].l) / 2 * (t[e + 1].p - t[e].p);
		return i;
	}
	return null;
}
function An(e) {
	return e.name === "SmartArt" && e.id === void 0;
}
function jn(e, t) {
	let n = kn(e);
	if (n === null || n >= .5) return null;
	let r = On(t.replace(/^#/, ""));
	return r !== null && r >= .5 ? null : "#FFFFFF";
}
//#endregion
//#region packages/pptx/src/tab-layout.ts
function Mn(e, t, n, r, i, a = 0) {
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
//#region packages/pptx/src/powerpoint-line-metrics.ts
var Nn = {
	palatino: "Palatino Linotype",
	helvetica: "Arial",
	"helvetica neue": "Arial"
}, Pn = /* @__PURE__ */ new Map();
function Fn(e, t, n) {
	let r = `${e.trim().toLocaleLowerCase("en-US")}|${t ? 700 : 400}|${n ? "i" : "n"}`, i = Pn.get(r);
	if (i !== void 0) return Pn.delete(r), Pn.set(r, i), i ?? void 0;
	let a = Ln(e, t, n);
	if (Pn.set(r, a ?? null), Pn.size > 256) {
		let e = Pn.keys().next().value;
		e !== void 0 && Pn.delete(e);
	}
	return a;
}
function In(e, t, n) {
	let r = e.trim();
	if (!r) return [];
	let i = Nn[r.toLocaleLowerCase("en-US")] ?? r, a = n ? "italic" : "normal", o = U(i, {
		weight: t ? 700 : 400,
		style: a
	});
	if (o.length === 0) {
		let e = U(i, { style: a });
		e.length > 0 && e.every((t) => t.weight === e[0].weight) && (o = e);
	}
	let s = o.filter((e) => e.source === "macos-supplemental");
	return s.length > 0 ? s : o.filter((e) => e.source === "office-mac");
}
function Ln(e, t, n) {
	let r = In(e, t, n);
	if (r.length === 0) return;
	let i;
	for (let e of r) {
		let t;
		if (e.typoMetrics) {
			let [n, r, i] = e.typoMetrics, a = n + Math.max(0, i);
			t = a / (a - r);
		} else if (e.win) {
			let [n, r] = e.win;
			t = n / (n + r);
		}
		if (t === void 0 || !Number.isFinite(t) || t <= 0 || t >= 1 || i !== void 0 && Math.abs(i - t) > 1e-12) return;
		i = t;
	}
	return i;
}
function Rn(e, t, n) {
	let r = In(e, t, n);
	if (r.length === 0) return;
	let i;
	for (let e of r) {
		let t;
		if (e.typoMetrics) {
			let [n, r, i] = e.typoMetrics;
			t = {
				ascent: (n + Math.max(0, i)) / e.unitsPerEm,
				descent: -r / e.unitsPerEm
			};
		} else if (e.win) {
			let [n, r] = e.win;
			t = {
				ascent: n / e.unitsPerEm,
				descent: r / e.unitsPerEm
			};
		}
		if (t === void 0 || !(e.unitsPerEm > 0)) return;
		let n = t.ascent / (t.ascent + t.descent);
		if (!Number.isFinite(n) || n <= 0 || n >= 1 || i && (Math.abs(i.ascent - t.ascent) > 1e-12 || Math.abs(i.descent - t.descent) > 1e-12)) return;
		i = t;
	}
	return i;
}
function zn(e, t, n) {
	let r;
	for (let i of In(e, t, n)) {
		if (i.farEastCodePage == null || !i.win) return;
		let e = B({
			faceSource: i.source === "macos-supplemental" ? "system" : "office-bundle",
			unitsPerEm: i.unitsPerEm,
			hhea: i.hhea,
			win: i.win,
			typoMetrics: i.typoMetrics,
			farEastCodePage: i.farEastCodePage
		});
		if (!e || r && (r.ascent !== e.ascentRatio || r.descent !== e.descentRatio)) return;
		r = {
			ascent: e.ascentRatio,
			descent: e.descentRatio
		};
	}
	return r;
}
var Bn = /* @__PURE__ */ new Map();
function Vn(e, t, n) {
	let r = `${e.trim().toLocaleLowerCase("en-US")}|${t ? 700 : 400}|${n ? "i" : "n"}`, i = Bn.get(r);
	if (i !== void 0) return Bn.delete(r), Bn.set(r, i), i ?? void 0;
	let a = Fn(e, t, n), o = a === void 0 ? null : Object.freeze({
		share: a,
		glyph: Rn(e, t, n),
		excel: zn(e, t, n)
	});
	if (Bn.set(r, o), Bn.size > 256) {
		let e = Bn.keys().next().value;
		e !== void 0 && Bn.delete(e);
	}
	return o ?? void 0;
}
function Hn(e) {
	let t = 0, n = 0, r = 0;
	for (let i of e) t = Math.max(t, i.sizePx), n = Math.max(n, 1.2 * i.sizePx * i.share), r = Math.max(r, 1.2 * i.sizePx * (1 - i.share));
	let i = 1.2 * t;
	if (!(n + r > 0)) return {
		ascent: i * .8,
		descent: i * .2
	};
	let a = i * n / (n + r);
	return {
		ascent: a,
		descent: i - a
	};
}
function Un(e) {
	return Math.floor(e + .5);
}
function Wn(e) {
	let t = 0, n = 0;
	for (let r of e) t = Math.max(t, r.box.ascent * r.sizePx), n = Math.max(n, r.box.descent * r.sizePx);
	return {
		ascent: t,
		descent: n
	};
}
var Gn = .72;
function Kn(e, t) {
	return t ? e.face.excel : e.face.glyph;
}
function qn(e, t, n, r) {
	if (t.length === 0) return;
	let i = [];
	for (let e of t) {
		let t = Kn(e, n);
		if (!t) return;
		i.push({
			ascent: t.ascent * e.sizePx,
			descent: t.descent * e.sizePx
		});
	}
	if (!n) {
		let n = 0;
		for (let e of t) n = Math.max(n, e.sizePx);
		let i = 1.2 * n;
		if (e === "t") return {
			ascent: 0,
			descent: i
		};
		if (e === "ctr") return {
			ascent: i / 2,
			descent: i / 2
		};
		let a = Hn(t.map((e) => ({
			sizePx: e.sizePx,
			share: e.face.share
		}))), o = (i - Math.round(a.ascent / r) * r) / 2;
		return {
			ascent: i - o,
			descent: o
		};
	}
	if (e === "b") {
		let e = 0, t = 0;
		for (let n of i) e = Math.max(e, n.ascent + n.descent / 2), t = Math.max(t, n.descent / 2);
		return {
			ascent: e,
			descent: t
		};
	}
	let a = 0;
	for (let e of i) a = Math.max(a, e.ascent + e.descent);
	return e === "t" ? {
		ascent: 0,
		descent: a
	} : {
		ascent: a / 2,
		descent: a / 2
	};
}
function Jn(e, t, n, r) {
	let i = Kn(t, n);
	if (!i) return;
	let a = i.ascent * t.sizePx, o = i.descent * t.sizePx;
	if (e === "b") return -Math.round(o / 2 / r) * r;
	let s = e === "t" ? a : (a - o) / 2;
	return Math.round(s / r) * r;
}
//#endregion
//#region packages/pptx/src/vertical-text.ts
var Yn = () => !1;
function Xn(e, t, n) {
	let r = e.textBaseline;
	e.textBaseline = "alphabetic";
	let i = e.measureText(t);
	e.textBaseline = r;
	let a = i.fontBoundingBoxAscent, o = i.fontBoundingBoxDescent;
	return typeof a == "number" && typeof o == "number" && (a !== 0 || o !== 0) ? (a - o) / 2 : .38 * n;
}
function Zn(e, t) {
	let n = e.textAlign, r = e.textBaseline;
	e.textAlign = "center", e.textBaseline = "middle";
	let i = e.measureText(t);
	e.textAlign = n, e.textBaseline = r;
	let a = i.actualBoundingBoxAscent, o = i.actualBoundingBoxDescent;
	return typeof a == "number" && typeof o == "number" ? (a - o) / 2 : 0;
}
function Qn(e, t, n, r, i, a, o = "fill", s = Yn) {
	let c = e.textAlign, l = e.textBaseline, u = o === "stroke" ? e.strokeText.bind(e) : e.fillText.bind(e), d = r - Xn(e, t, i), f = 0;
	for (let o of t) {
		let t = o.codePointAt(0) ?? 0, l = F(t), p = e.measureText(o).width + a, m = l === "Tr" ? G(t) : null, h = l === "Tr" && m === null && z(t), g = l === "U" || l === "Tu" || m !== null || h;
		if (H(t) && s(t)) {
			let t = n + f + p / 2;
			e.save(), e.translate(t, d), e.rotate(-Math.PI / 2), e.textAlign = "center", e.textBaseline = "middle", N(e, () => u(o, 0, 0)), e.restore();
		} else if (g) {
			let r = m === null && l === "Tu" ? P(t) : null, a = m === null ? r : m, s = a === null ? o : String.fromCodePoint(a), c = n + f + p / 2, h = r === null ? Zn(e, s) / i : 0;
			e.save(), e.translate(c, d), e.rotate(-Math.PI / 2), e.textAlign = "center", e.textBaseline = "middle", u(s, 0, h * i), e.restore();
		} else if (l === "Tr") {
			let t = n + f + p / 2;
			e.textAlign = "center", e.textBaseline = "middle", u(o, t, d);
		} else e.textAlign = c, e.textBaseline = "alphabetic", u(o, n + f, r);
		f += p;
	}
	e.textAlign = c, e.textBaseline = l;
}
function $n(e, t, n, r, i, a, o = "fill") {
	Qn(e, t, n, r, i, a, o, (t) => W(e, t));
}
//#endregion
//#region packages/core/src/drawingml-text/measure.ts
var er = /* @__PURE__ */ new WeakMap();
function tr(e) {
	let t = 0;
	for (let n of e) t++;
	return t;
}
function nr(e) {
	let t = er.get(e);
	if (t !== void 0) return t;
	let n = e, r = n.letterSpacing;
	if (typeof r != "string") return er.set(e, !1), !1;
	let i = !1;
	try {
		n.letterSpacing = "0px";
		let t = e.measureText("ii").width;
		n.letterSpacing = "1px";
		let r = e.measureText("ii").width;
		i = Number.isFinite(t) && Number.isFinite(r) && r !== t;
	} catch {
		i = !1;
	} finally {
		try {
			n.letterSpacing = r;
		} catch {}
	}
	return er.set(e, i), i;
}
function rr(e, t, n = 0) {
	let r = e, i = r.letterSpacing;
	if (n !== 0 && nr(e)) try {
		r.letterSpacing = `${n}px`;
		let i = e.measureText(t).width;
		if (Number.isFinite(i)) return t.length > 0 ? i - n : i;
	} finally {
		try {
			r.letterSpacing = i;
		} catch {}
	}
	return e.measureText(t).width + n * Math.max(0, tr(t) - 1);
}
//#endregion
//#region packages/pptx/src/stacked-text.ts
function ir(e, t) {
	let n = t.lineMetric?.glyph ?? (t.faceFamily ? st(t.faceFamily, /\bbold\b/.test(t.font), /\bitalic\b/.test(t.font)) : void 0);
	if (n) return n;
	e.font = t.font;
	let r = e.measureText("M"), i = t.sizePx || 1, a = r.fontBoundingBoxAscent, o = r.fontBoundingBoxDescent;
	return Number.isFinite(a) && Number.isFinite(o) && a + o > 0 ? {
		ascent: a / i,
		descent: o / i
	} : {
		ascent: .9,
		descent: .25
	};
}
function ar(e) {
	let t = /* @__PURE__ */ new Map();
	return (n, r) => {
		let i = t.get(r);
		i || (i = ir(e, r), t.set(r, i));
		let a = r.faceFamily ?? "", o = it(a) ?? i.ascent + i.descent, s = lt * o * r.sizePx, c = r.faceFamilyLatin ?? a, l = r.lineMetricLatin?.glyph ?? st(c, /\bbold\b/.test(r.font), /\bitalic\b/.test(r.font)), u = c === a ? o : it(c) ?? (l ? l.ascent + l.descent : o), d = Math.max(s, lt * u * r.sizePx), f = r.letterSpacingPx ?? 0, p = [], m = 0, h = j(n);
		h.push(n.length);
		for (let t of h) {
			let o = n.slice(m, t);
			if (m = t, !o) continue;
			let c = o.codePointAt(0) ?? 0, l = "upright", u = s;
			tt(c) && (Qe(a, c) ? (l = "verticalGlyph", u = r.sizePx) : (l = "rotated", e.font = r.font, u = e.measureText(o).width)), p.push({
				text: o,
				style: r,
				kind: l,
				advance: u + f,
				thickness: d,
				space: o === " ",
				box: i,
				cell: s
			});
		}
		return p;
	};
}
function or(e, t) {
	let n = ar(e), r = at(t.paragraphs.map((e) => ({
		runs: e.runs.map((e) => e.type === "object" && e.style.math ? {
			...e,
			width: e.style.math.ascent + e.style.math.descent
		} : e),
		alignment: e.alignment,
		lineSpacing: e.lineSpacing,
		spaceBefore: e.spaceBefore,
		spaceAfter: e.spaceAfter,
		emptyThickness: n("M", e.markStyle)[0].thickness,
		eastAsianLineBreak: e.eastAsianLineBreak
	})), {
		direction: t.vert,
		rect: t.rect,
		anchor: t.anchor,
		anchorCtr: t.anchorCtr,
		wrap: t.wrap,
		spcFirstLastPara: t.spcFirstLastPara,
		lnSpcReduction: t.lnSpcReduction,
		pxPerPt: t.pxPerPt,
		glyphs: n,
		sameStyle: t.sameStyle,
		objectGlyph: ({ style: e }) => {
			if (!e.math || !t.drawObject) throw Error("Missing stacked equation adapter");
			let n = e.math.ascent + e.math.descent;
			return {
				text: "",
				style: e,
				kind: "upright",
				advance: n,
				thickness: e.math.width,
				space: !1,
				box: {
					ascent: 0,
					descent: 0
				},
				cell: n
			};
		}
	}), i = [], a = e.textAlign, o = e.textBaseline;
	for (let n of r.glyphs) {
		let r = n, { style: a, box: o } = r;
		if (a.math) {
			t.drawObject(a, n.axisX - r.thickness / 2, n.cellTop);
			continue;
		}
		let s = a.sizePx;
		if (i.push({
			text: r.text,
			font: a.font,
			fontSize: s,
			x: n.axisX - r.thickness / 2,
			y: n.cellTop,
			w: r.thickness,
			h: r.advance,
			...a.hyperlink ? { hyperlink: a.hyperlink } : {}
		}), r.space || a.noFill) continue;
		e.font = a.font, e.fillStyle = a.color;
		let c = r.text.codePointAt(0) ?? 0;
		if (r.kind === "upright") e.textAlign = "center", e.textBaseline = "alphabetic", e.fillText(r.text, n.axisX, n.cellTop + r.cell - o.descent * s);
		else if (r.kind === "verticalGlyph") {
			let t = String.fromCodePoint(c) === r.text ? P(c) ?? G(c) : null, i = n.axisX - (o.ascent + o.descent) * s / 2;
			t === null ? (e.save(), e.translate(i + s / 2, n.cellTop + s / 2), e.rotate(Math.PI / 2), e.textAlign = "center", e.textBaseline = "middle", e.fillText(r.text, 0, 0), e.restore()) : (e.textAlign = "left", e.textBaseline = "alphabetic", e.fillText(String.fromCodePoint(t), i, n.cellTop + o.ascent * s));
		} else e.save(), e.translate(n.axisX - (o.ascent - o.descent) * s / 2, n.cellTop), e.rotate(Math.PI / 2), e.textAlign = "left", e.textBaseline = "alphabetic", e.fillText(r.text, 0, 0), e.restore();
	}
	return e.textAlign = a, e.textBaseline = o, i;
}
//#endregion
//#region packages/pptx/src/east-asian-default-coverage.ts
var sr = [
	[12288, 40959],
	[44032, 55203],
	[63744, 64255],
	[65280, 65519]
], cr = "/////wEA/zj+////////////f/7///////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAD/////TwD+/wAAAAD///////////8P//////////////////////////9/+P//////////////P////39EAAAAAFAAAAAAAAAABQAAAAAEAAAAIBCCAAAIAAAAAAAAAIAAAAAAAAAAYAhAAAAAAAAAQAEAACAAAAQAABAAIAAAAAAAAAAABAAAAAAAAAAAQgIAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAGGCAAACAAAAAAAAACAAAABAEQIAEAAAAAgEAAAQAAEAIAAAAAAAAAAAAAAAAAAAAAAAAEAACABAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAgAAAAAAAAAAAAAAMAAAAQAAABAABQEAAAAAAAAAAAggACAIQAAEABAAAggAAAAAAEAAIAAAEAAAAAAAAAAAAAAAAAAAAAAAAAACAAEAAAAAAAAAAJAAAAAAAAAAAAQAAAAAAAABAAAAAABABAAAAAAACAAAAAAAACAAAAAAEEBAAAIABAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAIAAAACkAAAAAAAAQAAAAAKAAAAAAAAAAAAAAAAAAgAAAAEAAAAAAAAIAAAAAAAAAAAAAAAAACgAAAAAAAAAAIEAAAgAAAAAAAAAAAAQgAAAAABAQAgAgEAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAQABAIAAAAAAEAAAAAAgAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAEABAAABgBAEAAAAAAAICAAAQAQAAAIAAAAIQAAAEAAAAAAAACEAACAAAAAIAAAAAAAAAAAAACAAAAABAAAAACAEAAAAgAAAAAAAAAIAAAAgAAAAAAAAAAKAAAAAAAAAAAAAAAAQAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAgAABAAAAAAAAQQAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAgAAABBAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAABAQEAAABAAAAAIAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAIAAAAAAIAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAv//3w1r/Z5u/6eL3DAM6wmV/9vt3+Uke3+3x7z/p7/gP/+c2AMD7f837//8Z1uv/fv/f7wPo5Pp//5e9f8Bv9ff+3//+f20K79fvlu00dyF75X/fD7S/br32e/f+435O33v1/4q1vp///72VdX/qWX3+7yN/P//1fL9ueed2/2f/Tf4htEfvH7i+8P171r+jvTf+nfm+83/7t/f7/xf/z++96/+7vy//7z+eX+vyv++cQVinc+/9LS3//O7///8FHv8P7NP/cnvd5yLA1H/7uHv/Z5D3/47/32cAAWf3TvTz83EAAMxue/O2y31bAAD438+e95h/RYD6Wp79HALA4uDn1wsAk/+73/oZSF+/dgXxnTDm5XveUC//i//7ac+mn79uvf/3menl9AcC9u+73g4buPafFwkhydn88Nsi8f99PyDq06Q3pgO+t8eWCyXTq7/Z8EdPDl++df/3N9qfPmS+fT++/+/h2MO/76//fDsefOyquPGNXlovH/b4zdaJG3KO1bmnYRDzEyFE7DSAzBAITd6FEC79VpvBFGtGYSwDG8AqJjRVQSsY9/14yyv1+//7v3zz/5f/8t3v99t75f7/zsRde2f/Y+0r3r/zcz6AlRegzz/+XaAKhSID53cswmj3r90KEqLMXS+SF7ZJxp4dvaqVWJU3iHrPa/9LvmvNOHavIentYbla89keff3/m8zgFPU96uNO33/+Lxvb/9//+/v++/P5s3XbO9++v/e/v89zl/+7M7g733MX/2+9gOT9v/evKgTPP/emv7+jwH5//u39B/959M86/69B/z/P9//ehx3z9vZ/KOet2f/Zn2zft7F/RFfP/yHw7rL09Zt3f/zPzh3r33t/XRvhSv495v9bQBnq/vT3/z8D9P7wnj9Lg4CvZP5e/r0b4Hv2vZ3Xdc///zRoe8N/HCt+/AdApt1Rdbdx5ATIHr2LolgvqIEv73p7Dfq2frcF/7b37DOHWPtc3vb/uOP3480YtSW+V6e7+/i9s37b1YvnMzfe3fd+8P//+55/34b////535t7x79VaDbb39NQvkFbvf+r6/z6xX3a5eLze/J/9P/YstrvP0eC/zt/x59/1tL/2h4A2eOGvx/7f3e/u4jI995+odm/7+9/Hni//7e7/ec++//PHm4Fe6tkRrh+f/+//wdkdhnj6Zfdq/3LY6zvfuovnL7uH0/97/BPZ4vWDA7F22qT+C/cG+lOE3v8lBUPPPyOx+ibmeTvyHZdq//eue9/LuDJHf+///n73I3K2IqCNOefithR+M0H7LX+ha1db/4z/Z8GbB//drb/Pq//HwiR3I7O8M9++zIAgN/71pETp3f+GwDctLP13Wfvd9//H7EPqO7/+lRfOP/e+YzJTOgFsEmzpezerL//OmIA+JTrVrd7DW2+b9kigJ7/V/ERdd9534X7xWtS7wcwzRPba3bjrqLtyZGVVphfMmE42mFxYkb0ixD4mw8AjXqzEBACJvibEFZD6EMR4l7vVvVTACKxlXSOBdEPxhtb/ZbhcCDbwSOprBC9df/v2e3/j8uW+5diTAiF8VdC31LliycymH+0LMz7tN/+7jjgxeHJ36cf+0750WUvrLpl/0xi62ay7/sGCgx2/3+G2yiu/t3vT0Dri4fX788nrgCXWd3dz9edenDu1fufz//Z/5f+977//+bePzY8CL/3//S8+5/SH9afv2z7/yM9H/8fZJO291d9/3lp/v/l0aduf9Ta+1VXW9NftN514/B35eTE3f8dHfYReHLEtfZr+ogipt799hsZZHI2Iu9wtYS40QZwG90UVML0uuWaty/84l9/jNOV3O7DUAfe4X4z/POP+/2lK4TeM/x6OcLPG++Xv3bl/z4DGY1/st+D6Lf//fPhsq8uced/Df/BCdZp3vj/Lr7vv1Pv1I0Wy+n/e6rj+3cg8fa/htDq9/8jtHc995/QLnEn/Vff+p7K6x3a52m0//+78i1yzqq1yfdpz/615/z3xYp0Tf2v/39P/C/2//nLfu5Fb69uu8r+zfz/7/385nd/v3YOMw+n+M/57u76bHXn5u4p+873f30AAAAAAAAAAAAAAAAAAAAAAABA/bjwP7n7b6fj7f3TdF7nVLNr1TSIa9sN/v/9//NTUfn+WQRExVeh/+ryW0h/9r4WB3j19G9z4H9/7C/AXZmSK3bgXL+A4+uTh3/NaX0dQz3tb+/q77s9f/+/993/Bl/8F/nKwrfd7dbrm25er/v/n/9gAL/e/63abv9fwPkO+f83veb/AQwAqbn1Znz/xT8i4KPWW7Ejj9c72vyqAgWWIjPg58af//77NzYIvdJCpxb/1/9LFoDUl7zNULvd/rx84EvP7/cfr4Du85+bu/X/0feG7iG3cyfI3vVsz0+WokG3R2D9/5+a4g6AP2o12q/7g/tqtt758gB//e8f1yrDlv4peqqje8VWmfw7qcON+Crs009lln287s/q7n/fjmFnHn9/7v8fi6fqBynE3xVNs/Q//D77goG/c9b0bXfhDedPf7LE3F/svfzLr/md45b9tAEA9DXoKlqjvdX/6X+8+nzrY/9573rv3v2678f7883a3L///Nd4+9X3fNP+QzmJUn7zXt9IutfzO/x99gAAAAAAAAAAAAAAAAAAAAAAAIDn4t+7L14/aF/kfh17l//dv//van5ftbf9uu/dCAAAAAAAAAAA8HrbgDYlI8JJmaxe5d3yrrqdP7Byn1PgzwT7I5f/Mfofslcevi4/b4b+a0z7vRaYDGmDf62X/fvr//jP//a+8T4AAAAAAAD4++H33XdsPwR97/Nvf/n774/3/tO+/n977/P1t7/fowtvhX9hulWk+zap9eB1IfVXreLXNsj/3A++NrwP7m6/UVb9f73/+9v/+vbjuvN2/3F40/nX/e/Df/fD4/spZ+6fsanEv+/5rbO7d42fVaEz9//f/AyQL/ddsf579Ae99E3ae3EG+j/L8/YBoi+e4/mHAsh+rToVLt4P7afwGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgEPd/17j/ztU/sg/f/d3AAAAAAAAcHbVnr8XuNX5flT9/X7v8r/5x98/835m/wyPxw7951p+ngVPa97n5l/fb9q/c6rh1015ftf6f5t7E+D+jf7131d7+L150Pz+T+ycGwAAAAAAAO3TnfwZAJjv7l9wrBf//ddZPn7ne7fbAQAAAAAAwOtocT+2egM//4R8N/s+3E9GnWnrQb989q00DgAAAAAAAAD19dtbwf/b/f6+rn97Rb/t774+PvnyTWr9/IP57t/kwX+X28PH16m+za+nVb9/f/7n5276x939qW/lDQAAAAAAAAAAAAAAAOAa3QLMS6b5SJ0d/P4FH/I/ns1c2ObsBxLeNr/fhvjG6eodZ4RkZ34AAAAAAAAAAAAAIL+/2e7pcPc5/1j5N/ux8fe7jMP/jkeclv76zPzlz/fvJACg93AvAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIwAAQAAAAAAAAQAAAAAAAAAAAAAAAQAAEAAAAAAPz////z/////////wMAAAAAAAAAAAAAAAAAAAAAAOD/////////////////////////DwAAAAAAAADw9wc=", lr = [
	[12288, 12291],
	[12293, 12306],
	[12308, 12309],
	[12316, 12318],
	[12321, 12329],
	[12336, 12336],
	[12353, 12435],
	[12443, 12446],
	[12449, 12534],
	[12539, 12542],
	[12549, 12585],
	[12690, 12703],
	[12736, 12751],
	[12849, 12849],
	[12963, 12963],
	[13198, 13199],
	[13212, 13214],
	[13217, 13217],
	[13252, 13252],
	[13262, 13262],
	[13265, 13266],
	[13269, 13269],
	[13312, 19893],
	[19968, 40883],
	[40903, 40907],
	[63744, 64045],
	[65281, 65374],
	[65377, 65439],
	[65504, 65509],
	[65517, 65517]
], ur = [
	[12288, 12351],
	[12353, 12438],
	[12441, 12543],
	[12549, 12587],
	[12688, 12727],
	[12736, 12751],
	[12784, 12799],
	[12849, 12849],
	[12963, 12963],
	[13198, 13199],
	[13212, 13214],
	[13217, 13217],
	[13252, 13252],
	[13262, 13262],
	[13265, 13266],
	[13269, 13269],
	[13312, 19893],
	[19968, 40883],
	[63744, 64045],
	[65281, 65470],
	[65474, 65479],
	[65482, 65487],
	[65490, 65495],
	[65498, 65500],
	[65504, 65510],
	[65512, 65518]
], dr = [
	"MS Mincho",
	"PMingLiU",
	"Batang"
], fr = [
	"MS Gothic",
	"Microsoft JhengHei",
	"Malgun Gothic"
], pr = Object.freeze([
	"Arial",
	"Angsana New",
	"Mangal",
	"Latha"
]), mr = /\p{Script=Thai}/u, hr = /\p{Script=Devanagari}/u, gr = /\p{Script=Tamil}/u;
function _r(e) {
	return mr.test(e) ? "Angsana New" : hr.test(e) ? "Mangal" : gr.test(e) ? "Latha" : "Arial";
}
var vr;
function yr() {
	if (vr) return vr;
	let e = atob(cr), t = new Uint8Array(e.length);
	for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
	return vr = t, t;
}
function br(e) {
	let t = 0;
	for (let [n, r] of sr) {
		if (e >= n && e <= r) return t + e - n;
		t += r - n + 1;
	}
	return -1;
}
function xr(e, t) {
	let n = 0, r = t.length - 1;
	for (; n <= r;) {
		let i = n + r >> 1, [a, o] = t[i];
		if (e < a) r = i - 1;
		else if (e > o) n = i + 1;
		else return !0;
	}
	return !1;
}
function Sr(e) {
	let t = br(e);
	return t < 0 ? !1 : (yr()[t >> 3] & 1 << (t & 7)) != 0;
}
function Cr(e, t) {
	for (let n of t) {
		let t = n.codePointAt(0) ?? 0;
		if (!/\s/u.test(n) && !(e === "MS Mincho" || e === "MS Gothic" ? Sr(t) : e === "PMingLiU" ? xr(t, lr) : e === "Microsoft JhengHei" && xr(t, ur))) return !1;
	}
	return !0;
}
function wr(e) {
	let t = U(e, { source: "office-mac" });
	return t.length > 0 ? t : U(e);
}
function Tr(e) {
	return wr(e).some((e) => e.farEastCodePage === !0);
}
function Er(e) {
	return wr(e).some((e) => {
		let t = e.panose;
		return !!t && t[0] === 2 && t[1] >= 2 && t[1] <= 10;
	});
}
function Dr(e, t) {
	if (e && Tr(e)) return c(e) === "jp" ? [
		e,
		"Microsoft JhengHei",
		"Malgun Gothic"
	] : [
		e,
		"PMingLiU",
		"Batang"
	];
	let n = e && Er(e) ? dr : fr, r = n.slice(0, 2).find((e) => Cr(e, t));
	return r ? [r, ...n.filter((e) => e !== r)] : [
		n[2],
		n[0],
		n[1]
	];
}
//#endregion
//#region packages/pptx/src/renderer.ts
function X(e, t) {
	return e * t;
}
function Or(e, t, n, r) {
	let i = ve(Math.abs(e * n), Math.abs(t * n), r);
	return i ? {
		targetWidthPx: i.width,
		targetHeightPx: i.height
	} : void 0;
}
function Z(e) {
	return e.blipEffects?.length ? {
		effects: e.blipEffects,
		duotone: e.duotone ?? null
	} : e.duotone ?? void 0;
}
function Q(e, t) {
	return Ke(e, t);
}
function kr(e, t) {
	let n = e.targets.get(t);
	return n ? {
		targetWidthPx: n.width,
		targetHeightPx: n.height,
		maxRetainedPixels: n.maxRetainedPixels
	} : void 0;
}
function Ar(e) {
	return Be(e) ? e.svgImagePath : e.imagePath;
}
function jr(e, t, n, r) {
	let i = mn(t.bullet);
	if (i.type !== "blip") return;
	let a;
	for (let e of t.runs) if (e.type === "text" && e.fontSize != null) {
		a = e.fontSize;
		break;
	}
	let o = a ?? t.defFontSize ?? e.defaultFontSize ?? 18, s = i.sizePts == null ? o * ((i.sizePct ?? 100) / 100) : i.sizePts;
	return Math.max(1, s * Y * n * r);
}
async function Mr(e, t, n, r, i, a, o, s, c, l) {
	let u = Ve(a), d = [], f = [], p = (e, t, n, r, i, a = 1, o = i) => {
		if (!(!t || !i)) {
			if (He(r) && (u.resolution === "display" || u.strategy === "adaptive")) {
				d.push({
					key: e,
					...t,
					retainedSurfaceCount: a
				});
				return;
			}
			f.push(ze(n, r, i, o).then((n) => n.dimensions && Me(n.format, l !== void 0) ? {
				key: e,
				...t,
				sourceWidthPx: n.dimensions.width,
				sourceHeightPx: n.dimensions.height,
				retainedSurfaceCount: a
			} : null).catch(() => null));
		}
	}, m = e.background;
	if (m?.fillType === "image" && m.imagePath && !m.tile && !Z(m)) {
		let e = m.fillRect ?? {}, r = t * (1 - (e.l ?? 0) - (e.r ?? 0)), a = n * (1 - (e.t ?? 0) - (e.b ?? 0));
		p(Q(m.imagePath, Z(m)), Or(r, a, i, m.srcRect), m.imagePath, m.mimeType, o, 1);
	}
	for (let t of e.elements) {
		for (let { fill: e, width: n, height: a } of Nr(t)) if (!e.tile && !Z(e)) {
			let t = e.fillRect ?? {}, s = X(n, r) * (1 - (t.l ?? 0) - (t.r ?? 0)), c = X(a, r) * (1 - (t.t ?? 0) - (t.b ?? 0));
			e.mimeType === "image/svg+xml" || Be(e) || p(Q(e.imagePath, Z(e)), Or(s, c, i, e.srcRect), e.imagePath, e.mimeType, o, 1);
		}
		if (t.type === "picture") !(Be(t) || t.mimeType === "image/svg+xml") && !Z(t) && p(Q(t.imagePath, Z(t)), Or(X(t.width, r), X(t.height, r), i, t.srcRect), t.imagePath, t.mimeType, o, 1);
		else if (t.type === "media" && t.posterPath) {
			let e = s ? ha(s) : void 0;
			p(Q(t.posterPath), Or(X(t.width, r), X(t.height, r), i), t.posterPath, t.posterMimeType || "application/octet-stream", e, 1, c ?? e);
		} else if (t.type === "chart") {
			let e = {
				widthPt: t.width / Y,
				heightPt: t.height / Y,
				targetWidthPx: X(t.width, r) * i,
				targetHeightPx: X(t.height, r) * i
			};
			for (let n of _e(t.chart)) {
				let t = n.fill, r = he(n, e);
				!(t.mimeType === "image/svg+xml" || Be({
					svgImagePath: t.svgImagePath,
					srcRect: n.hasSourceCrop ? !0 : null
				})) && !Z(t) && !n.preserveNaturalSize && r?.targetWidthPx && r.targetHeightPx && p(Q(t.imagePath, Z(t)), {
					targetWidthPx: r.targetWidthPx,
					targetHeightPx: r.targetHeightPx
				}, t.imagePath, t.mimeType, o, 1);
			}
		} else if (t.type === "shape") {
			if (!t.textBody) continue;
			for (let e of t.textBody.paragraphs) {
				let n = mn(e.bullet);
				if (n.type !== "blip") continue;
				let a = jr(t.textBody, e, r, i);
				!a || !o || f.push(ze(n.imagePath, n.mimeType, o).then((e) => e.dimensions && e.dimensions.width > 0 && e.dimensions.height > 0 && Me(e.format, l !== void 0) ? {
					key: Q(n.imagePath),
					targetWidthPx: a * e.dimensions.width / e.dimensions.height,
					targetHeightPx: a,
					sourceWidthPx: e.dimensions.width,
					sourceHeightPx: e.dimensions.height
				} : null).catch(() => null));
			}
		}
	}
	return d.push(...(await Promise.all(f)).filter((e) => e !== null)), Ue(d, u);
}
function* Nr(e) {
	let t = (e, t, n) => e?.fillType === "image" && Di(e) ? {
		fill: e,
		width: t,
		height: n
	} : null;
	if (e.type === "shape") {
		let n = t(e.fill, e.width, e.height);
		n && e.height > 0 && (yield n);
	} else if (e.type === "table") {
		let n = [0];
		for (let t of e.cols) n.push(n[n.length - 1] + t);
		let r = [0];
		for (let t of e.rows) r.push(r[r.length - 1] + t.height);
		let i = n[n.length - 1], a = r[r.length - 1] || e.height, o = t(e.background, i, a);
		o && (yield o);
		for (let i = 0; i < e.rows.length; i++) {
			let a = e.rows[i];
			for (let o = 0; o < a.cells.length; o++) {
				let s = a.cells[o];
				if (s.hMerge || s.vMerge || s.fill?.fillType !== "image" || !Di(s.fill)) continue;
				let c = (n[Math.min(o + (s.gridSpan || 1), e.cols.length)] ?? 0) - (n[o] ?? 0), l = r[Math.min(i + (s.rowSpan || 1), e.rows.length)] - r[i] || e.height, u = t(s.fill, c, l);
				u && (yield u);
			}
		}
	}
}
function* Pr(e) {
	for (let t of e.elements) yield* Nr(t);
}
function Fr(e) {
	return e.background?.fillType === "image" ? !0 : e.elements.some((e) => e.type === "picture" ? !0 : e.type === "media" ? !!e.posterPath : e.type === "chart" ? _e(e.chart).length > 0 : Nr(e).next().done ? e.type === "shape" && (e.fill?.fillType === "image" || !!e.textBody?.paragraphs.some((e) => mn(e.bullet).type === "blip")) : !0);
}
var $ = de;
function Ir(e, t, n, r, i, a, o) {
	let { top: s, height: c } = fn(n, i);
	e.fillStyle = a, e.fillRect(t, s, r, c), e.fillStyle = o;
}
function Lr(e, t, n, r, i, a, o = 0, s = 4 / 3, c, l) {
	return ie(e, t, n, r, i, a, o, s, void 0, c, l);
}
var Rr = /* @__PURE__ */ new WeakMap();
function zr(e, t) {
	let n = e.tinted.get(t);
	if (n) return n;
	let r = D(e.raster, t);
	return e.tinted.set(t, r), r;
}
function Br(e) {
	let t = [], n = (e) => {
		if (e) for (let n of e.paragraphs) for (let e of n.runs) e.type === "math" && t.push({
			nodes: e.nodes,
			display: e.display
		});
	};
	for (let t of e.elements) if (t.type === "shape") n(t.textBody);
	else if (t.type === "table") for (let e of t.rows) for (let t of e.cells) n(t.textBody);
	return t;
}
async function Vr(e, t) {
	let n = Br(e);
	if (n.length !== 0) {
		await t.loadMathJax();
		for (let e of n) if (!Rr.has(e.nodes)) try {
			let n = await t.mathMLToSvg(m(e.nodes, e.display)), r = await K(n, "#000000");
			Rr.set(e.nodes, {
				raster: r,
				widthEm: n.widthEm,
				ascentEm: n.ascentEm,
				descentEm: n.descentEm,
				tinted: /* @__PURE__ */ new Map()
			});
		} catch {}
	}
}
function Hr(e, t, n, r, i) {
	return t.patternFill ? ie(t.patternFill, e, n, r, 0, 0, 0, i * 12700) ?? t.color : t.color;
}
function Ur(e, t) {
	let n = (e) => t.embeddedFontAliases?.get(e.trim().toLowerCase()) ?? e;
	if (!e) return n(t.themeMinorFont ?? "sans-serif");
	if (e.startsWith("+")) return n(e === "+mj-lt" || e === "+mj-ea" || e === "+mj-cs" ? t.themeMajorFont ?? "sans-serif" : t.themeMinorFont ?? "sans-serif");
	let r = e.split(",")[0].trim();
	return r ? n(r) : t.themeMinorFont ?? "sans-serif";
}
function Wr(e) {
	return !!e?.trim();
}
var Gr = new Set([
	"serif",
	"sans-serif",
	"monospace",
	"cursive",
	"fantasy",
	"system-ui"
]);
function Kr(e) {
	let t = r(e);
	return t === "mono" ? "monospace" : t === "serif" ? "serif" : "sans-serif";
}
var qr = {
	calibri: "Carlito",
	cambria: "Caladea",
	"franklin gothic book": "Libre Franklin",
	"franklin gothic medium": "Libre Franklin",
	"sakkal majalla": "Noto Naskh Arabic",
	"traditional arabic": "Noto Naskh Arabic",
	"simplified arabic": "Noto Naskh Arabic",
	"arabic typesetting": "Noto Naskh Arabic",
	"univers next arabic": "Noto Sans Arabic"
}, Jr = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u;
function Yr(e) {
	if (qr[e.toLowerCase()]?.includes("Arabic")) return !0;
	let t = e.toLowerCase();
	return /arabic|naskh|kufi|nastaliq|amiri|scheherazade|lateef|aldhabi|urdu|farsi|العرب|[؀-ۿ]/.test(t);
}
function Xr(e) {
	return e.map((e) => `"${e}"`).join(", ");
}
function Zr(e, t = e, r, i = "", a = !1) {
	let d = Kr(t), f = Jr.test(i), p = a ? qr[t.toLowerCase()] : void 0, m = p && ne(s[t.toLowerCase()], i, "any") ? p : void 0, h = m ? `"${m}", ` : "", g = u(t), _ = g ? `"${g}", ` : "", v = f ? `${Xr(d === "serif" ? ["Noto Naskh Arabic", "Noto Sans Arabic"] : ["Noto Sans Arabic"])}, ` : "";
	if (Yr(t) && f) {
		let t = r ? n(r, "sans") : [];
		return `"${e}", ${h}${v}${t.length ? `${Xr(t)}, ` : ""}${d}`;
	}
	let y = d === "serif" ? "serif" : "sans", b = c(t), x = b ?? r, S = x ? n(x, y).filter((e) => e !== g) : [], C = S.length > 0 ? `${Xr(S)}, ` : "", w = `${Xr(y === "serif" ? o : l)}, `;
	return b ? `"${e}", ${h}${_}${C}${w}${v}${d}` : `"${e}", ${h}${_}${w}${C}${v}${d}`;
}
function Qr(e) {
	return e ? e.kind === "external" ? `e:${e.url}` : `i:${e.ref}` : "";
}
function $r(e) {
	let t = e.toLowerCase();
	return /\b(thin|hairline)\b/.test(t) ? 100 : /\b(extra[- ]?light|ultra[- ]?light)\b/.test(t) ? 200 : /\blight\b/.test(t) ? 300 : /\b(black|heavy)\b/.test(t) ? 900 : /\b(extra[- ]?bold|ultra[- ]?bold)\b/.test(t) ? 800 : /\b(semi[- ]?bold|demi[- ]?bold)\b/.test(t) ? 600 : /\bbold\b/.test(t) ? 700 : /\bmedium\b/.test(t) ? 600 : null;
}
function ei(e, t, n, r, i, a, o, s) {
	let c = Math.max(0, r.blur * i), l = Math.ceil(c * 3) + 2, u = Math.max(0, Math.floor(n.x - l)), d = Math.max(0, Math.floor(n.y - l)), f = Math.min(o, Math.ceil(n.x + n.w + l)), p = Math.min(s, Math.ceil(n.y + n.h + l)), m = Math.max(1, f - u), h = Math.max(1, p - d), g = me(m, h), _ = g?.getContext("2d");
	if (!g || !_) return;
	_.save(), _.setTransform(a.a, a.b, a.c, a.d, a.e - u, a.f - d), se(e, _, () => t(_), {
		x: u,
		y: d
	}), _.restore();
	let v = n.y - d, y = v + n.h, b = g, x = _;
	if (c > 0) {
		let e = me(m, h), t = e?.getContext("2d");
		e && t && (b = e, x = t);
	}
	b !== g && _n(x, g, {
		x: n.x - u,
		y: v,
		w: n.w,
		h: n.h
	}, c, m);
	let S = Math.max(0, Math.min(1, r.stPos)), C = Math.max(0, Math.min(1, r.endPos)), w = Math.max(1, y - v);
	try {
		let e = x.getImageData(0, 0, m, h);
		for (let t = 0; t < h; t++) {
			let n = Math.max(0, Math.min(1, (y - (t + .5)) / w)), i;
			if (n <= S) i = r.stA;
			else if (n >= C || C <= S) i = r.endA;
			else {
				let e = (n - S) / (C - S);
				i = r.stA + (r.endA - r.stA) * e;
			}
			let a = Math.max(0, Math.min(1, i));
			for (let n = t * m * 4 + 3; n < (t + 1) * m * 4; n += 4) e.data[n] = Math.round(e.data[n] * a);
		}
		x.putImageData(e, 0, 0);
	} catch {
		x.save(), x.globalCompositeOperation = "destination-in", x.fillStyle = `rgba(0,0,0,${Math.max(0, Math.min(1, r.stA))})`, x.fillRect(0, 0, m, h), x.restore();
	}
	let T = r.dist * i, E = r.dir * Math.PI / 180, D = n.y + n.h;
	e.save(), e.setTransform(1, 0, 0, 1, 0, 0), e.translate(n.x + Math.cos(E) * T, D + Math.sin(E) * T), e.scale(r.sx, r.sy), e.translate(-n.x, -D), e.drawImage(b, u, d), e.restore();
}
function ti(e, t, r, i, s, u = "", d = !0, f = []) {
	let p = t ? "italic " : "", m = Ur(i, s), h = s.embeddedFontAuthoredFamilies?.get(m) ?? m, g = $r(h), _ = e ? "bold " : g ? `${g} ` : "", v = e || g === 700 ? `calibri:700:${t ? "italic" : "normal"}` : t ? "calibri:400:italic" : "calibri", y = `calibri:${e || g === 700 ? 700 : 400}:${t ? "italic" : "normal"}`, b = d && h.toLowerCase() === "calibri" && !s.embeddedFontTuples?.has(y) ? s.officeFontRoutes?.[v] : void 0, x = a(u) ? s.cjkFallback ?? c(s.themeMajorFont) ?? c(s.themeMinorFont) ?? void 0 : void 0;
	if (Gr.has(m)) {
		let e = x ? n(x, m === "serif" ? "serif" : "sans") : [], t = m === "monospace" ? ["Courier New", "Liberation Mono"] : m === "serif" ? [
			...o,
			"Times New Roman",
			"Liberation Serif"
		] : [
			...l,
			"Arial",
			"Helvetica",
			"Liberation Sans"
		];
		return `${p}${_}${r}px ${e.length ? `${Xr([...t, ...e])}, ` : ""}${m}`;
	}
	let S = Zr(b?.family ?? m, h, x, u, s.googleSubstitutes === !0), C = f.filter((e) => e !== m);
	return `${p}${_}${r}px ${C.length ? S.replace(/^("[^"]*"), /u, `$1, ${Xr(C)}, `) : S}`;
}
function ni(e, t, n, r) {
	if (!Gr.has(e) && !r.embeddedFontAuthoredFamilies?.has(e)) return Vn(e, t, n);
}
function ri(e) {
	return e.bullet.type === "char" || e.bullet.type === "autoNum" || mn(e.bullet).type === "blip";
}
function ii(e, t, n) {
	let r = null;
	for (let e of t.runs) if (e.type === "text" && e.fontSize != null) {
		r = e.fontSize;
		break;
	}
	let i = r ?? t.defFontSize ?? e.defaultFontSize ?? 18;
	return n.sizePts == null ? i * ((n.sizePct ?? 100) / 100) : n.sizePts;
}
function ai(e, t) {
	return e ? 0 : t;
}
var oi = /[\p{Script=Devanagari}\p{Script=Thai}\p{Script=Bengali}\p{Script=Tamil}\p{Script=Telugu}\p{Script=Kannada}\p{Script=Malayalam}\p{Script=Gujarati}\p{Script=Gurmukhi}\p{Script=Oriya}\p{Script=Sinhala}\p{Script=Khmer}\p{Script=Lao}\p{Script=Myanmar}\p{Script=Tibetan}]/u;
function si(e, t) {
	return t != null && t !== 0 ? e * .65 : e;
}
function ci(e, t, n, r, i, a, o, s) {
	let c = (t.defaultFontSize ?? 18) * Y * a;
	for (let l of t.paragraphs) {
		let u = X(l.marL, a), d = X(l.marR, a), f = X(l.indent, a), p = ai(ri(l), f), m = n - r - i - u - d - p, { input: h } = pi(l, l.defFontSize == null ? c : l.defFontSize * Y * a, "", a, t.defaultBold ?? !1, t.defaultItalic ?? !1, 1, s, o), g = 0, _;
		for (let t of h) {
			if (t.type !== "text") {
				_ = void 0;
				continue;
			}
			e.font = t.style.font;
			let n = t.style.letterSpacingPx ?? 0;
			if (g += fi(e, t.text, n), _?.sourceRunId === t.style.sourceRunId && (g += n), _ = t.style, g > m) return !0;
		}
	}
	return !1;
}
function li(e) {
	let t = 0;
	for (let n of e) t++;
	return t;
}
var ui = /* @__PURE__ */ new WeakMap();
function di(e) {
	let t = ui.get(e);
	if (t != null) return t;
	let n = e, r = n.letterSpacing;
	if (typeof r != "string") return ui.set(e, !1), !1;
	let i = !1;
	try {
		n.letterSpacing = "0px";
		let t = e.measureText("ii").width;
		n.letterSpacing = "1px";
		let r = e.measureText("ii").width;
		i = Number.isFinite(t) && Number.isFinite(r) && r !== t;
	} catch {
		i = !1;
	} finally {
		try {
			n.letterSpacing = r;
		} catch {}
	}
	return ui.set(e, i), i;
}
function fi(e, t, n) {
	let r = e, i = r.letterSpacing;
	if (n !== 0 && di(e)) try {
		r.letterSpacing = `${n}px`;
		let i = e.measureText(t).width;
		if (Number.isFinite(i)) return t.length > 0 ? i - n : i;
	} finally {
		try {
			r.letterSpacing = i;
		} catch {}
	}
	let a = Math.max(0, li(t) - 1);
	return e.measureText(t).width + n * a;
}
function pi(t, n, r, o, s, c, l, u, d, f = !1) {
	let p = [], m = t.runs.map((t) => t.type === "text" ? e(t, u) : null), h = [], g = "";
	for (let e of m) h.push(g.length), g += e ?? "\n";
	let _ = j(g);
	_.push(g.length);
	let v = 0, y = (e) => {
		for (; v < _.length && _[v] < e;) v++;
		return v < _.length ? _[v] : g.length;
	}, b = null, x = /* @__PURE__ */ new Map();
	for (let [e, u] of t.runs.entries()) {
		if (u.type !== "text" && (b = null), u.type === "break") {
			let e = u.fontSize == null ? n : u.fontSize * Y * o * l, i = Ur(u.fontFamily ?? t.defFontFamily ?? null, d), a = u.bold ?? t.defBold ?? s, f = u.italic ?? t.defItalic ?? c, m = u.fontSize != null || u.fontFamily != null || u.bold != null || u.italic != null ? {
				text: "",
				sizePx: e,
				color: r,
				font: ti(a, f, e, i, d, ""),
				underline: !1,
				strikethrough: !1,
				lineMetric: ni(i, a, f, d)
			} : void 0;
			x.set(p.length, {
				text: "",
				sizePx: e,
				color: r,
				font: ti(a, f, e, i, d, ""),
				underline: !1,
				strikethrough: !1,
				lineMetric: ni(i, a, f, d),
				markFace: {
					family: i,
					bold: a,
					italic: f
				}
			}), p.push({
				type: "break",
				style: m
			});
			continue;
		}
		if (u.type === "math") {
			let e = Rr.get(u.nodes), t = u.fontSize == null ? n : u.fontSize * Y * o * l, i = e ? e.widthEm * t : 0, a = {
				text: "",
				font: `${t}px sans-serif`,
				sizePx: t,
				color: u.color ? $(u.color) : r,
				underline: !1,
				strikethrough: !1,
				math: {
					nodes: u.nodes,
					display: u.display,
					width: i,
					ascent: e ? e.ascentEm * t : 0,
					descent: e ? e.descentEm * t : 0
				}
			};
			p.push({
				type: "object",
				width: i,
				style: a,
				display: u.display
			});
			continue;
		}
		let g = u.fontSize == null ? n : u.fontSize * Y * o * l, _ = si(g, u.baseline ?? void 0), v = Ur(u.fontFamily ?? t.defFontFamily ?? null, d), S = u.fontFamilySym ? Ur(u.fontFamilySym, d) : null, C = u.bold ?? t.defBold ?? s, w = u.italic ?? t.defItalic ?? c, T = m[e] ?? "", E = u.fontFamilyEa ? [] : Dr(u.fontFamily ?? t.defFontFamily ?? d.themeMinorFont ?? null, [...T].filter((e) => V(e.codePointAt(0) ?? 0)).join("")), D = u.fontFamilyEa ? Ur(u.fontFamilyEa, d) : E[0], O = u.fontFamilyCs ? Ur(u.fontFamilyCs, d) : null, k = h[e], A = k + T.length;
		if (b && T) {
			let e = Math.min(y(k), A);
			e > k && (b.text += T.slice(0, e - k), T = T.slice(e - k), k = e);
		}
		let j = ti(C, w, _, D, d, T, !0, E.slice(1)), M = /* @__PURE__ */ new Map(), N = (e, t, n, r = []) => {
			let i = `${e}\0${+!!n}\0${+!!a(t)}\0${+!!Jr.test(t)}\0${r.join("\0")}`, o = M.get(i);
			if (o !== void 0) return o;
			let s = ti(C, w, _, e, d, t, n, r);
			return M.set(i, s), s;
		}, P = (e, t) => N(e, t, !0, pr), F = (u.letterSpacing ?? 0) * Y * o, I = {
			text: "",
			font: "",
			sizePx: g,
			drawSizePx: _,
			color: u.color ? $(u.color) : u.hyperlink && d.themeHlinkColor ? $(d.themeHlinkColor) : r,
			patternFill: u.hyperlink && !u.hyperlinkUsesTextFill ? void 0 : u.patternFill,
			noFill: u.noFill,
			underline: u.underline || u.hyperlink !== void 0,
			underlineStyle: u.underlineStyle,
			underlineColor: u.underlineColor ? $(u.underlineColor) : void 0,
			underlineFill: u.underlineFill,
			underlineLine: u.underlineLine,
			underlineLineNoFill: u.underlineLineNoFill,
			strikethrough: u.strikethrough,
			strikeDouble: u.strikeDouble === !0,
			letterSpacingPx: F || void 0,
			sourceRunId: e,
			lang: u.lang,
			baseline: u.baseline ?? void 0,
			shadow: u.shadow,
			reflection: u.reflection,
			outline: u.outline,
			highlight: u.highlight ? $(u.highlight) : void 0,
			hyperlink: vn(u.hyperlink)
		}, L = "", R = "", z, B = v, H = ni(v, C, w, d) ?? null, U = () => {
			L && p.push({
				type: "text",
				text: L,
				style: {
					...I,
					font: R,
					lineMetric: z,
					lineMetricLatin: H,
					faceFamily: B,
					faceFamilyLatin: v
				}
			}), L = "";
		}, W = 0, G = !1, K = "", q = f && hi.test(u.lang ?? "");
		for (; W < T.length;) {
			let e = Math.min(y(k + W + 1), A) - k, n = T.slice(W, e);
			W = e, G = !0;
			let r = String.fromCodePoint(n.codePointAt(0) ?? 0), a = n, o = V(r.codePointAt(0) ?? 0), s = i(r.codePointAt(0) ?? 0) || oi.test(r), c = s ? O ?? _r(r) : v, l = o ? j : s ? P(c, n) : N(v, n, Wr(u.fontFamily ?? t.defFontFamily)), f = o ? D : c, p = ni(f, C, w, d);
			if (/[\uf020-\uf0ff]/u.test(r) && (S != null || Te(v))) {
				let e = S ?? v, t = ye(r, e);
				a = t + n.slice(r.length), l = ti(C, w, _, t === r ? e : "sans-serif", d, a), p = void 0, f = t === r ? e : "sans-serif";
			}
			let m = q && (gi(n) && _i(K) || gi(K) && _i(n));
			L && (l !== R || p !== z || m) && U(), L += a, R = l, z = p, B = f, K = n;
		}
		if (U(), G) {
			let e = p[p.length - 1];
			b = e?.type === "text" ? e : null;
		}
	}
	return {
		input: p,
		sameStyle: (e, t) => e.font === t.font && e.color === t.color && e.patternFill === t.patternFill && e.noFill === t.noFill && e.sizePx === t.sizePx && e.drawSizePx === t.drawSizePx && e.underline === t.underline && e.underlineStyle === t.underlineStyle && e.underlineColor === t.underlineColor && e.underlineFill === t.underlineFill && e.underlineLine === t.underlineLine && e.underlineLineNoFill === t.underlineLineNoFill && e.strikethrough === t.strikethrough && e.strikeDouble === t.strikeDouble && e.letterSpacingPx === t.letterSpacingPx && e.baseline === t.baseline && e.shadow === t.shadow && e.reflection === t.reflection && e.outline === t.outline && e.highlight === t.highlight && Qr(e.hyperlink) === Qr(t.hyperlink) && (!e.letterSpacingPx || e.sourceRunId === t.sourceRunId) && e.lineMetric === t.lineMetric && e.lineMetricLatin === t.lineMetricLatin,
		breakMarks: x
	};
}
var mi = /^ja(?:[-_]|$)/i, hi = /^(?:en-US|ja-JP)$/i;
function gi(e) {
	return e === "“" || e === "”";
}
function _i(e) {
	return /^\p{Script=Han}/u.test(e);
}
function vi(e, t, n, r) {
	return mi.test(e.lang ?? "") && mi.test(t.lang ?? "") && (gi(n) && _i(r) || _i(n) && gi(r));
}
function yi(e, t, n, r, i, a, o, s = !1, c = !1, l = 1, u, d = {
	themeMajorFont: null,
	themeMinorFont: null,
	dpr: 1
}, f = 0) {
	let { input: p, sameStyle: m, breakMarks: h } = pi(t, r, i, a, s, c, l, u, d, !0), g = X(t.marR, a), _ = rt(p, {
		maxWidth: n,
		firstLineIndent: f,
		measureText(t, n) {
			return e.font = n.font, rr(e, t, n.letterSpacingPx ?? 0);
		},
		sameStyle: m,
		boundaryAdvance: (e, t) => e.sourceRunId === t.sourceRunId ? t.letterSpacingPx ?? 0 : 0,
		tabStops: (t.tabStops ?? []).map((e) => ({
			pos: X(e.pos, a),
			algn: e.algn
		})),
		defaultTabSize: X(t.defTabSz ?? 914400, a),
		tabStartPen: (e) => t.rtl ? g : o + (e === 0 ? f : 0),
		nonMonotoneMeasure: p.some((e) => e.type === "text" && (e.style.letterSpacingPx ?? 0) < 0),
		eastAsianLineBreak: t.eaLnBrk !== !1,
		kinsokuAcrossRuns: vi
	}), v = t.endRunProperties, y = v?.fontSize == null ? r : v.fontSize * Y * a * l, b = Ur(v?.fontFamily ?? t.defFontFamily ?? null, d), x = v?.bold ?? t.defBold ?? s, S = v?.italic ?? t.defItalic ?? c, C = v && (v.fontSize != null || v.fontFamily != null || v.bold != null || v.italic != null) ? {
		text: "",
		sizePx: y,
		color: i,
		font: ti(x, S, y, b, d, ""),
		underline: !1,
		strikethrough: !1,
		lineMetric: ni(b, x, S, d)
	} : void 0, w = v ? {
		text: "",
		sizePx: y,
		color: i,
		font: ti(x, S, y, b, d, ""),
		underline: !1,
		strikethrough: !1,
		lineMetric: ni(b, x, S, d),
		markFace: {
			family: b,
			bold: x,
			italic: S
		}
	} : void 0, T = (e, t) => {
		let n = t[t.length - 1];
		if (!n || !e.markFace || n.sizePx === e.sizePx) return {
			...e,
			text: ""
		};
		let { family: r, bold: i, italic: a } = e.markFace;
		return {
			...e,
			text: "",
			sizePx: n.sizePx,
			font: ti(i, a, n.sizePx, r, d, "")
		};
	};
	return _.map((e, t) => {
		let n = t === _.length - 1, r = [...n && e.segments.length === 0 && C ? [C] : [], ...e.segments.length === 0 && e.lineFeedRun !== void 0 && !(n && C) && p[e.lineFeedRun]?.type === "text" ? [{
			...p[e.lineFeedRun].style,
			text: ""
		}] : e.segments.map((t, n) => {
			if (t.type === "text") {
				let r = e.segments[n - 1], i = r?.type === "text" && r.style.sourceRunId === t.style.sourceRunId ? t.style.letterSpacingPx : void 0;
				return {
					...t.style,
					text: t.text,
					leadingLetterSpacingPx: i
				};
			}
			return t.type === "tab" ? {
				...t.style,
				text: "",
				isTab: !0,
				tabWidthPx: t.width
			} : {
				...t.style,
				text: ""
			};
		})], i = e.endBreakRun !== void 0 && p[e.endBreakRun]?.type === "break", a = i ? p[e.endBreakRun].style : void 0, o = i ? h.get(e.endBreakRun) : void 0, s = e.segments.length > 0, c = s ? [...o ? [T(o, r)] : [], ...n && w ? [T(w, r)] : []] : [];
		return {
			segments: [...r, ...!s && a ? [{
				...a,
				text: ""
			}] : []],
			...c.length > 0 ? { metricMarks: c } : {},
			...e.endsWithBreak ? { endsWithBreak: !0 } : {}
		};
	});
}
var bi = { paint: () => {} };
async function xi(e, t, n, r, i, a, o, s) {
	if (e && e.fillType === "image") {
		let c = (e) => {
			e.fillStyle = "#FFFFFF", e.fillRect(0, 0, t, n);
		};
		if (!e.imagePath || !e.mimeType || !i) return { paint: c };
		let l = (e) => C(e, "tiff") ? { paint: (e) => {
			c(e), R(e, "tiff", {
				x: 0,
				y: 0,
				width: t,
				height: n
			});
		} } : De(e) || We(e) ? {
			paint: c,
			failure: { error: e }
		} : { paint: c }, u, d;
		try {
			let c = s && !Z(e) ? kr(s, Q(e.imagePath, Z(e))) : void 0;
			d = e.tile ? await ze(e.imagePath, e.mimeType, i) : void 0, u = await Ge(e.imagePath, e.mimeType, Z(e), i, {
				widthPt: t / r / Y,
				heightPt: n / r / Y,
				...c ?? {},
				tiff: a,
				svgDecoder: o
			});
		} catch (e) {
			return l(e);
		}
		if (!u) return { paint: c };
		let f = u;
		return { paint: (i) => {
			c(i);
			try {
				let a = e.fillRect ?? {}, o = a.l ?? 0, s = a.t ?? 0, c = a.r ?? 0, l = a.b ?? 0, u = o * t, p = s * n, m = t * (1 - o - c), h = n * (1 - s - l);
				i.save(), i.beginPath(), i.rect(0, 0, t, n), i.clip(), e.alpha != null && (i.globalAlpha = e.alpha), e.tile ? Ti(i, f, e.tile, t, n, r, e.srcRect, d?.dimensions ?? void 0) : ge(i, f, e.srcRect, u, p, m, h), i.restore();
			} catch (e) {
				if (C(e, "tiff")) {
					R(i, "tiff", {
						x: 0,
						y: 0,
						width: t,
						height: n
					});
					return;
				}
				if (De(e) || We(e)) throw e;
			}
		} };
	}
	return { paint: (i) => {
		i.fillStyle = Lr(e, i, 0, 0, t, n, 0, r * 12700) ?? "#FFFFFF", i.fillRect(0, 0, t, n);
	} };
}
var Si = 9525;
function Ci(e, t, n, r, i) {
	let a;
	a = e === "t" || e === "ctr" || e === "b" ? (t - r) / 2 : e === "tr" || e === "r" || e === "br" ? t - r : 0;
	let o;
	return o = e === "l" || e === "ctr" || e === "r" ? (n - i) / 2 : e === "bl" || e === "b" || e === "br" ? n - i : 0, {
		ax: a,
		ay: o
	};
}
function wi(e, t, n) {
	return {
		width: e * (n ? 1 - n.l - n.r : 1),
		height: t * (n ? 1 - n.t - n.b : 1)
	};
}
function Ti(e, t, n, r, i, a, o, s, c = 96) {
	let l = wi(s?.width ?? t.width, s?.height ?? t.height, o), u = Si * 96 / c, d = l.width * u * (n.sx ?? 1) * a, f = l.height * u * (n.sy ?? 1) * a;
	if (!(d > 0) || !(f > 0)) return !1;
	let p = n.flip === "x" || n.flip === "xy", m = n.flip === "y" || n.flip === "xy", h = d * (p ? 2 : 1), g = f * (m ? 2 : 1), _ = Math.max(1, Math.ceil(h)), v = Math.max(1, Math.ceil(g));
	if (!Number.isFinite(_) || !Number.isFinite(v) || _ > 32767 || v > 32767 || _ > Math.floor(16777216 / v)) return !1;
	let y = me(h, g);
	if (!y) return !1;
	let b = y.getContext("2d");
	if (!b) return !1;
	let x = (e, n, r, i) => {
		b.save(), b.translate(e + (r ? d : 0), n + (i ? f : 0)), b.scale(r ? -1 : 1, i ? -1 : 1), ge(b, t, o, 0, 0, d, f), b.restore();
	};
	x(0, 0, !1, !1), p && x(d, 0, !0, !1), m && x(0, f, !1, !0), p && m && x(d, f, !0, !0);
	let S = e.createPattern(y, "repeat");
	if (!S) return !1;
	let { ax: C, ay: w } = Ci(n.algn ?? "tl", r, i, d, f), T = C + X(n.tx ?? 0, a), E = w + X(n.ty ?? 0, a);
	return typeof S.setTransform == "function" && typeof DOMMatrix < "u" ? (S.setTransform(new DOMMatrix().translateSelf(T, E)), e.fillStyle = S, e.fillRect(0, 0, r, i)) : (e.save(), e.translate(T, E), e.fillStyle = S, e.fillRect(-T, -E, r, i), e.restore()), !0;
}
function Ei(e) {
	return JSON.stringify([e.svgImagePath ?? null, Q(e.imagePath, Z(e))]);
}
function Di(e) {
	return e.tile != null != (e.stretch === !0);
}
function Oi(e, t, n, r, i, a = !1) {
	if (!n || !(r.w > 0) || !(r.h > 0) || !Di(t)) return !1;
	let { x: o, y: s, w: c, h: l } = r;
	e.save();
	try {
		if (e.clip(a ? "evenodd" : "nonzero"), t.alpha != null && (e.globalAlpha *= Math.max(0, Math.min(1, t.alpha))), t.tile) return e.translate(o, s), Ti(e, n.image, t.tile, c, l, i, t.srcRect, n.intrinsicSize, t.dpi && t.dpi > 0 ? t.dpi : 96);
		let r = t.fillRect ?? {}, u = o + (r.l ?? 0) * c, d = s + (r.t ?? 0) * l, f = (1 - (r.l ?? 0) - (r.r ?? 0)) * c, p = (1 - (r.t ?? 0) - (r.b ?? 0)) * l;
		return !(f > 0) || !(p > 0) ? !1 : (ge(e, n.image, t.srcRect, u, d, f, p), !0);
	} finally {
		e.restore();
	}
}
function ki(e, t, n) {
	if (!t) return;
	let r = t.dir * Math.PI / 180, i = X(t.dist, n);
	e.shadowColor = $(t.color, t.alpha), e.shadowBlur = 0, e.shadowOffsetX = Math.cos(r) * i, e.shadowOffsetY = Math.sin(r) * i;
}
function Ai(e, t, n) {
	t && (e.shadowColor = $(t.color, t.alpha), e.shadowBlur = X(t.radius, n), e.shadowOffsetX = 0, e.shadowOffsetY = 0);
}
function ji(e) {
	e.shadowColor = "transparent", e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0;
}
var Mi = 8, Ni = 1, Pi = 1, Fi = 256;
function Ii(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g = 0) {
	if (r <= 0) return;
	let _ = e.measureText(t), v = _.actualBoundingBoxAscent > 0 ? _.actualBoundingBoxAscent : r, y = _.actualBoundingBoxDescent > 0 ? _.actualBoundingBoxDescent : r * .25, b = _.actualBoundingBoxLeft > 0 ? _.actualBoundingBoxLeft : 0, x = _.actualBoundingBoxRight > 0 ? _.actualBoundingBoxRight : r, S = r * l * i, C = Math.min(Fi, Math.max(1, Math.round(S / Mi))), w = (e) => zi(e, a, r, o, s, c, u, d), T = w(C), E = Vi(T, a, o, s, c, u, d, l, i, -v, y);
	for (; E > Pi && C < Fi;) {
		let e = Math.min(Fi, C * 2), t = w(e), n = Vi(t, a, o, s, c, u, d, l, i, -v, y);
		if (n >= E * .75) {
			T = t;
			break;
		}
		C = e, T = t, E = n;
	}
	let D = 1e4, O = Ni / (l * i), k = T.length - 1, A = (e, t, n) => e === 0 ? -D : t - n - O, j = (e, t, n) => e === k ? D : t - n + O, M = (e, r) => {
		g > 0 ? (e.strokeStyle = r, e.lineWidth = g, e.lineJoin = "round") : e.fillStyle = r;
		for (let r = 0; r <= k; r++) {
			let { s0: i, s1: a, g: o } = T[r], s = (i + a) / 2;
			e.save(), e.translate(f + o.x, p + o.y), e.rotate(o.angle), o.shear !== 0 && e.transform(1, 0, o.shear, 1, 0, 0), (l !== 1 || o.vScale !== 1) && e.scale(l, o.vScale), e.beginPath();
			let c = A(r, i, s), u = j(r, a, s);
			e.rect(c, -D, u - c, 2 * D), e.clip(), g > 0 ? e.strokeText(t, -s + n / 2, 0) : e.fillText(t, -s + n / 2, 0), e.restore();
		}
	}, N = typeof m == "string" ? Li(m) : 1, P = typeof e.globalAlpha == "number" ? e.globalAlpha : 1;
	if (typeof m == "string" && N >= 1 && P >= 1) {
		M(e, m);
		return;
	}
	if (N <= 0 || P <= 0) return;
	let F = typeof e.getTransform == "function" ? e.getTransform() : null;
	if (!F) {
		M(e, m);
		return;
	}
	let I = Infinity, L = Infinity, R = -Infinity, z = -Infinity;
	for (let e = 0; e <= k; e++) {
		let { s0: t, s1: r, g: i } = T[e], a = (t + r) / 2, o = -a + n / 2, s = Math.max(A(e, t, a), o - b), c = Math.min(j(e, r, a), o + x);
		if (!(c <= s)) for (let [e, t] of [
			[s, -v],
			[c, -v],
			[s, y],
			[c, y]
		]) {
			let n = Bi(i, l, e, t), r = f + n.x, a = p + n.y, o = F.a * r + F.c * a + F.e, s = F.b * r + F.d * a + F.f;
			o < I && (I = o), o > R && (R = o), s < L && (L = s), s > z && (z = s);
		}
	}
	if (!(R > I && z > L)) return;
	let B = 2 + g * i, V = Math.floor(I - B), H = Math.floor(L - B), U = Math.ceil(R + B) - V, W = Math.ceil(z + B) - H, G = me(U, W), K = G ? G.getContext("2d") : null;
	if (!G || !K) {
		M(e, m);
		return;
	}
	K.font = e.font, K.textAlign = "left", K.textBaseline = "alphabetic", K.setTransform(F.a, F.b, F.c, F.d, F.e - V, F.f - H), typeof m == "string" ? M(K, Ri(m)) : (M(K, "#fff"), K.save(), K.setTransform(1, 0, 0, 1, 0, 0), K.globalCompositeOperation = "source-in", se(e, K, () => {
		K.fillStyle = h?.(K) ?? m, K.fillRect(0, 0, U, W);
	}, {
		x: V,
		y: H
	}), K.restore()), e.save(), e.setTransform(1, 0, 0, 1, 0, 0), e.globalAlpha = P * N, e.drawImage(G, V, H), e.restore();
}
function Li(e) {
	let t = /^rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)$/i.exec(e);
	if (!t) return 1;
	let n = parseFloat(t[1]);
	return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 1;
}
function Ri(e) {
	let t = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i.exec(e);
	return t ? `rgb(${t[1]}, ${t[2]}, ${t[3]})` : e;
}
function zi(e, t, n, r, i, a, o, s) {
	let c = Array(e);
	for (let l = 0; l < e; l++) {
		let u = l / e * n, d = (l + 1) / e * n;
		c[l] = {
			s0: u,
			s1: d,
			g: Tt(t, (r + (u + d) / 2) / i * a, o, s)
		};
	}
	return c;
}
function Bi(e, t, n, r) {
	let i = n * t, a = r * e.vScale, o = i + e.shear * a, s = Math.cos(e.angle), c = Math.sin(e.angle);
	return {
		x: e.x + s * o - c * a,
		y: e.y + c * o + s * a
	};
}
function Vi(e, t, n, r, i, a, o, s, c, l, u) {
	let d = 0;
	for (let f of e) {
		let e = (f.s0 + f.s1) / 2;
		for (let p of [f.s0, f.s1]) {
			let m = Tt(t, (n + p) / r * i, a, o);
			for (let t of [l, u]) {
				let n = Bi(m, s, 0, t), r = Bi(f.g, s, p - e, t), i = Math.hypot(r.x - n.x, r.y - n.y) * c;
				i > d && (d = i);
			}
		}
	}
	return d;
}
function Hi(e, t, n, r, i, a, o, s, c, l, u) {
	let d = i, f = a, p = Math.max(1, o), m = Math.max(1, s), h = xt(n, r, p, m);
	if (!h) return;
	let g = t.defaultBold ?? !1, _ = t.defaultItalic ?? !1, v = (t.defaultFontSize ?? 18) * Y * c, y = [], b = 0;
	for (let n of t.paragraphs) {
		let t = n.defFontSize == null ? v : n.defFontSize * Y * c, r = yi(e, n, Infinity, t, n.defColor ? $(n.defColor) : l, c, 0, g, _, 1, void 0, u, 0);
		y.length > 0 && (b += (n.spaceBefore ?? 0) / 100 * Y * c);
		for (let e of r) {
			let r = e.segments.reduce((e, t) => Math.max(e, t.sizePx), 0) || t, i = n.spaceLine?.type === "pts" ? n.spaceLine.val * Y * c : r * 1.2 * (n.spaceLine ? n.spaceLine.val / 1e5 : 1);
			y.push({
				line: e,
				alignment: n.alignment,
				baseline: b + i * .8
			}), b += i;
		}
		b += (n.spaceAfter ?? 0) / 100 * Y * c;
	}
	if (y.length === 0) return;
	e.save(), e.textAlign = "left", e.textBaseline = "alphabetic";
	let x = -1, S = () => {
		if (x >= 0) return x;
		let t = typeof e.getTransform == "function" ? e.getTransform() : null, n = t ? Math.abs(t.a * t.d - t.b * t.c) : 1;
		return x = n > 0 ? Math.sqrt(n) : 1, x;
	}, C = y.length, w = h.top[0], T = h.top[1], E = w && T ? (w.x - p / 2) * (T.y - m / 2) - (w.y - m / 2) * (T.x - p / 2) > 0 : !0, D = y[E ? C - 1 : 0].baseline;
	for (let t = 0; t < C; t++) {
		let { line: i, alignment: a } = y[t], o = t / C, s = (t + 1) / C, l = 0, u = 0, g = 0, _ = 0;
		for (let t of i.segments) {
			if (t.math) {
				l += t.math.width, u = Math.max(u, t.sizePx), g = Math.max(g, t.math.ascent), _ = Math.max(_, t.math.descent);
				continue;
			}
			e.font = t.font;
			let n = t.letterSpacingPx ?? 0, r = e.measureText(t.text);
			l += r.width + n * li(t.text), u = Math.max(u, t.sizePx), r.actualBoundingBoxAscent > 0 && (g = Math.max(g, r.actualBoundingBoxAscent)), r.actualBoundingBoxDescent > 0 && (_ = Math.max(_, r.actualBoundingBoxDescent));
		}
		if (l <= 0) continue;
		let v = h.singleEdge ? Math.max(0, E ? D - y[t].baseline : y[t].baseline - D) : 0, b = v > 0 ? xt(n, r, p + 2 * v, m + 2 * v) ?? h : h, x = g + _ > 0 ? g + _ : u, w = h.singleEdge ? .8 : x > 0 ? g / x : .8, T = h.singleEdge ? 1 : p / l, O = h.singleEdge ? x : x / (s - o), k = wt(b, l), A = h.singleEdge ? (1 - k) * (a === "r" ? 1 : a === "ctr" ? .5 : 0) : 0, j = 0;
		for (let t of i.segments) {
			let n = j, r = h.singleEdge ? w : o + w * (s - o);
			if (t.math) {
				j += t.math.width;
				continue;
			}
			e.font = t.font;
			let i = Hr(e, t, d, f, c);
			e.fillStyle = i;
			let a = t.outline && t.outline.width > 0 ? t.outline : void 0, u = a?.fill, g = a ? u ? ie(u, e, d, f, p, m, 0, c * Y) : a.color ? `#${a.color}` : t.noFill ? void 0 : i : void 0, _ = a ? Math.max(.5, X(a.width, c)) : 0, y = t.letterSpacingPx ?? 0, x = [...t.text];
			for (let n of x) {
				let r = e.measureText(n).width + y;
				if (t.noFill && !g) {
					j += r;
					continue;
				}
				let x = h.singleEdge ? w : o + w * (s - o);
				if (!h.singleEdge && r > 0) {
					t.noFill || Ii(e, n, y, r, S(), h, j, l, k, T, O, x, d, f, i, t.patternFill ? (e) => Hr(e, t, d, f, c) : void 0), g && a && Ii(e, n, y, r, S(), h, j, l, k, T, O, x, d, f, g, u ? (e) => ie(u, e, d, f, p, m, 0, c * 12700) ?? "rgba(0,0,0,0)" : void 0, _), j += r;
					continue;
				}
				let C = Tt(b, A + (j + r / 2) / l * k, O, x);
				C.x -= v, C.y -= v, e.save(), e.translate(d + C.x, f + C.y), e.rotate(C.angle), C.shear !== 0 && e.transform(1, 0, C.shear, 1, 0, 0), (T !== 1 || C.vScale !== 1) && e.scale(T, C.vScale), t.noFill || e.fillText(n, -r / 2 + y / 2, 0), g && (e.strokeStyle = g, e.lineWidth = _, e.lineJoin = "round", e.strokeText(n, -r / 2 + y / 2, 0)), e.restore(), j += r;
			}
			if (t.underline && !t.underlineLineNoFill && j > n && (!t.noFill || t.underlineFill || t.underlineColor || t.underlineLine?.fill)) {
				let a = t.underlineFill ? ie(t.underlineFill, e, d, f, p, m, 0, c * Y) : t.underlineLine?.fill ? ie(t.underlineLine.fill, e, d, f, p, m, 0, c * Y) : t.underlineColor ?? i;
				if (a) {
					e.save(), e.strokeStyle = a, e.lineWidth = t.underlineLine?.width ? X(t.underlineLine.width, c) : Math.max(1, t.sizePx * .05), e.beginPath();
					let i = Math.max(2, Math.ceil((j - n) / 8));
					for (let t = 0; t <= i; t++) {
						let a = Tt(b, A + (n + (j - n) * t / i) / l * k, O, r), o = Math.max(2, e.lineWidth) * a.vScale, s = d + a.x - v - Math.sin(a.angle) * o, c = f + a.y + Math.cos(a.angle) * o;
						t === 0 ? e.moveTo(s, c) : e.lineTo(s, c);
					}
					e.stroke(), e.restore();
				}
			}
		}
	}
	e.restore();
}
function Ui(e, t, n, r, i, a, o) {
	let s = Math.min(r, i);
	switch (e) {
		case "rightarrow":
		case "leftarrow": {
			let c = Math.min(Math.max(a ?? 5e4, 0), 1e5), l = s * Math.min(Math.max(o ?? 5e4, 0), 1e5) / 1e5, u = i * c / 2e5, d = n + i / 2 - u, f = 2 * u, p = Math.max(0, r - l);
			return e === "rightarrow" ? {
				tx: t,
				ty: d,
				tw: p,
				th: f
			} : {
				tx: t + l,
				ty: d,
				tw: p,
				th: f
			};
		}
		case "roundrect": {
			let e = s * Math.min(Math.max(a ?? 16667, 0), 1e5) / 1e5 * (1 - 1 / Math.SQRT2);
			return {
				tx: t + e,
				ty: n + e,
				tw: Math.max(0, r - 2 * e),
				th: Math.max(0, i - 2 * e)
			};
		}
		default: return null;
	}
}
function Wi(e, t) {
	return e.defaultTextColor ? $(e.defaultTextColor) : t.smartArtFallbackTextColor != null && An(e) ? t.smartArtFallbackTextColor : null;
}
function Gi(e, t, n) {
	return {
		outerRotation: e,
		localFlipH: t,
		localFlipV: n
	};
}
function Ki(e, t, n, r, i) {
	let a = [
		{
			x: t,
			y: n
		},
		{
			x: t + r,
			y: n
		},
		{
			x: t,
			y: n + i
		},
		{
			x: t + r,
			y: n + i
		}
	].map((t) => ({
		x: e.a * t.x + e.c * t.y + e.e,
		y: e.b * t.x + e.d * t.y + e.f
	})), o = Math.min(...a.map((e) => e.x)), s = Math.min(...a.map((e) => e.y)), c = Math.max(...a.map((e) => e.x)), l = Math.max(...a.map((e) => e.y));
	return {
		x: o,
		y: s,
		w: c - o,
		h: l - s
	};
}
var qi = {
	tl: [0, 0],
	t: [.5, 0],
	tr: [1, 0],
	l: [0, .5],
	ctr: [.5, .5],
	r: [1, .5],
	bl: [0, 1],
	b: [.5, 1],
	br: [1, 1]
};
function Ji(e, t, n) {
	return [e.a * t + e.c * n + e.e, e.b * t + e.d * n + e.f];
}
function Yi(e, t, n, r, i, a) {
	let [o, s] = qi[a ?? "b"];
	return Ji(e, t + o * r, n + s * i);
}
function Xi(e, t, n, r, i, a, o, s) {
	let c = Ft(e, i, a).corners, l = (o > 0 ? Ae(c, o / i, o / a) ?? c : c).map((e) => Ji(t, n + e.x, r + e.y)), u = l.map(([e]) => e), d = l.map(([, e]) => e), f = Math.min(...u), p = Math.min(...d), m = Math.max(...u), h = Math.max(...d), [g, _] = qi[s ?? "b"], v = ke(c, g, _);
	return {
		bbox: {
			x: f,
			y: p,
			w: m - f,
			h: h - p
		},
		anchor: v ? Ji(t, n + v.x, r + v.y) : Yi(t, n, r, i, a, s)
	};
}
function Zi(e, t, n, r, i) {
	let a = Math.floor(n.x) - 1, o = Math.floor(n.y) - 1, s = Math.max(1, Math.ceil(n.x + n.w) - a + 1), c = Math.max(1, Math.ceil(n.y + n.h) - o + 1);
	if (r && (a + s <= 0 || o + c <= 0 || a >= r.w || o >= r.h) || oe(s, c).clamped) return e;
	let l = null;
	try {
		l = me(s, c);
	} catch {
		return e;
	}
	let u = l?.getContext("2d");
	if (!l || !u) return e;
	u.setTransform(t.a, t.b, t.c, t.d, t.e - a, t.f - o), i ? se(i, u, () => e(u), {
		x: a,
		y: o
	}) : e(u);
	let d = {
		a: 1,
		b: 0,
		c: 0,
		d: 1,
		e: 0,
		f: 0
	};
	return (e) => {
		e.save(), e.setTransform(d), e.drawImage(l, a, o), e.restore();
	};
}
function Qi(e, t, n, r, i, a, o, s, c, l = !0, u = r) {
	let d = e.canvas.width || 0, f = e.canvas.height || 0, p = d > 0 && f > 0, m = {
		a: 1,
		b: 0,
		c: 0,
		d: 1,
		e: 0,
		f: 0
	}, h = (e) => e.setTransform(c), g = (t) => {
		h(t), se(e, t, () => n(t));
	}, _ = (t) => {
		h(t), se(e, t, () => r(t));
	}, v = (t) => {
		h(t), se(e, t, () => u(t));
	}, y = !1;
	t.shadow && p ? (e.save(), e.setTransform(m), y = !be(e, g, i, t.shadow, s, d, f, Math.atan2(c.b, c.a) * 180 / Math.PI, a), e.restore()) : t.shadow && (y = !0), t.reflection && p && (e.save(), e.setTransform(m), ce(e, g, i, t.reflection, s, d, f), e.restore()), y ? ki(e, t.shadow ?? null, o) : t.glow && Ai(e, t.glow, o), t.softEdge && p ? (e.save(), e.setTransform(m), le(e, g, i, t.softEdge, s, d, f, _), e.restore()) : n(e), (y || t.glow) && ji(e), t.innerShadow && l && p && (e.save(), e.setTransform(m), re(e, v, i, t.innerShadow, s, d, f), e.restore());
}
function $i(e, t, n) {
	if (t === n || !Number.isFinite(e)) return e;
	let r = ((e + 180) % 360 + 360) % 360 - 180;
	return r > 90 ? r -= 180 : r < -90 && (r += 180), Object.is(r, -0) ? 0 : r;
}
function ea(e, t, n, r) {
	return e === "wordArtVert" || e === "wordArtVertRtl" ? t + (r ? 180 : 0) : $i(t, n, r);
}
function ta(e, t, n, r = "#000000", i, a = {
	themeMajorFont: null,
	themeMinorFont: null,
	dpr: 1
}, o, s) {
	we(t.stroke?.fill) && (e = ue(e));
	let c = X(t.x, n), l = X(t.y, n), u = X(t.width, n), p = X(t.height, n), m = o && t.id !== void 0 ? (e) => o({
		...e,
		shapeId: t.id
	}) : o;
	if (p === 0 && t.textBody?.verticalAnchor === "b") {
		if (t.stroke && (e.save(), e.beginPath(), e.moveTo(c, l), e.lineTo(c + u, l), Ca(e, t.stroke, n, {
			x: c,
			y: l,
			w: u,
			h: 1
		}, t.rotation), e.stroke(), e.restore()), t.textBody) {
			let o = Wi(t, a);
			ca(e, t.textBody, c, l, u, p, n, o, t.rotation, t.flipH, t.flipV, r, i, a, m, !1, s);
		}
		return;
	}
	let g = t.scene3d && It(t.scene3d.camera) ? t.scene3d : null;
	if (g && u > 0 && p > 0) {
		let o = e.getTransform(), s = Math.abs(o.a * o.d - o.b * o.c), d = s > 0 ? Math.sqrt(s) : 1, f = la(t.sp3d, t.scene3d?.lightRig, t.sp3d?.prstMaterial, n, d), m = ua(t.sp3d, g.camera, u, p, n, d), h = Gi(t.rotation, t.flipH, t.flipV);
		e.save(), h.outerRotation !== 0 && (e.translate(c + u / 2, l + p / 2), e.rotate(h.outerRotation * Math.PI / 180), e.translate(-(c + u / 2), -(l + p / 2)));
		let _ = {
			...t,
			x: 0,
			y: 0,
			rotation: 0,
			flipH: h.localFlipH,
			flipV: h.localFlipV,
			scene3d: void 0,
			sp3d: void 0,
			shadow: null,
			innerShadow: void 0,
			glow: void 0,
			softEdge: void 0,
			reflection: void 0
		}, v = {
			..._,
			textBody: null
		}, y = {
			..._,
			fill: null,
			stroke: null
		}, b = (t.stroke ? t.stroke.width * n / 2 : 0) + (t.sp3d?.contourW ? t.sp3d.contourW * n : 0) + (m ? Math.hypot(m.offsetX, m.offsetY) / d : 0) + 2, x = t.textBody?.paragraphs.some((e) => e.runs.some((e) => e.type === "text" && (e.patternFill?.fillType === "pattern" || e.outline?.fill?.fillType === "pattern" || e.underlineFill?.fillType === "pattern"))) ?? !1, S = (e, t, o, s = !1) => fa(e, g.camera, c, l, u, p, (e) => {
			ta(e, t, n, r, i, a, void 0);
		}, o ? {
			bevels: f,
			extrusion: m ?? void 0,
			edgePadCss: b,
			preservePatternFrame: s
		} : { preservePatternFrame: s }), C = (e) => S(e, v, !0), w = (e) => !t.textBody || S(e, y, !1, x);
		if (t.shadow || t.innerShadow || t.glow || t.softEdge || t.reflection) {
			let r = e.getTransform(), i = Math.abs(r.a * r.d - r.b * r.c), a = i > 0 ? Math.sqrt(i) : 1, o = Xi(g.camera, r, c, l, u, p, b, t.shadow?.algn), s = !1, d = Zi((e) => {
				s = C(e) || s;
			}, r, o.bbox, {
				w: e.canvas.width || 0,
				h: e.canvas.height || 0
			}, e);
			if (Qi(e, t, d, d, o.bbox, o.anchor, n, n * a, r, !!t.fill), s) {
				w(e), e.restore();
				return;
			}
		} else if (S(e, _, !0, x && t.fill?.fillType !== "pattern")) {
			e.restore();
			return;
		}
		e.restore();
	}
	e.save(), (t.rotation !== 0 || t.flipH || t.flipV) && (e.translate(c + u / 2, l + p / 2), e.rotate(t.rotation * Math.PI / 180), t.flipH && e.scale(-1, 1), t.flipV && e.scale(1, -1), e.translate(-(c + u / 2), -(l + p / 2)));
	let _ = t.geometry.toLowerCase(), C = (e, n, r, i, a) => {
		t.custGeom ? na(e, t.custGeomPaint?.length === t.custGeom.length ? t.custGeom.filter((e, n) => t.custGeomPaint?.[n].fill !== "none") : t.custGeom, n, r, i, a) : v(e, _, n, r, i, a, [
			t.adj,
			t.adj2,
			t.adj3,
			t.adj4,
			t.adj5,
			t.adj6,
			t.adj7,
			t.adj8
		]) || h(e, _, n, r, i, a, t.adj, t.adj2, t.adj3, t.adj4);
	}, E = Lr(t.fill, e, c, l, u, p, t.rotation, n * Y, C), D = t.fill?.fillType === "image" && Di(t.fill) ? t.fill : null, O = D ? a.shapeFillImages?.get(Ei(D)) : void 0, j = !!(D && O);
	t.shadow || Ai(e, t.glow ?? null, n);
	let M = new Set([
		"line",
		"straightconnector1",
		"bentconnector2",
		"bentconnector3",
		"bentconnector4",
		"bentconnector5",
		"curvedconnector2",
		"curvedconnector3",
		"curvedconnector4",
		"curvedconnector5"
	]), N = new Set([
		"callout1",
		"callout2",
		"callout3",
		"bordercallout1",
		"bordercallout2",
		"bordercallout3",
		"accentcallout1",
		"accentcallout2",
		"accentcallout3",
		"accentbordercallout1",
		"accentbordercallout2",
		"accentbordercallout3"
	]), P = (e) => N.has(e) || e === "line" || e === "straightconnector1" || e.startsWith("bentconnector"), F = !t.custGeom && ee(_), I = (r, i, a = {
		x: c,
		y: l,
		w: u,
		h: p
	}) => {
		we(t.stroke?.fill) && (r = ue(r));
		let { x: o, y: s, w: d, h: m } = a, g = i ?? (r === e && o === c && s === l && d === u && m === p ? E : Lr(t.fill, r, o, s, d, m, t.rotation, n * 12700, C)), v = i ? null : t.stroke ? () => {
			Ca(r, t.stroke, n, {
				x: o,
				y: s,
				w: d,
				h: m
			}, t.rotation), r.stroke();
		} : null, y = () => ji(r), b = _ === "donut" || _ === "smileyface" || _ === "frame", x = D && !i ? (e) => Oi(e, D, O, {
			x: o,
			y: s,
			w: d,
			h: m
		}, n, b) : void 0;
		if (F && !i) {
			let e = P(_);
			k(r, _, o, s, d, m, [
				t.adj,
				t.adj2,
				t.adj3,
				t.adj4,
				t.adj5,
				t.adj6,
				t.adj7,
				t.adj8
			], g, v, y, e || x ? {
				...e ? { skipTrailingStroke: !0 } : {},
				paintFill: x
			} : void 0);
			return;
		}
		let S = t.custGeom && t.custGeomPaint?.length === t.custGeom.length ? t.custGeomPaint : null;
		if (t.custGeom && S) {
			let e = !1;
			t.custGeom.forEach((t, n) => {
				let a = S[n], c = a.fill !== "none";
				if (!(i && !c)) {
					if (r.beginPath(), na(r, [t], o, s, d, m), c) {
						let t = !1;
						if (x) {
							r.save();
							try {
								t = x(r);
							} finally {
								r.restore();
							}
						} else g && (r.fillStyle = g, r.fill(), t = !0);
						let n = t && !i ? f(a.fill) : null;
						n && (r.save(), r.fillStyle = n, r.fill(), r.restore()), t && !i && !e && (y(), e = !0);
					}
					a.stroke && v && v();
				}
			});
			return;
		}
		r.beginPath(), t.custGeom && t.custGeom.length > 0 ? na(r, t.custGeom, o, s, d, m) : h(r, _, o, s, d, m, t.adj, t.adj2, t.adj3, t.adj4), x && _ !== "arc" ? x(r) && y() : g && _ !== "arc" && (r.fillStyle = g, b ? r.fill("evenodd") : r.fill(), i || y()), v && v();
	}, R = e.getTransform(), z = Math.abs(R.a * R.d - R.b * R.c), B = z > 0 ? Math.sqrt(z) : 1, V = (t.shadow || t.reflection || t.softEdge || t.innerShadow ? F ? T(_, c, l, u, p, [
		t.adj,
		t.adj2,
		t.adj3,
		t.adj4,
		t.adj5,
		t.adj6,
		t.adj7,
		t.adj8
	]) : t.custGeom && t.custGeom.length > 0 ? y(t.custGeom, c, l, u, p) : null : null) ?? {
		x: c,
		y: l,
		w: u,
		h: p
	}, H = t.stroke ? t.stroke.width * n / 2 : 0, U = t.stroke ? Math.max(t.stroke.headEnd ? L(t.stroke.headEnd, t.stroke, n) : 0, t.stroke.tailEnd ? L(t.stroke.tailEnd, t.stroke, n) : 0) : 0, W = t.sp3d?.contourW ? t.sp3d.contourW * n : 0, G = Math.max(H, U, W), K = G > 0 ? {
		x: V.x - G,
		y: V.y - G,
		w: V.w + G * 2,
		h: V.h + G * 2
	} : V, q = Ki(R, K.x, K.y, K.w, K.h), te = n * B, ne = g ? [] : la(t.sp3d, t.scene3d?.lightRig, t.sp3d?.prstMaterial, n, B), J = (t.stroke ? t.stroke.width * n / 2 : 0) + 2, re = (e) => {
		if (we(t.stroke?.fill) && (e = ue(e)), t.stroke && (M.has(_) || N.has(_))) {
			let r = b(_, c, l, u, p, [
				t.adj,
				t.adj2,
				t.adj3,
				t.adj4,
				t.adj5,
				t.adj6,
				t.adj7,
				t.adj8
			]);
			if (!r) return;
			let i = t.stroke.cmpd, a = _ === "line" || _ === "straightconnector1";
			if (P(_) && r.vertices.length >= 2 && !(i && a)) {
				let i = r.vertices.map((e) => ({
					x: e.x,
					y: e.y
				}));
				if (t.stroke.tailEnd) {
					let e = x(t.stroke.tailEnd, t.stroke, n);
					i[i.length - 1] = w(i[i.length - 1], i[i.length - 2], e);
				}
				if (t.stroke.headEnd) {
					let e = x(t.stroke.headEnd, t.stroke, n);
					i[0] = w(i[0], i[1], e);
				}
				e.beginPath(), e.moveTo(i[0].x, i[0].y);
				for (let t = 1; t < i.length; t++) e.lineTo(i[t].x, i[t].y);
				Ca(e, t.stroke, n, {
					x: c,
					y: l,
					w: u,
					h: p
				}, t.rotation), e.stroke();
			}
			i && a && Sa(e, r.start, r.end, t.stroke, i, n, t.rotation), t.stroke.tailEnd && d(e, r.end.x, r.end.y, r.end.angle, t.stroke.tailEnd, t.stroke, n, S(e, t.stroke, n, r.end.x, r.end.y, r.end.angle, t.stroke.tailEnd, {
				x: c,
				y: l,
				w: u,
				h: p
			}, t.rotation, n * Y)), t.stroke.headEnd && d(e, r.start.x, r.start.y, r.start.angle, t.stroke.headEnd, t.stroke, n, S(e, t.stroke, n, r.start.x, r.start.y, r.start.angle, t.stroke.headEnd, {
				x: c,
				y: l,
				w: u,
				h: p
			}, t.rotation, n * Y));
			return;
		}
		if (!t.stroke || !t.custGeom || t.custGeom.length === 0 || (!t.stroke.headEnd || t.stroke.headEnd.type === "none") && (!t.stroke.tailEnd || t.stroke.tailEnd.type === "none")) return;
		let { start: r, end: i } = A(t.custGeom);
		r && t.stroke.headEnd && t.stroke.headEnd.type !== "none" && d(e, c + r.x * u, l + r.y * p, Math.atan2(r.dy * p, r.dx * u), t.stroke.headEnd, t.stroke, n, S(e, t.stroke, n, c + r.x * u, l + r.y * p, Math.atan2(r.dy * p, r.dx * u), t.stroke.headEnd, {
			x: c,
			y: l,
			w: u,
			h: p
		}, t.rotation, n * Y)), i && t.stroke.tailEnd && t.stroke.tailEnd.type !== "none" && d(e, c + i.x * u, l + i.y * p, Math.atan2(i.dy * p, i.dx * u), t.stroke.tailEnd, t.stroke, n, S(e, t.stroke, n, c + i.x * u, l + i.y * p, Math.atan2(i.dy * p, i.dx * u), t.stroke.tailEnd, {
			x: c,
			y: l,
			w: u,
			h: p
		}, t.rotation, n * Y));
	}, ie = (e) => {
		if (ne.length > 0 && pa(e, c, l, u, p, ne, (e, t, n, r, i) => I(e, void 0, {
			x: t,
			y: n,
			w: r,
			h: i
		}), void 0, J)) {
			re(e), ji(e);
			return;
		}
		I(e), re(e);
	};
	if (Qi(e, t, ie, ie, q, Yi(R, c, l, u, p, t.shadow?.algn), n, te, R, !!E || j, (e) => I(e, "#000")), t.textBody) {
		let o = Wi(t, a), d = ea(t.textBody.vert, t.rotation, t.flipH, t.flipV);
		if (e.save(), t.flipH || t.flipV) {
			let n = c + u / 2, r = l + p / 2;
			e.translate(n, r), t.flipH && e.scale(-1, 1), t.flipV && e.scale(1, -1), e.translate(-n, -r);
		}
		let f = (d - t.rotation) % 360;
		if (f !== 0) {
			let t = c + u / 2, n = l + p / 2;
			e.translate(t, n), e.rotate(f * Math.PI / 180), e.translate(-t, -n);
		}
		let h = c, g = l, v = u, y = p;
		if (t.textRect) h = X(t.textRect.x, n), g = X(t.textRect.y, n), v = X(t.textRect.width, n), y = X(t.textRect.height, n);
		else if (_ === "ellipse") {
			let e = u * (1 - 1 / Math.SQRT2) / 2, t = p * (1 - 1 / Math.SQRT2) / 2;
			h = c + e, g = l + t, v = u / Math.SQRT2, y = p / Math.SQRT2;
		} else {
			let e = Ui(_, c, l, u, p, t.adj, t.adj2);
			e && (h = e.tx, g = e.ty, v = e.tw, y = e.th);
		}
		ca(e, t.textBody, h, g, v, y, n, o, d, !1, !1, r, i, a, m, !1, s), e.restore();
	}
	e.restore();
}
var na = g;
function ra(e, t) {
	let n = `${e}`, r = e >= 1 && e <= 26 ? String.fromCharCode(96 + e) : n, i = e >= 1 && e <= 26 ? String.fromCharCode(64 + e) : n, a = ia(e).toLowerCase(), o = ia(e), s = n.replace(/[0-9]/g, (e) => String.fromCharCode(65296 + (e.charCodeAt(0) - 48)));
	switch (t) {
		case "arabicPlain": return n;
		case "arabicPeriod": return `${n}.`;
		case "arabicParenR": return `${n})`;
		case "arabicParenBoth": return `(${n})`;
		case "arabicDbPlain": return s;
		case "arabicDbPeriod": return `${s}.`;
		case "alphaLcPlain": return r;
		case "alphaLcPeriod": return `${r}.`;
		case "alphaLcParenR": return `${r})`;
		case "alphaLcParenBoth": return `(${r})`;
		case "alphaUcPlain": return i;
		case "alphaUcPeriod": return `${i}.`;
		case "alphaUcParenR": return `${i})`;
		case "alphaUcParenBoth": return `(${i})`;
		case "romanLcPlain": return a;
		case "romanLcPeriod": return `${a}.`;
		case "romanLcParenR": return `${a})`;
		case "romanLcParenBoth": return `(${a})`;
		case "romanUcPlain": return o;
		case "romanUcPeriod": return `${o}.`;
		case "romanUcParenR": return `${o})`;
		case "romanUcParenBoth": return `(${o})`;
		default: return `${n}.`;
	}
}
function ia(e) {
	let t = [
		1e3,
		900,
		500,
		400,
		100,
		90,
		50,
		40,
		10,
		9,
		5,
		4,
		1
	], n = [
		"M",
		"CM",
		"D",
		"CD",
		"C",
		"XC",
		"L",
		"XL",
		"X",
		"IX",
		"V",
		"IV",
		"I"
	], r = "";
	for (let i = 0; i < t.length; i++) for (; e >= t[i];) r += n[i], e -= t[i];
	return r;
}
function aa(e) {
	for (let t of e.runs) if (t.type === "text" && t.text !== "" || t.type === "math") return !0;
	return !1;
}
function oa(e, t) {
	let n = aa(e);
	if (e.bullet.type === "char") return t.clear(), n ? ye(e.bullet.char, e.bullet.fontFamily ?? null) : "";
	if (e.bullet.type === "autoNum") {
		if (!n) return "";
		let r = e.lvl;
		return t.has(r) ? t.set(r, t.get(r) + 1) : t.set(r, e.bullet.startAt ?? 1), ra(t.get(r), e.bullet.numType);
	}
	return t.clear(), "";
}
function sa(e, t, n, r, i, a, o, s, c, l, u, d, f) {
	let p = t.autoFit === "norm" && t.fontScale != null && t.fontScale > 0 && t.fontScale < 1 ? t.fontScale : 1, m = Y * s, h = ot(a, o, {
		lIns: t.lIns,
		rIns: t.rIns,
		tIns: t.tIns,
		bIns: t.bIns
	}, s), g = (t.defaultFontSize ?? 18) * m * p, _ = t.defaultBold ?? !1, v = t.defaultItalic ?? !1, y, b = t.paragraphs.map((e) => {
		let t = e.defFontSize == null ? g : e.defFontSize * m * p, n = e.defColor ? $(e.defColor) : c, r = pi(e, t, n, s, _, v, p, u, d);
		y ??= r.sameStyle;
		let i = r.input.find((e) => e.type === "text"), a = Ur(e.defFontFamily ?? null, d), o = e.defBold ?? _, l = e.defItalic ?? v, f = i?.type === "text" ? i.style : {
			text: "",
			font: ti(o, l, t, a, d, ""),
			sizePx: t,
			color: n,
			underline: !1,
			strikethrough: !1,
			lineMetric: ni(a, o, l, d),
			faceFamily: a
		}, h = (e, t) => t == null ? e == null ? void 0 : {
			type: "pts",
			val: e / 100 * p
		} : {
			type: "pct",
			val: t
		};
		return {
			runs: r.input,
			alignment: e.alignment,
			lineSpacing: e.spaceLine?.type === "pts" ? {
				type: "pts",
				val: Un(e.spaceLine.val)
			} : e.spaceLine,
			spaceBefore: h(e.spaceBefore, e.spaceBeforePct),
			spaceAfter: h(e.spaceAfter, e.spaceAfterPct),
			markStyle: f,
			eastAsianLineBreak: e.eaLnBrk !== !1
		};
	}), x = or(e, {
		vert: n,
		rect: {
			left: r + h.left,
			top: i + h.top,
			width: h.width,
			height: h.height
		},
		anchor: t.verticalAnchor,
		anchorCtr: t.anchorCtr === !0,
		wrap: t.wrap !== "none",
		spcFirstLastPara: t.spcFirstLastPara === !0,
		lnSpcReduction: t.autoFit === "norm" ? t.lnSpcReduction ?? 0 : 0,
		pxPerPt: m,
		paragraphs: b,
		sameStyle: y,
		drawObject: (t, n, r) => {
			let i = t.math, a = Rr.get(i.nodes);
			if (!a) return;
			let o = i.ascent + i.descent;
			i.width > 0 && o > 0 && e.drawImage(zr(a, t.color), n, r, i.width, o);
		}
	});
	if (f) for (let e of x) f({
		text: e.text,
		inShapeX: e.x - r,
		inShapeY: e.y - i,
		w: e.w,
		h: e.h,
		fontSize: e.fontSize,
		font: e.font,
		shapeX: r,
		shapeY: i,
		shapeW: a,
		shapeH: o,
		rotation: l,
		...e.hyperlink ? { hyperlink: e.hyperlink } : {}
	});
}
function ca(e, t, n, r, i, a, o, s = null, c = 0, l = !1, u = !1, d = "#000000", f, p = {
	themeMajorFont: null,
	themeMinorFont: null,
	dpr: 1
}, m, h = !1, g, _ = !1, v = h) {
	if (t.vert === "wordArtVert" || t.vert === "wordArtVertRtl") {
		if (h) return i;
		sa(e, t, t.vert, n, r, i, a, o, s ?? d, c, f, p, m);
		return;
	}
	let y = t.vert === "vert" || t.vert === "eaVert", b = t.vert === "vert270";
	if (y || b) {
		let l = n + i / 2, u = r + a / 2, _ = y ? 90 : -90, v = m ? (e) => m({
			...e,
			inShapeX: e.inShapeX - a / 2 + i / 2,
			inShapeY: e.inShapeY - i / 2 + a / 2,
			shapeX: n,
			shapeY: r,
			shapeW: i,
			shapeH: a,
			rotation: c,
			textBodyRotation: _
		}) : void 0;
		if (h) return i;
		e.save(), e.translate(l, u), e.rotate(b ? -Math.PI / 2 : Math.PI / 2), ca(e, {
			...t,
			vert: "horz"
		}, -a / 2, -i / 2, a, i, o, s, 0, !1, !1, d, f, p, v, !1, g, t.vert === "eaVert"), e.restore();
		return;
	}
	let x = t.textWarp;
	if (!h && x && gt(x.preset)) {
		Hi(e, t, x.preset, x.adj ?? [], n, r, i, a, o, s ?? d, p);
		return;
	}
	let S = ot(i, a, {
		lIns: t.lIns,
		rIns: t.rIns,
		tIns: t.tIns,
		bIns: t.bIns
	}, o).left, C = X(t.rIns, o), w = X(t.tIns, o), T = X(t.bIns, o), E = t.wrap !== "none", D = t.autoFit === "sp", O = D ? E && ci(e, t, i, S, C, o, p, f) : E, k = Math.max(1, t.numCol ?? 1), A = X(t.spcCol ?? 0, o), j = t.defaultBold ?? !1, M = t.defaultItalic ?? !1, N = s ?? d, P = (r, a) => {
		let s = (t.defaultFontSize ?? 18) * Y * o * r, c = [], l = 0, u = 0, d = a, m = /* @__PURE__ */ new Map();
		for (let g = 0; g < t.paragraphs.length; g++) {
			let _ = t.paragraphs[g], y = X(_.marL, o), b = X(_.marR, o), x = X(_.indent, o), w = _.defFontSize == null ? s : _.defFontSize * Y * o * r, T = _.defColor ? $(_.defColor) : N, E = ri(_), P = (() => {
				for (let e of _.runs) if (e.type === "text" && e.fontSize != null) return e.fontSize;
				return _.defFontSize ?? t.defaultFontSize ?? 18;
			})() * Y * o * r, F = (() => {
				for (let e of _.runs) if (e.type === "text" && e.color) return e.color;
				return null;
			})(), I = F ? $(F) : T, L = (() => {
				for (let e of _.runs) if (e.type === "text" && e.fontFamily) return e.fontFamily;
				return _.defFontFamily ?? null;
			})(), R = "", z = ti(!1, !1, P, "sans-serif", p), B = I, V = !1, H = null;
			R = oa(_, m);
			let U = mn(_.bullet);
			if (U.type === "char") {
				let e = U;
				z = ti(!1, !1, e.sizePts == null ? e.sizePct == null ? P : P * (e.sizePct / 100) : e.sizePts * Y * o * r, R === e.char ? Ur(e.fontFamily ?? null, p) : "sans-serif", p, R, Wr(e.fontFamily)), B = e.color ? $(e.color) : I, V = !e.color;
			} else if (U.type === "autoNum") {
				let e = U;
				z = ti(!1, !1, e.sizePts == null ? e.sizePct == null ? P : P * (e.sizePct / 100) : e.sizePts * Y * o * r, Ur(e.fontFamily ?? L, p), p, R, Wr(e.fontFamily ?? L)), B = U.color ? $(U.color) : I, V = !U.color;
			} else if (U.type === "blip") {
				let e = U, n = ii(t, _, e) * Y * o * r;
				H = {
					imagePath: e.imagePath,
					mimeType: e.mimeType,
					sizePx: n
				};
			}
			let W = k > 1 ? (i - S - C - (k - 1) * A) / k : i - S - C, G = n + S + y, K = n + S + y + x, q = W - y - b, ee = yi(e, _, O ? q : Infinity, w, T, o, y, j, M, r, f, p, ai(E, x)), te = _.spaceBefore == null ? 0 : _.spaceBefore / 100 * Y * o * r, ne = _.spaceAfter == null ? 0 : _.spaceAfter / 100 * Y * o * r;
			for (let n = 0; n < ee.length; n++) {
				let r = ee[n], i = n === 0, s = n === ee.length - 1, f = 0, p = [], m = 0;
				for (let t of r.segments) {
					let n = t.math ? Math.max(t.sizePx, (t.math.ascent + t.math.descent) / 1.2) : t.sizePx;
					if (n > f && (f = n), t.math ? d = !1 : t.isTab || (t.lineMetric === void 0 ? d = !1 : p.push({
						sizePx: t.sizePx,
						face: t.lineMetric
					}), t.lineMetricLatin === null ? d = !1 : t.lineMetricLatin !== void 0 && t.lineMetricLatin !== t.lineMetric && p.push({
						sizePx: t.sizePx,
						face: t.lineMetricLatin
					})), !t.math && D) {
						e.font = t.font;
						let n = e.measureText(t.text || "M"), r = (n.fontBoundingBoxAscent ?? 0) + (n.fontBoundingBoxDescent ?? 0);
						r > m && (m = r);
					}
				}
				for (let e of r.metricMarks ?? []) e.lineMetric !== void 0 && p.push({
					sizePx: e.sizePx,
					face: e.lineMetric
				});
				f === 0 && (f = w);
				let y = f;
				if (i && R) {
					e.font = z;
					let t = e.measureText("M"), n = t.actualBoundingBoxAscent + t.actualBoundingBoxDescent;
					n > f && (f = n);
				}
				i && H && H.sizePx > f && (f = H.sizePx), f > y && (d = !1);
				let b = f * 1.2, S = D && m > b, C = ut(b, _.spaceLine, Y * o);
				h && !D && !v && (_.spaceLine || (C = f));
				let T = _.spaceLine?.type === "pct" ? f * (_.spaceLine.val / 1e5) : C;
				t.autoFit === "norm" && t.lnSpcReduction != null && _.spaceLine?.type !== "pts" && (C *= 1 - t.lnSpcReduction);
				let O, k, A = b, j = t.compatLnSpc === !1;
				a && d && j && (p.length === 0 || p.some((e) => e.face.excel === void 0)) && (d = !1);
				let M = _.fontAlgn, N;
				if (a && d && M && p.length > 0) {
					let e = Gn * Y * o;
					N = qn(M, p, j, e), N || (d = !1);
					for (let t of r.segments) {
						if (!N) break;
						if (t.isTab || !t.text) continue;
						let n = t.lineMetric && Jn(M, {
							sizePx: t.sizePx,
							face: t.lineMetric
						}, j, e);
						if (n === void 0) {
							d = !1;
							break;
						}
						t.fontAlgnOffsetPx = n;
					}
				}
				if (a && d && !(h && !D && !v && !_.spaceLine)) {
					let e = N ?? (j ? Wn(p.map((e) => ({
						sizePx: e.sizePx,
						box: e.face.excel
					}))) : p.length > 0 ? Hn(p.map((e) => ({
						sizePx: e.sizePx,
						share: e.face.share
					}))) : {
						ascent: b * .8,
						descent: b * .2
					});
					j && (A = e.ascent + e.descent);
					let n = et(e, _.spaceLine?.type === "pts" ? {
						type: "pts",
						val: Un(_.spaceLine.val)
					} : _.spaceLine, Y * o, t.autoFit === "norm" && t.lnSpcReduction != null ? t.lnSpcReduction : 0);
					C = n.ascent + n.descent, O = n.ascent, k = e.descent;
				}
				let P = s && _.spaceAfterPct != null ? A * (_.spaceAfterPct / 1e5) : ne, F = i && _.spaceBeforePct != null ? A * (_.spaceBeforePct / 1e5) : te, I = t.spcFirstLastPara === !0, L = g === t.paragraphs.length - 1, U = C + (s && (I || !L) ? P : 0), W = i && (I || g > 0) ? F : 0, J = i ? ai(E, x) : 0, re = r.segments.some((e) => e.text && e.text.length > 0 || e.math != null), ie = i && re ? H : null;
				c.push({
					line: r,
					linePx: U,
					lineHeight: C,
					baselineLineHeight: T,
					topGapPx: W,
					textXOffset: J,
					bulletLabel: i ? R : "",
					bulletFont: z,
					bulletColor: B,
					bulletFollowsText: V,
					bulletX: K,
					bulletImage: ie,
					textX: G,
					textMaxW: q,
					alignment: _.alignment,
					isLastLine: s,
					para: _,
					useResolvedFontMetrics: O === void 0 && S,
					metricAscent: O,
					metricNaturalDescent: k
				});
				let ae = l + W;
				l += U + W, u = Math.max(u, l, ae + (S && O === void 0 ? Math.max(C, m) : C) + (U - C));
			}
		}
		return {
			allLines: c,
			totalHeight: l,
			requiredHeight: u,
			metricOk: d
		};
	}, F = !0, I = (e) => {
		let t = P(e, F);
		return F && !t.metricOk && (F = !1, t = P(e, !1)), t;
	}, { allLines: L, totalHeight: R, requiredHeight: z } = I(1);
	if (t.autoFit === "norm" && t.fontScale != null && t.fontScale > 0 && t.fontScale < 1 && ({allLines: L, totalHeight: R, requiredHeight: z} = I(t.fontScale)), h) return w + z + T;
	let B = t.verticalAnchor ?? "t", V = r, H;
	a === 0 && B === "b" ? (H = w + z + T, V = r - H) : H = t.autoFit === "sp" && a === 0 ? w + z + T : a;
	let U = L[L.length - 1], W = U?.metricAscent !== void 0 && U.metricNaturalDescent !== void 0 ? z - (U.lineHeight - U.metricAscent) + U.metricNaturalDescent : z, G, K = Math.max(0, H - w - T);
	G = B === "ctr" ? V + nt("ctr", {
		left: S,
		top: w,
		width: i - S - C,
		height: K
	}, W) : B === "b" ? V + H - T - W : V + w, e.save(), e.textAlign = "left", e.textBaseline = "alphabetic";
	let ee = G, te = k > 1 ? (i - S - C - (k - 1) * A) / k + A : 0, ne = Math.max(0, H - w - T), J = L[L.length - 1], re = J ? Math.max(0, J.linePx - J.lineHeight) : 0, ae = z - re, oe = a === 0 || ae <= ne + .5, se = k > 1 && !oe ? Math.ceil(L.length / k) : L.length, ce = 0, le = 0;
	for (let s of L) {
		let { line: l, linePx: u, lineHeight: d, topGapPx: f, textXOffset: h, bulletLabel: v, bulletFont: y, bulletColor: b, bulletFollowsText: x, bulletImage: S, alignment: C, isLastLine: w, useResolvedFontMetrics: T, metricAscent: E } = s;
		k > 1 && ce < k - 1 && le >= se && (ce++, le = 0, G = ee), G += f, le++;
		let D = (t.rtlCol ? k - 1 - ce : ce) * te, O = s.textX + D, A = s.bulletX + D, j = s.textMaxW, M = s.para.rtl === !0, N = M || xn(l.segments), P = l.segments.some((e) => e.isTab);
		if (P) {
			let t = X(s.para.marL, o), n = X(s.para.marR, o), r = M ? n : t + h, i = j + t + n;
			e.font = l.segments.find((e) => e.isTab).font;
			let a = e.measureText(" ").width, c = Mn(l.segments.map((t) => {
				if (t.isTab) return {
					isTab: !0,
					width: 0
				};
				if (t.math) return {
					isTab: !1,
					width: t.math.width
				};
				e.font = t.font;
				let n = t.letterSpacingPx ?? 0;
				return {
					isTab: !1,
					width: t.text ? (t.leadingLetterSpacingPx ?? 0) + fi(e, t.text, n) : 0
				};
			}), (s.para.tabStops ?? []).map((e) => ({
				pos: X(e.pos, o),
				algn: e.algn
			})), r, i, a, X(s.para.defTabSz ?? 914400, o));
			for (let e = 0; e < l.segments.length; e++) l.segments[e].isTab && (l.segments[e].tabWidthPx = c[e]);
		}
		let F = 0, I = 0, L = 0, R = 0;
		for (let t of l.segments) {
			if (t.isTab) {
				F += t.tabWidthPx ?? 0;
				continue;
			}
			if (t.math) {
				F += t.math.width, I = Math.max(I, t.math.ascent);
				continue;
			}
			e.font = t.font;
			let n = e.measureText(t.text || "M"), r = t.letterSpacingPx ?? 0;
			if (F += t.leadingLetterSpacingPx ?? 0, F += t.text ? fi(e, t.text, r) : 0, n.actualBoundingBoxAscent > 0 && (I = Math.max(I, n.actualBoundingBoxAscent)), T) {
				let e = n.fontBoundingBoxAscent ?? 0, t = e + (n.fontBoundingBoxDescent ?? 0);
				t > R && (R = t, L = e);
			}
		}
		let z = T && R > 0 ? B === "t" && I > 0 ? s.para.spaceLine?.type === "pct" ? Math.max(I, L + (s.baselineLineHeight - R) / 2) : I : Math.max(I, L + Math.max(0, d - R) / 2) : Math.max(d * .8, I), V = E === void 0 ? G + z : G + E, H = V + (l.segments.find((e) => !e.isTab && !e.math && !!e.text)?.fontAlgnOffsetPx ?? 0), U = O + j, W = S && g ? p.pictureBulletImages?.has(S.imagePath) ? p.pictureBulletImages.get(S.imagePath) : Le(S.imagePath, g) : void 0, K = 0;
		if (N && M) {
			if (v) e.font = y, K = e.measureText(v).width;
			else if (S && W) {
				let e = S.sizePx;
				K = W.height > 0 ? e * (W.width / W.height) : e;
			}
		}
		if (v) {
			e.font = y;
			let t = l.segments.find((e) => !e.isTab && !e.math && !!e.text);
			if (e.fillStyle = x && t?.patternFill ? Hr(e, t, A, H, o) : b, N && M) {
				let t = e.direction;
				e.direction = "rtl", e.fillText(v, U - K, H), e.direction = t;
			} else e.fillText(v, A, H);
		}
		if (S && g && W) {
			let t = S.sizePx, n = W.height > 0 ? t * (W.width / W.height) : t, r = H - t;
			N && M ? e.drawImage(W, U - n, r, n, t) : e.drawImage(W, A, r, n, t);
		}
		let ne = O + h, J;
		J = P ? M ? O + j - K - F : ne : C === "ctr" ? $e("ctr", ne, j - h, F, !1, !0) : C === "r" ? $e("r", O - K, j, F, !1, !0) : ne;
		let re = C === "just" || C === "justLow" ? "just" : C === "thaiDist" ? "thaiDist" : C === "dist" ? "dist" : null, ae = w || (l.endsWithBreak ?? !1), oe = (re && !N && !P && ct(C, w, l.endsWithBreak ?? !1) ? wn(l.segments, j - h, F, re, ae) : null) ?? l.segments, ue = N ? Sn(l.segments, M) : null, de = (e, t) => {
			if (Math.abs(e - t) !== 1) return 0;
			let n = l.segments[Math.min(e, t)], r = l.segments[Math.max(e, t)];
			return n.isTab || n.math || r.isTab || r.math || n.sourceRunId == null || n.sourceRunId !== r.sourceRunId ? 0 : r.leadingLetterSpacingPx ?? 0;
		}, fe = oe.length;
		for (let t = 0; t < fe; t++) {
			let s = ue ? ue.order[t] : t, l = oe[s], u = ue ? ue.rtl[s] : !1;
			if (N && (e.direction = u ? "rtl" : "ltr"), t > 0) {
				let e = ue ? ue.order[t - 1] : t - 1;
				J += de(e, s);
			}
			if (l.isTab) {
				J += l.tabWidthPx ?? 0;
				continue;
			}
			let f = l.jext ?? 0, h = l.splitBefore, g = l.perGap ?? 0, v = h && h.length > 0 ? h.length * g : 0;
			if (l.math) {
				let t = Rr.get(l.math.nodes), n = l.math.width, r = l.math.ascent + l.math.descent;
				if (t && n > 0 && r > 0) {
					let i = H - l.math.ascent, a = zr(t, l.color);
					e.drawImage(a, J, i, n, r);
				}
				J += n, J += f;
				continue;
			}
			e.font = l.font;
			let y = l.drawSizePx ?? l.sizePx, b = l.baseline ? -(l.baseline / 1e5) * l.sizePx : 0, x = V + (l.fontAlgnOffsetPx ?? 0) + b, S = Hr(e, l, J, x, o);
			e.fillStyle = S;
			let C = l.letterSpacingPx ?? 0;
			if (l.highlight && l.text) {
				let t = fi(e, l.text, C) + v + f;
				Ir(e, J, x, t, y, l.highlight, S);
			}
			let w = l.shadow, T = (e, t, n, r) => {
				let i = r === "fill" ? e.fillText.bind(e) : e.strokeText.bind(e);
				if (C !== 0 && li(t) > 1) {
					let r = e, a = r.letterSpacing;
					if (di(e)) {
						r.letterSpacing = `${C}px`, i(t, n, x);
						try {
							r.letterSpacing = a;
						} catch {}
					} else {
						let r = n, a = [...t];
						for (let t = 0; t < a.length; t++) {
							let n = a[t];
							i(n, r, x), t < a.length - 1 && (r += e.measureText(n).width + C);
						}
					}
				} else i(t, n, x);
			}, E = (t) => fi(e, t, C), D = h && h.length > 0 ? pn([...l.text], h, g, E) : null, O = [...l.text], k = !!h && h.length === O.length - 1 && O.length > 1, A = (e, t) => {
				if (_) {
					let n = k ? C + g : C;
					$n(e, l.text, J, x, y, n, t);
					return;
				}
				if (k) {
					let n = t === "fill" ? e.fillText.bind(e) : e.strokeText.bind(e), r = C + g;
					if (di(e)) {
						let t = e, i = t.letterSpacing;
						t.letterSpacing = `${r}px`, n(l.text, J, x);
						try {
							t.letterSpacing = i;
						} catch {}
					} else {
						let t = J;
						for (let i = 0; i < O.length; i++) {
							let a = O[i];
							n(a, t, x), i < O.length - 1 && (t += e.measureText(a).width + r);
						}
					}
				} else if (D) for (let { text: n, dx: r } of D) T(e, n, J + r, t);
				else T(e, l.text, J, t);
			}, j = l.reflection;
			if (j && l.text && !l.noFill) {
				let t = e.canvas.width || 0, n = e.canvas.height || 0;
				if (t > 0 && n > 0) {
					e.font = l.font;
					let r = e.measureText(l.text), i = Number.isFinite(r.actualBoundingBoxAscent) ? r.actualBoundingBoxAscent : y * .8, a = Number.isFinite(r.actualBoundingBoxDescent) ? r.actualBoundingBoxDescent : y * .2, s = Number.isFinite(r.actualBoundingBoxLeft) ? r.actualBoundingBoxLeft : 0, c = Number.isFinite(r.actualBoundingBoxRight) ? r.actualBoundingBoxRight : r.width, u = e.getTransform(), d = Math.abs(u.a * u.d - u.b * u.c), f = d > 0 ? Math.sqrt(d) : 1;
					ei(e, (e) => {
						e.font = l.font, e.fillStyle = Hr(e, l, J, x, o), A(e, "fill");
					}, {
						x: (J - s) * f,
						y: (x - i) * f,
						w: Math.max(1, s + c) * f,
						h: Math.max(1, i + a) * f
					}, j, o * f, u, t, n), e.font = l.font, e.fillStyle = S;
				}
			}
			if (w && !l.noFill) {
				let t = w.dir * Math.PI / 180, n = X(w.dist, o);
				e.save(), e.shadowColor = $(w.color, w.alpha), e.shadowBlur = X(w.blur, o), e.shadowOffsetX = Math.cos(t) * n, e.shadowOffsetY = Math.sin(t) * n;
			}
			l.noFill || A(e, "fill"), w && !l.noFill && e.restore(), e.font = l.font;
			let M = fi(e, l.text, C) + v, P = l.outline;
			if (P && P.width > 0 && (e.save(), e.lineWidth = Math.max(.5, X(P.width, o)), e.strokeStyle = P.fill ? ie(P.fill, e, J, x - y, Math.max(1, M), y, 0, o * 12700) ?? "rgba(0,0,0,0)" : P.color ? `#${P.color}` : l.noFill ? "rgba(0,0,0,0)" : S, (!l.noFill || P.fill || P.color) && (e.lineJoin = "round", A(e, "stroke")), e.restore()), m && l.text && m({
				text: l.text,
				inShapeX: J - n,
				inShapeY: G - r,
				w: M + f,
				h: d,
				fontSize: y,
				font: l.font,
				shapeX: n,
				shapeY: r,
				shapeW: i,
				shapeH: a,
				rotation: c,
				hyperlink: l.hyperlink
			}), l.underline && !l.underlineLineNoFill && (!l.noFill || l.underlineFill || l.underlineColor || l.underlineLine?.fill)) {
				let t = l.underlineFill ? ie(l.underlineFill, e, J, x, M + f, y * .05, 0, o * 12700) ?? "rgba(0,0,0,0)" : l.underlineLine?.fill ? ie(l.underlineLine.fill, e, J, x, M + f, y * .05, 0, o * 12700) ?? "rgba(0,0,0,0)" : l.underlineColor ?? S;
				dn(e, J, x, M + f, y, t, l.underlineStyle, p.dpr, l.underlineLine?.width ? X(l.underlineLine.width, o) : void 0);
			}
			if (l.strikethrough && !l.noFill) {
				let t = Math.max(1, y * .05);
				e.strokeStyle = S, e.lineWidth = t, e.setLineDash([]);
				let n = x - y * .32;
				if (l.strikeDouble) {
					let r = t * .9, i = n - r, a = n + r;
					e.beginPath(), e.moveTo(J, i + q(i, t, p.dpr)), e.lineTo(J + M + f, i + q(i, t, p.dpr)), e.moveTo(J, a + q(a, t, p.dpr)), e.lineTo(J + M + f, a + q(a, t, p.dpr)), e.stroke();
				} else {
					let r = n + q(n, t, p.dpr);
					e.beginPath(), e.moveTo(J, r), e.lineTo(J + M + f, r), e.stroke();
				}
			}
			J += M, J += f;
		}
		N && (e.direction = "ltr"), G += u;
	}
	e.restore();
}
function la(e, t, n, r, i) {
	if (!e) return [];
	let a = Qt(t?.rig ?? "threePt", t?.dir ?? "t", t?.rot), o = an(n), s = r * i, c = [];
	return e.bevelT && e.bevelT.w > 0 && e.bevelT.h > 0 && c.push({
		widthPx: e.bevelT.w * s,
		heightPx: e.bevelT.h * s,
		prst: e.bevelT.prst || "circle",
		material: o,
		light: a
	}), e.bevelB && e.bevelB.w > 0 && e.bevelB.h > 0 && c.push({
		widthPx: e.bevelB.w * s,
		heightPx: e.bevelB.h * s,
		prst: e.bevelB.prst || "circle",
		material: o,
		light: a,
		bottom: !0
	}), c;
}
function ua(e, t, n, r, i, a) {
	if (!e || !e.extrusionH || e.extrusionH <= 0) return null;
	let o = e.extrusionH * i * a, s = Lt(t, n * a, r * a, o);
	if (Math.hypot(s.x, s.y) < .75) return null;
	let c = [
		64,
		64,
		64
	];
	if (e.extrusionClr) {
		let t = e.extrusionClr.replace("#", "");
		t.length >= 6 && (c = [
			parseInt(t.slice(0, 2), 16),
			parseInt(t.slice(2, 4), 16),
			parseInt(t.slice(4, 6), 16)
		]);
	}
	return {
		offsetX: s.x,
		offsetY: s.y,
		rgb: c
	};
}
function da(e, t, n, r, i) {
	let a = e.a * e.d - e.b * e.c;
	if (Math.abs(a) <= 1e-12) return;
	let o = e.d / a, s = -e.b / a, c = -e.c / a, l = e.a / a, u = -(o * e.e + c * e.f), d = -(s * e.e + l * e.f);
	return {
		a: t * o,
		b: t * s,
		c: t * c,
		d: t * l,
		e: n + t * (u - r),
		f: n + t * (d - i)
	};
}
function fa(e, t, n, r, i, a, o, s = {}) {
	if (i <= 0 || a <= 0) return !1;
	let c = e.getTransform(), l = Math.abs(c.a * c.d - c.b * c.c), u = l > 0 ? Math.sqrt(l) : 1, d = Math.max(0, Math.ceil((s.edgePadCss ?? 0) * u)), f = Ft(t, i, a), p = f.corners;
	if (d > 0) {
		let e = d / u, t = Ae(f.corners, e / i, e / a);
		t ? p = t : d = 0;
	}
	let m = d / u, h = Math.max(1, Math.ceil(i * u) + 2 * d), g = Math.max(1, Math.ceil(a * u) + 2 * d), _ = me(h, g);
	if (!_) return !1;
	let v = _.getContext("2d");
	if (!v) return !1;
	v.save(), v.scale(u, u), v.translate(m, m), s.preservePatternFrame ? se(e, v, () => o(v, 0, 0, i, a), void 0, da(c, u, d, n, r)) : o(v, 0, 0, i, a), v.restore();
	let y = Math.ceil(i * u), b = Math.ceil(a * u), x = (e) => ({
		x: d - e,
		y: d - e,
		w: y + 2 * e,
		h: b + 2 * e
	});
	if (s.extrusion) {
		let e = Math.ceil(Math.hypot(s.extrusion.offsetX, s.extrusion.offsetY)) + 2;
		un(v, s.extrusion, x(e));
	}
	if (s.bevels && s.bevels.length > 0) for (let e of s.bevels) ln(v, e, x(Math.ceil(e.widthPx) + 2));
	return s.paintEdges && (v.save(), v.scale(u, u), v.translate(m, m), s.paintEdges(v, 0, 0, i, a), v.restore()), je(_, e, h, g, p.map((e) => ({
		x: n + e.x,
		y: r + e.y
	}))), !0;
}
function pa(e, t, n, r, i, a, o, s, c = 0) {
	if (r <= 0 || i <= 0 || a.length === 0) return !1;
	let l = e.getTransform(), u = Math.abs(l.a * l.d - l.b * l.c), d = u > 0 ? Math.sqrt(u) : 1, f = Math.max(0, Math.ceil(c * d)), p = f / d, m = Math.max(1, Math.ceil(r * d) + 2 * f), h = Math.max(1, Math.ceil(i * d) + 2 * f), g = me(m, h);
	if (!g) return !1;
	let _ = g.getContext("2d");
	if (!_) return !1;
	_.save(), _.scale(d, d), _.translate(p, p), se(e, _, () => o(_, 0, 0, r, i), void 0, da(l, d, f, t, n)), _.restore();
	let v = Math.ceil(r * d), y = Math.ceil(i * d);
	for (let e of a) {
		let t = Math.ceil(e.widthPx) + 2;
		ln(_, e, {
			x: f - t,
			y: f - t,
			w: v + 2 * t,
			h: y + 2 * t
		});
	}
	return s && (_.save(), _.scale(d, d), _.translate(p, p), s(_, 0, 0, r, i), _.restore()), e.drawImage(g, t - p, n - p, m / d, h / d), !0;
}
var ma = /* @__PURE__ */ new WeakMap();
function ha(e) {
	let t = ma.get(e);
	return t || (t = async (t, n) => {
		let r = await e(t);
		return r.type === n ? r : new Blob([r], { type: n });
	}, ma.set(e, t)), t;
}
function ga(e, t, n = ha(t), r, i, a) {
	let o = ha(t);
	return Ie(e.posterPath, e.posterMimeType || "application/octet-stream", o, {
		tiff: r,
		svgDecoder: a,
		...i ?? {}
	}, n).then((e) => {
		if (!e) throw Error("Media poster could not be decoded");
		return e;
	});
}
function _a(e, t, n, r = "tiff") {
	let i = X(t.x, n), a = X(t.y, n), o = X(t.width, n), s = X(t.height, n);
	e.save();
	try {
		t.alpha != null && (e.globalAlpha *= t.alpha), (t.rotation !== 0 || t.flipH || t.flipV) && (e.translate(i + o / 2, a + s / 2), e.rotate(t.rotation * Math.PI / 180), e.scale(t.flipH ? -1 : 1, t.flipV ? -1 : 1), e.translate(-(i + o / 2), -(a + s / 2))), R(e, r, {
			x: i,
			y: a,
			width: o,
			height: s
		});
	} finally {
		e.restore();
	}
}
async function va(e, t, n, r, i = 1, a, o) {
	if (e.mimeType === "image/x-pict") return { paint: (n) => _a(n, e, t, "pict") };
	if (!n) return bi;
	try {
		let s = e.mimeType === "image/svg+xml", c = Ee(e.mimeType, e.srcRect, e.width / Y, e.height / Y);
		if (!c) return bi;
		let { widthPt: l, heightPt: u } = c, d = Or(X(e.width, t), X(e.height, t), i, e.srcRect), f = Be(e) || s, p = f ? d : o && !Z(e) ? kr(o, Q(Ar(e), f ? void 0 : Z(e))) : void 0, m = p && "maxRetainedPixels" in p ? p.maxRetainedPixels : void 0, h = {
			...p ? {
				targetWidthPx: p.targetWidthPx,
				targetHeightPx: p.targetHeightPx,
				...m === void 0 ? {} : { maxRetainedPixels: m }
			} : {},
			workerDecoder: a
		}, g;
		if (Be(e)) try {
			g = await Fe(e.svgImagePath, n, h);
		} catch {
			g = s ? await Fe(e.imagePath, n, h) : await Ge(e.imagePath, e.mimeType, Z(e), n, {
				widthPt: l,
				heightPt: u,
				...p ?? {},
				tiff: r
			});
		}
		else g = s ? await Fe(e.imagePath, n, h) : await Ge(e.imagePath, e.mimeType, Z(e), n, {
			widthPt: l,
			heightPt: u,
			...p ?? {},
			tiff: r
		});
		if (!g) return bi;
		let _ = g;
		return { paint: (n) => ba(n, e, _, t) };
	} catch (n) {
		return ya(e, t, n);
	}
}
function ya(e, t, n) {
	return C(n, "tiff") ? { paint: (n) => _a(n, e, t) } : De(n) || We(n) ? {
		...bi,
		failure: { error: n }
	} : bi;
}
function ba(e, t, n, r) {
	try {
		e.save(), t.alpha != null && (e.globalAlpha *= t.alpha);
		let i = X(t.x, r), a = X(t.y, r), o = X(t.width, r), s = X(t.height, r);
		(t.rotation !== 0 || t.flipH || t.flipV) && (e.translate(i + o / 2, a + s / 2), e.rotate(t.rotation * Math.PI / 180), t.flipH && e.scale(-1, 1), t.flipV && e.scale(1, -1), e.translate(-(i + o / 2), -(a + s / 2)));
		let c = (e, n, r, i, a) => {
			t.custGeom && t.custGeom.length > 0 ? na(e, t.custGeom, n, r, i, a) : t.prstGeom && v(e, t.prstGeom, n, r, i, a, t.prstAdjust ?? []) || e.rect(n, r, i, a);
		}, l = (e, t, n, r, i) => {
			e.beginPath(), c(e, t, n, r, i);
		}, u = (e, n, r, i, a) => {
			(t.prstGeom || t.custGeom && t.custGeom.length > 0) && (l(e, n, r, i, a), e.clip());
		}, d = (e, n, i, a, o) => {
			t.stroke && (we(t.stroke?.fill) && (e = ue(e)), e.save(), l(e, n, i, a, o), Ca(e, t.stroke, r, {
				x: n,
				y: i,
				w: a,
				h: o
			}, t.rotation), e.stroke(), e.restore());
		}, f = (e, n, i, a, o) => {
			let s = t.sp3d;
			if (s && (s.contourW ?? 0) > 0 && s.contourClr) {
				let t = Math.max(.5, s.contourW * r);
				e.save(), e.beginPath();
				let u = t * 2 + Math.max(a, o);
				e.rect(n - u, i - u, a + 2 * u, o + 2 * u), c(e, n, i, a, o), e.clip("evenodd"), e.beginPath(), l(e, n, i, a, o), e.strokeStyle = $(s.contourClr), e.lineWidth = t * 2, e.setLineDash([]), e.stroke(), e.restore();
			}
		}, p = t.scene3d && It(t.scene3d.camera) ? t.scene3d : null, m = (e, i, a, o, s) => {
			let d = t.fill && t.fill.fillType !== "none" && t.fill.fillType !== "image" ? Lr(t.fill, e, i, a, o, s, t.rotation, r * Y, c) : null;
			d && (e.save(), l(e, i, a, o, s), e.fillStyle = d, e.fill(), e.restore()), e.save(), u(e, i, a, o, s), ge(e, n, t.srcRect, i, a, o, s), e.restore();
		}, h = (e, t, n, r, i) => {
			m(e, t, n, r, i), d(e, t, n, r, i), f(e, t, n, r, i);
		}, g = (e, t, n, r, i) => {
			m(e, t, n, r, i), d(e, t, n, r, i);
		}, _ = e.getTransform(), b = Math.abs(_.a * _.d - _.b * _.c), x = b > 0 ? Math.sqrt(b) : 1, S = la(t.sp3d, t.scene3d?.lightRig, t.sp3d ? t.sp3d.prstMaterial : void 0, r, x), C = p ? ua(t.sp3d, p.camera, o, s, r, x) : null, w = t.stroke ? t.stroke.width * r / 2 : 0, E = t.sp3d?.contourW ? t.sp3d.contourW * r : 0, D = C ? Math.hypot(C.offsetX, C.offsetY) / x : 0, O = w + E + D + 2, k = (e) => {
			if (p) {
				if (fa(e, p.camera, i, a, o, s, g, {
					bevels: S,
					extrusion: C ?? void 0,
					paintEdges: f,
					edgePadCss: O
				})) return;
			} else if (S.length > 0 && pa(e, i, a, o, s, S, g, f, O)) return;
			h(e, i, a, o, s);
		}, A = (e, t, n, r, i, a) => {
			e.save(), u(e, n, r, i, a), e.fillStyle = t, e.fillRect(n, r, i, a), e.restore();
		}, j = (e, t) => {
			p && fa(e, p.camera, i, a, o, s, (e, n, r, i, a) => A(e, t, n, r, i, a)) || A(e, t, i, a, o, s);
		}, M = e.getTransform(), N = Math.abs(M.a * M.d - M.b * M.c), P = N > 0 ? Math.sqrt(N) : 1, F = w + E, I = (t.custGeom && t.custGeom.length > 0 ? y(t.custGeom, i, a, o, s) : t.prstGeom && ee(t.prstGeom.toLowerCase()) ? T(t.prstGeom.toLowerCase(), i, a, o, s, t.prstAdjust ?? []) : null) ?? {
			x: i,
			y: a,
			w: o,
			h: s
		}, L = p ? Xi(p.camera, M, i, a, o, s, O, t.shadow?.algn) : {
			bbox: Ki(M, I.x - F, I.y - F, I.w + F * 2, I.h + F * 2),
			anchor: Yi(M, i, a, o, s, t.shadow?.algn)
		}, R = r * P, z = !!(t.shadow || t.innerShadow || t.glow || t.softEdge || t.reflection), B = (e) => j(e, "#000");
		Qi(e, t, p && z ? Zi(k, M, L.bbox, {
			w: e.canvas.width || 0,
			h: e.canvas.height || 0
		}) : k, p && z ? Zi(B, M, L.bbox, {
			w: e.canvas.width || 0,
			h: e.canvas.height || 0
		}) : B, L.bbox, L.anchor, r, R, M), e.restore();
	} catch (n) {
		let i = ya(t, r, n);
		if (i.paint(e), i.failure) throw i.failure.error;
	}
}
async function xa(e, t, n, r, i, a, o = 1, s, c) {
	let l = X(e.x, t), u = X(e.y, t), d = X(e.width, t), f = X(e.height, t), p, m = !1;
	if (e.posterPath && n) try {
		p = await ga(e, n, i, a, e.posterMimeType === "image/svg+xml" ? Or(d, f, o) : c ? kr(c, Q(e.posterPath)) : void 0, s);
	} catch (e) {
		if (C(e, "tiff")) m = !0;
		else if (De(e) || We(e)) return {
			...bi,
			failure: { error: e }
		};
	}
	return { paint: (n) => {
		n.save(), wa(n, e, t), p ? n.drawImage(p, l, u, d, f) : (n.fillStyle = e.mediaKind === "video" ? "#111" : "#f0f0f0", n.fillRect(l, u, d, f), m && R(n, "tiff", {
			x: l,
			y: u,
			width: d,
			height: f
		})), r || yn(n, l + d / 2, u + f / 2, d, f, "paused"), n.restore();
	} };
}
function Sa(e, t, n, r, i, a, o) {
	let s = Math.max(.5, X(r.width, a)), c = n.x - t.x, l = n.y - t.y, u = Math.hypot(c, l);
	if (u === 0) return;
	let d = -l / u, f = c / u, p;
	switch (i) {
		case "dbl":
			p = [{
				offset: -1 / 3,
				widthFrac: 1 / 3
			}, {
				offset: 1 / 3,
				widthFrac: 1 / 3
			}];
			break;
		case "thinThick":
			p = [{
				offset: -3 / 8,
				widthFrac: 1 / 4
			}, {
				offset: 1 / 4,
				widthFrac: 1 / 2
			}];
			break;
		case "thickThin":
			p = [{
				offset: -1 / 4,
				widthFrac: 1 / 2
			}, {
				offset: 3 / 8,
				widthFrac: 1 / 4
			}];
			break;
		case "tri":
			p = [
				{
					offset: -2 / 5,
					widthFrac: 1 / 5
				},
				{
					offset: 0,
					widthFrac: 3 / 5
				},
				{
					offset: 2 / 5,
					widthFrac: 1 / 5
				}
			];
			break;
		default: return;
	}
	e.save(), e.globalCompositeOperation = "destination-out", e.strokeStyle = "#000", e.lineWidth = s + .5, e.setLineDash([]), e.beginPath(), e.moveTo(t.x, t.y), e.lineTo(n.x, n.y), e.stroke(), e.globalCompositeOperation = "source-over", e.strokeStyle = (r.fill ? Lr(r.fill, e, Math.min(t.x, n.x), Math.min(t.y, n.y), Math.max(1, Math.abs(n.x - t.x)), Math.max(1, Math.abs(n.y - t.y)), o, a * 12700) : null) ?? $(r.color);
	for (let i of p) {
		let c = d * (s * i.offset), l = f * (s * i.offset);
		if (e.lineWidth = Math.max(.5, s * i.widthFrac), e.beginPath(), e.moveTo(t.x + c, t.y + l), e.lineTo(n.x + c, n.y + l), r.fill && we(r.fill)) {
			let i = Lr(r.fill, e, Math.min(t.x, n.x), Math.min(t.y, n.y), Math.max(1, Math.abs(n.x - t.x)), Math.max(1, Math.abs(n.y - t.y)), o, a * Y, void 0, pe(e));
			i && (e.strokeStyle = i);
		}
		e.stroke();
	}
	e.restore();
}
function Ca(e, t, n, r, i = 0) {
	if (ae(e, t, n), t?.fill && r) {
		let a = Lr(t.fill, e, r.x, r.y, r.w, r.h, i, n * Y, void 0, pe(e));
		a && (e.strokeStyle = a);
	}
}
function wa(e, t, n) {
	if (t.rotation === 0 && !t.flipH && !t.flipV) return;
	let r = X(t.x, n), i = X(t.y, n), a = X(t.width, n), o = X(t.height, n);
	e.translate(r + a / 2, i + o / 2), e.rotate(t.rotation * Math.PI / 180), t.flipH && e.scale(-1, 1), t.flipV && e.scale(1, -1), e.translate(-(r + a / 2), -(i + o / 2));
}
function Ta(e, t, n, r, i = {
	themeMajorFont: null,
	themeMinorFont: null,
	dpr: 1
}, a) {
	e.save(), wa(e, t, n);
	let o = X(t.x, n), s = X(t.y, n), c = (e) => e.spcFirstLastPara ? {
		...e,
		spcFirstLastPara: !1
	} : e, l = t.cols.map((e) => X(e, n)), u = l.length, d = (e, t) => {
		let n = 0;
		for (let r = 0; r < t; r++) n += l[e + r] ?? 0;
		return n;
	}, f = [...t.rows.map((e) => X(e.height, n))], p = t.rows.reduce((e, t) => e + t.height, 0), m = t.height > p;
	for (let a = 0; a < t.rows.length; a++) {
		let o = t.rows[a];
		for (let t = 0; t < o.cells.length; t++) {
			let s = o.cells[t];
			if (s.hMerge || s.vMerge || (s.rowSpan || 1) > 1 || !s.textBody || o.height > 0 && !m) continue;
			let l = d(t, s.gridSpan || 1), u = ca(e, c(s.textBody), 0, 0, l, 0, n, null, 0, !1, !1, "#000000", r, i, void 0, !0, void 0, !1, o.height === 0) || 0;
			u > f[a] && (f[a] = u);
		}
	}
	for (let a = 0; a < t.rows.length; a++) {
		let o = t.rows[a];
		for (let s = 0; s < o.cells.length; s++) {
			let l = o.cells[s];
			if (l.hMerge || l.vMerge) continue;
			let u = l.rowSpan || 1;
			if (u <= 1 || !l.textBody) continue;
			let p = d(s, l.gridSpan || 1), h = t.rows.slice(a, Math.min(t.rows.length, a + u)).some((e) => e.height === 0);
			if (!h && !m) continue;
			let g = ca(e, c(l.textBody), 0, 0, p, 0, n, null, 0, !1, !1, "#000000", r, i, void 0, !0, void 0, !1, h) || 0, _ = 0;
			for (let e = 0; e < u && a + e < f.length; e++) _ += f[a + e];
			if (g > _) {
				let e = (g - _) / u;
				for (let t = 0; t < u && a + t < f.length; t++) f[a + t] += e;
			}
		}
	}
	let h = l.reduce((e, t) => e + t, 0), g = Array(u);
	if (t.rtl) {
		let e = o + h;
		for (let t = 0; t < u; t++) e -= l[t], g[t] = e;
	} else {
		let e = o;
		for (let t = 0; t < u; t++) g[t] = e, e += l[t];
	}
	let _ = (e, n) => t.rtl ? g[e + n - 1] : g[e], v = Array(t.rows.length);
	{
		let e = s;
		for (let n = 0; n < t.rows.length; n++) v[n] = e, e += f[n];
	}
	let y, b, x = {
		row: 0,
		column: 0
	};
	if (a) {
		let e = X(t.width, n), r = X(t.height, n), i = o + e / 2, c = s + r / 2, l = t.rotation * Math.PI / 180, u = Math.cos(l), d = Math.sin(l);
		y = (e) => {
			let n = e.shapeX + e.shapeW / 2 - i, r = e.shapeY + e.shapeH / 2 - c;
			t.flipH && (n = -n), t.flipV && (r = -r);
			let o = i + u * n - d * r, s = c + d * n + u * r;
			a({
				...e,
				...t.id === void 0 ? {} : { shapeId: t.id },
				shapeX: o - e.shapeW / 2,
				shapeY: s - e.shapeH / 2,
				rotation: t.rotation,
				...t.flipH ? { shapeFlipH: !0 } : {},
				...t.flipV ? { shapeFlipV: !0 } : {},
				tableCell: x,
				...b === void 0 ? {} : { cellHorzOverflow: b }
			});
		};
	}
	let S = [], C = t.rows.map(() => Array(u).fill(-1));
	for (let e = 0; e < t.rows.length; e++) {
		let n = t.rows[e], r = v[e];
		for (let i = 0; i < n.cells.length; i++) {
			let a = n.cells[i];
			if (a.hMerge || a.vMerge) continue;
			let o = a.gridSpan || 1, s = a.rowSpan || 1, c = d(i, o), l = 0;
			for (let t = 0; t < s; t++) l += f[e + t] ?? 0;
			let p = _(i, o), m = Math.min(e + s - 1, t.rows.length - 1), h = S.length;
			S.push({
				cell: a,
				colX: p,
				rowY: r,
				cellW: c,
				cellH: l,
				ci: i,
				ri: e,
				span: o,
				lastRi: m
			});
			for (let t = e; t <= m; t++) for (let e = i; e < i + o && e < u; e++) C[t][e] = h;
		}
	}
	let w = f.reduce((e, t) => e + t, 0), T = (r, a, o, s, c) => {
		if (r?.fillType === "image") e.beginPath(), e.rect(a, o, s, c), Oi(e, r, i.shapeFillImages?.get(Ei(r)), {
			x: a,
			y: o,
			w: s,
			h: c
		}, n);
		else {
			let i = Lr(r, e, a, o, s, c, t.rotation, n * Y);
			i && (e.fillStyle = i, e.fillRect(a, o, s, c));
		}
	};
	T(t.background ?? null, o, s, h, w);
	for (let { cell: t, colX: a, rowY: o, cellW: s, cellH: l, ci: u, ri: d } of S) if (T(t.fill, a, o, s, l), t.textBody) {
		y && (x = {
			row: d,
			column: u
		});
		let f = t.textColor ? $(t.textColor) : null, p = t.textBody.vert;
		b = p === void 0 || typeof p == "string" && /^[ \t\r\n]*horz[ \t\r\n]*$/.test(p) ? t.horzOverflow === "overflow" ? "overflow" : "clip" : void 0, e.save();
		try {
			b === "clip" && dt(e, a, s), ca(e, c(t.textBody), a, o, s, l, n, f, 0, !1, !1, "#000000", r, i, y);
		} finally {
			e.restore();
		}
	}
	let E = i.dpr, D = (e, t) => {
		if (e < 0 || e >= C.length || t < 0 || t >= u) return null;
		let n = C[e][t];
		return n < 0 ? null : S[n];
	}, O = (r, i, a, o, s) => {
		if (Ca(e, r, n, {
			x: Math.min(i, o),
			y: Math.min(a, s),
			w: Math.max(1, Math.abs(o - i)),
			h: Math.max(1, Math.abs(s - a))
		}, t.rotation), r.cmpd === "dbl" && !r.dashStyle && !r.customDash?.length && (i === o || a === s)) {
			e.fillStyle = e.strokeStyle, te(e, i, a, o, s, Math.max(.5, X(r.width, n)), E);
			return;
		}
		let c = i === o ? q(i, e.lineWidth, E) : 0, l = a === s ? q(a, e.lineWidth, E) : 0;
		e.beginPath(), e.moveTo(i + c, a + l), e.lineTo(o + c, s + l), e.stroke();
	};
	for (let r of S) {
		let { cell: i, colX: a, rowY: o, cellW: s, cellH: c } = r;
		e.save();
		let l = t.rtl ? i.borderR : i.borderL, p = t.rtl ? i.borderL : i.borderR, m = t.rtl ? r.ci + r.span === u : r.ci === 0, h = t.rtl ? r.ci === 0 : r.ci + r.span === u, g = t.rtl ? r.ci - 1 : r.ci + r.span, y = (e) => t.rtl ? e.borderR : e.borderL;
		if (r.ri === 0 && i.borderT && O(i.borderT, a, o, a + s, o), m && l && O(l, a, o, a, o + c), r.lastRi === t.rows.length - 1) {
			let e = i.borderB;
			e && O(e, a, o + c, a + s, o + c);
		} else {
			let e = r.lastRi + 1, t = o + c, n = Math.min(r.ci + r.span, u), a = r.ci;
			for (; a < n;) {
				let r = C[e][a], o = a + 1;
				for (; o < n && C[e][o] === r;) o++;
				let s = D(e, a), c = Dn(i.borderB, s ? s.cell.borderT : null);
				if (c) {
					let e = _(a, o - a);
					O(c, e, t, e + d(a, o - a), t);
				}
				a = o;
			}
		}
		if (h) {
			let e = p;
			e && O(e, a + s, o, a + s, o + c);
		} else {
			let e = a + s, t = r.ri;
			for (; t <= r.lastRi;) {
				let n = C[t][g], i = t;
				for (; i + 1 <= r.lastRi && C[i + 1][g] === n;) i++;
				let a = D(t, g), o = Dn(p, a ? y(a.cell) : null);
				o && O(o, e, v[t], e, v[i] + f[i]), t = i + 1;
			}
		}
		i.diagonalTL && (Ca(e, i.diagonalTL, n, {
			x: a,
			y: o,
			w: s,
			h: c
		}, t.rotation), e.beginPath(), e.moveTo(a, o), e.lineTo(a + s, o + c), e.stroke()), i.diagonalTR && (Ca(e, i.diagonalTR, n, {
			x: a,
			y: o,
			w: s,
			h: c
		}, t.rotation), e.beginPath(), e.moveTo(a + s, o), e.lineTo(a, o + c), e.stroke()), e.restore();
	}
	e.restore();
}
function Ea(e, t, n, r) {
	e.save(), e.globalAlpha = t.opacity, e.fillStyle = t.color, e.fillRect(0, 0, n, r), e.restore();
}
var Da = /* @__PURE__ */ new WeakMap();
function Oa(e) {
	Da.set(e, (Da.get(e) ?? 0) + 1);
}
function ka(e, t, n, r, i) {
	e.save(), e.fillStyle = "#f7f7f8", e.fillRect(0, 0, t, n);
	let a = Math.max(12, Math.min(t, n) * .04);
	e.strokeStyle = "#c8ccd2", e.lineWidth = Math.max(1, Math.min(t, n) * .004), e.setLineDash([e.lineWidth * 6, e.lineWidth * 5]), e.strokeRect(a, a, t - a * 2, n - a * 2), e.setLineDash([]);
	let o = t / 2, s = Math.max(18, Math.min(t, n) * .14);
	e.fillStyle = "#b23b3b", e.textAlign = "center", e.textBaseline = "middle", e.font = `${s}px sans-serif`, e.fillText("⚠", o, n * .34);
	let c = Math.max(11, Math.min(t, n) * .045);
	e.fillStyle = "#333333", e.font = `600 ${c}px sans-serif`, e.fillText(`Slide ${r} could not be displayed`, o, n * .52);
	let l = Math.max(9, Math.min(t, n) * .028);
	e.fillStyle = "#666666", e.font = `${l}px sans-serif`;
	let u = t - a * 4, d = i.split(/\s+/), f = [], p = "";
	for (let t of d) {
		let n = p ? `${p} ${t}` : t;
		if (e.measureText(n).width > u && p ? (f.push(p), p = t) : p = n, f.length >= 4) break;
	}
	p && f.length < 4 && f.push(p);
	let m = l * 1.35, h = n * .6 + m;
	for (let t of f.slice(0, 4)) e.fillText(t, o, h), h += m;
	e.restore();
}
async function Aa(e, t, n, r, i = {}, a) {
	return ja(e, t, n, r, i, a);
}
async function ja(e, t, n, r, i = {}, a) {
	let o = i.fetchImage ?? (i.fetchMedia ? ha(i.fetchMedia) : void 0), s = (Da.get(e) ?? 0) + 1;
	Da.set(e, s);
	let c = () => Da.get(e) !== s, l = () => c() ? Promise.resolve(e) : Ma(e, t, n, r, i, a, o, c);
	return o && Fr(t) ? Ne(o, i.imageResources, l) : l();
}
async function Ma(e, t, n, r, i = {}, a, o, s = () => !1) {
	let c = i.width ?? ((p(e) ? e.offsetWidth : 0) || 960), l = c / n, u = Math.round(c), d = Math.round(r * l), f = i.dpr ?? E(), m = oe(u * f, d * f), h = m.clamped ? f * m.scale : f, g = await Mr(t, u, d, l, h, i.imageResources, i.fetchImage, i.fetchMedia, o, i.tiff), _ = () => {
		e.width = m.width, e.height = m.height, p(e) && (e.style.width = `${u}px`, e.style.display || (e.style.display = "block"));
		let t = e.getContext("2d");
		if (!t) throw Error("Could not get 2D context");
		return t.scale(h, h), t;
	};
	if (t.parseError) return ka(_(), u, d, t.slideNumber, t.parseError), e;
	let v = i.defaultTextColor ? `#${i.defaultTextColor}` : "#000000", y = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map(), x = {
		cjkFallback: i.cjkFallback ? Ze(t, i.majorFont ?? null, i.minorFont ?? null, i.cjkFallback) : void 0,
		themeMajorFont: i.majorFont ?? null,
		themeMinorFont: i.minorFont ?? null,
		themeHlinkColor: i.hlinkColor ?? null,
		embeddedFontAliases: i.embeddedFontAliases,
		embeddedFontAuthoredFamilies: i.embeddedFontAuthoredFamilies,
		embeddedFontTuples: i.embeddedFontTuples,
		officeFontRoutes: i.officeFontRoutes,
		googleSubstitutes: i.googleSubstitutes,
		dpr: h,
		smartArtFallbackTextColor: jn(t.background, v),
		pictureBulletImages: y,
		shapeFillImages: b
	}, S = [], w = () => S.some((e) => e.failure);
	if (S.push(await xi(t.background, u, d, l, i.fetchImage, i.tiff, i.svgDecoder, g)), s()) return e;
	if (!w() && i.math) {
		try {
			await Vr(t, i.math);
		} catch (e) {
			S.push({
				...bi,
				failure: { error: e }
			});
		}
		if (s()) return e;
	}
	let T = t.slideNumber, D = w() ? [] : t.elements.map((e) => e.type === "picture" ? va(e, l, i.fetchImage, i.tiff, h, i.svgDecoder, g) : e.type === "media" ? xa(e, l, i.fetchMedia, i.skipMediaControls, o, i.tiff, h, i.svgDecoder, g) : Promise.resolve(null)).map((e) => e.catch((e) => ({
		...bi,
		failure: { error: e }
	}))), O = /* @__PURE__ */ new Map();
	if (!w() && i.fetchImage) {
		let n = i.fetchImage, r = /* @__PURE__ */ new Map();
		for (let { fill: e, width: n, height: i } of Pr(t)) {
			if (!(n > 0) || !(i >= 0)) continue;
			let t = Ei(e), a = r.get(t), o = n / Y, s = i / Y, c = e.fillRect ?? {}, u = Or(X(n, l) * (1 - (c.l ?? 0) - (c.r ?? 0)), X(i, l) * (1 - (c.t ?? 0) - (c.b ?? 0)), h, e.srcRect);
			r.set(t, a ? {
				fill: a.fill,
				widthPt: Math.max(a.widthPt, o),
				heightPt: Math.max(a.heightPt, s),
				targetWidthPx: Math.max(a.targetWidthPx ?? 0, u?.targetWidthPx ?? 0) || void 0,
				targetHeightPx: Math.max(a.targetHeightPx ?? 0, u?.targetHeightPx ?? 0) || void 0,
				preserveNaturalSize: a.preserveNaturalSize || e.tile != null,
				hasSourceCrop: a.hasSourceCrop || e.srcRect != null
			} : {
				fill: e,
				widthPt: o,
				heightPt: s,
				targetWidthPx: u?.targetWidthPx,
				targetHeightPx: u?.targetHeightPx,
				preserveNaturalSize: e.tile != null,
				hasSourceCrop: e.srcRect != null
			});
		}
		let a = /* @__PURE__ */ new Map(), o = [];
		for (let e of t.elements) {
			if (e.type !== "chart" || !Number.isFinite(e.width) || e.width <= 0 || !Number.isFinite(e.height) || e.height <= 0) continue;
			let t = {
				widthPt: e.width / Y,
				heightPt: e.height / Y,
				targetWidthPx: X(e.width, l) * h,
				targetHeightPx: X(e.height, l) * h
			}, n = [], r = !0;
			for (let i of _e(e.chart)) {
				let e = he(i, t);
				if (!e) {
					r = !1;
					break;
				}
				n.push({
					usage: i,
					size: e
				});
			}
			r && o.push({
				element: e,
				frame: t,
				usages: n
			});
		}
		let c = /* @__PURE__ */ new Map();
		for (let e of xe(o.map(({ element: e }) => e.chart), (e, t) => he(e, o[t].frame) != null)) {
			let { fill: t } = e, n = Se(t);
			c.has(n) || c.set(n, {
				fill: t,
				widthPt: 0,
				heightPt: 0,
				preserveNaturalSize: e.preserveNaturalSize,
				hasSourceCrop: e.hasSourceCrop
			});
		}
		for (let { usages: e } of o) for (let { usage: t, size: n } of e) {
			let { fill: e } = t, r = Se(e), i = c.get(r);
			if (!i) continue;
			let a = i.preserveNaturalSize || t.preserveNaturalSize, o = i.hasSourceCrop || t.hasSourceCrop, s = a || Z(e) ? void 0 : kr(g, Q(e.imagePath, Z(e))), l = !Z(e) && (e.mimeType === "image/svg+xml" || Be({
				svgImagePath: e.svgImagePath,
				srcRect: o ? !0 : null
			}));
			c.set(r, {
				...i,
				widthPt: Math.max(i.widthPt, n.widthPt),
				heightPt: Math.max(i.heightPt, n.heightPt),
				targetWidthPx: a ? void 0 : s?.targetWidthPx ?? (l && Math.max(i.targetWidthPx ?? 0, n.targetWidthPx ?? 0) || void 0),
				targetHeightPx: a ? void 0 : s?.targetHeightPx ?? (l && Math.max(i.targetHeightPx ?? 0, n.targetHeightPx ?? 0) || void 0),
				maxRetainedPixels: s?.maxRetainedPixels,
				preserveNaturalSize: a,
				hasSourceCrop: o
			});
		}
		for (let e of t.elements) if (!(e.type !== "shape" || !e.textBody)) for (let t of e.textBody.paragraphs) {
			let n = mn(t.bullet);
			if (n.type === "blip") {
				let r = ii(e.textBody, t, n) * Y * l * h, i = a.get(n.imagePath);
				i ? Number.isFinite(r) && r > 0 && (i.targetHeightPx = Math.max(i.targetHeightPx ?? 0, r)) : a.set(n.imagePath, {
					mimeType: n.mimeType,
					...Number.isFinite(r) && r > 0 ? { targetHeightPx: r } : {}
				});
			}
		}
		if (a.size > 0 || c.size > 0 || r.size > 0) {
			let t = [...a].map(async ([e, { mimeType: t, targetHeightPx: r }]) => {
				try {
					let a = t === "image/svg+xml" ? r === void 0 ? {} : {
						targetWidthPx: 1,
						targetHeightPx: r
					} : kr(g, Q(e)) ?? {}, o = t === "image/svg+xml" ? await Fe(e, n, {
						...a,
						workerDecoder: i.svgDecoder
					}) : await Ie(e, t, n, {
						tiff: i.tiff,
						...a
					});
					y.set(e, o);
				} catch (t) {
					if (C(t, "tiff")) {
						y.set(e, null);
						return;
					}
					if (De(t) || We(t)) throw t;
					y.set(e, null);
				}
			}), o = [...c].map(async ([e, t]) => {
				let { fill: r, widthPt: a, heightPt: o, targetWidthPx: s, targetHeightPx: c, maxRetainedPixels: l, hasSourceCrop: u } = t, d = s && c ? {
					targetWidthPx: s,
					targetHeightPx: c,
					...l === void 0 ? {} : { maxRetainedPixels: l }
				} : void 0;
				try {
					let t = () => r.mimeType === "image/svg+xml" ? Z(r) ? Promise.resolve(null) : Fe(r.imagePath, n, {
						...d ?? {},
						workerDecoder: i.svgDecoder
					}) : Ge(r.imagePath, r.mimeType, Z(r), n, {
						widthPt: a,
						heightPt: o,
						...d ?? {},
						failClosedOnDuotoneFailure: !0,
						tiff: i.tiff
					}), s, c = {
						svgImagePath: r.svgImagePath,
						srcRect: u ? !0 : null
					};
					if (!Z(r) && Be(c)) try {
						s = await Fe(c.svgImagePath, n, {
							...d ?? {},
							workerDecoder: i.svgDecoder
						});
					} catch {
						s = await t();
					}
					else s = await t();
					O.set(e, s);
				} catch (t) {
					if (C(t, "tiff")) {
						O.set(e, null);
						return;
					}
					if (De(t) || We(t)) throw t;
					O.set(e, null);
				}
			}), l = [...r].map(async ([e, { fill: t, widthPt: r, heightPt: a, targetWidthPx: o, targetHeightPx: s, preserveNaturalSize: c, hasSourceCrop: l }]) => {
				let u = !Z(t) && (t.mimeType === "image/svg+xml" || Be({
					svgImagePath: t.svgImagePath,
					srcRect: l ? !0 : null
				})), d = !c && !Z(t) ? kr(g, Q(t.imagePath, Z(t))) : void 0, f = u ? !c && o && s ? {
					targetWidthPx: o,
					targetHeightPx: s
				} : void 0 : d;
				try {
					let o = c ? (await ze(t.imagePath, t.mimeType, n)).dimensions ?? void 0 : void 0, s = () => t.mimeType === "image/svg+xml" ? Z(t) ? Promise.resolve(null) : Fe(t.imagePath, n, {
						...f ?? {},
						workerDecoder: i.svgDecoder
					}) : Ge(t.imagePath, t.mimeType, Z(t), n, {
						widthPt: r,
						heightPt: a,
						...f ?? {},
						failClosedOnDuotoneFailure: !0,
						tiff: i.tiff,
						svgDecoder: i.svgDecoder
					}), u;
					if (!Z(t) && Be({
						svgImagePath: t.svgImagePath,
						srcRect: l ? !0 : null
					})) try {
						u = await Fe(t.svgImagePath, n, {
							...f ?? {},
							workerDecoder: i.svgDecoder
						});
					} catch {
						u = await s();
					}
					else u = await s();
					b.set(e, u ? {
						image: u,
						intrinsicSize: o
					} : null);
				} catch (t) {
					if (C(t, "tiff")) {
						b.set(e, null);
						return;
					}
					if (De(t) || We(t)) throw t;
					b.set(e, null);
				}
			});
			try {
				await Promise.all([
					...t,
					...o,
					...l
				]);
			} catch (e) {
				S.push({
					...bi,
					failure: { error: e }
				});
			}
			if (s()) return e;
		}
	}
	let k = [];
	if (!w()) for (let t of D) {
		let n = await t;
		if (s()) return e;
		if (k.push(n), n?.failure) break;
	}
	if (s()) return e;
	let A = _();
	for (let e of S) if (e.paint(A), e.failure) throw e.failure.error;
	let j = {
		a: h,
		d: h
	};
	for (let [n, r] of t.elements.entries()) {
		if (s()) return e;
		if (r.type === "shape") {
			let e = a ? (e) => a({
				...e,
				elementIndex: n,
				origin: t.elementSources?.[n]?.origin ?? "slide"
			}) : void 0;
			fe(A, j, () => ta(A, r, l, v, T, x, e, i.fetchImage));
		} else if (r.type === "picture" || r.type === "media") {
			let e = k[n];
			if (e && (fe(A, j, () => e.paint(A)), e.failure)) throw e.failure.error;
		} else if (r.type === "table") {
			let e = a ? (e) => a({
				...e,
				elementIndex: n,
				origin: t.elementSources?.[n]?.origin ?? "slide"
			}) : void 0;
			fe(A, j, () => Ta(A, r, l, T, x, e));
		} else if (r.type === "chart") {
			let e = Y * l;
			fe(A, j, () => {
				A.save(), wa(A, r, l), Oe(A, r.chart, {
					x: X(r.x, l),
					y: X(r.y, l),
					w: X(r.width, l),
					h: X(r.height, l)
				}, e, r.rotation, i.threeD, i.regionMap, (e) => O.get(Se(e)), i.chartEx), A.restore();
			});
		}
	}
	return s() || i.dim && Ea(A, i.dim, u, d), e;
}
//#endregion
//#region packages/pptx/src/slide-pull-client.ts
var Na = 1024 * 1024, Pa = class {
	active = /* @__PURE__ */ new Set();
	nextSessionId = 1;
	constructor(e) {
		if (this.options = e, !Number.isSafeInteger(e.slideCount) || e.slideCount < 0) throw TypeError("slideCount must be a non-negative safe integer");
		if (e.generation !== void 0 && (!Number.isSafeInteger(e.generation) || e.generation <= 0)) throw TypeError("generation must be a positive safe integer");
	}
	async load(e, n = !0, r) {
		this.assertSlideIndex(e);
		let i = this.nextSessionId++, a = {
			sessionId: i,
			operationId: i,
			generation: this.options.generation ?? 1
		}, o = new Je(this.options.transport, {
			...a,
			maxByteCredit: t,
			timeoutMs: r
		});
		this.active.add(o);
		try {
			await this.options.open(e, a, r);
			let t = await Ia(o);
			try {
				let e = t.usage ?? o.usageCheckpoint;
				e && this.options.onUsage?.(e);
				let r = n ? JSON.parse(new TextDecoder().decode(new Uint8Array(t.payload))) : void 0;
				return await t.ack(), r;
			} finally {
				t.disposeTransferred();
			}
		} catch (e) {
			throw await o.cancel("request-error").catch(() => void 0), e;
		} finally {
			this.active.delete(o);
		}
	}
	cancelAll() {
		for (let e of this.active) e.cancel("closed").catch(() => void 0);
		this.active.clear();
	}
	assertSlideIndex(e) {
		if (!Number.isSafeInteger(e) || e < 0 || e >= this.options.slideCount) throw RangeError(`Slide index ${e} out of range (count: ${this.options.slideCount})`);
	}
};
function Fa(e) {
	return !!e && typeof e == "object" && e.protocol === "ooxml-pull-v1";
}
async function Ia(e) {
	try {
		return await e.pull(Na);
	} catch (t) {
		let n = La(t);
		if (n === void 0) throw t;
		return e.pull(n);
	}
}
function La(e) {
	return qe(e, Na, t);
}
//#endregion
export { ja as a, Aa as i, Fa as n, yn as o, Oa as r, Pa as t };
