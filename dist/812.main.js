/*! For license information please see 812.main.js.LICENSE.txt */
"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[812],{812:(t,e,i)=>{i.r(e),i.d(e,{ConnectButton:()=>Re,RadixButtonMode:()=>Dt,RadixButtonStatus:()=>mt});const o=window,r=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),a=new WeakMap;class s{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}}const l=t=>new s("string"==typeof t?t:t+"",void 0,n),d=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1]),t[0]);return new s(i,t,n)},c=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return l(e)})(t):t;var g;const p=window,M=p.trustedTypes,u=M?M.emptyScript:"",I=p.reactiveElementPolyfillSupport,h={toAttribute(t,e){switch(e){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},N=(t,e)=>e!==t&&(e==e||t==t),A={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:N},b="finalized";class x extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))})),t}static createProperty(t,e=A){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const r=this[t];this[e]=o,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||A}static finalize(){if(this.hasOwnProperty(b))return!1;this[b]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{r?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),r=o.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=A){var o;const r=this.constructor._$Ep(t,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:h).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,r=o._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=o.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:h;this._$El=r,this[r]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||N)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var m;x[b]=!0,x.elementProperties=new Map,x.elementStyles=[],x.shadowRootOptions={mode:"open"},null==I||I({ReactiveElement:x}),(null!==(g=p.reactiveElementVersions)&&void 0!==g?g:p.reactiveElementVersions=[]).push("1.6.3");const D=window,y=D.trustedTypes,v=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",T=`lit$${(Math.random()+"").slice(9)}$`,z="?"+T,j=`<${z}>`,Z=document,k=()=>Z.createComment(""),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,U="[ \t\n\f\r]",w=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,L=/>/g,R=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),f=/'/g,W=/"/g,O=/^(?:script|style|textarea|title)$/i,Q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),G=Q(1),Y=(Q(2),Symbol.for("lit-noChange")),F=Symbol.for("lit-nothing"),X=new WeakMap,P=Z.createTreeWalker(Z,129,null,!1);function H(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==v?v.createHTML(e):e}const B=(t,e)=>{const i=t.length-1,o=[];let r,n=2===e?"<svg>":"",a=w;for(let e=0;e<i;e++){const i=t[e];let s,l,d=-1,c=0;for(;c<i.length&&(a.lastIndex=c,l=a.exec(i),null!==l);)c=a.lastIndex,a===w?"!--"===l[1]?a=V:void 0!==l[1]?a=L:void 0!==l[2]?(O.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=R):void 0!==l[3]&&(a=R):a===R?">"===l[0]?(a=null!=r?r:w,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?R:'"'===l[3]?W:f):a===W||a===f?a=R:a===V||a===L?a=w:(a=R,r=void 0);const g=a===R&&t[e+1].startsWith("/>")?" ":"";n+=a===w?i+j:d>=0?(o.push(s),i.slice(0,d)+C+i.slice(d)+T+g):i+T+(-2===d?(o.push(void 0),e):g)}return[H(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),o]};class J{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,n=0;const a=t.length-1,s=this.parts,[l,d]=B(t,e);if(this.el=J.createElement(l,i),P.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=P.nextNode())&&s.length<a;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith(C)||e.startsWith(T)){const i=d[n++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+C).split(T),e=/([.?@])?(.*)/.exec(i);s.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?tt:"?"===e[1]?it:"@"===e[1]?ot:_})}else s.push({type:6,index:r})}for(const e of t)o.removeAttribute(e)}if(O.test(o.tagName)){const t=o.textContent.split(T),e=t.length-1;if(e>0){o.textContent=y?y.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],k()),P.nextNode(),s.push({type:2,index:++r});o.append(t[e],k())}}}else if(8===o.nodeType)if(o.data===z)s.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(T,t+1));)s.push({type:7,index:r}),t+=T.length-1}r++}}static createElement(t,e){const i=Z.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,o){var r,n,a,s;if(e===Y)return e;let l=void 0!==o?null===(r=i._$Co)||void 0===r?void 0:r[o]:i._$Cl;const d=S(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,o)),void 0!==o?(null!==(a=(s=i)._$Co)&&void 0!==a?a:s._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(e=K(t,l._$AS(t,e.values),l,o)),e}class q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:Z).importNode(i,!0);P.currentNode=r;let n=P.nextNode(),a=0,s=0,l=o[0];for(;void 0!==l;){if(a===l.index){let e;2===l.type?e=new $(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new rt(n,this,t)),this._$AV.push(e),l=o[++s]}a!==(null==l?void 0:l.index)&&(n=P.nextNode(),a++)}return P.currentNode=Z,r}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class ${constructor(t,e,i,o){var r;this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(r=null==o?void 0:o.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),S(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==Y&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>E(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==F&&S(this._$AH)?this._$AA.nextSibling.data=t:this.$(Z.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,r="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=J.createElement(H(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.v(i);else{const t=new q(r,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new J(t)),e}T(t){E(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new $(this.k(k()),this.k(k()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class _{constructor(t,e,i,o,r){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const r=this.strings;let n=!1;if(void 0===r)t=K(this,t,e,0),n=!S(t)||t!==this._$AH&&t!==Y,n&&(this._$AH=t);else{const o=t;let a,s;for(t=r[0],a=0;a<r.length-1;a++)s=K(this,o[i+a],e,a),s===Y&&(s=this._$AH[a]),n||(n=!S(s)||s!==this._$AH[a]),s===F?t=F:t!==F&&(t+=(null!=s?s:"")+r[a+1]),this._$AH[a]=s}n&&!o&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class tt extends _{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}const et=y?y.emptyScript:"";class it extends _{constructor(){super(...arguments),this.type=4}j(t){t&&t!==F?this.element.setAttribute(this.name,et):this.element.removeAttribute(this.name)}}class ot extends _{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=K(this,t,e,0))&&void 0!==i?i:F)===Y)return;const o=this._$AH,r=t===F&&o!==F||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==F&&(o===F||r);r&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const nt=D.litHtmlPolyfillSupport;var at,st;null==nt||nt(J,$),(null!==(m=D.litHtmlVersions)&&void 0!==m?m:D.litHtmlVersions=[]).push("2.8.0");class lt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,r;const n=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let a=n._$litPart$;if(void 0===a){const t=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;n._$litPart$=a=new $(e.insertBefore(k(),t),t,void 0,null!=i?i:{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return Y}}lt.finalized=!0,lt._$litElement$=!0,null===(at=globalThis.litElementHydrateSupport)||void 0===at||at.call(globalThis,{LitElement:lt});const dt=globalThis.litElementPolyfillSupport;null==dt||dt({LitElement:lt}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");const ct=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){customElements.define(t,e)}}})(t,e),gt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function pt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):gt(t,e)}var Mt;null===(Mt=window.HTMLSlotElement)||void 0===Mt||Mt.prototype.assignedElements;const ut=t=>(...e)=>({_$litDirective$:t,values:e});class It{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const ht=ut(class extends It{constructor(t){var e;if(super(t),1!==t.type||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var i,o;if(void 0===this.it){this.it=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(i=this.nt)||void 0===i?void 0:i.has(t))&&this.it.add(t);return this.render(e)}const r=t.element.classList;this.it.forEach((t=>{t in e||(r.remove(t),this.it.delete(t))}));for(const t in e){const i=!!e[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(r.add(t),this.it.add(t)):(r.remove(t),this.it.delete(t)))}return Y}}),Nt="important",At=" !"+Nt,bt=ut(class extends It{constructor(t){var e;if(super(t),1!==t.type||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,i)=>{const o=t[i];return null==o?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ht){this.ht=new Set;for(const t in e)this.ht.add(t);return this.render(e)}this.ht.forEach((t=>{null==e[t]&&(this.ht.delete(t),t.includes("-")?i.removeProperty(t):i[t]="")}));for(const t in e){const o=e[t];if(null!=o){this.ht.add(t);const e="string"==typeof o&&o.endsWith(At);t.includes("-")||e?i.setProperty(t,e?o.slice(0,-11):o,e?Nt:""):i[t]=o}}return Y}});d`
  :host {
    /* Core colors */
    --color-radix-green-1: #00ab84;
    --color-radix-green-2: #00c389;
    --color-radix-green-3: #21ffbe;
    --color-radix-blue-1: #060f8f;
    --color-radix-blue-2: #052cc0;
    --color-radix-blue-3: #20e4ff;
    --color-light: #ffffff;
    --color-dark: #000000;

    /* Accent colors */
    --color-accent-red: #ef4136;
    --color-accent-blue: #00aeef;
    --color-accent-yellow: #fff200;
    --color-alert: #e59700;
    --color-radix-error-red-1: #c82020;
    --color-radix-error-red-2: #fcebeb;

    /* Neutral colors */
    --color-grey-1: #003057;
    --color-grey-2: #8a8fa4;
    --color-grey-3: #ced0d6;
    --color-grey-4: #e2e5ed;
    --color-grey-5: #f4f5f9;
  }
`;const xt=d`
  :host {
    font-family: 'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
  }

  :host([mode='light']) {
    --radix-popover-background: color-mix(in srgb, #f4f5f9 20%, transparent);
    --radix-popover-background-hover: var(--color-radix-blue-1);
    --radix-popover-border-color: var(--color-radix-blue-2);
    --radix-popover-text-color: var(--color-grey-1);

    --radix-popover-tabs-background: color-mix(
      in srgb,
      var(--color-grey-2) 30%,
      transparent
    );
    --radix-popover-tabs-button-active-background: var(--color-light);

    --radix-link-color: var(--color-radix-blue-2);

    --radix-card-background: var(--color-light);
    --radix-card-text-color: var(--color-grey-1);
    --radix-card-text-dimmed-color: var(--color-grey-2);
    --radix-card-inverted-background: var(--color-grey-1);
    --radix-card-inverted-text-color: var(--color-light);

    --radix-avatar-border-color: var(--color-grey-5);

    --radix-button-background: var(--color-light);
    --radix-button-text-color: var(--color-radix-blue-2);
    --radix-connect-now-disabled-button-background: color-mix(
      in srgb,
      var(--color-light) 40%,
      transparent
    );
    --radix-connect-now-disabled-button-text: var(--color-light);

    color: var(--color-grey-1);
  }

  :host([mode='dark']) {
    --radix-popover-background: color-mix(in srgb, #f4f5f9 20%, transparent);
    --radix-popover-background-hover: var(--color-radix-blue-1);
    --radix-popover-border-color: var(--color-radix-blue-2);
    --radix-popover-text-color: var(--color-light);

    --radix-popover-tabs-background: color-mix(
      in srgb,
      var(--color-dark) 60%,
      transparent
    );
    --radix-popover-tabs-button-active-text-color: var(--color-light);
    --radix-popover-tabs-button-active-background: #515151;

    --radix-link-color: var(--color-white);

    --radix-card-background: #515151;
    --radix-card-text-color: var(--color-light);
    --radix-card-text-dimmed-color: var(--color-grey-3);
    --radix-card-inverted-background: var(--color-grey-5);
    --radix-card-inverted-text-color: var(--color-grey-1);

    --radix-avatar-border-color: #656565;

    --radix-button-background: color-mix(
      in srgb,
      var(--color-dark) 40%,
      transparent
    );
    --radix-button-text-color: var(--color-light);
    --radix-connect-now-disabled-button-background: color-mix(
      in srgb,
      var(--color-dark) 40%,
      transparent
    );
    --radix-connect-now-disabled-button-text: color-mix(
      in srgb,
      var(--color-light) 20%,
      transparent
    );

    color: var(--color-light);
  }

  button {
    font-weight: 500;
    transition: background-color 0.1s cubic-bezier(0.45, 0, 0.55, 1);
    border-radius: 12px;
    border: none;
    background: var(--radix-button-background);
    color: var(--radix-button-text-color);
    font-size: 14px;
    font-weight: 600;
  }

  :host([theme='radix-blue']) {
    --radix-connect-button-background: var(--color-radix-blue-2);
    --radix-connect-button-background-hover: var(--color-radix-blue-1);
    --radix-connect-button-border-color: var(--color-radix-blue-2);
    --radix-connect-button-text-color: var(--color-light);
  }

  :host([theme='black']) {
    --radix-connect-button-background: var(--color-dark);
    --radix-connect-button-background-hover: #3e3e3e;
    --radix-connect-button-border-color: var(--color-dark);
    --radix-connect-button-text-color: var(--color-light);
  }

  :host([theme='white-with-outline']) {
    --radix-connect-button-background: var(--color-light);
    --radix-connect-button-background-hover: var(--color-grey-5);
    --radix-connect-button-border-color: var(--color-dark);
    --radix-connect-button-text-color: var(--color-dark);
  }

  :host([theme='white']) {
    --radix-connect-button-background: var(--color-light);
    --radix-connect-button-background-hover: var(--color-grey-5);
    --radix-connect-button-border-color: var(--color-light);
    --radix-connect-button-text-color: var(--color-dark);
  }
`,mt={pending:"pending",success:"success",error:"error",default:"default"},Dt={light:"light",dark:"dark"};var yt=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,Ct=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?vt(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&yt(e,i,n),n};let Tt=class extends lt{constructor(){super(...arguments),this.theme=Dt.light,this.active="sharing"}onClick(t,e){this.dispatchEvent(new CustomEvent("onClick",{detail:{value:t,event:e},bubbles:!0,composed:!0}))}render(){return G`
      <div class="tabs">
        <button
          @click=${t=>this.onClick("sharing",t)}
          class=${ht({active:"sharing"===this.active})}
        >
          Sharing
        </button>
        <button
          @click=${t=>this.onClick("requests",t)}
          class=${ht({active:"requests"===this.active})}
        >
          Requests
        </button>
        <div class="active-indicator"></div>
      </div>
    `}};Tt.styles=[xt,d`
      :host {
        display: block;
        width: 100%;
        user-select: none;
      }

      .tabs {
        width: calc(100% - 10px);
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: space-between;
        padding: 5px;
        border-radius: 12px;
        position: relative;
        background: var(--radix-popover-tabs-background);
      }

      button {
        border: unset;
        font-size: 14px;
        background: transparent;
        text-align: center;
        flex: 1;
        border-radius: 8px;
        font-weight: 600;
        color: var(--radix-popover-text-color);
        width: 100%;
        height: 32px;
        z-index: 1;
        margin: 0;
        padding: 0;
      }

      button:not(.active) {
        cursor: pointer;
      }

      .active-indicator {
        width: calc(50% - 5px);
        height: 32px;
        border-radius: 8px;
        position: absolute;
        box-shadow: 0px 4px 5px 0px #0000001a;
        background: var(--radix-popover-tabs-button-active-background);
        top: 5px;
        transition: transform 0.125s cubic-bezier(0.45, 0, 0.55, 1);
      }

      :host([active='sharing']) .active-indicator {
        transform: translateX(5px);
      }

      :host([active='requests']) .active-indicator {
        transform: translateX(calc(100% + 5px));
      }

      button:focus,
      button:focus-visible {
        outline: 0px auto -webkit-focus-ring-color;
      }
    `],Ct([pt({type:String,reflect:!0})],Tt.prototype,"theme",2),Ct([pt({type:String,reflect:!0})],Tt.prototype,"active",2),Tt=Ct([ct("radix-tabs-menu")],Tt);const zt="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xNzU4XzE0NjkpIj4KICAgICAgICA8cGF0aAogICAgICAgICAgICBkPSJNMTkgNi40MUwxNy41OSA1TDEyIDEwLjU5TDYuNDEgNUw1IDYuNDFMMTAuNTkgMTJMNSAxNy41OUw2LjQxIDE5TDEyIDEzLjQxTDE3LjU5IDE5TDE5IDE3LjU5TDEzLjQxIDEyTDE5IDYuNDFaIgogICAgICAgICAgICBmaWxsPSIjMzIzMjMyIiAvPgogICAgPC9nPgogICAgPGRlZnM+CiAgICAgICAgPGNsaXBQYXRoIGlkPSJjbGlwMF8xNzU4XzE0NjkiPgogICAgICAgICAgICA8cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IndoaXRlIiAvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICA8L2RlZnM+Cjwvc3ZnPgogICAg";var jt=Object.defineProperty,Zt=Object.getOwnPropertyDescriptor,kt=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?Zt(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&jt(e,i,n),n};let St=class extends lt{constructor(){super(...arguments),this.mode=Dt.light,this.connected=!1,this.compact=!1,this.isMobile=!1,this.height=0}connectedCallback(){super.connectedCallback(),setTimeout((()=>{const t=this.shadowRoot.getElementById("radix-popover-content");this.resizeObserver=new ResizeObserver((()=>{t&&t.scrollHeight&&(this.height=t.scrollHeight)})),this.resizeObserver.observe(this)}))}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.resizeObserver)||t.unobserve(this)}closePopover(){this.dispatchEvent(new CustomEvent("onClosePopover",{bubbles:!0,composed:!0}))}drawPopover(){const t="light"===this.mode?"#D9D9D9":"#808080",e=this.height,i=e;var o;return`data:image/svg+xml;base64,${(t=>{if("function"==typeof btoa)return btoa(t);if("function"==typeof Buffer)return Buffer.from(t,"utf-8").toString("base64");throw new Error("Failed to determine the platform specific encoder")})(`\n    <svg viewBox="0 0 345 ${e+1}"  fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"  >\n        <path\n            d="${["M 13 8",(o=this.compact?314:300,`\n      L ${o-7} 8 \n      L ${o} 1\n      L ${o+7} 8`),"L 332 8","C 338 8 344 14 344 20","L 344 "+(i-12),`C 344 ${i-6} 338 ${i} 332 ${i}`,`L 13 ${i}`,`C 7 ${i} 1 ${i-6} 1 ${i-12}`,"L 1 20","C 1 14 7 8 13 8","Z"].join(" ")}"\n            \n            stroke-width="1"\n            stroke-opacity="${this.connected?1:0}"\n            fill="${t}"\n            fill-opacity="0.98"\n            stroke="url(#gradient)"\n        />\n        <defs>\n          \n      <linearGradient id="gradient" x1="461.192" y1="52.4476" x2="81.1033" y2="460.678" gradientUnits="userSpaceOnUse">\n          <stop stop-color="#CE0D98" />\n          <stop offset="0.210873" stop-color="#052CC0" />\n          <stop offset="0.479167" stop-color="#20E4FF" />\n          <stop offset="0.729604" stop-color="#052CC0" />\n          <stop offset="1" stop-color="#21FFBE" />\n      </linearGradient>\n        </defs>\n     </svg>\n    `)}`}render(){return this.isMobile?G`<div id="radix-mobile-popover-content">
          <button
            id="close-button"
            @click=${()=>{this.closePopover()}}
          ></button>
          <div id="content"><slot></slot></div>
          <button
            id="close-button-blue"
            @click=${()=>{this.closePopover()}}
          >
            Close
          </button>
        </div>`:G`<style>
            :host {
              background-image: url(${this.drawPopover()});
            }
          </style>
          <div id="radix-popover-content">
            <slot />
          </div>`}};St.styles=[xt,d`
      :host {
        user-select: none;
        display: inline-flex;
        background-position: center top;
        background-repeat: no-repeat;
        justify-content: center;
        align-items: flex-start;
        padding: 18px 12px 10px;
      }

      #radix-popover-content {
        width: 344px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        overflow: auto;
        min-height: 130px;
      }
      #content {
        width: 288px;
      }
      #radix-mobile-popover-content {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        overflow: auto;
        min-height: 130px;
        background-color: var(--radix-card-background);
        padding: 1rem;
        border-radius: 12px;
        max-width: 344px;
      }

      #close-button {
        -webkit-mask-image: url(${l(zt)});
        mask-image: url(${l(zt)});
        background-color: var(--radix-card-text-color);
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        align-self: flex-start;
        cursor: pointer;
      }
      #close-button:hover {
        opacity: 0.8;
      }

      #close-button-blue {
        background-color: var(--color-radix-blue-2);
        color: var(--color-light);
        padding: 0.7rem 1rem;
        font-size: 14px;
        width: 100%;
        cursor: pointer;
        max-width: 236px;
      }
    `],kt([pt({type:String,reflect:!0})],St.prototype,"mode",2),kt([pt({type:Boolean})],St.prototype,"connected",2),kt([pt({type:Boolean})],St.prototype,"compact",2),kt([pt({type:Boolean})],St.prototype,"isMobile",2),kt([pt({state:!0})],St.prototype,"height",2),St=kt([ct("radix-popover")],St);const Et=G`<div class="loading-spinner-container">
  <div class="loading-spinner"></div>
</div>`,Ut=d`
  .loading-spinner-container {
    display: flex;
  }

  @container (max-width: ${122}px) {
    .loading-spinner-container {
      margin-left: 0;
      margin-right: 0;
    }
  }

  button.gradient > .loading-spinner {
    border-right-color: var(--color-light);
    border-left-color: color-mix(in srgb, var(--color-light) 30%, transparent);
    border-top-color: color-mix(in srgb, var(--color-light) 30%, transparent);
    border-bottom-color: color-mix(
      in srgb,
      var(--color-light) 30%,
      transparent
    );
  }

  .loading-spinner {
    width: 22px;
    height: 22px;
    min-width: 22px;
    min-height: 22px;
    border: 2px solid var(--radix-connect-button-text-color);
    border-left-color: color-mix(
      in srgb,
      var(--radix-connect-button-text-color) 30%,
      transparent
    );
    border-top-color: color-mix(
      in srgb,
      var(--radix-connect-button-text-color) 30%,
      transparent
    );
    border-bottom-color: color-mix(
      in srgb,
      var(--radix-connect-button-text-color) 30%,
      transparent
    );
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    align-self: center;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`,wt="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNzYzNzEgMTEuNzE4M0M1LjUxNDM0IDExLjcxODMgNS4yNzcyNiAxMS41OTg2IDUuMTI4NjIgMTEuMzkyNUwyLjAyNDQyIDcuMDcwOTdIMFY1LjQ5NzU4SDIuNDI0ODhDMi42NzY3MSA1LjQ5NzU4IDIuOTEyNTYgNS42MTg1MiAzLjA1OTk3IDUuODIzMzdMNS41OTY2NCA5LjM1MzkxTDkuNDY3MzcgMC40NzEzOThDOS41OTI2NiAwLjE4NTEwNCA5Ljg3Mzk3IDAgMTAuMTg0OCAwSDE1LjAyMzVWMS41NzMzOEgxMC42OTdMNi40ODExIDExLjI0NjlDNi4zNjgwOSAxMS41MDYxIDYuMTI2MDkgMTEuNjgzOCA1Ljg0NjAxIDExLjcxMzRDNS44MjAyMSAxMS43MTcxIDUuNzkxOTYgMTEuNzE4MyA1Ljc2MzcxIDExLjcxODNaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",Vt="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxjaXJjbGUgb3BhY2l0eT0iMC41IiBjeD0iMTEiIGN5PSIxMSIgcj0iMTAuNSIgc3Ryb2tlPSJ3aGl0ZSIgLz4KICAgIDxjaXJjbGUgb3BhY2l0eT0iMC41IiBjeD0iMTEiIGN5PSIxMSIgcj0iMTAuNSIgc3Ryb2tlPSJ3aGl0ZSIgLz4KICAgIDxyZWN0IHg9IjAuMDI5MTM0NCIgeT0iMC41Njk2NTciIHdpZHRoPSI3LjI3NDAxIiBoZWlnaHQ9IjcuMjk2NDIiIHJ4PSIzLjYzNyIKICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjczMzE3NSAwLjY4MDA0IC0wLjY1OTk3MSAwLjc1MTI5MSAxMC4xODg5IDIuODI0MTQpIiBzdHJva2U9IndoaXRlIgogICAgICAgIHN0cm9rZS13aWR0aD0iMC43OTU5ODEiIC8+CiAgICA8cmVjdCBvcGFjaXR5PSIwLjMiIHg9IjAuMDI5MTM0NCIgeT0iMC41Njk2NTciIHdpZHRoPSI3LjI3NDAxIiBoZWlnaHQ9IjcuMjk2NDIiIHJ4PSIzLjYzNyIKICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjczMzE3NSAwLjY4MDA0IC0wLjY1OTk3MSAwLjc1MTI5MSAxMi41NjI5IDIuODI0MTQpIiBzdHJva2U9IndoaXRlIgogICAgICAgIHN0cm9rZS13aWR0aD0iMC43OTU5ODEiIC8+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIKICAgICAgICBkPSJNMTAuNTM1MyAxMy40NDkzQzkuNTg5MDcgMTMuNDQ5MyA4LjI0NTY5IDEzLjc2ODMgNy4wMDA1NiAxNC40OTY4QzUuNzQ4NiAxNS4yMjkyIDQuNTY4NTEgMTYuMzkyNSA0LjAwNTE2IDE4LjA5NzJDMy45MzI1NiAxOC4zMTY4IDQuMDUxNzkgMTguNTUzNyA0LjI3MTQ1IDE4LjYyNjNDNC40OTExMSAxOC42OTg5IDQuNzI4MDMgMTguNTc5NyA0LjgwMDYzIDE4LjM2QzUuMjg2MDQgMTYuODkxMiA2LjMwNTEgMTUuODc0MyA3LjQyMzYxIDE1LjIxOTlDOC41NDg5NSAxNC41NjE1IDkuNzQ3MzggMTQuMjg3MSAxMC41MzUzIDE0LjI4NzFIMTAuNTU4OEMxMC41NTg4IDE0LjI4NzEgMTAuNTU4OSAxNC4yODcxIDEwLjU1ODkgMTQuMjg3MUMxMS40MzM0IDE0LjI4NzEgMTIuODA3MSAxNC42MjQ4IDE0LjAyNTQgMTUuNDQyNEMxNS4yMzIgMTYuMjUyMiAxNi4yNjU4IDE3LjUxNzYgMTYuNTI5MyAxOS4zNzQ5QzE2LjU2MTggMTkuNjA0IDE2Ljc3MzggMTkuNzYzMyAxNy4wMDI5IDE5LjczMDhDMTcuMjMxOSAxOS42OTgzIDE3LjM5MTMgMTkuNDg2MyAxNy4zNTg4IDE5LjI1NzJDMTcuMDU1NyAxNy4xMjExIDE1Ljg1NjcgMTUuNjYyNSAxNC40OTIzIDE0Ljc0NjhDMTMuMTM5NSAxMy44Mzg5IDExLjYwMzkgMTMuNDQ5MyAxMC41NTg5IDEzLjQ0OTNDMTAuNTU4OSAxMy40NDkzIDEwLjU1ODggMTMuNDQ5MyAxMC41NTg4IDEzLjQ0OTNIMTAuNTM1M1oiCiAgICAgICAgZmlsbD0id2hpdGUiIC8+CiAgICA8cGF0aCBvcGFjaXR5PSIwLjMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIgogICAgICAgIGQ9Ik0xMi45MDk3IDEzLjQ0OTNDMTEuODExNSAxMy40NDkzIDEwLjE2NzkgMTMuODc5OCA4Ljc2NDUyIDE0Ljg5NDNDNy4zNDU5NiAxNS45MTk4IDYuMTU5ODggMTcuNTUzNiA2LjA0NTQxIDE5Ljk0MjJDNi4wMzQzNCAyMC4xNzMyIDYuMjEyNjkgMjAuMzY5NSA2LjQ0Mzc3IDIwLjM4MDZDNi42NzQ4NSAyMC4zOTE3IDYuODcxMTYgMjAuMjEzMyA2Ljg4MjIzIDE5Ljk4MjNDNi45ODI2NSAxNy44ODY5IDguMDA5NjQgMTYuNDczOCA5LjI1NTM0IDE1LjU3MzJDMTAuNTE2MiAxNC42NjE3IDExLjk4ODEgMTQuMjg3MSAxMi45MDk3IDE0LjI4NzFIMTIuOTMzMkMxMy42MjQ4IDE0LjI4NzEgMTQuNjM3NCAxNC40OTg4IDE1LjY0MDcgMTUuMDAwOUMxNi42NDAxIDE1LjUwMTEgMTcuNjAzOCAxNi4yNzU5IDE4LjIzMzEgMTcuMzgwOEMxOC4zNDc2IDE3LjU4MTkgMTguNjAzNCAxNy42NTIgMTguODA0NCAxNy41Mzc1QzE5LjAwNTQgMTcuNDIzIDE5LjA3NTYgMTcuMTY3MiAxOC45NjExIDE2Ljk2NjJDMTguMjMxOCAxNS42ODU3IDE3LjEyNjkgMTQuODA3OSAxNi4wMTU2IDE0LjI1MTdDMTQuOTA4NCAxMy42OTc2IDEzLjc2ODMgMTMuNDQ5MyAxMi45MzMyIDEzLjQ0OTNNMTIuOTA5NyAxMy40NDkzSDEyLjkzMzJIMTIuOTA5N1oiCiAgICAgICAgZmlsbD0id2hpdGUiIC8+Cjwvc3ZnPgogICAg",Lt="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoCiAgICAgICAgZD0iTTEwLjUgMC41QzQuOTggMC41IDAuNSA0Ljk4IDAuNSAxMC41QzAuNSAxNi4wMiA0Ljk4IDIwLjUgMTAuNSAyMC41QzE2LjAyIDIwLjUgMjAuNSAxNi4wMiAyMC41IDEwLjVDMjAuNSA0Ljk4IDE2LjAyIDAuNSAxMC41IDAuNVpNMTAuNSAxOC41QzYuMDkgMTguNSAyLjUgMTQuOTEgMi41IDEwLjVDMi41IDYuMDkgNi4wOSAyLjUgMTAuNSAyLjVDMTQuOTEgMi41IDE4LjUgNi4wOSAxOC41IDEwLjVDMTguNSAxNC45MSAxNC45MSAxOC41IDEwLjUgMTguNVpNMTUuMDkgNi4wOEw4LjUgMTIuNjdMNS45MSAxMC4wOUw0LjUgMTEuNUw4LjUgMTUuNUwxNi41IDcuNUwxNS4wOSA2LjA4WiIKICAgICAgICBmaWxsPSJ3aGl0ZSIgLz4KPC9zdmc+CiAgICA=",Rt="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMjMiIHZpZXdCb3g9IjAgMCAyMyAyMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoCiAgICAgICAgZD0iTTE1Ljk2ODkgOC41MjA4N0wxNC40NzkzIDcuMDMxMjNMMTEuNSAxMC4wMTA1TDguNTIwNzIgNy4wMzEyM0w3LjAzMTA4IDguNTIwODdMMTAuMDEwNCAxMS41MDAxTDcuMDMxMDggMTQuNDc5NEw4LjUyMDcyIDE1Ljk2OTFMMTEuNSAxMi45ODk4TDE0LjQ3OTMgMTUuOTY5MUwxNS45Njg5IDE0LjQ3OTRMMTIuOTg5NiAxMS41MDAxTDE1Ljk2ODkgOC41MjA4N1pNMTguOTQ4MiA0LjA1MTk1QzE0Ljg0NDIgLTAuMDUyMDAyNCA4LjE1NTc2IC0wLjA1MjAwMjcgNC4wNTE4MSA0LjA1MTk1Qy0wLjA1MjE0NTMgOC4xNTU5IC0wLjA1MjE0NTYgMTQuODQ0NCA0LjA1MTgxIDE4Ljk0ODNDOC4xNTU3NiAyMy4wNTIzIDE0Ljg0NDIgMjMuMDUyMyAxOC45NDgyIDE4Ljk0ODNDMjMuMDUyMSAxNC44NDQ0IDIzLjA1MjEgOC4xNTU5MSAxOC45NDgyIDQuMDUxOTVaTTUuNTQxNDUgMTcuNDU4N0MyLjI1Njc5IDE0LjE3NCAyLjI1Njc5IDguODI2MjQgNS41NDE0NSA1LjU0MTU5QzguODI2MSAyLjI1Njk0IDE0LjE3MzkgMi4yNTY5NCAxNy40NTg2IDUuNTQxNTlDMjAuNzQzMiA4LjgyNjI0IDIwLjc0MzIgMTQuMTc0IDE3LjQ1ODYgMTcuNDU4N0MxNC4xNzM5IDIwLjc0MzMgOC44MjYxIDIwLjc0MzMgNS41NDE0NSAxNy40NTg3WiIKICAgICAgICBmaWxsPSJ3aGl0ZSIgLz4KPC9zdmc+CiAgICA=";var ft=Object.defineProperty,Wt=Object.getOwnPropertyDescriptor,Ot=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?Wt(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&ft(e,i,n),n};let Qt=class extends lt{constructor(){super(...arguments),this.status=mt.default,this.connected=!1,this.fullWidth=!1,this.theme="radix-blue"}onClick(t){this.dispatchEvent(new CustomEvent("onClick",{detail:t,bubbles:!0,composed:!0}))}connectedCallback(){super.connectedCallback(),setTimeout((()=>{const t=this.shadowRoot.querySelector("button");this.resizeObserver=new ResizeObserver((()=>{this.dispatchEvent(new CustomEvent("onResize",{bubbles:!0,composed:!1,detail:t}))})),this.resizeObserver.observe(t)}))}disconnectedCallback(){var t;super.disconnectedCallback();const e=this.shadowRoot.querySelector("button");null==(t=this.resizeObserver)||t.unobserve(e)}render(){const t="pending"!==this.status&&!this.connected,e=this.connected;return G`
      <button
        @click=${this.onClick}
        class=${ht({logo:t,gradient:e})}
      >
        ${(()=>this.status===mt.pending&&this.connected?G`${Et} <slot></slot>`:this.status===mt.pending?Et:!this.connected&&["success","error"].includes(this.status)?"":G`<slot></slot>`)()}
      </button>
    `}};Qt.styles=[xt,Ut,d`
      :host {
        width: max(var(--radix-connect-button-width, 138px), 40px);
        min-width: 40px;
        display: flex;
        justify-content: flex-end;
        container-type: inline-size;
        user-select: none;
        --radix-connect-button-text-color: var(--color-light);
      }

      :host([full-width]) > button {
        width: 100%;
      }

      :host([full-width]) {
        width: 100%;
        display: inline-block;
      }

      ::slotted(*) {
        overflow: hidden;
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
        width: auto;
      }

      .gradient ::slotted(*) {
        padding: 0 4px;
      }

      button {
        width: max(var(--radix-connect-button-width, 138px), 40px);
        height: var(--radix-connect-button-height, 40px);
        min-width: ${32}px;
        min-height: ${32}px;
        border-radius: var(--radix-connect-button-border-radius, 0);
        background-color: var(--radix-connect-button-background);
        border: 1px solid var(--radix-connect-button-border-color);
        color: var(--radix-connect-button-text-color);
        font-size: 14px;
        align-content: center;
        align-items: center;
        font-family: inherit;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.1s cubic-bezier(0.45, 0, 0.55, 1);

        display: flex;
        gap: 3px;
        justify-content: center;
        padding: 0 10px;
      }

      button::before {
        min-height: 0.94em;
        min-width: 1.25em;
        display: block;
        -webkit-mask-position: center right;
        mask-position: center right;
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat;
        background-color: var(--radix-connect-button-text-color);
        width: 16px;
      }

      button:hover {
        background-color: var(--radix-connect-button-background-hover);
      }

      button.logo::before {
        content: '';
        mask-image: url(${l(wt)});
        -webkit-mask-image: url(${l(wt)});
      }

      button.gradient.logo::before {
        background-color: var(--color-light);
      }

      :host([status='pending']) > button.gradient::before {
        display: none;
      }

      button.gradient {
        border: 1px solid transparent;
        background-repeat: no-repeat;
        background-origin: border-box;
        background-size: cover;
        background-position: center;
        background-color: var(--color-radix-blue-2);
        color: var(--color-light);
        background-image: url(${l("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTM4IDQyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGcgZmlsdGVyPSJ1cmwoI3RvcC1sZWZ0LXRlYWwpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLCAwKSI+CiAgICAgICAgPHBhdGgKICAgICAgICAgICAgZD0iTTAuNDA2MzI5IC0zNC40OTU3QzE2LjYxMSAtNDEuODMzMSAzNC42MTc0IC0zNy4wMjU4IDQwLjYyNSAtMjMuNzU4M0M0Ni42MzI1IC0xMC40OTA4IDM4LjM2NjEgNi4yMTI4NiAyMi4xNjE1IDEzLjU1MDNDNS45NTY4NiAyMC44ODc3IC00Mi41MTI3IC0xLjE3MzYgLTQ4LjUyMDIgLTE0LjQ0MTFDLTU0LjUyNzcgLTI3LjcwODcgLTE1Ljc5ODMgLTI3LjE1ODMgMC40MDYzMjkgLTM0LjQ5NTdaIgogICAgICAgICAgICBmaWxsPSIjMjFGRkJFIiAvPgoKICAgICAgICA8ZmlsdGVyIGlkPSJ0b3AtbGVmdC10ZWFsIiB4PSItNzkuMzQzIiB5PSItNjguMTI1NCIgd2lkdGg9IjE1MiIgaGVpZ2h0PSIxMTMiCiAgICAgICAgICAgIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTUuMDk3OSIgLz4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZz4KCgogICAgPGcgZmlsdGVyPSJ1cmwoI2JvdHRvbS1yaWdodC1henVyZSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsIDApIj4KICAgICAgICA8cGF0aAogICAgICAgICAgICBkPSJNNzcuOTQ4MiAyOC40NjdDODYuNzM2MiAyMi4wODY5IDk4LjA5NSAyMi43NDc4IDEwMy4zMTkgMjkuOTQzQzEwOC41NDIgMzcuMTM4MiAxMDUuNjUzIDQ4LjE0MzIgOTYuODY0OSA1NC41MjMzQzg4LjA3NjggNjAuOTAzNCA1Ni4zNzk5IDUzLjY3MDMgNTEuMTU2MiA0Ni40NzUxQzQ1LjkzMjUgMzkuMjc5OCA2OS4xNjAxIDM0Ljg0NzEgNzcuOTQ4MiAyOC40NjdaIgogICAgICAgICAgICBmaWxsPSIjMjBFNEZGIiAvPgoKICAgICAgICA8ZmlsdGVyIGlkPSJib3R0b20tcmlnaHQtYXp1cmUiIHg9IjI2LjM5OTciIHk9IjAuMDgyNzcxMyIgd2lkdGg9IjEwMyIgaGVpZ2h0PSI4MSIKICAgICAgICAgICAgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxMiIgLz4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZz4KCgogICAgPGcgZmlsdGVyPSJ1cmwoI2JvdHRvbS1sZWZ0LWJsdWUpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLCAwKSI+CiAgICAgICAgPHBhdGgKICAgICAgICAgICAgZD0iTTE2LjE0MjEgMjkuNTA5QzI2LjkyNjYgMzQuMDQyNyAzMi41MTE2IDQ1LjIyOTIgMjguNjE2NCA1NC40OTQ5QzI0LjcyMTMgNjMuNzYwNiAxMi44MjExIDY3LjU5NjYgMi4wMzY1OCA2My4wNjNDLTguNzQ3OTIgNTguNTI5MyAtMTkuMjc4MSAyNC4wOTA0IC0xNS4zODMgMTQuODI0N0MtMTEuNDg3OCA1LjU1OTAzIDUuMzU3NjUgMjQuOTc1NCAxNi4xNDIxIDI5LjUwOVoiCiAgICAgICAgICAgIGZpbGw9IiMwNjBGOEYiIC8+CgogICAgICAgIDxmaWx0ZXIgaWQ9ImJvdHRvbS1sZWZ0LWJsdWUiIHg9Ii0zNi4yMTA3IiB5PSItNy42NDk0MSIgd2lkdGg9Ijg2IiBoZWlnaHQ9IjkzIgogICAgICAgICAgICBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEwIiAvPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9nPgoKICAgIDxnIGZpbHRlcj0idXJsKCNib3R0b20tcmlnaHQtcHVycGxlKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwgMCkiPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgIGQ9Ik0xMjAuMTM1IDE2LjI2MTNDMTAzLjU3IDE3LjMyMDkgODkuNDM4MiA3LjE4NTI1IDg4LjU3MDcgLTYuMzc3MThDODcuNzAzMiAtMTkuOTM5NiAxMDAuNDI4IC0zMS43OTMgMTE2Ljk5MyAtMzIuODUyNkMxMzMuNTU4IC0zMy45MTIxIDE2OC41ODkgMS4zMzIzMiAxNjkuNDU2IDE0Ljg5NDdDMTcwLjMyNCAyOC40NTcyIDEzNi42OTkgMTUuMjAxOCAxMjAuMTM1IDE2LjI2MTNaIgogICAgICAgICAgICBmaWxsPSIjRkY0M0NBIiAvPgoKICAgICAgICA8ZmlsdGVyIGlkPSJib3R0b20tcmlnaHQtcHVycGxlIiB4PSI0OC41Mjg5IiB5PSItNzIuODc1OSIgd2lkdGg9IjE2MSIgaGVpZ2h0PSIxMzQiCiAgICAgICAgICAgIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMjAiIC8+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2c+Cjwvc3ZnPgogICAg")});
        padding-right: 7px;
      }

      button.gradient::before {
        content: '';
        background-color: var(--color-light);
      }

      :host([status='default']) > button.gradient::before {
        mask-image: url(${l(Vt)});
        -webkit-mask-image: url(${l(Vt)});
        width: 22px;
        min-width: 22px;
        height: 22px;
        -webkit-mask-position: center;
        mask-position: center;
      }

      :host([status='success']) > button::before {
        mask-image: url(${l(Lt)});
        -webkit-mask-image: url(${l(Lt)});
        width: 22px;
        min-width: 22px;
        height: 22px;
        -webkit-mask-position: center;
        mask-position: center;
      }

      :host([status='error']) > button::before {
        mask-image: url(${l(Rt)});
        -webkit-mask-image: url(${l(Rt)});
        width: 22px;
        min-width: 22px;
        height: 22px;
        -webkit-mask-position: center;
        mask-position: center;
      }

      button.gradient:hover {
        background-color: var(--color-radix-blue-1);
      }

      button:focus,
      button:focus-visible {
        outline: 0px auto -webkit-focus-ring-color;
      }

      @container (width < ${137.9}px) {
        button {
          width: var(--radix-connect-button-height, 40px);
          max-width: ${138}px;
          max-height: ${138}px;
          justify-content: center;
          padding: 0;
        }
        button::before {
          -webkit-mask-position: center;
          mask-position: center;
        }
        button.gradient {
          background-image: url(${l("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDIgNDIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8Zz4KICAgICAgICA8cGF0aCBmaWx0ZXI9InVybCgjdG9wLWxlZnQtdGVhbCkiCiAgICAgICAgICAgIGQ9Ik0tNS4wMjMyMyAtMTUuMTI2NUMzLjYwMTggLTE5LjU0MTMgMTQuMTAyOCAtMTQuMzU5NyAxOC40MzE1IC0zLjU1Mjk5QzIyLjc2MDEgNy4yNTM2OCAxOS4yNzcyIDE5LjU5MzEgMTAuNjUyMiAyNC4wMDc5QzIuMDI3MTMgMjguNDIyNyAtMjYuODg0NiA3LjM3NTg3IC0zMS4yMTMzIC0zLjQzMDhDLTM1LjU0MTkgLTE0LjIzNzUgLTEzLjY0ODMgLTEwLjcxMTcgLTUuMDIzMjMgLTE1LjEyNjVaIgogICAgICAgICAgICBmaWxsPSIjMjFGRkJFIiAvPgogICAgICAgIDxmaWx0ZXIgaWQ9InRvcC1sZWZ0LXRlYWwiIHg9Ii01MS43NzM3IiB5PSItMzYuNzAxOSIgd2lkdGg9IjkyLjA2NTQiIGhlaWdodD0iODEuMzA5NiIKICAgICAgICAgICAgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxMCIgLz4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZz4KICAgIDxnPgogICAgICAgIDxwYXRoIGZpbHRlcj0idXJsKCNib3R0b20tcmlnaHQtYXp1cmUpIgogICAgICAgICAgICBkPSJNMjYuNjA3OSAyOS40NjdDMzQuMzgyIDIzLjA4NjkgNDQuNDMwMiAyMy43NDc3IDQ5LjA1MTIgMzAuOTQzQzUzLjY3MjEgMzguMTM4MiA1MS4xMTYgNDkuMTQzMiA0My4zNDIgNTUuNTIzM0MzNS41Njc5IDYxLjkwMzQgNy41MjgzNiA1NC42NzAzIDIuOTA3NCA0Ny40NzUxQy0xLjcxMzU3IDQwLjI3OTggMTguODMzOSAzNS44NDcxIDI2LjYwNzkgMjkuNDY3WiIKICAgICAgICAgICAgZmlsbD0iIzIwRTRGRiIgLz4KICAgICAgICA8ZmlsdGVyIGlkPSJib3R0b20tcmlnaHQtYXp1cmUiIHg9Ii0xNy43NjE4IiB5PSI1LjA4Mjc2IiB3aWR0aD0iODkuMTE0NSIgaGVpZ2h0PSI3Mi45IgogICAgICAgICAgICBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEwIiAvPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9nPgogICAgPGc+CiAgICAgICAgPHBhdGggZmlsdGVyPSJ1cmwoI2JvdHRvbS1sZWZ0LWJsdWUpIgogICAgICAgICAgICBkPSJNMTQuMjc5NiAyOS41MDlDMjMuODE5NyAzNC4wNDI3IDI4Ljc2MDIgNDUuMjI5MiAyNS4zMTQ1IDU0LjQ5NDlDMjEuODY4OCA2My43NjA1IDExLjM0MTcgNjcuNTk2NiAxLjgwMTU4IDYzLjA2M0MtNy43Mzg1NSA1OC41MjkzIC0xNy4wNTM3IDI0LjA5MDQgLTEzLjYwOCAxNC44MjQ3Qy0xMC4xNjIzIDUuNTU5MDQgNC43Mzk0NSAyNC45NzU0IDE0LjI3OTYgMjkuNTA5WiIKICAgICAgICAgICAgZmlsbD0iIzA2MEY4RiIgLz4KICAgICAgICA8ZmlsdGVyIGlkPSJib3R0b20tbGVmdC1ibHVlIiB4PSItMzQuMzQwMiIgeT0iLTcuNjQ5NDEiIHdpZHRoPSI4MC43NTE5IiBoZWlnaHQ9IjkyLjYxNzIiCiAgICAgICAgICAgIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTAiIC8+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2c+CiAgICA8Zz4KICAgICAgICA8cGF0aCBmaWx0ZXI9InVybCgjdG9wLXJpZ2h0LXB1cnBsZSkiCiAgICAgICAgICAgIGQ9Ik01NC4yNDk4IDI3LjQwMDFDMzkuNTA5MSAyOC40NjU5IDI2Ljk4NjUgMTkuMjA0IDI2LjI3OTggNi43MTI5NkMyNS41NzMgLTUuNzc4MDQgMzYuOTQ5NyAtMTYuNzY4IDUxLjY5MDMgLTE3LjgzMzhDNjYuNDMxIC0xOC44OTk3IDk3LjQyNDYgMTMuMzgzMSA5OC4xMzE0IDI1Ljg3NDFDOTguODM4MSAzOC4zNjUxIDY4Ljk5MDQgMjYuMzM0MiA1NC4yNDk4IDI3LjQwMDFaIgogICAgICAgICAgICBmaWxsPSIjRkY0M0NBIiAvPgogICAgICAgIDxmaWx0ZXIgaWQ9InRvcC1yaWdodC1wdXJwbGUiIHg9IjYuMjQ4NTIiIHk9Ii0zNy44NTk2IiB3aWR0aD0iMTExLjg5NSIgaGVpZ2h0PSI4OS40NTA2IgogICAgICAgICAgICBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEwIiAvPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9nPgo8L3N2Zz4KICAgIA==")});
          padding: 0;
        }
        button.logo::before {
          font-size: 16px;
        }
        ::slotted(*) {
          display: none;
        }
      }
    `],Ot([pt({type:String,reflect:!0})],Qt.prototype,"status",2),Ot([pt({type:Boolean})],Qt.prototype,"connected",2),Ot([pt({type:Boolean,reflect:!0})],Qt.prototype,"fullWidth",2),Ot([pt({type:String,reflect:!0})],Qt.prototype,"theme",2),Qt=Ot([ct("radix-button")],Qt);const Gt="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNCAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xMDU5Xzg3NikiPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgIGQ9Ik0xMiAyLjVDNi40OCAyLjUgMiA2Ljk4IDIgMTIuNUMyIDE4LjAyIDYuNDggMjIuNSAxMiAyMi41QzE3LjUyIDIyLjUgMjIgMTguMDIgMjIgMTIuNUMyMiA2Ljk4IDE3LjUyIDIuNSAxMiAyLjVaTTEyIDIwLjVDNy41OCAyMC41IDQgMTYuOTIgNCAxMi41QzQgOC4wOCA3LjU4IDQuNSAxMiA0LjVDMTYuNDIgNC41IDIwIDguMDggMjAgMTIuNUMyMCAxNi45MiAxNi40MiAyMC41IDEyIDIwLjVaIgogICAgICAgICAgICBmaWxsPSIjMDAzMDU3IiAvPgogICAgPC9nPgogICAgPGRlZnM+CiAgICAgICAgPGNsaXBQYXRoIGlkPSJjbGlwMF8xMDU5Xzg3NiI+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC41KSIgLz4KICAgICAgICA8L2NsaXBQYXRoPgogICAgPC9kZWZzPgo8L3N2Zz4KICAgIA==",Yt="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xMDU5Xzg5NikiPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMkMyIDE3LjUyIDYuNDggMjIgMTIgMjJDMTcuNTIgMjIgMjIgMTcuNTIgMjIgMTJDMjIgNi40OCAxNy41MiAyIDEyIDJaTTkuMjkgMTYuMjlMNS43IDEyLjdDNS4zMSAxMi4zMSA1LjMxIDExLjY4IDUuNyAxMS4yOUM2LjA5IDEwLjkgNi43MiAxMC45IDcuMTEgMTEuMjlMMTAgMTQuMTdMMTYuODggNy4yOUMxNy4yNyA2LjkgMTcuOSA2LjkgMTguMjkgNy4yOUMxOC42OCA3LjY4IDE4LjY4IDguMzEgMTguMjkgOC43TDEwLjcgMTYuMjlDMTAuMzIgMTYuNjggOS42OCAxNi42OCA5LjI5IDE2LjI5WiIKICAgICAgICAgICAgZmlsbD0iIzAwMzA1NyIgLz4KICAgIDwvZz4KICAgIDxkZWZzPgogICAgICAgIDxjbGlwUGF0aCBpZD0iY2xpcDBfMTA1OV84OTYiPgogICAgICAgICAgICA8cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IndoaXRlIiAvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICA8L2RlZnM+Cjwvc3ZnPgogICAg",Ft="data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHN0eWxlPi5zcGlubmVyX2FqUFl7dHJhbnNmb3JtLW9yaWdpbjpjZW50ZXI7YW5pbWF0aW9uOnNwaW5uZXJfQXRhQiAuNzVzIGluZmluaXRlIGxpbmVhcn1Aa2V5ZnJhbWVzIHNwaW5uZXJfQXRhQnsxMDAle3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19PC9zdHlsZT48cGF0aCBkPSJNMTIsMUExMSwxMSwwLDEsMCwyMywxMiwxMSwxMSwwLDAsMCwxMiwxWm0wLDE5YTgsOCwwLDEsMSw4LThBOCw4LDAsMCwxLDEyLDIwWiIgb3BhY2l0eT0iLjI1Ii8+PHBhdGggZD0iTTEwLjE0LDEuMTZhMTEsMTEsMCwwLDAtOSw4LjkyQTEuNTksMS41OSwwLDAsMCwyLjQ2LDEyLDEuNTIsMS41MiwwLDAsMCw0LjExLDEwLjdhOCw4LDAsMCwxLDYuNjYtNi42MUExLjQyLDEuNDIsMCwwLDAsMTIsMi42OWgwQTEuNTcsMS41NywwLDAsMCwxMC4xNCwxLjE2WiIgY2xhc3M9InNwaW5uZXJfYWpQWSIvPjwvc3ZnPg==",Xt="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KICA8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNjE0XzI4NDkpIj4KICAgIDxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMkMyIDE3LjUyIDYuNDggMjIgMTIgMjJDMTcuNTIgMjIgMjIgMTcuNTIgMjIgMTJDMjIgNi40OCAxNy41MiAyIDEyIDJaTSAxMS4xOTQzIDEyIEwgOCA4LjgwNTcxIEwgOC44MDU3MSA4IEwgMTIgMTEuMTk0MyBMIDE1LjE5NDMgOCBMIDE2IDguODA1NzEgTCAxMi44MDU3IDEyIEwgMTYgMTUuMTk0MyBMIDE1LjE5NDMgMTYgTCAxMiAxMi44MDU3IEwgOC44MDU3MSAxNiBMIDggMTUuMTk0MyBaIiBmaWxsPSIjOEE4RkE0Ii8+CiAgPC9nPgogIDxkZWZzPgogICAgPGNsaXBQYXRoIGlkPSJjbGlwMF82MTRfMjg0OSI+CiAgICAgIDxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0id2hpdGUiLz4KICAgIDwvY2xpcFBhdGg+CiAgPC9kZWZzPgo8L3N2Zz4=",Pt=(t,e=" ")=>{const i=new Date(Number(t)),o=(t=>{const e=new Date;return t.getDate()==e.getDate()&&t.getMonth()==e.getMonth()&&t.getFullYear()==e.getFullYear()})(i),r=i.toLocaleTimeString("en-Gb",{hour:"numeric",minute:"numeric",hour12:!1});return o?`Today${e}${r}`:`${i.getDate()} ${i.toLocaleString("en-US",{month:"short"})}${e}${r}`};var Ht=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,Jt=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?Bt(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&Ht(e,i,n),n};let Kt=class extends lt{constructor(){super(...arguments),this.mode=Dt.light,this.header=""}render(){const t=`${this.icon?"30px":""} 1fr ${this.timestamp?"60px":""}`;return G`<div class="card" style=${bt({gridTemplateColumns:t})}>
      <i></i>
      <div class="content">
        <span>${this.header}</span>
        <slot />
      </div>
      ${(()=>this.timestamp?G`<div class="timestamp">${Pt(this.timestamp)}</div>`:"")()}
    </div>`}};Kt.styles=[xt,d`
      :host {
        background-color: var(--radix-card-background);
        color: var(--radix-card-text-color);
        display: block;
        padding: 11px 20px;
        user-select: none;
        border-radius: 12px;
        width: 100%;
        box-sizing: border-box;
      }

      :host(.inverted) {
        background-color: var(--radix-card-inverted-background);
        color: var(--radix-card-inverted-text-color);
      }

      :host(.inverted) .card i::before {
        background-color: var(--radix-card-inverted-text-color);
      }

      :host(.dimmed) .card i::before {
        background-color: var(--radix-card-text-dimmed-color);
      }

      :host(.dimmed) .content {
        color: var(--radix-card-text-dimmed-color);
      }

      .timestamp {
        text-align: right;
        color: var(--radix-card-text-dimmed-color);
        font-size: 12px;
      }

      .card {
        display: grid;
        align-items: center;
        column-gap: 10px;
      }

      i::before {
        content: '';
        display: block;
        -webkit-mask-size: cover;
        mask-size: cover;
        background-color: var(--radix-card-text-color);
      }

      span {
        display: block;
        font-weight: 600;
        font-size: 14px;
      }

      p {
        margin: 0;
      }

      :host([icon='unchecked']) i::before {
        -webkit-mask-image: url(${l(Gt)});
        mask-image: url(${l(Gt)});
        width: 24px;
        height: 24px;
      }

      :host([icon='pending']) i::before {
        -webkit-mask-image: url(${l(Ft)});
        mask-image: url(${l(Ft)});
        width: 24px;
        height: 24px;
      }

      :host([icon='checked']) i::before {
        -webkit-mask-image: url(${l(Yt)});
        mask-image: url(${l(Yt)});
        width: 24px;
        height: 24px;
      }

      :host([icon='error']) i::before {
        -webkit-mask-image: url(${l(Xt)});
        mask-image: url(${l(Xt)});
        width: 24px;
        height: 24px;
      }
    `],Jt([pt({type:String,reflect:!0})],Kt.prototype,"mode",2),Jt([pt({type:String,reflect:!0})],Kt.prototype,"icon",2),Jt([pt({type:String})],Kt.prototype,"header",2),Jt([pt({type:String,reflect:!0})],Kt.prototype,"timestamp",2),Kt=Jt([ct("radix-card")],Kt);const qt="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE0MDNfMTI3MSkiPgo8cGF0aCBkPSJNNS45OTkzNSAzLjgzMzk4VjUuMTY3MzJIMTAuMzkyN0wyLjY2NjAyIDEyLjg5NEwzLjYwNjAyIDEzLjgzNEwxMS4zMzI3IDYuMTA3MzJWMTAuNTAwN0gxMi42NjZWMy44MzM5OEg1Ljk5OTM1WiIgZmlsbD0iIzhBOEZBNCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE0MDNfMTI3MSI+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC41KSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=";var $t=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,te=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?_t(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&$t(e,i,n),n};let ee=class extends lt{constructor(){super(...arguments),this.mode=Dt.light,this.href="",this.displayText=""}render(){return G`<a target="_blank" href=${this.href} class="link"
      >${this.displayText}
      <i class="icon-north-east-arrow"></i>
    </a>`}};ee.styles=[xt,d`
      .link {
        color: var(--radix-link-color);
        font-weight: 600;
        text-decoration: none;
        display: flex;
        align-items: center;
        font-size: 14px;
      }

      .icon-north-east-arrow::before {
        content: '';
        display: block;
        -webkit-mask-size: cover;
        mask-size: cover;
        background-color: var(--radix-card-text-dimmed-color);
        -webkit-mask-image: url(${l(qt)});
        mask-image: url(${l(qt)});
        width: 16px;
        height: 16px;
      }
    `],te([pt({type:String,reflect:!0})],ee.prototype,"mode",2),te([pt({type:String})],ee.prototype,"href",2),te([pt({type:String})],ee.prototype,"displayText",2),ee=te([ct("radix-link")],ee);const ie=t=>t?`${t.slice(0,4)}...${t.slice(t.length-6,t.length)}`:"";var oe=Object.defineProperty,re=Object.getOwnPropertyDescriptor,ne=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?re(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&oe(e,i,n),n};let ae=class extends lt{constructor(){super(...arguments),this.mode=Dt.light,this.address="",this.label="",this.appearanceId=0}formatAccountLabel(t){return t.length>14?`${t.slice(0,12).trimEnd()}...`:t}render(){return G` <span class="label"
        >${this.formatAccountLabel(this.label)}</span
      >
      <a
        class="address"
        target="_blank"
        href=${`${this.address}`}
        @click=${t=>{t.preventDefault(),this.dispatchEvent(new CustomEvent("onLinkClick",{bubbles:!0,composed:!0,detail:{type:"account",data:this.address}}))}}
      >
        ${ie(this.address)}<i
          @click=${t=>{t.preventDefault(),t.stopImmediatePropagation(),navigator.clipboard.writeText(this.address)}}
        ></i>
      </a>`}};ae.styles=[xt,d`
      :host {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        justify-content: space-between;
        margin-top: 0.5rem;
        border-radius: 12px;
        color: var(--color-light);
        font-size: 14px;
        height: 40px;
        align-items: center;
        padding: 0 20px;
      }

      .label {
        font-weight: 600;
        color: var(--color-light);
      }

      a {
        color: var(--color-light);
        display: flex;
        align-items: center;
        gap: 4px;
        opacity: 0.8;
        font-size: 12px;
      }

      i {
        background-image: url(${l("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxMyAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIG9wYWNpdHk9IjAuOCI+CiAgICAgICAgPHBhdGggb3BhY2l0eT0iMC44IgogICAgICAgICAgICBkPSJNOC4xMjQ5OCAwLjU0MTc0OEgyLjE2NjY1QzEuNTcwODEgMC41NDE3NDggMS4wODMzMSAxLjAyOTI1IDEuMDgzMzEgMS42MjUwOFY4LjY2Njc1QzEuMDgzMzEgOC45NjQ2NiAxLjMyNzA2IDkuMjA4NDEgMS42MjQ5OCA5LjIwODQxQzEuOTIyOSA5LjIwODQxIDIuMTY2NjUgOC45NjQ2NiAyLjE2NjY1IDguNjY2NzVWMi4xNjY3NUMyLjE2NjY1IDEuODY4ODMgMi40MTA0IDEuNjI1MDggMi43MDgzMSAxLjYyNTA4SDguMTI0OThDOC40MjI5IDEuNjI1MDggOC42NjY2NSAxLjM4MTMzIDguNjY2NjUgMS4wODM0MUM4LjY2NjY1IDAuNzg1NDk4IDguNDIyOSAwLjU0MTc0OCA4LjEyNDk4IDAuNTQxNzQ4Wk0xMC4yOTE2IDIuNzA4NDFINC4zMzMzMUMzLjczNzQ4IDIuNzA4NDEgMy4yNDk5OCAzLjE5NTkxIDMuMjQ5OTggMy43OTE3NVYxMS4zNzUxQzMuMjQ5OTggMTEuOTcwOSAzLjczNzQ4IDEyLjQ1ODQgNC4zMzMzMSAxMi40NTg0SDEwLjI5MTZDMTAuODg3NSAxMi40NTg0IDExLjM3NSAxMS45NzA5IDExLjM3NSAxMS4zNzUxVjMuNzkxNzVDMTEuMzc1IDMuMTk1OTEgMTAuODg3NSAyLjcwODQxIDEwLjI5MTYgMi43MDg0MVpNOS43NDk5OCAxMS4zNzUxSDQuODc0OThDNC41NzcwNiAxMS4zNzUxIDQuMzMzMzEgMTEuMTMxMyA0LjMzMzMxIDEwLjgzMzRWNC4zMzM0MUM0LjMzMzMxIDQuMDM1NSA0LjU3NzA2IDMuNzkxNzUgNC44NzQ5OCAzLjc5MTc1SDkuNzQ5OThDMTAuMDQ3OSAzLjc5MTc1IDEwLjI5MTYgNC4wMzU1IDEwLjI5MTYgNC4zMzM0MVYxMC44MzM0QzEwLjI5MTYgMTEuMTMxMyAxMC4wNDc5IDExLjM3NTEgOS43NDk5OCAxMS4zNzUxWiIKICAgICAgICAgICAgZmlsbD0id2hpdGUiIC8+CiAgICA8L2c+Cjwvc3ZnPgogICAg")});
        display: inline-block;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center bottom;
        width: 13px;
        height: 13px;
      }

      .label,
      a,
      i {
        text-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.08);
      }

      :host([appearanceId='0']) {
        background: linear-gradient(276.58deg, #01e2a0 -0.6%, #052cc0 102.8%);
      }

      :host([appearanceId='1']) {
        background: linear-gradient(
          276.33deg,
          #ff43ca -14.55%,
          #052cc0 102.71%
        );
      }

      :host([appearanceId='2']) {
        background: linear-gradient(
          276.33deg,
          #20e4ff -14.55%,
          #052cc0 102.71%
        );
      }

      :host([appearanceId='3']) {
        background: linear-gradient(94.8deg, #00ab84 -1.2%, #052cc0 103.67%);
      }

      :host([appearanceId='4']) {
        background: linear-gradient(94.62deg, #ce0d98 -10.14%, #052cc0 104.1%);
      }

      :host([appearanceId='5']) {
        background: linear-gradient(
          276.33deg,
          #052cc0 -14.55%,
          #0dcae4 102.71%
        );
      }

      :host([appearanceId='6']) {
        background: linear-gradient(90.89deg, #003057 -2.21%, #03d597 102.16%);
      }

      :host([appearanceId='7']) {
        background: linear-gradient(276.23deg, #f31dbe -2.1%, #003057 102.67%);
      }

      :host([appearanceId='8']) {
        background: linear-gradient(276.48deg, #003057 -0.14%, #052cc0 102.77%);
      }

      :host([appearanceId='9']) {
        background: linear-gradient(276.32deg, #1af4b5 -5.15%, #0ba97d 102.7%);
      }

      :host([appearanceId='10']) {
        background: linear-gradient(276.23deg, #e225b3 -2.1%, #7e0d5f 102.67%);
      }

      :host([appearanceId='11']) {
        background: linear-gradient(276.48deg, #1f48e2 -0.14%, #040b72 102.77%);
      }
    `],ne([pt({type:String,reflect:!0})],ae.prototype,"mode",2),ne([pt({type:String})],ae.prototype,"address",2),ne([pt({type:String})],ae.prototype,"label",2),ne([pt({type:Number,reflect:!0})],ae.prototype,"appearanceId",2),ae=ne([ct("radix-account")],ae);var se=Object.defineProperty,le=Object.getOwnPropertyDescriptor,de=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?le(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&se(e,i,n),n};let ce=class extends lt{constructor(){super(...arguments),this.mode=Dt.light,this.type="dataRequest",this.status="pending",this.showCancel=!1,this.timestamp="",this.id="",this.transactionIntentHash=""}render(){const t=this.getIconFromStatus(),e=this.getStylingFromStatus(),i={sendTransaction:{pending:"Pending Transaction",fail:"Transaction Failed",cancelled:"Transaction Cancelled",success:"Send transaction",content:G`
          ${this.renderTxIntentHash()}
          ${this.getRequestContentTemplate("Open your Radix Wallet app to review the transaction")}
        `},dataRequest:{pending:"Data Request Pending",fail:"Data Request Rejected",cancelled:"Data Request Rejected",success:"Data Request",content:this.getRequestContentTemplate("Open Your Radix Wallet App to complete the request")},loginRequest:{pending:"Login Request Pending",fail:"Login Request Rejected",cancelled:"Login Request Rejected",success:"Login Request",content:this.getRequestContentTemplate("Open Your Radix Wallet App to complete the request")}};return G`<radix-card
      icon="${t}"
      class=${e}
      mode=${this.mode}
      timestamp="${this.timestamp}"
      header="${i[this.type][this.status]}"
    >
      ${i[this.type].content}
    </radix-card>`}getRequestContentTemplate(t){return"pending"===this.status?G`<div class="request-content">
          ${t}
          ${this.showCancel?G`<div class="cancel" @click=${this.onCancel}>Cancel</div>`:""}
        </div>`:""}getIconFromStatus(){return"pending"===this.status?"pending":"cancelled"===this.status||"fail"===this.status?"error":"checked"}getStylingFromStatus(){return ht({dimmed:"fail"===this.status||"cancelled"===this.status,inverted:"pending"===this.status})}onCancel(t){this.dispatchEvent(new CustomEvent("onCancelRequestItem",{detail:{...t,id:this.id},bubbles:!0,composed:!0}))}renderTxIntentHash(){return this.transactionIntentHash?G`<div class="transaction">
          <span class="text-dimmed">ID:</span>
          <radix-link
            displayText="${ie(this.transactionIntentHash)}"
            mode=${this.mode}
            @click=${t=>{t.preventDefault(),this.dispatchEvent(new CustomEvent("onLinkClick",{bubbles:!0,composed:!0,detail:{type:"transaction",data:this.transactionIntentHash}}))}}
          ></radix-link>
        </div>`:""}};ce.styles=[xt,d`
      :host {
        display: flex;
        width: 100%;
        margin-bottom: 10px;
      }

      .text-dimmed {
        color: var(--radix-card-text-dimmed-color);
        margin-right: 5px;
      }

      .transaction {
        font-weight: 600;
        text-decoration: none;
        display: flex;
        align-items: center;
        font-size: 14px;
      }

      .cancel {
        cursor: pointer;
        text-decoration: underline;
      }

      .request-content {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 14px;
      }
    `],de([pt({type:String,reflect:!0})],ce.prototype,"mode",2),de([pt({type:String})],ce.prototype,"type",2),de([pt({type:String})],ce.prototype,"status",2),de([pt({type:Boolean})],ce.prototype,"showCancel",2),de([pt({type:String})],ce.prototype,"timestamp",2),de([pt({type:String})],ce.prototype,"id",2),de([pt({type:String})],ce.prototype,"transactionIntentHash",2),ce=de([ct("radix-request-card")],ce);var ge=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,Me=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?pe(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&ge(e,i,n),n};let ue=class extends lt{constructor(){super(...arguments),this.mode=Dt.light,this.requestItems=[]}render(){return(this.requestItems||[]).map((t=>G`<radix-request-card
        type="${t.type}"
        status="${t.status}"
        id="${t.id}"
        ?showCancel="${t.showCancel}"
        @onCancel=${t=>{this.dispatchEvent(new CustomEvent("onCancel",{detail:t.detail,bubbles:!0,composed:!0}))}}
        timestamp=${t.timestamp}
        mode=${this.mode}
      ></radix-request-card>`))}};ue.styles=[xt],Me([pt({type:String,reflect:!0})],ue.prototype,"mode",2),Me([pt({type:Array})],ue.prototype,"requestItems",2),ue=Me([ct("radix-request-cards")],ue);var Ie=Object.defineProperty,he=Object.getOwnPropertyDescriptor,Ne=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?he(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&Ie(e,i,n),n};let Ae=class extends lt{constructor(){super(...arguments),this.mode=Dt.light,this.isMobile=!1,this.status=mt.default,this.isWalletLinked=!1,this.isExtensionAvailable=!1,this.requestItems=[]}render(){let t=this.renderConnectTemplate();return this.isMobile?t=this.renderMobileTemplate():this.isExtensionAvailable?this.isWalletLinked?this.status===mt.pending&&(t=this.renderRequestItemsTemplate()):t=this.renderCeNotLinkedTemplate():t=this.renderCeNotInstalledTemplate(),G`
      <div class="wrapper connect-your-wallet">
        <img class="logo" src=${"data:image/png;base64,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"} />
        <span class="text connect">Connect Your Radix Wallet</span>
      </div>
      ${t}
    `}renderMobileTemplate(){return G` <div class="mobile-wrapper">
      <div class="header">Mobile dApps are coming soon.</div>
      <div class="content">
        For now, please connect to Radix dApps using a desktop web browser.
      </div>
    </div>`}renderRequestItemsTemplate(){return G`<radix-request-cards
      class="request-cards"
      mode=${this.mode}
      .requestItems=${this.requestItems}
    ></radix-request-cards>`}connectNowButtonTemplate(){const t=!this.isExtensionAvailable||!this.isWalletLinked;return G`<button
      class="${ht({"connect-now":!0,disabled:t})}"
      @click=${()=>{t||this.dispatchEvent(new CustomEvent("onConnect",{bubbles:!0,composed:!0}))}}
    >
      Connect Now
    </button>`}renderCeNotInstalledTemplate(){return G`<div class="info">
        Before you can connect your Radix Wallet, you need the Radix Connector
        browser extension.
      </div>

      <div class="cta-link">
        <radix-link
          mode=${this.mode}
          href="http://wallet.radixdlt.com/"
          displayText="Download and Setup Guide"
          @click=${()=>{this.dispatchEvent(new CustomEvent("onLinkClick",{bubbles:!0,composed:!0,detail:{type:"setupGuide"}}))}}
        ></radix-link>
      </div>

      ${this.connectNowButtonTemplate()} `}renderCeNotLinkedTemplate(){return G`<div class="info">
        To connect your Radix Wallet, you need to link it to your Radix
        Connector browser extension using a QR code.
      </div>

      <button
        class="${ht({"connect-now":!0})}"
        @click=${()=>{this.dispatchEvent(new CustomEvent("onLinkClick",{bubbles:!0,composed:!0,detail:{type:"showQrCode"}}))}}
      >
        Open QR Code to Link Wallet
      </button>

      <div class="cta-link">
        <radix-link
          mode=${this.mode}
          href="http://wallet.radixdlt.com/"
          displayText="Download and Setup Guide"
          @click=${()=>{this.dispatchEvent(new CustomEvent("onLinkClick",{bubbles:!0,composed:!0,detail:{type:"setupGuide"}}))}}
        ></radix-link>
      </div>

      ${this.connectNowButtonTemplate()} `}renderConnectTemplate(){return G` ${this.connectNowButtonTemplate()} `}};Ae.styles=[xt,d`
      :host {
        width: 100%;
      }
      .wrapper.connect-your-wallet {
        display: flex;
        align-items: center;
        margin: 1rem 0.5rem 1.5rem;
        justify-content: center;
      }

      .request-cards {
        display: block;
        max-height: 410px;
        overflow-y: auto;
      }

      .card {
        margin-bottom: 10px;
      }
      .info {
        margin-bottom: 20px;
        font-size: 14px;
        text-align: center;
      }

      .connect-now {
        width: 100%;
        color: #fff;
        border-radius: 12px;
        height: 40px;
        font-size: 14px;
        font-weight: bold;
      }

      .connect-now:not(.disabled) {
        background: var(--color-radix-blue-2);
        cursor: pointer;
      }

      .connect-now.disabled {
        background: var(--radix-connect-now-disabled-button-background);
        color: var(--radix-connect-now-disabled-button-text);
      }

      .cta-link {
        display: flex;
        justify-content: center;
        margin: 25px 0 20px;
      }

      .logo {
        width: 46px;
        align-self: center;
      }

      .text.connect {
        color: var(--color-text-primary);
        font-size: 18px;
        width: 7.2rem;
        margin-left: 1rem;
        font-weight: 600;
        text-align: left;
      }

      .subtitle {
        color: var(--radix-card-text-dimmed-color);
      }

      .mobile-wrapper {
        display: flex;
        flex-direction: column;
        text-align: center;

        align-items: center;
        margin-bottom: 18px;
        margin-top: 25px;
        font-size: 14px;
      }

      .mobile-wrapper .header {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      .mobile-wrapper .content {
        font-size: 16px;
        margin-bottom: 5px;
      }
      button {
        font-family: 'IBM Plex Sans', sans-serif;
      }
    `],Ne([pt({type:String,reflect:!0})],Ae.prototype,"mode",2),Ne([pt({type:Boolean})],Ae.prototype,"isMobile",2),Ne([pt({type:String})],Ae.prototype,"status",2),Ne([pt({type:Boolean})],Ae.prototype,"isWalletLinked",2),Ne([pt({type:Boolean})],Ae.prototype,"isExtensionAvailable",2),Ne([pt({type:Array})],Ae.prototype,"requestItems",2),Ae=Ne([ct("radix-not-connected-page")],Ae);var be=Object.defineProperty,xe=Object.getOwnPropertyDescriptor,me=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?xe(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&be(e,i,n),n};let De=class extends lt{constructor(){super(...arguments),this.mode=Dt.light,this.persona="",this.personaData=[]}render(){return G`<radix-card mode=${this.mode}>
      <div
        class=${ht({center:(this.personaData||[]).length<2,"persona-card":!0})}
      >
        <div class="placeholder">
          <div
            class="avatar"
            style=${bt({backgroundImage:`url(${l(this.avatarUrl)})`})}
          ></div>
        </div>
        <div class="content">
          <span class="persona">${this.persona}</span>
          <ul>
            ${(this.personaData||[]).map((t=>G`<li>${t}</li>`))}
          </ul>
        </div>
      </div></radix-card
    >`}};De.styles=[xt,d`
      :host {
        display: flex;
        width: 100%;
      }

      .avatar {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        align-self: center;
        border: 2px solid var(--radix-avatar-border-color);
      }

      .placeholder {
        width: 64px;
        height: 64px;
        background-image: url(${l("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA4NCA4NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGNpcmNsZSBjeD0iNDIiIGN5PSI0MiIgcj0iNDEiIGZpbGw9InVybCgjcGF0dGVybjApIiBzdHJva2U9IiM2NTY1NjUiIHN0cm9rZS13aWR0aD0iMCIgLz4KICAgIDxkZWZzPgogICAgICAgIDxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgogICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMTA1OV8zMTgiIHRyYW5zZm9ybT0ic2NhbGUoMC4wMDYyNSkiIC8+CiAgICAgICAgPC9wYXR0ZXJuPgogICAgICAgIDxpbWFnZSBpZD0iaW1hZ2UwXzEwNTlfMzE4IiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIKICAgICAgICAgICAgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFLQUFBQUNnQ0FZQUFBQ0x6MmN0QUFBQUNYQklXWE1BQUJZbEFBQVdKUUZKVWlUd0FBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQm5TU1VSQlZIZ0I3VjFiZGh2SG1hNitnS1FvVVNRbDJlZG9USmxnWGlZemt6T1duQVdJOGdMR3pteEFURFlRZVRaZ0todXdNaHNJUFJzWWF3V21ad09Tbi9JSVNKYXRPWWtsUWhLdlFIZFY2cXRHUVkzcTZrc0JEYUFhNk04SEpnbXhpTDU4L2Qvci94MVNZNEJXNjJpRE5IcE5RdDJtNzN2Yk5BeDJITmRkSjQ3VFpJeHNPSVJzUkwvSm1pbC9va09JMDJIOHErUGdlOVpoSVgzbWVuNHJDTUpueEtYdG5hMFBuNUlhQXpoa1FTSEk1b1c3cnNOdU81NzdDV0hPN1F4aWxRcEduS2VPdzlxY25EOVFRZzVKNEQvZDJkbnNrQVhFd2hBd2ttN2hGeTdqaEhPOXo2ZEZ0cUlRcENUc2FSaXl4NlRoUGQyNXVka21DNEM1Sm1Ecng3L3YrcjUvbHpHMlMvQ3FFaHpuMENIT3R3SHRmVC9QYW52dUNOaDYrYkxwazVYN2pMSTkyNlRjR0dnelNoOVQzMzgwYjVKeExnZ0k5ZW92ay91TXNDOHFKK2xNd1NXajZ6Z0hXemMzdnlGemdFb1RzUFh5aUVzN1RqeEtINUNCaDdvd2FQUFhZZWk2RDZzc0ZTdEpRTmgybnVkOU5mZlNyamdPcWtyRVNoR3dKbDR1S2tmRVNoQVFxdFpqN0M4MThRcWpNa1MwbW9Cd0xyeGx3aVdlc1BGcW1NTjZJbHBMd0IvLy8raVBQRk93VHhiUHVTZ2JiZGQxOTIzMW1xMGpZT3ZGMFczUFpWL1g2clowdExrMHZHZWJOSFNKUmZqeDVkRlhua09mMU9TYkNKb2VwUzFjWTJJUnJKQ0FjREpjR3Y0dlR6M2RKaldtQVd1azRjd2xJR3c5L21RK3FjazNWVUFhUG5uMjg2dVpPM2N6azRDMWgyc0pIUElvdk9DZThvekt3V1pDd0ZybFdvZVpxZVNwcTJDUnphaFZybTJBU3Y2dTllSnZVNzhuVXlYZ2k1ZEg5ejNYL1k3VXNUMGIwZlFjYitwMjRkUUlDUGVmVW5wQWFsZ05oNUd2cHhtcW1Zb05pQk5pVkdRMWFsUUVEcytlM0xxNStaQk1HQk1uNFBPZmo3NnVQZDFxWWhva25DZ0JuLzkwOUJkQzZCNnBVV1VjZlB6UjlkK1RDV0ZpTm1Ca1I5VGttd1BzUGYvNTFkZGtRcGdJQVd1YmI4N0F5SU5KT1NhbHErQ2FmUE9MU2RpRXBSS3dYOFAzaU5TWVc3aXV1MWRtYldGcEJCUjFmQ2lscWpoNHJKS3JIRWJDTUJ5ODUza2V0a1BpNHVldVozeXRmRWs0ZksxOHpRTkNTdS90M1ByZ2tKU0FVcTZJMkxQQlV6bjgyeWFwRUNnbjJVWDNnb1JCUUhwQlQvd2NKNDRLRU1qM0c4VGxoR3cwR3VLRlh3L0RZRURjdlBWY2pZbXZudWNMUWhjaHRZWG84Tnp4blRKeXgyTVRVRlMxTEFuSjF5UVZBSWh5Zm5aR3pzL1ArUGNoR1JlTzR3b2lqa29tRUxMUkozV1Z5SWhlTnJUcjNCdTNpc1luWXlJcXFiS2ZmTDF1bDV5ZW5wQmVyMHZLQkdPVWRMa1VCU0RWSkJrTHI2ZXg5VDdXTDFXQ2lBNWh0NzFsQnMvNFN6SUd4cEtBVlhBNkFxNWVUNDdmR1JFdlRnQ2hVSE5VcXdvUWNXbHBtRWhHNnl0RVJPYVFMN2YvNmZySUhCaVpnSDI3RDZyWHlzb1dxTm96THZIT3prNHpmdzhTeStNcUVJVHhmZGhsbm5nZmhBbTRYUWpKR2YrYjBTc1VUa29lcVZaWHI1RFZ5NWYxNjROUVNNL01ZK1BIQkNKYWpySHN3WkVKK1B5blZ5MWlxZDBIcWZmMmJVYzRGVHFBZEV2TEsyU1p2M1JTQnNRNFB6OFg2bEVINll6QWZnTkpUMDlPVXUxSjJIYnI2NXVSSjYzNW5EQ2tuT1FYcVdUR1p5MnZYTEphR3NJZTNQN28yaDB5QWtZaW9NM0I1Z3RPbk9QanQ5b2JDdUt0WHI2U0tWVkEzalJDUURwQ0t1bklCS2NtallnZzRkcmExWkUvRnlSc0xDMExDVzByT0I4ZWJ0LzZZSjhZd3BpQWZkWGJJaFlDQkRnOVBVNjhEK0pjdnJMR0pkNXk1bnJZaVhHVksyRkNnQ3dpWHI2OFJpNnRybWF1enlLaTdTbzVaT0VkMDJhYXhuSzlIKyt6RG1ua1c3bTBTalkycjQxTVBqZ0UrQnRGcGM4S1Y1ZnJHNXRjYmE0ay91M2s1SjA0eml6NDR2TXVhVDhQeDFlMkYxOG1QTmMzTGxvd0l1RHpGNy9zRVF2dHZqVHlRZXBkNGE4OCt5bU5mRXRjNnNGT05NMWdlRUxscmc4NUlJTmo1Y2Q1ZHBydEdDRzJDQnRWSisyc0ppRmp1NllsL1lXdnJLM1pEbmk1Q0xQRUFjS3NiMXdySkxXUUJibTRPRStzQndGMHRwNHBvSktQMzcxTnZBOHBXVVNkcHFsa0hKK2xObUVuN0xvN1JRUFVoU1dnRzRiN3hETHlJUlF5RHZuaVFlVDRlbmlkWlpBUGdFcmUyTHlla0tKdjMzU0c4czFwd0huZ2VOVDFJQ1dsbEZpSURXK1pGaTdkS2lRQmJYUThjUEU3bmRkRG9SWVQ4Z0dJRTZxU0JmYmVKRUllT2trSUNRaEpXQVFnNndYL0czRWdETFNpSWFjTjRMSEJuU0t4d1VKWHVpLzlyQUxJbzhiNUVHSXBTajdZVVFtMXhtMitTY1hiUUJUWXBPb3huSjRjRjFvUGlZemppd054eXFEWEl6WkNOQlF0Z055ckRlbkhuN0Q3eENKQUdxZ1pEaGo4bHk2dEZsb1AxYXM2SFFncyt6eE9PRW5nK0pZVWJ4em5VVVFWQXpnK0hHY2NJTEdWcXBnN0pHaENrUGRydVFTMFVmcTllWE0wOURQaWZFaDdGY1hGUmRMdVE0eHRHb0IzTE5OOUFLU3d6a2xKQTQ1VFZibXFIV3NMUkQvdkhHUVMwRWJwSjhxb0ZJbFIxSTRDSUczVTlRZ3lUOHVPd3VkY1dVdXE0cUtoRmVtaHg0SHpLU3BGcDRvQ1VqQ1RnRFpLUDVSVXhZR0FyNG5IcXQ1b0JKcW5IYzZBTGFlR1lQSUMxSEhnZkYzbG5HMk5EZVpKd1ZRQzJpajlZTGNsSEE4RDFRdmJMeUg5WnBUYVVvUFVwcmFjZXR4V1MwSE9wYlIvVGlXZ2pkTHZYQWtZRzB1L2JsTDZ6YXJLQkFSU1NYU2VVem9XaDA0S0lxaHVJOXdnMkV2OXQ3Ui80Tkx2THJFTVhZV0FDRzJZUUpVUXFrYzViYWlGQ2VvRGxnZVZ3TmliWWlONHZQS1BZbHl1QmxvQzJwano3U3JwS0ZFYVphQSsxUUxTYUdOUU9kbU9VWUhqanpzL1VLTW10aHlPUDc2ZUtidjVMTUtHMitqdDZmNUJMd0ZkMXlyYkQxQkRKMHM1MVMwcVZQWGt6cGg4Z0VqN0tjSGxvR2NteFZEK0g0ZXRhdGh4L2M5MTd5Y0lLQXhHQzhja2hNRnd4SC9aa0lCVUtYK2Z0ZnFWOEpYNG8ybE16MU04ZU1xc3pBOExaK1RseTVkTjllMEVBYm5CYUYwcnRXaC94dkNUYmVxOXF0NnZMU1h1eTBwTUx3ak1VbXZxZVRBN0N4UUV1b0cvcDc2WHVBdmNZUHljV0FZMTM5a3dUSm1wNFEyM3Z6bmNCamlpNDhKd1pvUWEySEZxeHdXeDNsSVNjbTdkNTRIcG9mZUdDUGppeFJHYVZEZUpaUWlWOG5iUEg0K0FqbVViZlB6R3NCcnRHVXBCMVpteVdBbzIrV3MzL3NiUW5lQSsyQzZ4RUFuMWFTcTlsS29YMTdHTGdLNWFGV2V3aHppQ295dzNYVDg5dUZrRVRQTlVaZzJWZ0tiaEUvV0cyRlkvbHdnb0c0WlNFbmFneFFSMFBPOHVqd2tPZmg0Y3VhM2VydzZ1TVFIdE5jeUJzVU5DeWdObHJTY01SQndiQktVSEJQUjZZVDA0cHNaVTRIbmhGL0w3QVFHWlM3NGdOV3BNQWN4aEEyRTNJS0Rya0U5SVJVQ04wMDEyTjRha0phZlBiSE95VkNEVUorMUFjYVJJRkRPTFo3ZXBZUk5Lell4czFlbXcyVWdISEVNQzJSeDhUa0dUOU8zQTZFejl3R3I3TCtFbEdqYVdUQkRZTWlNOUNOVTh0U0VCbGZPcFFpdGdub0VVMVZadS8zKzd4R0tvWVJkVGxXVzdCRXlFbVZ3enI1aXFZYVlLOUJVTWFDQzZhWWtqNVFkc3RmMm5WbndFaG5WdnR1ZEwxVHkzNmU0OHBrazEyZzdtUmlaZlJFRENtc1JpcUhWdlZMT3hLQXMyNTBzVFZkcWUyZjRVbklldUk3L3Q0Tm1mVCtDSUNBTGE3SUJJcU5zbTFmckFQSXlyeGljRnRmeEt6UXZuSVpHbXRLRE9zU0NhQklXcS9RSUU2NkdXWDVuV3pibGpxdkZKUWEyQVZyc2Y1RUU5RDFNSk9sTTBlazJYMHJCSktnRDF4cGp1SXROSndGazdJN0Q5eHFsejFPM3lxOUtvaHlXbnNlMHlselpKQmVCNTNsaTd5RVRkblVMQ1dmZFZVZHVMWUplZkNZRlUreEYxaFZVaVlNQjZPeTdQaXpSSlJhRHJxMklDdFF3ZjFjZXprb0s2YmxjbTZqZHFjSzdzOG12WXNjMmdNRGozZU5iRzNTWVZnZHFLRE9USjZ6WWFoMjRYMmF5a29OcmhBZEpMTGMvUEFsUzM2djNhM01SY0I4NjlkZFNtV3publF3ZGNaTFVERmxyZUZyVUY1WGlGT0dZaEJYWFNUOWZPTncyUWZvbHRDb2JPaXhWZ2pFdEFSaXREUU9EUzZ1V0VGRk9sU1JhZ3B0VDEwKzZyb3BOK0pwdnNZZnRWWGZvQnpPRmhHRWJjU2hGUUp3WGhqSmgwbDFLZEdVaVRhVzNvaHQwNmp2VFRlczVWbEg0RUNSQm5nN3RNckZJRUJOQUoxVlh5cGUvZXZUVnE5S2g2eEdqN01lbnNDSTVQN1lpS0hYNUZwVi9VV0RQWjI3Q0swazhDUG52bENBaXNYYjA2OURQaVlXSThWMEVTSmRyZGNwV0didm1Uc2dkQlBqVFdWRlhubGJYMVF1dXhEbU5tMWVOYk51eVBZeG1hMVFrYUtZQWFWVlVYMmxLY0ZPeTVqSGlacnVmeXVhSWV5d0FlQ3Qzc09ranlJaHVzQlBuT2srU3J5a1ROTEZUNjZORWJVTFhuWUYrOUs5anlOdXE1UEt5K0pBbkxrb1FnSHlTZjJyTUYzZmlMOUxRZWtJOG1XNHRNcTYzd0pGSHR4NGZqNnZwR3doNEVDWStPWGhXeUNVVjdYclZnbGErTEpxcVBaeFBpOHpGS0lreWsyeHBpZ2xNZW9xbWRTZkxoZUUyYk05bUt5aE13bWcyeW1TQWhicnFRUERra3hIcmRyQTNjZEJCNVZPOFlvWklPZndnU3hhWmM0cTVkelRlNzhibkM1cU5VZTd6ekF1ZjVUNi9zM2lCUkVNTEk3eHhwcDFTcWc2TjFFTkxtN0N4MVNxV1lEMXlnemk1clVEYkloOW5CV1hhYmpFdnFNalNRZkdrempxc0tUc0RYTFdKNVFXcFJnSVR2dUxFZmFIcmtJZXl5eW9QWVdkSUROeDlsWHJvZWUza2pXMEU4RVBqczdFUkxZaFFhWUZ4ckZubmtoSGJkZXBCM2FZcmQvS2VFemx3UlVBTHB1YlN1ODVLSVdWT1JzaVpTU2lKaUxWNTV4QU1nZmRPYXFVZXQ1M3BDNHFXdEYvMms1OERoMEtEdE80UjJtT1g3WmsyQm13MmJVRGM0R2phWkhBeURHQm9jQXR6Z2VEZ0VOeHRFN1dyaWdsRTg3bFQ4WFd3UHplcm5oMk5BdkRMUjBaNUdkWHdvSm1WS1NYMGNaVTd0dEJHTXNJN1BITGRqM28zSmZxd0ljaTBKYVhoeHJtLytEU2REcHNWQU9PeEdFNTN6K3ozN1FBQzBTZ05KNUY1a0VDOHZSQ1BUZlFpellJK3ZHQy9SM3pwWnRCQVc2OVc4OWJ6QllZUVRrTkpuODNxU2c4SFJYQ0ptRVJHUUc1M0dLVXlRamMvaHNFQTlqL0szOEFETVE0QzVDS2hEM3ZqOGNleVFPWDdLQUpXSXZXNVA2eTJQQ3BtUExlb3A2OWMzNWw3aXFYQW9hL3RjRHJiSmdrQVNFWUIwd3M2NkFDR1BFVHJMdzNaRXAxYlFaVFRTdVh5OUp6WVJ6YXVObHd2T1BkK2hicHNzNFBuSEp4WEJLY0NRRnpuSVVIUWFpTGU3NEdSeCszdEtwSHFOcTBpNXp4aGZoVk9CL3pSZFdaMyt1cXJzM1owMGZLZlI4cm14M2VZbU5sbGtSSVFDSWNsSXNHSG9UUlhSWmIxbkxnOC90VW1OR2pQQXp0YUhUOTJkbmMwT2Y0YmJwRWFOS1lJYktVL3h0Vy9JUkQvVXFERXRjQXY1R2I1R3ZXRW8vWUhVcURGRjhCRE1ld25vTUtlV2dEV21DdTcySHVLcklHQVllb2VrUm8xcEl2Q0YwQnNFbytheEttWVVEQW9GMEhtQXNINGVXRE5yVG9SdWtEOTJCenZzUkN4UUV3Y1VjVDhTeGY2Y2ZoeHdFVkp0YVlBRHN2M1JEZEVoZFZEY3htajRHSk90eVFKQkJLQTUwWG84RmlWcThYcmRrZmVDSUxNQlVubWVXN2hKa0F4TUl4dWlCcmZuR2Z3eEhKaDhBd0pTeDNtNkNLRlVTTGVMN2dYcElnMVhZbHVPcUZrUVh0SFBjZ29tQXRScDVJSzBEUHNQd1dDTjl6NDlON2RGSXNUOVZuNC9PRU9NYXZDVzZCR1pROGlpVVVpNGFiZmhrQUFabzRLRjRwdklVUmtETWxaNTQ3a09vY3ZEenpjMzIvaCs2QkY3L3ZQcjc2b3lMNjRJVUllSFBpd21wSk5TSjZvSGxEMlg0OUlyc3UrRzhyOEdVbFJLUmhRekZGVzVVakxPUlprV1k0Y2ZiOTI0SjM4Y2VyUllHSDdQN1pKZFVtR0FGT2h3Z0VMVElsVXVZb1A2OG9wUWgwV2RBMW5KSW0wOVdmc1hDSHV5bTdxdkE4RDdVZUZERURVbHVuUkpGQ3BBaFdldTRYOGJyNnJYQy9MSDluSDg1eUVDSWpiRDdjQ3ZTQVZSWkcrR0JLUVBTSWNiS1Z1ZHNReDdTMHBCMU91bDJXYXl1a1p1Tmk5UzdvV2FSUFNLR2V4VDRldkRJR3FVbEhZT1ZTZWlqUDlKSks1a0ZjTXh1TkVuSis4eU85OUwwc2x0alZrNzBDU2szWWFiUFk1RElKb1NGU2lFQmFHdXJGMFZKTWVhUERJQ0ZTTmkrK09QcnUvRTMwaFl0endjOHcxWHc1V1FncEFzSjhmdk1tMDhiSWVVKzBNQTNGRHMyODNhQ0lTYVA3RTNwS1NiR2krRVBlL3ZRK2xwOXYzaVBJNWUveUkyU3dtSjJPK1lLbFE3OTl4MXh5d2xJalpTbVRRNG53VzRtZk5ZZlMveFdHTnd0VWRwaTFpTXJNM2ZnT2dodUxyS2liYzZJRkhXaG0rNVpwcGw4U0FWeklXMGZTcTZmY3g0ZU1RR3B4UXBhdnN1dXJqM0s2Rzkwalo3dzdoeHVrNVRFdGlER3ljZWdCdlhUV205TnV2OUdGSTlweEZSU3NNNHFiTE9CL0Q3VzAydGlpTXEzcStFVnNjd0dqd21GZ0lTVDlkdkJZQ050M250Um45UDhQdlRRcWVEaTVSdVZ5QWV1bFJCZmMzcVprbjFyR3V5Qk9EWTBlTW1ibVpnemFXK2l0WWRONlI4dEhmWm5rcDNMdEVQZE85cnIzby9LQTAxYkVYelNsekk0K08zSW51aEltM3pkOVJaNmx3N21ORHA5d2EwVVZWbGRYWFE5YmdScGtXM3E5MGdIM1Z4V0VvMFpwOEJFczZIaEZZQ29rcWEzN2cvRXdzZ1c1enB5QWZwdGJGNVRkdDVRTmRaQ3BDaEVsdnRKSkFNa2x3bkRVSE9ZKzUweFNWYlpQY3RDNXRYTjVZVzEyMVcyWjhZRHRQK0lWWHYyT0NNcE5sN3NyWHRzcVpIWHBySFdNVTJGMm5TRUI3NjFhc2JpWFBKa29aWVl6S0hwRXpvbkErSjFEaURXT0E0aDJSR0FKSGVjTW1uNjYrM3NYazlsWHc2NHh4clZpeVdlbW1BTkRUcGZTaWxvVzdpVWlpODd0UFNpaThNY0pCR1BpQXowTVZQOENHWkFTVDVrZzI1VjBSL1BSMlJvR1pBUGhWUXVjc3B4bm9WZ09QWGtaRDJtNTdyR21qQ0M5YXE1SkxiRHhjQmwzNlpITW9rNE02dER3Nm5MUVhUeUFmakc5NmlMamdjcWQya25RTkpNQTl0emZEQWJWNjducWlLeVNJaFVvZklNOCtZaEpuU0Q4Z045VTlUQ2taZFR2WGtTK3V2Ri9iVnJnclllNVViM3BjQkVFbVlIa3FEemF6eEZBTVNLZzh0U0dnNmIza1U1RWsvSUplQTA1S0N1amthUUhaelIvMkZGT1Nic3hvNmlUV2VLMVpKaUlmd09HVXlnQ0RoU3BLRVliOXlaNExJbFg1QW9XUm42RGkvSnhPR2ZvNUdOdmwwUFozbm1Yd1NJS0Z1Z254YS9EQ3RFWHVheDF3R2lrZy9vQkFCd2VSSnhnVng0ZFMrekZua0E3cWFTaGJSMUhIT3lTZUJ6SWw2cnFMaUpxTzFzTTRtakhMTHBXZE1Da2svb0hDNUJ3MzhmZjZsUTBvR0RHSmN1RGdRU3NnaUh5NXlxQmwxUDZkOWxMVUFrVER1UWZXTzM3N3BwSTZXZ0RwZTFzeGN2aWpYS1drVmxYNUFZUUtLN0FnanBUb2tVU0krT2JvVTNlVFRFQTNzRzM3S1lkOHNFdmtrUkI1Wm1aa0hJaDFuVElwQ0ZDR1p0aXh2WkMzLyt3K0xTai9BT0RoV1pxVU1SbXFwbzB1Umhzb0tHS3UxZkhpYThWUXY4ajViQkpoUkZ4a0hIbUxFQXRNZ2R3WEdnZXM0WnJDK3hYTyt2ekpaWUh6WFFocDhTVW9BTG9CdWJtN1dCVkRIMUFPTmpIRUxpd0xrdGxXcGxqZEpYbGNCTkc1b2hxdmV6NGdoak84Y2VycHhoMlJzVlh4OE12ekVRdlZtMlgyNldibWVQMzliRmtjRlN2bE5Kc25MM0hnY2lBK082aFdERXlhcWQzQWNaRVE4KytuMUU0ZXcyMlFFd1BGUTdaUTgxWXVuTTE3TlhLdmVKTERCU1NWZDduWGxRZno0cHFuSVcxNDFUVjBhcTE2SmtlOGVkWjNma1JHOVl2VWlJY2ViZFpIa3pyVTRaSy9tR3UrQklsWFZLODZTZ2tCREdmOGxKamYxaktUZzBTaXFWMkxrT3loaWd5TjR4V0lNcWhwd3psQzlRTUxyN1JkYTFoZ0dyb3Rhc0pvMzhWTnVTWWpEcEdVSlkrR2ZSbEc5RW1PSmtPMnQ2NDlNQTlTalNELzFBamFXNW1OVzdpUVEzd0Vva2JaNVMwTGREMU5VQ3ZKNy8yaDc2OE5IWkF5TXJjTVFvR2FrV0lOTEVYVTNsSDVvK0tPR1hXckhJeHQ0cU9PNHlCbStyWk9DNk55UWd4YS85Mk03bzJNVEVBSHFvdmJndVZLMWtpZjlBTlh6clZWdlBsYTAyWTd6ekRXcUZJeG1wNlNxYm1RN1Bvc2EzSStIVXF4NDJBQWhwYi9MK2gyY2pCcjN5NXY4VFRXVEpIVjdKV29rSVZ1RVNPVEYrR1FEcERoQ2ZVc1JGakwzUDhleCsrSW96WTFFMlZiSVdHclZqSnJxaVRwRVpVdXpRRmxUWnJlQ2VRYzg0amh3L2JOYWx3QTZOWndjVnh2KzE4N1dabWs5eFV1OW16dGJOdzdTZ3RTcUNsQ2ZVQjFVRllCZWVUV0tRWTZNamVQaUlsc0txbzJYWkF1NndjLzgzbzdyZEtnb1haeHMzL3BnWHlXaEx0bTl0Snp0eWVyVWJ6ME95d3pxTlM2U2FsTWZjcW1HQmZuNHZTVWxZeUw2ckUvQ1FYaEdkZWxsNjlvczZIYkRWWFZqMGF5ZzdvNFRhamluOXM5VElneGhOTlY5SXVRREptWlE4UU4rd0NYWU4vaSttL0JrOC9kcWhFb0RIcTkyUG93UjlhZFdISXVjOElxYzVpbEJhWGd3S2ZLSnp5TVR4UGJXalQwOFBXcUR4cVVDZ1dSVkFycTEraDBKNnY3cFBEdFFqcElBdUxSODlDLy92RFBSN1JnVGR5bng5SEFKT0dRVDV2VXFVZTIvUlorck1RNDh6VmJPUFBSYkJqLzgxMS92bEZKNmwvbFpaQXI0N1oxLzIrZUVFaVFzWlA4cGRzcHdrL0FhSmxBOTRRS1Z6OHhyTkI1eXliZFBwb0NwM2RtSWhQUkxESExKQTlOTUpxb3hHdkpDS3dvWUR6UC9ZV2VDTnArS3FkN1ozOTc1emFNcjYrc1kwZFRPK2ozS2FnS1dDVlhqcEtqaEk1N2grUFRqclE4UHlCUXg5VHVMaW1xZVI3eEhNa2lZNkd4VkUzQXNKRkpzaWlmTXhkNFRmazgrTFRQRFVSUXp1Yk1pZDl4MTc2U1ZjckdFRFZqSC84YUJHc0tpZFBDQU01UlUwYTczV1ZtNVhWUE1MTGZWcjZSNDhPekZxemJuRjdyeUQ3cXg2bnI3MVJnZDZ2WHJ4MWlQVUV5NmZhdmMxSm9wWnE3YlVOVEt4WCttWFZnVGNEeW9LcGpiMkVMbGxwM1hIUVZXR0ZjUS8rZ2hqS0ExWTdYNm5TQVl3bUcvK2ZXdlBwMlZ5bFZobFhXUG9EWHRCVHZjS202VEdxV0IyNEN3YWI0TEdQMFU0VEJpRWF3VkwzLzlhMnNQRTVzYzEybXF0VzAxakJEWmVoYW9XeDJzMW0rdDFzc21mM3ozUGMrL1QycVlBaDd1bjdGdm80elMrVW1oRWdZV092YTdZYmpQN2NHYWlQbkFBT1BEMFBQK1lJdWRsNFZLV2ZnMUVUTVJFWSt4UDRtdXRoVkJKVjNNbW9oRHFDVHhKQ29kNDRnUjhTNy9zVWtXQi9CcU1jM3F2Nm52SDFSQjFhWmhib0pzclJlLzdQRnc2MzBlT053bDh3c2g3UnpYZXh4Y2tHOXNkaTZLWXU2aXZFSXFCc0VESHNMNUQvSmVLbGI1UENIdDBLUDdmNmdmY0dsM3MwM21DSE9kWm1pOStOdHQzMjNjWlRUOFBDWVpiVC9uS0JIT0pSM1BXdndmendzZFZ0RzJLNHFGeVhOQk1wSmVlTnQxQ1NjaitjUWhqdXh0T010ckVLKzZnSlI3VEIzbkI5THp2cDBIOVZvRUM1dG94VXhrNGdlM2VTNXlsMmRiL3Awem9Sa2pwVVJaMTBmdGRkYm1iejExSE8vN0lBaWZrZEE3WEJUQ3FhZ3ovUXFndGdsMW03N3ZiZE13YUhKeWJuUDZiRENIYkhDQ29tUk12blJvNDMvY1UrZzRqSFQ0MWVWU2piMXhQYjh0aU9iU051azEyb3RLTmgzK0FWMEFUMmZuK0h3dUFBQUFBRWxGVGtTdVFtQ0MiIC8+CiAgICA8L2RlZnM+Cjwvc3ZnPgogICAg")});
      }

      .persona-card {
        display: grid;
        gap: 20px;
        align-items: flex-start;
        grid-template-columns: 1fr 230px;
      }

      .persona-card.center {
        align-items: center;
      }

      .persona {
        font-size: 14px;
        font-weight: 600;
        text-overflow: ellipsis;
        overflow: hidden;
        display: block;
        white-space: nowrap;
      }

      ul {
        margin-top: 5px;
        margin-bottom: 0;
        padding-inline-start: 20px;
      }

      li {
        font-size: 12px;
        word-break: break-word;
      }
    `],me([pt({type:String,reflect:!0})],De.prototype,"mode",2),me([pt({type:String,reflect:!0})],De.prototype,"icon",2),me([pt({type:String})],De.prototype,"persona",2),me([pt({type:String})],De.prototype,"avatarUrl",2),me([pt({type:Array})],De.prototype,"personaData",2),De=me([ct("radix-persona-card")],De);const ye="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOSAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xMTg4XzQyOCkiPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgIGQ9Ik0xMy43Mzc4IDQuNzYyNUMxMi42NTAzIDMuNjc1IDExLjE1NzggMyA5LjUwMDMxIDNDNi4xODUzMSAzIDMuNTA3ODEgNS42ODUgMy41MDc4MSA5QzMuNTA3ODEgMTIuMzE1IDYuMTg1MzEgMTUgOS41MDAzMSAxNUMxMi4yOTc4IDE1IDE0LjYzMDMgMTMuMDg3NSAxNS4yOTc4IDEwLjVIMTMuNzM3OEMxMy4xMjI4IDEyLjI0NzUgMTEuNDU3OCAxMy41IDkuNTAwMzEgMTMuNUM3LjAxNzgxIDEzLjUgNS4wMDAzMSAxMS40ODI1IDUuMDAwMzEgOUM1LjAwMDMxIDYuNTE3NSA3LjAxNzgxIDQuNSA5LjUwMDMxIDQuNUMxMC43NDUzIDQuNSAxMS44NTUzIDUuMDE3NSAxMi42NjUzIDUuODM1TDEwLjI1MDMgOC4yNUgxNS41MDAzVjNMMTMuNzM3OCA0Ljc2MjVaIgogICAgICAgICAgICBmaWxsPSIjMDUyQ0MwIiAvPgogICAgPC9nPgogICAgPGRlZnM+CiAgICAgICAgPGNsaXBQYXRoIGlkPSJjbGlwMF8xMTg4XzQyOCI+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuNSkiIC8+CiAgICAgICAgPC9jbGlwUGF0aD4KICAgIDwvZGVmcz4KPC9zdmc+CiAgICA=",ve="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xMTg4XzQyNCkiPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgIGQ9Ik0xMi43NSA1LjI1TDExLjY5MjUgNi4zMDc1TDEzLjYyNzUgOC4yNUg2VjkuNzVIMTMuNjI3NUwxMS42OTI1IDExLjY4NUwxMi43NSAxMi43NUwxNi41IDlMMTIuNzUgNS4yNVpNMyAzLjc1SDlWMi4yNUgzQzIuMTc1IDIuMjUgMS41IDIuOTI1IDEuNSAzLjc1VjE0LjI1QzEuNSAxNS4wNzUgMi4xNzUgMTUuNzUgMyAxNS43NUg5VjE0LjI1SDNWMy43NVoiCiAgICAgICAgICAgIGZpbGw9IiMwNTJDQzAiIC8+CiAgICA8L2c+CiAgICA8ZGVmcz4KICAgICAgICA8Y2xpcFBhdGggaWQ9ImNsaXAwXzExODhfNDI0Ij4KICAgICAgICAgICAgPHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBmaWxsPSJ3aGl0ZSIgLz4KICAgICAgICA8L2NsaXBQYXRoPgogICAgPC9kZWZzPgo8L3N2Zz4KICAgIA==",Ce=d`
  :host {
    width: 100%;
  }

  .header {
    font-size: 14px;
    font-weight: 400;
    margin: 15px 0px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    text-align: center;
  }
  .content {
    max-height: 360px;
    overflow: auto;
    width: 100%;
    margin-bottom: 0;
    position: relative;
    padding-bottom: 10px;
    -webkit-mask-image: linear-gradient(180deg, black 90%, transparent 100%);
    mask-image: linear-gradient(180deg, black 90%, transparent 95%);
  }
`;var Te=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,je=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?ze(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&Te(e,i,n),n};let Ze=class extends lt{constructor(){super(...arguments),this.mode=Dt.light,this.avatarUrl="",this.persona="",this.dAppName="",this.personaData=[],this.accounts=[]}onUpdateData(t){this.dispatchEvent(new CustomEvent("onUpdateData",{detail:t,bubbles:!0,composed:!0}))}onLogout(t){this.dispatchEvent(new CustomEvent("onLogout",{detail:t,bubbles:!0,composed:!0}))}render(){return G` <div class="header">Sharing with ${this.dAppName}</div>
      <div class="content">
        <radix-persona-card
          avatarUrl=${this.avatarUrl}
          mode=${this.mode}
          persona=${this.persona}
          .personaData=${this.personaData}
        ></radix-persona-card>
        <div>
          ${(this.accounts||[]).map((({label:t,address:e,appearanceId:i})=>G`<radix-account
                label=${t}
                address=${e}
                appearanceId=${i}
              ></radix-account>`))}
        </div>
      </div>
      <div class="buttons">
        <button id="update-data" @click=${this.onUpdateData}>
          Update Data Sharing
        </button>
        <button id="logout" @click=${this.onLogout}>Log Out</button>
      </div>`}};Ze.styles=[xt,Ce,d`
      :host {
        width: 100%;
      }
      .content {
        max-height: 193px;
        overflow-x: hidden;
      }
      .buttons {
        display: grid;
        bottom: 0;
        width: 100%;
        grid-template-columns: 1fr 143px;
        grid-gap: 10px;
        width: 100%;
        padding-top: 5px;
        align-items: end;
      }
      button {
        padding: 11px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }

      button::before {
        content: '';
        -webkit-mask-position: center;
        mask-position: center;
        -webkit-mask-size: cover;
        mask-size: cover;
        background: var(--radix-button-text-color);
        display: block;
        width: 20px;
        height: 20px;
      }

      #update-data,
      #logout {
        cursor: pointer;
      }

      #update-data::before {
        -webkit-mask-image: url(${l(ye)});
        mask-image: url(${l(ye)});
      }

      #logout::before {
        -webkit-mask-image: url(${l(ve)});
        mask-image: url(${l(ve)});
      }
    `],je([pt({type:String,reflect:!0})],Ze.prototype,"mode",2),je([pt({type:String})],Ze.prototype,"avatarUrl",2),je([pt({type:String})],Ze.prototype,"persona",2),je([pt({type:String})],Ze.prototype,"dAppName",2),je([pt({type:Array})],Ze.prototype,"personaData",2),je([pt({type:Array})],Ze.prototype,"accounts",2),Ze=je([ct("radix-sharing-page")],Ze);var ke=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,Ee=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?Se(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&ke(e,i,n),n};let Ue=class extends lt{constructor(){super(...arguments),this.mode=Dt.light,this.requestItems=[],this.dAppName="",this.loggedInTimestamp=""}render(){return G`
      <div class="header">Connected to ${this.dAppName}</div>
      <slot name="subheader"></slot>
      ${this.loggedInTimestamp?G`<div class="subheader">
            Since logged in: ${Pt(this.loggedInTimestamp,", ")}
          </div>`:""}
      <div class="content">
        ${(this.requestItems||[]).map((t=>G`<radix-request-card
            type="${t.type}"
            status="${t.status}"
            id="${t.id}"
            transactionIntentHash="${t.transactionIntentHash}"
            ?showCancel="${t.showCancel}"
            @onCancel=${t=>{this.dispatchEvent(new CustomEvent("onCancel",{detail:t.detail,bubbles:!0,composed:!0}))}}
            timestamp=${t.timestamp}
            mode=${this.mode}
          ></radix-request-card>`))}
      </div>
    `}};Ue.styles=[xt,Ce,d`
      .subheader {
        color: var(--radix-card-text-dimmed-color);
        margin-top: -12px;
        margin-bottom: 15px;
        text-align: center;
        font-size: 12px;
      }
    `],Ee([pt({type:String,reflect:!0})],Ue.prototype,"mode",2),Ee([pt({type:Array})],Ue.prototype,"requestItems",2),Ee([pt({type:String})],Ue.prototype,"dAppName",2),Ee([pt({type:String})],Ue.prototype,"loggedInTimestamp",2),Ue=Ee([ct("radix-requests-page")],Ue);var we=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,Le=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?Ve(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&we(e,i,n),n};let Re=class extends lt{constructor(){super(),this.theme="radix-blue",this.dAppName="",this.personaLabel="",this.connected=!1,this.status=mt.default,this.loggedInTimestamp="",this.showPopoverMenu=!1,this.requestItems=[],this.accounts=[],this.personaData=[],this.isMobile=!1,this.isWalletLinked=!1,this.isExtensionAvailable=!1,this.fullWidth=!1,this.activeTab="sharing",this.mode="light",this.avatarUrl="",this.compact=!1,this.windowClickEventHandler=t=>{this.showPopoverMenu&&(this.contains(t.target)||(this.showPopoverMenu=!1))},document.addEventListener("click",this.windowClickEventHandler)}get hasSharedData(){return!(!this.accounts.length&&!this.personaData.length)}connectedCallback(){super.connectedCallback(),this.dispatchEvent(new CustomEvent("onRender",{bubbles:!0,composed:!0}))}disconnectedCallback(){document.removeEventListener("click",this.windowClickEventHandler),this.dispatchEvent(new CustomEvent("onDestroy",{bubbles:!0,composed:!0}))}togglePopoverMenu(){this.showPopoverMenu=!this.showPopoverMenu,this.showPopoverMenu&&this.dispatchEvent(new CustomEvent("onShowPopoverMenu",{bubbles:!0,composed:!0}))}closePopover(){this.showPopoverMenu=!1}connectButtonTemplate(){const t=this.connected?this.personaLabel:"Connect";return G` <radix-button
      status=${this.status}
      theme=${this.theme}
      ?connected=${this.connected}
      ?fullWidth=${this.fullWidth}
      @onClick=${this.togglePopoverMenu}
      @onResize=${t=>{this.compact=40===t.detail.offsetWidth}}
      ><div>${t}</div></radix-button
    >`}connectTemplate(){if(!this.connected)return G` <radix-not-connected-page
      mode=${this.mode}
      status=${this.status}
      ?isMobile=${this.isMobile}
      .requestItems=${this.requestItems}
      ?isWalletLinked=${this.isWalletLinked}
      ?isExtensionAvailable=${this.isExtensionAvailable}
    >
    </radix-not-connected-page>`}renderSharingTemplate(){return G` <radix-sharing-page
      mode=${this.mode}
      dAppName=${this.dAppName}
      avatarUrl=${this.avatarUrl}
      persona=${this.personaLabel}
      .personaData=${(this.personaData||[]).map((t=>t.value))}
      .accounts=${this.accounts}
      @onLogout=${()=>{this.dispatchEvent(new CustomEvent("onDisconnect",{bubbles:!0,composed:!0}))}}
      @onUpdateData=${()=>{this.dispatchEvent(new CustomEvent("onUpdateSharedData",{bubbles:!0,composed:!0}))}}
    ></radix-sharing-page>`}renderRequestItemsTemplate(){return G` <radix-requests-page
      mode=${this.mode}
      loggedInTimestamp=${this.loggedInTimestamp}
      dAppName=${this.dAppName}
      .requestItems=${this.requestItems}
    ></radix-requests-page>`}popoverTemplate(){return this.showPopoverMenu?G` <radix-popover
      mode="${this.mode}"
      ?connected=${this.connected}
      ?compact=${this.compact}
      ?isMobile=${this.isMobile}
      @onClosePopover=${()=>{this.closePopover()}}
      class=${ht({popover:!0,"show-popover":this.showPopoverMenu,mobile:this.isMobile})}
    >
      ${this.connected?G`
            <radix-tabs-menu
              active=${this.activeTab}
              mode=${this.mode}
              @onClick="${t=>{this.activeTab=t.detail.value}}"
            ></radix-tabs-menu>

            ${"sharing"===this.activeTab?this.renderSharingTemplate():this.renderRequestItemsTemplate()}
          `:this.connectTemplate()}
    </radix-popover>`:""}render(){return G`${this.connectButtonTemplate()} ${this.popoverTemplate()}`}};Re.styles=d`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200;400;500;600;700&display=swap');

    :root {
      font-family: 'IBM Plex Sans';
      font-weight: 400;
      margin: 0;
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;

      color-scheme: light dark;
      color: rgba(255, 255, 255, 0.87);

      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;
    }

    :host {
      text-align: left;
      font-family: 'IBM Plex Sans';
      position: relative;
      z-index: 1000;
      display: inline-block;

      /* Core colors */
      --color-radix-green-1: #00ab84;
      --color-radix-green-2: #00c389;
      --color-radix-green-3: #21ffbe;
      --color-radix-blue-1: #060f8f;
      --color-radix-blue-2: #052cc0;
      --color-radix-blue-3: #20e4ff;
      --color-light: #ffffff;
      --color-dark: #000000;

      /* Accent colors */
      --color-accent-red: #ef4136;
      --color-accent-blue: #00aeef;
      --color-accent-yellow: #fff200;
      --color-alert: #e59700;
      --color-radix-error-red-1: #c82020;
      --color-radix-error-red-2: #fcebeb;

      /* Neutral colors */
      --color-grey-1: #003057;
      --color-grey-2: #8a8fa4;
      --color-grey-3: #ced0d6;
      --color-grey-4: #e2e5ed;
      --color-grey-5: #f4f5f9;
    }

    .popover {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
    }

    .mobile.popover {
      position: fixed;
      top: 0;
      left: 0;
      right: unset;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 14px;
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      background-color: rgba(0, 0, 0, 0.4);
    }

    @-webkit-keyframes slide-bottom {
      0% {
        -webkit-transform: translateY(-20px);
        transform: translateY(-20px);
      }
      100% {
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        opacity: 1;
      }
    }
    @keyframes slide-bottom {
      0% {
        -webkit-transform: translateY(-20px);
        transform: translateY(-20px);
      }
      100% {
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        opacity: 1;
      }
    }

    radix-popover {
      opacity: 0;
    }
    radix-popover.show-popover {
      -webkit-animation: slide-bottom 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        both;
      animation: slide-bottom 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }
  `,Le([pt({type:String})],Re.prototype,"theme",2),Le([pt({type:String})],Re.prototype,"dAppName",2),Le([pt({type:String})],Re.prototype,"personaLabel",2),Le([pt({type:Boolean})],Re.prototype,"connected",2),Le([pt({type:String})],Re.prototype,"status",2),Le([pt({type:String})],Re.prototype,"loggedInTimestamp",2),Le([pt({type:Boolean})],Re.prototype,"showPopoverMenu",2),Le([pt({type:Array})],Re.prototype,"requestItems",2),Le([pt({type:Array})],Re.prototype,"accounts",2),Le([pt({type:Array})],Re.prototype,"personaData",2),Le([pt({type:Boolean})],Re.prototype,"isMobile",2),Le([pt({type:Boolean})],Re.prototype,"isWalletLinked",2),Le([pt({type:Boolean})],Re.prototype,"isExtensionAvailable",2),Le([pt({type:Boolean})],Re.prototype,"fullWidth",2),Le([pt({type:String})],Re.prototype,"activeTab",2),Le([pt({type:String})],Re.prototype,"mode",2),Le([pt({type:String})],Re.prototype,"avatarUrl",2),Le([pt({type:Boolean,state:!0})],Re.prototype,"compact",2),Re=Le([ct("radix-connect-button")],Re)}}]);
//# sourceMappingURL=812.main.js.map