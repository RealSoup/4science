"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web_auth_FormUser_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/auth/FormUser.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/auth/FormUser.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    'Validation': function Validation() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_Validation_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/Validation */ "./resources/js/views/_common/Validation.vue"));
    },
    'Modal': function Modal() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_Modal_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/Modal */ "./resources/js/views/_common/Modal.vue"));
    },
    'Inexus': function Inexus() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_auth__comp_Inexus_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/Inexus */ "./resources/js/views/web/auth/_comp/Inexus.vue"));
    },
    'Personal': function Personal() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_auth__comp_Personal_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/Personal */ "./resources/js/views/web/auth/_comp/Personal.vue"));
    },
    'Marketing': function Marketing() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_auth__comp_Marketing_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/Marketing */ "./resources/js/views/web/auth/_comp/Marketing.vue"));
    }
  },
  props: ['value'],
  data: function data() {
    return {
      job: [{
        value: "",
        text: "▣ 직업 선택 ▣"
      }, {
        value: "교수",
        text: "교수"
      }, {
        value: "연구원",
        text: "연구원"
      }, {
        value: "학부과정",
        text: "학부과정"
      }, {
        value: "석사과정",
        text: "석사과정"
      }, {
        value: "박사과정",
        text: "박사과정"
      }, {
        value: "초중등교사",
        text: "초중등교사"
      }, {
        value: "영업/마케팅",
        text: "영업/마케팅"
      }, {
        value: "연구관리/기획",
        text: "연구관리/기획"
      }, {
        value: "사업기획",
        text: "사업기획"
      }, {
        value: "구매관리",
        text: "구매관리"
      }, {
        value: "일반관리",
        text: "일반관리"
      }, {
        value: "생산관리",
        text: "생산관리"
      }, {
        value: "기타",
        text: "기타"
      }],
      sex: [{
        value: "male",
        text: "남성"
      }, {
        value: "female",
        text: "여성"
      }],
      interest: [{
        value: "생명",
        text: "생명"
      }, {
        value: "광학",
        text: "광학"
      }, {
        value: "진공",
        text: "진공"
      }, {
        value: "전자기기",
        text: "전자기기"
      }, {
        value: "컴퓨터소프트웨어",
        text: "컴퓨터소프트웨어"
      }, {
        value: "재료",
        text: "재료"
      }, {
        value: "클린룸용품",
        text: "클린룸용품"
      }, {
        value: "초자류",
        text: "초자류"
      }, {
        value: "이화학기기",
        text: "이화학기기"
      }, {
        value: "교육용기자재",
        text: "교육용기자재"
      }, {
        value: "공구류",
        text: "공구류"
      }, {
        value: "화학/화공",
        text: "화학/화공"
      }, {
        value: "환경",
        text: "환경"
      }, {
        value: "시약",
        text: "시약"
      }],
      join_route: [{
        value: "네이버 검색",
        text: "네이버 검색"
      }, {
        value: "구글 검색",
        text: "구글 검색"
      }, {
        value: "옥외광고",
        text: "옥외광고"
      }, {
        value: "주위의 소개",
        text: "주위의 소개"
      }, {
        value: "학회 및 전시회 부스",
        text: "학회 및 전시회 부스"
      }, {
        value: "잡지 소식지",
        text: "잡지 소식지"
      }, {
        value: "기타",
        text: "기타"
      }],
      indeterminate: false,
      all_chk: false,
      isModalViewed: false
    };
  },
  methods: {
    getValidationState: function getValidationState(_ref) {
      var dirty = _ref.dirty,
          validated = _ref.validated,
          _ref$valid = _ref.valid,
          valid = _ref$valid === void 0 ? null : _ref$valid;
      return dirty || validated ? valid : null;
    },
    focusNext: function focusNext(e, max, next) {
      this.$focusNext(e, max, next);
    },
    maxlength_3: function maxlength_3(e) {
      return String(e.replace(/[^0-9]/g, '')).substring(0, 3);
    },
    maxlength_4: function maxlength_4(e) {
      return String(e.replace(/[^0-9]/g, '')).substring(0, 4);
    },
    format_tel: function format_tel(e) {
      this.formatTel(e);
    },
    chkChange: function chkChange() {
      var chkCnt = Object.values(this.value.check).filter(function (el) {
        return el == 'Y';
      }).length;

      if (chkCnt === 0) {
        this.indeterminate = false;
        this.all_chk = false;
      } else if (chkCnt === Object.keys(this.value.check).length) {
        this.indeterminate = false;
        this.all_chk = true;
      } else {
        this.indeterminate = true;
        this.all_chk = false;
      }
    },
    toggle_all_chk: function toggle_all_chk(chk) {
      for (var k in this.value.check) {
        this.value.check[k] = chk ? 'Y' : 'N';
      }

      this.indeterminate = false;
    }
  },
  mounted: function mounted() {// console.log(this.$route.name);
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/auth/FormUser.vue?vue&type=style&index=0&id=58a80f6c&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/auth/FormUser.vue?vue&type=style&index=0&id=58a80f6c&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.form_box .extra .frm_vali_st .row .col.label_st[data-v-58a80f6c] { flex-basis:150px; max-width:150px;\n} \r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/auth/FormUser.vue?vue&type=style&index=0&id=58a80f6c&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/auth/FormUser.vue?vue&type=style&index=0&id=58a80f6c&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FormUser_vue_vue_type_style_index_0_id_58a80f6c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FormUser.vue?vue&type=style&index=0&id=58a80f6c&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/auth/FormUser.vue?vue&type=style&index=0&id=58a80f6c&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FormUser_vue_vue_type_style_index_0_id_58a80f6c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FormUser_vue_vue_type_style_index_0_id_58a80f6c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/auth/FormUser.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/web/auth/FormUser.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FormUser_vue_vue_type_template_id_58a80f6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormUser.vue?vue&type=template&id=58a80f6c&scoped=true& */ "./resources/js/views/web/auth/FormUser.vue?vue&type=template&id=58a80f6c&scoped=true&");
/* harmony import */ var _FormUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormUser.vue?vue&type=script&lang=js& */ "./resources/js/views/web/auth/FormUser.vue?vue&type=script&lang=js&");
/* harmony import */ var _FormUser_vue_vue_type_style_index_0_id_58a80f6c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormUser.vue?vue&type=style&index=0&id=58a80f6c&scoped=true&lang=css& */ "./resources/js/views/web/auth/FormUser.vue?vue&type=style&index=0&id=58a80f6c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _FormUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormUser_vue_vue_type_template_id_58a80f6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _FormUser_vue_vue_type_template_id_58a80f6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "58a80f6c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/auth/FormUser.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/auth/FormUser.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/web/auth/FormUser.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FormUser.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/auth/FormUser.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/auth/FormUser.vue?vue&type=style&index=0&id=58a80f6c&scoped=true&lang=css&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/views/web/auth/FormUser.vue?vue&type=style&index=0&id=58a80f6c&scoped=true&lang=css& ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FormUser_vue_vue_type_style_index_0_id_58a80f6c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FormUser.vue?vue&type=style&index=0&id=58a80f6c&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/auth/FormUser.vue?vue&type=style&index=0&id=58a80f6c&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/js/views/web/auth/FormUser.vue?vue&type=template&id=58a80f6c&scoped=true&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/views/web/auth/FormUser.vue?vue&type=template&id=58a80f6c&scoped=true& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormUser_vue_vue_type_template_id_58a80f6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormUser_vue_vue_type_template_id_58a80f6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormUser_vue_vue_type_template_id_58a80f6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FormUser.vue?vue&type=template&id=58a80f6c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/auth/FormUser.vue?vue&type=template&id=58a80f6c&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/auth/FormUser.vue?vue&type=template&id=58a80f6c&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/auth/FormUser.vue?vue&type=template&id=58a80f6c&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
    "b-col",
    { staticClass: "extra" },
    [
      _c("h4", [_vm._v("02. 추가정보")]),
      _vm._v(" "),
      _c(
        "b-container",
        { staticClass: "frm_vali_st" },
        [
          _c(
            "b-row",
            [
              _c("b-col", { staticClass: "label_st" }, [_vm._v("직업")]),
              _c(
                "b-col",
                [
                  _c("b-form-select", {
                    attrs: { options: _vm.job },
                    model: {
                      value: _vm.value.job,
                      callback: function ($$v) {
                        _vm.$set(_vm.value, "job", $$v)
                      },
                      expression: "value.job",
                    },
                  }),
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
              _c("b-col", { staticClass: "label_st" }, [
                _vm._v("직장명/학교명"),
              ]),
              _c(
                "b-col",
                [
                  _c("b-form-input", {
                    model: {
                      value: _vm.value.office,
                      callback: function ($$v) {
                        _vm.$set(_vm.value, "office", $$v)
                      },
                      expression: "value.office",
                    },
                  }),
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
              _c("b-col", { staticClass: "label_st" }, [
                _vm._v("부서/학과/연구실명"),
              ]),
              _c(
                "b-col",
                [
                  _c("b-form-input", {
                    model: {
                      value: _vm.value.department,
                      callback: function ($$v) {
                        _vm.$set(_vm.value, "department", $$v)
                      },
                      expression: "value.department",
                    },
                  }),
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
              _c("b-col", { staticClass: "label_st" }, [_vm._v("직급/학년")]),
              _c(
                "b-col",
                [
                  _c("b-form-input", {
                    model: {
                      value: _vm.value.grade,
                      callback: function ($$v) {
                        _vm.$set(_vm.value, "grade", $$v)
                      },
                      expression: "value.grade",
                    },
                  }),
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
              _c("b-col", { staticClass: "label_st" }, [_vm._v("지도교수님")]),
              _c(
                "b-col",
                [
                  _c("b-form-input", {
                    model: {
                      value: _vm.value.tutor,
                      callback: function ($$v) {
                        _vm.$set(_vm.value, "tutor", $$v)
                      },
                      expression: "value.tutor",
                    },
                  }),
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
              _c("b-col", { staticClass: "label_st" }, [
                _vm._v("추천인 Email"),
              ]),
              _c(
                "b-col",
                [
                  _c("b-form-input", {
                    model: {
                      value: _vm.value.offer,
                      callback: function ($$v) {
                        _vm.$set(_vm.value, "offer", $$v)
                      },
                      expression: "value.offer",
                    },
                  }),
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
              _c("b-col", { staticClass: "label_st" }, [
                _vm._v("추천인 연구실"),
              ]),
              _c(
                "b-col",
                [
                  _c("b-form-input", {
                    model: {
                      value: _vm.value.offer_lab,
                      callback: function ($$v) {
                        _vm.$set(_vm.value, "offer_lab", $$v)
                      },
                      expression: "value.offer_lab",
                    },
                  }),
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
                { staticClass: "slt_item" },
                [
                  _c(
                    "b-form-group",
                    { attrs: { label: "관심분야" } },
                    [
                      _c("b-form-checkbox-group", {
                        attrs: { options: _vm.interest, name: "interest" },
                        model: {
                          value: _vm.value.interest,
                          callback: function ($$v) {
                            _vm.$set(_vm.value, "interest", $$v)
                          },
                          expression: "value.interest",
                        },
                      }),
                      _vm._v(" "),
                      _c("span", [_vm._v("기타")]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.value.interest_etc,
                            expression: "value.interest_etc",
                          },
                        ],
                        domProps: { value: _vm.value.interest_etc },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.value,
                              "interest_etc",
                              $event.target.value
                            )
                          },
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
          _vm._v(" "),
          _c(
            "b-row",
            [
              _c(
                "b-col",
                { staticClass: "slt_item" },
                [
                  _c(
                    "b-form-group",
                    { attrs: { label: "가입경로" } },
                    [
                      _c("b-form-radio-group", {
                        attrs: { options: _vm.join_route },
                        model: {
                          value: _vm.value.join_route,
                          callback: function ($$v) {
                            _vm.$set(_vm.value, "join_route", $$v)
                          },
                          expression: "value.join_route",
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);