"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5500],{4045:(t,a,n)=>{n.d(a,{Z:()=>o});var e=n(3645),c=n.n(e)()((function(t){return t[1]}));c.push([t.id,"h3[data-v-4b9b3b90]{margin:auto;max-width:1500px}.container-fluid[data-v-4b9b3b90]{margin-bottom:2rem}.container-fluid .row.ctrl[data-v-4b9b3b90]{margin-bottom:.2rem}.container-fluid .row.head[data-v-4b9b3b90]{background:#666;padding:5px 0}.container-fluid .row.head .col[data-v-4b9b3b90]{border-left:1px solid #ccc;color:#fff;font-size:.9rem;font-weight:700;text-align:center}.container-fluid .row.body[data-v-4b9b3b90]{border-bottom:1px solid #ccc}.container-fluid .row:not(.ctrl) .col[data-v-4b9b3b90]{text-align:center}.container-fluid .row:not(.ctrl) .col[data-v-4b9b3b90]:first-child{flex-basis:90px;max-width:90px}.container-fluid .row .col[data-v-4b9b3b90]:nth-child(2){flex-basis:130px;max-width:130px}.container-fluid .row .col[data-v-4b9b3b90]:nth-child(3),.container-fluid .row .col[data-v-4b9b3b90]:nth-child(6){flex-basis:90px;max-width:90px}.container-fluid .row .col[data-v-4b9b3b90]:nth-child(8){flex-basis:120px;max-width:120px}.container-fluid .row .col[data-v-4b9b3b90]:nth-child(9){flex-basis:100px;max-width:100px}.container-fluid .row .col[data-v-4b9b3b90]:nth-child(10){flex-basis:120px;max-width:120px}.container-fluid .row.body .col[data-v-4b9b3b90]:nth-child(10),.container-fluid .row.body .col[data-v-4b9b3b90]:nth-child(8),.container-fluid .row.body .col[data-v-4b9b3b90]:nth-child(9){text-align:right}",""]);const o=c},5500:(t,a,n)=>{n.r(a),n.d(a,{default:()=>u});var e=n(7757),c=n.n(e),o=n(4670);function i(t,a,n,e,c,o,i){try{var l=t[o](i),r=l.value}catch(t){return void n(t)}l.done?a(r):Promise.resolve(r).then(e,c)}function l(t){return function(){var a=this,n=arguments;return new Promise((function(e,c){var o=t.apply(a,n);function l(t){i(o,e,c,l,r,"next",t)}function r(t){i(o,e,c,l,r,"throw",t)}l(void 0)}))}}const r={name:"admLedgerAcctWait",data:function(){return{frm:{mode:["W"]},lga_data:{},config:{},indeterminate:!1,all_chk:!1}},methods:{index:function(){var t=arguments,a=this;return l(c().mark((function n(){var e,i;return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return(e=t.length>0&&void 0!==t[0]?t[0]:null)&&(a.frm.page=e),n.next=4,o.Z.get("/api/admin/ledgerAcct",{params:a.frm});case 4:(i=n.sent)&&200===i.status&&(a.lga_data=i.data.lga,a.config=i.data.config);case 6:case"end":return n.stop()}}),n)})))()},update:function(t){var a=this;return l(c().mark((function n(){var e,i;return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e={_method:"PATCH",step:t,lga_ids:a.lga_data.data.filter((function(t){return 1==t.lga_check})).map((function(t){return t.lga_id}))},n.next=3,o.Z.post("/api/admin/ledgerAcct/0",e);case 3:(i=n.sent)&&200===i.status&&(a.index(),Notify.toast("success","수정 완료"));case 5:case"end":return n.stop()}}),n)})))()},chkChange:function(){var t=this.lga_data.data.filter((function(t){return 1==t.lga_check})).length;0===t?(this.indeterminate=!1,this.all_chk=!1):t===this.lga_data.data.length?(this.indeterminate=!1,this.all_chk=!0):(this.indeterminate=!0,this.all_chk=!1)},toggle_all_chk:function(t){this.lga_data.data.forEach((function(a){a.lga_check=!!t})),this.indeterminate=!1}},mounted:function(){this.index()}};var d=n(3379),_=n.n(d),s=n(4045),b={insert:"head",singleton:!1};_()(s.Z,b);s.Z.locals;const u=(0,n(1900).Z)(r,(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"p_warp"},[n("h3",[t._v("매출 대기")]),t._v(" "),n("b-container",{attrs:{fluid:""}},[n("b-row",{staticClass:"ctrl"},[n("b-col",[n("b-button-group",[n("b-button",{attrs:{variant:"danger"},on:{click:function(a){return t.update("W")}}},[t._v("매출대기")]),t._v(" "),n("b-button",{attrs:{variant:"success"},on:{click:function(a){return t.update("S")}}},[t._v("결제 예정분")]),t._v(" "),n("b-button",{attrs:{variant:"info"},on:{click:function(a){return t.update("P")}}},[t._v("매출")])],1)],1)],1),t._v(" "),n("b-row",{staticClass:"head"},[n("b-col",[n("b-form-checkbox",{attrs:{indeterminate:t.indeterminate},on:{change:t.toggle_all_chk},model:{value:t.all_chk,callback:function(a){t.all_chk=a},expression:"all_chk"}},[t._v("\r\n                    All\r\n                ")])],1),t._v(" "),n("b-col",[t._v("결제방식")]),t._v(" "),n("b-col",[t._v("주문번호")]),t._v(" "),n("b-col",[t._v("담당자")]),t._v(" "),n("b-col",[t._v("매출처")]),t._v(" "),n("b-col",[t._v("소속")]),t._v(" "),n("b-col",[t._v("고객명")]),t._v(" "),n("b-col",[t._v("품목명")]),t._v(" "),n("b-col",[t._v("공급가액")]),t._v(" "),n("b-col",[t._v("세액")]),t._v(" "),n("b-col",[t._v("합계")])],1),t._v(" "),t._l(t.lga_data.data,(function(a,e){return n("b-row",{key:a.lga_id,staticClass:"body"},[n("b-col",[n("b-form-checkbox",{attrs:{name:"lga_check"},on:{change:t.chkChange},model:{value:a.lga_check,callback:function(n){t.$set(a,"lga_check",n)},expression:"lga.lga_check"}},[t._v("\r\n                    "+t._s(t.lga_data.total-t.lga_data.per_page*(t.lga_data.current_page-1)-e)+"\r\n                ")])],1),t._v(" "),n("b-col",[t._v(t._s(t.config.pay_type[a.lga_pay_type]))]),t._v(" "),n("b-col",[t._v(t._s(a.lga_od_id))]),t._v(" "),n("b-col",[t._v(t._s(a.lga_mng))]),t._v(" "),n("b-col",[t._v(t._s(a.lga_distributor))]),t._v(" "),n("b-col",[t._v(t._s(a.lga_depart))]),t._v(" "),n("b-col",[t._v(t._s(a.lga_orderer))]),t._v(" "),n("b-col",[t._v(t._s(a.lga_od_name))]),t._v(" "),n("b-col",[t._v(t._s(t._f("comma")(a.lga_ea_p)))]),t._v(" "),n("b-col",[t._v(t._s(t._f("comma")(a.lga_surtax)))]),t._v(" "),n("b-col",[t._v(t._s(t._f("comma")(a.lga_sum_p)))])],1)})),t._v(" "),n("pagination",{staticClass:"mt-5",attrs:{data:t.lga_data,align:"center"},on:{"pagination-change-page":t.index}})],2)],1)}),[],!1,null,"4b9b3b90",null).exports}}]);