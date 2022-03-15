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
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  // https://levelup.gitconnected.com/cards-hover-animation-wotw-7d1304f16ec6
  name: "BestList",
  props: ['items'],
  data: function data() {
    return {
      selectedCard: -1
    };
  },
  methods: {
    hoverCard: function hoverCard(selectedIndex) {
      this.selectedCard = selectedIndex;
      this.animateCards();
    },
    animateCards: function animateCards() {
      var _this = this;

      this.items.forEach(function (card, index) {
        var direction = _this.calculateCardDirection(index, _this.selectedCard);

        TweenMax.to(_this.$refs["card_".concat(index)], 0.3, {
          x: direction * 50
        });
      });
    },
    calculateCardDirection: function calculateCardDirection(cardIndex, selectedIndex) {
      if (selectedIndex === -1) {
        return 0;
      }

      var diff = cardIndex - selectedIndex;
      return diff === 0 ? 0 : diff / Math.abs(diff);
    },
    isSelected: function isSelected(cardIndex) {
      return this.selectedCard === cardIndex;
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&media=screen&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&media=screen&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n#best { background: linear-gradient(to right, #01A4A4, #0280AB); margin-bottom:1rem;\n}\n#best .card-row { display: flex; justify-content: center; align-items: center; min-width:1600px; width: 100%; height: 500px;\n}\n#best .card-row .card { position: relative; background-color: #FFFFFF; height: 370px; width: 240px; margin: 10px; overflow: hidden; box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.5); transition: height 0.3s, box-shadow 0.3s;\n}\n#best .card-row .card:hover { height: 410px; box-shadow: 20px 20px 40px 0px rgba(0,0,0,0.5);\n}\n#best .card-row .card-image { /* center horizontally overflown image */ position: absolute; left: -9999px; right: -9999px; margin: auto; height: 220px; min-width: 100%; transition: height 0.3s, opacity 0.3s;\n}\n#best .card-row .card-image.selected { height: 410px; opacity: 0.3;\n}\n#best .card-row .card-footer { position: absolute; bottom: 0; height: 130px; padding: 10px 15px; font-family: Helvetica;\n}\n#best .card-row .card-text { font-size: 14px; color: rgba(0, 0, 0, 0.7);\n}\n#best .card-row .card-title { font-family: Serif;\n}\n#best .card-row .card-author { font-size: 14px; color: #BAB096; transition: color 0.3s;\n}\n#best .card-row .card-author.selected { color: #6a6456;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&media=screen&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&media=screen&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BestList.vue?vue&type=style&index=0&media=screen&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&media=screen&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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
/* harmony import */ var _BestList_vue_vue_type_template_id_0a7373ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BestList.vue?vue&type=template&id=0a7373ea& */ "./resources/js/views/web/_module/main/BestList.vue?vue&type=template&id=0a7373ea&");
/* harmony import */ var _BestList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BestList.vue?vue&type=script&lang=js& */ "./resources/js/views/web/_module/main/BestList.vue?vue&type=script&lang=js&");
/* harmony import */ var _BestList_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BestList.vue?vue&type=style&index=0&media=screen&lang=css& */ "./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&media=screen&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BestList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BestList_vue_vue_type_template_id_0a7373ea___WEBPACK_IMPORTED_MODULE_0__.render,
  _BestList_vue_vue_type_template_id_0a7373ea___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
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

/***/ "./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&media=screen&lang=css&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&media=screen&lang=css& ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BestList.vue?vue&type=style&index=0&media=screen&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=style&index=0&media=screen&lang=css&");


/***/ }),

/***/ "./resources/js/views/web/_module/main/BestList.vue?vue&type=template&id=0a7373ea&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/views/web/_module/main/BestList.vue?vue&type=template&id=0a7373ea& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_template_id_0a7373ea___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_template_id_0a7373ea___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BestList_vue_vue_type_template_id_0a7373ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BestList.vue?vue&type=template&id=0a7373ea& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=template&id=0a7373ea&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=template&id=0a7373ea&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/_module/main/BestList.vue?vue&type=template&id=0a7373ea& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { attrs: { id: "best" } }, [
    _c("div", { staticClass: "layout" }, [
      _c(
        "div",
        { staticClass: "card-row" },
        _vm._l(_vm.items, function (item, index) {
          return _c(
            "router-link",
            {
              key: index,
              ref: "card_" + index,
              refInFor: true,
              staticClass: "card",
              attrs: {
                to: { name: "goods_show", params: { gd_id: item.gd_id } },
              },
              on: {
                mouseover: function ($event) {
                  return _vm.hoverCard(index)
                },
                mouseout: function ($event) {
                  return _vm.hoverCard(-1)
                },
              },
            },
            [
              _c("img", {
                staticClass: "card-image",
                class: { selected: _vm.isSelected(index) },
                attrs: { src: item.image },
              }),
              _vm._v(" "),
              _c("div", { staticClass: "card-footer" }, [
                _c("p", { staticClass: "card-text" }, [_vm._v("RECIPE")]),
                _vm._v(" "),
                _c("h3", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(item.title)),
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "card-text" }, [
                  _vm._v("by\n                        "),
                  _c(
                    "span",
                    {
                      staticClass: "card-author",
                      class: { selected: _vm.isSelected(index) },
                    },
                    [_vm._v(_vm._s(item.text))]
                  ),
                ]),
              ]),
            ]
          )
        }),
        1
      ),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);