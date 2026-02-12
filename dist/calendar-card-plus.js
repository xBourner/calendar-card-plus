var Pt = Object.defineProperty;
var Mt = (n, t, e) => t in n ? Pt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var $ = (n, t, e) => Mt(n, typeof t != "symbol" ? t + "" : t, e);
var Dt = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z", Ot = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
async function Ut(n, t, e, i) {
  const s = encodeURI(`?start=${t.toISOString()}&end=${e.toISOString()}`), a = i.map(async (o) => {
    try {
      const l = await n.callApi("GET", `calendars/${o}${s}`);
      if (!Array.isArray(l))
        throw new Error("Response is not an array");
      return l.map((h) => {
        var m, v, T, g, x, y;
        const c = ((m = h.start) == null ? void 0 : m.dateTime) || ((v = h.start) == null ? void 0 : v.date) || h.start, _ = ((T = h.end) == null ? void 0 : T.dateTime) || ((g = h.end) == null ? void 0 : g.date) || h.end;
        return {
          ...h,
          start: { dateTime: c.includes("T") ? c : void 0, date: c.includes("T") ? void 0 : c },
          end: { dateTime: _.includes("T") ? _ : void 0, date: _.includes("T") ? void 0 : _ },
          summary: h.summary || h.title || "Unknown Event",
          entity_id: o,
          calendar_name: ((y = (x = n.states[o]) == null ? void 0 : x.attributes) == null ? void 0 : y.friendly_name) || o
        };
      });
    } catch {
      const d = n.states[o];
      return d && d.attributes.start_time && d.attributes.end_time ? [{
        start: { dateTime: d.attributes.start_time.replace(" ", "T") },
        end: { dateTime: d.attributes.end_time.replace(" ", "T") },
        summary: d.attributes.message || d.attributes.friendly_name,
        location: d.attributes.location,
        description: d.attributes.description,
        entity_id: o,
        calendar_name: d.attributes.friendly_name || o
      }] : [];
    }
  });
  return (await Promise.all(a)).flat();
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, et = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, it = Symbol(), ot = /* @__PURE__ */ new WeakMap();
let wt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== it) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (et && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ot.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ot.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ht = (n) => new wt(typeof n == "string" ? n : n + "", void 0, it), bt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, a) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[a + 1], n[0]);
  return new wt(e, n, it);
}, Lt = (n, t) => {
  if (et) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = q.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, lt = et ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ht(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Nt, defineProperty: jt, getOwnPropertyDescriptor: Rt, getOwnPropertyNames: Bt, getOwnPropertySymbols: It, getPrototypeOf: Vt } = Object, b = globalThis, dt = b.trustedTypes, Wt = dt ? dt.emptyScript : "", Q = b.reactiveElementPolyfillSupport, L = (n, t) => n, K = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Wt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, st = (n, t) => !Nt(n, t), ct = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: st };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), b.litPropertyMetadata ?? (b.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let P = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && jt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: a } = Rt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const o = s == null ? void 0 : s.call(this);
      a == null || a.call(this, r), this.requestUpdate(t, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const t = Vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const e = this.properties, i = [...Bt(e), ...It(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(lt(s));
    } else t !== void 0 && e.push(lt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Lt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var a;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : K).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var a, r;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((a = o.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? o.converter : K;
      this._$Em = s;
      const d = l.fromAttribute(e, o.type);
      this[s] = d ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, a) {
    var r;
    if (t !== void 0) {
      const o = this.constructor;
      if (s === !1 && (a = this[t]), i ?? (i = o.getPropertyOptions(t)), !((i.hasChanged ?? st)(a, e) || i.useDefault && i.reflect && a === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: a }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), a !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, r] of this._$Ep) this[a] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [a, r] of s) {
        const { wrapped: o } = r, l = this[a];
        o !== !0 || this._$AL.has(a) || l === void 0 || this.C(a, void 0, r, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var a;
        return (a = s.hostUpdate) == null ? void 0 : a.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[L("elementProperties")] = /* @__PURE__ */ new Map(), P[L("finalized")] = /* @__PURE__ */ new Map(), Q == null || Q({ ReactiveElement: P }), (b.reactiveElementVersions ?? (b.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, ht = (n) => n, G = N.trustedTypes, _t = G ? G.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, At = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, Ct = "?" + w, Zt = `<${Ct}>`, k = document, j = () => k.createComment(""), R = (n) => n === null || typeof n != "object" && typeof n != "function", nt = Array.isArray, qt = (n) => nt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", X = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ut = /-->/g, pt = />/g, A = RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mt = /'/g, ft = /"/g, St = /^(?:script|style|textarea|title)$/i, Kt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), u = Kt(1), D = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), gt = /* @__PURE__ */ new WeakMap(), S = k.createTreeWalker(k, 129);
function Et(n, t) {
  if (!nt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return _t !== void 0 ? _t.createHTML(t) : t;
}
const Gt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = H;
  for (let o = 0; o < e; o++) {
    const l = n[o];
    let d, h, c = -1, _ = 0;
    for (; _ < l.length && (r.lastIndex = _, h = r.exec(l), h !== null); ) _ = r.lastIndex, r === H ? h[1] === "!--" ? r = ut : h[1] !== void 0 ? r = pt : h[2] !== void 0 ? (St.test(h[2]) && (s = RegExp("</" + h[2], "g")), r = A) : h[3] !== void 0 && (r = A) : r === A ? h[0] === ">" ? (r = s ?? H, c = -1) : h[1] === void 0 ? c = -2 : (c = r.lastIndex - h[2].length, d = h[1], r = h[3] === void 0 ? A : h[3] === '"' ? ft : mt) : r === ft || r === mt ? r = A : r === ut || r === pt ? r = H : (r = A, s = void 0);
    const m = r === A && n[o + 1].startsWith("/>") ? " " : "";
    a += r === H ? l + Zt : c >= 0 ? (i.push(d), l.slice(0, c) + At + l.slice(c) + w + m) : l + w + (c === -2 ? o : m);
  }
  return [Et(n, a + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class B {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let a = 0, r = 0;
    const o = t.length - 1, l = this.parts, [d, h] = Gt(t, e);
    if (this.el = B.createElement(d, i), S.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = S.nextNode()) !== null && l.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(At)) {
          const _ = h[r++], m = s.getAttribute(c).split(w), v = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: a, name: v[2], strings: m, ctor: v[1] === "." ? Ft : v[1] === "?" ? Qt : v[1] === "@" ? Xt : J }), s.removeAttribute(c);
        } else c.startsWith(w) && (l.push({ type: 6, index: a }), s.removeAttribute(c));
        if (St.test(s.tagName)) {
          const c = s.textContent.split(w), _ = c.length - 1;
          if (_ > 0) {
            s.textContent = G ? G.emptyScript : "";
            for (let m = 0; m < _; m++) s.append(c[m], j()), S.nextNode(), l.push({ type: 2, index: ++a });
            s.append(c[_], j());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ct) l.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(w, c + 1)) !== -1; ) l.push({ type: 7, index: a }), c += w.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const i = k.createElement("template");
    return i.innerHTML = t, i;
  }
}
function O(n, t, e = n, i) {
  var r, o;
  if (t === D) return t;
  let s = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const a = R(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== a && ((o = s == null ? void 0 : s._$AO) == null || o.call(s, !1), a === void 0 ? s = void 0 : (s = new a(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = O(n, s._$AS(n, t.values), s, i)), t;
}
class Jt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? k).importNode(e, !0);
    S.currentNode = s;
    let a = S.nextNode(), r = 0, o = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new V(a, a.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (d = new Yt(a, this, t)), this._$AV.push(d), l = i[++o];
      }
      r !== (l == null ? void 0 : l.index) && (a = S.nextNode(), r++);
    }
    return S.currentNode = k, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class V {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = O(this, t, e), R(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== D && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : qt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && R(this._$AH) ? this._$AA.nextSibling.data = t : this.T(k.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = B.createElement(Et(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === s) this._$AH.p(e);
    else {
      const r = new Jt(s, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = gt.get(t.strings);
    return e === void 0 && gt.set(t.strings, e = new B(t)), e;
  }
  k(t) {
    nt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const a of t) s === e.length ? e.push(i = new V(this.O(j()), this.O(j()), this, this.options)) : i = e[s], i._$AI(a), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = ht(t).nextSibling;
      ht(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class J {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, a) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, s) {
    const a = this.strings;
    let r = !1;
    if (a === void 0) t = O(this, t, e, 0), r = !R(t) || t !== this._$AH && t !== D, r && (this._$AH = t);
    else {
      const o = t;
      let l, d;
      for (t = a[0], l = 0; l < a.length - 1; l++) d = O(this, o[i + l], e, l), d === D && (d = this._$AH[l]), r || (r = !R(d) || d !== this._$AH[l]), d === p ? t = p : t !== p && (t += (d ?? "") + a[l + 1]), this._$AH[l] = d;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ft extends J {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Qt extends J {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Xt extends J {
  constructor(t, e, i, s, a) {
    super(t, e, i, s, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = O(this, t, e, 0) ?? p) === D) return;
    const i = this._$AH, s = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== p && (i === p || s);
    s && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Yt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    O(this, t);
  }
}
const Y = N.litHtmlPolyfillSupport;
Y == null || Y(B, V), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.3.2");
const te = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const a = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new V(t.insertBefore(j(), a), a, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = globalThis;
class M extends P {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = te(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return D;
  }
}
var $t;
M._$litElement$ = !0, M.finalized = !0, ($t = E.litElementHydrateSupport) == null || $t.call(E, { LitElement: M });
const tt = E.litElementPolyfillSupport;
tt == null || tt({ LitElement: M });
(E.litElementVersions ?? (E.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kt = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = { attribute: !0, type: String, converter: K, reflect: !1, hasChanged: st }, ie = (n = ee, t, e) => {
  const { kind: i, metadata: s } = e;
  let a = globalThis.litPropertyMetadata.get(s);
  if (a === void 0 && globalThis.litPropertyMetadata.set(s, a = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), a.set(e.name, n), i === "accessor") {
    const { name: r } = e;
    return { set(o) {
      const l = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(r, l, n, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(r, void 0, n, o), o;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(o) {
      const l = this[r];
      t.call(this, o), this.requestUpdate(r, l, n, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function at(n) {
  return (t, e) => typeof e == "object" ? ie(n, t, e) : ((i, s, a) => {
    const r = s.hasOwnProperty(a);
    return s.constructor.createProperty(a, i), r ? Object.getOwnPropertyDescriptor(s, a) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function F(n) {
  return at({ ...n, state: !0, attribute: !1 });
}
const z = {
  en: {
    starts_in_min: "Starts in {x} minute",
    starts_in_mins: "Starts in {x} minutes",
    starts_in_hour: "Starts in {x} hour",
    starts_in_hours: "Starts in {x} hours",
    starts_in_day: "Starts in {x} day",
    starts_in_days: "Starts in {x} days",
    starts_in_week: "Starts in {x} week",
    starts_in_weeks: "Starts in {x} weeks",
    all_day: "All day",
    loading: "Loading events...",
    no_events: "No active events",
    more_events: "+{x} more"
  },
  de: {
    starts_in_min: "Beginnt in {x} Minute",
    starts_in_mins: "Beginnt in {x} Minuten",
    starts_in_hour: "Beginnt in {x} Stunde",
    starts_in_hours: "Beginnt in {x} Stunden",
    starts_in_day: "Beginnt in {x} Tag",
    starts_in_days: "Beginnt in {x} Tagen",
    starts_in_week: "Beginnt in {x} Woche",
    starts_in_weeks: "Beginnt in {x} Wochen",
    all_day: "Ganztägig",
    loading: "Lade Termine...",
    no_events: "Keine aktiven Termine",
    more_events: "+{x} weitere"
  },
  fr: {
    starts_in_min: "Commence dans {x} minute",
    starts_in_mins: "Commence dans {x} minutes",
    starts_in_hour: "Commence dans {x} heure",
    starts_in_hours: "Commence dans {x} heures",
    starts_in_day: "Commence dans {x} jour",
    starts_in_days: "Commence dans {x} jours",
    starts_in_week: "Commence dans {x} semaine",
    starts_in_weeks: "Commence dans {x} semaines",
    all_day: "Toute la journée",
    loading: "Chargement...",
    no_events: "Aucun événement",
    more_events: "+{x} autres"
  },
  it: {
    starts_in_min: "Inizia tra {x} minuto",
    starts_in_mins: "Inizia tra {x} minuti",
    starts_in_hour: "Inizia tra {x} ora",
    starts_in_hours: "Inizia tra {x} ore",
    starts_in_day: "Inizia tra {x} giorno",
    starts_in_days: "Inizia tra {x} giorni",
    starts_in_week: "Inizia tra {x} settimana",
    starts_in_weeks: "Inizia tra {x} settimane",
    all_day: "Tutto il giorno",
    loading: "Caricamento...",
    no_events: "Nessun evento",
    more_events: "+{x} altri"
  },
  es: {
    starts_in_min: "Empieza en {x} minuto",
    starts_in_mins: "Empieza en {x} minutos",
    starts_in_hour: "Empieza en {x} hora",
    starts_in_hours: "Empieza en {x} horas",
    starts_in_day: "Empieza en {x} día",
    starts_in_days: "Empieza en {x} días",
    starts_in_week: "Empieza en {x} semana",
    starts_in_weeks: "Empieza en {x} semanas",
    all_day: "Todo el día",
    loading: "Cargando...",
    no_events: "No hay eventos",
    more_events: "+{x} más"
  },
  nl: {
    starts_in_min: "Begint over {x} minuut",
    starts_in_mins: "Begint over {x} minuten",
    starts_in_hour: "Begint over {x} uur",
    starts_in_hours: "Begint over {x} uur",
    starts_in_day: "Begint over {x} dag",
    starts_in_days: "Begint over {x} dagen",
    starts_in_week: "Begint over {x} week",
    starts_in_weeks: "Begint over {x} weken",
    all_day: "Hele dag",
    loading: "Laden...",
    no_events: "Geen evenementen",
    more_events: "+{x} meer"
  },
  pt: {
    starts_in_min: "Começa em {x} minuto",
    starts_in_mins: "Começa em {x} minutos",
    starts_in_hour: "Começa em {x} hora",
    starts_in_hours: "Começa em {x} horas",
    starts_in_day: "Começa em {x} dia",
    starts_in_days: "Começa em {x} dias",
    starts_in_week: "Começa em {x} semana",
    starts_in_weeks: "Começa em {x} semanas",
    all_day: "Todo o dia",
    loading: "A carregar...",
    no_events: "Sem eventos",
    more_events: "+{x} mais"
  },
  ru: {
    starts_in_min: "Начнется через {x} минуту",
    starts_in_mins: "Начнется через {x} мин.",
    starts_in_hour: "Начнется через {x} час",
    starts_in_hours: "Начнется через {x} ч.",
    starts_in_day: "Начнется через {x} день",
    starts_in_days: "Начнется через {x} дн.",
    starts_in_week: "Начнется через {x} неделю",
    starts_in_weeks: "Начнется через {x} нед.",
    all_day: "Весь день",
    loading: "Загрузка...",
    no_events: "Нет событий",
    more_events: "ещё +{x}"
  },
  pl: {
    starts_in_min: "Rozpoczyna się za {x} minutę",
    starts_in_mins: "Rozpoczyna się za {x} min.",
    starts_in_hour: "Rozpoczyna się za {x} godzinę",
    starts_in_hours: "Rozpoczyna się za {x} godz.",
    starts_in_day: "Rozpoczyna się za {x} dzień",
    starts_in_days: "Rozpoczyna się za {x} dni",
    starts_in_week: "Rozpoczyna się za {x} tydzień",
    starts_in_weeks: "Rozpoczyna się za {x} tyg.",
    all_day: "Cały dzień",
    loading: "Ładowanie...",
    no_events: "Brak wydarzeń",
    more_events: "+{x} więcej"
  },
  sv: {
    starts_in_min: "Börjar om {x} minut",
    starts_in_mins: "Börjar om {x} minuter",
    starts_in_hour: "Börjar om {x} timme",
    starts_in_hours: "Börjar om {x} timmar",
    starts_in_day: "Börjar om {x} dag",
    starts_in_days: "Börjar om {x} dagar",
    starts_in_week: "Börjar om {x} vecka",
    starts_in_weeks: "Börjar om {x} veckor",
    all_day: "Hela dagen",
    loading: "Laddar...",
    no_events: "Inga händelser",
    more_events: "+{x} till"
  },
  da: {
    starts_in_min: "Starter om {x} minut",
    starts_in_mins: "Starter om {x} minutter",
    starts_in_hour: "Starter om {x} time",
    starts_in_hours: "Starter om {x} timer",
    starts_in_day: "Starter om {x} dag",
    starts_in_days: "Starter om {x} dage",
    starts_in_week: "Starter om {x} uge",
    starts_in_weeks: "Starter om {x} uger",
    all_day: "Hele dagen",
    loading: "Indlæser...",
    no_events: "Ingen begivenheder",
    more_events: "+{x} mere"
  },
  no: {
    starts_in_min: "Starter om {x} minutt",
    starts_in_mins: "Starter om {x} minutter",
    starts_in_hour: "Starter om {x} time",
    starts_in_hours: "Starter om {x} timer",
    starts_in_day: "Starter om {x} dag",
    starts_in_days: "Starter om {x} dager",
    starts_in_week: "Starter om {x} uke",
    starts_in_weeks: "Starter om {x} uker",
    all_day: "Hele dagen",
    loading: "Laster...",
    no_events: "Ingen hendelser",
    more_events: "+{x} til"
  },
  fi: {
    starts_in_min: "Alkaa {x} minuutin kuluttua",
    starts_in_mins: "Alkaa {x} minuutin kuluttua",
    starts_in_hour: "Alkaa {x} tunnin kuluttua",
    starts_in_hours: "Alkaa {x} tunnin kuluttua",
    starts_in_day: "Alkaa {x} päivän kuluttua",
    starts_in_days: "Alkaa {x} päivän kuluttua",
    starts_in_week: "Alkaa {x} viikon kuluttua",
    starts_in_weeks: "Alkaa {x} viikon kuluttua",
    all_day: "Koko päivä",
    loading: "Ladataan...",
    no_events: "Ei tapahtumia",
    more_events: "+{x} lisää"
  },
  cs: {
    starts_in_min: "Začíná za {x} minutu",
    starts_in_mins: "Začíná za {x} minut",
    starts_in_hour: "Začíná za {x} hodinu",
    starts_in_hours: "Začíná za {x} hodin",
    starts_in_day: "Začíná za {x} den",
    starts_in_days: "Začíná za {x} dní",
    starts_in_week: "Začíná za {x} týden",
    starts_in_weeks: "Začíná za {x} týdnů",
    all_day: "Celý den",
    loading: "Načítání...",
    no_events: "Žádné události",
    more_events: "+{x} další"
  },
  hu: {
    starts_in_min: "Kezdés {x} perc múlva",
    starts_in_mins: "Kezdés {x} perc múlva",
    starts_in_hour: "Kezdés {x} óra múlva",
    starts_in_hours: "Kezdés {x} óra múlva",
    starts_in_day: "Kezdés {x} nap múlva",
    starts_in_days: "Kezdés {x} nap múlva",
    starts_in_week: "Kezdés {x} hét múlva",
    starts_in_weeks: "Kezdés {x} hét múlva",
    all_day: "Egész nap",
    loading: "Betöltés...",
    no_events: "Nincs esemény",
    more_events: "+{x} további"
  }
};
function f(n, t, e, i) {
  var r;
  const s = ((r = n.locale) == null ? void 0 : r.language) || n.language || "en";
  let a;
  if (z[s] && z[s][t])
    a = z[s][t];
  else if (z.en && z.en[t])
    a = z.en[t];
  else
    return t;
  return e && i && (a = a.replace(e, i)), a;
}
function se(n, t, e) {
  const i = (e == null ? void 0 : e.multiple_events) || !1;
  if (t === void 0)
    return u`
        <div class="calendar-container">
            <div class="calendar-item" style="cursor: default;">
                 <div class="calendar-icon" style="background-color: var(--primary-color, #03a9f4);">
                    <ha-icon icon="mdi:calendar-clock"></ha-icon>
                </div>
                <div class="calendar-content">
                    <div class="event-title">${f(n, "loading")}</div>
                </div>
            </div>
        </div>
        `;
  if (t.length === 0)
    return u`
        <div class="calendar-container">
            <div class="calendar-item" style="cursor: default;">
                 <div class="calendar-icon" style="background-color: var(--disabled-text-color, #bdbdbb);">
                    <ha-icon icon="mdi:calendar-remove"></ha-icon>
                </div>
                <div class="calendar-content">
                    <div class="event-title">${f(n, "no_events")}</div>
                </div>
            </div>
        </div>
        `;
  if (!i) {
    const s = t[0], a = t.length - 1, r = s.summary;
    let o, l;
    try {
      if (o = new Date(s.start.dateTime || s.start.date), l = new Date(s.end.dateTime || s.end.date), isNaN(o.getTime()) || isNaN(l.getTime())) throw new Error("Invalid Date");
    } catch {
      return u`<div class="error">Date Error</div>`;
    }
    const d = /* @__PURE__ */ new Date(), h = !s.start.dateTime;
    let c;
    if (o > d) {
      const g = o.getTime() - d.getTime(), x = Math.ceil(g / 6e4);
      c = xt(n, x);
    } else if (h)
      c = f(n, "all_day");
    else {
      const g = (x) => x.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      c = `${g(o)} - ${g(l)}`;
    }
    a > 0 && (c += ` ${f(n, "more_events", "{x}", a.toString())}`);
    const m = o <= d && l >= d ? d : o, v = vt(s.entity_id, e), T = yt(m, v);
    return u`
            <div class="calendar-container">
                <div class="calendar-item"  
                     title="${r}"
                     @click=${(g) => ae(g, t)}>
                     <div class="calendar-icon dynamic">
                        ${T}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title">${r}</div>
                        <div class="event-time">${c}</div>
                    </div>
                    <ha-icon-button icon="mdi:chevron-right"></ha-icon-button>
                </div>
            </div>
        `;
  }
  return u`
        <div class="calendar-container">
            ${t.map((s, a) => {
    const r = s.summary;
    let o, l;
    try {
      if (o = new Date(s.start.dateTime || s.start.date), l = new Date(s.end.dateTime || s.end.date), isNaN(o.getTime())) throw new Error("Invalid start date");
      if (isNaN(l.getTime())) throw new Error("Invalid end date");
    } catch {
      return u`<div class="error">Date Error for ${r}</div>`;
    }
    const d = /* @__PURE__ */ new Date(), h = !s.start.dateTime;
    let c, _ = -1;
    if (o > d) {
      const y = o.getTime() - d.getTime(), Z = Math.ceil(y / 6e4);
      c = xt(n, Z);
    } else if (h)
      c = f(n, "all_day");
    else {
      const y = (zt) => zt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      c = `${y(o)} - ${y(l)}`;
      const Z = l.getTime() - o.getTime(), Tt = d.getTime() - o.getTime();
      Z > 0 && (_ = Math.max(0, Math.min(100, Tt / Z * 100)));
    }
    const v = o <= d && l >= d ? d : o, T = vt(s.entity_id, e), g = yt(v, T), x = (e == null ? void 0 : e.show_calendar_divider) && a > 0 && t[a - 1].entity_id !== s.entity_id;
    return u`
                ${x ? u`<div class="calendar-divider"></div>` : ""}
                <div class="calendar-item"  
                     style="margin-bottom: 6px;"
                     title="${r}"
                     @click=${(y) => re(y, s.entity_id)}>
                     <div class="calendar-icon dynamic">
                        ${g}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title">${r}</div>
                        <div class="event-time">${c}</div>
                        ${_ >= 0 ? u`
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${_}%"></div>
                            </div>
                        ` : ""}
                    </div>
                </div>
                `;
  })}
        </div>
    `;
}
function vt(n, t) {
  var i;
  const e = ((i = t == null ? void 0 : t.calendar_colors) == null ? void 0 : i[n]) || (t == null ? void 0 : t.calendar_icon_color) || "#fa3e3e";
  return ne(e);
}
function ne(n) {
  return n.startsWith("#") || n.startsWith("rgb") || n.startsWith("hsl") || n.startsWith("var") ? n : `var(--${n}-color)`;
}
function ae(n, t) {
  const e = new CustomEvent("calendar-card-show-detail", {
    bubbles: !0,
    composed: !0,
    detail: {
      title: "Upcoming Events",
      entities: t
    }
  });
  n.target.dispatchEvent(e);
}
function re(n, t) {
  const e = new CustomEvent("hass-more-info", {
    bubbles: !0,
    composed: !0,
    detail: { entityId: t }
  });
  n.target.dispatchEvent(e);
}
function yt(n, t) {
  const e = n.toLocaleDateString([], { month: "short" }).toUpperCase(), i = n.getDate();
  return u`
        <svg viewBox="0 0 100 100" class="dynamic-calendar-icon" style="width: 100%; height: 100%; display: block;">
            <rect x="0" y="0" width="100" height="100" rx="20" ry="20" fill="white"></rect>
            <path d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z" fill="${t}"></path>
            <text x="50" y="23" font-family="sans-serif" font-size="22" font-weight="bold" fill="white" text-anchor="middle">${e}</text>
            <text x="50" y="82" font-family="sans-serif" font-size="52" font-weight="bold" fill="#333" text-anchor="middle">${i}</text>
        </svg>
    `;
}
function xt(n, t) {
  if (t < 60)
    return t === 1 ? f(n, "starts_in_min", "{x}", t.toString()) : f(n, "starts_in_mins", "{x}", t.toString());
  if (t < 1440) {
    const i = Math.round(t / 60);
    return i === 1 ? f(n, "starts_in_hour", "{x}", i.toString()) : f(n, "starts_in_hours", "{x}", i.toString());
  }
  if (t < 43200) {
    const i = Math.round(t / 1440);
    return i === 1 ? f(n, "starts_in_day", "{x}", i.toString()) : f(n, "starts_in_days", "{x}", i.toString());
  }
  const e = Math.round(t / 10080);
  return e === 1 ? f(n, "starts_in_week", "{x}", e.toString()) : f(n, "starts_in_weeks", "{x}", e.toString());
}
var oe = Object.defineProperty, le = Object.getOwnPropertyDescriptor, W = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? le(t, e) : t, a = n.length - 1, r; a >= 0; a--)
    (r = n[a]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && oe(t, e, s), s;
};
let U = class extends M {
  constructor() {
    super(...arguments);
    $(this, "hass");
    $(this, "config");
    $(this, "_detailPopup", { open: !1, title: "", events: [] });
    $(this, "_events");
    $(this, "_handleShowDetail", (t) => {
      this._detailPopup = {
        open: !0,
        title: t.detail.title,
        events: t.detail.entities
      }, this.requestUpdate();
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("calendar-card-show-detail", this._handleShowDetail);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("calendar-card-show-detail", this._handleShowDetail);
  }
  willUpdate(t) {
    super.willUpdate(t), this.hass && this.config && (this._events === void 0 || t.has("config")) && this._fetchEvents();
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this.config = t;
  }
  async _fetchEvents() {
    if (!this.hass || !this.config) return;
    const t = this.config.max_minutes_until_start || 1440, e = /* @__PURE__ */ new Date(), i = new Date(e.getTime() + t * 6e4), s = Object.keys(this.hass.states).filter((r) => r.startsWith("calendar.")).filter((r) => {
      var o;
      return !((o = this.config.exclude_entities) != null && o.includes(r));
    });
    if (s.length === 0) {
      this._events = [];
      return;
    }
    const a = await Ut(this.hass, e, i, s);
    a.sort((r, o) => {
      const l = new Date(r.start.dateTime || r.start.date).getTime(), d = new Date(o.start.dateTime || o.start.date).getTime();
      return l - d;
    }), this._events = a, this.requestUpdate();
  }
  _closeDetailPopup() {
    this._detailPopup = { ...this._detailPopup, open: !1 }, this.requestUpdate();
  }
  render() {
    if (!this.config || !this.hass)
      return u``;
    const t = se(this.hass, this._events, this.config);
    return u`
            <ha-card>
                ${t}

                ${this._detailPopup.open ? u`
                    <ha-dialog
                        open
                        hideActions
                        @closed=${this._closeDetailPopup}
                        class="detail-dialog"
                    >
                        <div class="dialog-header">
                            <ha-icon-button .path=${Ot} @click=${this._closeDetailPopup}></ha-icon-button>
                            <h2 class="mdc-dialog__title">${this._detailPopup.title}</h2>
                        </div>
                        <div class="dialog-content">
                            ${this._renderGroupedEntities(this._detailPopup.events)}
                        </div>
                    </ha-dialog>
                ` : ""}
            </ha-card>
        `;
  }
  _renderGroupedEntities(t) {
    return t.map((e) => {
      const i = e.summary;
      let s = "", a, r;
      try {
        a = new Date(e.start.dateTime || e.start.date), r = new Date(e.end.dateTime || e.end.date);
      } catch {
        return u`<div class="error">Date Error</div>`;
      }
      const o = /* @__PURE__ */ new Date(), l = !e.start.dateTime;
      if (a > o)
        s = this._formatRelativeTime(a);
      else if (l)
        s = "Ganztägig";
      else {
        const d = (h) => h.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        s = `${d(a)} - ${d(r)}`;
      }
      return u`
            <div class="event-item" @click=${() => this._handleMoreInfo(e.entity_id)}>
                <div class="event-icon">
                     <ha-state-icon .hass=${this.hass} .stateObj=${this.hass.states[e.entity_id]}></ha-state-icon>
                </div>
                <div class="event-info">
                    <div class="event-name">${i}</div>
                    <div class="event-state">${s}</div>
                </div>
            </div>
            `;
    });
  }
  _formatRelativeTime(t) {
    const e = /* @__PURE__ */ new Date(), i = t.getTime() - e.getTime(), s = Math.ceil(i / 6e4), a = Math.floor(s / 60), r = Math.floor(a / 24);
    return s < 60 ? `In ${s} min` : a < 24 ? `In ${a} hour${a > 1 ? "s" : ""}` : r < 7 ? `In ${r} day${r > 1 ? "s" : ""}` : t.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
  }
  _handleMoreInfo(t) {
    const e = new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: t }
    });
    this.dispatchEvent(e);
  }
  static get styles() {
    return bt`
            :host {
                display: block;
            }
            ha-card {
                height: 100%;
                box-sizing: border-box;
                padding: 12px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            
            /* Calendar Styles ported from module */
            .calendar-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 100%;
                width: 100%;
            }
            .calendar-item {
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
            }
            .calendar-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: var(--primary-color, #03a9f4);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                flex-shrink: 0;
            }
            .calendar-icon ha-icon {
                --mdc-icon-size: 20px;
            }
            .calendar-content {
                display: flex;
                flex-direction: column;
                overflow: hidden;
                flex: 1;
            }
            .event-title {
                font-size: 14px;
                font-weight: 500;
                color: var(--primary-text-color);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .event-time {
                font-size: 12px;
                color: var(--secondary-text-color);
            }
            .progress-bar {
                margin-top: 4px;
                height: 4px;
                background-color: var(--secondary-background-color, #444);
                border-radius: 2px;
                overflow: hidden;
                width: 100%;
            }
            .progress-fill {
                height: 100%;
                background-color: var(--primary-text-color, #fff);
                border-radius: 2px;
                opacity: 0.7;
            }
            .calendar-divider {
                width: 100%;
                border-top: 1px solid var(--divider-color, #e0e0e0);
                margin: 0 0 4px ;
            }

            /* Dialog Styles */
            ha-dialog {
                --mdc-dialog-min-width: 400px;
                --mdc-dialog-max-width: 600px;
                --dialog-content-padding: 12px;
            }

            .dialog-header {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 8px;
                position: sticky;
                top: 0;
                z-index: 10;
                border-bottom: 1px solid rgba(0, 0, 0, 0.07);
                background: var(--mdc-theme-surface, #fff);
            }
            h2.mdc-dialog__title {
                margin: 0;
                font-size: 1.25rem;
                font-weight: 500;
            }
            .dialog-content {
                display: flex;
                flex-direction: column;
                gap: 16px;
                padding: 16px;
            }

            /* Simple Event Item Styles */
            .event-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background-color: var(--ha-card-background, var(--card-background-color, #fff));
                border: 1px solid var(--ha-card-border-color, var(--divider-color, #e0e0e0));
                border-radius: 8px;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            .event-item:hover {
                background-color: rgba(var(--rgb-primary-text-color), 0.05);
            }
            .event-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: var(--secondary-background-color);
                color: var(--primary-text-color);
                flex-shrink: 0;
            }
            .event-info {
                display: flex;
                flex-direction: column;
                flex: 1;
                overflow: hidden;
            }
            .event-name {
                font-weight: 500;
                font-size: 14px;
                color: var(--primary-text-color);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .event-state {
                font-size: 12px;
                color: var(--secondary-text-color);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        `;
  }
  getCardSize() {
    return 1;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => he), document.createElement("calendar-card-plus-editor");
  }
  static getStubConfig(t) {
    return {
      type: "custom:calendar-card-plus",
      exclude_entities: [],
      multiple_events: !1
    };
  }
};
W([
  at({ attribute: !1 })
], U.prototype, "hass", 2);
W([
  F()
], U.prototype, "config", 2);
W([
  F()
], U.prototype, "_detailPopup", 2);
W([
  F()
], U.prototype, "_events", 2);
U = W([
  kt("calendar-card-plus")
], U);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "calendar-card-plus",
  name: "Dynamic Calendar Card Plus",
  preview: !0,
  description: "A standalone calendar card with dynamic grid styling"
});
const C = (n, t, e, i) => {
  i = i || {}, e = e ?? {};
  const s = new Event(t, {
    bubbles: i.bubbles === void 0 ? !0 : i.bubbles,
    cancelable: !!i.cancelable,
    composed: i.composed === void 0 ? !0 : i.composed
  });
  return s.detail = e, n.dispatchEvent(s), s;
};
var de = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, rt = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? ce(t, e) : t, a = n.length - 1, r; a >= 0; a--)
    (r = n[a]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && de(t, e, s), s;
};
let I = class extends M {
  constructor() {
    super(...arguments);
    $(this, "hass");
    $(this, "_config", { type: "custom:calendar-card-plus" });
  }
  set config(t) {
    this.setConfig(t);
  }
  setConfig(t) {
    this._config = t, this.requestUpdate();
  }
  render() {
    if (!this.hass)
      return u``;
    const t = this._config.show_all ?? !1, e = this._config.multiple_events ?? !1, i = this._config.max_minutes_until_start ?? 1440, s = this._config.exclude_entities ?? [];
    return u`
            <div class="card-config">


                <div class="settings-row">
                    <span class="label">Show entries even if not running</span>
                    <ha-switch
                        .checked=${t}
                        @change=${this._calendarShowAllChanged}
                    ></ha-switch>
                </div>

                <div class="settings-row">
                    <span class="label">Multiple Events</span>
                    <ha-switch
                        .checked=${e}
                        @change=${this._compactModeChanged}
                    ></ha-switch>
                </div>

                <div class="settings-row">
                    <ha-textfield
                        label="Lookahead (minutes)"
                        type="number"
                        .value=${i}
                        @input=${this._calendarLookAheadChanged}
                    ></ha-textfield>
                </div>

                <div class="settings-row">
                    <span class="label">Show Calendar Divider</span>
                    <ha-switch
                        .checked=${this._config.show_calendar_divider ?? !1}
                        @change=${this._calendarDividerChanged}
                    ></ha-switch>
                </div>

                <div class="settings-row full-width">
                    <ha-selector
                        .hass=${this.hass}
                        .selector=${{ ui_color: {} }}
                        .value=${this._config.calendar_icon_color || ""}
                        .label=${"Global Icon Color"}
                        .configValue=${"calendar_icon_color"}
                        @value-changed=${this._valueChanged}
                    ></ha-selector>
                </div>

                <h4>Include Calendars</h4>
                <div class="entities-list">
                    ${this._getCalendarEntities().map((a) => {
      var l;
      const r = !s.includes(a.entity_id), o = ((l = this._config.calendar_colors) == null ? void 0 : l[a.entity_id]) || "";
      return u`
                            <div class="entity-row ${r ? "" : "disabled"}">
                                <div class="entity-row-top">
                                    <div class="entity-icon">
                                        <ha-svg-icon .path=${Dt}></ha-svg-icon>
                                    </div>
                                    <div class="entity-info">
                                        <span class="entity-name">${a.attributes.friendly_name || a.entity_id}</span>
                                        <span class="entity-id">${a.entity_id}</span>
                                    </div>
                                    <ha-button
                                        size="small" 
                                        appearance="filled" 
                                        variant="brand" 
                                        class="${r ? "action-hide" : "action-show"}"
                                        @click=${(d) => this._calendarToggleEntity(d, a.entity_id)}
                                    >
                                        ${r ? "Hide" : "Show"}
                                    </ha-button>
                                </div>
                                <div class="entity-row-bottom">
                                     <ha-selector
                                        .hass=${this.hass}
                                        .selector=${{ ui_color: {} }}
                                        .value=${o}
                                        .label=${"Color"}
                                        @value-changed=${(d) => this._calendarColorChanged(d, a.entity_id)}
                                    ></ha-selector>
                                </div>
                            </div>
                        `;
    })}
                </div>
            </div>
        `;
  }
  _getCalendarEntities() {
    return this.hass ? Object.keys(this.hass.states).filter((t) => t.startsWith("calendar.")).map((t) => {
      var e;
      return (e = this.hass) == null ? void 0 : e.states[t];
    }) : [];
  }
  _calendarToggleEntity(t, e) {
    t.stopPropagation();
    const i = [...this._config.exclude_entities ?? []], s = i.indexOf(e);
    s === -1 ? i.push(e) : i.splice(s, 1), this._config = {
      ...this._config,
      exclude_entities: i
    }, C(this, "config-changed", { config: this._config });
  }
  _calendarShowAllChanged(t) {
    const e = t.target.checked;
    this._config = {
      ...this._config,
      show_all: e
    }, C(this, "config-changed", { config: this._config });
  }
  _calendarLookAheadChanged(t) {
    const e = parseInt(t.target.value);
    isNaN(e) || (this._config = {
      ...this._config,
      max_minutes_until_start: e
    }, C(this, "config-changed", { config: this._config }));
  }
  _compactModeChanged(t) {
    const e = t.target.checked;
    this._config = {
      ...this._config,
      multiple_events: e
    }, C(this, "config-changed", { config: this._config });
  }
  _calendarDividerChanged(t) {
    const e = t.target.checked;
    this._config = {
      ...this._config,
      show_calendar_divider: e
    }, C(this, "config-changed", { config: this._config });
  }
  _valueChanged(t) {
    var s;
    if (!this._config || !this.hass)
      return;
    const e = t.target, i = ((s = t.detail) == null ? void 0 : s.value) ?? e.value;
    this._config[e.configValue] !== i && e.configValue && (this._config = {
      ...this._config,
      [e.configValue]: i
    }, C(this, "config-changed", { config: this._config }));
  }
  _calendarColorChanged(t, e) {
    const i = t.detail.value, s = this._config.calendar_colors || {};
    this._config = {
      ...this._config,
      calendar_colors: {
        ...s,
        [e]: i
      }
    }, C(this, "config-changed", { config: this._config });
  }
  static get styles() {
    return bt`
            .card-config {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .ha-select {
                padding: 8px;
                border-radius: 4px;
                border: 1px solid var(--divider-color, #eee);
                background: var(--card-background-color, #fff);
                color: var(--primary-text-color);
                width: 50%;
            }
            .settings-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                width: 100%;
            }
            .settings-row.full-width {
                flex-direction: column;
                align-items: stretch;
            }
            .settings-row.full-width ha-selector {
                width: 100%;
            }
            .entities-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding-bottom: 12px;
            }
            .entity-row {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding: 12px;
                border: 1px solid var(--divider-color, #eee);
                border-radius: 8px;
                transition: opacity 0.2s;
            }
            .entity-row-top {
                display: flex;
                align-items: center;
                gap: 12px;
                width: 100%;
            }
            .entity-row-bottom {
                width: 100%;
            }
            .entity-row.disabled {
                opacity: 0.6;
            }
            .entity-icon {
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--secondary-text-color);
            }
            .entity-info {
                flex: 1;
                display: flex;
                flex-direction: column;
            }
            .entity-name {
                font-weight: 500;
            }
            .entity-id {
                font-size: 0.85em;
                color: var(--secondary-text-color);
            }
            .action-hide {
                --mdc-theme-primary: var(--error-color, #db4437);
            }
            .action-show {
                --mdc-theme-primary: var(--primary-color, #03a9f4);
            }
            h4 {
                margin-bottom: 0px;
                margin-top: 8px;
            }
            ha-textfield {
                width: 100%;
            }
        `;
  }
};
rt([
  at({ attribute: !1 })
], I.prototype, "hass", 2);
rt([
  F()
], I.prototype, "_config", 2);
I = rt([
  kt("calendar-card-plus-editor")
], I);
const he = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get CalendarCardPlusEditor() {
    return I;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  U as CalendarCardPlus
};
