"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6750],{25947:(t,e,a)=>{a.d(e,{Z:()=>i});var n=a(23645),r=a.n(n)()((function(t){return t[1]}));r.push([t.id,".container[data-v-87ed319a]{text-align:center}.container p[data-v-87ed319a]:first-child{color:#1a90d6;font-size:3.2rem;font-weight:100;margin-bottom:0}.container p[data-v-87ed319a]:nth-child(2){font-size:1.9rem;font-weight:700}.container p[data-v-87ed319a]:nth-child(3){font-size:1.3rem;font-weight:700}.container p:nth-child(3) b[data-v-87ed319a]{color:#1a90d6}.container ul[data-v-87ed319a]{border:1px solid #ccc;border-radius:16px;margin:3rem auto;padding:1.8rem;width:620px}.container ul .dd_style[data-v-87ed319a]{align-items:center;display:flex;flex-wrap:wrap}.container ul .dd_style span[data-v-87ed319a]{flex-basis:0;flex-grow:1;font-size:1.1rem;font-weight:600;max-width:100%}.container ul .dd_style span[data-v-87ed319a]:first-child{flex:0 0 39%;max-width:39%;padding-right:10px;text-align:right}.container ul .dd_style span[data-v-87ed319a]:nth-child(2){color:#1a90d6;text-align:left}.container ul li[data-v-87ed319a]{line-height:2.3}.container ul li:first-child span[data-v-87ed319a]:nth-child(2){font-size:1.4rem;font-weight:800}.container ul li[data-v-87ed319a]:last-child{font-size:.9rem;line-height:1.5}.container ul li:last-child b[data-v-87ed319a]{font-weight:800}.container ul li b.point[data-v-87ed319a]{color:#1a90d6}.container .row[data-v-87ed319a]{margin:auto;width:620px}.container .row .col[data-v-87ed319a]:first-child{padding-left:0}.container .row .col[data-v-87ed319a]:nth-child(2){padding-right:0}.container .row .col .btn[data-v-87ed319a]{width:100%}",""]);const i=r},96750:(t,e,a)=>{a.r(e),a.d(e,{default:()=>v});var n=a(87757),r=a.n(n),i=a(44670);function o(t,e,a,n,r,i,o){try{var d=t[i](o),s=d.value}catch(t){return void a(t)}d.done?e(s):Promise.resolve(s).then(n,r)}const d={props:["value"],data:function(){return{od_id:this.$route.params.od_id,order:{order_extra_info:{}}}},computed:{after_10day:function(){return date_calc("d",10).format("yyyy년 MM월 dd일")},pay_plan:function(){switch(this.order.order_extra_info.oex_pay_plan){case"soon":return"선결제";case"week1":return"1주이내";case"week2":return"2주이내";case"month1":return"30일이내";case"month2":return"60일이내"}},pay_method:function(){switch(this.order.od_pay_method){case"C":return"카드 결제";case"B":return"현금결제 (무통장입금)";case"P":return"PSYS (원격지 연구비 직접결제)";case"R":return"원격결제";case"E":return"에스크로 (결제대금예치)"}}},methods:{naver_js:function(){var t=document.createElement("script");t.setAttribute("type","text/javascript"),t.setAttribute("src",'"//wcs.naver.net/wcslog.js'),document.getElementsByTagName("head")[0].appendChild(t),t.onload=function(){window.wcs&&wcs.cnv("1",this.order.od_all_price)}}},mounted:function(){var t,e=this;return(t=r().mark((function t(){var a;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.Z.get("/api/shop/order/done/".concat(e.od_id));case 2:(a=t.sent)&&200===a.status&&(e.order=a.data),e.naver_js();case 5:case"end":return t.stop()}}),t)})),function(){var e=this,a=arguments;return new Promise((function(n,r){var i=t.apply(e,a);function d(t){o(i,n,r,d,s,"next",t)}function s(t){o(i,n,r,d,s,"throw",t)}d(void 0)}))})()}};var s=a(93379),c=a.n(s),l=a(25947),u={insert:"head",singleton:!1};c()(l.Z,u);l.Z.locals;const v=(0,a(51900).Z)(d,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",{staticClass:"w_fence"},[a("p",[t._v("THANK YOU!")]),t._v(" "),a("p",[t._v("주문이 완료되었습니다.")]),t._v(" "),a("p",[t._v("주문내역은 마이페이지 > "),a("b",[t._v("주문 / 배송조회")]),t._v(" 에서 확인하실 수 있습니다.")]),t._v(" "),a("ul",[a("li",{staticClass:"dd_style"},[a("span",[t._v("주문번호")]),a("span",[t._v(t._s(t.order.od_no))])]),t._v(" "),a("li",{staticClass:"dd_style"},[a("span",[t._v("결제방법")]),a("span",[t._v(t._s(t.pay_method))])]),t._v(" "),a("li",{staticClass:"dd_style"},[a("span",[t._v("결제 예정일")]),a("span",[t._v(t._s(t.pay_plan))])]),t._v(" "),a("li",[a("b",[t._v(t._s(t.after_10day))]),t._v("까지 주문 금액이 입금확인이 되지 않으면,\n            "),a("br"),a("b",[t._v("자동주문취소")]),t._v(" 됨을 알려드립니다.\n            "),a("br"),a("b",{staticClass:"point"},[t._v("단 대학교, 국가연구기관은 예외")])])]),t._v(" "),a("b-row",[a("b-col",[a("b-button",{staticClass:"gray xl",on:{click:function(e){return t.$router.push({name:"my_order"})}}},[t._v("주문/배송조회 가기")])],1),t._v(" "),a("b-col",[a("b-button",{staticClass:"blue xl",on:{click:function(e){return t.$router.push({name:"main"})}}},[t._v("쇼핑 계속하기")])],1)],1)],1)}),[],!1,null,"87ed319a",null).exports}}]);