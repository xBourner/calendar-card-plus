//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, n = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, r = "1.2.0", i = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
//#endregion
//#region src/ha/data/calendar.ts
async function a(e, t, n, r) {
	let i = encodeURI(`?start=${t.toISOString()}&end=${n.toISOString()}`), a = r.map(async (t) => {
		try {
			let n = await e.callApi("GET", `calendars/${t}${i}`);
			if (!Array.isArray(n)) throw Error("Response is not an array");
			return n.map((n) => {
				let r = n.start?.dateTime || n.start?.date || n.start, i = n.end?.dateTime || n.end?.date || n.end;
				return {
					...n,
					start: {
						dateTime: r.includes("T") ? r : void 0,
						date: r.includes("T") ? void 0 : r
					},
					end: {
						dateTime: i.includes("T") ? i : void 0,
						date: i.includes("T") ? void 0 : i
					},
					summary: n.summary || n.title || "Unknown Event",
					entity_id: t,
					calendar_name: e.states[t]?.attributes?.friendly_name || t
				};
			});
		} catch {
			let n = e.states[t];
			return n && n.attributes.start_time && n.attributes.end_time ? [{
				start: { dateTime: n.attributes.start_time.replace(" ", "T") },
				end: { dateTime: n.attributes.end_time.replace(" ", "T") },
				summary: n.attributes.message || n.attributes.friendly_name,
				location: n.attributes.location,
				description: n.attributes.description,
				entity_id: t,
				calendar_name: n.attributes.friendly_name || t
			}] : [];
		}
	});
	return (await Promise.all(a)).flat();
}
//#endregion
//#region node_modules/@lit/reactive-element/css-tag.js
var o, s, c, l, u, d, f, ee, te, ne = t((() => {
	o = globalThis, s = o.ShadowRoot && (o.ShadyCSS === void 0 || o.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, c = Symbol(), l = /* @__PURE__ */ new WeakMap(), u = class {
		constructor(e, t, n) {
			if (this._$cssResult$ = !0, n !== c) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
			this.cssText = e, this.t = t;
		}
		get styleSheet() {
			let e = this.o, t = this.t;
			if (s && e === void 0) {
				let n = t !== void 0 && t.length === 1;
				n && (e = l.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && l.set(t, e));
			}
			return e;
		}
		toString() {
			return this.cssText;
		}
	}, d = (e) => new u(typeof e == "string" ? e : e + "", void 0, c), f = (e, ...t) => {
		let n = e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
			if (!0 === e._$cssResult$) return e.cssText;
			if (typeof e == "number") return e;
			throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
		})(n) + e[r + 1], e[0]);
		return new u(n, e, c);
	}, ee = (e, t) => {
		if (s) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
		else for (let n of t) {
			let t = document.createElement("style"), r = o.litNonce;
			r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
		}
	}, te = s ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
		let t = "";
		for (let n of e.cssRules) t += n.cssText;
		return d(t);
	})(e) : e;
})), re, ie, ae, oe, se, ce, p, le, ue, de, m, h, g, fe, _, pe = t((() => {
	ne(), {is: re, defineProperty: ie, getOwnPropertyDescriptor: ae, getOwnPropertyNames: oe, getOwnPropertySymbols: se, getPrototypeOf: ce} = Object, p = globalThis, le = p.trustedTypes, ue = le ? le.emptyScript : "", de = p.reactiveElementPolyfillSupport, m = (e, t) => e, h = {
		toAttribute(e, t) {
			switch (t) {
				case Boolean:
					e = e ? ue : null;
					break;
				case Object:
				case Array: e = e == null ? e : JSON.stringify(e);
			}
			return e;
		},
		fromAttribute(e, t) {
			let n = e;
			switch (t) {
				case Boolean:
					n = e !== null;
					break;
				case Number:
					n = e === null ? null : Number(e);
					break;
				case Object:
				case Array: try {
					n = JSON.parse(e);
				} catch {
					n = null;
				}
			}
			return n;
		}
	}, g = (e, t) => !re(e, t), fe = {
		attribute: !0,
		type: String,
		converter: h,
		reflect: !1,
		useDefault: !1,
		hasChanged: g
	}, Symbol.metadata ??= Symbol("metadata"), p.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap(), _ = class extends HTMLElement {
		static addInitializer(e) {
			this._$Ei(), (this.l ??= []).push(e);
		}
		static get observedAttributes() {
			return this.finalize(), this._$Eh && [...this._$Eh.keys()];
		}
		static createProperty(e, t = fe) {
			if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
				let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
				r !== void 0 && ie(this.prototype, e, r);
			}
		}
		static getPropertyDescriptor(e, t, n) {
			let { get: r, set: i } = ae(this.prototype, e) ?? {
				get() {
					return this[t];
				},
				set(e) {
					this[t] = e;
				}
			};
			return {
				get: r,
				set(t) {
					let a = r?.call(this);
					i?.call(this, t), this.requestUpdate(e, a, n);
				},
				configurable: !0,
				enumerable: !0
			};
		}
		static getPropertyOptions(e) {
			return this.elementProperties.get(e) ?? fe;
		}
		static _$Ei() {
			if (this.hasOwnProperty(m("elementProperties"))) return;
			let e = ce(this);
			e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
		}
		static finalize() {
			if (this.hasOwnProperty(m("finalized"))) return;
			if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(m("properties"))) {
				let e = this.properties, t = [...oe(e), ...se(e)];
				for (let n of t) this.createProperty(n, e[n]);
			}
			let e = this[Symbol.metadata];
			if (e !== null) {
				let t = litPropertyMetadata.get(e);
				if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
			}
			this._$Eh = /* @__PURE__ */ new Map();
			for (let [e, t] of this.elementProperties) {
				let n = this._$Eu(e, t);
				n !== void 0 && this._$Eh.set(n, e);
			}
			this.elementStyles = this.finalizeStyles(this.styles);
		}
		static finalizeStyles(e) {
			let t = [];
			if (Array.isArray(e)) {
				let n = new Set(e.flat(1 / 0).reverse());
				for (let e of n) t.unshift(te(e));
			} else e !== void 0 && t.push(te(e));
			return t;
		}
		static _$Eu(e, t) {
			let n = t.attribute;
			return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
		}
		constructor() {
			super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
		}
		_$Ev() {
			this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
		}
		addController(e) {
			(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
		}
		removeController(e) {
			this._$EO?.delete(e);
		}
		_$E_() {
			let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
			for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
			e.size > 0 && (this._$Ep = e);
		}
		createRenderRoot() {
			let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
			return ee(e, this.constructor.elementStyles), e;
		}
		connectedCallback() {
			this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
		}
		enableUpdating(e) {}
		disconnectedCallback() {
			this._$EO?.forEach((e) => e.hostDisconnected?.());
		}
		attributeChangedCallback(e, t, n) {
			this._$AK(e, n);
		}
		_$ET(e, t) {
			let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
			if (r !== void 0 && !0 === n.reflect) {
				let i = (n.converter?.toAttribute === void 0 ? h : n.converter).toAttribute(t, n.type);
				this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
			}
		}
		_$AK(e, t) {
			let n = this.constructor, r = n._$Eh.get(e);
			if (r !== void 0 && this._$Em !== r) {
				let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? h : e.converter;
				this._$Em = r;
				let a = i.fromAttribute(t, e.type);
				this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
			}
		}
		requestUpdate(e, t, n, r = !1, i) {
			if (e !== void 0) {
				let a = this.constructor;
				if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? g)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
				this.C(e, t, n);
			}
			!1 === this.isUpdatePending && (this._$ES = this._$EP());
		}
		C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
			n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
		}
		async _$EP() {
			this.isUpdatePending = !0;
			try {
				await this._$ES;
			} catch (e) {
				Promise.reject(e);
			}
			let e = this.scheduleUpdate();
			return e != null && await e, !this.isUpdatePending;
		}
		scheduleUpdate() {
			return this.performUpdate();
		}
		performUpdate() {
			if (!this.isUpdatePending) return;
			if (!this.hasUpdated) {
				if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
					for (let [e, t] of this._$Ep) this[e] = t;
					this._$Ep = void 0;
				}
				let e = this.constructor.elementProperties;
				if (e.size > 0) for (let [t, n] of e) {
					let { wrapped: e } = n, r = this[t];
					!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
				}
			}
			let e = !1, t = this._$AL;
			try {
				e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
			} catch (t) {
				throw e = !1, this._$EM(), t;
			}
			e && this._$AE(t);
		}
		willUpdate(e) {}
		_$AE(e) {
			this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
			this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
		}
		updated(e) {}
		firstUpdated(e) {}
	}, _.elementStyles = [], _.shadowRootOptions = { mode: "open" }, _[m("elementProperties")] = /* @__PURE__ */ new Map(), _[m("finalized")] = /* @__PURE__ */ new Map(), de?.({ ReactiveElement: _ }), (p.reactiveElementVersions ??= []).push("2.1.2");
}));
//#endregion
//#region node_modules/lit-html/lit-html.js
function me(e, t) {
	if (!w(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return _e === void 0 ? t : _e.createHTML(t);
}
function v(e, t, n = e, r) {
	if (t === k) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = C(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = v(e, i._$AS(e, t.values), i, r)), t;
}
var he, ge, y, _e, ve, b, ye, be, x, S, C, w, xe, Se, T, Ce, we, E, Te, Ee, De, D, O, k, A, Oe, j, ke, M, Ae, N, P, je, Me, Ne, Pe, Fe, Ie, Le = t((() => {
	he = globalThis, ge = (e) => e, y = he.trustedTypes, _e = y ? y.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ve = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, ye = "?" + b, be = `<${ye}>`, x = document, S = () => x.createComment(""), C = (e) => e === null || typeof e != "object" && typeof e != "function", w = Array.isArray, xe = (e) => w(e) || typeof e?.[Symbol.iterator] == "function", Se = "[ 	\n\f\r]", T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ce = /-->/g, we = />/g, E = RegExp(`>|${Se}(?:([^\\s"'>=/]+)(${Se}*=${Se}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), Te = /'/g, Ee = /"/g, De = /^(?:script|style|textarea|title)$/i, D = (e) => (t, ...n) => ({
		_$litType$: e,
		strings: t,
		values: n
	}), O = D(1), D(2), D(3), k = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), Oe = /* @__PURE__ */ new WeakMap(), j = x.createTreeWalker(x, 129), ke = (e, t) => {
		let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = T;
		for (let t = 0; t < n; t++) {
			let n = e[t], s, c, l = -1, u = 0;
			for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === T ? c[1] === "!--" ? o = Ce : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = E) : (De.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = E) : o = we : o === E ? c[0] === ">" ? (o = i ?? T, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? E : c[3] === "\"" ? Ee : Te) : o === Ee || o === Te ? o = E : o === Ce || o === we ? o = T : (o = E, i = void 0);
			let d = o === E && e[t + 1].startsWith("/>") ? " " : "";
			a += o === T ? n + be : l >= 0 ? (r.push(s), n.slice(0, l) + ve + n.slice(l) + b + d) : n + b + (l === -2 ? t : d);
		}
		return [me(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
	}, M = class e {
		constructor({ strings: t, _$litType$: n }, r) {
			let i;
			this.parts = [];
			let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ke(t, n);
			if (this.el = e.createElement(l, r), j.currentNode = this.el.content, n === 2 || n === 3) {
				let e = this.el.content.firstChild;
				e.replaceWith(...e.childNodes);
			}
			for (; (i = j.nextNode()) !== null && c.length < s;) {
				if (i.nodeType === 1) {
					if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ve)) {
						let t = u[o++], n = i.getAttribute(e).split(b), r = /([.?@])?(.*)/.exec(t);
						c.push({
							type: 1,
							index: a,
							name: r[2],
							strings: n,
							ctor: r[1] === "." ? je : r[1] === "?" ? Me : r[1] === "@" ? Ne : P
						}), i.removeAttribute(e);
					} else e.startsWith(b) && (c.push({
						type: 6,
						index: a
					}), i.removeAttribute(e));
					if (De.test(i.tagName)) {
						let e = i.textContent.split(b), t = e.length - 1;
						if (t > 0) {
							i.textContent = y ? y.emptyScript : "";
							for (let n = 0; n < t; n++) i.append(e[n], S()), j.nextNode(), c.push({
								type: 2,
								index: ++a
							});
							i.append(e[t], S());
						}
					}
				} else if (i.nodeType === 8) {
					if (i.data === ye) c.push({
						type: 2,
						index: a
					});
					else {
						let e = -1;
						for (; (e = i.data.indexOf(b, e + 1)) !== -1;) c.push({
							type: 7,
							index: a
						}), e += b.length - 1;
					}
				}
				a++;
			}
		}
		static createElement(e, t) {
			let n = x.createElement("template");
			return n.innerHTML = e, n;
		}
	}, Ae = class {
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
			let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? x).importNode(t, !0);
			j.currentNode = r;
			let i = j.nextNode(), a = 0, o = 0, s = n[0];
			for (; s !== void 0;) {
				if (a === s.index) {
					let t;
					s.type === 2 ? t = new N(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Pe(i, this, e)), this._$AV.push(t), s = n[++o];
				}
				a !== s?.index && (i = j.nextNode(), a++);
			}
			return j.currentNode = x, r;
		}
		p(e) {
			let t = 0;
			for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
		}
	}, N = class e {
		get _$AU() {
			return this._$AM?._$AU ?? this._$Cv;
		}
		constructor(e, t, n, r) {
			this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
		}
		get parentNode() {
			let e = this._$AA.parentNode, t = this._$AM;
			return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
		}
		get startNode() {
			return this._$AA;
		}
		get endNode() {
			return this._$AB;
		}
		_$AI(e, t = this) {
			e = v(this, e, t), C(e) ? e === A || e == null || e === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : e !== this._$AH && e !== k && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? xe(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
		}
		O(e) {
			return this._$AA.parentNode.insertBefore(e, this._$AB);
		}
		T(e) {
			this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
		}
		_(e) {
			this._$AH !== A && C(this._$AH) ? this._$AA.nextSibling.data = e : this.T(x.createTextNode(e)), this._$AH = e;
		}
		$(e) {
			let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = M.createElement(me(n.h, n.h[0]), this.options)), n);
			if (this._$AH?._$AD === r) this._$AH.p(t);
			else {
				let e = new Ae(r, this), n = e.u(this.options);
				e.p(t), this.T(n), this._$AH = e;
			}
		}
		_$AC(e) {
			let t = Oe.get(e.strings);
			return t === void 0 && Oe.set(e.strings, t = new M(e)), t;
		}
		k(t) {
			w(this._$AH) || (this._$AH = [], this._$AR());
			let n = this._$AH, r, i = 0;
			for (let a of t) i === n.length ? n.push(r = new e(this.O(S()), this.O(S()), this, this.options)) : r = n[i], r._$AI(a), i++;
			i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
		}
		_$AR(e = this._$AA.nextSibling, t) {
			for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
				let t = ge(e).nextSibling;
				ge(e).remove(), e = t;
			}
		}
		setConnected(e) {
			this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
		}
	}, P = class {
		get tagName() {
			return this.element.tagName;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		constructor(e, t, n, r, i) {
			this.type = 1, this._$AH = A, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = A;
		}
		_$AI(e, t = this, n, r) {
			let i = this.strings, a = !1;
			if (i === void 0) e = v(this, e, t, 0), a = !C(e) || e !== this._$AH && e !== k, a && (this._$AH = e);
			else {
				let r = e, o, s;
				for (e = i[0], o = 0; o < i.length - 1; o++) s = v(this, r[n + o], t, o), s === k && (s = this._$AH[o]), a ||= !C(s) || s !== this._$AH[o], s === A ? e = A : e !== A && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
			}
			a && !r && this.j(e);
		}
		j(e) {
			e === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
		}
	}, je = class extends P {
		constructor() {
			super(...arguments), this.type = 3;
		}
		j(e) {
			this.element[this.name] = e === A ? void 0 : e;
		}
	}, Me = class extends P {
		constructor() {
			super(...arguments), this.type = 4;
		}
		j(e) {
			this.element.toggleAttribute(this.name, !!e && e !== A);
		}
	}, Ne = class extends P {
		constructor(e, t, n, r, i) {
			super(e, t, n, r, i), this.type = 5;
		}
		_$AI(e, t = this) {
			if ((e = v(this, e, t, 0) ?? A) === k) return;
			let n = this._$AH, r = e === A && n !== A || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== A && (n === A || r);
			r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
		}
		handleEvent(e) {
			typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
		}
	}, Pe = class {
		constructor(e, t, n) {
			this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		_$AI(e) {
			v(this, e);
		}
	}, Fe = he.litHtmlPolyfillSupport, Fe?.(M, N), (he.litHtmlVersions ??= []).push("3.3.2"), Ie = (e, t, n) => {
		let r = n?.renderBefore ?? t, i = r._$litPart$;
		if (i === void 0) {
			let e = n?.renderBefore ?? null;
			r._$litPart$ = i = new N(t.insertBefore(S(), e), e, void 0, n ?? {});
		}
		return i._$AI(e), i;
	};
})), F, I, Re, ze = t((() => {
	pe(), pe(), Le(), Le(), F = globalThis, I = class extends _ {
		constructor() {
			super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
		}
		createRenderRoot() {
			let e = super.createRenderRoot();
			return this.renderOptions.renderBefore ??= e.firstChild, e;
		}
		update(e) {
			let t = this.render();
			this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ie(t, this.renderRoot, this.renderOptions);
		}
		connectedCallback() {
			super.connectedCallback(), this._$Do?.setConnected(!0);
		}
		disconnectedCallback() {
			super.disconnectedCallback(), this._$Do?.setConnected(!1);
		}
		render() {
			return k;
		}
	}, I._$litElement$ = !0, I.finalized = !0, F.litElementHydrateSupport?.({ LitElement: I }), Re = F.litElementPolyfillSupport, Re?.({ LitElement: I }), (F.litElementVersions ??= []).push("4.2.2");
})), Be = t((() => {})), L = t((() => {
	pe(), Le(), ze(), Be();
})), R, Ve = t((() => {
	R = (e) => (t, n) => {
		n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
			customElements.define(e, t);
		});
	};
}));
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
function z(e) {
	return (t, n) => typeof n == "object" ? Ue(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
var He, Ue, We = t((() => {
	pe(), He = {
		attribute: !0,
		type: String,
		converter: h,
		reflect: !1,
		hasChanged: g
	}, Ue = (e = He, t, n) => {
		let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
		if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
			let { name: r } = n;
			return {
				set(n) {
					let i = t.get.call(this);
					t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
				},
				init(t) {
					return t !== void 0 && this.C(r, void 0, e, t), t;
				}
			};
		}
		if (r === "setter") {
			let { name: r } = n;
			return function(n) {
				let i = this[r];
				t.call(this, n), this.requestUpdate(r, i, e, !0, n);
			};
		}
		throw Error("Unsupported decorator location: " + r);
	};
}));
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function B(e) {
	return z({
		...e,
		state: !0,
		attribute: !1
	});
}
var Ge = t((() => {
	We();
})), Ke = t((() => {})), qe = t((() => {})), Je = t((() => {})), Ye = t((() => {})), Xe = t((() => {})), Ze = t((() => {})), Qe = t((() => {
	Ve(), We(), Ge(), Ke(), qe(), Je(), Ye(), Xe(), Ze();
})), V, $e = t((() => {
	V = (e, t, n, r) => {
		r ||= {}, n ??= {};
		let i = new Event(t, {
			bubbles: r.bubbles === void 0 || r.bubbles,
			cancelable: !!r.cancelable,
			composed: r.composed === void 0 || r.composed
		});
		return i.detail = n, e.dispatchEvent(i), i;
	};
}));
//#endregion
//#region src/localize.ts
function H(e, t, n, r) {
	let i = e.locale?.language || e.language || "en", a;
	if (U[i] && U[i][t]) a = U[i][t];
	else if (U.en && U.en[t]) a = U.en[t];
	else return t;
	return n && r && (a = a.replace(n, r)), a;
}
var U, et = t((() => {
	U = {
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
			editor_show_empty_days: "Show Empty Days",
			editor_hide_if_no_events: "Hide card without events",
			editor_hide_period: "Hide if no event within",
			editor_empty_text: "Text for empty days",
			editor_read_only: "Read only"
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
			editor_show_empty_days: "Zeige leere Tage",
			editor_hide_if_no_events: "Karte ohne Termine ausblenden",
			editor_hide_period: "Ausblenden, wenn kein Termin innerhalb",
			editor_empty_text: "Text für leere Tage",
			editor_read_only: "Nur lesen"
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
			editor_show_empty_days: "Montrer les jours vides",
			editor_hide_if_no_events: "Masquer la carte sans événements",
			editor_hide_period: "Masquer si aucun événement dans",
			editor_empty_text: "Texte pour les jours vides",
			editor_read_only: "Lecture seule"
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
			editor_show_empty_days: "Mostra giorni vuoti",
			editor_hide_if_no_events: "Nascondi la scheda senza eventi",
			editor_hide_period: "Nascondi se nessun evento entro",
			editor_empty_text: "Testo per i giorni vuoti",
			editor_read_only: "Sola lettura"
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
			editor_show_empty_days: "Mostrar días vacíos",
			editor_hide_if_no_events: "Ocultar tarjeta sin eventos",
			editor_hide_period: "Ocultar si no hay eventos en",
			editor_empty_text: "Texto para días vacíos",
			editor_read_only: "Solo lectura"
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
			editor_show_empty_days: "Toon lege dagen",
			editor_hide_if_no_events: "Kaart verbergen zonder evenementen",
			editor_hide_period: "Verbergen als er geen evenement is binnen",
			editor_empty_text: "Tekst voor lege dagen",
			editor_read_only: "Alleen lezen"
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
			editor_show_empty_days: "Mostrar dias vazios",
			editor_hide_if_no_events: "Ocultar cartão sem eventos",
			editor_hide_period: "Ocultar se não houver eventos em",
			editor_empty_text: "Texto para dias vazios",
			editor_read_only: "Somente leitura"
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
			editor_show_empty_days: "Показать пустые дни",
			editor_hide_if_no_events: "Скрывать карточку без событий",
			editor_hide_period: "Скрывать, если нет событий в течение",
			editor_empty_text: "Текст для пустых дней",
			editor_read_only: "Только чтение"
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
			editor_show_empty_days: "Pokaż puste dni",
			editor_hide_if_no_events: "Ukryj kartę bez wydarzeń",
			editor_hide_period: "Ukryj, jeśli brak wydarzeń w ciągu",
			editor_empty_text: "Tekst dla pustych dni",
			editor_read_only: "Tylko do odczytu"
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
			editor_show_empty_days: "Visa tomma dagar",
			editor_hide_if_no_events: "Dölj kortet utan händelser",
			editor_hide_period: "Dölj om ingen händelse inom",
			editor_empty_text: "Text för tomma dagar",
			editor_read_only: "Skrivskyddad"
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
			editor_show_empty_days: "Vis tomme dage",
			editor_hide_if_no_events: "Skjul kortet uden begivenheder",
			editor_hide_period: "Skjul hvis ingen begivenhed inden for",
			editor_empty_text: "Tekst for tomme dage",
			editor_read_only: "Skrivebeskyttet"
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
			editor_show_empty_days: "Vis tomme dager",
			editor_hide_if_no_events: "Skjul kortet uten hendelser",
			editor_hide_period: "Skjul hvis ingen hendelse innen",
			editor_empty_text: "Tekst for tomme dager",
			editor_read_only: "Skrivebeskyttet"
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
			editor_show_empty_days: "Näytä tyhjät päivät",
			editor_hide_if_no_events: "Piilota kortti ilman tapahtumia",
			editor_hide_period: "Piilota, jos ei tapahtumia ajassa",
			editor_empty_text: "Teksti tyhjille päiville",
			editor_read_only: "Vain luku"
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
			editor_show_empty_days: "Zobrazit prázdné dny",
			editor_hide_if_no_events: "Skrýt kartu bez událostí",
			editor_hide_period: "Skrýt, pokud není událost do",
			editor_empty_text: "Text pro prázdné dny",
			editor_read_only: "Pouze pro čtení"
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
			editor_show_empty_days: "Üres napok mutatása",
			editor_hide_if_no_events: "Kártya elrejtése események nélkül",
			editor_hide_period: "Elrejtés, ha nincs esemény ennyi időn belül",
			editor_empty_text: "Szöveg üres napokhoz",
			editor_read_only: "Csak olvasható"
		}
	};
}));
//#endregion
//#region src/format.ts
function W(e) {
	return e.locale?.language || e.language || navigator.language || "en";
}
function tt(e) {
	let t = e.locale?.time_format;
	if (!t || t === "language" || t === "system") {
		let n = t === "language" ? e.locale?.language || e.language : void 0;
		return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(n).includes("10");
	}
	return t === "12";
}
function nt(e, t) {
	let n = W(e), r = tt(e), i = e.locale?.time_format === "system";
	return new Intl.DateTimeFormat(i ? void 0 : n, {
		hour: "numeric",
		minute: "2-digit",
		hourCycle: r ? "h12" : "h23"
	}).format(t);
}
function rt(e, t) {
	let n = W(e), r = e.locale?.date_format, i = r === "system", a = new Intl.DateTimeFormat(i ? void 0 : n, {
		year: "numeric",
		month: "numeric",
		day: "numeric"
	});
	if (!r || r === "language" || r === "system") return a.format(t);
	let o = a.formatToParts(t), s = o.find((e) => e.type === "literal")?.value ?? "/", c = o.find((e) => e.type === "day")?.value ?? "", l = o.find((e) => e.type === "month")?.value ?? "", u = o.find((e) => e.type === "year")?.value ?? "", d = o[o.length - 1], f = d?.type === "literal" ? d?.value : "";
	return {
		DMY: `${c}${s}${l}${s}${u}${f}`,
		MDY: `${l}${s}${c}${s}${u}${f}`,
		YMD: `${u}${s}${l}${s}${c}${f}`
	}[r] ?? a.format(t);
}
function it(e, t = /* @__PURE__ */ new Date()) {
	let n = new Date(t);
	return n.setHours(0, 0, 0, 0), e < n ? n : e;
}
function at(e) {
	if (e.includes("T")) return new Date(e);
	let [t, n, r] = e.split("-").map(Number);
	return new Date(t, n - 1, r);
}
function ot(e, t = "", n = "", r = "", i = "") {
	return e ? n >= t : `${n}T${i}` > `${t}T${r}`;
}
var G, K, q, st = t((() => {
	G = (e) => `${e}`.padStart(2, "0"), K = (e) => `${e.getFullYear()}-${G(e.getMonth() + 1)}-${G(e.getDate())}`, q = (e) => `${G(e.getHours())}:${G(e.getMinutes())}`;
}));
//#endregion
//#region src/calendar.ts
function ct(e, t) {
	return Object.keys(e.states).filter((e) => e.startsWith("calendar.") && !t.exclude_entities?.includes(e));
}
function lt(e, t, n, r) {
	return !t.read_only_calendars?.includes(n) && ((e.states[n]?.attributes?.supported_features ?? 0) & r) !== 0;
}
function ut(e, t, n, r, i) {
	if (t === void 0) return ft(H(e, "loading"), "mdi:calendar-clock", "var(--primary-color, #03a9f4)");
	if (t.length === 0) return ft(H(e, "no_events"), "mdi:calendar-remove", "var(--disabled-text-color, #bdbdbb)");
	if (!n.unfold_events) {
		let r = t.slice(1).filter((e) => !e.is_empty).length, a = t.some((e) => !e.is_empty) ? i : void 0;
		return O`
      <div class="calendar-container">
        ${pt(e, t[0], n, a, { moreText: r > 0 ? ` ${H(e, "more_events", "{x}", r.toString())}` : "" })}
      </div>
    `;
	}
	return O`
    <div class="calendar-container">
      ${dt(e, t, n, r, i)}
    </div>
  `;
}
function dt(e, t, n, r, i) {
	let a = i ? "" : "detail", o = (e) => n.show_divider && e > 0 ? O`<div class="calendar-divider"></div>` : A;
	if (n.group_by_date_and_calendar || n.group_by_date) return yt(t, !!n.group_by_date_and_calendar).map((t, i) => {
		let s = t.events[0];
		return O`
          ${o(i)}
          <div
            class="calendar-item grouped ${a}"
            style=${kt(s.entity_id, n)}
          >
            <div class="calendar-icon dynamic">
              ${bt(e, t.date, gt(s.entity_id, n), n.dark_mode, n.icon_show_weekday)}
            </div>
            <div class="calendar-content">
              ${t.events.map((t) => O`
                  <div
                    class="event-entry ${t.is_empty ? "empty static" : ""}"
                    @click=${t.is_empty ? null : () => r(t)}
                  >
                    ${mt(e, t, n, !1)}
                  </div>
                `)}
            </div>
          </div>
        `;
	});
	let s = i && n.max_lines || 0, c = s > 0 ? t.slice(0, s) : t, l = t.slice(c.length).filter((e) => !e.is_empty).length;
	return c.map((t, s) => {
		let u = l > 0 && s === c.length - 1;
		return O`
      ${o(s)}
      ${pt(e, t, n, u ? i : t.is_empty ? void 0 : () => r(t), {
			cls: a,
			progress: !!i,
			badge: u ? l : 0
		})}
    `;
	});
}
function ft(e, t, n) {
	return O`
    <div class="calendar-container">
      <div class="calendar-item" style="cursor: default;">
        <div class="calendar-icon" style="background-color: ${n};">
          <ha-icon icon=${t}></ha-icon>
        </div>
        <div class="calendar-content">
          <div class="event-title">${e}</div>
        </div>
      </div>
    </div>
  `;
}
function pt(e, t, n, r, i) {
	let a = J(t), o = Ct(t);
	if (isNaN(a.getTime()) || isNaN(o.getTime())) return O`<div class="error">Date Error for ${t.summary}</div>`;
	let s = /* @__PURE__ */ new Date(), c = a <= s && o >= s, l = -1;
	if (i.progress && !t.is_empty && t.start.dateTime && c) {
		let e = o.getTime() - a.getTime();
		e > 0 && (l = Math.min(100, (s.getTime() - a.getTime()) / e * 100));
	}
	return O`
    <div
      class="calendar-item ${i.cls ?? ""} ${t.is_empty ? "empty" : ""} ${r ? "" : "static"}"
      style=${kt(t.entity_id, n)}
      title=${i.badge ? H(e, "popup_upcoming_events") : Dt(e, t, n)}
      @click=${r}
    >
      <div class="calendar-icon dynamic">
        ${bt(e, c ? s : a, gt(t.entity_id, n), n.dark_mode, n.icon_show_weekday)}
      </div>
      <div class="calendar-content">
        ${mt(e, t, n, !0, i.moreText, i.badge)}
        ${l >= 0 ? O`
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${l}%"></div>
              </div>
            ` : A}
      </div>
    </div>
  `;
}
function mt(e, t, n, r, i = "", a = 0) {
	let o = O`<div class="event-title">
    ${Dt(e, t, n)}
  </div>`;
	return O`
    ${a ? O`<div class="title-row">
          ${o}
          <span class="more-indicator">
            <ha-icon icon="mdi:dots-horizontal"></ha-icon>(${a})
          </span>
        </div>` : o}
    <div class="event-time">
      ${!t.is_empty && (n.show_date || n.show_time) ? O`<ha-icon icon="mdi:clock-time-four-outline"></ha-icon>` : A}
      ${ht(e, t, n, r)}${i}
    </div>
    ${!t.is_empty && n.show_location && t.location ? O`
          <div class="event-location">
            <ha-icon icon="mdi:map-marker"></ha-icon>
            ${t.location}
          </div>
        ` : A}
    ${n.show_calendar_name && t.calendar_name ? O`
          <div class="event-calendar">
            <ha-icon icon="mdi:calendar-blank-multiple"></ha-icon>
            ${t.calendar_name}
          </div>
        ` : A}
  `;
}
function ht(e, t, n, r) {
	if (t.is_empty) return "";
	let i = J(t), a = Ct(t), o = !t.start.dateTime, s = /* @__PURE__ */ new Date(), c;
	if (n.show_date || n.show_time) {
		let t = [];
		n.show_date && t.push(rt(e, i)), n.show_time && t.push(o ? Ot(e) : `${nt(e, i)} - ${nt(e, a)}`), c = t.join(", ");
	} else c = r && i > s ? St(e, Math.ceil((i.getTime() - s.getTime()) / 6e4)) : o ? Ot(e) : nt(e, i);
	if (n.show_duration) {
		let t = xt(e, i, a, o);
		c.endsWith(t) || (c += ` • ${t}`);
	}
	if (n.show_weekday) {
		let t = n.show_weekday_long ? "long" : "short", r = i.toLocaleDateString(W(e), n.icon_show_weekday ? { month: t } : { weekday: t });
		c.includes(r) || (c += ` • ${r}`);
	}
	return c;
}
function gt(e, t) {
	return vt(t?.calendar_colors?.[e] || t?.calendar_icon_color || "#fa3e3e");
}
function _t(e, t) {
	let n = t?.calendar_background_colors?.[e] || t?.background_color || "";
	return n ? vt(n) : "";
}
function vt(e) {
	return e.startsWith("#") || e.startsWith("rgb") || e.startsWith("hsl") || e.startsWith("var") ? e : `var(--${e}-color)`;
}
function yt(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = wt(r), i = t ? r.calendar_name || r.entity_id : "", a = `${K(e)}|${i}`;
		n.has(a) || n.set(a, {
			date: e,
			calendar: i,
			events: []
		}), n.get(a).events.push(r);
	}
	return [...n.values()].sort((e, t) => e.date.getTime() - t.date.getTime() || e.calendar.localeCompare(t.calendar));
}
function bt(e, t, n, r = !1, i = !1) {
	let a = t.toLocaleDateString(W(e), i ? { weekday: "short" } : { month: "short" }).toUpperCase(), o = t.getDate();
	return O`
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
        fill="${r ? "#222222" : "white"}"
      ></rect>
      <path
        d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z"
        fill="${n}"
      ></path>
      <text
        x="50"
        y="23"
        font-family="sans-serif"
        font-size="22"
        font-weight="bold"
        fill="${r ? "#222222" : "white"}"
        text-anchor="middle"
      >
        ${a}
      </text>
      <text
        x="50"
        y="82"
        font-family="sans-serif"
        font-size="52"
        font-weight="bold"
        fill="${r ? "white" : "#333"}"
        text-anchor="middle"
      >
        ${o}
      </text>
    </svg>
  `;
}
function xt(e, t, n, r) {
	let i = Math.round((n.getTime() - t.getTime()) / 6e4);
	if (r && (i = Math.round(i / 1440) * 1440), r && i === 1440) return Ot(e);
	if (i < 60) return `${i} ${H(e, "duration_min")}`;
	let a = Math.floor(i / 1440), o = Math.floor(i % 1440 / 60), s = i % 60, c = [];
	return a >= 1 && c.push(`${a} ${H(e, a === 1 ? "duration_day" : "duration_days")}`), o > 0 && c.push(`${o} ${H(e, "duration_hour")}`), s > 0 && c.push(`${s} ${H(e, "duration_min")}`), c.join(" ");
}
function St(e, t) {
	let n = (t, n) => H(e, n === 1 ? t : `${t}s`, "{x}", n.toString());
	return t < 60 ? n("starts_in_min", t) : t < 1440 ? n("starts_in_hour", Math.round(t / 60)) : t < 43200 ? n("starts_in_day", Math.round(t / 1440)) : n("starts_in_week", Math.round(t / 10080));
}
var J, Ct, wt, Tt, Et, Dt, Ot, kt, At = t((() => {
	L(), et(), st(), J = (e) => at(e.start.dateTime || e.start.date), Ct = (e) => at(e.end.dateTime || e.end.date), wt = (e) => it(J(e)), Tt = f`
  .empty {
    opacity: 0.7;
  }
  .static {
    cursor: default;
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
  .calendar-item.grouped .calendar-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .calendar-item.grouped .event-entry {
    display: flex;
    flex-direction: column;
    margin-bottom: 4px;
  }
  .calendar-item.grouped .calendar-icon {
    align-self: center;
  }
`, Et = (e, t, n) => !!n.uid && lt(e, t, n.entity_id, 6), Dt = (e, t, n) => t.is_empty ? n.empty_text || H(e, "empty") : t.summary, Ot = (e) => e.localize("component.calendar.entity_component._.state_attributes.all_day.name") || "All day", kt = (e, t) => {
		let n = _t(e, t);
		return n ? `background-color: ${n}; border-color: transparent;` : "";
	};
}));
//#endregion
//#region src/events.ts
function jt(e, t) {
	let n = /* @__PURE__ */ new Date();
	n.setHours(n.getHours() + 1, 0, 0, 0);
	let r = new Date(n);
	return r.setHours(r.getHours() + 1, 0, 0, 0), {
		calendar_id: zt(e, t)[0],
		name: "",
		start_date: K(n),
		start_time: q(n),
		end_date: K(r),
		end_time: q(r),
		location: "",
		description: "",
		recurrence: "none",
		all_day: !1
	};
}
function Mt(e) {
	let t = J(e), n = Ct(e), r = !e.start.dateTime;
	return r && n.setDate(n.getDate() - 1), {
		calendar_id: e.entity_id,
		name: e.summary,
		start_date: K(t),
		start_time: q(t),
		end_date: K(n < t ? t : n),
		end_time: q(n),
		all_day: r,
		location: e.location ?? "",
		description: e.description ?? "",
		recurrence: "none",
		uid: e.uid,
		recurrence_id: e.recurrence_id,
		rrule: e.rrule
	};
}
async function Nt(e, t) {
	if (!t.calendar_id || !t.name || !t.start_date || !t.end_date) throw Error("Title, calendar, start and end date are required");
	if (!ot(!!t.all_day, t.start_date, t.end_date, t.start_time, t.end_time)) throw Error("End must be after start");
	let n = { summary: t.name };
	t.location && (n.location = t.location), t.description && (n.description = t.description);
	let r, i;
	if (t.all_day) {
		let e = at(t.end_date);
		e.setDate(e.getDate() + 1), r = t.start_date, i = K(e);
	} else r = (/* @__PURE__ */ new Date(`${t.start_date}T${t.start_time || "09:00"}`)).toISOString(), i = (/* @__PURE__ */ new Date(`${t.end_date}T${t.end_time || "10:00"}`)).toISOString();
	let a = !Bt(t) && Rt.includes(t.recurrence ?? "") ? `FREQ=${t.recurrence}` : void 0;
	t.uid ? await e.callWS({
		type: "calendar/event/update",
		entity_id: t.calendar_id,
		uid: t.uid,
		...t.recurrence_id ? { recurrence_id: t.recurrence_id } : {},
		event: {
			...n,
			dtstart: r,
			dtend: i,
			...a ? { rrule: a } : {}
		}
	}) : await e.callService("calendar", "create_event", {
		entity_id: t.calendar_id,
		...n,
		...t.all_day ? {
			start_date: r,
			end_date: i
		} : {
			start_date_time: r,
			end_date_time: i
		},
		...a ? { rrule: a } : {}
	});
}
function Pt(e, t, n = !1) {
	return e.callWS({
		type: "calendar/event/delete",
		entity_id: t.calendar_id,
		uid: t.uid,
		...t.recurrence_id ? { recurrence_id: t.recurrence_id } : {},
		...n ? { recurrence_range: "THISANDFUTURE" } : {}
	});
}
function Ft(e, t, n) {
	let [r, i] = t.split(":").map(Number), a = tt(e), o = (e) => a ? `${e % 12 || 12} ${e < 12 ? "AM" : "PM"}` : Y(e), s = (e, t, n) => Array.from({ length: e }, (e, r) => O`<option value=${r} ?selected=${r === t}>${n(r)}</option>`);
	return O`
    <select
      class="field-input"
      @change=${(e) => n(`${Y(+e.target.value)}:${Y(i)}`)}
    >
      ${s(24, r, o)}
    </select>
    <select
      class="field-input"
      @change=${(e) => n(`${Y(r)}:${Y(+e.target.value)}`)}
    >
      ${s(60, i, Y)}
    </select>
  `;
}
function It(e, t) {
	let n = {
		...e,
		...t
	};
	if (!("start_date" in t || "start_time" in t) || !n.start_date || ot(!!n.all_day, n.start_date, n.end_date, n.start_time, n.end_time)) return t;
	if (n.all_day) return {
		...t,
		end_date: n.start_date
	};
	let r = /* @__PURE__ */ new Date(`${n.start_date}T${n.start_time || "09:00"}`);
	return r.setHours(r.getHours() + 1), {
		...t,
		end_date: K(r),
		end_time: q(r)
	};
}
function Lt(e, t, n, r, i, a, o) {
	let s = !!n.uid, c = s ? [n.calendar_id] : zt(e, t), l = !s || lt(e, t, n.calendar_id, 4), u = s && lt(e, t, n.calendar_id, 2), d = n.all_day || !1, f = (t, n) => e.localize(`ui.components.calendar.event.${t}`) || n;
	return O`
    <div class="add-event-form">
      <div class="field">
        <label class="field-label">${f("summary", "Title")}</label>
        <input
          type="text"
          class="field-input"
          .value=${n.name || ""}
          @input=${(e) => r({ name: e.target.value })}
        />
      </div>

      <div class="field">
        <label class="field-label">${f("location", "Location")}</label>
        <input
          type="text"
          class="field-input"
          .value=${n.location || ""}
          @input=${(e) => r({ location: e.target.value })}
        />
      </div>

      <div class="field">
        <label class="field-label">${f("description", "Description")}</label>
        <input
          type="text"
          class="field-input"
          .value=${n.description || ""}
          @input=${(e) => r({ description: e.target.value })}
        />
      </div>

      <div class="field">
        <label class="field-label"
          >${e.localize("ui.components.calendar.my_calendars") || "Calendar"}</label
        >
        <select
          class="field-input"
          ?disabled=${s}
          .value=${n.calendar_id || ""}
          @change=${(e) => r({ calendar_id: e.target.value })}
        >
          ${c.length === 0 ? O`<option value="">
                -- ${e.localize("ui.common.none") || "no calendars"} --
              </option>` : c.map((t) => O`
                  <option value=${t} ?selected=${t === n.calendar_id}>
                    ${e.states[t]?.attributes?.friendly_name || t}
                  </option>
                `)}
        </select>
      </div>

      <div class="row-flex">
        <ha-formfield .label=${f("all_day", "All Day")}>
          <ha-switch
            .checked=${d}
            @change=${(e) => r({ all_day: e.target.checked })}
          ></ha-switch>
        </ha-formfield>
      </div>

      ${["start", "end"].map((t) => O`
          <div class="field">
            <label class="field-label"
              >${f(t, t === "start" ? "Start" : "End")}</label
            >
            <div class="date-row">
              <input
                type="date"
                class="field-input"
                .value=${n[`${t}_date`] || ""}
                @change=${(e) => r(It(n, { [`${t}_date`]: e.target.value }))}
              />
              ${d ? A : O`
                    ${Ft(e, n[`${t}_time`] || (t === "start" ? "09:00" : "10:00"), (e) => r(It(n, { [`${t}_time`]: e })))}
                  `}
            </div>
          </div>
        `)}
      ${Bt(n) ? A : O`
            <div class="field">
              <label class="field-label"
                >${f("repeat.label", "Repeat")}</label
              >
              <select
                class="field-input"
                .value=${n.recurrence || "none"}
                @change=${(e) => r({ recurrence: e.target.value })}
              >
                ${["none", ...Rt].map((e) => O`
                    <option value=${e} ?selected=${e === (n.recurrence || "none")}>
                      ${f(`repeat.freq.${e.toLowerCase()}`, e.charAt(0) + e.slice(1).toLowerCase())}
                    </option>
                  `)}
              </select>
            </div>
          `}

      <div class="dialog-actions">
        ${u ? Bt(n) ? O`
                <ha-button class="delete" @click=${() => o(!1)}>
                  ${f("confirm_delete.delete_this", "Delete only this event")}
                </ha-button>
                <ha-button class="delete" @click=${() => o(!0)}>
                  ${f("confirm_delete.delete_future", "Delete all future events")}
                </ha-button>
              ` : O`
                <ha-button class="delete" @click=${() => o(!1)}>
                  ${e.localize("ui.common.delete") || "Delete"}
                </ha-button>
              ` : A}
        <span class="spacer"></span>
        <ha-button @click=${i}>
          ${e.localize("ui.common.cancel") || "Cancel"}
        </ha-button>
        ${l ? O`
              <ha-button
                unelevated
                @click=${a}
                ?disabled=${!n.name || !n.calendar_id || !ot(!!n.all_day, n.start_date, n.end_date, n.start_time, n.end_time)}
              >
                ${e.localize("ui.common.save") || "Save"}
              </ha-button>
            ` : A}
      </div>
    </div>
  `;
}
var Rt, zt, Bt, Y, Vt = t((() => {
	L(), At(), st(), Rt = [
		"DAILY",
		"WEEKLY",
		"MONTHLY",
		"YEARLY"
	], zt = (e, t) => ct(e, t).filter((n) => lt(e, t, n, 1)), Bt = (e) => !!(e.rrule || e.recurrence_id), Y = (e) => String(e).padStart(2, "0");
}));
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/decorate.js
function X(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
var Ht = t((() => {})), Ut = /* @__PURE__ */ n({ CalendarCardPlusPopup: () => Z }), Z, Wt = t((() => {
	L(), Qe(), $e(), Vt(), At(), Ht(), Z = class extends I {
		constructor(...e) {
			super(...e), this.open = !1, this.mode = "detail", this.detailTitle = "", this.detailEvents = [], this._formState = {}, this._opener = null, this._onEventSaved = null, this._onPopState = (e) => {
				this.open && !window.history.state?.calendarCardPlusPopup && this._close();
			}, this._close = () => {
				if (!this.open) return;
				this.open = !1;
				let e = { dialog: this };
				for (let t of [
					"closed",
					"dialog-closed",
					"popup-closed"
				]) this.dispatchEvent(new CustomEvent(t, {
					bubbles: !0,
					composed: !0,
					detail: e
				}));
			}, this._onDialogClosed = (e) => {
				let t = e.target;
				t && t.tagName !== "HA-ADAPTIVE-DIALOG" && t.tagName !== "HA-DIALOG" || this._closeDialog();
			}, this._closeDialog = () => {
				this.open && (this._close(), window.history.state?.calendarCardPlusPopup && window.history.back());
			}, this._updateFormState = (e) => {
				this._formState = {
					...this._formState,
					...e
				};
			}, this._handleSave = () => this._run(() => Nt(this.hass, this._formState)), this._handleDelete = (e) => {
				let t = this.hass.localize("ui.components.calendar.event.confirm_delete.prompt") || "Do you want to delete this event?";
				window.confirm(t) && this._run(() => Pt(this.hass, this._formState, e));
			}, this._openEvent = (e) => {
				Et(this.hass, this.config, e) ? (this._formState = Mt(e), this.mode = "edit-event") : V(this._opener ?? window, "hass-more-info", { entityId: e.entity_id });
			};
		}
		async showDialog(e) {
			this.hass = e.hass, this.config = e.config, this._opener = e.opener, this.mode = e.mode, e.title && (this.detailTitle = e.title), e.events && (this.detailEvents = e.events), e.formState && (this._formState = e.formState), e.onEventSaved && (this._onEventSaved = e.onEventSaved), this.open = !0, window.history.pushState({ calendarCardPlusPopup: !0 }, ""), await this.updateComplete;
			let t = this.renderRoot.querySelector("ha-adaptive-dialog");
			if (t && t.shadowRoot) {
				let e = t.shadowRoot.querySelector("ha-bottom-sheet");
				e && (e.style.removeProperty("--dialog-transform"), e.style.removeProperty("--dialog-transition"));
			}
		}
		connectedCallback() {
			super.connectedCallback(), window.addEventListener("popstate", this._onPopState);
		}
		disconnectedCallback() {
			super.disconnectedCallback(), window.removeEventListener("popstate", this._onPopState);
		}
		async _run(e) {
			try {
				await e(), this.dispatchEvent(new CustomEvent("event-saved", {
					bubbles: !0,
					composed: !0
				})), this._onEventSaved?.(), this._closeDialog();
			} catch (e) {
				this.hass.callService("persistent_notification", "create", {
					title: "Calendar Card Plus",
					message: "Error saving event: " + (e?.message ?? e)
				});
			}
		}
		render() {
			let e = this.mode !== "detail", t = this.mode === "add-event" ? this.hass?.localize("ui.components.calendar.event.add") || "Add Event" : this.mode === "edit-event" ? this.hass?.localize("ui.components.calendar.event.edit") || "Edit Event" : this.detailTitle;
			return O`
      <ha-adaptive-dialog
        .hass=${this.hass}
        .open=${this.open}
        .headerTitle=${t}
        @closed=${this._onDialogClosed}
        @ha-dialog-closed=${this._onDialogClosed}
        flexcontent
      >
        <div
          class="dialog-content scrollable ha-scrollbar ${this.config?.show_divider && !e ? "plain" : ""}"
        >
          ${e ? Lt(this.hass, this.config, this._formState, this._updateFormState, this._closeDialog, this._handleSave, this._handleDelete) : dt(this.hass, this.detailEvents, this.config, this._openEvent)}
        </div>
      </ha-adaptive-dialog>
    `;
		}
		static {
			this.styles = [Tt, f`
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

    .dialog-content {
      padding: 0 8px 8px 8px;
      min-width: 320px;
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

    /* "show divider": plain rows separated by lines, same as in the card */
    .plain .calendar-item.detail {
      background-color: transparent;
      border-color: transparent;
      box-shadow: none;
      margin-bottom: 0;
    }
    .plain .calendar-item.detail:hover {
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

    .add-event-form select.field-input:disabled {
      cursor: default;
      opacity: 0.7;
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
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .dialog-actions .spacer {
      flex: 1;
    }

    .dialog-actions .delete {
      --ha-button-theme-color: var(--error-color, #db4437);
      --mdc-theme-primary: var(--error-color, #db4437);
      color: var(--error-color, #db4437);
    }
  `];
		}
	}, X([z({ attribute: !1 })], Z.prototype, "hass", void 0), X([z({ attribute: !1 })], Z.prototype, "config", void 0), X([z({ type: Boolean })], Z.prototype, "open", void 0), X([z({ type: String })], Z.prototype, "mode", void 0), X([z({ type: String })], Z.prototype, "detailTitle", void 0), X([z({ type: Array })], Z.prototype, "detailEvents", void 0), X([B()], Z.prototype, "_formState", void 0), Z = X([R("calendar-card-plus-popup")], Z);
})), Gt = /* @__PURE__ */ n({ CalendarCardPlusEditor: () => Q }), Q, Kt = t((() => {
	L(), Qe(), $e(), et(), At(), Ht(), Q = class extends I {
		constructor(...e) {
			super(...e), this._config = { type: "custom:calendar-card-plus" }, this._showAllCalendars = !1;
		}
		set config(e) {
			this.setConfig(e);
		}
		setConfig(e) {
			this._config = e;
		}
		_renderPeriod(e, t, n, r, i) {
			let a = (e, t, n, r, i) => O`
      <ha-selector
        .hass=${this.hass}
        .selector=${{ number: {
				min: 0,
				max: t,
				mode: "box"
			} }}
        .value=${this._config[e] ?? n}
        .label=${this.hass?.localize(`component.input_datetime.entity_component._.state_attributes.${r}.name`) || i}
        .configValue=${e}
        @value-changed=${this._valueChanged}
      ></ha-selector>
    `;
			return O`
      <div class="settings-row full-width" style="margin-bottom: 8px;">
        <span class="label" style="margin-bottom: 8px;">${e}</span>
        <div class="period-selectors">
          ${a(t, 365, i, "day", "Days")}
          ${a(n, 23, 0, "hour", "Hours")}
          ${a(r, 59, 0, "minute", "Minutes")}
        </div>
      </div>
    `;
		}
		render() {
			if (!this.hass) return O``;
			let e = this._config.upcoming_events ?? !1, t = this._config.unfold_events ?? !1, n = this._config.exclude_entities ?? [];
			return O`
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
            ${H(this.hass, "editor_configuration")}
          </div>
          <div
            class="settings-grid"
            style="margin-top: 16px; margin-bottom: 16px;"
          >
            <div class="settings-row">
              <span class="label"
                >${H(this.hass, "editor_unfold_events")}</span
              >
              <ha-switch
                .checked=${t}
                @change=${(e) => this._toggleBooleanConfig(e, "unfold_events")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${H(this.hass, "editor_show_divider")}</span
              >
              <ha-switch
                .checked=${this._config.show_divider ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "show_divider")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${H(this.hass, "editor_show_add_event")}</span
              >
              <ha-switch
                .checked=${this._config.show_add_event ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "show_add_event")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label">${H(this.hass, "group_by_date")}</span>
              <ha-switch
                .checked=${this._config.group_by_date ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "group_by_date")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${H(this.hass, "group_by_date_and_calendar")}</span
              >
              <ha-switch
                .checked=${this._config.group_by_date_and_calendar ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "group_by_date_and_calendar")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label">Dark Mode</span>
              <ha-switch
                .checked=${this._config.dark_mode ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "dark_mode")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${H(this.hass, "editor_show_upcoming")}</span
              >
              <ha-switch
                .checked=${e}
                @change=${(e) => this._toggleBooleanConfig(e, "upcoming_events")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${H(this.hass, "editor_show_empty_days")}</span
              >
              <ha-switch
                .checked=${this._config.show_empty_days ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "show_empty_days")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${H(this.hass, "editor_hide_if_no_events")}</span
              >
              <ha-switch
                .checked=${this._config.hide_if_no_events ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "hide_if_no_events")}
              ></ha-switch>
            </div>
          </div>

          ${this._config.hide_if_no_events ? this._renderPeriod(H(this.hass, "editor_hide_period"), "hide_days", "hide_hours", "hide_minutes", 0) : ""}

          ${this._config.show_empty_days ? O`
                <div
                  class="settings-row full-width"
                  style="margin-bottom: 16px;"
                >
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ text: {} }}
                    .value=${this._config.empty_text || ""}
                    .label=${H(this.hass, "editor_empty_text")}
                    .placeholder=${H(this.hass, "empty")}
                    .configValue=${"empty_text"}
                    @value-changed=${this._valueChanged}
                  ></ha-selector>
                </div>
              ` : ""}

          ${t ? O`
                <div
                  class="settings-row full-width"
                  style="margin-bottom: 16px;"
                >
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ number: {
				min: 0,
				max: 20,
				mode: "box"
			} }}
                    .value=${this._config.max_lines || 0}
                    .label=${H(this.hass, "editor_max_lines")}
                    .configValue=${"max_lines"}
                    @value-changed=${this._valueChanged}
                  ></ha-selector>
                </div>
              ` : ""}
          ${e ? this._renderPeriod(this.hass?.localize("ui.panel.lovelace.editor.card.statistic.period") || "Period", "days", "hours", "minutes", 1) : ""}

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
              .label=${H(this.hass, "editor_background_color")}
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
            ${H(this.hass, "editor_text_visibility")}
          </div>
          <div
            class="settings-grid"
            style="margin-top: 16px; margin-bottom: 16px;"
          >
            <div class="settings-row">
              <span class="label"
                >${this.hass?.localize("ui.common.show")}
                ${this.hass?.localize("component.calendar.entity_component._.name")}
                ${this.hass?.localize("ui.common.name")}</span
              >
              <ha-switch
                .checked=${this._config.show_calendar_name ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "show_calendar_name")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${this.hass?.localize("ui.common.show")}
                ${this.hass?.localize("ui.dialogs.helper_settings.input_datetime.date") || "Date"}</span
              >
              <ha-switch
                .checked=${this._config.show_date ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "show_date")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${H(this.hass, "editor_show_location")}</span
              >
              <ha-switch
                .checked=${this._config.show_location ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "show_location")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${H(this.hass, "editor_show_duration")}</span
              >
              <ha-switch
                .checked=${this._config.show_duration ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "show_duration")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${H(this.hass, "editor_show_time")}</span
              >
              <ha-switch
                .checked=${this._config.show_time ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "show_time")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${H(this.hass, "editor_icon_show_weekday")}</span
              >
              <ha-switch
                .checked=${this._config.icon_show_weekday ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "icon_show_weekday")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${this._config.icon_show_weekday ? H(this.hass, "editor_show_month") : H(this.hass, "editor_show_weekday")}</span
              >
              <ha-switch
                .checked=${this._config.show_weekday ?? !1}
                @change=${(e) => this._toggleBooleanConfig(e, "show_weekday")}
              ></ha-switch>
            </div>
            ${this._config.show_weekday ? O`
                  <div class="settings-row">
                    <span
                      class="label"
                      style="color: var(--secondary-text-color);"
                      >${this._config.icon_show_weekday ? H(this.hass, "editor_show_month_long") : H(this.hass, "editor_show_weekday_long")}</span
                    >
                    <ha-switch
                      .checked=${this._config.show_weekday_long ?? !1}
                      @change=${(e) => this._toggleBooleanConfig(e, "show_weekday_long")}
                    ></ha-switch>
                  </div>
                  <div></div>
                ` : ""}
          </div>
        </ha-expansion-panel>

        <h4>
          ${this.hass?.localize("ui.components.calendar.my_calendars") || "Calendars"}
        </h4>
        <div class="entities-list">
          ${(() => {
				let e = this._getCalendarEntities(), t = this._showAllCalendars ? e : e.slice(0, 3), r = e.length > 3;
				return O`
              ${t.map((e) => {
					let t = !n.includes(e.entity_id), r = this._config.calendar_colors?.[e.entity_id] || "", i = !!((e.attributes.supported_features ?? 0) & 7);
					return O`
                  <div class="entity-row ${t ? "" : "disabled"}">
                    <div class="entity-row-top">
                      <div
                        class="entity-icon dynamic"
                        style="background: transparent;"
                      >
                        ${bt(this.hass, /* @__PURE__ */ new Date(), gt(e.entity_id, this._config), this._config.dark_mode ?? !1, this._config.icon_show_weekday ?? !1)}
                      </div>
                      <div class="entity-info">
                        <span class="entity-name"
                          >${e.attributes.friendly_name || e.entity_id}</span
                        >
                        <span class="entity-id">${e.entity_id}</span>
                      </div>
                      <ha-button
                        size="small"
                        appearance="filled"
                        variant="brand"
                        class="${t ? "action-hide" : "action-show"}"
                        @click=${(t) => this._toggleListEntry(t, "exclude_entities", e.entity_id)}
                      >
                        ${t ? this.hass?.localize("ui.common.hide") || "Hide" : this.hass?.localize("ui.common.show") || "Show"}
                      </ha-button>
                    </div>
                    <div class="settings-row">
                      <span class="label"
                        >${H(this.hass, "editor_read_only")}</span
                      >
                      <ha-switch
                        .checked=${!i || (this._config.read_only_calendars ?? []).includes(e.entity_id)}
                        .disabled=${!i}
                        @change=${(t) => this._toggleListEntry(t, "read_only_calendars", e.entity_id)}
                      ></ha-switch>
                    </div>
                    <div class="entity-row-bottom">
                      <ha-selector
                        .hass=${this.hass}
                        .selector=${{ ui_color: {} }}
                        .value=${r}
                        .label=${this.hass?.localize("ui.panel.lovelace.editor.card.tile.color") || "Color"}
                        @value-changed=${(t) => this._mapValueChanged(t, "calendar_colors", e.entity_id)}
                      ></ha-selector>
                      <ha-selector
                        .hass=${this.hass}
                        .selector=${{ ui_color: {} }}
                        .value=${this._config.calendar_background_colors?.[e.entity_id] || ""}
                        .label=${H(this.hass, "editor_background_color")}
                        @value-changed=${(t) => this._mapValueChanged(t, "calendar_background_colors", e.entity_id)}
                      ></ha-selector>
                    </div>
                  </div>
                `;
				})}
              ${r ? O`
                    <div class="show-more-row">
                      <ha-button
                        @click=${() => {
					this._showAllCalendars = !this._showAllCalendars;
				}}
                      >
                        ${this._showAllCalendars ? H(this.hass, "editor_show_less") : H(this.hass, "editor_show_more")}
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
			return this.hass ? Object.keys(this.hass.states).filter((e) => e.startsWith("calendar.")).map((e) => this.hass?.states[e]) : [];
		}
		_setConfig(e) {
			this._config = e, V(this, "config-changed", { config: this._config });
		}
		_toggleListEntry(e, t, n) {
			e.stopPropagation();
			let r = this._config[t] ?? [];
			this._setConfig({
				...this._config,
				[t]: r.includes(n) ? r.filter((e) => e !== n) : [...r, n]
			});
		}
		_toggleBooleanConfig(e, t) {
			this._setConfig({
				...this._config,
				[t]: e.target.checked
			});
		}
		_valueChanged(e) {
			if (!this._config || !this.hass) return;
			let t = e.target.configValue;
			if (!t) return;
			let n = e.detail?.value;
			if (this._config[t] === n) return;
			let r = { ...this._config };
			n == null || n === "" ? delete r[t] : r[t] = n, this._setConfig(r);
		}
		_mapValueChanged(e, t, n) {
			let r = e.detail.value, i = { ...this._config[t] || {} };
			r == null || r === "" ? delete i[n] : i[n] = r;
			let a = {
				...this._config,
				[t]: i
			};
			Object.keys(i).length === 0 && delete a[t], this._setConfig(a);
		}
		static get styles() {
			return f`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
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
        min-width: 0;
        display: flex;
        flex-direction: column;
      }
      .entity-name {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .entity-id {
        font-size: 0.85em;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .entity-row-top ha-button {
        flex-shrink: 0;
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
    `;
		}
	}, X([z({ attribute: !1 })], Q.prototype, "hass", void 0), X([B()], Q.prototype, "_config", void 0), X([B()], Q.prototype, "_showAllCalendars", void 0), Q = X([R("calendar-card-plus-editor")], Q);
}));
L(), Qe(), $e(), At(), et(), st(), Vt(), Wt(), Ht();
var qt = 3e5, $ = class extends I {
	constructor(...e) {
		super(...e), this._events = void 0, this._lastFetch = 0, this._hidden = !1, this.preview = !1, this._showAll = () => {
			this._showPopup({
				mode: "detail",
				title: H(this.hass, "popup_upcoming_events"),
				events: this._events
			});
		}, this._openEvent = (e) => {
			Et(this.hass, this.config, e) ? this._showPopup({
				mode: "edit-event",
				formState: Mt(e)
			}) : V(this, "hass-more-info", { entityId: e.entity_id });
		}, this._openAddEventPopup = () => {
			this._showPopup({
				mode: "add-event",
				formState: jt(this.hass, this.config)
			});
		}, this._onEventSaved = () => {
			this._events = void 0, this._fetchEvents();
		};
	}
	updated(e) {
		super.updated(e);
		let t = this._hidden && !this.preview;
		t !== this.hidden && (this.hidden = t, V(this, "card-visibility-changed", { value: !t }));
	}
	willUpdate(e) {
		super.willUpdate(e), this.hass && this.config && (e.has("config") || Date.now() - this._lastFetch > qt) && this._fetchEvents();
	}
	setConfig(e) {
		if (!e) throw Error("Invalid configuration");
		this.config = e;
	}
	async _fetchEvents() {
		this._lastFetch = Date.now();
		let e = /* @__PURE__ */ new Date(), t;
		if (this.config.upcoming_events) {
			let n = 1440;
			this.config.days !== void 0 || this.config.hours !== void 0 || this.config.minutes !== void 0 ? n = (this.config.days || 0) * 1440 + (this.config.hours || 0) * 60 + (this.config.minutes || 0) : this.config.max_minutes_until_start !== void 0 && (n = this.config.max_minutes_until_start), t = new Date(e.getTime() + n * 6e4);
		} else t = new Date(e), t.setHours(23, 59, 59, 999);
		let n = this.config, r;
		n.hide_if_no_events && (n.hide_days || n.hide_hours || n.hide_minutes ? r = new Date(e.getTime() + ((n.hide_days || 0) * 1440 + (n.hide_hours || 0) * 60 + (n.hide_minutes || 0)) * 6e4) : (r = new Date(e), r.setHours(23, 59, 59, 999)));
		let i = ct(this.hass, this.config);
		if (i.length === 0) {
			this._events = [], this._hidden = !!r;
			return;
		}
		let o = r && r > t ? r : t, s = await a(this.hass, e, o, i);
		this._hidden = !!r && !s.some((e) => J(e) <= r), s = s.filter((e) => J(e) <= t), this.config.show_empty_days && (s = s.concat(this._emptyDays(s, e, t))), this._events = s.sort((e, t) => J(e).getTime() - J(t).getTime());
	}
	_emptyDays(e, t, n) {
		let r = new Set(e.map((e) => K(wt(e)))), i = [], a = new Date(t);
		for (a.setHours(0, 0, 0, 0); a <= n;) {
			let e = K(a);
			r.has(e) || i.push({
				start: { date: e },
				end: { date: e },
				summary: "empty",
				is_empty: !0,
				entity_id: "empty",
				calendar_name: ""
			}), a.setDate(a.getDate() + 1);
		}
		return i;
	}
	render() {
		if (!this.config || !this.hass) return O``;
		let e = this.config.show_add_event && zt(this.hass, this.config).length > 0;
		return O`
      <ha-card
        class=${!this.config.unfold_events || this.config.show_divider ? "plain" : ""}
      >
        ${e ? O`
              <div class="add-event-btn" @click=${this._openAddEventPopup}>
                <ha-icon-button .path=${i}></ha-icon-button>
              </div>
            ` : ""}
        ${ut(this.hass, this._events, this.config, this._openEvent, this._showAll)}
      </ha-card>
    `;
	}
	_showPopup(e) {
		V(this, "show-dialog", {
			dialogTag: "calendar-card-plus-popup",
			dialogImport: () => Promise.resolve().then(() => (Wt(), Ut)),
			dialogParams: {
				...e,
				hass: this.hass,
				config: this.config,
				opener: this,
				onEventSaved: this._onEventSaved
			}
		});
	}
	static get styles() {
		return [Tt, f`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
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
        gap: 8px;
        padding: 8px;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
      }
      /* each event is a thin-bordered tile; radius follows the card's minus its padding */
      .calendar-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: calc(var(--ha-card-border-radius, 12px) - 6px);
        cursor: pointer;
      }
      /* compact view or "show divider": plain rows instead of tiles */
      ha-card.plain .calendar-container {
        gap: 0;
      }
      ha-card.plain .calendar-item {
        border-color: transparent;
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
      .title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .title-row .event-title {
        flex: 1;
      }
      .more-indicator {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--secondary-text-color);
        font-size: 0.85em;
        font-style: italic;
        flex-shrink: 0;
        --mdc-icon-size: 16px;
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
    `];
	}
	getCardSize() {
		return 1;
	}
	static async getConfigElement() {
		return await Promise.resolve().then(() => (Kt(), Gt)), document.createElement("calendar-card-plus-editor");
	}
	static getStubConfig(e) {
		return {
			type: "custom:calendar-card-plus",
			exclude_entities: [],
			unfold_events: !1
		};
	}
};
X([z({ attribute: !1 })], $.prototype, "hass", void 0), X([B()], $.prototype, "config", void 0), X([B()], $.prototype, "_events", void 0), X([B()], $.prototype, "_hidden", void 0), X([z({ type: Boolean })], $.prototype, "preview", void 0), $ = X([R("calendar-card-plus")], $), console.info(`%c CALENDAR-CARD-PLUS %c v${r} `, "color: steelblue; background: black; font-weight: bold;", "color: white ; background: dimgray; font-weight: bold;"), window.customCards = window.customCards || [], window.customCards.push({
	type: "calendar-card-plus",
	name: "Dynamic Calendar Card Plus",
	preview: !0,
	description: "A standalone calendar card with dynamic grid styling"
});
//#endregion
