"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2990],{57433:(e,t,a)=>{a.d(t,{Z:()=>r});var n=a(23645),o=a.n(n)()((function(e){return e[1]}));o.push([e.id,".tax_iv h6[data-v-6adc210f]{border-bottom:1px solid #dedede;font-size:.9rem;font-weight:700;margin:1rem;padding:.5rem}.tax_iv .custom-control[data-v-6adc210f]{margin:2rem 0 1rem 4rem}.tax_iv .b-form-file[data-v-6adc210f]{margin-left:3rem}.tax_iv .container[data-v-6adc210f]{padding:0 3rem}.tax_iv .container .row[data-v-6adc210f]{align-items:center;margin:1rem 0}.tax_iv .container .row label[data-v-6adc210f]{flex:0 0 30%;font-size:.8rem;font-weight:700;max-width:30%}.tax_iv .container .row span[data-v-6adc210f]{flex-basis:0;flex-grow:1;max-width:100%}.tax_iv .container .row b[data-v-6adc210f]{margin:0 .5rem}.tax_iv>button[data-v-6adc210f]{background-color:#0e4d9c;border-radius:0;border-width:0;color:#fff;letter-spacing:1rem;width:100%}.slideUpDown-enter-to[data-v-6adc210f],.slideUpDown-leave[data-v-6adc210f]{max-height:400px}.slideUpDown-enter-active[data-v-6adc210f]{transition:max-height .9s}.slideUpDown-enter[data-v-6adc210f],.slideUpDown-leave-to[data-v-6adc210f]{max-height:0}",""]);const r=o},22990:(e,t,a)=>{a.r(t),a.d(t,{default:()=>m});var n=a(87757),o=a.n(n);function r(e,t,a,n,o,r,i){try{var u=e[r](i),l=u.value}catch(e){return void a(e)}u.done?t(l):Promise.resolve(l).then(n,o)}const i={name:"TaxInvoice",props:["value"],methods:{close:function(){var e,t=this;return(e=o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$refs.observer.validate();case 2:if(!e.sent){e.next=49;break}if("IVNO"===t.value.oex_type){e.next=48;break}if(!t.value.oex_hasBizLicense){e.next=12;break}if(!isEmpty(t.value.oex_file)){e.next=10;break}return Notify.toast("danger","사업자 등록증 사본을 첨부해주세요"),t.$refs.oex_file.$refs.input.focus(),e.abrupt("return",!1);case 10:e.next=36;break;case 12:if(!isEmpty(t.value.oex_biz_name)){e.next=16;break}return Notify.toast("danger","법인명을 입력해주세요"),t.$refs.oex_biz_name.focus(),e.abrupt("return",!1);case 16:if(!isEmpty(t.value.oex_biz_num)){e.next=20;break}return Notify.toast("danger","사업자 등록번호를 입력해주세요"),t.$refs.oex_biz_num.focus(),e.abrupt("return",!1);case 20:if(!isEmpty(t.value.oex_biz_type)){e.next=24;break}return Notify.toast("danger","업태를 입력해주세요"),t.$refs.oex_biz_type.focus(),e.abrupt("return",!1);case 24:if(!isEmpty(t.value.oex_biz_item)){e.next=28;break}return Notify.toast("danger","종목를 입력해주세요"),t.$refs.oex_biz_item.focus(),e.abrupt("return",!1);case 28:if(!isEmpty(t.value.oex_ceo)){e.next=32;break}return Notify.toast("danger","대표자명을 입력해주세요"),t.$refs.oex_ceo.focus(),e.abrupt("return",!1);case 32:if(!isEmpty(t.value.oex_addr)){e.next=36;break}return Notify.toast("danger","사업장 소재지를 입력해주세요"),t.$refs.oex_addr.focus(),e.abrupt("return",!1);case 36:if(!isEmpty(t.value.oex_mng)){e.next=40;break}return Notify.toast("danger","담당자를 입력해주세요"),t.$refs.oex_mng.focus(),e.abrupt("return",!1);case 40:if(!isEmpty(t.value.oex_email)){e.next=44;break}return Notify.toast("danger","이메일을 입력해주세요"),t.$refs.oex_email.focus(),e.abrupt("return",!1);case 44:if(!isEmpty(t.value.oex_num_tel)){e.next=48;break}return Notify.toast("danger","핸드폰 번호를 입력해주세요"),t.$refs.oex_num_tel.focus(),e.abrupt("return",!1);case 48:t.$emit("close");case 49:case"end":return e.stop()}}),e)})),function(){var t=this,a=arguments;return new Promise((function(n,o){var i=e.apply(t,a);function u(e){r(i,n,o,u,l,"next",e)}function l(e){r(i,n,o,u,l,"throw",e)}u(void 0)}))})()},getValidationState:function(e){var t=e.dirty,a=e.validated,n=e.valid;return t||a?void 0===n?null:n:null},maxlength_2:function(e){return String(e).substring(0,2)},maxlength_3:function(e){return String(e).substring(0,3)},maxlength_4:function(e){return String(e).substring(0,4)},maxlength_5:function(e){return String(e).substring(0,5)},maxlength_6:function(e){return String(e).substring(0,6)},maxlength_7:function(e){return String(e).substring(0,7)},focusNext:function(e,t,a){this.$focusNext(e,t,a)},frm_formatHp:function(e){return this.formatHp(e)},frm_formatBiz:function(e){return this.formatBiz(e)}}};var u=a(93379),l=a.n(u),s=a(57433),_={insert:"head",singleton:!1};l()(s.Z,_);s.Z.locals;const m=(0,a(51900).Z)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ValidationObserver",{ref:"observer",staticClass:"tax_iv",attrs:{tag:"form"},scopedSlots:e._u([{key:"default",fn:function(t){t.invalid;return["TX"==e.value.oex_type_fir?a("div",[a("h6",[e._v("세금계산서 발급 정보 등록")]),e._v(" "),a("b-form-radio",{attrs:{value:"IV"},model:{value:e.value.oex_type,callback:function(t){e.$set(e.value,"oex_type",t)},expression:"value.oex_type"}},[e._v("사업자 정보 입력")]),e._v(" "),a("transition",{attrs:{name:"slideUpDown"}},["IV"==e.value.oex_type?a("b-container",[a("b-form-checkbox",{model:{value:e.value.oex_hasBizLicense,callback:function(t){e.$set(e.value,"oex_hasBizLicense",t)},expression:"value.oex_hasBizLicense"}},[e._v("사업자등록증 사본 첨부")]),e._v(" "),a("transition",{attrs:{name:"slideUpDown"}},[e.value.oex_hasBizLicense?a("b-container",[a("b-row",[a("label",{attrs:{for:"biz_file"}},[e._v("파일 첨부")]),e._v(" "),a("ValidationProvider",{attrs:{name:"파일 첨부",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-form-file",{ref:"oex_file",attrs:{id:"biz_file",size:"sm",plain:"",state:e.getValidationState(t)},model:{value:e.value.oex_file,callback:function(t){e.$set(e.value,"oex_file",t)},expression:"value.oex_file"}}),e._v(" "),a("b-form-invalid-feedback",[e._v(e._s(t.errors[0]))])]}}],null,!0)})],1)],1):e._e()],1),e._v(" "),a("transition",{attrs:{name:"slideUpDown"}},[e.value.oex_hasBizLicense?e._e():a("b-container",[a("b-row",[a("label",{attrs:{for:"oex_biz_name"}},[e._v("법인명")]),e._v(" "),a("ValidationProvider",{attrs:{name:"법인명",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-form-input",{ref:"oex_biz_name",attrs:{id:"oex_biz_name",size:"sm",state:e.getValidationState(t)},model:{value:e.value.oex_biz_name,callback:function(t){e.$set(e.value,"oex_biz_name",t)},expression:"value.oex_biz_name"}}),e._v(" "),a("b-form-invalid-feedback",[e._v(e._s(t.errors[0]))])]}}],null,!0)})],1),e._v(" "),a("b-row",[a("label",{attrs:{for:"oex_biz_num"}},[e._v("등록번호")]),e._v(" "),a("ValidationProvider",{attrs:{name:"등록번호",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-form-input",{ref:"oex_biz_num",attrs:{id:"oex_biz_num",size:"sm",formatter:e.frm_formatBiz,state:e.getValidationState(t)},model:{value:e.value.oex_biz_num,callback:function(t){e.$set(e.value,"oex_biz_num",t)},expression:"value.oex_biz_num"}}),e._v(" "),a("b-form-invalid-feedback",[e._v(e._s(t.errors[0]))])]}}],null,!0)})],1),e._v(" "),a("b-row",[a("label",{attrs:{for:"oex_biz_type"}},[e._v("업태/종목")]),e._v(" "),a("ValidationProvider",{attrs:{name:"업태",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-form-input",{ref:"oex_biz_type",attrs:{id:"oex_biz_type",size:"sm",state:e.getValidationState(t)},model:{value:e.value.oex_biz_type,callback:function(t){e.$set(e.value,"oex_biz_type",t)},expression:"value.oex_biz_type"}}),e._v(" "),a("b-form-invalid-feedback",[e._v(e._s(t.errors[0]))])]}}],null,!0)}),e._v(" "),a("b",[e._v("/")]),e._v(" "),a("ValidationProvider",{attrs:{name:"종목",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-form-input",{ref:"oex_biz_item",attrs:{id:"oex_biz_item",size:"sm",state:e.getValidationState(t)},model:{value:e.value.oex_biz_item,callback:function(t){e.$set(e.value,"oex_biz_item",t)},expression:"value.oex_biz_item"}}),e._v(" "),a("b-form-invalid-feedback",[e._v(e._s(t.errors[0]))])]}}],null,!0)})],1),e._v(" "),a("b-row",[a("label",{attrs:{for:"oex_ceo"}},[e._v("대표자명")]),e._v(" "),a("ValidationProvider",{attrs:{name:"대표자명",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-form-input",{ref:"oex_ceo",attrs:{id:"oex_ceo",size:"sm",state:e.getValidationState(t)},model:{value:e.value.oex_ceo,callback:function(t){e.$set(e.value,"oex_ceo",t)},expression:"value.oex_ceo"}}),e._v(" "),a("b-form-invalid-feedback",[e._v(e._s(t.errors[0]))])]}}],null,!0)})],1),e._v(" "),a("b-row",[a("label",{attrs:{for:"oex_addr"}},[e._v("사업장소재지")]),e._v(" "),a("ValidationProvider",{attrs:{name:"사업장소재지",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-form-input",{ref:"oex_addr",attrs:{id:"oex_addr",size:"sm",state:e.getValidationState(t)},model:{value:e.value.oex_addr,callback:function(t){e.$set(e.value,"oex_addr",t)},expression:"value.oex_addr"}}),e._v(" "),a("b-form-invalid-feedback",[e._v(e._s(t.errors[0]))])]}}],null,!0)})],1),e._v(" "),a("b-row",[a("label",{attrs:{for:"oex_requirement"}},[e._v("요구사항")]),e._v(" "),a("ValidationProvider",{attrs:{name:"요구사항",rules:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-form-textarea",{ref:"oex_requirement",attrs:{id:"oex_requirement",size:"sm",state:e.getValidationState(t)},model:{value:e.value.oex_requirement,callback:function(t){e.$set(e.value,"oex_requirement",t)},expression:"value.oex_requirement"}}),e._v(" "),a("b-form-invalid-feedback",[e._v(e._s(t.errors[0]))])]}}],null,!0)})],1)],1)],1),e._v(" "),a("transition",{attrs:{name:"slideUpDown"}},["IVNO"!==e.value.oex_type?a("b-container",[a("b-row",[a("label",{attrs:{for:"oex_mng"}},[e._v("담당자")]),e._v(" "),a("ValidationProvider",{attrs:{name:"담당자",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-form-input",{ref:"oex_mng",attrs:{id:"oex_mng",size:"sm",state:e.getValidationState(t)},model:{value:e.value.oex_mng,callback:function(t){e.$set(e.value,"oex_mng",t)},expression:"value.oex_mng"}}),e._v(" "),a("b-form-invalid-feedback",[e._v(e._s(t.errors[0]))])]}}],null,!0)})],1),e._v(" "),a("b-row",[a("label",{attrs:{for:"oex_email"}},[e._v("이메일")]),e._v(" "),a("ValidationProvider",{attrs:{name:"이메일",rules:"required|email"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-form-input",{ref:"oex_email",attrs:{id:"oex_email",size:"sm",state:e.getValidationState(t)},model:{value:e.value.oex_email,callback:function(t){e.$set(e.value,"oex_email",t)},expression:"value.oex_email"}}),e._v(" "),a("b-form-invalid-feedback",[e._v(e._s(t.errors[0]))])]}}],null,!0)})],1),e._v(" "),a("b-row",[a("label",{attrs:{for:"oex_num_tel"}},[e._v("연락처")]),e._v(" "),a("ValidationProvider",{attrs:{name:"연락처",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-form-input",{ref:"oex_num_tel",attrs:{id:"oex_num_tel",size:"sm",formatter:e.frm_formatHp,state:e.getValidationState(t)},model:{value:e.value.oex_num_tel,callback:function(t){e.$set(e.value,"oex_num_tel",t)},expression:"value.oex_num_tel"}}),e._v(" "),a("b-form-invalid-feedback",[e._v(e._s(t.errors[0]))])]}}],null,!0)})],1)],1):e._e()],1)],1):e._e()],1),e._v(" "),a("b-form-radio",{attrs:{value:"IVNO"},model:{value:e.value.oex_type,callback:function(t){e.$set(e.value,"oex_type",t)},expression:"value.oex_type"}},[e._v("입력 안함")]),e._v(" "),a("br"),a("br")],1):"CA"==e.value.oex_type_fir?a("div",[a("h6",[e._v("소득공제용(일반개인용)")]),e._v(" "),a("b-form-radio",{attrs:{value:"HP"},model:{value:e.value.oex_type,callback:function(t){e.$set(e.value,"oex_type",t)},expression:"value.oex_type"}},[e._v("핸드폰번호")]),e._v(" "),a("transition",{attrs:{name:"slideUpDown"}},["HP"===e.value.oex_type?a("b-container",[a("b-row",[a("b-form-input",{ref:"oex_num_hp1",attrs:{type:"number",size:"sm",formatter:e.maxlength_3},nativeOn:{input:function(t){return e.focusNext(t,3,"oex_num_hp2")}},model:{value:e.value.oex_num_hp1,callback:function(t){e.$set(e.value,"oex_num_hp1",t)},expression:"value.oex_num_hp1"}}),a("b-icon-dash"),e._v(" "),a("b-form-input",{ref:"oex_num_hp2",attrs:{type:"number",size:"sm",formatter:e.maxlength_4},nativeOn:{input:function(t){return e.focusNext(t,4,"oex_num_hp3")}},model:{value:e.value.oex_num_hp2,callback:function(t){e.$set(e.value,"oex_num_hp2",t)},expression:"value.oex_num_hp2"}}),a("b-icon-dash"),e._v(" "),a("b-form-input",{ref:"oex_num_hp3",attrs:{type:"number",size:"sm",formatter:e.maxlength_4},model:{value:e.value.oex_num_hp3,callback:function(t){e.$set(e.value,"oex_num_hp3",t)},expression:"value.oex_num_hp3"}})],1)],1):e._e()],1),e._v(" "),a("b-form-radio",{attrs:{value:"IN"},model:{value:e.value.oex_type,callback:function(t){e.$set(e.value,"oex_type",t)},expression:"value.oex_type"}},[e._v("주민등록번호")]),e._v(" "),a("transition",{attrs:{name:"slideUpDown"}},["IN"===e.value.oex_type?a("b-container",[a("b-row",[a("b-form-input",{ref:"oex_num_in1",attrs:{type:"number",size:"sm",formatter:e.maxlength_6},nativeOn:{input:function(t){return e.focusNext(t,6,"oex_num_in2")}},model:{value:e.value.oex_num_in1,callback:function(t){e.$set(e.value,"oex_num_in1",t)},expression:"value.oex_num_in1"}}),a("b-icon-dash"),e._v(" "),a("b-form-input",{ref:"oex_num_in2",attrs:{type:"number",size:"sm",formatter:e.maxlength_7},model:{value:e.value.oex_num_in2,callback:function(t){e.$set(e.value,"oex_num_in2",t)},expression:"value.oex_num_in2"}})],1)],1):e._e()],1),e._v(" "),a("b-form-radio",{attrs:{value:"CN"},model:{value:e.value.oex_type,callback:function(t){e.$set(e.value,"oex_type",t)},expression:"value.oex_type"}},[e._v("카드번호")]),e._v(" "),a("transition",{attrs:{name:"slideUpDown"}},["CN"===e.value.oex_type?a("b-container",[a("b-row",[a("b-form-input",{ref:"oex_num_cn1",attrs:{type:"number",size:"sm",formatter:e.maxlength_6},nativeOn:{input:function(t){return e.focusNext(t,4,"oex_num_cn2")}},model:{value:e.value.oex_num_cn1,callback:function(t){e.$set(e.value,"oex_num_cn1",t)},expression:"value.oex_num_cn1"}}),a("b-icon-dash"),e._v(" "),a("b-form-input",{ref:"oex_num_cn2",attrs:{type:"number",size:"sm",formatter:e.maxlength_6},nativeOn:{input:function(t){return e.focusNext(t,4,"oex_num_cn3")}},model:{value:e.value.oex_num_cn2,callback:function(t){e.$set(e.value,"oex_num_cn2",t)},expression:"value.oex_num_cn2"}}),a("b-icon-dash"),e._v(" "),a("b-form-input",{ref:"oex_num_cn3",attrs:{type:"number",size:"sm",formatter:e.maxlength_6},nativeOn:{input:function(t){return e.focusNext(t,4,"oex_num_cn4")}},model:{value:e.value.oex_num_cn3,callback:function(t){e.$set(e.value,"oex_num_cn3",t)},expression:"value.oex_num_cn3"}}),a("b-icon-dash"),e._v(" "),a("b-form-input",{ref:"oex_num_cn4",attrs:{type:"number",size:"sm",formatter:e.maxlength_4},model:{value:e.value.oex_num_cn4,callback:function(t){e.$set(e.value,"oex_num_cn4",t)},expression:"value.oex_num_cn4"}})],1)],1):e._e()],1),e._v(" "),a("h6",[e._v("지출증빙용(사업자용)")]),e._v(" "),a("b-form-radio",{attrs:{value:"BN"},model:{value:e.value.oex_type,callback:function(t){e.$set(e.value,"oex_type",t)},expression:"value.oex_type"}},[e._v("사업자등록번호")]),e._v(" "),a("transition",{attrs:{name:"slideUpDown"}},["BN"===e.value.oex_type?a("b-container",[a("b-row",[a("b-form-input",{ref:"oex_num_bn1",attrs:{type:"number",size:"sm",formatter:e.maxlength_3},nativeOn:{input:function(t){return e.focusNext(t,3,"oex_num_bn2")}},model:{value:e.value.oex_num_bn1,callback:function(t){e.$set(e.value,"oex_num_bn1",t)},expression:"value.oex_num_bn1"}}),a("b-icon-dash"),e._v(" "),a("b-form-input",{ref:"oex_num_bn2",attrs:{type:"number",size:"sm",formatter:e.maxlength_2},nativeOn:{input:function(t){return e.focusNext(t,2,"oex_num_bn3")}},model:{value:e.value.oex_num_bn2,callback:function(t){e.$set(e.value,"oex_num_bn2",t)},expression:"value.oex_num_bn2"}}),a("b-icon-dash"),e._v(" "),a("b-form-input",{ref:"oex_num_bn3",attrs:{type:"number",size:"sm",formatter:e.maxlength_5},nativeOn:{input:function(t){return e.focusNext(t,5,"oex_biz_name")}},model:{value:e.value.oex_num_bn3,callback:function(t){e.$set(e.value,"oex_num_bn3",t)},expression:"value.oex_num_bn3"}})],1),e._v(" "),a("b-row",[a("b-form-input",{ref:"oex_biz_name",attrs:{id:"oex_biz_name",size:"sm",placeholder:"업체명 입력"},model:{value:e.value.oex_biz_name,callback:function(t){e.$set(e.value,"oex_biz_name",t)},expression:"value.oex_biz_name"}})],1)],1):e._e()],1)],1):e._e(),e._v(" "),a("b-button",{attrs:{size:"lg"},on:{click:e.close}},[e._v("확 인")])]}}])})}),[],!1,null,"6adc210f",null).exports}}]);