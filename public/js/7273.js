"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7273],{4239:(t,e,i)=>{i.d(e,{Z:()=>n});var o=i(3645),a=i.n(o)()((function(t){return t[1]}));a.push([t.id,"#outlet_index[data-v-3793529f]{border-top:2px solid #6440c1}#outlet_index .left[data-v-3793529f],#outlet_index .right[data-v-3793529f]{padding-top:1rem}#outlet_index .right[data-v-3793529f]{overflow:hidden}#outlet_index .left[data-v-3793529f]{border-right:1px solid #6440c1}#outlet_index .left a[data-v-3793529f]{border:1px solid transparent;border-bottom-left-radius:.35rem;border-top-left-radius:.35rem;cursor:pointer;display:block;font-size:1.5rem;margin-right:-2px;padding:1rem 0 1rem 2rem}#outlet_index .left a.active[data-v-3793529f]{background-color:#6440c1;border-color:#6440c1 #fff #6440c1 #6440c1;color:#fff;font-weight:700}#outlet_index .right .nav li a[data-v-3793529f]{cursor:pointer}#outlet_index .right .subMenu[data-v-3793529f]{display:flex;margin-top:1rem}#outlet_index .right .subMenu li div[data-v-3793529f]{align-items:flex-start;display:flex;height:7rem;justify-content:center;max-width:10.9rem;min-width:7rem}#outlet_index .right .subMenu li:nth-child(2n) div[data-v-3793529f]{align-items:flex-end}#outlet_index .right .subMenu li div .child[data-v-3793529f]{cursor:pointer;padding:1rem;transition:transform .7s}#outlet_index .right .subMenu li.active div .child[data-v-3793529f],#outlet_index .right .subMenu li:hover div .child[data-v-3793529f]{box-shadow:0 1px 15px 1px rgba(100,64,193,.5);transform:scale(1.2)}#outlet_index .right ul.list[data-v-3793529f]{background:#262626;display:flex;flex-direction:row;flex-wrap:wrap;margin:70px auto 0;padding:10px;width:1300px}#outlet_index .right ul.list li[data-v-3793529f]{background:#ff0;box-sizing:border-box;display:inline-block;height:300px;margin:10px;position:relative;width:300px}#outlet_index .right ul.list li a[data-v-3793529f]{display:block;height:100%}#outlet_index .right ul.list li a .imgBox[data-v-3793529f]{height:100%;overflow:hidden;position:relative}#outlet_index .right ul.list li a .imgBox img[data-v-3793529f]{height:100%;max-width:100%;-o-object-fit:cover;object-fit:cover;transition:transform 2s;width:100%}#outlet_index .right ul.list li a:hover .imgBox img[data-v-3793529f]{transform:scale(1.2)}#outlet_index .right ul.list li a .details[data-v-3793529f]{background:rgba(0,0,0,.8);bottom:10px;left:10px;position:absolute;right:10px;top:10px;transform:scaleY(0);transition:transform .5s}#outlet_index .right ul.list li a:hover .details[data-v-3793529f]{transform:scaleY(1)}#outlet_index .right ul.list li a .details .content[data-v-3793529f]{color:#fff;padding:15px;position:absolute;text-align:center;top:50%;transform:translateY(-50%);width:100%}#outlet_index .right ul.list li a .details .content h3[data-v-3793529f]{color:#ff0;text-align:center}",""]);const n=a},7273:(t,e,i)=>{i.r(e),i.d(e,{default:()=>f});var o=i(7757),a=i.n(o),n=i(4670),l={other:[{img:"/img/outlet/pipette/thermo.png"},{img:"/img/outlet/pipette/witeg.png"},{img:"/img/outlet/pipette/gilson.png"},{img:"/img/outlet/pipette/eppendorf.png"},{img:"/img/outlet/pipette/axygen.png"},{img:"/img/outlet/pipette/sartorius.png"},{img:"/img/outlet/pipette/socorex.png"},{img:"/img/outlet/pipette/etc.png"}],outlet:[{h5:"싱글피펫"},{h5:"멀티피펫"},{h5:"피펫에이드"},{h5:"전자피펫"},{h5:"팁"},{h5:"거치대 / 스타트키트"}]},r=[{title:"IKA",text:"Witeg hotplate",url:"/shop/goods/",image:"/img/outlet/hotplate/ika.png"},{title:"AS ONE",text:"GILSON hotplate",url:"/shop/goods/",image:"/img/outlet/hotplate/asone.png"},{title:"DAIHAN Scientific",text:"eppendorf hotplate",url:"/shop/goods/",image:"/img/outlet/hotplate/daihan.png"},{title:"JEIO TECH",text:"axygen hotplate",url:"/shop/goods/",image:"/img/outlet/hotplate/jeiotech.png"},{title:"GLOBAL LAB",text:"sartorius hotplate",url:"/shop/goods/",image:"/img/outlet/hotplate/globallab.png"},{title:"CORNING",text:"socorex hotplate",url:"/shop/goods/",image:"/img/outlet/hotplate/corning.png"},{title:"M TOP",text:"Etc hotplate",url:"/shop/goods/",image:"/img/outlet/hotplate/mtops.png"}],s=[{kor:"피펫관",eng:"pipette"},{kor:"환경측정기관",eng:"measure"},{kor:"트위져관",eng:"tweezer"},{kor:"핫플레이트관",eng:"hotplate"},{kor:"광파워미터관",eng:"meter"}];function d(t,e,i,o,a,n,l){try{var r=t[n](l),s=r.value}catch(t){return void i(t)}r.done?e(s):Promise.resolve(s).then(o,a)}const u={components:{},watch:{"$route.params.code":function(){this.index()},group:function(){this.index()},type:function(){this.index()}},data:function(){return{menu:s,type:"other",typeList:{pipette:l,hotplate:r},group:1,list:{}}},methods:{index:function(){var t,e=this;return(t=a().mark((function t(){var i;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,n.Z.get("/api/shop/outlet/".concat(e.$route.params.code,"/").concat(e.type,"/").concat(e.group));case 3:(i=t.sent)&&200===i.status&&(e.list=i.data),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),Notify.consolePrint(t.t0),Notify.toast("warning",t.t0.response.data.message);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})),function(){var e=this,i=arguments;return new Promise((function(o,a){var n=t.apply(e,i);function l(t){d(n,o,a,l,r,"next",t)}function r(t){d(n,o,a,l,r,"throw",t)}l(void 0)}))})()}},mounted:function(){this.index()}};var p=i(3379),c=i.n(p),g=i(4239),h={insert:"head",singleton:!1};c()(g.Z,h);g.Z.locals;const f=(0,i(1900).Z)(u,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("b-row",{attrs:{id:"outlet_index"}},[i("b-col",{staticClass:"left pr-0",attrs:{cols:"2"}},t._l(t.menu,(function(e,o){return i("b-link",{key:o,class:{active:t.$route.params.code==e.eng},attrs:{to:{name:"outlet_index",params:{code:e.eng}}}},[t._v("\n            "+t._s(e.kor)+"\n        ")])})),1),t._v(" "),i("b-col",{staticClass:"right"},[i("ul",{staticClass:"nav nav-tabs"},[i("li",{staticClass:"nav-item"},[i("a",{staticClass:"nav-link",class:{active:"other"==t.type},on:{click:function(e){t.type="other"}}},[t._v("브랜드별")])]),t._v(" "),i("li",{staticClass:"nav-item"},[i("a",{staticClass:"nav-link",class:{active:"outlet"==t.type},on:{click:function(e){t.type="outlet"}}},[t._v("종류별")])])]),t._v(" "),i("ul",{staticClass:"subMenu"},t._l(t.typeList.pipette[t.type],(function(e,o){return i("li",{class:{active:t.group==o+1}},[i("div",{on:{click:function(e){t.group=o+1}}},[e.img?i("img",{staticClass:"child",attrs:{src:e.img}}):t._e(),t._v(" "),e.h5?i("h5",{staticClass:"child"},[t._v(t._s(e.h5))]):t._e()])])})),0),t._v(" "),i("ul",{staticClass:"list"},t._l(t.list,(function(e,o){return i("li",[i("b-link",{attrs:{to:{name:"goods_show",params:{gd_id:e.gd_id}}}},[i("div",{staticClass:"imgBox"},[i("img",{attrs:{src:e.image_src_thumb[0]}})]),t._v(" "),i("div",{staticClass:"details"},[i("div",{staticClass:"content"},[i("h3",[t._v(t._s(e.gd_name))]),t._v(" "),i("p")])])])],1)})),0)])],1)}),[],!1,null,"3793529f",null).exports}}]);