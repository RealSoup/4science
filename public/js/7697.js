"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7697],{87697:(t,a,l)=>{l.r(a),l.d(a,{default:()=>s});const e={name:"ShopEstimateCustomSub21",data:function(){return{label:["재질","내부 사이즈(W,mm)","내부 사이즈(D,mm)","내부 사이즈(H,mm)","옵션"],val:[]}},methods:{checkValidation:function(){return isEmpty(this.val[0])?(Notify.toast("danger","재질(를) 선택하세요"),!1):isEmpty(this.val[1])?(Notify.toast("danger","내부 사이즈(W,mm)(를) 입력하세요"),!1):isEmpty(this.val[2])?(Notify.toast("danger","내부 사이즈(D,mm)(를) 입력하세요"),!1):isEmpty(this.val[3])?(Notify.toast("danger","내부 사이즈(H,mm)(를) 입력하세요"),!1):isEmpty(this.val[4])?(Notify.toast("danger","옵션(를) 입력하세요"),!1):(this.val[4]=this.val[4].join(),!0)}}};const s=(0,l(51900).Z)(e,(function(){var t=this,a=t._self._c;return a("b-container",{staticClass:"frm_st"},[a("table",{attrs:{cellpadding:"0",cellspacing:"0",border:"0"}},[a("tr",[a("th",[t._v("재질"),a("b")]),t._v(" "),a("td",[a("b-form-select",{staticClass:"w-50",model:{value:t.val[0],callback:function(a){t.$set(t.val,0,a)},expression:"val[0]"}},[a("b-form-select-option",{attrs:{value:""}},[t._v("선택하세요.")]),t._v(" "),a("b-form-select-option",{attrs:{value:"아크릴(PMMA)"}},[t._v("아크릴(PMMA)")]),t._v(" "),a("b-form-select-option",{attrs:{value:"SUS(Stainless Steel)"}},[t._v("SUS(Stainless Steel)")])],1)],1)]),t._v(" "),a("tr",[a("th",[t._v("매인챔버 내부사이즈"),a("b")]),t._v(" "),a("td",[a("table",{attrs:{cellpadding:"0",cellspacing:"0",border:"0"}},[a("tr",[a("td",[t._v("W "),a("b-form-input",{model:{value:t.val[1],callback:function(a){t.$set(t.val,1,a)},expression:"val[1]"}}),t._v(" mm")],1),t._v(" "),a("td",[t._v("X")]),t._v(" "),a("td",[t._v("D "),a("b-form-input",{model:{value:t.val[2],callback:function(a){t.$set(t.val,2,a)},expression:"val[2]"}}),t._v(" mm")],1),t._v(" "),a("td",[t._v("X")]),t._v(" "),a("td",[t._v("H "),a("b-form-input",{model:{value:t.val[3],callback:function(a){t.$set(t.val,3,a)},expression:"val[3]"}}),t._v(" mm")],1)])]),t._v("\r\n\t\t\t\t외경 기준으로 (ex : 1200 x 750 x 1800mm)\r\n\t\t\t")])]),t._v(" "),a("tr",[a("th",[t._v("옵션"),a("b")]),t._v(" "),a("td",[a("b-form-checkbox-group",{model:{value:t.val[4],callback:function(a){t.$set(t.val,4,a)},expression:"val[4]"}},[a("b-form-checkbox",{attrs:{value:"패스박스"}},[t._v("패스박스")]),t._v(" "),a("b-form-checkbox",{attrs:{value:"가압, 감압용발판"}},[t._v("가압, 감압용발판")]),t._v(" "),a("b-form-checkbox",{attrs:{value:"내부전원"}},[t._v("내부전원")])],1)],1)])])])}),[],!1,null,null,null).exports}}]);