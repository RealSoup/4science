"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6815],{23144:(t,e,r)=>{r.d(e,{Z:()=>s});var n=r(23645),a=r.n(n)()((function(t){return t[1]}));a.push([t.id,".p_wrap .act_ctrl .def_info[data-v-0cfc6801]{line-height:1.9}.p_wrap .act_ctrl .def_info span[data-v-0cfc6801]{margin-left:2rem}.p_wrap .act_ctrl .def_info b[data-v-0cfc6801]{font-weight:900;margin-left:.5rem}.p_wrap .act_ctrl .btn_area[data-v-0cfc6801]{text-align:right}.p_wrap .act_ctrl .btn_area>*[data-v-0cfc6801]{margin-left:.5%;margin-right:.5%}.p_wrap .box .top_border[data-v-0cfc6801]{border-top:3px solid #4f637b}.p_wrap .box .container[data-v-0cfc6801]{max-width:100%}",""]);const s=a},76815:(t,e,r)=>{r.r(e),r.d(e,{default:()=>f});var n=r(87757),a=r.n(n),s=r(44670);function o(t,e,r,n,a,s,o){try{var i=t[s](o),c=i.value}catch(t){return void r(t)}i.done?e(c):Promise.resolve(c).then(n,a)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var s=t.apply(e,r);function i(t){o(s,n,a,i,c,"next",t)}function c(t){o(s,n,a,i,c,"throw",t)}i(void 0)}))}}const c={components:{"pa-list":function(){return r.e(6233).then(r.bind(r,96233))}},data:function(){return{frm:{collect:{lists:{},price:{}},estimate_req:{mng:{}},user:{},price:{}}}},methods:{show:function(){var t=this;return i(a().mark((function e(){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.Z.get("/api/admin/shop/estimate/".concat(t.$route.params.er_id),{params:{type:"reply"}});case 3:(r=e.sent)&&200===r.status&&(t.frm=r.data),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),Notify.consolePrint(e.t0),Notify.toast("warning",e.t0.response.data.message);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))()},destroy:function(){var t=this;return i(a().mark((function e(){var r,n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Notify.confirm("삭제","danger");case 2:if(!e.sent){e.next=19;break}return e.prev=4,(r=new FormData).append("_method","DELETE"),r.append("type","reply"),e.next=10,s.Z.post("/api/admin/shop/estimate/".concat(t.$route.params.er_id),r);case 10:(n=e.sent)&&200===n.status&&(Notify.toast("success","견적서 삭제"),t.$router.push({name:"adm_estimate_index"})),e.next=19;break;case 14:e.prev=14,e.t0=e.catch(4),Notify.consolePrint(e.t0),Notify.toast("danger","삭제 실패"),Notify.toast("danger",e.t0.response.data.message);case 19:case"end":return e.stop()}}),e,null,[[4,14]])})))()},print:function(){var t="/api/admin/shop/estimate/showEstimate/".concat(this.$route.params.er_id,"?type=print");window.open(t,"견적서 인쇄","width = 900, height = 900, top = 10, left = 10, location = no")},estimateExcel:function(){var t=this;return i(a().mark((function e(){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.Z.post("/api/admin/shop/estimate/exportEstimateExcel",t.frm,{responseType:"blob"});case 2:r=e.sent,t.orderDocumentDown(r,"".concat(t.frm.er_id,"_Estimate.xlsx"));case 4:case"end":return e.stop()}}),e)})))()},estimatePdf:function(){var t=this;return i(a().mark((function e(){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.Z.post("/api/admin/shop/estimate/exportEstimatePdf",t.frm,{responseType:"blob"});case 2:r=e.sent,t.orderDocumentDown(r,"".concat(t.frm.er_id,"_Estimate.pdf"));case 4:case"end":return e.stop()}}),e)})))()},transactionExcel:function(){var t=this;return i(a().mark((function e(){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.Z.post("/api/admin/shop/estimate/exportTransactionExcel",t.frm,{responseType:"blob"});case 2:r=e.sent,t.orderDocumentDown(r,"".concat(t.frm.er_id,"_Statement.xlsx"));case 4:case"end":return e.stop()}}),e)})))()},transactionPdf:function(){var t=this;return i(a().mark((function e(){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.Z.post("/api/admin/shop/estimate/exportTransactionPdf",t.frm,{responseType:"blob"});case 2:r=e.sent,t.orderDocumentDown(r,"".concat(t.frm.er_id,"_Statement.pdf"));case 4:case"end":return e.stop()}}),e)})))()},orderDocumentDown:function(t,e){var r=window.URL.createObjectURL(new Blob([t.data])),n=document.createElement("a");n.href=r,n.setAttribute("download",e),document.body.appendChild(n),n.click()},reSend:function(){var t=this;return i(a().mark((function e(){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.Z.post("/api/admin/shop/estimate/reSend/".concat(t.$route.params.er_id),t.frm);case 3:(r=e.sent)&&200===r.status&&Notify.toast("success","재발송 완료"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),Notify.consolePrint(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},onlineBooks:function(){var t=this;return i(a().mark((function e(){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.frm.data_type="EST",e.next=4,s.Z.post("/api/admin/ledger",t.frm);case 4:(r=e.sent)&&200===r.status?t.$router.push({name:"adm_ledger"}):Notify.toast("warning","기록 실패"),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),Notify.consolePrint(e.t0),Notify.toast("warning",e.t0.response);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))()},passOrder:function(){var t=this;return i(a().mark((function e(){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.Z.post("/api/admin/shop/order",t.frm);case 3:(r=e.sent)&&200===r.status?t.$router.push({name:"adm_order_index"}):Notify.toast("warning","기록 실패"),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),Notify.consolePrint(e.t0),Notify.toast("warning",e.t0.response);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))()},DlvyAllIn:function(t){for(var e in this.frm.collect.lists)for(var r in this.frm.collect.lists[e])this.frm.collect.lists[e][r].em_id!==t&&(this.frm.collect.lists[e][r].dlvy_all_in=!1)}},mounted:function(){this.show()}};var _=r(93379),l=r.n(_),m=r(23144),v={insert:"head",singleton:!1};l()(m.Z,v);m.Z.locals;const f=(0,r(51900).Z)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"p_wrap",attrs:{id:"adm_estimate_show"}},[r("h3",{staticClass:"p_tit"},[t._v("견적 응답")]),t._v(" "),r("div",{staticClass:"act_ctrl"},[r("b-row",{attrs:{cols:"1","cols-md":"2"}},[r("b-col",{staticClass:"def_info"},[r("span",[t._v("견적번호")]),t._v(" "),r("b",[t._v(t._s(t.frm.er_id)+".")]),t._v(" "),r("span",[t._v("견적일자")]),t._v(" "),r("b",[t._v(t._s(t.frm.created_at))])]),t._v(" "),r("b-col",{staticClass:"btn_area"},[r("b-button",{staticClass:"white sm",attrs:{to:{name:"adm_estimate_index"}}},[r("b-icon-list"),t._v(" 목록으로")],1),t._v(" "),r("b-button",{staticClass:"black sm",on:{click:t.passOrder}},[r("b-icon-box-arrow-up-right"),t._v(" 임의주문")],1),t._v(" "),r("b-button",{staticClass:"gray sm",on:{click:t.reSend}},[r("font-awesome-icon",{attrs:{icon:"paper-plane"}}),t._v(" 재발송")],1),t._v(" "),r("b-button",{staticClass:"d_blue sm",attrs:{to:{name:"adm_estimate_create",query:{eq_id:t.frm.estimate_req.eq_id,er_id:t.$route.params.er_id}}}},[r("b-icon-arrow-clockwise"),t._v(" 재작성\r\n                ")],1),t._v(" "),r("b-button",{staticClass:"blue sm",attrs:{to:{name:"adm_estimate_edit",params:{er_id:t.$route.params.er_id}}}},[r("b-icon-pencil-square"),t._v(" 수정\r\n                ")],1),t._v(" "),r("b-dropdown",{attrs:{size:"sm",text:"파일 다운",variant:"outline-dark"}},[r("b-dropdown-item-button",{attrs:{variant:"success"},on:{click:t.estimateExcel}},[t._v("견적서 "),r("b-badge",[t._v("EXCEL")])],1),t._v(" "),r("b-dropdown-item-button",{attrs:{variant:"warning"},on:{click:t.estimatePdf}},[t._v("견적서 "),r("b-badge",[t._v("PDF")])],1),t._v(" "),r("b-dropdown-divider"),t._v(" "),r("b-dropdown-item-button",{attrs:{variant:"success"},on:{click:t.transactionExcel}},[t._v("거래명세서 "),r("b-badge",[t._v("EXCEL")])],1),t._v(" "),r("b-dropdown-item-button",{attrs:{variant:"warning"},on:{click:t.transactionPdf}},[t._v("거래명세서 "),r("b-badge",[t._v("PDF")])],1)],1),t._v(" "),r("b-button",{staticClass:"sm",on:{click:t.print}},[t._v("인쇄")]),t._v(" "),r("b-button",{staticClass:"red sm",on:{click:t.destroy}},[r("b-icon",{attrs:{icon:"trash-fill"}}),t._v(" 삭제")],1)],1)],1)],1),t._v(" "),r("div",{staticClass:"box est_frm"},[r("h5",[t._v("요청자 정보")]),t._v(" "),r("b-row",[r("b-col",[t._v("견적요청번호")]),r("b-col",[t._v(t._s(t.frm.estimate_req.eq_id))]),t._v(" "),r("b-col",[t._v("요청일자")]),r("b-col",[t._v(t._s(t.frm.estimate_req.created_at))])],1),t._v(" "),r("b-row",[r("b-col",[t._v("요청자")]),t._v(" "),r("b-col",[t.frm.estimate_req.created_id?r("b-link",{on:{click:function(e){return t.openWinPop("/admin/user/"+t.frm.estimate_req.created_id+"/edit",1700,900)}}},[t._v("\r\n                    "+t._s(t.frm.estimate_req.eq_name)+"\r\n                ")]):[t._v(t._s(t.frm.estimate_req.eq_name))]],2),t._v(" "),r("b-col",[t._v("연락처")]),r("b-col",[t._v(t._s(t.frm.estimate_req.eq_hp)),t.frm.estimate_req.eq_tel?r("span",[t._v(" / "+t._s(t.frm.estimate_req.eq_tel))]):t._e()])],1),t._v(" "),r("b-row",[r("b-col",[t._v("직장 / 학교")]),r("b-col",[t._v(t._s(t.frm.estimate_req.eq_company))]),t._v(" "),r("b-col",[t._v("이메일")]),r("b-col",[t._v(t._s(t.frm.estimate_req.eq_email))])],1),t._v(" "),r("b-row",[r("b-col",[t._v("문의사항")]),t._v(" "),r("b-col",[r("p",{domProps:{innerHTML:t._s(t.nl2br(t.frm.estimate_req.eq_content))}})])],1),t._v(" "),r("b-row",[r("b-col",[t._v("첨부파일")]),t._v(" "),r("b-col",t._l(t.frm.estimate_req.file_info,(function(e,n){return r("b-button",{key:n,staticClass:"white sm mr-2",on:{click:function(r){return t.fileDown(e.down_path,e.fi_original)}}},[t._v("\r\n                    "+t._s(e.fi_original)+"\r\n                ")])})),1)],1)],1),t._v(" "),t.frm.estimate_model&&t.frm.estimate_model.length?r("div",{staticClass:"box"},[r("h5",[t._v("견적상품정보")]),t._v(" "),r("div",{staticClass:"top_border"}),t._v(" "),r("pa-list",{attrs:{price:t.frm.collect.price,user:t.frm.estimate_req.user,add_vat:!1},model:{value:t.frm.collect.lists,callback:function(e){t.$set(t.frm.collect,"lists",e)},expression:"frm.collect.lists"}})],1):t._e(),t._v(" "),r("div",{staticClass:"box est_frm"},[r("h5",[t._v("견적서 정보")]),t._v(" "),r("b-row",[r("b-col",[t._v("견적번호")]),r("b-col",[t._v(t._s(t.frm.er_id))]),t._v(" "),r("b-col",[t._v("견적일자")]),r("b-col",[t._v(t._s(t.frm.created_at))]),t._v(" "),r("b-col",[t._v("견적유효기간")]),r("b-col",[t._v(t._s(t.frm.er_effective_at))])],1),t._v(" "),r("b-row",[r("b-col",[t._v("담당자")]),r("b-col",[t._v(t._s(t.frm.estimate_req.mng.name))]),t._v(" "),r("b-col",[t._v("전화번호")]),r("b-col",[t._v(t._s(t.frm.estimate_req.mng.tel))]),t._v(" "),r("b-col",[t._v("이메일")]),r("b-col",[t._v(t._s(t.frm.estimate_req.mng.email))])],1),t._v(" "),r("b-row",[r("b-col",[t._v("납품기일")]),r("b-col",[t._v(t._s(t.frm.er_dlvy_at))])],1),t._v(" "),r("b-row",[r("b-col",[t._v("추가정보")]),t._v(" "),r("b-col",[r("p",{domProps:{innerHTML:t._s(t.nl2br(t.frm.er_content))}})])],1),t._v(" "),r("b-row",[r("b-col",[t._v("첨부파일")]),t._v(" "),r("b-col",t._l(t.frm.file_info,(function(e,n){return r("b-button",{key:n,staticClass:"white sm mr-2",on:{click:function(r){return t.fileDown(e.down_path,e.fi_original)}}},[t._v("\r\n                    "+t._s(e.fi_original)+"\r\n                ")])})),1)],1)],1)])}),[],!1,null,"0cfc6801",null).exports}}]);