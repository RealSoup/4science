(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_admin_Main_test_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/Main_test.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/Main_test.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
//
//
//
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
      return __webpack_require__.e(/*! import() */ "resources_js_views_web__module_PopUp_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/web/_module/PopUp */ "./resources/js/views/web/_module/PopUp.vue"));
    },
    'SubString': function SubString() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_SubString_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/SubString.vue */ "./resources/js/views/_common/SubString.vue"));
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
      scrollVal: [1690, 2232, 2776, 3317, 3859, 4401, 4943, 5485, 6027, 6569, 7111, 7653, 8195, 8737, 9279, 9821, 10363, 10905, 11447],
      scrollEnd: 11130,
      currentScroll: 0,
      // best:[
      //     { title: 'First', text: 'text', url: '#', image: '/images/one.jpg' },
      // ],
      // styles: {
      //     li: {
      //         backgroundSize:'cover',
      //     },
      // }
      date01: new Date('2023-05-02 00:00'),
      date02: new Date('2023-05-16 23:59'),
      date_now: new Date()
    };
  },
  computed: _objectSpread(_objectSpread({
    bestRemodel: function bestRemodel() {
      var dummy = [];

      for (var i in this.list.best) {
        dummy.push({
          gd_name: this.list.best[i].gd_name,
          ca01_name: this.list.best[i].goods_category_first.gc_ca01_name,
          gd_id: this.list.best[i].gd_id,
          image: this.list.best[i].image_src_thumb[0]
        });
      }

      return dummy;
    }
  }, (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapState)('category', ['category'])), {}, {
    slide_check01: function slide_check01() {
      return this.date01 < this.date_now && this.date_now < this.date02;
    },
    slide_check02: function slide_check02() {
      return this.date02 < this.date_now;
    }
  }),
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
        this.cateSideMenuTop = '153px';
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/Main_test.vue?vue&type=style&index=0&id=5ab51bc9&lang=css&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/Main_test.vue?vue&type=style&index=0&id=5ab51bc9&lang=css&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.slide_banner[data-v-5ab51bc9] { overflow:hidden; max-width: 1920px; margin: auto;\n}\n.slide_banner[data-v-5ab51bc9] .carousel-indicators li { background-color:#898989;\n}\n.slide_banner[data-v-5ab51bc9] .carousel-control-prev:hover,\r\n.slide_banner[data-v-5ab51bc9] .carousel-control-next:hover { background-color:#55888888;\n}\n.slide_banner .split_link[data-v-5ab51bc9] { position:absolute; display: block; width:190px; height:57px; bottom:25px; transform:translateX(-50%);\n}\n.slide_banner a#app01[data-v-5ab51bc9] { left:23%;\n}\n.slide_banner a#app02[data-v-5ab51bc9] { left:77%;}\n#best[data-v-5ab51bc9] { margin-top:26px;\n}\n#best>.col[data-v-5ab51bc9] { padding:0;\n}\n#best>.col[data-v-5ab51bc9]:nth-of-type(1) { flex:0 0 6.933334%; max-width:6.933334%; padding-top:20px;\n}\n#best>.col[data-v-5ab51bc9]:nth-of-type(2) { flex:0 0 93.066666%; max-width:93.066666%;\n}\n#best .col .box-row[data-v-5ab51bc9] { display:flex; justify-content:center; align-items:center; width:100%; height:320px;\n}\n#best .col .box-row a[data-v-5ab51bc9] { position: relative; background-color: #FFFFFF; height:288px; width:220px; margin:10px;\n}\n#best .col .box-row a[data-v-5ab51bc9]:last-of-type { margin-right:0;\n}\n#best .col .box-row a img[data-v-5ab51bc9] { width: 100%; height: 210px; -o-object-fit:contain; object-fit:contain; border: 1px solid #B7B7B7;\n}\n#best .col .box-row a .box-footer[data-v-5ab51bc9] { position:absolute; bottom:0; height:80px; padding:10px 15px;\n}\n#best .col .box-row a .box-footer .box_ca[data-v-5ab51bc9] { color:#1A8FD4; margin-bottom:3px; font-size:.8rem;\n}\n#best .col .box-row a .box-footer .box_tit[data-v-5ab51bc9] { font-weight:bold;\n}\n.recommend .back[data-v-5ab51bc9] { background:#fbcad0; position:absolute; width:100%; height:18.5rem;\n}\n.recommend .container .row[data-v-5ab51bc9]:last-child { margin-top:2rem;\n}\n.recommend .container .row .tit[data-v-5ab51bc9] { color:#FFF; font-style:italic; font-size:1.4rem; font-weight:bold; margin-top:1.9Rem; margin-bottom: .6REM;\n}\n.recommend .container .row .col a[data-v-5ab51bc9] { display:block;\n}\n.recommend .container .row .col a img[data-v-5ab51bc9] { border:1px solid #CCC; border-radius:10px; width:100%;\n}\n.byCate[data-v-5ab51bc9] { position:relative; margin-top:5rem;\n}\n.byCate .titByCate[data-v-5ab51bc9] { margin-bottom:1.5rem;\n}\n.byCate .titByCate h5[data-v-5ab51bc9] { font-style:italic; font-weight:bold; font-size:2rem;\n}\n.byCate aside[data-v-5ab51bc9] { margin-left:-76px; z-index:1;\n}\n.byCate aside ul[data-v-5ab51bc9] { border:1px solid #898989;\n}\n.byCate aside ul li[data-v-5ab51bc9] { padding:4px 6px; cursor:pointer; position:relative;\n}\n.byCate aside ul li.active[data-v-5ab51bc9],\r\n.byCate aside ul li[data-v-5ab51bc9]:hover { background:#448AC8;\n}\n.byCate aside ul li span[data-v-5ab51bc9] { padding-left:10px; background:#448AC8; position:absolute; width:216px; color:#fff; z-index:1; top:0; line-height:44px;\n}\n.byCate .con .row[data-v-5ab51bc9] { border-top:2px solid #4A505C; margin-bottom:2.5rem;\n}\n.byCate .con .row .col[data-v-5ab51bc9] { padding:0;\n}\n.byCate .con .row .tit[data-v-5ab51bc9] { flex:0 0 13.4%; max-width:200px; border-right:1px solid #B1B1B1; border-bottom:1px solid #B1B1B1;\n}\n.byCate .con .row .tit a[data-v-5ab51bc9] { display:block; position:relative; height:100%; padding: 24px 0 0 16px;\n}\n.byCate .con .row .tit a img[data-v-5ab51bc9] { position:absolute; z-index:-1; width:200px; height:500px; -o-object-fit:cover; object-fit:cover; top:0; left:0;\n}\n.byCate .con .row .tit a h6[data-v-5ab51bc9] { font-weight:bold; font-size:1.5rem;\n}\n.byCate .con .row .tit a span[data-v-5ab51bc9] { color:#9FA0A2;\n}\n.byCate .con .row .list[data-v-5ab51bc9] { display:flex; flex-wrap:wrap;\n}\n.byCate .con .row .list .col[data-v-5ab51bc9] { flex:0 0 16.666666%; max-width:16.666666%; padding:16px; text-align:center; border-right:1px solid #B1B1B1; border-bottom:1px solid #B1B1B1;\n}\n.byCate .con .row .list .col img[data-v-5ab51bc9] { width:166px; height:166px; -o-object-fit:contain; object-fit:contain;\n}\n.byCate .con .row .list .col p[data-v-5ab51bc9] { margin:9px 0 0 0; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; height:42px; font-size:14px;\n}\n@media (max-width: 992px){\n.slide_banner[data-v-5ab51bc9] .carousel-inner { left:50%; transform:translateX(-50%); width:900px;\n}\n#best[data-v-5ab51bc9] { flex-direction: column; margin-top: 10px;\n}\n#best>.col[data-v-5ab51bc9]:nth-of-type(1) { padding:0;\n}\n#best>.col[data-v-5ab51bc9]:nth-of-type(2) { flex:0 0 100%; max-width:100%;\n}\n#best .col .box-row[data-v-5ab51bc9] { flex-wrap:wrap; height:auto;\n}\n#best .col .box-row a[data-v-5ab51bc9] { flex:0 0 33.333334%; max-width:33.333334%; height:180px; margin:0; padding:10px;\n}\n#best .col .box-row a img[data-v-5ab51bc9] { height:110px;\n}\n#best .col .box-row a .box-footer[data-v-5ab51bc9] { padding: 0 5px; position: static; height: auto; line-height: 1;}\n#best .col .box-row a .box-footer .box_ca[data-v-5ab51bc9] { font-size: calc(.3vw + .5rem);\n}\n#best .col .box-row a .box-footer .box_tit[data-v-5ab51bc9] { font-size: calc(.3vw + .7rem);\n}\n.recommend .container .row:nth-of-type(2) .col-md-6[data-v-5ab51bc9],\r\n    .recommend .container .row[data-v-5ab51bc9]:last-child,\r\n    .recommend .container .row:last-child .col-md-12[data-v-5ab51bc9]  { margin-top:.5rem;\n}\n.byCate .titByCate[data-v-5ab51bc9] { margin:0;\n}\n.byCate .con .row[data-v-5ab51bc9] { flex-direction:column; margin-bottom:1rem;\n}\n.byCate .con .row .tit[data-v-5ab51bc9] { max-width: 100%;\n}\n.byCate .con .row .tit a[data-v-5ab51bc9] { padding: 8px 0 0 8px;\n}\n.byCate .con .row .tit a img[data-v-5ab51bc9] { display:none;\n}\n.byCate .con .row .tit a h6[data-v-5ab51bc9] { display:inline-block;\n}\n.byCate .con .row .list .col[data-v-5ab51bc9] { padding:5px; flex: 0 0 25%; max-width: 25%;\n}\n.byCate .con .row .list .col img[data-v-5ab51bc9] { width:100%; height:80px;\n}\n.byCate .con .row .list .col p[data-v-5ab51bc9] { font-size: calc(.3vw + .7rem); margin:0; height:auto;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/Main_test.vue?vue&type=style&index=0&id=5ab51bc9&lang=css&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/Main_test.vue?vue&type=style&index=0&id=5ab51bc9&lang=css&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_test_vue_vue_type_style_index_0_id_5ab51bc9_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Main_test.vue?vue&type=style&index=0&id=5ab51bc9&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/Main_test.vue?vue&type=style&index=0&id=5ab51bc9&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_test_vue_vue_type_style_index_0_id_5ab51bc9_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_test_vue_vue_type_style_index_0_id_5ab51bc9_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/vue-accordion/dist/vue-accordion.js":
/*!**********************************************************!*\
  !*** ./node_modules/vue-accordion/dist/vue-accordion.js ***!
  \**********************************************************/
/***/ (() => {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\WorkSpace\\vsCode\\4science\\node_modules\\vue-accordion\\dist\\vue-accordion.js'");

/***/ }),

/***/ "./node_modules/vue-kinesis/dist/vue-kinesis.esm.js":
/*!**********************************************************!*\
  !*** ./node_modules/vue-kinesis/dist/vue-kinesis.esm.js ***!
  \**********************************************************/
/***/ (() => {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\WorkSpace\\vsCode\\4science\\node_modules\\vue-kinesis\\dist\\vue-kinesis.esm.js'");

/***/ }),

/***/ "./resources/js/views/admin/Main_test.vue":
/*!************************************************!*\
  !*** ./resources/js/views/admin/Main_test.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Main_test_vue_vue_type_template_id_5ab51bc9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Main_test.vue?vue&type=template&id=5ab51bc9&scoped=true& */ "./resources/js/views/admin/Main_test.vue?vue&type=template&id=5ab51bc9&scoped=true&");
/* harmony import */ var _Main_test_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Main_test.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/Main_test.vue?vue&type=script&lang=js&");
/* harmony import */ var _Main_test_vue_vue_type_style_index_0_id_5ab51bc9_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Main_test.vue?vue&type=style&index=0&id=5ab51bc9&lang=css&scoped=true& */ "./resources/js/views/admin/Main_test.vue?vue&type=style&index=0&id=5ab51bc9&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Main_test_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Main_test_vue_vue_type_template_id_5ab51bc9_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Main_test_vue_vue_type_template_id_5ab51bc9_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5ab51bc9",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/Main_test.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/Main_test.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/admin/Main_test.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_test_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Main_test.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/Main_test.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_test_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/Main_test.vue?vue&type=style&index=0&id=5ab51bc9&lang=css&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/views/admin/Main_test.vue?vue&type=style&index=0&id=5ab51bc9&lang=css&scoped=true& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_test_vue_vue_type_style_index_0_id_5ab51bc9_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Main_test.vue?vue&type=style&index=0&id=5ab51bc9&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/Main_test.vue?vue&type=style&index=0&id=5ab51bc9&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/admin/Main_test.vue?vue&type=template&id=5ab51bc9&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/views/admin/Main_test.vue?vue&type=template&id=5ab51bc9&scoped=true& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_test_vue_vue_type_template_id_5ab51bc9_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_test_vue_vue_type_template_id_5ab51bc9_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_test_vue_vue_type_template_id_5ab51bc9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Main_test.vue?vue&type=template&id=5ab51bc9&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/Main_test.vue?vue&type=template&id=5ab51bc9&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/Main_test.vue?vue&type=template&id=5ab51bc9&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/Main_test.vue?vue&type=template&id=5ab51bc9&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
          _vm.slide_check01
            ? _c(
                "b-link",
                { attrs: { to: "/shop/goods?ca01=32&ca02=5439" } },
                [
                  _c("b-carousel-slide", {
                    attrs: {
                      "img-src": _vm.s3url + "event/2023/0425/slide02.jpg",
                    },
                  }),
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "b-link",
            { attrs: { to: "/board/event/show/36" } },
            [
              _c("b-carousel-slide", {
                attrs: { "img-src": _vm.s3url + "main/slide/2023/230418.jpg" },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _vm.slide_check02
            ? _c(
                "b-link",
                { attrs: { to: "/shop/goods?ca01=32&ca02=5439" } },
                [
                  _c("b-carousel-slide", {
                    attrs: {
                      "img-src": _vm.s3url + "event/2023/0425/slide02.jpg",
                    },
                  }),
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
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
            { attrs: { to: "/shop/goods?ca01=33&ca02=5619" } },
            [
              _c("b-carousel-slide", {
                attrs: { "img-src": _vm.s3url + "event/2023/0425/slide.jpg" },
              }),
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
                    _c(
                      "div",
                      { staticClass: "box-footer" },
                      [
                        _c("SubString", {
                          staticClass: "box_ca",
                          attrs: { width: 184 },
                          model: {
                            value: item.ca01_name,
                            callback: function ($$v) {
                              _vm.$set(item, "ca01_name", $$v)
                            },
                            expression: "item.ca01_name",
                          },
                        }),
                        _vm._v(" "),
                        _c("SubString", {
                          staticClass: "box_tit",
                          attrs: { width: 184, line02: true },
                          model: {
                            value: item.gd_name,
                            callback: function ($$v) {
                              _vm.$set(item, "gd_name", $$v)
                            },
                            expression: "item.gd_name",
                          },
                        }),
                      ],
                      1
                    ),
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
                    { attrs: { col: "", cols: "6", md: "6", lg: "3" } },
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
                    { attrs: { col: "", cols: "6", md: "6", lg: "3" } },
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
                    { attrs: { col: "", cols: "6", md: "6", lg: "3" } },
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
                    { attrs: { col: "", cols: "6", md: "6", lg: "3" } },
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
                [
                  _vm._l(_vm.category, function (ca, i) {
                    return [
                      ca.ca_id != 38
                        ? _c(
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
                                      ? _vm.s3url +
                                        "main/cate/" +
                                        ca.ca_id +
                                        "_.png"
                                      : _vm.s3url +
                                        "main/cate/" +
                                        ca.ca_id +
                                        ".png",
                                },
                              }),
                              _vm._v(" "),
                              ca.hover
                                ? _c("span", [_vm._v(_vm._s(ca.ca_name))])
                                : _vm._e(),
                            ]
                          )
                        : _vm._e(),
                    ]
                  }),
                ],
                2
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