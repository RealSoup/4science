"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web_mypage_myShop__comp_ReceiptConfirm_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'MyOrderReceiptConfirm',
  props: ['item'],
  data: function data() {
    return {
      frm: {
        bo_gd_id: this.item.goods.gd_id,
        bo_good: 100
      }
    };
  },
  methods: {
    store: function store() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (isEmpty(_this.frm.bo_subject)) _this.frm.bo_subject = _this.item.goods.gd_name;
                if (isEmpty(_this.frm.bo_content)) _this.frm.bo_content = "만족";
                _context.next = 4;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/board/review/store", _this.frm);

              case 4:
                res = _context.sent;

                if (res && res.status === 200) {
                  Notify.toast('success', '수취 확인 완료');

                  _this.$emit('hide_modal');
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=style&index=0&id=7c13a4fc&lang=css&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=style&index=0&id=7c13a4fc&lang=css&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.rs_modal .rs_modal-card[data-v-7c13a4fc] { max-width:600px;\n}\n#ReceiptConfirm[data-v-7c13a4fc] { border: 10px solid #4D4D4D;\n}\n#ReceiptConfirm .head[data-v-7c13a4fc] {  min-height:250px; position:relative;\n}\n#ReceiptConfirm .head img[data-v-7c13a4fc] { width:150px; height:150px; -o-object-fit:cover; object-fit:cover; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);\n}\n#ReceiptConfirm .gd_name[data-v-7c13a4fc] { text-align:center; font-weight:bold;\n}\n#ReceiptConfirm .body[data-v-7c13a4fc] { background:#C1B5A8; padding:20px;\n}\n#ReceiptConfirm .body p[data-v-7c13a4fc] { text-align:center; font-weight:bold; font-size:1.3rem; color:#fff;\n}\n#ReceiptConfirm .body > div[data-v-7c13a4fc] { margin-bottom:10px;\n}\n#ReceiptConfirm .body .radio_ctrl[data-v-7c13a4fc] { background:#fff; border-radius:5px; padding:3px 12px;\n}\n#ReceiptConfirm .body .radio_ctrl span[data-v-7c13a4fc] { margin-right:20px; color:#AAA;\n}\n#ReceiptConfirm .body .ctrl[data-v-7c13a4fc] { text-align:center;\n}\n#ReceiptConfirm .body .ctrl img[data-v-7c13a4fc] { cursor:pointer;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=style&index=0&id=7c13a4fc&lang=css&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=style&index=0&id=7c13a4fc&lang=css&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReceiptConfirm_vue_vue_type_style_index_0_id_7c13a4fc_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReceiptConfirm.vue?vue&type=style&index=0&id=7c13a4fc&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=style&index=0&id=7c13a4fc&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReceiptConfirm_vue_vue_type_style_index_0_id_7c13a4fc_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReceiptConfirm_vue_vue_type_style_index_0_id_7c13a4fc_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ReceiptConfirm_vue_vue_type_template_id_7c13a4fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReceiptConfirm.vue?vue&type=template&id=7c13a4fc&scoped=true& */ "./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=template&id=7c13a4fc&scoped=true&");
/* harmony import */ var _ReceiptConfirm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReceiptConfirm.vue?vue&type=script&lang=js& */ "./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=script&lang=js&");
/* harmony import */ var _ReceiptConfirm_vue_vue_type_style_index_0_id_7c13a4fc_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReceiptConfirm.vue?vue&type=style&index=0&id=7c13a4fc&lang=css&scoped=true& */ "./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=style&index=0&id=7c13a4fc&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ReceiptConfirm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReceiptConfirm_vue_vue_type_template_id_7c13a4fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _ReceiptConfirm_vue_vue_type_template_id_7c13a4fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "7c13a4fc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReceiptConfirm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReceiptConfirm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReceiptConfirm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=style&index=0&id=7c13a4fc&lang=css&scoped=true&":
/*!********************************************************************************************************************************!*\
  !*** ./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=style&index=0&id=7c13a4fc&lang=css&scoped=true& ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReceiptConfirm_vue_vue_type_style_index_0_id_7c13a4fc_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReceiptConfirm.vue?vue&type=style&index=0&id=7c13a4fc&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=style&index=0&id=7c13a4fc&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=template&id=7c13a4fc&scoped=true&":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=template&id=7c13a4fc&scoped=true& ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReceiptConfirm_vue_vue_type_template_id_7c13a4fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReceiptConfirm_vue_vue_type_template_id_7c13a4fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReceiptConfirm_vue_vue_type_template_id_7c13a4fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReceiptConfirm.vue?vue&type=template&id=7c13a4fc&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=template&id=7c13a4fc&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=template&id=7c13a4fc&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue?vue&type=template&id=7c13a4fc&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { attrs: { id: "ReceiptConfirm" } }, [
    _c(
      "div",
      { staticClass: "head" },
      [_c("b-img", { attrs: { src: _vm.item.goods.image_src_thumb[0] } })],
      1
    ),
    _vm._v(" "),
    _c("p", { staticClass: "gd_name" }, [
      _vm._v(_vm._s(_vm.item.goods.gd_name)),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "body" }, [
      _c("p", [_vm._v("제품을 잘 받으셨나요?")]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "radio_ctrl" },
        [
          _c("span", [_vm._v("총평")]),
          _vm._v(" "),
          _c(
            "b-form-radio",
            {
              attrs: { inline: "", value: "100" },
              model: {
                value: _vm.frm.bo_good,
                callback: function ($$v) {
                  _vm.$set(_vm.frm, "bo_good", $$v)
                },
                expression: "frm.bo_good",
              },
            },
            [_vm._v("만족")]
          ),
          _vm._v(" "),
          _c(
            "b-form-radio",
            {
              attrs: { inline: "", value: "50" },
              model: {
                value: _vm.frm.bo_good,
                callback: function ($$v) {
                  _vm.$set(_vm.frm, "bo_good", $$v)
                },
                expression: "frm.bo_good",
              },
            },
            [_vm._v("보통")]
          ),
          _vm._v(" "),
          _c(
            "b-form-radio",
            {
              attrs: { inline: "", value: "10" },
              model: {
                value: _vm.frm.bo_good,
                callback: function ($$v) {
                  _vm.$set(_vm.frm, "bo_good", $$v)
                },
                expression: "frm.bo_good",
              },
            },
            [_vm._v("불만족")]
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "awesome_p" }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.frm.bo_subject,
              expression: "frm.bo_subject",
            },
          ],
          attrs: { id: "bo_subject", required: "" },
          domProps: { value: _vm.frm.bo_subject },
          on: {
            input: function ($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.frm, "bo_subject", $event.target.value)
            },
          },
        }),
        _vm._v(" "),
        _c("label", { attrs: { for: "bo_subject" } }, [_vm._v("제목")]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "awesome_p" }, [
        _c("textarea", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.frm.bo_content,
              expression: "frm.bo_content",
            },
          ],
          attrs: { id: "'bo_content", rows: "5", required: "" },
          domProps: { value: _vm.frm.bo_content },
          on: {
            input: function ($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.frm, "bo_content", $event.target.value)
            },
          },
        }),
        _vm._v(" "),
        _c("label", { attrs: { for: "bo_content" } }, [_vm._v("구매평")]),
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "ctrl" },
        [
          _c("b-img", {
            attrs: { src: "/img/mypage/order/confirm_btn.png" },
            on: { click: _vm.store },
          }),
        ],
        1
      ),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);