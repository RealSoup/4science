"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2538],{25625:(t,e,a)=>{a.d(e,{Z:()=>n});var i=a(23645),o=a.n(i)()((function(t){return t[1]}));o.push([t.id,'#categorys[data-v-6bb4389b]{background:#626c75;position:relative;z-index:17}#categorys .depth01[data-v-6bb4389b]{display:flex}#categorys .depth01>li[data-v-6bb4389b]{cursor:pointer;width:4.761904%}#categorys .depth01>li .ca01[data-v-6bb4389b]{align-items:center;display:flex;flex-direction:column;height:100%;overflow:hidden;padding:8px 5px}#categorys .depth01>li:first-of-type .ca01[data-v-6bb4389b]{padding-left:0}#categorys .depth01>li:first-of-type ul[data-v-6bb4389b]{display:none}#categorys .depth01>li:first-of-type ul.all_show[data-v-6bb4389b]{display:block}#categorys .depth01>li:last-of-type .ca01[data-v-6bb4389b]{padding-right:0}#categorys .depth01>li .ca01 img[data-v-6bb4389b]{width:46px}#categorys .depth01>li .ca01 span[data-v-6bb4389b]{color:#fff;font-size:.2rem;letter-spacing:-4px;transition:.3s;white-space:nowrap}#categorys .depth01>li.active .ca01 span[data-v-6bb4389b],#categorys .depth01>li:hover .ca01 span[data-v-6bb4389b]{background:#626c75;color:#fff200;font-size:.8rem;font-weight:700;letter-spacing:-1px;padding:0 10px;z-index:2}#categorys .depth01>li .icon_cell[data-v-6bb4389b]{align-items:center;display:flex;height:100%;line-height:20px;text-align:center}#categorys .depth01>li .icon_cell i[data-v-6bb4389b]{color:#eee;font-size:.8rem;font-style:normal;letter-spacing:-.1px}#categorys .depth01>li .icon_cell i p[data-v-6bb4389b]{line-height:13px;margin-bottom:0}#categorys ul[data-v-6bb4389b] ul{background-color:#fff;border:2px solid #000;padding:.5rem;position:absolute;width:15rem;z-index:10}#categorys>ul>li>ul[data-v-6bb4389b]:before{background:url(https://fourscience.s3.ap-northeast-2.amazonaws.com/common/cate/semo.png) no-repeat 50%;content:"";height:34px;left:20px;position:absolute;top:-32px;width:31px}#categorys ul[data-v-6bb4389b] ul li{position:relative}#categorys ul[data-v-6bb4389b] ul li a{border-radius:.4rem;display:block;font-size:14px;padding:5px 10px;transition:all .2s}#categorys ul[data-v-6bb4389b] ul li:not(.depth01_tit):hover>a{background-color:#777;color:#fff;font-family:Malgun Gothic,serif;font-size:1.2rem;font-weight:700;padding:10px}#categorys ul[data-v-6bb4389b] ul ul{left:13.5rem;top:0}.slideUpDown-enter-to[data-v-6bb4389b],.slideUpDown-leave[data-v-6bb4389b]{max-height:auto}.slideUpDown-enter-active[data-v-6bb4389b]{transition:max-height .4s}.slideUpDown-enter[data-v-6bb4389b],.slideUpDown-leave-to[data-v-6bb4389b]{max-height:0}@media (max-width:992px){#categorys .depth01>li[data-v-6bb4389b]:first-of-type{height:0;width:0}#categorys .depth01>li:first-of-type .ca01[data-v-6bb4389b]{padding:0}#categorys .depth01>li[data-v-6bb4389b]:not(:first-of-type){display:none}#categorys .depth01>li:first-of-type ul[data-v-6bb4389b]{display:block!important}#categorys .depth01>li:first-of-type ul[data-v-6bb4389b]:before{content:none}}',""]);const n=o},92538:(t,e,a)=>{a.r(e),a.d(e,{default:()=>d});function i(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function o(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}const n={name:"ModuleCategory",components:{CateSub:function(){return a.e(1134).then(a.bind(a,51134))},CateSubAll:function(){return a.e(1422).then(a.bind(a,1422))}},data:function(){return{cus_hover:!1,all_show:!1}},computed:function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?i(Object(a),!0).forEach((function(e){o(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}({},(0,a(20629).rn)("category",["category","category_all"])),methods:{check_query:function(t){return this.$route.query.ca01==t}}};var s=a(93379),c=a.n(s),r=a(25625),l={insert:"head",singleton:!1};c()(r.Z,l);r.Z.locals;const d=(0,a(51900).Z)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"categorys"}},[a("ul",{staticClass:"depth01 layout"},[a("li",{on:{click:function(e){t.all_show=!0},mouseleave:function(e){t.all_show=!1}}},[a("span",{staticClass:"ca01"},[t.all_show?a("img",{attrs:{src:t.s3url+"common/cate/all_.png"}}):a("img",{attrs:{src:t.s3url+"common/cate/all.png"}})]),t._v(" "),a("ul",{class:{all_show:t.all_show}},t._l(t.category_all,(function(e){return a("li",{key:"all"+e.ca_id,on:{mouseenter:function(t){e.sub_show=!0},mouseleave:function(t){e.sub_show=!1}}},[a("b-link",{attrs:{to:{name:"goods_index",query:{ca01:e.ca_id}}},on:{click:function(e){return t.$emit("close_cate")}}},[t._v(t._s(e.ca_name))]),t._v(" "),a("CateSub",{attrs:{sub_show:e.sub_show&&e.sub.length,depth:1,cate:e.sub,paramLink:"/"+e.ca_id}})],1)})),0)]),t._v(" "),t._l(t.category,(function(e){return a("li",{key:e.ca_id,class:{active:t.check_query(e.ca_id)},on:{click:function(t){e.sub_show=!0},mouseleave:function(t){e.sub_show=!1}}},[a("span",{staticClass:"ca01",on:{mouseenter:function(t){e.show_txt=!0},mouseleave:function(t){e.show_txt=!1}}},[a("transition",{attrs:{name:"slideUpDown"}},[e.show_txt?t._e():a("div",{staticClass:"icon_cell"},[t.check_query(e.ca_id)||e.sub_show?a("img",{attrs:{src:t.s3url+"common/cate/"+e.ca_id+"_.png"}}):a("img",{attrs:{src:t.s3url+"common/cate/"+e.ca_id+".png"}})])]),t._v(" "),a("transition",{attrs:{name:"slideUpDown"}},[e.show_txt?a("div",{staticClass:"icon_cell"},[21==e.ca_id?a("i",[t._v("레이저"),a("br"),t._v("광학기기")]):23==e.ca_id?a("i",[a("p",[t._v("데이터"),a("br"),t._v("처리장치")]),t._v("소프트웨어")]):22==e.ca_id?a("i",[t._v("현미경"),a("br"),t._v("영상기기")]):25==e.ca_id?a("i",[t._v("분석기기")]):24==e.ca_id?a("i",[t._v("계측기"),a("br"),t._v("전원공급기")]):26==e.ca_id?a("i",[t._v("이화학기기")]):27==e.ca_id?a("i",[t._v("초자")]):40==e.ca_id?a("i",[t._v("Merck"),a("p",[t._v("SIGMA-"),a("br"),t._v("ALDRICH")])]):45==e.ca_id?a("i",[t._v("Good"),a("br"),t._v("Fellow")]):28==e.ca_id?a("i",[t._v("시약")]):29==e.ca_id?a("i",[t._v("재료"),a("br"),t._v("웨이퍼")]):30==e.ca_id?a("i",[t._v("클린룸용품")]):31==e.ca_id?a("i",[a("p",[t._v("진공/펌프"),a("br"),t._v("가스")]),t._v("반응용기")]):32==e.ca_id?a("i",[t._v("기계"),a("br"),t._v("로봇")]):33==e.ca_id?a("i",[t._v("공구")]):41==e.ca_id?a("i",[t._v("안전용품")]):34==e.ca_id?a("i",[a("p",[t._v("교육용"),a("br"),t._v("기자재")]),t._v("실험용가구")]):35==e.ca_id?a("i",[t._v("과학나라")]):38==e.ca_id?a("i",[t._v("Edmund")]):44==e.ca_id?a("i",[t._v("리퍼상품"),a("br"),t._v("할인판매")]):a("i",[t._v(t._s(e.ca_name))])]):t._e()])],1),t._v(" "),a("CateSub",{attrs:{sub_show:e.sub_show&&e.sub.length,depth:1,cate:e.sub,paramLink:"/"+e.ca_id,papaName:e.ca_name}})],1)})),t._v(" "),a("li",{on:{mouseenter:function(e){t.cus_hover=!0},mouseleave:function(e){t.cus_hover=!1}}},[a("span",{staticClass:"ca01"},[a("transition",{attrs:{name:"slideUpDown"}},[t.cus_hover?t._e():a("div",{staticClass:"icon_cell"},[a("b-link",{staticStyle:{padding:"0"},attrs:{to:{name:"estimate_custom_index"}}},[a("img",{attrs:{src:t.s3url+"common/cate/custom.png"}})])],1)]),t._v(" "),a("transition",{attrs:{name:"slideUpDown"}},[t.cus_hover?a("div",{staticClass:"icon_cell"},[a("b-link",{staticStyle:{padding:"0"},attrs:{to:{name:"estimate_custom_index"}}},[a("i",[t._v("주문제작")])])],1):t._e()])],1)])],2)])}),[],!1,null,"6bb4389b",null).exports}}]);