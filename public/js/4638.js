"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4638],{8702:(t,e,a)=>{a.d(e,{Z:()=>i});var r=a(23645),s=a.n(r),o=a(43877),n=s()((function(t){return t[1]}));n.i(o.Z),n.push([t.id,".p_wrap .act_ctrl .def_info[data-v-03c6b08e]{line-height:1.9}.p_wrap .act_ctrl .def_info span[data-v-03c6b08e]{margin-left:2rem}.p_wrap .act_ctrl .def_info b[data-v-03c6b08e]{font-weight:900;margin-left:.5rem}.p_wrap .act_ctrl .btn_area[data-v-03c6b08e]{text-align:right}.p_wrap .act_ctrl .btn_area .select_box[data-v-03c6b08e]{display:inline-block;width:200px}.p_wrap .act_ctrl .btn_area>*[data-v-03c6b08e]{margin-left:1%;margin-right:1%}.p_wrap .gd_list .row[data-v-03c6b08e]:first-of-type{border-top:3px solid #4f637b;font-weight:600}.p_wrap .gd_list .row[data-v-03c6b08e]:last-of-type{border-bottom:3px solid #4f637b}.p_wrap .gd_list .row .col[data-v-03c6b08e]:nth-child(2),.p_wrap .gd_list .row .col[data-v-03c6b08e]:nth-child(3),.p_wrap .gd_list .row .col[data-v-03c6b08e]:nth-child(4),.p_wrap .gd_list .row .col[data-v-03c6b08e]:nth-child(5){flex:0 0 13%;max-width:13%}.p_wrap .gd_list .row .col[data-v-03c6b08e]{align-items:center;display:flex;font-size:.95rem;justify-content:center;padding:.75rem}.p_wrap .gd_list .row:not(:last-of-type) .col[data-v-03c6b08e]{border-bottom:1px solid #d7d7d7}.p_wrap .gd_list .row .col[data-v-03c6b08e]:not(:last-of-type){border-right:1px solid #d7d7d7}.p_wrap .gd_list .row:not(:first-of-type) .col[data-v-03c6b08e]{color:#949494}.p_wrap .gd_list .row:not(:first-of-type) .col:first-of-type a[data-v-03c6b08e]{flex:0 0 145px;max-width:145px}.p_wrap .gd_list .row:not(:first-of-type) .col:first-of-type div[data-v-03c6b08e]{flex-basis:0;flex-grow:1;max-width:100%;padding-left:2rem;text-align:left}.p_wrap .gd_list .row:not(:first-of-type) .col:first-of-type div .gd_name[data-v-03c6b08e]{color:#555;display:block}.p_wrap .gd_list .row .col a[data-v-03c6b08e]{height:120px;padding-left:20px;width:120px}.p_wrap .gd_list .row .col a img[data-v-03c6b08e]{border:1px solid #8f8f8f;height:100%;-o-object-fit:contain;object-fit:contain;width:100%}",""]);const i=n},43877:(t,e,a)=>{a.d(e,{Z:()=>o});var r=a(23645),s=a.n(r)()((function(t){return t[1]}));s.push([t.id,"",""]);const o=s},74638:(t,e,a)=>{a.r(e),a.d(e,{default:()=>m});var r=a(87757),s=a.n(r),o=a(44670);function n(t,e,a,r,s,o,n){try{var i=t[o](n),c=i.value}catch(t){return void a(t)}i.done?e(c):Promise.resolve(c).then(r,s)}function i(t){return function(){var e=this,a=arguments;return new Promise((function(r,s){var o=t.apply(e,a);function i(t){n(o,r,s,i,c,"next",t)}function c(t){n(o,r,s,i,c,"throw",t)}i(void 0)}))}}const c={name:"admShopEstimateShowReq",components:{"made-type01":function(){return a.e(4420).then(a.bind(a,44420))},"made-type08":function(){return a.e(4064).then(a.bind(a,54064))},"made-type20":function(){return a.e(5186).then(a.bind(a,65186))},"made-type24":function(){return a.e(6320).then(a.bind(a,6320))},"made-type-common":function(){return a.e(8226).then(a.bind(a,78226))}},data:function(){return{frm:{file_info:[]}}},computed:{choiceSubType:function(){switch(this.frm.eq_1depth){case"1":return"made-type01";case"8":return"made-type08";case"20":return"made-type20";case"24":return"made-type24";default:return"made-type-common"}}},methods:{show:function(){var t=this;return i(s().mark((function e(){var a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.Z.get("/api/admin/shop/estimate/".concat(t.$route.params.eq_id));case 3:(a=e.sent)&&200===a.status&&(t.frm=a.data),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),Notify.consolePrint(e.t0),Notify.toast("warning",e.t0.response.data.message);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))()},update:function(){var t=this;return i(s().mark((function e(){var a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.frm=Object.assign({},t.frm,{_method:"PATCH",type:"eq_step"}),e.next=4,o.Z.post("/api/admin/shop/estimate/".concat(t.$route.params.eq_id),t.frm);case 4:(a=e.sent)&&200===a.status?Notify.toast("success","수정 완료"):Notify.toast("warning","수정 실패"),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),Notify.consolePrint(e.t0),Notify.toast("warning",e.t0.response.data.message);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))()},destroy:function(){var t=this;return i(s().mark((function e(){var a,r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Notify.confirm("삭제","danger");case 2:if(!e.sent){e.next=19;break}return e.prev=4,(a=new FormData).append("_method","DELETE"),a.append("type","req"),e.next=10,o.Z.post("/api/admin/shop/estimate/".concat(t.$route.params.eq_id),a);case 10:(r=e.sent)&&200===r.status&&(Notify.toast("success","견적서 삭제"),t.$router.push({name:"adm_estimate_index"})),e.next=19;break;case 14:e.prev=14,e.t0=e.catch(4),Notify.consolePrint(e.t0),Notify.toast("danger","삭제 실패"),Notify.toast("danger",e.t0.response.data.message);case 19:case"end":return e.stop()}}),e,null,[[4,14]])})))()},print:function(){var t=this;return i(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$htmlToPaper("adm_estimate_show",{styles:["https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css","/css/fontawesome_svg.css","/css/adm_shop_estimate_req.css"]});case 2:case"end":return e.stop()}}),e)})))()}},mounted:function(){this.show()}};var _=a(93379),l=a.n(_),p=a(8702),d={insert:"head",singleton:!1};l()(p.Z,d);p.Z.locals;const m=(0,a(51900).Z)(c,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"p_wrap",attrs:{id:"adm_estimate_show"}},[a("h3",{staticClass:"p_tit"},[t._v("견적 요청")]),t._v(" "),a("div",{staticClass:"act_ctrl"},[a("b-row",{attrs:{cols:"1","cols-md":"2"}},[a("b-col",{staticClass:"def_info"},[a("span",[t._v("요청번호")]),t._v(" "),a("b",[t._v(t._s(t.frm.eq_id)+".")]),t._v(" "),a("span",[t._v("요청날짜")]),t._v(" "),a("b",[t._v(t._s(t._f("formatDate_YY_MM_DD")(t.frm.created_at)))])]),t._v(" "),a("b-col",{staticClass:"btn_area"},[a("b-button",{staticClass:"white sm",attrs:{to:{name:"adm_estimate_index"}}},[a("b-icon-list"),t._v(" 목록으로")],1),t._v(" "),t.frm.estimate_reply&&t.frm.estimate_reply.length>0?a("b-button",{staticClass:"mint sm",attrs:{to:{name:"adm_estimate_show_reply",params:{er_id:t.frm.estimate_reply[t.frm.estimate_reply.length-1].er_id}}}},[a("b-icon-newspaper"),t._v(" 견적서 확인\r\n                ")],1):a("b-button",{staticClass:"blue sm",attrs:{to:{name:"adm_estimate_create",query:{eq_id:t.frm.eq_id}}}},[a("b-icon-pencil-square"),t._v(" 견적서 작성\r\n                ")],1),t._v(" "),a("b-button",{staticClass:"d_gray sm",on:{click:t.print}},[a("b-icon-printer"),t._v(" 인쇄")],1),t._v(" "),a("div",{staticClass:"select_box"},[a("b-input-group",{attrs:{size:"sm"}},[a("b-form-select",{model:{value:t.frm.eq_step,callback:function(e){t.$set(t.frm,"eq_step",e)},expression:"frm.eq_step"}},[a("b-form-select-option",{attrs:{value:"DONOT"}},[t._v("미처리")]),t._v(" "),a("b-form-select-option",{attrs:{value:"DOING"}},[t._v("처리중")]),t._v(" "),a("b-form-select-option",{attrs:{value:"DONE"}},[t._v("완료")]),t._v(" "),a("b-form-select-option",{attrs:{value:"CANCEL"}},[t._v("취소")])],1),t._v(" "),a("b-input-group-append",[a("b-button",{staticClass:"sm",on:{click:t.update}},[a("b-icon-tools"),t._v(" 변경")],1)],1)],1)],1),t._v(" "),a("b-button",{staticClass:"red sm",on:{click:t.destroy}},[a("b-icon",{attrs:{icon:"trash-fill"}}),t._v(" 삭제")],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"box est_frm"},[a("h5",[t._v("요청자 정보")]),t._v(" "),a("b-row",[a("b-col",[t._v("요청자")]),t._v(" "),a("b-col",[t.frm.created_id?a("b-link",{on:{click:function(e){return t.openWinPop("/admin/user/"+t.frm.created_id+"/edit",1700,900)}}},[t._v("\r\n                    "+t._s(t.frm.eq_name)+"\r\n                ")]):t._e()],1),t._v(" "),a("b-col",[t._v("연락처")]),a("b-col",[t._v(t._s(t.frm.eq_hp)),t.frm.eq_tel?a("span",[t._v(" / "+t._s(t.frm.eq_tel))]):t._e()])],1),t._v(" "),a("b-row",[a("b-col",[t._v("직장 / 학교")]),a("b-col",[t._v(t._s(t.frm.eq_company))]),t._v(" "),a("b-col",[t._v("이메일")]),a("b-col",[t._v(t._s(t.frm.eq_email))])],1),t._v(" "),a("b-row",[a("b-col",[t._v("문의사항")]),t._v(" "),a("b-col",[a("p",{domProps:{innerHTML:t._s(t.nl2br(t.frm.eq_content))}})])],1),t._v(" "),a("b-row",[a("b-col",[t._v("첨부파일")]),t._v(" "),a("b-col",t._l(t.frm.file_info,(function(e,r){return a("b-button",{key:r,staticClass:"white sm mr-2",on:{click:function(a){return t.fileDown(e.down_path,e.fi_original)}}},[t._v("\r\n                    "+t._s(e.fi_original)+"\r\n                ")])})),1)],1)],1),t._v(" "),t.frm.estimate_model&&t.frm.estimate_model.length?a("div",{staticClass:"box gd_list"},[a("h5",[t._v("견적요청 상품")]),t._v(" "),a("b-row",[a("b-col",[t._v("주문 상품")]),t._v(" "),a("b-col",[t._v("사양")]),t._v(" "),a("b-col",[t._v("제조사")]),t._v(" "),a("b-col",[t._v("판매단위")]),t._v(" "),a("b-col",[t._v("수량")])],1),t._v(" "),t._l(t.frm.estimate_model,(function(e){return a("b-row",{key:e.em_id},[a("b-col",[a("b-link",{on:{click:function(a){return t.openWinPop("/admin/shop/goods/"+e.em_gd_id+"/edit",1700,900)}}},[a("img",{attrs:{src:e.img_src}})]),t._v(" "),a("div",[a("b",{staticClass:"gd_name"},[t._v(t._s(e.em_name))]),t._v("\r\n                    모델명: "+t._s(e.em_code)),a("b",{staticClass:"divider"},[t._v("/")]),t._v("\r\n                    Cat.No: "+t._s(e.em_catno)+"\r\n                ")])],1),t._v(" "),a("b-col",[t._v(t._s(e.em_spec))]),t._v(" "),a("b-col",[t._v(t._s(e.em_maker))]),t._v(" "),a("b-col",[t._v(t._s(e.em_unit))]),t._v(" "),a("b-col",[t._v(t._s(t._f("comma")(e.em_ea)))]),t._v(" "),e.estimate_option.length?a("b-col",{staticClass:"opc",attrs:{cols:"12"}},t._l(e.estimate_option,(function(e){return a("b-row",{key:e.eo_id},[a("b-col",{attrs:{offset:"6"}},[t._v(t._s(e.eo_tit)+": "+t._s(e.eo_name))]),t._v(" "),a("b-col",{attrs:{tag:"i"}},[t._v("수량 : "),a("b",[t._v(t._s(t._f("comma")(e.eo_ea)))]),t._v(" 개")])],1)})),1):t._e()],1)}))],2):t._e(),t._v(" "),Number(t.frm.eq_1depth)?a("div",{staticClass:"box"},[a("h5",[t._v("주문제작 정보: "+t._s(t.frm.made_cate[t.frm.eq_1depth]))]),t._v(" "),a(t.choiceSubType,{ref:"custom_sub",tag:"component",model:{value:t.frm.estimate_custom,callback:function(e){t.$set(t.frm,"estimate_custom",e)},expression:"frm.estimate_custom"}})],1):t._e()])}),[],!1,null,"03c6b08e",null).exports}}]);