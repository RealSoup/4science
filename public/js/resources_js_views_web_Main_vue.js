(self["webpackChunkvue_4science"] = self["webpackChunkvue_4science"] || []).push([["resources_js_views_web_Main_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/http */ "./resources/js/api/http.js");
/* harmony import */ var vue_kinesis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-kinesis */ "./node_modules/vue-kinesis/dist/vue-kinesis.esm.js");
/* harmony import */ var vue_accordion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-accordion */ "./node_modules/vue-accordion/dist/vue-accordion.js");
/* harmony import */ var vue_accordion__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_accordion__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  name: "SiteMain",
  components: {
    KinesisContainer: vue_kinesis__WEBPACK_IMPORTED_MODULE_2__.KinesisContainer,
    KinesisElement: vue_kinesis__WEBPACK_IMPORTED_MODULE_2__.KinesisElement,
    // https://github.com/Aminerman/vue-kinesis
    vueAccordion: vue_accordion__WEBPACK_IMPORTED_MODULE_3__.vueAccordion,
    // https://github.com/zeratulmdq/vue-accordion
    'PopUp': function PopUp() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web__module_PopUp_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_module/PopUp */ "./resources/js/views/web/_module/PopUp.vue"));
    }
  },
  data: function data() {
    return {
      list: {
        best: {}
      },
      bestByCategory: {},
      cateSideMenuPosition: 'absolute',
      cateSideMenuTop: 'auto',
      cateSideMenuBottom: 'auto',
      scrollVal: [1760, 2302, 2846, 3387, 3929, 4471, 5013, 5555, 6097, 6639, 7181, 7723, 8265, 8807, 9349, 9891, 10433, 10975, 11517, 12059],
      scrollEnd: 11721,
      currentScroll: 0 // best:[
      //     { title: 'First', text: 'text', url: '#', image: '/images/one.jpg' },
      // ],
      // styles: {
      //     li: {
      //         backgroundSize:'cover',
      //     },
      // }

    };
  },
  computed: _objectSpread({
    bestRemodel: function bestRemodel() {
      var dummy = [];

      for (var i in this.list.best) {
        dummy.push({
          gd_name: this.list.best[i].gd_name,
          ca01_name: this.list.best[i].gc_ca01_name,
          gd_id: this.list.best[i].gd_id,
          image: this.list.best[i].image_src_thumb[0]
        });
      }

      return dummy;
    }
  }, (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapState)('category', ['category'])),
  methods: {
    index: function index(frm) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/shop/goods", {
                  params: frm
                });

              case 3:
                res = _context.sent;
                if (res && res.status === 200) _this.list.best = res.data.list;
                _context.next = 11;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                Notify.consolePrint(_context.t0);
                Notify.toast('warning', _context.t0.response.data.message);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    scrollToCate: function scrollToCate(i) {
      // this.intervalMoveScroll = setInterval(() => {
      //     if (window.pageYOffset === 0) {
      //         clearInterval(this.intervalMoveScroll);
      //     }
      //     window.scroll(0, window.pageYOffset - 50);
      // }, 20);
      window.scrollTo({
        top: this.scrollVal[i],
        left: 0,
        behavior: 'smooth'
      });
    },
    scrollch: function scrollch(k) {
      if (k == 'e') {
        window.scroll(0, this.currentScroll);
      } else if (k == '+') {
        window.scroll(0, this.currentScroll++);
      } else {
        window.scroll(0, this.currentScroll--);
      }
    },
    scrollListener: function scrollListener(e) {
      this.currentScroll = window.scrollY;

      if (window.scrollY > this.scrollEnd) {
        this.cateSideMenuPosition = 'absolute';
        this.cateSideMenuTop = 'auto';
        this.cateSideMenuBottom = 0;
      } else if (window.scrollY > this.scrollVal[0]) {
        this.cateSideMenuPosition = 'fixed';
        this.cateSideMenuTop = '82px';
        this.cateSideMenuBottom = 'auto';
      } else if (window.scrollY < this.scrollVal[0]) {
        this.cateSideMenuPosition = 'absolute';
        this.cateSideMenuTop = 'auto';
        this.cateSideMenuBottom = 'auto';
      }

      for (var i in this.scrollVal) {
        if (i < this.scrollVal.length - 1 && this.scrollVal[i] < window.scrollY && window.scrollY < this.scrollVal[Number(i) + 1]) this.category[i].showing = true;else this.category[i].showing = false;
      }
    } // addClass: function (e) {
    //     e.target.classList.add("hover");
    // },
    // removeClass: function (e) {
    //     e.target.classList.remove("hover");
    // },

  },
  mounted: function mounted() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      var rst;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              window.addEventListener('scroll', _this2.scrollListener); // this.index(this.listType.best);

              _context2.next = 3;
              return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/main");

            case 3:
              rst = _context2.sent;
              _this2.bestByCategory = rst.data.bestByCate;
              _this2.list.best = rst.data.best;

              if (_this2.$route.query.rst == 'social_login') {
                //  소셜 로그인 후 개인정보가 없으면
                if (isEmpty(_this2.$store.state.auth.user.email) || isEmpty(_this2.$store.state.auth.user.name) || isEmpty(_this2.$store.state.auth.user.birth) || isEmpty(_this2.$store.state.auth.user.hp)) {
                  _this2.$router.push({
                    name: 'my_user_edit'
                  });

                  Notify.modal('필수 개인정보를 입력하세요.', 'warning');
                }
              }

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.slide_banner[data-v-5322a9b3] { max-width: 1920px; margin: auto;\n}\n.slide_banner[data-v-5322a9b3] .carousel-indicators li { background-color:#898989;\n}\n.slide_banner[data-v-5322a9b3] .carousel-control-prev:hover,\r\n.slide_banner[data-v-5322a9b3] .carousel-control-next:hover { background-color:#55888888;\n}\n.slide_banner .split_link[data-v-5322a9b3] { position:absolute; display: block; width:190px; height:57px; bottom:25px; transform:translateX(-50%);\n}\n.slide_banner a#app01[data-v-5322a9b3] { left:23%;\n}\n.slide_banner a#app02[data-v-5322a9b3] { left:77%;}\n#best[data-v-5322a9b3] { margin-top:26px;\n}\n#best>.col[data-v-5322a9b3] { padding:0;\n}\n#best>.col[data-v-5322a9b3]:nth-of-type(1) { flex:0 0 6.933334%; max-width:6.933334%; padding-top:20px;\n}\n#best>.col[data-v-5322a9b3]:nth-of-type(2) { flex:0 0 93.066666%; max-width:93.066666%;\n}\n#best .col .box-row[data-v-5322a9b3] { display:flex; justify-content:center; align-items:center; width:100%; height:320px;\n}\n#best .col .box-row a[data-v-5322a9b3] { position: relative; background-color: #FFFFFF; height:288px; width:220px; margin:10px;\n}\n#best .col .box-row a[data-v-5322a9b3]:last-of-type { margin-right:0;\n}\n#best .col .box-row a img[data-v-5322a9b3] { width: 100%; height: 210px; -o-object-fit: cover; object-fit: cover; border: 1px solid #B7B7B7;\n}\n#best .col .box-row a .box-footer[data-v-5322a9b3] { position:absolute; bottom:0; height:80px; padding:10px 15px;\n}\n#best .col .box-row a .box-footer .box_ca[data-v-5322a9b3] { color:#1A8FD4; margin-bottom:3px; font-size:.8rem;\n}\n#best .col .box-row a .box-footer .box_tit[data-v-5322a9b3] { font-weight:bold;\n}\n.recommend .back[data-v-5322a9b3] { background:#fbcad0; position:absolute; width:100%; height:18.5rem;\n}\n.recommend .container .row[data-v-5322a9b3]:last-child { margin-top:2rem;\n}\n.recommend .container .row .tit[data-v-5322a9b3] { color:#FFF; font-style:italic; font-size:1.4rem; font-weight:bold; margin-top:1.9Rem; margin-bottom: .6REM;\n}\n.recommend .container .row .col a[data-v-5322a9b3] { display:block;\n}\n.recommend .container .row .col a img[data-v-5322a9b3] { border:1px solid #CCC; border-radius:10px; width:100%;\n}\n.byCate[data-v-5322a9b3] { position:relative; margin-top:5rem;\n}\n.byCate .titByCate[data-v-5322a9b3] { margin-bottom:1.5rem;\n}\n.byCate .titByCate h5[data-v-5322a9b3] { font-style:italic; font-weight:bold; font-size:2rem;\n}\n.byCate aside[data-v-5322a9b3] { margin-left:-76px; z-index:1;\n}\n.byCate aside ul[data-v-5322a9b3] { border:1px solid #898989;\n}\n.byCate aside ul li[data-v-5322a9b3] { padding:4px 6px; cursor:pointer; position:relative;\n}\n.byCate aside ul li.active[data-v-5322a9b3],\r\n.byCate aside ul li[data-v-5322a9b3]:hover { background:#448AC8;\n}\n.byCate aside ul li span[data-v-5322a9b3] { padding-left:10px; background:#448AC8; position:absolute; width:216px; color:#fff; z-index:1; top:0; line-height:44px;\n}\n.byCate .con .row[data-v-5322a9b3] { border-top:2px solid #4A505C; margin-bottom:2.5rem;\n}\n.byCate .con .row .col[data-v-5322a9b3] { padding:0;\n}\n.byCate .con .row .tit[data-v-5322a9b3] { flex:0 0 13.4%; max-width:200px; border-right:1px solid #B1B1B1; border-bottom:1px solid #B1B1B1;\n}\n.byCate .con .row .tit a[data-v-5322a9b3] { display:block; position:relative; height:100%; padding: 24px 0 0 16px;\n}\n.byCate .con .row .tit a img[data-v-5322a9b3] { position:absolute; z-index:-1; width:200px; height:500px; -o-object-fit:cover; object-fit:cover; top:0; left:0;\n}\n.byCate .con .row .tit a h6[data-v-5322a9b3] { font-weight:bold; font-size:1.5rem;\n}\n.byCate .con .row .tit a span[data-v-5322a9b3] { color:#9FA0A2;\n}\n.byCate .con .row .list[data-v-5322a9b3] { display:flex; flex-wrap:wrap;\n}\n.byCate .con .row .list .col[data-v-5322a9b3] { flex:0 0 16.666666%; max-width:16.666666%; padding:16px; text-align:center; border-right:1px solid #B1B1B1; border-bottom:1px solid #B1B1B1;\n}\n.byCate .con .row .list .col img[data-v-5322a9b3] { width:166px; height:166px; -o-object-fit:cover; object-fit:cover;\n}\n.byCate .con .row .list .col p[data-v-5322a9b3] { margin:9px 0 0 0; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; height:42px; font-size:14px;\n}\r\n\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_style_index_0_id_5322a9b3_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_style_index_0_id_5322a9b3_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_style_index_0_id_5322a9b3_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/vue-accordion/dist/vue-accordion.js":
/*!**********************************************************!*\
  !*** ./node_modules/vue-accordion/dist/vue-accordion.js ***!
  \**********************************************************/
/***/ (function(module) {

!function(e,t){if(true)module.exports=t();else { var r, n; }}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=6)}([function(e,t){function n(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var i=r(o);return[n].concat(o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"})).concat([i]).join("\n")}return[n].join("\n")}function r(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var s=e[o];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(e,t){e.exports=function(e,t,n,r,o){var i,s=e=e||{},a=typeof e.default;"object"!==a&&"function"!==a||(i=e,s=e.default);var l="function"==typeof s?s.options:s;t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns),r&&(l._scopeId=r);var u;if(o?(u=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},l._ssrRegister=u):n&&(u=n),u){var c=l.functional,d=c?l.render:l.beforeCreate;c?l.render=function(e,t){return u.call(t),d(e,t)}:l.beforeCreate=d?[].concat(d,u):[u]}return{esModule:i,exports:s,options:l}}},function(e,t,n){function r(e){for(var t=0;t<e.length;t++){var n=e[t],r=c[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(i(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var s=[],o=0;o<n.parts.length;o++)s.push(i(n.parts[o]));c[n.id]={id:n.id,refs:1,parts:s}}}}function o(){var e=document.createElement("style");return e.type="text/css",d.appendChild(e),e}function i(e){var t,n,r=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(r){if(v)return h;r.parentNode.removeChild(r)}if(y){var i=p++;r=f||(f=o()),t=s.bind(null,r,i,!1),n=s.bind(null,r,i,!0)}else r=o(),t=a.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}function s(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=m(t,o);else{var i=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}function a(e,t){var n=t.css,r=t.media,o=t.sourceMap;if(r&&e.setAttribute("media",r),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u=n(14),c={},d=l&&(document.head||document.getElementsByTagName("head")[0]),f=null,p=0,v=!1,h=function(){},y="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n){v=n;var o=u(e,t);return r(o),function(t){for(var n=[],i=0;i<o.length;i++){var s=o[i],a=c[s.id];a.refs--,n.push(a)}t?(o=u(e,t),r(o)):o=[];for(var i=0;i<n.length;i++){var a=n[i];if(0===a.refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete c[a.id]}}}};var m=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){function r(e){n(13)}var o=n(1)(n(5),n(11),r,null,null);e.exports=o.exports},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{item:{type:Object},styles:{type:Object}},computed:{liStyles:function(){var e={backgroundImage:"url("+this.item.image+")"};return this.styles&&this.styles.li&&Object.assign(e,this.styles.li),e},aStyles:function(){return this.styles&&this.styles.a?this.styles.a:{}},h2Styles:function(){return this.styles&&this.styles.h2?this.styles.h2:{}},pStyles:function(){return this.styles&&this.styles.p?this.styles.p:{}}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(9),o=n.n(r);t.default={name:"vue-accordion",props:{items:{type:Array},styles:{type:Object,default:function(){return{}}},accordionClass:{type:String,default:"vue-accordion"}},computed:{divStyles:function(){return this.styles&&this.styles.div?this.styles.div:{}}},components:{partialAccordion:o.a}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3),o=n.n(r);n.d(t,"vueAccordion",function(){return o.a})},function(e,t,n){t=e.exports=n(0)(void 0),t.push([e.i,".vue-accordion ul li{display:table-cell;width:50%;background-repeat:no-repeat;background-position:50%;transition:all .5s ease}.vue-accordion ul li,.vue-accordion ul li a{vertical-align:bottom;position:relative;height:100%}.vue-accordion ul li a{display:block;width:100%;z-index:3;padding:15px 20px;box-sizing:border-box;color:#fff;text-decoration:none;transition:all .2s ease}.vue-accordion ul li a *{opacity:0;margin:0;width:100%;text-overflow:ellipsis;position:relative;z-index:5;white-space:nowrap;overflow:hidden;-webkit-transform:translateX(-20px);transform:translateX(-20px);-webkit-transition:all .4s ease;transition:all .4s ease}.vue-accordion ul li a h2{text-overflow:clip;font-size:24px;text-transform:uppercase;margin-bottom:2px}.vue-accordion ul li a p{font-size:13.5px}.vue-accordion ul:hover li{width:15%}.vue-accordion ul:hover li:hover{width:60%}.vue-accordion ul:hover li:hover a{background:rgba(0,0,0,.4)}.vue-accordion ul:hover li:hover a *{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}",""])},function(e,t,n){t=e.exports=n(0)(void 0),t.push([e.i,".vue-accordion{width:100%;overflow:hidden;height:200px;max-width:900px}.vue-accordion ul{width:100%;height:100%;display:table;table-layout:fixed;margin:0;padding:0}",""])},function(e,t,n){function r(e){n(12)}var o=n(1)(n(4),n(10),r,null,null);e.exports=o.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{style:e.liStyles},[n("a",{style:e.aStyles,attrs:{href:e.item.url}},[n("h2",{style:e.h2Styles,domProps:{textContent:e._s(e.item.title)}}),e._v(" "),n("p",{style:e.pStyles,domProps:{textContent:e._s(e.item.text)}})])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:e.accordionClass,style:e.divStyles},[n("ul",e._l(e.items,function(t,r){return n("partial-accordion",{key:r,attrs:{item:t,styles:e.styles}})}))])},staticRenderFns:[]}},function(e,t,n){var r=n(7);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(2)("672dc477",r,!0)},function(e,t,n){var r=n(8);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(2)("76735ab6",r,!0)},function(e,t){e.exports=function(e,t){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],s=i[0],a=i[1],l=i[2],u=i[3],c={id:e+":"+o,css:a,media:l,sourceMap:u};r[s]?r[s].parts.push(c):n.push(r[s]={id:s,parts:[c]})}return n}}])});

/***/ }),

/***/ "./resources/js/views/web/Main.vue":
/*!*****************************************!*\
  !*** ./resources/js/views/web/Main.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Main_vue_vue_type_template_id_5322a9b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Main.vue?vue&type=template&id=5322a9b3&scoped=true& */ "./resources/js/views/web/Main.vue?vue&type=template&id=5322a9b3&scoped=true&");
/* harmony import */ var _Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Main.vue?vue&type=script&lang=js& */ "./resources/js/views/web/Main.vue?vue&type=script&lang=js&");
/* harmony import */ var _Main_vue_vue_type_style_index_0_id_5322a9b3_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true& */ "./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Main_vue_vue_type_template_id_5322a9b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Main_vue_vue_type_template_id_5322a9b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5322a9b3",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/Main.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/Main.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/views/web/Main.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Main.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_style_index_0_id_5322a9b3_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/Main.vue?vue&type=template&id=5322a9b3&scoped=true&":
/*!************************************************************************************!*\
  !*** ./resources/js/views/web/Main.vue?vue&type=template&id=5322a9b3&scoped=true& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_5322a9b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_5322a9b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_5322a9b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Main.vue?vue&type=template&id=5322a9b3&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=template&id=5322a9b3&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=template&id=5322a9b3&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=template&id=5322a9b3&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    [
      _c("PopUp"),
      _vm._v(" "),
      _c(
        "b-carousel",
        {
          staticClass: "slide_banner",
          attrs: { controls: "", indicators: "" },
        },
        [
          _c(
            "b-link",
            { attrs: { to: "/board/event/show/31" } },
            [
              _c(
                "b-carousel-slide",
                {
                  attrs: {
                    "img-src": _vm.s3url + "main/slide/2023/23041606.jpg",
                  },
                },
                [
                  _c("a", {
                    staticClass: "split_link",
                    attrs: {
                      href: "https://apps.apple.com/us/app/%ED%8F%AC%EC%82%AC%EC%9D%B4%EC%96%B8%EC%8A%A4/id1632395060?l=ko",
                      id: "app01",
                      target: "_blank",
                    },
                  }),
                  _vm._v(" "),
                  _c("a", {
                    staticClass: "split_link",
                    attrs: {
                      href: "https://play.google.com/store/apps/details?id=four.science.app",
                      id: "app02",
                      target: "_blank",
                    },
                  }),
                ]
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-link",
            { attrs: { to: "/shop/goods/255439" } },
            [
              _c("b-carousel-slide", {
                attrs: {
                  "img-src": _vm.s3url + "main/slide/2023/23041605.jpg",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-link",
            { attrs: { to: "/shop/goods/925" } },
            [
              _c("b-carousel-slide", {
                attrs: {
                  "img-src": _vm.s3url + "main/slide/2023/23041604.jpg",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-link",
            { attrs: { to: "/shop/goods?ca01=45" } },
            [
              _c("b-carousel-slide", {
                attrs: {
                  "img-src": _vm.s3url + "main/slide/2023/23041603.jpg",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-link",
            { attrs: { to: "/shop/goods?ca01=22&ca02=634" } },
            [
              _c("b-carousel-slide", {
                attrs: {
                  "img-src": _vm.s3url + "main/slide/2023/23041602.jpg",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-link",
            { attrs: { to: "/shop/listing/today_pick_up/all" } },
            [
              _c("b-carousel-slide", {
                attrs: {
                  "img-src": _vm.s3url + "main/slide/2023/23041601.jpg",
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
        { staticClass: "layout", attrs: { id: "best" } },
        [
          _c(
            "b-col",
            [_c("b-img", { attrs: { src: _vm.s3url + "main/best.gif" } })],
            1
          ),
          _vm._v(" "),
          _c("b-col", [
            _c(
              "div",
              { staticClass: "box-row" },
              _vm._l(_vm.bestRemodel, function (item, i) {
                return _c(
                  "b-link",
                  {
                    key: i,
                    attrs: {
                      to: { name: "goods_show", params: { gd_id: item.gd_id } },
                    },
                  },
                  [
                    _c("img", { attrs: { src: item.image } }),
                    _vm._v(" "),
                    _c("div", { staticClass: "box-footer" }, [
                      _c("p", { staticClass: "box_ca" }, [
                        _vm._v(_vm._s(item.ca01_name)),
                      ]),
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
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "recommend" },
        [
          _c("div", { staticClass: "back" }),
          _vm._v(" "),
          _c(
            "b-container",
            { staticClass: "layout" },
            [
              _c(
                "b-row",
                [
                  _c("b-col", { staticClass: "tit" }, [
                    _vm._v("포사의 추천 >"),
                  ]),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    { attrs: { col: "", cols: "12", md: "12", lg: "6" } },
                    [
                      _c(
                        "b-link",
                        {
                          attrs: {
                            to: { name: "goods_show", params: { gd_id: 1227 } },
                          },
                        },
                        [
                          _c("b-img", {
                            attrs: { src: _vm.s3url + "main/rec01.png" },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { col: "", cols: "12", md: "6", lg: "3" } },
                    [
                      _c(
                        "b-link",
                        {
                          attrs: {
                            to: {
                              name: "goods_show",
                              params: { gd_id: 46852 },
                            },
                          },
                        },
                        [
                          _c("b-img", {
                            attrs: { src: _vm.s3url + "main/rec02.png" },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { col: "", cols: "12", md: "6", lg: "3" } },
                    [
                      _c(
                        "b-link",
                        {
                          attrs: {
                            to: {
                              name: "goods_index",
                              query: { ca01: "28", ca02: "3481", ca03: "3483" },
                            },
                          },
                        },
                        [
                          _c("b-img", {
                            attrs: { src: _vm.s3url + "main/rec03.png" },
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
                    { attrs: { col: "", cols: "12", md: "6", lg: "3" } },
                    [
                      _c(
                        "b-link",
                        {
                          attrs: {
                            to: { name: "goods_show", params: { gd_id: 7919 } },
                          },
                        },
                        [
                          _c("b-img", {
                            attrs: { src: _vm.s3url + "main/rec04.png" },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { col: "", cols: "12", md: "6", lg: "3" } },
                    [
                      _c(
                        "b-link",
                        {
                          attrs: {
                            to: {
                              name: "goods_index",
                              query: { ca01: "30", ca02: "5042" },
                            },
                          },
                        },
                        [
                          _c("b-img", {
                            attrs: { src: _vm.s3url + "main/rec06.png" },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { col: "", cols: "12", md: "12", lg: "6" } },
                    [
                      _c(
                        "b-link",
                        {
                          attrs: {
                            to: {
                              name: "goods_index",
                              query: { keyword: "goodsgood" },
                            },
                          },
                        },
                        [
                          _c("b-img", {
                            attrs: { src: _vm.s3url + "main/rec05.png" },
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
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "byCate layout" },
        [
          _c(
            "b-row",
            { staticClass: "titByCate" },
            [
              _c("b-col", { attrs: { tag: "h5" } }, [
                _vm._v("카테고리별 추천"),
              ]),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "aside",
            {
              style: {
                position: _vm.cateSideMenuPosition,
                top: _vm.cateSideMenuTop,
                bottom: _vm.cateSideMenuBottom,
              },
            },
            [
              _c(
                "ul",
                _vm._l(_vm.category, function (ca, i) {
                  return _c(
                    "li",
                    {
                      key: ca.ca_id,
                      class: { active: ca.showing },
                      on: {
                        mouseenter: function ($event) {
                          ca.hover = !ca.hover
                        },
                        mouseleave: function ($event) {
                          ca.hover = !ca.hover
                        },
                        click: function ($event) {
                          return _vm.scrollToCate(i)
                        },
                      },
                    },
                    [
                      _c("img", {
                        attrs: {
                          src:
                            ca.hover || ca.showing
                              ? _vm.s3url + "main/cate/" + ca.ca_id + "_.png"
                              : _vm.s3url + "main/cate/" + ca.ca_id + ".png",
                        },
                      }),
                      _vm._v(" "),
                      ca.hover
                        ? _c("span", [_vm._v(_vm._s(ca.ca_name))])
                        : _vm._e(),
                    ]
                  )
                }),
                0
              ),
            ]
          ),
          _vm._v(" "),
          _c(
            "b-container",
            { staticClass: "con" },
            [
              _vm._l(_vm.category, function (ca) {
                return [
                  ca.ca_id != 38
                    ? _c(
                        "b-row",
                        { key: ca.ca_id },
                        [
                          _c(
                            "b-col",
                            { staticClass: "tit" },
                            [
                              _c(
                                "b-link",
                                {
                                  attrs: {
                                    to: {
                                      name: "goods_index",
                                      query: { ca01: ca.ca_id },
                                    },
                                  },
                                },
                                [
                                  _c("b-img", {
                                    attrs: {
                                      src:
                                        _vm.s3url +
                                        "main/cate/bg" +
                                        ca.ca_id +
                                        ".gif",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("h6", [_vm._v(_vm._s(ca.ca_name))]),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    [
                                      _vm._v("전체보기 "),
                                      _c("b-icon-chevron-right"),
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
                            "b-col",
                            { staticClass: "list" },
                            _vm._l(
                              _vm.bestByCategory[ca.ca_id],
                              function (gd, i) {
                                return _c(
                                  "b-link",
                                  {
                                    key: i,
                                    staticClass: "col",
                                    attrs: {
                                      to: {
                                        name: "goods_show",
                                        params: { gd_id: gd.sw_key },
                                      },
                                    },
                                  },
                                  [
                                    _c("b-img", {
                                      attrs: {
                                        fluid: "",
                                        src: gd.goods.image_src_thumb[0],
                                      },
                                    }),
                                    _vm._v(" "),
                                    _c("p", [_vm._v(_vm._s(gd.goods.gd_name))]),
                                  ],
                                  1
                                )
                              }
                            ),
                            1
                          ),
                        ],
                        1
                      )
                    : _vm._e(),
                ]
              }),
            ],
            2
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