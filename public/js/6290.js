"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6290],{99092:(t,a,e)=>{e.d(a,{Z:()=>s});var n=e(23645),i=e.n(n)()((function(t){return t[1]}));i.push([t.id,".bo_index[data-v-b76aeade]{max-width:1000px}.bo_index table tr td[data-v-b76aeade]{border-bottom:1px solid #959595;border-top-width:0;padding:.7rem 0;text-align:center}.bo_index table tr td.satisfaction[data-v-b76aeade]{color:red}.bo_index table tr td[data-v-b76aeade]:nth-child(3){text-align:left}@media (max-width:992px){.bo_index>.bo_body>.col[data-v-b76aeade]:nth-of-type(4){flex-basis:17%;max-width:17%}}",""]);const s=i},46290:(t,a,e)=>{e.r(a),e.d(a,{default:()=>v});var n=e(87757),i=e.n(n),s=e(44670);function o(t,a,e,n,i,s,o){try{var r=t[s](o),d=r.value}catch(t){return void e(t)}r.done?a(d):Promise.resolve(d).then(n,i)}function r(t){return function(){var a=this,e=arguments;return new Promise((function(n,i){var s=t.apply(a,e);function r(t){o(s,n,i,r,d,"next",t)}function d(t){o(s,n,i,r,d,"throw",t)}r(void 0)}))}}const d={name:"ShopGoodsReview",props:["bo_cd","bo_cnt"],data:function(){return{frm:{page:0,limit:5,bo_gd_id:this.$route.params.gd_id},list:{}}},methods:{index:function(){var t=arguments,a=this;return r(i().mark((function e(){var n,o;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.length>0&&void 0!==t[0]?t[0]:1,a.frm.page=n,e.next=4,s.Z.get("/api/board/".concat(a.bo_cd),{params:a.frm});case 4:(o=e.sent)&&200===o.status&&(a.list=o.data.list,a.bo_cnt.review=o.data.list.total);case 6:case"end":return e.stop()}}),e)})))()}},mounted:function(){this.index()}};var l=e(93379),c=e.n(l),_=e(99092),b={insert:"head",singleton:!1};c()(_.Z,b);_.Z.locals;const v=(0,e(51900).Z)(d,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"bo_index"},[e("table",{staticClass:"table"},[t._m(0),t._v(" "),e("tbody",t._l(t.list.data,(function(a,n){return e("tr",{key:n},[e("td",{staticClass:"m_hide"},[t._v(t._s(t.list.total-t.list.per_page*(t.list.current_page-1)-n))]),t._v(" "),e("td",{staticClass:"satisfaction"},[100==a.bo_good?[e("b-icon-star-fill"),e("b-icon-star-fill"),e("b-icon-star-fill")]:50==a.bo_good?[e("b-icon-star-fill"),e("b-icon-star-fill"),e("b-icon-star")]:[e("b-icon-star-fill"),e("b-icon-star"),e("b-icon-star")]],2),t._v(" "),e("td",[t._v(t._s(a.bo_content))]),t._v(" "),e("td",[t._v(t._s(a.bo_writer))]),t._v(" "),e("td",{staticClass:"m_hide"},[t._v(t._s(t._f("formatDate")(a.created_at)))])])})),0)]),t._v(" "),e("pagination",{staticClass:"mt-5",attrs:{data:t.list,limit:5,showDisabled:!0,align:"center"},on:{"pagination-change-page":t.index}},[e("span",{attrs:{slot:"prev-nav"},slot:"prev-nav"},[e("b-icon-chevron-left")],1),t._v(" "),e("span",{attrs:{slot:"next-nav"},slot:"next-nav"},[e("b-icon-chevron-right")],1)])],1)}),[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("colgroup",[e("col",{staticClass:"m_hide",attrs:{width:"10%"}}),t._v(" "),e("col",{attrs:{width:"15%"}}),t._v(" "),e("col",{attrs:{width:""}}),t._v(" "),e("col",{attrs:{width:"15%"}}),t._v(" "),e("col",{staticClass:"m_hide",attrs:{width:"10%"}})])}],!1,null,"b76aeade",null).exports}}]);