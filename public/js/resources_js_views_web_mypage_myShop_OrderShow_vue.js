"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web_mypage_myShop_OrderShow_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/http */ "./resources/js/api/http.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "MyOrder",
  components: {
    'loading-modal': function loadingModal() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_LoadingModal_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/LoadingModal.vue */ "./resources/js/views/_common/LoadingModal.vue"));
    },
    'order-step': function orderStep() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_mypage__comp_OrderStep_vue").then(__webpack_require__.bind(__webpack_require__, /*! ../_comp/OrderStep.vue */ "./resources/js/views/web/mypage/_comp/OrderStep.vue"));
    },
    'modal': function modal() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_Modal_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/Modal.vue */ "./resources/js/views/_common/Modal.vue"));
    },
    'receipt-confirm': function receiptConfirm() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_mypage_myShop__comp_ReceiptConfirm_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/ReceiptConfirm */ "./resources/js/views/web/mypage/myShop/_comp/ReceiptConfirm.vue"));
    }
  },
  data: function data() {
    return {
      isModalViewed: false,
      isLoadingModalViewed: true,
      od: {
        order_extra_info: {}
      },
      receiptItem: {}
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapGetters)({
    isLoggedin: 'auth/isLoggedin',
    user: 'auth/user',
    siteInfo: 'common/siteInfo'
  })), {}, {
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
      return Math.round(this.od.od_gd_price * Auth.user().mileage_mul);
    }
  }),
  methods: {
    receiptConfirm: function receiptConfirm(odm) {
      this.isModalViewed = true;
      this.receiptItem = Object.assign({}, odm);
    },
    hide_modal: function hide_modal() {
      this.isModalViewed = false;
    },
    getHref: function getHref(com, num) {
      return this.od.order_config.delivery_com[com].replace('[송장번호]', num);
    },
    print: function print() {
      var url = "/api/shop/order/printEstimate/".concat(this.$route.params.od_id);
      var name = "견적서 인쇄";
      var option = "width = 900, height = 900, top = 10, left = 10, location = no";
      window.open(url, name, option);
    },
    downEstimateExcel: function downEstimateExcel() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/shop/order/downEstimateExcel/".concat(_this.$route.params.od_id), {
                  responseType: 'blob'
                });

              case 2:
                res = _context.sent;

                _this.orderDocumentDown(res, 'Estimate_' + dt.format("yyyyMMdd") + '.xlsx');

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    downTransactionExcel: function downTransactionExcel() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/shop/order/downTransactionExcel/".concat(_this2.$route.params.od_id), {
                  responseType: 'blob'
                });

              case 2:
                res = _context2.sent;

                _this2.orderDocumentDown(res, 'Transaction_' + dt.format("yyyyMMdd") + '.xlsx');

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    orderDocumentDown: function orderDocumentDown(res, fileNm) {
      var fileUrl = window.URL.createObjectURL(new Blob([res.data]));
      var fileLink = document.createElement('a');
      fileLink.href = fileUrl;
      fileLink.setAttribute('download', fileNm);
      document.body.appendChild(fileLink);
      fileLink.click();
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/shop/order/".concat(_this3.$route.params.od_id));

            case 2:
              res = _context3.sent;

              if (res && res.status === 200) {
                _this3.od = res.data;
                _this3.isLoadingModalViewed = false;
              }

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=style&index=0&id=6f27c228&lang=css&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=style&index=0&id=6f27c228&lang=css&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.w_fence[data-v-6f27c228] { max-width:100%; padding-left:0; padding-right:0;\n}\n.goods[data-v-6f27c228] { border-top:3px solid #4F637B;\n}\n.goods .pa_tit[data-v-6f27c228] { flex:0 0 8%; max-width:8%; border-right:1px solid #D7D7D7; border-bottom:1px solid #D7D7D7; align-items:center; display:flex; text-align:center; justify-content:center;\n}\n.goods .gd_con .row.option[data-v-6f27c228] { background-color:#F4F1EC;\n}\n.goods .gd_con .row .col[data-v-6f27c228] { border-bottom:1px solid #D7D7D7; padding:.68rem; font-size:.85rem;\n}\n.goods .gd_con .row .col.align[data-v-6f27c228] { display:flex; align-items:center; justify-content:center;\n}\n.goods .gd_con .row:not(:first-child) .end[data-v-6f27c228] { justify-content:flex-end;\n}\n.goods .gd_con .row:not(:first-child) .col[data-v-6f27c228] { color:#AEAEAE;\n}\n.goods .gd_con .row:not(:first-child) .col .btn[data-v-6f27c228] { color:#AEAEAE; font-size:.9rem;\n}\n.goods .gd_con .row .col b[data-v-6f27c228] { color:#000; font-size:.95rem;\n}\n.goods .gd_con .row:first-child .col[data-v-6f27c228] { font-weight:600; line-height:1.7; padding:.86rem 0; font-size:.9rem; text-align:center;\n}\n.goods .gd_con .row .col[data-v-6f27c228]:nth-child(1) { flex:0 0 7%; max-width:7%;\n}\n.goods .gd_con .row .col[data-v-6f27c228]:nth-child(2) { border-right:1px solid #D7D7D7;\n}\n.goods .gd_con .row .col[data-v-6f27c228]:nth-child(3) { flex:0 0 9%; max-width:9%; border-right:1px solid #D7D7D7;\n}\n.goods .gd_con .row .col[data-v-6f27c228]:nth-child(4) { flex:0 0 11%; max-width:11%; border-right:1px solid #D7D7D7;\n}\n.goods .gd_con .row .col[data-v-6f27c228]:nth-child(5) { flex:0 0 6%; max-width:6%; border-right:1px solid #D7D7D7;\n}\n.goods .gd_con .row .col[data-v-6f27c228]:nth-child(6) { flex:0 0 12%; max-width:12%; border-right:1px solid #D7D7D7;\n}\n.goods .gd_con .row .col[data-v-6f27c228]:nth-child(7) { flex:0 0 9%; max-width:9%; flex-wrap:wrap;\n}\n.goods .gd_con .row .col img[data-v-6f27c228] { width:100%;\n}\n.goods .gd_con .row .col[data-v-6f27c228] .myCheck .custom-control-label::before, \r\n.goods .gd_con .row .col[data-v-6f27c228] .myCheck .custom-control-label::after { width:1.8rem; height:1.8rem; top:-2px;\n}\n.goods .gd_con .row .col .sum[data-v-6f27c228] { text-align:right; width:100%; line-height:2;\n}\n.goods .gd_con .row .col.desc.option[data-v-6f27c228] { display:flex; align-items:center;\n}\n.goods .gd_con .row .col .sum[data-v-6f27c228] .btn-group-toggle { display:block !important; text-align:center;\n}\n.goods .gd_con .row .col .sum[data-v-6f27c228] .btn-group-toggle .btn { background-color:#fff; color:#6F6F6F; border-color:#aaa; border-radius:2rem; padding:.17rem 0.7rem; font-size:.75rem;\n}\n.goods .gd_con .row .col .sum[data-v-6f27c228] .btn-group-toggle .btn.active { color:#fff; background-color:#4EB8C8;\n}\n.goods .dlvy_fare[data-v-6f27c228] { flex:0 0 9%; max-width:9%; align-items: center; display: flex; text-align: center; justify-content: center; border-left: 1px solid #D7D7D7; border-bottom:1px solid #D7D7D7; color:#AEAEAE;\n}\n.sum_up[data-v-6f27c228] { border-top:3px solid #4F637B;\n}\n.sum_up .total[data-v-6f27c228] { border-bottom:1px solid #D6D6D6;\n}\n.sum_up .total .col[data-v-6f27c228] { color:#000; font-weight:bold; padding:1rem .5rem;\n}\n.sum_up .total .col b[data-v-6f27c228] { font-size:1.4rem;\n}\n.sum_up .total .col[data-v-6f27c228]:nth-of-type(odd) { padding-left:2rem; display:flex; align-items:center;\n}\n.sum_up .total .col[data-v-6f27c228]:nth-of-type(even) { padding-right:2rem; text-align:right;\n}\n.sum_up .total .col[data-v-6f27c228]:nth-of-type(1) {\n}\n.sum_up .total .col[data-v-6f27c228]:nth-of-type(2) {  border-right:1px solid #D6D6D6;\n}\n.sum_up .total .col[data-v-6f27c228]:nth-of-type(2):after,\r\n.sum_up .total .col[data-v-6f27c228]:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; position:absolute; right:-14px; top:19px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.2;\n}\n.sum_up .total .col[data-v-6f27c228]:nth-of-type(2):after { content:\"+\";\n}\n.sum_up .total .col[data-v-6f27c228]:nth-of-type(3) {\n}\n.sum_up .total .col[data-v-6f27c228]:nth-of-type(4) { border-right:1px solid #D6D6D6;\n}\n.sum_up .total .col[data-v-6f27c228]:nth-of-type(4):after { content:\"=\";\n}\n.sum_up .total .col[data-v-6f27c228]:nth-of-type(5) { flex-basis:19.5%; max-width:19.5%;\n}\n.sum_up .total .col[data-v-6f27c228]:nth-of-type(6) { flex-basis:21.05%; max-width:21.05%;\n}\n.sum_up .total_sub[data-v-6f27c228] { background:#F2F3F5; border-bottom-width:0;\n}\n.sum_up .total_sub>.col[data-v-6f27c228]:nth-of-type(1) { border-right:1px solid #D6D6D6;\n}\n.sum_up .total_sub>.col[data-v-6f27c228]:nth-of-type(2) { border-right:1px solid #D6D6D6;\n}\n.sum_up .total_sub>.col[data-v-6f27c228]:nth-of-type(3) { flex-basis:40.5%; max-width:40.5%;\n}\n.sum_up .total_sub .col>div[data-v-6f27c228] { display:flex; flex-wrap:wrap;\n}\n.sum_up .total_sub .col>div[data-v-6f27c228]:nth-of-type(1) { padding:1.3rem 1rem .5rem 1rem;\n}\n.sum_up .total_sub .col>div[data-v-6f27c228]:nth-of-type(2) { padding:0 1rem 2.5rem 1rem;\n}\n.sum_up .total_sub .col>div .col[data-v-6f27c228] { color:#A8A9AB; font-weight:bold; font-size:.84rem;\n}\n.sum_up .total_sub .col>div .col[data-v-6f27c228]:nth-of-type(2) { text-align:right;\n}\n.extra_info[data-v-6f27c228] { margin-top:3rem; font-size:.95rem;\n}\n.extra_info>.row>.col[data-v-6f27c228] { border:1px solid #D7D7D7; padding:2%;\n}\n.extra_info>.row>.col .label_st[data-v-6f27c228] { flex-basis:88px; max-width:88px; padding-top:0;\n}\n.extra_info>.row>.col .label_st.od_part[data-v-6f27c228] { flex-basis:130px; max-width:130px;\n}\n.extra_info>.row>.col[data-v-6f27c228]:nth-of-type(1) { flex-basis:30%; max-width:30%;\n}\n.extra_info>.row>.col[data-v-6f27c228]:not(:nth-of-type(1)) { margin-left:-1px;\n}\n.extra_info>.row>.col .row[data-v-6f27c228] { margin-left: 0; margin-right: 0;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=style&index=0&id=6f27c228&lang=css&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=style&index=0&id=6f27c228&lang=css&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderShow_vue_vue_type_style_index_0_id_6f27c228_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderShow.vue?vue&type=style&index=0&id=6f27c228&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=style&index=0&id=6f27c228&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderShow_vue_vue_type_style_index_0_id_6f27c228_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderShow_vue_vue_type_style_index_0_id_6f27c228_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/mypage/myShop/OrderShow.vue":
/*!************************************************************!*\
  !*** ./resources/js/views/web/mypage/myShop/OrderShow.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _OrderShow_vue_vue_type_template_id_6f27c228_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderShow.vue?vue&type=template&id=6f27c228&scoped=true& */ "./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=template&id=6f27c228&scoped=true&");
/* harmony import */ var _OrderShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderShow.vue?vue&type=script&lang=js& */ "./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=script&lang=js&");
/* harmony import */ var _OrderShow_vue_vue_type_style_index_0_id_6f27c228_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OrderShow.vue?vue&type=style&index=0&id=6f27c228&lang=css&scoped=true& */ "./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=style&index=0&id=6f27c228&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _OrderShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderShow_vue_vue_type_template_id_6f27c228_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _OrderShow_vue_vue_type_template_id_6f27c228_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "6f27c228",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/mypage/myShop/OrderShow.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderShow.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=style&index=0&id=6f27c228&lang=css&scoped=true&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=style&index=0&id=6f27c228&lang=css&scoped=true& ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderShow_vue_vue_type_style_index_0_id_6f27c228_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderShow.vue?vue&type=style&index=0&id=6f27c228&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=style&index=0&id=6f27c228&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=template&id=6f27c228&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=template&id=6f27c228&scoped=true& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderShow_vue_vue_type_template_id_6f27c228_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderShow_vue_vue_type_template_id_6f27c228_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderShow_vue_vue_type_template_id_6f27c228_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderShow.vue?vue&type=template&id=6f27c228&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=template&id=6f27c228&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=template&id=6f27c228&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/OrderShow.vue?vue&type=template&id=6f27c228&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
      _c("h3", [_vm._v("주문 정보")]),
      _vm._v(" "),
      _vm.isLoadingModalViewed
        ? _c(
            "loading-modal",
            {
              attrs: { position: "absolute" },
              on: {
                "close-modal": function ($event) {
                  _vm.isLoadingModalViewed = false
                },
              },
            },
            [_vm._v("Loading ......")]
          )
        : _c(
            "div",
            [
              _c(
                "h5",
                [
                  _c("b", [_vm._v(_vm._s(_vm.od.created_at))]),
                  _vm._v(
                    "   주문번호 " + _vm._s(_vm.od.od_no) + "  \r\n            "
                  ),
                  _c("order-step", {
                    attrs: { order_config: _vm.od.order_config },
                    model: {
                      value: _vm.od.od_step,
                      callback: function ($$v) {
                        _vm.$set(_vm.od, "od_step", $$v)
                      },
                      expression: "od.od_step",
                    },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-container",
                { staticClass: "goods" },
                _vm._l(_vm.od.order_purchase_at, function (pa, pa_i) {
                  return _c(
                    "b-row",
                    { key: "pa_" + pa_i },
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
                              _c("b-col", [_vm._v("진행현황")]),
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
                                _c("b-col", { staticClass: "align" }, [
                                  odm.odm_type == "MODEL"
                                    ? _c(
                                        "div",
                                        [
                                          odm.odm_gd_id
                                            ? _c(
                                                "b-link",
                                                {
                                                  attrs: {
                                                    to: {
                                                      name: "goods_show",
                                                      params: {
                                                        gd_id: odm.odm_gd_id,
                                                      },
                                                    },
                                                  },
                                                },
                                                [
                                                  _c("img", {
                                                    attrs: {
                                                      src: odm.img_thumb_src,
                                                    },
                                                  }),
                                                ]
                                              )
                                            : _c("img", {
                                                attrs: {
                                                  src: odm.img_thumb_src,
                                                },
                                              }),
                                        ],
                                        1
                                      )
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
                                  _vm._v(_vm._s(_vm._f("comma")(odm.odm_ea))),
                                ]),
                                _vm._v(" "),
                                _c("b-col", { staticClass: "align" }, [
                                  _c("b", { staticClass: "sum" }, [
                                    _vm._v(
                                      "\r\n                                " +
                                        _vm._s(
                                          _vm._f("won")(
                                            _vm._f("comma")(
                                              odm.odm_price_add_vat * odm.odm_ea
                                            )
                                          )
                                        ) +
                                        "\r\n                            "
                                    ),
                                  ]),
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
                                                [_vm._v("배송조회")]
                                              )
                                            : _c(
                                                "b-badge",
                                                {
                                                  attrs: { variant: "primary" },
                                                },
                                                [_vm._v("준비중")]
                                              ),
                                          _vm._v(" "),
                                          _c("br"),
                                          _vm._v(" "),
                                          !odm.order_dlvy_info.oddi_receive_date
                                            ? [
                                                _vm.od.od_step == "40" ||
                                                _vm.od.od_step == "50"
                                                  ? _c(
                                                      "b-button",
                                                      {
                                                        staticClass: "teal xm",
                                                        on: {
                                                          click: function (
                                                            $event
                                                          ) {
                                                            return _vm.receiptConfirm(
                                                              odm
                                                            )
                                                          },
                                                        },
                                                      },
                                                      [_vm._v("수취확인")]
                                                    )
                                                  : _vm._e(),
                                              ]
                                            : _vm._e(),
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
                1
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
                              _vm._f("won")(
                                _vm._f("comma")(_vm.od.od_dlvy_price)
                              )
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
                              _vm._f("won")(
                                _vm._f("comma")(_vm.od.od_all_price)
                              )
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
                                  _vm._f("won")(
                                    _vm._f("comma")(_vm.od.od_surtax)
                                  )
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
              _vm._v(" "),
              _c(
                "b-container",
                { staticClass: "extra_info frm_st" },
                [
                  _c(
                    "b-row",
                    [
                      _c(
                        "b-col",
                        [
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("주문자명"),
                              ]),
                              _c("b-col", [_vm._v(_vm._s(_vm.od.od_orderer))]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("연락처"),
                              ]),
                              _c("b-col", [
                                _vm._v(_vm._s(_vm.od.od_orderer_hp)),
                              ]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("이메일"),
                              ]),
                              _c("b-col", [
                                _vm._v(_vm._s(_vm.od.od_orderer_email)),
                              ]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("직장/학교"),
                              ]),
                              _c("b-col", [_vm._v(_vm._s(_vm.od.od_company))]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st od_part" }, [
                                _vm._v("부서/학과/연구실"),
                              ]),
                              _c("b-col", [_vm._v(_vm._s(_vm.od.od_part))]),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "b-col",
                        [
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("수령인"),
                              ]),
                              _c("b-col", [_vm._v(_vm._s(_vm.od.od_receiver))]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("연락처"),
                              ]),
                              _c("b-col", [
                                _vm._v(_vm._s(_vm.od.od_receiver_hp)),
                              ]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("주소"),
                              ]),
                              _c("b-col", [
                                _vm._v(
                                  _vm._s(_vm.od.od_addr1) +
                                    " " +
                                    _vm._s(_vm.od.od_addr2)
                                ),
                              ]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("배송시"),
                                _c("br"),
                                _vm._v("요구사항"),
                              ]),
                              _c("b-col", [_vm._v(_vm._s(_vm.od.od_memo))]),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "b-col",
                        [
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("결제금액"),
                              ]),
                              _vm._v(" "),
                              _c("b-col", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("won")(
                                      _vm._f("comma")(_vm.od.od_all_price)
                                    )
                                  )
                                ),
                              ]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("결제수단"),
                              ]),
                              _vm._v(" "),
                              _c("b-col", [
                                _vm.od.od_pay_method == "B"
                                  ? _c("span", [_vm._v("계좌이체")])
                                  : _vm.od.od_pay_method == "E"
                                  ? _c("span", [_vm._v("에스크로")])
                                  : _vm.od.od_pay_method == "C"
                                  ? _c(
                                      "span",
                                      [
                                        _vm._v(
                                          "\r\n                                카드결제\r\n                                "
                                        ),
                                        _vm.od.order_pg &&
                                        _vm.od.order_pg.pg_pay_type != "PSYS"
                                          ? [
                                              _c(
                                                "b-button",
                                                {
                                                  staticClass: "sm",
                                                  on: {
                                                    click: function ($event) {
                                                      return _vm.openWinPop(
                                                        "https://iniweb.inicis.com/receipt/iniReceipt.jsp?noTid=" +
                                                          _vm.od.order_pg
                                                            .pg_tid,
                                                        450,
                                                        550
                                                      )
                                                    },
                                                  },
                                                },
                                                [_vm._v("매출전표")]
                                              ),
                                            ]
                                          : _vm._e(),
                                      ],
                                      2
                                    )
                                  : _vm.od.od_pay_method == "P"
                                  ? _c("span", [_vm._v("PSYS")])
                                  : _vm.od.od_pay_method == "R"
                                  ? _c("span", [_vm._v("원격결제")])
                                  : _vm._e(),
                              ]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("입금자명"),
                              ]),
                              _vm._v(" "),
                              _c("b-col", [
                                _vm._v(
                                  _vm._s(_vm.od.order_extra_info.oex_depositor)
                                ),
                              ]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("결제예정일"),
                              ]),
                              _vm._v(" "),
                              _c("b-col", [_vm._v(_vm._s(_vm.payPlanDisplay))]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("입금계좌"),
                              ]),
                              _vm._v(" "),
                              _c("b-col", [
                                _vm.od.order_extra_info.oex_bank == "K"
                                  ? _c("span", [
                                      _vm._v(
                                        "국민은행 - " +
                                          _vm._s(_vm.siteInfo.bank.num02)
                                      ),
                                    ])
                                  : _vm.od.order_extra_info.oex_bank == "W"
                                  ? _c("span", [
                                      _vm._v(
                                        "우리은행 - " +
                                          _vm._s(_vm.siteInfo.bank.num01)
                                      ),
                                    ])
                                  : _vm._e(),
                              ]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-row",
                            [
                              _c("b-col", { staticClass: "label_st" }, [
                                _vm._v("요청서류"),
                              ]),
                              _vm._v(" "),
                              _c("b-col", [
                                _vm._v(_vm._s(_vm.reqDocumentDisplay)),
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
              ),
              _vm._v(" "),
              _vm.od.od_step < 60 && !_vm.isEmpty(_vm.od.od_mng)
                ? _c(
                    "div",
                    { staticClass: "btn_box" },
                    [
                      _c(
                        "b-button",
                        { staticClass: "black lg", on: { click: _vm.print } },
                        [_vm._v("견적서 출력")]
                      ),
                      _vm._v(" "),
                      _c(
                        "b-button",
                        {
                          staticClass: "gray lg",
                          on: { click: _vm.downEstimateExcel },
                        },
                        [_vm._v("견적서 EXCEL 다운")]
                      ),
                      _vm._v(" "),
                      _c(
                        "b-button",
                        {
                          staticClass: "blue lg",
                          on: { click: _vm.downTransactionExcel },
                        },
                        [_vm._v("거래명세서 EXCEL 다운")]
                      ),
                    ],
                    1
                  )
                : _vm._e(),
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
                "modal",
                {
                  attrs: { max_width: 500 },
                  on: {
                    "close-modal": function ($event) {
                      _vm.isModalViewed = false
                    },
                  },
                },
                [
                  _c("receipt-confirm", {
                    attrs: { item: _vm.receiptItem },
                    on: { hide_modal: _vm.hide_modal },
                  }),
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