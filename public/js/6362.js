"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6362],{6362:(t,r,e)=>{e.r(r),e.d(r,{default:()=>l});var n=e(7757),a=e.n(n),s=e(4670);function o(t,r,e,n,a,s,o){try{var i=t[s](o),c=i.value}catch(t){return void e(t)}i.done?r(c):Promise.resolve(c).then(n,a)}function i(t){return function(){var r=this,e=arguments;return new Promise((function(n,a){var s=t.apply(r,e);function i(t){o(s,n,a,i,c,"next",t)}function c(t){o(s,n,a,i,c,"throw",t)}i(void 0)}))}}const c={name:"configEdit",data:function(){return{frm:{site:{},biz:{},bank:{},_method:"PATCH"}}},computed:{},methods:{update:function(){var t=this;return i(a().mark((function r(){return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,s.Z.post("/api/admin/site",t.frm);case 3:r.sent,r.next=10;break;case 6:r.prev=6,r.t0=r.catch(0),Notify.consolePrint(r.t0),Notify.toast("warning",r.t0.response.data.message);case 10:case"end":return r.stop()}}),r,null,[[0,6]])})))()}},mounted:function(){var t=this;return i(a().mark((function r(){var e;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,s.Z.get("/api/admin/site");case 2:(e=r.sent)&&200===e.status&&(e.data.site&&(t.frm.site=e.data.site.var),e.data.biz&&(t.frm.biz=e.data.biz.var),e.data.bank&&(t.frm.bank=e.data.bank.var));case 4:case"end":return r.stop()}}),r)})))()}};const l=(0,e(1900).Z)(c,(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",[e("b-card",{staticClass:"shadow",attrs:{"header-tag":"header"},scopedSlots:t._u([{key:"header",fn:function(){return[e("b-container",{attrs:{fluid:""}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-6"},[e("b",[t._v("Site 설정")])]),t._v(" "),e("div",{staticClass:"col-6 text-right"},[e("b-button",{attrs:{size:"sm",variant:"primary"},on:{click:t.update}},[t._v("적용")])],1)])])]},proxy:!0}])},[t._v(" "),e("b-alert",{attrs:{show:"",variant:"success"}},[e("h5",{staticClass:"alert-heading"},[t._v("사이트정보")]),t._v(" "),e("b-container",{attrs:{fluid:""}},[e("b-row",[e("b-col",{attrs:{cols:"2"}},[e("b-input-group",{attrs:{prepend:"도메인"}},[e("b-form-input",{model:{value:t.frm.site.domain,callback:function(r){t.$set(t.frm.site,"domain",r)},expression:"frm.site.domain"}})],1)],1),t._v(" "),e("b-col",{attrs:{cols:"2"}},[e("b-input-group",{attrs:{prepend:"사이트명"}},[e("b-form-input",{model:{value:t.frm.site.site,callback:function(r){t.$set(t.frm.site,"site",r)},expression:"frm.site.site"}})],1)],1)],1),t._v(" "),e("b-row",{staticClass:"mt-4"},[e("b-col",{attrs:{cols:"4"}}),t._v(" "),e("b-col",{attrs:{cols:"2"}}),t._v(" "),e("b-col",{attrs:{cols:"2"}})],1)],1)],1),t._v(" "),e("b-alert",{attrs:{show:"",variant:"info"}},[e("h5",{staticClass:"alert-heading"},[t._v("회사정보")]),t._v(" "),e("b-container",{attrs:{fluid:""}},[e("b-row",[e("b-col",{attrs:{cols:"2"}},[e("b-input-group",{attrs:{prepend:"회사명"}},[e("b-form-input",{model:{value:t.frm.biz.company,callback:function(r){t.$set(t.frm.biz,"company",r)},expression:"frm.biz.company"}})],1)],1),t._v(" "),e("b-col",{attrs:{cols:"2"}},[e("b-input-group",{attrs:{prepend:"대표이사"}},[e("b-form-input",{model:{value:t.frm.biz.ceo,callback:function(r){t.$set(t.frm.biz,"ceo",r)},expression:"frm.biz.ceo"}})],1)],1),t._v(" "),e("b-col",{attrs:{cols:"2"}},[e("b-input-group",{attrs:{prepend:"전화"}},[e("b-form-input",{model:{value:t.frm.biz.tel,callback:function(r){t.$set(t.frm.biz,"tel",r)},expression:"frm.biz.tel"}})],1)],1),t._v(" "),e("b-col",{attrs:{cols:"2"}},[e("b-input-group",{attrs:{prepend:"팩스"}},[e("b-form-input",{model:{value:t.frm.biz.fax,callback:function(r){t.$set(t.frm.biz,"fax",r)},expression:"frm.biz.fax"}})],1)],1),t._v(" "),e("b-col",{attrs:{cols:"2"}},[e("b-input-group",{attrs:{prepend:"이메일"}},[e("b-form-input",{model:{value:t.frm.biz.email,callback:function(r){t.$set(t.frm.biz,"email",r)},expression:"frm.biz.email"}})],1)],1)],1),t._v(" "),e("b-row",{staticClass:"mt-4"},[e("b-col",{attrs:{cols:"4"}},[e("b-input-group",{attrs:{prepend:"주소"}},[e("b-form-input",{model:{value:t.frm.biz.addr,callback:function(r){t.$set(t.frm.biz,"addr",r)},expression:"frm.biz.addr"}})],1)],1),t._v(" "),e("b-col",{attrs:{cols:"2"}},[e("b-input-group",{attrs:{prepend:"사업자번호"}},[e("b-form-input",{model:{value:t.frm.biz.biz_num,callback:function(r){t.$set(t.frm.biz,"biz_num",r)},expression:"frm.biz.biz_num"}})],1)],1),t._v(" "),e("b-col",{attrs:{cols:"2"}},[e("b-input-group",{attrs:{prepend:"통신판매번호"}},[e("b-form-input",{model:{value:t.frm.biz.e_comm_num,callback:function(r){t.$set(t.frm.biz,"e_comm_num",r)},expression:"frm.biz.e_comm_num"}})],1)],1)],1)],1)],1),t._v(" "),e("b-alert",{attrs:{show:"",variant:"primary"}},[e("h5",{staticClass:"alert-heading"},[t._v("은행정보")]),t._v(" "),e("b-container",{attrs:{fluid:""}},[e("b-row",[e("b-col",[e("b-input-group",{attrs:{prepend:"예금주"}},[e("b-form-input",{model:{value:t.frm.bank.owner,callback:function(r){t.$set(t.frm.bank,"owner",r)},expression:"frm.bank.owner"}})],1)],1),t._v(" "),e("b-col"),t._v(" "),e("b-col",[e("b-input-group",{attrs:{prepend:"은행명 1"}},[e("b-form-input",{model:{value:t.frm.bank.name01,callback:function(r){t.$set(t.frm.bank,"name01",r)},expression:"frm.bank.name01"}})],1)],1),t._v(" "),e("b-col",[e("b-input-group",{attrs:{prepend:"계좌번호 1"}},[e("b-form-input",{model:{value:t.frm.bank.num01,callback:function(r){t.$set(t.frm.bank,"num01",r)},expression:"frm.bank.num01"}})],1)],1),t._v(" "),e("b-col",[e("b-input-group",{attrs:{prepend:"은행명 2"}},[e("b-form-input",{model:{value:t.frm.bank.name02,callback:function(r){t.$set(t.frm.bank,"name02",r)},expression:"frm.bank.name02"}})],1)],1),t._v(" "),e("b-col",[e("b-input-group",{attrs:{prepend:"계좌번호 2"}},[e("b-form-input",{model:{value:t.frm.bank.num02,callback:function(r){t.$set(t.frm.bank,"num02",r)},expression:"frm.bank.num02"}})],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null).exports}}]);