"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9278],{49278:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});var a=n(87757),r=n.n(a),i=n(44670);function s(e,t,n,a,r,i,s){try{var o=e[i](s),u=o.value}catch(e){return void n(e)}o.done?t(u):Promise.resolve(u).then(a,r)}const o={name:"admShopGoods_compMakerInput",props:["value","frm"],data:function(){return{maker:[]}},computed:{input_val:{get:function(){return this.value},set:function(e){this.$emit("input",e)}}},methods:{getMakerList:function(){var e,t=this;return(e=r().mark((function e(){var n,a;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!((n=t.$refs.sch_field.value).length<2)){e.next=6;break}return Notify.toast("warning","2자 이상 입력시 검색 가능합니다."),e.abrupt("return",!1);case 6:return e.prev=6,e.next=9,i.Z.get("/api/admin/shop/maker",{params:{type:"all",mk_name:n}});case 9:(a=e.sent)&&200===a.status&&(a.data.list.length?t.maker=a.data.list:t.maker=[{mk_name:"정보없음"}]),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(6),Notify.consolePrint(e.t0),Notify.toast("warning",e.t0.response.data.message);case 17:case"end":return e.stop()}}),e,null,[[6,13]])})),function(){var t=this,n=arguments;return new Promise((function(a,r){var i=e.apply(t,n);function o(e){s(i,a,r,o,u,"next",e)}function u(e){s(i,a,r,o,u,"throw",e)}o(void 0)}))})()},setMaker:function(e){this.maker[e]&&"정보없음"!=this.maker[e].mk_name&&(this.$set(this.frm,"gd_mk_id",this.maker[e].mk_id),this.$set(this.frm,"gd_mk_name",this.maker[e].mk_name)),this.maker=[]},hide:function(){this.maker=[]}}};const u=(0,n(51900).Z)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-form-input",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],ref:"sch_field",attrs:{autocomplete:"off",id:"gd_mk_id",title:"입력 후 엔터 or 버튼"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getMakerList.apply(null,arguments)}},model:{value:e.input_val,callback:function(t){e.input_val=t},expression:"input_val"}}),e._v(" "),n("b-button",{staticClass:"overlap",attrs:{size:"sm"},on:{click:e.getMakerList}},[n("b-icon-search")],1),e._v(" "),e.maker.length?n("ul",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.hide,expression:"hide"}],staticClass:"list-group autocomplete"},e._l(e.maker,(function(t,a){return n("li",{staticClass:"list-group-item",on:{click:function(t){return e.setMaker(a)}}},[e._v(e._s(t.mk_name))])})),0):e._e()],1)}),[],!1,null,null,null).exports}}]);