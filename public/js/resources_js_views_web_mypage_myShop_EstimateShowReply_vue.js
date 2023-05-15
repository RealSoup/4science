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
//
//
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
    },
    'PaList': function PaList() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web__module_PaList_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/web/_module/PaList */ "./resources/js/views/web/_module/PaList.vue"));
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
      all_chk: true
    };
  },
  computed: {},
  methods: {
    settle: function settle() {
      var rst = [];
      var is_model_check = false;

      for (var pa_id in this.reply.collect.lists) {
        var _iterator = _createForOfIteratorHelper(this.reply.collect.lists[pa_id]),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var em = _step.value;

            if (em.type == 'model') {
              if (em.ea > 0 && em.em_check_opt) {
                rst.push({
                  gd_id: em.gd_id,
                  em_id: em.em_id
                });
                is_model_check = true;
              } else is_model_check = false;
            }

            if (em.type == 'option' && is_model_check) rst.push({
              gd_id: em.gd_id,
              eo_id: em.eo_id
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
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
                  Notify.toast('success', '견적 요청 완료');

                  _this.$router.push({
                    name: 'my_estimate'
                  });
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
    getValidationState: function getValidationState(_ref) {
      var dirty = _ref.dirty,
          validated = _ref.validated,
          _ref$valid = _ref.valid,
          valid = _ref$valid === void 0 ? null : _ref$valid;
      return dirty || validated ? valid : null;
    },
    calculator: function calculator() {
      var collect = {};
      var sum_mileage = 0;
      var dlvy_other = 0;
      var is_model_check = false;

      for (var pa_id in this.reply.collect.lists) {
        var _iterator2 = _createForOfIteratorHelper(this.reply.collect.lists[pa_id]),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var em = _step2.value;

            if (em.type == 'model') {
              if (em.em_check_opt) {
                if (!collect.hasOwnProperty(pa_id)) {
                  if (pa_id > 0 && em.pa_type == "AIR") collect[pa_id] = {
                    'goods': 0,
                    'dlvy': 0,
                    'air': Number(em.pa_dlvy_p_add_vat)
                  };else collect[pa_id] = {
                    'goods': 0,
                    'dlvy': Number(em.pa_dlvy_p_add_vat),
                    'free_dlvy_max': Number(this.reply.goods.free_dlvy_max),
                    'air': 0
                  };
                }

                collect[pa_id].goods += Number(em.price) * Number(em.ea);
                sum_mileage += em.price * this.reply.estimate_req.user.mileage_mul * em.ea;
                is_model_check = true;
              } else is_model_check = false;
            }

            if (em.type == 'option' && is_model_check) {
              collect[pa_id].goods += Number(em.price) * Number(em.ea);
              sum_mileage += em.price * this.reply.estimate_req.user.mileage_mul * em.ea;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } // console.log(collect);


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
    chkChange: function chkChange() {
      var chkCnt = Object.values(this.reply.collect.lists).reduce(function (acc, pa) {
        return acc + pa.filter(function (el) {
          return el.em_check_opt == true;
        }).length;
      }, 0);

      if (chkCnt === 0) {
        this.indeterminate = false;
        this.all_chk = false;
      } else if (chkCnt === this.reply.estimate_model.length) {
        this.indeterminate = false;
        this.all_chk = true;
      } else {
        this.indeterminate = true;
        this.all_chk = false;
      }

      this.calculator();
    },
    toggle_all_chk: function toggle_all_chk(checked) {
      Object.values(this.reply.collect.lists).forEach(function (el) {
        el.forEach(function (el02) {
          el02.em_check_opt = checked ? true : false;
        });
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.w_fence[data-v-76fdf33c] { padding-right:0; padding-left:0;\n}\n.w_fence .container[data-v-76fdf33c],\r\n.w_fence .container .row[data-v-76fdf33c], \r\n.w_fence .container .row .col[data-v-76fdf33c] { margin:0; padding:0;\n}\nh3[data-v-76fdf33c] { font-size:1.5rem;\n}\nh3 b[data-v-76fdf33c] { color:#0094EA; font-size:1.3rem;\n}\nh6[data-v-76fdf33c] { font-size:1.15rem; font-weight:600; margin-top:2rem; padding-left:2rem;\n}\n.w_fence .top[data-v-76fdf33c] { border-top:2px solid #4F637B; border-left:1px solid #B7B7B7;\n}\n.w_fence .top .row .col[data-v-76fdf33c] { border-right:1px solid #B7B7B7; border-bottom:1px solid #B7B7B7; padding:1.2rem 0; text-align:center;\n}\n.w_fence .top .row .col[data-v-76fdf33c]:nth-of-type(4) { flex:0 0 40%; max-width:40%;\n}\n.w_fence .top .row .col span[data-v-76fdf33c] { margin-right:.7rem; font-weight:600;\n}\n.w_fence .top .row .col b[data-v-76fdf33c] { color:#0094EA;\n}\n.w_fence .top_border[data-v-76fdf33c] { border-top:3px solid #4F637B;\n}\r\n\r\n\r\n/************************************** */\n.pa_list[data-v-76fdf33c] { margin-bottom:2.5rem; padding:0;\n}\n.pa_list .row[data-v-76fdf33c] { margin:0; border-bottom:1px solid #D6D6D6;\n}\n.pa_list .row .col[data-v-76fdf33c] { padding:0; font-size:.93rem; color:#666;\n}\n.pa_list .row.lbody .col[data-v-76fdf33c]:not(:nth-of-type(2)) { display:flex; align-items:center; justify-content:center; text-align:center;\n}\n.pa_list .row .col .row[data-v-76fdf33c]:last-child { border-bottom-width:0;\n}\n.pa_list .row.lbody>.col[data-v-76fdf33c]:first-child { border-right:1px solid #D6D6D6;\n}\n.pa_list .row.lbody>.col[data-v-76fdf33c]:last-child { border-left:1px solid #D6D6D6;\n}\n.pa_list .lhead .col[data-v-76fdf33c] { font-weight:bold; text-align:center; padding:.74rem 0 !important; color:#000;\n}\n.pa_list .lhead .col[data-v-76fdf33c]:nth-of-type(2) { flex-basis:11.2%; max-width:11.2%;\n}\n.pa_list .lhead .col[data-v-76fdf33c]:nth-of-type(3) { flex-basis:8.8%; max-width:8.8%;\n}\n.pa_list .lhead .col[data-v-76fdf33c]:nth-of-type(4) { flex-basis:7.2%; max-width:7.2%;\n}\n.pa_list .lhead .col[data-v-76fdf33c]:nth-of-type(5) { flex-basis:9.6%; max-width:9.6%;\n}\n.pa_list .lhead .col[data-v-76fdf33c]:nth-of-type(6) { flex-basis:10%; max-width:10%;\n}\n.pa_list .lbody>.col[data-v-76fdf33c]:nth-of-type(1),\r\n.pa_list .lbody>.col[data-v-76fdf33c]:nth-of-type(3) { flex-basis:10%; max-width:10%; font-weight:600; color:#000;\n}\n.pa_list .lbody .col .row .col[data-v-76fdf33c]:nth-of-type(1) { flex-basis:18%; max-width:18%;\n}\n.pa_list .lbody .col .row .col[data-v-76fdf33c]:nth-of-type(3) { flex-basis:14%; max-width:14%;\n}\n.pa_list .lbody .col .row .col[data-v-76fdf33c]:nth-of-type(4) { flex-basis:11%; max-width:11%; justify-content:flex-end; padding-right:.5rem;\n}\n.pa_list .lbody .col .row .col[data-v-76fdf33c]:nth-of-type(5) { flex-basis:9%; max-width:9%; justify-content:flex-end; padding-right:.5rem;\n}\n.pa_list .lbody .col .row .col[data-v-76fdf33c]:nth-of-type(6) { flex-basis:12%; max-width:12%; font-weight:600; color:#000; justify-content:flex-end; padding-right:.5rem;\n}\n.pa_list .lbody .col .row .col:nth-of-type(6) span[data-v-76fdf33c] { font-size:.7rem; color:#666;\n}\n.pa_list .row .col .row.option[data-v-76fdf33c] { background:#F4F1EC;\n}\n.pa_list .row .col .row .col[data-v-76fdf33c] { padding:.8rem 0;\n}\n.pa_list .row .col .row .col img[data-v-76fdf33c] { width:119px; height:119px; -o-object-fit:contain; object-fit:contain;\n}\n.pa_list .row .col .row .col p[data-v-76fdf33c] { margin-bottom:.2rem;\n}\n.pa_list .row .col .row .col[data-v-76fdf33c]:nth-of-type(2) { padding-left:1rem;\n}\n.pa_list .row .col .row .col:nth-of-type(2) p[data-v-76fdf33c]:nth-of-type(1){ font-weight:bold; margin-bottom:.8rem; color:#000;\n}\n.pa_list .row .col[data-v-76fdf33c] .myCheck { display:inline-block; padding-left:1.3em; margin:0 .5rem;\n}\n.pa_list .row .col[data-v-76fdf33c] .myCheck .custom-control-label::before, \r\n.pa_list .row .col[data-v-76fdf33c] .myCheck .custom-control-label::after { width:1.8rem; height:1.8rem; top:-2px;\n}\n.pa_list .total[data-v-76fdf33c] { margin-top:1.6rem; border-top:2px solid #363636; border-bottom:1px solid #D6D6D6;\n}\n.pa_list .total .col[data-v-76fdf33c] { color:#000; font-weight:bold;\n}\n.pa_list .total .col[data-v-76fdf33c]:nth-of-type(odd) { display: flex; align-items: center; flex-basis: 12%; max-width: 12%; padding: 1vw 0 1vw 2vw; font-size: .9vw;\n}\n.pa_list .total .col[data-v-76fdf33c]:nth-of-type(even) { text-align: right; padding: 1vw 2vw 1vw 0;\n}\n.pa_list .total .col[data-v-76fdf33c]:nth-of-type(2):after,\r\n.pa_list .total .col[data-v-76fdf33c]:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; position:absolute; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.32rem; top:50%; transform:translateY(-50%);\n}\n.pa_list .total .col b[data-v-76fdf33c] { font-size:1.4rem;\n}\n.pa_list .total .col[data-v-76fdf33c]:nth-of-type(2) { border-right:1px solid #D6D6D6;\n}\n.pa_list .total .col[data-v-76fdf33c]:nth-of-type(2):after { content:\"+\";\n}\n.pa_list .total .col[data-v-76fdf33c]:nth-of-type(4) { border-right:1px solid #D6D6D6;\n}\n.pa_list .total .col[data-v-76fdf33c]:nth-of-type(4):after { content:\"=\";\n}\n.pa_list .total .col[data-v-76fdf33c]:nth-of-type(5) { flex-basis:20%; max-width:20%;\n}\n.pa_list .total .col[data-v-76fdf33c]:nth-of-type(6) { flex-basis:20%; max-width:20%;\n}\n.pa_list .total_sub[data-v-76fdf33c] { background:#F2F3F5; border-bottom-width:0;\n}\n.pa_list .total_sub>.col[data-v-76fdf33c]:nth-of-type(1) { border-right:1px solid #D6D6D6;\n}\n.pa_list .total_sub>.col[data-v-76fdf33c]:nth-of-type(2) { border-right:1px solid #D6D6D6;\n}\n.pa_list .total_sub>.col[data-v-76fdf33c]:nth-of-type(3) { flex-basis:40%; max-width:40%;\n}\n.pa_list .total_sub .col>div[data-v-76fdf33c] { display:flex; flex-wrap:wrap;\n}\n.pa_list .total_sub .col>div[data-v-76fdf33c]:nth-of-type(1) { padding:1.3rem 3rem .5rem 3rem;\n}\n.pa_list .total_sub .col>div[data-v-76fdf33c]:nth-of-type(2) { padding:0 3rem 2.5rem 3rem;\n}\n.pa_list .total_sub .col>div .col[data-v-76fdf33c] { color:#A8A9AB; font-weight:bold; font-size:.84rem;\n}\n.pa_list .total_sub .col>div .col[data-v-76fdf33c]:nth-of-type(2) { text-align:right;\n}\r\n/************************************** */\n.w_fence .extra[data-v-76fdf33c] { margin-top:2rem;\n}\n.w_fence .extra .row .col[data-v-76fdf33c]:nth-child(1) { margin-right:2rem;\n}\n.w_fence .extra .row .col h6[data-v-76fdf33c] { border-bottom:2px solid #707070; margin-bottom:.7rem; padding-bottom:.5rem;\n}\n.w_fence .extra .row .col h6 b[data-v-76fdf33c] { color:#0094EA;\n}\n.w_fence .extra .row .col:nth-child(1) .desc[data-v-76fdf33c] { border:1px solid #D6D6D6; padding:1rem; min-height:calc(3vw + 5rem);\n}\n.w_fence .extra .row .col .btn[data-v-76fdf33c] { font-size:.85rem; padding:.3rem;\n}\r\n\r\n", ""]);
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
                                    _vm._v(_vm._s(_vm.reply.er_dlvy_at)),
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
                        _c("div", { staticClass: "top_border" }),
                        _vm._v(" "),
                        _c(
                          "b-container",
                          { staticClass: "pa_list frm_st" },
                          [
                            _c(
                              "b-row",
                              { staticClass: "lhead" },
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
                                    _vm._v(
                                      "\r\n                        주문 상품\r\n                    "
                                    ),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("b-col", [_vm._v("제조사")]),
                                _vm._v(" "),
                                _c("b-col", [_vm._v("판매가")]),
                                _vm._v(" "),
                                _c("b-col", [_vm._v("수량")]),
                                _vm._v(" "),
                                _c("b-col", [_vm._v("금액")]),
                                _vm._v(" "),
                                _c("b-col", [_vm._v("배송비")]),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _vm._l(
                              _vm.reply.collect.lists,
                              function (pa, pa_id) {
                                return _c(
                                  "b-row",
                                  { key: pa_id, staticClass: "lbody" },
                                  [
                                    _c("b-col", { staticClass: "m_hide" }, [
                                      _vm._v(
                                        _vm._s(
                                          pa[0]["pa_name"]
                                            ? "업체"
                                            : "포사이언스"
                                        )
                                      ),
                                      _c("br"),
                                      _vm._v("배송"),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      _vm._l(pa, function (item, i_item) {
                                        return _c(
                                          "b-row",
                                          {
                                            key: "" + pa_id + i_item,
                                            class: {
                                              option: item.type == "option",
                                            },
                                          },
                                          [
                                            item.type == "model"
                                              ? [
                                                  _c(
                                                    "b-col",
                                                    [
                                                      _c("b-form-checkbox", {
                                                        staticClass: "myCheck",
                                                        on: {
                                                          change: _vm.chkChange,
                                                        },
                                                        model: {
                                                          value:
                                                            item.em_check_opt,
                                                          callback: function (
                                                            $$v
                                                          ) {
                                                            _vm.$set(
                                                              item,
                                                              "em_check_opt",
                                                              $$v
                                                            )
                                                          },
                                                          expression:
                                                            "item.em_check_opt",
                                                        },
                                                      }),
                                                      _vm._v(" "),
                                                      _c("img", {
                                                        attrs: {
                                                          src: item.img,
                                                        },
                                                      }),
                                                    ],
                                                    1
                                                  ),
                                                  _vm._v(" "),
                                                  _c("b-col", [
                                                    _c("p", [
                                                      _vm._v(
                                                        _vm._s(item.gd_name)
                                                      ),
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("p", [
                                                      _vm._v(
                                                        "모델명:" +
                                                          _vm._s(item.gm_code) +
                                                          " / Cat.No.:" +
                                                          _vm._s(item.gm_catno)
                                                      ),
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("p", [
                                                      _vm._v(
                                                        "제품명:" +
                                                          _vm._s(item.gm_name) +
                                                          " / 사양:" +
                                                          _vm._s(item.gm_spec)
                                                      ),
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("p", [
                                                      _vm._v(
                                                        "판매단위:" +
                                                          _vm._s(item.gm_unit)
                                                      ),
                                                    ]),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("b-col", [
                                                    _vm._v(
                                                      _vm._s(item.mk_name)
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("b-col", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm._f("comma")(
                                                          item.price
                                                        )
                                                      ) + " 원"
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("b-col", [
                                                    _vm._v(
                                                      _vm._s(item.ea) + " 개"
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("b-col", [
                                                    _c("div", [
                                                      _vm._v(
                                                        "\r\n                                        " +
                                                          _vm._s(
                                                            _vm._f("comma")(
                                                              item.price *
                                                                item.ea
                                                            )
                                                          ) +
                                                          " 원\r\n                                        "
                                                      ),
                                                      _c("br"),
                                                      _vm._v(" "),
                                                      _c("span", [
                                                        _vm._v(
                                                          "(" +
                                                            _vm._s(
                                                              _vm._f("comma")(
                                                                item.price *
                                                                  _vm.reply
                                                                    .estimate_req
                                                                    .user
                                                                    .mileage_mul *
                                                                  item.ea
                                                              )
                                                            ) +
                                                            "p 적립)"
                                                        ),
                                                      ]),
                                                    ]),
                                                  ]),
                                                ]
                                              : item.type == "option"
                                              ? [
                                                  _c("b-col", [
                                                    _vm._v("추가 옵션"),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("b-col", [
                                                    _vm._v(
                                                      _vm._s(item.goc_name)
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("b-col"),
                                                  _vm._v(" "),
                                                  _c("b-col", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm._f("comma")(
                                                          item.price
                                                        )
                                                      ) + " 원"
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("b-col", [
                                                    _vm._v(
                                                      _vm._s(item.ea) + " 개"
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("b-col", [
                                                    _c("div", [
                                                      _vm._v(
                                                        "\r\n                                        " +
                                                          _vm._s(
                                                            _vm._f("comma")(
                                                              item.price *
                                                                item.ea
                                                            )
                                                          ) +
                                                          " 원\r\n                                        "
                                                      ),
                                                      _c("br"),
                                                      _vm._v(" "),
                                                      _c("span", [
                                                        _vm._v(
                                                          "(" +
                                                            _vm._s(
                                                              _vm._f("comma")(
                                                                item.price *
                                                                  _vm.reply
                                                                    .estimate_req
                                                                    .user
                                                                    .mileage_mul *
                                                                  item.ea
                                                              )
                                                            ) +
                                                            "p 적립)"
                                                        ),
                                                      ]),
                                                    ]),
                                                  ]),
                                                ]
                                              : _vm._e(),
                                          ],
                                          2
                                        )
                                      }),
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      [
                                        pa[0]["pa_type"] == "AIR"
                                          ? [_vm._v("항공운임료")]
                                          : [_vm._v("배송비")],
                                        _vm._v(" "),
                                        _c("br"),
                                        _vm._v(
                                          "\r\n                        " +
                                            _vm._s(
                                              _vm._f("comma")(
                                                pa[0].pa_dlvy_p_add_vat
                                              )
                                            ) +
                                            " 원\r\n                    "
                                        ),
                                      ],
                                      2
                                    ),
                                  ],
                                  1
                                )
                              }
                            ),
                            _vm._v(" "),
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
                                        _vm._f("comma")(
                                          _vm.gd_price + _vm.surtax
                                        )
                                      )
                                    ),
                                  ]),
                                  _vm._v(" 원"),
                                ]),
                                _vm._v(" "),
                                _c("b-col", [_vm._v("배송료")]),
                                _vm._v(" "),
                                _c("b-col", [
                                  _c("b", [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("comma")(
                                          _vm.dlvy_4s +
                                            _vm.air_price +
                                            _vm.dlvy_other
                                        )
                                      )
                                    ),
                                  ]),
                                  _vm._v(" 원"),
                                ]),
                                _vm._v(" "),
                                _c("b-col", [_vm._v("결제 예정 금액")]),
                                _vm._v(" "),
                                _c("b-col", [
                                  _c("b", [
                                    _vm._v(
                                      _vm._s(_vm._f("comma")(_vm.all_price))
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
                              {
                                staticClass: "total_sub",
                                attrs: { id: "total_sub" },
                              },
                              [
                                _c("b-col", [
                                  _c(
                                    "div",
                                    [
                                      _c("b-col", [_vm._v("상품가")]),
                                      _vm._v(" "),
                                      _c("b-col", [
                                        _vm._v(
                                          _vm._s(
                                            _vm._f("comma")(_vm.gd_price)
                                          ) + " 원"
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
                                      _vm._v(" "),
                                      _c("b-col", [
                                        _vm._v(
                                          _vm._s(_vm._f("comma")(_vm.surtax)) +
                                            " 원"
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
                                      _vm._v(" "),
                                      _c("b-col", [
                                        _vm._v(
                                          _vm._s(_vm._f("comma")(_vm.dlvy_4s)) +
                                            " 원"
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
                                      _vm._v(" "),
                                      _c("b-col", [
                                        _vm._v(
                                          _vm._s(
                                            _vm._f("comma")(_vm.dlvy_other)
                                          ) + " 원"
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
                                      _vm._v(" "),
                                      _c("b-col", [
                                        _vm._v(
                                          _vm._s(
                                            _vm._f("comma")(_vm.sum_mileage)
                                          ) + " 원"
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
                          2
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