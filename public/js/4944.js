"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4944],{44944:(t,e,o)=>{o.r(e),o.d(e,{default:()=>i});var s=o(87757),r=o.n(s),a=o(44670);function n(t,e,o,s,r,a,n){try{var c=t[a](n),l=c.value}catch(t){return void o(t)}c.done?e(l):Promise.resolve(l).then(s,r)}function c(t){return function(){var e=this,o=arguments;return new Promise((function(s,r){var a=t.apply(e,o);function c(t){n(a,s,r,c,l,"next",t)}function l(t){n(a,s,r,c,l,"throw",t)}c(void 0)}))}}const l={components:{SchDate:function(){return o.e(8564).then(o.bind(o,28564))},List:function(){return o.e(8131).then(o.bind(o,18131))}},data:function(){return{list:{},sch_frm:{startDate:"",endDate:"",startPrice:"",endPrice:"",od_mng:"",od_step:"",od_type:"",od_pay_method:"",um_group:"",gd_enable:"",mode:"od_orderer",keyword:"",page:0},mng:{},mng_info:{},order_config:{},gd_enable:{0:{value:"Y",name:"활성"},1:{value:"N",name:"비활성"}}}},methods:{numCalc:function(t){return this.list.total-(this.list.current_page-1)*this.list.per_page-t},index:function(){var t=arguments,e=this;return c(r().mark((function o(){var s,n;return r().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(s=t.length>0&&void 0!==t[0]?t[0]:0,o.prev=1,e.sch_frm.page=s,!(e.sch_frm.startDate&&e.sch_frm.endDate&&e.sch_frm.startDate>e.sch_frm.endDate)){o.next=6;break}return Notify.modal("검색 시작일이 종료일보다 높을 수는 없습니다.","warning"),o.abrupt("return",!1);case 6:return o.next=8,a.Z.get("/api/admin/shop/order",{params:e.sch_frm});case 8:(n=o.sent)&&200===n.status&&(e.list=n.data.list,e.mng=n.data.mng,e.mng_info=n.data.mng_info,e.order_config=n.data.order_config),o.next=16;break;case 12:o.prev=12,o.t0=o.catch(1),Notify.consolePrint(o.t0),Notify.toast("warning",o.t0.response.data.message);case 16:case"end":return o.stop()}}),o,null,[[1,12]])})))()}},mounted:function(){this.index()}};const i=(0,o(51900).Z)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"p_wrap"},[o("h3",{staticClass:"p_tit"},[t._v("주문 목록")]),t._v(" "),o("b-container",{staticClass:"frm_sch"},[o("SchDate",{model:{value:t.sch_frm,callback:function(e){t.sch_frm=e},expression:"sch_frm"}},[o("b-col",{staticClass:"label top_left",attrs:{slot:"prev"},slot:"prev"},[t._v("주문일")])],1),t._v(" "),o("b-row",[o("b-col",{staticClass:"label"},[t._v("주문유형")]),t._v(" "),o("b-col",{staticClass:"type01"},[o("b-form-select",{model:{value:t.sch_frm.od_type,callback:function(e){t.$set(t.sch_frm,"od_type",e)},expression:"sch_frm.od_type"}},[o("b-form-select-option",{attrs:{value:""}}),t._v(" "),t._l(t.order_config.type,(function(e,s){return o("b-form-select-option",{key:s,attrs:{value:s}},[t._v(t._s(e))])}))],2)],1),t._v(" "),o("b-col",{staticClass:"label"},[t._v("결제수단")]),t._v(" "),o("b-col",{staticClass:"type01"},[o("b-form-select",{model:{value:t.sch_frm.od_pay_method,callback:function(e){t.$set(t.sch_frm,"od_pay_method",e)},expression:"sch_frm.od_pay_method"}},[o("b-form-select-option",{attrs:{value:""}}),t._v(" "),t._l(t.order_config.pay_method,(function(e,s){return o("b-form-select-option",{key:s,attrs:{value:s}},[t._v(t._s(e))])}))],2)],1),t._v(" "),o("b-col",{staticClass:"label"},[t._v("처리상태")]),t._v(" "),o("b-col",{staticClass:"type01"},[o("b-form-select",{model:{value:t.sch_frm.od_step,callback:function(e){t.$set(t.sch_frm,"od_step",e)},expression:"sch_frm.od_step"}},[o("b-form-select-option",{attrs:{value:""}}),t._v(" "),t._l(t.order_config.step,(function(e,s){return o("b-form-select-option",{key:s,attrs:{value:s}},[t._v(t._s(e.name))])}))],2)],1),t._v(" "),o("b-col",{staticClass:"label"},[t._v("주문액")]),t._v(" "),o("b-col",{staticClass:"type03 period"},[o("b-form-input",{attrs:{formatter:t.priceComma},model:{value:t.sch_frm.startPrice,callback:function(e){t.$set(t.sch_frm,"startPrice",e)},expression:"sch_frm.startPrice"}}),t._v(" "),o("b",[t._v("~")]),t._v(" "),o("b-form-input",{attrs:{formatter:t.priceComma},model:{value:t.sch_frm.endPrice,callback:function(e){t.$set(t.sch_frm,"endPrice",e)},expression:"sch_frm.endPrice"}})],1)],1),t._v(" "),o("b-row",[o("b-col",{staticClass:"label bottom_left"},[t._v("담당자")]),t._v(" "),o("b-col",{staticClass:"type01"},[o("b-form-select",{model:{value:t.sch_frm.od_mng,callback:function(e){t.$set(t.sch_frm,"od_mng",e)},expression:"sch_frm.od_mng"}},[o("b-form-select-option",{attrs:{value:""}}),t._v(" "),t._l(t.mng,(function(e){return o("b-form-select-option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.name))])}))],2)],1),t._v(" "),o("b-col",{staticClass:"label"},[t._v("담당팀")]),t._v(" "),o("b-col",{staticClass:"type01"},[o("b-form-select",{model:{value:t.sch_frm.um_group,callback:function(e){t.$set(t.sch_frm,"um_group",e)},expression:"sch_frm.um_group"}},[o("b-form-select-option",{attrs:{value:""}}),t._v(" "),t._l(t.mng_info.group,(function(e,s){return o("b-form-select-option",{key:s,attrs:{value:s}},[t._v(t._s(e))])}))],2)],1),t._v(" "),o("b-col",{staticClass:"label"},[t._v("검색")]),t._v(" "),o("b-col",[o("b-input-group",[o("b-input-group-prepend",[o("b-form-select",{staticClass:"custom-select",model:{value:t.sch_frm.mode,callback:function(e){t.$set(t.sch_frm,"mode",e)},expression:"sch_frm.mode"}},[o("b-form-select-option",{attrs:{value:"od_orderer"}},[t._v("주문자")]),t._v(" "),o("b-form-select-option",{attrs:{value:"orderer_email"}},[t._v("주문자이메일")]),t._v(" "),o("b-form-select-option",{attrs:{value:"orderer_hp"}},[t._v("주문자휴대폰")]),t._v(" "),o("b-form-select-option",{attrs:{value:"od_no"}},[t._v("주문번호")]),t._v(" "),o("b-form-select-option",{attrs:{value:"od_id"}},[t._v("글번호")]),t._v(" "),o("b-form-select-option",{attrs:{value:"od_receiver"}},[t._v("수취인명")]),t._v(" "),o("b-form-select-option",{attrs:{value:"od_addr1"}},[t._v("배송주소")]),t._v(" "),o("b-form-select-option",{attrs:{value:"oex_depositor"}},[t._v("입금자")]),t._v(" "),o("b-form-select-option",{attrs:{value:"gm_name"}},[t._v("제품명")]),t._v(" "),o("b-form-select-option",{attrs:{value:"gm_code"}},[t._v("모델명")]),t._v(" "),o("b-form-select-option",{attrs:{value:"catno"}},[t._v("Cat.No")])],1)],1),t._v(" "),o("b-form-input",{attrs:{placeholder:"검색어를 입력하세요"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.index.apply(null,arguments)}},model:{value:t.sch_frm.keyword,callback:function(e){t.$set(t.sch_frm,"keyword",e)},expression:"sch_frm.keyword"}}),t._v(" "),o("b-input-group-append",[o("b-button",{on:{click:t.index}},[o("b-icon-search")],1)],1)],1)],1)],1)],1),t._v(" "),o("b-container",{staticClass:"cmain"},[o("b-row",[o("b-col",{attrs:{sm:"12",md:"6"}},[t._v("Total : "),o("b-badge",{attrs:{variant:"info"}},[t._v(t._s(this.list.total))])],1)],1),t._v(" "),t.list.data&&t.list.data.length?o("List",{attrs:{list:t.list.data,config:t.order_config,mng:t.mng}}):t._e(),t._v(" "),o("pagination",{staticClass:"mt-5",attrs:{data:t.list,limit:5,showDisabled:!0,align:"center"},on:{"pagination-change-page":t.index}},[o("span",{attrs:{slot:"prev-nav"},slot:"prev-nav"},[o("b-icon-chevron-left")],1),t._v(" "),o("span",{attrs:{slot:"next-nav"},slot:"next-nav"},[o("b-icon-chevron-right")],1)])],1)],1)}),[],!1,null,"1ff1ca1b",null).exports}}]);