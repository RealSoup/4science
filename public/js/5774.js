"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5774],{50335:(e,a,s)=>{s.r(a),s.d(a,{default:()=>n});const t={name:"TreeView",props:["sub_show","depth","cate","paramLink","papaName"],methods:{queryParam:function(e){if(0==this.depth)return{ca01:e};if(this.depth>0){var a=this.paramLink.split("/");switch(this.depth){case 1:return{ca01:a[1],ca02:e};case 2:return{ca01:a[1],ca02:a[2],ca03:e};case 3:return{ca01:a[1],ca02:a[2],ca03:a[3],ca04:e}}}}}};const n=(0,s(51900).Z)(t,(function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("ul",{ref:"dep02_ul"},e._l(e.cate,(function(a){return s("li",{key:a.ca_id,class:{focus:a.sub_show},on:{mouseenter:function(e){a.sub_show=!0},mouseleave:function(e){a.sub_show=!1}}},[s("b-link",{attrs:{to:{name:"goods_index",query:e.queryParam(a.ca_id)}}},[e._v(e._s(a.ca_name))]),e._v(" "),a.sub_show&&a.sub.length?s("tree-view",{key:a.ca_id,attrs:{cate:a.sub,depth:e.depth+1,sub_show:a.sub_show&&a.sub.length,paramLink:e.paramLink+"/"+a.ca_id}}):e._e()],1)})),0)}),[],!1,null,null,null).exports}}]);