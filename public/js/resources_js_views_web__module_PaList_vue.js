"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web__module_PaList_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/PaList.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/PaList.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
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
  name: 'PaList',
  props: ['value', 'price'],
  data: function data() {
    return {};
  },
  computed: {
    dlvy_4s: function dlvy_4s() {
      return this.value.hasOwnProperty(0) ? this.value[0][0].pa_dlvy_p_add_vat : 0;
    },
    dlvy_other: function dlvy_other() {
      return Object.values(this.value).reduce(function (acc, el) {
        return acc + el[0].pa_name != '' ? el[0].pa_dlvy_p_add_vat : 0;
      }, 0);
    },
    sum_mileage: function sum_mileage() {
      return Object.values(this.value).reduce(function (acc, el) {
        return acc + el.reduce(function (acc02, el02) {
          return acc02 + el02.gain_mileage;
        }, 0);
      }, 0);
    }
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/PaList.vue?vue&type=style&index=0&id=108a11ad&lang=css&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/PaList.vue?vue&type=style&index=0&id=108a11ad&lang=css&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.pa_list[data-v-108a11ad] { margin-bottom:2.5rem; padding:0;\n}\n.pa_list .row[data-v-108a11ad] { margin:0; border-bottom:1px solid #D6D6D6;\n}\n.pa_list .row .col[data-v-108a11ad] { padding:0; font-size:.93rem; color:#666;\n}\n.pa_list .row.lbody .col[data-v-108a11ad]:not(:nth-of-type(2)) { display:flex; align-items:center; justify-content:center; text-align:center;\n}\n.pa_list .row .col .row[data-v-108a11ad]:last-child { border-bottom-width:0;\n}\n.pa_list .row.lbody>.col[data-v-108a11ad]:first-child { border-right:1px solid #D6D6D6;\n}\n.pa_list .row.lbody>.col[data-v-108a11ad]:last-child { border-left:1px solid #D6D6D6;\n}\n.pa_list .lhead .col[data-v-108a11ad] { font-weight:bold; text-align:center; padding:.74rem 0; color:#000;\n}\n.pa_list .lhead .col[data-v-108a11ad]:nth-of-type(2) { flex-basis:11.2%; max-width:11.2%;\n}\n.pa_list .lhead .col[data-v-108a11ad]:nth-of-type(3) { flex-basis:8.8%; max-width:8.8%;\n}\n.pa_list .lhead .col[data-v-108a11ad]:nth-of-type(4) { flex-basis:7.2%; max-width:7.2%;\n}\n.pa_list .lhead .col[data-v-108a11ad]:nth-of-type(5) { flex-basis:9.6%; max-width:9.6%;\n}\n.pa_list .lhead .col[data-v-108a11ad]:nth-of-type(6) { flex-basis:10%; max-width:10%;\n}\n.pa_list .lbody>.col[data-v-108a11ad]:nth-of-type(1),\r\n.pa_list .lbody>.col[data-v-108a11ad]:nth-of-type(3) { flex-basis:10%; max-width:10%; font-weight:600; color:#000;\n}\n.pa_list .lbody .col .row .col[data-v-108a11ad]:nth-of-type(1) { flex-basis:14%; max-width:14%;\n}\n.pa_list .lbody .col .row .col[data-v-108a11ad]:nth-of-type(3) { flex-basis:14%; max-width:14%;\n}\n.pa_list .lbody .col .row .col[data-v-108a11ad]:nth-of-type(4) { flex-basis:11%; max-width:11%; justify-content:flex-end; padding-right:.5rem;\n}\n.pa_list .lbody .col .row .col[data-v-108a11ad]:nth-of-type(5) { flex-basis:9%; max-width:9%; justify-content:flex-end; padding-right:.5rem;\n}\n.pa_list .lbody .col .row .col[data-v-108a11ad]:nth-of-type(6) { flex-basis:12%; max-width:12%; font-weight:600; color:#000; justify-content:flex-end; padding-right:.5rem;\n}\n.pa_list .lbody .col .row .col:nth-of-type(6) span[data-v-108a11ad] { font-size:.7rem; color:#666;\n}\n.pa_list .row .col .row.option[data-v-108a11ad] { background:#F4F1EC;\n}\n.pa_list .row .col .row .col[data-v-108a11ad] { padding:.8rem 0;\n}\n.pa_list .row .col .row .col img[data-v-108a11ad] { width:119px; height:119px; -o-object-fit:cover; object-fit:cover;\n}\n.pa_list .row .col .row .col p[data-v-108a11ad] { margin-bottom:.2rem;\n}\n.pa_list .row .col .row .col[data-v-108a11ad]:nth-of-type(2) { padding-left:1rem;\n}\n.pa_list .row .col .row .col:nth-of-type(2) p[data-v-108a11ad]:nth-of-type(1){ font-weight:bold; margin-bottom:.8rem; color:#000;\n}\n.pa_list .total[data-v-108a11ad] { margin-top:1.6rem; border-top:2px solid #363636; border-bottom:1px solid #D6D6D6;\n}\n.pa_list .total .col[data-v-108a11ad] { color:#000; font-weight:bold; padding:1rem 3rem;\n}\n.pa_list .total .col b[data-v-108a11ad] { font-size:1.4rem;\n}\n.pa_list .total .col[data-v-108a11ad]:nth-of-type(1) { display:flex; align-items:center;\n}\n.pa_list .total .col[data-v-108a11ad]:nth-of-type(2) { text-align:right; border-right:1px solid #D6D6D6;\n}\n.pa_list .total .col[data-v-108a11ad]:nth-of-type(2):after { background:#707070; width:25px; height:25px; border-radius:13px; content:\"+\"; position:absolute; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1;\n}\n.pa_list .total .col[data-v-108a11ad]:nth-of-type(3) { display:flex; align-items:center;\n}\n.pa_list .total .col[data-v-108a11ad]:nth-of-type(4) { text-align:right; border-right:1px solid #D6D6D6;\n}\n.pa_list .total .col[data-v-108a11ad]:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; content:\"=\"; position:absolute; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1;\n}\n.pa_list .total .col[data-v-108a11ad]:nth-of-type(5) { display:flex; align-items:center; flex-basis:20%; max-width:20%;\n}\n.pa_list .total .col[data-v-108a11ad]:nth-of-type(6) { text-align:right; flex-basis:20%; max-width:20%;\n}\n.pa_list .total_sub[data-v-108a11ad] { background:#F2F3F5; border-bottom-width:0;\n}\n.pa_list .total_sub>.col[data-v-108a11ad]:nth-of-type(1) { border-right:1px solid #D6D6D6;\n}\n.pa_list .total_sub>.col[data-v-108a11ad]:nth-of-type(2) { border-right:1px solid #D6D6D6;\n}\n.pa_list .total_sub>.col[data-v-108a11ad]:nth-of-type(3) { flex-basis:40%; max-width:40%;\n}\n.pa_list .total_sub .col>div[data-v-108a11ad] { display:flex; flex-wrap:wrap;\n}\n.pa_list .total_sub .col>div[data-v-108a11ad]:nth-of-type(1) { padding:1.3rem 3rem .5rem 3rem;\n}\n.pa_list .total_sub .col>div[data-v-108a11ad]:nth-of-type(2) { padding:0 3rem 2.5rem 3rem;\n}\n.pa_list .total_sub .col>div .col[data-v-108a11ad] { color:#A8A9AB; font-weight:bold; font-size:.84rem;\n}\n.pa_list .total_sub .col>div .col[data-v-108a11ad]:nth-of-type(2) { text-align:right;\n}\r\n\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/PaList.vue?vue&type=style&index=0&id=108a11ad&lang=css&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/PaList.vue?vue&type=style&index=0&id=108a11ad&lang=css&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PaList_vue_vue_type_style_index_0_id_108a11ad_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaList.vue?vue&type=style&index=0&id=108a11ad&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/PaList.vue?vue&type=style&index=0&id=108a11ad&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PaList_vue_vue_type_style_index_0_id_108a11ad_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PaList_vue_vue_type_style_index_0_id_108a11ad_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/_module/PaList.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/web/_module/PaList.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PaList_vue_vue_type_template_id_108a11ad_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PaList.vue?vue&type=template&id=108a11ad&scoped=true& */ "./resources/js/views/web/_module/PaList.vue?vue&type=template&id=108a11ad&scoped=true&");
/* harmony import */ var _PaList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PaList.vue?vue&type=script&lang=js& */ "./resources/js/views/web/_module/PaList.vue?vue&type=script&lang=js&");
/* harmony import */ var _PaList_vue_vue_type_style_index_0_id_108a11ad_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PaList.vue?vue&type=style&index=0&id=108a11ad&lang=css&scoped=true& */ "./resources/js/views/web/_module/PaList.vue?vue&type=style&index=0&id=108a11ad&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PaList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PaList_vue_vue_type_template_id_108a11ad_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _PaList_vue_vue_type_template_id_108a11ad_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "108a11ad",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/_module/PaList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/_module/PaList.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/web/_module/PaList.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PaList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/PaList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PaList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/_module/PaList.vue?vue&type=style&index=0&id=108a11ad&lang=css&scoped=true&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/views/web/_module/PaList.vue?vue&type=style&index=0&id=108a11ad&lang=css&scoped=true& ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PaList_vue_vue_type_style_index_0_id_108a11ad_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaList.vue?vue&type=style&index=0&id=108a11ad&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/PaList.vue?vue&type=style&index=0&id=108a11ad&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/_module/PaList.vue?vue&type=template&id=108a11ad&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/web/_module/PaList.vue?vue&type=template&id=108a11ad&scoped=true& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaList_vue_vue_type_template_id_108a11ad_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaList_vue_vue_type_template_id_108a11ad_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaList_vue_vue_type_template_id_108a11ad_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaList.vue?vue&type=template&id=108a11ad&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/PaList.vue?vue&type=template&id=108a11ad&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/PaList.vue?vue&type=template&id=108a11ad&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/PaList.vue?vue&type=template&id=108a11ad&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "pa_list frm_st" },
    [
      _c(
        "b-row",
        { staticClass: "lhead" },
        [
          _c("b-col", [_vm._v("주문 상품")]),
          _vm._v(" "),
          _c("b-col", [_vm._v("제조사")]),
          _vm._v(" "),
          _c("b-col", [_vm._v("판매가")]),
          _vm._v(" "),
          _c("b-col", [_vm._v("수량")]),
          _vm._v(" "),
          _c("b-col", [_vm._v("금액")]),
          _vm._v(" "),
          _c("b-col", [_vm._v("배송비")]),
        ],
        1
      ),
      _vm._v(" "),
      _vm._l(_vm.value, function (pa, pa_id) {
        return _c(
          "b-row",
          { key: pa_id, staticClass: "lbody" },
          [
            _c("b-col", { staticClass: "m_hide" }, [
              _vm._v(_vm._s(pa[0]["pa_name"] ? "업체" : "포사이언스")),
              _c("br"),
              _vm._v("배송"),
            ]),
            _vm._v(" "),
            _c(
              "b-col",
              _vm._l(pa, function (item, i_item) {
                return _c(
                  "b-row",
                  {
                    key: "" + pa_id + i_item,
                    class: { option: item.type == "option" },
                  },
                  [
                    item.type == "model"
                      ? [
                          _c("b-col", [
                            _c("img", { attrs: { src: item.img } }),
                          ]),
                          _vm._v(" "),
                          _c("b-col", [
                            _c("p", [_vm._v(_vm._s(item.gd_name))]),
                            _vm._v(" "),
                            _c("p", [
                              _vm._v(
                                "모델명:" +
                                  _vm._s(item.gm_code) +
                                  " / Cat.No.:" +
                                  _vm._s(item.gm_catno)
                              ),
                            ]),
                            _vm._v(" "),
                            _c("p", [
                              _vm._v(
                                "제품명:" +
                                  _vm._s(item.gm_name) +
                                  " / 사양:" +
                                  _vm._s(item.gm_spec)
                              ),
                            ]),
                            _vm._v(" "),
                            _c("p", [
                              _vm._v("판매단위:" + _vm._s(item.gm_unit)),
                            ]),
                            _vm._v(" "),
                            _c("p", [_vm._v("납기:" + _vm._s(item.dlvy_at))]),
                          ]),
                          _vm._v(" "),
                          _c("b-col", [_vm._v(_vm._s(item.mk_name))]),
                          _vm._v(" "),
                          _c("b-col", [
                            _vm._v(
                              _vm._s(_vm._f("comma")(item.price_add_vat)) +
                                " 원"
                            ),
                          ]),
                          _vm._v(" "),
                          _c("b-col", [_vm._v(_vm._s(item.ea) + " 개")]),
                          _vm._v(" "),
                          _c("b-col", [
                            _c("div", [
                              _vm._v(
                                "\r\n                            " +
                                  _vm._s(
                                    _vm._f("comma")(
                                      item.price_add_vat * item.ea
                                    )
                                  ) +
                                  " 원\r\n                            "
                              ),
                              _c("br"),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(
                                  "(" +
                                    _vm._s(
                                      _vm._f("comma")(
                                        item.gain_mileage * item.ea
                                      )
                                    ) +
                                    "p 적립)"
                                ),
                              ]),
                            ]),
                          ]),
                        ]
                      : item.type == "option"
                      ? [
                          _c("b-col", [_vm._v("추가 옵션")]),
                          _vm._v(" "),
                          _c("b-col", [_vm._v(_vm._s(item.goc_name))]),
                          _vm._v(" "),
                          _c("b-col"),
                          _vm._v(" "),
                          _c("b-col", [
                            _vm._v(
                              _vm._s(_vm._f("comma")(item.price_add_vat)) +
                                " 원"
                            ),
                          ]),
                          _vm._v(" "),
                          _c("b-col", [_vm._v(_vm._s(item.ea) + " 개")]),
                          _vm._v(" "),
                          _c("b-col", [
                            _c("div", [
                              _vm._v(
                                "\r\n                            " +
                                  _vm._s(
                                    _vm._f("comma")(
                                      item.price_add_vat * item.ea
                                    )
                                  ) +
                                  " 원\r\n                            "
                              ),
                              _c("br"),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(
                                  "(" +
                                    _vm._s(
                                      _vm._f("comma")(
                                        item.gain_mileage * item.ea
                                      )
                                    ) +
                                    "p 적립)"
                                ),
                              ]),
                            ]),
                          ]),
                        ]
                      : _vm._e(),
                  ],
                  2
                )
              }),
              1
            ),
            _vm._v(" "),
            _c(
              "b-col",
              [
                pa[0]["pa_type"] == "AIR"
                  ? [_vm._v("항공운임료")]
                  : [_vm._v("배송비")],
                _vm._v(" "),
                _c("br"),
                _vm._v(
                  "\r\n            " +
                    _vm._s(_vm._f("comma")(pa[0].pa_dlvy_p_add_vat)) +
                    " 원\r\n        "
                ),
              ],
              2
            ),
          ],
          1
        )
      }),
      _vm._v(" "),
      _vm.price
        ? _c(
            "b-row",
            { staticClass: "total" },
            [
              _c("b-col", [_vm._v("상품금액")]),
              _vm._v(" "),
              _c("b-col", [
                _c("b", [
                  _vm._v(_vm._s(_vm._f("comma")(_vm.price.goods_add_vat))),
                ]),
                _vm._v(" 원"),
              ]),
              _vm._v(" "),
              _c("b-col", [_vm._v("배송료")]),
              _vm._v(" "),
              _c("b-col", [
                _c("b", [
                  _vm._v(
                    _vm._s(
                      _vm._f("comma")(
                        _vm.price.air_add_vat + _vm.price.dlvy_add_vat
                      )
                    )
                  ),
                ]),
                _vm._v(" 원"),
              ]),
              _vm._v(" "),
              _c("b-col", [_vm._v("결제 예정 금액")]),
              _vm._v(" "),
              _c("b-col", [
                _c("b", [_vm._v(_vm._s(_vm._f("comma")(_vm.price.total)))]),
                _vm._v(" 원"),
              ]),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.price
        ? _c(
            "b-row",
            { staticClass: "total_sub", attrs: { id: "total_sub" } },
            [
              _c("b-col", [
                _c(
                  "div",
                  [
                    _c("b-col", [_vm._v("상품가")]),
                    _vm._v(" "),
                    _c("b-col", [
                      _vm._v(_vm._s(_vm._f("comma")(_vm.price.goods)) + " 원"),
                    ]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  [
                    _c("b-col", [_vm._v("부가세")]),
                    _vm._v(" "),
                    _c("b-col", [
                      _vm._v(_vm._s(_vm._f("comma")(_vm.price.surtax)) + " 원"),
                    ]),
                  ],
                  1
                ),
              ]),
              _vm._v(" "),
              _c("b-col", [
                _c(
                  "div",
                  [
                    _c("b-col", [_vm._v("포사이언스 배송")]),
                    _vm._v(" "),
                    _c("b-col", [
                      _vm._v(_vm._s(_vm._f("comma")(_vm.dlvy_4s)) + " 원"),
                    ]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  [
                    _c("b-col", [_vm._v("업체 배송")]),
                    _vm._v(" "),
                    _c("b-col", [
                      _vm._v(_vm._s(_vm._f("comma")(_vm.dlvy_other)) + " 원"),
                    ]),
                  ],
                  1
                ),
              ]),
              _vm._v(" "),
              _c("b-col", [
                _c(
                  "div",
                  [
                    _c("b-col", [_vm._v("적립예정 마일리지")]),
                    _vm._v(" "),
                    _c("b-col", [
                      _vm._v(_vm._s(_vm._f("comma")(_vm.sum_mileage)) + " 원"),
                    ]),
                  ],
                  1
                ),
              ]),
            ],
            1
          )
        : _vm._e(),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);