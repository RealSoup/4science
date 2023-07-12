"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web_shop_estimate_custom__comp_Sub01_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ShopEstimateCustomSub01',
  data: function data() {
    return {
      label: ['카테고리', 'Excitation source : Laser', 'Excitation source : Lamp', 'Excitation source : Laser2', 'Excitation source : LED', 'Excitation source : Others', 'Excitation source : Wavelength', 'Input power', 'Emission range : Wavelength', 'Emission range : Raman shift', 'Sample Chamber', 'System resolution : Wavelength', 'System resolution : Raman shift', 'Beam spot size', 'Sample size', 'Sample type : Solid wafer', 'Sample type : Liquid', 'Sample type : Powder', 'Sample type : Others', 'Sample material', 'Thickness of target material', 'Application'],
      val: []
    };
  },
  methods: {
    checkValidation: function checkValidation() {
      if (isEmpty(this.val[0])) {
        Notify.toast('danger', "카테고리를 선택하세요");
        return false;
      }
      if (isEmpty(this.val[1])) {
        Notify.toast('danger', "1. Excitation source의 Type의 Laser을(를) 입력하세요");
        return false;
      }
      if (isEmpty(this.val[2])) {
        Notify.toast('danger', "1. Excitation source의 Type의 Lamp을(를) 입력하세요");
        return false;
      }
      if (isEmpty(this.val[3])) {
        Notify.toast('danger', "1. Excitation source의 Type의 Laser2을(를) 입력하세요");
        return false;
      }
      if (isEmpty(this.val[4])) {
        Notify.toast('danger', "1. Excitation source의 Type의 LED을(를) 입력하세요");
        return false;
      }
      if (isEmpty(this.val[5])) {
        Notify.toast('danger', "1. Excitation source의 Type의 Others을(를) 입력하세요");
        return false;
      }
      if (isEmpty(this.val[6])) {
        Notify.toast('danger', "1. Excitation source의 Wavelength을(를) 입력하세요");
        return false;
      }
      if (isEmpty(this.val[15])) {
        Notify.toast('danger', "8. Sample type의 Solid wafer을(를) 입력하세요");
        return false;
      }
      if (isEmpty(this.val[16])) {
        Notify.toast('danger', "8. Sample type의 Liquid을(를) 입력하세요");
        return false;
      }
      if (isEmpty(this.val[17])) {
        Notify.toast('danger', "8. Sample type의 Powder을(를) 입력하세요");
        return false;
      }
      if (isEmpty(this.val[18])) {
        Notify.toast('danger', "8. Sample type의 Others을(를) 입력하세요");
        return false;
      }
      if (isEmpty(this.val[21])) {
        Notify.toast('danger', "11. Application을(를) 입력하세요");
        return false;
      }
      return true;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue?vue&type=template&id=2ed9872a&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue?vue&type=template&id=2ed9872a& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("b-container", {
    staticClass: "frm_st"
  }, [_c("table", [_c("tr", [_c("th", [_vm._v("카테고리"), _c("b")]), _vm._v(" "), _c("td", [_c("b-form-select", {
    staticClass: "w-50",
    model: {
      value: _vm.val[0],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 0, $$v);
      },
      expression: "val[0]"
    }
  }, [_c("b-form-select-option", {
    attrs: {
      value: ""
    }
  }, [_vm._v("선택하세요.")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "Raman"
    }
  }, [_vm._v("Raman")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "PL"
    }
  }, [_vm._v("PL")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "EL"
    }
  }, [_vm._v("EL")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "PLE"
    }
  }, [_vm._v("PLE")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "Reflectance"
    }
  }, [_vm._v("Reflectance")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "Transmittance"
    }
  }, [_vm._v("Transmittance")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "Absorption"
    }
  }, [_vm._v("Absorption")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "General spectroscopy"
    }
  }, [_vm._v("General spectroscopy")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "Upconversion Luminescence"
    }
  }, [_vm._v("Upconversion Luminescence")])], 1)], 1)]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("1. Excitation source"), _c("b")]), _vm._v(" "), _c("td", [_c("table", [_c("tr", [_c("th", {
    attrs: {
      rowspan: "3"
    }
  }, [_vm._v("Type")]), _vm._v(" "), _c("td", [_vm._v("Laser")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[1],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 1, $$v);
      },
      expression: "val[1]"
    }
  })], 1), _vm._v(" "), _c("td", [_vm._v("Lamp")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[2],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 2, $$v);
      },
      expression: "val[2]"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("Laser")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[3],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 3, $$v);
      },
      expression: "val[3]"
    }
  })], 1), _vm._v(" "), _c("td", [_vm._v("LED")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[4],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 4, $$v);
      },
      expression: "val[4]"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("Others")]), _c("td", {
    attrs: {
      colspan: "3"
    }
  }, [_c("b-form-input", {
    model: {
      value: _vm.val[5],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 5, $$v);
      },
      expression: "val[5]"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("Wavelength")]), _c("td", {
    attrs: {
      colspan: "4"
    }
  }, [_c("b-form-input", {
    model: {
      value: _vm.val[6],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 6, $$v);
      },
      expression: "val[6]"
    }
  })], 1)])])])]), _vm._v(" "), _c("tr", [_c("th", [_vm._v(" 2. Input power")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[7],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 7, $$v);
      },
      expression: "val[7]"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v(" 3. Emission range")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[8],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 8, $$v);
      },
      expression: "val[8]"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[9],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 9, $$v);
      },
      expression: "val[9]"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("th", [_vm._v(" 4. Sample Chamber")]), _vm._v(" "), _c("td", [_c("b-form-select", {
    model: {
      value: _vm.val[10],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 10, $$v);
      },
      expression: "val[10]"
    }
  }, [_c("b-form-select-option", {
    attrs: {
      value: ""
    }
  }, [_vm._v("선택하세요.")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "Microscope Raman"
    }
  }, [_vm._v("Microscope Raman")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "PL chamber"
    }
  }, [_vm._v("PL chamber")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "Macro Chamber"
    }
  }, [_vm._v("Macro Chamber")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "Long working Telescope"
    }
  }, [_vm._v("Long working Telescope")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "Fiber coupled probe module, etc."
    }
  }, [_vm._v("Fiber coupled probe module, etc.")])], 1)], 1)]), _vm._v(" "), _c("tr", [_c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v(" 5. System resolution")]), _c("td", [_c("b-form-input", {
    staticClass: "w-25",
    model: {
      value: _vm.val[11],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 11, $$v);
      },
      expression: "val[11]"
    }
  }), _vm._v("(Wavelength)")], 1)]), _vm._v(" "), _c("tr", [_c("td", [_c("b-form-input", {
    staticClass: "w-25",
    model: {
      value: _vm.val[12],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 12, $$v);
      },
      expression: "val[12]"
    }
  }), _vm._v("/cm-1(Raman shift)")], 1)]), _vm._v(" "), _c("tr", [_c("th", [_vm._v(" 6. Beam spot size")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[13],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 13, $$v);
      },
      expression: "val[13]"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("th", [_vm._v(" 7. Sample size")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[14],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 14, $$v);
      },
      expression: "val[14]"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("8. Sample type"), _c("b")]), _vm._v(" "), _c("td", [_c("table", [_c("tr", [_c("th", [_vm._v("Solid wafer")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[15],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 15, $$v);
      },
      expression: "val[15]"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("Liquid")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[16],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 16, $$v);
      },
      expression: "val[16]"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("Powder")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[17],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 17, $$v);
      },
      expression: "val[17]"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("Others")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[18],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 18, $$v);
      },
      expression: "val[18]"
    }
  })], 1)])])])]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("9. Sample material")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[19],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 19, $$v);
      },
      expression: "val[19]"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("10. Thickness"), _c("br"), _vm._v("of target material")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[20],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 20, $$v);
      },
      expression: "val[20]"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("11. Application"), _c("b")]), _c("td", [_c("b-form-input", {
    model: {
      value: _vm.val[21],
      callback: function callback($$v) {
        _vm.$set(_vm.val, 21, $$v);
      },
      expression: "val[21]"
    }
  })], 1)])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Sub01_vue_vue_type_template_id_2ed9872a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sub01.vue?vue&type=template&id=2ed9872a& */ "./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue?vue&type=template&id=2ed9872a&");
/* harmony import */ var _Sub01_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sub01.vue?vue&type=script&lang=js& */ "./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sub01_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sub01_vue_vue_type_template_id_2ed9872a___WEBPACK_IMPORTED_MODULE_0__.render,
  _Sub01_vue_vue_type_template_id_2ed9872a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub01_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sub01.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub01_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue?vue&type=template&id=2ed9872a&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue?vue&type=template&id=2ed9872a& ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub01_vue_vue_type_template_id_2ed9872a___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub01_vue_vue_type_template_id_2ed9872a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Sub01_vue_vue_type_template_id_2ed9872a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sub01.vue?vue&type=template&id=2ed9872a& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/estimate/custom/_comp/Sub01.vue?vue&type=template&id=2ed9872a&");


/***/ })

}]);