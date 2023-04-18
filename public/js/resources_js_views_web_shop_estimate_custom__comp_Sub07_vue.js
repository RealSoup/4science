"use strict";
(self["webpackChunkvue_4science"] = self["webpackChunkvue_4science"] || []).push([["resources_js_views_web_shop_estimate_custom__comp_Sub07_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ShopEstimateCustomSub07',
  data: function data() {
    return {
      label: ['Application', '기존 system 사용 유무', 'Camera type', '구동방식', '기타사항'],
      val: []
    };
  },
  methods: {
    checkValidation: function checkValidation() {
      if (isEmpty(this.val[0])) {
        Notify.toast('danger', "Application을(를) 입력하세요");
        return false;
      }

      if (isEmpty(this.val[1])) {
        Notify.toast('danger', "기존 system 사용 유무을(를) 입력하세요");
        return false;
      }

      if (isEmpty(this.val[2])) {
        Notify.toast('danger', "Camera type을(를) 입력하세요");
        return false;
      }

      if (isEmpty(this.val[3])) {
        Notify.toast('danger', "구동방식을(를) 입력하세요");
        return false;
      }

      if (isEmpty(this.val[4])) {
        Notify.toast('danger', "기타사항을(를) 입력하세요");
        return false;
      }

      return true;
    }
  }
});

/***/ }),

/***/ "./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Sub07_vue_vue_type_template_id_2f2e1430_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sub07.vue?vue&type=template&id=2f2e1430&scoped=true& */ "./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue?vue&type=template&id=2f2e1430&scoped=true&");
/* harmony import */ var _Sub07_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sub07.vue?vue&type=script&lang=js& */ "./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sub07_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sub07_vue_vue_type_template_id_2f2e1430_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Sub07_vue_vue_type_template_id_2f2e1430_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "2f2e1430",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub07_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sub07.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub07_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue?vue&type=template&id=2f2e1430&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue?vue&type=template&id=2f2e1430&scoped=true& ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub07_vue_vue_type_template_id_2f2e1430_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub07_vue_vue_type_template_id_2f2e1430_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub07_vue_vue_type_template_id_2f2e1430_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sub07.vue?vue&type=template&id=2f2e1430&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue?vue&type=template&id=2f2e1430&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue?vue&type=template&id=2f2e1430&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub07.vue?vue&type=template&id=2f2e1430&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
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
          _c("th", [_vm._v("Application"), _c("b")]),
          _c(
            "td",
            [
              _c("b-form-input", {
                staticClass: "w-50",
                model: {
                  value: _vm.val[0],
                  callback: function ($$v) {
                    _vm.$set(_vm.val, 0, $$v)
                  },
                  expression: "val[0]",
                },
              }),
              _vm._v(" 영상획득, PL, Raman, Laser microscopy"),
            ],
            1
          ),
        ]),
        _vm._v(" "),
        _c("tr", [
          _c("th", [_vm._v("기존 system 사용 유무 "), _c("b")]),
          _c(
            "td",
            [
              _c("b-form-input", {
                staticClass: "w-50",
                model: {
                  value: _vm.val[1],
                  callback: function ($$v) {
                    _vm.$set(_vm.val, 1, $$v)
                  },
                  expression: "val[1]",
                },
              }),
              _vm._v(" 경통, 현미경 등"),
            ],
            1
          ),
        ]),
        _vm._v(" "),
        _c("tr", [
          _c("th", [_vm._v("Camera type "), _c("b")]),
          _c(
            "td",
            [
              _c("b-form-input", {
                staticClass: "w-50",
                model: {
                  value: _vm.val[2],
                  callback: function ($$v) {
                    _vm.$set(_vm.val, 2, $$v)
                  },
                  expression: "val[2]",
                },
              }),
              _vm._v(" CCD, CMOS (동영상 위주인지 싱글샷 위주인지)"),
            ],
            1
          ),
        ]),
        _vm._v(" "),
        _c("tr", [
          _c("th", [_vm._v("구동방식"), _c("b")]),
          _c(
            "td",
            [
              _c("b-form-input", {
                staticClass: "w-50",
                model: {
                  value: _vm.val[3],
                  callback: function ($$v) {
                    _vm.$set(_vm.val, 3, $$v)
                  },
                  expression: "val[3]",
                },
              }),
              _vm._v(" Manual, Motorized"),
            ],
            1
          ),
        ]),
        _vm._v(" "),
        _c("tr", [
          _c("th", [_vm._v("기타사항"), _c("b")]),
          _c(
            "td",
            [
              _c("b-form-textarea", {
                attrs: { rows: "5" },
                model: {
                  value: _vm.val[4],
                  callback: function ($$v) {
                    _vm.$set(_vm.val, 4, $$v)
                  },
                  expression: "val[4]",
                },
              }),
              _c("em", [
                _vm._v(
                  "설치 될 환경조건에 대해 기입 해 주세요. 환경 사진이이나 컨셉 개략도가 있다면 하단 문의사항의 첨부파일에서 첨부 해 주세요."
                ),
              ]),
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