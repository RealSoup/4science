"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4393],{37188:(t,a,e)=>{e.d(a,{Z:()=>o});var l=e(1519),c=e.n(l)()((function(t){return t[1]}));c.push([t.id,".act_ctrl .row .col[data-v-480df79e]:first-child{align-items:center;display:flex}.act_ctrl .row .col label[data-v-480df79e]{flex:0 0 16%;font-weight:600;max-width:16%;padding:0 13px;text-align:right}.act_ctrl .row .col label[data-v-480df79e]:last-of-type{flex:0 0 20%;max-width:20%}.act_ctrl .row .col #all_dc[data-v-480df79e]{flex:0 0 13%;max-width:13%;text-align:right}.act_ctrl .row .col .custom-control[data-v-480df79e]{flex-basis:0;flex-grow:1;max-width:100%}.act_ctrl .row .col .custom-control .point[data-v-480df79e]{color:red}.act_ctrl .row .col[data-v-480df79e]:last-child{text-align:right}@media (max-width:992px){.act_ctrl .row .col[data-v-480df79e]{margin-bottom:.3em}.act_ctrl .row .col label[data-v-480df79e]{padding:0 5px}.act_ctrl .row .col #all_dc[data-v-480df79e],.act_ctrl .row .col label[data-v-480df79e]{flex:0 0 25%;max-width:25%}.act_ctrl .row .col label[data-v-480df79e]:last-of-type{flex:0 0 35%;max-width:35%}}",""]);const o=c},54393:(t,a,e)=>{e.r(a),e.d(a,{default:()=>n});const l={props:["value","clickable"],watch:{"value.all_dc":{handler:function(t,a){this.$emit("all_dc_update")}}},methods:{save:function(t){this.$emit("save",t)}}};var c=e(93379),o=e.n(c),r=e(37188),s={insert:"head",singleton:!1};o()(r.Z,s);r.Z.locals;const n=(0,e(51900).Z)(l,(function(){var t=this,a=t._self._c;return a("div",{staticClass:"act_ctrl"},[a("b-row",{attrs:{cols:"1","cols-md":"2"}},[a("b-col",[a("label",{attrs:{for:"all_dc"}},[t._v("일괄할인")]),t._v(" "),a("b-form-input",{staticClass:"rubber",attrs:{id:"all_dc",type:"number",min:"0",max:"99",placeholder:"00%"},model:{value:t.value.all_dc,callback:function(a){t.$set(t.value,"all_dc",a)},expression:"value.all_dc"}}),t._v(" "),a("label",{attrs:{for:"er_no_dlvy_fee"}},[t._v("배송료 제외")]),t._v(" "),a("b-form-checkbox",{attrs:{id:"er_no_dlvy_fee",value:"Y","unchecked-value":"N",size:"sm"},model:{value:t.value.er_no_dlvy_fee,callback:function(a){t.$set(t.value,"er_no_dlvy_fee",a)},expression:"value.er_no_dlvy_fee"}},[a("span",{staticClass:"point m_hide"},[t._v("※주의 - 상품가격에 반영되지 않음")])])],1),t._v(" "),a("b-col",[a("b-button",{staticClass:"white rubber",attrs:{to:{name:"adm_estimate_index"}}},[a("b-icon-list"),t._v(" 목록으로")],1),t._v(" "),a("b-button",{staticClass:"green rubber",on:{click:function(a){return t.save("preview")}}},[a("b-icon-file-earmark-richtext-fill"),t._v(" 미리보기")],1),t._v(" "),t.clickable?[a("b-button",{staticClass:"gray rubber",on:{click:function(a){return t.save("store")}}},[a("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" 임시저장")],1),t._v(" "),a("b-button",{staticClass:"d_blue rubber",on:{click:function(a){return t.save("send")}}},[a("font-awesome-icon",{attrs:{icon:"paper-plane"}}),t._v(" 완료/발송")],1)]:a("b-button",{staticClass:"gray rubber"},[a("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" 저장 중~!")],1)],2)],1)],1)}),[],!1,null,"480df79e",null).exports}}]);