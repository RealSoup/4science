"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2558],{76590:(t,e,a)=>{a.d(e,{Z:()=>s});var r=a(23645),o=a.n(r)()((function(t){return t[1]}));o.push([t.id,".p_wrap[data-v-bbdc951e]{margin-bottom:2rem}.top .col[data-v-bbdc951e]{align-items:center;display:flex}.top .col.addModel[data-v-bbdc951e]{justify-content:flex-end}.top .col.addModel>div[data-v-bbdc951e]{max-width:10rem;width:100%}.row[data-v-bbdc951e]:not(:last-of-type){border-bottom:1px solid #333}.body[data-v-bbdc951e]:hover{background:#d8f2fd94}.extra>div[data-v-bbdc951e]{font-size:.9rem;padding-bottom:5px;padding-top:5px}.list>div[data-v-bbdc951e]:nth-of-type(3){flex:0 0 15%;max-width:15%}.list>div[data-v-bbdc951e]{font-size:.9rem;padding-bottom:15px;padding-top:15px}.head>div[data-v-bbdc951e]{background:#666;color:#fff;font-weight:700}.body>div[data-v-bbdc951e]:nth-of-type(2){background-color:#7fffd454}.row>div>span[data-v-bbdc951e]:nth-of-type(2){float:right}.row .custom-control[data-v-bbdc951e]{display:inline}.row .custom-control[data-v-bbdc951e] label{font-size:.9rem}.row .custom-control[data-v-bbdc951e] label:after,.row .custom-control[data-v-bbdc951e] label:before{height:1.5rem;left:-1.8rem;top:-.15rem;width:1.5rem}.top .custom-control[data-v-bbdc951e]{margin-right:1rem}.top .custom-control[data-v-bbdc951e] label:after,.top .custom-control[data-v-bbdc951e] label:before{top:0}.row .col span .odm_ea[data-v-bbdc951e]{display:inline-block;min-width:40px;text-align:center;width:30%}.row .col span.req_order_box[data-v-bbdc951e]{display:inline-block;height:1.9rem;min-width:140px;position:relative;width:70%}.row .col span.req_order_box .req_order[data-v-bbdc951e]{height:1.9rem;padding:.1rem .8rem}.row .col span.req_order_box .req_order[data-v-bbdc951e]:focus{background:#fff;height:5rem;left:0;position:absolute;top:0;width:20rem;z-index:1}",""]);const s=o},42558:(t,e,a)=>{a.r(e),a.d(e,{default:()=>p});var r=a(87757),o=a.n(r),s=a(44670);function n(t,e,a,r,o,s,n){try{var c=t[s](n),i=c.value}catch(t){return void a(t)}c.done?e(i):Promise.resolve(i).then(r,o)}function c(t){return function(){var e=this,a=arguments;return new Promise((function(r,o){var s=t.apply(e,a);function c(t){n(s,r,o,c,i,"next",t)}function i(t){n(s,r,o,c,i,"throw",t)}c(void 0)}))}}const i={name:"admShopB2bMerckOrder",components:{ModelSchInput:function(){return a.e(65).then(a.bind(a,30065))}},data:function(){return{list:{},indeterminate:!1,all_chk:!1,extra:{req_dlvy:"",addressID:"",state:"",company:"",part:"",name:"",hp:"",code:"",city:"",street:"",detail:""},sch_frm:{}}},methods:{index:function(){var t=this;return c(o().mark((function e(){var a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.Z.get("/api/admin/shop/b2b_merck/order",{params:t.sch_frm});case 3:(a=e.sent)&&200===a.status&&(t.list=a.data),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),Notify.consolePrint(e.t0),Notify.toast("warning",e.t0.response.data.message);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))()},chkChange:function(t){this.list.data[t].b2b_chk&&(this.extra.part=this.list.data[t].order.od_part,this.extra.name=this.list.data[t].order.od_receiver,this.extra.hp=this.list.data[t].order.od_receiver_hp,this.extra.code=this.list.data[t].order.od_zip,this.extra.city=this.list.data[t].order.od_addr1,this.extra.detail=this.list.data[t].order.od_addr2)},order:function(){var t=this;return c(o().mark((function e(){var a,r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,(a=t.list.data.filter((function(t){return 1==t.b2b_chk}))).length){e.next=5;break}return Notify.modal("선택하세요","warning"),e.abrupt("return",!1);case 5:if(""!=t.extra.addressID){e.next=9;break}return Notify.toast("danger","ShipTo Code를 선택하세요."),t.$refs.addressID.focus(),e.abrupt("return",!1);case 9:if("2035422570"===t.extra.addressID){e.next=42;break}if(""!=t.extra.state){e.next=14;break}return Notify.toast("danger","State Code를 선택하세요."),t.$refs.state.focus(),e.abrupt("return",!1);case 14:if(""!=t.extra.name){e.next=18;break}return Notify.toast("danger","이름을 입력하세요."),t.$refs.name.focus(),e.abrupt("return",!1);case 18:if(""!=t.extra.part){e.next=22;break}return Notify.toast("danger","소속을 입력하세요."),t.$refs.part.focus(),e.abrupt("return",!1);case 22:if(""!=t.extra.company){e.next=26;break}return Notify.toast("danger","업체명을 입력하세요."),t.$refs.company.focus(),e.abrupt("return",!1);case 26:if(""!=t.extra.code){e.next=30;break}return Notify.toast("danger","우편번호를 입력하세요."),t.$refs.code.focus(),e.abrupt("return",!1);case 30:if(""!=t.extra.city){e.next=34;break}return Notify.toast("danger","**시 **구를 입력하세요."),t.$refs.city.focus(),e.abrupt("return",!1);case 34:if(""!=t.extra.street){e.next=38;break}return Notify.toast("danger","도로명을 입력하세요."),t.$refs.street.focus(),e.abrupt("return",!1);case 38:if(""!=t.extra.detail){e.next=42;break}return Notify.toast("danger","상세 주소를 입력하세요."),t.$refs.detail.focus(),e.abrupt("return",!1);case 42:return e.next=44,s.Z.post("/api/admin/shop/b2b_merck/orderExe",{list:a,extra:t.extra});case 44:(r=e.sent)&&200===r.status&&"success"==r.data.msg&&t.$router.push({name:"adm_b2b_merck_order_result"}),e.next=52;break;case 48:e.prev=48,e.t0=e.catch(0),Notify.consolePrint(e.t0),Notify.toast("warning",e.t0.response.data.message);case 52:case"end":return e.stop()}}),e,null,[[0,48]])})))()},stockCheck:function(t,e){var a=this;return c(o().mark((function r(){var n;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,s.Z.post("/api/admin/shop/b2b_merck/stockCheck",{code:t,ea:e});case 3:(n=r.sent)&&200===n.status&&(a.list.data=n.data),r.next=11;break;case 7:r.prev=7,r.t0=r.catch(0),Notify.consolePrint(r.t0),Notify.toast("warning",r.t0.response.data.message);case 11:case"end":return r.stop()}}),r,null,[[0,7]])})))()},addModel:function(t){this.list.data.unshift({b2b_chk:!0,odm_id:0,odm_gm_id:t.gm_id,odm_gm_name:t.gm_name,odm_gm_code:t.gm_code,odm_gm_unit:t.gm_unit,odm_price:t.gm_price,odm_gm_spec:t.gm_spec,odm_ea:1,odm_mk_name:t.mk_name,req_order:null})},routerPush:function(){this.$router.push({name:"adm_b2b_merck_order",query:this.sch_frm}).catch((function(){}))},pageSet:function(t){this.sch_frm.page=t,this.routerPush()},frm_formatHp:function(t){return this.formatHp(t)}},mounted:function(){this.sch_frm=Object.assign({},this.sch_frm,this.$route.query),this.index()},beforeRouteUpdate:function(t,e,a){this.sch_frm=Object.assign({},this.sch_frm,t.query),this.index(),a()}};var d=a(93379),l=a.n(d),m=a(76590),b={insert:"head",singleton:!1};l()(m.Z,b);m.Z.locals;const p=(0,a(51900).Z)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",{staticClass:"p_wrap"},[a("h3",[t._v("Merck Order List")]),t._v(" "),a("b-row",{staticClass:"top"},[a("b-col",{attrs:{col:"",sm:"12",md:"6"}},[a("b-button",{attrs:{variant:"primary",size:"sm"},on:{click:t.order}},[t._v("선택 발주")])],1),t._v(" "),a("b-col",{staticClass:"addModel",attrs:{col:"",sm:"12",md:"6"}},[a("ModelSchInput",{on:{addModel:t.addModel}})],1)],1),t._v(" "),a("b-row",{staticClass:"extra"},[a("b-col",{attrs:{col:"",sm:"12",md:"2"}},[a("b-form-select",{ref:"addressID",attrs:{size:"sm"},model:{value:t.extra.addressID,callback:function(e){t.$set(t.extra,"addressID",e)},expression:"extra.addressID"}},[a("b-form-select-option",{attrs:{value:""}},[t._v("ShipTo Code")]),t._v(" "),a("b-form-select-option",{attrs:{value:"2035422570"}},[t._v("사무실(판교로 253)")]),t._v(" "),a("b-form-select-option",{attrs:{value:"2036349057"}},[t._v("서울")]),t._v(" "),a("b-form-select-option",{attrs:{value:"2036349058"}},[t._v("그 밖의 지역")])],1)],1),t._v(" "),a("b-col",{attrs:{col:"",sm:"12",md:"2"}},[a("b-form-select",{ref:"state",attrs:{size:"sm"},model:{value:t.extra.state,callback:function(e){t.$set(t.extra,"state",e)},expression:"extra.state"}},[a("b-form-select-option",{attrs:{value:""}},[t._v("State Code")]),t._v(" "),a("b-form-select-option",{attrs:{value:"SE"}},[t._v("서울")]),t._v(" "),a("b-form-select-option",{attrs:{value:"GG"}},[t._v("경기")]),t._v(" "),a("b-form-select-option",{attrs:{value:"IC"}},[t._v("인천")]),t._v(" "),a("b-form-select-option",{attrs:{value:"BS"}},[t._v("부산")]),t._v(" "),a("b-form-select-option",{attrs:{value:"CB"}},[t._v("충북")]),t._v(" "),a("b-form-select-option",{attrs:{value:"CN"}},[t._v("충남")]),t._v(" "),a("b-form-select-option",{attrs:{value:"DG"}},[t._v("대구")]),t._v(" "),a("b-form-select-option",{attrs:{value:"DJ"}},[t._v("대전")]),t._v(" "),a("b-form-select-option",{attrs:{value:"GW"}},[t._v("강원")]),t._v(" "),a("b-form-select-option",{attrs:{value:"GJ"}},[t._v("광주")]),t._v(" "),a("b-form-select-option",{attrs:{value:"GB"}},[t._v("경북")]),t._v(" "),a("b-form-select-option",{attrs:{value:"GN"}},[t._v("경남")]),t._v(" "),a("b-form-select-option",{attrs:{value:"JJ"}},[t._v("제주")]),t._v(" "),a("b-form-select-option",{attrs:{value:"JB"}},[t._v("전북")]),t._v(" "),a("b-form-select-option",{attrs:{value:"JN"}},[t._v("전남")]),t._v(" "),a("b-form-select-option",{attrs:{value:"SJ"}},[t._v("세종")]),t._v(" "),a("b-form-select-option",{attrs:{value:"US"}},[t._v("울산")])],1)],1),t._v(" "),a("b-col",{attrs:{col:"",sm:"12",md:"2"}},[a("b-form-input",{attrs:{size:"sm",placeholder:"이름"},model:{value:t.extra.name,callback:function(e){t.$set(t.extra,"name",e)},expression:"extra.name"}})],1),t._v(" "),a("b-col",{attrs:{col:"",sm:"12",md:"3"}},[a("b-form-input",{attrs:{size:"sm",placeholder:"HP",formatter:t.frm_formatHp},model:{value:t.extra.hp,callback:function(e){t.$set(t.extra,"hp",e)},expression:"extra.hp"}})],1),t._v(" "),a("b-col",{attrs:{col:"",sm:"12",md:"3"}},[a("b-form-input",{attrs:{size:"sm",placeholder:"소속"},model:{value:t.extra.part,callback:function(e){t.$set(t.extra,"part",e)},expression:"extra.part"}})],1),t._v(" "),a("b-col",{attrs:{col:"",sm:"12",md:"2"}},[a("b-form-input",{attrs:{size:"sm",placeholder:"업체명"},model:{value:t.extra.company,callback:function(e){t.$set(t.extra,"company",e)},expression:"extra.company"}})],1),t._v(" "),a("b-col",{attrs:{col:"",sm:"12",md:"2"}},[a("b-form-input",{attrs:{size:"sm",placeholder:"우편번호"},model:{value:t.extra.code,callback:function(e){t.$set(t.extra,"code",e)},expression:"extra.code"}})],1),t._v(" "),a("b-col",{attrs:{col:"",sm:"12",md:"2"}},[a("b-form-input",{attrs:{size:"sm",placeholder:"**시 **구"},model:{value:t.extra.city,callback:function(e){t.$set(t.extra,"city",e)},expression:"extra.city"}})],1),t._v(" "),a("b-col",{attrs:{col:"",sm:"12",md:"3"}},[a("b-form-input",{attrs:{size:"sm",placeholder:"도로명"},model:{value:t.extra.street,callback:function(e){t.$set(t.extra,"street",e)},expression:"extra.street"}})],1),t._v(" "),a("b-col",{attrs:{col:"",sm:"12",md:"3"}},[a("b-form-input",{attrs:{size:"sm",placeholder:"상세 동호수"},model:{value:t.extra.detail,callback:function(e){t.$set(t.extra,"detail",e)},expression:"extra.detail"}})],1),t._v(" "),a("b-col",{attrs:{col:"",sm:"12"}},[a("b-form-textarea",{attrs:{placeholder:"배송시 요청사항 입력"},model:{value:t.extra.req_dlvy,callback:function(e){t.$set(t.extra,"req_dlvy",e)},expression:"extra.req_dlvy"}})],1)],1),t._v(" "),a("b-row",{staticClass:"list head"},[a("b-col",[a("span",[t._v("주문번호")]),a("span",[t._v("제품명")])]),t._v(" "),a("b-col",[a("span",[t._v("모델명")]),a("span",[t._v("판매단위")])]),t._v(" "),a("b-col",[a("span",[t._v("수량")]),a("span",[t._v("가격")])]),t._v(" "),a("b-col",[a("span",[t._v("요청사항")]),a("span",[t._v("Ctrl")])])],1),t._v(" "),t._l(t.list.data,(function(e,r){return a("b-row",{key:e.odm_id,staticClass:"list body"},[a("b-col",[a("span",[a("b-form-checkbox",{attrs:{name:"b2b_chk"},on:{change:function(e){return t.chkChange(r)}},model:{value:e.b2b_chk,callback:function(a){t.$set(e,"b2b_chk",a)},expression:"row.b2b_chk"}},[t._v("\r\n                    "+t._s(e.odm_od_id)+"\r\n                ")])],1),t._v(" "),a("span",[t._v(t._s(e.odm_gm_name))])]),t._v(" "),a("b-col",[a("span",[t._v(t._s(e.odm_gm_code))]),t._v(" "),a("span",[t._v(t._s(e.odm_gm_unit))])]),t._v(" "),a("b-col",[a("span",[a("b-form-input",{staticClass:"odm_ea",attrs:{size:"sm"},model:{value:e.odm_ea,callback:function(a){t.$set(e,"odm_ea",a)},expression:"row.odm_ea"}})],1),t._v(" "),a("span",[t._v(t._s(t._f("comma")(e.odm_price))+" 원")])]),t._v(" "),a("b-col",[a("span",{staticClass:"req_order_box"},[a("b-form-textarea",{staticClass:"req_order",attrs:{placeholder:"주문시 요청사항 입력"},model:{value:e.req_order,callback:function(a){t.$set(e,"req_order",a)},expression:"row.req_order"}})],1),t._v(" "),a("span",[a("b-button",{attrs:{size:"sm"},on:{click:function(a){return t.stockCheck(e.odm_gm_code,e.odm_ea)}}},[t._v("재고 체크")])],1)])],1)})),t._v(" "),a("pagination",{staticClass:"mt-5",attrs:{data:t.list,limit:5,showDisabled:!0,align:"center"},on:{"pagination-change-page":t.pageSet}},[a("span",{attrs:{slot:"prev-nav"},slot:"prev-nav"},[a("b-icon-chevron-left")],1),t._v(" "),a("span",{attrs:{slot:"next-nav"},slot:"next-nav"},[a("b-icon-chevron-right")],1)])],2)}),[],!1,null,"bbdc951e",null).exports}}]);