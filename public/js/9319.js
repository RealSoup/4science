"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9319],{73772:(t,e,a)=>{a.d(e,{Z:()=>o});var r=a(23645),n=a.n(r)()((function(t){return t[1]}));n.push([t.id,".p_wrap .frm01 .row .col select[data-v-46480b74]{max-width:10rem}",""]);const o=n},89319:(t,e,a)=>{a.r(e),a.d(e,{default:()=>f});var r=a(87757),n=a.n(r),o=a(44670);function s(t,e,a,r,n,o,s){try{var c=t[o](s),l=c.value}catch(t){return void a(t)}c.done?e(l):Promise.resolve(l).then(r,n)}function c(t){return function(){var e=this,a=arguments;return new Promise((function(r,n){var o=t.apply(e,a);function c(t){s(o,r,n,c,l,"next",t)}function l(t){s(o,r,n,c,l,"throw",t)}c(void 0)}))}}const l={name:"AdmUserEmail",data:function(){return{agree:0,all:0,frm:{target:0,subject:"",content:"",temp:"dvvb38@gmail.com;dvvb38@nate.com;kjk@4science.net;dvvb38@naver.com;realsoup38@daum.net;chakanharry@gmail.com;chakanharry@hanmail.net;harry82@nate.com;chakanharry@naver.com;lhr@4science.net;dvvb38@kakao.com"}}},methods:{send:function(){var t=this;return c(n().mark((function e(){var a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.post("/api/admin/user/sendEmail",t.frm);case 2:(a=e.sent)&&200===a.status&&Notify.modal(a.data);case 4:case"end":return e.stop()}}),e)})))()}},mounted:function(){var t=this;return c(n().mark((function e(){var a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.get("/api/admin/user/mailInfo");case 2:(a=e.sent)&&200===a.status&&(t.agree=a.data.agree,t.all=a.data.all);case 4:case"end":return e.stop()}}),e)})))()}};var v=a(93379),i=a.n(v),m=a(73772),u={insert:"head",singleton:!1};i()(m.Z,u);m.Z.locals;const f=(0,a(51900).Z)(l,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"p_wrap layout"},[a("h3",[t._v("대량 메일")]),t._v(" "),a("div",{staticClass:"act_ctrl"},[a("b-row",[a("b-col",[t._v("총 "),a("b",[t._v(t._s(t._f("comma")(t.all)))]),t._v("명, 수신동의 "),a("b",[t._v(t._s(t._f("comma")(t.agree)))]),t._v("명")]),t._v(" "),a("b-col",{staticClass:"text-right"},[a("b-button",{staticClass:"black sm",on:{click:t.send}},[t._v("발송")])],1)],1)],1),t._v(" "),a("div",{staticClass:"box frm01"},[a("h5",[t._v("메일내용")]),t._v(" "),a("b-row",[a("b-col",[t._v("발송 대상")]),t._v(" "),a("b-col",[a("b-form-select",{model:{value:t.frm.target,callback:function(e){t.$set(t.frm,"target",e)},expression:"frm.target"}},[a("b-form-select-option",{attrs:{value:"0"}},[t._v("직접 입력")]),t._v(" "),a("b-form-select-option",{attrs:{value:"1"}},[t._v("수신동의만")]),t._v(" "),a("b-form-select-option",{attrs:{value:"2"}},[t._v("모두(0~3만)")]),t._v(" "),a("b-form-select-option",{attrs:{value:"all_3-6"}},[t._v("모두(3~6만)")]),t._v(" "),a("b-form-select-option",{attrs:{value:"all_6-end"}},[t._v("모두(6만~)")])],1),t._v(" "),a("b",[t._v("1회 발송시 최대 3만통까지만 가능")]),t._v(" "),"0"==t.frm.target?a("b-form-textarea",{attrs:{rows:"4"},model:{value:t.frm.temp,callback:function(e){t.$set(t.frm,"temp",e)},expression:"frm.temp"}}):t._e()],1)],1),t._v(" "),a("b-row",[a("b-col",[t._v("제목")]),a("b-col",[a("b-form-input",{model:{value:t.frm.subject,callback:function(e){t.$set(t.frm,"subject",e)},expression:"frm.subject"}})],1)],1),t._v(" "),a("b-row",[a("b-col",[t._v("내용")]),t._v(" "),a("b-col",[a("b-form-textarea",{attrs:{rows:"16"},model:{value:t.frm.content,callback:function(e){t.$set(t.frm,"content",e)},expression:"frm.content"}})],1)],1)],1)])}),[],!1,null,"46480b74",null).exports}}]);