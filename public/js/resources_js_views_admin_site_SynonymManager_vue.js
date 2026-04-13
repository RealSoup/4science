"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_admin_site_SynonymManager_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/site/SynonymManager.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/site/SynonymManager.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/http */ "./resources/js/api/http.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      newSynonym: '',
      searchKeyword: '',
      totalCount: 0,
      synonymList: [],
      currentPage: 1,
      lastPage: 1,
      perPage: 50,
      editId: null,
      editKeyword: ''
    };
  },
  computed: {
    pageNumbers: function pageNumbers() {
      var range = 5;
      var start = Math.max(1, this.currentPage - Math.floor(range / 2));
      var end = Math.min(this.lastPage, start + range - 1);
      if (end - start < range - 1) start = Math.max(1, end - range + 1);
      var pages = [];
      for (var i = start; i <= end; i++) pages.push(i);
      return pages;
    }
  },
  methods: {
    fetchList: function fetchList() {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var res;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/admin/site/synonym', {
                params: {
                  page: _this.currentPage,
                  search: _this.searchKeyword
                }
              });
            case 2:
              res = _context.sent;
              _this.synonymList = res.data.list;
              _this.totalCount = res.data.total;
              _this.lastPage = res.data.last_page;
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    saveSynonym: function saveSynonym() {
      var _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (_this2.newSynonym.trim()) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return", alert('동의어를 입력해주세요.'));
            case 2:
              _context2.next = 4;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/admin/site/synonym', {
                keywords: _this2.newSynonym
              });
            case 4:
              _this2.newSynonym = '';
              _this2.fetchList();
              alert('저장됐습니다! ES 반영 버튼을 눌러야 검색에 적용됩니다.');
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    saveAndReload: function saveAndReload() {
      var _this3 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (_this3.newSynonym.trim()) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return", alert('동의어를 입력해주세요.'));
            case 2:
              _context3.next = 4;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/admin/site/synonym', {
                keywords: _this3.newSynonym
              });
            case 4:
              _this3.newSynonym = '';
              _context3.next = 7;
              return _this3.reloadES();
            case 7:
              _this3.fetchList();
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    deleteSynonym: function deleteSynonym(item) {
      var _this4 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (confirm('삭제하시겠어요?')) {
                _context4.next = 2;
                break;
              }
              return _context4.abrupt("return");
            case 2:
              _context4.next = 4;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"]("/api/admin/site/synonym/".concat(item.id), {
                data: {
                  keyword: item.raw
                }
              });
            case 4:
              _this4.fetchList();
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    reloadES: function reloadES() {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/admin/site/synonym/reload');
            case 2:
              alert('ES 동의어가 반영됐습니다!');
            case 3:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    },
    startEdit: function startEdit(item) {
      this.editId = item.id;
      this.editKeyword = item.raw;
    },
    cancelEdit: function cancelEdit() {
      this.editId = null;
      this.editKeyword = '';
    },
    updateSynonym: function updateSynonym(item) {
      var _this5 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (_this5.editKeyword.trim()) {
                _context6.next = 2;
                break;
              }
              return _context6.abrupt("return", alert('동의어를 입력해주세요.'));
            case 2:
              _context6.next = 4;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].put("/api/admin/site/synonym/".concat(item.id), {
                keyword: _this5.editKeyword,
                old_keyword: item.raw
              });
            case 4:
              _this5.editId = null;
              _this5.editKeyword = '';
              _this5.fetchList();
            case 7:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    },
    changePage: function changePage(page) {
      if (page < 1 || page > this.lastPage) return;
      this.currentPage = page;
      this.fetchList();
    },
    onSearch: function onSearch() {
      this.currentPage = 1;
      this.fetchList();
    }
  },
  mounted: function mounted() {
    this.fetchList();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/site/SynonymManager.vue?vue&type=template&id=6adb512a&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/site/SynonymManager.vue?vue&type=template&id=6adb512a&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "synonym-wrap"
  }, [_c("h2", {
    staticClass: "page-title"
  }, [_vm._v("동의어 관리")]), _vm._v(" "), _c("div", {
    staticClass: "card"
  }, [_c("div", {
    staticClass: "status-row"
  }, [_c("span", {
    staticClass: "status-badge"
  }, [_c("span", {
    staticClass: "dot"
  }), _vm._v("\n                ES 동의어 적용 중 · " + _vm._s(_vm.totalCount) + "개 등록됨\n            ")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-reload",
    on: {
      click: _vm.reloadES
    }
  }, [_vm._v("\n                🔄 ES 동의어 즉시 반영\n            ")])])]), _vm._v(" "), _c("div", {
    staticClass: "card"
  }, [_c("p", {
    staticClass: "card-title"
  }, [_vm._v("동의어 추가")]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("동의어 목록 (쉼표로 구분)")]), _vm._v(" "), _c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.newSynonym,
      expression: "newSynonym"
    }],
    staticClass: "form-textarea",
    attrs: {
      placeholder: "예) 피펫, 피벳, 피페트, pipette, pipet"
    },
    domProps: {
      value: _vm.newSynonym
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.newSynonym = $event.target.value;
      }
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "hint"
  }, [_vm._v("쉼표로 구분하여 입력하세요.")])]), _vm._v(" "), _c("div", {
    staticClass: "btn-row"
  }, [_c("button", {
    staticClass: "btn btn-primary",
    on: {
      click: _vm.saveSynonym
    }
  }, [_vm._v("저장")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-reload-sm",
    on: {
      click: _vm.saveAndReload
    }
  }, [_vm._v("저장 + 즉시 반영")])])]), _vm._v(" "), _c("div", {
    staticClass: "card"
  }, [_c("p", {
    staticClass: "card-title"
  }, [_vm._v("등록된 동의어 목록 (총 " + _vm._s(_vm.totalCount) + "개)")]), _vm._v(" "), _c("div", {
    staticClass: "search-row"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.searchKeyword,
      expression: "searchKeyword"
    }],
    staticClass: "search-input",
    attrs: {
      placeholder: "키워드 검색..."
    },
    domProps: {
      value: _vm.searchKeyword
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        return _vm.onSearch.apply(null, arguments);
      },
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.searchKeyword = $event.target.value;
      }
    }
  }), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary",
    on: {
      click: _vm.onSearch
    }
  }, [_vm._v("검색")])]), _vm._v(" "), _c("table", {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _c("tbody", _vm._l(_vm.synonymList, function (item, index) {
    return _c("tr", {
      key: index
    }, [_c("td", [_vm._v(_vm._s((_vm.currentPage - 1) * _vm.perPage + index + 1))]), _vm._v(" "), _c("td", [_vm.editId === item.id ? _c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.editKeyword,
        expression: "editKeyword"
      }],
      staticClass: "form-input",
      staticStyle: {
        width: "100%"
      },
      domProps: {
        value: _vm.editKeyword
      },
      on: {
        input: function input($event) {
          if ($event.target.composing) return;
          _vm.editKeyword = $event.target.value;
        }
      }
    }) : _c("div", {
      staticClass: "keyword-chips"
    }, _vm._l(item.keywords, function (kw, i) {
      return _c("span", {
        key: i,
        staticClass: "chip"
      }, [_vm._v(_vm._s(kw))]);
    }), 0)]), _vm._v(" "), _c("td", [_vm.editId === item.id ? [_c("button", {
      staticClass: "btn btn-primary",
      on: {
        click: function click($event) {
          return _vm.updateSynonym(item);
        }
      }
    }, [_vm._v("저장")]), _vm._v(" "), _c("button", {
      staticClass: "btn btn-cancel",
      on: {
        click: _vm.cancelEdit
      }
    }, [_vm._v("취소")])] : [_c("button", {
      staticClass: "btn btn-edit",
      on: {
        click: function click($event) {
          return _vm.startEdit(item);
        }
      }
    }, [_vm._v("수정")]), _vm._v(" "), _c("button", {
      staticClass: "btn btn-danger",
      on: {
        click: function click($event) {
          return _vm.deleteSynonym(item);
        }
      }
    }, [_vm._v("삭제")])]], 2)]);
  }), 0)]), _vm._v(" "), _vm.lastPage > 1 ? _c("div", {
    staticClass: "pagination"
  }, [_c("button", {
    staticClass: "page-btn",
    attrs: {
      disabled: _vm.currentPage === 1
    },
    on: {
      click: function click($event) {
        return _vm.changePage(1);
      }
    }
  }, [_vm._v("❮❮")]), _vm._v(" "), _c("button", {
    staticClass: "page-btn",
    attrs: {
      disabled: _vm.currentPage === 1
    },
    on: {
      click: function click($event) {
        return _vm.changePage(_vm.currentPage - 1);
      }
    }
  }, [_vm._v("❮")]), _vm._v(" "), _vm._l(_vm.pageNumbers, function (page) {
    return _c("button", {
      key: page,
      staticClass: "page-btn",
      "class": {
        active: page === _vm.currentPage
      },
      on: {
        click: function click($event) {
          return _vm.changePage(page);
        }
      }
    }, [_vm._v(_vm._s(page))]);
  }), _vm._v(" "), _c("button", {
    staticClass: "page-btn",
    attrs: {
      disabled: _vm.currentPage === _vm.lastPage
    },
    on: {
      click: function click($event) {
        return _vm.changePage(_vm.currentPage + 1);
      }
    }
  }, [_vm._v("❯")]), _vm._v(" "), _c("button", {
    staticClass: "page-btn",
    attrs: {
      disabled: _vm.currentPage === _vm.lastPage
    },
    on: {
      click: function click($event) {
        return _vm.changePage(_vm.lastPage);
      }
    }
  }, [_vm._v("❯❯")])], 2) : _vm._e()])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", [_vm._v("#")]), _vm._v(" "), _c("th", [_vm._v("동의어 그룹")]), _vm._v(" "), _c("th", [_vm._v("관리")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/site/SynonymManager.vue?vue&type=style&index=0&id=6adb512a&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/site/SynonymManager.vue?vue&type=style&index=0&id=6adb512a&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.synonym-wrap[data-v-6adb512a] { padding: 24px;\n}\n.page-title[data-v-6adb512a] { font-size: 20px; font-weight: 500; margin-bottom: 20px;\n}\n.card[data-v-6adb512a] { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 16px;\n}\n.card-title[data-v-6adb512a] { font-size: 14px; font-weight: 500; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;\n}\n.status-row[data-v-6adb512a] { display: flex; justify-content: space-between; align-items: center;\n}\n.status-badge[data-v-6adb512a] { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #0F6E56; background: #E1F5EE; padding: 6px 12px; border-radius: 20px;\n}\n.dot[data-v-6adb512a] { width: 6px; height: 6px; border-radius: 50%; background: #1D9E75; display: inline-block;\n}\n.form-group[data-v-6adb512a] { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px;\n}\n.form-label[data-v-6adb512a] { font-size: 12px; color: #6b7280;\n}\n.form-textarea[data-v-6adb512a] { padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; resize: vertical; min-height: 70px; width: 100%; outline: none; font-family: inherit;\n}\n.form-textarea[data-v-6adb512a]:focus { border-color: #1D9E75;\n}\n.hint[data-v-6adb512a] { font-size: 11px; color: #9ca3af;\n}\n.btn-row[data-v-6adb512a] { display: flex; gap: 8px;\n}\n.btn[data-v-6adb512a] { padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: none; transition: opacity 0.15s;\n}\n.btn[data-v-6adb512a]:hover { opacity: 0.85;\n}\n.btn-primary[data-v-6adb512a] { background: #1D9E75; color: #fff;\n}\n.btn-reload[data-v-6adb512a] { background: #378ADD; color: #fff;\n}\n.btn-reload-sm[data-v-6adb512a] { background: #378ADD; color: #fff; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: none;\n}\n.btn-danger[data-v-6adb512a] { background: #E24B4A; color: #fff; padding: 5px 10px; font-size: 12px; border-radius: 6px; cursor: pointer; border: none;\n}\n.btn-edit[data-v-6adb512a] { background: #6b7280; color: #fff; padding: 5px 10px; font-size: 12px; border-radius: 6px; cursor: pointer; border: none; margin-right: 4px;\n}\n.btn-cancel[data-v-6adb512a] { background: #9ca3af; color: #fff; padding: 5px 10px; font-size: 12px; border-radius: 6px; cursor: pointer; border: none; margin-left: 4px;\n}\n.form-input[data-v-6adb512a] { padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; outline: none;\n}\n.form-input[data-v-6adb512a]:focus { border-color: #1D9E75;\n}\n.search-row[data-v-6adb512a] { display: flex; gap: 8px; margin-bottom: 14px;\n}\n.search-input[data-v-6adb512a] { width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; outline: none;\n}\n.search-input[data-v-6adb512a]:focus { border-color: #1D9E75;\n}\n.search-row .btn[data-v-6adb512a] { white-space: nowrap; padding: 8px 16px; min-width: 60px;\n}\n.table[data-v-6adb512a] { width: 100%; border-collapse: collapse; font-size: 13px;\n}\n.table th[data-v-6adb512a] { font-size: 12px; font-weight: 500; color: #6b7280; padding: 8px 10px; text-align: left; border-bottom: 1px solid #e5e7eb; background: #f9fafb;\n}\n.table td[data-v-6adb512a] { padding: 10px; border-bottom: 1px solid #e5e7eb; vertical-align: middle;\n}\n.table tr:last-child td[data-v-6adb512a] { border-bottom: none;\n}\n.table tr:hover td[data-v-6adb512a] { background: #f9fafb;\n}\n.keyword-chips[data-v-6adb512a] { display: flex; flex-wrap: wrap; gap: 4px;\n}\n.chip[data-v-6adb512a] { display: inline-block; padding: 2px 8px; background: #E1F5EE; color: #085041; border-radius: 4px; font-size: 11px;\n}\n.pagination[data-v-6adb512a] { display: flex; justify-content: center; align-items: center; gap: 4px; margin-top: 16px;\n}\n.page-btn[data-v-6adb512a] { padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; background: #fff; font-size: 13px; cursor: pointer;\n}\n.page-btn[data-v-6adb512a]:hover:not(:disabled) { background: #f3f4f6;\n}\n.page-btn[data-v-6adb512a]:disabled { opacity: 0.4; cursor: not-allowed;\n}\n.page-btn.active[data-v-6adb512a] { background: #1D9E75; color: #fff; border-color: #1D9E75;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/site/SynonymManager.vue?vue&type=style&index=0&id=6adb512a&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/site/SynonymManager.vue?vue&type=style&index=0&id=6adb512a&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SynonymManager_vue_vue_type_style_index_0_id_6adb512a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SynonymManager.vue?vue&type=style&index=0&id=6adb512a&scoped=true&lang=css& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/site/SynonymManager.vue?vue&type=style&index=0&id=6adb512a&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SynonymManager_vue_vue_type_style_index_0_id_6adb512a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SynonymManager_vue_vue_type_style_index_0_id_6adb512a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/admin/site/SynonymManager.vue":
/*!**********************************************************!*\
  !*** ./resources/js/views/admin/site/SynonymManager.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SynonymManager_vue_vue_type_template_id_6adb512a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SynonymManager.vue?vue&type=template&id=6adb512a&scoped=true& */ "./resources/js/views/admin/site/SynonymManager.vue?vue&type=template&id=6adb512a&scoped=true&");
/* harmony import */ var _SynonymManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SynonymManager.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/site/SynonymManager.vue?vue&type=script&lang=js&");
/* harmony import */ var _SynonymManager_vue_vue_type_style_index_0_id_6adb512a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SynonymManager.vue?vue&type=style&index=0&id=6adb512a&scoped=true&lang=css& */ "./resources/js/views/admin/site/SynonymManager.vue?vue&type=style&index=0&id=6adb512a&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SynonymManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SynonymManager_vue_vue_type_template_id_6adb512a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _SynonymManager_vue_vue_type_template_id_6adb512a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "6adb512a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/site/SynonymManager.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/site/SynonymManager.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/views/admin/site/SynonymManager.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SynonymManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SynonymManager.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/site/SynonymManager.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SynonymManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/site/SynonymManager.vue?vue&type=template&id=6adb512a&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/views/admin/site/SynonymManager.vue?vue&type=template&id=6adb512a&scoped=true& ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SynonymManager_vue_vue_type_template_id_6adb512a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SynonymManager_vue_vue_type_template_id_6adb512a_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SynonymManager_vue_vue_type_template_id_6adb512a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SynonymManager.vue?vue&type=template&id=6adb512a&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/site/SynonymManager.vue?vue&type=template&id=6adb512a&scoped=true&");


/***/ }),

/***/ "./resources/js/views/admin/site/SynonymManager.vue?vue&type=style&index=0&id=6adb512a&scoped=true&lang=css&":
/*!*******************************************************************************************************************!*\
  !*** ./resources/js/views/admin/site/SynonymManager.vue?vue&type=style&index=0&id=6adb512a&scoped=true&lang=css& ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SynonymManager_vue_vue_type_style_index_0_id_6adb512a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SynonymManager.vue?vue&type=style&index=0&id=6adb512a&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/site/SynonymManager.vue?vue&type=style&index=0&id=6adb512a&scoped=true&lang=css&");


/***/ })

}]);