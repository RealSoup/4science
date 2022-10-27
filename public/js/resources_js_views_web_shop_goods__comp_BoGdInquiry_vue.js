"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web_shop_goods__comp_BoGdInquiry_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/http */ "./resources/js/api/http.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  name: 'ShopGoodsInquiry',
  components: {
    'Modal': function Modal() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_Modal_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/Modal.vue */ "./resources/js/views/_common/Modal.vue"));
    },
    'BoCreate': function BoCreate() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_shop_goods__comp_BoCreate_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./BoCreate.vue */ "./resources/js/views/web/shop/goods/_comp/BoCreate.vue"));
    }
  },
  props: ['bo_cd', 'bo_cnt'],
  data: function data() {
    return {
      isModalViewed: false,
      frm: {
        page: 0,
        bo_gd_id: this.$route.params.gd_id,
        limit: 5
      },
      list: {},
      config: {},
      bo: {
        bo_gd_id: this.$route.params.gd_id
      }
    };
  },
  methods: {
    index: function index() {
      var _arguments = arguments,
          _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var page, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                page = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : 1;
                _this.frm.page = page;
                _context.next = 4;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/board/".concat(_this.bo_cd), {
                  params: _this.frm
                });

              case 4:
                res = _context.sent;

                if (res && res.status === 200) {
                  _this.list = res.data.list;
                  _this.config = res.data.config;
                  _this.bo_cnt.inquiry = res.data.list.total;
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    create: function create() {
      this.isModalViewed = true;
    },
    store: function store() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/board/".concat(_this2.bo_cd, "/store"), _this2.bo);

              case 2:
                res = _context2.sent;

                if (res && res.status === 200) {
                  _this2.isModalViewed = false;

                  _this2.index(); // this.bo.bo_subject = '';
                  // this.bo.bo_content = '';

                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    getContent: function getContent(content) {
      return content.split('\n').join('<br>');
    }
  },
  mounted: function mounted() {
    this.index();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=style&index=0&id=12beb264&lang=scss&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=style&index=0&id=12beb264&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".bo_index[data-v-12beb264] {\n  max-width: 1000px;\n}\n.bo_index .row[data-v-12beb264] {\n  margin-bottom: 10px;\n  align-items: baseline;\n}\n.bo_index .bo_body .col[data-v-12beb264] {\n  padding: 3px;\n  text-align: center;\n}\n.bo_index .bo_body .col[data-v-12beb264]:nth-of-type(1) {\n  flex-basis: 7%;\n  max-width: 7%;\n}\n.bo_index .bo_body .col:nth-of-type(2) button[data-v-12beb264] {\n  text-align: left;\n  background: none;\n  border-color: #fff;\n}\n.bo_index .bo_body .col[data-v-12beb264]:nth-of-type(3),\n.bo_index .bo_body .col[data-v-12beb264]:nth-of-type(4),\n.bo_index .bo_body .col[data-v-12beb264]:nth-of-type(5) {\n  flex-basis: 7%;\n  max-width: 7%;\n}\n.bo_index .bo_body .answer[data-v-12beb264] {\n  flex-basis: 100%;\n  max-width: 100%;\n  display: flex;\n  justify-content: flex-end;\n  text-align: left;\n}\n.bo_index .bo_body .answer .collapse[data-v-12beb264] {\n  flex-basis: 93%;\n  max-width: 93%;\n  margin-bottom: 20px;\n}\n.bo_index .bo_body .answer .collapse .card[data-v-12beb264] {\n  border-width: 0;\n  background: #ECEAEB;\n  border-radius: 10px;\n}\n.bo_index .bo_body .answer .collapse .card .card-body[data-v-12beb264] {\n  padding: 1.25rem 2rem;\n}\n.bo_index .bo_body .answer .collapse .card .card-body div[data-v-12beb264] {\n  font-size: 0.87rem;\n}\n.bo_index .bo_body .answer .collapse .card .card-body .ans[data-v-12beb264] {\n  margin-top: 3rem;\n}\n.bo_index .bo_body .answer .collapse .card .card-body .ans p[data-v-12beb264] {\n  margin: 1.5rem 0 0;\n}\n.bo_index .bo_body .answer .collapse .card .card-body .ans p .aa[data-v-12beb264] {\n  color: #FA931D;\n}\n.bo_index .bo_body .answer .collapse .card .card-body .ans p b[data-v-12beb264] {\n  font-size: 1.2rem;\n}\n.bo_index .bo_body .answer .collapse .card .card-body .ans .card-text[data-v-12beb264] {\n  margin-top: 1.3rem;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=style&index=0&id=12beb264&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=style&index=0&id=12beb264&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BoGdInquiry_vue_vue_type_style_index_0_id_12beb264_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BoGdInquiry.vue?vue&type=style&index=0&id=12beb264&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=style&index=0&id=12beb264&lang=scss&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BoGdInquiry_vue_vue_type_style_index_0_id_12beb264_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BoGdInquiry_vue_vue_type_style_index_0_id_12beb264_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BoGdInquiry_vue_vue_type_template_id_12beb264_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BoGdInquiry.vue?vue&type=template&id=12beb264&scoped=true& */ "./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=template&id=12beb264&scoped=true&");
/* harmony import */ var _BoGdInquiry_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoGdInquiry.vue?vue&type=script&lang=js& */ "./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=script&lang=js&");
/* harmony import */ var _BoGdInquiry_vue_vue_type_style_index_0_id_12beb264_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BoGdInquiry.vue?vue&type=style&index=0&id=12beb264&lang=scss&scoped=true& */ "./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=style&index=0&id=12beb264&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BoGdInquiry_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BoGdInquiry_vue_vue_type_template_id_12beb264_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _BoGdInquiry_vue_vue_type_template_id_12beb264_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "12beb264",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BoGdInquiry_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BoGdInquiry.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BoGdInquiry_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=style&index=0&id=12beb264&lang=scss&scoped=true&":
/*!***************************************************************************************************************************!*\
  !*** ./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=style&index=0&id=12beb264&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BoGdInquiry_vue_vue_type_style_index_0_id_12beb264_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BoGdInquiry.vue?vue&type=style&index=0&id=12beb264&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=style&index=0&id=12beb264&lang=scss&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=template&id=12beb264&scoped=true&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=template&id=12beb264&scoped=true& ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BoGdInquiry_vue_vue_type_template_id_12beb264_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BoGdInquiry_vue_vue_type_template_id_12beb264_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BoGdInquiry_vue_vue_type_template_id_12beb264_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BoGdInquiry.vue?vue&type=template&id=12beb264&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=template&id=12beb264&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=template&id=12beb264&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/goods/_comp/BoGdInquiry.vue?vue&type=template&id=12beb264&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "bo_index" },
    [
      _vm._l(_vm.list.data, function (bo, i) {
        return _c(
          "b-row",
          { key: bo.bo_id, staticClass: "bo_body" },
          [
            _c("b-col", [
              _vm._v(
                _vm._s(
                  _vm.list.total -
                    _vm.list.per_page * (_vm.list.current_page - 1) -
                    i
                )
              ),
            ]),
            _vm._v(" "),
            _c(
              "b-col",
              [
                _c(
                  "b-button",
                  {
                    directives: [
                      {
                        name: "b-toggle",
                        rawName: "v-b-toggle",
                        value: "collapse_" + bo.bo_id,
                        expression: "`collapse_${bo.bo_id}`",
                      },
                    ],
                    attrs: { block: "", variant: "light" },
                  },
                  [_vm._v(_vm._s(bo.bo_subject))]
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "b-col",
              [
                bo.answer
                  ? _c("b-badge", { attrs: { variant: "success" } }, [
                      _vm._v("답변완료"),
                    ])
                  : _c("b-badge", [_vm._v("답변대기")]),
              ],
              1
            ),
            _vm._v(" "),
            _c("b-col", [_vm._v(_vm._s(bo.bo_writer))]),
            _vm._v(" "),
            _c("b-col", [_vm._v(_vm._s(_vm._f("formatDate")(bo.created_at)))]),
            _vm._v(" "),
            _c(
              "b-col",
              { staticClass: "answer" },
              [
                _c(
                  "b-collapse",
                  { attrs: { id: "collapse_" + bo.bo_id } },
                  [
                    _c("b-card", [
                      _c("div", { staticClass: "ask" }, [
                        _c("p", [
                          _c("b", [_vm._v("Q")]),
                          _vm._v(". " + _vm._s(bo.bo_subject)),
                        ]),
                        _vm._v(" "),
                        _c("p", [_vm._v(_vm._s(bo.bo_content))]),
                      ]),
                      _vm._v(" "),
                      bo.answer
                        ? _c("div", { staticClass: "ans" }, [
                            _c("p", [
                              _c("b", { staticClass: "aa" }, [_vm._v("A")]),
                              _vm._v(". 담당자 "),
                              _c("b", [_vm._v(_vm._s(bo.answer.bo_writer))]),
                              _vm._v(" 의 답변입니다."),
                            ]),
                            _vm._v(" "),
                            _c("div", {
                              staticClass: "card-text",
                              domProps: {
                                innerHTML: _vm._s(
                                  _vm.getContent(bo.answer.bo_content)
                                ),
                              },
                            }),
                            _vm._v(" "),
                            _c("p", [
                              _vm._v(
                                _vm._s(
                                  _vm._f("formatDate")(bo.answer.created_at)
                                )
                              ),
                            ]),
                          ])
                        : _vm._e(),
                    ]),
                  ],
                  1
                ),
              ],
              1
            ),
          ],
          1
        )
      }),
      _vm._v(" "),
      _c("pagination", {
        attrs: { data: _vm.list, align: "center" },
        on: { "pagination-change-page": _vm.index },
      }),
      _vm._v(" "),
      _c(
        "transition",
        { attrs: { name: "modal" } },
        [
          _vm.isModalViewed
            ? _c(
                "Modal",
                {
                  attrs: { max_width: 700 },
                  on: {
                    "close-modal": function ($event) {
                      _vm.isModalViewed = false
                    },
                  },
                },
                [
                  _c("BoCreate", {
                    on: { store: _vm.store },
                    model: {
                      value: _vm.bo,
                      callback: function ($$v) {
                        _vm.bo = $$v
                      },
                      expression: "bo",
                    },
                  }),
                ],
                1
              )
            : _vm._e(),
        ],
        1
      ),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);