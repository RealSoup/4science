"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[662],{22296:(t,e,a)=>{a.d(e,{Z:()=>o});var s=a(23645),r=a.n(s)()((function(t){return t[1]}));r.push([t.id,".card.ctrl .row[data-v-78dbb6ba]{align-items:center}.card.ctrl .row .col .type_icon[data-v-78dbb6ba]{display:inline-block;margin-right:25px}.card.ctrl .row .col .type_icon svg[data-v-78dbb6ba]{margin-right:10px}.card .row .checkbox01[data-v-78dbb6ba] .custom-checkbox label{font-size:12px!important}.card .row .checkbox01[data-v-78dbb6ba] .custom-checkbox label b{font-weight:900}.card .row .checkbox01[data-v-78dbb6ba],.card .row .checkbox01[data-v-78dbb6ba] .custom-checkbox{align-items:center;display:flex}.card .row .checkbox01[data-v-78dbb6ba] .custom-checkbox .custom-control-label:after,.card .row .checkbox01[data-v-78dbb6ba] .custom-checkbox .custom-control-label:before{position:absolute;top:50%;transform:translateY(-50%)}",""]);const o=r},40662:(t,e,a)=>{a.r(e),a.d(e,{default:()=>u});var s=a(87757),r=a.n(s),o=a(44670);function l(t,e,a,s,r,o,l){try{var i=t[o](l),c=i.value}catch(t){return void a(t)}i.done?e(c):Promise.resolve(c).then(s,r)}function i(t){return function(){var e=this,a=arguments;return new Promise((function(s,r){var o=t.apply(e,a);function i(t){l(o,s,r,i,c,"next",t)}function c(t){l(o,s,r,i,c,"throw",t)}i(void 0)}))}}const c={name:"AdmUserEdit",components:{Modal:function(){return a.e(2709).then(a.bind(a,72709))},Mileage:function(){return a.e(6570).then(a.bind(a,46570))},Order:function(){return a.e(196).then(a.bind(a,80196))},Estimate:function(){return a.e(438).then(a.bind(a,60438))}},data:function(){return{id:this.$route.params.id,isModalViewed:!1,frm:{option:[],user_mng:{}},order:[],order_config:{},mng_off:[],estimate:[]}},methods:{edit:function(){var t=this;return i(r().mark((function e(){var a,s,l;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.get("/api/admin/user/".concat(t.id,"/edit"));case 2:return(a=e.sent)&&200===a.status&&(t.frm=a.data),e.next=6,o.Z.get("/api/admin/shop/order",{params:{writer:t.id,limit:10}});case 6:return(s=e.sent)&&200===s.status&&(t.order=s.data.list,t.order_config=s.data.order_config,t.mng_off=s.data.mng_off),e.next=10,o.Z.get("/api/admin/shop/estimate",{params:{writer:t.id,limit:10}});case 10:(l=e.sent)&&200===l.status&&(t.estimate=l.data.list);case 12:case"end":return e.stop()}}),e)})))()},update:function(){var t=this;return i(r().mark((function e(){var a;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.frm=Object.assign({},t.frm,{_method:"PATCH"}),e.next=3,o.Z.post("/api/admin/user/".concat(t.id),t.frm);case 3:(a=e.sent)&&200===a.status&&Notify.toast("success","수정 완료");case 5:case"end":return e.stop()}}),e)})))()}},mounted:function(){var t=this;return i(r().mark((function e(){return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.edit();case 1:case"end":return e.stop()}}),e)})))()},beforeRouteUpdate:function(t,e,a){this.id=t.params.id,this.edit(),a()}};var n=a(93379),m=a.n(n),b=a(22296),f={insert:"head",singleton:!1};m()(b.Z,f);b.Z.locals;const u=(0,a(51900).Z)(c,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"p_wrap"},[a("h3",[t._v("회원 정보 수정")]),t._v(" "),a("b-card",{staticClass:"ctrl",attrs:{"no-body":""}},[a("b-container",[a("b-row",[a("b-col",[a("div",{staticClass:"type_icon"},[a("b-icon-tags-fill"),t._v(t._s(t.frm.id))],1),t._v(" "),a("div",{staticClass:"type_icon"},[a("b-icon-calendar2-date-fill"),t._v(t._s(t._f("formatDate")(t.frm.created_at)))],1)]),t._v(" "),a("b-col",{staticClass:"text-right"},[a("b-button-group",{attrs:{size:"sm"}},[a("b-button",{attrs:{variant:"light",to:{name:"adm_user"}}},[a("b-icon-list-ol"),t._v("목록")],1),t._v(" "),a("b-button",{attrs:{variant:"primary"},on:{click:t.update}},[a("b-icon-pencil-square"),t._v("수정 완료")],1),t._v(" "),a("b-button",{attrs:{variant:"info"},on:{click:function(e){t.isModalViewed=!t.isModalViewed}}},[t._v("마일리지")])],1)],1)],1)],1)],1),t._v(" "),a("b-card",{staticClass:"adform"},[a("b-container",[a("b-row",[a("b-col",{staticClass:"tit"},[t._v("회원정보")])],1),t._v(" "),a("b-row",[a("b-col",{staticClass:"label"},[t._v("회원 유형")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-select",{attrs:{id:"group"},model:{value:t.frm.group,callback:function(e){t.$set(t.frm,"group",e)},expression:"frm.group"}},t._l(t.frm.option.group,(function(e,s){return a("b-form-select-option",{key:s,attrs:{value:s}},[t._v(t._s(e))])})),1)],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("회원등급")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-select",{attrs:{id:"level"},model:{value:t.frm.level,callback:function(e){t.$set(t.frm,"level",e)},expression:"frm.level"}},[a("b-form-select-option",{attrs:{value:"0"}}),t._v(" "),t._l(t.frm.option.grade,(function(e,s){return a("b-form-select-option",{key:s,attrs:{value:s}},[t._v(t._s(e))])}))],2)],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("담당자")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-select",{attrs:{id:"mng"},model:{value:t.frm.mng,callback:function(e){t.$set(t.frm,"mng",e)},expression:"frm.mng"}},[a("b-form-select-option",{attrs:{value:"0"}}),t._v(" "),t._l(t.frm.mng_list,(function(e,s){return a("b-form-select-option",{key:s,attrs:{value:e.id}},[t._v(t._s(e.name))])}))],2)],1)],1),t._v(" "),a("b-row",[a("b-col",{staticClass:"label"},[t._v("이름")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-input",{model:{value:t.frm.name,callback:function(e){t.$set(t.frm,"name",e)},expression:"frm.name"}})],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("이메일")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-input",{model:{value:t.frm.email,callback:function(e){t.$set(t.frm,"email",e)},expression:"frm.email"}})],1),t._v(" "),a("b-col",{staticClass:"checkbox01"},[a("b-form-checkbox",{attrs:{id:"receive_mail",value:"Y","unchecked-value":"N",size:"lg"},model:{value:t.frm.receive_mail,callback:function(e){t.$set(t.frm,"receive_mail",e)},expression:"frm.receive_mail"}},[t._v("\n                        수신\n                        "),"Y"==t.frm.receive_mail?a("b",[t._v("동의")]):a("b",[t._v("안함")])])],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("성별")]),t._v(" "),a("b-col",{staticClass:"type01"},[a("b-form-checkbox",{attrs:{button:"",size:"sm",value:"male","unchecked-value":"female","button-variant":"male"==t.frm.sex?"primary":"danger"},model:{value:t.frm.sex,callback:function(e){t.$set(t.frm,"sex",e)},expression:"frm.sex"}},["male"==t.frm.sex?[t._v("남")]:[t._v("여")],t._v("자\n                    ")],2)],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("생년월일")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-input-group",{attrs:{size:"sm"}},[a("b-form-input",{attrs:{id:"birth",placeholder:"YYYY-MM-DD",autocomplete:"off",formatter:t.formatDate,required:""},model:{value:t.frm.birth,callback:function(e){t.$set(t.frm,"birth",e)},expression:"frm.birth"}}),t._v(" "),a("b-input-group-append",[a("b-form-datepicker",{attrs:{size:"sm","button-only":"",right:""},model:{value:t.frm.birth,callback:function(e){t.$set(t.frm,"birth",e)},expression:"frm.birth"}})],1)],1)],1)],1),t._v(" "),a("b-row",[a("b-col",{staticClass:"label"},[t._v("일반전화")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-input",{model:{value:t.frm.tel,callback:function(e){t.$set(t.frm,"tel",e)},expression:"frm.tel"}})],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("휴대폰")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-input",{model:{value:t.frm.hp,callback:function(e){t.$set(t.frm,"hp",e)},expression:"frm.hp"}})],1),t._v(" "),a("b-col",{staticClass:"checkbox01"},[a("b-form-checkbox",{attrs:{id:"receive_sms",value:"Y","unchecked-value":"N",size:"lg"},model:{value:t.frm.receive_sms,callback:function(e){t.$set(t.frm,"receive_sms",e)},expression:"frm.receive_sms"}},[t._v("\n                        수신\n                        "),"Y"==t.frm.receive_sms?a("b",[t._v("동의")]):a("b",[t._v("안함")])])],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("팩스")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-input",{model:{value:t.frm.fax,callback:function(e){t.$set(t.frm,"fax",e)},expression:"frm.fax"}})],1)],1),t._v(" "),a("b-row",[a("b-col",[a("hr")])],1),t._v(" "),a("b-row",[a("b-col",{staticClass:"label"},[t._v("직업")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-select",{model:{value:t.frm.job,callback:function(e){t.$set(t.frm,"job",e)},expression:"frm.job"}},t._l(t.frm.option.job,(function(e,s){return a("b-form-select-option",{key:s,attrs:{value:e}},[t._v(t._s(e))])})),1)],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("직장/학교명")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-input",{model:{value:t.frm.office,callback:function(e){t.$set(t.frm,"office",e)},expression:"frm.office"}})],1),t._v(" "),a("b-col",{staticClass:"label short"},[t._v("부서/학과/"),a("br"),t._v("연구실명")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-input",{model:{value:t.frm.department,callback:function(e){t.$set(t.frm,"department",e)},expression:"frm.department"}})],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("직급/학년")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-input",{model:{value:t.frm.grade,callback:function(e){t.$set(t.frm,"grade",e)},expression:"frm.grade"}})],1),t._v(" "),a("b-col",{staticClass:"label short"},[t._v("지도/담당교수")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-input",{model:{value:t.frm.tutor,callback:function(e){t.$set(t.frm,"tutor",e)},expression:"frm.tutor"}})],1),t._v(" "),a("b-col",{staticClass:"label short"},[t._v("추천인 Email")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-input",{model:{value:t.frm.offer,callback:function(e){t.$set(t.frm,"offer",e)},expression:"frm.offer"}})],1),t._v(" "),a("b-col",{staticClass:"label short"},[t._v("추천인연구실")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-input",{model:{value:t.frm.offer_lab,callback:function(e){t.$set(t.frm,"offer_lab",e)},expression:"frm.offer_lab"}})],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("가입경로")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-input",{model:{value:t.frm.join_route,callback:function(e){t.$set(t.frm,"join_route",e)},expression:"frm.join_route"}})],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("관심분야")]),t._v(" "),a("b-col",{staticClass:"type11"},[t._v("\n                    "+t._s(t.frm.interest)),t.frm.interest_etc?[t._v(", "+t._s(t.frm.interest_etc))]:t._e()],2)],1)],1)],1),t._v(" "),t.frm.is_admin?a("b-card",{staticClass:"adform"},[a("b-container",[a("b-row",[a("b-col",{staticClass:"tit"},[t._v("관리자 정보")])],1),t._v(" "),a("b-row",[a("b-col",[a("b-form-checkbox",{attrs:{switch:"",size:"lg",value:"Y","unchecked-value":"N"},model:{value:t.frm.user_mng.um_status,callback:function(e){t.$set(t.frm.user_mng,"um_status",e)},expression:"frm.user_mng.um_status"}},["N"==t.frm.user_mng.um_status?a("b",[t._v("비")]):t._e(),t._v("활성\n                    ")])],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("직위")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-select",{attrs:{id:"um_position"},model:{value:t.frm.user_mng.um_position,callback:function(e){t.$set(t.frm.user_mng,"um_position",e)},expression:"frm.user_mng.um_position"}},t._l(t.frm.mng_info.position,(function(e,s){return a("b-form-select-option",{key:s,attrs:{value:s}},[t._v(t._s(e))])})),1)],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("소속팀")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-select",{attrs:{id:"um_group"},model:{value:t.frm.user_mng.um_group,callback:function(e){t.$set(t.frm.user_mng,"um_group",e)},expression:"frm.user_mng.um_group"}},t._l(t.frm.mng_info.group,(function(e,s){return a("b-form-select-option",{key:s,attrs:{value:s}},[t._v(t._s(e))])})),1)],1),t._v(" "),a("b-col",{staticClass:"label"},[t._v("직책")]),t._v(" "),a("b-col",{staticClass:"type02"},[a("b-form-select",{attrs:{id:"um_responsibility"},model:{value:t.frm.user_mng.um_responsibility,callback:function(e){t.$set(t.frm.user_mng,"um_responsibility",e)},expression:"frm.user_mng.um_responsibility"}},[a("b-form-select-option",{attrs:{value:null}},[t._v("◖없음◗")]),t._v(" "),t._l(t.frm.mng_info.responsibility,(function(e,s){return a("b-form-select-option",{key:s,attrs:{value:s}},[t._v(t._s(e))])}))],2)],1)],1)],1)],1):t._e(),t._v(" "),a("b-card",[a("b-container",[a("b-row",[a("b-col",{staticClass:"tit"},[t._v("최근 주문 내역")])],1),t._v(" "),a("Order",{staticClass:"cmain",attrs:{list:t.order,config:t.order_config,mng_off:t.mng_off}})],1)],1),t._v(" "),a("b-card",[a("b-container",[a("b-row",[a("b-col",{staticClass:"tit"},[t._v("최근 견적 내역")])],1),t._v(" "),a("Estimate",{staticClass:"cmain",attrs:{list:t.estimate}})],1)],1),t._v(" "),a("transition",{attrs:{name:"modal"}},[t.isModalViewed?a("Modal",{attrs:{max_width:700},on:{"close-modal":function(e){t.isModalViewed=!1}}},[a("template",{slot:"header"},[t._v("마일리지 목록")]),t._v(" "),a("Mileage")],2):t._e()],1)],1)}),[],!1,null,"78dbb6ba",null).exports}}]);