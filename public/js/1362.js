"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1362],{1063:(n,t,a)=>{a.d(t,{Z:()=>i});var e=a(3645),r=a.n(e)()((function(n){return n[1]}));r.push([n.id,"h3[data-v-b20e0666]{margin:auto;max-width:1500px}",""]);const i=r},1362:(n,t,a)=>{a.r(t),a.d(t,{default:()=>f});var e=a(7757),r=a.n(e),i=a(4670);function c(n,t,a,e,r,i,c){try{var o=n[i](c),s=o.value}catch(n){return void a(n)}o.done?t(s):Promise.resolve(s).then(e,r)}function o(n){return function(){var t=this,a=arguments;return new Promise((function(e,r){var i=n.apply(t,a);function o(n){c(i,e,r,o,s,"next",n)}function s(n){c(i,e,r,o,s,"throw",n)}o(void 0)}))}}const s={name:"admLedgerPayOd",components:{AcctList:function(){return a.e(7701).then(a.bind(a,7701))}},data:function(){return{frm:{mode:["P","POd"]},lga:{data:[]},config:[],mng:[]}},mounted:function(){this.index()},methods:{index:function(){var n=arguments,t=this;return o(r().mark((function a(){var e,c;return r().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return(e=n.length>0&&void 0!==n[0]?n[0]:null)&&(t.frm.page=e),a.next=4,i.Z.get("/api/admin/ledgerAcct",{params:t.frm});case 4:(c=a.sent)&&200===c.status&&(t.lga=c.data.lga,t.config=c.data.config,t.mng=c.data.mng);case 6:case"end":return a.stop()}}),a)})))()}}};var u=a(3379),d=a.n(u),l=a(1063),g={insert:"head",singleton:!1};d()(l.Z,g);l.Z.locals;const f=(0,a(1900).Z)(s,(function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",{staticClass:"p_wrap"},[a("h3",[n._v("매출 내역")]),n._v(" "),a("AcctList",{attrs:{mode:"pay_od",config:n.config,lga_step:"POd",sch:n.frm,mng:n.mng},on:{index:n.index},model:{value:n.lga,callback:function(t){n.lga=t},expression:"lga"}}),n._v(" "),a("pagination",{staticClass:"mt-5",attrs:{data:n.lga,align:"center"},on:{"pagination-change-page":n.index}})],1)}),[],!1,null,"b20e0666",null).exports}}]);