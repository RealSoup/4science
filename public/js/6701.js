"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6701],{6701:(t,e,a)=>{a.r(e),a.d(e,{default:()=>s});var c=a(6909);const u={name:"CartModel",props:["value","src"],components:{VueNumericInput:a.n(c)()},methods:{outCart:function(){this.$emit("outCart")},update:function(t){this.$store.dispatch("cart/update",{cm_id:this.value.cm_id,ea:t})}}};const s=(0,a(1900).Z)(u,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-row",{attrs:{tag:"li"}},[a("b-col",{attrs:{cols:"4"}},[a("b-form-checkbox",{attrs:{value:"Y","unchecked-value":"N"},model:{value:t.value.ct_check_opt,callback:function(e){t.$set(t.value,"ct_check_opt",e)},expression:"value.ct_check_opt"}}),t._v(" "),a("router-link",{attrs:{to:{name:"goods_show",params:{gd_id:t.value.gm_gd_id}}}},[a("img",{attrs:{src:t.src}})])],1),t._v(" "),a("b-col",[a("div",[t._v(t._s(t.strCut(t.value.gm_name,15)))]),t._v(" "),a("div",[t._v(t._s(t.value.gm_catno))]),t._v(" "),a("div",[a("VueNumericInput",{attrs:{align:"center",min:1},on:{input:t.update},model:{value:t.value.ea,callback:function(e){t.$set(t.value,"ea",e)},expression:"value.ea"}})],1),t._v(" "),a("b-badge",{staticClass:"btn_x",attrs:{pill:"",variant:"danger"},on:{click:t.outCart}},[t._v("X")])],1)],1)}),[],!1,null,null,null).exports}}]);