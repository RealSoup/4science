"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web_shop_estimate_custom__comp_Sub10_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ShopEstimateCustomSub10',
  data: function data() {
    return {
      label: ['견적 종류'],
      val: [],
      eq_content_list: {
        'default': "제품명 : \n사양 : \n수량 : ",
        'type01': "1.Layer : \n2.B/D size : \n3.희망납기일 :\n4.기타문의내용 :",
        'type02': "1. 수량 : \n2. Layer : \n3. 사이즈 : \n4. 재질 : \n5. 표면처리 : \n6. PCB두께 : \n7. 동박두께 : \n8. V-CUT : \n9. 실크색상 : \n10. 솔더색상 : \n11. 기타문의사항 :"
      }
    };
  },
  watch: {
    'val': {
      deep: true,
      handler: function handler(v) {
        var tmp = '';
        if (v[0] == '아트웍 견적 요청') tmp = this.eq_content_list.type01;else if (v[0] == 'PCB 견적 요청') tmp = this.eq_content_list.type02;else tmp = this.eq_content_list["default"];
        this.$emit('set_eq_content', tmp);
      }
    }
  },
  methods: {
    checkValidation: function checkValidation() {
      if (isEmpty(this.val[0])) {
        Notify.toast('danger', "견적 종류을(를) 선택하세요");
        return false;
      }

      return true;
    }
  }
});

/***/ }),

/***/ "./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Sub10_vue_vue_type_template_id_30804848___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sub10.vue?vue&type=template&id=30804848& */ "./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue?vue&type=template&id=30804848&");
/* harmony import */ var _Sub10_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sub10.vue?vue&type=script&lang=js& */ "./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sub10_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sub10_vue_vue_type_template_id_30804848___WEBPACK_IMPORTED_MODULE_0__.render,
  _Sub10_vue_vue_type_template_id_30804848___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub10_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sub10.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub10_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue?vue&type=template&id=30804848&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue?vue&type=template&id=30804848& ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub10_vue_vue_type_template_id_30804848___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub10_vue_vue_type_template_id_30804848___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub10_vue_vue_type_template_id_30804848___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sub10.vue?vue&type=template&id=30804848& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue?vue&type=template&id=30804848&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue?vue&type=template&id=30804848&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub10.vue?vue&type=template&id=30804848& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("b-container", { staticClass: "frm_st" }, [
    _c(
      "table",
      { attrs: { cellpadding: "0", cellspacing: "0", border: "0" } },
      [
        _c("tr", [
          _c("th", [_vm._v("견적 종류"), _c("b")]),
          _vm._v(" "),
          _c(
            "td",
            [
              _c(
                "b-form-select",
                {
                  staticClass: "w-50",
                  model: {
                    value: _vm.val[0],
                    callback: function ($$v) {
                      _vm.$set(_vm.val, 0, $$v)
                    },
                    expression: "val[0]",
                  },
                },
                [
                  _c("b-form-select-option", { attrs: { value: "" } }, [
                    _vm._v("선택하세요."),
                  ]),
                  _vm._v(" "),
                  _c(
                    "b-form-select-option",
                    { attrs: { value: "아트웍 견적 요청" } },
                    [_vm._v("아트웍 견적 요청")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-select-option",
                    { attrs: { value: "PCB 견적 요청" } },
                    [_vm._v("PCB 견적 요청")]
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _vm.val[0] == "아트웍 견적 요청"
                ? _c("em", [
                    _vm._v(
                      "※첨부파일은 ORCAD 회로도 첨부하시면 됩니다. 모든항목 특이사항이 없으면, 기본사항으로 적용됩니다."
                    ),
                  ])
                : _vm.val[0] == "PCB 견적 요청"
                ? _c("em", [
                    _vm._v(
                      "※첨부파일은 Gerber DATA 첨부하시면 됩니다. 모든항목 특이사항이 없으면, 기본사항으로 적용됩니다."
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("em", [_vm._v("견적 종류를 선택하세요.")]),
            ],
            1
          ),
        ]),
      ]
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);