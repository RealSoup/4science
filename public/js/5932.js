"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5932],{5932:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d});var r=n(7757),i=n.n(r),o=n(4670);function a(e,t,n,r,i,o,a){try{var s=e[o](a),d=s.value}catch(e){return void n(e)}s.done?t(d):Promise.resolve(d).then(r,i)}const s={name:"Mypage",components:{LoadingModal:function(){return n.e(2891).then(n.bind(n,2891))},OrderList:function(){return n.e(199).then(n.bind(n,199))},EstimateList:function(){return n.e(1469).then(n.bind(n,1469))}},data:function(){return{isLoadingModalViewed:!0,order:[],order_config:{},estimateReq:[]}},mounted:function(){var e,t=this;return(e=i().mark((function e(){var n,r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.get("/api/shop/order",{params:{limit:5,type:"with_gm"}});case 2:return n=e.sent,t.order=n.data.order,t.order_config=n.data.order_config,e.next=7,o.Z.get("/api/shop/estimate",{params:{limit:5,type:"with_em"}});case 7:r=e.sent,t.estimateReq=r.data,t.isLoadingModalViewed=!1;case 10:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,i){var o=e.apply(t,n);function s(e){a(o,r,i,s,d,"next",e)}function d(e){a(o,r,i,s,d,"throw",e)}s(void 0)}))})()}};const d=(0,n(1900).Z)(s,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.isLoadingModalViewed?n("LoadingModal",{attrs:{position:"absolute"},on:{"close-modal":function(t){e.isLoadingModalViewed=!1}}},[e._v("\n        Loading ......\n    ")]):[n("h5",[e._v("최근 주문 내역 "),n("small",[e._v("최근 주문 5개를 보여줍니다.")])]),e._v(" "),n("OrderList",{attrs:{order_config:e.order_config},model:{value:e.order,callback:function(t){e.order=t},expression:"order"}}),e._v(" "),n("h5",[e._v("최근 견적 내역 "),n("small",[e._v("최근 견적 5개를 보여줍니다.")])]),e._v(" "),n("EstimateList",{model:{value:e.estimateReq,callback:function(t){e.estimateReq=t},expression:"estimateReq"}})]],2)}),[],!1,null,"8dd3908a",null).exports}}]);