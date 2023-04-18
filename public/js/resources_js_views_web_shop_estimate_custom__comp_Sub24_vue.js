"use strict";
(self["webpackChunkvue_4science"] = self["webpackChunkvue_4science"] || []).push([["resources_js_views_web_shop_estimate_custom__comp_Sub24_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  name: 'ShopEstimateCustomSub24',
  data: function data() {
    return {
      manufacturer: 'Digi-Key',
      manufacturer_label: 'Digi-Key 부품 번호',
      code: '',
      ea: '',
      label: [],
      val: []
    };
  },
  watch: {
    manufacturer: function manufacturer(n, o) {
      if (n == 'Digi-Key') this.manufacturer_label = 'Digi-Key 부품 번호';else if (n == 'Element14') this.manufacturer_label = 'Element14 주문코드';else if (n == 'Mouser') this.manufacturer_label = 'Mouser 번호';else if (n == '기타') this.manufacturer_label = '제품 페이지 링크';
    }
  },
  methods: {
    add: function add() {
      if (isEmpty(this.code)) {
        Notify.toast('danger', "".concat(this.manufacturer_label, "\uB97C \uC785\uB825\uD558\uC138\uC694"));
        return false;
      }

      if (isEmpty(this.ea)) {
        Notify.toast('danger', "수량을 입력하세요");
        return false;
      }

      this.label.push('주문 종류', '주문 코드', '수량');
      this.val.push([this.manufacturer, this.code, this.ea]);
      this.code = '';
      this.ea = '';
    },
    del: function del(i) {
      this.val.splice(i, 1);
    },
    checkValidation: function checkValidation() {
      if (isEmpty(this.val)) {
        Notify.toast('danger', "요청사항을(를) 추가하세요");
        return false;
      }

      this.val = this.val.reduce(function (acc, cur) {
        //  Spread operator는 ...와 같이 배열의 요소들을 나열하는 전개 연산자입니다.
        return [].concat(_toConsumableArray(acc), _toConsumableArray(cur));
      });
      return true;
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=style&index=0&id=326d7eeb&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=style&index=0&id=326d7eeb&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.ctrl[data-v-326d7eeb] { align-items:flex-end;\n}\n.ctrl .col[data-v-326d7eeb]:nth-child(1) { flex:0 0 60%; max-width:60%;\n}\n.list .col[data-v-326d7eeb]:nth-child(1) { flex:0 0 15%; max-width:15%;\n}\n.list .col[data-v-326d7eeb]:nth-child(2) { flex:0 0 60%; max-width:60%;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=style&index=0&id=326d7eeb&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=style&index=0&id=326d7eeb&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub24_vue_vue_type_style_index_0_id_326d7eeb_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sub24.vue?vue&type=style&index=0&id=326d7eeb&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=style&index=0&id=326d7eeb&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub24_vue_vue_type_style_index_0_id_326d7eeb_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub24_vue_vue_type_style_index_0_id_326d7eeb_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Sub24_vue_vue_type_template_id_326d7eeb_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sub24.vue?vue&type=template&id=326d7eeb&scoped=true& */ "./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=template&id=326d7eeb&scoped=true&");
/* harmony import */ var _Sub24_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sub24.vue?vue&type=script&lang=js& */ "./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=script&lang=js&");
/* harmony import */ var _Sub24_vue_vue_type_style_index_0_id_326d7eeb_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Sub24.vue?vue&type=style&index=0&id=326d7eeb&scoped=true&lang=css& */ "./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=style&index=0&id=326d7eeb&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Sub24_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sub24_vue_vue_type_template_id_326d7eeb_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Sub24_vue_vue_type_template_id_326d7eeb_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "326d7eeb",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub24_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sub24.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub24_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=style&index=0&id=326d7eeb&scoped=true&lang=css&":
/*!******************************************************************************************************************************!*\
  !*** ./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=style&index=0&id=326d7eeb&scoped=true&lang=css& ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub24_vue_vue_type_style_index_0_id_326d7eeb_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sub24.vue?vue&type=style&index=0&id=326d7eeb&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=style&index=0&id=326d7eeb&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=template&id=326d7eeb&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=template&id=326d7eeb&scoped=true& ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub24_vue_vue_type_template_id_326d7eeb_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub24_vue_vue_type_template_id_326d7eeb_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub24_vue_vue_type_template_id_326d7eeb_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sub24.vue?vue&type=template&id=326d7eeb&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=template&id=326d7eeb&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=template&id=326d7eeb&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub24.vue?vue&type=template&id=326d7eeb&scoped=true& ***!
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
  return _c(
    "b-container",
    { staticClass: "frm_st" },
    [
      _c(
        "b-row",
        [
          _c("b-col", { staticClass: "label_st" }, [
            _vm._v("판매처"),
            _c("b", { staticClass: "need" }),
          ]),
          _vm._v(" "),
          _c(
            "b-col",
            [
              _c(
                "b-form-select",
                {
                  staticClass: "w-50",
                  model: {
                    value: _vm.manufacturer,
                    callback: function ($$v) {
                      _vm.manufacturer = $$v
                    },
                    expression: "manufacturer",
                  },
                },
                [
                  _c("b-form-select-option", { attrs: { value: "Digi-Key" } }, [
                    _vm._v("Digi-Key"),
                  ]),
                  _vm._v(" "),
                  _c(
                    "b-form-select-option",
                    { attrs: { value: "Element14" } },
                    [_vm._v("Element14")]
                  ),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "Mouser" } }, [
                    _vm._v("Mouser"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "기타" } }, [
                    _vm._v("기타"),
                  ]),
                ],
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-row",
        { staticClass: "ctrl" },
        [
          _c(
            "b-col",
            [
              _c("i", [_vm._v(_vm._s(_vm.manufacturer_label))]),
              _vm._v(" "),
              _c("b-form-input", {
                model: {
                  value: _vm.code,
                  callback: function ($$v) {
                    _vm.code = $$v
                  },
                  expression: "code",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            [
              _c("i", [_vm._v("수량")]),
              _vm._v(" "),
              _c("b-form-input", {
                model: {
                  value: _vm.ea,
                  callback: function ($$v) {
                    _vm.ea = $$v
                  },
                  expression: "ea",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            [
              _c(
                "b-button",
                { attrs: { size: "sm" }, on: { click: _vm.add } },
                [_vm._v("추가")]
              ),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _vm._l(_vm.val, function (v, i) {
        return _c(
          "b-row",
          { key: i, staticClass: "list" },
          [
            _c("b-col", [_vm._v(_vm._s(v[0]))]),
            _vm._v(" "),
            _c("b-col", [_vm._v(_vm._s(v[1]))]),
            _vm._v(" "),
            _c("b-col", [_vm._v(_vm._s(v[2]))]),
            _vm._v(" "),
            _c(
              "b-col",
              [
                _c(
                  "b-button",
                  {
                    attrs: { size: "sm", variant: "danger" },
                    on: {
                      click: function ($event) {
                        return _vm.del(i)
                      },
                    },
                  },
                  [_vm._v("취소")]
                ),
              ],
              1
            ),
          ],
          1
        )
      }),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);