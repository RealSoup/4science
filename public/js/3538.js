"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3538],{18918:(t,r,o)=>{o.d(r,{Z:()=>n});var e=o(23645),a=o.n(e)()((function(t){return t[1]}));a.push([t.id,"#AdmBoardEdit .row{margin-bottom:20px}#AdmBoardEdit .row .col span{margin-right:1rem}#AdmBoardEdit .row .col span>svg{margin-right:.5rem}",""]);const n=a},63538:(t,r,o)=>{o.r(r),o.d(r,{default:()=>l});var e=o(87757),a=o.n(e),n=o(44670);function i(t,r,o,e,a,n,i){try{var s=t[n](i),c=s.value}catch(t){return void o(t)}s.done?r(c):Promise.resolve(c).then(e,a)}function s(t){return function(){var r=this,o=arguments;return new Promise((function(e,a){var n=t.apply(r,o);function s(t){i(n,e,a,s,c,"next",t)}function c(t){i(n,e,a,s,c,"throw",t)}s(void 0)}))}}const c={name:"AdmBoardEdit",components:{validation:function(){return o.e(3281).then(o.bind(o,3281))}},data:function(){return{bo_cd:this.$route.params.bo_cd,bo_id:this.$route.params.bo_id,board:{config:{}},frm:{}}},computed:{answer_subject:{get:function(){return"◖답변◗ ".concat(this.board.bo_subject)},set:function(t){this.frm.bo_subject=t}}},methods:{create:function(){var t=this;return s(a().mark((function r(){var o;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,n.Z.get("/api/admin/board/".concat(t.bo_cd,"/edit/").concat(t.bo_id));case 2:(o=r.sent)&&200===o.status&&(t.board=o.data,t.frm.bo_subject="◖답변◗ ".concat(t.board.bo_subject),"gd_inquiry"==t.bo_cd&&(t.frm.bo_gd_id=t.board.bo_gd_id));case 4:case"end":return r.stop()}}),r)})))()},store:function(){var t=this;return s(a().mark((function r(){var o;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,n.Z.post("/api/admin/board/".concat(t.bo_cd,"/answer/").concat(t.bo_id),t.frm);case 2:(o=r.sent)&&200===o.status&&t.$router.push({name:"adm_board_index"});case 4:case"end":return r.stop()}}),r)})))()}},beforeRouteUpdate:function(t,r,o){this.bo_id=t.params.bo_id,this.bo_cd=t.params.bo_cd,this.create(),o()},mounted:function(){var t=this;return s(a().mark((function r(){return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:t.create();case 1:case"end":return r.stop()}}),r)})))()}};var d=o(93379),b=o.n(d),u=o(18918),_={insert:"head",singleton:!1};b()(u.Z,_);u.Z.locals;const l=(0,o(51900).Z)(c,(function(){var t=this,r=t.$createElement,o=t._self._c||r;return o("form",{ref:"form",attrs:{id:"AdmBoardEdit"},on:{submit:function(r){return r.preventDefault(),t.update.apply(null,arguments)}}},[o("h3",[t._v("수정")]),t._v(" "),o("b-card",{staticClass:"shadow mb-2 sticky-top p-2",attrs:{"no-body":""}},[o("b-container",{attrs:{fluid:""}},[o("b-row",[o("b-col",{attrs:{cols:"12",sm:"6"}}),t._v(" "),o("b-col",{staticClass:"text-right",attrs:{cols:"12",sm:"6"}},[o("b-button-group",{attrs:{size:"sm"}},[o("b-button",{attrs:{size:"sm",variant:"light",to:{name:"adm_board_index"}}},[t._v("목록")]),t._v(" "),o("b-button",{attrs:{size:"sm",variant:"primary"},on:{click:t.store}},[t._v("답변 완료")])],1)],1)],1)],1)],1),t._v(" "),o("b-card",{staticClass:"shadow mt-3"},[o("b-container",[o("b-row",[o("b-col",[o("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{title:"작성번호"}},[o("font-awesome-icon",{attrs:{icon:"tags"}}),t._v(t._s(t.board.bo_id))],1),t._v(" "),o("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{title:"작성자"}},[t.board.created_id?o("b-link",{staticClass:"col",attrs:{to:{name:"adm_user_edit",params:{id:t.board.created_id}}}},[o("font-awesome-icon",{attrs:{icon:"user"}}),t._v(t._s(t.board.bo_writer)+"\r\n                        ")],1):t._e()],1),t._v(" "),o("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{title:"작성일"}},[o("b-icon-calendar-date"),t._v(t._s(t._f("formatDate")(t.board.created_at)))],1)])],1),t._v(" "),t.board.add_file&&t.board.add_file.length?o("b-row",[o("b-col",[o("b-icon",{attrs:{icon:"file-earmark-arrow-down-fill"}}),t._v(" "),t._l(t.board.add_file,(function(r){return[o("span",{key:r.fi_id,staticClass:"piece",on:{click:function(o){return t.fileDown(r.down_path,r.fi_original)}}},[t._v(t._s(r.fi_original))])]}))],2)],1):t._e(),t._v(" "),o("b-row",[o("b-col",[o("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"제목",expression:"'제목'"}]},[o("b-icon-chat-right-quote"),t._v(t._s(t.board.bo_subject))],1)])],1),t._v(" "),o("b-row",[o("b-col",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"내용",expression:"'내용'"}]},[o("p",{domProps:{innerHTML:t._s(t.nl2br(t.board.bo_content))}})])],1),t._v(" "),o("b-row",[o("b-col",[t.board.img_file&&t.board.img_file.length?[t._l(t.board.img_file,(function(t,r){return o("img",{key:r,staticClass:"me-auto ms-auto d-block",attrs:{src:t.path}})})),t._v(" "),o("hr")]:t._e()],2)],1)],1)],1),t._v(" "),o("b-card",{staticClass:"shadow mt-3"},[o("b-container",[o("b-row",[o("b-col",{staticClass:"awesome_p"},[o("b-form-input",{attrs:{id:"bo_subject",size:"lg",required:""},model:{value:t.answer_subject,callback:function(r){t.answer_subject=r},expression:"answer_subject"}}),t._v(" "),o("label",{attrs:{for:"bo_subject"}},[t._v("제목")]),t._v(" "),o("validation",{attrs:{error:t.$store.state.error.validations.bo_subject}})],1)],1),t._v(" "),o("b-row",[o("b-col",{staticClass:"awesome_p"},[o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.frm.bo_content,expression:"frm.bo_content"}],attrs:{id:"'bo_content",rows:"8",required:""},domProps:{value:t.frm.bo_content},on:{input:function(r){r.target.composing||t.$set(t.frm,"bo_content",r.target.value)}}}),t._v(" "),o("label",{attrs:{for:"bo_content"}},[t._v("내용")]),t._v(" "),o("validation",{attrs:{error:t.$store.state.error.validations.bo_content}})],1)],1)],1)],1)],1)}),[],!1,null,null,null).exports}}]);