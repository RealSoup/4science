"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3001],{83900:(t,e,n)=>{n.d(e,{Z:()=>s});var a=n(23645),r=n.n(a)()((function(t){return t[1]}));r.push([t.id,".w_fence h3 small[data-v-08397fbd]{font-size:.9rem}.w_fence .row a[data-v-08397fbd]{border:1px solid #d7d7d7;flex:0 0 18.4%;margin-bottom:30px;max-width:18.4%;padding:0}.w_fence .row a[data-v-08397fbd]:not(:nth-child(5n+0)){margin-right:30px}.w_fence .row a img[data-v-08397fbd]{width:100%}",""]);const s=r},33001:(t,e,n)=>{n.r(e),n.d(e,{default:()=>l});var a=n(87757),r=n.n(a),s=n(44670);function o(t,e,n,a,r,s,o){try{var c=t[s](o),i=c.value}catch(t){return void n(t)}c.done?e(i):Promise.resolve(i).then(a,r)}const c={name:"ShopEstimateCustomIndex",data:function(){return{category:[]}},mounted:function(){var t,e=this;return(t=r().mark((function t(){var n;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.Z.get("/api/shop/estimate/getCustomMadeCategory");case 2:(n=t.sent)&&200===n.status&&(e.category=n.data);case 4:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(a,r){var s=t.apply(e,n);function c(t){o(s,a,r,c,i,"next",t)}function i(t){o(s,a,r,c,i,"throw",t)}c(void 0)}))})()}};var i=n(93379),u=n.n(i),d=n(83900),f={insert:"head",singleton:!1};u()(d.Z,f);d.Z.locals;const l=(0,n(51900).Z)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"w_fence"},[n("h3",[t._v("주문제작 "),n("small",[t._v("다양한 제품을 고객님의 니즈에 맞게 제작해 드립니다.")])]),t._v(" "),n("b-row",t._l(t.category,(function(e,a){return n("b-link",{key:a,staticClass:"col",attrs:{to:{name:"estimate_custom_create",params:{id:a}}}},[n("img",{attrs:{src:t.s3url+"estimate/custom"+a+".png"}})])})),1)],1)}),[],!1,null,"08397fbd",null).exports}}]);