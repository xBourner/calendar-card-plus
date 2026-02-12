var Et = Object.defineProperty;
var Ct = (n, t, e) => t in n ? Et(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var _ = (n, t, e) => Ct(n, typeof t != "symbol" ? t + "" : t, e);
var St = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z", Tt = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
async function Pt(n, t, e, i) {
  const s = encodeURI(`?start=${t.toISOString()}&end=${e.toISOString()}`), o = i.map(async (a) => {
    try {
      const c = await n.callApi("GET", `calendars/${a}${s}`);
      if (!Array.isArray(c))
        throw new Error("Response is not an array");
      return c.map((d) => {
        var g, p, v, j, z, st;
        const h = ((g = d.start) == null ? void 0 : g.dateTime) || ((p = d.start) == null ? void 0 : p.date) || d.start, u = ((v = d.end) == null ? void 0 : v.dateTime) || ((j = d.end) == null ? void 0 : j.date) || d.end;
        return {
          ...d,
          start: { dateTime: h.includes("T") ? h : void 0, date: h.includes("T") ? void 0 : h },
          end: { dateTime: u.includes("T") ? u : void 0, date: u.includes("T") ? void 0 : u },
          summary: d.summary || d.title || "Unknown Event",
          entity_id: a,
          calendar_name: ((st = (z = n.states[a]) == null ? void 0 : z.attributes) == null ? void 0 : st.friendly_name) || a
        };
      });
    } catch {
      const l = n.states[a];
      return l && l.attributes.start_time && l.attributes.end_time ? [{
        start: { dateTime: l.attributes.start_time.replace(" ", "T") },
        end: { dateTime: l.attributes.end_time.replace(" ", "T") },
        summary: l.attributes.message || l.attributes.friendly_name,
        location: l.attributes.location,
        description: l.attributes.description,
        entity_id: a,
        calendar_name: l.attributes.friendly_name || a
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
const V = globalThis, Q = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = Symbol(), nt = /* @__PURE__ */ new WeakMap();
let _t = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Q && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = nt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && nt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Mt = (n) => new _t(typeof n == "string" ? n : n + "", void 0, X), $t = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new _t(e, n, X);
}, Dt = (n, t) => {
  if (Q) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = V.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, rt = Q ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Mt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: kt, defineProperty: Ot, getOwnPropertyDescriptor: Ut, getOwnPropertyNames: Ht, getOwnPropertySymbols: Lt, getPrototypeOf: Nt } = Object, y = globalThis, ot = y.trustedTypes, Rt = ot ? ot.emptyScript : "", Z = y.reactiveElementPolyfillSupport, D = (n, t) => n, B = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Rt : null;
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
} }, Y = (n, t) => !kt(n, t), at = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: Y };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let E = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = at) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Ot(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = Ut(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const a = s == null ? void 0 : s.call(this);
      o == null || o.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const t = Nt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const e = this.properties, i = [...Ht(e), ...Lt(e)];
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
      for (const s of i) e.unshift(rt(s));
    } else t !== void 0 && e.push(rt(t));
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
    return Dt(t, this.constructor.elementStyles), t;
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
    var o;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : B).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, r;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : B;
      this._$Em = s;
      const l = c.fromAttribute(e, a.type);
      this[s] = l ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? Y)(o, e) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, r] of s) {
        const { wrapped: a } = r, c = this[o];
        a !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, r, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
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
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[D("elementProperties")] = /* @__PURE__ */ new Map(), E[D("finalized")] = /* @__PURE__ */ new Map(), Z == null || Z({ ReactiveElement: E }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis, ct = (n) => n, q = k.trustedTypes, lt = q ? q.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, yt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, bt = "?" + $, jt = `<${bt}>`, A = document, O = () => A.createComment(""), U = (n) => n === null || typeof n != "object" && typeof n != "function", tt = Array.isArray, zt = (n) => tt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, ht = />/g, b = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, ut = /"/g, wt = /^(?:script|style|textarea|title)$/i, It = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), m = It(1), S = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), w = A.createTreeWalker(A, 129);
function xt(n, t) {
  if (!tt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const Vt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = M;
  for (let a = 0; a < e; a++) {
    const c = n[a];
    let l, d, h = -1, u = 0;
    for (; u < c.length && (r.lastIndex = u, d = r.exec(c), d !== null); ) u = r.lastIndex, r === M ? d[1] === "!--" ? r = dt : d[1] !== void 0 ? r = ht : d[2] !== void 0 ? (wt.test(d[2]) && (s = RegExp("</" + d[2], "g")), r = b) : d[3] !== void 0 && (r = b) : r === b ? d[0] === ">" ? (r = s ?? M, h = -1) : d[1] === void 0 ? h = -2 : (h = r.lastIndex - d[2].length, l = d[1], r = d[3] === void 0 ? b : d[3] === '"' ? ut : pt) : r === ut || r === pt ? r = b : r === dt || r === ht ? r = M : (r = b, s = void 0);
    const g = r === b && n[a + 1].startsWith("/>") ? " " : "";
    o += r === M ? c + jt : h >= 0 ? (i.push(l), c.slice(0, h) + yt + c.slice(h) + $ + g) : c + $ + (h === -2 ? a : g);
  }
  return [xt(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class H {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, c = this.parts, [l, d] = Vt(t, e);
    if (this.el = H.createElement(l, i), w.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = w.nextNode()) !== null && c.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(yt)) {
          const u = d[r++], g = s.getAttribute(h).split($), p = /([.?@])?(.*)/.exec(u);
          c.push({ type: 1, index: o, name: p[2], strings: g, ctor: p[1] === "." ? qt : p[1] === "?" ? Wt : p[1] === "@" ? Gt : W }), s.removeAttribute(h);
        } else h.startsWith($) && (c.push({ type: 6, index: o }), s.removeAttribute(h));
        if (wt.test(s.tagName)) {
          const h = s.textContent.split($), u = h.length - 1;
          if (u > 0) {
            s.textContent = q ? q.emptyScript : "";
            for (let g = 0; g < u; g++) s.append(h[g], O()), w.nextNode(), c.push({ type: 2, index: ++o });
            s.append(h[u], O());
          }
        }
      } else if (s.nodeType === 8) if (s.data === bt) c.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf($, h + 1)) !== -1; ) c.push({ type: 7, index: o }), h += $.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = A.createElement("template");
    return i.innerHTML = t, i;
  }
}
function T(n, t, e = n, i) {
  var r, a;
  if (t === S) return t;
  let s = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const o = U(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = T(n, s._$AS(n, t.values), s, i)), t;
}
class Bt {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? A).importNode(e, !0);
    w.currentNode = s;
    let o = w.nextNode(), r = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let l;
        c.type === 2 ? l = new N(o, o.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(o, c.name, c.strings, this, t) : c.type === 6 && (l = new Zt(o, this, t)), this._$AV.push(l), c = i[++a];
      }
      r !== (c == null ? void 0 : c.index) && (o = w.nextNode(), r++);
    }
    return w.currentNode = A, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class N {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = T(this, t, e), U(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : zt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = H.createElement(xt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(e);
    else {
      const r = new Bt(s, this), a = r.u(this.options);
      r.p(e), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new H(t)), e;
  }
  k(t) {
    tt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new N(this.O(O()), this.O(O()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = ct(t).nextSibling;
      ct(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class W {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = T(this, t, e, 0), r = !U(t) || t !== this._$AH && t !== S, r && (this._$AH = t);
    else {
      const a = t;
      let c, l;
      for (t = o[0], c = 0; c < o.length - 1; c++) l = T(this, a[i + c], e, c), l === S && (l = this._$AH[c]), r || (r = !U(l) || l !== this._$AH[c]), l === f ? t = f : t !== f && (t += (l ?? "") + o[c + 1]), this._$AH[c] = l;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class qt extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Wt extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Gt extends W {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = T(this, t, e, 0) ?? f) === S) return;
    const i = this._$AH, s = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== f && (i === f || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Zt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    T(this, t);
  }
}
const K = k.litHtmlPolyfillSupport;
K == null || K(H, N), (k.litHtmlVersions ?? (k.litHtmlVersions = [])).push("3.3.2");
const Jt = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new N(t.insertBefore(O(), o), o, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis;
class C extends E {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Jt(e, this.renderRoot, this.renderOptions);
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
    return S;
  }
}
var vt;
C._$litElement$ = !0, C.finalized = !0, (vt = x.litElementHydrateSupport) == null || vt.call(x, { LitElement: C });
const F = x.litElementPolyfillSupport;
F == null || F({ LitElement: C });
(x.litElementVersions ?? (x.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const At = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Kt = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: Y }, Ft = (n = Kt, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), o.set(e.name, n), i === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, c, n, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, n, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(a) {
      const c = this[r];
      t.call(this, a), this.requestUpdate(r, c, n, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function et(n) {
  return (t, e) => typeof e == "object" ? Ft(n, t, e) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function G(n) {
  return et({ ...n, state: !0, attribute: !1 });
}
function Qt(n, t) {
  const e = (t == null ? void 0 : t.display_mode) || "compact";
  if (n === void 0)
    return m`
        <div class="calendar-container">
            <div class="calendar-item" style="cursor: default;">
                 <div class="calendar-icon" style="background-color: var(--primary-color, #03a9f4);">
                    <ha-icon icon="mdi:calendar-clock"></ha-icon>
                </div>
                <div class="calendar-content">
                    <div class="event-title">Loading events...</div>
                    <div class="event-time">Please wait</div>
                </div>
            </div>
        </div>
        `;
  if (n.length === 0)
    return m`
        <div class="calendar-container">
            <div class="calendar-item" style="cursor: default;">
                 <div class="calendar-icon" style="background-color: var(--disabled-text-color, #bdbdbb);">
                    <ha-icon icon="mdi:calendar-remove"></ha-icon>
                </div>
                <div class="calendar-content">
                    <div class="event-title">No active events</div>
                    <div class="event-time">No upcoming events found</div>
                </div>
            </div>
        </div>
        `;
  if (e === "compact") {
    const i = n[0], s = n.length - 1, o = i.summary;
    let r, a;
    try {
      if (r = new Date(i.start.dateTime || i.start.date), a = new Date(i.end.dateTime || i.end.date), isNaN(r.getTime()) || isNaN(a.getTime())) throw new Error("Invalid Date");
    } catch {
      return m`<div class="error">Date Error</div>`;
    }
    const c = /* @__PURE__ */ new Date(), l = !i.start.dateTime;
    let d;
    if (r > c) {
      const p = r.getTime() - c.getTime(), v = Math.ceil(p / 6e4);
      d = gt(v);
    } else if (l)
      d = "Ganztägig";
    else {
      const p = (v) => v.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      d = `${p(r)} - ${p(a)}`;
    }
    s > 0 && (d += ` (+${s} weitere)`);
    const u = r <= c && a >= c ? c : r, g = mt(u);
    return m`
            <div class="calendar-container">
                <div class="calendar-item"  
                     title="${o}"
                     @click=${(p) => Xt(p, n)}>
                     <div class="calendar-icon dynamic">
                        ${g}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title">${o}</div>
                        <div class="event-time">${d}</div>
                    </div>
                    <ha-icon-button icon="mdi:chevron-right"></ha-icon-button>
                </div>
            </div>
        `;
  }
  return m`
        <div class="calendar-container">
            ${n.map((i) => {
    const s = i.summary;
    let o, r;
    try {
      if (o = new Date(i.start.dateTime || i.start.date), r = new Date(i.end.dateTime || i.end.date), isNaN(o.getTime())) throw new Error("Invalid start date");
      if (isNaN(r.getTime())) throw new Error("Invalid end date");
    } catch {
      return m`<div class="error">Date Error for ${s}</div>`;
    }
    const a = /* @__PURE__ */ new Date(), c = !i.start.dateTime;
    let l, d = -1;
    if (o > a) {
      const p = o.getTime() - a.getTime(), v = Math.ceil(p / 6e4);
      l = gt(v);
    } else if (c)
      l = "Ganztägig";
    else {
      const p = (z) => z.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      l = `${p(o)} - ${p(r)}`;
      const v = r.getTime() - o.getTime(), j = a.getTime() - o.getTime();
      v > 0 && (d = Math.max(0, Math.min(100, j / v * 100)));
    }
    const u = o <= a && r >= a ? a : o, g = mt(u);
    return m`
                <div class="calendar-item"  
                     title="${s}"
                     @click=${(p) => Yt(p, i.entity_id)}>
                     <div class="calendar-icon dynamic">
                        ${g}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title">${s}</div>
                        <div class="event-time">${l}</div>
                        ${d >= 0 ? m`
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${d}%"></div>
                            </div>
                        ` : ""}
                    </div>
                </div>
                `;
  })}
        </div>
    `;
}
function Xt(n, t) {
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
function Yt(n, t) {
  const e = new CustomEvent("hass-more-info", {
    bubbles: !0,
    composed: !0,
    detail: { entityId: t }
  });
  n.target.dispatchEvent(e);
}
function mt(n) {
  const t = n.toLocaleDateString([], { month: "short" }).toUpperCase(), e = n.getDate();
  return m`
        <svg viewBox="0 0 100 100" class="dynamic-calendar-icon" style="width: 100%; height: 100%; display: block;">
            <rect x="0" y="0" width="100" height="100" rx="20" ry="20" fill="white"></rect>
            <path d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z" fill="#fa3e3e"></path>
            <text x="50" y="23" font-family="sans-serif" font-size="22" font-weight="bold" fill="white" text-anchor="middle">${t}</text>
            <text x="50" y="82" font-family="sans-serif" font-size="52" font-weight="bold" fill="#333" text-anchor="middle">${e}</text>
        </svg>
    `;
}
function gt(n) {
  if (n < 60)
    return `Startet in ${n} min`;
  if (n < 1440)
    return `Startet in ${Math.round(n / 60)} Std`;
  if (n < 43200) {
    const e = Math.round(n / 1440);
    return `Startet in ${e} ${e === 1 ? "Tag" : "Tagen"}`;
  }
  return `Startet in ${Math.round(n / 10080)} Wochen`;
}
var te = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, R = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? ee(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && te(t, e, s), s;
};
let P = class extends C {
  constructor() {
    super(...arguments);
    _(this, "hass");
    _(this, "config");
    _(this, "_detailPopup", { open: !1, title: "", events: [] });
    _(this, "_events");
    _(this, "_handleShowDetail", (t) => {
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
      var a;
      return !((a = this.config.exclude_entities) != null && a.includes(r));
    });
    if (s.length === 0) {
      this._events = [];
      return;
    }
    const o = await Pt(this.hass, e, i, s);
    o.sort((r, a) => {
      const c = new Date(r.start.dateTime || r.start.date).getTime(), l = new Date(a.start.dateTime || a.start.date).getTime();
      return c - l;
    }), this._events = o, this.requestUpdate();
  }
  _closeDetailPopup() {
    this._detailPopup = { ...this._detailPopup, open: !1 }, this.requestUpdate();
  }
  render() {
    if (!this.config || !this.hass)
      return m``;
    const t = Qt(this._events, this.config);
    return m`
            <ha-card>
                ${t}

                ${this._detailPopup.open ? m`
                    <ha-dialog
                        open
                        hideActions
                        @closed=${this._closeDetailPopup}
                        class="detail-dialog"
                    >
                        <div class="dialog-header">
                            <ha-icon-button .path=${Tt} @click=${this._closeDetailPopup}></ha-icon-button>
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
      let s = "", o, r;
      try {
        o = new Date(e.start.dateTime || e.start.date), r = new Date(e.end.dateTime || e.end.date);
      } catch {
        return m`<div class="error">Date Error</div>`;
      }
      const a = /* @__PURE__ */ new Date(), c = !e.start.dateTime;
      if (o > a)
        s = this._formatRelativeTime(o);
      else if (c)
        s = "Ganztägig";
      else {
        const l = (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        s = `${l(o)} - ${l(r)}`;
      }
      return m`
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
    const e = /* @__PURE__ */ new Date(), i = t.getTime() - e.getTime(), s = Math.ceil(i / 6e4), o = Math.floor(s / 60), r = Math.floor(o / 24);
    return s < 60 ? `In ${s} min` : o < 24 ? `In ${o} hour${o > 1 ? "s" : ""}` : r < 7 ? `In ${r} day${r > 1 ? "s" : ""}` : t.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
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
    return $t`
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
    return await Promise.resolve().then(() => ne), document.createElement("calendar-card-plus-editor");
  }
  static getStubConfig(t) {
    return {
      type: "custom:calendar-card-plus",
      exclude_entities: [],
      display_mode: "compact"
    };
  }
};
R([
  et({ attribute: !1 })
], P.prototype, "hass", 2);
R([
  G()
], P.prototype, "config", 2);
R([
  G()
], P.prototype, "_detailPopup", 2);
R([
  G()
], P.prototype, "_events", 2);
P = R([
  At("calendar-card-plus")
], P);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "calendar-card-plus",
  name: "Dynamic Calendar Card Plus",
  preview: !0,
  description: "A standalone calendar card with dynamic grid styling"
});
const I = (n, t, e, i) => {
  i = i || {}, e = e ?? {};
  const s = new Event(t, {
    bubbles: i.bubbles === void 0 ? !0 : i.bubbles,
    cancelable: !!i.cancelable,
    composed: i.composed === void 0 ? !0 : i.composed
  });
  return s.detail = e, n.dispatchEvent(s), s;
};
var ie = Object.defineProperty, se = Object.getOwnPropertyDescriptor, it = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? se(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && ie(t, e, s), s;
};
let L = class extends C {
  constructor() {
    super(...arguments);
    _(this, "hass");
    _(this, "_config");
  }
  setConfig(t) {
    this._config = t;
  }
  render() {
    return this.hass ? (this._config || (this._config = {
      type: "custom:calendar-card-plus",
      exclude_entities: [],
      max_minutes_until_start: 1440,
      display_mode: "compact"
      // Default to compact
    }), m`
            <div class="card-config">
                
                <div class="settings-row">
                    <span class="label">Show entries even if not running</span>
                    <ha-switch
                        .checked=${this._config.show_all || !1}
                        @change=${this._calendarShowAllChanged}
                    ></ha-switch>
                </div>

                <div class="settings-row">
                    <span class="label">List Mode</span>
                    <ha-switch
                        .checked=${(this._config.display_mode || "compact") === "list"}
                        @change=${this._compactModeChanged}
                    ></ha-switch>
                </div>

                <div class="settings-row">
                    <ha-textfield
                        label="Lookahead (minutes)"
                        type="number"
                        .value=${this._config.max_minutes_until_start || 1440}
                        @input=${this._calendarLookAheadChanged}
                    ></ha-textfield>
                </div>

                <h4>Include Calendars</h4>
                <div class="entities-list">
                    ${this._getCalendarEntities().map((t) => {
      const e = this._isCalendarIncluded(t.entity_id);
      return m`
                            <div class="entity-row ${e ? "" : "disabled"}">
                                <div class="entity-icon">
                                    <ha-svg-icon .path=${St}></ha-svg-icon>
                                </div>
                                <div class="entity-info">
                                    <span class="entity-name">${t.attributes.friendly_name || t.entity_id}</span>
                                    <span class="entity-id">${t.entity_id}</span>
                                </div>
                                <ha-button
                                    size="small" 
                                    appearance="filled" 
                                    variant="brand" 
                                    class="${e ? "action-hide" : "action-show"}"
                                    @click=${(i) => this._calendarToggleEntity(i, t.entity_id)}
                                >
                                    ${e ? "Hide" : "Show"}
                                </ha-button>
                            </div>
                        `;
    })}
                </div>
            </div>
        `) : m``;
  }
  _getCalendarEntities() {
    return this.hass ? Object.keys(this.hass.states).filter((t) => t.startsWith("calendar.")).map((t) => {
      var e;
      return (e = this.hass) == null ? void 0 : e.states[t];
    }) : [];
  }
  _isCalendarIncluded(t) {
    return this._config ? !(this._config.exclude_entities || []).includes(t) : !0;
  }
  _calendarToggleEntity(t, e) {
    if (t.stopPropagation(), !this._config) return;
    const i = [...this._config.exclude_entities || []], s = i.indexOf(e);
    s === -1 ? i.push(e) : i.splice(s, 1), this._config = {
      ...this._config,
      exclude_entities: i
    }, I(this, "config-changed", { config: this._config }), this.requestUpdate();
  }
  _calendarShowAllChanged(t) {
    if (!this._config) return;
    const e = t.target.checked;
    this._config = {
      ...this._config,
      show_all: e
    }, I(this, "config-changed", { config: this._config });
  }
  _calendarLookAheadChanged(t) {
    if (!this._config) return;
    const e = parseInt(t.target.value);
    isNaN(e) || (this._config = {
      ...this._config,
      max_minutes_until_start: e
    }, I(this, "config-changed", { config: this._config }));
  }
  _compactModeChanged(t) {
    if (!this._config) return;
    const e = t.target.checked;
    this._config = {
      ...this._config,
      display_mode: e ? "list" : "compact"
    }, I(this, "config-changed", { config: this._config });
  }
  static get styles() {
    return $t`
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
            }
            .entities-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding-bottom: 12px;
            }
            .entity-row {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 8px 12px;
                border: 1px solid var(--divider-color, #eee);
                border-radius: 8px;
                transition: opacity 0.2s;
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
it([
  et({ attribute: !1 })
], L.prototype, "hass", 2);
it([
  G()
], L.prototype, "_config", 2);
L = it([
  At("calendar-card-plus-editor")
], L);
const ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get CalendarCardPlusEditor() {
    return L;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  P as CalendarCardPlus
};
