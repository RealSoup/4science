"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8073],{43554:(t,e,a)=>{a.d(e,{Z:()=>s});var r=a(23645),n=a.n(r)()((function(t){return t[1]}));n.push([t.id,".list .row .col[data-v-925159a6]{padding:.3rem 0;text-align:center}.list .header .col[data-v-925159a6]{background:#444;color:#fff;font-size:1.1rem;padding:.6rem 0}.list .data .col[data-v-925159a6]{font-size:.9rem}.list .row .col[data-v-925159a6]:first-child{flex:0 0 5%;max-width:5%}.list .row .col[data-v-925159a6]:nth-child(2){flex:0 0 7%;max-width:7%}.list .row .col[data-v-925159a6]:nth-child(4),.list .row .col[data-v-925159a6]:nth-child(5),.list .row .col[data-v-925159a6]:nth-child(6){flex:0 0 9%;max-width:9%}.list .row .col[data-v-925159a6]:nth-child(7){flex:0 0 15%;max-width:15%}.list .row .col[data-v-925159a6]:nth-child(8){flex:0 0 6%;max-width:6%}.list .row .col[data-v-925159a6]:nth-child(9){flex:0 0 5%;max-width:5%}.list .row[data-v-925159a6]:nth-child(2n){background:#f5f5f5}",""]);const s=n},68073:(t,e,a)=>{a.r(e),a.d(e,{default:()=>d});var r=a(87757),n=a.n(r),s=a(44670);function i(t,e,a,r,n,s,i){try{var o=t[s](i),l=o.value}catch(t){return void a(t)}o.done?e(l):Promise.resolve(l).then(r,n)}const o={components:{SchDate:function(){return a.e(5689).then(a.bind(a,75689))}},data:function(){return{list:{},sch_frm:{startDate:"",endDate:"",er_step:"",mode:"er_name",keyword:"",page:0}}},methods:{numCalc:function(t){return this.list.total-(this.list.current_page-1)*this.list.per_page-t},index:function(){var t,e=this;return(t=n().mark((function t(){var a;return n().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!(e.sch_frm.startDate&&e.sch_frm.endDate&&e.sch_frm.startDate>e.sch_frm.endDate)){t.next=4;break}return Notify.modal("검색 시작일이 종료일보다 높을 수는 없습니다.","warning"),t.abrupt("return",!1);case 4:return t.next=6,s.Z.get("/api/admin/engReform",{params:e.sch_frm});case 6:(a=t.sent)&&200===a.status&&(e.list=a.data),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(0),Notify.consolePrint(t.t0),Notify.toast("warning",t.t0.response.data.message);case 14:case"end":return t.stop()}}),t,null,[[0,10]])})),function(){var e=this,a=arguments;return new Promise((function(r,n){var s=t.apply(e,a);function o(t){i(s,r,n,o,l,"next",t)}function l(t){i(s,r,n,o,l,"throw",t)}o(void 0)}))})()},setPage:function(t){this.sch_frm.page=t,this.index()}},mounted:function(){this.index()}};var l=a(93379),c=a.n(l),_=a(43554),v={insert:"head",singleton:!1};c()(_.Z,v);_.Z.locals;const d=(0,a(51900).Z)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"adm_eng_reform"},[a("b-card",{staticClass:"shadow"},[a("b-container",[a("SchDate",{model:{value:t.sch_frm,callback:function(e){t.sch_frm=e},expression:"sch_frm"}}),t._v(" "),a("b-row",{staticClass:"justify-content-end mt-3"},[a("b-col",{attrs:{md:"12",lg:"8"}},[a("b-input-group",[a("b-input-group-prepend",[a("select",{directives:[{name:"model",rawName:"v-model",value:t.sch_frm.er_step,expression:"sch_frm.er_step"}],staticClass:"custom-select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.sch_frm,"er_step",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v("진행상태")]),t._v(" "),a("option",{attrs:{value:"ING"}},[t._v("처리중")]),t._v(" "),a("option",{attrs:{value:"CPLT"}},[t._v("완료")]),t._v(" "),a("option",{attrs:{value:"NOT"}},[t._v("미처리")]),t._v(" "),a("option",{attrs:{value:"CXL"}},[t._v("취소")])]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.sch_frm.mode,expression:"sch_frm.mode"}],staticClass:"custom-select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.sch_frm,"mode",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"er_name"}},[t._v("요청자명")]),t._v(" "),a("option",{attrs:{value:"er_demand"}},[t._v("요청사항")]),t._v(" "),a("option",{attrs:{value:"er_email"}},[t._v("Email")]),t._v(" "),a("option",{attrs:{value:"er_tel"}},[t._v("전화")]),t._v(" "),a("option",{attrs:{value:"er_hp"}},[t._v("핸드폰")])])]),t._v(" "),a("b-form-input",{attrs:{placeholder:"Please enter a keyword"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.index.apply(null,arguments)}},model:{value:t.sch_frm.keyword,callback:function(e){t.$set(t.sch_frm,"keyword",e)},expression:"sch_frm.keyword"}}),t._v(" "),a("b-input-group-append",[a("b-button",{attrs:{variant:"outline-primary"},on:{click:t.index}},[t._v("Search")])],1)],1)],1)],1)],1)],1),t._v(" "),a("b-card",{staticClass:"shadow"},[a("b-container",{staticClass:"list"},[a("b-row",{staticClass:"header"},[a("b-col",[t._v("번호")]),t._v(" "),a("b-col",[t._v("요청자")]),t._v(" "),a("b-col"),t._v(" "),a("b-col",[t._v("서비스")]),t._v(" "),a("b-col",[t._v("소속")]),t._v(" "),a("b-col",[t._v("연락처")]),t._v(" "),a("b-col",[t._v("이메일")]),t._v(" "),a("b-col",[t._v("납기일")]),t._v(" "),a("b-col",[t._v("진행현황")])],1),t._v(" "),t._l(t.list.data,(function(e,r){return a("b-row",{key:e.er_id,staticClass:"data"},[a("b-col",[t._v(t._s(e.er_id))]),t._v(" "),a("b-col",[a("b-button",{attrs:{to:{name:"adm_user_edit",params:{id:e.user.id}},variant:"light",size:"sm"}},[t._v("\n                         "+t._s(e.er_name)+" "),a("b-icon-link45deg")],1)],1),t._v(" "),a("b-col",[a("b-button",{staticClass:"text-left",attrs:{to:{name:"adm_eng_reform_edit",params:{er_id:e.er_id}},variant:"light",block:""}},[t._v("\n                        영문교정 ("),a("small",[t._v("신청일 : "+t._s(t._f("formatDate_YYYY_MM_DD")(e.created_at)))]),t._v(")\n                    ")])],1),t._v(" "),a("b-col",[1==e.er_type?a("b-badge",{attrs:{variant:"light"}},[t._v("일반")]):2==e.er_type?a("b-badge",{attrs:{variant:"light"}},[t._v("프리미엄")]):3==e.er_type?a("b-badge",{attrs:{variant:"light"}},[t._v("프리미엄 플러스")]):t._e()],1),t._v(" "),a("b-col",[t._v(t._s(e.er_depart))]),t._v(" "),a("b-col",[a("b-badge",{attrs:{variant:"light"}},[t._v(t._s(e.er_tel))]),a("b-badge",{attrs:{variant:"light"}},[t._v(t._s(e.er_hp))])],1),t._v(" "),a("b-col",[t._v(t._s(e.er_email))]),t._v(" "),a("b-col",[t._v(t._s(t._f("formatDate_YY_MM_DD")(e.er_dlvy_at)))]),t._v(" "),a("b-col",["ING"==e.er_step?a("b-badge",{attrs:{variant:"light"}},[t._v("처리중")]):"CPLT"==e.er_step?a("b-badge",{attrs:{variant:"light"}},[t._v("처리완료")]):"NOT"==e.er_step?a("b-badge",{attrs:{variant:"light"}},[t._v("미처리")]):"CXL"==e.er_step?a("b-badge",{attrs:{variant:"light"}},[t._v("취소")]):t._e()],1)],1)}))],2),t._v(" "),a("pagination",{staticClass:"mt-5",attrs:{data:t.list,limit:5,showDisabled:!0,align:"center"},on:{"pagination-change-page":t.setPage}},[a("span",{attrs:{slot:"prev-nav"},slot:"prev-nav"},[a("b-icon-chevron-left")],1),t._v(" "),a("span",{attrs:{slot:"next-nav"},slot:"next-nav"},[a("b-icon-chevron-right")],1)])],1)],1)}),[],!1,null,"925159a6",null).exports}}]);