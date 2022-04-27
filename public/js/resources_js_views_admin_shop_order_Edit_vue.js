"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_admin_shop_order_Edit_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/http */ "./resources/js/api/http.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/router */ "./resources/js/router/index.js");


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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'edit',
  components: {
    'Modal': function Modal() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_Modal_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/Modal.vue */ "./resources/js/views/_common/Modal.vue"));
    }
  },
  data: function data() {
    return {
      isModalViewed: false,
      od: {
        order_extra_info: {},
        pa_list: {
          price: {}
        }
      }
    };
  },
  computed: {
    payPlanDisplay: function payPlanDisplay() {
      var plan = this.od.order_extra_info.oex_pay_plan;
      var returnMsg = '';
      if (plan == 'soon') returnMsg = '선';else if (plan == 'week1') returnMsg = '1주이내';else if (plan == 'week2') returnMsg = '2주이내';else if (plan == 'month1') returnMsg = '한달이내';else if (plan == 'month2') returnMsg = '2개월이내';
      return returnMsg;
    }
  },
  methods: {
    edit: function edit() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/admin/shop/order/".concat(_this.$route.params.od_id, "/edit"));

              case 3:
                res = _context.sent;

                if (res && res.status === 200) {
                  _this.od = res.data;
                  _this.loaded = true;
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
    update: function update(type) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _this2.od = Object.assign({}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                _this2.od, // 수정하려는 객체
                {
                  _method: 'PATCH',
                  type: type
                } // 삽입하려는 내용
                );

                if (type == 'od_mng') {
                  _this2.od.od_mng = Auth.user().id;
                  _this2.od.od_mng_nm = Auth.user().name;
                }

                _context2.next = 5;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/order/".concat(_this2.$route.params.od_id), _this2.od);

              case 5:
                res = _context2.sent;

                if (res && res.status === 200 && res.data.msg === 'success') {
                  if (type == 'od_mng') {
                    Notify.toast('success', '담당 배정 완료');
                  } else if (type == 'od_step') {
                    Notify.toast('success', '주문 처리 단계 수정');
                  }
                } else Notify.toast('warning', '수정 실패');

                _context2.next = 13;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                Notify.consolePrint(_context2.t0);
                Notify.toast('warning', _context2.t0.response);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }))();
    },
    fileDown: function fileDown(name, src) {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var res, fileUrl, fileLink;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get(src, {
                  responseType: 'blob'
                });

              case 3:
                res = _context3.sent;
                fileUrl = window.URL.createObjectURL(new Blob([res.data]));
                fileLink = document.createElement('a');
                fileLink.href = fileUrl;
                fileLink.setAttribute('download', name);
                document.body.appendChild(fileLink);
                fileLink.click(); // console.log(res.data);

                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](0);
                Notify.consolePrint(_context3.t0);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 12]]);
      }))();
    },
    print: function print() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this3.$htmlToPaper('print_area', {
                  styles: ['https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css', '/css/fontawesome_svg.css', '/css/adm_shop_order_edit.css']
                });

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    estimateExcel: function estimateExcel() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;

                _this4.mngChk();

                _context5.next = 4;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/admin/shop/order/exportEstimateExcel/".concat(_this4.$route.params.od_id), {
                  responseType: 'blob'
                });

              case 4:
                res = _context5.sent;

                _this4.orderDocumentDown(res, 'Estimate_' + dt.format("yyyyMMdd") + '.xlsx');

                _context5.next = 11;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);
                Notify.consolePrint(_context5.t0);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 8]]);
      }))();
    },
    estimatePdf: function estimatePdf() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;

                _this5.mngChk();

                _context6.next = 4;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/admin/shop/order/exportEstimatePdf/".concat(_this5.$route.params.od_id), {
                  responseType: 'blob'
                });

              case 4:
                res = _context6.sent;

                _this5.orderDocumentDown(res, 'Estimate_' + dt.format("yyyyMMdd") + '.pdf');

                _context6.next = 11;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](0);
                Notify.consolePrint(_context6.t0);

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 8]]);
      }))();
    },
    transactionExcel: function transactionExcel() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;

                _this6.mngChk();

                _context7.next = 4;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/admin/shop/order/exportTransactionExcel/".concat(_this6.$route.params.od_id), {
                  responseType: 'blob'
                });

              case 4:
                res = _context7.sent;

                _this6.orderDocumentDown(res, 'Transaction_' + dt.format("yyyyMMdd") + '.xlsx');

                _context7.next = 11;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](0);
                Notify.consolePrint(_context7.t0);

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 8]]);
      }))();
    },
    transactionPdf: function transactionPdf() {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;

                _this7.mngChk();

                _context8.next = 4;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/admin/shop/order/exportTransactionPdf/".concat(_this7.$route.params.od_id), {
                  responseType: 'blob'
                });

              case 4:
                res = _context8.sent;

                _this7.orderDocumentDown(res, 'Transaction_' + dt.format("yyyyMMdd") + '.pdf');

                _context8.next = 11;
                break;

              case 8:
                _context8.prev = 8;
                _context8.t0 = _context8["catch"](0);
                Notify.consolePrint(_context8.t0);

              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 8]]);
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
    mngChk: function mngChk() {
      if (!this.od.od_mng) {
        Notify.modal('담당자 배정 이후에 사용가능합니다.');
        return false;
      }
    },
    onlineBooks: function onlineBooks() {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee9() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _this8.od.data_type = "ORD";
                _context9.next = 4;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/ledger", _this8.od);

              case 4:
                res = _context9.sent;

                if (res && res.status === 200) {
                  _this8.$router.push({
                    name: 'adm_ledger'
                  });
                } else Notify.toast('warning', '기록 실패');

                _context9.next = 12;
                break;

              case 8:
                _context9.prev = 8;
                _context9.t0 = _context9["catch"](0);
                Notify.consolePrint(_context9.t0);
                Notify.toast('warning', _context9.t0.response);

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 8]]);
      }))();
    }
  },
  mounted: function mounted() {
    this.edit();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&media=screen&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&media=screen&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n/* @import '/css/adm_shop_order_edit.css';*/\n#adm_order_edit .badge { font-size:100%;\n}\n#adm_order_edit .od_header { padding:0.3rem 15px; z-index:999;\n}\n#adm_order_edit .od_header span { margin-right:1rem;\n}\n#adm_order_edit .od_header span.badge { margin-right:2rem;\n}\n#adm_order_edit .od_header span svg { margin-right:0.5rem;\n}\n.actionArea { position:-webkit-sticky; position:sticky; top:0; z-index:1021;\n}\n.actionArea .input-group { position:absolute; top:2px; right:0; max-width:690px;\n}\n@media (max-width: 992px) {\n.actionArea { position:static;\n}\n.actionArea .input-group { position:static; max-width:none;\n}\n}\n#adm_order_edit .order_goods_info .gd_info .goods a { margin-right:1rem;\n}\n#adm_order_edit .order_goods_info .gd_info .goods a img { /*width:60px; height:60px; object-fit:cover;*/ max-width:100px;\n}\n#adm_order_edit .order_goods_info .gd_info .goods div { display:inline-block;\n}\n#adm_order_edit .order_goods_info .gd_info .model .model_info b { margin:0 0.8rem;\n}\n#adm_order_edit .order_goods_info .gd_info .model .model_price .md_multi { min-width:6rem; display:inline-block;\n}\n#adm_order_edit .order_goods_info .gd_info .option .option_price .opc_multi { min-width:6rem; display:inline-block;\n}\n#adm_order_edit .order_goods_info .final_price p b,\r\n#adm_order_edit .order_goods_info .gd_total_price b { min-width:6rem; display:inline-block;\n}\n#adm_order_edit .receiver_info .col>.badge + span { margin-right:2rem;\n}\n#adm_order_edit .receiver_info .col>.badge + span b { font-size:2rem;\n}\n#adm_order_edit .receiver_info .col .fade-enter-active,\r\n#adm_order_edit .receiver_info .col .fade-leave-active { transition: opacity .001s;\n}\n#adm_order_edit .receiver_info .col .fade-enter,\r\n#adm_order_edit .receiver_info .col .fade-leave-to { opacity: 0;\n}\n#adm_order_edit .receiver_info .rs_modal-card { max-width:800px; text-align:center; overflow-y:scroll;\n}\r\n\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&media=screen&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&media=screen&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&media=screen&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&media=screen&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/admin/shop/order/Edit.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/admin/shop/order/Edit.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_ca63be56___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=ca63be56& */ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js&");
/* harmony import */ var _Edit_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Edit.vue?vue&type=style&index=0&media=screen&lang=css& */ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&media=screen&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_ca63be56___WEBPACK_IMPORTED_MODULE_0__.render,
  _Edit_vue_vue_type_template_id_ca63be56___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/shop/order/Edit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&media=screen&lang=css&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&media=screen&lang=css& ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_media_screen_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&media=screen&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&media=screen&lang=css&");


/***/ }),

/***/ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_ca63be56___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_ca63be56___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_ca63be56___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=ca63be56& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _c(
      "div",
      { staticClass: "actionArea" },
      [
        _c(
          "b-input-group",
          { attrs: { size: "sm" } },
          [
            _c(
              "b-input-group-prepend",
              { staticClass: "bg-light btn_group" },
              [
                _c(
                  "b-button",
                  {
                    attrs: {
                      to: { name: "adm_order_index" },
                      variant: "outline-secondary",
                    },
                  },
                  [_vm._v("목록")]
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
                      [_vm._v("견적서 "), _c("b-badge", [_vm._v("EXCEL")])],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "b-dropdown-item-button",
                      {
                        attrs: { variant: "warning" },
                        on: { click: _vm.estimatePdf },
                      },
                      [_vm._v("견적서 "), _c("b-badge", [_vm._v("PDF")])],
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
                      [_vm._v("거래명세서 "), _c("b-badge", [_vm._v("EXCEL")])],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "b-dropdown-item-button",
                      {
                        attrs: { variant: "warning" },
                        on: { click: _vm.transactionPdf },
                      },
                      [_vm._v("거래명세서 "), _c("b-badge", [_vm._v("PDF")])],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-button",
                  {
                    attrs: { variant: "info" },
                    on: { click: _vm.onlineBooks },
                  },
                  [_c("b-icon-journal-bookmark-fill"), _vm._v(" 장부기록")],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-button",
                  { attrs: { variant: "dark" }, on: { click: _vm.print } },
                  [_vm._v("인쇄")]
                ),
                _vm._v(" "),
                _vm.od.od_mng < 1
                  ? _c(
                      "b-button",
                      {
                        on: {
                          click: function ($event) {
                            return _vm.update("od_mng")
                          },
                        },
                      },
                      [_vm._v("담당")]
                    )
                  : _c("b-button", [_vm._v(_vm._s(_vm.od.od_mng_nm))]),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "b-form-select",
              {
                model: {
                  value: _vm.od.od_step,
                  callback: function ($$v) {
                    _vm.$set(_vm.od, "od_step", $$v)
                  },
                  expression: "od.od_step",
                },
              },
              [
                _c(
                  "b-form-select-option",
                  { attrs: { value: null, disabled: "" } },
                  [_vm._v("◖주문 처리 단계◗")]
                ),
                _vm._v(" "),
                _c("b-form-select-option", { attrs: { value: "10" } }, [
                  _vm._v("주문접수"),
                ]),
                _vm._v(" "),
                _c(
                  "b-form-select-option-group",
                  { attrs: { label: "---- 주문 수정 옵션 ----" } },
                  [
                    _c("b-form-select-option", { attrs: { value: "11" } }, [
                      _vm._v("승인대기"),
                    ]),
                    _vm._v(" "),
                    _c("b-form-select-option", { attrs: { value: "12" } }, [
                      _vm._v("결제대기"),
                    ]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("b-form-select-option", { attrs: { value: "20" } }, [
                  _vm._v("결제완료"),
                ]),
                _vm._v(" "),
                _c(
                  "b-form-select-option-group",
                  { attrs: { label: "---- 배송 옵션 ----" } },
                  [
                    _c("b-form-select-option", { attrs: { value: "30" } }, [
                      _vm._v("배송준비"),
                    ]),
                    _vm._v(" "),
                    _c("b-form-select-option", { attrs: { value: "31" } }, [
                      _vm._v("배송중"),
                    ]),
                    _vm._v(" "),
                    _c("b-form-select-option", { attrs: { value: "32" } }, [
                      _vm._v("배송완료"),
                    ]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("b-form-select-option", { attrs: { value: "40" } }, [
                  _vm._v("구매확정"),
                ]),
                _vm._v(" "),
                _c(
                  "b-form-select-option-group",
                  { attrs: { label: "---- 주문 실패 옵션 ----" } },
                  [
                    _c("b-form-select-option", { attrs: { value: "50" } }, [
                      _vm._v("주문취소"),
                    ]),
                    _vm._v(" "),
                    _c("b-form-select-option", { attrs: { value: "51" } }, [
                      _vm._v("결제실패"),
                    ]),
                  ],
                  1
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "b-input-group-append",
              [
                _c(
                  "b-button",
                  {
                    on: {
                      click: function ($event) {
                        return _vm.update("od_step")
                      },
                    },
                  },
                  [_vm._v("변경")]
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
    _c("div", { attrs: { id: "print_area" } }, [
      _c(
        "div",
        { attrs: { id: "adm_order_edit" } },
        [
          _c(
            "b-card",
            {
              staticClass: "shadow mt-3 od_header sticky-top",
              attrs: { "no-body": "" },
            },
            [
              _c(
                "div",
                [
                  _c("b-badge", [_vm._v(_vm._s(_vm.od.od_id) + ".")]),
                  _vm._v(" "),
                  _c(
                    "span",
                    [
                      _c("font-awesome-icon", { attrs: { icon: "tags" } }),
                      _vm._v(_vm._s(_vm.od.od_no)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    [
                      _c("font-awesome-icon", { attrs: { icon: "clock" } }),
                      _vm._v(_vm._s(_vm._f("formatDate")(_vm.od.created_at))),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    [
                      _c("font-awesome-icon", { attrs: { icon: "user" } }),
                      _vm._v(_vm._s(_vm.od.od_orderer)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    [
                      _c("font-awesome-icon", { attrs: { icon: "phone" } }),
                      _vm._v(_vm._s(_vm.od.od_orderer_hp)),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    [
                      _c("font-awesome-icon", { attrs: { icon: "at" } }),
                      _vm._v(_vm._s(_vm.od.od_orderer_email)),
                    ],
                    1
                  ),
                ],
                1
              ),
            ]
          ),
          _vm._v(" "),
          _c(
            "b-card",
            {
              staticClass: "shadow mt-3 order_goods_info",
              attrs: { "header-tag": "header", "footer-tag": "footer" },
              scopedSlots: _vm._u([
                {
                  key: "header",
                  fn: function () {
                    return [_c("b", [_vm._v("주문 상품")])]
                  },
                  proxy: true,
                },
                {
                  key: "footer",
                  fn: function () {
                    return [
                      _c(
                        "b-container",
                        { attrs: { fluid: "" } },
                        [
                          _c(
                            "b-row",
                            [
                              _c("b-col", { attrs: { cols: "6" } }, [
                                _c("h5", [_c("b", [_vm._v("총 금액")])]),
                              ]),
                              _vm._v(" "),
                              _c(
                                "b-col",
                                {
                                  staticClass: "text-right final_price",
                                  attrs: { cols: "6" },
                                },
                                [
                                  _c("p", [
                                    _vm._v("상품 : "),
                                    _c("b", [
                                      _vm._v(
                                        _vm._s(
                                          _vm._f("comma")(_vm.od.od_gd_price)
                                        ) + " 원"
                                      ),
                                    ]),
                                  ]),
                                  _vm._v(" "),
                                  _c("p", [
                                    _vm._v("배송비 : "),
                                    _c("b", [
                                      _vm._v(
                                        _vm._s(
                                          _vm._f("comma")(_vm.od.od_dlvy_price)
                                        ) + " 원"
                                      ),
                                    ]),
                                  ]),
                                  _vm._v(" "),
                                  _vm.od.od_air_price
                                    ? _c("p", [
                                        _vm._v("항공운임료 : "),
                                        _c("b", [
                                          _vm._v(
                                            _vm._s(
                                              _vm._f("comma")(
                                                _vm.od.od_air_price
                                              )
                                            ) + " 원"
                                          ),
                                        ]),
                                      ])
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c("p", [
                                    _vm._v("총금액 : "),
                                    _c("b", [
                                      _vm._v(
                                        _vm._s(
                                          _vm._f("comma")(_vm.od.od_all_price)
                                        ) + " 원"
                                      ),
                                    ]),
                                  ]),
                                ]
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ]
                  },
                  proxy: true,
                },
              ]),
            },
            [
              _vm._v(" "),
              _vm._l(_vm.od.pa_list.lists, function (pa, pa_id, idx) {
                return _c(
                  "b-alert",
                  {
                    key: "pa_id_" + pa_id,
                    attrs: {
                      show: "",
                      variant: idx % 2 === 0 ? "success" : "info",
                    },
                  },
                  [
                    _c("h5", [
                      _c("b", [
                        _vm._v(
                          _vm._s(
                            pa.list[0].purchase_at
                              ? pa.list[0].purchase_at.pa_name
                              : "4SCIENCE"
                          )
                        ),
                      ]),
                      _vm._v(" 직배송 상품"),
                    ]),
                    _vm._v(" "),
                    _vm._l(pa.list, function (gd, gd_idx) {
                      return _c(
                        "b-container",
                        {
                          key: "pa_id_" + pa_id + "gd_idx_" + gd_idx,
                          attrs: { fluid: "" },
                        },
                        [
                          gd_idx != 0
                            ? _c("b-row", [_c("b-col", [_c("hr")])], 1)
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "b-row",
                            { staticClass: "gd_info" },
                            [
                              _c(
                                "b-col",
                                { staticClass: "goods", attrs: { cols: "3" } },
                                [
                                  _c(
                                    "b-link",
                                    {
                                      attrs: {
                                        to: {
                                          name: "adm_goods_edit",
                                          params: { gd_id: gd.gd_id },
                                        },
                                      },
                                    },
                                    [
                                      _c("img", {
                                        attrs: { src: gd.image_src_thumb[0] },
                                      }),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("div", [
                                    _c("b", [_vm._v(_vm._s(gd.gd_name))]),
                                    _vm._v(
                                      "\r\n                                    " +
                                        _vm._s(gd.maker.mk_name) +
                                        "\r\n                                "
                                    ),
                                  ]),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-col",
                                [
                                  _vm._l(gd.goods_model, function (gm, gm_idx) {
                                    return _c(
                                      "b-container",
                                      {
                                        key:
                                          "pa_id_" +
                                          pa_id +
                                          "gd_idx_" +
                                          gd_idx +
                                          "gm_idx_" +
                                          gm_idx,
                                        attrs: { fluid: "" },
                                      },
                                      [
                                        _c(
                                          "b-row",
                                          { staticClass: "model mb-2" },
                                          [
                                            _c(
                                              "b-col",
                                              {
                                                staticClass: "model_info",
                                                attrs: { xl: "8", lg: "6" },
                                              },
                                              [
                                                _vm._v(
                                                  "\r\n                                            " +
                                                    _vm._s(gm.gm_name) +
                                                    "\r\n                                            "
                                                ),
                                                _c("b", [
                                                  _vm._v(_vm._s(gm.gm_code)),
                                                ]),
                                                _vm._v(
                                                  "\r\n                                            [" +
                                                    _vm._s(gm.gm_catno) +
                                                    "]\r\n                                            "
                                                ),
                                                _c("b", [
                                                  _vm._v(_vm._s(gm.gm_spec)),
                                                ]),
                                                _vm._v(
                                                  "\r\n                                            (" +
                                                    _vm._s(gm.gm_unit) +
                                                    ")\r\n                                        "
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "b-col",
                                              {
                                                staticClass:
                                                  "model_price text-right",
                                              },
                                              [
                                                _vm._v(
                                                  "\r\n                                            " +
                                                    _vm._s(
                                                      _vm._f("comma")(
                                                        gm.odm_price_add_vat
                                                      )
                                                    ) +
                                                    " 원\r\n                                            "
                                                ),
                                                _c("font-awesome-icon", {
                                                  attrs: { icon: "times" },
                                                }),
                                                _vm._v(" "),
                                                _vm._v(
                                                  "\r\n                                            " +
                                                    _vm._s(
                                                      _vm._f("comma")(gm.ea)
                                                    ) +
                                                    " 개\r\n                                            "
                                                ),
                                                _c("font-awesome-icon", {
                                                  attrs: { icon: "equals" },
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "b",
                                                  { staticClass: "md_multi" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm._f("comma")(
                                                          gm.odm_price_add_vat *
                                                            gm.ea
                                                        )
                                                      ) + " 원"
                                                    ),
                                                  ]
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
                                  }),
                                  _vm._v(" "),
                                  _vm._l(
                                    gd.option_child,
                                    function (opc, opc_idx) {
                                      return _c(
                                        "b-container",
                                        {
                                          key:
                                            "pa_id_" +
                                            pa_id +
                                            "gd_idx_" +
                                            gd_idx +
                                            "opc_idx_" +
                                            opc_idx,
                                          attrs: { fluid: "" },
                                        },
                                        [
                                          opc_idx == 0
                                            ? _c(
                                                "b-row",
                                                [_c("b-col", [_c("hr")])],
                                                1
                                              )
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _c(
                                            "b-row",
                                            { staticClass: "option mb-2" },
                                            [
                                              _c(
                                                "b-col",
                                                {
                                                  staticClass: "option_info",
                                                  attrs: { cols: "6" },
                                                },
                                                [
                                                  _vm._v(
                                                    "\r\n                                            " +
                                                      _vm._s(
                                                        opc.option.op_name
                                                      ) +
                                                      ": " +
                                                      _vm._s(opc.opc_name) +
                                                      "\r\n                                        "
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "b-col",
                                                {
                                                  staticClass:
                                                    "option_price text-right",
                                                },
                                                [
                                                  _vm._v(
                                                    "\r\n                                            " +
                                                      _vm._s(
                                                        _vm._f("comma")(
                                                          opc.odo_price_add_vat
                                                        )
                                                      ) +
                                                      " 원\r\n                                            "
                                                  ),
                                                  _c("font-awesome-icon", {
                                                    attrs: { icon: "times" },
                                                  }),
                                                  _vm._v(" "),
                                                  _vm._v(
                                                    "\r\n                                            " +
                                                      _vm._s(
                                                        _vm._f("comma")(opc.ea)
                                                      ) +
                                                      " 개\r\n                                            "
                                                  ),
                                                  _c("font-awesome-icon", {
                                                    attrs: { icon: "equals" },
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "b",
                                                    {
                                                      staticClass: "opc_multi",
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm._f("comma")(
                                                            opc.odo_price_add_vat *
                                                              opc.ea
                                                          )
                                                        ) + " 원"
                                                      ),
                                                    ]
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
                                  ),
                                ],
                                2
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      )
                    }),
                    _vm._v(" "),
                    _c(
                      "b-container",
                      { attrs: { fluid: "" } },
                      [
                        _c(
                          "b-row",
                          { attrs: { "align-h": "end" } },
                          [
                            _c(
                              "b-col",
                              {
                                staticClass: "text-right gd_total_price",
                                attrs: { lg: "3", md: "6", sm: "12" },
                              },
                              [
                                _c(
                                  "b-alert",
                                  {
                                    staticClass: "mt-4",
                                    attrs: { show: "", variant: "light" },
                                  },
                                  [
                                    _c("div", [
                                      _vm._v("상품 : "),
                                      _c("b", [
                                        _vm._v(
                                          _vm._s(
                                            _vm._f("comma")(
                                              pa.price.goods_add_vat
                                            )
                                          ) + " 원"
                                        ),
                                      ]),
                                    ]),
                                    _vm._v(" "),
                                    _c("div", [
                                      _vm._v("배송료 : "),
                                      _c("b", [
                                        _vm._v(
                                          _vm._s(
                                            _vm._f("comma")(
                                              pa.price.dlvy_add_vat
                                            )
                                          ) + " 원"
                                        ),
                                      ]),
                                    ]),
                                    _vm._v(" "),
                                    pa.price.air_add_vat
                                      ? _c("div", [
                                          _vm._v("항공운임료 : "),
                                          _c("b", [
                                            _vm._v(
                                              _vm._s(
                                                _vm._f("comma")(
                                                  pa.price.air_add_vat
                                                )
                                              ) + " 원"
                                            ),
                                          ]),
                                        ])
                                      : _vm._e(),
                                  ]
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
                  2
                )
              }),
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "b-card",
            {
              staticClass: "shadow mt-3 receiver_info",
              attrs: {
                "header-tag": "header",
                "header-class": "py-2",
                "body-class": "py-2",
              },
              scopedSlots: _vm._u([
                {
                  key: "header",
                  fn: function () {
                    return [_c("b", [_vm._v("배송 정보 / 결제 정보")])]
                  },
                  proxy: true,
                },
              ]),
            },
            [
              _vm._v(" "),
              _c(
                "b-container",
                { attrs: { fluid: "" } },
                [
                  _c(
                    "b-row",
                    [
                      _c(
                        "b-col",
                        [
                          _c("font-awesome-icon", { attrs: { icon: "user" } }),
                          _vm._v(" "),
                          _c("span", { staticClass: "mr-3" }, [
                            _vm._v(_vm._s(_vm.od.od_receiver)),
                          ]),
                          _vm._v(" "),
                          _c("font-awesome-icon", { attrs: { icon: "phone" } }),
                          _vm._v(" "),
                          _c("span", { staticClass: "mr-3" }, [
                            _vm._v(_vm._s(_vm.od.od_receiver_hp)),
                          ]),
                          _vm._v(" "),
                          _c("font-awesome-icon", {
                            attrs: { icon: "map-marked-alt" },
                          }),
                          _vm._v(" "),
                          _c("span", { staticClass: "mr-3" }, [
                            _vm._v(_vm._s(_vm.od.od_zip)),
                            _c("b", [_vm._v(",")]),
                            _vm._v(" " + _vm._s(_vm.od.od_addr1)),
                            _c("b", [_vm._v(",")]),
                            _vm._v(" " + _vm._s(_vm.od.od_addr2)),
                          ]),
                          _vm._v(" "),
                          _c(
                            "p",
                            [
                              _c("font-awesome-icon", {
                                attrs: { icon: "info" },
                              }),
                              _vm._v(" "),
                              _c("span", [_vm._v(_vm._s(_vm.od.od_memo))]),
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
                  _c("hr"),
                  _vm._v(" "),
                  _c(
                    "b-row",
                    [
                      _c(
                        "b-col",
                        [
                          _c("b-badge", [_vm._v("결제수단")]),
                          _vm._v(" "),
                          _vm.od.od_pay_method == "C"
                            ? _c(
                                "span",
                                [
                                  _c(
                                    "b-badge",
                                    { attrs: { variant: "light" } },
                                    [_vm._v("카드")]
                                  ),
                                ],
                                1
                              )
                            : _vm.od.od_pay_method == "B"
                            ? _c(
                                "span",
                                [
                                  _c(
                                    "b-badge",
                                    { attrs: { variant: "light" } },
                                    [_vm._v("계좌이체")]
                                  ),
                                  _vm._v(" "),
                                  _vm.od.order_extra_info.oex_finance_type ==
                                  "K"
                                    ? _c(
                                        "b-badge",
                                        { attrs: { variant: "light" } },
                                        [_vm._v("국민은행")]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.od.order_extra_info.oex_finance_type ==
                                  "W"
                                    ? _c(
                                        "b-badge",
                                        { attrs: { variant: "light" } },
                                        [_vm._v("우리은행")]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c(
                                    "b-badge",
                                    { attrs: { variant: "light" } },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.od.order_extra_info.oex_depositor
                                        )
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-badge",
                                    { attrs: { variant: "light" } },
                                    [
                                      _vm._v(
                                        _vm._s(_vm.payPlanDisplay) + " 결제"
                                      ),
                                    ]
                                  ),
                                ],
                                1
                              )
                            : _vm.od.od_pay_method == "P"
                            ? _c(
                                "span",
                                [
                                  _c(
                                    "b-badge",
                                    { attrs: { variant: "light" } },
                                    [_vm._v("PSYS")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-badge",
                                    { attrs: { variant: "light" } },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.od.order_extra_info.oex_depositor
                                        )
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-badge",
                                    { attrs: { variant: "light" } },
                                    [
                                      _vm._v(
                                        _vm._s(_vm.payPlanDisplay) + " 결제"
                                      ),
                                    ]
                                  ),
                                ],
                                1
                              )
                            : _vm.od.od_pay_method == "S"
                            ? _c(
                                "span",
                                [
                                  _c(
                                    "b-badge",
                                    { attrs: { variant: "light" } },
                                    [_vm._v("전표")]
                                  ),
                                  _vm._v(" "),
                                  _vm.od.order_extra_info.oex_finance_type ==
                                  "SH"
                                    ? _c(
                                        "b-badge",
                                        { attrs: { variant: "light" } },
                                        [_vm._v("신한")]
                                      )
                                    : _vm.od.order_extra_info
                                        .oex_finance_type == "BC"
                                    ? _c(
                                        "b-badge",
                                        { attrs: { variant: "light" } },
                                        [_vm._v("BC")]
                                      )
                                    : _vm.od.order_extra_info
                                        .oex_finance_type == "SS"
                                    ? _c(
                                        "b-badge",
                                        { attrs: { variant: "light" } },
                                        [_vm._v("삼성")]
                                      )
                                    : _c(
                                        "b-badge",
                                        { attrs: { variant: "light" } },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.od.order_extra_info
                                                .oex_finance_type
                                            )
                                          ),
                                        ]
                                      ),
                                  _vm._v(" "),
                                  _c(
                                    "b-badge",
                                    { attrs: { variant: "light" } },
                                    [
                                      _vm._v(
                                        _vm._s(_vm.payPlanDisplay) + " 결제"
                                      ),
                                    ]
                                  ),
                                ],
                                1
                              )
                            : _vm.od.od_pay_method == "E"
                            ? _c("span", [_vm._v("에스크로")])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("b-badge", [_vm._v("구매환경")]),
                          _vm._v(" "),
                          _vm.od.od_sale_env == "P"
                            ? _c("span", [_vm._v("웹")])
                            : _vm.od.od_sale_env == "M"
                            ? _c("span", [_vm._v("모바일")])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("b-badge", [_vm._v("요청서류")]),
                          _vm._v(" "),
                          _c(
                            "span",
                            [
                              !_vm.od.order_extra_info
                                ? [
                                    _c(
                                      "b-badge",
                                      { attrs: { variant: "warning" } },
                                      [_vm._v("없음")]
                                    ),
                                  ]
                                : [
                                    _vm.od.order_extra_info.oex_req_est == "Y"
                                      ? _c(
                                          "b-badge",
                                          { attrs: { variant: "light" } },
                                          [_vm._v("견적서")]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm.od.order_extra_info.oex_req_tran == "Y"
                                      ? _c(
                                          "b-badge",
                                          { attrs: { variant: "light" } },
                                          [_vm._v("거래명세서")]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm.od.order_extra_info.oex_req_biz == "Y"
                                      ? _c(
                                          "b-badge",
                                          { attrs: { variant: "light" } },
                                          [_vm._v("사업자 등록증 사본")]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm.od.order_extra_info.oex_req_bank == "Y"
                                      ? _c(
                                          "b-badge",
                                          { attrs: { variant: "light" } },
                                          [_vm._v("통장사본")]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm.od.order_extra_info.oex_req_est ==
                                      "N" &&
                                    _vm.od.order_extra_info.oex_req_tran ==
                                      "N" &&
                                    _vm.od.order_extra_info.oex_req_biz ==
                                      "N" &&
                                    _vm.od.order_extra_info.oex_req_bank == "N"
                                      ? _c(
                                          "b-badge",
                                          { attrs: { variant: "warning" } },
                                          [_vm._v("없음")]
                                        )
                                      : _vm._e(),
                                  ],
                            ],
                            2
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("hr"),
                  _vm._v(" "),
                  _vm.od.od_pay_method == "B" || _vm.od.od_pay_method == "E"
                    ? _c(
                        "b-row",
                        [
                          _c(
                            "b-col",
                            { attrs: { cols: "4" } },
                            [
                              _c("b-badge", [_vm._v("지출증빙")]),
                              _vm._v(" "),
                              _vm.od.order_extra_info.oex_type == "IV"
                                ? _c(
                                    "span",
                                    [
                                      _c(
                                        "b-alert",
                                        {
                                          attrs: {
                                            show: "",
                                            variant: "success",
                                          },
                                        },
                                        [
                                          _c(
                                            "h5",
                                            { staticClass: "alert-heading" },
                                            [_vm._v("세금계산서")]
                                          ),
                                          _vm._v(" "),
                                          _vm.od.file_info
                                            ? [
                                                _vm.checkImage(
                                                  _vm.od.file_info.fi_ext
                                                )
                                                  ? [
                                                      _c(
                                                        "b-button",
                                                        {
                                                          on: {
                                                            click: function (
                                                              $event
                                                            ) {
                                                              _vm.isModalViewed =
                                                                !_vm.isModalViewed
                                                            },
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            "사업자 등록증 보기"
                                                          ),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "transition",
                                                        {
                                                          attrs: {
                                                            name: "fade",
                                                          },
                                                        },
                                                        [
                                                          _vm.isModalViewed
                                                            ? _c(
                                                                "Modal",
                                                                {
                                                                  on: {
                                                                    "close-modal":
                                                                      function (
                                                                        $event
                                                                      ) {
                                                                        _vm.isModalViewed = false
                                                                      },
                                                                  },
                                                                },
                                                                [
                                                                  _c("img", {
                                                                    staticStyle:
                                                                      {
                                                                        "max-width":
                                                                          "100%",
                                                                        height:
                                                                          "auto",
                                                                      },
                                                                    attrs: {
                                                                      src: _vm
                                                                        .od
                                                                        .file_info
                                                                        .path,
                                                                    },
                                                                    on: {
                                                                      click:
                                                                        function (
                                                                          $event
                                                                        ) {
                                                                          return _vm.fileDown(
                                                                            _vm
                                                                              .od
                                                                              .file_info
                                                                              .fi_original,
                                                                            _vm
                                                                              .od
                                                                              .file_info
                                                                              .path
                                                                          )
                                                                        },
                                                                    },
                                                                  }),
                                                                ]
                                                              )
                                                            : _vm._e(),
                                                        ],
                                                        1
                                                      ),
                                                    ]
                                                  : [
                                                      _c(
                                                        "b-button",
                                                        {
                                                          on: {
                                                            click: function (
                                                              $event
                                                            ) {
                                                              return _vm.fileDown(
                                                                _vm.od.file_info
                                                                  .fi_original,
                                                                _vm.od.file_info
                                                                  .path
                                                              )
                                                            },
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            "사업자 등록증 다운로드"
                                                          ),
                                                        ]
                                                      ),
                                                    ],
                                              ]
                                            : [
                                                _c(
                                                  "b-badge",
                                                  {
                                                    attrs: { variant: "light" },
                                                  },
                                                  [
                                                    _vm._v(
                                                      "법인명: " +
                                                        _vm._s(
                                                          _vm.od
                                                            .order_extra_info
                                                            .oex_biz_name
                                                        )
                                                    ),
                                                  ]
                                                ),
                                                _c("b", [_vm._v(",")]),
                                                _vm._v(" "),
                                                _c(
                                                  "b-badge",
                                                  {
                                                    attrs: { variant: "light" },
                                                  },
                                                  [
                                                    _vm._v(
                                                      "등록번호: " +
                                                        _vm._s(
                                                          _vm.od
                                                            .order_extra_info
                                                            .oex_biz_num
                                                        )
                                                    ),
                                                  ]
                                                ),
                                                _c("b", [_vm._v(",")]),
                                                _vm._v(" "),
                                                _c(
                                                  "b-badge",
                                                  {
                                                    attrs: { variant: "light" },
                                                  },
                                                  [
                                                    _vm._v(
                                                      "업태: " +
                                                        _vm._s(
                                                          _vm.od
                                                            .order_extra_info
                                                            .oex_biz_type
                                                        )
                                                    ),
                                                  ]
                                                ),
                                                _c("b", [_vm._v(",")]),
                                                _vm._v(" "),
                                                _c(
                                                  "b-badge",
                                                  {
                                                    attrs: { variant: "light" },
                                                  },
                                                  [
                                                    _vm._v(
                                                      "종목: " +
                                                        _vm._s(
                                                          _vm.od
                                                            .order_extra_info
                                                            .oex_biz_item
                                                        )
                                                    ),
                                                  ]
                                                ),
                                                _c("b", [_vm._v(",")]),
                                                _vm._v(" "),
                                                _c(
                                                  "b-badge",
                                                  {
                                                    attrs: { variant: "light" },
                                                  },
                                                  [
                                                    _vm._v(
                                                      "대표자: " +
                                                        _vm._s(
                                                          _vm.od
                                                            .order_extra_info
                                                            .oex_ceo
                                                        )
                                                    ),
                                                  ]
                                                ),
                                                _c("b", [_vm._v(",")]),
                                                _vm._v(" "),
                                                _c(
                                                  "b-badge",
                                                  {
                                                    attrs: { variant: "light" },
                                                  },
                                                  [
                                                    _vm._v(
                                                      "소재지: " +
                                                        _vm._s(
                                                          _vm.od
                                                            .order_extra_info
                                                            .oex_addr
                                                        )
                                                    ),
                                                  ]
                                                ),
                                                _c("b", [_vm._v(",")]),
                                                _vm._v(" "),
                                                _c(
                                                  "b-badge",
                                                  {
                                                    attrs: { variant: "light" },
                                                  },
                                                  [
                                                    _vm._v(
                                                      "요청사항: " +
                                                        _vm._s(
                                                          _vm.od
                                                            .order_extra_info
                                                            .oex_requirement
                                                        )
                                                    ),
                                                  ]
                                                ),
                                                _c("b", [_vm._v(",")]),
                                              ],
                                          _vm._v(" "),
                                          _c(
                                            "b-badge",
                                            { attrs: { variant: "light" } },
                                            [
                                              _vm._v(
                                                "담당자: " +
                                                  _vm._s(
                                                    _vm.od.order_extra_info
                                                      .oex_mng
                                                  )
                                              ),
                                            ]
                                          ),
                                          _c("b", [_vm._v(",")]),
                                          _vm._v(" "),
                                          _c(
                                            "b-badge",
                                            { attrs: { variant: "light" } },
                                            [
                                              _vm._v(
                                                "담당이메일: " +
                                                  _vm._s(
                                                    _vm.od.order_extra_info
                                                      .oex_email
                                                  )
                                              ),
                                            ]
                                          ),
                                          _c("b", [_vm._v(",")]),
                                          _vm._v(" "),
                                          _c(
                                            "b-badge",
                                            { attrs: { variant: "light" } },
                                            [
                                              _vm._v(
                                                "담당HP: " +
                                                  _vm._s(
                                                    _vm.od.order_extra_info
                                                      .oex_num
                                                  )
                                              ),
                                            ]
                                          ),
                                        ],
                                        2
                                      ),
                                    ],
                                    1
                                  )
                                : _vm.od.order_extra_info.oex_type == "HP"
                                ? _c("span")
                                : _vm.od.order_extra_info.oex_type == "CN"
                                ? _c("span")
                                : _vm.od.order_extra_info.oex_type == "BN"
                                ? _c("span")
                                : _vm.od.order_extra_info.oex_type == "NO"
                                ? _c(
                                    "span",
                                    [
                                      _c(
                                        "b-badge",
                                        { attrs: { variant: "warning" } },
                                        [_vm._v("없음")]
                                      ),
                                    ],
                                    1
                                  )
                                : _vm._e(),
                            ],
                            1
                          ),
                        ],
                        1
                      )
                    : _vm._e(),
                ],
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);