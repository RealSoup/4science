"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web_board_Show_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Show.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Show.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/http */ "./resources/js/api/http.js");
/* harmony import */ var _components_Comment_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Comment.vue */ "./resources/js/views/web/board/components/Comment.vue");


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
//
//
//
//
//
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
  name: 'BoardShow',
  components: {
    Comment: _components_Comment_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      board: {
        config: {}
      },
      bo_cd: this.$route.params.bo_cd,
      bo_id: this.$route.params.bo_id
    };
  },
  computed: {
    getLink: function getLink() {
      return this.$route.name == 'my_bo_show' ? 'my_' : '';
    }
  },
  methods: {
    show: function show() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/board/".concat(_this.bo_cd, "/show/").concat(_this.bo_id));

              case 3:
                res = _context.sent;

                if (res && res.status === 200) {
                  _this.board = res.data;
                }

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
    destroy: function destroy() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var isok, frm, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return Notify.confirm('삭제', 'danger');

              case 3:
                isok = _context2.sent;

                if (!isok) {
                  _context2.next = 11;
                  break;
                }

                frm = new FormData();
                frm.append("_method", 'DELETE');
                _context2.next = 9;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/board/".concat(_this2.bo_cd, "/destroy/").concat(_this2.bo_id), frm);

              case 9:
                res = _context2.sent;
                if (res && res.status === 200) _this2.$router.push({
                  name: 'bo_index',
                  params: {
                    bo_cd: _this2.bo_cd
                  }
                });

              case 11:
                _context2.next = 17;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                Notify.consolePrint(_context2.t0);
                Notify.toast('warning', _context2.t0.response.data.message);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 13]]);
      }))();
    }
  },
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    // console.log(to, from);
    this.bo_id = to.params.bo_id;
    this.show();
    next();
  },
  mounted: function mounted() {
    this.show();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/components/Comment.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/components/Comment.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'Comment',
  components: {
    'CommentFormGroup': function CommentFormGroup() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_board_components_CommentFormGroup_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./CommentFormGroup.vue */ "./resources/js/views/web/board/components/CommentFormGroup.vue"));
    }
  },
  props: ['bo_cd', 'bo_id'],
  data: function data() {
    return {
      sltIndex: -1,
      bo_co_list: [],
      comment_mode: 'create'
    };
  },
  methods: {
    index: function index(targetId) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/board/".concat(_this.bo_cd, "/indexComment/").concat(_this.bo_id));

              case 3:
                res = _context.sent;

                if (res.status === 200) {
                  _this.bo_co_list = res.data; // if (!!targetId)
                  //     this.$nextTick(function () {
                  //         document.getElementById(targetId).scrollIntoView({ behavior: 'smooth'});
                  //     });
                }

                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0.response);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    coWrite: function coWrite(idx) {
      this.sltIndex = idx;
      this.comment_mode = 'reCreate';
      this.$nextTick(function () {
        this.$refs.commentFormGroup[0].textAreaFocus();
      }); // this.$refs.commentFormGroup[idx].setBoContent('create');
    },
    coUadate: function coUadate(idx) {
      this.sltIndex = idx;
      this.comment_mode = 'reEdit';
      this.$nextTick(function () {
        this.$refs.commentFormGroup[0].textAreaFocus();
      });
    },
    isDestroy: function isDestroy(bo_id) {
      var _this2 = this;

      this.$bvModal.msgBoxConfirm("삭제 하시겠습니까?", Object.assign({
        title: '삭제 확인 안내'
      }, this.ConfirmModal)).then(function (value) {
        if (value) _this2.coDestroy(bo_id);
      })["catch"](function (err) {
        /* An error occurred */
      });
    },
    coDestroy: function coDestroy(bo_id) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var frm, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                frm = new FormData();
                frm.append("_method", 'DELETE');
                _context2.next = 5;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/board/".concat(_this3.bo_cd, "/destroy/").concat(bo_id), frm);

              case 5:
                res = _context2.sent;

                if (res && res.status === 200) {
                  Notify.toast('success', '댓글 삭제');

                  _this3.index();
                }

                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);

                if (_context2.t0.response.status === 500) {
                  _this3.makeAlert(_context2.t0.response.data);
                } else {
                  console.error('Failure!');
                  console.error(_context2.t0.response.status);
                }

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }))();
    },
    hideCommentForm: function hideCommentForm() {
      this.sltIndex = -1;
      this.comment_mode = 'create';
    },
    goodBad: function goodBad(bo_id, type, idx) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var msg, warning, rst, rstMsg;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                msg = '';
                warning = '';
                _context3.next = 5;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/board/".concat(_this4.bo_cd, "/goodBad/").concat(bo_id, "/").concat(type));

              case 5:
                rst = _context3.sent;
                rstMsg = rst.data;

                if (rst !== false) {
                  if (rstMsg === 'success') {
                    if (type == 'GOOD') msg = "추천 적용";else msg = "비추천 적용";
                    Notify.toast('success', msg);

                    _this4.goodBadArrUpdate(type, idx, 'up');
                  } else {
                    if (rstMsg == "already") {
                      warning = "취소시 지급된 포인트도 함께 취소됩니다. ";
                    } else if (rstMsg == "reverse") {
                      if (type == 'GOOD') warning = "비추천을 추천으로 ";else warning = "추천을 비추천으로 ";
                    }

                    _this4.$bvModal.msgBoxConfirm(warning + "수정하겠습니까?", Object.assign({
                      title: '추천/비추천 안내'
                    }, _this4.ConfirmModal)).then(function (value) {
                      if (value) _this4.reGoodBad(bo_id, rstMsg, type, idx);
                    })["catch"](function (err) {
                      /* An error occurred */
                    });
                  }
                }

                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                Notify.consolePrint(_context3.t0);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10]]);
      }))();
    },
    reGoodBad: function reGoodBad(bo_id, rstMsg, type, idx) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var rst;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/board/".concat(_this5.bo_cd, "/goodBad/").concat(bo_id, "/").concat(rstMsg));

              case 2:
                rst = _context4.sent;

                if (rst.status === 200) {
                  if (rstMsg == "already") {
                    _this5.goodBadArrUpdate(type, idx, 'down');
                  } else if (rstMsg == "reverse") {
                    if (type == 'GOOD') {
                      _this5.goodBadArrUpdate(type, idx, 'up');

                      _this5.goodBadArrUpdate('BAD', idx, 'down');
                    } else {
                      _this5.goodBadArrUpdate(type, idx, 'up');

                      _this5.goodBadArrUpdate('GOOD', idx, 'down');
                    }
                  }
                }

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    goodBadArrUpdate: function goodBadArrUpdate(type, idx, updown) {
      if (type == 'GOOD') {
        if (updown == 'up') this.bo_co_list[idx].bo_good++;else this.bo_co_list[idx].bo_good--;
      } else {
        if (updown == 'up') this.bo_co_list[idx].bo_bad++;else this.bo_co_list[idx].bo_bad--;
      }
    },
    calcPl: function calcPl(dp) {
      return (dp.length - 1) * 30;
    }
  },
  mounted: function mounted() {
    this.index();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Show.vue?vue&type=style&index=0&media=screen&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Show.vue?vue&type=style&index=0&media=screen&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n#bo_show h3 { margin:2rem 0 1rem 0;\n}\n#bo_show .bd_info { line-height:1.4rem;\n}\n#bo_show .bd_info li { margin-right:1.5rem;\n}\n#bo_show .bd_info .add_file { margin-left:24px;\n}\n#bo_show .bd_info .add_file i { margin:0 3px 0 -24px;\n}\n#bo_show .bd_info .add_file .piece { color:#FFF; background-color:#888; margin-right:1rem; letter-spacing:-1px; border:1px dashed #CCC; border-radius:0.3rem; padding:0.1rem 0.3rem; cursor:pointer;\n}\n#bo_show .con { margin-bottom:3rem; line-height:1.5rem;\n}\n#bo_show .con img { max-width: 100%;\n}\n#bo_show .con .answer { background:#eceaeb; border-radius:10px; margin-top:1rem; padding:1rem 2.5rem;\n}\n#bo_show .con .answer h6{ color:#fa931d; font-size:1.2rem; font-weight:700; margin:1.5rem 0;\n}\n#bo_show .con .answer .date { margin-top:4rem;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/components/Comment.vue?vue&type=style&index=0&id=c9df442e&lang=css&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/components/Comment.vue?vue&type=style&index=0&id=c9df442e&lang=css&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n#bo_show #comment h5[data-v-c9df442e] { margin:2rem 0;\n}\n#bo_show #comment>ul>li[data-v-c9df442e] { border-bottom:1px solid #CCC; margin-bottom:1rem; padding-bottom:1rem;\n}\n#bo_show #comment>ul>li .bo_content[data-v-c9df442e] { margin:1rem auto;\n}\n#bo_show #comment>ul>li .bo_content p img[data-v-c9df442e] { max-width: 100%;\n}\r\n/*#bo_show #comment .box_co { display:none; }\r\n#bo_show #comment .box_co.active { display:block; }*/\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Show.vue?vue&type=style&index=0&media=screen&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Show.vue?vue&type=style&index=0&media=screen&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Show.vue?vue&type=style&index=0&media=screen&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Show.vue?vue&type=style&index=0&media=screen&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/components/Comment.vue?vue&type=style&index=0&id=c9df442e&lang=css&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/components/Comment.vue?vue&type=style&index=0&id=c9df442e&lang=css&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_c9df442e_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comment.vue?vue&type=style&index=0&id=c9df442e&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/components/Comment.vue?vue&type=style&index=0&id=c9df442e&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_c9df442e_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_c9df442e_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/board/Show.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/web/board/Show.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Show_vue_vue_type_template_id_d90f8f00___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Show.vue?vue&type=template&id=d90f8f00& */ "./resources/js/views/web/board/Show.vue?vue&type=template&id=d90f8f00&");
/* harmony import */ var _Show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Show.vue?vue&type=script&lang=js& */ "./resources/js/views/web/board/Show.vue?vue&type=script&lang=js&");
/* harmony import */ var _Show_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Show.vue?vue&type=style&index=0&media=screen&lang=css& */ "./resources/js/views/web/board/Show.vue?vue&type=style&index=0&media=screen&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Show_vue_vue_type_template_id_d90f8f00___WEBPACK_IMPORTED_MODULE_0__.render,
  _Show_vue_vue_type_template_id_d90f8f00___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/board/Show.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/board/components/Comment.vue":
/*!*************************************************************!*\
  !*** ./resources/js/views/web/board/components/Comment.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Comment_vue_vue_type_template_id_c9df442e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Comment.vue?vue&type=template&id=c9df442e&scoped=true& */ "./resources/js/views/web/board/components/Comment.vue?vue&type=template&id=c9df442e&scoped=true&");
/* harmony import */ var _Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comment.vue?vue&type=script&lang=js& */ "./resources/js/views/web/board/components/Comment.vue?vue&type=script&lang=js&");
/* harmony import */ var _Comment_vue_vue_type_style_index_0_id_c9df442e_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Comment.vue?vue&type=style&index=0&id=c9df442e&lang=css&scoped=true& */ "./resources/js/views/web/board/components/Comment.vue?vue&type=style&index=0&id=c9df442e&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Comment_vue_vue_type_template_id_c9df442e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Comment_vue_vue_type_template_id_c9df442e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "c9df442e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/board/components/Comment.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/board/Show.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/views/web/board/Show.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Show.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Show.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/board/components/Comment.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/views/web/board/components/Comment.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/components/Comment.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/board/Show.vue?vue&type=style&index=0&media=screen&lang=css&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/views/web/board/Show.vue?vue&type=style&index=0&media=screen&lang=css& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Show.vue?vue&type=style&index=0&media=screen&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Show.vue?vue&type=style&index=0&media=screen&lang=css&");


/***/ }),

/***/ "./resources/js/views/web/board/components/Comment.vue?vue&type=style&index=0&id=c9df442e&lang=css&scoped=true&":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/views/web/board/components/Comment.vue?vue&type=style&index=0&id=c9df442e&lang=css&scoped=true& ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_c9df442e_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comment.vue?vue&type=style&index=0&id=c9df442e&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/components/Comment.vue?vue&type=style&index=0&id=c9df442e&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/board/Show.vue?vue&type=template&id=d90f8f00&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/web/board/Show.vue?vue&type=template&id=d90f8f00& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_template_id_d90f8f00___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_template_id_d90f8f00___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_template_id_d90f8f00___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Show.vue?vue&type=template&id=d90f8f00& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Show.vue?vue&type=template&id=d90f8f00&");


/***/ }),

/***/ "./resources/js/views/web/board/components/Comment.vue?vue&type=template&id=c9df442e&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/views/web/board/components/Comment.vue?vue&type=template&id=c9df442e&scoped=true& ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_c9df442e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_c9df442e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_c9df442e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Comment.vue?vue&type=template&id=c9df442e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/components/Comment.vue?vue&type=template&id=c9df442e&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Show.vue?vue&type=template&id=d90f8f00&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/Show.vue?vue&type=template&id=d90f8f00& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
    { attrs: { id: "bo_show" } },
    [
      _c("h3", [_vm._v(_vm._s(_vm.board.bo_subject))]),
      _vm._v(" "),
      _c("ul", { staticClass: "list-inline bd_info" }, [
        _c(
          "li",
          { staticClass: "list-inline-item" },
          [
            _c("b-icon", { attrs: { icon: "person-fill" } }),
            _vm._v(" " + _vm._s(_vm.board.bo_writer)),
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "li",
          { staticClass: "list-inline-item" },
          [
            _c("b-icon", { attrs: { icon: "calendar-date-fill" } }),
            _vm._v(" " + _vm._s(_vm.board.created_at)),
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "li",
          { staticClass: "list-inline-item" },
          [
            _c("b-icon", { attrs: { icon: "eye-fill" } }),
            _vm._v(" " + _vm._s(_vm.board.bo_click)),
          ],
          1
        ),
        _vm._v(" "),
        _vm.board.add_file && _vm.board.add_file.length
          ? _c(
              "li",
              { staticClass: "list-inline-item add_file" },
              [
                _c("b-icon", {
                  attrs: { icon: "file-earmark-arrow-down-fill" },
                }),
                _vm._v(" "),
                _vm._l(_vm.board.add_file, function (file) {
                  return [
                    _c(
                      "span",
                      {
                        key: file.fi_id,
                        staticClass: "piece",
                        on: {
                          click: function ($event) {
                            return _vm.fileDown(
                              file.down_path,
                              file.fi_original
                            )
                          },
                        },
                      },
                      [_vm._v(_vm._s(file.fi_original))]
                    ),
                  ]
                }),
              ],
              2
            )
          : _vm._e(),
      ]),
      _vm._v(" "),
      _c("hr"),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "con" },
        [
          _vm.board.goods
            ? _c("img", {
                staticClass: "me-auto ms-auto d-block",
                attrs: { src: _vm.board.goods.image_src[0] },
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.board.img_file && _vm.board.img_file.length
            ? [
                _vm._l(_vm.board.img_file, function (image, i) {
                  return _c("img", {
                    key: i,
                    staticClass: "me-auto ms-auto d-block",
                    attrs: { src: image.path },
                  })
                }),
                _vm._v(" "),
                _c("hr"),
              ]
            : _vm._e(),
          _vm._v(" "),
          _c("div", {
            domProps: { innerHTML: _vm._s(_vm.nl2br(_vm.board.bo_content)) },
          }),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _vm.board.answer
            ? _c("div", { staticClass: "answer" }, [
                _c("h6", [_vm._v("A")]),
                _vm._v(" "),
                _c("div", {
                  domProps: {
                    innerHTML: _vm._s(_vm.nl2br(_vm.board.answer.bo_content)),
                  },
                }),
                _vm._v(" "),
                _c("p", { staticClass: "date" }, [
                  _vm._v(
                    _vm._s(_vm._f("formatDate")(_vm.board.answer.created_at))
                  ),
                ]),
              ])
            : _vm._e(),
        ],
        2
      ),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-6" },
          [
            _c(
              "router-link",
              {
                staticClass: "btn btn-sm btn-light",
                attrs: {
                  to: {
                    name: _vm.getLink + "bo_index",
                    params: { bo_cd: _vm.bo_cd },
                  },
                },
              },
              [_vm._v("목록")]
            ),
          ],
          1
        ),
        _vm._v(" "),
        _vm.$parent.isMine(_vm.board.created_id)
          ? _c(
              "div",
              { staticClass: "col-6 text-right" },
              [
                _c(
                  "router-link",
                  {
                    staticClass: "btn btn-sm btn-warning",
                    attrs: {
                      to: {
                        name: "bo_edit",
                        params: { bo_cd: _vm.bo_cd, bo_id: _vm.bo_id },
                      },
                    },
                  },
                  [_vm._v("수정")]
                ),
                _vm._v(" "),
                _c(
                  "b-button",
                  {
                    attrs: { variant: "danger", size: "sm" },
                    on: { click: _vm.destroy },
                  },
                  [_vm._v("삭제")]
                ),
              ],
              1
            )
          : _vm._e(),
      ]),
      _vm._v(" "),
      _vm.board.config.is_comment
        ? _c("Comment", { attrs: { bo_cd: _vm.bo_cd, bo_id: _vm.bo_id } })
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/components/Comment.vue?vue&type=template&id=c9df442e&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/board/components/Comment.vue?vue&type=template&id=c9df442e&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
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
    "article",
    { attrs: { id: "comment" } },
    [
      _c("h5", [
        _vm._v("댓글 "),
        _c("small", [_vm._v(_vm._s(_vm.bo_co_list.length) + "개")]),
      ]),
      _vm._v(" "),
      _vm.bo_co_list && _vm.bo_co_list.length
        ? _c(
            "ul",
            { staticClass: "container" },
            [
              _vm._l(_vm.bo_co_list, function (co, idx) {
                return [
                  _c(
                    "li",
                    {
                      key: co.bo_id,
                      staticClass: "row pillar",
                      style: {
                        paddingLeft: _vm.calcPl(co.bo_co_seq_cd) + "px",
                      },
                      attrs: { id: "comment_" + co.bo_id },
                    },
                    [
                      _c("div", { staticClass: "col-md-6 col-12" }, [
                        _c(
                          "span",
                          [
                            _c("b-icon", { attrs: { icon: "person-fill" } }),
                            _vm._v(" " + _vm._s(co.bo_writer)),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "span",
                          [
                            _c("b-icon", {
                              attrs: { icon: "calendar-date-fill" },
                            }),
                            _vm._v(" " + _vm._s(co.created_at)),
                          ],
                          1
                        ),
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-6 col-12 text-right" },
                        [
                          !_vm.$parent.isMine(co.created_id)
                            ? _c(
                                "b-button",
                                {
                                  attrs: { variant: "success", size: "sm" },
                                  on: {
                                    click: function ($event) {
                                      return _vm.goodBad(co.bo_id, "GOOD", idx)
                                    },
                                  },
                                },
                                [
                                  _c("b-icon", {
                                    attrs: { icon: "hand-thumbs-up" },
                                  }),
                                  _vm._v(" "),
                                  _c("span", [_vm._v(_vm._s(co.bo_good))]),
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          !_vm.$parent.isMine(co.created_id)
                            ? _c(
                                "b-button",
                                {
                                  attrs: { variant: "danger", size: "sm" },
                                  on: {
                                    click: function ($event) {
                                      return _vm.goodBad(co.bo_id, "BAD", idx)
                                    },
                                  },
                                },
                                [
                                  _c("b-icon", {
                                    attrs: { icon: "hand-thumbs-down" },
                                  }),
                                  _vm._v(" "),
                                  _c("span", [_vm._v(_vm._s(co.bo_bad))]),
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "b-button",
                            {
                              attrs: { variant: "secondary", size: "sm" },
                              on: {
                                click: function ($event) {
                                  return _vm.coWrite(idx)
                                },
                              },
                            },
                            [
                              _c("b-icon", {
                                attrs: { icon: "chat-left-dots-fill" },
                              }),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _vm.$parent.isMine(co.created_id)
                            ? [
                                _c(
                                  "b-button",
                                  {
                                    attrs: { variant: "warning", size: "sm" },
                                    on: {
                                      click: function ($event) {
                                        return _vm.coUadate(idx)
                                      },
                                    },
                                  },
                                  [
                                    _c("b-icon", {
                                      attrs: { icon: "scissors" },
                                    }),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-button",
                                  {
                                    attrs: { variant: "danger", size: "sm" },
                                    on: {
                                      click: function ($event) {
                                        return _vm.isDestroy(co.bo_id)
                                      },
                                    },
                                  },
                                  [
                                    _c("b-icon", {
                                      attrs: { icon: "trash-fill" },
                                    }),
                                  ],
                                  1
                                ),
                              ]
                            : _vm._e(),
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-12 bo_content" }, [
                        co.file_info_bo.length
                          ? _c("p", [
                              _c("img", {
                                staticClass: "me-auto ms-auto d-block",
                                attrs: { src: co.file_info_bo[0].src },
                              }),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c("div", {
                          domProps: { innerHTML: _vm._s(co.bo_content) },
                        }),
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-12 box_co" },
                        [
                          idx == _vm.sltIndex
                            ? _c("CommentFormGroup", {
                                ref: "commentFormGroup",
                                refInFor: true,
                                attrs: {
                                  sltIndex: _vm.sltIndex,
                                  bo_cd: _vm.bo_cd,
                                  bo_id: co.bo_id,
                                  prevBo_content: co.bo_content,
                                  comment_mode: _vm.comment_mode,
                                  fi_id: co.file_info_bo.length
                                    ? co.file_info_bo[0].fi_id
                                    : "",
                                },
                                on: {
                                  callIndex: _vm.index,
                                  callHideCommentForm: function ($event) {
                                    return _vm.hideCommentForm()
                                  },
                                },
                              })
                            : _vm._e(),
                        ],
                        1
                      ),
                    ]
                  ),
                ]
              }),
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      -1 == _vm.sltIndex
        ? _c("CommentFormGroup", {
            attrs: {
              sltIndex: _vm.sltIndex,
              bo_cd: _vm.bo_cd,
              bo_id: _vm.bo_id,
              comment_mode: _vm.comment_mode,
            },
            on: { callIndex: _vm.index },
          })
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);