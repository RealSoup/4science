"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8181],{92249:(t,p,a)=>{a.d(p,{Z:()=>e});var o=a(1519),i=a.n(o)()((function(t){return t[1]}));i.push([t.id,".popup[data-v-72a4ab05]{background:#fff;box-shadow:0 1px 15px 1px rgba(39,39,39,.5);left:300px;position:absolute;top:162px;z-index:16}.popup .ctrl[data-v-72a4ab05]{background-color:#fff;text-align:right}.pop_1[data-v-72a4ab05]{background:#fff;border-radius:50px 50px 0 0;box-shadow:0 1px 15px 1px rgba(39,39,39,.5);left:20%;position:absolute;top:20%}.pop_2[data-v-72a4ab05]{left:720px}@media (max-width:992px){.popup[data-v-72a4ab05]{left:0;top:0}.popup img[data-v-72a4ab05]{width:100%}}@media (max-width:576px){.popup[data-v-72a4ab05]{width:100%}}",""]);const e=i},18181:(t,p,a)=>{a.r(p),a.d(p,{default:()=>c});const o={name:"web_modulePopUp",data:function(){return{pop:[{ck_key:"4S_PopUp_01",ck_view:!1,is_view:!1},{ck_key:"4S_PopUp_02",ck_view:!1,is_view:!1},{ck_key:"4S_PopUp_03",ck_view:!1,is_view:!1}]}},methods:{todayStop:function(t){this.$cookies.set(this.pop[t].ck_key,"hide",86400),this.pop[t].is_view=!1},view_check:function(t){return this.pop[t].is_view&&this.pop[t].ck_view}},mounted:function(){var t=this;this.pop.forEach((function(p){p.ck_view="hide"!=t.$cookies.get(p.ck_key)}))}};var i=a(93379),e=a.n(i),s=a(92249),n={insert:"head",singleton:!1};e()(s.Z,n);s.Z.locals;const c=(0,a(51900).Z)(o,(function(){var t=this,p=t._self._c;return p("div",["main"==t.$route.name&&t.view_check(0)?p("div",{staticClass:"popup pop_0"},[p("b-img",{attrs:{src:"/storage/main/popup/251223_24.jpg",width:"600"}}),t._v(" "),p("div",{staticClass:"ctrl"},[p("b-button",{staticClass:"white xm",on:{click:function(p){return t.todayStop(0)}}},[t._v("24시간 안 보기")])],1)],1):t._e()])}),[],!1,null,"72a4ab05",null).exports}}]);