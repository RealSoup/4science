"use strict";
(self["webpackChunkvue_4science"] = self["webpackChunkvue_4science"] || []).push([["resources_js_views_web_mypage_myUser_Destroy_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
  name: 'MyPageMyUserDestroy',
  data: function data() {
    return {
      frm: {
        withdraw: "",
        _method: 'DELETE',
        etc: ''
      }
    };
  },
  methods: {
    destroy: function destroy() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this.frm.withdraw == '')) {
                  _context.next = 5;
                  break;
                }

                Notify.toast('danger', "탈퇴 사유를 선택해 주세요.");
                return _context.abrupt("return", false);

              case 5:
                if (!(_this.frm.withdraw == 'etc' && _this.frm.etc == '')) {
                  _context.next = 8;
                  break;
                }

                Notify.toast('danger', "기타 사유를 입력해 주세요.");
                return _context.abrupt("return", false);

              case 8:
                _context.next = 10;
                return Notify.confirm('탈퇴', 'danger');

              case 10:
                if (!_context.sent) {
                  _context.next = 24;
                  break;
                }

                _context.prev = 11;
                if (_this.frm.withdraw == 'etc') _this.frm.withdraw = _this.frm.etc;
                _context.next = 15;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/user", _this.frm);

              case 15:
                res = _context.sent;

                if (res && res.status === 200) {
                  Notify.toast('success', '회원 탈퇴 완료');

                  _this.$store.dispatch('auth/logout');
                }

                _context.next = 24;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](11);
                Notify.consolePrint(_context.t0);
                Notify.toast('danger', '삭제 실패');
                Notify.toast('danger', _context.t0.response.data.message);

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[11, 19]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=style&index=0&id=e146bc68&lang=css&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=style&index=0&id=e146bc68&lang=css&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.container .info[data-v-e146bc68] {\n}\n.container .info .tit[data-v-e146bc68] { background-color:#A0A0A0; color:#fff; border-radius:50%; flex: 0 0 108px; max-width:108px; height:108px; text-align:center; padding:1.9rem 0 0; font-weight:600;\n}\n.container .info .con[data-v-e146bc68] { padding:2.5rem 0 0 1.5rem;\n}\n.container .frm[data-v-e146bc68] { border:1px solid #E1E1E1; margin-top:2.2rem;\n}\n.container .frm .col[data-v-e146bc68] { padding: 2.3rem;\n}\n.container .frm .col[data-v-e146bc68] fieldset legend { color:#2DA194; font-weight:900; font-size:1.2rem; margin-bottom:1.1rem;\n}\n.container .frm .col[data-v-e146bc68] fieldset > div { display:flex; flex-wrap:wrap;\n}\n.container .frm .col[data-v-e146bc68] fieldset > div .custom-control { flex: 0 0 25%; max-width:25%; margin-bottom:.8rem; font-size:.89rem;\n}\n.container .frm .col[data-v-e146bc68] fieldset > div .custom-control label:before, \r\n.container .frm .col[data-v-e146bc68] fieldset > div .custom-control label:after { top:.1rem !important;\n}\n.container .frm .col[data-v-e146bc68] fieldset > div .custom-control:last-of-type { flex: 0 0 75%; max-width: 75%;\n}\n.container .frm .col[data-v-e146bc68] fieldset > div .custom-control:last-of-type label { display:flex;\n}\n.container .frm .col[data-v-e146bc68] fieldset > div .custom-control:last-of-type label input { flex: 0 0 80%; max-width:80%; margin-left:2%; position:relative; top:-4px;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=style&index=0&id=e146bc68&lang=css&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=style&index=0&id=e146bc68&lang=css&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Destroy_vue_vue_type_style_index_0_id_e146bc68_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Destroy.vue?vue&type=style&index=0&id=e146bc68&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=style&index=0&id=e146bc68&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Destroy_vue_vue_type_style_index_0_id_e146bc68_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Destroy_vue_vue_type_style_index_0_id_e146bc68_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/mypage/myUser/Destroy.vue":
/*!**********************************************************!*\
  !*** ./resources/js/views/web/mypage/myUser/Destroy.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Destroy_vue_vue_type_template_id_e146bc68_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Destroy.vue?vue&type=template&id=e146bc68&scoped=true& */ "./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=template&id=e146bc68&scoped=true&");
/* harmony import */ var _Destroy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Destroy.vue?vue&type=script&lang=js& */ "./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=script&lang=js&");
/* harmony import */ var _Destroy_vue_vue_type_style_index_0_id_e146bc68_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Destroy.vue?vue&type=style&index=0&id=e146bc68&lang=css&scoped=true& */ "./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=style&index=0&id=e146bc68&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Destroy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Destroy_vue_vue_type_template_id_e146bc68_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Destroy_vue_vue_type_template_id_e146bc68_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "e146bc68",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/mypage/myUser/Destroy.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Destroy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Destroy.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Destroy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=style&index=0&id=e146bc68&lang=css&scoped=true&":
/*!*******************************************************************************************************************!*\
  !*** ./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=style&index=0&id=e146bc68&lang=css&scoped=true& ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Destroy_vue_vue_type_style_index_0_id_e146bc68_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Destroy.vue?vue&type=style&index=0&id=e146bc68&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=style&index=0&id=e146bc68&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=template&id=e146bc68&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=template&id=e146bc68&scoped=true& ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Destroy_vue_vue_type_template_id_e146bc68_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Destroy_vue_vue_type_template_id_e146bc68_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Destroy_vue_vue_type_template_id_e146bc68_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Destroy.vue?vue&type=template&id=e146bc68&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=template&id=e146bc68&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=template&id=e146bc68&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myUser/Destroy.vue?vue&type=template&id=e146bc68&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "w_fence" },
    [
      _c("h3", { staticClass: "underbar" }, [_vm._v("회원 탈퇴")]),
      _vm._v(" "),
      _c(
        "b-row",
        { staticClass: "info" },
        [
          _c("b-col", { staticClass: "tit" }, [
            _vm._v("\r\n            회원 탈퇴 시"),
            _c("br"),
            _vm._v(" 유의사항\r\n        "),
          ]),
          _vm._v(" "),
          _c("b-col", { staticClass: "con" }, [
            _c("p", [
              _vm._v(
                "1. 포사이언스에서 현재까지의 회원님의 규매이력과 적립된 마일리지 가 삭제되며, 재가입시 복구되지 않습니다."
              ),
            ]),
          ]),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-row",
        { staticClass: "frm" },
        [
          _c(
            "b-col",
            [
              _c(
                "b-form-group",
                {
                  staticClass: "rd_box",
                  attrs: { label: "탈퇴하시는 사유를 말씀해주세요." },
                },
                [
                  _c(
                    "b-form-radio",
                    {
                      attrs: {
                        name: "withdraw",
                        value: "상품의 다양성/품질 불만",
                      },
                      model: {
                        value: _vm.frm.withdraw,
                        callback: function ($$v) {
                          _vm.$set(_vm.frm, "withdraw", $$v)
                        },
                        expression: "frm.withdraw",
                      },
                    },
                    [_vm._v("상품의 다양성/품질 불만")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-radio",
                    {
                      attrs: { name: "withdraw", value: "개인 정보 유출 우려" },
                      model: {
                        value: _vm.frm.withdraw,
                        callback: function ($$v) {
                          _vm.$set(_vm.frm, "withdraw", $$v)
                        },
                        expression: "frm.withdraw",
                      },
                    },
                    [_vm._v("개인 정보 유출 우려")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-radio",
                    {
                      attrs: { name: "withdraw", value: "교환/반품/환불 불만" },
                      model: {
                        value: _vm.frm.withdraw,
                        callback: function ($$v) {
                          _vm.$set(_vm.frm, "withdraw", $$v)
                        },
                        expression: "frm.withdraw",
                      },
                    },
                    [_vm._v("교환/반품/환불 불만")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-radio",
                    {
                      attrs: {
                        name: "withdraw",
                        value: "쇼핑몰 속도 및 안정화 불만",
                      },
                      model: {
                        value: _vm.frm.withdraw,
                        callback: function ($$v) {
                          _vm.$set(_vm.frm, "withdraw", $$v)
                        },
                        expression: "frm.withdraw",
                      },
                    },
                    [_vm._v("쇼핑몰 속도 및 안정화 불만")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-radio",
                    {
                      attrs: { name: "withdraw", value: "배송 불만" },
                      model: {
                        value: _vm.frm.withdraw,
                        callback: function ($$v) {
                          _vm.$set(_vm.frm, "withdraw", $$v)
                        },
                        expression: "frm.withdraw",
                      },
                    },
                    [_vm._v("배송 불만")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-radio",
                    {
                      attrs: { name: "withdraw", value: "서비스 불만" },
                      model: {
                        value: _vm.frm.withdraw,
                        callback: function ($$v) {
                          _vm.$set(_vm.frm, "withdraw", $$v)
                        },
                        expression: "frm.withdraw",
                      },
                    },
                    [_vm._v("서비스 불만")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-radio",
                    {
                      attrs: { name: "withdraw", value: "상품 가격 불만" },
                      model: {
                        value: _vm.frm.withdraw,
                        callback: function ($$v) {
                          _vm.$set(_vm.frm, "withdraw", $$v)
                        },
                        expression: "frm.withdraw",
                      },
                    },
                    [_vm._v("상품 가격 불만")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-radio",
                    {
                      attrs: { name: "withdraw", value: "사이트 이용 불편" },
                      model: {
                        value: _vm.frm.withdraw,
                        callback: function ($$v) {
                          _vm.$set(_vm.frm, "withdraw", $$v)
                        },
                        expression: "frm.withdraw",
                      },
                    },
                    [_vm._v("사이트 이용 불편")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-radio",
                    {
                      attrs: { name: "withdraw", value: "이용 빈도 낮음" },
                      model: {
                        value: _vm.frm.withdraw,
                        callback: function ($$v) {
                          _vm.$set(_vm.frm, "withdraw", $$v)
                        },
                        expression: "frm.withdraw",
                      },
                    },
                    [_vm._v("이용 빈도 낮음")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-radio",
                    {
                      attrs: { name: "withdraw", value: "etc" },
                      model: {
                        value: _vm.frm.withdraw,
                        callback: function ($$v) {
                          _vm.$set(_vm.frm, "withdraw", $$v)
                        },
                        expression: "frm.withdraw",
                      },
                    },
                    [
                      _vm._v("기타 사유 "),
                      _c("b-form-input", {
                        attrs: { size: "sm" },
                        model: {
                          value: _vm.frm.etc,
                          callback: function ($$v) {
                            _vm.$set(_vm.frm, "etc", $$v)
                          },
                          expression: "frm.etc",
                        },
                      }),
                    ],
                    1
                  ),
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
        [
          _c(
            "b-col",
            { staticClass: "btn_box" },
            [
              _c(
                "b-button",
                { staticClass: "blue xl", on: { click: _vm.destroy } },
                [_vm._v("회원 탈퇴하기")]
              ),
            ],
            1
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