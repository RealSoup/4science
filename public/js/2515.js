/*! For license information please see 2515.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2515],{15911:(t,e,r)=>{r.d(e,{Z:()=>a});var n=r(1519),o=r.n(n)()((function(t){return t[1]}));o.push([t.id,'h2[data-v-03269a61]{margin:24px}.list_item[data-v-03269a61]{margin-bottom:20px}.list_item .col[data-v-03269a61]{align-items:center;display:flex}.list_item .col[data-v-03269a61]:first-of-type,.list_item .col[data-v-03269a61]:nth-of-type(3){justify-content:center}.list_item .col:nth-of-type(2) a[data-v-03269a61]{text-align:left}.list_item.answer .col[data-v-03269a61]:nth-of-type(2){padding-left:64px;position:relative}.list_item.answer .col[data-v-03269a61]:nth-of-type(2):before{color:#ff5757;content:"↪";font-size:30px;left:25px;position:absolute}.list_item .col[data-v-03269a61]:nth-of-type(4){justify-content:space-around}.list_item .col:nth-of-type(4) button[data-v-03269a61]{float:left}',""]);const a=o},72515:(t,e,r)=>{r.r(e),r.d(e,{default:()=>h});var n=r(79481);function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function a(){a=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},c=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",l=i.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function f(t,e,r,o){var a=e&&e.prototype instanceof d?e:d,i=Object.create(a.prototype),c=new O(o||[]);return n(i,"_invoke",{value:L(t,r,c)}),i}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var p={};function d(){}function v(){}function y(){}var m={};u(m,c,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(S([])));b&&b!==e&&r.call(b,c)&&(m=b);var _=y.prototype=d.prototype=Object.create(m);function w(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){function a(n,i,c,s){var l=h(t[n],t,i);if("throw"!==l.type){var u=l.arg,f=u.value;return f&&"object"==o(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){a("next",t,c,s)}),(function(t){a("throw",t,c,s)})):e.resolve(f).then((function(t){u.value=t,c(u)}),(function(t){return a("throw",t,c,s)}))}s(l.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){a(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function L(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return N()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=E(i,r);if(c){if(c===p)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=h(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===p)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}function E(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),p;var o=h(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,p;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function S(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:N}}function N(){return{value:void 0,done:!0}}return v.prototype=y,n(_,"constructor",{value:y,configurable:!0}),n(y,"constructor",{value:v,configurable:!0}),v.displayName=u(y,l,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,u(t,l,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},w(x.prototype),u(x.prototype,s,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new x(f(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},w(_),u(_,l,"Generator"),u(_,c,(function(){return this})),u(_,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=S,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),s=r.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:S(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),p}},t}function i(t,e,r,n,o,a,i){try{var c=t[a](i),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,o)}const c={data:function(){return{bo_cd:this.$route.params.bo_cd,frm:{page:0},list:{},config:{}}},methods:{index:function(){var t,e=arguments,r=this;return(t=a().mark((function t(){var o,i;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=e.length>0&&void 0!==e[0]?e[0]:1,r.frm.page=o,t.prev=2,t.next=5,n.Z.get("/api/admin/board/".concat(r.bo_cd),{params:r.frm});case 5:(i=t.sent)&&200===i.status&&(r.list=i.data.list,r.config=i.data.config),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(2),Notify.consolePrint(t.t0),Notify.toast("warning",t.t0.response.data.message);case 13:case"end":return t.stop()}}),t,null,[[2,9]])})),function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function c(t){i(a,n,o,c,s,"next",t)}function s(t){i(a,n,o,c,s,"throw",t)}c(void 0)}))})()}},beforeRouteUpdate:function(t,e,r){this.bo_cd=t.params.bo_cd,this.index(),r()},mounted:function(){this.index()}};var s=r(93379),l=r.n(s),u=r(15911),f={insert:"head",singleton:!1};l()(u.Z,f);u.Z.locals;const h=(0,r(51900).Z)(c,(function(){var t=this,e=t._self._c;return e("b-container",{staticClass:"p_wrap"},[e("h2",[t._v(t._s(t.config.name)+" 게시글 목록")]),t._v(" "),e("b-card",{staticClass:"shadow"},[e("b-container",{staticClass:"list",attrs:{fluid:""}},[e("b-row",[e("b-col",{attrs:{sm:"12",md:"6"}},[t._v("total : "+t._s(this.list.total))]),t._v(" "),e("b-col",{staticClass:"text-right",attrs:{sm:"12",md:"6"}},[e("b-button",{attrs:{variant:"primary",to:{name:"adm_board_create"}}},[e("b-icon-plus-lg"),t._v(" 글쓰기")],1)],1)],1),t._v(" "),e("hr"),t._v(" "),t._l(t.list.data,(function(r,n){return e("b-row",{key:n,staticClass:"list_item"},[e("b-col",{attrs:{col:"",lg:"1"}},[t._v(t._s(r.bo_id))]),t._v(" "),e("b-col",{attrs:{col:""}},[e("b-button",{attrs:{to:{name:"adm_board_show",params:{bo_cd:t.bo_cd,bo_id:r.bo_id}},variant:"outline-secondary",block:""}},[t._v("\n                        "+t._s(r.bo_subject)+"\n                    ")])],1),t._v(" "),e("b-col",{attrs:{col:"",lg:"1"}},[t._v(t._s(r.bo_writer))]),t._v(" "),t.config.is_qna?e("b-col",{attrs:{col:"",lg:"1"}},[r.answer?[t._v(t._s(r.answer.bo_writer))]:e("b-button",{attrs:{variant:"warning",to:{name:"adm_board_answer",params:{bo_cd:t.bo_cd,bo_id:r.bo_id}}}},[e("b-icon-headset"),t._v(" 답변\n                    ")],1)],2):t._e(),t._v(" "),e("b-col",{attrs:{col:"",lg:"1"}},[t._v(t._s(t._f("formatDate")(r.created_at)))])],1)})),t._v(" "),e("pagination",{staticClass:"mt-5",attrs:{data:t.list,limit:5,showDisabled:!0,align:"center"},on:{"pagination-change-page":t.index}},[e("span",{attrs:{slot:"prev-nav"},slot:"prev-nav"},[e("b-icon-chevron-left")],1),t._v(" "),e("span",{attrs:{slot:"next-nav"},slot:"next-nav"},[e("b-icon-chevron-right")],1)])],2)],1)],1)}),[],!1,null,"03269a61",null).exports}}]);