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
        user: {},
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
      var plan = this.od.order_extra_info ? this.od.order_extra_info.oex_pay_plan : '';
      var returnMsg = '';
      if (plan == 'soon') returnMsg = '선 결제';else if (plan == 'week1') returnMsg = '1주이내 결제';else if (plan == 'week2') returnMsg = '2주이내 결제';else if (plan == 'month1') returnMsg = '한달이내 결제';else if (plan == 'month2') returnMsg = '2개월이내 결제';else if (plan == 'dlvy') returnMsg = '납품시 결제';else returnMsg = plan;
      return returnMsg;
    },
    reqDocumentDisplay: function reqDocumentDisplay() {
      var req = new Array();
      if (this.od.order_extra_info.oex_type == 'IV') req.push('세금계산서');

      if (this.od.order_extra_info) {
        if (this.od.order_extra_info.oex_req_est == 'Y') req.push('견적서');
        if (this.od.order_extra_info.oex_req_tran == 'Y') req.push('거래명세서');
        if (this.od.order_extra_info.oex_req_biz == 'Y') req.push('사업자등록증사본');
        if (this.od.order_extra_info.oex_req_bank == 'Y') req.push('통장사본');
      }

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
      var f_k = this.od.od_id;
      if (this.od.od_er_id > 0) f_k = this.od.od_er_id;

      switch (this.document_type) {
        case 'est_e':
          this.estimateExcel(f_k + '_estimate');
          break;

        case 'est_p':
          this.estimatePdf(f_k + '_estimate');
          break;

        case 'tra_e':
          this.transactionExcel(this.od.od_id + '_statement');
          break;

        case 'tra_p':
          this.transactionPdf(this.od.od_id + '_statement');
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
                  styles: ['https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css', '/css/fontawesome_svg.css', '/css/adm_shop_order_edit.css?ver=1.6']
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    estimateExcel: function estimateExcel(nm) {
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

                _this4.orderDocumentDown(res, nm + '.xlsx');

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
    estimatePdf: function estimatePdf(nm) {
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

                _this5.orderDocumentDown(res, nm + '.pdf');

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
    transactionExcel: function transactionExcel(nm) {
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

                _this6.orderDocumentDown(res, nm + '.xlsx');

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
    transactionPdf: function transactionPdf(nm) {
      var _arguments2 = arguments,
          _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        var query, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                query = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : '';
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
                    _this7.orderDocumentDown(res, nm + '.pdf');

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
      this.transactionPdf(this.od.od_id + '_statement', "trans_date=".concat(this.od.trans_date, "&trans_receive=").concat(this.od.trans_receive, "&trans_email=").concat(this.od.trans_email, "&trans_mng_email=").concat(this.od.mng.email));
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
        //  일괄등록이 아니라면
        odm.dlvy_chk = 'Y';

        var _iterator = _createForOfIteratorHelper(this.od.order_purchase_at),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var opa = _step.value;
            //  모든 제품을 확인해서 내가 누를 품목이 아니라면 체크 해제
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_public_css_adm_shop_order_edit_css_ver_1_4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! -!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../public/css/adm_shop_order_edit.css?ver=1.4 */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./public/css/adm_shop_order_edit.css?ver=1.4");
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_public_css_adm_shop_order_edit_css_ver_1_4__WEBPACK_IMPORTED_MODULE_1__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.p_wrap[data-v-ca63be56] { padding-top:1rem;\n}\n.p_wrap .print_mng_nm[data-v-ca63be56] { display:none;\n}\n.p_wrap .print_hide[data-v-ca63be56] { display:block !important;\n}\n.p_wrap .print_hide_flex[data-v-ca63be56] { display:flex !important;\n}\n.p_wrap .print_hide_inline_block[data-v-ca63be56] { display:inline-block !important;\n}\n.p_wrap .box .goods .gd_con .row .col .sum[data-v-ca63be56] .btn-group-toggle { display:block !important; text-align:center;\n}\n.p_wrap .box .goods .gd_con .row .col .sum[data-v-ca63be56] .btn-group-toggle .btn { background-color:#fff; color:#6F6F6F; border-color:#aaa; border-radius:2rem; padding:.17rem 0.7rem; font-size:.75rem;\n}\n.p_wrap .box .goods .gd_con .row .col .sum[data-v-ca63be56] .btn-group-toggle .btn.active { color:#fff; background-color:#4EB8C8;\n}\n.p_wrap .box .goods .gd_con .row .col[data-v-ca63be56]:nth-child(7) { border-right-width:1px;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./public/css/adm_shop_order_edit.css?ver=1.4":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./public/css/adm_shop_order_edit.css?ver=1.4 ***!
  \******************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".p_wrap { margin:1rem; }\r\n\r\n.p_wrap h5 { font-size:1.54rem; padding: 0.4rem 0 0 0.65rem; margin-bottom: 1rem !important; }\r\n.p_wrap h5 b { position:relative; bottom:-2px; }\r\n.p_wrap .container { max-width:100%; }\r\n.p_wrap .container,\r\n.p_wrap .row .col { padding:0; }\r\n.p_wrap .adform .row > div:not(.tit) { padding: 8px 5px; }\r\n.p_wrap .row,\r\n.p_wrap .row .col p { margin:0; }\r\n.p_wrap .h3 h3 { margin:0 0 .5rem 3rem }\r\n.p_wrap .h3 div { text-align:right; }\r\n.p_wrap .h3 div .btn { border-color:#000; font-weight:600; }\r\n\r\n.p_wrap .print_hide,\r\n.p_wrap .print_hide_flex,\r\n.p_wrap .print_hide_inline_block { display:none !important; }\r\n.p_wrap .btn.teal { font-size:.9rem; padding:.5rem 0.75rem 0.3rem; }\r\n\r\n.p_wrap .act_ctrl { background-color: #fff; border: 5px solid #4eb8c8; border-radius: 1rem; padding: 8px; position: -webkit-sticky; position: sticky; top: 0; z-index: 3; }\r\n.p_wrap .act_ctrl .def_info { line-height:1.9; }\r\n.p_wrap .act_ctrl .def_info span { margin-left: 2rem; }\r\n.p_wrap .act_ctrl .def_info b { font-weight:900; margin-left:.5rem; }\r\n.p_wrap .act_ctrl .btn_area { display:flex; justify-content:flex-end; }\r\n.p_wrap .act_ctrl .btn_area>* { margin-left:.5%; margin-right:.5%; }\r\n.p_wrap .act_ctrl .btn_area .input-group { max-width:170px; }\r\n.p_wrap .print_mng_nm { top:0; position:absolute; left:50%; transform:translateX(-50%); font-size:3rem; z-index:4; }\r\n.p_wrap .box { border:5px solid #EBEBEB; border-radius:1rem; padding:2rem; margin:2rem 0; }\r\n.p_wrap .box .top_border { border-top:3px solid #4F637B; }\r\n.p_wrap .box .goods .pa_tit { flex:0 0 9%; max-width:9%; border-right:1px solid #D7D7D7; border-bottom:1px solid #D7D7D7; align-items:center; display:flex; text-align:center; justify-content:center; }\r\n.p_wrap .box .goods .gd_con .row.option { background-color:#F4F1EC; }\r\n.p_wrap .box .goods .gd_con .row .col { border-bottom:1px solid #D7D7D7; padding:.68rem; font-size:.85rem; }\r\n.p_wrap .box .goods .gd_con .row .col.align { display:flex; align-items:center; justify-content:center; }\r\n.p_wrap .box .goods .gd_con .row:not(:first-child) .end { justify-content:flex-end; }\r\n.p_wrap .box .goods .gd_con .row:not(:first-child) .col { color:#AEAEAE; }\r\n.p_wrap .box .goods .gd_con .row:not(:first-child) .col .btn { color:#AEAEAE; font-size:.9rem; }\r\n.p_wrap .box .goods .gd_con .row .col b { color:#000; font-size:.95rem; }\r\n\r\n.p_wrap .box .goods .gd_con .row:first-child .col { font-weight:600; line-height:1.7; padding:.86rem 0; font-size:.9rem; text-align:center; }\r\n.p_wrap .box .goods .gd_con .row .col:nth-child(1) { flex:0 0 4.5%; max-width:4.5%; }\r\n.p_wrap .box .goods .gd_con .row .col:nth-child(2) { flex:0 0 7%; max-width:7%; }\r\n.p_wrap .box .goods .gd_con .row .col:nth-child(3) { border-right:1px solid #D7D7D7; }\r\n.p_wrap .box .goods .gd_con .row .col:nth-child(4) { flex:0 0 9%; max-width:9%; border-right:1px solid #D7D7D7; }\r\n.p_wrap .box .goods .gd_con .row .col:nth-child(5) { flex:0 0 11%; max-width:11%; border-right:1px solid #D7D7D7; }\r\n.p_wrap .box .goods .gd_con .row .col:nth-child(6) { flex:0 0 9%; max-width:9%; border-right:1px solid #D7D7D7; }\r\n.p_wrap .box .goods .gd_con .row .col:nth-child(7) { flex:0 0 13%; max-width:13%; border-right:0px solid #D7D7D7; }\r\n.p_wrap .box .goods .gd_con .row .col:nth-child(8) { flex:0 0 9%; max-width:9%; }\r\n    \r\n.p_wrap .box .goods .gd_con .row .col img { width:100%; cursor:pointer; }\r\n.p_wrap .box .goods .gd_con .row .col >>> .myCheck .custom-control-label::before, \r\n.p_wrap .box .goods .gd_con .row .col >>> .myCheck .custom-control-label::after { width:1.8rem; height:1.8rem; top:-2px; }\r\n.p_wrap .box .goods .gd_con .row .col .sum { text-align:right; width:100%; line-height:2; }\r\n.p_wrap .box .goods .gd_con .row .col.desc.option { display:flex; align-items:center; }\r\n.p_wrap .box .goods .dlvy_fare { flex:0 0 9%; max-width:9%; align-items: center; display: flex; text-align: center; justify-content: center; border-left: 1px solid #D7D7D7; border-bottom:1px solid #D7D7D7; color:#AEAEAE; }\r\n\r\n.p_wrap .box .action { padding:1.5rem 3rem; font-weight:600; }\r\n\r\n.p_wrap .box .sum_up .total { border-bottom:1px solid #D6D6D6; }\r\n.p_wrap .box .sum_up .total .col { color:#000; font-weight:bold; }\r\n.p_wrap .box .sum_up .total .col b { font-size:1.3vw; }\r\n.p_wrap .box .sum_up .total .col:nth-of-type(odd) { display:flex; align-items:center; flex-basis:12%; max-width:12%; padding:1vw 0 1vw 2vw; font-size:.9vw; }\r\n.p_wrap .box .sum_up .total .col:nth-of-type(even) { text-align:right; padding:1vw 2vw 1vw 0; }\r\n.p_wrap .box .sum_up .total .col:nth-of-type(2):after,\r\n.p_wrap .box .sum_up .total .col:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; position:absolute; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.32rem; top:50%; transform:translateY(-50%); }\r\n.p_wrap .box .sum_up .total .col:nth-of-type(2),\r\n.p_wrap .box .sum_up .total .col:nth-of-type(4) { border-right:1px solid #D6D6D6; }\r\n.p_wrap .box .sum_up .total .col:nth-of-type(2):after { content:\"+\"; }\r\n.p_wrap .box .sum_up .total .col:nth-of-type(4):after { content:\"=\"; }\r\n.p_wrap .box .sum_up .total .col:nth-of-type(5) { flex-basis:16%; max-width:16%; }\r\n.p_wrap .box .sum_up .total .col:nth-of-type(6) { flex-basis:24%; max-width:24%; }\r\n.p_wrap .box .sum_up .total_sub { background:#F2F3F5; border-bottom-width:0; }\r\n.p_wrap .box .sum_up .total_sub>.col:nth-of-type(1) { border-right:1px solid #D6D6D6; }\r\n.p_wrap .box .sum_up .total_sub>.col:nth-of-type(2) { border-right:1px solid #D6D6D6; }\r\n.p_wrap .box .sum_up .total_sub>.col:nth-of-type(3) { flex-basis:40%; max-width:40%; }\r\n.p_wrap .box .sum_up .total_sub .col>div { display:flex; flex-wrap:wrap; }\r\n.p_wrap .box .sum_up .total_sub .col>div:nth-of-type(1) { padding:1rem 2rem .5rem 2rem; }\r\n.p_wrap .box .sum_up .total_sub .col>div:nth-of-type(2) { padding:0 2rem 1rem 2rem; }\r\n.p_wrap .box .sum_up .total_sub .col>div .col { color:#A8A9AB; font-weight:bold; font-size:.84rem; }\r\n.p_wrap .box .sum_up .total_sub .col>div .col:nth-of-type(2) { text-align:right; }\r\n\r\n.p_wrap .extra_info table { width:100%; border-top:3px solid #4F637B; border-bottom:3px solid #4F637B; margin-bottom:2.5rem; }\r\n.p_wrap .extra_info table tr th { background-color:#F2F3F5; width:13%; text-align:center; padding:.55rem 0.3rem; font-size:.95rem; }\r\n.p_wrap .extra_info table tr td { padding-left:2rem; }\r\n.p_wrap .extra_info table tr th,\r\n.p_wrap .extra_info table tr td { font-size:.9rem; border-bottom:1px solid #D7D7D7; border-right:1px solid #D7D7D7; }\r\n.p_wrap .extra_info table tr:last-child td { border-right-width:0; }\r\n.p_wrap .extra_info table tr td .btn { padding:.3rem .75rem .1rem; }\r\n.p_wrap .extra_info .address .warning { color:#FF0000; position:absolute; right:0; font-size:.8rem; }\r\n.cube_box { display:inline-block; vertical-align:middle; margin-left:1rem !important; }\r\n.cube_box, \r\n.cube_box * { box-sizing: border-box; }\r\n.cube_box { /*perspective:400px;*/ margin:auto; }\r\n.cube_box .cube { position: relative; transform-style: preserve-3d; transform: translateZ(-50px); transition: transform .2s; }\r\n.cube_box .cube .piece { position:absolute; }\r\n.cube_box,\r\n.cube_box .cube,\r\n.cube_box .cube .piece { width:100%; max-width:40px; height:30px; }\r\n.cube_box .cube .piece.front { transform: rotateY(  0deg) translateZ(20px); line-height:2; padding-left:.6rem; }\r\n/* .cube_box .cube .piece.right { transform: rotateY( 90deg) translateZ(20px); display:block; } */\r\n.cube_box .cube .piece.bottom { transform: rotateX(-90deg) translateZ(30px); display:block; }\r\n.cube_box .cube.show_front  { transform: translateZ(-50px) rotateY(   0deg); }\r\n/* .cube_box .cube.show_right,\r\n.cube_box .cube:hover  { transform: translateZ(-50px) rotateY( -90deg); } */\r\n.cube_box .cube.show_bottom,\r\n.cube_box .cube:hover{ transform: translateZ(-30px) rotateX(  90deg); }\r\n\r\ntable tr td svg { cursor:pointer; font-size:1.2rem; vertical-align:middle; }\r\n.cube_box.receiver,\r\n.cube_box.receiver .cube,\r\n.cube_box.receiver .cube .piece { max-width:150px; }\r\n.cube_box.receiver_hp,\r\n.cube_box.receiver_hp .cube,\r\n.cube_box.receiver_hp .cube .piece { max-width:250px; }\r\n.layerModal .row .ctrl { text-align:right; }", ""]);
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
  return _c("div", { attrs: { id: "print_area" } }, [
    _c(
      "div",
      { staticClass: "p_wrap" },
      [
        _c("h3", { staticClass: "p_tit" }, [_vm._v("주문 상세")]),
        _vm._v(" "),
        _vm.od.od_mng > 0
          ? _c("div", { staticClass: "print_mng_nm" }, [
              _vm._v(_vm._s(_vm.od.mng.name)),
            ])
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "act_ctrl" },
          [
            _c(
              "b-row",
              { attrs: { cols: "1", "cols-md": "2" } },
              [
                _c("b-col", { staticClass: "def_info" }, [
                  _c("span", [_vm._v("No.")]),
                  _vm._v(" "),
                  _c("b", [_vm._v(_vm._s(_vm.od.od_id) + ".")]),
                  _vm._v(" "),
                  _c("span", [_vm._v("주문번호")]),
                  _vm._v(" "),
                  _c("b", [_vm._v(_vm._s(_vm.od.od_no))]),
                  _vm._v(" "),
                  _c("span", [_vm._v("주문날짜")]),
                  _vm._v(" "),
                  _c("b", [
                    _vm._v(
                      _vm._s(_vm._f("formatDate_YYYY_MM_DD")(_vm.od.created_at))
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c(
                  "b-col",
                  { staticClass: "btn_area print_hide_flex" },
                  [
                    _c(
                      "b-button",
                      {
                        staticClass: "white sm",
                        attrs: { to: { name: "adm_order_index" } },
                      },
                      [_c("b-icon-list"), _vm._v(" 목록으로")],
                      1
                    ),
                    _vm._v(" "),
                    _vm.od.od_mng < 1
                      ? _c(
                          "b-button",
                          {
                            staticClass: "sky sm",
                            on: {
                              click: function ($event) {
                                return _vm.update("od_mng")
                              },
                            },
                          },
                          [_vm._v("담당")]
                        )
                      : _c("b-button", { staticClass: "sky sm" }, [
                          _vm._v(_vm._s(_vm.od.mng.name)),
                        ]),
                    _vm._v(" "),
                    _vm.od.od_has_ledger == "N"
                      ? _c(
                          "b-button",
                          {
                            staticClass: "d_gray sm",
                            on: { click: _vm.ledger },
                          },
                          [
                            _c("b-icon-box-arrow-up-right"),
                            _vm._v(" 영업장부"),
                          ],
                          1
                        )
                      : _c("b-button", { staticClass: "d_gray sm" }, [
                          _vm._v("장부등록됨"),
                        ]),
                    _vm._v(" "),
                    _c(
                      "b-button",
                      { staticClass: "gray sm", on: { click: _vm.print } },
                      [_c("b-icon-printer"), _vm._v(" 인쇄")],
                      1
                    ),
                    _vm._v(" "),
                    _vm.od.od_mng
                      ? _c(
                          "b-input-group",
                          { attrs: { size: "sm" } },
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
                                    staticClass: "d_gray sm",
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
                      : _c("b-button", { staticClass: "gray sm" }, [
                          _vm._v("파일 받기 담당 등록 후..."),
                        ]),
                    _vm._v(" "),
                    _c(
                      "b-input-group",
                      { attrs: { size: "sm" } },
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
                                staticClass: "d_gray sm",
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
        _c(
          "div",
          { staticClass: "box extra_info" },
          [
            _c(
              "b-row",
              { attrs: { tag: "h5" } },
              [_c("b-col", { attrs: { tag: "b" } }, [_vm._v("주문자정보")])],
              1
            ),
            _vm._v(" "),
            _c("table", { staticClass: "tbl_st address mb-0" }, [
              _c("tr", [
                _c("th", [_vm._v("주문자")]),
                _c(
                  "td",
                  [
                    _vm.od.created_id
                      ? _c(
                          "b-link",
                          {
                            attrs: {
                              to: {
                                name: "adm_user_edit",
                                params: { id: _vm.od.created_id },
                              },
                            },
                          },
                          [_vm._v(_vm._s(_vm.od.od_orderer))]
                        )
                      : _vm._e(),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("th", [_vm._v("전화번호")]),
                _c("td", [_vm._v(_vm._s(_vm.od.od_orderer_hp))]),
                _vm._v(" "),
                _c("th", [_vm._v("이메일")]),
                _c("td", [_vm._v(_vm._s(_vm.od.od_orderer_email))]),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("th", [_vm._v("소속")]),
                _c("td", { attrs: { colspan: "5" } }, [
                  _vm._v(_vm._s(_vm.od.od_department) + " "),
                ]),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("th", [_vm._v("직장 / 학교")]),
                _c("td", [_vm._v(_vm._s(_vm.od.user.office) + " ")]),
                _vm._v(" "),
                _c("th", [_vm._v("부서 / 학과 / 연구실")]),
                _c("td", { attrs: { colspan: "3" } }, [
                  _vm._v(_vm._s(_vm.od.user.department) + " "),
                ]),
              ]),
            ]),
          ],
          1
        ),
        _vm._v(" "),
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
                  { staticClass: "text-right print_hide" },
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
            _c("div", { staticClass: "top_border" }),
            _vm._v(" "),
            _vm._l(_vm.od.order_purchase_at, function (pa, pa_i) {
              return _c(
                "b-row",
                { key: "pa_" + pa_i, staticClass: "goods" },
                [
                  _c("b-col", { staticClass: "pa_tit print_hide_flex" }, [
                    pa.odpa_pa_id
                      ? _c("b", [_vm._v("업체"), _c("br"), _vm._v("직배송")])
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
                            { staticClass: "print_hide" },
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
                          _c("b-col", { staticClass: "print_hide" }),
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
                              { staticClass: "align print_hide" },
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
                                          attrs: { src: odm.img_thumb_src },
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
                                          attrs: { src: odm.img_thumb_src },
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
                                          "\r\n                                    제품명: " +
                                            _vm._s(odm.odm_gm_name) +
                                            " / 판매단위: " +
                                            _vm._s(odm.odm_gm_unit) +
                                            " "
                                        ),
                                        _c("br"),
                                        _vm._v(
                                          "\r\n                                    모델명: " +
                                            _vm._s(odm.odm_gm_code) +
                                            " / Cat.No.: " +
                                            _vm._s(odm.odm_gm_catno)
                                        ),
                                        _c("br"),
                                        _vm._v(
                                          "\r\n                                    사양: " +
                                            _vm._s(odm.odm_gm_spec) +
                                            "\r\n                                "
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
                            _c(
                              "b-col",
                              { staticClass: "align end text-right" },
                              [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("won")(
                                      _vm._f("comma")(odm.odm_price)
                                    )
                                  )
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c("b-col", { staticClass: "align" }, [
                              _c("div", { staticClass: "cube_box" }, [
                                _c(
                                  "div",
                                  {
                                    staticClass: "cube",
                                    class: { show_bottom: odm.show_bottom },
                                  },
                                  [
                                    _c("div", { staticClass: "piece front" }, [
                                      _vm._v(
                                        _vm._s(_vm._f("comma")(odm.odm_ea))
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "piece bottom" },
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
                                            expression: "pa.order_model[odm_i]",
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
                                    "\r\n                                " +
                                      _vm._s(
                                        _vm._f("won")(
                                          _vm._f("comma")(
                                            odm.odm_price * odm.odm_ea
                                          )
                                        )
                                      ) +
                                      "\r\n                                "
                                  ),
                                  pa.odpa_pa_type !== "AIR" &&
                                  odm.odm_type === "MODEL"
                                    ? _c(
                                        "b-form-checkbox",
                                        {
                                          staticClass: "print_hide",
                                          attrs: { button: "" },
                                          on: {
                                            change: function ($event) {
                                              return _vm.DlvyAllIn(odm.odm_id)
                                            },
                                          },
                                          model: {
                                            value: odm.dlvy_all_in,
                                            callback: function ($$v) {
                                              _vm.$set(odm, "dlvy_all_in", $$v)
                                            },
                                            expression: "odm.dlvy_all_in",
                                          },
                                        },
                                        [
                                          _vm._v(
                                            "\r\n                                    배송비 포함\r\n                                "
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
                              {
                                staticClass: "align print_hide_flex",
                                style: { flexWrap: "wrap" },
                              },
                              [
                                odm.odm_type == "MODEL"
                                  ? [
                                      !_vm.isEmpty(
                                        odm.order_dlvy_info.oddi_receive_date
                                      ) &&
                                      odm.order_dlvy_info.oddi_receive_date !=
                                        "0000-00-00"
                                        ? _c(
                                            "b-badge",
                                            { staticClass: "gray" },
                                            [_vm._v("수취완료")]
                                          )
                                        : !_vm.isEmpty(
                                            odm.order_dlvy_info
                                              .oddi_arrival_date
                                          ) &&
                                          odm.order_dlvy_info
                                            .oddi_arrival_date != "0000-00-00"
                                        ? _c(
                                            "b-badge",
                                            { staticClass: "green" },
                                            [_vm._v("배송완료")]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      !_vm.isEmpty(
                                        odm.order_dlvy_info.oddi_dlvy_num
                                      )
                                        ? _c(
                                            "b-link",
                                            {
                                              staticClass: "teal sm",
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
                                                "\r\n                                    " +
                                                  _vm._s(
                                                    odm.order_dlvy_info
                                                      .oddi_dlvy_com
                                                  ) +
                                                  ", " +
                                                  _vm._s(
                                                    odm.order_dlvy_info
                                                      .oddi_dlvy_num
                                                  ) +
                                                  "\r\n                                "
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c("br"),
                                      _vm._v(" "),
                                      _c(
                                        "b-button",
                                        {
                                          staticClass: "white",
                                          on: {
                                            click: function ($event) {
                                              return _vm.writeDlvyInfo(odm)
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
                  _c("b-col", { staticClass: "dlvy_fare print_hide_flex" }, [
                    _c("div", [
                      pa.odpa_pa_type == "AIR"
                        ? _c("p", [_vm._v("항공 운임료")])
                        : _c("p", [_vm._v("배송비")]),
                      _vm._v(
                        "\r\n                        " +
                          _vm._s(
                            _vm._f("won")(
                              _vm._f("comma")(pa.odpa_dlvy_p_add_vat)
                            )
                          ) +
                          "\r\n                    "
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
              { staticClass: "action print_hide" },
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
            _vm._v(" "),
            _c("div", { staticClass: "top_border" }),
            _vm._v(" "),
            _c(
              "div",
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
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "box extra_info" },
          [
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
                        staticClass: "teal print_hide_inline_block",
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
              _vm._m(0),
              _vm._v(" "),
              _c("tr", [
                _c("th", [_vm._v("수취인")]),
                _vm._v(" "),
                _c(
                  "td",
                  { staticClass: "position-relative" },
                  [
                    _c("font-awesome-icon", {
                      directives: [
                        {
                          name: "b-tooltip",
                          rawName: "v-b-tooltip",
                          value: "수취인 복사",
                          expression: "'수취인 복사'",
                        },
                      ],
                      staticClass: "print_hide_inline_block",
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
                          class: { show_bottom: _vm.focusInfo.od_receiver },
                        },
                        [
                          _c("div", { staticClass: "piece front" }, [
                            _vm._v(_vm._s(_vm.od.od_receiver)),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "piece bottom" },
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
                    _vm._v(" "),
                    _vm.od.od_receiver != _vm.od.od_orderer
                      ? _c("span", { staticClass: "warning" }, [
                          _vm._v("* 주문자와 수취인이 다릅니다."),
                        ])
                      : _vm._e(),
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
                          value: "전화번호 복사",
                          expression: "'전화번호 복사'",
                        },
                      ],
                      staticClass: "print_hide_inline_block",
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
                          class: { show_bottom: _vm.focusInfo.od_receiver_hp },
                        },
                        [
                          _c("div", { staticClass: "piece front" }, [
                            _vm._v(_vm._s(_vm.od.od_receiver_hp)),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "piece bottom" },
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
                _c(
                  "th",
                  [
                    _vm._v(
                      "\r\n                        배송주소\r\n                        "
                    ),
                    _c(
                      "b-button",
                      {
                        staticClass: "teal xm print_hide_inline_block",
                        on: {
                          click: function ($event) {
                            ;(_vm.isModalViewed = !_vm.isModalViewed),
                              (_vm.modalType = "postCode")
                          },
                        },
                      },
                      [_vm._v("검색")]
                    ),
                  ],
                  1
                ),
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
                          value: "배송 주소 복사",
                          expression: "'배송 주소 복사'",
                        },
                      ],
                      staticClass: "print_hide_inline_block",
                      attrs: { icon: "copy" },
                      on: {
                        click: function ($event) {
                          return _vm.copyToClipboard(
                            _vm.od.od_addr1 + ", " + _vm.od.od_addr2
                          )
                        },
                      },
                    }),
                    _vm._v(
                      "\r\n                        " + _vm._s(_vm.od.od_zip)
                    ),
                    _c("b", [_vm._v(",")]),
                    _vm._v(" " + _vm._s(_vm.od.od_addr1)),
                    _c("b", [_vm._v(",")]),
                    _vm._v(
                      " " + _vm._s(_vm.od.od_addr2) + "\r\n                    "
                    ),
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
                        _vm.od.order_pg && _vm.od.order_pg.pg_id
                          ? _c(
                              "b-button",
                              {
                                staticClass: "teal print_hide_inline_block",
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
                                              staticClass: "print_hide",
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
                                              staticClass: "print_hide",
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
                            staticStyle: {
                              "max-width": "100%",
                              height: "auto",
                            },
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
                                  _c("b-col", [
                                    _vm._v(_vm._s(_vm.od.od_addr1)),
                                  ]),
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
                                            _vm.$set(
                                              _vm.od,
                                              "trans_receive",
                                              $$v
                                            )
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
                                            _vm.$set(
                                              _vm.dlvy_info,
                                              "number",
                                              $$v
                                            )
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
    ),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("colgroup", [
      _c("col", { attrs: { width: "15%" } }),
      _vm._v(" "),
      _c("col", { attrs: { width: "35%" } }),
      _vm._v(" "),
      _c("col", { attrs: { width: "15%" } }),
      _vm._v(" "),
      _c("col", { attrs: { width: "35%" } }),
    ])
  },
]
render._withStripped = true



/***/ })

}]);