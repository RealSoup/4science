"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7769],{4999:(t,e,i)=>{i.d(e,{Z:()=>o});var r=i(3645),a=i.n(r)()((function(t){return t[1]}));a.push([t.id,".sch_detail .row .col[data-v-59e24016]{border:1px solid #d7d7d7;max-height:250px;overflow-y:auto;padding:0 0 .3rem}.sch_detail .row .col[data-v-59e24016]:not(:last-child){border-right-width:0}.sch_detail .row .col h5[data-v-59e24016]{font-size:1.1rem;font-weight:700;padding:1.4rem 2rem .4rem}.sch_detail .row .col p[data-v-59e24016]{color:#4c4c4c;cursor:pointer;margin:0;padding:.3rem 3rem}.sch_detail .row .col p.chk[data-v-59e24016],.sch_detail .row .col p[data-v-59e24016]:hover{background:#b2e0fa}.sch_detail .row .col p span[data-v-59e24016]{color:#c2c2c2;font-size:.8rem;margin-left:.5rem}.pick[data-v-59e24016]{background:#0094ea;margin-top:25px}.pick .row .fir[data-v-59e24016]{flex:0 0 120px;margin-right:25px;max-width:120px}.pick .row .col[data-v-59e24016]{padding:20px 0}.pick .row .col ul li[data-v-59e24016]{background:#fff;border-color:#0094ea;border-style:solid;border-width:10px 20px;cursor:pointer;flex:0 0 13%;height:150px;max-width:13%;overflow:hidden;padding:0 10px;text-align:center;transition:all .2s}.pick .row .col ul.active li[data-v-59e24016]{flex:0 0 16.666667%;height:300px;max-width:16.666667%}.pick .row .col ul li div[data-v-59e24016]{height:99%;position:relative;transition:all .2s}.pick .row .col ul.active li div[data-v-59e24016]{height:75%}.pick .row .col ul li div img[data-v-59e24016]{left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:90%}.pick .row .col ul li .tit[data-v-59e24016]{font-weight:700;margin:auto;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pick .row .col ul li .pri[data-v-59e24016]{font-size:.7rem;margin:.3rem 0 0}.list[data-v-59e24016]{align-items:flex-start;margin-top:25px}.list .sort[data-v-59e24016]{flex:0 0 9%;max-width:9%}.list .sort ul[data-v-59e24016]{border:1px solid #d7d7d7;margin-left:-15px}.list .sort ul li[data-v-59e24016]{cursor:pointer;font-size:.9rem;padding:10px 0;text-align:center}.list .sort ul li[data-v-59e24016]:not(:last-child){border-bottom:1px solid #d7d7d7}.list .sort ul li.active[data-v-59e24016]{background:#b2e0fa}.list .col .row div[data-v-59e24016]:nth-child(2),.list .col .row div[data-v-59e24016]:nth-child(3){align-items:center;display:flex;flex:0 0 17%;justify-content:center;max-width:17%}.list .col .lhead div[data-v-59e24016]{background:#dfeaf0;border:1px solid #d6d6d6;font-weight:700;letter-spacing:10px;padding:.7rem 0;text-align:center}.list .col .lhead div[data-v-59e24016]:not(:first-child){border-left-width:0}.list .col .lbody div[data-v-59e24016]{border:1px solid #d6d6d6;border-top:0 solid #d6d6d6}.list .col .lbody div[data-v-59e24016]:not(:first-child){border-left-width:0}.list .col .lbody .link[data-v-59e24016]{align-items:center;cursor:pointer;display:flex}.list .col .lbody .link img[data-v-59e24016]{border:1px solid #ddd;height:150px;margin:15px 30px 15px 0;width:150px}.list .col .lbody .link p[data-v-59e24016]{display:inline-block;margin-bottom:0}.list .col .lbody .link p span[data-v-59e24016]{color:#949494;display:block;margin-top:1.4rem}.list .col .lbody .price[data-v-59e24016]{font-weight:700}",""]);const o=a},7769:(t,e,i)=>{i.r(e),i.d(e,{default:()=>d});function r(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,r)}return i}function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}const o={components:{Location:function(){return i.e(4529).then(i.bind(i,4529))},Search:function(){return i.e(1087).then(i.bind(i,1087))},LoadingModal:function(){return i.e(2891).then(i.bind(i,2891))}},data:function(){return{pick_hover:0}},watch:{},computed:function(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?r(Object(i),!0).forEach((function(e){a(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}({},(0,i(629).rn)("goods",["frm","list","isLoadingModalViewed","sch_cate_info","pick","categorys"])),methods:{numCalc:function(t){return this.list.total-(this.list.current_page-1)*this.list.per_page-t},setPage:function(t){this.frm.page=t,this.routerPush()},sort:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.frm.sort=t,this.routerPush()},routerPush:function(){this.$store.dispatch("goods/routerPush")},actHover:function(t){this.pick_hover=t}}};var c=i(3379),n=i.n(c),s=i(4999),l={insert:"head",singleton:!1};n()(s.Z,l);s.Z.locals;const d=(0,i(1900).Z)(o,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"p_wrap"},[t.isLoadingModalViewed?i("LoadingModal",{attrs:{position:"absolute"},on:{"close-modal":function(e){t.isLoadingModalViewed=!1}}},[t._v("\r\n        Loading ......\r\n    ")]):["goods_index"!=t.$route.name||t.$route.query.keyword?t._e():i("Location",{attrs:{categorys:t.categorys,p_ca01:t.$route.query.ca01,p_ca02:t.$route.query.ca02,p_ca03:t.$route.query.ca03,p_ca04:t.$route.query.ca04}}),t._v(" "),t.sch_cate_info?i("div",{staticClass:"layout"},[i("b-container",{staticClass:"sch_detail"},[i("b-row",[i("b-col",[i("h5",[t._v("카테고리")]),t._v(" "),i("p",{on:{click:function(e){t.frm.ca01=0,t.frm.ca02=0,t.frm.ca03=0,t.frm.mk_id=0,t.routerPush()}}},[t._v("전체보기 "),i("span",[t._v(t._s(t.sch_cate_info.all))])]),t._v(" "),t._l(t.sch_cate_info.ca01,(function(e,r){return i("p",{key:e.key,class:{chk:t.frm.ca01==e.key},on:{click:function(i){t.frm.ca01=e.key,t.frm.ca02=0,t.frm.ca03=0,t.frm.mk_id=0,t.routerPush()}}},[t._v("\r\n                            "+t._s(e.name)+" "),i("span",[t._v(t._s(e.cnt))])])}))],2),t._v(" "),i("b-col",[i("h5",[t._v("중분류")]),t._v(" "),t._l(t.sch_cate_info.ca02,(function(e,r){return i("p",{key:e.key,class:{chk:t.frm.ca02==e.key},on:{click:function(i){t.frm.ca02=e.key,t.frm.ca03=0,t.frm.mk_id=0,t.routerPush()}}},[t._v("\r\n                            "+t._s(e.name)+" "),i("span",[t._v(t._s(e.cnt))])])}))],2),t._v(" "),i("b-col",[i("h5",[t._v("소분류")]),t._v(" "),t._l(t.sch_cate_info.ca03,(function(e,r){return i("p",{key:e.key,class:{chk:t.frm.ca03==e.key},on:{click:function(i){t.frm.ca03=e.key,t.frm.mk_id=0,t.routerPush()}}},[t._v("\r\n                            "+t._s(e.name)+" "),i("span",[t._v(t._s(e.cnt))])])}))],2),t._v(" "),i("b-col",[i("h5",[t._v("제조사")]),t._v(" "),t._l(t.sch_cate_info.maker,(function(e,r){return i("p",{key:e.key,class:{chk:t.frm.mk_id==e.key},on:{click:function(i){t.frm.mk_id=e.key,t.routerPush()}}},[t._v("\r\n                            "+t._s(e.name)+" "),i("span",[t._v(t._s(e.cnt))])])}))],2)],1)],1)],1):t._e(),t._v(" "),i("div",{staticClass:"pick"},[i("b-row",{staticClass:"layout"},[i("b-col",{staticClass:"fir"},[i("b-img",{attrs:{src:t.s3url+"goods/4spick.png"}})],1),t._v(" "),i("b-col",t._l(t.pick,(function(e,r){return i("b-row",{key:r,class:{active:r==t.pick_hover},attrs:{tag:"ul"},on:{mouseover:function(e){return t.actHover(r)}}},t._l(e,(function(e){return i("b-link",{key:e.gd_id,attrs:{to:{name:"goods_show",params:{gd_id:e.gd_id}},"router-tag":"li"}},[i("div",[i("img",{attrs:{src:e.image_src_thumb[0]}})]),t._v(" "),i("p",{staticClass:"tit"},[t._v(t._s(e.gd_name))]),t._v(" "),i("p",{staticClass:"pri"},[t._v(t._s(t._f("comma")(e.gm_price_add_vat))+"원")])])})),1)})),1)],1)],1),t._v(" "),i("div",{staticClass:"layout"},[i("b-container",[i("b-row",{staticClass:"list"},[i("b-col",{staticClass:"sort"},[i("ul",[i("li",{class:{active:""==t.frm.sort},on:{click:function(e){return t.sort()}}},[t._v("인기상품순")]),t._v(" "),i("li",{class:{active:"new"==t.frm.sort},on:{click:function(e){return t.sort("new")}}},[t._v("신상품순")]),t._v(" "),i("li",{class:{active:"lowPri"==t.frm.sort},on:{click:function(e){return t.sort("lowPri")}}},[t._v("낮은가격순")]),t._v(" "),i("li",{class:{active:"highPri"==t.frm.sort},on:{click:function(e){return t.sort("highPri")}}},[t._v("높은가격순")])])]),t._v(" "),i("b-col",[i("b-row",{staticClass:"lhead"},[i("b-col",[t._v("상품")]),t._v(" "),i("b-col",[t._v("가격")]),t._v(" "),i("b-col",[t._v("제조사")])],1),t._v(" "),t.list.data&&t.list.data.length?t._l(t.list.data,(function(e,r){return i("b-row",{key:e.gd_id,staticClass:"lbody"},[i("b-link",{staticClass:"col link",attrs:{to:{name:"goods_show",params:{gd_id:e.gd_id}},"router-tag":"div"}},[i("img",{attrs:{src:e.image_src_thumb[0]}}),t._v(" "),i("p",[i("b",[t._v(t._s(e.gd_name))]),t._v(" "),i("span",[t._v(" "+t._s(e.gm_code)+" / "+t._s(e.gm_spec)+" / "+t._s(e.gm_unit))])])]),t._v(" "),i("b-col",{staticClass:"price"},[t._v("\r\n                                    "+t._s(t._f("comma")(e.gm_price_add_vat))+" \r\n                                    "),e.gm_price_add_vat>0?[t._v("원")]:t._e()],2),t._v(" "),i("b-col",[t._v(t._s(e.mk_name))])],1)})):i("b-alert",{attrs:{variant:"danger",show:""}},[t._v("No Item")]),t._v(" "),i("pagination",{staticClass:"mt-5",attrs:{data:t.list,size:"small",limit:5,align:"center"},on:{"pagination-change-page":t.setPage}})],2)],1)],1)],1)]],2)}),[],!1,null,"59e24016",null).exports}}]);