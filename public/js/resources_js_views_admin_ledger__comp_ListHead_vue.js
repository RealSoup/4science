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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'AdmLedgerListHead',
  props: ['mng_config', 'column_list', 'model_width', 'total_ea_price', 'total_sum_price', 'all_chk_cplt', 'indeterminate'],
  components: {
    'Modal': function Modal() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_Modal_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/Modal.vue */ "./resources/js/views/_common/Modal.vue"));
    }
  },
  data: function data() {
    return {
      isScrollPass: false,
      headTop: 0,
      show_head_menu: false
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
    toggle_all_chk: function toggle_all_chk(checked) {
      this.$emit('toggle_all_chk', checked);
    },
    modal_view: function modal_view(checked) {
      this.$emit('modal_view', checked);
    },
    create: function create() {
      this.$emit('create', 'lg');
    }
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.row[data-v-aa360294] { background:#666;\n}\n.row .col[data-v-aa360294] { font-weight:bold; font-size:.9rem; color:#fff;\n}\r\n", ""]);
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
    "b-row",
    {
      attrs: { tabindex: -1 },
      on: {
        mousedown: function ($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "right", 39, $event.key, [
              "Right",
              "ArrowRight",
            ])
          ) {
            return null
          }
          if ("button" in $event && $event.button !== 2) {
            return null
          }
          _vm.show_head_menu = true
        },
        contextmenu: function ($event) {
          $event.preventDefault()
        },
        blur: function ($event) {
          _vm.show_head_menu = false
        },
      },
    },
    [
      _c(
        "b-col",
        { staticClass: "list_id" },
        [
          _c("transition", { attrs: { name: "slide-fade" } }, [
            _vm.show_head_menu
              ? _c(
                  "div",
                  { staticClass: "hidden_menu" },
                  [
                    _c(
                      "b-button",
                      {
                        directives: [
                          {
                            name: "b-tooltip",
                            rawName: "v-b-tooltip.hover",
                            value: "정보 나열 순서",
                            expression: "'정보 나열 순서'",
                            modifiers: { hover: true },
                          },
                        ],
                        attrs: { size: "sm", variant: "warning" },
                        on: {
                          click: function ($event) {
                            return _vm.modal_view(true)
                          },
                        },
                      },
                      [_c("b-icon-gear")],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "b-button",
                      {
                        directives: [
                          {
                            name: "b-tooltip",
                            rawName: "v-b-tooltip.hover",
                            value: "생성",
                            expression: "'생성'",
                            modifiers: { hover: true },
                          },
                        ],
                        attrs: { size: "sm", variant: "primary" },
                        on: { click: _vm.create },
                      },
                      [_c("b-icon-plus-lg")],
                      1
                    ),
                  ],
                  1
                )
              : _vm._e(),
          ]),
          _vm._v(" "),
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
            [_vm._v("All")]
          ),
        ],
        1
      ),
      _vm._v(" "),
      _vm._l(_vm.mng_config.COLUMN, function (mcc, i) {
        return [
          mcc.umc_val == "order_dt"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.order_dt.w + "px",
                    maxWidth: _vm.column_list.COLUMN.order_dt.w + "px",
                  },
                },
                [_vm._v("주문일")]
              )
            : mcc.umc_val == "pay_type"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.pay_type.w + "px",
                    maxWidth: _vm.column_list.COLUMN.pay_type.w + "px",
                  },
                },
                [_vm._v("결제방식")]
              )
            : mcc.umc_val == "mng"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.mng.w + "px",
                    maxWidth: _vm.column_list.COLUMN.mng.w + "px",
                  },
                },
                [_vm._v("담당자")]
              )
            : mcc.umc_val == "od_id"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.od_id.w + "px",
                    maxWidth: _vm.column_list.COLUMN.od_id.w + "px",
                  },
                },
                [_vm._v("주문번호")]
              )
            : mcc.umc_val == "sale_dt"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.sale_dt.w + "px",
                    maxWidth: _vm.column_list.COLUMN.sale_dt.w + "px",
                  },
                },
                [_vm._v("매출일")]
              )
            : mcc.umc_val == "distributor"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.distributor.w + "px",
                    maxWidth: _vm.column_list.COLUMN.distributor.w + "px",
                  },
                },
                [_vm._v("매출처")]
              )
            : mcc.umc_val == "depart"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.depart.w + "px",
                    maxWidth: _vm.column_list.COLUMN.depart.w + "px",
                  },
                },
                [_vm._v("소속")]
              )
            : mcc.umc_val == "lab_prof"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.lab_prof.w + "px",
                    maxWidth: _vm.column_list.COLUMN.lab_prof.w + "px",
                  },
                },
                [_vm._v("연구실/교수님")]
              )
            : mcc.umc_val == "orderer"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.orderer.w + "px",
                    maxWidth: _vm.column_list.COLUMN.orderer.w + "px",
                  },
                },
                [_vm._v("고객명")]
              )
            : mcc.umc_val == "od_name"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.od_name.w + "px",
                    maxWidth: _vm.column_list.COLUMN.od_name.w + "px",
                  },
                },
                [_vm._v("주문명")]
              )
            : mcc.umc_val == "sum_ea_p"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.sum_ea_p.w + "px",
                    maxWidth: _vm.column_list.COLUMN.sum_ea_p.w + "px",
                  },
                },
                [_vm._v("총 공급가액")]
              )
            : mcc.umc_val == "sum_surtax"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.sum_surtax.w + "px",
                    maxWidth: _vm.column_list.COLUMN.sum_surtax.w + "px",
                  },
                },
                [_vm._v("총 세액")]
              )
            : mcc.umc_val == "sum_sum_p"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.sum_sum_p.w + "px",
                    maxWidth: _vm.column_list.COLUMN.sum_sum_p.w + "px",
                  },
                },
                [_vm._v("총 합계")]
              )
            : mcc.umc_val == "tax_name"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.tax_name.w + "px",
                    maxWidth: _vm.column_list.COLUMN.tax_name.w + "px",
                  },
                },
                [_vm._v("tax담당")]
              )
            : mcc.umc_val == "tax_email"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.tax_email.w + "px",
                    maxWidth: _vm.column_list.COLUMN.tax_email.w + "px",
                  },
                },
                [_vm._v("tax메일")]
              )
            : mcc.umc_val == "tax_hp"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.tax_hp.w + "px",
                    maxWidth: _vm.column_list.COLUMN.tax_hp.w + "px",
                  },
                },
                [_vm._v("tax번호")]
              )
            : mcc.umc_val == "note"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.note.w + "px",
                    maxWidth: _vm.column_list.COLUMN.note.w + "px",
                  },
                },
                [_vm._v("비고")]
              )
            : mcc.umc_val == "created_at"
            ? _c(
                "b-col",
                {
                  key: i,
                  style: {
                    flexBasis: _vm.column_list.COLUMN.created_at.w + "px",
                    maxWidth: _vm.column_list.COLUMN.created_at.w + "px",
                  },
                },
                [_vm._v("작성일")]
              )
            : mcc.umc_val == "model"
            ? _c(
                "b-col",
                {
                  key: i,
                  staticClass: "model",
                  style: { width: _vm.model_width + "px" },
                },
                [
                  _c(
                    "b-row",
                    { style: { width: _vm.model_width + "px" } },
                    [
                      _vm._l(_vm.mng_config.MODEL, function (mcm, mi) {
                        return [
                          mcm.umc_val == "gm_name"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.gm_name.w + "px",
                                    maxWidth:
                                      _vm.column_list.MODEL.gm_name.w + "px",
                                  },
                                },
                                [_vm._v("품목명")]
                              )
                            : mcm.umc_val == "gm_spec"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.gm_spec.w + "px",
                                    maxWidth:
                                      _vm.column_list.MODEL.gm_spec.w + "px",
                                  },
                                },
                                [_vm._v("사양")]
                              )
                            : mcm.umc_val == "catno"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.catno.w + "px",
                                    maxWidth:
                                      _vm.column_list.MODEL.catno.w + "px",
                                  },
                                },
                                [_vm._v("CAT.No")]
                              )
                            : mcm.umc_val == "gm_code"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.gm_code.w + "px",
                                    maxWidth:
                                      _vm.column_list.MODEL.gm_code.w + "px",
                                  },
                                },
                                [_vm._v("모델명")]
                              )
                            : mcm.umc_val == "gm_price"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.gm_price.w + "px",
                                    maxWidth:
                                      _vm.column_list.MODEL.gm_price.w + "px",
                                  },
                                },
                                [_vm._v("단가")]
                              )
                            : mcm.umc_val == "ea"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.ea.w + "px",
                                    maxWidth: _vm.column_list.MODEL.ea.w + "px",
                                  },
                                },
                                [_vm._v("수량")]
                              )
                            : mcm.umc_val == "ea_price"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.ea_price.w + "px",
                                    maxWidth:
                                      _vm.column_list.MODEL.ea_price.w + "px",
                                  },
                                },
                                [_vm._v("공급가액")]
                              )
                            : mcm.umc_val == "surtax"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.surtax.w + "px",
                                    maxWidth:
                                      _vm.column_list.MODEL.surtax.w + "px",
                                  },
                                },
                                [_vm._v("세액")]
                              )
                            : mcm.umc_val == "sum_price"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.sum_price.w + "px",
                                    maxWidth:
                                      _vm.column_list.MODEL.sum_price.w + "px",
                                  },
                                },
                                [_vm._v("함계")]
                              )
                            : mcm.umc_val == "com_order_dt"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.com_order_dt.w +
                                      "px",
                                    maxWidth:
                                      _vm.column_list.MODEL.com_order_dt.w +
                                      "px",
                                  },
                                },
                                [_vm._v("업체발주일")]
                              )
                            : mcm.umc_val == "buyer"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.buyer.w + "px",
                                    maxWidth:
                                      _vm.column_list.MODEL.buyer.w + "px",
                                  },
                                },
                                [_vm._v("매입처")]
                              )
                            : mcm.umc_val == "order_mng"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.order_mng.w + "px",
                                    maxWidth:
                                      _vm.column_list.MODEL.order_mng.w + "px",
                                  },
                                },
                                [_vm._v("발주담당")]
                              )
                            : mcm.umc_val == "purchase_price"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.purchase_price.w +
                                      "px",
                                    maxWidth:
                                      _vm.column_list.MODEL.purchase_price.w +
                                      "px",
                                  },
                                },
                                [_vm._v("매입금액")]
                              )
                            : mcm.umc_val == "shipping_dt"
                            ? _c(
                                "b-col",
                                {
                                  key: mi,
                                  style: {
                                    flexBasis:
                                      _vm.column_list.MODEL.shipping_dt.w +
                                      "px",
                                    maxWidth:
                                      _vm.column_list.MODEL.shipping_dt.w +
                                      "px",
                                  },
                                },
                                [_vm._v("제품방송일")]
                              )
                            : _vm._e(),
                        ]
                      }),
                    ],
                    2
                  ),
                ],
                1
              )
            : _vm._e(),
        ]
      }),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);