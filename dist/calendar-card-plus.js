var Xe = Object.defineProperty;
var et = (a, e, t) => e in a ? Xe(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var E = (a, e, t) => et(a, typeof e != "symbol" ? e + "" : e, t);
var tt = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
async function it(a, e, t, i) {
  const s = encodeURI(`?start=${e.toISOString()}&end=${t.toISOString()}`), o = i.map(async (d) => {
    try {
      const n = await a.callApi("GET", `calendars/${d}${s}`);
      if (!Array.isArray(n))
        throw new Error("Response is not an array");
      return n.map((l) => {
        var f, h, $, w, m, p;
        const _ = ((f = l.start) == null ? void 0 : f.dateTime) || ((h = l.start) == null ? void 0 : h.date) || l.start, v = (($ = l.end) == null ? void 0 : $.dateTime) || ((w = l.end) == null ? void 0 : w.date) || l.end;
        return {
          ...l,
          start: { dateTime: _.includes("T") ? _ : void 0, date: _.includes("T") ? void 0 : _ },
          end: { dateTime: v.includes("T") ? v : void 0, date: v.includes("T") ? void 0 : v },
          summary: l.summary || l.title || "Unknown Event",
          entity_id: d,
          calendar_name: ((p = (m = a.states[d]) == null ? void 0 : m.attributes) == null ? void 0 : p.friendly_name) || d
        };
      });
    } catch {
      const c = a.states[d];
      return c && c.attributes.start_time && c.attributes.end_time ? [{
        start: { dateTime: c.attributes.start_time.replace(" ", "T") },
        end: { dateTime: c.attributes.end_time.replace(" ", "T") },
        summary: c.attributes.message || c.attributes.friendly_name,
        location: c.attributes.location,
        description: c.attributes.description,
        entity_id: d,
        calendar_name: c.attributes.friendly_name || d
      }] : [];
    }
  });
  return (await Promise.all(o)).flat();
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = globalThis, Ce = ue.ShadowRoot && (ue.ShadyCSS === void 0 || ue.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ze = Symbol(), De = /* @__PURE__ */ new WeakMap();
let Ke = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ze) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ce && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = De.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && De.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const at = (a) => new Ke(typeof a == "string" ? a : a + "", void 0, ze), Ae = (a, ...e) => {
  const t = a.length === 1 ? a[0] : e.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + a[o + 1], a[0]);
  return new Ke(t, a, ze);
}, st = (a, e) => {
  if (Ce) a.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = ue.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, a.appendChild(i);
  }
}, Me = Ce ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return at(t);
})(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ot, defineProperty: nt, getOwnPropertyDescriptor: rt, getOwnPropertyNames: dt, getOwnPropertySymbols: lt, getPrototypeOf: ct } = Object, V = globalThis, Pe = V.trustedTypes, _t = Pe ? Pe.emptyScript : "", we = V.reactiveElementPolyfillSupport, oe = (a, e) => a, me = { toAttribute(a, e) {
  switch (e) {
    case Boolean:
      a = a ? _t : null;
      break;
    case Object:
    case Array:
      a = a == null ? a : JSON.stringify(a);
  }
  return a;
}, fromAttribute(a, e) {
  let t = a;
  switch (e) {
    case Boolean:
      t = a !== null;
      break;
    case Number:
      t = a === null ? null : Number(a);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(a);
      } catch {
        t = null;
      }
  }
  return t;
} }, Ee = (a, e) => !ot(a, e), je = { attribute: !0, type: String, converter: me, reflect: !1, useDefault: !1, hasChanged: Ee };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), V.litPropertyMetadata ?? (V.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let X = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = je) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && nt(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: o } = rt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: s, set(r) {
      const d = s == null ? void 0 : s.call(this);
      o == null || o.call(this, r), this.requestUpdate(e, d, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? je;
  }
  static _$Ei() {
    if (this.hasOwnProperty(oe("elementProperties"))) return;
    const e = ct(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(oe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(oe("properties"))) {
      const t = this.properties, i = [...dt(t), ...lt(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(Me(s));
    } else e !== void 0 && t.push(Me(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return st(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) == null ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    var o;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : me).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, r;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const d = i.getPropertyOptions(s), n = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((o = d.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? d.converter : me;
      this._$Em = s;
      const c = n.fromAttribute(t, d.type);
      this[s] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, o) {
    var r;
    if (e !== void 0) {
      const d = this.constructor;
      if (s === !1 && (o = this[e]), i ?? (i = d.getPropertyOptions(e)), !((i.hasChanged ?? Ee)(o, t) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(d._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), o !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, r] of s) {
        const { wrapped: d } = r, n = this[o];
        d !== !0 || this._$AL.has(o) || n === void 0 || this.C(o, void 0, r, n);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
X.elementStyles = [], X.shadowRootOptions = { mode: "open" }, X[oe("elementProperties")] = /* @__PURE__ */ new Map(), X[oe("finalized")] = /* @__PURE__ */ new Map(), we == null || we({ ReactiveElement: X }), (V.reactiveElementVersions ?? (V.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = globalThis, Le = (a) => a, pe = ne.trustedTypes, Be = pe ? pe.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, Ze = "$lit$", U = `lit$${Math.random().toFixed(9).slice(2)}$`, We = "?" + U, ht = `<${We}>`, Y = document, re = () => Y.createComment(""), de = (a) => a === null || typeof a != "object" && typeof a != "function", Te = Array.isArray, ut = (a) => Te(a) || typeof (a == null ? void 0 : a[Symbol.iterator]) == "function", fe = `[ 	
\f\r]`, se = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ne = /-->/g, Oe = />/g, I = RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), He = /'/g, Ue = /"/g, Ge = /^(?:script|style|textarea|title)$/i, mt = (a) => (e, ...t) => ({ _$litType$: a, strings: e, values: t }), u = mt(1), ee = Symbol.for("lit-noChange"), D = Symbol.for("lit-nothing"), Ve = /* @__PURE__ */ new WeakMap(), K = Y.createTreeWalker(Y, 129);
function qe(a, e) {
  if (!Te(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Be !== void 0 ? Be.createHTML(e) : e;
}
const pt = (a, e) => {
  const t = a.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = se;
  for (let d = 0; d < t; d++) {
    const n = a[d];
    let c, l, _ = -1, v = 0;
    for (; v < n.length && (r.lastIndex = v, l = r.exec(n), l !== null); ) v = r.lastIndex, r === se ? l[1] === "!--" ? r = Ne : l[1] !== void 0 ? r = Oe : l[2] !== void 0 ? (Ge.test(l[2]) && (s = RegExp("</" + l[2], "g")), r = I) : l[3] !== void 0 && (r = I) : r === I ? l[0] === ">" ? (r = s ?? se, _ = -1) : l[1] === void 0 ? _ = -2 : (_ = r.lastIndex - l[2].length, c = l[1], r = l[3] === void 0 ? I : l[3] === '"' ? Ue : He) : r === Ue || r === He ? r = I : r === Ne || r === Oe ? r = se : (r = I, s = void 0);
    const f = r === I && a[d + 1].startsWith("/>") ? " " : "";
    o += r === se ? n + ht : _ >= 0 ? (i.push(c), n.slice(0, _) + Ze + n.slice(_) + U + f) : n + U + (_ === -2 ? d : f);
  }
  return [qe(a, o + (a[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class le {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const d = e.length - 1, n = this.parts, [c, l] = pt(e, t);
    if (this.el = le.createElement(c, i), K.currentNode = this.el.content, t === 2 || t === 3) {
      const _ = this.el.content.firstChild;
      _.replaceWith(..._.childNodes);
    }
    for (; (s = K.nextNode()) !== null && n.length < d; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const _ of s.getAttributeNames()) if (_.endsWith(Ze)) {
          const v = l[r++], f = s.getAttribute(_).split(U), h = /([.?@])?(.*)/.exec(v);
          n.push({ type: 1, index: o, name: h[2], strings: f, ctor: h[1] === "." ? yt : h[1] === "?" ? gt : h[1] === "@" ? wt : ve }), s.removeAttribute(_);
        } else _.startsWith(U) && (n.push({ type: 6, index: o }), s.removeAttribute(_));
        if (Ge.test(s.tagName)) {
          const _ = s.textContent.split(U), v = _.length - 1;
          if (v > 0) {
            s.textContent = pe ? pe.emptyScript : "";
            for (let f = 0; f < v; f++) s.append(_[f], re()), K.nextNode(), n.push({ type: 2, index: ++o });
            s.append(_[v], re());
          }
        }
      } else if (s.nodeType === 8) if (s.data === We) n.push({ type: 2, index: o });
      else {
        let _ = -1;
        for (; (_ = s.data.indexOf(U, _ + 1)) !== -1; ) n.push({ type: 7, index: o }), _ += U.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = Y.createElement("template");
    return i.innerHTML = e, i;
  }
}
function te(a, e, t = a, i) {
  var r, d;
  if (e === ee) return e;
  let s = i !== void 0 ? (r = t._$Co) == null ? void 0 : r[i] : t._$Cl;
  const o = de(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((d = s == null ? void 0 : s._$AO) == null || d.call(s, !1), o === void 0 ? s = void 0 : (s = new o(a), s._$AT(a, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s), s !== void 0 && (e = te(a, s._$AS(a, e.values), s, i)), e;
}
class vt {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? Y).importNode(t, !0);
    K.currentNode = s;
    let o = K.nextNode(), r = 0, d = 0, n = i[0];
    for (; n !== void 0; ) {
      if (r === n.index) {
        let c;
        n.type === 2 ? c = new _e(o, o.nextSibling, this, e) : n.type === 1 ? c = new n.ctor(o, n.name, n.strings, this, e) : n.type === 6 && (c = new ft(o, this, e)), this._$AV.push(c), n = i[++d];
      }
      r !== (n == null ? void 0 : n.index) && (o = K.nextNode(), r++);
    }
    return K.currentNode = Y, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class _e {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    e = te(this, e, t), de(e) ? e === D || e == null || e === "" ? (this._$AH !== D && this._$AR(), this._$AH = D) : e !== this._$AH && e !== ee && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ut(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== D && de(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Y.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = le.createElement(qe(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(t);
    else {
      const r = new vt(s, this), d = r.u(this.options);
      r.p(t), this.T(d), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = Ve.get(e.strings);
    return t === void 0 && Ve.set(e.strings, t = new le(e)), t;
  }
  k(e) {
    Te(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const o of e) s === t.length ? t.push(i = new _e(this.O(re()), this.O(re()), this, this.options)) : i = t[s], i._$AI(o), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = Le(e).nextSibling;
      Le(e).remove(), e = s;
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
  constructor(e, t, i, s, o) {
    this.type = 1, this._$AH = D, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = D;
  }
  _$AI(e, t = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = te(this, e, t, 0), r = !de(e) || e !== this._$AH && e !== ee, r && (this._$AH = e);
    else {
      const d = e;
      let n, c;
      for (e = o[0], n = 0; n < o.length - 1; n++) c = te(this, d[i + n], t, n), c === ee && (c = this._$AH[n]), r || (r = !de(c) || c !== this._$AH[n]), c === D ? e = D : e !== D && (e += (c ?? "") + o[n + 1]), this._$AH[n] = c;
    }
    r && !s && this.j(e);
  }
  j(e) {
    e === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class yt extends ve {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === D ? void 0 : e;
  }
}
class gt extends ve {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== D);
  }
}
class wt extends ve {
  constructor(e, t, i, s, o) {
    super(e, t, i, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = te(this, e, t, 0) ?? D) === ee) return;
    const i = this._$AH, s = e === D && i !== D || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== D && (i === D || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ft {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    te(this, e);
  }
}
const $e = ne.litHtmlPolyfillSupport;
$e == null || $e(le, _e), (ne.litHtmlVersions ?? (ne.litHtmlVersions = [])).push("3.3.2");
const $t = (a, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = s = new _e(e.insertBefore(re(), o), o, void 0, t ?? {});
  }
  return s._$AI(a), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis;
class F extends X {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = $t(t, this.renderRoot, this.renderOptions);
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
    return ee;
  }
}
var Ie;
F._$litElement$ = !0, F.finalized = !0, (Ie = q.litElementHydrateSupport) == null || Ie.call(q, { LitElement: F });
const xe = q.litElementPolyfillSupport;
xe == null || xe({ LitElement: F });
(q.litElementVersions ?? (q.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Se = (a) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(a, e);
  }) : customElements.define(a, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = { attribute: !0, type: String, converter: me, reflect: !1, hasChanged: Ee }, bt = (a = xt, e, t) => {
  const { kind: i, metadata: s } = t;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((a = Object.create(a)).wrapped = !0), o.set(t.name, a), i === "accessor") {
    const { name: r } = t;
    return { set(d) {
      const n = e.get.call(this);
      e.set.call(this, d), this.requestUpdate(r, n, a, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(r, void 0, a, d), d;
    } };
  }
  if (i === "setter") {
    const { name: r } = t;
    return function(d) {
      const n = this[r];
      e.call(this, d), this.requestUpdate(r, n, a, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function N(a) {
  return (e, t) => typeof t == "object" ? bt(a, e, t) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(a, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function he(a) {
  return N({ ...a, state: !0, attribute: !1 });
}
const Q = {
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
    group_by_date_and_calendar: "Group by Day and Calendar",
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
    group_by_date_and_calendar: "Nach Tag und Kalender gruppieren",
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
    no_events: "Pas d'événement",
    more_events: "+{x} autres",
    editor_show_upcoming: "Afficher les événements futurs",
    editor_unfold_events: "Déplier les événements",
    editor_configuration: "Configuration",
    editor_text_visibility: "Visibilité du texte",
    editor_show_divider: "Afficher le séparateur",
    editor_show_weekday: "Afficher le jour de la semaine",
    editor_show_weekday_long: "Format long (ex. Lundi)",
    editor_show_month: "Afficher le mois",
    editor_show_month_long: "Format long (ex. Décembre)",
    editor_icon_show_weekday: "Permuter Mois et Jour de semaine",
    editor_show_add_event: "Afficher bouton 'Nouvel événement'",
    add_event_title: "Nouvel événement",
    add_event_name: "Titre",
    add_event_start: "De",
    add_event_end: "A",
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
    editor_show_location: "Afficher le lieu",
    editor_show_duration: "Afficher la durée",
    editor_show_time: "Montrer les heures",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "jour",
    duration_days: "jours",
    editor_max_lines: "Nombre max. d'événements",
    group_by_date: "Grouper par jour",
    group_by_date_and_calendar: "Grouper par jour et calendrier",
    empty: "Aucun événement",
    editor_show_empty_days: "Montrer les jours vides"
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
    editor_configuration: "Configurazione",
    editor_text_visibility: "Visibilità testo",
    editor_show_divider: "Mostra divisore",
    editor_show_weekday: "Mostra giorno della settimana",
    editor_show_weekday_long: "Usa nome completo (es. Lunedì)",
    editor_show_month: "Mostra mese",
    editor_show_month_long: "Usa nome completo (es. Dicembre)",
    editor_icon_show_weekday: "Scambia Mese e Giorno della settimana",
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
    editor_show_location: "Mostra luogo",
    editor_show_duration: "Mostra durata",
    editor_show_time: "Mostra tempo",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "giorno",
    duration_days: "giorni",
    editor_max_lines: "Numero massimo di eventi",
    group_by_date: "Raggruppa per giorno",
    group_by_date_and_calendar: "Raggruppa per giorno e calendario",
    empty: "Vuoto",
    editor_show_empty_days: "Mostra giorni vuoti"
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
    editor_configuration: "Configuración",
    editor_text_visibility: "Visibilidad de texto",
    editor_show_divider: "Mostrar divisor",
    editor_show_weekday: "Mostrar día de la semana",
    editor_show_weekday_long: "Formato largo (ej. Lunes)",
    editor_show_month: "Mostrar mes",
    editor_show_month_long: "Formato largo (ej. Diciembre)",
    editor_icon_show_weekday: "Intercambiar Mes y Día de la semana",
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
    editor_show_location: "Mostrar ubicación",
    editor_show_duration: "Mostrar duración",
    editor_show_time: "Mostrar tiempo",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "día",
    duration_days: "días",
    editor_max_lines: "Número máximo de eventos",
    group_by_date: "Agrupar por día",
    group_by_date_and_calendar: "Agrupar por día y calendario",
    empty: "Vacío",
    editor_show_empty_days: "Mostrar días vacíos"
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
    editor_configuration: "Configuratie",
    editor_text_visibility: "Zichtbaarheid tekst",
    editor_show_divider: "Toon verdeler",
    editor_show_weekday: "Toon weekdag",
    editor_show_weekday_long: "Gebruik lange notatie (bijv. Maandag)",
    editor_show_month: "Toon maand",
    editor_show_month_long: "Lange notatie (bijv. December)",
    editor_icon_show_weekday: "Maand en weekdag omwisselen",
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
    editor_show_location: "Toon locatie",
    editor_show_duration: "Toon duur",
    editor_show_time: "Toon tijd",
    duration_min: "min",
    duration_hour: "u",
    duration_day: "dag",
    duration_days: "dagen",
    editor_max_lines: "Max. weergegeven evenementen",
    group_by_date: "Groepeer per dag",
    group_by_date_and_calendar: "Groepeer per dag en kalender",
    empty: "Leeg",
    editor_show_empty_days: "Toon lege dagen"
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
    editor_configuration: "Configuração",
    editor_text_visibility: "Visibilidade do texto",
    editor_show_divider: "Mostrar divisor",
    editor_show_weekday: "Mostrar dia da semana",
    editor_show_weekday_long: "Formato longo (ex. Segunda-feira)",
    editor_show_month: "Mostrar mês",
    editor_show_month_long: "Formato longo (ex. Dezembro)",
    editor_icon_show_weekday: "Trocar Mês e Dia da semana",
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
    editor_show_location: "Mostrar local",
    editor_show_duration: "Mostrar duração",
    editor_show_time: "Mostrar hora",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "dia",
    duration_days: "dias",
    editor_max_lines: "Máximo de eventos exibidos",
    group_by_date: "Agrupar por dia",
    group_by_date_and_calendar: "Agrupar por dia e calendário",
    empty: "Vazio",
    editor_show_empty_days: "Mostrar dias vazios"
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
    editor_configuration: "Конфигурация",
    editor_text_visibility: "Видимость текста",
    editor_show_divider: "Показать разделитель",
    editor_show_weekday: "Показать день недели",
    editor_show_weekday_long: "Использовать полное название (напр. Понедельник)",
    editor_show_month: "Показать месяц",
    editor_show_month_long: "Использовать полное название (напр. Декабрь)",
    editor_icon_show_weekday: "Поменять местами Месяц и День недели",
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
    editor_show_location: "Показать место",
    editor_show_duration: "Показать продолжительность",
    editor_show_time: "Показать время",
    duration_min: "мин",
    duration_hour: "ч",
    duration_day: "день",
    duration_days: "дней",
    editor_max_lines: "Максимум отобр. событий",
    group_by_date: "Группировать по дням",
    group_by_date_and_calendar: "Группировать по дням и календарю",
    empty: "Пусто",
    editor_show_empty_days: "Показать пустые дни"
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
    editor_configuration: "Konfiguracja",
    editor_text_visibility: "Widoczność tekstu",
    editor_show_divider: "Pokaż dzielnik",
    editor_show_weekday: "Pokaż dzień tygodnia",
    editor_show_weekday_long: "Użyj pełnej nazwy (np. Poniedziałek)",
    editor_show_month: "Pokaż miesiąc",
    editor_show_month_long: "Użyj pełnej nazwy (np. Grudzień)",
    editor_icon_show_weekday: "Zamień Miesiąc i Dzień tygodnia",
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
    editor_show_location: "Pokaż lokalizację",
    editor_show_duration: "Pokaż czas trwania",
    editor_show_time: "Pokaż czas",
    duration_min: "min",
    duration_hour: "godz",
    duration_day: "dzień",
    duration_days: "dni",
    editor_max_lines: "Maks. wyświetlane wydarzenia",
    group_by_date: "Grupuj według dnia",
    group_by_date_and_calendar: "Grupuj według dnia i kalendarza",
    empty: "Pusty",
    editor_show_empty_days: "Pokaż puste dni"
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
    editor_configuration: "Konfiguration",
    editor_text_visibility: "Textsynlighet",
    editor_show_divider: "Visa avdelare",
    editor_show_weekday: "Visa veckodag",
    editor_show_weekday_long: "Använd långt format (t.ex. Måndag)",
    editor_show_month: "Visa månad",
    editor_show_month_long: "Använd långt format (t.ex. December)",
    editor_icon_show_weekday: "Byt plats mellan Månad och Veckodag",
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
    editor_show_location: "Visa plats",
    editor_show_duration: "Visa varaktighet",
    editor_show_time: "Visa tid",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "dag",
    duration_days: "dagar",
    editor_max_lines: "Max. visade händelser",
    group_by_date: "Gruppera per dag",
    group_by_date_and_calendar: "Gruppera per dag och kalender",
    empty: "Tom",
    editor_show_empty_days: "Visa tomma dagar"
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
    editor_configuration: "Konfiguration",
    editor_text_visibility: "Tekst og synlighed",
    editor_show_divider: "Vis skillelinje",
    editor_show_weekday: "Vis ugedag",
    editor_show_weekday_long: "Brug langt format (f.eks. Mandag)",
    editor_show_month: "Vis måned",
    editor_show_month_long: "Brug langt format (f.eks. December)",
    editor_icon_show_weekday: "Skift Måned og Ugedag",
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
    editor_show_location: "Vis sted",
    editor_show_duration: "Vis varighed",
    editor_show_time: "Vis tid",
    duration_min: "min",
    duration_hour: "t",
    duration_day: "dag",
    duration_days: "dage",
    editor_max_lines: "Maks. viste begivenheder",
    group_by_date: "Gruppér efter dag",
    group_by_date_and_calendar: "Gruppér efter dag og kalender",
    empty: "Tom",
    editor_show_empty_days: "Vis tomme dage"
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
    editor_configuration: "Konfigurasjon",
    editor_text_visibility: "Tekstsynlighet",
    editor_show_divider: "Vis skillelinje",
    editor_show_weekday: "Vis ukedag",
    editor_show_weekday_long: "Bruk langt format (f.eks. Mandag)",
    editor_show_month: "Vis måned",
    editor_show_month_long: "Bruk langt format (f.eks. Desember)",
    editor_icon_show_weekday: "Bytt Måned og Ukedag",
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
    editor_show_location: "Vis sted",
    editor_show_duration: "Vis varighet",
    editor_show_time: "Vis tid",
    duration_min: "min",
    duration_hour: "t",
    duration_day: "dag",
    duration_days: "dager",
    editor_max_lines: "Maks. viste hendelser",
    group_by_date: "Grupper etter dag",
    group_by_date_and_calendar: "Grupper etter dag og kalender",
    empty: "Tom",
    editor_show_empty_days: "Vis tomme dager"
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
    editor_configuration: "Määritys",
    editor_text_visibility: "Tekstin näkyvyys",
    editor_show_divider: "Näytä jakaja",
    editor_show_weekday: "Näytä viikonpäivä",
    editor_show_weekday_long: "Käytä pitkää nimeä (esim. Maanantai)",
    editor_show_month: "Näytä kuukausi",
    editor_show_month_long: "Käytä pitkää nimeä (esim. Joulukuu)",
    editor_icon_show_weekday: "Vaihda Kuukausi ja Viikonpäivä",
    editor_show_add_event: "Näytä Lisää-painike",
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
    editor_show_location: "Näytä sijainti",
    editor_show_duration: "Näytä kesto",
    editor_show_time: "Näytä aika",
    duration_min: "min",
    duration_hour: "t",
    duration_day: "päivä",
    duration_days: "päivää",
    editor_max_lines: "Näytettävien tapahtumien enimmäismäärä",
    group_by_date: "Ryhmittele päivän mukaan",
    group_by_date_and_calendar: "Ryhmittele päivän ja kalenterin mukaan",
    empty: "Tyhjä",
    editor_show_empty_days: "Näytä tyhjät päivät"
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
    editor_configuration: "Konfigurace",
    editor_text_visibility: "Viditelnost textu",
    editor_show_divider: "Zobrazit dělič",
    editor_show_weekday: "Zobrazit den v týdnu",
    editor_show_weekday_long: "Použít celý název (např. Pondělí)",
    editor_show_month: "Zobrazit měsíc",
    editor_show_month_long: "Použít celý název (např. Prosinec)",
    editor_icon_show_weekday: "Vyměnit Měsíc a Den v týdnu",
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
    editor_show_location: "Zobrazit místo",
    editor_show_duration: "Zobrazit dobu trvání",
    editor_show_time: "Zobrazit čas",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "den",
    duration_days: "dní",
    editor_max_lines: "Max. zobrazované události",
    group_by_date: "Seskupit podle dne",
    group_by_date_and_calendar: "Seskupit podle dne a kalendáře",
    empty: "Prázdné",
    editor_show_empty_days: "Zobrazit prázdné dny"
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
    editor_configuration: "Konfiguráció",
    editor_text_visibility: "Szöveg láthatósága",
    editor_show_divider: "Osztó megjelenítése",
    editor_show_weekday: "Hét napjának mutatása",
    editor_show_weekday_long: "Hosszú formátum (pl. Hétfő)",
    editor_show_month: "Hó megjelenítése",
    editor_show_month_long: "Hosszú formátum (pl. December)",
    editor_icon_show_weekday: "Hó és Hét napja felcserélése",
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
    editor_show_location: "Helyszín mutatása",
    editor_show_duration: "Időtartam mutatása",
    editor_show_time: "Idő mutatása",
    duration_min: "perc",
    duration_hour: "ó",
    duration_day: "nap",
    duration_days: "nap",
    editor_max_lines: "Max. megjelenített események",
    group_by_date: "Csoportosítás nap szerint",
    group_by_date_and_calendar: "Csoportosítás nap és naptár szerint",
    empty: "Üres",
    editor_show_empty_days: "Üres napok mutatása"
  }
};
function g(a, e, t, i) {
  var r;
  const s = ((r = a.locale) == null ? void 0 : r.language) || a.language || "en";
  let o;
  if (Q[s] && Q[s][e])
    o = Q[s][e];
  else if (Q.en && Q.en[e])
    o = Q.en[e];
  else
    return e;
  return t && i && (o = o.replace(t, i)), o;
}
function j(a) {
  var e;
  return ((e = a.locale) == null ? void 0 : e.language) || a.language || navigator.language || "en";
}
function kt(a) {
  var t, i;
  const e = (t = a.locale) == null ? void 0 : t.time_format;
  if (!e || e === "language" || e === "system") {
    const s = e === "language" ? ((i = a.locale) == null ? void 0 : i.language) || a.language : void 0;
    return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(
      s
    ).includes("10");
  }
  return e === "12";
}
function T(a, e) {
  var r;
  const t = j(a), i = kt(a), o = ((r = a.locale) == null ? void 0 : r.time_format) === "system";
  return new Intl.DateTimeFormat(o ? void 0 : t, {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: i ? "h12" : "h23"
  }).format(e);
}
function M(a, e) {
  var h, $, w, m, p;
  const t = j(a), i = (h = a.locale) == null ? void 0 : h.date_format, s = i === "system", o = new Intl.DateTimeFormat(
    s ? void 0 : t,
    {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    }
  );
  if (!i || i === "language" || i === "system")
    return o.format(e);
  const r = o.formatToParts(e), d = (($ = r.find((y) => y.type === "literal")) == null ? void 0 : $.value) ?? "/", n = ((w = r.find((y) => y.type === "day")) == null ? void 0 : w.value) ?? "", c = ((m = r.find((y) => y.type === "month")) == null ? void 0 : m.value) ?? "", l = ((p = r.find((y) => y.type === "year")) == null ? void 0 : p.value) ?? "", _ = r[r.length - 1], v = (_ == null ? void 0 : _.type) === "literal" ? _ == null ? void 0 : _.value : "";
  return {
    DMY: `${n}${d}${c}${d}${l}${v}`,
    MDY: `${c}${d}${n}${d}${l}${v}`,
    YMD: `${l}${d}${c}${d}${n}${v}`
  }[i] ?? o.format(e);
}
function Ct(a, e, t) {
  const i = (t == null ? void 0 : t.unfold_events) || !1;
  if (e === void 0)
    return u`
      <div class="calendar-container">
        <div class="calendar-item" style="cursor: default;">
          <div
            class="calendar-icon"
            style="background-color: var(--primary-color, #03a9f4);"
          >
            <ha-icon icon="mdi:calendar-clock"></ha-icon>
          </div>
          <div class="calendar-content">
            <div class="event-title">${g(a, "loading")}</div>
          </div>
        </div>
      </div>
    `;
  if (e.length === 0)
    return u`
      <div class="calendar-container">
        <div class="calendar-item" style="cursor: default;">
          <div
            class="calendar-icon"
            style="background-color: var(--disabled-text-color, #bdbdbb);"
          >
            <ha-icon icon="mdi:calendar-remove"></ha-icon>
          </div>
          <div class="calendar-content">
            <div class="event-title">${g(a, "no_events")}</div>
          </div>
        </div>
      </div>
    `;
  if (!i) {
    const d = e[0], n = e.length - 1, c = d.is_empty ? g(a, "empty") : d.summary;
    let l, _;
    try {
      if (l = new Date(d.start.dateTime || d.start.date), _ = new Date(d.end.dateTime || d.end.date), isNaN(l.getTime()) || isNaN(_.getTime()))
        throw new Error("Invalid Date");
    } catch {
      return u`<div class="error">Date Error</div>`;
    }
    const v = /* @__PURE__ */ new Date(), f = !d.start.dateTime, h = G(a, l, _, f), $ = `${T(a, l)} - ${T(a, _)}`, w = (t == null ? void 0 : t.show_date) ?? !1, m = (t == null ? void 0 : t.show_time) ?? !1;
    let p = "";
    const y = a.localize(
      "component.calendar.entity_component._.state_attributes.all_day.name"
    ) || "All day";
    if (d.is_empty)
      p = "";
    else if (w || m)
      if (f) {
        const z = w ? M(a, l) : "";
        w && m ? p = `${z}, ${y}` : p = z || y;
      } else {
        const z = [];
        w && z.push(M(a, l)), m && z.push($), p = z.join(", ");
      }
    else if (l > v) {
      const z = l.getTime() - v.getTime(), O = Math.ceil(z / 6e4);
      p = ke(a, O);
    } else
      p = f ? y : T(a, l);
    if (!d.is_empty && (t != null && t.show_duration) && (p ? p.endsWith(h) || (p += ` • ${h}`) : p = h), n > 0 && (p += ` ${g(a, "more_events", "{x}", n.toString())}`), !d.is_empty && (t != null && t.show_weekday)) {
      const z = j(a), O = t != null && t.icon_show_weekday ? l.toLocaleDateString(z, {
        month: t.show_weekday_long ? "long" : "short"
      }) : l.toLocaleDateString(z, {
        weekday: t.show_weekday_long ? "long" : "short"
      });
      p += ` • ${O}`;
    }
    const b = l <= v && _ >= v ? v : l, S = d.is_empty ? B(d.entity_id, t) || "var(--disabled-text-color, #bdbdbb)" : B(d.entity_id, t), P = W(
      a,
      b,
      S,
      (t == null ? void 0 : t.dark_mode) ?? !1,
      (t == null ? void 0 : t.icon_show_weekday) ?? !1
    ), k = Z(d.entity_id, t), x = k ? `background-color: ${k}; border: none;` : "";
    return u`
      <div class="calendar-container">
        <div
          class="calendar-item"
          style="${x} ${d.is_empty ? "cursor: default; opacity: 0.7;" : ""}"
          title="${c}"
          @click=${(z) => d.is_empty ? null : Re(z, a, e)}
        >
          <div class="calendar-icon dynamic">${P}</div>
          <div class="calendar-content">
            <div class="event-title">${c}</div>
            <div class="event-time">
              ${!d.is_empty && (w || m) ? u`<ha-icon icon="mdi:clock-time-four-outline"></ha-icon>` : ""}
              ${p}
            </div>
            ${!d.is_empty && (t != null && t.show_location) && d.location ? u`
                  <div class="event-location">
                    <ha-icon icon="mdi:map-marker"></ha-icon>
                    ${d.location}
                  </div>
                ` : ""}
            ${t != null && t.show_calendar_name && d.calendar_name ? u`
                  <div class="event-calendar">
                    <ha-icon icon="mdi:calendar-blank-multiple"></ha-icon>
                    ${d.calendar_name}
                  </div>
                ` : ""}
          </div>
        </div>
      </div>
    `;
  }
  if (t != null && t.group_by_date_and_calendar && i) {
    const d = Je(e);
    return u`
      <div class="calendar-container">
        ${d.map((n) => {
      const c = n.date, l = B(n.events[0].entity_id, t), _ = W(
        a,
        c,
        l,
        (t == null ? void 0 : t.dark_mode) ?? !1,
        (t == null ? void 0 : t.icon_show_weekday) ?? !1
      ), v = Z(
        n.events[0].entity_id,
        t
      ), f = v ? `background-color: ${v}; border: none;` : "";
      return u`
            <div
              class="calendar-item grouped"
              style="align-items: center; ${f}"
            >
              <div class="calendar-icon dynamic">${_}</div>
              <div class="calendar-content">
                ${n.events.map((h) => {
        const $ = h.is_empty ? g(a, "empty") : h.summary, w = new Date(
          h.start.dateTime || h.start.date
        ), m = new Date(h.end.dateTime || h.end.date), p = !h.start.dateTime, y = G(a, w, m, p), C = `${T(a, w)} - ${T(a, m)}`, b = (t == null ? void 0 : t.show_date) ?? !1, S = (t == null ? void 0 : t.show_time) ?? !1, P = a.localize(
          "component.calendar.entity_component._.state_attributes.all_day.name"
        ) || "All day";
        let k = "";
        if (h.is_empty)
          k = "";
        else if (b || S)
          if (p) {
            const x = b ? M(a, w) : "";
            b && S ? k = `${x}, ${P}` : k = x || P;
          } else {
            const x = [];
            b && x.push(M(a, w)), S && x.push(C), k = x.join(", ");
          }
        else
          k = p ? P : T(a, w);
        if (!h.is_empty && (t != null && t.show_duration) && (k.endsWith(y) || (k += ` • ${y}`)), !h.is_empty && (t != null && t.show_weekday)) {
          const x = j(a), z = t != null && t.icon_show_weekday ? w.toLocaleDateString(x, {
            month: t.show_weekday_long ? "long" : "short"
          }) : w.toLocaleDateString(x, {
            weekday: t.show_weekday_long ? "long" : "short"
          });
          k.includes(z) || (k += ` • ${z}`);
        }
        return u`
                    <div
                      class="event-entry"
                      @click=${(x) => h.is_empty ? null : be(x, h.entity_id)}
                      style="margin-bottom: 4px; ${h.is_empty ? "opacity: 0.7; cursor: default;" : ""}"
                    >
                      <div class="event-title">${$}</div>
                      <div
                        class="event-time"
                        style="display: flex; align-items: center; gap: 4px;"
                      >
                        ${!h.is_empty && (b || S) ? u`<ha-icon
                              icon="mdi:clock-time-four-outline"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>` : ""}
                        ${k}
                      </div>
                      ${!h.is_empty && (t != null && t.show_location) && h.location ? u`
                            <div
                              class="event-location"
                              style="display: flex; align-items: center; gap: 4px; font-size: 0.9em; color: var(--secondary-text-color);"
                            >
                              <ha-icon
                                icon="mdi:map-marker"
                                style="--mdc-icon-size: 14px;"
                              ></ha-icon>
                              ${h.location}
                            </div>
                          ` : ""}
                      ${t != null && t.show_calendar_name && h.calendar_name ? u`
                            <div
                              class="event-calendar"
                              style="display: flex; align-items: center; gap: 4px; font-size: 0.9em; color: var(--secondary-text-color);"
                            >
                              <ha-icon
                                icon="mdi:calendar-blank-multiple"
                                style="--mdc-icon-size: 14px;"
                              ></ha-icon>
                              ${h.calendar_name}
                            </div>
                          ` : ""}
                    </div>
                  `;
      })}
              </div>
            </div>
            ${t != null && t.show_divider ? u`<div class="calendar-divider"></div>` : ""}
          `;
    })}
      </div>
    `;
  }
  if (t != null && t.group_by_date && i) {
    const d = Ye(e);
    return u`
      <div class="calendar-container">
        ${d.map((n) => {
      const c = n.date, l = B(n.events[0].entity_id, t), _ = W(
        a,
        c,
        l,
        (t == null ? void 0 : t.dark_mode) ?? !1,
        (t == null ? void 0 : t.icon_show_weekday) ?? !1
      ), v = Z(
        n.events[0].entity_id,
        t
      ), f = v ? `background-color: ${v}; border: none;` : "";
      return u`
            <div
              class="calendar-item grouped"
              style="align-items: center; ${f}"
            >
              <div class="calendar-icon dynamic">${_}</div>
              <div class="calendar-content">
                ${n.events.map((h) => {
        const $ = h.is_empty ? g(a, "empty") : h.summary, w = new Date(
          h.start.dateTime || h.start.date
        ), m = new Date(h.end.dateTime || h.end.date), p = !h.start.dateTime, y = G(a, w, m, p), C = `${T(a, w)} - ${T(a, m)}`, b = (t == null ? void 0 : t.show_date) ?? !1, S = (t == null ? void 0 : t.show_time) ?? !1, P = a.localize(
          "component.calendar.entity_component._.state_attributes.all_day.name"
        ) || "All day";
        let k = "";
        if (h.is_empty)
          k = "";
        else if (b || S)
          if (p) {
            const x = b ? M(a, w) : "";
            b && S ? k = `${x}, ${P}` : k = x || P;
          } else {
            const x = [];
            b && x.push(M(a, w)), S && x.push(C), k = x.join(", ");
          }
        else
          k = p ? P : T(a, w);
        if (!h.is_empty && (t != null && t.show_duration) && (k.endsWith(y) || (k += ` • ${y}`)), !h.is_empty && (t != null && t.show_weekday)) {
          const x = j(a), z = t != null && t.icon_show_weekday ? w.toLocaleDateString(x, {
            month: t.show_weekday_long ? "long" : "short"
          }) : w.toLocaleDateString(x, {
            weekday: t.show_weekday_long ? "long" : "short"
          });
          k.includes(z) || (k += ` • ${z}`);
        }
        return u`
                    <div
                      class="event-entry"
                      @click=${(x) => h.is_empty ? null : be(x, h.entity_id)}
                      style="margin-bottom: 4px; ${h.is_empty ? "opacity: 0.7; cursor: default;" : ""}"
                    >
                      <div class="event-title">${$}</div>
                      <div
                        class="event-time"
                        style="display: flex; align-items: center; gap: 4px;"
                      >
                        ${!h.is_empty && (b || S) ? u`<ha-icon
                              icon="mdi:clock-time-four-outline"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>` : ""}
                        ${k}
                      </div>
                      ${!h.is_empty && (t != null && t.show_location) && h.location ? u`
                            <div
                              class="event-location"
                              style="display: flex; align-items: center; gap: 4px; font-size: 0.9em; color: var(--secondary-text-color);"
                            >
                              <ha-icon
                                icon="mdi:map-marker"
                                style="--mdc-icon-size: 14px;"
                              ></ha-icon>
                              ${h.location}
                            </div>
                          ` : ""}
                      ${t != null && t.show_calendar_name && h.calendar_name ? u`
                            <div
                              class="event-calendar"
                              style="display: flex; align-items: center; gap: 4px; font-size: 0.9em; color: var(--secondary-text-color);"
                            >
                              <ha-icon
                                icon="mdi:calendar-blank-multiple"
                                style="--mdc-icon-size: 14px;"
                              ></ha-icon>
                              ${h.calendar_name}
                            </div>
                          ` : ""}
                    </div>
                  `;
      })}
              </div>
            </div>
            ${t != null && t.show_divider ? u`<div class="calendar-divider"></div>` : ""}
          `;
    })}
      </div>
    `;
  }
  const s = (t == null ? void 0 : t.max_lines) || 0, o = s > 0 ? e.slice(0, s) : e, r = e.length - o.length;
  return u`
    <div class="calendar-container">
      ${o.map((d, n) => {
    const c = d.is_empty ? g(a, "empty") : d.summary;
    let l, _;
    try {
      if (l = new Date(d.start.dateTime || d.start.date), _ = new Date(d.end.dateTime || d.end.date), isNaN(l.getTime())) throw new Error("Invalid start date");
      if (isNaN(_.getTime())) throw new Error("Invalid end date");
    } catch {
      return u`<div class="error">Date Error for ${c}</div>`;
    }
    const v = /* @__PURE__ */ new Date(), f = !d.start.dateTime;
    let h = -1;
    const $ = G(a, l, _, f), w = `${T(a, l)} - ${T(a, _)}`, m = (t == null ? void 0 : t.show_date) ?? !1, p = (t == null ? void 0 : t.show_time) ?? !1;
    let y = "";
    const C = a.localize(
      "component.calendar.entity_component._.state_attributes.all_day.name"
    ) || "All day";
    if (d.is_empty)
      y = "";
    else if (m || p)
      if (f) {
        const A = m ? M(a, l) : "";
        m && p ? y = `${A}, ${C}` : y = A || C;
      } else {
        const A = [];
        m && A.push(M(a, l)), p && A.push(w), y = A.join(", ");
      }
    else if (l > v) {
      const A = l.getTime() - v.getTime(), ae = Math.ceil(A / 6e4);
      y = ke(a, ae);
    } else
      y = f ? C : T(a, l);
    if (!d.is_empty && (t != null && t.show_duration) && (y ? y.endsWith($) || (y += ` • ${$}`) : y = $), !d.is_empty && !f && l <= v && _ >= v) {
      const A = _.getTime() - l.getTime(), ae = v.getTime() - l.getTime();
      A > 0 && (h = Math.max(
        0,
        Math.min(100, ae / A * 100)
      ));
    }
    if (!d.is_empty && (t != null && t.show_weekday)) {
      const A = j(a), ae = t != null && t.icon_show_weekday ? l.toLocaleDateString(A, {
        month: t.show_weekday_long ? "long" : "short"
      }) : l.toLocaleDateString(A, {
        weekday: t.show_weekday_long ? "long" : "short"
      });
      y += ` • ${ae}`;
    }
    const S = l <= v && _ >= v ? v : l, P = d.is_empty ? B(d.entity_id, t) || "var(--disabled-text-color, #bdbdbb)" : B(d.entity_id, t), k = W(
      a,
      S,
      P,
      (t == null ? void 0 : t.dark_mode) ?? !1,
      (t == null ? void 0 : t.icon_show_weekday) ?? !1
    ), x = Z(d.entity_id, t), z = x ? `background-color: ${x}; border: none;` : "", O = (t == null ? void 0 : t.show_divider) && n > 0, J = s > 0 && n === s - 1 && r > 0;
    return u`
          ${O ? u`<div class="calendar-divider"></div>` : ""}
          <div
            class="calendar-item"
            style="${z} ${d.is_empty ? "cursor: default; opacity: 0.7;" : ""}"
            title="${J ? g(a, "popup_upcoming_events") : c}"
            @click=${(A) => d.is_empty ? null : J ? Re(A, a, e) : be(A, d.entity_id)}
          >
            <div class="calendar-icon dynamic">${k}</div>
            <div
              class="calendar-content"
              style="${d.is_empty ? "opacity: 0.8;" : ""}"
            >
              <div
                class="event-title"
                style="display: flex; align-items: center; justify-content: space-between; gap: 8px;"
              >
                <span
                  style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;"
                  >${c}</span
                >
                ${J ? u`
                      <span
                        class="more-indicator"
                        style="display: flex; align-items: center; gap: 4px; color: var(--secondary-text-color); font-size: 0.85em; font-style: italic; flex-shrink: 0;"
                      >
                        <ha-icon
                          icon="mdi:dots-horizontal"
                          style="--mdc-icon-size: 16px; color: var(--secondary-text-color);"
                        ></ha-icon>
                        (${r})
                      </span>
                    ` : ""}
              </div>
              <div class="event-time">
                ${!d.is_empty && (m || p) ? u`<ha-icon icon="mdi:clock-time-four-outline"></ha-icon>` : ""}
                ${y}
              </div>
              ${!d.is_empty && (t != null && t.show_location) && d.location ? u`
                    <div class="event-location">
                      <ha-icon icon="mdi:map-marker"></ha-icon>
                      ${d.location}
                    </div>
                  ` : ""}
              ${t != null && t.show_calendar_name && d.calendar_name ? u`
                    <div class="event-calendar">
                      <ha-icon icon="mdi:calendar-blank-multiple"></ha-icon>
                      ${d.calendar_name}
                    </div>
                  ` : ""}
              ${h >= 0 ? u`
                    <div class="progress-bar">
                      <div
                        class="progress-fill"
                        style="width: ${h}%"
                      ></div>
                    </div>
                  ` : ""}
            </div>
          </div>
        `;
  })}
    </div>
  `;
}
function B(a, e) {
  var i;
  const t = ((i = e == null ? void 0 : e.calendar_colors) == null ? void 0 : i[a]) || (e == null ? void 0 : e.calendar_icon_color) || "#fa3e3e";
  return Fe(t);
}
function Z(a, e) {
  var i;
  const t = ((i = e == null ? void 0 : e.calendar_background_colors) == null ? void 0 : i[a]) || (e == null ? void 0 : e.background_color) || "";
  return t ? Fe(t) : "";
}
function Fe(a) {
  return a.startsWith("#") || a.startsWith("rgb") || a.startsWith("hsl") || a.startsWith("var") ? a : `var(--${a}-color)`;
}
function Re(a, e, t) {
  const i = new CustomEvent("calendar-card-show-detail", {
    bubbles: !0,
    composed: !0,
    detail: {
      title: g(e, "popup_upcoming_events"),
      entities: t
    }
  });
  a.target.dispatchEvent(i);
}
function be(a, e) {
  const t = new CustomEvent("hass-more-info", {
    bubbles: !0,
    composed: !0,
    detail: { entityId: e }
  });
  a.target.dispatchEvent(t);
}
function Ye(a) {
  const e = {};
  return a.forEach((t) => {
    const i = new Date(t.start.dateTime || t.start.date), s = i.toISOString().split("T")[0];
    e[s] || (e[s] = {
      date: i,
      events: []
    }), e[s].events.push(t);
  }), Object.values(e).sort(
    (t, i) => t.date.getTime() - i.date.getTime()
  );
}
function Je(a) {
  const e = {};
  return a.forEach((t) => {
    const i = new Date(t.start.dateTime || t.start.date), s = i.toISOString().split("T")[0], o = t.calendar_name || t.entity_id, r = `${s}|${o}`;
    e[r] || (e[r] = {
      date: i,
      calendar: o,
      events: []
    }), e[r].events.push(t);
  }), Object.values(e).sort((t, i) => {
    const s = t.date.getTime() - i.date.getTime();
    return s !== 0 ? s : t.calendar.localeCompare(i.calendar);
  });
}
function W(a, e, t, i = !1, s = !1) {
  const o = j(a);
  let r;
  s ? r = e.toLocaleDateString(o, { weekday: "short" }).toUpperCase() : r = e.toLocaleDateString(o, { month: "short" }).toUpperCase();
  const d = e.getDate();
  return u`
    <svg
      viewBox="0 0 100 100"
      class="dynamic-calendar-icon"
      style="width: 100%; height: 100%; display: block;"
    >
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        rx="20"
        ry="20"
        fill="${i ? "#222222" : "white"}"
      ></rect>
      <path
        d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z"
        fill="${t}"
      ></path>
      <text
        x="50"
        y="23"
        font-family="sans-serif"
        font-size="22"
        font-weight="bold"
        fill="${i ? "#222222" : "white"}"
        text-anchor="middle"
      >
        ${r}
      </text>
      <text
        x="50"
        y="82"
        font-family="sans-serif"
        font-size="52"
        font-weight="bold"
        fill="${i ? "white" : "#333"}"
        text-anchor="middle"
      >
        ${d}
      </text>
    </svg>
  `;
}
function G(a, e, t, i) {
  const s = t.getTime() - e.getTime(), o = Math.round(s / 6e4);
  if (i && o === 1440)
    return a.localize(
      "component.calendar.entity_component._.state_attributes.all_day.name"
    ) || "All day";
  if (o < 60)
    return `${o} ${g(a, "duration_min")}`;
  const r = Math.floor(o / 1440), d = o % 1440, n = Math.floor(d / 60), c = d % 60, l = [];
  return r >= 1 && l.push(
    `${r} ${g(a, r === 1 ? "duration_day" : "duration_days")}`
  ), n > 0 && l.push(`${n} ${g(a, "duration_hour")}`), c > 0 && l.push(`${c} ${g(a, "duration_min")}`), l.join(" ");
}
function ke(a, e) {
  if (e < 60)
    return e === 1 ? g(a, "starts_in_min", "{x}", e.toString()) : g(a, "starts_in_mins", "{x}", e.toString());
  if (e < 1440) {
    const i = Math.round(e / 60);
    return i === 1 ? g(a, "starts_in_hour", "{x}", i.toString()) : g(a, "starts_in_hours", "{x}", i.toString());
  }
  if (e < 43200) {
    const i = Math.round(e / 1440);
    return i === 1 ? g(a, "starts_in_day", "{x}", i.toString()) : g(a, "starts_in_days", "{x}", i.toString());
  }
  const t = Math.round(e / 10080);
  return t === 1 ? g(a, "starts_in_week", "{x}", t.toString()) : g(a, "starts_in_weeks", "{x}", t.toString());
}
function zt(a, e) {
  const t = Object.keys(a.states).filter((l) => l.startsWith("calendar.")).filter((l) => {
    var _;
    return !((_ = e.exclude_entities) != null && _.includes(l));
  }), i = t.length > 0 ? t[0] : void 0, s = /* @__PURE__ */ new Date(), o = new Date(s);
  o.setHours(o.getHours() + 1, 0, 0, 0);
  const r = new Date(o);
  r.setHours(r.getHours() + 1, 0, 0, 0);
  const d = (l) => l.toString().padStart(2, "0"), n = (l) => `${l.getFullYear()}-${d(l.getMonth() + 1)}-${d(l.getDate())}`, c = (l) => `${d(l.getHours())}:${d(l.getMinutes())}`;
  return {
    open: !0,
    calendar_id: i,
    name: "",
    start_date: n(o),
    start_time: c(o),
    end_date: n(r),
    end_time: c(r),
    location: "",
    description: "",
    recurrence: "none",
    all_day: !1
  };
}
async function At(a, e, t, i) {
  if (!(!e.calendar_id || !e.name || !e.start_date || !e.end_date))
    try {
      const s = {
        entity_id: e.calendar_id,
        summary: e.name
      };
      if (e.all_day) {
        let o = e.end_date;
        if (e.start_date === o) {
          const r = o.split("-"), d = new Date(
            Number(r[0]),
            Number(r[1]) - 1,
            Number(r[2])
          );
          d.setDate(d.getDate() + 1);
          const n = (c) => c.toString().padStart(2, "0");
          o = `${d.getFullYear()}-${n(d.getMonth() + 1)}-${n(d.getDate())}`;
        }
        s.start_date = e.start_date, s.end_date = o;
      } else {
        const o = e.start_time || "09:00", r = e.end_time || "10:00";
        s.start_date_time = `${e.start_date} ${o}:00`, s.end_date_time = `${e.end_date} ${r}:00`, e.location && (s.location = e.location), e.description && (s.description = e.description);
      }
      if (e.recurrence && e.recurrence !== "none") {
        const o = {
          DAILY: "FREQ=DAILY",
          WEEKLY: "FREQ=WEEKLY",
          MONTHLY: "FREQ=MONTHLY",
          YEARLY: "FREQ=YEARLY"
        };
        o[e.recurrence] && (s.rrule = o[e.recurrence]);
      }
      await a.callService("calendar", "create_event", s), t();
    } catch (s) {
      i(s);
    }
}
function Et(a, e, t, i, s, o) {
  const r = Object.keys(a.states).filter((n) => n.startsWith("calendar.")).filter((n) => {
    var c;
    return !((c = e.exclude_entities) != null && c.includes(n));
  }), d = t.all_day || !1;
  return u`
    <div class="add-event-form">
      <div class="field">
        <label class="field-label"
          >${a.localize("ui.components.calendar.event.summary") || "Title"}</label
        >
        <input
          type="text"
          class="field-input"
          .value=${t.name || ""}
          @input=${(n) => i({ name: n.target.value })}
        />
      </div>

      <div class="field">
        <label class="field-label"
          >${a.localize("ui.components.calendar.event.location") || "Location"}</label
        >
        <input
          type="text"
          class="field-input"
          .value=${t.location || ""}
          @input=${(n) => i({ location: n.target.value })}
        />
      </div>

      <div class="field">
        <label class="field-label"
          >${a.localize("ui.components.calendar.event.description") || "Description"}</label
        >
        <input
          type="text"
          class="field-input"
          .value=${t.description || ""}
          @input=${(n) => i({ description: n.target.value })}
        />
      </div>

      <div class="field">
        <label class="field-label"
          >${a.localize("ui.components.calendar.my_calendars") || "Calendar"}</label
        >
        <select
          class="field-input"
          .value=${t.calendar_id || ""}
          @change=${(n) => i({ calendar_id: n.target.value })}
        >
          ${r.length === 0 ? u`<option value="">
                -- ${a.localize("ui.common.none") || "no calendars"} --
              </option>` : r.map(
    (n) => {
      var c, l;
      return u`
                  <option value=${n} ?selected=${n === t.calendar_id}>
                    ${((l = (c = a.states[n]) == null ? void 0 : c.attributes) == null ? void 0 : l.friendly_name) || n}
                  </option>
                `;
    }
  )}
        </select>
      </div>

      <div class="row-flex">
        <ha-formfield
          .label=${a.localize("ui.components.calendar.event.all_day") || "All Day"}
        >
          <ha-switch
            .checked=${d}
            @change=${(n) => i({ all_day: n.target.checked })}
          ></ha-switch>
        </ha-formfield>
      </div>

      <div class="field">
        <label class="field-label"
          >${a.localize("ui.components.calendar.event.start") || "Start"}</label
        >
        <div class="date-row">
          <input
            type="date"
            class="field-input"
            .value=${t.start_date || ""}
            @change=${(n) => i({ start_date: n.target.value })}
          />
          ${d ? "" : u`
                <input
                  type="time"
                  class="field-input"
                  .value=${t.start_time || "09:00"}
                  @change=${(n) => i({
    start_time: n.target.value
  })}
                />
              `}
        </div>
      </div>

      <div class="field">
        <label class="field-label"
          >${a.localize("ui.components.calendar.event.end") || "End"}</label
        >
        <div class="date-row">
          <input
            type="date"
            class="field-input"
            .value=${t.end_date || ""}
            @change=${(n) => i({ end_date: n.target.value })}
          />
          ${d ? "" : u`
                <input
                  type="time"
                  class="field-input"
                  .value=${t.end_time || "10:00"}
                  @change=${(n) => i({
    end_time: n.target.value
  })}
                />
              `}
        </div>
      </div>

      <div class="field">
        <label class="field-label"
          >${a.localize("ui.components.calendar.event.repeat.label") || "Repeat"}</label
        >
        <select
          class="field-input"
          .value=${t.recurrence || "none"}
          @change=${(n) => i({ recurrence: n.target.value })}
        >
          <option value="none">
            ${a.localize("ui.components.calendar.event.repeat.freq.none") || "None"}
          </option>
          <option value="DAILY">
            ${a.localize("ui.components.calendar.event.repeat.freq.daily") || "Daily"}
          </option>
          <option value="WEEKLY">
            ${a.localize(
    "ui.components.calendar.event.repeat.freq.weekly"
  ) || "Weekly"}
          </option>
          <option value="MONTHLY">
            ${a.localize(
    "ui.components.calendar.event.repeat.freq.monthly"
  ) || "Monthly"}
          </option>
          <option value="YEARLY">
            ${a.localize(
    "ui.components.calendar.event.repeat.freq.yearly"
  ) || "Yearly"}
          </option>
        </select>
      </div>

      <div class="dialog-actions">
        <ha-button @click=${s}>
          ${a.localize("ui.common.cancel") || "Cancel"}
        </ha-button>
        <ha-button
          unelevated
          @click=${o}
          ?disabled=${!t.name || !t.calendar_id}
        >
          ${a.localize("ui.common.save") || "Save"}
        </ha-button>
      </div>
    </div>
  `;
}
var Qe = Object.defineProperty, Tt = Object.getOwnPropertyDescriptor, St = (a, e, t) => e in a ? Qe(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t, R = (a, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Tt(e, t) : e, o = a.length - 1, r; o >= 0; o--)
    (r = a[o]) && (s = (i ? r(e, t, s) : r(s)) || s);
  return i && s && Qe(e, t, s), s;
}, Dt = (a, e, t) => St(a, e + "", t);
let L = class extends F {
  constructor() {
    super(...arguments);
    E(this, "hass");
    E(this, "config");
    E(this, "open", !1);
    E(this, "mode", "detail");
    E(this, "detailTitle", "");
    E(this, "detailEvents", []);
    E(this, "_addEventState", { open: !1 });
    E(this, "_opener", null);
    E(this, "_onEventSaved", null);
    E(this, "_onPopState", (e) => {
      var t;
      this.open && !((t = window.history.state) != null && t.calendarCardPlusPopup) && this._close();
    });
    E(this, "_close", () => {
      if (!this.open) return;
      this.open = !1, this.requestUpdate();
      const e = { dialog: this };
      this.dispatchEvent(
        new CustomEvent("closed", { bubbles: !0, composed: !0, detail: e })
      ), this.dispatchEvent(
        new CustomEvent("dialog-closed", {
          bubbles: !0,
          composed: !0,
          detail: e
        })
      ), this.dispatchEvent(
        new CustomEvent("popup-closed", {
          bubbles: !0,
          composed: !0,
          detail: e
        })
      );
    });
    E(this, "_onDialogClosed", (e) => {
      var t;
      if (e && e.type !== "click") {
        const i = e.target;
        if (i && i.tagName !== "HA-ADAPTIVE-DIALOG" && i.tagName !== "HA-DIALOG")
          return;
      }
      this._close(), (t = window.history.state) != null && t.calendarCardPlusPopup && window.history.back();
    });
    E(this, "_closeDialog", () => {
      var e;
      this.open && (this._close(), (e = window.history.state) != null && e.calendarCardPlusPopup && window.history.back());
    });
  }
  async showDialog(e) {
    this.hass = e.hass, this.config = e.config, this._opener = e.opener, this.mode = e.mode, e.title && (this.detailTitle = e.title), e.events && (this.detailEvents = e.events), e.addEventState && (this._addEventState = e.addEventState), e.onEventSaved && (this._onEventSaved = e.onEventSaved), this.open = !0, window.history.pushState({ calendarCardPlusPopup: !0 }, ""), this.requestUpdate(), await this.updateComplete;
    const t = this.renderRoot.querySelector("ha-adaptive-dialog");
    if (t && t.shadowRoot) {
      const i = t.shadowRoot.querySelector("ha-bottom-sheet");
      i && (i.style.removeProperty("--dialog-transform"), i.style.removeProperty("--dialog-transition"));
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
    await At(
      this.hass,
      this._addEventState,
      () => {
        this.dispatchEvent(
          new CustomEvent("event-saved", { bubbles: !0, composed: !0 })
        ), this._onEventSaved && this._onEventSaved(), this._closeDialog();
      },
      (e) => {
        this.hass.callService("persistent_notification", "create", {
          title: "Calendar Card Plus",
          message: "Error saving event: " + e.message
        });
      }
    );
  }
  render() {
    var i;
    const e = this.mode === "add-event", t = e ? ((i = this.hass) == null ? void 0 : i.localize("ui.components.calendar.event.add")) || "Add Event" : this.detailTitle;
    return u`
      <ha-adaptive-dialog
        .hass=${this.hass}
        .open=${this.open}
        .headerTitle=${t}
        @closed=${this._onDialogClosed}
        @ha-dialog-closed=${this._onDialogClosed}
        flexcontent
      >
        <div class="dialog-content scrollable ha-scrollbar">
          ${e ? Et(
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
    return this.config.group_by_date_and_calendar ? Je(this.detailEvents).map((t) => {
      const i = t.date, s = B(t.events[0].entity_id, this.config), o = W(
        this.hass,
        i,
        s,
        this.config.dark_mode ?? !1
      ), r = Z(
        t.events[0].entity_id,
        this.config
      ), d = r ? `background-color: ${r}; border: none;` : "";
      return u`
          <div
            class="calendar-item grouped detail"
            style="align-items: center; ${d}"
          >
            <div class="calendar-icon dynamic">${o}</div>
            <div class="calendar-content">
              ${t.events.map((n) => {
        const c = n.is_empty ? g(this.hass, "empty") : n.summary, l = new Date(
          n.start.dateTime || n.start.date
        ), _ = new Date(n.end.dateTime || n.end.date), v = !n.start.dateTime, f = G(
          this.hass,
          l,
          _,
          v
        ), h = `${T(this.hass, l)} - ${T(this.hass, _)}`, $ = this.config.show_date ?? !1, w = this.config.show_time ?? !1, m = this.hass.localize(
          "component.calendar.entity_component._.state_attributes.all_day.name"
        ) || "All day";
        let p = "";
        if (n.is_empty)
          p = "";
        else if ($ || w)
          if (v) {
            const y = $ ? M(this.hass, l) : "";
            $ && w ? p = `${y}, ${m}` : p = y || m;
          } else {
            const y = [];
            $ && y.push(M(this.hass, l)), w && y.push(h), p = y.join(", ");
          }
        else
          p = v ? m : T(this.hass, l);
        if (!n.is_empty && this.config.show_duration && (p.endsWith(f) || (p += ` • ${f}`)), !n.is_empty && this.config.show_weekday) {
          const y = j(this.hass), C = l.toLocaleDateString(y, {
            weekday: this.config.show_weekday_long ? "long" : "short"
          });
          p.includes(C) || (p += ` • ${C}`);
        }
        return u`
                  <div
                    class="event-entry"
                    @click=${() => n.is_empty ? null : this._handleMoreInfo(n.entity_id)}
                    style="margin-bottom: 4px; ${n.is_empty ? "opacity: 0.7; cursor: default;" : ""}"
                  >
                    <div class="event-title">${c}</div>
                    <div
                      class="event-time"
                      style="display: flex; align-items: center; gap: 4px;"
                    >
                      ${!n.is_empty && ($ || w) ? u`<ha-icon
                            icon="mdi:clock-time-four-outline"
                            style="--mdc-icon-size: 14px;"
                          ></ha-icon>` : ""}
                      ${p}
                    </div>
                    ${!n.is_empty && this.config.show_location && n.location ? u`
                          <div class="event-location">
                            <ha-icon
                              icon="mdi:map-marker"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>
                            ${n.location}
                          </div>
                        ` : ""}
                    ${this.config.show_calendar_name && n.calendar_name ? u`
                          <div class="event-calendar">
                            <ha-icon
                              icon="mdi:calendar-blank-multiple"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>
                            ${n.calendar_name}
                          </div>
                        ` : ""}
                  </div>
                `;
      })}
            </div>
          </div>
          ${this.config.show_divider ? u`<div class="calendar-divider"></div>` : ""}
        `;
    }) : this.config.group_by_date ? Ye(this.detailEvents).map((t) => {
      const i = t.date, s = B(t.events[0].entity_id, this.config), o = W(
        this.hass,
        i,
        s,
        this.config.dark_mode ?? !1
      ), r = Z(
        t.events[0].entity_id,
        this.config
      ), d = r ? `background-color: ${r}; border: none;` : "";
      return u`
          <div
            class="calendar-item grouped detail"
            style="align-items: center; ${d}"
          >
            <div class="calendar-icon dynamic">${o}</div>
            <div class="calendar-content">
              ${t.events.map((n) => {
        const c = n.is_empty ? g(this.hass, "empty") : n.summary, l = new Date(
          n.start.dateTime || n.start.date
        ), _ = new Date(n.end.dateTime || n.end.date), v = !n.start.dateTime, f = G(
          this.hass,
          l,
          _,
          v
        ), h = `${T(this.hass, l)} - ${T(this.hass, _)}`, $ = this.config.show_date ?? !1, w = this.config.show_time ?? !1, m = this.hass.localize(
          "component.calendar.entity_component._.state_attributes.all_day.name"
        ) || "All day";
        let p = "";
        if (n.is_empty)
          p = "";
        else if ($ || w)
          if (v) {
            const y = $ ? M(this.hass, l) : "";
            $ && w ? p = `${y}, ${m}` : p = y || m;
          } else {
            const y = [];
            $ && y.push(M(this.hass, l)), w && y.push(h), p = y.join(", ");
          }
        else
          p = v ? m : T(this.hass, l);
        if (!n.is_empty && this.config.show_duration && (p.endsWith(f) || (p += ` • ${f}`)), !n.is_empty && this.config.show_weekday) {
          const y = j(this.hass), C = l.toLocaleDateString(y, {
            weekday: this.config.show_weekday_long ? "long" : "short"
          });
          p.includes(C) || (p += ` • ${C}`);
        }
        return u`
                  <div
                    class="event-entry"
                    @click=${() => n.is_empty ? null : this._handleMoreInfo(n.entity_id)}
                    style="margin-bottom: 4px; ${n.is_empty ? "opacity: 0.7; cursor: default;" : ""}"
                  >
                    <div class="event-title">${c}</div>
                    <div
                      class="event-time"
                      style="display: flex; align-items: center; gap: 4px;"
                    >
                      ${!n.is_empty && ($ || w) ? u`<ha-icon
                            icon="mdi:clock-time-four-outline"
                            style="--mdc-icon-size: 14px;"
                          ></ha-icon>` : ""}
                      ${p}
                    </div>
                    ${!n.is_empty && this.config.show_location && n.location ? u`
                          <div class="event-location">
                            <ha-icon
                              icon="mdi:map-marker"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>
                            ${n.location}
                          </div>
                        ` : ""}
                    ${this.config.show_calendar_name && n.calendar_name ? u`
                          <div class="event-calendar">
                            <ha-icon
                              icon="mdi:calendar-blank-multiple"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>
                            ${n.calendar_name}
                          </div>
                        ` : ""}
                  </div>
                `;
      })}
            </div>
          </div>
          ${this.config.show_divider ? u`<div class="calendar-divider"></div>` : ""}
        `;
    }) : this.detailEvents.map((e, t) => {
      const i = e.is_empty ? g(this.hass, "empty") : e.summary;
      let s = "", o, r;
      try {
        o = new Date(e.start.dateTime || e.start.date), r = new Date(e.end.dateTime || e.end.date);
      } catch {
        return u`<div class="error">Date Error</div>`;
      }
      const d = /* @__PURE__ */ new Date(), n = !e.start.dateTime, c = G(this.hass, o, r, n), l = `${T(this.hass, o)} - ${T(this.hass, r)}`, _ = this.config.show_date ?? !1, v = this.config.show_time ?? !1, f = this.hass.localize(
        "component.calendar.entity_component._.state_attributes.all_day.name"
      ) || "All day";
      if (e.is_empty)
        s = "";
      else if (_ || v)
        if (n) {
          const b = _ ? M(this.hass, o) : "";
          _ && v ? s = `${b}, ${f}` : s = b || f;
        } else {
          const b = [];
          _ && b.push(M(this.hass, o)), v && b.push(l), s = b.join(", ");
        }
      else if (o > d) {
        const b = o.getTime() - d.getTime(), S = Math.ceil(b / 6e4);
        s = ke(this.hass, S);
      } else
        s = n ? f : T(this.hass, o);
      if (!e.is_empty && this.config.show_duration && (s ? s.endsWith(c) || (s += ` • ${c}`) : s = c), !e.is_empty && this.config.show_weekday) {
        const b = j(this.hass), S = o.toLocaleDateString(b, {
          weekday: this.config.show_weekday_long ? "long" : "short"
        });
        s += ` • ${S}`;
      }
      const $ = !e.is_empty && o <= d && r >= d ? d : o, w = e.is_empty ? "var(--disabled-text-color, #bdbdbb)" : B(e.entity_id, this.config), m = W(
        this.hass,
        $,
        w,
        this.config.dark_mode ?? !1
      ), p = this.config.show_divider && t > 0, y = Z(e.entity_id, this.config), C = y ? `background-color: ${y}; border: none;` : "";
      return u`
        ${p ? u`<div class="calendar-divider"></div>` : ""}
        <div
          class="calendar-item detail"
          style="${C} ${e.is_empty ? "cursor: default; opacity: 0.7;" : ""}"
          @click=${() => e.is_empty ? null : this._handleMoreInfo(e.entity_id)}
        >
          <div class="calendar-icon dynamic">${m}</div>
          <div class="calendar-content">
            <div class="event-title">${i}</div>
            <div class="event-time">
              ${!e.is_empty && (_ || v) ? u`<ha-icon icon="mdi:clock-time-four-outline"></ha-icon>` : ""}
              ${s}
            </div>
            ${!e.is_empty && this.config.show_location && e.location ? u`
                  <div class="event-location">
                    <ha-icon icon="mdi:map-marker"></ha-icon>
                    ${e.location}
                  </div>
                ` : ""}
            ${this.config.show_calendar_name && e.calendar_name ? u`
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
Dt(L, "styles", Ae`
    :host {
      display: block;
    }

    ha-adaptive-dialog {
      --dialog-content-padding: 0px 12px 12px;
      --ha-dialog-max-width: 96vw !important;
      --ha-bottom-sheet-height: calc(
        100dvh - max(var(--safe-area-inset-top), 48px)
      ) !important;
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
      background-color: var(
        --ha-card-background,
        var(--card-background-color, white)
      );
      border: var(--ha-card-border-width, 1px) solid
        var(--ha-card-border-color, var(--divider-color, #e0e0e0));
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
    .event-location,
    .event-calendar {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.9em;
      color: var(--secondary-text-color);
      margin-top: 1px;
    }
    .event-location ha-icon,
    .event-calendar ha-icon {
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

    .add-event-form .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .add-event-form .field-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }

    .add-event-form .field-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
      box-sizing: border-box;
    }

    .add-event-form .field-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .add-event-form select.field-input {
      cursor: pointer;
      appearance: auto;
    }

    .row-flex {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .date-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .date-row .field-input {
      flex: 1;
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
  N({ attribute: !1 })
], L.prototype, "hass", 2);
R([
  N({ attribute: !1 })
], L.prototype, "config", 2);
R([
  N({ type: Boolean })
], L.prototype, "open", 2);
R([
  N({ type: String })
], L.prototype, "mode", 2);
R([
  N({ type: String })
], L.prototype, "detailTitle", 2);
R([
  N({ type: Array })
], L.prototype, "detailEvents", 2);
R([
  he()
], L.prototype, "_addEventState", 2);
L = R([
  Se("calendar-card-plus-popup")
], L);
const Mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get CalendarCardPlusPopup() {
    return L;
  }
}, Symbol.toStringTag, { value: "Module" }));
var Pt = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, ye = (a, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? jt(e, t) : e, o = a.length - 1, r; o >= 0; o--)
    (r = a[o]) && (s = (i ? r(e, t, s) : r(s)) || s);
  return i && s && Pt(e, t, s), s;
};
let ce = class extends F {
  constructor() {
    super(...arguments);
    E(this, "hass");
    E(this, "config");
    E(this, "_events");
    E(this, "_handleShowDetail", async (e) => {
      this._showPopup("calendar-card-plus-popup", {
        hass: this.hass,
        config: this.config,
        opener: this,
        mode: "detail",
        title: e.detail.title,
        events: e.detail.entities
      });
    });
    E(this, "_openAddEventPopup", async () => {
      const e = zt(this.hass, this.config);
      this._showPopup("calendar-card-plus-popup", {
        hass: this.hass,
        config: this.config,
        opener: this,
        mode: "add-event",
        addEventState: e
      });
    });
    E(this, "_onEventSaved", () => {
      this._events = void 0, this.requestUpdate(), this._fetchEvents();
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener(
      "calendar-card-show-detail",
      this._handleShowDetail
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener(
      "calendar-card-show-detail",
      this._handleShowDetail
    );
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
      let o = 1440;
      this.config.days !== void 0 || this.config.hours !== void 0 || this.config.minutes !== void 0 ? o = (this.config.days || 0) * 1440 + (this.config.hours || 0) * 60 + (this.config.minutes || 0) : this.config.max_minutes_until_start !== void 0 && (o = this.config.max_minutes_until_start), t = new Date(e.getTime() + o * 6e4);
    } else
      t = new Date(e), t.setHours(23, 59, 59, 999);
    const i = Object.keys(this.hass.states).filter((o) => o.startsWith("calendar.")).filter((o) => {
      var r;
      return !((r = this.config.exclude_entities) != null && r.includes(o));
    });
    if (i.length === 0) {
      this._events = [];
      return;
    }
    const s = await it(this.hass, e, t, i);
    this.config.show_empty_days ? this._events = this._injectEmptyDays(s, e, t) : this._events = s, this.requestUpdate();
  }
  _injectEmptyDays(e, t, i) {
    const s = [...e], o = /* @__PURE__ */ new Set();
    e.forEach((n) => {
      const c = n.start.date || n.start.dateTime;
      if (c) {
        const l = new Date(c);
        o.add(l.toISOString().split("T")[0]);
      }
    });
    const r = new Date(t);
    r.setHours(0, 0, 0, 0);
    const d = new Date(i);
    for (d.setHours(0, 0, 0, 0); r <= d; ) {
      const n = r.toISOString().split("T")[0];
      o.has(n) || s.push({
        start: { date: n },
        end: { date: n },
        summary: "empty",
        is_empty: !0,
        entity_id: "empty",
        calendar_name: ""
      }), r.setDate(r.getDate() + 1);
    }
    return s.sort((n, c) => {
      const l = new Date(n.start.dateTime || n.start.date).getTime(), _ = new Date(c.start.dateTime || c.start.date).getTime();
      return l - _;
    });
  }
  render() {
    if (!this.config || !this.hass)
      return u``;
    const e = Ct(this.hass, this._events, this.config);
    return u`
      <ha-card>
        <div
          class="add-event-btn"
          @click=${this._openAddEventPopup}
          style=${this.config.show_add_event ? "" : "display: none;"}
        >
          <ha-icon-button .path=${tt}></ha-icon-button>
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
    return Ae`
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
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
      .event-location,
      .event-calendar {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.9em;
        color: var(--secondary-text-color);
        margin-top: 1px;
      }
      .event-location ha-icon,
      .event-calendar ha-icon {
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
ye([
  N({ attribute: !1 })
], ce.prototype, "hass", 2);
ye([
  he()
], ce.prototype, "config", 2);
ye([
  he()
], ce.prototype, "_events", 2);
ce = ye([
  Se("calendar-card-plus")
], ce);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "calendar-card-plus",
  name: "Dynamic Calendar Card Plus",
  preview: !0,
  description: "A standalone calendar card with dynamic grid styling"
});
const H = (a, e, t, i) => {
  i = i || {}, t = t ?? {};
  const s = new Event(e, {
    bubbles: i.bubbles === void 0 ? !0 : i.bubbles,
    cancelable: !!i.cancelable,
    composed: i.composed === void 0 ? !0 : i.composed
  });
  return s.detail = t, a.dispatchEvent(s), s;
};
var Lt = Object.defineProperty, Bt = Object.getOwnPropertyDescriptor, ge = (a, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? Bt(e, t) : e, o = a.length - 1, r; o >= 0; o--)
    (r = a[o]) && (s = (i ? r(e, t, s) : r(s)) || s);
  return i && s && Lt(e, t, s), s;
};
let ie = class extends F {
  constructor() {
    super(...arguments);
    E(this, "hass");
    E(this, "_config", {
      type: "custom:calendar-card-plus"
    });
    E(this, "_showAllCalendars", !1);
  }
  set config(e) {
    this.setConfig(e);
  }
  setConfig(e) {
    this._config = e, this.requestUpdate();
  }
  render() {
    var d, n, c, l, _, v, f, h, $, w;
    if (!this.hass)
      return u``;
    const e = this._config.upcoming_events ?? !1, t = this._config.unfold_events ?? !1, i = this._config.days ?? 1, s = this._config.hours ?? 0, o = this._config.minutes ?? 0, r = this._config.exclude_entities ?? [];
    return u`
      <div class="card-config">
        <ha-expansion-panel outlined>
          <div
            slot="header"
            role="heading"
            aria-level="3"
            style="display: flex; align-items: center; gap: 8px;"
          >
            <ha-icon
              icon="mdi:cog"
              style="color: var(--secondary-text-color);"
            ></ha-icon>
            ${g(this.hass, "editor_configuration")}
          </div>
          <div
            class="settings-grid"
            style="margin-top: 16px; margin-bottom: 16px;"
          >
            <div class="settings-row">
              <span class="label"
                >${g(this.hass, "editor_unfold_events")}</span
              >
              <ha-switch
                .checked=${t}
                @change=${this._compactModeChanged}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${g(this.hass, "editor_show_divider")}</span
              >
              <ha-switch
                .checked=${this._config.show_divider ?? !1}
                @change=${this._calendarDividerChanged}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${g(this.hass, "editor_show_add_event")}</span
              >
              <ha-switch
                .checked=${this._config.show_add_event ?? !1}
                @change=${(m) => this._toggleBooleanConfig(m, "show_add_event")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label">${g(this.hass, "group_by_date")}</span>
              <ha-switch
                .checked=${this._config.group_by_date ?? !1}
                @change=${(m) => this._toggleBooleanConfig(m, "group_by_date")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${g(this.hass, "group_by_date_and_calendar")}</span
              >
              <ha-switch
                .checked=${this._config.group_by_date_and_calendar ?? !1}
                @change=${(m) => this._toggleBooleanConfig(m, "group_by_date_and_calendar")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label">Dark Mode</span>
              <ha-switch
                .checked=${this._config.dark_mode ?? !1}
                @change=${(m) => this._toggleBooleanConfig(m, "dark_mode")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${g(this.hass, "editor_show_upcoming")}</span
              >
              <ha-switch
                .checked=${e}
                @change=${this._calendarShowAllChanged}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${g(this.hass, "editor_show_empty_days")}</span
              >
              <ha-switch
                .checked=${this._config.show_empty_days ?? !1}
                @change=${(m) => this._toggleBooleanConfig(m, "show_empty_days")}
              ></ha-switch>
            </div>
          </div>

          ${t ? u`
                <div
                  class="settings-row full-width"
                  style="margin-bottom: 16px;"
                >
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ number: { min: 0, max: 20, mode: "box" } }}
                    .value=${this._config.max_lines || 0}
                    .label=${g(this.hass, "editor_max_lines")}
                    .configValue=${"max_lines"}
                    @value-changed=${this._valueChanged}
                  ></ha-selector>
                </div>
              ` : ""}
          ${e ? u`
                <div
                  class="settings-row full-width"
                  style="margin-bottom: 8px;"
                >
                  <span class="label" style="margin-bottom: 8px;"
                    >${((d = this.hass) == null ? void 0 : d.localize(
      "ui.panel.lovelace.editor.card.statistic.period"
    )) || "Period"}</span
                  >
                  <div class="period-selectors">
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{ number: { min: 0, max: 365, mode: "box" } }}
                      .value=${i}
                      .label=${((n = this.hass) == null ? void 0 : n.localize(
      "component.input_datetime.entity_component._.state_attributes.day.name"
    )) || "Days"}
                      .configValue=${"days"}
                      @value-changed=${this._valueChanged}
                    ></ha-selector>
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{ number: { min: 0, max: 23, mode: "box" } }}
                      .value=${s}
                      .label=${((c = this.hass) == null ? void 0 : c.localize(
      "component.input_datetime.entity_component._.state_attributes.hour.name"
    )) || "Hours"}
                      .configValue=${"hours"}
                      @value-changed=${this._valueChanged}
                    ></ha-selector>
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{ number: { min: 0, max: 59, mode: "box" } }}
                      .value=${o}
                      .label=${((l = this.hass) == null ? void 0 : l.localize(
      "component.input_datetime.entity_component._.state_attributes.minute.name"
    )) || "Minutes"}
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
              .label="Global ${this.hass.localize(
      "ui.panel.lovelace.editor.card.tile.color"
    ) || "Color"}"
              .configValue=${"calendar_icon_color"}
              @value-changed=${this._valueChanged}
            ></ha-selector>
          </div>

          <div class="settings-row full-width" style="margin-bottom: 16px;">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ ui_color: {} }}
              .value=${this._config.background_color || ""}
              .label=${g(this.hass, "editor_background_color")}
              .configValue=${"background_color"}
              @value-changed=${this._valueChanged}
            ></ha-selector>
          </div>
        </ha-expansion-panel>

        <ha-expansion-panel outlined>
          <div
            slot="header"
            role="heading"
            aria-level="3"
            style="display: flex; align-items: center; gap: 8px;"
          >
            <ha-icon
              icon="mdi:card-text"
              style="color: var(--secondary-text-color);"
            ></ha-icon>
            ${g(this.hass, "editor_text_visibility")}
          </div>
          <div
            class="settings-grid"
            style="margin-top: 16px; margin-bottom: 16px;"
          >
            <div class="settings-row">
              <span class="label"
                >${(_ = this.hass) == null ? void 0 : _.localize("ui.common.show")}
                ${(v = this.hass) == null ? void 0 : v.localize(
      "component.calendar.entity_component._.name"
    )}
                ${(f = this.hass) == null ? void 0 : f.localize("ui.common.name")}</span
              >
              <ha-switch
                .checked=${this._config.show_calendar_name ?? !1}
                @change=${(m) => this._toggleBooleanConfig(m, "show_calendar_name")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${(h = this.hass) == null ? void 0 : h.localize("ui.common.show")}
                ${(($ = this.hass) == null ? void 0 : $.localize(
      "ui.dialogs.helper_settings.input_datetime.date"
    )) || "Date"}</span
              >
              <ha-switch
                .checked=${this._config.show_date ?? !1}
                @change=${(m) => this._toggleBooleanConfig(m, "show_date")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${g(this.hass, "editor_show_location")}</span
              >
              <ha-switch
                .checked=${this._config.show_location ?? !1}
                @change=${(m) => this._toggleBooleanConfig(m, "show_location")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${g(this.hass, "editor_show_duration")}</span
              >
              <ha-switch
                .checked=${this._config.show_duration ?? !1}
                @change=${(m) => this._toggleBooleanConfig(m, "show_duration")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${g(this.hass, "editor_show_time")}</span
              >
              <ha-switch
                .checked=${this._config.show_time ?? !1}
                @change=${(m) => this._toggleBooleanConfig(m, "show_time")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${g(this.hass, "editor_icon_show_weekday")}</span
              >
              <ha-switch
                .checked=${this._config.icon_show_weekday ?? !1}
                @change=${(m) => this._toggleBooleanConfig(m, "icon_show_weekday")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${this._config.icon_show_weekday ? g(this.hass, "editor_show_month") : g(this.hass, "editor_show_weekday")}</span
              >
              <ha-switch
                .checked=${this._config.show_weekday ?? !1}
                @change=${(m) => this._toggleBooleanConfig(m, "show_weekday")}
              ></ha-switch>
            </div>
            ${this._config.show_weekday ? u`
                  <div class="settings-row">
                    <span
                      class="label"
                      style="color: var(--secondary-text-color);"
                      >${this._config.icon_show_weekday ? g(this.hass, "editor_show_month_long") : g(this.hass, "editor_show_weekday_long")}</span
                    >
                    <ha-switch
                      .checked=${this._config.show_weekday_long ?? !1}
                      @change=${(m) => this._toggleBooleanConfig(m, "show_weekday_long")}
                    ></ha-switch>
                  </div>
                  <div></div>
                ` : ""}
          </div>
        </ha-expansion-panel>

        <h4>
          ${((w = this.hass) == null ? void 0 : w.localize("ui.components.calendar.my_calendars")) || "Calendars"}
        </h4>
        <div class="entities-list">
          ${(() => {
      const m = this._getCalendarEntities(), p = this._showAllCalendars ? m : m.slice(0, 3), y = m.length > 3;
      return u`
              ${p.map((C) => {
        var k, x, z, O, J;
        const b = !r.includes(C.entity_id), S = ((k = this._config.calendar_colors) == null ? void 0 : k[C.entity_id]) || "", P = this._toCssColor(
          S || this._config.calendar_icon_color || "#fa3e3e"
        );
        return u`
                  <div class="entity-row ${b ? "" : "disabled"}">
                    <div class="entity-row-top">
                      <div
                        class="entity-icon dynamic"
                        style="background: transparent;"
                      >
                        ${this._renderDynamicIcon(
          /* @__PURE__ */ new Date(),
          P,
          this._config.dark_mode ?? !1,
          this._config.icon_show_weekday ?? !1
        )}
                      </div>
                      <div class="entity-info">
                        <span class="entity-name"
                          >${C.attributes.friendly_name || C.entity_id}</span
                        >
                        <span class="entity-id">${C.entity_id}</span>
                      </div>
                      <ha-button
                        size="small"
                        appearance="filled"
                        variant="brand"
                        class="${b ? "action-hide" : "action-show"}"
                        @click=${(A) => this._calendarToggleEntity(A, C.entity_id)}
                      >
                        ${b ? ((x = this.hass) == null ? void 0 : x.localize("ui.common.hide")) || "Hide" : ((z = this.hass) == null ? void 0 : z.localize("ui.common.show")) || "Show"}
                      </ha-button>
                    </div>
                    <div class="entity-row-bottom">
                      <ha-selector
                        .hass=${this.hass}
                        .selector=${{ ui_color: {} }}
                        .value=${S}
                        .label=${((O = this.hass) == null ? void 0 : O.localize(
          "ui.panel.lovelace.editor.card.tile.color"
        )) || "Color"}
                        @value-changed=${(A) => this._calendarColorChanged(A, C.entity_id)}
                      ></ha-selector>
                      <ha-selector
                        .hass=${this.hass}
                        .selector=${{ ui_color: {} }}
                        .value=${((J = this._config.calendar_background_colors) == null ? void 0 : J[C.entity_id]) || ""}
                        .label=${g(
          this.hass,
          "editor_background_color"
        )}
                        @value-changed=${(A) => this._calendarBackgroundColorChanged(
          A,
          C.entity_id
        )}
                      ></ha-selector>
                    </div>
                  </div>
                `;
      })}
              ${y ? u`
                    <div class="show-more-row">
                      <ha-button
                        @click=${() => {
        this._showAllCalendars = !this._showAllCalendars, this.requestUpdate();
      }}
                      >
                        ${this._showAllCalendars ? g(this.hass, "editor_show_less") : g(this.hass, "editor_show_more")}
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
    const i = [...this._config.exclude_entities ?? []], s = i.indexOf(t);
    s === -1 ? i.push(t) : i.splice(s, 1), this._config = {
      ...this._config,
      exclude_entities: i
    }, H(this, "config-changed", { config: this._config });
  }
  _calendarShowAllChanged(e) {
    const t = e.target.checked;
    this._config = {
      ...this._config,
      upcoming_events: t
    }, H(this, "config-changed", { config: this._config });
  }
  _compactModeChanged(e) {
    const t = e.target.checked;
    this._config = {
      ...this._config,
      unfold_events: t
    }, H(this, "config-changed", { config: this._config });
  }
  _calendarDividerChanged(e) {
    const t = e.target.checked;
    this._config = {
      ...this._config,
      show_divider: t
    }, H(this, "config-changed", { config: this._config });
  }
  _toggleBooleanConfig(e, t) {
    const i = e.target.checked;
    this._config = {
      ...this._config,
      [t]: i
    }, H(this, "config-changed", { config: this._config });
  }
  _valueChanged(e) {
    var r;
    if (!this._config || !this.hass)
      return;
    const i = e.target.configValue;
    if (!i)
      return;
    const s = (r = e.detail) == null ? void 0 : r.value;
    if (this._config[i] === s)
      return;
    const o = { ...this._config };
    s == null || s === "" ? delete o[i] : o[i] = s, this._config = o, H(this, "config-changed", { config: this._config });
  }
  _calendarColorChanged(e, t) {
    const i = e.detail.value, s = { ...this._config.calendar_colors || {} };
    if (i == null || i === "" ? delete s[t] : s[t] = i, Object.keys(s).length === 0) {
      const o = { ...this._config };
      delete o.calendar_colors, this._config = o;
    } else
      this._config = {
        ...this._config,
        calendar_colors: s
      };
    H(this, "config-changed", { config: this._config });
  }
  _calendarBackgroundColorChanged(e, t) {
    const i = e.detail.value, s = {
      ...this._config.calendar_background_colors || {}
    };
    if (i == null || i === "" ? delete s[t] : s[t] = i, Object.keys(s).length === 0) {
      const o = { ...this._config };
      delete o.calendar_background_colors, this._config = o;
    } else
      this._config = {
        ...this._config,
        calendar_background_colors: s
      };
    H(this, "config-changed", { config: this._config });
  }
  static get styles() {
    return Ae`
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
  _renderDynamicIcon(e, t, i = !1, s = !1) {
    const o = this.hass ? j(this.hass) : "en";
    let r;
    s ? r = e.toLocaleDateString(o, { weekday: "short" }).toUpperCase() : r = e.toLocaleDateString(o, { month: "short" }).toUpperCase();
    const d = e.getDate();
    return u`
      <svg
        viewBox="0 0 100 100"
        class="dynamic-calendar-icon"
        style="width: 100%; height: 100%; display: block;"
      >
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          rx="20"
          ry="20"
          fill="${i ? "#222222" : "white"}"
        ></rect>
        <path
          d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z"
          fill="${t}"
        ></path>
        <text
          x="50"
          y="23"
          font-family="sans-serif"
          font-size="22"
          font-weight="bold"
          fill="${i ? "#222222" : "white"}"
          text-anchor="middle"
        >
          ${r}
        </text>
        <text
          x="50"
          y="82"
          font-family="sans-serif"
          font-size="52"
          font-weight="bold"
          fill="${i ? "white" : "#333"}"
          text-anchor="middle"
        >
          ${d}
        </text>
      </svg>
    `;
  }
};
ge([
  N({ attribute: !1 })
], ie.prototype, "hass", 2);
ge([
  he()
], ie.prototype, "_config", 2);
ge([
  he()
], ie.prototype, "_showAllCalendars", 2);
ie = ge([
  Se("calendar-card-plus-editor")
], ie);
const Nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get CalendarCardPlusEditor() {
    return ie;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  ce as CalendarCardPlus
};
