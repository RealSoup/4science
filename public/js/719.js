"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[719],{96519:(o,t,r)=>{r.d(t,{Z:()=>e});var a=r(23645),d=r.n(a)()((function(o){return o[1]}));d.push([o.id,".p_wrap[data-v-62fddd0c]{margin-top:4rem}.p_wrap h4[data-v-62fddd0c]{font-size:1.6rem;font-weight:700;margin-bottom:1rem}.p_wrap .row .col .box[data-v-62fddd0c]{background-color:#eff0f2;border-radius:1rem;border-style:solid;border-width:5px;padding:.75rem 1.5rem}.p_wrap .row .left .box[data-v-62fddd0c]{border-color:#458cca}.p_wrap .row .right .box[data-v-62fddd0c]{border-color:#51b948}.p_wrap .row .col .box .row[data-v-62fddd0c]{margin:0}.p_wrap .row .col .box .top .col[data-v-62fddd0c]{align-items:center;display:flex;font-size:1.25rem;font-weight:600;justify-content:center;padding:.65rem 0 .45rem;text-align:center}.p_wrap .row .col .box .top .col span[data-v-62fddd0c]{font-size:2.53rem;margin-left:2rem}.p_wrap .row .col .box .top .col[data-v-62fddd0c]:first-child{border-right:1px solid #c2c2c2}.p_wrap .row .left .box .top .col span[data-v-62fddd0c]{color:#458ccc}.p_wrap .row .right .box .top .col span[data-v-62fddd0c]{color:#51b948}.p_wrap .row .col .box .body[data-v-62fddd0c]{margin-top:.5rem}.p_wrap .row .left .box .body[data-v-62fddd0c]{border-top:1px solid #c2c2c2;margin-bottom:1.25rem;padding-top:1.7rem}.p_wrap .row .left .box .body .col[data-v-62fddd0c]{padding:0}.p_wrap .row .left .box .body .col[data-v-62fddd0c]:not(:first-child){padding-left:5px}.p_wrap .row .left .box .body .col[data-v-62fddd0c]:not(:last-child){padding-right:5px}.p_wrap .row .left .box .body .col span[data-v-62fddd0c]{display:block;text-align:center}.p_wrap .row .left .box .body .col span[data-v-62fddd0c]:first-child{background-color:#fff;border-radius:1rem;font-size:1.9rem;font-weight:600;padding:4.2rem 0}.p_wrap .row .left .box .body .col span[data-v-62fddd0c]:nth-child(2){font-weight:800;margin-top:1rem}.p_wrap .row .left .box .body .col span[data-v-62fddd0c]:nth-child(3){font-size:.9rem;margin-top:.15rem}.p_wrap .row .right .box[data-v-62fddd0c]{padding-bottom:0}.p_wrap .row .right .box .body[data-v-62fddd0c]{background:#fff;border-radius:1rem;margin-left:-1.5rem;margin-right:-1.5rem;padding-bottom:1.5rem}.p_wrap .row .right .box .body .head[data-v-62fddd0c]{background-color:#a0a0a0;color:#fff}.p_wrap .row .right .box .body .row .col[data-v-62fddd0c]{padding:0}.p_wrap .row .right .box .body .ps[data-v-62fddd0c]{background-color:#fff;height:239px}.p_wrap .row .right .box .body .row .col[data-v-62fddd0c]{padding:.56rem .53rem .5rem;text-align:center}.p_wrap .row .right .box .body .row .col[data-v-62fddd0c]:not(:last-child){border-right:1px solid #c2c2c2}.p_wrap .row .right .box .body .row .col[data-v-62fddd0c]:first-child{flex:0 0 14%;max-width:14%}.p_wrap .row .right .box .body .row .col[data-v-62fddd0c]:nth-child(2){flex:0 0 24%;max-width:24%}.p_wrap .row .right .box .body .row .col[data-v-62fddd0c]:nth-child(3){flex:0 0 12.1%;max-width:12.1%}.p_wrap .row .right .box .body .list .col[data-v-62fddd0c]:nth-child(4){word-wrap:normal;overflow:hidden;text-align:left;text-overflow:ellipsis;vertical-align:bottom;white-space:nowrap}.p_wrap .row .right .box .body .list .col[data-v-62fddd0c]{font-size:.9rem;padding:.99rem .53rem .8rem}.p_wrap .row .right .box .body .ps[data-v-62fddd0c] .ps__rail-y{background-color:#eee;cursor:pointer;opacity:.9;z-index:1}.p_wrap .row .right .box .body .ps[data-v-62fddd0c] .ps__rail-y>.ps__thumb-y{background-color:#438dcc;width:11px}",""]);const e=d},719:(o,t,r)=>{r.r(t),r.d(t,{default:()=>_});var a=r(87757),d=r.n(a),e=r(44670);function c(o,t,r,a,d,e,c){try{var n=o[e](c),i=n.value}catch(o){return void r(o)}n.done?t(i):Promise.resolve(i).then(a,d)}const n={name:"admMain",data:function(){return{con:{order:{10:0,11:0,12:0,20:0,30:0,40:0,50:0,60:0}}}},computed:{order_7:function(){return Object.values(this.con.order).reduce((function(o,t){return o+t}),0)},estimate_7:function(){return Object.values(this.con.order).reduce((function(o,t){return o+t}),0)}},mounted:function(){var o,t=this;return(o=d().mark((function o(){var r;return d().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,e.Z.get("/api/admin");case 3:(r=o.sent)&&200===r.status&&(t.con=r.data),o.next=11;break;case 7:o.prev=7,o.t0=o.catch(0),Notify.consolePrint(o.t0),Notify.toast("warning",o.t0.response.data.message);case 11:case"end":return o.stop()}}),o,null,[[0,7]])})),function(){var t=this,r=arguments;return new Promise((function(a,d){var e=o.apply(t,r);function n(o){c(e,a,d,n,i,"next",o)}function i(o){c(e,a,d,n,i,"throw",o)}n(void 0)}))})()}};var i=r(93379),s=r.n(i),p=r(96519),l={insert:"head",singleton:!1};s()(p.Z,l);p.Z.locals;const _=(0,r(51900).Z)(n,(function(){var o=this,t=o.$createElement,r=o._self._c||t;return r("b-container",{staticClass:"p_wrap"},[r("b-row",[r("b-col",{staticClass:"left",attrs:{col:"",lg:"6",md:"12"}},[r("h4",[o._v("주문현황")]),o._v(" "),r("div",{staticClass:"box"},[r("b-row",{staticClass:"top"},[r("b-col",[o._v("오늘 주문 "),r("span",[o._v(o._s(o.con.today_order))])]),o._v(" "),r("b-col",[o._v("최근 7일 주문 "),r("span",[o._v(o._s(o.order_7))])])],1),o._v(" "),r("b-row",{staticClass:"body"},[r("b-col",[r("span",[o._v(o._s(o.con.order[10]))]),o._v(" "),r("span",[o._v("주문접수")]),o._v(" "),r("span",[o._v("주문 후 상태")])]),o._v(" "),r("b-col",[r("span",[o._v(o._s(parseInt(o.con.order[11])+parseInt(o.con.order[12])))]),o._v(" "),r("span",[o._v("입금확인중")]),o._v(" "),r("span",[o._v("주문 후, 입금 전")])]),o._v(" "),r("b-col",[r("span",[o._v(o._s(parseInt(o.con.order[20])+parseInt(o.con.order[30])))]),o._v(" "),r("span",[o._v("입금완료")]),o._v(" "),r("span",[o._v("주문 후, 입금 후")])]),o._v(" "),r("b-col",[r("span",[o._v(o._s(o.con.order[40]))]),o._v(" "),r("span",[o._v("배송중")]),o._v(" "),r("span",[o._v("상품 발송 후")])]),o._v(" "),r("b-col",[r("span",[o._v(o._s(o.con.order[50]))]),o._v(" "),r("span",[o._v("배송완료")]),o._v(" "),r("span",[o._v("고객 상품 수취")])]),o._v(" "),r("b-col",[r("span",[o._v(o._s(o.con.order[60]))]),o._v(" "),r("span",[o._v("주문취소")]),o._v(" "),r("span",[o._v("주문 최소 상태")])])],1)],1)]),o._v(" "),r("b-col",{staticClass:"right",attrs:{col:"",lg:"6",md:"12"}},[r("h4",[o._v("견적현황")]),o._v(" "),r("div",{staticClass:"box"},[r("b-row",{staticClass:"top"},[r("b-col",[o._v("오늘 견적 "),r("span",[o._v(o._s(o.con.today_estimate))])]),o._v(" "),r("b-col",[o._v("최근 7일 견적 "),r("span",[o._v(o._s(o.estimate_7))])])],1),o._v(" "),r("div",{staticClass:"body"},[r("b-row",{staticClass:"head"},[r("b-col",[o._v("요청일")]),o._v(" "),r("b-col",[o._v("아이디")]),o._v(" "),r("b-col",[o._v("이름")]),o._v(" "),r("b-col",[o._v("견적요쳥 내용")])],1),o._v(" "),r("perfect-scrollbar",o._l(o.con.estimateReq,(function(t){return r("b-row",{key:t.eq_id,staticClass:"list"},[r("b-col",[o._v(o._s(o._f("formatDate_MM_DD_HH:mm")(t.created_at)))]),o._v(" "),r("b-col",[o._v(o._s(t.eq_email))]),o._v(" "),r("b-col",[o._v(o._s(t.eq_name))]),o._v(" "),r("b-col",{staticClass:"eq_tit",on:{click:function(r){return o.openWinPop("/admin/shop/estimate/req/"+t.eq_id,1700,900)}}},[t.eq_title?r("b",{domProps:{innerHTML:o._s(t.eq_title)}}):"REQ"==t.eq_type?r("SubString",{attrs:{width:900},model:{value:t.eq_content,callback:function(r){o.$set(t,"eq_content",r)},expression:"eq.eq_content"}}):o._e(),o._v(" "),"TEMP"==t.eq_type?r("b-badge",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"yellow",attrs:{title:"임의견적"}},[o._v("임")]):"REREQ"==t.eq_type?r("b-badge",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"plum",attrs:{title:"재견적요청"}},[o._v("재")]):"CUS"==t.eq_type?r("b-badge",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"mint",attrs:{title:"주문제작"}},[o._v("주")]):o._e()],1)],1)})),1)],1)],1)])],1)],1)}),[],!1,null,"62fddd0c",null).exports}}]);