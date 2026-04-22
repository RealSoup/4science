"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_admin_stats_behavior_Goods_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/stats/behavior/Goods.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/stats/behavior/Goods.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/http */ "./resources/js/api/http.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'BehaviorGoods',
  components: {
    'LoadingModal': function LoadingModal() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_LoadingModal_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/LoadingModal */ "./resources/js/views/_common/LoadingModal.vue"));
    }
  },
  props: ['selectedDate'],
  data: function data() {
    return {
      tableData: [],
      isLoadingModalViewed: true,
      sortKey: 'total_cnt',
      sortDir: 'desc',
      // [추가] 모바일 정렬 버튼용
      sortCols: [{
        key: 'total_cnt',
        label: '합계'
      }, {
        key: 'view_cnt',
        label: '조회'
      }, {
        key: 'cart_cnt',
        label: '장바구니'
      }, {
        key: 'estimate_cnt',
        label: '견적'
      }, {
        key: 'purchase_cnt',
        label: '구매'
      }]
    };
  },
  computed: {
    sortedData: function sortedData() {
      var _this = this;
      return _toConsumableArray(this.tableData).sort(function (a, b) {
        return _this.sortDir === 'desc' ? b[_this.sortKey] - a[_this.sortKey] : a[_this.sortKey] - b[_this.sortKey];
      });
    }
  },
  methods: {
    index: function index() {
      var _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var res;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this2.isLoadingModalViewed = true;
              _context.next = 3;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/admin/stats/behavior/goods', {
                params: _objectSpread(_objectSpread({}, _this2.selectedDate), {}, {
                  sort_key: _this2.sortKey,
                  sort_dir: _this2.sortDir
                })
              });
            case 3:
              res = _context.sent;
              if (res && res.status === 200) {
                _this2.tableData = res.data;
                _this2.isLoadingModalViewed = false;
              }
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    sortBy: function sortBy(key) {
      if (this.sortKey === key) {
        this.sortDir = this.sortDir === 'desc' ? 'asc' : 'desc';
      } else {
        this.sortKey = key;
        this.sortDir = 'desc';
      }
      this.index();
    },
    sortIcon: function sortIcon(key) {
      if (this.sortKey !== key) return '↕';
      return this.sortDir === 'desc' ? '↓' : '↑';
    }
  },
  mounted: function mounted() {
    this.index();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/stats/behavior/Goods.vue?vue&type=template&id=71a11328&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/stats/behavior/Goods.vue?vue&type=template&id=71a11328& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_vm.isLoadingModalViewed ? _c("loading-modal", {
    attrs: {
      position: "absolute"
    }
  }, [_vm._v("Loading ......")]) : _c("div", [_c("div", {
    staticClass: "d-none d-md-block"
  }, [_c("table", {
    staticClass: "table table-sm table-hover"
  }, [_c("thead", [_c("tr", [_c("th", [_vm._v("순위")]), _vm._v(" "), _c("th", [_vm._v("상품명")]), _vm._v(" "), _c("th", {
    staticStyle: {
      cursor: "pointer"
    },
    on: {
      click: function click($event) {
        return _vm.sortBy("view_cnt");
      }
    }
  }, [_vm._v("조회(체류/재방문) " + _vm._s(_vm.sortIcon("view_cnt")))]), _vm._v(" "), _c("th", {
    staticStyle: {
      cursor: "pointer"
    },
    on: {
      click: function click($event) {
        return _vm.sortBy("cart_cnt");
      }
    }
  }, [_vm._v("장바구니 " + _vm._s(_vm.sortIcon("cart_cnt")))]), _vm._v(" "), _c("th", {
    staticStyle: {
      cursor: "pointer"
    },
    on: {
      click: function click($event) {
        return _vm.sortBy("estimate_cnt");
      }
    }
  }, [_vm._v("견적 " + _vm._s(_vm.sortIcon("estimate_cnt")))]), _vm._v(" "), _c("th", {
    staticStyle: {
      cursor: "pointer"
    },
    on: {
      click: function click($event) {
        return _vm.sortBy("purchase_cnt");
      }
    }
  }, [_vm._v("구매 " + _vm._s(_vm.sortIcon("purchase_cnt")))]), _vm._v(" "), _c("th", {
    staticStyle: {
      cursor: "pointer"
    },
    on: {
      click: function click($event) {
        return _vm.sortBy("total_cnt");
      }
    }
  }, [_vm._v("합계 " + _vm._s(_vm.sortIcon("total_cnt")))])])]), _vm._v(" "), _c("tbody", _vm._l(_vm.sortedData, function (row, i) {
    return _c("tr", {
      key: i
    }, [_c("td", [_vm._v(_vm._s(i + 1))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(row.ubl_keyword))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(row.view_cnt) + "(" + _vm._s(row.dwell_cnt) + "/" + _vm._s(row.revisit_cnt) + ")")]), _vm._v(" "), _c("td", [_vm._v(_vm._s(row.cart_cnt))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(row.estimate_cnt))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(row.purchase_cnt))]), _vm._v(" "), _c("td", [_c("strong", [_vm._v(_vm._s(row.total_cnt))])])]);
  }), 0)])]), _vm._v(" "), _c("div", {
    staticClass: "d-md-none"
  }, [_c("div", {
    staticClass: "d-flex gap-2 mb-3 flex-wrap"
  }, _vm._l(_vm.sortCols, function (col) {
    return _c("button", {
      key: col.key,
      staticClass: "btn btn-sm",
      "class": _vm.sortKey === col.key ? "btn-primary" : "btn-outline-secondary",
      on: {
        click: function click($event) {
          return _vm.sortBy(col.key);
        }
      }
    }, [_vm._v("\r\n                    " + _vm._s(col.label) + " " + _vm._s(_vm.sortIcon(col.key)) + "\r\n                ")]);
  }), 0), _vm._v(" "), _vm._l(_vm.sortedData, function (row, i) {
    return _c("div", {
      key: i,
      staticClass: "card mb-2"
    }, [_c("div", {
      staticClass: "card-body py-2 px-3"
    }, [_c("div", {
      staticClass: "d-flex align-items-start gap-2 mb-2"
    }, [_c("span", {
      staticClass: "badge bg-secondary rounded-circle",
      staticStyle: {
        "min-width": "24px",
        height: "24px",
        "line-height": "16px",
        "flex-shrink": "0"
      }
    }, [_vm._v(_vm._s(i + 1))]), _vm._v(" "), _c("span", {
      staticClass: "fw-500",
      staticStyle: {
        "font-size": "13px",
        "line-height": "1.4"
      }
    }, [_vm._v(_vm._s(row.ubl_keyword))])]), _vm._v(" "), _c("div", {
      staticClass: "row g-1 text-center",
      staticStyle: {
        "font-size": "12px"
      }
    }, [_c("div", {
      staticClass: "col-6"
    }, [_c("div", {
      staticClass: "bg-light rounded p-1"
    }, [_c("div", {
      staticClass: "text-muted"
    }, [_vm._v("조회")]), _vm._v(" "), _c("div", {
      staticClass: "fw-bold"
    }, [_vm._v(_vm._s(row.view_cnt) + " "), _c("small", {
      staticClass: "text-muted"
    }, [_vm._v("(" + _vm._s(row.dwell_cnt) + "/" + _vm._s(row.revisit_cnt) + ")")])])])]), _vm._v(" "), _c("div", {
      staticClass: "col-6"
    }, [_c("div", {
      staticClass: "bg-light rounded p-1"
    }, [_c("div", {
      staticClass: "text-muted"
    }, [_vm._v("장바구니")]), _vm._v(" "), _c("div", {
      staticClass: "fw-bold"
    }, [_vm._v(_vm._s(row.cart_cnt))])])]), _vm._v(" "), _c("div", {
      staticClass: "col-6"
    }, [_c("div", {
      staticClass: "bg-light rounded p-1"
    }, [_c("div", {
      staticClass: "text-muted"
    }, [_vm._v("견적")]), _vm._v(" "), _c("div", {
      staticClass: "fw-bold"
    }, [_vm._v(_vm._s(row.estimate_cnt))])])]), _vm._v(" "), _c("div", {
      staticClass: "col-6"
    }, [_c("div", {
      staticClass: "bg-light rounded p-1"
    }, [_c("div", {
      staticClass: "text-muted"
    }, [_vm._v("구매")]), _vm._v(" "), _c("div", {
      staticClass: "fw-bold"
    }, [_vm._v(_vm._s(row.purchase_cnt))])])])]), _vm._v(" "), _c("div", {
      staticClass: "mt-2"
    }, [_c("span", {
      staticClass: "badge bg-primary"
    }, [_vm._v("합계 " + _vm._s(row.total_cnt))])])])]);
  })], 2)])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/views/admin/stats/behavior/Goods.vue":
/*!***********************************************************!*\
  !*** ./resources/js/views/admin/stats/behavior/Goods.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Goods_vue_vue_type_template_id_71a11328___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Goods.vue?vue&type=template&id=71a11328& */ "./resources/js/views/admin/stats/behavior/Goods.vue?vue&type=template&id=71a11328&");
/* harmony import */ var _Goods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Goods.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/stats/behavior/Goods.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Goods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Goods_vue_vue_type_template_id_71a11328___WEBPACK_IMPORTED_MODULE_0__.render,
  _Goods_vue_vue_type_template_id_71a11328___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/stats/behavior/Goods.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/stats/behavior/Goods.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/views/admin/stats/behavior/Goods.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Goods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Goods.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/stats/behavior/Goods.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Goods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/stats/behavior/Goods.vue?vue&type=template&id=71a11328&":
/*!******************************************************************************************!*\
  !*** ./resources/js/views/admin/stats/behavior/Goods.vue?vue&type=template&id=71a11328& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Goods_vue_vue_type_template_id_71a11328___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Goods_vue_vue_type_template_id_71a11328___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Goods_vue_vue_type_template_id_71a11328___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Goods.vue?vue&type=template&id=71a11328& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/stats/behavior/Goods.vue?vue&type=template&id=71a11328&");


/***/ })

}]);