"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web__module_main_BestList_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  // https://levelup.gitconnected.com/cards-hover-animation-wotw-7d1304f16ec6
  name: "BestList",
  props: ['items'],
  data: function data() {
    return {
      selectedBox: -1
    };
  },
  methods: {
    hoverBox: function hoverBox(selectedIndex) {
      this.selectedBox = selectedIndex;
      this.animateBoxs();
    },
    animateBoxs: function animateBoxs() {
      var _this = this;

      this.items.forEach(function (box, i) {
        var direction = _this.calculateBoxDirection(i, _this.selectedBox); // TweenMax.to( this.$refs[`box_${i}`], 0.3, {x: direction * 50} );


        TweenMax.to("#box_".concat(i), 0.3, {
          x: direction * 30
        });
      });
    },
    calculateBoxDirection: function calculateBoxDirection(boxIndex, selectedIndex) {
      if (selectedIndex === -1) return 0;
      var diff = boxIndex - selectedIndex;
      return diff === 0 ? 0 : diff / Math.abs(diff);
    },
    isSelected: function isSelected(boxIndex) {
      return this.selectedBox === boxIndex;
    }
  },
  mounted: function mounted() {
    var plugin = document.createElement("script");
    plugin.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js");
    plugin.async = true;
    document.head.appendChild(plugin);
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&id=0a7373ea&lang=css&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&id=0a7373ea&lang=css&scoped=true& ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n#best>.col[data-v-0a7373ea] { padding:0;\n}\n#best>.col[data-v-0a7373ea]:nth-of-type(1) { flex:0 0 6.933334%; max-width:6.933334%; padding-top:20px;\n}\n#best>.col[data-v-0a7373ea]:nth-of-type(2) { flex:0 0 92%; max-width:92%;\n}\r\n/*#best { background: linear-gradient(to right, #01A4A4, #0280AB); margin-bottom:1rem; }*/\n#best .box-row[data-v-0a7373ea] { display: flex; justify-content: center; align-items: center; min-width:1100px; width:100%; height:320px;\n}\n#best .box-row .box[data-v-0a7373ea] { position: relative; background-color: #FFFFFF; height:300px; width: 240px; margin: 10px; overflow: hidden; box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.5); transition: height 0.3s, box-shadow 0.3s;\n}\n#best .box-row .box[data-v-0a7373ea]:hover { height:320px; box-shadow: 20px 20px 40px 0px rgba(0,0,0,0.5);\n}\n#best .box-row .box-image[data-v-0a7373ea] { /* center horizontally overflown image */ position: absolute; left: -9999px; right: -9999px; margin: auto; height: 220px; min-width: 100%; transition: height 0.3s, opacity 0.3s;\n}\n#best .box-row .box-image.selected[data-v-0a7373ea] { height:320px; opacity: 0.3;\n}\n#best .box-row .box-footer[data-v-0a7373ea] { position:absolute; bottom:0; height:80px; padding:10px 15px;\n}\n#best .box-row .box-footer .box_ca[data-v-0a7373ea] { color: #1A8FD4; transition: color 0.3s; margin-bottom:0; font-size:.8rem;\n}\n#best .box-row .box-footer .box_ca.selected[data-v-0a7373ea] { color: #6a6456;\n}\n#best .box-row .box-footer .box_tit[data-v-0a7373ea] { font-weight:bold;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&id=0a7373ea&lang=css&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&id=0a7373ea&lang=css&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_style_index_0_id_0a7373ea_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BestList.vue?vue&type=style&index=0&id=0a7373ea&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&id=0a7373ea&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_style_index_0_id_0a7373ea_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_style_index_0_id_0a7373ea_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/_module/main/BestList.vue":
/*!**********************************************************!*\
  !*** ./resources/js/views/web/_module/main/BestList.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BestList_vue_vue_type_template_id_0a7373ea_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BestList.vue?vue&type=template&id=0a7373ea&scoped=true& */ "./resources/js/views/web/_module/main/BestList.vue?vue&type=template&id=0a7373ea&scoped=true&");
/* harmony import */ var _BestList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BestList.vue?vue&type=script&lang=js& */ "./resources/js/views/web/_module/main/BestList.vue?vue&type=script&lang=js&");
/* harmony import */ var _BestList_vue_vue_type_style_index_0_id_0a7373ea_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BestList.vue?vue&type=style&index=0&id=0a7373ea&lang=css&scoped=true& */ "./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&id=0a7373ea&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BestList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BestList_vue_vue_type_template_id_0a7373ea_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _BestList_vue_vue_type_template_id_0a7373ea_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0a7373ea",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/_module/main/BestList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/_module/main/BestList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/views/web/_module/main/BestList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BestList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&id=0a7373ea&lang=css&scoped=true&":
/*!*******************************************************************************************************************!*\
  !*** ./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&id=0a7373ea&lang=css&scoped=true& ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_style_index_0_id_0a7373ea_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BestList.vue?vue&type=style&index=0&id=0a7373ea&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&id=0a7373ea&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/_module/main/BestList.vue?vue&type=template&id=0a7373ea&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/views/web/_module/main/BestList.vue?vue&type=template&id=0a7373ea&scoped=true& ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_template_id_0a7373ea_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_template_id_0a7373ea_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_template_id_0a7373ea_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BestList.vue?vue&type=template&id=0a7373ea&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=template&id=0a7373ea&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=template&id=0a7373ea&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=template&id=0a7373ea&scoped=true& ***!
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
    "b-row",
    { staticClass: "layout", attrs: { id: "best" } },
    [
      _c("b-col", [_c("b-img", { attrs: { src: "/img/main/best.gif" } })], 1),
      _vm._v(" "),
      _c("b-col", [
        _c(
          "div",
          { staticClass: "box-row" },
          _vm._l(_vm.items, function (item, i) {
            return _c(
              "b-link",
              {
                key: i,
                ref: "box_" + i,
                refInFor: true,
                staticClass: "box",
                attrs: {
                  id: "box_" + i,
                  to: { name: "goods_show", params: { gd_id: item.gd_id } },
                },
                on: {
                  mouseover: function ($event) {
                    return _vm.hoverBox(i)
                  },
                  mouseout: function ($event) {
                    return _vm.hoverBox(-1)
                  },
                },
              },
              [
                _c("img", {
                  staticClass: "box-image",
                  class: { selected: _vm.isSelected(i) },
                  attrs: { src: item.image },
                }),
                _vm._v(" "),
                _c("div", { staticClass: "box-footer" }, [
                  _c(
                    "p",
                    {
                      staticClass: "box_ca",
                      class: { selected: _vm.isSelected(i) },
                    },
                    [_vm._v(_vm._s(item.ca01_name))]
                  ),
                  _vm._v(" "),
                  _c("h6", { staticClass: "box_tit" }, [
                    _vm._v(_vm._s(item.gd_name)),
                  ]),
                ]),
              ]
            )
          }),
          1
        ),
      ]),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);