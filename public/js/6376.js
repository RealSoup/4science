"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6376],{46091:(o,e,a)=>{a.d(e,{Z:()=>d});var t=a(23645),r=a.n(t)()((function(o){return o[1]}));r.push([o.id,".p_wrap[data-v-eae4dd20]{margin-top:4rem}.p_wrap h4[data-v-eae4dd20]{font-size:1.6rem;font-weight:700;margin-bottom:1rem}.p_wrap .row .col .box[data-v-eae4dd20]{background-color:#eff0f2;border-radius:1rem;border-style:solid;border-width:5px;padding:.75rem 1.5rem}.p_wrap .row .left .box[data-v-eae4dd20]{border-color:#458cca}.p_wrap .row .right .box[data-v-eae4dd20]{border-color:#51b948}.p_wrap .row .col .box .row[data-v-eae4dd20]{margin:0}.p_wrap .row .col .box .top .col[data-v-eae4dd20]{align-items:center;display:flex;font-size:1.25rem;font-weight:600;justify-content:center;padding:.65rem 0 .45rem;text-align:center}.p_wrap .row .col .box .top .col span[data-v-eae4dd20]{font-size:2.53rem;margin-left:2rem}.p_wrap .row .col .box .top .col[data-v-eae4dd20]:first-child{border-right:1px solid #c2c2c2}.p_wrap .row .left .box .top .col span[data-v-eae4dd20]{color:#458ccc}.p_wrap .row .right .box .top .col span[data-v-eae4dd20]{color:#51b948}.p_wrap .row .col .box .body[data-v-eae4dd20]{margin-top:.5rem}.p_wrap .row .left .box .body[data-v-eae4dd20]{border-top:1px solid #c2c2c2;margin-bottom:1.25rem;padding-top:1.7rem}.p_wrap .row .left .box .body .col[data-v-eae4dd20]{padding:0}.p_wrap .row .left .box .body .col[data-v-eae4dd20]:not(:first-child){padding-left:5px}.p_wrap .row .left .box .body .col[data-v-eae4dd20]:not(:last-child){padding-right:5px}.p_wrap .row .left .box .body .col span[data-v-eae4dd20]{display:block;text-align:center}.p_wrap .row .left .box .body .col span[data-v-eae4dd20]:first-child{background-color:#fff;border-radius:1rem;font-size:1.9rem;font-weight:600;padding:4.2rem 0}.p_wrap .row .left .box .body .col span[data-v-eae4dd20]:nth-child(2){font-weight:800;margin-top:1rem}.p_wrap .row .left .box .body .col span[data-v-eae4dd20]:nth-child(3){font-size:.9rem;margin-top:.15rem}.p_wrap .row .right .box[data-v-eae4dd20]{padding-bottom:0}.p_wrap .row .right .box .body[data-v-eae4dd20]{background:#fff;border-radius:1rem;margin-left:-1.5rem;margin-right:-1.5rem;padding-bottom:1.5rem}.p_wrap .row .right .box .body .head[data-v-eae4dd20]{background-color:#a0a0a0;color:#fff}.p_wrap .row .right .box .body .row .col[data-v-eae4dd20]{padding:0}.p_wrap .row .right .box .body .ps[data-v-eae4dd20]{background-color:#fff;height:239px}.p_wrap .row .right .box .body .row .col[data-v-eae4dd20]{padding:.56rem .53rem .5rem;text-align:center}.p_wrap .row .right .box .body .row .col[data-v-eae4dd20]:not(:last-child){border-right:1px solid #c2c2c2}.p_wrap .row .right .box .body .row .col[data-v-eae4dd20]:first-child{flex:0 0 14%;max-width:14%}.p_wrap .row .right .box .body .row .col[data-v-eae4dd20]:nth-child(2){flex:0 0 24%;max-width:24%}.p_wrap .row .right .box .body .row .col[data-v-eae4dd20]:nth-child(3){flex:0 0 12.1%;max-width:12.1%}.p_wrap .row .right .box .body .list .col[data-v-eae4dd20]:nth-child(4){word-wrap:normal;overflow:hidden;text-align:left;text-overflow:ellipsis;vertical-align:bottom;white-space:nowrap}.p_wrap .row .right .box .body .list .col[data-v-eae4dd20]{font-size:.9rem;padding:.99rem .53rem .8rem}.p_wrap .row .right .box .body .ps[data-v-eae4dd20] .ps__rail-y{background-color:#eee;cursor:pointer;opacity:.9;z-index:1}.p_wrap .row .right .box .body .ps[data-v-eae4dd20] .ps__rail-y>.ps__thumb-y{background-color:#438dcc;width:11px}",""]);const d=r},56376:(o,e,a)=>{a.r(e),a.d(e,{default:()=>_});var t=a(87757),r=a.n(t),d=a(44670);function n(o,e,a,t,r,d,n){try{var i=o[d](n),s=i.value}catch(o){return void a(o)}i.done?e(s):Promise.resolve(s).then(t,r)}const i={name:"admMain",data:function(){return{con:{order:{10:0,11:0,12:0,20:0,30:0,40:0,50:0,60:0}}}},computed:{order_7:function(){return Object.values(this.con.order).reduce((function(o,e){return o+e}),0)},estimate_7:function(){return Object.values(this.con.order).reduce((function(o,e){return o+e}),0)}},mounted:function(){var o,e=this;return(o=r().mark((function o(){var a;return r().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,d.Z.get("/api/admin");case 3:(a=o.sent)&&200===a.status&&(e.con=a.data),o.next=11;break;case 7:o.prev=7,o.t0=o.catch(0),Notify.consolePrint(o.t0),Notify.toast("warning",o.t0.response.data.message);case 11:case"end":return o.stop()}}),o,null,[[0,7]])})),function(){var e=this,a=arguments;return new Promise((function(t,r){var d=o.apply(e,a);function i(o){n(d,t,r,i,s,"next",o)}function s(o){n(d,t,r,i,s,"throw",o)}i(void 0)}))})()}};var s=a(93379),c=a.n(s),p=a(46091),l={insert:"head",singleton:!1};c()(p.Z,l);p.Z.locals;const _=(0,a(51900).Z)(i,(function(){var o=this,e=o.$createElement,a=o._self._c||e;return a("b-container",{staticClass:"p_wrap"},[a("b-row",[a("b-col",{staticClass:"left",attrs:{col:"",lg:"6",md:"12"}},[a("h4",[o._v("주문현황")]),o._v(" "),a("div",{staticClass:"box"},[a("b-row",{staticClass:"top"},[a("b-col",[o._v("오늘 주문 "),a("span",[o._v(o._s(o.con.today_order))])]),o._v(" "),a("b-col",[o._v("최근 7일 주문 "),a("span",[o._v(o._s(o.order_7))])])],1),o._v(" "),a("b-row",{staticClass:"body"},[a("b-col",[a("span",[o._v(o._s(o.con.order[10]))]),o._v(" "),a("span",[o._v("주문접수")]),o._v(" "),a("span",[o._v("주문 후 상태")])]),o._v(" "),a("b-col",[a("span",[o._v(o._s(parseInt(o.con.order[11])+parseInt(o.con.order[12])))]),o._v(" "),a("span",[o._v("입금확인중")]),o._v(" "),a("span",[o._v("주문 후, 입금 전")])]),o._v(" "),a("b-col",[a("span",[o._v(o._s(parseInt(o.con.order[20])+parseInt(o.con.order[30])))]),o._v(" "),a("span",[o._v("입금완료")]),o._v(" "),a("span",[o._v("주문 후, 입금 후")])]),o._v(" "),a("b-col",[a("span",[o._v(o._s(o.con.order[40]))]),o._v(" "),a("span",[o._v("배송중")]),o._v(" "),a("span",[o._v("상품 발송 후")])]),o._v(" "),a("b-col",[a("span",[o._v(o._s(o.con.order[50]))]),o._v(" "),a("span",[o._v("배송완료")]),o._v(" "),a("span",[o._v("고객 상품 수취")])]),o._v(" "),a("b-col",[a("span",[o._v(o._s(o.con.order[60]))]),o._v(" "),a("span",[o._v("주문취소")]),o._v(" "),a("span",[o._v("주문 최소 상태")])])],1)],1)]),o._v(" "),a("b-col",{staticClass:"right",attrs:{col:"",lg:"6",md:"12"}},[a("h4",[o._v("견적현황")]),o._v(" "),a("div",{staticClass:"box"},[a("b-row",{staticClass:"top"},[a("b-col",[o._v("오늘 견적 "),a("span",[o._v(o._s(o.con.today_estimate))])]),o._v(" "),a("b-col",[o._v("최근 7일 견적 "),a("span",[o._v(o._s(o.estimate_7))])])],1),o._v(" "),a("div",{staticClass:"body"},[a("b-row",{staticClass:"head"},[a("b-col",[o._v("우청일")]),o._v(" "),a("b-col",[o._v("아이디")]),o._v(" "),a("b-col",[o._v("이름")]),o._v(" "),a("b-col",[o._v("견적요쳥 내용")])],1),o._v(" "),a("perfect-scrollbar",o._l(o.con.estimateReq,(function(e){return a("b-row",{key:e.eq_id,staticClass:"list"},[a("b-col",[o._v(o._s(o._f("formatDate_MM_DD_HH:mm")(e.created_at)))]),o._v(" "),a("b-col",[o._v(o._s(e.eq_email))]),o._v(" "),a("b-col",[o._v(o._s(e.eq_name))]),o._v(" "),a("b-col",{staticClass:"eq_tit",on:{click:function(a){return o.openWinPop("/admin/shop/estimate/req/"+e.eq_id,1700,900)}}},[e.eq_title?a("b",{domProps:{innerHTML:o._s(e.eq_title)}}):"REQ"==e.eq_type?a("SubString",{attrs:{width:900},model:{value:e.eq_content,callback:function(a){o.$set(e,"eq_content",a)},expression:"eq.eq_content"}}):o._e(),o._v(" "),"TEMP"==e.eq_type?a("b-badge",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"yellow",attrs:{title:"임의견적"}},[o._v("임")]):"REREQ"==e.eq_type?a("b-badge",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"plum",attrs:{title:"재견적요청"}},[o._v("재")]):"CUS"==e.eq_type?a("b-badge",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"mint",attrs:{title:"주문제작"}},[o._v("주")]):o._e()],1)],1)})),1)],1)],1)])],1)],1)}),[],!1,null,"eae4dd20",null).exports}}]);