"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1148],{4941:(t,e,a)=>{a.d(e,{Z:()=>s});var n=a(3645),r=a.n(n)()((function(t){return t[1]}));r.push([t.id,".col a[data-v-0e52f014]{display:block;padding:.2rem 0;text-align:center}.col a[data-v-0e52f014]:hover{background:#f5f5f5}.col a img[data-v-0e52f014]{float:left;height:180px;margin-right:1rem;-o-object-fit:cover;object-fit:cover;width:100%}.col.maker a img[data-v-0e52f014]{height:105px;width:218px}",""]);const s=r},1148:(t,e,a)=>{a.r(e),a.d(e,{default:()=>m});var n=a(7757),r=a.n(n),s=a(4670);function i(t,e,a,n,r,s,i){try{var o=t[s](i),c=o.value}catch(t){return void a(t)}o.done?e(c):Promise.resolve(c).then(n,r)}function o(t){return function(){var e=this,a=arguments;return new Promise((function(n,r){var s=t.apply(e,a);function o(t){i(s,n,r,o,c,"next",t)}function c(t){i(s,n,r,o,c,"throw",t)}o(void 0)}))}}const c={name:"ListingIndex",data:function(){return{code:this.$route.params.code,frm:{},list:[]}},mounted:function(){this.index()},beforeRouteUpdate:function(t,e,a){this.code=t.params.code,this.index(),a()},methods:{index:function(){var t=arguments,e=this;return o(r().mark((function a(){var n,i,o;return r().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n=t.length>0&&void 0!==t[0]?t[0]:1,e.frm.page=n,a.prev=2,i="",i="maker"==e.code?"/api/shop/maker":"/api/shop/listing/".concat(e.code),a.next=7,s.Z.get(i,{params:e.frm});case 7:(o=a.sent)&&200===o.status&&(e.list=o.data),a.next=15;break;case 11:a.prev=11,a.t0=a.catch(2),Notify.consolePrint(a.t0),Notify.toast("warning",a.t0.response.data.message);case 15:case"end":return a.stop()}}),a,null,[[2,11]])})))()}}};var d=a(3379),l=a.n(d),v=a(4941),u={insert:"head",singleton:!1};l()(v.Z,u);v.Z.locals;const m=(0,a(1900).Z)(c,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-card",{attrs:{title:"Card Title","no-body":""}},[a("b-card-header",{attrs:{"header-tag":"nav"}},[a("b-nav",{attrs:{"card-header":"",tabs:""}},[a("b-nav-item",{attrs:{to:"/shop/listing/rec",exact:"","exact-active-class":"active"}},[t._v("추천상품")]),t._v(" "),a("b-nav-item",{attrs:{to:"/shop/listing/pop",exact:"","exact-active-class":"active"}},[t._v("인기상품")]),t._v(" "),a("b-nav-item",{attrs:{to:"/shop/listing/cli",exact:"","exact-active-class":"active"}},[t._v("Click & Buy")]),t._v(" "),a("b-nav-item",{attrs:{to:"/shop/listing/day",exact:"","exact-active-class":"active"}},[t._v("당일출고")]),t._v(" "),a("b-nav-item",{attrs:{to:"/shop/listing/maker",exact:"","exact-active-class":"active"}},[t._v("Brand Shop")])],1)],1),t._v(" "),a("b-card-body",{staticClass:"container"},[a("b-row",["maker"===t.code?t._l(t.list,(function(e,n){return a("b-col",{key:e.mk_id,class:{maker:"maker"===t.code},attrs:{lg:"2",cols:"6",col:""}},[a("b-link",{attrs:{to:""}},[a("b-img",n<3?{attrs:{src:t.s3url+"listing/maker/"+e.mk_id+".png",rounded:""}}:{attrs:{src:t.s3url+"common/noimage.jpg",rounded:""}}),t._v(" "),a("p",[t._v(t._s(e.mk_name))])],1)],1)})):t._l(t.list,(function(e,n){return a("b-col",{key:"dfsgdg"+n,attrs:{lg:"2",cols:"6",col:""}},[e.goods?a("b-link",{attrs:{to:{name:"goods_show",params:{gd_id:e.li_gd_id}}}},[a("b-img",{attrs:{src:e.goods.image_src_thumb[0],rounded:""}}),t._v(" "),a("p",[t._v(t._s(e.goods.gd_name))])],1):t._e()],1)}))],2)],1)],1)}),[],!1,null,"0e52f014",null).exports}}]);