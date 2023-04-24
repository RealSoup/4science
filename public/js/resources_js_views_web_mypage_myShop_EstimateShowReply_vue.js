"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web_mypage_myShop_EstimateShowReply_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "mypageEstimateReplyShow",
  components: {
    'LoadingModal': function LoadingModal() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_LoadingModal_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/LoadingModal.vue */ "./resources/js/views/_common/LoadingModal.vue"));
    }
  },
  data: function data() {
    return {
      isLoadingModalViewed: true,
      reply: {},
      gd_price: 0,
      surtax: 0,
      dlvy_4s: 0,
      dlvy_other: 0,
      air_price: 0,
      all_price: 0,
      sum_mileage: 0,
      indeterminate: false,
      all_chk: false
    };
  },
  computed: {},
  methods: {
    settle: function settle() {
      var rst = [];

      var _iterator = _createForOfIteratorHelper(this.reply.estimate_model),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;
          if (v.em_ea > 0 && v.em_check_opt == 'Y') rst.push({
            gd_id: v.em_gd_id,
            em_id: v.em_id
          });

          if (v.hasOwnProperty('estimate_option')) {
            var _iterator2 = _createForOfIteratorHelper(v.estimate_option),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var op = _step2.value;
                if (op.eo_ea > 0 && op.eo_check_opt == 'Y') rst.push({
                  gd_id: op.eo_gd_id,
                  eo_id: op.eo_id
                });
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (!rst.length) {
        Notify.modal("모델을 선택하세요", 'info');
        return false;
      }

      this.$router.push({
        name: 'order_settle',
        params: {
          od_goods: rst,
          od_type: 'buy_estimate',
          od_er_id: this.$route.params.er_id
        }
      });
    },
    reEstimate: function reEstimate() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var isValid, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.$refs.observer.validate();

              case 2:
                isValid = _context.sent;

                if (!isValid) {
                  _context.next = 17;
                  break;
                }

                _context.prev = 4;
                _context.next = 7;
                return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].post("/api/shop/estimate/reEstimate", _this.reply);

              case 7:
                res = _context.sent;

                if (res && res.status === 200) {
                  console.log(res);
                  Notify.toast('success', '견적 요청 완료'); // this.$router.push({name: 'main'});
                } else {
                  Notify.toast('warning', res);
                }

                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](4);
                Notify.consolePrint(_context.t0);
                Notify.toast('warning', _context.t0.responsee);

              case 15:
                _context.next = 18;
                break;

              case 17:
                document.getElementById('eq_content').focus();

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 11]]);
      }))();
    },
    print: function print() {
      var url = "/api/shop/estimate/printEstimate/".concat(this.$route.params.er_id);
      var name = "견적서 인쇄";
      var option = "width = 900, height = 900, top = 10, left = 10, location = no";
      window.open(url, name, option);
    },
    calculator: function calculator() {
      var collect = {};
      var sum_mileage = 0;
      var dlvy_other = 0;

      var _iterator3 = _createForOfIteratorHelper(this.reply.estimate_model),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var em = _step3.value;
          var pa_id = 0;

          if (em.em_check_opt == 'Y') {
            if (!!em.goods && !!em.goods.purchase_at) pa_id = em.goods.gd_pa_id;

            if (!collect.hasOwnProperty(pa_id)) {
              if (pa_id > 0 && em.goods.purchase_at.pa_type == "AIR") collect[pa_id] = {
                'goods': 0,
                'dlvy': 0,
                'air': Number(em.goods.purchase_at.pa_price_add_vat)
              };else collect[pa_id] = {
                'goods': 0,
                'dlvy': Number(em.goods.dlvy_fee_add_vat),
                'free_dlvy_max': Number(em.goods.free_dlvy_max),
                'air': 0
              };
            }

            collect[pa_id].goods += Number(em.em_price) * Number(em.em_ea);
            sum_mileage += em.gain_mileage;
          }

          var _iterator4 = _createForOfIteratorHelper(em.estimate_option),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var eo = _step4.value;

              if (eo.eo_check_opt == 'Y') {
                collect[pa_id].goods += Number(eo.eo_price) * Number(eo.eo_ea);
                sum_mileage += eo.gain_mileage;
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

      this.gd_price = Object.values(collect).reduce(function (acc, el) {
        return acc + el.goods;
      }, 0);
      this.air_price = Object.values(collect).reduce(function (acc, el) {
        return acc + el.air;
      }, 0);
      this.surtax = Number((this.gd_price * 0.1).toFixed());

      for (var key in collect) {
        if (key == 0) {
          if (collect[key].dlvy && collect[key].goods < collect[key].free_dlvy_max) this.dlvy_4s = Number(collect[key].dlvy);
        } else {
          if (collect[key].dlvy && collect[key].goods < collect[key].free_dlvy_max) dlvy_other += Number(collect[key].dlvy);
        }
      }

      this.dlvy_other = dlvy_other;
      this.sum_mileage = sum_mileage;
      this.all_price = this.gd_price + this.surtax + this.dlvy_4s + this.air_price + dlvy_other;
    },
    getValidationState: function getValidationState(_ref) {
      var dirty = _ref.dirty,
          validated = _ref.validated,
          _ref$valid = _ref.valid,
          valid = _ref$valid === void 0 ? null : _ref$valid;
      return dirty || validated ? valid : null;
    },
    chkChange: function chkChange() {
      var chkCnt = this.reply.estimate_model.filter(function (el) {
        return el.em_check_opt == true;
      }).length;

      if (chkCnt === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (chkCnt === this.ledger.data.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }

      this.calculator();
    },
    toggle_all_chk: function toggle_all_chk(checked) {
      this.ledger.data.forEach(function (el) {
        el.chk_cplt = checked ? true : false;
      });
      this.indeterminate = false;
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _api_http__WEBPACK_IMPORTED_MODULE_1__["default"].get("/api/shop/estimate/reply/".concat(_this2.$route.params.er_id));

            case 2:
              res = _context2.sent;

              if (res && res.status === 200) {
                _this2.reply = res.data;
                _this2.isLoadingModalViewed = false;

                _this2.calculator();
              }

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=style&index=0&id=76fdf33c&lang=css&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=style&index=0&id=76fdf33c&lang=css&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.w_fence[data-v-76fdf33c] { padding-right:0; padding-left:0;\n}\n.w_fence .container[data-v-76fdf33c],\r\n.w_fence .container .row[data-v-76fdf33c], \r\n.w_fence .container .row .col[data-v-76fdf33c] { margin:0; padding:0;\n}\nh3[data-v-76fdf33c] { font-size:1.5rem;\n}\nh3 b[data-v-76fdf33c] { color:#0094EA; font-size:1.3rem;\n}\nh6[data-v-76fdf33c] { font-size:1.15rem; font-weight:600; margin-top:2rem; padding-left:2rem;\n}\n.w_fence .top[data-v-76fdf33c] { border-top:2px solid #4F637B; border-left:1px solid #B7B7B7;\n}\n.w_fence .top .row .col[data-v-76fdf33c] { border-right:1px solid #B7B7B7; border-bottom:1px solid #B7B7B7; padding:1.2rem 0; text-align:center;\n}\n.w_fence .top .row .col[data-v-76fdf33c]:nth-of-type(4) { flex:0 0 40%; max-width:40%;\n}\n.w_fence .top .row .col span[data-v-76fdf33c] { margin-right:.7rem; font-weight:600;\n}\n.w_fence .top .row .col b[data-v-76fdf33c] { color:#0094EA;\n}\n.w_fence .goods[data-v-76fdf33c] { padding-bottom:.5rem;\n}\n.w_fence .goods .row .col[data-v-76fdf33c] { text-align:center; padding-top:.4rem; padding-bottom:.4rem;\n}\n.w_fence .goods .row .col.align[data-v-76fdf33c] { display:flex; align-items:center; justify-content:center;\n}\n.w_fence .goods .row[data-v-76fdf33c]:first-child { border-top:1px solid #ACACAC; border-bottom:1px solid #ACACAC; background-color:#ECECEC;\n}\n.w_fence .goods .row:first-child .col[data-v-76fdf33c] { font-weight:600; line-height:1.7; padding:.86rem 0; font-size:.9rem;\n}\n.w_fence .goods .row:not(:first-child) .col[data-v-76fdf33c],\r\n.w_fence .goods .row:not(:first-child) .col p[data-v-76fdf33c] { color:#AEAEAE; font-size:.85rem;\n}\n.w_fence .goods .row .col b[data-v-76fdf33c] { color:#000; font-size:.95rem;\n}\n.w_fence .goods .row .col[data-v-76fdf33c]:nth-child(1) { flex:0 0 7%; max-width:7%;\n}\n.w_fence .goods .row .col[data-v-76fdf33c]:nth-child(2) { flex:0 0 9%; max-width:9%;\n}\n.w_fence .goods .row .col[data-v-76fdf33c]:nth-child(3) {  display:flex; align-items:center; text-align:left; padding-left:3%;\n}\n.w_fence .goods .row .col[data-v-76fdf33c]:nth-child(4) { flex:0 0 10%; max-width:10%;\n}\n.w_fence .goods .row .col[data-v-76fdf33c]:nth-child(5) { flex:0 0 10%; max-width:10%;\n}\n.w_fence .goods .row .col[data-v-76fdf33c]:nth-child(6) { flex:0 0 10%; max-width:10%; font-weight:900; color:#000;\n}\n.w_fence .goods .row .col img[data-v-76fdf33c] { width:100%;\n}\n.w_fence .goods .row .col p[data-v-76fdf33c] { margin:0;\n}\n.w_fence .goods .row .col[data-v-76fdf33c] .myCheck .custom-control-label::before, \r\n.w_fence .goods .row .col[data-v-76fdf33c] .myCheck .custom-control-label::after { width:1.8rem; height:1.8rem; top:-2px;\n}\n.w_fence .goods .row .option[data-v-76fdf33c] { flex:0 0 100%; max-width:100%; display:flex;\n}\n.w_fence .sum_up[data-v-76fdf33c] { border-top:3px solid #4F637B;\n}\n.w_fence .sum_up .total[data-v-76fdf33c] { border-bottom:1px solid #D6D6D6;\n}\n.w_fence .sum_up .total .col[data-v-76fdf33c] { color:#000; font-weight:bold; padding:1rem .5rem;\n}\n.w_fence .sum_up .total .col b[data-v-76fdf33c] { font-size:1.4rem;\n}\n.w_fence .sum_up .total .col[data-v-76fdf33c]:nth-of-type(odd) { padding-left:2rem; display:flex; align-items:center;\n}\n.w_fence .sum_up .total .col[data-v-76fdf33c]:nth-of-type(even) { padding-right:2rem; text-align:right;\n}\n.w_fence .sum_up .total .col[data-v-76fdf33c]:nth-of-type(1) {\n}\n.w_fence .sum_up .total .col[data-v-76fdf33c]:nth-of-type(2) {  border-right:1px solid #D6D6D6;\n}\n.w_fence .sum_up .total .col[data-v-76fdf33c]:nth-of-type(2):after,\r\n.w_fence .sum_up .total .col[data-v-76fdf33c]:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; position:absolute; right:-14px; top:19px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.2;\n}\n.w_fence .sum_up .total .col[data-v-76fdf33c]:nth-of-type(2):after { content:\"+\";\n}\n.w_fence .sum_up .total .col[data-v-76fdf33c]:nth-of-type(3) {\n}\n.w_fence .sum_up .total .col[data-v-76fdf33c]:nth-of-type(4) { border-right:1px solid #D6D6D6;\n}\n.w_fence .sum_up .total .col[data-v-76fdf33c]:nth-of-type(4):after { content:\"=\";\n}\n.w_fence .sum_up .total .col[data-v-76fdf33c]:nth-of-type(5) { flex-basis:19.5%; max-width:19.5%;\n}\n.w_fence .sum_up .total .col[data-v-76fdf33c]:nth-of-type(6) { flex-basis:19.5%; max-width:19.5%;\n}\n.w_fence .sum_up .total_sub[data-v-76fdf33c] { background:#F2F3F5; border-bottom-width:0;\n}\n.w_fence .sum_up .total_sub>.col[data-v-76fdf33c]:nth-of-type(1) { border-right:1px solid #D6D6D6;\n}\n.w_fence .sum_up .total_sub>.col[data-v-76fdf33c]:nth-of-type(2) { border-right:1px solid #D6D6D6;\n}\n.w_fence .sum_up .total_sub>.col[data-v-76fdf33c]:nth-of-type(3) { flex-basis:39%; max-width:39%;\n}\n.w_fence .sum_up .total_sub .col>div[data-v-76fdf33c] { display:flex; flex-wrap:wrap;\n}\n.w_fence .sum_up .total_sub .col>div[data-v-76fdf33c]:nth-of-type(1) { padding:1.3rem 1rem .5rem 1rem;\n}\n.w_fence .sum_up .total_sub .col>div[data-v-76fdf33c]:nth-of-type(2) { padding:0 1rem 1.5rem 1rem;\n}\n.w_fence .sum_up .total_sub .col>div .col[data-v-76fdf33c] { color:#A8A9AB; font-weight:bold; font-size:.84rem;\n}\n.w_fence .sum_up .total_sub .col>div .col[data-v-76fdf33c]:nth-of-type(2) { text-align:right;\n}\n.w_fence .extra[data-v-76fdf33c] { margin-top:2rem;\n}\n.w_fence .extra .row .col[data-v-76fdf33c]:nth-child(1) { margin-right:2rem;\n}\n.w_fence .extra .row .col h6[data-v-76fdf33c] { border-bottom:2px solid #707070; margin-bottom:.7rem; padding-bottom:.5rem;\n}\n.w_fence .extra .row .col h6 b[data-v-76fdf33c] { color:#0094EA;\n}\n.w_fence .extra .row .col:nth-child(1) .desc[data-v-76fdf33c] { border:1px solid #D6D6D6; padding:1rem;}\n.w_fence .extra .row .col .btn[data-v-76fdf33c] { font-size:.85rem; padding:.3rem;\n}\r\n\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=style&index=0&id=76fdf33c&lang=css&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=style&index=0&id=76fdf33c&lang=css&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateShowReply_vue_vue_type_style_index_0_id_76fdf33c_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EstimateShowReply.vue?vue&type=style&index=0&id=76fdf33c&lang=css&scoped=true& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=style&index=0&id=76fdf33c&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateShowReply_vue_vue_type_style_index_0_id_76fdf33c_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateShowReply_vue_vue_type_style_index_0_id_76fdf33c_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/mypage/myShop/EstimateShowReply.vue":
/*!********************************************************************!*\
  !*** ./resources/js/views/web/mypage/myShop/EstimateShowReply.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _EstimateShowReply_vue_vue_type_template_id_76fdf33c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EstimateShowReply.vue?vue&type=template&id=76fdf33c&scoped=true& */ "./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=template&id=76fdf33c&scoped=true&");
/* harmony import */ var _EstimateShowReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EstimateShowReply.vue?vue&type=script&lang=js& */ "./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=script&lang=js&");
/* harmony import */ var _EstimateShowReply_vue_vue_type_style_index_0_id_76fdf33c_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EstimateShowReply.vue?vue&type=style&index=0&id=76fdf33c&lang=css&scoped=true& */ "./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=style&index=0&id=76fdf33c&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _EstimateShowReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EstimateShowReply_vue_vue_type_template_id_76fdf33c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _EstimateShowReply_vue_vue_type_template_id_76fdf33c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "76fdf33c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/mypage/myShop/EstimateShowReply.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateShowReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EstimateShowReply.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateShowReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=style&index=0&id=76fdf33c&lang=css&scoped=true&":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=style&index=0&id=76fdf33c&lang=css&scoped=true& ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateShowReply_vue_vue_type_style_index_0_id_76fdf33c_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EstimateShowReply.vue?vue&type=style&index=0&id=76fdf33c&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=style&index=0&id=76fdf33c&lang=css&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=template&id=76fdf33c&scoped=true&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=template&id=76fdf33c&scoped=true& ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateShowReply_vue_vue_type_template_id_76fdf33c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateShowReply_vue_vue_type_template_id_76fdf33c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstimateShowReply_vue_vue_type_template_id_76fdf33c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EstimateShowReply.vue?vue&type=template&id=76fdf33c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=template&id=76fdf33c&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=template&id=76fdf33c&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/mypage/myShop/EstimateShowReply.vue?vue&type=template&id=76fdf33c&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
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
      _c("h3", [_vm._v("견적서 "), _c("b", [_vm._v(_vm._s(_vm.reply.er_id))])]),
      _vm._v(" "),
      _c("ValidationObserver", {
        ref: "observer",
        staticClass: "estimate_show",
        attrs: { tag: "form" },
        scopedSlots: _vm._u([
          {
            key: "default",
            fn: function (ref) {
              var invalid = ref.invalid
              return [
                _vm.isLoadingModalViewed
                  ? _c(
                      "LoadingModal",
                      {
                        attrs: { position: "absolute" },
                        on: {
                          "close-modal": function ($event) {
                            _vm.isLoadingModalViewed = false
                          },
                        },
                      },
                      [_vm._v("\r\n            Loading ......\r\n        ")]
                    )
                  : _c(
                      "div",
                      [
                        _c(
                          "b-container",
                          { staticClass: "top" },
                          [
                            _c(
                              "b-row",
                              [
                                _c("b-col", [
                                  _c("span", [_vm._v("견적일자")]),
                                  _vm._v(" "),
                                  _c("b", [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("formatDate_YYYY_MM_DD")(
                                          _vm.reply.created_at
                                        )
                                      )
                                    ),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _c("b-col", [
                                  _c("span", [_vm._v("유효기간")]),
                                  _vm._v(" "),
                                  _c("b", [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("formatDate_YYYY_MM_DD")(
                                          _vm.reply.er_effective_at
                                        )
                                      )
                                    ),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _c("b-col", [
                                  _c("span", [_vm._v("납품기일")]),
                                  _vm._v(" "),
                                  _c("b", [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("formatDate_YYYY_MM_DD")(
                                          _vm.reply.er_dlvy_at
                                        )
                                      )
                                    ),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _c("b-col", [
                                  _c("span", [_vm._v("담당자/문의")]),
                                  _vm._v(
                                    " " +
                                      _vm._s(_vm.reply.user.name) +
                                      "   " +
                                      _vm._s(_vm.reply.user.tel) +
                                      "   " +
                                      _vm._s(_vm.reply.user.email)
                                  ),
                                ]),
                              ],
                              1
                            ),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("h6", [_vm._v("상품정보")]),
                        _vm._v(" "),
                        _c(
                          "b-container",
                          { staticClass: "goods" },
                          [
                            _c(
                              "b-row",
                              [
                                _c(
                                  "b-col",
                                  [
                                    _c("b-form-checkbox", {
                                      staticClass: "myCheck",
                                      attrs: {
                                        indeterminate: _vm.indeterminate,
                                      },
                                      on: { change: _vm.toggle_all_chk },
                                      model: {
                                        value: _vm.all_chk,
                                        callback: function ($$v) {
                                          _vm.all_chk = $$v
                                        },
                                        expression: "all_chk",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("b-col"),
                                _vm._v(" "),
                                _c("b-col", [_vm._v("상품명 / 모델명")]),
                                _vm._v(" "),
                                _c("b-col", [_vm._v("판매가격")]),
                                _vm._v(" "),
                                _c("b-col", [_vm._v("수량")]),
                                _vm._v(" "),
                                _c("b-col", [_vm._v("합계")]),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _vm._l(_vm.reply.estimate_model, function (em) {
                              return _c(
                                "b-row",
                                { key: em.em_id },
                                [
                                  _c(
                                    "b-col",
                                    { staticClass: "align" },
                                    [
                                      _c("b-form-checkbox", {
                                        staticClass: "myCheck",
                                        attrs: {
                                          value: "Y",
                                          "unchecked-value": "N",
                                        },
                                        on: { change: _vm.chkChange },
                                        model: {
                                          value: em.em_check_opt,
                                          callback: function ($$v) {
                                            _vm.$set(em, "em_check_opt", $$v)
                                          },
                                          expression: "em.em_check_opt",
                                        },
                                      }),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-col",
                                    [
                                      !!em.em_gd_id
                                        ? _c(
                                            "b-link",
                                            {
                                              attrs: {
                                                to: {
                                                  name: "goods_show",
                                                  params: {
                                                    gd_id: em.em_gd_id,
                                                  },
                                                },
                                              },
                                            },
                                            [
                                              _c("img", {
                                                staticClass: "img-fluid",
                                                attrs: {
                                                  src: em.goods
                                                    .image_src_thumb[0],
                                                },
                                              }),
                                            ]
                                          )
                                        : _c("img", {
                                            staticClass: "img-fluid",
                                            attrs: {
                                              src: em.goods.image_src_thumb[0],
                                            },
                                          }),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-col",
                                    [
                                      !!em.em_gd_id
                                        ? _c(
                                            "b-link",
                                            {
                                              attrs: {
                                                to: {
                                                  name: "goods_show",
                                                  params: {
                                                    gd_id: em.em_gd_id,
                                                  },
                                                },
                                              },
                                            },
                                            [
                                              _c("b", [
                                                _vm._v(_vm._s(em.em_name)),
                                              ]),
                                              _vm._v(" "),
                                              _c("p", [
                                                _vm._v(
                                                  "\r\n                                모델명: " +
                                                    _vm._s(em.em_code) +
                                                    " / Cat.No.: " +
                                                    _vm._s(em.em_catno)
                                                ),
                                                _c("br"),
                                                _vm._v(
                                                  "\r\n                                사양: " +
                                                    _vm._s(em.em_spec)
                                                ),
                                                _c("br"),
                                                _vm._v(
                                                  "\r\n                                판매단위: " +
                                                    _vm._s(em.em_unit) +
                                                    "\r\n                            "
                                                ),
                                              ]),
                                            ]
                                          )
                                        : _c("div", [
                                            _vm._v(
                                              "\r\n                            " +
                                                _vm._s(em.em_name) +
                                                "\r\n                            "
                                            ),
                                            _c("p", [
                                              _vm._v(
                                                "\r\n                                모델명: " +
                                                  _vm._s(em.em_code) +
                                                  " / Cat.No.: " +
                                                  _vm._s(em.em_catno)
                                              ),
                                              _c("br"),
                                              _vm._v(
                                                "\r\n                                사양: " +
                                                  _vm._s(em.em_spec)
                                              ),
                                              _c("br"),
                                              _vm._v(
                                                "\r\n                                판매단위: " +
                                                  _vm._s(em.em_unit) +
                                                  "\r\n                            "
                                              ),
                                            ]),
                                          ]),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("b-col", { staticClass: "align" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("won")(
                                          _vm._f("comma")(
                                            _vm._f("rrp")(em.em_price)
                                          )
                                        )
                                      )
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("b-col", { staticClass: "align" }, [
                                    _vm._v(_vm._s(em.em_ea)),
                                  ]),
                                  _vm._v(" "),
                                  _c("b-col", { staticClass: "align" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("won")(
                                          _vm._f("comma")(
                                            _vm._f("rrp")(
                                              em.em_price * em.em_ea
                                            )
                                          )
                                        )
                                      )
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  em.estimate_option.length
                                    ? _vm._l(em.estimate_option, function (eo) {
                                        return _c(
                                          "b-col",
                                          {
                                            key: eo.eo_id,
                                            staticClass: "option",
                                          },
                                          [
                                            _c("b-col"),
                                            _vm._v(" "),
                                            _c("b-col", [_vm._v("추가 옵션")]),
                                            _vm._v(" "),
                                            _c("b-col", [
                                              _vm._v(
                                                _vm._s(eo.eo_tit) +
                                                  ":" +
                                                  _vm._s(eo.eo_name)
                                              ),
                                            ]),
                                            _vm._v(" "),
                                            _c("b-col", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm._f("won")(
                                                    _vm._f("comma")(
                                                      _vm._f("rrp")(eo.eo_price)
                                                    )
                                                  )
                                                )
                                              ),
                                            ]),
                                            _vm._v(" "),
                                            _c("b-col", [
                                              _vm._v(_vm._s(eo.eo_ea)),
                                            ]),
                                            _vm._v(" "),
                                            _c("b-col", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm._f("won")(
                                                    _vm._f("comma")(
                                                      _vm._f("rrp")(
                                                        eo.eo_price * eo.eo_ea
                                                      )
                                                    )
                                                  )
                                                )
                                              ),
                                            ]),
                                          ],
                                          1
                                        )
                                      })
                                    : _vm._e(),
                                ],
                                2
                              )
                            }),
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
                                _c("b-col", [_vm._v("견적가")]),
                                _vm._v(" "),
                                _c("b-col", [
                                  _c("b", [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("won")(
                                          _vm._f("comma")(
                                            _vm.gd_price + _vm.surtax
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
                                          _vm._f("comma")(
                                            _vm.dlvy_4s +
                                              _vm.dlvy_other +
                                              _vm.air_price
                                          )
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
                                          _vm._f("comma")(_vm.all_price)
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
                                              _vm._f("comma")(_vm.gd_price)
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
                                              _vm._f("comma")(_vm.surtax)
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
                                        _vm._v(
                                          _vm._s(_vm._f("comma")(_vm.dlvy_4s))
                                        ),
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
                                        _vm._v(
                                          _vm._s(
                                            _vm._f("comma")(
                                              _vm.dlvy_other + _vm.air_price
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
                                      _c("b-col", [
                                        _vm._v("적립예정 마일리지"),
                                      ]),
                                      _c("b-col", [
                                        _vm._v(
                                          _vm._s(
                                            _vm._f("comma")(_vm.sum_mileage)
                                          )
                                        ),
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
                          { staticClass: "extra" },
                          [
                            _c(
                              "b-row",
                              [
                                _c("b-col", [
                                  _c("h6", [_vm._v("추가정보")]),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    _vm._l(_vm.reply.file_info, function (fi) {
                                      return _c(
                                        "b-button",
                                        {
                                          key: fi.fi_id,
                                          staticClass: "white mr-2",
                                          on: {
                                            click: function ($event) {
                                              return _vm.fileDown(
                                                fi.down_path,
                                                fi.fi_original
                                              )
                                            },
                                          },
                                        },
                                        [
                                          _c("b-icon", {
                                            attrs: {
                                              icon: "file-earmark-arrow-down-fill",
                                            },
                                          }),
                                          _vm._v(
                                            " " +
                                              _vm._s(fi.fi_original) +
                                              "\r\n                            "
                                          ),
                                        ],
                                        1
                                      )
                                    }),
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("hr"),
                                  _vm._v(" "),
                                  _c("div", {
                                    staticClass: "desc",
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.nl2br(_vm.reply.er_content)
                                      ),
                                    },
                                  }),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "b-col",
                                  [
                                    _c("h6", [
                                      _c("b", [_vm._v("재견적 요청")]),
                                    ]),
                                    _vm._v(" "),
                                    _c("validation-provider", {
                                      attrs: {
                                        name: "견적 요청 내용",
                                        rules: "required|min:1",
                                      },
                                      scopedSlots: _vm._u([
                                        {
                                          key: "default",
                                          fn: function (validationContext) {
                                            return [
                                              _c(
                                                "b-form-group",
                                                {
                                                  attrs: {
                                                    "label-for": "eq_content",
                                                    "label-class": "required",
                                                  },
                                                },
                                                [
                                                  _c("b-form-textarea", {
                                                    attrs: {
                                                      id: "eq_content",
                                                      placeholder:
                                                        "재견적 요청 내용...",
                                                      rows: "6",
                                                      state:
                                                        _vm.getValidationState(
                                                          validationContext
                                                        ),
                                                    },
                                                    model: {
                                                      value:
                                                        _vm.reply.eq_content,
                                                      callback: function ($$v) {
                                                        _vm.$set(
                                                          _vm.reply,
                                                          "eq_content",
                                                          $$v
                                                        )
                                                      },
                                                      expression:
                                                        "reply.eq_content",
                                                    },
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "b-form-invalid-feedback",
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          validationContext
                                                            .errors[0]
                                                        )
                                                      ),
                                                    ]
                                                  ),
                                                ],
                                                1
                                              ),
                                            ]
                                          },
                                        },
                                      ]),
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
                          { staticClass: "btn_box" },
                          [
                            _c(
                              "b-button",
                              {
                                staticClass: "black lg",
                                on: { click: _vm.print },
                              },
                              [_vm._v("견적서 출력")]
                            ),
                            _vm._v(" "),
                            _c(
                              "b-button",
                              {
                                staticClass: "gray lg",
                                on: { click: _vm.reEstimate },
                              },
                              [_vm._v("선택상품 재견적 요청")]
                            ),
                            _vm._v(" "),
                            _c(
                              "b-button",
                              {
                                staticClass: "blue lg",
                                on: { click: _vm.settle },
                              },
                              [_vm._v("선택상품 주문하기")]
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
              ]
            },
          },
        ]),
      }),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);