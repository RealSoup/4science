"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5656],{40875:(t,e,n)=>{n.d(e,{Z:()=>i});var a=n(23645),r=n.n(a)()((function(t){return t[1]}));r.push([t.id,".container[data-v-eb65c352]{text-align:center}.container p[data-v-eb65c352]:first-child{color:#1a90d6;font-size:3.2rem;font-weight:100;margin-bottom:0}.container p[data-v-eb65c352]:nth-child(2){font-size:1.9rem;font-weight:700}.container p[data-v-eb65c352]:nth-child(3){font-size:1.3rem;font-weight:700}.container p:nth-child(3) b[data-v-eb65c352]{color:#1a90d6}.container ul[data-v-eb65c352]{border:1px solid #ccc;border-radius:16px;margin:3rem auto;padding:1.8rem;width:620px}.container ul .dd_style[data-v-eb65c352]{align-items:center;display:flex;flex-wrap:wrap}.container ul .dd_style span[data-v-eb65c352]{flex-basis:0;flex-grow:1;font-size:1.1rem;font-weight:600;max-width:100%}.container ul .dd_style span[data-v-eb65c352]:first-child{flex:0 0 39%;max-width:39%;padding-right:10px;text-align:right}.container ul .dd_style span[data-v-eb65c352]:nth-child(2){color:#1a90d6;text-align:left}.container ul li[data-v-eb65c352]{line-height:2.3}.container ul li:first-child span[data-v-eb65c352]:nth-child(2){font-size:1.4rem;font-weight:800}.container ul li[data-v-eb65c352]:last-child{font-size:.9rem;line-height:1.5}.container ul li:last-child b[data-v-eb65c352]{font-weight:800}.container ul li b.point[data-v-eb65c352]{color:#1a90d6}.container .row[data-v-eb65c352]{margin:auto;width:620px}.container .row .col[data-v-eb65c352]:first-child{padding-left:0}.container .row .col[data-v-eb65c352]:nth-child(2){padding-right:0}.container .row .col .btn[data-v-eb65c352]{width:100%}",""]);const i=r},35656:(t,e,n)=>{n.r(e),n.d(e,{default:()=>h});var a=n(87757),r=n.n(a),i=n(44670);function o(t,e,n,a,r,i,o){try{var c=t[i](o),s=c.value}catch(t){return void n(t)}c.done?e(s):Promise.resolve(s).then(a,r)}const c={props:["value"],data:function(){return{od_id:this.$route.params.od_id,order:{order_extra_info:{}}}},computed:{after_10day:function(){return date_calc("d",10).format("yyyy년 MM월 dd일")},pay_plan:function(){switch(this.order.order_extra_info.oex_pay_plan){case"soon":return"선결제";case"week1":return"1주이내";case"week2":return"2주이내";case"month1":return"30일이내";case"month2":return"60일이내"}},pay_method:function(){switch(this.order.od_pay_method){case"C":return"카드 결제";case"B":return"현금결제 (무통장입금)";case"P":return"PSYS (원격지 연구비 직접결제)";case"R":return"원격결제";case"E":return"에스크로 (결제대금예치)"}}},methods:{},mounted:function(){var t,e=this;return(t=r().mark((function t(){var n;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.Z.get("/api/shop/order/done/".concat(e.od_id));case 2:(n=t.sent)&&200===n.status&&(e.order=n.data);case 4:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(a,r){var i=t.apply(e,n);function c(t){o(i,a,r,c,s,"next",t)}function s(t){o(i,a,r,c,s,"throw",t)}c(void 0)}))})()}};var s=n(93379),d=n.n(s),l=n(40875),u={insert:"head",singleton:!1};d()(l.Z,u);l.Z.locals;const h=(0,n(51900).Z)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"w_fence"},[n("p",[t._v("THANK YOU!")]),t._v(" "),n("p",[t._v("주문이 완료되었습니다.")]),t._v(" "),n("p",[t._v("주문내역은 마이페이지 > "),n("b",[t._v("주문 / 배송조회")]),t._v(" 에서 확인하실 수 있습니다.")]),t._v(" "),n("ul",[n("li",{staticClass:"dd_style"},[n("span",[t._v("주문번호")]),n("span",[t._v(t._s(t.order.od_no))])]),t._v(" "),n("li",{staticClass:"dd_style"},[n("span",[t._v("결제방법")]),n("span",[t._v(t._s(t.pay_method))])]),t._v(" "),n("li",{staticClass:"dd_style"},[n("span",[t._v("결제 예정일")]),n("span",[t._v(t._s(t.pay_plan))])]),t._v(" "),n("li",[n("b",[t._v(t._s(t.after_10day))]),t._v("까지 주문 금액이 입금확인이 되지 않으면,\n            "),n("br"),n("b",[t._v("자동주문취소")]),t._v(" 됨을 알려드립니다.\n            "),n("br"),n("b",{staticClass:"point"},[t._v("단 대학교, 국가연구기관은 예외")])])]),t._v(" "),n("b-row",[n("b-col",[n("b-button",{staticClass:"gray xl",on:{click:function(e){return t.$router.push({name:"my_order"})}}},[t._v("주문/배송조회 가기")])],1),t._v(" "),n("b-col",[n("b-button",{staticClass:"blue xl",on:{click:function(e){return t.$router.push({name:"main"})}}},[t._v("쇼핑 계속하기")])],1)],1)],1)}),[],!1,null,"eb65c352",null).exports}}]);