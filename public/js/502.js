"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[502],{81060:(t,e,o)=>{o.d(e,{Z:()=>i});var a=o(23645),n=o.n(a)()((function(t){return t[1]}));n.push([t.id,'.outlet .top_back{background:#0094ea;height:350px;position:absolute;width:100%}.outlet .w_fence{max-width:1440px;position:relative}.outlet .w_fence .top{align-items:center;display:flex;margin-bottom:3rem}.outlet .w_fence .top li{color:#fff;font-size:1.3rem;margin:0 1rem;position:relative}.outlet .w_fence .top li:first-child{font-size:1.85rem;font-weight:900;margin-right:1.5rem}.outlet .w_fence .top li:not(:first-child):before{content:">";left:-1.5rem;position:absolute}.outlet .w_fence .top li a{color:#fff}.outlet .w_fence .row .col{flex:0 0 20%;max-width:20%;padding:10px}.outlet .w_fence .row .col a{background:#fff;border:1px solid #b6b6b6;display:block;height:360px;overflow:hidden;padding:26px;text-align:center}.outlet .w_fence .row .col a img{height:228px;margin-bottom:2.8rem;-o-object-fit:contain;object-fit:contain;transition:transform .2s;width:228px}.outlet .w_fence .row .col a p{-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;line-height:1.1;margin:0;overflow:hidden;text-overflow:ellipsis}.outlet .w_fence .row .col:hover a img{transform:scale(1.2)}',""]);const i=n},10502:(t,e,o)=>{o.r(e),o.d(e,{default:()=>f});var a=o(87757),n=o.n(a),i=o(44670),r={pipette:{"01":"싱글피펫","02":"멀티피펫","03":"피펫에이드","04":"전자피펫","05":"팁","06":"거치대 / 스타트키트"},measure:{"01":"종합환경측정기","02":"미세먼지측정기","03":"수질측정기","04":"소음측정기","05":"온습도계","06":"기타측정기"},tweezer:{tmfl:"Flat tip tweezer",tmwf:"Wafer tweezer",tmfi:"Fine tip tweezer",tmtf:"Teflon & coating tweezer",tmra:"Reverse action tweezer",tmfb:"Fiber tip tweezer",tmpt:"Plastic tweezer",tmvc:"Vacuum tweezer"},hotplate:{IKA:"IKA","AS ONE":"AS ONE",대한과학:"대한과학","Lab companion":"Lab companion","Global Lab":"Global Lab",Corning:"Corning",미성과학기기:"미성과학기기","01":"온도별","02":"사이즈별","03":"기능형","04":"Hotplate&Stirrer"},meter:{"01":"OPHIR","02":"Thorlabs","03":"Newport","04":"Power/Energy Meter","05":"Photodiode Detector","06":"Thermal Detector"}};function l(t,e,o,a,n,i,r){try{var l=t[i](r),s=l.value}catch(t){return void o(t)}l.done?e(s):Promise.resolve(s).then(a,n)}function s(t){return function(){var e=this,o=arguments;return new Promise((function(a,n){var i=t.apply(e,o);function r(t){l(i,a,n,r,s,"next",t)}function s(t){l(i,a,n,r,s,"throw",t)}r(void 0)}))}}const c={components:{"loading-modal":function(){return o.e(2008).then(o.bind(o,32008))},hotplate:function(){return o.e(1951).then(o.bind(o,61951))}},data:function(){return{menu:r,list:{},isLoadingModalViewed:!0,frm:{page:0}}},methods:{index:function(){var t=arguments,e=this;return s(n().mark((function o(){var a,r;return n().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return a=t.length>0&&void 0!==t[0]?t[0]:1,e.frm.page=a,o.prev=2,o.next=5,i.Z.get("/api/shop/outlet/".concat(e.$route.params.type,"/").concat(e.$route.params.group),{params:e.frm});case 5:(r=o.sent)&&200===r.status&&(e.list=r.data,e.isLoadingModalViewed=!1),o.next=13;break;case 9:o.prev=9,o.t0=o.catch(2),Notify.consolePrint(o.t0),Notify.toast("warning",o.t0.response.data.message);case 13:case"end":return o.stop()}}),o,null,[[2,9]])})))()}},mounted:function(){this.index()}};var p=o(93379),u=o.n(p),d=o(81060),m={insert:"head",singleton:!1};u()(d.Z,m);d.Z.locals;const f=(0,o(51900).Z)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"outlet"},[o("div",{staticClass:"top_back"}),t._v(" "),t.isLoadingModalViewed?o("loading-modal",{attrs:{position:"absolute"},on:{"close-modal":function(e){t.isLoadingModalViewed=!1}}},[t._v("\r\n        Loading ......\r\n    ")]):o("b-container",{staticClass:"w_fence"},[o("ul",{staticClass:"top"},[o("li",[o("b-link",{attrs:{to:{name:"outlet"}}},[t._v("포사전문관")])],1),t._v(" "),o("li",["pipette"==t.$route.params.type?[t._v("피펫")]:"measure"==t.$route.params.type?[t._v("환경측정기")]:"tweezer"==t.$route.params.type?[t._v("트위져")]:"hotplate"==t.$route.params.type?[t._v("핫플레이트")]:"meter"==t.$route.params.type?[t._v("광파워미터")]:t._e()],2),t._v(" "),o("li",[t._v(t._s(t.menu[t.$route.params.type][t.$route.params.group]))])]),t._v(" "),t.list.data&&t.list.data.length?["hotplate"==t.$route.params.type&&-1!==["01","02","03","04"].indexOf(t.$route.params.group)?o("hotplate",{model:{value:t.list.data,callback:function(e){t.$set(t.list,"data",e)},expression:"list.data"}}):[t.list.data&&t.list.data.length?o("b-row",t._l(t.list.data,(function(e){return o("b-col",{key:e.gd_id},[o("b-link",{attrs:{to:{name:"goods_show",params:{gd_id:e.gd_id}}}},[o("b-img",{attrs:{src:e.image_src_thumb[0]}}),t._v(" "),o("p",[t._v(t._s(e.gd_name))])],1)],1)})),1):t._e()]]:o("b-alert",{attrs:{variant:"danger",show:""}},[t._v("No Item")]),t._v(" "),o("pagination",{staticClass:"mt-5",attrs:{data:t.list,align:"center"},on:{"pagination-change-page":t.index}})],2)],1)}),[],!1,null,null,null).exports}}]);