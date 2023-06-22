"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web_board_Intro_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Intro.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Intro.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'BoardIntro',
  components: {
    'intro-list': function introList() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_board_IntroList_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./IntroList.vue */ "./resources/js/views/web/board/IntroList.vue"));
    },
    'intro-listPhoto': function introListPhoto() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_board_IntroListPhoto_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./IntroListPhoto.vue */ "./resources/js/views/web/board/IntroListPhoto.vue"));
    }
  },
  data: function data() {
    return {
      open: [],
      notice: [],
      gd_inquiry: [],
      event: [],
      blog: [{
        bo_id: 1,
        bo_subject: "DURRIDGE사 라돈측정기",
        bo_content: "공기 중의 Radon Gas 농도 측정 <br> 건축물, 토목 자재 및 가구의 Radon 방출량 측정<br> 지하수 및 하천수의 Radon Gas 농도 측정(옵션 추가 필요)......",
        goods: {
          'image_src_thumb': ["".concat(this.s3url, "board/blog220122.jpg")]
        },
        href: 'https://blog.naver.com/4science/221778968634'
      }, {
        bo_id: 2,
        bo_subject: "GRIMM사 미세먼지 측정기",
        bo_content: "요즘 미세먼지가 매우매우 큰 이슈입니다. 그래서 준비했다!!!<br> 환경부에서 공기질을 측정하는 기기 중 신뢰성이 가장 높다고 발표한 그림(Grimm)사의 제품. 본제품은 국내외 미세먼지 측정기 및 공기청......",
        goods: {
          'image_src_thumb': ["".concat(this.s3url, "board/blog191113.jpg")]
        },
        href: 'https://blog.naver.com/4science/221658684815'
      }, {
        bo_id: 3,
        bo_subject: "GRIMM Aerosol Generators",
        bo_content: "미세먼지 측정기의 대가 GRIMM 사의 Aerosol Generators입니다. 우선 모델 7811의 경우 다목적 분무기는 입자를 분무할 수 있는 공기와 에어로졸 원료를 선택적으로 희석 및 건조를 위한 2개의 통합 펌프를 갖춘 .......",
        goods: {
          'image_src_thumb': ["".concat(this.s3url, "board/blog190911.jpg")]
        },
        href: 'https://blog.naver.com/4science/221645634590'
      }]
    };
  },
  mounted: function mounted() {
    this.index(); // console.log(`${this.s3url}/img/board/blog190911.jpg`);
  },
  methods: {
    index: function index() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/board/notice", {
                  params: {
                    'limit': 5
                  }
                });

              case 3:
                res = _context.sent;
                if (res && res.status === 200) _this.notice = res.data.list.data;
                _context.next = 7;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/board/gd_inquiry", {
                  params: {
                    'limit': 3
                  }
                });

              case 7:
                res = _context.sent;
                if (res && res.status === 200) _this.gd_inquiry = res.data.list.data;
                _context.next = 11;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/board/event", {
                  params: {
                    'limit': 5
                  }
                });

              case 11:
                res = _context.sent;
                if (res && res.status === 200) _this.event = res.data.list.data;
                _context.next = 19;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](0);
                Notify.consolePrint(_context.t0);
                Notify.toast('warning', _context.t0.response.data.message);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 15]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Intro.vue?vue&type=style&index=0&id=f8d8820e&lang=css&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Intro.vue?vue&type=style&index=0&id=f8d8820e&lang=css&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.w_fence h3[data-v-f8d8820e] { border-bottom:2px solid #000; padding:0 25px 15px 25px; margin:0 -15px 30px;\n}\n.w_fence .row .col[data-v-f8d8820e] { padding:30px;\n}\n.w_fence .row .col a[data-v-f8d8820e] { position:absolute; top:14px; left:50px; width:260px; height:80px; display:inline-block; background-repeat:no-repeat; background-position:center center; z-index:1;\n}\n.w_fence .row .col[data-v-f8d8820e] ul { border:3px solid #000; border-radius:20px; padding:50px 40px 30px; position:relative;\n}\n.w_fence .row:nth-of-type(1) .col:nth-of-type(1) a[data-v-f8d8820e] { background-image:url('https://fourscience.s3.ap-northeast-2.amazonaws.com/community/notice.png');\n}\n.w_fence .row:nth-of-type(1) .col:nth-of-type(2) a[data-v-f8d8820e] { background-image:url('https://fourscience.s3.ap-northeast-2.amazonaws.com/community/event.png');\n}\n.w_fence .row:nth-of-type(2) .col:nth-of-type(1) a[data-v-f8d8820e] { background-image:url('https://fourscience.s3.ap-northeast-2.amazonaws.com/community/gd_inquiry.png');\n}\n.w_fence .row:nth-of-type(2) .col:nth-of-type(2) a[data-v-f8d8820e] { background-image:url('https://fourscience.s3.ap-northeast-2.amazonaws.com/community/blog.png');\n}\n.w_fence .row:nth-of-type(1) .col:nth-of-type(1) a[data-v-f8d8820e]:hover { background-image:url('https://fourscience.s3.ap-northeast-2.amazonaws.com/community/notice_h.png');\n}\n.w_fence .row:nth-of-type(1) .col:nth-of-type(2) a[data-v-f8d8820e]:hover { background-image:url('https://fourscience.s3.ap-northeast-2.amazonaws.com/community/event_h.png');\n}\n.w_fence .row:nth-of-type(2) .col:nth-of-type(1) a[data-v-f8d8820e]:hover { background-image:url('https://fourscience.s3.ap-northeast-2.amazonaws.com/community/gd_inquiry_h.png');\n}\n.w_fence .row:nth-of-type(2) .col:nth-of-type(2) a[data-v-f8d8820e]:hover { background-image:url('https://fourscience.s3.ap-northeast-2.amazonaws.com/community/blog_h.png');\n}\n@media (max-width: 992px){\n.w_fence .row .col[data-v-f8d8820e] { flex: 0 0 100%; max-width: 100%; padding:15px 0;\n}\n.w_fence .row .col a[data-v-f8d8820e] { top:0px;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Intro.vue?vue&type=style&index=0&id=f8d8820e&lang=css&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Intro.vue?vue&type=style&index=0&id=f8d8820e&lang=css&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Intro_vue_vue_type_style_index_0_id_f8d8820e_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Intro.vue?vue&type=style&index=0&id=f8d8820e&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Intro.vue?vue&type=style&index=0&id=f8d8820e&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Intro_vue_vue_type_style_index_0_id_f8d8820e_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Intro_vue_vue_type_style_index_0_id_f8d8820e_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/board/Intro.vue":
/*!************************************************!*\
  !*** ./resources/js/views/web/board/Intro.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Intro_vue_vue_type_template_id_f8d8820e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Intro.vue?vue&type=template&id=f8d8820e&scoped=true& */ "./resources/js/views/web/board/Intro.vue?vue&type=template&id=f8d8820e&scoped=true&");
/* harmony import */ var _Intro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Intro.vue?vue&type=script&lang=js& */ "./resources/js/views/web/board/Intro.vue?vue&type=script&lang=js&");
/* harmony import */ var _Intro_vue_vue_type_style_index_0_id_f8d8820e_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Intro.vue?vue&type=style&index=0&id=f8d8820e&lang=css&scoped=true& */ "./resources/js/views/web/board/Intro.vue?vue&type=style&index=0&id=f8d8820e&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Intro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Intro_vue_vue_type_template_id_f8d8820e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Intro_vue_vue_type_template_id_f8d8820e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "f8d8820e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/board/Intro.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/board/Intro.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/web/board/Intro.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Intro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Intro.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Intro.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Intro_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/board/Intro.vue?vue&type=style&index=0&id=f8d8820e&lang=css&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/views/web/board/Intro.vue?vue&type=style&index=0&id=f8d8820e&lang=css&scoped=true& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Intro_vue_vue_type_style_index_0_id_f8d8820e_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Intro.vue?vue&type=style&index=0&id=f8d8820e&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Intro.vue?vue&type=style&index=0&id=f8d8820e&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/board/Intro.vue?vue&type=template&id=f8d8820e&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/views/web/board/Intro.vue?vue&type=template&id=f8d8820e&scoped=true& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Intro_vue_vue_type_template_id_f8d8820e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Intro_vue_vue_type_template_id_f8d8820e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Intro_vue_vue_type_template_id_f8d8820e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Intro.vue?vue&type=template&id=f8d8820e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Intro.vue?vue&type=template&id=f8d8820e&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Intro.vue?vue&type=template&id=f8d8820e&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Intro.vue?vue&type=template&id=f8d8820e&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
      _c("h3", [_vm._v("커뮤니티")]),
      _vm._v(" "),
      _c(
        "b-row",
        [
          _c(
            "b-col",
            [
              _c("b-link", {
                attrs: {
                  to: { name: "bo_index", params: { bo_cd: "notice" } },
                },
              }),
              _vm._v(" "),
              _c("intro-list", { attrs: { list: _vm.notice } }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { col: "", lg: "6" } },
            [
              _c("b-link", {
                attrs: { to: { name: "bo_index", params: { bo_cd: "event" } } },
              }),
              _vm._v(" "),
              _c("intro-list", { attrs: { list: _vm.event } }),
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
            [
              _c("b-link", {
                attrs: {
                  to: { name: "bo_index", params: { bo_cd: "gd_inquiry" } },
                },
              }),
              _vm._v(" "),
              _c("intro-listPhoto", { attrs: { list: _vm.gd_inquiry } }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            [
              _c("b-link", {
                attrs: { href: "https://blog.naver.com/4science" },
              }),
              _vm._v(" "),
              _c("intro-listPhoto", { attrs: { list: _vm.blog } }),
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