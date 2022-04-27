(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web_shop_order_Settle_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=script&lang=js& ***!
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
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/router */ "./resources/js/router/index.js");
/* harmony import */ var _comp_FormValidation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_comp/FormValidation.js */ "./resources/js/views/web/shop/order/_comp/FormValidation.js");


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



 // https://github.com/wan2land/vue-daum-postcode/tree/0.x-vue2
////////////////////////////////////////////////////
// import "vue2-animate/src/sass/vue2-animate.scss";
// <transition   name="flip" enter-active-class="flipInX" leave-active-class="flipOutX">
//     <p v-if="order.od_pay_method == 'B'">hello</p>
// </transition>

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  // props:['gd_id', 'model', 'option'],
  components: {
    VueDaumPostcode: vue_daum_postcode__WEBPACK_IMPORTED_MODULE_2__.VueDaumPostcode,
    'PayPlan': function PayPlan() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_shop_order__comp_PayPlan_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/PayPlan.vue */ "./resources/js/views/web/shop/order/_comp/PayPlan.vue"));
    },
    'TaxInvoice': function TaxInvoice() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_shop_order__comp_TaxInvoice_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/TaxInvoice.vue */ "./resources/js/views/web/shop/order/_comp/TaxInvoice.vue"));
    }
  },
  watch: {
    'req_doc_opt.opt': {
      handler: function handler(val, oldVal) {
        if (val.est == 'N' && val.tran == 'N' && val.biz == 'N' && val.bank == 'N') {
          this.req_doc_opt.indeterminate = false;
          this.req_doc_opt.allSelected = false;
        } else if (val.est == 'Y' && val.tran == 'Y' && val.biz == 'Y' && val.bank == 'Y') {
          this.req_doc_opt.indeterminate = false;
          this.req_doc_opt.allSelected = true;
        } else {
          this.req_doc_opt.indeterminate = true;
          this.req_doc_opt.allSelected = false;
        }

        this.$set(this.order.extra, 'od_req_est', val.est);
        this.$set(this.order.extra, 'od_req_tran', val.tran);
        this.$set(this.order.extra, 'od_req_biz', val.biz);
        this.$set(this.order.extra, 'od_req_bank', val.bank);
      },
      deep: true
    },
    'order.od_pay_method': {
      handler: function handler(n, o) {
        switch (n) {
          case 'B':
            this.order.extra.oex_finance_type = 'K';
            break;

          case 'S':
            this.order.extra.oex_finance_type = 'SH';
            break;

          default:
            this.order.extra.oex_finance_type = '';
        }

        if (n == 'C' || n == 'P' || n == 'S') {
          this.order.extra.oex_type = 'NO';
        }
      },
      deep: true
    }
  },
  data: function data() {
    return {
      postcode_open: false,
      lists: {},
      order: {
        goods: this.$route.params.od_goods,
        price: {},
        od_no: "",
        od_name: "",
        od_type: this.$route.params.od_type,
        od_pay_method: 'B',
        od_orderer: "김진국",
        od_orderer_hp: "010-2636-3140",
        od_orderer_email: "kjk@4science.net1",
        od_zip: "16884",
        od_addr1: "경기 용인시 처인구 모현읍 능곡로 16-7(n-클래식)",
        od_addr2: "F동 302호",
        od_receiver: "김진국",
        od_receiver_hp: "010-2636-3140",
        od_memo: "주문주문하지마~!",
        od_req_est: 'N',
        od_req_tran: 'N',
        od_req_biz: 'N',
        od_req_bank: 'N',
        extra: {
          oex_hasBizLicense: true,
          oex_file: null,
          oex_depositor: '야야야',
          oex_email: 'kjadf@4scadsf.net',
          oex_mng: '박혁거세',
          oex_num_tel: '564-6544-6544',
          oex_pay_plan: 'soon',
          oex_finance_type: 'K',
          oex_finance_type_etc: '',
          oex_type: 'NO'
        },
        tCode: ''
      },
      req_doc_opt: {
        opt: {
          est: 'N',
          tran: 'N',
          biz: 'N',
          bank: 'N'
        },
        allSelected: false,
        indeterminate: false
      }
    };
  },
  computed: {
    validationCounter: function validationCounter() {
      var cnt = 0;
      var max = 8;
      if (isEmpty(this.order.od_orderer)) cnt++;
      if (isEmpty(this.order.od_orderer_hp)) cnt++;
      if (isEmpty(this.order.od_orderer_email)) cnt++;
      if (isEmpty(this.order.od_zip)) cnt++;
      if (isEmpty(this.order.od_addr1)) cnt++;
      if (isEmpty(this.order.od_addr2)) cnt++;
      if (isEmpty(this.order.od_receiver)) cnt++;
      if (isEmpty(this.order.od_receiver_hp)) cnt++;
      return {
        max: max,
        cur: max - cnt
      };
    }
  },
  methods: {
    settle: function settle() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post('/api/shop/order/settle', {
                  type: _this.order.od_type,
                  goods: _this.order.goods
                });

              case 3:
                res = _context.sent;

                if (res && res.status === 200) {
                  _this.lists = res.data.lists;
                  _this.order.price = res.data.price;
                  _this.order.od_no = res.data.od_no;
                  _this.order.od_name = res.data.od_name;
                }

                _context.next = 11;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                Notify.consolePrint(_context.t0);
                Notify.toast('warning', _context.t0.responsee);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    funNumCheck: function funNumCheck(val) {
      return numCheck(val);
    },
    funIsEmpty: function funIsEmpty(val) {
      return isEmpty(val);
    },
    onPostcodeSlt: function onPostcodeSlt(result) {
      this.$set(this.order, 'od_zip', result.zonecode);
      this.$set(this.order, 'od_addr1', result.roadAddress + "(" + result.buildingName + ")");
      this.postcode_open = false;
    },
    exePayment: function exePayment() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var pay, frm, up;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(0,_comp_FormValidation_js__WEBPACK_IMPORTED_MODULE_4__.validationChecker)(_this2.order)) {
                  _context2.next = 23;
                  break;
                }

                _context2.prev = 1;
                _context2.next = 4;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/shop/order/pay", _this2.order);

              case 4:
                pay = _context2.sent;

                if (!(pay && pay.status === 200)) {
                  _context2.next = 17;
                  break;
                }

                if (!(_this2.order.extra.oex_hasBizLicense && !isEmpty(_this2.order.extra.oex_file))) {
                  _context2.next = 15;
                  break;
                }

                frm = new FormData();
                frm.append('fi_group', 'order');
                frm.append('fi_key', pay.data.od_id);
                frm.append('fi_room', new Date().getFullYear());
                frm.append("file[]", _this2.order.extra.oex_file);
                _context2.next = 14;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post('/api/upload', frm);

              case 14:
                up = _context2.sent;

              case 15:
                _context2.next = 17;
                return _router__WEBPACK_IMPORTED_MODULE_3__["default"].push({
                  name: 'order_done',
                  params: {
                    od_id: pay.data.od_id
                  }
                });

              case 17:
                _context2.next = 23;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](1);
                Notify.consolePrint(_context2.t0);
                Notify.toast('warning', _context2.t0.responsee);

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 19]]);
      }))();
    },
    toggleAll: function toggleAll(checked) {
      if (checked) {
        this.$set(this.req_doc_opt.opt, 'est', 'Y');
        this.$set(this.req_doc_opt.opt, 'tran', 'Y');
        this.$set(this.req_doc_opt.opt, 'biz', 'Y');
        this.$set(this.req_doc_opt.opt, 'bank', 'Y');
      } else {
        this.$set(this.req_doc_opt.opt, 'est', 'N');
        this.$set(this.req_doc_opt.opt, 'tran', 'N');
        this.$set(this.req_doc_opt.opt, 'biz', 'N');
        this.$set(this.req_doc_opt.opt, 'bank', 'N');
      }
    }
  },
  created: function created() {
    var tCode = new Date().format("yyMMddHHmm");

    if (this.$route.params.od_goods) {
      this.order.goods = this.$route.params.od_goods;
      this.order.od_type = this.$route.params.od_type;
      this.order.tCode = tCode;
      sessionStorage.setItem('goods', JSON.stringify(this.order.goods));
      sessionStorage.setItem('od_type', this.order.od_type);
      sessionStorage.setItem('od_time', tCode);
    } else if (sessionStorage.getItem('od_time')) {
      if (tCode - sessionStorage.getItem('od_time') <= 20) {
        this.order.goods = JSON.parse(sessionStorage.getItem('goods'));
        this.order.od_type = sessionStorage.getItem('od_type');
        this.order.tCode = tCode;
      } else {
        //  주문 정보를 가져온후 일정 시간이 경과하면
        Notify.toast('danger', "오랜시간 주문이 이루어 지지 않았습니다.");
        this.$router.go(-1);
        return false;
      }
    } else {
      Notify.toast('danger', "잘못된 접근 경로입니다.");
      this.$router.go(-1);
      return false;
    }

    this.settle();
  },
  mounted: function mounted() {// console.log(this.$session.get('order'));
    // this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
    //     console.log('collapseId:', collapseId)
    //     console.log('isJustShown:', isJustShown)
    // })
  }
});

/***/ }),

/***/ "./resources/js/views/web/shop/order/_comp/FormValidation.js":
/*!*******************************************************************!*\
  !*** ./resources/js/views/web/shop/order/_comp/FormValidation.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validationChecker": () => (/* binding */ validationChecker)
/* harmony export */ });
var _this = undefined;

var validationChecker = function validationChecker(frm) {
  if (frm.od_pay_method == 'B' || frm.od_pay_method == 'E') {
    if (frm.extra.oex_type == 'IV') {
      if (frm.extra.oex_hasBizLicense) {
        if (isEmpty(frm.extra.oex_file)) {
          Notify.toast('danger', "사업자 등록증 사본을 첨부해주세요");

          _this.$refs.tax_invoice.$refs.oex_file.$refs.input.focus();

          return false;
        }
      } else {
        if (isEmpty(frm.extra.oex_biz_name)) {
          Notify.toast('danger', "법인명을 입력해주세요");

          _this.$refs.tax_invoice.$refs.oex_biz_name.focus();

          return false;
        }

        if (isEmpty(frm.extra.oex_biz_num)) {
          Notify.toast('danger', "사업자 등록번호를 입력해주세요");

          _this.$refs.tax_invoice.$refs.oex_biz_num.focus();

          return false;
        }

        if (isEmpty(frm.extra.oex_biz_type)) {
          Notify.toast('danger', "업태를 입력해주세요");

          _this.$refs.tax_invoice.$refs.oex_biz_type.focus();

          return false;
        }

        if (isEmpty(frm.extra.oex_biz_item)) {
          Notify.toast('danger', "종목를 입력해주세요");

          _this.$refs.tax_invoice.$refs.oex_biz_item.focus();

          return false;
        }

        if (isEmpty(frm.extra.oex_ceo)) {
          Notify.toast('danger', "대표자명을 입력해주세요");

          _this.$refs.tax_invoice.$refs.oex_ceo.focus();

          return false;
        }

        if (isEmpty(frm.extra.oex_addr)) {
          Notify.toast('danger', "사업장 소재지를 입력해주세요");

          _this.$refs.tax_invoice.$refs.oex_addr.focus();

          return false;
        }
      }

      if (isEmpty(frm.extra.oex_mng)) {
        Notify.toast('danger', "담장자를 입력해주세요");

        _this.$refs.tax_invoice.$refs.oex_mng.focus();

        return false;
      }

      if (isEmpty(frm.extra.oex_email)) {
        Notify.toast('danger', "이메일을 입력해주세요");

        _this.$refs.tax_invoice.$refs.oex_email.focus();

        return false;
      }

      if (isEmpty(frm.extra.oex_num_tel)) {
        Notify.toast('danger', "핸드폰 번호를 입력해주세요");

        _this.$refs.tax_invoice.$refs.oex_num_tel.focus();

        return false;
      }
    }
  }

  if (isEmpty(frm.od_orderer)) {
    Notify.toast('danger', "주문자 이름을 입력하세요.");

    _this.$refs.od_orderer.focus();

    return false;
  }

  if (isEmpty(frm.od_orderer_hp)) {
    Notify.toast('danger', "주문자 전화번호를 입력하세요.");

    _this.$refs.od_orderer_hp.focus();

    return false;
  }

  if (isEmpty(frm.od_orderer_email)) {
    Notify.toast('danger', "주문자 이메일을 입력하세요.");

    _this.$refs.od_orderer_email.focus();

    return false;
  }

  if (isEmpty(frm.od_receiver)) {
    Notify.toast('danger', "받는 사람 이름을 입력하세요.");

    _this.$refs.od_receiver.focus();

    return false;
  }

  if (isEmpty(frm.od_receiver_hp)) {
    Notify.toast('danger', "받는 사람 번호를 입력하세요.");

    _this.$refs.od_receiver_hp.focus();

    return false;
  }

  if (isEmpty(frm.od_zip)) {
    Notify.toast('danger', "배송지 우편번호를 입력하세요.");

    _this.$refs.od_zip.focus();

    return false;
  }

  if (isEmpty(frm.od_addr1)) {
    Notify.toast('danger', "배송지 주소를 입력하세요.");

    _this.$refs.od_addr1.focus();

    return false;
  }

  if (isEmpty(frm.od_addr2)) {
    Notify.toast('danger', "배송지 상세주소를 입력하세요.");

    _this.$refs.od_addr2.focus();

    return false;
  }

  return true;
};



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n#pay .card .card-body .row div img[data-v-6c9bc94a] { width:119px; height:119px; -o-object-fit:cover; object-fit:cover;\n}\n#pay .shipping_info .awesome_placeholder[data-v-6c9bc94a] { font-size:1rem;\n}\n#pay .shipping_info .awesome_placeholder+label>span[data-v-6c9bc94a] { font-size:1rem; top:-30px;\n}\n#pay .shipping_info .awesome_placeholder[data-v-6c9bc94a]:focus,\r\n#pay .shipping_info .awesome_placeholder[data-v-6c9bc94a]:valid { padding-top:5px;\n}\n#pay .shipping_info .awesome_placeholder:focus + label > span[data-v-6c9bc94a],\r\n#pay .shipping_info .awesome_placeholder:valid + label > span[data-v-6c9bc94a] { top:-50px; font-size:0.8rem;\n}\n#pay .payment_method[data-v-6c9bc94a] { /*height:410px;*/\n}\n#pay .payment_method .row[data-v-6c9bc94a] { margin-top:30px;\n}\n#pay .payment_method .custom-control label img[data-v-6c9bc94a] { width:60px; height:60px; -o-object-fit:cover; object-fit:cover; display:inline-block; position:absolute;  top:-20px;\n}\n#pay .payment_method .custom-control label p[data-v-6c9bc94a] { background-color:#e8e8e8; padding:0.3rem 0.7rem; border-radius:5px; display:inline-block; margin-left:100px; position: relative; top:-5px;\n}\n#pay .payment_method .custom-control label p[data-v-6c9bc94a]:before { content:''; position:absolute; left:-16px; top:8px; width:0; height:0; border:8px solid transparent; border-right-color:#e8e8e8;\n}\n#pay .payment_method .form-group .row .col .payment_option[data-v-6c9bc94a] { overflow:hidden;\n}\n#pay .payment_method .form-group .row .col .slideUpDown-enter-to[data-v-6c9bc94a],\r\n#pay .payment_method .form-group .row .col .slideUpDown-leave[data-v-6c9bc94a] { max-height:400px;\n}\n#pay .payment_method .form-group .row .col .slideUpDown-enter-active[data-v-6c9bc94a],\r\n#pay .payment_method .form-group .row .col .slideUpDown-leave-active[data-v-6c9bc94a] { transition:max-height 0.3s ease-out;\n}\n#pay .payment_method .form-group .row .col .slideUpDown-enter[data-v-6c9bc94a],\r\n#pay .payment_method .form-group .row .col .slideUpDown-leave-to[data-v-6c9bc94a] { max-height:0px;\n}\n#pay .payment_method .form-group .row .col .payment_option .card_name .custom-control input[type=\"text\"][data-v-6c9bc94a] { padding:1px 10px; border:1px solid #ddd;\n}\n#pay .payment_method .form-group .row .col .payment_option .card_name .custom-control input[type=\"text\"][data-v-6c9bc94a] { padding:1px 10px; border:1px solid #ddd;\n}\r\n\r\n/*#pay .payment_method .form-group .row .col .payment_option { overflow:hidden; max-height:0; transition: all .5s ease-out; }\r\n#pay .payment_method .form-group .row .col .payment_option.focus { max-height:200px; }*/\n#pay .payment_info[data-v-6c9bc94a] { /*height:410px;*/\n}\n#pay .payment_info dl dd[data-v-6c9bc94a] { text-align:right;\n}\n#pay .payment_info button[data-v-6c9bc94a] { /*height:284px;*/\n}\n.awesome_placeholder[data-v-6c9bc94a],\r\n.awesome_placeholder + label[data-v-6c9bc94a],\r\n.awesome_placeholder + label span[data-v-6c9bc94a] { display: block; margin: 10px; padding: 5px; border:none; font-size: 1rem;\n}\n.awesome_placeholder[data-v-6c9bc94a] { font-size:48px; margin:0; width:80%; background: rgba(0, 0, 0, 0); transition: padding-top 0.2s ease, margin-top 0.2s ease; overflow-x: hidden;\n}\n.awesome_placeholder[data-v-6c9bc94a]:focus { outline: 0;\n}\n.awesome_placeholder + label[data-v-6c9bc94a] { display:block; position:relative; white-space:nowrap; padding:0; margin:0; width:10%; height:0px; border-top:1px solid red; transition:width 0.4s ease;\n}\n.awesome_placeholder:focus + label[data-v-6c9bc94a] { width:80%;\n}\n.awesome_placeholder[data-v-6c9bc94a]:focus,\r\n.awesome_placeholder[data-v-6c9bc94a]:valid { padding-top:35px;\n}\n.awesome_placeholder:focus + label > span[data-v-6c9bc94a],\r\n.awesome_placeholder:valid + label > span[data-v-6c9bc94a] { top:-100px; font-size:1rem; color:#333;\n}\n.awesome_placeholder:valid + label[data-v-6c9bc94a] { border-color: green;\n}\n.awesome_placeholder[data-v-6c9bc94a]:invalid { box-shadow: none;\n}\n.awesome_placeholder + label > span[data-v-6c9bc94a] { margin:0; position:absolute; color:#8F8F8F; font-size:1.7rem; font-weight:bold; top:-66px; left:0px; z-index:-1; transition:top 0.2s ease, font-size 0.2s ease, color 0.2s ease;\n}\n.awesome_placeholder:valid + label > span[data-v-6c9bc94a] { color:#17a2b8; font-weight:normal;\n}\n#pay[data-v-6c9bc94a] .req_doc .col .form-group .custom-control-inline { margin-right:3rem;\n}\n#pay[data-v-6c9bc94a] .custom-control-input:checked ~ .custom-control-label::before,\r\n#pay[data-v-6c9bc94a] .custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::before { color: #fff; border-color:#17a2b8; background-color:#17a2b8;\n}\r\n\r\n\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Settle_vue_vue_type_style_index_0_id_6c9bc94a_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Settle_vue_vue_type_style_index_0_id_6c9bc94a_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Settle_vue_vue_type_style_index_0_id_6c9bc94a_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/vue-daum-postcode/dist/index.js":
/*!******************************************************!*\
  !*** ./node_modules/vue-daum-postcode/dist/index.js ***!
  \******************************************************/
/***/ ((module) => {

!function(e,t){if(true)module.exports=t();else { var o, n; }}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e){let t=null;return()=>t||(t=Promise.resolve(e()))}n.r(t),n.d(t,"install",(function(){return l})),n.d(t,"VueDaumPostcode",(function(){return i}));var r="undefined"==typeof document?Promise.reject(new Error("not supported")):(e,t={})=>new Promise((n,o)=>{(document.head||document.body).appendChild(Object.assign(document.createElement("script"),t,{src:e,async:!0,onload:n,onerror:o}))});function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=o((function(){return r(e.scriptUrl||"//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js").then((function(){return new Promise((function(e){return window.daum.postcode.load(e)}))}))}));return{props:{q:{type:String,default:""},animation:{type:Boolean,default:!1},noAutoMapping:{type:Boolean,default:!1},noShorthand:{type:Boolean,default:!1},noSubmitMode:{type:Boolean,default:!1},pleaseReadGuide:{type:Number,default:0},pleaseReadGuideTimer:{type:Number,default:1.5},maxSuggestItems:{type:Number,default:10},showMoreHName:{type:Boolean,default:!1},hideMapBtn:{type:Boolean,default:!1},hideEngBtn:{type:Boolean,default:!1},alwaysShowEngAddr:{type:Boolean,default:!1},zonecodeOnly:{type:Boolean,default:!1},theme:{type:Object,default:function(){return{}}}},data:function(){return{styleHeight:0,isLoaded:!1}},mounted:function(){var e=this;t().then((function(){e.isLoaded=!0,e.$nextTick((function(){new window.daum.Postcode({width:"100%",height:"100%",animation:e.animation,autoMapping:!e.noAutoMapping,shorthand:!e.noShorthand,pleaseReadGuide:e.pleaseReadGuide,pleaseReadGuideTimer:e.pleaseReadGuideTimer,maxSuggestItems:e.maxSuggestItems,showMoreHName:e.showMoreHName,hideMapBtn:e.hideMapBtn,hideEngBtn:e.hideEngBtn,alwaysShowEngAddr:e.alwaysShowEngAddr,zonecodeOnly:e.zonecodeOnly,theme:e.theme,submitMode:!e.noSubmitMode,onsearch:function(t){e.$emit("search",t)},oncomplete:function(t){e.$emit("complete",t)},onresize:function(t){e.styleHeight="".concat(t.height,"px")}}).embed(e.$refs.container,{q:e.q,autoClose:!1}),e.$emit("load")}))}))},computed:{styles:function(){var e={};return e.height=this.styleHeight,e}},render:function(e){return e("div",{class:["vue-daum-postcode"]},this.isLoaded||!this.$slots.loading?[e("div",{class:["vue-daum-postcode-container"],ref:"container",style:this.styles})]:[e("div",{class:["vue-daum-postcode-loading"]},this.$slots.loading)])}}}var i=u(),a=["name"];function d(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},u=Object.keys(e);for(o=0;o<u.length;o++)n=u[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(o=0;o<u.length;o++)n=u[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function l(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.name,o=d(t,a);e.component(n||"vue-daum-postcode",Object.keys(o).length>0?u(o):i)}"undefined"!=typeof window&&window.Vue&&l(window.Vue);t.default={install:l}}])}));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./resources/js/views/web/shop/order/Settle.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/web/shop/order/Settle.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Settle_vue_vue_type_template_id_6c9bc94a_scoped_true_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settle.vue?vue&type=template&id=6c9bc94a&scoped=true&lang=html& */ "./resources/js/views/web/shop/order/Settle.vue?vue&type=template&id=6c9bc94a&scoped=true&lang=html&");
/* harmony import */ var _Settle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settle.vue?vue&type=script&lang=js& */ "./resources/js/views/web/shop/order/Settle.vue?vue&type=script&lang=js&");
/* harmony import */ var _Settle_vue_vue_type_style_index_0_id_6c9bc94a_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true& */ "./resources/js/views/web/shop/order/Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Settle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Settle_vue_vue_type_template_id_6c9bc94a_scoped_true_lang_html___WEBPACK_IMPORTED_MODULE_0__.render,
  _Settle_vue_vue_type_template_id_6c9bc94a_scoped_true_lang_html___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "6c9bc94a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/shop/order/Settle.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/shop/order/Settle.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/web/shop/order/Settle.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Settle.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/shop/order/Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/views/web/shop/order/Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true& ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Settle_vue_vue_type_style_index_0_id_6c9bc94a_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/shop/order/Settle.vue?vue&type=template&id=6c9bc94a&scoped=true&lang=html&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/views/web/shop/order/Settle.vue?vue&type=template&id=6c9bc94a&scoped=true&lang=html& ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settle_vue_vue_type_template_id_6c9bc94a_scoped_true_lang_html___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settle_vue_vue_type_template_id_6c9bc94a_scoped_true_lang_html___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settle_vue_vue_type_template_id_6c9bc94a_scoped_true_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Settle.vue?vue&type=template&id=6c9bc94a&scoped=true&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=template&id=6c9bc94a&scoped=true&lang=html&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=template&id=6c9bc94a&scoped=true&lang=html&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=template&id=6c9bc94a&scoped=true&lang=html& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
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
    "b-container",
    { attrs: { id: "pay" } },
    [
      _c("h2", [_vm._v("결제하기")]),
      _vm._v(" "),
      _c("h4", [_vm._v("주문상품")]),
      _vm._v(" "),
      _c("hr"),
      _vm._v(" "),
      _vm._l(_vm.lists, function (pa, idx) {
        return [
          _c(
            "b-card",
            {
              key: idx,
              staticClass: "shadow mt-3",
              attrs: { "header-tag": "header", "footer-tag": "footer" },
              scopedSlots: _vm._u(
                [
                  {
                    key: "header",
                    fn: function () {
                      return [
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
                      ]
                    },
                    proxy: true,
                  },
                  {
                    key: "footer",
                    fn: function () {
                      return [
                        _c(
                          "p",
                          { staticClass: "text-right" },
                          [
                            _c(
                              "b-button",
                              { attrs: { variant: "primary" } },
                              [
                                _c(
                                  "b-badge",
                                  { attrs: { variant: "success" } },
                                  [_vm._v("상품")]
                                ),
                                _vm._v(
                                  " " +
                                    _vm._s(
                                      _vm._f("comma")(pa.price.goods_add_vat)
                                    ) +
                                    "\n                        "
                                ),
                                _c(
                                  "b-badge",
                                  {
                                    staticClass: "mx-3",
                                    attrs: { variant: "dark" },
                                  },
                                  [_vm._v("+")]
                                ),
                                _vm._v(" "),
                                _c("b-badge", { attrs: { variant: "info" } }, [
                                  _vm._v("배송비"),
                                ]),
                                _vm._v(
                                  " " +
                                    _vm._s(
                                      _vm._f("comma")(pa.price.dlvy_add_vat)
                                    ) +
                                    "\n                        "
                                ),
                                pa.price.air_add_vat
                                  ? [
                                      _c(
                                        "b-badge",
                                        {
                                          staticClass: "mx-3",
                                          attrs: { variant: "dark" },
                                        },
                                        [_vm._v("+")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "b-badge",
                                        { attrs: { variant: "info" } },
                                        [_vm._v("항공운임료")]
                                      ),
                                      _vm._v(
                                        " " +
                                          _vm._s(
                                            _vm._f("comma")(
                                              pa.price.air_add_vat
                                            )
                                          ) +
                                          "\n                        "
                                      ),
                                    ]
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "b-badge",
                                  {
                                    staticClass: "mx-3",
                                    attrs: { variant: "dark" },
                                  },
                                  [_vm._v("=")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-badge",
                                  { attrs: { variant: "warning" } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("comma")(
                                          pa.price.goods_add_vat +
                                            pa.price.dlvy_add_vat +
                                            pa.price.air_add_vat
                                        )
                                      )
                                    ),
                                  ]
                                ),
                                _vm._v(" 원\n                    "),
                              ],
                              2
                            ),
                          ],
                          1
                        ),
                      ]
                    },
                    proxy: true,
                  },
                ],
                null,
                true
              ),
            },
            [
              _vm._v(" "),
              _c(
                "b-container",
                { attrs: { fluid: "" } },
                [
                  _c(
                    "b-row",
                    { staticClass: "mt-3" },
                    [
                      _c(
                        "div",
                        { staticClass: "col" },
                        [
                          _vm._l(pa.list, function (gd, gd_idx) {
                            return [
                              _vm._l(gd.goods_model, function (gm, gm_idx) {
                                return [
                                  _c(
                                    "b-row",
                                    {
                                      key:
                                        idx + "_gd" + gd_idx + "_gm" + gm_idx,
                                      staticClass: "mt-3",
                                    },
                                    [
                                      _c("b-col", { attrs: { cols: "2" } }, [
                                        _c("img", {
                                          attrs: { src: gd.image_src_thumb[0] },
                                        }),
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "b-col",
                                        { attrs: { cols: "5" } },
                                        [
                                          _c("b", [_vm._v(_vm._s(gd.gd_name))]),
                                          _vm._v(" "),
                                          _c("P", { staticClass: "bg-light" }, [
                                            _vm._v(
                                              "\n                                            " +
                                                _vm._s(gm.gm_name) +
                                                " /\n                                            " +
                                                _vm._s(gm.gm_catno) +
                                                " /\n                                            " +
                                                _vm._s(gm.gm_code) +
                                                " /\n                                            " +
                                                _vm._s(gm.gm_spec) +
                                                " /\n                                            " +
                                                _vm._s(gm.gm_unit) +
                                                " /\n                                        "
                                            ),
                                          ]),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("b-col", { attrs: { cols: "2" } }, [
                                        _vm._v(
                                          "\n                                        " +
                                            _vm._s(gd.maker.mk_name) +
                                            "\n                                    "
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "b-col",
                                        {
                                          staticClass: "text-right",
                                          attrs: { cols: "3" },
                                        },
                                        [
                                          _vm._v(
                                            "\n                                        " +
                                              _vm._s(
                                                _vm._f("comma")(
                                                  gm.gm_price_add_vat
                                                )
                                              ) +
                                              " X " +
                                              _vm._s(gm.ea) +
                                              " = " +
                                              _vm._s(
                                                _vm._f("comma")(
                                                  gm.gm_price_add_vat * gm.ea
                                                )
                                              ) +
                                              " 원\n                                    "
                                          ),
                                        ]
                                      ),
                                    ],
                                    1
                                  ),
                                ]
                              }),
                              _vm._v(" "),
                              gd.option_child
                                ? [
                                    _c(
                                      "b-row",
                                      { staticClass: "mt-5 bg-warning" },
                                      [
                                        _c("b-col", [
                                          _c("b", [_vm._v("추가 옵션")]),
                                        ]),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _vm._l(
                                      gd.option_child,
                                      function (opc, opc_idx) {
                                        return [
                                          _c(
                                            "b-row",
                                            {
                                              key:
                                                idx +
                                                "_gd" +
                                                gd_idx +
                                                "_opc" +
                                                opc_idx,
                                              staticClass: "mt-3",
                                            },
                                            [
                                              _c(
                                                "b-col",
                                                { attrs: { cols: "6" } },
                                                [
                                                  _vm._v(
                                                    "\n                                            " +
                                                      _vm._s(opc.opc_name) +
                                                      "\n                                        "
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "b-col",
                                                {
                                                  staticClass: "text-right",
                                                  attrs: { cols: "6" },
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                                            " +
                                                      _vm._s(
                                                        opc.opc_price_add_vat
                                                      ) +
                                                      " X " +
                                                      _vm._s(opc.ea) +
                                                      " = " +
                                                      _vm._s(
                                                        _vm._f("comma")(
                                                          opc.opc_price_add_vat *
                                                            opc.ea
                                                        )
                                                      ) +
                                                      " 원\n                                        "
                                                  ),
                                                ]
                                              ),
                                            ],
                                            1
                                          ),
                                        ]
                                      }
                                    ),
                                  ]
                                : _vm._e(),
                            ]
                          }),
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "b-col",
                        {
                          staticClass:
                            "bg-info text-white align-items-center justify-content-center d-flex",
                          attrs: { cols: "2" },
                        },
                        [
                          pa.price.air_add_vat
                            ? [_vm._v("항공운임료")]
                            : [_vm._v("배송비")],
                          _vm._v(" "),
                          _c("br"),
                          _vm._v(
                            "\n                        " +
                              _vm._s(
                                _vm._f("comma")(
                                  pa.price.air_add_vat
                                    ? pa.price.air_add_vat
                                    : pa.price.dlvy_add_vat
                                )
                              ) +
                              " 원\n                    "
                          ),
                        ],
                        2
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
      }),
      _vm._v(" "),
      _c("br"),
      _c("br"),
      _c("br"),
      _vm._v(" "),
      _c("h4", [_vm._v("주문 정보")]),
      _vm._v(" "),
      _c("hr"),
      _vm._v(" "),
      _c(
        "b-row",
        { staticClass: "mt-3" },
        [
          _c("b-col", [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.order.od_orderer,
                  expression: "order.od_orderer",
                },
              ],
              ref: "od_orderer",
              staticClass: "awesome_placeholder",
              attrs: {
                type: "text",
                id: "od_orderer",
                required: "",
                autocomplete: "off",
              },
              domProps: { value: _vm.order.od_orderer },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.order, "od_orderer", $event.target.value)
                },
              },
            }),
            _vm._v(" "),
            _c("label", { attrs: { for: "od_orderer" } }, [
              _c("span", [_vm._v("주문자 이름을 입력하세요")]),
            ]),
          ]),
          _vm._v(" "),
          _c(
            "b-col",
            [
              _c("b-form-input", {
                ref: "od_orderer_hp",
                staticClass: "awesome_placeholder",
                attrs: {
                  id: "od_orderer_hp",
                  required: "",
                  formatter: _vm.formatHp,
                  autocomplete: "off",
                },
                model: {
                  value: _vm.order.od_orderer_hp,
                  callback: function ($$v) {
                    _vm.$set(_vm.order, "od_orderer_hp", $$v)
                  },
                  expression: "order.od_orderer_hp",
                },
              }),
              _vm._v(" "),
              _c("label", { attrs: { for: "od_orderer_hp" } }, [
                _c("span", [_vm._v("주문자 전화번호를 입력하세요")]),
              ]),
            ],
            1
          ),
          _vm._v(" "),
          _c("b-col", [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.order.od_orderer_email,
                  expression: "order.od_orderer_email",
                },
              ],
              ref: "od_orderer_email",
              staticClass: "awesome_placeholder",
              attrs: {
                type: "email",
                id: "od_orderer_email",
                required: "",
                autocomplete: "off",
              },
              domProps: { value: _vm.order.od_orderer_email },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.order, "od_orderer_email", $event.target.value)
                },
              },
            }),
            _vm._v(" "),
            _c("label", { attrs: { for: "od_orderer_email" } }, [
              _c("span", [_vm._v("주문자 이메일을 입력하세요")]),
            ]),
          ]),
        ],
        1
      ),
      _vm._v(" "),
      _c("br"),
      _c("br"),
      _c("br"),
      _vm._v(" "),
      _c("h4", [_vm._v("배송 정보")]),
      _vm._v(" "),
      _c("hr"),
      _vm._v(" "),
      _c(
        "b-row",
        { staticClass: "mt-3 shipping_info" },
        [
          _c("b-col", [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.order.od_receiver,
                  expression: "order.od_receiver",
                },
              ],
              ref: "od_receiver",
              staticClass: "awesome_placeholder",
              attrs: { type: "text", id: "od_receiver", required: "" },
              domProps: { value: _vm.order.od_receiver },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.order, "od_receiver", $event.target.value)
                },
              },
            }),
            _vm._v(" "),
            _c("label", { attrs: { for: "od_receiver" } }, [
              _c("span", [_vm._v("받는 사람 이름을 입력하세요")]),
            ]),
          ]),
          _vm._v(" "),
          _c(
            "b-col",
            [
              _c("b-form-input", {
                ref: "od_receiver_hp",
                staticClass: "awesome_placeholder",
                attrs: {
                  id: "od_receiver_hp",
                  required: "",
                  formatter: _vm.formatHp,
                },
                model: {
                  value: _vm.order.od_receiver_hp,
                  callback: function ($$v) {
                    _vm.$set(_vm.order, "od_receiver_hp", $$v)
                  },
                  expression: "order.od_receiver_hp",
                },
              }),
              _vm._v(" "),
              _c("label", { attrs: { for: "od_receiver_hp" } }, [
                _c("span", [_vm._v("받는 사람 전화번호를 입력하세요")]),
              ]),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-row",
        { staticClass: "mt-3 shipping_info" },
        [
          _c(
            "b-col",
            { attrs: { cols: "2" } },
            [
              _c("b-form-input", {
                ref: "od_zip",
                attrs: { placeholder: "우편번호", readonly: "" },
                model: {
                  value: _vm.order.od_zip,
                  callback: function ($$v) {
                    _vm.$set(_vm.order, "od_zip", $$v)
                  },
                  expression: "order.od_zip",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { cols: "2" } },
            [
              _c(
                "b-button",
                {
                  attrs: { variant: "primary" },
                  on: {
                    click: function ($event) {
                      _vm.postcode_open = !_vm.postcode_open
                    },
                  },
                },
                [
                  _vm.postcode_open
                    ? [_c("b-icon-x-square-fill")]
                    : [_vm._v("주소검색")],
                ],
                2
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { cols: "5" } },
            [
              _c("b-form-input", {
                ref: "od_addr1",
                attrs: { placeholder: "주소", readonly: "" },
                model: {
                  value: _vm.order.od_addr1,
                  callback: function ($$v) {
                    _vm.$set(_vm.order, "od_addr1", $$v)
                  },
                  expression: "order.od_addr1",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c("b-col", [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.order.od_addr2,
                  expression: "order.od_addr2",
                },
              ],
              ref: "od_addr2",
              staticClass: "awesome_placeholder",
              attrs: { type: "text", id: "od_addr2", required: "" },
              domProps: { value: _vm.order.od_addr2 },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.order, "od_addr2", $event.target.value)
                },
              },
            }),
            _vm._v(" "),
            _c("label", { attrs: { for: "od_addr2" } }, [
              _c("span", [_vm._v("상세주소")]),
            ]),
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
            [
              _vm.postcode_open
                ? [
                    _c("VueDaumPostcode", {
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
                    }),
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
        "b-row",
        { staticClass: "mt-3" },
        [
          _c(
            "b-col",
            [
              _c("b-form-textarea", {
                ref: "od_memo",
                attrs: {
                  id: "od_memo",
                  placeholder: "배송시 요청사항을 입력하세요",
                  rows: "3",
                  "max-rows": "6",
                },
                model: {
                  value: _vm.order.od_memo,
                  callback: function ($$v) {
                    _vm.$set(_vm.order, "od_memo", $$v)
                  },
                  expression: "order.od_memo",
                },
              }),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c("br"),
      _c("br"),
      _c("br"),
      _vm._v(" "),
      _c("h4", [_vm._v("결제")]),
      _vm._v(" "),
      _c("hr"),
      _vm._v(" "),
      _c(
        "b-row",
        [
          _c(
            "b-col",
            { staticClass: "payment_method", attrs: { cols: "8" } },
            [
              _c("h5", [_vm._v("결제 수단")]),
              _vm._v(" "),
              _c(
                "b-form-group",
                [
                  _c(
                    "b-row",
                    [
                      _c("b-col", { attrs: { cols: "3" } }, [_vm._v("카드")]),
                      _vm._v(" "),
                      _c(
                        "b-col",
                        [
                          _c(
                            "b-form-radio",
                            {
                              attrs: { value: "C" },
                              model: {
                                value: _vm.order.od_pay_method,
                                callback: function ($$v) {
                                  _vm.$set(_vm.order, "od_pay_method", $$v)
                                },
                                expression: "order.od_pay_method",
                              },
                            },
                            [
                              _c("img", {
                                attrs: { src: "/img/order/card.png" },
                              }),
                              _vm._v(" "),
                              _c("p", [
                                _vm._v("이니시스 온라인 신용카드 결제"),
                              ]),
                            ]
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
                      _c("b-col", { attrs: { cols: "3" } }, [
                        _vm._v("계좌이체"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "b-col",
                        [
                          _c(
                            "b-form-radio",
                            {
                              attrs: { value: "B" },
                              model: {
                                value: _vm.order.od_pay_method,
                                callback: function ($$v) {
                                  _vm.$set(_vm.order, "od_pay_method", $$v)
                                },
                                expression: "order.od_pay_method",
                              },
                            },
                            [
                              _c("img", {
                                attrs: { src: "/img/order/deposit.png" },
                              }),
                              _vm._v(" "),
                              _c("p", [_vm._v("무통장입금, 온라인계좌이체")]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("transition", { attrs: { name: "slideUpDown" } }, [
                            _vm.order.od_pay_method == "B"
                              ? _c(
                                  "div",
                                  { staticClass: "payment_option" },
                                  [
                                    _c(
                                      "b-row",
                                      [
                                        _c("b-col", { attrs: { cols: "3" } }, [
                                          _vm._v("결제금액"),
                                        ]),
                                        _vm._v(" "),
                                        _c("b-col", [
                                          _vm._v(
                                            _vm._s(
                                              _vm._f("comma")(
                                                _vm.order.price.total
                                              )
                                            ) + " 원"
                                          ),
                                        ]),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-row",
                                      [
                                        _c("b-col", { attrs: { cols: "3" } }, [
                                          _vm._v("은행선택"),
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "b-col",
                                          [
                                            _c(
                                              "b-form-radio",
                                              {
                                                attrs: { value: "K" },
                                                model: {
                                                  value:
                                                    _vm.order.extra
                                                      .oex_finance_type,
                                                  callback: function ($$v) {
                                                    _vm.$set(
                                                      _vm.order.extra,
                                                      "oex_finance_type",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "order.extra.oex_finance_type",
                                                },
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            국민은행 010-01-0944-960\n                                        "
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "b-form-radio",
                                              {
                                                attrs: { value: "W" },
                                                model: {
                                                  value:
                                                    _vm.order.extra
                                                      .oex_finance_type,
                                                  callback: function ($$v) {
                                                    _vm.$set(
                                                      _vm.order.extra,
                                                      "oex_finance_type",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "order.extra.oex_finance_type",
                                                },
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            우리은행 849-103249-13-002\n                                        "
                                                ),
                                              ]
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
                                        _c("b-col", { attrs: { cols: "3" } }, [
                                          _vm._v("예금주"),
                                        ]),
                                        _vm._v(" "),
                                        _c("b-col", [
                                          _vm._v("(주) 아이넥서스"),
                                        ]),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-row",
                                      [
                                        _c("b-col", { attrs: { cols: "3" } }, [
                                          _vm._v("입금자"),
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "b-col",
                                          [
                                            _c("b-form-input", {
                                              ref: "oex_depositor",
                                              attrs: { placeholder: "입금자" },
                                              model: {
                                                value:
                                                  _vm.order.extra.oex_depositor,
                                                callback: function ($$v) {
                                                  _vm.$set(
                                                    _vm.order.extra,
                                                    "oex_depositor",
                                                    $$v
                                                  )
                                                },
                                                expression:
                                                  "order.extra.oex_depositor",
                                              },
                                            }),
                                          ],
                                          1
                                        ),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("PayPlan", {
                                      model: {
                                        value: _vm.order.extra,
                                        callback: function ($$v) {
                                          _vm.$set(_vm.order, "extra", $$v)
                                        },
                                        expression: "order.extra",
                                      },
                                    }),
                                  ],
                                  1
                                )
                              : _vm._e(),
                          ]),
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
                      _c("b-col", { attrs: { cols: "3" } }, [_vm._v("PSYS")]),
                      _vm._v(" "),
                      _c(
                        "b-col",
                        [
                          _c(
                            "b-form-radio",
                            {
                              attrs: { value: "P" },
                              model: {
                                value: _vm.order.od_pay_method,
                                callback: function ($$v) {
                                  _vm.$set(_vm.order, "od_pay_method", $$v)
                                },
                                expression: "order.od_pay_method",
                              },
                            },
                            [
                              _c("img", {
                                attrs: { src: "/img/order/card.png" },
                              }),
                              _vm._v(" "),
                              _c("p", [_vm._v("원격지 연구비 직접결제")]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("transition", { attrs: { name: "slideUpDown" } }, [
                            _vm.order.od_pay_method == "P"
                              ? _c(
                                  "div",
                                  { staticClass: "payment_option" },
                                  [
                                    _c(
                                      "b-row",
                                      [
                                        _c("b-col", { attrs: { cols: "3" } }, [
                                          _vm._v("결제금액"),
                                        ]),
                                        _vm._v(" "),
                                        _c("b-col", [
                                          _vm._v(
                                            _vm._s(
                                              _vm._f("comma")(
                                                _vm.order.price.total
                                              )
                                            ) + " 원"
                                          ),
                                        ]),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-row",
                                      [
                                        _c("b-col", { attrs: { cols: "3" } }, [
                                          _vm._v("결제자"),
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "b-col",
                                          [
                                            _c("b-form-input", {
                                              ref: "oex_depositor",
                                              attrs: { placeholder: "결제자" },
                                              model: {
                                                value:
                                                  _vm.order.extra.oex_depositor,
                                                callback: function ($$v) {
                                                  _vm.$set(
                                                    _vm.order.extra,
                                                    "oex_depositor",
                                                    $$v
                                                  )
                                                },
                                                expression:
                                                  "order.extra.oex_depositor",
                                              },
                                            }),
                                          ],
                                          1
                                        ),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("PayPlan", {
                                      model: {
                                        value: _vm.order.extra,
                                        callback: function ($$v) {
                                          _vm.$set(_vm.order, "extra", $$v)
                                        },
                                        expression: "order.extra",
                                      },
                                    }),
                                  ],
                                  1
                                )
                              : _vm._e(),
                          ]),
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
                      _c("b-col", { attrs: { cols: "3" } }, [_vm._v("전표")]),
                      _vm._v(" "),
                      _c(
                        "b-col",
                        [
                          _c(
                            "b-form-radio",
                            {
                              attrs: { value: "S" },
                              model: {
                                value: _vm.order.od_pay_method,
                                callback: function ($$v) {
                                  _vm.$set(_vm.order, "od_pay_method", $$v)
                                },
                                expression: "order.od_pay_method",
                              },
                            },
                            [
                              _c("img", {
                                attrs: { src: "/img/order/pressure.jpg" },
                              }),
                              _vm._v(" "),
                              _c("p", [_vm._v("카드압인 전표요청")]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("transition", { attrs: { name: "slideUpDown" } }, [
                            _vm.order.od_pay_method == "S"
                              ? _c(
                                  "div",
                                  { staticClass: "payment_option" },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "card_name border border-warning rounded-lg location mt-3",
                                      },
                                      [
                                        _c(
                                          "div",
                                          { staticClass: "p-3 bg-warning" },
                                          [
                                            _vm._v(
                                              "\n                                        카드사 선택\n                                    "
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "b-form-group",
                                          { staticClass: "mt-3 pl-4" },
                                          [
                                            _c(
                                              "b-form-radio",
                                              {
                                                staticClass:
                                                  "custom-control-inline",
                                                attrs: { value: "SH" },
                                                model: {
                                                  value:
                                                    _vm.order.extra
                                                      .oex_finance_type,
                                                  callback: function ($$v) {
                                                    _vm.$set(
                                                      _vm.order.extra,
                                                      "oex_finance_type",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "order.extra.oex_finance_type",
                                                },
                                              },
                                              [_vm._v("신한")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "b-form-radio",
                                              {
                                                staticClass:
                                                  "custom-control-inline",
                                                attrs: { value: "BC" },
                                                model: {
                                                  value:
                                                    _vm.order.extra
                                                      .oex_finance_type,
                                                  callback: function ($$v) {
                                                    _vm.$set(
                                                      _vm.order.extra,
                                                      "oex_finance_type",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "order.extra.oex_finance_type",
                                                },
                                              },
                                              [_vm._v("BC")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "b-form-radio",
                                              {
                                                staticClass:
                                                  "custom-control-inline",
                                                attrs: { value: "SS" },
                                                model: {
                                                  value:
                                                    _vm.order.extra
                                                      .oex_finance_type,
                                                  callback: function ($$v) {
                                                    _vm.$set(
                                                      _vm.order.extra,
                                                      "oex_finance_type",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "order.extra.oex_finance_type",
                                                },
                                              },
                                              [_vm._v("삼성")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "b-form-radio",
                                              {
                                                staticClass:
                                                  "custom-control-inline",
                                                attrs: { value: "ETC" },
                                                model: {
                                                  value:
                                                    _vm.order.extra
                                                      .oex_finance_type,
                                                  callback: function ($$v) {
                                                    _vm.$set(
                                                      _vm.order.extra,
                                                      "oex_finance_type",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "order.extra.oex_finance_type",
                                                },
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            기타\n                                            "
                                                ),
                                                _c("input", {
                                                  directives: [
                                                    {
                                                      name: "model",
                                                      rawName: "v-model",
                                                      value:
                                                        _vm.order.extra
                                                          .oex_finance_type_etc,
                                                      expression:
                                                        "order.extra.oex_finance_type_etc",
                                                    },
                                                  ],
                                                  attrs: { type: "text" },
                                                  domProps: {
                                                    value:
                                                      _vm.order.extra
                                                        .oex_finance_type_etc,
                                                  },
                                                  on: {
                                                    focus: function ($event) {
                                                      _vm.order.extra.oex_finance_type =
                                                        "ETC"
                                                    },
                                                    input: function ($event) {
                                                      if (
                                                        $event.target.composing
                                                      ) {
                                                        return
                                                      }
                                                      _vm.$set(
                                                        _vm.order.extra,
                                                        "oex_finance_type_etc",
                                                        $event.target.value
                                                      )
                                                    },
                                                  },
                                                }),
                                              ]
                                            ),
                                          ],
                                          1
                                        ),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("PayPlan", {
                                      model: {
                                        value: _vm.order.extra,
                                        callback: function ($$v) {
                                          _vm.$set(_vm.order, "extra", $$v)
                                        },
                                        expression: "order.extra",
                                      },
                                    }),
                                  ],
                                  1
                                )
                              : _vm._e(),
                          ]),
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
                      _c("b-col", { attrs: { cols: "3" } }, [
                        _vm._v("에스크로"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "b-col",
                        [
                          _c(
                            "b-form-radio",
                            {
                              attrs: { value: "E" },
                              model: {
                                value: _vm.order.od_pay_method,
                                callback: function ($$v) {
                                  _vm.$set(_vm.order, "od_pay_method", $$v)
                                },
                                expression: "order.od_pay_method",
                              },
                            },
                            [
                              _c("img", {
                                attrs: { src: "/img/order/card.png" },
                              }),
                              _vm._v(" "),
                              _c("p", [_vm._v("결제대금예치")]),
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
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { staticClass: "payment_info", attrs: { cols: "4" } },
            [
              _c("h5", [_vm._v("결제 금액")]),
              _vm._v(" "),
              _c(
                "dl",
                { staticClass: "row p-4" },
                [
                  _c("dt", { staticClass: "col-5 bg-warning" }, [
                    _vm._v("상품금액"),
                  ]),
                  _vm._v(" "),
                  _c("dd", { staticClass: "col-7 bg-warning" }, [
                    _vm._v(
                      _vm._s(_vm._f("comma")(_vm.order.price.goods_add_vat)) +
                        " 원"
                    ),
                  ]),
                  _vm._v(" "),
                  _c("dt", { staticClass: "col-5 bg-warning" }, [
                    _vm._v("운송비"),
                  ]),
                  _vm._v(" "),
                  _c("dd", { staticClass: "col-7 bg-warning" }, [
                    _vm._v(
                      _vm._s(_vm._f("comma")(_vm.order.price.dlvy_add_vat)) +
                        " 원"
                    ),
                  ]),
                  _vm._v(" "),
                  _vm.order.price.air_add_vat
                    ? [
                        _c("dt", { staticClass: "col-5 bg-warning" }, [
                          _vm._v("항공운임료"),
                        ]),
                        _vm._v(" "),
                        _c("dd", { staticClass: "col-7 bg-warning" }, [
                          _vm._v(
                            _vm._s(
                              _vm._f("comma")(_vm.order.price.air_add_vat)
                            ) + " 원"
                          ),
                        ]),
                      ]
                    : _vm._e(),
                  _vm._v(" "),
                  _c("dt", { staticClass: "col-5 bg-warning" }, [
                    _vm._v("최종결제금액"),
                  ]),
                  _vm._v(" "),
                  _c("dd", { staticClass: "col-7 bg-warning" }, [
                    _vm._v(
                      _vm._s(_vm._f("comma")(_vm.order.price.total)) + " 원"
                    ),
                  ]),
                ],
                2
              ),
              _vm._v(" "),
              _c("transition", { attrs: { name: "slideUpDown" } }, [
                _vm.order.od_pay_method == "B" || _vm.order.od_pay_method == "E"
                  ? _c(
                      "div",
                      { staticClass: "payment_option" },
                      [
                        _c("h5", [_vm._v("지출 증빙")]),
                        _vm._v(" "),
                        _c("TaxInvoice", {
                          ref: "tax_invoice",
                          model: {
                            value: _vm.order.extra,
                            callback: function ($$v) {
                              _vm.$set(_vm.order, "extra", $$v)
                            },
                            expression: "order.extra",
                          },
                        }),
                      ],
                      1
                    )
                  : _vm._e(),
              ]),
              _vm._v(" "),
              _c(
                "b-button",
                {
                  attrs: { block: "", variant: "primary", size: "lg" },
                  on: { click: _vm.exePayment },
                },
                [_vm._v("결제하기")]
              ),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c("br"),
      _c("br"),
      _c("br"),
      _vm._v(" "),
      _c("h4", [_vm._v("거래시 필요한 서류 요청")]),
      _vm._v(" "),
      _c("hr"),
      _vm._v(" "),
      _c(
        "b-row",
        { staticClass: "mt-3 req_doc" },
        [
          _c(
            "b-col",
            [
              _c(
                "b-form-group",
                {
                  scopedSlots: _vm._u([
                    {
                      key: "label",
                      fn: function () {
                        return [
                          _c(
                            "b-form-checkbox",
                            {
                              attrs: {
                                size: "lg",
                                indeterminate: _vm.req_doc_opt.indeterminate,
                              },
                              on: { change: _vm.toggleAll },
                              model: {
                                value: _vm.req_doc_opt.allSelected,
                                callback: function ($$v) {
                                  _vm.$set(_vm.req_doc_opt, "allSelected", $$v)
                                },
                                expression: "req_doc_opt.allSelected",
                              },
                            },
                            [
                              _vm._v(
                                "\n                        모두 " +
                                  _vm._s(
                                    _vm.req_doc_opt.allSelected
                                      ? "해제"
                                      : "선택"
                                  ) +
                                  "\n                    "
                              ),
                            ]
                          ),
                        ]
                      },
                      proxy: true,
                    },
                  ]),
                },
                [
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "custom-control custom-control-inline custom-checkbox",
                    },
                    [
                      _c(
                        "b-form-checkbox",
                        {
                          attrs: {
                            size: "lg",
                            value: "Y",
                            "unchecked-value": "N",
                          },
                          model: {
                            value: _vm.req_doc_opt.opt.est,
                            callback: function ($$v) {
                              _vm.$set(_vm.req_doc_opt.opt, "est", $$v)
                            },
                            expression: "req_doc_opt.opt.est",
                          },
                        },
                        [_vm._v("견적서")]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "custom-control custom-control-inline custom-checkbox",
                    },
                    [
                      _c(
                        "b-form-checkbox",
                        {
                          attrs: {
                            size: "lg",
                            value: "Y",
                            "unchecked-value": "N",
                          },
                          model: {
                            value: _vm.req_doc_opt.opt.tran,
                            callback: function ($$v) {
                              _vm.$set(_vm.req_doc_opt.opt, "tran", $$v)
                            },
                            expression: "req_doc_opt.opt.tran",
                          },
                        },
                        [_vm._v("거래명세서")]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "custom-control custom-control-inline custom-checkbox",
                    },
                    [
                      _c(
                        "b-form-checkbox",
                        {
                          attrs: {
                            size: "lg",
                            value: "Y",
                            "unchecked-value": "N",
                          },
                          model: {
                            value: _vm.req_doc_opt.opt.biz,
                            callback: function ($$v) {
                              _vm.$set(_vm.req_doc_opt.opt, "biz", $$v)
                            },
                            expression: "req_doc_opt.opt.biz",
                          },
                        },
                        [_vm._v("사업자 등록증 사본")]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "custom-control custom-control-inline custom-checkbox",
                    },
                    [
                      _c(
                        "b-form-checkbox",
                        {
                          attrs: {
                            size: "lg",
                            value: "Y",
                            "unchecked-value": "N",
                          },
                          model: {
                            value: _vm.req_doc_opt.opt.bank,
                            callback: function ($$v) {
                              _vm.$set(_vm.req_doc_opt.opt, "bank", $$v)
                            },
                            expression: "req_doc_opt.opt.bank",
                          },
                        },
                        [_vm._v("통장 사본")]
                      ),
                    ],
                    1
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
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);