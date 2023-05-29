"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_admin_shop_b2b_merck_Order_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************/
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'admShopB2bMerckOrder',
  components: {
    'ModelSchInput': function ModelSchInput() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_admin_shop_b2b_merck__comp_ModelSchInput_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_comp/ModelSchInput */ "./resources/js/views/admin/shop/b2b_merck/_comp/ModelSchInput.vue"));
    }
  },
  data: function data() {
    return {
      list: {},
      indeterminate: false,
      all_chk: false,
      extra: {
        req_dlvy: '',
        addressID: '',
        state: '',
        part: '',
        name: '',
        hp: '',
        code: '',
        city: '',
        street: '',
        detail: ''
      },
      sch_frm: {}
    };
  },
  methods: {
    index: function index() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/admin/shop/b2b_merck/order", {
                  params: _this.sch_frm
                });

              case 3:
                res = _context.sent;

                if (res && res.status === 200) {
                  _this.list = res.data;
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
    chkChange: function chkChange(i) {
      if (this.list.data[i].b2b_chk) {
        this.extra.part = this.list.data[i].order.od_part;
        this.extra.name = this.list.data[i].order.od_receiver;
        this.extra.hp = this.list.data[i].order.od_receiver_hp;
        this.extra.code = this.list.data[i].order.od_zip;
        this.extra.city = this.list.data[i].order.od_addr1; // this.extra.street = this.list.data[i].order.od_addr1;

        this.extra.detail = this.list.data[i].order.od_addr2;
      }
    },
    order: function order() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var chkList, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                chkList = _this2.list.data.filter(function (el) {
                  return el.b2b_chk == true;
                });

                if (chkList.length) {
                  _context2.next = 5;
                  break;
                }

                Notify.modal('선택하세요', 'warning');
                return _context2.abrupt("return", false);

              case 5:
                if (!(_this2.extra.addressID == '')) {
                  _context2.next = 9;
                  break;
                }

                Notify.toast('danger', "ShipTo Code를 선택하세요.");

                _this2.$refs.addressID.focus();

                return _context2.abrupt("return", false);

              case 9:
                if (!(_this2.extra.state == '')) {
                  _context2.next = 13;
                  break;
                }

                Notify.toast('danger', "State Code를 선택하세요.");

                _this2.$refs.state.focus();

                return _context2.abrupt("return", false);

              case 13:
                if (!(_this2.extra.name == '')) {
                  _context2.next = 17;
                  break;
                }

                Notify.toast('danger', "이름을 입력하세요.");

                _this2.$refs.name.focus();

                return _context2.abrupt("return", false);

              case 17:
                if (!(_this2.extra.part == '')) {
                  _context2.next = 21;
                  break;
                }

                Notify.toast('danger', "소속을 입력하세요.");

                _this2.$refs.part.focus();

                return _context2.abrupt("return", false);

              case 21:
                if (!(_this2.extra.company == '')) {
                  _context2.next = 25;
                  break;
                }

                Notify.toast('danger', "업체명을 입력하세요.");

                _this2.$refs.company.focus();

                return _context2.abrupt("return", false);

              case 25:
                if (!(_this2.extra.code == '')) {
                  _context2.next = 29;
                  break;
                }

                Notify.toast('danger', "우편번호를 입력하세요.");

                _this2.$refs.code.focus();

                return _context2.abrupt("return", false);

              case 29:
                if (!(_this2.extra.city == '')) {
                  _context2.next = 33;
                  break;
                }

                Notify.toast('danger', "**시 **구를 입력하세요.");

                _this2.$refs.city.focus();

                return _context2.abrupt("return", false);

              case 33:
                if (!(_this2.extra.street == '')) {
                  _context2.next = 37;
                  break;
                }

                Notify.toast('danger', "도로명을 입력하세요.");

                _this2.$refs.street.focus();

                return _context2.abrupt("return", false);

              case 37:
                if (!(_this2.extra.detail == '')) {
                  _context2.next = 41;
                  break;
                }

                Notify.toast('danger', "상세 주소를 입력하세요.");

                _this2.$refs.detail.focus();

                return _context2.abrupt("return", false);

              case 41:
                _context2.next = 43;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/b2b_merck/orderExe", {
                  list: chkList,
                  extra: _this2.extra
                });

              case 43:
                res = _context2.sent;
                if (res && res.status === 200 && res.data.msg == 'success') _this2.$router.push({
                  name: 'adm_b2b_merck_order_result'
                });
                _context2.next = 51;
                break;

              case 47:
                _context2.prev = 47;
                _context2.t0 = _context2["catch"](0);
                Notify.consolePrint(_context2.t0);
                Notify.toast('warning', _context2.t0.response.data.message);

              case 51:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 47]]);
      }))();
    },
    stockCheck: function stockCheck(code, ea) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/admin/shop/b2b_merck/stockCheck", {
                  code: code,
                  ea: ea
                });

              case 3:
                res = _context3.sent;

                if (res && res.status === 200) {
                  _this3.list.data = res.data;
                }

                _context3.next = 11;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                Notify.consolePrint(_context3.t0);
                Notify.toast('warning', _context3.t0.response.data.message);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }))();
    },
    addModel: function addModel(m) {
      this.list.data.unshift({
        "b2b_chk": true,
        "odm_id": 0,
        "odm_gm_id": m.gm_id,
        "odm_gm_name": m.gm_name,
        "odm_gm_code": m.gm_code,
        "odm_gm_unit": m.gm_unit,
        "odm_price": m.gm_price,
        "odm_gm_spec": m.gm_spec,
        "odm_ea": 1,
        "odm_mk_name": m.mk_name,
        "req_order": null
      });
    },
    routerPush: function routerPush() {
      this.$router.push({
        name: 'adm_b2b_merck_order',
        query: this.sch_frm
      })["catch"](function () {});
    },
    pageSet: function pageSet(p) {
      this.sch_frm.page = p;
      this.routerPush();
    },
    frm_formatHp: function frm_formatHp(v) {
      return this.formatHp(v);
    }
  },
  mounted: function mounted() {
    this.sch_frm = Object.assign({}, this.sch_frm, this.$route.query);
    this.index();
  },
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    this.sch_frm = Object.assign({}, this.sch_frm, to.query);
    this.index();
    next();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=style&index=0&id=d2573ecc&lang=css&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=style&index=0&id=d2573ecc&lang=css&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.p_wrap[data-v-d2573ecc] { margin-bottom:2rem;\n}\n.top .col[data-v-d2573ecc] { display:flex; align-items:center;\n}\n.top .col.addModel[data-v-d2573ecc] { justify-content:flex-end;\n}\n.top .col.addModel>div[data-v-d2573ecc] { width:100%; max-width:10rem;\n}\n.row[data-v-d2573ecc]:not(:last-of-type) { border-bottom:1px solid #333;\n}\n.body[data-v-d2573ecc]:hover { background: #d8f2fd94;\n}\r\n/*.list>div:nth-of-type(2) { flex:0 0 30%; max-width:30%; }*/\n.extra>div[data-v-d2573ecc] { padding-top:5px; padding-bottom:5px; font-size:.9rem;\n}\n.list>div[data-v-d2573ecc]:nth-of-type(3) { flex:0 0 15%; max-width:15%;\n}\n.list>div[data-v-d2573ecc] { padding-top:15px; padding-bottom:15px; font-size:.9rem;\n}\n.head>div[data-v-d2573ecc] { font-weight:bold; background:#666; color:#fff;\n}\n.body>div[data-v-d2573ecc]:nth-of-type(2) { background-color:#7fffd454;\n}\n.row>div>span[data-v-d2573ecc]:nth-of-type(2) { float:right;\n}\n.row .custom-control[data-v-d2573ecc] { display: inline;\n}\n.row .custom-control[data-v-d2573ecc] label { font-size:.9rem;\n}\n.row .custom-control[data-v-d2573ecc] label::before, \r\n.row .custom-control[data-v-d2573ecc] label::after { top:-.15rem; left:-1.8rem; width:1.5rem; height:1.5rem;\n}\n.top .custom-control[data-v-d2573ecc] { margin-right:1rem;\n}\n.top .custom-control[data-v-d2573ecc] label::before,\r\n.top .custom-control[data-v-d2573ecc] label::after { top:0;\n}\n.row .col span .odm_ea[data-v-d2573ecc] { width:30%; display:inline-block; min-width:40px; text-align:center;\n}\n.row .col span.req_order_box[data-v-d2573ecc] { position:relative; width:70%; display:inline-block; min-width:140px; height:1.9rem;\n}\n.row .col span.req_order_box .req_order[data-v-d2573ecc] { height: 1.9rem; padding: 0.1rem 0.8rem;\n}\n.row .col span.req_order_box .req_order[data-v-d2573ecc]:focus { z-index:1; background:#FFF; width:20rem; height:5rem; position:absolute; top:0; left:0;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=style&index=0&id=d2573ecc&lang=css&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=style&index=0&id=d2573ecc&lang=css&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Order_vue_vue_type_style_index_0_id_d2573ecc_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Order.vue?vue&type=style&index=0&id=d2573ecc&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=style&index=0&id=d2573ecc&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Order_vue_vue_type_style_index_0_id_d2573ecc_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Order_vue_vue_type_style_index_0_id_d2573ecc_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/admin/shop/b2b_merck/Order.vue":
/*!***********************************************************!*\
  !*** ./resources/js/views/admin/shop/b2b_merck/Order.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Order_vue_vue_type_template_id_d2573ecc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Order.vue?vue&type=template&id=d2573ecc&scoped=true& */ "./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=template&id=d2573ecc&scoped=true&");
/* harmony import */ var _Order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Order.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=script&lang=js&");
/* harmony import */ var _Order_vue_vue_type_style_index_0_id_d2573ecc_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Order.vue?vue&type=style&index=0&id=d2573ecc&lang=css&scoped=true& */ "./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=style&index=0&id=d2573ecc&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Order_vue_vue_type_template_id_d2573ecc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Order_vue_vue_type_template_id_d2573ecc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "d2573ecc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/shop/b2b_merck/Order.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Order.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=style&index=0&id=d2573ecc&lang=css&scoped=true&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=style&index=0&id=d2573ecc&lang=css&scoped=true& ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Order_vue_vue_type_style_index_0_id_d2573ecc_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Order.vue?vue&type=style&index=0&id=d2573ecc&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=style&index=0&id=d2573ecc&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=template&id=d2573ecc&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=template&id=d2573ecc&scoped=true& ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Order_vue_vue_type_template_id_d2573ecc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Order_vue_vue_type_template_id_d2573ecc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Order_vue_vue_type_template_id_d2573ecc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Order.vue?vue&type=template&id=d2573ecc&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=template&id=d2573ecc&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=template&id=d2573ecc&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/b2b_merck/Order.vue?vue&type=template&id=d2573ecc&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "p_wrap" },
    [
      _c("h3", [_vm._v("Merck Order List")]),
      _vm._v(" "),
      _c(
        "b-row",
        { staticClass: "top" },
        [
          _c(
            "b-col",
            { attrs: { col: "", sm: "12", md: "6" } },
            [
              _c(
                "b-button",
                {
                  attrs: { variant: "primary", size: "sm" },
                  on: { click: _vm.order },
                },
                [_vm._v("선택 발주")]
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { staticClass: "addModel", attrs: { col: "", sm: "12", md: "6" } },
            [_c("ModelSchInput", { on: { addModel: _vm.addModel } })],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-row",
        { staticClass: "extra" },
        [
          _c(
            "b-col",
            { attrs: { col: "", sm: "12", md: "2" } },
            [
              _c(
                "b-form-select",
                {
                  ref: "addressID",
                  attrs: { size: "sm" },
                  model: {
                    value: _vm.extra.addressID,
                    callback: function ($$v) {
                      _vm.$set(_vm.extra, "addressID", $$v)
                    },
                    expression: "extra.addressID",
                  },
                },
                [
                  _c("b-form-select-option", { attrs: { value: "" } }, [
                    _vm._v("ShipTo Code"),
                  ]),
                  _vm._v(" "),
                  _c(
                    "b-form-select-option",
                    { attrs: { value: "2035422570" } },
                    [_vm._v("사무실(판교로 253)")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-select-option",
                    { attrs: { value: "2036349057" } },
                    [_vm._v("서울")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-select-option",
                    { attrs: { value: "2036349058" } },
                    [_vm._v("그 밖의 지역")]
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
            { attrs: { col: "", sm: "12", md: "2" } },
            [
              _c(
                "b-form-select",
                {
                  ref: "state",
                  attrs: { size: "sm" },
                  model: {
                    value: _vm.extra.state,
                    callback: function ($$v) {
                      _vm.$set(_vm.extra, "state", $$v)
                    },
                    expression: "extra.state",
                  },
                },
                [
                  _c("b-form-select-option", { attrs: { value: "" } }, [
                    _vm._v("State Code"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "SE" } }, [
                    _vm._v("서울"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "GG" } }, [
                    _vm._v("경기"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "IC" } }, [
                    _vm._v("인천"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "BS" } }, [
                    _vm._v("부산"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "CB" } }, [
                    _vm._v("충북"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "CN" } }, [
                    _vm._v("충남"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "DG" } }, [
                    _vm._v("대구"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "DJ" } }, [
                    _vm._v("대전"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "GW" } }, [
                    _vm._v("강원"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "GJ" } }, [
                    _vm._v("광주"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "GB" } }, [
                    _vm._v("경북"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "GN" } }, [
                    _vm._v("경남"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "JJ" } }, [
                    _vm._v("제주"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "JB" } }, [
                    _vm._v("전북"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "JN" } }, [
                    _vm._v("전남"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "SJ" } }, [
                    _vm._v("세종"),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select-option", { attrs: { value: "US" } }, [
                    _vm._v("울산"),
                  ]),
                ],
                1
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { col: "", sm: "12", md: "2" } },
            [
              _c("b-form-input", {
                attrs: { size: "sm", placeholder: "이름" },
                model: {
                  value: _vm.extra.name,
                  callback: function ($$v) {
                    _vm.$set(_vm.extra, "name", $$v)
                  },
                  expression: "extra.name",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { col: "", sm: "12", md: "3" } },
            [
              _c("b-form-input", {
                attrs: {
                  size: "sm",
                  placeholder: "HP",
                  formatter: _vm.frm_formatHp,
                },
                model: {
                  value: _vm.extra.hp,
                  callback: function ($$v) {
                    _vm.$set(_vm.extra, "hp", $$v)
                  },
                  expression: "extra.hp",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { col: "", sm: "12", md: "3" } },
            [
              _c("b-form-input", {
                attrs: { size: "sm", placeholder: "소속" },
                model: {
                  value: _vm.extra.part,
                  callback: function ($$v) {
                    _vm.$set(_vm.extra, "part", $$v)
                  },
                  expression: "extra.part",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { col: "", sm: "12", md: "2" } },
            [
              _c("b-form-input", {
                attrs: { size: "sm", placeholder: "업체명" },
                model: {
                  value: _vm.extra.company,
                  callback: function ($$v) {
                    _vm.$set(_vm.extra, "company", $$v)
                  },
                  expression: "extra.company",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { col: "", sm: "12", md: "2" } },
            [
              _c("b-form-input", {
                attrs: { size: "sm", placeholder: "우편번호" },
                model: {
                  value: _vm.extra.code,
                  callback: function ($$v) {
                    _vm.$set(_vm.extra, "code", $$v)
                  },
                  expression: "extra.code",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { col: "", sm: "12", md: "2" } },
            [
              _c("b-form-input", {
                attrs: { size: "sm", placeholder: "**시 **구" },
                model: {
                  value: _vm.extra.city,
                  callback: function ($$v) {
                    _vm.$set(_vm.extra, "city", $$v)
                  },
                  expression: "extra.city",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { col: "", sm: "12", md: "3" } },
            [
              _c("b-form-input", {
                attrs: { size: "sm", placeholder: "도로명" },
                model: {
                  value: _vm.extra.street,
                  callback: function ($$v) {
                    _vm.$set(_vm.extra, "street", $$v)
                  },
                  expression: "extra.street",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { col: "", sm: "12", md: "3" } },
            [
              _c("b-form-input", {
                attrs: { size: "sm", placeholder: "상세 동호수" },
                model: {
                  value: _vm.extra.detail,
                  callback: function ($$v) {
                    _vm.$set(_vm.extra, "detail", $$v)
                  },
                  expression: "extra.detail",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { col: "", sm: "12" } },
            [
              _c("b-form-textarea", {
                attrs: { placeholder: "배송시 요청사항 입력" },
                model: {
                  value: _vm.extra.req_dlvy,
                  callback: function ($$v) {
                    _vm.$set(_vm.extra, "req_dlvy", $$v)
                  },
                  expression: "extra.req_dlvy",
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
        { staticClass: "list head" },
        [
          _c("b-col", [
            _c("span", [_vm._v("주문번호")]),
            _c("span", [_vm._v("제품명")]),
          ]),
          _vm._v(" "),
          _c("b-col", [
            _c("span", [_vm._v("모델명")]),
            _c("span", [_vm._v("판매단위")]),
          ]),
          _vm._v(" "),
          _c("b-col", [
            _c("span", [_vm._v("수량")]),
            _c("span", [_vm._v("가격")]),
          ]),
          _vm._v(" "),
          _c("b-col", [
            _c("span", [_vm._v("요청사항")]),
            _c("span", [_vm._v("Ctrl")]),
          ]),
        ],
        1
      ),
      _vm._v(" "),
      _vm._l(_vm.list.data, function (row, i) {
        return _c(
          "b-row",
          { key: row.odm_id, staticClass: "list body" },
          [
            _c("b-col", [
              _c(
                "span",
                [
                  _c(
                    "b-form-checkbox",
                    {
                      attrs: { name: "b2b_chk" },
                      on: {
                        change: function ($event) {
                          return _vm.chkChange(i)
                        },
                      },
                      model: {
                        value: row.b2b_chk,
                        callback: function ($$v) {
                          _vm.$set(row, "b2b_chk", $$v)
                        },
                        expression: "row.b2b_chk",
                      },
                    },
                    [
                      _vm._v(
                        "\r\n                    " +
                          _vm._s(row.odm_od_id) +
                          "\r\n                "
                      ),
                    ]
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(row.odm_gm_name))]),
            ]),
            _vm._v(" "),
            _c("b-col", [
              _c("span", [_vm._v(_vm._s(row.odm_gm_code))]),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(row.odm_gm_unit))]),
            ]),
            _vm._v(" "),
            _c("b-col", [
              _c(
                "span",
                [
                  _c("b-form-input", {
                    staticClass: "odm_ea",
                    attrs: { size: "sm" },
                    model: {
                      value: row.odm_ea,
                      callback: function ($$v) {
                        _vm.$set(row, "odm_ea", $$v)
                      },
                      expression: "row.odm_ea",
                    },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c("span", [
                _vm._v(_vm._s(_vm._f("comma")(row.odm_price)) + " 원"),
              ]),
            ]),
            _vm._v(" "),
            _c("b-col", [
              _c(
                "span",
                { staticClass: "req_order_box" },
                [
                  _c("b-form-textarea", {
                    staticClass: "req_order",
                    attrs: { placeholder: "주문시 요청사항 입력" },
                    model: {
                      value: row.req_order,
                      callback: function ($$v) {
                        _vm.$set(row, "req_order", $$v)
                      },
                      expression: "row.req_order",
                    },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "span",
                [
                  _c(
                    "b-button",
                    {
                      attrs: { size: "sm" },
                      on: {
                        click: function ($event) {
                          return _vm.stockCheck(row.odm_gm_code, row.odm_ea)
                        },
                      },
                    },
                    [_vm._v("재고 체크")]
                  ),
                ],
                1
              ),
            ]),
          ],
          1
        )
      }),
      _vm._v(" "),
      _c(
        "pagination",
        {
          staticClass: "mt-5",
          attrs: {
            data: _vm.list,
            limit: 5,
            showDisabled: true,
            align: "center",
          },
          on: { "pagination-change-page": _vm.pageSet },
        },
        [
          _c(
            "span",
            { attrs: { slot: "prev-nav" }, slot: "prev-nav" },
            [_c("b-icon-chevron-left")],
            1
          ),
          _vm._v(" "),
          _c(
            "span",
            { attrs: { slot: "next-nav" }, slot: "next-nav" },
            [_c("b-icon-chevron-right")],
            1
          ),
        ]
      ),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);