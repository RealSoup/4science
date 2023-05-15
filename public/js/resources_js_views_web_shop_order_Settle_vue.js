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


 // import { validationChecker } from './_comp/FormValidation.js'
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
    'Modal': function Modal() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_Modal_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/Modal.vue */ "./resources/js/views/_common/Modal.vue"));
    },
    'PayPlan': function PayPlan() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_shop_order__comp_PayPlan_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/PayPlan */ "./resources/js/views/web/shop/order/_comp/PayPlan.vue"));
    },
    'TaxInvoice': function TaxInvoice() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web_shop_order__comp_TaxInvoice_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/TaxInvoice */ "./resources/js/views/web/shop/order/_comp/TaxInvoice.vue"));
    },
    'PaList': function PaList() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web__module_PaList_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/web/_module/PaList */ "./resources/js/views/web/_module/PaList.vue"));
    },
    'AddrIndex': function AddrIndex() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web__module_addr_Index_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/web/_module/addr/Index */ "./resources/js/views/web/_module/addr/Index.vue"));
    },
    'AddrCreate': function AddrCreate() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web__module_addr_Create_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/web/_module/addr/Create */ "./resources/js/views/web/_module/addr/Create.vue"));
    },
    'AddrEdit': function AddrEdit() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web__module_addr_Edit_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/web/_module/addr/Edit */ "./resources/js/views/web/_module/addr/Edit.vue"));
    },
    'PopUp': function PopUp() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web__module_PopUp_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/web/_module/PopUp */ "./resources/js/views/web/_module/PopUp.vue"));
    }
  },
  watch: {
    'order.od_pay_method': {
      handler: function handler(n, o) {
        if (n == 'R') {
          var tel = this.$store.state.auth.user.hp.split('-');
          this.order.extra.oex_mng = this.$store.state.auth.user.name;
          this.order.extra.oex_num_tel1 = tel[0];
          this.order.extra.oex_num_tel2 = tel[1];
          this.order.extra.oex_num_tel3 = tel[2];
          this.order.extra.oex_email = this.$store.state.auth.user.email;
        } else {
          this.order.extra.oex_mng = '';
          this.order.extra.oex_num_tel1 = '';
          this.order.extra.oex_num_tel2 = '';
          this.order.extra.oex_num_tel3 = '';
          this.order.extra.oex_email = '';
        }

        this.order.extra.oex_type = 'NO';
      },
      deep: true
    },
    'order.extra.oex_type_fir': {
      handler: function handler(n, o) {
        console.log(n);
        if (n == 'TX') this.order.extra.oex_type = 'IV';else if (n == 'CA') this.order.extra.oex_type = 'HP';else if (n == 'NO') this.order.extra.oex_type = 'NO';
      }
    }
  },
  data: function data() {
    return {
      isModalViewed: false,
      modal_type: 'index',
      postcode_open: false,
      order: {
        od_id: 0,
        goods: this.$route.params.od_goods,
        lists: {},
        price: {},
        od_name: "",
        od_er_id: this.$route.params.od_er_id,
        od_type: this.$route.params.od_type,
        od_pay_method: '',
        od_orderer: '',
        od_orderer_hp: "",
        od_orderer_hp1: '',
        od_orderer_hp2: '',
        od_orderer_hp3: '',
        od_orderer_email: "",
        od_orderer_email_id: '',
        od_orderer_email_domain: '',
        od_orderer_email_domain_slt: '',
        od_department: '',
        od_ua_title: '',
        od_zip: "",
        od_addr1: "",
        od_addr2: "",
        od_receiver: "",
        od_receiver_hp: "",
        od_receiver_hp1: '',
        od_receiver_hp2: '',
        od_receiver_hp3: '',
        od_memo: "",
        od_memo_slt: '',
        addr_type: 'D',
        extra: {
          oex_hasBizLicense: true,
          oex_file: null,
          oex_depositor: '',
          oex_email: '',
          oex_mng: '',
          oex_num_tel: '',
          oex_pay_plan: 'soon',
          oex_pay_plan_etc: '',
          oex_bank: 'K',
          oex_type_fir: 'NO',
          oex_type: '',
          oex_req_est: 'N',
          oex_req_tran: 'N',
          oex_req_biz: 'N',
          oex_req_bank: 'N',
          oex_num: ''
        },
        tCode: '',
        privacy: 'Y',
        check_terms: 'Y',
        dlvy_air: 'N',
        sale_env: ''
      },
      addr: [],
      addr_edit_index: 0,
      config: {},
      inicis: {}
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
    },
    isDlvyAir: function isDlvyAir() {
      return Object.values(this.order.lists).find(function (e) {
        return e[0].pa_type === 'AIR';
      }) !== undefined;
    }
  },
  methods: {
    onPostcodeSlt: function onPostcodeSlt(result) {
      this.$set(this.order, 'od_zip', result.zonecode);
      var addr = result.roadAddress;
      addr += result.buildingName ? "(" + result.buildingName + ")" : '';
      this.$set(this.order, 'od_addr1', addr);
      this.$refs.od_addr2.focus();
      document.getElementById('address').scrollIntoView();
      this.postcode_open = false;
    },
    exePayment: function exePayment() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var pay, frm, form, objs01, objs02, objs03, objs04, objs05, objs06, objs07, objs08, objs09;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.order.od_orderer_hp = "".concat(_this.order.od_orderer_hp1, "-").concat(_this.order.od_orderer_hp2, "-").concat(_this.order.od_orderer_hp3);
                _this.order.od_receiver_hp = "".concat(_this.order.od_receiver_hp1, "-").concat(_this.order.od_receiver_hp2, "-").concat(_this.order.od_receiver_hp3);
                _this.order.od_orderer_email = "".concat(_this.order.od_orderer_email_id, "@").concat(_this.order.od_orderer_email_domain);

                if (!_this.validationChecker(_this.order)) {
                  _context.next = 37;
                  break;
                }

                _context.t0 = _this.order.extra.oex_type;
                _context.next = _context.t0 === 'HP' ? 7 : _context.t0 === 'IN' ? 9 : _context.t0 === 'CN' ? 11 : _context.t0 === 'BN' ? 13 : 15;
                break;

              case 7:
                _this.order.extra.oex_num = "".concat(_this.order.extra.oex_num_hp1, "-").concat(_this.order.extra.oex_num_hp2, "-").concat(_this.order.extra.oex_num_hp3);
                return _context.abrupt("break", 15);

              case 9:
                _this.order.extra.oex_num = "".concat(_this.order.extra.oex_num_in1, "-").concat(_this.order.extra.oex_num_in2);
                return _context.abrupt("break", 15);

              case 11:
                _this.order.extra.oex_num = "".concat(_this.order.extra.oex_num_cn1, "-").concat(_this.order.extra.oex_num_cn2, "-").concat(_this.order.extra.oex_num_cn3, "-").concat(_this.order.extra.oex_num_cn4);
                return _context.abrupt("break", 15);

              case 13:
                _this.order.extra.oex_num = "".concat(_this.order.extra.oex_num_bn1, "-").concat(_this.order.extra.oex_num_bn2, "-").concat(_this.order.extra.oex_num_bn3);
                return _context.abrupt("break", 15);

              case 15:
                if (_this.order.od_pay_method == 'R') {
                  _this.order.extra.oex_num_tel = "".concat(_this.order.extra.oex_num_tel1, "-").concat(_this.order.extra.oex_num_tel2, "-").concat(_this.order.extra.oex_num_tel3);
                  if (_this.order.extra.oex_pay_plan == "etc") _this.order.extra.oex_pay_plan = _this.order.extra.oex_pay_plan_etc;
                }

                _context.next = 18;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/shop/order/pay", _this.order);

              case 18:
                pay = _context.sent;

                if (!(pay && pay.status === 200)) {
                  _context.next = 37;
                  break;
                }

                _this.inicis = pay.data.inicis;

                if (!(_this.order.extra.oex_hasBizLicense && !isEmpty(_this.order.extra.oex_file))) {
                  _context.next = 30;
                  break;
                }

                frm = new FormData();
                frm.append('fi_group', 'order');
                frm.append('fi_key', pay.data.od_id);
                frm.append('fi_kind', 'biz');
                frm.append('fi_room', new Date().getFullYear());
                frm.append("file[]", _this.order.extra.oex_file);
                _context.next = 30;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post('/api/upload', frm);

              case 30:
                if (!(_this.order.od_pay_method == 'C')) {
                  _context.next = 35;
                  break;
                }

                _this.order.od_id = pay.data.od_id;
                if (_this.order.sale_env == 'P') INIStdPay.pay('SendPayForm');else if (_this.order.sale_env == 'M') {
                  form = document.createElement('form'); // 폼객체 생성

                  objs01 = document.createElement('input');
                  objs02 = document.createElement('input');
                  objs03 = document.createElement('input');
                  objs04 = document.createElement('input');
                  objs05 = document.createElement('input');
                  objs06 = document.createElement('input');
                  objs07 = document.createElement('input');
                  objs08 = document.createElement('input');
                  objs09 = document.createElement('input');
                  objs01.setAttribute('name', 'P_INI_PAYMENT');
                  objs01.setAttribute('value', 'CARD');
                  form.appendChild(objs01);
                  objs02.setAttribute('name', 'P_MID');
                  objs02.setAttribute('value', _this.inicis.mid);
                  form.appendChild(objs02);
                  objs03.setAttribute('name', 'P_OID');
                  objs03.setAttribute('value', _this.inicis.od_no);
                  form.appendChild(objs03);
                  objs04.setAttribute('name', 'P_GOODS');
                  objs04.setAttribute('value', _this.order.od_name);
                  form.appendChild(objs04);
                  objs05.setAttribute('name', 'P_AMT');
                  objs05.setAttribute('value', _this.order.price.total);
                  form.appendChild(objs05);
                  objs06.setAttribute('name', 'P_UNAME');
                  objs06.setAttribute('value', _this.$store.state.auth.user.name);
                  form.appendChild(objs06);
                  objs07.setAttribute('name', 'P_NEXT_URL');
                  objs07.setAttribute('value', _this.inicis.returnUrlMobaile);
                  form.appendChild(objs07);
                  objs08.setAttribute('name', 'P_CHARSET');
                  objs08.setAttribute('value', 'utf8');
                  form.appendChild(objs08);
                  objs09.setAttribute('name', 'P_NOTI');
                  objs09.setAttribute('value', _this.order.od_id);
                  form.appendChild(objs09);
                  form.setAttribute('method', 'post'); //get,post 가능

                  form.setAttribute('action', "https://mobile.inicis.com/smart/payment/"); //보내는 url

                  form.setAttribute("accept-charset", "EUC-KR");
                  document.body.appendChild(form);
                  form.submit();
                }
                _context.next = 37;
                break;

              case 35:
                _context.next = 37;
                return _router__WEBPACK_IMPORTED_MODULE_3__["default"].push({
                  name: 'order_done',
                  params: {
                    od_id: pay.data.od_id
                  }
                });

              case 37:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    email_domain_slt: function email_domain_slt() {
      this.order.od_orderer_email_domain = this.config.email_domain[this.order.od_orderer_email_domain_slt];
    },
    memo_slt: function memo_slt() {
      this.order.od_memo = this.config.dlvy_msg[this.order.od_memo_slt];
    },
    set_orderer: function set_orderer() {
      var odhp = Auth.user().hp.split('-');
      var odemail = Auth.user().email.split('@');
      this.order.od_orderer = Auth.user().name;
      this.order.od_orderer_hp1 = odhp[0];
      this.order.od_orderer_hp2 = odhp[1];
      this.order.od_orderer_hp3 = odhp[2];
      this.order.od_orderer_email_id = odemail[0];
      this.order.od_orderer_email_domain = odemail[1];
      this.order.od_department = Auth.user().department;
      return;
    },
    addr_choose: function addr_choose(addr) {
      var hp = addr.ua_hp.split('-');
      this.order.od_ua_title = addr.ua_title;
      this.order.od_zip = addr.ua_zip;
      this.order.od_addr1 = addr.ua_addr1;
      this.order.od_addr2 = addr.ua_addr2;
      this.order.od_receiver = addr.ua_name;
      this.order.od_receiver_hp = addr.ua_hp;
      this.order.od_receiver_hp1 = hp[0];
      this.order.od_receiver_hp2 = hp[1];
      this.order.od_receiver_hp3 = hp[2];
      this.order.od_memo = addr.ua_memo;
      this.isModalViewed = false;
      return;
    },
    change_addr_type: function change_addr_type(v) {
      if (v == 'D') this.addr_choose(this.addr[0]);else if (v == 'N') {
        this.order.od_ua_title = '';
        this.order.od_zip = '';
        this.order.od_addr1 = '';
        this.order.od_addr2 = '';
        this.order.od_receiver = '';
        this.order.od_receiver_hp = '';
        this.order.od_receiver_hp1 = '';
        this.order.od_receiver_hp2 = '';
        this.order.od_receiver_hp3 = '';
        this.order.od_memo = '';
      }
    },
    config_addr: function config_addr() {
      this.isModalViewed = true;
      this.modal_type = 'index';
    },
    addr_create: function addr_create() {
      this.modal_type = 'create';
    },
    addr_index: function addr_index() {
      this.modal_type = 'index';
    },
    addr_store: function addr_store() {
      this.modal_type = 'index';
    },
    addr_edit: function addr_edit(i) {
      this.modal_type = 'edit';
      this.addr_edit_index = i;
    },
    focusNext: function focusNext(e, max, next) {
      this.$focusNext(e, max, next);
    },
    maxlength_3: function maxlength_3(e) {
      return String(e).substring(0, 3);
    },
    maxlength_4: function maxlength_4(e) {
      return String(e).substring(0, 4);
    },
    tax_invoice: function tax_invoice() {
      this.isModalViewed = true;
      this.modal_type = 'tax';
    },
    modal_close: function modal_close() {
      this.isModalViewed = false;
    },
    validationChecker: function validationChecker(frm) {
      if (this.order.privacy !== 'Y') {
        Notify.toast('danger', "개인정보 수집 및 이용에 동의 해주세요.");
        document.getElementById('total_sub').scrollIntoView();
        return false;
      }

      if (!this.isDlvyAir && this.order.check_terms !== 'Y') {
        Notify.toast('danger', "구매자 및 사용자 확인사항에 동의 해주세요.");
        document.getElementById('total_sub').scrollIntoView();
        return false;
      }

      if (this.isDlvyAir && this.order.dlvy_air !== 'Y') {
        Notify.toast('danger', "단순 제품 교환 및 반품 불가에 동의 해주세요");
        document.getElementById('total_sub').scrollIntoView();
        return false;
      }

      if (this.order.od_pay_method == '') {
        Notify.toast('danger', "결제 수단을 선택하세요.");
        document.getElementById('payment').scrollIntoView();
        return false;
      }

      switch (frm.od_pay_method) {
        case 'B':
          if (isEmpty(frm.extra.oex_depositor)) {
            Notify.toast('danger', "입금자명을 입력해주세요");
            this.$refs.oex_depositor.focus();
            return false;
          }

        case 'E':
          if (frm.extra.oex_type == 'IV') {
            if (frm.extra.oex_hasBizLicense) {
              if (isEmpty(frm.extra.oex_file)) {
                Notify.toast('danger', "사업자 등록증 사본을 첨부해주세요");
                this.tax_invoice();
                this.$refs.tax_invoice.$refs.oex_file.$refs.input.focus();
                return false;
              }
            } else {
              if (isEmpty(frm.extra.oex_biz_name)) {
                Notify.toast('danger', "법인명을 입력해주세요");
                this.tax_invoice();
                this.$refs.tax_invoice.$refs.oex_biz_name.focus();
                return false;
              }

              if (isEmpty(frm.extra.oex_biz_num)) {
                Notify.toast('danger', "사업자 등록번호를 입력해주세요");
                this.tax_invoice();
                this.$refs.tax_invoice.$refs.oex_biz_num.focus();
                return false;
              }

              if (isEmpty(frm.extra.oex_biz_type)) {
                Notify.toast('danger', "업태를 입력해주세요");
                this.tax_invoice();
                this.$refs.tax_invoice.$refs.oex_biz_type.focus();
                return false;
              }

              if (isEmpty(frm.extra.oex_biz_item)) {
                Notify.toast('danger', "종목를 입력해주세요");
                this.tax_invoice();
                this.$refs.tax_invoice.$refs.oex_biz_item.focus();
                return false;
              }

              if (isEmpty(frm.extra.oex_ceo)) {
                Notify.toast('danger', "대표자명을 입력해주세요");
                this.tax_invoice();
                this.$refs.tax_invoice.$refs.oex_ceo.focus();
                return false;
              }

              if (isEmpty(frm.extra.oex_addr)) {
                Notify.toast('danger', "사업장 소재지를 입력해주세요");
                this.tax_invoice();
                this.$refs.tax_invoice.$refs.oex_addr.focus();
                return false;
              }
            }

            if (isEmpty(frm.extra.oex_mng)) {
              Notify.toast('danger', "담당자를 입력해주세요");
              this.tax_invoice();
              this.$refs.tax_invoice.$refs.oex_mng.focus();
              return false;
            }

            if (isEmpty(frm.extra.oex_email)) {
              Notify.toast('danger', "이메일을 입력해주세요");
              this.tax_invoice();
              this.$refs.tax_invoice.$refs.oex_email.focus();
              return false;
            }

            if (isEmpty(frm.extra.oex_num_tel)) {
              Notify.toast('danger', "핸드폰 번호를 입력해주세요");
              this.tax_invoice();
              this.$refs.tax_invoice.$refs.oex_num_tel.focus();
              return false;
            }
          }

          break;

        default:
          break;
      }

      if (isEmpty(frm.od_orderer)) {
        Notify.toast('danger', "주문자 이름을 입력하세요.");
        this.$refs.od_orderer.focus();
        return false;
      }

      if (isEmpty(frm.od_orderer_hp1)) {
        Notify.toast('danger', "주문자 전화번호 1를 입력하세요.");
        this.$refs.od_orderer_hp1.focus();
        return false;
      }

      if (isEmpty(frm.od_orderer_hp2)) {
        Notify.toast('danger', "주문자 전화번호 2를 입력하세요.");
        this.$refs.od_orderer_hp2.focus();
        return false;
      }

      if (isEmpty(frm.od_orderer_hp3)) {
        Notify.toast('danger', "주문자 전화번호 3를 입력하세요.");
        this.$refs.od_orderer_hp3.focus();
        return false;
      }

      if (isEmpty(frm.od_orderer_email_id)) {
        Notify.toast('danger', "주문자 이메일 ID을 입력하세요.");
        this.$refs.od_orderer_email_id.focus();
        return false;
      }

      if (isEmpty(frm.od_orderer_email_domain)) {
        Notify.toast('danger', "주문자 이메일 도메인을 입력하세요.");
        this.$refs.od_orderer_email_domain.focus();
        return false;
      }

      if (isEmpty(frm.od_receiver)) {
        Notify.toast('danger', "수령인을 입력하세요.");
        this.$refs.od_receiver.focus();
        return false;
      }

      if (isEmpty(frm.od_receiver_hp1)) {
        Notify.toast('danger', "수령인 연락처 1를 입력하세요.");
        this.$refs.od_receiver_hp1.focus();
        return false;
      }

      if (isEmpty(frm.od_receiver_hp2)) {
        Notify.toast('danger', "수령인 연락처 2를 입력하세요.");
        this.$refs.od_receiver_hp2.focus();
        return false;
      }

      if (isEmpty(frm.od_receiver_hp3)) {
        Notify.toast('danger', "수령인 연락처 3를 입력하세요.");
        this.$refs.od_receiver_hp3.focus();
        return false;
      }

      if (isEmpty(frm.od_zip)) {
        Notify.toast('danger', "배송지 우편번호를 입력하세요.");
        this.$refs.od_zip.focus();
        return false;
      }

      if (isEmpty(frm.od_addr1)) {
        Notify.toast('danger', "배송지 주소를 입력하세요.");
        this.$refs.od_addr1.focus();
        return false;
      }

      if (isEmpty(frm.od_addr2)) {
        Notify.toast('danger', "배송지 상세주소를 입력하세요.");
        this.$refs.od_addr2.focus();
        return false;
      }

      return true;
    }
  },
  created: function created() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      var tCode, res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              tCode = new Date().format("yyMMddHHmm");

              if (!_this2.$route.params.od_goods) {
                _context2.next = 10;
                break;
              }

              _this2.order.goods = _this2.$route.params.od_goods;
              _this2.order.od_type = _this2.$route.params.od_type;
              _this2.order.tCode = tCode;
              sessionStorage.setItem('goods', JSON.stringify(_this2.order.goods));
              sessionStorage.setItem('od_type', _this2.order.od_type);
              sessionStorage.setItem('od_time', tCode);
              _context2.next = 25;
              break;

            case 10:
              if (!sessionStorage.getItem('od_time')) {
                _context2.next = 22;
                break;
              }

              if (!(tCode - sessionStorage.getItem('od_time') <= 20)) {
                _context2.next = 17;
                break;
              }

              _this2.order.goods = JSON.parse(sessionStorage.getItem('goods'));
              _this2.order.od_type = sessionStorage.getItem('od_type');
              _this2.order.tCode = tCode;
              _context2.next = 20;
              break;

            case 17:
              //  주문 정보를 가져온후 일정 시간이 경과하면
              Notify.toast('danger', "오랜시간 주문이 이루어 지지 않았습니다.");

              _this2.$router.go(-1);

              return _context2.abrupt("return", false);

            case 20:
              _context2.next = 25;
              break;

            case 22:
              Notify.toast('danger', "잘못된 접근 경로입니다.");

              _this2.$router.go(-1);

              return _context2.abrupt("return", false);

            case 25:
              _context2.prev = 25;
              _context2.next = 28;
              return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post('/api/shop/order/settle', {
                type: _this2.order.od_type,
                goods: _this2.order.goods
              });

            case 28:
              res = _context2.sent;

              if (res && res.status === 200) {
                _this2.order.lists = res.data.lists;
                _this2.order.price = res.data.price;
                _this2.order.od_name = res.data.od_name;
                _this2.config = res.data.config;
                _this2.addr = res.data.addr;
                _this2.order.sale_env = res.data.sale_env;

                _this2.set_orderer();

                _this2.addr_choose(_this2.addr[0]);
              }
              /*  견적가 에러는 
                  \resources\js\api\http.js
                  이쪽에서 발사한다.
              */


              _context2.next = 36;
              break;

            case 32:
              _context2.prev = 32;
              _context2.t0 = _context2["catch"](25);
              Notify.consolePrint(_context2.t0);
              Notify.toast('warning', _context2.t0.responsee);

            case 36:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[25, 32]]);
    }))();
  },
  mounted: function mounted() {
    // console.log(this.$session.get('order'));
    // this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
    //     console.log('collapseId:', collapseId)
    //     console.log('isJustShown:', isJustShown)
    // })
    var plugin = document.createElement("script"); // plugin.setAttribute( "src", "https://stgstdpay.inicis.com/stdjs/INIStdPay.js" );    //  테스트1

    plugin.setAttribute("src", "https://stdpay.inicis.com/stdjs/INIStdPay.js"); //  운영

    plugin.async = true;
    document.head.appendChild(plugin);
  }
});

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
___CSS_LOADER_EXPORT___.push([module.id, "\n#settle[data-v-6c9bc94a] { margin-top:2rem;\n}\n#settle h2[data-v-6c9bc94a] { font-weight:bold; font-size:1.8rem; padding-left:1.8rem;\n}\n#settle h4[data-v-6c9bc94a] { margin:2.3rem 0 0; font-weight:600; font-size:1.3rem; border-bottom:2px solid #000; padding:.7em 1.8rem;\n}\n#settle .st_bottom[data-v-6c9bc94a] { padding:0;\n}\n#settle .st_bottom .row[data-v-6c9bc94a] { margin:0;\n}\n#settle .st_bottom .row .col[data-v-6c9bc94a] { padding:0;\n}\n#settle .st_bottom .row .col.inputs[data-v-6c9bc94a] { padding-right:.875rem;\n}\n#settle .st_bottom .inputs .agreement[data-v-6c9bc94a] { align-items:flex-start;\n}\n#settle .st_bottom .inputs .agreement .col[data-v-6c9bc94a] { padding:1.5rem; background:#4F708F; border-radius:.5rem;\n}\n#settle .st_bottom .inputs .agreement .col[data-v-6c9bc94a]:nth-of-type(1) { margin-right: 0.25rem;\n}\n#settle .st_bottom .inputs .agreement .col[data-v-6c9bc94a]:nth-of-type(2) { margin-left: 0.25rem;\n}\n#settle .st_bottom .inputs .agreement .col .head[data-v-6c9bc94a] { color:#FFF; font-size:.8rem; display:flex; justify-content:space-between; align-items:center;\n}\n#settle .st_bottom .inputs .agreement .col .custom-radio[data-v-6c9bc94a] { display:flex; align-items:center;\n}\n#settle .st_bottom .inputs .agreement .col .custom-radio[data-v-6c9bc94a] label::before, \r\n#settle .st_bottom .inputs .agreement .col .custom-radio[data-v-6c9bc94a] label::after { top:.15rem; left:-1.4rem;\n}\n#settle .st_bottom .inputs .agreement .col .collapse .card[data-v-6c9bc94a] { text-align:justify; color:#000; margin-top:1rem; font-size:.8rem;\n}\n#settle .st_bottom .inputs div h4[data-v-6c9bc94a] { margin-bottom:2.55rem; margin-top:3.5rem;\n}\n#settle .st_bottom .inputs div .row[data-v-6c9bc94a] { align-items:baseline;\n}\n#settle .st_bottom .inputs div .row label[data-v-6c9bc94a] { flex-basis:15.8%; max-width:15.8%; flex-grow:1; text-indent:56px; font-weight:bold;\n}\n#settle .st_bottom .inputs div .row label i[data-v-6c9bc94a] { display:inline-block; background:#FF0000; width:4px; height:4px; border-radius:4px; position:relative; top:-9px; right:-3px;\n}\n#settle .st_bottom .inputs div .row .col[data-v-6c9bc94a] { display:flex; align-items:center;\n}\n#settle .st_bottom .inputs div .row .col input[data-v-6c9bc94a],\r\n#settle .st_bottom .inputs div .row .col select[data-v-6c9bc94a],\r\n#settle .st_bottom .inputs div .row .col .btn[data-v-6c9bc94a] { border-color:#CCC; border-radius:0; margin:.57rem 0; height:calc(1.5em + 0.75rem + 0px); color:#898989;\n}\n#settle .st_bottom .inputs div .row .col svg[data-v-6c9bc94a] { margin:0 .5rem;\n}\n#settle .st_bottom .inputs .address[data-v-6c9bc94a] { position:relative;\n}\n#settle .st_bottom .inputs .address h4[data-v-6c9bc94a] { display:flex; align-items:center; justify-content:space-between;\n}\n#settle .st_bottom .inputs .address h4 div[data-v-6c9bc94a] { display:flex; justify-content:flex-end; align-items:center;\n}\n#settle .st_bottom .inputs .address h4 div[data-v-6c9bc94a] label { font-size:1rem; margin-right:1rem;\n}\n#settle .st_bottom .inputs .address h4 div[data-v-6c9bc94a] label::before, \r\n#settle .st_bottom .inputs .address h4 div[data-v-6c9bc94a] label::after { top:.15rem; left:-1.2rem;\n}\n#settle .st_bottom .inputs .orderer .row:nth-of-type(1) .col[data-v-6c9bc94a],\r\n#settle .st_bottom .inputs .orderer .row:nth-of-type(4) .col[data-v-6c9bc94a],\r\n#settle .st_bottom .inputs .address .row:nth-of-type(1) .col[data-v-6c9bc94a],\r\n#settle .st_bottom .inputs .address .row:nth-of-type(2) .col[data-v-6c9bc94a] { flex-basis:36%; max-width:36%;\n}\n#settle .st_bottom .inputs .orderer .row:nth-of-type(2) .col input[data-v-6c9bc94a],\r\n#settle .st_bottom .inputs .address .row:nth-of-type(3) .col input[data-v-6c9bc94a] { max-width:122px;\n}\n#settle .st_bottom .inputs .orderer .row:nth-of-type(3) .col input[data-v-6c9bc94a] { max-width:180px;\n}\n#settle .st_bottom .inputs .orderer .row:nth-of-type(3) .col select[data-v-6c9bc94a] { max-width:122px; margin:0 .5rem;\n}\n#settle .st_bottom .inputs .address .row:nth-of-type(4) .col[data-v-6c9bc94a] { flex-basis:46%; max-width:46%;\n}\n#settle .st_bottom .inputs .address .row:nth-of-type(4) .col div input[data-v-6c9bc94a] { max-width:180px; display:inline-block;\n}\n#settle .st_bottom .inputs .address .row:nth-of-type(4) .col div .btn[data-v-6c9bc94a] { font-size:.9rem; height:36px; position:relative; top:-2px;}\n#settle .st_bottom .inputs .address .row:nth-of-type(5) .col[data-v-6c9bc94a] { display:block; flex-basis:53%; max-width:53%;\n}\n#settle .st_bottom .inputs .address .row:nth-of-type(5) .col select[data-v-6c9bc94a] { max-width:446px;\n}\n#settle .st_bottom .inputs .address .sch_zip[data-v-6c9bc94a] { margin-top:1rem; position:absolute; z-index:1; border:2px solid #000;\n}\n#settle .st_bottom .pay_go[data-v-6c9bc94a] { background:#1A90D6; width:100%; font-size:1.6rem; font-weight:bold; padding:.8em 0; border-radius:.9rem; margin-top:2rem;\n}\n#settle .st_bottom .row .col.payment[data-v-6c9bc94a] { flex-basis:31%; max-width:31%; padding-left:.875rem;\n}\n#settle .st_bottom .payment .top[data-v-6c9bc94a] { background:#1A90D6; border-radius:2rem 2rem 0 0; padding:1.4rem 1.3rem; align-items:center;\n}\n#settle .st_bottom .payment .top .col[data-v-6c9bc94a] { font-weight:bold; color:#fff;\n}\n#settle .st_bottom .payment .top .col b[data-v-6c9bc94a] { font-size:2.1rem;\n}\n#settle .st_bottom .payment .top .col span[data-v-6c9bc94a] { font-size:.7rem; display:block;\n}\n#settle .st_bottom .payment .top .col[data-v-6c9bc94a]:nth-of-type(2) { text-align:right;\n}\n#settle .st_bottom .payment .body[data-v-6c9bc94a] { padding:1rem; border:2px solid #D7D7D7; border-radius:3px;\n}\n#settle .st_bottom .payment .body h5[data-v-6c9bc94a] { font-size:1.1rem; font-weight:bold; margin-bottom:.6rem; padding-left:.5rem;\n}\n#settle .st_bottom .payment .body>div[data-v-6c9bc94a] { border-top:1px solid #d7d7d7; padding:.94rem 0;\n}\n#settle .st_bottom .payment .body div[data-v-6c9bc94a] h6 { background:#626262; display:inline-block; padding:.5rem 1rem; border-radius:1.5rem; color:#FFF; font-size:.85rem; margin-bottom: 1rem;\n}\n#settle .st_bottom .payment .body .method>div[data-v-6c9bc94a] { margin:1rem 0;\n}\n#settle .st_bottom .payment .body .method div .custom-radio[data-v-6c9bc94a] { display:inline-block; width:28%;\n}\n#settle .st_bottom .payment .body .method div .custom-radio[data-v-6c9bc94a] label { font-weight:bold; color:#616161; font-size:.95rem; cursor:pointer;\n}\n#settle .st_bottom .payment .body .method div span[data-v-6c9bc94a] { color:#ACACAC; font-size:.8rem;\n}\n#settle .st_bottom .payment .body .method div span b[data-v-6c9bc94a] { cursor:pointer; position:relative;\n}\n#settle .st_bottom .payment .body .method div span img[data-v-6c9bc94a] { display:none; position:absolute; top:0; right:0; z-index:2; border:2px solid #616161; border-radius:.5rem;\n}\n#settle .st_bottom .payment .body .method div span b:hover img[data-v-6c9bc94a] { display:block;\n}\n#settle .st_bottom .payment .body .pay_info .row[data-v-6c9bc94a] { margin:1rem 0;\n}\n#settle .st_bottom .payment .body .pay_info .row[data-v-6c9bc94a]:first-of-type { align-items: baseline;\n}\n#settle .st_bottom .payment .body .pay_info .row div[data-v-6c9bc94a] { font-weight:600; color:#616161; font-size:.85rem;\n}\n#settle .st_bottom .payment .body .pay_info .row .point[data-v-6c9bc94a] { color:#1A90DA; font-size:1.3rem;\n}\n#settle .st_bottom .payment .body .pay_info .row .col .custom-radio[data-v-6c9bc94a]:first-of-type { margin-bottom:.5rem;\n}\n#settle .st_bottom .payment .body .pay_info p[data-v-6c9bc94a] { font-size:.75rem;\n}\n#settle .st_bottom .payment .body .pay_info p span[data-v-6c9bc94a] { color:red;\n}\n#settle .st_bottom .payment .body .pay_info .pay_r_tel .col[data-v-6c9bc94a] { display:flex; justify-content:space-between; align-items:center;\n}\n#settle .st_bottom .payment .body .pay_info .pay_r_tel .col  svg[data-v-6c9bc94a] { margin:0 .5rem;\n}\n#settle .st_bottom .payment .body .pay_info.slideUpDown-enter-to[data-v-6c9bc94a],\r\n#settle .st_bottom .payment .body .pay_info.slideUpDown-leave[data-v-6c9bc94a] { max-height:400px;\n}\n#settle .st_bottom .payment .body .pay_info.slideUpDown-enter-active[data-v-6c9bc94a],\r\n#settle .st_bottom .payment .body .pay_info.slideUpDown-leave-active[data-v-6c9bc94a] { transition:max-height 0.3s ease-out;\n}\n#settle .st_bottom .payment .body .pay_info.slideUpDown-enter[data-v-6c9bc94a],\r\n#settle .st_bottom .payment .body .pay_info.slideUpDown-leave-to[data-v-6c9bc94a] { max-height:0px;\n}\n#settle .st_bottom .payment .body .order_paper>div[data-v-6c9bc94a] { display:flex; justify-content:space-between;\n}\n#settle .st_bottom .payment .body .order_paper div .custom-checkbox[data-v-6c9bc94a] label { color:#616161; font-size:.8rem; cursor:pointer;\n}\n#settle .st_bottom .payment .body .order_paper div .custom-checkbox[data-v-6c9bc94a] label::before, \r\n#settle .st_bottom .payment .body .order_paper div .custom-checkbox[data-v-6c9bc94a] label::after { top:2px; left:-1.2rem;\n}\n#settle .st_bottom .payment .body .tax_paper>div[data-v-6c9bc94a] { display:flex; justify-content:space-between;\n}\n#settle .st_bottom .payment .body .tax_paper div .custom-radio[data-v-6c9bc94a] label { color:#616161; font-size:.8rem; cursor:pointer; vertical-align: baseline;\n}\n#settle .st_bottom .payment .body .tax_paper div .custom-radio[data-v-6c9bc94a] label::before, \r\n#settle .st_bottom .payment .body .tax_paper div .custom-radio[data-v-6c9bc94a] label::after { top:2px; left:-1.2rem;\n}\n#settle[data-v-6c9bc94a] .custom-control-input:checked ~ .custom-control-label::before { color: #fff; border-color:#17a2b8; background-color:#17a2b8;\n}\n#settle .inicis_form[data-v-6c9bc94a] { width:0; height:0; visibility:hidden; overflow:hidden;\n}\n@media (max-width: 992px){\n#settle[data-v-6c9bc94a] { margin-top: 1rem;\n}\n#settle h4[data-v-6c9bc94a] { margin:0;\n}\n#settle .st_bottom .inputs div .row label[data-v-6c9bc94a] { text-indent:0; flex-basis:18.8%; max-width:18.8%;\n}\n#settle .st_bottom .inputs .address h4[data-v-6c9bc94a] { flex-wrap: wrap; padding: 0rem 5px; margin-top:2rem; margin-bottom:1rem;\n}\n#settle .st_bottom .inputs .address h4>*[data-v-6c9bc94a] { flex-basis:100%; max-width:100%;\n}\n#settle .st_bottom .inputs .address h4 div[data-v-6c9bc94a] label { font-size: calc(.6vw + .7rem);\n}\n#settle .st_bottom .inputs .address .row:nth-of-type(4) .col[data-v-6c9bc94a],\r\n    #settle .st_bottom .inputs .address .row:nth-of-type(5) .col[data-v-6c9bc94a] { flex-basis:0; flex-grow:1; max-width:100%;\n}\n#settle .st_bottom .inputs .agreement[data-v-6c9bc94a] { flex-direction:column;\n}\n#settle .st_bottom .inputs .agreement .col[data-v-6c9bc94a]:nth-of-type(2) { margin:5px 0;\n}\n#settle .st_bottom .row .col.inputs[data-v-6c9bc94a] { padding-right:0; margin:10px 3px;\n}\n#settle .st_bottom .row .col.payment[data-v-6c9bc94a] { flex-basis:100%; max-width:100%; padding-left:0; margin:10px 3px;\n}\n}\r\n", ""]);
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
/* harmony import */ var _Settle_vue_vue_type_template_id_6c9bc94a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settle.vue?vue&type=template&id=6c9bc94a&scoped=true& */ "./resources/js/views/web/shop/order/Settle.vue?vue&type=template&id=6c9bc94a&scoped=true&");
/* harmony import */ var _Settle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settle.vue?vue&type=script&lang=js& */ "./resources/js/views/web/shop/order/Settle.vue?vue&type=script&lang=js&");
/* harmony import */ var _Settle_vue_vue_type_style_index_0_id_6c9bc94a_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true& */ "./resources/js/views/web/shop/order/Settle.vue?vue&type=style&index=0&id=6c9bc94a&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Settle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Settle_vue_vue_type_template_id_6c9bc94a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Settle_vue_vue_type_template_id_6c9bc94a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
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

/***/ "./resources/js/views/web/shop/order/Settle.vue?vue&type=template&id=6c9bc94a&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/views/web/shop/order/Settle.vue?vue&type=template&id=6c9bc94a&scoped=true& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settle_vue_vue_type_template_id_6c9bc94a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settle_vue_vue_type_template_id_6c9bc94a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settle_vue_vue_type_template_id_6c9bc94a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Settle.vue?vue&type=template&id=6c9bc94a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=template&id=6c9bc94a&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=template&id=6c9bc94a&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/shop/order/Settle.vue?vue&type=template&id=6c9bc94a&scoped=true& ***!
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
    { attrs: { id: "settle" } },
    [
      _c("h2", [_vm._v("결제하기")]),
      _vm._v(" "),
      _c("h4", [_vm._v("01. 주문 상품 확인")]),
      _vm._v(" "),
      _c("PaList", {
        attrs: {
          price: _vm.order.price,
          user: _vm.$store.state.auth.user,
          add_vat: true,
        },
        model: {
          value: _vm.order.lists,
          callback: function ($$v) {
            _vm.$set(_vm.order, "lists", $$v)
          },
          expression: "order.lists",
        },
      }),
      _vm._v(" "),
      _c(
        "b-container",
        { staticClass: "st_bottom" },
        [
          _c(
            "b-row",
            [
              _c(
                "b-col",
                { staticClass: "inputs" },
                [
                  _c(
                    "b-row",
                    { staticClass: "agreement" },
                    [
                      _c(
                        "b-col",
                        [
                          _c(
                            "div",
                            { staticClass: "head" },
                            [
                              _c("span", [
                                _vm._v("개인정보 수집 및 이용 동의 "),
                                _c(
                                  "span",
                                  {
                                    directives: [
                                      {
                                        name: "b-toggle",
                                        rawName: "v-b-toggle.privacy",
                                        modifiers: { privacy: true },
                                      },
                                    ],
                                  },
                                  [_vm._v("[자세히 보기]")]
                                ),
                              ]),
                              _vm._v(" "),
                              _c(
                                "b-form-radio",
                                {
                                  attrs: { value: "Y" },
                                  model: {
                                    value: _vm.order.privacy,
                                    callback: function ($$v) {
                                      _vm.$set(_vm.order, "privacy", $$v)
                                    },
                                    expression: "order.privacy",
                                  },
                                },
                                [_vm._v("동의함")]
                              ),
                              _vm._v(" "),
                              _c(
                                "b-form-radio",
                                {
                                  attrs: { value: "N" },
                                  model: {
                                    value: _vm.order.privacy,
                                    callback: function ($$v) {
                                      _vm.$set(_vm.order, "privacy", $$v)
                                    },
                                    expression: "order.privacy",
                                  },
                                },
                                [_vm._v("동의하지 않음")]
                              ),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-collapse",
                            { attrs: { id: "privacy" } },
                            [
                              _c("b-card", [
                                _c("p", [
                                  _vm._v(
                                    "회사는 이용자에 대하여 보다 더 질 높은 서비스 제공등을 위해 아래와 같이 이용자의 개인정보를 제공하고 있습니다."
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("p", [_vm._v("제공대상: 포사이언스")]),
                                _vm._v(" "),
                                _c("p", [
                                  _vm._v(
                                    "\r\n                                    제공정보의 이용 목적: 콘텐츠 제공, 물품배송 또는 청구지 등으로의 발송, 회원제 서비스 이용에 따른 본인확인, \r\n                                    인식별, 불량회원의 부정이용방지와 비인가 사용방지, 불만처리 등 민원처리, 공지사항 전달, 신규 서비스(제품) 개발 및 특화, \r\n                                    이벤트 등 광고성 정보전달, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계제공하는 개인정보 항목: 이름, 주민번호, \r\n                                    로그인ID, 비밀번호, 자택 전화번호, 주소, 휴대전화번호, 이메일주소, 접속 로그, 쿠키, 접속 IP정보, 그외 선택항목제공 정보의 \r\n                                    보유 및 이용기간: 3개월\r\n                                "
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("p", [
                                  _vm._v(
                                    "다만, 아래의 경우에는 예외로 합니다."
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("p", [
                                  _vm._v("- 이용자들이 사전에 동의한 경우"),
                                ]),
                                _vm._v(" "),
                                _c("p", [
                                  _vm._v(
                                    "- 법령의 규정에 의거하거나, 수사목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는경우"
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
                      _vm.isDlvyAir
                        ? _c(
                            "b-col",
                            [
                              _c(
                                "div",
                                { staticClass: "head" },
                                [
                                  _c("span", [
                                    _vm._v("단순 제품 교환 및 반품 불가 안내 "),
                                    _c(
                                      "span",
                                      {
                                        directives: [
                                          {
                                            name: "b-toggle",
                                            rawName: "v-b-toggle.dlvy_air",
                                            modifiers: { dlvy_air: true },
                                          },
                                        ],
                                      },
                                      [_vm._v("[자세히 보기]")]
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "b-form-radio",
                                    {
                                      attrs: { value: "Y" },
                                      model: {
                                        value: _vm.order.dlvy_air,
                                        callback: function ($$v) {
                                          _vm.$set(_vm.order, "dlvy_air", $$v)
                                        },
                                        expression: "order.dlvy_air",
                                      },
                                    },
                                    [_vm._v("동의함")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-form-radio",
                                    {
                                      attrs: { value: "N" },
                                      model: {
                                        value: _vm.order.dlvy_air,
                                        callback: function ($$v) {
                                          _vm.$set(_vm.order, "dlvy_air", $$v)
                                        },
                                        expression: "order.dlvy_air",
                                      },
                                    },
                                    [_vm._v("동의하지 않음")]
                                  ),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-collapse",
                                { attrs: { id: "dlvy_air" } },
                                [
                                  _c("b-card", [
                                    _vm._v(
                                      "해외수입상품은 주문 후에는 단순 제품 교환 및 반품이 안되오니 제품사양 확인 부탁드립니다."
                                    ),
                                  ]),
                                ],
                                1
                              ),
                            ],
                            1
                          )
                        : _c(
                            "b-col",
                            [
                              _c(
                                "div",
                                { staticClass: "head" },
                                [
                                  _c("span", [
                                    _vm._v("구매자 및 사용자 확인사항 "),
                                    _c(
                                      "span",
                                      {
                                        directives: [
                                          {
                                            name: "b-toggle",
                                            rawName: "v-b-toggle.check_terms",
                                            modifiers: { check_terms: true },
                                          },
                                        ],
                                      },
                                      [_vm._v("[자세히 보기]")]
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "b-form-radio",
                                    {
                                      attrs: { value: "Y" },
                                      model: {
                                        value: _vm.order.check_terms,
                                        callback: function ($$v) {
                                          _vm.$set(
                                            _vm.order,
                                            "check_terms",
                                            $$v
                                          )
                                        },
                                        expression: "order.check_terms",
                                      },
                                    },
                                    [_vm._v("동의함")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-form-radio",
                                    {
                                      attrs: { value: "N" },
                                      model: {
                                        value: _vm.order.check_terms,
                                        callback: function ($$v) {
                                          _vm.$set(
                                            _vm.order,
                                            "check_terms",
                                            $$v
                                          )
                                        },
                                        expression: "order.check_terms",
                                      },
                                    },
                                    [_vm._v("동의하지 않음")]
                                  ),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-collapse",
                                { attrs: { id: "check_terms" } },
                                [
                                  _c("b-card", [
                                    _vm._v(
                                      "\r\n                                구매자 및 사용자는 ㈜아이넥서스의 이용약관 및 전자상거래 약관을 확인하였으며 이에 동의합니다. 수입제품의 경우 반품이 불가할 수 있으며, 시약의 경우 연구의 목적으로만 사용이 가능함을 확인합니다.\r\n                                이를 어길 경우에 발생하는 모든 책임은 구매자 및 사용자에 있음을 확인합니다.\r\n                            "
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
                    { staticClass: "orderer" },
                    [
                      _c("h4", [_vm._v("02. 주문자 정보")]),
                      _vm._v(" "),
                      _c(
                        "b-row",
                        [
                          _c("label", { attrs: { for: "od_orderer" } }, [
                            _vm._v("주문자명"),
                            _c("i", { staticClass: "require" }),
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            [
                              _c("b-form-input", {
                                ref: "od_orderer",
                                attrs: { id: "od_orderer" },
                                model: {
                                  value: _vm.order.od_orderer,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.order, "od_orderer", $$v)
                                  },
                                  expression: "order.od_orderer",
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
                          _c("label", { attrs: { for: "od_orderer_hp" } }, [
                            _vm._v("연락처"),
                            _c("i", { staticClass: "require" }),
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            [
                              _c("b-form-input", {
                                ref: "od_orderer_hp1",
                                attrs: {
                                  formatter: _vm.maxlength_3,
                                  id: "od_orderer_hp",
                                },
                                nativeOn: {
                                  input: function ($event) {
                                    return _vm.focusNext(
                                      $event,
                                      3,
                                      "od_orderer_hp2"
                                    )
                                  },
                                },
                                model: {
                                  value: _vm.order.od_orderer_hp1,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.order, "od_orderer_hp1", $$v)
                                  },
                                  expression: "order.od_orderer_hp1",
                                },
                              }),
                              _c("b-icon-dash", { staticClass: "m_hide" }),
                              _vm._v(" "),
                              _c("b-form-input", {
                                ref: "od_orderer_hp2",
                                attrs: { formatter: _vm.maxlength_4 },
                                nativeOn: {
                                  input: function ($event) {
                                    return _vm.focusNext(
                                      $event,
                                      4,
                                      "od_orderer_hp3"
                                    )
                                  },
                                },
                                model: {
                                  value: _vm.order.od_orderer_hp2,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.order, "od_orderer_hp2", $$v)
                                  },
                                  expression: "order.od_orderer_hp2",
                                },
                              }),
                              _c("b-icon-dash", { staticClass: "m_hide" }),
                              _vm._v(" "),
                              _c("b-form-input", {
                                ref: "od_orderer_hp3",
                                attrs: { formatter: _vm.maxlength_4 },
                                nativeOn: {
                                  input: function ($event) {
                                    return _vm.focusNext(
                                      $event,
                                      4,
                                      "od_orderer_email_id"
                                    )
                                  },
                                },
                                model: {
                                  value: _vm.order.od_orderer_hp3,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.order, "od_orderer_hp3", $$v)
                                  },
                                  expression: "order.od_orderer_hp3",
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
                          _c("label", { attrs: { for: "od_orderer_email" } }, [
                            _vm._v("이메일"),
                            _c("i", { staticClass: "require" }),
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            [
                              _c("b-form-input", {
                                ref: "od_orderer_email_id",
                                attrs: { id: "od_orderer_email" },
                                model: {
                                  value: _vm.order.od_orderer_email_id,
                                  callback: function ($$v) {
                                    _vm.$set(
                                      _vm.order,
                                      "od_orderer_email_id",
                                      $$v
                                    )
                                  },
                                  expression: "order.od_orderer_email_id",
                                },
                              }),
                              _c("b-icon-at"),
                              _vm._v(" "),
                              _c("b-form-input", {
                                model: {
                                  value: _vm.order.od_orderer_email_domain,
                                  callback: function ($$v) {
                                    _vm.$set(
                                      _vm.order,
                                      "od_orderer_email_domain",
                                      $$v
                                    )
                                  },
                                  expression: "order.od_orderer_email_domain",
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "b-form-select",
                                {
                                  on: { change: _vm.email_domain_slt },
                                  model: {
                                    value:
                                      _vm.order.od_orderer_email_domain_slt,
                                    callback: function ($$v) {
                                      _vm.$set(
                                        _vm.order,
                                        "od_orderer_email_domain_slt",
                                        $$v
                                      )
                                    },
                                    expression:
                                      "order.od_orderer_email_domain_slt",
                                  },
                                },
                                [
                                  _c(
                                    "b-form-select-option",
                                    { attrs: { value: "" } },
                                    [_vm._v("직접입력")]
                                  ),
                                  _vm._v(" "),
                                  _vm._l(
                                    _vm.config.email_domain,
                                    function (dm, i) {
                                      return _c(
                                        "b-form-select-option",
                                        { key: i, attrs: { value: i } },
                                        [_vm._v(_vm._s(dm))]
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
                      ),
                      _vm._v(" "),
                      _c(
                        "b-row",
                        [
                          _c("label", { attrs: { for: "od_department" } }, [
                            _vm._v("소속"),
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            [
                              _c("b-form-input", {
                                attrs: { id: "od_department" },
                                model: {
                                  value: _vm.order.od_department,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.order, "od_department", $$v)
                                  },
                                  expression: "order.od_department",
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
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "address", attrs: { id: "address" } },
                    [
                      _c("PopUp"),
                      _vm._v(" "),
                      _c("h4", [
                        _c("span", [_vm._v("03. 배송지 정보")]),
                        _vm._v(" "),
                        _c(
                          "div",
                          [
                            _c(
                              "b-form-radio",
                              {
                                attrs: { value: "D" },
                                on: { change: _vm.change_addr_type },
                                model: {
                                  value: _vm.order.addr_type,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.order, "addr_type", $$v)
                                  },
                                  expression: "order.addr_type",
                                },
                              },
                              [_vm._v("기본 배송지")]
                            ),
                            _vm._v(" "),
                            _c(
                              "b-form-radio",
                              {
                                attrs: { value: "N" },
                                on: { change: _vm.change_addr_type },
                                model: {
                                  value: _vm.order.addr_type,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.order, "addr_type", $$v)
                                  },
                                  expression: "order.addr_type",
                                },
                              },
                              [_vm._v("신규 배송지")]
                            ),
                            _vm._v(" "),
                            _c(
                              "b-button",
                              {
                                staticClass: "white sm",
                                on: { click: _vm.config_addr },
                              },
                              [_vm._v("배송지 관리")]
                            ),
                          ],
                          1
                        ),
                      ]),
                      _vm._v(" "),
                      _c(
                        "b-row",
                        [
                          _c("label", { attrs: { for: "od_orderer" } }, [
                            _vm._v("배송지명"),
                          ]),
                          _vm._v(" "),
                          _c("b-col", [_vm._v(_vm._s(_vm.order.od_ua_title))]),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "b-row",
                        [
                          _c("label", { attrs: { for: "od_receiver" } }, [
                            _vm._v("수령인"),
                            _c("i", { staticClass: "require" }),
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            [
                              _c("b-form-input", {
                                ref: "od_receiver",
                                attrs: { id: "od_receiver" },
                                model: {
                                  value: _vm.order.od_receiver,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.order, "od_receiver", $$v)
                                  },
                                  expression: "order.od_receiver",
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
                          _c("label", { attrs: { for: "od_receiver_hp" } }, [
                            _vm._v("연락처"),
                            _c("i", { staticClass: "require" }),
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            [
                              _c("b-form-input", {
                                ref: "od_receiver_hp1",
                                attrs: {
                                  formatter: _vm.maxlength_3,
                                  id: "od_receiver_hp",
                                },
                                nativeOn: {
                                  input: function ($event) {
                                    return _vm.focusNext(
                                      $event,
                                      3,
                                      "od_receiver_hp2"
                                    )
                                  },
                                },
                                model: {
                                  value: _vm.order.od_receiver_hp1,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.order, "od_receiver_hp1", $$v)
                                  },
                                  expression: "order.od_receiver_hp1",
                                },
                              }),
                              _c("b-icon-dash", { staticClass: "m_hide" }),
                              _vm._v(" "),
                              _c("b-form-input", {
                                ref: "od_receiver_hp2",
                                attrs: { formatter: _vm.maxlength_4 },
                                nativeOn: {
                                  input: function ($event) {
                                    return _vm.focusNext(
                                      $event,
                                      4,
                                      "od_receiver_hp3"
                                    )
                                  },
                                },
                                model: {
                                  value: _vm.order.od_receiver_hp2,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.order, "od_receiver_hp2", $$v)
                                  },
                                  expression: "order.od_receiver_hp2",
                                },
                              }),
                              _c("b-icon-dash", { staticClass: "m_hide" }),
                              _vm._v(" "),
                              _c("b-form-input", {
                                ref: "od_receiver_hp3",
                                attrs: { formatter: _vm.maxlength_4 },
                                nativeOn: {
                                  input: function ($event) {
                                    return _vm.focusNext(
                                      $event,
                                      4,
                                      "btn_postcode"
                                    )
                                  },
                                },
                                model: {
                                  value: _vm.order.od_receiver_hp3,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.order, "od_receiver_hp3", $$v)
                                  },
                                  expression: "order.od_receiver_hp3",
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
                          _c("label", { attrs: { for: "od_department" } }, [
                            _vm._v("주소"),
                            _c("i", { staticClass: "require" }),
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            [
                              _c(
                                "div",
                                [
                                  _c("b-form-input", {
                                    attrs: { readonly: "" },
                                    model: {
                                      value: _vm.order.od_zip,
                                      callback: function ($$v) {
                                        _vm.$set(_vm.order, "od_zip", $$v)
                                      },
                                      expression: "order.od_zip",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    {
                                      ref: "btn_postcode",
                                      staticClass: "btn",
                                      on: {
                                        click: function ($event) {
                                          _vm.postcode_open = !_vm.postcode_open
                                        },
                                      },
                                    },
                                    [
                                      _vm.postcode_open
                                        ? [_c("b-icon-x-square-fill")]
                                        : [_vm._v("우편번호 찾기")],
                                    ],
                                    2
                                  ),
                                  _vm._v(" "),
                                  _vm.postcode_open
                                    ? [
                                        _c("VueDaumPostcode", {
                                          staticClass: "sch_zip shadow",
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
                              _vm._v(" "),
                              _c("b-form-input", {
                                attrs: { readonly: "" },
                                model: {
                                  value: _vm.order.od_addr1,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.order, "od_addr1", $$v)
                                  },
                                  expression: "order.od_addr1",
                                },
                              }),
                              _vm._v(" "),
                              _c("b-form-input", {
                                ref: "od_addr2",
                                model: {
                                  value: _vm.order.od_addr2,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.order, "od_addr2", $$v)
                                  },
                                  expression: "order.od_addr2",
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
                          _c("label", { attrs: { for: "od_memo" } }, [
                            _vm._v("배송 요청사항"),
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            [
                              _c(
                                "b-form-select",
                                {
                                  on: { change: _vm.memo_slt },
                                  model: {
                                    value: _vm.order.od_memo_slt,
                                    callback: function ($$v) {
                                      _vm.$set(_vm.order, "od_memo_slt", $$v)
                                    },
                                    expression: "order.od_memo_slt",
                                  },
                                },
                                [
                                  _c(
                                    "b-form-select-option",
                                    { attrs: { value: "" } },
                                    [_vm._v("선택")]
                                  ),
                                  _vm._v(" "),
                                  _vm._l(
                                    _vm.config.dlvy_msg,
                                    function (msg, i) {
                                      return _c(
                                        "b-form-select-option",
                                        { key: i, attrs: { value: i } },
                                        [_vm._v(_vm._s(msg))]
                                      )
                                    }
                                  ),
                                ],
                                2
                              ),
                              _vm._v(" "),
                              _c("b-form-input", {
                                attrs: { id: "od_memo" },
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
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-button",
                    {
                      staticClass: "m_hide pay_go",
                      on: { click: _vm.exePayment },
                    },
                    [_vm._v("주문하기")]
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-col",
                { staticClass: "payment", attrs: { id: "payment" } },
                [
                  _c(
                    "b-row",
                    { staticClass: "top" },
                    [
                      _c("b-col", [_vm._v("최종 결제 금액")]),
                      _vm._v(" "),
                      _c("b-col", [
                        _c("b", [
                          _vm._v(
                            _vm._s(_vm._f("comma")(_vm.order.price.total))
                          ),
                        ]),
                        _vm._v(" 원\r\n                        "),
                        _c("span", [_vm._v("부가세 포함")]),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "body" },
                    [
                      _c("h5", [_vm._v("결제 수단")]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "method" },
                        _vm._l(_vm.config.pay_method, function (v, k) {
                          return _c(
                            "div",
                            { key: k },
                            [
                              _c(
                                "b-form-radio",
                                {
                                  attrs: { value: k },
                                  model: {
                                    value: _vm.order.od_pay_method,
                                    callback: function ($$v) {
                                      _vm.$set(_vm.order, "od_pay_method", $$v)
                                    },
                                    expression: "order.od_pay_method",
                                  },
                                },
                                [_vm._v(_vm._s(v))]
                              ),
                              _vm._v(" "),
                              k == "C"
                                ? _c("span", [
                                    _vm._v("이니시스 온라인 신용카드 결제"),
                                    _c("b", [
                                      _vm._v("[자세히]"),
                                      _c("img", {
                                        attrs: {
                                          src: _vm.s3url + "order/pay_card.png",
                                        },
                                      }),
                                    ]),
                                  ])
                                : k == "B"
                                ? _c("span", [
                                    _vm._v("무통장입금, 온라인계좌이체"),
                                    _c("b", [
                                      _vm._v("[자세히]"),
                                      _c("img", {
                                        attrs: {
                                          src:
                                            _vm.s3url + "order/pay_cache.png",
                                        },
                                      }),
                                    ]),
                                  ])
                                : k == "P"
                                ? _c("span", [
                                    _vm._v("원격지 연구비 직접결제"),
                                    _c("b", [
                                      _vm._v("[자세히]"),
                                      _c("img", {
                                        attrs: {
                                          src: _vm.s3url + "order/pay_psys.png",
                                        },
                                      }),
                                    ]),
                                  ])
                                : k == "R"
                                ? _c("span", [
                                    _vm._v("원격지 카드 결제"),
                                    _c("b", [
                                      _vm._v("[자세히]"),
                                      _c("img", {
                                        attrs: {
                                          src:
                                            _vm.s3url + "order/pay_remote.png",
                                        },
                                      }),
                                    ]),
                                  ])
                                : k == "E"
                                ? _c("span", [
                                    _vm._v("결제대금예치"),
                                    _c("b", [
                                      _vm._v("[자세히]"),
                                      _c("img", {
                                        attrs: {
                                          src:
                                            _vm.s3url + "order/pay_escrow.png",
                                        },
                                      }),
                                    ]),
                                  ])
                                : _vm._e(),
                            ],
                            1
                          )
                        }),
                        0
                      ),
                      _vm._v(" "),
                      _c("transition", { attrs: { name: "slideUpDown" } }, [
                        _vm.order.od_pay_method == "B"
                          ? _c(
                              "div",
                              { staticClass: "pay_info" },
                              [
                                _c("h6", [_vm._v("무통장 입금")]),
                                _vm._v(" "),
                                _c(
                                  "b-row",
                                  [
                                    _c("b-col", { attrs: { cols: "3" } }, [
                                      _vm._v("결제금액"),
                                    ]),
                                    _vm._v(" "),
                                    _c("b-col", [
                                      _c("b", { staticClass: "point" }, [
                                        _vm._v(
                                          _vm._s(
                                            _vm._f("comma")(
                                              _vm.order.price.total
                                            )
                                          )
                                        ),
                                      ]),
                                      _vm._v(" 원"),
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
                                              value: _vm.order.extra.oex_bank,
                                              callback: function ($$v) {
                                                _vm.$set(
                                                  _vm.order.extra,
                                                  "oex_bank",
                                                  $$v
                                                )
                                              },
                                              expression:
                                                "order.extra.oex_bank",
                                            },
                                          },
                                          [
                                            _vm._v(
                                              "\r\n                                        국민은행 010-01-0944-960\r\n                                    "
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "b-form-radio",
                                          {
                                            attrs: { value: "W" },
                                            model: {
                                              value: _vm.order.extra.oex_bank,
                                              callback: function ($$v) {
                                                _vm.$set(
                                                  _vm.order.extra,
                                                  "oex_bank",
                                                  $$v
                                                )
                                              },
                                              expression:
                                                "order.extra.oex_bank",
                                            },
                                          },
                                          [
                                            _vm._v(
                                              "\r\n                                        우리은행 849-103249-13-002\r\n                                    "
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
                                    _c("b-col", [_vm._v("(주) 아이넥서스")]),
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
                                          attrs: {
                                            placeholder: "입금자",
                                            size: "sm",
                                          },
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
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.order.od_pay_method == "P"
                          ? _c(
                              "div",
                              { staticClass: "pay_info" },
                              [
                                _c("h6", [_vm._v("PSYS 결제")]),
                                _vm._v(" "),
                                _c(
                                  "b-row",
                                  [
                                    _c("b-col", { attrs: { cols: "3" } }, [
                                      _vm._v("결제금액"),
                                    ]),
                                    _vm._v(" "),
                                    _c("b-col", [
                                      _c("b", { staticClass: "point" }, [
                                        _vm._v(
                                          _vm._s(
                                            _vm._f("comma")(
                                              _vm.order.price.total
                                            )
                                          )
                                        ),
                                      ]),
                                      _vm._v(" 원"),
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
                                          attrs: {
                                            placeholder: "결제자",
                                            size: "sm",
                                          },
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
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.order.od_pay_method == "R"
                          ? _c(
                              "div",
                              { staticClass: "pay_info" },
                              [
                                _c("h6", [_vm._v("원격 결제")]),
                                _vm._v(" "),
                                _c("p", [
                                  _vm._v("(학교, 국가기관, 연구소만 해당/"),
                                  _c("span", [
                                    _vm._v("업체 및 개인은 선결제로 선택"),
                                  ]),
                                  _vm._v(")"),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "b-row",
                                  [
                                    _c("b-col", { attrs: { cols: "3" } }, [
                                      _vm._v("결제 요청일"),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      [
                                        _c(
                                          "b-form-radio",
                                          {
                                            staticClass: "m-0",
                                            attrs: { value: "soon" },
                                            model: {
                                              value:
                                                _vm.order.extra.oex_pay_plan,
                                              callback: function ($$v) {
                                                _vm.$set(
                                                  _vm.order.extra,
                                                  "oex_pay_plan",
                                                  $$v
                                                )
                                              },
                                              expression:
                                                "order.extra.oex_pay_plan",
                                            },
                                          },
                                          [_vm._v("주문시 결제")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "b-form-radio",
                                          {
                                            attrs: { value: "dlvy" },
                                            model: {
                                              value:
                                                _vm.order.extra.oex_pay_plan,
                                              callback: function ($$v) {
                                                _vm.$set(
                                                  _vm.order.extra,
                                                  "oex_pay_plan",
                                                  $$v
                                                )
                                              },
                                              expression:
                                                "order.extra.oex_pay_plan",
                                            },
                                          },
                                          [_vm._v("납품시 결제")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "b-form-radio",
                                          {
                                            attrs: { value: "etc" },
                                            model: {
                                              value:
                                                _vm.order.extra.oex_pay_plan,
                                              callback: function ($$v) {
                                                _vm.$set(
                                                  _vm.order.extra,
                                                  "oex_pay_plan",
                                                  $$v
                                                )
                                              },
                                              expression:
                                                "order.extra.oex_pay_plan",
                                            },
                                          },
                                          [_vm._v("기타")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "transition",
                                          { attrs: { name: "slideUpDown" } },
                                          [
                                            _vm.order.extra.oex_pay_plan ==
                                            "etc"
                                              ? _c("b-form-input", {
                                                  attrs: {
                                                    placeholder:
                                                      "30자 이내 작성",
                                                    size: "sm",
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.order.extra
                                                        .oex_pay_plan_etc,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.order.extra,
                                                        "oex_pay_plan_etc",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "order.extra.oex_pay_plan_etc",
                                                  },
                                                })
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
                                  "b-row",
                                  [
                                    _c("b-col", { attrs: { cols: "3" } }, [
                                      _vm._v("담당자"),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      [
                                        _c("b-form-input", {
                                          attrs: { size: "sm" },
                                          model: {
                                            value: _vm.order.extra.oex_mng,
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.order.extra,
                                                "oex_mng",
                                                $$v
                                              )
                                            },
                                            expression: "order.extra.oex_mng",
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
                                  { staticClass: "pay_r_tel" },
                                  [
                                    _c("b-col", { attrs: { cols: "3" } }, [
                                      _vm._v("연락처"),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      [
                                        _c("b-form-input", {
                                          ref: "oex_num_tel1",
                                          attrs: {
                                            formatter: _vm.maxlength_3,
                                            size: "sm",
                                          },
                                          nativeOn: {
                                            input: function ($event) {
                                              return _vm.focusNext(
                                                $event,
                                                3,
                                                "oex_num_tel2"
                                              )
                                            },
                                          },
                                          model: {
                                            value: _vm.order.extra.oex_num_tel1,
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.order.extra,
                                                "oex_num_tel1",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "order.extra.oex_num_tel1",
                                          },
                                        }),
                                        _c("b-icon-dash"),
                                        _vm._v(" "),
                                        _c("b-form-input", {
                                          ref: "oex_num_tel2",
                                          attrs: {
                                            formatter: _vm.maxlength_4,
                                            size: "sm",
                                          },
                                          nativeOn: {
                                            input: function ($event) {
                                              return _vm.focusNext(
                                                $event,
                                                4,
                                                "oex_num_tel3"
                                              )
                                            },
                                          },
                                          model: {
                                            value: _vm.order.extra.oex_num_tel2,
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.order.extra,
                                                "oex_num_tel2",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "order.extra.oex_num_tel2",
                                          },
                                        }),
                                        _c("b-icon-dash"),
                                        _vm._v(" "),
                                        _c("b-form-input", {
                                          ref: "oex_num_tel3",
                                          attrs: {
                                            formatter: _vm.maxlength_4,
                                            size: "sm",
                                          },
                                          model: {
                                            value: _vm.order.extra.oex_num_tel3,
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.order.extra,
                                                "oex_num_tel3",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "order.extra.oex_num_tel3",
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
                                  { staticClass: "pay_r_tel" },
                                  [
                                    _c("b-col", { attrs: { cols: "3" } }, [
                                      _vm._v("이메일"),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      [
                                        _c("b-form-input", {
                                          ref: "oex_email",
                                          attrs: {
                                            id: "oex_email",
                                            size: "sm",
                                          },
                                          model: {
                                            value: _vm.order.extra.oex_email,
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.order.extra,
                                                "oex_email",
                                                $$v
                                              )
                                            },
                                            expression: "order.extra.oex_email",
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
                            )
                          : _vm._e(),
                      ]),
                      _vm._v(" "),
                      _vm.order.od_pay_method == "B" ||
                      _vm.order.od_pay_method == "P"
                        ? _c("PayPlan", {
                            model: {
                              value: _vm.order.extra,
                              callback: function ($$v) {
                                _vm.$set(_vm.order, "extra", $$v)
                              },
                              expression: "order.extra",
                            },
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _c("transition", { attrs: { name: "slideUpDown" } }, [
                        _vm.order.od_pay_method == "B" ||
                        _vm.order.od_pay_method == "E"
                          ? _c("div", { staticClass: "tax_paper" }, [
                              _c("h6", [_vm._v("지출 증빙 서류")]),
                              _vm._v(" "),
                              _c(
                                "div",
                                [
                                  _c(
                                    "b-form-radio",
                                    {
                                      attrs: { value: "TX" },
                                      nativeOn: {
                                        click: function ($event) {
                                          return _vm.tax_invoice()
                                        },
                                      },
                                      model: {
                                        value: _vm.order.extra.oex_type_fir,
                                        callback: function ($$v) {
                                          _vm.$set(
                                            _vm.order.extra,
                                            "oex_type_fir",
                                            $$v
                                          )
                                        },
                                        expression: "order.extra.oex_type_fir",
                                      },
                                    },
                                    [_vm._v("세금계산서")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-form-radio",
                                    {
                                      attrs: { value: "CA" },
                                      nativeOn: {
                                        click: function ($event) {
                                          return _vm.tax_invoice()
                                        },
                                      },
                                      model: {
                                        value: _vm.order.extra.oex_type_fir,
                                        callback: function ($$v) {
                                          _vm.$set(
                                            _vm.order.extra,
                                            "oex_type_fir",
                                            $$v
                                          )
                                        },
                                        expression: "order.extra.oex_type_fir",
                                      },
                                    },
                                    [_vm._v("현금영수증")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-form-radio",
                                    {
                                      attrs: { value: "NO" },
                                      model: {
                                        value: _vm.order.extra.oex_type_fir,
                                        callback: function ($$v) {
                                          _vm.$set(
                                            _vm.order.extra,
                                            "oex_type_fir",
                                            $$v
                                          )
                                        },
                                        expression: "order.extra.oex_type_fir",
                                      },
                                    },
                                    [_vm._v("미발급")]
                                  ),
                                ],
                                1
                              ),
                            ])
                          : _vm._e(),
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "order_paper" },
                        [
                          _c("h6", [_vm._v("첨부 서류")]),
                          _vm._v(" "),
                          _c(
                            "div",
                            [
                              _c(
                                "b-form-checkbox",
                                {
                                  attrs: { value: "Y", "unchecked-value": "N" },
                                  model: {
                                    value: _vm.order.extra.oex_req_est,
                                    callback: function ($$v) {
                                      _vm.$set(
                                        _vm.order.extra,
                                        "oex_req_est",
                                        $$v
                                      )
                                    },
                                    expression: "order.extra.oex_req_est",
                                  },
                                },
                                [_vm._v("견적서")]
                              ),
                              _vm._v(" "),
                              _c(
                                "b-form-checkbox",
                                {
                                  attrs: { value: "Y", "unchecked-value": "N" },
                                  model: {
                                    value: _vm.order.extra.oex_req_tran,
                                    callback: function ($$v) {
                                      _vm.$set(
                                        _vm.order.extra,
                                        "oex_req_tran",
                                        $$v
                                      )
                                    },
                                    expression: "order.extra.oex_req_tran",
                                  },
                                },
                                [_vm._v("거래명세서")]
                              ),
                              _vm._v(" "),
                              _c(
                                "b-form-checkbox",
                                {
                                  attrs: { value: "Y", "unchecked-value": "N" },
                                  model: {
                                    value: _vm.order.extra.oex_req_biz,
                                    callback: function ($$v) {
                                      _vm.$set(
                                        _vm.order.extra,
                                        "oex_req_biz",
                                        $$v
                                      )
                                    },
                                    expression: "order.extra.oex_req_biz",
                                  },
                                },
                                [_vm._v("사업자 등록증 사본")]
                              ),
                              _vm._v(" "),
                              _c(
                                "b-form-checkbox",
                                {
                                  attrs: { value: "Y", "unchecked-value": "N" },
                                  model: {
                                    value: _vm.order.extra.oex_req_bank,
                                    callback: function ($$v) {
                                      _vm.$set(
                                        _vm.order.extra,
                                        "oex_req_bank",
                                        $$v
                                      )
                                    },
                                    expression: "order.extra.oex_req_bank",
                                  },
                                },
                                [_vm._v("통장 사본")]
                              ),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("b-form-textarea", {
                            attrs: {
                              size: "sm",
                              placeholder: "추가 사항 메모",
                            },
                            model: {
                              value: _vm.order.extra.oex_memo,
                              callback: function ($$v) {
                                _vm.$set(_vm.order.extra, "oex_memo", $$v)
                              },
                              expression: "order.extra.oex_memo",
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
                    "b-button",
                    {
                      staticClass: "m_show pay_go",
                      on: { click: _vm.exePayment },
                    },
                    [_vm._v("주문하기")]
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
        "transition",
        { attrs: { name: "modal" } },
        [
          _vm.isModalViewed
            ? _c(
                "Modal",
                {
                  attrs: { max_width: 500, min_height: 0, padding: "20px 0 0" },
                  on: {
                    "close-modal": function ($event) {
                      _vm.isModalViewed = false
                    },
                  },
                },
                [
                  _c(
                    "template",
                    { slot: "header" },
                    [
                      ["index", "create", "edit"].includes(_vm.modal_type)
                        ? [_vm._v("배송지")]
                        : [_vm._v("지출 증빙")],
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _vm.modal_type == "index"
                    ? _c("AddrIndex", {
                        attrs: { address: _vm.addr },
                        on: {
                          choose: _vm.addr_choose,
                          create: _vm.addr_create,
                          edit: _vm.addr_edit,
                        },
                      })
                    : _vm.modal_type == "create"
                    ? _c("AddrCreate", {
                        attrs: { address: _vm.addr },
                        on: { index: _vm.addr_index },
                      })
                    : _vm.modal_type == "edit"
                    ? _c("AddrEdit", {
                        attrs: {
                          address: _vm.addr,
                          addr: _vm.addr[_vm.addr_edit_index],
                        },
                        on: { index: _vm.addr_index },
                      })
                    : _vm.modal_type == "tax"
                    ? _c("TaxInvoice", {
                        ref: "tax_invoice",
                        on: { close: _vm.modal_close },
                        model: {
                          value: _vm.order.extra,
                          callback: function ($$v) {
                            _vm.$set(_vm.order, "extra", $$v)
                          },
                          expression: "order.extra",
                        },
                      })
                    : _vm._e(),
                ],
                2
              )
            : _vm._e(),
        ],
        1
      ),
      _vm._v(" "),
      _vm.order.sale_env == "P"
        ? _c(
            "form",
            {
              staticClass: "inicis_form",
              attrs: { id: "SendPayForm", method: "POST" },
            },
            [
              _c("b-form-input", {
                attrs: { name: "buyername", value: _vm.order.od_orderer },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "buyertel", value: _vm.order.od_orderer_hp },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: {
                  name: "buyeremail",
                  value: _vm.order.od_orderer_email,
                },
              }),
              _vm._v(" "),
              _c("b-form-input", { attrs: { name: "version", value: "1.0" } }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "mid", value: _vm.inicis.mid },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "goodname", value: _vm.order.od_name },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "oid", value: _vm.inicis.od_no },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "price", value: _vm.order.price.total },
              }),
              _vm._v(" "),
              _c("b-form-input", { attrs: { name: "currency", value: "WON" } }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "timestamp", value: _vm.inicis.timestamp },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "signature", value: _vm.inicis.sign },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "returnUrl", value: _vm.inicis.returnUrl },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "closeUrl", value: _vm.inicis.closeUrl },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "mKey", value: _vm.inicis.mKey },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "gopaymethod", value: "Card" },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "merchantData", value: _vm.order.od_id },
              }),
            ],
            1
          )
        : _vm.order.sale_env == "M"
        ? _c(
            "form",
            {
              staticClass: "inicis_form",
              attrs: {
                id: "MobilePayForm",
                action: "https://mobile.inicis.com/smart/payment/",
                method: "post",
                "accept-charset": "euc-kr",
              },
            },
            [
              _c("b-form-input", {
                attrs: { name: "P_INI_PAYMENT", value: "CARD" },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "P_MID", value: _vm.inicis.mid },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "P_OID", value: _vm.inicis.od_no },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "P_GOODS", value: _vm.order.od_name },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "P_AMT", value: _vm.order.price.total },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: {
                  name: "P_UNAME",
                  value: _vm.$store.state.auth.user.name,
                },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: {
                  name: "P_NEXT_URL",
                  value: _vm.inicis.returnUrlMobaile,
                },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "P_CHARSET", value: "utf8" },
              }),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: { name: "P_NOTI", value: _vm.order.od_id },
              }),
            ],
            1
          )
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);