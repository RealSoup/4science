"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[5627],{

/***/ 31898:
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/engReform/Create.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/http */ 79481);
/* harmony import */ var _option_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./option.js */ 87861);
/* harmony import */ var _views_common_FileUpload_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/views/_common/FileUpload.vue */ 41801);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    'file-upload': _views_common_FileUpload_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    'validation': function validation() {
      return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/Validation.vue */ 99812));
    },
    'loading-modal': function loadingModal() {
      return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/LoadingModal.vue */ 16333));
    },
    'modal': function modal() {
      return __webpack_require__.e(/*! import() */ 5773).then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/Modal */ 45773));
    }
  },
  watch: {
    'frm.er_branch_key': function frmEr_branch_key() {
      this.frm.er_editor = '';
    }
  },
  data: function data() {
    return {
      frm: {
        er_type: '1',
        er_format: 'NFM',
        er_use: '',
        er_branch: '',
        er_branch_key: 0,
        er_branch_sub: '',
        er_eng_style: 'AM',
        file_info_work: [],
        file_info_ref: [],
        agree: 'Y'
      },
      isLoadingModalViewed: false,
      use_opt: _option_js__WEBPACK_IMPORTED_MODULE_1__.use_opt,
      branch_opt: _option_js__WEBPACK_IMPORTED_MODULE_1__.branch_opt,
      editor_opt: _option_js__WEBPACK_IMPORTED_MODULE_1__.editor_opt,
      email_domain: [],
      email_domain_slt_idx: 0,
      isModalViewed: false,
      option: {
        er_branch_sub: []
      }
    };
  },
  methods: {
    store: function store() {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var res;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.frm.er_branch = _this.option.er_branch[_this.frm.er_branch_key];
              _this.frm.er_email = "".concat(_this.frm.er_email01, "@").concat(_this.frm.er_email02);
              if (!isEmpty(_this.frm.er_dlvy_at)) {
                _context.next = 6;
                break;
              }
              Notify.toast('danger', "납기일을 입력하세요.");
              document.getElementById('er_dlvy_at').focus();
              return _context.abrupt("return", false);
            case 6:
              if (!(isEmpty(_this.frm.er_journal_url) && _this.frm.er_format == 'FM')) {
                _context.next = 10;
                break;
              }
              Notify.toast('danger', "저널 URL을 입력하세요.");
              document.getElementById('er_journal_url').focus();
              return _context.abrupt("return", false);
            case 10:
              if (!isEmpty(_this.frm.er_use)) {
                _context.next = 14;
                break;
              }
              Notify.toast('danger', "문서 용도를 선택하세요.");
              document.getElementById('er_use').focus();
              return _context.abrupt("return", false);
            case 14:
              if (!isEmpty(_this.frm.er_branch)) {
                _context.next = 18;
                break;
              }
              Notify.toast('danger', "학문 분야를 선택하세요.");
              document.getElementById('er_branch').focus();
              return _context.abrupt("return", false);
            case 18:
              if (!isEmpty(_this.frm.er_branch_sub)) {
                _context.next = 22;
                break;
              }
              Notify.toast('danger', "상세 학문분야를 선택하세요.");
              document.getElementById('er_branch_sub').focus();
              return _context.abrupt("return", false);
            case 22:
              if (!isEmpty(_this.frm.er_eng_style)) {
                _context.next = 26;
                break;
              }
              Notify.toast('danger', "언어 스타일을 선택하세요.");
              document.getElementById('er_eng_style').focus();
              return _context.abrupt("return", false);
            case 26:
              if (!isEmpty(_this.frm.file_info_work)) {
                _context.next = 30;
                break;
              }
              Notify.toast('danger', "작업문서를 업로드하세요");
              document.getElementById('er_eng_style').focus();
              return _context.abrupt("return", false);
            case 30:
              _this.isLoadingModalViewed = true;
              _context.next = 33;
              return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/engReform", _this.frm);
            case 33:
              res = _context.sent;
              if (!(res && res.status === 200)) {
                _context.next = 41;
                break;
              }
              _context.next = 37;
              return _this.$refs.fileupload1.fileProcessor(res.data.er_id);
            case 37:
              _context.next = 39;
              return _this.$refs.fileupload2.fileProcessor(res.data.er_id);
            case 39:
              _this.isLoadingModalViewed = false;
              _this.$router.push({
                name: 'my_eng_reform_index'
              });
            case 41:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    email_domain_slt: function email_domain_slt() {
      this.frm.er_email02 = this.email_domain[this.email_domain_slt_idx];
    },
    focusNext: function focusNext(e, max, next) {
      this.$focusNext(e, max, next);
    },
    maxlength_3: function maxlength_3(e) {
      return String(e).substring(0, 3);
    },
    maxlength_4: function maxlength_4(e) {
      return String(e).substring(0, 4);
    }
  },
  mounted: function mounted() {
    var _this2 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var res, opt, er_email;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/user/getEmailDomain");
          case 2:
            res = _context2.sent;
            if (res && res.status === 200) _this2.email_domain = res.data;
            _context2.next = 6;
            return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/engReform/getOption");
          case 6:
            opt = _context2.sent;
            if (opt && opt.status === 200) _this2.option = opt.data;
            er_email = Auth.user().email.split('@');
            _this2.frm.er_name = Auth.user().name;
            _this2.frm.er_hp = Auth.user().hp;
            _this2.frm.er_email01 = er_email[0];
            _this2.frm.er_email02 = er_email[1];
            _this2.frm.er_company = Auth.user().company;
          case 14:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
});

/***/ }),

/***/ 97641:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/engReform/Create.vue?vue&type=template&id=5d903260&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("b-container", {
    staticClass: "w_fence",
    attrs: {
      id: "engReform"
    }
  }, [_c("h3", {
    staticClass: "btn_box"
  }, [_vm._v("영문교정 "), _c("b-button", {
    staticClass: "blue lg",
    attrs: {
      href: "/engReform/create#engReform_form_od_top"
    }
  }, [_vm._v("영문 교정 신청하기")])], 1), _vm._v(" "), _c("b-row", [_c("b-col", [_c("table", {
    staticClass: "tbl01 t01 strong",
    attrs: {
      width: "100%",
      cellpadding: "0",
      cellspacing: "0",
      border: "1"
    }
  }, [_c("tbody", [_c("tr", [_c("th", [_vm._v("서비스내용")]), _vm._v(" "), _c("td", {
    staticClass: "other",
    attrs: {
      colspan: "5"
    }
  }, [_vm._v("영어논문교정, 기업용브로셔, 홍보문서, E-mail, 계약서 등 각종 영어문서")])]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("파일서식")]), _vm._v(" "), _c("td", {
    staticClass: "other",
    attrs: {
      colspan: "5"
    }
  }, [_vm._v("MS word 파일, 텍스트 파일")])]), _vm._v(" "), _c("tr", [_c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v("일반 교정"), _c("p", [_vm._v("(부가세포함)")])]), _vm._v(" "), _c("td", {
    staticClass: "bg1"
  }, [_vm._v("소요 기간")]), _vm._v(" "), _c("td", {
    staticClass: "bg2"
  }, [_vm._v("1~2일")]), _vm._v(" "), _c("td", {
    staticClass: "bg2"
  }, [_vm._v("3~4일")]), _vm._v(" "), _c("td", {
    staticClass: "bg2"
  }, [_vm._v("5~6일")]), _vm._v(" "), _c("td", {
    staticClass: "bg2"
  }, [_vm._v("7~8일")])]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "bg1"
  }, [_vm._v("페이지 단가")]), _vm._v(" "), _c("td", [_vm._v("18,700원")]), _vm._v(" "), _c("td", [_vm._v("16,500원")]), _vm._v(" "), _c("td", [_vm._v("14,300원")]), _vm._v(" "), _c("td", [_vm._v("13,200원")])]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("프리미엄 교정")]), _vm._v(" "), _c("td", {
    staticClass: "bg1"
  }, [_vm._v("페이지 단가")]), _vm._v(" "), _c("td", {
    staticClass: "bg2"
  }), _vm._v(" "), _c("td", [_vm._v("29,700원")]), _vm._v(" "), _c("td", {
    attrs: {
      colspan: "2"
    }
  }, [_vm._v("논문")])]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("프리미엄 플러스 교정")]), _vm._v(" "), _c("td", {
    staticClass: "bg1"
  }, [_vm._v("페이지 단가")]), _vm._v(" "), _c("td", {
    staticClass: "bg2"
  }), _vm._v(" "), _c("td", [_vm._v("33,000원")]), _vm._v(" "), _c("td", {
    attrs: {
      colspan: "2"
    }
  }, [_vm._v("논문 + 저널답변서 교정 포함")])])])]), _vm._v(" "), _c("ol", {
    staticClass: "num_list"
  }, [_c("li", [_vm._v("- 부가세 포함 가격입니다.")]), _vm._v(" "), _c("li", [_vm._v("- "), _c("b", [_vm._v("1page = 영문 200단어")]), _vm._v("를 기준합니다.")]), _vm._v(" "), _c("li", [_vm._v("- 페이지 수에 따라 납품기일이 다소 변경될 수 있습니다.")])])])], 1), _vm._v(" "), _c("b-row", [_c("b-col", [_c("h5", [_vm._v("◈  서비스 내용")]), _vm._v(" "), _c("table", {
    staticClass: "tbl01",
    attrs: {
      cellpadding: "0",
      cellspacing: "0",
      border: "1"
    }
  }, [_c("colgroup", [_c("col", {
    attrs: {
      width: "50%"
    }
  }), _vm._v(" "), _c("col", {
    attrs: {
      width: "50%"
    }
  })]), _vm._v(" "), _c("tbody", [_c("tr", [_c("th", {
    staticClass: "h40"
  }, [_vm._v("일반 교정")]), _vm._v(" "), _c("th", {
    staticClass: "h40"
  }, [_vm._v("프리미엄 교정")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("경제적인 가격으로 영어문서 집필과정에서 필요한 모든 교정 커버")]), _vm._v(" "), _c("td", [_vm._v("논문 문장 및 문단 구조와 흐름, 논리 체계")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("문법, 맞춤법, 오타")]), _vm._v(" "), _c("td", [_vm._v("문법, 맞춤법 및 오타 점검")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("단어수 무료 축소 10%")]), _vm._v(" "), _c("td", [_vm._v("단어수 무료 축소 20%")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("레퍼런스 일관성 점검")]), _vm._v(" "), _c("td", [_vm._v("레퍼런스 일관성 및 정확성 체크")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("저널 가이드라인 포맷팅")]), _vm._v(" "), _c("td", [_vm._v("저널 가이드라인 포맷팅")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("재교정시 50% 할인 적용"), _c("br"), _c("span", [_vm._v("(논문을 광범위하게 수정을 하지 않은 경우. 예를 들어, 수정 사항이 50% 이하인 전체교정의 경우)")])]), _vm._v(" "), _c("td", [_vm._v("논문 수정까지 고려하신다면 무료 재교정"), _c("br"), _c("span", [_vm._v("(수정된 문서의 글자 수가 원본보다 20% 이상 증가하지 않은 경우 재교정 무료)")])])])])])])], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("div", {
    staticClass: "style01"
  }, [_c("div", {
    staticClass: "circle"
  }, [_vm._v("일반 교정")]), _vm._v(" "), _c("p", [_vm._v("\r\n            영어 논문의 자연스러운 문장, 표현이나 문법, 구두점의 오류 등 영어 문서 집필 과정에서 필요한 모든 교정을 커버하며, \r\n            비영어권 고객과 영어권 고객 묻에게 유용합니다.\r\n        ")]), _vm._v(" "), _c("p", [_vm._v("\r\n            문서 크기에 따라 유연한 납품기일 선택이 가능합니다. \r\n            저널 무료 포맷팅은 교정 서비스에 포함되는 부분에 한하여 1회 무료입니다.\r\n        ")]), _vm._v(" "), _c("p", {
    staticClass: "point"
  }, [_vm._v("\r\n            합리적인 가격으로 영어 문서 집필 과정에서 필요한 모든 교정을 커버하고자 하는 분들을 위한 서비스입니다.\r\n        ")]), _vm._v(" "), _c("hr"), _vm._v(" "), _c("ul", [_c("li", [_vm._v("- 515개 분야 석박사 원어민 에디터의 논문 1차 교정 후 숙련된 리뷰어의 2차 교정까지 포함되어 있습니다.")]), _vm._v(" "), _c("li", [_vm._v("- 요청시 에디티지 인증서 및 무료 저널 양식 맞춤 서비스를 제공합니다.")]), _vm._v(" "), _c("li", [_vm._v("- 빠른 납기일을 제공하고 있습니다.")]), _vm._v(" "), _c("li", [_vm._v("- 재교정 작업에 대해 할인을 받으실 수 있습니다. (문서 전체 재교정 의뢰시)")])])]), _vm._v(" "), _c("div", {
    staticClass: "style01 premium"
  }, [_c("div", {
    staticClass: "circle"
  }, [_vm._v("프리미엄 교정")]), _vm._v(" "), _c("p", [_vm._v("영문 교정 후 1년 이내 무료 재교정 서비스 및 논문 구성, 의미, 논리성 등을 포함해 인상적인 원고로 교정해 드립니다.")]), _vm._v(" "), _c("p", [_vm._v("저널 투고 논문 교정에 만전을 기하고 싶은 분에게 최적의 서비스입니다.")]), _vm._v(" "), _c("p", {
    staticClass: "point"
  }, [_vm._v("저널 무료 포맷팅은 교정서비스에 포함되는 분분에 한하여 1회 무료입니다.")]), _vm._v(" "), _c("hr"), _vm._v(" "), _c("ul", [_c("li", [_vm._v("- 515개 분야 석박사 원어민 에디터의 논문 1차 교정 후 숙련된 리뷰어의 2차 교정까지 포함되어 있습니다.")]), _vm._v(" "), _c("li", [_vm._v("- 에디터 중에서도 경험이 풍부한 에디터분들로 프리미엄 교정팀이 구성되어 있습니다.")]), _vm._v(" "), _c("li", [_vm._v("- 원고에 대한 심도 깊은 검토로 영어 언어적 측면 뿐 아니라 구성, 의미, 논리성, 스타일 등을 포함해 인상적인 원고로 교정해 드립니다.")]), _vm._v(" "), _c("li", [_vm._v("- 무료 재교정 범위에 들어가는 경우 처음 이용 시부터 1년 이내에 한해서 횟수 제한없이 무료로 다중교정을 제공합니다.")]), _vm._v(" "), _c("li", [_vm._v("- 저널 제출을 위한 커버 레터 무료 작성, 영어 등급을 전문가가 평가하는 Document scorecard, 논문 퇴고에 유용한 전문가의 코멘트, 영문 교정 증명서 등이 무료로 제공됩니다.")])])]), _vm._v(" "), _c("div", {
    staticClass: "style01 plus"
  }, [_c("div", {
    staticClass: "circle"
  }, [_vm._v("프리미엄 플러스")]), _vm._v(" "), _c("p", [_vm._v("프리미엄 교정 + 저널 답변서 교정")]), _vm._v(" "), _c("p", {
    staticClass: "point"
  }, [_vm._v("\r\n            저널 리뷰어 코멘트 하나 하나 면밀히 검토 후 철저하고 정확하게 답변서가 기술되었는지 점검하여 드립니다.\r\n        ")]), _vm._v(" "), _c("hr"), _vm._v(" "), _c("ul", [_c("li", [_vm._v("- 작성한 영문내용이 저자의 의도대로 제대로 전달되는지 점검하기 위해 논문을 포함한 저널 답변서까지 프리미엄 수준으로 교정해드립니다.")]), _vm._v(" "), _c("li", [_vm._v("- 저널 리뷰어 코멘트 하나하나 면밀히 검토 후 철저하고 정확하게 답변서가 기술되었는지 점검해드립니다.")]), _vm._v(" "), _c("li", [_vm._v("- 저널 답변서 내용을 어떻게 보강할지, 만약 새로운 데이터가 필요할 경우 학문분야 전문 에디터가 제안해드립니다.")])])]), _vm._v(" "), _c("br"), _vm._v(" "), _c("b-row", [_c("b-col", [_c("h5", [_vm._v("◈  일반 교정 VS 프리미엄 교정")]), _vm._v(" "), _c("table", {
    staticClass: "tbl01",
    attrs: {
      cellpadding: "0",
      cellspacing: "0",
      border: "1"
    }
  }, [_c("colgroup", [_c("col", {
    attrs: {
      width: "50%"
    }
  }), _vm._v(" "), _c("col", {
    attrs: {
      width: "25%"
    }
  }), _vm._v(" "), _c("col", {
    attrs: {
      width: "25%"
    }
  })]), _vm._v(" "), _c("tbody", [_c("tr", [_c("th", [_vm._v("교정사항")]), _vm._v(" "), _c("td", {
    staticClass: "bg1"
  }, [_vm._v("일반 교정")]), _vm._v(" "), _c("td", {
    staticClass: "bg1"
  }, [_vm._v("프리미엄 교정")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("잘못된 표기 (철자, 띄어쓰기, 대소문자 구분 등)")]), _vm._v(" "), _c("td", [_vm._v("O")]), _vm._v(" "), _c("td", [_vm._v("O")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("구두점 (콜론, 세미콜론, 대시 등)")]), _vm._v(" "), _c("td", [_vm._v("O")]), _vm._v(" "), _c("td", [_vm._v("O")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("용어, 이탤릭체 등의 통일성")]), _vm._v(" "), _c("td", [_vm._v("O")]), _vm._v(" "), _c("td", [_vm._v("O")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("문법(주어-동사 관계, 단수 복수 구분, 시제, 전치사, 관사 등)")]), _vm._v(" "), _c("td", [_vm._v("O")]), _vm._v(" "), _c("td", [_vm._v("O")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("레이아웃, 폰트, 숫자 형식 등")]), _vm._v(" "), _c("td", [_vm._v("O")]), _vm._v(" "), _c("td", [_vm._v("O")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("어휘선택")]), _vm._v(" "), _c("td", [_vm._v("O")]), _vm._v(" "), _c("td", [_vm._v("O")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("언어 관련 조언")]), _vm._v(" "), _c("td", [_vm._v("O")]), _vm._v(" "), _c("td", [_vm._v("O")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("의미가 불분명한 텍스트에 개선안 제시")]), _vm._v(" "), _c("td", [_vm._v("O")]), _vm._v(" "), _c("td", [_vm._v("O")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("논리체계 및 연관성")]), _vm._v(" "), _c("td", [_vm._v("X")]), _vm._v(" "), _c("td", [_vm._v("O")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("체계성 및 문체: 흐름, presentation, 어조 등")]), _vm._v(" "), _c("td", [_vm._v("X")]), _vm._v(" "), _c("td", [_vm._v("O")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("커버레터")]), _vm._v(" "), _c("td", [_vm._v("X")]), _vm._v(" "), _c("td", [_vm._v("O")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("문장구조")]), _vm._v(" "), _c("td", [_vm._v("X")]), _vm._v(" "), _c("td", [_vm._v("O")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("무료 저널 양식 맞춤")]), _vm._v(" "), _c("td", [_vm._v("O")]), _vm._v(" "), _c("td", [_vm._v("O")])]), _vm._v(" "), _c("tr", {
    attrs: {
      id: "engReform_form_od_top"
    }
  }, [_c("td", [_vm._v("과학 기술 용어 체크")]), _vm._v(" "), _c("td", [_vm._v("O")]), _vm._v(" "), _c("td", [_vm._v("O")])])])])])], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("br"), _vm._v(" "), _c("br"), _vm._v(" "), _c("br"), _vm._v(" "), _c("br"), _vm._v(" "), _c("br"), _vm._v(" "), _c("b-row", {
    attrs: {
      id: "engReform_form"
    }
  }, [_c("b-col", [_c("h4", [_vm._v("요청사항")]), _vm._v(" "), _c("b-container", {
    staticClass: "frm_st"
  }, [_c("b-row", [_c("b-col", {
    staticClass: "label_st"
  }, [_vm._v("서비스 선택"), _c("b", {
    staticClass: "need"
  })]), _vm._v(" "), _c("b-col", {
    staticClass: "col_er_type"
  }, [_c("b-form-radio", {
    attrs: {
      button: "",
      value: "1"
    },
    model: {
      value: _vm.frm.er_type,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "er_type", $$v);
      },
      expression: "frm.er_type"
    }
  }, [_vm._v("일반 교정")]), _vm._v(" "), _c("b-form-radio", {
    attrs: {
      button: "",
      value: "2"
    },
    model: {
      value: _vm.frm.er_type,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "er_type", $$v);
      },
      expression: "frm.er_type"
    }
  }, [_vm._v("프리미엄 교정")]), _vm._v(" "), _c("b-form-radio", {
    attrs: {
      button: "",
      value: "3"
    },
    model: {
      value: _vm.frm.er_type,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "er_type", $$v);
      },
      expression: "frm.er_type"
    }
  }, [_vm._v("프리미엄플러스  교정")]), _vm._v(" "), _c("validation", {
    attrs: {
      error: this.$store.state.error.validations.er_type
    }
  })], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "label_st"
  }, [_vm._v("납기일"), _c("b", {
    staticClass: "need"
  })]), _vm._v(" "), _c("b-col", {
    directives: [{
      name: "b-tooltip",
      rawName: "v-b-tooltip",
      value: "교정 완료본을 받으실 날짜를 지정하여 주세요. 교정 가능한 날짜 및 시간은 견적서로 보내드립니다.",
      expression: "'교정 완료본을 받으실 날짜를 지정하여 주세요. 교정 가능한 날짜 및 시간은 견적서로 보내드립니다.'"
    }]
  }, [_c("b-form-datepicker", {
    staticClass: "mb-2",
    attrs: {
      id: "er_dlvy_at",
      placeholder: "날짜를 선택하세요"
    },
    model: {
      value: _vm.frm.er_dlvy_at,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "er_dlvy_at", $$v);
      },
      expression: "frm.er_dlvy_at"
    }
  }), _vm._v(" "), _c("validation", {
    attrs: {
      error: this.$store.state.error.validations.er_dlvy_at
    }
  })], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "label_st"
  }, [_vm._v("포맷팅"), _c("b", {
    staticClass: "need"
  })]), _vm._v(" "), _c("b-col", {
    directives: [{
      name: "b-tooltip",
      rawName: "v-b-tooltip",
      value: "저널지침에 따른 포맷팅 여부를 선택해주세요.",
      expression: "'저널지침에 따른 포맷팅 여부를 선택해주세요.'"
    }],
    staticClass: "col_er_format"
  }, [_c("b-form-radio", {
    attrs: {
      button: "",
      value: "NFM",
      id: "er_format"
    },
    model: {
      value: _vm.frm.er_format,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "er_format", $$v);
      },
      expression: "frm.er_format"
    }
  }, [_vm._v("No-formatting")]), _vm._v(" "), _c("b-input-group", [_c("b-input-group-prepend", {
    attrs: {
      "is-text": ""
    }
  }, [_c("b-form-radio", {
    attrs: {
      button: "",
      value: "FM"
    },
    model: {
      value: _vm.frm.er_format,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "er_format", $$v);
      },
      expression: "frm.er_format"
    }
  }, [_vm._v("Formatting")])], 1), _vm._v(" "), _c("b-form-input", {
    attrs: {
      id: "er_journal_url",
      placeholder: "저널 URL을 입력하세요"
    },
    model: {
      value: _vm.frm.er_journal_url,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "er_journal_url", $$v);
      },
      expression: "frm.er_journal_url"
    }
  })], 1), _vm._v(" "), _c("validation", {
    attrs: {
      error: this.$store.state.error.validations.er_format
    }
  })], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "label_st"
  }, [_vm._v("문서용도"), _c("b", {
    staticClass: "need"
  })]), _vm._v(" "), _c("b-col", [_c("b-form-select", {
    staticClass: "len01",
    attrs: {
      id: "er_use"
    },
    model: {
      value: _vm.frm.er_use,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "er_use", $$v);
      },
      expression: "frm.er_use"
    }
  }, [_c("b-form-select-option", {
    attrs: {
      value: ""
    }
  }), _vm._v(" "), _vm._l(_vm.option.er_use, function (opt, k) {
    return _c("b-form-select-option", {
      key: k,
      attrs: {
        value: opt
      }
    }, [_vm._v(_vm._s(opt))]);
  })], 2), _vm._v(" "), _c("small", {
    staticClass: "m_hide"
  }, [_vm._v("문서의 용도에 따라 교정 어투나 스타일 등은 달라지게 됩니다.")]), _vm._v(" "), _c("validation", {
    attrs: {
      error: this.$store.state.error.validations.er_use
    }
  })], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "label_st"
  }, [_vm._v("학문분야"), _c("b", {
    staticClass: "need"
  })]), _vm._v(" "), _c("b-col", [_c("b-form-select", {
    staticClass: "len01",
    attrs: {
      id: "er_branch"
    },
    model: {
      value: _vm.frm.er_branch_key,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "er_branch_key", $$v);
      },
      expression: "frm.er_branch_key"
    }
  }, [_c("b-form-select-option", {
    attrs: {
      value: ""
    }
  }), _vm._v(" "), _vm._l(_vm.option.er_branch, function (opt, k) {
    return _c("b-form-select-option", {
      key: k,
      attrs: {
        value: k
      }
    }, [_vm._v(_vm._s(opt))]);
  })], 2), _vm._v(" "), _c("small", {
    staticClass: "m_hide"
  }, [_vm._v("에디터의 주제 분야를 보시려면 관련된 학문 분야를 먼저 선택하여 주십시오.")]), _vm._v(" "), _c("validation", {
    attrs: {
      error: this.$store.state.error.validations.er_branch
    }
  })], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "label_st"
  }, [_vm._v("상세 학문분야"), _c("b", {
    staticClass: "need"
  })]), _vm._v(" "), _c("b-col", [_c("b-form-select", {
    staticClass: "len02",
    attrs: {
      id: "er_branch_sub"
    },
    model: {
      value: _vm.frm.er_branch_sub,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "er_branch_sub", $$v);
      },
      expression: "frm.er_branch_sub"
    }
  }, [_c("b-form-select-option", {
    attrs: {
      value: ""
    }
  }), _vm._v(" "), _vm._l(_vm.option.er_branch_sub[this.frm.er_branch_key - 1], function (opt, k) {
    return _c("b-form-select-option", {
      key: k,
      attrs: {
        value: opt
      }
    }, [_vm._v(_vm._s(opt))]);
  })], 2), _vm._v(" "), _c("small", {
    staticClass: "m_hide"
  }, [_vm._v("어떤 학문 분야/전문지식을 가진 에디터를 선호하십니까?")]), _vm._v(" "), _c("validation", {
    attrs: {
      error: this.$store.state.error.validations.er_branch_sub
    }
  })], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "label_st"
  }, [_vm._v("언어스타일"), _c("b", {
    staticClass: "need"
  })]), _vm._v(" "), _c("b-col", [_c("b-form-select", {
    staticClass: "len01",
    attrs: {
      id: "er_eng_style"
    },
    model: {
      value: _vm.frm.er_eng_style,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "er_eng_style", $$v);
      },
      expression: "frm.er_eng_style"
    }
  }, [_c("b-form-select-option", {
    attrs: {
      value: "AM"
    }
  }, [_vm._v("American English")]), _vm._v(" "), _c("b-form-select-option", {
    attrs: {
      value: "BR"
    }
  }, [_vm._v("British English")])], 1), _vm._v(" "), _c("validation", {
    attrs: {
      error: this.$store.state.error.validations.er_eng_style
    }
  })], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "label_st"
  }, [_vm._v("작업문서 업로드"), _c("b", {
    staticClass: "need"
  })]), _vm._v(" "), _c("b-col", [_c("file-upload", {
    ref: "fileupload1",
    attrs: {
      id: "file_info_work",
      fi_group: "engReform",
      fi_kind: "work",
      height: 100
    },
    model: {
      value: _vm.frm.file_info_work,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "file_info_work", $$v);
      },
      expression: "frm.file_info_work"
    }
  }), _vm._v(" "), _c("small", [_vm._v("최대 업로드 가능 용량 : 200MB")]), _vm._v(" "), _c("validation", {
    attrs: {
      error: this.$store.state.error.validations.file_info_work
    }
  })], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "label_st"
  }, [_vm._v("참고문서 업로드")]), _vm._v(" "), _c("b-col", [_c("file-upload", {
    ref: "fileupload2",
    attrs: {
      fi_group: "engReform",
      fi_kind: "ref",
      height: 100
    },
    model: {
      value: _vm.frm.file_info_ref,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "file_info_ref", $$v);
      },
      expression: "frm.file_info_ref"
    }
  }), _vm._v(" "), _c("small", [_vm._v("최대 업로드 가능 용량 : 200MB")])], 1), _vm._v(" "), _c("transition", {
    attrs: {
      name: "fade"
    }
  }, [_vm.isLoadingModalViewed ? _c("loading-modal", {
    attrs: {
      position: ""
    },
    on: {
      "close-modal": function closeModal($event) {
        _vm.isLoadingModalViewed = false;
      }
    }
  }, [_vm._v("\r\n                            첨부파일 전송중 ......\r\n                        ")]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "label_st"
  }, [_vm._v("요구사항")]), _vm._v(" "), _c("b-col", [_c("b-form-textarea", {
    attrs: {
      rows: "4"
    },
    model: {
      value: _vm.frm.er_demand,
      callback: function callback($$v) {
        _vm.$set(_vm.frm, "er_demand", $$v);
      },
      expression: "frm.er_demand"
    }
  })], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "btn_box"
  }, [_c("b-button", {
    staticClass: "blue xl",
    on: {
      click: _vm.store
    }
  }, [_vm._v("제출하기")])], 1)], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ 87861:
/*!****************************************************!*\
  !*** ./resources/js/views/web/engReform/option.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   branch_opt: () => (/* binding */ branch_opt),
/* harmony export */   editor_opt: () => (/* binding */ editor_opt),
/* harmony export */   use_opt: () => (/* binding */ use_opt)
/* harmony export */ });
var use_opt = [{
  value: '',
  text: '필수 선택'
}, {
  value: '1',
  text: '[학술] 초록'
}, {
  value: '2',
  text: '[학술] 사례연구'
}, {
  value: '3',
  text: '[학술] 연구비 신청서'
}, {
  value: '4',
  text: '[학술] 출판 원고'
}, {
  value: '5',
  text: '[학술] 컨퍼런스 발표자료'
}, {
  value: '6',
  text: '[학술] 피어 리뷰 코멘트'
}, {
  value: '7',
  text: '[학술] 프레젠테이션/포스터'
}, {
  value: '8',
  text: '[학술] 학술논문/저널 아티클'
}, {
  value: '9',
  text: '[학술] 피어리뷰 코멘트에 대한 답변'
}, {
  value: '10',
  text: '[학술] 학위 논문'
}, {
  value: '11',
  text: '[학술] 기타 학술 관련 문서'
}, {
  value: '12',
  text: '[학술 문서 이외] 연례 보고서'
}, {
  value: '13',
  text: '[학술 문서 이외] 편지/이메일'
}, {
  value: '14',
  text: '[학술 문서 이외] 마케팅/홍보자료'
}, {
  value: '15',
  text: '[학술 문서 이외] 프레젠테이션/연설문'
}, {
  value: '16',
  text: '[학술 문서 이외] 웹사이트'
}, {
  value: '17',
  text: '[학술 문서 이외] 기타 (학술문서 외)'
}];
var branch_opt = [{
  value: "",
  text: '필수 선택'
}, {
  value: "1",
  text: 'Arts, Media, and Communication'
}, {
  value: "2",
  text: 'Biochemistry, Genetics, and Molecular Biology'
}, {
  value: "3",
  text: 'Business and Finance'
}, {
  value: "4",
  text: 'Chemistry'
}, {
  value: "5",
  text: 'Computer Science and Mathematics'
}, {
  value: "6",
  text: 'Earth, Atmospheric, and Planetary Science'
}, {
  value: "7",
  text: 'Economics and Statistics'
}, {
  value: "8",
  text: 'Education'
}, {
  value: "9",
  text: 'Engineering and Technology'
}, {
  value: "10",
  text: 'Environmental Science, Energy, and Sustainability'
}, {
  value: "11",
  text: 'History, Political Science, and Philosophy'
}, {
  value: "12",
  text: 'Literature and Linguistics'
}, {
  value: "13",
  text: 'Materials Science'
}, {
  value: "14",
  text: 'Medicine'
}, {
  value: "15",
  text: 'Neuroscience and Neurology'
}, {
  value: "16",
  text: 'Pharmaceutical Sciences'
}, {
  value: "17",
  text: 'Physics'
}, {
  value: "18",
  text: 'Plant and Animal Science'
}, {
  value: "19",
  text: 'Psychology and Psychosocial Healthcare'
}, {
  value: "20",
  text: 'Sociology, Anthropology, and Organizational Behavior'
}];
var editor_opt = [[{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Art history 미술사"
}, {
  value: "2",
  text: "Autobiography/Biography 자서전/전기"
}, {
  value: "3",
  text: "Basic English learning content 기초 영어 학습 컨텐츠"
}, {
  value: "4",
  text: "Communication studies 커뮤니케이션학"
}, {
  value: "5",
  text: "Design and aesthetics 디자인 및 미학"
}, {
  value: "6",
  text: "Dialogue 대화"
}, {
  value: "7",
  text: "Fine arts 순수미술"
}, {
  value: "8",
  text: "Individual/Organization profile 개인/기관 프로필"
}, {
  value: "9",
  text: "Instruction manual/Guidelines 사용안내서/가이드라인"
}, {
  value: "10",
  text: "Media and journalism 미디어 및 저널리즘"
}, {
  value: "11",
  text: "Music 음악"
}, {
  value: "12",
  text: "News/Magazine reports or articles 뉴스/매거진리포트 또는 기사"
}, {
  value: "13",
  text: "Opinion, non-academic essay, or commentary 여론, 비학술논문 또는 논평"
}, {
  value: "14",
  text: "Other - Arts, media, and communication 기타 - 예술, 미디어 및 커뮤니케이션"
}, {
  value: "15",
  text: "Performing arts 공연예술"
}, {
  value: "16",
  text: "Personal communication 퍼스널 커뮤니케이션"
}, {
  value: "17",
  text: "Project/Program description 프로젝트/프로그램 서술"
}, {
  value: "18",
  text: "Promotional content 프로모션 컨텐츠"
}, {
  value: "19",
  text: "Recommendation letter 추천서"
}, {
  value: "20",
  text: "Resumes 이력서"
}, {
  value: "21",
  text: "School/University/Job application 학교/취업지원서"
}, {
  value: "22",
  text: "Sports and recreation 스포츠 및 레크리에이션"
}, {
  value: "23",
  text: "Tourism studies 관광학"
}, {
  value: "24",
  text: "TV and film TV 및 영화"
}, {
  value: "25",
  text: "Visual and fine arts 시각 및 순수미술"
}, {
  value: "26",
  text: "Visual arts 시각예술"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Aging 노화"
}, {
  value: "2",
  text: "Biochemistry 생화학"
}, {
  value: "3",
  text: "Biofuels 바이오연료"
}, {
  value: "4",
  text: "Bioinformatics and computational biology 생물정보학 및 전산생물학"
}, {
  value: "5",
  text: "Biomaterials 바이오소재"
}, {
  value: "6",
  text: "Biophysics 생물물리학"
}, {
  value: "7",
  text: "Biostatistics 생물통계학"
}, {
  value: "8",
  text: "Cell biology 세포생물학"
}, {
  value: "9",
  text: "Embryology 발생학"
}, {
  value: "10",
  text: "Enzymology and bioenergetics 효소 및 생물에너지학"
}, {
  value: "11",
  text: "Evolutionary and developmental biology 진화 및 발생생물학"
}, {
  value: "12",
  text: "Evolutionary genetics 진화유전학"
}, {
  value: "13",
  text: "Food science 식품과학"
}, {
  value: "14",
  text: "Forensic science 범죄과학"
}, {
  value: "15",
  text: "Genetics and genomics 유전 및 유전체학"
}, {
  value: "16",
  text: "Immunology 면역학"
}, {
  value: "17",
  text: "Medical laboratory technology 의료실험실 기술"
}, {
  value: "18",
  text: "Microbial biotechnology 미생물 생명공학"
}, {
  value: "19",
  text: "Microbiology 미생물학"
}, {
  value: "20",
  text: "Molecular biology 분자생물학"
}, {
  value: "21",
  text: "Molecular medicine 분자의학"
}, {
  value: "22",
  text: "Molecular oncology 분자종양학"
}, {
  value: "23",
  text: "Mutagenesis 돌연변이 생성학"
}, {
  value: "24",
  text: "Nanobiotechnology 나노바이오테크놀로지"
}, {
  value: "25",
  text: "Neuroscience - Cellular and molecular 신경과학 - 세포 및 분자"
}, {
  value: "26",
  text: "Oncogenetics 종양유전학"
}, {
  value: "27",
  text: "Other - Biochemistry, genetics, and molecular biology 기타 - 생화학, 유전학 및 분자생물학"
}, {
  value: "28",
  text: "Physiology 생리학"
}, {
  value: "29",
  text: "Population genetics 집단유전학"
}, {
  value: "30",
  text: "Reproductive biology 생식생물학"
}, {
  value: "31",
  text: "Stem cell engineering 줄기세포공학"
}, {
  value: "32",
  text: "Structural biology 구조생물학"
}, {
  value: "33",
  text: "Systems biology 시스템생물학"
}, {
  value: "34",
  text: "Transplantation immunology 이식 면역학"
}, {
  value: "35",
  text: "Virology 바이러스학"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Accounting, auditing, insurance, and tax 회계학, 회계감사, 보험 및 세금"
}, {
  value: "2",
  text: "Annual reports, quarterly reports, and financial statements 연차보고서, 분기보고서 및 재무제표"
}, {
  value: "3",
  text: "Banking, finance, and risk management 은행, 금융 및 위험관리"
}, {
  value: "4",
  text: "Business analysis, financial analysis, and financial reports 비즈니스분석, 재무분석 및 재무보고서"
}, {
  value: "5",
  text: "Business management and administration 경영 및 관리"
}, {
  value: "6",
  text: "Consumer studies 소비자학 연구"
}, {
  value: "7",
  text: "Human resource management and industrial relations 인적자원관리 및 노무관리"
}, {
  value: "8",
  text: "Management consulting and case studies 경영컨설팅 및 사례연구"
}, {
  value: "9",
  text: "Manufacturing, production, and logistics 제조, 생산 및 물류"
}, {
  value: "10",
  text: "Marketing and advertising 마케팅 및 광고학"
}, {
  value: "11",
  text: "Other - Business and finance 기타 - 경영 및 금융학"
}, {
  value: "12",
  text: "Strategic management, operations management, and planning 전략적 경영, 운영관리 및 기획"
}, {
  value: "13",
  text: "Supply chain management  물류관리, 물류학"
}, {
  value: "14",
  text: "Tourism, leisure, and hospitality management 관광, 레저 및 호텔경영"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Analytical chemistry 분석화학"
}, {
  value: "2",
  text: "Applied chemistry 응용화학"
}, {
  value: "3",
  text: "Catalysis 촉매작용"
}, {
  value: "4",
  text: "Chemical engineering 화학공학"
}, {
  value: "5",
  text: "Colloid and surface chemistry 콜로이드 및 표면화학"
}, {
  value: "6",
  text: "Computational chemistry   컴퓨터 화학/계산화학"
}, {
  value: "7",
  text: "Electrochemistry 전기화학"
}, {
  value: "8",
  text: "Food chemistry 식품화학"
}, {
  value: "9",
  text: "Inorganic chemistry 무기화학"
}, {
  value: "10",
  text: "Macromolecular and materials chemistry 고분자 및 재료화학"
}, {
  value: "11",
  text: "Nanochemistry 나노화학"
}, {
  value: "12",
  text: "Organic chemistry 유기화학"
}, {
  value: "13",
  text: "Other - Chemistry 기타 - 화학"
}, {
  value: "14",
  text: "Pharmaceutical and medicinal chemistry 의약품 및 의약화학"
}, {
  value: "15",
  text: "Photochemistry 광화학"
}, {
  value: "16",
  text: "Physical chemistry 물리화학"
}, {
  value: "17",
  text: "Polymer chemistry 고분자화학"
}, {
  value: "18",
  text: "Structural chemistry 구조화학"
}, {
  value: "19",
  text: "Supramolecular chemistry 초분자화학"
}, {
  value: "20",
  text: "Theoretical chemistry 이론화학"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Algebra and number theory 대수학 및 정수론"
}, {
  value: "2",
  text: "Applied mathematics 응용수학"
}, {
  value: "3",
  text: "Artificial intelligence 인공지능"
}, {
  value: "4",
  text: "Calculus 미적분학"
}, {
  value: "5",
  text: "Computer and mobile application software 컴퓨터 및 모바일 응용소프트웨어"
}, {
  value: "6",
  text: "Computer graphics and color spaces 컴퓨터 그래픽 및 색공간"
}, {
  value: "7",
  text: "Computer hardware and peripheral devices 컴퓨터 하드웨어 및 주변장치"
}, {
  value: "8",
  text: "Computer science 컴퓨터공학"
}, {
  value: "9",
  text: "Computer security and cryptography 컴퓨터 보안 및 암호해독"
}, {
  value: "10",
  text: "Computer vision 컴퓨터 비전"
}, {
  value: "11",
  text: "Database systems and data mining 데이터베이스 시스템 및 데이터마이닝"
}, {
  value: "12",
  text: "Geometry and topology 기하학 및 지형학"
}, {
  value: "13",
  text: "Human-Computer interaction 인간-컴퓨터 상호작용"
}, {
  value: "14",
  text: "Image and video processing 이미지 및 영상처리"
}, {
  value: "15",
  text: "Information systems 정보시스템"
}, {
  value: "16",
  text: "Internet, web services, and cloud computing 인터넷, 웹서비스 및 클라우드 컴퓨팅"
}, {
  value: "17",
  text: "Machine learning and pattern recognition 기계학습 및 패턴인식"
}, {
  value: "18",
  text: "Mathematical modeling, scheduling, and optimization 수학적모델링, 스케쥴링 및 최적화"
}, {
  value: "19",
  text: "Mathematics 수학"
}, {
  value: "20",
  text: "Mobile computing 모바일 컴퓨팅"
}, {
  value: "21",
  text: "Networks and communication protocols 네트워크 및 통신프로토콜"
}, {
  value: "22",
  text: "Neural networks and fuzzy systems 신경망 및 퍼지시스템"
}, {
  value: "23",
  text: "Operating systems and computer architecture 운영체제 및 컴퓨터구조"
}, {
  value: "24",
  text: "Other - Computer science and mathematics 기타 - 컴퓨터공학 및 수학"
}, {
  value: "25",
  text: "Parallel and distributed systems 병렬 및 분산시스템"
}, {
  value: "26",
  text: "Programming, algorithms, and data structures 프로그래밍, 알고리즘 및 데이터구조"
}, {
  value: "27",
  text: "Software engineering 소프트웨어 엔지니어링"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Atmospheric chemistry 대기화학"
}, {
  value: "2",
  text: "Atmospheric science 대기과학"
}, {
  value: "3",
  text: "Climate science 기후과학"
}, {
  value: "4",
  text: "Cloud physics 구름물리학"
}, {
  value: "5",
  text: "Convective systems, tornadoes, and hurricanes 대류시스템, 토네이도 및 허리케인"
}, {
  value: "6",
  text: "Geodesy 측지학"
}, {
  value: "7",
  text: "Geology 지질학"
}, {
  value: "8",
  text: "Geophysics 지구물리학"
}, {
  value: "9",
  text: "Hydrology 수문학"
}, {
  value: "10",
  text: "Meteorology 기상학"
}, {
  value: "11",
  text: "Mineralogy 광물학"
}, {
  value: "12",
  text: "Numerical weather prediction  (기상학의, 일기의) 수치예보"
}, {
  value: "13",
  text: "Oceanography 해양학"
}, {
  value: "14",
  text: "Other - Earth, atmospheric, and planetary science 기타 - 지구과학, 대기과학 및 행성학"
}, {
  value: "15",
  text: "Remote sensing 원격계측탐지"
}, {
  value: "16",
  text: "Seismology and tectonics 지진학과 구조론"
}, {
  value: "17",
  text: "Space and planetary science 공간 및 행성과학"
}, {
  value: "18",
  text: "Synoptic meteorology 종관기상학"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Agricultural and environmental economics 농업경제학 및 환경경제학"
}, {
  value: "2",
  text: "Behavioral economics 행동경제학"
}, {
  value: "3",
  text: "Development economics 개발 경제학"
}, {
  value: "4",
  text: "Econometrics 계량 (통계) 경제학, 경제 측정학"
}, {
  value: "5",
  text: "Economic history 경제사"
}, {
  value: "6",
  text: "Economic modeling 경제모형"
}, {
  value: "7",
  text: "Economic policy 경제정책"
}, {
  value: "8",
  text: "Economic theory 경제이론"
}, {
  value: "9",
  text: "Labor economics 노동경제학"
}, {
  value: "10",
  text: "Monetary economics 화폐경제학"
}, {
  value: "11",
  text: "Other - Economics and statistics 기타 - 경제학, 통계학"
}, {
  value: "12",
  text: "Public economics 공공경제학"
}, {
  value: "13",
  text: "Spatial economics 공간경제학"
}, {
  value: "14",
  text: "Statistics in economics and other social sciences 경제통계 및 사회과학"
}, {
  value: "15",
  text: "Tourism economics 관광경제학"
}, {
  value: "16",
  text: "Transport economics 교통경제학"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Curriculum development 교육과정 개발"
}, {
  value: "2",
  text: "Curriculum studies 교육과정 연구"
}, {
  value: "3",
  text: "Educational administration 교육관리"
}, {
  value: "4",
  text: "Educational assessment and evaluation 교육평가 및 측정"
}, {
  value: "5",
  text: "Educational methods and theories 교육방법 및 이론"
}, {
  value: "6",
  text: "ELT/TESL/TESOL/TEFL  영어교수학"
}, {
  value: "7",
  text: "ESL/EFL/ESOL/EAL  영어교수학"
}, {
  value: "8",
  text: "ESP   특수 목적용[직능별] 영어(English for specific/special purposes)"
}, {
  value: "9",
  text: "General education 일반교육, 보통교육"
}, {
  value: "10",
  text: "Language acquisition 언어습득"
}, {
  value: "11",
  text: "Language assessment/Language testing 언어평가/언어테스트"
}, {
  value: "12",
  text: "Other - Education 기타 - 교육학"
}, {
  value: "13",
  text: "Pedagogy 교육학"
}, {
  value: "14",
  text: "Specialist studies in education 교육전문연구"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Aeronautical engineering 항공공학"
}, {
  value: "2",
  text: "Automobile engineering 자동차공학"
}, {
  value: "3",
  text: "Biomedical engineering 생명공학"
}, {
  value: "4",
  text: "Civil and structural engineering 토목 및 구조공학"
}, {
  value: "5",
  text: "Control and systems engineering 제어 및 시스템공학 "
}, {
  value: "6",
  text: "Electric circuits and components 전기회로"
}, {
  value: "7",
  text: "Electronics and electrical engineering 전기전자공학"
}, {
  value: "8",
  text: "Industrial and manufacturing engineering 생산 및 제조공학"
}, {
  value: "9",
  text: "Marine engineering 선박공학"
}, {
  value: "10",
  text: "Mechanical engineering 기계공학"
}, {
  value: "11",
  text: "Nanotechnology 나노기술"
}, {
  value: "12",
  text: "Other - Engineering and technology 기타 - 공학 및 기술"
}, {
  value: "13",
  text: "Robotics 로봇공학"
}, {
  value: "14",
  text: "Sensors 센서"
}, {
  value: "15",
  text: "Signal processing 신호분석처리"
}, {
  value: "16",
  text: "Telecommunications 원격통신"
}, {
  value: "17",
  text: "Wireless communication 무선통신"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Energy 에너지"
}, {
  value: "2",
  text: "Environmental policies 환경정책"
}, {
  value: "3",
  text: "Environmental science 환경과학"
}, {
  value: "4",
  text: "Nature and landscape conservation 자연 및 조경 보존"
}, {
  value: "5",
  text: "Other - Environmental science, energy, and sustainability 기타 -  환경에너지과학"
}, {
  value: "6",
  text: "Pollution 공해"
}, {
  value: "7",
  text: "Renewable energy 재생가능에너지"
}, {
  value: "8",
  text: "Sustainability  (생태학 분야) 지속가능성"
}, {
  value: "9",
  text: "Waste management and disposal  폐기물 관리 및 처리"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Archaeology 고고학"
}, {
  value: "2",
  text: "Civics   공민학"
}, {
  value: "3",
  text: "Ethics 윤리학"
}, {
  value: "4",
  text: "Geopolitics 지정학"
}, {
  value: "5",
  text: "History 역사"
}, {
  value: "6",
  text: "History of Africa 아프리카 역사"
}, {
  value: "7",
  text: "History of Asia 아시아 역사"
}, {
  value: "8",
  text: "History of Central Asia 중앙아시아 역사"
}, {
  value: "9",
  text: "History of East Asia 동남아시아 역사"
}, {
  value: "10",
  text: "History of Europe 유럽 역사"
}, {
  value: "11",
  text: "History of the Americas 아메리카 역사"
}, {
  value: "12",
  text: "History of the Middle East 중동 역사"
}, {
  value: "13",
  text: "International relations 국제관계학"
}, {
  value: "14",
  text: "Law 법학"
}, {
  value: "15",
  text: "Other - History, political science, and philosophy 기타 - 역사, 정치학 및 철학"
}, {
  value: "16",
  text: "Philosophy 철학"
}, {
  value: "17",
  text: "Policy planning 정책계획"
}, {
  value: "18",
  text: "Political science 정치학"
}, {
  value: "19",
  text: "Public administration 행정학"
}, {
  value: "20",
  text: "Religious studies and theology 종교학 및 신학"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Book reviews 도서리뷰"
}, {
  value: "2",
  text: "Descriptive linguistics 기술언어학"
}, {
  value: "3",
  text: "Fiction and creative writing 소설 및 창작"
}, {
  value: "4",
  text: "General linguistics 일반언어학"
}, {
  value: "5",
  text: "Literary criticism 문학비평, 평론학"
}, {
  value: "6",
  text: "Literary forms and genres 문학양식 및 장르"
}, {
  value: "7",
  text: "Literary history 문학역사"
}, {
  value: "8",
  text: "Literary nonfiction 문학 논픽션"
}, {
  value: "9",
  text: "Literary theory 문학이론"
}, {
  value: "10",
  text: "Literary translation 문학번역"
}, {
  value: "11",
  text: "Literature 문학"
}, {
  value: "12",
  text: "Literature by era 시대문학"
}, {
  value: "13",
  text: "Morphology (언어학)의미론"
}, {
  value: "14",
  text: "National, regional, and ethnic literature 국가, 지역 및 민족문학"
}, {
  value: "15",
  text: "Other - Literature and linguistics 기타 - 문학, 언어학"
}, {
  value: "16",
  text: "Phonology 음성학"
}, {
  value: "17",
  text: "Pragmatics   화용론"
}, {
  value: "18",
  text: "Semantics (언어학)의미론"
}, {
  value: "19",
  text: "Study of creative arts and writing 창작예술 및 쓰기연구"
}, {
  value: "20",
  text: "Syntax (언어)구문론, 통사론"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Ceramics and composites 세라믹 및 복합재료"
}, {
  value: "2",
  text: "Electrode materials 전극재료"
}, {
  value: "3",
  text: "Electronic, optical, and magnetic materials 전자, 광학 및 자성재료"
}, {
  value: "4",
  text: "Fibers and glass 섬유 및 유리"
}, {
  value: "5",
  text: "Material synthesis and processes 소재합성 및 프로세스"
}, {
  value: "6",
  text: "Materials engineering 재료공학"
}, {
  value: "7",
  text: "Materials physics 재료물리학"
}, {
  value: "8",
  text: "Materials science 재료과학"
}, {
  value: "9",
  text: "Metallurgy 금속공학"
}, {
  value: "10",
  text: "Metallurgy, metals, and alloys 야금, 금속 및 합금"
}, {
  value: "11",
  text: "Nanofabrication 나노제작"
}, {
  value: "12",
  text: "Other - Materials science 기타 - 재료과학"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Anatomy 해부학"
}, {
  value: "2",
  text: "Anesthesiology and pain medicine 마취통증의학"
}, {
  value: "3",
  text: "Cancer research - Chemoradiotherapy 화학방사선요법"
}, {
  value: "4",
  text: "Cancer research - Molecular 암연구분자"
}, {
  value: "5",
  text: "Cancer research 암연구"
}, {
  value: "6",
  text: "Cardiology 심장(병)학"
}, {
  value: "7",
  text: "Chiropractics 지압요법"
}, {
  value: "8",
  text: "Clinical toxicology 임상 독성학"
}, {
  value: "9",
  text: "Complementary and alternative medicine 보완 및 대체의학"
}, {
  value: "10",
  text: "Dentistry 치과의학"
}, {
  value: "11",
  text: "Dermatology 피부과학"
}, {
  value: "12",
  text: "Diabetes research 당뇨병 연구"
}, {
  value: "13",
  text: "Emergency and critical care 응급의학, 중환자간호"
}, {
  value: "14",
  text: "Endocrinology 내분비학"
}, {
  value: "15",
  text: "ENT (Otolaryngology) 이비인후과 의학"
}, {
  value: "16",
  text: "Epidemiology 유행병학"
}, {
  value: "17",
  text: "Forensic medicine 법의학"
}, {
  value: "18",
  text: "Gastroenterology and hepatology 소화기내과, 간장학(肝臟學)"
}, {
  value: "19",
  text: "Geriatric medicine 노인의학"
}, {
  value: "20",
  text: "Hematology 혈액학"
}, {
  value: "21",
  text: "Infectious diseases 전염병, 감염의학"
}, {
  value: "22",
  text: "Internal medicine 내과(학)"
}, {
  value: "23",
  text: "Medical devices 의료장비"
}, {
  value: "24",
  text: "Nephrology 신장(병)학"
}, {
  value: "25",
  text: "Nursing and hospital medicine 간호학 및 병원의학"
}, {
  value: "26",
  text: "Nutrition and dietetics 영양학"
}, {
  value: "27",
  text: "Obstetrics and gynecology 산부인과"
}, {
  value: "28",
  text: "Occupational health and therapy 산업보건 및 진료"
}, {
  value: "29",
  text: "Ophthalmology 안과학"
}, {
  value: "30",
  text: "Optometry 시력측정"
}, {
  value: "31",
  text: "Orthopedics 정형외과"
}, {
  value: "32",
  text: "Other - Medicine 기타 - 의하"
}, {
  value: "33",
  text: "Pathology and diagnostics 병리학 및 진단학"
}, {
  value: "34",
  text: "Pediatrics, perinatology, and child health 소아과, 출산의료학 및 아동건강"
}, {
  value: "35",
  text: "Physical medicine and rehabilitation 물리 요법학 및 재활의학"
}, {
  value: "36",
  text: "Plastic surgery 성형외과"
}, {
  value: "37",
  text: "Public health 공중위생학"
}, {
  value: "38",
  text: "Radiology 방사선학, 영상의학"
}, {
  value: "39",
  text: "Radiotherapy planning 방사선요법계획"
}, {
  value: "40",
  text: "Reproductive medicine 생식의료"
}, {
  value: "41",
  text: "Respiratory care 호흡관리"
}, {
  value: "42",
  text: "Rheumatology 류머티즘학"
}, {
  value: "43",
  text: "Sexual health 성건강"
}, {
  value: "44",
  text: "Sports medicine 스포츠의학"
}, {
  value: "45",
  text: "Surgery - Cardiac and cardiothoracic 수술 - 심장 및 흉부"
}, {
  value: "46",
  text: "Surgery 외과"
}, {
  value: "47",
  text: "Transplantation - Surgery 이식수술"
}, {
  value: "48",
  text: "Urology 비뇨기과학"
}, {
  value: "49",
  text: "Veterinary sciences (축산학) 수의학(獸醫學)"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Clinical psychiatry 정신의학"
}, {
  value: "2",
  text: "Cognitive neuroscience 인지 신경과학"
}, {
  value: "3",
  text: "Computational neuroscience 계산신경과학"
}, {
  value: "4",
  text: "Developmental neuroscience 발달신경과학"
}, {
  value: "5",
  text: "Neuroanatomy 신경해부학"
}, {
  value: "6",
  text: "Neuroimaging 신경촬영법"
}, {
  value: "7",
  text: "Neuropathology 신경병리학"
}, {
  value: "8",
  text: "Neuroscience and neurology 신경과학 및 신경과"
}, {
  value: "9",
  text: "Neurosurgery 신경외과"
}, {
  value: "10",
  text: "Other - Neuroscience and neurology 기타 - 신경과학, 신경학"
}, {
  value: "11",
  text: "Sensory systems 감각기관"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Drug discovery 신약개발"
}, {
  value: "2",
  text: "Other - Pharmaceutical sciences 약학"
}, {
  value: "3",
  text: "Pharmaceutical chemistry 약제화학"
}, {
  value: "4",
  text: "Pharmacogenomics 약리유전학"
}, {
  value: "5",
  text: "Pharmacognosy 생약학"
}, {
  value: "6",
  text: "Pharmacology, toxicology, and pharmaceutics 약리학, 독성학 및 조제학"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Acoustics and ultrasonics 음향 및 초음파"
}, {
  value: "2",
  text: "Applied physics 응용물리학"
}, {
  value: "3",
  text: "Astronomy and astrophysics 천문학 천체물리학"
}, {
  value: "4",
  text: "Atomic and molecular physics 원자물리학, 분자물리학"
}, {
  value: "5",
  text: "Condensed matter physics 응집물질 물리학(고체물리학)"
}, {
  value: "6",
  text: "Fluid dynamics 유체역학"
}, {
  value: "7",
  text: "High-energy and particle physics 고에너지물리학, 소립자물리학"
}, {
  value: "8",
  text: "Lasers 레이져"
}, {
  value: "9",
  text: "Linear physics 선형물리학"
}, {
  value: "10",
  text: "Magnetism 자기, 자성"
}, {
  value: "11",
  text: "Medical physics 의학물리학"
}, {
  value: "12",
  text: "Nonlinear physics 비선형 물리학"
}, {
  value: "13",
  text: "Nuclear physics 핵물리학"
}, {
  value: "14",
  text: "Optics 광학"
}, {
  value: "15",
  text: "Other - Physics 기타 - 물리학"
}, {
  value: "16",
  text: "Plasma 플라즈마"
}, {
  value: "17",
  text: "Quantum physics 양자물리학"
}, {
  value: "18",
  text: "Radiation 방사선"
}, {
  value: "19",
  text: "Solid-state physics 고체물리학"
}, {
  value: "20",
  text: "Statistical and mathematical physics 통계및 수학적 물리학"
}, {
  value: "21",
  text: "Theoretical physics 이론물리학"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Agricultural science 농업과학"
}, {
  value: "2",
  text: "Agronomy and crop science 경제학 및 작물과학"
}, {
  value: "3",
  text: "Animal genealogy 동물계통학"
}, {
  value: "4",
  text: "Animal genetics 동물 유전학"
}, {
  value: "5",
  text: "Behavior and systematics 행동 및 분류학"
}, {
  value: "6",
  text: "Botany 식물학"
}, {
  value: "7",
  text: "Ecology 생태학"
}, {
  value: "8",
  text: "Entomology 곤충학"
}, {
  value: "9",
  text: "Fishery sciences 수산업 과학"
}, {
  value: "10",
  text: "Forestry 임학"
}, {
  value: "11",
  text: "Horticulture 원예학"
}, {
  value: "12",
  text: "Irrigation and water management 관개 및 물관리"
}, {
  value: "13",
  text: "Marine Biology 해양생물학"
}, {
  value: "14",
  text: "Ornithology 조류학"
}, {
  value: "15",
  text: "Other - Plant and animal science 기타 - 식물 및 동물과학"
}, {
  value: "16",
  text: "Plant and animal biotechnology 식물 및 동물 생명공학"
}, {
  value: "17",
  text: "Plant biochemistry 식물 생화학"
}, {
  value: "18",
  text: "Plant genealogy 식물계통학"
}, {
  value: "19",
  text: "Plant genetics 식물 유전학"
}, {
  value: "20",
  text: "Soil science 토양학"
}, {
  value: "21",
  text: "Taxonomy 분류학"
}, {
  value: "22",
  text: "Zoology 동물학"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Applied behavior analysis 응용행동분석"
}, {
  value: "2",
  text: "Behavioral, psychosomatic, and social medicine 행동, 심리 및 사회의학"
}, {
  value: "3",
  text: "Clinical psychology and mental health 임상정신과"
}, {
  value: "4",
  text: "Clinical psychotherapy and counseling 임상심리학 및 상담학"
}, {
  value: "5",
  text: "Cognitive psychology and affective science 임상심리학, 정서과학"
}, {
  value: "6",
  text: "Comparative psychology 비교심리학"
}, {
  value: "7",
  text: "Developmental and educational psychology 발달심리학 및 산업심리학"
}, {
  value: "8",
  text: "Elder care and gerontology 노인학"
}, {
  value: "9",
  text: "Experimental psychology 실험심리학"
}, {
  value: "10",
  text: "General psychology 일반 심리학"
}, {
  value: "11",
  text: "Health education, management, and informatics 보건교육, 보건관리 및 보건정보학"
}, {
  value: "12",
  text: "Healthcare 건강관리"
}, {
  value: "13",
  text: "Neuropsychology 신경심리학"
}, {
  value: "14",
  text: "Nursing - Policy, support, and development 간호정책, 간호지원 및 간호개발"
}, {
  value: "15",
  text: "Other - Psychology and psychosocial healthcare 기타 - 심리학 및 건강관리"
}, {
  value: "16",
  text: "Social and industrial psychology 사회 및 산업심리학"
}], [{
  value: "",
  text: '선택 하세요'
}, {
  value: "1",
  text: "Anthropology 인류학"
}, {
  value: "2",
  text: "Consumer behavior and consumer studies 소비자행동 및 소비자학 연구"
}, {
  value: "3",
  text: "Criminology 범죄학"
}, {
  value: "4",
  text: "Cultural studies 문화연구"
}, {
  value: "5",
  text: "Decision sciences 의사결정학"
}, {
  value: "6",
  text: "Demography 인구학"
}, {
  value: "7",
  text: "Disaster management 재해관리"
}, {
  value: "8",
  text: "Gender studies 성 연구"
}, {
  value: "9",
  text: "Geography and environmental studies 지리학 및 환경연구"
}, {
  value: "10",
  text: "Information studies 정보과학"
}, {
  value: "11",
  text: "Organizational behavior 조직행동"
}, {
  value: "12",
  text: "Other - Sociology, anthropology, and organizational behavior 기타 - 사회학, 인류학 및 조직행동학"
}, {
  value: "13",
  text: "Race and ethnicity 인종 및 민족학"
}, {
  value: "14",
  text: "Records management 기록관리"
}, {
  value: "15",
  text: "Rural sociology 농촌사회학"
}, {
  value: "16",
  text: "Social work 사회복지업무"
}, {
  value: "17",
  text: "Sociology 사회학"
}, {
  value: "18",
  text: "Urban sociology 도시사회학"
}]];


/***/ }),

/***/ 43232:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/engReform/Create.vue?vue&type=style&index=0&id=5d903260&lang=css&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ 1519);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.w_fence h3[data-v-5d903260] { margin-top:0; text-align:left;\n}\n.w_fence .lg[data-v-5d903260] { padding: 7px 0px; margin-left:1rem;\n}\n#engReform[data-v-5d903260] { max-width: 60rem; margin: auto;\n}\n#engReform>.row>.col[data-v-5d903260] { padding:0;\n}\n#engReform .row .col h5[data-v-5d903260] { margin:30px 0 20px 20px;\n}\n.tbl01[data-v-5d903260] { width:100%; border:5px solid #E1E1E1;\n}\n.tbl01.strong tr th[data-v-5d903260],\r\n.tbl01.strong tr td[data-v-5d903260] { font-weight:bold;\n}\n.tbl01 tr th[data-v-5d903260],\r\n.tbl01 tr td[data-v-5d903260] { text-align:center; font-size:.9rem;\n}\n.tbl01 tr th[data-v-5d903260] { background:#4F708F; color:#fff; text-align:center; width:300px; padding:10px 0;\n}\n.tbl01 tr td[data-v-5d903260] { padding:10px 30px;\n}\n.tbl01 tr td.bg1[data-v-5d903260] { background:#B7B7B7;\n}\n.tbl01 tr td.bg2[data-v-5d903260] { background:#EFF0F2;\n}\n.tbl01 tr td.other[data-v-5d903260] { text-align:left; font-weight:normal;\n}\nol.num_list[data-v-5d903260] { margin:15px 0 0 40px;\n}\nol.num_list li[data-v-5d903260] { list-style-type:decimal; font-size:.82rem; margin:.3rem 0;\n}\nol.num_list li:first-child b[data-v-5d903260] { color:#0094EA;\n}\n.style01[data-v-5d903260] { border:3px solid #7EA8DA; position:relative; padding:22px 80px 30px 140px; border-radius:2.7rem; margin:2.5rem -15px 2.5rem 4rem;\n}\n.style01 .circle[data-v-5d903260] { position:absolute; top:50%; left:-6%; transform:translateY(-50%); background:#7EA8DA; width:170px; padding:67px 0; text-align:center; font-size:1.25rem; color:#fff; font-weight:bold; border-radius:50%;\n}\n.style01 p[data-v-5d903260] { font-weight:bold; margin-bottom:.1rem;\n}\n.style01 .point[data-v-5d903260] { color:#0094EA; margin-top:.7rem;font-size:1.2rem;\n}\n.style01 hr[data-v-5d903260] { border-color:#D7D7D7;\n}\n.style01.premium[data-v-5d903260] { border-color:#5674BA;\n}\n.style01.premium .circle[data-v-5d903260] { background:#5674BA;\n}\n.style01.plus[data-v-5d903260] { border-color:#855FAA;\n}\n.style01.plus .circle[data-v-5d903260] { background:#855FAA;\n}\n#engReform .row .user[data-v-5d903260] { flex-basis:38%; max-width:38%; margin-right:45px;\n}\n#engReform .row .user .rs_modal[data-v-5d903260] { color:#1a1a1a;\n}\n.frm_st .row .col.label_st[data-v-5d903260] { font-size:.9rem; flex-basis:115px; max-width:115px;\n}\n.frm_st .row .col small[data-v-5d903260] { font-size:.68rem; color:#999; margin-left:.6rem;\n}\n.frm_st .row .col small.line2[data-v-5d903260]  { width:45%; display:inline-block;\n}\n.frm_st .row .col .len01[data-v-5d903260] { width:40%; float:left;\n}\n.frm_st .row .col .len02[data-v-5d903260] { width:50%; float:left;\n}\n.frm_st .row .col_er_type>div[data-v-5d903260]:not(:last-child) { margin-right:12px;\n}\n.frm_st .row .col .b-form-btn-label-control[data-v-5d903260] { background:#F2F3F5;\n}\n.frm_st .row .col_er_format>div[data-v-5d903260]:first-child { float:left;\n}\n.frm_st .row .col_er_format>div[data-v-5d903260]:last-child { float:right; border:2px solid #1A90D6; border-radius:17px; overflow:hidden;\n}\n.frm_st .row .col_er_format .input-group[data-v-5d903260] { width:80%;\n}\n.frm_st .row .col_er_format .input-group .input-group-text[data-v-5d903260] { padding:0; border-width:0; background:none;\n}\n.frm_st .row .col_er_format .input-group input[data-v-5d903260] { height:auto;\n}\n.frm_st .row .col[data-v-5d903260] .input-group .btn-group-toggle .btn { border-width:0 !important;\n}\n.frm_st .row .col[data-v-5d903260] .input-group .btn-group-toggle .btn.active { border-radius: 20px 0 0 20px;\n}\n.frm_st .row .col input[data-v-5d903260], \r\n.frm_st .row .col select[data-v-5d903260], \r\n.frm_st .row .col textarea[data-v-5d903260] { padding:2px 16px;\n}\n.frm_st .row .col input[data-v-5d903260]:focus, \r\n.frm_st .row .col select[data-v-5d903260]:focus, \r\n.frm_st .row .col textarea[data-v-5d903260]:focus { background: #fff; border-width:0 !important;\n}\n.frm_st .row .col.hp span[data-v-5d903260]:not(:last-child):after { right: -14px;\n}\n.frm_st .row .col.email span[data-v-5d903260]:first-child:after { right:-19px;\n}\n@media (max-width: 992px){\n.tbl01 tr td[data-v-5d903260] { padding:5px;\n}\n.tbl01.t01 tr th[data-v-5d903260] { width:20%;\n}\n.style01[data-v-5d903260] { margin: 0px -17px; border-radius: 6px; padding: 5px;\n}\n.style01 .circle[data-v-5d903260] { position:static; transform:none; padding:6px 0; border-radius:4px;\n}\n.frm_st .row .col.label_st[data-v-5d903260] { flex-basis:100%; max-width:100%;\n}\n.frm_st .row .col_er_type>div[data-v-5d903260]:not(:last-child) { margin-right:0;\n}\n.frm_st .row .col_er_format>div[data-v-5d903260]:last-child { float:right;\n}\n.frm_st .row .col_er_format .input-group[data-v-5d903260] { width:100%;\n}\n.btn_box[data-v-5d903260] { margin-top: 1rem;\n}\n.btn.xl[data-v-5d903260],\r\n    .frm_st .row .col .len01[data-v-5d903260],\r\n    .frm_st .row .col .len02[data-v-5d903260] { width:100%;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 77407:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/engReform/Create.vue?vue&type=style&index=0&id=5d903260&lang=css&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ 93379);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_style_index_0_id_5d903260_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Create.vue?vue&type=style&index=0&id=5d903260&lang=css&scoped=true& */ 43232);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_style_index_0_id_5d903260_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_style_index_0_id_5d903260_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ 65627:
/*!*****************************************************!*\
  !*** ./resources/js/views/web/engReform/Create.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Create_vue_vue_type_template_id_5d903260_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create.vue?vue&type=template&id=5d903260&scoped=true& */ 73655);
/* harmony import */ var _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Create.vue?vue&type=script&lang=js& */ 72001);
/* harmony import */ var _Create_vue_vue_type_style_index_0_id_5d903260_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Create.vue?vue&type=style&index=0&id=5d903260&lang=css&scoped=true& */ 14192);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 51900);



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Create_vue_vue_type_template_id_5d903260_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Create_vue_vue_type_template_id_5d903260_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5d903260",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/engReform/Create.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ 72001:
/*!******************************************************************************!*\
  !*** ./resources/js/views/web/engReform/Create.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Create.vue?vue&type=script&lang=js& */ 31898);
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 73655:
/*!************************************************************************************************!*\
  !*** ./resources/js/views/web/engReform/Create.vue?vue&type=template&id=5d903260&scoped=true& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_5d903260_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_5d903260_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_5d903260_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Create.vue?vue&type=template&id=5d903260&scoped=true& */ 97641);


/***/ }),

/***/ 14192:
/*!**************************************************************************************************************!*\
  !*** ./resources/js/views/web/engReform/Create.vue?vue&type=style&index=0&id=5d903260&lang=css&scoped=true& ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_style_index_0_id_5d903260_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Create.vue?vue&type=style&index=0&id=5d903260&lang=css&scoped=true& */ 77407);


/***/ })

}]);