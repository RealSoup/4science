"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3846],{1346:(t,a,e)=>{e.d(a,{Z:()=>n});var d=e(3645),i=e.n(d)()((function(t){return t[1]}));i.push([t.id,".p_warp[data-v-6c75e424]{margin-bottom:2rem}.head>div[data-v-6c75e424]{background:#666;color:#fff;font-weight:700}.body[data-v-6c75e424]:hover{background:#d8f2fd94}.body>div[data-v-6c75e424]:nth-child(2n){background-color:#7fffd454}.row[data-v-6c75e424]:not(:last-of-type){border-bottom:1px solid #333}.row>div[data-v-6c75e424]{font-size:.9rem;padding-bottom:15px;padding-top:15px}.row>div>span[data-v-6c75e424]:nth-of-type(2){float:right}.row>div[data-v-6c75e424]:first-of-type{flex:0 0 20%;max-width:20%}.row>div[data-v-6c75e424]:nth-of-type(2){flex:0 0 11%;max-width:11%}.row>div[data-v-6c75e424]:nth-of-type(3){flex:0 0 15%;max-width:15%}.row>div[data-v-6c75e424]:nth-of-type(5){flex:0 0 10%;max-width:10%}.viewXml[data-v-6c75e424]{display:inline-block;max-width:700px}.viewXml[data-v-6c75e424] div{border-radius:5px;margin:3px 10px;padding:3px 10px}.viewXml[data-v-6c75e424] span{color:#666;word-break:break-all}.viewXml[data-v-6c75e424] span.attributes{color:#000;display:inline-block;font-weight:700;width:150px}.viewXml[data-v-6c75e424] div.depth01{background-color:#f8f8f8}.viewXml[data-v-6c75e424] div.depth01 span.attributes{width:25px}.viewXml[data-v-6c75e424] div.depth01 div.depth02{background-color:#eee}.viewXml[data-v-6c75e424] div.depth01 div.depth02 span.attributes{width:85px}.viewXml[data-v-6c75e424] div.depth01 div.depth02 div.depth03{background-color:#e8e8e8}.viewXml[data-v-6c75e424] div.depth01 div.depth02 div.depth03 span.attributes{width:75px}.viewXml[data-v-6c75e424] div.depth01 div.depth02 div.depth03 span.attributes.indent{display:inline-block;float:left;width:25px}.viewXml[data-v-6c75e424] div.depth01 div.depth02 div.depth03 span.data.indent{display:inline-block;max-width:550px}.viewXml[data-v-6c75e424] div.depth01 div.depth02 div.depth03 div.depth04{background-color:#ddd}",""]);const n=i},3846:(t,a,e)=>{e.r(a),e.d(a,{default:()=>l});var d=e(7757),i=e.n(d),n=e(4670);function s(t,a,e,d,i,n,s){try{var o=t[n](s),r=o.value}catch(t){return void e(t)}o.done?a(r):Promise.resolve(r).then(d,i)}const o={name:"admShopB2bMerckStockResult",data:function(){return{list:{},page:1}},methods:{index:function(){var t,a=this;return(t=i().mark((function t(){var e;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,n.Z.get("/api/admin/shop/b2b_merck/stockResult",{params:{page:a.page}});case 3:(e=t.sent)&&200===e.status&&(a.list=e.data),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),Notify.consolePrint(t.t0),Notify.toast("warning",t.t0.response.data.message);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})),function(){var a=this,e=arguments;return new Promise((function(d,i){var n=t.apply(a,e);function o(t){s(n,d,i,o,r,"next",t)}function r(t){s(n,d,i,o,r,"throw",t)}o(void 0)}))})()},setPage:function(t){this.page=t,this.index()}},mounted:function(){this.index()}};var r=e(3379),p=e.n(r),v=e(1346),c={insert:"head",singleton:!1};p()(v.Z,c);v.Z.locals;const l=(0,e(1900).Z)(o,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("b-container",{staticClass:"p_warp"},[e("h3",[t._v("Merck Stock List")]),t._v(" "),e("b-row",{staticClass:"head"},[e("b-col",[e("span",[t._v("모델명")]),e("span",[t._v("가격")])]),t._v(" "),e("b-col",[e("span",[t._v("가능수량")]),e("span",[t._v("불가수량")])]),t._v(" "),e("b-col",[e("span",[t._v("선적일자")]),e("span",[t._v("불가능 수량 선적일자")])]),t._v(" "),e("b-col",[e("span",[t._v("추가정보")]),e("span",[t._v("작성일")])])],1),t._v(" "),t._l(t.list.data,(function(a){return e("b-row",{key:a.bms_id,staticClass:"body"},[e("b-col",[e("span",[t._v(t._s(a.bms_data.ProductResponse.SupplierPartNumber))]),t._v(" "),e("span",[t._v(t._s(t._f("comma")(a.bms_data.ProductResponse.UnitPrice))+" 원")])]),t._v(" "),e("b-col",[e("span",[t._v(t._s(a.bms_data.ProductResponse.QuantityAvailable))]),t._v(" "),e("span",[t._v(t._s(a.bms_data.ProductResponse.QuantityBackordered))])]),t._v(" "),e("b-col",[e("span",["string"==typeof a.bms_data.ProductResponse.ShipDate?[t._v(t._s(a.bms_data.ProductResponse.ShipDate))]:t._e()],2),t._v(" "),e("span",["string"==typeof a.bms_data.ProductResponse.BackorderShipDate?[t._v(t._s(a.bms_data.ProductResponse.BackorderShipDate))]:t._e()],2)]),t._v(" "),e("b-col",[e("span",{staticClass:"viewXml",domProps:{innerHTML:t._s(a.bms_data_other_info)}}),t._v(" "),e("span",[t._v(t._s(t._f("formatDate")(a.created_at)))])])],1)})),t._v(" "),e("pagination",{staticClass:"mt-5",attrs:{data:t.list,size:"small",limit:5,align:"center"},on:{"pagination-change-page":t.setPage}})],2)}),[],!1,null,"6c75e424",null).exports}}]);