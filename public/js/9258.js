"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9258],{43964:(e,d,a)=>{a.d(d,{Z:()=>s});var o=a(23645),t=a.n(o)()((function(e){return e[1]}));t.push([e.id,"#order_list .row .col[data-v-aee9b4c0]{font-weight:600}#order_list .row .col[data-v-aee9b4c0]:first-child{flex:0 0 6%;max-width:6%}#order_list .row .col[data-v-aee9b4c0]:nth-child(2){flex:0 0 9%;max-width:9%}#order_list .row .col[data-v-aee9b4c0]:nth-child(4),#order_list .row .col[data-v-aee9b4c0]:nth-child(5){flex:0 0 7%;max-width:7%}#order_list .row .col[data-v-aee9b4c0]:nth-child(6){border-right:1px solid #ccc;flex:0 0 9%;max-width:9%}#order_list .row .col[data-v-aee9b4c0]:nth-child(7){flex:0 0 8%;max-width:8%}#order_list .row .col[data-v-aee9b4c0]:nth-child(8){border-right:1px solid #ccc;flex:0 0 7%;max-width:7%}#order_list .row .col[data-v-aee9b4c0]:nth-child(9){flex:0 0 7%;max-width:7%}#order_list .row .col[data-v-aee9b4c0]:nth-child(10){flex:0 0 5%;max-width:5%}#order_list .body .col[data-v-aee9b4c0]:nth-child(3){text-align:left}#order_list .body[data-v-aee9b4c0]:hover{background:#b2e0fa}#order_list .cancel[data-v-aee9b4c0]{background:#d7d7d7}#order_list .cancel .col[data-v-aee9b4c0]{color:#9f9f9f}#order_list .don_t[data-v-aee9b4c0]{background:#fece02}#order_list .introducer[data-v-aee9b4c0]{background:#44adf1}#order_list .body .step span[data-v-aee9b4c0]{border-radius:.3rem;border-style:solid;border-width:1px;display:inline-block;font-size:.9rem;line-height:1rem;padding:.25rem 0;width:90px}#order_list .body .orderer[data-v-aee9b4c0],#order_list .body .type[data-v-aee9b4c0]{line-height:1.5rem}#order_list .body .orderer span .badge[data-v-aee9b4c0],#order_list .body .type span .badge[data-v-aee9b4c0]{border-radius:0;display:inline-block;font-size:.9rem;line-height:1rem;padding:.25rem 0;width:70px}#order_list .body .col .badge[data-v-aee9b4c0]{border-radius:50%;padding:.4rem}@media (max-width:991px){#order_list .row .col[data-v-aee9b4c0]{font-size:.75rem;line-height:1.4;padding:.4rem}#order_list .row .col[data-v-aee9b4c0]:nth-child(8){flex:0 0 13%;max-width:13%}#order_list .body .col[data-v-aee9b4c0]:nth-child(8){padding-right:3px;text-align:right}#order_list .body .step span[data-v-aee9b4c0]{font-size:.75rem;margin:auto;padding:0;width:30px}}",""]);const s=t},49258:(e,d,a)=>{a.r(d),a.d(d,{default:()=>n});const o={name:"AdmOrderIndexList",props:["list","config","mng_off"],components:{"sub-string":function(){return a.e(4415).then(a.bind(a,84415))}}};var t=a(93379),s=a.n(t),l=a(43964),r={insert:"head",singleton:!1};s()(l.Z,r);l.Z.locals;const n=(0,a(51900).Z)(o,(function(){var e=this,d=e.$createElement,a=e._self._c||d;return a("div",{attrs:{id:"order_list"}},[a("b-row",{staticClass:"head"},[a("b-col",{staticClass:"d-none d-lg-block"},[e._v("글번호")]),e._v(" "),a("b-col",{staticClass:"d-none d-lg-block"},[e._v("주문번호")]),e._v(" "),a("b-col",[e._v("주문상품")]),e._v(" "),a("b-col",[e._v("주문자")]),e._v(" "),a("b-col",{staticClass:"d-none d-lg-block"},[e._v("주문유형")]),e._v(" "),a("b-col",[e._v("주문일")]),e._v(" "),a("b-col",{staticClass:"d-none d-lg-block"},[e._v("결제수단")]),e._v(" "),a("b-col",[e._v("결제금액")]),e._v(" "),a("b-col",[a("span",{staticClass:"d-none d-lg-inline-block"},[e._v("진행")]),e._v("현황")]),e._v(" "),a("b-col",{staticClass:"d-none d-lg-block"},[e._v("담당자")])],1),e._v(" "),e._l(e.list,(function(d){return a("b-row",{key:d.mk_id,staticClass:"body",class:{cancel:60==d.od_step,don_t:d.user&&3==d.user.group,introducer:d.user.introducer}},[a("b-col",{staticClass:"d-none d-lg-block"},[e._v(e._s(d.od_id)+".")]),e._v(" "),a("b-col",{staticClass:"d-none d-lg-block"},[e._v(e._s(d.od_no))]),e._v(" "),a("b-link",{staticClass:"col",attrs:{to:{name:"adm_order_edit",params:{od_id:d.od_id}}}},[e._v(e._s(d.od_name))]),e._v(" "),a("b-col",{staticClass:"orderer"},[d.user&&d.user.is_dealer?a("b-badge",{staticClass:"d_blue d-none d-lg-inline-block"},[e._v("딜")]):e._e(),e._v(" "),a("span",[a("sub-string",{attrs:{width:120},model:{value:d.od_orderer,callback:function(a){e.$set(d,"od_orderer",a)},expression:"row.od_orderer"}}),e._v(" "),a("br",{staticClass:"d-none d-lg-block"}),e._v(" "),d.user&&d.user.mng?a("b-badge",{staticClass:"orange d-none d-lg-inline-block"},[e._v(e._s(e.mng_off[d.user.mng].name))]):e._e()],1)],1),e._v(" "),a("b-col",{staticClass:"type d-none d-lg-block"},["A"==d.od_sale_env?a("b-badge",{staticClass:"orange"},[e._v("앱")]):e._e(),e._v(" "),a("span",[e._v("\r\n                "+e._s(e.config.type[d.od_type])+"\r\n                "),a("br"),e._v(" "),d.eq_mng_id?a("b-badge",{staticClass:"mint"},[e.mng_off[d.eq_mng_id]?[e._v(e._s(e.mng_off[d.eq_mng_id].name))]:[e._v(e._s(d.eq_mng_id))]],2):e._e()],1)],1),e._v(" "),a("b-col",[e._v(e._s(e._f("formatDate")(d.created_at)))]),e._v(" "),a("b-col",{staticClass:"d-none d-lg-block"},[e._v(e._s(e.config.pay_method[d.od_pay_method]))]),e._v(" "),a("b-col",[e._v(e._s(e._f("comma")(d.od_all_price)))]),e._v(" "),a("b-col",{staticClass:"step"},[a("span",{staticClass:"d-none d-lg-inline-block",class:e.config.step[d.od_step].class},[e._v(e._s(e.config.step[d.od_step].name))]),e._v(" "),a("span",{staticClass:"d-lg-none d-inline-block",class:e.config.step[d.od_step].class},[e._v(e._s(e.config.step[d.od_step].sm_name))])]),e._v(" "),a("b-col",{staticClass:"d-none d-lg-block"},[d.od_mng?a("span",[e.mng_off[d.od_mng]?[e._v(e._s(e.mng_off[d.od_mng].name))]:[e._v(e._s(d.od_mng))]],2):e._e()])],1)}))],2)}),[],!1,null,"aee9b4c0",null).exports}}]);