"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4422],{6585:(t,e,o)=>{o.d(e,{Z:()=>n});var a=o(3645),r=o.n(a)()((function(t){return t[1]}));r.push([t.id,"#adm_order_edit .badge{font-size:100%}#adm_order_edit .od_header{padding:.3rem 15px;z-index:999}#adm_order_edit .od_header span{margin-right:1rem}#adm_order_edit .od_header span.badge{margin-right:2rem}#adm_order_edit .od_header span svg{margin-right:.5rem}.actionArea{position:-webkit-sticky;position:sticky;top:0;z-index:1021}.actionArea .input-group{max-width:690px;position:absolute;right:0;top:2px}@media (max-width:992px){.actionArea{position:static}.actionArea .input-group{max-width:none;position:static}}#adm_order_edit .order_goods_info .gd_info .goods a{margin-right:1rem}#adm_order_edit .order_goods_info .gd_info .goods a img{max-width:100px}#adm_order_edit .order_goods_info .gd_info .goods div{display:inline-block}#adm_order_edit .order_goods_info .gd_info .model .model_info b{margin:0 .8rem}#adm_order_edit .order_goods_info .final_price p b,#adm_order_edit .order_goods_info .gd_info .model .model_price .md_multi,#adm_order_edit .order_goods_info .gd_info .option .option_price .opc_multi,#adm_order_edit .order_goods_info .gd_total_price b{display:inline-block;min-width:6rem}#adm_order_edit .receiver_info .col>.badge+span{margin-right:2rem}#adm_order_edit .receiver_info .col>.badge+span b{font-size:2rem}#adm_order_edit .receiver_info .col .fade-enter-active,#adm_order_edit .receiver_info .col .fade-leave-active{transition:opacity 1ms}#adm_order_edit .receiver_info .col .fade-enter,#adm_order_edit .receiver_info .col .fade-leave-to{opacity:0}#adm_order_edit .receiver_info .rs_modal-card{max-width:800px;overflow-y:scroll;text-align:center}",""]);const n=r},4422:(t,e,o)=>{o.r(e),o.d(e,{default:()=>m});var a=o(7757),r=o.n(a),n=o(4670);o(9087);function _(t,e,o,a,r,n,_){try{var i=t[n](_),s=i.value}catch(t){return void o(t)}i.done?e(s):Promise.resolve(s).then(a,r)}function i(t){return function(){var e=this,o=arguments;return new Promise((function(a,r){var n=t.apply(e,o);function i(t){_(n,a,r,i,s,"next",t)}function s(t){_(n,a,r,i,s,"throw",t)}i(void 0)}))}}var s=new Date;const d={name:"edit",components:{Modal:function(){return o.e(6241).then(o.bind(o,6241))}},data:function(){return{isModalViewed:!1,od:{order_extra_info:{},pa_list:{price:{}}}}},computed:{payPlanDisplay:function(){var t=this.od.order_extra_info.oex_pay_plan,e="";return"soon"==t?e="선":"week1"==t?e="1주이내":"week2"==t?e="2주이내":"month1"==t?e="한달이내":"month2"==t&&(e="2개월이내"),e}},methods:{edit:function(){var t=this;return i(r().mark((function e(){var o;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.Z.get("/api/admin/shop/order/".concat(t.$route.params.od_id,"/edit"));case 3:(o=e.sent)&&200===o.status&&(t.od=o.data,t.loaded=!0),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),Notify.consolePrint(e.t0),Notify.toast("warning",e.t0.response.data.message);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))()},update:function(t){var e=this;return i(r().mark((function o(){var a;return r().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,e.od=Object.assign({},e.od,{_method:"PATCH",type:t}),"od_mng"==t&&(e.od.od_mng=Auth.user().id,e.od.od_mng_nm=Auth.user().name),o.next=5,n.Z.post("/api/admin/shop/order/".concat(e.$route.params.od_id),e.od);case 5:(a=o.sent)&&200===a.status&&"success"===a.data.msg?"od_mng"==t?Notify.toast("success","담당 배정 완료"):"od_step"==t&&Notify.toast("success","주문 처리 단계 수정"):Notify.toast("warning","수정 실패"),o.next=13;break;case 9:o.prev=9,o.t0=o.catch(0),Notify.consolePrint(o.t0),Notify.toast("warning",o.t0.response);case 13:case"end":return o.stop()}}),o,null,[[0,9]])})))()},fileDown:function(t,e){return i(r().mark((function o(){var a,_,i;return r().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,n.Z.get(e,{responseType:"blob"});case 3:a=o.sent,_=window.URL.createObjectURL(new Blob([a.data])),(i=document.createElement("a")).href=_,i.setAttribute("download",t),document.body.appendChild(i),i.click(),o.next=15;break;case 12:o.prev=12,o.t0=o.catch(0),Notify.consolePrint(o.t0);case 15:case"end":return o.stop()}}),o,null,[[0,12]])})))()},print:function(){var t=this;return i(r().mark((function e(){return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$htmlToPaper("print_area",{styles:["https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css","/css/fontawesome_svg.css","/css/adm_shop_order_edit.css"]});case 2:case"end":return e.stop()}}),e)})))()},estimateExcel:function(){var t=this;return i(r().mark((function e(){var o;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.mngChk(),e.next=4,n.Z.get("/api/admin/shop/order/exportEstimateExcel/".concat(t.$route.params.od_id),{responseType:"blob"});case 4:o=e.sent,t.orderDocumentDown(o,"Estimate_"+s.format("yyyyMMdd")+".xlsx"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Notify.consolePrint(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},estimatePdf:function(){var t=this;return i(r().mark((function e(){var o;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.mngChk(),e.next=4,n.Z.get("/api/admin/shop/order/exportEstimatePdf/".concat(t.$route.params.od_id),{responseType:"blob"});case 4:o=e.sent,t.orderDocumentDown(o,"Estimate_"+s.format("yyyyMMdd")+".pdf"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Notify.consolePrint(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},transactionExcel:function(){var t=this;return i(r().mark((function e(){var o;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.mngChk(),e.next=4,n.Z.get("/api/admin/shop/order/exportTransactionExcel/".concat(t.$route.params.od_id),{responseType:"blob"});case 4:o=e.sent,t.orderDocumentDown(o,"Transaction_"+s.format("yyyyMMdd")+".xlsx"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Notify.consolePrint(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},transactionPdf:function(){var t=this;return i(r().mark((function e(){var o;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.mngChk(),e.next=4,n.Z.get("/api/admin/shop/order/exportTransactionPdf/".concat(t.$route.params.od_id),{responseType:"blob"});case 4:o=e.sent,t.orderDocumentDown(o,"Transaction_"+s.format("yyyyMMdd")+".pdf"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Notify.consolePrint(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},orderDocumentDown:function(t,e){var o=window.URL.createObjectURL(new Blob([t.data])),a=document.createElement("a");a.href=o,a.setAttribute("download",e),document.body.appendChild(a),a.click()},mngChk:function(){if(!this.od.od_mng)return Notify.modal("담당자 배정 이후에 사용가능합니다."),!1},onlineBooks:function(){var t=this;return i(r().mark((function e(){var o;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.od.data_type="ORD",e.next=4,n.Z.post("/api/admin/ledger",t.od);case 4:(o=e.sent)&&200===o.status?t.$router.push({name:"adm_ledger"}):Notify.toast("warning","기록 실패"),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),Notify.consolePrint(e.t0),Notify.toast("warning",e.t0.response);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))()}},mounted:function(){this.edit()}};var c=o(3379),v=o.n(c),l=o(6585),p={insert:"head",singleton:!1};v()(l.Z,p);l.Z.locals;const m=(0,o(1900).Z)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"actionArea"},[o("b-input-group",{attrs:{size:"sm"}},[o("b-input-group-prepend",{staticClass:"bg-light btn_group"},[o("b-button",{attrs:{to:{name:"adm_order_index"},variant:"outline-secondary"}},[t._v("목록")]),t._v(" "),o("b-dropdown",{attrs:{size:"sm",text:"파일 출력",variant:"warning"}},[o("b-dropdown-item-button",{attrs:{variant:"success"},on:{click:t.estimateExcel}},[t._v("견적서 "),o("b-badge",[t._v("EXCEL")])],1),t._v(" "),o("b-dropdown-item-button",{attrs:{variant:"warning"},on:{click:t.estimatePdf}},[t._v("견적서 "),o("b-badge",[t._v("PDF")])],1),t._v(" "),o("b-dropdown-divider"),t._v(" "),o("b-dropdown-item-button",{attrs:{variant:"success"},on:{click:t.transactionExcel}},[t._v("거래명세서 "),o("b-badge",[t._v("EXCEL")])],1),t._v(" "),o("b-dropdown-item-button",{attrs:{variant:"warning"},on:{click:t.transactionPdf}},[t._v("거래명세서 "),o("b-badge",[t._v("PDF")])],1)],1),t._v(" "),o("b-button",{attrs:{variant:"info"},on:{click:t.onlineBooks}},[o("b-icon-journal-bookmark-fill"),t._v(" 장부기록")],1),t._v(" "),o("b-button",{attrs:{variant:"dark"},on:{click:t.print}},[t._v("인쇄")]),t._v(" "),t.od.od_mng<1?o("b-button",{on:{click:function(e){return t.update("od_mng")}}},[t._v("담당")]):o("b-button",[t._v(t._s(t.od.od_mng_nm))])],1),t._v(" "),o("b-form-select",{model:{value:t.od.od_step,callback:function(e){t.$set(t.od,"od_step",e)},expression:"od.od_step"}},[o("b-form-select-option",{attrs:{value:null,disabled:""}},[t._v("◖주문 처리 단계◗")]),t._v(" "),o("b-form-select-option",{attrs:{value:"10"}},[t._v("주문접수")]),t._v(" "),o("b-form-select-option-group",{attrs:{label:"---- 주문 수정 옵션 ----"}},[o("b-form-select-option",{attrs:{value:"11"}},[t._v("승인대기")]),t._v(" "),o("b-form-select-option",{attrs:{value:"12"}},[t._v("결제대기")])],1),t._v(" "),o("b-form-select-option",{attrs:{value:"20"}},[t._v("결제완료")]),t._v(" "),o("b-form-select-option-group",{attrs:{label:"---- 배송 옵션 ----"}},[o("b-form-select-option",{attrs:{value:"30"}},[t._v("배송준비")]),t._v(" "),o("b-form-select-option",{attrs:{value:"31"}},[t._v("배송중")]),t._v(" "),o("b-form-select-option",{attrs:{value:"32"}},[t._v("배송완료")])],1),t._v(" "),o("b-form-select-option",{attrs:{value:"40"}},[t._v("구매확정")]),t._v(" "),o("b-form-select-option-group",{attrs:{label:"---- 주문 실패 옵션 ----"}},[o("b-form-select-option",{attrs:{value:"50"}},[t._v("주문취소")]),t._v(" "),o("b-form-select-option",{attrs:{value:"51"}},[t._v("결제실패")])],1)],1),t._v(" "),o("b-input-group-append",[o("b-button",{on:{click:function(e){return t.update("od_step")}}},[t._v("변경")])],1)],1)],1),t._v(" "),o("div",{attrs:{id:"print_area"}},[o("div",{attrs:{id:"adm_order_edit"}},[o("b-card",{staticClass:"shadow mt-3 od_header sticky-top",attrs:{"no-body":""}},[o("div",[o("b-badge",[t._v(t._s(t.od.od_id)+".")]),t._v(" "),o("span",[o("font-awesome-icon",{attrs:{icon:"tags"}}),t._v(t._s(t.od.od_no))],1),t._v(" "),o("span",[o("font-awesome-icon",{attrs:{icon:"clock"}}),t._v(t._s(t._f("formatDate")(t.od.created_at)))],1),t._v(" "),o("span",[o("font-awesome-icon",{attrs:{icon:"user"}}),t._v(t._s(t.od.od_orderer))],1),t._v(" "),o("span",[o("font-awesome-icon",{attrs:{icon:"phone"}}),t._v(t._s(t.od.od_orderer_hp))],1),t._v(" "),o("span",[o("font-awesome-icon",{attrs:{icon:"at"}}),t._v(t._s(t.od.od_orderer_email))],1)],1)]),t._v(" "),o("b-card",{staticClass:"shadow mt-3 order_goods_info",attrs:{"header-tag":"header","footer-tag":"footer"},scopedSlots:t._u([{key:"header",fn:function(){return[o("b",[t._v("주문 상품")])]},proxy:!0},{key:"footer",fn:function(){return[o("b-container",{attrs:{fluid:""}},[o("b-row",[o("b-col",{attrs:{cols:"6"}},[o("h5",[o("b",[t._v("총 금액")])])]),t._v(" "),o("b-col",{staticClass:"text-right final_price",attrs:{cols:"6"}},[o("p",[t._v("상품 : "),o("b",[t._v(t._s(t._f("comma")(t.od.od_gd_price))+" 원")])]),t._v(" "),o("p",[t._v("배송비 : "),o("b",[t._v(t._s(t._f("comma")(t.od.od_dlvy_price))+" 원")])]),t._v(" "),t.od.od_air_price?o("p",[t._v("항공운임료 : "),o("b",[t._v(t._s(t._f("comma")(t.od.od_air_price))+" 원")])]):t._e(),t._v(" "),o("p",[t._v("총금액 : "),o("b",[t._v(t._s(t._f("comma")(t.od.od_all_price))+" 원")])])])],1)],1)]},proxy:!0}])},[t._v(" "),t._l(t.od.pa_list.lists,(function(e,a,r){return o("b-alert",{key:"pa_id_"+a,attrs:{show:"",variant:r%2==0?"success":"info"}},[o("h5",[o("b",[t._v(t._s(e.list[0].purchase_at?e.list[0].purchase_at.pa_name:"4SCIENCE"))]),t._v(" 직배송 상품")]),t._v(" "),t._l(e.list,(function(e,r){return o("b-container",{key:"pa_id_"+a+"gd_idx_"+r,attrs:{fluid:""}},[0!=r?o("b-row",[o("b-col",[o("hr")])],1):t._e(),t._v(" "),o("b-row",{staticClass:"gd_info"},[o("b-col",{staticClass:"goods",attrs:{cols:"3"}},[o("b-link",{attrs:{to:{name:"adm_goods_edit",params:{gd_id:e.gd_id}}}},[o("img",{attrs:{src:e.image_src_thumb[0]}})]),t._v(" "),o("div",[o("b",[t._v(t._s(e.gd_name))]),t._v("\r\n                                    "+t._s(e.maker.mk_name)+"\r\n                                ")])],1),t._v(" "),o("b-col",[t._l(e.goods_model,(function(e,n){return o("b-container",{key:"pa_id_"+a+"gd_idx_"+r+"gm_idx_"+n,attrs:{fluid:""}},[o("b-row",{staticClass:"model mb-2"},[o("b-col",{staticClass:"model_info",attrs:{xl:"8",lg:"6"}},[t._v("\r\n                                            "+t._s(e.gm_name)+"\r\n                                            "),o("b",[t._v(t._s(e.gm_code))]),t._v("\r\n                                            ["+t._s(e.gm_catno)+"]\r\n                                            "),o("b",[t._v(t._s(e.gm_spec))]),t._v("\r\n                                            ("+t._s(e.gm_unit)+")\r\n                                        ")]),t._v(" "),o("b-col",{staticClass:"model_price text-right"},[t._v("\r\n                                            "+t._s(t._f("comma")(e.odm_price_add_vat))+" 원\r\n                                            "),o("font-awesome-icon",{attrs:{icon:"times"}}),t._v(" "),t._v("\r\n                                            "+t._s(t._f("comma")(e.ea))+" 개\r\n                                            "),o("font-awesome-icon",{attrs:{icon:"equals"}}),t._v(" "),o("b",{staticClass:"md_multi"},[t._v(t._s(t._f("comma")(e.odm_price_add_vat*e.ea))+" 원")])],1)],1)],1)})),t._v(" "),t._l(e.option_child,(function(e,n){return o("b-container",{key:"pa_id_"+a+"gd_idx_"+r+"opc_idx_"+n,attrs:{fluid:""}},[0==n?o("b-row",[o("b-col",[o("hr")])],1):t._e(),t._v(" "),o("b-row",{staticClass:"option mb-2"},[o("b-col",{staticClass:"option_info",attrs:{cols:"6"}},[t._v("\r\n                                            "+t._s(e.option.op_name)+": "+t._s(e.opc_name)+"\r\n                                        ")]),t._v(" "),o("b-col",{staticClass:"option_price text-right"},[t._v("\r\n                                            "+t._s(t._f("comma")(e.odo_price_add_vat))+" 원\r\n                                            "),o("font-awesome-icon",{attrs:{icon:"times"}}),t._v(" "),t._v("\r\n                                            "+t._s(t._f("comma")(e.ea))+" 개\r\n                                            "),o("font-awesome-icon",{attrs:{icon:"equals"}}),t._v(" "),o("b",{staticClass:"opc_multi"},[t._v(t._s(t._f("comma")(e.odo_price_add_vat*e.ea))+" 원")])],1)],1)],1)}))],2)],1)],1)})),t._v(" "),o("b-container",{attrs:{fluid:""}},[o("b-row",{attrs:{"align-h":"end"}},[o("b-col",{staticClass:"text-right gd_total_price",attrs:{lg:"3",md:"6",sm:"12"}},[o("b-alert",{staticClass:"mt-4",attrs:{show:"",variant:"light"}},[o("div",[t._v("상품 : "),o("b",[t._v(t._s(t._f("comma")(e.price.goods_add_vat))+" 원")])]),t._v(" "),o("div",[t._v("배송료 : "),o("b",[t._v(t._s(t._f("comma")(e.price.dlvy_add_vat))+" 원")])]),t._v(" "),e.price.air_add_vat?o("div",[t._v("항공운임료 : "),o("b",[t._v(t._s(t._f("comma")(e.price.air_add_vat))+" 원")])]):t._e()])],1)],1)],1)],2)}))],2),t._v(" "),o("b-card",{staticClass:"shadow mt-3 receiver_info",attrs:{"header-tag":"header","header-class":"py-2","body-class":"py-2"},scopedSlots:t._u([{key:"header",fn:function(){return[o("b",[t._v("배송 정보 / 결제 정보")])]},proxy:!0}])},[t._v(" "),o("b-container",{attrs:{fluid:""}},[o("b-row",[o("b-col",[o("font-awesome-icon",{attrs:{icon:"user"}}),t._v(" "),o("span",{staticClass:"mr-3"},[t._v(t._s(t.od.od_receiver))]),t._v(" "),o("font-awesome-icon",{attrs:{icon:"phone"}}),t._v(" "),o("span",{staticClass:"mr-3"},[t._v(t._s(t.od.od_receiver_hp))]),t._v(" "),o("font-awesome-icon",{attrs:{icon:"map-marked-alt"}}),t._v(" "),o("span",{staticClass:"mr-3"},[t._v(t._s(t.od.od_zip)),o("b",[t._v(",")]),t._v(" "+t._s(t.od.od_addr1)),o("b",[t._v(",")]),t._v(" "+t._s(t.od.od_addr2))]),t._v(" "),o("p",[o("font-awesome-icon",{attrs:{icon:"info"}}),t._v(" "),o("span",[t._v(t._s(t.od.od_memo))])],1)],1)],1),t._v(" "),o("hr"),t._v(" "),o("b-row",[o("b-col",[o("b-badge",[t._v("결제수단")]),t._v(" "),"C"==t.od.od_pay_method?o("span",[o("b-badge",{attrs:{variant:"light"}},[t._v("카드")])],1):"B"==t.od.od_pay_method?o("span",[o("b-badge",{attrs:{variant:"light"}},[t._v("계좌이체")]),t._v(" "),"K"==t.od.order_extra_info.oex_finance_type?o("b-badge",{attrs:{variant:"light"}},[t._v("국민은행")]):t._e(),t._v(" "),"W"==t.od.order_extra_info.oex_finance_type?o("b-badge",{attrs:{variant:"light"}},[t._v("우리은행")]):t._e(),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.od.order_extra_info.oex_depositor))]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.payPlanDisplay)+" 결제")])],1):"P"==t.od.od_pay_method?o("span",[o("b-badge",{attrs:{variant:"light"}},[t._v("PSYS")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.od.order_extra_info.oex_depositor))]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.payPlanDisplay)+" 결제")])],1):"S"==t.od.od_pay_method?o("span",[o("b-badge",{attrs:{variant:"light"}},[t._v("전표")]),t._v(" "),"SH"==t.od.order_extra_info.oex_finance_type?o("b-badge",{attrs:{variant:"light"}},[t._v("신한")]):"BC"==t.od.order_extra_info.oex_finance_type?o("b-badge",{attrs:{variant:"light"}},[t._v("BC")]):"SS"==t.od.order_extra_info.oex_finance_type?o("b-badge",{attrs:{variant:"light"}},[t._v("삼성")]):o("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.od.order_extra_info.oex_finance_type))]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v(t._s(t.payPlanDisplay)+" 결제")])],1):"E"==t.od.od_pay_method?o("span",[t._v("에스크로")]):t._e(),t._v(" "),o("b-badge",[t._v("구매환경")]),t._v(" "),"P"==t.od.od_sale_env?o("span",[t._v("웹")]):"M"==t.od.od_sale_env?o("span",[t._v("모바일")]):t._e(),t._v(" "),o("b-badge",[t._v("요청서류")]),t._v(" "),o("span",[t.od.order_extra_info?["Y"==t.od.order_extra_info.oex_req_est?o("b-badge",{attrs:{variant:"light"}},[t._v("견적서")]):t._e(),t._v(" "),"Y"==t.od.order_extra_info.oex_req_tran?o("b-badge",{attrs:{variant:"light"}},[t._v("거래명세서")]):t._e(),t._v(" "),"Y"==t.od.order_extra_info.oex_req_biz?o("b-badge",{attrs:{variant:"light"}},[t._v("사업자 등록증 사본")]):t._e(),t._v(" "),"Y"==t.od.order_extra_info.oex_req_bank?o("b-badge",{attrs:{variant:"light"}},[t._v("통장사본")]):t._e(),t._v(" "),"N"==t.od.order_extra_info.oex_req_est&&"N"==t.od.order_extra_info.oex_req_tran&&"N"==t.od.order_extra_info.oex_req_biz&&"N"==t.od.order_extra_info.oex_req_bank?o("b-badge",{attrs:{variant:"warning"}},[t._v("없음")]):t._e()]:[o("b-badge",{attrs:{variant:"warning"}},[t._v("없음")])]],2)],1)],1),t._v(" "),o("hr"),t._v(" "),"B"==t.od.od_pay_method||"E"==t.od.od_pay_method?o("b-row",[o("b-col",{attrs:{cols:"4"}},[o("b-badge",[t._v("지출증빙")]),t._v(" "),"IV"==t.od.order_extra_info.oex_type?o("span",[o("b-alert",{attrs:{show:"",variant:"success"}},[o("h5",{staticClass:"alert-heading"},[t._v("세금계산서")]),t._v(" "),t.od.file_info?[t.checkImage(t.od.file_info.ext)?[o("b-button",{on:{click:function(e){t.isModalViewed=!t.isModalViewed}}},[t._v("사업자 등록증 보기")]),t._v(" "),o("transition",{attrs:{name:"fade"}},[t.isModalViewed?o("Modal",{on:{"close-modal":function(e){t.isModalViewed=!1}}},[o("img",{staticStyle:{"max-width":"100%",height:"auto"},attrs:{src:t.od.file_info.path},on:{click:function(e){return t.fileDown(t.od.file_info.fi_original,t.od.file_info.path)}}})]):t._e()],1)]:[o("b-button",{on:{click:function(e){return t.fileDown(t.od.file_info.fi_original,t.od.file_info.path)}}},[t._v("사업자 등록증 다운로드")])]]:[o("b-badge",{attrs:{variant:"light"}},[t._v("법인명: "+t._s(t.od.order_extra_info.oex_biz_name))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("등록번호: "+t._s(t.od.order_extra_info.oex_biz_num))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("업태: "+t._s(t.od.order_extra_info.oex_biz_type))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("종목: "+t._s(t.od.order_extra_info.oex_biz_item))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("대표자: "+t._s(t.od.order_extra_info.oex_ceo))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("소재지: "+t._s(t.od.order_extra_info.oex_addr))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("요청사항: "+t._s(t.od.order_extra_info.oex_requirement))]),o("b",[t._v(",")])],t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("담당자: "+t._s(t.od.order_extra_info.oex_mng))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("담당이메일: "+t._s(t.od.order_extra_info.oex_email))]),o("b",[t._v(",")]),t._v(" "),o("b-badge",{attrs:{variant:"light"}},[t._v("담당HP: "+t._s(t.od.order_extra_info.oex_num))])],2)],1):"HP"==t.od.order_extra_info.oex_type||"CN"==t.od.order_extra_info.oex_type||"BN"==t.od.order_extra_info.oex_type?o("span"):"NO"==t.od.order_extra_info.oex_type?o("span",[o("b-badge",{attrs:{variant:"warning"}},[t._v("없음")])],1):t._e()],1)],1):t._e()],1)],1)],1)])])}),[],!1,null,null,null).exports}}]);