"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6886],{86886:(t,e,a)=>{a.r(e),a.d(e,{default:()=>s});const l={name:"ShopEstimateCustomSub11",data:function(){return{label:["사이즈","사이즈(가로)","사이즈(세로)","사이즈(높이)","재질","도어","도어 타입"],val:["10인용",1360,500,980]}},watch:{val:{deep:!0,handler:function(t){this.val[1]=1360*Number(t[0].replace("0인용","")),this.val[2]=500*Number(t[0].replace("0인용","")),this.val[3]=980*Number(t[0].replace("0인용",""))}}},methods:{checkValidation:function(){return isEmpty(this.val[0])?(Notify.toast("danger","사이즈을(를) 선택하세요"),!1):isEmpty(this.val[4])?(Notify.toast("danger","재질을(를) 선택하세요"),!1):isEmpty(this.val[5])?(Notify.toast("danger","도어을(를) 선택하세요"),!1):"도어 부착"!=this.val[5]||!isEmpty(this.val[6])||(Notify.toast("danger","도어타입을(를) 선택하세요"),!1)}}};const s=(0,a(51900).Z)(l,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",{staticClass:"frm_st"},[a("table",{attrs:{cellpadding:"0",cellspacing:"0",border:"0"}},[a("tr",[a("th",[t._v("사이즈"),a("b")]),t._v(" "),a("td",[a("table",{attrs:{cellpadding:"0",cellspacing:"0",border:"0"}},[a("tr",[a("td",[a("b-form-select",{model:{value:t.val[0],callback:function(e){t.$set(t.val,0,e)},expression:"val[0]"}},[a("b-form-select-option",{attrs:{value:""}},[t._v("선택하세요.")]),t._v(" "),a("b-form-select-option",{attrs:{value:"10인용"}},[t._v("10인용")]),t._v(" "),a("b-form-select-option",{attrs:{value:"20인용"}},[t._v("20인용")]),t._v(" "),a("b-form-select-option",{attrs:{value:"30인용"}},[t._v("30인용")]),t._v(" "),a("b-form-select-option",{attrs:{value:"40인용"}},[t._v("40인용")]),t._v(" "),a("b-form-select-option",{attrs:{value:"50인용"}},[t._v("50인용")])],1)],1),t._v(" "),a("td",[a("b-form-input",{attrs:{readonly:""},model:{value:t.val[1],callback:function(e){t.$set(t.val,1,e)},expression:"val[1]"}})],1),t._v(" "),a("td",[t._v("X")]),t._v(" "),a("td",[a("b-form-input",{attrs:{readonly:""},model:{value:t.val[2],callback:function(e){t.$set(t.val,2,e)},expression:"val[2]"}})],1),t._v(" "),a("td",[t._v("X")]),t._v(" "),a("td",[a("b-form-input",{attrs:{readonly:""},model:{value:t.val[3],callback:function(e){t.$set(t.val,3,e)},expression:"val[3]"}})],1)])]),t._v(" "),a("em",[t._v("다양한 사이즈로 제작 가능")])])]),t._v(" "),a("tr",[a("th",[t._v("재질"),a("b")]),t._v(" "),a("td",[a("b-form-select",{staticClass:"w-50",model:{value:t.val[4],callback:function(e){t.$set(t.val,4,e)},expression:"val[4]"}},[a("b-form-select-option",{attrs:{value:""}},[t._v("선택하세요.")]),t._v(" "),a("b-form-select-option",{attrs:{value:"분체 도장(기본)"}},[t._v("분체 도장(기본)")]),t._v(" "),a("b-form-select-option",{attrs:{value:"SUS"}},[t._v("SUS")])],1)],1)]),t._v(" "),a("tr",[a("th",[t._v("도어"),a("b")]),t._v(" "),a("td",[a("b-form-select",{staticClass:"w-50",model:{value:t.val[5],callback:function(e){t.$set(t.val,5,e)},expression:"val[5]"}},[a("b-form-select-option",{attrs:{value:""}},[t._v("선택하세요.")]),t._v(" "),a("b-form-select-option",{attrs:{value:"미부착"}},[t._v("미부착")]),t._v(" "),a("b-form-select-option",{attrs:{value:"도어 부착"}},[t._v("도어 부착")])],1)],1)]),t._v(" "),"도어 부착"==t.val[5]?a("tr",[a("th",[t._v("도어 타입"),a("b")]),t._v(" "),a("td",[a("b-form-select",{staticClass:"w-50",model:{value:t.val[6],callback:function(e){t.$set(t.val,6,e)},expression:"val[6]"}},[a("b-form-select-option",{attrs:{value:""}},[t._v("선택하세요.")]),t._v(" "),a("b-form-select-option",{attrs:{value:"투명"}},[t._v("투명")]),t._v(" "),a("b-form-select-option",{attrs:{value:"불투명"}},[t._v("불투명")])],1)],1)]):t._e()])])}),[],!1,null,"f70bbd74",null).exports}}]);