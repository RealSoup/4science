"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4659],{9334:(t,e,a)=>{a.d(e,{Z:()=>l});var r=a(23645),n=a.n(r)()((function(t){return t[1]}));n.push([t.id,".ctrl[data-v-303d2fc4]{align-items:flex-end}.ctrl .col[data-v-303d2fc4]:first-child{flex:0 0 60%;max-width:60%}.list .col[data-v-303d2fc4]:first-child{flex:0 0 15%;max-width:15%}.list .col[data-v-303d2fc4]:nth-child(2){flex:0 0 60%;max-width:60%}",""]);const l=n},54659:(t,e,a)=>{a.r(e),a.d(e,{default:()=>u});function r(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return n(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return n(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,r=new Array(e);a<e;a++)r[a]=t[a];return r}const l={name:"ShopEstimateCustomSub24",data:function(){return{manufacturer:"Digi-Key",manufacturer_label:"Digi-Key 부품 번호",code:"",ea:"",label:[],val:[]}},watch:{manufacturer:function(t,e){"Digi-Key"==t?this.manufacturer_label="Digi-Key 부품 번호":"Element14"==t?this.manufacturer_label="Element14 주문코드":"Mouser"==t?this.manufacturer_label="Mouser 번호":"기타"==t&&(this.manufacturer_label="제품 페이지 링크")}},methods:{add:function(){return isEmpty(this.code)?(Notify.toast("danger","".concat(this.manufacturer_label,"를 입력하세요")),!1):isEmpty(this.ea)?(Notify.toast("danger","수량을 입력하세요"),!1):(this.label.push("주문 종류","주문 코드","수량"),this.val.push([this.manufacturer,this.code,this.ea]),this.code="",void(this.ea=""))},del:function(t){this.val.splice(t,1)},checkValidation:function(){return isEmpty(this.val)?(Notify.toast("danger","요청사항을(를) 추가하세요"),!1):(this.val=this.val.reduce((function(t,e){return[].concat(r(t),r(e))})),!0)}}};var i=a(93379),o=a.n(i),c=a(9334),s={insert:"head",singleton:!1};o()(c.Z,s);c.Z.locals;const u=(0,a(51900).Z)(l,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",{staticClass:"frm_st"},[a("b-row",[a("b-col",{staticClass:"label_st"},[t._v("판매처"),a("b",{staticClass:"need"})]),t._v(" "),a("b-col",[a("b-form-select",{staticClass:"w-50",model:{value:t.manufacturer,callback:function(e){t.manufacturer=e},expression:"manufacturer"}},[a("b-form-select-option",{attrs:{value:"Digi-Key"}},[t._v("Digi-Key")]),t._v(" "),a("b-form-select-option",{attrs:{value:"Element14"}},[t._v("Element14")]),t._v(" "),a("b-form-select-option",{attrs:{value:"Mouser"}},[t._v("Mouser")]),t._v(" "),a("b-form-select-option",{attrs:{value:"기타"}},[t._v("기타")])],1)],1)],1),t._v(" "),a("b-row",{staticClass:"ctrl"},[a("b-col",[a("i",[t._v(t._s(t.manufacturer_label))]),t._v(" "),a("b-form-input",{model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1),t._v(" "),a("b-col",[a("i",[t._v("수량")]),t._v(" "),a("b-form-input",{model:{value:t.ea,callback:function(e){t.ea=e},expression:"ea"}})],1),t._v(" "),a("b-col",[a("b-button",{attrs:{size:"sm"},on:{click:t.add}},[t._v("추가")])],1)],1),t._v(" "),t._l(t.val,(function(e,r){return a("b-row",{key:r,staticClass:"list"},[a("b-col",[t._v(t._s(e[0]))]),t._v(" "),a("b-col",[t._v(t._s(e[1]))]),t._v(" "),a("b-col",[t._v(t._s(e[2]))]),t._v(" "),a("b-col",[a("b-button",{attrs:{size:"sm",variant:"danger"},on:{click:function(e){return t.del(r)}}},[t._v("취소")])],1)],1)}))],2)}),[],!1,null,"303d2fc4",null).exports}}]);