"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6385],{20376:(t,e,i)=>{i.d(e,{Z:()=>a});var o=i(1519),p=i.n(o)()((function(t){return t[1]}));p.push([t.id,".popup[data-v-66e43dff]{background:#fff;box-shadow:0 1px 15px 1px rgba(39,39,39,.5);left:300px;position:absolute;top:162px;z-index:16}.popup .ctrl[data-v-66e43dff]{background-color:#fff;text-align:right}.pop_1[data-v-66e43dff]{background:#fff;border-radius:50px 50px 0 0;box-shadow:0 1px 15px 1px rgba(39,39,39,.5);left:20%;position:absolute;top:20%}.pop_2[data-v-66e43dff]{left:720px}@media (max-width:992px){.popup[data-v-66e43dff]{left:0;top:0}.popup img[data-v-66e43dff]{width:100%}}@media (max-width:576px){.popup[data-v-66e43dff]{width:100%}}",""]);const a=p},56385:(t,e,i)=>{i.r(e),i.d(e,{default:()=>n});const o={name:"web_modulePopUp",data:function(){return{pop:[{ck_key:"view01",is_view:!1,ck_view:!1},{ck_key:"view02",is_view:!1,ck_view:!1},{ck_key:"view03",is_view:!1,ck_view:!1}]}},methods:{todayStop:function(t){this.$cookies.set(this.pop[t].ck_key,"hide",86400),this.pop[t].is_view=!1},view_check:function(t){return this.pop[t].is_view&&this.pop[t].ck_view}},mounted:function(){var t=this;this.pop.forEach((function(e){e.ck_view="hide"!=t.$cookies.get(e.ck_key)}))}};var p=i(93379),a=i.n(p),s=i(20376),c={insert:"head",singleton:!1};a()(s.Z,c);s.Z.locals;const n=(0,i(51900).Z)(o,(function(){var t=this,e=t._self._c;return e("div",["main"==t.$route.name&&t.view_check(0)?e("div",{staticClass:"popup pop_0"},[e("b-img",{attrs:{src:"".concat(t.s3url,"main/popup/230807.jpg")}}),t._v(" "),e("div",{staticClass:"ctrl"},[e("b-button",{staticClass:"white xm",on:{click:function(e){return t.todayStop(0)}}},[t._v("24시간 안 보기")])],1)],1):t._e(),t._v(" "),"order_settle"==t.$route.name&&t.view_check(1)?e("div",{staticClass:"popup pop_1"},[e("b-img",{attrs:{src:"".concat(t.s3url,"order/popup.png")}}),t._v(" "),e("div",{staticClass:"ctrl"},[e("b-button",{staticClass:"white xm",on:{click:function(e){return t.todayStop(1)}}},[t._v("24시간 안 보기")])],1)],1):t._e()])}),[],!1,null,"66e43dff",null).exports}}]);