(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_admin_shop_order_Edit_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/http */ "./resources/js/api/http.js");
/* harmony import */ var vue_daum_postcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-daum-postcode */ "./node_modules/vue-daum-postcode/dist/index.js");
/* harmony import */ var vue_daum_postcode__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_daum_postcode__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var dt = new Date();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'edit',
  components: {
    VueDaumPostcode: vue_daum_postcode__WEBPACK_IMPORTED_MODULE_1__.VueDaumPostcode,
    'Modal': function Modal() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_Modal_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/Modal.vue */ "./resources/js/views/_common/Modal.vue"));
    },
    'EaInput': function EaInput() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_admin_shop_order__comp_EaInput_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/admin/shop/order/_comp/EaInput.vue */ "./resources/js/views/admin/shop/order/_comp/EaInput.vue"));
    }
  },
  data: function data() {
    return {
      isModalViewed: false,
      modalType: '',
      focusInfo: {
        od_receiver: false,
        od_receiver_hp: false,
        adm_memo: false
      },
      od: {
        order_extra_info: {},
        mng: {},
        user: {},
        order_purchase_at: [],
        order_pg: {}
      },
      dlvy_info: {
        company: '한진택배',
        number: ''
      },
      document_type: '',
      mng_on: [],
      order_config: {
        pay_method: []
      }
    };
  },
  computed: _objectSpread({
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
      var rst = 0;
      this.od.order_purchase_at.forEach(function (el) {
        if (el.odpa_pa_id == 0) rst = el.odpa_dlvy_p_add_vat;
      });
      return rst;
    },
    dlvy_other: function dlvy_other() {
      return Object.values(this.od.order_purchase_at).reduce(function (acc, el) {
        return acc + (el.odpa_pa_name != '' ? el.odpa_dlvy_p_add_vat : 0);
      }, 0);
    },
    sum_mileage: function sum_mileage() {
      return Math.round(this.od.od_gd_price * this.od.user.mileage_mul);
    },
    sum_dc: function sum_dc() {
      return Object.values(this.od.order_purchase_at).reduce(function (acc, el) {
        return acc + Object.values(el.order_model).reduce(function (acc02, el02) {
          return acc02 + el02.odm_price_coupon_dc;
        }, 0);
      }, 0);
    }
  }, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapGetters)({
    user: 'auth/user'
  })),
  filters: {
    sale_env: function sale_env(str) {
      var rst = '';
      switch (str) {
        case 'P':
          rst = 'PC';
          break;
        case 'M':
          rst = '모바일';
          break;
        case 'A':
          rst = '어플';
          break;
        default:
          rst = 'PC';
          break;
      }
      return rst;
    },
    group: function group(v) {
      var rst = '';
      switch (v) {
        case '1':
          rst = '일반회원';
          break;
        case '2':
          rst = '특별회원';
          break;
        case '3':
          rst = '미수회원';
          break;
        case '4':
          rst = '후불회원';
          break;
      }
      return rst;
    }
  },
  directives: {
    focus: {
      inserted: function inserted(el) {
        el.focus();
      }
    }
  },
  methods: {
    edit: function edit() {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var res;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/admin/shop/order/".concat(_this.$route.params.od_id, "/edit"));
            case 3:
              res = _context.sent;
              if (res && res.status === 200) {
                _this.od = res.data.od;
                _this.order_config = res.data.order_config;
                _this.mng_on = res.data.mng_on;
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
        }, _callee, null, [[0, 7]]);
      }))();
    },
    update: function update(type) {
      var _arguments = arguments,
        _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var mode, i, j, k, res;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              mode = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : null;
              _context2.prev = 1;
              _this2.od = Object.assign({},
              // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
              _this2.od,
              // 수정하려는 객체
              {
                _method: 'PATCH',
                type: type
              } // 삽입하려는 내용
              );
              if (!(type == 'od_mng')) {
                _context2.next = 7;
                break;
              }
              if (mode !== 'other') {
                _this2.od.od_mng = Auth.user().id;
                _this2.od.mng = Auth.user();
              }
              _context2.next = 30;
              break;
            case 7:
              if (!(type == 'dlvy')) {
                _context2.next = 29;
                break;
              }
              if (mode == 'all') {
                _this2.od.order_purchase_at.forEach(function (opa) {
                  opa.order_model.forEach(function (odm) {
                    if (odm.dlvy_chk == 'Y') {
                      odm.order_dlvy_info.splice(0);
                      odm.order_dlvy_info.push({
                        oddi_id: 0,
                        oddi_odm_id: odm.odm_id,
                        oddi_dlvy_com: _this2.dlvy_info.company,
                        oddi_dlvy_num: _this2.dlvy_info.number
                      });
                    }
                  });
                });
                _this2.od.type = 'dlvy_all';
              }

              // forEach로 하면 return으로 함수 탈출이 안된다
              i = 0;
            case 10:
              if (!(i < _this2.od.order_purchase_at.length)) {
                _context2.next = 27;
                break;
              }
              j = 0;
            case 12:
              if (!(j < _this2.od.order_purchase_at[i].order_model.length)) {
                _context2.next = 24;
                break;
              }
              k = 0;
            case 14:
              if (!(k < _this2.od.order_purchase_at[i].order_model[j].order_dlvy_info.length)) {
                _context2.next = 21;
                break;
              }
              if (!(_this2.od.order_purchase_at[i].order_model[j].dlvy_chk == 'Y' && (isEmpty(_this2.od.order_purchase_at[i].order_model[j].order_dlvy_info[k].oddi_dlvy_com) || isEmpty(_this2.od.order_purchase_at[i].order_model[j].order_dlvy_info[k].oddi_dlvy_num)))) {
                _context2.next = 18;
                break;
              }
              Notify.modal('배송정보를 모두 입력하세요.', 'danger');
              return _context2.abrupt("return", false);
            case 18:
              k++;
              _context2.next = 14;
              break;
            case 21:
              j++;
              _context2.next = 12;
              break;
            case 24:
              i++;
              _context2.next = 10;
              break;
            case 27:
              _context2.next = 30;
              break;
            case 29:
              if (type == 'arrival') {
                _this2.od.order_purchase_at.forEach(function (opa) {
                  opa.order_model.forEach(function (odm) {
                    if (odm.dlvy_chk == 'Y') if (odm.order_dlvy_info.length == 0) odm.order_dlvy_info.push({
                      oddi_odm_id: odm.odm_id,
                      oddi_arrival_date: true
                    });else {
                      odm.order_dlvy_info.forEach(function (dlvy) {
                        dlvy.oddi_arrival_date = true;
                      });
                    }
                  });
                });
              } else if (type == 'dlvy_del') {
                _this2.od.order_purchase_at.forEach(function (opa) {
                  opa.order_model.forEach(function (odm) {
                    if (odm.dlvy_chk == 'Y') odm.order_dlvy_info.splice(0);
                  });
                });
              }
            case 30:
              _context2.next = 32;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/admin/shop/order/".concat(_this2.$route.params.od_id), _this2.od);
            case 32:
              res = _context2.sent;
              if (res && res.status === 200 && res.data.message === 'success') {
                if (type == 'od_mng') {
                  Notify.toast('success', '담당 배정 완료');
                  if (mode == 'other') {
                    _this2.edit();
                    _this2.isModalViewed = false;
                  }
                } else if (type == 'od_step') {
                  Notify.toast('success', '주문 처리 단계 수정');
                } else if (type == 'odm_ea') {
                  Notify.toast('success', '주문 상품 정보 수정');
                  _this2.$router.go();
                } else if (type == 'addr') {
                  Notify.toast('success', '상품 수령 정보 수정');
                  _this2.$router.go();
                } else if (type == 'dlvy') {
                  _this2.$root.$emit('bv::toggle::collapse', "dlvy_info_box_".concat(mode));
                  Notify.toast('success', '배송 정보 등록');
                  _this2.edit();
                  _this2.offAllCheck();
                } else if (type == 'arrival') {
                  _this2.$root.$emit('bv::toggle::collapse', "dlvy_info_box_".concat(mode));
                  Notify.toast('success', '배송 완료 등록');
                  _this2.offAllCheck();
                } else if (type == 'dlvy_del') {
                  _this2.$root.$emit('bv::toggle::collapse', "dlvy_info_box_".concat(mode));
                  Notify.toast('success', '배송 정보 삭제 완료');
                  _this2.offAllCheck();
                } else if (type == 'pay') {
                  Notify.toast('success', '결제정보 수정');
                } else {
                  Notify.toast('success', '수정');
                }
                _this2.$delete(_this2.od, '_method');
              } else Notify.toast('warning', '수정 실패');
              _context2.next = 40;
              break;
            case 36:
              _context2.prev = 36;
              _context2.t0 = _context2["catch"](1);
              Notify.consolePrint(_context2.t0);
              Notify.toast('warning', _context2.t0.response);
            case 40:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 36]]);
      }))();
    },
    print: function print() {
      var _this3 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this3.$htmlToPaper('print_area', {
                styles: ['https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css', '/css/fontawesome_svg.css', '/css/adm_shop_order_edit.css?ver=2.0']
              });
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    estimateExcel: function estimateExcel() {
      var _this4 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var res;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/admin/shop/order/exportEstimateExcel", _this4.od, {
                responseType: 'blob'
              });
            case 2:
              res = _context4.sent;
              _this4.orderDocumentDown(res, "".concat(_this4.od.od_no, "_Estimate.xlsx"));
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    estimatePdf: function estimatePdf() {
      var _this5 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var res;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/admin/shop/order/exportEstimatePdf", _this5.od, {
                responseType: 'blob'
              });
            case 2:
              res = _context5.sent;
              _this5.orderDocumentDown(res, "".concat(_this5.od.od_no, "_Estimate.pdf"));
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    },
    transactionExcel: function transactionExcel() {
      var _this6 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var res;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/admin/shop/order/exportTransactionExcel", _this6.od, {
                responseType: 'blob'
              });
            case 2:
              res = _context6.sent;
              _this6.orderDocumentDown(res, "".concat(_this6.od.od_no, "_Statement.xlsx"));
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    },
    transactionPdf: function transactionPdf() {
      var _arguments2 = arguments,
        _this7 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var type, query, res;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              type = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : null;
              query = '';
              if (type == 'send') {
                query = "trans_date=".concat(_this7.od.trans_date, "&trans_receive=").concat(_this7.od.trans_receive, "&trans_email=").concat(_this7.od.trans_email, "&trans_mng_email=").concat(_this7.od.mng.email);
                _this7.isModalViewed = false;
              }
              _context7.next = 5;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/admin/shop/order/exportTransactionPdf?".concat(query), _this7.od, {
                responseType: 'blob'
              });
            case 5:
              res = _context7.sent;
              if (res && res.status === 200) {
                if (type == 'send') Notify.toast('success', '발송 완료');else {
                  _this7.orderDocumentDown(res, "".concat(_this7.od.od_no, "_Statement.pdf"));
                  Notify.toast('success', '다운 완료');
                }
              } else Notify.toast('warning', '실패');
            case 7:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }))();
    },
    shippingListExcel: function shippingListExcel() {
      var _this8 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var res;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              if (!_this8.didCheck()) {
                _context8.next = 5;
                break;
              }
              _context8.next = 3;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/admin/shop/order/exportShippingListExcel", _this8.od, {
                responseType: 'blob'
              });
            case 3:
              res = _context8.sent;
              _this8.orderDocumentDown(res, "".concat(_this8.od.od_no, "_ShippingList.xlsx"));
            case 5:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }))();
    },
    sendTran: function sendTran() {
      this.isModalViewed = !this.isModalViewed;
      this.modalType = 'sendTransaction';
    },
    orderDocumentDown: function orderDocumentDown(res, fileNm) {
      var fileUrl = window.URL.createObjectURL(new Blob([res.data]));
      var fileLink = document.createElement('a');
      fileLink.href = fileUrl;
      fileLink.setAttribute('download', fileNm);
      document.body.appendChild(fileLink);
      fileLink.click();
    },
    ledger: function ledger() {
      var _this9 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var res;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _this9.od.data_type = "ORD";
              _context9.next = 4;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/admin/ledger", _this9.od);
            case 4:
              res = _context9.sent;
              if (res && res.status === 200) {
                if (res.data.message == 'Success') _this9.$router.push({
                  name: 'adm_ledger'
                });else if (res.data.message == 'Existed') Notify.modal('이미 등록된 주문입니다.', 'warning');
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
        }, _callee9, null, [[0, 8]]);
      }))();
    },
    onPostcodeSlt: function onPostcodeSlt(result) {
      this.$set(this.od, 'od_zip', result.zonecode);
      var od_addr1 = result.roadAddress;
      od_addr1 += result.buildingName ? " (".concat(result.buildingName, ")") : '';
      this.$set(this.od, 'od_addr1', od_addr1);
      this.modalType = 'postDetail';
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
    didCheck: function didCheck() {
      var didCheck = false;
      var _iterator = _createForOfIteratorHelper(this.od.order_purchase_at),
        _step;
      try {
        opa_loop: for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var opa = _step.value;
          var _iterator2 = _createForOfIteratorHelper(opa.order_model),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var odm = _step2.value;
              if (odm.dlvy_chk == 'Y') {
                didCheck = true;
                break opa_loop;
              }
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
      if (!didCheck) {
        Notify.toast('warning', '모델을 먼저 체크하세요.');
        return false;
      } else return true;
    },
    offAllCheck: function offAllCheck() {
      var _iterator3 = _createForOfIteratorHelper(this.od.order_purchase_at),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var opa = _step3.value;
          opa.indeterminate = false;
          opa.dlvy_all_chk = false;
          var _iterator4 = _createForOfIteratorHelper(opa.order_model),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var odm = _step4.value;
              odm.dlvy_chk = 'N';
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
    },
    DlvyAllIn: function DlvyAllIn(odm_id) {
      var _iterator5 = _createForOfIteratorHelper(this.od.order_purchase_at),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var opa = _step5.value;
          var _iterator6 = _createForOfIteratorHelper(opa.order_model),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var odm = _step6.value;
              if (odm.odm_id !== odm_id) odm.dlvy_all_in = false;
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
    getHref: function getHref(com, num) {
      return this.order_config.delivery_com[com].replace('[송장번호]', num);
    },
    format_date: function format_date(e) {
      return this.formatDate(e);
    },
    change_dlvy_info: function change_dlvy_info(i) {
      this.od.od_zip = this.od.user.user_addr[i].ua_zip;
      this.od.od_addr1 = this.od.user.user_addr[i].ua_addr1;
      this.od.od_addr2 = this.od.user.user_addr[i].ua_addr2;
      this.od.od_receiver_hp = this.od.user.user_addr[i].ua_hp;
    },
    getReceipt: function getReceipt() {
      var tid = this.od.order_pg.pg_tid;
      var url = "https://iniweb.inicis.com/receipt/iniReceipt.jsp?noTid=".concat(tid);
      if (this.od.order_pg.pg_pay_type.startsWith('psys')) url = this.order_config.url_receipt + '?tid=' + this.base64_encode(tid);
      var regExp = /^https?:\/\//;
      if (regExp.test(tid)) url = tid;
      this.openWinPop(url, 468, 750);
    },
    base64_encode: function base64_encode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
    },
    toEstimate: function toEstimate() {
      var _this10 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var rst;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/admin/shop/estimate/storeFromOrder", _this10.od);
            case 2:
              rst = _context10.sent;
              if (rst && rst.status === 200) {
                Notify.toast('success', '복사 완료');
                _this10.openWinPop("/admin/shop/estimate/reply/".concat(rst.data), 1300, 900);
                // this.$router.push({ name: 'adm_estimate_show_reply', params:{er_id:rst.data} });
              }
            case 4:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }))();
    },
    insert_dlvy: function insert_dlvy(order_dlvy_info, odm_id) {
      order_dlvy_info.push({
        oddi_id: 0,
        oddi_odm_id: odm_id,
        oddi_dlvy_com: '한진택배',
        oddi_dlvy_num: ''
      });
    },
    remove_dlvy: function remove_dlvy(order_dlvy_info, i) {
      if (order_dlvy_info[i].oddi_id > 0) order_dlvy_info[i].oddi_dlvy_created_at = 'delete';else order_dlvy_info.splice(i, 1);
    },
    collapseShow: function collapseShow(order_dlvy_info, odm_id) {
      if (order_dlvy_info.length == 0) this.insert_dlvy(order_dlvy_info, odm_id);else if (order_dlvy_info.length == 1 && isEmpty(order_dlvy_info[0].oddi_dlvy_com) && isEmpty(order_dlvy_info[0].oddi_dlvy_num)) {
        order_dlvy_info[0].oddi_dlvy_com = '한진택배';
      }
      var _iterator7 = _createForOfIteratorHelper(this.od.order_purchase_at),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var opa = _step7.value;
          //  모든 제품을 확인해서 내가 누를 품목이 아니라면 체크 해제
          opa.dlvy_all_chk = false;
          var _iterator8 = _createForOfIteratorHelper(opa.order_model),
            _step8;
          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var odm02 = _step8.value;
              if (odm_id == odm02.odm_id) odm02.dlvy_chk = 'Y';else odm02.dlvy_chk = 'N';
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
    collapseHide: function collapseHide(order_dlvy_info) {
      for (var i in order_dlvy_info) {
        if (isEmpty(order_dlvy_info[i].oddi_dlvy_num) && isEmpty(order_dlvy_info[i].oddi_arrival_date)) order_dlvy_info.splice(i, 1);
      }
    },
    dlvy_info_all_collapse: function dlvy_info_all_collapse() {
      if (this.didCheck()) this.$root.$emit('bv::toggle::collapse', "dlvy_info_box_all");
    },
    destroy: function destroy() {
      var _this11 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var rst, frm, res;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return Notify.confirm('주문을 삭제', 'danger');
            case 2:
              rst = _context11.sent;
              if (!rst) {
                _context11.next = 18;
                break;
              }
              _context11.prev = 4;
              frm = new FormData();
              frm.append("_method", 'DELETE');
              _context11.next = 9;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/admin/shop/order/".concat(_this11.$route.params.od_id), frm);
            case 9:
              res = _context11.sent;
              if (res && res.status === 200) {
                Notify.toast('success', '주문 삭제');
                _this11.$router.push({
                  name: 'adm_order_index'
                });
              }
              _context11.next = 18;
              break;
            case 13:
              _context11.prev = 13;
              _context11.t0 = _context11["catch"](4);
              Notify.consolePrint(_context11.t0);
              Notify.toast('danger', '삭제 실패');
              Notify.toast('danger', _context11.t0.response.data.message);
            case 18:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[4, 13]]);
      }))();
    }
  },
  mounted: function mounted() {
    this.edit();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    attrs: {
      id: "print_area"
    }
  }, [_c("div", {
    staticClass: "p_wrap"
  }, [_c("h3", {
    staticClass: "p_tit"
  }, [_vm._v("\r\n            주문 상세\r\n            "), [39, 130].includes(_vm.user.id) ? _c("b-form-select", {
    style: {
      display: "none",
      width: "1px",
      height: "1px",
      lineHeight: 1,
      padding: 0,
      border: "1px solid #000",
      borderRadius: 0
    },
    on: {
      change: function change($event) {
        return _vm.update("od_sale_env");
      }
    },
    model: {
      value: _vm.od.od_sale_env,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "od_sale_env", $$v);
      },
      expression: "od.od_sale_env"
    }
  }, [_c("b-form-select-option", {
    attrs: {
      value: "P"
    }
  }, [_vm._v("PC")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "M"
    }
  }, [_vm._v("MOBILE")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "A"
    }
  }, [_vm._v("APP")])], 1) : _vm._e()], 1), _vm._v(" "), _vm.od.od_mng > 0 && !_vm.isEmpty(_vm.od.mng) ? _c("div", {
    staticClass: "print_mng_nm"
  }, [_vm._v(_vm._s(_vm.od.mng.name))]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "act_ctrl"
  }, [_c("b-row", [_c("b-col", {
    staticClass: "def_info"
  }, [_c("span", [_vm._v("No.")]), _c("b", [_vm._v(_vm._s(_vm.od.od_id))]), _vm._v(" "), _c("span", [_vm._v("주문번호")]), _vm._v(" "), _c("b", [_vm._v(_vm._s(_vm.od.od_no))]), _vm._v(" "), _c("span", [_vm._v("주문날짜")]), _vm._v(" "), _c("b", [_vm._v(_vm._s(_vm._f("formatDate_MM_DD_HH:mm")(_vm.od.created_at)))]), _vm._v(" "), _c("span", [_vm._v("주문환경")]), _vm._v(" "), _c("b", [_vm._v(_vm._s(_vm._f("sale_env")(_vm.od.od_sale_env)))]), _vm._v(" "), _c("span", [_vm._v("주문유형")]), _vm._v(" "), _vm.order_config.type ? _c("b", [_vm._v(_vm._s(_vm.order_config.type[_vm.od.od_type]))]) : _vm._e()]), _vm._v(" "), _c("b-col", {
    staticClass: "btn_area print_hide_flex"
  }, [_vm.user.is_super ? _c("b-button", {
    staticClass: "red sm",
    on: {
      click: _vm.destroy
    }
  }, [_c("b-icon", {
    attrs: {
      icon: "trash-fill"
    }
  }), _c("span", {
    staticClass: "sm_ib_h"
  }, [_vm._v(" 삭제")])], 1) : _vm._e(), _vm._v(" "), _vm.od.od_er_id ? _c("b-button", {
    staticClass: "plum sm print_hide_inline_block",
    on: {
      click: function click($event) {
        return _vm.openWinPop("/admin/shop/estimate/reply/".concat(_vm.od.od_er_id));
      }
    }
  }, [_c("b-icon-box-arrow-up-right"), _vm._v(" 견적서")], 1) : _vm._e(), _vm._v(" "), _c("b-button", {
    staticClass: "white sm",
    attrs: {
      to: {
        name: "adm_order_index"
      }
    }
  }, [_c("b-icon-list"), _c("span", {
    staticClass: "sm_ib_h"
  }, [_vm._v(" 목록")])], 1), _vm._v(" "), _vm.od.od_mng < 1 ? _c("b-button", {
    staticClass: "sky sm",
    on: {
      click: function click($event) {
        return _vm.update("od_mng");
      }
    }
  }, [_vm._v("담당")]) : _vm.isEmpty(_vm.od.mng) ? _c("b-button", {
    staticClass: "red sm",
    on: {
      click: function click($event) {
        ;
        _vm.isModalViewed = !_vm.isModalViewed, _vm.modalType = "changeMng";
      }
    }
  }, [_vm._v("담당 없음")]) : _c("b-button", {
    staticClass: "sky sm",
    on: {
      click: function click($event) {
        ;
        _vm.isModalViewed = !_vm.isModalViewed, _vm.modalType = "changeMng";
      }
    }
  }, [_vm._v(_vm._s(_vm.od.mng.name))]), _vm._v(" "), _c("b-button", {
    staticClass: "gray sm",
    on: {
      click: _vm.print
    }
  }, [_c("b-icon-printer"), _c("span", {
    staticClass: "sm_ib_h"
  }, [_vm._v(" 인쇄")])], 1), _vm._v(" "), _vm.od.od_mng ? _c("b-dropdown", {
    attrs: {
      size: "sm",
      variant: "outline-dark"
    },
    scopedSlots: _vm._u([{
      key: "button-content",
      fn: function fn() {
        return [_vm._v("파일 "), _c("span", {
          staticClass: "sm_ib_h"
        }, [_vm._v("다운")])];
      },
      proxy: true
    }], null, false, 1831102347)
  }, [_vm._v(" "), _c("b-dropdown-item-button", {
    attrs: {
      variant: "success"
    },
    on: {
      click: _vm.estimateExcel
    }
  }, [_vm._v("견적서 "), _c("b-badge", [_vm._v("EXCEL")])], 1), _vm._v(" "), _c("b-dropdown-item-button", {
    attrs: {
      variant: "warning"
    },
    on: {
      click: _vm.estimatePdf
    }
  }, [_vm._v("견적서 "), _c("b-badge", [_vm._v("PDF")])], 1), _vm._v(" "), _c("b-dropdown-divider"), _vm._v(" "), _c("b-dropdown-item-button", {
    attrs: {
      variant: "success"
    },
    on: {
      click: _vm.transactionExcel
    }
  }, [_vm._v("거래명세서 "), _c("b-badge", [_vm._v("EXCEL")])], 1), _vm._v(" "), _c("b-dropdown-item-button", {
    attrs: {
      variant: "warning"
    },
    on: {
      click: _vm.transactionPdf
    }
  }, [_vm._v("거래명세서 "), _c("b-badge", [_vm._v("PDF")])], 1), _vm._v(" "), _c("b-dropdown-item-button", {
    attrs: {
      variant: "danger"
    },
    on: {
      click: _vm.sendTran
    }
  }, [_vm._v("거래명세서 발송 "), _c("b-badge", [_vm._v("PDF")])], 1), _vm._v(" "), _c("b-dropdown-item-button", {
    attrs: {
      variant: "primary"
    },
    on: {
      click: _vm.shippingListExcel
    }
  }, [_vm._v("물품출고내역서 "), _c("b-badge", [_vm._v("EXCEL")])], 1)], 1) : _c("b-button", {
    staticClass: "gray sm"
  }, [_vm._v("담당 등록 후...")]), _vm._v(" "), _c("b-input-group", {
    attrs: {
      size: "sm"
    }
  }, [_c("b-form-select", {
    staticClass: "sm_ib_h",
    model: {
      value: _vm.od.od_step,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "od_step", $$v);
      },
      expression: "od.od_step"
    }
  }, [_c("b-form-select-option", {
    attrs: {
      value: null,
      disabled: ""
    }
  }, [_vm._v("◖처리 상태◗")]), _vm._v(" "), _vm._l(_vm.order_config.step, function (v, k) {
    return _c("b-form-select-option", {
      key: k,
      attrs: {
        value: k
      }
    }, [_vm._v(_vm._s(v.name))]);
  })], 2), _vm._v(" "), _c("b-form-select", {
    staticClass: "sm_ib_v",
    model: {
      value: _vm.od.od_step,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "od_step", $$v);
      },
      expression: "od.od_step"
    }
  }, [_c("b-form-select-option", {
    attrs: {
      value: null,
      disabled: ""
    }
  }, [_vm._v("상태")]), _vm._v(" "), _vm._l(_vm.order_config.step, function (v, k) {
    return _c("b-form-select-option", {
      key: k,
      attrs: {
        value: k
      }
    }, [_vm._v(_vm._s(v.sm_name))]);
  })], 2), _vm._v(" "), _c("b-input-group-append", [_c("b-button", {
    staticClass: "d_gray sm",
    on: {
      click: function click($event) {
        return _vm.update("od_step");
      }
    }
  }, [_vm._v("변경")])], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "box orderer"
  }, [_c("b-row", {
    attrs: {
      tag: "h5"
    }
  }, [_c("b-col", {
    attrs: {
      tag: "b"
    }
  }, [_vm._v("주문자정보")])], 1), _vm._v(" "), _c("b-row", {
    staticClass: "label_st"
  }, [_c("b-col", {
    staticClass: "lb"
  }, [_vm._v("주문자")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm.od.created_id ? _c("b-link", {
    attrs: {
      to: {
        name: "adm_user_edit",
        params: {
          id: _vm.od.created_id
        }
      }
    }
  }, [_vm._v(_vm._s(_vm.od.od_orderer) + " - "), _c("span", {
    staticClass: "u_group"
  }, [_vm._v(_vm._s(_vm._f("group")(_vm.od.user.group)))])]) : [_vm._v(_vm._s(_vm.od.od_orderer))]], 2), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("전화번호")]), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.od_orderer_hp))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("이메일")]), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.od_orderer_email))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("직장/학교")]), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.od_company))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("부서/학과/연구실")]), _c("b-col", {
    staticClass: "dt wd54"
  }, [_vm._v(_vm._s(_vm.od.od_part))])], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "box"
  }, [_c("b-row", {
    attrs: {
      tag: "h5"
    }
  }, [_c("b-col", {
    attrs: {
      tag: "b"
    }
  }, [_vm._v("주문 상품")]), _vm._v(" "), _c("b-col", {
    staticClass: "text-right print_hide"
  }, [_vm.od.created_id ? _c("b-button", {
    staticClass: "sm green",
    on: {
      click: _vm.toEstimate
    }
  }, [_vm._v("모든상품 임의견적 복사")]) : _vm._e(), _vm._v(" "), _c("b-button", {
    staticClass: "sm teal",
    on: {
      click: function click($event) {
        return _vm.update("odm_ea");
      }
    }
  }, [_vm._v("상품정보 수정")])], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "top_border"
  }), _vm._v(" "), _vm._l(_vm.od.order_purchase_at, function (pa, pa_i) {
    return _c("b-row", {
      key: "pa_".concat(pa_i),
      staticClass: "goods"
    }, [_c("b-col", {
      staticClass: "pa_tit print_hide_flex"
    }, [pa.odpa_pa_id ? _c("b", [_vm._v("업체"), _c("br"), _vm._v("직배송")]) : _c("b", [_vm._v("포사이언스"), _c("br"), _vm._v("배송")])]), _vm._v(" "), _c("b-col", {
      staticClass: "gd_con"
    }, [_c("b-row", [_c("b-col", {
      staticClass: "print_hide"
    }, [_c("b-form-checkbox", {
      staticClass: "myCheck allCheck",
      attrs: {
        indeterminate: pa.indeterminate
      },
      on: {
        change: function change($event) {
          return _vm.toggleAll(pa);
        }
      },
      model: {
        value: pa.dlvy_all_chk,
        callback: function callback($$v) {
          _vm.$set(pa, "dlvy_all_chk", $$v);
        },
        expression: "pa.dlvy_all_chk"
      }
    })], 1), _vm._v(" "), _c("b-col"), _vm._v(" "), _c("b-col", [_vm._v("주문 상품")]), _vm._v(" "), _c("b-col", [_vm._v("제조사")]), _vm._v(" "), _c("b-col", [_vm._v("판매가")]), _vm._v(" "), _c("b-col", [_vm._v("수량")]), _vm._v(" "), _c("b-col", [_vm._v("금액")]), _vm._v(" "), _c("b-col", {
      staticClass: "print_hide_flex dlvy_info",
      style: {
        paddingBottom: 0,
        justifyContent: "center"
      }
    }, [pa_i == 0 ? [_c("b-button", {
      staticClass: "white xm dlvy_info_box_switch",
      on: {
        click: _vm.dlvy_info_all_collapse
      }
    }, [_vm._v("배송일괄등록")]), _vm._v(" "), _c("b-collapse", {
      staticClass: "dlvy_info_box",
      attrs: {
        id: "dlvy_info_box_all",
        accordion: "group_dlvy"
      }
    }, [_c("b-card", {
      staticClass: "shadow"
    }, [_c("b-input-group", {
      attrs: {
        size: "sm"
      }
    }, [_c("b-input-group-prepend", [_c("b-form-select", {
      attrs: {
        size: "sm"
      },
      model: {
        value: _vm.dlvy_info.company,
        callback: function callback($$v) {
          _vm.$set(_vm.dlvy_info, "company", $$v);
        },
        expression: "dlvy_info.company"
      }
    }, _vm._l(_vm.order_config.delivery_com, function (v, k) {
      return _c("b-form-select-option", {
        key: k,
        attrs: {
          value: k
        }
      }, [_vm._v(_vm._s(k))]);
    }), 1)], 1), _vm._v(" "), _c("b-form-input", {
      model: {
        value: _vm.dlvy_info.number,
        callback: function callback($$v) {
          _vm.$set(_vm.dlvy_info, "number", $$v);
        },
        expression: "dlvy_info.number"
      }
    })], 1), _vm._v(" "), _c("b-row", {
      staticClass: "ctrl"
    }, [_c("b-col", [_c("b-button", {
      staticClass: "xm green",
      on: {
        click: function click($event) {
          return _vm.update("arrival", "all");
        }
      }
    }, [_vm._v("배송완료")])], 1), _vm._v(" "), _c("b-col", [_c("b-button", {
      staticClass: "xm",
      on: {
        click: function click($event) {
          return _vm.update("dlvy", "all");
        }
      }
    }, [_vm._v("등록")])], 1)], 1)], 1)], 1)] : _vm._e()], 2)], 1), _vm._v(" "), _vm._l(pa.order_model, function (odm, odm_i) {
      return _c("b-row", {
        key: "gd_".concat(odm_i),
        "class": {
          model: odm.odm_type == "MODEL",
          option: odm.odm_type == "OPTION",
          today: odm.today_pick_up
        }
      }, [_c("b-col", {
        staticClass: "align print_hide"
      }, [odm.odm_type == "MODEL" ? _c("b-form-checkbox", {
        staticClass: "myCheck",
        attrs: {
          value: "Y",
          "unchecked-value": "N"
        },
        on: {
          change: function change($event) {
            return _vm.changeSon(pa);
          }
        },
        model: {
          value: odm.dlvy_chk,
          callback: function callback($$v) {
            _vm.$set(odm, "dlvy_chk", $$v);
          },
          expression: "odm.dlvy_chk"
        }
      }) : _vm._e(), _vm._v(" "), _c("div", {
        staticClass: "signboard"
      }, [odm.today_pick_up ? _c("b", {
        staticClass: "neonText"
      }, [_vm._v("당일")]) : _vm._e()])], 1), _vm._v(" "), _c("b-col", {
        staticClass: "align"
      }, [odm.odm_type == "MODEL" ? _c("div", [odm.odm_gd_id > 0 ? _c("img", {
        attrs: {
          src: odm.img_thumb_src
        },
        on: {
          click: function click($event) {
            return _vm.openWinPop("/admin/shop/goods/".concat(odm.odm_gd_id, "/edit"), 1700, 900);
          }
        }
      }) : _c("img", {
        attrs: {
          src: odm.img_thumb_src
        }
      })]) : _c("b", [_vm._v("추가 옵션")])]), _vm._v(" "), _c("b-col", {
        staticClass: "desc",
        "class": {
          option: odm.odm_type == "OPTION"
        }
      }, [odm.odm_type == "MODEL" ? [_c("b", [_vm._v(_vm._s(odm.odm_gd_name))]), _vm._v(" "), _c("p", {
        staticClass: "gray_c hovertobtn"
      }, [_vm._v("\r\n                                    제품명: " + _vm._s(odm.odm_gm_name) + " / 모델명: " + _vm._s(odm.odm_gm_code) + "  \r\n                                    "), _c("font-awesome-icon", {
        staticClass: "btn_copy",
        attrs: {
          icon: "copy"
        },
        on: {
          click: function click($event) {
            return _vm.copyToClipboard("\uC81C\uD488\uBA85: ".concat(odm.odm_gm_name, " / \uBAA8\uB378\uBA85: ").concat(odm.odm_gm_code));
          }
        }
      }), _vm._v(" "), _c("br"), _vm._v("\r\n                                    Cat.No.: " + _vm._s(odm.odm_gm_catno) + " / 판매단위: " + _vm._s(odm.odm_gm_unit) + "   "), _c("br"), _vm._v("\r\n                                    사양: "), _c("span", {
        domProps: {
          innerHTML: _vm._s(_vm.nl2br(odm.odm_gm_spec))
        }
      })], 1)] : [_vm._v(_vm._s(odm.odm_gm_name) + ": " + _vm._s(odm.odm_gm_spec))]], 2), _vm._v(" "), _c("b-col", {
        staticClass: "align gray_c"
      }, [_vm._v(_vm._s(odm.odm_mk_name))]), _vm._v(" "), _c("b-col", {
        staticClass: "align end text-right"
      }, [_c("div", {
        staticClass: "price_area"
      }, [_vm._v("\r\n                                " + _vm._s(_vm._f("won")(_vm._f("comma")(odm.odm_price))) + "\r\n                                "), odm.odm_price_coupon_dc ? _c("div", {
        staticClass: "coupon_dc"
      }, [_vm._v("-" + _vm._s(_vm._f("won")(_vm._f("comma")(odm.odm_price_coupon_dc))))]) : _vm._e()])]), _vm._v(" "), _c("b-col", {
        staticClass: "align"
      }, [_c("div", {
        staticClass: "cube_box"
      }, [_c("div", {
        staticClass: "cube",
        "class": {
          show_bottom: odm.show_bottom
        }
      }, [_c("div", {
        staticClass: "piece front"
      }, [_vm._v(_vm._s(_vm._f("comma")(odm.odm_ea)))]), _vm._v(" "), _c("div", {
        staticClass: "piece bottom"
      }, [_c("EaInput", {
        model: {
          value: pa.order_model[odm_i],
          callback: function callback($$v) {
            _vm.$set(pa.order_model, odm_i, $$v);
          },
          expression: "pa.order_model[odm_i]"
        }
      })], 1)])])]), _vm._v(" "), _c("b-col", {
        staticClass: "align"
      }, [_c("b", {
        staticClass: "sum"
      }, [_vm._v("\r\n                                " + _vm._s(_vm._f("won")(_vm._f("comma")((odm.odm_price - odm.odm_price_coupon_dc) * odm.odm_ea))) + "\r\n                                "), pa.odpa_pa_type !== "AIR" && odm.odm_type === "MODEL" ? _c("b-form-checkbox", {
        staticClass: "print_hide",
        attrs: {
          button: ""
        },
        on: {
          change: function change($event) {
            return _vm.DlvyAllIn(odm.odm_id);
          }
        },
        model: {
          value: odm.dlvy_all_in,
          callback: function callback($$v) {
            _vm.$set(odm, "dlvy_all_in", $$v);
          },
          expression: "odm.dlvy_all_in"
        }
      }, [_vm._v("\r\n                                    배송비 포함\r\n                                ")]) : _vm._e()], 1)]), _vm._v(" "), _c("b-col", {
        staticClass: "align print_hide_flex dlvy_info"
      }, [odm.odm_type == "MODEL" ? [_vm._l(odm.order_dlvy_info, function (dlvy, i) {
        return [dlvy.oddi_dlvy_created_at !== "delete" ? _c("p", {
          key: "".concat(odm.odm_id, "_dlvy_info_btn_").concat(i)
        }, [!_vm.isEmpty(dlvy.oddi_receive_date) && dlvy.oddi_receive_date != "0000-00-00" ? _c("b-badge", {
          staticClass: "gray"
        }, [_vm._v("수취완료")]) : !_vm.isEmpty(dlvy.oddi_arrival_date) && dlvy.oddi_arrival_date != "0000-00-00" ? _c("b-badge", {
          staticClass: "green"
        }, [_vm._v("배송완료")]) : _vm._e(), _vm._v(" "), !_vm.isEmpty(dlvy.oddi_dlvy_com) && !_vm.isEmpty(dlvy.oddi_dlvy_num) ? _c("b-button", {
          staticClass: "teal xm",
          attrs: {
            href: _vm.getHref(dlvy.oddi_dlvy_com, dlvy.oddi_dlvy_num),
            target: "_blank"
          }
        }, [_vm._v("배송조회")]) : _vm._e()], 1) : _vm._e()];
      }), _vm._v(" "), _c("b-button", {
        directives: [{
          name: "b-toggle",
          rawName: "v-b-toggle",
          value: "dlvy_info_box_".concat(odm.odm_id),
          expression: "`dlvy_info_box_${odm.odm_id}`"
        }],
        staticClass: "white xm dlvy_info_box_switch"
      }, [_vm._v("배송정보")]), _vm._v(" "), _c("b-collapse", {
        staticClass: "dlvy_info_box",
        attrs: {
          id: "dlvy_info_box_".concat(odm.odm_id),
          accordion: "group_dlvy"
        },
        on: {
          show: function show($event) {
            return _vm.collapseShow(odm.order_dlvy_info, odm.odm_id);
          },
          hide: function hide($event) {
            return _vm.collapseHide(odm.order_dlvy_info);
          }
        }
      }, [_c("b-card", {
        staticClass: "shadow"
      }, [_vm._l(odm.order_dlvy_info, function (dlvy, dlvy_i) {
        return [dlvy.oddi_dlvy_created_at !== "delete" ? _c("b-input-group", {
          key: "dlvy_input_group_".concat(dlvy_i),
          attrs: {
            size: "sm"
          }
        }, [_c("b-input-group-prepend", [_c("b-form-select", {
          attrs: {
            size: "sm"
          },
          model: {
            value: dlvy.oddi_dlvy_com,
            callback: function callback($$v) {
              _vm.$set(dlvy, "oddi_dlvy_com", $$v);
            },
            expression: "dlvy.oddi_dlvy_com"
          }
        }, _vm._l(_vm.order_config.delivery_com, function (v, k) {
          return _c("b-form-select-option", {
            key: k,
            attrs: {
              value: k
            }
          }, [_vm._v(_vm._s(k))]);
        }), 1)], 1), _vm._v(" "), _c("b-form-input", {
          model: {
            value: dlvy.oddi_dlvy_num,
            callback: function callback($$v) {
              _vm.$set(dlvy, "oddi_dlvy_num", $$v);
            },
            expression: "dlvy.oddi_dlvy_num"
          }
        }), _vm._v(" "), _c("b-input-group-append", [dlvy_i === 0 ? _c("b-button", {
          attrs: {
            variant: "info"
          },
          on: {
            click: function click($event) {
              return _vm.insert_dlvy(odm.order_dlvy_info, odm.odm_id);
            }
          }
        }, [_c("b-icon-plus-circle-fill")], 1) : _c("b-button", {
          attrs: {
            variant: "danger"
          },
          on: {
            click: function click($event) {
              return _vm.remove_dlvy(odm.order_dlvy_info, dlvy_i);
            }
          }
        }, [_c("b-icon", {
          attrs: {
            icon: "dash-circle-fill"
          }
        })], 1)], 1)], 1) : _vm._e()];
      }), _vm._v(" "), _c("b-row", {
        staticClass: "ctrl"
      }, [_c("b-col", [_c("b-button", {
        staticClass: "xm green",
        on: {
          click: function click($event) {
            return _vm.update("arrival", odm.odm_id);
          }
        }
      }, [_vm._v("배송완료")])], 1), _vm._v(" "), _c("b-col", [_c("b-button", {
        staticClass: "xm plum",
        on: {
          click: function click($event) {
            return _vm.update("dlvy_del", odm.odm_id);
          }
        }
      }, [_vm._v("삭제")])], 1), _vm._v(" "), _c("b-col", [_c("b-button", {
        staticClass: "xm",
        on: {
          click: function click($event) {
            return _vm.update("dlvy", odm.odm_id);
          }
        }
      }, [_vm._v("등록")])], 1)], 1)], 2)], 1)] : _vm._e()], 2)], 1);
    })], 2), _vm._v(" "), _c("b-col", {
      staticClass: "dlvy_fare print_hide_flex gray_c"
    }, [_c("div", [pa.odpa_pa_type == "AIR" ? _c("p", [_vm._v("항공 운임료")]) : _c("p", [_vm._v("배송비")]), _vm._v("\r\n                        " + _vm._s(_vm._f("won")(_vm._f("comma")(pa.odpa_dlvy_p_add_vat))) + "\r\n                    ")])])], 1);
  }), _vm._v(" "), _c("div", {
    staticClass: "top_border"
  }), _vm._v(" "), _c("div", {
    staticClass: "sum_up"
  }, [_c("b-row", {
    staticClass: "total"
  }, [_c("b-col", [_vm._v("상품금액")]), _vm._v(" "), _c("b-col", [_c("b", [_vm._v(_vm._s(_vm._f("won")(_vm._f("comma")(_vm.od.od_gd_price + _vm.od.od_surtax))))])]), _vm._v(" "), _c("b-col", [_vm._v("배송료")]), _vm._v(" "), _c("b-col", [_c("b", [_vm._v(_vm._s(_vm._f("won")(_vm._f("comma")(_vm.od.od_dlvy_price + _vm.od.od_air_price))))])]), _vm._v(" "), _c("b-col", [_vm._v("주문금액")]), _vm._v(" "), _c("b-col", [_c("b", [_vm._v(_vm._s(_vm._f("won")(_vm._f("comma")(_vm.od.od_all_price))))])])], 1), _vm._v(" "), _c("b-row", {
    staticClass: "total_sub sm_ib_h"
  }, [_c("b-col", [_c("div", [_c("b-col", [_vm._v("상품가")]), _c("b-col", [_vm._v(_vm._s(_vm._f("won")(_vm._f("comma")(_vm.od.od_gd_price))))])], 1), _vm._v(" "), _c("div", [_c("b-col", [_vm._v("부가세")]), _c("b-col", [_vm._v(_vm._s(_vm._f("won")(_vm._f("comma")(_vm.od.od_surtax))))])], 1)]), _vm._v(" "), _c("b-col", [_c("div", [_c("b-col", [_vm._v("포사이언스 배송")]), _c("b-col", [_vm._v(_vm._s(_vm._f("comma")(_vm.dlvy_4s)))])], 1), _vm._v(" "), _c("div", [_c("b-col", [_vm._v("업체 배송")]), _c("b-col", [_vm._v(_vm._s(_vm._f("comma")(_vm.dlvy_other)))])], 1)]), _vm._v(" "), _c("b-col", [_c("div", [_c("b-col", [_vm._v("적립예정 마일리지")]), _c("b-col", [_vm._v(_vm._s(_vm._f("comma")(_vm.sum_mileage)))])], 1), _vm._v(" "), _vm.sum_dc > 0 ? _c("div", [_c("b-col", [_vm._v("할인")]), _c("b-col", [_vm._v(_vm._s(_vm._f("won")(_vm._f("comma")(_vm.sum_dc))))])], 1) : _vm._e()])], 1)], 1)], 2), _vm._v(" "), _c("div", {
    staticClass: "box od_addr"
  }, [_c("b-row", {
    attrs: {
      tag: "h5"
    }
  }, [_c("b-col", {
    attrs: {
      tag: "b"
    }
  }, [_vm._v("배송정보")]), _c("b-col", {
    staticClass: "text-right"
  }, [_c("b-button", {
    staticClass: "teal print_hide_inline_block",
    on: {
      click: function click($event) {
        return _vm.update("addr");
      }
    }
  }, [_vm._v("배송정보 수정")])], 1)], 1), _vm._v(" "), _c("b-row", {
    staticClass: "label_st"
  }, [_c("b-col", {
    staticClass: "lb"
  }, [_vm._v("수취인")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2 edit_field"
  }, [_vm.focusInfo.od_receiver ? _c("b-form-input", {
    directives: [{
      name: "focus",
      rawName: "v-focus"
    }],
    nativeOn: {
      blur: function blur($event) {
        _vm.focusInfo.od_receiver = false;
      }
    },
    model: {
      value: _vm.od.od_receiver,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "od_receiver", $$v);
      },
      expression: "od.od_receiver"
    }
  }) : _c("div", {
    staticClass: "hovertobtn",
    on: {
      click: function click($event) {
        _vm.focusInfo.od_receiver = true;
      }
    }
  }, [_vm._v("\r\n                        " + _vm._s(_vm.od.od_receiver) + "\r\n                        "), _c("font-awesome-icon", {
    staticClass: "btn_copy",
    attrs: {
      icon: "copy"
    },
    on: {
      click: function click($event) {
        return _vm.copyToClipboard(_vm.od.od_receiver);
      }
    }
  })], 1), _vm._v(" "), _vm.od.od_receiver != _vm.od.od_orderer ? _c("span", {
    staticClass: "warning"
  }, [_vm._v("* 주문자와 수취인이 다릅니다.")]) : _vm._e()], 1), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("전화번호")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2 edit_field"
  }, [_vm.focusInfo.od_receiver_hp ? _c("b-form-input", {
    directives: [{
      name: "focus",
      rawName: "v-focus"
    }],
    nativeOn: {
      blur: function blur($event) {
        _vm.focusInfo.od_receiver_hp = false;
      }
    },
    model: {
      value: _vm.od.od_receiver_hp,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "od_receiver_hp", $$v);
      },
      expression: "od.od_receiver_hp"
    }
  }) : _c("div", {
    staticClass: "hovertobtn",
    on: {
      click: function click($event) {
        _vm.focusInfo.od_receiver_hp = true;
      }
    }
  }, [_vm._v("\r\n                        " + _vm._s(_vm.od.od_receiver_hp) + "\r\n                        "), _c("font-awesome-icon", {
    staticClass: "btn_copy",
    attrs: {
      icon: "copy"
    },
    on: {
      click: function click($event) {
        return _vm.copyToClipboard(_vm.od.od_receiver_hp);
      }
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    staticClass: "lb addr_btn",
    on: {
      click: function click($event) {
        ;
        _vm.isModalViewed = !_vm.isModalViewed, _vm.modalType = "postCode";
      }
    }
  }, [_c("span", [_vm._v("배송주소")]), _c("b", [_vm._v("주소검색")])]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_1 hovertobtn address"
  }, [_vm._v("\r\n                    " + _vm._s(_vm.od.od_zip)), _c("b", [_vm._v(",")]), _vm._v(" " + _vm._s(_vm.od.od_addr1)), _c("b", [_vm._v(",")]), _vm._v(" " + _vm._s(_vm.od.od_addr2) + "\r\n                    "), _c("font-awesome-icon", {
    staticClass: "btn_copy",
    attrs: {
      icon: "copy"
    },
    on: {
      click: function click($event) {
        return _vm.copyToClipboard("".concat(_vm.od.od_addr1, ", ").concat(_vm.od.od_addr2));
      }
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "addr_list"
  }, [_c("ul", _vm._l(_vm.od.user.user_addr, function (ua, i) {
    return _c("li", {
      key: i,
      on: {
        click: function click($event) {
          return _vm.change_dlvy_info(i);
        }
      }
    }, [_vm._v(_vm._s(ua.ua_addr1) + " " + _vm._s(ua.ua_addr2) + " ( " + _vm._s(ua.ua_hp) + " )")]);
  }), 0)])], 1), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("배송시 요구사항")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_1 hovertobtn"
  }, [_vm._v("\r\n                    " + _vm._s(_vm.od.od_memo) + "\r\n                    "), _c("font-awesome-icon", {
    staticClass: "btn_copy",
    attrs: {
      icon: "copy"
    },
    on: {
      click: function click($event) {
        return _vm.copyToClipboard(_vm.od.od_memo);
      }
    }
  })], 1)], 1), _vm._v(" "), _c("b-row", {
    attrs: {
      tag: "h5"
    }
  }, [_c("b-col", {
    attrs: {
      tag: "b"
    }
  }, [_vm._v("결제정보")]), _vm._v(" "), _c("b-col", {
    staticClass: "text-right"
  }, [_c("b-button", {
    staticClass: "teal print_hide_inline_block",
    on: {
      click: function click($event) {
        return _vm.update("pay");
      }
    }
  }, [_vm._v("결제정보 수정")])], 1)], 1), _vm._v(" "), _c("b-row", {
    staticClass: "label_st"
  }, [["B", "L", "S"].includes(_vm.od.od_pay_method) ? [_c("b-col", {
    staticClass: "lb"
  }, [_vm._v("결제금액")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2"
  }, [_vm._v(_vm._s(_vm._f("won")(_vm._f("comma")(_vm.od.od_all_price))))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("결제예정일")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2"
  }, [_vm._v(_vm._s(_vm.payPlanDisplay))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("결제수단")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2"
  }, [_c("span", {
    staticClass: "print_show_inline"
  }, [_vm._v(_vm._s(_vm.order_config.pay_method[_vm.od.od_pay_method]))]), _vm._v(" "), _c("b-form-select", {
    staticClass: "print_hide_inline_block",
    style: {
      maxWidth: "100px"
    },
    attrs: {
      size: "sm"
    },
    model: {
      value: _vm.od.od_pay_method,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "od_pay_method", $$v);
      },
      expression: "od.od_pay_method"
    }
  }, _vm._l(_vm.order_config.pay_method, function (v, k) {
    return _c("b-form-select-option", {
      key: k,
      attrs: {
        value: k
      }
    }, [_vm._v(_vm._s(v))]);
  }), 1)], 1), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("입금계좌")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2"
  }, [_vm.od.order_extra_info.oex_bank == "K" ? _c("span", [_vm._v("국민은행")]) : _vm.od.order_extra_info.oex_bank == "W" ? _c("span", [_vm._v("우리은행")]) : _vm._e()]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("입금자")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_1"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_depositor))])] : _vm.od.od_pay_method == "R" ? [_c("b-col", {
    staticClass: "lb"
  }, [_vm._v("결제금액")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2"
  }, [_vm._v(_vm._s(_vm._f("won")(_vm._f("comma")(_vm.od.od_all_price))))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("결제예정일")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2"
  }, [_vm._v(_vm._s(_vm.payPlanDisplay))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("결제수단")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_1"
  }, [_c("span", {
    staticClass: "print_show_inline"
  }, [_vm._v(_vm._s(_vm.order_config.pay_method[_vm.od.od_pay_method]))]), _vm._v(" "), _c("b-form-select", {
    staticClass: "print_hide_inline_block",
    style: {
      maxWidth: "100px"
    },
    attrs: {
      size: "sm"
    },
    model: {
      value: _vm.od.od_pay_method,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "od_pay_method", $$v);
      },
      expression: "od.od_pay_method"
    }
  }, _vm._l(_vm.order_config.pay_method, function (v, k) {
    return _c("b-form-select-option", {
      key: k,
      attrs: {
        value: k
      }
    }, [_vm._v(_vm._s(v))]);
  }), 1)], 1), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("담당자")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_mng))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("연락처")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_num))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("이메일")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_email))])] : [_c("b-col", {
    staticClass: "lb"
  }, [_vm._v("결제금액")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2"
  }, [_vm.od.order_pg ? [_vm._v(_vm._s(_vm._f("won")(_vm._f("comma")(_vm.od.order_pg.pg_price))))] : _vm._e()], 2), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("결제예정일")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2"
  }, [_vm._v(_vm._s(_vm.payPlanDisplay))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("결제수단")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2"
  }, [_c("span", {
    staticClass: "print_show_inline"
  }, [_vm._v(_vm._s(_vm.order_config.pay_method[_vm.od.od_pay_method]))]), _vm._v(" "), _c("b-form-select", {
    staticClass: "print_hide_inline_block",
    style: {
      maxWidth: "100px"
    },
    attrs: {
      size: "sm"
    },
    model: {
      value: _vm.od.od_pay_method,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "od_pay_method", $$v);
      },
      expression: "od.od_pay_method"
    }
  }, _vm._l(_vm.order_config.pay_method, function (v, k) {
    return _c("b-form-select-option", {
      key: k,
      attrs: {
        value: k
      }
    }, [_vm._v(_vm._s(v))]);
  }), 1), _vm._v(" "), _vm.od.order_pg && _vm.od.order_pg.pg_id ? _c("b-button", {
    staticClass: "sm teal print_hide_inline_block ml-3",
    on: {
      click: _vm.getReceipt
    }
  }, [_vm._v("매출전표")]) : _vm._e()], 1), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("카드종류")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2"
  }, [_vm._v(_vm._s(_vm.od.order_pg.pg_card_com))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("결과메시지")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2"
  }, [_vm._v(_vm._s(_vm.od.order_pg.pg_msg))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("결제자")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_2"
  }, [_vm._v(_vm._s(_vm.od.order_pg.pg_buyer_nm))])]], 2), _vm._v(" "), _c("b-row", {
    attrs: {
      tag: "h5"
    }
  }, [_c("b-col", {
    attrs: {
      tag: "b"
    }
  }, [_vm._v("요청서류")]), _vm._v(" "), _c("b-col", {
    staticClass: "text-right"
  }, [_c("b-button", {
    staticClass: "teal print_hide_inline_block",
    on: {
      click: function click($event) {
        return _vm.update("adm_memo");
      }
    }
  }, [_vm._v("관리자 메모 수정")])], 1)], 1), _vm._v(" "), _c("b-row", {
    staticClass: "label_st"
  }, [_c("b-col", {
    staticClass: "lb"
  }, [_vm._v("요청서류")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_1"
  }, [_vm._v(_vm._s(_vm.reqDocumentDisplay))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("첨부서류 메모")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_1"
  }, [_c("p", {
    domProps: {
      innerHTML: _vm._s(_vm.od.order_extra_info.oex_memo)
    }
  })]), _vm._v(" "), _vm.od.od_pay_method == "B" || _vm.od.od_pay_method == "L" ? [_vm.od.order_extra_info.oex_type == "IV" ? [_vm.od.file_info ? [_c("b-col", {
    staticClass: "lb"
  }, [_vm._v("사업자등록증")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_1"
  }, [_vm.checkImage(_vm.od.file_info.fi_ext) ? _c("b-button", {
    staticClass: "print_hide",
    on: {
      click: function click($event) {
        ;
        _vm.isModalViewed = !_vm.isModalViewed, _vm.modalType = "blView";
      }
    }
  }, [_vm._v(_vm._s(_vm.od.file_info.fi_original) + " "), _c("b-icon-eye-fill")], 1) : _c("b-button", {
    staticClass: "print_hide",
    on: {
      click: function click($event) {
        return _vm.fileDown(_vm.od.file_info.down_path, _vm.od.file_info.fi_original);
      }
    }
  }, [_vm._v(_vm._s(_vm.od.file_info.fi_original) + " "), _c("b-icon-download")], 1), _vm._v(" "), _c("span", {
    staticClass: "print_show_inline"
  }, [_vm._v(_vm._s(_vm.od.file_info.fi_original))])], 1)] : [_c("b-col", {
    staticClass: "lb"
  }, [_vm._v("법인명")]), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_biz_name))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("사업자등록번호")]), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_biz_num))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("대표자")]), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_ceo))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("주소")]), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_addr))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("업태")]), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_biz_type))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("업종")]), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_biz_item))])], _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("담당자 이름")]), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_mng))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("담당자 메일")]), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_email))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("담당자 번호")]), _c("b-col", {
    staticClass: "dt wd1_3"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_num))]), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("세금계산서 발급시 요구사항")]), _c("b-col", {
    staticClass: "dt wd1_1"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_requirement))])] : _vm.od.order_extra_info.oex_type == "IVNO" ? [_c("b-col", {
    staticClass: "lb"
  }, [_vm._v("지출 증빙 서류")]), _c("b-col", {
    staticClass: "dt wd1_1"
  }, [_vm._v("세금계산서 입력안함")])] : _vm.od.order_extra_info.oex_type == "NO" ? [_c("b-col", {
    staticClass: "lb"
  }, [_vm._v("지출 증빙 서류")]), _c("b-col", {
    staticClass: "dt wd1_1"
  }, [_vm._v("미발급")])] : [_c("b-col", {
    staticClass: "lb"
  }, [_vm._v("\r\n                            지출 증빙 서류"), _c("br"), _vm._v("\r\n                            (\r\n                                "), _vm.od.order_extra_info.oex_type == "HP" ? _c("span", [_vm._v("휴대폰번호")]) : _vm.od.order_extra_info.oex_type == "IN" ? _c("span", [_vm._v("주민등록번호")]) : _vm.od.order_extra_info.oex_type == "CN" ? _c("span", [_vm._v("카드번호")]) : _vm.od.order_extra_info.oex_type == "BN" ? _c("span", [_vm._v("사업자번호")]) : _vm._e(), _vm._v("\r\n                            )\r\n                        ")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_1"
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_num))])]] : _vm._e(), _vm._v(" "), _c("b-col", {
    staticClass: "lb"
  }, [_vm._v("관리자 메모")]), _vm._v(" "), _c("b-col", {
    staticClass: "dt wd1_1 edit_field adm_memo",
    style: {
      padding: 0
    }
  }, [_vm.focusInfo.adm_memo ? _c("b-form-input", {
    directives: [{
      name: "focus",
      rawName: "v-focus"
    }],
    nativeOn: {
      blur: function blur($event) {
        _vm.focusInfo.adm_memo = false;
      }
    },
    model: {
      value: _vm.od.order_extra_info.oex_adm_memo,
      callback: function callback($$v) {
        _vm.$set(_vm.od.order_extra_info, "oex_adm_memo", $$v);
      },
      expression: "od.order_extra_info.oex_adm_memo"
    }
  }) : _c("div", {
    on: {
      click: function click($event) {
        _vm.focusInfo.adm_memo = true;
      }
    }
  }, [_vm._v(_vm._s(_vm.od.order_extra_info.oex_adm_memo))])], 1)], 2)], 1), _vm._v(" "), _c("transition", {
    attrs: {
      name: "modal"
    }
  }, [_vm.isModalViewed ? _c("Modal", {
    attrs: {
      max_width: 600
    },
    on: {
      "close-modal": function closeModal($event) {
        _vm.isModalViewed = false;
      }
    }
  }, [_vm.modalType == "blView" ? [_c("template", {
    slot: "header"
  }, [_vm._v("사업자 등록증 보기")]), _vm._v(" "), _c("img", {
    staticStyle: {
      "max-width": "100%",
      height: "auto"
    },
    attrs: {
      src: _vm.od.file_info.path
    },
    on: {
      click: function click($event) {
        return _vm.fileDown(_vm.od.file_info.down_path, _vm.od.file_info.fi_original);
      }
    }
  })] : _vm.modalType == "postCode" ? [_c("template", {
    slot: "header"
  }, [_vm._v("우편번호 검색")]), _vm._v(" "), _c("VueDaumPostcode", {
    staticClass: "shadow mt-3",
    attrs: {
      animation: true
    },
    on: {
      complete: _vm.onPostcodeSlt
    }
  })] : _vm.modalType == "postDetail" ? [_c("template", {
    slot: "header"
  }, [_vm._v("배송지 변경")]), _vm._v(" "), _c("b-container", {
    staticClass: "adform layerModal"
  }, [_c("b-row", [_c("b-col", {
    staticClass: "label"
  }, [_vm._v("우편번호")]), _vm._v(" "), _c("b-col", [_vm._v(_vm._s(_vm.od.od_zip))])], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "label"
  }, [_vm._v("주소")]), _vm._v(" "), _c("b-col", [_vm._v(_vm._s(_vm.od.od_addr1))])], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "label"
  }, [_vm._v("상세 주소")]), _vm._v(" "), _c("b-col", [_c("b-form-input", {
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        _vm.isModalViewed = false;
      }
    },
    model: {
      value: _vm.od.od_addr2,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "od_addr2", $$v);
      },
      expression: "od.od_addr2"
    }
  })], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "ctrl"
  }, [_c("b-button", {
    on: {
      click: function click($event) {
        _vm.isModalViewed = false;
      }
    }
  }, [_vm._v("완료")])], 1)], 1)], 1)] : _vm.modalType == "sendTransaction" ? [_c("template", {
    slot: "header"
  }, [_vm._v("거래명세서 PDF 발송")]), _vm._v(" "), _c("b-container", {
    staticClass: "adform layerModal"
  }, [_c("b-row", [_c("b-col", {
    staticClass: "label"
  }, [_vm._v("공급 날짜")]), _vm._v(" "), _c("b-col", [_c("b-input-group", {
    attrs: {
      size: "sm"
    }
  }, [_c("b-form-input", {
    attrs: {
      placeholder: "YYYY-MM-DD",
      autocomplete: "off",
      formatter: _vm.format_date
    },
    model: {
      value: _vm.od.trans_date,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "trans_date", $$v);
      },
      expression: "od.trans_date"
    }
  }), _vm._v(" "), _c("b-input-group-append", [_c("b-form-datepicker", {
    attrs: {
      size: "sm",
      "button-only": "",
      right: ""
    },
    model: {
      value: _vm.od.trans_date,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "trans_date", $$v);
      },
      expression: "od.trans_date"
    }
  })], 1)], 1)], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "label"
  }, [_vm._v("공급 받는자")]), _vm._v(" "), _c("b-col", [_c("b-form-input", {
    model: {
      value: _vm.od.trans_receive,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "trans_receive", $$v);
      },
      expression: "od.trans_receive"
    }
  })], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "label"
  }, [_vm._v("받을 Email")]), _vm._v(" "), _c("b-col", [_c("b-form-input", {
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        return _vm.transactionPdf("send");
      }
    },
    model: {
      value: _vm.od.trans_email,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "trans_email", $$v);
      },
      expression: "od.trans_email"
    }
  })], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "ctrl"
  }, [_c("b-button", {
    on: {
      click: function click($event) {
        return _vm.transactionPdf("send");
      }
    }
  }, [_vm._v("발송")])], 1)], 1)], 1)] : _vm.modalType == "changeMng" ? [_c("template", {
    slot: "header"
  }, [_vm._v("담당자 변경")]), _vm._v(" "), _c("b-container", {
    staticClass: "adform layerModal"
  }, [_c("b-row", [_c("b-col", {
    staticClass: "label"
  }, [_vm._v("당당자")]), _vm._v(" "), _c("b-col", [_c("b-form-select", {
    staticClass: "sm_ib_h",
    model: {
      value: _vm.od.od_mng,
      callback: function callback($$v) {
        _vm.$set(_vm.od, "od_mng", $$v);
      },
      expression: "od.od_mng"
    }
  }, [_c("b-form-select-option", {
    attrs: {
      value: null,
      disabled: ""
    }
  }, [_vm._v("◖처리 상태◗")]), _vm._v(" "), _vm._l(_vm.mng_on, function (v, k) {
    return _c("b-form-select-option", {
      key: k,
      attrs: {
        value: k
      }
    }, [_vm._v(_vm._s(v.name))]);
  })], 2)], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col"), _vm._v(" "), _c("b-col", {
    staticClass: "ctrl"
  }, [_c("b-button", {
    staticClass: "sky",
    on: {
      click: function click($event) {
        return _vm.update("od_mng", "other");
      }
    }
  }, [_vm._v("변경")])], 1)], 1)], 1)] : _vm._e()], 2) : _vm._e()], 1)], 1)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_public_css_adm_shop_order_edit_css_ver_2_0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! -!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../public/css/adm_shop_order_edit.css?ver=2.0 */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./public/css/adm_shop_order_edit.css?ver=2.0");
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
___CSS_LOADER_EXPORT___.i(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_public_css_adm_shop_order_edit_css_ver_2_0__WEBPACK_IMPORTED_MODULE_1__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.p_wrap[data-v-ca63be56] { padding-top:1rem;\n}\n.p_wrap .print_mng_nm[data-v-ca63be56] { display:none;\n}\n.p_wrap .print_hide[data-v-ca63be56] { display:block !important;\n}\n.p_wrap .print_hide_flex[data-v-ca63be56] { display:flex !important;\n}\n.p_wrap .print_hide_inline_block[data-v-ca63be56] { display:inline-block !important;\n}\n.p_wrap .print_show_inline[data-v-ca63be56]  { display:none;\n}\n.p_wrap .act_ctrl[data-v-ca63be56] { border-width:5px;\n}\n.p_wrap .act_ctrl .btn_area[data-v-ca63be56] { display:flex; justify-content:flex-end; flex:0 0 530px; max-width:530px;\n}\n.p_wrap .act_ctrl .btn_area>*[data-v-ca63be56] { margin-left:.5%; margin-right:.5%;\n}\n.p_wrap .act_ctrl .btn_area .input-group[data-v-ca63be56] { max-width:150px;\n}\n.p_wrap .act_ctrl .def_info b[data-v-ca63be56]:not(:last-of-type) { margin-right:.5vw;\n}\n.p_wrap .box .goods .gd_con .row .col .sum[data-v-ca63be56] .btn-group-toggle { display:block !important; text-align:center;\n}\n.p_wrap .box .goods .gd_con .row .col .sum[data-v-ca63be56] .btn-group-toggle .btn { background-color:#ffffff; color:#6F6F6F; border-color:#aaa; border-radius:2rem; padding:.17rem 0.7rem; font-size:.75rem;\n}\n.p_wrap .box .goods .gd_con .row .col .sum[data-v-ca63be56] .btn-group-toggle .btn.active { color:#fff; background-color:#4EB8C8;\n}\n.p_wrap .box .goods .gd_con .row .col[data-v-ca63be56]:nth-child(7) { border-right-width:1px;\n}\n.p_wrap .box .goods .gd_con .row .myCheck[data-v-ca63be56] .custom-control-label::before, \r\n.p_wrap .box .goods .gd_con .row .myCheck[data-v-ca63be56] .custom-control-label::after { width:1.8rem; height:1.8rem; top:-2px;\n}\n.p_wrap .box .goods .gd_con .model.today[data-v-ca63be56] { background-color:#fff2cb;\n}\n.p_wrap .box .goods .gd_con .model .signboard[data-v-ca63be56] { text-align:center; margin:0 -10px; padding:10px;\n}\n.p_wrap .box .goods .gd_con .model .signboard .neonText[data-v-ca63be56] { font-size:14px; color:#e600ff;\n}\n.p_wrap .box .goods .gd_con .dlvy_info[data-v-ca63be56] { flex-wrap:wrap; text-align:center; padding-bottom:0; align-items:flex-end !important;\n}\n.p_wrap .box .goods .gd_con .dlvy_info p[data-v-ca63be56] { padding:.2rem 0 .25rem 0; width:100%;\n}\n.p_wrap .box .goods .gd_con .dlvy_info p[data-v-ca63be56]:not(:last-of-type) { border-bottom:1px solid #aaa;\n}\n.p_wrap .box .goods .gd_con .dlvy_info .dlvy_info_box_switch[data-v-ca63be56] { border-bottom:0; border-radius:9px 9px 0 0;\n}\n.p_wrap .box .goods .gd_con .dlvy_info .dlvy_info_box[data-v-ca63be56] { position:absolute; right:73%; top:80%; width:350px; z-index:2;\n}\n.p_wrap .box .goods .gd_con .dlvy_info .dlvy_info_box[data-v-ca63be56] .shadow { box-shadow: -0.9rem 0.9rem 1rem rgba(0, 0, 0, 0.7) !important;\n}\n.p_wrap .box .goods .gd_con .dlvy_info .dlvy_info_box .btn[data-v-ca63be56] { color:#FFF;\n}\n.p_wrap .box .goods .gd_con .dlvy_info .dlvy_info_box .card .card-body[data-v-ca63be56] { padding:.4rem;\n}\n.p_wrap .box .goods .gd_con .dlvy_info .dlvy_info_box .card .card-body .ctrl .col[data-v-ca63be56] { flex-basis:0; flex-grow:1; max-width:100%; text-align:left; padding:5px 0; border-width:0;\n}\n.p_wrap .box .goods .gd_con .dlvy_info .dlvy_info_box .card .card-body .ctrl .col[data-v-ca63be56]:nth-child(2) { text-align:center;\n}\n.p_wrap .box .goods .gd_con .dlvy_info .dlvy_info_box .card .card-body .ctrl .col[data-v-ca63be56]:last-child { text-align:right;\n}\n.p_wrap .od_addr .row .adm_memo div[data-v-ca63be56] { cursor:pointer;\n}\n.p_wrap .od_addr .row .adm_memo div[data-v-ca63be56]:hover { box-shadow:0 1px 5px 7px #015b7e;\n}\n.p_wrap .sm_ib_v[data-v-ca63be56] { display:none;\n}\n@media (max-width: 1472px){\n.p_wrap .act_ctrl .def_info[data-v-ca63be56],\r\n    .p_wrap .act_ctrl .btn_area[data-v-ca63be56] { flex:0 0 100%; max-width:100%;\n}\n}\n@media (max-width: 992px){\n.p_wrap .sm_ib_v[data-v-ca63be56] { display:inline-block !important;\n}\n.p_wrap .sm_ib_h[data-v-ca63be56] { display:none !important;\n}\n.p_wrap .act_ctrl[data-v-ca63be56] { font-size:.8em;\n}\n.p_wrap .act_ctrl .btn[data-v-ca63be56] { font-size:.9em;\n}\n.p_wrap .act_ctrl .def_info span[data-v-ca63be56] { margin-left:0;\n}\n.p_wrap .act_ctrl .def_info b[data-v-ca63be56] { margin-right:2%; margin-left:.1rem;\n}\n.p_wrap .act_ctrl .btn_area[data-v-ca63be56] { flex: 0 0 100%; max-width: 100%;\n}\n.p_wrap .act_ctrl .btn_area .input-group[data-v-ca63be56] { max-width:95px;\n}\n.p_wrap .act_ctrl .btn_area .btn[data-v-ca63be56] { padding: 0.1rem 0.2rem !important;\n}\n.label_st .dt[data-v-ca63be56] { padding-left:.2rem;\n}\n.label_st .lb[data-v-ca63be56] { flex:0 0 40%; max-width:40%;\n}\n.label_st .wd1_3[data-v-ca63be56], .label_st .wd54[data-v-ca63be56], .label_st .wd1_2[data-v-ca63be56], \r\n    .label_st .wd1_1[data-v-ca63be56] { flex:0 0 60%; max-width:60%;\n}\n.p_wrap .box .goods .pa_tit[data-v-ca63be56] { display:none !important;\n}\n.p_wrap .box .goods .gd_con .row .col[data-v-ca63be56]:nth-child(1) { display:none !important;\n}\n.p_wrap .box .goods .gd_con .row .col[data-v-ca63be56]:nth-child(2) { flex:0 0 35%; max-width:35%; border-top:2px solid #000;\n}\n.p_wrap .box .goods .gd_con .row .col[data-v-ca63be56]:nth-child(3) { flex:0 0 65%; max-width:65%; border-top:2px solid #000;\n}\n.p_wrap .box .goods .gd_con .row .col[data-v-ca63be56]:nth-child(4) { display:none !important;\n}\n.p_wrap .box .goods .gd_con .row .col[data-v-ca63be56]:nth-child(5) { flex:0 0 33.333333%; max-width:33.333333%;\n}\n.p_wrap .box .goods .gd_con .row .col[data-v-ca63be56]:nth-child(6) { flex:0 0 33.333333%; max-width:33.333333%;\n}\n.p_wrap .box .goods .gd_con .row .col[data-v-ca63be56]:nth-child(7) { flex:0 0 33.333333%; max-width:33.333333%;\n}\n.p_wrap .box .goods .gd_con .row .col[data-v-ca63be56]:nth-child(8) { display:none !important;\n}\n.p_wrap .box .goods .dlvy_fare[data-v-ca63be56] { display:none !important;\n}\n.p_wrap .box .sum_up .total .col[data-v-ca63be56]:nth-of-type(2):after,\r\n    .p_wrap .box .sum_up .total .col[data-v-ca63be56]:nth-of-type(4):after { content:none;\n}\n.p_wrap .box .sum_up .total .col[data-v-ca63be56]:nth-of-type(odd) { flex-basis:50%; max-width:50%; font-size:1rem;\n}\n.p_wrap .box .sum_up .total .col[data-v-ca63be56]:nth-of-type(6) { flex-basis:50%; max-width:50%;\n}\n.p_wrap .box .sum_up .total .col b[data-v-ca63be56] { font-size:1em;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./public/css/adm_shop_order_edit.css?ver=2.0":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./public/css/adm_shop_order_edit.css?ver=2.0 ***!
  \*******************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@page { size: auto; }\n.p_wrap h5 { font-size:1.54rem; padding: 0.4rem 0 0 0.65rem; margin-bottom: 1rem !important; }\n.p_wrap h5 b { position:relative; bottom:-2px; }\n.p_wrap .container { max-width:100%; }\n.p_wrap .container,\n.p_wrap .row .col { padding:0; }\n.p_wrap .adform .row > div:not(.tit) { padding: 8px 5px; }\n.p_wrap .row,\n.p_wrap .row .col p { margin:0; }\n.p_wrap .h3 h3 { margin:0 0 .5rem 3rem }\n.p_wrap .h3 div { text-align:right; }\n.p_wrap .h3 div .btn { border-color:#000; font-weight:600; }\n\n.p_wrap .print_hide,\n.p_wrap .print_hide_flex,\n.p_wrap .print_hide_inline_block { display:none !important; }\n.p_wrap .btn.teal { font-size:.9rem; padding:.5rem 0.75rem 0.3rem; }\n\n.p_wrap .act_ctrl { background-color: #fff; border:1px solid #4eb8c8; border-radius: 1rem; padding: 8px; position: -webkit-sticky; position: sticky; top: 0; z-index: 3; }\n.p_wrap .act_ctrl .def_info { line-height:1.9; }\n.p_wrap .act_ctrl .def_info span { color:#999; font-weight:bold; }\n.p_wrap .act_ctrl .def_info b { font-weight:900; }\n.p_wrap .act_ctrl .def_info b:not(:last-of-type) { margin-right:2.5vw; }\n.p_wrap .print_mng_nm { top:0; position:absolute; left:50%; transform:translateX(-50%); font-size:3rem; z-index:4; }\n.p_wrap .box .top_border { border-top:3px solid #4F637B; }\n\n.p_wrap .orderer .row .col .u_group { color:#888; }\n \n.p_wrap .box .goods .pa_tit { flex:0 0 9%; max-width:9%; border-right:1px solid #D7D7D7; border-bottom:1px solid #D7D7D7; align-items:center; display:flex; text-align:center; justify-content:center; }\n.p_wrap .box .goods .gd_con .row.option { background-color:#F4F1EC; }\n.p_wrap .box .goods .gd_con .row .col { border-bottom:1px solid #D7D7D7; padding:.68rem; font-size:.85rem; }\n.p_wrap .box .goods .gd_con .row .col.align { display:flex; align-items:center; justify-content:center; }\n.p_wrap .box .goods .gd_con .row:not(:first-child) .end { justify-content:flex-end; }\n.p_wrap .box .goods .gd_con .row .gray_c { color:#AEAEAE; }\n.p_wrap .box .goods .gd_con .row:not(:first-child) .col .btn { color:#AEAEAE; font-size:.9rem; }\n.p_wrap .box .goods .gd_con .row .col b { color:#000; font-size:.95rem; }\n\n.p_wrap .box .goods .gd_con .row:first-child .col { font-weight:600; line-height:1.7; padding:.86rem 0; font-size:.9rem; text-align:center; }\n.p_wrap .box .goods .gd_con .row .col:nth-child(1) { flex:0 0 4.5%; max-width:4.5%; }\n.p_wrap .box .goods .gd_con .row .col:nth-child(2) { flex:0 0 7%; max-width:7%; }\n.p_wrap .box .goods .gd_con .row .col:nth-child(3) { border-right:1px solid #D7D7D7; }\n.p_wrap .box .goods .gd_con .row .col:nth-child(4) { flex:0 0 9%; max-width:9%; border-right:1px solid #D7D7D7; }\n.p_wrap .box .goods .gd_con .row .col:nth-child(5) { flex:0 0 11%; max-width:11%; border-right:1px solid #D7D7D7; }\n.p_wrap .box .goods .gd_con .row .col:nth-child(6) { flex:0 0 9%; max-width:9%; border-right:1px solid #D7D7D7; }\n.p_wrap .box .goods .gd_con .row .col:nth-child(7) { flex:0 0 13%; max-width:13%; border-right:0px solid #D7D7D7; }\n.p_wrap .box .goods .gd_con .row .col:nth-child(8) { flex:0 0 9%; max-width:9%; }\n    \n.p_wrap .box .goods .gd_con .row .col img { width:100%; cursor:pointer; }\n.p_wrap .box .goods .gd_con .row .col >>> .myCheck .custom-control-label::before, \n.p_wrap .box .goods .gd_con .row .col >>> .myCheck .custom-control-label::after { width:1.8rem; height:1.8rem; top:-2px; }\n.p_wrap .box .goods .gd_con .row .col .sum { text-align:right; width:100%; line-height:2; }\n.p_wrap .box .goods .gd_con .row .col .price_area { line-height:1; }\n.p_wrap .box .goods .gd_con .row .col .price_area .coupon_dc { color:#ff7878; font-size:.9em; }\n.p_wrap .box .goods .gd_con .row .col.desc.option { display:flex; align-items:center; }\n.p_wrap .box .goods .dlvy_fare { flex:0 0 9%; max-width:9%; align-items: center; display: flex; text-align: center; justify-content: center; border-left: 1px solid #D7D7D7; border-bottom:1px solid #D7D7D7; color:#AEAEAE; }\n\n.p_wrap .box .action { padding:1.5rem 3rem; font-weight:600; }\n\n.p_wrap .box .sum_up .total { border-bottom:1px solid #D6D6D6; }\n.p_wrap .box .sum_up .total .col { color:#000; font-weight:bold; }\n.p_wrap .box .sum_up .total .col b { font-size:1.6em; }\n.p_wrap .box .sum_up .total .col:nth-of-type(odd) { display:flex; align-items:center; flex-basis:12%; max-width:12%; padding:1vw 0 1vw 2vw; font-size:.9vw; }\n.p_wrap .box .sum_up .total .col:nth-of-type(even) { text-align:right; padding:1vw 2vw 1vw 0; }\n.p_wrap .box .sum_up .total .col:nth-of-type(2):after,\n.p_wrap .box .sum_up .total .col:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; position:absolute; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.32rem; top:50%; transform:translateY(-50%); }\n.p_wrap .box .sum_up .total .col:nth-of-type(2),\n.p_wrap .box .sum_up .total .col:nth-of-type(4) { border-right:1px solid #D6D6D6; }\n.p_wrap .box .sum_up .total .col:nth-of-type(2):after { content:\"+\"; }\n.p_wrap .box .sum_up .total .col:nth-of-type(4):after { content:\"=\"; }\n.p_wrap .box .sum_up .total .col:nth-of-type(5) { flex-basis:16%; max-width:16%; }\n.p_wrap .box .sum_up .total .col:nth-of-type(6) { flex-basis:24%; max-width:24%; }\n.p_wrap .box .sum_up .total_sub { background:#F2F3F5; border-bottom-width:0; }\n.p_wrap .box .sum_up .total_sub>.col:nth-of-type(1) { border-right:1px solid #D6D6D6; }\n.p_wrap .box .sum_up .total_sub>.col:nth-of-type(2) { border-right:1px solid #D6D6D6; }\n.p_wrap .box .sum_up .total_sub>.col:nth-of-type(3) { flex-basis:40%; max-width:40%; }\n.p_wrap .box .sum_up .total_sub .col>div { display:flex; flex-wrap:wrap; }\n.p_wrap .box .sum_up .total_sub .col>div:nth-of-type(1) { padding:1rem 2rem .5rem 2rem; }\n.p_wrap .box .sum_up .total_sub .col>div:nth-of-type(2) { padding:0 2rem 1rem 2rem; }\n.p_wrap .box .sum_up .total_sub .col>div .col { color:#A8A9AB; font-weight:bold; font-size:.84rem; }\n.p_wrap .box .sum_up .total_sub .col>div .col:nth-of-type(2) { text-align:right; }\n.p_wrap .box .edit_field div { padding:.4em; line-height:2; font-size:1.2em; width:100%; height:100%; }\n.p_wrap .box .hovertobtn .btn_copy { cursor:pointer; max-height:0; transition:max-height 0.3s; color:#000; margin-left:.5em; overflow:hidden; }\n.p_wrap .box .hovertobtn:hover .btn_copy { max-height:30px; }\n\n.p_wrap .od_addr .addr_btn b { display:none; }\n.p_wrap .od_addr .addr_btn:hover span { display:none; }\n.p_wrap .od_addr .addr_btn:hover b { display:inline; cursor:pointer; box-shadow:0 0 5px hsla( 0, 0%, 0%, .6 ); PADDING:.3em 2em; }\n.p_wrap .od_addr .dt.address .addr_list { position:relative; right:-1.5em; top:0; height:42px; width:42px; overflow:hidden; max-height:0; }\n.p_wrap .od_addr .dt.address:hover .addr_list { max-height:none; overflow:visible; }\n.p_wrap .od_addr .dt.address .addr_list ul { position:absolute; background:#F8F8F8; border:2px solid #555; border-radius:10px; box-shadow:0 1px 15px 1px rgba(39,39,39,.5); padding:10px 30px; z-index:1; min-width:40rem; text-align:left; }\n.p_wrap .od_addr .dt.address .addr_list ul li { list-style-type:decimal; cursor:pointer; font-size:1.1rem; }\n\n.p_wrap .label_st { border-top:3px solid #4F637B; border-bottom:3px solid #4F637B; margin-bottom:2.5rem; }\n.p_wrap .label_st .col { font-size:.9rem; border-bottom:1px solid #D7D7D7; border-right:1px solid #D7D7D7; }\n.p_wrap .label_st .lb { background-color:#F2F3F5; text-align:center; padding:.55rem 0.3rem; flex:0 0 13%; max-width:13%; }\n.p_wrap .label_st .dt { padding-left:2rem; display:flex; align-items:center; }\n.p_wrap .label_st .dt svg { font-size:1.6rem; vertical-align:middle; }\n.p_wrap .label_st .dt .btn { padding:.3rem .75rem .1rem; }\n.p_wrap .label_st .dt .warning { color:#FF0000; position:absolute; right:0; font-size:.8rem; }\n.p_wrap .label_st .wd1_3 { flex:0 0 20.333333%; max-width:20.333333%; }\n.p_wrap .label_st .wd54 { flex:0 0 53.666666%; max-width:53.666666%; }\n.p_wrap .label_st .wd1_2 { flex:0 0 37%; max-width:37%; }\n.p_wrap .label_st .wd1_1 { flex:0 0 87%; max-width:87%; }\n\n.cube_box { display:inline-block; vertical-align:middle; margin-left:1rem !important; }\n.cube_box, \n.cube_box * { box-sizing: border-box; }\n.cube_box { /*perspective:400px;*/ margin:auto; }\n.cube_box .cube { position: relative; transform-style: preserve-3d; transform: translateZ(-50px); transition: transform .2s; }\n.cube_box .cube .piece { position:absolute; }\n.cube_box,\n.cube_box .cube,\n.cube_box .cube .piece { width:100%; max-width:40px; height:30px; }\n.cube_box .cube .piece.front { transform: rotateY(  0deg) translateZ(20px); line-height:2; padding-left:.6rem; }\n/* .cube_box .cube .piece.right { transform: rotateY( 90deg) translateZ(20px); display:block; } */\n.cube_box .cube .piece.bottom { transform: rotateX(-90deg) translateZ(30px); display:block; }\n.cube_box .cube.show_front  { transform: translateZ(-50px) rotateY(   0deg); }\n/* .cube_box .cube.show_right,\n.cube_box .cube:hover  { transform: translateZ(-50px) rotateY( -90deg); } */\n.cube_box .cube.show_bottom,\n.cube_box .cube:hover{ transform: translateZ(-30px) rotateX(  90deg); }\n\ntable tr td svg { cursor:pointer; font-size:1.2rem; vertical-align:middle; }\n.cube_box.receiver,\n.cube_box.receiver .cube,\n.cube_box.receiver .cube .piece { max-width:150px; }\n.cube_box.receiver_hp,\n.cube_box.receiver_hp .cube,\n.cube_box.receiver_hp .cube .piece { max-width:250px; }\n.layerModal .row .ctrl { text-align:right; }", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_ca63be56_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_ca63be56_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_ca63be56_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/vue-daum-postcode/dist/index.js":
/*!******************************************************!*\
  !*** ./node_modules/vue-daum-postcode/dist/index.js ***!
  \******************************************************/
/***/ ((module) => {

!function(e,t){if(true)module.exports=t();else { var o, n; }}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";var o,r=Object.defineProperty,a=Object.getOwnPropertyDescriptor,u=Object.getOwnPropertyNames,i=Object.prototype.hasOwnProperty,d={};function l(e){let t=null;return()=>{try{return t||(t=Promise.resolve(e()).catch(e=>{throw t=null,e}))}catch(e){return Promise.reject(e)}}}((e,t)=>{for(var n in t)r(e,n,{get:t[n],enumerable:!0})})(d,{defer:()=>c,load:()=>s,once:()=>l}),e.exports=(o=d,((e,t,n,o)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let d of u(t))!i.call(e,d)&&d!==n&&r(e,d,{get:()=>t[d],enumerable:!(o=a(t,d))||o.enumerable});return e})(r({},"__esModule",{value:!0}),o));var c=l,s=(e,t)=>new Promise((n,o)=>{(document.head||document.body).appendChild(Object.assign(document.createElement("script"),t,{src:e,async:!0,onload:n,onerror:o}))});typeof document>"u"&&(s=()=>Promise.reject(new Error("load is not supported in nodejs")))},function(e,t,n){"use strict";n.r(t),n.d(t,"install",(function(){return d})),n.d(t,"VueDaumPostcode",(function(){return a}));var o=n(0);function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.scriptUrl||"//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js",n=Object(o.once)((function(){return Object(o.load)(t).then((function(){return new Promise((function(e){return window.daum.postcode.load(e)}))}))}));return{props:{q:{type:String,default:""},animation:{type:Boolean,default:!1},noAutoMapping:{type:Boolean,default:!1},noShorthand:{type:Boolean,default:!1},noSubmitMode:{type:Boolean,default:!1},pleaseReadGuide:{type:Number,default:0},pleaseReadGuideTimer:{type:Number,default:1.5},maxSuggestItems:{type:Number,default:10},showMoreHName:{type:Boolean,default:!1},hideMapBtn:{type:Boolean,default:!1},hideEngBtn:{type:Boolean,default:!1},alwaysShowEngAddr:{type:Boolean,default:!1},zonecodeOnly:{type:Boolean,default:!1},theme:{type:Object,default:function(){return{}}}},data:function(){return{styleHeight:0,isLoaded:!1}},mounted:function(){var e=this;n().then((function(){e.isLoaded=!0,e.$nextTick((function(){new window.daum.Postcode({width:"100%",height:"100%",animation:e.animation,autoMapping:!e.noAutoMapping,shorthand:!e.noShorthand,pleaseReadGuide:e.pleaseReadGuide,pleaseReadGuideTimer:e.pleaseReadGuideTimer,maxSuggestItems:e.maxSuggestItems,showMoreHName:e.showMoreHName,hideMapBtn:e.hideMapBtn,hideEngBtn:e.hideEngBtn,alwaysShowEngAddr:e.alwaysShowEngAddr,zonecodeOnly:e.zonecodeOnly,theme:e.theme,submitMode:!e.noSubmitMode,onsearch:function(t){e.$emit("search",t)},oncomplete:function(t){e.$emit("complete",t)},onresize:function(t){e.styleHeight="".concat(t.height,"px")}}).embed(e.$refs.container,{q:e.q,autoClose:!1}),e.$emit("load")}))})).catch((function(n){var o=new Error("Load ".concat(t," failed."));o.cause=n,e.$emit("error",o)}))},computed:{styles:function(){var e={};return e.height=this.styleHeight,e}},render:function(e){return e("div",{class:["vue-daum-postcode"]},this.isLoaded||!this.$slots.loading?[e("div",{class:["vue-daum-postcode-container"],ref:"container",style:this.styles})]:[e("div",{class:["vue-daum-postcode-loading"]},this.$slots.loading)])}}}var a=r(),u=["name"];function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.name,o=i(t,u);e.component(n||"vue-daum-postcode",Object.keys(o).length>0?r(o):a)}"undefined"!=typeof window&&window.Vue&&d(window.Vue);t.default={install:d}}])}));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&scoped=true& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_ca63be56_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_ca63be56_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_ca63be56_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=ca63be56&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=template&id=ca63be56&scoped=true&");


/***/ }),

/***/ "./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true& ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_ca63be56_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/shop/order/Edit.vue?vue&type=style&index=0&id=ca63be56&lang=css&scoped=true&");


/***/ })

}]);