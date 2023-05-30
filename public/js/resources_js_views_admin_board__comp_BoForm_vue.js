"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_admin_board__comp_BoForm_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/board/_comp/BoForm.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/board/_comp/BoForm.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
// import { mapState } from 'vuex';
// import AddFile from "./components/AddFile.vue"
// import Comment from "../components/Comment.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'AdmBoardBoForm',
  components: {
    'validation': function validation() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_Validation_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/Validation.vue */ "./resources/js/views/_common/Validation.vue"));
    }
  },
  props: ['value'],
  data: function data() {
    return {
      fi_id: []
    };
  },
  methods: {
    updateValue: function updateValue() {
      this.$emit("input", {
        bo_subject: this.$refs.bo_subject.value,
        bo_content: this.$refs.bo_content.value,
        fi_id: this.fi_id
      });
    },
    pushFi_id: function pushFi_id(fi_id) {
      this.fi_id.push(fi_id);
      this.updateValue();
    }
  }
});

/***/ }),

/***/ "./resources/js/views/admin/board/_comp/BoForm.vue":
/*!*********************************************************!*\
  !*** ./resources/js/views/admin/board/_comp/BoForm.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BoForm_vue_vue_type_template_id_8b7fd04c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BoForm.vue?vue&type=template&id=8b7fd04c&scoped=true& */ "./resources/js/views/admin/board/_comp/BoForm.vue?vue&type=template&id=8b7fd04c&scoped=true&");
/* harmony import */ var _BoForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoForm.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/board/_comp/BoForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BoForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BoForm_vue_vue_type_template_id_8b7fd04c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _BoForm_vue_vue_type_template_id_8b7fd04c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "8b7fd04c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/board/_comp/BoForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/board/_comp/BoForm.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/admin/board/_comp/BoForm.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BoForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BoForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/board/_comp/BoForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BoForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/board/_comp/BoForm.vue?vue&type=template&id=8b7fd04c&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/views/admin/board/_comp/BoForm.vue?vue&type=template&id=8b7fd04c&scoped=true& ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BoForm_vue_vue_type_template_id_8b7fd04c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BoForm_vue_vue_type_template_id_8b7fd04c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BoForm_vue_vue_type_template_id_8b7fd04c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BoForm.vue?vue&type=template&id=8b7fd04c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/board/_comp/BoForm.vue?vue&type=template&id=8b7fd04c&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/board/_comp/BoForm.vue?vue&type=template&id=8b7fd04c&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/board/_comp/BoForm.vue?vue&type=template&id=8b7fd04c&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
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
    {},
    [
      _c(
        "b-container",
        [
          _c(
            "b-row",
            [
              _c(
                "b-col",
                { staticClass: "awesome_p" },
                [
                  _c("b-form-input", {
                    attrs: { id: "bo_subject", size: "lg", required: "" },
                    model: {
                      value: _vm.value.bo_subject,
                      callback: function ($$v) {
                        _vm.$set(_vm.value, "bo_subject", $$v)
                      },
                      expression: "value.bo_subject",
                    },
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "bo_subject" } }, [
                    _vm._v("제목"),
                  ]),
                  _vm._v(" "),
                  _c("validation", {
                    attrs: {
                      error: _vm.$store.state.error.validations.bo_subject,
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
                { staticClass: "awesome_p" },
                [
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.value.bo_content,
                        expression: "value.bo_content",
                      },
                    ],
                    attrs: { id: "'bo_content", rows: "8", required: "" },
                    domProps: { value: _vm.value.bo_content },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.value, "bo_content", $event.target.value)
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "bo_content" } }, [
                    _vm._v("내용"),
                  ]),
                  _vm._v(" "),
                  _c("validation", {
                    attrs: {
                      error: _vm.$store.state.error.validations.bo_content,
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
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);