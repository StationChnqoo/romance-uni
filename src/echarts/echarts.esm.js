var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_echarts_min_1 = __commonJS({
  "../Downloads/echarts.min (1).js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).echarts = {});
    }(exports, function(t) {
      "use strict";
      var m = function(t3, e3) {
        return (m = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? function(t4, e4) {
          t4.__proto__ = e4;
        } : function(t4, e4) {
          for (var n3 in e4)
            Object.prototype.hasOwnProperty.call(e4, n3) && (t4[n3] = e4[n3]);
        }))(t3, e3);
      };
      function u(t3, e3) {
        if ("function" != typeof e3 && null !== e3)
          throw new TypeError("Class extends value " + String(e3) + " is not a constructor or null");
        function n3() {
          this.constructor = t3;
        }
        m(t3, e3), t3.prototype = null === e3 ? Object.create(e3) : (n3.prototype = e3.prototype, new n3());
      }
      var x = function() {
        this.firefox = false, this.ie = false, this.edge = false, this.newEdge = false, this.weChat = false;
      }, b = new function() {
        this.browser = new x(), this.node = false, this.wxa = false, this.worker = false, this.svgSupported = false, this.touchEventsSupported = false, this.pointerEventsSupported = false, this.domSupported = false, this.transformSupported = false, this.transform3dSupported = false, this.hasGlobalWindow = "undefined" != typeof window;
      }();
      "object" == typeof wx && "function" == typeof wx.getSystemInfoSync ? (b.wxa = true, b.touchEventsSupported = true) : "undefined" == typeof document && "undefined" != typeof self ? b.worker = true : !b.hasGlobalWindow || "Deno" in window || "undefined" != typeof navigator && "string" == typeof navigator.userAgent && -1 < navigator.userAgent.indexOf("Node.js") ? (b.node = true, b.svgSupported = true) : (nt = navigator.userAgent, Yt = (Xt = b).browser, ut = nt.match(/Firefox\/([\d.]+)/), N = nt.match(/MSIE\s([\d.]+)/) || nt.match(/Trident\/.+?rv:(([\d.]+))/), et = nt.match(/Edge?\/([\d.]+)/), nt = /micromessenger/i.test(nt), ut && (Yt.firefox = true, Yt.version = ut[1]), N && (Yt.ie = true, Yt.version = N[1]), et && (Yt.edge = true, Yt.version = et[1], Yt.newEdge = 18 < +et[1].split(".")[0]), nt && (Yt.weChat = true), Xt.svgSupported = "undefined" != typeof SVGRect, Xt.touchEventsSupported = "ontouchstart" in window && !Yt.ie && !Yt.edge, Xt.pointerEventsSupported = "onpointerdown" in window && (Yt.edge || Yt.ie && 11 <= +Yt.version), (Xt.domSupported = "undefined" != typeof document) && (ut = document.documentElement.style, Xt.transform3dSupported = (Yt.ie && "transition" in ut || Yt.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in ut) && !("OTransition" in ut), Xt.transformSupported = Xt.transform3dSupported || Yt.ie && 9 <= +Yt.version));
      var w = 12, S = "sans-serif", K = w + "px " + S;
      var M, T, k = function(t3) {
        var e3 = {};
        if ("undefined" != typeof JSON)
          for (var n3 = 0; n3 < t3.length; n3++) {
            var i3 = String.fromCharCode(n3 + 32), r3 = (t3.charCodeAt(n3) - 20) / 100;
            e3[i3] = r3;
          }
        return e3;
      }("007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N"), $ = { createCanvas: function() {
        return "undefined" != typeof document && document.createElement("canvas");
      }, measureText: function(t3, e3) {
        if (M || (n3 = $.createCanvas(), M = n3 && n3.getContext("2d")), M)
          return T !== e3 && (T = M.font = e3 || K), M.measureText(t3);
        t3 = t3 || "", e3 = e3 || K;
        var n3 = /((?:\d+)?\.?\d*)px/.exec(e3), i3 = n3 && +n3[1] || w, r3 = 0;
        if (0 <= e3.indexOf("mono"))
          r3 = i3 * t3.length;
        else
          for (var o3 = 0; o3 < t3.length; o3++) {
            var a3 = k[t3[o3]];
            r3 += null == a3 ? i3 : a3 * i3;
          }
        return { width: r3 };
      }, loadImage: function(t3, e3, n3) {
        var i3 = new Image();
        return i3.onload = e3, i3.onerror = n3, i3.src = t3, i3;
      }, getTime: function() {
        return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
      } };
      function D(t3) {
        for (var e3 in $)
          $.hasOwnProperty(e3) && t3[e3] && ($[e3] = t3[e3]);
      }
      var A = dt(["Function", "RegExp", "Date", "Error", "CanvasGradient", "CanvasPattern", "Image", "Canvas"], function(t3, e3) {
        return t3["[object " + e3 + "]"] = true, t3;
      }, {}), P = dt(["Int8", "Uint8", "Uint8Clamped", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float64"], function(t3, e3) {
        return t3["[object " + e3 + "Array]"] = true, t3;
      }, {}), R = Object.prototype.toString, N = Array.prototype, z = N.forEach, Q = N.filter, J = N.slice, tt = N.map, et = function() {
      }.constructor, nt = et ? et.prototype : null, it = "__proto__", rt = 2311, ot = Math.pow(2, 53) - 1;
      function at() {
        return ot <= rt && (rt = 0), rt++;
      }
      function st() {
        for (var t3 = [], e3 = 0; e3 < arguments.length; e3++)
          t3[e3] = arguments[e3];
        "undefined" != typeof console && console.error.apply(console, t3);
      }
      function _(t3) {
        if (null == t3 || "object" != typeof t3)
          return t3;
        var e3 = t3, n3 = R.call(t3);
        if ("[object Array]" === n3) {
          if (!Ot(t3))
            for (var e3 = [], i3 = 0, r3 = t3.length; i3 < r3; i3++)
              e3[i3] = _(t3[i3]);
        } else if (P[n3]) {
          if (!Ot(t3)) {
            var o3 = t3.constructor;
            if (o3.from)
              e3 = o3.from(t3);
            else {
              e3 = new o3(t3.length);
              for (i3 = 0, r3 = t3.length; i3 < r3; i3++)
                e3[i3] = t3[i3];
            }
          }
        } else if (!A[n3] && !Ot(t3) && !xt(t3))
          for (var a3 in e3 = {}, t3)
            t3.hasOwnProperty(a3) && a3 !== it && (e3[a3] = _(t3[a3]));
        return e3;
      }
      function d(t3, e3, n3) {
        if (!X(e3) || !X(t3))
          return n3 ? _(e3) : t3;
        for (var i3 in e3) {
          var r3, o3;
          e3.hasOwnProperty(i3) && i3 !== it && (r3 = t3[i3], !X(o3 = e3[i3]) || !X(r3) || G(o3) || G(r3) || xt(o3) || xt(r3) || vt(o3) || vt(r3) || Ot(o3) || Ot(r3) ? !n3 && i3 in t3 || (t3[i3] = _(e3[i3])) : d(r3, o3, n3));
        }
        return t3;
      }
      function V(t3, e3) {
        if (Object.assign)
          Object.assign(t3, e3);
        else
          for (var n3 in e3)
            e3.hasOwnProperty(n3) && n3 !== it && (t3[n3] = e3[n3]);
        return t3;
      }
      function lt(t3, e3, n3) {
        t3 = t3 || {};
        for (var i3 = 0; i3 < n3.length; i3++) {
          var r3 = n3[i3];
          t3[r3] = e3[r3];
        }
        return t3;
      }
      function B(t3, e3, n3) {
        for (var i3 = O(e3), r3 = 0, o3 = i3.length; r3 < o3; r3++) {
          var a3 = i3[r3];
          (n3 ? null != e3[a3] : null == t3[a3]) && (t3[a3] = e3[a3]);
        }
        return t3;
      }
      var ut = $.createCanvas;
      function L(t3, e3) {
        if (t3) {
          if (t3.indexOf)
            return t3.indexOf(e3);
          for (var n3 = 0, i3 = t3.length; n3 < i3; n3++)
            if (t3[n3] === e3)
              return n3;
        }
        return -1;
      }
      function ht(t3, e3) {
        var n3, i3 = t3.prototype;
        function r3() {
        }
        for (n3 in r3.prototype = e3.prototype, t3.prototype = new r3(), i3)
          i3.hasOwnProperty(n3) && (t3.prototype[n3] = i3[n3]);
        (t3.prototype.constructor = t3).superClass = e3;
      }
      function ct(t3, e3, n3) {
        if (t3 = "prototype" in t3 ? t3.prototype : t3, e3 = "prototype" in e3 ? e3.prototype : e3, Object.getOwnPropertyNames)
          for (var i3 = Object.getOwnPropertyNames(e3), r3 = 0; r3 < i3.length; r3++) {
            var o3 = i3[r3];
            "constructor" !== o3 && (n3 ? null != e3[o3] : null == t3[o3]) && (t3[o3] = e3[o3]);
          }
        else
          B(t3, e3, n3);
      }
      function pt(t3) {
        return !!t3 && "string" != typeof t3 && "number" == typeof t3.length;
      }
      function F(t3, e3, n3) {
        if (t3 && e3)
          if (t3.forEach && t3.forEach === z)
            t3.forEach(e3, n3);
          else if (t3.length === +t3.length)
            for (var i3 = 0, r3 = t3.length; i3 < r3; i3++)
              e3.call(n3, t3[i3], i3, t3);
          else
            for (var o3 in t3)
              t3.hasOwnProperty(o3) && e3.call(n3, t3[o3], o3, t3);
      }
      function E(t3, e3, n3) {
        if (!t3)
          return [];
        if (!e3)
          return Ct(t3);
        if (t3.map && t3.map === tt)
          return t3.map(e3, n3);
        for (var i3 = [], r3 = 0, o3 = t3.length; r3 < o3; r3++)
          i3.push(e3.call(n3, t3[r3], r3, t3));
        return i3;
      }
      function dt(t3, e3, n3, i3) {
        if (t3 && e3) {
          for (var r3 = 0, o3 = t3.length; r3 < o3; r3++)
            n3 = e3.call(i3, n3, t3[r3], r3, t3);
          return n3;
        }
      }
      function ft(t3, e3, n3) {
        if (!t3)
          return [];
        if (!e3)
          return Ct(t3);
        if (t3.filter && t3.filter === Q)
          return t3.filter(e3, n3);
        for (var i3 = [], r3 = 0, o3 = t3.length; r3 < o3; r3++)
          e3.call(n3, t3[r3], r3, t3) && i3.push(t3[r3]);
        return i3;
      }
      function gt(t3, e3, n3) {
        if (t3 && e3) {
          for (var i3 = 0, r3 = t3.length; i3 < r3; i3++)
            if (e3.call(n3, t3[i3], i3, t3))
              return t3[i3];
        }
      }
      function O(t3) {
        if (!t3)
          return [];
        if (Object.keys)
          return Object.keys(t3);
        var e3, n3 = [];
        for (e3 in t3)
          t3.hasOwnProperty(e3) && n3.push(e3);
        return n3;
      }
      var y = nt && H(nt.bind) ? nt.call.bind(nt.bind) : function(t3, e3) {
        for (var n3 = [], i3 = 2; i3 < arguments.length; i3++)
          n3[i3 - 2] = arguments[i3];
        return function() {
          return t3.apply(e3, n3.concat(J.call(arguments)));
        };
      };
      function yt(t3) {
        for (var e3 = [], n3 = 1; n3 < arguments.length; n3++)
          e3[n3 - 1] = arguments[n3];
        return function() {
          return t3.apply(this, e3.concat(J.call(arguments)));
        };
      }
      function G(t3) {
        return Array.isArray ? Array.isArray(t3) : "[object Array]" === R.call(t3);
      }
      function H(t3) {
        return "function" == typeof t3;
      }
      function W(t3) {
        return "string" == typeof t3;
      }
      function mt(t3) {
        return "[object String]" === R.call(t3);
      }
      function U(t3) {
        return "number" == typeof t3;
      }
      function X(t3) {
        var e3 = typeof t3;
        return "function" == e3 || !!t3 && "object" == e3;
      }
      function vt(t3) {
        return !!A[R.call(t3)];
      }
      function _t(t3) {
        return !!P[R.call(t3)];
      }
      function xt(t3) {
        return "object" == typeof t3 && "number" == typeof t3.nodeType && "object" == typeof t3.ownerDocument;
      }
      function bt(t3) {
        return null != t3.colorStops;
      }
      function wt(t3) {
        return null != t3.image;
      }
      function St(t3) {
        return "[object RegExp]" === R.call(t3);
      }
      function Mt(t3) {
        return t3 != t3;
      }
      function Tt() {
        for (var t3 = [], e3 = 0; e3 < arguments.length; e3++)
          t3[e3] = arguments[e3];
        for (var n3 = 0, i3 = t3.length; n3 < i3; n3++)
          if (null != t3[n3])
            return t3[n3];
      }
      function Y(t3, e3) {
        return null != t3 ? t3 : e3;
      }
      function It(t3, e3, n3) {
        return null != t3 ? t3 : null != e3 ? e3 : n3;
      }
      function Ct(t3) {
        for (var e3 = [], n3 = 1; n3 < arguments.length; n3++)
          e3[n3 - 1] = arguments[n3];
        return J.apply(t3, e3);
      }
      function kt(t3) {
        var e3;
        return "number" == typeof t3 ? [t3, t3, t3, t3] : 2 === (e3 = t3.length) ? [t3[0], t3[1], t3[0], t3[1]] : 3 === e3 ? [t3[0], t3[1], t3[2], t3[1]] : t3;
      }
      function Dt(t3, e3) {
        if (!t3)
          throw new Error(e3);
      }
      function At(t3) {
        return null == t3 ? null : "function" == typeof t3.trim ? t3.trim() : t3.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
      }
      var Lt = "__ec_primitive__";
      function Pt(t3) {
        t3[Lt] = true;
      }
      function Ot(t3) {
        return t3[Lt];
      }
      Nt.prototype.delete = function(t3) {
        var e3 = this.has(t3);
        return e3 && delete this.data[t3], e3;
      }, Nt.prototype.has = function(t3) {
        return this.data.hasOwnProperty(t3);
      }, Nt.prototype.get = function(t3) {
        return this.data[t3];
      }, Nt.prototype.set = function(t3, e3) {
        return this.data[t3] = e3, this;
      }, Nt.prototype.keys = function() {
        return O(this.data);
      }, Nt.prototype.forEach = function(t3) {
        var e3, n3 = this.data;
        for (e3 in n3)
          n3.hasOwnProperty(e3) && t3(n3[e3], e3);
      };
      var Rt = Nt;
      function Nt() {
        this.data = {};
      }
      var zt = "function" == typeof Map;
      Et.prototype.hasKey = function(t3) {
        return this.data.has(t3);
      }, Et.prototype.get = function(t3) {
        return this.data.get(t3);
      }, Et.prototype.set = function(t3, e3) {
        return this.data.set(t3, e3), e3;
      }, Et.prototype.each = function(n3, i3) {
        this.data.forEach(function(t3, e3) {
          n3.call(i3, t3, e3);
        });
      }, Et.prototype.keys = function() {
        var t3 = this.data.keys();
        return zt ? Array.from(t3) : t3;
      }, Et.prototype.removeKey = function(t3) {
        this.data.delete(t3);
      };
      var Bt = Et;
      function Et(t3) {
        var n3 = G(t3), i3 = (this.data = new (zt ? Map : Rt)(), this);
        function e3(t4, e4) {
          n3 ? i3.set(t4, e4) : i3.set(e4, t4);
        }
        t3 instanceof Et ? t3.each(e3) : t3 && F(t3, e3);
      }
      function I(t3) {
        return new Bt(t3);
      }
      function Vt(t3, e3) {
        for (var n3 = new t3.constructor(t3.length + e3.length), i3 = 0; i3 < t3.length; i3++)
          n3[i3] = t3[i3];
        for (var r3 = t3.length, i3 = 0; i3 < e3.length; i3++)
          n3[i3 + r3] = e3[i3];
        return n3;
      }
      function Ft(t3, e3) {
        var n3, t3 = Object.create ? Object.create(t3) : ((n3 = function() {
        }).prototype = t3, new n3());
        return e3 && V(t3, e3), t3;
      }
      function Gt(t3) {
        t3 = t3.style;
        t3.webkitUserSelect = "none", t3.userSelect = "none", t3.webkitTapHighlightColor = "rgba(0,0,0,0)", t3["-webkit-touch-callout"] = "none";
      }
      function Ht(t3, e3) {
        return t3.hasOwnProperty(e3);
      }
      function Wt() {
      }
      var Ut = 180 / Math.PI, Xt = Number.EPSILON || Math.pow(2, -52), Yt = Object.freeze({ __proto__: null, EPSILON: Xt, HashMap: Bt, RADIAN_TO_DEGREE: Ut, assert: Dt, assignProps: lt, bind: y, clone: _, concatArray: Vt, createCanvas: ut, createHashMap: I, createObject: Ft, curry: yt, defaults: B, disableUserSelect: Gt, each: F, eqNaN: Mt, extend: V, filter: ft, find: gt, guid: at, hasOwn: Ht, indexOf: L, inherits: ht, isArray: G, isArrayLike: pt, isBuiltInObject: vt, isDom: xt, isFunction: H, isGradientObject: bt, isImagePatternObject: wt, isNumber: U, isObject: X, isPrimitive: Ot, isRegExp: St, isString: W, isStringSafe: mt, isTypedArray: _t, keys: O, logError: st, map: E, merge: d, mergeAll: function(t3, e3) {
        for (var n3 = t3[0], i3 = 1, r3 = t3.length; i3 < r3; i3++)
          n3 = d(n3, t3[i3], e3);
        return n3;
      }, mixin: ct, noop: Wt, normalizeCssArray: kt, reduce: dt, retrieve: Tt, retrieve2: Y, retrieve3: It, setAsPrimitive: Pt, slice: Ct, trim: At });
      function qt(t3, e3) {
        return [t3 = null == t3 ? 0 : t3, e3 = null == e3 ? 0 : e3];
      }
      function Zt(t3, e3) {
        return t3[0] = e3[0], t3[1] = e3[1], t3;
      }
      function jt(t3) {
        return [t3[0], t3[1]];
      }
      function Kt(t3, e3, n3) {
        return t3[0] = e3, t3[1] = n3, t3;
      }
      function $t(t3, e3, n3) {
        return t3[0] = e3[0] + n3[0], t3[1] = e3[1] + n3[1], t3;
      }
      function Qt(t3, e3, n3) {
        return t3[0] = e3[0] - n3[0], t3[1] = e3[1] - n3[1], t3;
      }
      function Jt(t3) {
        return Math.sqrt(te(t3));
      }
      function te(t3) {
        return t3[0] * t3[0] + t3[1] * t3[1];
      }
      function ee(t3, e3, n3) {
        return t3[0] = e3[0] * n3, t3[1] = e3[1] * n3, t3;
      }
      function ne(t3, e3) {
        var n3 = Jt(e3);
        return 0 === n3 ? (t3[0] = 0, t3[1] = 0) : (t3[0] = e3[0] / n3, t3[1] = e3[1] / n3), t3;
      }
      function ie(t3, e3) {
        return Math.sqrt((t3[0] - e3[0]) * (t3[0] - e3[0]) + (t3[1] - e3[1]) * (t3[1] - e3[1]));
      }
      var re = ie;
      function oe(t3, e3) {
        return (t3[0] - e3[0]) * (t3[0] - e3[0]) + (t3[1] - e3[1]) * (t3[1] - e3[1]);
      }
      var ae = oe;
      function se(t3, e3, n3, i3) {
        return t3[0] = e3[0] + i3 * (n3[0] - e3[0]), t3[1] = e3[1] + i3 * (n3[1] - e3[1]), t3;
      }
      function le(t3, e3, n3) {
        var i3 = e3[0], e3 = e3[1];
        return t3[0] = n3[0] * i3 + n3[2] * e3 + n3[4], t3[1] = n3[1] * i3 + n3[3] * e3 + n3[5], t3;
      }
      function ue(t3, e3, n3) {
        return t3[0] = Math.min(e3[0], n3[0]), t3[1] = Math.min(e3[1], n3[1]), t3;
      }
      function he(t3, e3, n3) {
        return t3[0] = Math.max(e3[0], n3[0]), t3[1] = Math.max(e3[1], n3[1]), t3;
      }
      var ce = Object.freeze({ __proto__: null, add: $t, applyTransform: le, clone: jt, copy: Zt, create: qt, dist: re, distSquare: ae, distance: ie, distanceSquare: oe, div: function(t3, e3, n3) {
        return t3[0] = e3[0] / n3[0], t3[1] = e3[1] / n3[1], t3;
      }, dot: function(t3, e3) {
        return t3[0] * e3[0] + t3[1] * e3[1];
      }, len: Jt, lenSquare: te, length: Jt, lengthSquare: te, lerp: se, max: he, min: ue, mul: function(t3, e3, n3) {
        return t3[0] = e3[0] * n3[0], t3[1] = e3[1] * n3[1], t3;
      }, negate: function(t3, e3) {
        return t3[0] = -e3[0], t3[1] = -e3[1], t3;
      }, normalize: ne, scale: ee, scaleAndAdd: function(t3, e3, n3, i3) {
        return t3[0] = e3[0] + n3[0] * i3, t3[1] = e3[1] + n3[1] * i3, t3;
      }, set: Kt, sub: Qt }), pe = function(t3, e3) {
        this.target = t3, this.topTarget = e3 && e3.topTarget;
      }, de = (fe.prototype._dragStart = function(t3) {
        for (var e3 = t3.target; e3 && !e3.draggable; )
          e3 = e3.parent || e3.__hostTarget;
        e3 && ((this._draggingTarget = e3).dragging = true, this._x = t3.offsetX, this._y = t3.offsetY, this.handler.dispatchToElement(new pe(e3, t3), "dragstart", t3.event));
      }, fe.prototype._drag = function(t3) {
        var e3, n3, i3, r3, o3 = this._draggingTarget;
        o3 && (e3 = t3.offsetX, n3 = t3.offsetY, i3 = e3 - this._x, r3 = n3 - this._y, this._x = e3, this._y = n3, o3.drift(i3, r3, t3), this.handler.dispatchToElement(new pe(o3, t3), "drag", t3.event), i3 = this.handler.findHover(e3, n3, o3).target, r3 = this._dropTarget, o3 !== (this._dropTarget = i3)) && (r3 && i3 !== r3 && this.handler.dispatchToElement(new pe(r3, t3), "dragleave", t3.event), i3) && i3 !== r3 && this.handler.dispatchToElement(new pe(i3, t3), "dragenter", t3.event);
      }, fe.prototype._dragEnd = function(t3) {
        var e3 = this._draggingTarget;
        e3 && (e3.dragging = false), this.handler.dispatchToElement(new pe(e3, t3), "dragend", t3.event), this._dropTarget && this.handler.dispatchToElement(new pe(this._dropTarget, t3), "drop", t3.event), this._draggingTarget = null, this._dropTarget = null;
      }, fe);
      function fe(t3) {
        (this.handler = t3).on("mousedown", this._dragStart, this), t3.on("mousemove", this._drag, this), t3.on("mouseup", this._dragEnd, this);
      }
      ye.prototype.on = function(t3, e3, n3, i3) {
        this._$handlers || (this._$handlers = {});
        var r3 = this._$handlers;
        if ("function" == typeof e3 && (i3 = n3, n3 = e3, e3 = null), n3 && t3) {
          var o3 = this._$eventProcessor;
          null != e3 && o3 && o3.normalizeQuery && (e3 = o3.normalizeQuery(e3)), r3[t3] || (r3[t3] = []);
          for (var a3 = 0; a3 < r3[t3].length; a3++)
            if (r3[t3][a3].h === n3)
              return this;
          o3 = { h: n3, query: e3, ctx: i3 || this, callAtLast: n3.zrEventfulCallAtLast }, e3 = r3[t3].length - 1, i3 = r3[t3][e3];
          i3 && i3.callAtLast ? r3[t3].splice(e3, 0, o3) : r3[t3].push(o3);
        }
        return this;
      }, ye.prototype.isSilent = function(t3) {
        var e3 = this._$handlers;
        return !e3 || !e3[t3] || !e3[t3].length;
      }, ye.prototype.off = function(t3, e3) {
        var n3 = this._$handlers;
        if (n3)
          if (t3)
            if (e3) {
              if (n3[t3]) {
                for (var i3 = [], r3 = 0, o3 = n3[t3].length; r3 < o3; r3++)
                  n3[t3][r3].h !== e3 && i3.push(n3[t3][r3]);
                n3[t3] = i3;
              }
              n3[t3] && 0 === n3[t3].length && delete n3[t3];
            } else
              delete n3[t3];
          else
            this._$handlers = {};
        return this;
      }, ye.prototype.trigger = function(t3) {
        for (var e3 = [], n3 = 1; n3 < arguments.length; n3++)
          e3[n3 - 1] = arguments[n3];
        if (this._$handlers) {
          var i3 = this._$handlers[t3], r3 = this._$eventProcessor;
          if (i3)
            for (var o3 = e3.length, a3 = i3.length, s3 = 0; s3 < a3; s3++) {
              var l3 = i3[s3];
              if (!r3 || !r3.filter || null == l3.query || r3.filter(t3, l3.query))
                switch (o3) {
                  case 0:
                    l3.h.call(l3.ctx);
                    break;
                  case 1:
                    l3.h.call(l3.ctx, e3[0]);
                    break;
                  case 2:
                    l3.h.call(l3.ctx, e3[0], e3[1]);
                    break;
                  default:
                    l3.h.apply(l3.ctx, e3);
                }
            }
          r3 && r3.afterTrigger && r3.afterTrigger(t3);
        }
        return this;
      }, ye.prototype.triggerWithContext = function(t3) {
        for (var e3 = [], n3 = 1; n3 < arguments.length; n3++)
          e3[n3 - 1] = arguments[n3];
        if (this._$handlers) {
          var i3 = this._$handlers[t3], r3 = this._$eventProcessor;
          if (i3)
            for (var o3 = e3.length, a3 = e3[o3 - 1], s3 = i3.length, l3 = 0; l3 < s3; l3++) {
              var u3 = i3[l3];
              if (!r3 || !r3.filter || null == u3.query || r3.filter(t3, u3.query))
                switch (o3) {
                  case 0:
                    u3.h.call(a3);
                    break;
                  case 1:
                    u3.h.call(a3, e3[0]);
                    break;
                  case 2:
                    u3.h.call(a3, e3[0], e3[1]);
                    break;
                  default:
                    u3.h.apply(a3, e3.slice(1, o3 - 1));
                }
            }
          r3 && r3.afterTrigger && r3.afterTrigger(t3);
        }
        return this;
      };
      var ge = ye;
      function ye(t3) {
        t3 && (this._$eventProcessor = t3);
      }
      var me = Math.log(2);
      function ve(t3, e3, n3, i3, r3, o3) {
        var a3, s3 = i3 + "-" + r3, l3 = t3.length;
        if (o3.hasOwnProperty(s3))
          return o3[s3];
        if (1 === e3)
          return a3 = Math.round(Math.log((1 << l3) - 1 & ~r3) / me), t3[n3][a3];
        for (var u3 = i3 | 1 << n3, h3 = n3 + 1; i3 & 1 << h3; )
          h3++;
        for (var c3 = 0, p3 = 0, d3 = 0; p3 < l3; p3++) {
          var f3 = 1 << p3;
          f3 & r3 || (c3 += (d3 % 2 ? -1 : 1) * t3[n3][p3] * ve(t3, e3 - 1, h3, u3, r3 | f3, o3), d3++);
        }
        return o3[s3] = c3;
      }
      function _e(t3, e3) {
        var n3 = [[t3[0], t3[1], 1, 0, 0, 0, -e3[0] * t3[0], -e3[0] * t3[1]], [0, 0, 0, t3[0], t3[1], 1, -e3[1] * t3[0], -e3[1] * t3[1]], [t3[2], t3[3], 1, 0, 0, 0, -e3[2] * t3[2], -e3[2] * t3[3]], [0, 0, 0, t3[2], t3[3], 1, -e3[3] * t3[2], -e3[3] * t3[3]], [t3[4], t3[5], 1, 0, 0, 0, -e3[4] * t3[4], -e3[4] * t3[5]], [0, 0, 0, t3[4], t3[5], 1, -e3[5] * t3[4], -e3[5] * t3[5]], [t3[6], t3[7], 1, 0, 0, 0, -e3[6] * t3[6], -e3[6] * t3[7]], [0, 0, 0, t3[6], t3[7], 1, -e3[7] * t3[6], -e3[7] * t3[7]]], i3 = {}, r3 = ve(n3, 8, 0, 0, 0, i3);
        if (0 !== r3) {
          for (var o3 = [], a3 = 0; a3 < 8; a3++)
            for (var s3 = 0; s3 < 8; s3++)
              null == o3[s3] && (o3[s3] = 0), o3[s3] += ((a3 + s3) % 2 ? -1 : 1) * ve(n3, 7, 0 === a3 ? 1 : 0, 1 << a3, 1 << s3, i3) / r3 * e3[a3];
          return function(t4, e4, n4) {
            var i4 = e4 * o3[6] + n4 * o3[7] + 1;
            t4[0] = (e4 * o3[0] + n4 * o3[1] + o3[2]) / i4, t4[1] = (e4 * o3[3] + n4 * o3[4] + o3[5]) / i4;
          };
        }
      }
      var xe = "___zrEVENTSAVED";
      function be(t3, e3, n3, i3, r3) {
        if (e3.getBoundingClientRect && b.domSupported && !we(e3)) {
          var o3 = e3[xe] || (e3[xe] = {}), e3 = function(t4, e4, n4) {
            for (var i4 = n4 ? "invTrans" : "trans", r4 = e4[i4], o4 = e4.srcCoords, a3 = [], s3 = [], l3 = true, u3 = 0; u3 < 4; u3++) {
              var h3 = t4[u3].getBoundingClientRect(), c3 = 2 * u3, p3 = h3.left, h3 = h3.top;
              a3.push(p3, h3), l3 = l3 && o4 && p3 === o4[c3] && h3 === o4[1 + c3], s3.push(t4[u3].offsetLeft, t4[u3].offsetTop);
            }
            return l3 && r4 ? r4 : (e4.srcCoords = a3, e4[i4] = n4 ? _e(s3, a3) : _e(a3, s3));
          }(function(t4, e4) {
            var n4 = e4.markers;
            if (!n4) {
              n4 = e4.markers = [];
              for (var i4 = ["left", "right"], r4 = ["top", "bottom"], o4 = 0; o4 < 4; o4++) {
                var a3 = document.createElement("div"), s3 = a3.style, l3 = o4 % 2, u3 = (o4 >> 1) % 2;
                s3.cssText = ["position: absolute", "visibility: hidden", "padding: 0", "margin: 0", "border-width: 0", "user-select: none", "width:0", "height:0", i4[l3] + ":0", r4[u3] + ":0", i4[1 - l3] + ":auto", r4[1 - u3] + ":auto", ""].join("!important;"), t4.appendChild(a3), n4.push(a3);
              }
              e4.clearMarkers = function() {
                F(n4, function(t5) {
                  t5.parentNode && t5.parentNode.removeChild(t5);
                });
              };
            }
            return n4;
          }(e3, o3), o3, r3);
          if (e3)
            return e3(t3, n3, i3), 1;
        }
      }
      function we(t3) {
        return "CANVAS" === t3.nodeName.toUpperCase();
      }
      var Se = /([&<>"'])/g, Me = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      function Te(t3) {
        return null == t3 ? "" : (t3 + "").replace(Se, function(t4, e3) {
          return Me[e3];
        });
      }
      var Ie = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Ce = [], ke = b.browser.firefox && +b.browser.version.split(".")[0] < 39;
      function De(t3, e3, n3, i3) {
        return n3 = n3 || {}, i3 ? Ae(t3, e3, n3) : ke && null != e3.layerX && e3.layerX !== e3.offsetX ? (n3.zrX = e3.layerX, n3.zrY = e3.layerY) : null != e3.offsetX ? (n3.zrX = e3.offsetX, n3.zrY = e3.offsetY) : Ae(t3, e3, n3), n3;
      }
      function Ae(t3, e3, n3) {
        if (b.domSupported && t3.getBoundingClientRect) {
          var i3, r3 = e3.clientX, e3 = e3.clientY;
          if (we(t3))
            return i3 = t3.getBoundingClientRect(), n3.zrX = r3 - i3.left, void (n3.zrY = e3 - i3.top);
          if (be(Ce, t3, r3, e3))
            return n3.zrX = Ce[0], void (n3.zrY = Ce[1]);
        }
        n3.zrX = n3.zrY = 0;
      }
      function Le(t3) {
        return t3 || window.event;
      }
      function Pe(t3, e3, n3) {
        var i3;
        return null == (e3 = Le(e3)).zrX && ((i3 = e3.type) && 0 <= i3.indexOf("touch") ? (i3 = ("touchend" !== i3 ? e3.targetTouches : e3.changedTouches)[0]) && De(t3, i3, e3, n3) : (De(t3, e3, e3, n3), i3 = function(t4) {
          var e4 = t4.wheelDelta;
          if (e4)
            return e4;
          var n4 = t4.deltaX, t4 = t4.deltaY;
          return null != n4 && null != t4 ? 3 * (0 !== t4 ? Math.abs(t4) : Math.abs(n4)) * (0 < t4 || !(t4 < 0) && 0 < n4 ? -1 : 1) : e4;
        }(e3), e3.zrDelta = i3 ? i3 / 120 : -(e3.detail || 0) / 3), t3 = e3.button, null == e3.which && void 0 !== t3 && Ie.test(e3.type)) && (e3.which = 1 & t3 ? 1 : 2 & t3 ? 3 : 4 & t3 ? 2 : 0), e3;
      }
      var Oe = function(t3) {
        t3.preventDefault(), t3.stopPropagation(), t3.cancelBubble = true;
      };
      function Re(t3) {
        return 2 === t3.which || 3 === t3.which;
      }
      ze.prototype.recognize = function(t3, e3, n3) {
        return this._doTrack(t3, e3, n3), this._recognize(t3);
      }, ze.prototype.clear = function() {
        return this._track.length = 0, this;
      }, ze.prototype._doTrack = function(t3, e3, n3) {
        var i3 = t3.touches;
        if (i3) {
          for (var r3 = { points: [], touches: [], target: e3, event: t3 }, o3 = 0, a3 = i3.length; o3 < a3; o3++) {
            var s3 = i3[o3], l3 = De(n3, s3, {});
            r3.points.push([l3.zrX, l3.zrY]), r3.touches.push(s3);
          }
          this._track.push(r3);
        }
      }, ze.prototype._recognize = function(t3) {
        for (var e3 in Ee)
          if (Ee.hasOwnProperty(e3)) {
            e3 = Ee[e3](this._track, t3);
            if (e3)
              return e3;
          }
      };
      var Ne = ze;
      function ze() {
        this._track = [];
      }
      function Be(t3) {
        var e3 = t3[1][0] - t3[0][0], t3 = t3[1][1] - t3[0][1];
        return Math.sqrt(e3 * e3 + t3 * t3);
      }
      var Ee = { pinch: function(t3, e3) {
        var n3, i3 = t3.length;
        if (i3)
          return n3 = (t3[i3 - 1] || {}).points, (i3 = (t3[i3 - 2] || {}).points || n3) && 1 < i3.length && n3 && 1 < n3.length ? (i3 = Be(n3) / Be(i3), isFinite(i3) || (i3 = 1), e3.pinchScale = i3, i3 = [(n3[0][0] + n3[1][0]) / 2, (n3[0][1] + n3[1][1]) / 2], e3.pinchX = i3[0], e3.pinchY = i3[1], { type: "pinch", target: t3[0].target, event: e3 }) : void 0;
      } };
      function Ve() {
        return [1, 0, 0, 1, 0, 0];
      }
      function Fe(t3) {
        return t3[0] = 1, t3[1] = 0, t3[2] = 0, t3[3] = 1, t3[4] = 0, t3[5] = 0, t3;
      }
      function Ge(t3, e3) {
        return t3[0] = e3[0], t3[1] = e3[1], t3[2] = e3[2], t3[3] = e3[3], t3[4] = e3[4], t3[5] = e3[5], t3;
      }
      function He(t3, e3, n3) {
        var i3 = e3[0] * n3[0] + e3[2] * n3[1], r3 = e3[1] * n3[0] + e3[3] * n3[1], o3 = e3[0] * n3[2] + e3[2] * n3[3], a3 = e3[1] * n3[2] + e3[3] * n3[3], s3 = e3[0] * n3[4] + e3[2] * n3[5] + e3[4], n3 = e3[1] * n3[4] + e3[3] * n3[5] + e3[5];
        return t3[0] = i3, t3[1] = r3, t3[2] = o3, t3[3] = a3, t3[4] = s3, t3[5] = n3, t3;
      }
      function We(t3, e3, n3) {
        return t3[0] = e3[0], t3[1] = e3[1], t3[2] = e3[2], t3[3] = e3[3], t3[4] = e3[4] + n3[0], t3[5] = e3[5] + n3[1], t3;
      }
      function Ue(t3, e3, n3, i3) {
        void 0 === i3 && (i3 = [0, 0]);
        var r3 = e3[0], o3 = e3[2], a3 = e3[4], s3 = e3[1], l3 = e3[3], e3 = e3[5], u3 = Math.sin(n3), n3 = Math.cos(n3);
        return t3[0] = r3 * n3 + s3 * u3, t3[1] = -r3 * u3 + s3 * n3, t3[2] = o3 * n3 + l3 * u3, t3[3] = -o3 * u3 + n3 * l3, t3[4] = n3 * (a3 - i3[0]) + u3 * (e3 - i3[1]) + i3[0], t3[5] = n3 * (e3 - i3[1]) - u3 * (a3 - i3[0]) + i3[1], t3;
      }
      function Xe(t3, e3, n3) {
        var i3 = n3[0], n3 = n3[1];
        return t3[0] = e3[0] * i3, t3[1] = e3[1] * n3, t3[2] = e3[2] * i3, t3[3] = e3[3] * n3, t3[4] = e3[4] * i3, t3[5] = e3[5] * n3, t3;
      }
      function Ye(t3, e3) {
        var n3 = e3[0], i3 = e3[2], r3 = e3[4], o3 = e3[1], a3 = e3[3], e3 = e3[5], s3 = n3 * a3 - o3 * i3;
        return s3 ? (t3[0] = a3 * (s3 = 1 / s3), t3[1] = -o3 * s3, t3[2] = -i3 * s3, t3[3] = n3 * s3, t3[4] = (i3 * e3 - a3 * r3) * s3, t3[5] = (o3 * r3 - n3 * e3) * s3, t3) : null;
      }
      var qe = Object.freeze({ __proto__: null, clone: function(t3) {
        var e3 = Ve();
        return Ge(e3, t3), e3;
      }, copy: Ge, create: Ve, identity: Fe, invert: Ye, mul: He, rotate: Ue, scale: Xe, translate: We }), q = (Ze.prototype.copy = function(t3) {
        return this.x = t3.x, this.y = t3.y, this;
      }, Ze.prototype.clone = function() {
        return new Ze(this.x, this.y);
      }, Ze.prototype.set = function(t3, e3) {
        return this.x = t3, this.y = e3, this;
      }, Ze.prototype.equal = function(t3) {
        return t3.x === this.x && t3.y === this.y;
      }, Ze.prototype.add = function(t3) {
        return this.x += t3.x, this.y += t3.y, this;
      }, Ze.prototype.scale = function(t3) {
        this.x *= t3, this.y *= t3;
      }, Ze.prototype.scaleAndAdd = function(t3, e3) {
        this.x += t3.x * e3, this.y += t3.y * e3;
      }, Ze.prototype.sub = function(t3) {
        return this.x -= t3.x, this.y -= t3.y, this;
      }, Ze.prototype.dot = function(t3) {
        return this.x * t3.x + this.y * t3.y;
      }, Ze.prototype.len = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }, Ze.prototype.lenSquare = function() {
        return this.x * this.x + this.y * this.y;
      }, Ze.prototype.normalize = function() {
        var t3 = this.len();
        return this.x /= t3, this.y /= t3, this;
      }, Ze.prototype.distance = function(t3) {
        var e3 = this.x - t3.x, t3 = this.y - t3.y;
        return Math.sqrt(e3 * e3 + t3 * t3);
      }, Ze.prototype.distanceSquare = function(t3) {
        var e3 = this.x - t3.x, t3 = this.y - t3.y;
        return e3 * e3 + t3 * t3;
      }, Ze.prototype.negate = function() {
        return this.x = -this.x, this.y = -this.y, this;
      }, Ze.prototype.transform = function(t3) {
        var e3, n3;
        if (t3)
          return e3 = this.x, n3 = this.y, this.x = t3[0] * e3 + t3[2] * n3 + t3[4], this.y = t3[1] * e3 + t3[3] * n3 + t3[5], this;
      }, Ze.prototype.toArray = function(t3) {
        return t3[0] = this.x, t3[1] = this.y, t3;
      }, Ze.prototype.fromArray = function(t3) {
        this.x = t3[0], this.y = t3[1];
      }, Ze.set = function(t3, e3, n3) {
        t3.x = e3, t3.y = n3;
      }, Ze.copy = function(t3, e3) {
        t3.x = e3.x, t3.y = e3.y;
      }, Ze.len = function(t3) {
        return Math.sqrt(t3.x * t3.x + t3.y * t3.y);
      }, Ze.lenSquare = function(t3) {
        return t3.x * t3.x + t3.y * t3.y;
      }, Ze.dot = function(t3, e3) {
        return t3.x * e3.x + t3.y * e3.y;
      }, Ze.add = function(t3, e3, n3) {
        t3.x = e3.x + n3.x, t3.y = e3.y + n3.y;
      }, Ze.sub = function(t3, e3, n3) {
        t3.x = e3.x - n3.x, t3.y = e3.y - n3.y;
      }, Ze.scale = function(t3, e3, n3) {
        t3.x = e3.x * n3, t3.y = e3.y * n3;
      }, Ze.scaleAndAdd = function(t3, e3, n3, i3) {
        t3.x = e3.x + n3.x * i3, t3.y = e3.y + n3.y * i3;
      }, Ze.lerp = function(t3, e3, n3, i3) {
        var r3 = 1 - i3;
        t3.x = r3 * e3.x + i3 * n3.x, t3.y = r3 * e3.y + i3 * n3.y;
      }, Ze);
      function Ze(t3, e3) {
        this.x = t3 || 0, this.y = e3 || 0;
      }
      var je = Math.min, Ke = Math.max, $e = Math.abs, Qe = ["x", "y"], Je = ["width", "height"], tn = new q(), en = new q(), nn = new q(), rn = new q(), on = xn(), an = on.minTv, sn = on.maxTv, ln = [0, 0], Z = (un.set = function(t3, e3, n3, i3, r3) {
        return i3 < 0 && (e3 += i3, i3 = -i3), r3 < 0 && (n3 += r3, r3 = -r3), t3.x = e3, t3.y = n3, t3.width = i3, t3.height = r3, t3;
      }, un.prototype.union = function(t3) {
        var e3 = je(t3.x, this.x), n3 = je(t3.y, this.y);
        isFinite(this.x) && isFinite(this.width) ? this.width = Ke(t3.x + t3.width, this.x + this.width) - e3 : this.width = t3.width, isFinite(this.y) && isFinite(this.height) ? this.height = Ke(t3.y + t3.height, this.y + this.height) - n3 : this.height = t3.height, this.x = e3, this.y = n3;
      }, un.prototype.applyTransform = function(t3) {
        un.applyTransform(this, this, t3);
      }, un.prototype.calculateTransform = function(t3) {
        return dn(Ve(), this, t3);
      }, un.prototype.intersect = function(t3, e3, n3) {
        return un.intersect(this, t3, e3, n3);
      }, un.intersect = function(t3, e3, n3, i3) {
        n3 && q.set(n3, 0, 0);
        var r3 = i3 && i3.outIntersectRect || null, o3 = i3 && i3.clamp;
        if (r3 && (r3.x = r3.y = r3.width = r3.height = NaN), !t3 || !e3)
          return false;
        t3 instanceof un || (t3 = cn(yn, t3.x, t3.y, t3.width, t3.height)), e3 instanceof un || (e3 = cn(mn, e3.x, e3.y, e3.width, e3.height));
        var a3 = !!n3, i3 = (on.reset(i3, a3), on.touchThreshold), s3 = t3.x + i3, l3 = t3.x + t3.width - i3, u3 = t3.y + i3, t3 = t3.y + t3.height - i3, h3 = e3.x + i3, c3 = e3.x + e3.width - i3, p3 = e3.y + i3, e3 = e3.y + e3.height - i3;
        return !(l3 < s3 || t3 < u3 || c3 < h3 || e3 < p3) && (i3 = !(l3 < h3 || c3 < s3 || t3 < p3 || e3 < u3), (a3 || r3) && (ln[0] = 1 / 0, _n(s3, l3, h3, c3, ln[1] = 0, a3, r3, o3), _n(u3, t3, p3, e3, 1, a3, r3, o3), a3) && q.copy(n3, i3 ? on.useDir ? on.dirMinTv : an : sn), i3);
      }, un.contain = function(t3, e3, n3) {
        return e3 >= t3.x && e3 <= t3.x + t3.width && n3 >= t3.y && n3 <= t3.y + t3.height;
      }, un.prototype.contain = function(t3, e3) {
        return un.contain(this, t3, e3);
      }, un.prototype.clone = function() {
        return new un(this.x, this.y, this.width, this.height);
      }, un.prototype.copy = function(t3) {
        pn(this, t3);
      }, un.prototype.plain = function() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
      }, un.prototype.isFinite = function() {
        return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
      }, un.prototype.isZero = function() {
        return 0 === this.width || 0 === this.height;
      }, un.create = function(t3) {
        return new un(t3 ? t3.x : 0, t3 ? t3.y : 0, t3 ? t3.width : 0, t3 ? t3.height : 0);
      }, un.copy = function(t3, e3) {
        return t3.x = e3.x, t3.y = e3.y, t3.width = e3.width, t3.height = e3.height, t3;
      }, un.applyTransform = function(t3, e3, n3) {
        var i3, r3, o3, a3;
        n3 ? n3[1] < 1e-5 && -1e-5 < n3[1] && n3[2] < 1e-5 && -1e-5 < n3[2] ? (i3 = n3[0], r3 = n3[3], o3 = n3[4], a3 = n3[5], t3.x = e3.x * i3 + o3, t3.y = e3.y * r3 + a3, t3.width = e3.width * i3, t3.height = e3.height * r3, t3.width < 0 && (t3.x += t3.width, t3.width = -t3.width), t3.height < 0 && (t3.y += t3.height, t3.height = -t3.height)) : (tn.x = nn.x = e3.x, tn.y = rn.y = e3.y, en.x = rn.x = e3.x + e3.width, en.y = nn.y = e3.y + e3.height, tn.transform(n3), rn.transform(n3), en.transform(n3), nn.transform(n3), t3.x = je(tn.x, en.x, nn.x, rn.x), t3.y = je(tn.y, en.y, nn.y, rn.y), o3 = Ke(tn.x, en.x, nn.x, rn.x), a3 = Ke(tn.y, en.y, nn.y, rn.y), t3.width = o3 - t3.x, t3.height = a3 - t3.y) : t3 !== e3 && pn(t3, e3);
      }, un.calculateTransform = function(t3, e3, n3) {
        var i3 = n3.width / e3.width, r3 = n3.height / e3.height;
        return We(t3 = Fe(t3 || []), t3, Kt(vn, -e3.x, -e3.y)), Xe(t3, t3, Kt(vn, i3, r3)), We(t3, t3, Kt(vn, n3.x, n3.y)), t3;
      }, un);
      function un(t3, e3, n3, i3) {
        cn(this, t3, e3, n3, i3);
      }
      var hn = Z.create, cn = Z.set, pn = Z.copy, dn = Z.calculateTransform, fn = Z.applyTransform, gn = Z.contain, yn = new Z(0, 0, 0, 0), mn = new Z(0, 0, 0, 0), vn = [];
      function _n(t3, e3, n3, i3, r3, o3, a3, s3) {
        var l3 = $e(e3 - n3), u3 = $e(i3 - t3), h3 = je(l3, u3), c3 = Qe[r3], p3 = Qe[1 - r3], r3 = Je[r3];
        e3 < n3 || i3 < t3 ? l3 < u3 ? (o3 && (sn[c3] = -l3), s3 && (a3[c3] = e3, a3[r3] = 0)) : (o3 && (sn[c3] = u3), s3 && (a3[c3] = t3, a3[r3] = 0)) : (a3 && (a3[c3] = Ke(t3, n3), a3[r3] = je(e3, i3) - a3[c3]), o3 && (h3 < ln[0] || on.useDir) && (ln[0] = je(h3, ln[0]), (l3 < u3 || !on.bidirectional) && (an[c3] = l3, an[p3] = 0, on.useDir) && on.calcDirMTV(), u3 <= l3 || !on.bidirectional) && (an[c3] = -u3, an[p3] = 0, on.useDir) && on.calcDirMTV());
      }
      function xn() {
        var a3 = 0, s3 = new q(), l3 = new q(), u3 = { minTv: new q(), maxTv: new q(), useDir: false, dirMinTv: new q(), touchThreshold: 0, bidirectional: true, negativeSize: false, reset: function(t3, e3) {
          u3.touchThreshold = 0, t3 && null != t3.touchThreshold && (u3.touchThreshold = Ke(0, t3.touchThreshold)), u3.negativeSize = false, e3 && (u3.minTv.set(1 / 0, 1 / 0), u3.maxTv.set(0, 0), u3.useDir = false, t3) && null != t3.direction && (u3.useDir = true, u3.dirMinTv.copy(u3.minTv), l3.copy(u3.minTv), a3 = t3.direction, u3.bidirectional = null == t3.bidirectional || !!t3.bidirectional, u3.bidirectional || s3.set(Math.cos(a3), Math.sin(a3)));
        }, calcDirMTV: function() {
          var t3 = u3.minTv, e3 = u3.dirMinTv, n3 = t3.y * t3.y + t3.x * t3.x, i3 = Math.sin(a3), r3 = Math.cos(a3), o3 = i3 * t3.y + r3 * t3.x;
          h3(o3) ? h3(t3.x) && h3(t3.y) && e3.set(0, 0) : (l3.x = n3 * r3 / o3, l3.y = n3 * i3 / o3, h3(l3.x) && h3(l3.y) ? e3.set(0, 0) : (u3.bidirectional || 0 < s3.dot(l3)) && l3.len() < e3.len() && e3.copy(l3));
        } };
        function h3(t3) {
          return $e(t3) < 1e-10;
        }
        return u3;
      }
      var bn = "silent";
      function wn() {
        Oe(this.event);
      }
      u(Tn, Sn = ge), Tn.prototype.dispose = function() {
      }, Tn.prototype.setCursor = function() {
      };
      var Sn, Mn = Tn;
      function Tn() {
        var t3 = null !== Sn && Sn.apply(this, arguments) || this;
        return t3.handler = null, t3;
      }
      var In, Cn = function(t3, e3) {
        this.x = t3, this.y = e3;
      }, kn = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"], Dn = new Z(0, 0, 0, 0), An = (u(Ln, In = ge), Ln.prototype.setHandlerProxy = function(e3) {
        this.proxy && this.proxy.dispose(), e3 && (F(kn, function(t3) {
          e3.on && e3.on(t3, this[t3], this);
        }, this), e3.handler = this), this.proxy = e3;
      }, Ln.prototype.mousemove = function(t3) {
        var e3 = t3.zrX, n3 = t3.zrY, i3 = On(this, e3, n3), r3 = this._hovered, o3 = r3.target, i3 = (o3 && !o3.__zr && (o3 = (r3 = this.findHover(r3.x, r3.y)).target), this._hovered = i3 ? new Cn(e3, n3) : this.findHover(e3, n3)), e3 = i3.target, n3 = this.proxy;
        n3.setCursor && n3.setCursor(e3 ? e3.cursor : "default"), o3 && e3 !== o3 && this.dispatchToElement(r3, "mouseout", t3), this.dispatchToElement(i3, "mousemove", t3), e3 && e3 !== o3 && this.dispatchToElement(i3, "mouseover", t3);
      }, Ln.prototype.mouseout = function(t3) {
        var e3 = t3.zrEventControl;
        "only_globalout" !== e3 && this.dispatchToElement(this._hovered, "mouseout", t3), "no_globalout" !== e3 && this.trigger("globalout", { type: "globalout", event: t3 });
      }, Ln.prototype.resize = function() {
        this._hovered = new Cn(0, 0);
      }, Ln.prototype.dispatch = function(t3, e3) {
        t3 = this[t3];
        t3 && t3.call(this, e3);
      }, Ln.prototype.dispose = function() {
        this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null;
      }, Ln.prototype.setCursorStyle = function(t3) {
        var e3 = this.proxy;
        e3.setCursor && e3.setCursor(t3);
      }, Ln.prototype.dispatchToElement = function(t3, e3, n3) {
        var i3 = (t3 = t3 || {}).target;
        if (!i3 || !i3.silent) {
          for (var r3 = "on" + e3, o3 = { type: e3, event: n3, target: (t3 = t3).target, topTarget: t3.topTarget, cancelBubble: false, offsetX: n3.zrX, offsetY: n3.zrY, gestureEvent: n3.gestureEvent, pinchX: n3.pinchX, pinchY: n3.pinchY, pinchScale: n3.pinchScale, wheelDelta: n3.zrDelta, zrByTouch: n3.zrByTouch, which: n3.which, stop: wn }; i3 && (i3[r3] && (o3.cancelBubble = !!i3[r3].call(i3, o3)), i3.trigger(e3, o3), i3 = i3.__hostTarget || i3.parent, !o3.cancelBubble); )
            ;
          o3.cancelBubble || (this.trigger(e3, o3), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(t4) {
            "function" == typeof t4[r3] && t4[r3].call(t4, o3), t4.trigger && t4.trigger(e3, o3);
          }));
        }
      }, Ln.prototype.findHover = function(t3, e3, n3) {
        var i3 = this.storage.getDisplayList(), r3 = new Cn(t3, e3);
        if (Pn(i3, r3, t3, e3, n3), this._pointerSize && !r3.target) {
          for (var o3 = [], a3 = this._pointerSize, s3 = a3 / 2, l3 = new Z(t3 - s3, e3 - s3, a3, a3), u3 = i3.length - 1; 0 <= u3; u3--) {
            var h3 = i3[u3];
            h3 === n3 || h3.ignore || h3.ignoreCoarsePointer || h3.parent && h3.parent.ignoreCoarsePointer || (Dn.copy(h3.getBoundingRect()), h3.transform && Dn.applyTransform(h3.transform), Dn.intersect(l3) && o3.push(h3));
          }
          if (o3.length) {
            for (var c3 = Math.PI / 12, p3 = 2 * Math.PI, d3 = 0; d3 < s3; d3 += 4)
              for (var f3 = 0; f3 < p3; f3 += c3)
                if (Pn(o3, r3, t3 + d3 * Math.cos(f3), e3 + d3 * Math.sin(f3), n3), r3.target)
                  return r3;
          }
        }
        return r3;
      }, Ln.prototype.processGesture = function(t3, e3) {
        this._gestureMgr || (this._gestureMgr = new Ne());
        var n3 = this._gestureMgr, i3 = ("start" === e3 && n3.clear(), n3.recognize(t3, this.findHover(t3.zrX, t3.zrY, null).target, this.proxy.dom));
        "end" === e3 && n3.clear(), i3 && (e3 = i3.type, t3.gestureEvent = e3, (n3 = new Cn()).target = i3.target, this.dispatchToElement(n3, e3, i3.event));
      }, Ln);
      function Ln(t3, e3, n3, i3, r3) {
        var o3 = In.call(this) || this;
        return o3._hovered = new Cn(0, 0), o3.storage = t3, o3.painter = e3, o3.painterRoot = i3, o3._pointerSize = r3, n3 = n3 || new Mn(), o3.proxy = null, o3.setHandlerProxy(n3), o3._draggingMgr = new de(o3), o3;
      }
      function Pn(t3, e3, n3, i3, r3) {
        for (var o3 = t3.length - 1; 0 <= o3; o3--) {
          var a3 = t3[o3], s3 = void 0;
          if (a3 !== r3 && !a3.ignore && (s3 = function(t4, e4, n4) {
            if (t4[t4.rectHover ? "rectContain" : "contain"](e4, n4)) {
              for (var i4 = t4, r4 = void 0, o4 = false; i4; ) {
                if (!(o4 = i4.ignoreClip ? true : o4)) {
                  var a4 = i4.getClipPath();
                  if (a4 && !a4.contain(e4, n4))
                    return false;
                }
                i4.silent && (r4 = true);
                a4 = i4.__hostTarget, i4 = a4 ? i4.ignoreHostSilent ? null : a4 : i4.parent;
              }
              return !r4 || bn;
            }
            return false;
          }(a3, n3, i3)) && (e3.topTarget || (e3.topTarget = a3), s3 !== bn)) {
            e3.target = a3;
            break;
          }
        }
      }
      function On(t3, e3, n3) {
        t3 = t3.painter;
        return e3 < 0 || e3 > t3.getWidth() || n3 < 0 || n3 > t3.getHeight();
      }
      F(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(a3) {
        An.prototype[a3] = function(t3) {
          var e3, n3, i3 = t3.zrX, r3 = t3.zrY, o3 = On(this, i3, r3);
          if ("mouseup" === a3 && o3 || (n3 = (e3 = this.findHover(i3, r3)).target), "mousedown" === a3)
            this._downEl = n3, this._downPoint = [t3.zrX, t3.zrY], this._upEl = n3;
          else if ("mouseup" === a3)
            this._upEl = n3;
          else if ("click" === a3) {
            if (this._downEl !== this._upEl || !this._downPoint || 4 < re(this._downPoint, [t3.zrX, t3.zrY]))
              return;
            this._downPoint = null;
          }
          this.dispatchToElement(e3, a3, t3);
        };
      });
      var Rn = 32, Nn = 7;
      function zn(t3, e3, n3, i3) {
        var r3 = e3 + 1;
        if (r3 === n3)
          return 1;
        if (i3(t3[r3++], t3[e3]) < 0) {
          for (; r3 < n3 && i3(t3[r3], t3[r3 - 1]) < 0; )
            r3++;
          var o3 = t3, a3 = e3, s3 = r3;
          for (s3--; a3 < s3; ) {
            var l3 = o3[a3];
            o3[a3++] = o3[s3], o3[s3--] = l3;
          }
        } else
          for (; r3 < n3 && 0 <= i3(t3[r3], t3[r3 - 1]); )
            r3++;
        return r3 - e3;
      }
      function Bn(t3, e3, n3, i3, r3) {
        for (i3 === e3 && i3++; i3 < n3; i3++) {
          for (var o3, a3 = t3[i3], s3 = e3, l3 = i3; s3 < l3; )
            r3(a3, t3[o3 = s3 + l3 >>> 1]) < 0 ? l3 = o3 : s3 = 1 + o3;
          var u3 = i3 - s3;
          switch (u3) {
            case 3:
              t3[s3 + 3] = t3[s3 + 2];
            case 2:
              t3[s3 + 2] = t3[s3 + 1];
            case 1:
              t3[s3 + 1] = t3[s3];
              break;
            default:
              for (; 0 < u3; )
                t3[s3 + u3] = t3[s3 + u3 - 1], u3--;
          }
          t3[s3] = a3;
        }
      }
      function En(t3, e3, n3, i3, r3, o3) {
        var a3 = 0, s3 = 0, l3 = 1;
        if (0 < o3(t3, e3[n3 + r3])) {
          for (s3 = i3 - r3; l3 < s3 && 0 < o3(t3, e3[n3 + r3 + l3]); )
            (l3 = 1 + ((a3 = l3) << 1)) <= 0 && (l3 = s3);
          s3 < l3 && (l3 = s3), a3 += r3, l3 += r3;
        } else {
          for (s3 = r3 + 1; l3 < s3 && o3(t3, e3[n3 + r3 - l3]) <= 0; )
            (l3 = 1 + ((a3 = l3) << 1)) <= 0 && (l3 = s3);
          i3 = a3, a3 = r3 - (l3 = s3 < l3 ? s3 : l3), l3 = r3 - i3;
        }
        for (a3++; a3 < l3; ) {
          var u3 = a3 + (l3 - a3 >>> 1);
          0 < o3(t3, e3[n3 + u3]) ? a3 = u3 + 1 : l3 = u3;
        }
        return l3;
      }
      function Vn(t3, e3, n3, i3, r3, o3) {
        var a3 = 0, s3 = 0, l3 = 1;
        if (o3(t3, e3[n3 + r3]) < 0) {
          for (s3 = r3 + 1; l3 < s3 && o3(t3, e3[n3 + r3 - l3]) < 0; )
            (l3 = 1 + ((a3 = l3) << 1)) <= 0 && (l3 = s3);
          var u3 = a3, a3 = r3 - (l3 = s3 < l3 ? s3 : l3), l3 = r3 - u3;
        } else {
          for (s3 = i3 - r3; l3 < s3 && 0 <= o3(t3, e3[n3 + r3 + l3]); )
            (l3 = 1 + ((a3 = l3) << 1)) <= 0 && (l3 = s3);
          s3 < l3 && (l3 = s3), a3 += r3, l3 += r3;
        }
        for (a3++; a3 < l3; ) {
          var h3 = a3 + (l3 - a3 >>> 1);
          o3(t3, e3[n3 + h3]) < 0 ? l3 = h3 : a3 = h3 + 1;
        }
        return l3;
      }
      function Fn(A3, L3) {
        var P3, O3, R3 = Nn, N3 = 0, z3 = [];
        function e3(t3) {
          var e4 = P3[t3], n3 = O3[t3], i3 = P3[t3 + 1], r3 = O3[t3 + 1], t3 = (O3[t3] = n3 + r3, t3 === N3 - 3 && (P3[t3 + 1] = P3[t3 + 2], O3[t3 + 1] = O3[t3 + 2]), N3--, Vn(A3[i3], A3, e4, n3, 0, L3));
          if (e4 += t3, 0 != (n3 -= t3) && 0 !== (r3 = En(A3[e4 + n3 - 1], A3, i3, r3, r3 - 1, L3)))
            if (n3 <= r3) {
              var o3 = e4, a3 = n3, t3 = i3, s3 = r3, l3 = 0;
              for (l3 = 0; l3 < a3; l3++)
                z3[l3] = A3[o3 + l3];
              var u3 = 0, h3 = t3, c3 = o3;
              if (A3[c3++] = A3[h3++], 0 == --s3)
                for (l3 = 0; l3 < a3; l3++)
                  A3[c3 + l3] = z3[u3 + l3];
              else if (1 === a3) {
                for (l3 = 0; l3 < s3; l3++)
                  A3[c3 + l3] = A3[h3 + l3];
                A3[c3 + s3] = z3[u3];
              } else {
                for (var p3, d3, f3, g3 = R3; ; ) {
                  d3 = p3 = 0, f3 = false;
                  do {
                    if (L3(A3[h3], z3[u3]) < 0) {
                      if (A3[c3++] = A3[h3++], d3++, (p3 = 0) == --s3) {
                        f3 = true;
                        break;
                      }
                    } else if (A3[c3++] = z3[u3++], p3++, d3 = 0, 1 == --a3) {
                      f3 = true;
                      break;
                    }
                  } while ((p3 | d3) < g3);
                  if (f3)
                    break;
                  do {
                    if (0 !== (p3 = Vn(A3[h3], z3, u3, a3, 0, L3))) {
                      for (l3 = 0; l3 < p3; l3++)
                        A3[c3 + l3] = z3[u3 + l3];
                      if (c3 += p3, u3 += p3, (a3 -= p3) <= 1) {
                        f3 = true;
                        break;
                      }
                    }
                    if (A3[c3++] = A3[h3++], 0 == --s3) {
                      f3 = true;
                      break;
                    }
                    if (0 !== (d3 = En(z3[u3], A3, h3, s3, 0, L3))) {
                      for (l3 = 0; l3 < d3; l3++)
                        A3[c3 + l3] = A3[h3 + l3];
                      if (c3 += d3, h3 += d3, 0 === (s3 -= d3)) {
                        f3 = true;
                        break;
                      }
                    }
                    if (A3[c3++] = z3[u3++], 1 == --a3) {
                      f3 = true;
                      break;
                    }
                  } while (g3--, Nn <= p3 || Nn <= d3);
                  if (f3)
                    break;
                  g3 < 0 && (g3 = 0), g3 += 2;
                }
                if ((R3 = g3) < 1 && (R3 = 1), 1 === a3) {
                  for (l3 = 0; l3 < s3; l3++)
                    A3[c3 + l3] = A3[h3 + l3];
                  A3[c3 + s3] = z3[u3];
                } else {
                  if (0 === a3)
                    throw new Error();
                  for (l3 = 0; l3 < a3; l3++)
                    A3[c3 + l3] = z3[u3 + l3];
                }
              }
            } else {
              var y3 = e4, m3 = n3, v3 = i3, _3 = r3, x3 = 0;
              for (x3 = 0; x3 < _3; x3++)
                z3[x3] = A3[v3 + x3];
              var b3 = y3 + m3 - 1, w3 = _3 - 1, S3 = v3 + _3 - 1, M3 = 0, T3 = 0;
              if (A3[S3--] = A3[b3--], 0 == --m3)
                for (M3 = S3 - (_3 - 1), x3 = 0; x3 < _3; x3++)
                  A3[M3 + x3] = z3[x3];
              else if (1 === _3) {
                for (T3 = (S3 -= m3) + 1, M3 = (b3 -= m3) + 1, x3 = m3 - 1; 0 <= x3; x3--)
                  A3[T3 + x3] = A3[M3 + x3];
                A3[S3] = z3[w3];
              } else {
                for (var I3 = R3; ; ) {
                  var C3 = 0, k3 = 0, D3 = false;
                  do {
                    if (L3(z3[w3], A3[b3]) < 0) {
                      if (A3[S3--] = A3[b3--], C3++, (k3 = 0) == --m3) {
                        D3 = true;
                        break;
                      }
                    } else if (A3[S3--] = z3[w3--], k3++, C3 = 0, 1 == --_3) {
                      D3 = true;
                      break;
                    }
                  } while ((C3 | k3) < I3);
                  if (D3)
                    break;
                  do {
                    if (0 !== (C3 = m3 - Vn(z3[w3], A3, y3, m3, m3 - 1, L3))) {
                      for (m3 -= C3, T3 = (S3 -= C3) + 1, M3 = (b3 -= C3) + 1, x3 = C3 - 1; 0 <= x3; x3--)
                        A3[T3 + x3] = A3[M3 + x3];
                      if (0 === m3) {
                        D3 = true;
                        break;
                      }
                    }
                    if (A3[S3--] = z3[w3--], 1 == --_3) {
                      D3 = true;
                      break;
                    }
                    if (0 !== (k3 = _3 - En(A3[b3], z3, 0, _3, _3 - 1, L3))) {
                      for (_3 -= k3, T3 = (S3 -= k3) + 1, M3 = (w3 -= k3) + 1, x3 = 0; x3 < k3; x3++)
                        A3[T3 + x3] = z3[M3 + x3];
                      if (_3 <= 1) {
                        D3 = true;
                        break;
                      }
                    }
                    if (A3[S3--] = A3[b3--], 0 == --m3) {
                      D3 = true;
                      break;
                    }
                  } while (I3--, Nn <= C3 || Nn <= k3);
                  if (D3)
                    break;
                  I3 < 0 && (I3 = 0), I3 += 2;
                }
                if ((R3 = I3) < 1 && (R3 = 1), 1 === _3) {
                  for (T3 = (S3 -= m3) + 1, M3 = (b3 -= m3) + 1, x3 = m3 - 1; 0 <= x3; x3--)
                    A3[T3 + x3] = A3[M3 + x3];
                  A3[S3] = z3[w3];
                } else {
                  if (0 === _3)
                    throw new Error();
                  for (M3 = S3 - (_3 - 1), x3 = 0; x3 < _3; x3++)
                    A3[M3 + x3] = z3[x3];
                }
              }
            }
        }
        return P3 = [], O3 = [], { mergeRuns: function() {
          for (; 1 < N3; ) {
            var t3 = N3 - 2;
            if (1 <= t3 && O3[t3 - 1] <= O3[t3] + O3[t3 + 1] || 2 <= t3 && O3[t3 - 2] <= O3[t3] + O3[t3 - 1])
              O3[t3 - 1] < O3[t3 + 1] && t3--;
            else if (O3[t3] > O3[t3 + 1])
              break;
            e3(t3);
          }
        }, forceMergeRuns: function() {
          for (; 1 < N3; ) {
            var t3 = N3 - 2;
            0 < t3 && O3[t3 - 1] < O3[t3 + 1] && t3--, e3(t3);
          }
        }, pushRun: function(t3, e4) {
          P3[N3] = t3, O3[N3] = e4, N3 += 1;
        } };
      }
      function Gn(t3, e3, n3, i3) {
        var r3 = (i3 = i3 || t3.length) - (n3 = n3 || 0);
        if (!(r3 < 2)) {
          var o3 = 0;
          if (r3 < Rn)
            Bn(t3, n3, i3, n3 + (o3 = zn(t3, n3, i3, e3)), e3);
          else {
            var a3, s3 = Fn(t3, e3), l3 = function(t4) {
              for (var e4 = 0; Rn <= t4; )
                e4 |= 1 & t4, t4 >>= 1;
              return t4 + e4;
            }(r3);
            do {
            } while ((o3 = zn(t3, n3, i3, e3)) < l3 && (Bn(t3, n3, n3 + (a3 = l3 < (a3 = r3) ? l3 : r3), n3 + o3, e3), o3 = a3), s3.pushRun(n3, o3), s3.mergeRuns(), n3 += o3, 0 !== (r3 -= o3));
            s3.forceMergeRuns();
          }
        }
      }
      var Hn = 1, Wn = 4, Un = false;
      function Xn() {
        Un || (Un = true, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
      }
      function Yn(t3, e3) {
        return t3.zlevel === e3.zlevel ? t3.z === e3.z ? t3.z2 - e3.z2 : t3.z - e3.z : t3.zlevel - e3.zlevel;
      }
      Zn.prototype.traverse = function(t3, e3) {
        for (var n3 = 0; n3 < this._roots.length; n3++)
          this._roots[n3].traverse(t3, e3);
      }, Zn.prototype.getDisplayList = function(t3, e3) {
        e3 = e3 || false;
        var n3 = this._displayList;
        return !t3 && n3.length || this.updateDisplayList(e3), n3;
      }, Zn.prototype.updateDisplayList = function(t3) {
        this._displayListLen = 0;
        for (var e3 = this._roots, n3 = this._displayList, i3 = 0, r3 = e3.length; i3 < r3; i3++)
          this._updateAndAddDisplayable(e3[i3], null, t3);
        n3.length = this._displayListLen, Gn(n3, Yn);
      }, Zn.prototype._updateAndAddDisplayable = function(t3, e3, n3) {
        if (!t3.ignore || n3) {
          t3.beforeUpdate(), t3.update(), t3.afterUpdate();
          var i3 = t3.getClipPath(), r3 = e3 && e3.length, o3 = 0, a3 = t3.__clipPaths;
          if (!t3.ignoreClip && (r3 || i3)) {
            if (a3 = a3 || (t3.__clipPaths = []), r3)
              for (var s3 = 0; s3 < e3.length; s3++)
                a3[o3++] = e3[s3];
            for (var l3 = i3, u3 = t3; l3; )
              l3.parent = u3, l3.updateTransform(), l3 = (u3 = a3[o3++] = l3).getClipPath();
          }
          if (a3 && (a3.length = o3), t3.childrenRef) {
            for (var h3 = t3.childrenRef(), c3 = 0; c3 < h3.length; c3++) {
              var p3 = h3[c3];
              t3.__dirty && (p3.__dirty |= Hn), this._updateAndAddDisplayable(p3, a3, n3);
            }
            t3.__dirty = 0;
          } else {
            r3 = t3;
            isNaN(r3.z) && (Xn(), r3.z = 0), isNaN(r3.z2) && (Xn(), r3.z2 = 0), isNaN(r3.zlevel) && (Xn(), r3.zlevel = 0), this._displayList[this._displayListLen++] = r3;
          }
          i3 = t3.getDecalElement && t3.getDecalElement(), r3 = (i3 && this._updateAndAddDisplayable(i3, a3, n3), t3.getTextGuideLine()), i3 = (r3 && this._updateAndAddDisplayable(r3, a3, n3), t3.getTextContent());
          i3 && this._updateAndAddDisplayable(i3, a3, n3);
        }
      }, Zn.prototype.addRoot = function(t3) {
        t3.__zr && t3.__zr.storage === this || this._roots.push(t3);
      }, Zn.prototype.delRoot = function(t3) {
        if (t3 instanceof Array)
          for (var e3 = 0, n3 = t3.length; e3 < n3; e3++)
            this.delRoot(t3[e3]);
        else {
          var i3 = L(this._roots, t3);
          0 <= i3 && this._roots.splice(i3, 1);
        }
      }, Zn.prototype.delAllRoots = function() {
        this._roots = [], this._displayList = [], this._displayListLen = 0;
      }, Zn.prototype.getRoots = function() {
        return this._roots;
      }, Zn.prototype.dispose = function() {
        this._displayList = null, this._roots = null;
      };
      var qn = Zn;
      function Zn() {
        this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = Yn;
      }
      var jn = b.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(t3) {
        return setTimeout(t3, 16);
      }, Kn = { linear: function(t3) {
        return t3;
      }, quadraticIn: function(t3) {
        return t3 * t3;
      }, quadraticOut: function(t3) {
        return t3 * (2 - t3);
      }, quadraticInOut: function(t3) {
        return (t3 *= 2) < 1 ? 0.5 * t3 * t3 : -0.5 * (--t3 * (t3 - 2) - 1);
      }, cubicIn: function(t3) {
        return t3 * t3 * t3;
      }, cubicOut: function(t3) {
        return --t3 * t3 * t3 + 1;
      }, cubicInOut: function(t3) {
        return (t3 *= 2) < 1 ? 0.5 * t3 * t3 * t3 : 0.5 * ((t3 -= 2) * t3 * t3 + 2);
      }, quarticIn: function(t3) {
        return t3 * t3 * t3 * t3;
      }, quarticOut: function(t3) {
        return 1 - --t3 * t3 * t3 * t3;
      }, quarticInOut: function(t3) {
        return (t3 *= 2) < 1 ? 0.5 * t3 * t3 * t3 * t3 : -0.5 * ((t3 -= 2) * t3 * t3 * t3 - 2);
      }, quinticIn: function(t3) {
        return t3 * t3 * t3 * t3 * t3;
      }, quinticOut: function(t3) {
        return --t3 * t3 * t3 * t3 * t3 + 1;
      }, quinticInOut: function(t3) {
        return (t3 *= 2) < 1 ? 0.5 * t3 * t3 * t3 * t3 * t3 : 0.5 * ((t3 -= 2) * t3 * t3 * t3 * t3 + 2);
      }, sinusoidalIn: function(t3) {
        return 1 - Math.cos(t3 * Math.PI / 2);
      }, sinusoidalOut: function(t3) {
        return Math.sin(t3 * Math.PI / 2);
      }, sinusoidalInOut: function(t3) {
        return 0.5 * (1 - Math.cos(Math.PI * t3));
      }, exponentialIn: function(t3) {
        return 0 === t3 ? 0 : Math.pow(1024, t3 - 1);
      }, exponentialOut: function(t3) {
        return 1 === t3 ? 1 : 1 - Math.pow(2, -10 * t3);
      }, exponentialInOut: function(t3) {
        return 0 === t3 ? 0 : 1 === t3 ? 1 : (t3 *= 2) < 1 ? 0.5 * Math.pow(1024, t3 - 1) : 0.5 * (2 - Math.pow(2, -10 * (t3 - 1)));
      }, circularIn: function(t3) {
        return 1 - Math.sqrt(1 - t3 * t3);
      }, circularOut: function(t3) {
        return Math.sqrt(1 - --t3 * t3);
      }, circularInOut: function(t3) {
        return (t3 *= 2) < 1 ? -0.5 * (Math.sqrt(1 - t3 * t3) - 1) : 0.5 * (Math.sqrt(1 - (t3 -= 2) * t3) + 1);
      }, elasticIn: function(t3) {
        var e3, n3 = 0.1;
        return 0 === t3 ? 0 : 1 === t3 ? 1 : (e3 = !n3 || n3 < 1 ? (n3 = 1, 0.1) : 0.4 * Math.asin(1 / n3) / (2 * Math.PI), -(n3 * Math.pow(2, 10 * --t3) * Math.sin((t3 - e3) * (2 * Math.PI) / 0.4)));
      }, elasticOut: function(t3) {
        var e3, n3 = 0.1;
        return 0 === t3 ? 0 : 1 === t3 ? 1 : (e3 = !n3 || n3 < 1 ? (n3 = 1, 0.1) : 0.4 * Math.asin(1 / n3) / (2 * Math.PI), n3 * Math.pow(2, -10 * t3) * Math.sin((t3 - e3) * (2 * Math.PI) / 0.4) + 1);
      }, elasticInOut: function(t3) {
        var e3, n3 = 0.1;
        return 0 === t3 ? 0 : 1 === t3 ? 1 : (e3 = !n3 || n3 < 1 ? (n3 = 1, 0.1) : 0.4 * Math.asin(1 / n3) / (2 * Math.PI), (t3 *= 2) < 1 ? n3 * Math.pow(2, 10 * --t3) * Math.sin((t3 - e3) * (2 * Math.PI) / 0.4) * -0.5 : n3 * Math.pow(2, -10 * --t3) * Math.sin((t3 - e3) * (2 * Math.PI) / 0.4) * 0.5 + 1);
      }, backIn: function(t3) {
        return t3 * t3 * (2.70158 * t3 - 1.70158);
      }, backOut: function(t3) {
        return --t3 * t3 * (2.70158 * t3 + 1.70158) + 1;
      }, backInOut: function(t3) {
        var e3 = 2.5949095;
        return (t3 *= 2) < 1 ? t3 * t3 * ((1 + e3) * t3 - e3) * 0.5 : 0.5 * ((t3 -= 2) * t3 * ((1 + e3) * t3 + e3) + 2);
      }, bounceIn: function(t3) {
        return 1 - Kn.bounceOut(1 - t3);
      }, bounceOut: function(t3) {
        return t3 < 1 / 2.75 ? 7.5625 * t3 * t3 : t3 < 2 / 2.75 ? 7.5625 * (t3 -= 1.5 / 2.75) * t3 + 0.75 : t3 < 2.5 / 2.75 ? 7.5625 * (t3 -= 2.25 / 2.75) * t3 + 0.9375 : 7.5625 * (t3 -= 2.625 / 2.75) * t3 + 0.984375;
      }, bounceInOut: function(t3) {
        return t3 < 0.5 ? 0.5 * Kn.bounceIn(2 * t3) : 0.5 * Kn.bounceOut(2 * t3 - 1) + 0.5;
      } }, $n = Math.pow, Qn = Math.sqrt, Jn = 1e-8, ti = Qn(3), ei = 1 / 3, ni = qt(), ii = qt(), ri = qt();
      function oi(t3) {
        return -Jn < t3 && t3 < Jn;
      }
      function ai(t3) {
        return Jn < t3 || t3 < -Jn;
      }
      function si(t3, e3, n3, i3, r3) {
        var o3 = 1 - r3;
        return o3 * o3 * (o3 * t3 + 3 * r3 * e3) + r3 * r3 * (r3 * i3 + 3 * o3 * n3);
      }
      function li(t3, e3, n3, i3, r3) {
        var o3 = 1 - r3;
        return 3 * (((e3 - t3) * o3 + 2 * (n3 - e3) * r3) * o3 + (i3 - n3) * r3 * r3);
      }
      function ui(t3, e3, n3, i3, r3, o3) {
        var a3, s3, i3 = i3 + 3 * (e3 - n3) - t3, n3 = 3 * (n3 - 2 * e3 + t3), e3 = 3 * (e3 - t3), t3 = t3 - r3, r3 = n3 * n3 - 3 * i3 * e3, l3 = n3 * e3 - 9 * i3 * t3, t3 = e3 * e3 - 3 * n3 * t3, u3 = 0;
        return oi(r3) && oi(l3) ? oi(n3) ? o3[0] = 0 : 0 <= (a3 = -e3 / n3) && a3 <= 1 && (o3[u3++] = a3) : oi(e3 = l3 * l3 - 4 * r3 * t3) ? (s3 = -(t3 = l3 / r3) / 2, 0 <= (a3 = -n3 / i3 + t3) && a3 <= 1 && (o3[u3++] = a3), 0 <= s3 && s3 <= 1 && (o3[u3++] = s3)) : 0 < e3 ? (e3 = r3 * n3 + 1.5 * i3 * (-l3 - (t3 = Qn(e3))), 0 <= (a3 = (-n3 - ((t3 = (t3 = r3 * n3 + 1.5 * i3 * (-l3 + t3)) < 0 ? -$n(-t3, ei) : $n(t3, ei)) + (e3 = e3 < 0 ? -$n(-e3, ei) : $n(e3, ei)))) / (3 * i3)) && a3 <= 1 && (o3[u3++] = a3)) : (t3 = (2 * r3 * n3 - 3 * i3 * l3) / (2 * Qn(r3 * r3 * r3)), e3 = Math.acos(t3) / 3, a3 = (-n3 - 2 * (l3 = Qn(r3)) * (t3 = Math.cos(e3))) / (3 * i3), s3 = (-n3 + l3 * (t3 + ti * Math.sin(e3))) / (3 * i3), r3 = (-n3 + l3 * (t3 - ti * Math.sin(e3))) / (3 * i3), 0 <= a3 && a3 <= 1 && (o3[u3++] = a3), 0 <= s3 && s3 <= 1 && (o3[u3++] = s3), 0 <= r3 && r3 <= 1 && (o3[u3++] = r3)), u3;
      }
      function hi(t3, e3, n3, i3, r3) {
        var o3, a3 = 6 * n3 - 12 * e3 + 6 * t3, i3 = 9 * e3 + 3 * i3 - 3 * t3 - 9 * n3, n3 = 3 * e3 - 3 * t3, e3 = 0;
        return oi(i3) ? ai(a3) && 0 <= (o3 = -n3 / a3) && o3 <= 1 && (r3[e3++] = o3) : oi(t3 = a3 * a3 - 4 * i3 * n3) ? r3[0] = -a3 / (2 * i3) : 0 < t3 && (t3 = (-a3 - (n3 = Qn(t3))) / (2 * i3), 0 <= (o3 = (-a3 + n3) / (2 * i3)) && o3 <= 1 && (r3[e3++] = o3), 0 <= t3) && t3 <= 1 && (r3[e3++] = t3), e3;
      }
      function ci(t3, e3, n3, i3, r3, o3) {
        var a3 = (e3 - t3) * r3 + t3, e3 = (n3 - e3) * r3 + e3, n3 = (i3 - n3) * r3 + n3, s3 = (e3 - a3) * r3 + a3, e3 = (n3 - e3) * r3 + e3, r3 = (e3 - s3) * r3 + s3;
        o3[0] = t3, o3[1] = a3, o3[2] = s3, o3[3] = r3, o3[4] = r3, o3[5] = e3, o3[6] = n3, o3[7] = i3;
      }
      function pi(t3, e3, n3, i3, r3, o3, a3, s3, l3, u3, h3) {
        var c3, p3, d3, f3, g3 = 5e-3, y3 = 1 / 0;
        ni[0] = l3, ni[1] = u3;
        for (var m3 = 0; m3 < 1; m3 += 0.05)
          ii[0] = si(t3, n3, r3, a3, m3), ii[1] = si(e3, i3, o3, s3, m3), (d3 = ae(ni, ii)) < y3 && (c3 = m3, y3 = d3);
        for (var y3 = 1 / 0, v3 = 0; v3 < 32 && !(g3 < 1e-4); v3++)
          p3 = c3 + g3, ii[0] = si(t3, n3, r3, a3, f3 = c3 - g3), ii[1] = si(e3, i3, o3, s3, f3), d3 = ae(ii, ni), 0 <= f3 && d3 < y3 ? (c3 = f3, y3 = d3) : (ri[0] = si(t3, n3, r3, a3, p3), ri[1] = si(e3, i3, o3, s3, p3), f3 = ae(ri, ni), p3 <= 1 && f3 < y3 ? (c3 = p3, y3 = f3) : g3 *= 0.5);
        return h3 && (h3[0] = si(t3, n3, r3, a3, c3), h3[1] = si(e3, i3, o3, s3, c3)), Qn(y3);
      }
      function di(t3, e3, n3, i3) {
        var r3 = 1 - i3;
        return r3 * (r3 * t3 + 2 * i3 * e3) + i3 * i3 * n3;
      }
      function fi(t3, e3, n3, i3) {
        return 2 * ((1 - i3) * (e3 - t3) + i3 * (n3 - e3));
      }
      function gi(t3, e3, n3) {
        n3 = t3 + n3 - 2 * e3;
        return 0 == n3 ? 0.5 : (t3 - e3) / n3;
      }
      function yi(t3, e3, n3, i3, r3) {
        var o3 = (e3 - t3) * i3 + t3, e3 = (n3 - e3) * i3 + e3, i3 = (e3 - o3) * i3 + o3;
        r3[0] = t3, r3[1] = o3, r3[2] = i3, r3[3] = i3, r3[4] = e3, r3[5] = n3;
      }
      function mi(t3, e3, n3, i3, r3, o3, a3, s3, l3) {
        var u3, h3 = 5e-3, c3 = 1 / 0;
        ni[0] = a3, ni[1] = s3;
        for (var p3 = 0; p3 < 1; p3 += 0.05)
          ii[0] = di(t3, n3, r3, p3), ii[1] = di(e3, i3, o3, p3), (y3 = ae(ni, ii)) < c3 && (u3 = p3, c3 = y3);
        for (var c3 = 1 / 0, d3 = 0; d3 < 32 && !(h3 < 1e-4); d3++) {
          var f3 = u3 - h3, g3 = u3 + h3, y3 = (ii[0] = di(t3, n3, r3, f3), ii[1] = di(e3, i3, o3, f3), ae(ii, ni));
          0 <= f3 && y3 < c3 ? (u3 = f3, c3 = y3) : (ri[0] = di(t3, n3, r3, g3), ri[1] = di(e3, i3, o3, g3), f3 = ae(ri, ni), g3 <= 1 && f3 < c3 ? (u3 = g3, c3 = f3) : h3 *= 0.5);
        }
        return l3 && (l3[0] = di(t3, n3, r3, u3), l3[1] = di(e3, i3, o3, u3)), Qn(c3);
      }
      var vi = /cubic-bezier\(([0-9,\.e ]+)\)/;
      function _i(t3) {
        t3 = t3 && vi.exec(t3);
        if (t3) {
          var e3, t3 = t3[1].split(","), n3 = +At(t3[0]), i3 = +At(t3[1]), r3 = +At(t3[2]), o3 = +At(t3[3]);
          if (!isNaN(n3 + i3 + r3 + o3))
            return e3 = [], function(t4) {
              return t4 <= 0 ? 0 : 1 <= t4 ? 1 : ui(0, n3, r3, 1, t4, e3) && si(0, i3, o3, 1, e3[0]);
            };
        }
      }
      bi.prototype.step = function(t3, e3) {
        if (this._inited || (this._startTime = t3 + this._delay, this._inited = true), !this._paused) {
          var n3 = this._life, i3 = t3 - this._startTime - this._pausedTime, r3 = i3 / n3, o3 = (r3 < 0 && (r3 = 0), r3 = Math.min(r3, 1), this.easingFunc), o3 = o3 ? o3(r3) : r3;
          if (this.onframe(o3), 1 === r3) {
            if (!this.loop)
              return true;
            this._startTime = t3 - i3 % n3, this._pausedTime = 0, this.onrestart();
          }
          return false;
        }
        this._pausedTime += e3;
      }, bi.prototype.pause = function() {
        this._paused = true;
      }, bi.prototype.resume = function() {
        this._paused = false;
      }, bi.prototype.setEasing = function(t3) {
        this.easing = t3, this.easingFunc = H(t3) ? t3 : Kn[t3] || _i(t3);
      };
      var xi = bi;
      function bi(t3) {
        this._inited = false, this._startTime = 0, this._pausedTime = 0, this._paused = false, this._life = t3.life || 1e3, this._delay = t3.delay || 0, this.loop = t3.loop || false, this.onframe = t3.onframe || Wt, this.ondestroy = t3.ondestroy || Wt, this.onrestart = t3.onrestart || Wt, t3.easing && this.setEasing(t3.easing);
      }
      var wi = function(t3) {
        this.value = t3;
      }, Si = (Mi.prototype.insert = function(t3) {
        t3 = new wi(t3);
        return this.insertEntry(t3), t3;
      }, Mi.prototype.insertEntry = function(t3) {
        this.head ? ((this.tail.next = t3).prev = this.tail, t3.next = null, this.tail = t3) : this.head = this.tail = t3, this._len++;
      }, Mi.prototype.remove = function(t3) {
        var e3 = t3.prev, n3 = t3.next;
        e3 ? e3.next = n3 : this.head = n3, n3 ? n3.prev = e3 : this.tail = e3, t3.next = t3.prev = null, this._len--;
      }, Mi.prototype.len = function() {
        return this._len;
      }, Mi.prototype.clear = function() {
        this.head = this.tail = null, this._len = 0;
      }, Mi);
      function Mi() {
        this._len = 0;
      }
      Ii.prototype.put = function(t3, e3) {
        var n3, i3, r3 = this._list, o3 = this._map, a3 = null;
        return null == o3[t3] && (i3 = r3.len(), n3 = this._lastRemovedEntry, i3 >= this._maxSize && 0 < i3 && (i3 = r3.head, r3.remove(i3), delete o3[i3.key], a3 = i3.value, this._lastRemovedEntry = i3), n3 ? n3.value = e3 : n3 = new wi(e3), n3.key = t3, r3.insertEntry(n3), o3[t3] = n3), a3;
      }, Ii.prototype.get = function(t3) {
        var t3 = this._map[t3], e3 = this._list;
        if (null != t3)
          return t3 !== e3.tail && (e3.remove(t3), e3.insertEntry(t3)), t3.value;
      }, Ii.prototype.clear = function() {
        this._list.clear(), this._map = {};
      }, Ii.prototype.len = function() {
        return this._list.len();
      };
      var Ti = Ii;
      function Ii(t3) {
        this._list = new Si(), this._maxSize = 10, this._map = {}, this._maxSize = t3;
      }
      var Ci = { transparent: [0, 0, 0, 0], aliceblue: [240, 248, 255, 1], antiquewhite: [250, 235, 215, 1], aqua: [0, 255, 255, 1], aquamarine: [127, 255, 212, 1], azure: [240, 255, 255, 1], beige: [245, 245, 220, 1], bisque: [255, 228, 196, 1], black: [0, 0, 0, 1], blanchedalmond: [255, 235, 205, 1], blue: [0, 0, 255, 1], blueviolet: [138, 43, 226, 1], brown: [165, 42, 42, 1], burlywood: [222, 184, 135, 1], cadetblue: [95, 158, 160, 1], chartreuse: [127, 255, 0, 1], chocolate: [210, 105, 30, 1], coral: [255, 127, 80, 1], cornflowerblue: [100, 149, 237, 1], cornsilk: [255, 248, 220, 1], crimson: [220, 20, 60, 1], cyan: [0, 255, 255, 1], darkblue: [0, 0, 139, 1], darkcyan: [0, 139, 139, 1], darkgoldenrod: [184, 134, 11, 1], darkgray: [169, 169, 169, 1], darkgreen: [0, 100, 0, 1], darkgrey: [169, 169, 169, 1], darkkhaki: [189, 183, 107, 1], darkmagenta: [139, 0, 139, 1], darkolivegreen: [85, 107, 47, 1], darkorange: [255, 140, 0, 1], darkorchid: [153, 50, 204, 1], darkred: [139, 0, 0, 1], darksalmon: [233, 150, 122, 1], darkseagreen: [143, 188, 143, 1], darkslateblue: [72, 61, 139, 1], darkslategray: [47, 79, 79, 1], darkslategrey: [47, 79, 79, 1], darkturquoise: [0, 206, 209, 1], darkviolet: [148, 0, 211, 1], deeppink: [255, 20, 147, 1], deepskyblue: [0, 191, 255, 1], dimgray: [105, 105, 105, 1], dimgrey: [105, 105, 105, 1], dodgerblue: [30, 144, 255, 1], firebrick: [178, 34, 34, 1], floralwhite: [255, 250, 240, 1], forestgreen: [34, 139, 34, 1], fuchsia: [255, 0, 255, 1], gainsboro: [220, 220, 220, 1], ghostwhite: [248, 248, 255, 1], gold: [255, 215, 0, 1], goldenrod: [218, 165, 32, 1], gray: [128, 128, 128, 1], green: [0, 128, 0, 1], greenyellow: [173, 255, 47, 1], grey: [128, 128, 128, 1], honeydew: [240, 255, 240, 1], hotpink: [255, 105, 180, 1], indianred: [205, 92, 92, 1], indigo: [75, 0, 130, 1], ivory: [255, 255, 240, 1], khaki: [240, 230, 140, 1], lavender: [230, 230, 250, 1], lavenderblush: [255, 240, 245, 1], lawngreen: [124, 252, 0, 1], lemonchiffon: [255, 250, 205, 1], lightblue: [173, 216, 230, 1], lightcoral: [240, 128, 128, 1], lightcyan: [224, 255, 255, 1], lightgoldenrodyellow: [250, 250, 210, 1], lightgray: [211, 211, 211, 1], lightgreen: [144, 238, 144, 1], lightgrey: [211, 211, 211, 1], lightpink: [255, 182, 193, 1], lightsalmon: [255, 160, 122, 1], lightseagreen: [32, 178, 170, 1], lightskyblue: [135, 206, 250, 1], lightslategray: [119, 136, 153, 1], lightslategrey: [119, 136, 153, 1], lightsteelblue: [176, 196, 222, 1], lightyellow: [255, 255, 224, 1], lime: [0, 255, 0, 1], limegreen: [50, 205, 50, 1], linen: [250, 240, 230, 1], magenta: [255, 0, 255, 1], maroon: [128, 0, 0, 1], mediumaquamarine: [102, 205, 170, 1], mediumblue: [0, 0, 205, 1], mediumorchid: [186, 85, 211, 1], mediumpurple: [147, 112, 219, 1], mediumseagreen: [60, 179, 113, 1], mediumslateblue: [123, 104, 238, 1], mediumspringgreen: [0, 250, 154, 1], mediumturquoise: [72, 209, 204, 1], mediumvioletred: [199, 21, 133, 1], midnightblue: [25, 25, 112, 1], mintcream: [245, 255, 250, 1], mistyrose: [255, 228, 225, 1], moccasin: [255, 228, 181, 1], navajowhite: [255, 222, 173, 1], navy: [0, 0, 128, 1], oldlace: [253, 245, 230, 1], olive: [128, 128, 0, 1], olivedrab: [107, 142, 35, 1], orange: [255, 165, 0, 1], orangered: [255, 69, 0, 1], orchid: [218, 112, 214, 1], palegoldenrod: [238, 232, 170, 1], palegreen: [152, 251, 152, 1], paleturquoise: [175, 238, 238, 1], palevioletred: [219, 112, 147, 1], papayawhip: [255, 239, 213, 1], peachpuff: [255, 218, 185, 1], peru: [205, 133, 63, 1], pink: [255, 192, 203, 1], plum: [221, 160, 221, 1], powderblue: [176, 224, 230, 1], purple: [128, 0, 128, 1], red: [255, 0, 0, 1], rosybrown: [188, 143, 143, 1], royalblue: [65, 105, 225, 1], saddlebrown: [139, 69, 19, 1], salmon: [250, 128, 114, 1], sandybrown: [244, 164, 96, 1], seagreen: [46, 139, 87, 1], seashell: [255, 245, 238, 1], sienna: [160, 82, 45, 1], silver: [192, 192, 192, 1], skyblue: [135, 206, 235, 1], slateblue: [106, 90, 205, 1], slategray: [112, 128, 144, 1], slategrey: [112, 128, 144, 1], snow: [255, 250, 250, 1], springgreen: [0, 255, 127, 1], steelblue: [70, 130, 180, 1], tan: [210, 180, 140, 1], teal: [0, 128, 128, 1], thistle: [216, 191, 216, 1], tomato: [255, 99, 71, 1], turquoise: [64, 224, 208, 1], violet: [238, 130, 238, 1], wheat: [245, 222, 179, 1], white: [255, 255, 255, 1], whitesmoke: [245, 245, 245, 1], yellow: [255, 255, 0, 1], yellowgreen: [154, 205, 50, 1] };
      function ki(t3) {
        return (t3 = Math.round(t3)) < 0 ? 0 : 255 < t3 ? 255 : t3;
      }
      function Di(t3) {
        return t3 < 0 ? 0 : 1 < t3 ? 1 : t3;
      }
      function Ai(t3) {
        return t3.length && "%" === t3.charAt(t3.length - 1) ? ki(parseFloat(t3) / 100 * 255) : ki(parseInt(t3, 10));
      }
      function Li(t3) {
        return t3.length && "%" === t3.charAt(t3.length - 1) ? Di(parseFloat(t3) / 100) : Di(parseFloat(t3));
      }
      function Pi(t3, e3, n3) {
        return n3 < 0 ? n3 += 1 : 1 < n3 && --n3, 6 * n3 < 1 ? t3 + (e3 - t3) * n3 * 6 : 2 * n3 < 1 ? e3 : 3 * n3 < 2 ? t3 + (e3 - t3) * (2 / 3 - n3) * 6 : t3;
      }
      function Oi(t3, e3, n3) {
        return t3 + (e3 - t3) * n3;
      }
      function Ri(t3, e3, n3, i3, r3) {
        return t3[0] = e3, t3[1] = n3, t3[2] = i3, t3[3] = r3, t3;
      }
      function Ni(t3, e3) {
        return t3[0] = e3[0], t3[1] = e3[1], t3[2] = e3[2], t3[3] = e3[3], t3;
      }
      var zi = new Ti(20), Bi = null;
      function Ei(t3, e3) {
        Bi && Ni(Bi, e3), Bi = zi.put(t3, Bi || e3.slice());
      }
      function Vi(t3, e3) {
        if (t3) {
          e3 = e3 || [];
          var n3 = zi.get(t3);
          if (n3)
            return Ni(e3, n3);
          n3 = (t3 += "").replace(/ /g, "").toLowerCase();
          if (n3 in Ci)
            return Ni(e3, Ci[n3]), Ei(t3, e3), e3;
          var i3 = n3.length;
          if ("#" === n3.charAt(0))
            return 4 === i3 || 5 === i3 ? 0 <= (r3 = parseInt(n3.slice(1, 4), 16)) && r3 <= 4095 ? (Ri(e3, (3840 & r3) >> 4 | (3840 & r3) >> 8, 240 & r3 | (240 & r3) >> 4, 15 & r3 | (15 & r3) << 4, 5 === i3 ? parseInt(n3.slice(4), 16) / 15 : 1), Ei(t3, e3), e3) : void Ri(e3, 0, 0, 0, 1) : 7 === i3 || 9 === i3 ? 0 <= (r3 = parseInt(n3.slice(1, 7), 16)) && r3 <= 16777215 ? (Ri(e3, (16711680 & r3) >> 16, (65280 & r3) >> 8, 255 & r3, 9 === i3 ? parseInt(n3.slice(7), 16) / 255 : 1), Ei(t3, e3), e3) : void Ri(e3, 0, 0, 0, 1) : void 0;
          var r3 = n3.indexOf("("), o3 = n3.indexOf(")");
          if (-1 !== r3 && o3 + 1 === i3) {
            var i3 = n3.substr(0, r3), a3 = n3.substr(r3 + 1, o3 - (r3 + 1)).split(","), s3 = 1;
            switch (i3) {
              case "rgba":
                if (4 !== a3.length)
                  return 3 === a3.length ? Ri(e3, +a3[0], +a3[1], +a3[2], 1) : Ri(e3, 0, 0, 0, 1);
                s3 = Li(a3.pop());
              case "rgb":
                return 3 <= a3.length ? (Ri(e3, Ai(a3[0]), Ai(a3[1]), Ai(a3[2]), 3 === a3.length ? s3 : Li(a3[3])), Ei(t3, e3), e3) : void Ri(e3, 0, 0, 0, 1);
              case "hsla":
                return 4 !== a3.length ? void Ri(e3, 0, 0, 0, 1) : (a3[3] = Li(a3[3]), Fi(a3, e3), Ei(t3, e3), e3);
              case "hsl":
                return 3 !== a3.length ? void Ri(e3, 0, 0, 0, 1) : (Fi(a3, e3), Ei(t3, e3), e3);
              default:
                return;
            }
          }
          Ri(e3, 0, 0, 0, 1);
        }
      }
      function Fi(t3, e3) {
        var n3 = (parseFloat(t3[0]) % 360 + 360) % 360 / 360, i3 = Li(t3[1]), r3 = Li(t3[2]), i3 = r3 <= 0.5 ? r3 * (i3 + 1) : r3 + i3 - r3 * i3, r3 = 2 * r3 - i3;
        return Ri(e3 = e3 || [], ki(255 * Pi(r3, i3, n3 + 1 / 3)), ki(255 * Pi(r3, i3, n3)), ki(255 * Pi(r3, i3, n3 - 1 / 3)), 1), 4 === t3.length && (e3[3] = t3[3]), e3;
      }
      function Gi(t3, e3) {
        var n3 = Vi(t3);
        if (n3) {
          for (var i3 = 0; i3 < 3; i3++)
            n3[i3] = e3 < 0 ? n3[i3] * (1 - e3) | 0 : (255 - n3[i3]) * e3 + n3[i3] | 0, 255 < n3[i3] ? n3[i3] = 255 : n3[i3] < 0 && (n3[i3] = 0);
          return qi(n3, 4 === n3.length ? "rgba" : "rgb");
        }
      }
      function Hi(t3, e3, n3) {
        var i3, r3, o3;
        if (e3 && e3.length && 0 <= t3 && t3 <= 1)
          return n3 = n3 || [], t3 = t3 * (e3.length - 1), i3 = Math.floor(t3), o3 = Math.ceil(t3), r3 = e3[i3], e3 = e3[o3], n3[0] = ki(Oi(r3[0], e3[0], o3 = t3 - i3)), n3[1] = ki(Oi(r3[1], e3[1], o3)), n3[2] = ki(Oi(r3[2], e3[2], o3)), n3[3] = Di(Oi(r3[3], e3[3], o3)), n3;
      }
      var Wi = Hi;
      function Ui(t3, e3, n3) {
        var i3, r3, o3, a3;
        if (e3 && e3.length && 0 <= t3 && t3 <= 1)
          return t3 = t3 * (e3.length - 1), i3 = Math.floor(t3), r3 = Math.ceil(t3), a3 = Vi(e3[i3]), e3 = Vi(e3[r3]), a3 = qi([ki(Oi(a3[0], e3[0], o3 = t3 - i3)), ki(Oi(a3[1], e3[1], o3)), ki(Oi(a3[2], e3[2], o3)), Di(Oi(a3[3], e3[3], o3))], "rgba"), n3 ? { color: a3, leftIndex: i3, rightIndex: r3, value: t3 } : a3;
      }
      var e = Ui;
      function Xi(t3, e3, n3, i3) {
        var r3 = Vi(t3);
        if (t3)
          return r3 = function(t4) {
            var e4, n4, i4, r4, o3, a3, s3, l3, u3, h3;
            if (t4)
              return h3 = t4[0] / 255, e4 = t4[1] / 255, n4 = t4[2] / 255, s3 = Math.min(h3, e4, n4), r4 = ((i4 = Math.max(h3, e4, n4)) + s3) / 2, 0 == (u3 = i4 - s3) ? a3 = o3 = 0 : (a3 = r4 < 0.5 ? u3 / (i4 + s3) : u3 / (2 - i4 - s3), s3 = ((i4 - h3) / 6 + u3 / 2) / u3, l3 = ((i4 - e4) / 6 + u3 / 2) / u3, u3 = ((i4 - n4) / 6 + u3 / 2) / u3, h3 === i4 ? o3 = u3 - l3 : e4 === i4 ? o3 = 1 / 3 + s3 - u3 : n4 === i4 && (o3 = 2 / 3 + l3 - s3), o3 < 0 && (o3 += 1), 1 < o3 && --o3), h3 = [360 * o3, a3, r4], null != t4[3] && h3.push(t4[3]), h3;
          }(r3), null != e3 && (r3[0] = (t3 = H(e3) ? e3(r3[0]) : e3, (t3 = Math.round(t3)) < 0 ? 0 : 360 < t3 ? 360 : t3)), null != n3 && (r3[1] = Li(H(n3) ? n3(r3[1]) : n3)), null != i3 && (r3[2] = Li(H(i3) ? i3(r3[2]) : i3)), qi(Fi(r3), "rgba");
      }
      function Yi(t3, e3) {
        t3 = Vi(t3);
        if (t3 && null != e3)
          return t3[3] = Di(e3), qi(t3, "rgba");
      }
      function qi(t3, e3) {
        var n3;
        if (t3 && t3.length)
          return n3 = t3[0] + "," + t3[1] + "," + t3[2], "rgba" !== e3 && "hsva" !== e3 && "hsla" !== e3 || (n3 += "," + t3[3]), e3 + "(" + n3 + ")";
      }
      function Zi(t3, e3) {
        t3 = Vi(t3);
        return t3 ? (0.299 * t3[0] + 0.587 * t3[1] + 0.114 * t3[2]) * t3[3] / 255 + (1 - t3[3]) * e3 : 0;
      }
      var ji = new Ti(100);
      function Ki(t3) {
        var e3;
        return W(t3) ? ((e3 = ji.get(t3)) || (e3 = Gi(t3, -0.1), ji.put(t3, e3)), e3) : bt(t3) ? ((e3 = V({}, t3)).colorStops = E(t3.colorStops, function(t4) {
          return { offset: t4.offset, color: Gi(t4.color, -0.1) };
        }), e3) : t3;
      }
      var Wi = Object.freeze({ __proto__: null, fastLerp: Hi, fastMapToColor: Wi, lerp: Ui, lift: Gi, liftColor: Ki, lum: Zi, mapToColor: e, modifyAlpha: Yi, modifyHSL: Xi, parse: Vi, parseCssFloat: Li, parseCssInt: Ai, random: function() {
        return qi([Math.round(255 * Math.random()), Math.round(255 * Math.random()), Math.round(255 * Math.random())], "rgb");
      }, stringify: qi, toHex: function(t3) {
        if (t3 = Vi(t3))
          return ((1 << 24) + (t3[0] << 16) + (t3[1] << 8) + +t3[2]).toString(16).slice(1);
      } }), $i = Math.round;
      function Qi(t3) {
        var e3, n3;
        return t3 && "transparent" !== t3 ? "string" == typeof t3 && -1 < t3.indexOf("rgba") && (n3 = Vi(t3)) && (t3 = "rgb(" + n3[0] + "," + n3[1] + "," + n3[2] + ")", e3 = n3[3]) : t3 = "none", { color: t3, opacity: null == e3 ? 1 : e3 };
      }
      function Ji(t3) {
        return t3 < 1e-4 && -1e-4 < t3;
      }
      function tr(t3) {
        return $i(1e3 * t3) / 1e3;
      }
      function er(t3) {
        return $i(1e4 * t3) / 1e4;
      }
      var nr = { left: "start", right: "end", center: "middle", middle: "middle" };
      function ir(t3) {
        return t3 && !!t3.image;
      }
      function rr(t3) {
        return ir(t3) || (t3 = t3) && !!t3.svgElement;
      }
      function or(t3) {
        return "linear" === t3.type;
      }
      function ar(t3) {
        return "radial" === t3.type;
      }
      function sr(t3) {
        return t3 && ("linear" === t3.type || "radial" === t3.type);
      }
      function lr(t3) {
        return "url(#" + t3 + ")";
      }
      function ur(t3) {
        t3 = t3.getGlobalScale(), t3 = Math.max(t3[0], t3[1]);
        return Math.max(Math.ceil(Math.log(t3) / Math.log(10)), 1);
      }
      function hr(t3) {
        var e3 = t3.x || 0, n3 = t3.y || 0, i3 = (t3.rotation || 0) * Ut, r3 = Y(t3.scaleX, 1), o3 = Y(t3.scaleY, 1), a3 = t3.skewX || 0, t3 = t3.skewY || 0, s3 = [];
        return (e3 || n3) && s3.push("translate(" + e3 + "px," + n3 + "px)"), i3 && s3.push("rotate(" + i3 + ")"), 1 === r3 && 1 === o3 || s3.push("scale(" + r3 + "," + o3 + ")"), (a3 || t3) && s3.push("skew(" + $i(a3 * Ut) + "deg, " + $i(t3 * Ut) + "deg)"), s3.join(" ");
      }
      var cr = "undefined" != typeof Buffer && "function" == typeof Buffer.from ? function(t3) {
        return Buffer.from(t3).toString("base64");
      } : "function" == typeof btoa && "function" == typeof unescape && "function" == typeof encodeURIComponent ? function(t3) {
        return btoa(unescape(encodeURIComponent(t3)));
      } : function(t3) {
        return null;
      }, pr = Array.prototype.slice;
      function dr(t3, e3, n3) {
        return (e3 - t3) * n3 + t3;
      }
      function fr(t3, e3, n3, i3) {
        for (var r3 = e3.length, o3 = 0; o3 < r3; o3++)
          t3[o3] = dr(e3[o3], n3[o3], i3);
        return t3;
      }
      function gr(t3, e3, n3, i3) {
        for (var r3 = e3.length, o3 = 0; o3 < r3; o3++)
          t3[o3] = e3[o3] + n3[o3] * i3;
        return t3;
      }
      function yr(t3, e3, n3, i3) {
        for (var r3 = e3.length, o3 = r3 && e3[0].length, a3 = 0; a3 < r3; a3++) {
          t3[a3] || (t3[a3] = []);
          for (var s3 = 0; s3 < o3; s3++)
            t3[a3][s3] = e3[a3][s3] + n3[a3][s3] * i3;
        }
        return t3;
      }
      function mr(t3) {
        if (pt(t3)) {
          var e3 = t3.length;
          if (pt(t3[0])) {
            for (var n3 = [], i3 = 0; i3 < e3; i3++)
              n3.push(pr.call(t3[i3]));
            return n3;
          }
          return pr.call(t3);
        }
        return t3;
      }
      function vr(t3) {
        return t3[0] = Math.floor(t3[0]) || 0, t3[1] = Math.floor(t3[1]) || 0, t3[2] = Math.floor(t3[2]) || 0, t3[3] = null == t3[3] ? 1 : t3[3], "rgba(" + t3.join(",") + ")";
      }
      function _r(t3) {
        return 4 === t3 || 5 === t3;
      }
      function xr(t3) {
        return 1 === t3 || 2 === t3;
      }
      var br = [0, 0, 0, 0], wr = (Sr.prototype.isFinished = function() {
        return this._finished;
      }, Sr.prototype.setFinished = function() {
        this._finished = true, this._additiveTrack && this._additiveTrack.setFinished();
      }, Sr.prototype.needsAnimate = function() {
        return 1 <= this.keyframes.length;
      }, Sr.prototype.getAdditiveTrack = function() {
        return this._additiveTrack;
      }, Sr.prototype.addKeyframe = function(t3, e3, n3) {
        this._needsSort = true;
        var i3, r3 = this.keyframes, o3 = r3.length, a3 = false, s3 = 6, l3 = e3, u3 = (pt(e3) ? (1 == (s3 = i3 = pt((i3 = e3) && i3[0]) ? 2 : 1) && !U(e3[0]) || 2 == i3 && !U(e3[0][0])) && (a3 = true) : U(e3) && !Mt(e3) ? s3 = 0 : W(e3) ? isNaN(+e3) ? (i3 = Vi(e3)) && (l3 = i3, s3 = 3) : s3 = 0 : bt(e3) && ((u3 = V({}, l3)).colorStops = E(e3.colorStops, function(t4) {
          return { offset: t4.offset, color: Vi(t4.color) };
        }), or(e3) ? s3 = 4 : ar(e3) && (s3 = 5), l3 = u3), 0 === o3 ? this.valType = s3 : s3 === this.valType && 6 !== s3 || (a3 = true), this.discrete = this.discrete || a3, { time: t3, value: l3, rawValue: e3, percent: 0 });
        return n3 && (u3.easing = n3, u3.easingFunc = H(n3) ? n3 : Kn[n3] || _i(n3)), r3.push(u3), u3;
      }, Sr.prototype.prepare = function(t3, e3) {
        for (var n3 = this.keyframes, i3 = (this._needsSort && n3.sort(function(t4, e4) {
          return t4.time - e4.time;
        }), this.valType), r3 = n3.length, o3 = n3[r3 - 1], a3 = this.discrete, s3 = xr(i3), l3 = _r(i3), u3 = 0; u3 < r3; u3++) {
          var h3 = n3[u3], c3 = h3.value, p3 = o3.value;
          if (h3.percent = h3.time / t3, !a3) {
            if (s3 && u3 !== r3 - 1) {
              x3 = _3 = v3 = m3 = y3 = g3 = f3 = d3 = h3 = void 0;
              var d3 = p3, f3 = i3, g3 = h3 = c3, y3 = d3;
              if (g3.push && y3.push) {
                var h3 = g3.length, m3 = y3.length;
                if (h3 !== m3)
                  if (m3 < h3)
                    g3.length = m3;
                  else
                    for (var v3 = h3; v3 < m3; v3++)
                      g3.push(1 === f3 ? y3[v3] : pr.call(y3[v3]));
                for (var _3 = g3[0] && g3[0].length, v3 = 0; v3 < g3.length; v3++)
                  if (1 === f3)
                    isNaN(g3[v3]) && (g3[v3] = y3[v3]);
                  else
                    for (var x3 = 0; x3 < _3; x3++)
                      isNaN(g3[v3][x3]) && (g3[v3][x3] = y3[v3][x3]);
              }
            } else if (l3) {
              T3 = M3 = S3 = w3 = b3 = h3 = d3 = void 0;
              for (var d3 = c3.colorStops, h3 = p3.colorStops, b3 = d3.length, w3 = h3.length, S3 = w3 < b3 ? h3 : d3, h3 = Math.min(b3, w3), M3 = S3[h3 - 1] || { color: [0, 0, 0, 0], offset: 0 }, T3 = h3; T3 < Math.max(b3, w3); T3++)
                S3.push({ offset: M3.offset, color: M3.color.slice() });
            }
          }
        }
        if (!a3 && 5 !== i3 && e3 && this.needsAnimate() && e3.needsAnimate() && i3 === e3.valType && !e3._finished) {
          this._additiveTrack = e3;
          for (var I3 = n3[0].value, u3 = 0; u3 < r3; u3++)
            0 === i3 ? n3[u3].additiveValue = n3[u3].value - I3 : 3 === i3 ? n3[u3].additiveValue = gr([], n3[u3].value, I3, -1) : xr(i3) && (n3[u3].additiveValue = (1 === i3 ? gr : yr)([], n3[u3].value, I3, -1));
        }
      }, Sr.prototype.step = function(t3, e3) {
        if (!this._finished) {
          this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
          var n3, i3, r3, o3, a3 = null != this._additiveTrack, s3 = a3 ? "additiveValue" : "value", l3 = this.valType, u3 = this.keyframes, h3 = u3.length, c3 = this.propName, p3 = 3 === l3, d3 = this._lastFr, f3 = Math.min;
          if (1 === h3)
            n3 = i3 = u3[0];
          else {
            if (e3 < 0)
              g3 = 0;
            else if (e3 < this._lastFrP) {
              for (var g3 = f3(d3 + 1, h3 - 1); 0 <= g3 && !(u3[g3].percent <= e3); g3--)
                ;
              g3 = f3(g3, h3 - 2);
            } else {
              for (g3 = d3; g3 < h3 && !(u3[g3].percent > e3); g3++)
                ;
              g3 = f3(g3 - 1, h3 - 2);
            }
            i3 = u3[g3 + 1], n3 = u3[g3];
          }
          n3 && i3 && (this._lastFr = g3, this._lastFrP = e3, d3 = i3.percent - n3.percent, r3 = 0 == d3 ? 1 : f3((e3 - n3.percent) / d3, 1), i3.easingFunc && (r3 = i3.easingFunc(r3)), f3 = a3 ? this._additiveValue : p3 ? br : t3[c3], (xr(l3) || p3) && (f3 = f3 || (this._additiveValue = [])), this.discrete ? t3[c3] = (r3 < 1 ? n3 : i3).rawValue : xr(l3) ? (1 === l3 ? fr : function(t4, e4, n4, i4) {
            for (var r4 = e4.length, o4 = r4 && e4[0].length, a4 = 0; a4 < r4; a4++) {
              t4[a4] || (t4[a4] = []);
              for (var s4 = 0; s4 < o4; s4++)
                t4[a4][s4] = dr(e4[a4][s4], n4[a4][s4], i4);
            }
          })(f3, n3[s3], i3[s3], r3) : _r(l3) ? (d3 = n3[s3], o3 = i3[s3], t3[c3] = { type: (l3 = 4 === l3) ? "linear" : "radial", x: dr(d3.x, o3.x, r3), y: dr(d3.y, o3.y, r3), colorStops: E(d3.colorStops, function(t4, e4) {
            e4 = o3.colorStops[e4];
            return { offset: dr(t4.offset, e4.offset, r3), color: vr(fr([], t4.color, e4.color, r3)) };
          }), global: o3.global }, l3 ? (t3[c3].x2 = dr(d3.x2, o3.x2, r3), t3[c3].y2 = dr(d3.y2, o3.y2, r3)) : t3[c3].r = dr(d3.r, o3.r, r3)) : p3 ? (fr(f3, n3[s3], i3[s3], r3), a3 || (t3[c3] = vr(f3))) : (l3 = dr(n3[s3], i3[s3], r3), a3 ? this._additiveValue = l3 : t3[c3] = l3), a3) && this._addToTarget(t3);
        }
      }, Sr.prototype._addToTarget = function(t3) {
        var e3 = this.valType, n3 = this.propName, i3 = this._additiveValue;
        0 === e3 ? t3[n3] = t3[n3] + i3 : 3 === e3 ? (Vi(t3[n3], br), gr(br, br, i3, 1), t3[n3] = vr(br)) : 1 === e3 ? gr(t3[n3], t3[n3], i3, 1) : 2 === e3 && yr(t3[n3], t3[n3], i3, 1);
      }, Sr);
      function Sr(t3) {
        this.keyframes = [], this.discrete = false, this._invalid = false, this._needsSort = false, this._lastFr = 0, this._lastFrP = 0, this.propName = t3;
      }
      Tr.prototype.getMaxTime = function() {
        return this._maxTime;
      }, Tr.prototype.getDelay = function() {
        return this._delay;
      }, Tr.prototype.getLoop = function() {
        return this._loop;
      }, Tr.prototype.getTarget = function() {
        return this._target;
      }, Tr.prototype.changeTarget = function(t3) {
        this._target = t3;
      }, Tr.prototype.when = function(t3, e3, n3) {
        return this.whenWithKeys(t3, e3, O(e3), n3);
      }, Tr.prototype.whenWithKeys = function(t3, e3, n3, i3) {
        for (var r3 = this._tracks, o3 = 0; o3 < n3.length; o3++) {
          var a3 = n3[o3];
          if (!(l3 = r3[a3])) {
            var s3, l3 = r3[a3] = new wr(a3), u3 = void 0, h3 = this._getAdditiveTrack(a3);
            if (h3 ? (u3 = (s3 = (s3 = h3.keyframes)[s3.length - 1]) && s3.value, 3 === h3.valType && (u3 = u3 && vr(u3))) : u3 = this._target[a3], null == u3)
              continue;
            0 < t3 && l3.addKeyframe(0, mr(u3), i3), this._trackKeys.push(a3);
          }
          l3.addKeyframe(t3, mr(e3[a3]), i3);
        }
        return this._maxTime = Math.max(this._maxTime, t3), this;
      }, Tr.prototype.pause = function() {
        this._clip.pause(), this._paused = true;
      }, Tr.prototype.resume = function() {
        this._clip.resume(), this._paused = false;
      }, Tr.prototype.isPaused = function() {
        return !!this._paused;
      }, Tr.prototype.duration = function(t3) {
        return this._maxTime = t3, this._force = true, this;
      }, Tr.prototype._doneCallback = function() {
        this._setTracksFinished(), this._clip = null;
        var t3 = this._doneCbs;
        if (t3)
          for (var e3 = t3.length, n3 = 0; n3 < e3; n3++)
            t3[n3].call(this);
      }, Tr.prototype._abortedCallback = function() {
        this._setTracksFinished();
        var t3 = this.animation, e3 = this._abortedCbs;
        if (t3 && t3.removeClip(this._clip), this._clip = null, e3)
          for (var n3 = 0; n3 < e3.length; n3++)
            e3[n3].call(this);
      }, Tr.prototype._setTracksFinished = function() {
        for (var t3 = this._tracks, e3 = this._trackKeys, n3 = 0; n3 < e3.length; n3++)
          t3[e3[n3]].setFinished();
      }, Tr.prototype._getAdditiveTrack = function(t3) {
        var e3, n3 = this._additiveAnimators;
        if (n3)
          for (var i3 = 0; i3 < n3.length; i3++) {
            var r3 = n3[i3].getTrack(t3);
            r3 && (e3 = r3);
          }
        return e3;
      }, Tr.prototype.start = function(t3) {
        if (!(0 < this._started)) {
          this._started = 1;
          for (var e3, o3 = this, a3 = [], n3 = this._maxTime || 0, i3 = 0; i3 < this._trackKeys.length; i3++) {
            var r3 = this._trackKeys[i3], s3 = this._tracks[r3], r3 = this._getAdditiveTrack(r3), l3 = s3.keyframes, u3 = l3.length;
            s3.prepare(n3, r3), s3.needsAnimate() && (!this._allowDiscrete && s3.discrete ? ((r3 = l3[u3 - 1]) && (o3._target[s3.propName] = r3.rawValue), s3.setFinished()) : a3.push(s3));
          }
          return a3.length || this._force ? (e3 = new xi({ life: n3, loop: this._loop, delay: this._delay || 0, onframe: function(t4) {
            o3._started = 2;
            var e4 = o3._additiveAnimators;
            if (e4) {
              for (var n4 = false, i4 = 0; i4 < e4.length; i4++)
                if (e4[i4]._clip) {
                  n4 = true;
                  break;
                }
              n4 || (o3._additiveAnimators = null);
            }
            for (i4 = 0; i4 < a3.length; i4++)
              a3[i4].step(o3._target, t4);
            var r4 = o3._onframeCbs;
            if (r4)
              for (i4 = 0; i4 < r4.length; i4++)
                r4[i4](o3._target, t4);
          }, ondestroy: function() {
            o3._doneCallback();
          } }), this._clip = e3, this.animation && this.animation.addClip(e3), t3 && e3.setEasing(t3)) : this._doneCallback(), this;
        }
      }, Tr.prototype.stop = function(t3) {
        var e3;
        this._clip && (e3 = this._clip, t3 && e3.onframe(1), this._abortedCallback());
      }, Tr.prototype.delay = function(t3) {
        return this._delay = t3, this;
      }, Tr.prototype.during = function(t3) {
        return t3 && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(t3)), this;
      }, Tr.prototype.done = function(t3) {
        return t3 && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(t3)), this;
      }, Tr.prototype.aborted = function(t3) {
        return t3 && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(t3)), this;
      }, Tr.prototype.getClip = function() {
        return this._clip;
      }, Tr.prototype.getTrack = function(t3) {
        return this._tracks[t3];
      }, Tr.prototype.getTracks = function() {
        var e3 = this;
        return E(this._trackKeys, function(t3) {
          return e3._tracks[t3];
        });
      }, Tr.prototype.stopTracks = function(t3, e3) {
        if (!t3.length || !this._clip)
          return true;
        for (var n3 = this._tracks, i3 = this._trackKeys, r3 = 0; r3 < t3.length; r3++) {
          var o3 = n3[t3[r3]];
          o3 && !o3.isFinished() && (e3 ? o3.step(this._target, 1) : 1 === this._started && o3.step(this._target, 0), o3.setFinished());
        }
        for (var a3 = true, r3 = 0; r3 < i3.length; r3++)
          if (!n3[i3[r3]].isFinished()) {
            a3 = false;
            break;
          }
        return a3 && this._abortedCallback(), a3;
      }, Tr.prototype.saveTo = function(t3, e3, n3) {
        if (t3) {
          e3 = e3 || this._trackKeys;
          for (var i3 = 0; i3 < e3.length; i3++) {
            var r3 = e3[i3], o3 = this._tracks[r3];
            o3 && !o3.isFinished() && (o3 = (o3 = o3.keyframes)[n3 ? 0 : o3.length - 1]) && (t3[r3] = mr(o3.rawValue));
          }
        }
      }, Tr.prototype.__changeFinalValue = function(t3, e3) {
        e3 = e3 || O(t3);
        for (var n3 = 0; n3 < e3.length; n3++) {
          var i3, r3 = e3[n3], o3 = this._tracks[r3];
          o3 && 1 < (i3 = o3.keyframes).length && (i3 = i3.pop(), o3.addKeyframe(i3.time, t3[r3]), o3.prepare(this._maxTime, o3.getAdditiveTrack()));
        }
      };
      var Mr = Tr;
      function Tr(t3, e3, n3, i3) {
        this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t3, (this._loop = e3) && i3 ? st("Can' use additive animation on looped animation.") : (this._additiveAnimators = i3, this._allowDiscrete = n3);
      }
      function Ir() {
        return (/* @__PURE__ */ new Date()).getTime();
      }
      u(Dr, Cr = ge), Dr.prototype.addClip = function(t3) {
        t3.animation && this.removeClip(t3), this._head ? ((this._tail.next = t3).prev = this._tail, t3.next = null, this._tail = t3) : this._head = this._tail = t3, t3.animation = this;
      }, Dr.prototype.addAnimator = function(t3) {
        t3.animation = this;
        t3 = t3.getClip();
        t3 && this.addClip(t3);
      }, Dr.prototype.removeClip = function(t3) {
        var e3, n3;
        t3.animation && (e3 = t3.prev, n3 = t3.next, e3 ? e3.next = n3 : this._head = n3, n3 ? n3.prev = e3 : this._tail = e3, t3.next = t3.prev = t3.animation = null);
      }, Dr.prototype.removeAnimator = function(t3) {
        var e3 = t3.getClip();
        e3 && this.removeClip(e3), t3.animation = null;
      }, Dr.prototype.update = function(t3) {
        for (var e3 = Ir() - this._pausedTime, n3 = e3 - this._time, i3 = this._head; i3; )
          var r3 = i3.next, i3 = (i3.step(e3, n3) && (i3.ondestroy(), this.removeClip(i3)), r3);
        this._time = e3, t3 || (this.trigger("frame", n3), this.stage.update && this.stage.update());
      }, Dr.prototype._startLoop = function() {
        var e3 = this;
        this._running = true, jn(function t3() {
          e3._running && (jn(t3), e3._paused || e3.update());
        });
      }, Dr.prototype.start = function() {
        this._running || (this._time = Ir(), this._pausedTime = 0, this._startLoop());
      }, Dr.prototype.stop = function() {
        this._running = false;
      }, Dr.prototype.pause = function() {
        this._paused || (this._pauseStart = Ir(), this._paused = true);
      }, Dr.prototype.resume = function() {
        this._paused && (this._pausedTime += Ir() - this._pauseStart, this._paused = false);
      }, Dr.prototype.clear = function() {
        for (var t3 = this._head; t3; ) {
          var e3 = t3.next;
          t3.prev = t3.next = t3.animation = null, t3 = e3;
        }
        this._head = this._tail = null;
      }, Dr.prototype.isFinished = function() {
        return null == this._head;
      }, Dr.prototype.animate = function(t3, e3) {
        e3 = e3 || {}, this.start();
        t3 = new Mr(t3, e3.loop);
        return this.addAnimator(t3), t3;
      };
      var Cr, kr = Dr;
      function Dr(t3) {
        var e3 = Cr.call(this) || this;
        return e3._running = false, e3._time = 0, e3._pausedTime = 0, e3._pauseStart = 0, e3._paused = false, e3.stage = (t3 = t3 || {}).stage || {}, e3;
      }
      var Ar, Lr = b.domSupported, Pr = (Ar = { pointerdown: 1, pointerup: 1, pointermove: 1, pointerout: 1 }, { mouse: e = ["click", "dblclick", "mousewheel", "wheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"], touch: ["touchstart", "touchend", "touchmove"], pointer: E(e, function(t3) {
        var e3 = t3.replace("mouse", "pointer");
        return Ar.hasOwnProperty(e3) ? e3 : t3;
      }) }), Or = ["mousemove", "mouseup"], Rr = ["pointermove", "pointerup"], Nr = false;
      function zr(t3) {
        t3 = t3.pointerType;
        return "pen" === t3 || "touch" === t3;
      }
      function Br(t3) {
        t3 && (t3.zrByTouch = true);
      }
      function Er(t3, e3) {
        for (var n3 = e3, i3 = false; n3 && 9 !== n3.nodeType && !(i3 = n3.domBelongToZr || n3 !== e3 && n3 === t3.painterRoot); )
          n3 = n3.parentNode;
        return i3;
      }
      var Vr = function(t3, e3) {
        this.stopPropagation = Wt, this.stopImmediatePropagation = Wt, this.preventDefault = Wt, this.type = e3.type, this.target = this.currentTarget = t3.dom, this.pointerType = e3.pointerType, this.clientX = e3.clientX, this.clientY = e3.clientY;
      }, Fr = { mousedown: function(t3) {
        t3 = Pe(this.dom, t3), this.__mayPointerCapture = [t3.zrX, t3.zrY], this.trigger("mousedown", t3);
      }, mousemove: function(t3) {
        t3 = Pe(this.dom, t3);
        var e3 = this.__mayPointerCapture;
        !e3 || t3.zrX === e3[0] && t3.zrY === e3[1] || this.__togglePointerCapture(true), this.trigger("mousemove", t3);
      }, mouseup: function(t3) {
        t3 = Pe(this.dom, t3), this.__togglePointerCapture(false), this.trigger("mouseup", t3);
      }, mouseout: function(t3) {
        Er(this, (t3 = Pe(this.dom, t3)).toElement || t3.relatedTarget) || (this.__pointerCapturing && (t3.zrEventControl = "no_globalout"), this.trigger("mouseout", t3));
      }, wheel: function(t3) {
        Nr = true, t3 = Pe(this.dom, t3), this.trigger("mousewheel", t3);
      }, mousewheel: function(t3) {
        Nr || (t3 = Pe(this.dom, t3), this.trigger("mousewheel", t3));
      }, touchstart: function(t3) {
        Br(t3 = Pe(this.dom, t3)), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(t3, "start"), Fr.mousemove.call(this, t3), Fr.mousedown.call(this, t3);
      }, touchmove: function(t3) {
        Br(t3 = Pe(this.dom, t3)), this.handler.processGesture(t3, "change"), Fr.mousemove.call(this, t3);
      }, touchend: function(t3) {
        Br(t3 = Pe(this.dom, t3)), this.handler.processGesture(t3, "end"), Fr.mouseup.call(this, t3), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < 300 && Fr.click.call(this, t3);
      }, pointerdown: function(t3) {
        Fr.mousedown.call(this, t3);
      }, pointermove: function(t3) {
        zr(t3) || Fr.mousemove.call(this, t3);
      }, pointerup: function(t3) {
        Fr.mouseup.call(this, t3);
      }, pointerout: function(t3) {
        zr(t3) || Fr.mouseout.call(this, t3);
      } }, Gr = (F(["click", "dblclick", "contextmenu"], function(e3) {
        Fr[e3] = function(t3) {
          t3 = Pe(this.dom, t3), this.trigger(e3, t3);
        };
      }), { pointermove: function(t3) {
        zr(t3) || Gr.mousemove.call(this, t3);
      }, pointerup: function(t3) {
        Gr.mouseup.call(this, t3);
      }, mousemove: function(t3) {
        this.trigger("mousemove", t3);
      }, mouseup: function(t3) {
        var e3 = this.__pointerCapturing;
        this.__togglePointerCapture(false), this.trigger("mouseup", t3), e3 && (t3.zrEventControl = "only_globalout", this.trigger("mouseout", t3));
      } });
      function Hr(i3, r3) {
        var o3 = r3.domHandlers;
        b.pointerEventsSupported ? F(Pr.pointer, function(e3) {
          Ur(r3, e3, function(t3) {
            o3[e3].call(i3, t3);
          });
        }) : (b.touchEventsSupported && F(Pr.touch, function(n3) {
          Ur(r3, n3, function(t3) {
            var e3;
            o3[n3].call(i3, t3), (e3 = r3).touching = true, null != e3.touchTimer && (clearTimeout(e3.touchTimer), e3.touchTimer = null), e3.touchTimer = setTimeout(function() {
              e3.touching = false, e3.touchTimer = null;
            }, 700);
          });
        }), F(Pr.mouse, function(e3) {
          Ur(r3, e3, function(t3) {
            t3 = Le(t3), r3.touching || o3[e3].call(i3, t3);
          });
        }));
      }
      function Wr(i3, r3) {
        function t3(n3) {
          Ur(r3, n3, function(t4) {
            var e3;
            t4 = Le(t4), Er(i3, t4.target) || (e3 = t4, t4 = Pe(i3.dom, new Vr(i3, e3), true), r3.domHandlers[n3].call(i3, t4));
          }, { capture: true });
        }
        b.pointerEventsSupported ? F(Rr, t3) : b.touchEventsSupported || F(Or, t3);
      }
      function Ur(t3, e3, n3, i3) {
        t3.mounted[e3] = n3, t3.listenerOpts[e3] = i3, t3.domTarget.addEventListener(e3, n3, i3);
      }
      function Xr(t3) {
        var e3, n3, i3, r3, o3, a3 = t3.mounted;
        for (e3 in a3)
          a3.hasOwnProperty(e3) && (n3 = t3.domTarget, r3 = a3[i3 = e3], o3 = t3.listenerOpts[e3], n3.removeEventListener(i3, r3, o3));
        t3.mounted = {};
      }
      var Yr, qr = function(t3, e3) {
        this.mounted = {}, this.listenerOpts = {}, this.touching = false, this.domTarget = t3, this.domHandlers = e3;
      }, Zr = (u(jr, Yr = ge), jr.prototype.dispose = function() {
        Xr(this._localHandlerScope), Lr && Xr(this._globalHandlerScope);
      }, jr.prototype.setCursor = function(t3) {
        this.dom.style && (this.dom.style.cursor = t3 || "default");
      }, jr.prototype.__togglePointerCapture = function(t3) {
        var e3;
        this.__mayPointerCapture = null, Lr && +this.__pointerCapturing ^ +t3 && (this.__pointerCapturing = t3, e3 = this._globalHandlerScope, t3 ? Wr(this, e3) : Xr(e3));
      }, jr);
      function jr(t3, e3) {
        var n3 = Yr.call(this) || this;
        return n3.__pointerCapturing = false, n3.dom = t3, n3.painterRoot = e3, n3._localHandlerScope = new qr(t3, Fr), Lr && (n3._globalHandlerScope = new qr(document, Gr)), Hr(n3, n3._localHandlerScope), n3;
      }
      var e = 1, Kr = e = b.hasGlobalWindow ? Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1) : e, $r = "#333", Qr = "#ccc", Jr = Fe;
      function to(t3) {
        return 5e-5 < t3 || t3 < -5e-5;
      }
      var eo = [], no = [], io = Ve(), ro = Math.abs, oo = (ao.prototype.getLocalTransform = function(t3) {
        return so(this, t3);
      }, ao.prototype.setPosition = function(t3) {
        this.x = t3[0], this.y = t3[1];
      }, ao.prototype.setScale = function(t3) {
        this.scaleX = t3[0], this.scaleY = t3[1];
      }, ao.prototype.setSkew = function(t3) {
        this.skewX = t3[0], this.skewY = t3[1];
      }, ao.prototype.setOrigin = function(t3) {
        this.originX = t3[0], this.originY = t3[1];
      }, ao.prototype.needLocalTransform = function() {
        return to(this.rotation) || to(this.x) || to(this.y) || to(this.scaleX - 1) || to(this.scaleY - 1) || to(this.skewX) || to(this.skewY);
      }, ao.prototype.updateTransform = function() {
        var t3 = this.parent && this.parent.transform, e3 = this.needLocalTransform(), n3 = this.transform;
        e3 || t3 ? (n3 = n3 || Ve(), e3 ? this.getLocalTransform(n3) : Jr(n3), t3 && (e3 ? He(n3, t3, n3) : Ge(n3, t3)), this.transform = n3, this._resolveGlobalScaleRatio(n3), this.invTransform = this.invTransform || Ve(), Ye(this.invTransform, n3)) : n3 && (Jr(n3), this.invTransform = null);
      }, ao.prototype._resolveGlobalScaleRatio = function(t3) {
        var e3, n3, i3 = this.globalScaleRatio;
        null != i3 && 1 !== i3 && (this.getGlobalScale(eo), n3 = ((eo[1] - (n3 = eo[1] < 0 ? -1 : 1)) * i3 + n3) / eo[1] || 0, t3[0] *= i3 = ((eo[0] - (e3 = eo[0] < 0 ? -1 : 1)) * i3 + e3) / eo[0] || 0, t3[1] *= i3, t3[2] *= n3, t3[3] *= n3);
      }, ao.prototype.getComputedTransform = function() {
        for (var t3 = this, e3 = []; t3; )
          e3.push(t3), t3 = t3.parent;
        for (; t3 = e3.pop(); )
          t3.updateTransform();
        return this.transform;
      }, ao.prototype.setLocalTransform = function(t3) {
        var e3, n3, i3, r3;
        t3 && (r3 = t3[0] * t3[0] + t3[1] * t3[1], i3 = t3[2] * t3[2] + t3[3] * t3[3], e3 = Math.atan2(t3[1], t3[0]), n3 = Math.PI / 2 + e3 - Math.atan2(t3[3], t3[2]), i3 = Math.sqrt(i3) * Math.cos(n3), r3 = Math.sqrt(r3), this.skewX = n3, this.skewY = 0, this.rotation = -e3, this.x = +t3[4], this.y = +t3[5], this.scaleX = r3, this.scaleY = i3, this.originX = 0, this.originY = 0);
      }, ao.prototype.decomposeTransform = function() {
        var t3, e3, n3;
        this.transform && (e3 = this.parent, t3 = this.transform, e3 && e3.transform && (e3.invTransform = e3.invTransform || Ve(), He(no, e3.invTransform, t3), t3 = no), e3 = this.originX, n3 = this.originY, (e3 || n3) && (io[4] = e3, io[5] = n3, He(no, t3, io), no[4] -= e3, no[5] -= n3, t3 = no), this.setLocalTransform(t3));
      }, ao.prototype.getGlobalScale = function(t3) {
        var e3 = this.transform;
        return t3 = t3 || [], e3 ? (t3[0] = Math.sqrt(e3[0] * e3[0] + e3[1] * e3[1]), t3[1] = Math.sqrt(e3[2] * e3[2] + e3[3] * e3[3]), e3[0] < 0 && (t3[0] = -t3[0]), e3[3] < 0 && (t3[1] = -t3[1])) : (t3[0] = 1, t3[1] = 1), t3;
      }, ao.prototype.transformCoordToLocal = function(t3, e3) {
        t3 = [t3, e3], e3 = this.invTransform;
        return e3 && le(t3, t3, e3), t3;
      }, ao.prototype.transformCoordToGlobal = function(t3, e3) {
        t3 = [t3, e3], e3 = this.transform;
        return e3 && le(t3, t3, e3), t3;
      }, ao.prototype.getLineScale = function() {
        var t3 = this.transform;
        return t3 && 1e-10 < ro(t3[0] - 1) && 1e-10 < ro(t3[3] - 1) ? Math.sqrt(ro(t3[0] * t3[3] - t3[2] * t3[1])) : 1;
      }, ao.prototype.copyTransform = function(t3) {
        co(this, t3);
      }, ao.getLocalTransform = function(t3, e3) {
        e3 = e3 || [];
        var n3 = t3.originX || 0, i3 = t3.originY || 0, r3 = t3.scaleX, o3 = t3.scaleY, a3 = t3.anchorX, s3 = t3.anchorY, l3 = t3.rotation || 0, u3 = t3.x, h3 = t3.y, c3 = t3.skewX ? Math.tan(t3.skewX) : 0, t3 = t3.skewY ? Math.tan(-t3.skewY) : 0;
        return n3 || i3 || a3 || s3 ? (e3[4] = -(a3 = n3 + a3) * r3 - c3 * (s3 = i3 + s3) * o3, e3[5] = -s3 * o3 - t3 * a3 * r3) : e3[4] = e3[5] = 0, e3[0] = r3, e3[3] = o3, e3[1] = t3 * r3, e3[2] = c3 * o3, l3 && Ue(e3, e3, l3), e3[4] += n3 + u3, e3[5] += i3 + h3, e3;
      }, ao.initDefaultProps = ((e = ao.prototype).scaleX = e.scaleY = e.globalScaleRatio = 1, void (e.x = e.y = e.originX = e.originY = e.skewX = e.skewY = e.rotation = e.anchorX = e.anchorY = 0)), ao);
      function ao() {
      }
      var so = oo.getLocalTransform;
      function lo() {
        return new oo();
      }
      var uo, ho = ["x", "y", "originX", "originY", "anchorX", "anchorY", "rotation", "scaleX", "scaleY", "skewX", "skewY"];
      function co(t3, e3) {
        lt(t3, e3, ho);
      }
      function po(t3) {
        uo = uo || new Ti(100), t3 = t3 || K;
        var e3 = uo.get(t3);
        return e3 || (e3 = { font: t3, strWidthCache: new Ti(500), asciiWidthMap: null, asciiWidthMapTried: false, stWideCharWidth: $.measureText("\u56FD", t3).width, asciiCharWidth: $.measureText("a", t3).width }, uo.put(t3, e3)), e3;
      }
      var fo = 0;
      function go(t3, e3) {
        return t3.asciiWidthMapTried || (t3.asciiWidthMap = function(t4) {
          if (!(5 <= fo)) {
            t4 = t4 || K;
            for (var e4 = [], n3 = +/* @__PURE__ */ new Date(), i3 = 0; i3 <= 127; i3++)
              e4[i3] = $.measureText(String.fromCharCode(i3), t4).width;
            n3 = +/* @__PURE__ */ new Date() - n3;
            return 16 < n3 ? fo = 5 : 2 < n3 && fo++, e4;
          }
        }(t3.font), t3.asciiWidthMapTried = true), 0 <= e3 && e3 <= 127 ? null != t3.asciiWidthMap ? t3.asciiWidthMap[e3] : t3.asciiCharWidth : t3.stWideCharWidth;
      }
      function yo(t3, e3) {
        var n3 = t3.strWidthCache, i3 = n3.get(e3);
        return null == i3 && (i3 = $.measureText(e3, t3.font).width, n3.put(e3, i3)), i3;
      }
      function mo(t3, e3, n3, i3) {
        t3 = yo(po(e3), t3), e3 = xo(e3), n3 = vo(0, t3, n3), i3 = _o(0, e3, i3);
        return new Z(n3, i3, t3, e3);
      }
      function vo(t3, e3, n3, i3) {
        return "right" === n3 ? i3 ? t3 += e3 : t3 -= e3 : "center" === n3 && (i3 ? t3 += e3 / 2 : t3 -= e3 / 2), t3;
      }
      function _o(t3, e3, n3, i3) {
        return "middle" === n3 ? i3 ? t3 += e3 / 2 : t3 -= e3 / 2 : "bottom" === n3 && (i3 ? t3 += e3 : t3 -= e3), t3;
      }
      function xo(t3) {
        return po(t3).stWideCharWidth;
      }
      function bo(t3, e3) {
        return "string" == typeof t3 ? 0 <= t3.lastIndexOf("%") ? parseFloat(t3) / 100 * e3 : parseFloat(t3) : t3;
      }
      function wo(t3, e3, n3) {
        var i3 = e3.position || "inside", r3 = null != e3.distance ? e3.distance : 5, o3 = n3.height, a3 = n3.width, s3 = o3 / 2, l3 = n3.x, u3 = n3.y, h3 = "left", c3 = "top";
        if (i3 instanceof Array)
          l3 += bo(i3[0], n3.width), u3 += bo(i3[1], n3.height), c3 = h3 = null;
        else
          switch (i3) {
            case "left":
              l3 -= r3, u3 += s3, h3 = "right", c3 = "middle";
              break;
            case "right":
              l3 += r3 + a3, u3 += s3, c3 = "middle";
              break;
            case "top":
              l3 += a3 / 2, u3 -= r3, h3 = "center", c3 = "bottom";
              break;
            case "bottom":
              l3 += a3 / 2, u3 += o3 + r3, h3 = "center";
              break;
            case "inside":
              l3 += a3 / 2, u3 += s3, h3 = "center", c3 = "middle";
              break;
            case "insideLeft":
              l3 += r3, u3 += s3, c3 = "middle";
              break;
            case "insideRight":
              l3 += a3 - r3, u3 += s3, h3 = "right", c3 = "middle";
              break;
            case "insideTop":
              l3 += a3 / 2, u3 += r3, h3 = "center";
              break;
            case "insideBottom":
              l3 += a3 / 2, u3 += o3 - r3, h3 = "center", c3 = "bottom";
              break;
            case "insideTopLeft":
              l3 += r3, u3 += r3;
              break;
            case "insideTopRight":
              l3 += a3 - r3, u3 += r3, h3 = "right";
              break;
            case "insideBottomLeft":
              l3 += r3, u3 += o3 - r3, c3 = "bottom";
              break;
            case "insideBottomRight":
              l3 += a3 - r3, u3 += o3 - r3, h3 = "right", c3 = "bottom";
          }
        return (t3 = t3 || {}).x = l3, t3.y = u3, t3.align = h3, t3.verticalAlign = c3, t3;
      }
      var So, Mo = "__zr_normal__", To = ho.concat(["ignore"]), Io = dt(ho, function(t3, e3) {
        return t3[e3] = true, t3;
      }, { ignore: false }), Co = {}, ko = new Z(0, 0, 0, 0), Do = [], e = (n.prototype._init = function(t3) {
        this.attr(t3);
      }, n.prototype.drift = function(t3, e3, n3) {
        switch (this.draggable) {
          case "horizontal":
            e3 = 0;
            break;
          case "vertical":
            t3 = 0;
        }
        var i3 = this.transform;
        (i3 = i3 || (this.transform = [1, 0, 0, 1, 0, 0]))[4] += t3, i3[5] += e3, this.decomposeTransform(), this.markRedraw();
      }, n.prototype.beforeUpdate = function() {
      }, n.prototype.afterUpdate = function() {
      }, n.prototype.update = function() {
        this.updateTransform(), this.__dirty && this.updateInnerText();
      }, n.prototype.updateInnerText = function(t3) {
        var e3, n3, i3, r3, o3, a3, s3, l3, u3, h3, c3, p3 = this._textContent;
        !p3 || p3.ignore && !t3 || (this.textConfig || (this.textConfig = {}), u3 = (t3 = this.textConfig).local, a3 = o3 = void 0, n3 = false, (e3 = p3.innerTransformable).parent = u3 ? this : null, h3 = false, e3.copyTransform(p3), c3 = null != t3.position, r3 = void 0, ((i3 = t3.autoOverflowArea) || c3) && (r3 = ko, t3.layoutRect ? r3.copy(t3.layoutRect) : r3.copy(this.getBoundingRect()), u3 || r3.applyTransform(this.transform)), c3 && (this.calculateTextPosition ? this.calculateTextPosition(Co, t3, r3) : wo(Co, t3, r3), e3.x = Co.x, e3.y = Co.y, o3 = Co.align, a3 = Co.verticalAlign, c3 = t3.origin) && null != t3.rotation && (l3 = s3 = void 0, l3 = "center" === c3 ? (s3 = 0.5 * r3.width, 0.5 * r3.height) : (s3 = bo(c3[0], r3.width), bo(c3[1], r3.height)), h3 = true, e3.originX = -e3.x + s3 + (u3 ? 0 : r3.x), e3.originY = -e3.y + l3 + (u3 ? 0 : r3.y)), null != t3.rotation && (e3.rotation = t3.rotation), (c3 = t3.offset) && (e3.x += c3[0], e3.y += c3[1], h3 || (e3.originX = -c3[0], e3.originY = -c3[1])), s3 = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), i3 ? (l3 = s3.overflowRect = s3.overflowRect || new Z(0, 0, 0, 0), e3.getLocalTransform(Do), Ye(Do, Do), Z.copy(l3, r3), l3.applyTransform(Do)) : s3.overflowRect = null, c3 = h3 = u3 = void 0, (null == t3.inside ? "string" == typeof t3.position && 0 <= t3.position.indexOf("inside") : t3.inside) && this.canBeInsideText() ? (u3 = t3.insideFill, h3 = t3.insideStroke, null != u3 && "auto" !== u3 || (u3 = this.getInsideTextFill()), null != h3 && "auto" !== h3 || (h3 = this.getInsideTextStroke(u3), c3 = true)) : (u3 = t3.outsideFill, h3 = t3.outsideStroke, null != u3 && "auto" !== u3 || (u3 = this.getOutsideFill()), null != h3 && "auto" !== h3 || (h3 = this.getOutsideStroke(u3), c3 = true)), (u3 = u3 || "#000") === s3.fill && h3 === s3.stroke && c3 === s3.autoStroke && o3 === s3.align && a3 === s3.verticalAlign || (n3 = true, s3.fill = u3, s3.stroke = h3, s3.autoStroke = c3, s3.align = o3, s3.verticalAlign = a3, p3.setDefaultTextStyle(s3)), p3.__dirty |= Hn, n3 && p3.dirtyStyle(true));
      }, n.prototype.canBeInsideText = function() {
        return true;
      }, n.prototype.getInsideTextFill = function() {
        return "#fff";
      }, n.prototype.getInsideTextStroke = function(t3) {
        return "#000";
      }, n.prototype.getOutsideFill = function() {
        return this.__zr && this.__zr.isDarkMode() ? Qr : $r;
      }, n.prototype.getOutsideStroke = function(t3) {
        for (var e3 = this.__zr && this.__zr.getBackgroundColor(), n3 = "string" == typeof e3 && Vi(e3), i3 = (n3 = n3 || [255, 255, 255, 1])[3], r3 = this.__zr.isDarkMode(), o3 = 0; o3 < 3; o3++)
          n3[o3] = n3[o3] * i3 + (r3 ? 0 : 255) * (1 - i3);
        return n3[3] = 1, qi(n3, "rgba");
      }, n.prototype.traverse = function(t3, e3) {
      }, n.prototype.attrKV = function(t3, e3) {
        "textConfig" === t3 ? this.setTextConfig(e3) : "textContent" === t3 ? this.setTextContent(e3) : "clipPath" === t3 ? this.setClipPath(e3) : "extra" === t3 ? (this.extra = this.extra || {}, V(this.extra, e3)) : this[t3] = e3;
      }, n.prototype.hide = function() {
        this.ignore = true, this.markRedraw();
      }, n.prototype.show = function() {
        this.ignore = false, this.markRedraw();
      }, n.prototype.attr = function(t3, e3) {
        if ("string" == typeof t3)
          this.attrKV(t3, e3);
        else if (X(t3))
          for (var n3 = O(t3), i3 = 0; i3 < n3.length; i3++) {
            var r3 = n3[i3];
            this.attrKV(r3, t3[r3]);
          }
        return this.markRedraw(), this;
      }, n.prototype.saveCurrentToNormalState = function(t3) {
        this._innerSaveToNormal(t3);
        for (var e3 = this._normalState, n3 = 0; n3 < this.animators.length; n3++) {
          var i3 = this.animators[n3], r3 = i3.__fromStateTransition;
          i3.getLoop() || r3 && r3 !== Mo || (r3 = (r3 = i3.targetName) ? e3[r3] : e3, i3.saveTo(r3));
        }
      }, n.prototype._innerSaveToNormal = function(t3) {
        var e3 = (e3 = this._normalState) || (this._normalState = {});
        t3.textConfig && !e3.textConfig && (e3.textConfig = this.textConfig), this._savePrimaryToNormal(t3, e3, To);
      }, n.prototype._savePrimaryToNormal = function(t3, e3, n3) {
        for (var i3 = 0; i3 < n3.length; i3++) {
          var r3 = n3[i3];
          null == t3[r3] || r3 in e3 || (e3[r3] = this[r3]);
        }
      }, n.prototype.hasState = function() {
        return 0 < this.currentStates.length;
      }, n.prototype.getState = function(t3) {
        return this.states[t3];
      }, n.prototype.ensureState = function(t3) {
        var e3 = this.states;
        return e3[t3] || (e3[t3] = {}), e3[t3];
      }, n.prototype.clearStates = function(t3) {
        this.useState(Mo, false, t3);
      }, n.prototype.useState = function(t3, e3, n3, i3) {
        var r3 = t3 === Mo, o3 = this.hasState();
        if (o3 || !r3) {
          var a3, o3 = this.currentStates, s3 = this.stateTransition;
          if (!(0 <= L(o3, t3)) || !e3 && 1 !== o3.length) {
            if ((a3 = (a3 = this.stateProxy && !r3 ? this.stateProxy(t3) : a3) || this.states && this.states[t3]) || r3)
              return r3 || this.saveCurrentToNormalState(a3), (i3 = No(this, o3 = this._textContent, a3, i3)) && !this.__inHover && (this.__inHover = i3), this._applyStateObj(t3, a3, this._normalState, e3, Bo(this, n3, s3), s3), s3 = this._textGuide, o3 && o3.useState(t3, e3, n3, !!i3), s3 && s3.useState(t3, e3, n3, !!i3), r3 ? (this.currentStates = [], this._normalState = {}) : e3 ? this.currentStates.push(t3) : this.currentStates = [t3], this._updateAnimationTargets(), this.markRedraw(), !i3 && this.__inHover && (this.__inHover = 0, this.__dirty &= ~Hn), a3;
            st("State " + t3 + " not exists.");
          }
        }
      }, n.prototype.useStates = function(t3, e3, n3) {
        if (t3.length) {
          var i3 = [], r3 = this.currentStates, o3 = t3.length, a3 = o3 === r3.length;
          if (a3) {
            for (var s3 = 0; s3 < o3; s3++)
              if (t3[s3] !== r3[s3]) {
                a3 = false;
                break;
              }
          }
          if (!a3) {
            for (s3 = 0; s3 < o3; s3++) {
              var l3 = t3[s3], u3 = void 0;
              (u3 = (u3 = this.stateProxy ? this.stateProxy(l3, t3) : u3) || this.states[l3]) && i3.push(u3);
            }
            var h3 = this._textContent, n3 = No(this, h3, i3[o3 - 1], n3), c3 = (n3 && !this.__inHover && (this.__inHover = n3), this._mergeStates(i3)), p3 = this.stateTransition, c3 = (this.saveCurrentToNormalState(c3), this._applyStateObj(t3.join(","), c3, this._normalState, false, Bo(this, e3, p3), p3), this._textGuide);
            h3 && h3.useStates(t3, e3, !!n3), c3 && c3.useStates(t3, e3, !!n3), this._updateAnimationTargets(), this.currentStates = t3.slice(), this.markRedraw(), !n3 && this.__inHover && (this.__inHover = 0, this.__dirty &= ~Hn);
          }
        } else
          this.clearStates();
      }, n.prototype.isSilent = function() {
        for (var t3 = this; t3; ) {
          if (t3.silent)
            return true;
          var e3 = t3.__hostTarget, t3 = e3 ? t3.ignoreHostSilent ? null : e3 : t3.parent;
        }
        return false;
      }, n.prototype._updateAnimationTargets = function() {
        for (var t3 = 0; t3 < this.animators.length; t3++) {
          var e3 = this.animators[t3];
          e3.targetName && e3.changeTarget(this[e3.targetName]);
        }
      }, n.prototype.removeState = function(t3) {
        var e3, t3 = L(this.currentStates, t3);
        0 <= t3 && ((e3 = this.currentStates.slice()).splice(t3, 1), this.useStates(e3));
      }, n.prototype.replaceState = function(t3, e3, n3) {
        var i3 = this.currentStates.slice(), t3 = L(i3, t3), r3 = 0 <= L(i3, e3);
        0 <= t3 ? r3 ? i3.splice(t3, 1) : i3[t3] = e3 : n3 && !r3 && i3.push(e3), this.useStates(i3);
      }, n.prototype.toggleState = function(t3, e3) {
        e3 ? this.useState(t3, true) : this.removeState(t3);
      }, n.prototype._mergeStates = function(t3) {
        for (var e3, n3 = {}, i3 = 0; i3 < t3.length; i3++) {
          var r3 = t3[i3];
          V(n3, r3), r3.textConfig && V(e3 = e3 || {}, r3.textConfig);
        }
        return e3 && (n3.textConfig = e3), n3;
      }, n.prototype._applyStateObj = function(t3, e3, n3, i3, r3, o3) {
        if (1 !== this.__inHover) {
          for (var a3 = !(e3 && i3), s3 = (e3 && e3.textConfig ? (this.textConfig = V({}, (i3 ? this : n3).textConfig), V(this.textConfig, e3.textConfig)) : a3 && n3.textConfig && (this.textConfig = n3.textConfig), {}), l3 = false, u3 = 0; u3 < To.length; u3++) {
            var h3 = To[u3], c3 = r3 && Io[h3];
            e3 && null != e3[h3] ? c3 ? (l3 = true, s3[h3] = e3[h3]) : this[h3] = e3[h3] : a3 && null != n3[h3] && (c3 ? (l3 = true, s3[h3] = n3[h3]) : this[h3] = n3[h3]);
          }
          if (!r3)
            for (u3 = 0; u3 < this.animators.length; u3++) {
              var p3 = this.animators[u3], d3 = p3.targetName;
              p3.getLoop() || p3.__changeFinalValue(d3 ? (e3 || n3)[d3] : e3 || n3);
            }
          l3 && this._transitionState(t3, s3, o3);
        }
      }, n.prototype._attachComponent = function(t3) {
        var e3;
        t3.__zr && !t3.__hostTarget || t3 !== this && ((e3 = this.__zr) && t3.addSelfToZr(e3), t3.__zr = e3, t3.__hostTarget = this);
      }, n.prototype._detachComponent = function(t3) {
        t3.__zr && t3.removeSelfFromZr(t3.__zr), t3.__zr = null, t3.__hostTarget = null;
      }, n.prototype.getClipPath = function() {
        return this._clipPath;
      }, n.prototype.setClipPath = function(t3) {
        this._clipPath && this._clipPath !== t3 && this.removeClipPath(), this._attachComponent(t3), this._clipPath = t3, this.markRedraw();
      }, n.prototype.removeClipPath = function() {
        var t3 = this._clipPath;
        t3 && (this._detachComponent(t3), this._clipPath = null, this.markRedraw());
      }, n.prototype.getTextContent = function() {
        return this._textContent;
      }, n.prototype.setTextContent = function(t3) {
        var e3 = this._textContent;
        e3 !== t3 && (e3 && e3 !== t3 && this.removeTextContent(), t3.innerTransformable = new oo(), this._attachComponent(t3), this._textContent = t3, this.markRedraw());
      }, n.prototype.setTextConfig = function(t3) {
        this.textConfig || (this.textConfig = {}), V(this.textConfig, t3), this.markRedraw();
      }, n.prototype.removeTextConfig = function() {
        this.textConfig = null, this.markRedraw();
      }, n.prototype.removeTextContent = function() {
        var t3 = this._textContent;
        t3 && (t3.innerTransformable = null, this._detachComponent(t3), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw());
      }, n.prototype.getTextGuideLine = function() {
        return this._textGuide;
      }, n.prototype.setTextGuideLine = function(t3) {
        this._textGuide && this._textGuide !== t3 && this.removeTextGuideLine(), this._attachComponent(t3), this._textGuide = t3, this.markRedraw();
      }, n.prototype.removeTextGuideLine = function() {
        var t3 = this._textGuide;
        t3 && (this._detachComponent(t3), this._textGuide = null, this.markRedraw());
      }, n.prototype.markRedraw = function() {
        this.__dirty |= Hn;
        var t3 = this.__zr;
        t3 && (this.__inHover ? t3.refreshHover() : t3.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
      }, n.prototype.dirty = function() {
        this.markRedraw();
      }, n.prototype.addSelfToZr = function(t3) {
        if (this.__zr !== t3) {
          this.__zr = t3;
          var e3 = this.animators;
          if (e3)
            for (var n3 = 0; n3 < e3.length; n3++)
              t3.animation.addAnimator(e3[n3]);
          this._clipPath && this._clipPath.addSelfToZr(t3), this._textContent && this._textContent.addSelfToZr(t3), this._textGuide && this._textGuide.addSelfToZr(t3);
        }
      }, n.prototype.removeSelfFromZr = function(t3) {
        if (this.__zr) {
          this.__zr = null;
          var e3 = this.animators;
          if (e3)
            for (var n3 = 0; n3 < e3.length; n3++)
              t3.animation.removeAnimator(e3[n3]);
          this._clipPath && this._clipPath.removeSelfFromZr(t3), this._textContent && this._textContent.removeSelfFromZr(t3), this._textGuide && this._textGuide.removeSelfFromZr(t3);
        }
      }, n.prototype.animate = function(t3, e3, n3) {
        var i3 = t3 ? this[t3] : this, i3 = new Mr(i3, e3, n3);
        return t3 && (i3.targetName = t3), this.addAnimator(i3, t3), i3;
      }, n.prototype.addAnimator = function(n3, t3) {
        var e3 = this.__zr, i3 = this;
        n3.during(function() {
          i3.updateDuringAnimation(t3);
        }).done(function() {
          var t4 = i3.animators, e4 = L(t4, n3);
          0 <= e4 && t4.splice(e4, 1);
        }), this.animators.push(n3), e3 && e3.animation.addAnimator(n3), e3 && e3.wakeUp();
      }, n.prototype.updateDuringAnimation = function(t3) {
        this.markRedraw();
      }, n.prototype.stopAnimation = function(t3, e3) {
        for (var n3 = this.animators, i3 = n3.length, r3 = [], o3 = 0; o3 < i3; o3++) {
          var a3 = n3[o3];
          t3 && t3 !== a3.scope ? r3.push(a3) : a3.stop(e3);
        }
        return this.animators = r3, this;
      }, n.prototype.animateTo = function(t3, e3, n3) {
        Lo(this, t3, e3, n3);
      }, n.prototype.animateFrom = function(t3, e3, n3) {
        Lo(this, t3, e3, n3, true);
      }, n.prototype._transitionState = function(t3, e3, n3, i3) {
        for (var r3 = Lo(this, e3, n3, i3), o3 = 0; o3 < r3.length; o3++)
          r3[o3].__fromStateTransition = t3;
      }, n.prototype.getBoundingRect = function() {
        return null;
      }, n.prototype.getPaintRect = function() {
        return null;
      }, n.initDefaultProps = ((So = n.prototype).type = "element", So.name = "", So.ignore = So.silent = So.ignoreHostSilent = So.isGroup = So.draggable = So.dragging = So.ignoreClip = false, So.__inHover = 0, So.__dirty = Hn, void (Object.defineProperty && (Ao("position", "_legacyPos", "x", "y"), Ao("scale", "_legacyScale", "scaleX", "scaleY"), Ao("origin", "_legacyOrigin", "originX", "originY")))), n);
      function n(t3) {
        this.id = at(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t3);
      }
      function Ao(t3, e3, n3, i3) {
        function r3(e4, t4) {
          Object.defineProperty(t4, 0, { get: function() {
            return e4[n3];
          }, set: function(t5) {
            e4[n3] = t5;
          } }), Object.defineProperty(t4, 1, { get: function() {
            return e4[i3];
          }, set: function(t5) {
            e4[i3] = t5;
          } });
        }
        Object.defineProperty(So, t3, { get: function() {
          var t4;
          return this[e3] || (t4 = this[e3] = [], r3(this, t4)), this[e3];
        }, set: function(t4) {
          this[n3] = t4[0], this[i3] = t4[1], this[e3] = t4, r3(this, t4);
        } });
      }
      function Lo(t3, e3, n3, i3, r3) {
        function o3() {
          u3 = true, --l3 <= 0 && (u3 ? h3 && h3() : c3 && c3());
        }
        function a3() {
          --l3 <= 0 && (u3 ? h3 && h3() : c3 && c3());
        }
        var s3 = [], l3 = (!function t4(e4, n4, i4, r4, o4, a4, s4, l4) {
          var u4 = O(r4);
          var h4 = o4.duration;
          var c4 = o4.delay;
          var p4 = o4.additive;
          var d4 = o4.setToFinal;
          var f3 = !X(a4);
          var g3 = e4.animators;
          var y3 = [];
          for (var m3 = 0; m3 < u4.length; m3++) {
            var v3 = u4[m3], _3 = r4[v3];
            null != _3 && null != i4[v3] && (f3 || a4[v3]) ? !X(_3) || pt(_3) || bt(_3) ? y3.push(v3) : n4 ? l4 || (i4[v3] = _3, e4.updateDuringAnimation(n4)) : t4(e4, v3, i4[v3], _3, o4, a4 && a4[v3], s4, l4) : l4 || (i4[v3] = _3, e4.updateDuringAnimation(n4), y3.push(v3));
          }
          var x3 = y3.length;
          if (!p4 && x3)
            for (var b3, w3 = 0; w3 < g3.length; w3++)
              (S3 = g3[w3]).targetName === n4 && S3.stopTracks(y3) && (b3 = L(g3, S3), g3.splice(b3, 1));
          o4.force || (y3 = ft(y3, function(t5) {
            return !Ro(r4[t5], i4[t5]);
          }), x3 = y3.length);
          if (0 < x3 || o4.force && !s4.length) {
            var S3, M3 = void 0, T3 = void 0, I3 = void 0;
            if (l4) {
              T3 = {}, d4 && (M3 = {});
              for (w3 = 0; w3 < x3; w3++) {
                v3 = y3[w3];
                T3[v3] = i4[v3], d4 ? M3[v3] = r4[v3] : i4[v3] = r4[v3];
              }
            } else if (d4) {
              I3 = {};
              for (w3 = 0; w3 < x3; w3++) {
                v3 = y3[w3];
                I3[v3] = mr(i4[v3]), Oo(i4, r4, v3);
              }
            }
            (S3 = new Mr(i4, false, false, p4 ? ft(g3, function(t5) {
              return t5.targetName === n4;
            }) : null)).targetName = n4, o4.scope && (S3.scope = o4.scope), d4 && M3 && S3.whenWithKeys(0, M3, y3), I3 && S3.whenWithKeys(0, I3, y3), S3.whenWithKeys(null == h4 ? 500 : h4, l4 ? T3 : r4, y3).delay(c4 || 0), e4.addAnimator(S3, n4), s4.push(S3);
          }
        }(t3, "", t3, e3, n3 = n3 || {}, i3, s3, r3), s3.length), u3 = false, h3 = n3.done, c3 = n3.aborted;
        l3 || h3 && h3(), 0 < s3.length && n3.during && s3[0].during(function(t4, e4) {
          n3.during(e4);
        });
        for (var p3 = 0; p3 < s3.length; p3++) {
          var d3 = s3[p3];
          d3.done(o3), d3.aborted(a3), n3.force && d3.duration(n3.duration), d3.start(n3.easing);
        }
        return s3;
      }
      function Po(t3, e3, n3) {
        for (var i3 = 0; i3 < n3; i3++)
          t3[i3] = e3[i3];
      }
      function Oo(t3, e3, n3) {
        if (pt(e3[n3]))
          if (pt(t3[n3]) || (t3[n3] = []), _t(e3[n3])) {
            var i3 = e3[n3].length;
            t3[n3].length !== i3 && (t3[n3] = new e3[n3].constructor(i3), Po(t3[n3], e3[n3], i3));
          } else {
            var r3 = e3[n3], o3 = t3[n3], a3 = r3.length;
            if (pt(r3[0]))
              for (var s3 = r3[0].length, l3 = 0; l3 < a3; l3++)
                o3[l3] ? Po(o3[l3], r3[l3], s3) : o3[l3] = Array.prototype.slice.call(r3[l3]);
            else
              Po(o3, r3, a3);
            o3.length = r3.length;
          }
        else
          t3[n3] = e3[n3];
      }
      function Ro(t3, e3) {
        return t3 === e3 || pt(t3) && pt(e3) && function(t4, e4) {
          var n3 = t4.length;
          if (n3 !== e4.length)
            return false;
          for (var i3 = 0; i3 < n3; i3++)
            if (t4[i3] !== e4[i3])
              return false;
          return true;
        }(t3, e3);
      }
      function No(t3, e3, n3, i3) {
        return !(n3 && n3.hoverLayer || i3) || zo(t3) || e3 && zo(e3) ? 0 : 1;
      }
      function zo(t3) {
        return "text" === t3.type || "tspan" === t3.type;
      }
      function Bo(t3, e3, n3) {
        return !e3 && !t3.__inHover && n3 && 0 < n3.duration;
      }
      ct(e, ge), ct(e, oo);
      u(Fo, Eo = e), Fo.prototype.childrenRef = function() {
        return this._children;
      }, Fo.prototype.children = function() {
        return this._children.slice();
      }, Fo.prototype.childAt = function(t3) {
        return this._children[t3];
      }, Fo.prototype.childOfName = function(t3) {
        for (var e3 = this._children, n3 = 0; n3 < e3.length; n3++)
          if (e3[n3].name === t3)
            return e3[n3];
      }, Fo.prototype.childCount = function() {
        return this._children.length;
      }, Fo.prototype.add = function(t3) {
        return t3 && t3 !== this && t3.parent !== this && (this._children.push(t3), this._doAdd(t3)), this;
      }, Fo.prototype.addBefore = function(t3, e3) {
        var n3;
        return t3 && t3 !== this && t3.parent !== this && e3 && e3.parent === this && 0 <= (e3 = (n3 = this._children).indexOf(e3)) && (n3.splice(e3, 0, t3), this._doAdd(t3)), this;
      }, Fo.prototype.replace = function(t3, e3) {
        t3 = L(this._children, t3);
        return 0 <= t3 && this.replaceAt(e3, t3), this;
      }, Fo.prototype.replaceAt = function(t3, e3) {
        var n3 = this._children, i3 = n3[e3];
        return t3 && t3 !== this && t3.parent !== this && t3 !== i3 && (n3[e3] = t3, i3.parent = null, (n3 = this.__zr) && i3.removeSelfFromZr(n3), this._doAdd(t3)), this;
      }, Fo.prototype._doAdd = function(t3) {
        t3.parent && t3.parent.remove(t3);
        var e3 = (t3.parent = this).__zr;
        e3 && e3 !== t3.__zr && t3.addSelfToZr(e3), e3 && e3.refresh();
      }, Fo.prototype.remove = function(t3) {
        var e3 = this.__zr, n3 = this._children, i3 = L(n3, t3);
        return i3 < 0 || (n3.splice(i3, 1), t3.parent = null, e3 && t3.removeSelfFromZr(e3), e3 && e3.refresh()), this;
      }, Fo.prototype.removeAll = function() {
        for (var t3 = this._children, e3 = this.__zr, n3 = 0; n3 < t3.length; n3++) {
          var i3 = t3[n3];
          e3 && i3.removeSelfFromZr(e3), i3.parent = null;
        }
        return t3.length = 0, this;
      }, Fo.prototype.eachChild = function(t3, e3) {
        for (var n3 = this._children, i3 = 0; i3 < n3.length; i3++) {
          var r3 = n3[i3];
          t3.call(e3, r3, i3);
        }
        return this;
      }, Fo.prototype.traverse = function(t3, e3) {
        for (var n3 = 0; n3 < this._children.length; n3++) {
          var i3 = this._children[n3], r3 = t3.call(e3, i3);
          i3.isGroup && !r3 && i3.traverse(t3, e3);
        }
        return this;
      }, Fo.prototype.addSelfToZr = function(t3) {
        Eo.prototype.addSelfToZr.call(this, t3);
        for (var e3 = 0; e3 < this._children.length; e3++)
          this._children[e3].addSelfToZr(t3);
      }, Fo.prototype.removeSelfFromZr = function(t3) {
        Eo.prototype.removeSelfFromZr.call(this, t3);
        for (var e3 = 0; e3 < this._children.length; e3++)
          this._children[e3].removeSelfFromZr(t3);
      }, Fo.prototype.getBoundingRect = function(t3) {
        for (var e3 = new Z(0, 0, 0, 0), n3 = t3 || this._children, i3 = [], r3 = null, o3 = 0; o3 < n3.length; o3++) {
          var a3, s3 = n3[o3];
          s3.ignore || s3.invisible || (a3 = s3.getBoundingRect(), (s3 = s3.getLocalTransform(i3)) ? (Z.applyTransform(e3, a3, s3), (r3 = r3 || e3.clone()).union(e3)) : (r3 = r3 || a3.clone()).union(a3));
        }
        return r3 || e3;
      };
      var Eo, Vo = Fo;
      function Fo(t3) {
        var e3 = Eo.call(this) || this;
        return e3.isGroup = true, e3._children = [], e3.attr(t3), e3;
      }
      Vo.prototype.type = "group";
      var Go = {}, Ho = {};
      Xo.prototype.add = function(t3) {
        !this._disposed && t3 && (this.storage.addRoot(t3), t3.addSelfToZr(this), this.refresh());
      }, Xo.prototype.remove = function(t3) {
        !this._disposed && t3 && (this.storage.delRoot(t3), t3.removeSelfFromZr(this), this.refresh());
      }, Xo.prototype.configLayer = function(t3, e3) {
        this._disposed || (this.painter.configLayer && this.painter.configLayer(t3, e3), this.refresh());
      }, Xo.prototype.setBackgroundColor = function(t3) {
        this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t3), this.refresh(), this._backgroundColor = t3, this._darkMode = function(t4) {
          if (t4) {
            if ("string" == typeof t4)
              return Zi(t4, 1) < 0.4;
            if (t4.colorStops) {
              for (var e3 = t4.colorStops, n3 = 0, i3 = e3.length, r3 = 0; r3 < i3; r3++)
                n3 += Zi(e3[r3].color, 1);
              return (n3 /= i3) < 0.4;
            }
          }
          return false;
        }(t3));
      }, Xo.prototype.getBackgroundColor = function() {
        return this._backgroundColor;
      }, Xo.prototype.setDarkMode = function(t3) {
        this._darkMode = t3;
      }, Xo.prototype.isDarkMode = function() {
        return this._darkMode;
      }, Xo.prototype.refreshImmediately = function(t3) {
        this._disposed || this._refresh({ animUpdate: !t3, refresh: true, refreshHover: false });
      }, Xo.prototype._refresh = function(t3) {
        t3.animUpdate && this.animation.update(true), this._needsRefresh = this._needsRefreshHover = false, this.painter.refresh({ refresh: t3.refresh, refreshHover: t3.refreshHover }), this._needsRefresh = this._needsRefreshHover = false;
      }, Xo.prototype.refresh = function() {
        this._disposed || (this._needsRefresh = true, this.animation.start());
      }, Xo.prototype.flush = function() {
        this._disposed || this._flush(true);
      }, Xo.prototype._flush = function(t3) {
        var e3, n3 = Ir(), i3 = this._needsRefresh, r3 = this._needsRefreshHover, t3 = ((i3 || r3) && (e3 = true, this._refresh({ animUpdate: t3, refresh: i3, refreshHover: r3 })), Ir());
        e3 ? (this._stillFrameAccum = 0, this.trigger("rendered", { elapsedTime: t3 - n3 })) : 0 < this._sleepAfterStill && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill) && this.animation.stop();
      }, Xo.prototype.setSleepAfterStill = function(t3) {
        this._sleepAfterStill = t3;
      }, Xo.prototype.wakeUp = function() {
        this._disposed || (this.animation.start(), this._stillFrameAccum = 0);
      }, Xo.prototype.refreshHover = function() {
        this._needsRefreshHover = true;
      }, Xo.prototype.refreshHoverImmediately = function() {
        this._disposed || this._refresh({ animUpdate: false, refresh: false, refreshHover: true });
      }, Xo.prototype.resize = function(t3) {
        this._disposed || (this.painter.resize((t3 = t3 || {}).width, t3.height), this.handler.resize());
      }, Xo.prototype.clearAnimation = function() {
        this._disposed || this.animation.clear();
      }, Xo.prototype.getWidth = function() {
        if (!this._disposed)
          return this.painter.getWidth();
      }, Xo.prototype.getHeight = function() {
        if (!this._disposed)
          return this.painter.getHeight();
      }, Xo.prototype.setCursorStyle = function(t3) {
        this._disposed || this.handler.setCursorStyle(t3);
      }, Xo.prototype.findHover = function(t3, e3) {
        if (!this._disposed)
          return this.handler.findHover(t3, e3);
      }, Xo.prototype.on = function(t3, e3, n3) {
        return this._disposed || this.handler.on(t3, e3, n3), this;
      }, Xo.prototype.off = function(t3, e3) {
        this._disposed || this.handler.off(t3, e3);
      }, Xo.prototype.trigger = function(t3, e3) {
        this._disposed || this.handler.trigger(t3, e3);
      }, Xo.prototype.clear = function() {
        if (!this._disposed) {
          for (var t3 = this.storage.getRoots(), e3 = 0; e3 < t3.length; e3++)
            t3[e3] instanceof Vo && t3[e3].removeSelfFromZr(this);
          this.storage.delAllRoots(), this.painter.clear();
        }
      }, Xo.prototype.dispose = function() {
        var t3;
        this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = true, t3 = this.id, delete Ho[t3]);
      };
      var Wo, Uo = Xo;
      function Xo(t3, e3, n3) {
        var i3, r3 = this, o3 = (this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = true, this._needsRefreshHover = false, this._darkMode = false, n3 = n3 || {}, this.dom = e3, this.id = t3, new qn()), a3 = n3.renderer || "canvas", a3 = (Go[a3] || (a3 = O(Go)[0]), n3.useDirtyRect = null != n3.useDirtyRect && n3.useDirtyRect, new Go[a3](e3, o3, n3, t3)), e3 = n3.ssr || a3.ssrOnly, t3 = (this.storage = o3, this.painter = a3, b.node || b.worker || e3 ? null : new Zr(a3.getViewportRoot(), a3.root)), s3 = n3.useCoarsePointer;
        (null == s3 || "auto" === s3 ? b.touchEventsSupported : !!s3) && (i3 = Y(n3.pointerSize, 44)), this.handler = new An(o3, a3, t3, a3.root, i3), this.animation = new kr({ stage: { update: e3 ? null : function() {
          return r3._flush(false);
        } } }), e3 || this.animation.start();
      }
      function Yo(t3, e3) {
        t3 = new Uo(at(), t3, e3);
        return Ho[t3.id] = t3;
      }
      function qo(t3, e3) {
        Go[t3] = e3;
      }
      function Zo(t3) {
        if ("function" == typeof Wo)
          return Wo(t3);
      }
      function jo(t3) {
        Wo = t3;
      }
      var Ko = Object.freeze({ __proto__: null, dispose: function(t3) {
        t3.dispose();
      }, disposeAll: function() {
        for (var t3 in Ho)
          Ho.hasOwnProperty(t3) && Ho[t3].dispose();
        Ho = {};
      }, getElementSSRData: Zo, getInstance: function(t3) {
        return Ho[t3];
      }, init: Yo, registerPainter: qo, registerSSRDataGetter: jo, version: "6.1.0" }), $o = 20;
      var Qo = Math.min, Jo = Math.max, ta = Math.abs, ea = Math.round, na = Math.floor, ia = Math.ceil, ra = Math.pow, oa = Math.log, aa = Math.LN10, sa = Math.PI, la = Math.random;
      function ua(t3, e3, n3, i3) {
        var r3 = e3[0], e3 = e3[1], o3 = n3[0], n3 = n3[1], a3 = e3 - r3, s3 = n3 - o3;
        if (0 == a3)
          return 0 == s3 ? o3 : (o3 + n3) / 2;
        if (i3)
          if (0 < a3) {
            if (t3 <= r3)
              return o3;
            if (e3 <= t3)
              return n3;
          } else {
            if (r3 <= t3)
              return o3;
            if (t3 <= e3)
              return n3;
          }
        else {
          if (t3 === r3)
            return o3;
          if (t3 === e3)
            return n3;
        }
        return (t3 - r3) / a3 * s3 + o3;
      }
      var ha = function(t3, e3, n3) {
        switch (t3) {
          case "center":
          case "middle":
            t3 = "50%";
            break;
          case "left":
          case "top":
            t3 = "0%";
            break;
          case "right":
          case "bottom":
            t3 = "100%";
        }
        return ca(t3, e3, n3);
      };
      function ca(t3, e3, n3) {
        return W(t3) ? t3.replace(/^\s+|\s+$/g, "").match(/%$/) ? parseFloat(t3) / 100 * e3 + (n3 || 0) : parseFloat(t3) : null == t3 ? NaN : +t3;
      }
      function C(t3, e3, n3) {
        return isNaN(e3) ? n3 ? "" + t3 : +t3 : (e3 = Qo(Jo(0, e3), $o), t3 = (+t3).toFixed(e3), n3 ? t3 : +t3);
      }
      function pa(t3) {
        return t3.sort(function(t4, e3) {
          return t4 - e3;
        }), t3;
      }
      function da(t3) {
        if (t3 = +t3, isNaN(t3))
          return 0;
        if (1e-14 < t3) {
          for (var e3 = 1, n3 = 0; n3 < 15; n3++, e3 *= 10)
            if (ea(t3 * e3) / e3 === t3)
              return n3;
        }
        return fa(t3);
      }
      function fa(t3) {
        var t3 = t3.toString().toLowerCase(), e3 = t3.indexOf("e"), n3 = 0 < e3 ? +t3.slice(e3 + 1) : 0, e3 = 0 < e3 ? e3 : t3.length, t3 = t3.indexOf(".");
        return Jo(0, (t3 < 0 ? 0 : e3 - 1 - t3) - n3);
      }
      function ga(t3, e3) {
        var n3 = dt(t3, function(t4, e4) {
          return t4 + (isNaN(e4) ? 0 : e4);
        }, 0);
        if (0 === n3)
          return [];
        for (var i3 = ra(10, e3), e3 = E(t3, function(t4) {
          return (isNaN(t4) ? 0 : t4) / n3 * i3 * 100;
        }), r3 = 100 * i3, o3 = E(e3, function(t4) {
          return na(t4);
        }), a3 = dt(o3, function(t4, e4) {
          return t4 + e4;
        }, 0), s3 = E(e3, function(t4, e4) {
          return t4 - o3[e4];
        }); a3 < r3; ) {
          for (var l3 = Number.NEGATIVE_INFINITY, u3 = null, h3 = 0, c3 = s3.length; h3 < c3; ++h3)
            s3[h3] > l3 && (l3 = s3[h3], u3 = h3);
          ++o3[u3], s3[u3] = 0, ++a3;
        }
        return E(o3, function(t4) {
          return t4 / i3;
        });
      }
      var ya = ra(2, 53) - 1;
      function ma(t3) {
        var e3 = 2 * sa;
        return (t3 % e3 + e3) % e3;
      }
      function va(t3) {
        return -1e-4 < t3 && t3 < 1e-4;
      }
      var _a = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
      function xa(t3) {
        var e3, n3;
        return t3 instanceof Date ? t3 : W(t3) ? (e3 = _a.exec(t3)) ? e3[8] ? (n3 = +e3[4] || 0, "Z" !== e3[8].toUpperCase() && (n3 -= +e3[8].slice(0, 3)), new Date(Date.UTC(+e3[1], +(e3[2] || 1) - 1, +e3[3] || 1, n3, +(e3[5] || 0), +e3[6] || 0, e3[7] ? +e3[7].substring(0, 3) : 0))) : new Date(+e3[1], +(e3[2] || 1) - 1, +e3[3] || 1, +e3[4] || 0, +(e3[5] || 0), +e3[6] || 0, e3[7] ? +e3[7].substring(0, 3) : 0) : /* @__PURE__ */ new Date(NaN) : null == t3 ? /* @__PURE__ */ new Date(NaN) : new Date(ea(t3));
      }
      function ba(t3) {
        return ra(10, wa(t3));
      }
      function wa(t3) {
        var e3;
        return 0 === t3 ? 0 : (e3 = na(oa(t3) / aa), 10 <= t3 / ra(10, e3) && e3++, e3);
      }
      var Sa = 2;
      function Ma(t3, e3) {
        var n3 = wa(t3), i3 = ra(10, n3), r3 = t3 / i3, e3 = e3 === Sa ? 1 : e3 ? r3 < 1.5 ? 1 : r3 < 2.5 ? 2 : r3 < 4 ? 3 : r3 < 7 ? 5 : 10 : r3 < 1 ? 1 : r3 < 2 ? 2 : r3 < 3 ? 3 : r3 < 5 ? 5 : 10;
        return C(t3 = e3 * i3, -n3);
      }
      function Ta(t3) {
        var e3 = parseFloat(t3);
        return e3 == t3 && (0 !== e3 || !W(t3) || t3.indexOf("x") <= 0) ? e3 : NaN;
      }
      function Ia(t3) {
        return !isNaN(Ta(t3));
      }
      function Ca() {
        return ea(9 * la());
      }
      function ka(t3, e3) {
        return null == t3 ? e3 : null == e3 ? t3 : t3 * e3 / function t4(e4, n3) {
          return 0 === n3 ? e4 : t4(n3, e4 % n3);
        }(t3, e3);
      }
      function Da(t3) {
        return null != t3 && isFinite(t3);
      }
      function f(t3) {
        throw new Error(t3);
      }
      function Aa(t3, e3, n3) {
        return (e3 - t3) * n3 + t3;
      }
      var La = "series\0";
      function Pa(t3) {
        return t3 instanceof Array ? t3 : null == t3 ? [] : [t3];
      }
      function Oa(t3, e3, n3) {
        if (t3) {
          t3[e3] = t3[e3] || {}, t3.emphasis = t3.emphasis || {}, t3.emphasis[e3] = t3.emphasis[e3] || {};
          for (var i3 = 0, r3 = n3.length; i3 < r3; i3++) {
            var o3 = n3[i3];
            !t3.emphasis[e3].hasOwnProperty(o3) && t3[e3].hasOwnProperty(o3) && (t3.emphasis[e3][o3] = t3[e3][o3]);
          }
        }
      }
      var Ra = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
      function Na(t3) {
        return !X(t3) || G(t3) || t3 instanceof Date ? t3 : t3.value;
      }
      function za(t3, n3, e3) {
        var o3, a3, s3, l3, r3, u3, i3, h3, c3, p3, d3 = "normalMerge" === e3, f3 = "replaceMerge" === e3, g3 = "replaceAll" === e3, y3 = (t3 = t3 || [], n3 = (n3 || []).slice(), I()), e3 = (F(n3, function(t4, e4) {
          X(t4) || (n3[e4] = null);
        }), function(t4, e4, n4) {
          var i4 = [];
          if ("replaceAll" !== n4)
            for (var r4 = 0; r4 < t4.length; r4++) {
              var o4 = t4[r4];
              o4 && null != o4.id && e4.set(o4.id, r4), i4.push({ existing: "replaceMerge" === n4 || Ga(o4) ? null : o4, newOption: null, keyInfo: null, brandNew: null });
            }
          return i4;
        }(t3, y3, e3));
        return (d3 || f3) && (o3 = e3, a3 = t3, s3 = y3, F(l3 = n3, function(t4, e4) {
          var n4, i4, r4;
          t4 && null != t4.id && (n4 = Ea(t4.id), null != (i4 = s3.get(n4))) && (Dt(!(r4 = o3[i4]).newOption, 'Duplicated option on id "' + n4 + '".'), r4.newOption = t4, r4.existing = a3[i4], l3[e4] = null);
        })), d3 && (r3 = e3, F(u3 = n3, function(t4, e4) {
          if (t4 && null != t4.name)
            for (var n4 = 0; n4 < r3.length; n4++) {
              var i4 = r3[n4].existing;
              if (!r3[n4].newOption && i4 && (null == i4.id || null == t4.id) && !Ga(t4) && !Ga(i4) && Ba("name", i4, t4))
                return r3[n4].newOption = t4, void (u3[e4] = null);
            }
        })), d3 || f3 ? (h3 = e3, c3 = f3, F(n3, function(t4) {
          if (t4) {
            for (var e4, n4 = 0; (e4 = h3[n4]) && (e4.newOption || Ga(e4.existing) || e4.existing && null != t4.id && !Ba("id", t4, e4.existing)); )
              n4++;
            e4 ? (e4.newOption = t4, e4.brandNew = c3) : h3.push({ newOption: t4, brandNew: c3, existing: null, keyInfo: null }), n4++;
          }
        })) : g3 && (i3 = e3, F(n3, function(t4) {
          i3.push({ newOption: t4, brandNew: true, existing: null, keyInfo: null });
        })), t3 = e3, p3 = I(), F(t3, function(t4) {
          var e4 = t4.existing;
          e4 && p3.set(e4.id, t4);
        }), F(t3, function(t4) {
          var e4 = t4.newOption;
          Dt(!e4 || null == e4.id || !p3.get(e4.id) || p3.get(e4.id) === t4, "id duplicates: " + (e4 && e4.id)), e4 && null != e4.id && p3.set(e4.id, t4), t4.keyInfo || (t4.keyInfo = {});
        }), F(t3, function(t4, e4) {
          var n4 = t4.existing, i4 = t4.newOption, r4 = t4.keyInfo;
          if (X(i4)) {
            if (r4.name = null != i4.name ? Ea(i4.name) : n4 ? n4.name : La + e4, n4)
              r4.id = Ea(n4.id);
            else if (null != i4.id)
              r4.id = Ea(i4.id);
            else
              for (var o4 = 0; r4.id = "\0" + r4.name + "\0" + o4++, p3.get(r4.id); )
                ;
            p3.set(r4.id, t4);
          }
        }), e3;
      }
      function Ba(t3, e3, n3) {
        e3 = Va(e3[t3], null), n3 = Va(n3[t3], null);
        return null != e3 && null != n3 && e3 === n3;
      }
      function Ea(t3) {
        return Va(t3, "");
      }
      function Va(t3, e3) {
        return null == t3 ? e3 : W(t3) ? t3 : U(t3) || mt(t3) ? t3 + "" : e3;
      }
      function Fa(t3) {
        t3 = t3.name;
        return !(!t3 || !t3.indexOf(La));
      }
      function Ga(t3) {
        return t3 && null != t3.id && 0 === Ea(t3.id).indexOf("\0_ec_\0");
      }
      function Ha(t3, r3, o3) {
        F(t3, function(t4) {
          var e3, n3, i3 = t4.newOption;
          X(i3) && (t4.keyInfo.mainType = r3, t4.keyInfo.subType = (e3 = r3, i3 = i3, t4 = t4.existing, n3 = o3, i3.type || (t4 ? t4.subType : n3.determineSubType(e3, i3))));
        });
      }
      function Wa(e3, t3) {
        return null != t3.dataIndexInside ? t3.dataIndexInside : null != t3.dataIndex ? G(t3.dataIndex) ? E(t3.dataIndex, function(t4) {
          return e3.indexOfRawIndex(t4);
        }) : e3.indexOfRawIndex(t3.dataIndex) : null != t3.name ? G(t3.name) ? E(t3.name, function(t4) {
          return e3.indexOfName(t4);
        }) : e3.indexOfName(t3.name) : void 0;
      }
      function i() {
        var e3 = "__ec_inner_" + Ua++;
        return function(t3) {
          return t3[e3] || (t3[e3] = {});
        };
      }
      var Ua = Ca();
      function Xa(n3, t3, i3) {
        var t3 = Ya(t3, i3), e3 = t3.mainTypeSpecified, r3 = t3.queryOptionMap, o3 = t3.others, a3 = i3 ? i3.defaultMainType : null;
        return !e3 && a3 && r3.set(a3, {}), r3.each(function(t4, e4) {
          t4 = Za(n3, e4, t4, { useDefault: a3 === e4, enableAll: !i3 || null == i3.enableAll || i3.enableAll, enableNone: !i3 || null == i3.enableNone || i3.enableNone });
          o3[e4 + "Models"] = t4.models, o3[e4 + "Model"] = t4.models[0];
        }), o3;
      }
      function Ya(t3, i3) {
        var e3 = W(t3) ? ((e3 = {})[t3 + "Index"] = 0, e3) : t3, r3 = I(), o3 = {}, a3 = false;
        return F(e3, function(t4, e4) {
          var n3;
          "dataIndex" === e4 || "dataIndexInside" === e4 ? o3[e4] = t4 : (n3 = (e4 = e4.match(/^(\w+)(Index|Id|Name)$/) || [])[1], e4 = (e4[2] || "").toLowerCase(), !n3 || !e4 || i3 && i3.includeMainTypes && L(i3.includeMainTypes, n3) < 0 || (a3 = a3 || !!n3, (r3.get(n3) || r3.set(n3, {}))[e4] = t4));
        }), { mainTypeSpecified: a3, queryOptionMap: r3, others: o3 };
      }
      var qa = { useDefault: true, enableAll: false, enableNone: false };
      function Za(t3, e3, n3, i3) {
        i3 = i3 || qa;
        var r3 = n3.index, o3 = n3.id, n3 = n3.name, a3 = { models: null, specified: null != r3 || null != o3 || null != n3 };
        if (a3.specified) {
          if ("none" === r3 || false === r3) {
            if (i3.enableNone)
              return a3.models = [], a3;
            r3 = -1;
          }
          "all" === r3 && (r3 = i3.enableAll ? o3 = n3 = null : -1), a3.models = t3.queryComponents({ mainType: e3, index: r3, id: o3, name: n3 });
        } else
          r3 = void 0, a3.models = i3.useDefault && (r3 = t3.getComponent(e3)) ? [r3] : [];
        return a3;
      }
      function ja(t3, e3, n3) {
        t3.setAttribute ? t3.setAttribute(e3, n3) : t3[e3] = n3;
      }
      function Ka(t3, e3, n3, i3, r3) {
        var o3 = null == e3 || "auto" === e3;
        if (null == i3)
          return i3;
        if (U(i3))
          return C(p3 = Aa(n3 || 0, i3, r3), o3 ? Math.max(da(n3 || 0), da(i3)) : e3);
        if (W(i3))
          return r3 < 1 ? n3 : i3;
        for (var a3 = [], s3 = n3, l3 = i3, u3 = Math.max(s3 ? s3.length : 0, l3.length), h3 = 0; h3 < u3; ++h3) {
          var c3, p3, d3 = t3.getDimensionInfo(h3);
          d3 && "ordinal" === d3.type ? a3[h3] = (r3 < 1 && s3 ? s3 : l3)[h3] : (p3 = Aa(d3 = s3 && s3[h3] ? s3[h3] : 0, c3 = l3[h3], r3), a3[h3] = C(p3, o3 ? Math.max(da(d3), da(c3)) : e3));
        }
        return a3;
      }
      function $a() {
        return [1 / 0, -1 / 0];
      }
      function Qa(t3, e3) {
        es(e3) && (e3 < t3[0] && (t3[0] = e3), e3 > t3[1]) && (t3[1] = e3);
      }
      function Ja(t3, e3) {
        es(e3) && e3 < t3[0] && (t3[0] = e3);
      }
      function ts(t3, e3) {
        es(e3) && e3 > t3[1] && (t3[1] = e3);
      }
      function es(t3) {
        return null != t3 && isFinite(t3);
      }
      function ns(t3, e3) {
        return es(t3) && es(e3) && t3 <= e3;
      }
      function is() {
        var n3 = "__ec_once_" + rs++;
        return function(t3, e3) {
          Ht(t3, n3) || (t3[n3] = 1, e3());
        };
      }
      var rs = Ca();
      function os(i3, r3, o3) {
        var a3 = I(), s3 = 0;
        F(i3, function(t3) {
          var e3 = r3(t3), n3 = a3.get(e3) || 0;
          o3 && o3(t3, n3), n3 || o3 || (i3[s3++] = t3), a3.set(e3, n3 + 1);
        }), o3 || (i3.length = s3);
      }
      function as(t3) {
        return t3.value + "";
      }
      function ss(t3) {
        return t3 + "";
      }
      function ls(t3, e3, n3) {
        var i3 = t3.getData().count();
        return { progressiveRender: n3.progressiveEnabled && e3.incrementalPrepareRender && i3 >= n3.threshold, large: t3.get("large") && i3 >= t3.get("largeThreshold"), modDataCount: "mod" === t3.get("progressiveChunkMode") ? t3.getData().count() : null };
      }
      function us(t3) {
        return { overallReset: t3 };
      }
      var hs = ".", cs = "___EC__COMPONENT__CONTAINER___", ps = "___EC__EXTENDED_CLASS___";
      function ds(t3) {
        var e3 = { main: "", sub: "" };
        return t3 && (t3 = t3.split(hs), e3.main = t3[0] || "", e3.sub = t3[1] || ""), e3;
      }
      function fs(t3) {
        (t3.$constructor = t3).extend = function(t4) {
          var e3, n3, i3, r3 = this;
          function o3() {
            return n3.apply(this, arguments) || this;
          }
          return H(i3 = r3) && /^class\s/.test(Function.prototype.toString.call(i3)) ? (u(o3, n3 = r3), e3 = o3) : ht(e3 = function() {
            (t4.$constructor || r3).apply(this, arguments);
          }, this), V(e3.prototype, t4), e3[ps] = true, e3.extend = this.extend, e3.superCall = ms, e3.superApply = vs, e3.superClass = r3, e3;
        };
      }
      function gs(t3, e3) {
        t3.extend = e3.extend;
      }
      var ys = Math.round(10 * Math.random());
      function ms(t3, e3) {
        for (var n3 = [], i3 = 2; i3 < arguments.length; i3++)
          n3[i3 - 2] = arguments[i3];
        return this.superClass.prototype[e3].apply(t3, n3);
      }
      function vs(t3, e3, n3) {
        return this.superClass.prototype[e3].apply(t3, n3);
      }
      function _s(t3) {
        var r3 = {};
        t3.registerClass = function(t4) {
          var e3, n3 = t4.type || t4.prototype.type;
          return n3 && (Dt(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(e3 = n3), 'componentType "' + e3 + '" illegal'), (e3 = ds(t4.prototype.type = n3)).sub ? e3.sub !== cs && (function(t5) {
            var e4 = r3[t5.main];
            e4 && e4[cs] || (e4 = r3[t5.main] = { ___EC__COMPONENT__CONTAINER___: true });
            return e4;
          }(e3)[e3.sub] = t4) : r3[e3.main] = t4), t4;
        }, t3.getClass = function(t4, e3, n3) {
          var i3 = r3[t4];
          if (i3 && i3[cs] && (i3 = e3 ? i3[e3] : null), n3 && !i3)
            throw new Error(e3 ? "Component " + t4 + "." + (e3 || "") + " is used but not imported." : t4 + ".type should be specified.");
          return i3;
        }, t3.getClassesByMainType = function(t4) {
          var t4 = ds(t4), n3 = [], t4 = r3[t4.main];
          return t4 && t4[cs] ? F(t4, function(t5, e3) {
            e3 !== cs && n3.push(t5);
          }) : n3.push(t4), n3;
        }, t3.hasClass = function(t4) {
          t4 = ds(t4);
          return !!r3[t4.main];
        }, t3.getAllClassMainTypes = function() {
          var n3 = [];
          return F(r3, function(t4, e3) {
            n3.push(e3);
          }), n3;
        }, t3.hasSubTypes = function(t4) {
          t4 = ds(t4), t4 = r3[t4.main];
          return t4 && t4[cs];
        };
      }
      function xs(a3, s3) {
        for (var t3 = 0; t3 < a3.length; t3++)
          a3[t3][1] || (a3[t3][1] = a3[t3][0]);
        return s3 = s3 || false, function(t4, e3, n3) {
          for (var i3 = {}, r3 = 0; r3 < a3.length; r3++) {
            var o3 = a3[r3][1];
            e3 && 0 <= L(e3, o3) || n3 && L(n3, o3) < 0 || null != (o3 = t4.getShallow(o3, s3)) && (i3[a3[r3][0]] = o3);
          }
          return i3;
        };
      }
      var bs = xs([["fill", "color"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["opacity"], ["shadowColor"]]), ws = (Ss.prototype.getAreaStyle = function(t3, e3) {
        return bs(this, t3, e3);
      }, Ss);
      function Ss() {
      }
      var Ms = new Ti(50);
      function Ts(t3, e3, n3, i3, r3) {
        return t3 ? "string" == typeof t3 ? (e3 && e3.__zrImageSrc === t3 || !n3 || (n3 = { hostEl: n3, cb: i3, cbPayload: r3 }, (i3 = Ms.get(t3)) ? Cs(e3 = i3.image) || i3.pending.push(n3) : ((e3 = $.loadImage(t3, Is, Is)).__zrImageSrc = t3, Ms.put(t3, e3.__cachedImgObj = { image: e3, pending: [n3] }))), e3) : t3 : e3;
      }
      function Is() {
        var t3 = this.__cachedImgObj;
        this.onload = this.onerror = this.__cachedImgObj = null;
        for (var e3 = 0; e3 < t3.pending.length; e3++) {
          var n3 = t3.pending[e3], i3 = n3.cb;
          i3 && i3(this, n3.cbPayload), n3.hostEl.dirty();
        }
        t3.pending.length = 0;
      }
      function Cs(t3) {
        return t3 && t3.width && t3.height;
      }
      var ks = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
      function Ds(t3, e3, n3, i3, r3, o3) {
        if (n3) {
          for (var a3 = (e3 + "").split("\n"), s3 = (o3 = As(n3, i3, r3, o3), false), l3 = {}, u3 = 0, h3 = a3.length; u3 < h3; u3++)
            Ls(l3, a3[u3], o3), a3[u3] = l3.textLine, s3 = s3 || l3.isTruncated;
          t3.text = a3.join("\n"), t3.isTruncated = s3;
        } else
          t3.text = "", t3.isTruncated = false;
      }
      function As(t3, e3, n3, i3) {
        for (var r3 = V({}, i3 = i3 || {}), o3 = (n3 = Y(n3, "..."), r3.maxIterations = Y(i3.maxIterations, 2), r3.minChar = Y(i3.minChar, 0)), e3 = r3.fontMeasureInfo = po(e3), a3 = e3.asciiCharWidth, s3 = (r3.placeholder = Y(i3.placeholder, ""), t3 = Math.max(0, t3 - 1)), l3 = 0; l3 < o3 && a3 <= s3; l3++)
          s3 -= a3;
        i3 = yo(e3, n3);
        return s3 < i3 && (n3 = "", i3 = 0), s3 = t3 - i3, r3.ellipsis = n3, r3.ellipsisWidth = i3, r3.contentWidth = s3, r3.containerWidth = t3, r3;
      }
      function Ls(t3, e3, n3) {
        var i3 = n3.containerWidth, r3 = n3.contentWidth, o3 = n3.fontMeasureInfo;
        if (i3)
          if ((l3 = yo(o3, e3)) <= i3)
            t3.textLine = e3, t3.isTruncated = false;
          else {
            for (var a3 = 0; ; a3++) {
              if (l3 <= r3 || a3 >= n3.maxIterations) {
                e3 += n3.ellipsis;
                break;
              }
              var s3 = 0 === a3 ? function(t4, e4, n4) {
                for (var i4 = 0, r4 = 0, o4 = t4.length; r4 < o4 && i4 < e4; r4++)
                  i4 += go(n4, t4.charCodeAt(r4));
                return r4;
              }(e3, r3, o3) : 0 < l3 ? Math.floor(e3.length * r3 / l3) : 0, l3 = yo(o3, e3 = e3.substr(0, s3));
            }
            "" === e3 && (e3 = n3.placeholder), t3.textLine = e3, t3.isTruncated = true;
          }
        else
          t3.textLine = "", t3.isTruncated = false;
      }
      var Ps = function() {
      }, Os = function(t3) {
        this.tokens = [], t3 && (this.tokens = t3);
      }, Rs = function() {
        this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = false;
      };
      function Ns(t3, e3, n3, i3, r3) {
        var o3 = new Rs(), a3 = Hs(t3);
        if (a3) {
          for (var s3, t3 = e3.padding, l3 = t3 ? t3[1] + t3[3] : 0, t3 = t3 ? t3[0] + t3[2] : 0, u3 = e3.width, h3 = (null == u3 && null != n3 && (u3 = n3 - l3), e3.height), n3 = (null == h3 && null != i3 && (h3 = i3 - t3), e3.overflow), c3 = "break" !== n3 && "breakAll" !== n3 || null == u3 ? null : { width: u3, accumWidth: 0, breakAll: "breakAll" === n3 }, p3 = ks.lastIndex = 0; null != (s3 = ks.exec(a3)); ) {
            var d3 = s3.index;
            p3 < d3 && zs(o3, a3.substring(p3, d3), e3, c3), zs(o3, s3[2], e3, c3, s3[1]), p3 = ks.lastIndex;
          }
          p3 < a3.length && zs(o3, a3.substring(p3, a3.length), e3, c3);
          var f3, g3 = [], y3 = 0, m3 = 0, v3 = "truncate" === n3, _3 = "truncate" === e3.lineOverflow, x3 = {};
          t:
            for (var b3 = 0; b3 < o3.lines.length; b3++) {
              for (var w3 = o3.lines[b3], S3 = 0, M3 = 0, T3 = 0; T3 < w3.tokens.length; T3++) {
                var I3 = (O3 = w3.tokens[T3]).styleName && e3.rich[O3.styleName] || {}, C3 = O3.textPadding = I3.padding, k3 = C3 ? C3[1] + C3[3] : 0, D3 = O3.font = I3.font || e3.font, A3 = (O3.contentHeight = xo(D3), Y(I3.height, O3.contentHeight));
                if (O3.innerHeight = A3, C3 && (A3 += C3[0] + C3[2]), O3.height = A3, O3.lineHeight = It(I3.lineHeight, e3.lineHeight, A3), O3.align = I3 && I3.align || r3, O3.verticalAlign = I3 && I3.verticalAlign || "middle", _3 && null != h3 && y3 + O3.lineHeight > h3) {
                  C3 = o3.lines.length;
                  0 < T3 ? (w3.tokens = w3.tokens.slice(0, T3), N3(w3, M3, S3), o3.lines = o3.lines.slice(0, b3 + 1)) : o3.lines = o3.lines.slice(0, b3), o3.isTruncated = o3.isTruncated || o3.lines.length < C3;
                  break t;
                }
                var L3, C3 = I3.width, P3 = null == C3 || "auto" === C3;
                "string" == typeof C3 && "%" === C3.charAt(C3.length - 1) ? (O3.percentWidth = C3, g3.push(O3), O3.contentWidth = yo(po(D3), O3.text)) : (P3 && (C3 = (C3 = I3.backgroundColor) && C3.image) && (L3 = void 0, Cs(C3 = "string" == typeof (f3 = C3) ? (L3 = Ms.get(f3)) && L3.image : f3)) && (O3.width = Math.max(O3.width, C3.width * A3 / C3.height)), null != (L3 = v3 && null != u3 ? u3 - M3 : null) && L3 < O3.width ? !P3 || L3 < k3 ? (O3.text = "", O3.width = O3.contentWidth = 0) : (Ds(x3, O3.text, L3 - k3, D3, e3.ellipsis, { minChar: e3.truncateMinChar }), O3.text = x3.text, o3.isTruncated = o3.isTruncated || x3.isTruncated, O3.width = O3.contentWidth = yo(po(D3), O3.text)) : O3.contentWidth = yo(po(D3), O3.text)), O3.width += k3, M3 += O3.width, I3 && (S3 = Math.max(S3, O3.lineHeight));
              }
              N3(w3, M3, S3);
            }
          o3.outerWidth = o3.width = Y(u3, m3), o3.outerHeight = o3.height = Y(h3, y3), o3.contentHeight = y3, o3.contentWidth = m3, o3.outerWidth += l3, o3.outerHeight += t3;
          for (b3 = 0; b3 < g3.length; b3++) {
            var O3, R3 = (O3 = g3[b3]).percentWidth;
            O3.width = parseInt(R3, 10) / 100 * o3.width;
          }
        }
        return o3;
        function N3(t4, e4, n4) {
          t4.width = e4, t4.lineHeight = n4, y3 += n4, m3 = Math.max(m3, e4);
        }
      }
      function zs(t3, e3, n3, i3, r3) {
        for (var o3, a3, s3, l3 = "" === e3, u3 = r3 && n3.rich[r3] || {}, h3 = t3.lines, t3 = u3.font || n3.font, c3 = false, p3 = (i3 && (n3 = (n3 = u3.padding) ? n3[1] + n3[3] : 0, null != u3.width && "auto" !== u3.width ? (s3 = bo(u3.width, i3.width) + n3, 0 < h3.length && s3 + i3.accumWidth > i3.width && (o3 = e3.split("\n"), c3 = true), i3.accumWidth = s3) : (s3 = Es(e3, t3, i3.width, i3.breakAll, i3.accumWidth), i3.accumWidth = s3.accumWidth + n3, a3 = s3.linesWidths, o3 = s3.lines)), o3 = o3 || e3.split("\n"), po(t3)), d3 = 0; d3 < o3.length; d3++) {
          var f3, g3, y3 = o3[d3], m3 = new Ps();
          m3.styleName = r3, m3.text = y3, m3.isLineHolder = !y3 && !l3, "number" == typeof u3.width ? m3.width = u3.width : m3.width = a3 ? a3[d3] : yo(p3, y3), d3 || c3 ? h3.push(new Os([m3])) : 1 === (g3 = (f3 = (h3[h3.length - 1] || (h3[0] = new Os())).tokens).length) && f3[0].isLineHolder ? f3[0] = m3 : !y3 && g3 && !l3 || f3.push(m3);
        }
      }
      var Bs = dt(",&?/;] ".split(""), function(t3, e3) {
        return t3[e3] = true, t3;
      }, {});
      function Es(t3, e3, n3, i3, r3) {
        for (var o3, a3 = [], s3 = [], l3 = "", u3 = "", h3 = 0, c3 = 0, p3 = po(e3), d3 = 0; d3 < t3.length; d3++) {
          var f3, g3, y3 = t3.charAt(d3);
          "\n" === y3 ? (u3 && (l3 += u3, c3 += h3), a3.push(l3), s3.push(c3), u3 = l3 = "", c3 = h3 = 0) : (f3 = go(p3, y3.charCodeAt(0)), g3 = !(i3 || (g3 = void 0, !(32 <= (g3 = (g3 = o3 = y3).charCodeAt(0)) && g3 <= 591 || 880 <= g3 && g3 <= 4351 || 4608 <= g3 && g3 <= 5119 || 7680 <= g3 && g3 <= 8303)) || !!Bs[o3]), (a3.length ? n3 < c3 + f3 : n3 < r3 + c3 + f3) ? c3 ? (l3 || u3) && (c3 = g3 ? (l3 || (l3 = u3, u3 = "", c3 = h3 = 0), a3.push(l3), s3.push(c3 - h3), u3 += y3, l3 = "", h3 += f3) : (u3 && (l3 += u3, u3 = "", h3 = 0), a3.push(l3), s3.push(c3), l3 = y3, f3)) : g3 ? (a3.push(u3), s3.push(h3), u3 = y3, h3 = f3) : (a3.push(y3), s3.push(f3)) : (c3 += f3, g3 ? (u3 += y3, h3 += f3) : (u3 && (l3 += u3, u3 = "", h3 = 0), l3 += y3)));
        }
        return u3 && (l3 += u3), l3 && (a3.push(l3), s3.push(c3)), 1 === a3.length && (c3 += r3), { accumWidth: c3, lines: a3, linesWidths: s3 };
      }
      function Vs(t3, e3, n3, i3, r3, o3) {
        var a3, s3;
        t3.baseX = n3, t3.baseY = i3, t3.outerWidth = t3.outerHeight = null, e3 && (a3 = 2 * e3.width, s3 = 2 * e3.height, Z.set(Fs, vo(n3, a3, r3), _o(i3, s3, o3), a3, s3), Z.intersect(e3, Fs, null, Gs), t3.outerWidth = (n3 = Gs.outIntersectRect).width, t3.outerHeight = n3.height, t3.baseX = vo(n3.x, n3.width, r3, true), t3.baseY = _o(n3.y, n3.height, o3, true));
      }
      var Fs = new Z(0, 0, 0, 0), Gs = { outIntersectRect: {}, clamp: true };
      function Hs(t3) {
        return null != t3 ? t3 + "" : "";
      }
      function Ws(t3, e3, n3, i3) {
        e3 = new Z(vo(t3.x || 0, e3, t3.textAlign), _o(t3.y || 0, n3, t3.textBaseline), e3, n3), n3 = null != i3 ? i3 : Us(t3) ? t3.lineWidth : 0;
        return 0 < n3 && (e3.x -= n3 / 2, e3.y -= n3 / 2, e3.width += n3, e3.height += n3), e3;
      }
      function Us(t3) {
        var e3 = t3.stroke;
        return null != e3 && "none" !== e3 && 0 < t3.lineWidth;
      }
      var Xs, Ys = "__zr_style_" + Math.round(10 * Math.random()), qs = { shadowBlur: 0, shadowOffsetX: 0, shadowOffsetY: 0, shadowColor: "#000", opacity: 1, blend: "source-over" }, Zs = { style: { shadowBlur: true, shadowOffsetX: true, shadowOffsetY: true, shadowColor: true, opacity: true } }, js = (qs[Ys] = true, ["z", "z2", "invisible"]), Ks = ["invisible"], $s = (u(r, Xs = e), r.prototype._init = function(t3) {
        for (var e3 = O(t3), n3 = 0; n3 < e3.length; n3++) {
          var i3 = e3[n3];
          "style" === i3 ? this.useStyle(t3[i3]) : Xs.prototype.attrKV.call(this, i3, t3[i3]);
        }
        this.style || this.useStyle({});
      }, r.prototype.beforeBrush = function(t3) {
      }, r.prototype.afterBrush = function() {
      }, r.prototype.innerBeforeBrush = function() {
      }, r.prototype.innerAfterBrush = function() {
      }, r.prototype.shouldBePainted = function(t3, e3, n3, i3) {
        var r3 = this.transform;
        if (this.ignore || this.invisible || 0 === this.style.opacity || this.culling && function(t4, e4, n4) {
          Qs.copy(t4.getBoundingRect()), t4.transform && Qs.applyTransform(t4.transform);
          return Js.width = e4, Js.height = n4, !Qs.intersect(Js);
        }(this, t3, e3) || r3 && !r3[0] && !r3[3])
          return false;
        if (n3 && this.__clipPaths && this.__clipPaths.length) {
          for (var o3 = 0; o3 < this.__clipPaths.length; ++o3)
            if (this.__clipPaths[o3].isZeroArea())
              return false;
        }
        if (i3 && this.parent)
          for (var a3 = this.parent; a3; ) {
            if (a3.ignore)
              return false;
            a3 = a3.parent;
          }
        return true;
      }, r.prototype.contain = function(t3, e3) {
        return this.rectContain(t3, e3);
      }, r.prototype.traverse = function(t3, e3) {
        t3.call(e3, this);
      }, r.prototype.rectContain = function(t3, e3) {
        t3 = this.transformCoordToLocal(t3, e3);
        return this.getBoundingRect().contain(t3[0], t3[1]);
      }, r.prototype.getPaintRect = function() {
        var t3, e3, n3, i3, r3, o3 = this._paintRect;
        return this._paintRect && !this.__dirty || (r3 = this.transform, t3 = this.getBoundingRect(), e3 = (i3 = this.style).shadowBlur || 0, n3 = i3.shadowOffsetX || 0, i3 = i3.shadowOffsetY || 0, o3 = this._paintRect || (this._paintRect = new Z(0, 0, 0, 0)), r3 ? Z.applyTransform(o3, t3, r3) : o3.copy(t3), (e3 || n3 || i3) && (o3.width += 2 * e3 + Math.abs(n3), o3.height += 2 * e3 + Math.abs(i3), o3.x = Math.min(o3.x, o3.x + n3 - e3), o3.y = Math.min(o3.y, o3.y + i3 - e3)), r3 = this.dirtyRectTolerance, o3.isZero()) || (o3.x = Math.floor(o3.x - r3), o3.y = Math.floor(o3.y - r3), o3.width = Math.ceil(o3.width + 1 + 2 * r3), o3.height = Math.ceil(o3.height + 1 + 2 * r3)), o3;
      }, r.prototype.setPrevPaintRect = function(t3) {
        t3 ? (this._prevPaintRect = this._prevPaintRect || new Z(0, 0, 0, 0), this._prevPaintRect.copy(t3)) : this._prevPaintRect = null;
      }, r.prototype.getPrevPaintRect = function() {
        return this._prevPaintRect;
      }, r.prototype.animateStyle = function(t3) {
        return this.animate("style", t3);
      }, r.prototype.updateDuringAnimation = function(t3) {
        "style" === t3 ? this.dirtyStyle() : this.markRedraw();
      }, r.prototype.attrKV = function(t3, e3) {
        "style" !== t3 ? Xs.prototype.attrKV.call(this, t3, e3) : this.style ? this.setStyle(e3) : this.useStyle(e3);
      }, r.prototype.setStyle = function(t3, e3) {
        return "string" == typeof t3 ? this.style[t3] = e3 : V(this.style, t3), this.dirtyStyle(), this;
      }, r.prototype.dirtyStyle = function(t3) {
        t3 || this.markRedraw(), this.__dirty |= 2, this._rect && (this._rect = null);
      }, r.prototype.dirty = function() {
        this.dirtyStyle();
      }, r.prototype.styleChanged = function() {
        return !!(2 & this.__dirty);
      }, r.prototype.styleUpdated = function() {
        this.__dirty &= -3;
      }, r.prototype.createStyle = function(t3) {
        return Ft(qs, t3);
      }, r.prototype.useStyle = function(t3) {
        t3[Ys] || (t3 = this.createStyle(t3)), this.style = t3, this.dirtyStyle();
      }, r.prototype._useHoverStyle = function(t3) {
        this.__hoverStyle = t3;
      }, r.prototype.isStyleObject = function(t3) {
        return t3[Ys];
      }, r.prototype._innerSaveToNormal = function(t3) {
        Xs.prototype._innerSaveToNormal.call(this, t3);
        var e3 = this._normalState;
        t3.style && !e3.style && (e3.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(t3, e3, js);
      }, r.prototype._applyStateObj = function(t3, e3, n3, i3, r3, o3) {
        Xs.prototype._applyStateObj.call(this, t3, e3, n3, i3, r3, o3);
        var a3, s3 = !(e3 && i3), l3 = 1 === this.__inHover;
        if (e3 && e3.style ? r3 ? i3 ? a3 = e3.style : (a3 = this._mergeStyle(this.createStyle(), n3.style), this._mergeStyle(a3, e3.style)) : (a3 = this._mergeStyle(this.createStyle(), (i3 ? this : n3).style), this._mergeStyle(a3, e3.style)) : s3 && (a3 = n3.style), a3)
          if (r3) {
            var u3 = this.style;
            if (this.style = this.createStyle(s3 ? {} : u3), s3)
              for (var h3 = O(u3), c3 = 0; c3 < h3.length; c3++)
                (d3 = h3[c3]) in a3 && (a3[d3] = a3[d3], this.style[d3] = u3[d3]);
            for (var p3 = O(a3), c3 = 0; c3 < p3.length; c3++) {
              var d3 = p3[c3];
              this.style[d3] = this.style[d3];
            }
            this._transitionState(t3, { style: a3 }, o3, this.getAnimationStyleProps());
          } else
            l3 ? this._useHoverStyle(a3) : this.useStyle(a3);
        if (!l3)
          for (var f3 = this.__inHover ? Ks : js, c3 = 0; c3 < f3.length; c3++) {
            d3 = f3[c3];
            e3 && null != e3[d3] ? this[d3] = e3[d3] : s3 && null != n3[d3] && (this[d3] = n3[d3]);
          }
      }, r.prototype._mergeStates = function(t3) {
        for (var e3, n3 = Xs.prototype._mergeStates.call(this, t3), i3 = 0; i3 < t3.length; i3++) {
          var r3 = t3[i3];
          r3.style && this._mergeStyle(e3 = e3 || {}, r3.style);
        }
        return e3 && (n3.style = e3), n3;
      }, r.prototype._mergeStyle = function(t3, e3) {
        return V(t3, e3), t3;
      }, r.prototype.getAnimationStyleProps = function() {
        return Zs;
      }, r.initDefaultProps = ((e = r.prototype).type = "displayable", e.invisible = false, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = false, e.cursor = "pointer", e.rectHover = false, e.incremental = 0, e._rect = null, e.dirtyRectTolerance = 0, void (e.__dirty = 2 | Hn)), r);
      function r(t3) {
        return Xs.call(this, t3) || this;
      }
      var Qs = new Z(0, 0, 0, 0), Js = new Z(0, 0, 0, 0);
      var tl = Math.min, el = Math.max, nl = Math.sin, il = Math.cos, rl = 2 * Math.PI, ol = qt(), al = qt(), sl = qt();
      function ll(t3, e3, n3, i3, r3, o3) {
        r3[0] = tl(t3, n3), r3[1] = tl(e3, i3), o3[0] = el(t3, n3), o3[1] = el(e3, i3);
      }
      var ul = [], hl = [];
      var cl = { M: 1, L: 2, C: 3, Q: 4, A: 5, Z: 6, R: 7 }, pl = [], dl = [], fl = [], gl = [], yl = [], ml = [], vl = Math.min, _l = Math.max, xl = Math.cos, bl = Math.sin, wl = Math.abs, Sl = Math.PI, Ml = 2 * Sl, Tl = "undefined" != typeof Float32Array, Il = [];
      function Cl(t3) {
        return Math.round(t3 / Sl * 1e8) / 1e8 % 2 * Sl;
      }
      function kl(t3, e3) {
        var n3 = Cl(t3[0]), i3 = (n3 < 0 && (n3 += Ml), n3 - t3[0]), r3 = t3[1];
        r3 += i3, !e3 && Ml <= r3 - n3 ? r3 = n3 + Ml : e3 && Ml <= n3 - r3 ? r3 = n3 - Ml : !e3 && r3 < n3 ? r3 = n3 + (Ml - Cl(n3 - r3)) : e3 && n3 < r3 && (r3 = n3 - (Ml - Cl(r3 - n3))), t3[0] = n3, t3[1] = r3;
      }
      o.prototype.increaseVersion = function() {
        this._version++;
      }, o.prototype.getVersion = function() {
        return this._version;
      }, o.prototype.setScale = function(t3, e3, n3) {
        0 < (n3 = n3 || 0) && (this._ux = wl(n3 / Kr / t3) || 0, this._uy = wl(n3 / Kr / e3) || 0);
      }, o.prototype.setDPR = function(t3) {
        this.dpr = t3;
      }, o.prototype.setContext = function(t3) {
        this._ctx = t3;
      }, o.prototype.getContext = function() {
        return this._ctx;
      }, o.prototype.beginPath = function() {
        return this._ctx && this._ctx.beginPath(), this.reset(), this;
      }, o.prototype.reset = function() {
        this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++;
      }, o.prototype.moveTo = function(t3, e3) {
        return this._drawPendingPt(), this.addData(cl.M, t3, e3), this._ctx && this._ctx.moveTo(t3, e3), this._x0 = t3, this._y0 = e3, this._xi = t3, this._yi = e3, this;
      }, o.prototype.lineTo = function(t3, e3) {
        var n3 = wl(t3 - this._xi), i3 = wl(e3 - this._yi), r3 = n3 > this._ux || i3 > this._uy;
        return this.addData(cl.L, t3, e3), this._ctx && r3 && this._ctx.lineTo(t3, e3), r3 ? (this._xi = t3, this._yi = e3, this._pendingPtDist = 0) : (r3 = n3 * n3 + i3 * i3) > this._pendingPtDist && (this._pendingPtX = t3, this._pendingPtY = e3, this._pendingPtDist = r3), this;
      }, o.prototype.bezierCurveTo = function(t3, e3, n3, i3, r3, o3) {
        return this._drawPendingPt(), this.addData(cl.C, t3, e3, n3, i3, r3, o3), this._ctx && this._ctx.bezierCurveTo(t3, e3, n3, i3, r3, o3), this._xi = r3, this._yi = o3, this;
      }, o.prototype.quadraticCurveTo = function(t3, e3, n3, i3) {
        return this._drawPendingPt(), this.addData(cl.Q, t3, e3, n3, i3), this._ctx && this._ctx.quadraticCurveTo(t3, e3, n3, i3), this._xi = n3, this._yi = i3, this;
      }, o.prototype.arc = function(t3, e3, n3, i3, r3, o3) {
        return this._drawPendingPt(), Il[0] = i3, Il[1] = r3, kl(Il, o3), this.addData(cl.A, t3, e3, n3, n3, i3 = Il[0], (r3 = Il[1]) - i3, 0, o3 ? 0 : 1), this._ctx && this._ctx.arc(t3, e3, n3, i3, r3, o3), this._xi = xl(r3) * n3 + t3, this._yi = bl(r3) * n3 + e3, this;
      }, o.prototype.arcTo = function(t3, e3, n3, i3, r3) {
        return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t3, e3, n3, i3, r3), this;
      }, o.prototype.rect = function(t3, e3, n3, i3) {
        return this._drawPendingPt(), this._ctx && this._ctx.rect(t3, e3, n3, i3), this.addData(cl.R, t3, e3, n3, i3), this;
      }, o.prototype.closePath = function() {
        this._drawPendingPt(), this.addData(cl.Z);
        var t3 = this._ctx, e3 = this._x0, n3 = this._y0;
        return t3 && t3.closePath(), this._xi = e3, this._yi = n3, this;
      }, o.prototype.fill = function(t3) {
        t3 && t3.fill(), this.toStatic();
      }, o.prototype.stroke = function(t3) {
        t3 && t3.stroke(), this.toStatic();
      }, o.prototype.len = function() {
        return this._len;
      }, o.prototype.setData = function(t3) {
        if (this._saveData) {
          var e3 = t3.length;
          this.data && this.data.length === e3 || !Tl || (this.data = new Float32Array(e3));
          for (var n3 = 0; n3 < e3; n3++)
            this.data[n3] = t3[n3];
          this._len = e3;
        }
      }, o.prototype.appendPath = function(t3) {
        if (this._saveData) {
          for (var e3 = (t3 = t3 instanceof Array ? t3 : [t3]).length, n3 = 0, i3 = this._len, r3 = 0; r3 < e3; r3++)
            n3 += t3[r3].len();
          var o3 = this.data;
          if (Tl && (o3 instanceof Float32Array || !o3) && (this.data = new Float32Array(i3 + n3), 0 < i3) && o3)
            for (var a3 = 0; a3 < i3; a3++)
              this.data[a3] = o3[a3];
          for (r3 = 0; r3 < e3; r3++)
            for (var s3 = t3[r3].data, a3 = 0; a3 < s3.length; a3++)
              this.data[i3++] = s3[a3];
          this._len = i3;
        }
      }, o.prototype.addData = function(t3, e3, n3, i3, r3, o3, a3, s3, l3) {
        if (this._saveData) {
          var u3 = this.data;
          this._len + arguments.length > u3.length && (this._expandData(), u3 = this.data);
          for (var h3 = 0; h3 < arguments.length; h3++)
            u3[this._len++] = arguments[h3];
        }
      }, o.prototype._drawPendingPt = function() {
        0 < this._pendingPtDist && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0);
      }, o.prototype._expandData = function() {
        if (!(this.data instanceof Array)) {
          for (var t3 = [], e3 = 0; e3 < this._len; e3++)
            t3[e3] = this.data[e3];
          this.data = t3;
        }
      }, o.prototype.toStatic = function() {
        var t3;
        this._saveData && (this._drawPendingPt(), (t3 = this.data) instanceof Array) && (t3.length = this._len, Tl) && 11 < this._len && (this.data = new Float32Array(t3));
      }, o.prototype.getBoundingRect = function() {
        fl[0] = fl[1] = yl[0] = yl[1] = Number.MAX_VALUE, gl[0] = gl[1] = ml[0] = ml[1] = -Number.MAX_VALUE;
        for (var t3, e3 = this.data, n3 = 0, i3 = 0, r3 = 0, o3 = 0, a3 = 0; a3 < this._len; ) {
          var z3 = e3[a3++], B3 = 1 === a3;
          switch (B3 && (r3 = n3 = e3[a3], o3 = i3 = e3[a3 + 1]), z3) {
            case cl.M:
              n3 = r3 = e3[a3++], i3 = o3 = e3[a3++], yl[0] = r3, yl[1] = o3, ml[0] = r3, ml[1] = o3;
              break;
            case cl.L:
              ll(n3, i3, e3[a3], e3[a3 + 1], yl, ml), n3 = e3[a3++], i3 = e3[a3++];
              break;
            case cl.C:
              H3 = G3 = m3 = y3 = F3 = g3 = f3 = d3 = p3 = c3 = V3 = E3 = h3 = u3 = l3 = s3 = void 0;
              var s3 = n3, l3 = i3, u3 = e3[a3++], h3 = e3[a3++], E3 = e3[a3++], V3 = e3[a3++], c3 = e3[a3], p3 = e3[a3 + 1], d3 = yl, f3 = ml, g3 = hi, F3 = si, y3 = g3(s3, u3, E3, c3, ul);
              d3[0] = 1 / 0, d3[1] = 1 / 0, f3[0] = -1 / 0, f3[1] = -1 / 0;
              for (var m3 = 0; m3 < y3; m3++) {
                var G3 = F3(s3, u3, E3, c3, ul[m3]);
                d3[0] = tl(G3, d3[0]), f3[0] = el(G3, f3[0]);
              }
              for (y3 = g3(l3, h3, V3, p3, hl), m3 = 0; m3 < y3; m3++) {
                var H3 = F3(l3, h3, V3, p3, hl[m3]);
                d3[1] = tl(H3, d3[1]), f3[1] = el(H3, f3[1]);
              }
              d3[0] = tl(s3, d3[0]), f3[0] = el(s3, f3[0]), d3[0] = tl(c3, d3[0]), f3[0] = el(c3, f3[0]), d3[1] = tl(l3, d3[1]), f3[1] = el(l3, f3[1]), d3[1] = tl(p3, d3[1]), f3[1] = el(p3, f3[1]), n3 = e3[a3++], i3 = e3[a3++];
              break;
            case cl.Q:
              g3 = n3, P3 = i3, M3 = e3[a3++], x3 = e3[a3++], S3 = e3[a3], v3 = e3[a3 + 1], w3 = yl, T3 = ml, t3 = b3 = t3 = _3 = void 0, _3 = di, t3 = el(tl((b3 = gi)(g3, M3, S3), 1), 0), b3 = el(tl(b3(P3, x3, v3), 1), 0), M3 = _3(g3, M3, S3, t3), t3 = _3(P3, x3, v3, b3), w3[0] = tl(g3, S3, M3), w3[1] = tl(P3, v3, t3), T3[0] = el(g3, S3, M3), T3[1] = el(P3, v3, t3), n3 = e3[a3++], i3 = e3[a3++];
              break;
            case cl.A:
              var v3, _3 = e3[a3++], x3 = e3[a3++], b3 = e3[a3++], w3 = e3[a3++], S3 = e3[a3++], M3 = e3[a3++] + S3, T3 = (a3 += 1, !e3[a3++]), I3 = (B3 && (r3 = xl(S3) * b3 + _3, o3 = bl(S3) * w3 + x3), N3 = v3 = U3 = W3 = R3 = O3 = P3 = L3 = A3 = D3 = k3 = C3 = I3 = void 0, _3), C3 = x3, k3 = b3, D3 = w3, A3 = S3, L3 = M3, P3 = T3, O3 = yl, R3 = ml, W3 = ue, U3 = he;
              if ((v3 = Math.abs(A3 - L3)) % rl < 1e-4 && 1e-4 < v3)
                O3[0] = I3 - k3, O3[1] = C3 - D3, R3[0] = I3 + k3, R3[1] = C3 + D3;
              else {
                ol[0] = il(A3) * k3 + I3, ol[1] = nl(A3) * D3 + C3, al[0] = il(L3) * k3 + I3, al[1] = nl(L3) * D3 + C3, W3(O3, ol, al), U3(R3, ol, al), (A3 %= rl) < 0 && (A3 += rl), (L3 %= rl) < 0 && (L3 += rl), L3 < A3 && !P3 ? L3 += rl : A3 < L3 && P3 && (A3 += rl), P3 && (v3 = L3, L3 = A3, A3 = v3);
                for (var N3 = 0; N3 < L3; N3 += Math.PI / 2)
                  A3 < N3 && (sl[0] = il(N3) * k3 + I3, sl[1] = nl(N3) * D3 + C3, W3(O3, sl, O3), U3(R3, sl, R3));
              }
              n3 = xl(M3) * b3 + _3, i3 = bl(M3) * w3 + x3;
              break;
            case cl.R:
              ll(r3 = n3 = e3[a3++], o3 = i3 = e3[a3++], r3 + e3[a3++], o3 + e3[a3++], yl, ml);
              break;
            case cl.Z:
              n3 = r3, i3 = o3;
          }
          ue(fl, fl, yl), he(gl, gl, ml);
        }
        return 0 === a3 && (fl[0] = fl[1] = gl[0] = gl[1] = 0), new Z(fl[0], fl[1], gl[0] - fl[0], gl[1] - fl[1]);
      }, o.prototype._calculateLength = function() {
        for (var t3 = this.data, e3 = this._len, n3 = this._ux, i3 = this._uy, r3 = 0, o3 = 0, a3 = 0, s3 = 0, l3 = (this._pathSegLen || (this._pathSegLen = []), this._pathSegLen), u3 = 0, h3 = 0, c3 = 0; c3 < e3; ) {
          var p3 = t3[c3++], d3 = 1 === c3, f3 = (d3 && (a3 = r3 = t3[c3], s3 = o3 = t3[c3 + 1]), -1);
          switch (p3) {
            case cl.M:
              r3 = a3 = t3[c3++], o3 = s3 = t3[c3++];
              break;
            case cl.L:
              var g3 = t3[c3++], y3 = (_3 = t3[c3++]) - o3;
              (wl(C3 = g3 - r3) > n3 || wl(y3) > i3 || c3 === e3 - 1) && (f3 = Math.sqrt(C3 * C3 + y3 * y3), r3 = g3, o3 = _3);
              break;
            case cl.C:
              var m3 = t3[c3++], v3 = t3[c3++], g3 = t3[c3++], _3 = t3[c3++], x3 = t3[c3++], b3 = t3[c3++], f3 = function(t4, e4, n4, i4, r4, o4, a4, s4, l4) {
                for (var u4 = t4, h4 = e4, c4 = 0, p4 = 1 / l4, d4 = 1; d4 <= l4; d4++) {
                  var f4 = d4 * p4, g4 = si(t4, n4, r4, a4, f4), f4 = si(e4, i4, o4, s4, f4), y4 = g4 - u4, m4 = f4 - h4;
                  c4 += Math.sqrt(y4 * y4 + m4 * m4), u4 = g4, h4 = f4;
                }
                return c4;
              }(r3, o3, m3, v3, g3, _3, x3, b3, 10), r3 = x3, o3 = b3;
              break;
            case cl.Q:
              f3 = function(t4, e4, n4, i4, r4, o4, a4) {
                for (var s4 = t4, l4 = e4, u4 = 0, h4 = 1 / a4, c4 = 1; c4 <= a4; c4++) {
                  var p4 = c4 * h4, d4 = di(t4, n4, r4, p4), p4 = di(e4, i4, o4, p4), f4 = d4 - s4, g4 = p4 - l4;
                  u4 += Math.sqrt(f4 * f4 + g4 * g4), s4 = d4, l4 = p4;
                }
                return u4;
              }(r3, o3, m3 = t3[c3++], v3 = t3[c3++], g3 = t3[c3++], _3 = t3[c3++], 10), r3 = g3, o3 = _3;
              break;
            case cl.A:
              var x3 = t3[c3++], b3 = t3[c3++], w3 = t3[c3++], S3 = t3[c3++], M3 = t3[c3++], T3 = t3[c3++], I3 = T3 + M3;
              c3 += 1, d3 && (a3 = xl(M3) * w3 + x3, s3 = bl(M3) * S3 + b3), f3 = _l(w3, S3) * vl(Ml, Math.abs(T3)), r3 = xl(I3) * w3 + x3, o3 = bl(I3) * S3 + b3;
              break;
            case cl.R:
              a3 = r3 = t3[c3++], s3 = o3 = t3[c3++];
              f3 = 2 * t3[c3++] + 2 * t3[c3++];
              break;
            case cl.Z:
              var C3 = a3 - r3, y3 = s3 - o3;
              f3 = Math.sqrt(C3 * C3 + y3 * y3), r3 = a3, o3 = s3;
          }
          0 <= f3 && (u3 += l3[h3++] = f3);
        }
        return this._pathLen = u3;
      }, o.prototype.rebuildPath = function(t3, e3) {
        var n3, i3, r3, o3, a3, s3, l3, u3, h3 = this.data, z3 = this._ux, B3 = this._uy, E3 = this._len, c3 = e3 < 1, p3 = 0, d3 = 0, f3 = 0;
        if (!c3 || (this._pathSegLen || this._calculateLength(), a3 = this._pathSegLen, s3 = e3 * this._pathLen))
          t:
            for (var g3 = 0; g3 < E3; ) {
              var y3 = h3[g3++], V3 = 1 === g3;
              switch (V3 && (n3 = r3 = h3[g3], i3 = o3 = h3[g3 + 1]), y3 !== cl.L && 0 < f3 && (t3.lineTo(l3, u3), f3 = 0), y3) {
                case cl.M:
                  n3 = r3 = h3[g3++], i3 = o3 = h3[g3++], t3.moveTo(r3, o3);
                  break;
                case cl.L:
                  var m3 = h3[g3++], v3 = h3[g3++], _3 = wl(m3 - r3), x3 = wl(v3 - o3);
                  if (z3 < _3 || B3 < x3) {
                    if (c3) {
                      if (s3 < p3 + (N3 = a3[d3++])) {
                        var b3 = (s3 - p3) / N3;
                        t3.lineTo(r3 * (1 - b3) + m3 * b3, o3 * (1 - b3) + v3 * b3);
                        break t;
                      }
                      p3 += N3;
                    }
                    t3.lineTo(m3, v3), r3 = m3, o3 = v3, f3 = 0;
                  } else {
                    _3 = _3 * _3 + x3 * x3;
                    f3 < _3 && (l3 = m3, u3 = v3, f3 = _3);
                  }
                  break;
                case cl.C:
                  var w3 = h3[g3++], S3 = h3[g3++], M3 = h3[g3++], T3 = h3[g3++], x3 = h3[g3++], _3 = h3[g3++];
                  if (c3) {
                    if (s3 < p3 + (N3 = a3[d3++])) {
                      ci(r3, w3, M3, x3, b3 = (s3 - p3) / N3, pl), ci(o3, S3, T3, _3, b3, dl), t3.bezierCurveTo(pl[1], dl[1], pl[2], dl[2], pl[3], dl[3]);
                      break t;
                    }
                    p3 += N3;
                  }
                  t3.bezierCurveTo(w3, S3, M3, T3, x3, _3), r3 = x3, o3 = _3;
                  break;
                case cl.Q:
                  w3 = h3[g3++], S3 = h3[g3++], M3 = h3[g3++], T3 = h3[g3++];
                  if (c3) {
                    if (s3 < p3 + (N3 = a3[d3++])) {
                      yi(r3, w3, M3, b3 = (s3 - p3) / N3, pl), yi(o3, S3, T3, b3, dl), t3.quadraticCurveTo(pl[1], dl[1], pl[2], dl[2]);
                      break t;
                    }
                    p3 += N3;
                  }
                  t3.quadraticCurveTo(w3, S3, M3, T3), r3 = M3, o3 = T3;
                  break;
                case cl.A:
                  var I3 = h3[g3++], C3 = h3[g3++], k3 = h3[g3++], D3 = h3[g3++], A3 = h3[g3++], L3 = h3[g3++], P3 = h3[g3++], F3 = !h3[g3++], G3 = D3 < k3 ? k3 : D3, O3 = 1e-3 < wl(k3 - D3), R3 = A3 + L3, H3 = false;
                  if (c3 && (s3 < p3 + (N3 = a3[d3++]) && (R3 = A3 + L3 * (s3 - p3) / N3, H3 = true), p3 += N3), O3 && t3.ellipse ? t3.ellipse(I3, C3, k3, D3, P3, A3, R3, F3) : t3.arc(I3, C3, G3, A3, R3, F3), H3)
                    break t;
                  V3 && (n3 = xl(A3) * k3 + I3, i3 = bl(A3) * D3 + C3), r3 = xl(R3) * k3 + I3, o3 = bl(R3) * D3 + C3;
                  break;
                case cl.R:
                  n3 = r3 = h3[g3], i3 = o3 = h3[g3 + 1], m3 = h3[g3++], v3 = h3[g3++];
                  var N3, L3 = h3[g3++], O3 = h3[g3++];
                  if (c3) {
                    if (s3 < p3 + (N3 = a3[d3++])) {
                      P3 = s3 - p3;
                      t3.moveTo(m3, v3), t3.lineTo(m3 + vl(P3, L3), v3), 0 < (P3 -= L3) && t3.lineTo(m3 + L3, v3 + vl(P3, O3)), 0 < (P3 -= O3) && t3.lineTo(m3 + _l(L3 - P3, 0), v3 + O3), 0 < (P3 -= L3) && t3.lineTo(m3, v3 + _l(O3 - P3, 0));
                      break t;
                    }
                    p3 += N3;
                  }
                  t3.rect(m3, v3, L3, O3);
                  break;
                case cl.Z:
                  if (c3) {
                    if (s3 < p3 + (N3 = a3[d3++])) {
                      b3 = (s3 - p3) / N3;
                      t3.lineTo(r3 * (1 - b3) + n3 * b3, o3 * (1 - b3) + i3 * b3);
                      break t;
                    }
                    p3 += N3;
                  }
                  t3.closePath(), r3 = n3, o3 = i3;
              }
            }
      }, o.prototype.clone = function() {
        var t3 = new o(), e3 = this.data;
        return t3.data = e3.slice ? e3.slice() : Array.prototype.slice.call(e3), t3._len = this._len, t3;
      }, o.prototype.canSave = function() {
        return !!this._saveData;
      }, o.CMD = cl, o.initDefaultProps = ((e = o.prototype)._saveData = true, e._ux = 0, e._uy = 0, e._pendingPtDist = 0, void (e._version = 0));
      var Dl = o;
      function o(t3) {
        this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t3 && (this._saveData = false), this._saveData && (this.data = []);
      }
      function Al(t3, e3, n3, i3, r3, o3, a3) {
        var s3;
        if (0 !== r3)
          return s3 = 0, !(e3 + (r3 = r3) < a3 && i3 + r3 < a3 || a3 < e3 - r3 && a3 < i3 - r3 || t3 + r3 < o3 && n3 + r3 < o3 || o3 < t3 - r3 && o3 < n3 - r3) && (t3 === n3 ? Math.abs(o3 - t3) <= r3 / 2 : (o3 = (s3 = (e3 - i3) / (t3 - n3)) * o3 - a3 + (t3 * i3 - n3 * e3) / (t3 - n3)) * o3 / (s3 * s3 + 1) <= r3 / 2 * r3 / 2);
      }
      var Ll = 2 * Math.PI;
      function Pl(t3) {
        return (t3 %= Ll) < 0 && (t3 += Ll), t3;
      }
      var Ol = 2 * Math.PI;
      function Rl(t3, e3, n3, i3, r3, o3) {
        return e3 < o3 && i3 < o3 || o3 < e3 && o3 < i3 || i3 === e3 ? 0 : (n3 = (o3 = (o3 - e3) / (i3 - e3)) * (n3 - t3) + t3) === r3 ? 1 / 0 : r3 < n3 ? 1 != o3 && 0 != o3 ? i3 < e3 ? 1 : -1 : i3 < e3 ? 0.5 : -0.5 : 0;
      }
      var Nl = Dl.CMD, zl = 2 * Math.PI, Bl = 1e-4;
      var El = [-1, -1, -1], Vl = [-1, -1];
      function Fl(t3, e3, n3, i3, r3, o3, a3, s3, l3, u3) {
        if (e3 < u3 && i3 < u3 && o3 < u3 && s3 < u3 || u3 < e3 && u3 < i3 && u3 < o3 && u3 < s3)
          return 0;
        var h3 = ui(e3, i3, o3, s3, u3, El);
        if (0 === h3)
          return 0;
        for (var c3, p3 = 0, d3 = -1, f3 = void 0, g3 = void 0, y3 = 0; y3 < h3; y3++) {
          var m3 = El[y3], v3 = 0 === m3 || 1 === m3 ? 0.5 : 1;
          si(t3, n3, r3, a3, m3) < l3 || (d3 < 0 && (d3 = hi(e3, i3, o3, s3, Vl), Vl[1] < Vl[0] && 1 < d3 && (c3 = void 0, c3 = Vl[0], Vl[0] = Vl[1], Vl[1] = c3), f3 = si(e3, i3, o3, s3, Vl[0]), 1 < d3) && (g3 = si(e3, i3, o3, s3, Vl[1])), 2 === d3 ? m3 < Vl[0] ? p3 += f3 < e3 ? v3 : -v3 : m3 < Vl[1] ? p3 += g3 < f3 ? v3 : -v3 : p3 += s3 < g3 ? v3 : -v3 : m3 < Vl[0] ? p3 += f3 < e3 ? v3 : -v3 : p3 += s3 < f3 ? v3 : -v3);
        }
        return p3;
      }
      function Gl(t3, e3, n3, i3, r3, o3, a3, s3) {
        if (e3 < s3 && i3 < s3 && o3 < s3 || s3 < e3 && s3 < i3 && s3 < o3)
          return 0;
        c3 = El, h3 = (l3 = e3) - 2 * (u3 = i3) + (h3 = o3), u3 = 2 * (u3 - l3), l3 -= s3 = s3, s3 = 0, oi(h3) ? ai(u3) && 0 <= (p3 = -l3 / u3) && p3 <= 1 && (c3[s3++] = p3) : oi(l3 = u3 * u3 - 4 * h3 * l3) ? 0 <= (p3 = -u3 / (2 * h3)) && p3 <= 1 && (c3[s3++] = p3) : 0 < l3 && (d3 = (-u3 - (l3 = Qn(l3))) / (2 * h3), 0 <= (p3 = (-u3 + l3) / (2 * h3)) && p3 <= 1 && (c3[s3++] = p3), 0 <= d3) && d3 <= 1 && (c3[s3++] = d3);
        var l3, u3, h3, c3, p3, d3, f3 = s3;
        if (0 === f3)
          return 0;
        var g3 = gi(e3, i3, o3);
        if (0 <= g3 && g3 <= 1) {
          for (var y3 = 0, m3 = di(e3, i3, o3, g3), v3 = 0; v3 < f3; v3++) {
            var _3 = 0 === El[v3] || 1 === El[v3] ? 0.5 : 1;
            di(t3, n3, r3, El[v3]) < a3 || (El[v3] < g3 ? y3 += m3 < e3 ? _3 : -_3 : y3 += o3 < m3 ? _3 : -_3);
          }
          return y3;
        }
        return _3 = 0 === El[0] || 1 === El[0] ? 0.5 : 1, di(t3, n3, r3, El[0]) < a3 ? 0 : o3 < e3 ? _3 : -_3;
      }
      function Hl(t3, e3, n3, i3, r3) {
        for (var o3, a3 = t3.data, s3 = t3.len(), l3 = 0, u3 = 0, h3 = 0, c3 = 0, p3 = 0, d3 = 0; d3 < s3; ) {
          var f3 = a3[d3++], g3 = 1 === d3;
          switch (f3 === Nl.M && 1 < d3 && (n3 || (l3 += Rl(u3, h3, c3, p3, i3, r3))), g3 && (c3 = u3 = a3[d3], p3 = h3 = a3[d3 + 1]), f3) {
            case Nl.M:
              u3 = c3 = a3[d3++], h3 = p3 = a3[d3++];
              break;
            case Nl.L:
              if (n3) {
                if (Al(u3, h3, a3[d3], a3[d3 + 1], e3, i3, r3))
                  return true;
              } else
                l3 += Rl(u3, h3, a3[d3], a3[d3 + 1], i3, r3) || 0;
              u3 = a3[d3++], h3 = a3[d3++];
              break;
            case Nl.C:
              if (n3) {
                if (function(t4, e4, n4, i4, r4, o4, a4, s4, l4, u4, h4) {
                  if (0 !== l4)
                    return !(e4 + (l4 = l4) < h4 && i4 + l4 < h4 && o4 + l4 < h4 && s4 + l4 < h4 || h4 < e4 - l4 && h4 < i4 - l4 && h4 < o4 - l4 && h4 < s4 - l4 || t4 + l4 < u4 && n4 + l4 < u4 && r4 + l4 < u4 && a4 + l4 < u4 || u4 < t4 - l4 && u4 < n4 - l4 && u4 < r4 - l4 && u4 < a4 - l4) && pi(t4, e4, n4, i4, r4, o4, a4, s4, u4, h4, null) <= l4 / 2;
                }(u3, h3, a3[d3++], a3[d3++], a3[d3++], a3[d3++], a3[d3], a3[d3 + 1], e3, i3, r3))
                  return true;
              } else
                l3 += Fl(u3, h3, a3[d3++], a3[d3++], a3[d3++], a3[d3++], a3[d3], a3[d3 + 1], i3, r3) || 0;
              u3 = a3[d3++], h3 = a3[d3++];
              break;
            case Nl.Q:
              if (n3) {
                if (function(t4, e4, n4, i4, r4, o4, a4, s4, l4) {
                  if (0 !== a4)
                    return !(e4 + (a4 = a4) < l4 && i4 + a4 < l4 && o4 + a4 < l4 || l4 < e4 - a4 && l4 < i4 - a4 && l4 < o4 - a4 || t4 + a4 < s4 && n4 + a4 < s4 && r4 + a4 < s4 || s4 < t4 - a4 && s4 < n4 - a4 && s4 < r4 - a4) && mi(t4, e4, n4, i4, r4, o4, s4, l4, null) <= a4 / 2;
                }(u3, h3, a3[d3++], a3[d3++], a3[d3], a3[d3 + 1], e3, i3, r3))
                  return true;
              } else
                l3 += Gl(u3, h3, a3[d3++], a3[d3++], a3[d3], a3[d3 + 1], i3, r3) || 0;
              u3 = a3[d3++], h3 = a3[d3++];
              break;
            case Nl.A:
              var y3 = a3[d3++], m3 = a3[d3++], v3 = a3[d3++], _3 = a3[d3++], x3 = a3[d3++], b3 = a3[d3++], w3 = (d3 += 1, !!(1 - a3[d3++])), S3 = Math.cos(x3) * v3 + y3, M3 = Math.sin(x3) * _3 + m3, T3 = (g3 ? (c3 = S3, p3 = M3) : l3 += Rl(u3, h3, S3, M3, i3, r3), (i3 - y3) * _3 / v3 + y3);
              if (n3) {
                if (function(t4, e4, n4, i4, r4, o4, a4, s4, l4) {
                  if (0 !== a4)
                    return a4 = a4, s4 -= t4, l4 -= e4, !(n4 < (t4 = Math.sqrt(s4 * s4 + l4 * l4)) - a4 || t4 + a4 < n4) && (Math.abs(i4 - r4) % Ol < 1e-4 || ((r4 = o4 ? (e4 = i4, i4 = Pl(r4), Pl(e4)) : (i4 = Pl(i4), Pl(r4))) < i4 && (r4 += Ol), (t4 = Math.atan2(l4, s4)) < 0 && (t4 += Ol), i4 <= t4 && t4 <= r4) || i4 <= t4 + Ol && t4 + Ol <= r4);
                }(y3, m3, _3, x3, x3 + b3, w3, e3, T3, r3))
                  return true;
              } else
                l3 += function(t4, e4, n4, i4, r4, o4, a4, s4) {
                  if (n4 < (s4 -= e4) || s4 < -n4)
                    return 0;
                  var e4 = Math.sqrt(n4 * n4 - s4 * s4);
                  if (El[0] = -e4, El[1] = e4, (n4 = Math.abs(i4 - r4)) < 1e-4)
                    return 0;
                  if (zl - 1e-4 <= n4)
                    return r4 = zl, h4 = o4 ? 1 : -1, a4 >= El[i4 = 0] + t4 && a4 <= El[1] + t4 ? h4 : 0;
                  r4 < i4 && (e4 = i4, i4 = r4, r4 = e4), i4 < 0 && (i4 += zl, r4 += zl);
                  for (var l4 = 0, u4 = 0; u4 < 2; u4++) {
                    var h4, c4 = El[u4];
                    a4 < c4 + t4 && (h4 = o4 ? 1 : -1, i4 <= (c4 = (c4 = Math.atan2(s4, c4)) < 0 ? zl + c4 : c4) && c4 <= r4 || i4 <= c4 + zl && c4 + zl <= r4) && (l4 += h4 = c4 > Math.PI / 2 && c4 < 1.5 * Math.PI ? -h4 : h4);
                  }
                  return l4;
                }(y3, m3, _3, x3, x3 + b3, w3, T3, r3);
              u3 = Math.cos(x3 + b3) * v3 + y3, h3 = Math.sin(x3 + b3) * _3 + m3;
              break;
            case Nl.R:
              c3 = u3 = a3[d3++], p3 = h3 = a3[d3++];
              if (S3 = c3 + a3[d3++], M3 = p3 + a3[d3++], n3) {
                if (Al(c3, p3, S3, p3, e3, i3, r3) || Al(S3, p3, S3, M3, e3, i3, r3) || Al(S3, M3, c3, M3, e3, i3, r3) || Al(c3, M3, c3, p3, e3, i3, r3))
                  return true;
              } else
                l3 = (l3 += Rl(S3, p3, S3, M3, i3, r3)) + Rl(c3, M3, c3, p3, i3, r3);
              break;
            case Nl.Z:
              if (n3) {
                if (Al(u3, h3, c3, p3, e3, i3, r3))
                  return true;
              } else
                l3 += Rl(u3, h3, c3, p3, i3, r3);
              u3 = c3, h3 = p3;
          }
        }
        return n3 || (t3 = h3, o3 = p3, Math.abs(t3 - o3) < Bl) || (l3 += Rl(u3, h3, c3, p3, i3, r3) || 0), 0 !== l3;
      }
      var Wl, Ul = B({ fill: "#000", stroke: null, strokePercent: 1, fillOpacity: 1, strokeOpacity: 1, lineDashOffset: 0, lineWidth: 1, lineCap: "butt", miterLimit: 10, strokeNoScale: false, strokeFirst: false }, qs), Xl = { style: B({ fill: true, stroke: true, strokePercent: true, fillOpacity: true, strokeOpacity: true, lineDashOffset: true, lineWidth: true, miterLimit: true }, Zs.style) }, Yl = ho.concat(["invisible", "culling", "z", "z2", "zlevel", "parent"]), ql = (u(a, Wl = $s), a.prototype.update = function() {
        var e3 = this, t3 = (Wl.prototype.update.call(this), this.style);
        if (t3.decal) {
          var n3, i3 = this._decalEl = this._decalEl || new a(), r3 = (i3.buildPath === a.prototype.buildPath && (i3.buildPath = function(t4) {
            e3.buildPath(t4, e3.shape);
          }), i3.silent = true, i3.style);
          for (n3 in t3)
            r3[n3] !== t3[n3] && (r3[n3] = t3[n3]);
          r3.fill = t3.fill ? t3.decal : null, r3.decal = null, r3.shadowColor = null, t3.strokeFirst && (r3.stroke = null);
          for (var o3 = 0; o3 < Yl.length; ++o3)
            i3[Yl[o3]] = this[Yl[o3]];
          i3.__dirty |= Hn;
        } else
          this._decalEl && (this._decalEl = null);
      }, a.prototype.getDecalElement = function() {
        return this._decalEl;
      }, a.prototype._init = function(t3) {
        var e3 = O(t3), n3 = (this.shape = this.getDefaultShape(), this.getDefaultStyle());
        n3 && this.useStyle(n3);
        for (var i3 = 0; i3 < e3.length; i3++) {
          var r3 = e3[i3], o3 = t3[r3];
          "style" === r3 ? this.style ? V(this.style, o3) : this.useStyle(o3) : "shape" === r3 ? V(this.shape, o3) : Wl.prototype.attrKV.call(this, r3, o3);
        }
        this.style || this.useStyle({});
      }, a.prototype.getDefaultStyle = function() {
        return null;
      }, a.prototype.getDefaultShape = function() {
        return {};
      }, a.prototype.canBeInsideText = function() {
        return this.hasFill();
      }, a.prototype.getInsideTextFill = function() {
        var t3, e3 = this.style.fill;
        if ("none" !== e3) {
          if (W(e3))
            return 0.5 < (t3 = Zi(e3, 0)) ? $r : 0.2 < t3 ? "#eee" : Qr;
          if (e3)
            return Qr;
        }
        return $r;
      }, a.prototype.getInsideTextStroke = function(t3) {
        var e3 = this.style.fill;
        if (W(e3)) {
          var n3 = this.__zr;
          if (!(!n3 || !n3.isDarkMode()) == Zi(t3, 0) < 0.4)
            return e3;
        }
      }, a.prototype.buildPath = function(t3, e3, n3) {
      }, a.prototype.pathUpdated = function() {
        this.__dirty &= ~Wn;
      }, a.prototype.getUpdatedPathProxy = function(t3) {
        return this.path || this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, t3), this.path;
      }, a.prototype.createPathProxy = function() {
        this.path = new Dl(false);
      }, a.prototype.hasStroke = function() {
        var t3 = this.style, e3 = t3.stroke;
        return !(null == e3 || "none" === e3 || !(0 < t3.lineWidth));
      }, a.prototype.hasFill = function() {
        var t3 = this.style.fill;
        return null != t3 && "none" !== t3;
      }, a.prototype.getBoundingRect = function() {
        var t3, e3, n3 = this._rect, i3 = this.style, r3 = !n3;
        return r3 && (t3 = false, this.path || (t3 = true, this.createPathProxy()), e3 = this.path, (t3 || this.__dirty & Wn) && (e3.beginPath(), this.buildPath(e3, this.shape, false), this.pathUpdated()), n3 = e3.getBoundingRect()), this._rect = n3, this.hasStroke() && this.path && 0 < this.path.len() ? (t3 = this._rectStroke || (this._rectStroke = n3.clone()), (this.__dirty || r3) && (t3.copy(n3), e3 = i3.strokeNoScale ? this.getLineScale() : 1, r3 = i3.lineWidth, this.hasFill() || (i3 = this.strokeContainThreshold, r3 = Math.max(r3, null == i3 ? 4 : i3)), 1e-10 < e3) && (t3.width += r3 / e3, t3.height += r3 / e3, t3.x -= r3 / e3 / 2, t3.y -= r3 / e3 / 2), t3) : n3;
      }, a.prototype.contain = function(t3, e3) {
        var n3 = this.transformCoordToLocal(t3, e3), i3 = this.getBoundingRect(), r3 = this.style;
        if (t3 = n3[0], e3 = n3[1], i3.contain(t3, e3)) {
          n3 = this.path;
          if (this.hasStroke()) {
            i3 = r3.lineWidth, r3 = r3.strokeNoScale ? this.getLineScale() : 1;
            if (1e-10 < r3 && (this.hasFill() || (i3 = Math.max(i3, this.strokeContainThreshold)), Hl(n3, i3 / r3, true, t3, e3)))
              return true;
          }
          if (this.hasFill())
            return Hl(n3, 0, false, t3, e3);
        }
        return false;
      }, a.prototype.dirtyShape = function() {
        this.__dirty |= Wn, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
      }, a.prototype.dirty = function() {
        this.dirtyStyle(), this.dirtyShape();
      }, a.prototype.animateShape = function(t3) {
        return this.animate("shape", t3);
      }, a.prototype.updateDuringAnimation = function(t3) {
        "style" === t3 ? this.dirtyStyle() : "shape" === t3 ? this.dirtyShape() : this.markRedraw();
      }, a.prototype.attrKV = function(t3, e3) {
        "shape" === t3 ? this.setShape(e3) : Wl.prototype.attrKV.call(this, t3, e3);
      }, a.prototype.setShape = function(t3, e3) {
        var n3 = (n3 = this.shape) || (this.shape = {});
        return "string" == typeof t3 ? n3[t3] = e3 : V(n3, t3), this.dirtyShape(), this;
      }, a.prototype.shapeChanged = function() {
        return !!(this.__dirty & Wn);
      }, a.prototype.createStyle = function(t3) {
        return Ft(Ul, t3);
      }, a.prototype._innerSaveToNormal = function(t3) {
        Wl.prototype._innerSaveToNormal.call(this, t3);
        var e3 = this._normalState;
        t3.shape && !e3.shape && (e3.shape = V({}, this.shape));
      }, a.prototype._applyStateObj = function(t3, e3, n3, i3, r3, o3) {
        if (Wl.prototype._applyStateObj.call(this, t3, e3, n3, i3, r3, o3), 1 !== this.__inHover) {
          var a3, s3 = !(e3 && i3);
          if (e3 && e3.shape ? r3 ? i3 ? a3 = e3.shape : (a3 = V({}, n3.shape), V(a3, e3.shape)) : (a3 = V({}, (i3 ? this : n3).shape), V(a3, e3.shape)) : s3 && (a3 = n3.shape), a3)
            if (r3) {
              this.shape = V({}, this.shape);
              for (var l3 = {}, u3 = O(a3), h3 = 0; h3 < u3.length; h3++) {
                var c3 = u3[h3];
                "object" == typeof a3[c3] ? this.shape[c3] = a3[c3] : l3[c3] = a3[c3];
              }
              this._transitionState(t3, { shape: l3 }, o3);
            } else
              this.shape = a3, this.dirtyShape();
        }
      }, a.prototype._mergeStates = function(t3) {
        for (var e3, n3 = Wl.prototype._mergeStates.call(this, t3), i3 = 0; i3 < t3.length; i3++) {
          var r3 = t3[i3];
          r3.shape && this._mergeStyle(e3 = e3 || {}, r3.shape);
        }
        return e3 && (n3.shape = e3), n3;
      }, a.prototype.getAnimationStyleProps = function() {
        return Xl;
      }, a.prototype.isZeroArea = function() {
        return false;
      }, a.extend = function(n3) {
        u(r3, i3 = a), r3.prototype.getDefaultStyle = function() {
          return _(n3.style);
        }, r3.prototype.getDefaultShape = function() {
          return _(n3.shape);
        };
        var i3, t3, e3 = r3;
        function r3(t4) {
          var e4 = i3.call(this, t4) || this;
          return n3.init && n3.init.call(e4, t4), e4;
        }
        for (t3 in n3)
          "function" == typeof n3[t3] && (e3.prototype[t3] = n3[t3]);
        return e3;
      }, a.initDefaultProps = ((e = a.prototype).type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = false, e.autoBatch = false, void (e.__dirty = 2 | Hn | Wn)), a);
      function a(t3) {
        return Wl.call(this, t3) || this;
      }
      var Zl, jl = B({ strokeFirst: true, font: K, x: 0, y: 0, textAlign: "left", textBaseline: "top", miterLimit: 2 }, Ul), Kl = (u($l, Zl = $s), $l.prototype.hasStroke = function() {
        return Us(this.style);
      }, $l.prototype.hasFill = function() {
        var t3 = this.style.fill;
        return null != t3 && "none" !== t3;
      }, $l.prototype.createStyle = function(t3) {
        return Ft(jl, t3);
      }, $l.prototype.setBoundingRect = function(t3) {
        this._rect = t3;
      }, $l.prototype.getBoundingRect = function() {
        var t3, e3, n3;
        return this._rect || (this._rect = (t3 = this.style, e3 = Hs(t3.text), n3 = t3.font, Ws(t3, yo(po(n3), e3), xo(n3), null))), this._rect;
      }, $l.initDefaultProps = void ($l.prototype.dirtyRectTolerance = 10), $l);
      function $l() {
        return null !== Zl && Zl.apply(this, arguments) || this;
      }
      Kl.prototype.type = "tspan";
      var Ql = B({ x: 0, y: 0 }, qs), Jl = { style: B({ x: true, y: true, width: true, height: true, sx: true, sy: true, sWidth: true, sHeight: true }, Zs.style) };
      u(nu, tu = $s), nu.prototype.createStyle = function(t3) {
        return Ft(Ql, t3);
      }, nu.prototype._getSize = function(t3) {
        var e3, n3 = this.style, i3 = n3[t3];
        return null != i3 ? i3 : (i3 = (i3 = n3.image) && "string" != typeof i3 && i3.width && i3.height ? n3.image : this.__image) ? null == (e3 = n3[n3 = "width" === t3 ? "height" : "width"]) ? i3[t3] : i3[t3] / i3[n3] * e3 : 0;
      }, nu.prototype.getWidth = function() {
        return this._getSize("width");
      }, nu.prototype.getHeight = function() {
        return this._getSize("height");
      }, nu.prototype.getAnimationStyleProps = function() {
        return Jl;
      }, nu.prototype.getBoundingRect = function() {
        var t3 = this.style;
        return this._rect || (this._rect = new Z(t3.x || 0, t3.y || 0, this.getWidth(), this.getHeight())), this._rect;
      };
      var tu, eu = nu;
      function nu() {
        return null !== tu && tu.apply(this, arguments) || this;
      }
      eu.prototype.type = "image";
      var iu = Math.round;
      function ru(t3, e3, n3) {
        var i3, r3, o3;
        if (e3)
          return i3 = e3.x1, r3 = e3.x2, o3 = e3.y1, e3 = e3.y2, t3.x1 = i3, t3.x2 = r3, t3.y1 = o3, t3.y2 = e3, (n3 = n3 && n3.lineWidth) && (iu(2 * i3) === iu(2 * r3) && (t3.x1 = t3.x2 = ou(i3, n3, true)), iu(2 * o3) === iu(2 * e3)) && (t3.y1 = t3.y2 = ou(o3, n3, true)), t3;
      }
      function ou(t3, e3, n3) {
        var i3;
        return e3 ? ((i3 = iu(2 * t3)) + iu(e3)) % 2 == 0 ? i3 / 2 : (i3 + (n3 ? 1 : -1)) / 2 : t3;
      }
      var au, su = function() {
        this.x = 0, this.y = 0, this.width = 0, this.height = 0;
      }, lu = {}, uu = (u(hu, au = ql), hu.prototype.getDefaultShape = function() {
        return new su();
      }, hu.prototype.buildPath = function(t3, e3) {
        var n3, i3, r3, o3, a3, s3, l3, u3, h3, c3, p3, d3, f3, g3;
        this.subPixelOptimize ? (n3 = (a3 = function(t4, e4, n4) {
          var i4, r4, o4;
          if (e4)
            return i4 = e4.x, r4 = e4.y, o4 = e4.width, e4 = e4.height, t4.x = i4, t4.y = r4, t4.width = o4, t4.height = e4, (n4 = n4 && n4.lineWidth) && (t4.x = ou(i4, n4, true), t4.y = ou(r4, n4, true), t4.width = Math.max(ou(i4 + o4, n4, false) - t4.x, 0 === o4 ? 0 : 1), t4.height = Math.max(ou(r4 + e4, n4, false) - t4.y, 0 === e4 ? 0 : 1)), t4;
        }(lu, e3, this.style)).x, i3 = a3.y, r3 = a3.width, o3 = a3.height, a3.r = e3.r, e3 = a3) : (n3 = e3.x, i3 = e3.y, r3 = e3.width, o3 = e3.height), e3.r ? (a3 = t3, p3 = (e3 = e3).x, d3 = e3.y, f3 = e3.width, g3 = e3.height, e3 = e3.r, f3 < 0 && (p3 += f3, f3 = -f3), g3 < 0 && (d3 += g3, g3 = -g3), "number" == typeof e3 ? s3 = l3 = u3 = h3 = e3 : e3 instanceof Array ? 1 === e3.length ? s3 = l3 = u3 = h3 = e3[0] : 2 === e3.length ? (s3 = u3 = e3[0], l3 = h3 = e3[1]) : 3 === e3.length ? (s3 = e3[0], l3 = h3 = e3[1], u3 = e3[2]) : (s3 = e3[0], l3 = e3[1], u3 = e3[2], h3 = e3[3]) : s3 = l3 = u3 = h3 = 0, f3 < s3 + l3 && (s3 *= f3 / (c3 = s3 + l3), l3 *= f3 / c3), f3 < u3 + h3 && (u3 *= f3 / (c3 = u3 + h3), h3 *= f3 / c3), g3 < l3 + u3 && (l3 *= g3 / (c3 = l3 + u3), u3 *= g3 / c3), g3 < s3 + h3 && (s3 *= g3 / (c3 = s3 + h3), h3 *= g3 / c3), a3.moveTo(p3 + s3, d3), a3.lineTo(p3 + f3 - l3, d3), 0 !== l3 && a3.arc(p3 + f3 - l3, d3 + l3, l3, -Math.PI / 2, 0), a3.lineTo(p3 + f3, d3 + g3 - u3), 0 !== u3 && a3.arc(p3 + f3 - u3, d3 + g3 - u3, u3, 0, Math.PI / 2), a3.lineTo(p3 + h3, d3 + g3), 0 !== h3 && a3.arc(p3 + h3, d3 + g3 - h3, h3, Math.PI / 2, Math.PI), a3.lineTo(p3, d3 + s3), 0 !== s3 && a3.arc(p3 + s3, d3 + s3, s3, Math.PI, 1.5 * Math.PI), a3.closePath()) : t3.rect(n3, i3, r3, o3);
      }, hu.prototype.isZeroArea = function() {
        return !this.shape.width || !this.shape.height;
      }, hu);
      function hu(t3) {
        return au.call(this, t3) || this;
      }
      uu.prototype.type = "rect";
      var cu, pu = { fill: "#000" }, du = {}, fu = { style: B({ fill: true, stroke: true, fillOpacity: true, strokeOpacity: true, lineWidth: true, fontSize: true, lineHeight: true, width: true, height: true, textShadowColor: true, textShadowBlur: true, textShadowOffsetX: true, textShadowOffsetY: true, backgroundColor: true, padding: true, borderColor: true, borderWidth: true, borderRadius: true }, Zs.style) }, gu = (u(yu, cu = $s), yu.prototype.childrenRef = function() {
        return this._children;
      }, yu.prototype.update = function() {
        cu.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
        for (var t3 = 0; t3 < this._children.length; t3++) {
          var e3 = this._children[t3];
          e3.zlevel = this.zlevel, e3.z = this.z, e3.z2 = this.z2, e3.culling = this.culling, e3.cursor = this.cursor, e3.invisible = this.invisible;
        }
      }, yu.prototype.updateTransform = function() {
        var t3 = this.innerTransformable;
        t3 ? (t3.updateTransform(), t3.transform && (this.transform = t3.transform)) : cu.prototype.updateTransform.call(this);
      }, yu.prototype.getLocalTransform = function(t3) {
        var e3 = this.innerTransformable;
        return e3 ? e3.getLocalTransform(t3) : cu.prototype.getLocalTransform.call(this, t3);
      }, yu.prototype.getComputedTransform = function() {
        return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(true)), cu.prototype.getComputedTransform.call(this);
      }, yu.prototype._updateSubTexts = function() {
        var t3;
        this._childCursor = 0, Su(t3 = this.style), F(t3.rich, Su), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
      }, yu.prototype.addSelfToZr = function(t3) {
        cu.prototype.addSelfToZr.call(this, t3);
        for (var e3 = 0; e3 < this._children.length; e3++)
          this._children[e3].__zr = t3;
      }, yu.prototype.removeSelfFromZr = function(t3) {
        cu.prototype.removeSelfFromZr.call(this, t3);
        for (var e3 = 0; e3 < this._children.length; e3++)
          this._children[e3].__zr = null;
      }, yu.prototype.getBoundingRect = function() {
        if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
          for (var t3 = new Z(0, 0, 0, 0), e3 = this._children, n3 = [], i3 = null, r3 = 0; r3 < e3.length; r3++) {
            var o3 = e3[r3], a3 = o3.getBoundingRect(), o3 = o3.getLocalTransform(n3);
            o3 ? (t3.copy(a3), t3.applyTransform(o3), (i3 = i3 || t3.clone()).union(t3)) : (i3 = i3 || a3.clone()).union(a3);
          }
          this._rect = i3 || t3;
        }
        return this._rect;
      }, yu.prototype.setDefaultTextStyle = function(t3) {
        this._defaultStyle = t3 || pu;
      }, yu.prototype.setTextContent = function(t3) {
      }, yu.prototype._mergeStyle = function(t3, e3) {
        var n3, i3;
        return e3 && (n3 = e3.rich, i3 = t3.rich || n3 && {}, V(t3, e3), n3 && i3 ? (this._mergeRich(i3, n3), t3.rich = i3) : i3 && (t3.rich = i3)), t3;
      }, yu.prototype._mergeRich = function(t3, e3) {
        for (var n3 = O(e3), i3 = 0; i3 < n3.length; i3++) {
          var r3 = n3[i3];
          t3[r3] = t3[r3] || {}, V(t3[r3], e3[r3]);
        }
      }, yu.prototype.getAnimationStyleProps = function() {
        return fu;
      }, yu.prototype._getOrCreateChild = function(t3) {
        var e3 = this._children[this._childCursor];
        return e3 && e3 instanceof t3 || (e3 = new t3()), (this._children[this._childCursor++] = e3).__zr = this.__zr, e3.parent = this, e3;
      }, yu.prototype._updatePlainTexts = function() {
        var t3 = this.style, e3 = t3.font || K, n3 = t3.padding, i3 = this._defaultStyle, r3 = t3.x || 0, o3 = t3.y || 0, a3 = t3.align || i3.align || "left", s3 = t3.verticalAlign || i3.verticalAlign || "top";
        Vs(du, i3.overflowRect, r3, o3, a3, s3);
        for (var l3, r3 = du.baseX, o3 = du.baseY, u3 = function(t4, e4, n4, i4) {
          var r4, t4 = Hs(t4), o4 = e4.overflow, a4 = (s4 = e4.padding) ? s4[1] + s4[3] : 0, s4 = s4 ? s4[0] + s4[2] : 0, l4 = e4.font, u4 = "truncate" === o4, h4 = xo(l4), c4 = Y(e4.lineHeight, h4), p4 = "truncate" === e4.lineOverflow, d4 = false, f4 = e4.width, g4 = e4.height, i4 = (null == g4 && null != i4 && (g4 = i4 - s4), (r4 = null == (f4 = null == f4 && null != n4 ? n4 - a4 : f4) || "break" !== o4 && "breakAll" !== o4 ? t4 ? t4.split("\n") : [] : t4 ? Es(t4, e4.font, f4, "breakAll" === o4, 0).lines : []).length * c4);
          if ((g4 = null == g4 ? i4 : g4) < i4 && p4 && (n4 = Math.floor(g4 / c4), d4 = d4 || r4.length > n4, i4 = (r4 = r4.slice(0, n4)).length * c4), t4 && u4 && null != f4)
            for (var y4 = As(f4, l4, e4.ellipsis, { minChar: e4.truncateMinChar, placeholder: e4.placeholder }), m4 = {}, v4 = 0; v4 < r4.length; v4++)
              Ls(m4, r4[v4], y4), r4[v4] = m4.textLine, d4 = d4 || m4.isTruncated;
          for (var o4 = g4, _4 = 0, x4 = po(l4), v4 = 0; v4 < r4.length; v4++)
            _4 = Math.max(yo(x4, r4[v4]), _4);
          return p4 = f4 = null == f4 ? _4 : f4, { lines: r4, height: g4, outerWidth: p4 += a4, outerHeight: o4 += s4, lineHeight: c4, calculatedLineHeight: h4, contentWidth: _4, contentHeight: i4, width: f4, isTruncated: d4 };
        }(Cu(t3), t3, du.outerWidth, du.outerHeight), h3 = ku(t3), c3 = !!t3.backgroundColor, p3 = u3.outerHeight, d3 = u3.outerWidth, f3 = u3.lines, g3 = u3.lineHeight, y3 = (this.isTruncated = !!u3.isTruncated, r3), m3 = _o(o3, u3.contentHeight, s3), v3 = ((h3 || n3) && (l3 = vo(r3, d3, a3), o3 = _o(o3, p3, s3), h3) && this._renderBackground(t3, t3, l3, o3, d3, p3), m3 += g3 / 2, n3 && (y3 = Iu(r3, a3, n3), "top" === s3 ? m3 += n3[0] : "bottom" === s3 && (m3 -= n3[2])), 0), _3 = false, h3 = false, x3 = Tu(("fill" in t3 ? t3 : (h3 = true, i3)).fill), b3 = Mu("stroke" in t3 ? t3.stroke : c3 || i3.autoStroke && !h3 ? null : (v3 = 2, _3 = true, i3.stroke)), w3 = 0 < t3.textShadowBlur, S3 = 0; S3 < f3.length; S3++) {
          var M3 = this._getOrCreateChild(Kl), T3 = M3.createStyle();
          M3.useStyle(T3), T3.text = f3[S3], T3.x = y3, T3.y = m3, a3 && (T3.textAlign = a3), T3.textBaseline = "middle", T3.opacity = t3.opacity, T3.strokeFirst = true, w3 && (T3.shadowBlur = t3.textShadowBlur || 0, T3.shadowColor = t3.textShadowColor || "transparent", T3.shadowOffsetX = t3.textShadowOffsetX || 0, T3.shadowOffsetY = t3.textShadowOffsetY || 0), T3.stroke = b3, T3.fill = x3, b3 && (T3.lineWidth = t3.lineWidth || v3, T3.lineDash = t3.lineDash, T3.lineDashOffset = t3.lineDashOffset || 0), T3.font = e3, bu(T3, t3), m3 += g3, M3.setBoundingRect(Ws(T3, u3.contentWidth, u3.calculatedLineHeight, _3 ? 0 : null));
        }
      }, yu.prototype._updateRichTexts = function() {
        var t3 = this.style, e3 = this._defaultStyle, n3 = t3.align || e3.align, i3 = t3.verticalAlign || e3.verticalAlign, r3 = t3.x || 0, o3 = t3.y || 0;
        Vs(du, e3.overflowRect, r3, o3, n3, i3);
        for (var r3 = du.baseX, o3 = du.baseY, a3 = Ns(Cu(t3), t3, du.outerWidth, du.outerHeight, n3), s3 = a3.width, e3 = a3.outerWidth, l3 = a3.outerHeight, u3 = t3.padding, r3 = (this.isTruncated = !!a3.isTruncated, vo(r3, e3, n3)), n3 = _o(o3, l3, i3), h3 = r3, c3 = n3, p3 = (u3 && (h3 += u3[3], c3 += u3[0]), h3 + s3), d3 = (ku(t3) && this._renderBackground(t3, t3, r3, n3, e3, l3), !!t3.backgroundColor), f3 = 0; f3 < a3.lines.length; f3++) {
          for (var g3 = a3.lines[f3], y3 = g3.tokens, m3 = y3.length, v3 = g3.lineHeight, _3 = g3.width, x3 = 0, b3 = h3, w3 = p3, S3 = m3 - 1, M3 = void 0; x3 < m3 && (!(M3 = y3[x3]).align || "left" === M3.align); )
            this._placeToken(M3, t3, v3, c3, b3, "left", d3), _3 -= M3.width, b3 += M3.width, x3++;
          for (; 0 <= S3 && "right" === (M3 = y3[S3]).align; )
            this._placeToken(M3, t3, v3, c3, w3, "right", d3), _3 -= M3.width, w3 -= M3.width, S3--;
          for (b3 += (s3 - (b3 - h3) - (p3 - w3) - _3) / 2; x3 <= S3; )
            M3 = y3[x3], this._placeToken(M3, t3, v3, c3, b3 + M3.width / 2, "center", d3), b3 += M3.width, x3++;
          c3 += v3;
        }
      }, yu.prototype._placeToken = function(t3, e3, n3, i3, r3, o3, a3) {
        var s3 = e3.rich[t3.styleName] || {}, l3 = (s3.text = t3.text, t3.verticalAlign), u3 = i3 + n3 / 2;
        "top" === l3 ? u3 = i3 + t3.height / 2 : "bottom" === l3 && (u3 = i3 + n3 - t3.height / 2);
        !t3.isLineHolder && ku(s3) && this._renderBackground(s3, e3, "right" === o3 ? r3 - t3.width : "center" === o3 ? r3 - t3.width / 2 : r3, u3 - t3.height / 2, t3.width, t3.height);
        var l3 = !!s3.backgroundColor, i3 = t3.textPadding, n3 = (i3 && (r3 = Iu(r3, o3, i3), u3 -= t3.height / 2 - i3[0] - t3.innerHeight / 2), this._getOrCreateChild(Kl)), i3 = n3.createStyle(), h3 = (n3.useStyle(i3), this._defaultStyle), c3 = false, p3 = 0, d3 = false, f3 = Tu(("fill" in s3 ? s3 : "fill" in e3 ? e3 : (c3 = true, h3)).fill), l3 = Mu("stroke" in s3 ? s3.stroke : "stroke" in e3 ? e3.stroke : l3 || a3 || h3.autoStroke && !c3 ? null : (p3 = 2, d3 = true, h3.stroke)), a3 = 0 < s3.textShadowBlur || 0 < e3.textShadowBlur;
        i3.text = t3.text, i3.x = r3, i3.y = u3, a3 && (i3.shadowBlur = s3.textShadowBlur || e3.textShadowBlur || 0, i3.shadowColor = s3.textShadowColor || e3.textShadowColor || "transparent", i3.shadowOffsetX = s3.textShadowOffsetX || e3.textShadowOffsetX || 0, i3.shadowOffsetY = s3.textShadowOffsetY || e3.textShadowOffsetY || 0), i3.textAlign = o3, i3.textBaseline = "middle", i3.font = t3.font || K, i3.opacity = It(s3.opacity, e3.opacity, 1), bu(i3, s3), l3 && (i3.lineWidth = It(s3.lineWidth, e3.lineWidth, p3), i3.lineDash = Y(s3.lineDash, e3.lineDash), i3.lineDashOffset = e3.lineDashOffset || 0, i3.stroke = l3), f3 && (i3.fill = f3), n3.setBoundingRect(Ws(i3, t3.contentWidth, t3.contentHeight, d3 ? 0 : null));
      }, yu.prototype._renderBackground = function(t3, e3, n3, i3, r3, o3) {
        var a3, s3, l3, u3, h3 = t3.backgroundColor, c3 = t3.borderWidth, p3 = t3.borderColor, d3 = h3 && h3.image, f3 = h3 && !d3, g3 = t3.borderRadius, y3 = this, g3 = ((f3 || t3.lineHeight || c3 && p3) && ((a3 = this._getOrCreateChild(uu)).useStyle(a3.createStyle()), a3.style.fill = null, (l3 = a3.shape).x = n3, l3.y = i3, l3.width = r3, l3.height = o3, l3.r = g3, a3.dirtyShape()), f3 ? ((u3 = a3.style).fill = h3 || null, u3.fillOpacity = Y(t3.fillOpacity, 1)) : d3 && ((s3 = this._getOrCreateChild(eu)).onload = function() {
          y3.dirtyStyle();
        }, (l3 = s3.style).image = h3.image, l3.x = n3, l3.y = i3, l3.width = r3, l3.height = o3), c3 && p3 && ((u3 = a3.style).lineWidth = c3, u3.stroke = p3, u3.strokeOpacity = Y(t3.strokeOpacity, 1), u3.lineDash = t3.borderDash, u3.lineDashOffset = t3.borderDashOffset || 0, a3.strokeContainThreshold = 0, a3.hasFill()) && a3.hasStroke() && (u3.strokeFirst = true, u3.lineWidth *= 2), (a3 || s3).style);
        g3.shadowBlur = t3.shadowBlur || 0, g3.shadowColor = t3.shadowColor || "transparent", g3.shadowOffsetX = t3.shadowOffsetX || 0, g3.shadowOffsetY = t3.shadowOffsetY || 0, g3.opacity = It(t3.opacity, e3.opacity, 1);
      }, yu.makeFont = function(t3) {
        var e3 = "";
        return (e3 = wu(t3) ? [t3.fontStyle, t3.fontWeight, xu(t3.fontSize), t3.fontFamily || "sans-serif"].join(" ") : e3) && At(e3) || t3.textFont || t3.font;
      }, yu);
      function yu(t3) {
        var e3 = cu.call(this) || this;
        return e3.type = "text", e3._children = [], e3._defaultStyle = pu, e3.attr(t3), e3;
      }
      var mu = { left: true, right: 1, center: 1 }, vu = { top: 1, bottom: 1, middle: 1 }, _u = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
      function xu(t3) {
        return "string" != typeof t3 || -1 === t3.indexOf("px") && -1 === t3.indexOf("rem") && -1 === t3.indexOf("em") ? isNaN(+t3) ? w + "px" : t3 + "px" : t3;
      }
      function bu(t3, e3) {
        for (var n3 = 0; n3 < _u.length; n3++) {
          var i3 = _u[n3], r3 = e3[i3];
          null != r3 && (t3[i3] = r3);
        }
      }
      function wu(t3) {
        return null != t3.fontSize || t3.fontFamily || t3.fontWeight;
      }
      function Su(t3) {
        var e3;
        t3 && (t3.font = gu.makeFont(t3), e3 = t3.align, t3.align = null == (e3 = "middle" === e3 ? "center" : e3) || mu[e3] ? e3 : "left", e3 = t3.verticalAlign, t3.verticalAlign = null == (e3 = "center" === e3 ? "middle" : e3) || vu[e3] ? e3 : "top", t3.padding) && (t3.padding = kt(t3.padding));
      }
      function Mu(t3, e3) {
        return null == t3 || e3 <= 0 || "transparent" === t3 || "none" === t3 ? null : t3.image || t3.colorStops ? "#000" : t3;
      }
      function Tu(t3) {
        return null == t3 || "none" === t3 ? null : t3.image || t3.colorStops ? "#000" : t3;
      }
      function Iu(t3, e3, n3) {
        return "right" === e3 ? t3 - n3[1] : "center" === e3 ? t3 + n3[3] / 2 - n3[1] / 2 : t3 + n3[3];
      }
      function Cu(t3) {
        t3 = t3.text;
        return null != t3 && (t3 += ""), t3;
      }
      function ku(t3) {
        return !!(t3.backgroundColor || t3.lineHeight || t3.borderWidth && t3.borderColor);
      }
      function Du(e3) {
        F(Fu, function(t3) {
          this[t3] = y(e3[t3], e3);
        }, this);
      }
      var j = i(), e = "undefined", Au = "series", Lu = I(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), Pu = "original", Ou = "arrayRows", Ru = "objectRows", Nu = "keyedColumns", zu = "typedArray", Bu = "unknown", Eu = "column", Vu = "row", Fu = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isSSR", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getOption", "getId", "updateLabelLayout"];
      var Gu = 1, Hu = {}, Wu = i(), Uu = i(), Xu = 0, Yu = 1, qu = 2, Zu = ["emphasis", "blur", "select"], ju = ["normal", "emphasis", "blur", "select"], Ku = "highlight", $u = "downplay", Qu = "select", Ju = "unselect", th = "toggleSelect", eh = "selectchanged";
      function nh(t3) {
        return null != t3 && "none" !== t3;
      }
      function ih(t3, e3, n3) {
        t3.onHoverStateChange && (t3.hoverState || 0) !== n3 && t3.onHoverStateChange(e3), t3.hoverState = n3;
      }
      function rh(t3) {
        ih(t3, "emphasis", qu);
      }
      function oh(t3) {
        t3.hoverState === qu && ih(t3, "normal", Xu);
      }
      function ah(t3) {
        ih(t3, "blur", Yu);
      }
      function sh(t3) {
        t3.hoverState === Yu && ih(t3, "normal", Xu);
      }
      function lh(t3) {
        t3.selected = true;
      }
      function uh(t3) {
        t3.selected = false;
      }
      function hh(t3, e3, n3) {
        e3(t3, n3);
      }
      function ch(t3, e3, n3) {
        hh(t3, e3, n3), t3.isGroup && t3.traverse(function(t4) {
          hh(t4, e3, n3);
        });
      }
      function ph(t3, e3) {
        switch (e3) {
          case "emphasis":
            t3.hoverState = qu;
            break;
          case "normal":
            t3.hoverState = Xu;
            break;
          case "blur":
            t3.hoverState = Yu;
            break;
          case "select":
            t3.selected = true;
        }
      }
      function dh(t3, e3, n3) {
        var i3 = 0 <= L(t3.currentStates, e3), r3 = t3.style.opacity, t3 = i3 ? null : function(t4, e4, n4, i4) {
          for (var r4 = t4.style, o3 = {}, a3 = 0; a3 < e4.length; a3++) {
            var s3 = e4[a3], l3 = r4[s3];
            o3[s3] = null == l3 ? i4 && i4[s3] : l3;
          }
          for (a3 = 0; a3 < t4.animators.length; a3++) {
            var u3 = t4.animators[a3];
            u3.__fromStateTransition && u3.__fromStateTransition.indexOf(n4) < 0 && "style" === u3.targetName && u3.saveTo(o3, e4);
          }
          return o3;
        }(t3, ["opacity"], e3, { opacity: 1 }), e3 = (n3 = n3 || {}).style || {};
        return null == e3.opacity && (n3 = V({}, n3), e3 = V({ opacity: i3 ? r3 : 0.1 * t3.opacity }, e3), n3.style = e3), n3;
      }
      function fh(t3, e3) {
        var n3, i3, r3, o3, a3, s3 = this.states[t3];
        if (this.style) {
          if ("emphasis" === t3)
            return n3 = this, i3 = s3, e3 = (e3 = e3) && 0 <= L(e3, "select"), a3 = false, n3 instanceof ql && (r3 = Wu(n3), o3 = e3 && r3.selectFill || r3.normalFill, e3 = e3 && r3.selectStroke || r3.normalStroke, nh(o3) || nh(e3)) && ("inherit" === (r3 = (i3 = i3 || {}).style || {}).fill ? (a3 = true, i3 = V({}, i3), (r3 = V({}, r3)).fill = o3) : !nh(r3.fill) && nh(o3) ? (a3 = true, i3 = V({}, i3), (r3 = V({}, r3)).fill = Ki(o3)) : !nh(r3.stroke) && nh(e3) && (a3 || (i3 = V({}, i3), r3 = V({}, r3)), r3.stroke = Ki(e3)), i3.style = r3), i3 && null == i3.z2 && (a3 || (i3 = V({}, i3)), o3 = n3.z2EmphasisLift, i3.z2 = n3.z2 + (null != o3 ? o3 : 10)), i3;
          if ("blur" === t3)
            return dh(this, t3, s3);
          if ("select" === t3)
            return e3 = this, (r3 = s3) && null == r3.z2 && (r3 = V({}, r3), a3 = e3.z2SelectLift, r3.z2 = e3.z2 + (null != a3 ? a3 : 9)), r3;
        }
        return s3;
      }
      function gh(t3) {
        t3.stateProxy = fh;
        var e3 = t3.getTextContent(), t3 = t3.getTextGuideLine();
        e3 && (e3.stateProxy = fh), t3 && (t3.stateProxy = fh);
      }
      function yh(t3, e3) {
        Sh(t3, e3) || t3.__highByOuter || ch(t3, rh);
      }
      function mh(t3, e3) {
        Sh(t3, e3) || t3.__highByOuter || ch(t3, oh);
      }
      function vh(t3, e3) {
        t3.__highByOuter |= 1 << (e3 || 0), ch(t3, rh);
      }
      function _h(t3, e3) {
        (t3.__highByOuter &= ~(1 << (e3 || 0))) || ch(t3, oh);
      }
      function xh(t3) {
        ch(t3, sh);
      }
      function bh(t3) {
        ch(t3, lh);
      }
      function wh(t3) {
        ch(t3, uh);
      }
      function Sh(t3, e3) {
        return t3.__highDownSilentOnTouch && e3.zrByTouch;
      }
      function Mh(o3) {
        var e3 = o3.getModel(), a3 = [], s3 = [];
        e3.eachComponent(function(t3, e4) {
          var n3 = Uu(e4), i3 = (i3 = o3, (r3 = e4).mainType === Au ? i3.getViewOfSeriesModel(r3) : i3.getViewOfComponentModel(r3)), r3 = "series" === t3;
          r3 || s3.push(i3), n3.isBlured && (i3.group.traverse(function(t4) {
            sh(t4);
          }), r3) && a3.push(e4), n3.isBlured = false;
        }), F(s3, function(t3) {
          t3 && t3.toggleBlurSeries && t3.toggleBlurSeries(a3, false, e3);
        });
      }
      function Th(t3, o3, a3, s3) {
        var l3, u3, h3, n3 = s3.getModel();
        function c3(t4, e3) {
          for (var n4 = 0; n4 < e3.length; n4++) {
            var i3 = t4.getItemGraphicEl(e3[n4]);
            i3 && xh(i3);
          }
        }
        a3 = a3 || "coordinateSystem", null != t3 && o3 && "none" !== o3 && (l3 = n3.getSeriesByIndex(t3), (u3 = l3.coordinateSystem) && u3.master && (u3 = u3.master), h3 = [], n3.eachSeries(function(t4) {
          var e3 = l3 === t4, n4 = t4.coordinateSystem, n4 = (n4 = n4 && n4.master ? n4.master : n4) && u3 ? n4 === u3 : e3;
          if (!("series" === a3 && !e3 || "coordinateSystem" === a3 && !n4 || "series" === o3 && e3)) {
            if (s3.getViewOfSeriesModel(t4).group.traverse(function(t5) {
              t5.__highByOuter && e3 && "self" === o3 || ah(t5);
            }), pt(o3))
              c3(t4.getData(), o3);
            else if (X(o3))
              for (var i3 = O(o3), r3 = 0; r3 < i3.length; r3++)
                c3(t4.getData(i3[r3]), o3[i3[r3]]);
            h3.push(t4), Uu(t4).isBlured = true;
          }
        }), n3.eachComponent(function(t4, e3) {
          "series" !== t4 && (t4 = s3.getViewOfComponentModel(e3)) && t4.toggleBlurSeries && t4.toggleBlurSeries(h3, true, n3);
        }));
      }
      function Ih(t3, e3, n3) {
        var i3;
        null != t3 && null != e3 && (t3 = n3.getModel().getComponent(t3, e3)) && (Uu(t3).isBlured = true, i3 = n3.getViewOfComponentModel(t3)) && i3.focusBlurEnabled && i3.group.traverse(function(t4) {
          ah(t4);
        });
      }
      function Ch(t3, e3, n3, i3) {
        var r3 = { focusSelf: false, dispatchers: null };
        if (null == t3 || "series" === t3 || null == e3 || null == n3)
          return r3;
        t3 = i3.getModel().getComponent(t3, e3);
        if (!t3)
          return r3;
        e3 = i3.getViewOfComponentModel(t3);
        if (!e3 || !e3.findHighDownDispatchers)
          return r3;
        for (var o3, a3 = e3.findHighDownDispatchers(n3), s3 = 0; s3 < a3.length; s3++)
          if ("self" === j(a3[s3]).focus) {
            o3 = true;
            break;
          }
        return { focusSelf: o3, dispatchers: a3 };
      }
      function kh(i3) {
        F(i3.getAllData(), function(t3) {
          var e3 = t3.data, n3 = t3.type;
          e3.eachItemGraphicEl(function(t4, e4) {
            (i3.isSelected(e4, n3) ? bh : wh)(t4);
          });
        });
      }
      function Dh(t3, e3, n3) {
        Nh(t3, true), ch(t3, gh), Lh(t3, e3, n3);
      }
      function Ah(t3, e3, n3, i3) {
        i3 ? Nh(t3, false) : Dh(t3, e3, n3);
      }
      function Lh(t3, e3, n3) {
        t3 = j(t3);
        null != e3 ? (t3.focus = e3, t3.blurScope = n3) : t3.focus && (t3.focus = null);
      }
      var Ph = ["emphasis", "blur", "select"], Oh = { itemStyle: "getItemStyle", lineStyle: "getLineStyle", areaStyle: "getAreaStyle" };
      function Rh(t3, e3, n3, i3) {
        n3 = n3 || "itemStyle";
        for (var r3 = 0; r3 < Ph.length; r3++) {
          var o3 = Ph[r3], a3 = e3.getModel([o3, n3]);
          t3.ensureState(o3).style = i3 ? i3(a3) : a3[Oh[n3]]();
        }
      }
      function Nh(t3, e3) {
        var e3 = false === e3, n3 = t3;
        t3.highDownSilentOnTouch && (n3.__highDownSilentOnTouch = t3.highDownSilentOnTouch), e3 && !n3.__highDownDispatcher || (n3.__highByOuter = n3.__highByOuter || 0, n3.__highDownDispatcher = !e3);
      }
      function zh(t3) {
        return !(!t3 || !t3.__highDownDispatcher);
      }
      function Bh(t3) {
        t3 = t3.type;
        return t3 === Qu || t3 === Ju || t3 === th;
      }
      function Eh(t3) {
        t3 = t3.type;
        return t3 === Ku || t3 === $u;
      }
      var Vh = Dl.CMD, Fh = [[], [], []], Gh = Math.sqrt, Hh = Math.atan2;
      var Wh = Math.sqrt, Uh = Math.sin, Xh = Math.cos, Yh = Math.PI;
      function qh(t3) {
        return Math.sqrt(t3[0] * t3[0] + t3[1] * t3[1]);
      }
      function Zh(t3, e3) {
        return (t3[0] * e3[0] + t3[1] * e3[1]) / (qh(t3) * qh(e3));
      }
      function jh(t3, e3) {
        return (t3[0] * e3[1] < t3[1] * e3[0] ? -1 : 1) * Math.acos(Zh(t3, e3));
      }
      function Kh(t3, e3, n3, i3, r3, o3, a3, s3, l3, u3, h3) {
        var l3 = l3 * (Yh / 180), c3 = Xh(l3) * (t3 - n3) / 2 + Uh(l3) * (e3 - i3) / 2, p3 = -1 * Uh(l3) * (t3 - n3) / 2 + Xh(l3) * (e3 - i3) / 2, d3 = c3 * c3 / (a3 * a3) + p3 * p3 / (s3 * s3), d3 = (1 < d3 && (a3 *= Wh(d3), s3 *= Wh(d3)), (r3 === o3 ? -1 : 1) * Wh((a3 * a3 * (s3 * s3) - a3 * a3 * (p3 * p3) - s3 * s3 * (c3 * c3)) / (a3 * a3 * (p3 * p3) + s3 * s3 * (c3 * c3))) || 0), r3 = d3 * a3 * p3 / s3, d3 = d3 * -s3 * c3 / a3, t3 = (t3 + n3) / 2 + Xh(l3) * r3 - Uh(l3) * d3, n3 = (e3 + i3) / 2 + Uh(l3) * r3 + Xh(l3) * d3, e3 = jh([1, 0], [(c3 - r3) / a3, (p3 - d3) / s3]), i3 = [(c3 - r3) / a3, (p3 - d3) / s3], c3 = [(-1 * c3 - r3) / a3, (-1 * p3 - d3) / s3], r3 = jh(i3, c3);
        Zh(i3, c3) <= -1 && (r3 = Yh), (r3 = 1 <= Zh(i3, c3) ? 0 : r3) < 0 && (p3 = Math.round(r3 / Yh * 1e6) / 1e6, r3 = 2 * Yh + p3 % 2 * Yh), h3.addData(u3, t3, n3, a3, s3, e3, r3, l3, o3);
      }
      var $h = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi, Qh = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
      u(ec, Jh = ql), ec.prototype.applyTransform = function(t3) {
      };
      var Jh, tc = ec;
      function ec() {
        return null !== Jh && Jh.apply(this, arguments) || this;
      }
      function nc(t3) {
        return null != t3.setData;
      }
      function ic(t3, e3) {
        var S3 = function(t4) {
          var e4 = new Dl();
          if (t4) {
            var n3, i3 = 0, r3 = 0, o3 = i3, a3 = r3, s3 = Dl.CMD, l3 = t4.match($h);
            if (l3) {
              for (var u3 = 0; u3 < l3.length; u3++) {
                for (var h3 = l3[u3], c3 = h3.charAt(0), p3 = void 0, d3 = h3.match(Qh) || [], f3 = d3.length, g3 = 0; g3 < f3; g3++)
                  d3[g3] = parseFloat(d3[g3]);
                for (var y3 = 0; y3 < f3; ) {
                  var m3 = void 0, v3 = void 0, _3 = void 0, x3 = void 0, b3 = void 0, w3 = void 0, S4 = void 0, M3 = i3, T3 = r3, I3 = void 0, C3 = void 0;
                  switch (c3) {
                    case "l":
                      i3 += d3[y3++], r3 += d3[y3++], p3 = s3.L, e4.addData(p3, i3, r3);
                      break;
                    case "L":
                      i3 = d3[y3++], r3 = d3[y3++], p3 = s3.L, e4.addData(p3, i3, r3);
                      break;
                    case "m":
                      i3 += d3[y3++], r3 += d3[y3++], p3 = s3.M, e4.addData(p3, i3, r3), o3 = i3, a3 = r3, c3 = "l";
                      break;
                    case "M":
                      i3 = d3[y3++], r3 = d3[y3++], p3 = s3.M, e4.addData(p3, i3, r3), o3 = i3, a3 = r3, c3 = "L";
                      break;
                    case "h":
                      i3 += d3[y3++], p3 = s3.L, e4.addData(p3, i3, r3);
                      break;
                    case "H":
                      i3 = d3[y3++], p3 = s3.L, e4.addData(p3, i3, r3);
                      break;
                    case "v":
                      r3 += d3[y3++], p3 = s3.L, e4.addData(p3, i3, r3);
                      break;
                    case "V":
                      r3 = d3[y3++], p3 = s3.L, e4.addData(p3, i3, r3);
                      break;
                    case "C":
                      p3 = s3.C, e4.addData(p3, d3[y3++], d3[y3++], d3[y3++], d3[y3++], d3[y3++], d3[y3++]), i3 = d3[y3 - 2], r3 = d3[y3 - 1];
                      break;
                    case "c":
                      p3 = s3.C, e4.addData(p3, d3[y3++] + i3, d3[y3++] + r3, d3[y3++] + i3, d3[y3++] + r3, d3[y3++] + i3, d3[y3++] + r3), i3 += d3[y3 - 2], r3 += d3[y3 - 1];
                      break;
                    case "S":
                      m3 = i3, v3 = r3, I3 = e4.len(), C3 = e4.data, n3 === s3.C && (m3 += i3 - C3[I3 - 4], v3 += r3 - C3[I3 - 3]), p3 = s3.C, M3 = d3[y3++], T3 = d3[y3++], i3 = d3[y3++], r3 = d3[y3++], e4.addData(p3, m3, v3, M3, T3, i3, r3);
                      break;
                    case "s":
                      m3 = i3, v3 = r3, I3 = e4.len(), C3 = e4.data, n3 === s3.C && (m3 += i3 - C3[I3 - 4], v3 += r3 - C3[I3 - 3]), p3 = s3.C, M3 = i3 + d3[y3++], T3 = r3 + d3[y3++], i3 += d3[y3++], r3 += d3[y3++], e4.addData(p3, m3, v3, M3, T3, i3, r3);
                      break;
                    case "Q":
                      M3 = d3[y3++], T3 = d3[y3++], i3 = d3[y3++], r3 = d3[y3++], p3 = s3.Q, e4.addData(p3, M3, T3, i3, r3);
                      break;
                    case "q":
                      M3 = d3[y3++] + i3, T3 = d3[y3++] + r3, i3 += d3[y3++], r3 += d3[y3++], p3 = s3.Q, e4.addData(p3, M3, T3, i3, r3);
                      break;
                    case "T":
                      m3 = i3, v3 = r3, I3 = e4.len(), C3 = e4.data, n3 === s3.Q && (m3 += i3 - C3[I3 - 4], v3 += r3 - C3[I3 - 3]), i3 = d3[y3++], r3 = d3[y3++], p3 = s3.Q, e4.addData(p3, m3, v3, i3, r3);
                      break;
                    case "t":
                      m3 = i3, v3 = r3, I3 = e4.len(), C3 = e4.data, n3 === s3.Q && (m3 += i3 - C3[I3 - 4], v3 += r3 - C3[I3 - 3]), i3 += d3[y3++], r3 += d3[y3++], p3 = s3.Q, e4.addData(p3, m3, v3, i3, r3);
                      break;
                    case "A":
                      _3 = d3[y3++], x3 = d3[y3++], b3 = d3[y3++], w3 = d3[y3++], S4 = d3[y3++], Kh(M3 = i3, T3 = r3, i3 = d3[y3++], r3 = d3[y3++], w3, S4, _3, x3, b3, p3 = s3.A, e4);
                      break;
                    case "a":
                      _3 = d3[y3++], x3 = d3[y3++], b3 = d3[y3++], w3 = d3[y3++], S4 = d3[y3++], Kh(M3 = i3, T3 = r3, i3 += d3[y3++], r3 += d3[y3++], w3, S4, _3, x3, b3, p3 = s3.A, e4);
                  }
                }
                "z" !== c3 && "Z" !== c3 || (p3 = s3.Z, e4.addData(p3), i3 = o3, r3 = a3), n3 = p3;
              }
              e4.toStatic();
            }
          }
          return e4;
        }(t3), t3 = V({}, e3);
        return t3.buildPath = function(t4) {
          var e4, n3 = nc(t4);
          n3 && t4.canSave() ? (t4.appendPath(S3), (e4 = t4.getContext()) && t4.rebuildPath(e4, 1)) : (e4 = n3 ? t4.getContext() : t4) && S3.rebuildPath(e4, 1);
        }, t3.applyTransform = function(t4) {
          var e4 = S3, n3 = t4;
          if (n3) {
            for (var i3, r3, o3, a3, s3 = e4.data, l3 = e4.len(), u3 = Vh.M, h3 = Vh.C, c3 = Vh.L, p3 = Vh.R, d3 = Vh.A, f3 = Vh.Q, g3 = 0, y3 = 0; g3 < l3; ) {
              switch (i3 = s3[g3++], y3 = g3, r3 = 0, i3) {
                case u3:
                case c3:
                  r3 = 1;
                  break;
                case h3:
                  r3 = 3;
                  break;
                case f3:
                  r3 = 2;
                  break;
                case d3:
                  var m3 = n3[4], v3 = n3[5], _3 = Gh(n3[0] * n3[0] + n3[1] * n3[1]), x3 = Gh(n3[2] * n3[2] + n3[3] * n3[3]), b3 = Hh(-n3[1] / x3, n3[0] / _3);
                  s3[g3] *= _3, s3[g3++] += m3, s3[g3] *= x3, s3[g3++] += v3, s3[g3++] *= _3, s3[g3++] *= x3, s3[g3++] += b3, s3[g3++] += b3, y3 = g3 += 2;
                  break;
                case p3:
                  a3[0] = s3[g3++], a3[1] = s3[g3++], le(a3, a3, n3), s3[y3++] = a3[0], s3[y3++] = a3[1], a3[0] += s3[g3++], a3[1] += s3[g3++], le(a3, a3, n3), s3[y3++] = a3[0], s3[y3++] = a3[1];
              }
              for (o3 = 0; o3 < r3; o3++) {
                var w3 = Fh[o3];
                w3[0] = s3[g3++], w3[1] = s3[g3++], le(w3, w3, n3), s3[y3++] = w3[0], s3[y3++] = w3[1];
              }
            }
            e4.increaseVersion();
          }
          this.dirtyShape();
        }, t3;
      }
      var rc, oc = function() {
        this.cx = 0, this.cy = 0, this.r = 0;
      }, ac = (u(sc, rc = ql), sc.prototype.getDefaultShape = function() {
        return new oc();
      }, sc.prototype.buildPath = function(t3, e3) {
        t3.moveTo(e3.cx + e3.r, e3.cy), t3.arc(e3.cx, e3.cy, e3.r, 0, 2 * Math.PI);
      }, sc);
      function sc(t3) {
        return rc.call(this, t3) || this;
      }
      ac.prototype.type = "circle";
      var lc, uc = function() {
        this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
      }, hc = (u(cc, lc = ql), cc.prototype.getDefaultShape = function() {
        return new uc();
      }, cc.prototype.buildPath = function(t3, e3) {
        var n3 = e3.cx, i3 = e3.cy, r3 = e3.rx, e3 = e3.ry, o3 = 0.5522848 * r3, a3 = 0.5522848 * e3;
        t3.moveTo(n3 - r3, i3), t3.bezierCurveTo(n3 - r3, i3 - a3, n3 - o3, i3 - e3, n3, i3 - e3), t3.bezierCurveTo(n3 + o3, i3 - e3, n3 + r3, i3 - a3, n3 + r3, i3), t3.bezierCurveTo(n3 + r3, i3 + a3, n3 + o3, i3 + e3, n3, i3 + e3), t3.bezierCurveTo(n3 - o3, i3 + e3, n3 - r3, i3 + a3, n3 - r3, i3), t3.closePath();
      }, cc);
      function cc(t3) {
        return lc.call(this, t3) || this;
      }
      hc.prototype.type = "ellipse";
      var pc = Math.PI, dc = 2 * pc, fc = Math.sin, gc = Math.cos, yc = Math.acos, mc = Math.atan2, vc = Math.abs, _c = Math.sqrt, xc = Math.max, bc = Math.min, wc = 1e-4;
      function Sc(t3, e3, n3, i3, r3, o3, a3) {
        var s3 = t3 - n3, l3 = e3 - i3, a3 = (a3 ? o3 : -o3) / _c(s3 * s3 + l3 * l3), l3 = a3 * l3, a3 = -a3 * s3, s3 = t3 + l3, t3 = e3 + a3, e3 = n3 + l3, n3 = i3 + a3, i3 = (s3 + e3) / 2, u3 = (t3 + n3) / 2, h3 = e3 - s3, c3 = n3 - t3, p3 = h3 * h3 + c3 * c3, o3 = r3 - o3, s3 = s3 * n3 - e3 * t3, n3 = (c3 < 0 ? -1 : 1) * _c(xc(0, o3 * o3 * p3 - s3 * s3)), e3 = (s3 * c3 - h3 * n3) / p3, t3 = (-s3 * h3 - c3 * n3) / p3, d3 = (s3 * c3 + h3 * n3) / p3, s3 = (-s3 * h3 + c3 * n3) / p3, h3 = e3 - i3, c3 = t3 - u3, n3 = d3 - i3, p3 = s3 - u3;
        return n3 * n3 + p3 * p3 < h3 * h3 + c3 * c3 && (e3 = d3, t3 = s3), { cx: e3, cy: t3, x0: -l3, y0: -a3, x1: e3 * (r3 / o3 - 1), y1: t3 * (r3 / o3 - 1) };
      }
      function Mc(t3, e3) {
        var n3, i3, r3, o3, a3, s3, l3, u3, h3, c3, p3, d3, f3, g3, y3, m3, v3, _3, x3, b3, w3, S3, M3, T3, I3, C3, k3, D3, A3, L3, P3 = xc(e3.r, 0), O3 = xc(e3.r0 || 0, 0), R3 = 0 < P3;
        (R3 || 0 < O3) && (R3 || (P3 = O3, O3 = 0), P3 < O3 && (R3 = P3, P3 = O3, O3 = R3), R3 = e3.startAngle, n3 = e3.endAngle, isNaN(R3) || isNaN(n3) || (i3 = e3.cx, r3 = e3.cy, o3 = !!e3.clockwise, m3 = vc(n3 - R3), wc < (a3 = dc < m3 && m3 % dc) && (m3 = a3), wc < P3 ? dc - wc < m3 ? (t3.moveTo(i3 + P3 * gc(R3), r3 + P3 * fc(R3)), t3.arc(i3, r3, P3, R3, n3, !o3), wc < O3 && (t3.moveTo(i3 + O3 * gc(n3), r3 + O3 * fc(n3)), t3.arc(i3, r3, O3, n3, R3, o3))) : (S3 = w3 = b3 = x3 = _3 = v3 = c3 = h3 = C3 = I3 = T3 = M3 = u3 = l3 = s3 = a3 = void 0, p3 = P3 * gc(R3), d3 = P3 * fc(R3), f3 = O3 * gc(n3), g3 = O3 * fc(n3), (y3 = wc < m3) && ((e3 = e3.cornerRadius) && (a3 = (e3 = function(t4) {
          if (G(t4)) {
            var e4 = t4.length;
            if (!e4)
              return t4;
            e4 = 1 === e4 ? [t4[0], t4[0], 0, 0] : 2 === e4 ? [t4[0], t4[0], t4[1], t4[1]] : 3 === e4 ? t4.concat(t4[2]) : t4;
          } else
            e4 = [t4, t4, t4, t4];
          return e4;
        }(e3))[0], s3 = e3[1], l3 = e3[2], u3 = e3[3]), e3 = vc(P3 - O3) / 2, M3 = bc(e3, l3), T3 = bc(e3, u3), I3 = bc(e3, a3), C3 = bc(e3, s3), v3 = h3 = xc(M3, T3), _3 = c3 = xc(I3, C3), wc < h3 || wc < c3) && (x3 = P3 * gc(n3), b3 = P3 * fc(n3), w3 = O3 * gc(R3), S3 = O3 * fc(R3), m3 < pc) && (e3 = function(t4, e4, n4, i4, r4, o4, a4, s4) {
          var l4 = (s4 = s4 - o4) * (n4 = n4 - t4) - (a4 = a4 - r4) * (i4 = i4 - e4);
          if (!(l4 * l4 < wc))
            return [t4 + (l4 = (a4 * (e4 - o4) - s4 * (t4 - r4)) / l4) * n4, e4 + l4 * i4];
        }(p3, d3, w3, S3, x3, b3, f3, g3)) && (M3 = p3 - e3[0], T3 = d3 - e3[1], I3 = x3 - e3[0], C3 = b3 - e3[1], m3 = 1 / fc(yc((M3 * I3 + T3 * C3) / (_c(M3 * M3 + T3 * T3) * _c(I3 * I3 + C3 * C3))) / 2), M3 = _c(e3[0] * e3[0] + e3[1] * e3[1]), v3 = bc(h3, (P3 - M3) / (1 + m3)), _3 = bc(c3, (O3 - M3) / (m3 - 1))), y3 ? wc < v3 ? (k3 = bc(l3, v3), D3 = bc(u3, v3), A3 = Sc(w3, S3, p3, d3, P3, k3, o3), L3 = Sc(x3, b3, f3, g3, P3, D3, o3), t3.moveTo(i3 + A3.cx + A3.x0, r3 + A3.cy + A3.y0), v3 < h3 && k3 === D3 ? t3.arc(i3 + A3.cx, r3 + A3.cy, v3, mc(A3.y0, A3.x0), mc(L3.y0, L3.x0), !o3) : (0 < k3 && t3.arc(i3 + A3.cx, r3 + A3.cy, k3, mc(A3.y0, A3.x0), mc(A3.y1, A3.x1), !o3), t3.arc(i3, r3, P3, mc(A3.cy + A3.y1, A3.cx + A3.x1), mc(L3.cy + L3.y1, L3.cx + L3.x1), !o3), 0 < D3 && t3.arc(i3 + L3.cx, r3 + L3.cy, D3, mc(L3.y1, L3.x1), mc(L3.y0, L3.x0), !o3))) : (t3.moveTo(i3 + p3, r3 + d3), t3.arc(i3, r3, P3, R3, n3, !o3)) : t3.moveTo(i3 + p3, r3 + d3), wc < O3 && y3 ? wc < _3 ? (k3 = bc(a3, _3), A3 = Sc(f3, g3, x3, b3, O3, -(D3 = bc(s3, _3)), o3), L3 = Sc(p3, d3, w3, S3, O3, -k3, o3), t3.lineTo(i3 + A3.cx + A3.x0, r3 + A3.cy + A3.y0), _3 < c3 && k3 === D3 ? t3.arc(i3 + A3.cx, r3 + A3.cy, _3, mc(A3.y0, A3.x0), mc(L3.y0, L3.x0), !o3) : (0 < D3 && t3.arc(i3 + A3.cx, r3 + A3.cy, D3, mc(A3.y0, A3.x0), mc(A3.y1, A3.x1), !o3), t3.arc(i3, r3, O3, mc(A3.cy + A3.y1, A3.cx + A3.x1), mc(L3.cy + L3.y1, L3.cx + L3.x1), o3), 0 < k3 && t3.arc(i3 + L3.cx, r3 + L3.cy, k3, mc(L3.y1, L3.x1), mc(L3.y0, L3.x0), !o3))) : (t3.lineTo(i3 + f3, r3 + g3), t3.arc(i3, r3, O3, n3, R3, o3)) : t3.lineTo(i3 + f3, r3 + g3)) : t3.moveTo(i3, r3), t3.closePath()));
      }
      var Tc, Ic = function() {
        this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = 2 * Math.PI, this.clockwise = true, this.cornerRadius = 0;
      }, Cc = (u(kc, Tc = ql), kc.prototype.getDefaultShape = function() {
        return new Ic();
      }, kc.prototype.buildPath = function(t3, e3) {
        Mc(t3, e3);
      }, kc.prototype.isZeroArea = function() {
        return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
      }, kc);
      function kc(t3) {
        return Tc.call(this, t3) || this;
      }
      Cc.prototype.type = "sector";
      var Dc, Ac = function() {
        this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
      }, Lc = (u(Pc, Dc = ql), Pc.prototype.getDefaultShape = function() {
        return new Ac();
      }, Pc.prototype.buildPath = function(t3, e3) {
        var n3 = e3.cx, i3 = e3.cy, r3 = 2 * Math.PI;
        t3.moveTo(n3 + e3.r, i3), t3.arc(n3, i3, e3.r, 0, r3, false), t3.moveTo(n3 + e3.r0, i3), t3.arc(n3, i3, e3.r0, 0, r3, true);
      }, Pc);
      function Pc(t3) {
        return Dc.call(this, t3) || this;
      }
      function Oc(t3, e3, n3) {
        var i3 = e3.smooth, r3 = e3.points;
        if (r3 && 2 <= r3.length) {
          if (i3)
            for (var o3 = function(t4, e4, n4, i4) {
              var r4, o4, a4 = [], s4 = [], l4 = [], u4 = [];
              if (i4) {
                for (var h4 = [1 / 0, 1 / 0], c4 = [-1 / 0, -1 / 0], p3 = 0, d3 = t4.length; p3 < d3; p3++)
                  ue(h4, h4, t4[p3]), he(c4, c4, t4[p3]);
                ue(h4, h4, i4[0]), he(c4, c4, i4[1]);
              }
              for (p3 = 0, d3 = t4.length; p3 < d3; p3++) {
                var f3 = t4[p3];
                if (n4)
                  r4 = t4[p3 ? p3 - 1 : d3 - 1], o4 = t4[(p3 + 1) % d3];
                else {
                  if (0 === p3 || p3 === d3 - 1) {
                    a4.push(jt(t4[p3]));
                    continue;
                  }
                  r4 = t4[p3 - 1], o4 = t4[p3 + 1];
                }
                Qt(s4, o4, r4), ee(s4, s4, e4);
                var g3 = ie(f3, r4), y3 = ie(f3, o4), m3 = g3 + y3, m3 = (0 !== m3 && (g3 /= m3, y3 /= m3), ee(l4, s4, -g3), ee(u4, s4, y3), $t([], f3, l4)), g3 = $t([], f3, u4);
                i4 && (he(m3, m3, h4), ue(m3, m3, c4), he(g3, g3, h4), ue(g3, g3, c4)), a4.push(m3), a4.push(g3);
              }
              return n4 && a4.push(a4.shift()), a4;
            }(r3, i3, n3, e3.smoothConstraint), a3 = (t3.moveTo(r3[0][0], r3[0][1]), r3.length), s3 = 0; s3 < (n3 ? a3 : a3 - 1); s3++) {
              var l3 = o3[2 * s3], u3 = o3[2 * s3 + 1], h3 = r3[(s3 + 1) % a3];
              t3.bezierCurveTo(l3[0], l3[1], u3[0], u3[1], h3[0], h3[1]);
            }
          else {
            t3.moveTo(r3[0][0], r3[0][1]);
            for (var s3 = 1, c3 = r3.length; s3 < c3; s3++)
              t3.lineTo(r3[s3][0], r3[s3][1]);
          }
          n3 && t3.closePath();
        }
      }
      Lc.prototype.type = "ring";
      var Rc, Nc = function() {
        this.points = null, this.smooth = 0, this.smoothConstraint = null;
      }, zc = (u(Bc, Rc = ql), Bc.prototype.getDefaultShape = function() {
        return new Nc();
      }, Bc.prototype.buildPath = function(t3, e3) {
        Oc(t3, e3, true);
      }, Bc);
      function Bc(t3) {
        return Rc.call(this, t3) || this;
      }
      zc.prototype.type = "polygon";
      var Ec, Vc = function() {
        this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
      }, Fc = (u(Gc, Ec = ql), Gc.prototype.getDefaultStyle = function() {
        return { stroke: "#000", fill: null };
      }, Gc.prototype.getDefaultShape = function() {
        return new Vc();
      }, Gc.prototype.buildPath = function(t3, e3) {
        Oc(t3, e3, false);
      }, Gc);
      function Gc(t3) {
        return Ec.call(this, t3) || this;
      }
      Fc.prototype.type = "polyline";
      var Hc, Wc = {}, Uc = function() {
        this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
      }, Xc = (u(Yc, Hc = ql), Yc.prototype.getDefaultStyle = function() {
        return { stroke: "#000", fill: null };
      }, Yc.prototype.getDefaultShape = function() {
        return new Uc();
      }, Yc.prototype.buildPath = function(t3, e3) {
        o3 = (this.subPixelOptimize ? (n3 = (o3 = ru(Wc, e3, this.style)).x1, i3 = o3.y1, r3 = o3.x2, o3) : (n3 = e3.x1, i3 = e3.y1, r3 = e3.x2, e3)).y2;
        var n3, i3, r3, o3, e3 = e3.percent;
        0 !== e3 && (t3.moveTo(n3, i3), e3 < 1 && (r3 = n3 * (1 - e3) + r3 * e3, o3 = i3 * (1 - e3) + o3 * e3), t3.lineTo(r3, o3));
      }, Yc.prototype.pointAt = function(t3) {
        var e3 = this.shape;
        return [e3.x1 * (1 - t3) + e3.x2 * t3, e3.y1 * (1 - t3) + e3.y2 * t3];
      }, Yc);
      function Yc(t3) {
        return Hc.call(this, t3) || this;
      }
      Xc.prototype.type = "line";
      var qc = [], Zc = function() {
        this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
      };
      function jc(t3, e3, n3) {
        var i3 = t3.cpx2, r3 = t3.cpy2;
        return null != i3 || null != r3 ? [(n3 ? li : si)(t3.x1, t3.cpx1, t3.cpx2, t3.x2, e3), (n3 ? li : si)(t3.y1, t3.cpy1, t3.cpy2, t3.y2, e3)] : [(n3 ? fi : di)(t3.x1, t3.cpx1, t3.x2, e3), (n3 ? fi : di)(t3.y1, t3.cpy1, t3.y2, e3)];
      }
      u(Qc, Kc = ql), Qc.prototype.getDefaultStyle = function() {
        return { stroke: "#000", fill: null };
      }, Qc.prototype.getDefaultShape = function() {
        return new Zc();
      }, Qc.prototype.buildPath = function(t3, e3) {
        var n3 = e3.x1, i3 = e3.y1, r3 = e3.x2, o3 = e3.y2, a3 = e3.cpx1, s3 = e3.cpy1, l3 = e3.cpx2, u3 = e3.cpy2, e3 = e3.percent;
        0 !== e3 && (t3.moveTo(n3, i3), null == l3 || null == u3 ? (e3 < 1 && (yi(n3, a3, r3, e3, qc), a3 = qc[1], r3 = qc[2], yi(i3, s3, o3, e3, qc), s3 = qc[1], o3 = qc[2]), t3.quadraticCurveTo(a3, s3, r3, o3)) : (e3 < 1 && (ci(n3, a3, l3, r3, e3, qc), a3 = qc[1], l3 = qc[2], r3 = qc[3], ci(i3, s3, u3, o3, e3, qc), s3 = qc[1], u3 = qc[2], o3 = qc[3]), t3.bezierCurveTo(a3, s3, l3, u3, r3, o3)));
      }, Qc.prototype.pointAt = function(t3) {
        return jc(this.shape, t3, false);
      }, Qc.prototype.tangentAt = function(t3) {
        t3 = jc(this.shape, t3, true);
        return ne(t3, t3);
      };
      var Kc, $c = Qc;
      function Qc(t3) {
        return Kc.call(this, t3) || this;
      }
      $c.prototype.type = "bezier-curve";
      var Jc, tp = function() {
        this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = 2 * Math.PI, this.clockwise = true;
      }, ep = (u(np, Jc = ql), np.prototype.getDefaultStyle = function() {
        return { stroke: "#000", fill: null };
      }, np.prototype.getDefaultShape = function() {
        return new tp();
      }, np.prototype.buildPath = function(t3, e3) {
        var n3 = e3.cx, i3 = e3.cy, r3 = Math.max(e3.r, 0), o3 = e3.startAngle, a3 = e3.endAngle, e3 = e3.clockwise, s3 = Math.cos(o3), l3 = Math.sin(o3);
        t3.moveTo(s3 * r3 + n3, l3 * r3 + i3), t3.arc(n3, i3, r3, o3, a3, !e3);
      }, np);
      function np(t3) {
        return Jc.call(this, t3) || this;
      }
      ep.prototype.type = "arc";
      u(op, ip = ql), op.prototype._updatePathDirty = function() {
        for (var t3 = this.shape.paths, e3 = this.shapeChanged(), n3 = 0; n3 < t3.length; n3++)
          e3 = e3 || t3[n3].shapeChanged();
        e3 && this.dirtyShape();
      }, op.prototype.beforeBrush = function() {
        this._updatePathDirty();
        for (var t3 = this.shape.paths || [], e3 = this.getGlobalScale(), n3 = 0; n3 < t3.length; n3++)
          t3[n3].path || t3[n3].createPathProxy(), t3[n3].path.setScale(e3[0], e3[1], t3[n3].segmentIgnoreThreshold);
      }, op.prototype.buildPath = function(t3, e3) {
        for (var n3 = e3.paths || [], i3 = 0; i3 < n3.length; i3++)
          n3[i3].buildPath(t3, n3[i3].shape, true);
      }, op.prototype.afterBrush = function() {
        for (var t3 = this.shape.paths || [], e3 = 0; e3 < t3.length; e3++)
          t3[e3].pathUpdated();
      }, op.prototype.getBoundingRect = function() {
        return this._updatePathDirty.call(this), ql.prototype.getBoundingRect.call(this);
      };
      var ip, rp = op;
      function op() {
        var t3 = null !== ip && ip.apply(this, arguments) || this;
        return t3.type = "compound", t3;
      }
      sp.prototype.addColorStop = function(t3, e3) {
        this.colorStops.push({ offset: t3, color: e3 });
      };
      var ap = sp;
      function sp(t3) {
        this.colorStops = t3 || [];
      }
      u(hp, lp = ap);
      var lp, up = hp;
      function hp(t3, e3, n3, i3, r3, o3) {
        r3 = lp.call(this, r3) || this;
        return r3.x = null == t3 ? 0 : t3, r3.y = null == e3 ? 0 : e3, r3.x2 = null == n3 ? 1 : n3, r3.y2 = null == i3 ? 0 : i3, r3.type = "linear", r3.global = o3 || false, r3;
      }
      u(pp, cp = ap);
      var cp, ap = pp;
      function pp(t3, e3, n3, i3, r3) {
        i3 = cp.call(this, i3) || this;
        return i3.x = null == t3 ? 0.5 : t3, i3.y = null == e3 ? 0.5 : e3, i3.r = null == n3 ? 0.5 : n3, i3.type = "radial", i3.global = r3 || false, i3;
      }
      var dp = Math.min, fp = Math.max, gp = Math.abs, yp = [0, 0], mp = [0, 0], vp = xn(), _p = vp.minTv, xp = vp.maxTv, bp = (wp.prototype.fromBoundingRect = function(t3, e3) {
        var n3 = this._corners, i3 = this._axes, r3 = t3.x, o3 = t3.y, a3 = r3 + t3.width, t3 = o3 + t3.height;
        if (n3[0].set(r3, o3), n3[1].set(a3, o3), n3[2].set(a3, t3), n3[3].set(r3, t3), e3)
          for (var s3 = 0; s3 < 4; s3++)
            n3[s3].transform(e3);
        q.sub(i3[0], n3[1], n3[0]), q.sub(i3[1], n3[3], n3[0]), i3[0].normalize(), i3[1].normalize();
        for (s3 = 0; s3 < 2; s3++)
          this._origin[s3] = i3[s3].dot(n3[0]);
      }, wp.prototype.intersect = function(t3, e3, n3) {
        var i3 = true, r3 = !e3;
        return e3 && q.set(e3, 0, 0), vp.reset(n3, !r3), !this._intersectCheckOneSide(this, t3, r3, 1) && (i3 = false, r3) || !this._intersectCheckOneSide(t3, this, r3, -1) && (i3 = false, r3) || r3 || vp.negativeSize || q.copy(e3, i3 ? vp.useDir ? vp.dirMinTv : _p : xp), i3;
      }, wp.prototype._intersectCheckOneSide = function(t3, e3, n3, i3) {
        for (var r3 = true, o3 = 0; o3 < 2; o3++) {
          var a3 = t3._axes[o3];
          if (t3._getProjMinMaxOnAxis(o3, t3._corners, yp), t3._getProjMinMaxOnAxis(o3, e3._corners, mp), vp.negativeSize || yp[1] < mp[0] || mp[1] < yp[0]) {
            if (r3 = false, vp.negativeSize || n3)
              return r3;
            var s3 = gp(mp[0] - yp[1]), l3 = gp(yp[0] - mp[1]);
            dp(s3, l3) > xp.len() && (s3 < l3 ? q.scale(xp, a3, -s3 * i3) : q.scale(xp, a3, l3 * i3));
          } else
            n3 || (s3 = gp(mp[0] - yp[1]), l3 = gp(yp[0] - mp[1]), (vp.useDir || dp(s3, l3) < _p.len()) && ((s3 < l3 || !vp.bidirectional) && (q.scale(_p, a3, s3 * i3), vp.useDir) && vp.calcDirMTV(), l3 <= s3 || !vp.bidirectional) && (q.scale(_p, a3, -l3 * i3), vp.useDir) && vp.calcDirMTV());
        }
        return r3;
      }, wp.prototype._getProjMinMaxOnAxis = function(t3, e3, n3) {
        for (var i3 = this._axes[t3], r3 = this._origin, o3 = e3[0].dot(i3) + r3[t3], a3 = o3, s3 = o3, l3 = 1; l3 < e3.length; l3++)
          var u3 = e3[l3].dot(i3) + r3[t3], a3 = dp(u3, a3), s3 = fp(u3, s3);
        n3[0] = a3 + vp.touchThreshold, n3[1] = s3 - vp.touchThreshold, vp.negativeSize = n3[1] < n3[0];
      }, wp);
      function wp(t3, e3) {
        this._corners = [], this._axes = [], this._origin = [0, 0];
        for (var n3 = 0; n3 < 4; n3++)
          this._corners[n3] = new q();
        for (n3 = 0; n3 < 2; n3++)
          this._axes[n3] = new q();
        t3 && this.fromBoundingRect(t3, e3);
      }
      var Sp, Mp = [], Tp = (u(Ip, Sp = $s), Ip.prototype.traverse = function(t3, e3) {
        t3.call(e3, this);
      }, Ip.prototype.useStyle = function() {
        this.style = {};
      }, Ip.prototype._useHoverStyle = function() {
        this.__hoverStyle = null;
      }, Ip.prototype.getCursor = function() {
        return this._cursor;
      }, Ip.prototype.innerAfterBrush = function() {
        this._cursor = this._displayables.length;
      }, Ip.prototype.clearDisplaybles = function() {
        this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.markRedraw(), this.notClear = false;
      }, Ip.prototype.clearTemporalDisplayables = function() {
        this._temporaryDisplayables = [];
      }, Ip.prototype.addDisplayable = function(t3, e3) {
        (e3 ? this._temporaryDisplayables : this._displayables).push(t3), this.markRedraw();
      }, Ip.prototype.addDisplayables = function(t3, e3) {
        e3 = e3 || false;
        for (var n3 = 0; n3 < t3.length; n3++)
          this.addDisplayable(t3[n3], e3);
      }, Ip.prototype.getDisplayables = function() {
        return this._displayables;
      }, Ip.prototype.getTemporalDisplayables = function() {
        return this._temporaryDisplayables;
      }, Ip.prototype.eachPendingDisplayable = function(t3) {
        for (var e3 = this._cursor; e3 < this._displayables.length; e3++)
          t3 && t3(this._displayables[e3]);
        for (e3 = 0; e3 < this._temporaryDisplayables.length; e3++)
          t3 && t3(this._temporaryDisplayables[e3]);
      }, Ip.prototype.update = function() {
        this.updateTransform();
        for (var t3 = this._cursor; t3 < this._displayables.length; t3++)
          (e3 = this._displayables[t3]).parent = this, e3.update(), e3.parent = null;
        for (var e3, t3 = 0; t3 < this._temporaryDisplayables.length; t3++)
          (e3 = this._temporaryDisplayables[t3]).parent = this, e3.update(), e3.parent = null;
      }, Ip.prototype.getBoundingRect = function() {
        if (!this._rect) {
          for (var t3 = new Z(1 / 0, 1 / 0, -1 / 0, -1 / 0), e3 = 0; e3 < this._displayables.length; e3++) {
            var n3 = this._displayables[e3], i3 = n3.getBoundingRect().clone();
            n3.needLocalTransform() && i3.applyTransform(n3.getLocalTransform(Mp)), t3.union(i3);
          }
          this._rect = t3;
        }
        return this._rect;
      }, Ip.prototype.contain = function(t3, e3) {
        var n3 = this.transformCoordToLocal(t3, e3);
        if (this.getBoundingRect().contain(n3[0], n3[1])) {
          for (var i3 = 0; i3 < this._displayables.length; i3++)
            if (this._displayables[i3].contain(t3, e3))
              return true;
        }
        return false;
      }, Ip);
      function Ip() {
        var t3 = null !== Sp && Sp.apply(this, arguments) || this;
        return t3.notClear = true, t3.incremental = 1, t3._displayables = [], t3._temporaryDisplayables = [], t3._cursor = 0, t3;
      }
      var Cp = i();
      function kp(t3, e3, n3, i3, r3, o3, a3) {
        var s3, l3, u3, h3, c3, p3, d3 = false, f3 = (H(r3) ? (a3 = o3, o3 = r3, r3 = null) : X(r3) && (o3 = r3.cb, a3 = r3.during, d3 = r3.isFrom, l3 = r3.removeOpt, r3 = r3.dataIndex), "leave" === t3), g3 = (f3 || e3.stopAnimation("leave"), p3 = t3, s3 = r3, l3 = f3 ? l3 || {} : null, i3 = (g3 = i3) && i3.getAnimationDelayParams ? i3.getAnimationDelayParams(e3, r3) : null, g3 && g3.ecModel && (u3 = (u3 = g3.ecModel.getUpdatePayload()) && u3.animation), p3 = "update" === p3, g3 && g3.isAnimationEnabled() ? (c3 = h3 = r3 = void 0, c3 = l3 ? (r3 = Y(l3.duration, 200), h3 = Y(l3.easing, "cubicOut"), 0) : (r3 = g3.getShallow(p3 ? "animationDurationUpdate" : "animationDuration"), h3 = g3.getShallow(p3 ? "animationEasingUpdate" : "animationEasing"), g3.getShallow(p3 ? "animationDelayUpdate" : "animationDelay")), H(c3 = u3 && (null != u3.duration && (r3 = u3.duration), null != u3.easing && (h3 = u3.easing), null != u3.delay) ? u3.delay : c3) && (c3 = c3(s3, i3)), { duration: (r3 = H(r3) ? r3(s3) : r3) || 0, delay: c3, easing: h3 }) : null);
        g3 && 0 < g3.duration ? (p3 = { duration: g3.duration, delay: g3.delay || 0, easing: g3.easing, done: o3, force: !!o3 || !!a3, setToFinal: !f3, scope: t3, during: a3 }, d3 ? e3.animateFrom(n3, p3) : e3.animateTo(n3, p3)) : (e3.stopAnimation(), d3 || e3.attr(n3), a3 && a3(1), o3 && o3());
      }
      function Dp(t3, e3, n3, i3, r3, o3) {
        kp("update", t3, e3, n3, i3, r3, o3);
      }
      function Ap(t3, e3, n3, i3, r3, o3) {
        kp("enter", t3, e3, n3, i3, r3, o3);
      }
      function Lp(t3) {
        if (!t3.__zr)
          return 1;
        for (var e3 = 0; e3 < t3.animators.length; e3++)
          if ("leave" === t3.animators[e3].scope)
            return 1;
      }
      function Pp(t3, e3, n3, i3, r3, o3) {
        Lp(t3) || kp("leave", t3, e3, n3, i3, r3, o3);
      }
      function Op(t3, e3, n3, i3) {
        t3.removeTextContent(), t3.removeTextGuideLine(), Pp(t3, { style: { opacity: 0 } }, e3, n3, i3);
      }
      function Rp(t3, e3, n3) {
        function i3() {
          t3.parent && t3.parent.remove(t3);
        }
        t3.isGroup ? t3.traverse(function(t4) {
          t4.isGroup || Op(t4, e3, n3, i3);
        }) : Op(t3, e3, n3, i3);
      }
      function Np(t3) {
        Cp(t3).oldStyle = t3.style;
      }
      var zp = {}, Bp = ["x", "y"], Ep = ["width", "height"], Vp = 0, Fp = 1, Gp = 2;
      var Hp = function(t3, e3) {
        var n3, i3 = ic(t3, e3);
        function r3(t4) {
          t4 = n3.call(this, t4) || this;
          return t4.applyTransform = i3.applyTransform, t4.buildPath = i3.buildPath, t4;
        }
        return u(r3, n3 = tc), r3;
      };
      function Wp(t3, e3) {
        zp[t3] = e3;
      }
      function Up(t3, e3, n3, i3) {
        t3 = new tc(ic(t3, e3));
        return n3 && ("center" === i3 && (n3 = Yp(n3, t3.getBoundingRect())), Zp(t3, n3)), t3;
      }
      function Xp(t3, e3, n3) {
        var i3 = new eu({ style: { image: t3, x: e3.x, y: e3.y, width: e3.width, height: e3.height }, onload: function(t4) {
          "center" === n3 && (t4 = { width: t4.width, height: t4.height }, i3.setStyle(Yp(e3, t4)));
        } });
        return i3;
      }
      function Yp(t3, e3) {
        var e3 = e3.width / e3.height, n3 = t3.height * e3, e3 = n3 <= t3.width ? t3.height : (n3 = t3.width) / e3;
        return { x: t3.x + t3.width / 2 - n3 / 2, y: t3.y + t3.height / 2 - e3 / 2, width: n3, height: e3 };
      }
      function qp(t3, e3) {
        for (var n3 = [], i3 = t3.length, r3 = 0; r3 < i3; r3++) {
          var o3 = t3[r3];
          n3.push(o3.getUpdatedPathProxy(true));
        }
        return (e3 = new ql(e3)).createPathProxy(), e3.buildPath = function(t4) {
          var e4;
          nc(t4) && (t4.appendPath(n3), e4 = t4.getContext()) && t4.rebuildPath(e4, 1);
        }, e3;
      }
      function Zp(t3, e3) {
        t3.applyTransform && (e3 = t3.getBoundingRect().calculateTransform(e3), t3.applyTransform(e3));
      }
      function jp(t3, e3) {
        ru(t3, t3, { lineWidth: e3 });
      }
      function Kp(t3) {
        return !t3.isGroup;
      }
      function $p(t3, e3, n3) {
        var e3 = V({ rectHover: true }, e3), i3 = e3.style = { strokeNoScale: true };
        if (n3 = n3 || { x: -1, y: -1, width: 2, height: 2 }, t3)
          return 0 === t3.indexOf("image://") ? (i3.image = t3.slice(8), B(i3, n3), new eu(e3)) : Up(t3.replace("path://", ""), e3, n3, "center");
      }
      function Qp(t3, e3, n3, i3, r3) {
        null != e3 && (U(e3) ? Jp[0] = Jp[1] = Jp[2] = Jp[3] = e3 : (Jp[0] = e3[0], Jp[1] = e3[1], Jp[2] = e3[2], Jp[3] = e3[3]), i3 && (Jp[0] = Jo(0, Jp[0]), Jp[1] = Jo(0, Jp[1]), Jp[2] = Jo(0, Jp[2]), Jp[3] = Jo(0, Jp[3])), n3 && (Jp[0] = -Jp[0], Jp[1] = -Jp[1], Jp[2] = -Jp[2], Jp[3] = -Jp[3]), td(t3, Jp, "x", "width", 3, 1, r3 && r3[0] || 0), td(t3, Jp, "y", "height", 0, 2, r3 && r3[1] || 0));
      }
      var Jp = [0, 0, 0, 0];
      function td(t3, e3, n3, i3, r3, o3, a3) {
        var s3 = e3[o3] + e3[r3], l3 = t3[i3];
        t3[i3] += s3, a3 = Jo(0, Qo(a3, l3)), t3[i3] < a3 ? (t3[i3] = a3, t3[n3] += 0 <= e3[r3] ? -e3[r3] : 0 <= e3[o3] ? l3 + e3[o3] : 1e-8 < ta(s3) ? (l3 - a3) * e3[r3] / s3 : 0) : t3[n3] -= e3[r3];
      }
      function ed(t3) {
        var e3 = t3.itemTooltipOption, n3 = t3.componentModel, i3 = t3.itemName, e3 = W(e3) ? { formatter: e3 } : e3, r3 = n3.mainType, n3 = n3.componentIndex, o3 = { componentType: r3, name: i3, $vars: ["name"] }, a3 = (o3[r3 + "Index"] = n3, t3.formatterParamsExtra), t3 = (a3 && F(O(a3), function(t4) {
          Ht(o3, t4) || (o3[t4] = a3[t4], o3.$vars.push(t4));
        }), j(t3.el));
        t3.componentMainType = r3, t3.componentIndex = n3, t3.tooltipConfig = { name: i3, option: B({ content: i3, encodeHTMLContent: true, formatterParams: o3 }, e3) };
      }
      function nd(t3, e3) {
        var n3;
        (n3 = t3.isGroup ? e3(t3) : n3) || t3.traverse(e3);
      }
      function id(t3, e3) {
        if (t3)
          if (G(t3))
            for (var n3 = 0; n3 < t3.length; n3++)
              nd(t3[n3], e3);
          else
            nd(t3, e3);
      }
      function rd(t3) {
        return !t3 || ta(t3[1]) < 1e-5 && ta(t3[2]) < 1e-5 || ta(t3[0]) < 1e-5 && ta(t3[3]) < 1e-5;
      }
      function od(t3, e3) {
        return t3 ? Z.copy(t3, e3) : e3.clone();
      }
      function ad(t3, e3) {
        return e3 ? Ge(t3 || Ve(), e3) : void 0;
      }
      function sd(t3) {
        return { z: t3.get("z") || 0, zlevel: t3.get("zlevel") || 0 };
      }
      function ld(t3, e3, n3) {
        !function t4(e4, n4, i3, r3) {
          if (e4.ignoreModelZ)
            return r3;
          var o3 = e4.getTextContent();
          var a3 = e4.getTextGuideLine();
          var s3 = e4.isGroup;
          if (s3)
            for (var l3 = e4.childrenRef(), u3 = 0; u3 < l3.length; u3++)
              r3 = Jo(t4(l3[u3], n4, i3, r3), r3);
          else
            e4.z = n4, e4.zlevel = i3, r3 = Jo(e4.z2 || 0, r3);
          o3 && (o3.z = n4, o3.zlevel = i3, isFinite(r3)) && (o3.z2 = r3 + 2);
          a3 && (s3 = e4.textGuideLineConfig, a3.z = n4, a3.zlevel = i3, isFinite(r3)) && (a3.z2 = r3 + (s3 && s3.showAbove ? 1 : -1));
          return r3;
        }(t3, e3, n3, -1 / 0);
      }
      new oo().transform = Ve(), Wp("circle", ac), Wp("ellipse", hc), Wp("sector", Cc), Wp("ring", Lc), Wp("polygon", zc), Wp("polyline", Fc), Wp("rect", uu), Wp("line", Xc), Wp("bezierCurve", $c), Wp("arc", ep);
      var ud = {};
      function hd(t3, e3) {
        for (var n3 = 0; n3 < Zu.length; n3++) {
          var i3 = Zu[n3], r3 = e3[i3], i3 = t3.ensureState(i3);
          i3.style = i3.style || {}, i3.style.text = r3;
        }
        var o3 = t3.currentStates.slice();
        t3.clearStates(true), t3.setStyle({ text: e3.normal }), t3.useStates(o3, true);
      }
      function cd(t3, e3, n3) {
        for (var i3, r3 = t3.labelFetcher, o3 = t3.labelDataIndex, a3 = t3.labelDimIndex, s3 = e3.normal, l3 = { normal: i3 = null == (i3 = r3 ? r3.getFormattedLabel(o3, "normal", null, a3, s3 && s3.get("formatter"), null != n3 ? { interpolatedValue: n3 } : null) : i3) ? H(t3.defaultText) ? t3.defaultText(o3, t3, n3) : t3.defaultText : i3 }, u3 = 0; u3 < Zu.length; u3++) {
          var h3 = Zu[u3], c3 = e3[h3];
          l3[h3] = Y(r3 ? r3.getFormattedLabel(o3, h3, null, a3, c3 && c3.get("formatter")) : null, i3);
        }
        return l3;
      }
      function pd(t3, e3, n3, i3) {
        n3 = n3 || ud;
        for (var r3 = t3 instanceof gu, o3 = false, a3 = 0; a3 < ju.length; a3++)
          if ((p3 = e3[ju[a3]]) && p3.getShallow("show")) {
            o3 = true;
            break;
          }
        var s3 = r3 ? t3 : t3.getTextContent();
        if (o3) {
          r3 || (s3 || (s3 = new gu(), t3.setTextContent(s3)), t3.stateProxy && (s3.stateProxy = t3.stateProxy));
          var l3 = cd(n3, e3), u3 = e3.normal, h3 = !!u3.getShallow("show"), c3 = fd(u3, i3 && i3.normal, n3, false, !r3);
          c3.text = l3.normal, r3 || t3.setTextConfig(gd(u3, n3, false));
          for (a3 = 0; a3 < Zu.length; a3++) {
            var p3, d3, f3, g3 = Zu[a3];
            (p3 = e3[g3]) && (d3 = s3.ensureState(g3), (f3 = !!Y(p3.getShallow("show"), h3)) != h3 && (d3.ignore = !f3), d3.style = fd(p3, i3 && i3[g3], n3, true, !r3), d3.style.text = l3[g3], r3 || (t3.ensureState(g3).textConfig = gd(p3, n3, true)));
          }
          s3.silent = !!u3.getShallow("silent"), null != s3.style.x && (c3.x = s3.style.x), null != s3.style.y && (c3.y = s3.style.y), s3.ignore = !h3, s3.useStyle(c3), s3.dirty(), n3.enableTextSetter && (xd(s3).setLabelText = function(t4) {
            t4 = cd(n3, e3, t4);
            hd(s3, t4);
          });
        } else
          s3 && (s3.ignore = true);
        t3.dirty();
      }
      function dd(t3, e3) {
        for (var n3 = { normal: t3.getModel(e3 = e3 || "label") }, i3 = 0; i3 < Zu.length; i3++) {
          var r3 = Zu[i3];
          n3[r3] = t3.getModel([r3, e3]);
        }
        return n3;
      }
      function fd(t3, e3, n3, i3, r3) {
        var o3 = {}, a3 = o3, s3 = t3, l3 = n3, u3 = i3, h3 = r3;
        l3 = l3 || ud;
        var c3, t3 = s3.ecModel, p3 = t3 && t3.option.textStyle, d3 = function(t4) {
          var e4;
          for (; t4 && t4 !== t4.ecModel; ) {
            var n4 = (t4.option || ud).rich;
            if (n4) {
              e4 = e4 || {};
              for (var i4 = O(n4), r4 = 0; r4 < i4.length; r4++) {
                var o4 = i4[r4];
                e4[o4] = 1;
              }
            }
            t4 = t4.parentModel;
          }
          return e4;
        }(s3);
        if (d3) {
          c3 = {};
          var f3, g3, y3 = "richInheritPlainLabel", m3 = Y(s3.get(y3), t3 ? t3.get(y3) : void 0);
          for (f3 in d3)
            d3.hasOwnProperty(f3) && (g3 = s3.getModel(["rich", f3]), _d(c3[f3] = {}, g3, p3, s3, m3, l3, u3, h3, false, true));
        }
        return c3 && (a3.rich = c3), (t3 = s3.get("overflow")) && (a3.overflow = t3), (y3 = s3.get("lineOverflow")) && (a3.lineOverflow = y3), t3 = a3, null != (y3 = s3.get("minMargin")) ? (y3 = U(y3) ? y3 / 2 : 0, t3.margin = [y3, y3, y3, y3], t3.__marginType = wd.minMargin) : null != (y3 = s3.get("textMargin")) && (t3.margin = kt(y3), t3.__marginType = wd.textMargin), _d(a3, s3, p3, null, null, l3, u3, h3, true, false), e3 && V(o3, e3), o3;
      }
      function gd(t3, e3, n3) {
        e3 = e3 || {};
        var i3 = {}, r3 = t3.getShallow("rotate"), o3 = Y(t3.getShallow("distance"), n3 ? null : 5), a3 = t3.getShallow("offset"), n3 = t3.getShallow("position") || (n3 ? null : "inside");
        return null != (n3 = "outside" === n3 ? e3.defaultOutsidePosition || "top" : n3) && (i3.position = n3), null != a3 && (i3.offset = a3), null != r3 && (r3 *= Math.PI / 180, i3.rotation = r3), null != o3 && (i3.distance = o3), i3.outsideFill = "inherit" === t3.get("color") ? e3.inheritColor || null : "auto", null != e3.autoOverflowArea && (i3.autoOverflowArea = e3.autoOverflowArea), null != e3.layoutRect && (i3.layoutRect = e3.layoutRect), i3;
      }
      var yd = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], md = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], vd = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
      function _d(t3, e3, n3, i3, r3, o3, a3, s3, l3, u3) {
        n3 = !a3 && n3 || ud;
        var h3 = o3 && o3.inheritColor, c3 = e3.getShallow("color"), p3 = e3.getShallow("textBorderColor"), d3 = Y(e3.getShallow("opacity"), n3.opacity), c3 = ("inherit" !== c3 && "auto" !== c3 || (c3 = h3 || null), "inherit" !== p3 && "auto" !== p3 || (p3 = h3 || null), s3 || (c3 = c3 || n3.color, p3 = p3 || n3.textBorderColor), null != c3 && (t3.fill = c3), null != p3 && (t3.stroke = p3), Y(e3.getShallow("textBorderWidth"), n3.textBorderWidth)), p3 = (null != c3 && (t3.lineWidth = c3), Y(e3.getShallow("textBorderType"), n3.textBorderType)), c3 = (null != p3 && (t3.lineDash = p3), Y(e3.getShallow("textBorderDashOffset"), n3.textBorderDashOffset));
        null != c3 && (t3.lineDashOffset = c3), null != (d3 = a3 || null != d3 || u3 ? d3 : o3 && o3.defaultOpacity) && (t3.opacity = d3), a3 || s3 || null == t3.fill && o3.inheritColor && (t3.fill = o3.inheritColor);
        for (var f3 = 0; f3 < yd.length; f3++) {
          var g3 = yd[f3];
          null != (y3 = false !== r3 && i3 ? It(e3.getShallow(g3), i3.getShallow(g3), n3[g3]) : Y(e3.getShallow(g3), n3[g3])) && (t3[g3] = y3);
        }
        for (var f3 = 0; f3 < md.length; f3++) {
          g3 = md[f3];
          null != (y3 = e3.getShallow(g3)) && (t3[g3] = y3);
        }
        if (null == t3.verticalAlign && null != (p3 = e3.getShallow("baseline")) && (t3.verticalAlign = p3), !l3 || !o3.disableBox) {
          for (f3 = 0; f3 < vd.length; f3++) {
            var y3, g3 = vd[f3];
            null != (y3 = e3.getShallow(g3)) && (t3[g3] = y3);
          }
          c3 = e3.getShallow("borderType");
          null != c3 && (t3.borderDash = c3), "auto" !== t3.backgroundColor && "inherit" !== t3.backgroundColor || !h3 || (t3.backgroundColor = h3), "auto" !== t3.borderColor && "inherit" !== t3.borderColor || !h3 || (t3.borderColor = h3);
        }
      }
      var xd = i();
      function bd(n3, i3, r3, t3, o3) {
        var a3, s3, l3, u3 = xd(n3);
        u3.valueAnimation && u3.prevValue !== u3.value && (a3 = u3.defaultInterpolatedText, s3 = Y(u3.interpolatedValue, u3.prevValue), l3 = u3.value, n3.percent = 0, (null == u3.prevValue ? Ap : Dp)(n3, { percent: 1 }, t3, i3, null, function(t4) {
          var e3 = Ka(r3, u3.precision, s3, l3, t4), t4 = (u3.interpolatedValue = 1 === t4 ? null : e3, cd({ labelDataIndex: i3, labelFetcher: o3, defaultText: a3 ? a3(e3) : e3 + "" }, u3.statesModels, e3));
          hd(n3, t4);
        }));
      }
      var wd = { minMargin: 1, textMargin: 2 }, Sd = ["textStyle", "color"], Md = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], Td = new gu(), Id = (Cd.prototype.getTextColor = function(t3) {
        var e3 = this.ecModel;
        return this.getShallow("color") || (!t3 && e3 ? e3.get(Sd) : null);
      }, Cd.prototype.getFont = function() {
        return t3 = { fontStyle: this.getShallow("fontStyle"), fontWeight: this.getShallow("fontWeight"), fontSize: this.getShallow("fontSize"), fontFamily: this.getShallow("fontFamily") }, e3 = (e3 = this.ecModel) && e3.getModel("textStyle"), At([t3.fontStyle || e3 && e3.getShallow("fontStyle") || "", t3.fontWeight || e3 && e3.getShallow("fontWeight") || "", (t3.fontSize || e3 && e3.getShallow("fontSize") || 12) + "px", t3.fontFamily || e3 && e3.getShallow("fontFamily") || "sans-serif"].join(" "));
        var t3, e3;
      }, Cd.prototype.getTextRect = function(t3) {
        for (var e3 = { text: t3, verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline") }, n3 = 0; n3 < Md.length; n3++)
          e3[Md[n3]] = this.getShallow(Md[n3]);
        return Td.useStyle(e3), Td.update(), Td.getBoundingRect();
      }, Cd);
      function Cd() {
      }
      var kd = [["lineWidth", "width"], ["stroke", "color"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"], ["lineDash", "type"], ["lineDashOffset", "dashOffset"], ["lineCap", "cap"], ["lineJoin", "join"], ["miterLimit"]], Dd = xs(kd), Ad = (Ld.prototype.getLineStyle = function(t3) {
        return Dd(this, t3);
      }, Ld);
      function Ld() {
      }
      var Pd = [["fill", "color"], ["stroke", "borderColor"], ["lineWidth", "borderWidth"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"], ["lineDash", "borderType"], ["lineDashOffset", "borderDashOffset"], ["lineCap", "borderCap"], ["lineJoin", "borderJoin"], ["miterLimit", "borderMiterLimit"]], Od = xs(Pd), Rd = (Nd.prototype.getItemStyle = function(t3, e3) {
        return Od(this, t3, e3);
      }, Nd);
      function Nd() {
      }
      Ed.prototype.init = function(t3, e3, n3) {
      }, Ed.prototype.mergeOption = function(t3, e3) {
        d(this.option, t3, true);
      }, Ed.prototype.get = function(t3, e3) {
        return null == t3 ? this.option : this._doGet(this.parsePath(t3), !e3 && this.parentModel);
      }, Ed.prototype.getShallow = function(t3, e3) {
        var n3 = this.option, n3 = null == n3 ? n3 : n3[t3];
        return null != n3 || e3 || (e3 = this.parentModel) && (n3 = e3.getShallow(t3)), n3;
      }, Ed.prototype.getModel = function(t3, e3) {
        var n3 = null != t3, t3 = n3 ? this.parsePath(t3) : null;
        return new Ed(n3 ? this._doGet(t3) : this.option, e3 = e3 || this.parentModel && this.parentModel.getModel(this.resolveParentPath(t3)), this.ecModel);
      }, Ed.prototype.isEmpty = function() {
        return null == this.option;
      }, Ed.prototype.restoreData = function() {
      }, Ed.prototype.clone = function() {
        return new this.constructor(_(this.option));
      }, Ed.prototype.parsePath = function(t3) {
        return "string" == typeof t3 ? t3.split(".") : t3;
      }, Ed.prototype.resolveParentPath = function(t3) {
        return t3;
      }, Ed.prototype.isAnimationEnabled = function() {
        if (!b.node && this.option)
          return null != this.option.animation ? !!this.option.animation : this.parentModel ? this.parentModel.isAnimationEnabled() : void 0;
      }, Ed.prototype._doGet = function(t3, e3) {
        var n3 = this.option;
        if (t3) {
          for (var i3 = 0; i3 < t3.length && (!t3[i3] || null != (n3 = n3 && "object" == typeof n3 ? n3[t3[i3]] : null)); i3++)
            ;
          null == n3 && e3 && (n3 = e3._doGet(this.resolveParentPath(t3), e3.parentModel));
        }
        return n3;
      };
      var zd, Bd = Ed;
      function Ed(t3, e3, n3) {
        this.parentModel = e3, this.ecModel = n3, this.option = t3;
      }
      fs(Bd), af = Bd, zd = ["__\0is_clz", ys++].join("_"), af.prototype[zd] = true, af.isInstance = function(t3) {
        return !(!t3 || !t3[zd]);
      }, ct(Bd, Ad), ct(Bd, Rd), ct(Bd, ws), ct(Bd, Id);
      var Vd = Math.round(10 * Math.random());
      function Fd(t3) {
        return [t3 || "", Vd++].join("_");
      }
      function Gd(t3, e3) {
        return d(d({}, t3, true), e3, true);
      }
      var Hd = "ZH", Wd = "EN", Ud = Wd, Xd = {}, Yd = {}, qd = b.domSupported && -1 < (document.documentElement.lang || navigator.language || navigator.browserLanguage || Ud).toUpperCase().indexOf(Hd) ? Hd : Ud;
      function Zd(t3, e3) {
        t3 = t3.toUpperCase(), Yd[t3] = new Bd(e3), Xd[t3] = e3;
      }
      Zd(Wd, { time: { month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayOfWeekAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] }, legend: { selector: { all: "All", inverse: "Inv" } }, toolbox: { brush: { title: { rect: "Box Select", polygon: "Lasso Select", lineX: "Horizontally Select", lineY: "Vertically Select", keep: "Keep Selections", clear: "Clear Selections" } }, dataView: { title: "Data View", lang: ["Data View", "Close", "Refresh"] }, dataZoom: { title: { zoom: "Zoom", back: "Zoom Reset" } }, magicType: { title: { line: "Switch to Line Chart", bar: "Switch to Bar Chart", stack: "Stack", tiled: "Tile" } }, restore: { title: "Restore" }, saveAsImage: { title: "Save as Image", lang: ["Right Click to Save Image"] } }, series: { typeNames: { pie: "Pie chart", bar: "Bar chart", line: "Line chart", scatter: "Scatter plot", effectScatter: "Ripple scatter plot", radar: "Radar chart", tree: "Tree", treemap: "Treemap", boxplot: "Boxplot", candlestick: "Candlestick", k: "K line chart", heatmap: "Heat map", map: "Map", parallel: "Parallel coordinate map", lines: "Line graph", graph: "Relationship graph", sankey: "Sankey diagram", funnel: "Funnel chart", gauge: "Gauge", pictorialBar: "Pictorial bar", themeRiver: "Theme River Map", sunburst: "Sunburst", custom: "Custom chart", chart: "Chart" } }, aria: { general: { withTitle: 'This is a chart about "{title}"', withoutTitle: "This is a chart" }, series: { single: { prefix: "", withName: " with type {seriesType} named {seriesName}.", withoutName: " with type {seriesType}." }, multiple: { prefix: ". It consists of {seriesCount} series count.", withName: " The {seriesId} series is a {seriesType} representing {seriesName}.", withoutName: " The {seriesId} series is a {seriesType}.", separator: { middle: "", end: "" } } }, data: { allData: "The data is as follows: ", partialData: "The first {displayCnt} items are: ", withName: "the data for {name} is {value}", withoutName: "{value}", separator: { middle: ", ", end: ". " } } } }), Zd(Hd, { time: { month: ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"], monthAbbr: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"], dayOfWeek: ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"], dayOfWeekAbbr: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"] }, legend: { selector: { all: "\u5168\u9009", inverse: "\u53CD\u9009" } }, toolbox: { brush: { title: { rect: "\u77E9\u5F62\u9009\u62E9", polygon: "\u5708\u9009", lineX: "\u6A2A\u5411\u9009\u62E9", lineY: "\u7EB5\u5411\u9009\u62E9", keep: "\u4FDD\u6301\u9009\u62E9", clear: "\u6E05\u9664\u9009\u62E9" } }, dataView: { title: "\u6570\u636E\u89C6\u56FE", lang: ["\u6570\u636E\u89C6\u56FE", "\u5173\u95ED", "\u5237\u65B0"] }, dataZoom: { title: { zoom: "\u533A\u57DF\u7F29\u653E", back: "\u533A\u57DF\u7F29\u653E\u8FD8\u539F" } }, magicType: { title: { line: "\u5207\u6362\u4E3A\u6298\u7EBF\u56FE", bar: "\u5207\u6362\u4E3A\u67F1\u72B6\u56FE", stack: "\u5207\u6362\u4E3A\u5806\u53E0", tiled: "\u5207\u6362\u4E3A\u5E73\u94FA" } }, restore: { title: "\u8FD8\u539F" }, saveAsImage: { title: "\u4FDD\u5B58\u4E3A\u56FE\u7247", lang: ["\u53F3\u952E\u53E6\u5B58\u4E3A\u56FE\u7247"] } }, series: { typeNames: { pie: "\u997C\u56FE", bar: "\u67F1\u72B6\u56FE", line: "\u6298\u7EBF\u56FE", scatter: "\u6563\u70B9\u56FE", effectScatter: "\u6D9F\u6F2A\u6563\u70B9\u56FE", radar: "\u96F7\u8FBE\u56FE", tree: "\u6811\u56FE", treemap: "\u77E9\u5F62\u6811\u56FE", boxplot: "\u7BB1\u578B\u56FE", candlestick: "K\u7EBF\u56FE", k: "K\u7EBF\u56FE", heatmap: "\u70ED\u529B\u56FE", map: "\u5730\u56FE", parallel: "\u5E73\u884C\u5750\u6807\u56FE", lines: "\u7EBF\u56FE", graph: "\u5173\u7CFB\u56FE", sankey: "\u6851\u57FA\u56FE", funnel: "\u6F0F\u6597\u56FE", gauge: "\u4EEA\u8868\u76D8\u56FE", pictorialBar: "\u8C61\u5F62\u67F1\u56FE", themeRiver: "\u4E3B\u9898\u6CB3\u6D41\u56FE", sunburst: "\u65ED\u65E5\u56FE", custom: "\u81EA\u5B9A\u4E49\u56FE\u8868", chart: "\u56FE\u8868" } }, aria: { general: { withTitle: "\u8FD9\u662F\u4E00\u4E2A\u5173\u4E8E\u201C{title}\u201D\u7684\u56FE\u8868\u3002", withoutTitle: "\u8FD9\u662F\u4E00\u4E2A\u56FE\u8868\uFF0C" }, series: { single: { prefix: "", withName: "\u56FE\u8868\u7C7B\u578B\u662F{seriesType}\uFF0C\u8868\u793A{seriesName}\u3002", withoutName: "\u56FE\u8868\u7C7B\u578B\u662F{seriesType}\u3002" }, multiple: { prefix: "\u5B83\u7531{seriesCount}\u4E2A\u56FE\u8868\u7CFB\u5217\u7EC4\u6210\u3002", withName: "\u7B2C{seriesId}\u4E2A\u7CFB\u5217\u662F\u4E00\u4E2A\u8868\u793A{seriesName}\u7684{seriesType}\uFF0C", withoutName: "\u7B2C{seriesId}\u4E2A\u7CFB\u5217\u662F\u4E00\u4E2A{seriesType}\uFF0C", separator: { middle: "\uFF1B", end: "\u3002" } } }, data: { allData: "\u5176\u6570\u636E\u662F\u2014\u2014", partialData: "\u5176\u4E2D\uFF0C\u524D{displayCnt}\u9879\u662F\u2014\u2014", withName: "{name}\u7684\u6570\u636E\u662F{value}", withoutName: "{value}", separator: { middle: "\uFF0C", end: "" } } } });
      var jd = null;
      function Kd(t3, e3) {
        var n3 = jd, i3 = e3.breakOption, e3 = e3.breakParsed;
        return e3 = !e3 && n3 ? n3.parseAxisBreakOption(i3, t3) : e3;
      }
      function $d(t3) {
        t3 = t3.brk;
        return t3 ? t3.breaks : [];
      }
      function Qd(t3) {
        t3 = t3.brk;
        return !!t3 && t3.hasBreaks();
      }
      var Jd = 1e3, tf = 60 * Jd, ef = 60 * tf, nf = 24 * ef, ys = 365 * nf, rf = { year: /({yyyy}|{yy})/, month: /({MMMM}|{MMM}|{MM}|{M})/, day: /({dd}|{d})/, hour: /({HH}|{H}|{hh}|{h})/, minute: /({mm}|{m})/, second: /({ss}|{s})/, millisecond: /({SSS}|{S})/ }, of = { year: "{yyyy}", month: "{MMM}", day: "{d}", hour: "{HH}:{mm}", minute: "{HH}:{mm}", second: "{HH}:{mm}:{ss}", millisecond: "{HH}:{mm}:{ss} {SSS}" }, af = "{yyyy}-{MM}-{dd}", sf = { year: "{yyyy}", month: "{yyyy}-{MM}", day: af, hour: af + " " + of.hour, minute: af + " " + of.minute, second: af + " " + of.second, millisecond: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}" }, lf = ["year", "month", "day", "hour", "minute", "second", "millisecond"], uf = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];
      function hf(t3) {
        return W(t3) || H(t3) ? t3 : (l3 = (l3 = t3) || {}, u3 = {}, h3 = true, F(lf, function(t4) {
          h3 = h3 && null == l3[t4];
        }), F(lf, function(t4, e3) {
          for (var n3 = l3[t4], i3 = (u3[t4] = {}, null), r3 = e3; 0 <= r3; r3--) {
            var o3 = lf[r3], a3 = X(n3) && !G(n3) ? n3[o3] : n3, s3 = void 0;
            G(a3) ? i3 = (s3 = a3.slice())[0] || "" : W(a3) ? s3 = [i3 = a3] : (null == i3 ? i3 = of[t4] : rf[o3].test(i3) || (i3 = u3[o3][o3][0] + " " + i3), s3 = [i3], h3 && (s3[1] = "{primary|" + i3 + "}")), u3[t4][o3] = s3;
          }
        }), u3);
        var l3, u3, h3;
      }
      function cf(t3, e3) {
        return "0000".substr(0, e3 - (t3 += "").length) + t3;
      }
      function pf(t3) {
        switch (t3) {
          case "half-year":
          case "quarter":
            return "month";
          case "week":
          case "half-week":
            return "day";
          case "half-day":
          case "quarter-day":
            return "hour";
          default:
            return t3;
        }
      }
      function df(t3, e3, n3, i3) {
        var t3 = xa(t3), r3 = t3[yf(n3)](), o3 = t3[mf(n3)]() + 1, a3 = Math.floor((o3 - 1) / 3) + 1, s3 = t3[vf(n3)](), l3 = t3["get" + (n3 ? "UTC" : "") + "Day"](), u3 = t3[_f(n3)](), h3 = (u3 - 1) % 12 + 1, c3 = t3[xf(n3)](), p3 = t3[bf(n3)](), t3 = t3[wf(n3)](), n3 = 12 <= u3 ? "pm" : "am", d3 = n3.toUpperCase(), i3 = (i3 instanceof Bd ? i3 : Yd[i3 || qd] || Yd[Ud]).getModel("time"), f3 = i3.get("month"), g3 = i3.get("monthAbbr"), y3 = i3.get("dayOfWeek"), i3 = i3.get("dayOfWeekAbbr");
        return (e3 || "").replace(/{a}/g, n3 + "").replace(/{A}/g, d3 + "").replace(/{yyyy}/g, r3 + "").replace(/{yy}/g, cf(r3 % 100 + "", 2)).replace(/{Q}/g, a3 + "").replace(/{MMMM}/g, f3[o3 - 1]).replace(/{MMM}/g, g3[o3 - 1]).replace(/{MM}/g, cf(o3, 2)).replace(/{M}/g, o3 + "").replace(/{dd}/g, cf(s3, 2)).replace(/{d}/g, s3 + "").replace(/{eeee}/g, y3[l3]).replace(/{ee}/g, i3[l3]).replace(/{e}/g, l3 + "").replace(/{HH}/g, cf(u3, 2)).replace(/{H}/g, u3 + "").replace(/{hh}/g, cf(h3 + "", 2)).replace(/{h}/g, h3 + "").replace(/{mm}/g, cf(c3, 2)).replace(/{m}/g, c3 + "").replace(/{ss}/g, cf(p3, 2)).replace(/{s}/g, p3 + "").replace(/{SSS}/g, cf(t3, 3)).replace(/{S}/g, t3 + "");
      }
      function ff(t3, e3) {
        var t3 = xa(t3), n3 = t3[mf(e3)]() + 1, i3 = t3[vf(e3)](), r3 = t3[_f(e3)](), o3 = t3[xf(e3)](), a3 = t3[bf(e3)](), t3 = 0 === t3[wf(e3)](), e3 = t3 && 0 === a3, a3 = e3 && 0 === o3, o3 = a3 && 0 === r3, r3 = o3 && 1 === i3;
        return r3 && 1 === n3 ? "year" : r3 ? "month" : o3 ? "day" : a3 ? "hour" : e3 ? "minute" : t3 ? "second" : "millisecond";
      }
      function gf(t3, e3, n3) {
        switch (e3) {
          case "year":
            t3[Sf(n3)](0);
          case "month":
            t3[Mf(n3)](1);
          case "day":
            t3[Tf(n3)](0);
          case "hour":
            t3[If(n3)](0);
          case "minute":
            t3[Cf(n3)](0);
          case "second":
            t3[kf(n3)](0);
        }
        return t3;
      }
      function yf(t3) {
        return t3 ? "getUTCFullYear" : "getFullYear";
      }
      function mf(t3) {
        return t3 ? "getUTCMonth" : "getMonth";
      }
      function vf(t3) {
        return t3 ? "getUTCDate" : "getDate";
      }
      function _f(t3) {
        return t3 ? "getUTCHours" : "getHours";
      }
      function xf(t3) {
        return t3 ? "getUTCMinutes" : "getMinutes";
      }
      function bf(t3) {
        return t3 ? "getUTCSeconds" : "getSeconds";
      }
      function wf(t3) {
        return t3 ? "getUTCMilliseconds" : "getMilliseconds";
      }
      function Sf(t3) {
        return t3 ? "setUTCMonth" : "setMonth";
      }
      function Mf(t3) {
        return t3 ? "setUTCDate" : "setDate";
      }
      function Tf(t3) {
        return t3 ? "setUTCHours" : "setHours";
      }
      function If(t3) {
        return t3 ? "setUTCMinutes" : "setMinutes";
      }
      function Cf(t3) {
        return t3 ? "setUTCSeconds" : "setSeconds";
      }
      function kf(t3) {
        return t3 ? "setUTCMilliseconds" : "setMilliseconds";
      }
      function Df(t3) {
        var e3;
        return Ia(t3) ? (e3 = (t3 + "").split("."))[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (1 < e3.length ? "." + e3[1] : "") : W(t3) ? t3 : "-";
      }
      function Af(t3, e3) {
        return "{" + t3 + (null == e3 ? "" : e3) + "}";
      }
      var Lf = kt, Pf = ["a", "b", "c", "d", "e", "f", "g"];
      function Of(t3, e3, n3) {
        var i3 = (e3 = G(e3) ? e3 : [e3]).length;
        if (!i3)
          return "";
        for (var r3 = e3[0].$vars || [], o3 = 0; o3 < r3.length; o3++) {
          var a3 = Pf[o3];
          t3 = t3.replace(Af(a3), Af(a3, 0));
        }
        for (var s3 = 0; s3 < i3; s3++)
          for (var l3 = 0; l3 < r3.length; l3++) {
            var u3 = e3[s3][r3[l3]];
            t3 = t3.replace(Af(Pf[l3], s3), n3 ? Te(u3) : u3);
          }
        return t3;
      }
      function Rf(t3, e3) {
        return e3 = e3 || "transparent", W(t3) ? t3 : X(t3) && t3.colorStops && (t3.colorStops[0] || {}).color || e3;
      }
      function Nf(t3, e3) {
        var n3;
        "_blank" === e3 || "blank" === e3 ? ((n3 = window.open()).opener = null, n3.location.href = t3) : window.open(t3, e3);
      }
      var zf = {}, Bf = {}, Ef = (Vf.prototype.create = function(i3, r3) {
        function t3(t4) {
          var n3 = [];
          return F(t4, function(t5, e3) {
            t5 = t5.create(i3, r3);
            n3 = n3.concat(t5 || []);
          }), n3;
        }
        this._nonSeriesBoxMasterList = t3(zf), this._normalMasterList = t3(Bf);
      }, Vf.prototype.update = function(e3, n3) {
        F(this._normalMasterList, function(t3) {
          t3.update && t3.update(e3, n3);
        });
      }, Vf.prototype.getCoordinateSystems = function() {
        return this._normalMasterList.concat(this._nonSeriesBoxMasterList);
      }, Vf.register = function(t3, e3) {
        "matrix" === t3 || "calendar" === t3 ? zf[t3] = e3 : Bf[t3] = e3;
      }, Vf.get = function(t3) {
        return Bf[t3] || zf[t3];
      }, Vf);
      function Vf() {
        this._normalMasterList = [], this._nonSeriesBoxMasterList = [];
      }
      var Ff = 1, Gf = 2;
      var Hf = I();
      function Wf(t3) {
        var e3, n3 = t3.getShallow("coord", true), i3 = Ff;
        return null == n3 && (e3 = Hf.get(t3.type)) && e3.getCoord2 && (i3 = Gf, n3 = e3.getCoord2(t3)), { coord: n3, from: i3 };
      }
      var Uf = 0, Xf = 1, Yf = 2;
      function qf(t3) {
        var e3 = t3.getShallow("coordinateSystem"), n3 = t3.getShallow("coordinateSystemUsage", true), i3 = Uf;
        return e3 && (t3 = "series" === t3.mainType, "data" === (n3 = null == n3 ? t3 ? "data" : "box" : n3) ? i3 = t3 ? Xf : Uf : "box" === n3 && (i3 = Yf, t3 || zf[e3] || (i3 = Uf))), { coordSysType: e3, kind: i3 };
      }
      var Zf = F, jf = ["left", "right", "top", "bottom", "width", "height"], Kf = [["width", "left", "right"], ["height", "top", "bottom"]];
      function $f(a3, s3, l3, u3, h3) {
        var c3 = 0, p3 = 0, d3 = (null == u3 && (u3 = 1 / 0), null == h3 && (h3 = 1 / 0), 0);
        s3.eachChild(function(t3, e3) {
          var n3, i3, r3, o3 = t3.getBoundingRect(), e3 = s3.childAt(e3 + 1), e3 = e3 && e3.getBoundingRect();
          d3 = "horizontal" === a3 ? (i3 = o3.width + (e3 ? -e3.x + o3.x : 0), u3 < (n3 = c3 + i3) || t3.newline ? (c3 = 0, n3 = i3, p3 += d3 + l3, o3.height) : Math.max(d3, o3.height)) : (i3 = o3.height + (e3 ? -e3.y + o3.y : 0), h3 < (r3 = p3 + i3) || t3.newline ? (c3 += d3 + l3, p3 = 0, r3 = i3, o3.width) : Math.max(d3, o3.width)), t3.newline || (t3.x = c3, t3.y = p3, t3.markRedraw(), "horizontal" === a3 ? c3 = n3 + l3 : p3 = r3 + l3);
        });
      }
      var Qf = $f;
      function Jf(t3, e3) {
        r3 = ng(o3 = t3, n3 = e3, { enableLayoutOnlyByCenter: true }), i3 = o3.getBoxLayoutParams(), r3.type === eg.point ? (s3 = r3.refPoint, a3 = tg(i3, { width: n3.getWidth(), height: n3.getHeight() })) : (o3 = G(n3 = o3.get("center")) ? n3 : [n3, n3], a3 = tg(i3, r3.refContainer), s3 = r3.boxCoordFrom === Gf ? r3.refPoint : [ha(o3[0], a3.width) + a3.x, ha(o3[1], a3.height) + a3.y]);
        var n3 = { viewRect: a3, center: s3 }, i3 = n3.viewRect, r3 = n3.center, o3 = t3.get("radius"), a3 = (G(o3) || (o3 = [0, o3]), ha(i3.width, e3.getWidth())), s3 = ha(i3.height, e3.getHeight()), n3 = Math.min(a3, s3), t3 = ha(o3[0], n3 / 2), e3 = ha(o3[1], n3 / 2);
        return { cx: r3[0], cy: r3[1], r0: t3, r: e3, viewRect: i3 };
      }
      function tg(t3, e3, n3) {
        n3 = Lf(n3 || 0);
        var i3 = e3.width, r3 = e3.height, o3 = ha(t3.left, i3), a3 = ha(t3.top, r3), s3 = ha(t3.right, i3), l3 = ha(t3.bottom, r3), u3 = ha(t3.width, i3), h3 = ha(t3.height, r3), c3 = n3[2] + n3[0], p3 = n3[1] + n3[3], d3 = t3.aspect;
        switch (isNaN(u3) && (u3 = i3 - s3 - p3 - o3), isNaN(h3) && (h3 = r3 - l3 - c3 - a3), null != d3 && (isNaN(u3) && isNaN(h3) && (i3 / r3 < d3 ? u3 = 0.8 * i3 : h3 = 0.8 * r3), isNaN(u3) && (u3 = d3 * h3), isNaN(h3)) && (h3 = u3 / d3), isNaN(o3) && (o3 = i3 - s3 - u3 - p3), isNaN(a3) && (a3 = r3 - l3 - h3 - c3), t3.left || t3.right) {
          case "center":
            o3 = i3 / 2 - u3 / 2 - n3[3];
            break;
          case "right":
            o3 = i3 - u3 - p3;
        }
        switch (t3.top || t3.bottom) {
          case "middle":
          case "center":
            a3 = r3 / 2 - h3 / 2 - n3[0];
            break;
          case "bottom":
            a3 = r3 - h3 - c3;
        }
        o3 = o3 || 0, a3 = a3 || 0, isNaN(u3) && (u3 = i3 - p3 - o3 - (s3 || 0)), isNaN(h3) && (h3 = r3 - c3 - a3 - (l3 || 0));
        d3 = new Z((e3.x || 0) + o3 + n3[3], (e3.y || 0) + a3 + n3[0], u3, h3);
        return d3.margin = n3, d3;
      }
      yt($f, "vertical"), yt($f, "horizontal");
      var eg = { rect: 1, point: 2 };
      function ng(t3, e3, n3) {
        var i3, r3, o3, a3, s3, l3 = t3.boxCoordinateSystem;
        return l3 && (r3 = (t3 = Wf(t3)).coord, t3 = t3.from, l3.dataToLayout ? (o3 = eg.rect, a3 = t3, s3 = (s3 = l3.dataToLayout(r3)).contentRect || s3.rect) : n3 && n3.enableLayoutOnlyByCenter && l3.dataToPoint && (o3 = eg.point, a3 = t3, i3 = l3.dataToPoint(r3))), (o3 = null == o3 ? eg.rect : o3) === eg.rect && (i3 = [(s3 = s3 || { x: 0, y: 0, width: e3.getWidth(), height: e3.getHeight() }).x + s3.width / 2, s3.y + s3.height / 2]), { type: o3, refContainer: s3, refPoint: i3, boxCoordFrom: a3 };
      }
      function ig(t3) {
        t3 = t3.layoutMode || t3.constructor.layoutMode;
        return X(t3) ? t3 : t3 ? { type: t3 } : null;
      }
      function rg(l3, u3, t3) {
        var h3 = t3 && t3.ignoreSize, t3 = (G(h3) || (h3 = [h3, h3]), n3(Kf[0], 0)), e3 = n3(Kf[1], 1);
        function n3(t4, e4) {
          var n4 = {}, i4 = 0, r3 = {}, o3 = 0;
          if (Zf(t4, function(t5) {
            r3[t5] = l3[t5];
          }), Zf(t4, function(t5) {
            Ht(u3, t5) && (n4[t5] = r3[t5] = u3[t5]), c3(n4, t5) && i4++, c3(r3, t5) && o3++;
          }), h3[e4])
            c3(u3, t4[1]) ? r3[t4[2]] = null : c3(u3, t4[2]) && (r3[t4[1]] = null);
          else if (2 !== o3 && i4) {
            if (!(2 <= i4))
              for (var a3 = 0; a3 < t4.length; a3++) {
                var s3 = t4[a3];
                if (!Ht(n4, s3) && Ht(l3, s3)) {
                  n4[s3] = l3[s3];
                  break;
                }
              }
            return n4;
          }
          return r3;
        }
        function c3(t4, e4) {
          return null != t4[e4] && "auto" !== t4[e4];
        }
        function i3(t4, e4, n4) {
          Zf(t4, function(t5) {
            e4[t5] = n4[t5];
          });
        }
        i3(Kf[0], l3, t3), i3(Kf[1], l3, e3);
      }
      function og(t3) {
        return e3 = {}, (n3 = t3) && e3 && Zf(jf, function(t4) {
          Ht(n3, t4) && (e3[t4] = n3[t4]);
        }), e3;
        var e3, n3;
      }
      var ag, sg, lg, ug, hg = i(), cg = (u(pg, ag = Bd), pg.prototype.init = function(t3, e3, n3) {
        this.mergeDefaultAndTheme(t3, n3);
      }, pg.prototype.mergeDefaultAndTheme = function(t3, e3) {
        var n3 = ig(this), i3 = n3 ? og(t3) : {};
        d(t3, e3.getTheme().get(this.mainType)), d(t3, this.getDefaultOption()), n3 && rg(t3, i3, n3);
      }, pg.prototype.mergeOption = function(t3, e3) {
        d(this.option, t3, true);
        var n3 = ig(this);
        n3 && rg(this.option, t3, n3);
      }, pg.prototype.optionUpdated = function(t3, e3) {
      }, pg.prototype.getDefaultOption = function() {
        var t3 = this.constructor;
        if (!(e3 = t3) || !e3[ps])
          return t3.defaultOption;
        var e3 = hg(this);
        if (!e3.defaultOption) {
          for (var n3 = [], i3 = t3; i3; ) {
            var r3 = i3.prototype.defaultOption;
            r3 && n3.push(r3), i3 = i3.superClass;
          }
          for (var o3 = {}, a3 = n3.length - 1; 0 <= a3; a3--)
            o3 = d(o3, n3[a3], true);
          e3.defaultOption = o3;
        }
        return e3.defaultOption;
      }, pg.prototype.getReferringComponents = function(t3, e3) {
        var n3 = t3 + "Id";
        return Za(this.ecModel, t3, { index: this.get(t3 + "Index", true), id: this.get(n3, true) }, e3);
      }, pg.prototype.getBoxLayoutParams = function() {
        return e3 = false, { left: (t3 = this).getShallow("left", e3), top: t3.getShallow("top", e3), right: t3.getShallow("right", e3), bottom: t3.getShallow("bottom", e3), width: t3.getShallow("width", e3), height: t3.getShallow("height", e3) };
        var t3, e3;
      }, pg.prototype.getZLevelKey = function() {
        return "";
      }, pg.prototype.setZLevel = function(t3) {
        this.option.zlevel = t3;
      }, pg.protoInitialize = ((Ad = pg.prototype).type = "component", Ad.id = "", Ad.name = "", Ad.mainType = "", Ad.subType = "", void (Ad.componentIndex = 0)), pg);
      function pg(t3, e3, n3) {
        t3 = ag.call(this, t3, e3, n3) || this;
        return t3.uid = Fd("ec_cpt_model"), t3;
      }
      function dg(t3, e3) {
        return t3[e3] || (t3[e3] = { predecessor: [], successor: [] }), t3[e3];
      }
      gs(cg, Bd), _s(cg), lg = {}, (sg = cg).registerSubTypeDefaulter = function(t3, e3) {
        t3 = ds(t3);
        lg[t3.main] = e3;
      }, sg.determineSubType = function(t3, e3) {
        var n3, i3 = e3.type;
        return i3 || (n3 = ds(t3).main, sg.hasSubTypes(t3) && lg[n3] && (i3 = lg[n3](e3))), i3;
      }, ug = function(t3) {
        var e3 = [];
        F(cg.getClassesByMainType(t3), function(t4) {
          e3 = e3.concat(t4.dependencies || t4.prototype.dependencies || []);
        }), e3 = E(e3, function(t4) {
          return ds(t4).main;
        }), "dataset" !== t3 && L(e3, "dataset") <= 0 && e3.unshift("dataset");
        return e3;
      }, cg.topologicalTravel = function(t3, e3, n3, i3) {
        if (t3.length) {
          a3 = {}, s3 = [], F(o3 = e3, function(n4) {
            var e4, i4, r4 = dg(a3, n4), t4 = r4.originalDeps = ug(n4), t4 = (e4 = o3, i4 = [], F(t4, function(t5) {
              0 <= L(e4, t5) && i4.push(t5);
            }), i4);
            r4.entryCount = t4.length, 0 === r4.entryCount && s3.push(n4), F(t4, function(t5) {
              L(r4.predecessor, t5) < 0 && r4.predecessor.push(t5);
              var e5 = dg(a3, t5);
              L(e5.successor, t5) < 0 && e5.successor.push(n4);
            });
          });
          var o3, a3, s3, e3 = { graph: a3, noEntryList: s3 }, r3 = e3.graph, l3 = e3.noEntryList, u3 = {};
          for (F(t3, function(t4) {
            u3[t4] = true;
          }); l3.length; ) {
            var h3 = l3.pop(), c3 = r3[h3], p3 = !!u3[h3];
            p3 && (n3.call(i3, h3, c3.originalDeps.slice()), delete u3[h3]), F(c3.successor, p3 ? f3 : d3);
          }
          F(u3, function() {
            throw new Error("");
          });
        }
        function d3(t4) {
          r3[t4].entryCount--, 0 === r3[t4].entryCount && l3.push(t4);
        }
        function f3(t4) {
          u3[t4] = true, d3(t4);
        }
      };
      var fg, gg, v = { color: {}, darkColor: {}, size: {} }, yg = v.color = { theme: ["#5070dd", "#b6d634", "#505372", "#ff994d", "#0ca8df", "#ffd10a", "#fb628b", "#785db0", "#3fbe95"], neutral00: "#fff", neutral05: "#f4f7fd", neutral10: "#e8ebf0", neutral15: "#dbdee4", neutral20: "#cfd2d7", neutral25: "#c3c5cb", neutral30: "#b7b9be", neutral35: "#aaacb2", neutral40: "#9ea0a5", neutral45: "#929399", neutral50: "#86878c", neutral55: "#797b7f", neutral60: "#6d6e73", neutral65: "#616266", neutral70: "#54555a", neutral75: "#48494d", neutral80: "#3c3c41", neutral85: "#303034", neutral90: "#232328", neutral95: "#17171b", neutral99: "#000", accent05: "#eff1f9", accent10: "#e0e4f2", accent15: "#d0d6ec", accent20: "#c0c9e6", accent25: "#b1bbdf", accent30: "#a1aed9", accent35: "#91a0d3", accent40: "#8292cc", accent45: "#7285c6", accent50: "#6578ba", accent55: "#5c6da9", accent60: "#536298", accent65: "#4a5787", accent70: "#404c76", accent75: "#374165", accent80: "#2e3654", accent85: "#252b43", accent90: "#1b2032", accent95: "#121521", transparent: "rgba(0,0,0,0)", highlight: "rgba(255,231,130,0.8)" };
      for (fg in V(yg, { primary: yg.neutral80, secondary: yg.neutral70, tertiary: yg.neutral60, quaternary: yg.neutral50, disabled: yg.neutral20, border: yg.neutral30, borderTint: yg.neutral20, borderShade: yg.neutral40, background: yg.neutral05, backgroundTint: "rgba(234,237,245,0.5)", backgroundTransparent: "rgba(255,255,255,0)", backgroundShade: yg.neutral10, shadow: "rgba(0,0,0,0.2)", shadowTint: "rgba(129,130,136,0.2)", axisLine: yg.neutral70, axisLineTint: yg.neutral40, axisTick: yg.neutral70, axisTickMinor: yg.neutral60, axisLabel: yg.neutral70, axisSplitLine: yg.neutral15, axisMinorSplitLine: yg.neutral05 }), yg)
        yg.hasOwnProperty(fg) && (gg = yg[fg], "theme" === fg ? v.darkColor.theme = yg.theme.slice() : "highlight" === fg ? v.darkColor.highlight = "rgba(255,231,130,0.4)" : 0 === fg.indexOf("accent") ? v.darkColor[fg] = Xi(gg, null, function(t3) {
          return 0.5 * t3;
        }, function(t3) {
          return Math.min(1, 1.3 - t3);
        }) : v.darkColor[fg] = Xi(gg, null, function(t3) {
          return 0.9 * t3;
        }, function(t3) {
          return 1 - Math.pow(t3, 1.5);
        }));
      v.size = { xxs: 2, xs: 5, s: 10, m: 15, l: 20, xl: 30, xxl: 40, xxxl: 50 };
      var Rd = "", ws = ("undefined" != typeof navigator && (Rd = navigator.platform || ""), "rgba(0, 0, 0, 0.2)"), Id = v.color.theme[0], af = Xi(Id, null, null, 0.9), mg = { darkMode: "auto", colorBy: "series", color: v.color.theme, gradientColor: [af, Id], aria: { decal: { decals: [{ color: ws, dashArrayX: [1, 0], dashArrayY: [2, 5], symbolSize: 1, rotation: Math.PI / 6 }, { color: ws, symbol: "circle", dashArrayX: [[8, 8], [0, 8, 8, 0]], dashArrayY: [6, 0], symbolSize: 0.8 }, { color: ws, dashArrayX: [1, 0], dashArrayY: [4, 3], rotation: -Math.PI / 4 }, { color: ws, dashArrayX: [[6, 6], [0, 6, 6, 0]], dashArrayY: [6, 0] }, { color: ws, dashArrayX: [[1, 0], [1, 6]], dashArrayY: [1, 0, 6, 0], rotation: Math.PI / 4 }, { color: ws, symbol: "triangle", dashArrayX: [[9, 9], [0, 9, 9, 0]], dashArrayY: [7, 2], symbolSize: 0.75 }] } }, textStyle: { fontFamily: Rd.match(/^Win/) ? "Microsoft YaHei" : "sans-serif", fontSize: 12, fontStyle: "normal", fontWeight: "normal" }, blendMode: null, stateAnimation: { duration: 300, easing: "cubicOut" }, animation: "auto", animationDuration: 1e3, animationDurationUpdate: 500, animationEasing: "cubicInOut", animationEasingUpdate: "cubicInOut", animationThreshold: 2e3, progressiveThreshold: 3e3, progressive: 400, hoverLayerThreshold: 3e3, useUTC: false }, vg = { Must: 1, Might: 2, Not: 3 }, _g = i();
      function xg(n3, t3, e3) {
        var r3, o3, a3, i3, s3, l3 = {}, u3 = wg(t3);
        return u3 && n3 && (r3 = [], o3 = [], t3 = t3.ecModel, t3 = _g(t3).datasetMap, u3 = u3.uid + "_" + e3.seriesLayoutBy, F(n3 = n3.slice(), function(t4, e4) {
          t4 = X(t4) ? t4 : n3[e4] = { name: t4 };
          "ordinal" === t4.type && null == a3 && (a3 = e4, i3 = c3(t4)), l3[t4.name] = [];
        }), s3 = t3.get(u3) || t3.set(u3, { categoryWayDim: i3, valueWayDim: 0 }), F(n3, function(t4, e4) {
          var n4, i4 = t4.name, t4 = c3(t4);
          null == a3 ? (n4 = s3.valueWayDim, h3(l3[i4], n4, t4), h3(o3, n4, t4), s3.valueWayDim += t4) : a3 === e4 ? (h3(l3[i4], 0, t4), h3(r3, 0, t4)) : (n4 = s3.categoryWayDim, h3(l3[i4], n4, t4), h3(o3, n4, t4), s3.categoryWayDim += t4);
        }), r3.length && (l3.itemName = r3), o3.length) && (l3.seriesName = o3), l3;
        function h3(t4, e4, n4) {
          for (var i4 = 0; i4 < n4; i4++)
            t4.push(e4 + i4);
        }
        function c3(t4) {
          t4 = t4.dimsDef;
          return t4 ? t4.length : 1;
        }
      }
      function bg(t3, l3, u3) {
        var h3, c3, p3, e3 = {};
        return wg(t3) && (h3 = l3.sourceFormat, c3 = l3.dimensionsDefine, h3 !== Ru && h3 !== Nu || F(c3, function(t4, e4) {
          "name" === (X(t4) ? t4.name : t4) && (p3 = e4);
        }), t3 = function() {
          for (var t4 = {}, e4 = {}, n3 = [], i3 = 0, r3 = Math.min(5, u3); i3 < r3; i3++) {
            var o3 = Mg(l3.data, h3, l3.seriesLayoutBy, c3, l3.startIndex, i3), a3 = (n3.push(o3), o3 === vg.Not);
            if (a3 && null == t4.v && i3 !== p3 && (t4.v = i3), null != t4.n && t4.n !== t4.v && (a3 || n3[t4.n] !== vg.Not) || (t4.n = i3), s3(t4) && n3[t4.n] !== vg.Not)
              return t4;
            a3 || (o3 === vg.Might && null == e4.v && i3 !== p3 && (e4.v = i3), null != e4.n && e4.n !== e4.v) || (e4.n = i3);
          }
          function s3(t5) {
            return null != t5.v && null != t5.n;
          }
          return s3(t4) ? t4 : s3(e4) ? e4 : null;
        }()) && (e3.value = [t3.v], t3 = null != p3 ? p3 : t3.n, e3.itemName = [t3], e3.seriesName = [t3]), e3;
      }
      function wg(t3) {
        if (!t3.get("data", true))
          return Za(t3.ecModel, "dataset", { index: t3.get("datasetIndex", true), id: t3.get("datasetId", true) }, qa).models[0];
      }
      function Sg(t3, e3) {
        return Mg(t3.data, t3.sourceFormat, t3.seriesLayoutBy, t3.dimensionsDefine, t3.startIndex, e3);
      }
      function Mg(t3, e3, n3, i3, r3, o3) {
        var a3, s3, l3;
        if (!_t(t3)) {
          if (i3 && (X(i3 = i3[o3]) ? (s3 = i3.name, l3 = i3.type) : W(i3) && (s3 = i3)), null != l3)
            return "ordinal" === l3 ? vg.Must : vg.Not;
          if (e3 === Ou) {
            var u3 = t3;
            if (n3 === Vu) {
              for (var h3 = u3[o3], c3 = 0; c3 < (h3 || []).length && c3 < 5; c3++)
                if (null != (a3 = m3(h3[r3 + c3])))
                  return a3;
            } else
              for (c3 = 0; c3 < u3.length && c3 < 5; c3++) {
                var p3 = u3[r3 + c3];
                if (p3 && null != (a3 = m3(p3[o3])))
                  return a3;
              }
          } else if (e3 === Ru) {
            var d3 = t3;
            if (!s3)
              return vg.Not;
            for (c3 = 0; c3 < d3.length && c3 < 5; c3++)
              if ((g3 = d3[c3]) && null != (a3 = m3(g3[s3])))
                return a3;
          } else if (e3 === Nu) {
            if (!s3)
              return vg.Not;
            if (!(h3 = t3[s3]) || _t(h3))
              return vg.Not;
            for (c3 = 0; c3 < h3.length && c3 < 5; c3++)
              if (null != (a3 = m3(h3[c3])))
                return a3;
          } else if (e3 === Pu)
            for (var f3 = t3, c3 = 0; c3 < f3.length && c3 < 5; c3++) {
              var g3, y3 = Na(g3 = f3[c3]);
              if (!G(y3))
                return vg.Not;
              if (null != (a3 = m3(y3[o3])))
                return a3;
            }
        }
        return vg.Not;
        function m3(t4) {
          var e4 = W(t4);
          return null != t4 && isFinite(Number(t4)) && "" !== t4 ? e4 ? vg.Might : vg.Not : e4 && "-" !== t4 ? vg.Must : void 0;
        }
      }
      var Tg = I();
      var Ig, Cg, kg, Dg = i(), Ag = i(), Lg = (Pg.prototype.getColorFromPalette = function(t3, e3, n3) {
        var i3 = Pa(this.get("color", true)), r3 = this.get("colorLayer", true);
        return Og(this, Dg, i3, r3, t3, e3, n3);
      }, Pg.prototype.clearColorPalette = function() {
        var t3, e3;
        (e3 = Dg)(t3 = this).paletteIdx = 0, e3(t3).paletteNameMap = {};
      }, Pg);
      function Pg() {
      }
      function Og(t3, e3, n3, i3, r3, o3, a3) {
        e3 = e3(o3 = o3 || t3), t3 = e3.paletteIdx || 0, o3 = e3.paletteNameMap = e3.paletteNameMap || {};
        return o3.hasOwnProperty(r3) ? o3[r3] : (i3 = (i3 = null != a3 && i3 ? function(t4, e4) {
          for (var n4 = t4.length, i4 = 0; i4 < n4; i4++)
            if (t4[i4].length > e4)
              return t4[i4];
          return t4[n4 - 1];
        }(i3, a3) : n3) || n3) && i3.length ? (a3 = i3[t3], r3 && (o3[r3] = a3), e3.paletteIdx = (t3 + 1) % i3.length, a3) : void 0;
      }
      var Rg, Ng = "\0_ec_inner", zg = (u(Bg, Rg = Bd), Bg.prototype.init = function(t3, e3, n3, i3, r3, o3) {
        i3 = i3 || {}, this.option = null, this._theme = new Bd(i3), this._locale = new Bd(r3), this._optionManager = o3;
      }, Bg.prototype.setOption = function(t3, e3, n3) {
        e3 = Fg(e3);
        this._optionManager.setOption(t3, n3, e3), this._resetOption(null, e3);
      }, Bg.prototype.resetOption = function(t3, e3) {
        return this._resetOption(t3, Fg(e3));
      }, Bg.prototype._resetOption = function(t3, e3) {
        var n3, i3 = false, r3 = this._optionManager;
        return t3 && "recreate" !== t3 || (n3 = r3.mountOption("recreate" === t3), this.option && "recreate" !== t3 ? (this.restoreData(), this._mergeOption(n3, e3)) : kg(this, n3), i3 = true), "timeline" !== t3 && "media" !== t3 || this.restoreData(), t3 && "recreate" !== t3 && "timeline" !== t3 || (n3 = r3.getTimelineOption(this)) && (i3 = true, this._mergeOption(n3, e3)), t3 && "recreate" !== t3 && "media" !== t3 || (n3 = r3.getMediaOption(this)).length && F(n3, function(t4) {
          i3 = true, this._mergeOption(t4, e3);
        }, this), i3;
      }, Bg.prototype.mergeOption = function(t3) {
        this._mergeOption(t3, null);
      }, Bg.prototype._mergeOption = function(i3, t3) {
        var r3 = this.option, h3 = this._componentsMap, c3 = this._componentsCount, n3 = [], o3 = I(), p3 = t3 && t3.replaceMergeMainTypeMap;
        _g(this).datasetMap = I(), F(i3, function(t4, e3) {
          null != t4 && (cg.hasClass(e3) ? e3 && (n3.push(e3), o3.set(e3, true)) : r3[e3] = null == r3[e3] ? _(t4) : d(r3[e3], t4, true));
        }), p3 && p3.each(function(t4, e3) {
          cg.hasClass(e3) && !o3.get(e3) && (n3.push(e3), o3.set(e3, true));
        }), cg.topologicalTravel(n3, cg.getAllClassMainTypes(), function(o4) {
          var a3, t4 = function(t5, e4, n5) {
            return (e4 = (e4 = Tg.get(e4)) && e4(t5)) ? n5.concat(e4) : n5;
          }(this, o4, Pa(i3[o4])), e3 = h3.get(o4), n4 = e3 ? p3 && p3.get(o4) ? "replaceMerge" : "normalMerge" : "replaceAll", e3 = za(e3, t4, n4), s3 = (Ha(e3, o4, cg), r3[o4] = null, h3.set(o4, null), c3.set(o4, 0), []), l3 = [], u3 = 0;
          F(e3, function(t5, e4) {
            var n5 = t5.existing, i4 = t5.newOption;
            if (i4) {
              var r4 = cg.getClass(o4, t5.keyInfo.subType, !("series" === o4));
              if (!r4)
                return;
              if ("tooltip" === o4) {
                if (a3)
                  return;
                a3 = true;
              }
              n5 && n5.constructor === r4 ? (n5.name = t5.keyInfo.name, n5.mergeOption(i4, this), n5.optionUpdated(i4, false)) : (e4 = V({ componentIndex: e4 }, t5.keyInfo), V(n5 = new r4(i4, this, this, e4), e4), t5.brandNew && (n5.__requireNewView = true), n5.init(i4, this, this), n5.optionUpdated(null, true));
            } else
              n5 && (n5.mergeOption({}, this), n5.optionUpdated({}, false));
            n5 ? (s3.push(n5.option), l3.push(n5), u3++) : (s3.push(void 0), l3.push(void 0));
          }, this), r3[o4] = s3, h3.set(o4, l3), c3.set(o4, u3), "series" === o4 && Ig(this);
        }, this), this._seriesIndices || Ig(this);
      }, Bg.prototype.getOption = function() {
        var a3 = _(this.option);
        return F(a3, function(t3, e3) {
          if (cg.hasClass(e3)) {
            for (var n3 = Pa(t3), i3 = n3.length, r3 = false, o3 = i3 - 1; 0 <= o3; o3--)
              n3[o3] && !Ga(n3[o3]) ? r3 = true : (n3[o3] = null, r3 || i3--);
            n3.length = i3, a3[e3] = n3;
          }
        }), delete a3[Ng], a3;
      }, Bg.prototype.setTheme = function(t3) {
        this._theme = new Bd(t3), this._resetOption("recreate", null);
      }, Bg.prototype.getTheme = function() {
        return this._theme;
      }, Bg.prototype.getLocaleModel = function() {
        return this._locale;
      }, Bg.prototype.setUpdatePayload = function(t3) {
        this._payload = t3;
      }, Bg.prototype.getUpdatePayload = function() {
        return this._payload;
      }, Bg.prototype.getComponent = function(t3, e3) {
        var n3 = this._componentsMap.get(t3);
        if (n3) {
          t3 = n3[e3 || 0];
          if (t3)
            return t3;
          if (null == e3) {
            for (var i3 = 0; i3 < n3.length; i3++)
              if (n3[i3])
                return n3[i3];
          }
        }
      }, Bg.prototype.queryComponents = function(t3) {
        var e3, n3, i3, r3, o3, a3 = t3.mainType;
        return a3 && (e3 = t3.index, n3 = t3.id, i3 = t3.name, r3 = this._componentsMap.get(a3)) && r3.length ? (null != e3 ? (o3 = [], F(Pa(e3), function(t4) {
          r3[t4] && o3.push(r3[t4]);
        })) : o3 = null != n3 ? Eg("id", n3, r3) : null != i3 ? Eg("name", i3, r3) : ft(r3, function(t4) {
          return !!t4;
        }), Vg(o3, t3)) : [];
      }, Bg.prototype.findComponents = function(t3) {
        var e3, n3 = t3.query, i3 = t3.mainType, r3 = (r3 = i3 + "Index", o3 = i3 + "Id", e3 = i3 + "Name", !(n3 = n3) || null == n3[r3] && null == n3[o3] && null == n3[e3] ? null : { mainType: i3, index: n3[r3], id: n3[o3], name: n3[e3] }), o3 = r3 ? this.queryComponents(r3) : ft(this._componentsMap.get(i3), function(t4) {
          return !!t4;
        });
        return n3 = Vg(o3, t3), t3.filter ? ft(n3, t3.filter) : n3;
      }, Bg.prototype.eachComponent = function(t3, e3, n3) {
        var i3 = this._componentsMap;
        if (H(t3)) {
          var r3 = e3, o3 = t3;
          i3.each(function(t4, e4) {
            for (var n4 = 0; t4 && n4 < t4.length; n4++) {
              var i4 = t4[n4];
              i4 && o3.call(r3, e4, i4, i4.componentIndex);
            }
          });
        } else
          for (var a3 = W(t3) ? i3.get(t3) : X(t3) ? this.findComponents(t3) : null, s3 = 0; a3 && s3 < a3.length; s3++) {
            var l3 = a3[s3];
            l3 && e3.call(n3, l3, l3.componentIndex);
          }
      }, Bg.prototype.getSeriesByName = function(t3) {
        var e3 = Va(t3, null);
        return ft(this._componentsMap.get("series"), function(t4) {
          return !!t4 && null != e3 && t4.name === e3;
        });
      }, Bg.prototype.getSeriesByIndex = function(t3) {
        return this._componentsMap.get("series")[t3];
      }, Bg.prototype.getSeriesByType = function(e3) {
        return ft(this._componentsMap.get("series"), function(t3) {
          return !!t3 && t3.subType === e3;
        });
      }, Bg.prototype.getSeries = function() {
        return ft(this._componentsMap.get("series"), function(t3) {
          return !!t3;
        });
      }, Bg.prototype.getSeriesCount = function() {
        return this._componentsCount.get("series");
      }, Bg.prototype.eachSeries = function(n3, i3) {
        Cg(this), F(this._seriesIndices, function(t3) {
          var e3 = this._componentsMap.get("series")[t3];
          n3.call(i3, e3, t3);
        }, this);
      }, Bg.prototype.eachRawSeries = function(e3, n3) {
        F(this._componentsMap.get("series"), function(t3) {
          t3 && e3.call(n3, t3, t3.componentIndex);
        });
      }, Bg.prototype.eachSeriesByType = function(n3, i3, r3) {
        Cg(this), F(this._seriesIndices, function(t3) {
          var e3 = this._componentsMap.get("series")[t3];
          e3.subType === n3 && i3.call(r3, e3, t3);
        }, this);
      }, Bg.prototype.eachRawSeriesByType = function(t3, e3, n3) {
        return F(this.getSeriesByType(t3), e3, n3);
      }, Bg.prototype.isSeriesFiltered = function(t3) {
        return Cg(this), null == this._seriesIndicesMap.get(t3.componentIndex);
      }, Bg.prototype.getCurrentSeriesIndices = function() {
        return (this._seriesIndices || []).slice();
      }, Bg.prototype.filterSeries = function(n3, i3) {
        Cg(this);
        var r3 = [];
        F(this._seriesIndices, function(t3) {
          var e3 = this._componentsMap.get("series")[t3];
          n3.call(i3, e3, t3) && r3.push(t3);
        }, this), this._seriesIndices = r3, this._seriesIndicesMap = I(r3);
      }, Bg.prototype.restoreData = function(n3) {
        Ig(this);
        var t3 = this._componentsMap, i3 = [];
        t3.each(function(t4, e3) {
          cg.hasClass(e3) && i3.push(e3);
        }), cg.topologicalTravel(i3, cg.getAllClassMainTypes(), function(e3) {
          F(t3.get(e3), function(t4) {
            !t4 || "series" === e3 && function(t5, e4) {
              {
                var n4, i4;
                if (e4)
                  return n4 = e4.seriesIndex, i4 = e4.seriesId, e4 = e4.seriesName, null != n4 && t5.componentIndex !== n4 || null != i4 && t5.id !== i4 || null != e4 && t5.name !== e4;
              }
            }(t4, n3) || t4.restoreData();
          });
        });
      }, Bg.internalField = (Ig = function(t3) {
        var e3 = t3._seriesIndices = [];
        F(t3._componentsMap.get("series"), function(t4) {
          t4 && e3.push(t4.componentIndex);
        }), t3._seriesIndicesMap = I(e3);
      }, Cg = function(t3) {
      }, void (kg = function(t3, e3) {
        t3.option = {}, t3.option[Ng] = 1, t3._componentsMap = I({ series: [] }), t3._componentsCount = I();
        var n3, i3, r3 = e3.aria;
        X(r3) && null == r3.enabled && (r3.enabled = true), n3 = e3, r3 = t3._theme.option, i3 = n3.color && !n3.colorLayer, F(r3, function(t4, e4) {
          "colorLayer" === e4 && i3 || "color" === e4 && n3.color || cg.hasClass(e4) || ("object" == typeof t4 ? n3[e4] = n3[e4] ? d(n3[e4], t4, false) : _(t4) : null == n3[e4] && (n3[e4] = t4));
        }), d(e3, mg, false), t3._mergeOption(e3, null);
      })), Bg);
      function Bg() {
        return null !== Rg && Rg.apply(this, arguments) || this;
      }
      function Eg(e3, t3, n3) {
        var i3, r3;
        return G(t3) ? (i3 = I(), F(t3, function(t4) {
          null != t4 && null != Va(t4, null) && i3.set(t4, true);
        }), ft(n3, function(t4) {
          return t4 && i3.get(t4[e3]);
        })) : (r3 = Va(t3, null), ft(n3, function(t4) {
          return t4 && null != r3 && t4[e3] === r3;
        }));
      }
      function Vg(t3, e3) {
        return e3.hasOwnProperty("subType") ? ft(t3, function(t4) {
          return t4 && t4.subType === e3.subType;
        }) : t3;
      }
      function Fg(t3) {
        var e3 = I();
        return t3 && F(Pa(t3.replaceMerge), function(t4) {
          e3.set(t4, true);
        }), { replaceMergeMainTypeMap: e3 };
      }
      ct(zg, Lg);
      var Gg = /^(min|max)?(.+)$/, Hg = (Wg.prototype.setOption = function(t3, e3, n3) {
        t3 && (F(Pa(t3.series), function(t4) {
          t4 && t4.data && _t(t4.data) && Pt(t4.data);
        }), F(Pa(t3.dataset), function(t4) {
          t4 && t4.source && _t(t4.source) && Pt(t4.source);
        })), t3 = _(t3);
        var i3 = this._optionBackup, t3 = function(t4, n4, i4) {
          var e4, r3, o3 = [], a3 = t4.baseOption, s3 = t4.timeline, l3 = t4.options, u3 = t4.media, h3 = !!t4.media, c3 = !!(l3 || s3 || a3 && a3.timeline);
          a3 ? (r3 = a3).timeline || (r3.timeline = s3) : ((c3 || h3) && (t4.options = t4.media = null), r3 = t4);
          h3 && G(u3) && F(u3, function(t5) {
            t5 && t5.option && (t5.query ? o3.push(t5) : e4 = e4 || t5);
          });
          function p3(e5) {
            F(n4, function(t5) {
              t5(e5, i4);
            });
          }
          return p3(r3), F(l3, p3), F(o3, function(t5) {
            return p3(t5.option);
          }), { baseOption: r3, timelineOptions: l3 || [], mediaDefault: e4, mediaList: o3 };
        }(t3, e3, !i3);
        this._newBaseOption = t3.baseOption, i3 ? (t3.timelineOptions.length && (i3.timelineOptions = t3.timelineOptions), t3.mediaList.length && (i3.mediaList = t3.mediaList), t3.mediaDefault && (i3.mediaDefault = t3.mediaDefault)) : this._optionBackup = t3;
      }, Wg.prototype.mountOption = function(t3) {
        var e3 = this._optionBackup;
        return this._timelineOptions = e3.timelineOptions, this._mediaList = e3.mediaList, this._mediaDefault = e3.mediaDefault, this._currentMediaIndices = [], _(t3 ? e3.baseOption : this._newBaseOption);
      }, Wg.prototype.getTimelineOption = function(t3) {
        var e3, n3 = this._timelineOptions;
        return e3 = n3.length && (t3 = t3.getComponent("timeline")) ? _(n3[t3.getCurrentIndex()]) : e3;
      }, Wg.prototype.getMediaOption = function(t3) {
        var e3 = this._api.getWidth(), n3 = this._api.getHeight(), i3 = this._mediaList, r3 = this._mediaDefault, o3 = [], a3 = [];
        if (i3.length || r3) {
          for (var s3, l3, u3 = 0, h3 = i3.length; u3 < h3; u3++)
            !function(t4, e4, n4) {
              var i4 = { width: e4, height: n4, aspectratio: e4 / n4 }, r4 = true;
              return F(t4, function(t5, e5) {
                var n5, e5 = e5.match(Gg);
                e5 && e5[1] && e5[2] && (n5 = e5[1], e5 = e5[2].toLowerCase(), e5 = i4[e5], t5 = t5, ("min" === (n5 = n5) ? t5 <= e5 : "max" === n5 ? e5 <= t5 : e5 === t5) || (r4 = false));
              }), r4;
            }(i3[u3].query, e3, n3) || o3.push(u3);
          (o3 = !o3.length && r3 ? [-1] : o3).length && (s3 = o3, l3 = this._currentMediaIndices, s3.join(",") !== l3.join(",")) && (a3 = E(o3, function(t4) {
            return _((-1 === t4 ? r3 : i3[t4]).option);
          })), this._currentMediaIndices = o3;
        }
        return a3;
      }, Wg);
      function Wg(t3) {
        this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t3;
      }
      var Ug = F, Xg = X, Yg = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
      function qg(t3) {
        var e3 = t3 && t3.itemStyle;
        if (e3)
          for (var n3 = 0, i3 = Yg.length; n3 < i3; n3++) {
            var r3 = Yg[n3], o3 = e3.normal, a3 = e3.emphasis;
            o3 && o3[r3] && (t3[r3] = t3[r3] || {}, t3[r3].normal ? d(t3[r3].normal, o3[r3]) : t3[r3].normal = o3[r3], o3[r3] = null), a3 && a3[r3] && (t3[r3] = t3[r3] || {}, t3[r3].emphasis ? d(t3[r3].emphasis, a3[r3]) : t3[r3].emphasis = a3[r3], a3[r3] = null);
          }
      }
      function Zg(t3, e3, n3) {
        var i3, r3;
        t3 && t3[e3] && (t3[e3].normal || t3[e3].emphasis) && (i3 = t3[e3].normal, r3 = t3[e3].emphasis, i3 && (n3 ? (t3[e3].normal = t3[e3].emphasis = null, B(t3[e3], i3)) : t3[e3] = i3), r3) && (t3.emphasis = t3.emphasis || {}, (t3.emphasis[e3] = r3).focus && (t3.emphasis.focus = r3.focus), r3.blurScope) && (t3.emphasis.blurScope = r3.blurScope);
      }
      function jg(t3) {
        Zg(t3, "itemStyle"), Zg(t3, "lineStyle"), Zg(t3, "areaStyle"), Zg(t3, "label"), Zg(t3, "labelLine"), Zg(t3, "upperLabel"), Zg(t3, "edgeLabel");
      }
      function Kg(t3, e3) {
        var n3 = Xg(t3) && t3[e3], i3 = Xg(n3) && n3.textStyle;
        if (i3)
          for (var r3 = 0, o3 = Ra.length; r3 < o3; r3++) {
            var a3 = Ra[r3];
            i3.hasOwnProperty(a3) && (n3[a3] = i3[a3]);
          }
      }
      function $g(t3) {
        t3 && (jg(t3), Kg(t3, "label"), t3.emphasis) && Kg(t3.emphasis, "label");
      }
      function Qg(t3) {
        return G(t3) ? t3 : t3 ? [t3] : [];
      }
      function Jg(t3) {
        return (G(t3) ? t3[0] : t3) || {};
      }
      function ty(e3, t3) {
        Ug(Qg(e3.series), function(t4) {
          if (Xg(t4)) {
            if (Xg(t4)) {
              qg(t4), jg(t4), Kg(t4, "label"), Kg(t4, "upperLabel"), Kg(t4, "edgeLabel"), t4.emphasis && (Kg(t4.emphasis, "label"), Kg(t4.emphasis, "upperLabel"), Kg(t4.emphasis, "edgeLabel"));
              var e4 = t4.markPoint, n4 = (e4 && (qg(e4), $g(e4)), t4.markLine), i3 = (n4 && (qg(n4), $g(n4)), t4.markArea), r3 = (i3 && $g(i3), t4.data);
              if ("graph" === t4.type) {
                var r3 = r3 || t4.nodes, o3 = t4.links || t4.edges;
                if (o3 && !_t(o3))
                  for (var a3 = 0; a3 < o3.length; a3++)
                    $g(o3[a3]);
                F(t4.categories, function(t5) {
                  jg(t5);
                });
              }
              if (r3 && !_t(r3))
                for (a3 = 0; a3 < r3.length; a3++)
                  $g(r3[a3]);
              if ((e4 = t4.markPoint) && e4.data)
                for (var s3 = e4.data, a3 = 0; a3 < s3.length; a3++)
                  $g(s3[a3]);
              if ((n4 = t4.markLine) && n4.data)
                for (var l3 = n4.data, a3 = 0; a3 < l3.length; a3++)
                  G(l3[a3]) ? ($g(l3[a3][0]), $g(l3[a3][1])) : $g(l3[a3]);
              "gauge" === t4.type ? (Kg(t4, "axisLabel"), Kg(t4, "title"), Kg(t4, "detail")) : "treemap" === t4.type ? (Zg(t4.breadcrumb, "itemStyle"), F(t4.levels, function(t5) {
                jg(t5);
              })) : "tree" === t4.type && jg(t4.leaves);
            }
          }
        });
        var n3 = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
        t3 && n3.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), Ug(n3, function(t4) {
          Ug(Qg(e3[t4]), function(t5) {
            t5 && (Kg(t5, "axisLabel"), Kg(t5.axisPointer, "label"));
          });
        }), Ug(Qg(e3.parallel), function(t4) {
          t4 = t4 && t4.parallelAxisDefault;
          Kg(t4, "axisLabel"), Kg(t4 && t4.axisPointer, "label");
        }), Ug(Qg(e3.calendar), function(t4) {
          Zg(t4, "itemStyle"), Kg(t4, "dayLabel"), Kg(t4, "monthLabel"), Kg(t4, "yearLabel");
        }), Ug(Qg(e3.radar), function(t4) {
          Kg(t4, "name"), t4.name && null == t4.axisName && (t4.axisName = t4.name, delete t4.name), null != t4.nameGap && null == t4.axisNameGap && (t4.axisNameGap = t4.nameGap, delete t4.nameGap);
        }), Ug(Qg(e3.geo), function(t4) {
          Xg(t4) && ($g(t4), Ug(Qg(t4.regions), function(t5) {
            $g(t5);
          }));
        }), Ug(Qg(e3.timeline), function(t4) {
          $g(t4), Zg(t4, "label"), Zg(t4, "itemStyle"), Zg(t4, "controlStyle", true);
          t4 = t4.data;
          G(t4) && F(t4, function(t5) {
            X(t5) && (Zg(t5, "label"), Zg(t5, "itemStyle"));
          });
        }), Ug(Qg(e3.toolbox), function(t4) {
          Zg(t4, "iconStyle"), Ug(t4.feature, function(t5) {
            Zg(t5, "iconStyle");
          });
        }), Kg(Jg(e3.axisPointer), "label"), Kg(Jg(e3.tooltip).axisPointer, "label");
      }
      function ey(e3) {
        e3 && F(ny, function(t3) {
          t3[0] in e3 && !(t3[1] in e3) && (e3[t3[1]] = e3[t3[0]]);
        });
      }
      var ny = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], iy = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], ry = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
      function oy(t3) {
        var e3 = t3 && t3.itemStyle;
        if (e3)
          for (var n3 = 0; n3 < ry.length; n3++) {
            var i3 = ry[n3][1], r3 = ry[n3][0];
            null != e3[i3] && (e3[r3] = e3[i3]);
          }
      }
      function ay(t3) {
        t3 && "edge" === t3.alignTo && null != t3.margin && null == t3.edgeDistance && (t3.edgeDistance = t3.margin);
      }
      function sy(t3) {
        t3 && t3.downplay && !t3.blur && (t3.blur = t3.downplay);
      }
      function ly(e3, t3) {
        ty(e3, t3), e3.series = Pa(e3.series), F(e3.series, function(t4) {
          if (X(t4)) {
            var e4, n3 = t4.type;
            if ("line" === n3)
              null != t4.clipOverflow && (t4.clip = t4.clipOverflow);
            else if ("pie" === n3 || "gauge" === n3) {
              if (null != t4.clockWise && (t4.clockwise = t4.clockWise), ay(t4.label), (e4 = t4.data) && !_t(e4))
                for (var i3 = 0; i3 < e4.length; i3++)
                  ay(e4[i3]);
              null != t4.hoverOffset && (t4.emphasis = t4.emphasis || {}, t4.emphasis.scaleSize = null) && (t4.emphasis.scaleSize = t4.hoverOffset);
            } else if ("gauge" === n3) {
              var r3 = function(t5, e5) {
                for (var n4 = e5.split(","), i4 = t5, r4 = 0; r4 < n4.length && null != (i4 = i4 && i4[n4[r4]]); r4++)
                  ;
                return i4;
              }(t4, "pointer.color");
              if (null != r3) {
                var o3 = t4;
                var a3 = "itemStyle.color";
                var s3 = void 0;
                for (var l3, u3 = a3.split(","), h3 = o3, c3 = 0; c3 < u3.length - 1; c3++)
                  null == h3[l3 = u3[c3]] && (h3[l3] = {}), h3 = h3[l3];
                !s3 && null != h3[u3[c3]] || (h3[u3[c3]] = r3);
              }
            } else if ("bar" === n3) {
              if (oy(t4), oy(t4.backgroundStyle), oy(t4.emphasis), (e4 = t4.data) && !_t(e4))
                for (i3 = 0; i3 < e4.length; i3++)
                  "object" == typeof e4[i3] && (oy(e4[i3]), oy(e4[i3] && e4[i3].emphasis));
            } else
              "sunburst" === n3 ? ((a3 = t4.highlightPolicy) && (t4.emphasis = t4.emphasis || {}, t4.emphasis.focus || (t4.emphasis.focus = a3)), sy(t4), function t5(e5, n4) {
                if (e5)
                  for (var i4 = 0; i4 < e5.length; i4++)
                    n4(e5[i4]), e5[i4] && t5(e5[i4].children, n4);
              }(t4.data, sy)) : "graph" === n3 || "sankey" === n3 ? (o3 = t4) && null != o3.focusNodeAdjacency && (o3.emphasis = o3.emphasis || {}, null == o3.emphasis.focus) && (o3.emphasis.focus = "adjacency") : "map" === n3 && (t4.mapType && !t4.map && (t4.map = t4.mapType), t4.mapLocation) && B(t4, t4.mapLocation);
            null != t4.hoverAnimation && (t4.emphasis = t4.emphasis || {}, t4.emphasis) && null == t4.emphasis.scale && (t4.emphasis.scale = t4.hoverAnimation), ey(t4);
          }
        }), e3.dataRange && (e3.visualMap = e3.dataRange), F(iy, function(t4) {
          t4 = e3[t4];
          t4 && F(t4 = G(t4) ? t4 : [t4], function(t5) {
            ey(t5);
          });
        });
      }
      Ad = us(function(t3) {
        var i3 = I();
        t3.eachSeries(function(t4) {
          var e3, n3 = t4.get("stack");
          n3 && (n3 = i3.get(n3) || i3.set(n3, []), (e3 = { stackResultDimension: (e3 = t4.getData()).getCalculationInfo("stackResultDimension"), stackedOverDimension: e3.getCalculationInfo("stackedOverDimension"), stackedDimension: e3.getCalculationInfo("stackedDimension"), stackedByDimension: e3.getCalculationInfo("stackedByDimension"), isStackedByIndex: e3.getCalculationInfo("isStackedByIndex"), data: e3, seriesModel: t4 }).stackedDimension) && (e3.isStackedByIndex || e3.stackedByDimension) && n3.push(e3);
        }), i3.each(function(n3) {
          var _3;
          0 !== n3.length && ("seriesDesc" === (n3[0].seriesModel.get("stackOrder") || "seriesAsc") && n3.reverse(), F(n3, function(t4, e3) {
            t4.data.setCalculationInfo("stackedOnSeries", 0 < e3 ? n3[e3 - 1].seriesModel : null);
          }), F(_3 = n3, function(p3, d3) {
            var f3 = [], g3 = [NaN, NaN], t4 = [p3.stackResultDimension, p3.stackedOverDimension], y3 = p3.data, m3 = p3.isStackedByIndex, v3 = p3.seriesModel.get("stackStrategy") || "samesign";
            y3.modify(t4, function(t5, e3, n4) {
              var i4, r3, o3 = y3.get(p3.stackedDimension, n4);
              if (isNaN(o3))
                return g3;
              m3 ? r3 = y3.getRawIndex(n4) : i4 = y3.get(p3.stackedByDimension, n4);
              for (var a3, s3, l3, u3 = NaN, h3 = d3 - 1; 0 <= h3; h3--) {
                var c3 = _3[h3];
                if (0 <= (r3 = m3 ? r3 : c3.data.rawIndexOf(c3.stackedByDimension, i4))) {
                  c3 = c3.data.getByRawIndex(c3.stackResultDimension, r3);
                  if ("all" === v3 || "positive" === v3 && 0 < c3 || "negative" === v3 && c3 < 0 || "samesign" === v3 && 0 <= o3 && 0 < c3 || "samesign" === v3 && o3 <= 0 && c3 < 0) {
                    s3 = c3, l3 = void 0, l3 = Jo(da(a3 = o3), da(s3)), a3 += s3, o3 = $o < l3 ? a3 : C(a3, l3), u3 = c3;
                    break;
                  }
                }
              }
              return f3[0] = o3, f3[1] = u3, f3;
            });
          }));
        });
      });
      var uy, hy, cy = function(t3) {
        this.data = t3.data || (t3.sourceFormat === Nu ? {} : []), this.sourceFormat = t3.sourceFormat || Bu, this.seriesLayoutBy = t3.seriesLayoutBy || Eu, this.startIndex = t3.startIndex || 0, this.dimensionsDetectedCount = t3.dimensionsDetectedCount, this.metaRawOption = t3.metaRawOption;
        var e3 = this.dimensionsDefine = t3.dimensionsDefine;
        if (e3)
          for (var n3 = 0; n3 < e3.length; n3++) {
            var i3 = e3[n3];
            null == i3.type && Sg(this, n3) === vg.Must && (i3.type = "ordinal");
          }
      };
      function py(t3) {
        return t3 instanceof cy;
      }
      function dy(t3, e3, n3) {
        n3 = n3 || gy(t3);
        var i3 = e3.seriesLayoutBy, r3 = function(t4, e4, n4, i4, r4) {
          var o3, a3;
          if (!t4)
            return { dimensionsDefine: yy(r4), startIndex: a3, dimensionsDetectedCount: o3 };
          {
            var s3;
            e4 === Ou ? (s3 = t4, "auto" === i4 || null == i4 ? my(function(t5) {
              null != t5 && "-" !== t5 && (W(t5) ? null == a3 && (a3 = 1) : a3 = 0);
            }, n4, s3, 10) : a3 = U(i4) ? i4 : i4 ? 1 : 0, r4 || 1 !== a3 || (r4 = [], my(function(t5, e5) {
              r4[e5] = null != t5 ? t5 + "" : "";
            }, n4, s3, 1 / 0)), o3 = r4 ? r4.length : n4 === Vu ? s3.length : s3[0] ? s3[0].length : null) : e4 === Ru ? r4 = r4 || function(t5) {
              var e5, n5 = 0;
              for (; n5 < t5.length && !(e5 = t5[n5++]); )
                ;
              if (e5)
                return O(e5);
            }(t4) : e4 === Nu ? r4 || (r4 = [], F(t4, function(t5, e5) {
              r4.push(e5);
            })) : e4 === Pu && (i4 = Na(t4[0]), o3 = G(i4) && i4.length || 1);
          }
          return { startIndex: a3, dimensionsDefine: yy(r4), dimensionsDetectedCount: o3 };
        }(t3, n3, i3, e3.sourceHeader, e3.dimensions);
        return new cy({ data: t3, sourceFormat: n3, seriesLayoutBy: i3, dimensionsDefine: r3.dimensionsDefine, startIndex: r3.startIndex, dimensionsDetectedCount: r3.dimensionsDetectedCount, metaRawOption: _(e3) });
      }
      function fy(t3) {
        return new cy({ data: t3, sourceFormat: _t(t3) ? zu : Pu });
      }
      function gy(t3) {
        var e3 = Bu;
        if (_t(t3))
          e3 = zu;
        else if (G(t3)) {
          0 === t3.length && (e3 = Ou);
          for (var n3 = 0, i3 = t3.length; n3 < i3; n3++) {
            var r3 = t3[n3];
            if (null != r3) {
              if (G(r3) || _t(r3)) {
                e3 = Ou;
                break;
              }
              if (X(r3)) {
                e3 = Ru;
                break;
              }
            }
          }
        } else if (X(t3)) {
          for (var o3 in t3)
            if (Ht(t3, o3) && pt(t3[o3])) {
              e3 = Nu;
              break;
            }
        }
        return e3;
      }
      function yy(t3) {
        var i3;
        if (t3)
          return i3 = I(), E(t3, function(t4, e3) {
            var n3, t4 = { name: (t4 = X(t4) ? t4 : { name: t4 }).name, displayName: t4.displayName, type: t4.type };
            return null != t4.name && (t4.name += "", null == t4.displayName && (t4.displayName = t4.name), (n3 = i3.get(t4.name)) ? t4.name += "-" + n3.count++ : i3.set(t4.name, { count: 1 })), t4;
          });
      }
      function my(t3, e3, n3, i3) {
        if (e3 === Vu)
          for (var r3 = 0; r3 < n3.length && r3 < i3; r3++)
            t3(n3[r3] ? n3[r3][0] : null, r3);
        else
          for (var o3 = n3[0] || [], r3 = 0; r3 < o3.length && r3 < i3; r3++)
            t3(o3[r3], r3);
      }
      function vy(t3) {
        t3 = t3.sourceFormat;
        return t3 === Ru || t3 === Nu;
      }
      Sy.prototype.getSource = function() {
        return this._source;
      }, Sy.prototype.count = function() {
        return 0;
      }, Sy.prototype.getItem = function(t3, e3) {
      }, Sy.prototype.appendData = function(t3) {
      }, Sy.prototype.clean = function() {
      }, Sy.protoInitialize = ((af = Sy.prototype).pure = false, void (af.persistent = true)), Sy.internalField = (hy = function(t3, e3, n3) {
        var i3, r3 = n3.sourceFormat, o3 = n3.seriesLayoutBy, a3 = n3.startIndex, n3 = n3.dimensionsDefine;
        V(t3, uy[Ry(r3, o3)]), r3 === zu ? (t3.getItem = _y, t3.count = by, t3.fillStorage = xy) : (i3 = Cy(r3, o3), t3.getItem = y(i3, null, e3, a3, n3), i3 = Ay(r3, o3), t3.count = y(i3, null, e3, a3, n3));
      }, _y = function(t3, e3) {
        t3 -= this._offset, e3 = e3 || [];
        for (var n3 = this._data, i3 = this._dimSize, r3 = i3 * t3, o3 = 0; o3 < i3; o3++)
          e3[o3] = n3[r3 + o3];
        return e3;
      }, xy = function(t3, e3, n3, i3) {
        for (var r3 = this._data, o3 = this._dimSize, a3 = 0; a3 < o3; a3++) {
          for (var s3 = i3[a3], l3 = null == s3[0] ? 1 / 0 : s3[0], u3 = null == s3[1] ? -1 / 0 : s3[1], h3 = e3 - t3, c3 = n3[a3], p3 = 0; p3 < h3; p3++) {
            var d3 = r3[p3 * o3 + a3];
            (c3[t3 + p3] = d3) < l3 && (l3 = d3), u3 < d3 && (u3 = d3);
          }
          s3[0] = l3, s3[1] = u3;
        }
      }, by = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      }, (af = {})[Ou + "_" + Eu] = { pure: true, appendData: My }, af[Ou + "_" + Vu] = { pure: true, appendData: function() {
        throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
      } }, af[Ru] = { pure: true, appendData: My }, af[Nu] = { pure: true, appendData: function(t3) {
        var r3 = this._data;
        F(t3, function(t4, e3) {
          for (var n3 = r3[e3] || (r3[e3] = []), i3 = 0; i3 < (t4 || []).length; i3++)
            n3.push(t4[i3]);
        });
      } }, af[Pu] = { appendData: My }, af[zu] = { persistent: false, pure: true, appendData: function(t3) {
        this._data = t3;
      }, clean: function() {
        this._offset += this.count(), this._data = null;
      } }, void (uy = af));
      var _y, xy, by, wy = Sy;
      function Sy(t3, e3) {
        var t3 = py(t3) ? t3 : fy(t3), n3 = (this._source = t3, this._data = t3.data), i3 = t3.sourceFormat;
        t3.seriesLayoutBy, i3 === zu && (this._offset = 0, this._dimSize = e3, this._data = n3), hy(this, n3, t3);
      }
      function My(t3) {
        for (var e3 = 0; e3 < t3.length; e3++)
          this._data.push(t3[e3]);
      }
      function Ty(t3, e3, n3, i3) {
        return t3[i3];
      }
      (Id = {})[Ou + "_" + Eu] = function(t3, e3, n3, i3) {
        return t3[i3 + e3];
      }, Id[Ou + "_" + Vu] = function(t3, e3, n3, i3, r3) {
        i3 += e3;
        for (var o3 = r3 || [], a3 = t3, s3 = 0; s3 < a3.length; s3++) {
          var l3 = a3[s3];
          o3[s3] = l3 ? l3[i3] : null;
        }
        return o3;
      }, Id[Ru] = Ty, Id[Nu] = function(t3, e3, n3, i3, r3) {
        for (var o3 = r3 || [], a3 = 0; a3 < n3.length; a3++) {
          var s3 = n3[a3].name, s3 = null != s3 ? t3[s3] : null;
          o3[a3] = s3 ? s3[i3] : null;
        }
        return o3;
      }, Id[Pu] = Ty;
      var Iy = Id;
      function Cy(t3, e3) {
        return Iy[Ry(t3, e3)];
      }
      function ky(t3, e3, n3) {
        return t3.length;
      }
      (ws = {})[Ou + "_" + Eu] = function(t3, e3, n3) {
        return Math.max(0, t3.length - e3);
      }, ws[Ou + "_" + Vu] = function(t3, e3, n3) {
        t3 = t3[0];
        return t3 ? Math.max(0, t3.length - e3) : 0;
      }, ws[Ru] = ky, ws[Nu] = function(t3, e3, n3) {
        n3 = n3[0].name, t3 = null != n3 ? t3[n3] : null;
        return t3 ? t3.length : 0;
      }, ws[Pu] = ky;
      var Dy = ws;
      function Ay(t3, e3) {
        return Dy[Ry(t3, e3)];
      }
      function Ly(t3, e3, n3) {
        return t3[e3];
      }
      (Rd = {})[Ou] = Ly, Rd[Ru] = function(t3, e3, n3) {
        return t3[n3];
      }, Rd[Nu] = Ly, Rd[Pu] = function(t3, e3, n3) {
        t3 = Na(t3);
        return t3 instanceof Array ? t3[e3] : t3;
      }, Rd[zu] = Ly;
      var Py = Rd;
      function Oy(t3) {
        return Py[t3];
      }
      function Ry(t3, e3) {
        return t3 === Ou ? t3 + "_" + e3 : t3;
      }
      function Ny(t3, e3, n3) {
        if (t3) {
          var i3, r3, e3 = t3.getRawDataItem(e3);
          if (null != e3)
            return i3 = (r3 = t3.getStore()).getSource().sourceFormat, null != n3 ? (t3 = t3.getDimensionIndex(n3), n3 = r3.getDimensionProperty(t3), Oy(i3)(e3, t3, n3)) : (r3 = e3, i3 === Pu ? Na(e3) : r3);
        }
      }
      var zy = /\{@(.+?)\}/g, af = (By.prototype.getDataParams = function(t3, e3) {
        var n3 = this.getData(e3), i3 = this.getRawValue(t3, e3), r3 = n3.getRawIndex(t3), o3 = n3.getName(t3), a3 = n3.getRawDataItem(t3), s3 = n3.getItemVisual(t3, "style"), t3 = s3 && s3[n3.getItemVisual(t3, "drawType") || "fill"], s3 = s3 && s3.stroke, l3 = this.mainType, u3 = "series" === l3, n3 = n3.userOutput && n3.userOutput.get();
        return { componentType: l3, componentSubType: this.subType, componentIndex: this.componentIndex, seriesType: u3 ? this.subType : null, seriesIndex: this.seriesIndex, seriesId: u3 ? this.id : null, seriesName: u3 ? this.name : null, name: o3, dataIndex: r3, data: a3, dataType: e3, value: i3, color: t3, borderColor: s3, dimensionNames: n3 ? n3.fullDimensions : null, encode: n3 ? n3.encode : null, $vars: ["seriesName", "name", "value"] };
      }, By.prototype.getFormattedLabel = function(i3, t3, e3, n3, r3, o3) {
        t3 = t3 || "normal";
        var a3 = this.getData(e3), e3 = this.getDataParams(i3, e3);
        return o3 && (e3.value = o3.interpolatedValue), null != n3 && G(e3.value) && (e3.value = e3.value[n3]), H(r3 = r3 || a3.getItemModel(i3).get("normal" === t3 ? ["label", "formatter"] : [t3, "label", "formatter"])) ? (e3.status = t3, e3.dimensionIndex = n3, r3(e3)) : W(r3) ? Of(r3, e3).replace(zy, function(t4, e4) {
          var n4 = e4.length, n4 = ("[" === e4.charAt(0) && "]" === e4.charAt(n4 - 1) && (e4 = +e4.slice(1, n4 - 1)), Ny(a3, i3, e4));
          return null != (n4 = o3 && G(o3.interpolatedValue) && 0 <= (e4 = a3.getDimensionIndex(e4)) ? o3.interpolatedValue[e4] : n4) ? n4 + "" : "";
        }) : void 0;
      }, By.prototype.getRawValue = function(t3, e3) {
        return Ny(this.getData(e3), t3);
      }, By.prototype.formatTooltip = function(t3, e3, n3) {
      }, By);
      function By() {
      }
      function Ey(t3) {
        return new Vy(t3);
      }
      Fy.prototype.perform = function(t3) {
        var e3, n3, i3 = this._upstream, r3 = t3 && t3.skip, o3 = (this._dirty && i3 && ((o3 = this.context).data = o3.outputData = i3.context.outputData), this.__pipeline && (this.__pipeline.currentTask = this), this._plan && !r3 && (e3 = this._plan(this.context)), u3(this._modBy)), a3 = this._modDataCount || 0, s3 = u3(t3 && t3.modBy), l3 = t3 && t3.modDataCount || 0;
        function u3(t4) {
          return t4 = 1 <= t4 ? t4 : 1;
        }
        o3 === s3 && a3 === l3 || (e3 = "reset"), !this._dirty && "reset" !== e3 || (this._dirty = false, n3 = this._doReset(r3)), this._modBy = s3, this._modDataCount = l3;
        o3 = t3 && t3.step;
        if (this._dueEnd = i3 ? i3._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, this._progress) {
          var h3 = this._dueIndex, c3 = Math.min(null != o3 ? this._dueIndex + o3 : 1 / 0, this._dueEnd);
          if (!r3 && (n3 || h3 < c3)) {
            var p3 = this._progress;
            if (G(p3))
              for (var d3 = 0; d3 < p3.length; d3++)
                this._doProgress(p3[d3], h3, c3, s3, l3);
            else
              this._doProgress(p3, h3, c3, s3, l3);
          }
          this._dueIndex = c3;
          a3 = null != this._settedOutputEnd ? this._settedOutputEnd : c3;
          this._outputDueEnd = a3;
        } else
          this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;
        return this.unfinished();
      }, Fy.prototype.dirty = function() {
        this._dirty = true, this._onDirty && this._onDirty(this.context);
      }, Fy.prototype._doProgress = function(t3, e3, n3, i3, r3) {
        qy.reset(e3, n3, i3, r3), this._callingProgress = t3, this._callingProgress({ start: e3, end: n3, count: n3 - e3, next: qy.next }, this.context);
      }, Fy.prototype._doReset = function(t3) {
        this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null, !t3 && this._reset && ((e3 = this._reset(this.context)) && e3.progress && (n3 = e3.forceFirstProgress, e3 = e3.progress), G(e3)) && !e3.length && (e3 = null), this._progress = e3, this._modBy = this._modDataCount = null;
        var e3, n3, t3 = this._downstream;
        return t3 && t3.dirty(), n3;
      }, Fy.prototype.unfinished = function() {
        return this._progress && this._dueIndex < this._dueEnd;
      }, Fy.prototype.pipe = function(t3) {
        this._downstream === t3 && !this._dirty || ((this._downstream = t3)._upstream = this, t3.dirty());
      }, Fy.prototype.dispose = function() {
        this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = false, this._disposed = true);
      }, Fy.prototype.getUpstream = function() {
        return this._upstream;
      }, Fy.prototype.getDownstream = function() {
        return this._downstream;
      }, Fy.prototype.setOutputEnd = function(t3) {
        this._outputDueEnd = this._settedOutputEnd = t3;
      };
      var Vy = Fy;
      function Fy(t3) {
        this._reset = (t3 = t3 || {}).reset, this._plan = t3.plan, this._count = t3.count, this._onDirty = t3.onDirty, this._dirty = true;
      }
      var Gy, Hy, Wy, Uy, Xy, Yy, qy = Yy = { reset: function(t3, e3, n3, i3) {
        Hy = t3, Gy = e3, Wy = n3, Uy = i3, Xy = Math.ceil(Uy / Wy), Yy.next = 1 < Wy && 0 < Uy ? jy : Zy;
      } };
      function Zy() {
        return Hy < Gy ? Hy++ : null;
      }
      function jy() {
        var t3 = Hy % Xy * Wy + Math.ceil(Hy / Xy), t3 = Gy <= Hy ? null : t3 < Uy ? t3 : Hy;
        return Hy++, t3;
      }
      function Ky(t3, e3) {
        e3 = e3 && e3.type;
        return "ordinal" === e3 ? t3 : null == (t3 = "time" !== e3 || U(t3) || null == t3 || "-" === t3 ? t3 : +xa(t3)) || "" === t3 ? NaN : Number(t3);
      }
      var $y = I({ number: function(t3) {
        return parseFloat(t3);
      }, time: function(t3) {
        return +xa(t3);
      }, trim: function(t3) {
        return W(t3) ? At(t3) : t3;
      } });
      function Qy(t3) {
        return $y.get(t3);
      }
      var Jy = { lt: function(t3, e3) {
        return t3 < e3;
      }, lte: function(t3, e3) {
        return t3 <= e3;
      }, gt: function(t3, e3) {
        return e3 < t3;
      }, gte: function(t3, e3) {
        return e3 <= t3;
      } }, t0 = (e0.prototype.evaluate = function(t3) {
        return U(t3) ? this._opFn(t3, this._rvalFloat) : this._opFn(Ta(t3), this._rvalFloat);
      }, e0);
      function e0(t3, e3) {
        U(e3) || f(""), this._opFn = Jy[t3], this._rvalFloat = Ta(e3);
      }
      i0.prototype.evaluate = function(t3, e3) {
        var n3 = U(t3) ? t3 : Ta(t3), i3 = U(e3) ? e3 : Ta(e3), r3 = isNaN(n3), o3 = isNaN(i3);
        return r3 && (n3 = this._incomparable), o3 && (i3 = this._incomparable), r3 && o3 && (r3 = W(t3), o3 = W(e3), r3 && (n3 = o3 ? t3 : 0), o3) && (i3 = r3 ? e3 : 0), n3 < i3 ? this._resultLT : i3 < n3 ? -this._resultLT : 0;
      };
      var n0 = i0;
      function i0(t3, e3) {
        t3 = "desc" === t3;
        this._resultLT = t3 ? 1 : -1, this._incomparable = "min" === (e3 = null == e3 ? t3 ? "min" : "max" : e3) ? -1 / 0 : 1 / 0;
      }
      o0.prototype.evaluate = function(t3) {
        var e3, n3 = t3 === this._rval;
        return n3 || (e3 = typeof t3) === this._rvalTypeof || "number" != e3 && "number" !== this._rvalTypeof || (n3 = Ta(t3) === this._rvalFloat), this._isEQ ? n3 : !n3;
      };
      var r0 = o0;
      function o0(t3, e3) {
        this._rval = e3, this._isEQ = t3, this._rvalTypeof = typeof e3, this._rvalFloat = Ta(e3);
      }
      function a0(t3) {
        var e3 = "", n3 = -1 / 0, i3 = -1 / 0, r3 = 1 / 0, o3 = 1 / 0;
        return t3 && (null != t3.g && (e3 += "G" + t3.g, n3 = t3.g), null != t3.ge && (e3 += "GE" + t3.ge, i3 = t3.ge), null != t3.l && (e3 += "L" + t3.l, r3 = t3.l), null != t3.le) && (e3 += "LE" + t3.le, o3 = t3.le), { key: e3, g: n3, ge: i3, l: r3, le: o3 };
      }
      function s0(t3, e3) {
        return e3 > t3.g && e3 >= t3.ge && e3 < t3.l && e3 <= t3.le;
      }
      u0.prototype.getRawData = function() {
        throw new Error("not supported");
      }, u0.prototype.getRawDataItem = function(t3) {
        throw new Error("not supported");
      }, u0.prototype.cloneRawData = function() {
      }, u0.prototype.getDimensionInfo = function(t3) {
      }, u0.prototype.cloneAllDimensionInfo = function() {
      }, u0.prototype.count = function() {
      }, u0.prototype.retrieveValue = function(t3, e3) {
      }, u0.prototype.retrieveValueFromItem = function(t3, e3) {
      }, u0.prototype.convertValue = Ky;
      var l0 = u0;
      function u0() {
      }
      function h0(t3) {
        return y0(t3.sourceFormat) || f(""), t3.data;
      }
      function c0(t3) {
        var e3 = t3.sourceFormat, n3 = t3.data;
        if (y0(e3) || f(""), e3 === Ou) {
          for (var i3 = [], r3 = 0, o3 = n3.length; r3 < o3; r3++)
            i3.push(n3[r3].slice());
          return i3;
        }
        if (e3 === Ru) {
          for (i3 = [], r3 = 0, o3 = n3.length; r3 < o3; r3++)
            i3.push(V({}, n3[r3]));
          return i3;
        }
      }
      function p0(t3, e3, n3) {
        if (null != n3)
          return U(n3) || !isNaN(n3) && !Ht(e3, n3) ? t3[n3] : Ht(e3, n3) ? e3[n3] : void 0;
      }
      function d0(t3) {
        return _(t3);
      }
      var f0 = I();
      function g0(t3, e3) {
        var n3 = Pa(t3), t3 = n3.length;
        t3 || f("");
        for (var i3 = 0, r3 = t3; i3 < r3; i3++)
          e3 = function(t4, i4) {
            i4.length || f("");
            X(t4) || f("");
            var e4 = t4.type, d3 = f0.get(e4);
            d3 || f("");
            e4 = E(i4, function(t5) {
              var e5 = t5, t5 = d3, n4 = new l0(), i5 = e5.data, r4 = n4.sourceFormat = e5.sourceFormat, o3 = e5.startIndex, a3 = (e5.seriesLayoutBy !== Eu && f(""), []), s3 = {};
              if (h3 = e5.dimensionsDefine)
                F(h3, function(t6, e6) {
                  var n5 = t6.name, e6 = { index: e6, name: n5, displayName: t6.displayName };
                  a3.push(e6), null != n5 && (Ht(s3, n5) && f(""), s3[n5] = e6);
                });
              else
                for (var l3 = 0; l3 < e5.dimensionsDetectedCount; l3++)
                  a3.push({ index: l3 });
              var u3 = Cy(r4, Eu), h3 = (t5.__isBuiltIn && (n4.getRawDataItem = function(t6) {
                return u3(i5, o3, a3, t6);
              }, n4.getRawData = y(h0, null, e5)), n4.cloneRawData = y(c0, null, e5), Ay(r4, Eu)), c3 = (n4.count = y(h3, null, i5, o3, a3), Oy(r4)), p3 = (n4.retrieveValue = function(t6, e6) {
                t6 = u3(i5, o3, a3, t6);
                return p3(t6, e6);
              }, n4.retrieveValueFromItem = function(t6, e6) {
                var n5;
                return null != t6 && (n5 = a3[e6]) ? c3(t6, e6, n5.name) : void 0;
              });
              return n4.getDimensionInfo = y(p0, null, a3, s3), n4.cloneAllDimensionInfo = y(d0, null, a3), n4;
            });
            return E(Pa(d3.transform({ upstream: e4[0], upstreamList: e4, config: _(t4.config) })), function(t5, e5) {
              X(t5) || f(""), t5.data || f("");
              y0(gy(t5.data)) || f("");
              var n4 = i4[0], e5 = n4 && 0 === e5 && !t5.dimensions ? ((e5 = n4.startIndex) && (t5.data = n4.data.slice(0, e5).concat(t5.data)), { seriesLayoutBy: Eu, sourceHeader: e5, dimensions: n4.metaRawOption.dimensions }) : { seriesLayoutBy: Eu, sourceHeader: 0, dimensions: t5.dimensions };
              return dy(t5.data, e5, null);
            });
          }(n3[i3], e3), i3 !== r3 - 1 && (e3.length = Math.max(e3.length, 1));
        return e3;
      }
      function y0(t3) {
        return t3 === Ou || t3 === Ru;
      }
      var m0, v0 = typeof Uint32Array == e ? Array : Uint32Array, _0 = typeof Uint16Array == e ? Array : Uint16Array, x0 = typeof Int32Array == e ? Array : Int32Array, Id = typeof Float64Array == e ? Array : Float64Array, b0 = { float: Id, int: x0, ordinal: Array, number: Array, time: Id };
      function w0(t3) {
        return 65535 < t3 ? v0 : _0;
      }
      function S0(t3, e3, n3, i3, r3) {
        n3 = b0[n3 || "float"];
        if (r3) {
          var o3 = t3[e3], a3 = o3 && o3.length;
          if (a3 !== i3) {
            for (var s3 = new n3(i3), l3 = 0; l3 < a3; l3++)
              s3[l3] = o3[l3];
            t3[e3] = s3;
          }
        } else
          t3[e3] = new n3(i3);
      }
      l.prototype.initData = function(t3, e3, n3) {
        this._provider = t3, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
        var i3 = t3.getSource(), r3 = this.defaultDimValueGetter = m0[i3.sourceFormat];
        this._dimValueGetter = n3 || r3, this._rawExtent = [], vy(i3), this._dimensions = E(e3, function(t4) {
          return { type: t4.type, property: t4.property };
        }), this._initDataFromProvider(0, t3.count());
      }, l.prototype.getProvider = function() {
        return this._provider;
      }, l.prototype.getSource = function() {
        return this._provider.getSource();
      }, l.prototype.ensureCalculationDimension = function(t3, e3) {
        var n3 = this._calcDimNameToIdx, i3 = this._dimensions, r3 = n3.get(t3);
        if (null != r3) {
          if (i3[r3].type === e3)
            return r3;
        } else
          r3 = i3.length;
        return i3[r3] = { type: e3 }, n3.set(t3, r3), this._chunks[r3] = new b0[e3 || "float"](this._rawCount), this._rawExtent[r3] = $a(), r3;
      }, l.prototype.collectOrdinalMeta = function(t3, e3) {
        for (var n3 = this._chunks[t3], i3 = this._dimensions[t3], r3 = this._rawExtent, o3 = i3.ordinalOffset || 0, a3 = n3.length, s3 = (0 === o3 && (r3[t3] = $a()), r3[t3]), l3 = o3; l3 < a3; l3++) {
          var u3 = n3[l3] = e3.parseAndCollect(n3[l3]);
          isNaN(u3) || (s3[0] = Math.min(u3, s3[0]), s3[1] = Math.max(u3, s3[1]));
        }
        i3.ordinalMeta = e3, i3.ordinalOffset = a3, i3.type = "ordinal";
      }, l.prototype.getOrdinalMeta = function(t3) {
        return this._dimensions[t3].ordinalMeta;
      }, l.prototype.getDimensionProperty = function(t3) {
        t3 = this._dimensions[t3];
        return t3 && t3.property;
      }, l.prototype.appendData = function(t3) {
        var e3 = this._provider, n3 = this.count(), t3 = (e3.appendData(t3), e3.count());
        return e3.persistent || (t3 += n3), n3 < t3 && this._initDataFromProvider(n3, t3, true), [n3, t3];
      }, l.prototype.appendValues = function(t3, e3) {
        for (var n3 = this._chunks, i3 = this._dimensions, r3 = i3.length, o3 = this._rawExtent, a3 = this.count(), s3 = a3 + Math.max(t3.length, e3 || 0), l3 = 0; l3 < r3; l3++)
          S0(n3, l3, (d3 = i3[l3]).type, s3, true);
        for (var u3 = [], h3 = a3; h3 < s3; h3++)
          for (var c3 = h3 - a3, p3 = 0; p3 < r3; p3++) {
            var d3 = i3[p3], f3 = m0.arrayRows.call(this, t3[c3] || u3, d3.property, c3, p3), g3 = (n3[p3][h3] = f3, o3[p3]);
            f3 < g3[0] && (g3[0] = f3), f3 > g3[1] && (g3[1] = f3);
          }
        return { start: a3, end: this._rawCount = this._count = s3 };
      }, l.prototype._initDataFromProvider = function(t3, e3, n3) {
        for (var i3 = this._provider, r3 = this._chunks, o3 = this._dimensions, a3 = o3.length, s3 = this._rawExtent, l3 = E(o3, function(t4) {
          return t4.property;
        }), u3 = 0; u3 < a3; u3++) {
          var h3 = o3[u3];
          s3[u3] || (s3[u3] = $a()), S0(r3, u3, h3.type, e3, n3);
        }
        if (i3.fillStorage)
          i3.fillStorage(t3, e3, r3, s3);
        else
          for (var c3 = [], p3 = t3; p3 < e3; p3++)
            for (var c3 = i3.getItem(p3, c3), d3 = 0; d3 < a3; d3++) {
              var f3 = r3[d3], g3 = this._dimValueGetter(c3, l3[d3], p3, d3), f3 = (f3[p3] = g3, s3[d3]);
              g3 < f3[0] && (f3[0] = g3), g3 > f3[1] && (f3[1] = g3);
            }
        !i3.persistent && i3.clean && i3.clean(), this._rawCount = this._count = e3, this._extent = [];
      }, l.prototype.count = function() {
        return this._count;
      }, l.prototype.get = function(t3, e3) {
        return 0 <= e3 && e3 < this._count && (t3 = this._chunks[t3]) ? t3[this.getRawIndex(e3)] : NaN;
      }, l.prototype.getValues = function(t3, e3) {
        var n3 = [], i3 = [];
        if (null == e3) {
          e3 = t3, t3 = [];
          for (var r3 = 0; r3 < this._dimensions.length; r3++)
            i3.push(r3);
        } else
          i3 = t3;
        for (var r3 = 0, o3 = i3.length; r3 < o3; r3++)
          n3.push(this.get(i3[r3], e3));
        return n3;
      }, l.prototype.getByRawIndex = function(t3, e3) {
        return 0 <= e3 && e3 < this._rawCount && (t3 = this._chunks[t3]) ? t3[e3] : NaN;
      }, l.prototype.getSum = function(t3) {
        var e3 = 0;
        if (this._chunks[t3])
          for (var n3 = 0, i3 = this.count(); n3 < i3; n3++) {
            var r3 = this.get(t3, n3);
            isNaN(r3) || (e3 += r3);
          }
        return e3;
      }, l.prototype.getMedian = function(t3) {
        var e3 = [], t3 = (this.each([t3], function(t4) {
          isNaN(t4) || e3.push(t4);
        }), pa(e3), this.count());
        return 0 === t3 ? 0 : t3 % 2 == 1 ? e3[(t3 - 1) / 2] : (e3[t3 / 2] + e3[t3 / 2 - 1]) / 2;
      }, l.prototype.indexOfRawIndex = function(t3) {
        if (!(t3 >= this._rawCount || t3 < 0)) {
          if (!this._indices)
            return t3;
          var e3 = this._indices, n3 = e3[t3];
          if (null != n3 && n3 < this._count && n3 === t3)
            return t3;
          for (var i3 = 0, r3 = this._count - 1; i3 <= r3; ) {
            var o3 = (i3 + r3) / 2 | 0;
            if (e3[o3] < t3)
              i3 = 1 + o3;
            else {
              if (!(e3[o3] > t3))
                return o3;
              r3 = o3 - 1;
            }
          }
        }
        return -1;
      }, l.prototype.getIndices = function() {
        var t3 = this._indices;
        if (t3) {
          var e3 = t3.constructor, n3 = this._count;
          if (e3 === Array)
            for (var i3 = new e3(n3), r3 = 0; r3 < n3; r3++)
              i3[r3] = t3[r3];
          else
            i3 = new e3(t3.buffer, 0, n3);
        } else {
          i3 = new (e3 = w0(this._rawCount))(this.count());
          for (r3 = 0; r3 < i3.length; r3++)
            i3[r3] = r3;
        }
        return i3;
      }, l.prototype.filter = function(t3, e3) {
        if (!this._count)
          return this;
        for (var n3 = this.clone(), i3 = n3.count(), r3 = new (w0(n3._rawCount))(i3), o3 = [], a3 = t3.length, s3 = 0, l3 = t3[0], u3 = n3._chunks, h3 = 0; h3 < i3; h3++) {
          var c3 = void 0, p3 = n3.getRawIndex(h3);
          if (0 === a3)
            c3 = e3(h3);
          else if (1 === a3)
            c3 = e3(u3[l3][p3], h3);
          else {
            for (var d3 = 0; d3 < a3; d3++)
              o3[d3] = u3[t3[d3]][p3];
            o3[d3] = h3, c3 = e3.apply(null, o3);
          }
          c3 && (r3[s3++] = p3);
        }
        return s3 < i3 && (n3._indices = r3), n3._count = s3, n3._extent = [], n3._updateGetRawIdx(), n3;
      }, l.prototype.selectRange = function(t3) {
        var e3 = this.clone(), n3 = e3._count;
        if (!n3)
          return this;
        var i3 = O(t3), r3 = i3.length;
        if (!r3)
          return this;
        var o3 = e3.count(), a3 = new (w0(e3._rawCount))(o3), s3 = 0, l3 = i3[0], u3 = t3[l3][0], h3 = t3[l3][1], c3 = e3._chunks, l3 = false;
        if (!e3._indices) {
          var p3 = 0;
          if (1 === r3) {
            for (var d3 = c3[i3[0]], f3 = 0; f3 < n3; f3++)
              (u3 <= (v3 = d3[f3]) && v3 <= h3 || isNaN(v3)) && (a3[s3++] = p3), p3++;
            l3 = true;
          } else if (2 === r3) {
            for (var d3 = c3[i3[0]], g3 = c3[i3[1]], y3 = t3[i3[1]][0], m3 = t3[i3[1]][1], f3 = 0; f3 < n3; f3++) {
              var v3 = d3[f3], _3 = g3[f3];
              (u3 <= v3 && v3 <= h3 || isNaN(v3)) && (y3 <= _3 && _3 <= m3 || isNaN(_3)) && (a3[s3++] = p3), p3++;
            }
            l3 = true;
          }
        }
        if (!l3)
          if (1 === r3)
            for (f3 = 0; f3 < o3; f3++) {
              var x3 = e3.getRawIndex(f3);
              (u3 <= (v3 = c3[i3[0]][x3]) && v3 <= h3 || isNaN(v3)) && (a3[s3++] = x3);
            }
          else
            for (f3 = 0; f3 < o3; f3++) {
              for (var b3 = true, x3 = e3.getRawIndex(f3), w3 = 0; w3 < r3; w3++) {
                var S3 = i3[w3];
                ((v3 = c3[S3][x3]) < t3[S3][0] || v3 > t3[S3][1]) && (b3 = false);
              }
              b3 && (a3[s3++] = e3.getRawIndex(f3));
            }
        return s3 < o3 && (e3._indices = a3), e3._count = s3, e3._extent = [], e3._updateGetRawIdx(), e3;
      }, l.prototype.map = function(t3, e3) {
        var n3 = this.clone(t3);
        return this._updateDims(n3, t3, e3), n3;
      }, l.prototype.modify = function(t3, e3) {
        this._updateDims(this, t3, e3);
      }, l.prototype._updateDims = function(t3, e3, n3) {
        for (var i3 = t3._chunks, r3 = [], o3 = e3.length, a3 = t3.count(), s3 = [], l3 = t3._rawExtent, u3 = 0; u3 < e3.length; u3++)
          l3[e3[u3]] = $a();
        for (var h3 = 0; h3 < a3; h3++) {
          for (var c3 = t3.getRawIndex(h3), p3 = 0; p3 < o3; p3++)
            s3[p3] = i3[e3[p3]][c3];
          s3[o3] = h3;
          var d3 = n3 && n3.apply(null, s3);
          if (null != d3) {
            "object" != typeof d3 && (r3[0] = d3, d3 = r3);
            for (u3 = 0; u3 < d3.length; u3++) {
              var f3 = e3[u3], g3 = d3[u3], y3 = l3[f3], f3 = i3[f3];
              f3 && (f3[c3] = g3), g3 < y3[0] && (y3[0] = g3), g3 > y3[1] && (y3[1] = g3);
            }
          }
        }
      }, l.prototype.lttbDownSample = function(t3, e3) {
        var n3, i3 = this.clone([t3], true), r3 = i3._chunks[t3], o3 = this.count(), a3 = 0, s3 = Math.floor(1 / e3), l3 = this.getRawIndex(0), u3 = new (w0(this._rawCount))(Math.min(2 * (Math.ceil(o3 / s3) + 2), o3));
        u3[a3++] = l3;
        for (var h3 = 1; h3 < o3 - 1; h3 += s3) {
          for (var c3 = Math.min(h3 + s3, o3 - 1), p3 = Math.min(h3 + 2 * s3, o3), d3 = (p3 + c3) / 2, f3 = 0, g3 = c3; g3 < p3; g3++) {
            var y3 = r3[M3 = this.getRawIndex(g3)];
            isNaN(y3) || (f3 += y3);
          }
          f3 /= p3 - c3;
          for (var c3 = h3, m3 = Math.min(h3 + s3, o3), v3 = h3 - 1, _3 = r3[l3], x3 = -1, b3 = c3, w3 = -1, S3 = 0, g3 = c3; g3 < m3; g3++) {
            var M3, y3 = r3[M3 = this.getRawIndex(g3)];
            isNaN(y3) ? (S3++, w3 < 0 && (w3 = M3)) : x3 < (n3 = Math.abs((v3 - d3) * (y3 - _3) - (v3 - g3) * (f3 - _3))) && (x3 = n3, b3 = M3);
          }
          0 < S3 && S3 < m3 - c3 && (u3[a3++] = Math.min(w3, b3), b3 = Math.max(w3, b3)), l3 = u3[a3++] = b3;
        }
        return u3[a3++] = this.getRawIndex(o3 - 1), i3._count = a3, i3._indices = u3, i3.getRawIndex = this._getRawIdx, i3;
      }, l.prototype.minmaxDownSample = function(t3, e3) {
        for (var n3 = this.clone([t3], true), i3 = n3._chunks, r3 = Math.floor(1 / e3), o3 = i3[t3], a3 = this.count(), s3 = new (w0(this._rawCount))(2 * Math.ceil(a3 / r3)), l3 = 0, u3 = 0; u3 < a3; u3 += r3) {
          var h3 = u3, c3 = o3[this.getRawIndex(h3)], p3 = u3, d3 = o3[this.getRawIndex(p3)], f3 = r3;
          a3 < u3 + r3 && (f3 = a3 - u3);
          for (var g3 = 0; g3 < f3; g3++) {
            var y3 = o3[this.getRawIndex(u3 + g3)];
            y3 < c3 && (c3 = y3, h3 = u3 + g3), d3 < y3 && (d3 = y3, p3 = u3 + g3);
          }
          var m3 = this.getRawIndex(h3), v3 = this.getRawIndex(p3);
          h3 < p3 ? (s3[l3++] = m3, s3[l3++] = v3) : (s3[l3++] = v3, s3[l3++] = m3);
        }
        return n3._count = l3, n3._indices = s3, n3._updateGetRawIdx(), n3;
      }, l.prototype.downSample = function(t3, e3, n3, i3) {
        for (var r3 = this.clone([t3], true), o3 = r3._chunks, a3 = [], s3 = Math.floor(1 / e3), l3 = o3[t3], u3 = this.count(), h3 = r3._rawExtent[t3] = $a(), c3 = new (w0(this._rawCount))(Math.ceil(u3 / s3)), p3 = 0, d3 = 0; d3 < u3; d3 += s3) {
          u3 - d3 < s3 && (a3.length = s3 = u3 - d3);
          for (var f3 = 0; f3 < s3; f3++) {
            var g3 = this.getRawIndex(d3 + f3);
            a3[f3] = l3[g3];
          }
          var y3 = n3(a3), m3 = this.getRawIndex(Math.min(d3 + i3(a3, y3) || 0, u3 - 1));
          (l3[m3] = y3) < h3[0] && (h3[0] = y3), y3 > h3[1] && (h3[1] = y3), c3[p3++] = m3;
        }
        return r3._count = p3, r3._indices = c3, r3._updateGetRawIdx(), r3;
      }, l.prototype.each = function(t3, e3) {
        if (this._count)
          for (var n3 = t3.length, i3 = this._chunks, r3 = 0, o3 = this.count(); r3 < o3; r3++) {
            var a3 = this.getRawIndex(r3);
            switch (n3) {
              case 0:
                e3(r3);
                break;
              case 1:
                e3(i3[t3[0]][a3], r3);
                break;
              case 2:
                e3(i3[t3[0]][a3], i3[t3[1]][a3], r3);
                break;
              default:
                for (var s3 = 0, l3 = []; s3 < n3; s3++)
                  l3[s3] = i3[t3[s3]][a3];
                l3[s3] = r3, e3.apply(null, l3);
            }
          }
      }, l.prototype.getDataExtent = function(t3, e3) {
        var n3 = this._chunks[t3], i3 = $a();
        if (!n3)
          return i3;
        var r3 = this.count();
        if (!this._indices && !e3)
          return this._rawExtent[t3].slice();
        var o3 = this._extent, o3 = o3[t3] || (o3[t3] = {}), a3 = a0(e3), t3 = a3.key, s3 = o3[t3];
        if (s3)
          return s3.slice();
        for (var l3 = i3[0], u3 = i3[1], h3 = 0; h3 < r3; h3++) {
          var c3 = n3[this.getRawIndex(h3)];
          e3 && !s0(a3, c3) || (c3 < l3 && (l3 = c3), u3 < c3 && (u3 = c3));
        }
        return o3[t3] = [l3, u3];
      }, l.prototype.getRawDataItem = function(t3) {
        var e3 = this.getRawIndex(t3);
        if (this._provider.persistent)
          return this._provider.getItem(e3);
        for (var n3 = [], i3 = this._chunks, r3 = 0; r3 < i3.length; r3++)
          n3.push(i3[r3][e3]);
        return n3;
      }, l.prototype.clone = function(t3, e3) {
        var n3, i3, r3 = new l(), o3 = this._chunks, a3 = t3 && dt(t3, function(t4, e4) {
          return t4[e4] = true, t4;
        }, {});
        if (a3)
          for (var s3 = 0; s3 < o3.length; s3++)
            r3._chunks[s3] = a3[s3] ? (n3 = o3[s3], i3 = void 0, (i3 = n3.constructor) === Array ? n3.slice() : new i3(n3)) : o3[s3];
        else
          r3._chunks = o3;
        return this._copyCommonProps(r3), e3 || (r3._indices = this._cloneIndices()), r3._updateGetRawIdx(), r3;
      }, l.prototype._copyCommonProps = function(t3) {
        t3._count = this._count, t3._rawCount = this._rawCount, t3._provider = this._provider, t3._dimensions = this._dimensions, t3._extent = _(this._extent), t3._rawExtent = _(this._rawExtent);
      }, l.prototype._cloneIndices = function() {
        if (this._indices) {
          var t3 = this._indices.constructor, e3 = void 0;
          if (t3 === Array)
            for (var n3 = this._indices.length, e3 = new t3(n3), i3 = 0; i3 < n3; i3++)
              e3[i3] = this._indices[i3];
          else
            e3 = new t3(this._indices);
          return e3;
        }
        return null;
      }, l.prototype._getRawIdxIdentity = function(t3) {
        return t3;
      }, l.prototype._getRawIdx = function(t3) {
        return t3 < this._count && 0 <= t3 ? this._indices[t3] : -1;
      }, l.prototype._updateGetRawIdx = function() {
        this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
      }, l.internalField = void (m0 = { arrayRows: T0, objectRows: function(t3, e3, n3, i3) {
        return Ky(t3[e3], this._dimensions[i3]);
      }, keyedColumns: T0, original: function(t3, e3, n3, i3) {
        t3 = t3 && (null == t3.value ? t3 : t3.value);
        return Ky(t3 instanceof Array ? t3[i3] : t3, this._dimensions[i3]);
      }, typedArray: function(t3, e3, n3, i3) {
        return t3[i3];
      } });
      var M0 = l;
      function l() {
        this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = I();
      }
      function T0(t3, e3, n3, i3) {
        return Ky(t3[i3], this._dimensions[i3]);
      }
      C0.prototype.dirty = function() {
        this._setLocalSource([], []), this._storeList = [], this._dirty = true;
      }, C0.prototype._setLocalSource = function(t3, e3) {
        this._sourceList = t3, this._upstreamSignList = e3, this._versionSignBase++, 9e10 < this._versionSignBase && (this._versionSignBase = 0);
      }, C0.prototype._getVersionSign = function() {
        return this._sourceHost.uid + "_" + this._versionSignBase;
      }, C0.prototype.prepareSource = function() {
        this._isDirty() && (this._createSource(), this._dirty = false);
      }, C0.prototype._createSource = function() {
        this._setLocalSource([], []);
        var t3, e3, n3, i3, r3, o3, a3, s3 = this._sourceHost, l3 = this._getUpstreamSourceManagers(), u3 = !!l3.length;
        D0(s3) ? (i3 = s3, r3 = t3 = o3 = void 0, e3 = u3 ? ((e3 = l3[0]).prepareSource(), o3 = (r3 = e3.getSource()).data, t3 = r3.sourceFormat, [e3._getVersionSign()]) : (t3 = _t(o3 = i3.get("data", true)) ? zu : Pu, []), i3 = this._getSourceMetaRawOption() || {}, r3 = r3 && r3.metaRawOption || {}, a3 = Y(i3.seriesLayoutBy, r3.seriesLayoutBy) || null, n3 = Y(i3.sourceHeader, r3.sourceHeader), i3 = Y(i3.dimensions, r3.dimensions), r3 = a3 !== r3.seriesLayoutBy || !!n3 != !!r3.sourceHeader || i3 ? [dy(o3, { seriesLayoutBy: a3, sourceHeader: n3, dimensions: i3 }, t3)] : []) : (o3 = s3, e3 = u3 ? (r3 = (a3 = this._applyTransform(l3)).sourceList, a3.upstreamSignList) : (r3 = [dy(o3.get("source", true), this._getSourceMetaRawOption(), null)], [])), this._setLocalSource(r3, e3);
      }, C0.prototype._applyTransform = function(t3) {
        var e3, n3 = this._sourceHost, i3 = n3.get("transform", true), r3 = n3.get("fromTransformResult", true), o3 = (null != r3 && 1 !== t3.length && A0(""), []), a3 = [];
        return F(t3, function(t4) {
          t4.prepareSource();
          var e4 = t4.getSource(r3 || 0);
          null == r3 || e4 || A0(""), o3.push(e4), a3.push(t4._getVersionSign());
        }), i3 ? e3 = g0(i3, o3, n3.componentIndex) : null != r3 && (e3 = [new cy({ data: (t3 = o3[0]).data, sourceFormat: t3.sourceFormat, seriesLayoutBy: t3.seriesLayoutBy, dimensionsDefine: _(t3.dimensionsDefine), startIndex: t3.startIndex, dimensionsDetectedCount: t3.dimensionsDetectedCount })]), { sourceList: e3, upstreamSignList: a3 };
      }, C0.prototype._isDirty = function() {
        if (this._dirty)
          return true;
        for (var t3 = this._getUpstreamSourceManagers(), e3 = 0; e3 < t3.length; e3++) {
          var n3 = t3[e3];
          if (n3._isDirty() || this._upstreamSignList[e3] !== n3._getVersionSign())
            return true;
        }
      }, C0.prototype.getSource = function(t3) {
        var e3 = this._sourceList[t3 = t3 || 0];
        return e3 || (e3 = this._getUpstreamSourceManagers())[0] && e3[0].getSource(t3);
      }, C0.prototype.getSharedDataStore = function(t3) {
        var e3 = t3.makeStoreSchema();
        return this._innerGetDataStore(e3.dimensions, t3.source, e3.hash);
      }, C0.prototype._innerGetDataStore = function(t3, e3, n3) {
        var i3, r3 = this._storeList, o3 = r3[0], r3 = (o3 = o3 || (r3[0] = {}))[n3];
        return r3 || (i3 = this._getUpstreamSourceManagers()[0], D0(this._sourceHost) && i3 ? r3 = i3._innerGetDataStore(t3, e3, n3) : (r3 = new M0()).initData(new wy(e3, t3.length), t3), o3[n3] = r3), r3;
      }, C0.prototype._getUpstreamSourceManagers = function() {
        var t3, e3 = this._sourceHost;
        return D0(e3) ? (t3 = wg(e3)) ? [t3.getSourceManager()] : [] : E((t3 = e3).get("transform", true) || t3.get("fromTransformResult", true) ? Za(t3.ecModel, "dataset", { index: t3.get("fromDatasetIndex", true), id: t3.get("fromDatasetId", true) }, qa).models : [], function(t4) {
          return t4.getSourceManager();
        });
      }, C0.prototype._getSourceMetaRawOption = function() {
        var t3, e3, n3, i3 = this._sourceHost;
        return D0(i3) ? (t3 = i3.get("seriesLayoutBy", true), e3 = i3.get("sourceHeader", true), n3 = i3.get("dimensions", true)) : this._getUpstreamSourceManagers().length || (t3 = (i3 = i3).get("seriesLayoutBy", true), e3 = i3.get("sourceHeader", true), n3 = i3.get("dimensions", true)), { seriesLayoutBy: t3, sourceHeader: e3, dimensions: n3 };
      };
      var I0 = C0;
      function C0(t3) {
        this._sourceList = [], this._storeList = [], this._upstreamSignList = [], this._versionSignBase = 0, this._dirty = true, this._sourceHost = t3;
      }
      function k0(t3) {
        t3.option.transform && Pt(t3.option.transform);
      }
      function D0(t3) {
        return "series" === t3.mainType;
      }
      function A0(t3) {
        throw new Error(t3);
      }
      function L0(t3, e3) {
        return e3.type = t3, e3;
      }
      function P0(t3) {
        var e3, n3, i3, r3, o3, a3, s3, l3, u3, h3, c3, p3 = t3.series, d3 = t3.dataIndex, t3 = t3.multipleSeries, f3 = p3.getData(), g3 = f3.mapDimensionsAll("defaultedTooltip"), y3 = g3.length, m3 = p3.getRawValue(d3), v3 = G(m3), _3 = (_3 = d3, Rf((b3 = p3).getData().getItemVisual(_3, "style")[b3.visualDrawType]));
        function x3(t4, e4) {
          e4 = s3.getDimensionInfo(e4);
          e4 && false !== e4.otherDims.tooltip && (l3 ? c3.push(L0("nameValue", { markerType: "subItem", markerColor: a3, name: e4.displayName, value: t4, valueType: e4.type })) : (u3.push(t4), h3.push(e4.type)));
        }
        1 < y3 || v3 && !y3 ? (b3 = m3, r3 = d3, o3 = g3, a3 = _3, s3 = p3.getData(), l3 = dt(b3, function(t4, e4, n4) {
          n4 = s3.getDimensionInfo(n4);
          return t4 || n4 && false !== n4.tooltip && null != n4.displayName;
        }, false), u3 = [], h3 = [], c3 = [], o3.length ? F(o3, function(t4) {
          x3(Ny(s3, r3, t4), t4);
        }) : F(b3, x3), e3 = (o3 = { inlineValues: u3, inlineValueTypes: h3, blocks: c3 }).inlineValueTypes, n3 = o3.blocks, i3 = (o3 = o3.inlineValues)[0]) : y3 ? (b3 = f3.getDimensionInfo(g3[0]), i3 = o3 = Ny(f3, d3, g3[0]), e3 = b3.type) : i3 = o3 = v3 ? m3[0] : m3;
        var y3 = Fa(p3), g3 = y3 && p3.name || "", b3 = f3.getName(d3), v3 = t3 ? g3 : b3;
        return L0("section", { header: g3, noHeader: t3 || !y3, sortParam: i3, blocks: [L0("nameValue", { markerType: "item", markerColor: _3, name: v3, noName: !At(v3), value: o3, valueType: e3, rawDataIndex: f3.getRawIndex(d3) })].concat(n3 || []) });
      }
      var O0 = i();
      function R0(t3, e3) {
        return t3.getName(e3) || t3.getId(e3);
      }
      u(s, N0 = cg), s.prototype.init = function(t3, e3, n3) {
        this.seriesIndex = this.componentIndex, this.dataTask = Ey({ count: E0, reset: V0 }), this.dataTask.context = { model: this }, this.mergeDefaultAndTheme(t3, n3);
        (O0(this).sourceManager = new I0(this)).prepareSource();
        t3 = this.getInitialData(t3, n3);
        G0(t3, this), this.dataTask.context.data = t3, O0(this).dataBeforeProcessed = t3, B0(this), this._initSelectedMapFromData(t3);
      }, s.prototype.mergeDefaultAndTheme = function(t3, e3) {
        var n3 = ig(this), i3 = n3 ? og(t3) : {}, r3 = this.subType;
        cg.hasClass(r3), d(t3, e3.getTheme().get(this.subType)), d(t3, this.getDefaultOption()), Oa(t3, "label", ["show"]), this.fillDataTextStyle(t3.data), n3 && rg(t3, i3, n3);
      }, s.prototype.mergeOption = function(t3, e3) {
        t3 = d(this.option, t3, true), this.fillDataTextStyle(t3.data);
        var n3 = ig(this), n3 = (n3 && rg(this.option, t3, n3), O0(this).sourceManager), n3 = (n3.dirty(), n3.prepareSource(), this.getInitialData(t3, e3));
        G0(n3, this), this.dataTask.dirty(), this.dataTask.context.data = n3, O0(this).dataBeforeProcessed = n3, B0(this), this._initSelectedMapFromData(n3);
      }, s.prototype.fillDataTextStyle = function(t3) {
        if (t3 && !_t(t3))
          for (var e3 = ["show"], n3 = 0; n3 < t3.length; n3++)
            t3[n3] && t3[n3].label && Oa(t3[n3], "label", e3);
      }, s.prototype.getInitialData = function(t3, e3) {
      }, s.prototype.appendData = function(t3) {
        this.getRawData().appendData(t3.data);
      }, s.prototype.getData = function(t3) {
        var e3 = W0(this);
        return e3 ? (e3 = e3.context.data, null != t3 && e3.getLinkedData ? e3.getLinkedData(t3) : e3) : O0(this).data;
      }, s.prototype.getAllData = function() {
        var t3 = this.getData();
        return t3 && t3.getLinkedDataAll ? t3.getLinkedDataAll() : [{ data: t3 }];
      }, s.prototype.setData = function(t3) {
        var e3, n3 = W0(this);
        n3 && ((e3 = n3.context).outputData = t3, n3 !== this.dataTask) && (e3.data = t3), O0(this).data = t3;
      }, s.prototype.getEncode = function() {
        var t3 = this.get("encode", true);
        if (t3)
          return I(t3);
      }, s.prototype.getSourceManager = function() {
        return O0(this).sourceManager;
      }, s.prototype.getSource = function() {
        return this.getSourceManager().getSource();
      }, s.prototype.getRawData = function() {
        return O0(this).dataBeforeProcessed;
      }, s.prototype.getColorBy = function() {
        return this.get("colorBy") || "series";
      }, s.prototype.isColorBySeries = function() {
        return "series" === this.getColorBy();
      }, s.prototype.getBaseAxis = function() {
        var t3 = this.coordinateSystem;
        return t3 && t3.getBaseAxis && t3.getBaseAxis();
      }, s.prototype.indicesOfNearest = function(t3, e3, n3, i3) {
        var r3 = this.getData(), o3 = this.coordinateSystem, a3 = o3 && o3.getAxis(t3);
        if (!o3 || !a3)
          return [];
        for (var s3 = a3.dataToCoord(n3), l3 = (null == i3 && (i3 = 1 / 0), []), u3 = 1 / 0, h3 = -1, c3 = 0, p3 = r3.getDimensionIndex(e3), d3 = r3.getStore(), f3 = 0, g3 = d3.count(); f3 < g3; f3++) {
          var y3 = d3.get(p3, f3), y3 = s3 - a3.dataToCoord(y3), m3 = Math.abs(y3);
          m3 <= i3 && ((m3 < u3 || m3 === u3 && 0 <= y3 && h3 < 0) && (u3 = m3, h3 = y3, c3 = 0), y3 === h3) && (l3[c3++] = f3);
        }
        return l3.length = c3, l3;
      }, s.prototype.formatTooltip = function(t3, e3, n3) {
        return P0({ series: this, dataIndex: t3, multipleSeries: e3 });
      }, s.prototype.isAnimationEnabled = function() {
        var t3 = this.ecModel;
        return !!(!b.node || t3 && t3.ssr) && !!(t3 = (t3 = this.getShallow("animation")) && this.getData().count() > this.getShallow("animationThreshold") ? false : t3);
      }, s.prototype.restoreData = function() {
        this.dataTask.dirty();
      }, s.prototype.getColorFromPalette = function(t3, e3, n3) {
        var i3 = this.ecModel;
        return Lg.prototype.getColorFromPalette.call(this, t3, e3, n3) || i3.getColorFromPalette(t3, e3, n3);
      }, s.prototype.coordDimToDataDim = function(t3) {
        return this.getRawData().mapDimensionsAll(t3);
      }, s.prototype.getProgressive = function() {
        return this.get("progressive");
      }, s.prototype.getProgressiveThreshold = function() {
        return this.get("progressiveThreshold");
      }, s.prototype.select = function(t3, e3) {
        this._innerSelect(this.getData(e3), t3);
      }, s.prototype.unselect = function(t3, e3) {
        var n3 = this.option.selectedMap;
        if (n3) {
          var i3 = this.option.selectedMode, r3 = this.getData(e3);
          if ("series" === i3 || "all" === n3)
            this.option.selectedMap = {}, this._selectedDataIndicesMap = {};
          else
            for (var o3 = 0; o3 < t3.length; o3++) {
              var a3 = R0(r3, t3[o3]);
              n3[a3] = false, this._selectedDataIndicesMap[a3] = -1;
            }
        }
      }, s.prototype.toggleSelect = function(t3, e3) {
        for (var n3 = [], i3 = 0; i3 < t3.length; i3++)
          n3[0] = t3[i3], this.isSelected(t3[i3], e3) ? this.unselect(n3, e3) : this.select(n3, e3);
      }, s.prototype.getSelectedDataIndices = function() {
        if ("all" === this.option.selectedMap)
          return [].slice.call(this.getData().getIndices());
        for (var t3 = this._selectedDataIndicesMap, e3 = O(t3), n3 = [], i3 = 0; i3 < e3.length; i3++) {
          var r3 = t3[e3[i3]];
          0 <= r3 && n3.push(r3);
        }
        return n3;
      }, s.prototype.isSelected = function(t3, e3) {
        var n3 = this.option.selectedMap;
        return !!n3 && (e3 = this.getData(e3), "all" === n3 || n3[R0(e3, t3)]) && !e3.getItemModel(t3).get(["select", "disabled"]);
      }, s.prototype.isUniversalTransitionEnabled = function() {
        var t3;
        return !!this.__universalTransitionEnabled || !!(t3 = this.option.universalTransition) && (true === t3 || t3 && t3.enabled);
      }, s.prototype._innerSelect = function(t3, e3) {
        var n3 = this.option, i3 = n3.selectedMode, r3 = e3.length;
        if (i3 && r3)
          if ("series" === i3)
            n3.selectedMap = "all";
          else if ("multiple" === i3) {
            X(n3.selectedMap) || (n3.selectedMap = {});
            for (var o3 = n3.selectedMap, a3 = 0; a3 < r3; a3++) {
              var s3, l3 = e3[a3];
              o3[s3 = R0(t3, l3)] = true, this._selectedDataIndicesMap[s3] = t3.getRawIndex(l3);
            }
          } else
            "single" !== i3 && true !== i3 || (s3 = R0(t3, i3 = e3[r3 - 1]), n3.selectedMap = ((n3 = {})[s3] = true, n3), this._selectedDataIndicesMap = ((n3 = {})[s3] = t3.getRawIndex(i3), n3));
      }, s.prototype._initSelectedMapFromData = function(n3) {
        var i3;
        this.option.selectedMap || (i3 = [], n3.hasItemOption && n3.each(function(t3) {
          var e3 = n3.getRawDataItem(t3);
          e3 && e3.selected && i3.push(t3);
        }), 0 < i3.length && this._innerSelect(n3, i3));
      }, s.registerClass = function(t3) {
        return cg.registerClass(t3);
      }, s.protoInitialize = ((ws = s.prototype).type = "series.__base__", ws.seriesIndex = 0, ws.ignoreStyleOnData = false, ws.hasSymbolVisual = false, ws.defaultSymbol = "circle", ws.visualStyleAccessPath = "itemStyle", void (ws.visualDrawType = "fill"));
      var N0, z0 = s;
      function s() {
        var t3 = null !== N0 && N0.apply(this, arguments) || this;
        return t3._selectedDataIndicesMap = {}, t3;
      }
      function B0(t3) {
        var e3, n3, i3 = t3.name;
        Fa(t3) || (t3.name = (t3 = (e3 = (t3 = t3).getRawData()).mapDimensionsAll("seriesName"), n3 = [], F(t3, function(t4) {
          t4 = e3.getDimensionInfo(t4);
          t4.displayName && n3.push(t4.displayName);
        }), n3.join(" ") || i3));
      }
      function E0(t3) {
        return t3.model.getRawData().count();
      }
      function V0(t3) {
        t3 = t3.model;
        return t3.setData(t3.getRawData().cloneShallow()), F0;
      }
      function F0(t3, e3) {
        e3.outputData && t3.end > e3.outputData.count() && e3.model.getRawData().cloneShallow(e3.outputData);
      }
      function G0(e3, n3) {
        F(Vt(e3.CHANGABLE_METHODS, e3.DOWNSAMPLE_METHODS), function(t3) {
          e3.wrapMethod(t3, yt(H0, n3));
        });
      }
      function H0(t3, e3) {
        t3 = W0(t3);
        return t3 && t3.setOutputEnd((e3 || this).count()), e3;
      }
      function W0(t3) {
        var e3, n3 = (t3.ecModel || {}).scheduler, n3 = n3 && n3.getPipeline(t3.uid);
        if (n3)
          return (n3 = n3.currentTask) && (e3 = n3.agentStubMap) ? e3.get(t3.uid) : n3;
      }
      ct(z0, af), ct(z0, Lg), gs(z0, cg);
      X0.prototype.init = function(t3, e3) {
      }, X0.prototype.render = function(t3, e3, n3, i3) {
      }, X0.prototype.dispose = function(t3, e3) {
      }, X0.prototype.updateView = function(t3, e3, n3, i3) {
      }, X0.prototype.updateLayout = function(t3, e3, n3, i3) {
      }, X0.prototype.updateVisual = function(t3, e3, n3, i3) {
      }, X0.prototype.toggleBlurSeries = function(t3, e3, n3) {
      }, X0.prototype.eachRendered = function(t3) {
        var e3 = this.group;
        e3 && e3.traverse(t3);
      };
      var U0 = X0;
      function X0() {
        this.group = new Vo(), this.uid = Fd("viewComponent");
      }
      function Y0() {
        var o3 = i();
        return function(t3) {
          var e3 = o3(t3), t3 = t3.pipelineContext, n3 = !!e3.large, i3 = !!e3.progressiveRender, r3 = e3.large = !(!t3 || !t3.large), e3 = e3.progressiveRender = !(!t3 || !t3.progressiveRender);
          return !(n3 == r3 && i3 == e3) && "reset";
        };
      }
      fs(U0), _s(U0);
      var q0 = i(), Z0 = Y0(), j0 = (K0.prototype.init = function(t3, e3) {
      }, K0.prototype.render = function(t3, e3, n3, i3) {
      }, K0.prototype.highlight = function(t3, e3, n3, i3) {
        t3 = t3.getData(i3 && i3.dataType);
        t3 && Q0(t3, i3, "emphasis");
      }, K0.prototype.downplay = function(t3, e3, n3, i3) {
        t3 = t3.getData(i3 && i3.dataType);
        t3 && Q0(t3, i3, "normal");
      }, K0.prototype.remove = function(t3, e3) {
        this.group.removeAll();
      }, K0.prototype.dispose = function(t3, e3) {
      }, K0.prototype.updateView = function(t3, e3, n3, i3) {
        this.render(t3, e3, n3, i3);
      }, K0.prototype.updateVisual = function(t3, e3, n3, i3) {
        this.render(t3, e3, n3, i3);
      }, K0.prototype.eachRendered = function(t3) {
        id(this.group, t3);
      }, K0.markUpdateMethod = function(t3, e3) {
        q0(t3).updateMethod = e3;
      }, K0.protoInitialize = void (K0.prototype.type = "chart"), K0);
      function K0() {
        this.group = new Vo(), this.uid = Fd("viewChart"), this.renderTask = Ey({ plan: J0, reset: tm }), this.renderTask.context = { view: this };
      }
      function $0(t3, e3, n3) {
        t3 && zh(t3) && ("emphasis" === e3 ? vh : _h)(t3, n3);
      }
      function Q0(e3, t3, n3) {
        var i3, r3 = Wa(e3, t3), o3 = t3 && null != t3.highlightKey ? (t3 = t3.highlightKey, i3 = null == (i3 = Hu[t3]) && Gu <= 32 ? Hu[t3] = Gu++ : i3) : null;
        null != r3 ? F(Pa(r3), function(t4) {
          $0(e3.getItemGraphicEl(t4), n3, o3);
        }) : e3.eachItemGraphicEl(function(t4) {
          $0(t4, n3, o3);
        });
      }
      function J0(t3) {
        return Z0(t3.model);
      }
      function tm(t3) {
        var e3 = t3.model, n3 = t3.ecModel, i3 = t3.api, r3 = t3.payload, o3 = e3.pipelineContext.progressiveRender, t3 = t3.view, a3 = r3 && q0(r3).updateMethod, o3 = o3 ? "incrementalPrepareRender" : a3 && t3[a3] ? a3 : "render";
        return "render" !== o3 && t3[o3](e3, n3, i3, r3), em[o3];
      }
      fs(j0), _s(j0);
      var em = { incrementalPrepareRender: { progress: function(t3, e3) {
        e3.view.incrementalRender(t3, e3.model, e3.ecModel, e3.api, e3.payload);
      } }, render: { forceFirstProgress: true, progress: function(t3, e3) {
        e3.view.render(e3.model, e3.ecModel, e3.api, e3.payload);
      } } };
      function nm(t3, r3, o3) {
        var a3, s3, l3, u3, h3, c3 = 0, p3 = 0, d3 = null;
        function f3() {
          p3 = (/* @__PURE__ */ new Date()).getTime(), d3 = null, t3.apply(l3, u3 || []);
        }
        r3 = r3 || 0;
        function e3() {
          for (var t4 = [], e4 = 0; e4 < arguments.length; e4++)
            t4[e4] = arguments[e4];
          a3 = (/* @__PURE__ */ new Date()).getTime(), l3 = this, u3 = t4;
          var n3 = h3 || r3, i3 = h3 || o3;
          h3 = null, s3 = a3 - (i3 ? c3 : p3) - n3, clearTimeout(d3), i3 ? d3 = setTimeout(f3, n3) : 0 <= s3 ? f3() : d3 = setTimeout(f3, -s3), c3 = a3;
        }
        return e3.clear = function() {
          d3 && (clearTimeout(d3), d3 = null);
        }, e3.debounceNextCall = function(t4) {
          h3 = t4;
        }, e3;
      }
      var im = i(), rm = { itemStyle: xs(Pd, true), lineStyle: xs(kd, true) }, om = { lineStyle: "stroke", itemStyle: "fill" };
      function am(t3, e3) {
        t3 = t3.visualStyleMapper || rm[e3];
        return t3 || (console.warn("Unknown style type '" + e3 + "'."), rm.itemStyle);
      }
      function sm(t3, e3) {
        t3 = t3.visualDrawType || om[e3];
        return t3 || (console.warn("Unknown style type '" + e3 + "'."), "fill");
      }
      var Rd = { createOnAllSeries: true, performRawSeries: true, reset: function(r3, t3) {
        var e3 = r3.getData(), n3 = r3.visualStyleAccessPath || "itemStyle", i3 = r3.getModel(n3), o3 = am(r3, n3)(i3), i3 = i3.getShallow("decal"), a3 = (i3 && (e3.setVisual("decal", i3), i3.dirty = true), sm(r3, n3)), i3 = o3[a3], s3 = H(i3) ? i3 : null, n3 = "auto" === o3.fill || "auto" === o3.stroke;
        if (o3[a3] && !s3 && !n3 || (i3 = r3.getColorFromPalette(r3.name, null, t3.getSeriesCount()), o3[a3] || (o3[a3] = i3, e3.setVisual("colorFromPalette", true)), o3.fill = "auto" === o3.fill || H(o3.fill) ? i3 : o3.fill, o3.stroke = "auto" === o3.stroke || H(o3.stroke) ? i3 : o3.stroke), e3.setVisual("style", o3), e3.setVisual("drawType", a3), !t3.isSeriesFiltered(r3) && s3)
          return e3.setVisual("colorFromPalette", false), { dataEach: function(t4, e4) {
            var n4 = r3.getDataParams(e4), i4 = V({}, o3);
            i4[a3] = s3(n4), t4.setItemVisual(e4, "style", i4);
          } };
      } }, lm = new Bd(), Id = { createOnAllSeries: true, reset: function(t3, e3) {
        var n3, i3, r3, o3;
        if (!t3.ignoreStyleOnData)
          return n3 = t3.getData(), i3 = t3.visualStyleAccessPath || "itemStyle", r3 = am(t3, i3), o3 = n3.getVisual("drawType"), { dataEach: n3.hasItemOption ? function(t4, e4) {
            var n4 = t4.getRawDataItem(e4);
            n4 && n4[i3] && (lm.option = n4[i3], n4 = r3(lm), V(t4.ensureUniqueItemVisual(e4, "style"), n4), lm.option.decal && (t4.setItemVisual(e4, "decal", lm.option.decal), lm.option.decal.dirty = true), o3 in n4) && t4.setItemVisual(e4, "colorFromPalette", false);
          } : null };
      } }, ws = { performRawSeries: true, overallReset: function(t3) {
        var n3 = I();
        t3.eachSeries(function(t4) {
          var e3;
          t4.isColorBySeries() || (e3 = t4.type + "-" + t4.getColorBy(), im(t4).scope = n3.get(e3) || n3.set(e3, {}));
        }), t3.eachSeries(function(i3) {
          var r3, o3, a3, s3, t4, l3;
          i3.isColorBySeries() || (r3 = i3.getRawData(), o3 = {}, a3 = i3.getData(), s3 = im(i3).scope, t4 = i3.visualStyleAccessPath || "itemStyle", l3 = sm(i3, t4), a3.each(function(t5) {
            var e3 = a3.getRawIndex(t5);
            o3[e3] = t5;
          }), r3.each(function(t5) {
            var e3, n4 = o3[t5];
            a3.getItemVisual(n4, "colorFromPalette") && (n4 = a3.ensureUniqueItemVisual(n4, "style"), t5 = r3.getName(t5) || t5 + "", e3 = r3.count(), n4[l3] = i3.getColorFromPalette(t5, s3, e3));
          }));
        });
      } }, um = Math.PI;
      cm.prototype.restoreData = function(t3, e3) {
        t3.restoreData(e3), this._stageTaskMap.each(function(t4) {
          t4 = t4.overallTask;
          t4 && t4.dirty();
        });
      }, cm.prototype.getPerformArgs = function(t3, e3) {
        var n3, i3;
        if (t3.__pipeline)
          return i3 = (n3 = this._pipelineMap.get(t3.__pipeline.id)).context, { step: e3 = !e3 && n3.progressiveEnabled && (!i3 || i3.progressiveRender) && t3.__idxInPipeline > n3.blockIndex ? n3.step : null, modBy: null != (t3 = i3 && i3.modDataCount) ? Math.ceil(t3 / e3) : null, modDataCount: t3 };
      }, cm.prototype.getPipeline = function(t3) {
        return this._pipelineMap.get(t3);
      }, cm.prototype.updateStreamModes = function(t3, e3) {
        var n3 = this._pipelineMap.get(t3.uid), e3 = t3.__preparePipelineContext ? t3.__preparePipelineContext(e3, n3) : ls(t3, e3, n3);
        t3.pipelineContext = n3.context = e3;
      }, cm.prototype.restorePipelines = function(i3, t3) {
        var r3 = this, o3 = r3._pipelineMap = I();
        t3.eachSeries(function(t4) {
          var e3 = "canvas" === i3.painter.type && t4.getProgressive(), n3 = t4.uid;
          o3.set(n3, { id: n3, head: null, tail: null, threshold: t4.getProgressiveThreshold(), progressiveEnabled: e3 && !(t4.preventIncremental && t4.preventIncremental()), blockIndex: -1, step: Math.round(e3 || 700), count: 0 }), r3._pipe(t4, t4.dataTask);
        });
      }, cm.prototype.prepareStageTasks = function() {
        var n3 = this._stageTaskMap, i3 = this.api.getModel(), r3 = this.api;
        F(this._allHandlers, function(t3) {
          var e3 = n3.get(t3.uid) || n3.set(t3.uid, {});
          Dt(!(t3.reset && t3.overallReset), ""), t3.reset && this._createSeriesStageTask(t3, e3, i3, r3), t3.overallReset && this._createOverallStageTask(t3, e3, i3, r3);
        }, this);
      }, cm.prototype.prepareView = function(t3, e3, n3, i3) {
        var r3 = t3.renderTask, o3 = r3.context;
        o3.model = e3, o3.ecModel = n3, o3.api = i3, r3.__block = !t3.incrementalPrepareRender, this._pipe(e3, r3);
      }, cm.prototype.performDataProcessorTasks = function(t3, e3) {
        this._performStageTasks(this._dataProcessorHandlers, t3, e3, { block: true });
      }, cm.prototype.performVisualTasks = function(t3, e3, n3) {
        this._performStageTasks(this._visualHandlers, t3, e3, n3);
      }, cm.prototype._performStageTasks = function(t3, s3, l3, u3) {
        u3 = u3 || {};
        var h3 = false, c3 = this;
        function p3(t4, e3) {
          return t4.setDirty && (!t4.dirtyMap || t4.dirtyMap.get(e3.__pipeline.id));
        }
        F(t3, function(i3, t4) {
          var e3, n3, r3, o3, a3;
          u3.visualType && u3.visualType !== i3.visualType || (e3 = (n3 = c3._stageTaskMap.get(i3.uid)).seriesTaskMap, (n3 = n3.overallTask) ? ((o3 = n3.agentStubMap).each(function(t5) {
            p3(u3, t5) && (t5.dirty(), r3 = true);
          }), r3 && n3.dirty(), c3.updatePayload(n3, l3), a3 = c3.getPerformArgs(n3, u3.block), o3.each(function(t5) {
            t5.perform(a3);
          }), n3.perform(a3) && (h3 = true)) : e3 && e3.each(function(t5, e4) {
            p3(u3, t5) && t5.dirty();
            var n4 = c3.getPerformArgs(t5, u3.block);
            n4.skip = !i3.performRawSeries && s3.isSeriesFiltered(t5.context.model), c3.updatePayload(t5, l3), t5.perform(n4) && (h3 = true);
          }));
        }), this.unfinished = h3 || this.unfinished;
      }, cm.prototype.performSeriesTasks = function(t3) {
        var e3;
        t3.eachSeries(function(t4) {
          e3 = t4.dataTask.perform() || e3;
        }), this.unfinished = e3 || this.unfinished;
      }, cm.prototype.plan = function() {
        this._pipelineMap.each(function(t3) {
          var e3 = t3.tail;
          do {
            if (e3.__block) {
              t3.blockIndex = e3.__idxInPipeline;
              break;
            }
          } while (e3 = e3.getUpstream());
        });
      }, cm.prototype.updatePayload = function(t3, e3) {
        "remain" !== e3 && (t3.context.payload = e3);
      }, cm.prototype._createSeriesStageTask = function(n3, t3, i3, r3) {
        var o3 = this, a3 = t3.seriesTaskMap, s3 = t3.seriesTaskMap = I(), t3 = n3.seriesType, e3 = n3.getTargetSeries;
        function l3(t4) {
          var e4 = t4.uid, e4 = s3.set(e4, a3 && a3.get(e4) || Ey({ plan: ym, reset: mm, count: xm }));
          e4.context = { model: t4, ecModel: i3, api: r3, useClearVisual: n3.isVisual && !n3.isLayout, plan: n3.plan, reset: n3.reset, scheduler: o3 }, o3._pipe(t4, e4);
        }
        n3.createOnAllSeries ? i3.eachRawSeries(l3) : t3 ? i3.eachRawSeriesByType(t3, l3) : e3 && e3(i3, r3).each(l3);
      }, cm.prototype._createOverallStageTask = function(t3, e3, n3, i3) {
        var r3 = this, o3 = e3.overallTask = e3.overallTask || Ey({ reset: pm }), a3 = (o3.context = { ecModel: n3, api: i3, overallReset: t3.overallReset, scheduler: r3 }, o3.agentStubMap), s3 = o3.agentStubMap = I(), e3 = t3.seriesType, l3 = t3.getTargetSeries, u3 = t3.dirtyOnOverallProgress, h3 = false;
        function c3(t4) {
          var e4 = t4.uid, e4 = s3.set(e4, a3 && a3.get(e4) || (h3 = true, Ey({ reset: dm, onDirty: gm })));
          e4.context = { model: t4, dirtyOnOverallProgress: u3 }, e4.agent = o3, e4.__block = u3, r3._pipe(t4, e4);
        }
        Dt(!t3.createOnAllSeries, ""), e3 ? n3.eachRawSeriesByType(e3, c3) : l3 ? l3(n3, i3).each(c3) : F(n3.getSeries(), c3), h3 && o3.dirty();
      }, cm.prototype._pipe = function(t3, e3) {
        t3 = t3.uid, t3 = this._pipelineMap.get(t3);
        t3.head || (t3.head = e3), t3.tail && t3.tail.pipe(e3), (t3.tail = e3).__idxInPipeline = t3.count++, e3.__pipeline = t3;
      }, cm.wrapStageHandler = function(t3, e3) {
        return (t3 = H(t3) ? { overallReset: t3, seriesType: function(t4) {
          bm = null;
          try {
            t4(wm, Sm);
          } catch (t5) {
          }
          return bm;
        }(t3) } : t3).uid = Fd("stageHandler"), e3 && (t3.visualType = e3), t3;
      };
      var hm = cm;
      function cm(t3, e3, n3, i3) {
        this._stageTaskMap = I(), this.ecInstance = t3, this.api = e3, n3 = this._dataProcessorHandlers = n3.slice(), i3 = this._visualHandlers = i3.slice(), this._allHandlers = n3.concat(i3);
      }
      function pm(t3) {
        t3.overallReset(t3.ecModel, t3.api, t3.payload);
      }
      function dm(t3) {
        return t3.dirtyOnOverallProgress && fm;
      }
      function fm() {
        this.agent.dirty(), this.getDownstream().dirty();
      }
      function gm() {
        this.agent && this.agent.dirty();
      }
      function ym(t3) {
        return t3.plan ? t3.plan(t3.model, t3.ecModel, t3.api, t3.payload) : null;
      }
      function mm(t3) {
        t3.useClearVisual && t3.data.clearAllVisual();
        t3 = t3.resetDefines = Pa(t3.reset(t3.model, t3.ecModel, t3.api, t3.payload));
        return 1 < t3.length ? E(t3, function(t4, e3) {
          return _m(e3);
        }) : vm;
      }
      var vm = _m(0);
      function _m(o3) {
        return function(t3, e3) {
          var n3 = e3.data, i3 = e3.resetDefines[o3];
          if (i3 && i3.dataEach)
            for (var r3 = t3.start; r3 < t3.end; r3++)
              i3.dataEach(n3, r3);
          else
            i3 && i3.progress && i3.progress(t3, n3);
        };
      }
      function xm(t3) {
        return t3.data.count();
      }
      var bm, wm = {}, Sm = {};
      function Mm(t3, e3) {
        for (var n3 in e3.prototype)
          t3[n3] = Wt;
      }
      Mm(wm, zg), Mm(Sm, Du), wm.eachSeriesByType = wm.eachRawSeriesByType = function(t3) {
        bm = t3;
      }, wm.eachComponent = function(t3) {
        "series" === t3.mainType && t3.subType && (bm = t3.subType);
      };
      function Tm() {
        return { axisLine: { lineStyle: { color: h.axisLine } }, splitLine: { lineStyle: { color: h.axisSplitLine } }, splitArea: { areaStyle: { color: [h.backgroundTint, h.backgroundTransparent] } }, minorSplitLine: { lineStyle: { color: h.axisMinorSplitLine } }, axisLabel: { color: h.axisLabel }, axisName: {} };
      }
      var h = v.darkColor, af = h.background, Pd = { label: { color: h.secondary }, itemStyle: { borderColor: h.borderTint }, dividerLineStyle: { color: h.border } }, af = { darkMode: true, color: h.theme, backgroundColor: af, axisPointer: { lineStyle: { color: h.border }, crossStyle: { color: h.borderShade }, label: { color: h.tertiary } }, legend: { textStyle: { color: h.secondary }, pageTextStyle: { color: h.tertiary } }, textStyle: { color: h.secondary }, title: { textStyle: { color: h.primary }, subtextStyle: { color: h.quaternary } }, toolbox: { iconStyle: { borderColor: h.accent50 }, feature: { dataView: { backgroundColor: af, textColor: h.primary, textareaColor: h.background, textareaBorderColor: h.border, buttonColor: h.accent50, buttonTextColor: h.neutral00 } } }, tooltip: { backgroundColor: h.neutral20, defaultBorderColor: h.border, textStyle: { color: h.tertiary } }, dataZoom: { borderColor: h.accent10, textStyle: { color: h.tertiary }, brushStyle: { color: h.backgroundTint }, handleStyle: { color: h.neutral00, borderColor: h.accent20 }, moveHandleStyle: { color: h.accent40 }, emphasis: { handleStyle: { borderColor: h.accent50 } }, dataBackground: { lineStyle: { color: h.accent30 }, areaStyle: { color: h.accent20 } }, selectedDataBackground: { lineStyle: { color: h.accent50 }, areaStyle: { color: h.accent30 } } }, visualMap: { textStyle: { color: h.secondary }, handleStyle: { borderColor: h.neutral30 } }, timeline: { lineStyle: { color: h.accent10 }, label: { color: h.tertiary }, controlStyle: { color: h.accent30, borderColor: h.accent30 } }, calendar: { itemStyle: { color: h.neutral00, borderColor: h.neutral20 }, dayLabel: { color: h.tertiary }, monthLabel: { color: h.secondary }, yearLabel: { color: h.secondary } }, matrix: { x: Pd, y: Pd, backgroundColor: { borderColor: h.axisLine }, body: { itemStyle: { borderColor: h.borderTint } } }, timeAxis: Tm(), logAxis: Tm(), valueAxis: Tm(), categoryAxis: Tm(), line: { symbol: "circle" }, graph: { color: h.theme }, gauge: { title: { color: h.secondary }, axisLine: { lineStyle: { color: [[1, h.neutral05]] } }, axisLabel: { color: h.axisLabel }, detail: { color: h.primary } }, candlestick: { itemStyle: { color: "#f64e56", color0: "#54ea92", borderColor: "#f64e56", borderColor0: "#54ea92" } }, funnel: { itemStyle: { borderColor: h.background } }, radar: ((kd = Tm()).axisName = { color: h.axisLabel }, kd.axisLine.lineStyle.color = h.neutral20, kd), treemap: { breadcrumb: { itemStyle: { color: h.neutral20, textStyle: { color: h.secondary } }, emphasis: { itemStyle: { color: h.neutral30 } } } }, sunburst: { itemStyle: { borderColor: h.background } }, map: { itemStyle: { borderColor: h.border, areaColor: h.neutral10 }, label: { color: h.tertiary }, emphasis: { label: { color: h.primary }, itemStyle: { areaColor: h.highlight } }, select: { label: { color: h.primary }, itemStyle: { areaColor: h.highlight } } }, geo: { itemStyle: { borderColor: h.border, areaColor: h.neutral10 }, emphasis: { label: { color: h.primary }, itemStyle: { areaColor: h.highlight } }, select: { label: { color: h.primary }, itemStyle: { color: h.highlight } } } }, Im = (af.categoryAxis.splitLine.show = false, Cm.prototype.normalizeQuery = function(t3) {
        var e3, a3, s3, l3 = {}, u3 = {}, h3 = {};
        return W(t3) ? (e3 = ds(t3), l3.mainType = e3.main || null, l3.subType = e3.sub || null) : (a3 = ["Index", "Name", "Id"], s3 = { name: 1, dataIndex: 1, dataType: 1 }, F(t3, function(t4, e4) {
          for (var n3 = false, i3 = 0; i3 < a3.length; i3++) {
            var r3 = a3[i3], o3 = e4.lastIndexOf(r3);
            0 < o3 && o3 === e4.length - r3.length && "data" !== (o3 = e4.slice(0, o3)) && (l3.mainType = o3, l3[r3.toLowerCase()] = t4, n3 = true);
          }
          s3.hasOwnProperty(e4) && (u3[e4] = t4, n3 = true), n3 || (h3[e4] = t4);
        })), { cptQuery: l3, dataQuery: u3, otherQuery: h3 };
      }, Cm.prototype.filter = function(t3, e3) {
        var n3, i3, r3, o3, a3, s3 = this.eventInfo;
        return !s3 || (n3 = s3.targetEl, i3 = s3.packedEvent, r3 = s3.model, s3 = s3.view, !r3) || !s3 || (o3 = e3.cptQuery, a3 = e3.dataQuery, l3(o3, r3, "mainType") && l3(o3, r3, "subType") && l3(o3, r3, "index", "componentIndex") && l3(o3, r3, "name") && l3(o3, r3, "id") && l3(a3, i3, "name") && l3(a3, i3, "dataIndex") && l3(a3, i3, "dataType") && (!s3.filterForExposedEvent || s3.filterForExposedEvent(t3, e3.otherQuery, n3, i3)));
        function l3(t4, e4, n4, i4) {
          return null == t4[n4] || e4[i4 || n4] === t4[n4];
        }
      }, Cm.prototype.afterTrigger = function() {
        this.eventInfo = null;
      }, Cm);
      function Cm() {
      }
      var km = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], Dm = km.concat(["symbolKeepAspect"]), Pd = { createOnAllSeries: true, performRawSeries: true, reset: function(a3, t3) {
        var e3 = a3.getData();
        if (a3.legendIcon && e3.setVisual("legendIcon", a3.legendIcon), a3.hasSymbolVisual) {
          for (var s3, n3 = {}, l3 = {}, i3 = false, r3 = 0; r3 < km.length; r3++) {
            var o3 = km[r3], u3 = a3.get(o3);
            H(u3) ? (i3 = true, l3[o3] = u3) : n3[o3] = u3;
          }
          if (n3.symbol = n3.symbol || a3.defaultSymbol, e3.setVisual(V({ legendIcon: a3.legendIcon || n3.symbol, symbolKeepAspect: a3.get("symbolKeepAspect") }, n3)), !t3.isSeriesFiltered(a3))
            return s3 = O(l3), { dataEach: i3 ? function(t4, e4) {
              for (var n4 = a3.getRawValue(e4), i4 = a3.getDataParams(e4), r4 = 0; r4 < s3.length; r4++) {
                var o4 = s3[r4];
                t4.setItemVisual(e4, o4, l3[o4](n4, i4));
              }
            } : null };
        }
      } }, kd = { createOnAllSeries: true, performRawSeries: true, reset: function(t3, e3) {
        if (t3.hasSymbolVisual && !e3.isSeriesFiltered(t3))
          return { dataEach: t3.getData().hasItemOption ? function(t4, e4) {
            for (var n3 = t4.getItemModel(e4), i3 = 0; i3 < Dm.length; i3++) {
              var r3 = Dm[i3], o3 = n3.getShallow(r3, true);
              null != o3 && t4.setItemVisual(e4, r3, o3);
            }
          } : null };
      } };
      function Am(o3, t3) {
        F([[o3 + "ToggleSelect", "toggleSelect"], [o3 + "Select", "select"], [o3 + "UnSelect", "unselect"]], function(r3) {
          t3(r3[0], function(t4, e3, n3) {
            var i3;
            t4 = V({}, t4), n3.dispatchAction(V(t4, { type: r3[1], seriesIndex: (n3 = t4, i3 = [], e3.eachComponent({ mainType: "series", subType: o3, query: n3 }, function(t5) {
              i3.push(t5.seriesIndex);
            }), i3) }));
          });
        });
      }
      function Lm(t3, e3, s3, n3, l3) {
        var u3 = t3 + e3;
        s3.isSilent(u3) || n3.eachComponent({ mainType: "series", subType: "pie" }, function(t4) {
          for (var e4, n4, i3 = t4.seriesIndex, r3 = t4.option.selectedMap, o3 = l3.selected, a3 = 0; a3 < o3.length; a3++)
            o3[a3].seriesIndex === i3 && (n4 = Wa(e4 = t4.getData(), l3.fromActionPayload), s3.trigger(u3, { type: u3, seriesId: t4.id, name: G(n4) ? e4.getName(n4[0]) : e4.getName(n4), selected: W(r3) ? r3 : V({}, r3) }));
        });
      }
      function Pm(t3, e3, n3) {
        for (var i3; t3 && (!e3(t3) || (i3 = t3, !n3)); )
          t3 = t3.__hostTarget || t3.parent;
        return i3;
      }
      var Om = new ge(), Rm = {};
      var Nm = i();
      function zm(t3) {
        return Nm(t3).fullUpdate;
      }
      var Bm = Math.round(9 * Math.random()), Em = "function" == typeof Object.defineProperty, Vm = (Fm.prototype.get = function(t3) {
        return this._guard(t3)[this._id];
      }, Fm.prototype.set = function(t3, e3) {
        t3 = this._guard(t3);
        return Em ? Object.defineProperty(t3, this._id, { value: e3, enumerable: false, configurable: true }) : t3[this._id] = e3, this;
      }, Fm.prototype.delete = function(t3) {
        return !!this.has(t3) && (delete this._guard(t3)[this._id], true);
      }, Fm.prototype.has = function(t3) {
        return !!this._guard(t3)[this._id];
      }, Fm.prototype._guard = function(t3) {
        if (t3 !== Object(t3))
          throw TypeError("Value of WeakMap is not a non-null object.");
        return t3;
      }, Fm);
      function Fm() {
        this._id = "__ec_inner_" + Bm++;
      }
      var Gm = ql.extend({ type: "triangle", shape: { cx: 0, cy: 0, width: 0, height: 0 }, buildPath: function(t3, e3) {
        var n3 = e3.cx, i3 = e3.cy, r3 = e3.width / 2, e3 = e3.height / 2;
        t3.moveTo(n3, i3 - e3), t3.lineTo(n3 + r3, i3 + e3), t3.lineTo(n3 - r3, i3 + e3), t3.closePath();
      } }), Hm = ql.extend({ type: "diamond", shape: { cx: 0, cy: 0, width: 0, height: 0 }, buildPath: function(t3, e3) {
        var n3 = e3.cx, i3 = e3.cy, r3 = e3.width / 2, e3 = e3.height / 2;
        t3.moveTo(n3, i3 - e3), t3.lineTo(n3 + r3, i3), t3.lineTo(n3, i3 + e3), t3.lineTo(n3 - r3, i3), t3.closePath();
      } }), Wm = ql.extend({ type: "pin", shape: { x: 0, y: 0, width: 0, height: 0 }, buildPath: function(t3, e3) {
        var n3 = e3.x, i3 = e3.y, r3 = e3.width / 5 * 3, e3 = Math.max(r3, e3.height), r3 = r3 / 2, o3 = r3 * r3 / (e3 - r3), e3 = i3 - e3 + r3 + o3, a3 = Math.asin(o3 / r3), s3 = Math.cos(a3) * r3, l3 = Math.sin(a3), u3 = Math.cos(a3), h3 = 0.6 * r3, c3 = 0.7 * r3;
        t3.moveTo(n3 - s3, e3 + o3), t3.arc(n3, e3, r3, Math.PI - a3, 2 * Math.PI + a3), t3.bezierCurveTo(n3 + s3 - l3 * h3, e3 + o3 + u3 * h3, n3, i3 - c3, n3, i3), t3.bezierCurveTo(n3, i3 - c3, n3 - s3 + l3 * h3, e3 + o3 + u3 * h3, n3 - s3, e3 + o3), t3.closePath();
      } }), Um = ql.extend({ type: "arrow", shape: { x: 0, y: 0, width: 0, height: 0 }, buildPath: function(t3, e3) {
        var n3 = e3.height, i3 = e3.width, r3 = e3.x, e3 = e3.y, i3 = i3 / 3 * 2;
        t3.moveTo(r3, e3), t3.lineTo(r3 + i3, e3 + n3), t3.lineTo(r3, e3 + n3 / 4 * 3), t3.lineTo(r3 - i3, e3 + n3), t3.lineTo(r3, e3), t3.closePath();
      } }), Xm = { line: function(t3, e3, n3, i3, r3) {
        r3.x1 = t3, r3.y1 = e3 + i3 / 2, r3.x2 = t3 + n3, r3.y2 = e3 + i3 / 2;
      }, rect: function(t3, e3, n3, i3, r3) {
        r3.x = t3, r3.y = e3, r3.width = n3, r3.height = i3;
      }, roundRect: function(t3, e3, n3, i3, r3) {
        r3.x = t3, r3.y = e3, r3.width = n3, r3.height = i3, r3.r = Math.min(n3, i3) / 4;
      }, square: function(t3, e3, n3, i3, r3) {
        n3 = Math.min(n3, i3);
        r3.x = t3, r3.y = e3, r3.width = n3, r3.height = n3;
      }, circle: function(t3, e3, n3, i3, r3) {
        r3.cx = t3 + n3 / 2, r3.cy = e3 + i3 / 2, r3.r = Math.min(n3, i3) / 2;
      }, diamond: function(t3, e3, n3, i3, r3) {
        r3.cx = t3 + n3 / 2, r3.cy = e3 + i3 / 2, r3.width = n3, r3.height = i3;
      }, pin: function(t3, e3, n3, i3, r3) {
        r3.x = t3 + n3 / 2, r3.y = e3 + i3 / 2, r3.width = n3, r3.height = i3;
      }, arrow: function(t3, e3, n3, i3, r3) {
        r3.x = t3 + n3 / 2, r3.y = e3 + i3 / 2, r3.width = n3, r3.height = i3;
      }, triangle: function(t3, e3, n3, i3, r3) {
        r3.cx = t3 + n3 / 2, r3.cy = e3 + i3 / 2, r3.width = n3, r3.height = i3;
      } }, Ym = {}, qm = (F({ line: Xc, rect: uu, roundRect: uu, square: uu, circle: ac, diamond: Hm, pin: Wm, arrow: Um, triangle: Gm }, function(t3, e3) {
        Ym[e3] = new t3();
      }), ql.extend({ type: "symbol", shape: { symbolType: "", x: 0, y: 0, width: 0, height: 0 }, calculateTextPosition: function(t3, e3, n3) {
        var t3 = wo(t3, e3, n3), i3 = this.shape;
        return i3 && "pin" === i3.symbolType && "inside" === e3.position && (t3.y = n3.y + 0.4 * n3.height), t3;
      }, buildPath: function(t3, e3, n3) {
        var i3, r3 = e3.symbolType;
        "none" !== r3 && (i3 = (i3 = Ym[r3]) || Ym[r3 = "rect"], Xm[r3](e3.x, e3.y, e3.width, e3.height, i3.shape), i3.buildPath(t3, i3.shape, n3));
      } }));
      function Zm(t3, e3) {
        var n3;
        "image" !== this.type && (n3 = this.style, this.__isEmptyBrush ? (n3.stroke = t3, n3.fill = e3 || v.color.neutral00, n3.lineWidth = 2) : "line" === this.shape.symbolType ? n3.stroke = t3 : n3.fill = t3, this.markRedraw());
      }
      function jm(t3, e3, n3, i3, r3, o3, a3) {
        var s3 = 0 === t3.indexOf("empty");
        return (a3 = 0 === (t3 = s3 ? t3.substr(5, 1).toLowerCase() + t3.substr(6) : t3).indexOf("image://") ? Xp(t3.slice(8), new Z(e3, n3, i3, r3), a3 ? "center" : "cover") : 0 === t3.indexOf("path://") ? Up(t3.slice(7), {}, new Z(e3, n3, i3, r3), a3 ? "center" : "cover") : new qm({ shape: { symbolType: t3, x: e3, y: n3, width: i3, height: r3 } })).__isEmptyBrush = s3, a3.setColor = Zm, o3 && a3.setColor(o3), a3;
      }
      function Km(t3, e3) {
        if (null != t3)
          return G(t3) || (t3 = [t3, t3]), [ha(t3[0], e3[0]) || 0, ha(Y(t3[1], t3[0]), e3[1]) || 0];
      }
      function $m(t3) {
        return isFinite(t3);
      }
      function Qm(t3, e3, n3) {
        for (var i3, r3, o3, a3, s3, l3, u3, h3, c3, p3 = "radial" === e3.type ? (i3 = t3, r3 = e3, a3 = (o3 = n3).width, s3 = o3.height, l3 = Math.min(a3, s3), u3 = null == r3.x ? 0.5 : r3.x, h3 = null == r3.y ? 0.5 : r3.y, c3 = null == r3.r ? 0.5 : r3.r, r3.global || (u3 = u3 * a3 + o3.x, h3 = h3 * s3 + o3.y, c3 *= l3), u3 = $m(u3) ? u3 : 0.5, h3 = $m(h3) ? h3 : 0.5, c3 = 0 <= c3 && $m(c3) ? c3 : 0.5, i3.createRadialGradient(u3, h3, 0, u3, h3, c3)) : (r3 = t3, a3 = n3, o3 = null == (s3 = e3).x ? 0 : s3.x, l3 = null == s3.x2 ? 1 : s3.x2, i3 = null == s3.y ? 0 : s3.y, u3 = null == s3.y2 ? 0 : s3.y2, s3.global || (o3 = o3 * a3.width + a3.x, l3 = l3 * a3.width + a3.x, i3 = i3 * a3.height + a3.y, u3 = u3 * a3.height + a3.y), o3 = $m(o3) ? o3 : 0, l3 = $m(l3) ? l3 : 1, i3 = $m(i3) ? i3 : 0, u3 = $m(u3) ? u3 : 0, r3.createLinearGradient(o3, i3, l3, u3)), d3 = e3.colorStops, f3 = 0; f3 < d3.length; f3++)
          p3.addColorStop(d3[f3].offset, d3[f3].color);
        return p3;
      }
      function Jm(t3) {
        return parseInt(t3, 10);
      }
      function tv(t3, e3, n3) {
        var i3 = ["width", "height"][e3], r3 = ["clientWidth", "clientHeight"][e3], o3 = ["paddingLeft", "paddingTop"][e3], e3 = ["paddingRight", "paddingBottom"][e3];
        return null != n3[i3] && "auto" !== n3[i3] ? parseFloat(n3[i3]) : (n3 = document.defaultView.getComputedStyle(t3), (t3[r3] || Jm(n3[i3]) || Jm(t3.style[i3])) - (Jm(n3[o3]) || 0) - (Jm(n3[e3]) || 0) || 0);
      }
      function ev(t3) {
        var e3, n3 = t3.style, i3 = n3.lineDash && 0 < n3.lineWidth && (r3 = n3.lineDash, i3 = n3.lineWidth, r3 && "solid" !== r3 && 0 < i3 ? "dashed" === r3 ? [4 * i3, 2 * i3] : "dotted" === r3 ? [i3] : U(r3) ? [r3] : G(r3) ? r3 : null : null), r3 = n3.lineDashOffset;
        return i3 && (e3 = n3.strokeNoScale && t3.getLineScale ? t3.getLineScale() : 1) && 1 !== e3 && (i3 = E(i3, function(t4) {
          return t4 / e3;
        }), r3 /= e3), [i3, r3];
      }
      var nv = new Dl(true);
      function iv(t3) {
        var e3 = t3.stroke;
        return !(null == e3 || "none" === e3 || !(0 < t3.lineWidth));
      }
      function rv(t3) {
        return "string" == typeof t3 && "none" !== t3;
      }
      function ov(t3) {
        t3 = t3.fill;
        return null != t3 && "none" !== t3;
      }
      function av(t3, e3) {
        var n3;
        null != e3.fillOpacity && 1 !== e3.fillOpacity ? (n3 = t3.globalAlpha, t3.globalAlpha = e3.fillOpacity * e3.opacity, t3.fill(), t3.globalAlpha = n3) : t3.fill();
      }
      function sv(t3, e3) {
        var n3;
        null != e3.strokeOpacity && 1 !== e3.strokeOpacity ? (n3 = t3.globalAlpha, t3.globalAlpha = e3.strokeOpacity * e3.opacity, t3.stroke(), t3.globalAlpha = n3) : t3.stroke();
      }
      function lv(t3, e3, n3) {
        var n3 = Ts(e3.image, e3.__image, n3);
        if (Cs(n3))
          return t3 = t3.createPattern(n3, e3.repeat || "repeat"), "function" == typeof DOMMatrix && t3 && t3.setTransform && ((n3 = new DOMMatrix()).translateSelf(e3.x || 0, e3.y || 0), n3.rotateSelf(0, 0, (e3.rotation || 0) * Ut), n3.scaleSelf(e3.scaleX || 1, e3.scaleY || 1), t3.setTransform(n3)), t3;
      }
      var uv = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], hv = [["lineCap", "butt"], ["lineJoin", "miter"], ["miterLimit", 10]];
      function cv(t3, e3, n3, i3, r3) {
        var o3, a3 = false;
        if (!i3 && e3 === (n3 = n3 || {}))
          return false;
        !i3 && e3.opacity === n3.opacity || (vv(t3, r3), a3 = true, o3 = Math.max(Math.min(e3.opacity, 1), 0), t3.globalAlpha = isNaN(o3) ? qs.opacity : o3), !i3 && e3.blend === n3.blend || (a3 || (vv(t3, r3), a3 = true), t3.globalCompositeOperation = e3.blend || qs.blend);
        for (var s3 = 0; s3 < uv.length; s3++) {
          var l3 = uv[s3];
          !i3 && e3[l3] === n3[l3] || (a3 || (vv(t3, r3), a3 = true), t3[l3] = t3.dpr * (e3[l3] || 0));
        }
        return !i3 && e3.shadowColor === n3.shadowColor || (a3 || (vv(t3, r3), a3 = true), t3.shadowColor = e3.shadowColor || qs.shadowColor), a3;
      }
      function pv(t3, e3, n3, i3, r3) {
        var o3 = e3.style, a3 = i3 ? null : n3 && n3.style || {};
        if (o3 !== a3) {
          var s3 = cv(t3, o3, a3, i3, r3);
          (i3 || o3.fill !== a3.fill) && (s3 || (vv(t3, r3), s3 = true), rv(o3.fill)) && (t3.fillStyle = o3.fill), (i3 || o3.stroke !== a3.stroke) && (s3 || (vv(t3, r3), s3 = true), rv(o3.stroke)) && (t3.strokeStyle = o3.stroke), !i3 && o3.opacity === a3.opacity || (s3 || (vv(t3, r3), s3 = true), t3.globalAlpha = null == o3.opacity ? 1 : o3.opacity), e3.hasStroke() && (n3 = o3.lineWidth / (o3.strokeNoScale && e3.getLineScale ? e3.getLineScale() : 1), t3.lineWidth !== n3) && (s3 || (vv(t3, r3), s3 = true), t3.lineWidth = n3);
          for (var l3 = 0; l3 < hv.length; l3++) {
            var u3 = hv[l3], h3 = u3[0];
            !i3 && o3[h3] === a3[h3] || (s3 || (vv(t3, r3), s3 = true), t3[h3] = o3[h3] || u3[1]);
          }
        }
      }
      function dv(t3, e3) {
        var e3 = e3.transform, n3 = t3.dpr || 1;
        e3 ? t3.setTransform(n3 * e3[0], n3 * e3[1], n3 * e3[2], n3 * e3[3], n3 * e3[4], n3 * e3[5]) : t3.setTransform(n3, 0, 0, n3, 0, 0);
      }
      var fv = 1, gv = 2, yv = 3, mv = 4;
      function vv(t3, e3) {
        e3.batchFill && (e3.batchFill = false, t3.fill()), e3.batchStroke && (e3.batchStroke = false, t3.stroke());
      }
      function _v(t3, e3) {
        var n3 = { inHover: false, viewWidth: 0, viewHeight: 0, beforeBrushParam: {} };
        xv(t3, e3, n3), bv(t3, n3);
      }
      function xv(t3, e3, n3) {
        var i3 = e3.transform;
        if (e3.shouldBePainted(n3.viewWidth, n3.viewHeight, false, false)) {
          var r3 = e3.__clipPaths, o3 = n3.prevElClipPaths, a3 = e3.style, s3 = false, l3 = false;
          if ((!o3 || function(t4, e4) {
            if (t4 !== e4 && (t4 || e4)) {
              if (!t4 || !e4 || t4.length !== e4.length)
                return 1;
              for (var n4 = 0; n4 < t4.length; n4++)
                if (t4[n4] !== e4[n4])
                  return 1;
            }
          }(r3, o3)) && (o3 && (vv(t3, n3), t3.restore(), l3 = s3 = true, n3.prevElClipPaths = null, n3.allClipped = false, n3.prevEl = null), r3) && r3.length) {
            vv(t3, n3), t3.save();
            for (var z3 = r3, B3 = t3, o3 = n3, E3 = false, V3 = 0; V3 < z3.length; V3++) {
              var F3 = z3[V3], E3 = E3 || F3.isZeroArea();
              dv(B3, F3), B3.beginPath(), F3.buildPath(B3, F3.shape), B3.clip();
            }
            o3.allClipped = E3, s3 = true, n3.prevElClipPaths = r3;
          }
          if (n3.allClipped)
            e3.__dirty &= ~Hn, e3.__isRendered = false;
          else {
            e3.beforeBrush && e3.beforeBrush(n3.beforeBrushParam), e3.innerBeforeBrush();
            var u3, h3, c3, p3, G3, d3, f3, g3, y3, m3, v3, _3, x3, b3, H3, W3, w3, S3, M3, T3, I3, C3, k3, D3, o3 = n3.prevEl, A3 = (o3 || (l3 = s3 = true), e3 instanceof ql && e3.autoBatch && (A3 = ov(r3 = a3), u3 = iv(r3), !(r3.lineDash || !(+A3 ^ +u3) || A3 && "string" != typeof r3.fill || u3 && "string" != typeof r3.stroke || r3.strokePercent < 1 || r3.strokeOpacity < 1 || r3.fillOpacity < 1)));
            if (s3 || (u3 = i3, r3 = o3.transform, u3 && r3 ? u3[0] !== r3[0] || u3[1] !== r3[1] || u3[2] !== r3[2] || u3[3] !== r3[3] || u3[4] !== r3[4] || u3[5] !== r3[5] : u3 || r3) ? (vv(t3, n3), dv(t3, e3)) : A3 || vv(t3, n3), e3 instanceof ql)
              n3.lastDrawType !== fv && (l3 = true, n3.lastDrawType = fv), pv(t3, e3, o3, l3, n3), A3 && (n3.batchFill || n3.batchStroke) || t3.beginPath(), s3 = t3, i3 = e3, r3 = A3, G3 = n3, w3 = iv(p3 = a3), S3 = ov(p3), P3 = p3.strokePercent, M3 = P3 < 1, T3 = !i3.path, i3.silent && !M3 || !T3 || i3.createPathProxy(), I3 = i3.path || nv, C3 = i3.__dirty, r3 || (d3 = p3.fill, D3 = p3.stroke, f3 = S3 && !!d3.colorStops, g3 = w3 && !!D3.colorStops, y3 = S3 && !!d3.image, m3 = w3 && !!D3.image, k3 = b3 = x3 = _3 = v3 = void 0, (f3 || g3) && (k3 = i3.getBoundingRect()), f3 && (v3 = C3 ? Qm(s3, d3, k3) : i3.__canvasFillGradient, i3.__canvasFillGradient = v3), g3 && (_3 = C3 ? Qm(s3, D3, k3) : i3.__canvasStrokeGradient, i3.__canvasStrokeGradient = _3), y3 && (x3 = C3 || !i3.__canvasFillPattern ? lv(s3, d3, i3) : i3.__canvasFillPattern, i3.__canvasFillPattern = x3), m3 && (b3 = C3 || !i3.__canvasStrokePattern ? lv(s3, D3, i3) : i3.__canvasStrokePattern, i3.__canvasStrokePattern = b3), f3 ? s3.fillStyle = v3 : y3 && (x3 ? s3.fillStyle = x3 : S3 = false), g3 ? s3.strokeStyle = _3 : m3 && (b3 ? s3.strokeStyle = b3 : w3 = false)), k3 = i3.getGlobalScale(), I3.setScale(k3[0], k3[1], i3.segmentIgnoreThreshold), s3.setLineDash && p3.lineDash && (H3 = (d3 = ev(i3))[0], W3 = d3[1]), D3 = true, (T3 || C3 & Wn) && (I3.setDPR(s3.dpr), M3 ? I3.setContext(null) : (I3.setContext(s3), D3 = false), I3.reset(), i3.buildPath(I3, i3.shape, r3), I3.toStatic(), i3.pathUpdated()), D3 && I3.rebuildPath(s3, M3 ? P3 : 1), H3 && (s3.setLineDash(H3), s3.lineDashOffset = W3), r3 ? (G3.batchFill = S3, G3.batchStroke = w3) : p3.strokeFirst ? (w3 && sv(s3, p3), S3 && av(s3, p3)) : (S3 && av(s3, p3), w3 && sv(s3, p3)), H3 && s3.setLineDash([]);
            else if (e3 instanceof Kl)
              n3.lastDrawType !== yv && (l3 = true, n3.lastDrawType = yv), pv(t3, e3, o3, l3, n3), f3 = t3, v3 = e3, null != (x3 = (y3 = a3).text) && (x3 += ""), x3 && (f3.font = y3.font || K, f3.textAlign = y3.textAlign, f3.textBaseline = y3.textBaseline, _3 = g3 = void 0, f3.setLineDash && y3.lineDash && (g3 = (v3 = ev(v3))[0], _3 = v3[1]), g3 && (f3.setLineDash(g3), f3.lineDashOffset = _3), y3.strokeFirst ? (iv(y3) && f3.strokeText(x3, y3.x, y3.y), ov(y3) && f3.fillText(x3, y3.x, y3.y)) : (ov(y3) && f3.fillText(x3, y3.x, y3.y), iv(y3) && f3.strokeText(x3, y3.x, y3.y)), g3) && f3.setLineDash([]);
            else if (e3 instanceof eu)
              n3.lastDrawType !== gv && (l3 = true, n3.lastDrawType = gv), m3 = o3, b3 = l3, cv(t3, e3.style, m3 && m3.style, b3, n3), k3 = t3, d3 = a3, (C3 = (T3 = e3).__image = Ts(d3.image, T3.__image, T3, T3.onload)) && Cs(C3) && (i3 = d3.x || 0, D3 = d3.y || 0, I3 = T3.getWidth(), T3 = T3.getHeight(), M3 = C3.width / C3.height, null == I3 && null != T3 ? I3 = T3 * M3 : null == T3 && null != I3 ? T3 = I3 / M3 : null == I3 && null == T3 && (I3 = C3.width, T3 = C3.height), d3.sWidth && d3.sHeight ? (h3 = d3.sx || 0, c3 = d3.sy || 0, k3.drawImage(C3, h3, c3, d3.sWidth, d3.sHeight, i3, D3, I3, T3)) : d3.sx && d3.sy ? (h3 = d3.sx, c3 = d3.sy, k3.drawImage(C3, h3, c3, I3 - h3, T3 - c3, i3, D3, I3, T3)) : k3.drawImage(C3, i3, D3, I3, T3));
            else if (e3.getTemporalDisplayables) {
              n3.lastDrawType !== mv && (l3 = true, n3.lastDrawType = mv);
              var U3, X3, L3 = t3, P3 = e3, O3 = n3, Y3 = P3.getDisplayables(), q3 = P3.getTemporalDisplayables(), R3 = (L3.save(), { prevElClipPaths: null, prevEl: null, allClipped: false, viewWidth: O3.viewWidth, viewHeight: O3.viewHeight, inHover: O3.inHover, beforeBrushParam: {} });
              for (U3 = P3.getCursor(), X3 = Y3.length; U3 < X3; U3++)
                (N3 = Y3[U3]).beforeBrush && N3.beforeBrush(O3.beforeBrushParam), N3.innerBeforeBrush(), xv(L3, N3, R3), N3.innerAfterBrush(), N3.afterBrush && N3.afterBrush(), R3.prevEl = N3;
              bv(L3, R3);
              for (var N3, Z3 = 0, j3 = q3.length; Z3 < j3; Z3++)
                (N3 = q3[Z3]).beforeBrush && N3.beforeBrush(O3.beforeBrushParam), N3.innerBeforeBrush(), xv(L3, N3, R3), N3.innerAfterBrush(), N3.afterBrush && N3.afterBrush(), R3.prevEl = N3;
              bv(L3, R3), P3.clearTemporalDisplayables(), P3.notClear = true, L3.restore();
            }
            e3.innerAfterBrush(), e3.afterBrush && (A3 && vv(t3, n3), e3.afterBrush()), (n3.prevEl = e3).__dirty = 0, e3.__isRendered = true;
          }
        } else
          e3.__dirty &= ~Hn, e3.__isRendered = false;
      }
      function bv(t3, e3) {
        vv(t3, e3), e3.prevElClipPaths && t3.restore();
      }
      var wv = new Vm(), Sv = new Ti(100), Mv = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
      function Tv(t3, e3) {
        if ("none" === t3)
          return null;
        var a3 = e3.getDevicePixelRatio(), s3 = e3.getZr(), l3 = "svg" === s3.painter.type, e3 = (t3.dirty && wv.delete(t3), wv.get(t3));
        if (e3)
          return e3;
        for (var n3, u3 = B(t3, { symbol: "rect", symbolSize: 1, symbolKeepAspect: true, color: "rgba(0, 0, 0, 0.2)", backgroundColor: null, dashArrayX: 5, dashArrayY: 5, rotation: 0, maxTileWidth: 512, maxTileHeight: 512 }), e3 = ("none" === u3.backgroundColor && (u3.backgroundColor = null), { repeat: "repeat" }), i3 = e3, r3 = [a3], o3 = true, h3 = 0; h3 < Mv.length; ++h3) {
          var c3 = u3[Mv[h3]];
          if (null != c3 && !G(c3) && !W(c3) && !U(c3) && "boolean" != typeof c3) {
            o3 = false;
            break;
          }
          r3.push(c3);
        }
        o3 && (n3 = r3.join(",") + (l3 ? "-svg" : ""), v3 = Sv.get(n3)) && (l3 ? i3.svgElement = v3 : i3.image = v3);
        var p3, d3 = function t4(e4) {
          if (!e4 || 0 === e4.length)
            return [[0, 0]];
          if (U(e4))
            return [[o4 = Math.ceil(e4), o4]];
          var n4 = true;
          for (var i4 = 0; i4 < e4.length; ++i4)
            if (!U(e4[i4])) {
              n4 = false;
              break;
            }
          if (n4)
            return t4([e4]);
          var r4 = [];
          for (i4 = 0; i4 < e4.length; ++i4) {
            var o4;
            U(e4[i4]) ? (o4 = Math.ceil(e4[i4]), r4.push([o4, o4])) : (o4 = E(e4[i4], function(t5) {
              return Math.ceil(t5);
            })).length % 2 == 1 ? r4.push(o4.concat(o4)) : r4.push(o4);
          }
          return r4;
        }(u3.dashArrayX), f3 = function(t4) {
          if (!t4 || "object" == typeof t4 && 0 === t4.length)
            return [0, 0];
          if (U(t4))
            return [e4 = Math.ceil(t4), e4];
          var e4 = E(t4, function(t5) {
            return Math.ceil(t5);
          });
          return t4.length % 2 ? e4.concat(e4) : e4;
        }(u3.dashArrayY), g3 = function t4(e4) {
          if (!e4 || 0 === e4.length)
            return [["rect"]];
          if (W(e4))
            return [[e4]];
          var n4 = true;
          for (var i4 = 0; i4 < e4.length; ++i4)
            if (!W(e4[i4])) {
              n4 = false;
              break;
            }
          if (n4)
            return t4([e4]);
          var r4 = [];
          for (i4 = 0; i4 < e4.length; ++i4)
            W(e4[i4]) ? r4.push([e4[i4]]) : r4.push(e4[i4]);
          return r4;
        }(u3.symbol), y3 = function(t4) {
          return E(t4, Iv);
        }(d3), m3 = Iv(f3), v3 = !l3 && $.createCanvas(), _3 = l3 && { tag: "g", attrs: {}, key: "dcl", children: [] }, x3 = function() {
          for (var t4 = 1, e4 = 0, n4 = y3.length; e4 < n4; ++e4)
            t4 = ka(t4, y3[e4]);
          for (var i4 = 1, e4 = 0, n4 = g3.length; e4 < n4; ++e4)
            i4 = ka(i4, g3[e4].length);
          t4 *= i4;
          var r4 = m3 * y3.length * g3.length;
          return { width: Math.max(1, Math.min(t4, u3.maxTileWidth)), height: Math.max(1, Math.min(r4, u3.maxTileHeight)) };
        }();
        v3 && (v3.width = x3.width * a3, v3.height = x3.height * a3, p3 = v3.getContext("2d")), p3 && (p3.clearRect(0, 0, v3.width, v3.height), u3.backgroundColor) && (p3.fillStyle = u3.backgroundColor, p3.fillRect(0, 0, v3.width, v3.height));
        for (var b3 = 0, w3 = 0; w3 < f3.length; ++w3)
          b3 += f3[w3];
        if (!(b3 <= 0))
          for (var S3 = -m3, M3 = 0, T3 = 0, I3 = 0; S3 < x3.height; ) {
            if (M3 % 2 == 0) {
              for (var C3 = T3 / 2 % g3.length, k3 = 0, D3 = 0, A3 = 0; k3 < 2 * x3.width; ) {
                for (var L3, P3, O3, R3, N3, z3 = 0, w3 = 0; w3 < d3[I3].length; ++w3)
                  z3 += d3[I3][w3];
                if (z3 <= 0)
                  break;
                D3 % 2 == 0 && (P3 = 0.5 * (1 - u3.symbolSize), L3 = k3 + d3[I3][D3] * P3, P3 = S3 + f3[M3] * P3, O3 = d3[I3][D3] * u3.symbolSize, R3 = f3[M3] * u3.symbolSize, N3 = A3 / 2 % g3[C3].length, function(t4, e4, n4, i4, r4) {
                  var o4 = l3 ? 1 : a3, r4 = jm(r4, t4 * o4, e4 * o4, n4 * o4, i4 * o4, u3.color, u3.symbolKeepAspect);
                  l3 ? (t4 = s3.painter.renderOneToVNode(r4)) && _3.children.push(t4) : _v(p3, r4);
                }(L3, P3, O3, R3, g3[C3][N3])), k3 += d3[I3][D3], ++A3, ++D3 === d3[I3].length && (D3 = 0);
              }
              ++I3 === d3.length && (I3 = 0);
            }
            S3 += f3[M3], ++T3, ++M3 === f3.length && (M3 = 0);
          }
        return o3 && Sv.put(n3, v3 || _3), i3.image = v3, i3.svgElement = _3, i3.svgWidth = x3.width, i3.svgHeight = x3.height, e3.rotation = u3.rotation, e3.scaleX = e3.scaleY = l3 ? 1 : 1 / a3, wv.set(t3, e3), t3.dirty = false, e3;
      }
      function Iv(t3) {
        for (var e3 = 0, n3 = 0; n3 < t3.length; ++n3)
          e3 += t3[n3];
        return t3.length % 2 == 1 ? 2 * e3 : e3;
      }
      Hm = us(function(e3, i3) {
        e3.eachRawSeries(function(t3) {
          var n3;
          !e3.isSeriesFiltered(t3) && ((n3 = t3.getData()).hasItemVisual() && n3.each(function(t4) {
            var e4 = n3.getItemVisual(t4, "decal");
            e4 && (n3.ensureUniqueItemVisual(t4, "style").decal = Tv(e4, i3));
          }), t3 = n3.getVisual("decal")) && (n3.getVisual("style").decal = Tv(t3, i3));
        });
      });
      var Wm = { PROCESSOR: { SERIES_FILTER: 800, AXIS_STATISTICS: 920, FILTER: 1e3, STATISTIC: 5e3, STATISTICS: 5e3 }, VISUAL: { LAYOUT: 1e3, PROGRESSIVE_LAYOUT: 1100, GLOBAL: 2e3, CHART: 3e3, POST_CHART_LAYOUT: 4600, COMPONENT: 4e3, BRUSH: 5e3, CHART_ITEM: 4500, ARIA: 6e3, DECAL: 7e3 } }, Cv = "__flagInMainProcess", kv = "__mainProcessVersion", Dv = "__pendingUpdate", Av = "__needsUpdateStatus", Lv = /^[a-zA-Z0-9_]+$/, Pv = "__connectUpdateStatus";
      function Ov(n3) {
        return function() {
          for (var t3 = [], e3 = 0; e3 < arguments.length; e3++)
            t3[e3] = arguments[e3];
          if (!this.isDisposed())
            return Nv(this, n3, t3);
          this.id;
        };
      }
      function Rv(n3) {
        return function() {
          for (var t3 = [], e3 = 0; e3 < arguments.length; e3++)
            t3[e3] = arguments[e3];
          return Nv(this, n3, t3);
        };
      }
      function Nv(t3, e3, n3) {
        return n3[0] = n3[0] && n3[0].toLowerCase(), ge.prototype[e3].apply(t3, n3);
      }
      u(Ev, zv = ge);
      var zv, Bv = Ev;
      function Ev() {
        return null !== zv && zv.apply(this, arguments) || this;
      }
      var Vv, Fv, Gv, Hv, Wv, Uv, Xv, Yv, qv, Zv, jv, Kv, $v, Qv, Jv, t_, e_, n_, i_, r_, Um = Bv.prototype, o_ = (Um.on = Rv("on"), Um.off = Rv("off"), u(c, r_ = ge), c.prototype._onframe = function() {
        if (!this._disposed) {
          var t3 = this._scheduler, e3 = this._model, n3 = this._api;
          if (n_(this), this[Dv]) {
            var i3 = this[Dv].silent;
            this[Cv] = true, i_(this);
            try {
              Vv(this), Hv.update.call(this, null, this[Dv].updateParams);
            } catch (t4) {
              throw this[Cv] = false, this[Dv] = null, t4;
            }
            this._zr.flush(), this[Cv] = false, this[Dv] = null, Yv.call(this, i3), qv.call(this, i3);
          } else if (t3.unfinished) {
            var r3 = 1;
            do {
              t3.unfinished = false;
              var o3 = $.getTime();
            } while (t3.performSeriesTasks(e3), t3.performDataProcessorTasks(e3), Uv(this, e3), t3.performVisualTasks(e3), Qv(this, this._model, n3, "remain", {}), 0 < (r3 -= $.getTime() - o3) && t3.unfinished);
            t3.unfinished || this._zr.flush();
          }
        }
      }, c.prototype.getDom = function() {
        return this._dom;
      }, c.prototype.getId = function() {
        return this.id;
      }, c.prototype.getZr = function() {
        return this._zr;
      }, c.prototype.isSSR = function() {
        return this._ssr;
      }, c.prototype.setOption = function(t3, e3, n3) {
        if (!this[Cv])
          if (this._disposed)
            this.id;
          else {
            X(e3) && (n3 = e3.lazyUpdate, i3 = e3.silent, r3 = e3.replaceMerge, o3 = e3.transition, e3 = e3.notMerge), this[Cv] = true, i_(this), this._model && !e3 || (e3 = new Hg(this._api), a3 = this._theme, (s3 = this._model = new zg()).scheduler = this._scheduler, s3.ssr = this._ssr, s3.init(null, null, null, a3, this._locale, e3)), this._model.setOption(t3, { replaceMerge: r3 }, y_);
            var i3, r3, o3, a3, s3 = { seriesTransition: o3, optionChanged: true };
            if (n3)
              this[Dv] = { silent: i3, updateParams: s3 }, this[Cv] = false, this.getZr().wakeUp();
            else {
              try {
                Vv(this), Hv.update.call(this, null, s3);
              } catch (t4) {
                throw this[Dv] = null, this[Cv] = false, t4;
              }
              this._ssr || this._zr.flush(), this[Dv] = null, this[Cv] = false, Yv.call(this, i3), qv.call(this, i3);
            }
          }
      }, c.prototype.setTheme = function(t3, e3) {
        if (!this[Cv])
          if (this._disposed)
            this.id;
          else {
            var n3 = this._model;
            if (n3) {
              var e3 = e3 && e3.silent, i3 = null;
              this[Dv] && (null == e3 && (e3 = this[Dv].silent), i3 = this[Dv].updateParams, this[Dv] = null), this[Cv] = true, i_(this);
              try {
                this._updateTheme(t3), n3.setTheme(this._theme), Vv(this), Hv.update.call(this, { type: "setTheme" }, i3);
              } catch (t4) {
                throw this[Cv] = false, t4;
              }
              this[Cv] = false, Yv.call(this, e3), qv.call(this, e3);
            }
          }
      }, c.prototype._updateTheme = function(t3) {
        (t3 = W(t3) ? v_[t3] : t3) && ((t3 = _(t3)) && ly(t3, true), this._theme = t3);
      }, c.prototype.getModel = function() {
        return this._model;
      }, c.prototype.getOption = function() {
        return this._model && this._model.getOption();
      }, c.prototype.getWidth = function() {
        return this._zr.getWidth();
      }, c.prototype.getHeight = function() {
        return this._zr.getHeight();
      }, c.prototype.getDevicePixelRatio = function() {
        return this._zr.painter.dpr || b.hasGlobalWindow && window.devicePixelRatio || 1;
      }, c.prototype.getRenderedCanvas = function(t3) {
        return this.renderToCanvas(t3);
      }, c.prototype.renderToCanvas = function(t3) {
        return this._zr.painter.getRenderedCanvas({ backgroundColor: (t3 = t3 || {}).backgroundColor || this._model.get("backgroundColor"), pixelRatio: t3.pixelRatio || this.getDevicePixelRatio() });
      }, c.prototype.renderToSVGString = function(t3) {
        return this._zr.painter.renderToString({ useViewBox: (t3 = t3 || {}).useViewBox });
      }, c.prototype.getSvgDataURL = function() {
        var t3 = this._zr;
        return F(t3.storage.getDisplayList(), function(t4) {
          t4.stopAnimation(null, true);
        }), t3.painter.toDataURL();
      }, c.prototype.getDataURL = function(t3) {
        var e3, n3, i3, r3;
        if (!this._disposed)
          return r3 = (t3 = t3 || {}).excludeComponents, e3 = this._model, n3 = [], i3 = this, F(r3, function(t4) {
            e3.eachComponent({ mainType: t4 }, function(t5) {
              t5 = i3._componentsMap[t5.__viewId];
              t5.group.ignore || (n3.push(t5), t5.group.ignore = true);
            });
          }), r3 = "svg" === this._zr.painter.getType() ? this.getSvgDataURL() : this.renderToCanvas(t3).toDataURL("image/" + (t3 && t3.type || "png")), F(n3, function(t4) {
            t4.group.ignore = false;
          }), r3;
        this.id;
      }, c.prototype.getConnectedDataURL = function(i3) {
        var r3, o3, a3, s3, l3, u3, h3, c3, p3, e3, t3, n3, d3, f3, g3;
        if (!this._disposed)
          return r3 = "svg" === i3.type, o3 = this.group, a3 = Math.min, s3 = Math.max, b_[o3] ? (u3 = l3 = 1 / 0, c3 = h3 = -1 / 0, p3 = [], e3 = i3 && i3.pixelRatio || this.getDevicePixelRatio(), F(x_, function(t4, e4) {
            var n4;
            t4.group === o3 && (n4 = r3 ? t4.getZr().painter.getSvgDom().innerHTML : t4.renderToCanvas(_(i3)), t4 = t4.getDom().getBoundingClientRect(), l3 = a3(t4.left, l3), u3 = a3(t4.top, u3), h3 = s3(t4.right, h3), c3 = s3(t4.bottom, c3), p3.push({ dom: n4, left: t4.left, top: t4.top }));
          }), t3 = (h3 *= e3) - (l3 *= e3), n3 = (c3 *= e3) - (u3 *= e3), d3 = $.createCanvas(), (f3 = Yo(d3, { renderer: r3 ? "svg" : "canvas" })).resize({ width: t3, height: n3 }), r3 ? (g3 = "", F(p3, function(t4) {
            var e4 = t4.left - l3, n4 = t4.top - u3;
            g3 += '<g transform="translate(' + e4 + "," + n4 + ')">' + t4.dom + "</g>";
          }), f3.painter.getSvgRoot().innerHTML = g3, i3.connectedBackgroundColor && f3.painter.setBackgroundColor(i3.connectedBackgroundColor), f3.refreshImmediately(), f3.painter.toDataURL()) : (i3.connectedBackgroundColor && f3.add(new uu({ shape: { x: 0, y: 0, width: t3, height: n3 }, style: { fill: i3.connectedBackgroundColor } })), F(p3, function(t4) {
            t4 = new eu({ style: { x: t4.left * e3 - l3, y: t4.top * e3 - u3, image: t4.dom } });
            f3.add(t4);
          }), f3.refreshImmediately(), d3.toDataURL("image/" + (i3 && i3.type || "png")))) : this.getDataURL(i3);
        this.id;
      }, c.prototype.convertToPixel = function(t3, e3, n3) {
        return Wv(this, "convertToPixel", t3, e3, n3);
      }, c.prototype.convertToLayout = function(t3, e3, n3) {
        return Wv(this, "convertToLayout", t3, e3, n3);
      }, c.prototype.convertFromPixel = function(t3, e3, n3) {
        return Wv(this, "convertFromPixel", t3, e3, n3);
      }, c.prototype.containPixel = function(t3, i3) {
        var r3;
        if (!this._disposed)
          return F(Xa(this._model, t3), function(t4, n3) {
            0 <= n3.indexOf("Models") && F(t4, function(t5) {
              var e3 = t5.coordinateSystem;
              e3 && e3.containPoint ? r3 = r3 || !!e3.containPoint(i3) : "seriesModels" === n3 && (e3 = this._chartsMap[t5.__viewId]) && e3.containPoint && (r3 = r3 || e3.containPoint(i3, t5));
            }, this);
          }, this), !!r3;
        this.id;
      }, c.prototype.getVisual = function(t3, e3) {
        var t3 = Xa(this._model, t3, { defaultMainType: "series" }), n3 = t3.seriesModel.getData(), t3 = t3.hasOwnProperty("dataIndexInside") ? t3.dataIndexInside : t3.hasOwnProperty("dataIndex") ? n3.indexOfRawIndex(t3.dataIndex) : null;
        if (null != t3) {
          var i3 = n3, r3 = t3, o3 = e3;
          switch (o3) {
            case "color":
              return i3.getItemVisual(r3, "style")[i3.getVisual("drawType")];
            case "opacity":
              return i3.getItemVisual(r3, "style").opacity;
            case "symbol":
            case "symbolSize":
            case "liftZ":
              return i3.getItemVisual(r3, o3);
          }
        } else {
          var a3 = n3, s3 = e3;
          switch (s3) {
            case "color":
              return a3.getVisual("style")[a3.getVisual("drawType")];
            case "opacity":
              return a3.getVisual("style").opacity;
            case "symbol":
            case "symbolSize":
            case "liftZ":
              return a3.getVisual(s3);
          }
        }
      }, c.prototype.getViewOfComponentModel = function(t3) {
        return this._componentsMap[t3.__viewId];
      }, c.prototype.getViewOfSeriesModel = function(t3) {
        return this._chartsMap[t3.__viewId];
      }, c.prototype._initEvents = function() {
        var n3, i3, s3 = this, r3 = (F(c_, function(a3) {
          function t3(t4) {
            var n4, e3, i4, r4 = s3.getModel(), o3 = t4.target;
            "globalout" === a3 ? n4 = {} : o3 && Pm(o3, function(t5) {
              var e4, t5 = j(t5);
              return t5 && null != t5.dataIndex ? (e4 = t5.dataModel || r4.getSeriesByIndex(t5.seriesIndex), n4 = e4 && e4.getDataParams(t5.dataIndex, t5.dataType, o3) || {}, 1) : t5.eventData && (n4 = V({}, t5.eventData), 1);
            }, true), n4 && (e3 = n4.componentType, i4 = n4.componentIndex, "markLine" !== e3 && "markPoint" !== e3 && "markArea" !== e3 || (e3 = "series", i4 = n4.seriesIndex), i4 = (e3 = e3 && null != i4 && r4.getComponent(e3, i4)) && s3["series" === e3.mainType ? "_chartsMap" : "_componentsMap"][e3.__viewId], n4.event = t4, n4.type = a3, s3._$eventProcessor.eventInfo = { targetEl: o3, packedEvent: n4, model: e3, view: i4 }, s3.trigger(a3, n4));
          }
          t3.zrEventfulCallAtLast = true, s3._zr.on(a3, t3, s3);
        }), this._messageCenter);
        F(f_, function(t3, e3) {
          r3.on(e3, function(t4) {
            s3.trigger(e3, t4);
          });
        }), i3 = (n3 = this)._api, r3.on("selectchanged", function(t3) {
          var e3 = i3.getModel();
          t3.isFromClick ? (Lm("map", "selectchanged", n3, e3, t3), Lm("pie", "selectchanged", n3, e3, t3)) : "select" === t3.fromAction ? (Lm("map", "selected", n3, e3, t3), Lm("pie", "selected", n3, e3, t3)) : "unselect" === t3.fromAction && (Lm("map", "unselected", n3, e3, t3), Lm("pie", "unselected", n3, e3, t3));
        });
      }, c.prototype.isDisposed = function() {
        return this._disposed;
      }, c.prototype.clear = function() {
        this._disposed ? this.id : this.setOption({ series: [] }, true);
      }, c.prototype.dispose = function() {
        var t3, e3, n3;
        this._disposed ? this.id : (this._disposed = true, this.getDom() && ja(this.getDom(), M_, ""), e3 = (t3 = this)._api, n3 = t3._model, F(t3._componentsViews, function(t4) {
          t4.dispose(n3, e3);
        }), F(t3._chartsViews, function(t4) {
          t4.dispose(n3, e3);
        }), t3._zr.dispose(), t3._dom = t3._model = t3._chartsMap = t3._componentsMap = t3._chartsViews = t3._componentsViews = t3._scheduler = t3._api = t3._zr = t3._throttledZrFlush = t3._theme = t3._coordSysMgr = t3._messageCenter = null, delete x_[t3.id]);
      }, c.prototype.resize = function(t3) {
        if (!this[Cv])
          if (this._disposed)
            this.id;
          else {
            this._zr.resize(t3);
            var e3 = this._model;
            if (this._loadingFX && this._loadingFX.resize(), e3) {
              var e3 = e3.resetOption("media"), n3 = t3 && t3.silent;
              this[Dv] && (null == n3 && (n3 = this[Dv].silent), e3 = true, this[Dv] = null), this[Cv] = true, i_(this);
              try {
                e3 && Vv(this), Hv.update.call(this, { type: "resize", animation: V({ duration: 0 }, t3 && t3.animation) });
              } catch (t4) {
                throw this[Cv] = false, t4;
              }
              this[Cv] = false, Yv.call(this, n3), qv.call(this, n3);
            }
          }
      }, c.prototype.showLoading = function(t3, e3) {
        this._disposed ? this.id : (X(t3) && (e3 = t3, t3 = ""), t3 = t3 || "default", this.hideLoading(), __[t3] && (t3 = __[t3](this._api, e3), e3 = this._zr, this._loadingFX = t3, e3.add(t3)));
      }, c.prototype.hideLoading = function() {
        this._disposed ? this.id : (this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null);
      }, c.prototype.makeActionFromEvent = function(t3) {
        var e3 = V({}, t3);
        return e3.type = d_[t3.type], e3;
      }, c.prototype.dispatchAction = function(t3, e3) {
        var n3;
        this._disposed ? this.id : (X(e3) || (e3 = { silent: !!e3 }), p_[t3.type] && this._model && (this[Cv] ? this._pendingActions.push(t3) : (n3 = e3.silent, Xv.call(this, t3, n3), (t3 = e3.flush) ? this._zr.flush() : false !== t3 && b.browser.weChat && this._throttledZrFlush(), Yv.call(this, n3), qv.call(this, n3))));
      }, c.prototype.updateLabelLayout = function() {
        Om.trigger("series:layoutlabels", this._model, this._api, { updatedSeries: [] });
      }, c.prototype.appendData = function(t3) {
        var e3;
        this._disposed ? this.id : (e3 = t3.seriesIndex, this.getModel().getSeriesByIndex(e3).appendData(t3), this._scheduler.unfinished = true, this.getZr().wakeUp());
      }, c.internalField = (Vv = function(t3) {
        e3 = t3._model, Nm(e3).prepare = {};
        var e3 = t3._scheduler;
        e3.restorePipelines(t3._zr, t3._model), e3.prepareStageTasks(), Fv(t3, true), Fv(t3, false), e3.plan();
      }, Fv = function(t3, r3) {
        for (var o3 = t3._model, a3 = t3._scheduler, s3 = r3 ? t3._componentsViews : t3._chartsViews, l3 = r3 ? t3._componentsMap : t3._chartsMap, u3 = t3._zr, h3 = t3._api, e3 = 0; e3 < s3.length; e3++)
          s3[e3].__alive = false;
        function n3(t4) {
          var e4, n4 = t4.__requireNewView, i4 = (t4.__requireNewView = false, "_ec_" + t4.id + "_" + t4.type), n4 = !n4 && l3[i4];
          n4 || (e4 = ds(t4.type), (n4 = new (r3 ? U0.getClass(e4.main, e4.sub) : j0.getClass(e4.sub))()).init(o3, h3), l3[i4] = n4, s3.push(n4), u3.add(n4.group)), t4.__viewId = n4.__id = i4, n4.__alive = true, n4.__model = t4, n4.group.__ecComponentInfo = { mainType: t4.mainType, index: t4.componentIndex }, r3 || a3.prepareView(n4, t4, o3, h3);
        }
        r3 ? o3.eachComponent(function(t4, e4) {
          "series" !== t4 && n3(e4);
        }) : o3.eachSeries(n3);
        for (e3 = 0; e3 < s3.length; ) {
          var i3 = s3[e3];
          i3.__alive ? e3++ : (r3 || i3.renderTask.dispose(), u3.remove(i3.group), i3.dispose(o3, h3), s3.splice(e3, 1), l3[i3.__id] === i3 && delete l3[i3.__id], i3.__id = i3.group.__ecComponentInfo = null);
        }
      }, Gv = function(c3, e3, p3, n3, t3) {
        var i3, r3, o3, d3, a3 = c3._model;
        function s3(t4) {
          t4 && t4.__alive && t4[e3] && t4[e3](t4.__model, a3, c3._api, p3);
        }
        a3.setUpdatePayload(p3), n3 ? (t3 = t3, (o3 = {})[(r3 = n3) + "Id"] = (i3 = p3)[r3 + "Id"], o3[r3 + "Index"] = i3[r3 + "Index"], o3[r3 + "Name"] = i3[r3 + "Name"], i3 = { mainType: r3, query: o3 }, t3 && (i3.subType = t3), r3 = i3, null != (o3 = p3.excludeSeriesId) && (d3 = I(), F(Pa(o3), function(t4) {
          t4 = Va(t4, null);
          null != t4 && d3.set(t4, true);
        })), a3 && a3.eachComponent(r3, function(t4) {
          var e4, n4, i4 = d3 && null != d3.get(t4.id);
          if (!i4)
            if (Eh(p3))
              if (t4 instanceof z0) {
                if (p3.type === Ku && !p3.notBlur && !t4.get(["emphasis", "disabled"])) {
                  var i4 = t4, r4 = p3, o4 = c3._api, a4 = i4.seriesIndex, s4 = i4.getData(r4.dataType);
                  if (s4) {
                    var r4 = (G(r4 = Wa(s4, r4)) ? r4[0] : r4) || 0, l3 = s4.getItemGraphicEl(r4);
                    if (!l3)
                      for (var u3 = s4.count(), h3 = 0; !l3 && h3 < u3; )
                        l3 = s4.getItemGraphicEl(h3++);
                    l3 ? Th(a4, (r4 = j(l3)).focus, r4.blurScope, o4) : (r4 = i4.get(["emphasis", "focus"]), i4 = i4.get(["emphasis", "blurScope"]), null != r4 && Th(a4, r4, i4, o4));
                  }
                }
              } else {
                a4 = Ch(t4.mainType, t4.componentIndex, p3.name, c3._api), r4 = a4.focusSelf, i4 = a4.dispatchers;
                p3.type === Ku && r4 && !p3.notBlur && Ih(t4.mainType, t4.componentIndex, c3._api), i4 && F(i4, function(t5) {
                  (p3.type === Ku ? vh : _h)(t5);
                });
              }
            else
              Bh(p3) && t4 instanceof z0 && (o4 = t4, i4 = p3, c3._api, Bh(i4) && (e4 = i4.dataType, G(n4 = Wa(o4.getData(e4), i4)) || (n4 = [n4]), o4[i4.type === th ? "toggleSelect" : i4.type === Qu ? "select" : "unselect"](n4, e4)), kh(t4), e_(c3));
        }, c3), a3 && a3.eachComponent(r3, function(t4) {
          d3 && null != d3.get(t4.id) || s3(c3["series" === n3 ? "_chartsMap" : "_componentsMap"][t4.__viewId]);
        }, c3)) : F([].concat(c3._componentsViews).concat(c3._chartsViews), s3);
      }, Hv = { prepareAndUpdate: function(t3) {
        Vv(this), Hv.update.call(this, t3, t3 && { optionChanged: null != t3.newOption });
      }, update: function(t3, e3) {
        var n3 = this._model, i3 = this._api, r3 = this._zr, o3 = this._coordSysMgr, a3 = this._scheduler;
        n3 && (Nm(n3).fullUpdate = {}, n3.setUpdatePayload(t3), a3.restoreData(n3, t3), a3.performSeriesTasks(n3), o3.create(n3, i3), Om.trigger("coordsys:aftercreate", n3, i3), a3.performDataProcessorTasks(n3, t3), Uv(this, n3), o3.update(n3, i3), a_(n3), a3.performVisualTasks(n3, t3), o3 = n3.get("backgroundColor") || "transparent", r3.setBackgroundColor(o3), null != (a3 = n3.get("darkMode")) && "auto" !== a3 && r3.setDarkMode(a3), Kv(this, n3, i3, t3, e3), Om.trigger("afterupdate", n3, i3));
      }, updateTransform: function(i3) {
        var n3, r3, o3 = this, a3 = o3._model, s3 = o3._api;
        a3 && (a3.setUpdatePayload(i3), n3 = [], a3.eachComponent(function(t3, e3) {
          t3 !== Au && (t3 = o3.getViewOfComponentModel(e3)) && t3.__alive && (!t3.updateTransform || (e3 = t3.updateTransform(e3, a3, s3, i3)) && e3.update) && n3.push(t3);
        }), r3 = I(), a3.eachSeries(function(t3) {
          var e3 = o3._chartsMap[t3.__viewId], n4 = t3.pipelineContext;
          (!e3.updateTransform || n4.progressiveRender || (n4 = e3.updateTransform(t3, a3, s3, i3)) && n4.update) && r3.set(t3.uid, 1);
        }), o3._scheduler.performVisualTasks(a3, i3, { setDirty: true, dirtyMap: r3 }), Qv(o3, a3, s3, i3, {}, r3), Om.trigger("afterupdate", a3, s3));
      }, updateView: function(t3) {
        var e3 = this._model;
        e3 && (e3.setUpdatePayload(t3), j0.markUpdateMethod(t3, "updateView"), a_(e3), this._scheduler.performVisualTasks(e3, t3, { setDirty: true }), Kv(this, e3, this._api, t3, {}), Om.trigger("afterupdate", e3, this._api));
      }, updateVisual: function(n3) {
        var i3 = this, r3 = this._model;
        r3 && (r3.setUpdatePayload(n3), r3.eachSeries(function(t3) {
          t3.getData().clearAllVisual();
        }), j0.markUpdateMethod(n3, "updateVisual"), a_(r3), this._scheduler.performVisualTasks(r3, n3, { visualType: "visual", setDirty: true }), r3.eachComponent(function(t3, e3) {
          "series" !== t3 && (t3 = i3.getViewOfComponentModel(e3)) && t3.__alive && t3.updateVisual(e3, r3, i3._api, n3);
        }), r3.eachSeries(function(t3) {
          i3._chartsMap[t3.__viewId].updateVisual(t3, r3, i3._api, n3);
        }), Om.trigger("afterupdate", r3, this._api));
      }, updateLayout: function(t3) {
        Hv.update.call(this, t3);
      } }, Wv = function(t3, e3, n3, i3, r3) {
        if (t3._disposed)
          t3.id;
        else
          for (var o3 = t3._model, a3 = t3._coordSysMgr.getCoordinateSystems(), s3 = Xa(o3, n3), l3 = 0; l3 < a3.length; l3++) {
            var u3 = a3[l3];
            if (u3[e3] && null != (u3 = u3[e3](o3, s3, i3, r3)))
              return u3;
          }
      }, Uv = function(t3, e3) {
        var n3 = t3._chartsMap, i3 = t3._scheduler;
        e3.eachSeries(function(t4) {
          i3.updateStreamModes(t4, n3[t4.__viewId]);
        });
      }, Xv = function(i3, t3) {
        var r3, o3 = this, a3 = this.getModel(), e3 = i3.type, n3 = i3.escapeConnect, s3 = p_[e3], e3 = (s3.update || "update").split(":"), l3 = e3.pop(), u3 = null != e3[0] && ds(e3[0]), e3 = (this[Cv] = true, i_(this), [i3]), h3 = false, c3 = (i3.batch && (h3 = true, e3 = E(i3.batch, function(t4) {
          return (t4 = B(V({}, t4), i3)).batch = null, t4;
        })), []), p3 = [], d3 = s3.nonRefinedEventType, f3 = Bh(i3), g3 = Eh(i3);
        if (g3 && Mh(this._api), F(e3, function(t4) {
          var e4, n4 = s3.action(t4, a3, o3._api);
          s3.refineEvent ? p3.push(n4) : r3 = n4, (r3 = r3 || V({}, t4)).type = d3, c3.push(r3), g3 ? (e4 = (n4 = Ya(i3)).queryOptionMap, n4 = n4.mainTypeSpecified ? e4.keys()[0] : "series", Gv(o3, l3, t4, n4), e_(o3)) : f3 ? (Gv(o3, l3, t4, "series"), e_(o3)) : u3 && Gv(o3, l3, t4, u3.main, u3.sub);
        }), "none" !== l3 && !g3 && !f3 && !u3)
          try {
            this[Dv] ? (Vv(this), Hv.update.call(this, i3), this[Dv] = null) : Hv[l3].call(this, i3);
          } catch (t4) {
            throw this[Cv] = false, t4;
          }
        r3 = h3 ? { type: d3, escapeConnect: n3, batch: c3 } : c3[0], this[Cv] = false, t3 || (e3 = void 0, s3.refineEvent && (Dt(X(h3 = s3.refineEvent(p3, i3, a3, this._api).eventContent)), (e3 = B({ type: s3.refinedEventType }, h3)).fromAction = i3.type, e3.fromActionPayload = i3, e3.escapeConnect = true), (n3 = this._messageCenter).trigger(r3.type, r3), e3 && n3.trigger(e3.type, e3));
      }, Yv = function(t3) {
        for (var e3 = this._pendingActions; e3.length; ) {
          var n3 = e3.shift();
          Xv.call(this, n3, t3);
        }
      }, qv = function(t3) {
        t3 || this.trigger("updated");
      }, Zv = function(e3, n3) {
        e3.on("rendered", function(t3) {
          n3.trigger("rendered", t3), !e3.animation.isFinished() || n3[Dv] || n3._scheduler.unfinished || n3._pendingActions.length ? e3.refresh() : n3.trigger("finished");
        });
      }, jv = function(t3, a3) {
        t3.on("mouseover", function(t4) {
          var e3, n3, i3, r3, o3 = Pm(t4.target, zh);
          o3 && (o3 = o3, e3 = t4, t4 = a3._api, n3 = j(o3), i3 = (r3 = Ch(n3.componentMainType, n3.componentIndex, n3.componentHighDownName, t4)).dispatchers, r3 = r3.focusSelf, i3 ? (r3 && Ih(n3.componentMainType, n3.componentIndex, t4), F(i3, function(t5) {
            return yh(t5, e3);
          })) : (Th(n3.seriesIndex, n3.focus, n3.blurScope, t4), "self" === n3.focus && Ih(n3.componentMainType, n3.componentIndex, t4), yh(o3, e3)), e_(a3));
        }).on("mouseout", function(t4) {
          var e3, n3, i3 = Pm(t4.target, zh);
          i3 && (i3 = i3, e3 = t4, Mh(t4 = a3._api), (n3 = Ch((n3 = j(i3)).componentMainType, n3.componentIndex, n3.componentHighDownName, t4).dispatchers) ? F(n3, function(t5) {
            return mh(t5, e3);
          }) : mh(i3, e3), e_(a3));
        }).on("click", function(t4) {
          var e3, t4 = Pm(t4.target, function(t5) {
            return null != j(t5).dataIndex;
          }, true);
          t4 && (e3 = t4.selected ? "unselect" : "select", t4 = j(t4), a3._api.dispatchAction({ type: e3, dataType: t4.dataType, dataIndexInside: t4.dataIndex, seriesIndex: t4.seriesIndex, isFromClick: true }));
        });
      }, Kv = function(t3, e3, n3, i3, r3) {
        var o3, a3, s3, l3, u3, h3, c3;
        u3 = [], c3 = !(h3 = []), (o3 = e3).eachComponent(function(t4, e4) {
          var n4 = e4.get("zlevel") || 0, i4 = e4.get("z") || 0, r4 = e4.getZLevelKey();
          c3 = c3 || !!r4, ("series" === t4 ? h3 : u3).push({ zlevel: n4, z: i4, idx: e4.componentIndex, type: t4, key: r4 });
        }), c3 && (Gn(a3 = u3.concat(h3), function(t4, e4) {
          return t4.zlevel === e4.zlevel ? t4.z - e4.z : t4.zlevel - e4.zlevel;
        }), F(a3, function(t4) {
          var e4 = o3.getComponent(t4.type, t4.idx), n4 = t4.zlevel, t4 = t4.key;
          null != s3 && (n4 = Math.max(s3, n4)), t4 ? (n4 === s3 && t4 !== l3 && n4++, l3 = t4) : l3 && (n4 === s3 && n4++, l3 = ""), s3 = n4, e4.setZLevel(n4);
        })), $v(t3, e3, n3, i3, r3), F(t3._chartsViews, function(t4) {
          t4.__alive = false;
        }), Qv(t3, e3, n3, i3, r3), F(t3._chartsViews, function(t4) {
          t4.__alive || t4.remove(e3, n3);
        });
      }, $v = function(t3, n3, i3, r3, e3, o3) {
        F(o3 || t3._componentsViews, function(t4) {
          var e4 = t4.__model;
          u_(0, t4), t4.render(e4, n3, i3, r3), l_(e4, t4), h_(e4, t4);
        });
      }, Qv = function(r3, t3, e3, o3, n3, a3) {
        var i3, s3, l3, u3, h3, c3 = r3._scheduler, p3 = (n3 = V(n3 || {}, { updatedSeries: t3.getSeries() }), Om.trigger("series:beforeupdate", t3, e3, n3), false);
        t3.eachSeries(function(t4) {
          var e4, n4 = r3._chartsMap[t4.__viewId], i4 = (n4.__alive = true, n4.renderTask);
          c3.updatePayload(i4, o3), u_(0, n4), a3 && a3.get(t4.uid) && i4.dirty(), i4.perform(c3.getPerformArgs(i4)) && (p3 = true), n4.group.silent = !!t4.get("silent"), i4 = n4, e4 = t4.get("blendMode") || null, i4.eachRendered(function(t5) {
            t5.isGroup || (t5.style.blend = e4);
          }), kh(t4);
        }), c3.unfinished = p3 || c3.unfinished, Om.trigger("series:layoutlabels", t3, e3, n3), Om.trigger("series:transition", t3, e3, n3), t3.eachSeries(function(t4) {
          var e4 = r3._chartsMap[t4.__viewId];
          l_(t4, e4), h_(t4, e4);
        }), s3 = t3, "canvas" === (h3 = (i3 = r3)._zr).painter.type && (h3 = h3.storage, l3 = 0, h3.traverse(function(t4) {
          t4.isGroup || l3++;
        }), u3 = l3 > Y(s3.get("hoverLayerThreshold"), mg.hoverLayerThreshold) && !b.node && !b.worker, i3._usingTHL || u3) && (s3.eachSeries(function(t4) {
          t4.preventUsingHoverLayer || (t4 = i3._chartsMap[t4.__viewId]).__alive && t4.eachRendered(function(t5) {
            t5 = t5.states.emphasis;
            t5 && t5.hoverLayer !== Gp && (t5.hoverLayer = u3 ? Fp : Vp);
          });
        }), i3._usingTHL = u3), Om.trigger("series:afterupdate", t3, e3, n3);
      }, e_ = function(t3) {
        t3[Av] = true, t3.getZr().wakeUp();
      }, i_ = function(t3) {
        t3[kv] = (t3[kv] + 1) % 1e6;
      }, n_ = function(t3) {
        t3[Av] && (t3.getZr().storage.traverse(function(t4) {
          Lp(t4) || s_(t4);
        }), t3[Av] = false);
      }, Jv = function(n3) {
        return u(t3, e3 = Du), t3.prototype.getCoordinateSystems = function() {
          return n3._coordSysMgr.getCoordinateSystems();
        }, t3.prototype.getComponentByElement = function(t4) {
          for (; t4; ) {
            var e4 = t4.__ecComponentInfo;
            if (null != e4)
              return n3._model.getComponent(e4.mainType, e4.index);
            t4 = t4.parent;
          }
        }, t3.prototype.enterEmphasis = function(t4, e4) {
          vh(t4, e4), e_(n3);
        }, t3.prototype.leaveEmphasis = function(t4, e4) {
          _h(t4, e4), e_(n3);
        }, t3.prototype.enterBlur = function(t4) {
          ch(t4, ah), e_(n3);
        }, t3.prototype.leaveBlur = function(t4) {
          xh(t4), e_(n3);
        }, t3.prototype.enterSelect = function(t4) {
          bh(t4), e_(n3);
        }, t3.prototype.leaveSelect = function(t4) {
          wh(t4), e_(n3);
        }, t3.prototype.getModel = function() {
          return n3.getModel();
        }, t3.prototype.getViewOfComponentModel = function(t4) {
          return n3.getViewOfComponentModel(t4);
        }, t3.prototype.getViewOfSeriesModel = function(t4) {
          return n3.getViewOfSeriesModel(t4);
        }, t3.prototype.getECUpdateCycleVersion = function() {
          return n3[kv];
        }, t3.prototype.usingTHL = function() {
          return n3._usingTHL;
        }, new t3(n3);
        function t3() {
          return null !== e3 && e3.apply(this, arguments) || this;
        }
        var e3;
      }, void (t_ = function(i3) {
        function r3(t3, e3) {
          for (var n3 = 0; n3 < t3.length; n3++)
            t3[n3][Pv] = e3;
        }
        F(d_, function(t3, e3) {
          i3._messageCenter.on(e3, function(t4) {
            var e4, n3;
            !b_[i3.group] || 0 === i3[Pv] || t4 && t4.escapeConnect || (e4 = i3.makeActionFromEvent(t4), n3 = [], F(x_, function(t5) {
              t5 !== i3 && t5.group === i3.group && n3.push(t5);
            }), r3(n3, 0), F(n3, function(t5) {
              1 !== t5[Pv] && t5.dispatchAction(e4);
            }), r3(n3, 2));
          });
        });
      })), c);
      function c(t3, e3, n3) {
        var i3 = r_.call(this, new Im()) || this, t3 = (i3._chartsViews = [], i3._chartsMap = {}, i3._componentsViews = [], i3._componentsMap = {}, i3._pendingActions = [], n3 = n3 || {}, i3.__v_skip = true, i3._dom = t3, i3[kv] = 1, n3.ssr && jo(function(t4) {
          var e4, t4 = j(t4), n4 = t4.dataIndex;
          if (null != n4)
            return (e4 = I()).set("series_index", t4.seriesIndex), e4.set("data_index", n4), t4.ssrType && e4.set("ssr_type", t4.ssrType), e4;
        }), i3._zr = Yo(t3, { renderer: n3.renderer || "canvas", devicePixelRatio: n3.devicePixelRatio, width: n3.width, height: n3.height, ssr: n3.ssr, useDirtyRect: Y(n3.useDirtyRect, false), useCoarsePointer: Y(n3.useCoarsePointer, "auto"), pointerSize: n3.pointerSize })), n3 = (i3._ssr = n3.ssr, i3._throttledZrFlush = nm(y(t3.flush, t3), 17), i3._updateTheme(e3), i3._locale = W(e3 = n3.locale || qd) ? (n3 = Xd[e3.toUpperCase()] || {}, e3 === Hd || e3 === Wd ? _(n3) : d(_(n3), _(Xd[Ud]), false)) : d(_(e3), _(Xd[Ud]), false), i3._coordSysMgr = new Ef(), i3._api = Jv(i3));
        function r3(t4, e4) {
          return t4.__prio - e4.__prio;
        }
        return Gn(m_, r3), Gn(g_, r3), i3._scheduler = new hm(i3, n3, g_, m_), i3._messageCenter = new Bv(), i3._initEvents(), i3.resize = y(i3.resize, i3), t3.animation.on("frame", i3._onframe, i3), Zv(t3, i3), jv(t3, i3), Pt(i3), i3;
      }
      function a_(t3) {
        t3.clearColorPalette(), t3.eachSeries(function(t4) {
          t4.clearColorPalette();
        });
      }
      function s_(t3) {
        for (var e3 = [], n3 = t3.currentStates, i3 = 0; i3 < n3.length; i3++) {
          var r3 = n3[i3];
          "emphasis" !== r3 && "blur" !== r3 && "select" !== r3 && e3.push(r3);
        }
        t3.selected && t3.states.select && e3.push("select"), t3.hoverState === qu && t3.states.emphasis ? e3.push("emphasis") : t3.hoverState === Yu && t3.states.blur && e3.push("blur"), t3.useStates(e3);
      }
      function l_(t3, e3) {
        var n3;
        t3.preventAutoZ || (n3 = sd(t3), e3.eachRendered(function(t4) {
          return ld(t4, n3.z, n3.zlevel), true;
        }));
      }
      function u_(t3, e3) {
        e3.eachRendered(function(t4) {
          var e4, n3;
          Lp(t4) || (e4 = t4.getTextContent(), n3 = t4.getTextGuideLine(), t4.stateTransition && (t4.stateTransition = null), e4 && e4.stateTransition && (e4.stateTransition = null), n3 && n3.stateTransition && (n3.stateTransition = null), t4.hasState() ? (t4.prevStates = t4.currentStates, t4.clearStates()) : t4.prevStates && (t4.prevStates = null));
        });
      }
      function h_(t3, e3) {
        var n3 = t3.getModel("stateAnimation"), r3 = t3.isAnimationEnabled(), t3 = n3.get("duration"), o3 = 0 < t3 ? { duration: t3, delay: n3.get("delay"), easing: n3.get("easing") } : null;
        e3.eachRendered(function(t4) {
          var e4, n4, i3;
          t4.states && t4.states.emphasis && (Lp(t4) || (t4 instanceof ql && ((i3 = Wu(n4 = t4)).normalFill = n4.style.fill, i3.normalStroke = n4.style.stroke, n4 = n4.states.select || {}, i3.selectFill = n4.style && n4.style.fill || null, i3.selectStroke = n4.style && n4.style.stroke || null), t4.__dirty && (i3 = t4.prevStates) && t4.useStates(i3), r3 && (t4.stateTransition = o3, n4 = t4.getTextContent(), e4 = t4.getTextGuideLine(), n4 && (n4.stateTransition = o3), e4) && (e4.stateTransition = o3), t4.__dirty && s_(t4)));
        });
      }
      var Gm = o_.prototype, c_ = (Gm.on = Ov("on"), Gm.off = Ov("off"), Gm.one = function(i3, r3, t3) {
        var o3 = this;
        this.on.call(this, i3, function t4() {
          for (var e3 = [], n3 = 0; n3 < arguments.length; n3++)
            e3[n3] = arguments[n3];
          r3 && r3.apply && r3.apply(this, e3), o3.off(i3, t4);
        }, t3);
      }, ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"]);
      var p_ = {}, d_ = {}, f_ = {}, g_ = [], y_ = [], m_ = [], v_ = {}, __ = {}, x_ = {}, b_ = {}, w_ = +/* @__PURE__ */ new Date(), S_ = +/* @__PURE__ */ new Date(), M_ = "_echarts_instance_";
      function T_(t3) {
        b_[t3] = false;
      }
      Vm = T_;
      function I_(t3) {
        return x_[e3 = M_, (t3 = t3).getAttribute ? t3.getAttribute(e3) : t3[e3]];
        var e3;
      }
      function C_(t3, e3) {
        v_[t3] = e3;
      }
      function k_(t3) {
        L(y_, t3) < 0 && y_.push(t3);
      }
      function D_(t3, e3) {
        E_(g_, t3, e3, 2e3);
      }
      function A_(t3) {
        P_("afterinit", t3);
      }
      function L_(t3) {
        P_("afterupdate", t3);
      }
      function P_(t3, e3) {
        Om.on(t3, e3);
      }
      function O_(t3, e3, n3) {
        var i3, r3, o3, a3;
        function s3(t4) {
          return t4.toLowerCase();
        }
        H(e3) && (n3 = e3, e3 = ""), X(t3) ? (i3 = t3.type, l3 = t3.event, o3 = t3.update, a3 = t3.publishNonRefinedEvent, n3 = n3 || t3.action, r3 = t3.refineEvent) : (i3 = t3, l3 = e3);
        var l3 = s3(l3 || i3), t3 = r3 ? s3(i3) : l3;
        p_[i3] || (Dt(Lv.test(i3) && Lv.test(l3)), r3 && Dt(l3 !== i3), p_[i3] = { actionType: i3, refinedEventType: l3, nonRefinedEventType: t3, update: o3, action: n3, refineEvent: r3 }, f_[l3] = 1, r3 && a3 && (f_[t3] = 1), d_[t3] = i3);
      }
      function R_(t3, e3) {
        Ef.register(t3, e3);
      }
      function N_(t3, e3) {
        E_(m_, t3, e3, 1e3, "layout");
      }
      function z_(t3, e3) {
        E_(m_, t3, e3, 3e3, "visual");
      }
      var B_ = [];
      function E_(t3, e3, n3, i3, r3) {
        (H(e3) || X(e3)) && (n3 = e3, e3 = i3), 0 <= L(B_, n3) || (B_.push(n3), (i3 = hm.wrapStageHandler(n3, r3)).__prio = e3, i3.__raw = n3, t3.push(i3));
      }
      function V_(t3, e3) {
        __[t3] = e3;
      }
      function F_(t3, e3, n3) {
        var i3 = Rm.registerMap;
        i3 && i3(t3, e3, n3);
      }
      function G_(t3) {
        var e3 = (t3 = _(t3)).type, n3 = (e3 || f(""), e3.split(":")), i3 = (2 !== n3.length && f(""), false);
        "echarts" === n3[0] && (e3 = n3[1], i3 = true), t3.__isBuiltIn = i3, f0.set(e3, t3);
      }
      function H_(t3, e3, n3, i3) {
        return { eventContent: { selected: (r3 = [], n3.eachSeries(function(n4) {
          F(n4.getAllData(), function(t4) {
            t4.data;
            var t4 = t4.type, e4 = n4.getSelectedDataIndices();
            0 < e4.length && (e4 = { dataIndex: e4, seriesIndex: n4.seriesIndex }, null != t4 && (e4.dataType = t4), r3.push(e4));
          });
        }), r3), isFromClick: e3.isFromClick || false } };
        var r3;
      }
      z_(2e3, Rd), z_(4500, Id), z_(4500, ws), z_(2e3, Pd), z_(4500, kd), z_(7e3, Hm), k_(ly), D_(900, Ad), V_("default", function(i3, r3) {
        B(r3 = r3 || {}, { text: "loading", textColor: v.color.primary, fontSize: 12, fontWeight: "normal", fontStyle: "normal", fontFamily: "sans-serif", maskColor: "rgba(255,255,255,0.8)", showSpinner: true, color: v.color.theme[0], spinnerRadius: 10, lineWidth: 5, zlevel: 0 });
        var o3, t3 = new Vo(), a3 = new uu({ style: { fill: r3.maskColor }, zlevel: r3.zlevel, z: 1e4 }), s3 = (t3.add(a3), new gu({ style: { text: r3.text, fill: r3.textColor, fontSize: r3.fontSize, fontWeight: r3.fontWeight, fontStyle: r3.fontStyle, fontFamily: r3.fontFamily }, zlevel: r3.zlevel, z: 10001 })), l3 = new uu({ style: { fill: "none" }, textContent: s3, textConfig: { position: "right", distance: 10 }, zlevel: r3.zlevel, z: 10001 });
        return t3.add(l3), r3.showSpinner && ((o3 = new ep({ shape: { startAngle: -um / 2, endAngle: -um / 2 + 0.1, r: r3.spinnerRadius }, style: { stroke: r3.color, lineCap: "round", lineWidth: r3.lineWidth }, zlevel: r3.zlevel, z: 10001 })).animateShape(true).when(1e3, { endAngle: 3 * um / 2 }).start("circularInOut"), o3.animateShape(true).when(1e3, { startAngle: 3 * um / 2 }).delay(300).start("circularInOut"), t3.add(o3)), t3.resize = function() {
          var t4 = s3.getBoundingRect().width, e3 = r3.showSpinner ? r3.spinnerRadius : 0, t4 = (i3.getWidth() - 2 * e3 - (r3.showSpinner && t4 ? 10 : 0) - t4) / 2 - (r3.showSpinner && t4 ? 0 : 5 + t4 / 2) + (r3.showSpinner ? 0 : t4 / 2) + (t4 ? 0 : e3), n3 = i3.getHeight() / 2;
          r3.showSpinner && o3.setShape({ cx: t4, cy: n3 }), l3.setShape({ x: t4 - e3, y: n3 - e3, width: 2 * e3, height: 2 * e3 }), a3.setShape({ x: 0, y: 0, width: i3.getWidth(), height: i3.getHeight() });
        }, t3.resize(), t3;
      }), O_({ type: Ku, event: Ku, update: Ku }, Wt), O_({ type: $u, event: $u, update: $u }, Wt), O_({ type: Qu, event: eh, update: Qu, action: Wt, refineEvent: H_, publishNonRefinedEvent: true }), O_({ type: Ju, event: eh, update: Ju, action: Wt, refineEvent: H_, publishNonRefinedEvent: true }), O_({ type: th, event: eh, update: th, action: Wt, refineEvent: H_, publishNonRefinedEvent: true }), C_("default", {}), C_("dark", af);
      function W_(t3) {
        return null == t3 ? 0 : t3.length || 1;
      }
      function U_(t3) {
        return t3;
      }
      Y_.prototype.add = function(t3) {
        return this._add = t3, this;
      }, Y_.prototype.update = function(t3) {
        return this._update = t3, this;
      }, Y_.prototype.updateManyToOne = function(t3) {
        return this._updateManyToOne = t3, this;
      }, Y_.prototype.updateOneToMany = function(t3) {
        return this._updateOneToMany = t3, this;
      }, Y_.prototype.updateManyToMany = function(t3) {
        return this._updateManyToMany = t3, this;
      }, Y_.prototype.remove = function(t3) {
        return this._remove = t3, this;
      }, Y_.prototype.execute = function() {
        this[this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"]();
      }, Y_.prototype._executeOneToOne = function() {
        var t3 = this._old, e3 = this._new, n3 = {}, i3 = new Array(t3.length), r3 = new Array(e3.length);
        this._initIndexMap(t3, null, i3, "_oldKeyGetter"), this._initIndexMap(e3, n3, r3, "_newKeyGetter");
        for (var o3 = 0; o3 < t3.length; o3++) {
          var a3, s3 = i3[o3], l3 = n3[s3], u3 = W_(l3);
          1 < u3 ? (a3 = l3.shift(), 1 === l3.length && (n3[s3] = l3[0]), this._update && this._update(a3, o3)) : 1 === u3 ? (n3[s3] = null, this._update && this._update(l3, o3)) : this._remove && this._remove(o3);
        }
        this._performRestAdd(r3, n3);
      }, Y_.prototype._executeMultiple = function() {
        var t3 = this._old, e3 = this._new, n3 = {}, i3 = {}, r3 = [], o3 = [];
        this._initIndexMap(t3, n3, r3, "_oldKeyGetter"), this._initIndexMap(e3, i3, o3, "_newKeyGetter");
        for (var a3 = 0; a3 < r3.length; a3++) {
          var s3 = r3[a3], l3 = n3[s3], u3 = i3[s3], h3 = W_(l3), c3 = W_(u3);
          if (1 < h3 && 1 === c3)
            this._updateManyToOne && this._updateManyToOne(u3, l3), i3[s3] = null;
          else if (1 === h3 && 1 < c3)
            this._updateOneToMany && this._updateOneToMany(u3, l3), i3[s3] = null;
          else if (1 === h3 && 1 === c3)
            this._update && this._update(u3, l3), i3[s3] = null;
          else if (1 < h3 && 1 < c3)
            this._updateManyToMany && this._updateManyToMany(u3, l3), i3[s3] = null;
          else if (1 < h3)
            for (var p3 = 0; p3 < h3; p3++)
              this._remove && this._remove(l3[p3]);
          else
            this._remove && this._remove(l3);
        }
        this._performRestAdd(o3, i3);
      }, Y_.prototype._performRestAdd = function(t3, e3) {
        for (var n3 = 0; n3 < t3.length; n3++) {
          var i3 = t3[n3], r3 = e3[i3], o3 = W_(r3);
          if (1 < o3)
            for (var a3 = 0; a3 < o3; a3++)
              this._add && this._add(r3[a3]);
          else
            1 === o3 && this._add && this._add(r3);
          e3[i3] = null;
        }
      }, Y_.prototype._initIndexMap = function(t3, e3, n3, i3) {
        for (var r3 = this._diffModeMultiple, o3 = 0; o3 < t3.length; o3++) {
          var a3, s3, l3 = "_ec_" + this[i3](t3[o3], o3);
          r3 || (n3[o3] = l3), e3 && (0 === (s3 = W_(a3 = e3[l3])) ? (e3[l3] = o3, r3 && n3.push(l3)) : 1 === s3 ? e3[l3] = [a3, o3] : a3.push(o3));
        }
      };
      var X_ = Y_;
      function Y_(t3, e3, n3, i3, r3, o3) {
        this._old = t3, this._new = e3, this._oldKeyGetter = n3 || U_, this._newKeyGetter = i3 || U_, this.context = r3, this._diffModeMultiple = "multiple" === o3;
      }
      Z_.prototype.get = function() {
        return { fullDimensions: this._getFullDimensionNames(), encode: this._encode };
      }, Z_.prototype._getFullDimensionNames = function() {
        return this._cachedDimNames || (this._cachedDimNames = this._schema ? this._schema.makeOutputDimensionNames() : []), this._cachedDimNames;
      };
      var q_ = Z_;
      function Z_(t3, e3) {
        this._encode = t3, this._schema = e3;
      }
      function j_(o3, t3) {
        var e3 = {}, a3 = e3.encode = {}, s3 = I(), l3 = [], u3 = [], h3 = {}, i3 = (F(o3.dimensions, function(t4) {
          var e4, n4, i4 = o3.getDimensionInfo(t4), r4 = i4.coordDim;
          r4 && (e4 = i4.coordDimIndex, K_(a3, r4)[e4] = t4, i4.isExtraCoord || (s3.set(r4, 1), "ordinal" !== (n4 = i4.type) && "time" !== n4 && (l3[0] = t4), K_(h3, r4)[e4] = o3.getDimensionIndex(i4.name)), i4.defaultTooltip) && u3.push(t4), Lu.each(function(t5, e5) {
            var n5 = K_(a3, e5), e5 = i4.otherDims[e5];
            null != e5 && false !== e5 && (n5[e5] = i4.name);
          });
        }), []), r3 = {}, n3 = (s3.each(function(t4, e4) {
          var n4 = a3[e4];
          r3[e4] = n4[0], i3 = i3.concat(n4);
        }), e3.dataDimsOnCoord = i3, e3.dataDimIndicesOnCoord = E(i3, function(t4) {
          return o3.getDimensionInfo(t4).storeDimIndex;
        }), e3.encodeFirstDimNotExtra = r3, a3.label), n3 = (n3 && n3.length && (l3 = n3.slice()), a3.tooltip);
        return n3 && n3.length ? u3 = n3.slice() : u3.length || (u3 = l3.slice()), a3.defaultedLabel = l3, a3.defaultedTooltip = u3, e3.userOutput = new q_(h3, t3), e3;
      }
      function K_(t3, e3) {
        return t3.hasOwnProperty(e3) || (t3[e3] = []), t3[e3];
      }
      var $_ = function(t3) {
        this.otherDims = {}, null != t3 && V(this, t3);
      }, Q_ = i(), J_ = { float: "f", int: "i", ordinal: "o", number: "n", time: "t" }, t1 = (e1.prototype.isDimensionOmitted = function() {
        return this._dimOmitted;
      }, e1.prototype._updateDimOmitted = function(t3) {
        (this._dimOmitted = t3) && !this._dimNameMap && (this._dimNameMap = r1(this.source));
      }, e1.prototype.getSourceDimensionIndex = function(t3) {
        return Y(this._dimNameMap.get(t3), -1);
      }, e1.prototype.getSourceDimension = function(t3) {
        var e3 = this.source.dimensionsDefine;
        if (e3)
          return e3[t3];
      }, e1.prototype.makeStoreSchema = function() {
        for (var t3 = this._fullDimCount, e3 = vy(this.source), n3 = !(30 < t3), i3 = "", r3 = [], o3 = 0, a3 = 0; o3 < t3; o3++) {
          var s3, l3 = void 0, u3 = void 0, h3 = void 0, c3 = this.dimensions[a3];
          c3 && c3.storeDimIndex === o3 ? (l3 = e3 ? c3.name : null, u3 = c3.type, h3 = c3.ordinalMeta, a3++) : (s3 = this.getSourceDimension(o3)) && (l3 = e3 ? s3.name : null, u3 = s3.type), r3.push({ property: l3, type: u3, ordinalMeta: h3 }), !e3 || null == l3 || c3 && c3.isCalculationCoord || (i3 += n3 ? l3.replace(/\`/g, "`1").replace(/\$/g, "`2") : l3), i3 = i3 + "$" + (J_[u3] || "f"), h3 && (i3 += h3.uid), i3 += "$";
        }
        var p3 = this.source;
        return { dimensions: r3, hash: [p3.seriesLayoutBy, p3.startIndex, i3].join("$$") };
      }, e1.prototype.makeOutputDimensionNames = function() {
        for (var t3 = [], e3 = 0, n3 = 0; e3 < this._fullDimCount; e3++) {
          var i3 = void 0, r3 = this.dimensions[n3];
          r3 && r3.storeDimIndex === e3 ? (r3.isCalculationCoord || (i3 = r3.name), n3++) : (r3 = this.getSourceDimension(e3)) && (i3 = r3.name), t3.push(i3);
        }
        return t3;
      }, e1.prototype.appendCalculationDimension = function(t3) {
        this.dimensions.push(t3), t3.isCalculationCoord = true, this._fullDimCount++, this._updateDimOmitted(true);
      }, e1);
      function e1(t3) {
        this.dimensions = t3.dimensions, this._dimOmitted = t3.dimensionOmitted, this.source = t3.source, this._fullDimCount = t3.fullDimensionCount, this._updateDimOmitted(t3.dimensionOmitted);
      }
      function n1(t3) {
        return t3 instanceof t1;
      }
      function i1(t3) {
        for (var e3 = I(), n3 = 0; n3 < (t3 || []).length; n3++) {
          var i3 = t3[n3], i3 = X(i3) ? i3.name : i3;
          null != i3 && null == e3.get(i3) && e3.set(i3, n3);
        }
        return e3;
      }
      function r1(t3) {
        var e3 = Q_(t3);
        return e3.dimNameMap || (e3.dimNameMap = i1(t3.dimensionsDefine));
      }
      var o1, a1, s1, l1, u1, h1, c1, p1 = X, d1 = E, f1 = "undefined" == typeof Int32Array ? Array : Int32Array, g1 = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], y1 = ["_approximateExtent"], m1 = (p.prototype.getDimension = function(t3) {
        var e3;
        return null == (e3 = this._recognizeDimIndex(t3)) ? t3 : (e3 = t3, this._dimOmitted ? null != (t3 = this._dimIdxToName.get(e3)) ? t3 : (t3 = this._schema.getSourceDimension(e3)) ? t3.name : void 0 : this.dimensions[e3]);
      }, p.prototype.getDimensionIndex = function(t3) {
        var e3 = this._recognizeDimIndex(t3);
        return null != e3 ? e3 : null == t3 ? -1 : (e3 = this._getDimInfo(t3)) ? e3.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(t3) : -1;
      }, p.prototype._recognizeDimIndex = function(t3) {
        if (U(t3) || null != t3 && !isNaN(t3) && !this._getDimInfo(t3) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t3) < 0))
          return +t3;
      }, p.prototype._getStoreDimIndex = function(t3) {
        return this.getDimensionIndex(t3);
      }, p.prototype.getDimensionInfo = function(t3) {
        return this._getDimInfo(this.getDimension(t3));
      }, p.prototype._initGetDimensionInfo = function(t3) {
        var e3 = this._dimInfos;
        this._getDimInfo = t3 ? function(t4) {
          return e3.hasOwnProperty(t4) ? e3[t4] : void 0;
        } : function(t4) {
          return e3[t4];
        };
      }, p.prototype.getDimensionsOnCoord = function() {
        return this._dimSummary.dataDimsOnCoord.slice();
      }, p.prototype.mapDimension = function(t3, e3) {
        var n3 = this._dimSummary;
        return null == e3 ? n3.encodeFirstDimNotExtra[t3] : (n3 = n3.encode[t3]) ? n3[e3] : null;
      }, p.prototype.mapDimensionsAll = function(t3) {
        return (this._dimSummary.encode[t3] || []).slice();
      }, p.prototype.getStore = function() {
        return this._store;
      }, p.prototype.initData = function(t3, e3, n3) {
        var i3, r3, o3 = this;
        (i3 = t3 instanceof M0 ? t3 : i3) || (r3 = this.dimensions, t3 = py(t3) || pt(t3) ? new wy(t3, r3.length) : t3, i3 = new M0(), r3 = d1(r3, function(t4) {
          return { type: o3._dimInfos[t4].type, property: t4 };
        }), i3.initData(t3, r3, n3)), this._store = i3, this._nameList = (e3 || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, i3.count()), this._dimSummary = j_(this, this._schema), this.userOutput = this._dimSummary.userOutput;
      }, p.prototype.appendData = function(t3) {
        t3 = this._store.appendData(t3);
        this._doInit(t3[0], t3[1]);
      }, p.prototype.appendValues = function(t3, e3) {
        var t3 = this._store.appendValues(t3, e3 && e3.length), n3 = t3.start, i3 = t3.end, r3 = this._shouldMakeIdFromName();
        if (this._updateOrdinalMeta(), e3)
          for (var o3 = n3; o3 < i3; o3++)
            this._nameList[o3] = e3[o3 - n3], r3 && c1(this, o3);
      }, p.prototype._updateOrdinalMeta = function() {
        for (var t3 = this._store, e3 = this.dimensions, n3 = 0; n3 < e3.length; n3++) {
          var i3 = this._dimInfos[e3[n3]];
          i3.ordinalMeta && t3.collectOrdinalMeta(i3.storeDimIndex, i3.ordinalMeta);
        }
      }, p.prototype._shouldMakeIdFromName = function() {
        var t3 = this._store.getProvider();
        return null == this._idDimIdx && t3.getSource().sourceFormat !== zu && !t3.fillStorage;
      }, p.prototype._doInit = function(t3, e3) {
        if (!(e3 <= t3)) {
          var n3 = this._store.getProvider(), i3 = (this._updateOrdinalMeta(), this._nameList), r3 = this._idList;
          if (n3.getSource().sourceFormat === Pu && !n3.pure)
            for (var o3 = [], a3 = t3; a3 < e3; a3++) {
              var s3, l3 = n3.getItem(a3, o3);
              this.hasItemOption || !X(s3 = l3) || s3 instanceof Array || (this.hasItemOption = true), l3 && (s3 = l3.name, null == i3[a3] && null != s3 && (i3[a3] = Va(s3, null)), l3 = l3.id, null == r3[a3]) && null != l3 && (r3[a3] = Va(l3, null));
            }
          if (this._shouldMakeIdFromName())
            for (a3 = t3; a3 < e3; a3++)
              c1(this, a3);
          o1(this);
        }
      }, p.prototype.getApproximateExtent = function(t3, e3) {
        return this._approximateExtent[t3] || this._store.getDataExtent(this._getStoreDimIndex(t3), e3);
      }, p.prototype.setApproximateExtent = function(t3, e3) {
        e3 = this.getDimension(e3), this._approximateExtent[e3] = t3.slice();
      }, p.prototype.getCalculationInfo = function(t3) {
        return this._calculationInfo[t3];
      }, p.prototype.setCalculationInfo = function(t3, e3) {
        p1(t3) ? V(this._calculationInfo, t3) : this._calculationInfo[t3] = e3;
      }, p.prototype.getName = function(t3) {
        var t3 = this.getRawIndex(t3), e3 = this._nameList[t3];
        return e3 = null == (e3 = null == e3 && null != this._nameDimIdx ? s1(this, this._nameDimIdx, t3) : e3) ? "" : e3;
      }, p.prototype._getCategory = function(t3, e3) {
        e3 = this._store.get(t3, e3), t3 = this._store.getOrdinalMeta(t3);
        return t3 ? t3.categories[e3] : e3;
      }, p.prototype.getId = function(t3) {
        return a1(this, this.getRawIndex(t3));
      }, p.prototype.count = function() {
        return this._store.count();
      }, p.prototype.get = function(t3, e3) {
        var n3 = this._store, t3 = this._dimInfos[t3];
        if (t3)
          return n3.get(t3.storeDimIndex, e3);
      }, p.prototype.getByRawIndex = function(t3, e3) {
        var n3 = this._store, t3 = this._dimInfos[t3];
        if (t3)
          return n3.getByRawIndex(t3.storeDimIndex, e3);
      }, p.prototype.getIndices = function() {
        return this._store.getIndices();
      }, p.prototype.getDataExtent = function(t3) {
        return this._store.getDataExtent(this._getStoreDimIndex(t3), null);
      }, p.prototype.getSum = function(t3) {
        return this._store.getSum(this._getStoreDimIndex(t3));
      }, p.prototype.getMedian = function(t3) {
        return this._store.getMedian(this._getStoreDimIndex(t3));
      }, p.prototype.getValues = function(t3, e3) {
        var n3 = this, i3 = this._store;
        return G(t3) ? i3.getValues(d1(t3, function(t4) {
          return n3._getStoreDimIndex(t4);
        }), e3) : i3.getValues(t3);
      }, p.prototype.hasValue = function(t3) {
        for (var e3 = this._dimSummary.dataDimIndicesOnCoord, n3 = 0, i3 = e3.length; n3 < i3; n3++)
          if (isNaN(this._store.get(e3[n3], t3)))
            return false;
        return true;
      }, p.prototype.indexOfName = function(t3) {
        for (var e3 = 0, n3 = this._store.count(); e3 < n3; e3++)
          if (this.getName(e3) === t3)
            return e3;
        return -1;
      }, p.prototype.getRawIndex = function(t3) {
        return this._store.getRawIndex(t3);
      }, p.prototype.indexOfRawIndex = function(t3) {
        return this._store.indexOfRawIndex(t3);
      }, p.prototype.rawIndexOf = function(t3, e3) {
        t3 = t3 && this._invertedIndicesMap[t3], t3 = t3 && t3[e3];
        return null == t3 || isNaN(t3) ? -1 : t3;
      }, p.prototype.each = function(t3, e3, n3) {
        H(t3) && (n3 = e3, e3 = t3, t3 = []);
        n3 = n3 || this, t3 = d1(l1(t3), this._getStoreDimIndex, this);
        this._store.each(t3, n3 ? y(e3, n3) : e3);
      }, p.prototype.filterSelf = function(t3, e3, n3) {
        H(t3) && (n3 = e3, e3 = t3, t3 = []);
        n3 = n3 || this, t3 = d1(l1(t3), this._getStoreDimIndex, this);
        return this._store = this._store.filter(t3, n3 ? y(e3, n3) : e3), this;
      }, p.prototype.selectRange = function(n3) {
        var i3 = this, r3 = {};
        return F(O(n3), function(t3) {
          var e3 = i3._getStoreDimIndex(t3);
          r3[e3] = n3[t3];
        }), this._store = this._store.selectRange(r3), this;
      }, p.prototype.mapArray = function(t3, e3, n3) {
        H(t3) && (n3 = e3, e3 = t3, t3 = []);
        var i3 = [];
        return this.each(t3, function() {
          i3.push(e3 && e3.apply(this, arguments));
        }, n3 = n3 || this), i3;
      }, p.prototype.map = function(t3, e3, n3, i3) {
        n3 = n3 || i3 || this, i3 = d1(l1(t3), this._getStoreDimIndex, this), t3 = h1(this);
        return t3._store = this._store.map(i3, n3 ? y(e3, n3) : e3), t3;
      }, p.prototype.modify = function(t3, e3, n3, i3) {
        n3 = n3 || i3 || this, i3 = d1(l1(t3), this._getStoreDimIndex, this);
        this._store.modify(i3, n3 ? y(e3, n3) : e3);
      }, p.prototype.downSample = function(t3, e3, n3, i3) {
        var r3 = h1(this);
        return r3._store = this._store.downSample(this._getStoreDimIndex(t3), e3, n3, i3), r3;
      }, p.prototype.minmaxDownSample = function(t3, e3) {
        var n3 = h1(this);
        return n3._store = this._store.minmaxDownSample(this._getStoreDimIndex(t3), e3), n3;
      }, p.prototype.lttbDownSample = function(t3, e3) {
        var n3 = h1(this);
        return n3._store = this._store.lttbDownSample(this._getStoreDimIndex(t3), e3), n3;
      }, p.prototype.getRawDataItem = function(t3) {
        return this._store.getRawDataItem(t3);
      }, p.prototype.getItemModel = function(t3) {
        var e3 = this.hostModel, t3 = this.getRawDataItem(t3);
        return new Bd(t3, e3, e3 && e3.ecModel);
      }, p.prototype.diff = function(e3) {
        var n3 = this;
        return new X_(e3 ? e3.getStore().getIndices() : [], this.getStore().getIndices(), function(t3) {
          return a1(e3, t3);
        }, function(t3) {
          return a1(n3, t3);
        });
      }, p.prototype.getVisual = function(t3) {
        var e3 = this._visual;
        return e3 && e3[t3];
      }, p.prototype.setVisual = function(t3, e3) {
        this._visual = this._visual || {}, p1(t3) ? V(this._visual, t3) : this._visual[t3] = e3;
      }, p.prototype.getItemVisual = function(t3, e3) {
        t3 = this._itemVisuals[t3], t3 = t3 && t3[e3];
        return null == t3 ? this.getVisual(e3) : t3;
      }, p.prototype.hasItemVisual = function() {
        return 0 < this._itemVisuals.length;
      }, p.prototype.ensureUniqueItemVisual = function(t3, e3) {
        var n3 = this._itemVisuals, i3 = n3[t3], n3 = (i3 = i3 || (n3[t3] = {}))[e3];
        return null == n3 && (G(n3 = this.getVisual(e3)) ? n3 = n3.slice() : p1(n3) && (n3 = V({}, n3)), i3[e3] = n3), n3;
      }, p.prototype.setItemVisual = function(t3, e3, n3) {
        var i3 = this._itemVisuals[t3] || {};
        this._itemVisuals[t3] = i3, p1(e3) ? V(i3, e3) : i3[e3] = n3;
      }, p.prototype.clearAllVisual = function() {
        this._visual = {}, this._itemVisuals = [];
      }, p.prototype.setLayout = function(t3, e3) {
        p1(t3) ? V(this._layout, t3) : this._layout[t3] = e3;
      }, p.prototype.getLayout = function(t3) {
        return this._layout[t3];
      }, p.prototype.getItemLayout = function(t3) {
        return this._itemLayouts[t3];
      }, p.prototype.setItemLayout = function(t3, e3, n3) {
        this._itemLayouts[t3] = n3 ? V(this._itemLayouts[t3] || {}, e3) : e3;
      }, p.prototype.clearItemLayouts = function() {
        this._itemLayouts.length = 0;
      }, p.prototype.setItemGraphicEl = function(t3, e3) {
        var n3, i3, r3, o3, a3 = this.hostModel && this.hostModel.seriesIndex;
        n3 = a3, i3 = this.dataType, r3 = t3, (a3 = e3) && ((o3 = j(a3)).dataIndex = r3, o3.dataType = i3, o3.seriesIndex = n3, o3.ssrType = "chart", "group" === a3.type) && a3.traverse(function(t4) {
          t4 = j(t4);
          t4.seriesIndex = n3, t4.dataIndex = r3, t4.dataType = i3, t4.ssrType = "chart";
        }), this._graphicEls[t3] = e3;
      }, p.prototype.getItemGraphicEl = function(t3) {
        return this._graphicEls[t3];
      }, p.prototype.eachItemGraphicEl = function(n3, i3) {
        F(this._graphicEls, function(t3, e3) {
          t3 && n3 && n3.call(i3, t3, e3);
        });
      }, p.prototype.cloneShallow = function(t3) {
        return t3 = t3 || new p(this._schema || d1(this.dimensions, this._getDimInfo, this), this.hostModel), u1(t3, this), t3._store = this._store, t3;
      }, p.prototype.wrapMethod = function(t3, e3) {
        var n3 = this[t3];
        H(n3) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t3), this[t3] = function() {
          var t4 = n3.apply(this, arguments);
          return e3.apply(this, [t4].concat(Ct(arguments)));
        });
      }, p.internalField = (o1 = function(a3) {
        var s3 = a3._invertedIndicesMap;
        F(s3, function(t3, e3) {
          var n3 = a3._dimInfos[e3], i3 = n3.ordinalMeta, r3 = a3._store;
          if (i3) {
            t3 = s3[e3] = new f1(i3.categories.length);
            for (var o3 = 0; o3 < t3.length; o3++)
              t3[o3] = -1;
            for (o3 = 0; o3 < r3.count(); o3++)
              t3[r3.get(n3.storeDimIndex, o3)] = o3;
          }
        });
      }, s1 = function(t3, e3, n3) {
        return Va(t3._getCategory(e3, n3), null);
      }, a1 = function(t3, e3) {
        var n3 = t3._idList[e3];
        return n3 = null == (n3 = null == n3 && null != t3._idDimIdx ? s1(t3, t3._idDimIdx, e3) : n3) ? "e\0\0" + e3 : n3;
      }, l1 = function(t3) {
        return t3 = G(t3) ? t3 : null != t3 ? [t3] : [];
      }, h1 = function(t3) {
        var e3 = new p(t3._schema || d1(t3.dimensions, t3._getDimInfo, t3), t3.hostModel);
        return u1(e3, t3), e3;
      }, u1 = function(e3, n3) {
        F(g1.concat(n3.__wrappedMethods || []), function(t3) {
          n3.hasOwnProperty(t3) && (e3[t3] = n3[t3]);
        }), e3.__wrappedMethods = n3.__wrappedMethods, F(y1, function(t3) {
          e3[t3] = _(n3[t3]);
        }), e3._calculationInfo = V({}, n3._calculationInfo);
      }, void (c1 = function(t3, e3) {
        var n3 = t3._nameList, i3 = t3._idList, r3 = t3._nameDimIdx, o3 = t3._idDimIdx, a3 = n3[e3], s3 = i3[e3];
        null == a3 && null != r3 && (n3[e3] = a3 = s1(t3, r3, e3)), null == s3 && null != o3 && (i3[e3] = s3 = s1(t3, o3, e3)), null == s3 && null != a3 && (s3 = a3, 1 < (r3 = (n3 = t3._nameRepeatCount)[a3] = (n3[a3] || 0) + 1) && (s3 += "__ec__" + r3), i3[e3] = s3);
      })), p);
      function p(t3, e3) {
        this.type = "list", this._dimOmitted = false, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = false, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"];
        for (var n3, i3, r3 = !(this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"]), o3 = (n1(t3) ? (n3 = t3.dimensions, this._dimOmitted = t3.isDimensionOmitted(), this._schema = t3) : (r3 = true, n3 = t3), n3 = n3 || ["x", "y"], {}), a3 = [], s3 = {}, l3 = false, u3 = {}, h3 = 0; h3 < n3.length; h3++) {
          var c3 = n3[h3], c3 = W(c3) ? new $_({ name: c3 }) : c3 instanceof $_ ? c3 : new $_(c3), p3 = c3.name, d3 = (c3.type = c3.type || "float", c3.coordDim || (c3.coordDim = p3, c3.coordDimIndex = 0), c3.otherDims = c3.otherDims || {});
          a3.push(p3), null != u3[p3] && (l3 = true), (o3[p3] = c3).createInvertedIndices && (s3[p3] = []), r3 && (c3.storeDimIndex = h3), 0 === d3.itemName && (this._nameDimIdx = c3.storeDimIndex), 0 === d3.itemId && (this._idDimIdx = c3.storeDimIndex);
        }
        this.dimensions = a3, this._dimInfos = o3, this._initGetDimensionInfo(l3), this.hostModel = e3, this._invertedIndicesMap = s3, this._dimOmitted && (i3 = this._dimIdxToName = I(), F(a3, function(t4) {
          i3.set(o3[t4].storeDimIndex, t4);
        }));
      }
      function v1(t3, e3) {
        py(t3) || (t3 = fy(t3));
        for (var n3, i3, r3 = (e3 = e3 || {}).coordDimensions || [], o3 = e3.dimensionsDefine || t3.dimensionsDefine || [], a3 = I(), s3 = [], l3 = (u3 = t3, n3 = r3, p3 = e3.dimensionsCount, i3 = Math.max(u3.dimensionsDetectedCount || 1, n3.length, o3.length, p3 || 0), F(n3, function(t4) {
          X(t4) && (t4 = t4.dimsDef) && (i3 = Math.max(i3, t4.length));
        }), i3), u3 = e3.canOmitUnusedDimensions && 30 < l3, h3 = o3 === t3.dimensionsDefine, c3 = h3 ? r1(t3) : i1(o3), p3 = e3.encodeDefine, d3 = I(p3 = !p3 && e3.encodeDefaulter ? e3.encodeDefaulter(t3, l3) : p3), f3 = new x0(l3), g3 = 0; g3 < f3.length; g3++)
          f3[g3] = -1;
        function y3(t4) {
          var e4, n4, i4, r4 = f3[t4];
          return r4 < 0 ? (e4 = X(e4 = o3[t4]) ? e4 : { name: e4 }, n4 = new $_(), null != (i4 = e4.name) && null != c3.get(i4) && (n4.name = n4.displayName = i4), null != e4.type && (n4.type = e4.type), null != e4.displayName && (n4.displayName = e4.displayName), f3[t4] = s3.length, n4.storeDimIndex = t4, s3.push(n4), n4) : s3[r4];
        }
        if (!u3)
          for (g3 = 0; g3 < l3; g3++)
            y3(g3);
        d3.each(function(t4, n4) {
          var i4, t4 = Pa(t4).slice();
          1 === t4.length && !W(t4[0]) && t4[0] < 0 ? d3.set(n4, false) : (i4 = d3.set(n4, []), F(t4, function(t5, e4) {
            t5 = W(t5) ? c3.get(t5) : t5;
            null != t5 && t5 < l3 && v3(y3(i4[e4] = t5), n4, e4);
          }));
        });
        var m3 = 0;
        function v3(t4, e4, n4) {
          null != Lu.get(e4) ? t4.otherDims[e4] = n4 : (t4.coordDim = e4, t4.coordDimIndex = n4, a3.set(e4, true));
        }
        F(r3, function(t4) {
          W(t4) ? (o4 = t4, r4 = {}) : (o4 = (r4 = t4).name, t4 = r4.ordinalMeta, r4.ordinalMeta = null, (r4 = V({}, r4)).ordinalMeta = t4, n4 = r4.dimsDef, i4 = r4.otherDims, r4.name = r4.coordDim = r4.coordDimIndex = r4.dimsDef = r4.otherDims = null);
          var n4, i4, r4, o4, e4 = d3.get(o4);
          if (false !== e4) {
            if (!(e4 = Pa(e4)).length)
              for (var a4 = 0; a4 < (n4 && n4.length || 1); a4++) {
                for (; m3 < l3 && null != y3(m3).coordDim; )
                  m3++;
                m3 < l3 && e4.push(m3++);
              }
            F(e4, function(t5, e5) {
              t5 = y3(t5);
              h3 && null != r4.type && (t5.type = r4.type), v3(B(t5, r4), o4, e5), null == t5.name && n4 && (X(e5 = n4[e5]) || (e5 = { name: e5 }), t5.name = t5.displayName = e5.name, t5.defaultTooltip = e5.defaultTooltip), i4 && B(t5.otherDims, i4);
            });
          }
        });
        var _3 = e3.generateCoord, x3 = null != (b3 = e3.generateCoordCount), b3 = _3 ? b3 || 1 : 0, w3 = _3 || "value";
        function S3(t4) {
          null == t4.name && (t4.name = t4.coordDim);
        }
        if (u3)
          F(s3, function(t4) {
            S3(t4);
          }), s3.sort(function(t4, e4) {
            return t4.storeDimIndex - e4.storeDimIndex;
          });
        else
          for (var M3 = 0; M3 < l3; M3++) {
            var T3 = y3(M3);
            null == T3.coordDim && (T3.coordDim = function(t4, e4, n4) {
              if (n4 || e4.hasKey(t4)) {
                for (var i4 = 0; e4.hasKey(t4 + i4); )
                  i4++;
                t4 += i4;
              }
              return e4.set(t4, true), t4;
            }(w3, a3, x3), T3.coordDimIndex = 0, (!_3 || b3 <= 0) && (T3.isExtraCoord = true), b3--), S3(T3), null != T3.type || Sg(t3, M3) !== vg.Must && (!T3.isExtraCoord || null == T3.otherDims.itemName && null == T3.otherDims.seriesName) || (T3.type = "ordinal");
          }
        return os(s3, function(t4) {
          return t4.name;
        }, function(t4, e4) {
          0 < e4 && (t4.name = t4.name + (e4 - 1));
        }), new t1({ source: t3, dimensions: s3, fullDimensionCount: l3, dimensionOmitted: u3 });
      }
      var _1 = function(t3) {
        this.coordSysDims = [], this.axisMap = I(), this.categoryAxisMap = I(), this.coordSysName = t3;
      };
      var x1 = { cartesian2d: function(t3, e3, n3, i3) {
        var r3 = t3.getReferringComponents("xAxis", qa).models[0], t3 = t3.getReferringComponents("yAxis", qa).models[0];
        e3.coordSysDims = ["x", "y"], n3.set("x", r3), n3.set("y", t3), b1(r3) && (i3.set("x", r3), e3.firstCategoryDimIndex = 0), b1(t3) && (i3.set("y", t3), null == e3.firstCategoryDimIndex) && (e3.firstCategoryDimIndex = 1);
      }, singleAxis: function(t3, e3, n3, i3) {
        t3 = t3.getReferringComponents("singleAxis", qa).models[0];
        e3.coordSysDims = ["single"], n3.set("single", t3), b1(t3) && (i3.set("single", t3), e3.firstCategoryDimIndex = 0);
      }, polar: function(t3, e3, n3, i3) {
        var t3 = t3.getReferringComponents("polar", qa).models[0], r3 = t3.findAxisModel("radiusAxis"), t3 = t3.findAxisModel("angleAxis");
        e3.coordSysDims = ["radius", "angle"], n3.set("radius", r3), n3.set("angle", t3), b1(r3) && (i3.set("radius", r3), e3.firstCategoryDimIndex = 0), b1(t3) && (i3.set("angle", t3), null == e3.firstCategoryDimIndex) && (e3.firstCategoryDimIndex = 1);
      }, geo: function(t3, e3, n3, i3) {
        e3.coordSysDims = ["lng", "lat"];
      }, parallel: function(t3, i3, r3, o3) {
        var a3 = t3.ecModel, t3 = a3.getComponent("parallel", t3.get("parallelIndex")), s3 = i3.coordSysDims = t3.dimensions.slice();
        F(t3.parallelAxisIndex, function(t4, e3) {
          var t4 = a3.getComponent("parallelAxis", t4), n3 = s3[e3];
          r3.set(n3, t4), b1(t4) && (o3.set(n3, t4), null == i3.firstCategoryDimIndex) && (i3.firstCategoryDimIndex = e3);
        });
      }, matrix: function(t3, e3, n3, i3) {
        t3 = t3.getReferringComponents("matrix", qa).models[0], e3.coordSysDims = ["x", "y"], e3 = t3.getDimensionModel("x"), t3 = t3.getDimensionModel("y");
        n3.set("x", e3), n3.set("y", t3), i3.set("x", e3), i3.set("y", t3);
      } };
      function b1(t3) {
        return "category" === t3.get("type");
      }
      function w1(t3, e3, n3) {
        var i3, r3, o3, a3, s3, l3, u3, h3, c3, p3 = (n3 = n3 || {}).byIndex, d3 = n3.stackedCoordDimension, f3 = (n1(e3.schema) ? (r3 = e3.schema, i3 = r3.dimensions, o3 = e3.store) : i3 = e3, !(!t3 || !t3.get("stack"))), g3 = true;
        function y3(t4) {
          return "ordinal" !== t4.type && "time" !== t4.type;
        }
        return F(i3, function(t4, e4) {
          W(t4) && (i3[e4] = t4 = { name: t4 }), y3(t4) || (g3 = false);
        }), F(i3, function(t4, e4) {
          f3 && !t4.isExtraCoord && (p3 || a3 || !t4.ordinalMeta || (a3 = t4), s3 || !y3(t4) || g3 && ("x" === t4.coordDim || "angle" === t4.coordDim) || d3 && d3 !== t4.coordDim || (s3 = t4));
        }), !s3 || p3 || a3 || (p3 = true), s3 && (l3 = "__\0ecstackresult_" + t3.id, u3 = "__\0ecstackedover_" + t3.id, a3 && (a3.createInvertedIndices = true), h3 = s3.coordDim, n3 = s3.type, c3 = 0, F(i3, function(t4) {
          t4.coordDim === h3 && c3++;
        }), e3 = { name: l3, coordDim: h3, coordDimIndex: c3, type: n3, isExtraCoord: true, isCalculationCoord: true, storeDimIndex: i3.length }, t3 = { name: u3, coordDim: u3, coordDimIndex: c3 + 1, type: n3, isExtraCoord: true, isCalculationCoord: true, storeDimIndex: i3.length + 1 }, r3 ? (o3 && (e3.storeDimIndex = o3.ensureCalculationDimension(u3, n3), t3.storeDimIndex = o3.ensureCalculationDimension(l3, n3)), r3.appendCalculationDimension(e3), r3.appendCalculationDimension(t3)) : (i3.push(e3), i3.push(t3))), { stackedDimension: s3 && s3.name, stackedByDimension: a3 && a3.name, isStackedByIndex: p3, stackedOverDimension: u3, stackResultDimension: l3 };
      }
      function S1(t3, e3) {
        return !!e3 && e3 === t3.getCalculationInfo("stackedDimension");
      }
      function M1(t3, e3) {
        return S1(t3, e3) ? t3.getCalculationInfo("stackResultDimension") : e3;
      }
      function T1(t3, e3, n3) {
        n3 = n3 || {};
        var i3, r3, o3, a3, s3, l3, u3 = e3.getSourceManager(), h3 = false, t3 = (t3 ? (h3 = true, i3 = fy(t3)) : h3 = (i3 = u3.getSource()).sourceFormat === Pu, function(t4) {
          var e4 = t4.get("coordinateSystem"), n4 = new _1(e4);
          if (e4 = x1[e4])
            return e4(t4, n4, n4.axisMap, n4.categoryAxisMap), n4;
        }(e3)), c3 = (r3 = t3, c3 = (c3 = e3).get("coordinateSystem"), c3 = Ef.get(c3), p3 = (p3 = r3 && r3.coordSysDims ? E(r3.coordSysDims, function(t4) {
          var e4 = { name: t4 }, t4 = r3.axisMap.get(t4);
          return t4 && (t4 = t4.get("type"), e4.type = "category" === (t4 = t4) ? "ordinal" : "time" === t4 ? "time" : "float"), e4;
        }) : p3) || c3 && (c3.getDimensionsInfo ? c3.getDimensionsInfo() : c3.dimensions.slice()) || ["x", "y"]), p3 = n3.useEncodeDefaulter, p3 = H(p3) ? p3 : p3 ? yt(xg, c3, e3) : null, c3 = { coordDimensions: c3, generateCoord: n3.generateCoord, encodeDefine: e3.getEncode(), encodeDefaulter: p3, canOmitUnusedDimensions: !h3 }, p3 = v1(i3, c3), d3 = (c3 = p3.dimensions, o3 = n3.createInvertedIndices, (a3 = t3) && F(c3, function(t4, e4) {
          var n4 = t4.coordDim, n4 = a3.categoryAxisMap.get(n4);
          n4 && (null == s3 && (s3 = e4), t4.ordinalMeta = n4.getOrdinalMeta(), o3) && (t4.createInvertedIndices = true), null != t4.otherDims.itemName && (l3 = true);
        }), l3 || null == s3 || (c3[s3].otherDims.itemName = 0), s3), n3 = h3 ? null : u3.getSharedDataStore(p3), t3 = w1(e3, { schema: p3, store: n3 }), c3 = new m1(p3, e3), p3 = (c3.setCalculationInfo(t3), null == d3 || (u3 = i3).sourceFormat !== Pu || G(Na(function(t4) {
          var e4 = 0;
          for (; e4 < t4.length && null == t4[e4]; )
            e4++;
          return t4[e4];
        }(u3.data || []))) ? null : function(t4, e4, n4, i4) {
          return i4 === d3 ? n4 : this.defaultDimValueGetter(t4, e4, n4, i4);
        });
        return c3.hasItemOption = false, c3.initData(h3 ? i3 : n3, null, p3), c3;
      }
      C1.prototype.isBlank = function() {
        return this._isBlank;
      }, C1.prototype.setBlank = function(t3) {
        this._isBlank = t3;
      };
      var I1 = C1;
      function C1() {
      }
      _s(I1);
      var k1 = 0, D1 = (A1.createByAxisModel = function(t3) {
        var t3 = t3.option, e3 = t3.data, e3 = e3 && E(e3, L1);
        return new A1({ categories: e3, needCollect: !e3, deduplication: false !== t3.dedplication });
      }, A1.prototype.getOrdinal = function(t3) {
        return this._getOrCreateMap().get(t3);
      }, A1.prototype.parseAndCollect = function(t3) {
        var e3, n3, i3 = this._needCollect;
        return W(t3) || i3 ? (i3 && !this._deduplication ? (n3 = this.categories.length, this.categories[n3] = t3, this._onCollect && this._onCollect(t3, n3)) : null == (n3 = (e3 = this._getOrCreateMap()).get(t3)) && (i3 ? (n3 = this.categories.length, this.categories[n3] = t3, e3.set(t3, n3), this._onCollect && this._onCollect(t3, n3)) : n3 = NaN), n3) : t3;
      }, A1.prototype._getOrCreateMap = function() {
        return this._map || (this._map = I(this.categories));
      }, A1);
      function A1(t3) {
        this.categories = t3.categories || [], this._needCollect = t3.needCollect, this._deduplication = t3.deduplication, this.uid = ++k1, this._onCollect = t3.onCollect;
      }
      function L1(t3) {
        return X(t3) && null != t3.value ? t3.value : t3 + "";
      }
      var P1 = 0, O1 = 1, R1 = O({ needTransform: 1, normalize: 1, scale: 1, transformIn: 1, transformOut: 1, contain: 1, getExtent: 1, getExtentUnsafe: 1, setExtent: 1, setExtent2: 1, getFilter: 1, sanitize: 1, getDefaultStartValue: 1, freeze: 1 }), N1 = 2, z1 = 3;
      function B1(t3, e3, n3) {
        var i3;
        return n3 = n3, ((i3 = (i3 = t3 = t3 || {}) || {})._extents = [])[P1] = n3 ? n3.slice() : $a(), V(i3, W1), { brk: void 0, mapper: t3 };
      }
      function E1(e3, n3) {
        F(R1, function(t3) {
          e3[t3] = n3[t3];
        });
      }
      function V1(t3) {
        t3.freeze = Wt;
      }
      function F1(t3) {
        return t3.getExtentUnsafe(P1, N1);
      }
      function G1(t3, e3) {
        return t3.getExtentUnsafe(O1, e3) || t3.getExtentUnsafe(P1, e3);
      }
      function H1(t3) {
        t3 = t3.getExtentUnsafe(P1, z1);
        return t3[1] - t3[0];
      }
      var W1 = { needTransform: function() {
        return false;
      }, normalize: function(t3) {
        var e3 = this._extents[O1] || this._extents[P1];
        return e3[1] === e3[0] ? 0.5 : (t3 - e3[0]) / (e3[1] - e3[0]);
      }, scale: function(t3) {
        var e3 = this._extents[O1] || this._extents[P1];
        return t3 * (e3[1] - e3[0]) + e3[0];
      }, transformIn: function(t3) {
        return t3;
      }, transformOut: function(t3) {
        return t3;
      }, contain: function(t3) {
        var e3 = G1(this, null);
        return t3 >= e3[0] && t3 <= e3[1];
      }, getExtent: function() {
        return this._extents[P1].slice();
      }, getExtentUnsafe: function(t3) {
        return this._extents[t3];
      }, setExtent: function(t3, e3) {
        U1(this._extents, P1, t3, e3);
      }, setExtent2: function(t3, e3, n3) {
        var i3 = this._extents;
        i3[t3] || (i3[t3] = i3[P1].slice()), U1(i3, t3, e3, n3);
      }, freeze: function() {
      } };
      function U1(t3, e3, n3, i3) {
        ns(n3, i3) && (t3[e3][0] = n3, t3[e3][1] = i3);
      }
      function X1(t3) {
        return Y1(t3) || Z1(t3);
      }
      function Y1(t3) {
        return "interval" === t3.type;
      }
      function q1(t3) {
        return "time" === t3.type;
      }
      function Z1(t3) {
        return "log" === t3.type;
      }
      function j1(t3) {
        return "ordinal" === t3.type;
      }
      function K1(t3) {
        return da(t3) + 2;
      }
      function $1(t3, e3) {
        return oa(t3) / oa(e3);
      }
      function Q1(t3, e3, n3) {
        var i3 = n3 && n3.lookup;
        if (i3) {
          for (var r3 = 0; r3 < i3.from.length; r3++)
            if (t3 === i3.from[r3])
              return i3.to[r3];
        }
        return ra(e3, t3);
      }
      function J1(t3, e3, n3) {
        var i3, t3 = t3.slice();
        return t3[0] === t3[1] && (n3 = n3 && n3.ctnShp, 0 !== t3[0] ? (i3 = ta(t3[0]), e3[1] || (t3[1] += i3 / 2), t3[0] -= i3 / 2) : (n3 && (t3[0] = -1), t3[1] = 1)), es(t3[0]) && es(t3[1]) || (t3[0] = 0, t3[1] = 1), t3[1] < t3[0] && t3.reverse(), t3;
      }
      function tx(t3, e3) {
        return ea(Jo(t3 = t3 || e3, 1));
      }
      function ex(t3, e3, i3) {
        for (var n3 = F1(t3), r3 = n3[0], t3 = t3.count(), o3 = Math.max((e3 || 0) + 1, 1), a3 = ((r3 = 0 !== r3 && 1 < o3 && 2 < t3 / o3 ? Math.round(Math.ceil(r3 / o3) * o3) : r3) !== n3[0] && s3(n3[0], true, true), r3); a3 <= n3[1]; a3 += o3)
          s3(a3, false, a3 === n3[0] || a3 === n3[1]);
        function s3(t4, e4, n4) {
          i3({ value: t4, offInterval: e4 }, n4);
        }
        a3 - o3 !== n3[1] && s3(n3[1], true, true);
      }
      u(rx, nx = I1), rx.parse = function(t3) {
        return null == t3 ? t3 = NaN : W(t3) ? null == (t3 = this._ordinalMeta.getOrdinal(t3)) && (t3 = NaN) : t3 = ea(t3), t3;
      }, rx.prototype.getTicks = function() {
        var e3 = [];
        return ex(this, 0, function(t3) {
          e3.push(t3);
        }), e3;
      }, rx.prototype.getMinorTicks = function(t3) {
      }, rx.prototype.setSortInfo = function(t3) {
        if (null == t3)
          this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null;
        else {
          for (var e3 = t3.ordinalNumbers, n3 = this._ordinalNumbersByTick = [], i3 = this._ticksByOrdinalNumber = [], r3 = 0, o3 = this._ordinalMeta.categories.length, a3 = Qo(o3, e3.length); r3 < a3; ++r3)
            i3[n3[r3] = e3[r3]] = r3;
          for (var s3 = 0; r3 < o3; ++r3) {
            for (; null != i3[s3]; )
              s3++;
            i3[n3[r3] = s3] = r3;
          }
        }
      }, rx.prototype._getTickNumber = function(t3) {
        var e3 = this._ticksByOrdinalNumber;
        return e3 && 0 <= t3 && t3 < e3.length ? e3[t3] : t3;
      }, rx.prototype.getRawOrdinalNumber = function(t3) {
        var e3 = this._ordinalNumbersByTick;
        return e3 && 0 <= t3 && t3 < e3.length ? e3[t3] : t3;
      }, rx.prototype.getLabel = function(t3) {
        if (!this.isBlank())
          return t3 = this.getRawOrdinalNumber(t3.value), null == (t3 = this._ordinalMeta.categories[t3]) ? "" : t3 + "";
      }, rx.prototype.count = function() {
        var t3 = F1(this._mapper);
        return t3[1] - t3[0] + 1;
      }, rx.prototype.getOrdinalMeta = function() {
        return this._ordinalMeta;
      }, rx.type = "ordinal", rx.decoratedMethods = { needTransform: function() {
        return this._mapper.needTransform();
      }, contain: function(t3) {
        return this._mapper.contain(this._getTickNumber(t3)) && 0 <= t3 && t3 < this._ordinalMeta.categories.length;
      }, normalize: function(t3) {
        return this._mapper.normalize(this._getTickNumber(t3));
      }, scale: function(t3) {
        return this.getRawOrdinalNumber(ea(this._mapper.scale(t3)));
      }, transformIn: function(t3, e3) {
        return this._mapper.transformIn(this._getTickNumber(t3), e3);
      }, transformOut: function(t3, e3) {
        return this.getRawOrdinalNumber(this._mapper.transformOut(t3, e3));
      }, getExtent: function() {
        return this._mapper.getExtent();
      }, getExtentUnsafe: function(t3, e3) {
        return this._mapper.getExtentUnsafe(t3, e3);
      }, setExtent: function(t3, e3) {
        return this._mapper.setExtent(t3, e3);
      }, setExtent2: function(t3, e3, n3) {
        return this._mapper.setExtent2(t3, e3, n3);
      } };
      var nx, ix = rx;
      function rx(t3) {
        var e3 = nx.call(this) || this, n3 = (e3.type = "ordinal", e3.parse = rx.parse, E1(e3, rx.decoratedMethods), t3.ordinalMeta), t3 = (G(n3 = n3 || new D1({})) && (n3 = new D1({ categories: E(n3, function(t4) {
          return X(t4) ? t4.value : t4;
        }) })), e3._ordinalMeta = n3, B1(null, 0, t3.extent || [0, n3.categories.length - 1]));
        return e3._mapper = t3.mapper, V1(e3), e3;
      }
      function ox(t3, e3, n3, i3) {
        for (var r3 = t3.getTicks({ expandToNicedExtent: true }), o3 = [], a3 = t3.getExtent(), s3 = 1; s3 < r3.length; s3++) {
          var l3 = r3[s3], u3 = r3[s3 - 1];
          if (!u3.break && !l3.break) {
            for (var h3 = 0, c3 = [], p3 = (l3.value - u3.value) / e3, d3 = K1(p3); h3 < e3 - 1; ) {
              var f3 = C(u3.value + (h3 + 1) * p3, d3);
              f3 > a3[0] && f3 < a3[1] && c3.push(f3), h3++;
            }
            jd && jd.pruneTicksByBreak("auto", c3, n3, function(t4) {
              return t4;
            }, i3, a3), o3.push(c3);
          }
        }
        return o3;
      }
      I1.registerClass(ix);
      u(lx, ax = I1), lx.parse = function(t3) {
        return null == t3 || "" === t3 ? NaN : Number(t3);
      }, lx.prototype.getConfig = function() {
        return _(this._cfg);
      }, lx.prototype.setConfig = function(t3) {
        var e3 = F1(this);
        this._cfg = t3 = _(t3), null == t3.niceExtent && (t3.niceExtent = e3.slice()), null == t3.intervalPrecision && (t3.intervalPrecision = K1(t3.interval));
      }, lx.prototype.getTicks = function(t3) {
        t3 = t3 || {};
        var e3 = this._cfg, n3 = e3.interval, i3 = F1(this), r3 = e3.niceExtent, o3 = e3.intervalPrecision, a3 = jd, s3 = this.brk, l3 = [];
        if (n3)
          if ("only_break" === t3.breakTicks && a3)
            a3.addBreaksToTicks(l3, s3.breaks, i3);
          else {
            i3[0] < r3[0] && l3.push({ value: t3.expandToNicedExtent ? C(r3[0] - n3, o3) : i3[0] });
            for (var u3, h3 = function(t4, e4) {
              return ea((e4 - t4) / n3);
            }, c3 = e3.intervalCount, p3 = r3[0], d3 = 0; ; d3++) {
              if (null == c3) {
                if (p3 > r3[1] || !isFinite(p3) || !isFinite(r3[1]))
                  break;
              } else {
                if (c3 < d3)
                  break;
                p3 = Qo(p3, r3[1]), d3 === c3 && (p3 = r3[1]);
              }
              if (l3.push({ value: p3 }), p3 = C(p3 + n3, o3), s3 && 0 <= (u3 = s3.calcNiceTickMultiple(p3, h3)) && (p3 = C(p3 + u3 * n3, o3)), 0 < l3.length && p3 === l3[l3.length - 1].value)
                break;
              if (3e3 < l3.length)
                return [];
            }
            a3 = l3.length ? l3[l3.length - 1].value : r3[1];
            i3[1] > a3 && l3.push({ value: t3.expandToNicedExtent ? C(a3 + n3, o3) : i3[1] });
          }
        return l3;
      }, lx.prototype.getMinorTicks = function(t3) {
        return ox(this, t3, $d(this), this._cfg.interval);
      }, lx.prototype.getLabel = function(t3, e3) {
        return null == t3 ? "" : (null == (e3 = e3 && e3.precision) ? e3 = da(t3.value) || 0 : "auto" === e3 && (e3 = this._cfg.intervalPrecision), Df(C(t3.value, e3, true)));
      }, lx.type = "interval";
      var ax, sx = lx;
      function lx(t3) {
        var e3 = ax.call(this) || this, t3 = (e3.type = "interval", e3.parse = lx.parse, Kd(e3, t3 = t3 || {}), B1(e3, 0, null));
        return e3.brk = t3.brk, e3._cfg = { interval: 0, intervalPrecision: 2, intervalCount: void 0, niceExtent: void 0 }, e3;
      }
      I1.registerClass(sx);
      u(cx, ux = I1), cx.prototype.getLabel = function(t3) {
        return df(t3.value, sf[function(t4) {
          switch (t4) {
            case "year":
            case "month":
              return "day";
            case "millisecond":
              return "millisecond";
            default:
              return "second";
          }
        }(pf(this._minLevelUnit))] || sf.second, this._useUTC, this._locale);
      }, cx.prototype.getFormattedLabel = function(t3, e3, n3) {
        return t3 = t3, e3 = e3, n3 = n3, i3 = this._locale, r3 = this._useUTC, a3 = null, a3 = W(n3) ? n3 : H(n3) ? (o3 = { time: t3.time, level: t3.time ? t3.time.level : 0 }, jd && jd.makeAxisLabelFormatterParamBreak(o3, t3.break), n3(t3.value, e3, o3)) : (e3 = t3.time) ? (o3 = n3[e3.lowerTimeUnit][e3.upperTimeUnit])[Math.min(e3.level, o3.length - 1)] || "" : n3[e3 = ff(t3.value, r3)][e3][0], df(new Date(t3.value), a3, r3, i3);
        var i3, r3, o3, a3;
      }, cx.prototype.getTicks = function(t3) {
        var e3, n3, i3 = this._interval, r3 = F1(this), o3 = this.brk, a3 = [];
        return i3 && (i3 = this._useUTC, a3 = function(t4, m3, v3, _3, e4, y3) {
          var x3 = 3e3, n4 = uf, b3 = 0;
          function w3(t5, e5, n5, i5, r5, o5, a5) {
            s4 = r5, l4 = t5, (u4 = /* @__PURE__ */ new Date(0))[s4](1), h4 = u4.getTime(), u4[s4](1 + l4), c4 = u4.getTime() - h4;
            for (var s4, l4, u4, h4, c4, p4, d4 = function(t6, e6) {
              return Math.max(0, Math.round((e6 - t6) / c4));
            }, f4 = e5, g4 = new Date(f4); f4 < n5 && f4 <= _3[1] && (a5.push({ value: f4 }), !(b3++ > x3)); )
              g4[r5](g4[i5]() + t5), f4 = g4.getTime(), y3 && 0 < (p4 = y3.calcNiceTickMultiple(f4, d4)) && (g4[r5](g4[i5]() + p4 * t5), f4 = g4.getTime());
            a5.push({ value: f4, notAdd: f4 > _3[1] });
          }
          function i4(t5, e5, n5) {
            var i5, r5, o5, a5, s4 = [], l4 = !e5.length;
            if (i5 = pf(t5), r5 = _3[0], o5 = _3[1], a5 = v3, gf(new Date(r5), i5, a5).getTime() !== gf(new Date(o5), i5, a5).getTime()) {
              l4 && (e5 = [{ value: function(t6, e6, n6) {
                e6 = Math.max(0, L(lf, e6) - 1);
                return gf(new Date(t6), lf[e6], n6).getTime();
              }(_3[0], t5, v3) }, { value: _3[1] }]);
              for (var u4, h4, c4 = 0; c4 < e5.length - 1; c4++) {
                var p4 = e5[c4].value, d4 = e5[c4 + 1].value;
                if (p4 !== d4) {
                  var f4 = void 0, g4 = void 0, y4 = void 0;
                  switch (t5) {
                    case "year":
                      f4 = Math.max(1, Math.round(m3 / nf / 365)), g4 = yf(v3), y4 = v3 ? "setUTCFullYear" : "setFullYear";
                      break;
                    case "half-year":
                    case "quarter":
                    case "month":
                      h4 = m3, f4 = 6 < (h4 /= 30 * nf) ? 6 : 3 < h4 ? 3 : 2 < h4 ? 2 : 1, g4 = mf(v3), y4 = Sf(v3);
                      break;
                    case "week":
                    case "half-week":
                    case "day":
                      h4 = m3, f4 = 16 < (h4 /= nf) ? 16 : 7.5 < h4 ? 7 : 3.5 < h4 ? 4 : 1.5 < h4 ? 2 : 1, g4 = vf(v3), y4 = Mf(v3), 0;
                      break;
                    case "half-day":
                    case "quarter-day":
                    case "hour":
                      u4 = m3, f4 = 12 < (u4 /= ef) ? 12 : 6 < u4 ? 6 : 3.5 < u4 ? 4 : 2 < u4 ? 2 : 1, g4 = _f(v3), y4 = Tf(v3);
                      break;
                    case "minute":
                      f4 = dx(m3, true), g4 = xf(v3), y4 = If(v3);
                      break;
                    case "second":
                      f4 = dx(m3, false), g4 = bf(v3), y4 = Cf(v3);
                      break;
                    case "millisecond":
                      f4 = Jo(Ma(m3, true), 1), g4 = wf(v3), y4 = kf(v3);
                  }
                  d4 >= _3[0] && p4 <= _3[1] && w3(f4, p4, d4, g4, y4, 0, s4), "year" === t5 && 1 < n5.length && 0 === c4 && n5.unshift({ value: n5[0].value - f4 });
                }
              }
              for (c4 = 0; c4 < s4.length; c4++)
                n5.push(s4[c4]);
            }
          }
          for (var r4 = [], o4 = [], a4 = 0, s3 = 0, l3 = 0; l3 < n4.length; ++l3) {
            var u3 = pf(n4[l3]);
            if (function(t5) {
              return t5 === pf(t5);
            }(n4[l3])) {
              i4(n4[l3], r4[r4.length - 1] || [], o4);
              var h3 = n4[l3 + 1] ? pf(n4[l3 + 1]) : null;
              if (u3 !== h3) {
                if (o4.length) {
                  s3 = a4, o4.sort(function(t5, e5) {
                    return t5.value - e5.value;
                  });
                  for (var c3 = [], p3 = 0; p3 < o4.length; ++p3) {
                    var d3 = o4[p3].value;
                    0 !== p3 && o4[p3 - 1].value === d3 || (c3.push(o4[p3]), d3 >= _3[0] && d3 <= _3[1] && a4++);
                  }
                  u3 = e4 / m3;
                  if (1.5 * u3 < a4 && u3 / 1.5 < s3)
                    break;
                  if (r4.push(c3), u3 < a4 || t4 === n4[l3])
                    break;
                }
                o4 = [];
              }
            }
          }
          for (var f3 = ft(E(r4, function(t5) {
            return ft(t5, function(t6) {
              return t6.value >= _3[0] && t6.value <= _3[1] && !t6.notAdd;
            });
          }), function(t5) {
            return 0 < t5.length;
          }), g3 = f3.length - 1, S3 = [], l3 = 0; l3 < f3.length; ++l3)
            for (var M3 = f3[l3], T3 = 0; T3 < M3.length; ++T3) {
              var I3 = ff(M3[T3].value, v3);
              S3.push({ value: M3[T3].value, time: { level: g3 - l3, upperTimeUnit: I3, lowerTimeUnit: I3 } });
            }
          os(S3, as, null), S3.sort(function(t5, e5) {
            return t5.value - e5.value;
          });
          var C3 = S3[0], k3 = S3[S3.length - 1], D3 = ff(_3[0], v3), A3 = ff(_3[1], v3);
          (!C3 || C3.value > _3[0]) && S3.unshift({ value: _3[0], time: { level: 0, upperTimeUnit: D3, lowerTimeUnit: D3 }, notNice: true });
          (!k3 || k3.value < _3[1]) && S3.push({ value: _3[1], time: { level: 0, upperTimeUnit: A3, lowerTimeUnit: A3 }, notNice: true });
          return S3;
        }(this._minLevelUnit, this._approxInterval, i3, r3, H1(this), o3), e3 = lf.length - 1, n3 = 0, F(a3, function(t4) {
          t4.time && (e3 = Math.min(e3, L(lf, t4.time.upperTimeUnit)), n3 = Math.max(n3, t4.time.level));
        })), a3;
      }, cx.prototype.getMinorTicks = function(t3) {
        return ox(this, t3, $d(this), this._interval);
      }, cx.prototype.setTimeInterval = function(t3) {
        this._interval = t3.interval, this._approxInterval = t3.approxInterval, this._minLevelUnit = t3.minLevelUnit;
      }, cx.parse = function(t3) {
        return U(t3) ? Math.round(t3) : +xa(t3);
      }, cx.type = "time";
      var ux, hx = cx;
      function cx(t3) {
        var e3 = ux.call(this) || this, t3 = (e3.type = "time", e3.parse = cx.parse, e3._locale = t3.locale, e3._useUTC = t3.useUTC, e3._interval = 0, Kd(e3, t3), B1(e3, 0, null));
        return e3.brk = t3.brk, e3;
      }
      var px = [["second", Jd], ["minute", tf], ["hour", ef], ["quarter-day", 6 * ef], ["half-day", 12 * ef], ["day", 1.2 * nf], ["half-week", 3.5 * nf], ["week", 7 * nf], ["month", 31 * nf], ["quarter", 95 * nf], ["half-year", ys / 2], ["year", ys]];
      function dx(t3, e3) {
        return 30 < (t3 /= e3 ? tf : Jd) ? 30 : 20 < t3 ? 20 : 15 < t3 ? 15 : 10 < t3 ? 10 : 5 < t3 ? 5 : 2 < t3 ? 2 : 1;
      }
      I1.registerClass(hx);
      u(yx, fx = I1), yx.prototype.getTicks = function(t3) {
        var e3 = this.base, n3 = this.powStub, i3 = this.intervalStub, r3 = { lookup: { from: i3.getExtent(), to: n3.getExtent() } };
        return E(i3.getTicks(t3 || {}), function(t4) {
          return { value: Q1(t4.value, e3, r3), break: void 0 };
        }, this);
      }, yx.prototype.getMinorTicks = function(t3) {
        return ox(this, t3, $d(this.powStub), this.intervalStub.getConfig().interval);
      }, yx.prototype.getLabel = function(t3, e3) {
        return this.intervalStub.getLabel(t3, e3);
      }, yx.type = "log", yx.mapperMethods = { needTransform: function() {
        return true;
      }, normalize: function(t3) {
        return this.intervalStub.normalize($1(t3, this.base));
      }, scale: function(t3) {
        return Q1(this.intervalStub.scale(t3), this.base, null);
      }, transformIn: function(t3, e3) {
        return t3 = $1(t3, this.base), e3 && e3.depth === N1 ? t3 : this.intervalStub.transformIn(t3, e3);
      }, transformOut: function(t3, e3) {
        e3 = e3 ? e3.depth : null;
        return mx.depth = e3, vx.lookup = this._lookup, Q1(e3 === N1 ? t3 : this.intervalStub.transformOut(t3, mx), this.base, vx);
      }, contain: function(t3) {
        return this.powStub.contain(t3);
      }, setExtent: function(t3, e3) {
        this.setExtent2(P1, t3, e3);
      }, setExtent2: function(t3, e3, n3) {
        var i3, r3, o3;
        !ns(e3, n3) || e3 <= 0 || n3 <= 0 || (r3 = i3 = _x, t3 === P1 && (i3 = (o3 = this._lookup).to, r3 = o3.from), this.powStub.setExtent2(t3, i3[0] = e3, i3[1] = n3), o3 = this.base, this.intervalStub.setExtent2(t3, r3[0] = $1(e3, o3), r3[1] = $1(n3, o3)));
      }, getFilter: function() {
        return { g: 0 };
      }, sanitize: function(t3, e3) {
        return t3 = ns(e3[0], e3[1]) && Da(t3) && t3 <= 0 ? e3[0] : t3;
      }, getDefaultStartValue: function() {
        return 1;
      }, getExtent: function() {
        return this.powStub.getExtent();
      }, getExtentUnsafe: function(t3, e3) {
        return null === e3 ? this.powStub.getExtentUnsafe(t3, null) : this.intervalStub.getExtentUnsafe(t3, e3);
      } };
      var fx, gx = yx;
      function yx(t3) {
        var e3 = fx.call(this) || this, n3 = (e3.type = "log", e3.parse = sx.parse, e3.base = t3.logBase || 10, []), i3 = [], r3 = e3._lookup = { from: n3, to: i3 }, n3 = (n3[0] = n3[1] = i3[0] = i3[1] = NaN, E1(e3, yx.mapperMethods), t3.breakOption, { lookup: r3 });
        return e3.powStub = new sx({ breakParsed: n3.original }), e3.intervalStub = new sx({ breakParsed: n3.transformed }), V1(e3, e3.intervalStub), e3;
      }
      I1.registerClass(gx);
      var mx = {}, vx = {}, _x = [], xx = { value: 1, category: 1, time: 1, log: 1 }, bx = i();
      function Sx(t3) {
        t3 = t3.get("type");
        return t3 = null != t3 && (Ht(xx, t3) || I1.getClass(t3)) ? t3 : "value";
      }
      function Mx(t3, e3) {
        switch (e3) {
          case "category":
            return new ix({ ordinalMeta: t3.getOrdinalMeta ? t3.getOrdinalMeta() : t3.getCategories(), extent: $a() });
          case "time":
            return new hx({ locale: t3.ecModel.getLocaleModel(), useUTC: t3.ecModel.get("useUTC"), breakOption: void 0 });
          case "log":
            return new gx({ logBase: t3.get("logBase"), breakOption: void 0 });
          case "value":
            return new sx({ breakOption: void 0 });
          default:
            return new (I1.getClass(e3) || sx)({});
        }
      }
      var Tx = 1, Ix = 2, Cx = 3;
      function kx(i3) {
        var n3, r3, o3 = i3.getLabelModel().get("formatter");
        return "time" === i3.type ? (n3 = hf(o3), function(t3, e3) {
          return i3.scale.getFormattedLabel(t3, e3, n3);
        }) : W(o3) ? function(t3) {
          t3 = i3.scale.getLabel(t3);
          return o3.replace("{value}", null != t3 ? t3 : "");
        } : H(o3) ? "category" === i3.type ? function(t3, e3) {
          return o3(Dx(i3, t3), t3.value - i3.scale.getExtent()[0], null);
        } : (r3 = jd, function(t3, e3) {
          var n4 = null;
          return r3 && (n4 = r3.makeAxisLabelFormatterParamBreak(n4, t3.break)), o3(Dx(i3, t3), e3, n4);
        }) : function(t3) {
          return i3.scale.getLabel(t3);
        };
      }
      function Dx(t3, e3) {
        t3 = t3.scale;
        return j1(t3) ? t3.getLabel(e3) : e3.value;
      }
      function Ax(t3) {
        t3 = t3.get("interval");
        return null == t3 ? "auto" : t3;
      }
      function Lx(t3) {
        return "middle" === t3 || "center" === t3;
      }
      function Px(t3) {
        return t3.getShallow("show");
      }
      function Ox(t3, e3, n3, i3, r3, o3) {
        var a3, s3, l3 = Z1(t3), u3 = l3 ? t3.intervalStub : t3;
        u3.setExtent(i3[0], i3[1]), l3 && (l3 = t3.powStub, a3 = t3.transformOut(i3[0], s3 = { depth: N1 }), t3 = t3.transformOut(i3[1], s3), s3 = [n3[0] !== i3[0], n3[1] !== i3[1]], e3[0] && !s3[0] && (a3 = r3[0]), e3[1] && !s3[1] && (t3 = r3[1]), l3.setExtent(a3, t3)), u3.setConfig(o3);
      }
      function Rx(t3, e3) {
        return j1(t3) ? t3.getRawOrdinalNumber(e3.value) : e3.value;
      }
      function Nx(t3, e3) {
        return j1(t3) && !!e3.get("boundaryGap");
      }
      Bx.prototype.needIncludeZero = function() {
        return !this.option.scale;
      }, Bx.prototype.getCoordSysModel = function() {
      };
      var zx = Bx;
      function Bx() {
      }
      var Ex = is(), Vx = "|&", Fx = i(), Gx = -2, Hx = -1, Wx = i();
      function Ux(t3, e3) {
        var t3 = t3.model, n3 = Fx(zm(t3.ecModel)).keyed, n3 = n3 && n3.get(e3);
        return n3 && n3.get(t3.uid);
      }
      function Xx(t3, i3) {
        t3 = Fx(zm(t3)).keyed;
        t3 && t3.each(function(t4, n3) {
          t4.each(function(t5, e3) {
            i3(t5, n3, e3);
          });
        });
      }
      function Yx(t3) {
        return { liPosMinGap: t3 ? t3.liPosMinGap : void 0 };
      }
      function qx(t3, e3, n3) {
        e3 = Ux(t3, e3);
        e3 && Zx(t3.model.ecModel, e3.sers, n3);
      }
      function Zx(t3, e3, n3) {
        if (e3)
          for (var i3 = 0; i3 < e3.length; i3++) {
            var r3 = e3[i3];
            t3.isSeriesFiltered(r3) || n3(r3);
          }
      }
      function jx(t3, e3) {
        var t3 = t3.model, n3 = Fx(zm(t3.ecModel)).keys;
        n3 && F(n3.get(t3.uid), function(t4) {
          e3(t4);
        });
      }
      function Kx(i3) {
        var t3 = Wx(Nm(i3).prepare), r3 = t3.keyed || (t3.keyed = I());
        Xx(i3, function(t4, e3, n3) {
          e3 = r3.get(e3) || r3.set(e3, I()), e3 = e3.get(n3) || e3.set(n3, {});
          t4.metrics.liPosMinGap && $x.liPosMinGap(i3, t4, e3);
        });
      }
      var $x = {};
      function Qx(t3, e3, n3) {
        var i3, r3, o3, a3, s3;
        t3 && (o3 = e3.ecModel, o3 = Fx(zm(o3)), i3 = t3.model.uid, ((a3 = o3.axSer || (o3.axSer = I())).get(i3) || a3.set(i3, [])).push(e3), a3 = e3.subType, r3 = e3.getBaseAxis() === t3, n3 = tb.get(Jx(a3, r3, n3)) || tb.get(Jx(a3, r3, null))) && (a3 = o3.keyed || (o3.keyed = I()), r3 = o3.keys || (o3.keys = I()), o3 = n3.key, (s3 = (a3 = a3.get(o3) || a3.set(o3, I())).get(i3)) || ((s3 = a3.set(i3, { axis: t3, sers: [], serByIdx: [] })).metrics = n3.getMetrics(t3), (r3.get(i3) || r3.set(i3, [])).push(o3)), s3.sers.push(e3), s3.serByIdx[e3.seriesIndex] = e3);
      }
      function Jx(t3, e3, n3) {
        return t3 + Vx + Y(e3, true) + Vx + (n3 || "");
      }
      var tb = I(), eb = i(), nb = (ib.prototype.makeNoZoom = function() {
        return this._i.noZoomEffMM.slice();
      }, ib.prototype.makeFinal = function() {
        var t3 = this._i, e3 = t3.zoomMM, n3 = t3.noZoomEffMM, i3 = t3.zoomFixMM, r3 = t3.fixMM, n3 = { fixMM: r3, zoomFixMM: i3, isBlank: t3.isBlank, incl0: t3.incl0, tggAxInv: t3.tggAxInv, ctnShp: t3.ctnShp, effMM: n3.slice() }, o3 = n3.effMM;
        return null != e3[0] && (o3[0] = e3[0], r3[0] = i3[0] = true), null != e3[1] && (o3[1] = e3[1], r3[1] = i3[1] = true), rb(t3, o3), n3;
      }, ib.prototype.makeRenderInfo = function() {
        return { startValue: this._i.startValue };
      }, ib.prototype.setZoomMM = function(t3, e3) {
        this._i.zoomMM[t3] = e3;
      }, ib);
      function ib(t3, e3, n3, i3, r3) {
        var o3 = j1(t3), a3 = o3 ? e3.getCategories().length : null, n3 = (o3 && (c3 = (c3 = e3.getCategories(true)) && !c3.length), n3.slice()), s3 = ((Y1(t3) || Z1(t3) || q1(t3)) && (Ja(n3, ob(t3, e3.get("dataMin", true))), ts(n3, ob(t3, e3.get("dataMax", true)))), s3 = (s3 = n3)[1] - s3[0], isFinite(s3) && 0 <= s3 || (n3[0] = n3[1] = NaN), []), l3 = [false, false], u3 = e3.get("min", true), u3 = ("dataMin" === u3 ? (s3[0] = n3[0], l3[0] = true) : (s3[0] = ob(t3, H(u3) ? u3({ min: n3[0], max: n3[1] }) : u3), l3[0] = null != s3[0]), e3.get("max", true)), u3 = ("dataMax" === u3 ? (s3[1] = n3[1], l3[1] = true) : (s3[1] = ob(t3, H(u3) ? u3({ min: n3[0], max: n3[1] }) : u3), l3[1] = null != s3[1]), function(t4, e4) {
          e4 = j1(t4) ? [0, 0] : (t4 = e4.get("boundaryGap"), G(t4 = "boolean" == typeof t4 ? null : t4) ? t4 : [t4, t4]);
          return [ab(e4[0]), ab(e4[1])];
        }(t3, e3)), h3 = o3 ? null : n3[1] - n3[0] || Math.abs(n3[0]), u3 = (null == s3[0] && (s3[0] = o3 ? c3 ? n3[0] : a3 ? 0 : NaN : n3[0] - u3[0] * h3), null == s3[1] && (s3[1] = o3 ? c3 ? n3[1] : a3 ? a3 - 1 : NaN : n3[1] + u3[1] * h3), es(s3[0]) || (s3[0] = NaN), es(s3[1]) || (s3[1] = NaN), c3 || Mt(s3[0]) || Mt(s3[1]) || o3 && !a3), h3 = Y1(t3), c3 = h3 && e3.needIncludeZero && e3.needIncludeZero(), o3 = (c3 && (0 < s3[0] && 0 < s3[1] && !l3[0] && (s3[0] = 0), s3[0] < 0) && s3[1] < 0 && !l3[1] && (s3[1] = 0), false), a3 = (s3[1] < s3[0] && (s3.reverse(), o3 = true), ob(t3, e3.get("startValue", true))), e3 = null != a3;
        !Da(a3) && i3 && (a3 = t3.getDefaultStartValue ? t3.getDefaultStartValue() : 0), Da(a3) && (e3 || !h3 || c3) && (a3 < s3[0] && !l3[0] ? (s3[0] = a3, l3[0] = true) : s3[1] < a3 && !l3[1] && (s3[1] = a3, l3[1] = true)), rb(this._i = { scale: t3, dataMM: n3, noZoomEffMM: s3, zoomMM: [], fixMM: l3, zoomFixMM: [false, false], startValue: a3, isBlank: u3, incl0: c3, tggAxInv: o3, ctnShp: r3 }, s3);
      }
      function rb(t3, e3) {
        var n3 = t3.scale, t3 = t3.dataMM;
        n3.sanitize && (e3[0] = n3.sanitize(e3[0], t3), e3[1] = n3.sanitize(e3[1], t3), ns((n3 = e3)[0], n3[1])) && n3[0] > n3[1] && (n3[0] = n3[1]);
      }
      function ob(t3, e3) {
        return null == e3 ? null : Mt(e3) ? NaN : t3.parse(e3);
      }
      function ab(t3) {
        return bo("boolean" == typeof t3 ? 0 : t3, 1) || 0;
      }
      function sb(t3) {
        t3 = eb(t3.scale);
        return t3.extent || (t3.extent = $a()), t3;
      }
      function lb(t3, e3) {
        var n3, s3, l3, u3, h3, c3, p3, i3 = t3.scale, r3 = t3.model, o3 = t3.dim;
        i3.rawExtentInfo || (s3 = i3, u3 = o3, i3 = r3, o3 = e3, h3 = sb(l3 = t3), c3 = h3.extent, p3 = false, r3 = function(t4) {
          var e4, n4, i4, r4, o4, a3;
          t4.boxCoordinateSystem ? (n4 = Wf(t4).coord, 0 <= (e4 = h3.dimIdxInCoord) && G(n4) && null != (n4 = n4[e4]) && !G(n4) && Qa(c3, s3.parse(n4))) : t4.coordinateSystem && ((i4 = t4.getData()) && (r4 = s3.getFilter ? s3.getFilter() : null, F((a3 = {}, F((o4 = i4).mapDimensionsAll(u3), function(t5) {
            a3[M1(o4, t5)] = true;
          }), O(a3)), function(t5) {
            var e5;
            e5 = c3, ns((t5 = i4.getApproximateExtent(t5, r4))[0], t5[1]) && (t5[0] < e5[0] && (e5[0] = t5[0]), t5[1] > e5[1]) && (e5[1] = t5[1]);
          })), t4.__requireStartValue) && t4.__requireStartValue(l3) && (p3 = true);
        }, t3 = (e3 = l3).model.ecModel, (n3 = Fx(zm(t3)).axSer) && Zx(t3, n3.get(e3.model.uid), r3), t3 = function(t4, e4, n4) {
          var i4, t4 = Nx(t4, n4), n4 = n4.get("containShape", true);
          null != n4 || t4 || (n4 = true);
          return !!n4 && (i4 = false, jx(e4, function(t5) {
            i4 = !!hb.get(t5) || i4;
          }), i4);
        }(s3, l3, i3), i3 = new nb(s3, i3, c3, p3, t3), ub(s3, i3, o3), h3.extent = null);
      }
      function ub(t3, e3, n3) {
        (t3.rawExtentInfo = e3).from = n3;
      }
      var hb = I();
      function cb(t3, e3, n3, i3, r3) {
        t3.rawExtentInfo || (r3 = r3 || $a(), ub(o3 = (e3 = { scale: t3, model: e3 }).scale, new nb(o3, e3.model, r3, false, false), 3));
        var o3 = t3.rawExtentInfo.makeFinal(), e3 = o3.effMM;
        return t3.setExtent(e3[0], e3[1]), t3.setBlank(o3.isBlank), i3 && o3.tggAxInv && n3 && !n3.get("legacyMinMaxDontInverseAxis") && (i3.inverse = !i3.inverse), o3;
      }
      function pb(e3, t3, n3, i3) {
        var r3, o3, a3;
        n3.ctnShp && (jx(e3, function(t4) {
          var t4 = hb.get(t4);
          t4 && (t4 = t4(e3, i3)) && (Ja(r3 = r3 || [0, 0], t4[0]), ts(r3, t4[1]), bx(e3).noOnMyZero = true);
        }), r3) && (o3 = t3.getExtent(), j1(t3) ? e3.onBand || t3.setExtent2(O1, Qo(o3[0], o3[0] + r3[0]), Jo(o3[1], o3[1] + r3[1])) : (a3 = o3.slice(), n3.zoomFixMM[0] || (a3[0] = Qo(a3[0], t3.transformOut(t3.transformIn(a3[0], null) + r3[0], null))), n3.zoomFixMM[1] || (a3[1] = Jo(a3[1], t3.transformOut(t3.transformIn(a3[1], null) + r3[1], null))), (a3[0] < o3[0] || a3[1] > o3[1]) && t3.setExtent2(O1, a3[0], a3[1])));
      }
      function db(t3, e3) {
        var n3 = Z1(t3), i3 = n3 ? t3.intervalStub : t3, r3 = e3.fixMinMax || [], o3 = n3 ? t3.getExtent() : null, a3 = i3.getExtent(), s3 = J1(a3, r3, e3.rawExtentResult), n3 = (i3.setExtent(s3[0], s3[1]), s3 = i3.getExtent(), (n3 ? function(t4, e4) {
          var e4 = tx(e4.splitNumber, 10), n4 = t4.getExtent(), t4 = H1(t4), i4 = Jo(ba(t4), 1);
          e4 / t4 * i4 <= 0.5 && (i4 *= 10);
          e4 = K1(i4), t4 = [C(ia(n4[0] / i4) * i4, e4), C(na(n4[1] / i4) * i4, e4)];
          return { intervalPrecision: e4, interval: i4, niceExtent: t4 };
        } : function(t4, e4) {
          var n4 = tx(e4.splitNumber, 5), i4 = H1(t4), r4 = e4.minInterval, e4 = e4.maxInterval, i4 = Ma(i4 / n4, true);
          null != r4 && i4 < r4 && (i4 = r4);
          null != e4 && e4 < i4 && (i4 = e4);
          n4 = K1(i4), r4 = t4.getExtent(), e4 = [C(ia(r4[0] / i4) * i4, n4), C(na(r4[1] / i4) * i4, n4)];
          return { interval: i4, intervalPrecision: n4, niceExtent: e4 };
        })(i3, e3)), i3 = n3.intervalPrecision, l3 = n3.interval, e3 = e3.userInterval;
        null != e3 && (n3.interval = e3, n3.intervalPrecision = K1(e3)), r3[0] || (s3[0] = C(na(s3[0] / l3) * l3, i3)), r3[1] || (s3[1] = C(ia(s3[1] / l3) * l3, i3)), null != e3 && (n3.niceExtent = s3.slice()), Ox(t3, r3, a3, s3, o3, n3);
      }
      function fb(t3) {
        var e3 = t3.scale, t3 = t3.model;
        gb(e3, t3, t3.axis, t3.ecModel, null);
      }
      function gb(t3, e3, n3, i3, r3) {
        var o3, r3 = cb(t3, e3, i3, n3, r3), a3 = Y1(t3) || q1(t3);
        o3 = t3, a3 = { splitNumber: e3.get("splitNumber"), fixMinMax: r3.fixMM, userInterval: e3.get("interval"), minInterval: a3 ? e3.get("minInterval") : null, maxInterval: a3 ? e3.get("maxInterval") : null, rawExtentResult: r3 }, yb[o3.type](o3, a3), n3 && i3 && pb(n3, t3, r3, i3);
      }
      var yb = { interval: db, log: db, time: function(t3, e3) {
        var n3 = t3.getExtent(), i3 = (n3[0] === n3[1] && (n3[0] -= nf, n3[1] += nf), n3[1] === -1 / 0 && n3[0] === 1 / 0 && (i3 = /* @__PURE__ */ new Date(), n3[1] = +new Date(i3.getFullYear(), i3.getMonth(), i3.getDate()), n3[0] = n3[1] - nf), t3.setExtent(n3[0], n3[1]), tx(e3.splitNumber, 10)), n3 = H1(t3) / i3, i3 = e3.minInterval, e3 = e3.maxInterval, i3 = (null != i3 && n3 < i3 && (n3 = i3), null != e3 && e3 < n3 && (n3 = e3), px.length), e3 = Math.min(function(t4, e4, n4, i4) {
          for (; n4 < i4; ) {
            var r3 = n4 + i4 >>> 1;
            t4[r3][1] < e4 ? n4 = 1 + r3 : i4 = r3;
          }
          return n4;
        }(px, n3, 0, i3), i3 - 1), i3 = px[e3][1], e3 = px[Math.max(e3 - 1, 0)][0];
        t3.setTimeInterval({ approxInterval: n3, interval: i3, minLevelUnit: e3 });
      }, ordinal: Wt };
      var Um = Object.freeze({ __proto__: null, createDimensions: function(t3, e3) {
        return v1(t3, e3).dimensions;
      }, createList: function(t3) {
        return T1(null, t3);
      }, createScale: function(t3, e3) {
        var n3 = e3, e3 = Sx(n3 = e3 instanceof Bd ? n3 : new Bd(e3));
        return gb(e3 = Mx(n3, e3), n3, null, null, t3 = t3[1] < t3[0] ? t3.slice().reverse() : t3), e3;
      }, createSymbol: jm, createTextStyle: function(t3, e3) {
        return fd(t3, null, null, "normal" !== (e3 = e3 || {}).state);
      }, dataStack: { isDimensionStacked: S1, enableDataStack: w1, getStackedDimension: M1 }, enableHoverEmphasis: Dh, getECData: j, getLayoutRect: tg, mixinAxisModelCommonMethods: function(t3) {
        ct(t3, zx);
      } }), mb = [], vb = { registerPreprocessor: k_, registerProcessor: D_, registerPostInit: A_, registerPostUpdate: L_, registerUpdateLifecycle: P_, registerAction: O_, registerCoordinateSystem: R_, registerLayout: N_, registerVisual: z_, registerTransform: G_, registerLoading: V_, registerMap: F_, registerImpl: function(t3, e3) {
        Rm[t3] = e3;
      }, PRIORITY: Wm, ComponentModel: cg, ComponentView: U0, SeriesModel: z0, ChartView: j0, registerComponentModel: function(t3) {
        cg.registerClass(t3);
      }, registerComponentView: function(t3) {
        U0.registerClass(t3);
      }, registerSeriesModel: function(t3) {
        z0.registerClass(t3);
      }, registerChartView: function(t3) {
        j0.registerClass(t3);
      }, registerCustomSeries: function(t3, e3) {
      }, registerSubTypeDefaulter: function(t3, e3) {
        cg.registerSubTypeDefaulter(t3, e3);
      }, registerPainter: function(t3, e3) {
        qo(t3, e3);
      } };
      function _b(t3) {
        G(t3) ? F(t3, function(t4) {
          _b(t4);
        }) : 0 <= L(mb, t3) || (mb.push(t3), (t3 = H(t3) ? { install: t3 } : t3).install(vb));
      }
      var xb = 1e-8;
      function bb(t3, e3) {
        return Math.abs(t3 - e3) < xb;
      }
      function wb(t3, e3, n3) {
        var i3 = 0, r3 = t3[0];
        if (r3) {
          for (var o3 = 1; o3 < t3.length; o3++) {
            var a3 = t3[o3];
            i3 += Rl(r3[0], r3[1], a3[0], a3[1], e3, n3), r3 = a3;
          }
          var s3 = t3[0];
          return bb(r3[0], s3[0]) && bb(r3[1], s3[1]) || (i3 += Rl(r3[0], r3[1], s3[0], s3[1], e3, n3)), 0 !== i3;
        }
      }
      var Sb = [];
      function Mb(t3, e3) {
        for (var n3 = 0; n3 < t3.length; n3++)
          le(t3[n3], t3[n3], e3);
      }
      function Tb(t3, e3, n3, i3) {
        for (var r3 = 0; r3 < t3.length; r3++) {
          var o3 = t3[r3];
          (o3 = i3 ? i3.project(o3) : o3) && isFinite(o3[0]) && isFinite(o3[1]) && (ue(e3, e3, o3), he(n3, n3, o3));
        }
      }
      Ib.prototype.setCenter = function(t3) {
        this._center = t3;
      }, Ib.prototype.getCenter = function() {
        return this._center || (this._center = this.calcCenter());
      };
      Gm = Ib;
      function Ib(t3) {
        this.name = t3;
      }
      var Cb, kb, Db = function(t3, e3) {
        this.type = "polygon", this.exterior = t3, this.interiors = e3;
      }, Ab = function(t3) {
        this.type = "linestring", this.points = t3;
      }, Lb = (u(Pb, Cb = Gm), Pb.prototype.calcCenter = function() {
        for (var t3, e3 = this.geometries, n3 = 0, i3 = 0; i3 < e3.length; i3++) {
          var r3 = e3[i3], o3 = r3.exterior, o3 = o3 && o3.length;
          n3 < o3 && (t3 = r3, n3 = o3);
        }
        if (t3) {
          for (var a3 = t3.exterior, s3 = 0, l3 = 0, u3 = 0, h3 = a3.length, c3 = a3[h3 - 1][0], p3 = a3[h3 - 1][1], d3 = 0; d3 < h3; d3++) {
            var f3 = a3[d3][0], g3 = a3[d3][1], y3 = c3 * g3 - f3 * p3;
            s3 += y3, l3 += (c3 + f3) * y3, u3 += (p3 + g3) * y3, c3 = f3, p3 = g3;
          }
          return s3 ? [l3 / s3 / 3, u3 / s3 / 3, s3] : [a3[0][0] || 0, a3[0][1] || 0];
        }
        var m3 = this.getBoundingRect();
        return [m3.x + m3.width / 2, m3.y + m3.height / 2];
      }, Pb.prototype.getBoundingRect = function(e3) {
        var n3, i3, t3 = this._rect;
        return t3 && !e3 || (n3 = [1 / 0, 1 / 0], i3 = [-1 / 0, -1 / 0], F(this.geometries, function(t4) {
          "polygon" === t4.type ? Tb(t4.exterior, n3, i3, e3) : F(t4.points, function(t5) {
            Tb(t5, n3, i3, e3);
          });
        }), isFinite(n3[0]) && isFinite(n3[1]) && isFinite(i3[0]) && isFinite(i3[1]) || (n3[0] = n3[1] = i3[0] = i3[1] = 0), t3 = new Z(n3[0], n3[1], i3[0] - n3[0], i3[1] - n3[1]), e3) || (this._rect = t3), t3;
      }, Pb.prototype.contain = function(t3) {
        var e3 = this.getBoundingRect(), n3 = this.geometries;
        if (e3.contain(t3[0], t3[1]))
          t:
            for (var i3 = 0, r3 = n3.length; i3 < r3; i3++) {
              var o3 = n3[i3];
              if ("polygon" === o3.type) {
                var a3 = o3.exterior, s3 = o3.interiors;
                if (wb(a3, t3[0], t3[1])) {
                  for (var l3 = 0; l3 < (s3 ? s3.length : 0); l3++)
                    if (wb(s3[l3], t3[0], t3[1]))
                      continue t;
                  return true;
                }
              }
            }
        return false;
      }, Pb.prototype.transformTo = function(t3, e3, n3, i3) {
        for (var r3 = this.getBoundingRect(), o3 = r3.width / r3.height, o3 = (n3 ? i3 = i3 || n3 / o3 : n3 = o3 * i3, new Z(t3, e3, n3, i3)), a3 = r3.calculateTransform(o3), s3 = this.geometries, l3 = 0; l3 < s3.length; l3++) {
          var u3 = s3[l3];
          "polygon" === u3.type ? (Mb(u3.exterior, a3), F(u3.interiors, function(t4) {
            Mb(t4, a3);
          })) : F(u3.points, function(t4) {
            Mb(t4, a3);
          });
        }
        (r3 = this._rect).copy(o3), this._center = [r3.x + r3.width / 2, r3.y + r3.height / 2];
      }, Pb.prototype.cloneShallow = function(t3) {
        t3 = new Pb(t3 = null == t3 ? this.name : t3, this.geometries, this._center);
        return t3._rect = this._rect, t3.transformTo = null, t3;
      }, Pb);
      function Pb(t3, e3, n3) {
        t3 = Cb.call(this, t3) || this;
        return t3.type = "geoJSON", t3.geometries = e3, t3._center = n3 && [n3[0], n3[1]], t3;
      }
      function Ob(t3, e3) {
        t3 = kb.call(this, t3) || this;
        return t3.type = "geoSVG", t3._elOnlyForCalculate = e3, t3;
      }
      function Rb(t3, e3, n3) {
        for (var i3 = 0; i3 < t3.length; i3++)
          t3[i3] = Nb(t3[i3], e3[i3], n3);
      }
      function Nb(t3, e3, n3) {
        for (var i3 = [], r3 = e3[0], o3 = e3[1], a3 = 0; a3 < t3.length; a3 += 2) {
          var s3 = (s3 = t3.charCodeAt(a3) - 64) >> 1 ^ -(1 & s3), l3 = (l3 = t3.charCodeAt(a3 + 1) - 64) >> 1 ^ -(1 & l3);
          i3.push([(r3 = s3 += r3) / n3, (o3 = l3 += o3) / n3]);
        }
        return i3;
      }
      function zb(t3, o3) {
        var e3, n3, r3;
        return E(ft((t3 = (e3 = t3).UTF8Encoding ? (null == (r3 = (n3 = e3).UTF8Scale) && (r3 = 1024), F(n3.features, function(t4) {
          var e4 = t4.geometry, n4 = e4.encodeOffsets, i3 = e4.coordinates;
          if (n4)
            switch (e4.type) {
              case "LineString":
                e4.coordinates = Nb(i3, n4, r3);
                break;
              case "Polygon":
              case "MultiLineString":
                Rb(i3, n4, r3);
                break;
              case "MultiPolygon":
                F(i3, function(t5, e5) {
                  return Rb(t5, n4[e5], r3);
                });
            }
        }), n3.UTF8Encoding = false, n3) : e3).features, function(t4) {
          return t4.geometry && t4.properties && 0 < t4.geometry.coordinates.length;
        }), function(t4) {
          var e4 = t4.properties, n4 = t4.geometry, i3 = [];
          switch (n4.type) {
            case "Polygon":
              var r4 = n4.coordinates;
              i3.push(new Db(r4[0], r4.slice(1)));
              break;
            case "MultiPolygon":
              F(n4.coordinates, function(t5) {
                t5[0] && i3.push(new Db(t5[0], t5.slice(1)));
              });
              break;
            case "LineString":
              i3.push(new Ab([n4.coordinates]));
              break;
            case "MultiLineString":
              i3.push(new Ab(n4.coordinates));
          }
          t4 = new Lb(e4[o3 || "name"], i3, e4.cp);
          return t4.properties = e4, t4;
        });
      }
      u(Ob, kb = Gm), Ob.prototype.calcCenter = function() {
        for (var t3 = this._elOnlyForCalculate, e3 = t3.getBoundingRect(), e3 = [e3.x + e3.width / 2, e3.y + e3.height / 2], n3 = Fe(Sb), i3 = t3; i3 && !i3.isGeoSVGGraphicRoot; )
          He(n3, i3.getLocalTransform(), n3), i3 = i3.parent;
        return Ye(n3, n3), le(e3, e3, n3), e3;
      };
      var Rd = Object.freeze({ __proto__: null, MAX_SAFE_INTEGER: ya, asc: pa, getPercentWithPrecision: function(t3, e3, n3) {
        return t3[e3] && ga(t3, n3)[e3] || 0;
      }, getPixelPrecision: function(t3, e3) {
        return t3 = na(oa(t3[1] - t3[0]) / aa), e3 = ea(oa(ta(e3[1] - e3[0])) / aa), t3 = Qo(Jo(-t3 + e3, 0), $o), isFinite(t3) ? t3 : $o;
      }, getPrecision: da, getPrecisionSafe: fa, isNumeric: Ia, isRadianAroundZero: va, linearMap: ua, nice: Ma, numericToNumber: Ta, parseDate: xa, parsePercent: ha, quantile: function(t3, e3) {
        var e3 = (t3.length - 1) * e3 + 1, n3 = na(e3), i3 = +t3[n3 - 1];
        return (e3 = e3 - n3) ? i3 + e3 * (t3[n3] - i3) : i3;
      }, quantity: ba, quantityExponent: wa, reformIntervals: function(t3) {
        t3.sort(function(t4, e4) {
          return function t5(e5, n4, i4) {
            return e5.interval[i4] < n4.interval[i4] || e5.interval[i4] === n4.interval[i4] && (e5.close[i4] - n4.close[i4] == (i4 ? -1 : 1) || !i4 && t5(e5, n4, 1));
          }(t4, e4, 0) ? -1 : 1;
        });
        for (var e3 = -1 / 0, n3 = 1, i3 = 0; i3 < t3.length; ) {
          for (var r3 = t3[i3].interval, o3 = t3[i3].close, a3 = 0; a3 < 2; a3++)
            r3[a3] <= e3 && (r3[a3] = e3, o3[a3] = a3 ? 1 : 1 - n3), e3 = r3[a3], n3 = o3[a3];
          r3[0] === r3[1] && o3[0] * o3[1] != 1 ? t3.splice(i3, 1) : i3++;
        }
        return t3;
      }, remRadian: ma, round: function(t3, e3, n3) {
        return C(t3, e3 = null == e3 ? 10 : e3, n3);
      } }), Id = Object.freeze({ __proto__: null, format: df, parse: xa, roundTime: gf }), ws = Object.freeze({ __proto__: null, Arc: ep, BezierCurve: $c, BoundingRect: Z, Circle: ac, CompoundPath: rp, Ellipse: hc, Group: Vo, Image: eu, IncrementalDisplayable: Tp, Line: Xc, LinearGradient: up, Polygon: zc, Polyline: Fc, RadialGradient: ap, Rect: uu, Ring: Lc, Sector: Cc, Text: gu, clipPointsByRect: function(t3, n3) {
        return E(t3, function(t4) {
          var e3 = t4[0], e3 = Jo(e3, n3.x), t4 = (e3 = Qo(e3, n3.x + n3.width), t4[1]), t4 = Jo(t4, n3.y);
          return [e3, Qo(t4, n3.y + n3.height)];
        });
      }, clipRectByRect: function(t3, e3) {
        var n3 = Jo(t3.x, e3.x), i3 = Qo(t3.x + t3.width, e3.x + e3.width), r3 = Jo(t3.y, e3.y), t3 = Qo(t3.y + t3.height, e3.y + e3.height);
        if (n3 <= i3 && r3 <= t3)
          return { x: n3, y: r3, width: i3 - n3, height: t3 - r3 };
      }, createIcon: $p, extendPath: function(t3, e3) {
        return Hp(t3, e3);
      }, extendShape: function(t3) {
        return ql.extend(t3);
      }, getShapeClass: function(t3) {
        if (zp.hasOwnProperty(t3))
          return zp[t3];
      }, getTransform: function(t3, e3) {
        for (var n3 = Fe([]); t3 && t3 !== e3; )
          He(n3, t3.getLocalTransform(), n3), t3 = t3.parent;
        return n3;
      }, initProps: Ap, makeImage: Xp, makePath: Up, mergePath: qp, registerShape: Wp, resizePath: Zp, updateProps: Dp }), Pd = Object.freeze({ __proto__: null, addCommas: Df, capitalFirst: function(t3) {
        return t3 && t3.charAt(0).toUpperCase() + t3.substr(1);
      }, encodeHTML: Te, formatTime: function(t3, e3, n3) {
        "week" !== t3 && "month" !== t3 && "quarter" !== t3 && "half-year" !== t3 && "year" !== t3 || (t3 = "MM-dd\nyyyy");
        var i3 = (e3 = xa(e3))[(n3 = n3 ? "getUTC" : "get") + "FullYear"](), r3 = e3[n3 + "Month"]() + 1, o3 = e3[n3 + "Date"](), a3 = e3[n3 + "Hours"](), s3 = e3[n3 + "Minutes"](), l3 = e3[n3 + "Seconds"](), e3 = e3[n3 + "Milliseconds"]();
        return t3 = t3.replace("MM", cf(r3, 2)).replace("M", r3).replace("yyyy", i3).replace("yy", cf(i3 % 100 + "", 2)).replace("dd", cf(o3, 2)).replace("d", o3).replace("hh", cf(a3, 2)).replace("h", a3).replace("mm", cf(s3, 2)).replace("m", s3).replace("ss", cf(l3, 2)).replace("s", l3).replace("SSS", cf(e3, 3));
      }, formatTpl: Of, getTextRect: function(t3, e3, n3, i3, r3, o3, a3, s3) {
        return new gu({ style: { text: t3, font: e3, align: n3, verticalAlign: i3, padding: r3, rich: o3, overflow: a3 ? "truncate" : null, lineHeight: s3 } }).getBoundingRect();
      }, getTooltipMarker: function(t3, e3) {
        var n3 = (t3 = W(t3) ? { color: t3, extraCssText: e3 } : t3 || {}).color, i3 = t3.type, r3 = (e3 = t3.extraCssText, t3.renderMode || "html");
        return n3 ? "html" === r3 ? "subItem" === i3 ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Te(n3) + ";" + (e3 || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + Te(n3) + ";" + (e3 || "") + '"></span>' : { renderMode: r3, content: "{" + (t3.markerId || "markerX") + "|}  ", style: "subItem" === i3 ? { width: 4, height: 4, borderRadius: 2, backgroundColor: n3 } : { width: 10, height: 10, borderRadius: 5, backgroundColor: n3 } } : "";
      }, normalizeCssArray: Lf, toCamelCase: function(t3, e3) {
        return t3 = (t3 || "").toLowerCase().replace(/-(.)/g, function(t4, e4) {
          return e4.toUpperCase();
        }), t3 = e3 ? t3 && t3.charAt(0).toUpperCase() + t3.slice(1) : t3;
      }, truncateText: function(t3, e3, n3, i3, r3) {
        var o3 = {};
        return Ds(o3, t3, e3, n3, i3, r3), o3.text;
      } }), kd = Object.freeze({ __proto__: null, bind: y, clone: _, curry: yt, defaults: B, each: F, extend: V, filter: ft, indexOf: L, inherits: ht, isArray: G, isFunction: H, isObject: X, isString: W, map: E, merge: d, reduce: dt }), Bb = i(), Eb = i(), Vb = { estimate: 1, determine: 2 };
      function Fb(t3) {
        return { out: { noPxChangeTryDetermine: [] }, kind: t3 };
      }
      function Gb(n3, t3) {
        var i3, r3, o3, e3, a3 = n3.getLabelModel().get("customValues");
        return a3 ? { labels: E(Wb(a3, i3 = n3.scale), function(t4, e4) {
          return { formattedLabel: kx(n3)(t4, e4), rawLabel: i3.getLabel(t4), tick: t4 };
        }) } : "category" === n3.type ? (a3 = t3, e3 = (t3 = n3).getLabelModel(), a3 = Ub(t3, e3, a3), !e3.get("show") || t3.scale.isBlank() ? { labels: [] } : a3) : (e3 = (r3 = n3).scale.getTicks(), o3 = kx(r3), { labels: E(e3, function(t4, e4) {
          return { formattedLabel: o3(t4, e4), rawLabel: r3.scale.getLabel(t4), tick: t4 };
        }) });
      }
      function Hb(t3, e3, n3) {
        var i3, r3, o3, a3, s3 = t3.scale, l3 = t3.getTickModel().get("customValues");
        return l3 ? { ticks: Wb(l3, s3) } : "category" === t3.type ? (l3 = e3, t3 = Xb(e3 = t3), o3 = Ax(l3), (a3 = Zb(t3, o3)) || (l3.get("show") && !e3.scale.isBlank() || (i3 = []), i3 = H(o3) ? Jb(e3, o3, true) : "auto" === o3 ? (a3 = Ub(e3, e3.getLabelModel(), Fb(Vb.determine)), r3 = a3.labelCategoryInterval, E(a3.labels, function(t4) {
          return t4.tick;
        })) : Jb(e3, r3 = o3, true), jb(t3, o3, { ticks: i3, tickCategoryInterval: r3 }))) : { ticks: s3.getTicks(n3) };
      }
      function Wb(t3, e3) {
        var n3 = e3.getExtent(), i3 = [];
        return F(t3, function(t4) {
          (t4 = e3.parse(t4)) >= n3[0] && t4 <= n3[1] && i3.push(t4);
        }), os(i3, ss, null), pa(i3), E(i3, function(t4) {
          return { value: t4 };
        });
      }
      function Ub(t3, e3, n3) {
        var i3, r3 = Yb(t3), o3 = Ax(e3), e3 = n3.kind === Vb.estimate;
        if (!e3) {
          var a3 = Zb(r3, o3);
          if (a3)
            return a3;
        }
        var s3 = { labels: H(o3) ? Jb(t3, o3, false) : Jb(t3, i3 = "auto" === o3 ? function(t4, e4) {
          {
            var n4;
            if (e4.kind === Vb.estimate)
              return n4 = t4.calculateCategoryInterval(e4), e4.out.noPxChangeTryDetermine.push(function() {
                return Eb(t4).autoInterval = n4, true;
              }), n4;
          }
          var i4 = Eb(t4).autoInterval;
          return null != i4 ? i4 : Eb(t4).autoInterval = t4.calculateCategoryInterval(e4);
        }(t3, n3) : o3, false), labelCategoryInterval: i3 };
        return e3 ? n3.out.noPxChangeTryDetermine.push(function() {
          return jb(r3, o3, s3), true;
        }) : jb(r3, o3, s3), s3;
      }
      var Xb = qb("axisTick"), Yb = qb("axisLabel");
      function qb(e3) {
        return function(t3) {
          return Eb(t3)[e3] || (Eb(t3)[e3] = { list: [] });
        };
      }
      function Zb(t3, e3) {
        for (var n3 = 0; n3 < t3.list.length; n3++)
          if (t3.list[n3].key === e3)
            return t3.list[n3].value;
      }
      function jb(t3, e3, n3) {
        return t3.list.push({ key: e3, value: n3 }), n3;
      }
      function Kb(t3, e3) {
        var n3 = e3.kind, i3 = (a3 = (o3 = t3).getLabelModel(), { axisRotate: o3.getRotate ? o3.getRotate() : o3.isHorizontal && !o3.isHorizontal() ? 90 : 0, labelRotate: a3.get("rotate") || 0, font: a3.getFont() }), r3 = kx(t3), o3 = (i3.axisRotate - i3.labelRotate) / 180 * Math.PI, a3 = t3.scale, s3 = a3.getExtent(), a3 = a3.count();
        if (s3[1] - s3[0] < 1)
          return 0;
        for (var l3 = 1, u3 = (40 < a3 && (l3 = Math.max(1, Math.floor(a3 / 40))), s3[0]), h3 = t3.dataToCoord(u3 + 1) - t3.dataToCoord(u3), c3 = Math.abs(h3 * Math.cos(o3)), h3 = Math.abs(h3 * Math.sin(o3)), p3 = 0, d3 = 0; u3 <= s3[1]; u3 += l3)
          var f3 = function(t4, e4, n4, i4) {
            var r4 = ((t4 || "") + "").split("\n");
            if (1 === r4.length)
              return mo(r4[0], e4, n4, i4);
            for (var o4 = new Z(0, 0, 0, 0), a4 = 0; a4 < r4.length; a4++) {
              var s4 = mo(r4[a4], e4, n4, i4);
              0 === a4 ? o4.copy(s4) : o4.union(s4);
            }
            return o4;
          }(r3({ value: u3 }), i3.font, "center", "top"), g3 = 1.3 * f3.width, f3 = 1.3 * f3.height, p3 = Math.max(p3, g3, 7), d3 = Math.max(d3, f3, 7);
        var o3 = p3 / c3, c3 = d3 / h3, h3 = (isNaN(o3) && (o3 = 1 / 0), isNaN(c3) && (c3 = 1 / 0), Math.max(0, Math.floor(Math.min(o3, c3))));
        return n3 === Vb.estimate ? (e3.out.noPxChangeTryDetermine.push(y($b, null, t3, h3, a3)), h3) : null != (o3 = Qb(t3, h3, a3)) ? o3 : h3;
      }
      function $b(t3, e3, n3) {
        return null == Qb(t3, e3, n3);
      }
      function Qb(t3, e3, n3) {
        var i3 = Bb(t3.model), t3 = t3.getExtent(), r3 = i3.lastAutoInterval, o3 = i3.lastTickCount;
        if (null != r3 && null != o3 && Math.abs(r3 - e3) <= 1 && Math.abs(o3 - n3) <= 1 && e3 < r3 && i3.axisExtent0 === t3[0] && i3.axisExtent1 === t3[1])
          return r3;
        i3.lastTickCount = n3, i3.lastAutoInterval = e3, i3.axisExtent0 = t3[0], i3.axisExtent1 = t3[1];
      }
      function Jb(t3, r3, o3) {
        var a3 = kx(t3), s3 = t3.scale, l3 = [], u3 = H(r3);
        return ex(s3, u3 ? 0 : r3, function(t4, e3) {
          var n3 = s3.getLabel(t4);
          if (u3) {
            var i3 = !!r3(t4.value, n3);
            if (t4.offInterval = !i3, !i3 && !e3)
              return;
          }
          l3.push(o3 ? t4 : { formattedLabel: a3(t4), rawLabel: n3, tick: t4 });
        }), l3;
      }
      var tw = 0.8;
      function ew(t3, e3) {
        var n3, i3, r3, o3, a3, s3, l3 = { w: NaN, w2: NaN }, u3 = t3.scale, h3 = (e3 = e3 || {}).fromStat, e3 = e3.min, c3 = (c3 = G1(c3 = u3, z1))[1] - c3[0], p3 = (Da(c3) || (c3 = NaN), t3.getExtent()), p3 = ta(p3[1] - p3[0]);
        return j1(u3) ? (u3 = l3, o3 = c3, a3 = p3, r3 = (r3 = t3).onBand, 0 === (s3 = o3 + (r3 ? 1 : 0)) && (s3 = 1), u3.w = a3 / s3, !r3 && o3 && a3 && (u3.w2 = u3.w * o3 / a3)) : h3 && (s3 = l3, r3 = t3, u3 = c3, o3 = p3, n3 = false, i3 = -1 / 0, F((a3 = h3).key ? [function(t4, e4) {
          return Yx(Ux(t4, e4));
        }(r3, a3.key)] : function(t4, n4) {
          var i4 = [];
          return Xx(t4.model.ecModel, function(t5) {
            for (var e4 = 0; e4 < n4.length; e4++)
              n4[e4] && t5.serByIdx[n4[e4].seriesIndex] && i4.push(Yx(t5));
          }), i4;
        }(r3, a3.sers || []), function(t4) {
          t4 = t4.liPosMinGap;
          null != t4 && (0 < t4 ? (i3 < t4 && (i3 = t4), n3 = false) : t4 === Gx && (n3 = true));
        }), Da(u3) && 0 < u3 && Da(i3) ? (s3.w = o3 / u3 * i3, s3.w2 = i3) : n3 && (s3.w = o3 * tw, s3.w2 = s3.w * u3 / o3)), null != e3 && (l3.w = Da(l3.w) ? Jo(e3, l3.w) : e3), l3;
      }
      var nw = [0, 1], Hm = (iw.prototype.contain = function(t3) {
        var e3 = this._extent, n3 = Math.min(e3[0], e3[1]), e3 = Math.max(e3[0], e3[1]);
        return n3 <= t3 && t3 <= e3;
      }, iw.prototype.containData = function(t3) {
        return this.scale.contain(this.scale.parse(t3));
      }, iw.prototype.getExtent = function() {
        return this._extent.slice();
      }, iw.prototype.setExtent = function(t3, e3) {
        var n3 = this._extent;
        n3[0] = t3, n3[1] = e3;
      }, iw.prototype.dataToCoord = function(t3, e3) {
        var n3 = this.scale;
        return ua(t3 = n3.normalize(n3.parse(t3)), nw, rw(this), e3);
      }, iw.prototype.coordToData = function(t3, e3) {
        t3 = ua(t3, rw(this), nw, e3);
        return this.scale.scale(t3);
      }, iw.prototype.pointToData = function(t3, e3) {
      }, iw.prototype.getTicksCoords = function(t3) {
        var e3 = (t3 = t3 || {}).tickModel || this.getTickModel(), t3 = E(Hb(this, e3, { breakTicks: t3.breakTicks, pruneByBreak: t3.pruneByBreak }).ticks, function(t4) {
          return { coord: this.dataToCoord(Rx(this.scale, t4)), tick: t4 };
        }, this), n3 = function(t4, e4, n4) {
          var i3 = e4.length;
          if (!t4.onBand || n4 || !i3)
            return false;
          var r3 = ew(t4).w;
          if (!r3)
            return false;
          F(e4, function(t5) {
            t5.coord -= r3 / 2;
          });
          n4 = t4.scale.getExtent(), t4 = e4[i3 - 1];
          t4.tick.offInterval && e4.pop();
          return e4.push({ coord: t4.coord + r3, tick: { value: n4[1] + 1 } }), true;
        }(this, t3, e3.get("alignWithLabel"));
        return E(t3, function(t4) {
          return { coord: t4.coord, tickValue: t4.tick.value, onBand: n3 };
        });
      }, iw.prototype.getMinorTicksCoords = function() {
        var t3;
        return j1(this.scale) ? [] : (t3 = this.model.getModel("minorTick").get("splitNumber"), E(this.scale.getMinorTicks(t3 = 0 < t3 && t3 < 100 ? t3 : 5), function(t4) {
          return E(t4, function(t5) {
            return { coord: this.dataToCoord(t5), tickValue: t5 };
          }, this);
        }, this));
      }, iw.prototype.getViewLabels = function(t3) {
        return Gb(this, t3 = t3 || Fb(Vb.determine)).labels;
      }, iw.prototype.getLabelModel = function() {
        return this.model.getModel("axisLabel");
      }, iw.prototype.getTickModel = function() {
        return this.model.getModel("axisTick");
      }, iw.prototype.getBandWidth = function() {
        return ew(this, { min: 1 }).w;
      }, iw.prototype.calculateCategoryInterval = function(t3) {
        return Kb(this, t3 = t3 || Fb(Vb.determine));
      }, iw);
      function iw(t3, e3, n3) {
        this.onBand = false, this.inverse = false, this.dim = t3, this.scale = e3, this._extent = n3 || [0, 0];
      }
      function rw(t3) {
        var e3 = t3.getExtent();
        return t3.onBand && (t3 = (e3[1] - e3[0]) / t3.scale.count() / 2, e3[0] += t3, e3[1] -= t3), e3;
      }
      var ow = 2 * Math.PI, aw = Dl.CMD, sw = ["top", "right", "bottom", "left"];
      function lw(t3, e3, n3, i3, r3, o3, a3, s3) {
        var l3 = r3 - t3, u3 = o3 - e3, n3 = n3 - t3, i3 = i3 - e3, h3 = Math.sqrt(n3 * n3 + i3 * i3), l3 = (l3 * (n3 /= h3) + u3 * (i3 /= h3)) / h3, u3 = (s3 && (l3 = Math.min(Math.max(l3, 0), 1)), a3[0] = t3 + (l3 *= h3) * n3), s3 = a3[1] = e3 + l3 * i3;
        return Math.sqrt((u3 - r3) * (u3 - r3) + (s3 - o3) * (s3 - o3));
      }
      function uw(t3, e3, n3, i3, r3, o3, a3) {
        n3 < 0 && (t3 += n3, n3 = -n3), i3 < 0 && (e3 += i3, i3 = -i3);
        n3 = t3 + n3, i3 = e3 + i3, t3 = a3[0] = Math.min(Math.max(r3, t3), n3), n3 = a3[1] = Math.min(Math.max(o3, e3), i3);
        return Math.sqrt((t3 - r3) * (t3 - r3) + (n3 - o3) * (n3 - o3));
      }
      var hw = [];
      function cw(t3, e3, n3) {
        for (var i3, r3, o3, a3, s3, l3, u3, h3, c3, p3 = 0, d3 = 0, f3 = 0, g3 = 0, y3 = 1 / 0, m3 = e3.data, v3 = t3.x, _3 = t3.y, x3 = 0; x3 < m3.length; ) {
          var b3 = m3[x3++], w3 = (1 === x3 && (f3 = p3 = m3[x3], g3 = d3 = m3[x3 + 1]), y3);
          switch (b3) {
            case aw.M:
              p3 = f3 = m3[x3++], d3 = g3 = m3[x3++];
              break;
            case aw.L:
              w3 = lw(p3, d3, m3[x3], m3[x3 + 1], v3, _3, hw, true), p3 = m3[x3++], d3 = m3[x3++];
              break;
            case aw.C:
              w3 = pi(p3, d3, m3[x3++], m3[x3++], m3[x3++], m3[x3++], m3[x3], m3[x3 + 1], v3, _3, hw), p3 = m3[x3++], d3 = m3[x3++];
              break;
            case aw.Q:
              w3 = mi(p3, d3, m3[x3++], m3[x3++], m3[x3], m3[x3 + 1], v3, _3, hw), p3 = m3[x3++], d3 = m3[x3++];
              break;
            case aw.A:
              var S3 = m3[x3++], M3 = m3[x3++], T3 = m3[x3++], I3 = m3[x3++], C3 = m3[x3++], k3 = m3[x3++], D3 = (x3 += 1, !!(1 - m3[x3++])), A3 = Math.cos(C3) * T3 + S3, L3 = Math.sin(C3) * I3 + M3;
              x3 <= 1 && (f3 = A3, g3 = L3), L3 = (A3 = C3) + k3, D3 = D3, a3 = (v3 - S3) * (o3 = I3) / T3 + S3, s3 = _3, l3 = hw, c3 = h3 = u3 = void 0, a3 -= i3 = S3, s3 -= r3 = M3, u3 = Math.sqrt(a3 * a3 + s3 * s3), h3 = (a3 /= u3) * o3 + i3, c3 = (s3 /= u3) * o3 + r3, w3 = Math.abs(A3 - L3) % ow < 1e-4 || ((L3 = D3 ? (D3 = A3, A3 = Pl(L3), Pl(D3)) : (A3 = Pl(A3), Pl(L3))) < A3 && (L3 += ow), (D3 = Math.atan2(s3, a3)) < 0 && (D3 += ow), A3 <= D3 && D3 <= L3) || A3 <= D3 + ow && D3 + ow <= L3 ? (l3[0] = h3, l3[1] = c3, u3 - o3) : (c3 = ((D3 = o3 * Math.cos(A3) + i3) - a3) * (D3 - a3) + ((h3 = o3 * Math.sin(A3) + r3) - s3) * (h3 - s3)) < (i3 = ((u3 = o3 * Math.cos(L3) + i3) - a3) * (u3 - a3) + ((A3 = o3 * Math.sin(L3) + r3) - s3) * (A3 - s3)) ? (l3[0] = D3, l3[1] = h3, Math.sqrt(c3)) : (l3[0] = u3, l3[1] = A3, Math.sqrt(i3)), p3 = Math.cos(C3 + k3) * T3 + S3, d3 = Math.sin(C3 + k3) * I3 + M3;
              break;
            case aw.R:
              w3 = uw(f3 = p3 = m3[x3++], g3 = d3 = m3[x3++], m3[x3++], m3[x3++], v3, _3, hw);
              break;
            case aw.Z:
              w3 = lw(p3, d3, f3, g3, v3, _3, hw, true), p3 = f3, d3 = g3;
          }
          w3 < y3 && (y3 = w3, n3.set(hw[0], hw[1]));
        }
        return y3;
      }
      var pw = new q(), dw = new q(), fw = new q(), gw = new q(), yw = new q();
      function mw(t3, e3) {
        if (t3) {
          var n3 = t3.getTextGuideLine(), i3 = t3.getTextContent();
          if (i3 && n3) {
            var r3 = t3.textGuideLineConfig || {}, o3 = [[0, 0], [0, 0], [0, 0]], a3 = r3.candidates || sw, s3 = i3.getBoundingRect().clone(), l3 = (s3.applyTransform(i3.getComputedTransform()), 1 / 0), u3 = r3.anchor, h3 = t3.getComputedTransform(), c3 = h3 && Ye([], h3), p3 = e3.get("length2") || 0;
            u3 && fw.copy(u3);
            for (var d3, f3 = 0; f3 < a3.length; f3++) {
              var g3 = a3[f3], y3 = (w3 = b3 = x3 = _3 = v3 = m3 = y3 = void 0, g3), m3 = 0, v3 = s3, _3 = pw, x3 = gw, b3 = v3.width, w3 = v3.height;
              switch (y3) {
                case "top":
                  _3.set(v3.x + b3 / 2, v3.y - m3), x3.set(0, -1);
                  break;
                case "bottom":
                  _3.set(v3.x + b3 / 2, v3.y + w3 + m3), x3.set(0, 1);
                  break;
                case "left":
                  _3.set(v3.x - m3, v3.y + w3 / 2), x3.set(-1, 0);
                  break;
                case "right":
                  _3.set(v3.x + b3 + m3, v3.y + w3 / 2), x3.set(1, 0);
              }
              q.scaleAndAdd(dw, pw, gw, p3), dw.transform(c3);
              g3 = t3.getBoundingRect(), g3 = u3 ? u3.distance(dw) : t3 instanceof ql ? cw(dw, t3.path, fw) : (y3 = fw, d3 = uw((d3 = g3).x, g3.y, g3.width, g3.height, dw.x, dw.y, hw), y3.set(hw[0], hw[1]), d3);
              g3 < l3 && (l3 = g3, dw.transform(h3), fw.transform(h3), fw.toArray(o3[0]), dw.toArray(o3[1]), pw.toArray(o3[2]));
            }
            xw(o3, e3.get("minTurnAngle")), n3.setShape({ points: o3 });
          }
        }
      }
      var vw = [], _w = new q();
      function xw(t3, e3) {
        var n3, i3;
        e3 <= 180 && 0 < e3 && (e3 = e3 / 180 * Math.PI, pw.fromArray(t3[0]), dw.fromArray(t3[1]), fw.fromArray(t3[2]), q.sub(gw, pw, dw), q.sub(yw, fw, dw), i3 = gw.len(), n3 = yw.len(), i3 < 1e-3 || n3 < 1e-3 || (gw.scale(1 / i3), yw.scale(1 / n3), i3 = gw.dot(yw), Math.cos(e3) < i3 && (n3 = lw(dw.x, dw.y, fw.x, fw.y, pw.x, pw.y, vw, false), _w.fromArray(vw), _w.scaleAndAdd(yw, n3 / Math.tan(Math.PI - e3)), i3 = fw.x !== dw.x ? (_w.x - dw.x) / (fw.x - dw.x) : (_w.y - dw.y) / (fw.y - dw.y), isNaN(i3) || (i3 < 0 ? q.copy(_w, dw) : 1 < i3 && q.copy(_w, fw), _w.toArray(t3[1])))));
      }
      function bw(t3, e3, n3, i3) {
        var r3 = "normal" === n3, n3 = r3 ? t3 : t3.ensureState(n3);
        n3.ignore = e3;
        e3 = true === (e3 = i3.get("smooth")) ? 0.3 : Math.max(+e3, 0) || 0, n3.shape = n3.shape || {}, n3.shape.smooth = e3, e3 = i3.getModel("lineStyle").getLineStyle();
        r3 ? t3.useStyle(e3) : n3.style = e3;
      }
      function ww(t3, e3) {
        var n3 = e3.smooth, i3 = e3.points;
        if (i3)
          if (t3.moveTo(i3[0][0], i3[0][1]), 0 < n3 && 3 <= i3.length) {
            var e3 = re(i3[0], i3[1]), r3 = re(i3[1], i3[2]);
            e3 && r3 ? (n3 = Math.min(e3, r3) * n3, e3 = se([], i3[1], i3[0], n3 / e3), n3 = se([], i3[1], i3[2], n3 / r3), r3 = se([], e3, n3, 0.5), t3.bezierCurveTo(e3[0], e3[1], e3[0], e3[1], r3[0], r3[1]), t3.bezierCurveTo(n3[0], n3[1], n3[0], n3[1], i3[2][0], i3[2][1])) : (t3.lineTo(i3[1][0], i3[1][1]), t3.lineTo(i3[2][0], i3[2][1]));
          } else
            for (var o3 = 1; o3 < i3.length; o3++)
              t3.lineTo(i3[o3][0], i3[o3][1]);
      }
      function Sw(t3, e3, n3) {
        var i3 = t3.getTextGuideLine(), r3 = t3.getTextContent();
        if (r3) {
          for (var o3 = e3.normal, a3 = o3.get("show"), s3 = r3.ignore, l3 = 0; l3 < ju.length; l3++) {
            var u3, h3 = ju[l3], c3 = e3[h3], p3 = "normal" === h3;
            c3 && (u3 = c3.get("show"), (p3 ? s3 : Y(r3.states[h3] && r3.states[h3].ignore, s3)) || !Y(u3, a3) ? ((u3 = p3 ? i3 : i3 && i3.states[h3]) && (u3.ignore = true), i3 && bw(i3, true, h3, c3)) : (i3 || (i3 = new Fc(), t3.setTextGuideLine(i3), p3 || !s3 && a3 || bw(i3, true, "normal", e3.normal), t3.stateProxy && (i3.stateProxy = t3.stateProxy)), bw(i3, false, h3, c3)));
          }
          i3 && (B(i3.style, n3), i3.style.fill = null, n3 = o3.get("showAbove"), (t3.textGuideLineConfig = t3.textGuideLineConfig || {}).showAbove = n3 || false, i3.buildPath = ww);
        } else
          i3 && t3.removeTextGuideLine();
      }
      function Mw(t3, e3) {
        for (var n3 = { normal: t3.getModel(e3 = e3 || "labelLine") }, i3 = 0; i3 < Zu.length; i3++) {
          var r3 = Zu[i3];
          n3[r3] = t3.getModel([r3, e3]);
        }
        return n3;
      }
      var Tw = ["label", "labelLine", "layoutOption", "priority", "defaultAttr", "marginForce", "minMarginForce", "marginDefault", "suggestIgnore"], Iw = 2, Cw = 1 | Iw;
      function kw(t3, e3, n3) {
        n3 = n3 || Cw, e3 ? t3.dirty |= n3 : t3.dirty &= ~n3;
      }
      function Dw(t3, e3) {
        return e3 = e3 || Cw, null == t3.dirty || t3.dirty & e3;
      }
      function Aw(t3) {
        if (t3)
          return Dw(t3) && Lw(t3, t3.label, t3), t3;
      }
      function Lw(t3, e3, n3) {
        var i3 = e3.getComputedTransform(), r3 = (t3.transform = ad(t3.transform, i3), t3.localRect = od(t3.localRect, e3.getBoundingRect())), o3 = e3.style, a3 = o3.margin, s3 = n3 && n3.marginForce, l3 = n3 && n3.minMarginForce, n3 = n3 && n3.marginDefault, u3 = o3.__marginType;
        null == u3 && n3 && (a3 = n3, u3 = wd.textMargin);
        for (var h3 = 0; h3 < 4; h3++)
          Pw[h3] = u3 === wd.minMargin && l3 && null != l3[h3] ? l3[h3] : s3 && null != s3[h3] ? s3[h3] : a3 ? a3[h3] : 0;
        u3 === wd.textMargin && Qp(r3, Pw, false, false);
        o3 = t3.rect = od(t3.rect, r3);
        i3 && o3.applyTransform(i3), u3 === wd.minMargin && Qp(o3, Pw, false, false), t3.axisAligned = rd(i3), (t3.label = t3.label || {}).ignore = e3.ignore, kw(t3, false), kw(t3, true, Iw);
      }
      var Pw = [0, 0, 0, 0];
      function Ow(t3, e3) {
        for (var n3 = 0; n3 < Tw.length; n3++) {
          var i3 = Tw[n3];
          null == t3[i3] && (t3[i3] = e3[i3]);
        }
        return Aw(t3);
      }
      function Rw(t3) {
        var e3 = t3.obb;
        return e3 && !Dw(t3, Iw) || (t3.obb = e3 = e3 || new bp(), e3.fromBoundingRect(t3.localRect, t3.transform), kw(t3, false, Iw)), e3;
      }
      function Nw(s3, t3, e3, n3, i3) {
        var l3 = s3.length, u3 = Bp[t3], h3 = Ep[t3];
        if (!(l3 < 2)) {
          s3.sort(function(t4, e4) {
            return t4.rect[u3] - e4.rect[u3];
          });
          for (var r3 = 0, o3 = false, a3 = 0, c3 = 0; c3 < l3; c3++) {
            var p3, d3 = s3[c3], f3 = d3.rect;
            (p3 = f3[u3] - r3) < 0 && (f3[u3] -= p3, d3.label[u3] -= p3, o3 = true), a3 += Math.max(-p3, 0), r3 = f3[u3] + f3[h3];
          }
          0 < a3 && i3 && b3(-a3 / l3, 0, l3);
          var g3, y3, m3 = s3[0], v3 = s3[l3 - 1];
          return _3(), g3 < 0 && w3(-g3, 0.8), y3 < 0 && w3(y3, 0.8), _3(), x3(g3, y3, 1), x3(y3, g3, -1), _3(), g3 < 0 && S3(-g3), y3 < 0 && S3(y3), o3;
        }
        function _3() {
          g3 = m3.rect[u3] - e3, y3 = n3 - v3.rect[u3] - v3.rect[h3];
        }
        function x3(t4, e4, n4) {
          t4 < 0 && (0 < (e4 = Math.min(e4, -t4)) ? (b3(e4 * n4, 0, l3), (e4 = e4 + t4) < 0 && w3(-e4 * n4, 1)) : w3(-t4 * n4, 1));
        }
        function b3(t4, e4, n4) {
          0 !== t4 && (o3 = true);
          for (var i4 = e4; i4 < n4; i4++) {
            var r4 = s3[i4];
            r4.rect[u3] += t4, r4.label[u3] += t4;
          }
        }
        function w3(t4, e4) {
          for (var n4 = [], i4 = 0, r4 = 1; r4 < l3; r4++) {
            var o4 = s3[r4 - 1].rect, o4 = Math.max(s3[r4].rect[u3] - o4[u3] - o4[h3], 0);
            n4.push(o4), i4 += o4;
          }
          if (i4) {
            var a4 = Math.min(Math.abs(t4) / i4, e4);
            if (0 < t4)
              for (r4 = 0; r4 < l3 - 1; r4++)
                b3(n4[r4] * a4, 0, r4 + 1);
            else
              for (r4 = l3 - 1; 0 < r4; r4--)
                b3(-(n4[r4 - 1] * a4), r4, l3);
          }
        }
        function S3(t4) {
          for (var e4 = t4 < 0 ? -1 : 1, n4 = (t4 = Math.abs(t4), Math.ceil(t4 / (l3 - 1))), i4 = 0; i4 < l3 - 1; i4++)
            if (0 < e4 ? b3(n4, 0, i4 + 1) : b3(-n4, l3 - i4 - 1, l3), (t4 -= n4) <= 0)
              return;
        }
      }
      function zw(t3) {
        var e3 = [];
        function n3(t4) {
          var e4;
          t4.ignore || null == (e4 = t4.ensureState("emphasis")).ignore && (e4.ignore = false), t4.ignore = true;
        }
        t3.sort(function(t4, e4) {
          return (e4.suggestIgnore ? 1 : 0) - (t4.suggestIgnore ? 1 : 0) || e4.priority - t4.priority;
        });
        for (var i3 = 0; i3 < t3.length; i3++) {
          var r3 = Aw(t3[i3]);
          if (!r3.label.ignore) {
            for (var o3 = r3.label, a3 = r3.labelLine, s3 = false, l3 = 0; l3 < e3.length; l3++)
              if (Bw(r3, e3[l3], null, { touchThreshold: 0.05 })) {
                s3 = true;
                break;
              }
            s3 ? (n3(o3), a3 && n3(a3)) : e3.push(r3);
          }
        }
      }
      function Bw(t3, e3, n3, i3) {
        return t3 && e3 && !(t3.label && t3.label.ignore || e3.label && e3.label.ignore) && t3.rect.intersect(e3.rect, n3, i3) && (t3.axisAligned && e3.axisAligned || Rw(t3).intersect(Rw(e3), n3, i3));
      }
      function Ew(t3, e3) {
        var n3 = t3.label, e3 = e3 && e3.getTextGuideLine();
        return { dataIndex: t3.dataIndex, dataType: t3.dataType, seriesIndex: t3.seriesModel.seriesIndex, text: t3.label.style.text, rect: t3.hostRect, labelRect: t3.rect, align: n3.style.align, verticalAlign: n3.style.verticalAlign, labelLinePoints: function(t4) {
          if (t4) {
            for (var e4 = [], n4 = 0; n4 < t4.length; n4++)
              e4.push(t4[n4].slice());
            return e4;
          }
        }(e3 && e3.shape.points) };
      }
      var Vw = ["align", "verticalAlign", "width", "height", "fontSize"], Fw = new oo(), Gw = i(), Hw = i();
      function Ww(t3, e3, n3) {
        for (var i3 = 0; i3 < n3.length; i3++) {
          var r3 = n3[i3];
          null != e3[r3] && (t3[r3] = e3[r3]);
        }
      }
      var Uw = ["x", "y", "rotation"], Xw = (Yw.prototype.clearLabels = function() {
        this._labelList = [], this._chartViewList = [];
      }, Yw.prototype._addLabel = function(t3, e3, n3, i3, r3) {
        var o3, a3 = i3.style, s3 = i3.__hostTarget.textConfig || {}, l3 = i3.getComputedTransform(), u3 = i3.getBoundingRect().plain(), l3 = (Z.applyTransform(u3, u3, l3), l3 ? Fw.setLocalTransform(l3) : (Fw.x = Fw.y = Fw.rotation = Fw.originX = Fw.originY = 0, Fw.scaleX = Fw.scaleY = 1), Fw.rotation = Pl(Fw.rotation), i3.__hostTarget), h3 = (l3 && (o3 = l3.getBoundingRect().plain(), h3 = l3.getComputedTransform(), Z.applyTransform(o3, o3, h3)), o3 && l3.getTextGuideLine());
        this._labelList.push({ label: i3, labelLine: h3, seriesModel: n3, dataIndex: t3, dataType: e3, layoutOptionOrCb: r3, layoutOption: null, rect: u3, hostRect: o3, priority: o3 ? o3.width * o3.height : 0, defaultAttr: { ignore: i3.ignore, labelGuideIgnore: h3 && h3.ignore, x: Fw.x, y: Fw.y, scaleX: Fw.scaleX, scaleY: Fw.scaleY, rotation: Fw.rotation, style: { x: a3.x, y: a3.y, align: a3.align, verticalAlign: a3.verticalAlign, width: a3.width, height: a3.height, fontSize: a3.fontSize }, cursor: i3.cursor, attachedPos: s3.position, attachedRot: s3.rotation } });
      }, Yw.prototype.addLabelsOfSeries = function(t3) {
        var n3 = this, i3 = (this._chartViewList.push(t3), t3.__model), r3 = i3.get("labelLayout");
        (H(r3) || O(r3).length) && t3.group.traverse(function(t4) {
          if (t4.ignore)
            return true;
          var e3 = t4.getTextContent(), t4 = j(t4);
          e3 && !e3.disableLabelLayout && n3._addLabel(t4.dataIndex, t4.dataType, i3, e3, r3);
        });
      }, Yw.prototype.updateLayoutConfig = function(t3) {
        var e3 = t3.getWidth(), n3 = t3.getHeight();
        for (var i3 = 0; i3 < this._labelList.length; i3++) {
          var r3 = this._labelList[i3], o3 = r3.label, a3 = o3.__hostTarget, s3 = r3.defaultAttr, l3 = void 0, l3 = H(r3.layoutOptionOrCb) ? r3.layoutOptionOrCb(Ew(r3, a3)) : r3.layoutOptionOrCb, u3 = (r3.layoutOption = l3 = l3 || {}, Math.PI / 180), h3 = (a3 && a3.setTextConfig({ local: false, position: null != l3.x || null != l3.y ? null : s3.attachedPos, rotation: null != l3.rotate ? l3.rotate * u3 : s3.attachedRot, offset: [l3.dx || 0, l3.dy || 0] }), false);
          null != l3.x ? (o3.x = ha(l3.x, e3), o3.setStyle("x", 0), h3 = true) : (o3.x = s3.x, o3.setStyle("x", s3.style.x)), null != l3.y ? (o3.y = ha(l3.y, n3), o3.setStyle("y", 0), h3 = true) : (o3.y = s3.y, o3.setStyle("y", s3.style.y)), l3.labelLinePoints && (c3 = a3.getTextGuideLine()) && (c3.setShape({ points: l3.labelLinePoints }), h3 = false), Gw(o3).needsUpdateLabelLine = h3, o3.rotation = null != l3.rotate ? l3.rotate * u3 : s3.rotation, o3.scaleX = s3.scaleX, o3.scaleY = s3.scaleY;
          for (var c3, p3 = 0; p3 < Vw.length; p3++) {
            var d3 = Vw[p3];
            o3.setStyle(d3, (null != l3[d3] ? l3 : s3.style)[d3]);
          }
          l3.draggable ? (o3.draggable = true, o3.cursor = "move", a3 && (c3 = r3.seriesModel, null != r3.dataIndex && (c3 = r3.seriesModel.getData(r3.dataType).getItemModel(r3.dataIndex)), o3.on("drag", function(t4, e4) {
            return function() {
              mw(t4, e4);
            };
          }(a3, c3.getModel("labelLine"))))) : (o3.off("drag"), o3.cursor = s3.cursor);
        }
      }, Yw.prototype.layout = function(t3) {
        for (var e3 = t3.getWidth(), t3 = t3.getHeight(), n3 = [], i3 = (F(this._labelList, function(t4) {
          t4.defaultAttr.ignore || n3.push(Ow({}, t4));
        }), ft(n3, function(t4) {
          return "shiftX" === t4.layoutOption.moveOverlap;
        })), r3 = ft(n3, function(t4) {
          return "shiftY" === t4.layoutOption.moveOverlap;
        }), i3 = (Nw(i3, 0, 0, e3), Nw(r3, 1, 0, t3), ft(n3, function(t4) {
          return t4.layoutOption.hideOverlap;
        })), o3 = i3, a3 = 0; a3 < o3.length; a3++) {
          var s3 = o3[a3], l3 = s3.defaultAttr, u3 = s3.labelLine;
          s3.label.attr("ignore", l3.ignore), u3 && u3.attr("ignore", l3.labelGuideIgnore);
        }
        zw(i3);
      }, Yw.prototype.processLabelsOverall = function() {
        var a3 = this;
        F(this._chartViewList, function(t3) {
          var i3 = t3.__model, r3 = t3.ignoreLabelLineUpdate, o3 = i3.isAnimationEnabled();
          t3.group.traverse(function(t4) {
            if (t4.ignore && !t4.forceLabelAnimation)
              return true;
            var e3 = !r3, n3 = t4.getTextContent();
            (e3 = !e3 && n3 ? Gw(n3).needsUpdateLabelLine : e3) && a3._updateLabelLine(t4, i3), o3 && a3._animateLabels(t4, i3);
          });
        });
      }, Yw.prototype._updateLabelLine = function(t3, e3) {
        var n3 = t3.getTextContent(), i3 = j(t3), r3 = i3.dataIndex;
        n3 && null != r3 && (e3 = (n3 = e3.getData(i3.dataType)).getItemModel(r3), i3 = {}, (r3 = n3.getItemVisual(r3, "style")) && (n3 = n3.getVisual("drawType"), i3.stroke = r3[n3]), r3 = e3.getModel("labelLine"), Sw(t3, Mw(e3), i3), mw(t3, r3));
      }, Yw.prototype._animateLabels = function(t3, e3) {
        var n3, i3, r3, o3, a3, s3 = t3.getTextContent(), l3 = t3.getTextGuideLine();
        !s3 || !t3.forceLabelAnimation && (s3.ignore || s3.invisible || t3.disableLabelAnimation || Lp(t3)) || (o3 = (r3 = Gw(s3)).oldLayout, n3 = (i3 = j(t3)).dataIndex, a3 = { x: s3.x, y: s3.y, rotation: s3.rotation }, i3 = e3.getData(i3.dataType), o3 ? (s3.attr(o3), (t3 = t3.prevStates) && (0 <= L(t3, "select") && s3.attr(r3.oldLayoutSelect), 0 <= L(t3, "emphasis")) && s3.attr(r3.oldLayoutEmphasis), Dp(s3, a3, e3, n3)) : (s3.attr(a3), xd(s3).valueAnimation || (t3 = Y(s3.style.opacity, 1), s3.style.opacity = 0, Ap(s3, { style: { opacity: t3 } }, e3, n3))), r3.oldLayout = a3, s3.states.select && (Ww(t3 = r3.oldLayoutSelect = {}, a3, Uw), Ww(t3, s3.states.select, Uw)), s3.states.emphasis && (Ww(t3 = r3.oldLayoutEmphasis = {}, a3, Uw), Ww(t3, s3.states.emphasis, Uw)), bd(s3, n3, i3, e3, e3)), !l3 || l3.ignore || l3.invisible || (o3 = (r3 = Hw(l3)).oldLayout, a3 = { points: l3.shape.points }, o3 ? (l3.attr({ shape: o3 }), Dp(l3, { shape: a3 }, e3)) : (l3.setShape(a3), l3.style.strokePercent = 0, Ap(l3, { style: { strokePercent: 1 } }, e3)), r3.oldLayout = a3);
      }, Yw);
      function Yw() {
        this._labelList = [], this._chartViewList = [];
      }
      var qw = i();
      function Zw(t3) {
        t3.registerUpdateLifecycle("series:beforeupdate", function(t4, e3, n3) {
          (qw(e3).labelManager || (qw(e3).labelManager = new Xw())).clearLabels();
        }), t3.registerUpdateLifecycle("series:layoutlabels", function(t4, e3, n3) {
          var i3 = qw(e3).labelManager;
          F(n3.updatedSeries, function(t5) {
            i3.addLabelsOfSeries(e3.getViewOfSeriesModel(t5));
          }), i3.updateLayoutConfig(e3), i3.layout(e3), i3.processLabelsOverall();
        });
      }
      function jw(t3, e3, n3) {
        var i3 = $.createCanvas(), r3 = e3.getWidth(), e3 = e3.getHeight(), o3 = i3.style;
        return o3 && (o3.position = "absolute", o3.left = "0", o3.top = "0", o3.width = r3 + "px", o3.height = e3 + "px", i3.setAttribute("data-zr-dom-id", t3)), i3.width = r3 * n3, i3.height = e3 * n3, i3;
      }
      function Kw(t3) {
        return !t3.__cursors.get(0);
      }
      function $w(t3) {
        t3 = t3.__cursors.get(0);
        return { startIdx: t3 ? t3.startIdx : 0, endIdx: t3 ? t3.endIdx : 0 };
      }
      _b(Zw);
      u(tS, Qw = ge), tS.prototype.afterBrush = function() {
        this.__prevIdx = $w(this);
      }, tS.prototype.initContext = function() {
        this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
      }, tS.prototype.setUnpainted = function() {
        this.__firstTimePaint = true;
      }, tS.prototype.createBackBuffer = function() {
        var t3 = this.dpr;
        this.domBack = jw("back-" + this.id, this.painter, t3), this.ctxBack = this.domBack.getContext("2d"), 1 !== t3 && this.ctxBack.scale(t3, t3);
      }, tS.prototype.createRepaintRects = function(t3, e3, n3, i3) {
        if (this.__firstTimePaint)
          return this.__firstTimePaint = false, null;
        var l3 = [], u3 = this.maxRepaintRectCount, h3 = false, c3 = new Z(0, 0, 0, 0);
        function r3(t4) {
          if (t4.isFinite() && !t4.isZero())
            if (0 === l3.length)
              (e4 = new Z(0, 0, 0, 0)).copy(t4), l3.push(e4);
            else {
              for (var e4, n4 = false, i4 = 1 / 0, r4 = 0, o4 = 0; o4 < l3.length; ++o4) {
                var a4 = l3[o4];
                if (a4.intersect(t4)) {
                  var s4 = new Z(0, 0, 0, 0);
                  s4.copy(a4), s4.union(t4), l3[o4] = s4, n4 = true;
                  break;
                }
                h3 && (c3.copy(t4), c3.union(a4), s4 = t4.width * t4.height, a4 = a4.width * a4.height, (a4 = c3.width * c3.height - s4 - a4) < i4) && (i4 = a4, r4 = o4);
              }
              h3 && (l3[r4].union(t4), n4 = true), n4 || ((e4 = new Z(0, 0, 0, 0)).copy(t4), l3.push(e4)), h3 = h3 || l3.length >= u3;
            }
        }
        for (var o3, a3 = $w(this), s3 = a3.startIdx; s3 < a3.endIdx; ++s3)
          (d3 = t3[s3]) && (g3 = d3.shouldBePainted(n3, i3, true, true), (f3 = d3.__isRendered && (d3.__dirty & Hn || !g3) ? d3.getPrevPaintRect() : null) && r3(f3), o3 = g3 && (d3.__dirty & Hn || !d3.__isRendered) ? d3.getPaintRect() : null) && r3(o3);
        for (var p3 = this.__prevIdx, s3 = p3.startIdx; s3 < p3.endIdx; ++s3) {
          var d3, f3, g3 = (d3 = e3[s3]) && d3.shouldBePainted(n3, i3, true, true);
          !d3 || g3 && d3.__zr || !d3.__isRendered || (f3 = d3.getPrevPaintRect()) && r3(f3);
        }
        do {
          for (var y3 = false, s3 = 0; s3 < l3.length; )
            if (l3[s3].isZero())
              l3.splice(s3, 1);
            else {
              for (var m3 = s3 + 1; m3 < l3.length; )
                l3[s3].intersect(l3[m3]) ? (y3 = true, l3[s3].union(l3[m3]), l3.splice(m3, 1)) : m3++;
              s3++;
            }
        } while (y3);
        return this._paintRects = l3;
      }, tS.prototype.debugGetPaintRects = function() {
        return (this._paintRects || []).slice();
      }, tS.prototype.resize = function(t3, e3) {
        var n3 = this.dpr, i3 = this.dom, r3 = i3.style, o3 = this.domBack;
        r3 && (r3.width = t3 + "px", r3.height = e3 + "px"), i3.width = t3 * n3, i3.height = e3 * n3, o3 && (o3.width = t3 * n3, o3.height = e3 * n3, 1 !== n3) && this.ctxBack.scale(n3, n3);
      }, tS.prototype.clear = function(t3, o3, e3) {
        var n3 = this.dom, a3 = this.ctx, i3 = n3.width, r3 = n3.height, s3 = (o3 = o3 || this.clearColor, this.motionBlur && !t3), l3 = this.lastFrameAlpha, u3 = this.dpr, h3 = this, c3 = (s3 && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(n3, 0, 0, i3 / u3, r3 / u3)), this.domBack);
        function p3(t4, e4, n4, i4) {
          var r4;
          a3.clearRect(t4, e4, n4, i4), o3 && "transparent" !== o3 && (r4 = void 0, bt(o3) ? (r4 = (o3.global || o3.__width === n4 && o3.__height === i4) && o3.__canvasGradient || Qm(a3, o3, { x: 0, y: 0, width: n4, height: i4 }), o3.__canvasGradient = r4, o3.__width = n4, o3.__height = i4) : wt(o3) && (o3.scaleX = o3.scaleX || u3, o3.scaleY = o3.scaleY || u3, r4 = lv(a3, o3, { dirty: function() {
            h3.setUnpainted(), h3.painter.refresh();
          } })), a3.save(), a3.fillStyle = r4 || o3, a3.fillRect(t4, e4, n4, i4), a3.restore()), s3 && (a3.save(), a3.globalAlpha = l3, a3.drawImage(c3, t4, e4, n4, i4), a3.restore());
        }
        !e3 || s3 ? p3(0, 0, i3, r3) : e3.length && F(e3, function(t4) {
          p3(t4.x * u3, t4.y * u3, t4.width * u3, t4.height * u3);
        });
      };
      var Qw, Jw = tS;
      function tS(t3, e3, n3) {
        var i3, r3 = Qw.call(this) || this, t3 = (r3.motionBlur = false, r3.lastFrameAlpha = 0.7, r3.dpr = 1, r3.virtual = false, r3.config = {}, r3.zlevel = 0, r3.zlevel2 = 0, r3.maxRepaintRectCount = 5, r3.__dirty = true, r3.__firstTimePaint = true, r3.__prevIdx = { startIdx: 0, endIdx: 0 }, n3 = n3 || Kr, "string" == typeof t3 ? i3 = jw(t3, e3, n3) : X(t3) && (t3 = (i3 = t3).id), r3.id = t3, (r3.dom = i3).style);
        return t3 && (Gt(i3), i3.onselectstart = function() {
          return false;
        }, t3.padding = "0", t3.margin = "0", t3.borderWidth = "0"), r3.painter = e3, r3.dpr = n3, r3;
      }
      var eS = 314159, nS = void 0;
      function iS(t3, e3, n3, i3) {
        t3 = new Jw(t3, e3, e3.dpr);
        return t3.zlevel = n3, t3.zlevel2 = i3, t3.__builtin__ = true, rS(t3), t3;
      }
      function rS(t3) {
        t3.__cursorStack = [], t3.__cursors = I();
      }
      function oS(t3, e3) {
        for (var n3 = t3.__cursorStack, i3 = 0; i3 < n3.length; i3++)
          e3(t3.__cursors.get(n3[i3]));
      }
      function aS(t3, e3) {
        t3 = t3.layers;
        return t3[e3] || (t3[e3] = new Array(3));
      }
      function sS(t3, e3, n3) {
        for (var i3 = t3.layerStack, r3 = 0; r3 < i3.length; r3++) {
          var o3 = i3[r3].zl, a3 = i3[r3].zl2, s3 = t3.layers[o3][a3];
          n3 && (1 & n3 && !s3.__builtin__ || 2 & n3 && s3.__builtin__ || 4 & n3 && s3 === t3.hoverlayer) || e3(s3, o3, a3, r3);
        }
      }
      g.prototype.getType = function() {
        return "canvas";
      }, g.prototype.isSingleCanvas = function() {
        return this._singleCanvas;
      }, g.prototype.getViewportRoot = function() {
        return this._domRoot;
      }, g.prototype.getViewportRootOffset = function() {
        var t3 = this.getViewportRoot();
        if (t3)
          return { offsetLeft: t3.offsetLeft || 0, offsetTop: t3.offsetTop || 0 };
      }, g.prototype.refresh = function(t3) {
        var r3, t3 = t3 && !X(t3) ? { paintAll: !!t3 } : t3 || {}, e3 = Y(t3.refresh, true), n3 = Y(t3.refreshHover, false);
        return n3 && (this._hoverLayerDirty = 2), e3 ? (e3 = this.storage.getDisplayList(true), t3 = (this._updateLayerStatus(e3, t3.paintAll), this._redrawId = Math.random(), this._prevDisplayList), r3 = (this._paintList(e3, t3, this._redrawId), this._backgroundColor), sS(this._i, function(t4, e4, n4, i3) {
          t4.refresh && t4.refresh(0 === i3 ? r3 : null);
        }, 2), this._opts.useDirtyRect && (this._prevDisplayList = e3.slice())) : n3 && this._paintHoverList(this.storage.getDisplayList(false)), this;
      }, g.prototype._paintHoverList = function(t3) {
        var e3 = this._i.hoverlayer, n3 = this._hoverLayerDirty;
        if (n3 !== (this._hoverLayerDirty = nS) && (e3 = e3 || 2 !== n3 ? e3 : this._i.hoverlayer = this._ensureLayer(1e5))) {
          e3.clear();
          for (var i3, r3 = { inHover: true, viewWidth: this._width, viewHeight: this._height, beforeBrushParam: {} }, o3 = 0, a3 = t3.length; o3 < a3; o3++) {
            var s3, l3, u3 = t3[o3];
            u3.__inHover && (i3 || (i3 = e3.ctx).save(), l3 = void 0, (s3 = u3.__hoverStyle) && (l3 = u3.style, u3.style = s3), xv(i3, u3, r3), s3) && (u3.style = l3);
          }
          i3 && (bv(i3, r3), i3.restore());
        }
      }, g.prototype.getHoverLayer = function() {
        return this._ensureLayer(1e5);
      }, g.prototype.paintOne = function(t3, e3) {
        _v(t3, e3);
      }, g.prototype._paintList = function(t3, e3, n3) {
        var i3, r3;
        this._redrawId === n3 && (i3 = this._doPaintList(t3, e3), this._needsManuallyCompositing && this._compositeManually(), i3 ? (sS(this._i, function(t4) {
          t4.afterBrush && t4.afterBrush();
        }, 5), this._paintHoverList(t3)) : (r3 = this, jn(function() {
          r3._paintList(t3, e3, n3);
        })));
      }, g.prototype._compositeManually = function() {
        var e3 = this._ensureLayer(eS).ctx, n3 = this._domRoot.width, i3 = this._domRoot.height;
        e3.clearRect(0, 0, n3, i3), sS(this._i, function(t3) {
          t3.virtual && e3.drawImage(t3.dom, 0, 0, n3, i3);
        }, 1);
      }, g.prototype._doPaintList = function(o3, a3) {
        var s3 = this, l3 = true;
        return sS(this._i, function(e3) {
          var n3, i3, t3, r3 = false;
          oS(e3, function(t4) {
            (t4.drawIdx < t4.endIdx || 0 <= t4.notClearIdx) && (r3 = true);
          }), (r3 || e3.__dirty) && (n3 = s3._opts.useDirtyRect && !Kw(e3) ? e3.createRepaintRects(o3, a3, s3._width, s3._height) : null, t3 = s3._i.layerStack[0], i3 = true, e3.__dirty && (i3 = false, e3.__dirty = false, t3 = e3.zlevel === t3.zl && e3.zlevel2 === t3.zl2 ? s3._backgroundColor : null, e3.clear(false, t3, n3)), oS(e3, function(t4) {
            t4 = s3._paintPerCursor(e3, t4, o3, n3, i3);
            l3 = l3 && t4;
          }));
        }, 5), b.wxa && sS(this._i, function(t3) {
          t3 && t3.ctx && t3.ctx.draw && t3.ctx.draw();
        }), l3;
      }, g.prototype._paintPerCursor = function(t3, e3, n3, i3, r3) {
        var o3 = t3.ctx;
        if (i3)
          if (i3.length)
            for (var a3 = this.dpr, s3 = 0; s3 < i3.length; ++s3) {
              var l3 = i3[s3];
              o3.save(), o3.beginPath(), o3.rect(l3.x * a3, l3.y * a3, l3.width * a3, l3.height * a3), o3.clip(), this._paintPerCursorInRect(t3, e3, n3, l3, r3), o3.restore();
            }
          else
            e3.drawIdx = e3.endIdx;
        else
          o3.save(), this._paintPerCursorInRect(t3, e3, n3, null, r3), o3.restore();
        return e3.drawIdx >= e3.endIdx;
      }, g.prototype._paintPerCursorInRect = function(t3, e3, n3, i3, r3) {
        for (var o3 = { inHover: false, allClipped: false, prevEl: null, viewWidth: this._width, viewHeight: this._height, beforeBrushParam: { contentRetained: r3 } }, a3 = t3.ctx, s3 = Kw(t3), l3 = s3 && $.getTime(), u3 = e3.drawIdx, r3 = e3.notClearIdx, h3 = 0 <= r3 ? Math.min(r3, u3) : u3; h3 < e3.endIdx; h3++) {
          var c3, p3 = n3[h3];
          if (!(h3 < u3) || p3.notClear) {
            if (p3.__inHover && (this._hoverLayerDirty = 2), null != i3 ? (c3 = p3.getPaintRect()) && c3.intersect(i3) && (xv(a3, p3, o3), p3.setPrevPaintRect(c3)) : xv(a3, p3, o3), s3) {
              if (15 < $.getTime() - l3) {
                h3++;
                break;
              }
            }
          }
        }
        bv(a3, o3), e3.drawIdx = Math.max(h3, u3);
      }, g.prototype.getLayer = function(t3, e3) {
        return this._ensureLayer(t3, 0, e3);
      }, g.prototype._ensureLayer = function(t3, e3, n3) {
        e3 = e3 || 0;
        var i3 = this._singleCanvas, r3 = (i3 && !this._needsManuallyCompositing && (t3 = eS, e3 = 0), aS(this._i, t3)[e3]);
        return r3 || (r3 = iS("zr_" + t3 + "." + e3, this, t3, e3), this._layerConfig[t3] && d(r3, this._layerConfig[t3], true), (n3 || i3 && t3 !== eS) && (r3.virtual = true), this._insertLayer(r3, t3, e3, false), r3.initContext()), r3;
      }, g.prototype.insertLayer = function(t3, e3) {
        this._insertLayer(e3, t3, 0, false);
      }, g.prototype._insertLayer = function(t3, e3, n3, i3) {
        var r3 = this._i, o3 = r3.layers, a3 = r3.layerStack, s3 = this._domRoot, l3 = null;
        if ((!o3[e3] || !o3[e3][n3]) && (o3 = t3) && (o3.__builtin__ || "function" == typeof o3.resize && "function" == typeof o3.refresh)) {
          for (var u3 = a3.length, h3 = 0; h3 < u3 && (a3[h3].zl < e3 || a3[h3].zl === e3 && a3[h3].zl2 < n3); )
            h3++;
          0 < h3 && (l3 = aS(r3, a3[h3 - 1].zl)[a3[h3 - 1].zl2]), a3.splice(h3, 0, { zl: e3, zl2: n3 }), aS(r3, e3)[n3] = t3, i3 || t3.virtual || (l3 ? (o3 = l3.dom).nextSibling ? s3.insertBefore(t3.dom, o3.nextSibling) : s3.appendChild(t3.dom) : s3.firstChild ? s3.insertBefore(t3.dom, s3.firstChild) : s3.appendChild(t3.dom)), t3.painter || (t3.painter = this);
        }
      }, g.prototype.eachLayer = function(n3, i3) {
        return sS(this._i, function(t3, e3) {
          n3.call(i3, t3, e3);
        });
      }, g.prototype.eachBuiltinLayer = function(n3, i3) {
        return sS(this._i, function(t3, e3) {
          n3.call(i3, t3, e3);
        }, 1);
      }, g.prototype.eachOtherLayer = function(n3, i3) {
        return sS(this._i, function(t3, e3) {
          n3.call(i3, t3, e3);
        }, 2);
      }, g.prototype.getLayers = function() {
        var i3 = {};
        return sS(this._i, function(t3, e3, n3) {
          i3[t3.id] = t3;
        }), i3;
      }, g.prototype._updateLayerStatus = function(a3, t3) {
        var e3, s3 = this;
        if (s3._singleCanvas) {
          for (var n3 = 1; n3 < a3.length; n3++)
            if ((c3 = a3[n3]).zlevel !== a3[n3 - 1].zlevel || c3.incremental) {
              s3._needsManuallyCompositing = true;
              break;
            }
        }
        sS(s3._i, function(t4) {
          t4.__dirty = false, oS(t4, function(t5) {
            t5.used = false, t5.endIdxNew = 0, t5.notClearIdx = -1;
          });
        }, 5);
        for (var i3, r3 = null, o3 = null, l3 = false, u3 = 0, h3 = a3.length; u3 < h3; u3++) {
          var c3, p3, d3 = (c3 = a3[u3]).zlevel, f3 = c3.incremental, g3 = void 0;
          e3 !== d3 && (e3 = d3, l3 = false), g3 = f3 ? (l3 = true, 1) : l3 ? 2 : 0, r3 && d3 === r3.zlevel && g3 === r3.zlevel2 || (o3 = null, (r3 = s3._ensureLayer(d3, g3)).__builtin__) ? (o3 && f3 === o3.key || (g3 = f3, p3 = void 0, p3 = (i3 = r3).__cursors, g3 = +g3, (o3 = p3.get(g3) || (i3.__cursorStack.push(g3), p3.set(g3, ((i3 = { key: g3 }).startIdx = i3.drawIdx = i3.endIdx = i3.endIdxNew = 0, i3.used = false, i3.first = i3.last = NaN, i3.notClearIdx = -1, i3)))).used) || (o3.used = true, t3 || o3.first !== c3.id ? (r3.__dirty = true, o3.first = c3.id, o3.startIdx = o3.drawIdx = u3, o3.endIdx = u3 + 1) : (p3 = u3 - o3.startIdx, o3.startIdx = u3, o3.drawIdx += p3, o3.endIdx += p3)), o3.endIdxNew = u3 + 1, c3.__dirty & Hn && !c3.__inHover && ((!f3 || !c3.notClear && u3 < o3.drawIdx) && (r3.__dirty = true), f3) && c3.notClear && o3.notClearIdx < 0 && (o3.notClearIdx = u3)) : st("ZLevel " + d3 + " has been used by unknown layer " + r3.id);
        }
        sS(s3._i, function(t4) {
          for (var e4 = t4.__cursorStack, n4 = t4.__cursors, i4 = e4.length - 1; 0 <= i4; i4--) {
            var r4, o4 = n4.get(e4[i4]);
            o4.used ? (r4 = o4.endIdxNew, (Kw(t4) ? r4 < o4.drawIdx : r4 !== o4.endIdx || !r4 || a3[r4 - 1].id !== o4.last) && (t4.__dirty = true), o4.endIdx = o4.endIdxNew, o4.last = r4 ? a3[r4 - 1].id : NaN) : (t4.__dirty = true, n4.removeKey(e4[i4]), e4.splice(i4, 1));
          }
          t4.__dirty && (oS(t4, function(t5) {
            t5.drawIdx = t5.startIdx;
          }), s3._hoverLayerDirty === nS) && (s3._hoverLayerDirty = 1);
        }, 5);
      }, g.prototype.clear = function() {
        return sS(this._i, function(t3) {
          t3.clear(), rS(t3);
        }, 1), this;
      }, g.prototype.setBackgroundColor = function(t3) {
        this._backgroundColor = t3, sS(this._i, function(t4) {
          t4.setUnpainted();
        });
      }, g.prototype.configLayer = function(t3, e3) {
        var n3;
        e3 && ((n3 = this._layerConfig)[t3] ? d(n3[t3], e3, true) : n3[t3] = e3, sS(this._i, function(t4, e4) {
          d(t4, n3[e4], true);
        }));
      }, g.prototype.delLayer = function(t3) {
        for (var e3 = this._i.layerStack, n3 = this._i.layers, i3 = e3.length - 1; 0 <= i3; i3--) {
          var r3, o3 = e3[i3];
          o3.zl !== t3 || (r3 = n3[t3][o3.zl2]).__builtin__ || (e3.splice(i3, 1), n3[t3][o3.zl2] = void 0, r3.virtual) || (o3 = r3.dom.parentNode) && o3.removeChild(r3.dom);
        }
      }, g.prototype.resize = function(e3, n3) {
        if (this._domRoot.style) {
          var t3 = this._domRoot, i3 = (t3.style.display = "none", this._opts), r3 = this.root;
          null != e3 && (i3.width = e3), null != n3 && (i3.height = n3), e3 = tv(r3, 0, i3), n3 = tv(r3, 1, i3), t3.style.display = "", this._width === e3 && n3 === this._height || (t3.style.width = e3 + "px", t3.style.height = n3 + "px", sS(this._i, function(t4) {
            t4.resize(e3, n3);
          }), this.refresh({ paintAll: true })), this._width = e3, this._height = n3;
        } else {
          if (null == e3 || null == n3)
            return;
          this._width = e3, this._height = n3, this._ensureLayer(eS).resize(e3, n3);
        }
        return this;
      }, g.prototype.clearLayer = function(t3) {
        F(this._i.layers[t3], function(t4) {
          t4 && !t4.__builtin__ && t4.clear();
        });
      }, g.prototype.dispose = function() {
        this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._i = null;
      }, g.prototype.getRenderedCanvas = function(t3) {
        if (this._singleCanvas && !this._compositeManually)
          return this._i.layers[eS][0].dom;
        var e3 = new Jw("image", this, (t3 = t3 || {}).pixelRatio || this.dpr), n3 = (e3.initContext(), e3.clear(false, t3.backgroundColor || this._backgroundColor), e3.ctx);
        if (t3.pixelRatio <= this.dpr) {
          this.refresh();
          var i3 = e3.dom.width, r3 = e3.dom.height;
          sS(this._i, function(t4) {
            t4.__builtin__ ? n3.drawImage(t4.dom, 0, 0, i3, r3) : t4.renderToCanvas && (n3.save(), t4.renderToCanvas(n3), n3.restore());
          });
        } else {
          for (var o3 = { inHover: false, viewWidth: this._width, viewHeight: this._height, beforeBrushParam: {} }, a3 = this.storage.getDisplayList(true), s3 = 0, l3 = a3.length; s3 < l3; s3++) {
            var u3 = a3[s3];
            xv(n3, u3, o3);
          }
          bv(n3, o3);
        }
        return e3.dom;
      }, g.prototype.getWidth = function() {
        return this._width;
      }, g.prototype.getHeight = function() {
        return this._height;
      };
      var lS = g;
      function g(t3, e3, n3, i3) {
        this.type = "canvas", this._prevDisplayList = [], this._layerConfig = {}, this._needsManuallyCompositing = false, this.type = "canvas", this._i = { layerStack: [], layers: [] };
        var r3, o3 = !t3.nodeName || "CANVAS" === t3.nodeName.toUpperCase();
        this._opts = n3 = V({}, n3 || {}), this.dpr = n3.devicePixelRatio || Kr, this._singleCanvas = o3, (this.root = t3).style && (Gt(t3), t3.innerHTML = ""), this.storage = e3, this._prevDisplayList = [], o3 ? (o3 = (e3 = t3).width, r3 = e3.height, null != n3.width && (o3 = n3.width), null != n3.height && (r3 = n3.height), this.dpr = n3.devicePixelRatio || 1, e3.width = o3 * this.dpr, e3.height = r3 * this.dpr, this._width = o3, this._height = r3, (o3 = iS(e3, this, eS, 0)).initContext(), this._insertLayer(o3, eS, 0, true), this._domRoot = t3) : (this._width = tv(t3, 0, n3), this._height = tv(t3, 1, n3), n3 = this._domRoot = (r3 = this._width, e3 = this._height, (o3 = document.createElement("div")).style.cssText = ["position:relative", "width:" + r3 + "px", "height:" + e3 + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", o3), t3.appendChild(n3));
      }
      u(cS, uS = cg), cS.prototype.init = function(t3, e3, n3) {
        uS.prototype.init.call(this, t3, e3, n3), this._sourceManager = new I0(this), k0(this);
      }, cS.prototype.mergeOption = function(t3, e3) {
        uS.prototype.mergeOption.call(this, t3, e3), k0(this);
      }, cS.prototype.optionUpdated = function() {
        this._sourceManager.dirty();
      }, cS.prototype.getSourceManager = function() {
        return this._sourceManager;
      }, cS.type = "dataset", cS.defaultOption = { seriesLayoutBy: Eu };
      var uS, hS = cS;
      function cS() {
        var t3 = null !== uS && uS.apply(this, arguments) || this;
        return t3.type = "dataset", t3;
      }
      u(fS, pS = U0), fS.type = "dataset";
      var pS, dS = fS;
      function fS() {
        var t3 = null !== pS && pS.apply(this, arguments) || this;
        return t3.type = "dataset", t3;
      }
      function gS(t3) {
        t3.registerComponentModel(hS), t3.registerComponentView(dS);
      }
      _b([function(t3) {
        t3.registerPainter("canvas", lS);
      }, gS]), _b(Zw);
      u(vS, yS = Hm), vS.prototype.isHorizontal = function() {
        var t3 = this.position;
        return "top" === t3 || "bottom" === t3;
      }, vS.prototype.getGlobalExtent = function(t3) {
        var e3 = this.getExtent();
        return e3[0] = this.toGlobalCoord(e3[0]), e3[1] = this.toGlobalCoord(e3[1]), t3 && e3[0] > e3[1] && e3.reverse(), e3;
      }, vS.prototype.pointToData = function(t3, e3) {
        return this.coordToData(this.toLocalCoord(t3["x" === this.dim ? 0 : 1]), e3);
      }, vS.prototype.setCategorySortInfo = function(t3) {
        if ("category" !== this.type)
          return false;
        this.model.option.categorySortInfo = t3, this.scale.setSortInfo(t3);
      };
      var yS, mS = vS;
      function vS(t3, e3, n3, i3, r3) {
        t3 = yS.call(this, t3, e3, n3) || this;
        return t3.index = 0, t3.type = i3 || "value", t3.position = r3 || "bottom", t3;
      }
      var _S = typeof Float32Array != e ? Float32Array : void 0, Ad = typeof Float64Array != e ? Float64Array : void 0;
      function xS(t3) {
        return bS({ ctor: _S }, t3).arr;
      }
      function bS(t3, e3) {
        var n3 = t3.arr, i3 = t3.ctor;
        if (ya < e3 && (e3 = ya), !n3 || t3.typed && n3.length < e3) {
          var r3 = void 0;
          if (i3)
            try {
              r3 = new i3(e3), t3.typed = true, n3 && r3.set(n3);
            } catch (t4) {
            }
          if (!r3 && (t3.typed = !(r3 = []), n3))
            for (var o3 = 0, a3 = n3.length; o3 < a3; o3++)
              r3[o3] = n3[o3];
          t3.arr = r3;
        }
        return t3;
      }
      var wS = null;
      var SS = "expandAxisBreak", MS = Math.PI, TS = [[1, 2, 1, 2], [5, 3, 5, 3], [8, 3, 8, 3]], IS = [[0, 1, 0, 1], [0, 3, 0, 3], [0, 3, 0, 3]], CS = i(), kS = i(), DS = (AS.prototype.ensureRecord = function(t3) {
        var e3 = t3.axis.dim, t3 = t3.componentIndex, n3 = this.recordMap, n3 = n3[e3] || (n3[e3] = []);
        return n3[t3] || (n3[t3] = { ready: {} });
      }, AS);
      function AS(t3) {
        this.recordMap = {}, this.resolveAxisNameOverlap = t3;
      }
      function LS(t3, e3, n3, i3, r3, o3) {
        var a3, s3;
        Lx(t3.nameLocation) ? (t3 = o3.stOccupiedRect) && RS((a3 = {}, t3 = t3, s3 = o3.transGroup.transform, a3.transform = ad(a3.transform, s3), a3.localRect = od(a3.localRect, t3), a3.rect = od(a3.rect, t3), s3 && a3.rect.applyTransform(s3), a3.axisAligned = rd(s3), a3.obb = void 0, (a3.label = a3.label || {}).ignore = false, a3), i3, r3) : NS(o3.labelInfoList, o3.dirVec, i3, r3);
      }
      var PS = Ve(), OS = new Z(0, 0, 0, 0);
      function RS(t3, e3, n3) {
        var i3 = new q();
        Bw(t3, e3, i3, { direction: Math.atan2(n3.y, n3.x), bidirectional: false, touchThreshold: 0.05 }) && (t3 = i3, n3 = e3) && (n3.label.x += t3.x, n3.label.y += t3.y, n3.label.markRedraw(), (i3 = n3.transform) && (i3[4] += t3.x, i3[5] += t3.y), (e3 = n3.rect) && (e3.x += t3.x, e3.y += t3.y), e3 = n3.obb) && e3.fromBoundingRect(n3.localRect, i3);
      }
      function NS(t3, e3, n3, i3) {
        for (var r3 = 0 <= q.dot(i3, e3), o3 = 0, a3 = t3.length; o3 < a3; o3++) {
          var s3 = t3[r3 ? o3 : a3 - 1 - o3];
          s3.label.ignore || RS(s3, n3, i3);
        }
      }
      BS.prototype.updateCfg = function(t3) {
        var e3 = this._cfg.raw;
        e3.position = t3.position, e3.labelOffset = t3.labelOffset, this._resetCfgDetermined(e3);
      }, BS.prototype.__getRawCfg = function() {
        return this._cfg.raw;
      }, BS.prototype._resetCfgDetermined = function(t3) {
        var e3 = this._axisModel, n3 = e3.getDefaultOption ? e3.getDefaultOption() : {}, i3 = Y(t3.axisName, e3.get("name")), r3 = e3.get("nameMoveOverlap"), t3 = (null != r3 && "auto" !== r3 || (r3 = Y(t3.defaultNameMoveOverlap, true)), { raw: t3, position: t3.position, rotation: t3.rotation, nameDirection: Y(t3.nameDirection, 1), tickDirection: Y(t3.tickDirection, 1), labelDirection: Y(t3.labelDirection, 1), labelOffset: Y(t3.labelOffset, 0), silent: Y(t3.silent, true), axisName: i3, nameLocation: It(e3.get("nameLocation"), n3.nameLocation, "end"), shouldNameMoveOverlap: !!i3 && r3, optionHideOverlap: e3.get(["axisLabel", "hideOverlap"]), showMinorTicks: e3.get(["minorTick", "show"]) }), n3 = (this._cfg = t3, new Vo({ x: t3.position[0], y: t3.position[1], rotation: t3.rotation })), i3 = (n3.updateTransform(), this._transformGroup = n3, this._shared.ensureRecord(e3));
        i3.transGroup = this._transformGroup, i3.dirVec = new q(Math.cos(-t3.rotation), Math.sin(-t3.rotation));
      }, BS.prototype.build = function(e3, n3) {
        var i3 = this;
        return e3 = e3 || { axisLine: true, axisTickLabelEstimate: false, axisTickLabelDetermine: true, axisName: true }, F(ES, function(t3) {
          e3[t3] && VS[t3](i3._cfg, i3._local, i3._shared, i3._axisModel, i3.group, i3._transformGroup, i3._api, n3 || {});
        }), this;
      }, BS.innerTextLayout = function(t3, e3, n3) {
        var i3, e3 = ma(e3 - t3), t3 = va(e3) ? (i3 = 0 < n3 ? "top" : "bottom", "center") : va(e3 - MS) ? (i3 = 0 < n3 ? "bottom" : "top", "center") : (i3 = "middle", 0 < e3 && e3 < MS ? 0 < n3 ? "right" : "left" : 0 < n3 ? "left" : "right");
        return { rotation: e3, textAlign: t3, textVerticalAlign: i3 };
      }, BS.makeAxisEventDataBase = function(t3) {
        var e3 = { componentType: t3.mainType, componentIndex: t3.componentIndex };
        return e3[t3.mainType + "Index"] = t3.componentIndex, e3;
      }, BS.isLabelSilent = function(t3) {
        var e3 = t3.get("tooltip");
        return t3.get("silent") || !(t3.get("triggerEvent") || e3 && e3.show);
      };
      var zS = BS;
      function BS(t3, e3, n3, i3) {
        this.group = new Vo(), this._axisModel = t3, this._api = e3, this._local = {}, this._shared = i3 || new DS(LS), this._resetCfgDetermined(n3);
      }
      var ES = ["axisLine", "axisTickLabelEstimate", "axisTickLabelDetermine", "axisName"], VS = { axisLine: function(i3, t3, e3, n3, r3, o3, a3) {
        var s3, l3, u3, h3, c3, p3, d3, f3, g3 = n3.get(["axisLine", "show"]);
        (g3 = "auto" === g3 && (g3 = true, null != i3.raw.axisLineAutoShow) ? !!i3.raw.axisLineAutoShow : g3) && (g3 = n3.axis.getExtent(), c3 = o3.transform, s3 = [g3[0], 0], l3 = [g3[1], 0], u3 = l3[0] < s3[0], c3 && (le(s3, s3, c3), le(l3, l3, c3)), h3 = V({ lineCap: "round" }, n3.getModel(["axisLine", "lineStyle"]).getLineStyle()), g3 = { strokeContainThreshold: i3.raw.strokeContainThreshold || 5, silent: true, z2: 1, style: h3 }, n3.get(["axisLine", "breakLine"]) && Qd(n3.axis.scale) ? wS.buildAxisBreakLine(n3, r3, o3, g3) : (jp((c3 = new Xc(V({ shape: { x1: s3[0], y1: s3[1], x2: l3[0], y2: l3[1] } }, g3))).shape, c3.style.lineWidth), c3.anid = "line", r3.add(c3)), null != (p3 = n3.get(["axisLine", "symbol"]))) && (o3 = n3.get(["axisLine", "symbolSize"]), W(p3) && (p3 = [p3, p3]), (W(o3) || U(o3)) && (o3 = [o3, o3]), g3 = Km(n3.get(["axisLine", "symbolOffset"]) || 0, o3), d3 = o3[0], f3 = o3[1], F([{ rotate: i3.rotation + Math.PI / 2, offset: g3[0], r: 0 }, { rotate: i3.rotation - Math.PI / 2, offset: g3[1], r: Math.sqrt((s3[0] - l3[0]) * (s3[0] - l3[0]) + (s3[1] - l3[1]) * (s3[1] - l3[1])) }], function(t4, e4) {
          var n4;
          "none" !== p3[e4] && null != p3[e4] && (e4 = jm(p3[e4], -d3 / 2, -f3 / 2, d3, f3, h3.stroke, true), n4 = t4.r + t4.offset, e4.attr({ rotation: t4.rotate, x: (t4 = u3 ? l3 : s3)[0] + n4 * Math.cos(i3.rotation), y: t4[1] - n4 * Math.sin(i3.rotation), silent: true, z2: 11 }), r3.add(e4));
        }));
      }, axisTickLabelEstimate: function(t3, e3, n3, i3, r3, o3, a3, s3) {
        WS(e3, r3, s3) && FS(t3, e3, n3, i3, r3, o3, a3, Vb.estimate);
      }, axisTickLabelDetermine: function(t3, e3, n3, i3, r3, o3, a3, s3) {
        WS(e3, r3, s3) && FS(t3, e3, n3, i3, r3, o3, a3, Vb.determine);
        var l3, s3 = function(t4, e4, n4, i4) {
          var r4 = i4.axis, o4 = i4.getModel("axisTick"), a4 = o4.get("show");
          "auto" === a4 && (a4 = true, null != t4.raw.axisTickAutoShow) && (a4 = !!t4.raw.axisTickAutoShow);
          if (!a4 || r4.scale.isBlank())
            return [];
          for (var a4 = o4.getModel("lineStyle"), t4 = t4.tickDirection * o4.get("length"), s4 = HS(r4.getTicksCoords(), n4.transform, t4, B(a4.getLineStyle(), { stroke: i4.get(["axisLine", "lineStyle", "color"]) }), "ticks"), l4 = 0; l4 < s4.length; l4++)
            e4.add(s4[l4]);
          return s4;
        }(t3, r3, o3, i3), a3 = (n3 = e3.labelLayoutList, l3 = s3, t3.showMinorTicks || F(n3, function(t4) {
          if (t4 && t4.label.ignore)
            for (var e4 = 0; e4 < l3.length; e4++) {
              var n4 = l3[e4], i4 = kS(n4), r4 = CS(t4.label);
              if (null != i4.tickValue && !i4.onBand && i4.tickValue === r4.labelInfo.tick.value)
                return void GS(n4);
            }
        }), t3), u3 = r3, h3 = o3, e3 = i3, s3 = t3.tickDirection, n3 = e3.axis, r3 = e3.getModel("minorTick");
        if (a3.showMinorTicks && !n3.scale.isBlank()) {
          var c3 = n3.getMinorTicksCoords();
          if (c3.length)
            for (var a3 = r3.getModel("lineStyle"), p3 = s3 * r3.get("length"), d3 = B(a3.getLineStyle(), B(e3.getModel("axisTick").getLineStyle(), { stroke: e3.get(["axisLine", "lineStyle", "color"]) })), f3 = 0; f3 < c3.length; f3++)
              for (var g3 = HS(c3[f3], h3.transform, p3, d3, "minorticks_" + f3), y3 = 0; y3 < g3.length; y3++)
                u3.add(g3[y3]);
        }
      }, axisName: function(t3, e3, n3, i3, r3, o3, a3, s3) {
        var l3, u3, h3, c3, p3, d3, f3, g3, y3, m3, v3 = n3.ensureRecord(i3), _3 = (e3.nameEl && (r3.remove(e3.nameEl), e3.nameEl = v3.nameLayout = v3.nameLocation = null), t3.axisName);
        _3 && (l3 = t3.nameLocation, f3 = t3.nameDirection, u3 = i3.getModel("nameTextStyle"), p3 = i3.get("nameGap") || 0, d3 = i3.axis.getExtent(), m3 = i3.axis.inverse ? -1 : 1, y3 = new q(0, 0), h3 = new q(0, 0), "start" === l3 ? (y3.x = d3[0] - m3 * p3, h3.x = -m3) : "end" === l3 ? (y3.x = d3[1] + m3 * p3, h3.x = m3) : (y3.x = (d3[0] + d3[1]) / 2, y3.y = t3.labelOffset + f3 * p3, h3.y = f3), m3 = Ve(), h3.transform(Ue(m3, m3, t3.rotation)), null != (p3 = i3.get("nameRotate")) && (p3 = p3 * MS / 180), Lx(l3) ? c3 = zS.innerTextLayout(t3.rotation, null != p3 ? p3 : t3.rotation, f3) : (c3 = function(t4, e4, n4, i4) {
          var r4, n4 = ma(n4 - t4), t4 = i4[0] > i4[1], i4 = "start" === e4 && !t4 || "start" !== e4 && t4;
          e4 = va(n4 - MS / 2) ? (r4 = i4 ? "bottom" : "top", "center") : va(n4 - 1.5 * MS) ? (r4 = i4 ? "top" : "bottom", "center") : (r4 = "middle", n4 < 1.5 * MS && MS / 2 < n4 ? i4 ? "left" : "right" : i4 ? "right" : "left");
          return { rotation: n4, textAlign: e4, textVerticalAlign: r4 };
        }(t3.rotation, l3, p3 || 0, d3), null != (g3 = t3.raw.axisNameAvailableWidth) && (g3 = Math.abs(g3 / Math.sin(c3.rotation)), isFinite(g3) || (g3 = null))), m3 = u3.getFont(), p3 = (f3 = i3.get("nameTruncate", true) || {}).ellipsis, d3 = Tt(t3.raw.nameTruncateMaxWidth, f3.maxWidth, g3), f3 = s3.nameMarginLevel || 0, ed({ el: g3 = new gu({ x: y3.x, y: y3.y, rotation: c3.rotation, silent: zS.isLabelSilent(i3), style: fd(u3, { text: _3, font: m3, overflow: "truncate", width: d3, ellipsis: p3, fill: u3.getTextColor() || i3.get(["axisLine", "lineStyle", "color"]), align: u3.get("align") || c3.textAlign, verticalAlign: u3.get("verticalAlign") || c3.textVerticalAlign }), z2: 1 }), componentModel: i3, itemName: _3 }), g3.__fullText = _3, g3.anid = "name", i3.get("triggerEvent") && ((s3 = zS.makeAxisEventDataBase(i3)).targetType = "axisName", s3.name = _3, j(g3).eventData = s3), o3.add(g3), g3.updateTransform(), e3.nameEl = g3, y3 = v3.nameLayout = Aw({ label: g3, priority: g3.z2, defaultAttr: { ignore: g3.ignore }, marginDefault: (Lx(l3) ? TS : IS)[f3] }), v3.nameLocation = l3, r3.add(g3), g3.decomposeTransform(), t3.shouldNameMoveOverlap) && y3 && (m3 = n3.ensureRecord(i3), n3.resolveAxisNameOverlap(t3, n3, i3, y3, h3, m3));
      } };
      function FS(t3, e3, z3, n3, i3, r3, o3, a3) {
        US(e3) || (u3 = t3, R3 = e3, i3 = i3, a3 = a3, _3 = o3, k3 = (v3 = n3).axis, o3 = Tt(u3.raw.axisLabelShow, v3.get(["axisLabel", "show"])), D3 = new Vo(), i3.add(D3), i3 = Fb(a3), !o3 || k3.scale.isBlank() ? XS(R3, [], D3, i3) : (x3 = v3.getModel("axisLabel"), b3 = k3.getViewLabels(i3), a3 = (Tt(u3.raw.labelRotate, x3.get("rotate")) || 0) * MS / 180, w3 = zS.innerTextLayout(u3.rotation, a3, u3.labelDirection), S3 = v3.getCategories && v3.getCategories(true), M3 = [], T3 = v3.get("triggerEvent"), I3 = 1 / 0, C3 = -1 / 0, F(b3, function(t4, e4) {
          var n4, i4, r4, o4 = t4.tick, a4 = t4.formattedLabel, s4 = t4.rawLabel, l4 = x3, u4 = Rx(k3.scale, o4), h4 = (l4 = S3 && S3[u4] && X(h4 = S3[u4]) && h4.textStyle ? new Bd(h4.textStyle, x3, v3.ecModel) : l4).getTextColor() || v3.get(["axisLine", "lineStyle", "color"]), c4 = l4.getShallow("align", true) || w3.textAlign, p4 = Y(l4.getShallow("alignMinLabel", true), c4), d4 = Y(l4.getShallow("alignMaxLabel", true), c4), f4 = l4.getShallow("verticalAlign", true) || l4.getShallow("baseline", true) || w3.textVerticalAlign, g4 = Y(l4.getShallow("verticalAlignMinLabel", true), f4), y4 = Y(l4.getShallow("verticalAlignMaxLabel", true), f4), o4 = 10 + ((null == (o4 = o4.time) ? void 0 : o4.level) || 0), m4 = (I3 = Math.min(I3, o4), C3 = Math.max(C3, o4), new gu({ x: 0, y: 0, rotation: 0, silent: zS.isLabelSilent(v3), z2: o4, style: fd(l4, { text: a4, align: 0 === e4 ? p4 : e4 === b3.length - 1 ? d4 : c4, verticalAlign: 0 === e4 ? g4 : e4 === b3.length - 1 ? y4 : f4, fill: H(h4) ? h4("category" === k3.type ? s4 : "value" === k3.type ? u4 + "" : u4, e4) : h4 }) })), o4 = (m4.anid = "label_" + u4, CS(m4));
          o4.labelInfo = t4, o4.layoutRotation = w3.rotation, ed({ el: m4, componentModel: v3, itemName: a4, formatterParamsExtra: { isTruncated: function() {
            return m4.isTruncated;
          }, value: s4, tickIndex: e4 } }), T3 && ((l4 = zS.makeAxisEventDataBase(v3)).targetType = "axisLabel", l4.value = s4, l4.tickIndex = e4, (p4 = t4.tick.break) && (d4 = p4.parsedBreak, l4.break = { start: d4.vmin, end: d4.vmax }), "category" === k3.type && (l4.dataIndex = u4), j(m4).eventData = l4, p4) && (n4 = v3, i4 = _3, r4 = p4, m4.on("click", function(t5) {
            var e5 = { type: SS, breaks: [{ start: r4.parsedBreak.breakOption.start, end: r4.parsedBreak.breakOption.end }] };
            e5[n4.axis.dim + "AxisIndex"] = n4.componentIndex, i4.dispatchAction(e5);
          })), M3.push(m4), D3.add(m4);
        }), o3 = E(M3, function(t4) {
          return { label: t4, priority: CS(t4).labelInfo.tick.break ? t4.z2 + (C3 - I3 + 1) : t4.z2, defaultAttr: { ignore: t4.ignore } };
        }), XS(R3, o3, D3, i3)));
        var v3, _3, x3, b3, w3, S3, M3, T3, I3, C3, k3, D3, s3, l3, u3, h3, c3, p3, d3, f3, g3, y3, m3, A3, L3, P3, O3, a3 = e3.labelLayoutList, R3 = (s3 = t3, u3 = a3, h3 = r3, c3 = (l3 = n3).get(["axisLabel", "margin"]), F(u3, function(t4, e4) {
          var n4, i4, r4, t4 = Aw(t4);
          t4 && (n4 = t4.label, i4 = CS(n4), t4.suggestIgnore = n4.ignore, n4.ignore = false, co(YS, qS), r4 = l3.axis, YS.x = r4.dataToCoord(Rx(r4.scale, i4.labelInfo.tick)), YS.y = s3.labelOffset + s3.labelDirection * c3, YS.rotation = i4.layoutRotation, h3.add(YS), YS.updateTransform(), h3.remove(YS), YS.decomposeTransform(), co(n4, YS), n4.markRedraw(), kw(t4, true), Aw(t4));
        }), t3.rotation, t3.optionHideOverlap);
        function N3(t4, e4, n4) {
          var e4 = Aw(p3[e4]), n4 = Aw(p3[n4]), i4 = f3.scale;
          if (e4 && n4) {
            if (null == t4) {
              if (!d3 && g3)
                return;
              var r4 = CS(e4.label).labelInfo.tick;
              if (q1(i4) && r4.notNice || j1(i4) && r4.offInterval)
                return void GS(e4.label);
            }
            false === t4 || e4.suggestIgnore ? GS(e4.label) : n4.suggestIgnore ? GS(n4.label) : (d3 || (e4 = Ow({ marginForce: i4 = [0, 0, 0, 0] }, e4), n4 = Ow({ marginForce: i4 }, n4)), Bw(e4, n4, null, { touchThreshold: 0.1 }) && GS((t4 ? n4 : e4).label));
          }
        }
        p3 = a3, d3 = R3, f3 = (o3 = n3).axis, g3 = o3.get(["axisLabel", "customValues"]), function(t4) {
          return "category" === t4.type && 0 === Ax(t4.getLabelModel());
        }(f3) || (i3 = o3.get(["axisLabel", "showMinLabel"]), o3 = o3.get(["axisLabel", "showMaxLabel"]), e3 = p3.length, N3(i3, 0, 1), N3(o3, e3 - 1, e3 - 2)), R3 && zw(ft(a3, function(t4) {
          return t4 && !t4.label.ignore;
        })), r3 = t3, i3 = z3, o3 = a3, t3 = (e3 = n3).axis, m3 = i3.ensureRecord(e3), A3 = [], L3 = !!r3.axisName && Lx(r3.nameLocation), F(o3, function(t4) {
          var e4, t4 = Aw(t4);
          t4 && !t4.label.ignore && (A3.push(t4), e4 = m3.transGroup, L3) && (e4.transform ? Ye(PS, e4.transform) : Fe(PS), t4.transform && He(PS, PS, t4.transform), Z.copy(OS, t4.localRect), OS.applyTransform(PS), y3 ? y3.union(OS) : Z.copy(y3 = new Z(0, 0, 0, 0), OS));
        }), P3 = 0.1 < Math.abs(m3.dirVec.x) ? "x" : "y", O3 = m3.transGroup[P3], A3.sort(function(t4, e4) {
          return Math.abs(t4.label[P3] - O3) - Math.abs(e4.label[P3] - O3);
        }), L3 && y3 && (i3 = t3.getExtent(), e3 = Math.min(i3[0], i3[1]), r3 = Math.max(i3[0], i3[1]) - e3, y3.union(new Z(e3, 0, r3, 1))), m3.stOccupiedRect = y3, m3.labelInfoList = A3;
      }
      function GS(t3) {
        t3 && (t3.ignore = true);
      }
      function HS(t3, e3, n3, i3, r3) {
        for (var o3 = [], a3 = [], s3 = [], l3 = 0; l3 < t3.length; l3++) {
          var u3 = t3[l3].coord, u3 = (a3[0] = u3, s3[a3[1] = 0] = u3, s3[1] = n3, e3 && (le(a3, a3, e3), le(s3, s3, e3)), new Xc({ shape: { x1: a3[0], y1: a3[1], x2: s3[0], y2: s3[1] }, style: i3, z2: 2, autoBatch: true, silent: true })), u3 = (jp(u3.shape, u3.style.lineWidth), u3.anid = r3 + "_" + t3[l3].tickValue, o3.push(u3), kS(u3));
          u3.onBand = !!t3[l3].onBand, u3.tickValue = t3[l3].tickValue;
        }
        return o3;
      }
      function WS(t3, e3, n3) {
        if (US(t3)) {
          var i3 = t3.axisLabelsCreationContext.out.noPxChangeTryDetermine;
          if (n3.noPxChange) {
            for (var r3 = true, o3 = 0; o3 < i3.length; o3++)
              r3 = r3 && i3[o3]();
            if (r3)
              return false;
          }
          i3.length && (e3.remove(t3.labelGroup), XS(t3, null, null, null));
        }
        return true;
      }
      function US(t3) {
        return t3.labelLayoutList;
      }
      function XS(t3, e3, n3, i3) {
        t3.labelLayoutList = e3, t3.labelGroup = n3, t3.axisLabelsCreationContext = i3;
      }
      var YS = new uu(), qS = new uu();
      function ZS(t3, e3, n3) {
        n3 = n3 || {};
        var i3 = e3.axis, r3 = {}, o3 = i3.getAxesOnZeroOf()[0], a3 = i3.position, s3 = o3 ? "onZero" : a3, i3 = i3.dim, t3 = [t3.x, t3.x + t3.width, t3.y, t3.y + t3.height], l3 = { left: 0, right: 1, top: 0, bottom: 1, onZero: 2 }, u3 = e3.get("offset") || 0, u3 = "x" === i3 ? [t3[2] - u3, t3[3] + u3] : [t3[0] - u3, t3[1] + u3], h3 = (o3 && (h3 = o3.toGlobalCoord(o3.dataToCoord(0)), u3[l3.onZero] = Math.max(Math.min(h3, u3[1]), u3[0])), r3.position = ["y" === i3 ? u3[l3[s3]] : t3[0], "x" === i3 ? u3[l3[s3]] : t3[3]], r3.rotation = Math.PI / 2 * ("x" === i3 ? 0 : 1), r3.labelDirection = r3.tickDirection = r3.nameDirection = { top: -1, bottom: 1, left: -1, right: 1 }[a3], r3.labelOffset = o3 ? u3[l3[a3]] - u3[l3.onZero] : 0, e3.get(["axisTick", "inside"]) && (r3.tickDirection = -r3.tickDirection), Tt(n3.labelInside, e3.get(["axisLabel", "inside"])) && (r3.labelDirection = -r3.labelDirection), e3.get(["axisLabel", "rotate"]));
        return r3.labelRotate = "top" === s3 ? -h3 : h3, r3.z2 = 1, r3;
      }
      function jS() {
        $x["liPosMinGap"] = KS;
      }
      function KS(t3, e3, n3) {
        var i3, r3 = I(), o3 = n3.serUids, a3 = n3.liPosMinGap, s3 = e3.axis, l3 = s3.scale, u3 = l3.needTransform(), h3 = l3.getFilter ? l3.getFilter() : null, c3 = a0(h3);
        function p3(i4) {
          Zx(t3, e3.sers, function(t4) {
            var e4 = t4.getRawData(), n4 = e4.getDimensionIndex(e4.mapDimension(s3.dim));
            0 <= n4 && i4(n4, t4, e4.getStore());
          });
        }
        var d3 = 0;
        if (p3(function(t4, e4, n4) {
          r3.set(e4.uid, 1), o3 && o3.hasKey(e4.uid) || (i3 = true), d3 += n4.count();
        }), (i3 = o3 && o3.keys().length === r3.keys().length ? i3 : true) || null == a3) {
          bS($S, d3);
          for (var f3 = 0, g3 = (p3(function(t4, e4, n4) {
            for (var i4 = 0, r4 = n4.count(); i4 < r4; ++i4) {
              var o4 = n4.get(t4, i4);
              !isFinite(o4) || h3 && !s0(c3, o4) || (u3 && (o4 = l3.transformIn(o4, null)), $S.arr[f3++] = o4);
            }
          }), $S.typed ? $S.arr.subarray(0, f3) : ($S.arr.length = f3, $S.arr)), y3 = ($S.typed ? g3.sort() : pa(g3), 1 / 0), m3 = 1; m3 < f3; ++m3) {
            var v3 = g3[m3] - g3[m3 - 1];
            0 < v3 && v3 < y3 && (y3 = v3);
          }
          n3.liPosMinGap = e3.liPosMinGap = Da(y3) ? y3 : 0 < f3 ? Gx : Hx, n3.serUids = r3;
        } else
          e3.liPosMinGap = a3;
      }
      var $S = bS({ ctor: Ad }, 50);
      function QS(t3) {
        return jS(), { liPosMinGap: !j1(t3.scale) };
      }
      var JS = "bar";
      function tM(t3, e3, n3, i3) {
        var r3;
        r3 = t3, e3 = Jx((t3 = { key: e3, seriesType: n3, coordSysType: i3, getMetrics: QS }).seriesType, t3.baseAxis, t3.coordSysType), tb.set(e3, t3), Ex(r3, function() {
          r3.registerProcessor(r3.PRIORITY.PROCESSOR.AXIS_STATISTICS, { overallReset: Kx });
        });
      }
      var eM, nM = { left: 0, right: 0, top: 0, bottom: 0 }, iM = ["25%", "25%"], rM = "cartesian2d", oM = (u(aM, eM = cg), aM.prototype.mergeDefaultAndTheme = function(t3, e3) {
        var n3 = og(t3.outerBounds);
        eM.prototype.mergeDefaultAndTheme.apply(this, arguments), n3 && t3.outerBounds && rg(t3.outerBounds, n3);
      }, aM.prototype.mergeOption = function(t3, e3) {
        eM.prototype.mergeOption.apply(this, arguments), this.option.outerBounds && t3.outerBounds && rg(this.option.outerBounds, t3.outerBounds);
      }, aM.type = "grid", aM.dependencies = ["xAxis", "yAxis"], aM.layoutMode = "box", aM.defaultOption = { show: false, z: 0, left: "15%", top: 65, right: "10%", bottom: 80, containLabel: false, outerBoundsMode: "auto", outerBounds: nM, outerBoundsContain: "all", outerBoundsClampWidth: iM[0], outerBoundsClampHeight: iM[1], backgroundColor: v.color.transparent, borderWidth: 1, borderColor: v.color.neutral30 }, aM);
      function aM() {
        return null !== eM && eM.apply(this, arguments) || this;
      }
      var sM = is(), lM = "__ec_stack_";
      function uM(t3) {
        return t3.get("stack") || lM + t3.seriesIndex;
      }
      function hM(t3, e3) {
        n3 = [], i3 = ew(t3 = t3, { fromStat: { key: e3 = (e3 = e3) + Vx + rM }, min: 1 }), qx(t3, e3, function(t4) {
          n3.push({ barWidth: ha(t4.get("barWidth"), i3.w), barMaxWidth: ha(t4.get("barMaxWidth"), i3.w), barMinWidth: ha(t4.get("barMinWidth") || (dM(t4) ? 0.5 : 1), i3.w), barGap: t4.get("barGap"), barCategoryGap: t4.get("barCategoryGap"), defaultBarGap: t4.get("defaultBarGap"), stackId: uM(t4) });
        });
        var n3, i3, r3, o3, a3, s3, l3, u3, h3, c3, p3, d3, f3, g3, y3, t3 = { bandWidthResult: i3, seriesInfo: n3 };
        return t3.columnMap = (a3 = (e3 = t3).bandWidthResult.w, s3 = a3, l3 = 0, u3 = [], h3 = {}, F(e3.seriesInfo, function(t4, e4) {
          e4 || (o3 = t4.defaultBarGap || 0);
          var e4 = t4.stackId, n4 = (Ht(h3, e4) || l3++, h3[e4]), e4 = (n4 || (n4 = h3[e4] = { width: 0, maxWidth: 0 }, u3.push(e4)), t4.barWidth), e4 = (e4 && !n4.width && (n4.width = e4, e4 = Qo(s3, e4), s3 -= e4), t4.barMaxWidth), e4 = (e4 && (n4.maxWidth = e4), t4.barMinWidth), n4 = (e4 && (n4.minWidth = e4), t4.barGap), e4 = (null != n4 && (o3 = n4), t4.barCategoryGap);
          null != e4 && (r3 = e4);
        }), null == r3 && (r3 = Jo(35 - 4 * u3.length, 15) + "%"), e3 = ha(r3, a3), p3 = ha(o3, 1), d3 = Jo(d3 = (s3 - e3) / (l3 + (l3 - 1) * p3), 0), F(u3, function(t4) {
          var e4, t4 = h3[t4], n4 = t4.maxWidth, i4 = t4.minWidth;
          t4.width ? (e4 = t4.width, n4 && (e4 = Qo(e4, n4)), i4 && (e4 = Jo(e4, i4)), t4.width = e4, s3 -= e4 + p3 * e4, l3--) : (e4 = d3, n4 && n4 < e4 && (e4 = Qo(n4, s3)), (e4 = i4 && e4 < i4 ? i4 : e4) !== d3 && (t4.width = e4, s3 -= e4 + p3 * e4, l3--));
        }), d3 = Jo(d3 = (s3 - e3) / (l3 + (l3 - 1) * p3), 0), f3 = 0, F(u3, function(t4) {
          t4 = h3[t4];
          t4.width || (t4.width = d3), f3 += (c3 = t4).width * (1 + p3);
        }), c3 && (f3 -= c3.width * p3), g3 = {}, y3 = -f3 / 2, F(u3, function(t4) {
          var e4 = h3[t4];
          g3[t4] = g3[t4] || { bandWidth: a3, offset: y3, width: e4.width }, y3 += e4.width * (1 + p3);
        }), g3), t3;
      }
      function cM(r3) {
        return { seriesType: r3, overallReset: function(t3) {
          var e3, n3, i3 = r3 + Vx + rM;
          e3 = i3, n3 = function(t4) {
            var n4 = hM(t4, r3);
            qx(t4, i3, function(t5) {
              var e4 = n4.columnMap[uM(t5)];
              t5.getData().setLayout({ bandWidth: e4.bandWidth, offset: e4.offset, size: e4.width });
            });
          }, (t3 = (t3 = Fx(zm(t3 = t3)).keyed) && t3.get(e3)) && t3.each(function(t4) {
            n3(t4.axis);
          });
        } };
      }
      function pM(t3) {
        return { seriesType: t3, plan: Y0(), reset: function(t4) {
          var e3, x3, n3, b3, w3, S3, i3, r3, M3, T3, I3, C3, k3, D3, A3, L3;
          if ((e3 = t4).coordinateSystem && "cartesian2d" === e3.coordinateSystem.type)
            return e3 = t4.getData(), i3 = (x3 = t4.coordinateSystem).getBaseAxis(), n3 = x3.getOtherAxis(i3), b3 = e3.getDimensionIndex(e3.mapDimension(n3.dim)), w3 = e3.getDimensionIndex(e3.mapDimension(i3.dim)), S3 = t4.get("showBackground", true), i3 = e3.mapDimension(n3.dim), r3 = e3.getCalculationInfo("stackResultDimension"), M3 = S1(e3, i3) && !!e3.getCalculationInfo("stackedOnSeries"), T3 = n3.isHorizontal(), I3 = n3.toGlobalCoord(n3.dataToCoord(n3.scale.rawExtentInfo.makeRenderInfo().startValue)), C3 = dM(t4), k3 = t4.get("barMinHeight") || 0, D3 = r3 && e3.getDimensionIndex(r3), A3 = e3.getLayout("size"), L3 = e3.getLayout("offset"), { progress: function(t5, e4) {
              for (var n4, i4 = t5.count, r4 = C3 && xS(3 * i4), o3 = C3 && S3 && xS(3 * i4), a3 = C3 && xS(i4), s3 = x3.master.getRect(), l3 = T3 ? s3.width : s3.height, u3 = e4.getStore(), h3 = 0; null != (n4 = t5.next()); ) {
                var c3, p3 = u3.get(M3 ? D3 : b3, n4), d3 = u3.get(w3, n4), f3 = I3, g3 = void 0, y3 = (M3 && (g3 = +p3 - u3.get(b3, n4)), void 0), m3 = void 0, v3 = void 0, _3 = void 0;
                T3 ? (c3 = x3.dataToPoint([p3, d3]), y3 = f3 = M3 ? x3.dataToPoint([g3, d3])[0] : f3, m3 = c3[1] + L3, v3 = c3[0] - f3, _3 = A3, ta(v3) < k3 && (v3 = (v3 < 0 ? -1 : 1) * k3)) : (c3 = x3.dataToPoint([d3, p3]), M3 && (f3 = x3.dataToPoint([d3, g3])[1]), y3 = c3[0] + L3, m3 = f3, v3 = A3, _3 = c3[1] - f3, ta(_3) < k3 && (_3 = (_3 <= 0 ? -1 : 1) * k3)), C3 ? (r4[h3] = y3, r4[h3 + 1] = m3, r4[h3 + 2] = T3 ? v3 : _3, o3 && (o3[h3] = T3 ? s3.x : y3, o3[h3 + 1] = T3 ? m3 : s3.y, o3[h3 + 2] = l3), a3[n4] = n4) : e4.setItemLayout(n4, { x: y3, y: m3, width: v3, height: _3 }), h3 += 3;
              }
              C3 && e4.setLayout({ largePoints: r4, largeDataIndices: a3, largeBackgroundPoints: o3, valueAxisHorizontal: T3 });
            } };
        } };
      }
      function dM(t3) {
        return t3.pipelineContext && t3.pipelineContext.large;
      }
      function fM(t3) {
        return n3 = t3 + Vx + rM, function(t4, e3) {
          t4 = ew(t4, { fromStat: { key: n3 } });
          if (Da(t4.w2))
            return [-t4.w2 / 2, t4.w2 / 2];
        };
        var n3;
      }
      function gM(n3) {
        sM(n3, function() {
          function t3(t4) {
            var e3 = t4 + Vx + rM;
            tM(n3, e3, t4, rM), t4 = fM(t4), hb.set(e3, t4);
          }
          t3("bar"), t3("pictorialBar");
        });
      }
      var yM = { average: function(t3) {
        for (var e3 = 0, n3 = 0, i3 = 0; i3 < t3.length; i3++)
          isNaN(t3[i3]) || (e3 += t3[i3], n3++);
        return 0 === n3 ? NaN : e3 / n3;
      }, sum: function(t3) {
        for (var e3 = 0, n3 = 0; n3 < t3.length; n3++)
          e3 += t3[n3] || 0;
        return e3;
      }, max: function(t3) {
        for (var e3 = -1 / 0, n3 = 0; n3 < t3.length; n3++)
          t3[n3] > e3 && (e3 = t3[n3]);
        return isFinite(e3) ? e3 : NaN;
      }, min: function(t3) {
        for (var e3 = 1 / 0, n3 = 0; n3 < t3.length; n3++)
          t3[n3] < e3 && (e3 = t3[n3]);
        return isFinite(e3) ? e3 : NaN;
      }, nearest: function(t3) {
        return t3[0];
      } }, mM = function(t3) {
        return Math.round(t3.length / 2);
      };
      function vM(t3) {
        return { seriesType: t3, reset: function(t4, e3, n3) {
          var i3, r3 = t4.getData(), o3 = t4.get("sampling"), a3 = t4.coordinateSystem, s3 = r3.count();
          10 < s3 && "cartesian2d" === a3.type && o3 && (i3 = a3.getBaseAxis(), a3 = a3.getOtherAxis(i3), i3 = i3.getExtent(), n3 = n3.getDevicePixelRatio(), i3 = Math.abs(i3[1] - i3[0]) * (n3 || 1), n3 = Math.round(s3 / i3), isFinite(n3)) && 1 < n3 && ("lttb" === o3 ? t4.setData(r3.lttbDownSample(r3.mapDimension(a3.dim), 1 / n3)) : "minmax" === o3 && t4.setData(r3.minmaxDownSample(r3.mapDimension(a3.dim), 1 / n3)), s3 = void 0, W(o3) ? s3 = yM[o3] : H(o3) && (s3 = o3), s3) && t4.setData(r3.downSample(r3.mapDimension(a3.dim), 1 / n3, s3, mM));
        } };
      }
      u(xM, _M = z0), xM.prototype.getInitialData = function(t3, e3) {
        return T1(null, this, { useEncodeDefaulter: true });
      }, xM.prototype.getMarkerPosition = function(t3, p3, e3) {
        var d3, f3, n3 = this.coordinateSystem;
        return n3 && n3.clampData ? (d3 = n3.clampData(t3), f3 = n3.dataToPoint(d3), e3 ? F(n3.getAxes(), function(t4, e4) {
          if ("category" === t4.type && null != p3) {
            var n4 = t4.getTicksCoords(), i3 = t4.getTickModel().get("alignWithLabel"), r3 = d3[e4], o3 = "x1" === p3[e4] || "y1" === p3[e4];
            if (o3 && !i3 && (r3 += 1), !(n4.length < 2))
              if (2 === n4.length)
                f3[e4] = t4.toGlobalCoord(t4.getExtent()[o3 ? 1 : 0]);
              else {
                for (var a3 = void 0, s3 = void 0, l3 = 1, u3 = 0; u3 < n4.length; u3++) {
                  var h3 = n4[u3].coord, c3 = u3 === n4.length - 1 ? n4[u3 - 1].tickValue + l3 : n4[u3].tickValue;
                  if (c3 === r3) {
                    s3 = h3;
                    break;
                  }
                  if (c3 < r3)
                    a3 = h3;
                  else if (null != a3 && r3 < c3) {
                    s3 = (h3 + a3) / 2;
                    break;
                  }
                  1 === u3 && (l3 = c3 - n4[0].tickValue);
                }
                null == s3 && (s3 = (a3 ? n4[n4.length - 1] : n4[0]).coord), f3[e4] = t4.toGlobalCoord(s3);
              }
          }
        }) : (e3 = (t3 = this.getData()).getLayout("offset"), t3 = t3.getLayout("size"), n3 = n3.getBaseAxis().isHorizontal() ? 0 : 1, f3[n3] += e3 + t3 / 2), f3) : [NaN, NaN];
      }, xM.prototype.__requireStartValue = function(t3) {
        return this.getBaseAxis() !== t3;
      }, xM.type = "series.__base_bar__", xM.defaultOption = { z: 2, coordinateSystem: "cartesian2d", legendHoverLink: true, barMinHeight: 0, barMinAngle: 0, large: false, largeThreshold: 400, progressive: 3e3, progressiveChunkMode: "mod", defaultBarGap: "10%" };
      var _M, eh = xM;
      function xM() {
        var t3 = null !== _M && _M.apply(this, arguments) || this;
        return t3.type = xM.type, t3;
      }
      z0.registerClass(eh);
      u(SM, bM = eh), SM.prototype.getInitialData = function() {
        return T1(null, this, { useEncodeDefaulter: true, createInvertedIndices: !!this.get("realtimeSort", true) || null });
      }, SM.prototype.getProgressive = function() {
        return !!this.get("large") && this.get("progressive");
      }, SM.prototype.__preparePipelineContext = function(t3, e3) {
        t3 = ls(this, t3, e3);
        return t3.progressiveRender && (t3.large = true), t3;
      }, SM.prototype.brushSelector = function(t3, e3, n3) {
        return n3.rect(e3.getItemLayout(t3));
      }, SM.type = "series.bar", SM.dependencies = ["grid", "polar"], SM.defaultOption = Gd(eh.defaultOption, { clip: true, roundCap: false, showBackground: false, backgroundStyle: { color: "rgba(180, 180, 180, 0.2)", borderColor: null, borderWidth: 0, borderType: "solid", borderRadius: 0, shadowBlur: 0, shadowColor: null, shadowOffsetX: 0, shadowOffsetY: 0, opacity: 1 }, select: { itemStyle: { borderColor: v.color.primary, borderWidth: 2 } }, realtimeSort: false });
      var bM, wM = SM;
      function SM() {
        var t3 = null !== bM && bM.apply(this, arguments) || this;
        return t3.type = SM.type, t3;
      }
      function MM(t3, e3, n3, i3, r3) {
        var o3 = t3.getArea(), a3 = o3.x, s3 = o3.y, l3 = o3.width, o3 = o3.height, u3 = n3.get(["lineStyle", "width"]) || 0, h3 = (a3 -= u3 / 2, s3 -= u3 / 2, l3 += u3, o3 += u3, l3 = Math.ceil(l3), a3 !== Math.floor(a3) && (a3 = Math.floor(a3), l3++), new uu({ shape: { x: a3, y: s3, width: l3, height: o3 } }));
        return e3 && (e3 = (u3 = t3.getBaseAxis()).isHorizontal(), t3 = u3.inverse, e3 ? (t3 && (h3.shape.x += l3), h3.shape.width = 0) : (t3 || (h3.shape.y += o3), h3.shape.height = 0), u3 = H(r3) ? function(t4) {
          r3(t4, h3);
        } : null, Ap(h3, { shape: { width: l3, height: o3, x: a3, y: s3 } }, n3, null, i3, u3)), h3;
      }
      function TM(t3, e3, n3) {
        var i3 = t3.getArea(), r3 = C(i3.r0, 1), o3 = C(i3.r, 1), a3 = new Cc({ shape: { cx: C(t3.cx, 1), cy: C(t3.cy, 1), r0: r3, r: o3, startAngle: i3.startAngle, endAngle: i3.endAngle, clockwise: i3.clockwise } });
        return e3 && ("angle" === t3.getBaseAxis().dim ? a3.shape.endAngle = i3.startAngle : a3.shape.r = r3, Ap(a3, { shape: { endAngle: i3.endAngle, r: o3 } }, n3)), a3;
      }
      var IM, CM = function() {
        this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = 2 * Math.PI, this.clockwise = true;
      }, kM = (u(DM, IM = ql), DM.prototype.getDefaultShape = function() {
        return new CM();
      }, DM.prototype.buildPath = function(t3, e3) {
        var n3 = e3.cx, i3 = e3.cy, r3 = Math.max(e3.r0 || 0, 0), o3 = Math.max(e3.r, 0), a3 = 0.5 * (o3 - r3), s3 = r3 + a3, l3 = e3.startAngle, u3 = e3.endAngle, e3 = e3.clockwise, h3 = 2 * Math.PI, c3 = e3 ? u3 - l3 < h3 : l3 - u3 < h3, h3 = (c3 || (l3 = u3 - (e3 ? h3 : -h3)), Math.cos(l3)), p3 = Math.sin(l3), d3 = Math.cos(u3), f3 = Math.sin(u3);
        c3 ? (t3.moveTo(h3 * r3 + n3, p3 * r3 + i3), t3.arc(h3 * s3 + n3, p3 * s3 + i3, a3, -Math.PI + l3, l3, !e3)) : t3.moveTo(h3 * o3 + n3, p3 * o3 + i3), t3.arc(n3, i3, o3, l3, u3, !e3), t3.arc(d3 * s3 + n3, f3 * s3 + i3, a3, u3 - 2 * Math.PI, u3 - Math.PI, !e3), 0 !== r3 && t3.arc(n3, i3, r3, u3, l3, e3);
      }, DM);
      function DM(t3) {
        t3 = IM.call(this, t3) || this;
        return t3.type = "sausage", t3;
      }
      function AM(t3, e3) {
        return t3.type === e3;
      }
      function LM(t3, e3) {
        var n3, i3 = t3.mapDimensionsAll("defaultedLabel"), r3 = i3.length;
        if (1 === r3)
          return null != (n3 = Ny(t3, e3, i3[0])) ? n3 + "" : null;
        if (r3) {
          for (var o3 = [], a3 = 0; a3 < i3.length; a3++)
            o3.push(Ny(t3, e3, i3[a3]));
          return o3.join(" ");
        }
      }
      function PM(t3, e3) {
        var n3 = t3.mapDimensionsAll("defaultedLabel");
        if (!G(e3))
          return e3 + "";
        for (var i3 = [], r3 = 0; r3 < n3.length; r3++) {
          var o3 = t3.getDimensionIndex(n3[r3]);
          0 <= o3 && i3.push(e3[o3]);
        }
        return i3.join(" ");
      }
      function OM(t3, e3, n3) {
        return e3 * Math.sin(t3) * (n3 ? -1 : 1);
      }
      function RM(t3, e3, n3) {
        return e3 * Math.cos(t3) * (n3 ? 1 : -1);
      }
      function NM(t3, e3, n3) {
        t3 = t3.get("borderRadius");
        if (null == t3)
          return n3 ? { cornerRadius: 0 } : null;
        G(t3) || (t3 = [t3, t3, t3, t3]);
        var i3 = Math.abs(e3.r || 0 - e3.r0 || 0);
        return { cornerRadius: E(t3, function(t4) {
          return bo(t4, i3);
        }) };
      }
      var zM, BM = Math.max, EM = Math.min, VM = (u(FM, zM = j0), FM.prototype.render = function(t3, e3, n3, i3) {
        this._model = t3, this._removeOnRenderedListener(n3), this._updateDrawMode(t3);
        var r3 = t3.get("coordinateSystem");
        "cartesian2d" !== r3 && "polar" !== r3 || (this._progressiveEls = null, this._isLargeDraw ? this._renderLarge(t3, e3, n3) : this._renderNormal(t3, e3, n3, i3));
      }, FM.prototype.incrementalPrepareRender = function(t3) {
        this._clear(), this._updateDrawMode(t3), this._updateLargeClip(t3);
      }, FM.prototype.incrementalRender = function(t3, e3) {
        this._progressiveEls = [], this._incrementalRenderLarge(t3, e3);
      }, FM.prototype.eachRendered = function(t3) {
        id(this._progressiveEls || this.group, t3);
      }, FM.prototype._updateDrawMode = function(t3) {
        t3 = t3.pipelineContext.large;
        null != this._isLargeDraw && t3 === this._isLargeDraw || (this._isLargeDraw = t3, this._clear());
      }, FM.prototype._renderNormal = function(a3, t3, e3, n3) {
        var s3, l3 = this.group, u3 = a3.getData(), h3 = this._data, c3 = a3.coordinateSystem, p3 = c3.getBaseAxis(), d3 = ("cartesian2d" === c3.type ? s3 = p3.isHorizontal() : "polar" === c3.type && (s3 = "angle" === p3.dim), a3.isAnimationEnabled() ? a3 : null), f3 = function(t4, e4) {
          var t4 = t4.get("realtimeSort", true), n4 = e4.getBaseAxis();
          if (t4 && "category" === n4.type && "cartesian2d" === e4.type)
            return { baseAxis: n4, otherAxis: e4.getOtherAxis(n4) };
        }(a3, c3), g3 = (f3 && this._enableRealtimeSort(f3, u3, e3), a3.get("clip", true) || f3), y3 = c3.getArea(), m3 = (l3.removeClipPath(), a3.get("roundCap", true)), v3 = a3.get("showBackground", true), _3 = a3.getModel("backgroundStyle"), x3 = _3.get("borderRadius") || 0, b3 = [], w3 = this._backgroundEls, S3 = n3 && n3.isInitSort, M3 = n3 && "changeAxisOrder" === n3.type;
        function T3(t4) {
          var e4, n4 = ZM[c3.type](u3, t4);
          return n4 ? (e4 = s3, (e4 = new ("polar" === c3.type ? Cc : uu)({ shape: iT(e4, n4, c3), silent: true, z2: 0 })).useStyle(_3.getItemStyle()), "cartesian2d" === c3.type ? e4.setShape("r", x3) : e4.setShape("cornerRadius", x3), b3[t4] = e4) : null;
        }
        u3.diff(h3).add(function(t4) {
          var e4, n4, i4 = u3.getItemModel(t4), r4 = ZM[c3.type](u3, t4, i4);
          r4 && (v3 && T3(t4), u3.hasValue(t4)) && qM[c3.type](r4) && (e4 = false, g3 && (e4 = GM[c3.type](y3, r4)), n4 = HM[c3.type](a3, u3, t4, r4, s3, d3, p3.model, false, m3), f3 && (n4.forceLabelAnimation = true), KM(n4, u3, t4, i4, r4, a3, s3, "polar" === c3.type), S3 ? n4.attr({ shape: r4 }) : f3 ? WM(f3, d3, n4, r4, t4, s3, false, false) : Ap(n4, { shape: r4 }, a3, t4), u3.setItemGraphicEl(t4, n4), l3.add(n4), n4.ignore = e4);
        }).update(function(t4, e4) {
          var n4, i4, r4 = u3.getItemModel(t4), o3 = ZM[c3.type](u3, t4, r4);
          o3 && (v3 && (n4 = void 0, 0 === w3.length ? n4 = T3(e4) : ((n4 = w3[e4]).useStyle(_3.getItemStyle()), "cartesian2d" === c3.type ? n4.setShape("r", x3) : n4.setShape("cornerRadius", x3), b3[t4] = n4), i4 = ZM[c3.type](u3, t4), Dp(n4, { shape: iT(s3, i4, c3) }, d3, t4)), n4 = h3.getItemGraphicEl(e4), u3.hasValue(t4) && qM[c3.type](o3) ? (i4 = false, g3 && (i4 = GM[c3.type](y3, o3)) && l3.remove(n4), n4 && ("sector" === n4.type && m3 || "sausage" === n4.type && !m3) && (n4 && Rp(n4, a3, e4), n4 = null), n4 ? Np(n4) : n4 = HM[c3.type](a3, u3, t4, o3, s3, d3, p3.model, true, m3), f3 && (n4.forceLabelAnimation = true), M3 ? (e4 = n4.getTextContent()) && null != (e4 = xd(e4)).prevValue && (e4.prevValue = e4.value) : KM(n4, u3, t4, r4, o3, a3, s3, "polar" === c3.type), S3 ? n4.attr({ shape: o3 }) : f3 ? WM(f3, d3, n4, o3, t4, s3, true, M3) : Dp(n4, { shape: o3 }, a3, t4, null), u3.setItemGraphicEl(t4, n4), n4.ignore = i4, l3.add(n4)) : l3.remove(n4));
        }).remove(function(t4) {
          var e4 = h3.getItemGraphicEl(t4);
          e4 && Rp(e4, a3, t4);
        }).execute();
        var i3 = this._backgroundGroup || (this._backgroundGroup = new Vo());
        i3.removeAll();
        for (var r3 = 0; r3 < b3.length; ++r3)
          i3.add(b3[r3]);
        l3.add(i3), this._backgroundEls = b3, this._data = u3;
      }, FM.prototype._renderLarge = function(t3, e3, n3) {
        this._clear(), eT(t3, this.group), this._updateLargeClip(t3);
      }, FM.prototype._incrementalRenderLarge = function(t3, e3) {
        this._removeBackground(), eT(e3, this.group, this._progressiveEls, true);
      }, FM.prototype._updateLargeClip = function(t3) {
        var e3, n3, i3 = t3.get("clip", true) && (i3 = t3.coordinateSystem, r3 = false, t3 = t3, i3 ? "polar" === i3.type ? TM(i3, r3, t3) : "cartesian2d" === i3.type ? MM(i3, r3, t3, e3, n3) : null : null), r3 = this.group;
        i3 ? r3.setClipPath(i3) : r3.removeClipPath();
      }, FM.prototype._enableRealtimeSort = function(t3, e3, n3) {
        var i3, r3, o3 = this;
        e3.count() && (i3 = t3.baseAxis, this._isFirstFrame ? (this._dispatchInitSort(e3, t3, n3), this._isFirstFrame = false) : (r3 = function(t4) {
          t4 = e3.getItemGraphicEl(t4), t4 = t4 && t4.shape;
          return t4 && Math.abs(i3.isHorizontal() ? t4.height : t4.width) || 0;
        }, this._onRendered = function() {
          o3._updateSortWithinSameData(e3, r3, i3, n3);
        }, n3.getZr().on("rendered", this._onRendered)));
      }, FM.prototype._dataSort = function(t3, e3, i3) {
        var r3 = [];
        return t3.each(t3.mapDimension(e3.dim), function(t4, e4) {
          var n3 = i3(e4);
          r3.push({ dataIndex: e4, mappedValue: null == n3 ? NaN : n3, ordinalNumber: t4 });
        }), r3.sort(function(t4, e4) {
          return e4.mappedValue - t4.mappedValue;
        }), { ordinalNumbers: E(r3, function(t4) {
          return t4.ordinalNumber;
        }) };
      }, FM.prototype._isOrderChangedWithinSameData = function(t3, e3, n3) {
        for (var i3 = n3.scale, r3 = t3.mapDimension(n3.dim), o3 = Number.MAX_VALUE, a3 = 0, s3 = i3.getOrdinalMeta().categories.length; a3 < s3; ++a3) {
          var l3 = t3.rawIndexOf(r3, i3.getRawOrdinalNumber(a3)), l3 = l3 < 0 ? Number.MIN_VALUE : e3(t3.indexOfRawIndex(l3));
          if (o3 < l3)
            return true;
          o3 = l3;
        }
        return false;
      }, FM.prototype._isOrderDifferentInView = function(t3, e3) {
        for (var n3 = e3.scale, e3 = n3.getExtent(), i3 = Math.max(0, e3[0]), r3 = Math.min(e3[1], n3.getOrdinalMeta().categories.length - 1); i3 <= r3; ++i3)
          if (t3.ordinalNumbers[i3] !== n3.getRawOrdinalNumber(i3))
            return true;
      }, FM.prototype._updateSortWithinSameData = function(t3, e3, n3, i3) {
        this._isOrderChangedWithinSameData(t3, e3, n3) && (t3 = this._dataSort(t3, n3, e3), this._isOrderDifferentInView(t3, n3)) && (this._removeOnRenderedListener(i3), i3.dispatchAction({ type: "changeAxisOrder", componentType: n3.dim + "Axis", axisId: n3.index, sortInfo: t3 }));
      }, FM.prototype._dispatchInitSort = function(e3, n3, t3) {
        var i3 = n3.baseAxis, r3 = this._dataSort(e3, i3, function(t4) {
          return e3.get(e3.mapDimension(n3.otherAxis.dim), t4);
        });
        t3.dispatchAction({ type: "changeAxisOrder", componentType: i3.dim + "Axis", isInitSort: true, axisId: i3.index, sortInfo: r3 });
      }, FM.prototype.remove = function(t3, e3) {
        this._clear(this._model), this._removeOnRenderedListener(e3);
      }, FM.prototype.dispose = function(t3, e3) {
        this._removeOnRenderedListener(e3);
      }, FM.prototype._removeOnRenderedListener = function(t3) {
        this._onRendered && (t3.getZr().off("rendered", this._onRendered), this._onRendered = null);
      }, FM.prototype._clear = function(e3) {
        var t3 = this.group, n3 = this._data;
        e3 && e3.isAnimationEnabled() && n3 && !this._isLargeDraw ? (this._removeBackground(), this._backgroundEls = [], n3.eachItemGraphicEl(function(t4) {
          Rp(t4, e3, j(t4).dataIndex);
        })) : t3.removeAll(), this._data = null, this._isFirstFrame = true;
      }, FM.prototype._removeBackground = function() {
        this.group.remove(this._backgroundGroup), this._backgroundGroup = null;
      }, FM.type = JS, FM);
      function FM() {
        var t3 = zM.call(this) || this;
        return t3.type = JS, t3._isFirstFrame = true, t3;
      }
      var GM = { cartesian2d: function(t3, e3) {
        var n3 = e3.width < 0 ? -1 : 1, i3 = e3.height < 0 ? -1 : 1, r3 = (n3 < 0 && (e3.x += e3.width, e3.width = -e3.width), i3 < 0 && (e3.y += e3.height, e3.height = -e3.height), t3.x + t3.width), o3 = t3.y + t3.height, a3 = BM(e3.x, t3.x), s3 = EM(e3.x + e3.width, r3), t3 = BM(e3.y, t3.y), l3 = EM(e3.y + e3.height, o3), u3 = s3 < a3, h3 = l3 < t3;
        return e3.x = u3 && r3 < a3 ? s3 : a3, e3.y = h3 && o3 < t3 ? l3 : t3, e3.width = u3 ? 0 : s3 - a3, e3.height = h3 ? 0 : l3 - t3, n3 < 0 && (e3.x += e3.width, e3.width = -e3.width), i3 < 0 && (e3.y += e3.height, e3.height = -e3.height), u3 || h3;
      }, polar: function(t3, e3) {
        var n3, i3 = e3.r0 <= e3.r ? 1 : -1, r3 = (i3 < 0 && (n3 = e3.r, e3.r = e3.r0, e3.r0 = n3), EM(e3.r, t3.r)), t3 = BM(e3.r0, t3.r0), r3 = (e3.r = r3) - (e3.r0 = t3) < 0;
        return i3 < 0 && (n3 = e3.r, e3.r = e3.r0, e3.r0 = n3), r3;
      } }, HM = { cartesian2d: function(t3, e3, n3, i3, r3, o3, a3, s3, l3) {
        i3 = new uu({ shape: V({}, i3), z2: 1 });
        return i3.__dataIndex = n3, i3.name = "item", o3 && (i3.shape[r3 ? "height" : "width"] = 0), i3;
      }, polar: function(t3, e3, n3, i3, r3, o3, a3, s3, l3) {
        var b3, w3, l3 = !r3 && l3 ? kM : Cc, u3 = new l3({ shape: i3, z2: 1 }), h3 = (u3.name = "item", jM(r3));
        return u3.calculateTextPosition = (b3 = h3, w3 = { isRoundCap: l3 === kM }.isRoundCap, function(t4, e4, n4) {
          var i4 = e4.position;
          if (!i4 || i4 instanceof Array)
            return wo(t4, e4, n4);
          var i4 = b3(i4), r4 = null != e4.distance ? e4.distance : 5, o4 = this.shape, a4 = o4.cx, s4 = o4.cy, l4 = o4.r, u4 = o4.r0, h4 = (l4 + u4) / 2, c3 = o4.startAngle, p3 = o4.endAngle, d3 = (c3 + p3) / 2, f3 = w3 ? Math.abs(l4 - u4) / 2 : 0, g3 = Math.cos, y3 = Math.sin, m3 = a4 + l4 * g3(c3), v3 = s4 + l4 * y3(c3), _3 = "left", x3 = "top";
          switch (i4) {
            case "startArc":
              m3 = a4 + (u4 - r4) * g3(d3), v3 = s4 + (u4 - r4) * y3(d3), _3 = "center", x3 = "top";
              break;
            case "insideStartArc":
              m3 = a4 + (u4 + r4) * g3(d3), v3 = s4 + (u4 + r4) * y3(d3), _3 = "center", x3 = "bottom";
              break;
            case "startAngle":
              m3 = a4 + h4 * g3(c3) + OM(c3, r4 + f3, false), v3 = s4 + h4 * y3(c3) + RM(c3, r4 + f3, false), _3 = "right", x3 = "middle";
              break;
            case "insideStartAngle":
              m3 = a4 + h4 * g3(c3) + OM(c3, f3 - r4, false), v3 = s4 + h4 * y3(c3) + RM(c3, f3 - r4, false), _3 = "left", x3 = "middle";
              break;
            case "middle":
              m3 = a4 + h4 * g3(d3), v3 = s4 + h4 * y3(d3), _3 = "center", x3 = "middle";
              break;
            case "endArc":
              m3 = a4 + (l4 + r4) * g3(d3), v3 = s4 + (l4 + r4) * y3(d3), _3 = "center", x3 = "bottom";
              break;
            case "insideEndArc":
              m3 = a4 + (l4 - r4) * g3(d3), v3 = s4 + (l4 - r4) * y3(d3), _3 = "center", x3 = "top";
              break;
            case "endAngle":
              m3 = a4 + h4 * g3(p3) + OM(p3, r4 + f3, true), v3 = s4 + h4 * y3(p3) + RM(p3, r4 + f3, true), _3 = "left", x3 = "middle";
              break;
            case "insideEndAngle":
              m3 = a4 + h4 * g3(p3) + OM(p3, f3 - r4, true), v3 = s4 + h4 * y3(p3) + RM(p3, f3 - r4, true), _3 = "right", x3 = "middle";
              break;
            default:
              return wo(t4, e4, n4);
          }
          return (t4 = t4 || {}).x = m3, t4.y = v3, t4.align = _3, t4.verticalAlign = x3, t4;
        }), o3 && (h3 = {}, u3.shape[l3 = r3 ? "r" : "endAngle"] = r3 ? i3.r0 : i3.startAngle, h3[l3] = i3[l3], (s3 ? Dp : Ap)(u3, { shape: h3 }, o3)), u3;
      } };
      function WM(t3, e3, n3, i3, r3, o3, a3, s3) {
        var l3, o3 = o3 ? (l3 = { x: i3.x, width: i3.width }, { y: i3.y, height: i3.height }) : (l3 = { y: i3.y, height: i3.height }, { x: i3.x, width: i3.width });
        s3 || (a3 ? Dp : Ap)(n3, { shape: o3 }, e3, r3, null), (a3 ? Dp : Ap)(n3, { shape: l3 }, e3 ? t3.baseAxis.model : null, r3);
      }
      function UM(t3, e3) {
        for (var n3 = 0; n3 < e3.length; n3++)
          if (!isFinite(t3[e3[n3]]))
            return 1;
      }
      var XM = ["x", "y", "width", "height"], YM = ["cx", "cy", "r", "startAngle", "endAngle"], qM = { cartesian2d: function(t3) {
        return !UM(t3, XM);
      }, polar: function(t3) {
        return !UM(t3, YM);
      } }, ZM = { cartesian2d: function(t3, e3, n3) {
        var i3, t3 = t3.getItemLayout(e3);
        return t3 ? (i3 = n3 && (e3 = t3, i3 = (n3 = n3).get(["itemStyle", "borderColor"])) && "none" !== i3 ? (i3 = n3.get(["itemStyle", "borderWidth"]) || 0, n3 = isNaN(e3.width) ? Number.MAX_VALUE : Math.abs(e3.width), e3 = isNaN(e3.height) ? Number.MAX_VALUE : Math.abs(e3.height), Math.min(i3, n3, e3)) : 0, n3 = 0 < t3.width ? 1 : -1, e3 = 0 < t3.height ? 1 : -1, { x: t3.x + n3 * i3 / 2, y: t3.y + e3 * i3 / 2, width: t3.width - n3 * i3, height: t3.height - e3 * i3 }) : null;
      }, polar: function(t3, e3, n3) {
        t3 = t3.getItemLayout(e3);
        return { cx: t3.cx, cy: t3.cy, r0: t3.r0, r: t3.r, startAngle: t3.startAngle, endAngle: t3.endAngle, clockwise: t3.clockwise };
      } };
      function jM(t3) {
        return e3 = t3 ? "Arc" : "Angle", function(t4) {
          switch (t4) {
            case "start":
            case "insideStart":
            case "end":
            case "insideEnd":
              return t4 + e3;
            default:
              return t4;
          }
        };
        var e3;
      }
      function KM(t3, e3, n3, i3, r3, o3, a3, s3) {
        var l3, u3 = e3.getItemVisual(n3, "style"), h3 = (s3 ? o3.get("roundCap") || (V(h3 = t3.shape, NM(i3.getModel("itemStyle"), h3, true)), t3.setShape(h3)) : (h3 = i3.get(["itemStyle", "borderRadius"]) || 0, t3.setShape("r", h3)), t3.useStyle(u3), i3.getShallow("cursor")), c3 = (h3 && t3.attr("cursor", h3), s3 ? a3 ? r3.r >= r3.r0 ? "endArc" : "startArc" : r3.endAngle >= r3.startAngle ? "endAngle" : "startAngle" : a3 ? (h3 = r3, l3 = o3.coordinateSystem, 0 !== h3.height ? 0 < h3.height ? "bottom" : "top" : l3.getOtherAxis(l3.getBaseAxis()).inverse ? "bottom" : "top") : (l3 = r3, c3 = o3.coordinateSystem, 0 !== l3.width ? 0 <= l3.width ? "right" : "left" : c3.getOtherAxis(c3.getBaseAxis()).inverse ? "left" : "right")), p3 = dd(i3), u3 = (pd(t3, p3, { labelFetcher: o3, labelDataIndex: n3, defaultText: LM(o3.getData(), n3), inheritColor: u3.fill, defaultOpacity: u3.opacity, defaultOutsidePosition: c3 }), t3.getTextContent()), o3 = (s3 && u3 && (s3 = i3.get(["label", "position"]), t3.textConfig.inside = "middle" === s3 || null, function(t4, e4, n4, i4) {
          if (U(i4))
            t4.setTextConfig({ rotation: i4 });
          else if (G(e4))
            t4.setTextConfig({ rotation: 0 });
          else {
            var r4, i4 = t4.shape, o4 = i4.clockwise ? i4.startAngle : i4.endAngle, a4 = i4.clockwise ? i4.endAngle : i4.startAngle, s4 = (o4 + a4) / 2, i4 = n4(e4);
            switch (i4) {
              case "startArc":
              case "insideStartArc":
              case "middle":
              case "insideEndArc":
              case "endArc":
                r4 = s4;
                break;
              case "startAngle":
              case "insideStartAngle":
                r4 = o4;
                break;
              case "endAngle":
              case "insideEndAngle":
                r4 = a4;
                break;
              default:
                return t4.setTextConfig({ rotation: 0 });
            }
            n4 = 1.5 * Math.PI - r4;
            "middle" === i4 && n4 > Math.PI / 2 && n4 < 1.5 * Math.PI && (n4 -= Math.PI), t4.setTextConfig({ rotation: n4 });
          }
        }(t3, "outside" === s3 ? c3 : s3, jM(a3), i3.get(["label", "rotate"]))), s3 = u3, a3 = p3, u3 = o3.getRawValue(n3), p3 = function(t4) {
          return PM(e3, t4);
        }, s3 && ((s3 = xd(s3)).prevValue = s3.value, s3.value = u3, u3 = a3.normal, s3.valueAnimation = u3.get("valueAnimation"), s3.valueAnimation) && (s3.precision = u3.get("precision"), s3.defaultInterpolatedText = p3, s3.statesModels = a3), i3.getModel(["emphasis"]));
        Ah(t3, o3.get("focus"), o3.get("blurScope"), o3.get("disabled")), Rh(t3, i3), null != (n3 = r3).startAngle && null != n3.endAngle && n3.startAngle === n3.endAngle && (t3.style.fill = "none", t3.style.stroke = "none", F(t3.states, function(t4) {
          t4.style && (t4.style.fill = t4.style.stroke = "none");
        }));
      }
      var $M, QM = function() {
      }, JM = (u(tT, $M = ql), tT.prototype.getDefaultShape = function() {
        return new QM();
      }, tT.prototype.buildPath = function(t3, e3) {
        for (var n3 = e3.points, i3 = this.baseDimIdx, r3 = 1 - this.baseDimIdx, o3 = [], a3 = [], s3 = this.barWidth, l3 = 0; l3 < n3.length; l3 += 3)
          a3[i3] = s3, a3[r3] = n3[l3 + 2], o3[i3] = n3[l3 + i3], o3[r3] = n3[l3 + r3], t3.rect(o3[0], o3[1], a3[0], a3[1]);
      }, tT);
      function tT(t3) {
        t3 = $M.call(this, t3) || this;
        return t3.type = "largeBar", t3;
      }
      function eT(t3, e3, n3, i3) {
        var r3 = t3.getData(), o3 = r3.getLayout("valueAxisHorizontal") ? 1 : 0, a3 = r3.getLayout("largeDataIndices"), s3 = r3.getLayout("size"), l3 = t3.getModel("backgroundStyle"), u3 = r3.getLayout("largeBackgroundPoints"), h3 = i3 && (i3 = t3, Y(h3, true)) ? i3.seriesIndex + 2 : 0, u3 = (u3 && ((i3 = new JM({ shape: { points: u3 }, incremental: h3, silent: true, z2: 0 })).baseDimIdx = o3, i3.largeDataIndices = a3, i3.barWidth = s3, i3.useStyle(l3.getItemStyle()), e3.add(i3), n3) && n3.push(i3), new JM({ shape: { points: r3.getLayout("largePoints") }, incremental: h3, ignoreCoarsePointer: true, z2: 1 }));
        u3.baseDimIdx = o3, u3.largeDataIndices = a3, u3.barWidth = s3, e3.add(u3), u3.useStyle(r3.getVisual("style")), u3.style.stroke = null, j(u3).seriesIndex = t3.seriesIndex, t3.get("silent") || (u3.on("mousedown", nT), u3.on("mousemove", nT)), n3 && n3.push(u3);
      }
      var nT = nm(function(t3) {
        t3 = function(t4, e3, n3) {
          for (var i3 = t4.baseDimIdx, r3 = 1 - i3, o3 = t4.shape.points, a3 = t4.largeDataIndices, s3 = [], l3 = [], u3 = t4.barWidth, h3 = 0, c3 = o3.length / 3; h3 < c3; h3++) {
            var p3 = 3 * h3;
            if (l3[i3] = u3, l3[r3] = o3[2 + p3], s3[i3] = o3[p3 + i3], s3[r3] = o3[p3 + r3], l3[r3] < 0 && (s3[r3] += l3[r3], l3[r3] = -l3[r3]), s3[0] <= e3 && e3 <= s3[0] + l3[0] && s3[1] <= n3 && n3 <= s3[1] + l3[1])
              return a3[h3];
          }
          return -1;
        }(this, t3.offsetX, t3.offsetY);
        j(this).dataIndex = 0 <= t3 ? t3 : null;
      }, 30, false);
      function iT(t3, e3, n3) {
        var i3, r3;
        return AM(n3, "cartesian2d") ? (i3 = e3, r3 = n3.getArea(), { x: (t3 ? i3 : r3).x, y: (t3 ? r3 : i3).y, width: (t3 ? i3 : r3).width, height: (t3 ? r3 : i3).height }) : { cx: (r3 = n3.getArea()).cx, cy: r3.cy, r0: (t3 ? r3 : e3).r0, r: (t3 ? r3 : e3).r, startAngle: t3 ? e3.startAngle : 0, endAngle: t3 ? e3.endAngle : 2 * Math.PI };
      }
      _b(function(t3) {
        t3.registerChartView(VM), t3.registerSeriesModel(wM), t3.registerLayout(t3.PRIORITY.VISUAL.LAYOUT, cM(JS)), t3.registerLayout(t3.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, pM(JS)), t3.registerProcessor(t3.PRIORITY.PROCESSOR.STATISTIC, vM(JS)), t3.registerAction({ type: "changeAxisOrder", event: "changeAxisOrder", update: "update" }, function(e3, t4) {
          var n3 = e3.componentType || "series";
          t4.eachComponent({ mainType: n3, query: e3 }, function(t5) {
            e3.sortInfo && t5.axis.setCategorySortInfo(e3.sortInfo);
          });
        }), gM(t3);
      });
      u(aT, rT = z0), aT.prototype.getInitialData = function(t3) {
        return T1(null, this, { useEncodeDefaulter: true });
      }, aT.prototype.getLegendIcon = function(t3) {
        var e3 = new Vo(), n3 = jm("line", 0, t3.itemHeight / 2, t3.itemWidth, 0, t3.lineStyle.stroke, false), n3 = (e3.add(n3), n3.setStyle(t3.lineStyle), this.getData().getVisual("symbol")), i3 = this.getData().getVisual("symbolRotate"), n3 = "none" === n3 ? "circle" : n3, r3 = 0.8 * t3.itemHeight, r3 = jm(n3, (t3.itemWidth - r3) / 2, (t3.itemHeight - r3) / 2, r3, r3, t3.itemStyle.fill), i3 = (e3.add(r3), r3.setStyle(t3.itemStyle), "inherit" === t3.iconRotate ? i3 : t3.iconRotate || 0);
        return r3.rotation = i3 * Math.PI / 180, r3.setOrigin([t3.itemWidth / 2, t3.itemHeight / 2]), -1 < n3.indexOf("empty") && (r3.style.stroke = r3.style.fill, r3.style.fill = v.color.neutral00, r3.style.lineWidth = 2), e3;
      }, aT.type = "series.line", aT.dependencies = ["grid", "polar"], aT.defaultOption = { z: 3, coordinateSystem: "cartesian2d", legendHoverLink: true, clip: true, label: { position: "top" }, endLabel: { show: false, valueAnimation: true, distance: 8 }, lineStyle: { width: 2, type: "solid" }, emphasis: { scale: true }, step: false, smooth: false, smoothMonotone: null, symbol: "emptyCircle", symbolSize: 6, symbolRotate: null, showSymbol: true, showAllSymbol: "auto", connectNulls: false, sampling: "none", animationEasing: "linear", progressive: 0, hoverLayerThreshold: 1 / 0, universalTransition: { divideShape: "clone" }, triggerLineEvent: false, triggerEvent: false };
      var rT, oT = aT;
      function aT() {
        var t3 = null !== rT && rT.apply(this, arguments) || this;
        return t3.type = aT.type, t3.hasSymbolVisual = true, t3;
      }
      u(uT, sT = Vo), uT.prototype._createSymbol = function(t3, e3, n3, i3, r3, o3) {
        this.removeAll();
        o3 = jm(t3, -1, -1, 2, 2, null, o3);
        o3.attr({ z2: Y(r3, 100), culling: true, scaleX: i3[0] / 2, scaleY: i3[1] / 2 }), o3.drift = hT, this._symbolType = t3, this.add(o3);
      }, uT.prototype.stopSymbolAnimation = function(t3) {
        this.childAt(0).stopAnimation(null, t3);
      }, uT.prototype.getSymbolType = function() {
        return this._symbolType;
      }, uT.prototype.getSymbolPath = function() {
        return this.childAt(0);
      }, uT.prototype.highlight = function() {
        vh(this.childAt(0));
      }, uT.prototype.downplay = function() {
        _h(this.childAt(0));
      }, uT.prototype.setZ = function(t3, e3) {
        var n3 = this.childAt(0);
        n3.zlevel = t3, n3.z = e3;
      }, uT.prototype.setDraggable = function(t3, e3) {
        var n3 = this.childAt(0);
        n3.draggable = t3, n3.cursor = !e3 && t3 ? "move" : n3.cursor;
      }, uT.prototype.updateData = function(t3, e3, n3, i3) {
        this.silent = false;
        var r3, o3, a3, s3 = t3.getItemVisual(e3, "symbol") || "circle", l3 = t3.hostModel, u3 = uT.getSymbolSize(t3, e3), h3 = uT.getSymbolZ2(t3, e3), c3 = s3 !== this._symbolType, p3 = i3 && i3.disableAnimation;
        c3 ? (r3 = t3.getItemVisual(e3, "symbolKeepAspect"), this._createSymbol(s3, t3, e3, u3, h3, r3)) : ((o3 = this.childAt(0)).silent = false, a3 = { scaleX: u3[0] / 2, scaleY: u3[1] / 2 }, p3 ? o3.attr(a3) : Dp(o3, a3, l3, e3), Np(o3)), this._updateCommon(t3, e3, u3, n3, i3), c3 && (o3 = this.childAt(0), p3 || (a3 = { scaleX: this._sizeX, scaleY: this._sizeY, style: { opacity: o3.style.opacity } }, o3.scaleX = o3.scaleY = 0, o3.style.opacity = 0, Ap(o3, a3, l3, e3))), p3 && this.childAt(0).stopAnimation("leave");
      }, uT.prototype._updateCommon = function(e3, t3, n3, i3, r3) {
        var o3, a3, s3, l3, u3, h3, c3, p3, d3 = this.childAt(0), f3 = e3.hostModel, g3 = (i3 && (o3 = i3.emphasisItemStyle, s3 = i3.blurItemStyle, a3 = i3.selectItemStyle, l3 = i3.focus, u3 = i3.blurScope, c3 = i3.labelStatesModels, p3 = i3.hoverScale, y3 = i3.cursorStyle, h3 = i3.emphasisDisabled), i3 && !e3.hasItemOption || (o3 = (g3 = (i3 = i3 && i3.itemModel ? i3.itemModel : e3.getItemModel(t3)).getModel("emphasis")).getModel("itemStyle").getItemStyle(), a3 = i3.getModel(["select", "itemStyle"]).getItemStyle(), s3 = i3.getModel(["blur", "itemStyle"]).getItemStyle(), l3 = g3.get("focus"), u3 = g3.get("blurScope"), h3 = g3.get("disabled"), c3 = dd(i3), p3 = g3.getShallow("scale"), y3 = i3.getShallow("cursor")), e3.getItemVisual(t3, "symbolRotate")), i3 = (d3.attr("rotation", (g3 || 0) * Math.PI / 180 || 0), Km(e3.getItemVisual(t3, "symbolOffset"), n3)), g3 = (i3 && (d3.x = i3[0], d3.y = i3[1]), y3 && d3.attr("cursor", y3), e3.getItemVisual(t3, "style")), i3 = g3.fill, y3 = (d3 instanceof eu ? (y3 = d3.style, d3.useStyle(V({ image: y3.image, x: y3.x, y: y3.y, width: y3.width, height: y3.height }, g3))) : (d3.__isEmptyBrush ? d3.useStyle(V({}, g3)) : d3.useStyle(g3), d3.style.decal = null, d3.setColor(i3, r3 && r3.symbolInnerColor), d3.style.strokeNoScale = true), e3.getItemVisual(t3, "liftZ")), m3 = this._z2, v3 = (null != y3 ? null == m3 && (this._z2 = d3.z2, d3.z2 += y3) : null != m3 && (d3.z2 = m3, this._z2 = null), r3 && r3.useNameLabel);
        pd(d3, c3, { labelFetcher: f3, labelDataIndex: t3, defaultText: function(t4) {
          return v3 ? e3.getName(t4) : LM(e3, t4);
        }, inheritColor: i3, defaultOpacity: g3.opacity }), this._sizeX = n3[0] / 2, this._sizeY = n3[1] / 2;
        y3 = d3.ensureState("emphasis"), y3.style = o3, d3.ensureState("select").style = a3, d3.ensureState("blur").style = s3, m3 = null == p3 || true === p3 ? Math.max(1.1, 3 / this._sizeY) : isFinite(p3) && 0 < p3 ? +p3 : 1;
        y3.scaleX = this._sizeX * m3, y3.scaleY = this._sizeY * m3, this.setSymbolScale(1), Ah(this, l3, u3, h3);
      }, uT.prototype.setSymbolScale = function(t3) {
        this.scaleX = this.scaleY = t3;
      }, uT.prototype.fadeOut = function(t3, e3, n3) {
        var i3 = this.childAt(0), r3 = j(this).dataIndex, o3 = n3 && n3.animation;
        this.silent = i3.silent = true, n3 && n3.fadeLabel ? (n3 = i3.getTextContent()) && Pp(n3, { style: { opacity: 0 } }, e3, { dataIndex: r3, removeOpt: o3, cb: function() {
          i3.removeTextContent();
        } }) : i3.removeTextContent(), Pp(i3, { style: { opacity: 0 }, scaleX: 0, scaleY: 0 }, e3, { dataIndex: r3, cb: t3, removeOpt: o3 });
      }, uT.getSymbolSize = function(t3, e3) {
        return [(t3 = G(t3 = t3.getItemVisual(e3, "symbolSize")) ? t3 : [+t3, +t3])[0] || 0, t3[1] || 0];
      }, uT.getSymbolZ2 = function(t3, e3) {
        return t3.getItemVisual(e3, "z2");
      };
      var sT, lT = uT;
      function uT(t3, e3, n3, i3) {
        var r3 = sT.call(this) || this;
        return r3.updateData(t3, e3, n3, i3), r3;
      }
      function hT(t3, e3) {
        this.parent.drift(t3, e3);
      }
      function cT(t3, e3, n3, i3) {
        return e3 && !isNaN(e3[0]) && !isNaN(e3[1]) && !(i3 && i3.isIgnore && i3.isIgnore(n3)) && (!i3 || !i3.clipShape || i3.clipShape.contain(e3[0], e3[1])) && "none" !== t3.getItemVisual(n3, "symbol");
      }
      function pT(t3) {
        return (t3 = null == t3 || X(t3) ? t3 : { isIgnore: t3 }) || {};
      }
      function dT(t3) {
        var t3 = t3.hostModel, e3 = t3.getModel("emphasis");
        return { emphasisItemStyle: e3.getModel("itemStyle").getItemStyle(), blurItemStyle: t3.getModel(["blur", "itemStyle"]).getItemStyle(), selectItemStyle: t3.getModel(["select", "itemStyle"]).getItemStyle(), focus: e3.get("focus"), blurScope: e3.get("blurScope"), emphasisDisabled: e3.get("disabled"), hoverScale: e3.get("scale"), labelStatesModels: dd(t3), cursorStyle: t3.get("cursor") };
      }
      function fT(t3, e3, n3, i3, r3, o3, a3) {
        t3 = new t3(e3, n3, i3, r3);
        return t3.setPosition(o3), e3.setItemGraphicEl(n3, t3), a3.add(t3), t3;
      }
      yT.prototype.updateData = function(o3, a3) {
        this._progressiveEls = null, a3 = pT(a3);
        var s3 = this.group, l3 = o3.hostModel, u3 = this._data, h3 = this._SymbolCtor, c3 = a3.disableAnimation, p3 = this._seriesScope = dT(o3), d3 = { disableAnimation: c3 }, f3 = a3.getSymbolPoint || function(t3) {
          return o3.getItemLayout(t3);
        };
        u3 || s3.removeAll(), o3.diff(u3).add(function(t3) {
          var e3 = f3(t3);
          cT(o3, e3, t3, a3) && fT(h3, o3, t3, p3, d3, e3, s3);
        }).update(function(t3, e3) {
          var n3, i3, e3 = u3.getItemGraphicEl(e3), r3 = f3(t3);
          cT(o3, r3, t3, a3) ? (n3 = o3.getItemVisual(t3, "symbol") || "circle", i3 = e3 && e3.getSymbolType && e3.getSymbolType(), !e3 || i3 && i3 !== n3 ? (s3.remove(e3), (e3 = new h3(o3, t3, p3, d3)).setPosition(r3)) : (e3.updateData(o3, t3, p3, d3), i3 = { x: r3[0], y: r3[1] }, c3 ? e3.attr(i3) : Dp(e3, i3, l3)), s3.add(e3), o3.setItemGraphicEl(t3, e3)) : s3.remove(e3);
        }).remove(function(t3) {
          var e3 = u3.getItemGraphicEl(t3);
          e3 && e3.fadeOut(function() {
            s3.remove(e3);
          }, l3);
        }).execute(), this._getSymbolPoint = f3, this._data = o3;
      }, yT.prototype.updateLayout = function(t3) {
        var e3 = this._data;
        if (e3)
          for (var n3 = 0, i3 = e3.getStore().count(); n3 < i3; n3++) {
            var r3 = e3.getItemGraphicEl(n3), o3 = this._getSymbolPoint(n3);
            cT(e3, o3, n3, t3) ? ((r3 = r3 || fT(this._SymbolCtor, e3, n3, this._seriesScope, { disableAnimation: true }, o3, this.group)).stopAnimation(), r3.setPosition(o3), r3.markRedraw()) : r3 && (this.group.remove(r3), e3.setItemGraphicEl(n3, null));
          }
      }, yT.prototype.incrementalPrepareUpdate = function(t3) {
        this._seriesScope = dT(t3), this._data = null, this.group.removeAll();
      }, yT.prototype.incrementalUpdate = function(t3, e3, n3, i3) {
        function r3(t4) {
          t4.isGroup || (t4.incremental = n3, t4.ensureState("emphasis").hoverLayer = Gp);
        }
        this._progressiveEls = [], i3 = pT(i3);
        for (var o3 = t3.start; o3 < t3.end; o3++) {
          var a3, s3 = e3.getItemLayout(o3);
          cT(e3, s3, o3, i3) && ((a3 = new this._SymbolCtor(e3, o3, this._seriesScope)).traverse(r3), a3.setPosition(s3), this.group.add(a3), e3.setItemGraphicEl(o3, a3), this._progressiveEls.push(a3));
        }
      }, yT.prototype.eachRendered = function(t3) {
        id(this._progressiveEls || this.group, t3);
      }, yT.prototype.remove = function(t3) {
        var e3 = this.group, n3 = this._data;
        n3 && t3 ? n3.eachItemGraphicEl(function(t4) {
          t4.fadeOut(function() {
            e3.remove(t4);
          }, n3.hostModel);
        }) : e3.removeAll();
      };
      var gT = yT;
      function yT(t3) {
        this.group = new Vo(), this._SymbolCtor = t3 || lT;
      }
      function mT(t3, e3, n3) {
        var i3 = t3.getBaseAxis(), r3 = t3.getOtherAxis(i3), n3 = function(t4, e4) {
          var n4 = 0, t4 = t4.scale.getExtent();
          "start" === e4 ? n4 = t4[0] : "end" === e4 ? n4 = t4[1] : U(e4) && !isNaN(e4) ? n4 = e4 : 0 < t4[0] ? n4 = t4[0] : t4[1] < 0 && (n4 = t4[1]);
          return n4;
        }(r3, n3), i3 = i3.dim, r3 = r3.dim, o3 = e3.mapDimension(r3), a3 = e3.mapDimension(i3), s3 = "x" === r3 || "radius" === r3 ? 1 : 0, t3 = E(t3.dimensions, function(t4) {
          return e3.mapDimension(t4);
        }), l3 = false, u3 = e3.getCalculationInfo("stackResultDimension");
        return S1(e3, t3[0]) && (l3 = true, t3[0] = u3), S1(e3, t3[1]) && (l3 = true, t3[1] = u3), { dataDimsForPoint: t3, valueStart: n3, valueAxisDim: r3, baseAxisDim: i3, stacked: !!l3, valueDim: o3, baseDim: a3, baseDataOffset: s3, stackedOverDimension: e3.getCalculationInfo("stackedOverDimension") };
      }
      function vT(t3, e3, n3, i3) {
        var r3 = NaN, o3 = (t3.stacked && (r3 = n3.get(n3.getCalculationInfo("stackedOverDimension"), i3)), isNaN(r3) && (r3 = t3.valueStart), t3.baseDataOffset), a3 = [];
        return a3[o3] = n3.get(t3.baseDim, i3), a3[1 - o3] = r3, e3.dataToPoint(a3);
      }
      function _T(t3, e3) {
        return !isFinite(t3) || !isFinite(e3);
      }
      var xT = Math.min, bT = Math.max;
      function wT(t3, e3, n3, i3, r3, o3, a3, s3, l3) {
        for (var u3, h3, c3, p3, d3 = n3, f3 = 0; f3 < i3; f3++) {
          var g3 = e3[2 * d3], y3 = e3[2 * d3 + 1];
          if (r3 <= d3 || d3 < 0)
            break;
          if (_T(g3, y3)) {
            if (l3) {
              d3 += o3;
              continue;
            }
            break;
          }
          if (d3 === n3)
            t3[0 < o3 ? "moveTo" : "lineTo"](g3, y3), c3 = g3, p3 = y3;
          else {
            var m3 = g3 - u3, v3 = y3 - h3;
            if (m3 * m3 + v3 * v3 < 0.5) {
              d3 += o3;
              continue;
            }
            if (0 < a3) {
              for (var _3 = d3 + o3, x3 = e3[2 * _3], b3 = e3[2 * _3 + 1]; x3 === g3 && b3 === y3 && f3 < i3; )
                f3++, d3 += o3, x3 = e3[2 * (_3 += o3)], b3 = e3[2 * _3 + 1], g3 = e3[2 * d3], y3 = e3[2 * d3 + 1];
              var w3 = f3 + 1;
              if (l3)
                for (; _T(x3, b3) && w3 < i3; )
                  w3++, x3 = e3[2 * (_3 += o3)], b3 = e3[2 * _3 + 1];
              var S3, M3, T3, I3, C3, k3, D3, A3, L3, m3 = 0, v3 = 0, P3 = void 0, O3 = void 0;
              i3 <= w3 || _T(x3, b3) ? (D3 = g3, A3 = y3) : (m3 = x3 - u3, v3 = b3 - h3, S3 = g3 - u3, M3 = x3 - g3, T3 = y3 - h3, I3 = b3 - y3, k3 = C3 = void 0, O3 = "x" === s3 ? (D3 = g3 - (L3 = 0 < m3 ? 1 : -1) * (C3 = Math.abs(S3)) * a3, A3 = y3, P3 = g3 + L3 * (k3 = Math.abs(M3)) * a3, y3) : "y" === s3 ? (A3 = y3 - (L3 = 0 < v3 ? 1 : -1) * (C3 = Math.abs(T3)) * a3, P3 = D3 = g3, y3 + L3 * (k3 = Math.abs(I3)) * a3) : (C3 = Math.sqrt(S3 * S3 + T3 * T3), D3 = g3 - m3 * a3 * (1 - (S3 = (k3 = Math.sqrt(M3 * M3 + I3 * I3)) / (k3 + C3))), A3 = y3 - v3 * a3 * (1 - S3), O3 = y3 + v3 * a3 * S3, P3 = xT(P3 = g3 + m3 * a3 * S3, bT(x3, g3)), O3 = xT(O3, bT(b3, y3)), P3 = bT(P3, xT(x3, g3)), A3 = y3 - (v3 = (O3 = bT(O3, xT(b3, y3))) - y3) * C3 / k3, D3 = xT(D3 = g3 - (m3 = P3 - g3) * C3 / k3, bT(u3, g3)), A3 = xT(A3, bT(h3, y3)), P3 = g3 + (m3 = g3 - (D3 = bT(D3, xT(u3, g3)))) * k3 / C3, y3 + (v3 = y3 - (A3 = bT(A3, xT(h3, y3)))) * k3 / C3)), t3.bezierCurveTo(c3, p3, D3, A3, g3, y3), c3 = P3, p3 = O3;
            } else
              t3.lineTo(g3, y3);
          }
          u3 = g3, h3 = y3, d3 += o3;
        }
        return f3;
      }
      var ST, MT = function() {
        this.smooth = 0, this.smoothConstraint = true;
      }, TT = (u(IT, ST = ql), IT.prototype.getDefaultStyle = function() {
        return { stroke: v.color.neutral99, fill: null };
      }, IT.prototype.getDefaultShape = function() {
        return new MT();
      }, IT.prototype.buildPath = function(t3, e3) {
        var n3 = e3.points, i3 = 0, r3 = n3.length / 2;
        if (e3.connectNulls) {
          for (; 0 < r3 && _T(n3[2 * r3 - 2], n3[2 * r3 - 1]); r3--)
            ;
          for (; i3 < r3 && _T(n3[2 * i3], n3[2 * i3 + 1]); i3++)
            ;
        }
        for (; i3 < r3; )
          i3 += wT(t3, n3, i3, r3, r3, 1, e3.smooth, e3.smoothMonotone, e3.connectNulls) + 1;
      }, IT.prototype.getPointOn = function(t3, e3) {
        this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
        for (var n3, i3, r3 = this.path.data, o3 = Dl.CMD, a3 = "x" === e3, s3 = [], l3 = 0; l3 < r3.length; ) {
          var u3 = void 0, h3 = void 0;
          switch (r3[l3++]) {
            case o3.M:
              n3 = r3[l3++], i3 = r3[l3++];
              break;
            case o3.L:
              var c3, u3 = r3[l3++], h3 = r3[l3++];
              if ((c3 = a3 ? (t3 - n3) / (u3 - n3) : (t3 - i3) / (h3 - i3)) <= 1 && 0 <= c3)
                return v3 = a3 ? (h3 - i3) * c3 + i3 : (u3 - n3) * c3 + n3, a3 ? [t3, v3] : [v3, t3];
              n3 = u3, i3 = h3;
              break;
            case o3.C:
              u3 = r3[l3++], h3 = r3[l3++];
              var p3 = r3[l3++], d3 = r3[l3++], f3 = r3[l3++], g3 = r3[l3++], y3 = a3 ? ui(n3, u3, p3, f3, t3, s3) : ui(i3, h3, d3, g3, t3, s3);
              if (0 < y3)
                for (var m3 = 0; m3 < y3; m3++) {
                  var v3, _3 = s3[m3];
                  if (_3 <= 1 && 0 <= _3)
                    return v3 = a3 ? si(i3, h3, d3, g3, _3) : si(n3, u3, p3, f3, _3), a3 ? [t3, v3] : [v3, t3];
                }
              n3 = f3, i3 = g3;
          }
        }
      }, IT);
      function IT(t3) {
        t3 = ST.call(this, t3) || this;
        return t3.type = "ec-polyline", t3;
      }
      u(DT, CT = MT);
      var CT, kT = DT;
      function DT() {
        return null !== CT && CT.apply(this, arguments) || this;
      }
      u(PT, AT = ql), PT.prototype.getDefaultShape = function() {
        return new kT();
      }, PT.prototype.buildPath = function(t3, e3) {
        var n3 = e3.points, i3 = e3.stackedOnPoints, r3 = 0, o3 = n3.length / 2, a3 = e3.smoothMonotone;
        if (e3.connectNulls) {
          for (; 0 < o3 && _T(n3[2 * o3 - 2], n3[2 * o3 - 1]); o3--)
            ;
          for (; r3 < o3 && _T(n3[2 * r3], n3[2 * r3 + 1]); r3++)
            ;
        }
        for (; r3 < o3; ) {
          var s3 = wT(t3, n3, r3, o3, o3, 1, e3.smooth, a3, e3.connectNulls);
          wT(t3, i3, r3 + s3 - 1, s3, o3, -1, e3.stackedOnSmooth, a3, e3.connectNulls), r3 += s3 + 1, t3.closePath();
        }
      };
      var AT, LT = PT;
      function PT(t3) {
        t3 = AT.call(this, t3) || this;
        return t3.type = "ec-polygon", t3;
      }
      function OT(t3, e3) {
        if (t3.length === e3.length) {
          for (var n3 = 0; n3 < t3.length; n3++)
            if (t3[n3] !== e3[n3])
              return;
          return 1;
        }
      }
      function RT(t3) {
        for (var e3 = $a(), n3 = $a(), i3 = 0; i3 < t3.length; ) {
          var r3 = t3[i3++], o3 = t3[i3++];
          _T(r3, o3) || (Qa(e3, r3), Qa(n3, o3));
        }
        return [e3, n3];
      }
      function NT(t3, e3) {
        var t3 = RT(t3), n3 = t3[0], t3 = t3[1], e3 = RT(e3), i3 = e3[0], e3 = e3[1];
        return Math.max(Math.abs(n3[0] - i3[0]), Math.abs(t3[0] - e3[0]), Math.abs(n3[1] - i3[1]), Math.abs(t3[1] - e3[1]));
      }
      function zT(t3) {
        return U(t3) ? t3 : t3 ? 0.5 : 0;
      }
      function BT(t3, e3, n3, i3, r3) {
        var n3 = n3.getBaseAxis(), o3 = "x" === n3.dim || "radius" === n3.dim ? 0 : 1, a3 = [], s3 = 0, l3 = [], u3 = [], h3 = [], c3 = [];
        if (r3) {
          for (s3 = 0; s3 < t3.length; s3 += 2) {
            var p3 = e3 || t3;
            _T(p3[s3], p3[s3 + 1]) || c3.push(t3[s3], t3[s3 + 1]);
          }
          t3 = c3;
        }
        for (s3 = 0; s3 < t3.length - 2; s3 += 2)
          switch (h3[0] = t3[s3 + 2], h3[1] = t3[s3 + 3], u3[0] = t3[s3], u3[1] = t3[s3 + 1], a3.push(u3[0], u3[1]), i3) {
            case "end":
              l3[o3] = h3[o3], l3[1 - o3] = u3[1 - o3], a3.push(l3[0], l3[1]);
              break;
            case "middle":
              var d3 = [];
              l3[o3] = d3[o3] = (u3[o3] + h3[o3]) / 2, l3[1 - o3] = u3[1 - o3], d3[1 - o3] = h3[1 - o3], a3.push(l3[0], l3[1]), a3.push(d3[0], d3[1]);
              break;
            default:
              l3[o3] = u3[o3], l3[1 - o3] = h3[1 - o3], a3.push(l3[0], l3[1]);
          }
        return a3.push(t3[s3++], t3[s3++]), a3;
      }
      function ET(t3, e3, n3) {
        var i3 = t3.getVisual("visualMeta");
        if (i3 && i3.length && t3.count() && "cartesian2d" === e3.type) {
          for (var r3, o3 = i3.length - 1; 0 <= o3; o3--) {
            var a3, s3 = t3.getDimensionInfo(i3[o3].dimension);
            if ("x" === (a3 = s3 && s3.coordDim) || "y" === a3) {
              r3 = i3[o3];
              break;
            }
          }
          if (r3) {
            var l3 = e3.getAxis(a3), e3 = E(r3.stops, function(t4) {
              return { coord: l3.toGlobalCoord(l3.dataToCoord(t4.value)), color: t4.color };
            }), u3 = e3.length, h3 = r3.outerColors.slice(), n3 = (u3 && e3[0].coord > e3[u3 - 1].coord && (e3.reverse(), h3.reverse()), function(t4, e4) {
              var n4, i4, r4 = [], o4 = t4.length;
              function a4(t5, e5, n5) {
                var i5 = t5.coord;
                return { coord: n5, color: Ui((n5 - i5) / (e5.coord - i5), [t5.color, e5.color]) };
              }
              for (var s4 = 0; s4 < o4; s4++) {
                var l4 = t4[s4], u4 = l4.coord;
                if (u4 < 0)
                  n4 = l4;
                else {
                  if (e4 < u4) {
                    i4 ? r4.push(a4(i4, l4, e4)) : n4 && r4.push(a4(n4, l4, 0), a4(n4, l4, e4));
                    break;
                  }
                  n4 && (r4.push(a4(n4, l4, 0)), n4 = null), r4.push(l4), i4 = l4;
                }
              }
              return r4;
            }(e3, "x" === a3 ? n3.getWidth() : n3.getHeight())), c3 = n3.length;
            if (!c3 && u3)
              return e3[0].coord < 0 ? h3[1] || e3[u3 - 1].color : h3[0] || e3[0].color;
            var p3 = n3[0].coord - 10, u3 = n3[c3 - 1].coord + 10, d3 = u3 - p3;
            if (d3 < 1e-3)
              return "transparent";
            F(n3, function(t4) {
              t4.offset = (t4.coord - p3) / d3;
            }), n3.push({ offset: c3 ? n3[c3 - 1].offset : 0.5, color: h3[1] || "transparent" }), n3.unshift({ offset: c3 ? n3[0].offset : 0.5, color: h3[0] || "transparent" });
            e3 = new up(0, 0, 0, 0, n3, true);
            return e3[a3] = p3, e3[a3 + "2"] = u3, e3;
          }
        }
      }
      function VT(t3, e3, n3) {
        var t3 = t3.get("showAllSymbol"), i3 = "auto" === t3;
        if (!t3 || i3) {
          var r3, o3, a3 = n3.getAxesByScale("ordinal")[0];
          if (a3) {
            if (!i3 || !function(t4, e4) {
              for (var n4 = t4.getExtent(), i4 = Math.abs(n4[1] - n4[0]) / t4.scale.count(), r4 = (isNaN(i4) && (i4 = 0), e4.count()), o4 = Math.max(1, Math.round(r4 / 5)), a4 = 0; a4 < r4; a4 += o4)
                if (1.5 * lT.getSymbolSize(e4, a4)[t4.isHorizontal() ? 1 : 0] > i4)
                  return;
              return 1;
            }(a3, e3))
              return r3 = e3.mapDimension(a3.dim), o3 = {}, F(a3.getViewLabels(), function(t4) {
                t4.tick.offInterval || (o3[Rx(a3.scale, t4.tick)] = 1);
              }), function(t4) {
                return !o3.hasOwnProperty(e3.get(r3, t4));
              };
          }
        }
      }
      function FT(t3, e3) {
        return [t3[2 * e3], t3[2 * e3 + 1]];
      }
      function GT(t3) {
        if (t3.get(["endLabel", "show"]))
          return 1;
        for (var e3 = 0; e3 < Zu.length; e3++)
          if (t3.get([Zu[e3], "endLabel", "show"]))
            return 1;
      }
      function HT(n3, i3, e3, t3) {
        var r3, o3, a3, s3, l3, u3, h3, c3, p3;
        return AM(i3, "cartesian2d") ? (r3 = t3.getModel("endLabel"), o3 = r3.get("valueAnimation"), a3 = t3.getData(), s3 = { lastFrameIndex: 0 }, l3 = GT(t3) ? function(t4, e4) {
          n3._endLabelOnDuring(t4, e4, a3, s3, o3, r3, i3);
        } : null, u3 = i3.getBaseAxis().isHorizontal(), h3 = MM(i3, e3, t3, function() {
          var t4 = n3._endLabel;
          t4 && e3 && null != s3.originalX && t4.attr({ x: s3.originalX, y: s3.originalY });
        }, l3), t3.get("clip", true) || (c3 = h3.shape, p3 = Math.max(c3.width, c3.height), u3 ? (c3.y -= p3, c3.height += 2 * p3) : (c3.x -= p3, c3.width += 2 * p3)), l3 && l3(1, h3), h3) : TM(i3, e3, t3);
      }
      u(XT, WT = j0), XT.prototype.init = function() {
        var t3 = new Vo(), e3 = new gT();
        this.group.add(e3.group), this._symbolDraw = e3, this._lineGroup = t3, this._changePolyState = y(this._changePolyState, this);
      }, XT.prototype.render = function(t3, e3, n3) {
        var i3, r3 = t3.coordinateSystem, o3 = this.group, a3 = t3.getData(), s3 = t3.getModel("lineStyle"), l3 = t3.getModel("areaStyle"), u3 = a3.getLayout("points") || [], h3 = "polar" === r3.type, c3 = this._coordSys, p3 = this._symbolDraw, d3 = this._polyline, f3 = this._polygon, g3 = this._lineGroup, e3 = !e3.ssr && t3.get("animation"), y3 = !l3.isEmpty(), m3 = l3.get("origin"), v3 = mT(r3, a3, m3), v3 = y3 && function(t4, e4, n4) {
          if (null == n4.valueDim)
            return [];
          for (var i4 = e4.count(), r4 = xS(2 * i4), o4 = 0; o4 < i4; o4++) {
            var a4 = vT(n4, t4, e4, o4);
            r4[2 * o4] = a4[0], r4[2 * o4 + 1] = a4[1];
          }
          return r4;
        }(r3, a3, v3), _3 = t3.get("showSymbol"), x3 = t3.get("connectNulls"), b3 = _3 && !h3 && VT(t3, a3, r3), w3 = this._data, S3 = (w3 && w3.eachItemGraphicEl(function(t4, e4) {
          t4.__temp && (o3.remove(t4), w3.setItemGraphicEl(e4, null));
        }), _3 || p3.remove(), o3.add(g3), !h3 && t3.get("step")), M3 = (r3 && r3.getArea && t3.get("clip", true) && (null != (i3 = r3.getArea()).width ? (i3.x -= 0.1, i3.y -= 0.1, i3.width += 0.2, i3.height += 0.2) : i3.r0 && (i3.r0 -= 0.5, i3.r += 0.5)), this._clipShapeForSymbol = i3, ET(a3, r3, n3) || a3.getVisual("style")[a3.getVisual("drawType")]), c3 = (d3 && c3.type === r3.type && S3 === this._step ? (y3 && !f3 ? f3 = this._newPolygon(u3, v3) : f3 && !y3 && (g3.remove(f3), f3 = this._polygon = null), h3 || this._initOrUpdateEndLabel(t3, r3, Rf(M3)), (c3 = g3.getClipPath()) ? Ap(c3, { shape: HT(this, r3, false, t3).shape }, t3) : g3.setClipPath(HT(this, r3, true, t3)), _3 && p3.updateData(a3, { isIgnore: b3, clipShape: i3, disableAnimation: true, getSymbolPoint: function(t4) {
          return [u3[2 * t4], u3[2 * t4 + 1]];
        } }), OT(this._stackedOnPoints, v3) && OT(this._points, u3) || (e3 ? this._doUpdateAnimation(a3, v3, r3, n3, S3, m3, x3) : (S3 && (v3 = v3 && BT(v3, u3, r3, S3, x3), u3 = BT(u3, null, r3, S3, x3)), d3.setShape({ points: u3 }), f3 && f3.setShape({ points: u3, stackedOnPoints: v3 })))) : (_3 && p3.updateData(a3, { isIgnore: b3, clipShape: i3, disableAnimation: true, getSymbolPoint: function(t4) {
          return [u3[2 * t4], u3[2 * t4 + 1]];
        } }), e3 && this._initSymbolLabelAnimation(a3, r3, i3), S3 && (v3 = v3 && BT(v3, u3, r3, S3, x3), u3 = BT(u3, null, r3, S3, x3)), d3 = this._newPolyline(u3), y3 ? f3 = this._newPolygon(u3, v3) : f3 && (g3.remove(f3), f3 = this._polygon = null), h3 || this._initOrUpdateEndLabel(t3, r3, Rf(M3)), g3.setClipPath(HT(this, r3, true, t3))), t3.getModel("emphasis")), n3 = c3.get("focus"), _3 = c3.get("blurScope"), p3 = c3.get("disabled"), b3 = (d3.useStyle(B(s3.getLineStyle(), { fill: "none", stroke: M3, lineJoin: "bevel" })), Rh(d3, t3, "lineStyle"), 0 < d3.style.lineWidth && "bolder" === t3.get(["emphasis", "lineStyle", "width"]) && (d3.getState("emphasis").style.lineWidth = +d3.style.lineWidth + 1), j(d3).seriesIndex = t3.seriesIndex, Ah(d3, n3, _3, p3), zT(t3.get("smooth"))), e3 = t3.get("smoothMonotone"), T3 = (d3.setShape({ smooth: b3, smoothMonotone: e3, connectNulls: x3 }), f3 && (i3 = a3.getCalculationInfo("stackedOnSeries"), y3 = 0, f3.useStyle(B(l3.getAreaStyle(), { fill: M3, opacity: 0.7, lineJoin: "bevel", decal: a3.getVisual("style").decal })), i3 && (y3 = zT(i3.get("smooth"))), f3.setShape({ smooth: b3, stackedOnSmooth: y3, smoothMonotone: e3, connectNulls: x3 }), Rh(f3, t3, "areaStyle"), j(f3).seriesIndex = t3.seriesIndex, Ah(f3, n3, _3, p3)), this._changePolyState), h3 = (a3.eachItemGraphicEl(function(t4) {
          t4 && (t4.onHoverStateChange = T3);
        }), this._polyline.onHoverStateChange = T3, this._data = a3, this._coordSys = r3, this._stackedOnPoints = v3, this._points = u3, this._step = S3, this._valueOrigin = m3, t3.get("triggerEvent")), g3 = t3.get("triggerLineEvent"), c3 = true === g3 || true === h3 || "area" === h3;
        this.packEventData(t3, d3, true === g3 || true === h3 || "line" === h3), f3 && this.packEventData(t3, f3, c3);
      }, XT.prototype.packEventData = function(t3, e3, n3) {
        j(e3).eventData = n3 ? { componentType: "series", componentSubType: "line", componentIndex: t3.componentIndex, seriesIndex: t3.seriesIndex, seriesName: t3.name, seriesType: "line", selfType: e3 === this._polygon ? "area" : "line" } : null;
      }, XT.prototype.highlight = function(t3, e3, n3, i3) {
        var r3 = t3.getData(), o3 = Wa(r3, i3);
        if (this._changePolyState("emphasis"), !(o3 instanceof Array) && null != o3 && 0 <= o3) {
          var a3 = r3.getLayout("points");
          if (!(l3 = r3.getItemGraphicEl(o3))) {
            var s3 = a3[2 * o3], a3 = a3[2 * o3 + 1];
            if (_T(s3, a3))
              return;
            if (this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(s3, a3))
              return;
            var l3, u3 = t3.get("zlevel") || 0, h3 = t3.get("z") || 0, s3 = ((l3 = new lT(r3, o3)).x = s3, l3.y = a3, l3.setZ(u3, h3), l3.getSymbolPath().getTextContent());
            s3 && (s3.zlevel = u3, s3.z = h3, s3.z2 = this._polyline.z2 + 1), l3.__temp = true, r3.setItemGraphicEl(o3, l3), l3.stopSymbolAnimation(true), this.group.add(l3);
          }
          l3.highlight();
        } else
          j0.prototype.highlight.call(this, t3, e3, n3, i3);
      }, XT.prototype.downplay = function(t3, e3, n3, i3) {
        var r3, o3 = t3.getData(), a3 = Wa(o3, i3);
        this._changePolyState("normal"), null != a3 && 0 <= a3 ? (r3 = o3.getItemGraphicEl(a3)) && (r3.__temp ? (o3.setItemGraphicEl(a3, null), this.group.remove(r3)) : r3.downplay()) : j0.prototype.downplay.call(this, t3, e3, n3, i3);
      }, XT.prototype._changePolyState = function(t3) {
        var e3 = this._polygon;
        ph(this._polyline, t3), e3 && ph(e3, t3);
      }, XT.prototype._newPolyline = function(t3) {
        var e3 = this._polyline;
        return e3 && this._lineGroup.remove(e3), e3 = new TT({ shape: { points: t3 }, segmentIgnoreThreshold: 2, z2: 10 }), this._lineGroup.add(e3), this._polyline = e3;
      }, XT.prototype._newPolygon = function(t3, e3) {
        var n3 = this._polygon;
        return n3 && this._lineGroup.remove(n3), n3 = new LT({ shape: { points: t3, stackedOnPoints: e3 }, segmentIgnoreThreshold: 2 }), this._lineGroup.add(n3), this._polygon = n3;
      }, XT.prototype._initSymbolLabelAnimation = function(t3, l3, u3) {
        var h3, c3, e3 = l3.getBaseAxis(), p3 = e3.inverse, e3 = ("cartesian2d" === l3.type ? (h3 = e3.isHorizontal(), c3 = false) : "polar" === l3.type && (h3 = "angle" === e3.dim, c3 = true), t3.hostModel), d3 = e3.get("animationDuration"), f3 = (H(d3) && (d3 = d3(null)), e3.get("animationDelay") || 0), g3 = H(f3) ? f3(null) : f3;
        t3.eachItemGraphicEl(function(t4, e4) {
          var n3, i3, r3, o3, a3, s3 = t4;
          s3 && (o3 = [t4.x, t4.y], a3 = i3 = n3 = void 0, u3 && (a3 = c3 ? (r3 = u3, o3 = l3.pointToCoord(o3), h3 ? (n3 = r3.startAngle, i3 = r3.endAngle, -o3[1] / 180 * Math.PI) : (n3 = r3.r0, i3 = r3.r, o3[0])) : h3 ? (n3 = u3.x, i3 = u3.x + u3.width, t4.x) : (n3 = u3.y + u3.height, i3 = u3.y, t4.y)), r3 = i3 === n3 ? 0 : (a3 - n3) / (i3 - n3), p3 && (r3 = 1 - r3), o3 = H(f3) ? f3(e4) : d3 * r3 + g3, a3 = (t4 = s3.getSymbolPath()).getTextContent(), s3.attr({ scaleX: 0, scaleY: 0 }), s3.animateTo({ scaleX: 1, scaleY: 1 }, { duration: 200, setToFinal: true, delay: o3 }), a3 && a3.animateFrom({ style: { opacity: 0 } }, { duration: 300, delay: o3 }), t4.disableLabelAnimation = true);
        });
      }, XT.prototype._initOrUpdateEndLabel = function(t3, e3, n3) {
        var i3, r3, o3, a3 = t3.getModel("endLabel");
        GT(t3) ? (i3 = t3.getData(), r3 = this._polyline, (o3 = i3.getLayout("points")) ? (this._endLabel || ((this._endLabel = new gu({ z2: 200 })).ignoreClip = true, r3.setTextContent(this._endLabel), r3.disableLabelAnimation = true), 0 <= (o3 = function(t4) {
          for (var e4 = t4.length / 2; 0 < e4 && _T(t4[2 * e4 - 2], t4[2 * e4 - 1]); e4--)
            ;
          return e4 - 1;
        }(o3)) && (pd(r3, dd(t3, "endLabel"), { inheritColor: n3, labelFetcher: t3, labelDataIndex: o3, defaultText: function(t4, e4, n4) {
          return null != n4 ? PM(i3, n4) : LM(i3, t4);
        }, enableTextSetter: true }, (n3 = a3, o3 = (t3 = (t3 = e3).getBaseAxis()).isHorizontal(), t3 = t3.inverse, a3 = o3 ? t3 ? "right" : "left" : "center", o3 = o3 ? "middle" : t3 ? "top" : "bottom", { normal: { align: n3.get("align") || a3, verticalAlign: n3.get("verticalAlign") || o3 } })), r3.textConfig.position = null)) : (r3.removeTextContent(), this._endLabel = null)) : this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null);
      }, XT.prototype._endLabelOnDuring = function(t3, e3, n3, i3, r3, o3, a3) {
        var s3, l3, u3, h3, c3, p3, d3, f3, g3, y3, m3 = this._endLabel, v3 = this._polyline;
        m3 && (t3 < 1 && null == i3.originalX && (i3.originalX = m3.x, i3.originalY = m3.y), s3 = n3.getLayout("points"), g3 = (l3 = n3.hostModel).get("connectNulls"), u3 = o3.get("precision"), o3 = o3.get("distance") || 0, c3 = (a3 = a3.getBaseAxis()).isHorizontal(), a3 = a3.inverse, e3 = e3.shape, h3 = (c3 ? o3 : 0) * (a3 ? -1 : 1), o3 = (c3 ? 0 : -o3) * (a3 ? -1 : 1), d3 = void 0, 1 <= (f3 = (p3 = (c3 = function(t4, e4, n4) {
          for (var i4, r4, o4 = t4.length / 2, a4 = "x" === n4 ? 0 : 1, s4 = 0, l4 = -1, u4 = 0; u4 < o4; u4++)
            if (!_T(r4 = t4[2 * u4 + a4], t4[2 * u4 + 1 - a4])) {
              if (0 !== u4) {
                if (i4 <= e4 && e4 <= r4 || e4 <= i4 && r4 <= e4) {
                  l4 = u4;
                  break;
                }
                s4 = u4;
              }
              i4 = r4;
            }
          return { range: [s4, l4], t: (e4 - i4) / (r4 - i4) };
        }(s3, a3 = a3 ? c3 ? e3.x : e3.y + e3.height : c3 ? e3.x + e3.width : e3.y, e3 = c3 ? "x" : "y")).range)[1] - p3[0]) ? (1 < f3 && !g3 ? (y3 = FT(s3, p3[0]), m3.attr({ x: y3[0] + h3, y: y3[1] + o3 }), r3 && (d3 = l3.getRawValue(p3[0]))) : ((y3 = v3.getPointOn(a3, e3)) && m3.attr({ x: y3[0] + h3, y: y3[1] + o3 }), f3 = l3.getRawValue(p3[0]), g3 = l3.getRawValue(p3[1]), r3 && (d3 = Ka(n3, u3, f3, g3, c3.t))), i3.lastFrameIndex = p3[0]) : (y3 = FT(s3, v3 = 1 === t3 || 0 < i3.lastFrameIndex ? p3[0] : 0), r3 && (d3 = l3.getRawValue(v3)), m3.attr({ x: y3[0] + h3, y: y3[1] + o3 })), r3) && "function" == typeof (a3 = xd(m3)).setLabelText && a3.setLabelText(d3);
      }, XT.prototype._doUpdateAnimation = function(t3, e3, n3, i3, r3, o3, a3) {
        var s3 = this._polyline, l3 = this._polygon, u3 = t3.hostModel, e3 = function(t4, e4, n4, i4, r4, o4) {
          a4 = [], e4.diff(t4).add(function(t5) {
            a4.push({ cmd: "+", idx: t5 });
          }).update(function(t5, e5) {
            a4.push({ cmd: "=", idx: e5, idx1: t5 });
          }).remove(function(t5) {
            a4.push({ cmd: "-", idx: t5 });
          }).execute();
          for (var a4, s4 = a4, l4 = [], u4 = [], h4 = [], c4 = [], p4 = [], d4 = [], f4 = [], g4 = mT(r4, e4, o4), y4 = t4.getLayout("points") || [], m4 = e4.getLayout("points") || [], v3 = 0; v3 < s4.length; v3++) {
            var _3 = s4[v3], x3 = true, b3 = void 0;
            switch (_3.cmd) {
              case "=":
                var w3 = 2 * _3.idx, b3 = 2 * _3.idx1, S3 = y4[w3], M3 = y4[1 + w3], T3 = m4[b3], I3 = m4[b3 + 1];
                (isNaN(S3) || isNaN(M3)) && (S3 = T3, M3 = I3), l4.push(S3, M3), u4.push(T3, I3), h4.push(n4[w3], n4[1 + w3]), c4.push(i4[b3], i4[b3 + 1]), f4.push(e4.getRawIndex(_3.idx1));
                break;
              case "+":
                S3 = _3.idx, M3 = g4.dataDimsForPoint, T3 = r4.dataToPoint([e4.get(M3[0], S3), e4.get(M3[1], S3)]), I3 = (b3 = 2 * S3, l4.push(T3[0], T3[1]), u4.push(m4[b3], m4[b3 + 1]), vT(g4, r4, e4, S3));
                h4.push(I3[0], I3[1]), c4.push(i4[b3], i4[b3 + 1]), f4.push(e4.getRawIndex(S3));
                break;
              case "-":
                x3 = false;
            }
            x3 && (p4.push(_3), d4.push(d4.length));
          }
          d4.sort(function(t5, e5) {
            return f4[t5] - f4[e5];
          });
          for (var C3 = xS(o4 = l4.length), k3 = xS(o4), D3 = xS(o4), A3 = xS(o4), L3 = [], v3 = 0; v3 < d4.length; v3++) {
            var P3 = d4[v3], O3 = 2 * v3, R3 = 2 * P3;
            C3[O3] = l4[R3], C3[1 + O3] = l4[1 + R3], k3[O3] = u4[R3], k3[1 + O3] = u4[1 + R3], D3[O3] = h4[R3], D3[1 + O3] = h4[1 + R3], A3[O3] = c4[R3], A3[1 + O3] = c4[1 + R3], L3[v3] = p4[P3];
          }
          return { current: C3, next: k3, stackedOnCurrent: D3, stackedOnNext: A3, status: L3 };
        }(this._data, t3, this._stackedOnPoints, e3, this._coordSys, this._valueOrigin), h3 = e3.current, c3 = e3.stackedOnCurrent, p3 = e3.next, d3 = e3.stackedOnNext;
        if (r3 && (c3 = BT(e3.stackedOnCurrent, e3.current, n3, r3, a3), h3 = BT(e3.current, null, n3, r3, a3), d3 = BT(e3.stackedOnNext, e3.next, n3, r3, a3), p3 = BT(e3.next, null, n3, r3, a3)), 3e3 < NT(h3, p3) || l3 && 3e3 < NT(c3, d3))
          s3.stopAnimation(), s3.setShape({ points: p3 }), l3 && (l3.stopAnimation(), l3.setShape({ points: p3, stackedOnPoints: d3 }));
        else {
          s3.shape.__points = e3.current, s3.shape.points = h3;
          for (var f3, n3 = { shape: { points: p3 } }, g3 = (e3.current !== h3 && (n3.shape.__points = e3.next), s3.stopAnimation(), Dp(s3, n3, u3), l3 && (l3.setShape({ points: h3, stackedOnPoints: c3 }), l3.stopAnimation(), Dp(l3, { shape: { stackedOnPoints: d3 } }, u3), s3.shape.points !== l3.shape.points) && (l3.shape.points = s3.shape.points), []), y3 = e3.status, m3 = 0; m3 < y3.length; m3++)
            "=" === y3[m3].cmd && (f3 = t3.getItemGraphicEl(y3[m3].idx1)) && g3.push({ el: f3, ptIdx: m3 });
          s3.animators && s3.animators.length && s3.animators[0].during(function() {
            l3 && l3.dirtyShape();
            for (var t4 = s3.shape.__points, e4 = 0; e4 < g3.length; e4++) {
              var n4 = g3[e4].el, i4 = 2 * g3[e4].ptIdx;
              n4.x = t4[i4], n4.y = t4[1 + i4], n4.markRedraw();
            }
          });
        }
      }, XT.prototype.remove = function(t3) {
        var n3 = this.group, i3 = this._data;
        this._lineGroup.removeAll(), this._symbolDraw.remove(true), i3 && i3.eachItemGraphicEl(function(t4, e3) {
          t4.__temp && (n3.remove(t4), i3.setItemGraphicEl(e3, null));
        }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
      }, XT.type = "line";
      var WT, UT = XT;
      function XT() {
        return null !== WT && WT.apply(this, arguments) || this;
      }
      _b(function(t3) {
        var i3;
        t3.registerChartView(UT), t3.registerSeriesModel(oT), t3.registerLayout((i3 = true, { seriesType: "line", plan: Y0(), reset: function(t4) {
          var h3, e3, c3, p3, d3, n3 = t4.getData(), f3 = t4.coordinateSystem, t4 = t4.pipelineContext, g3 = i3 || t4.large;
          if (f3)
            return t4 = E(f3.dimensions, function(t5) {
              return n3.mapDimension(t5);
            }).slice(0, 2), h3 = t4.length, e3 = n3.getCalculationInfo("stackResultDimension"), S1(n3, t4[0]) && (t4[0] = e3), S1(n3, t4[1]) && (t4[1] = e3), c3 = n3.getStore(), p3 = n3.getDimensionIndex(t4[0]), d3 = n3.getDimensionIndex(t4[1]), h3 && { progress: function(t5, e4) {
              for (var n4 = t5.end - t5.start, i4 = g3 && xS(n4 * h3), r3 = [], o3 = [], a3 = t5.start, s3 = 0; a3 < t5.end; a3++) {
                var l3, u3 = void 0;
                u3 = 1 === h3 ? (l3 = c3.get(p3, a3), f3.dataToPoint(l3, null, o3)) : (r3[0] = c3.get(p3, a3), r3[1] = c3.get(d3, a3), f3.dataToPoint(r3, null, o3)), g3 ? (i4[s3++] = u3[0], i4[s3++] = u3[1]) : e4.setItemLayout(a3, u3.slice());
              }
              g3 && (e4.setLayout("points", i4), e4.setLayout("pointsRange", { start: t5.start, end: t5.end }));
            } };
        } })), t3.registerVisual({ seriesType: "line", reset: function(t4) {
          var e3 = t4.getData(), t4 = t4.getModel("lineStyle").getLineStyle();
          t4 && !t4.stroke && (t4.stroke = e3.getVisual("style").fill), e3.setVisual("legendLineStyle", t4);
        } }), t3.registerProcessor(t3.PRIORITY.PROCESSOR.STATISTIC, vM("line"));
      });
      qT.prototype.getAllNames = function() {
        var t3 = this._getRawData();
        return t3.mapArray(t3.getName);
      }, qT.prototype.containName = function(t3) {
        return 0 <= this._getRawData().indexOfName(t3);
      }, qT.prototype.indexOfName = function(t3) {
        return this._getDataWithEncodedVisual().indexOfName(t3);
      }, qT.prototype.getItemVisual = function(t3, e3) {
        return this._getDataWithEncodedVisual().getItemVisual(t3, e3);
      };
      var YT = qT;
      function qT(t3, e3) {
        this._getDataWithEncodedVisual = t3, this._getRawData = e3;
      }
      var ZT, jT = "pie", KT = i(), $T = (u(QT, ZT = z0), QT.prototype.init = function(t3) {
        ZT.prototype.init.apply(this, arguments), this.legendVisualProvider = new YT(y(this.getData, this), y(this.getRawData, this)), this._defaultLabelLine(t3);
      }, QT.prototype.mergeOption = function() {
        ZT.prototype.mergeOption.apply(this, arguments);
      }, QT.prototype.getInitialData = function() {
        return e3 = G(e3 = { coordDimensions: ["value"], encodeDefaulter: yt(bg, t3 = this) }) ? { coordDimensions: e3 } : V({ encodeDefine: t3.getEncode() }, e3), i3 = t3.getSource(), e3 = v1(i3, e3).dimensions, (e3 = new m1(e3, t3)).initData(i3, n3), e3;
        var t3, e3, n3, i3;
      }, QT.prototype.getDataParams = function(t3) {
        var e3, n3 = this.getData(), i3 = KT(n3), r3 = i3.seats, i3 = (r3 || (e3 = [], n3.each(n3.mapDimension("value"), function(t4) {
          e3.push(t4);
        }), r3 = i3.seats = ga(e3, n3.hostModel.get("percentPrecision"))), ZT.prototype.getDataParams.call(this, t3));
        return i3.percent = r3[t3] || 0, i3.$vars.push("percent"), i3;
      }, QT.prototype._defaultLabelLine = function(t3) {
        Oa(t3, "labelLine", ["show"]);
        var e3 = t3.labelLine, n3 = t3.emphasis.labelLine;
        e3.show = e3.show && t3.label.show, n3.show = n3.show && t3.emphasis.label.show;
      }, QT.type = "series.pie", QT.defaultOption = { z: 2, legendHoverLink: true, colorBy: "data", center: ["50%", "50%"], radius: [0, "50%"], clockwise: true, startAngle: 90, endAngle: "auto", padAngle: 0, minAngle: 0, minShowLabelAngle: 0, selectedOffset: 10, percentPrecision: 2, stillShowZeroSum: true, coordinateSystemUsage: "box", left: 0, top: 0, right: 0, bottom: 0, width: null, height: null, label: { rotate: 0, show: true, overflow: "truncate", position: "outer", alignTo: "none", edgeDistance: "25%", distanceToLabelLine: 5 }, labelLine: { show: true, length: 15, length2: 30, smooth: false, minTurnAngle: 90, maxSurfaceAngle: 90, lineStyle: { width: 1, type: "solid" } }, itemStyle: { borderWidth: 1, borderJoin: "round" }, showEmptyCircle: true, emptyCircleStyle: { color: "lightgray", opacity: 1 }, labelLayout: { hideOverlap: true }, emphasis: { scale: true, scaleSize: 5 }, avoidLabelOverlap: true, animationType: "expansion", animationDuration: 1e3, animationTypeUpdate: "transition", animationEasingUpdate: "cubicInOut", animationDurationUpdate: 500, animationEasing: "cubicInOut" }, QT);
      function QT() {
        var t3 = null !== ZT && ZT.apply(this, arguments) || this;
        return t3.type = QT.type, t3;
      }
      af = { fullType: $T.type, getCoord2: function(t3) {
        return t3.getShallow("center");
      } }, Hf.set(af.fullType, { getCoord2: void 0 }).getCoord2 = af.getCoord2;
      var JT = Math.PI / 180;
      function tI(t3, s3, l3, u3, h3, e3, n3, i3, r3, o3) {
        if (!(t3.length < 2)) {
          for (var a3, c3 = t3.length, p3 = 0; p3 < c3; p3++)
            "outer" === t3[p3].position && "labelLine" === t3[p3].labelAlignTo && (a3 = t3[p3].label.x - o3, t3[p3].linePoints[1][0] += a3, t3[p3].label.x = o3);
          if (Nw(t3, 1, r3, r3 + n3)) {
            for (var d3, f3, g3, y3, m3, v3 = t3, _3 = { list: [], maxY: 0 }, x3 = { list: [], maxY: 0 }, b3 = 0; b3 < v3.length; b3++)
              "none" === v3[b3].labelAlignTo && (f3 = (d3 = v3[b3]).label.y > l3 ? x3 : _3, (g3 = Math.abs(d3.label.y - l3)) >= f3.maxY && (m3 = d3.label.x - s3 - d3.len2 * h3, y3 = u3 + d3.len, m3 = Math.abs(m3) < y3 ? Math.sqrt(g3 * g3 / (1 - m3 * m3 / y3 / y3)) : y3, f3.rB = m3, f3.maxY = g3), f3.list.push(d3));
            w3(_3), w3(x3);
          }
        }
        function w3(t4) {
          for (var e4 = t4.rB, n4 = e4 * e4, i4 = 0; i4 < t4.list.length; i4++) {
            var r4 = t4.list[i4], o4 = Math.abs(r4.label.y - l3), a4 = u3 + r4.len, o4 = Math.sqrt(Math.abs((1 - o4 * o4 / n4) * (a4 * a4))), a4 = s3 + (o4 + r4.len2) * h3, o4 = a4 - r4.label.x;
            eI(r4, r4.targetTextWidth - o4 * h3, true), r4.label.x = a4;
          }
        }
      }
      function eI(t3, e3, n3) {
        var i3, r3, o3, a3, s3, l3;
        null == t3.labelStyleWidth && (s3 = (i3 = t3.label).style, r3 = t3.rect, l3 = s3.backgroundColor, o3 = (o3 = s3.padding) ? o3[1] + o3[3] : 0, s3 = s3.overflow, e3 < (a3 = r3.width + (l3 ? 0 : o3)) || n3) && (s3 && s3.match("break") ? (i3.setStyle("backgroundColor", null), i3.setStyle("width", e3 - o3), s3 = i3.getBoundingRect(), i3.setStyle("width", Math.ceil(s3.width)), i3.setStyle("backgroundColor", l3)) : (s3 = e3 - o3, l3 = !(e3 < a3) && (!n3 || s3 > t3.unconstrainedWidth) ? null : s3, i3.setStyle("width", l3)), nI(r3, i3));
      }
      function nI(t3, e3) {
        rI.rect = t3, Lw(rI, e3, iI);
      }
      var iI = { minMarginForce: [null, 0, null, 0], marginDefault: [1, 0, 1, 0] }, rI = {};
      function oI(t3) {
        return "center" === t3.position;
      }
      function aI(t3) {
        var S3, M3, T3 = t3.getData(), I3 = [], C3 = false, z3 = (t3.get("minShowLabelAngle") || 0) * JT, e3 = T3.getLayout("viewRect"), k3 = T3.getLayout("r"), D3 = e3.width, A3 = e3.x, n3 = e3.y, L3 = e3.height;
        function P3(t4) {
          t4.ignore = true;
        }
        if (T3.each(function(t4) {
          var e4, n4, i4, r4, o4, a4, s4, l4, u4, h4, c4 = T3.getItemGraphicEl(t4), p4 = c4.shape, d4 = c4.getTextContent(), f4 = c4.getTextGuideLine(), t4 = T3.getItemModel(t4), g4 = t4.getModel("label"), y4 = g4.get("position") || t4.get(["emphasis", "label", "position"]), m4 = g4.get("distanceToLabelLine"), v4 = g4.get("alignTo"), _4 = ha(g4.get("edgeDistance"), D3), x4 = g4.get("bleedMargin"), t4 = (null == x4 && (x4 = 200 < Math.min(D3, L3) ? 10 : 2), t4.getModel("labelLine")), b4 = t4.get("length"), b4 = ha(b4, D3), w4 = t4.get("length2"), w4 = ha(w4, D3);
          Math.abs(p4.endAngle - p4.startAngle) < z3 ? (F(d4.states, P3), d4.ignore = true, f4 && (F(f4.states, P3), f4.ignore = true)) : function(t5) {
            if (!t5.ignore)
              return 1;
            for (var e5 in t5.states)
              if (false === t5.states[e5].ignore)
                return 1;
          }(d4) && (h4 = (p4.startAngle + p4.endAngle) / 2, e4 = Math.cos(h4), n4 = Math.sin(h4), S3 = p4.cx, M3 = p4.cy, i4 = "inside" === y4 || "inner" === y4, s4 = "center" === y4 ? (r4 = p4.cx, o4 = p4.cy, "center") : (r4 = (s4 = (i4 ? (p4.r + p4.r0) / 2 * e4 : p4.r * e4) + S3) + 3 * e4, o4 = (l4 = (i4 ? (p4.r + p4.r0) / 2 * n4 : p4.r * n4) + M3) + 3 * n4, i4 || (a4 = s4 + e4 * (b4 + k3 - p4.r), p4 = l4 + n4 * (b4 + k3 - p4.r), u4 = a4 + (e4 < 0 ? -1 : 1) * w4, r4 = "edge" === v4 ? e4 < 0 ? A3 + _4 : A3 + D3 - _4 : u4 + (e4 < 0 ? -m4 : m4), a4 = [[s4, l4], [a4, o4 = p4], [u4, p4]]), i4 ? "center" : "edge" === v4 ? 0 < e4 ? "right" : "left" : 0 < e4 ? "left" : "right"), l4 = Math.PI, u4 = 0, U(p4 = g4.get("rotate")) ? u4 = p4 * (l4 / 180) : "center" === y4 ? u4 = 0 : "radial" === p4 || true === p4 ? u4 = e4 < 0 ? -h4 + l4 : -h4 : ("tangential" === p4 || "tangential-noflip" === p4 && "outside" !== y4 && "outer" !== y4) && ((g4 = Math.atan2(e4, n4)) < 0 && (g4 = 2 * l4 + g4), u4 = (g4 = 0 < n4 && "tangential-noflip" !== p4 ? l4 + g4 : g4) - l4), C3 = !!u4, d4.x = r4, d4.y = o4, d4.rotation = u4, d4.setStyle({ verticalAlign: "middle" }), i4 ? (d4.setStyle({ align: s4 }), (h4 = d4.states.select) && (h4.x += d4.x, h4.y += d4.y)) : (nI(p4 = new Z(0, 0, 0, 0), d4), I3.push({ label: d4, labelLine: f4, position: y4, len: b4, len2: w4, minTurnAngle: t4.get("minTurnAngle"), maxSurfaceAngle: t4.get("maxSurfaceAngle"), surfaceNormal: new q(e4, n4), linePoints: a4, textAlign: s4, labelDistance: m4, labelAlignTo: v4, edgeDistance: _4, bleedMargin: x4, rect: p4, unconstrainedWidth: p4.width, labelStyleWidth: d4.style.width })), c4.setTextConfig({ inside: i4 }));
        }), !C3 && t3.get("avoidLabelOverlap")) {
          for (var i3 = I3, r3 = S3, e3 = M3, t3 = k3, o3 = D3, a3 = L3, s3 = A3, l3 = [], u3 = [], h3 = Number.MAX_VALUE, c3 = -Number.MAX_VALUE, p3 = 0; p3 < i3.length; p3++) {
            var d3 = i3[p3].label;
            oI(i3[p3]) || (d3.x < r3 ? (h3 = Math.min(h3, d3.x), l3) : (c3 = Math.max(c3, d3.x), u3)).push(i3[p3]);
          }
          for (var f3, p3 = 0; p3 < i3.length; p3++)
            !oI(g3 = i3[p3]) && g3.linePoints && null == g3.labelStyleWidth && (d3 = g3.label, y3 = g3.linePoints, f3 = void 0, f3 = "edge" === g3.labelAlignTo ? d3.x < r3 ? y3[2][0] - g3.labelDistance - s3 - g3.edgeDistance : s3 + o3 - g3.edgeDistance - y3[2][0] - g3.labelDistance : "labelLine" === g3.labelAlignTo ? d3.x < r3 ? h3 - s3 - g3.bleedMargin : s3 + o3 - c3 - g3.bleedMargin : d3.x < r3 ? d3.x - s3 - g3.bleedMargin : s3 + o3 - d3.x - g3.bleedMargin, g3.targetTextWidth = f3, eI(g3, f3, false));
          tI(u3, r3, e3, t3, 1, 0, a3, 0, n3, c3), tI(l3, r3, e3, t3, -1, 0, a3, 0, n3, h3);
          for (var g3, y3, m3, v3, _3, p3 = 0; p3 < i3.length; p3++)
            !oI(g3 = i3[p3]) && g3.linePoints && (d3 = g3.label, y3 = g3.linePoints, m3 = "edge" === g3.labelAlignTo, v3 = (v3 = d3.style.padding) ? v3[1] + v3[3] : 0, v3 = d3.style.backgroundColor ? 0 : v3, v3 = g3.rect.width + v3, _3 = y3[1][0] - y3[2][0], m3 ? d3.x < r3 ? y3[2][0] = s3 + g3.edgeDistance + v3 + g3.labelDistance : y3[2][0] = s3 + o3 - g3.edgeDistance - v3 - g3.labelDistance : (d3.x < r3 ? y3[2][0] = d3.x + g3.labelDistance : y3[2][0] = d3.x - g3.labelDistance, y3[1][0] = y3[2][0] + _3), y3[1][1] = y3[2][1] = d3.y);
        }
        for (var x3 = 0; x3 < I3.length; x3++) {
          var b3, w3 = I3[x3], O3 = w3.label, R3 = w3.labelLine, N3 = isNaN(O3.x) || isNaN(O3.y);
          O3 && (O3.setStyle({ align: w3.textAlign }), N3 && (F(O3.states, P3), O3.ignore = true), b3 = O3.states.select) && (b3.x += O3.x, b3.y += O3.y), R3 && (b3 = w3.linePoints, N3 || !b3 ? (F(R3.states, P3), R3.ignore = true) : (xw(b3, w3.minTurnAngle), function(t4, e4, n4) {
            if (n4 <= 180 && 0 < n4) {
              n4 = n4 / 180 * Math.PI, pw.fromArray(t4[0]), dw.fromArray(t4[1]), fw.fromArray(t4[2]), q.sub(gw, dw, pw), q.sub(yw, fw, dw);
              var i4 = gw.len(), r4 = yw.len();
              if (!(i4 < 1e-3 || r4 < 1e-3)) {
                if (gw.scale(1 / i4), yw.scale(1 / r4), gw.dot(e4) < Math.cos(n4)) {
                  i4 = lw(dw.x, dw.y, fw.x, fw.y, pw.x, pw.y, vw, false), r4 = (_w.fromArray(vw), Math.PI / 2), e4 = r4 + Math.acos(yw.dot(e4)) - n4;
                  if (r4 <= e4)
                    q.copy(_w, fw);
                  else {
                    _w.scaleAndAdd(yw, i4 / Math.tan(Math.PI / 2 - e4));
                    n4 = fw.x !== dw.x ? (_w.x - dw.x) / (fw.x - dw.x) : (_w.y - dw.y) / (fw.y - dw.y);
                    if (isNaN(n4))
                      return;
                    n4 < 0 ? q.copy(_w, dw) : 1 < n4 && q.copy(_w, fw);
                  }
                  _w.toArray(t4[1]);
                }
              }
            }
          }(b3, w3.surfaceNormal, w3.maxSurfaceAngle), R3.setShape({ points: b3 }), O3.__hostTarget.textGuideLineConfig = { anchor: new q(b3[0][0], b3[0][1]) }));
        }
      }
      var sI = 2 * Math.PI, lI = Math.PI / 180, uI = { seriesType: jT, overallReset: function(t3, C3) {
        t3.eachSeriesByType(jT, function(t4) {
          var r3, a3 = t4.getData(), e3 = a3.mapDimension("value"), n3 = Jf(t4, C3), s3 = n3.cx, l3 = n3.cy, u3 = n3.r, h3 = n3.r0, n3 = n3.viewRect, o3 = -t4.get("startAngle") * lI, i3 = t4.get("endAngle"), c3 = t4.get("padAngle") * lI, i3 = "auto" === i3 ? o3 - sI : -i3 * lI, p3 = t4.get("minAngle") * lI + c3, d3 = 0, f3 = (a3.each(e3, function(t5) {
            isNaN(t5) || d3++;
          }), a3.getSum(e3)), g3 = Math.PI / (f3 || d3) * 2, y3 = t4.get("clockwise"), m3 = t4.get("roseType"), v3 = t4.get("stillShowZeroSum"), _3 = a3.getDataExtent(e3), x3 = (_3[0] = 0, y3 ? 1 : -1), b3 = [o3, i3], w3 = x3 * c3 / 2, b3 = (kl(b3, !y3), o3 = b3[0], i3 = b3[1], cI(t4)), S3 = (b3.startAngle = o3, b3.endAngle = i3, b3.clockwise = y3, b3.cx = s3, b3.cy = l3, b3.r = u3, b3.r0 = h3, Math.abs(i3 - o3)), M3 = S3, T3 = 0, I3 = o3;
          a3.setLayout({ viewRect: n3, r: u3 }), a3.each(e3, function(t5, e4) {
            var n4, i4, r4, o4;
            isNaN(t5) ? a3.setItemLayout(e4, { angle: NaN, startAngle: NaN, endAngle: NaN, clockwise: y3, cx: s3, cy: l3, r0: h3, r: m3 ? NaN : u3 }) : ((n4 = "area" !== m3 ? 0 === f3 && v3 ? g3 : t5 * g3 : S3 / d3) < p3 ? M3 -= n4 = p3 : T3 += t5, i4 = I3 + x3 * n4, o4 = r4 = 0, o4 = n4 < c3 ? r4 = I3 + x3 * n4 / 2 : (r4 = I3 + w3, i4 - w3), a3.setItemLayout(e4, { angle: n4, startAngle: r4, endAngle: o4, clockwise: y3, cx: s3, cy: l3, r0: h3, r: m3 ? ua(t5, _3, [h3, u3]) : u3 }), I3 = i4);
          }), M3 < sI && d3 && (M3 <= 1e-3 ? (r3 = S3 / d3, a3.each(e3, function(t5, e4) {
            var n4, i4;
            isNaN(t5) || (i4 = t5 = 0, i4 = ((n4 = a3.getItemLayout(e4)).angle = r3) < c3 ? t5 = o3 + x3 * (e4 + 0.5) * r3 : (t5 = o3 + x3 * e4 * r3 + w3, o3 + x3 * (e4 + 1) * r3 - w3), n4.startAngle = t5, n4.endAngle = i4);
          })) : (g3 = M3 / T3, I3 = o3, a3.each(e3, function(t5, e4) {
            var n4, i4;
            isNaN(t5) || (i4 = n4 = 0, i4 = (t5 = (e4 = a3.getItemLayout(e4)).angle === p3 ? p3 : t5 * g3) < c3 ? n4 = I3 + x3 * t5 / 2 : (n4 = I3 + w3, I3 + x3 * t5 - w3), e4.startAngle = n4, e4.endAngle = i4, I3 += x3 * t5);
          })));
        });
      } };
      var hI, cI = i(), pI = (u(dI, hI = Cc), dI.prototype.updateData = function(t3, e3, n3, i3) {
        var r3 = this, o3 = t3.hostModel, a3 = t3.getItemModel(e3), s3 = a3.getModel("emphasis"), l3 = t3.getItemLayout(e3), u3 = V(NM(a3.getModel("itemStyle"), l3, true), l3);
        isNaN(u3.startAngle) ? r3.setShape(u3) : (i3 ? (r3.setShape(u3), i3 = o3.getShallow("animationType"), o3.ecModel.ssr ? (Ap(r3, { scaleX: 0, scaleY: 0 }, o3, { dataIndex: e3, isFrom: true }), r3.originX = u3.cx, r3.originY = u3.cy) : "scale" === i3 ? (r3.shape.r = l3.r0, Ap(r3, { shape: { r: l3.r } }, o3, e3)) : null != n3 ? (r3.setShape({ startAngle: n3, endAngle: n3 }), Ap(r3, { shape: { startAngle: l3.startAngle, endAngle: l3.endAngle } }, o3, e3)) : (r3.shape.endAngle = l3.startAngle, Dp(r3, { shape: { endAngle: l3.endAngle } }, o3, e3))) : (Np(r3), Dp(r3, { shape: u3 }, o3, e3)), r3.useStyle(t3.getItemVisual(e3, "style")), Rh(r3, a3), i3 = (l3.startAngle + l3.endAngle) / 2, n3 = o3.get("selectedOffset"), u3 = Math.cos(i3) * n3, i3 = Math.sin(i3) * n3, (n3 = a3.getShallow("cursor")) && r3.attr("cursor", n3), this._updateLabel(o3, t3, e3), r3.ensureState("emphasis").shape = V({ r: l3.r + (s3.get("scale") && s3.get("scaleSize") || 0) }, NM(s3.getModel("itemStyle"), l3)), V(r3.ensureState("select"), { x: u3, y: i3, shape: NM(a3.getModel(["select", "itemStyle"]), l3) }), V(r3.ensureState("blur"), { shape: NM(a3.getModel(["blur", "itemStyle"]), l3) }), n3 = r3.getTextGuideLine(), o3 = r3.getTextContent(), n3 && V(n3.ensureState("select"), { x: u3, y: i3 }), V(o3.ensureState("select"), { x: u3, y: i3 }), Ah(this, s3.get("focus"), s3.get("blurScope"), s3.get("disabled")));
      }, dI.prototype._updateLabel = function(t3, e3, n3) {
        var i3 = e3.getItemModel(n3), r3 = i3.getModel("labelLine"), o3 = e3.getItemVisual(n3, "style"), a3 = o3 && o3.fill, o3 = o3 && o3.opacity, t3 = (pd(this, dd(i3), { labelFetcher: e3.hostModel, labelDataIndex: n3, inheritColor: a3, defaultOpacity: o3, defaultText: t3.getFormattedLabel(n3, "normal") || e3.getName(n3) }), this.getTextContent()), e3 = (this.setTextConfig({ position: null, rotation: null }), t3.attr({ z2: 10 }), i3.get(["label", "position"]));
        "outside" !== e3 && "outer" !== e3 ? this.removeTextGuideLine() : (this.getTextGuideLine() || (n3 = new Fc(), this.setTextGuideLine(n3)), Sw(this, Mw(i3), { stroke: a3, opacity: It(r3.get(["lineStyle", "opacity"]), o3, 1) }));
      }, dI);
      function dI(t3, e3, n3) {
        var i3 = hI.call(this) || this, r3 = (i3.z2 = 2, new gu());
        return i3.setTextContent(r3), i3.updateData(t3, e3, n3, true), i3;
      }
      u(yI, fI = j0), yI.prototype.render = function(e3, t3, n3, i3) {
        var r3, o3, a3 = e3.getData(), s3 = this._data, l3 = this.group;
        if (!s3 && 0 < a3.count()) {
          for (var u3 = a3.getItemLayout(0), h3 = 1; isNaN(u3 && u3.startAngle) && h3 < a3.count(); ++h3)
            u3 = a3.getItemLayout(h3);
          u3 && (r3 = u3.startAngle);
        }
        this._emptyCircleSector && l3.remove(this._emptyCircleSector), 0 === a3.count() && e3.get("showEmptyCircle") && (o3 = cI(e3), (o3 = new Cc({ shape: _(o3) })).useStyle(e3.getModel("emptyCircleStyle").getItemStyle()), this._emptyCircleSector = o3, l3.add(o3)), a3.diff(s3).add(function(t4) {
          var e4 = new pI(a3, t4, r3);
          a3.setItemGraphicEl(t4, e4), l3.add(e4);
        }).update(function(t4, e4) {
          e4 = s3.getItemGraphicEl(e4);
          e4.updateData(a3, t4, r3), e4.off("click"), l3.add(e4), a3.setItemGraphicEl(t4, e4);
        }).remove(function(t4) {
          Rp(s3.getItemGraphicEl(t4), e3, t4);
        }).execute(), aI(e3), "expansion" !== e3.get("animationTypeUpdate") && (this._data = a3);
      }, yI.prototype.dispose = function() {
      }, yI.prototype.containPoint = function(t3, e3) {
        var n3, e3 = e3.getData().getItemLayout(0);
        if (e3)
          return n3 = t3[0] - e3.cx, t3 = t3[1] - e3.cy, (n3 = Math.sqrt(n3 * n3 + t3 * t3)) <= e3.r && n3 >= e3.r0;
      }, yI.type = jT;
      var fI, gI = yI;
      function yI() {
        var t3 = null !== fI && fI.apply(this, arguments) || this;
        return t3.type = jT, t3.ignoreLabelLineUpdate = true, t3;
      }
      function mI(t3, e3, n3) {
        if (t3 && 0 <= L(e3, t3.type))
          return e3 = n3.getData().tree.root, (n3 = W(n3 = t3.targetNode) ? e3.getNodeById(n3) : n3) && e3.contains(n3) || null != (t3 = t3.targetNodeId) && (n3 = e3.getNodeById(t3)) ? { node: n3 } : void 0;
      }
      function vI(t3) {
        for (var e3 = []; t3; )
          (t3 = t3.parentNode) && e3.push(t3);
        return e3.reverse();
      }
      function _I(t3, e3) {
        return 0 <= L(vI(t3), e3);
      }
      function xI(t3, e3) {
        for (var n3 = []; t3; ) {
          var i3 = t3.dataIndex;
          n3.push({ name: t3.name, dataIndex: i3, value: e3.getRawValue(i3) }), t3 = t3.parentNode;
        }
        return n3.reverse(), n3;
      }
      _b(function(t3) {
        t3.registerChartView(gI), t3.registerSeriesModel($T), Am(jT, t3.registerAction), t3.registerLayout(uI), t3.registerProcessor({ seriesType: jT, reset: function(t4, e3) {
          var i3, r3 = e3.findComponents({ mainType: "legend" });
          r3 && r3.length && (i3 = t4.getData()).filterSelf(function(t5) {
            for (var e4 = i3.getName(t5), n3 = 0; n3 < r3.length; n3++)
              if (!r3[n3].isSelected(e4))
                return false;
            return true;
          });
        } }), t3.registerProcessor({ seriesType: jT, reset: function(t4, e3) {
          var n3 = t4.getData();
          n3.filterSelf(function(t5) {
            var e4 = n3.mapDimension("value"), e4 = n3.get(e4, t5);
            return !(U(e4) && !isNaN(e4) && e4 < 0);
          });
        } });
      });
      var bI = ["treemapZoomToNode", "treemapRender", "treemapMove"];
      function wI(t3) {
        for (var e3 = 0; e3 < bI.length; e3++)
          t3.registerAction({ type: bI[e3], update: "updateView" }, Wt);
        t3.registerAction({ type: "treemapRootToNode", update: "updateView" }, function(r3, t4) {
          t4.eachComponent({ mainType: "series", subType: "treemap", query: r3 }, function(t5, e4) {
            var n3 = mI(r3, ["treemapZoomToNode", "treemapRootToNode"], t5);
            {
              var i3;
              n3 && ((i3 = t5.getViewRoot()) && (r3.direction = _I(i3, n3.node) ? "rollUp" : "drillDown"), t5.resetViewRoot(n3.node));
            }
          });
        });
      }
      var SI = i();
      function MI(t3, e3) {
        var n3;
        return SI(n3 = this).mainData === n3 ? DI((n3 = V({}, SI(this).datas))[this.dataType] = e3, n3, t3) : AI(e3, this.dataType, SI(this).mainData, t3), e3;
      }
      function TI(t3, e3) {
        return t3.struct && t3.struct.update(), e3;
      }
      function II(n3, i3) {
        return F(SI(i3).datas, function(t3, e3) {
          t3 !== i3 && AI(t3.cloneShallow(), e3, i3, n3);
        }), i3;
      }
      function CI(t3) {
        var e3 = SI(this).mainData;
        return null == t3 || null == e3 ? e3 : SI(e3).datas[t3];
      }
      function kI() {
        var e3 = SI(this).mainData;
        return null == e3 ? [{ data: e3 }] : E(O(SI(e3).datas), function(t3) {
          return { type: t3, data: SI(e3).datas[t3] };
        });
      }
      function DI(n3, t3, i3) {
        SI(n3).datas = {}, F(t3, function(t4, e3) {
          AI(t4, e3, n3, i3);
        });
      }
      function AI(t3, e3, n3, i3) {
        SI(n3).datas[e3] = t3, SI(t3).mainData = n3, t3.dataType = e3, i3.struct && (t3[i3.structAttr] = i3.struct, i3.struct[i3.datasAttr[e3]] = t3), t3.getLinkedData = CI, t3.getLinkedDataAll = kI;
      }
      PI.prototype.isRemoved = function() {
        return this.dataIndex < 0;
      }, PI.prototype.eachNode = function(t3, e3, n3) {
        H(t3) && (n3 = e3, e3 = t3, t3 = null);
        var i3, r3 = (t3 = W(t3 = t3 || {}) ? { order: t3 } : t3).order || "preorder", o3 = this[t3.attr || "children"];
        "preorder" === r3 && (i3 = e3.call(n3, this));
        for (var a3 = 0; !i3 && a3 < o3.length; a3++)
          o3[a3].eachNode(t3, e3, n3);
        "postorder" === r3 && e3.call(n3, this);
      }, PI.prototype.updateDepthAndHeight = function(t3) {
        var e3 = 0;
        this.depth = t3;
        for (var n3 = 0; n3 < this.children.length; n3++) {
          var i3 = this.children[n3];
          i3.updateDepthAndHeight(t3 + 1), i3.height > e3 && (e3 = i3.height);
        }
        this.height = e3 + 1;
      }, PI.prototype.getNodeById = function(t3) {
        if (this.getId() === t3)
          return this;
        for (var e3 = 0, n3 = this.children, i3 = n3.length; e3 < i3; e3++) {
          var r3 = n3[e3].getNodeById(t3);
          if (r3)
            return r3;
        }
      }, PI.prototype.contains = function(t3) {
        if (t3 === this)
          return true;
        for (var e3 = 0, n3 = this.children, i3 = n3.length; e3 < i3; e3++) {
          var r3 = n3[e3].contains(t3);
          if (r3)
            return r3;
        }
      }, PI.prototype.getAncestors = function(t3) {
        for (var e3 = [], n3 = t3 ? this : this.parentNode; n3; )
          e3.push(n3), n3 = n3.parentNode;
        return e3.reverse(), e3;
      }, PI.prototype.getAncestorsIndices = function() {
        for (var t3 = [], e3 = this; e3; )
          t3.push(e3.dataIndex), e3 = e3.parentNode;
        return t3.reverse(), t3;
      }, PI.prototype.getDescendantIndices = function() {
        var e3 = [];
        return this.eachNode(function(t3) {
          e3.push(t3.dataIndex);
        }), e3;
      }, PI.prototype.getValue = function(t3) {
        var e3 = this.hostTree.data;
        return e3.getStore().get(e3.getDimensionIndex(t3 || "value"), this.dataIndex);
      }, PI.prototype.setLayout = function(t3, e3) {
        0 <= this.dataIndex && this.hostTree.data.setItemLayout(this.dataIndex, t3, e3);
      }, PI.prototype.getLayout = function() {
        return this.hostTree.data.getItemLayout(this.dataIndex);
      }, PI.prototype.getModel = function(t3) {
        if (!(this.dataIndex < 0))
          return this.hostTree.data.getItemModel(this.dataIndex).getModel(t3);
      }, PI.prototype.getLevelModel = function() {
        return (this.hostTree.levelModels || [])[this.depth];
      }, PI.prototype.setVisual = function(t3, e3) {
        0 <= this.dataIndex && this.hostTree.data.setItemVisual(this.dataIndex, t3, e3);
      }, PI.prototype.getVisual = function(t3) {
        return this.hostTree.data.getItemVisual(this.dataIndex, t3);
      }, PI.prototype.getRawIndex = function() {
        return this.hostTree.data.getRawIndex(this.dataIndex);
      }, PI.prototype.getId = function() {
        return this.hostTree.data.getId(this.dataIndex);
      }, PI.prototype.getChildIndex = function() {
        if (this.parentNode) {
          for (var t3 = this.parentNode.children, e3 = 0; e3 < t3.length; ++e3)
            if (t3[e3] === this)
              return e3;
        }
        return -1;
      }, PI.prototype.isAncestorOf = function(t3) {
        for (var e3 = t3.parentNode; e3; ) {
          if (e3 === this)
            return true;
          e3 = e3.parentNode;
        }
        return false;
      }, PI.prototype.isDescendantOf = function(t3) {
        return t3 !== this && t3.isAncestorOf(this);
      };
      var LI = PI;
      function PI(t3, e3) {
        this.depth = 0, this.height = 0, this.dataIndex = -1, this.children = [], this.viewChildren = [], this.isExpand = false, this.name = t3 || "", this.hostTree = e3;
      }
      RI.prototype.eachNode = function(t3, e3, n3) {
        this.root.eachNode(t3, e3, n3);
      }, RI.prototype.getNodeByDataIndex = function(t3) {
        t3 = this.data.getRawIndex(t3);
        return this._nodes[t3];
      }, RI.prototype.getNodeById = function(t3) {
        return this.root.getNodeById(t3);
      }, RI.prototype.update = function() {
        for (var t3 = this.data, e3 = this._nodes, n3 = 0, i3 = e3.length; n3 < i3; n3++)
          e3[n3].dataIndex = -1;
        for (n3 = 0, i3 = t3.count(); n3 < i3; n3++)
          e3[t3.getRawIndex(n3)].dataIndex = n3;
      }, RI.prototype.clearLayouts = function() {
        this.data.clearItemLayouts();
      }, RI.createTree = function(t3, e3, n3) {
        var s3 = new RI(e3), l3 = [], u3 = 1;
        !function t4(e4, n4) {
          var i4 = e4.value;
          u3 = Math.max(u3, G(i4) ? i4.length : 1);
          l3.push(e4);
          var r4 = new LI(Va(e4.name, ""), s3);
          n4 ? NI(r4, n4) : s3.root = r4;
          s3._nodes.push(r4);
          var o3 = e4.children;
          if (o3)
            for (var a3 = 0; a3 < o3.length; a3++)
              t4(o3[a3], r4);
        }(t3), s3.root.updateDepthAndHeight(0);
        var i3, r3, t3 = v1(l3, { coordDimensions: ["value"], dimensionsCount: u3 }).dimensions, t3 = new m1(t3, e3);
        return t3.initData(l3), n3 && n3(t3), r3 = (i3 = { mainData: t3, struct: s3, structAttr: "tree" }).mainData, (e3 = i3.datas) || (e3 = { main: r3 }, i3.datasAttr = { main: "data" }), i3.datas = i3.mainData = null, DI(r3, e3, i3), F(e3, function(e4) {
          F(r3.TRANSFERABLE_METHODS, function(t4) {
            e4.wrapMethod(t4, yt(MI, i3));
          });
        }), r3.wrapMethod("cloneShallow", yt(II, i3)), F(r3.CHANGABLE_METHODS, function(t4) {
          r3.wrapMethod(t4, yt(TI, i3));
        }), Dt(e3[r3.dataType] === r3), s3.update(), s3;
      };
      var OI = RI;
      function RI(t3) {
        this.type = "tree", this._nodes = [], this.hostModel = t3;
      }
      function NI(t3, e3) {
        var n3 = e3.children;
        t3.parentNode !== e3 && (n3.push(t3), t3.parentNode = e3);
      }
      function zI(s3) {
        var t3 = s3.getData().tree, l3 = {};
        t3.eachNode(function(t4) {
          for (var e3 = t4; e3 && 1 < e3.depth; )
            e3 = e3.parentNode;
          a3 = s3.ecModel, n3 = e3.name || e3.dataIndex + "", i3 = l3, o3 = Pa(a3.get(["aria", "decal", "decals"]));
          var n3, i3, r3, o3, a3 = Og(a3, Ag, o3, null, n3, i3, r3);
          t4.setVisual("decal", a3);
        });
      }
      u(VI, BI = z0), VI.prototype.getInitialData = function(t3, e3) {
        var n3 = { name: t3.name, children: t3.data }, i3 = (!function e4(t4) {
          var n4 = 0;
          F(t4.children, function(t5) {
            e4(t5);
            t5 = t5.value;
            G(t5) && (t5 = t5[0]), n4 += t5;
          });
          var i4 = t4.value;
          G(i4) && (i4 = i4[0]);
          null != i4 && !isNaN(i4) || (i4 = n4);
          i4 < 0 && (i4 = 0);
          G(t4.value) ? t4.value[0] = i4 : t4.value = i4;
        }(n3), t3.levels || []), r3 = this.designatedVisualItemStyle = {}, o3 = new Bd({ itemStyle: r3 }, this, e3), a3 = E((t3.levels = function(t4, e4) {
          var i4, r4, n4, o4 = Pa(e4.get("color")), e4 = Pa(e4.get(["aria", "decal", "decals"]));
          if (o4)
            return F(t4 = t4 || [], function(t5) {
              var t5 = new Bd(t5), e5 = t5.get("color"), n5 = t5.get("decal");
              (t5.get(["itemStyle", "color"]) || e5 && "none" !== e5) && (i4 = true), (t5.get(["itemStyle", "decal"]) || n5 && "none" !== n5) && (r4 = true);
            }), n4 = t4[0] || (t4[0] = {}), i4 || (n4.color = o4.slice()), !r4 && e4 && (n4.decal = e4.slice()), t4;
        }(i3, e3)) || [], function(t4) {
          return new Bd(t4, o3, e3);
        }, this), s3 = OI.createTree(n3, this, function(t4) {
          t4.wrapMethod("getItemModel", function(t5, e4) {
            e4 = s3.getNodeByDataIndex(e4), e4 = e4 ? a3[e4.depth] : null;
            return t5.parentModel = e4 || o3, t5;
          });
        });
        return s3.data;
      }, VI.prototype.optionUpdated = function() {
        this.resetViewRoot();
      }, VI.prototype.formatTooltip = function(t3, e3, n3) {
        var i3 = this.getData(), r3 = this.getRawValue(t3);
        return L0("nameValue", { name: i3.getName(t3), value: r3 });
      }, VI.prototype.getDataParams = function(t3) {
        var e3 = BI.prototype.getDataParams.apply(this, arguments), t3 = this.getData().tree.getNodeByDataIndex(t3);
        return e3.treeAncestors = xI(t3, this), e3.treePathInfo = e3.treeAncestors, e3;
      }, VI.prototype.setLayoutInfo = function(t3) {
        this.layoutInfo = this.layoutInfo || {}, V(this.layoutInfo, t3);
      }, VI.prototype.mapIdToIndex = function(t3) {
        var e3 = this._idIndexMap, n3 = (e3 || (e3 = this._idIndexMap = I(), this._idIndexMapCount = 0), e3.get(t3));
        return null == n3 && e3.set(t3, n3 = this._idIndexMapCount++), n3;
      }, VI.prototype.getViewRoot = function() {
        return this._viewRoot;
      }, VI.prototype.resetViewRoot = function(t3) {
        t3 ? this._viewRoot = t3 : t3 = this._viewRoot;
        var e3 = this.getRawData().tree.root;
        t3 && (t3 === e3 || e3.contains(t3)) || (this._viewRoot = e3);
      }, VI.prototype.enableAriaDecal = function() {
        zI(this);
      }, VI.type = "series.treemap", VI.layoutMode = "box", VI.defaultOption = { progressive: 0, coordinateSystemUsage: "box", left: v.size.l, top: v.size.xxxl, right: v.size.l, bottom: v.size.xxxl, sort: true, clipWindow: "origin", squareRatio: 0.5 * (1 + Math.sqrt(5)), leafDepth: null, drillDownIcon: "\u25B6", zoomToNodeRatio: 0.1024, scaleLimit: { max: 5, min: 0.2 }, roam: true, roamTrigger: "global", nodeClick: "zoomToNode", animation: true, animationDurationUpdate: 900, animationEasing: "quinticInOut", breadcrumb: { show: true, height: 22, left: "center", bottom: v.size.m, emptyItemWidth: 25, itemStyle: { color: v.color.backgroundShade, textStyle: { color: v.color.secondary } }, emphasis: { itemStyle: { color: v.color.background } } }, label: { show: true, distance: 0, padding: 5, position: "inside", color: v.color.neutral00, overflow: "truncate" }, upperLabel: { show: false, position: [0, "50%"], height: 20, overflow: "truncate", verticalAlign: "middle" }, itemStyle: { color: null, colorAlpha: null, colorSaturation: null, borderWidth: 0, gapWidth: 0, borderColor: v.color.neutral00, borderColorSaturation: null }, emphasis: { upperLabel: { show: true, position: [0, "50%"], overflow: "truncate", verticalAlign: "middle" } }, visualDimension: 0, visualMin: null, visualMax: null, color: [], colorAlpha: null, colorSaturation: null, colorMappingBy: "index", visibleMin: 10, childrenVisibleMin: null, levels: [] };
      var BI, EI = VI;
      function VI() {
        var t3 = null !== BI && BI.apply(this, arguments) || this;
        return t3.type = VI.type, t3.preventUsingHoverLayer = true, t3;
      }
      GI.prototype.render = function(t3, e3, n3, i3) {
        var r3, o3, a3, s3, l3, u3, h3, c3, p3, d3, f3, g3 = t3.getModel("breadcrumb"), y3 = this.group;
        y3.removeAll(), g3.get("show") && n3 && (f3 = g3.getModel("itemStyle"), r3 = g3.getModel("emphasis"), o3 = f3.getModel("textStyle"), a3 = r3.getModel(["itemStyle", "textStyle"]), e3 = ng(t3, e3).refContainer, s3 = { left: g3.get("left"), right: g3.get("right"), top: g3.get("top"), bottom: g3.get("bottom") }, g3 = { emptyItemWidth: g3.get("emptyItemWidth"), totalWidth: 0, renderList: [] }, d3 = tg(s3, e3), this._prepare(n3, g3, o3), this._renderContent(t3, g3, d3, f3, r3, o3, a3, i3), n3 = y3, t3 = s3, g3 = e3, d3 = !u3 || !u3.hv || u3.hv[0], f3 = !u3 || !u3.hv || u3.hv[1], u3 = u3 && u3.boundingMode || "all", (h3 = h3 || n3).x = n3.x, h3.y = n3.y, d3 || f3) && ("raw" === u3 ? c3 = "group" === n3.type ? new Z(0, 0, +t3.width || 0, +t3.height || 0) : n3.getBoundingRect() : (c3 = n3.getBoundingRect(), n3.needLocalTransform() && (p3 = n3.getLocalTransform(), (c3 = c3.clone()).applyTransform(p3))), p3 = tg(B({ width: c3.width, height: c3.height }, t3), g3, l3), t3 = d3 ? p3.x - c3.x : 0, g3 = f3 ? p3.y - c3.y : 0, "raw" === u3 ? (h3.x = t3, h3.y = g3) : (h3.x += t3, h3.y += g3), h3 === n3) && n3.markRedraw();
      }, GI.prototype._prepare = function(t3, e3, n3) {
        for (var i3 = t3; i3; i3 = i3.parentNode) {
          var r3 = Va(i3.getModel().get("name"), ""), o3 = n3.getTextRect(r3), o3 = Math.max(o3.width + 16, e3.emptyItemWidth);
          e3.totalWidth += o3 + 8, e3.renderList.push({ node: i3, text: r3, width: o3 });
        }
      }, GI.prototype._renderContent = function(t3, e3, n3, i3, r3, o3, a3, s3) {
        for (var l3, u3, h3, c3, p3, d3 = 0, f3 = e3.emptyItemWidth, g3 = t3.get(["breadcrumb", "height"]), y3 = e3.totalWidth, m3 = e3.renderList, v3 = r3.getModel("itemStyle").getItemStyle(), _3 = m3.length - 1; 0 <= _3; _3--) {
          var x3 = m3[_3], b3 = x3.node, w3 = x3.width, x3 = x3.text, S3 = (y3 > n3.width && (y3 -= w3 - f3, w3 = f3, x3 = null), new zc({ shape: { points: (l3 = d3, u3 = 0, S3 = w3, h3 = g3, c3 = _3 === m3.length - 1, p3 = void 0, p3 = [[c3 ? l3 : l3 - 5, u3], [l3 + S3, u3], [l3 + S3, u3 + h3], [c3 ? l3 : l3 - 5, u3 + h3]], 0 === _3 || p3.splice(2, 0, [l3 + S3 + 5, u3 + h3 / 2]), c3 || p3.push([l3, u3 + h3 / 2]), p3) }, style: B(i3.getItemStyle(), { lineJoin: "bevel" }), textContent: new gu({ style: fd(o3, { text: x3 }) }), textConfig: { position: "inside" }, z2: 1e5, onclick: yt(s3, b3) }));
          S3.disableLabelAnimation = true, S3.getTextContent().ensureState("emphasis").style = fd(a3, { text: x3 }), S3.ensureState("emphasis").style = v3, Ah(S3, r3.get("focus"), r3.get("blurScope"), r3.get("disabled")), this.group.add(S3), c3 = t3, l3 = b3, j(S3).eventData = { componentType: "series", componentSubType: "treemap", componentIndex: c3.componentIndex, seriesIndex: c3.seriesIndex, seriesName: c3.name, seriesType: "treemap", selfType: "breadcrumb", nodeData: { dataIndex: l3 && l3.dataIndex, name: l3 && l3.name }, treePathInfo: l3 && xI(l3, c3) }, d3 += w3 + 8;
        }
      }, GI.prototype.remove = function() {
        this.group.removeAll();
      };
      var FI = GI;
      function GI(t3) {
        this.group = new Vo(), t3.add(this.group);
      }
      var HI = i();
      function WI(t3, e3) {
        return HI(t3)[e3];
      }
      O_({ type: "takeGlobalCursor", event: "globalCursorTaken", update: "update" }, Wt);
      var UI = { axisPointer: 1, tooltip: 1, brush: 1 };
      u(qI, XI = ge), qI.prototype.isDragging = function() {
        return this._dragging;
      }, qI.prototype.isPinching = function() {
        return this._pinching;
      }, qI.prototype._checkPointer = function(t3, e3, n3) {
        var i3 = this._opt, r3 = i3.zInfoParsed;
        return !(function(t4, e4, n4) {
          if ((e4 = e4.getComponentByElement(t4.topTarget)) && e4 !== n4 && !UI.hasOwnProperty(e4.mainType)) {
            var t4 = e4.coordinateSystem;
            if (t4 && t4.model !== n4)
              return t4 = sd(e4), e4 = sd(n4), (t4.zlevel - e4.zlevel || t4.z - e4.z) <= 0 ? void 0 : 1;
          }
        }(t3, i3.api, r3.component) || (i3 = (i3 = "global" === (r3 = i3.triggerInfo).roamTrigger) || r3.isInSelf(t3, e3, n3)) && r3.isInClip && !r3.isInClip(t3, e3, n3)) && i3;
      }, qI.prototype._decideCursorStyle = function(t3, e3, n3, i3) {
        var r3 = t3.target;
        return !r3 && this._checkPointer(t3, e3, n3) ? this._opt.cursorGrab : i3 ? r3 && r3.cursor || "default" : void 0;
      }, qI.prototype.dispose = function() {
        this.disable();
      }, qI.prototype._mousedownHandler = function(t3) {
        if (!Re(t3) && !ZI(t3)) {
          for (var e3 = t3.target; e3; ) {
            if (e3.draggable)
              return;
            e3 = e3.__hostTarget || e3.parent;
          }
          var n3 = t3.offsetX, i3 = t3.offsetY;
          this._checkPointer(t3, n3, i3) && (this._x = n3, this._y = i3, this._dragging = true);
        }
      }, qI.prototype._mousemoveHandler = function(t3) {
        var e3, n3, i3, r3, o3, a3, s3 = this._zr;
        "pinch" === t3.gestureEvent || WI(s3, "globalPan") || ZI(t3) || (e3 = t3.offsetX, n3 = t3.offsetY, this._dragging && tC("moveOnMouseMove", t3, this._opt) ? (s3.setCursorStyle(this._opt.cursorGrabbing), o3 = e3 - (i3 = this._x), a3 = n3 - (r3 = this._y), this._x = e3, this._y = n3, this._opt.preventDefaultMouseMove && Oe(t3.event), t3.__ecRoamConsumed = true, JI(this, "pan", "moveOnMouseMove", t3, { dx: o3, dy: a3, oldX: i3, oldY: r3, newX: e3, newY: n3, isAvailableBehavior: null })) : (o3 = this._decideCursorStyle(t3, e3, n3, false)) && s3.setCursorStyle(o3));
      }, qI.prototype._mouseupHandler = function(t3) {
        var e3;
        ZI(t3) || (e3 = this._zr, !Re(t3) && (this._dragging = false, t3 = this._decideCursorStyle(t3, t3.offsetX, t3.offsetY, true)) && e3.setCursorStyle(t3));
      }, qI.prototype._mousewheelHandler = function(t3) {
        var e3, n3, i3, r3, o3, a3;
        ZI(t3) || (o3 = tC("zoomOnMouseWheel", t3, this._opt), e3 = tC("moveOnMouseWheel", t3, this._opt), n3 = t3.wheelDelta, a3 = Math.abs(n3), i3 = t3.offsetX, r3 = t3.offsetY, 0 !== n3 && (o3 || e3) && (o3 && (o3 = 3 < a3 ? 1.4 : 1 < a3 ? 1.2 : 1.1, this._checkTriggerMoveZoom(this, "zoom", "zoomOnMouseWheel", t3, { scale: 0 < n3 ? o3 : 1 / o3, originX: i3, originY: r3, isAvailableBehavior: null })), e3) && (a3 = Math.abs(n3), this._checkTriggerMoveZoom(this, "scrollMove", "moveOnMouseWheel", t3, { scrollDelta: (0 < n3 ? 1 : -1) * (3 < a3 ? 0.4 : 1 < a3 ? 0.15 : 0.05), originX: i3, originY: r3, isAvailableBehavior: null })));
      }, qI.prototype._pinchHandler = function(t3) {
        var e3;
        WI(this._zr, "globalPan") || ZI(t3) || (e3 = 1 < t3.pinchScale ? 1.1 : 1 / 1.1, this._checkTriggerMoveZoom(this, "zoom", null, t3, { scale: e3, originX: t3.pinchX, originY: t3.pinchY, isAvailableBehavior: null }));
      }, qI.prototype._checkTriggerMoveZoom = function(t3, e3, n3, i3, r3) {
        t3._checkPointer(i3, r3.originX, r3.originY) && (Oe(i3.event), i3.__ecRoamConsumed = true, JI(t3, e3, n3, i3, r3));
      };
      var XI, YI = qI;
      function qI(o3) {
        var t3 = XI.call(this) || this, a3 = (t3._zr = o3, y(t3._mousedownHandler, t3)), s3 = y(t3._mousemoveHandler, t3), l3 = y(t3._mouseupHandler, t3), u3 = y(t3._mousewheelHandler, t3), h3 = y(t3._pinchHandler, t3);
        return t3.enable = function(t4, e3) {
          var n3 = e3.zInfo, i3 = sd(n3.component), r3 = i3.z, i3 = i3.zlevel, r3 = { component: n3.component, z: r3, zlevel: i3, z2: Y(n3.z2, -1 / 0) }, i3 = V({}, e3.triggerInfo);
          this._opt = B(V({}, e3), { zoomOnMouseWheel: true, moveOnMouseMove: true, moveOnMouseWheel: false, preventDefaultMouseMove: true, zInfoParsed: r3, triggerInfo: i3, cursorGrab: "grab", cursorGrabbing: "grabbing" }), null == t4 && (t4 = true), this._enabled && this._controlType === t4 || (this.disable(), (this._enabled = true) !== t4 && "move" !== t4 && "pan" !== t4 || ($I(o3, "mousedown", a3, r3), $I(o3, "mousemove", s3, r3), $I(o3, "mouseup", l3, r3)), true !== t4 && "scale" !== t4 && "zoom" !== t4) || ($I(o3, "mousewheel", u3, r3), $I(o3, "pinch", h3, r3));
        }, t3.disable = function() {
          this._enabled && (this._enabled = false, QI(o3, "mousedown", a3), QI(o3, "mousemove", s3), QI(o3, "mouseup", l3), QI(o3, "mousewheel", u3), QI(o3, "pinch", h3));
        }, t3;
      }
      function ZI(t3) {
        return t3.__ecRoamConsumed;
      }
      var jI = i();
      function KI(t3) {
        t3 = jI(t3);
        return t3.roam = t3.roam || {}, t3.uniform = t3.uniform || {}, t3;
      }
      function $I(t3, e3, n3, i3) {
        for (var r3, o3, a3 = KI(t3).roam, s3 = a3[e3] = a3[e3] || [], l3 = 0; l3 < s3.length; l3++) {
          var u3 = s3[l3].zInfoParsed;
          if ((u3.zlevel - i3.zlevel || u3.z - i3.z || u3.z2 - i3.z2) <= 0)
            break;
        }
        s3.splice(l3, 0, { listener: n3, zInfoParsed: i3 }), r3 = e3, (o3 = KI(a3 = t3)).uniform[r3] || a3.on(r3, o3.uniform[r3] = function(t4) {
          var e4 = o3.roam[r3];
          if (e4)
            for (var n4 = 0; n4 < e4.length; n4++)
              e4[n4].listener(t4);
        });
      }
      function QI(t3, e3, n3) {
        for (var i3, r3, o3, a3 = KI(t3).roam[e3] || [], s3 = 0; s3 < a3.length; s3++)
          if (a3[s3].listener === n3)
            return a3.splice(s3, 1), void (a3.length || (r3 = e3, o3 = void 0, (o3 = KI(i3 = t3).uniform)[r3] && (i3.off(r3, o3[r3]), o3[r3] = null)));
      }
      function JI(t3, e3, n3, i3, r3) {
        r3.isAvailableBehavior = y(tC, null, n3, i3), t3.trigger(e3, r3);
      }
      function tC(t3, e3, n3) {
        n3 = n3[t3];
        return !t3 || n3 && (!W(n3) || e3.event[n3 + "Key"]);
      }
      nC.prototype.add = function(t3, e3, n3, i3, r3) {
        return !this._elExistsMap[t3.id] && (this._elExistsMap[t3.id] = true, this._storage.push({ el: t3, target: e3, duration: n3, delay: i3, easing: r3 }), true);
      }, nC.prototype.finished = function(t3) {
        return this._finishedCallback = t3, this;
      }, nC.prototype.start = function() {
        for (var t3 = this, e3 = this._storage.length, n3 = function() {
          --e3 <= 0 && (t3._storage.length = 0, t3._elExistsMap = {}, t3._finishedCallback) && t3._finishedCallback();
        }, i3 = 0, r3 = this._storage.length; i3 < r3; i3++) {
          var o3 = this._storage[i3];
          o3.el.animateTo(o3.target, { duration: o3.duration, delay: o3.delay, easing: o3.easing, setToFinal: true, done: n3, aborted: n3 });
        }
        return this;
      };
      var eC = nC;
      function nC() {
        this._storage = [], this._elExistsMap = {};
      }
      var iC;
      function rC(t3, e3, n3) {
        var i3 = iC.call(this) || this, r3 = (i3.type = "view", i3.dimensions = ["x", "y"], i3), t3 = (r3.invertY = t3, r3.lgCt = e3, r3.lgGeo = n3, r3.trans = []);
        return t3[0] = lo(), t3[1] = lo(), t3[2] = lo(), r3.mtRaw = Ve(), r3.mtRawInv = Ve(), r3.mtOverall = Ve(), r3.mtOverallInv = Ve(), r3.zoom = 1, i3;
      }
      u(rC, iC = oo), rC.prototype.getBoundingRect = function() {
        return t3 = this, pn(hn(), t3.dataRect);
        var t3;
      }, rC.prototype.getViewRect = function() {
        return t3 = this, pn(hn(), t3.viewRect);
        var t3;
      }, rC.prototype.getRoamTransform = function() {
        return so(this.trans[1]);
      }, rC.prototype.dataToPoint = function(t3, e3, n3) {
        e3 = e3 ? this.mtRaw : this.mtOverall;
        return n3 = n3 || [], e3 ? le(n3, t3, e3) : Zt(n3, t3);
      }, rC.prototype.pointToData = function(t3, e3, n3) {
        n3 = n3 || [];
        var i3 = this.mtOverallInv;
        return i3 ? le(n3, t3, i3) : Zt(n3, t3);
      }, rC.prototype.convertToPixel = function(t3, e3, n3) {
        e3 = aC(e3);
        return e3 === this ? e3.dataToPoint(n3) : null;
      }, rC.prototype.convertFromPixel = function(t3, e3, n3) {
        e3 = aC(e3);
        return e3 === this ? e3.pointToData(n3) : null;
      }, rC.prototype.containPoint = function(t3) {
        return pn(oC, this.dataRect), fn(oC, oC, this.mtOverall), gn(oC, t3[0], t3[1]);
      }, rC.dimensions = ["x", "y"];
      var oC = hn();
      function aC(t3) {
        t3 = t3.seriesModel;
        return t3 ? t3.coordinateSystem : null;
      }
      hn();
      var sC = Math.max, lC = Math.min, uC = F, hC = ["itemStyle", "borderWidth"], cC = ["itemStyle", "gapWidth"], pC = ["upperLabel", "show"], dC = ["upperLabel", "height"], fC = { seriesType: "treemap", reset: function(t3, e3, n3, i3) {
        var r3, o3, a3 = t3.option, s3 = ng(t3, n3).refContainer, s3 = tg(t3.getBoxLayoutParams(), s3), l3 = i3 && i3.type, u3 = mI(i3, ["treemapZoomToNode", "treemapRootToNode"], t3), i3 = "treemapRender" === l3 || "treemapMove" === l3 ? i3.rootRect : null, h3 = t3.getViewRoot(), c3 = vI(h3), a3 = ("treemapMove" !== l3 && (r3 = false, l3 = "treemapZoomToNode" === l3 ? (r3 = true, function(t4, e4, n4, i4) {
          var r4, o4 = (e4 || {}).node, e4 = i4.width, a4 = i4.height, s4 = V({}, i4);
          if (!o4 || o4 === n4)
            return s4;
          var i4 = e4 * a4, l4 = i4 * t4.option.zoomToNodeRatio;
          for (; r4 = o4.parentNode; ) {
            for (var u4 = 0, h4 = r4.children, c4 = 0, p3 = h4.length; c4 < p3; c4++)
              u4 += h4[c4].getValue();
            var d3 = o4.getValue();
            if (0 === d3)
              return s4;
            l4 *= u4 / d3;
            var d3 = r4.getModel(), f3 = d3.get(hC), d3 = Math.max(f3, vC(d3));
            l4 += 4 * f3 * f3 + (3 * f3 + d3) * Math.pow(l4, 0.5), ya < l4 && (l4 = ya), o4 = r4;
          }
          l4 < i4 && (l4 = i4);
          n4 = Math.pow(l4 / i4, 0.5);
          return { width: e4 * n4, height: a4 * n4 };
        }(t3, u3, h3, s3)) : i3 ? (r3 = true, V({}, i3)) : V({}, s3), r3 && (r3 = xC(r3 = _C(s3, l3), t3), l3.width = s3.width * r3, l3.height = s3.height * r3), r3 = a3.sort, r3 = { squareRatio: a3.squareRatio, sort: r3 = r3 && "asc" !== r3 && "desc" !== r3 ? "desc" : r3, leafDepth: a3.leafDepth }, h3.hostTree.clearLayouts(), o3 = { x: 0, y: 0, width: l3.width, height: l3.height, area: l3.width * l3.height }, h3.setLayout(o3), function t4(e4, n4, i4, r4) {
          var o4;
          if (e4.isRemoved())
            return;
          var a4 = e4.getLayout();
          o4 = a4.width;
          a4 = a4.height;
          var s4 = e4.getModel();
          var l4 = s4.get(hC);
          var u4 = s4.get(cC) / 2;
          var h4 = vC(s4);
          var c4 = Math.max(l4, h4);
          var p3 = l4 - u4;
          var d3 = c4 - u4;
          e4.setLayout({ borderWidth: l4, upperHeight: c4, upperLabelHeight: h4 }, true);
          o4 = sC(o4 - 2 * p3, 0);
          a4 = sC(a4 - p3 - d3, 0);
          l4 = o4 * a4;
          var f3 = gC(e4, s4, l4, n4, i4, r4);
          if (!f3.length)
            return;
          var g3 = { x: p3, y: d3, width: o4, height: a4 };
          var y3 = lC(o4, a4);
          var m3 = 1 / 0;
          var v3 = [];
          v3.area = 0;
          for (var _3 = 0, x3 = f3.length; _3 < x3; ) {
            var b3 = f3[_3], b3 = (v3.push(b3), v3.area += b3.getLayout().area, yC(v3, y3, n4.squareRatio));
            m3 = b3 <= m3 ? (_3++, b3) : (v3.area -= v3.pop().getLayout().area, mC(v3, y3, g3, u4, false), y3 = lC(g3.width, g3.height), 1 / (v3.length = v3.area = 0));
          }
          v3.length && mC(v3, y3, g3, u4, true);
          i4 || null != (c4 = s4.get("childrenVisibleMin")) && l4 < c4 && (i4 = true);
          for (_3 = 0, x3 = f3.length; _3 < x3; _3++)
            t4(f3[_3], n4, i4, r4 + 1);
        }(h3, r3, false, 0), o3 = h3.getLayout(), uC(c3, function(t4, e4) {
          e4 = (c3[e4 + 1] || h3).getValue();
          t4.setLayout(V({ dataExtent: [e4, e4], borderWidth: 0, upperHeight: 0 }, o3));
        })), t3.getData().tree.root);
        a3.setLayout(function(t4, e4, n4) {
          if (e4)
            return { x: e4.x, y: e4.y };
          e4 = { x: 0, y: 0 };
          if (!n4)
            return e4;
          var n4 = n4.node, i4 = n4.getLayout();
          if (!i4)
            return e4;
          var r4 = [i4.width / 2, i4.height / 2], o4 = n4;
          for (; o4; ) {
            var a4 = o4.getLayout();
            r4[0] += a4.x, r4[1] += a4.y, o4 = o4.parentNode;
          }
          return { x: t4.width / 2 - r4[0], y: t4.height / 2 - r4[1] };
        }(s3, i3, u3), true), t3.setLayoutInfo(s3), function e4(t4, n4, i4, r4, o4) {
          var a4 = t4.getLayout();
          var s4 = i4[o4];
          var l4 = s4 && s4 === t4;
          if (s4 && !l4 || o4 === i4.length && t4 !== r4)
            return;
          t4.setLayout({ isInView: true, invisible: !l4 && !n4.intersect(a4), isAboveViewRoot: l4 }, true);
          var u4 = new Z(n4.x - a4.x, n4.y - a4.y, n4.width, n4.height);
          uC(t4.viewChildren || [], function(t5) {
            e4(t5, u4, i4, r4, o4 + 1);
          });
        }(a3, new Z(-s3.x, -s3.y, n3.getWidth(), n3.getHeight()), c3, h3, 0);
      } };
      function gC(t3, e3, n3, i3, r3, o3) {
        var a3, s3 = t3.children || [], l3 = i3.sort, i3 = ("asc" !== l3 && "desc" !== l3 && (l3 = null), null != i3.leafDepth && i3.leafDepth <= o3);
        if (r3 && !i3)
          return t3.viewChildren = [];
        s3 = ft(s3, function(t4) {
          return !t4.isRemoved();
        }), o3 = s3, (a3 = l3) && o3.sort(function(t4, e4) {
          var n4 = "asc" === a3 ? t4.getValue() - e4.getValue() : e4.getValue() - t4.getValue();
          return 0 == n4 ? "asc" === a3 ? t4.dataIndex - e4.dataIndex : e4.dataIndex - t4.dataIndex : n4;
        });
        var u3 = function(t4, e4, n4) {
          for (var i4 = 0, r4 = 0, o4 = e4.length; r4 < o4; r4++)
            i4 += e4[r4].getValue();
          var a4, s4 = t4.get("visualDimension");
          e4 && e4.length ? "value" === s4 && n4 ? (a4 = [e4[e4.length - 1].getValue(), e4[0].getValue()], "asc" === n4 && a4.reverse()) : (a4 = $a(), uC(e4, function(t5) {
            t5 = t5.getValue(s4);
            t5 < a4[0] && (a4[0] = t5), t5 > a4[1] && (a4[1] = t5);
          })) : a4 = [NaN, NaN];
          return { sum: i4, dataExtent: a4 };
        }(e3, s3, l3);
        if (0 === u3.sum)
          return t3.viewChildren = [];
        if (u3.sum = function(t4, e4, n4, i4, r4) {
          if (i4) {
            for (var o4 = t4.get("visibleMin"), a4 = r4.length, s4 = a4, l4 = a4 - 1; 0 <= l4; l4--) {
              var u4 = r4["asc" === i4 ? a4 - l4 - 1 : l4].getValue();
              u4 / n4 * e4 < o4 && (s4 = l4, n4 -= u4);
            }
            "asc" === i4 ? r4.splice(0, a4 - s4) : r4.splice(s4, a4 - s4);
          }
          return n4;
        }(e3, n3, u3.sum, l3, s3), 0 === u3.sum)
          return t3.viewChildren = [];
        for (var h3 = 0, c3 = s3.length; h3 < c3; h3++) {
          var p3 = s3[h3].getValue() / u3.sum * n3;
          s3[h3].setLayout({ area: p3 });
        }
        return i3 && (s3.length && t3.setLayout({ isLeafRoot: true }, true), s3.length = 0), t3.viewChildren = s3, t3.setLayout({ dataExtent: u3.dataExtent }, true), s3;
      }
      function yC(t3, e3, n3) {
        for (var i3, r3 = 0, o3 = 1 / 0, a3 = 0, s3 = t3.length; a3 < s3; a3++)
          (i3 = t3[a3].getLayout().area) && (i3 < o3 && (o3 = i3), r3 < i3) && (r3 = i3);
        var l3 = t3.area * t3.area, e3 = e3 * e3 * n3;
        return l3 ? sC(e3 * r3 / l3, l3 / (e3 * o3)) : 1 / 0;
      }
      function mC(t3, e3, n3, i3, r3) {
        var o3 = e3 === n3.width ? 0 : 1, a3 = 1 - o3, s3 = ["x", "y"], l3 = ["width", "height"], u3 = n3[s3[o3]], h3 = e3 ? t3.area / e3 : 0;
        (r3 || h3 > n3[l3[a3]]) && (h3 = n3[l3[a3]]);
        for (var c3 = 0, p3 = t3.length; c3 < p3; c3++) {
          var d3 = t3[c3], f3 = {}, g3 = h3 ? d3.getLayout().area / h3 : 0, y3 = f3[l3[a3]] = sC(h3 - 2 * i3, 0), m3 = n3[s3[o3]] + n3[l3[o3]] - u3, m3 = c3 === p3 - 1 || m3 < g3 ? m3 : g3, g3 = f3[l3[o3]] = sC(m3 - 2 * i3, 0);
          f3[s3[a3]] = n3[s3[a3]] + lC(i3, y3 / 2), f3[s3[o3]] = u3 + lC(i3, g3 / 2), u3 += m3, d3.setLayout(f3, true);
        }
        n3[s3[a3]] += h3, n3[l3[a3]] -= h3;
      }
      function vC(t3) {
        return t3.get(pC) ? t3.get(dC) : 0;
      }
      function _C(t3, e3) {
        return e3.width / t3.width || e3.height / t3.height || 1;
      }
      function xC(t3, e3) {
        return t3 = t3, (e3 = e3.get("scaleLimit", true)) && (n3 = e3.min || 0, e3 = e3.max || 1 / 0, t3 = Math.max(Math.min(e3, t3), n3)), t3;
        var n3;
      }
      var bC, wC = Vo, SC = uu, MC = "label", TC = "upperLabel", IC = 100, CC = 20, kC = 30, DC = xs([["fill", "color"], ["stroke", "strokeColor"], ["lineWidth", "strokeWidth"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]), AC = function(t3) {
        t3 = DC(t3);
        return t3.stroke = t3.fill = t3.lineWidth = null, t3;
      }, LC = i(), PC = (u(OC, bC = j0), OC.prototype.render = function(t3, e3, n3, i3) {
        var r3, o3, a3, s3, l3;
        L(e3.findComponents({ mainType: "series", subType: "treemap", query: i3 }), t3) < 0 || (this.seriesModel = t3, this.api = n3, this.ecModel = e3, e3 = mI(i3, ["treemapZoomToNode", "treemapRootToNode"], t3), r3 = i3 && i3.type, s3 = t3.layoutInfo, o3 = !this._oldTree, a3 = this._storage, a3 = "treemapRootToNode" === r3 && e3 && a3 ? { rootNodeGroup: a3.nodeGroup[e3.node.getRawIndex()], direction: i3.direction } : null, i3 = this._giveContainerGroup(s3), s3 = t3.get("animation"), l3 = this._doRender(i3, t3, a3), !s3 || o3 || r3 && "treemapZoomToNode" !== r3 && "treemapRootToNode" !== r3 ? l3.renderFinally() : this._doAnimation(i3, l3, t3, a3), this._resetController(n3), this._renderBreadcrumb(t3, n3, e3));
      }, OC.prototype._giveContainerGroup = function(t3) {
        var e3 = this._containerGroup;
        return e3 || (e3 = this._containerGroup = new wC(), this._initEvents(e3), this.group.add(e3)), e3.x = t3.x, e3.y = t3.y, e3;
      }, OC.prototype._doRender = function(t3, O3, R3) {
        var e3 = O3.getData().tree, n3 = this._oldTree, N3 = RC(), z3 = RC(), B3 = this._storage, E3 = [];
        function u3(t4, e4, n4, i4) {
          var u4 = O3, l3 = z3, h3 = B3, c3 = R3, p3 = N3, r4 = E3, d3 = t4, t4 = e4, e4 = n4, n4 = i4;
          if (d3) {
            var f3 = d3.getLayout(), i4 = u4.getData(), g3 = d3.getModel();
            if (i4.setItemGraphicEl(d3.dataIndex, null), f3 && f3.isInView) {
              var o3, a3, s3, y3 = f3.width, m3 = f3.height, v3 = f3.borderWidth, _3 = f3.invisible, x3 = d3.getRawIndex(), b3 = t4 && t4.getRawIndex(), t4 = d3.viewChildren, w3 = f3.upperHeight, t4 = t4 && t4.length, S3 = g3.getModel("itemStyle"), M3 = g3.getModel(["emphasis", "itemStyle"]), T3 = g3.getModel(["blur", "itemStyle"]), I3 = g3.getModel(["select", "itemStyle"]), C3 = S3.get("borderRadius") || 0, k3 = P3("nodeGroup", wC);
              if (k3)
                return e4.add(k3), k3.x = f3.x || 0, k3.y = f3.y || 0, k3.markRedraw(), LC(k3).nodeWidth = y3, LC(k3).nodeHeight = m3, f3.isAboveViewRoot || ((e4 = P3("background", SC, n4, CC)) && function(t5, e5, n5) {
                  var i5 = j(e5);
                  {
                    var r5, o4, a4, s4, l4;
                    i5.dataIndex = d3.dataIndex, i5.seriesIndex = u4.seriesIndex, e5.setShape({ x: 0, y: 0, width: y3, height: m3, r: C3 }), (_3 ? D3 : (e5.invisible = false, i5 = d3.getVisual("style"), r5 = i5.stroke, (o4 = AC(S3)).fill = r5, (a4 = DC(M3)).fill = M3.get("borderColor"), (s4 = DC(T3)).fill = T3.get("borderColor"), (l4 = DC(I3)).fill = I3.get("borderColor"), n5 ? (n5 = y3 - 2 * v3, A3(e5, r5, i5.opacity, { x: v3, y: 0, width: n5, height: w3 })) : e5.removeTextContent(), e5.setStyle(o4), e5.ensureState("emphasis").style = a4, e5.ensureState("blur").style = s4, e5.ensureState("select").style = l4, gh))(e5);
                  }
                  t5.add(e5);
                }(k3, e4, t4 && f3.upperLabelHeight), a3 = g3.getModel("emphasis"), s3 = a3.get("focus"), o3 = a3.get("blurScope"), a3 = a3.get("disabled"), s3 = "ancestor" === s3 ? d3.getAncestorsIndices() : "descendant" === s3 ? d3.getDescendantIndices() : s3, t4 ? (zh(k3) && Nh(k3, false), e4 && (Nh(e4, !a3), i4.setItemGraphicEl(d3.dataIndex, e4), Lh(e4, s3, o3))) : ((t4 = P3("content", SC, n4, kC)) && function(t5, e5) {
                  var n5 = j(e5), n5 = (n5.dataIndex = d3.dataIndex, n5.seriesIndex = u4.seriesIndex, Math.max(y3 - 2 * v3, 0)), i5 = Math.max(m3 - 2 * v3, 0);
                  {
                    var r5, o4, a4, s4;
                    e5.culling = true, e5.setShape({ x: v3, y: v3, width: n5, height: i5, r: C3 }), (_3 ? D3 : (e5.invisible = false, n5 = d3.getVisual("style"), i5 = n5.fill, r5 = AC(S3), r5.fill = i5, r5.decal = n5.decal, o4 = DC(M3), a4 = DC(T3), s4 = DC(I3), A3(e5, i5, n5.opacity, null), e5.setStyle(r5), e5.ensureState("emphasis").style = o4, e5.ensureState("blur").style = a4, e5.ensureState("select").style = s4, gh))(e5);
                  }
                  t5.add(e5);
                }(k3, t4), e4.disableMorphing = true, e4 && zh(e4) && Nh(e4, false), Nh(k3, !a3), i4.setItemGraphicEl(d3.dataIndex, k3), (n4 = g3.getShallow("cursor")) && t4.attr("cursor", n4), Lh(k3, s3, o3))), k3;
            }
          }
          function D3(t5) {
            t5.invisible || r4.push(t5);
          }
          function A3(n5, t5, e5, i5) {
            var r5, o4, a4 = g3.getModel(i5 ? TC : MC), s4 = Va(g3.get("name"), null), a4 = a4.getShallow("show"), l4 = (pd(n5, dd(g3, i5 ? TC : MC), { defaultText: a4 ? s4 : null, inheritColor: t5, defaultOpacity: e5, labelFetcher: u4, labelDataIndex: d3.dataIndex }), n5.getTextContent());
            l4 && (r5 = l4.style, o4 = kt(r5.padding || 0), i5 && (n5.setTextConfig({ layoutRect: i5 }), l4.disableLabelLayout = true), l4.beforeUpdate = function() {
              var t6 = Math.max((i5 || n5.shape).width - o4[1] - o4[3], 0), e6 = Math.max((i5 || n5.shape).height - o4[0] - o4[2], 0);
              r5.width === t6 && r5.height === e6 || l4.setStyle({ width: t6, height: e6 });
            }, r5.truncateMinChar = 2, r5.lineOverflow = "truncate", L3(r5, i5, f3), L3((a4 = l4.getState("emphasis")) ? a4.style : null, i5, f3));
          }
          function L3(t5, e5, n5) {
            var i5 = t5 ? t5.text : null;
            !e5 && n5.isLeafRoot && null != i5 && (e5 = u4.get("drillDownIcon", true), t5.text = e5 ? e5 + " " + i5 : i5);
          }
          function P3(t5, e5, n5, i5) {
            var r5, o4, a4 = null != b3 && h3[t5][b3], s4 = p3[t5];
            return a4 ? (h3[t5][b3] = null, r5 = a4, o4 = (o4 = s4)[x3] = {}, r5 instanceof wC ? (o4.oldX = r5.x, o4.oldY = r5.y) : o4.oldShape = V({}, r5.shape)) : _3 || ((a4 = new e5()) instanceof $s && (a4.z2 = n5 * IC + i5), o4 = a4, r5 = (r5 = s4)[x3] = {}, e5 = d3.parentNode, o4 = o4 instanceof Vo, !e5 || c3 && "drillDown" !== c3.direction || (i5 = n5 = 0, e5 = p3.background[e5.getRawIndex()], !c3 && e5 && e5.oldShape && (n5 = e5.oldShape.width, i5 = e5.oldShape.height), o4 ? (r5.oldX = 0, r5.oldY = i5) : r5.oldShape = { x: n5, y: i5, width: 0, height: 0 }), r5.fadein = !o4), l3[t5][x3] = a4;
          }
        }
        !function i4(r4, o3, a3, s3, l3) {
          s3 ? F(o3 = r4, function(t5, e4) {
            t5.isRemoved() || n4(e4, e4);
          }) : new X_(o3, r4, t4, t4).add(n4).update(n4).remove(yt(n4, null)).execute();
          function t4(t5) {
            return t5.getId();
          }
          function n4(t5, e4) {
            var t5 = null != t5 ? r4[t5] : null, e4 = null != e4 ? o3[e4] : null, n5 = u3(t5, e4, a3, l3);
            n5 && i4(t5 && t5.viewChildren || [], e4 && e4.viewChildren || [], n5, s3, l3 + 1);
          }
        }(e3.root ? [e3.root] : [], n3 && n3.root ? [n3.root] : [], t3, e3 === n3 || !n3, 0);
        i3 = RC(), (t3 = B3) && F(t3, function(t4, e4) {
          var n4 = i3[e4];
          F(t4, function(t5) {
            t5 && (n4.push(t5), LC(t5).willDelete = true);
          });
        });
        var i3, r3 = i3;
        return this._oldTree = e3, this._storage = z3, { lastsForAnimation: N3, willDeleteEls: r3, renderFinally: function() {
          F(r3, function(t4) {
            F(t4, function(t5) {
              t5.parent && t5.parent.remove(t5);
            });
          }), F(E3, function(t4) {
            t4.invisible = true, t4.dirty();
          });
        } };
      }, OC.prototype._doAnimation = function(t3, r3, e3, a3) {
        var n3 = e3.get("animationDurationUpdate"), e3 = e3.get("animationEasing"), s3 = (H(n3) ? 0 : n3) || 0, l3 = (H(e3) ? null : e3) || "cubicOut", u3 = new eC();
        F(r3.willDeleteEls, function(t4, o3) {
          F(t4, function(t5, e4) {
            var n4, i3, r4;
            !t5.invisible && (n4 = t5.parent, r4 = LC(n4), r4 = a3 && "drillDown" === a3.direction ? n4 === a3.rootNodeGroup ? { shape: { x: 0, y: 0, width: r4.nodeWidth, height: r4.nodeHeight }, style: { opacity: 0 } } : { style: { opacity: 0 } } : (i3 = n4 = 0, r4.willDelete || (n4 = r4.nodeWidth / 2, i3 = r4.nodeHeight / 2), "nodeGroup" === o3 ? { x: n4, y: i3, style: { opacity: 0 } } : { shape: { x: n4, y: i3, width: 0, height: 0 }, style: { opacity: 0 } })) && u3.add(t5, r4, s3, 0, l3);
          });
        }), F(this._storage, function(t4, i3) {
          F(t4, function(t5, e4) {
            var e4 = r3.lastsForAnimation[i3][e4], n4 = {};
            e4 && (t5 instanceof Vo ? null != e4.oldX && (n4.x = t5.x, n4.y = t5.y, t5.x = e4.oldX, t5.y = e4.oldY) : (e4.oldShape && (n4.shape = V({}, t5.shape), t5.setShape(e4.oldShape)), e4.fadein ? (t5.setStyle("opacity", 0), n4.style = { opacity: 1 }) : 1 !== t5.style.opacity && (n4.style = { opacity: 1 })), u3.add(t5, n4, s3, 0, l3));
          });
        }, this), this._state = "animating", u3.finished(y(function() {
          this._state = "ready", r3.renderFinally();
        }, this)).start();
      }, OC.prototype._resetController = function(t3) {
        var r3 = this, e3 = this.seriesModel, n3 = this._controller;
        n3 || ((n3 = this._controller = new YI(t3.getZr())).on("pan", y(this._onPan, this)), n3.on("zoom", y(this._onZoom, this))), n3.enable(e3.get("roam"), { api: t3, zInfo: { component: e3 }, triggerInfo: { roamTrigger: e3.get("roamTrigger"), isInSelf: function(t4, e4, n4) {
          var i3 = r3._containerGroup;
          return !!i3 && i3.getBoundingRect().contain(e4 - i3.x, n4 - i3.y);
        } } });
      }, OC.prototype._clearController = function() {
        var t3 = this._controller;
        t3 && t3.dispose();
      }, OC.prototype._onPan = function(t3) {
        var e3;
        "animating" !== this._state && (3 < Math.abs(t3.dx) || 3 < Math.abs(t3.dy)) && (e3 = this.seriesModel.getData().tree.root) && (e3 = e3.getLayout()) && this.api.dispatchAction({ type: "treemapMove", from: this.uid, seriesId: this.seriesModel.id, rootRect: { x: e3.x + t3.dx, y: e3.y + t3.dy, width: e3.width, height: e3.height } });
      }, OC.prototype._onZoom = function(t3) {
        var e3, n3, i3, r3 = t3.originX, o3 = t3.originY, t3 = t3.scale, a3 = this.seriesModel;
        "animating" !== this._state && (i3 = a3.getData().tree.root) && (i3 = i3.getLayout()) && (e3 = new Z(i3.x, i3.y, i3.width, i3.height), t3 = xC((i3 = _C(n3 = a3.layoutInfo, i3)) * t3, a3) / i3, We(a3 = Ve(), a3, [-(r3 -= n3.x), -(o3 -= n3.y)]), Xe(a3, a3, [t3, t3]), We(a3, a3, [r3, o3]), e3.applyTransform(a3), this.api.dispatchAction({ type: "treemapRender", from: this.uid, seriesId: this.seriesModel.id, rootRect: { x: e3.x, y: e3.y, width: e3.width, height: e3.height } }));
      }, OC.prototype._initEvents = function(t3) {
        var i3 = this;
        t3.on("click", function(t4) {
          var e3, n3;
          "ready" === i3._state && (n3 = i3.seriesModel.get("nodeClick", true)) && (e3 = i3.findTarget(t4.offsetX, t4.offsetY)) && ((t4 = e3.node).getLayout().isLeafRoot ? i3._rootToNode(e3) : "zoomToNode" === n3 ? i3._zoomToNode(e3) : "link" === n3 && (n3 = (e3 = t4.hostTree.data.getItemModel(t4.dataIndex)).get("link", true), t4 = e3.get("target", true) || "blank", n3) && Nf(n3, t4));
        }, this);
      }, OC.prototype._renderBreadcrumb = function(e3, t3, n3) {
        var i3 = this;
        n3 = (n3 = n3 || (null != e3.get("leafDepth", true) ? { node: e3.getViewRoot() } : this.findTarget(t3.getWidth() / 2, t3.getHeight() / 2))) || { node: e3.getData().tree.root }, (this._breadcrumb || (this._breadcrumb = new FI(this.group))).render(e3, t3, n3.node, function(t4) {
          "animating" !== i3._state && (_I(e3.getViewRoot(), t4) ? i3._rootToNode({ node: t4 }) : i3._zoomToNode({ node: t4 }));
        });
      }, OC.prototype.remove = function() {
        this._clearController(), this._containerGroup && this._containerGroup.removeAll(), this._storage = RC(), this._state = "ready", this._breadcrumb && this._breadcrumb.remove();
      }, OC.prototype.dispose = function() {
        this._clearController();
      }, OC.prototype._zoomToNode = function(t3) {
        this.api.dispatchAction({ type: "treemapZoomToNode", from: this.uid, seriesId: this.seriesModel.id, targetNode: t3.node });
      }, OC.prototype._rootToNode = function(t3) {
        this.api.dispatchAction({ type: "treemapRootToNode", from: this.uid, seriesId: this.seriesModel.id, targetNode: t3.node });
      }, OC.prototype.findTarget = function(i3, r3) {
        var o3;
        return this.seriesModel.getViewRoot().eachNode({ attr: "viewChildren", order: "preorder" }, function(t3) {
          var e3 = this._storage.background[t3.getRawIndex()];
          if (e3) {
            var n3 = e3.transformCoordToLocal(i3, r3), e3 = e3.shape;
            if (!(e3.x <= n3[0] && n3[0] <= e3.x + e3.width && e3.y <= n3[1] && n3[1] <= e3.y + e3.height))
              return false;
            o3 = { node: t3, offsetX: n3[0], offsetY: n3[1] };
          }
        }, this), o3;
      }, OC.type = "treemap", OC);
      function OC() {
        var t3 = null !== bC && bC.apply(this, arguments) || this;
        return t3.type = OC.type, t3._state = "ready", t3._storage = RC(), t3;
      }
      function RC() {
        return { nodeGroup: [], background: [], content: [] };
      }
      var NC = F, zC = X, BC = -1, EC = (VC.prototype.mapValueToVisual = function(t3) {
        var e3 = this._normalizeData(t3);
        return this._normalizedToVisual(e3, t3);
      }, VC.prototype.getNormalizer = function() {
        return y(this._normalizeData, this);
      }, VC.listVisualTypes = function() {
        return O(VC.visualHandlers);
      }, VC.isValidType = function(t3) {
        return VC.visualHandlers.hasOwnProperty(t3);
      }, VC.eachVisual = function(t3, e3, n3) {
        X(t3) ? F(t3, e3, n3) : e3.call(n3, t3);
      }, VC.mapVisual = function(t3, n3, i3) {
        var r3, o3 = G(t3) ? [] : X(t3) ? {} : (r3 = true, null);
        return VC.eachVisual(t3, function(t4, e3) {
          t4 = n3.call(i3, t4, e3);
          r3 ? o3 = t4 : o3[e3] = t4;
        }), o3;
      }, VC.retrieveVisuals = function(n3) {
        var i3, r3 = {};
        return n3 && NC(VC.visualHandlers, function(t3, e3) {
          n3.hasOwnProperty(e3) && (r3[e3] = n3[e3], i3 = true);
        }), i3 ? r3 : null;
      }, VC.prepareVisualTypes = function(t3) {
        if (G(t3))
          t3 = t3.slice();
        else {
          if (!zC(t3))
            return [];
          var n3 = [];
          NC(t3, function(t4, e3) {
            n3.push(e3);
          }), t3 = n3;
        }
        return t3.sort(function(t4, e3) {
          return "color" === e3 && "color" !== t4 && 0 === t4.indexOf("color") ? 1 : -1;
        }), t3;
      }, VC.dependsOn = function(t3, e3) {
        return "color" === e3 ? !(!t3 || 0 !== t3.indexOf(e3)) : t3 === e3;
      }, VC.findPieceIndex = function(n3, t3, e3) {
        for (var i3, r3 = 1 / 0, o3 = 0, a3 = t3.length; o3 < a3; o3++) {
          var s3 = t3[o3].value;
          if (null != s3) {
            if (s3 === n3 || W(s3) && s3 === n3 + "")
              return o3;
            e3 && h3(s3, o3);
          }
        }
        for (o3 = 0, a3 = t3.length; o3 < a3; o3++) {
          var l3 = t3[o3], u3 = l3.interval, l3 = l3.close;
          if (u3) {
            if (u3[0] === -1 / 0) {
              if (KC(l3[1], n3, u3[1]))
                return o3;
            } else if (u3[1] === 1 / 0) {
              if (KC(l3[0], u3[0], n3))
                return o3;
            } else if (KC(l3[0], u3[0], n3) && KC(l3[1], n3, u3[1]))
              return o3;
            e3 && h3(u3[0], o3), e3 && h3(u3[1], o3);
          }
        }
        if (e3)
          return n3 === 1 / 0 ? t3.length - 1 : n3 === -1 / 0 ? 0 : i3;
        function h3(t4, e4) {
          t4 = Math.abs(t4 - n3);
          t4 < r3 && (r3 = t4, i3 = e4);
        }
      }, VC.visualHandlers = { color: { applyVisual: WC("color"), getColorMapper: function() {
        var r3 = this.option;
        return y("category" === r3.mappingMethod ? function(t3, e3) {
          return e3 || (t3 = this._normalizeData(t3)), UC.call(this, t3);
        } : function(t3, e3, n3) {
          var i3 = !!n3;
          return n3 = Hi(t3 = e3 ? t3 : this._normalizeData(t3), r3.parsedVisual, n3), i3 ? n3 : qi(n3, "rgba");
        }, this);
      }, _normalizedToVisual: { linear: function(t3) {
        return qi(Hi(t3, this.option.parsedVisual), "rgba");
      }, category: UC, piecewise: function(t3, e3) {
        e3 = qC.call(this, e3);
        return e3 = null == e3 ? qi(Hi(t3, this.option.parsedVisual), "rgba") : e3;
      }, fixed: XC } }, colorHue: GC(function(t3, e3) {
        return Xi(t3, e3);
      }), colorSaturation: GC(function(t3, e3) {
        return Xi(t3, null, e3);
      }), colorLightness: GC(function(t3, e3) {
        return Xi(t3, null, null, e3);
      }), colorAlpha: GC(Yi), decal: { applyVisual: WC("decal"), _normalizedToVisual: { linear: null, category: UC, piecewise: null, fixed: null } }, opacity: { applyVisual: WC("opacity"), _normalizedToVisual: YC([0, 1]) }, liftZ: { applyVisual: WC("liftZ"), _normalizedToVisual: { linear: XC, category: XC, piecewise: XC, fixed: XC } }, symbol: { applyVisual: function(t3, e3, n3) {
        n3("symbol", this.mapValueToVisual(t3));
      }, _normalizedToVisual: { linear: HC, category: UC, piecewise: function(t3, e3) {
        e3 = qC.call(this, e3);
        return e3 = null == e3 ? HC.call(this, t3) : e3;
      }, fixed: XC } }, symbolSize: { applyVisual: WC("symbolSize"), _normalizedToVisual: YC([0, 1]) } }, VC);
      function VC(t3) {
        var n3, e3 = t3.mappingMethod, i3 = t3.type, t3 = this.option = _(t3), i3 = (this.type = i3, this.mappingMethod = e3, this._normalizeData = jC[e3], VC.visualHandlers[i3]);
        if (this.applyVisual = i3.applyVisual, this.getColorMapper = i3.getColorMapper, this._normalizedToVisual = i3._normalizedToVisual[e3], "piecewise" === e3)
          FC(t3), i3 = (n3 = t3).pieceList, n3.hasSpecialVisual = false, F(i3, function(t4, e4) {
            t4.originIndex = e4, null != t4.visual && (n3.hasSpecialVisual = true);
          });
        else if ("category" === e3)
          if (t3.categories) {
            var r3, i3 = t3, o3 = i3.categories, a3 = i3.categoryMap = {}, s3 = i3.visual;
            NC(o3, function(t4, e4) {
              a3[t4] = e4;
            }), G(s3) || (r3 = [], X(s3) ? NC(s3, function(t4, e4) {
              e4 = a3[e4];
              r3[null != e4 ? e4 : BC] = t4;
            }) : r3[BC] = s3, s3 = ZC(i3, r3));
            for (var l3 = o3.length - 1; 0 <= l3; l3--)
              null == s3[l3] && (delete a3[o3[l3]], o3.pop());
          } else
            FC(t3, true);
        else
          Dt("linear" !== e3 || t3.dataExtent), FC(t3);
      }
      function FC(t3, e3) {
        var n3 = t3.visual, i3 = [];
        X(n3) ? NC(n3, function(t4) {
          i3.push(t4);
        }) : null != n3 && i3.push(n3);
        e3 || 1 !== i3.length || { color: 1, symbol: 1 }.hasOwnProperty(t3.type) || (i3[1] = i3[0]), ZC(t3, i3);
      }
      function GC(i3) {
        return { applyVisual: function(t3, e3, n3) {
          t3 = this.mapValueToVisual(t3);
          n3("color", i3(e3("color"), t3));
        }, _normalizedToVisual: YC([0, 1]) };
      }
      function HC(t3) {
        var e3 = this.option.visual;
        return e3[Math.round(ua(t3, [0, 1], [0, e3.length - 1], true))] || {};
      }
      function WC(i3) {
        return function(t3, e3, n3) {
          n3(i3, this.mapValueToVisual(t3));
        };
      }
      function UC(t3) {
        var e3 = this.option.visual;
        return e3[this.option.loop && t3 !== BC ? t3 % e3.length : t3];
      }
      function XC() {
        return this.option.visual[0];
      }
      function YC(n3) {
        return { linear: function(t3) {
          return ua(t3, n3, this.option.visual, true);
        }, category: UC, piecewise: function(t3, e3) {
          e3 = qC.call(this, e3);
          return e3 = null == e3 ? ua(t3, n3, this.option.visual, true) : e3;
        }, fixed: XC };
      }
      function qC(t3) {
        var e3 = this.option, n3 = e3.pieceList;
        if (e3.hasSpecialVisual) {
          e3 = n3[EC.findPieceIndex(t3, n3)];
          if (e3 && e3.visual)
            return e3.visual[this.type];
        }
      }
      function ZC(t3, e3) {
        return t3.visual = e3, "color" === t3.type && (t3.parsedVisual = E(e3, function(t4) {
          t4 = Vi(t4);
          return t4 || [0, 0, 0, 1];
        })), e3;
      }
      var jC = { linear: function(t3) {
        return ua(t3, this.option.dataExtent, [0, 1], true);
      }, piecewise: function(t3) {
        var e3 = this.option.pieceList, t3 = EC.findPieceIndex(t3, e3, true);
        if (null != t3)
          return ua(t3, [0, e3.length - 1], [0, 1], true);
      }, category: function(t3) {
        t3 = this.option.categories ? this.option.categoryMap[t3] : t3;
        return null == t3 ? BC : t3;
      }, fixed: Wt };
      function KC(t3, e3, n3) {
        return t3 ? e3 <= n3 : e3 < n3;
      }
      var $C = "itemStyle", QC = i(), JC = { seriesType: "treemap", reset: function(t3) {
        var e3 = t3.getData().tree.root;
        e3.isRemoved() || !function n3(t4, e4, i3, r3) {
          var o3 = t4.getModel();
          var a3 = t4.getLayout();
          var s3 = t4.hostTree.data;
          if (!a3 || a3.invisible || !a3.isInView)
            return;
          var l3 = o3.getModel($C);
          var u3 = t2(l3, e4, r3);
          e4 = s3.ensureUniqueItemVisual(t4.dataIndex, "style");
          s3 = l3.get("borderColor");
          var h3 = l3.get("borderColorSaturation");
          var c3;
          null != h3 && (c3 = e2(u3), s3 = n2(h3, c3));
          e4.stroke = s3;
          h3 = t4.viewChildren;
          {
            var p3;
            h3 && h3.length ? (p3 = r2(0, o3, a3, 0, u3, h3), F(h3, function(t5, e5) {
              (t5.depth >= i3.length || t5 === i3[t5.depth]) && (e5 = a2(o3, u3, t5, e5, p3, r3), n3(t5, e5, i3, r3));
            })) : (c3 = e2(u3), e4.fill = c3);
          }
        }(e3, {}, t3.getViewRoot().getAncestors(), t3);
      } };
      function t2(n3, i3, t3) {
        var r3 = V({}, i3), o3 = t3.designatedVisualItemStyle;
        return F(["color", "colorAlpha", "colorSaturation"], function(t4) {
          o3[t4] = i3[t4];
          var e3 = n3.get(t4);
          (o3[t4] = null) != e3 && (r3[t4] = e3);
        }), r3;
      }
      function e2(t3) {
        var e3, n3 = i2(t3, "color");
        if (n3)
          return e3 = i2(t3, "colorAlpha"), (t3 = i2(t3, "colorSaturation")) && (n3 = Xi(n3, null, null, t3)), e3 ? Yi(n3, e3) : n3;
      }
      function n2(t3, e3) {
        return null != e3 ? Xi(e3, null, null, t3) : null;
      }
      function i2(t3, e3) {
        t3 = t3[e3];
        if (null != t3 && "none" !== t3)
          return t3;
      }
      function r2(t3, e3, n3, i3, r3, o3) {
        if (o3 && o3.length) {
          var a3, o3 = o2(e3, "color") || null != r3.color && "none" !== r3.color && (o2(e3, "colorAlpha") || o2(e3, "colorSaturation"));
          if (o3)
            return r3 = e3.get("visualMin"), a3 = e3.get("visualMax"), n3 = n3.dataExtent.slice(), null != r3 && r3 < n3[0] && (n3[0] = r3), null != a3 && a3 > n3[1] && (n3[1] = a3), r3 = e3.get("colorMappingBy"), "color" !== (a3 = { type: o3.name, dataExtent: n3, visual: o3.range }).type || "index" !== r3 && "id" !== r3 ? a3.mappingMethod = "linear" : (a3.mappingMethod = "category", a3.loop = true), e3 = new EC(a3), QC(e3).drColorMappingBy = r3, e3;
        }
      }
      function o2(t3, e3) {
        t3 = t3.get(e3);
        return G(t3) && t3.length ? { name: e3, range: t3 } : null;
      }
      function a2(t3, e3, n3, i3, r3, o3) {
        var a3, s3, e3 = V({}, e3);
        return r3 && (i3 = "index" === (s3 = "color" === (a3 = r3.type) && QC(r3).drColorMappingBy) ? i3 : "id" === s3 ? o3.mapIdToIndex(n3.getId()) : n3.getValue(t3.get("visualDimension")), e3[a3] = r3.mapValueToVisual(i3)), e3;
      }
      _b(function(t3) {
        t3.registerSeriesModel(EI), t3.registerChartView(PC), t3.registerVisual(JC), t3.registerLayout(fC), wI(t3);
      });
      u(u2, s2 = cg), u2.prototype.getCoordSysModel = function() {
        return this.getReferringComponents("grid", qa).models[0];
      }, u2.type = "cartesian2dAxis";
      var s2, l2 = u2;
      function u2() {
        return null !== s2 && s2.apply(this, arguments) || this;
      }
      ct(l2, zx);
      var ys = { show: true, z: 0, inverse: false, name: "", nameLocation: "end", nameRotate: null, nameTruncate: { maxWidth: null, ellipsis: "...", placeholder: "." }, nameTextStyle: {}, nameGap: 15, silent: false, triggerEvent: false, tooltip: { show: false }, axisPointer: {}, axisLine: { show: true, onZero: "auto", onZeroAxisIndex: null, lineStyle: { color: v.color.axisLine, width: 1, type: "solid" }, symbol: ["none", "none"], symbolSize: [10, 15], breakLine: true }, axisTick: { show: true, inside: false, length: 5, lineStyle: { width: 1 } }, axisLabel: { show: true, inside: false, rotate: 0, showMinLabel: null, showMaxLabel: null, margin: 8, fontSize: 12, color: v.color.axisLabel, textMargin: [0, 3] }, splitLine: { show: true, showMinLine: true, showMaxLine: true, lineStyle: { color: v.color.axisSplitLine, width: 1, type: "solid" } }, splitArea: { show: false, areaStyle: { color: [v.color.backgroundTint, v.color.backgroundTransparent] } }, breakArea: { show: true, itemStyle: { color: v.color.neutral00, borderColor: v.color.border, borderWidth: 1, borderType: [3, 3], opacity: 0.6 }, zigzagAmplitude: 4, zigzagMinSpan: 4, zigzagMaxSpan: 20, zigzagZ: 100, expandOnClick: true }, breakLabelLayout: { moveOverlap: "auto" } }, Gm = d({ boundaryGap: true, deduplication: null, jitter: 0, jitterOverlap: true, jitterMargin: 2, splitLine: { show: false }, axisTick: { alignWithLabel: false, interval: "auto", show: "auto" }, axisLabel: { interval: "auto" } }, ys), $c = d({ boundaryGap: [0, 0], axisLine: { show: "auto" }, axisTick: { show: "auto" }, splitNumber: 5, minorTick: { show: false, splitNumber: 5, length: 3, lineStyle: {} }, minorSplitLine: { show: false, lineStyle: { color: v.color.axisMinorSplitLine, width: 1 } } }, ys), h2 = { category: Gm, value: $c, time: d({ splitNumber: 6, axisLabel: { rich: { primary: { fontWeight: "bold" } } }, splitLine: { show: false } }, $c), log: B({ logBase: 10 }, $c) };
      function c2(o3, a3, s3, l3) {
        F(xx, function(t3, r3) {
          var e3, n3 = d(d({}, h2[r3], true), l3, true), n3 = (u(i3, e3 = s3), i3.prototype.mergeDefaultAndTheme = function(t4, e4) {
            var n4 = ig(this), i4 = n4 ? og(t4) : {};
            d(t4, e4.getTheme().get(r3 + "Axis")), d(t4, this.getDefaultOption()), t4.type = p2(t4), n4 && rg(t4, i4, n4);
          }, i3.prototype.optionUpdated = function() {
            "category" === this.option.type && (this.__ordinalMeta = D1.createByAxisModel(this));
          }, i3.prototype.getCategories = function(t4) {
            var e4 = this.option;
            if ("category" === e4.type)
              return t4 ? e4.data : this.__ordinalMeta.categories;
          }, i3.prototype.getOrdinalMeta = function() {
            return this.__ordinalMeta;
          }, i3.prototype.updateAxisBreaks = function(t4) {
            return wS ? wS.updateModelAxisBreak(this, t4) : { breaks: [] };
          }, i3.type = a3 + "Axis." + r3, i3.defaultOption = n3, i3);
          function i3() {
            var t4 = null !== e3 && e3.apply(this, arguments) || this;
            return t4.type = a3 + "Axis." + r3, t4;
          }
          o3.registerComponentModel(n3);
        }), o3.registerSubTypeDefaulter(a3 + "Axis", p2);
      }
      function p2(t3) {
        return t3.type || (t3.data ? "category" : "value");
      }
      function d2(t3) {
        this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = t3 || "";
      }
      d2.prototype.getAxis = function(t3) {
        return this._axes[t3];
      }, d2.prototype.getAxes = function() {
        return E(this._dimList, function(t3) {
          return this._axes[t3];
        }, this);
      }, d2.prototype.getAxesByScale = function(e3) {
        return e3 = e3.toLowerCase(), ft(this.getAxes(), function(t3) {
          return t3.scale.type === e3;
        });
      }, d2.prototype.addAxis = function(t3) {
        var e3 = t3.dim;
        this._axes[e3] = t3, this._dimList.push(e3);
      };
      var f2 = ["x", "y"];
      function g2(t3) {
        return ("interval" === t3.type || "time" === t3.type) && !Qd(t3);
      }
      u(v2, y2 = d2), v2.prototype.calcAffineTransform = function() {
        this._transform = this._invTransform = null;
        var t3, e3, n3, i3, r3 = this.getAxis("x").scale, o3 = this.getAxis("y").scale;
        g2(r3) && g2(o3) && (r3 = G1(r3, null), o3 = G1(o3, null), i3 = this.dataToPoint([r3[0], o3[0]]), e3 = this.dataToPoint([r3[1], o3[1]]), t3 = r3[1] - r3[0], n3 = o3[1] - o3[0], t3) && n3 && (t3 = (e3[0] - i3[0]) / t3, e3 = (e3[1] - i3[1]) / n3, n3 = i3[0] - r3[0] * t3, r3 = i3[1] - o3[0] * e3, i3 = this._transform = [t3, 0, 0, e3, n3, r3], this._invTransform = Ye([], i3));
      }, v2.prototype.getBaseAxis = function() {
        return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
      }, v2.prototype.containPoint = function(t3) {
        var e3 = this.getAxis("x"), n3 = this.getAxis("y");
        return e3.contain(e3.toLocalCoord(t3[0])) && n3.contain(n3.toLocalCoord(t3[1]));
      }, v2.prototype.containData = function(t3) {
        return this.getAxis("x").containData(t3[0]) && this.getAxis("y").containData(t3[1]);
      }, v2.prototype.containZone = function(t3, e3) {
        var t3 = this.dataToPoint(t3), e3 = this.dataToPoint(e3), n3 = this.getArea(), e3 = new Z(t3[0], t3[1], e3[0] - t3[0], e3[1] - t3[1]);
        return n3.intersect(e3);
      }, v2.prototype.dataToPoint = function(t3, e3, n3) {
        n3 = n3 || [];
        var i3, r3 = t3[0], o3 = t3[1];
        return this._transform && null != r3 && isFinite(r3) && null != o3 && isFinite(o3) ? le(n3, t3, this._transform) : (t3 = this.getAxis("x"), i3 = this.getAxis("y"), n3[0] = t3.toGlobalCoord(t3.dataToCoord(r3, e3)), n3[1] = i3.toGlobalCoord(i3.dataToCoord(o3, e3)), n3);
      }, v2.prototype.clampData = function(t3, e3) {
        var n3 = this.getAxis("x").scale, i3 = this.getAxis("y").scale, r3 = n3.getExtent(), o3 = i3.getExtent(), n3 = n3.parse(t3[0]), i3 = i3.parse(t3[1]);
        return (e3 = e3 || [])[0] = Math.min(Math.max(Math.min(r3[0], r3[1]), n3), Math.max(r3[0], r3[1])), e3[1] = Math.min(Math.max(Math.min(o3[0], o3[1]), i3), Math.max(o3[0], o3[1])), e3;
      }, v2.prototype.pointToData = function(t3, e3, n3) {
        var i3, r3;
        return n3 = n3 || [], this._invTransform ? le(n3, t3, this._invTransform) : (i3 = this.getAxis("x"), r3 = this.getAxis("y"), n3[0] = i3.coordToData(i3.toLocalCoord(t3[0]), e3), n3[1] = r3.coordToData(r3.toLocalCoord(t3[1]), e3), n3);
      }, v2.prototype.getOtherAxis = function(t3) {
        return this.getAxis("x" === t3.dim ? "y" : "x");
      }, v2.prototype.getArea = function(t3) {
        t3 = t3 || 0;
        var e3 = this.getAxis("x").getGlobalExtent(), n3 = this.getAxis("y").getGlobalExtent(), i3 = Math.min(e3[0], e3[1]) - t3, r3 = Math.min(n3[0], n3[1]) - t3, e3 = Math.max(e3[0], e3[1]) - i3 + t3, n3 = Math.max(n3[0], n3[1]) - r3 + t3;
        return new Z(i3, r3, e3, n3);
      };
      var y2, m2 = v2;
      function v2() {
        var t3 = null !== y2 && y2.apply(this, arguments) || this;
        return t3.type = rM, t3.dimensions = f2, t3;
      }
      function _2(t3, e3) {
        var n3, i3, r3, o3, a3, s3, l3, u3, h3, c3 = t3.scale, p3 = t3.model, d3 = cb(c3, p3, p3.ecModel, t3, null), f3 = Z1(c3), p3 = Z1(e3) ? e3.intervalStub : e3, e3 = f3 ? c3.intervalStub : c3, g3 = c3.base, y3 = p3.getTicks(), m3 = p3.getTicks({ expandToNicedExtent: true }), v3 = y3.length - 1, _3 = (1 == v3 ? (r3 = n3 = 0, i3 = 1) : 2 == v3 ? (_3 = ta(y3[0].value - y3[1].value), x3 = ta(y3[1].value - y3[2].value), r3 = n3 = 0, _3 === x3 ? i3 = 2 : (i3 = 1, _3 < x3 ? r3 = _3 / x3 : n3 = x3 / _3)) : (x3 = p3.getConfig().interval, r3 = (1 - (y3[0].value - m3[0].value) / x3) % 1, n3 = (1 - (m3[v3].value - y3[v3].value) / x3) % 1, i3 = v3 - (r3 ? 1 : 0) - (n3 ? 1 : 0)), d3.zoomFixMM), p3 = _3[0] || _3[1], m3 = [d3.fixMM[0] || p3, d3.fixMM[1] || p3], y3 = c3.getExtent(), x3 = e3.getExtent(), b3 = J1(x3, m3);
        function w3(t4) {
          for (var e4, n4, i4, r4 = 0; r4 < 50 && !t4(); r4++)
            h3 = f3 ? h3 * Jo(g3, 2) : (i4 = n4 = void 0, n4 = wa(e4 = h3), i4 = ra(10, n4), (e4 = ea(e4 / i4)) ? 2 === e4 ? e4 = 3 : 3 === e4 ? e4 = 5 : e4 *= 2 : e4 = 1, C(e4 * i4, -n4)), o3 = K1(h3);
        }
        function S3() {
          l3 = C(s3 - h3 * r3, o3);
        }
        function M3() {
          u3 = C(a3 + h3 * n3, o3);
        }
        function T3() {
          s3 = r3 ? C(l3 + h3 * r3, o3) : l3;
        }
        function I3() {
          a3 = n3 ? C(u3 - h3 * n3, o3) : u3;
        }
        m3[0] && m3[1] ? (l3 = b3[0], h3 = ((u3 = b3[1]) - l3) / (i3 + r3 + n3), v3 = t3.getExtent(), _3 = ta(v3[1] - v3[0]), p3 = _3, e3 = 0.5 / i3, t3 = ta((t3 = [u3, l3])[1] - t3[0]), o3 = isFinite(t3) && 0 !== t3 && (e3 = oa(2 * ta(e3 || 1) * ta(t3)) / aa, t3 = oa(ta(p3)) / aa, p3 = Jo(0, ia(t3 - e3)), isFinite(p3)) ? p3 : NaN, T3(), I3(), Da(o3) && (h3 = C(h3, o3))) : (v3 = b3[1] - b3[0], h3 = f3 ? Jo(ba(v3), 1) : Ma(v3 / i3, Sa), o3 = K1(h3), m3[0] ? (l3 = b3[0], w3(function() {
          return T3(), a3 = C(s3 + h3 * i3, o3), M3(), u3 >= b3[1];
        })) : m3[1] ? (u3 = b3[1], w3(function() {
          return I3(), s3 = C(a3 - h3 * i3, o3), S3(), l3 <= b3[0];
        })) : w3(function() {
          s3 = C(ia(b3[0] / h3) * h3, o3), a3 = C(na(b3[1] / h3) * h3, o3);
          var t4, e4, n4 = ea((a3 - s3) / h3);
          if (n4 <= i3)
            return n4 = i3 - n4, e4 = void 0, e4 = (t4 = d3.incl0 || f3) && 0 === b3[0] ? [0, n4] : t4 && 0 === b3[1] ? [n4, 0] : (t4 = na(n4 / 2), n4 % 2 == 0 ? [t4, t4] : l3 + u3 < b3[0] + b3[1] ? [t4, t4 + 1] : [t4 + 1, t4]), s3 = C(s3 - h3 * e4[0], o3), a3 = C(a3 + h3 * e4[1], o3), S3(), M3(), l3 <= b3[0] && u3 >= b3[1] ? 1 : void 0;
        })), Ox(c3, m3, x3, [l3, u3], y3, { interval: h3, intervalCount: i3, intervalPrecision: o3, niceExtent: [s3, a3] });
      }
      var x2 = [[3, 1], [0, 2]], b2 = (w2.prototype.getRect = function() {
        return this._rect;
      }, w2.prototype.update = function(t3, e3) {
        var n3 = this._axesMap;
        function i3(t4) {
          for (var e4 = O(t4), n4 = [], i4 = e4.length - 1; 0 <= i4; i4--) {
            var r4 = t4[+e4[i4]];
            r4.__alignTo ? n4.push(r4) : fb(r4);
          }
          F(n4, function(t5) {
            var e5;
            e5 = t5.__alignTo, Qd(t5.scale) || Qd(e5.scale) || e5.scale.getTicks().length < 2 ? fb(t5) : _2(t5, t5.__alignTo.scale);
          });
        }
        F(this._axesList, function(t4) {
          lb(t4, 1);
          var e4 = t4.scale;
          j1(e4) && e4.setSortInfo(t4.model.get("categorySortInfo"));
        }), i3(n3.x), i3(n3.y);
        var r3 = {};
        F(n3.x, function(t4) {
          S2(n3, "y", t4, r3);
        }), F(n3.y, function(t4) {
          S2(n3, "x", t4, r3);
        }), this.resize(this.model, e3);
      }, w2.prototype.resize = function(t3, e3, n3) {
        var i3, r3, o3, a3, s3, l3 = ng(t3, e3), u3 = this._rect = tg(t3.getBoxLayoutParams(), l3.refContainer), h3 = this._axesMap, c3 = this._coordsList, p3 = t3.get("containLabel");
        I2(h3, u3), n3 || (i3 = u3, r3 = c3, n3 = h3, o3 = p3, a3 = e3, s3 = new DS(A2), F(n3, function(t4) {
          return F(t4, function(t5) {
            Px(t5.model) && (t5.axisBuilder = function(t6, e4, n4, i4, r4, o4) {
              for (var t6 = ZS(t6, n4), a4 = false, s4 = false, l4 = 0; l4 < e4.length; l4++)
                X1(e4[l4].getOtherAxis(n4.axis).scale) && (a4 = s4 = true, "category" === n4.axis.type) && n4.axis.onBand && (s4 = false);
              return t6.axisLineAutoShow = a4, t6.axisTickAutoShow = s4, t6.defaultNameMoveOverlap = o4, new zS(n4, i4, t6, r4);
            }(i3, r3, t5.model, a3, s3, !o3));
          });
        }), c3 = s3, e3 = void 0, p3 ? e3 = k2(u3.clone(), "axisLabel", null, u3, h3, c3, l3) : (p3 = (n3 = function(t4, e4, n4) {
          var i4, r4 = t4.get("outerBoundsMode", true);
          "same" === r4 ? i4 = e4.clone() : null != r4 && "auto" !== r4 || (i4 = tg(t4.get("outerBounds", true) || nM, n4.refContainer));
          r4 = t4.get("outerBoundsContain", true);
          n4 = null == r4 || "auto" === r4 || L(["all", "axisLabel"], r4) < 0 ? "all" : r4;
          r4 = [ca(Y(t4.get("outerBoundsClampWidth", true), iM[0]), e4.width), ca(Y(t4.get("outerBoundsClampHeight", true), iM[1]), e4.height)];
          return { outerBoundsRect: i4, parsedOuterBoundsContain: n4, outerBoundsClamp: r4 };
        }(t3, u3, l3)).outerBoundsRect, t3 = n3.parsedOuterBoundsContain, n3 = n3.outerBoundsClamp, p3 && (e3 = k2(p3, t3, n3, u3, h3, c3, l3))), D2(u3, h3, Vb.determine, null, e3, l3), F(this._coordsList, function(t4) {
          t4.calcAffineTransform();
        }));
      }, w2.prototype.getAxis = function(t3, e3) {
        t3 = this._axesMap[t3];
        if (null != t3)
          return t3[e3 || 0];
      }, w2.prototype.getAxes = function() {
        return this._axesList.slice();
      }, w2.prototype.getCartesian = function(t3, e3) {
        if (null != t3 && null != e3)
          return this._coordsMap["x" + t3 + "y" + e3];
        X(t3) && (e3 = t3.yAxisIndex, t3 = t3.xAxisIndex);
        for (var n3 = 0, i3 = this._coordsList; n3 < i3.length; n3++)
          if (i3[n3].getAxis("x").index === t3 || i3[n3].getAxis("y").index === e3)
            return i3[n3];
      }, w2.prototype.getCartesians = function() {
        return this._coordsList.slice();
      }, w2.prototype.convertToPixel = function(t3, e3, n3) {
        e3 = this._findConvertTarget(e3);
        return e3.cartesian ? e3.cartesian.dataToPoint(n3) : e3.axis ? e3.axis.toGlobalCoord(e3.axis.dataToCoord(n3)) : null;
      }, w2.prototype.convertFromPixel = function(t3, e3, n3) {
        e3 = this._findConvertTarget(e3);
        return e3.cartesian ? e3.cartesian.pointToData(n3) : e3.axis ? e3.axis.coordToData(e3.axis.toLocalCoord(n3)) : null;
      }, w2.prototype._findConvertTarget = function(t3) {
        var e3, n3, i3 = t3.seriesModel, r3 = t3.xAxisModel || i3 && i3.getReferringComponents("xAxis", qa).models[0], o3 = t3.yAxisModel || i3 && i3.getReferringComponents("yAxis", qa).models[0], t3 = t3.gridModel, a3 = this._coordsList;
        return i3 ? L(a3, e3 = i3.coordinateSystem) < 0 && (e3 = null) : r3 && o3 ? e3 = this.getCartesian(r3.componentIndex, o3.componentIndex) : r3 ? n3 = this.getAxis("x", r3.componentIndex) : o3 ? n3 = this.getAxis("y", o3.componentIndex) : t3 && t3.coordinateSystem === this && (e3 = this._coordsList[0]), { cartesian: e3, axis: n3 };
      }, w2.prototype.containPoint = function(t3) {
        var e3 = this._coordsList[0];
        if (e3)
          return e3.containPoint(t3);
      }, w2.prototype._initCartesian = function(o3, t3, e3) {
        var a3 = this, s3 = this, l3 = { left: false, right: false, top: false, bottom: false }, u3 = { x: {}, y: {} }, h3 = { x: 0, y: 0 };
        function n3(r3) {
          return function(t4, e4) {
            var n4, i3;
            n4 = o3, t4.getCoordSysModel() === n4 && (n4 = t4.get("position"), "x" === r3 ? "top" !== n4 && "bottom" !== n4 && (n4 = l3.bottom ? "top" : "bottom") : "left" !== n4 && "right" !== n4 && (n4 = l3.left ? "right" : "left"), l3[n4] = true, i3 = Sx(t4), (i3 = new mS(r3, Mx(t4, i3), [0, 0], i3, n4)).onBand = Nx(i3.scale, t4), i3.inverse = t4.get("inverse"), (t4.axis = i3).model = t4, i3.grid = s3, i3.index = e4, s3._axesList.push(i3), u3[r3][e4] = i3, h3[r3]++);
          };
        }
        t3.eachComponent("xAxis", n3("x"), this), t3.eachComponent("yAxis", n3("y"), this), h3.x && h3.y ? (F((this._axesMap = u3).x, function(i3, r3) {
          F(u3.y, function(t4, e4) {
            var e4 = "x" + r3 + "y" + e4, n4 = new m2(e4);
            n4.master = a3, n4.model = o3, a3._coordsMap[e4] = n4, a3._coordsList.push(n4), n4.addAxis(i3), n4.addAxis(t4);
          });
        }), T2(u3.x), T2(u3.y)) : (this._axesMap = {}, this._axesList = []);
      }, w2.prototype.getTooltipAxes = function(n3) {
        var i3 = [], r3 = [];
        return F(this.getCartesians(), function(t3) {
          var e3 = null != n3 && "auto" !== n3 ? t3.getAxis(n3) : t3.getBaseAxis(), t3 = t3.getOtherAxis(e3);
          L(i3, e3) < 0 && i3.push(e3), L(r3, t3) < 0 && r3.push(t3);
        }), { baseAxes: i3, otherAxes: r3 };
      }, w2.create = function(i3, r3) {
        var o3 = [];
        return i3.eachComponent("grid", function(t3, e3) {
          var n3 = new w2(t3, i3, r3);
          n3.name = "grid_" + e3, n3.resize(t3, r3, true), t3.coordinateSystem = n3, o3.push(n3), F(n3._axesList, function(t4) {
            var e4;
            e4 = w2.dimIdxMap, sb(t4 = t4).dimIdxInCoord = e4.get(t4.dim);
          });
        }), i3.eachSeries(function(n3) {
          var i4, r4, t3, e3, o4, a3, s3, l3;
          e3 = (t3 = { targetModel: n3, coordSysType: rM, coordSysProvider: function() {
            var t4 = function(i5) {
              var r5 = { xAxisModel: null, yAxisModel: null };
              return F(r5, function(t5, e5) {
                var n4 = e5.replace(/Model$/, ""), n4 = i5.getReferringComponents(n4, qa).models[0];
                r5[e5] = n4;
              }), r5;
            }(n3), e4 = t4.xAxisModel, t4 = t4.yAxisModel;
            return i4 = e4.axis, r4 = t4.axis, e4.getCoordSysModel().coordinateSystem.getCartesian(e4.componentIndex, t4.componentIndex);
          } }).targetModel, o4 = t3.coordSysType, a3 = t3.coordSysProvider, s3 = t3.isDefaultDataCoordSys, t3.allowNotFound, l3 = (t3 = qf(e3)).kind, t3 = t3.coordSysType, s3 && l3 !== Xf && (l3 = Xf, t3 = o4), l3 !== Uf && t3 === o4 && (s3 = a3(o4, e3)) && (l3 === Xf ? e3.coordinateSystem = s3 : e3.boxCoordinateSystem = s3), i4 && r4 && (Qx(i4, n3, rM), Qx(r4, n3, rM));
        }, this), o3;
      }, w2.dimensions = f2, w2.dimIdxMap = i1(f2), w2);
      function w2(t3, e3, n3) {
        this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = true, this.dimensions = f2, this._initCartesian(t3, e3, n3), this.model = t3;
      }
      function S2(t3, e3, n3, i3) {
        n3.getAxesOnZeroOf = function() {
          return r3 ? [r3] : [];
        };
        var r3, o3 = t3[e3], t3 = n3.model, a3 = t3.get(["axisLine", "onZero"]), e3 = t3.get(["axisLine", "onZeroAxisIndex"]);
        if (a3) {
          if (null != e3)
            M2(a3, o3[e3]) && (r3 = o3[e3]);
          else
            for (var s3 in o3)
              if (Ht(o3, s3) && M2(a3, o3[s3]) && !i3[l3(o3[s3])]) {
                r3 = o3[s3];
                break;
              }
          r3 && (i3[l3(r3)] = true);
        }
        function l3(t4) {
          return t4.dim + "_" + t4.index;
        }
      }
      function M2(t3, e3) {
        var n3, i3, r3;
        if (e3)
          return n3 = e3.scale, n3 = n3, r3 = 0, n3 = (i3 = (i3 = false) ? G1(n3, null) : n3.getExtentUnsafe(P1, null))[0], i3 = i3[1], n3 = ns(n3, i3) ? n3 === r3 || i3 === r3 ? Ix : n3 < r3 && r3 < i3 ? Tx : Cx : Cx, (!(r3 = e3 && "category" !== e3.type && "time" !== e3.type && n3 !== Cx) || "auto" !== t3 || !bx(e3).noOnMyZero) && r3;
      }
      function T2(t3) {
        for (var e3, n3, i3 = O(t3), r3 = [], o3 = i3.length - 1; 0 <= o3; o3--) {
          var a3 = t3[+i3[o3]];
          X1(a3.scale) && (n3 = a3.model, a3.type, n3.get("breaks", true), a3.model.get("alignTicks") && null == a3.model.get("interval") ? r3.push(a3) : e3 = a3);
        }
        (e3 = e3 || r3.pop()) && F(r3, function(t4) {
          t4.__alignTo = e3;
        });
      }
      function I2(t3, e3) {
        F(t3.x, function(t4) {
          return C2(t4, e3.x, e3.width);
        }), F(t3.y, function(t4) {
          return C2(t4, e3.y, e3.height);
        });
      }
      function C2(t3, e3, n3) {
        var i3, r3, n3 = [0, n3], o3 = t3.inverse ? 1 : 0;
        t3.setExtent(n3[o3], n3[1 - o3]), i3 = e3, o3 = (n3 = t3).getExtent(), r3 = o3[0] + o3[1], n3.toGlobalCoord = "x" === n3.dim ? function(t4) {
          return t4 + i3;
        } : function(t4) {
          return r3 - t4 + i3;
        }, n3.toLocalCoord = "x" === n3.dim ? function(t4) {
          return t4 - i3;
        } : function(t4) {
          return r3 - t4 + i3;
        };
      }
      function k2(r3, t3, e3, n3, i3, l3, o3) {
        D2(n3, i3, Vb.estimate, t3, false, o3);
        var a3 = [0, 0, 0, 0], t3 = (s3(0), s3(1), u3(n3, 0, NaN), u3(n3, 1, NaN), null == gt(a3, function(t4) {
          return 0 < t4;
        }));
        return Qp(n3, a3, true, true, e3), I2(i3, n3), t3;
        function s3(s4) {
          F(i3[Bp[s4]], function(t4) {
            if (Px(t4.model)) {
              var e4 = l3.ensureRecord(t4.model), n4 = e4.labelInfoList;
              if (n4)
                for (var i4 = 0; i4 < n4.length; i4++) {
                  var r4 = n4[i4], o4 = t4.scale.normalize(Rx(t4.scale, CS(r4.label).labelInfo.tick));
                  u3(r4.rect, s4, o4 = 1 === s4 ? 1 - o4 : o4), u3(r4.rect, 1 - s4, NaN);
                }
              var a4 = e4.nameLayout;
              a4 && (o4 = Lx(e4.nameLocation) ? 0.5 : NaN, u3(a4.rect, s4, o4), u3(a4.rect, 1 - s4, NaN));
            }
          });
        }
        function u3(t4, e4, n4) {
          var i4 = r3[Bp[e4]] - t4[Bp[e4]], t4 = t4[Ep[e4]] + t4[Bp[e4]] - (r3[Ep[e4]] + r3[Bp[e4]]), i4 = h3(i4, 1 - n4), t4 = h3(t4, n4), n4 = x2[e4][0], e4 = x2[e4][1];
          a3[n4] = Jo(a3[n4], i4), a3[e4] = Jo(a3[e4], t4);
        }
        function h3(t4, e4) {
          return 0 < t4 && !Mt(e4) && 1e-4 < e4 && (t4 /= e4), t4;
        }
      }
      function D2(r3, t3, e3, n3, o3, i3) {
        var a3 = e3 === Vb.determine, s3 = (F(t3, function(t4) {
          return F(t4, function(t5) {
            var e4, n4, i4;
            Px(t5.model) && (e4 = t5.axisBuilder, n4 = r3, i4 = t5.model, n4 = ZS(r3, i4), e4.updateCfg(n4), t5.axisBuilder.build(a3 ? { axisTickLabelDetermine: true } : { axisTickLabelEstimate: true }, { noPxChange: o3 }));
          });
        }), { x: 0, y: 0 });
        function l3(t4) {
          s3[Bp[1 - t4]] = r3[Ep[t4]] <= 0.5 * i3.refContainer[Ep[t4]] ? 0 : 1 - t4 == 1 ? 2 : 1;
        }
        l3(0), l3(1), F(t3, function(t4, e4) {
          return F(t4, function(t5) {
            Px(t5.model) && ("all" !== n3 && !a3 || t5.axisBuilder.build({ axisName: true }, { nameMarginLevel: s3[e4] }), a3) && t5.axisBuilder.build({ axisLine: true });
          });
        });
      }
      var A2 = function(t3, e3, n3, i3, r3, o3) {
        n3 = "x" === n3.axis.dim ? "y" : "x";
        LS(t3, 0, 0, i3, r3, o3), Lx(t3.nameLocation) || F(e3.recordMap[n3], function(t4) {
          t4 && t4.labelInfoList && t4.dirVec && NS(t4.labelInfoList, t4.dirVec, i3, r3);
        });
      };
      function L2(t3) {
        var e3 = (t3.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
        return e3 && e3.axesInfo[t3.type + "||" + t3.id];
      }
      var P2, O2 = {}, ac = (u(R2, P2 = U0), R2.prototype.render = function(t3, e3, n3, i3) {
        var r3, o3, a3, s3, l3, u3;
        this.axisPointerClass && (r3 = L2(r3 = t3)) && (l3 = r3.axisPointerModel, o3 = r3.axis.scale, a3 = l3.option, u3 = l3.get("status"), null != (s3 = l3.get("value")) && (s3 = o3.parse(s3)), l3 = !!l3.get(["handle", "show"]), null == u3 && (a3.status = l3 ? "show" : "hide"), u3 = o3.getExtent(), (s3 = null == s3 || s3 > u3[1] ? u3[1] : s3) < u3[0] && (s3 = u3[0]), a3.value = s3, l3) && (a3.status = r3.axis.scale.isBlank() ? "hide" : "show"), P2.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(t3, n3, true);
      }, R2.prototype.updateAxisPointer = function(t3, e3, n3, i3) {
        this._doUpdateAxisPointerClass(t3, n3, false);
      }, R2.prototype.remove = function(t3, e3) {
        var n3 = this._axisPointer;
        n3 && n3.remove(e3);
      }, R2.prototype.dispose = function(t3, e3) {
        this._disposeAxisPointer(e3), P2.prototype.dispose.apply(this, arguments);
      }, R2.prototype._doUpdateAxisPointerClass = function(t3, e3, n3) {
        var i3, r3 = R2.getAxisPointerClass(this.axisPointerClass);
        r3 && ((i3 = (i3 = L2(i3 = t3)) && i3.axisPointerModel) ? (this._axisPointer || (this._axisPointer = new r3())).render(t3, i3, e3, n3) : this._disposeAxisPointer(e3));
      }, R2.prototype._disposeAxisPointer = function(t3) {
        this._axisPointer && this._axisPointer.dispose(t3), this._axisPointer = null;
      }, R2.registerAxisPointerClass = function(t3, e3) {
        O2[t3] = e3;
      }, R2.getAxisPointerClass = function(t3) {
        return t3 && O2[t3];
      }, R2.type = "axis", R2);
      function R2() {
        var t3 = null !== P2 && P2.apply(this, arguments) || this;
        return t3.type = R2.type, t3;
      }
      var N2 = i();
      var z2, B2 = ["splitArea", "splitLine", "minorSplitLine", "breakArea"], hc = (u(E2, z2 = ac), E2.prototype.render = function(e3, t3, n3, i3) {
        this.group.removeAll();
        var r3, o3, a3, s3, l3 = this._axisGroup;
        function u3(t4) {
          var e4 = { x: t4.x, y: t4.y, rotation: t4.rotation };
          return null != t4.shape && (e4.shape = _(t4.shape)), e4;
        }
        this._axisGroup = new Vo(), this.group.add(this._axisGroup), Px(e3) && (this._axisGroup.add(e3.axis.axisBuilder.group), F(B2, function(t4) {
          e3.get([t4, "show"]) && F2[t4](this, this._axisGroup, e3, e3.getCoordSysModel(), n3);
        }, this), i3 && "changeAxisOrder" === i3.type && i3.isInitSort || (l3 = l3, r3 = this._axisGroup, o3 = e3, l3 && r3 && (s3 = {}, l3.traverse(function(t4) {
          Kp(t4) && t4.anid && (s3[t4.anid] = t4);
        }), a3 = s3, r3.traverse(function(t4) {
          var e4, n4;
          Kp(t4) && t4.anid && (e4 = a3[t4.anid]) && (n4 = u3(t4), t4.attr(u3(e4)), Dp(t4, n4, o3, j(t4).dataIndex));
        }))), z2.prototype.render.call(this, e3, t3, n3, i3));
      }, E2.prototype.remove = function() {
        N2(this).splitAreaColors = null;
      }, E2.type = "cartesianAxis", E2);
      function E2() {
        var t3 = null !== z2 && z2.apply(this, arguments) || this;
        return t3.type = E2.type, t3.axisPointerClass = "CartesianAxisPointer", t3;
      }
      var V2, F2 = { splitLine: function(t3, e3, n3, i3, r3) {
        var o3 = n3.axis;
        if (!o3.scale.isBlank())
          for (var n3 = n3.getModel("splitLine"), a3 = n3.getModel("lineStyle"), s3 = a3.get("color"), l3 = false !== n3.get("showMinLine"), u3 = false !== n3.get("showMaxLine"), s3 = G(s3) ? s3 : [s3], h3 = i3.coordinateSystem.getRect(), c3 = o3.isHorizontal(), p3 = 0, d3 = o3.getTicksCoords({ tickModel: n3, breakTicks: "none", pruneByBreak: "preserve_extent_bound" }), f3 = [], g3 = [], y3 = a3.getLineStyle(), m3 = 0; m3 < d3.length; m3++) {
            var v3, _3 = o3.toGlobalCoord(d3[m3].coord);
            0 === m3 && !l3 || m3 === d3.length - 1 && !u3 || (v3 = d3[m3].tickValue, c3 ? (f3[0] = _3, f3[1] = h3.y, g3[0] = _3, g3[1] = h3.y + h3.height) : (f3[0] = h3.x, f3[1] = _3, g3[0] = h3.x + h3.width, g3[1] = _3), _3 = p3++ % s3.length, jp((v3 = new Xc({ anid: null != v3 ? "line_" + v3 : null, autoBatch: true, shape: { x1: f3[0], y1: f3[1], x2: g3[0], y2: g3[1] }, style: B({ stroke: s3[_3] }, y3), silent: true })).shape, y3.lineWidth), e3.add(v3));
          }
      }, minorSplitLine: function(t3, e3, n3, i3, r3) {
        var o3 = n3.axis, n3 = n3.getModel("minorSplitLine").getModel("lineStyle"), a3 = i3.coordinateSystem.getRect(), s3 = o3.isHorizontal(), l3 = o3.getMinorTicksCoords();
        if (l3.length)
          for (var u3 = [], h3 = [], c3 = n3.getLineStyle(), p3 = 0; p3 < l3.length; p3++)
            for (var d3 = 0; d3 < l3[p3].length; d3++) {
              var f3 = o3.toGlobalCoord(l3[p3][d3].coord), f3 = (s3 ? (u3[0] = f3, u3[1] = a3.y, h3[0] = f3, h3[1] = a3.y + a3.height) : (u3[0] = a3.x, u3[1] = f3, h3[0] = a3.x + a3.width, h3[1] = f3), new Xc({ anid: "minor_line_" + l3[p3][d3].tickValue, autoBatch: true, shape: { x1: u3[0], y1: u3[1], x2: h3[0], y2: h3[1] }, style: c3, silent: true }));
              jp(f3.shape, c3.lineWidth), e3.add(f3);
            }
      }, splitArea: function(t3, e3, n3, i3, r3) {
        var o3 = e3, e3 = i3, a3 = (i3 = n3).axis;
        if (!a3.scale.isBlank()) {
          var i3 = i3.getModel("splitArea"), n3 = i3.getModel("areaStyle"), s3 = n3.get("color"), l3 = e3.coordinateSystem.getRect(), u3 = a3.getTicksCoords({ tickModel: i3, breakTicks: "none", pruneByBreak: "preserve_extent_bound" });
          if (u3.length) {
            var h3 = s3.length, c3 = N2(t3).splitAreaColors, p3 = I(), d3 = 0;
            if (c3)
              for (var f3 = 0; f3 < u3.length; f3++) {
                var g3 = c3.get(u3[f3].tickValue);
                if (null != g3) {
                  d3 = (g3 + (h3 - 1) * f3) % h3;
                  break;
                }
              }
            for (var y3 = a3.toGlobalCoord(u3[0].coord), m3 = n3.getAreaStyle(), s3 = G(s3) ? s3 : [s3], f3 = 1; f3 < u3.length; f3++) {
              var v3 = a3.toGlobalCoord(u3[f3].coord), _3 = void 0, x3 = void 0, b3 = void 0, w3 = void 0, y3 = a3.isHorizontal() ? (_3 = y3, x3 = l3.y, w3 = l3.height, _3 + (b3 = v3 - _3)) : (_3 = l3.x, x3 = y3, b3 = l3.width, x3 + (w3 = v3 - x3)), v3 = u3[f3 - 1].tickValue;
              null != v3 && p3.set(v3, d3), o3.add(new uu({ anid: null != v3 ? "area_" + v3 : null, shape: { x: _3, y: x3, width: b3, height: w3 }, style: B({ fill: s3[d3] }, m3), autoBatch: true, silent: true })), d3 = (d3 + 1) % h3;
            }
            N2(t3).splitAreaColors = p3;
          }
        }
      }, breakArea: function(t3, e3, n3, i3, r3) {
        n3.axis.scale;
      } }, G2 = (u(H2, V2 = hc), H2.type = "xAxis", H2);
      function H2() {
        var t3 = null !== V2 && V2.apply(this, arguments) || this;
        return t3.type = H2.type, t3;
      }
      u(X2, W2 = hc), X2.type = "yAxis";
      var W2, U2 = X2;
      function X2() {
        var t3 = null !== W2 && W2.apply(this, arguments) || this;
        return t3.type = G2.type, t3;
      }
      u(Z2, Y2 = U0), Z2.prototype.render = function(t3, e3) {
        this.group.removeAll(), t3.get("show") && this.group.add(new uu({ shape: t3.coordinateSystem.getRect(), style: B({ fill: t3.get("backgroundColor") }, t3.getItemStyle()), silent: true, z2: -1 }));
      }, Z2.type = "grid";
      var Y2, q2 = Z2;
      function Z2() {
        var t3 = null !== Y2 && Y2.apply(this, arguments) || this;
        return t3.type = "grid", t3;
      }
      var j2 = { offset: 0 };
      _b(function(t3) {
        t3.registerComponentView(q2), t3.registerComponentModel(oM), t3.registerCoordinateSystem("cartesian2d", b2), c2(t3, "x", l2, j2), c2(t3, "y", l2, j2), t3.registerComponentView(G2), t3.registerComponentView(U2), t3.registerPreprocessor(function(t4) {
          t4.xAxis && t4.yAxis && !t4.grid && (t4.grid = {});
        });
      });
      u(Q2, K2 = cg), Q2.type = "title", Q2.defaultOption = { z: 6, show: true, text: "", target: "blank", subtext: "", subtarget: "blank", left: "center", top: v.size.m, backgroundColor: v.color.transparent, borderColor: v.color.primary, borderWidth: 0, padding: 5, itemGap: 10, textStyle: { fontSize: 18, fontWeight: "bold", color: v.color.primary }, subtextStyle: { fontSize: 12, color: v.color.quaternary } };
      var K2, $2 = Q2;
      function Q2() {
        var t3 = null !== K2 && K2.apply(this, arguments) || this;
        return t3.type = Q2.type, t3.layoutMode = { type: "box", ignoreSize: true }, t3;
      }
      u(ek, J2 = U0), ek.prototype.render = function(t3, e3, n3) {
        var i3, r3, o3, a3, s3, l3, u3, h3, c3;
        this.group.removeAll(), t3.get("show") && (i3 = this.group, u3 = t3.getModel("textStyle"), r3 = t3.getModel("subtextStyle"), h3 = t3.get("textAlign"), c3 = Y(t3.get("textBaseline"), t3.get("textVerticalAlign")), s3 = (u3 = new gu({ style: fd(u3, { text: t3.get("text"), fill: u3.getTextColor() }, { disableBox: true }), z2: 10 })).getBoundingRect(), l3 = t3.get("subtext"), r3 = new gu({ style: fd(r3, { text: l3, fill: r3.getTextColor(), y: s3.height + t3.get("itemGap"), verticalAlign: "top" }, { disableBox: true }), z2: 10 }), o3 = t3.get("link"), a3 = t3.get("sublink"), s3 = t3.get("triggerEvent", true), u3.silent = !o3 && !s3, r3.silent = !a3 && !s3, o3 && u3.on("click", function() {
          Nf(o3, "_" + t3.get("target"));
        }), a3 && r3.on("click", function() {
          Nf(a3, "_" + t3.get("subtarget"));
        }), j(u3).eventData = j(r3).eventData = s3 ? { componentType: "title", componentIndex: t3.componentIndex } : null, i3.add(u3), l3 && i3.add(r3), s3 = i3.getBoundingRect(), (l3 = t3.getBoxLayoutParams()).width = s3.width, l3.height = s3.height, l3 = tg(l3, ng(t3, n3).refContainer, t3.get("padding")), h3 || ("right" === (h3 = "middle" === (h3 = t3.get("left") || t3.get("right")) ? "center" : h3) ? l3.x += l3.width : "center" === h3 && (l3.x += l3.width / 2)), c3 || ("bottom" === (c3 = "center" === (c3 = t3.get("top") || t3.get("bottom")) ? "middle" : c3) ? l3.y += l3.height : "middle" === c3 && (l3.y += l3.height / 2), c3 = c3 || "top"), i3.x = l3.x, i3.y = l3.y, i3.markRedraw(), u3.setStyle(n3 = { align: h3, verticalAlign: c3 }), r3.setStyle(n3), s3 = i3.getBoundingRect(), u3 = l3.margin, (h3 = t3.getItemStyle(["color", "opacity"])).fill = t3.get("backgroundColor"), c3 = new uu({ shape: { x: s3.x - u3[3], y: s3.y - u3[0], width: s3.width + u3[1] + u3[3], height: s3.height + u3[0] + u3[2], r: t3.get("borderRadius") }, style: h3, subPixelOptimize: true, silent: true }), i3.add(c3));
      }, ek.type = "title";
      var J2, tk = ek;
      function ek() {
        var t3 = null !== J2 && J2.apply(this, arguments) || this;
        return t3.type = ek.type, t3;
      }
      _b(function(t3) {
        t3.registerComponentModel($2), t3.registerComponentView(tk);
      });
      u(rk, nk = cg), rk.prototype.init = function(t3, e3, n3) {
        this.mergeDefaultAndTheme(t3, n3), t3.selected = t3.selected || {}, this._updateSelector(t3);
      }, rk.prototype.mergeOption = function(t3, e3) {
        nk.prototype.mergeOption.call(this, t3, e3), this._updateSelector(t3);
      }, rk.prototype._updateSelector = function(t3) {
        var n3 = t3.selector, i3 = this.ecModel;
        G(n3 = true === n3 ? t3.selector = ["all", "inverse"] : n3) && F(n3, function(t4, e3) {
          W(t4) && (t4 = { type: t4 }), n3[e3] = d(t4, (e3 = i3, "all" === (t4 = t4.type) ? { type: "all", title: e3.getLocaleModel().get(["legend", "selector", "all"]) } : "inverse" === t4 ? { type: "inverse", title: e3.getLocaleModel().get(["legend", "selector", "inverse"]) } : void 0));
        });
      }, rk.prototype.optionUpdated = function() {
        this._updateData(this.ecModel);
        var t3 = this._data;
        if (t3[0] && "single" === this.get("selectedMode")) {
          for (var e3 = false, n3 = 0; n3 < t3.length; n3++) {
            var i3 = t3[n3].get("name");
            if (this.isSelected(i3)) {
              this.select(i3), e3 = true;
              break;
            }
          }
          e3 || this.select(t3[0].get("name"));
        }
      }, rk.prototype._updateData = function(i3) {
        var r3 = [], o3 = [], t3 = (i3.eachRawSeries(function(t4) {
          var e4, n3 = t4.name;
          o3.push(n3), t4.legendVisualProvider && (n3 = t4.legendVisualProvider.getAllNames(), i3.isSeriesFiltered(t4) || (o3 = o3.concat(n3)), n3.length) ? r3 = r3.concat(n3) : e4 = true, e4 && Fa(t4) && r3.push(t4.name);
        }), this._availableNames = o3, this.get("data") || r3), e3 = I(), t3 = E(t3, function(t4) {
          return (W(t4) || U(t4)) && (t4 = { name: t4 }), e3.get(t4.name) ? null : (e3.set(t4.name, true), new Bd(t4, this, this.ecModel));
        }, this);
        this._data = ft(t3, function(t4) {
          return !!t4;
        });
      }, rk.prototype.getData = function() {
        return this._data;
      }, rk.prototype.select = function(t3) {
        var e3 = this.option.selected;
        "single" === this.get("selectedMode") && F(this._data, function(t4) {
          e3[t4.get("name")] = false;
        }), e3[t3] = true;
      }, rk.prototype.unSelect = function(t3) {
        "single" !== this.get("selectedMode") && (this.option.selected[t3] = false);
      }, rk.prototype.toggleSelected = function(t3) {
        var e3 = this.option.selected;
        e3.hasOwnProperty(t3) || (e3[t3] = true), this[e3[t3] ? "unSelect" : "select"](t3);
      }, rk.prototype.allSelect = function() {
        var t3 = this._data, e3 = this.option.selected;
        F(t3, function(t4) {
          e3[t4.get("name", true)] = true;
        });
      }, rk.prototype.inverseSelect = function() {
        var t3 = this._data, e3 = this.option.selected;
        F(t3, function(t4) {
          t4 = t4.get("name", true);
          e3.hasOwnProperty(t4) || (e3[t4] = true), e3[t4] = !e3[t4];
        });
      }, rk.prototype.isSelected = function(t3) {
        var e3 = this.option.selected;
        return !(e3.hasOwnProperty(t3) && !e3[t3]) && 0 <= L(this._availableNames, t3);
      }, rk.prototype.getOrient = function() {
        return "vertical" === this.get("orient") ? { index: 1, name: "vertical" } : { index: 0, name: "horizontal" };
      }, rk.type = "legend.plain", rk.dependencies = ["series"], rk.defaultOption = { z: 4, show: true, orient: "horizontal", left: "center", bottom: v.size.m, align: "auto", backgroundColor: v.color.transparent, borderColor: v.color.border, borderRadius: 0, borderWidth: 0, padding: 5, itemGap: 8, itemWidth: 25, itemHeight: 14, symbolRotate: "inherit", symbolKeepAspect: true, inactiveColor: v.color.disabled, inactiveBorderColor: v.color.disabled, inactiveBorderWidth: "auto", itemStyle: { color: "inherit", opacity: "inherit", borderColor: "inherit", borderWidth: "auto", borderCap: "inherit", borderJoin: "inherit", borderDashOffset: "inherit", borderMiterLimit: "inherit" }, lineStyle: { width: "auto", color: "inherit", inactiveColor: v.color.disabled, inactiveWidth: 2, opacity: "inherit", type: "inherit", cap: "inherit", join: "inherit", dashOffset: "inherit", miterLimit: "inherit" }, textStyle: { color: v.color.secondary }, selectedMode: true, selector: false, selectorLabel: { show: true, borderRadius: 10, padding: [3, 5, 3, 5], fontSize: 12, fontFamily: "sans-serif", color: v.color.tertiary, borderWidth: 1, borderColor: v.color.border }, emphasis: { selectorLabel: { show: true, color: v.color.quaternary } }, selectorPosition: "auto", selectorItemGap: 7, selectorButtonGap: 10, tooltip: { show: false }, triggerEvent: false };
      var nk, ik = rk;
      function rk() {
        var t3 = null !== nk && nk.apply(this, arguments) || this;
        return t3.type = rk.type, t3.layoutMode = { type: "box", ignoreSize: true }, t3;
      }
      var ok, ak = yt, sk = F, lk = Vo, uk = (u(hk, ok = U0), hk.prototype.init = function() {
        this.group.add(this._contentGroup = new lk()), this.group.add(this._selectorGroup = new lk()), this._isFirstRender = true;
      }, hk.prototype.getContentGroup = function() {
        return this._contentGroup;
      }, hk.prototype.getSelectorGroup = function() {
        return this._selectorGroup;
      }, hk.prototype.render = function(t3, e3, n3) {
        var i3, r3, o3, a3, s3, l3 = this._isFirstRender;
        this._isFirstRender = false, this.resetInner(), t3.get("show", true) && (i3 = t3.get("align"), s3 = t3.get("orient"), i3 && "auto" !== i3 || (i3 = "right" === t3.get("left") && "vertical" === s3 ? "right" : "left"), o3 = t3.get("selector", true), a3 = t3.get("selectorPosition", true), this.renderInner(i3, t3, e3, n3, o3, s3, a3 = !o3 || a3 && "auto" !== a3 ? a3 : "horizontal" === s3 ? "end" : "start"), e3 = ng(t3, n3).refContainer, r3 = tg(s3 = t3.getBoxLayoutParams(), e3, n3 = t3.get("padding")), r3 = tg(B({ width: (i3 = this.layoutInner(t3, i3, r3, l3, o3, a3)).width, height: i3.height }, s3), e3, n3), this.group.x = r3.x - i3.x, this.group.y = r3.y - i3.y, this.group.markRedraw(), this.group.add(this._backgroundEl = (l3 = i3, a3 = Lf((o3 = t3).get("padding")), (s3 = o3.getItemStyle(["color", "opacity"])).fill = o3.get("backgroundColor"), new uu({ shape: { x: l3.x - a3[3], y: l3.y - a3[0], width: l3.width + a3[1] + a3[3], height: l3.height + a3[0] + a3[2], r: o3.get("borderRadius") }, style: s3, silent: true, z2: -1 }))));
      }, hk.prototype.resetInner = function() {
        this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll();
      }, hk.prototype.renderInner = function(l3, u3, h3, c3, t3, e3, n3) {
        var p3 = this.getContentGroup(), d3 = I(), f3 = u3.get("selectedMode"), g3 = u3.get("triggerEvent"), y3 = [];
        h3.eachRawSeries(function(t4) {
          t4.get("legendHoverLink") || y3.push(t4.id);
        }), sk(u3.getData(), function(o3, a3) {
          var e4, t4, n4, i3, r3 = this, s3 = o3.get("name");
          this.newlineDisabled || "" !== s3 && "\n" !== s3 ? (e4 = h3.getSeriesByName(s3)[0], d3.get(s3) || (e4 ? (i3 = (n4 = e4.getData()).getVisual("legendLineStyle") || {}, t4 = n4.getVisual("legendIcon"), n4 = n4.getVisual("style"), (i3 = this._createItem(e4, s3, a3, o3, u3, l3, i3, n4, t4, f3, c3)).on("click", ak(ck, s3, null, c3, y3)).on("mouseover", ak(pk, e4.name, null, c3, y3)).on("mouseout", ak(dk, e4.name, null, c3, y3)), h3.ssr && i3.eachChild(function(t5) {
            t5 = j(t5);
            t5.seriesIndex = e4.seriesIndex, t5.dataIndex = a3, t5.ssrType = "legend";
          }), g3 && i3.eachChild(function(t5) {
            r3.packEventData(t5, u3, e4, a3, s3);
          }), d3.set(s3, true)) : h3.eachRawSeries(function(e5) {
            var t5, n5, i4, r4 = this;
            d3.get(s3) || e5.legendVisualProvider && (n5 = e5.legendVisualProvider).containName(s3) && (i4 = n5.indexOfName(s3), t5 = n5.getItemVisual(i4, "style"), n5 = n5.getItemVisual(i4, "legendIcon"), (i4 = Vi(t5.fill)) && 0 === i4[3] && (i4[3] = 0.2, t5 = V(V({}, t5), { fill: qi(i4, "rgba") })), (i4 = this._createItem(e5, s3, a3, o3, u3, l3, {}, t5, n5, f3, c3)).on("click", ak(ck, null, s3, c3, y3)).on("mouseover", ak(pk, null, s3, c3, y3)).on("mouseout", ak(dk, null, s3, c3, y3)), h3.ssr && i4.eachChild(function(t6) {
              t6 = j(t6);
              t6.seriesIndex = e5.seriesIndex, t6.dataIndex = a3, t6.ssrType = "legend";
            }), g3 && i4.eachChild(function(t6) {
              r4.packEventData(t6, u3, e5, a3, s3);
            }), d3.set(s3, true));
          }, this))) : ((n4 = new lk()).newline = true, p3.add(n4));
        }, this), t3 && this._createSelector(t3, u3, c3, e3, n3);
      }, hk.prototype.packEventData = function(t3, e3, n3, i3, r3) {
        e3 = { componentType: "legend", componentIndex: e3.componentIndex, dataIndex: i3, value: r3, seriesIndex: n3.seriesIndex };
        j(t3).eventData = e3;
      }, hk.prototype._createSelector = function(t3, i3, r3, e3, n3) {
        var o3 = this.getSelectorGroup();
        sk(t3, function(t4) {
          var e4 = t4.type, n4 = new gu({ style: { x: 0, y: 0, align: "center", verticalAlign: "middle" }, onclick: function() {
            r3.dispatchAction({ type: "all" === e4 ? "legendAllSelect" : "legendInverseSelect", legendId: i3.id });
          } });
          o3.add(n4), pd(n4, { normal: i3.getModel("selectorLabel"), emphasis: i3.getModel(["emphasis", "selectorLabel"]) }, { defaultText: t4.title }), Dh(n4);
        });
      }, hk.prototype._createItem = function(t3, e3, n3, i3, r3, o3, a3, s3, l3, u3, h3) {
        var c3 = t3.visualDrawType, p3 = r3.get("itemWidth"), d3 = r3.get("itemHeight"), f3 = r3.isSelected(e3), g3 = i3.get("symbolRotate"), y3 = i3.get("symbolKeepAspect"), m3 = i3.get("icon"), a3 = function(t4, e4, n4, i4, r4, o4, a4) {
          function s4(n5, i5) {
            "auto" === n5.lineWidth && (n5.lineWidth = 0 < i5.lineWidth ? 2 : 0), sk(n5, function(t5, e5) {
              "inherit" === n5[e5] && (n5[e5] = i5[e5]);
            });
          }
          var l4 = e4.getModel("itemStyle"), u4 = l4.getItemStyle(), t4 = 0 === t4.lastIndexOf("empty", 0) ? "fill" : "stroke", l4 = l4.getShallow("decal");
          u4.decal = l4 && "inherit" !== l4 ? Tv(l4, a4) : i4.decal, "inherit" === u4.fill && (u4.fill = i4[r4]);
          "inherit" === u4.stroke && (u4.stroke = i4[t4]);
          "inherit" === u4.opacity && (u4.opacity = ("fill" === r4 ? i4 : n4).opacity);
          s4(u4, i4);
          l4 = e4.getModel("lineStyle"), a4 = l4.getLineStyle();
          s4(a4, n4), "auto" === u4.fill && (u4.fill = i4.fill), "auto" === u4.stroke && (u4.stroke = i4.fill), "auto" === a4.stroke && (a4.stroke = i4.fill), o4 || (r4 = e4.get("inactiveBorderWidth"), n4 = u4[t4], u4.lineWidth = "auto" === r4 ? 0 < i4.lineWidth && n4 ? 2 : 0 : u4.lineWidth, u4.fill = e4.get("inactiveColor"), u4.stroke = e4.get("inactiveBorderColor"), a4.stroke = l4.get("inactiveColor"), a4.lineWidth = l4.get("inactiveWidth"));
          return { itemStyle: u4, lineStyle: a4 };
        }(l3 = m3 || l3 || "roundRect", i3, a3, s3, c3, f3, h3), s3 = new lk(), c3 = i3.getModel("textStyle"), m3 = (!H(t3.getLegendIcon) || m3 && "inherit" !== m3 ? (h3 = "inherit" === m3 && t3.getData().getVisual("symbol") ? "inherit" === g3 ? t3.getData().getVisual("symbolRotate") : g3 : 0, s3.add(function(t4) {
          var e4 = t4.icon || "roundRect", n4 = jm(e4, 0, 0, t4.itemWidth, t4.itemHeight, t4.itemStyle.fill, t4.symbolKeepAspect);
          n4.setStyle(t4.itemStyle), n4.rotation = (t4.iconRotate || 0) * Math.PI / 180, n4.setOrigin([t4.itemWidth / 2, t4.itemHeight / 2]), -1 < e4.indexOf("empty") && (n4.style.stroke = n4.style.fill, n4.style.fill = v.color.neutral00, n4.style.lineWidth = 2);
          return n4;
        }({ itemWidth: p3, itemHeight: d3, icon: l3, iconRotate: h3, itemStyle: a3.itemStyle, lineStyle: a3.lineStyle, symbolKeepAspect: y3 }))) : s3.add(t3.getLegendIcon({ itemWidth: p3, itemHeight: d3, icon: l3, iconRotate: g3, itemStyle: a3.itemStyle, lineStyle: a3.lineStyle, symbolKeepAspect: y3 })), "left" === o3 ? p3 + 5 : -5), h3 = o3, t3 = r3.get("formatter"), l3 = e3, g3 = (W(t3) && t3 ? l3 = t3.replace("{name}", null != e3 ? e3 : "") : H(t3) && (l3 = t3(e3)), f3 ? c3.getTextColor() : i3.get("inactiveColor")), a3 = (s3.add(new gu({ style: fd(c3, { text: l3, x: m3, y: d3 / 2, fill: g3, align: h3, verticalAlign: "middle" }, { inheritColor: g3 }) })), new uu({ shape: s3.getBoundingRect(), style: { fill: "transparent" } })), y3 = i3.getModel("tooltip");
        return y3.get("show") && ed({ el: a3, componentModel: r3, itemName: e3, itemTooltipOption: y3.option }), s3.add(a3), s3.eachChild(function(t4) {
          t4.silent = true;
        }), a3.silent = !u3, this.getContentGroup().add(s3), Dh(s3), s3.__legendDataIndex = n3, s3;
      }, hk.prototype.layoutInner = function(t3, e3, n3, i3, r3, o3) {
        var a3, s3, l3, u3, h3, c3 = this.getContentGroup(), p3 = this.getSelectorGroup(), n3 = (Qf(t3.get("orient"), c3, t3.get("itemGap"), n3.width, n3.height), c3.getBoundingRect()), d3 = [-n3.x, -n3.y];
        return p3.markRedraw(), c3.markRedraw(), r3 ? (Qf("horizontal", p3, t3.get("selectorItemGap", true)), a3 = [-(r3 = p3.getBoundingRect()).x, -r3.y], s3 = t3.get("selectorButtonGap", true), l3 = 0 === (t3 = t3.getOrient().index) ? "width" : "height", u3 = 0 === t3 ? "height" : "width", h3 = 0 === t3 ? "y" : "x", "end" === o3 ? a3[t3] += n3[l3] + s3 : d3[t3] += r3[l3] + s3, a3[1 - t3] += n3[u3] / 2 - r3[u3] / 2, p3.x = a3[0], p3.y = a3[1], c3.x = d3[0], c3.y = d3[1], (o3 = { x: 0, y: 0 })[l3] = n3[l3] + s3 + r3[l3], o3[u3] = Math.max(n3[u3], r3[u3]), o3[h3] = Math.min(0, r3[h3] + a3[1 - t3]), o3) : (c3.x = d3[0], c3.y = d3[1], this.group.getBoundingRect());
      }, hk.prototype.remove = function() {
        this.getContentGroup().removeAll(), this._isFirstRender = true;
      }, hk.type = "legend.plain", hk);
      function hk() {
        var t3 = null !== ok && ok.apply(this, arguments) || this;
        return t3.type = hk.type, t3.newlineDisabled = false, t3;
      }
      function ck(t3, e3, n3, i3) {
        dk(t3, e3, n3, i3), n3.dispatchAction({ type: "legendToggleSelect", name: null != t3 ? t3 : e3 }), pk(t3, e3, n3, i3);
      }
      function pk(t3, e3, n3, i3) {
        n3.usingTHL() || n3.dispatchAction({ type: "highlight", seriesName: t3, name: e3, excludeSeriesId: i3 });
      }
      function dk(t3, e3, n3, i3) {
        n3.usingTHL() || n3.dispatchAction({ type: "downplay", seriesName: t3, name: e3, excludeSeriesId: i3 });
      }
      function fk(e3, n3, t3) {
        var i3 = "allSelect" === e3 || "inverseSelect" === e3, r3 = {}, o3 = [], a3 = (t3.eachComponent({ mainType: "legend", query: n3 }, function(t4) {
          i3 ? t4[e3]() : t4[e3](n3.name), gk(t4, r3), o3.push(t4.componentIndex);
        }), {});
        return t3.eachComponent("legend", function(n4) {
          F(r3, function(t4, e4) {
            n4[t4 ? "select" : "unSelect"](e4);
          }), gk(n4, a3);
        }), i3 ? { selected: a3, legendIndex: o3 } : { name: n3.name, selected: a3 };
      }
      function gk(n3, t3) {
        var i3 = t3 || {};
        F(n3.getData(), function(t4) {
          var e3, t4 = t4.get("name");
          "\n" !== t4 && "" !== t4 && (e3 = n3.isSelected(t4), Ht(i3, t4) ? i3[t4] = i3[t4] && e3 : i3[t4] = e3);
        });
      }
      var yk = us(function(t3) {
        var n3 = t3.findComponents({ mainType: "legend" });
        n3 && n3.length && t3.filterSeries(function(t4) {
          for (var e3 = 0; e3 < n3.length; e3++)
            if (!n3[e3].isSelected(t4.name))
              return false;
          return true;
        });
      });
      function mk(t3) {
        t3.registerComponentModel(ik), t3.registerComponentView(uk), t3.registerProcessor(t3.PRIORITY.PROCESSOR.SERIES_FILTER, yk), t3.registerSubTypeDefaulter("legend", function() {
          return "plain";
        }), (t3 = t3).registerAction("legendToggleSelect", "legendselectchanged", yt(fk, "toggleSelected")), t3.registerAction("legendAllSelect", "legendselectall", yt(fk, "allSelect")), t3.registerAction("legendInverseSelect", "legendinverseselect", yt(fk, "inverseSelect")), t3.registerAction("legendSelect", "legendselected", yt(fk, "select")), t3.registerAction("legendUnSelect", "legendunselected", yt(fk, "unSelect"));
      }
      u(xk, vk = ik), xk.prototype.setScrollDataIndex = function(t3) {
        this.option.scrollDataIndex = t3;
      }, xk.prototype.init = function(t3, e3, n3) {
        var i3 = og(t3);
        vk.prototype.init.call(this, t3, e3, n3), bk(this, t3, i3);
      }, xk.prototype.mergeOption = function(t3, e3) {
        vk.prototype.mergeOption.call(this, t3, e3), bk(this, this.option, t3);
      }, xk.type = "legend.scroll", xk.defaultOption = Gd(ik.defaultOption, { scrollDataIndex: 0, pageButtonItemGap: 5, pageButtonGap: null, pageButtonPosition: "end", pageFormatter: "{current}/{total}", pageIcons: { horizontal: ["M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z"], vertical: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"] }, pageIconColor: v.color.accent50, pageIconInactiveColor: v.color.accent10, pageIconSize: 15, pageTextStyle: { color: v.color.tertiary }, animationDurationUpdate: 800 });
      var vk, _k = xk;
      function xk() {
        var t3 = null !== vk && vk.apply(this, arguments) || this;
        return t3.type = xk.type, t3;
      }
      function bk(t3, e3, n3) {
        var i3 = [1, 1];
        i3[t3.getOrient().index] = 0, rg(e3, n3, { type: "box", ignoreSize: !!i3 });
      }
      var wk, Sk = Vo, Mk = ["width", "height"], Tk = ["x", "y"], Ik = (u(Ck, wk = uk), Ck.prototype.init = function() {
        wk.prototype.init.call(this), this.group.add(this._containerGroup = new Sk()), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new Sk());
      }, Ck.prototype.resetInner = function() {
        wk.prototype.resetInner.call(this), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null;
      }, Ck.prototype.renderInner = function(t3, i3, e3, r3, n3, o3, a3) {
        var s3 = this, l3 = (wk.prototype.renderInner.call(this, t3, i3, e3, r3, n3, o3, a3), this._controllerGroup), t3 = i3.get("pageIconSize", true), u3 = G(t3) ? t3 : [t3, t3], e3 = (h3("pagePrev", 0), i3.getModel("pageTextStyle"));
        function h3(t4, e4) {
          var n4 = t4 + "DataIndex", e4 = $p(i3.get("pageIcons", true)[i3.getOrient().name][e4], { onclick: y(s3._pageGo, s3, n4, i3, r3) }, { x: -u3[0] / 2, y: -u3[1] / 2, width: u3[0], height: u3[1] });
          e4.name = t4, l3.add(e4);
        }
        l3.add(new gu({ name: "pageText", style: { text: "xx/xx", fill: e3.getTextColor(), font: e3.getFont(), verticalAlign: "middle", align: "center" }, silent: true })), h3("pageNext", 1);
      }, Ck.prototype.layoutInner = function(t3, e3, n3, i3, r3, o3) {
        var a3 = this.getSelectorGroup(), s3 = t3.getOrient().index, l3 = Mk[s3], u3 = Tk[s3], h3 = Mk[1 - s3], c3 = Tk[1 - s3], p3 = (r3 && Qf("horizontal", a3, t3.get("selectorItemGap", true)), t3.get("selectorButtonGap", true)), d3 = a3.getBoundingRect(), f3 = [-d3.x, -d3.y], g3 = _(n3), n3 = (r3 && (g3[l3] = n3[l3] - d3[l3] - p3), this._layoutContentAndController(t3, i3, g3, s3, l3, h3, c3, u3));
        return r3 && ("end" === o3 ? f3[s3] += n3[l3] + p3 : (t3 = d3[l3] + p3, f3[s3] -= t3, n3[u3] -= t3), n3[l3] += d3[l3] + p3, f3[1 - s3] += n3[c3] + n3[h3] / 2 - d3[h3] / 2, n3[h3] = Math.max(n3[h3], d3[h3]), n3[c3] = Math.min(n3[c3], d3[c3] + f3[1 - s3]), a3.x = f3[0], a3.y = f3[1], a3.markRedraw()), n3;
      }, Ck.prototype._layoutContentAndController = function(t3, e3, n3, i3, r3, o3, a3, s3) {
        var l3 = this.getContentGroup(), u3 = this._containerGroup, h3 = this._controllerGroup, c3 = (Qf(t3.get("orient"), l3, t3.get("itemGap"), i3 ? n3.width : null, i3 ? null : n3.height), Qf("horizontal", h3, t3.get("pageButtonItemGap", true)), l3.getBoundingRect()), p3 = h3.getBoundingRect(), d3 = this._showController = c3[r3] > n3[r3], f3 = [-c3.x, -c3.y], e3 = (e3 || (f3[i3] = l3[s3]), [0, 0]), s3 = [-p3.x, -p3.y], g3 = Y(t3.get("pageButtonGap", true), t3.get("itemGap", true)), f3 = (d3 && ("end" === t3.get("pageButtonPosition", true) ? s3[i3] += n3[r3] - p3[r3] : e3[i3] += p3[r3] + g3), s3[1 - i3] += c3[o3] / 2 - p3[o3] / 2, l3.setPosition(f3), u3.setPosition(e3), h3.setPosition(s3), { x: 0, y: 0 }), c3 = (f3[r3] = (d3 ? n3 : c3)[r3], f3[o3] = Math.max(c3[o3], p3[o3]), f3[a3] = Math.min(0, p3[a3] + s3[1 - i3]), u3.__rectSize = n3[r3], d3 ? ((e3 = { x: 0, y: 0 })[r3] = Math.max(n3[r3] - p3[r3] - g3, 0), e3[o3] = f3[o3], u3.setClipPath(new uu({ shape: e3 })), u3.__rectSize = e3[r3]) : h3.eachChild(function(t4) {
          t4.attr({ invisible: true, silent: true });
        }), this._getPageInfo(t3));
        return null != c3.pageIndex && Dp(l3, { x: c3.contentPosition[0], y: c3.contentPosition[1] }, d3 ? t3 : null), this._updatePageInfoView(t3, c3), f3;
      }, Ck.prototype._pageGo = function(t3, e3, n3) {
        t3 = this._getPageInfo(e3)[t3];
        null != t3 && n3.dispatchAction({ type: "legendScroll", scrollDataIndex: t3, legendId: e3.id });
      }, Ck.prototype._updatePageInfoView = function(n3, i3) {
        var r3 = this._controllerGroup, t3 = (F(["pagePrev", "pageNext"], function(t4) {
          var e4 = null != i3[t4 + "DataIndex"], t4 = r3.childOfName(t4);
          t4 && (t4.setStyle("fill", e4 ? n3.get("pageIconColor", true) : n3.get("pageIconInactiveColor", true)), t4.cursor = e4 ? "pointer" : "default");
        }), r3.childOfName("pageText")), e3 = n3.get("pageFormatter"), o3 = i3.pageIndex, o3 = null != o3 ? o3 + 1 : 0, a3 = i3.pageCount;
        t3 && e3 && t3.setStyle("text", W(e3) ? e3.replace("{current}", null == o3 ? "" : o3 + "").replace("{total}", null == a3 ? "" : a3 + "") : e3({ current: o3, total: a3 }));
      }, Ck.prototype._getPageInfo = function(t3) {
        var e3 = t3.get("scrollDataIndex", true), n3 = this.getContentGroup(), i3 = this._containerGroup.__rectSize, t3 = t3.getOrient().index, r3 = Mk[t3], o3 = Tk[t3], e3 = this._findTargetItemIndex(e3), a3 = n3.children(), s3 = a3[e3], l3 = a3.length, u3 = l3 ? 1 : 0, h3 = { contentPosition: [n3.x, n3.y], pageCount: u3, pageIndex: u3 - 1, pagePrevDataIndex: null, pageNextDataIndex: null };
        if (s3) {
          n3 = g3(s3);
          h3.contentPosition[t3] = -n3.s;
          for (var c3 = e3 + 1, p3 = n3, d3 = n3, f3 = null; c3 <= l3; ++c3)
            (!(f3 = g3(a3[c3])) && d3.e > p3.s + i3 || f3 && !y3(f3, p3.s)) && (p3 = d3.i > p3.i ? d3 : f3) && (null == h3.pageNextDataIndex && (h3.pageNextDataIndex = p3.i), ++h3.pageCount), d3 = f3;
          for (c3 = e3 - 1, p3 = n3, d3 = n3, f3 = null; -1 <= c3; --c3)
            (f3 = g3(a3[c3])) && y3(d3, f3.s) || !(p3.i < d3.i) || (d3 = p3, null == h3.pagePrevDataIndex && (h3.pagePrevDataIndex = p3.i), ++h3.pageCount, ++h3.pageIndex), p3 = f3;
        }
        return h3;
        function g3(t4) {
          var e4, n4;
          if (t4)
            return { s: n4 = (e4 = t4.getBoundingRect())[o3] + t4[o3], e: n4 + e4[r3], i: t4.__legendDataIndex };
        }
        function y3(t4, e4) {
          return t4.e >= e4 && t4.s <= e4 + i3;
        }
      }, Ck.prototype._findTargetItemIndex = function(n3) {
        var i3, r3;
        return this._showController ? (this.getContentGroup().eachChild(function(t3, e3) {
          t3 = t3.__legendDataIndex;
          null == r3 && null != t3 && (r3 = e3), t3 === n3 && (i3 = e3);
        }), null != i3 ? i3 : r3) : 0;
      }, Ck.type = "legend.scroll", Ck);
      function Ck() {
        var t3 = null !== wk && wk.apply(this, arguments) || this;
        return t3.type = Ck.type, t3.newlineDisabled = true, t3._currentIndex = 0, t3;
      }
      _b(function(t3) {
        _b(mk), t3.registerComponentModel(_k), t3.registerComponentView(Ik), t3.registerAction("legendScroll", "legendscroll", function(t4, e3) {
          var n3 = t4.scrollDataIndex;
          null != n3 && e3.eachComponent({ mainType: "legend", subType: "scroll", query: t4 }, function(t5) {
            t5.setScrollDataIndex(n3);
          });
        });
      }), _b(gS);
      var kk = { value: "eq", "<": "lt", "<=": "lte", ">": "gt", ">=": "gte", "=": "eq", "!=": "ne", "<>": "ne" }, Dk = (Ak.prototype.evaluate = function(t3) {
        var e3 = typeof t3;
        return W(e3) ? this._condVal.test(t3) : !!U(e3) && this._condVal.test(t3 + "");
      }, Ak);
      function Ak(t3) {
        null == (this._condVal = W(t3) ? new RegExp(t3) : St(t3) ? t3 : null) && f("");
      }
      Pk.prototype.evaluate = function() {
        return this.value;
      };
      var Lk = Pk;
      function Pk() {
      }
      Rk.prototype.evaluate = function() {
        for (var t3 = this.children, e3 = 0; e3 < t3.length; e3++)
          if (!t3[e3].evaluate())
            return false;
        return true;
      };
      var Ok = Rk;
      function Rk() {
      }
      zk.prototype.evaluate = function() {
        for (var t3 = this.children, e3 = 0; e3 < t3.length; e3++)
          if (t3[e3].evaluate())
            return true;
        return false;
      };
      var Nk = zk;
      function zk() {
      }
      Ek.prototype.evaluate = function() {
        return !this.child.evaluate();
      };
      var Bk = Ek;
      function Ek() {
      }
      Fk.prototype.evaluate = function() {
        for (var t3 = !!this.valueParser, e3 = (0, this.getValue)(this.valueGetterParam), n3 = t3 ? this.valueParser(e3) : null, i3 = 0; i3 < this.subCondList.length; i3++)
          if (!this.subCondList[i3].evaluate(t3 ? n3 : e3))
            return false;
        return true;
      };
      var Vk = Fk;
      function Fk() {
      }
      function Gk(t3, e3) {
        if (true === t3 || false === t3)
          return (n3 = new Lk()).value = t3, n3;
        var n3;
        if (Wk(t3) || f(""), t3.and)
          return Hk("and", t3, e3);
        if (t3.or)
          return Hk("or", t3, e3);
        if (t3.not)
          return n3 = e3, Wk(o3 = (o3 = t3).not) || f(""), (l3 = new Bk()).child = Gk(o3, n3), l3.child || f(""), l3;
        for (var i3 = t3, r3 = e3, o3 = r3.prepareGetValue(i3), a3 = [], s3 = O(i3), l3 = i3.parser, u3 = l3 ? Qy(l3) : null, h3 = 0; h3 < s3.length; h3++) {
          var c3, p3 = s3[h3];
          "parser" === p3 || r3.valueGetterAttrMap.get(p3) || (c3 = Ht(kk, p3) ? kk[p3] : p3, p3 = i3[p3], p3 = u3 ? u3(p3) : p3, (c3 = function(t4, e4) {
            return "eq" === t4 || "ne" === t4 ? new r0("eq" === t4, e4) : Ht(Jy, t4) ? new t0(t4, e4) : null;
          }(c3, p3) || "reg" === c3 && new Dk(p3)) || f(""), a3.push(c3));
        }
        return a3.length || f(""), (l3 = new Vk()).valueGetterParam = o3, l3.valueParser = u3, l3.getValue = r3.getValue, l3.subCondList = a3, l3;
      }
      function Hk(t3, e3, n3) {
        e3 = e3[t3], G(e3) || f(""), e3.length || f(""), t3 = new ("and" === t3 ? Ok : Nk)();
        return t3.children = E(e3, function(t4) {
          return Gk(t4, n3);
        }), t3.children.length || f(""), t3;
      }
      function Wk(t3) {
        return X(t3) && !pt(t3);
      }
      Xk.prototype.evaluate = function() {
        return this._cond.evaluate();
      };
      var Uk = Xk;
      function Xk(t3, e3) {
        this._cond = Gk(t3, e3);
      }
      var Yk = { type: "echarts:filter", transform: function(t3) {
        for (var e3, n3, i3 = t3.upstream, r3 = (t3 = t3.config, n3 = { valueGetterAttrMap: I({ dimension: true }), prepareGetValue: function(t4) {
          var e4 = t4.dimension, t4 = (Ht(t4, "dimension") || f(""), i3.getDimensionInfo(e4));
          return t4 || f(""), { dimIdx: t4.index };
        }, getValue: function(t4) {
          return i3.retrieveValueFromItem(e3, t4.dimIdx);
        } }, new Uk(t3, n3)), o3 = [], a3 = 0, s3 = i3.count(); a3 < s3; a3++)
          e3 = i3.getRawDataItem(a3), r3.evaluate() && o3.push(e3);
        return { data: o3 };
      } }, qk = { type: "echarts:sort", transform: function(t3) {
        for (var a3 = t3.upstream, t3 = t3.config, t3 = Pa(t3), s3 = (t3.length || f(""), []), t3 = (F(t3, function(t4) {
          var e4 = t4.dimension, n4 = t4.order, i4 = t4.parser, t4 = t4.incomparable, e4 = (null == e4 && f(""), "asc" !== n4 && "desc" !== n4 && f(""), t4 && "min" !== t4 && "max" !== t4 && f(""), "asc" !== n4 && "desc" !== n4 && f(""), a3.getDimensionInfo(e4)), r3 = (e4 || f(""), i4 ? Qy(i4) : null);
          i4 && !r3 && f(""), s3.push({ dimIdx: e4.index, parser: r3, comparator: new n0(n4, t4) });
        }), a3.sourceFormat), e3 = (t3 !== Ou && t3 !== Ru && f(""), []), n3 = 0, i3 = a3.count(); n3 < i3; n3++)
          e3.push(a3.getRawDataItem(n3));
        return e3.sort(function(t4, e4) {
          for (var n4 = 0; n4 < s3.length; n4++) {
            var i4 = s3[n4], r3 = a3.retrieveValueFromItem(t4, i4.dimIdx), o3 = a3.retrieveValueFromItem(e4, i4.dimIdx), i4 = (i4.parser && (r3 = i4.parser(r3), o3 = i4.parser(o3)), i4.comparator.evaluate(r3, o3));
            if (0 !== i4)
              return i4;
          }
          return 0;
        }), { data: e3 };
      } };
      _b(function(t3) {
        t3.registerTransform(Yk), t3.registerTransform(qk);
      });
      var Zk = Math.sin, jk = Math.cos, Kk = Math.PI, $k = 2 * Math.PI, Qk = 180 / Kk, Jk = (tD.prototype.reset = function(t3) {
        this._start = true, this._d = [], this._str = "", this._p = Math.pow(10, t3 || 4);
      }, tD.prototype.moveTo = function(t3, e3) {
        this._add("M", t3, e3);
      }, tD.prototype.lineTo = function(t3, e3) {
        this._add("L", t3, e3);
      }, tD.prototype.bezierCurveTo = function(t3, e3, n3, i3, r3, o3) {
        this._add("C", t3, e3, n3, i3, r3, o3);
      }, tD.prototype.quadraticCurveTo = function(t3, e3, n3, i3) {
        this._add("Q", t3, e3, n3, i3);
      }, tD.prototype.arc = function(t3, e3, n3, i3, r3, o3) {
        this.ellipse(t3, e3, n3, n3, 0, i3, r3, o3);
      }, tD.prototype.ellipse = function(t3, e3, n3, i3, r3, o3, a3, s3) {
        var l3, u3 = a3 - o3, s3 = !s3, h3 = Math.abs(u3), c3 = Ji(h3 - $k) || (s3 ? $k <= u3 : $k <= -u3), p3 = false, p3 = !!c3 || !Ji(h3) && Kk <= (0 < u3 ? u3 % $k : u3 % $k + $k) == !!s3, h3 = t3 + n3 * jk(o3), u3 = e3 + i3 * Zk(o3), r3 = (this._start && this._add("M", h3, u3), Math.round(r3 * Qk));
        c3 ? (c3 = 1 / this._p, this._add("A", n3, i3, r3, 1, +s3, t3 + n3 * jk(o3 + (l3 = (s3 ? 1 : -1) * ($k - c3))), e3 + i3 * Zk(o3 + l3)), 0.01 < c3 && this._add("A", n3, i3, r3, 0, +s3, h3, u3)) : (o3 = t3 + n3 * jk(a3), l3 = e3 + i3 * Zk(a3), this._add("A", n3, i3, r3, +p3, +s3, o3, l3));
      }, tD.prototype.rect = function(t3, e3, n3, i3) {
        this._add("M", t3, e3), this._add("l", n3, 0), this._add("l", 0, i3), this._add("l", -n3, 0), this._add("Z");
      }, tD.prototype.closePath = function() {
        0 < this._d.length && this._add("Z");
      }, tD.prototype._add = function(t3, e3, n3, i3, r3, o3, a3, s3, l3) {
        for (var u3 = [], h3 = this._p, c3 = 1; c3 < arguments.length; c3++) {
          var p3 = arguments[c3];
          if (isNaN(p3))
            return void (this._invalid = true);
          u3.push(Math.round(p3 * h3) / h3);
        }
        this._d.push(t3 + u3.join(" ")), this._start = "Z" === t3;
      }, tD.prototype.generateStr = function() {
        this._str = this._invalid ? "" : this._d.join(""), this._d = [];
      }, tD.prototype.getStr = function() {
        return this._str;
      }, tD);
      function tD() {
      }
      var eD = "none", nD = Math.round;
      var iD = ["lineCap", "miterLimit", "lineJoin"], rD = E(iD, function(t3) {
        return "stroke-" + t3.toLowerCase();
      });
      function oD(t3, e3, n3, i3) {
        var r3 = null == e3.opacity ? 1 : e3.opacity;
        if (n3 instanceof eu)
          t3("opacity", r3);
        else if (null != (o3 = (o3 = e3).fill) && o3 !== eD ? (t3("fill", (o3 = Qi(e3.fill)).color), o3 = null != e3.fillOpacity ? e3.fillOpacity * o3.opacity * r3 : o3.opacity * r3, (i3 || o3 < 1) && t3("fill-opacity", o3)) : t3("fill", eD), null != (o3 = (o3 = e3).stroke) && o3 !== eD) {
          var o3 = Qi(e3.stroke), a3 = (t3("stroke", o3.color), e3.strokeNoScale ? n3.getLineScale() : 1), a3 = a3 ? (e3.lineWidth || 0) / a3 : 0, o3 = null != e3.strokeOpacity ? e3.strokeOpacity * o3.opacity * r3 : o3.opacity * r3, r3 = e3.strokeFirst;
          !i3 && 1 == a3 || t3("stroke-width", a3), (i3 || r3) && t3("paint-order", r3 ? "stroke" : "fill"), (i3 || o3 < 1) && t3("stroke-opacity", o3), e3.lineDash ? (r3 = (a3 = ev(n3))[0], o3 = a3[1], r3 && (o3 = nD(o3 || 0), t3("stroke-dasharray", r3.join(",")), o3 || i3) && t3("stroke-dashoffset", o3)) : i3 && t3("stroke-dasharray", eD);
          for (var s3 = 0; s3 < iD.length; s3++) {
            var l3 = iD[s3];
            (i3 || e3[l3] !== Ul[l3]) && (l3 = e3[l3] || Ul[l3]) && t3(rD[s3], l3);
          }
        } else
          i3 && t3("stroke", eD);
      }
      var aD = "http://www.w3.org/2000/svg", sD = "http://www.w3.org/1999/xlink", lD = "http://www.w3.org/2000/xmlns/", uD = "http://www.w3.org/XML/1998/namespace", hD = "ecmeta_";
      function cD(t3) {
        return document.createElementNS(aD, t3);
      }
      function pD(t3, e3, n3, i3, r3) {
        return { tag: t3, attrs: n3 || {}, children: i3, text: r3, key: e3 };
      }
      function dD(t3, e3) {
        var o3 = (e3 = e3 || {}).newline ? "\n" : "";
        return function t4(e4) {
          var n3 = e4.children, i3 = e4.tag, r3 = e4.attrs, e4 = e4.text;
          return function(t5, e5) {
            var n4 = [];
            if (e5)
              for (var i4 in e5) {
                var r4 = e5[i4];
                false !== r4 && (true !== r4 && null != r4 && (i4 += '="' + r4 + '"'), n4.push(i4));
              }
            return "<" + t5 + " " + n4.join(" ") + ">";
          }(i3, r3) + ("style" !== i3 ? Te(e4) : e4 || "") + (n3 ? o3 + E(n3, t4).join(o3) + o3 : "") + "</" + i3 + ">";
        }(t3);
      }
      function fD(t3) {
        return { zrId: t3, shadowCache: {}, patternCache: {}, gradientCache: {}, clipPathCache: {}, defs: {}, cssNodes: {}, cssAnims: {}, cssStyleCache: {}, cssAnimIdx: 0, shadowIdx: 0, gradientIdx: 0, patternIdx: 0, clipPathIdx: 0 };
      }
      function gD(t3, e3, n3, i3) {
        return pD("svg", "root", { width: t3, height: e3, xmlns: aD, "xmlns:xlink": sD, version: "1.1", baseProfile: "full", viewBox: !!i3 && "0 0 " + t3 + " " + e3 }, n3);
      }
      var yD = 0;
      var mD = { cubicIn: "0.32,0,0.67,0", cubicOut: "0.33,1,0.68,1", cubicInOut: "0.65,0,0.35,1", quadraticIn: "0.11,0,0.5,0", quadraticOut: "0.5,1,0.89,1", quadraticInOut: "0.45,0,0.55,1", quarticIn: "0.5,0,0.75,0", quarticOut: "0.25,1,0.5,1", quarticInOut: "0.76,0,0.24,1", quinticIn: "0.64,0,0.78,0", quinticOut: "0.22,1,0.36,1", quinticInOut: "0.83,0,0.17,1", sinusoidalIn: "0.12,0,0.39,0", sinusoidalOut: "0.61,1,0.88,1", sinusoidalInOut: "0.37,0,0.63,1", exponentialIn: "0.7,0,0.84,0", exponentialOut: "0.16,1,0.3,1", exponentialInOut: "0.87,0,0.13,1", circularIn: "0.55,0,1,0.45", circularOut: "0,0.55,0.45,1", circularInOut: "0.85,0,0.15,1" }, vD = "transform-origin";
      var _D = { fill: "fill", opacity: "opacity", lineWidth: "stroke-width", lineDashOffset: "stroke-dashoffset" };
      function xD(t3, e3) {
        var n3 = e3.zrId + "-ani-" + e3.cssAnimIdx++;
        return e3.cssAnims[n3] = t3, n3;
      }
      function bD(t3) {
        return W(t3) ? mD[t3] ? "cubic-bezier(" + mD[t3] + ")" : _i(t3) ? t3 : "" : "";
      }
      function wD(D3, A3, L3, P3) {
        var t3 = D3.animators, e3 = t3.length, n3 = [];
        if (D3 instanceof rp) {
          if (r3 = function(t4, e4, u4) {
            var h4, c4, t4 = t4.shape.paths, p4 = {};
            if (F(t4, function(t5) {
              var e5 = fD(u4.zrId), t5 = (e5.animation = true, wD(t5, {}, e5, true), e5.cssAnims), n4 = e5.cssNodes, e5 = O(t5), i4 = e5.length;
              if (i4) {
                var r4, o4, a4 = t5[c4 = e5[i4 - 1]];
                for (r4 in a4) {
                  var s4 = a4[r4];
                  p4[r4] = p4[r4] || { d: "" }, p4[r4].d += s4.d || "";
                }
                for (o4 in n4) {
                  var l4 = n4[o4].animation;
                  0 <= l4.indexOf(c4) && (h4 = l4);
                }
              }
            }), h4)
              return e4.d = false, t4 = xD(p4, u4), h4.replace(c4, t4);
          }(D3, A3, L3))
            n3.push(r3);
          else if (!e3)
            return;
        } else if (!e3)
          return;
        for (var i3, r3, o3, a3 = {}, s3 = 0; s3 < e3; s3++) {
          var l3 = t3[s3], u3 = [l3.getMaxTime() / 1e3 + "s"], h3 = bD(l3.getClip().easing), c3 = l3.getDelay(), h3 = (u3.push(h3 || "linear"), c3 && u3.push(c3 / 1e3 + "s"), l3.getLoop() && u3.push("infinite"), u3.join(" "));
          a3[h3] = a3[h3] || [h3, []], a3[h3][1].push(l3);
        }
        function p3(t4) {
          var e4 = t4[1], n4 = e4.length, i4 = {}, r4 = {}, o4 = {}, f3 = "animation-timing-function";
          function a4(t5, e5, n5) {
            for (var i5 = t5.getTracks(), r5 = t5.getMaxTime(), o5 = 0; o5 < i5.length; o5++) {
              var a5 = i5[o5];
              if (a5.needsAnimate()) {
                var s5 = a5.keyframes, l5 = a5.propName;
                if (l5 = n5 ? n5(l5) : l5)
                  for (var u5 = 0; u5 < s5.length; u5++) {
                    var h5 = s5[u5], c5 = Math.round(h5.time / r5 * 100) + "%", p5 = bD(h5.easing), d4 = h5.rawValue;
                    (W(d4) || U(d4)) && (e5[c5] = e5[c5] || {}, e5[c5][l5] = h5.rawValue, p5) && (e5[c5][f3] = p5);
                  }
              }
            }
          }
          for (var s4, l4, u4 = 0; u4 < n4; u4++)
            (S3 = (w3 = e4[u4]).targetName) ? "shape" === S3 && a4(w3, r4) : P3 || a4(w3, i4);
          for (b3 in i4) {
            var h4 = {}, c4 = (co(h4, D3), V(h4, i4[b3]), hr(h4)), p4 = i4[b3][f3];
            o4[b3] = c4 ? { transform: c4 } : {}, c4 = o4[b3], s4 = void 0, s4 = (h4 = h4).originX, h4 = h4.originY, (s4 || h4) && (c4[vD] = s4 + "px " + h4 + "px"), p4 && (o4[b3][f3] = p4);
          }
          var d3, g3, y3, m3 = true;
          for (b3 in r4) {
            o4[b3] = o4[b3] || {};
            var v3 = !l4, p4 = r4[b3][f3], _3 = (l4 = v3 ? new Dl() : l4).len(), x3 = (l4.reset(), o4[b3].d = (g3 = r4[b3], y3 = l4, x3 = void 0, x3 = V({}, (d3 = D3).shape), V(x3, g3), d3.buildPath(y3, x3), (g3 = new Jk()).reset(ur(d3)), y3.rebuildPath(g3, 1), g3.generateStr(), g3.getStr()), l4.len());
            if (!v3 && _3 !== x3) {
              m3 = false;
              break;
            }
            p4 && (o4[b3][f3] = p4);
          }
          if (!m3)
            for (var b3 in o4)
              delete o4[b3].d;
          if (!P3)
            for (var w3, S3, u4 = 0; u4 < n4; u4++)
              "style" === (S3 = (w3 = e4[u4]).targetName) && a4(w3, o4, function(t5) {
                return _D[t5];
              });
          for (var M3, T3 = O(o4), I3 = true, u4 = 1; u4 < T3.length; u4++) {
            var C3 = T3[u4 - 1], k3 = T3[u4];
            if (o4[C3][vD] !== o4[k3][vD]) {
              I3 = false;
              break;
            }
            M3 = o4[C3][vD];
          }
          if (I3 && M3) {
            for (var b3 in o4)
              o4[b3][vD] && delete o4[b3][vD];
            A3[vD] = M3;
          }
          if (ft(T3, function(t5) {
            return 0 < O(o4[t5]).length;
          }).length)
            return xD(o4, L3) + " " + t4[0] + " both";
        }
        for (i3 in a3)
          (r3 = p3(a3[i3])) && n3.push(r3);
        n3.length && (o3 = L3.zrId + "-cls-" + yD++, L3.cssNodes["." + o3] = { animation: n3.join(",") }, A3.class = o3);
      }
      function SD(t3, e3, n3, i3) {
        var r3 = JSON.stringify(t3), o3 = n3.cssStyleCache[r3];
        o3 || (o3 = n3.zrId + "-cls-" + yD++, n3.cssStyleCache[r3] = o3, n3.cssNodes["." + o3 + (i3 ? ":hover" : "")] = t3), e3.class = e3.class ? e3.class + " " + o3 : o3;
      }
      var MD = Math.round;
      function TD(t3) {
        return t3 && W(t3.src);
      }
      function ID(t3) {
        return t3 && H(t3.toDataURL);
      }
      function CD(i3, r3, o3, a3) {
        oD(function(t4, e4) {
          var n4 = "fill" === t4 || "stroke" === t4;
          n4 && sr(e4) ? BD(r3, i3, t4, a3) : n4 && rr(e4) ? ED(o3, i3, t4, a3) : i3[t4] = e4, n4 && a3.ssr && "none" === e4 && (i3["pointer-events"] = "visible");
        }, r3, o3, false);
        var t3 = i3, e3 = a3;
        if (function(t4) {
          return t4 && (t4.shadowBlur || t4.shadowOffsetX || t4.shadowOffsetY);
        }(f3 = (u3 = o3).style)) {
          var n3 = function(t4) {
            var e4 = t4.style, t4 = t4.getGlobalScale();
            return [e4.shadowColor, (e4.shadowBlur || 0).toFixed(2), (e4.shadowOffsetX || 0).toFixed(2), (e4.shadowOffsetY || 0).toFixed(2), t4[0], t4[1]].join(",");
          }(u3), s3 = e3.shadowCache, l3 = s3[n3];
          if (!l3) {
            var u3 = u3.getGlobalScale(), h3 = u3[0], u3 = u3[1];
            if (!h3 || !u3)
              return;
            var c3 = f3.shadowOffsetX || 0, p3 = f3.shadowOffsetY || 0, d3 = f3.shadowBlur, f3 = Qi(f3.shadowColor), g3 = f3.opacity, f3 = f3.color, d3 = d3 / 2 / h3 + " " + d3 / 2 / u3;
            l3 = e3.zrId + "-s" + e3.shadowIdx++, e3.defs[l3] = pD("filter", l3, { id: l3, x: "-100%", y: "-100%", width: "300%", height: "300%" }, [pD("feDropShadow", "", { dx: c3 / h3, dy: p3 / u3, stdDeviation: d3, "flood-color": f3, "flood-opacity": g3 })]), s3[n3] = l3;
          }
          t3.filter = lr(l3);
        }
      }
      function kD(n3, t3) {
        var e3 = Zo(t3);
        e3 && (e3.each(function(t4, e4) {
          null != t4 && (n3[(hD + e4).toLowerCase()] = t4 + "");
        }), t3.isSilent()) && (n3[hD + "silent"] = "true");
      }
      function DD(t3) {
        return Ji(t3[0] - 1) && Ji(t3[1]) && Ji(t3[2]) && Ji(t3[3] - 1);
      }
      function AD(t3, e3, n3) {
        var i3;
        !e3 || Ji((i3 = e3)[4]) && Ji(i3[5]) && DD(e3) || (i3 = n3 ? 10 : 1e4, t3.transform = DD(e3) ? "translate(" + MD(e3[4] * i3) / i3 + " " + MD(e3[5] * i3) / i3 + ")" : "matrix(" + tr((n3 = e3)[0]) + "," + tr(n3[1]) + "," + tr(n3[2]) + "," + tr(n3[3]) + "," + er(n3[4]) + "," + er(n3[5]) + ")");
      }
      function LD(t3, e3, n3) {
        for (var i3 = t3.points, r3 = [], o3 = 0; o3 < i3.length; o3++)
          r3.push(MD(i3[o3][0] * n3) / n3), r3.push(MD(i3[o3][1] * n3) / n3);
        e3.points = r3.join(" ");
      }
      function PD(t3) {
        return !t3.smooth;
      }
      var OD, RD = { circle: [(OD = E(["cx", "cy", "r"], function(t3) {
        return "string" == typeof t3 ? [t3, t3] : t3;
      }), function(t3, e3, n3) {
        for (var i3 = 0; i3 < OD.length; i3++) {
          var r3 = OD[i3], o3 = t3[r3[0]];
          null != o3 && (e3[r3[1]] = MD(o3 * n3) / n3);
        }
      })], polyline: [LD, PD], polygon: [LD, PD] };
      function ND(t3, e3) {
        var n3, i3, r3, o3, a3, s3 = t3.style, l3 = t3.shape, u3 = RD[t3.type], h3 = {}, c3 = e3.animation, p3 = "path", d3 = t3.style.strokePercent, f3 = e3.compress && ur(t3) || 4;
        return !u3 || e3.willUpdate || u3[1] && !u3[1](l3) || c3 && function(t4) {
          for (var e4 = t4.animators, n4 = 0; n4 < e4.length; n4++)
            if ("shape" === e4[n4].targetName)
              return 1;
        }(t3) || d3 < 1 ? (c3 = !t3.path || t3.shapeChanged(), t3.path || t3.createPathProxy(), n3 = t3.path, c3 && (n3.beginPath(), t3.buildPath(n3, t3.shape), t3.pathUpdated()), c3 = n3.getVersion(), r3 = (i3 = t3).__svgPathBuilder, i3.__svgPathVersion === c3 && r3 && d3 === i3.__svgPathStrokePercent || ((r3 = r3 || (i3.__svgPathBuilder = new Jk())).reset(f3), n3.rebuildPath(r3, d3), r3.generateStr(), i3.__svgPathVersion = c3, i3.__svgPathStrokePercent = d3), h3.d = r3.getStr()) : (p3 = t3.type, n3 = Math.pow(10, f3), u3[0](l3, h3, n3)), AD(h3, t3.transform), CD(h3, s3, t3, e3), kD(h3, t3), e3.animation && wD(t3, h3, e3), e3.emphasis && (c3 = h3, i3 = e3, (d3 = t3).ignore || (d3.isSilent() ? SD(a3 = { "pointer-events": "none" }, c3, i3, true) : (!(f3 = (r3 = d3.states.emphasis && d3.states.emphasis.style ? d3.states.emphasis.style : {}).fill) && (o3 = d3.style && d3.style.fill, u3 = d3.states.select && d3.states.select.style && d3.states.select.style.fill, u3 = 0 <= d3.currentStates.indexOf("select") && u3 || o3) && (f3 = Ki(u3)), (o3 = r3.lineWidth) && (o3 /= !r3.strokeNoScale && d3.transform ? d3.transform[0] : 1), a3 = { cursor: "pointer" }, f3 && (a3.fill = f3), r3.stroke && (a3.stroke = r3.stroke), o3 && (a3["stroke-width"] = o3), SD(a3, c3, i3, true)))), pD(p3, t3.id + "", h3);
      }
      function zD(t3, e3) {
        if (t3 instanceof ql)
          return ND(t3, e3);
        if (t3 instanceof eu) {
          var n3 = t3, i3 = e3, r3 = n3.style, o3 = r3.image;
          if (o3 && !W(o3) && (TD(o3) ? o3 = o3.src : ID(o3) && (o3 = o3.toDataURL())), o3)
            return a3 = r3.x || 0, s3 = r3.y || 0, o3 = { href: o3, width: r3.width, height: r3.height }, a3 && (o3.x = a3), s3 && (o3.y = s3), AD(o3, n3.transform), CD(o3, r3, n3, i3), kD(o3, n3), i3.animation && wD(n3, o3, i3), pD("image", n3.id + "", o3);
        } else if (t3 instanceof Kl) {
          var a3 = t3, s3 = e3, r3 = a3.style, i3 = r3.text;
          if (null != i3 && (i3 += ""), i3 && !isNaN(r3.x) && !isNaN(r3.y)) {
            var n3 = r3.font || K, o3 = r3.x || 0, l3 = (t3 = r3.y || 0, e3 = xo(n3), "top" === (l3 = r3.textBaseline) ? t3 += e3 / 2 : "bottom" === l3 && (t3 -= e3 / 2), t3), e3 = { "dominant-baseline": "central", "text-anchor": nr[r3.textAlign] || r3.textAlign };
            if (wu(r3)) {
              var t3 = "", u3 = r3.fontStyle, h3 = xu(r3.fontSize);
              if (!parseFloat(h3))
                return;
              var c3 = r3.fontFamily || S, p3 = r3.fontWeight;
              t3 += "font-size:" + h3 + ";font-family:" + c3 + ";", u3 && "normal" !== u3 && (t3 += "font-style:" + u3 + ";"), p3 && "normal" !== p3 && (t3 += "font-weight:" + p3 + ";"), e3.style = t3;
            } else
              e3.style = "font: " + n3;
            return i3.match(/\s/) && (e3["xml:space"] = "preserve"), o3 && (e3.x = o3), l3 && (e3.y = l3), AD(e3, a3.transform), CD(e3, r3, a3, s3), kD(e3, a3), s3.animation && wD(a3, e3, s3), pD("text", a3.id + "", e3, void 0, i3);
          }
        }
      }
      function BD(t3, e3, n3, i3) {
        var r3, t3 = t3[n3], o3 = { gradientUnits: t3.global ? "userSpaceOnUse" : "objectBoundingBox" };
        if (or(t3))
          r3 = "linearGradient", o3.x1 = t3.x, o3.y1 = t3.y, o3.x2 = t3.x2, o3.y2 = t3.y2;
        else {
          if (!ar(t3))
            return;
          r3 = "radialGradient", o3.cx = Y(t3.x, 0.5), o3.cy = Y(t3.y, 0.5), o3.r = Y(t3.r, 0.5);
        }
        for (var a3 = t3.colorStops, s3 = [], l3 = 0, u3 = a3.length; l3 < u3; ++l3) {
          var h3 = 100 * er(a3[l3].offset) + "%", c3 = Qi(a3[l3].color), p3 = c3.color, c3 = c3.opacity, h3 = { offset: h3 };
          h3["stop-color"] = p3, c3 < 1 && (h3["stop-opacity"] = c3), s3.push(pD("stop", l3 + "", h3));
        }
        var t3 = dD(pD(r3, "", o3, s3)), d3 = i3.gradientCache, f3 = d3[t3];
        f3 || (f3 = i3.zrId + "-g" + i3.gradientIdx++, d3[t3] = f3, o3.id = f3, i3.defs[f3] = pD(r3, f3, o3, s3)), e3[n3] = lr(f3);
      }
      function ED(t3, e3, n3, i3) {
        var r3, o3, a3, s3, l3, u3, h3, c3, p3 = t3.style[n3], d3 = t3.getBoundingRect(), f3 = {}, g3 = p3.repeat, y3 = "no-repeat" === g3, m3 = "repeat-x" === g3, v3 = "repeat-y" === g3;
        ir(p3) ? (o3 = p3.imageWidth, a3 = p3.imageHeight, g3 = void 0, W(h3 = p3.image) ? g3 = h3 : TD(h3) ? g3 = h3.src : ID(h3) && (g3 = h3.toDataURL()), "undefined" == typeof Image ? (Dt(o3, h3 = "Image width/height must been given explictly in svg-ssr renderer."), Dt(a3, h3)) : null != o3 && null != a3 || (s3 = function(t4, e4) {
          var n4, i4;
          t4 && (n4 = t4.elm, i4 = o3 || e4.width, e4 = a3 || e4.height, "pattern" === t4.tag && (m3 ? (e4 = 1, i4 /= d3.width) : v3 && (i4 = 1, e4 /= d3.height)), t4.attrs.width = i4, t4.attrs.height = e4, n4) && (n4.setAttribute("width", i4), n4.setAttribute("height", e4));
        }, (h3 = Ts(g3, null, t3, function(t4) {
          y3 || s3(u3, t4), s3(r3, t4);
        })) && h3.width && h3.height && (o3 = o3 || h3.width, a3 = a3 || h3.height)), r3 = pD("image", "img", { href: g3, width: o3, height: a3 }), f3.width = o3, f3.height = a3) : p3.svgElement && (r3 = _(p3.svgElement), f3.width = p3.svgWidth, f3.height = p3.svgHeight), r3 && (y3 ? c3 = l3 = 1 : m3 ? (l3 = 1, c3 = f3.width / d3.width) : v3 ? (c3 = 1, l3 = f3.height / d3.height) : f3.patternUnits = "userSpaceOnUse", null == c3 || isNaN(c3) || (f3.width = c3), null == l3 || isNaN(l3) || (f3.height = l3), (t3 = hr(p3)) && (f3.patternTransform = t3), h3 = dD(u3 = pD("pattern", "", f3, [r3])), (c3 = (g3 = i3.patternCache)[h3]) || (c3 = i3.zrId + "-p" + i3.patternIdx++, g3[h3] = c3, f3.id = c3, u3 = i3.defs[c3] = pD("pattern", c3, f3, [r3])), e3[n3] = lr(c3));
      }
      function VD(t3) {
        return document.createTextNode(t3);
      }
      function FD(t3, e3, n3) {
        t3.insertBefore(e3, n3);
      }
      function GD(t3, e3) {
        t3.removeChild(e3);
      }
      function HD(t3, e3) {
        t3.appendChild(e3);
      }
      function WD(t3) {
        return t3.parentNode;
      }
      function UD(t3) {
        return t3.nextSibling;
      }
      function XD(t3, e3) {
        t3.textContent = e3;
      }
      var YD = 58, qD = 120, ZD = pD("", "");
      function jD(t3) {
        return void 0 === t3;
      }
      function KD(t3) {
        return void 0 !== t3;
      }
      function $D(t3, e3) {
        var n3 = t3.key === e3.key;
        return t3.tag === e3.tag && n3;
      }
      function QD(t3) {
        var e3, n3 = t3.children, i3 = t3.tag;
        if (KD(i3)) {
          var r3 = t3.elm = cD(i3);
          if (eA(ZD, t3), G(n3))
            for (e3 = 0; e3 < n3.length; ++e3) {
              var o3 = n3[e3];
              null != o3 && HD(r3, QD(o3));
            }
          else
            KD(t3.text) && !X(t3.text) && HD(r3, VD(t3.text));
        } else
          t3.elm = VD(t3.text);
        return t3.elm;
      }
      function JD(t3, e3, n3, i3, r3) {
        for (; i3 <= r3; ++i3) {
          var o3 = n3[i3];
          null != o3 && FD(t3, QD(o3), e3);
        }
      }
      function tA(t3, e3, n3, i3) {
        for (; n3 <= i3; ++n3) {
          var r3 = e3[n3];
          null != r3 && (KD(r3.tag) ? GD(WD(r3.elm), r3.elm) : GD(t3, r3.elm));
        }
      }
      function eA(t3, e3) {
        var n3, i3 = e3.elm, r3 = t3 && t3.attrs || {}, o3 = e3.attrs || {};
        if (r3 !== o3) {
          for (n3 in o3) {
            var a3 = o3[n3];
            r3[n3] !== a3 && (true === a3 ? i3.setAttribute(n3, "") : false === a3 ? i3.removeAttribute(n3) : "style" === n3 ? i3.style.cssText = a3 : n3.charCodeAt(0) !== qD ? i3.setAttribute(n3, a3) : "xmlns:xlink" === n3 || "xmlns" === n3 ? i3.setAttributeNS(lD, n3, a3) : n3.charCodeAt(3) === YD ? i3.setAttributeNS(uD, n3, a3) : n3.charCodeAt(5) === YD ? i3.setAttributeNS(sD, n3, a3) : i3.setAttribute(n3, a3));
          }
          for (n3 in r3)
            n3 in o3 || i3.removeAttribute(n3);
        }
      }
      function nA(t3, e3, n3) {
        for (var i3, r3, o3, a3 = 0, s3 = 0, l3 = e3.length - 1, u3 = e3[0], h3 = e3[l3], c3 = n3.length - 1, p3 = n3[0], d3 = n3[c3]; a3 <= l3 && s3 <= c3; )
          null == u3 ? u3 = e3[++a3] : null == h3 ? h3 = e3[--l3] : null == p3 ? p3 = n3[++s3] : null == d3 ? d3 = n3[--c3] : $D(u3, p3) ? (iA(u3, p3), u3 = e3[++a3], p3 = n3[++s3]) : $D(h3, d3) ? (iA(h3, d3), h3 = e3[--l3], d3 = n3[--c3]) : $D(u3, d3) ? (iA(u3, d3), FD(t3, u3.elm, UD(h3.elm)), u3 = e3[++a3], d3 = n3[--c3]) : p3 = ($D(h3, p3) ? (iA(h3, p3), FD(t3, h3.elm, u3.elm), h3 = e3[--l3]) : (jD(i3) && (i3 = function(t4, e4, n4) {
            for (var i4 = {}, r4 = e4; r4 <= n4; ++r4) {
              var o4 = t4[r4].key;
              void 0 !== o4 && (i4[o4] = r4);
            }
            return i4;
          }(e3, a3, l3)), jD(r3 = i3[p3.key]) || (o3 = e3[r3]).tag !== p3.tag ? FD(t3, QD(p3), u3.elm) : (iA(o3, p3), e3[r3] = void 0, FD(t3, o3.elm, u3.elm))), n3[++s3]);
        (a3 <= l3 || s3 <= c3) && (l3 < a3 ? JD(t3, null == n3[c3 + 1] ? null : n3[c3 + 1].elm, n3, s3, c3) : tA(t3, e3, a3, l3));
      }
      function iA(t3, e3) {
        var n3 = e3.elm = t3.elm, i3 = t3.children, r3 = e3.children;
        t3 !== e3 && (eA(t3, e3), jD(e3.text) ? KD(i3) && KD(r3) ? i3 !== r3 && nA(n3, i3, r3) : KD(r3) ? (KD(t3.text) && XD(n3, ""), JD(n3, null, r3, 0, r3.length - 1)) : KD(i3) ? tA(n3, i3, 0, i3.length - 1) : KD(t3.text) && XD(n3, "") : t3.text !== e3.text && (KD(i3) && tA(n3, i3, 0, i3.length - 1), XD(n3, e3.text)));
      }
      var rA = 0;
      function oA(t3, e3, n3) {
        var i3;
        this.type = "svg", this.configLayer = function() {
        }, this.storage = e3, this._opts = n3 = V({}, n3), this.root = t3, this._id = "zr" + rA++, this._oldVNode = gD(n3.width, n3.height), t3 && !n3.ssr && ((e3 = this._viewport = document.createElement("div")).style.cssText = "position:relative;overflow:hidden", i3 = this._svgDom = this._oldVNode.elm = cD("svg"), eA(null, this._oldVNode), e3.appendChild(i3), t3.appendChild(e3)), this.resize(n3.width, n3.height);
      }
      oA.prototype.getType = function() {
        return this.type;
      }, oA.prototype.getViewportRoot = function() {
        return this._viewport;
      }, oA.prototype.getViewportRootOffset = function() {
        var t3 = this.getViewportRoot();
        if (t3)
          return { offsetLeft: t3.offsetLeft || 0, offsetTop: t3.offsetTop || 0 };
      }, oA.prototype.getSvgDom = function() {
        return this._svgDom;
      }, oA.prototype.refresh = function() {
        var t3, e3, n3, i3, r3;
        this.root && ((t3 = this.renderToVNode({ willUpdate: true })).attrs.style = "position:absolute;left:0;top:0;user-select:none", $D(e3 = this._oldVNode, n3 = t3) ? iA(e3, n3) : (r3 = WD(i3 = e3.elm), QD(n3), null !== r3 && (FD(r3, n3.elm, UD(i3)), tA(r3, [e3], 0, 0))), this._oldVNode = t3);
      }, oA.prototype.renderOneToVNode = function(t3) {
        return zD(t3, fD(this._id));
      }, oA.prototype.renderToVNode = function(t3) {
        t3 = t3 || {};
        var n3, r3, o3, a3, s3, e3 = this.storage.getDisplayList(true), i3 = this._width, l3 = this._height, u3 = fD(this._id), h3 = (u3.animation = t3.animation, u3.willUpdate = t3.willUpdate, u3.compress = t3.compress, u3.emphasis = t3.emphasis, u3.ssr = this._opts.ssr, []), c3 = this._bgVNode = function(t4, e4, n4, i4) {
          var r4;
          n4 && "none" !== n4 && (r4 = pD("rect", "bg", { width: t4, height: e4, x: "0", y: "0" }), sr(n4) ? BD({ fill: n4 }, r4.attrs, "fill", i4) : rr(n4) ? ED({ style: { fill: n4 }, dirty: Wt, getBoundingRect: function() {
            return { width: t4, height: e4 };
          } }, r4.attrs, "fill", i4) : (i4 = Qi(n4), n4 = i4.color, i4 = i4.opacity, r4.attrs.fill = n4, i4 < 1 && (r4.attrs["fill-opacity"] = i4)));
          return r4;
        }(i3, l3, this._backgroundColor, u3), c3 = (c3 && h3.push(c3), t3.compress ? null : this._mainVNode = pD("g", "main", {}, [])), e3 = (this._paintList(e3, u3, c3 ? c3.children : h3), c3 && h3.push(c3), E(O(u3.defs), function(t4) {
          return u3.defs[t4];
        }));
        return e3.length && h3.push(pD("defs", "defs", {}, e3)), t3.animation && (n3 = u3.cssNodes, r3 = u3.cssAnims, o3 = (c3 = (c3 = { newline: true }) || {}).newline ? "\n" : "", a3 = " {" + o3, s3 = o3 + "}", c3 = E(O(n3), function(e4) {
          return e4 + a3 + E(O(n3[e4]), function(t4) {
            return t4 + ":" + n3[e4][t4] + ";";
          }).join(o3) + s3;
        }).join(o3), e3 = E(O(r3), function(i4) {
          return "@keyframes " + i4 + a3 + E(O(r3[i4]), function(n4) {
            return n4 + a3 + E(O(r3[i4][n4]), function(t4) {
              var e4 = r3[i4][n4][t4];
              return t4 + ":" + (e4 = "d" === t4 ? 'path("' + e4 + '")' : e4) + ";";
            }).join(o3) + s3;
          }).join(o3) + s3;
        }).join(o3), c3 = c3 || e3 ? ["<![CDATA[", c3, e3, "]]>"].join(o3) : "") && (e3 = pD("style", "stl", {}, [], c3), h3.push(e3)), gD(i3, l3, h3, t3.useViewBox);
      }, oA.prototype.renderToString = function(t3) {
        return dD(this.renderToVNode({ animation: Y((t3 = t3 || {}).cssAnimation, true), emphasis: Y(t3.cssEmphasis, true), willUpdate: false, compress: true, useViewBox: Y(t3.useViewBox, true) }), { newline: true });
      }, oA.prototype.setBackgroundColor = function(t3) {
        this._backgroundColor = t3;
      }, oA.prototype.getSvgRoot = function() {
        return this._mainVNode && this._mainVNode.elm;
      }, oA.prototype._paintList = function(t3, e3, n3) {
        for (var i3, r3, o3, a3, s3, l3, u3, h3 = t3.length, c3 = [], p3 = 0, d3 = 0, f3 = 0; f3 < h3; f3++) {
          var g3 = t3[f3];
          if (!g3.invisible) {
            for (var y3 = g3.__clipPaths, m3 = y3 && y3.length || 0, v3 = M3 && M3.length || 0, _3 = void 0, _3 = Math.max(m3 - 1, v3 - 1); 0 <= _3 && (!y3 || !M3 || y3[_3] !== M3[_3]); _3--)
              ;
            for (var x3 = v3 - 1; _3 < x3; x3--)
              i3 = c3[--p3 - 1];
            for (var b3 = _3 + 1; b3 < m3; b3++) {
              var w3 = {}, S3 = (r3 = y3[b3], o3 = w3, u3 = S3 = l3 = s3 = void 0, l3 = (a3 = e3).clipPathCache, S3 = a3.defs, (u3 = l3[r3.id]) || (s3 = { id: u3 = a3.zrId + "-c" + a3.clipPathIdx++ }, S3[l3[r3.id] = u3] = pD("clipPath", u3, s3, [ND(r3, a3)])), o3["clip-path"] = lr(u3), pD("g", "clip-g-" + d3++, w3, []));
              (i3 ? i3.children : n3).push(S3), i3 = c3[p3++] = S3;
            }
            var M3 = y3, v3 = zD(g3, e3);
            v3 && (i3 ? i3.children : n3).push(v3);
          }
        }
      }, oA.prototype.resize = function(t3, e3) {
        var n3 = this._opts, i3 = this.root, r3 = this._viewport;
        null != t3 && (n3.width = t3), null != e3 && (n3.height = e3), i3 && r3 && (r3.style.display = "none", t3 = tv(i3, 0, n3), e3 = tv(i3, 1, n3), r3.style.display = ""), this._width === t3 && this._height === e3 || (this._width = t3, this._height = e3, r3 && ((i3 = r3.style).width = t3 + "px", i3.height = e3 + "px"), rr(this._backgroundColor) ? this.refresh() : ((n3 = this._svgDom) && (n3.setAttribute("width", t3), n3.setAttribute("height", e3)), (r3 = this._bgVNode && this._bgVNode.elm) && (r3.setAttribute("width", t3), r3.setAttribute("height", e3))));
      }, oA.prototype.getWidth = function() {
        return this._width;
      }, oA.prototype.getHeight = function() {
        return this._height;
      }, oA.prototype.dispose = function() {
        this.root && (this.root.innerHTML = ""), this._svgDom = this._viewport = this.storage = this._oldVNode = this._bgVNode = this._mainVNode = null;
      }, oA.prototype.clear = function() {
        this._svgDom && (this._svgDom.innerHTML = null), this._oldVNode = null;
      }, oA.prototype.toDataURL = function(t3) {
        var e3 = this.renderToString(), n3 = "data:image/svg+xml;";
        return t3 ? (e3 = cr(e3)) && n3 + "base64," + e3 : n3 + "charset=UTF-8," + encodeURIComponent(e3);
      }, qo("svg", oA), t.Axis = Hm, t.ChartView = j0, t.ComponentModel = cg, t.ComponentView = U0, t.List = m1, t.Model = Bd, t.PRIORITY = Wm, t.SeriesModel = z0, t.color = Wi, t.connect = function(e3) {
        var t3;
        return G(e3) && (t3 = e3, e3 = null, F(t3, function(t4) {
          null != t4.group && (e3 = t4.group);
        }), e3 = e3 || "g_" + S_++, F(t3, function(t4) {
          t4.group = e3;
        })), b_[e3] = true, e3;
      }, t.dataTool = {}, t.dependencies = { zrender: "6.1.0" }, t.disConnect = Vm, t.disconnect = T_, t.dispose = function(t3) {
        W(t3) ? t3 = x_[t3] : t3 instanceof o_ || (t3 = I_(t3)), t3 instanceof o_ && !t3.isDisposed() && t3.dispose();
      }, t.env = b, t.extendChartView = function(t3) {
        return t3 = j0.extend(t3), j0.registerClass(t3), t3;
      }, t.extendComponentModel = function(t3) {
        return t3 = cg.extend(t3), cg.registerClass(t3), t3;
      }, t.extendComponentView = function(t3) {
        return t3 = U0.extend(t3), U0.registerClass(t3), t3;
      }, t.extendSeriesModel = function(t3) {
        return t3 = z0.extend(t3), z0.registerClass(t3), t3;
      }, t.format = Pd, t.getCoordinateSystemDimensions = function(t3) {
        if (t3 = Ef.get(t3))
          return t3.getDimensionsInfo ? t3.getDimensionsInfo() : t3.dimensions.slice();
      }, t.getInstanceByDom = I_, t.getInstanceById = function(t3) {
        return x_[t3];
      }, t.getMap = function(t3) {
        var e3 = Rm.getMap;
        return e3 && e3(t3);
      }, t.graphic = ws, t.helper = Um, t.init = function(t3, e3, n3) {
        var i3 = !(n3 && n3.ssr);
        if (i3) {
          var r3 = I_(t3);
          if (r3)
            return r3;
        }
        return (r3 = new o_(t3, e3, n3)).id = "ec_" + w_++, x_[r3.id] = r3, i3 && ja(t3, M_, r3.id), t_(r3), Om.trigger("afterinit", r3), r3;
      }, t.innerDrawElementOnCanvas = _v, t.matrix = qe, t.number = Rd, t.parseGeoJSON = zb, t.parseGeoJson = zb, t.registerAction = O_, t.registerCoordinateSystem = R_, t.registerCustomSeries = function(t3, e3) {
      }, t.registerLayout = N_, t.registerLoading = V_, t.registerLocale = Zd, t.registerMap = F_, t.registerPostInit = A_, t.registerPostUpdate = L_, t.registerPreprocessor = k_, t.registerProcessor = D_, t.registerTheme = C_, t.registerTransform = G_, t.registerUpdateLifecycle = P_, t.registerVisual = z_, t.setCanvasCreator = function(t3) {
        D({ createCanvas: t3 });
      }, t.setPlatformAPI = D, t.throttle = nm, t.time = Id, t.use = _b, t.util = kd, t.vector = ce, t.version = "6.1.0", t.zrUtil = Yt, t.zrender = Ko;
    });
  }
});
export default require_echarts_min_1();
