"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6431],{81174:(a,t,e)=>{e.d(t,{Z:()=>d});var n=e(1519),i=e.n(n)()((function(a){return a[1]}));i.push([a.id,".row .col[data-v-df0b541a]:first-child{flex:0 0 8%;max-width:8%}.row .col[data-v-df0b541a]:first-child,.row .col[data-v-df0b541a]:nth-child(2){border-right:1px solid #ccc}.row .col[data-v-df0b541a]:nth-child(3){flex:0 0 10%;max-width:10%}.row .col[data-v-df0b541a]:nth-child(4){border-right:1px solid #ccc;flex:0 0 7%;max-width:7%}.row .col[data-v-df0b541a]:nth-child(5){flex:0 0 6%;max-width:6%}.row .col[data-v-df0b541a]:nth-child(6){border-right:1px solid #ccc;flex:0 0 9%;max-width:9%}.row .col[data-v-df0b541a]:nth-child(7){flex:0 0 20%;max-width:20%}.row .col:nth-child(5) .badge[data-v-df0b541a]{padding:.4rem 0;width:3.8rem}.row .col i[data-v-df0b541a]{font-style:normal}.body .col[data-v-df0b541a]:nth-child(2){cursor:pointer;padding-left:2%;text-align:left}.body .col .eq_name[data-v-df0b541a]{line-height:1rem}.body .col .eq_name .badgetag[data-v-df0b541a]{line-height:1.5}.er_box[data-v-df0b541a]{align-items:center;display:flex;flex-wrap:wrap;justify-content:space-between}.er_box span[data-v-df0b541a]{text-align:center}.er_box span[data-v-df0b541a]:nth-child(3n+1){flex:0 0 30%;max-width:30%}.er_box span[data-v-df0b541a]:nth-child(3n+2){flex:0 0 24%;max-width:24%}.er_box span[data-v-df0b541a]:nth-child(3n+3){flex:0 0 40%;max-width:40%}.er_box span.btn[data-v-df0b541a]{background-color:#fff!important;border-width:3px;padding:.18rem 0}.er_box span.mint[data-v-df0b541a]{color:#00a1cb!important}.er_box span.orange[data-v-df0b541a]{color:#f18d04!important}.er_box span.gray[data-v-df0b541a]{background-color:#aaa!important;color:#fff}.er_box span.not_fir[data-v-df0b541a]{margin-top:.25rem}@media (max-width:992px){.p_wrap .cmain .body[data-v-df0b541a]{border-bottom:3px solid #333}.p_wrap .cmain .body .col[data-v-df0b541a]{line-height:24px;padding:.1rem 0}.row .col[data-v-df0b541a]:first-child{flex:0 0 20%;max-width:20%}.row .col[data-v-df0b541a]:nth-child(2){flex:0 0 60%;max-width:60%}.row .col[data-v-df0b541a]:nth-child(3),.row .col[data-v-df0b541a]:nth-child(4){flex:0 0 20%;max-width:20%}.row .col[data-v-df0b541a]:nth-child(4){border-width:0}.row .col[data-v-df0b541a]:nth-child(5){flex:0 0 20%;max-width:20%}.row .col[data-v-df0b541a]:nth-child(6){border-width:0;flex:0 0 60%;max-width:60%;padding-left:10px;text-align:left}.row .col[data-v-df0b541a]:nth-child(7){background:#efefef;flex:0 0 100%;max-width:100%}.er_box span[data-v-df0b541a]:nth-child(3n+1){flex:0 0 48%;max-width:48%;text-align:right}.er_box span[data-v-df0b541a]:nth-child(3n+2){flex:0 0 24%;max-width:24%}.er_box span[data-v-df0b541a]:nth-child(3n+3){flex:0 0 18%;max-width:18%}}",""]);const d=i},46431:(a,t,e)=>{e.r(t),e.d(t,{default:()=>l});const n={name:"AdmEstimateIndexList",components:{"sub-string":function(){return e.e(6396).then(e.bind(e,46396))}},props:["list","mng_off"],filters:{eqStep:function(a){var t="";switch(a){case"DONOT":t="미처리";break;case"DOING":t="처리중";break;case"DONE":t="완료";break;case"CANCEL":t="취소"}return t}},methods:{exeWinPop:function(a){this.$emit("exe-win-pop",a)}}};var i=e(93379),d=e.n(i),o=e(81174),s={insert:"head",singleton:!1};d()(o.Z,s);o.Z.locals;const l=(0,e(51900).Z)(n,(function(){var a=this,t=a._self._c;return t("div",[t("b-row",{staticClass:"head list m_hide"},[t("b-col",[a._v("No.")]),a._v(" "),t("b-col",[a._v("요청내용")]),a._v(" "),t("b-col",[a._v("요청자")]),a._v(" "),t("b-col",[a._v("요청일")]),a._v(" "),t("b-col",[a._v("진행현황")]),a._v(" "),t("b-col",[a._v("담당자")]),a._v(" "),t("b-col",{staticClass:"er_box"},[t("span",[a._v("견적서번호")]),a._v(" "),t("span",[a._v("견적서")]),a._v(" "),t("span",[a._v("작성일")])])],1),a._v(" "),a._l(a.list,(function(e){return t("b-row",{key:e.eq_id,staticClass:"body list"},[t("b-col",[a._v(a._s(e.eq_id)+".")]),a._v(" "),t("b-col",{staticClass:"eq_tit",on:{click:function(t){return a.exeWinPop("/admin/shop/estimate/req/".concat(e.eq_id))}}},[e.eq_title?t("b",{domProps:{innerHTML:a._s(e.eq_title)}}):t("sub-string",{attrs:{width:650},model:{value:e.eq_content,callback:function(t){a.$set(e,"eq_content",t)},expression:"row.eq_content"}}),a._v(" "),"TEMP"==e.eq_type?t("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"임의견적",expression:"'임의견적'"}],staticClass:"badgetag yellow"},[a._v("임")]):"REREQ"==e.eq_type?t("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"재견적요청",expression:"'재견적요청'"}],staticClass:"badgetag plum"},[a._v("재")]):"CUS"==e.eq_type?t("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"주문제작",expression:"'주문제작'"}],staticClass:"badgetag mint"},[a._v("주")]):a._e()],1),a._v(" "),t("b-col",[t("div",{staticClass:"eq_name"},[!e.user||11!=e.user.level&&12!=e.user.level?a._e():t("span",{staticClass:"badgetag d_blue d-none d-lg-inline-block"},[a._v("딜")]),a._v(" "),t("sub-string",{attrs:{width:120},model:{value:e.eq_name,callback:function(t){a.$set(e,"eq_name",t)},expression:"row.eq_name"}}),a._v(" "),t("br",{staticClass:"d-none d-lg-block"}),a._v(" "),e.user&&e.user.mng?t("b-badge",{staticClass:"orange d-none d-lg-inline-block"},[a._v(a._s(a.mng_off[e.user.mng].name))]):a._e()],1)]),a._v(" "),t("b-col",[t("i",{staticClass:"d-inline-block d-lg-none"},[a._v(a._s(a._f("formatDate")(e.created_at)))]),a._v(" "),t("i",{staticClass:"d-none d-lg-inline-block"},[a._v(a._s(a._f("formatDate_MM_DD_HH:mm")(e.created_at)))])]),a._v(" "),t("b-col",["DONOT"===e.eq_step?t("span",{staticClass:"nametag plum"},[a._v(a._s(a._f("eqStep")(e.eq_step)))]):"DOING"===e.eq_step?t("span",{staticClass:"nametag mint"},[a._v(a._s(a._f("eqStep")(e.eq_step)))]):"DONE"===e.eq_step?t("span",{staticClass:"nametag gray"},[a._v(a._s(a._f("eqStep")(e.eq_step)))]):"CANCEL"===e.eq_step?t("span",{staticClass:"nametag yellow"},[a._v(a._s(a._f("eqStep")(e.eq_step)))]):a._e()]),a._v(" "),t("b-col",[e.eq_mng_nm?t("span",[a._v(a._s(e.eq_mng_nm))]):a._e()]),a._v(" "),t("b-col",{staticClass:"er_box"},[0==e.estimate_reply.length?[t("span"),a._v(" "),t("span",{staticClass:"btn nametag white",on:{click:function(t){return a.exeWinPop("/admin/shop/estimate/create?eq_id=".concat(e.eq_id))}}},[a._v("견적서 작성")]),a._v(" "),t("span")]:a._l(e.estimate_reply,(function(e,n){return[t("span",{key:"i".concat(e.er_id)},[a._v(a._s(e.er_id)+".")]),a._v(" "),0==e.er_step?[t("span",{key:"b".concat(e.er_id),staticClass:"btn nametag gray",class:{not_fir:0!==n},on:{click:function(t){return a.exeWinPop("/admin/shop/estimate/".concat(e.er_id,"/edit"))}}},[a._v("임시저장")])]:[0===n?t("span",{key:"b".concat(e.er_id),staticClass:"btn nametag mint",on:{click:function(t){return a.exeWinPop("/admin/shop/estimate/reply/".concat(e.er_id))}}},[a._v("견적서")]):t("span",{key:"b".concat(e.er_id),staticClass:"btn nametag orange not_fir",on:{click:function(t){return a.exeWinPop("/admin/shop/estimate/reply/".concat(e.er_id))}}},[a._v("재견적서")])],a._v(" "),t("span",{key:"d".concat(e.er_id)},[t("i",{staticClass:"d-inline-block d-lg-none"},[a._v(a._s(a._f("formatDate")(e.created_at)))]),a._v(" "),t("i",{staticClass:"d-none d-lg-inline-block"},[a._v(a._s(a._f("formatDate_MM_DD_HH:mm")(e.created_at)))])])]}))],2)],1)}))],2)}),[],!1,null,"df0b541a",null).exports}}]);