"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8562],{5033:(t,e,o)=>{o.d(e,{Z:()=>_});var r=o(3645),a=o.n(r),n=o(2756),i=a()((function(t){return t[1]}));i.i(n.Z),i.push([t.id,"",""]);const _=i},2756:(t,e,o)=>{o.d(e,{Z:()=>n});var r=o(3645),a=o.n(r)()((function(t){return t[1]}));a.push([t.id,".card { border-radius:10px; margin-bottom:20px; }\r\n.card .tit { border-left:3px solid #17a2b8; font-weight:bold; font-size:20px; padding-left:30px; margin-bottom:20px; }\r\n\r\n#adm_order_edit .badge { font-size:100%; }\r\n#adm_order_edit .head { padding:0.3rem 15px; position:sticky; top:0; z-index:1; background: #17a2b8c2; margin-top: 30px; }\r\n#adm_order_edit .head span { margin-right:1rem; }\r\n#adm_order_edit .head span.badge { margin-right:2rem; }\r\n#adm_order_edit .head span svg { margin-right:0.5rem; }\r\n.actionArea { position:sticky; top:0; z-index:1021; }\r\n.actionArea .input-group { position:absolute; top:2px; right:15px; max-width:690px; }\r\n@media (max-width: 992px) {\r\n    .actionArea { position:static; }\r\n    .actionArea .input-group { position:static; max-width:none; }\r\n}\r\n\r\n#adm_order_edit .body .container { border-left: 3px solid #b81717; margin-top:40px; }\r\n#adm_order_edit .card .container { font-size:.9rem; }\r\n#adm_order_edit .body .container h5 { margin-bottom:30px;  border-bottom: 1px solid #b81717; margin-left:-10px; padding: 5px 15px; max-width:700px; }\r\n#adm_order_edit .body .container .row a { flex:0 0 130px; max-width:130px; padding-right: 15px; padding-left: 15px; }\r\n#adm_order_edit .body .container .row a img { width:100px; height:100px; object-fit:cover; }\r\n#adm_order_edit .body .container .row .col .gd_name .col { color:#006edf; font-weight:bold; font-size:1rem; }\r\n#adm_order_edit .body .container .row .col .gm:not(:last-child) { border-bottom:1px solid #aaa; }\r\n#adm_order_edit .body .container .row .col .gm { align-items: center; padding:5px 0; }\r\n#adm_order_edit .body .container .row .col .gm .col .divider { font-size:1.6rem; font-weight:bold; color:#b81717; padding:0 5px; position:relative; top:3px; line-height:14px; }\r\n#adm_order_edit .body .container .row .col .gm .col:nth-of-type(1), \r\n#adm_order_edit .body .container .row .col .gm .col:nth-of-type(2) { border-right:1px solid #ddd; } \r\n#adm_order_edit .body .container .row .col .gm .col:nth-of-type(2),\r\n#adm_order_edit .body .container .row .col .gm .col:nth-of-type(3) { flex:0 0 25%; max-width:25%; }\r\n#adm_order_edit .body .container .row .col .row .price { text-align:right; }\r\n#adm_order_edit .body .container .row .col .opc { padding-top:5px; }\r\n#adm_order_edit .body .container .row .col .gm .price .multi,\r\n#adm_order_edit .body .container .row .col .opc .price .multi { min-width:6rem; display:inline-block; }\r\n#adm_order_edit .price .container .row .col { text-align:right; }\r\n#adm_order_edit .price .container .row .col b { min-width:8rem; display:inline-block; }\r\n\r\n\r\n\r\n#adm_order_edit .receiver .col .fade-enter-active,\r\n#adm_order_edit .receiver .col .fade-leave-active { transition: opacity .001s; }\r\n#adm_order_edit .receiver .col .fade-enter,\r\n#adm_order_edit .receiver .col .fade-leave-to { opacity: 0; }\r\n#adm_order_edit .receiver .rs_modal-card { max-width:800px; text-align:center; overflow-y:scroll; }",""]);const n=a},8562:(t,e,o)=>{o.r(e),o.d(e,{default:()=>m});var r=o(7757),a=o.n(r),n=o(4670);o(9087);function i(t,e,o,r,a,n,i){try{var _=t[n](i),d=_.value}catch(t){return void o(t)}_.done?e(d):Promise.resolve(d).then(r,a)}function _(t){return function(){var e=this,o=arguments;return new Promise((function(r,a){var n=t.apply(e,o);function _(t){i(n,r,a,_,d,"next",t)}function d(t){i(n,r,a,_,d,"throw",t)}_(void 0)}))}}var d=new Date;const s={name:"edit",components:{Modal:function(){return o.e(1284).then(o.bind(o,1284))}},data:function(){return{isModalViewed:!1,od:{order_extra_info:{},pa_list:{price:{}}}}},computed:{payPlanDisplay:function(){var t=this.od.order_extra_info.oex_pay_plan,e="";return"soon"==t?e="선":"week1"==t?e="1주이내":"week2"==t?e="2주이내":"month1"==t?e="한달이내":"month2"==t&&(e="2개월이내"),e}},methods:{edit:function(){var t=this;return _(a().mark((function e(){var o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.Z.get("/api/admin/shop/order/".concat(t.$route.params.od_id,"/edit"));case 3:(o=e.sent)&&200===o.status&&(t.od=o.data,t.loaded=!0),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),Notify.consolePrint(e.t0),Notify.toast("warning",e.t0.response.data.message);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))()},update:function(t){var e=this;return _(a().mark((function o(){var r;return a().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,e.od=Object.assign({},e.od,{_method:"PATCH",type:t}),"od_mng"==t&&(e.od.od_mng=Auth.user().id,e.od.od_mng_nm=Auth.user().name),o.next=5,n.Z.post("/api/admin/shop/order/".concat(e.$route.params.od_id),e.od);case 5:(r=o.sent)&&200===r.status&&"success"===r.data.msg?"od_mng"==t?Notify.toast("success","담당 배정 완료"):"od_step"==t&&Notify.toast("success","주문 처리 단계 수정"):Notify.toast("warning","수정 실패"),o.next=13;break;case 9:o.prev=9,o.t0=o.catch(0),Notify.consolePrint(o.t0),Notify.toast("warning",o.t0.response);case 13:case"end":return o.stop()}}),o,null,[[0,9]])})))()},fileDown:function(t,e){return _(a().mark((function o(){var r,i,_;return a().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,n.Z.get(e,{responseType:"blob"});case 3:r=o.sent,i=window.URL.createObjectURL(new Blob([r.data])),(_=document.createElement("a")).href=i,_.setAttribute("download",t),document.body.appendChild(_),_.click(),o.next=15;break;case 12:o.prev=12,o.t0=o.catch(0),Notify.consolePrint(o.t0);case 15:case"end":return o.stop()}}),o,null,[[0,12]])})))()},print:function(){var t=this;return _(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$htmlToPaper("print_area",{styles:["https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css","/css/fontawesome_svg.css","/css/adm_shop_order_edit.css"]});case 2:case"end":return e.stop()}}),e)})))()},estimateExcel:function(){var t=this;return _(a().mark((function e(){var o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.mngChk(),e.next=4,n.Z.get("/api/admin/shop/order/exportEstimateExcel/".concat(t.$route.params.od_id),{responseType:"blob"});case 4:o=e.sent,t.orderDocumentDown(o,"Estimate_"+d.format("yyyyMMdd")+".xlsx"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Notify.consolePrint(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},estimatePdf:function(){var t=this;return _(a().mark((function e(){var o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.mngChk(),e.next=4,n.Z.get("/api/admin/shop/order/exportEstimatePdf/".concat(t.$route.params.od_id),{responseType:"blob"});case 4:o=e.sent,t.orderDocumentDown(o,"Estimate_"+d.format("yyyyMMdd")+".pdf"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Notify.consolePrint(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},transactionExcel:function(){var t=this;return _(a().mark((function e(){var o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.mngChk(),e.next=4,n.Z.get("/api/admin/shop/order/exportTransactionExcel/".concat(t.$route.params.od_id),{responseType:"blob"});case 4:o=e.sent,t.orderDocumentDown(o,"Transaction_"+d.format("yyyyMMdd")+".xlsx"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Notify.consolePrint(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},transactionPdf:function(){var t=this;return _(a().mark((function e(){var o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.mngChk(),e.next=4,n.Z.get("/api/admin/shop/order/exportTransactionPdf/".concat(t.$route.params.od_id),{responseType:"blob"});case 4:o=e.sent,t.orderDocumentDown(o,"Transaction_"+d.format("yyyyMMdd")+".pdf"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Notify.consolePrint(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},orderDocumentDown:function(t,e){var o=window.URL.createObjectURL(new Blob([t.data])),r=document.createElement("a");r.href=o,r.setAttribute("download",e),document.body.appendChild(r),r.click()},mngChk:function(){if(!this.od.od_mng)return Notify.modal("담당자 배정 이후에 사용가능합니다."),!1},onlineBooks:function(){var t=this;return _(a().mark((function e(){var o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.od.data_type="ORD",e.next=4,n.Z.post("/api/admin/ledger",t.od);case 4:(o=e.sent)&&200===o.status?t.$router.push({name:"adm_ledger"}):Notify.toast("warning","기록 실패"),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),Notify.consolePrint(e.t0),Notify.toast("warning",e.t0.response);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))()}},mounted:function(){this.edit()}};var c=o(3379),v=o.n(c),p=o(5033),l={insert:"head",singleton:!1};v()(p.Z,l);p.Z.locals;const m=(0,o(1900).Z)(s,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"adm_order_edit"}},[o("div",{staticClass:"actionArea"},[o("b-input-group",{attrs:{size:"sm"}},[o("b-input-group-prepend",{staticClass:"bg-light btn_group"},[o("b-button",{attrs:{to:{name:"adm_order_index"},variant:"outline-secondary"}},[t._v("목록")]),t._v(" "),o("b-dropdown",{attrs:{size:"sm",text:"파일 출력",variant:"warning"}},[o("b-dropdown-item-button",{attrs:{variant:"success"},on:{click:t.estimateExcel}},[t._v("견적서 "),o("b-badge",[t._v("EXCEL")])],1),t._v(" "),o("b-dropdown-item-button",{attrs:{variant:"warning"},on:{click:t.estimatePdf}},[t._v("견적서 "),o("b-badge",[t._v("PDF")])],1),t._v(" "),o("b-dropdown-divider"),t._v(" "),o("b-dropdown-item-button",{attrs:{variant:"success"},on:{click:t.transactionExcel}},[t._v("거래명세서 "),o("b-badge",[t._v("EXCEL")])],1),t._v(" "),o("b-dropdown-item-button",{attrs:{variant:"warning"},on:{click:t.transactionPdf}},[t._v("거래명세서 "),o("b-badge",[t._v("PDF")])],1)],1),t._v(" "),o("b-button",{attrs:{variant:"info"},on:{click:t.onlineBooks}},[o("b-icon-journal-bookmark-fill"),t._v(" 장부기록")],1),t._v(" "),o("b-button",{attrs:{variant:"dark"},on:{click:t.print}},[t._v("인쇄")]),t._v(" "),t.od.od_mng<1?o("b-button",{on:{click:function(e){return t.update("od_mng")}}},[t._v("담당")]):o("b-button",[t._v(t._s(t.od.od_mng_nm))])],1),t._v(" "),o("b-form-select",{model:{value:t.od.od_step,callback:function(e){t.$set(t.od,"od_step",e)},expression:"od.od_step"}},[o("b-form-select-option",{attrs:{value:null,disabled:""}},[t._v("◖주문 처리 단계◗")]),t._v(" "),o("b-form-select-option",{attrs:{value:"10"}},[t._v("주문접수")]),t._v(" "),o("b-form-select-option-group",{attrs:{label:"---- 주문 수정 옵션 ----"}},[o("b-form-select-option",{attrs:{value:"11"}},[t._v("승인대기")]),t._v(" "),o("b-form-select-option",{attrs:{value:"12"}},[t._v("결제대기")])],1),t._v(" "),o("b-form-select-option",{attrs:{value:"20"}},[t._v("결제완료")]),t._v(" "),o("b-form-select-option-group",{attrs:{label:"---- 배송 옵션 ----"}},[o("b-form-select-option",{attrs:{value:"30"}},[t._v("배송준비")]),t._v(" "),o("b-form-select-option",{attrs:{value:"31"}},[t._v("배송중")]),t._v(" "),o("b-form-select-option",{attrs:{value:"32"}},[t._v("배송완료")])],1),t._v(" "),o("b-form-select-option",{attrs:{value:"40"}},[t._v("구매확정")]),t._v(" "),o("b-form-select-option-group",{attrs:{label:"---- 주문 실패 옵션 ----"}},[o("b-form-select-option",{attrs:{value:"50"}},[t._v("주문취소")]),t._v(" "),o("b-form-select-option",{attrs:{value:"51"}},[t._v("결제실패")])],1)],1),t._v(" "),o("b-input-group-append",[o("b-button",{on:{click:function(e){return t.update("od_step")}}},[t._v("변경")])],1)],1)],1),t._v(" "),o("div",{attrs:{id:"print_area"}},[o("b-card",{staticClass:"head",attrs:{"no-body":""}},[o("div",[o("b-badge",[t._v(t._s(t.od.od_id)+".")]),t._v(" "),o("span",[o("font-awesome-icon",{attrs:{icon:"tags"}}),t._v(t._s(t.od.od_no))],1),t._v(" "),o("span",[o("font-awesome-icon",{attrs:{icon:"clock"}}),t._v(t._s(t._f("formatDate")(t.od.created_at)))],1),t._v(" "),o("span",[o("font-awesome-icon",{attrs:{icon:"user"}}),t._v(t._s(t.od.od_orderer))],1),t._v(" "),o("span",[o("font-awesome-icon",{attrs:{icon:"phone"}}),t._v(t._s(t.od.od_orderer_hp))],1),t._v(" "),o("span",[o("font-awesome-icon",{attrs:{icon:"at"}}),t._v(t._s(t.od.od_orderer_email))],1)],1)]),t._v(" "),o("b-card",{staticClass:"body"},[o("div",{staticClass:"tit"},[t._v("주문 상품")]),t._v(" "),t._l(t.od.pa_list.lists,(function(e,r){return o("b-container",{key:"pa_"+r},[o("h5",[e.list[0].purchase_at?[t._v(t._s(e.list[0].purchase_at.pa_name)+" "),o("b",[t._v("직배송 상품")])]:[t._v("4SCIENCE")]],2),t._v(" "),t._l(e.list,(function(e,r){return o("b-row",{key:"gd_"+r},[0!=r?o("b-col",{attrs:{cols:"12"}},[o("hr")]):t._e(),t._v(" "),o("b-link",{attrs:{to:{name:"adm_goods_edit",params:{gd_id:e.gd_id}}}},[o("img",{attrs:{src:e.image_src_thumb[0]}})]),t._v(" "),o("b-col",[o("b-row",{staticClass:"gd_name"},[o("b-col",[t._v(t._s(e.gd_name))])],1),t._v(" "),t._l(e.goods_model,(function(r,a){return o("b-row",{key:"gm_"+a,staticClass:"gm"},[o("b-col",[o("b",{staticClass:"gd_name"},[t._v(t._s(r.gm_name))]),t._v(" "),o("b",{staticClass:"divider"},[t._v("/")]),t._v("\r\n                                "+t._s(r.gm_code)+"\r\n                                "),o("b",{staticClass:"divider"},[t._v("/")]),t._v("\r\n                                "+t._s(r.gm_catno)+"\r\n                                "),o("b",{staticClass:"divider"},[t._v("/")]),t._v("\r\n                                "+t._s(e.maker.mk_name)+"\r\n                                "),o("b",{staticClass:"divider"},[t._v("/")]),t._v("\r\n                                "+t._s(r.gm_unit)+"\r\n                            ")]),t._v(" "),o("b-col",[t._v(t._s(r.gm_spec))]),t._v(" "),o("b-col",{staticClass:"price"},[t._v("\r\n                                "+t._s(t._f("comma")(r.odm_price_add_vat))+" 원\r\n                                "),o("font-awesome-icon",{attrs:{icon:"times"}}),t._v("\r\n                                "+t._s(t._f("comma")(r.ea))+" 개\r\n                                "),o("font-awesome-icon",{attrs:{icon:"equals"}}),t._v(" "),o("b",{staticClass:"multi"},[t._v(t._s(t._f("comma")(r.odm_price_add_vat*r.ea))+" 원")])],1)],1)})),t._v(" "),t._l(e.option_child,(function(e,r){return o("b-row",{key:"opc_"+r,staticClass:"opc"},[o("b-col",{staticClass:"option_info",attrs:{cols:"6"}},[t._v("\r\n                                "+t._s(e.option.op_name)+": "+t._s(e.opc_name)+"\r\n                            ")]),t._v(" "),o("b-col",{staticClass:"price"},[t._v("\r\n                                "+t._s(t._f("comma")(e.odo_price_add_vat))+" 원\r\n                                "),o("font-awesome-icon",{attrs:{icon:"times"}}),t._v(" "),t._v("\r\n                                "+t._s(t._f("comma")(e.ea))+" 개\r\n                                "),o("font-awesome-icon",{attrs:{icon:"equals"}}),t._v(" "),o("b",{staticClass:"multi"},[t._v(t._s(t._f("comma")(e.odo_price_add_vat*e.ea))+" 원")])],1)],1)}))],2)],1)}))],2)}))],2),t._v(" "),o("b-card",{staticClass:"price"},[o("div",{staticClass:"tit"},[t._v("총 금액")]),t._v(" "),o("b-container",[o("b-row",[o("b-col",{attrs:{offset:"6"}},[o("p",[t._v("상품 : "),o("b",[t._v(t._s(t._f("comma")(t.od.od_gd_price))+" 원")])]),t._v(" "),o("p",[t._v("배송비 : "),o("b",[t._v(t._s(t._f("comma")(t.od.od_dlvy_price))+" 원")])]),t._v(" "),t.od.od_air_price?o("p",[t._v("항공운임료 : "),o("b",[t._v(t._s(t._f("comma")(t.od.od_air_price))+" 원")])]):t._e(),t._v(" "),o("p",[t._v("총금액 : "),o("b",[t._v(t._s(t._f("comma")(t.od.od_all_price))+" 원")])])])],1)],1)],1),t._v(" "),o("b-card",{staticClass:"receiver"},[o("div",{staticClass:"tit"},[t._v("배송, 결제 정보")]),t._v(" "),o("b-container",[o("b-row",[o("b-col",[o("font-awesome-icon",{attrs:{icon:"user"}}),t._v(" "),o("span",{staticClass:"mr-3"},[t._v(t._s(t.od.od_receiver))]),t._v(" "),o("font-awesome-icon",{attrs:{icon:"phone"}}),t._v(" "),o("span",{staticClass:"mr-3"},[t._v(t._s(t.od.od_receiver_hp))]),t._v(" "),o("font-awesome-icon",{attrs:{icon:"map-marked-alt"}}),t._v(" "),o("span",{staticClass:"mr-3"},[t._v(t._s(t.od.od_zip)),o("b",[t._v(",")]),t._v(" "+t._s(t.od.od_addr1)),o("b",[t._v(",")]),t._v(" "+t._s(t.od.od_addr2))]),t._v(" "),o("p",[o("font-awesome-icon",{attrs:{icon:"info"}}),t._v(" "),o("span",[t._v(t._s(t.od.od_memo))])],1)],1)],1),t._v(" "),o("hr"),t._v(" "),o("b-row",[o("b-col",[o("b-badge",[t._v("결제수단")]),t._v(" "),"C"==t.od.od_pay_method?o("span",[o("b-badge",{attrs:{variant:"light"}},[t._v("카드")])],1):"B"==t.od.od_pay_method?o("span",[o("b-badge",{attrs:{variant:"light"}},[t._v("계좌이체")]),t._v(" "),"K"==t.od.order_extra_info.oex_finance_type?o("b-badge",{attrs:{variant:"light"}},[t._v("국민은행")]):t._e(),t._v(" "),"W"==t.od.order_extra_info.oex_finance_type?o("b-badge",{attrs:{variant:"light"}},[t._v("우리은행")]):t._e(),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.od.order_extra_info.oex_depositor))]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.payPlanDisplay)+" 결제")])],1):"P"==t.od.od_pay_method?o("span",[o("b-badge",{attrs:{variant:"light"}},[t._v("PSYS")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.od.order_extra_info.oex_depositor))]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.payPlanDisplay)+" 결제")])],1):"S"==t.od.od_pay_method?o("span",[o("b-badge",{attrs:{variant:"light"}},[t._v("전표")]),t._v(" "),"SH"==t.od.order_extra_info.oex_finance_type?o("b-badge",{attrs:{variant:"light"}},[t._v("신한")]):"BC"==t.od.order_extra_info.oex_finance_type?o("b-badge",{attrs:{variant:"light"}},[t._v("BC")]):"SS"==t.od.order_extra_info.oex_finance_type?o("b-badge",{attrs:{variant:"light"}},[t._v("삼성")]):o("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.od.order_extra_info.oex_finance_type))]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.payPlanDisplay)+" 결제")])],1):"E"==t.od.od_pay_method?o("span",[t._v("에스크로")]):t._e(),t._v(" "),o("b-badge",[t._v("구매환경")]),t._v(" "),"P"==t.od.od_sale_env?o("span",[t._v("웹")]):"M"==t.od.od_sale_env?o("span",[t._v("모바일")]):t._e(),t._v(" "),o("b-badge",[t._v("요청서류")]),t._v(" "),o("span",[t.od.order_extra_info?["Y"==t.od.order_extra_info.oex_req_est?o("b-badge",{attrs:{variant:"light"}},[t._v("견적서")]):t._e(),t._v(" "),"Y"==t.od.order_extra_info.oex_req_tran?o("b-badge",{attrs:{variant:"light"}},[t._v("거래명세서")]):t._e(),t._v(" "),"Y"==t.od.order_extra_info.oex_req_biz?o("b-badge",{attrs:{variant:"light"}},[t._v("사업자 등록증 사본")]):t._e(),t._v(" "),"Y"==t.od.order_extra_info.oex_req_bank?o("b-badge",{attrs:{variant:"light"}},[t._v("통장사본")]):t._e(),t._v(" "),"N"==t.od.order_extra_info.oex_req_est&&"N"==t.od.order_extra_info.oex_req_tran&&"N"==t.od.order_extra_info.oex_req_biz&&"N"==t.od.order_extra_info.oex_req_bank?o("b-badge",{attrs:{variant:"warning"}},[t._v("없음")]):t._e()]:[o("b-badge",{attrs:{variant:"warning"}},[t._v("없음")])]],2)],1)],1),t._v(" "),o("hr"),t._v(" "),"B"!=t.od.od_pay_method&&"E"!=t.od.od_pay_method||!t.od.order_extra_info?t._e():o("b-row",[o("b-col",[o("b-badge",[t._v("지출증빙")]),t._v(" "),"IV"==t.od.order_extra_info.oex_type?o("span",[o("b-alert",{attrs:{show:"",variant:"success"}},[o("h5",{staticClass:"alert-heading"},[t._v("세금계산서")]),t._v(" "),t.od.file_info?[t.checkImage(t.od.file_info.fi_ext)?[o("b-button",{on:{click:function(e){t.isModalViewed=!t.isModalViewed}}},[t._v("사업자 등록증 보기")]),t._v(" "),o("transition",{attrs:{name:"fade"}},[t.isModalViewed?o("Modal",{on:{"close-modal":function(e){t.isModalViewed=!1}}},[o("img",{staticStyle:{"max-width":"100%",height:"auto"},attrs:{src:t.od.file_info.path},on:{click:function(e){return t.fileDown(t.od.file_info.fi_original,t.od.file_info.path)}}})]):t._e()],1)]:[o("b-button",{on:{click:function(e){return t.fileDown(t.od.file_info.fi_original,t.od.file_info.path)}}},[t._v("사업자 등록증 다운로드")])]]:[o("b-badge",{attrs:{variant:"light"}},[t._v("법인명: "+t._s(t.od.order_extra_info.oex_biz_name))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("등록번호: "+t._s(t.od.order_extra_info.oex_biz_num))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("업태: "+t._s(t.od.order_extra_info.oex_biz_type))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("종목: "+t._s(t.od.order_extra_info.oex_biz_item))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("대표자: "+t._s(t.od.order_extra_info.oex_ceo))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("소재지: "+t._s(t.od.order_extra_info.oex_addr))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("요청사항: "+t._s(t.od.order_extra_info.oex_requirement))]),o("b",[t._v(",")])],t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("담당자: "+t._s(t.od.order_extra_info.oex_mng))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("담당이메일: "+t._s(t.od.order_extra_info.oex_email))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("담당HP: "+t._s(t.od.order_extra_info.oex_num))])],2)],1):"HP"==t.od.order_extra_info.oex_type||"CN"==t.od.order_extra_info.oex_type||"BN"==t.od.order_extra_info.oex_type?o("span"):"NO"==t.od.order_extra_info.oex_type?o("span",[o("b-badge",{attrs:{variant:"warning"}},[t._v("없음")])],1):t._e()],1)],1)],1)],1)],1)])}),[],!1,null,null,null).exports}}]);