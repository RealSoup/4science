"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6898],{9492:(t,o,e)=>{e.d(o,{Z:()=>i});var a=e(3645),n=e.n(a)()((function(t){return t[1]}));n.push([t.id,".bo_index[data-v-d90e42d8]{max-width:1000px}.bo_index .bo_list .row[data-v-d90e42d8]{align-items:baseline;margin-bottom:10px}.bo_index .bo_list .bo_head .col[data-v-d90e42d8]{background:#555;color:#fff;font-weight:900;padding:10px;text-align:center}.bo_index .bo_list .bo_body .col[data-v-d90e42d8]{padding:3px;text-align:center}.bo_index .bo_list .bo_body .col[data-v-d90e42d8]:first-of-type,.bo_index .bo_list .bo_head .col[data-v-d90e42d8]:first-of-type{flex:0 0 10%;max-width:10%}.bo_index .bo_list .bo_body .col:nth-of-type(2) button[data-v-d90e42d8]{text-align:left}.bo_index .bo_list .bo_body .col[data-v-d90e42d8]:nth-of-type(3),.bo_index .bo_list .bo_body .col[data-v-d90e42d8]:nth-of-type(4),.bo_index .bo_list .bo_body .col[data-v-d90e42d8]:nth-of-type(5),.bo_index .bo_list .bo_head .col[data-v-d90e42d8]:nth-of-type(3),.bo_index .bo_list .bo_head .col[data-v-d90e42d8]:nth-of-type(4),.bo_index .bo_list .bo_head .col[data-v-d90e42d8]:nth-of-type(5){flex:0 0 7%;max-width:7%}.bo_index .bo_list .bo_body .answer[data-v-d90e42d8]{display:flex;flex:0 0 100%;justify-content:flex-end;max-width:100%;text-align:left}.bo_index .bo_list .bo_body .answer .collapse[data-v-d90e42d8]{flex:0 0 90%;margin-bottom:20px;max-width:90%}.bo_index .bo_list .bo_body .answer .collapse .card-body[data-v-d90e42d8]{background:#d8f1f5}.bo_index .bo_list .bo_body .answer .collapse .card-body div[data-v-d90e42d8]{margin-bottom:20px}.bo_index .bo_list .bo_body .answer .collapse .card-body div span[data-v-d90e42d8]{margin-right:1rem}.bo_index .bo_list .bo_body .answer .collapse .card-body div span>svg[data-v-d90e42d8]{margin-right:.5rem}",""]);const i=n},6898:(t,o,e)=>{e.r(o),e.d(o,{default:()=>v});var a=e(7757),n=e.n(a),i=e(4670);function d(t,o,e,a,n,i,d){try{var s=t[i](d),r=s.value}catch(t){return void e(t)}s.done?o(r):Promise.resolve(r).then(a,n)}function s(t){return function(){var o=this,e=arguments;return new Promise((function(a,n){var i=t.apply(o,e);function s(t){d(i,a,n,s,r,"next",t)}function r(t){d(i,a,n,s,r,"throw",t)}s(void 0)}))}}const r={name:"ShopGoodsInquiry",components:{Modal:function(){return e.e(2201).then(e.bind(e,2201))},BoCreate:function(){return e.e(2936).then(e.bind(e,2936))}},props:["bo_cd"],data:function(){return{isModalViewed:!1,frm:{page:0,bo_gd_id:this.$route.params.gd_id,limit:5},list:{},config:{},bo:{bo_gd_id:this.$route.params.gd_id}}},methods:{index:function(){var t=arguments,o=this;return s(n().mark((function e(){var a,d;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.length>0&&void 0!==t[0]?t[0]:1,o.frm.page=a,e.next=4,i.Z.get("/api/board/".concat(o.bo_cd),{params:o.frm});case 4:(d=e.sent)&&200===d.status&&(o.list=d.data.list,o.config=d.data.config);case 6:case"end":return e.stop()}}),e)})))()},create:function(){this.isModalViewed=!0},store:function(){var t=this;return s(n().mark((function o(){var e;return n().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,i.Z.post("/api/board/".concat(t.bo_cd,"/store"),t.bo);case 2:(e=o.sent)&&200===e.status&&(t.isModalViewed=!1,t.index());case 4:case"end":return o.stop()}}),o)})))()},getContent:function(t){return t.split("\n").join("<br>")}},mounted:function(){this.index()}};var b=e(3379),_=e.n(b),l=e(9492),c={insert:"head",singleton:!1};_()(l.Z,c);l.Z.locals;const v=(0,e(1900).Z)(r,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("b-container",{staticClass:"bo_index"},[e("b-row",[e("b-col",[e("h4",[t._v(t._s(t.config.name))])])],1),t._v(" "),e("b-row",[e("b-col",{staticClass:"bo_list"},[e("b-row",{staticClass:"bo_head"},[e("b-col",[t._v("번호")]),t._v(" "),e("b-col",[t._v("제목")]),t._v(" "),e("b-col",[t._v("답변상태")]),t._v(" "),e("b-col",[t._v("작성자")]),t._v(" "),e("b-col",[t._v("작성일")])],1),t._v(" "),t._l(t.list.data,(function(o){return e("b-row",{key:o.bo_id,staticClass:"bo_body"},[e("b-col",[t._v(t._s(o.bo_id))]),t._v(" "),e("b-col",[e("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle",value:"collapse_"+o.bo_id,expression:"`collapse_${bo.bo_id}`"}],attrs:{block:"",variant:"outline-secondary"}},[t._v(t._s(o.bo_subject))])],1),t._v(" "),e("b-col",[o.answer?e("b-badge",{attrs:{variant:"success"}},[t._v("답변완료")]):e("b-badge",[t._v("답변대기")])],1),t._v(" "),e("b-col",[t._v(t._s(o.bo_writer))]),t._v(" "),e("b-col",[t._v(t._s(t._f("formatDate")(o.created_at)))]),t._v(" "),e("b-col",{staticClass:"answer"},[e("b-collapse",{attrs:{id:"collapse_"+o.bo_id}},[e("b-card",[e("div",[e("p",[e("b",[t._v("Q")]),t._v(". "+t._s(o.bo_subject))]),t._v(" "),e("p",[t._v(t._s(o.bo_content))])]),t._v(" "),e("hr"),t._v(" "),o.answer?e("div",[e("p",[e("b",[t._v("A")]),t._v(".\r\n                                    "),e("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{title:"작성번호"}},[e("font-awesome-icon",{attrs:{icon:"tags"}}),t._v(t._s(o.answer.bo_id))],1),t._v(" "),e("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{title:"작성자"}},[e("font-awesome-icon",{attrs:{icon:"user"}}),t._v(t._s(o.answer.bo_writer))],1),t._v(" "),e("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{title:"작성일"}},[e("b-icon-calendar-date"),t._v(t._s(t._f("formatDate")(o.answer.created_at)))],1)]),t._v(" "),e("div",{staticClass:"card-text",domProps:{innerHTML:t._s(t.getContent(o.answer.bo_content))}})]):t._e()])],1)],1)],1)}))],2)],1),t._v(" "),e("b-row",[e("b-col",{staticClass:"text-right"},[e("b-button",{on:{click:t.create}},[t._v("문의하기")]),t._v(" "),e("transition",{attrs:{name:"modal"}},[t.isModalViewed?e("Modal",{attrs:{max_width:700},on:{"close-modal":function(o){t.isModalViewed=!1}}},[e("BoCreate",{on:{store:t.store},model:{value:t.bo,callback:function(o){t.bo=o},expression:"bo"}})],1):t._e()],1)],1)],1),t._v(" "),e("pagination",{attrs:{data:t.list,align:"center"},on:{"pagination-change-page":t.index}})],1)}),[],!1,null,"d90e42d8",null).exports}}]);