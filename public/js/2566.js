"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2566],{1827:(e,t,r)=>{r.d(t,{Xs:()=>n,Yb:()=>o,Hw:()=>a});var n=function(e){return isEmpty(e.eq_name)?(Notify.toast("danger","요청자 이름을 입력하세요."),document.getElementById("eq_name").focus(),!1):isEmpty(e.eq_email)?(Notify.toast("danger","요청자 이메일을 입력하세요."),document.getElementById("eq_email").focus(),!1):isEmpty(e.eq_department)?(Notify.toast("danger","요청자 소속을 입력하세요."),document.getElementById("eq_department").focus(),!1):!isEmpty(e.eq_hp)||(Notify.toast("danger","요청자 휴대폰을 입력하세요."),document.getElementById("eq_hp").focus(),!1)},o=function(e){if(e.length<1)return Notify.toast("danger","견적 상품을 추가하세요."),document.getElementById("estimate_model").focus(),!1;for(var t in e){var r=e[t];if(isEmpty(r.em_name))return Notify.toast("danger","제품명을 입력하세요."),document.getElementById("estimate_model."+t+".em_name").focus(),!1;if(isEmpty(r.em_code))return Notify.toast("danger","모델명을 입력하세요."),document.getElementById("estimate_model."+t+".em_code").focus(),!1;if(isEmpty(r.em_ea))return Notify.toast("danger","수량을 입력하세요."),document.getElementById("estimate_model."+t+".em_ea").focus(),!1;if(isEmpty(r.em_dlvy_at))return Notify.toast("danger","납품기일을 입력하세요."),document.getElementById("estimate_model."+t+".em_dlvy_at").focus(),!1;if(isEmpty(r.em_spec))return Notify.toast("danger","제품정보를 입력하세요."),document.getElementById("estimate_model."+t+".em_spec").focus(),!1}return!0},a=function(e){return isEmpty(e.er_dlvy_at)?(Notify.toast("danger","주문 납품기일을 입력하세요."),document.getElementById("er_dlvy_at").focus(),!1):!isEmpty(e.er_effective_at)||(Notify.toast("danger","견적 유효기간을 입력하세요."),document.getElementById("er_effective_at").focus(),!1)}},9200:(e,t,r)=>{r.d(t,{Z:()=>a});var n=r(3645),o=r.n(n)()((function(e){return e[1]}));o.push([e.id,".fade-enter-active[data-v-defbcd24],.fade-leave-active[data-v-defbcd24]{transition:opacity 1ms}.fade-enter[data-v-defbcd24],.fade-leave-to[data-v-defbcd24]{opacity:0}",""]);const a=o},7847:(e,t,r)=>{r.d(t,{Z:()=>a});var n=r(3645),o=r.n(n)()((function(e){return e[1]}));o.push([e.id,'.card.adform .row .label.long{flex:0 0 15.333334%;max-width:15.333334%}#estimate_model .gd_list:not(:last-of-type){border-bottom:2px solid #f1f1f1;margin-bottom:2rem;padding-bottom:2rem}#estimate_model .flag_tag{color:#fff;display:inline-block;font-weight:700;height:26px;margin-right:13px;position:relative;text-align:center;width:6rem}#estimate_model .flag_tag:after{border-left:13px solid #fff;left:0}#estimate_model .flag_tag:after,#estimate_model .flag_tag:before{border-bottom:13px solid transparent;border-top:13px solid transparent;bottom:0;content:"";height:0;position:absolute;width:0}#estimate_model .flag_tag:before{border-left:13px solid red;right:-13px}#estimate_model .tag_red{background:red}#estimate_model .tag_red:before{border-left-color:red}#estimate_model .tag_green{background:green;width:8rem}#estimate_model .tag_green:before{border-left-color:green}',""]);const a=o},2566:(e,t,r)=>{r.r(t),r.d(t,{default:()=>b});var n=r(7757),o=r.n(n),a=r(4670),i=r(2730),s=r(1827);function c(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){s=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(s)throw a}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function m(e,t,r,n,o,a,i){try{var s=e[a](i),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,o)}function d(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function i(e){m(a,n,o,i,s,"next",e)}function s(e){m(a,n,o,i,s,"throw",e)}i(void 0)}))}}const u={name:"Create",components:{FormCtrl:function(){return r.e(7929).then(r.bind(r,7929))},FormSetting:function(){return r.e(2729).then(r.bind(r,2729))},FormUser:function(){return r.e(8942).then(r.bind(r,8942))},FormGoods:i.Z,FormExtra:function(){return r.e(3569).then(r.bind(r,3569))}},data:function(){return{isLoadingModalViewed:!1,frm:{estimate_model:[],file_info:[]}}},methods:{create:function(){var e=this;return d(o().mark((function t(){var r;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a.Z.get("/api/admin/shop/estimate/create",{params:{eq_id:e.$route.query.eq_id}});case 3:(r=t.sent)&&200===r.status&&(e.frm=r.data),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),Notify.consolePrint(t.t0),Notify.toast("warning",t.t0.response.data.message);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})))()},store:function(e){var t=this;return d(o().mark((function r(){var n;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if((0,s.Xs)(t.frm)){r.next=2;break}return r.abrupt("return",!1);case 2:if((0,s.Yb)(t.frm.estimate_model)){r.next=4;break}return r.abrupt("return",!1);case 4:if((0,s.Hw)(t.frm)){r.next=6;break}return r.abrupt("return",!1);case 6:r.prev=6,t.calculator(),r.t0=e,r.next="store"===r.t0?11:"send"===r.t0?13:15;break;case 11:return t.frm.er_step=0,r.abrupt("break",15);case 13:return t.frm.er_step=1,r.abrupt("break",15);case 15:return t.isLoadingModalViewed=!0,r.next=18,a.Z.post("/api/admin/shop/estimate",t.frm);case 18:if(!(n=r.sent)||200!==n.status){r.next=24;break}return r.next=22,t.$refs.form_extra.$refs.fileupload.fileProcessor(n.data);case 22:t.isLoadingModalViewed=!1,t.$router.push({name:"adm_estimate_show_reply",params:{er_id:n.data}});case 24:r.next=30;break;case 26:r.prev=26,r.t1=r.catch(6),Notify.consolePrint(r.t1),Notify.toast("warning",r.t1.response.data.message);case 30:case"end":return r.stop()}}),r,null,[[6,26]])})))()},all_dc_apply:function(){this.$refs.form_goods.setDcLate()},calculator:function(){var e,t={},r=0,n=0,o=c(this.frm.estimate_model);try{for(o.s();!(e=o.n()).done;){var a=e.value;a.goods&&a.goods.purchase_at&&(r=a.goods.gd_pa_id),t.hasOwnProperty(r)||(r>0&&"AIR"==a.goods.purchase_at.pa_type?t[r]={goods:0,dlvy:0,air:Number(a.goods.purchase_at.pa_price_add_vat)}:t[r]={goods:0,dlvy:Number(a.goods.dlvy_fee_add_vat),free_dlvy_max:Number(a.goods.free_dlvy_max),air:0}),t[r].goods+=Number(a.em_price)*Number(a.em_ea);var i,s=c(a.estimate_option);try{for(s.s();!(i=s.n()).done;){var l=i.value;t[r].goods+=Number(l.eo_price)*Number(l.eo_ea)}}catch(e){s.e(e)}finally{s.f()}}}catch(e){o.e(e)}finally{o.f()}for(var m in this.frm.er_gd_price=Object.values(t).reduce((function(e,t){return e+t.goods}),0),this.frm.er_air_price=Object.values(t).reduce((function(e,t){return e+t.air}),0),this.frm.er_surtax=.1*this.frm.er_gd_price,t)t[m].dlvy&&t[m].goods<t[m].free_dlvy_max&&(n+=Number(t[m].dlvy));this.frm.er_dlvy_price=n,"Y"==this.frm.er_no_dlvy_fee&&(this.frm.er_dlvy_price=0,this.frm.er_air_price=0),this.frm.er_all_price=this.frm.er_gd_price+this.frm.er_surtax+this.frm.er_dlvy_price+this.frm.er_air_price}},mounted:function(){this.create()}};var _=r(3379),f=r.n(_),p=r(9200),v={insert:"head",singleton:!1};f()(p.Z,v);p.Z.locals;const b=(0,r(1900).Z)(u,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-container",{staticClass:"p_warp",attrs:{id:"adm_estimate_create"}},[r("h3",[e._v("견적서 작성")]),e._v(" "),r("FormCtrl",{on:{save:e.store}}),e._v(" "),r("FormSetting",{on:{all_dc_update:e.all_dc_apply},model:{value:e.frm,callback:function(t){e.frm=t},expression:"frm"}}),e._v(" "),r("FormUser",{model:{value:e.frm,callback:function(t){e.frm=t},expression:"frm"}}),e._v(" "),e.frm.estimate_model.length?r("FormGoods",{ref:"form_goods",attrs:{frm:e.frm},on:{"hook:mounted":function(e){}},model:{value:e.frm.estimate_model,callback:function(t){e.$set(e.frm,"estimate_model",t)},expression:"frm.estimate_model"}}):e._e(),e._v(" "),r("FormExtra",{ref:"form_extra",attrs:{isLoadingModalViewed:e.isLoadingModalViewed},model:{value:e.frm,callback:function(t){e.frm=t},expression:"frm"}})],1)}),[],!1,null,"defbcd24",null).exports},2730:(e,t,r)=>{r.d(t,{Z:()=>y});var n=r(7757),o=r.n(n),a=r(4670);function i(e,t,r,n,o,a,i){try{var s=e[a](i),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,o)}function s(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function s(e){i(a,n,o,s,c,"next",e)}function c(e){i(a,n,o,s,c,"throw",e)}s(void 0)}))}}const c={props:["value","em_id","gd_id"],data:function(){return{option:[],option_child:[],selOpt:{}}},watch:{value:function(e,t){this.$emit("calculator")}},methods:{getOption:function(e){var t=this;return s(o().mark((function r(){var n;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e||Notify.modal("등록된 상품이 없습니다."),r.prev=1,r.next=4,a.Z.get("/api/admin/shop/option",{params:{gd_id:e}});case 4:(n=r.sent)&&200===n.status&&(n.data.length<1&&Notify.modal("등록된 옵션이 없습니다."),t.option=n.data),r.next=12;break;case 8:r.prev=8,r.t0=r.catch(1),Notify.consolePrint(r.t0),Notify.toast("warning",r.t0.response.data.message);case 12:case"end":return r.stop()}}),r,null,[[1,8]])})))()},setOption:function(e){var t=this;return s(o().mark((function r(){var n;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!t.option[e]){r.next=13;break}return t.selOpt=t.option[e],r.prev=2,r.next=5,a.Z.get("/api/admin/shop/option_child",{params:{op_id:t.selOpt.op_id}});case 5:(n=r.sent)&&200===n.status&&(t.option_child=n.data),r.next=13;break;case 9:r.prev=9,r.t0=r.catch(2),Notify.consolePrint(r.t0),Notify.toast("warning",r.t0.response.data.message);case 13:case"end":return r.stop()}}),r,null,[[2,9]])})))()},setOptionChild:function(e){if(this.option_child[e]){var t=Object.assign({},{eo_em_id:this.em_id,eo_gd_id:this.gd_id,eo_opc_id:this.option_child[e].opc_id,eo_tit:this.selOpt.op_name,eo_name:this.option_child[e].opc_name,eo_ea:1,eo_price:this.option_child[e].opc_price});this.value.push(t)}this.option_child=[]},hideOption:function(){this.option=[]},hideOptionChild:function(){this.option_child=[]}}};var l=r(1900);const m=(0,l.Z)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-row",{staticClass:"mt-3"},[r("b-col",{attrs:{cols:"4",offset:"2"}},[e.option.length?r("ul",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.hideOption,expression:"hideOption"}],staticClass:"list-group autocomplete"},e._l(e.option,(function(t,n){return r("li",{staticClass:"list-group-item",on:{click:function(t){return e.setOption(n)}}},[e._v(e._s(t.op_name))])})),0):e._e()]),e._v(" "),e.option_child.length?r("b-col",{attrs:{cols:"4"}},[r("ul",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.hideOptionChild,expression:"hideOptionChild"}],staticClass:"list-group autocomplete"},e._l(e.option_child,(function(t,n){return r("li",{staticClass:"list-group-item",on:{click:function(t){return e.setOptionChild(n)}}},[e._v(e._s(t.opc_name))])})),0)]):e._e()],1)}),[],!1,null,null,null).exports;r(381);function d(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return u(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){s=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(s)throw a}}}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _(e,t,r,n,o,a,i){try{var s=e[a](i),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,o)}function f(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function i(e){_(a,n,o,i,s,"next",e)}function s(e){_(a,n,o,i,s,"throw",e)}i(void 0)}))}}const p={components:{OptionAdd:m,PriceInput:function(){return r.e(1443).then(r.bind(r,1443))},DcLateInput:function(){return r.e(9380).then(r.bind(r,9380))},ModelSchInput:function(){return r.e(2046).then(r.bind(r,2046))},EaInput:function(){return r.e(5374).then(r.bind(r,5374))},Validation:function(){return r.e(2181).then(r.bind(r,2181))},FormGoodsChecker:function(){return r.e(228).then(r.bind(r,228))}},props:["value","frm"],methods:{emAdd:function(){var e=Object.assign({},this.frm.empty_em);this.value.push(e)},emDel:function(e){var t=this;return f(o().mark((function r(){return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Notify.confirm("삭제","danger");case 2:r.sent&&t.value.splice(e,1);case 4:case"end":return r.stop()}}),r)})))()},openOption:function(e,t){this.$refs.option_add[e].getOption(t)},delOption:function(e,t){this.value[e].estimate_option.splice(t,1)},setDcLate:function(){var e,t=d(this.value);try{for(t.s();!(e=t.n()).done;){var r=e.value;this.$set(r,"em_dc_rate",this.frm.all_dc)}}catch(e){t.e(e)}finally{t.f()}},emReset:function(e){var t=this;return f(o().mark((function r(){var n;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,a.Z.get("/api/admin/shop/estimate/getEmptyEm");case 2:n=r.sent,t.$set(t.value,e,n.data);case 4:case"end":return r.stop()}}),r)})))()}}};var v=r(3379),b=r.n(v),h=r(7847),g={insert:"head",singleton:!1};b()(h.Z,g);h.Z.locals;const y=(0,l.Z)(p,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-card",{staticClass:"adform",attrs:{id:"estimate_model"}},[r("b-container",[r("b-row",[r("b-col",{staticClass:"tit"},[e._v("견적 상품")])],1),e._v(" "),e._l(e.value,(function(t,n){return r("b-container",{key:n,staticClass:"gd_list"},[r("b-row",{staticClass:"mb-2"},[r("b-col",[r("font-awesome-icon",{staticClass:"mr-2",attrs:{icon:"tags"}}),e._v(" "+e._s(n+1)+".\r\n                    "),t.bundle_dc&&t.bundle_dc.length?r("div",{staticClass:"flag_tag tag_red"},[e._v("묶음 할인")]):e._e(),e._v(" "),t.goods&&t.goods.purchase_at?r("div",{staticClass:"flag_tag tag_green"},[e._v("매입처 상품")]):e._e(),e._v(" "),r("b-button",{attrs:{size:"sm"},on:{click:function(r){return e.openOption(n,t.em_gd_id)}}},[r("b-icon-search"),e._v(" 옵션")],1),e._v("\r\n                    23-1-1\r\n                ")],1),e._v(" "),r("b-col",{staticClass:"text-right"},[r("b-button",{staticClass:"em_reset",attrs:{variant:"warning",size:"sm"},on:{click:function(t){return e.emReset(n)}}},[e._v("초기화")]),e._v(" "),0!=n?r("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{variant:"danger",size:"sm",title:"삭제"},on:{click:function(t){return e.emDel(n)}}},[r("b-icon-x-lg")],1):e._e()],1)],1),e._v(" "),r("b-row",[r("b-col",{staticClass:"label"},[e._v("제품명")]),e._v(" "),r("b-col",{staticClass:"type02"},[r("b-form-input",{attrs:{id:"estimate_model."+n+".em_name"},model:{value:t.em_name,callback:function(r){e.$set(t,"em_name",r)},expression:"em.em_name"}}),e._v(" "),r("Validation",{attrs:{error:e.$store.state.error.validations["estimate_model."+n+".em_name"]}})],1),e._v(" "),r("b-col",{staticClass:"label"},[e._v("CAT.No")]),e._v(" "),r("b-col",{staticClass:"type02"},[r("ModelSchInput",{attrs:{type:"em_catno",id:"em_catno"+n,em:t},model:{value:t.em_catno,callback:function(r){e.$set(t,"em_catno",r)},expression:"em.em_catno"}})],1),e._v(" "),r("b-col",{staticClass:"label"},[e._v("모델명")]),e._v(" "),r("b-col",{staticClass:"type02"},[r("ModelSchInput",{attrs:{type:"em_code",id:"estimate_model."+n+".em_code",em:t},model:{value:t.em_code,callback:function(r){e.$set(t,"em_code",r)},expression:"em.em_code"}}),e._v(" "),r("Validation",{attrs:{error:e.$store.state.error.validations["estimate_model."+n+".em_code"]}})],1),e._v(" "),r("b-col",{staticClass:"label"},[e._v("판매단위")]),e._v(" "),r("b-col",{staticClass:"type02"},[r("b-form-input",{model:{value:t.em_unit,callback:function(r){e.$set(t,"em_unit",r)},expression:"em.em_unit"}})],1)],1),e._v(" "),r("b-row",{staticClass:"mb-3"},[r("b-col",{staticClass:"label"},[e._v("제조사")]),e._v(" "),r("b-col",{staticClass:"type02"},[r("b-form-input",{model:{value:t.em_maker,callback:function(r){e.$set(t,"em_maker",r)},expression:"em.em_maker"}})],1),e._v(" "),r("b-col",{staticClass:"label"},[e._v("수량")]),e._v(" "),r("b-col",{staticClass:"type01"},[r("EaInput",{attrs:{id:"estimate_model."+n+".em_ea",em:t},model:{value:t.em_ea,callback:function(r){e.$set(t,"em_ea",r)},expression:"em.em_ea"}}),e._v(" "),r("Validation",{attrs:{error:e.$store.state.error.validations["estimate_model."+n+".em_ea"]}})],1),e._v(" "),r("b-col",{staticClass:"label long"},[e._v("판매단가("+e._s(e._f("comma")(t.em_cost_price))+")")]),e._v(" "),r("b-col",{staticClass:"type01"},[r("PriceInput",{attrs:{id:"estimate_model."+n+".em_price"},model:{value:t.em_price,callback:function(r){e.$set(t,"em_price",r)},expression:"em.em_price"}}),e._v(" "),r("Validation",{attrs:{error:e.$store.state.error.validations["estimate_model."+n+".em_price"]}})],1),e._v(" "),r("b-col",{staticClass:"label"},[e._v("할인율")]),e._v(" "),r("b-col",{staticClass:"type01"},[r("DcLateInput",{attrs:{id:"em_dc_rate"+n,em:t},model:{value:t.em_dc_rate,callback:function(r){e.$set(t,"em_dc_rate",r)},expression:"em.em_dc_rate"}})],1),e._v(" "),r("b-col",{staticClass:"label"},[e._v("납품기일")]),e._v(" "),r("b-col",{staticClass:"type01"},[r("b-form-input",{attrs:{id:"estimate_model."+n+".em_dlvy_at"},model:{value:t.em_dlvy_at,callback:function(r){e.$set(t,"em_dlvy_at",r)},expression:"em.em_dlvy_at"}}),e._v(" "),r("Validation",{attrs:{error:e.$store.state.error.validations["estimate_model."+n+".em_dlvy_at"]}})],1)],1),e._v(" "),r("b-row",[r("b-col",{staticClass:"label"},[e._v("제품정보")]),e._v(" "),r("b-col",{staticClass:"type11"},[r("b-form-textarea",{attrs:{id:"estimate_model."+n+".em_spec",rows:"3"},model:{value:t.em_spec,callback:function(r){e.$set(t,"em_spec",r)},expression:"em.em_spec"}}),e._v(" "),r("Validation",{attrs:{error:e.$store.state.error.validations["estimate_model."+n+".em_spec"]}})],1)],1),e._v(" "),r("OptionAdd",{ref:"option_add",refInFor:!0,attrs:{em_id:t.em_id,gd_id:t.em_gd_id},model:{value:t.estimate_option,callback:function(r){e.$set(t,"estimate_option",r)},expression:"em.estimate_option"}}),e._v(" "),t.estimate_option.length?e._l(t.estimate_option,(function(t,o){return r("b-row",{key:"op"+n+"_"+o,staticClass:"op_list mt-3",attrs:{"align-h":"end"}},[r("b-col",{attrs:{cols:"2"}},[r("b-button",{attrs:{variant:"danger",size:"xm"},on:{click:function(t){return e.delOption(n,o)}}},[e._v("X")]),e._v("\r\n                        "+e._s(t.eo_tit)+": "+e._s(t.eo_name)+"\r\n                    ")],1),e._v(" "),r("b-col",{staticClass:"awesome_p",attrs:{cols:"2"}},[r("EaInput",{attrs:{id:"eo_ea"+n+"_"+o},model:{value:t.eo_ea,callback:function(r){e.$set(t,"eo_ea",r)},expression:"eo.eo_ea"}}),e._v(" "),r("label",{attrs:{for:"eo_ea"+n+"_"+o}},[e._v("수량")])],1),e._v(" "),r("b-col",{attrs:{cols:"2"}},[r("div",{staticClass:"awesome_p"},[r("PriceInput",{attrs:{id:"eo_price"+n+"_"+o},model:{value:t.eo_price,callback:function(r){e.$set(t,"eo_price",r)},expression:"eo.eo_price"}}),e._v(" "),r("label",{attrs:{for:"eo_price"+n+"_"+o}},[e._v("판매단가")])],1)])],1)})):e._e()],2)})),e._v(" "),r("Validation",{attrs:{error:e.$store.state.error.validations.estimate_model}}),e._v(" "),r("b-row",{staticClass:"m-0"},[r("b-col",{staticClass:"text-right"},[r("b-button",{attrs:{variant:"outline-primary",size:"sm"},on:{click:e.emAdd}},[r("b-icon-plus-square-fill"),e._v(" 추가")],1)],1)],1)],2)],1)}),[],!1,null,null,null).exports}}]);