"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9517],{98454:(t,i,p)=>{p.d(i,{Z:()=>a});var o=p(1519),e=p.n(o)()((function(t){return t[1]}));e.push([t.id,".popup[data-v-66f2a2c2]{background:#fff;box-shadow:0 1px 15px 1px rgba(39,39,39,.5);left:300px;position:absolute;top:162px;z-index:16}.popup .ctrl[data-v-66f2a2c2]{background-color:#fff;text-align:right}.pop_1[data-v-66f2a2c2]{background:#fff;border-radius:50px 50px 0 0;box-shadow:0 1px 15px 1px rgba(39,39,39,.5);left:20%;position:absolute;top:20%}.pop_2[data-v-66f2a2c2]{left:720px}@media (max-width:992px){.popup[data-v-66f2a2c2]{left:0;top:0}.popup img[data-v-66f2a2c2]{width:100%}}@media (max-width:576px){.popup[data-v-66f2a2c2]{width:100%}}",""]);const a=e},9517:(t,i,p)=>{p.r(i),p.d(i,{default:()=>n});const o={name:"web_modulePopUp",data:function(){return{pop:[{ck_key:"view01",is_view:!1,ck_view:!1},{ck_key:"view02",is_view:!1,ck_view:!1},{ck_key:"view03",is_view:!1,ck_view:!1}]}},methods:{todayStop:function(t){this.$cookies.set(this.pop[t].ck_key,"hide",86400),this.pop[t].is_view=!1},view_check:function(t){return this.pop[t].is_view&&this.pop[t].ck_view}},mounted:function(){var t=this;this.pop.forEach((function(i){i.ck_view="hide"!=t.$cookies.get(i.ck_key)}))}};var e=p(93379),a=p.n(e),c=p(98454),s={insert:"head",singleton:!1};a()(c.Z,s);c.Z.locals;const n=(0,p(51900).Z)(o,(function(){var t=this,i=t._self._c;return i("div",["main"==t.$route.name&&t.view_check(0)?i("div",{staticClass:"popup pop_0"},[i("b-img",{attrs:{src:"/storage/main/popup/240905.jpg",width:"500"}}),t._v(" "),i("div",{staticClass:"ctrl"},[i("b-button",{staticClass:"white xm",on:{click:function(i){return t.todayStop(0)}}},[t._v("24시간 안 보기")])],1)],1):t._e()])}),[],!1,null,"66f2a2c2",null).exports}}]);