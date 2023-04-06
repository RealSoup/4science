"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web_shop_order_Done_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Done.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Done.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************/
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['value'],
  data: function data() {
    return {
      od_id: this.$route.params.od_id,
      order: {
        order_extra_info: {}
      }
    };
  },
  computed: {
    after_10day: function after_10day() {
      return date_calc('d', 10).format("yyyy년 MM월 dd일");
    },
    pay_plan: function pay_plan() {
      switch (this.order.order_extra_info.oex_pay_plan) {
        case 'soon':
          return '선결제';
          break;

        case 'week1':
          return '1주이내';
          break;

        case 'week2':
          return '2주이내';
          break;

        case 'month1':
          return '30일이내';
          break;

        case 'month2':
          return '60일이내';
          break;
      }
    },
    pay_method: function pay_method() {
      switch (this.order.od_pay_method) {
        case 'C':
          return '카드 결제';
          break;

        case 'B':
          return '현금결제 (무통장입금)';
          break;

        case 'P':
          return 'PSYS (원격지 연구비 직접결제)';
          break;

        case 'R':
          return '원격결제';
          break;

        case 'E':
          return '에스크로 (결제대금예치)';
          break;
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/shop/order/done/".concat(_this.od_id));

            case 2:
              res = _context.sent;
              if (res && res.status === 200) _this.order = res.data;

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Done.vue?vue&type=style&index=0&id=5b751812&lang=css&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Done.vue?vue&type=style&index=0&id=5b751812&lang=css&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.container[data-v-5b751812] { text-align:center;\n}\n.container p[data-v-5b751812]:nth-child(1) { font-size:3.2rem; color:#1A90D6; font-weight:100; margin-bottom:0;\n}\n.container p[data-v-5b751812]:nth-child(2) { font-size:1.9rem; font-weight:bold;\n}\n.container p[data-v-5b751812]:nth-child(3) { font-size:1.3rem; font-weight:bold;\n}\n.container p:nth-child(3) b[data-v-5b751812] { color:#1A90D6;\n}\n.container ul[data-v-5b751812] { border:1px solid #CCCCCC; width:620px; margin:3rem auto; border-radius:16px; padding:1.8rem;\n}\n.container ul .dd_style[data-v-5b751812] { display:flex; flex-wrap:wrap; align-items:center;\n}\n.container ul .dd_style span[data-v-5b751812] { flex-basis:0; flex-grow:1; max-width:100%; font-weight:600; font-size:1.1rem;\n}\n.container ul .dd_style span[data-v-5b751812]:nth-child(1) { text-align:right; padding-right:10px; flex:0 0 39%; max-width:39%;\n}\n.container ul .dd_style span[data-v-5b751812]:nth-child(2) { text-align:left; color:#1A90D6;\n}\n.container ul li[data-v-5b751812] { line-height:2.3;\n}\n.container ul li:nth-child(1) span[data-v-5b751812]:nth-child(2) { font-weight:800; font-size:1.4rem;\n}\n.container ul li[data-v-5b751812]:last-child { line-height: 1.5; font-size: .9rem;\n}\n.container ul li:last-child b[data-v-5b751812] { font-weight:800;\n}\n.container ul li b.point[data-v-5b751812] { color:#1A90D6;\n}\n.container .row[data-v-5b751812] { width:620px; margin:auto;\n}\n.container .row .col[data-v-5b751812]:nth-child(1) { padding-left:0;\n}\n.container .row .col[data-v-5b751812]:nth-child(2) { padding-right:0;\n}\n.container .row .col .btn[data-v-5b751812] { width:100%;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Done.vue?vue&type=style&index=0&id=5b751812&lang=css&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Done.vue?vue&type=style&index=0&id=5b751812&lang=css&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Done_vue_vue_type_style_index_0_id_5b751812_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Done.vue?vue&type=style&index=0&id=5b751812&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Done.vue?vue&type=style&index=0&id=5b751812&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Done_vue_vue_type_style_index_0_id_5b751812_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Done_vue_vue_type_style_index_0_id_5b751812_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/shop/order/Done.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/web/shop/order/Done.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Done_vue_vue_type_template_id_5b751812_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Done.vue?vue&type=template&id=5b751812&scoped=true& */ "./resources/js/views/web/shop/order/Done.vue?vue&type=template&id=5b751812&scoped=true&");
/* harmony import */ var _Done_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Done.vue?vue&type=script&lang=js& */ "./resources/js/views/web/shop/order/Done.vue?vue&type=script&lang=js&");
/* harmony import */ var _Done_vue_vue_type_style_index_0_id_5b751812_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Done.vue?vue&type=style&index=0&id=5b751812&lang=css&scoped=true& */ "./resources/js/views/web/shop/order/Done.vue?vue&type=style&index=0&id=5b751812&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Done_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Done_vue_vue_type_template_id_5b751812_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Done_vue_vue_type_template_id_5b751812_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5b751812",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/shop/order/Done.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/shop/order/Done.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/web/shop/order/Done.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Done_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Done.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Done.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Done_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/shop/order/Done.vue?vue&type=style&index=0&id=5b751812&lang=css&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/views/web/shop/order/Done.vue?vue&type=style&index=0&id=5b751812&lang=css&scoped=true& ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Done_vue_vue_type_style_index_0_id_5b751812_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Done.vue?vue&type=style&index=0&id=5b751812&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Done.vue?vue&type=style&index=0&id=5b751812&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/shop/order/Done.vue?vue&type=template&id=5b751812&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/views/web/shop/order/Done.vue?vue&type=template&id=5b751812&scoped=true& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Done_vue_vue_type_template_id_5b751812_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Done_vue_vue_type_template_id_5b751812_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Done_vue_vue_type_template_id_5b751812_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Done.vue?vue&type=template&id=5b751812&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Done.vue?vue&type=template&id=5b751812&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Done.vue?vue&type=template&id=5b751812&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Done.vue?vue&type=template&id=5b751812&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
      _c("p", [_vm._v("THANK YOU!")]),
      _vm._v(" "),
      _c("p", [_vm._v("주문이 완료되었습니다.")]),
      _vm._v(" "),
      _c("p", [
        _vm._v("주문내역은 마이페이지 > "),
        _c("b", [_vm._v("주문 / 배송조회")]),
        _vm._v(" 에서 확인하실 수 있습니다."),
      ]),
      _vm._v(" "),
      _c("ul", [
        _c("li", { staticClass: "dd_style" }, [
          _c("span", [_vm._v("주문번호")]),
          _c("span", [_vm._v(_vm._s(_vm.order.od_no))]),
        ]),
        _vm._v(" "),
        _c("li", { staticClass: "dd_style" }, [
          _c("span", [_vm._v("결제방법")]),
          _c("span", [_vm._v(_vm._s(_vm.pay_method))]),
        ]),
        _vm._v(" "),
        _c("li", { staticClass: "dd_style" }, [
          _c("span", [_vm._v("결제 예정일")]),
          _c("span", [_vm._v(_vm._s(_vm.pay_plan))]),
        ]),
        _vm._v(" "),
        _c("li", [
          _c("b", [_vm._v(_vm._s(_vm.after_10day))]),
          _vm._v("까지 주문 금액이 입금확인이 되지 않으면,\n            "),
          _c("br"),
          _c("b", [_vm._v("자동주문취소")]),
          _vm._v(" 됨을 알려드립니다.\n            "),
          _c("br"),
          _c("b", { staticClass: "point" }, [
            _vm._v("단 대학교, 국가연구기관은 예외"),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "b-row",
        [
          _c(
            "b-col",
            [
              _c(
                "b-button",
                {
                  staticClass: "gray xl",
                  on: {
                    click: function ($event) {
                      return _vm.$router.push({ name: "my_order" })
                    },
                  },
                },
                [_vm._v("주문/배송조회 가기")]
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            [
              _c(
                "b-button",
                {
                  staticClass: "blue xl",
                  on: {
                    click: function ($event) {
                      return _vm.$router.push({ name: "main" })
                    },
                  },
                },
                [_vm._v("쇼핑 계속하기")]
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