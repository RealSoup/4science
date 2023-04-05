(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_admin_shop_order_Edit_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/http */ "./resources/js/api/http.js");
/* harmony import */ var vue_daum_postcode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-daum-postcode */ "./node_modules/vue-daum-postcode/dist/index.js");
/* harmony import */ var vue_daum_postcode__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_daum_postcode__WEBPACK_IMPORTED_MODULE_2__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    VueDaumPostcode: vue_daum_postcode__WEBPACK_IMPORTED_MODULE_2__.VueDaumPostcode,
    'Modal': function Modal() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_Modal_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/Modal.vue */ "./resources/js/views/_common/Modal.vue"));
    },
    'EaInput': function EaInput() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_admin_shop_order__comp_EaInput_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/EaInput.vue */ "./resources/js/views/admin/shop/order/_comp/EaInput.vue"));
    }
  },
  data: function data() {
    return {
      isModalViewed: false,
      modalType: '',
      focusInfo: {
        od_receiver: false,
        od_receiver_hp: false
      },
      od: {
        order_extra_info: {},
        order_config: {},
        mng: {},
        order_purchase_at: [],
        order_pg: {}
      },
      dlvy_info: {
        selected: [],
        company: '한진택배',
        number: ''
      },
      document_type: ''
    };
  },
  computed: {
    payPlanDisplay: function payPlanDisplay() {
      var plan = this.od.order_extra_info.oex_pay_plan;
      var returnMsg = '';
      if (plan == 'soon') returnMsg = '선 결제';else if (plan == 'week1') returnMsg = '1주이내 결제';else if (plan == 'week2') returnMsg = '2주이내 결제';else if (plan == 'month1') returnMsg = '한달이내 결제';else if (plan == 'month2') returnMsg = '2개월이내 결제';else if (plan == 'dlvy') returnMsg = '납품시 결제';else returnMsg = plan;
      return returnMsg;
    },
    reqDocumentDisplay: function reqDocumentDisplay() {
      var req = new Array();
      if (this.od.order_extra_info.oex_req_est == 'Y') req.push('견적서');
      if (this.od.order_extra_info.oex_req_tran == 'Y') req.push('거래명세서');
      if (this.od.order_extra_info.oex_req_biz == 'Y') req.push('사업자등록증사본');
      if (this.od.order_extra_info.oex_req_bank == 'Y') req.push('통장사본');
      return req.join(', ');
    },
    dlvy_4s: function dlvy_4s() {
      return this.od.order_purchase_at.hasOwnProperty(0) ? this.od.order_purchase_at[0].odpa_dlvy_p_add_vat : 0;
    },
    dlvy_other: function dlvy_other() {
      return Object.values(this.od.order_purchase_at).reduce(function (acc, el) {
        return acc + (el.odpa_pa_name != '' ? el.odpa_dlvy_p_add_vat : 0);
      }, 0);
    },
    sum_mileage: function sum_mileage() {
      return Math.round(this.od.od_gd_price * Auth.user().my_mileage_rate / 100);
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
      var _arguments = arguments,
          _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var v, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                v = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : null;
                _context2.prev = 1;
                _this2.od = Object.assign({}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                _this2.od, // 수정하려는 객체
                {
                  _method: 'PATCH',
                  type: type
                } // 삽입하려는 내용
                );

                if (type == 'od_mng') {
                  _this2.od.od_mng = Auth.user().id;
                  _this2.od.mng = Auth.user();
                } else if (type == 'dlvy') {
                  _this2.od.order_purchase_at.forEach(function (opa) {
                    opa.order_model.forEach(function (odm) {
                      if (odm.dlvy_chk == 'Y') {
                        odm.order_dlvy_info.oddi_dlvy_com = _this2.dlvy_info.company;
                        odm.order_dlvy_info.oddi_dlvy_num = _this2.dlvy_info.number;
                      }
                    });
                  });
                } else if (type == 'arrival') {
                  _this2.od.order_purchase_at.forEach(function (opa) {
                    opa.order_model.forEach(function (odm) {
                      if (odm.dlvy_chk == 'Y') odm.order_dlvy_info.oddi_arrival_date = true;
                    });
                  });
                }

                _context2.next = 6;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/order/".concat(_this2.$route.params.od_id), _this2.od);

              case 6:
                res = _context2.sent;

                if (res && res.status === 200 && res.data.msg === 'success') {
                  if (type == 'od_mng') {
                    Notify.toast('success', '담당 배정 완료');
                  } else if (type == 'od_step') {
                    Notify.toast('success', '주문 처리 단계 수정');
                  } else if (type == 'odm_ea') {
                    Notify.toast('success', '주문 상품 정보 수정');

                    _this2.$router.go();
                  } else if (type == 'addr') {
                    Notify.toast('success', '상품 수령 정보 수정');

                    _this2.$router.go();
                  } else if (type == 'dlvy') {
                    Notify.toast('success', '배송 정보 등록');
                    _this2.isModalViewed = false;

                    _this2.offAllCheck();
                  } else if (type == 'arrival') {
                    Notify.toast('success', '배송 완료 등록');
                    _this2.isModalViewed = false;

                    _this2.offAllCheck();
                  }

                  _this2.$delete(_this2.od, '_method');
                } else Notify.toast('warning', '수정 실패');

                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](1);
                Notify.consolePrint(_context2.t0);
                Notify.toast('warning', _context2.t0.response);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 10]]);
      }))();
    },
    document_action: function document_action() {
      switch (this.document_type) {
        case 'est_e':
          this.estimateExcel();
          break;

        case 'est_p':
          this.estimatePdf();
          break;

        case 'tra_e':
          this.transactionExcel();
          break;

        case 'tra_p':
          this.transactionPdf();
          break;

        case 'send_tra_p':
          this.isModalViewed = !this.isModalViewed;
          this.modalType = 'sendTransaction';
          break;

        default:
          break;
      }
    },
    print: function print() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this3.$htmlToPaper('print_area', {
                  styles: ['https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css', '/css/fontawesome_svg.css', '/css/adm_shop_order_edit.css']
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    estimateExcel: function estimateExcel() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                _this4.mngChk();

                _context4.next = 4;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/order/exportEstimateExcel", _this4.od, {
                  responseType: 'blob'
                });

              case 4:
                res = _context4.sent;

                _this4.orderDocumentDown(res, 'Estimate_' + dt.format("yyyyMMdd") + '.xlsx');

                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                Notify.consolePrint(_context4.t0);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 8]]);
      }))();
    },
    estimatePdf: function estimatePdf() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;

                _this5.mngChk();

                _context5.next = 4;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/order/exportEstimatePdf", _this5.od, {
                  responseType: 'blob'
                });

              case 4:
                res = _context5.sent;

                _this5.orderDocumentDown(res, 'Estimate_' + dt.format("yyyyMMdd") + '.pdf');

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
    transactionExcel: function transactionExcel() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;

                _this6.mngChk();

                _context6.next = 4;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/order/exportTransactionExcel", _this6.od, {
                  responseType: 'blob'
                });

              case 4:
                res = _context6.sent;

                _this6.orderDocumentDown(res, 'Transaction_' + dt.format("yyyyMMdd") + '.xlsx');

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
    transactionPdf: function transactionPdf() {
      var _arguments2 = arguments,
          _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        var query, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                query = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : '';
                _context7.prev = 1;

                _this7.mngChk();

                _context7.next = 5;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/order/exportTransactionPdf?".concat(query), _this7.od, {
                  responseType: 'blob'
                });

              case 5:
                res = _context7.sent;

                if (res && res.status === 200) {
                  if (query) Notify.toast('success', '발송 완료');else {
                    _this7.orderDocumentDown(res, 'Transaction_' + dt.format("yyyyMMdd") + '.pdf');

                    Notify.toast('success', '다운 완료');
                  }
                } else Notify.toast('warning', '실패');

                _context7.next = 12;
                break;

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7["catch"](1);
                Notify.consolePrint(_context7.t0);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[1, 9]]);
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
        Notify.modal('담당자 배정 이후에 사용가능합니다.', 'warning');
        return false;
      }
    },
    ledger: function ledger() {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _this8.od.data_type = "ORD";
                _context8.next = 4;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/ledger", _this8.od);

              case 4:
                res = _context8.sent;

                if (res && res.status === 200) {
                  if (res.data.msg == 'Success') _this8.$router.push({
                    name: 'adm_ledger'
                  });else if (res.data.msg == 'Existed') Notify.modal('이미 등록된 주문입니다.', 'warning');
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
    onPostcodeSlt: function onPostcodeSlt(result) {
      this.$set(this.od, 'od_zip', result.zonecode);
      this.$set(this.od, 'od_addr1', result.roadAddress + "(" + result.buildingName + ")");
      this.modalType = 'postDetail';
    },
    copyToClipboard: function copyToClipboard(val) {
      // 클립보드로 복사하는 기능을 생성
      var aux = document.createElement("input"); // 글을 쓸 수 있는 란을 만든다.

      aux.setAttribute("value", val); // 지정된 요소의 값을 할당 한다.

      document.body.appendChild(aux); // bdy에 추가한다.

      aux.select(); // 지정된 내용을 강조한다.

      document.execCommand("copy"); // 텍스트를 카피 하는 변수를 생성

      document.body.removeChild(aux); // body 로 부터 다시 반환 한다.

      Notify.toast('success', '복사됨');
    },
    sendTransaction: function sendTransaction() {
      this.transactionPdf("trans_date=".concat(this.od.trans_date, "&trans_receive=").concat(this.od.trans_receive, "&trans_email=").concat(this.od.trans_email, "&trans_mng_email=").concat(this.od.mng.email));
      this.isModalViewed = false;
    },
    toggleAll: function toggleAll(pa) {
      var opt = 'N';
      if (pa.dlvy_all_chk) opt = 'Y';
      pa.order_model.forEach(function (el) {
        if (el.odm_type == 'MODEL') el.dlvy_chk = opt;
      });
      pa.indeterminate = false;
    },
    changeSon: function changeSon(pa) {
      var tmp = [];
      pa.order_model.forEach(function (el) {
        if (el.odm_type == 'MODEL') tmp.push(el.dlvy_chk);
      });
      var isSame = tmp.every(function (v) {
        return v === tmp[0];
      });

      if (isSame) {
        if (tmp[0] == 'Y') {
          pa.indeterminate = false;
          pa.dlvy_all_chk = true;
        } else {
          pa.indeterminate = false;
          pa.dlvy_all_chk = false;
        }
      } else {
        pa.indeterminate = true;
        pa.dlvy_all_chk = false;
      }
    },
    writeDlvyInfo: function writeDlvyInfo(odm) {
      if (odm !== 'bundle') {
        odm.dlvy_chk = 'Y';
        this.od.order_purchase_at;

        var _iterator = _createForOfIteratorHelper(this.od.order_purchase_at),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var opa = _step.value;
            opa.dlvy_all_chk = false;

            var _iterator2 = _createForOfIteratorHelper(opa.order_model),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var odm02 = _step2.value;
                if (odm.odm_id !== odm02.odm_id) odm02.dlvy_chk = 'N';
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      if (this.didCheck()) {
        this.modalType = 'dlvyInfo';
        this.isModalViewed = !this.isModalViewed;
      }
    },
    didCheck: function didCheck() {
      var didCheck = false;

      var _iterator3 = _createForOfIteratorHelper(this.od.order_purchase_at),
          _step3;

      try {
        opa_loop: for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var opa = _step3.value;

          var _iterator4 = _createForOfIteratorHelper(opa.order_model),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var odm = _step4.value;

              if (odm.dlvy_chk == 'Y') {
                didCheck = true;
                break opa_loop;
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      if (!didCheck) {
        Notify.toast('warning', '모델을 먼저 체크하세요.');
        return false;
      } else return true;
    },
    offAllCheck: function offAllCheck() {
      var _iterator5 = _createForOfIteratorHelper(this.od.order_purchase_at),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var opa = _step5.value;
          opa.indeterminate = false;
          opa.dlvy_all_chk = false;

          var _iterator6 = _createForOfIteratorHelper(opa.order_model),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var odm = _step6.value;
              odm.dlvy_chk = 'N';
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    },
    DlvyAllIn: function DlvyAllIn(odm_id) {
      var _iterator7 = _createForOfIteratorHelper(this.od.order_purchase_at),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var opa = _step7.value;

          var _iterator8 = _createForOfIteratorHelper(opa.order_model),
              _step8;

          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var odm = _step8.value;
              if (odm.odm_id !== odm_id) odm.dlvy_all_in = false;
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    },
    getHref: function getHref(com, num) {
      return this.od.order_config.delivery_com[com].replace('[송장번호]', num);
    },
    format_date: function format_date(e) {
      return this.formatDate(e);
    }
  },
  mounted: function mounted() {
    this.edit();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_public_css_adm_shop_order_edit_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! -!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../public/css/adm_shop_order_edit.css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./public/css/adm_shop_order_edit.css");
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_public_css_adm_shop_order_edit_css__WEBPACK_IMPORTED_MODULE_1__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.p_wrap h5[data-v-ca63be56] { font-size:1.54rem; padding: 0.4rem 0 0 0.65rem; margin-bottom: 1rem !important;\n}\n.p_wrap h5 b[data-v-ca63be56] { position:relative; bottom:-2px;\n}\n.p_wrap .container[data-v-ca63be56] { max-width:100%;\n}\n.p_wrap .container[data-v-ca63be56],\r\n.p_wrap .row .col[data-v-ca63be56] { padding:0;\n}\n.p_wrap .adform .row > div[data-v-ca63be56]:not(.tit) { padding: 8px 5px;\n}\n.p_wrap .row[data-v-ca63be56],\r\n.p_wrap .row .col p[data-v-ca63be56]  { margin:0;\n}\n.p_wrap .p_tit .col[data-v-ca63be56]:last-child { text-align:right;\n}\n.p_wrap .p_tit .col:last-child .btn[data-v-ca63be56] { border-color:#000; font-weight:600;\n}\n.p_wrap .btn.teal[data-v-ca63be56] { font-size:.9rem; padding:.5rem 0.75rem 0.3rem;\n}\n.p_wrap .top[data-v-ca63be56] {\n}\n.p_wrap .top .row[data-v-ca63be56]:first-child { background-color:#4EB8C8; color:#FFF; border-radius:.4rem .4rem 0 0; font-size:.95rem;\n}\n.p_wrap .top .row:first-child .col[data-v-ca63be56] { padding:.6rem 0 .25rem 0;\n}\n.p_wrap .top .row[data-v-ca63be56]:last-child { border:1px solid #4EB8C8; border-radius:0 0 .4rem .4rem;\n}\n.p_wrap .top .row:last-child .col[data-v-ca63be56] { padding:.3rem .75rem; line-height:2rem;\n}\n.p_wrap .top .row:last-child .col .btn[data-v-ca63be56] { border-color:#8A8A8A; padding:.2rem .75rem;\n}\n.p_wrap .top .row:last-child .col .custom-select[data-v-ca63be56] { height: calc(1.95rem + 2px); padding: 0.23rem 1.75rem 0.23rem 0.75rem; background:#fff url(https://fourscience.s3.ap-northeast-2.amazonaws.com/common/arrow_dn.gif) no-repeat right 8px center;\n}\n.p_wrap .top .row:first-child .col[data-v-ca63be56]:nth-child(6) { border-right:1px solid #FFF;\n}\n.p_wrap .top .row:last-child .col[data-v-ca63be56]:nth-child(6) { border-right:1px solid #4EB8C8;\n}\n.p_wrap .top .row .col[data-v-ca63be56] { text-align:center;\n}\n.p_wrap .top .row .col[data-v-ca63be56]:nth-child(1) { flex:0 0 6%; max-width:6%;\n}\n.p_wrap .top .row .col[data-v-ca63be56]:nth-child(2) { flex:0 0 8%; max-width:8%;\n}\n.p_wrap .top .row .col[data-v-ca63be56]:nth-child(3) { flex:0 0 9%; max-width:9%;\n}\n.p_wrap .top .row .col[data-v-ca63be56]:nth-child(4) { flex:0 0 7%; max-width:7%;\n}\n.p_wrap .top .row .col[data-v-ca63be56]:nth-child(5) { flex:0 0 9%; max-width:9%;\n}\n.p_wrap .top .row .col[data-v-ca63be56]:nth-child(6) { flex:0 0 10%; max-width:10%;\n}\n.p_wrap .top .row .col[data-v-ca63be56]:nth-child(7) { flex:0 0 7%; max-width:7%;\n}\n.p_wrap .top .row .col[data-v-ca63be56]:nth-child(8) { flex:0 0 8%; max-width:8%;\n}\n.p_wrap .top .row .col[data-v-ca63be56]:nth-child(9) { flex:0 0 8%; max-width:8%;\n}\n.p_wrap #print_area .box[data-v-ca63be56] { border:5px solid #EBEBEB; border-radius:1rem; padding:2rem; margin:2rem 0;\n}\n.p_wrap #print_area .box > .container[data-v-ca63be56] { border-top:3px solid #4F637B;\n}\n.p_wrap #print_area .box .container .goods .pa_tit[data-v-ca63be56] { flex:0 0 9%; max-width:9%; border-right:1px solid #D7D7D7; border-bottom:1px solid #D7D7D7; align-items:center; display:flex; text-align:center; justify-content:center;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row.option[data-v-ca63be56] { background-color:#F4F1EC;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col[data-v-ca63be56] { border-bottom:1px solid #D7D7D7; padding:.68rem; font-size:.85rem;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col.align[data-v-ca63be56] { display:flex; align-items:center; justify-content:center;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row:not(:first-child) .end[data-v-ca63be56] { justify-content:flex-end;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row:not(:first-child) .col[data-v-ca63be56] { color:#AEAEAE;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row:not(:first-child) .col .btn[data-v-ca63be56] { color:#AEAEAE; font-size:.9rem;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col b[data-v-ca63be56] { color:#000; font-size:.95rem;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row:first-child .col[data-v-ca63be56] { font-weight:600; line-height:1.7; padding:.86rem 0; font-size:.9rem; text-align:center;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col[data-v-ca63be56]:nth-child(1) { flex:0 0 4.5%; max-width:4.5%;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col[data-v-ca63be56]:nth-child(2) { flex:0 0 7%; max-width:7%;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col[data-v-ca63be56]:nth-child(3) { border-right:1px solid #D7D7D7;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col[data-v-ca63be56]:nth-child(4) { flex:0 0 9%; max-width:9%; border-right:1px solid #D7D7D7;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col[data-v-ca63be56]:nth-child(5) { flex:0 0 9%; max-width:9%; border-right:1px solid #D7D7D7;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col[data-v-ca63be56]:nth-child(6) { flex:0 0 9%; max-width:9%; border-right:1px solid #D7D7D7;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col[data-v-ca63be56]:nth-child(7) { flex:0 0 9%; max-width:9%; border-right:1px solid #D7D7D7;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col[data-v-ca63be56]:nth-child(8) { flex:0 0 9%; max-width:9%;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col img[data-v-ca63be56] { width:100%; cursor:pointer;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col[data-v-ca63be56] .myCheck .custom-control-label::before, \r\n.p_wrap #print_area .box .container .goods .gd_con .row .col[data-v-ca63be56] .myCheck .custom-control-label::after { width:1.8rem; height:1.8rem; top:-2px;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col .sum[data-v-ca63be56] { text-align:right; width:100%; line-height:2;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col.desc.option[data-v-ca63be56] { display:flex; align-items:center;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col .sum[data-v-ca63be56] .btn-group-toggle { display:block !important; text-align:center;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col .sum[data-v-ca63be56] .btn-group-toggle .btn { background-color:#fff; color:#6F6F6F; border-color:#aaa; border-radius:2rem; padding:.17rem 0.7rem; font-size:.75rem;\n}\n.p_wrap #print_area .box .container .goods .gd_con .row .col .sum[data-v-ca63be56] .btn-group-toggle .btn.active { color:#fff; background-color:#4EB8C8;\n}\n.p_wrap #print_area .box .container .goods .dlvy_fare[data-v-ca63be56] { flex:0 0 9%; max-width:9%; align-items: center; display: flex; text-align: center; justify-content: center; border-left: 1px solid #D7D7D7; border-bottom:1px solid #D7D7D7; color:#AEAEAE;\n}\n.p_wrap #print_area .box .container .action[data-v-ca63be56] { padding:1.5rem 3rem; font-weight:600;\n}\n.p_wrap #print_area .box .container.sum_up .total[data-v-ca63be56] { border-bottom:1px solid #D6D6D6;\n}\n.p_wrap #print_area .box .container.sum_up .total .col[data-v-ca63be56] { color:#000; font-weight:bold; padding:1rem 3rem;\n}\n.p_wrap #print_area .box .container.sum_up .total .col b[data-v-ca63be56] { font-size:1.4rem;\n}\n.p_wrap #print_area .box .container.sum_up .total .col[data-v-ca63be56]:nth-of-type(1) { display:flex; align-items:center;\n}\n.p_wrap #print_area .box .container.sum_up .total .col[data-v-ca63be56]:nth-of-type(2) { text-align:right; border-right:1px solid #D6D6D6;\n}\n.p_wrap #print_area .box .container.sum_up .total .col[data-v-ca63be56]:nth-of-type(2):after { background:#707070; width:25px; height:25px; border-radius:13px; content:\"+\"; position:absolute; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.2;\n}\n.p_wrap #print_area .box .container.sum_up .total .col[data-v-ca63be56]:nth-of-type(3) { display:flex; align-items:center;\n}\n.p_wrap #print_area .box .container.sum_up .total .col[data-v-ca63be56]:nth-of-type(4) { text-align:right; border-right:1px solid #D6D6D6;\n}\n.p_wrap #print_area .box .container.sum_up .total .col[data-v-ca63be56]:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; content:\"=\"; position:absolute; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.2;\n}\n.p_wrap #print_area .box .container.sum_up .total .col[data-v-ca63be56]:nth-of-type(5) { display:flex; align-items:center; flex-basis:20%; max-width:20%;\n}\n.p_wrap #print_area .box .container.sum_up .total .col[data-v-ca63be56]:nth-of-type(6) { text-align:right; flex-basis:20%; max-width:20%;\n}\n.p_wrap #print_area .box .container.sum_up .total_sub[data-v-ca63be56] { background:#F2F3F5; border-bottom-width:0;\n}\n.p_wrap #print_area .box .container.sum_up .total_sub>.col[data-v-ca63be56]:nth-of-type(1) { border-right:1px solid #D6D6D6;\n}\n.p_wrap #print_area .box .container.sum_up .total_sub>.col[data-v-ca63be56]:nth-of-type(2) { border-right:1px solid #D6D6D6;\n}\n.p_wrap #print_area .box .container.sum_up .total_sub>.col[data-v-ca63be56]:nth-of-type(3) { flex-basis:40%; max-width:40%;\n}\n.p_wrap #print_area .box .container.sum_up .total_sub .col>div[data-v-ca63be56] { display:flex; flex-wrap:wrap;\n}\n.p_wrap #print_area .box .container.sum_up .total_sub .col>div[data-v-ca63be56]:nth-of-type(1) { padding:1.3rem 3rem .5rem 3rem;\n}\n.p_wrap #print_area .box .container.sum_up .total_sub .col>div[data-v-ca63be56]:nth-of-type(2) { padding:0 3rem 2.5rem 3rem;\n}\n.p_wrap #print_area .box .container.sum_up .total_sub .col>div .col[data-v-ca63be56] { color:#A8A9AB; font-weight:bold; font-size:.84rem;\n}\n.p_wrap #print_area .box .container.sum_up .total_sub .col>div .col[data-v-ca63be56]:nth-of-type(2) { text-align:right;\n}\n.p_wrap #print_area .extra_info table[data-v-ca63be56] { width:100%; border-top:3px solid #4F637B; border-bottom:3px solid #4F637B; margin-bottom:2.5rem;\n}\n.p_wrap #print_area .extra_info table tr th[data-v-ca63be56] { background-color:#F2F3F5; width:13%; text-align:center; padding:.55rem 0.3rem; font-size:.95rem;\n}\n.p_wrap #print_area .extra_info table tr td[data-v-ca63be56] { padding-left:2rem;\n}\n.p_wrap #print_area .extra_info table tr th[data-v-ca63be56],\r\n.p_wrap #print_area .extra_info table tr td[data-v-ca63be56] { font-size:.9rem; border-bottom:1px solid #D7D7D7; border-right:1px solid #D7D7D7;\n}\n.p_wrap #print_area .extra_info table tr:last-child td[data-v-ca63be56] { border-right-width:0;\n}\n.p_wrap #print_area .extra_info table tr td .btn[data-v-ca63be56] { padding:.3rem .75rem .1rem;\n}\n.cube_box[data-v-ca63be56] { display:inline-block; vertical-align:middle;\n}\n.cube_box[data-v-ca63be56], \r\n.cube_box *[data-v-ca63be56] { box-sizing: border-box;\n}\n.cube_box[data-v-ca63be56] { /*perspective:400px;*/ margin:auto;\n}\n.cube_box .cube[data-v-ca63be56] { position: relative; transform-style: preserve-3d; transform: translateZ(-50px); transition: transform .2s;\n}\n.cube_box .cube .piece[data-v-ca63be56] { position:absolute;\n}\n.cube_box[data-v-ca63be56],\r\n.cube_box .cube[data-v-ca63be56],\r\n.cube_box .cube .piece[data-v-ca63be56] { width:100%; max-width:40px; height:30px;\n}\n.cube_box .cube .piece.front[data-v-ca63be56]  { transform: rotateY(  0deg) translateZ(20px); line-height:2; padding-left:.6rem;\n}\n.cube_box .cube .piece.right[data-v-ca63be56]  { transform: rotateY( 90deg) translateZ(20px); display:block;\n}\n.cube_box .cube.show_front[data-v-ca63be56]  { transform: translateZ(-50px) rotateY(   0deg);\n}\n.cube_box .cube.show_right[data-v-ca63be56],\r\n.cube_box .cube[data-v-ca63be56]:hover  { transform: translateZ(-50px) rotateY( -90deg);\n}\ntable tr td svg[data-v-ca63be56] { cursor:pointer; font-size:1.2rem; vertical-align:middle;\n}\n.cube_box.receiver[data-v-ca63be56],\r\n.cube_box.receiver .cube[data-v-ca63be56],\r\n.cube_box.receiver .cube .piece[data-v-ca63be56] { max-width:150px;\n}\n.cube_box.receiver_hp[data-v-ca63be56],\r\n.cube_box.receiver_hp .cube[data-v-ca63be56],\r\n.cube_box.receiver_hp .cube .piece[data-v-ca63be56] { max-width:250px;\n}\n.cube_box.receiver_addr[data-v-ca63be56],\r\n.cube_box.receiver_addr .cube[data-v-ca63be56],\r\n.cube_box.receiver_addr .cube .piece[data-v-ca63be56] { max-width:500px;\n}\n.layerModal .row .ctrl[data-v-ca63be56] { text-align:right;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./public/css/adm_shop_order_edit.css":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./public/css/adm_shop_order_edit.css ***!
  \**********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".card { border-radius:10px; margin-bottom:20px; }\r\n.card .tit { border-left:3px solid #17a2b8; font-weight:bold; font-size:20px; padding-left:30px; margin-bottom:20px; }\r\n.card .tit button { display:none; }\r\n\r\n.badge { font-size:100%; }\r\n.head { padding:0.3rem 15px; position:sticky; top:0; z-index:2; background: #17a2b8c2; }\r\n.head span { margin-right:1rem; }\r\n.head span.badge { margin-right:2rem; }\r\n.head span svg { margin-right:0.5rem; }\r\n.actionArea { position:sticky; top:0; z-index:1021; }\r\n.actionArea .input-group { position:absolute; top:2px; right:15px; max-width:690px; }\r\n@media (max-width: 992px) {\r\n    .actionArea { position:static; }\r\n    .actionArea .input-group { position:static; max-width:none; }\r\n}\r\n\r\n.card .container { font-size:.9rem; }\r\n.goods .container { /*border-left: 3px solid #b81717;*/ margin-top:40px; }\r\n.goods .container h5 { margin-bottom:30px;  border-bottom: 1px solid #206137; margin-left:-10px; padding: 5px 15px; max-width:700px; }\r\n.goods .container h5 .myCheck { display:none; }\r\n.goods .container>.row { border:2px solid #17a3b886; }\r\n.goods .container>.row>div:last-child { flex:0 0 150px; max-width:150px; background:#17a3b886;}\r\n.goods .container>.row>div:last-child .row { height:100%; }\r\n.goods .container>.row>div:last-child .row .col { justify-content:center; }\r\n.goods .container .row { margin-right:-5px; margin-left:-5px; }\r\n.goods .container .row .col { padding-left:5px; padding-right:5px; }\r\n.goods .container .row .col .row { justify-content:flex-end; }\r\n.goods .container .row .col .row .gd_img { flex:0 0 130px; max-width:130px; padding-right: 15px; padding-left: 15px; }\r\n.goods .container .row .col .row .gd_img img { width:100px; height:100px; object-fit:cover; }\r\n.goods .container .row .col .row .gd_info div { width:100%; text-align:left; }\r\n.goods .container .row .col .row .gd_info div>b { color:#006edf; font-size:1.3rem; }\r\n.goods .container .row .col .row.model:not(:last-child) { border-bottom:1px solid #aaa; }\r\n.goods .container .row .col .row.model:not(:first-child) { border-top:1px solid #aaa; }\r\n.goods .container .row .col .row .col:not(:first-child) { border-left:1px solid #17a3b886; }\r\n.goods .container .row .col .row .col { display:flex; align-items:center; justify-content:center; }\r\n.goods .container .row .col .row .col .divider { font-size:1.6rem; font-weight:bold; color:#b81717; padding:0 5px; position:relative; top:3px; line-height:14px; }\r\n.goods .container .row .col .row .col p { margin:0; }\r\n\r\n\r\n.goods .container .row .col .row .chk { flex:0 0 3%; max-width:50px; min-width:45px; display:none; }\r\n.goods .container .row .col .row .spec  { flex:0 0 18%; max-width:18%; }\r\n.goods .container .row .col .row .price { flex:0 0 18%; max-width:18%; }\r\n.goods .container .row .col .row .price p { width:100%; text-align:right; }\r\n.goods .container .row .col .row .dlvy_info { flex:0 0 8%; max-width:8%; }\r\n\r\n.card .container .row .col .cube_box { display:inline-block; }\r\n.card .container .row .col .cube_box .cube .right { display:none; }\r\n\r\n    \r\n.price .container .row .col { text-align:right; }\r\n.price .container .row .col b { min-width:8rem; display:inline-block; color:#b81717; }\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_ca63be56_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_ca63be56_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_ca63be56_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/vue-daum-postcode/dist/index.js":
/*!******************************************************!*\
  !*** ./node_modules/vue-daum-postcode/dist/index.js ***!
  \******************************************************/
/***/ ((module) => {

!function(e,t){if(true)module.exports=t();else { var o, n; }}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e){let t=null;return()=>t||(t=Promise.resolve(e()))}n.r(t),n.d(t,"install",(function(){return l})),n.d(t,"VueDaumPostcode",(function(){return i}));var r="undefined"==typeof document?Promise.reject(new Error("not supported")):(e,t={})=>new Promise((n,o)=>{(document.head||document.body).appendChild(Object.assign(document.createElement("script"),t,{src:e,async:!0,onload:n,onerror:o}))});function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=o((function(){return r(e.scriptUrl||"//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js").then((function(){return new Promise((function(e){return window.daum.postcode.load(e)}))}))}));return{props:{q:{type:String,default:""},animation:{type:Boolean,default:!1},noAutoMapping:{type:Boolean,default:!1},noShorthand:{type:Boolean,default:!1},noSubmitMode:{type:Boolean,default:!1},pleaseReadGuide:{type:Number,default:0},pleaseReadGuideTimer:{type:Number,default:1.5},maxSuggestItems:{type:Number,default:10},showMoreHName:{type:Boolean,default:!1},hideMapBtn:{type:Boolean,default:!1},hideEngBtn:{type:Boolean,default:!1},alwaysShowEngAddr:{type:Boolean,default:!1},zonecodeOnly:{type:Boolean,default:!1},theme:{type:Object,default:function(){return{}}}},data:function(){return{styleHeight:0,isLoaded:!1}},mounted:function(){var e=this;t().then((function(){e.isLoaded=!0,e.$nextTick((function(){new window.daum.Postcode({width:"100%",height:"100%",animation:e.animation,autoMapping:!e.noAutoMapping,shorthand:!e.noShorthand,pleaseReadGuide:e.pleaseReadGuide,pleaseReadGuideTimer:e.pleaseReadGuideTimer,maxSuggestItems:e.maxSuggestItems,showMoreHName:e.showMoreHName,hideMapBtn:e.hideMapBtn,hideEngBtn:e.hideEngBtn,alwaysShowEngAddr:e.alwaysShowEngAddr,zonecodeOnly:e.zonecodeOnly,theme:e.theme,submitMode:!e.noSubmitMode,onsearch:function(t){e.$emit("search",t)},oncomplete:function(t){e.$emit("complete",t)},onresize:function(t){e.styleHeight="".concat(t.height,"px")}}).embed(e.$refs.container,{q:e.q,autoClose:!1}),e.$emit("load")}))}))},computed:{styles:function(){var e={};return e.height=this.styleHeight,e}},render:function(e){return e("div",{class:["vue-daum-postcode"]},this.isLoaded||!this.$slots.loading?[e("div",{class:["vue-daum-postcode-container"],ref:"container",style:this.styles})]:[e("div",{class:["vue-daum-postcode-loading"]},this.$slots.loading)])}}}var i=u(),a=["name"];function d(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},u=Object.keys(e);for(o=0;o<u.length;o++)n=u[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(o=0;o<u.length;o++)n=u[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function l(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.name,o=d(t,a);e.component(n||"vue-daum-postcode",Object.keys(o).length>0?u(o):i)}"undefined"!=typeof window&&window.Vue&&l(window.Vue);t.default={install:l}}])}));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./resources/js/views/admin/shop/order/Edit.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/admin/shop/order/Edit.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_ca63be56_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=ca63be56&scoped=true& */ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&scoped=true&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js&");
/* harmony import */ var _Edit_vue_vue_type_style_index_0_id_ca63be56_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true& */ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_ca63be56_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Edit_vue_vue_type_template_id_ca63be56_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "ca63be56",
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true& ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_ca63be56_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&scoped=true& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_ca63be56_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_ca63be56_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_ca63be56_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=ca63be56&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "p_wrap" },
    [
      _c(
        "h3",
        { staticClass: "p_tit row" },
        [
          _c("b-col", [_vm._v("주문 상세")]),
          _vm._v(" "),
          _c(
            "b-col",
            [
              _c(
                "b-button",
                {
                  staticClass: "white",
                  attrs: { to: { name: "adm_order_index" }, size: "sm" },
                },
                [_vm._v("목록으로 돌아가기")]
              ),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-container",
        { staticClass: "top", attrs: { fluid: "" } },
        [
          _c(
            "b-row",
            [
              _c("b-col", [_vm._v("No.")]),
              _vm._v(" "),
              _c("b-col", [_vm._v("주문번호")]),
              _vm._v(" "),
              _c("b-col", [_vm._v("주문날짜")]),
              _vm._v(" "),
              _c("b-col", [_vm._v("주문자")]),
              _vm._v(" "),
              _c("b-col", [_vm._v("연락처")]),
              _vm._v(" "),
              _c("b-col", [_vm._v("이메일")]),
              _vm._v(" "),
              _c("b-col", [_vm._v("담당")]),
              _vm._v(" "),
              _c("b-col", [_vm._v("영업장부")]),
              _vm._v(" "),
              _c("b-col", [_vm._v("주문서")]),
              _vm._v(" "),
              _c("b-col", [_vm._v("문서받기")]),
              _vm._v(" "),
              _c("b-col", [_vm._v("처리상태")]),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-row",
            [
              _c("b-col", [_vm._v(_vm._s(_vm.od.od_id) + ".")]),
              _vm._v(" "),
              _c("b-col", [_vm._v(_vm._s(_vm.od.od_no))]),
              _vm._v(" "),
              _c("b-col", [
                _vm._v(
                  _vm._s(_vm._f("formatDate_YYYY_MM_DD")(_vm.od.created_at))
                ),
              ]),
              _vm._v(" "),
              _vm.od.created_id
                ? _c(
                    "b-link",
                    {
                      staticClass: "col",
                      attrs: {
                        to: {
                          name: "adm_user_edit",
                          params: { id: _vm.od.created_id },
                        },
                      },
                    },
                    [
                      _vm._v(
                        "\r\n                " +
                          _vm._s(_vm.od.od_orderer) +
                          "\r\n            "
                      ),
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("b-col", [_vm._v(_vm._s(_vm.od.od_orderer_hp))]),
              _vm._v(" "),
              _c("b-col", [_vm._v(_vm._s(_vm.od.od_orderer_email))]),
              _vm._v(" "),
              _c(
                "b-col",
                [
                  _vm.od.od_mng < 1
                    ? _c(
                        "b-button",
                        {
                          staticClass: "white",
                          on: {
                            click: function ($event) {
                              return _vm.update("od_mng")
                            },
                          },
                        },
                        [_vm._v("담당")]
                      )
                    : [_vm._v(_vm._s(_vm.od.mng.name))],
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "b-col",
                [
                  _vm.od.od_has_ledger == "N"
                    ? _c(
                        "b-button",
                        { staticClass: "white", on: { click: _vm.ledger } },
                        [_vm._v("등록")]
                      )
                    : [_vm._v("등록됨")],
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "b-col",
                [
                  _c(
                    "b-button",
                    { staticClass: "white", on: { click: _vm.print } },
                    [_vm._v("인쇄")]
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-col",
                [
                  _vm.od.od_mng
                    ? _c(
                        "b-input-group",
                        [
                          _c(
                            "b-form-select",
                            {
                              staticClass: "custom-select",
                              model: {
                                value: _vm.document_type,
                                callback: function ($$v) {
                                  _vm.document_type = $$v
                                },
                                expression: "document_type",
                              },
                            },
                            [
                              _c(
                                "b-form-select-option",
                                { attrs: { value: "est_e" } },
                                [_vm._v("견적서 EXCEL")]
                              ),
                              _vm._v(" "),
                              _c(
                                "b-form-select-option",
                                { attrs: { value: "est_p" } },
                                [_vm._v("견적서 PDF")]
                              ),
                              _vm._v(" "),
                              _c(
                                "b-form-select-option",
                                { attrs: { value: "tra_e" } },
                                [_vm._v("거래명세서 EXCEL")]
                              ),
                              _vm._v(" "),
                              _c(
                                "b-form-select-option",
                                { attrs: { value: "tra_p" } },
                                [_vm._v("거래명세서 PDF")]
                              ),
                              _vm._v(" "),
                              _c(
                                "b-form-select-option",
                                { attrs: { value: "send_tra_p" } },
                                [_vm._v("거래명세서 발송 PDF")]
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
                                  staticClass: "b_gray",
                                  on: { click: _vm.document_action },
                                },
                                [_vm._v("받기")]
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      )
                    : [_vm._v("담당 등록 후...")],
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "b-col",
                [
                  _c(
                    "b-input-group",
                    [
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
                            [_vm._v("◖처리 상태◗")]
                          ),
                          _vm._v(" "),
                          _vm._l(_vm.od.order_config.step, function (v, k) {
                            return _c(
                              "b-form-select-option",
                              { key: k, attrs: { value: k } },
                              [_vm._v(_vm._s(v.name))]
                            )
                          }),
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "b-input-group-append",
                        [
                          _c(
                            "b-button",
                            {
                              staticClass: "b_gray",
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
          { staticClass: "box" },
          [
            _c(
              "b-row",
              { attrs: { tag: "h5" } },
              [
                _c("b-col", { attrs: { tag: "b" } }, [_vm._v("주문 상품")]),
                _vm._v(" "),
                _c(
                  "b-col",
                  { staticClass: "text-right" },
                  [
                    _c(
                      "b-button",
                      {
                        staticClass: "teal",
                        on: {
                          click: function ($event) {
                            return _vm.update("odm_ea")
                          },
                        },
                      },
                      [_vm._v("주문 상품 정보 수정")]
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "b-container",
              [
                _vm._l(_vm.od.order_purchase_at, function (pa, pa_i) {
                  return _c(
                    "b-row",
                    { key: "pa_" + pa_i, staticClass: "goods" },
                    [
                      _c("b-col", { staticClass: "pa_tit" }, [
                        pa.odpa_pa_id
                          ? _c("b", [
                              _vm._v("업체"),
                              _c("br"),
                              _vm._v("직배송"),
                            ])
                          : _c("b", [
                              _vm._v("포사이언스"),
                              _c("br"),
                              _vm._v("배송"),
                            ]),
                      ]),
                      _vm._v(" "),
                      _c(
                        "b-col",
                        { staticClass: "gd_con" },
                        [
                          _c(
                            "b-row",
                            [
                              _c(
                                "b-col",
                                [
                                  _c("b-form-checkbox", {
                                    staticClass: "myCheck allCheck",
                                    attrs: { indeterminate: pa.indeterminate },
                                    on: {
                                      change: function ($event) {
                                        return _vm.toggleAll(pa)
                                      },
                                    },
                                    model: {
                                      value: pa.dlvy_all_chk,
                                      callback: function ($$v) {
                                        _vm.$set(pa, "dlvy_all_chk", $$v)
                                      },
                                      expression: "pa.dlvy_all_chk",
                                    },
                                  }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("b-col"),
                              _vm._v(" "),
                              _c("b-col", [_vm._v("주문 상품")]),
                              _vm._v(" "),
                              _c("b-col", [_vm._v("제조사")]),
                              _vm._v(" "),
                              _c("b-col", [_vm._v("판매가")]),
                              _vm._v(" "),
                              _c("b-col", [_vm._v("수량")]),
                              _vm._v(" "),
                              _c("b-col", [_vm._v("금액")]),
                              _vm._v(" "),
                              _c("b-col"),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _vm._l(pa.order_model, function (odm, odm_i) {
                            return _c(
                              "b-row",
                              {
                                key: "gd_" + odm_i,
                                class: {
                                  model: odm.odm_type == "MODEL",
                                  option: odm.odm_type == "OPTION",
                                },
                              },
                              [
                                _c(
                                  "b-col",
                                  { staticClass: "align" },
                                  [
                                    odm.odm_type == "MODEL"
                                      ? _c("b-form-checkbox", {
                                          staticClass: "myCheck",
                                          attrs: {
                                            value: "Y",
                                            "unchecked-value": "N",
                                          },
                                          on: {
                                            change: function ($event) {
                                              return _vm.changeSon(pa)
                                            },
                                          },
                                          model: {
                                            value: odm.dlvy_chk,
                                            callback: function ($$v) {
                                              _vm.$set(odm, "dlvy_chk", $$v)
                                            },
                                            expression: "odm.dlvy_chk",
                                          },
                                        })
                                      : _vm._e(),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("b-col", { staticClass: "align" }, [
                                  odm.odm_type == "MODEL"
                                    ? _c("div", [
                                        odm.odm_gd_id > 0
                                          ? _c("img", {
                                              attrs: { src: odm.img_src },
                                              on: {
                                                click: function ($event) {
                                                  return _vm.openWinPop(
                                                    "/admin/shop/goods/" +
                                                      odm.odm_gd_id +
                                                      "/edit",
                                                    1700,
                                                    900
                                                  )
                                                },
                                              },
                                            })
                                          : _c("img", {
                                              attrs: { src: odm.img_src },
                                            }),
                                      ])
                                    : _c("b", [_vm._v("추가 옵션")]),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "b-col",
                                  {
                                    staticClass: "desc",
                                    class: { option: odm.odm_type == "OPTION" },
                                  },
                                  [
                                    odm.odm_type == "MODEL"
                                      ? [
                                          _c("b", [
                                            _vm._v(_vm._s(odm.odm_gd_name)),
                                          ]),
                                          _vm._v(" "),
                                          _c("p", [
                                            _vm._v(
                                              "\r\n                                        제품명: " +
                                                _vm._s(odm.odm_gm_name) +
                                                " / 판매단위: " +
                                                _vm._s(odm.odm_gm_unit) +
                                                " "
                                            ),
                                            _c("br"),
                                            _vm._v(
                                              "\r\n                                        모델명: " +
                                                _vm._s(odm.odm_gm_code) +
                                                " / Cat.No.: " +
                                                _vm._s(odm.odm_gm_catno)
                                            ),
                                            _c("br"),
                                            _vm._v(
                                              "\r\n                                        사양: " +
                                                _vm._s(odm.odm_gm_spec) +
                                                "\r\n                                    "
                                            ),
                                          ]),
                                        ]
                                      : [
                                          _vm._v(
                                            _vm._s(odm.odm_gm_name) +
                                              ": " +
                                              _vm._s(odm.odm_gm_spec)
                                          ),
                                        ],
                                  ],
                                  2
                                ),
                                _vm._v(" "),
                                _c("b-col", { staticClass: "align" }, [
                                  _vm._v(_vm._s(odm.odm_mk_name)),
                                ]),
                                _vm._v(" "),
                                _c("b-col", { staticClass: "align end" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm._f("won")(
                                        _vm._f("comma")(odm.odm_price_add_vat)
                                      )
                                    )
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("b-col", { staticClass: "align" }, [
                                  _c("div", { staticClass: "cube_box" }, [
                                    _c(
                                      "div",
                                      {
                                        staticClass: "cube",
                                        class: { show_right: odm.show_right },
                                      },
                                      [
                                        _c(
                                          "div",
                                          { staticClass: "piece front" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm._f("comma")(odm.odm_ea)
                                              )
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "piece right" },
                                          [
                                            _c("EaInput", {
                                              model: {
                                                value: pa.order_model[odm_i],
                                                callback: function ($$v) {
                                                  _vm.$set(
                                                    pa.order_model,
                                                    odm_i,
                                                    $$v
                                                  )
                                                },
                                                expression:
                                                  "pa.order_model[odm_i]",
                                              },
                                            }),
                                          ],
                                          1
                                        ),
                                      ]
                                    ),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _c("b-col", { staticClass: "align" }, [
                                  _c(
                                    "b",
                                    { staticClass: "sum" },
                                    [
                                      _vm._v(
                                        "\r\n                                    " +
                                          _vm._s(
                                            _vm._f("won")(
                                              _vm._f("comma")(
                                                odm.odm_price_add_vat *
                                                  odm.odm_ea
                                              )
                                            )
                                          ) +
                                          "\r\n                                    "
                                      ),
                                      pa.odpa_pa_type !== "AIR" &&
                                      odm.odm_type === "MODEL"
                                        ? _c(
                                            "b-form-checkbox",
                                            {
                                              attrs: { button: "" },
                                              on: {
                                                change: function ($event) {
                                                  return _vm.DlvyAllIn(
                                                    odm.odm_id
                                                  )
                                                },
                                              },
                                              model: {
                                                value: odm.dlvy_all_in,
                                                callback: function ($$v) {
                                                  _vm.$set(
                                                    odm,
                                                    "dlvy_all_in",
                                                    $$v
                                                  )
                                                },
                                                expression: "odm.dlvy_all_in",
                                              },
                                            },
                                            [
                                              _vm._v(
                                                "\r\n                                        배송비 포함\r\n                                    "
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                    ],
                                    1
                                  ),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "b-col",
                                  { staticClass: "align" },
                                  [
                                    odm.odm_type == "MODEL"
                                      ? [
                                          odm.order_dlvy_info.oddi_receive_date
                                            ? _c(
                                                "b-badge",
                                                { staticClass: "gray" },
                                                [_vm._v("수취완료")]
                                              )
                                            : odm.order_dlvy_info
                                                .oddi_arrival_date
                                            ? _c(
                                                "b-badge",
                                                { staticClass: "green" },
                                                [_vm._v("배송완료")]
                                              )
                                            : odm.order_dlvy_info.oddi_dlvy_num
                                            ? _c(
                                                "b-button",
                                                {
                                                  staticClass: "teal",
                                                  attrs: {
                                                    href: _vm.getHref(
                                                      odm.order_dlvy_info
                                                        .oddi_dlvy_com,
                                                      odm.order_dlvy_info
                                                        .oddi_dlvy_num
                                                    ),
                                                  },
                                                },
                                                [
                                                  _vm._v(
                                                    "\r\n                                        배송추적\r\n                                    "
                                                  ),
                                                ]
                                              )
                                            : _c(
                                                "b-button",
                                                {
                                                  staticClass: "white",
                                                  on: {
                                                    click: function ($event) {
                                                      return _vm.writeDlvyInfo(
                                                        odm
                                                      )
                                                    },
                                                  },
                                                },
                                                [_vm._v("배송정보")]
                                              ),
                                        ]
                                      : _vm._e(),
                                  ],
                                  2
                                ),
                              ],
                              1
                            )
                          }),
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c("b-col", { staticClass: "dlvy_fare" }, [
                        _c("div", [
                          pa.odpa_pa_type == "AIR"
                            ? _c("p", [_vm._v("항공 운임료")])
                            : _c("p", [_vm._v("배송비")]),
                          _vm._v(
                            "\r\n                            " +
                              _vm._s(
                                _vm._f("won")(
                                  _vm._f("comma")(pa.odpa_dlvy_p_add_vat)
                                )
                              ) +
                              "\r\n                        "
                          ),
                        ]),
                      ]),
                    ],
                    1
                  )
                }),
                _vm._v(" "),
                _c(
                  "b-row",
                  { staticClass: "action" },
                  [
                    _c(
                      "b-col",
                      [
                        _vm._v("선택한 상품의 "),
                        _c(
                          "b-button",
                          {
                            staticClass: "teal ml-2",
                            on: {
                              click: function ($event) {
                                return _vm.writeDlvyInfo("bundle")
                              },
                            },
                          },
                          [_vm._v("배송정보 일괄 등록")]
                        ),
                      ],
                      1
                    ),
                  ],
                  1
                ),
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "b-container",
              { staticClass: "sum_up" },
              [
                _c(
                  "b-row",
                  { staticClass: "total" },
                  [
                    _c("b-col", [_vm._v("상품금액")]),
                    _vm._v(" "),
                    _c("b-col", [
                      _c("b", [
                        _vm._v(
                          _vm._s(
                            _vm._f("won")(
                              _vm._f("comma")(
                                _vm.od.od_gd_price + _vm.od.od_surtax
                              )
                            )
                          )
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("b-col", [_vm._v("배송료")]),
                    _vm._v(" "),
                    _c("b-col", [
                      _c("b", [
                        _vm._v(
                          _vm._s(
                            _vm._f("won")(_vm._f("comma")(_vm.od.od_dlvy_price))
                          )
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("b-col", [_vm._v("결제 예정 금액")]),
                    _vm._v(" "),
                    _c("b-col", [
                      _c("b", [
                        _vm._v(
                          _vm._s(
                            _vm._f("won")(_vm._f("comma")(_vm.od.od_all_price))
                          )
                        ),
                      ]),
                    ]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-row",
                  { staticClass: "total_sub" },
                  [
                    _c("b-col", [
                      _c(
                        "div",
                        [
                          _c("b-col", [_vm._v("상품가")]),
                          _c("b-col", [
                            _vm._v(
                              _vm._s(
                                _vm._f("won")(
                                  _vm._f("comma")(_vm.od.od_gd_price)
                                )
                              )
                            ),
                          ]),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        [
                          _c("b-col", [_vm._v("부가세")]),
                          _c("b-col", [
                            _vm._v(
                              _vm._s(
                                _vm._f("won")(_vm._f("comma")(_vm.od.od_surtax))
                              )
                            ),
                          ]),
                        ],
                        1
                      ),
                    ]),
                    _vm._v(" "),
                    _c("b-col", [
                      _c(
                        "div",
                        [
                          _c("b-col", [_vm._v("포사이언스 배송")]),
                          _c("b-col", [
                            _vm._v(_vm._s(_vm._f("comma")(_vm.dlvy_4s))),
                          ]),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        [
                          _c("b-col", [_vm._v("업체 배송")]),
                          _c("b-col", [
                            _vm._v(_vm._s(_vm._f("comma")(_vm.dlvy_other))),
                          ]),
                        ],
                        1
                      ),
                    ]),
                    _vm._v(" "),
                    _c("b-col", [
                      _c(
                        "div",
                        [
                          _c("b-col", [_vm._v("적립예정 마일리지")]),
                          _c("b-col", [
                            _vm._v(_vm._s(_vm._f("comma")(_vm.sum_mileage))),
                          ]),
                        ],
                        1
                      ),
                    ]),
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
          { staticClass: "box extra_info" },
          [
            _c(
              "b-row",
              { attrs: { tag: "h5" } },
              [_c("b-col", { attrs: { tag: "b" } }, [_vm._v("결제정보")])],
              1
            ),
            _vm._v(" "),
            _vm.od.od_pay_method == "B" || _vm.od.od_pay_method == "E"
              ? _c("table", { staticClass: "tbl_st" }, [
                  _c("tr", [
                    _c("th", [_vm._v("결제금액")]),
                    _c("td", [
                      _vm._v(
                        _vm._s(
                          _vm._f("won")(_vm._f("comma")(_vm.od.od_all_price))
                        )
                      ),
                    ]),
                    _vm._v(" "),
                    _c("th", [_vm._v("결제예정일")]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(_vm.payPlanDisplay))]),
                  ]),
                  _vm._v(" "),
                  _c("tr", [
                    _c("th", [_vm._v("결제수단")]),
                    _vm._v(" "),
                    _c("td", [
                      _vm.od.od_pay_method == "B"
                        ? _c("span", [_vm._v("계좌이체")])
                        : _vm.od.od_pay_method == "E"
                        ? _c("span", [_vm._v("에스크로")])
                        : _vm._e(),
                    ]),
                    _vm._v(" "),
                    _c("th", [_vm._v("입금계좌")]),
                    _vm._v(" "),
                    _c("td", [
                      _vm.od.order_extra_info.oex_bank == "K"
                        ? _c("span", [_vm._v("국민은행")])
                        : _vm.od.order_extra_info.oex_bank == "W"
                        ? _c("span", [_vm._v("우리은행")])
                        : _vm._e(),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("tr", [
                    _c("th", [_vm._v("입금자")]),
                    _c("td", { attrs: { colspan: "3" } }, [
                      _vm._v(_vm._s(_vm.od.order_extra_info.oex_depositor)),
                    ]),
                  ]),
                ])
              : _c("table", { staticClass: "tbl_st" }, [
                  _c("tr", [
                    _c("th", [_vm._v("결제금액")]),
                    _c("td", [
                      _vm._v(
                        _vm._s(
                          _vm._f("won")(_vm._f("comma")(_vm.od.od_all_price))
                        )
                      ),
                    ]),
                    _vm._v(" "),
                    _c("th", [_vm._v("결제예정일")]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(_vm.payPlanDisplay))]),
                  ]),
                  _vm._v(" "),
                  _c("tr", [
                    _c("th", [_vm._v("결제수단")]),
                    _vm._v(" "),
                    _c(
                      "td",
                      [
                        _vm.od.od_pay_method == "C"
                          ? _c("span", [_vm._v("카드결제")])
                          : _vm.od.od_pay_method == "P"
                          ? _c("span", [_vm._v("PSYS")])
                          : _vm.od.od_pay_method == "R"
                          ? _c("span", [_vm._v("원격결제")])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.od.order_pg
                          ? _c(
                              "b-button",
                              {
                                staticClass: "teal",
                                on: {
                                  click: function ($event) {
                                    return _vm.openWinPop(
                                      "https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=" +
                                        _vm.od.order_pg.pg_tid +
                                        "&noMethod=1",
                                      430,
                                      540
                                    )
                                  },
                                },
                              },
                              [_vm._v("매출전표")]
                            )
                          : _vm._e(),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("th", [_vm._v("카드종류")]),
                    _c("td", [_vm._v(_vm._s(_vm.od.order_pg.pg_card_com))]),
                  ]),
                  _vm._v(" "),
                  _c("tr", [
                    _c("th", [_vm._v("결과메세제")]),
                    _c("td", [_vm._v(_vm._s(_vm.od.order_pg.pg_msg))]),
                    _vm._v(" "),
                    _c("th", [_vm._v("결제자")]),
                    _c("td", [_vm._v(_vm._s(_vm.od.order_pg.pg_buyer_nm))]),
                  ]),
                ]),
            _vm._v(" "),
            _c(
              "b-row",
              { attrs: { tag: "h5" } },
              [
                _c("b-col", { attrs: { tag: "b" } }, [_vm._v("배송정보")]),
                _c(
                  "b-col",
                  { staticClass: "text-right" },
                  [
                    _c(
                      "b-button",
                      {
                        staticClass: "teal",
                        on: {
                          click: function ($event) {
                            return _vm.update("addr")
                          },
                        },
                      },
                      [_vm._v("배송정보 수정")]
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c("table", { staticClass: "tbl_st address" }, [
              _c("tr", [
                _c("th", [_vm._v("수취인")]),
                _vm._v(" "),
                _c(
                  "td",
                  [
                    _c("font-awesome-icon", {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip",
                          value: "수령인 이름 복사",
                          expression: "'수령인 이름 복사'",
                        },
                      ],
                      attrs: { icon: "copy" },
                      on: {
                        click: function ($event) {
                          return _vm.copyToClipboard(_vm.od.od_receiver)
                        },
                      },
                    }),
                    _vm._v(" "),
                    _c("div", { staticClass: "cube_box receiver" }, [
                      _c(
                        "div",
                        {
                          staticClass: "cube",
                          class: { show_right: _vm.focusInfo.od_receiver },
                        },
                        [
                          _c("div", { staticClass: "piece front" }, [
                            _vm._v(_vm._s(_vm.od.od_receiver)),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "piece right" },
                            [
                              _c("b-form-input", {
                                attrs: { size: "sm" },
                                on: {
                                  focus: function ($event) {
                                    _vm.focusInfo.od_receiver = true
                                  },
                                  blur: function ($event) {
                                    _vm.focusInfo.od_receiver = false
                                  },
                                },
                                model: {
                                  value: _vm.od.od_receiver,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.od, "od_receiver", $$v)
                                  },
                                  expression: "od.od_receiver",
                                },
                              }),
                            ],
                            1
                          ),
                        ]
                      ),
                    ]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("th", [_vm._v("전화번호")]),
                _vm._v(" "),
                _c(
                  "td",
                  [
                    _c("font-awesome-icon", {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip",
                          value: "수령인 번호 복사",
                          expression: "'수령인 번호 복사'",
                        },
                      ],
                      attrs: { icon: "copy" },
                      on: {
                        click: function ($event) {
                          return _vm.copyToClipboard(_vm.od.od_receiver_hp)
                        },
                      },
                    }),
                    _vm._v(" "),
                    _c("div", { staticClass: "cube_box receiver_hp" }, [
                      _c(
                        "div",
                        {
                          staticClass: "cube",
                          class: { show_right: _vm.focusInfo.od_receiver_hp },
                        },
                        [
                          _c("div", { staticClass: "piece front" }, [
                            _vm._v(_vm._s(_vm.od.od_receiver_hp)),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "piece right" },
                            [
                              _c("b-form-input", {
                                attrs: { size: "sm" },
                                on: {
                                  focus: function ($event) {
                                    _vm.focusInfo.od_receiver_hp = true
                                  },
                                  blur: function ($event) {
                                    _vm.focusInfo.od_receiver_hp = false
                                  },
                                },
                                model: {
                                  value: _vm.od.od_receiver_hp,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.od, "od_receiver_hp", $$v)
                                  },
                                  expression: "od.od_receiver_hp",
                                },
                              }),
                            ],
                            1
                          ),
                        ]
                      ),
                    ]),
                  ],
                  1
                ),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("th", [_vm._v("배송주소")]),
                _vm._v(" "),
                _c(
                  "td",
                  { attrs: { colspan: "3" } },
                  [
                    _c("font-awesome-icon", {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip",
                          value: "수령인 주소 복사",
                          expression: "'수령인 주소 복사'",
                        },
                      ],
                      attrs: { icon: "copy" },
                      on: {
                        click: function ($event) {
                          return _vm.copyToClipboard(_vm.od.od_addr1)
                        },
                      },
                    }),
                    _vm._v(" "),
                    _c("div", { staticClass: "cube_box receiver_addr" }, [
                      _c("div", { staticClass: "cube" }, [
                        _c("div", { staticClass: "piece front" }, [
                          _vm._v(_vm._s(_vm.od.od_zip)),
                          _c("b", [_vm._v(",")]),
                          _vm._v(" " + _vm._s(_vm.od.od_addr1)),
                          _c("b", [_vm._v(",")]),
                          _vm._v(" " + _vm._s(_vm.od.od_addr2)),
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "piece right" },
                          [
                            _c(
                              "b-button",
                              {
                                staticClass: "teal ml-4",
                                on: {
                                  click: function ($event) {
                                    ;(_vm.isModalViewed = !_vm.isModalViewed),
                                      (_vm.modalType = "postCode")
                                  },
                                },
                              },
                              [_vm._v("주소검색")]
                            ),
                          ],
                          1
                        ),
                      ]),
                    ]),
                  ],
                  1
                ),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("th", [_vm._v("배송시 요구사항")]),
                _c("td", { attrs: { colspan: "3" } }, [
                  _vm._v(_vm._s(_vm.od.od_memo)),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c(
              "b-row",
              { attrs: { tag: "h5" } },
              [_c("b-col", { attrs: { tag: "b" } }, [_vm._v("요청서류")])],
              1
            ),
            _vm._v(" "),
            _c(
              "table",
              { staticClass: "tbl_st" },
              [
                _c("tr", [
                  _c("th", [_vm._v("요청서류")]),
                  _vm._v(" "),
                  _c("td", { attrs: { colspan: "3" } }, [
                    _vm._v(_vm._s(_vm.reqDocumentDisplay)),
                  ]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("th", [_vm._v("첨부서류 메모")]),
                  _c("td", {
                    attrs: { colspan: "3" },
                    domProps: {
                      innerHTML: _vm._s(_vm.od.order_extra_info.oex_memo),
                    },
                  }),
                ]),
                _vm._v(" "),
                _vm.od.od_pay_method == "B" || _vm.od.od_pay_method == "E"
                  ? [
                      _vm.od.order_extra_info.oex_type == "IV"
                        ? [
                            _vm.od.file_info
                              ? _c("tr", [
                                  _c("th", [_vm._v("사업자등록증")]),
                                  _vm._v(" "),
                                  _c(
                                    "td",
                                    [
                                      _vm.checkImage(_vm.od.file_info.fi_ext)
                                        ? _c(
                                            "b-button",
                                            {
                                              on: {
                                                click: function ($event) {
                                                  ;(_vm.isModalViewed =
                                                    !_vm.isModalViewed),
                                                    (_vm.modalType = "blView")
                                                },
                                              },
                                            },
                                            [_vm._v("사업자 등록증 보기")]
                                          )
                                        : _c(
                                            "b-button",
                                            {
                                              on: {
                                                click: function ($event) {
                                                  return _vm.fileDown(
                                                    _vm.od.file_info.down_path,
                                                    _vm.od.file_info.fi_original
                                                  )
                                                },
                                              },
                                            },
                                            [_vm._v("사업자 등록증 다운로드")]
                                          ),
                                    ],
                                    1
                                  ),
                                ])
                              : [
                                  _c("tr", [
                                    _c("th", [_vm._v("법인명")]),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(
                                          _vm.od.order_extra_info.oex_biz_name
                                        )
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("사업자등록번호")]),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(
                                          _vm.od.order_extra_info.oex_biz_num
                                        )
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("대표자")]),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(_vm.od.order_extra_info.oex_ceo)
                                      ),
                                    ]),
                                  ]),
                                  _vm._v(" "),
                                  _c("tr", [
                                    _c("th", [_vm._v("주소")]),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(_vm.od.order_extra_info.oex_addr)
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("업태")]),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(
                                          _vm.od.order_extra_info.oex_biz_type
                                        )
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _c("th", [_vm._v("업종")]),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(
                                          _vm.od.order_extra_info.oex_biz_item
                                        )
                                      ),
                                    ]),
                                  ]),
                                ],
                            _vm._v(" "),
                            _c("tr", [
                              _c("th", [_vm._v("담당자 이름")]),
                              _c("td", [
                                _vm._v(_vm._s(_vm.od.order_extra_info.oex_mng)),
                              ]),
                              _vm._v(" "),
                              _c("th", [_vm._v("담당자 메일")]),
                              _c("td", [
                                _vm._v(
                                  _vm._s(_vm.od.order_extra_info.oex_email)
                                ),
                              ]),
                              _vm._v(" "),
                              _c("th", [_vm._v("담당자 번호")]),
                              _c("td", [
                                _vm._v(_vm._s(_vm.od.order_extra_info.oex_num)),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("th", [_vm._v("세금계산서 발급시 요구사항")]),
                              _c("td", {
                                attrs: { colspan: "5" },
                                domProps: {
                                  innerHTML: _vm._s(
                                    _vm.od.order_extra_info.oex_requirement
                                  ),
                                },
                              }),
                            ]),
                          ]
                        : _vm.od.order_extra_info.oex_type == "IVNO"
                        ? _c("tr", [
                            _c("th", [_vm._v("지출 증빙 서류")]),
                            _vm._v(" "),
                            _c("td", { attrs: { colspan: "5" } }, [
                              _vm._v("세금계산서 입력안함"),
                            ]),
                          ])
                        : _vm.od.order_extra_info.oex_type == "NO"
                        ? _c("tr", [
                            _c("th", [_vm._v("지출 증빙 서류")]),
                            _vm._v(" "),
                            _c("td", { attrs: { colspan: "5" } }, [
                              _vm._v("미발급"),
                            ]),
                          ])
                        : _c("tr", [
                            _c("th", [
                              _vm._v(
                                "\r\n                            지출 증빙 서류"
                              ),
                              _c("br"),
                              _vm._v(
                                "\r\n                            (\r\n                                "
                              ),
                              _vm.od.order_extra_info.oex_type == "HP"
                                ? _c("span", [_vm._v("휴대폰번호")])
                                : _vm.od.order_extra_info.oex_type == "IN"
                                ? _c("span", [_vm._v("주민등록번호")])
                                : _vm.od.order_extra_info.oex_type == "CN"
                                ? _c("span", [_vm._v("카드번호")])
                                : _vm.od.order_extra_info.oex_type == "BN"
                                ? _c("span", [_vm._v("사업자번호")])
                                : _vm._e(),
                              _vm._v(
                                "\r\n                            )\r\n                        "
                              ),
                            ]),
                            _vm._v(" "),
                            _c("td", { attrs: { colspan: "5" } }, [
                              _vm._v(_vm._s(_vm.od.order_extra_info.oex_num)),
                            ]),
                          ]),
                    ]
                  : _vm._e(),
              ],
              2
            ),
          ],
          1
        ),
      ]),
      _vm._v(" "),
      _c(
        "transition",
        { attrs: { name: "modal" } },
        [
          _vm.isModalViewed
            ? _c(
                "Modal",
                {
                  attrs: { max_width: 600 },
                  on: {
                    "close-modal": function ($event) {
                      _vm.isModalViewed = false
                    },
                  },
                },
                [
                  _vm.modalType == "blView"
                    ? [
                        _c("template", { slot: "header" }, [
                          _vm._v("사업자 등록증 보기"),
                        ]),
                        _vm._v(" "),
                        _c("img", {
                          staticStyle: { "max-width": "100%", height: "auto" },
                          attrs: { src: _vm.od.file_info.path },
                          on: {
                            click: function ($event) {
                              return _vm.fileDown(
                                _vm.od.file_info.down_path,
                                _vm.od.file_info.fi_original
                              )
                            },
                          },
                        }),
                      ]
                    : _vm.modalType == "postCode"
                    ? [
                        _c("template", { slot: "header" }, [
                          _vm._v("우편번호 검색"),
                        ]),
                        _vm._v(" "),
                        _c("VueDaumPostcode", {
                          staticClass: "shadow mt-3",
                          attrs: { animation: true },
                          on: { complete: _vm.onPostcodeSlt },
                        }),
                      ]
                    : _vm.modalType == "postDetail"
                    ? [
                        _c("template", { slot: "header" }, [
                          _vm._v("배송지 변경"),
                        ]),
                        _vm._v(" "),
                        _c(
                          "b-container",
                          { staticClass: "adform layerModal" },
                          [
                            _c(
                              "b-row",
                              [
                                _c("b-col", { staticClass: "label" }, [
                                  _vm._v("우편번호"),
                                ]),
                                _vm._v(" "),
                                _c("b-col", [_vm._v(_vm._s(_vm.od.od_zip))]),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-row",
                              [
                                _c("b-col", { staticClass: "label" }, [
                                  _vm._v("주소"),
                                ]),
                                _vm._v(" "),
                                _c("b-col", [_vm._v(_vm._s(_vm.od.od_addr1))]),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-row",
                              [
                                _c("b-col", { staticClass: "label" }, [
                                  _vm._v("상세 주소"),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "b-col",
                                  [
                                    _c("b-form-input", {
                                      on: {
                                        keyup: function ($event) {
                                          if (
                                            !$event.type.indexOf("key") &&
                                            _vm._k(
                                              $event.keyCode,
                                              "enter",
                                              13,
                                              $event.key,
                                              "Enter"
                                            )
                                          ) {
                                            return null
                                          }
                                          _vm.isModalViewed = false
                                        },
                                      },
                                      model: {
                                        value: _vm.od.od_addr2,
                                        callback: function ($$v) {
                                          _vm.$set(_vm.od, "od_addr2", $$v)
                                        },
                                        expression: "od.od_addr2",
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
                              [
                                _c(
                                  "b-col",
                                  { staticClass: "ctrl" },
                                  [
                                    _c(
                                      "b-button",
                                      {
                                        on: {
                                          click: function ($event) {
                                            _vm.isModalViewed = false
                                          },
                                        },
                                      },
                                      [_vm._v("완료")]
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
                      ]
                    : _vm.modalType == "sendTransaction"
                    ? [
                        _c("template", { slot: "header" }, [
                          _vm._v("거래명세서 PDF 발송"),
                        ]),
                        _vm._v(" "),
                        _c(
                          "b-container",
                          { staticClass: "adform layerModal" },
                          [
                            _c(
                              "b-row",
                              [
                                _c("b-col", { staticClass: "label" }, [
                                  _vm._v("공급 날짜"),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "b-col",
                                  [
                                    _c(
                                      "b-input-group",
                                      { attrs: { size: "sm" } },
                                      [
                                        _c("b-form-input", {
                                          attrs: {
                                            placeholder: "YYYY-MM-DD",
                                            autocomplete: "off",
                                            formatter: _vm.format_date,
                                          },
                                          model: {
                                            value: _vm.od.trans_date,
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.od,
                                                "trans_date",
                                                $$v
                                              )
                                            },
                                            expression: "od.trans_date",
                                          },
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "b-input-group-append",
                                          [
                                            _c("b-form-datepicker", {
                                              attrs: {
                                                size: "sm",
                                                "button-only": "",
                                                right: "",
                                              },
                                              model: {
                                                value: _vm.od.trans_date,
                                                callback: function ($$v) {
                                                  _vm.$set(
                                                    _vm.od,
                                                    "trans_date",
                                                    $$v
                                                  )
                                                },
                                                expression: "od.trans_date",
                                              },
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
                            _vm._v(" "),
                            _c(
                              "b-row",
                              [
                                _c("b-col", { staticClass: "label" }, [
                                  _vm._v("공급 받는자"),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "b-col",
                                  [
                                    _c("b-form-input", {
                                      model: {
                                        value: _vm.od.trans_receive,
                                        callback: function ($$v) {
                                          _vm.$set(_vm.od, "trans_receive", $$v)
                                        },
                                        expression: "od.trans_receive",
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
                              [
                                _c("b-col", { staticClass: "label" }, [
                                  _vm._v("받을 Email"),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "b-col",
                                  [
                                    _c("b-form-input", {
                                      on: {
                                        keyup: function ($event) {
                                          if (
                                            !$event.type.indexOf("key") &&
                                            _vm._k(
                                              $event.keyCode,
                                              "enter",
                                              13,
                                              $event.key,
                                              "Enter"
                                            )
                                          ) {
                                            return null
                                          }
                                          return _vm.sendTransaction.apply(
                                            null,
                                            arguments
                                          )
                                        },
                                      },
                                      model: {
                                        value: _vm.od.trans_email,
                                        callback: function ($$v) {
                                          _vm.$set(_vm.od, "trans_email", $$v)
                                        },
                                        expression: "od.trans_email",
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
                              [
                                _c(
                                  "b-col",
                                  { staticClass: "ctrl" },
                                  [
                                    _c(
                                      "b-button",
                                      { on: { click: _vm.sendTransaction } },
                                      [_vm._v("발송")]
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
                      ]
                    : _vm.modalType == "dlvyInfo"
                    ? [
                        _c("template", { slot: "header" }, [
                          _vm._v("배송 정보 등록"),
                        ]),
                        _vm._v(" "),
                        _c(
                          "b-container",
                          { staticClass: "adform layerModal" },
                          [
                            _c(
                              "b-row",
                              [
                                _c("b-col", { staticClass: "label" }, [
                                  _vm._v("운송사"),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "b-col",
                                  [
                                    _c(
                                      "b-form-select",
                                      {
                                        attrs: { size: "sm" },
                                        model: {
                                          value: _vm.dlvy_info.company,
                                          callback: function ($$v) {
                                            _vm.$set(
                                              _vm.dlvy_info,
                                              "company",
                                              $$v
                                            )
                                          },
                                          expression: "dlvy_info.company",
                                        },
                                      },
                                      _vm._l(
                                        _vm.od.order_config.delivery_com,
                                        function (v, k) {
                                          return _c(
                                            "b-form-select-option",
                                            { key: k, attrs: { value: k } },
                                            [_vm._v(_vm._s(k))]
                                          )
                                        }
                                      ),
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
                                _c("b-col", { staticClass: "label" }, [
                                  _vm._v("송장번호"),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "b-col",
                                  [
                                    _c("b-form-input", {
                                      model: {
                                        value: _vm.dlvy_info.number,
                                        callback: function ($$v) {
                                          _vm.$set(_vm.dlvy_info, "number", $$v)
                                        },
                                        expression: "dlvy_info.number",
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
                              [
                                _c(
                                  "b-col",
                                  [
                                    _c(
                                      "b-button",
                                      {
                                        attrs: { variant: "success" },
                                        on: {
                                          click: function ($event) {
                                            return _vm.update("arrival")
                                          },
                                        },
                                      },
                                      [_vm._v("배송완료")]
                                    ),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-col",
                                  { staticClass: "ctrl" },
                                  [
                                    _c(
                                      "b-button",
                                      {
                                        on: {
                                          click: function ($event) {
                                            return _vm.update("dlvy")
                                          },
                                        },
                                      },
                                      [_vm._v("등록")]
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
                      ]
                    : _vm._e(),
                ],
                2
              )
            : _vm._e(),
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