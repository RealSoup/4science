"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_admin_ledger__comp_ListHead_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'AdmLedgerListHead',
  props: ['ledger', 'mng_config_column', 'column_list_clmn', 'mng_config_model', 'column_list_model', 'row_width', 'model_width', 'total_ea_price', 'total_sum_price', 'all_chk_cplt', 'indeterminate'],
  components: {
    'Modal': function Modal() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_Modal_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/Modal.vue */ "./resources/js/views/_common/Modal.vue"));
    }
  },
  data: function data() {
    return {
      isScrollPass: false,
      headTop: 0
    };
  },
  computed: {
    all_chk: {
      get: function get() {
        return this.all_chk_cplt;
      },
      set: function set(v) {
        this.$emit('input', v);
      }
    }
  },
  methods: {
    scrollListener: function scrollListener(e) {
      var head_top = 310;
      this.isScrollPass = window.scrollY >= head_top;
      if (this.isScrollPass) this.headTop = window.scrollY - head_top;else this.headTop = 0;
    },
    toggle_all_chk: function toggle_all_chk(checked) {
      this.$emit('toggle_all_chk', checked);
    }
  },
  mounted: function mounted() {
    window.addEventListener('scroll', this.scrollListener);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=style&index=0&id=aa360294&lang=css&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=style&index=0&id=aa360294&lang=css&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.ledger_module[data-v-aa360294] { position:relative\n}\n.ledger_module .head[data-v-aa360294] { background:#666; padding:5px 0;\n}\n.ledger_module .head .col[data-v-aa360294] { font-weight:bold; font-size:.9rem; color:#fff;\n}\n.ledger_module .head .col .badge[data-v-aa360294] { font-size:1rem;\n}\n.ledger_module.fixed_header .head[data-v-aa360294] { z-index:2;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=style&index=0&id=aa360294&lang=css&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=style&index=0&id=aa360294&lang=css&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ListHead_vue_vue_type_style_index_0_id_aa360294_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ListHead.vue?vue&type=style&index=0&id=aa360294&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=style&index=0&id=aa360294&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ListHead_vue_vue_type_style_index_0_id_aa360294_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ListHead_vue_vue_type_style_index_0_id_aa360294_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/admin/ledger/_comp/ListHead.vue":
/*!************************************************************!*\
  !*** ./resources/js/views/admin/ledger/_comp/ListHead.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ListHead_vue_vue_type_template_id_aa360294_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ListHead.vue?vue&type=template&id=aa360294&scoped=true& */ "./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=template&id=aa360294&scoped=true&");
/* harmony import */ var _ListHead_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListHead.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=script&lang=js&");
/* harmony import */ var _ListHead_vue_vue_type_style_index_0_id_aa360294_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ListHead.vue?vue&type=style&index=0&id=aa360294&lang=css&scoped=true& */ "./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=style&index=0&id=aa360294&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ListHead_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ListHead_vue_vue_type_template_id_aa360294_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _ListHead_vue_vue_type_template_id_aa360294_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "aa360294",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/ledger/_comp/ListHead.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListHead_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ListHead.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListHead_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=style&index=0&id=aa360294&lang=css&scoped=true&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=style&index=0&id=aa360294&lang=css&scoped=true& ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ListHead_vue_vue_type_style_index_0_id_aa360294_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ListHead.vue?vue&type=style&index=0&id=aa360294&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=style&index=0&id=aa360294&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=template&id=aa360294&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=template&id=aa360294&scoped=true& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListHead_vue_vue_type_template_id_aa360294_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListHead_vue_vue_type_template_id_aa360294_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListHead_vue_vue_type_template_id_aa360294_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ListHead.vue?vue&type=template&id=aa360294&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=template&id=aa360294&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=template&id=aa360294&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/ledger/_comp/ListHead.vue?vue&type=template&id=aa360294&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
    "div",
    { staticClass: "ledger_module", class: { fixed_header: _vm.isScrollPass } },
    [
      _c(
        "b-row",
        {
          staticClass: "head",
          style: { width: _vm.row_width + "px", top: _vm.headTop + "px" },
        },
        [
          _c(
            "b-col",
            { staticClass: "list_id" },
            [
              _c(
                "b-form-checkbox",
                {
                  attrs: { indeterminate: _vm.indeterminate },
                  on: { change: _vm.toggle_all_chk },
                  model: {
                    value: _vm.all_chk,
                    callback: function ($$v) {
                      _vm.all_chk = $$v
                    },
                    expression: "all_chk",
                  },
                },
                [_vm._v("\r\n                All\r\n            ")]
              ),
            ],
            1
          ),
          _vm._v(" "),
          _vm._l(_vm.mng_config_column, function (mcc, i) {
            return [
              _vm._l(_vm.column_list_clmn, function (cl, k) {
                return [
                  k == mcc.umc_val && k == "order_dt"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "pay_type"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "mng"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "od_id"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "sale_dt"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "distributor"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "depart"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "lab_prof"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "orderer"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "od_name"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "sum_ea_p"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "sum_surtax"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "sum_sum_p"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "model"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          staticClass: "model",
                          style: { width: _vm.model_width + "px" },
                        },
                        [
                          _c(
                            "b-row",
                            { style: { width: _vm.model_width + "px" } },
                            [
                              _vm._l(_vm.mng_config_model, function (mcm, mi) {
                                return [
                                  _vm._l(
                                    _vm.column_list_model,
                                    function (clm, mk) {
                                      return [
                                        mk == mcm.umc_val && mk == "gm_name"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                staticClass: "gm_name",
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [_vm._v(_vm._s(clm.name))]
                                            )
                                          : mk == mcm.umc_val && mk == "gm_spec"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                staticClass: "gm_spec",
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [_vm._v(_vm._s(clm.name))]
                                            )
                                          : mk == mcm.umc_val && mk == "catno"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                staticClass: "catno",
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [_vm._v(_vm._s(clm.name))]
                                            )
                                          : mk == mcm.umc_val && mk == "gm_code"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                staticClass: "gm_code",
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [_vm._v(_vm._s(clm.name))]
                                            )
                                          : mk == mcm.umc_val &&
                                            mk == "gm_price"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                staticClass: "gm_price",
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [_vm._v(_vm._s(clm.name))]
                                            )
                                          : mk == mcm.umc_val && mk == "ea"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                staticClass: "ea",
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [_vm._v(_vm._s(clm.name))]
                                            )
                                          : mk == mcm.umc_val &&
                                            mk == "ea_price"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                staticClass: "ea_price",
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [
                                                _vm._v(
                                                  "\r\n                                    " +
                                                    _vm._s(clm.name) +
                                                    "\r\n                                    "
                                                ),
                                                _c("br"),
                                                _c(
                                                  "b-badge",
                                                  {
                                                    attrs: { variant: "info" },
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm._f("comma")(
                                                          _vm.total_ea_price
                                                        )
                                                      )
                                                    ),
                                                  ]
                                                ),
                                              ],
                                              1
                                            )
                                          : mk == mcm.umc_val && mk == "surtax"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [_vm._v(_vm._s(clm.name))]
                                            )
                                          : mk == mcm.umc_val &&
                                            mk == "sum_price"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [
                                                _vm._v(
                                                  "\r\n                                    " +
                                                    _vm._s(clm.name) +
                                                    "\r\n                                    "
                                                ),
                                                _c("br"),
                                                _c(
                                                  "b-badge",
                                                  {
                                                    attrs: { variant: "info" },
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm._f("comma")(
                                                          _vm.total_sum_price
                                                        )
                                                      )
                                                    ),
                                                  ]
                                                ),
                                              ],
                                              1
                                            )
                                          : mk == mcm.umc_val &&
                                            mk == "com_order_dt"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [_vm._v(_vm._s(clm.name))]
                                            )
                                          : mk == mcm.umc_val && mk == "buyer"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [_vm._v(_vm._s(clm.name))]
                                            )
                                          : mk == mcm.umc_val &&
                                            mk == "order_mng"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [_vm._v(_vm._s(clm.name))]
                                            )
                                          : mk == mcm.umc_val &&
                                            mk == "purchase_price"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [_vm._v(_vm._s(clm.name))]
                                            )
                                          : mk == mcm.umc_val &&
                                            mk == "shipping_dt"
                                          ? _c(
                                              "b-col",
                                              {
                                                key: "" + mi + mk,
                                                style: {
                                                  flexBasis: clm.w + "px",
                                                  maxWidth: clm.w + "px",
                                                },
                                              },
                                              [_vm._v(_vm._s(clm.name))]
                                            )
                                          : _vm._e(),
                                      ]
                                    }
                                  ),
                                ]
                              }),
                            ],
                            2
                          ),
                        ],
                        1
                      )
                    : k == mcc.umc_val && k == "tax_name"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "tax_email"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "tax_hp"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "note"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : k == mcc.umc_val && k == "created_at"
                    ? _c(
                        "b-col",
                        {
                          key: "" + i + k,
                          style: {
                            flexBasis: cl.w + "px",
                            maxWidth: cl.w + "px",
                          },
                        },
                        [_vm._v(_vm._s(cl.name))]
                      )
                    : _vm._e(),
                ]
              }),
            ]
          }),
        ],
        2
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);