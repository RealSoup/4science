"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7579],{77579:(e,s,t)=>{t.r(s),t.d(s,{default:()=>c});const a={name:"TreeView",props:["sub_show","depth","cate","paramLink","papaName"],methods:{queryParam:function(e){if(0==this.depth)return{ca01:e};if(this.depth>0){var s=this.paramLink.split("/");switch(this.depth){case 1:return{ca01:s[1],ca02:e};case 2:return{ca01:s[1],ca02:s[2],ca03:e};case 3:return{ca01:s[1],ca02:s[2],ca03:s[3],ca04:e}}}},set_focus:function(e){Object.values(this.cate).forEach((function(s){s.ca_id==e?s.sub_show=!0:s.sub_show=!1}))}},beforeDestroy:function(){Object.values(this.cate).forEach((function(e){return e.sub_show=!1}))}};const c=(0,t(51900).Z)(a,(function(){var e=this,s=e._self._c;return s("ul",{ref:"dep02_ul"},e._l(e.cate,(function(t){return s("li",{key:t.ca_id,class:{focus:t.sub_show},on:{mouseenter:function(s){return e.set_focus(t.ca_id)}}},[s("b-link",{attrs:{to:{name:"goods_index",query:e.queryParam(t.ca_id)}}},[e._v(e._s(t.ca_name))]),e._v(" "),t.sub_show&&t.sub.length?s("tree-view",{key:t.ca_id,attrs:{cate:t.sub,depth:e.depth+1,sub_show:t.sub_show&&t.sub.length,paramLink:e.paramLink+"/"+t.ca_id}}):e._e()],1)})),0)}),[],!1,null,null,null).exports}}]);