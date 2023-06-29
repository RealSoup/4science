"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web_cscenter_Index_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/cscenter/Index.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/cscenter/Index.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'CSCenterIndex',
  components: {
    'board-create': function boardCreate() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_board_Create_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/web/board/Create */ "./resources/js/views/web/board/Create.vue"));
    },
    'estimate-guide': function estimateGuide() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_cscenter__comp_EstimateGuide_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/EstimateGuide */ "./resources/js/views/web/cscenter/_comp/EstimateGuide.vue"));
    },
    'order-guide': function orderGuide() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_cscenter__comp_OrderGuide_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/OrderGuide */ "./resources/js/views/web/cscenter/_comp/OrderGuide.vue"));
    },
    'pay-guide': function payGuide() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_cscenter__comp_PayGuide_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/PayGuide */ "./resources/js/views/web/cscenter/_comp/PayGuide.vue"));
    },
    'faq': function faq() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_cscenter__comp_Faq_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/Faq */ "./resources/js/views/web/cscenter/_comp/Faq.vue"));
    }
  },
  data: function data() {
    return {
      board_tab: 0,
      info_tab: 0
    };
  },
  mounted: function mounted() {
    if (this.$route.query.view_type == 'membership') this.$nextTick(function () {
      this.info_tab = 3;
      document.getElementById('info_tab_scroll').scrollIntoView(); // this.$route.params?.target && this.$refs.target?.scrollIntoView();
      // https://velog.io/@tjdud0123/vue-router-target-scroll
    });else if (this.$route.query.view_type == 'as') this.$nextTick(function () {
      this.board_tab = 1;
    });else if (this.$route.query.view_type == 'faq') this.$nextTick(function () {
      this.board_tab = 3;
    });
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/cscenter/Index.vue?vue&type=style&index=0&id=548fa0c2&lang=css&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/cscenter/Index.vue?vue&type=style&index=0&id=548fa0c2&lang=css&scoped=true& ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n#cscenter[data-v-548fa0c2] .cscenter_tab { border:5px solid #E2E2E2; margin-bottom:5rem;\n}\n#cscenter[data-v-548fa0c2] .cscenter_tab>div:first-child { width:370px; padding-left:0; padding-right:0; flex:0 0 auto; max-width:100%;\n}\n#cscenter[data-v-548fa0c2] .cscenter_tab>div:first-child .nav-tabs { flex-direction:column;\n}\n#cscenter[data-v-548fa0c2] .cscenter_tab>div:first-child .nav-tabs .nav-link { background:#4F708F; color:#FFF; font-weight:bold; text-align:center; border:1px solid #FFF; padding:47px 0; border-radius:0;\n}\n#cscenter[data-v-548fa0c2] .cscenter_tab>div:first-child .nav-tabs .nav-link.active { background:#FFF; color:#4F708F;\n}\n#cscenter[data-v-548fa0c2] .cscenter_tab>.tab-content { padding:30px 45px 0; flex-basis: 0; flex-grow: 1; max-width: 100%;}\n#cscenter #info_tab_scroll[data-v-548fa0c2] { position:relative; top:-100px;\n}\n#cscenter[data-v-548fa0c2] .info_tab>div .nav-tabs .nav-link { background:#01B7CD;\n}\n#cscenter[data-v-548fa0c2] .info_tab>div .nav-tabs .nav-link.active { background:#FFF; color:#01B7CD;\n}\n#cscenter[data-v-548fa0c2] .info_tab h3 { color:#FD9800; font-size:1rem; margin-bottom:0;\n}\n#cscenter[data-v-548fa0c2] .info_tab h3 span { background:#FD9800; border-radius:20px; padding:10px 20px; font-weight:bold; font-size:1rem; display:inline-block; color:#fff;\n}\n#cscenter[data-v-548fa0c2] .info_tab ol { margin:10px 0 25px 80px;\n}\n#cscenter[data-v-548fa0c2] .info_tab ol li { font-size:.8rem; list-style:decimal;\n}\n#cscenter[data-v-548fa0c2] .info_tab ol li .point { color:#FD9800;\n}\n#cscenter[data-v-548fa0c2] .info_tab>.tab-content .tab-pane:nth-of-type(4) { text-align:center;\n}\n#cscenter[data-v-548fa0c2] .info_tab>.tab-content .tab-pane:nth-of-type(4) img { margin-bottom:3rem;\n}\n#cscenter[data-v-548fa0c2] .info_tab>.tab-content .member_info img { width:100%; max-width:800px;\n}\n@media (max-width: 992px){\n#cscenter[data-v-548fa0c2] .cscenter_tab>div:first-child { width:100%;\n}\n#cscenter[data-v-548fa0c2] .cscenter_tab>div:first-child .nav-tabs { flex-direction:row;\n}\n#cscenter[data-v-548fa0c2] .cscenter_tab>div:first-child .nav-tabs li { flex-basis:0; flex-grow:1; width:100%; max-width:100%;\n}\n#cscenter[data-v-548fa0c2] .cscenter_tab>div:first-child .nav-tabs .nav-link { padding:10px 0;\n}\n#cscenter[data-v-548fa0c2] .cscenter_tab>.tab-content { padding:20px;\n}\n#cscenter[data-v-548fa0c2] .info_tab ol { margin:10px 0 25px 5px;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/cscenter/Index.vue?vue&type=style&index=0&id=548fa0c2&lang=css&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/cscenter/Index.vue?vue&type=style&index=0&id=548fa0c2&lang=css&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_548fa0c2_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Index.vue?vue&type=style&index=0&id=548fa0c2&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/cscenter/Index.vue?vue&type=style&index=0&id=548fa0c2&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_548fa0c2_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_548fa0c2_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/cscenter/Index.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/web/cscenter/Index.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Index_vue_vue_type_template_id_548fa0c2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=548fa0c2&scoped=true& */ "./resources/js/views/web/cscenter/Index.vue?vue&type=template&id=548fa0c2&scoped=true&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/views/web/cscenter/Index.vue?vue&type=script&lang=js&");
/* harmony import */ var _Index_vue_vue_type_style_index_0_id_548fa0c2_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Index.vue?vue&type=style&index=0&id=548fa0c2&lang=css&scoped=true& */ "./resources/js/views/web/cscenter/Index.vue?vue&type=style&index=0&id=548fa0c2&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_548fa0c2_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Index_vue_vue_type_template_id_548fa0c2_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "548fa0c2",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/cscenter/Index.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/cscenter/Index.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/web/cscenter/Index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/cscenter/Index.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/cscenter/Index.vue?vue&type=style&index=0&id=548fa0c2&lang=css&scoped=true&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/views/web/cscenter/Index.vue?vue&type=style&index=0&id=548fa0c2&lang=css&scoped=true& ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_548fa0c2_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Index.vue?vue&type=style&index=0&id=548fa0c2&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/cscenter/Index.vue?vue&type=style&index=0&id=548fa0c2&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/cscenter/Index.vue?vue&type=template&id=548fa0c2&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/web/cscenter/Index.vue?vue&type=template&id=548fa0c2&scoped=true& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_548fa0c2_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_548fa0c2_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_548fa0c2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Index.vue?vue&type=template&id=548fa0c2&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/cscenter/Index.vue?vue&type=template&id=548fa0c2&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/cscenter/Index.vue?vue&type=template&id=548fa0c2&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/cscenter/Index.vue?vue&type=template&id=548fa0c2&scoped=true& ***!
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
    { staticClass: "w_fence", attrs: { id: "cscenter" } },
    [
      _c("h3", [_vm._v("고객센터")]),
      _vm._v(" "),
      _c(
        "b-tabs",
        {
          staticClass: "cscenter_tab row",
          model: {
            value: _vm.board_tab,
            callback: function ($$v) {
              _vm.board_tab = $$v
            },
            expression: "board_tab",
          },
        },
        [
          _c(
            "b-tab",
            { attrs: { title: "1:1 문의", active: "" } },
            [_c("board-create", { attrs: { cs_bo_cd: "inquiry" } })],
            1
          ),
          _vm._v(" "),
          _c(
            "b-tab",
            { attrs: { title: "A/S 신청" } },
            [_c("board-create", { attrs: { cs_bo_cd: "as" } })],
            1
          ),
          _vm._v(" "),
          _c(
            "b-tab",
            { attrs: { title: "취소/교환" } },
            [_c("board-create", { attrs: { cs_bo_cd: "cancel" } })],
            1
          ),
          _vm._v(" "),
          _c("b-tab", { attrs: { title: "FAQ" } }, [_c("faq")], 1),
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { attrs: { id: "info_tab_scroll" } }),
      _vm._v(" "),
      _c(
        "b-tabs",
        {
          staticClass: "cscenter_tab row info_tab",
          model: {
            value: _vm.info_tab,
            callback: function ($$v) {
              _vm.info_tab = $$v
            },
            expression: "info_tab",
          },
        },
        [
          _c(
            "b-tab",
            {
              scopedSlots: _vm._u([
                {
                  key: "title",
                  fn: function () {
                    return [
                      _vm._v("견적"),
                      _c("span", { staticClass: "m_hide" }, [_vm._v("문의")]),
                      _vm._v(" 안내"),
                    ]
                  },
                  proxy: true,
                },
              ]),
            },
            [_vm._v(" "), _c("estimate-guide")],
            1
          ),
          _vm._v(" "),
          _c(
            "b-tab",
            { attrs: { title: "주문 안내" } },
            [_c("order-guide")],
            1
          ),
          _vm._v(" "),
          _c("b-tab", { attrs: { title: "결제 안내" } }, [_c("pay-guide")], 1),
          _vm._v(" "),
          _c(
            "b-tab",
            {
              staticClass: "member_info",
              scopedSlots: _vm._u([
                {
                  key: "title",
                  fn: function () {
                    return [
                      _vm._v("회원"),
                      _c("span", { staticClass: "m_hide" }, [_vm._v("혜택")]),
                      _vm._v(" 안내"),
                    ]
                  },
                  proxy: true,
                },
              ]),
            },
            [
              _vm._v(" "),
              _c("img", {
                staticClass: "m_hide",
                attrs: { src: _vm.s3url + "cscenter/member_info.jpg" },
              }),
              _vm._v(" "),
              _c("img", {
                staticClass: "m_show",
                attrs: { src: _vm.s3url + "cscenter/member_info_m01.jpg" },
              }),
              _vm._v(" "),
              _c("img", {
                staticClass: "m_show",
                attrs: { src: _vm.s3url + "cscenter/member_info_m02.jpg" },
              }),
            ]
          ),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);