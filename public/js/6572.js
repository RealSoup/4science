/*! For license information please see 6572.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6572],{83662:(t,r,e)=>{e.d(r,{Z:()=>a});var n=e(1519),o=e.n(n)()((function(t){return t[1]}));o.push([t.id,".container[data-v-268d6498]{text-align:center}.container p[data-v-268d6498]:first-child{color:#1a90d6;font-size:3.2em;font-weight:100;margin-bottom:0}.container p[data-v-268d6498]:nth-child(2){font-size:1.9em;font-weight:700}.container p[data-v-268d6498]:nth-child(3){font-size:1.3em;font-weight:700}.container p:nth-child(3) b[data-v-268d6498]{color:#1a90d6}.container ul[data-v-268d6498]{border:1px solid #ccc;border-radius:16px;margin:3em auto;padding:1.8em;width:620px}.container ul .dd_style[data-v-268d6498]{align-items:center;display:flex;flex-wrap:wrap}.container ul .dd_style span[data-v-268d6498]{flex-basis:0;flex-grow:1;font-size:1.1em;font-weight:600;max-width:100%}.container ul .dd_style span[data-v-268d6498]:first-child{flex:0 0 39%;max-width:39%;padding-right:10px;text-align:right}.container ul .dd_style span[data-v-268d6498]:nth-child(2){color:#1a90d6;text-align:left}.container ul li[data-v-268d6498]{line-height:2.3}.container ul li:first-child span[data-v-268d6498]:nth-child(2),.container ul li:nth-child(4) span[data-v-268d6498]:nth-child(2){font-size:1.4em;font-weight:800}.container ul li[data-v-268d6498]:last-child{font-size:.9em;line-height:1.5}.container ul li:last-child b[data-v-268d6498]{font-weight:800}.container ul li b.point[data-v-268d6498]{color:#1a90d6}.container .row[data-v-268d6498]{margin:auto;width:620px}.container .row .col[data-v-268d6498]:first-child{padding-left:0}.container .row .col[data-v-268d6498]:nth-child(2){padding-right:0}.container .row .col .btn[data-v-268d6498]{width:100%}.container .row .col[data-v-268d6498]:first-child{padding-right:15px}.container .row .col[data-v-268d6498]:last-child{padding-left:15px}@media (max-width:992px){.w_fence[data-v-268d6498]{font-size:13px;padding-left:5px;padding-right:5px}.container .row[data-v-268d6498],.container ul[data-v-268d6498]{width:100%}.container .row .col[data-v-268d6498]:first-child{padding-right:5px}.container .row .col[data-v-268d6498]:nth-child(2){padding-left:5px}}",""]);const a=o},36572:(t,r,e)=>{e.r(r),e.d(r,{default:()=>h});var n=e(79481);function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function a(){a=function(){return t};var t={},r=Object.prototype,e=r.hasOwnProperty,n=Object.defineProperty||function(t,r,e){t[r]=e.value},i="function"==typeof Symbol?Symbol:{},c=i.iterator||"@@iterator",l=i.asyncIterator||"@@asyncIterator",d=i.toStringTag||"@@toStringTag";function s(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{s({},"")}catch(t){s=function(t,r,e){return t[r]=e}}function u(t,r,e,o){var a=r&&r.prototype instanceof p?r:p,i=Object.create(a.prototype),c=new O(o||[]);return n(i,"_invoke",{value:L(t,e,c)}),i}function h(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var f={};function p(){}function v(){}function y(){}var g={};s(g,c,(function(){return this}));var m=Object.getPrototypeOf,_=m&&m(m(j([])));_&&_!==r&&e.call(_,c)&&(g=_);var w=y.prototype=p.prototype=Object.create(g);function x(t){["next","throw","return"].forEach((function(r){s(t,r,(function(t){return this._invoke(r,t)}))}))}function b(t,r){function a(n,i,c,l){var d=h(t[n],t,i);if("throw"!==d.type){var s=d.arg,u=s.value;return u&&"object"==o(u)&&e.call(u,"__await")?r.resolve(u.__await).then((function(t){a("next",t,c,l)}),(function(t){a("throw",t,c,l)})):r.resolve(u).then((function(t){s.value=t,c(s)}),(function(t){return a("throw",t,c,l)}))}l(d.arg)}var i;n(this,"_invoke",{value:function(t,e){function n(){return new r((function(r,n){a(t,e,r,n)}))}return i=i?i.then(n,n):n()}})}function L(t,r,e){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return P()}for(e.method=o,e.arg=a;;){var i=e.delegate;if(i){var c=E(i,e);if(c){if(c===f)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===n)throw n="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n="executing";var l=h(t,r,e);if("normal"===l.type){if(n=e.done?"completed":"suspendedYield",l.arg===f)continue;return{value:l.arg,done:e.done}}"throw"===l.type&&(n="completed",e.method="throw",e.arg=l.arg)}}}function E(t,r){var e=r.method,n=t.iterator[e];if(void 0===n)return r.delegate=null,"throw"===e&&t.iterator.return&&(r.method="return",r.arg=void 0,E(t,r),"throw"===r.method)||"return"!==e&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+e+"' method")),f;var o=h(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,f;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=void 0),r.delegate=null,f):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,f)}function k(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function S(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function j(t){if(t){var r=t[c];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function r(){for(;++n<t.length;)if(e.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=void 0,r.done=!0,r};return o.next=o}}return{next:P}}function P(){return{value:void 0,done:!0}}return v.prototype=y,n(w,"constructor",{value:y,configurable:!0}),n(y,"constructor",{value:v,configurable:!0}),v.displayName=s(y,d,"GeneratorFunction"),t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===v||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s(t,d,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(b.prototype),s(b.prototype,l,(function(){return this})),t.AsyncIterator=b,t.async=function(r,e,n,o,a){void 0===a&&(a=Promise);var i=new b(u(r,e,n,o),a);return t.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(w),s(w,d,"Generator"),s(w,c,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=j,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var r in this)"t"===r.charAt(0)&&e.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(e,n){return i.type="throw",i.arg=t,r.next=e,n&&(r.method="next",r.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=e.call(a,"catchLoc"),l=e.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&e.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=r&&r<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=r,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),f},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),S(e),f}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;S(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,e){return this.delegate={iterator:j(t),resultName:r,nextLoc:e},"next"===this.method&&(this.arg=void 0),f}},t}function i(t,r,e,n,o,a,i){try{var c=t[a](i),l=c.value}catch(t){return void e(t)}c.done?r(l):Promise.resolve(l).then(n,o)}const c={props:["value"],data:function(){return{od_id:this.$route.params.od_id,order:{order_extra_info:{}}}},computed:{after_10day:function(){return date_calc("d",10).format("yyyy년 MM월 dd일")},pay_plan:function(){switch(this.order.order_extra_info.oex_pay_plan){case"soon":return"선결제";case"week1":return"1주이내";case"week2":return"2주이내";case"month1":return"30일이내";case"month2":return"60일이내"}},pay_method:function(){switch(this.order.od_pay_method){case"C":return"카드 결제";case"B":return"현금결제 (무통장입금)";case"P":return"PSYS (선결제)";case"S":return"PSYS (후결제)";case"R":return"원격결제";case"E":return"에스크로 (결제대금예치)"}}},methods:{},mounted:function(){var t,r=this;return(t=a().mark((function t(){var e,o,i;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.Z.get("/api/shop/order/done/".concat(r.od_id));case 2:(e=t.sent)&&200===e.status&&(r.order=e.data),o||(o={}),o.wa="s_256b3162e372",i={},window.wcs&&(i.cnv=wcs.cnv("1",r.order.od_all_price),wcs_do(i));case 8:case"end":return t.stop()}}),t)})),function(){var r=this,e=arguments;return new Promise((function(n,o){var a=t.apply(r,e);function c(t){i(a,n,o,c,l,"next",t)}function l(t){i(a,n,o,c,l,"throw",t)}c(void 0)}))})()}};var l=e(93379),d=e.n(l),s=e(83662),u={insert:"head",singleton:!1};d()(s.Z,u);s.Z.locals;const h=(0,e(51900).Z)(c,(function(){var t=this,r=t._self._c;return r("b-container",{staticClass:"w_fence"},[r("p",[t._v("THANK YOU!")]),t._v(" "),r("p",[t._v("주문이 완료되었습니다.")]),t._v(" "),r("p",[t._v("주문내역은 마이페이지 > "),r("b",[t._v("주문 / 배송조회")]),t._v(" 에서 확인하실 수 있습니다.")]),t._v(" "),r("ul",[r("li",{staticClass:"dd_style"},[r("span",[t._v("주문번호")]),r("span",[t._v(t._s(t.order.od_no))])]),t._v(" "),r("li",{staticClass:"dd_style"},[r("span",[t._v("결제방법")]),r("span",[t._v(t._s(t.pay_method))])]),t._v(" "),r("li",{staticClass:"dd_style"},[r("span",[t._v("결제 예정일")]),r("span",[t._v(t._s(t.pay_plan))])]),t._v(" "),r("li",{staticClass:"dd_style"},[r("span",[t._v("결제 금액")]),r("span",[t._v(t._s(t._f("won")(t._f("comma")(t.order.od_all_price))))])]),t._v(" "),["B"].includes(t.order.od_pay_method)?r("li",[r("b",[t._v(t._s(t.after_10day))]),t._v("까지 주문 금액이 입금확인이 되지 않으면,\r\n            "),r("br"),r("b",[t._v("자동주문취소")]),t._v(" 됨을 알려드립니다.\r\n            "),r("br"),r("b",{staticClass:"point"},[t._v("단 대학교, 국가연구기관은 예외")])]):t._e()]),t._v(" "),r("b-row",[r("b-col",[r("b-button",{staticClass:"gray xl",on:{click:function(r){return t.$router.push({name:"my_order"})}}},[t._v("주문/배송조회 가기")])],1),t._v(" "),r("b-col",[r("b-button",{staticClass:"blue xl",on:{click:function(r){return t.$router.push({name:"main"})}}},[t._v("쇼핑 계속하기")])],1)],1)],1)}),[],!1,null,"268d6498",null).exports}}]);