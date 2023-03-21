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
        mng: {}
      },
      dlvy_info: {
        selected: [],
        company: '한진택배',
        number: ''
      }
    };
  },
  computed: {
    payPlanDisplay: function payPlanDisplay() {
      var plan = this.od.order_extra_info.oex_pay_plan;
      var returnMsg = '';
      if (plan == 'soon') returnMsg = '선 결제';else if (plan == 'week1') returnMsg = '1주이내 결제';else if (plan == 'week2') returnMsg = '2주이내 결제';else if (plan == 'month1') returnMsg = '한달이내 결제';else if (plan == 'month2') returnMsg = '2개월이내 결제';else if (plan == 'dlvy') returnMsg = '납품시 결제';else returnMsg = plan;
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
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/order/exportEstimateExcel", _this4.od, {
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
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/order/exportEstimatePdf", _this5.od, {
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
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/order/exportTransactionExcel", _this6.od, {
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
      var _arguments2 = arguments,
          _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8() {
        var query, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                query = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : '';
                _context8.prev = 1;

                _this7.mngChk();

                _context8.next = 5;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/order/exportTransactionPdf?".concat(query), _this7.od, {
                  responseType: 'blob'
                });

              case 5:
                res = _context8.sent;

                _this7.orderDocumentDown(res, 'Transaction_' + dt.format("yyyyMMdd") + '.pdf');

                _context8.next = 12;
                break;

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8["catch"](1);
                Notify.consolePrint(_context8.t0);

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[1, 9]]);
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
                  if (res.data.msg == 'Success') _this8.$router.push({
                    name: 'adm_ledger'
                  });else if (res.data.msg == 'Existed') Notify.modal('이미 등록된 주문입니다.', 'warning');
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
    DlvyAllIn: function DlvyAllIn(odpa_id) {
      var _iterator7 = _createForOfIteratorHelper(this.od.order_purchase_at),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var opa = _step7.value;
          if (opa.odpa_id !== odpa_id) opa.dlvy_all_in = false;
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    },
    getHref: function getHref(com, num) {
      return this.od.order_config.delivery_com[com].replace('[송장번호]', num);
    }
  },
  mounted: function mounted() {
    this.edit();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.card .tit button { display:block; float:right;\n}\n.card .container { max-width:100%;\n}\n.card .container .row .col .long_type { white-space: pre-wrap; word-wrap: break-word; text-align:left; margin-top:5px;\n}\n.card .container .row .col .cube_box { display:inline-block;\n}\n.card .container .row .col .cube_box, \r\n.card .container .row .col .cube_box * { box-sizing: border-box;\n}\n.card .container .row .col .cube_box { /*perspective:400px;*/ margin:auto;\n}\n.card .container .row .col .cube_box .cube { position: relative; transform-style: preserve-3d; transform: translateZ(-50px); transition: transform .2s;\n}\n.card .container .row .col .cube_box .cube .piece { position:absolute;\n}\n.card .container .row .col .cube_box,\r\n.card .container .row .col .cube_box .cube,\r\n.card .container .row .col .cube_box .cube .piece { width:100%; max-width:40px; height:20px;\n}\n.card .container .row .col .cube_box .cube .piece.front  { transform: rotateY(  0deg) translateZ(20px); line-height:2;\n}\n.card .container .row .col .cube_box .cube .piece.right  { transform: rotateY( 90deg) translateZ(20px); display:block;\n}\n.card .container .row .col .cube.show_front  { transform: translateZ(-50px) rotateY(   0deg);\n}\n.card .container .row .col .cube.show_right,\r\n.card .container .row .col .cube_box .cube:hover  { transform: translateZ(-50px) rotateY( -90deg);\n}\n.goods .container h5 .myCheck { display:inline;\n}\n.goods .container .myCheck { min-height:2rem; padding-left:1.7rem; min-width:2.1rem; display:inline;\n}\n.goods .container .myCheck .custom-control-label::before, \r\n.goods .container .myCheck .custom-control-label::after { width:2rem; height:2rem;\n}\n.goods .container .row .col .row .dlvy_p p .btn.active { color:#fff; background-color:#1d2124; border-color:#171a1d;\n}\n.goods .container .row .col .row .chk { display:flex;\n}\n.card .row .col .form_icon svg { cursor:pointer;\n}\n.card.receiver .container .row .col span:nth-child(1) .cube_box,\r\n.card.receiver .container .row .col span:nth-child(1) .cube_box .cube,\r\n.card.receiver .container .row .col span:nth-child(1) .cube_box .cube .piece { max-width:150px;\n}\n.card.receiver .container .row .col span:nth-child(2) .cube_box,\r\n.card.receiver .container .row .col span:nth-child(2) .cube_box .cube,\r\n.card.receiver .container .row .col span:nth-child(2) .cube_box .cube .piece { max-width:150px;\n}\n.card.receiver .container .row .col span:nth-child(3) .cube_box,\r\n.card.receiver .container .row .col span:nth-child(3) .cube_box .cube,\r\n.card.receiver .container .row .col span:nth-child(3) .cube_box .cube .piece { max-width:500px;\n}\n.card.layerModal .row .label { flex: 0 0 18%; max-width: 18%;\n}\n.card.layerModal .row .ctrl { text-align:right;\n}\r\n\r\n", ""]);
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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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
/* harmony import */ var _Edit_vue_vue_type_template_id_ca63be56___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=ca63be56& */ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js&");
/* harmony import */ var _Edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Edit.vue?vue&type=style&index=0&lang=css& */ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&lang=css&");
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&lang=css&":
/*!***************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&lang=css&");


/***/ }),

/***/ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    { staticClass: "p_wrap order_edit", attrs: { id: "adm_shop_order_edit" } },
    [
      _c("h3", { staticClass: "p_tit" }, [_vm._v("주문 상세")]),
      _vm._v(" "),
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
                      on: {
                        click: function ($event) {
                          return _vm.writeDlvyInfo("bundle")
                        },
                      },
                    },
                    [_vm._v("배송정보")]
                  ),
                  _vm._v(" "),
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
                      _vm.od.od_mng
                        ? [
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
                            _vm._v(" "),
                            _c(
                              "b-dropdown-item-button",
                              {
                                attrs: { variant: "info" },
                                on: {
                                  click: function ($event) {
                                    ;(_vm.isModalViewed = !_vm.isModalViewed),
                                      (_vm.modalType = "sendTransaction")
                                  },
                                },
                              },
                              [
                                _vm._v("거래명세서 발송 "),
                                _c("b-badge", [_vm._v("PDF")]),
                              ],
                              1
                            ),
                          ]
                        : _c(
                            "b-dropdown-item-button",
                            { attrs: { disabled: "" } },
                            [_vm._v("담당장 등록 후 사용 가능")]
                          ),
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _vm.od.od_has_ledger == "N"
                    ? _c(
                        "b-button",
                        {
                          attrs: { variant: "info" },
                          on: { click: _vm.ledger },
                        },
                        [
                          _c("b-icon-journal-bookmark-fill"),
                          _vm._v(" 영업장부"),
                        ],
                        1
                      )
                    : _vm._e(),
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
                    : _c("b-button", [_vm._v(_vm._s(_vm.od.mng.name))]),
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
      _c(
        "div",
        { staticClass: "order_edit", attrs: { id: "print_area" } },
        [
          _c("b-card", { staticClass: "head", attrs: { "no-body": "" } }, [
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
                    _c("b-icon-calendar2-date-fill"),
                    _vm._v(_vm._s(_vm._f("formatDate")(_vm.od.created_at))),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "span",
                  [
                    _c(
                      "b-link",
                      {
                        attrs: {
                          to: {
                            name: "adm_user_edit",
                            params: { id: _vm.od.created_id },
                          },
                        },
                      },
                      [
                        _c("font-awesome-icon", { attrs: { icon: "user" } }),
                        _vm._v(
                          _vm._s(_vm.od.od_orderer) + "\r\n                    "
                        ),
                      ],
                      1
                    ),
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
          ]),
          _vm._v(" "),
          _c(
            "b-card",
            { staticClass: "goods" },
            [
              _c(
                "div",
                { staticClass: "tit" },
                [
                  _vm._v("\r\n                주문 상품\r\n                "),
                  _c(
                    "b-button",
                    {
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
              _vm._v(" "),
              _vm._l(_vm.od.order_purchase_at, function (pa, pa_i) {
                return _c(
                  "b-container",
                  { key: "pa_" + pa_i },
                  [
                    _c(
                      "h5",
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
                        _vm._v(" "),
                        pa.odpa_pa_id
                          ? [
                              _vm._v(_vm._s(pa.odpa_pa_name) + " "),
                              _c("b", [_vm._v("직배송 상품")]),
                            ]
                          : [_vm._v("4SCIENCE")],
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c(
                      "b-row",
                      [
                        _c(
                          "b-col",
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
                                  { staticClass: "chk" },
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
                                odm.odm_type == "MODEL" && odm.odm_gd_id > 0
                                  ? _c(
                                      "b-link",
                                      {
                                        staticClass: "col gd_img",
                                        attrs: {
                                          to: {
                                            name: "adm_goods_edit",
                                            params: { gd_id: odm.odm_gd_id },
                                          },
                                        },
                                      },
                                      [
                                        _c("img", {
                                          attrs: { src: odm.img_src },
                                        }),
                                      ]
                                    )
                                  : odm.odm_type == "MODEL"
                                  ? _c("b-col", { staticClass: "gd_img" }, [
                                      _c("img", {
                                        attrs: { src: odm.img_src },
                                      }),
                                    ])
                                  : _vm._e(),
                                _vm._v(" "),
                                odm.odm_type == "MODEL"
                                  ? _c("b-col", { staticClass: "gd_info" }, [
                                      _c("div", [
                                        _c("b", [
                                          _vm._v(
                                            "◖" + _vm._s(odm.odm_gd_name) + "◗"
                                          ),
                                        ]),
                                        _vm._v(" "),
                                        _c("p", [
                                          _vm._v(
                                            "\r\n                                        " +
                                              _vm._s(odm.odm_gm_name) +
                                              " "
                                          ),
                                          _c("br"),
                                          _vm._v(
                                            "\r\n                                        " +
                                              _vm._s(odm.odm_gm_code) +
                                              " "
                                          ),
                                          _c("b", { staticClass: "divider" }, [
                                            _vm._v("/"),
                                          ]),
                                          _vm._v(
                                            " \r\n                                        " +
                                              _vm._s(odm.odm_gm_catno) +
                                              " "
                                          ),
                                          _c("b", { staticClass: "divider" }, [
                                            _vm._v("/"),
                                          ]),
                                          _vm._v(
                                            " \r\n                                        " +
                                              _vm._s(odm.odm_mk_name) +
                                              " "
                                          ),
                                          _c("b", { staticClass: "divider" }, [
                                            _vm._v("/"),
                                          ]),
                                          _vm._v(
                                            " \r\n                                        " +
                                              _vm._s(odm.odm_gm_unit) +
                                              "\r\n                                    "
                                          ),
                                        ]),
                                      ]),
                                    ])
                                  : _vm._e(),
                                _vm._v(" "),
                                _c("b-col", { staticClass: "spec" }, [
                                  odm.odm_type == "OPTION"
                                    ? _c("b", [
                                        _vm._v(_vm._s(odm.odm_gm_name) + ": "),
                                      ])
                                    : _vm._e(),
                                  _vm._v(_vm._s(odm.odm_gm_spec)),
                                ]),
                                _vm._v(" "),
                                _c("b-col", { staticClass: "price" }, [
                                  _c(
                                    "p",
                                    [
                                      _vm._v(
                                        "\r\n                                    " +
                                          _vm._s(
                                            _vm._f("comma")(
                                              odm.odm_price_add_vat
                                            )
                                          ) +
                                          " 원\r\n                                    "
                                      ),
                                      _c("font-awesome-icon", {
                                        attrs: { icon: "times" },
                                      }),
                                      _vm._v(" "),
                                      _c("span", { staticClass: "ea" }, [
                                        _c("div", { staticClass: "cube_box" }, [
                                          _c(
                                            "div",
                                            {
                                              staticClass: "cube",
                                              class: {
                                                show_right: odm.show_right,
                                              },
                                            },
                                            [
                                              _c(
                                                "div",
                                                { staticClass: "piece front" },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm._f("comma")(
                                                        odm.odm_ea
                                                      )
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
                                                      value:
                                                        pa.order_model[odm_i],
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
                                      _vm._v(
                                        " 개\r\n                                    "
                                      ),
                                      _c("font-awesome-icon", {
                                        attrs: { icon: "equals" },
                                      }),
                                      _vm._v(" "),
                                      _c("b", { staticClass: "multi" }, [
                                        _vm._v(
                                          _vm._s(
                                            _vm._f("comma")(
                                              odm.odm_price_add_vat * odm.odm_ea
                                            )
                                          ) + " 원"
                                        ),
                                      ]),
                                    ],
                                    1
                                  ),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "b-col",
                                  { staticClass: "dlvy_info" },
                                  [
                                    odm.odm_type == "MODEL"
                                      ? [
                                          odm.order_dlvy_info.oddi_receive_date
                                            ? _c(
                                                "b-badge",
                                                { attrs: { variant: "light" } },
                                                [_vm._v("수취완료")]
                                              )
                                            : odm.order_dlvy_info
                                                .oddi_arrival_date
                                            ? _c(
                                                "b-badge",
                                                {
                                                  attrs: { variant: "success" },
                                                },
                                                [_vm._v("배송완료")]
                                              )
                                            : odm.order_dlvy_info.oddi_dlvy_num
                                            ? _c(
                                                "b-button",
                                                {
                                                  attrs: {
                                                    size: "sm",
                                                    variant: "info",
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
                                                  attrs: { size: "sm" },
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
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "b-col",
                          [
                            _c(
                              "b-row",
                              [
                                _c("b-col", { staticClass: "dlvy_p" }, [
                                  _c(
                                    "p",
                                    [
                                      pa.odpa_pa_type == "AIR"
                                        ? _c("b-badge", [_vm._v("항공 운임료")])
                                        : _c("b-badge", [_vm._v("배송비")]),
                                      _vm._v(" "),
                                      _c("br"),
                                      _vm._v(
                                        "\r\n                                    " +
                                          _vm._s(
                                            _vm._f("comma")(
                                              pa.odpa_dlvy_p_add_vat
                                            )
                                          ) +
                                          " 원\r\n                                \r\n                                    "
                                      ),
                                      pa.odpa_pa_type !== "AIR"
                                        ? [
                                            _c("br"),
                                            _vm._v(" "),
                                            _c(
                                              "b-form-checkbox",
                                              {
                                                attrs: {
                                                  button: "",
                                                  "button-variant": "light",
                                                  size: "sm",
                                                },
                                                on: {
                                                  change: function ($event) {
                                                    return _vm.DlvyAllIn(
                                                      pa.odpa_id
                                                    )
                                                  },
                                                },
                                                model: {
                                                  value: pa.dlvy_all_in,
                                                  callback: function ($$v) {
                                                    _vm.$set(
                                                      pa,
                                                      "dlvy_all_in",
                                                      $$v
                                                    )
                                                  },
                                                  expression: "pa.dlvy_all_in",
                                                },
                                              },
                                              [
                                                _vm._v(
                                                  "\r\n                                            배송비 포함\r\n                                        "
                                                ),
                                              ]
                                            ),
                                          ]
                                        : _vm._e(),
                                    ],
                                    2
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
                  ],
                  1
                )
              }),
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "b-card",
            { staticClass: "price" },
            [
              _c("div", { staticClass: "tit" }, [_vm._v("총 금액")]),
              _vm._v(" "),
              _c(
                "b-container",
                [
                  _c(
                    "b-row",
                    [
                      _c("b-col", { attrs: { offset: "6" } }, [
                        _c("p", [
                          _vm._v("상품 : "),
                          _c("b", [
                            _vm._v(
                              _vm._s(_vm._f("comma")(_vm.od.od_gd_price)) +
                                " 원"
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("p", [
                          _vm._v("부가세 : "),
                          _c("b", [
                            _vm._v(
                              _vm._s(_vm._f("comma")(_vm.od.od_surtax)) + " 원"
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("p", [
                          _vm._v("배송비 : "),
                          _c("b", [
                            _vm._v(
                              _vm._s(_vm._f("comma")(_vm.od.od_dlvy_price)) +
                                " 원"
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _vm.od.od_air_price
                          ? _c("p", [
                              _vm._v("항공운임료 : "),
                              _c("b", [
                                _vm._v(
                                  _vm._s(_vm._f("comma")(_vm.od.od_air_price)) +
                                    " 원"
                                ),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c("p", [
                          _vm._v("총금액 : "),
                          _c("b", [
                            _vm._v(
                              _vm._s(_vm._f("comma")(_vm.od.od_all_price)) +
                                " 원"
                            ),
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
          ),
          _vm._v(" "),
          _c(
            "b-card",
            { staticClass: "receiver adform" },
            [
              _c(
                "div",
                { staticClass: "tit" },
                [
                  _vm._v(
                    "\r\n                배송, 결제 정보\r\n                "
                  ),
                  _c(
                    "b-button",
                    {
                      on: {
                        click: function ($event) {
                          return _vm.update("addr")
                        },
                      },
                    },
                    [_vm._v("상품 수령 정보 수정")]
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-container",
                [
                  _c(
                    "b-row",
                    [
                      _c("b-col", [
                        _c(
                          "span",
                          { staticClass: "form_icon" },
                          [
                            _c("b-icon-person-fill", {
                              directives: [
                                {
                                  name: "b-tooltip",
                                  rawName: "v-b-tooltip",
                                  value: "수령인 이름 복사",
                                  expression: "'수령인 이름 복사'",
                                },
                              ],
                              on: {
                                click: function ($event) {
                                  return _vm.copyToClipboard(_vm.od.od_receiver)
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("div", { staticClass: "cube_box" }, [
                              _c(
                                "div",
                                {
                                  staticClass: "cube",
                                  class: {
                                    show_right: _vm.focusInfo.od_receiver,
                                  },
                                },
                                [
                                  _c("div", { staticClass: "piece front" }, [
                                    _vm._v(
                                      "\r\n                                        " +
                                        _vm._s(_vm.od.od_receiver) +
                                        "\r\n                                    "
                                    ),
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
                        _c(
                          "span",
                          { staticClass: "form_icon" },
                          [
                            _c("b-icon-telephone-fill", {
                              directives: [
                                {
                                  name: "b-tooltip",
                                  rawName: "v-b-tooltip",
                                  value: "수령인 번호 복사",
                                  expression: "'수령인 번호 복사'",
                                },
                              ],
                              on: {
                                click: function ($event) {
                                  return _vm.copyToClipboard(
                                    _vm.od.od_receiver_hp
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("div", { staticClass: "cube_box" }, [
                              _c(
                                "div",
                                {
                                  staticClass: "cube",
                                  class: {
                                    show_right: _vm.focusInfo.od_receiver_hp,
                                  },
                                },
                                [
                                  _c("div", { staticClass: "piece front" }, [
                                    _vm._v(
                                      "\r\n                                        " +
                                        _vm._s(_vm.od.od_receiver_hp) +
                                        "\r\n                                    "
                                    ),
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
                                            _vm.$set(
                                              _vm.od,
                                              "od_receiver_hp",
                                              $$v
                                            )
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
                        _vm._v(" "),
                        _c(
                          "span",
                          { staticClass: "form_icon" },
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
                              attrs: { icon: "map-marked-alt" },
                              on: {
                                click: function ($event) {
                                  return _vm.copyToClipboard(_vm.od.od_addr1)
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("div", { staticClass: "cube_box" }, [
                              _c("div", { staticClass: "cube" }, [
                                _c("div", { staticClass: "piece front" }, [
                                  _vm._v(
                                    "\r\n                                        " +
                                      _vm._s(_vm.od.od_zip)
                                  ),
                                  _c("b", [_vm._v(",")]),
                                  _vm._v(" " + _vm._s(_vm.od.od_addr1)),
                                  _c("b", [_vm._v(",")]),
                                  _vm._v(
                                    " " +
                                      _vm._s(_vm.od.od_addr2) +
                                      "\r\n                                    "
                                  ),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "piece right" },
                                  [
                                    _c(
                                      "b-button",
                                      {
                                        attrs: { variant: "dark" },
                                        on: {
                                          click: function ($event) {
                                            ;(_vm.isModalViewed =
                                              !_vm.isModalViewed),
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
                        _vm._v(" "),
                        _c(
                          "p",
                          {
                            directives: [
                              {
                                name: "b-tooltip",
                                rawName: "v-b-tooltip",
                                value: "배송시 요청사항",
                                expression: "'배송시 요청사항'",
                              },
                            ],
                            staticClass: "mt-4",
                          },
                          [
                            _c("font-awesome-icon", {
                              staticClass: "mr-4",
                              attrs: { icon: "info" },
                            }),
                            _vm._v(" "),
                            _c("span", [_vm._v(_vm._s(_vm.od.od_memo))]),
                          ],
                          1
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("hr"),
                  _vm._v(" "),
                  _vm.od.order_extra_info
                    ? _c(
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
                                      _vm.od.order_extra_info.oex_bank == "K"
                                        ? _c(
                                            "b-badge",
                                            { attrs: { variant: "light" } },
                                            [_vm._v("국민은행")]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.od.order_extra_info.oex_bank == "W"
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
                                              _vm.od.order_extra_info
                                                .oex_depositor
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
                                              _vm.od.order_extra_info
                                                .oex_depositor
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
                                : _vm.od.od_pay_method == "R"
                                ? _c(
                                    "span",
                                    [
                                      _c(
                                        "b-badge",
                                        { attrs: { variant: "light" } },
                                        [_vm._v("원격결제")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "b-badge",
                                        { attrs: { variant: "light" } },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.od.order_extra_info.oex_mng
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
                                            _vm._s(
                                              _vm.od.order_extra_info.oex_num
                                            )
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "b-badge",
                                        { attrs: { variant: "light" } },
                                        [_vm._v(_vm._s(_vm.payPlanDisplay))]
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
                                        _vm.od.order_extra_info.oex_req_est ==
                                        "Y"
                                          ? _c(
                                              "b-badge",
                                              { attrs: { variant: "light" } },
                                              [_vm._v("견적서")]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.od.order_extra_info.oex_req_tran ==
                                        "Y"
                                          ? _c(
                                              "b-badge",
                                              { attrs: { variant: "light" } },
                                              [_vm._v("거래명세서")]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.od.order_extra_info.oex_req_biz ==
                                        "Y"
                                          ? _c(
                                              "b-badge",
                                              { attrs: { variant: "light" } },
                                              [_vm._v("사업자 등록증 사본")]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.od.order_extra_info.oex_req_bank ==
                                        "Y"
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
                                        _vm.od.order_extra_info.oex_req_bank ==
                                          "N"
                                          ? _c(
                                              "b-badge",
                                              { attrs: { variant: "warning" } },
                                              [_vm._v("없음")]
                                            )
                                          : _vm._e(),
                                      ],
                                  _vm._v(" "),
                                  _c(
                                    "b-alert",
                                    {
                                      staticClass: "mt-3",
                                      attrs: { show: "", variant: "success" },
                                    },
                                    [
                                      _c(
                                        "h4",
                                        { staticClass: "alert-heading" },
                                        [_vm._v("첨부서류 메모")]
                                      ),
                                      _vm._v(" "),
                                      _c("p", [
                                        _vm._v(
                                          _vm._s(
                                            _vm.od.order_extra_info.oex_memo
                                          )
                                        ),
                                      ]),
                                    ]
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
                    : _vm._e(),
                  _vm._v(" "),
                  _c("hr"),
                  _vm._v(" "),
                  (_vm.od.od_pay_method == "B" ||
                    _vm.od.od_pay_method == "E") &&
                  _vm.od.order_extra_info
                    ? _c(
                        "b-row",
                        [
                          _c(
                            "b-col",
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
                                                              ;(_vm.isModalViewed =
                                                                !_vm.isModalViewed),
                                                                (_vm.modalType =
                                                                  "blView")
                                                            },
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            "사업자 등록증 보기"
                                                          ),
                                                        ]
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
                                          _vm._v(" "),
                                          _c(
                                            "b-badge",
                                            {
                                              staticClass: "long_type",
                                              attrs: { variant: "light" },
                                            },
                                            [
                                              _vm._v(
                                                "요청사항: " +
                                                  _vm._s(
                                                    _vm.od.order_extra_info
                                                      .oex_requirement
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
                                : _vm.od.order_extra_info.oex_type == "IVNO"
                                ? _c("span", [_vm._v("세금계산서 입력안함")])
                                : _vm.od.order_extra_info.oex_type == "NO"
                                ? _c("span", [_vm._v("없음")])
                                : _c(
                                    "span",
                                    [
                                      _c(
                                        "b-alert",
                                        {
                                          attrs: { show: "", variant: "info" },
                                        },
                                        [
                                          _vm.od.order_extra_info.oex_type ==
                                          "HP"
                                            ? _c(
                                                "h5",
                                                {
                                                  staticClass: "alert-heading",
                                                },
                                                [_vm._v("휴대폰번호")]
                                              )
                                            : _vm.od.order_extra_info
                                                .oex_type == "IN"
                                            ? _c(
                                                "h5",
                                                {
                                                  staticClass: "alert-heading",
                                                },
                                                [_vm._v("주민등록번호")]
                                              )
                                            : _vm.od.order_extra_info
                                                .oex_type == "CN"
                                            ? _c(
                                                "h5",
                                                {
                                                  staticClass: "alert-heading",
                                                },
                                                [_vm._v("카드번호")]
                                              )
                                            : _vm.od.order_extra_info
                                                .oex_type == "BN"
                                            ? _c(
                                                "h5",
                                                {
                                                  staticClass: "alert-heading",
                                                },
                                                [_vm._v("사업자번호")]
                                              )
                                            : _vm._e(),
                                          _vm._v(
                                            "\r\n                                " +
                                              _vm._s(
                                                _vm.od.order_extra_info.oex_num
                                              ) +
                                              "\r\n                            "
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
                    ? _c("img", {
                        staticStyle: { "max-width": "100%", height: "auto" },
                        attrs: { src: _vm.od.file_info.path },
                        on: {
                          click: function ($event) {
                            return _vm.fileDown(
                              _vm.od.file_info.fi_original,
                              _vm.od.file_info.path
                            )
                          },
                        },
                      })
                    : _vm.modalType == "postCode"
                    ? _c("VueDaumPostcode", {
                        staticClass: "shadow mt-3",
                        attrs: { animation: true },
                        on: { complete: _vm.onPostcodeSlt },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "loading",
                              fn: function () {
                                return [
                                  _c("b-spinner", {
                                    attrs: {
                                      variant: "success",
                                      label: "Spinning",
                                    },
                                  }),
                                ]
                              },
                              proxy: true,
                            },
                          ],
                          null,
                          false,
                          422977406
                        ),
                      })
                    : _vm.modalType == "postDetail"
                    ? _c(
                        "b-card",
                        { staticClass: "adform layerModal" },
                        [
                          _c(
                            "b-container",
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
                        ],
                        1
                      )
                    : _vm.modalType == "sendTransaction"
                    ? _c(
                        "b-card",
                        { staticClass: "adform layerModal" },
                        [
                          _c(
                            "b-container",
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
                                              formatter: _vm.formatDate,
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
                                            _vm.isModalViewed = false
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
                        ],
                        1
                      )
                    : _vm.modalType == "dlvyInfo"
                    ? _c(
                        "b-card",
                        { staticClass: "adform layerModal" },
                        [
                          _c(
                            "b-container",
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
                        ],
                        1
                      )
                    : _vm._e(),
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
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);