var tt = Object.defineProperty;
var at = (s, e, t) => e in s ? tt(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var z = (s, e, t) => at(s, typeof e != "symbol" ? e + "" : e, t);
var it = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
async function st(s, e, t, a) {
  const i = encodeURI(`?start=${e.toISOString()}&end=${t.toISOString()}`), n = a.map(async (l) => {
    try {
      const d = await s.callApi("GET", `calendars/${l}${i}`);
      if (!Array.isArray(d))
        throw new Error("Response is not an array");
      return d.map((_) => {
        var g, f, C, $, c, y;
        const u = ((g = _.start) == null ? void 0 : g.dateTime) || ((f = _.start) == null ? void 0 : f.date) || _.start, h = ((C = _.end) == null ? void 0 : C.dateTime) || (($ = _.end) == null ? void 0 : $.date) || _.end;
        return {
          ..._,
          start: { dateTime: u.includes("T") ? u : void 0, date: u.includes("T") ? void 0 : u },
          end: { dateTime: h.includes("T") ? h : void 0, date: h.includes("T") ? void 0 : h },
          summary: _.summary || _.title || "Unknown Event",
          entity_id: l,
          calendar_name: ((y = (c = s.states[l]) == null ? void 0 : c.attributes) == null ? void 0 : y.friendly_name) || l
        };
      });
    } catch {
      const r = s.states[l];
      return r && r.attributes.start_time && r.attributes.end_time ? [{
        start: { dateTime: r.attributes.start_time.replace(" ", "T") },
        end: { dateTime: r.attributes.end_time.replace(" ", "T") },
        summary: r.attributes.message || r.attributes.friendly_name,
        location: r.attributes.location,
        description: r.attributes.description,
        entity_id: l,
        calendar_name: r.attributes.friendly_name || l
      }] : [];
    }
  });
  return (await Promise.all(n)).flat();
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = globalThis, Ce = ue.ShadowRoot && (ue.ShadyCSS === void 0 || ue.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ae = Symbol(), Me = /* @__PURE__ */ new WeakMap();
let qe = class {
  constructor(e, t, a) {
    if (this._$cssResult$ = !0, a !== Ae) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ce && e === void 0) {
      const a = t !== void 0 && t.length === 1;
      a && (e = Me.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), a && Me.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const nt = (s) => new qe(typeof s == "string" ? s : s + "", void 0, Ae), Ee = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((a, i, n) => a + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new qe(t, s, Ae);
}, ot = (s, e) => {
  if (Ce) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const a = document.createElement("style"), i = ue.litNonce;
    i !== void 0 && a.setAttribute("nonce", i), a.textContent = t.cssText, s.appendChild(a);
  }
}, Le = Ce ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const a of e.cssRules) t += a.cssText;
  return nt(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: rt, defineProperty: dt, getOwnPropertyDescriptor: lt, getOwnPropertyNames: ct, getOwnPropertySymbols: _t, getPrototypeOf: ht } = Object, U = globalThis, je = U.trustedTypes, ut = je ? je.emptyScript : "", fe = U.reactiveElementPolyfillSupport, ae = (s, e) => s, me = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? ut : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, ze = (s, e) => !rt(s, e), Oe = { attribute: !0, type: String, converter: me, reflect: !1, useDefault: !1, hasChanged: ze };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), U.litPropertyMetadata ?? (U.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Y = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Oe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const a = Symbol(), i = this.getPropertyDescriptor(e, a, t);
      i !== void 0 && dt(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, a) {
    const { get: i, set: n } = lt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: i, set(o) {
      const l = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(e, l, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Oe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ae("elementProperties"))) return;
    const e = ht(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ae("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ae("properties"))) {
      const t = this.properties, a = [...ct(t), ..._t(t)];
      for (const i of a) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [a, i] of t) this.elementProperties.set(a, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, a] of this.elementProperties) {
      const i = this._$Eu(t, a);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const a = new Set(e.flat(1 / 0).reverse());
      for (const i of a) t.unshift(Le(i));
    } else e !== void 0 && t.push(Le(e));
    return t;
  }
  static _$Eu(e, t) {
    const a = t.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const a of t.keys()) this.hasOwnProperty(a) && (e.set(a, this[a]), delete this[a]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ot(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var a;
      return (a = t.hostConnected) == null ? void 0 : a.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var a;
      return (a = t.hostDisconnected) == null ? void 0 : a.call(t);
    });
  }
  attributeChangedCallback(e, t, a) {
    this._$AK(e, a);
  }
  _$ET(e, t) {
    var n;
    const a = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, a);
    if (i !== void 0 && a.reflect === !0) {
      const o = (((n = a.converter) == null ? void 0 : n.toAttribute) !== void 0 ? a.converter : me).toAttribute(t, a.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, o;
    const a = this.constructor, i = a._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const l = a.getPropertyOptions(i), d = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : me;
      this._$Em = i;
      const r = d.fromAttribute(t, l.type);
      this[i] = r ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? r, this._$Em = null;
    }
  }
  requestUpdate(e, t, a, i = !1, n) {
    var o;
    if (e !== void 0) {
      const l = this.constructor;
      if (i === !1 && (n = this[e]), a ?? (a = l.getPropertyOptions(e)), !((a.hasChanged ?? ze)(n, t) || a.useDefault && a.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(l._$Eu(e, a)))) return;
      this.C(e, t, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: a, reflect: i, wrapped: n }, o) {
    a && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || a || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var a;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: l } = o, d = this[n];
        l !== !0 || this._$AL.has(n) || d === void 0 || this.C(n, void 0, o, d);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (a = this._$EO) == null || a.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((a) => {
      var i;
      return (i = a.hostUpdated) == null ? void 0 : i.call(a);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Y.elementStyles = [], Y.shadowRootOptions = { mode: "open" }, Y[ae("elementProperties")] = /* @__PURE__ */ new Map(), Y[ae("finalized")] = /* @__PURE__ */ new Map(), fe == null || fe({ ReactiveElement: Y }), (U.reactiveElementVersions ?? (U.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = globalThis, Be = (s) => s, pe = ie.trustedTypes, Ne = pe ? pe.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Fe = "$lit$", H = `lit$${Math.random().toFixed(9).slice(2)}$`, Ye = "?" + H, mt = `<${Ye}>`, q = document, re = () => q.createComment(""), de = (s) => s === null || typeof s != "object" && typeof s != "function", Se = Array.isArray, pt = (s) => Se(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", $e = `[ 	
\f\r]`, te = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, He = /-->/g, Ue = />/g, I = RegExp(`>|${$e}(?:([^\\s"'>=/]+)(${$e}*=${$e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Re = /'/g, Ie = /"/g, Ge = /^(?:script|style|textarea|title)$/i, vt = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), p = vt(1), G = Symbol.for("lit-noChange"), D = Symbol.for("lit-nothing"), Ve = /* @__PURE__ */ new WeakMap(), K = q.createTreeWalker(q, 129);
function Qe(s, e) {
  if (!Se(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ne !== void 0 ? Ne.createHTML(e) : e;
}
const gt = (s, e) => {
  const t = s.length - 1, a = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = te;
  for (let l = 0; l < t; l++) {
    const d = s[l];
    let r, _, u = -1, h = 0;
    for (; h < d.length && (o.lastIndex = h, _ = o.exec(d), _ !== null); ) h = o.lastIndex, o === te ? _[1] === "!--" ? o = He : _[1] !== void 0 ? o = Ue : _[2] !== void 0 ? (Ge.test(_[2]) && (i = RegExp("</" + _[2], "g")), o = I) : _[3] !== void 0 && (o = I) : o === I ? _[0] === ">" ? (o = i ?? te, u = -1) : _[1] === void 0 ? u = -2 : (u = o.lastIndex - _[2].length, r = _[1], o = _[3] === void 0 ? I : _[3] === '"' ? Ie : Re) : o === Ie || o === Re ? o = I : o === He || o === Ue ? o = te : (o = I, i = void 0);
    const g = o === I && s[l + 1].startsWith("/>") ? " " : "";
    n += o === te ? d + mt : u >= 0 ? (a.push(r), d.slice(0, u) + Fe + d.slice(u) + H + g) : d + H + (u === -2 ? l : g);
  }
  return [Qe(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), a];
};
class le {
  constructor({ strings: e, _$litType$: t }, a) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = e.length - 1, d = this.parts, [r, _] = gt(e, t);
    if (this.el = le.createElement(r, a), K.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = K.nextNode()) !== null && d.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(Fe)) {
          const h = _[o++], g = i.getAttribute(u).split(H), f = /([.?@])?(.*)/.exec(h);
          d.push({ type: 1, index: n, name: f[2], strings: g, ctor: f[1] === "." ? wt : f[1] === "?" ? ft : f[1] === "@" ? $t : ve }), i.removeAttribute(u);
        } else u.startsWith(H) && (d.push({ type: 6, index: n }), i.removeAttribute(u));
        if (Ge.test(i.tagName)) {
          const u = i.textContent.split(H), h = u.length - 1;
          if (h > 0) {
            i.textContent = pe ? pe.emptyScript : "";
            for (let g = 0; g < h; g++) i.append(u[g], re()), K.nextNode(), d.push({ type: 2, index: ++n });
            i.append(u[h], re());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ye) d.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(H, u + 1)) !== -1; ) d.push({ type: 7, index: n }), u += H.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const a = q.createElement("template");
    return a.innerHTML = e, a;
  }
}
function Q(s, e, t = s, a) {
  var o, l;
  if (e === G) return e;
  let i = a !== void 0 ? (o = t._$Co) == null ? void 0 : o[a] : t._$Cl;
  const n = de(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, t, a)), a !== void 0 ? (t._$Co ?? (t._$Co = []))[a] = i : t._$Cl = i), i !== void 0 && (e = Q(s, i._$AS(s, e.values), i, a)), e;
}
class yt {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: a } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? q).importNode(t, !0);
    K.currentNode = i;
    let n = K.nextNode(), o = 0, l = 0, d = a[0];
    for (; d !== void 0; ) {
      if (o === d.index) {
        let r;
        d.type === 2 ? r = new _e(n, n.nextSibling, this, e) : d.type === 1 ? r = new d.ctor(n, d.name, d.strings, this, e) : d.type === 6 && (r = new xt(n, this, e)), this._$AV.push(r), d = a[++l];
      }
      o !== (d == null ? void 0 : d.index) && (n = K.nextNode(), o++);
    }
    return K.currentNode = q, i;
  }
  p(e) {
    let t = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(e, a, t), t += a.strings.length - 2) : a._$AI(e[t])), t++;
  }
}
class _e {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, a, i) {
    this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = a, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = Q(this, e, t), de(e) ? e === D || e == null || e === "" ? (this._$AH !== D && this._$AR(), this._$AH = D) : e !== this._$AH && e !== G && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : pt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== D && de(this._$AH) ? this._$AA.nextSibling.data = e : this.T(q.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: a } = e, i = typeof a == "number" ? this._$AC(e) : (a.el === void 0 && (a.el = le.createElement(Qe(a.h, a.h[0]), this.options)), a);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(t);
    else {
      const o = new yt(i, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Ve.get(e.strings);
    return t === void 0 && Ve.set(e.strings, t = new le(e)), t;
  }
  k(e) {
    Se(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let a, i = 0;
    for (const n of e) i === t.length ? t.push(a = new _e(this.O(re()), this.O(re()), this, this.options)) : a = t[i], a._$AI(n), i++;
    i < t.length && (this._$AR(a && a._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var a;
    for ((a = this._$AP) == null ? void 0 : a.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = Be(e).nextSibling;
      Be(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class ve {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, a, i, n) {
    this.type = 1, this._$AH = D, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = D;
  }
  _$AI(e, t = this, a, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = Q(this, e, t, 0), o = !de(e) || e !== this._$AH && e !== G, o && (this._$AH = e);
    else {
      const l = e;
      let d, r;
      for (e = n[0], d = 0; d < n.length - 1; d++) r = Q(this, l[a + d], t, d), r === G && (r = this._$AH[d]), o || (o = !de(r) || r !== this._$AH[d]), r === D ? e = D : e !== D && (e += (r ?? "") + n[d + 1]), this._$AH[d] = r;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class wt extends ve {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === D ? void 0 : e;
  }
}
class ft extends ve {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== D);
  }
}
class $t extends ve {
  constructor(e, t, a, i, n) {
    super(e, t, a, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Q(this, e, t, 0) ?? D) === G) return;
    const a = this._$AH, i = e === D && a !== D || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive, n = e !== D && (a === D || i);
    i && this.element.removeEventListener(this.name, this, a), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class xt {
  constructor(e, t, a) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Q(this, e);
  }
}
const xe = ie.litHtmlPolyfillSupport;
xe == null || xe(le, _e), (ie.litHtmlVersions ?? (ie.litHtmlVersions = [])).push("3.3.2");
const bt = (s, e, t) => {
  const a = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = a._$litPart$;
  if (i === void 0) {
    const n = (t == null ? void 0 : t.renderBefore) ?? null;
    a._$litPart$ = i = new _e(e.insertBefore(re(), n), n, void 0, t ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis;
class Z extends Y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = bt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return G;
  }
}
var Ze;
Z._$litElement$ = !0, Z.finalized = !0, (Ze = W.litElementHydrateSupport) == null || Ze.call(W, { LitElement: Z });
const be = W.litElementPolyfillSupport;
be == null || be({ LitElement: Z });
(W.litElementVersions ?? (W.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = (s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kt = { attribute: !0, type: String, converter: me, reflect: !1, hasChanged: ze }, Ct = (s = kt, e, t) => {
  const { kind: a, metadata: i } = t;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), a === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(t.name, s), a === "accessor") {
    const { name: o } = t;
    return { set(l) {
      const d = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, d, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, s, l), l;
    } };
  }
  if (a === "setter") {
    const { name: o } = t;
    return function(l) {
      const d = this[o];
      e.call(this, l), this.requestUpdate(o, d, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function B(s) {
  return (e, t) => typeof t == "object" ? Ct(s, e, t) : ((a, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, a), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function he(s) {
  return B({ ...s, state: !0, attribute: !1 });
}
const F = {
  en: {
    starts_in_min: "Starts in {x} minute",
    starts_in_mins: "Starts in {x} minutes",
    starts_in_hour: "Starts in {x} hour",
    starts_in_hours: "Starts in {x} hours",
    starts_in_day: "Starts in {x} day",
    starts_in_days: "Starts in {x} days",
    starts_in_week: "Starts in {x} week",
    starts_in_weeks: "Starts in {x} weeks",
    loading: "Loading events...",
    no_events: "No active events",
    more_events: "+{x} more",
    editor_show_upcoming: "Show upcoming events",
    editor_unfold_events: "Unfold Events",
    editor_configuration: "Configuration",
    editor_text_visibility: "Text Visibility",
    editor_show_divider: "Show Divider",
    editor_show_weekday: "Show Weekday",
    editor_show_weekday_long: "Use long weekday (e.g. Monday)",
    editor_show_month: "Show Month",
    editor_show_month_long: "Use long month (e.g. December)",
    editor_icon_show_weekday: "Swap Month and Weekday",
    editor_show_add_event: "Show 'Add Event' Button",
    add_event_title: "Add Event",
    add_event_name: "Title",
    add_event_start: "Start",
    add_event_end: "End",
    add_event_all_day: "All Day",
    add_event_location: "Location",
    add_event_description: "Description",
    add_event_calendar: "Calendar",
    add_event_save: "Save",
    add_event_cancel: "Cancel",
    popup_upcoming_events: "Upcoming events",
    editor_show_more: "Show More",
    editor_show_less: "Show Less",
    editor_background_color: "Background Color",
    editor_show_location: "Show Location",
    editor_show_duration: "Show Duration",
    editor_show_time: "Show Time",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "day",
    duration_days: "days",
    editor_max_lines: "Max. displayed events",
    group_by_date: "Group by Day",
    empty: "Empty",
    editor_show_empty_days: "Show Empty Days"
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
    loading: "Lade Termine...",
    no_events: "Keine aktiven Termine",
    more_events: "+{x} weitere",
    editor_show_upcoming: "Zeige bevorstehende Ereignisse",
    editor_unfold_events: "Ereignisse ausklappen",
    editor_configuration: "Konfiguration",
    editor_text_visibility: "Text & Sichtbarkeit",
    editor_show_divider: "Zeige Trenner",
    editor_show_weekday: "Zeige Wochentag",
    editor_show_weekday_long: "Ausgeschrieben (z.B. Montag)",
    editor_show_month: "Zeige Monat",
    editor_show_month_long: "Ausgeschrieben (z.B. Dezember)",
    editor_icon_show_weekday: "Monat und Wochentag tauschen",
    editor_show_add_event: "Zeige 'Neuer Termin' Button",
    add_event_title: "Neuer Termin",
    add_event_name: "Titel",
    add_event_start: "Start",
    add_event_end: "Ende",
    add_event_all_day: "Ganztägig",
    add_event_location: "Ort",
    add_event_description: "Beschreibung",
    add_event_calendar: "Kalender",
    add_event_save: "Speichern",
    add_event_cancel: "Abbrechen",
    popup_upcoming_events: "Bevorstehende Ereignisse",
    editor_show_more: "Mehr anzeigen",
    editor_show_less: "Weniger anzeigen",
    editor_background_color: "Hintergrundfarbe",
    editor_show_location: "Zeige Ort",
    editor_show_duration: "Zeige Dauer",
    editor_show_time: "Zeige Zeit",
    duration_min: "Minuten",
    duration_hour: "h",
    duration_day: "Tag",
    duration_days: "Tage",
    editor_max_lines: "Max. angezeigte Termine",
    group_by_date: "Nach Tag gruppieren",
    empty: "Leer",
    editor_show_empty_days: "Zeige leere Tage"
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
    loading: "Chargement...",
    no_events: "Aucun événement",
    more_events: "+{x} autres",
    editor_show_upcoming: "Afficher les événements à venir",
    editor_unfold_events: "Déplier les événements",
    editor_show_divider: "Afficher le séparateur",
    editor_show_weekday: "Afficher le jour de la semaine",
    editor_show_weekday_long: "Format long (ex. Lundi)",
    editor_show_add_event: "Bouton Nouveau",
    add_event_title: "Nouvel événement",
    add_event_name: "Titre",
    add_event_start: "Début",
    add_event_end: "Fin",
    add_event_all_day: "Toute la journée",
    add_event_location: "Lieu",
    add_event_description: "Description",
    add_event_calendar: "Calendrier",
    add_event_save: "Enregistrer",
    add_event_cancel: "Annuler",
    popup_upcoming_events: "Événements à venir",
    editor_show_more: "Afficher plus",
    editor_show_less: "Afficher moins",
    editor_background_color: "Couleur de fond",
    group_by_date: "Grouper par jour"
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
    loading: "Caricamento...",
    no_events: "Nessun evento",
    more_events: "+{x} altri",
    editor_show_upcoming: "Mostra prossimi eventi",
    editor_unfold_events: "Espandi gli eventi",
    editor_show_divider: "Mostra divisore",
    editor_show_weekday: "Mostra giorno della settimana",
    editor_show_weekday_long: "Usa nome completo (es. Lunedì)",
    editor_show_add_event: "Mostra pulsante Aggiungi",
    add_event_title: "Aggiungi Evento",
    add_event_name: "Titolo",
    add_event_start: "Inizio",
    add_event_end: "Fine",
    add_event_all_day: "Tutto il giorno",
    add_event_location: "Luogo",
    add_event_description: "Descrizione",
    add_event_calendar: "Calendario",
    add_event_save: "Salva",
    add_event_cancel: "Annulla",
    popup_upcoming_events: "Prossimi eventi",
    editor_show_more: "Mostra di più",
    editor_show_less: "Mostra meno",
    editor_background_color: "Colore di sfondo",
    group_by_date: "Raggruppa per giorno"
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
    loading: "Cargando...",
    no_events: "No hay eventos",
    more_events: "+{x} más",
    editor_show_upcoming: "Mostrar próximos eventos",
    editor_unfold_events: "Desplegar eventos",
    editor_show_divider: "Mostrar divisor",
    editor_show_weekday: "Mostrar día de la semana",
    editor_show_weekday_long: "Formato largo (ej. Lunes)",
    editor_show_add_event: "Mostrar botón Añadir Evento",
    add_event_title: "Añadir Evento",
    add_event_name: "Título",
    add_event_start: "Inicio",
    add_event_end: "Fin",
    add_event_all_day: "Todo el día",
    add_event_location: "Ubicación",
    add_event_description: "Descripción",
    add_event_calendar: "Calendario",
    add_event_save: "Guardar",
    add_event_cancel: "Cancelar",
    popup_upcoming_events: "Próximos eventos",
    editor_show_more: "Mostrar más",
    editor_show_less: "Mostrar menos",
    editor_background_color: "Color de fondo",
    group_by_date: "Agrupar por día"
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
    loading: "Laden...",
    no_events: "Geen evenementen",
    more_events: "+{x} meer",
    editor_show_upcoming: "Toon aankomende evenementen",
    editor_unfold_events: "Evenementen uitvouwen",
    editor_show_divider: "Toon verdeler",
    editor_show_weekday: "Toon weekdag",
    editor_show_weekday_long: "Gebruik lange notatie (bijv. Maandag)",
    editor_show_add_event: "Toon Toevoegen knop",
    add_event_title: "Evenement toevoegen",
    add_event_name: "Titel",
    add_event_start: "Start",
    add_event_end: "Eind",
    add_event_all_day: "Hele dag",
    add_event_location: "Locatie",
    add_event_description: "Beschrijving",
    add_event_calendar: "Kalender",
    add_event_save: "Opslaan",
    add_event_cancel: "Annuleren",
    popup_upcoming_events: "Aankomende evenementen",
    editor_show_more: "Toon meer",
    editor_show_less: "Toon minder",
    editor_background_color: "Achtergrondkleur",
    group_by_date: "Groepeer per dag"
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
    loading: "A carregar...",
    no_events: "Sem eventos",
    more_events: "+{x} mais",
    editor_show_upcoming: "Mostrar próximos eventos",
    editor_unfold_events: "Desdobrar eventos",
    editor_show_divider: "Mostrar divisor",
    editor_show_weekday: "Mostrar dia da semana",
    editor_show_weekday_long: "Formato longo (ex. Segunda-feira)",
    editor_show_add_event: "Mostrar botão Adicionar",
    add_event_title: "Adicionar evento",
    add_event_name: "Título",
    add_event_start: "Início",
    add_event_end: "Fim",
    add_event_all_day: "Dia inteiro",
    add_event_location: "Local",
    add_event_description: "Descrição",
    add_event_calendar: "Calendário",
    add_event_save: "Salvar",
    add_event_cancel: "Cancelar",
    popup_upcoming_events: "Próximos eventos",
    editor_show_more: "Mostrar mais",
    editor_show_less: "Mostrar menos",
    editor_background_color: "Cor de fundo",
    group_by_date: "Agrupar por dia"
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
    loading: "Загрузка...",
    no_events: "Нет событий",
    more_events: "ещё +{x}",
    editor_show_upcoming: "Показать предстоящие события",
    editor_unfold_events: "Развернуть события",
    editor_show_divider: "Показать разделитель",
    editor_show_weekday: "Показать день недели",
    editor_show_weekday_long: "Использовать полное название (напр. Понедельник)",
    editor_show_add_event: "Показать кнопку Добавить",
    add_event_title: "Добавить событие",
    add_event_name: "Название",
    add_event_start: "Начало",
    add_event_end: "Конец",
    add_event_all_day: "Весь день",
    add_event_location: "Место",
    add_event_description: "Описание",
    add_event_calendar: "Календарь",
    add_event_save: "Сохранить",
    add_event_cancel: "Отмена",
    popup_upcoming_events: "Предстоящие события",
    editor_show_more: "Показать больше",
    editor_show_less: "Показать меньше",
    editor_background_color: "Цвет фона",
    group_by_date: "Группировать по дням"
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
    loading: "Ładowanie...",
    no_events: "Brak wydarzeń",
    more_events: "+{x} więcej",
    editor_show_upcoming: "Pokaż nadchodzące wydarzenia",
    editor_unfold_events: "Rozwiń wydarzenia",
    editor_show_divider: "Pokaż dzielnik",
    editor_show_weekday: "Pokaż dzień tygodnia",
    editor_show_weekday_long: "Użyj pełnej nazwy (np. Poniedziałek)",
    editor_show_add_event: "Pokaż przycisk Dodaj",
    add_event_title: "Dodaj wydarzenie",
    add_event_name: "Tytuł",
    add_event_start: "Początek",
    add_event_end: "Koniec",
    add_event_all_day: "Cały dzień",
    add_event_location: "Lokalizacja",
    add_event_description: "Opis",
    add_event_calendar: "Kalendarz",
    add_event_save: "Zapisz",
    add_event_cancel: "Anuluj",
    popup_upcoming_events: "Nadchodzące wydarzenia",
    editor_show_more: "Pokaż więcej",
    editor_show_less: "Pokaż mniej",
    editor_background_color: "Kolor tła",
    group_by_date: "Grupuj według dnia"
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
    loading: "Laddar...",
    no_events: "Inga händelser",
    more_events: "+{x} till",
    editor_show_upcoming: "Visa kommande händelser",
    editor_unfold_events: "Fäll ut evenemang",
    editor_show_divider: "Visa avdelare",
    editor_show_weekday: "Visa veckodag",
    editor_show_weekday_long: "Använd långt format (t.ex. Måndag)",
    editor_show_add_event: "Visa Lägg till-knapp",
    add_event_title: "Lägg till händelse",
    add_event_name: "Titel",
    add_event_start: "Start",
    add_event_end: "Slut",
    add_event_all_day: "Heldag",
    add_event_location: "Plats",
    add_event_description: "Beskrivning",
    add_event_calendar: "Kalender",
    add_event_save: "Spara",
    add_event_cancel: "Avbryt",
    popup_upcoming_events: "Kommande händelser",
    editor_show_more: "Visa mer",
    editor_show_less: "Visa mindre",
    editor_background_color: "Bakgrundsfärg",
    group_by_date: "Gruppera per dag"
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
    loading: "Indlæser...",
    no_events: "Ingen begivenheder",
    more_events: "+{x} mere",
    editor_show_upcoming: "Vis kommende begivenheder",
    editor_unfold_events: "Udfold begivenheder",
    editor_show_divider: "Vis skillelinje",
    editor_show_weekday: "Vis ugedag",
    editor_show_weekday_long: "Brug langt format (f.eks. Mandag)",
    editor_show_add_event: "Vis Tilføj-knap",
    add_event_title: "Tilføj begivenhed",
    add_event_name: "Titel",
    add_event_start: "Start",
    add_event_end: "Slut",
    add_event_all_day: "Hele dagen",
    add_event_location: "Sted",
    add_event_description: "Beskrivelse",
    add_event_calendar: "Kalender",
    add_event_save: "Gem",
    add_event_cancel: "Annuller",
    popup_upcoming_events: "Kommende begivenheder",
    editor_show_more: "Vis mere",
    editor_show_less: "Vis mindre",
    editor_background_color: "Baggrundsfarve",
    group_by_date: "Gruppér efter dag"
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
    loading: "Laster...",
    no_events: "Ingen hendelser",
    more_events: "+{x} til",
    editor_show_upcoming: "Vis kommende hendelser",
    editor_unfold_events: "Brett ut hendelser",
    editor_show_divider: "Vis skillelinje",
    editor_show_weekday: "Vis ukedag",
    editor_show_weekday_long: "Bruk langt format (f.eks. Mandag)",
    editor_show_add_event: "Vis Legg til-knapp",
    add_event_title: "Legg til hendelse",
    add_event_name: "Tittel",
    add_event_start: "Start",
    add_event_end: "Slutt",
    add_event_all_day: "Hele dagen",
    add_event_location: "Sted",
    add_event_description: "Beskrivelse",
    add_event_calendar: "Kalender",
    add_event_save: "Lagre",
    add_event_cancel: "Avbryt",
    popup_upcoming_events: "Kommende hendelser",
    editor_show_more: "Vis mer",
    editor_show_less: "Vis mindre",
    editor_background_color: "Bakgrunnsfarge",
    group_by_date: "Grupper etter dag"
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
    loading: "Ladataan...",
    no_events: "Ei tapahtumia",
    more_events: "+{x} lisää",
    editor_show_upcoming: "Näytä tulevat tapahtumat",
    editor_unfold_events: "Avaa tapahtumat",
    editor_show_divider: "Näytä jakaja",
    editor_show_weekday: "Näytä viikonpäivä",
    editor_show_weekday_long: "Käytä pitkää nimeä (esim. Maanantai)",
    editor_show_add_event: "Paina Lisää näppäintä",
    add_event_title: "Lisää tapahtuma",
    add_event_name: "Nimi",
    add_event_start: "Alku",
    add_event_end: "Loppu",
    add_event_all_day: "Koko päivä",
    add_event_location: "Sijainti",
    add_event_description: "Kuvaus",
    add_event_calendar: "Kalenteri",
    add_event_save: "Tallenna",
    add_event_cancel: "Peruuta",
    popup_upcoming_events: "Tulevat tapahtumat",
    editor_show_more: "Näytä enemmän",
    editor_show_less: "Näytä vähemmän",
    editor_background_color: "Taustaväri",
    group_by_date: "Ryhmittele päivän mukaan"
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
    loading: "Načítání...",
    no_events: "Žádné události",
    more_events: "+{x} další",
    editor_show_upcoming: "Zobrazit nadcházející události",
    editor_unfold_events: "Rozvinout události",
    editor_show_divider: "Zobrazit dělič",
    editor_show_weekday: "Zobrazit den v týdnu",
    editor_show_weekday_long: "Použít celý název (např. Pondělí)",
    editor_show_add_event: "Zobrazit tlačítko Přidat",
    add_event_title: "Přidat událost",
    add_event_name: "Název",
    add_event_start: "Začátek",
    add_event_end: "Konec",
    add_event_all_day: "Celý den",
    add_event_location: "Místo",
    add_event_description: "Popis",
    add_event_calendar: "Kalendář",
    add_event_save: "Uložit",
    add_event_cancel: "Zrušit",
    popup_upcoming_events: "Nadcházející události",
    editor_show_more: "Zobrazit více",
    editor_show_less: "Zobrazit méně",
    editor_background_color: "Barva pozadí",
    group_by_date: "Seskupit podle dne"
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
    loading: "Betöltés...",
    no_events: "Nincs esemény",
    more_events: "+{x} további",
    editor_show_upcoming: "Közelgő események megjelenítése",
    editor_unfold_events: "Események kibontása",
    editor_show_divider: "Osztó megjelenítése",
    editor_show_weekday: "Hét napjának mutatása",
    editor_show_weekday_long: "Hosszú formátum (pl. Hétfő)",
    editor_show_add_event: "Hozzáadás gomb mutatása",
    add_event_title: "Esemény Hozzáadása",
    add_event_name: "Cím",
    add_event_start: "Kezdés",
    add_event_end: "Befejezés",
    add_event_all_day: "Egész napos",
    add_event_location: "Helyszín",
    add_event_description: "Leírás",
    add_event_calendar: "Naptár",
    add_event_save: "Mentés",
    add_event_cancel: "Mégse",
    popup_upcoming_events: "Közelgő események",
    editor_show_more: "Több mutatása",
    editor_show_less: "Kevesebb mutatása",
    editor_background_color: "Háttérszín",
    group_by_date: "Csoportosítás nap szerint"
  }
};
function w(s, e, t, a) {
  var o;
  const i = ((o = s.locale) == null ? void 0 : o.language) || s.language || "en";
  let n;
  if (F[i] && F[i][e])
    n = F[i][e];
  else if (F.en && F.en[e])
    n = F.en[e];
  else
    return e;
  return t && a && (n = n.replace(t, a)), n;
}
function At(s, e, t) {
  var l, d;
  const a = (t == null ? void 0 : t.unfold_events) || !1;
  if (e === void 0)
    return p`
        <div class="calendar-container">
            <div class="calendar-item" style="cursor: default;">
                 <div class="calendar-icon" style="background-color: var(--primary-color, #03a9f4);">
                    <ha-icon icon="mdi:calendar-clock"></ha-icon>
                </div>
                <div class="calendar-content">
                    <div class="event-title">${w(s, "loading")}</div>
                </div>
            </div>
        </div>
        `;
  if (e.length === 0)
    return p`
        <div class="calendar-container">
            <div class="calendar-item" style="cursor: default;">
                 <div class="calendar-icon" style="background-color: var(--disabled-text-color, #bdbdbb);">
                    <ha-icon icon="mdi:calendar-remove"></ha-icon>
                </div>
                <div class="calendar-content">
                    <div class="event-title">${w(s, "no_events")}</div>
                </div>
            </div>
        </div>
        `;
  if (!a) {
    const r = e[0], _ = e.length - 1, u = r.is_empty ? w(s, "empty") : r.summary;
    let h, g;
    try {
      if (h = new Date(r.start.dateTime || r.start.date), g = new Date(r.end.dateTime || r.end.date), isNaN(h.getTime()) || isNaN(g.getTime())) throw new Error("Invalid Date");
    } catch {
      return p`<div class="error">Date Error</div>`;
    }
    const f = /* @__PURE__ */ new Date(), C = !r.start.dateTime, $ = oe(s, h, g, C), c = ((l = s.locale) == null ? void 0 : l.language) || s.language || navigator.language, y = (k) => k.toLocaleTimeString(c, { hour: "2-digit", minute: "2-digit" }), b = `${y(h)} - ${y(g)}`, v = (t == null ? void 0 : t.show_date) ?? !1, x = (t == null ? void 0 : t.show_time) ?? !1;
    let m = "";
    const A = s.localize("component.calendar.entity_component._.state_attributes.all_day.name") || "All day";
    if (r.is_empty)
      m = "";
    else if (v || x)
      if (C) {
        const k = v ? h.toLocaleDateString(c, { day: "2-digit", month: "2-digit", year: "numeric" }) : "";
        v && x ? m = `${k}, ${A}` : m = k || A;
      } else {
        const k = [];
        v && k.push(h.toLocaleDateString(c, { day: "2-digit", month: "2-digit", year: "numeric" })), x && k.push(b), m = k.join(", ");
      }
    else if (h > f) {
      const k = h.getTime() - f.getTime(), X = Math.ceil(k / 6e4);
      m = ke(s, X);
    } else
      m = C ? A : y(h);
    if (!r.is_empty && (t != null && t.show_duration) && (m ? m.endsWith($) || (m += ` • ${$}`) : m = $), _ > 0 && (m += ` ${w(s, "more_events", "{x}", _.toString())}`), !r.is_empty && (t != null && t.show_weekday)) {
      const k = ((d = s.locale) == null ? void 0 : d.language) || s.language || navigator.language, X = t != null && t.icon_show_weekday ? h.toLocaleDateString(k, { month: t.show_weekday_long ? "long" : "short" }) : h.toLocaleDateString(k, { weekday: t.show_weekday_long ? "long" : "short" });
      m += ` • ${X}`;
    }
    const P = h <= f && g >= f ? f : h, L = r.is_empty ? V(r.entity_id, t) || "var(--disabled-text-color, #bdbdbb)" : V(r.entity_id, t), O = ne(s, P, L, (t == null ? void 0 : t.dark_mode) ?? !1, (t == null ? void 0 : t.icon_show_weekday) ?? !1), T = se(r.entity_id, t), M = T ? `background-color: ${T}; border: none;` : "";
    return p`
            <div class="calendar-container">
                <div class="calendar-item"  
                     style="${M} ${r.is_empty ? "cursor: default; opacity: 0.7;" : ""}"
                     title="${u}"
                     @click=${(k) => r.is_empty ? null : Ke(k, s, e)}>
                     <div class="calendar-icon dynamic">
                        ${O}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title">${u}</div>
                        <div class="event-time">
                            ${!r.is_empty && (v || x) ? p`<ha-icon icon="mdi:clock-time-four-outline"></ha-icon>` : ""}
                            ${m}
                        </div>
                        ${!r.is_empty && (t != null && t.show_location) && r.location ? p`
                                <div class="event-location">
                                    <ha-icon icon="mdi:map-marker"></ha-icon>
                                    ${r.location}
                                </div>
                            ` : ""}
                        ${t != null && t.show_calendar_name && r.calendar_name ? p`
                                <div class="event-calendar">
                                    <ha-icon icon="mdi:calendar-blank-multiple"></ha-icon>
                                    ${r.calendar_name}
                                </div>
                            ` : ""}
                    </div>
                </div>
            </div>
        `;
  }
  if (t != null && t.group_by_date && a) {
    const r = Xe(e);
    return p`
            <div class="calendar-container">
                ${r.map((_) => {
      const u = _.date, h = V(_.events[0].entity_id, t), g = ne(s, u, h, (t == null ? void 0 : t.dark_mode) ?? !1, (t == null ? void 0 : t.icon_show_weekday) ?? !1), f = se(_.events[0].entity_id, t), C = f ? `background-color: ${f}; border: none;` : "";
      return p`
                        <div class="calendar-item grouped" style="align-items: center; ${C}">
                            <div class="calendar-icon dynamic">
                                ${g}
                            </div>
                            <div class="calendar-content">
                                ${_.events.map(($) => {
        var M;
        const c = $.is_empty ? w(s, "empty") : $.summary, y = new Date($.start.dateTime || $.start.date), b = new Date($.end.dateTime || $.end.date), v = !$.start.dateTime, x = oe(s, y, b, v), m = ((M = s.locale) == null ? void 0 : M.language) || s.language || navigator.language, A = (k) => k.toLocaleTimeString(m, { hour: "2-digit", minute: "2-digit" }), E = `${A(y)} - ${A(b)}`, P = (t == null ? void 0 : t.show_date) ?? !1, L = (t == null ? void 0 : t.show_time) ?? !1, O = s.localize("component.calendar.entity_component._.state_attributes.all_day.name") || "All day";
        let T = "";
        if ($.is_empty)
          T = "";
        else if (P || L)
          if (v) {
            const k = P ? y.toLocaleDateString(m, { day: "2-digit", month: "2-digit", year: "numeric" }) : "";
            P && L ? T = `${k}, ${O}` : T = k || O;
          } else {
            const k = [];
            P && k.push(y.toLocaleDateString(m, { day: "2-digit", month: "2-digit", year: "numeric" })), L && k.push(E), T = k.join(", ");
          }
        else
          T = v ? O : A(y);
        if (!$.is_empty && (t != null && t.show_duration) && (T.endsWith(x) || (T += ` • ${x}`)), !$.is_empty && (t != null && t.show_weekday)) {
          const k = t != null && t.icon_show_weekday ? y.toLocaleDateString(m, { month: t.show_weekday_long ? "long" : "short" }) : y.toLocaleDateString(m, { weekday: t.show_weekday_long ? "long" : "short" });
          T.includes(k) || (T += ` • ${k}`);
        }
        return p`
                                        <div class="event-entry" @click=${(k) => $.is_empty ? null : We(k, $.entity_id)} style="margin-bottom: 4px; ${$.is_empty ? "opacity: 0.7; cursor: default;" : ""}">
                                            <div class="event-title">
                                                ${c}
                                            </div>
                                            <div class="event-time" style="display: flex; align-items: center; gap: 4px;">
                                                ${!$.is_empty && (P || L) ? p`<ha-icon icon="mdi:clock-time-four-outline" style="--mdc-icon-size: 14px;"></ha-icon>` : ""}
                                                ${T}
                                            </div>
                                            ${!$.is_empty && (t != null && t.show_location) && $.location ? p`
                                                    <div class="event-location" style="display: flex; align-items: center; gap: 4px; font-size: 0.9em; color: var(--secondary-text-color);">
                                                        <ha-icon icon="mdi:map-marker" style="--mdc-icon-size: 14px;"></ha-icon>
                                                        ${$.location}
                                                    </div>
                                                ` : ""}
                                            ${t != null && t.show_calendar_name && $.calendar_name ? p`
                                                    <div class="event-calendar" style="display: flex; align-items: center; gap: 4px; font-size: 0.9em; color: var(--secondary-text-color);">
                                                        <ha-icon icon="mdi:calendar-blank-multiple" style="--mdc-icon-size: 14px;"></ha-icon>
                                                        ${$.calendar_name}
                                                    </div>
                                                ` : ""}
                                        </div>
                                    `;
      })}
                            </div>
                        </div>
                        ${t != null && t.show_divider ? p`<div class="calendar-divider"></div>` : ""}
                    `;
    })}
            </div>
        `;
  }
  const i = (t == null ? void 0 : t.max_lines) || 0, n = i > 0 ? e.slice(0, i) : e, o = e.length - n.length;
  return p`
        <div class="calendar-container">
            ${n.map((r, _) => {
    var De, Pe;
    const u = r.is_empty ? w(s, "empty") : r.summary;
    let h, g;
    try {
      if (h = new Date(r.start.dateTime || r.start.date), g = new Date(r.end.dateTime || r.end.date), isNaN(h.getTime())) throw new Error("Invalid start date");
      if (isNaN(g.getTime())) throw new Error("Invalid end date");
    } catch {
      return p`<div class="error">Date Error for ${u}</div>`;
    }
    const f = /* @__PURE__ */ new Date(), C = !r.start.dateTime;
    let $ = -1;
    const c = oe(s, h, g, C), y = ((De = s.locale) == null ? void 0 : De.language) || s.language || navigator.language, b = (S) => S.toLocaleTimeString(y, { hour: "2-digit", minute: "2-digit" }), v = `${b(h)} - ${b(g)}`, x = (t == null ? void 0 : t.show_date) ?? !1, m = (t == null ? void 0 : t.show_time) ?? !1;
    let A = "";
    const E = s.localize("component.calendar.entity_component._.state_attributes.all_day.name") || "All day";
    if (r.is_empty)
      A = "";
    else if (x || m)
      if (C) {
        const S = x ? h.toLocaleDateString(y, { day: "2-digit", month: "2-digit", year: "numeric" }) : "";
        x && m ? A = `${S}, ${E}` : A = S || E;
      } else {
        const S = [];
        x && S.push(h.toLocaleDateString(y, { day: "2-digit", month: "2-digit", year: "numeric" })), m && S.push(v), A = S.join(", ");
      }
    else if (h > f) {
      const S = h.getTime() - f.getTime(), ee = Math.ceil(S / 6e4);
      A = ke(s, ee);
    } else
      A = C ? E : b(h);
    if (!r.is_empty && (t != null && t.show_duration) && (A ? A.endsWith(c) || (A += ` • ${c}`) : A = c), !r.is_empty && !C && h <= f && g >= f) {
      const S = g.getTime() - h.getTime(), ee = f.getTime() - h.getTime();
      S > 0 && ($ = Math.max(0, Math.min(100, ee / S * 100)));
    }
    if (!r.is_empty && (t != null && t.show_weekday)) {
      const S = ((Pe = s.locale) == null ? void 0 : Pe.language) || s.language || navigator.language, ee = t != null && t.icon_show_weekday ? h.toLocaleDateString(S, { month: t.show_weekday_long ? "long" : "short" }) : h.toLocaleDateString(S, { weekday: t.show_weekday_long ? "long" : "short" });
      A += ` • ${ee}`;
    }
    const L = h <= f && g >= f ? f : h, O = r.is_empty ? V(r.entity_id, t) || "var(--disabled-text-color, #bdbdbb)" : V(r.entity_id, t), T = ne(s, L, O, (t == null ? void 0 : t.dark_mode) ?? !1, (t == null ? void 0 : t.icon_show_weekday) ?? !1), M = se(r.entity_id, t), k = M ? `background-color: ${M}; border: none;` : "", X = (t == null ? void 0 : t.show_divider) && _ > 0, we = i > 0 && _ === i - 1 && o > 0;
    return p`
                ${X ? p`<div class="calendar-divider"></div>` : ""}
                <div class="calendar-item"  
                     style="${k} ${r.is_empty ? "cursor: default; opacity: 0.7;" : ""}"
                     title="${we ? w(s, "popup_upcoming_events") : u}"
                     @click=${(S) => r.is_empty ? null : we ? Ke(S, s, e) : We(S, r.entity_id)}>
                     <div class="calendar-icon dynamic">
                        ${T}
                    </div>
                    <div class="calendar-content" style="${r.is_empty ? "opacity: 0.8;" : ""}">
                        <div class="event-title" style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;">${u}</span>
                            ${we ? p`
                                <span class="more-indicator" style="display: flex; align-items: center; gap: 4px; color: var(--secondary-text-color); font-size: 0.85em; font-style: italic; flex-shrink: 0;">
                                    <ha-icon icon="mdi:dots-horizontal" style="--mdc-icon-size: 16px; color: var(--secondary-text-color);"></ha-icon>
                                    (${o})
                                </span>
                            ` : ""}
                        </div>
                        <div class="event-time">
                            ${!r.is_empty && (x || m) ? p`<ha-icon icon="mdi:clock-time-four-outline"></ha-icon>` : ""}
                            ${A}
                        </div>
                        ${!r.is_empty && (t != null && t.show_location) && r.location ? p`
                                <div class="event-location">
                                    <ha-icon icon="mdi:map-marker"></ha-icon>
                                    ${r.location}
                                </div>
                            ` : ""}
                        ${t != null && t.show_calendar_name && r.calendar_name ? p`
                                <div class="event-calendar">
                                    <ha-icon icon="mdi:calendar-blank-multiple"></ha-icon>
                                    ${r.calendar_name}
                                </div>
                            ` : ""}
                        ${$ >= 0 ? p`
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${$}%"></div>
                            </div>
                        ` : ""}
                    </div>
                </div>
                `;
  })}
        </div>
    `;
}
function V(s, e) {
  var a;
  const t = ((a = e == null ? void 0 : e.calendar_colors) == null ? void 0 : a[s]) || (e == null ? void 0 : e.calendar_icon_color) || "#fa3e3e";
  return Je(t);
}
function se(s, e) {
  var a;
  const t = ((a = e == null ? void 0 : e.calendar_background_colors) == null ? void 0 : a[s]) || (e == null ? void 0 : e.background_color) || "";
  return t ? Je(t) : "";
}
function Je(s) {
  return s.startsWith("#") || s.startsWith("rgb") || s.startsWith("hsl") || s.startsWith("var") ? s : `var(--${s}-color)`;
}
function Ke(s, e, t) {
  const a = new CustomEvent("calendar-card-show-detail", {
    bubbles: !0,
    composed: !0,
    detail: {
      title: w(e, "popup_upcoming_events"),
      entities: t
    }
  });
  s.target.dispatchEvent(a);
}
function We(s, e) {
  const t = new CustomEvent("hass-more-info", {
    bubbles: !0,
    composed: !0,
    detail: { entityId: e }
  });
  s.target.dispatchEvent(t);
}
function Xe(s) {
  const e = {};
  return s.forEach((t) => {
    const a = new Date(t.start.dateTime || t.start.date), i = a.toISOString().split("T")[0];
    e[i] || (e[i] = {
      date: a,
      events: []
    }), e[i].events.push(t);
  }), Object.values(e).sort((t, a) => t.date.getTime() - a.date.getTime());
}
function ne(s, e, t, a = !1, i = !1) {
  var u;
  const n = ((u = s.locale) == null ? void 0 : u.language) || s.language || navigator.language;
  let o;
  i ? o = e.toLocaleDateString(n, { weekday: "short" }).toUpperCase() : o = e.toLocaleDateString(n, { month: "short" }).toUpperCase();
  const l = e.getDate();
  return p`
        <svg viewBox="0 0 100 100" class="dynamic-calendar-icon" style="width: 100%; height: 100%; display: block;">
            <rect x="0" y="0" width="100" height="100" rx="20" ry="20" fill="${a ? "#222222" : "white"}"></rect>
            <path d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z" fill="${t}"></path>
            <text x="50" y="23" font-family="sans-serif" font-size="22" font-weight="bold" fill="${a ? "#222222" : "white"}" text-anchor="middle">${o}</text>
            <text x="50" y="82" font-family="sans-serif" font-size="52" font-weight="bold" fill="${a ? "white" : "#333"}" text-anchor="middle">${l}</text>
        </svg>
    `;
}
function oe(s, e, t, a) {
  const i = t.getTime() - e.getTime(), n = Math.round(i / 6e4);
  if (a && n === 1440)
    return s.localize("component.calendar.entity_component._.state_attributes.all_day.name") || "All day";
  if (n < 60)
    return `${n} ${w(s, "duration_min")}`;
  const o = Math.floor(n / 1440), l = n % 1440, d = Math.floor(l / 60), r = l % 60, _ = [];
  return o >= 1 && _.push(`${o} ${w(s, o === 1 ? "duration_day" : "duration_days")}`), d > 0 && _.push(`${d} ${w(s, "duration_hour")}`), r > 0 && _.push(`${r} ${w(s, "duration_min")}`), _.join(" ");
}
function ke(s, e) {
  if (e < 60)
    return e === 1 ? w(s, "starts_in_min", "{x}", e.toString()) : w(s, "starts_in_mins", "{x}", e.toString());
  if (e < 1440) {
    const a = Math.round(e / 60);
    return a === 1 ? w(s, "starts_in_hour", "{x}", a.toString()) : w(s, "starts_in_hours", "{x}", a.toString());
  }
  if (e < 43200) {
    const a = Math.round(e / 1440);
    return a === 1 ? w(s, "starts_in_day", "{x}", a.toString()) : w(s, "starts_in_days", "{x}", a.toString());
  }
  const t = Math.round(e / 10080);
  return t === 1 ? w(s, "starts_in_week", "{x}", t.toString()) : w(s, "starts_in_weeks", "{x}", t.toString());
}
function Et(s, e) {
  const t = Object.keys(s.states).filter((r) => r.startsWith("calendar.")).filter((r) => {
    var _;
    return !((_ = e.exclude_entities) != null && _.includes(r));
  }), a = t.length > 0 ? t[0] : void 0, i = /* @__PURE__ */ new Date(), n = new Date(i);
  n.setHours(n.getHours() + 1, 0, 0, 0);
  const o = new Date(n);
  o.setHours(o.getHours() + 1, 0, 0, 0);
  const l = (r) => r.toString().padStart(2, "0"), d = (r) => `${r.getFullYear()}-${l(r.getMonth() + 1)}-${l(r.getDate())} ${l(r.getHours())}:${l(r.getMinutes())}:00`;
  return {
    open: !0,
    calendar_id: a,
    name: "",
    start: d(n),
    end: d(o),
    location: "",
    description: "",
    recurrence: "none",
    all_day: !1
  };
}
async function zt(s, e, t, a) {
  if (!(!e.calendar_id || !e.name || !e.start || !e.end))
    try {
      const i = {
        entity_id: e.calendar_id,
        summary: e.name
      };
      if (e.all_day) {
        const n = e.start.split(" ")[0];
        let o = e.end.split(" ")[0];
        if (n === o) {
          const l = o.split("-"), d = new Date(Number(l[0]), Number(l[1]) - 1, Number(l[2]));
          d.setDate(d.getDate() + 1);
          const r = (_) => _.toString().padStart(2, "0");
          o = `${d.getFullYear()}-${r(d.getMonth() + 1)}-${r(d.getDate())}`;
        }
        i.start_date = n, i.end_date = o;
      } else
        i.start_date_time = e.start, i.end_date_time = e.end, e.location && (i.location = e.location), e.description && (i.description = e.description);
      if (e.recurrence && e.recurrence !== "none") {
        const n = {
          DAILY: "FREQ=DAILY",
          WEEKLY: "FREQ=WEEKLY",
          MONTHLY: "FREQ=MONTHLY",
          YEARLY: "FREQ=YEARLY"
        };
        n[e.recurrence] && (i.rrule = n[e.recurrence]);
      }
      await s.callService("calendar", "create_event", i), t();
    } catch (i) {
      a(i);
    }
}
function St(s, e, t, a, i, n) {
  var l, d, r, _, u, h, g, f, C, $;
  const o = Object.keys(s.states).filter((c) => c.startsWith("calendar.")).filter((c) => {
    var y;
    return !((y = e.exclude_entities) != null && y.includes(c));
  });
  return p`
        <div class="add-event-form">
            <ha-textfield
                    label=${s.localize("ui.components.calendar.event.summary") || "Title"}
                    .value=${t.name || ""}
                    @input=${(c) => a({ name: c.target.value })}
                    dialogInitialFocus
                ></ha-textfield>

                <ha-textfield
                    label=${s.localize("ui.components.calendar.event.location") || "Location"}
                    .value=${t.location || ""}
                    @input=${(c) => a({ location: c.target.value })}
                ></ha-textfield>

                <ha-textfield
                    label=${s.localize("ui.components.calendar.event.description") || "Description"}
                    .value=${t.description || ""}
                    @input=${(c) => a({ description: c.target.value })}
                ></ha-textfield>

                <ha-selector
                    .hass=${s}
                    .selector=${{ select: { options: o.map((c) => {
    var y, b;
    return { value: c, label: ((b = (y = s.states[c]) == null ? void 0 : y.attributes) == null ? void 0 : b.friendly_name) || c };
  }) } }}
                    .value=${t.calendar_id}
                    .label=${s.localize("ui.components.calendar.my_calendars") || "Calendar"}
                    @value-changed=${(c) => a({ calendar_id: c.detail.value })}
                ></ha-selector>

                <div class="row-flex">
                    <ha-formfield .label=${s.localize("ui.components.calendar.event.all_day") || "All Day"}>
                        <ha-switch
                            .checked=${t.all_day || !1}
                            @change=${(c) => a({ all_day: c.target.checked })}
                        ></ha-switch>
                    </ha-formfield>
                </div>

                <div class="row-label">${s.localize("ui.components.calendar.event.start") || "Start"}:</div>
                <div class="date-row">
                    <ha-selector
                        class="date-selector"
                        .hass=${s}
                        .selector=${{ date: {} }}
                        .required=${!1}
                        .value=${((l = t.start) == null ? void 0 : l.split(" ")[0]) || ""}
                        @value-changed=${(c) => {
    var b;
    const y = ((b = t.start) == null ? void 0 : b.split(" ")[1]) || "00:00:00";
    a({ start: `${c.detail.value} ${y}` });
  }}
                    ></ha-selector>
                    <div class="time-inputs-wrap">
                        <ha-textfield
                            type="number"
                            min="0"
                            max="23"
                            .disabled=${t.all_day}
                            .value=${((r = (d = t.start) == null ? void 0 : d.split(" ")[1]) == null ? void 0 : r.substring(0, 2)) || "00"}
                            @change=${(c) => {
    var v, x, m;
    const y = ((v = t.start) == null ? void 0 : v.split(" ")[0]) || "", b = ((m = (x = t.start) == null ? void 0 : x.split(" ")[1]) == null ? void 0 : m.substring(3, 5)) || "00";
    a({ start: `${y} ${c.target.value.padStart(2, "0")}:${b}:00` });
  }}
                            style="flex: 1; min-width: 0;"
                        ></ha-textfield>
                        <span>:</span>
                        <ha-textfield
                            type="number"
                            min="0"
                            max="59"
                            .disabled=${t.all_day}
                            .value=${((u = (_ = t.start) == null ? void 0 : _.split(" ")[1]) == null ? void 0 : u.substring(3, 5)) || "00"}
                            @change=${(c) => {
    var v, x, m;
    const y = ((v = t.start) == null ? void 0 : v.split(" ")[0]) || "", b = ((m = (x = t.start) == null ? void 0 : x.split(" ")[1]) == null ? void 0 : m.substring(0, 2)) || "00";
    a({ start: `${y} ${b}:${c.target.value.padStart(2, "0")}:00` });
  }}
                            style="flex: 1; min-width: 0;"
                        ></ha-textfield>
                    </div>
                </div>
                
                <div class="row-label">${s.localize("ui.components.calendar.event.end") || "End"}:</div>
                <div class="date-row">
                    <ha-selector
                        class="date-selector"
                        .hass=${s}
                        .selector=${{ date: {} }}
                        .required=${!1}
                        .value=${((h = t.end) == null ? void 0 : h.split(" ")[0]) || ""}
                        @value-changed=${(c) => {
    var b;
    const y = ((b = t.end) == null ? void 0 : b.split(" ")[1]) || "00:00:00";
    a({ end: `${c.detail.value} ${y}` });
  }}
                    ></ha-selector>
                    <div class="time-inputs-wrap">
                        <ha-textfield
                            type="number"
                            min="0"
                            max="23"
                            .disabled=${t.all_day}
                            .value=${((f = (g = t.end) == null ? void 0 : g.split(" ")[1]) == null ? void 0 : f.substring(0, 2)) || "00"}
                            @change=${(c) => {
    var v, x, m;
    const y = ((v = t.end) == null ? void 0 : v.split(" ")[0]) || "", b = ((m = (x = t.end) == null ? void 0 : x.split(" ")[1]) == null ? void 0 : m.substring(3, 5)) || "00";
    a({ end: `${y} ${c.target.value.padStart(2, "0")}:${b}:00` });
  }}
                            style="flex: 1; min-width: 0;"
                        ></ha-textfield>
                        <span>:</span>
                        <ha-textfield
                            type="number"
                            min="0"
                            max="59"
                            .disabled=${t.all_day}
                            .value=${(($ = (C = t.end) == null ? void 0 : C.split(" ")[1]) == null ? void 0 : $.substring(3, 5)) || "00"}
                            @change=${(c) => {
    var v, x, m;
    const y = ((v = t.end) == null ? void 0 : v.split(" ")[0]) || "", b = ((m = (x = t.end) == null ? void 0 : x.split(" ")[1]) == null ? void 0 : m.substring(0, 2)) || "00";
    a({ end: `${y} ${b}:${c.target.value.padStart(2, "0")}:00` });
  }}
                            style="flex: 1; min-width: 0;"
                        ></ha-textfield>
                    </div>
                </div>

                <ha-selector
                    .hass=${s}
                    .selector=${{ select: {
    options: [
      { value: "none", label: s.localize("ui.components.calendar.event.repeat.freq.none") || "None" },
      { value: "DAILY", label: s.localize("ui.components.calendar.event.repeat.freq.daily") || "Daily" },
      { value: "WEEKLY", label: s.localize("ui.components.calendar.event.repeat.freq.weekly") || "Weekly" },
      { value: "MONTHLY", label: s.localize("ui.components.calendar.event.repeat.freq.monthly") || "Monthly" },
      { value: "YEARLY", label: s.localize("ui.components.calendar.event.repeat.freq.yearly") || "Yearly" }
    ],
    mode: "dropdown"
  } }}
                    .value=${t.recurrence || "none"}
                    .label=${s.localize("ui.components.calendar.event.repeat.label") || "Repeat"}
                    @value-changed=${(c) => a({ recurrence: c.detail.value })}
                ></ha-selector>

                <div class="dialog-actions">
                    <ha-button @click=${i}>
                        ${s.localize("ui.common.cancel") || "Cancel"}
                    </ha-button>
                    <ha-button
                        unelevated
                        @click=${n}
                        ?disabled=${!t.name || !t.calendar_id}
                    >
                        ${s.localize("ui.common.save") || "Save"}
                    </ha-button>
                </div>
        </div>
    `;
}
var et = Object.defineProperty, Tt = Object.getOwnPropertyDescriptor, Dt = (s, e, t) => e in s ? et(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, R = (s, e, t, a) => {
  for (var i = a > 1 ? void 0 : a ? Tt(e, t) : e, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (a ? o(e, t, i) : o(i)) || i);
  return a && i && et(e, t, i), i;
}, Pt = (s, e, t) => Dt(s, e + "", t);
let j = class extends Z {
  constructor() {
    super(...arguments);
    z(this, "hass");
    z(this, "config");
    z(this, "open", !1);
    z(this, "mode", "detail");
    z(this, "detailTitle", "");
    z(this, "detailEvents", []);
    z(this, "_addEventState", { open: !1 });
    z(this, "_opener", null);
    z(this, "_onEventSaved", null);
    z(this, "_onPopState", (e) => {
      var t;
      this.open && !((t = window.history.state) != null && t.calendarCardPlusPopup) && this._close();
    });
    z(this, "_close", () => {
      if (!this.open) return;
      this.open = !1, this.requestUpdate();
      const e = { dialog: this };
      this.dispatchEvent(new CustomEvent("closed", { bubbles: !0, composed: !0, detail: e })), this.dispatchEvent(new CustomEvent("dialog-closed", { bubbles: !0, composed: !0, detail: e })), this.dispatchEvent(new CustomEvent("popup-closed", { bubbles: !0, composed: !0, detail: e }));
    });
    z(this, "_onDialogClosed", (e) => {
      var t;
      if (e && e.type !== "click") {
        const a = e.target;
        if (a && a.tagName !== "HA-ADAPTIVE-DIALOG" && a.tagName !== "HA-DIALOG")
          return;
      }
      this._close(), (t = window.history.state) != null && t.calendarCardPlusPopup && window.history.back();
    });
    z(this, "_closeDialog", () => {
      var e;
      this.open && (this._close(), (e = window.history.state) != null && e.calendarCardPlusPopup && window.history.back());
    });
  }
  async showDialog(e) {
    this.hass = e.hass, this.config = e.config, this._opener = e.opener, this.mode = e.mode, e.title && (this.detailTitle = e.title), e.events && (this.detailEvents = e.events), e.addEventState && (this._addEventState = e.addEventState), e.onEventSaved && (this._onEventSaved = e.onEventSaved), this.open = !0, window.history.pushState({ calendarCardPlusPopup: !0 }, ""), this.requestUpdate(), await this.updateComplete;
    const t = this.renderRoot.querySelector("ha-adaptive-dialog");
    if (t && t.shadowRoot) {
      const a = t.shadowRoot.querySelector("ha-bottom-sheet");
      a && (a.style.removeProperty("--dialog-transform"), a.style.removeProperty("--dialog-transition"));
    }
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("popstate", this._onPopState);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("popstate", this._onPopState);
  }
  _updateAddEventState(e) {
    this._addEventState = { ...this._addEventState, ...e }, this.requestUpdate();
  }
  async _handleSave() {
    await zt(
      this.hass,
      this._addEventState,
      () => {
        this.dispatchEvent(new CustomEvent("event-saved", { bubbles: !0, composed: !0 })), this._onEventSaved && this._onEventSaved(), this._closeDialog();
      },
      (e) => {
        alert("Error saving event: " + e.message);
      }
    );
  }
  render() {
    var a;
    const e = this.mode === "add-event", t = e ? ((a = this.hass) == null ? void 0 : a.localize("ui.components.calendar.event.add")) || "Add Event" : this.detailTitle;
    return p`
            <ha-adaptive-dialog
                .hass=${this.hass}
                .open=${this.open}
                .headerTitle=${t}
                @closed=${this._onDialogClosed}
                @ha-dialog-closed=${this._onDialogClosed}
                flexcontent
            >
                <div class="dialog-content scrollable ha-scrollbar">
                    ${e ? St(
      this.hass,
      this.config,
      this._addEventState,
      this._updateAddEventState.bind(this),
      this._closeDialog.bind(this),
      this._handleSave.bind(this)
    ) : this._renderDetailContent()}
                </div>
            </ha-adaptive-dialog>
        `;
  }
  _renderDetailContent() {
    return this.config.group_by_date ? Xe(this.detailEvents).map((t) => {
      const a = t.date, i = V(t.events[0].entity_id, this.config), n = ne(this.hass, a, i, this.config.dark_mode ?? !1), o = se(t.events[0].entity_id, this.config), l = o ? `background-color: ${o}; border: none;` : "";
      return p`
                    <div class="calendar-item grouped detail" style="align-items: center; ${l}">
                        <div class="calendar-icon dynamic">
                            ${n}
                        </div>
                        <div class="calendar-content">
                            ${t.events.map((d) => {
        var x;
        const r = d.is_empty ? w(this.hass, "empty") : d.summary, _ = new Date(d.start.dateTime || d.start.date), u = new Date(d.end.dateTime || d.end.date), h = !d.start.dateTime, g = oe(this.hass, _, u, h), f = ((x = this.hass.locale) == null ? void 0 : x.language) || this.hass.language || navigator.language, C = (m) => m.toLocaleTimeString(f, { hour: "2-digit", minute: "2-digit" }), $ = `${C(_)} - ${C(u)}`, c = this.config.show_date ?? !1, y = this.config.show_time ?? !1, b = this.hass.localize("component.calendar.entity_component._.state_attributes.all_day.name") || "All day";
        let v = "";
        if (d.is_empty)
          v = "";
        else if (c || y)
          if (h) {
            const m = c ? _.toLocaleDateString(f, { day: "2-digit", month: "2-digit", year: "numeric" }) : "";
            c && y ? v = `${m}, ${b}` : v = m || b;
          } else {
            const m = [];
            c && m.push(_.toLocaleDateString(f, { day: "2-digit", month: "2-digit", year: "numeric" })), y && m.push($), v = m.join(", ");
          }
        else
          v = h ? b : C(_);
        if (!d.is_empty && this.config.show_duration && (v.endsWith(g) || (v += ` • ${g}`)), !d.is_empty && this.config.show_weekday) {
          const m = _.toLocaleDateString(f, { weekday: this.config.show_weekday_long ? "long" : "short" });
          v.includes(m) || (v += ` • ${m}`);
        }
        return p`
                                    <div class="event-entry" @click=${() => d.is_empty ? null : this._handleMoreInfo(d.entity_id)} style="margin-bottom: 4px; ${d.is_empty ? "opacity: 0.7; cursor: default;" : ""}">
                                        <div class="event-title">
                                            ${r}
                                        </div>
                                        <div class="event-time" style="display: flex; align-items: center; gap: 4px;">
                                            ${!d.is_empty && (c || y) ? p`<ha-icon icon="mdi:clock-time-four-outline" style="--mdc-icon-size: 14px;"></ha-icon>` : ""}
                                            ${v}
                                        </div>
                                        ${!d.is_empty && this.config.show_location && d.location ? p`
                                                <div class="event-location">
                                                    <ha-icon icon="mdi:map-marker" style="--mdc-icon-size: 14px;"></ha-icon>
                                                    ${d.location}
                                                </div>
                                            ` : ""}
                                        ${this.config.show_calendar_name && d.calendar_name ? p`
                                                <div class="event-calendar">
                                                    <ha-icon icon="mdi:calendar-blank-multiple" style="--mdc-icon-size: 14px;"></ha-icon>
                                                    ${d.calendar_name}
                                                </div>
                                            ` : ""}
                                    </div>
                                `;
      })}
                        </div>
                    </div>
                    ${this.config.show_divider ? p`<div class="calendar-divider"></div>` : ""}
                `;
    }) : this.detailEvents.map((e, t) => {
      var A;
      const a = e.is_empty ? w(this.hass, "empty") : e.summary;
      let i = "", n, o;
      try {
        n = new Date(e.start.dateTime || e.start.date), o = new Date(e.end.dateTime || e.end.date);
      } catch {
        return p`<div class="error">Date Error</div>`;
      }
      const l = /* @__PURE__ */ new Date(), d = !e.start.dateTime, r = ((A = this.hass.locale) == null ? void 0 : A.language) || this.hass.language || navigator.language, _ = (E) => E.toLocaleTimeString(r, { hour: "2-digit", minute: "2-digit" }), u = oe(this.hass, n, o, d), h = `${_(n)} - ${_(o)}`, g = this.config.show_date ?? !1, f = this.config.show_time ?? !1, C = this.hass.localize("component.calendar.entity_component._.state_attributes.all_day.name") || "All day";
      if (e.is_empty)
        i = "";
      else if (g || f)
        if (d) {
          const E = g ? n.toLocaleDateString(r, { day: "2-digit", month: "2-digit", year: "numeric" }) : "";
          g && f ? i = `${E}, ${C}` : i = E || C;
        } else {
          const E = [];
          g && E.push(n.toLocaleDateString(r, { day: "2-digit", month: "2-digit", year: "numeric" })), f && E.push(h), i = E.join(", ");
        }
      else if (n > l) {
        const E = n.getTime() - l.getTime(), P = Math.ceil(E / 6e4);
        i = ke(this.hass, P);
      } else
        i = d ? C : _(n);
      if (!e.is_empty && this.config.show_duration && (i ? i.endsWith(u) || (i += ` • ${u}`) : i = u), !e.is_empty && this.config.show_weekday) {
        const E = n.toLocaleDateString(r, { weekday: this.config.show_weekday_long ? "long" : "short" });
        i += ` • ${E}`;
      }
      const c = !e.is_empty && n <= l && o >= l ? l : n, y = e.is_empty ? "var(--disabled-text-color, #bdbdbb)" : V(e.entity_id, this.config), b = ne(this.hass, c, y, this.config.dark_mode ?? !1), v = this.config.show_divider && t > 0, x = se(e.entity_id, this.config), m = x ? `background-color: ${x}; border: none;` : "";
      return p`
                ${v ? p`<div class="calendar-divider"></div>` : ""}
                <div class="calendar-item detail" style="${m} ${e.is_empty ? "cursor: default; opacity: 0.7;" : ""}" @click=${() => e.is_empty ? null : this._handleMoreInfo(e.entity_id)}>
                    <div class="calendar-icon dynamic">
                        ${b}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title">${a}</div>
                        <div class="event-time">
                            ${!e.is_empty && (g || f) ? p`<ha-icon icon="mdi:clock-time-four-outline"></ha-icon>` : ""}
                            ${i}
                        </div>
                        ${!e.is_empty && this.config.show_location && e.location ? p`
                                <div class="event-location">
                                    <ha-icon icon="mdi:map-marker"></ha-icon>
                                    ${e.location}
                                </div>
                            ` : ""}
                        ${this.config.show_calendar_name && e.calendar_name ? p`
                                <div class="event-calendar">
                                    <ha-icon icon="mdi:calendar-blank-multiple"></ha-icon>
                                    ${e.calendar_name}
                                </div>
                            ` : ""}
                    </div>
                </div>
            `;
    });
  }
  _handleMoreInfo(e) {
    const t = new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: e }
    });
    this._opener ? this._opener.dispatchEvent(t) : window.dispatchEvent(t);
  }
};
Pt(j, "styles", Ee`
        :host {
            display: block;
        }

        ha-adaptive-dialog {
            --dialog-content-padding: 0px 12px 12px;
            --ha-dialog-max-width: 96vw !important;
            --ha-bottom-sheet-height: calc(100dvh - max(var(--safe-area-inset-top), 48px)) !important;
            --ha-bottom-sheet-max-height: var(--ha-bottom-sheet-height) !important;
        }

        .dialog-header {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .dialog-title {
            font-size: 1.1em;
            font-weight: 500;
            flex: 1;
        }

        .dialog-content {
            padding: 0 8px 8px 8px;
            min-width: 320px;
        }

        .dialog-footer {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            padding: 8px 16px 16px;
        }

        .calendar-item {
            display: flex;
            align-items: center;
            padding: 8px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .calendar-item.detail {
            background-color: var(--ha-card-background, var(--card-background-color, white));
            border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, #e0e0e0));
            border-radius: var(--ha-card-border-radius, 12px);
            padding: 12px;
            margin-bottom: 8px;
            box-shadow: var(--ha-card-box-shadow, none);
        }

        .calendar-item.detail:hover {
            background-color: var(--secondary-background-color);
        }

        .calendar-icon {
            width: 40px;
            height: 40px;
            margin-right: 12px;
            flex-shrink: 0;
            border-radius: 8px;
            overflow: hidden;
        }

        .calendar-content {
            flex: 1;
            min-width: 0;
        }

        .event-title {
            font-weight: 500;
            font-size: 1.1em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .event-time {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 0.9em;
            color: var(--secondary-text-color);
        }
        .event-time ha-icon {
            --mdc-icon-size: 14px;
            color: var(--secondary-text-color);
        }
        .event-location, .event-calendar {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 0.9em;
            color: var(--secondary-text-color);
            margin-top: 1px;
        }
        .event-location ha-icon, .event-calendar ha-icon {
            --mdc-icon-size: 14px;
            color: var(--secondary-text-color);
        }
        
        .calendar-divider {
            border-top: 1px solid var(--divider-color, #e0e0e0);
            margin: 4px 12px;
        }

        .add-event-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .row-flex {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .date-row {
            display: flex;
            gap: 8px;
            align-items: flex-start;
        }
        
        .date-selector {
            flex: 2;
        }
        
        .time-inputs-wrap {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .dialog-actions {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            margin-top: 8px;
        }

        .calendar-item.grouped .calendar-content {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        .calendar-item.grouped .event-entry {
            display: flex;
            flex-direction: column;
        }
        .calendar-item.grouped .calendar-icon {
            align-self: center;
        }
    `);
R([
  B({ attribute: !1 })
], j.prototype, "hass", 2);
R([
  B({ attribute: !1 })
], j.prototype, "config", 2);
R([
  B({ type: Boolean })
], j.prototype, "open", 2);
R([
  B({ type: String })
], j.prototype, "mode", 2);
R([
  B({ type: String })
], j.prototype, "detailTitle", 2);
R([
  B({ type: Array })
], j.prototype, "detailEvents", 2);
R([
  he()
], j.prototype, "_addEventState", 2);
j = R([
  Te("calendar-card-plus-popup")
], j);
const Mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get CalendarCardPlusPopup() {
    return j;
  }
}, Symbol.toStringTag, { value: "Module" }));
var Lt = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, ge = (s, e, t, a) => {
  for (var i = a > 1 ? void 0 : a ? jt(e, t) : e, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (a ? o(e, t, i) : o(i)) || i);
  return a && i && Lt(e, t, i), i;
};
let ce = class extends Z {
  constructor() {
    super(...arguments);
    z(this, "hass");
    z(this, "config");
    z(this, "_events");
    z(this, "_handleShowDetail", async (e) => {
      this._showPopup("calendar-card-plus-popup", {
        hass: this.hass,
        config: this.config,
        opener: this,
        mode: "detail",
        title: e.detail.title,
        events: e.detail.entities
      });
    });
    z(this, "_openAddEventPopup", async () => {
      const e = Et(this.hass, this.config);
      this._showPopup("calendar-card-plus-popup", {
        hass: this.hass,
        config: this.config,
        opener: this,
        mode: "add-event",
        addEventState: e
      });
    });
    z(this, "_onEventSaved", () => {
      this._events = void 0, this.requestUpdate(), this._fetchEvents();
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("calendar-card-show-detail", this._handleShowDetail);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("calendar-card-show-detail", this._handleShowDetail);
  }
  willUpdate(e) {
    super.willUpdate(e), this.hass && this.config && (this._events === void 0 || e.has("config")) && this._fetchEvents();
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration");
    this.config = e;
  }
  async _fetchEvents() {
    if (!this.hass || !this.config) return;
    const e = /* @__PURE__ */ new Date();
    let t;
    if (this.config.upcoming_events) {
      let n = 1440;
      this.config.days !== void 0 || this.config.hours !== void 0 || this.config.minutes !== void 0 ? n = (this.config.days || 0) * 1440 + (this.config.hours || 0) * 60 + (this.config.minutes || 0) : this.config.max_minutes_until_start !== void 0 && (n = this.config.max_minutes_until_start), t = new Date(e.getTime() + n * 6e4);
    } else
      t = new Date(e), t.setHours(23, 59, 59, 999);
    const a = Object.keys(this.hass.states).filter((n) => n.startsWith("calendar.")).filter((n) => {
      var o;
      return !((o = this.config.exclude_entities) != null && o.includes(n));
    });
    if (a.length === 0) {
      this._events = [];
      return;
    }
    const i = await st(this.hass, e, t, a);
    this.config.show_empty_days ? this._events = this._injectEmptyDays(i, e, t) : this._events = i, this.requestUpdate();
  }
  _injectEmptyDays(e, t, a) {
    const i = [...e], n = /* @__PURE__ */ new Set();
    e.forEach((d) => {
      const r = d.start.date || d.start.dateTime;
      if (r) {
        const _ = new Date(r);
        n.add(_.toISOString().split("T")[0]);
      }
    });
    const o = new Date(t);
    o.setHours(0, 0, 0, 0);
    const l = new Date(a);
    for (l.setHours(0, 0, 0, 0); o <= l; ) {
      const d = o.toISOString().split("T")[0];
      n.has(d) || i.push({
        start: { date: d },
        end: { date: d },
        summary: "empty",
        is_empty: !0,
        entity_id: "empty",
        calendar_name: ""
      }), o.setDate(o.getDate() + 1);
    }
    return i.sort((d, r) => {
      const _ = new Date(d.start.dateTime || d.start.date).getTime(), u = new Date(r.start.dateTime || r.start.date).getTime();
      return _ - u;
    });
  }
  render() {
    if (!this.config || !this.hass)
      return p``;
    const e = At(this.hass, this._events, this.config);
    return p`
            <ha-card>
                <div class="add-event-btn" @click=${this._openAddEventPopup} style=${this.config.show_add_event ? "" : "display: none;"}>
                    <ha-icon-button .path=${it}></ha-icon-button>
                </div>
                ${e}
            </ha-card>
        `;
  }
  _showPopup(e, t) {
    this.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: e,
          dialogImport: () => Promise.resolve().then(() => Mt),
          dialogParams: {
            ...t,
            onEventSaved: this._onEventSaved
          }
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  static get styles() {
    return Ee`
            :host {
                display: block;
            }
            ha-card {
                height: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            
            .calendar-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 100%;
                width: 100%;
                box-sizing: border-box;
            }
            .calendar-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                border-radius: var(--ha-card-border-radius, 12px);
                cursor: pointer;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .calendar-item:last-child {
                margin-bottom: 0px;
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
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 12px;
                color: var(--secondary-text-color);
            }
            .event-time ha-icon {
                --mdc-icon-size: 14px;
                color: var(--secondary-text-color);
            }
            .event-location, .event-calendar {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 0.9em;
                color: var(--secondary-text-color);
                margin-top: 1px;
            }
            .event-location ha-icon, .event-calendar ha-icon {
                --mdc-icon-size: 14px;
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
                border-top: 1px solid var(--divider-color, #e0e0e0);
                margin: 4px 12px;
            }

            .add-event-btn {
                position: absolute;
                top: 8px;
                right: 8px;
                z-index: 2;
                color: var(--secondary-text-color);
            }
            .add-event-btn:hover {
                color: var(--primary-text-color);
            }
            .calendar-item.grouped .calendar-content {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }
            .calendar-item.grouped .event-entry {
                display: flex;
                flex-direction: column;
            }
            .calendar-item.grouped .calendar-icon {
                align-self: center;
            }
        `;
  }
  getCardSize() {
    return 1;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Nt), document.createElement("calendar-card-plus-editor");
  }
  static getStubConfig(e) {
    return {
      type: "custom:calendar-card-plus",
      exclude_entities: [],
      unfold_events: !1
    };
  }
};
ge([
  B({ attribute: !1 })
], ce.prototype, "hass", 2);
ge([
  he()
], ce.prototype, "config", 2);
ge([
  he()
], ce.prototype, "_events", 2);
ce = ge([
  Te("calendar-card-plus")
], ce);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "calendar-card-plus",
  name: "Dynamic Calendar Card Plus",
  preview: !0,
  description: "A standalone calendar card with dynamic grid styling"
});
const N = (s, e, t, a) => {
  a = a || {}, t = t ?? {};
  const i = new Event(e, {
    bubbles: a.bubbles === void 0 ? !0 : a.bubbles,
    cancelable: !!a.cancelable,
    composed: a.composed === void 0 ? !0 : a.composed
  });
  return i.detail = t, s.dispatchEvent(i), i;
};
var Ot = Object.defineProperty, Bt = Object.getOwnPropertyDescriptor, ye = (s, e, t, a) => {
  for (var i = a > 1 ? void 0 : a ? Bt(e, t) : e, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (a ? o(e, t, i) : o(i)) || i);
  return a && i && Ot(e, t, i), i;
};
let J = class extends Z {
  constructor() {
    super(...arguments);
    z(this, "hass");
    z(this, "_config", { type: "custom:calendar-card-plus" });
    z(this, "_showAllCalendars", !1);
  }
  set config(e) {
    this.setConfig(e);
  }
  setConfig(e) {
    this._config = e, this.requestUpdate();
  }
  render() {
    var l, d, r, _, u, h, g, f, C, $;
    if (!this.hass)
      return p``;
    const e = this._config.upcoming_events ?? !1, t = this._config.unfold_events ?? !1, a = this._config.days ?? 1, i = this._config.hours ?? 0, n = this._config.minutes ?? 0, o = this._config.exclude_entities ?? [];
    return p`
            <div class="card-config">


                <ha-expansion-panel outlined>
                    <div slot="header" role="heading" aria-level="3" style="display: flex; align-items: center; gap: 8px;">
                        <ha-icon icon="mdi:cog" style="color: var(--secondary-text-color);"></ha-icon>
                        ${w(this.hass, "editor_configuration")}
                    </div>
                    <div class="settings-grid" style="margin-top: 16px; margin-bottom: 16px;">
                        <div class="settings-row">
                            <span class="label">${w(this.hass, "editor_unfold_events")}</span>
                            <ha-switch
                                .checked=${t}
                                @change=${this._compactModeChanged}
                            ></ha-switch>
                        </div>
                        <div class="settings-row">
                            <span class="label">${w(this.hass, "editor_show_divider")}</span>
                            <ha-switch
                                .checked=${this._config.show_divider ?? !1}
                                @change=${this._calendarDividerChanged}
                            ></ha-switch>
                        </div>
                        <div class="settings-row">
                            <span class="label">${w(this.hass, "editor_show_add_event")}</span>
                            <ha-switch
                                .checked=${this._config.show_add_event ?? !1}
                                @change=${(c) => this._toggleBooleanConfig(c, "show_add_event")}
                            ></ha-switch>
                        </div>
                        <div class="settings-row">
                            <span class="label">${w(this.hass, "group_by_date")}</span>
                            <ha-switch
                                .checked=${this._config.group_by_date ?? !1}
                                @change=${(c) => this._toggleBooleanConfig(c, "group_by_date")}
                            ></ha-switch>
                        </div>
                        <div class="settings-row">
                            <span class="label">Dark Mode</span>
                            <ha-switch
                                .checked=${this._config.dark_mode ?? !1}
                                @change=${(c) => this._toggleBooleanConfig(c, "dark_mode")}
                            ></ha-switch>
                        </div>
                        <div class="settings-row">
                            <span class="label">${w(this.hass, "editor_show_upcoming")}</span>
                            <ha-switch
                                .checked=${e}
                                @change=${this._calendarShowAllChanged}
                            ></ha-switch>
                        </div>
                        <div class="settings-row">
                            <span class="label">${w(this.hass, "editor_show_empty_days")}</span>
                            <ha-switch
                                .checked=${this._config.show_empty_days ?? !1}
                                @change=${(c) => this._toggleBooleanConfig(c, "show_empty_days")}
                            ></ha-switch>
                        </div>
                    </div>

                    ${t ? p`
                        <div class="settings-row full-width" style="margin-bottom: 16px;">
                            <ha-selector
                                .hass=${this.hass}
                                .selector=${{ number: { min: 0, max: 20, mode: "box" } }}
                                .value=${this._config.max_lines || 0}
                                .label=${w(this.hass, "editor_max_lines")}
                                .configValue=${"max_lines"}
                                @value-changed=${this._valueChanged}
                            ></ha-selector>
                        </div>
                    ` : ""}

                    ${e ? p`
                        <div class="settings-row full-width" style="margin-bottom: 8px;">
                             <span class="label" style="margin-bottom: 8px;">${((l = this.hass) == null ? void 0 : l.localize("ui.panel.lovelace.editor.card.statistic.period")) || "Period"}</span>
                             <div class="period-selectors">
                                <ha-selector
                                    .hass=${this.hass}
                                    .selector=${{ number: { min: 0, max: 365, mode: "box" } }}
                                    .value=${a}
                                    .label=${((d = this.hass) == null ? void 0 : d.localize("component.input_datetime.entity_component._.state_attributes.day.name")) || "Days"}
                                    .configValue=${"days"}
                                    @value-changed=${this._valueChanged}
                                ></ha-selector>
                                <ha-selector
                                    .hass=${this.hass}
                                    .selector=${{ number: { min: 0, max: 23, mode: "box" } }}
                                    .value=${i}
                                    .label=${((r = this.hass) == null ? void 0 : r.localize("component.input_datetime.entity_component._.state_attributes.hour.name")) || "Hours"}
                                    .configValue=${"hours"}
                                    @value-changed=${this._valueChanged}
                                ></ha-selector>
                                <ha-selector
                                    .hass=${this.hass}
                                    .selector=${{ number: { min: 0, max: 59, mode: "box" } }}
                                    .value=${n}
                                    .label=${((_ = this.hass) == null ? void 0 : _.localize("component.input_datetime.entity_component._.state_attributes.minute.name")) || "Minutes"}
                                    .configValue=${"minutes"}
                                    @value-changed=${this._valueChanged}
                                ></ha-selector>
                             </div>
                        </div>
                    ` : ""}

                    <div class="settings-row full-width" style="margin-bottom: 16px;">
                        <ha-selector
                            .hass=${this.hass}
                            .selector=${{ ui_color: {} }}
                            .value=${this._config.calendar_icon_color || ""}
                            .label="Global ${this.hass.localize("ui.panel.lovelace.editor.card.tile.color") || "Color"}"
                            .configValue=${"calendar_icon_color"}
                            @value-changed=${this._valueChanged}
                        ></ha-selector>
                    </div>

                    <div class="settings-row full-width" style="margin-bottom: 16px;">
                        <ha-selector
                            .hass=${this.hass}
                            .selector=${{ ui_color: {} }}
                            .value=${this._config.background_color || ""}
                            .label=${w(this.hass, "editor_background_color")}
                            .configValue=${"background_color"}
                            @value-changed=${this._valueChanged}
                        ></ha-selector>
                    </div>
                </ha-expansion-panel>

                <ha-expansion-panel outlined>
                    <div slot="header" role="heading" aria-level="3" style="display: flex; align-items: center; gap: 8px;">
                        <ha-icon icon="mdi:card-text" style="color: var(--secondary-text-color);"></ha-icon>
                        ${w(this.hass, "editor_text_visibility")}
                    </div>
                    <div class="settings-grid" style="margin-top: 16px; margin-bottom: 16px;">
                        <div class="settings-row">
                            <span class="label">${(u = this.hass) == null ? void 0 : u.localize("ui.common.show")} ${(h = this.hass) == null ? void 0 : h.localize("component.calendar.entity_component._.name")} ${(g = this.hass) == null ? void 0 : g.localize("ui.common.name")}</span>
                            <ha-switch
                                .checked=${this._config.show_calendar_name ?? !1}
                                @change=${(c) => this._toggleBooleanConfig(c, "show_calendar_name")}
                            ></ha-switch>
                        </div>
                        <div class="settings-row">
                            <span class="label">${(f = this.hass) == null ? void 0 : f.localize("ui.common.show")} ${((C = this.hass) == null ? void 0 : C.localize("ui.dialogs.helper_settings.input_datetime.date")) || "Date"}</span>
                            <ha-switch
                                .checked=${this._config.show_date ?? !1}
                                @change=${(c) => this._toggleBooleanConfig(c, "show_date")}
                            ></ha-switch>
                        </div>
                        <div class="settings-row">
                            <span class="label">${w(this.hass, "editor_show_location")}</span>
                            <ha-switch
                                .checked=${this._config.show_location ?? !1}
                                @change=${(c) => this._toggleBooleanConfig(c, "show_location")}
                            ></ha-switch>
                        </div>
                        <div class="settings-row">
                            <span class="label">${w(this.hass, "editor_show_duration")}</span>
                            <ha-switch
                                .checked=${this._config.show_duration ?? !1}
                                @change=${(c) => this._toggleBooleanConfig(c, "show_duration")}
                            ></ha-switch>
                        </div>
                        <div class="settings-row">
                            <span class="label">${w(this.hass, "editor_show_time")}</span>
                            <ha-switch
                                .checked=${this._config.show_time ?? !1}
                                @change=${(c) => this._toggleBooleanConfig(c, "show_time")}
                            ></ha-switch>
                        </div>
                        <div class="settings-row">
                            <span class="label">${w(this.hass, "editor_icon_show_weekday")}</span>
                            <ha-switch
                                .checked=${this._config.icon_show_weekday ?? !1}
                                @change=${(c) => this._toggleBooleanConfig(c, "icon_show_weekday")}
                            ></ha-switch>
                        </div>
                        <div class="settings-row">
                            <span class="label">${this._config.icon_show_weekday ? w(this.hass, "editor_show_month") : w(this.hass, "editor_show_weekday")}</span>
                            <ha-switch
                                .checked=${this._config.show_weekday ?? !1}
                                @change=${(c) => this._toggleBooleanConfig(c, "show_weekday")}
                            ></ha-switch>
                        </div>
                        ${this._config.show_weekday ? p`
                            <div class="settings-row">
                                <span class="label" style="color: var(--secondary-text-color);">${this._config.icon_show_weekday ? w(this.hass, "editor_show_month_long") : w(this.hass, "editor_show_weekday_long")}</span>
                                <ha-switch
                                    .checked=${this._config.show_weekday_long ?? !1}
                                    @change=${(c) => this._toggleBooleanConfig(c, "show_weekday_long")}
                                ></ha-switch>
                            </div>
                            <div></div>
                        ` : ""}
                    </div>
                </ha-expansion-panel>



                <h4>${(($ = this.hass) == null ? void 0 : $.localize("ui.components.calendar.my_calendars")) || "Calendars"}</h4>
                <div class="entities-list">
                    ${(() => {
      const c = this._getCalendarEntities(), y = this._showAllCalendars ? c : c.slice(0, 3), b = c.length > 3;
      return p`
                            ${y.map((v) => {
        var E, P, L, O, T;
        const x = !o.includes(v.entity_id), m = ((E = this._config.calendar_colors) == null ? void 0 : E[v.entity_id]) || "", A = this._toCssColor(m || this._config.calendar_icon_color || "#fa3e3e");
        return p`
                                    <div class="entity-row ${x ? "" : "disabled"}">
                                        <div class="entity-row-top">
                                            <div class="entity-icon dynamic" style="background: transparent;">
                                                ${this._renderDynamicIcon(/* @__PURE__ */ new Date(), A, this._config.dark_mode ?? !1, this._config.icon_show_weekday ?? !1)}
                                            </div>
                                            <div class="entity-info">
                                                <span class="entity-name">${v.attributes.friendly_name || v.entity_id}</span>
                                                <span class="entity-id">${v.entity_id}</span>
                                            </div>
                                            <ha-button
                                                size="small" 
                                                appearance="filled" 
                                                variant="brand" 
                                                class="${x ? "action-hide" : "action-show"}"
                                                @click=${(M) => this._calendarToggleEntity(M, v.entity_id)}
                                            >
                                                ${x ? ((P = this.hass) == null ? void 0 : P.localize("ui.common.hide")) || "Hide" : ((L = this.hass) == null ? void 0 : L.localize("ui.common.show")) || "Show"}
                                            </ha-button>
                                        </div>
                                        <div class="entity-row-bottom">
                                             <ha-selector
                                                .hass=${this.hass}
                                                .selector=${{ ui_color: {} }}
                                                .value=${m}
                                                .label=${((O = this.hass) == null ? void 0 : O.localize("ui.panel.lovelace.editor.card.tile.color")) || "Color"}
                                                @value-changed=${(M) => this._calendarColorChanged(M, v.entity_id)}
                                            ></ha-selector>
                                            <ha-selector
                                                .hass=${this.hass}
                                                .selector=${{ ui_color: {} }}
                                                .value=${((T = this._config.calendar_background_colors) == null ? void 0 : T[v.entity_id]) || ""}
                                                .label=${w(this.hass, "editor_background_color")}
                                                @value-changed=${(M) => this._calendarBackgroundColorChanged(M, v.entity_id)}
                                            ></ha-selector>
                                        </div>
                                    </div>
                                `;
      })}
                            ${b ? p`
                                <div class="show-more-row">
                                    <ha-button @click=${() => {
        this._showAllCalendars = !this._showAllCalendars, this.requestUpdate();
      }}>
                                        ${this._showAllCalendars ? w(this.hass, "editor_show_less") : w(this.hass, "editor_show_more")}
                                    </ha-button>
                                </div>
                            ` : ""}
                        `;
    })()}
                </div>
            </div>
        `;
  }
  _getCalendarEntities() {
    return this.hass ? Object.keys(this.hass.states).filter((e) => e.startsWith("calendar.")).map((e) => {
      var t;
      return (t = this.hass) == null ? void 0 : t.states[e];
    }) : [];
  }
  _calendarToggleEntity(e, t) {
    e.stopPropagation();
    const a = [...this._config.exclude_entities ?? []], i = a.indexOf(t);
    i === -1 ? a.push(t) : a.splice(i, 1), this._config = {
      ...this._config,
      exclude_entities: a
    }, N(this, "config-changed", { config: this._config });
  }
  _calendarShowAllChanged(e) {
    const t = e.target.checked;
    this._config = {
      ...this._config,
      upcoming_events: t
    }, N(this, "config-changed", { config: this._config });
  }
  _compactModeChanged(e) {
    const t = e.target.checked;
    this._config = {
      ...this._config,
      unfold_events: t
    }, N(this, "config-changed", { config: this._config });
  }
  _calendarDividerChanged(e) {
    const t = e.target.checked;
    this._config = {
      ...this._config,
      show_divider: t
    }, N(this, "config-changed", { config: this._config });
  }
  _toggleBooleanConfig(e, t) {
    const a = e.target.checked;
    this._config = {
      ...this._config,
      [t]: a
    }, N(this, "config-changed", { config: this._config });
  }
  _valueChanged(e) {
    var o;
    if (!this._config || !this.hass)
      return;
    const a = e.target.configValue;
    if (!a)
      return;
    const i = (o = e.detail) == null ? void 0 : o.value;
    if (this._config[a] === i)
      return;
    const n = { ...this._config };
    i == null || i === "" ? delete n[a] : n[a] = i, this._config = n, N(this, "config-changed", { config: this._config });
  }
  _calendarColorChanged(e, t) {
    const a = e.detail.value, i = { ...this._config.calendar_colors || {} };
    if (a == null || a === "" ? delete i[t] : i[t] = a, Object.keys(i).length === 0) {
      const n = { ...this._config };
      delete n.calendar_colors, this._config = n;
    } else
      this._config = {
        ...this._config,
        calendar_colors: i
      };
    N(this, "config-changed", { config: this._config });
  }
  _calendarBackgroundColorChanged(e, t) {
    const a = e.detail.value, i = { ...this._config.calendar_background_colors || {} };
    if (a == null || a === "" ? delete i[t] : i[t] = a, Object.keys(i).length === 0) {
      const n = { ...this._config };
      delete n.calendar_background_colors, this._config = n;
    } else
      this._config = {
        ...this._config,
        calendar_background_colors: i
      };
    N(this, "config-changed", { config: this._config });
  }
  static get styles() {
    return Ee`
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
            .settings-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 32px 16px;
            }
            @media (min-width: 600px) {
                .settings-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            .settings-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
            }
            .settings-row.full-width {
                flex-direction: column;
                align-items: stretch;
            }
            .settings-row.full-width ha-selector {
                width: 100%;
            }
            .period-selectors {
                display: flex;
                flex-direction: row;
                gap: 8px;
                width: 100%;
            }
            .period-selectors ha-selector {
                 flex: 1;
            }
            .entities-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding-bottom: 12px;
            }
            .show-more-row {
                display: flex;
                justify-content: center;
                margin-top: 8px;
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
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .entity-row.disabled {
                opacity: 0.6;
            }
            .entity-icon {
                width: 36px;
                height: 36px;
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
  _toCssColor(e) {
    return e.startsWith("#") || e.startsWith("rgb") || e.startsWith("hsl") || e.startsWith("var") ? e : `var(--${e}-color)`;
  }
  _renderDynamicIcon(e, t, a = !1, i = !1) {
    var u, h, g;
    const n = ((h = (u = this.hass) == null ? void 0 : u.locale) == null ? void 0 : h.language) || ((g = this.hass) == null ? void 0 : g.language) || navigator.language || "en";
    let o;
    i ? o = e.toLocaleDateString(n, { weekday: "short" }).toUpperCase() : o = e.toLocaleDateString(n, { month: "short" }).toUpperCase();
    const l = e.getDate();
    return p`
            <svg viewBox="0 0 100 100" class="dynamic-calendar-icon" style="width: 100%; height: 100%; display: block;">
                <rect x="0" y="0" width="100" height="100" rx="20" ry="20" fill="${a ? "#222222" : "white"}"></rect>
                <path d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z" fill="${t}"></path>
                <text x="50" y="23" font-family="sans-serif" font-size="22" font-weight="bold" fill="${a ? "#222222" : "white"}" text-anchor="middle">${o}</text>
                <text x="50" y="82" font-family="sans-serif" font-size="52" font-weight="bold" fill="${a ? "white" : "#333"}" text-anchor="middle">${l}</text>
            </svg>
        `;
  }
};
ye([
  B({ attribute: !1 })
], J.prototype, "hass", 2);
ye([
  he()
], J.prototype, "_config", 2);
ye([
  he()
], J.prototype, "_showAllCalendars", 2);
J = ye([
  Te("calendar-card-plus-editor")
], J);
const Nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get CalendarCardPlusEditor() {
    return J;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  ce as CalendarCardPlus
};
