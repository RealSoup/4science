"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8465],{9320:(e,t,r)=>{r.d(t,{Z:()=>m});var a=r(3645),n=r.n(a)()((function(e){return e[1]}));n.push([e.id,'.auth_create{max-width:992px}.auth_create .form-group{margin:0}.auth_create .row{margin-bottom:1rem}.auth_create .col label.required:before{color:red;content:"✭"}.auth_create .col .interest_etc{width:auto}',""]);const m=n},8465:(e,t,r)=>{r.r(t),r.d(t,{default:()=>c});var a=r(7757),n=r.n(a),m=r(4670),i=r(3332);function o(e,t,r,a,n,m,i){try{var o=e[m](i),s=o.value}catch(e){return void r(e)}o.done?t(s):Promise.resolve(s).then(a,n)}const s={name:"AuthCreate",components:{FormUser:function(){return r.e(7946).then(r.bind(r,1998))},FormDealer:function(){return r.e(7723).then(r.bind(r,7723))}},data:function(){return{frm:{sex:"male",receive_mail:"Y",receive_sms:"Y",name:"짐짐국",email:"dvvb3820@nate.com",password:"tkskdl38",password_confirmation:"tkskdl38",hp:"010-1111-2222",birth:"2031-12-12",ub_num:"123-12-12312",ub_corp_name:"(주)짐짐국",ub_name:"김짐국 ced 대표",ub_tel:"070-4334-3433",ub_zip:"12311",ub_addr1:"짐국 ㄴㅁㅇㄹ ㄴㅇㄹ 2-3 @ㅇㅇ",ub_addr2:"f 402 @",ub_type:"짐국",ub_cond:"짐국"}}},methods:{getValidationState:function(e){var t=e.dirty,r=e.validated,a=e.valid;return t||r?void 0===a?null:a:null},register:function(){var e,t=this;return(e=n().mark((function e(){var r,a,o;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=new FormData,a=document.getElementById("ub_file"),isEmpty(t.frm.name)||r.append("name",t.frm.name),isEmpty(t.frm.sex)||r.append("sex",t.frm.sex),isEmpty(t.frm.email)||r.append("email",t.frm.email),isEmpty(t.frm.receive_mail)||r.append("receive_mail",t.frm.receive_mail),isEmpty(t.frm.password)||r.append("password",t.frm.password),isEmpty(t.frm.password_confirmation)||r.append("password_confirmation",t.frm.password_confirmation),isEmpty(t.frm.birth)||r.append("birth",t.frm.birth),isEmpty(t.frm.hp)||r.append("hp",t.frm.hp),isEmpty(t.frm.receive_sms)||r.append("receive_sms",t.frm.receive_sms),isEmpty(t.frm.tel)||r.append("tel",t.frm.tel),isEmpty(t.frm.fax)||r.append("fax",t.frm.fax),isEmpty(t.frm.job)||r.append("job",t.frm.job),isEmpty(t.frm.office)||r.append("office",t.frm.office),isEmpty(t.frm.department)||r.append("department",t.frm.department),isEmpty(t.frm.grade)||r.append("grade",t.frm.grade),isEmpty(t.frm.tutor)||r.append("tutor",t.frm.tutor),isEmpty(t.frm.offer)||r.append("offer",t.frm.offer),isEmpty(t.frm.offer_lab)||r.append("offer_lab",t.frm.offer_lab),isEmpty(t.frm.interest)||r.append("interest",t.frm.interest),isEmpty(t.frm.interest_etc)||r.append("interest_etc",t.frm.interest_etc),isEmpty(t.frm.join_route)||r.append("join_route",t.frm.join_route),"dealer"==t.$route.params.code&&(isEmpty(t.frm.level)||r.append("level",t.frm.level),isEmpty(t.frm.ub_num)||r.append("ub_num",t.frm.ub_num),isEmpty(t.frm.ub_file)||r.append("ub_file",a.files[0]),isEmpty(t.frm.ub_corp_name)||r.append("ub_corp_name",t.frm.ub_corp_name),isEmpty(t.frm.ub_name)||r.append("ub_name",t.frm.ub_name),isEmpty(t.frm.ub_tel)||r.append("ub_tel",t.frm.ub_tel),isEmpty(t.frm.ub_zip)||r.append("ub_zip",t.frm.ub_zip),isEmpty(t.frm.ub_addr1)||r.append("ub_addr1",t.frm.ub_addr1),isEmpty(t.frm.ub_addr2)||r.append("ub_addr2",t.frm.ub_addr2),isEmpty(t.frm.ub_type)||r.append("ub_type",t.frm.ub_type),isEmpty(t.frm.ub_cond)||r.append("ub_cond",t.frm.ub_cond)),e.next=27,m.Z.post("/register",r);case 27:if(!(o=e.sent)||201!==o.status){e.next=31;break}return e.next=31,m.Z.get("auth_check").then((function(e){console.log(e.data),1===e.data&&m.Z.get("/api/user").then((function(e){i.Z.state.auth.isLoggedin=!0,i.Z.state.auth.user=e.data.user,i.Z.state.auth.csrfToken=e.data.token,document.querySelector("meta[name=csrf-token]").setAttribute("content",e.data.token),t.$router.push({name:"main"})}))})).catch((function(){}));case 31:e.next=37;break;case 33:e.prev=33,e.t0=e.catch(0),Notify.consolePrint(e.t0),Notify.toast("warning",e.t0.response.data.message);case 37:case"end":return e.stop()}}),e,null,[[0,33]])})),function(){var t=this,r=arguments;return new Promise((function(a,n){var m=e.apply(t,r);function i(e){o(m,a,n,i,s,"next",e)}function s(e){o(m,a,n,i,s,"throw",e)}i(void 0)}))})()}},beforeRouteEnter:function(e,t,r){if(i.Z.state.auth.isLoggedin)return r("/");r()},mounted:function(){"dealer"==this.$route.params.code&&(this.frm.level=10)}};var p=r(3379),f=r.n(p),u=r(9320),d={insert:"head",singleton:!1};f()(u.Z,d);u.Z.locals;const c=(0,r(1900).Z)(s,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-container",{staticClass:"auth_create"},[r("b-row",[r("b-col",{attrs:{tag:"h1"}},[e._v("회원가입")])],1),e._v(" "),r("FormUser",{model:{value:e.frm,callback:function(t){e.frm=t},expression:"frm"}}),e._v(" "),"dealer"==e.$route.params.code?r("FormDealer",{model:{value:e.frm,callback:function(t){e.frm=t},expression:"frm"}}):e._e(),e._v(" "),r("b-row",[r("b-col",[r("b-button",{staticClass:"float-left",attrs:{variant:"danger"},on:{click:function(t){return e.$router.go(-1)}}},[e._v("취소")])],1),e._v(" "),r("b-col",{staticClass:"text-right"},[r("b-button",{staticClass:"float-right",attrs:{variant:"primary"},on:{click:e.register}},[e._v("회원가입")])],1)],1)],1)}),[],!1,null,null,null).exports}}]);