"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5289],{94397:(d,a,o)=>{o.d(a,{Z:()=>s});var e=o(23645),t=o.n(e)()((function(d){return d[1]}));t.push([d.id,"#order_list .row .col[data-v-5a528b59]{font-weight:600}#order_list .row .col[data-v-5a528b59]:first-child{flex:0 0 6%;max-width:6%}#order_list .row .col[data-v-5a528b59]:nth-child(2){flex:0 0 9%;max-width:9%}#order_list .row .col[data-v-5a528b59]:nth-child(4),#order_list .row .col[data-v-5a528b59]:nth-child(5){flex:0 0 7%;max-width:7%}#order_list .row .col[data-v-5a528b59]:nth-child(6){border-right:1px solid #ccc;flex:0 0 9%;max-width:9%}#order_list .row .col[data-v-5a528b59]:nth-child(7){flex:0 0 8%;max-width:8%}#order_list .row .col[data-v-5a528b59]:nth-child(8){border-right:1px solid #ccc;flex:0 0 7%;max-width:7%}#order_list .row .col[data-v-5a528b59]:nth-child(9){flex:0 0 7%;max-width:7%}#order_list .row .col[data-v-5a528b59]:nth-child(10){flex:0 0 5%;max-width:5%}#order_list .body .col[data-v-5a528b59]:nth-child(3){text-align:left}#order_list .body[data-v-5a528b59]:hover{background:#b2e0fa}#order_list .cancel[data-v-5a528b59]{background:#d7d7d7}#order_list .cancel .col[data-v-5a528b59]{color:#9f9f9f}#order_list .don_t[data-v-5a528b59]{background:#fece02}#order_list .body .step span[data-v-5a528b59]{border-radius:.3rem;border-style:solid;border-width:1px;display:inline-block;font-size:.9rem;line-height:1rem;padding:.25rem 0;width:90px}#order_list .body .orderer[data-v-5a528b59],#order_list .body .type[data-v-5a528b59]{line-height:1.5rem}#order_list .body .orderer span .badge[data-v-5a528b59],#order_list .body .type span .badge[data-v-5a528b59]{border-radius:0;display:inline-block;font-size:.9rem;line-height:1rem;padding:.25rem 0;width:70px}#order_list .body .col .badge[data-v-5a528b59]{border-radius:50%;padding:.4rem}@media (max-width:991px){#order_list .row .col[data-v-5a528b59]{font-size:.75rem;line-height:1.4;padding:.4rem}#order_list .row .col[data-v-5a528b59]:nth-child(8){flex:0 0 13%;max-width:13%}#order_list .body .col[data-v-5a528b59]:nth-child(8){padding-right:3px;text-align:right}#order_list .body .step span[data-v-5a528b59]{font-size:.75rem;margin:auto;padding:0;width:30px}}",""]);const s=t},35289:(d,a,o)=>{o.r(a),o.d(a,{default:()=>n});const e={name:"AdmOrderIndexList",props:["list","config","mng_off"],components:{"sub-string":function(){return o.e(4415).then(o.bind(o,84415))}}};var t=o(93379),s=o.n(t),l=o(94397),r={insert:"head",singleton:!1};s()(l.Z,r);l.Z.locals;const n=(0,o(51900).Z)(e,(function(){var d=this,a=d.$createElement,o=d._self._c||a;return o("div",{attrs:{id:"order_list"}},[o("b-row",{staticClass:"head"},[o("b-col",{staticClass:"d-none d-lg-block"},[d._v("글번호")]),d._v(" "),o("b-col",{staticClass:"d-none d-lg-block"},[d._v("주문번호")]),d._v(" "),o("b-col",[d._v("주문상품")]),d._v(" "),o("b-col",[d._v("주문자")]),d._v(" "),o("b-col",{staticClass:"d-none d-lg-block"},[d._v("주문유형")]),d._v(" "),o("b-col",[d._v("주문일")]),d._v(" "),o("b-col",{staticClass:"d-none d-lg-block"},[d._v("결제수단")]),d._v(" "),o("b-col",[d._v("결제금액")]),d._v(" "),o("b-col",[o("span",{staticClass:"d-none d-lg-inline-block"},[d._v("진행")]),d._v("현황")]),d._v(" "),o("b-col",{staticClass:"d-none d-lg-block"},[d._v("담당자")])],1),d._v(" "),d._l(d.list,(function(a){return o("b-row",{key:a.mk_id,staticClass:"body",class:{cancel:60==a.od_step,don_t:a.user&&3==a.user.group}},[o("b-col",{staticClass:"d-none d-lg-block"},[d._v(d._s(a.od_id)+".")]),d._v(" "),o("b-col",{staticClass:"d-none d-lg-block"},[d._v(d._s(a.od_no))]),d._v(" "),o("b-link",{staticClass:"col",attrs:{to:{name:"adm_order_edit",params:{od_id:a.od_id}}}},[d._v(d._s(a.od_name))]),d._v(" "),o("b-col",{staticClass:"orderer"},[a.user&&a.user.is_dealer?o("b-badge",{staticClass:"d_blue d-none d-lg-inline-block"},[d._v("딜")]):d._e(),d._v(" "),o("span",[o("sub-string",{attrs:{width:120},model:{value:a.od_orderer,callback:function(o){d.$set(a,"od_orderer",o)},expression:"row.od_orderer"}}),d._v(" "),o("br",{staticClass:"d-none d-lg-block"}),d._v(" "),a.user&&a.user.mng?o("b-badge",{staticClass:"orange d-none d-lg-inline-block"},[d._v(d._s(d.mng_off[a.user.mng].name))]):d._e()],1)],1),d._v(" "),o("b-col",{staticClass:"type d-none d-lg-block"},["A"==a.od_sale_env?o("b-badge",{staticClass:"orange"},[d._v("앱")]):d._e(),d._v(" "),o("span",[d._v("\r\n                "+d._s(d.config.type[a.od_type])+"\r\n                "),o("br"),d._v(" "),a.er_mng_id?o("b-badge",{staticClass:"mint"},[d.mng_off[a.er_mng_id]?[d._v(d._s(d.mng_off[a.er_mng_id].name))]:[d._v(d._s(a.er_mng_id))]],2):d._e()],1)],1),d._v(" "),o("b-col",[d._v(d._s(d._f("formatDate")(a.created_at)))]),d._v(" "),o("b-col",{staticClass:"d-none d-lg-block"},[d._v(d._s(d.config.pay_method[a.od_pay_method]))]),d._v(" "),o("b-col",[d._v(d._s(d._f("comma")(a.od_all_price)))]),d._v(" "),o("b-col",{staticClass:"step"},[o("span",{staticClass:"d-none d-lg-inline-block",class:d.config.step[a.od_step].class},[d._v(d._s(d.config.step[a.od_step].name))]),d._v(" "),o("span",{staticClass:"d-lg-none d-inline-block",class:d.config.step[a.od_step].class},[d._v(d._s(d.config.step[a.od_step].sm_name))])]),d._v(" "),o("b-col",{staticClass:"d-none d-lg-block"},[a.od_mng?o("span",[d.mng_off[a.od_mng]?[d._v(d._s(d.mng_off[a.od_mng].name))]:[d._v(d._s(a.od_mng))]],2):d._e()])],1)}))],2)}),[],!1,null,"5a528b59",null).exports}}]);