"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4760],{69414:(t,e,a)=>{a.d(e,{Z:()=>c});var l=a(23645),s=a.n(l)()((function(t){return t[1]}));s.push([t.id,".ctrl .row .col[data-v-2315e3a6]:first-child{align-items:center;display:flex}.ctrl .row .col label[data-v-2315e3a6]{flex:0 0 16%;font-weight:600;max-width:16%;padding:0 13px;text-align:right}.ctrl .row .col label[data-v-2315e3a6]:last-of-type{flex:0 0 20%;max-width:20%}.ctrl .row .col #all_dc[data-v-2315e3a6]{flex:0 0 13%;max-width:13%;text-align:right}.ctrl .row .col .custom-control[data-v-2315e3a6]{flex-basis:0;flex-grow:1;max-width:100%}.ctrl .row .col .custom-control .point[data-v-2315e3a6]{color:red}.ctrl .row .col[data-v-2315e3a6]:last-child{text-align:right}",""]);const c=s},54760:(t,e,a)=>{a.r(e),a.d(e,{default:()=>i});const l={props:["value","clickable"],watch:{"value.all_dc":{handler:function(t,e){this.$emit("all_dc_update")}}},methods:{save:function(t){this.$emit("save",t)}}};var s=a(93379),c=a.n(s),o=a(69414),n={insert:"head",singleton:!1};c()(o.Z,n);o.Z.locals;const i=(0,a(51900).Z)(l,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"act_ctrl"},[a("b-row",{attrs:{cols:"1","cols-md":"2"}},[a("b-col",[a("label",{attrs:{for:"all_dc"}},[t._v("일괄할인")]),t._v(" "),a("b-form-input",{attrs:{id:"all_dc",type:"number",min:"0",max:"99",placeholder:"00%",size:"sm"},model:{value:t.value.all_dc,callback:function(e){t.$set(t.value,"all_dc",e)},expression:"value.all_dc"}}),t._v(" "),a("label",{attrs:{for:"er_no_dlvy_fee"}},[t._v("배송료 제외")]),t._v(" "),a("b-form-checkbox",{attrs:{id:"er_no_dlvy_fee",value:"Y","unchecked-value":"N",size:"sm"},model:{value:t.value.er_no_dlvy_fee,callback:function(e){t.$set(t.value,"er_no_dlvy_fee",e)},expression:"value.er_no_dlvy_fee"}},[a("span",{staticClass:"point"},[t._v("※주의 - 상품가격에 반영되지 않음")])])],1),t._v(" "),a("b-col",[a("b-button",{staticClass:"white",attrs:{to:{name:"adm_estimate_index"},size:"sm"}},[a("b-icon-list"),t._v(" 목록으로")],1),t._v(" "),a("b-button",{staticClass:"green",attrs:{size:"sm"},on:{click:function(e){return t.save("preview")}}},[a("b-icon-file-earmark-richtext-fill"),t._v(" 미리보기")],1),t._v(" "),t.clickable?[a("b-button",{staticClass:"gray",attrs:{size:"sm"},on:{click:function(e){return t.save("store")}}},[a("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" 임시저장")],1),t._v(" "),a("b-button",{staticClass:"d_blue",attrs:{size:"sm"},on:{click:function(e){return t.save("send")}}},[a("font-awesome-icon",{attrs:{icon:"paper-plane"}}),t._v(" 완료/발송")],1)]:a("b-button",{staticClass:"gray",attrs:{size:"sm"}},[a("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" 저장 중~!")],1)],2)],1)],1)}),[],!1,null,"2315e3a6",null).exports}}]);