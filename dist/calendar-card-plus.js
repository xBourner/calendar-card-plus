var Re = Object.defineProperty;
var Ie = (n, e, t) => e in n ? Re(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var x = (n, e, t) => Ie(n, typeof e != "symbol" ? e + "" : e, t);
var Ve = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
async function Ke(n, e, t, i) {
  const a = encodeURI(`?start=${e.toISOString()}&end=${t.toISOString()}`), s = i.map(async (r) => {
    try {
      const d = await n.callApi("GET", `calendars/${r}${a}`);
      if (!Array.isArray(d))
        throw new Error("Response is not an array");
      return d.map((l) => {
        var w, m, A, E, c, g;
        const h = ((w = l.start) == null ? void 0 : w.dateTime) || ((m = l.start) == null ? void 0 : m.date) || l.start, u = ((A = l.end) == null ? void 0 : A.dateTime) || ((E = l.end) == null ? void 0 : E.date) || l.end;
        return {
          ...l,
          start: { dateTime: h.includes("T") ? h : void 0, date: h.includes("T") ? void 0 : h },
          end: { dateTime: u.includes("T") ? u : void 0, date: u.includes("T") ? void 0 : u },
          summary: l.summary || l.title || "Unknown Event",
          entity_id: r,
          calendar_name: ((g = (c = n.states[r]) == null ? void 0 : c.attributes) == null ? void 0 : g.friendly_name) || r
        };
      });
    } catch {
      const _ = n.states[r];
      return _ && _.attributes.start_time && _.attributes.end_time ? [{
        start: { dateTime: _.attributes.start_time.replace(" ", "T") },
        end: { dateTime: _.attributes.end_time.replace(" ", "T") },
        summary: _.attributes.message || _.attributes.friendly_name,
        location: _.attributes.location,
        description: _.attributes.description,
        entity_id: r,
        calendar_name: _.attributes.friendly_name || r
      }] : [];
    }
  });
  return (await Promise.all(s)).flat();
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = globalThis, ge = ne.ShadowRoot && (ne.ShadyCSS === void 0 || ne.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pe = Symbol(), xe = /* @__PURE__ */ new WeakMap();
let je = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== pe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ge && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = xe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && xe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const We = (n) => new je(typeof n == "string" ? n : n + "", void 0, pe), fe = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, a, s) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + n[s + 1], n[0]);
  return new je(t, n, pe);
}, Ze = (n, e) => {
  if (ge) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), a = ne.litNonce;
    a !== void 0 && i.setAttribute("nonce", a), i.textContent = t.cssText, n.appendChild(i);
  }
}, be = ge ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return We(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: qe, defineProperty: Fe, getOwnPropertyDescriptor: Ye, getOwnPropertyNames: Ge, getOwnPropertySymbols: Qe, getPrototypeOf: Je } = Object, D = globalThis, ke = D.trustedTypes, Xe = ke ? ke.emptyScript : "", ce = D.reactiveElementPolyfillSupport, F = (n, e) => n, se = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Xe : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, we = (n, e) => !qe(n, e), Ae = { attribute: !0, type: String, converter: se, reflect: !1, useDefault: !1, hasChanged: we };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), D.litPropertyMetadata ?? (D.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let I = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ae) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), a = this.getPropertyDescriptor(e, i, t);
      a !== void 0 && Fe(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: a, set: s } = Ye(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: a, set(o) {
      const r = a == null ? void 0 : a.call(this);
      s == null || s.call(this, o), this.requestUpdate(e, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ae;
  }
  static _$Ei() {
    if (this.hasOwnProperty(F("elementProperties"))) return;
    const e = Je(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(F("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(F("properties"))) {
      const t = this.properties, i = [...Ge(t), ...Qe(t)];
      for (const a of i) this.createProperty(a, t[a]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, a] of t) this.elementProperties.set(i, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const a = this._$Eu(t, i);
      a !== void 0 && this._$Eh.set(a, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const a of i) t.unshift(be(a));
    } else e !== void 0 && t.push(be(e));
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
    return Ze(e, this.constructor.elementStyles), e;
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
    var s;
    const i = this.constructor.elementProperties.get(e), a = this.constructor._$Eu(e, i);
    if (a !== void 0 && i.reflect === !0) {
      const o = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : se).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(a) : this.setAttribute(a, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, o;
    const i = this.constructor, a = i._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const r = i.getPropertyOptions(a), d = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((s = r.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? r.converter : se;
      this._$Em = a;
      const _ = d.fromAttribute(t, r.type);
      this[a] = _ ?? ((o = this._$Ej) == null ? void 0 : o.get(a)) ?? _, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, a = !1, s) {
    var o;
    if (e !== void 0) {
      const r = this.constructor;
      if (a === !1 && (s = this[e]), i ?? (i = r.getPropertyOptions(e)), !((i.hasChanged ?? we)(s, t) || i.useDefault && i.reflect && s === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(r._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: a, wrapped: s }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), a === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [s, o] of a) {
        const { wrapped: r } = o, d = this[s];
        r !== !0 || this._$AL.has(s) || d === void 0 || this.C(s, void 0, o, d);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((a) => {
        var s;
        return (s = a.hostUpdate) == null ? void 0 : s.call(a);
      }), this.update(t)) : this._$EM();
    } catch (a) {
      throw e = !1, this._$EM(), a;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var a;
      return (a = i.hostUpdated) == null ? void 0 : a.call(i);
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
I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, I[F("elementProperties")] = /* @__PURE__ */ new Map(), I[F("finalized")] = /* @__PURE__ */ new Map(), ce == null || ce({ ReactiveElement: I }), (D.reactiveElementVersions ?? (D.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, Ce = (n) => n, oe = Y.trustedTypes, Ee = oe ? oe.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Oe = "$lit$", P = `lit$${Math.random().toFixed(9).slice(2)}$`, Ne = "?" + P, et = `<${Ne}>`, H = document, G = () => H.createComment(""), Q = (n) => n === null || typeof n != "object" && typeof n != "function", ye = Array.isArray, tt = (n) => ye(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", _e = `[ 	
\f\r]`, q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ze = /-->/g, Se = />/g, j = RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Te = /'/g, Pe = /"/g, Ue = /^(?:script|style|textarea|title)$/i, it = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), f = it(1), V = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), De = /* @__PURE__ */ new WeakMap(), N = H.createTreeWalker(H, 129);
function Be(n, e) {
  if (!ye(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ee !== void 0 ? Ee.createHTML(e) : e;
}
const at = (n, e) => {
  const t = n.length - 1, i = [];
  let a, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = q;
  for (let r = 0; r < t; r++) {
    const d = n[r];
    let _, l, h = -1, u = 0;
    for (; u < d.length && (o.lastIndex = u, l = o.exec(d), l !== null); ) u = o.lastIndex, o === q ? l[1] === "!--" ? o = ze : l[1] !== void 0 ? o = Se : l[2] !== void 0 ? (Ue.test(l[2]) && (a = RegExp("</" + l[2], "g")), o = j) : l[3] !== void 0 && (o = j) : o === j ? l[0] === ">" ? (o = a ?? q, h = -1) : l[1] === void 0 ? h = -2 : (h = o.lastIndex - l[2].length, _ = l[1], o = l[3] === void 0 ? j : l[3] === '"' ? Pe : Te) : o === Pe || o === Te ? o = j : o === ze || o === Se ? o = q : (o = j, a = void 0);
    const w = o === j && n[r + 1].startsWith("/>") ? " " : "";
    s += o === q ? d + et : h >= 0 ? (i.push(_), d.slice(0, h) + Oe + d.slice(h) + P + w) : d + P + (h === -2 ? r : w);
  }
  return [Be(n, s + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class J {
  constructor({ strings: e, _$litType$: t }, i) {
    let a;
    this.parts = [];
    let s = 0, o = 0;
    const r = e.length - 1, d = this.parts, [_, l] = at(e, t);
    if (this.el = J.createElement(_, i), N.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (a = N.nextNode()) !== null && d.length < r; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const h of a.getAttributeNames()) if (h.endsWith(Oe)) {
          const u = l[o++], w = a.getAttribute(h).split(P), m = /([.?@])?(.*)/.exec(u);
          d.push({ type: 1, index: s, name: m[2], strings: w, ctor: m[1] === "." ? st : m[1] === "?" ? ot : m[1] === "@" ? rt : re }), a.removeAttribute(h);
        } else h.startsWith(P) && (d.push({ type: 6, index: s }), a.removeAttribute(h));
        if (Ue.test(a.tagName)) {
          const h = a.textContent.split(P), u = h.length - 1;
          if (u > 0) {
            a.textContent = oe ? oe.emptyScript : "";
            for (let w = 0; w < u; w++) a.append(h[w], G()), N.nextNode(), d.push({ type: 2, index: ++s });
            a.append(h[u], G());
          }
        }
      } else if (a.nodeType === 8) if (a.data === Ne) d.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = a.data.indexOf(P, h + 1)) !== -1; ) d.push({ type: 7, index: s }), h += P.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = H.createElement("template");
    return i.innerHTML = e, i;
  }
}
function K(n, e, t = n, i) {
  var o, r;
  if (e === V) return e;
  let a = i !== void 0 ? (o = t._$Co) == null ? void 0 : o[i] : t._$Cl;
  const s = Q(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== s && ((r = a == null ? void 0 : a._$AO) == null || r.call(a, !1), s === void 0 ? a = void 0 : (a = new s(n), a._$AT(n, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = a : t._$Cl = a), a !== void 0 && (e = K(n, a._$AS(n, e.values), a, i)), e;
}
class nt {
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
    const { el: { content: t }, parts: i } = this._$AD, a = ((e == null ? void 0 : e.creationScope) ?? H).importNode(t, !0);
    N.currentNode = a;
    let s = N.nextNode(), o = 0, r = 0, d = i[0];
    for (; d !== void 0; ) {
      if (o === d.index) {
        let _;
        d.type === 2 ? _ = new ee(s, s.nextSibling, this, e) : d.type === 1 ? _ = new d.ctor(s, d.name, d.strings, this, e) : d.type === 6 && (_ = new dt(s, this, e)), this._$AV.push(_), d = i[++r];
      }
      o !== (d == null ? void 0 : d.index) && (s = N.nextNode(), o++);
    }
    return N.currentNode = H, a;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class ee {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, a) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = a, this._$Cv = (a == null ? void 0 : a.isConnected) ?? !0;
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
    e = K(this, e, t), Q(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== V && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : tt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && Q(this._$AH) ? this._$AA.nextSibling.data = e : this.T(H.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: i } = e, a = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = J.createElement(Be(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === a) this._$AH.p(t);
    else {
      const o = new nt(a, this), r = o.u(this.options);
      o.p(t), this.T(r), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = De.get(e.strings);
    return t === void 0 && De.set(e.strings, t = new J(e)), t;
  }
  k(e) {
    ye(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, a = 0;
    for (const s of e) a === t.length ? t.push(i = new ee(this.O(G()), this.O(G()), this, this.options)) : i = t[a], i._$AI(s), a++;
    a < t.length && (this._$AR(i && i._$AB.nextSibling, a), t.length = a);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const a = Ce(e).nextSibling;
      Ce(e).remove(), e = a;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class re {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, a, s) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = t, this._$AM = a, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = b;
  }
  _$AI(e, t = this, i, a) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = K(this, e, t, 0), o = !Q(e) || e !== this._$AH && e !== V, o && (this._$AH = e);
    else {
      const r = e;
      let d, _;
      for (e = s[0], d = 0; d < s.length - 1; d++) _ = K(this, r[i + d], t, d), _ === V && (_ = this._$AH[d]), o || (o = !Q(_) || _ !== this._$AH[d]), _ === b ? e = b : e !== b && (e += (_ ?? "") + s[d + 1]), this._$AH[d] = _;
    }
    o && !a && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class st extends re {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class ot extends re {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class rt extends re {
  constructor(e, t, i, a, s) {
    super(e, t, i, a, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = K(this, e, t, 0) ?? b) === V) return;
    const i = this._$AH, a = e === b && i !== b || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== b && (i === b || a);
    a && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class dt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    K(this, e);
  }
}
const he = Y.litHtmlPolyfillSupport;
he == null || he(J, ee), (Y.litHtmlVersions ?? (Y.litHtmlVersions = [])).push("3.3.2");
const lt = (n, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let a = i._$litPart$;
  if (a === void 0) {
    const s = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = a = new ee(e.insertBefore(G(), s), s, void 0, t ?? {});
  }
  return a._$AI(n), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis;
class B extends I {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = lt(t, this.renderRoot, this.renderOptions);
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
    return V;
  }
}
var Le;
B._$litElement$ = !0, B.finalized = !0, (Le = U.litElementHydrateSupport) == null || Le.call(U, { LitElement: B });
const ue = U.litElementPolyfillSupport;
ue == null || ue({ LitElement: B });
(U.litElementVersions ?? (U.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = (n) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(n, e);
  }) : customElements.define(n, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = { attribute: !0, type: String, converter: se, reflect: !1, hasChanged: we }, _t = (n = ct, e, t) => {
  const { kind: i, metadata: a } = t;
  let s = globalThis.litPropertyMetadata.get(a);
  if (s === void 0 && globalThis.litPropertyMetadata.set(a, s = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), s.set(t.name, n), i === "accessor") {
    const { name: o } = t;
    return { set(r) {
      const d = e.get.call(this);
      e.set.call(this, r), this.requestUpdate(o, d, n, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(o, void 0, n, r), r;
    } };
  }
  if (i === "setter") {
    const { name: o } = t;
    return function(r) {
      const d = this[o];
      e.call(this, r), this.requestUpdate(o, d, n, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function T(n) {
  return (e, t) => typeof t == "object" ? _t(n, e, t) : ((i, a, s) => {
    const o = a.hasOwnProperty(s);
    return a.constructor.createProperty(s, i), o ? Object.getOwnPropertyDescriptor(a, s) : void 0;
  })(n, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function te(n) {
  return T({ ...n, state: !0, attribute: !1 });
}
const R = {
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
    editor_show_divider: "Show Divider",
    editor_show_weekday: "Show Weekday",
    editor_show_weekday_long: "Use long weekday (e.g. Monday)",
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
    editor_show_less: "Show Less"
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
    editor_show_divider: "Zeige Trenner",
    editor_show_weekday: "Zeige Wochentag",
    editor_show_weekday_long: "Ausgeschrieben (z.B. Montag)",
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
    editor_show_less: "Weniger anzeigen"
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
    editor_show_less: "Afficher moins"
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
    editor_show_less: "Mostra meno"
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
    editor_show_less: "Mostrar menos"
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
    editor_show_less: "Toon minder"
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
    editor_show_less: "Mostrar menos"
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
    editor_show_less: "Показать меньше"
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
    editor_show_less: "Pokaż mniej"
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
    editor_show_less: "Visa mindre"
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
    editor_show_less: "Vis mindre"
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
    editor_show_less: "Vis mindre"
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
    editor_show_less: "Näytä vähemmän"
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
    editor_show_less: "Zobrazit méně"
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
    editor_show_less: "Kevesebb mutatása"
  }
};
function $(n, e, t, i) {
  var o;
  const a = ((o = n.locale) == null ? void 0 : o.language) || n.language || "en";
  let s;
  if (R[a] && R[a][e])
    s = R[a][e];
  else if (R.en && R.en[e])
    s = R.en[e];
  else
    return e;
  return t && i && (s = s.replace(t, i)), s;
}
function ht(n, e, t) {
  var a, s, o;
  const i = (t == null ? void 0 : t.unfold_events) || !1;
  if (e === void 0)
    return f`
        <div class="calendar-container">
            <div class="calendar-item" style="cursor: default;">
                 <div class="calendar-icon" style="background-color: var(--primary-color, #03a9f4);">
                    <ha-icon icon="mdi:calendar-clock"></ha-icon>
                </div>
                <div class="calendar-content">
                    <div class="event-title">${$(n, "loading")}</div>
                </div>
            </div>
        </div>
        `;
  if (e.length === 0)
    return f`
        <div class="calendar-container">
            <div class="calendar-item" style="cursor: default;">
                 <div class="calendar-icon" style="background-color: var(--disabled-text-color, #bdbdbb);">
                    <ha-icon icon="mdi:calendar-remove"></ha-icon>
                </div>
                <div class="calendar-content">
                    <div class="event-title">${$(n, "no_events")}</div>
                </div>
            </div>
        </div>
        `;
  if (!i) {
    const r = e[0], d = e.length - 1, _ = r.summary;
    let l, h;
    try {
      if (l = new Date(r.start.dateTime || r.start.date), h = new Date(r.end.dateTime || r.end.date), isNaN(l.getTime()) || isNaN(h.getTime())) throw new Error("Invalid Date");
    } catch {
      return f`<div class="error">Date Error</div>`;
    }
    const u = /* @__PURE__ */ new Date(), w = !r.start.dateTime;
    let m;
    if (l > u)
      if (t != null && t.show_date) {
        const v = ((a = n.locale) == null ? void 0 : a.language) || n.language || navigator.language, p = l.toLocaleDateString(v, { day: "2-digit", month: "2-digit", year: "numeric" });
        if (w)
          m = p;
        else {
          const y = l.toLocaleTimeString(v, { hour: "2-digit", minute: "2-digit" });
          m = `${p}, ${y}${v.startsWith("de") ? " Uhr" : ""}`;
        }
      } else {
        const v = l.getTime() - u.getTime(), p = Math.ceil(v / 6e4);
        m = Me(n, p);
      }
    else if (w)
      m = n.localize("component.calendar.entity_component._.state_attributes.all_day.name") || "All day";
    else {
      const v = ((s = n.locale) == null ? void 0 : s.language) || n.language || navigator.language, p = (y) => y.toLocaleTimeString(v, { hour: "2-digit", minute: "2-digit" });
      m = `${p(l)} - ${p(h)}`;
    }
    if (d > 0 && (m += ` ${$(n, "more_events", "{x}", d.toString())}`), t != null && t.show_weekday) {
      const v = ((o = n.locale) == null ? void 0 : o.language) || n.language || navigator.language, p = l.toLocaleDateString(v, { weekday: t.show_weekday_long ? "long" : "short" });
      m += ` • ${p}`;
    }
    t != null && t.show_calendar_name && r.calendar_name && (m += ` • ${r.calendar_name}`);
    const E = l <= u && h >= u ? u : l, c = ve(r.entity_id, t), g = me(n, E, c, (t == null ? void 0 : t.dark_mode) ?? !1);
    return f`
            <div class="calendar-container">
                <div class="calendar-item"  
                     title="${_}"
                     @click=${(v) => vt(v, n, e)}>
                     <div class="calendar-icon dynamic">
                        ${g}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title">${_}</div>
                        <div class="event-time">${m}</div>
                    </div>
                </div>
            </div>
        `;
  }
  return f`
        <div class="calendar-container">
            ${e.map((r, d) => {
    var y, k, ie;
    const _ = r.summary;
    let l, h;
    try {
      if (l = new Date(r.start.dateTime || r.start.date), h = new Date(r.end.dateTime || r.end.date), isNaN(l.getTime())) throw new Error("Invalid start date");
      if (isNaN(h.getTime())) throw new Error("Invalid end date");
    } catch {
      return f`<div class="error">Date Error for ${_}</div>`;
    }
    const u = /* @__PURE__ */ new Date(), w = !r.start.dateTime;
    let m, A = -1;
    if (l > u)
      if (t != null && t.show_date) {
        const C = ((y = n.locale) == null ? void 0 : y.language) || n.language || navigator.language, z = l.toLocaleDateString(C, { day: "2-digit", month: "2-digit", year: "numeric" });
        if (w)
          m = z;
        else {
          const L = l.toLocaleTimeString(C, { hour: "2-digit", minute: "2-digit" });
          m = `${z}, ${L}${C.startsWith("de") ? " Uhr" : ""}`;
        }
      } else {
        const C = l.getTime() - u.getTime(), z = Math.ceil(C / 6e4);
        m = Me(n, z);
      }
    else if (w)
      m = n.localize("component.calendar.entity_component._.state_attributes.all_day.name") || "All day";
    else {
      const C = ((k = n.locale) == null ? void 0 : k.language) || n.language || navigator.language, z = (Z) => Z.toLocaleTimeString(C, { hour: "2-digit", minute: "2-digit" });
      m = `${z(l)} - ${z(h)}`;
      const L = h.getTime() - l.getTime(), ae = u.getTime() - l.getTime();
      L > 0 && (A = Math.max(0, Math.min(100, ae / L * 100)));
    }
    if (t != null && t.show_weekday) {
      const C = ((ie = n.locale) == null ? void 0 : ie.language) || n.language || navigator.language, z = l.toLocaleDateString(C, { weekday: t.show_weekday_long ? "long" : "short" });
      m += ` • ${z}`;
    }
    t != null && t.show_calendar_name && r.calendar_name && (m += ` • ${r.calendar_name}`);
    const c = l <= u && h >= u ? u : l, g = ve(r.entity_id, t), v = me(n, c, g, (t == null ? void 0 : t.dark_mode) ?? !1), p = (t == null ? void 0 : t.show_divider) && d > 0 && e[d - 1].entity_id !== r.entity_id;
    return f`
                ${p ? f`<div class="calendar-divider"></div>` : ""}
                <div class="calendar-item"  
                     style="margin-bottom: 6px;"
                     title="${_}"
                     @click=${(C) => mt(C, r.entity_id)}>
                     <div class="calendar-icon dynamic">
                        ${v}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title">${_}</div>
                        <div class="event-time">${m}</div>
                        ${A >= 0 ? f`
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${A}%"></div>
                            </div>
                        ` : ""}
                    </div>
                </div>
                `;
  })}
        </div>
    `;
}
function ve(n, e) {
  var i;
  const t = ((i = e == null ? void 0 : e.calendar_colors) == null ? void 0 : i[n]) || (e == null ? void 0 : e.calendar_icon_color) || "#fa3e3e";
  return ut(t);
}
function ut(n) {
  return n.startsWith("#") || n.startsWith("rgb") || n.startsWith("hsl") || n.startsWith("var") ? n : `var(--${n}-color)`;
}
function vt(n, e, t) {
  const i = new CustomEvent("calendar-card-show-detail", {
    bubbles: !0,
    composed: !0,
    detail: {
      title: $(e, "popup_upcoming_events"),
      entities: t
    }
  });
  n.target.dispatchEvent(i);
}
function mt(n, e) {
  const t = new CustomEvent("hass-more-info", {
    bubbles: !0,
    composed: !0,
    detail: { entityId: e }
  });
  n.target.dispatchEvent(t);
}
function me(n, e, t, i = !1) {
  var l;
  const a = ((l = n.locale) == null ? void 0 : l.language) || n.language || navigator.language, s = e.toLocaleDateString(a, { month: "short" }).toUpperCase(), o = e.getDate();
  return f`
        <svg viewBox="0 0 100 100" class="dynamic-calendar-icon" style="width: 100%; height: 100%; display: block;">
            <rect x="0" y="0" width="100" height="100" rx="20" ry="20" fill="${i ? "#222222" : "white"}"></rect>
            <path d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z" fill="${t}"></path>
            <text x="50" y="23" font-family="sans-serif" font-size="22" font-weight="bold" fill="${i ? "#222222" : "white"}" text-anchor="middle">${s}</text>
            <text x="50" y="82" font-family="sans-serif" font-size="52" font-weight="bold" fill="${i ? "white" : "#333"}" text-anchor="middle">${o}</text>
        </svg>
    `;
}
function Me(n, e) {
  if (e < 60)
    return e === 1 ? $(n, "starts_in_min", "{x}", e.toString()) : $(n, "starts_in_mins", "{x}", e.toString());
  if (e < 1440) {
    const i = Math.round(e / 60);
    return i === 1 ? $(n, "starts_in_hour", "{x}", i.toString()) : $(n, "starts_in_hours", "{x}", i.toString());
  }
  if (e < 43200) {
    const i = Math.round(e / 1440);
    return i === 1 ? $(n, "starts_in_day", "{x}", i.toString()) : $(n, "starts_in_days", "{x}", i.toString());
  }
  const t = Math.round(e / 10080);
  return t === 1 ? $(n, "starts_in_week", "{x}", t.toString()) : $(n, "starts_in_weeks", "{x}", t.toString());
}
function gt(n, e) {
  const t = Object.keys(n.states).filter((_) => _.startsWith("calendar.")).filter((_) => {
    var l;
    return !((l = e.exclude_entities) != null && l.includes(_));
  }), i = t.length > 0 ? t[0] : void 0, a = /* @__PURE__ */ new Date(), s = new Date(a);
  s.setHours(s.getHours() + 1, 0, 0, 0);
  const o = new Date(s);
  o.setHours(o.getHours() + 1, 0, 0, 0);
  const r = (_) => _.toString().padStart(2, "0"), d = (_) => `${_.getFullYear()}-${r(_.getMonth() + 1)}-${r(_.getDate())} ${r(_.getHours())}:${r(_.getMinutes())}:00`;
  return {
    open: !0,
    calendar_id: i,
    name: "",
    start: d(s),
    end: d(o),
    location: "",
    description: "",
    recurrence: "none",
    all_day: !1
  };
}
async function pt(n, e, t, i) {
  if (!(!e.calendar_id || !e.name || !e.start || !e.end))
    try {
      const a = {
        entity_id: e.calendar_id,
        summary: e.name
      };
      if (e.all_day) {
        const s = e.start.split(" ")[0];
        let o = e.end.split(" ")[0];
        if (s === o) {
          const r = o.split("-"), d = new Date(Number(r[0]), Number(r[1]) - 1, Number(r[2]));
          d.setDate(d.getDate() + 1);
          const _ = (l) => l.toString().padStart(2, "0");
          o = `${d.getFullYear()}-${_(d.getMonth() + 1)}-${_(d.getDate())}`;
        }
        a.start_date = s, a.end_date = o;
      } else
        a.start_date_time = e.start, a.end_date_time = e.end, e.location && (a.location = e.location), e.description && (a.description = e.description);
      if (e.recurrence && e.recurrence !== "none") {
        const s = {
          DAILY: "FREQ=DAILY",
          WEEKLY: "FREQ=WEEKLY",
          MONTHLY: "FREQ=MONTHLY",
          YEARLY: "FREQ=YEARLY"
        };
        s[e.recurrence] && (a.rrule = s[e.recurrence]);
      }
      await n.callService("calendar", "create_event", a), t();
    } catch (a) {
      i(a);
    }
}
function ft(n, e, t, i, a, s) {
  var r, d, _, l, h, u, w, m, A, E;
  const o = Object.keys(n.states).filter((c) => c.startsWith("calendar.")).filter((c) => {
    var g;
    return !((g = e.exclude_entities) != null && g.includes(c));
  });
  return f`
        <div class="add-event-form">
            <ha-textfield
                    label=${n.localize("ui.components.calendar.event.summary") || "Title"}
                    .value=${t.name || ""}
                    @input=${(c) => i({ name: c.target.value })}
                    dialogInitialFocus
                ></ha-textfield>

                <ha-textfield
                    label=${n.localize("ui.components.calendar.event.location") || "Location"}
                    .value=${t.location || ""}
                    @input=${(c) => i({ location: c.target.value })}
                ></ha-textfield>

                <ha-textfield
                    label=${n.localize("ui.components.calendar.event.description") || "Description"}
                    .value=${t.description || ""}
                    @input=${(c) => i({ description: c.target.value })}
                ></ha-textfield>

                <ha-select
                    label=${n.localize("ui.components.calendar.my_calendars") || "Calendar"}
                    .value=${t.calendar_id || ""}
                    @change=${(c) => i({ calendar_id: c.target.value })}
                    @closed=${(c) => c.stopPropagation()}
                >
                    ${o.map((c) => {
    var g, v;
    return f`
                        <mwc-list-item value=${c}>
                            ${((v = (g = n.states[c]) == null ? void 0 : g.attributes) == null ? void 0 : v.friendly_name) || c}
                        </mwc-list-item>
                    `;
  })}
                </ha-select>

                <div class="row-flex">
                    <ha-formfield .label=${n.localize("ui.components.calendar.event.all_day") || "All Day"}>
                        <ha-switch
                            .checked=${t.all_day || !1}
                            @change=${(c) => i({ all_day: c.target.checked })}
                        ></ha-switch>
                    </ha-formfield>
                </div>

                <div class="row-label">${n.localize("ui.components.calendar.event.start") || "Start"}:</div>
                <div class="date-row">
                    <ha-selector
                        class="date-selector"
                        .hass=${n}
                        .selector=${{ date: {} }}
                        .required=${!1}
                        .value=${((r = t.start) == null ? void 0 : r.split(" ")[0]) || ""}
                        @value-changed=${(c) => {
    var v;
    const g = ((v = t.start) == null ? void 0 : v.split(" ")[1]) || "00:00:00";
    i({ start: `${c.detail.value} ${g}` });
  }}
                    ></ha-selector>
                    <div class="time-inputs-wrap">
                        <ha-textfield
                            type="number"
                            min="0"
                            max="23"
                            .disabled=${t.all_day}
                            .value=${((_ = (d = t.start) == null ? void 0 : d.split(" ")[1]) == null ? void 0 : _.substring(0, 2)) || "00"}
                            @change=${(c) => {
    var p, y, k;
    const g = ((p = t.start) == null ? void 0 : p.split(" ")[0]) || "", v = ((k = (y = t.start) == null ? void 0 : y.split(" ")[1]) == null ? void 0 : k.substring(3, 5)) || "00";
    i({ start: `${g} ${c.target.value.padStart(2, "0")}:${v}:00` });
  }}
                            style="flex: 1; min-width: 0;"
                        ></ha-textfield>
                        <span>:</span>
                        <ha-textfield
                            type="number"
                            min="0"
                            max="59"
                            .disabled=${t.all_day}
                            .value=${((h = (l = t.start) == null ? void 0 : l.split(" ")[1]) == null ? void 0 : h.substring(3, 5)) || "00"}
                            @change=${(c) => {
    var p, y, k;
    const g = ((p = t.start) == null ? void 0 : p.split(" ")[0]) || "", v = ((k = (y = t.start) == null ? void 0 : y.split(" ")[1]) == null ? void 0 : k.substring(0, 2)) || "00";
    i({ start: `${g} ${v}:${c.target.value.padStart(2, "0")}:00` });
  }}
                            style="flex: 1; min-width: 0;"
                        ></ha-textfield>
                    </div>
                </div>
                
                <div class="row-label">${n.localize("ui.components.calendar.event.end") || "End"}:</div>
                <div class="date-row">
                    <ha-selector
                        class="date-selector"
                        .hass=${n}
                        .selector=${{ date: {} }}
                        .required=${!1}
                        .value=${((u = t.end) == null ? void 0 : u.split(" ")[0]) || ""}
                        @value-changed=${(c) => {
    var v;
    const g = ((v = t.end) == null ? void 0 : v.split(" ")[1]) || "00:00:00";
    i({ end: `${c.detail.value} ${g}` });
  }}
                    ></ha-selector>
                    <div class="time-inputs-wrap">
                        <ha-textfield
                            type="number"
                            min="0"
                            max="23"
                            .disabled=${t.all_day}
                            .value=${((m = (w = t.end) == null ? void 0 : w.split(" ")[1]) == null ? void 0 : m.substring(0, 2)) || "00"}
                            @change=${(c) => {
    var p, y, k;
    const g = ((p = t.end) == null ? void 0 : p.split(" ")[0]) || "", v = ((k = (y = t.end) == null ? void 0 : y.split(" ")[1]) == null ? void 0 : k.substring(3, 5)) || "00";
    i({ end: `${g} ${c.target.value.padStart(2, "0")}:${v}:00` });
  }}
                            style="flex: 1; min-width: 0;"
                        ></ha-textfield>
                        <span>:</span>
                        <ha-textfield
                            type="number"
                            min="0"
                            max="59"
                            .disabled=${t.all_day}
                            .value=${((E = (A = t.end) == null ? void 0 : A.split(" ")[1]) == null ? void 0 : E.substring(3, 5)) || "00"}
                            @change=${(c) => {
    var p, y, k;
    const g = ((p = t.end) == null ? void 0 : p.split(" ")[0]) || "", v = ((k = (y = t.end) == null ? void 0 : y.split(" ")[1]) == null ? void 0 : k.substring(0, 2)) || "00";
    i({ end: `${g} ${v}:${c.target.value.padStart(2, "0")}:00` });
  }}
                            style="flex: 1; min-width: 0;"
                        ></ha-textfield>
                    </div>
                </div>

                <ha-select
                    label=${n.localize("ui.components.calendar.event.repeat.label") || "Repeat"}
                    .value=${t.recurrence || "none"}
                    @change=${(c) => i({ recurrence: c.target.value })}
                    @closed=${(c) => c.stopPropagation()}
                >
                    <mwc-list-item value="none">${n.localize("ui.components.calendar.event.repeat.freq.none") || "None"}</mwc-list-item>
                    <mwc-list-item value="DAILY">${n.localize("ui.components.calendar.event.repeat.freq.daily") || "Daily"}</mwc-list-item>
                    <mwc-list-item value="WEEKLY">${n.localize("ui.components.calendar.event.repeat.freq.weekly") || "Weekly"}</mwc-list-item>
                    <mwc-list-item value="MONTHLY">${n.localize("ui.components.calendar.event.repeat.freq.monthly") || "Monthly"}</mwc-list-item>
                    <mwc-list-item value="YEARLY">${n.localize("ui.components.calendar.event.repeat.freq.yearly") || "Yearly"}</mwc-list-item>
                </ha-select>

            <div class="dialog-actions">
                <ha-button @click=${a}>
                    ${n.localize("ui.common.cancel") || "Cancel"}
                </ha-button>
                <ha-button elevated @click=${s} ?disabled=${!t.name || !t.calendar_id}>
                    ${n.localize("ui.common.save") || "Save"}
                </ha-button>
            </div>
        </div>
    `;
}
var He = Object.defineProperty, wt = Object.getOwnPropertyDescriptor, yt = (n, e, t) => e in n ? He(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, M = (n, e, t, i) => {
  for (var a = i > 1 ? void 0 : i ? wt(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (a = (i ? o(e, t, a) : o(a)) || a);
  return i && a && He(e, t, a), a;
}, $t = (n, e, t) => yt(n, e + "", t);
let S = class extends B {
  constructor() {
    super(...arguments);
    x(this, "hass");
    x(this, "config");
    x(this, "open", !1);
    x(this, "mode", "detail");
    x(this, "detailTitle", "");
    x(this, "detailEvents", []);
    x(this, "_addEventState", { open: !1 });
    x(this, "_onPopState", () => {
      this.open && this._close();
    });
    x(this, "_close", (e) => {
      if (e && e.stopPropagation(), console.log("[Calendar Popup] _close called", { open: this.open, event: e == null ? void 0 : e.type }), !this.open) return;
      this.open = !1;
      const t = { dialog: this };
      this.dispatchEvent(new CustomEvent("closed", { bubbles: !0, composed: !0, detail: t })), this.dispatchEvent(new CustomEvent("dialog-closed", { bubbles: !0, composed: !0, detail: t })), this.dispatchEvent(new CustomEvent("popup-closed", { bubbles: !0, composed: !0, detail: t })), this.requestUpdate(), console.log("[Calendar Popup] _close finished");
    });
  }
  async showDialog(e) {
    console.log("[Calendar Popup] showDialog called", { mode: e.mode }), this.hass = e.hass, this.config = e.config, this.mode = e.mode, e.title && (this.detailTitle = e.title), e.events && (this.detailEvents = e.events), e.addEventState && (this._addEventState = e.addEventState), this.open = !0, this.requestUpdate(), await this.updateComplete;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("popstate", this._onPopState);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("popstate", this._onPopState);
  }
  _updateAddEventState(e) {
    this._addEventState = { ...this._addEventState, ...e };
  }
  async _handleSave() {
    await pt(
      this.hass,
      this._addEventState,
      () => {
        this.dispatchEvent(new CustomEvent("event-saved", { bubbles: !0, composed: !0 })), this._close();
      },
      (e) => {
        alert("Error saving event: " + e.message);
      }
    );
  }
  render() {
    var t;
    if (!this.open) return b;
    const e = this.mode === "detail" ? this.detailTitle : ((t = this.hass) == null ? void 0 : t.localize("ui.components.calendar.event.add")) || "Add Event";
    return f`
            <ha-adaptive-dialog
                .hass=${this.hass}
                open
                @closed=${this._close}
                @ha-dialog-closed=${this._close}
                @wa-dialog-closed=${this._close}
                @wa-after-hide=${this._close}
                flexcontent
                .headerTitle=${e}
            >
                <div class="dialog-content">
                    ${this.mode === "detail" ? this._renderDetailContent() : ft(
      this.hass,
      this.config,
      this._addEventState,
      this._updateAddEventState.bind(this),
      this._close.bind(this),
      this._handleSave.bind(this)
    )}
                </div>
            </ha-adaptive-dialog>
        `;
  }
  _renderDetailContent() {
    return this.detailEvents.map((e, t) => {
      var m, A, E;
      const i = e.summary;
      let a = "", s, o;
      try {
        s = new Date(e.start.dateTime || e.start.date), o = new Date(e.end.dateTime || e.end.date);
      } catch {
        return f`<div class="error">Date Error</div>`;
      }
      const r = /* @__PURE__ */ new Date(), d = !e.start.dateTime;
      if (s > r) {
        const c = ((m = this.hass.locale) == null ? void 0 : m.language) || this.hass.language || navigator.language, g = s.toLocaleDateString(c, { day: "2-digit", month: "2-digit", year: "numeric" });
        if (d)
          a = g;
        else {
          const v = s.toLocaleTimeString(c, { hour: "2-digit", minute: "2-digit" });
          a = `${g}, ${v}${c.startsWith("de") ? " Uhr" : ""}`;
        }
      } else if (d)
        a = this.hass.localize("component.calendar.entity_component._.state_attributes.all_day.name") || "All day";
      else {
        const c = ((A = this.hass.locale) == null ? void 0 : A.language) || this.hass.language || navigator.language, g = (v) => v.toLocaleTimeString(c, { hour: "2-digit", minute: "2-digit" });
        a = `${g(s)} - ${g(o)}`;
      }
      if (this.config.show_weekday) {
        const c = ((E = this.hass.locale) == null ? void 0 : E.language) || this.hass.language || navigator.language, g = s.toLocaleDateString(c, { weekday: "short" });
        a += ` • ${g}`;
      }
      this.config.show_calendar_name && e.calendar_name && (a += ` • ${e.calendar_name}`);
      const l = s <= r && o >= r ? r : s, h = ve(e.entity_id, this.config), u = me(this.hass, l, h, this.config.dark_mode ?? !1), w = this.config.show_divider && t > 0;
      return f`
                ${w ? f`<div class="calendar-divider"></div>` : ""}
                <div class="calendar-item detail" @click=${() => this._handleMoreInfo(e.entity_id)}>
                    <div class="calendar-icon dynamic">
                        ${u}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title">${i}</div>
                        <div class="event-time">${a}</div>
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
    this.dispatchEvent(t);
  }
};
$t(S, "styles", fe`
        :host {
            display: block;
            z-index: 100;
            --ha-bottom-sheet-height: calc(
                100vh - max(var(--safe-area-inset-top), 48px)
            );
            --ha-bottom-sheet-height: calc(
                100dvh - max(var(--safe-area-inset-top), 48px)
            );
            --ha-bottom-sheet-max-height: var(--ha-bottom-sheet-height);
        }

        ha-adaptive-dialog {
            --mdc-dialog-min-width: 500px;
            --mdc-dialog-max-width: 500px;
            --dialog-content-padding: 0;
            --mdc-dialog-heading-ink-color: var(--primary-text-color);
            --mdc-dialog-content-ink-color: var(--primary-text-color);
            --justify-action-buttons: space-between;
        }

        .dialog-content {
            padding: 0 24px 24px 24px;
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
            font-size: 0.9em;
            color: var(--secondary-text-color);
        }

        @media (max-width: 450px), all and (max-height: 500px) {
            ha-adaptive-dialog {
                --mdc-dialog-min-width: 100vw;
                --mdc-dialog-max-width: 100vw;
            }
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

        .row-label {
            font-weight: 500;
            margin-bottom: -8px;
        }

        .dialog-actions {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            margin-top: 16px;
        }
    `);
M([
  T({ attribute: !1 })
], S.prototype, "hass", 2);
M([
  T({ attribute: !1 })
], S.prototype, "config", 2);
M([
  T({ type: Boolean })
], S.prototype, "open", 2);
M([
  T({ type: String })
], S.prototype, "mode", 2);
M([
  T({ type: String })
], S.prototype, "detailTitle", 2);
M([
  T({ type: Array })
], S.prototype, "detailEvents", 2);
M([
  te()
], S.prototype, "_addEventState", 2);
S = M([
  $e("calendar-card-plus-popup")
], S);
var xt = Object.defineProperty, bt = Object.getOwnPropertyDescriptor, de = (n, e, t, i) => {
  for (var a = i > 1 ? void 0 : i ? bt(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (a = (i ? o(e, t, a) : o(a)) || a);
  return i && a && xt(e, t, a), a;
};
let X = class extends B {
  constructor() {
    super(...arguments);
    x(this, "hass");
    x(this, "config");
    x(this, "_events");
    x(this, "_handleShowDetail", async (e) => {
      var i;
      const t = (i = this.shadowRoot) == null ? void 0 : i.querySelector("calendar-card-plus-popup");
      t && await t.showDialog({
        hass: this.hass,
        config: this.config,
        mode: "detail",
        title: e.detail.title,
        events: e.detail.entities
      });
    });
    x(this, "_openAddEventPopup", async () => {
      var t;
      const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("calendar-card-plus-popup");
      if (e) {
        const i = gt(this.hass, this.config);
        await e.showDialog({
          hass: this.hass,
          config: this.config,
          mode: "add-event",
          addEventState: i
        });
      }
    });
    x(this, "_onEventSaved", () => {
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
      let s = 1440;
      this.config.days !== void 0 || this.config.hours !== void 0 || this.config.minutes !== void 0 ? s = (this.config.days || 0) * 1440 + (this.config.hours || 0) * 60 + (this.config.minutes || 0) : this.config.max_minutes_until_start !== void 0 && (s = this.config.max_minutes_until_start), t = new Date(e.getTime() + s * 6e4);
    } else
      t = new Date(e), t.setHours(23, 59, 59, 999);
    const i = Object.keys(this.hass.states).filter((s) => s.startsWith("calendar.")).filter((s) => {
      var o;
      return !((o = this.config.exclude_entities) != null && o.includes(s));
    });
    if (i.length === 0) {
      this._events = [];
      return;
    }
    const a = await Ke(this.hass, e, t, i);
    a.sort((s, o) => {
      const r = new Date(s.start.dateTime || s.start.date).getTime(), d = new Date(o.start.dateTime || o.start.date).getTime();
      return r - d;
    }), this._events = a, this.requestUpdate();
  }
  render() {
    if (!this.config || !this.hass)
      return f``;
    const e = ht(this.hass, this._events, this.config);
    return f`
            <ha-card>
                <div class="add-event-btn" @click=${this._openAddEventPopup} style=${this.config.show_add_event ? "" : "display: none;"}>
                    <ha-icon-button .path=${Ve}></ha-icon-button>
                </div>
                ${e}

                <calendar-card-plus-popup
                    @event-saved=${this._onEventSaved}
                ></calendar-card-plus-popup>
            </ha-card>
        `;
  }
  static get styles() {
    return fe`
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
        `;
  }
  getCardSize() {
    return 1;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ct), document.createElement("calendar-card-plus-editor");
  }
  static getStubConfig(e) {
    return {
      type: "custom:calendar-card-plus",
      exclude_entities: [],
      unfold_events: !1
    };
  }
};
de([
  T({ attribute: !1 })
], X.prototype, "hass", 2);
de([
  te()
], X.prototype, "config", 2);
de([
  te()
], X.prototype, "_events", 2);
X = de([
  $e("calendar-card-plus")
], X);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "calendar-card-plus",
  name: "Dynamic Calendar Card Plus",
  preview: !0,
  description: "A standalone calendar card with dynamic grid styling"
});
const O = (n, e, t, i) => {
  i = i || {}, t = t ?? {};
  const a = new Event(e, {
    bubbles: i.bubbles === void 0 ? !0 : i.bubbles,
    cancelable: !!i.cancelable,
    composed: i.composed === void 0 ? !0 : i.composed
  });
  return a.detail = t, n.dispatchEvent(a), a;
};
var kt = Object.defineProperty, At = Object.getOwnPropertyDescriptor, le = (n, e, t, i) => {
  for (var a = i > 1 ? void 0 : i ? At(e, t) : e, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (a = (i ? o(e, t, a) : o(a)) || a);
  return i && a && kt(e, t, a), a;
};
let W = class extends B {
  constructor() {
    super(...arguments);
    x(this, "hass");
    x(this, "_config", { type: "custom:calendar-card-plus" });
    x(this, "_showAllCalendars", !1);
  }
  set config(e) {
    this.setConfig(e);
  }
  setConfig(e) {
    this._config = e, this.requestUpdate();
  }
  render() {
    var r, d, _, l, h, u, w, m, A, E;
    if (!this.hass)
      return f``;
    const e = this._config.upcoming_events ?? !1, t = this._config.unfold_events ?? !1, i = this._config.days ?? 1, a = this._config.hours ?? 0, s = this._config.minutes ?? 0, o = this._config.exclude_entities ?? [];
    return f`
            <div class="card-config">


                <div class="settings-grid">
                    <div class="settings-row">
                        <span class="label">${$(this.hass, "editor_unfold_events")}</span>
                        <ha-switch
                            .checked=${t}
                            @change=${this._compactModeChanged}
                        ></ha-switch>
                    </div>
                    <div class="settings-row">
                        <span class="label">${$(this.hass, "editor_show_divider")}</span>
                        <ha-switch
                            .checked=${this._config.show_divider ?? !1}
                            @change=${this._calendarDividerChanged}
                        ></ha-switch>
                    </div>

                    <div class="settings-row">
                        <span class="label">${(r = this.hass) == null ? void 0 : r.localize("ui.common.show")} ${(d = this.hass) == null ? void 0 : d.localize("component.calendar.entity_component._.name")} ${(_ = this.hass) == null ? void 0 : _.localize("ui.common.name")}</span>
                        <ha-switch
                            .checked=${this._config.show_calendar_name ?? !1}
                            @change=${(c) => this._toggleBooleanConfig(c, "show_calendar_name")}
                        ></ha-switch>
                    </div>
                    <div class="settings-row">
                        <span class="label">${(l = this.hass) == null ? void 0 : l.localize("ui.common.show")} ${((h = this.hass) == null ? void 0 : h.localize("ui.dialogs.helper_settings.input_datetime.date")) || "Date"}</span>
                        <ha-switch
                            .checked=${this._config.show_date ?? !1}
                            @change=${(c) => this._toggleBooleanConfig(c, "show_date")}
                        ></ha-switch>
                    </div>

                    <div class="settings-row">
                        <span class="label">${$(this.hass, "editor_show_weekday")}</span>
                        <ha-switch
                            .checked=${this._config.show_weekday ?? !1}
                            @change=${(c) => this._toggleBooleanConfig(c, "show_weekday")}
                        ></ha-switch>
                    </div>
                    <div class="settings-row">
                        <span class="label">Dark Mode</span>
                        <ha-switch
                            .checked=${this._config.dark_mode ?? !1}
                            @change=${(c) => this._toggleBooleanConfig(c, "dark_mode")}
                        ></ha-switch>
                    </div>

                ${this._config.show_weekday ? f`
                    <div class="settings-row">
                        <span class="label" style="color: var(--secondary-text-color);">${$(this.hass, "editor_show_weekday_long")}</span>
                        <ha-switch
                            .checked=${this._config.show_weekday_long ?? !1}
                            @change=${(c) => this._toggleBooleanConfig(c, "show_weekday_long")}
                        ></ha-switch>
                    </div>
                    <div></div>
                ` : ""}

                    <div class="settings-row">
                        <span class="label">${$(this.hass, "editor_show_add_event")}</span>
                        <ha-switch
                            .checked=${this._config.show_add_event ?? !1}
                            @change=${(c) => this._toggleBooleanConfig(c, "show_add_event")}
                        ></ha-switch>
                    </div>
                    <div class="settings-row">
                        <span class="label">${$(this.hass, "editor_show_upcoming")}</span>
                        <ha-switch
                            .checked=${e}
                            @change=${this._calendarShowAllChanged}
                        ></ha-switch>
                    </div>                
                </div>

            ${e ? f`
                <div class="settings-row full-width">
                     <span class="label" style="margin-bottom: 8px;">${((u = this.hass) == null ? void 0 : u.localize("ui.panel.lovelace.editor.card.statistic.period")) || "Period"}</span>
                     <div class="period-selectors">
                        <ha-selector
                            .hass=${this.hass}
                            .selector=${{ number: { min: 0, max: 365, mode: "box" } }}
                            .value=${i}
                            .label=${((w = this.hass) == null ? void 0 : w.localize("component.input_datetime.entity_component._.state_attributes.day.name")) || "Days"}
                            .configValue=${"days"}
                            @value-changed=${this._valueChanged}
                        ></ha-selector>
                        <ha-selector
                            .hass=${this.hass}
                            .selector=${{ number: { min: 0, max: 23, mode: "box" } }}
                            .value=${a}
                            .label=${((m = this.hass) == null ? void 0 : m.localize("component.input_datetime.entity_component._.state_attributes.hour.name")) || "Hours"}
                            .configValue=${"hours"}
                            @value-changed=${this._valueChanged}
                        ></ha-selector>
                        <ha-selector
                            .hass=${this.hass}
                            .selector=${{ number: { min: 0, max: 59, mode: "box" } }}
                            .value=${s}
                            .label=${((A = this.hass) == null ? void 0 : A.localize("component.input_datetime.entity_component._.state_attributes.minute.name")) || "Minutes"}
                            .configValue=${"minutes"}
                            @value-changed=${this._valueChanged}
                        ></ha-selector>
                     </div>
                </div>
            ` : ""}

                <div class="settings-row full-width">
                    <ha-selector
                        .hass=${this.hass}
                        .selector=${{ ui_color: {} }}
                        .value=${this._config.calendar_icon_color || ""}
                        .label="Global ${this.hass.localize("ui.panel.lovelace.editor.card.tile.color") || "Color"}"
                        .configValue=${"calendar_icon_color"}
                        @value-changed=${this._valueChanged}
                    ></ha-selector>
                </div>

                <h4>${((E = this.hass) == null ? void 0 : E.localize("ui.components.calendar.my_calendars")) || "Calendars"}</h4>
                <div class="entities-list">
                    ${(() => {
      const c = this._getCalendarEntities(), g = this._showAllCalendars ? c : c.slice(0, 3), v = c.length > 3;
      return f`
                            ${g.map((p) => {
        var C, z, L, ae;
        const y = !o.includes(p.entity_id), k = ((C = this._config.calendar_colors) == null ? void 0 : C[p.entity_id]) || "", ie = this._toCssColor(k || this._config.calendar_icon_color || "#fa3e3e");
        return f`
                                    <div class="entity-row ${y ? "" : "disabled"}">
                                        <div class="entity-row-top">
                                            <div class="entity-icon dynamic" style="background: transparent;">
                                                ${this._renderDynamicIcon(/* @__PURE__ */ new Date(), ie, this._config.dark_mode ?? !1)}
                                            </div>
                                            <div class="entity-info">
                                                <span class="entity-name">${p.attributes.friendly_name || p.entity_id}</span>
                                                <span class="entity-id">${p.entity_id}</span>
                                            </div>
                                            <ha-button
                                                size="small" 
                                                appearance="filled" 
                                                variant="brand" 
                                                class="${y ? "action-hide" : "action-show"}"
                                                @click=${(Z) => this._calendarToggleEntity(Z, p.entity_id)}
                                            >
                                                ${y ? ((z = this.hass) == null ? void 0 : z.localize("ui.common.hide")) || "Hide" : ((L = this.hass) == null ? void 0 : L.localize("ui.common.show")) || "Show"}
                                            </ha-button>
                                        </div>
                                        <div class="entity-row-bottom">
                                             <ha-selector
                                                .hass=${this.hass}
                                                .selector=${{ ui_color: {} }}
                                                .value=${k}
                                                .label=${((ae = this.hass) == null ? void 0 : ae.localize("ui.panel.lovelace.editor.card.tile.color")) || "Color"}
                                                @value-changed=${(Z) => this._calendarColorChanged(Z, p.entity_id)}
                                            ></ha-selector>
                                        </div>
                                    </div>
                                `;
      })}
                            ${v ? f`
                                <div class="show-more-row">
                                    <ha-button @click=${() => {
        this._showAllCalendars = !this._showAllCalendars, this.requestUpdate();
      }}>
                                        ${this._showAllCalendars ? $(this.hass, "editor_show_less") : $(this.hass, "editor_show_more")}
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
    const i = [...this._config.exclude_entities ?? []], a = i.indexOf(t);
    a === -1 ? i.push(t) : i.splice(a, 1), this._config = {
      ...this._config,
      exclude_entities: i
    }, O(this, "config-changed", { config: this._config });
  }
  _calendarShowAllChanged(e) {
    const t = e.target.checked;
    this._config = {
      ...this._config,
      upcoming_events: t
    }, O(this, "config-changed", { config: this._config });
  }
  _compactModeChanged(e) {
    const t = e.target.checked;
    this._config = {
      ...this._config,
      unfold_events: t
    }, O(this, "config-changed", { config: this._config });
  }
  _calendarDividerChanged(e) {
    const t = e.target.checked;
    this._config = {
      ...this._config,
      show_divider: t
    }, O(this, "config-changed", { config: this._config });
  }
  _toggleBooleanConfig(e, t) {
    const i = e.target.checked;
    this._config = {
      ...this._config,
      [t]: i
    }, O(this, "config-changed", { config: this._config });
  }
  _valueChanged(e) {
    var a;
    if (!this._config || !this.hass)
      return;
    const t = e.target, i = ((a = e.detail) == null ? void 0 : a.value) ?? t.value;
    this._config[t.configValue] !== i && t.configValue && (this._config = {
      ...this._config,
      [t.configValue]: i
    }, O(this, "config-changed", { config: this._config }));
  }
  _calendarColorChanged(e, t) {
    const i = e.detail.value, a = this._config.calendar_colors || {};
    this._config = {
      ...this._config,
      calendar_colors: {
        ...a,
        [t]: i
      }
    }, O(this, "config-changed", { config: this._config });
  }
  static get styles() {
    return fe`
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
                grid-template-columns: repeat(2, 1fr);
                gap: 0 16px;
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
  _renderDynamicIcon(e, t, i = !1) {
    var l, h, u;
    const a = ((h = (l = this.hass) == null ? void 0 : l.locale) == null ? void 0 : h.language) || ((u = this.hass) == null ? void 0 : u.language) || navigator.language || "en", s = e.toLocaleDateString(a, { month: "short" }).toUpperCase(), o = e.getDate();
    return f`
            <svg viewBox="0 0 100 100" class="dynamic-calendar-icon" style="width: 100%; height: 100%; display: block;">
                <rect x="0" y="0" width="100" height="100" rx="20" ry="20" fill="${i ? "#222222" : "white"}"></rect>
                <path d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z" fill="${t}"></path>
                <text x="50" y="23" font-family="sans-serif" font-size="22" font-weight="bold" fill="${i ? "#222222" : "white"}" text-anchor="middle">${s}</text>
                <text x="50" y="82" font-family="sans-serif" font-size="52" font-weight="bold" fill="${i ? "white" : "#333"}" text-anchor="middle">${o}</text>
            </svg>
        `;
  }
};
le([
  T({ attribute: !1 })
], W.prototype, "hass", 2);
le([
  te()
], W.prototype, "_config", 2);
le([
  te()
], W.prototype, "_showAllCalendars", 2);
W = le([
  $e("calendar-card-plus-editor")
], W);
const Ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get CalendarCardPlusEditor() {
    return W;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  X as CalendarCardPlus
};
