"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_admin_shop_estimate_ShowReply_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dt = new Date();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      frm: {
        collect: {
          lists: {},
          price: {}
        },
        estimate_req: {},
        user: {},
        price: {}
      }
    };
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
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/admin/shop/estimate/".concat(_this.$route.params.er_id), {
                  params: {
                    type: 'reply'
                  }
                });

              case 3:
                res = _context.sent;

                if (res && res.status === 200) {
                  _this.frm = res.data;
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
        var rst, frm, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Notify.confirm('삭제', 'danger');

              case 2:
                rst = _context2.sent;

                if (!rst) {
                  _context2.next = 19;
                  break;
                }

                _context2.prev = 4;
                frm = new FormData();
                frm.append("_method", 'DELETE');
                frm.append("type", 'reply');
                _context2.next = 10;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/estimate/".concat(_this2.$route.params.er_id), frm);

              case 10:
                res = _context2.sent;

                if (res && res.status === 200) {
                  Notify.toast('success', '견적서 삭제');

                  _this2.$router.push({
                    name: 'adm_estimate_index'
                  });
                }

                _context2.next = 19;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](4);
                Notify.consolePrint(_context2.t0);
                Notify.toast('danger', '삭제 실패');
                Notify.toast('danger', _context2.t0.response.data.message);

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 14]]);
      }))();
    },
    ///////////////////////////////////////////////////////////////////////////////////////////
    print: function print() {
      var url = "/api/admin/shop/estimate/showEstimate/".concat(this.$route.params.er_id, "/?type=print");
      var name = "견적서 인쇄";
      var option = "width = 900, height = 900, top = 10, left = 10, location = no";
      window.open(url, name, option);
    },
    estimateExcel: function estimateExcel() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/admin/shop/estimate/exportEstimateExcel/".concat(_this3.$route.params.er_id), {
                  responseType: 'blob'
                });

              case 3:
                res = _context3.sent;

                _this3.orderDocumentDown(res, 'Estimate_' + dt.format("yyyyMMdd") + '.xlsx');

                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                Notify.consolePrint(_context3.t0);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }))();
    },
    estimatePdf: function estimatePdf() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/admin/shop/estimate/exportEstimatePdf/".concat(_this4.$route.params.er_id), {
                  responseType: 'blob'
                });

              case 3:
                res = _context4.sent;

                _this4.orderDocumentDown(res, 'Estimate_' + dt.format("yyyyMMdd") + '.pdf');

                _context4.next = 10;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                Notify.consolePrint(_context4.t0);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }))();
    },
    transactionExcel: function transactionExcel() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/admin/shop/estimate/exportTransactionExcel/".concat(_this5.$route.params.er_id), {
                  responseType: 'blob'
                });

              case 3:
                res = _context5.sent;

                _this5.orderDocumentDown(res, 'Transaction_' + dt.format("yyyyMMdd") + '.xlsx');

                _context5.next = 10;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                Notify.consolePrint(_context5.t0);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 7]]);
      }))();
    },
    transactionPdf: function transactionPdf() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/admin/shop/estimate/exportTransactionPdf/".concat(_this6.$route.params.er_id), {
                  responseType: 'blob'
                });

              case 3:
                res = _context6.sent;

                _this6.orderDocumentDown(res, 'Transaction_' + dt.format("yyyyMMdd") + '.pdf');

                _context6.next = 10;
                break;

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](0);
                Notify.consolePrint(_context6.t0);

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 7]]);
      }))();
    },
    orderDocumentDown: function orderDocumentDown(res, fileNm) {
      var fileUrl = window.URL.createObjectURL(new Blob([res.data]));
      var fileLink = document.createElement('a');
      fileLink.href = fileUrl;
      fileLink.setAttribute('download', fileNm);
      document.body.appendChild(fileLink);
      fileLink.click();
    },
    reSend: function reSend() {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/estimate/reSend/".concat(_this7.$route.params.er_id), _this7.frm);

              case 3:
                res = _context7.sent;

                if (res && res.status === 200) {
                  Notify.toast('success', '재발송 완료');
                }

                _context7.next = 10;
                break;

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](0);
                Notify.consolePrint(_context7.t0);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 7]]);
      }))();
    },
    onlineBooks: function onlineBooks() {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _this8.frm.data_type = "EST";
                _context8.next = 4;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/ledger", _this8.frm);

              case 4:
                res = _context8.sent;

                if (res && res.status === 200) {
                  _this8.$router.push({
                    name: 'adm_ledger'
                  });
                } else Notify.toast('warning', '기록 실패');

                _context8.next = 12;
                break;

              case 8:
                _context8.prev = 8;
                _context8.t0 = _context8["catch"](0);
                Notify.consolePrint(_context8.t0);
                Notify.toast('warning', _context8.t0.response);

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 8]]);
      }))();
    },
    passOrder: function passOrder() {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee9() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/order", _this9.frm);

              case 3:
                res = _context9.sent;
                if (res && res.status === 200) _this9.$router.push({
                  name: 'adm_order_index'
                });else Notify.toast('warning', '기록 실패');
                _context9.next = 11;
                break;

              case 7:
                _context9.prev = 7;
                _context9.t0 = _context9["catch"](0);
                Notify.consolePrint(_context9.t0);
                Notify.toast('warning', _context9.t0.response);

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 7]]);
      }))();
    }
  },
  mounted: function mounted() {
    this.show();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=style&index=0&id=ec9c9aa0&lang=css&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=style&index=0&id=ec9c9aa0&lang=css&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n#adm_estimate_show .user_info[data-v-ec9c9aa0] { padding-top:1rem; box-shadow:3px 2px 2px 0px; border:1px solid #EDEDED;\n}\n#adm_estimate_show .user_info .col div[data-v-ec9c9aa0] { margin:1rem;\n}\n#adm_estimate_show .user_info .col div span[data-v-ec9c9aa0] { margin-right:1rem;\n}\n#adm_estimate_show .user_info .col div span>svg[data-v-ec9c9aa0] { margin-right:0.5rem;\n}\n#adm_estimate_show .gd_box .gd_list[data-v-ec9c9aa0]:not(:last-of-type) { border-bottom:1px solid #eee;\n}\n#adm_estimate_show .gd_box .gd_list .col[data-v-ec9c9aa0] { padding-top:10px; padding-bottom:10px;\n}\n#adm_estimate_show .gd_box .gd_list .col .btn[data-v-ec9c9aa0] { margin-right:10px;\n}\n#adm_estimate_show .gd_box .gd_list .col .divider[data-v-ec9c9aa0] { font-size:1.6rem; font-weight:bold; color:#b81717; padding:0 5px; position:relative; top:3px; line-height:14px;\n}\n#adm_estimate_show .gd_box .gd_list i[data-v-ec9c9aa0] { text-align:right;\n}\n#adm_estimate_show .gd_box .gd_list .col .multi[data-v-ec9c9aa0] { min-width:6rem; display:inline-block;\n}\n#adm_estimate_show .gd_box .gd_list>.col[data-v-ec9c9aa0]:nth-child(2),\r\n#adm_estimate_show .gd_box .gd_list .opc .row div[data-v-ec9c9aa0] { background-color:#7fffd454;\n}\n#adm_estimate_show .gd_box .gd_list .opc[data-v-ec9c9aa0] { border-top:1px solid #eee;\n}\n#adm_estimate_show .gd_box .gd_list .col[data-v-ec9c9aa0]:nth-child(2),\r\n#adm_estimate_show .gd_box .gd_list .col[data-v-ec9c9aa0]:nth-child(3) { flex:0 0 25%; max-width:25%;\n}\n#adm_estimate_show .price_info .row .col span[data-v-ec9c9aa0] { display:inline-block; min-width:10rem; font-weight:bold; color:#C10000; font-size:1.3rem;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=style&index=0&id=ec9c9aa0&lang=css&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=style&index=0&id=ec9c9aa0&lang=css&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowReply_vue_vue_type_style_index_0_id_ec9c9aa0_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ShowReply.vue?vue&type=style&index=0&id=ec9c9aa0&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=style&index=0&id=ec9c9aa0&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowReply_vue_vue_type_style_index_0_id_ec9c9aa0_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowReply_vue_vue_type_style_index_0_id_ec9c9aa0_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/admin/shop/estimate/ShowReply.vue":
/*!**************************************************************!*\
  !*** ./resources/js/views/admin/shop/estimate/ShowReply.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ShowReply_vue_vue_type_template_id_ec9c9aa0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShowReply.vue?vue&type=template&id=ec9c9aa0&scoped=true& */ "./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=template&id=ec9c9aa0&scoped=true&");
/* harmony import */ var _ShowReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShowReply.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=script&lang=js&");
/* harmony import */ var _ShowReply_vue_vue_type_style_index_0_id_ec9c9aa0_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShowReply.vue?vue&type=style&index=0&id=ec9c9aa0&lang=css&scoped=true& */ "./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=style&index=0&id=ec9c9aa0&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ShowReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ShowReply_vue_vue_type_template_id_ec9c9aa0_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _ShowReply_vue_vue_type_template_id_ec9c9aa0_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "ec9c9aa0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/shop/estimate/ShowReply.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ShowReply.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=style&index=0&id=ec9c9aa0&lang=css&scoped=true&":
/*!***********************************************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=style&index=0&id=ec9c9aa0&lang=css&scoped=true& ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowReply_vue_vue_type_style_index_0_id_ec9c9aa0_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ShowReply.vue?vue&type=style&index=0&id=ec9c9aa0&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=style&index=0&id=ec9c9aa0&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=template&id=ec9c9aa0&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=template&id=ec9c9aa0&scoped=true& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowReply_vue_vue_type_template_id_ec9c9aa0_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowReply_vue_vue_type_template_id_ec9c9aa0_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowReply_vue_vue_type_template_id_ec9c9aa0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ShowReply.vue?vue&type=template&id=ec9c9aa0&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=template&id=ec9c9aa0&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=template&id=ec9c9aa0&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/estimate/ShowReply.vue?vue&type=template&id=ec9c9aa0&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "p_wrap", attrs: { id: "adm_estimate_show" } },
    [
      _c("h3", { staticClass: "p_tit" }, [_vm._v("견적 응답")]),
      _vm._v(" "),
      _c(
        "b-card",
        { staticClass: "ctrl", attrs: { "no-body": "" } },
        [
          _c(
            "b-container",
            [
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    [
                      _c(
                        "b-button-group",
                        { attrs: { size: "sm" } },
                        [
                          _c(
                            "b-button",
                            { attrs: { to: { name: "adm_estimate_index" } } },
                            [_c("b-icon-list-ul"), _vm._v(" 목록")],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-dropdown",
                            {
                              attrs: {
                                size: "sm",
                                text: "파일 출력",
                                variant: "warning",
                              },
                            },
                            [
                              _c(
                                "b-dropdown-item-button",
                                {
                                  attrs: { variant: "success" },
                                  on: { click: _vm.estimateExcel },
                                },
                                [
                                  _vm._v("견적서 "),
                                  _c("b-badge", [_vm._v("EXCEL")]),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-dropdown-item-button",
                                {
                                  attrs: { variant: "warning" },
                                  on: { click: _vm.estimatePdf },
                                },
                                [
                                  _vm._v("견적서 "),
                                  _c("b-badge", [_vm._v("PDF")]),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("b-dropdown-divider"),
                              _vm._v(" "),
                              _c(
                                "b-dropdown-item-button",
                                {
                                  attrs: { variant: "success" },
                                  on: { click: _vm.transactionExcel },
                                },
                                [
                                  _vm._v("거래명세서 "),
                                  _c("b-badge", [_vm._v("EXCEL")]),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-dropdown-item-button",
                                {
                                  attrs: { variant: "warning" },
                                  on: { click: _vm.transactionPdf },
                                },
                                [
                                  _vm._v("거래명세서 "),
                                  _c("b-badge", [_vm._v("PDF")]),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-button",
                            {
                              attrs: { variant: "dark" },
                              on: { click: _vm.print },
                            },
                            [_vm._v("인쇄")]
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
                    { staticClass: "text-right" },
                    [
                      _c(
                        "b-button-group",
                        { attrs: { size: "sm" } },
                        [
                          _c(
                            "b-button",
                            {
                              attrs: { variant: "dark" },
                              on: { click: _vm.passOrder },
                            },
                            [
                              _c("b-icon-box-arrow-up-right"),
                              _vm._v(" 임의주문"),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-button",
                            {
                              attrs: { variant: "primary" },
                              on: { click: _vm.reSend },
                            },
                            [_c("b-icon-mailbox"), _vm._v(" 재발송")],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-button",
                            {
                              attrs: {
                                variant: "success",
                                to: {
                                  name: "adm_estimate_create",
                                  query: {
                                    eq_id: _vm.frm.estimate_req.eq_id,
                                    er_id: _vm.$route.params.er_id,
                                  },
                                },
                              },
                            },
                            [_c("b-icon-pencil-square"), _vm._v(" 재작성")],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-button",
                            {
                              attrs: {
                                variant: "warning",
                                to: {
                                  name: "adm_estimate_edit",
                                  params: { er_id: _vm.$route.params.er_id },
                                },
                              },
                            },
                            [_c("b-icon-tools"), _vm._v(" 수정")],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-button",
                            {
                              attrs: { variant: "danger" },
                              on: { click: _vm.destroy },
                            },
                            [_c("b-icon-trash-fill"), _vm._v(" 삭제")],
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
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-alert",
        {
          staticClass: "container user_info mt-4",
          attrs: { show: "", variant: "primary" },
        },
        [
          _c("h4", { staticClass: "alert-heading" }, [_vm._v("요청자")]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c(
            "b-row",
            [
              _c("b-col", [
                _c("div", [
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "요청번호" },
                    },
                    [
                      _c("font-awesome-icon", { attrs: { icon: "tags" } }),
                      _vm._v(_vm._s(_vm.frm.estimate_req.eq_id)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "요청일" },
                    },
                    [
                      _c("b-icon-calendar-date"),
                      _vm._v(_vm._s(_vm.frm.estimate_req.created_at)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "요청단계" },
                    },
                    [
                      _c("b-icon-bar-chart-steps"),
                      _vm._v(" "),
                      _vm.frm.estimate_req.eq_step === "DONOT"
                        ? [_vm._v("미처리")]
                        : _vm.frm.estimate_req.eq_step === "DOING"
                        ? [_vm._v("처리중")]
                        : _vm.frm.estimate_req.eq_step === "DONE"
                        ? [_vm._v("완료")]
                        : _vm.frm.estimate_req.eq_step === "CANCEL"
                        ? [_vm._v("취소")]
                        : _vm._e(),
                    ],
                    2
                  ),
                ]),
                _vm._v(" "),
                _c("div", [
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "요청자" },
                    },
                    [
                      _c("font-awesome-icon", { attrs: { icon: "user" } }),
                      _vm._v(
                        "\n                        " +
                          _vm._s(_vm.frm.estimate_req.eq_name) +
                          "\n                        "
                      ),
                      _vm.frm.estimate_req.created_id
                        ? _c(
                            "b-button",
                            {
                              attrs: { variant: "outline-primary", size: "xm" },
                              on: {
                                click: function ($event) {
                                  return _vm.openWinPop(
                                    "/admin/user/" +
                                      _vm.frm.estimate_req.created_id +
                                      "/edit",
                                    1700,
                                    900
                                  )
                                },
                              },
                            },
                            [_c("b-icon-link45deg")],
                            1
                          )
                        : _vm._e(),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "요청자 소속" },
                    },
                    [
                      _c("font-awesome-icon", { attrs: { icon: "users" } }),
                      _vm._v(_vm._s(_vm.frm.estimate_req.eq_department)),
                    ],
                    1
                  ),
                ]),
                _vm._v(" "),
                _c("div", [
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "전화번호" },
                    },
                    [
                      _c("font-awesome-icon", { attrs: { icon: "phone" } }),
                      _vm._v(_vm._s(_vm.frm.estimate_req.eq_tel)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "핸드폰" },
                    },
                    [
                      _c("font-awesome-icon", {
                        attrs: { icon: "mobile-alt" },
                      }),
                      _vm._v(_vm._s(_vm.frm.estimate_req.eq_hp)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "팩스" },
                    },
                    [
                      _c("font-awesome-icon", { attrs: { icon: "fax" } }),
                      _vm._v(_vm._s(_vm.frm.estimate_req.eq_fax)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "이메일" },
                    },
                    [
                      _c("font-awesome-icon", { attrs: { icon: "at" } }),
                      _vm._v(_vm._s(_vm.frm.estimate_req.eq_email)),
                    ],
                    1
                  ),
                ]),
                _vm._v(" "),
                _c("div", [
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "내용" },
                    },
                    [
                      _c("font-awesome-icon", {
                        attrs: { icon: "comment-dots" },
                      }),
                      _vm._v(" "),
                      _c("p", {
                        domProps: {
                          innerHTML: _vm._s(
                            _vm.nl2br(_vm.frm.estimate_req.eq_content)
                          ),
                        },
                      }),
                    ],
                    1
                  ),
                ]),
              ]),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-alert",
        {
          staticClass: "container user_info",
          attrs: { show: "", variant: "info" },
        },
        [
          _c("h4", { staticClass: "alert-heading" }, [_vm._v("견적 정보")]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c(
            "b-row",
            [
              _c("b-col", [
                _c("div", [
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "견적번호" },
                    },
                    [
                      _c("font-awesome-icon", { attrs: { icon: "tags" } }),
                      _vm._v(_vm._s(_vm.frm.er_id)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "견적일" },
                    },
                    [
                      _c("b-icon-calendar-date"),
                      _vm._v(_vm._s(_vm.frm.created_at)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "납품기일" },
                    },
                    [
                      _c("font-awesome-icon", {
                        attrs: { icon: "dolly-flatbed" },
                      }),
                      _vm._v(_vm._s(_vm.frm.er_dlvy_at)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "견적서 유효기간" },
                    },
                    [
                      _c("b-icon-stopwatch-fill"),
                      _vm._v(_vm._s(_vm.frm.er_effective_at)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.frm.er_step === 0
                    ? _c(
                        "span",
                        [_c("b-icon-bar-chart-steps"), _vm._v(" 임시저장")],
                        1
                      )
                    : _vm._e(),
                ]),
                _vm._v(" "),
                _c("div", [
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "담당자" },
                    },
                    [
                      _c("font-awesome-icon", { attrs: { icon: "user" } }),
                      _vm._v(_vm._s(_vm.frm.user.name)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "전화번호" },
                    },
                    [
                      _c("font-awesome-icon", { attrs: { icon: "phone" } }),
                      _vm._v(_vm._s(_vm.frm.user.tel)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "이메일" },
                    },
                    [
                      _c("font-awesome-icon", { attrs: { icon: "at" } }),
                      _vm._v(_vm._s(_vm.frm.user.email)),
                    ],
                    1
                  ),
                ]),
                _vm._v(" "),
                _c("div", [
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip.hover",
                          modifiers: { hover: true },
                        },
                      ],
                      attrs: { title: "내용" },
                    },
                    [
                      _c("font-awesome-icon", {
                        attrs: { icon: "comment-dots" },
                      }),
                      _vm._v(" "),
                      _c("p", {
                        domProps: {
                          innerHTML: _vm._s(_vm.nl2br(_vm.frm.er_content)),
                        },
                      }),
                    ],
                    1
                  ),
                ]),
                _vm._v(" "),
                _vm.frm.file_info && _vm.frm.file_info.length
                  ? _c("div", [
                      _c(
                        "span",
                        [
                          _c("b-icon", {
                            attrs: { icon: "file-earmark-arrow-down-fill" },
                          }),
                          _vm._v(" "),
                          _vm._l(_vm.frm.file_info, function (file, i) {
                            return [
                              _c(
                                "b-button",
                                {
                                  key: i,
                                  staticClass: "mr-2",
                                  attrs: {
                                    size: "sm",
                                    variant: "outline-info",
                                  },
                                  on: {
                                    click: function ($event) {
                                      return _vm.fileDown(
                                        file.down_path,
                                        file.fi_original
                                      )
                                    },
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(file.fi_original) +
                                      "\n                            "
                                  ),
                                ]
                              ),
                            ]
                          }),
                        ],
                        2
                      ),
                    ])
                  : _vm._e(),
              ]),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _vm.frm.estimate_model && _vm.frm.estimate_model.length
        ? _c(
            "b-card",
            { staticClass: "gd_box" },
            [
              _c("div", { staticClass: "tit" }, [_vm._v("견적 상품")]),
              _vm._v(" "),
              _vm._l(_vm.frm.collect.lists, function (pa, pa_i) {
                return _c(
                  "b-container",
                  { key: "pa_" + pa_i },
                  [
                    _c(
                      "h5",
                      [
                        pa_i > 0
                          ? [
                              _vm._v(_vm._s(pa[0].pa_name) + " "),
                              _c("b", [_vm._v("직배송 상품")]),
                            ]
                          : [_vm._v("4SCIENCE")],
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _vm._l(pa, function (em) {
                      return _c(
                        "b-row",
                        { key: em.em_id },
                        [
                          em.type == "model"
                            ? [
                                _c(
                                  "b-col",
                                  [
                                    _c(
                                      "b-button",
                                      {
                                        attrs: { variant: "outline-primary" },
                                        on: {
                                          click: function ($event) {
                                            return _vm.openWinPop(
                                              "/admin/shop/goods/" +
                                                em.gd_id +
                                                "/edit",
                                              1700,
                                              900
                                            )
                                          },
                                        },
                                      },
                                      [_c("b-icon-link45deg")],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("b", { staticClass: "gd_name" }, [
                                      _vm._v(_vm._s(em.gm_name)),
                                    ]),
                                    _vm._v(" "),
                                    _c("b", { staticClass: "divider" }, [
                                      _vm._v("/"),
                                    ]),
                                    _vm._v(
                                      "\n                        " +
                                        _vm._s(em.gm_code) +
                                        "\n                        "
                                    ),
                                    _c("b", { staticClass: "divider" }, [
                                      _vm._v("/"),
                                    ]),
                                    _vm._v(
                                      "\n                        " +
                                        _vm._s(em.gm_catno) +
                                        "\n                        "
                                    ),
                                    _c("b", { staticClass: "divider" }, [
                                      _vm._v("/"),
                                    ]),
                                    _vm._v(
                                      "\n                        " +
                                        _vm._s(em.mk_name) +
                                        "\n                        "
                                    ),
                                    _c("b", { staticClass: "divider" }, [
                                      _vm._v("/"),
                                    ]),
                                    _vm._v(
                                      "\n                        " +
                                        _vm._s(em.gm_unit) +
                                        "\n                    "
                                    ),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("b-col", [_vm._v(_vm._s(em.gm_spec))]),
                                _vm._v(" "),
                                _c(
                                  "b-col",
                                  { attrs: { tag: "i" } },
                                  [
                                    _vm._v(
                                      "\n                        " +
                                        _vm._s(_vm._f("comma")(em.price)) +
                                        " 원 "
                                    ),
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "times" },
                                    }),
                                    _vm._v(
                                      "\n                        " +
                                        _vm._s(_vm._f("comma")(em.ea)) +
                                        " 개 "
                                    ),
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "equals" },
                                    }),
                                    _vm._v(" "),
                                    _c("b", { staticClass: "multi" }, [
                                      _vm._v(
                                        _vm._s(
                                          _vm._f("comma")(em.price * em.ea)
                                        ) + " 원"
                                      ),
                                    ]),
                                  ],
                                  1
                                ),
                              ]
                            : em.type == "option"
                            ? [
                                _c("b-col", { attrs: { offset: "6" } }, [
                                  _vm._v(
                                    _vm._s(em.go_name) +
                                      ": " +
                                      _vm._s(em.goc_name)
                                  ),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "b-col",
                                  { attrs: { tag: "i" } },
                                  [
                                    _vm._v(
                                      "\n                        " +
                                        _vm._s(_vm._f("comma")(em.price)) +
                                        " 원 "
                                    ),
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "times" },
                                    }),
                                    _vm._v(
                                      "\n                        " +
                                        _vm._s(_vm._f("comma")(em.ea)) +
                                        " 개 "
                                    ),
                                    _c("font-awesome-icon", {
                                      attrs: { icon: "equals" },
                                    }),
                                    _vm._v(" "),
                                    _c("b", { staticClass: "multi" }, [
                                      _vm._v(
                                        _vm._s(
                                          _vm._f("comma")(em.price * em.ea)
                                        ) + " 원"
                                      ),
                                    ]),
                                  ],
                                  1
                                ),
                              ]
                            : _vm._e(),
                        ],
                        2
                      )
                    }),
                  ],
                  2
                )
              }),
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "b-alert",
        {
          staticClass: "container price_info",
          attrs: { show: "", variant: "dark" },
        },
        [
          _c(
            "b-row",
            [
              _c("b-col", { staticClass: "text-right" }, [
                _c("div", [
                  _vm._v("합계: "),
                  _c("span", [
                    _vm._v(_vm._s(_vm._f("comma")(_vm.frm.er_gd_price))),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", [
                  _vm._v("부가세: "),
                  _c("span", [
                    _vm._v(_vm._s(_vm._f("comma")(_vm.frm.er_surtax))),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", [
                  _vm._v("배송료: "),
                  _c("span", [
                    _vm._v(_vm._s(_vm._f("comma")(_vm.frm.er_dlvy_price))),
                  ]),
                ]),
                _vm._v(" "),
                _vm.frm.er_air_price
                  ? _c("div", [
                      _vm._v("항공운임료: "),
                      _c("span", [
                        _vm._v(_vm._s(_vm._f("comma")(_vm.frm.er_air_price))),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", [
                  _vm._v("최종 결제금액: "),
                  _c("span", [
                    _vm._v(_vm._s(_vm._f("comma")(_vm.frm.er_all_price))),
                  ]),
                ]),
              ]),
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