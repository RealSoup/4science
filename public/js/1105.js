"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1105],{5461:(t,e,a)=>{a.d(e,{Z:()=>n});var r=a(3645),o=a.n(r)()((function(t){return t[1]}));o.push([t.id,"#adm_order .width_btn[data-v-2048152c]{display:flex}#adm_order .width_btn .btn[data-v-2048152c]{flex:1}#adm_order .od_list .row.list_item>div[data-v-2048152c]{padding:10px 4px}#adm_order .od_list .row.list_item:nth-child(2n)>div[data-v-2048152c]:nth-child(odd),#adm_order .od_list .row.list_item:nth-child(odd)>div[data-v-2048152c]:nth-child(2n){background-color:#eaf2ff}#adm_order .od_list .row.list_item div .badge[data-v-2048152c]{font-size:1rem}#adm_order .od_list .row.list_item>div:first-of-type .badge[data-v-2048152c]{font-size:75%}#adm_order .od_list .row.list_item>div:first-of-type .badge[data-v-2048152c]:hover{font-size:125%;position:absolute;z-index:1}",""]);const n=o},1105:(t,e,a)=>{a.r(e),a.d(e,{default:()=>v});var r=a(7757),o=a.n(r),n=a(4670);function s(t,e,a,r,o,n,s){try{var i=t[n](s),_=i.value}catch(t){return void a(t)}i.done?e(_):Promise.resolve(_).then(r,o)}const i={components:{},data:function(){return{list:{},sch_frm:{startDate:"",endDate:"",startPrice:"",endPrice:"",od_mng:"",od_step:"",od_type:"",od_pay_method:"",um_group:"",gd_enable:"",mode:"od_orderer",keyword:"",page:0},mng:{},mng_info:{},order_config:{},gd_enable:{0:{value:"Y",name:"활성"},1:{value:"N",name:"비활성"}}}},methods:{numCalc:function(t){return this.list.total-(this.list.current_page-1)*this.list.per_page-t},index:function(){var t,e=this;return(t=o().mark((function t(){var a;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!(e.sch_frm.startDate&&e.sch_frm.endDate&&e.sch_frm.startDate>e.sch_frm.endDate)){t.next=4;break}return Notify.modal("검색 시작일이 종료일보다 높을 수는 없습니다."),t.abrupt("return",!1);case 4:return t.next=6,n.Z.get("/api/admin/shop/order/",{params:e.sch_frm});case 6:(a=t.sent)&&200===a.status&&(e.list=a.data.list,e.mng=a.data.mng,e.mng_info=a.data.mng_info,e.order_config=a.data.order_config),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(0),Notify.consolePrint(t.t0),Notify.toast("warning",t.t0.response.data.message);case 14:case"end":return t.stop()}}),t,null,[[0,10]])})),function(){var e=this,a=arguments;return new Promise((function(r,o){var n=t.apply(e,a);function i(t){s(n,r,o,i,_,"next",t)}function _(t){s(n,r,o,i,_,"throw",t)}i(void 0)}))})()},setPage:function(t){this.sch_frm.page=t,this.index()},setDate:function(t){var e=new Date,a="",r=e.format("yyyy-MM-dd");switch(t){case"today":break;case"3day":e.setDate(e.getDate()-3);break;case"week":e.setDate(e.getDate()-7);break;case"month":e.setMonth(e.getMonth()-1);break;case"3month":e.setMonth(e.getMonth()-3);break;case"all":r=""}"all"!=t&&(a=e.format("yyyy-MM-dd")),this.sch_frm.startDate=a,this.sch_frm.endDate=r}},mounted:function(){this.index()}};var _=a(3379),d=a.n(_),c=a(5461),l={insert:"head",singleton:!1};d()(c.Z,l);c.Z.locals;const v=(0,a(1900).Z)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"adm_order"}},[a("b-card",{staticClass:"shadow"},[a("b-container",{attrs:{fluid:""}},[a("b-row",{staticClass:"mb-3"},[a("b-col",{attrs:{lg:"3",md:"4",sm:"6"}},[a("b-input-group",[a("b-form-input",{attrs:{placeholder:"YYYY-MM-DD",autocomplete:"off",formatter:t.formatDate},model:{value:t.sch_frm.startDate,callback:function(e){t.$set(t.sch_frm,"startDate",e)},expression:"sch_frm.startDate"}}),t._v(" "),a("b-input-group-append",[a("b-form-datepicker",{attrs:{"button-only":"",right:""},model:{value:t.sch_frm.startDate,callback:function(e){t.$set(t.sch_frm,"startDate",e)},expression:"sch_frm.startDate"}})],1)],1)],1),t._v(" "),a("b-col",{attrs:{lg:"3",md:"4",sm:"6"}},[a("b-input-group",[a("b-form-input",{attrs:{placeholder:"YYYY-MM-DD",autocomplete:"off",formatter:t.formatDate},model:{value:t.sch_frm.endDate,callback:function(e){t.$set(t.sch_frm,"endDate",e)},expression:"sch_frm.endDate"}}),t._v(" "),a("b-input-group-append",[a("b-form-datepicker",{attrs:{"button-only":"",right:""},model:{value:t.sch_frm.endDate,callback:function(e){t.$set(t.sch_frm,"endDate",e)},expression:"sch_frm.endDate"}})],1)],1)],1),t._v(" "),a("b-col",{attrs:{lg:"6",md:"4",sm:"12"}},[a("b-button-group",{staticClass:"width_btn"},[a("b-button",{attrs:{variant:"primary"},on:{click:function(e){return t.setDate("today")}}},[t._v("오늘")]),t._v(" "),a("b-button",{attrs:{variant:"info"},on:{click:function(e){return t.setDate("3day")}}},[t._v("3일")]),t._v(" "),a("b-button",{attrs:{variant:"success"},on:{click:function(e){return t.setDate("week")}}},[t._v("1주")]),t._v(" "),a("b-button",{attrs:{variant:"danger"},on:{click:function(e){return t.setDate("month")}}},[t._v("1달")]),t._v(" "),a("b-button",{attrs:{variant:"warning"},on:{click:function(e){return t.setDate("3month")}}},[t._v("3달")]),t._v(" "),a("b-button",{attrs:{variant:"dark"},on:{click:function(e){return t.setDate("all")}}},[t._v("전체")])],1)],1)],1),t._v(" "),a("b-row",{staticClass:"mb-3"},[a("b-col",{attrs:{lg:"2",md:"4",sm:"6"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.sch_frm.od_type,expression:"sch_frm.od_type"}],staticClass:"custom-select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.sch_frm,"od_type",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v("◄ 주문유형 ►")]),t._v(" "),t._l(t.order_config.type,(function(e,r){return a("option",{domProps:{value:r}},[t._v(t._s(e))])}))],2)]),t._v(" "),a("b-col",{attrs:{lg:"2",md:"4",sm:"6"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.sch_frm.od_pay_method,expression:"sch_frm.od_pay_method"}],staticClass:"custom-select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.sch_frm,"od_pay_method",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v("◄ 결제수단 ►")]),t._v(" "),t._l(t.order_config.pay_method,(function(e,r){return a("option",{domProps:{value:r}},[t._v(t._s(e))])}))],2)]),t._v(" "),a("b-col",{attrs:{lg:"2",md:"4",sm:"6"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.sch_frm.od_step,expression:"sch_frm.od_step"}],staticClass:"custom-select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.sch_frm,"od_step",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v("◄ 처리상태 ►")]),t._v(" "),t._l(t.order_config.step,(function(e,r){return a("option",{domProps:{value:r}},[t._v(t._s(e))])}))],2)]),t._v(" "),a("b-col",{attrs:{lg:"2",md:"4",sm:"6"}},[a("b-input-group",{attrs:{prepend:"주문액"}},[a("b-form-input",{attrs:{formatter:t.priceComma},model:{value:t.sch_frm.startPrice,callback:function(e){t.$set(t.sch_frm,"startPrice",e)},expression:"sch_frm.startPrice"}}),t._v(" "),a("b-form-input",{attrs:{formatter:t.priceComma},model:{value:t.sch_frm.endPrice,callback:function(e){t.$set(t.sch_frm,"endPrice",e)},expression:"sch_frm.endPrice"}})],1)],1),t._v(" "),a("b-col",{attrs:{lg:"2",md:"4",sm:"6"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.sch_frm.od_mng,expression:"sch_frm.od_mng"}],staticClass:"custom-select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.sch_frm,"od_mng",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v("◄ 담당자 ►")]),t._v(" "),t._l(t.mng,(function(e){return a("option",{domProps:{value:e.id}},[t._v(t._s(e.name))])}))],2)]),t._v(" "),a("b-col",{attrs:{lg:"2",md:"4",sm:"6"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.sch_frm.um_group,expression:"sch_frm.um_group"}],staticClass:"custom-select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.sch_frm,"um_group",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v("◄ 담당팀 ►")]),t._v(" "),t._l(t.mng_info.group,(function(e,r){return a("option",{domProps:{value:r}},[t._v(t._s(e))])}))],2)])],1),t._v(" "),a("b-row",{staticClass:"justify-content-end mt-3"},[a("b-col",{attrs:{md:"12",lg:"8"}},[a("b-input-group",[a("b-input-group-prepend",[a("select",{directives:[{name:"model",rawName:"v-model",value:t.sch_frm.mode,expression:"sch_frm.mode"}],staticClass:"custom-select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.sch_frm,"mode",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"od_orderer"}},[t._v("주문자")]),t._v(" "),a("option",{attrs:{value:"orderer_email"}},[t._v("주문자이메일")]),t._v(" "),a("option",{attrs:{value:"orderer_hp"}},[t._v("주문자휴대폰")]),t._v(" "),a("option",{attrs:{value:"od_no"}},[t._v("주문번호")]),t._v(" "),a("option",{attrs:{value:"od_id"}},[t._v("글번호")]),t._v(" "),a("option",{attrs:{value:"od_receiver"}},[t._v("수취인명")]),t._v(" "),a("option",{attrs:{value:"od_addr1"}},[t._v("배송주소")]),t._v(" "),a("option",{attrs:{value:"oex_depositor"}},[t._v("입금자")]),t._v(" "),a("option",{attrs:{value:"gm_name"}},[t._v("제품명")]),t._v(" "),a("option",{attrs:{value:"gm_code"}},[t._v("모델명")]),t._v(" "),a("option",{attrs:{value:"catno"}},[t._v("Cat.No")])])]),t._v(" "),a("b-form-input",{attrs:{placeholder:"Please enter a keyword"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.index.apply(null,arguments)}},model:{value:t.sch_frm.keyword,callback:function(e){t.$set(t.sch_frm,"keyword",e)},expression:"sch_frm.keyword"}}),t._v(" "),a("b-input-group-append",[a("b-button",{attrs:{variant:"outline-primary"},on:{click:t.index}},[t._v("Search")])],1)],1)],1)],1)],1)],1),t._v(" "),a("b-card",{staticClass:"shadow od_list"},[a("b-container",{attrs:{fluid:""}},[a("b-row",[a("b-col",{attrs:{sm:"12",md:"6"}},[t._v("total : "+t._s(this.list.total))]),t._v(" "),a("b-col",{staticClass:"text-right",attrs:{sm:"12",md:"6"}})],1),t._v(" "),a("hr"),t._v(" "),t._l(t.list.data,(function(e,r){return t.list.data&&t.list.data.length?a("b-row",{key:e.mk_id,staticClass:"list_item"},[a("b-col",{staticClass:"d-none d-lg-block",attrs:{lg:"1"}},[a("b-badge",{attrs:{variant:"dark"}},[t._v(t._s(e.od_id))]),t._v(" "),a("b-badge",{attrs:{variant:"secondary"}},[t._v(t._s(e.od_no))])],1),t._v(" "),a("b-col",{attrs:{lg:"6",md:"4"}},[a("router-link",{staticClass:"btn btn-light d-block text-left",attrs:{to:{name:"adm_order_edit",params:{od_id:e.od_id}}}},[t._v("\n                            "+t._s(e.od_name)+"\n                        ")])],1),t._v(" "),a("b-col",{attrs:{lg:"2",md:"3"}},[a("b-badge",{attrs:{variant:"light"}},[t._v(t._s(e.od_orderer))]),t._v(" "),"inst"==e.od_type?a("b-badge",{attrs:{variant:"primary"}},[t._v("바로")]):"cart"==e.od_type?a("b-badge",{attrs:{variant:"info"}},[t._v("카트")]):"quote"==e.od_type?a("b-badge",{attrs:{variant:"success"}},[t._v("견적")]):t._e(),t._v(" "),a("b-badge",{staticClass:"float-right",attrs:{variant:"warning"}},["C"==e.od_pay_method?[t._v("카드")]:t._e(),t._v(" "),"B"==e.od_pay_method?[t._v("계좌이체")]:t._e(),t._v(" "),"P"==e.od_pay_method?[t._v("PSYS")]:t._e(),t._v(" "),"S"==e.od_pay_method?[t._v("전표")]:t._e(),t._v(" "),"E"==e.od_pay_method?[t._v("에스크로")]:t._e()],2)],1),t._v(" "),a("b-col",{attrs:{lg:"2",md:"3"}},[a("b-badge",{attrs:{variant:"info"}},[t._v(t._s(t._f("comma")(e.od_all_price))+" 원")]),t._v(" "),a("b-badge",{staticClass:"float-right",attrs:{variant:"success"}},[t._v(t._s(t._f("formatDate")(e.created_at)))])],1),t._v(" "),a("b-col",{attrs:{lg:"1",md:"2"}},[10==e.od_step?a("b-badge",{attrs:{variant:"primary"}},[t._v("접수")]):11==e.od_step?a("b-badge",{attrs:{variant:"warning"}},[t._v("승인대기")]):12==e.od_step?a("b-badge",{attrs:{variant:"warning"}},[t._v("결제대기")]):20==e.od_step?a("b-badge",{attrs:{variant:"success"}},[t._v("결제완료")]):30==e.od_step?a("b-badge",{attrs:{variant:"info"}},[t._v("배송준비")]):31==e.od_step?a("b-badge",{attrs:{variant:"info"}},[t._v("배송중")]):32==e.od_step?a("b-badge",{attrs:{variant:"info"}},[t._v("배송완료")]):40==e.od_step?a("b-badge",{attrs:{variant:"secondary"}},[t._v("구매확정")]):50==e.od_step?a("b-badge",{attrs:{variant:"danger"}},[t._v("주문취소")]):50==e.od_step?a("b-badge",{attrs:{variant:"danger"}},[t._v("결제실패")]):t._e(),t._v(" "),a("b-badge",{staticClass:"float-right",attrs:{variant:"warning"}},[t._v(t._s(e.od_mng_nm))])],1)],1):a("b-alert",{attrs:{variant:"danger",show:""}},[t._v("No Item")])}))],2),t._v(" "),a("pagination",{staticClass:"mt-5",attrs:{data:t.list,align:"center"},on:{"pagination-change-page":t.setPage}})],1)],1)}),[],!1,null,"2048152c",null).exports}}]);