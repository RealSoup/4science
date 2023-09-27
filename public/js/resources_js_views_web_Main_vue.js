"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_web_Main_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/http */ "./resources/js/api/http.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "SiteMain",
  components: {
    'pop-up': function popUp() {
      return __webpack_require__.e(/*! import() */ "resources_js_views_web__module_PopUp_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./_module/PopUp */ "./resources/js/views/web/_module/PopUp.vue"));
    },
    'sub-string': function subString() {
      return __webpack_require__.e(/*! import() */ "resources_js_views__common_SubString_vue").then(__webpack_require__.bind(__webpack_require__, /*! @/views/_common/SubString.vue */ "./resources/js/views/_common/SubString.vue"));
    }
  },
  data: function data() {
    return {
      list: {
        best_main: {}
      },
      best_cate: {},
      cateSideMenuPosition: 'absolute',
      cateSideMenuTop: 'auto',
      cateSideMenuBottom: 'auto',
      scrollVal: [1690, 2232, 2776, 3317, 3859, 4401, 4943, 5485, 6027, 6569, 7111, 7653, 8195, 8737, 9279, 9821, 10363, 10905, 11447],
      scrollEnd: 11130,
      currentScroll: 0,
      // best:[
      //     { title: 'First', text: 'text', url: '#', image: '/images/one.jpg' },
      // ],
      // styles: {
      //     li: {
      //         backgroundSize:'cover',
      //     },

      // }
      date01: new Date('2023-05-02 00:00'),
      date02: new Date('2023-05-16 23:59'),
      date_now: new Date()
    };
  },
  computed: _objectSpread(_objectSpread({
    bestRemodel: function bestRemodel() {
      var dummy = [];
      for (var i in this.list.best_main) {
        dummy.push({
          gd_name: this.list.best_main[i].goods.gd_name,
          ca01_name: this.list.best_main[i].goods.goods_category_first.gc_ca01_name,
          gd_id: this.list.best_main[i].goods.gd_id,
          image: this.list.best_main[i].goods.image_src_thumb[0]
        });
      }
      return dummy;
    }
  }, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapState)('category', ['category'])), {}, {
    slide_check01: function slide_check01() {
      return this.date01 < this.date_now && this.date_now < this.date02;
    },
    slide_check02: function slide_check02() {
      return this.date02 < this.date_now;
    }
  }),
  methods: {
    scrollToCate: function scrollToCate(i) {
      // this.intervalMoveScroll = setInterval(() => {
      //     if (window.pageYOffset === 0) {
      //         clearInterval(this.intervalMoveScroll);
      //     }
      //     window.scroll(0, window.pageYOffset - 50);
      // }, 20);
      window.scrollTo({
        top: this.scrollVal[i],
        left: 0,
        behavior: 'smooth'
      });
    },
    scrollch: function scrollch(k) {
      if (k == 'e') {
        window.scroll(0, this.currentScroll);
      } else if (k == '+') {
        window.scroll(0, this.currentScroll++);
      } else {
        window.scroll(0, this.currentScroll--);
      }
    },
    scrollListener: function scrollListener(e) {
      this.currentScroll = window.scrollY;
      if (window.scrollY > this.scrollEnd) {
        this.cateSideMenuPosition = 'absolute';
        this.cateSideMenuTop = 'auto';
        this.cateSideMenuBottom = 0;
      } else if (window.scrollY > this.scrollVal[0]) {
        this.cateSideMenuPosition = 'fixed';
        this.cateSideMenuTop = '153px';
        this.cateSideMenuBottom = 'auto';
      } else if (window.scrollY < this.scrollVal[0]) {
        this.cateSideMenuPosition = 'absolute';
        this.cateSideMenuTop = 'auto';
        this.cateSideMenuBottom = 'auto';
      }
      for (var i in this.scrollVal) {
        if (i < this.scrollVal.length - 1 && this.scrollVal[i] < window.scrollY && window.scrollY < this.scrollVal[Number(i) + 1]) this.category[i].showing = true;else this.category[i].showing = false;
      }
    }
    // addClass: function (e) {
    //     e.target.classList.add("hover");
    // },
    // removeClass: function (e) {
    //     e.target.classList.remove("hover");
    // },
  },
  mounted: function mounted() {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var rst;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            window.addEventListener('scroll', _this.scrollListener);

            // this.index(this.listType.best);
            _context.next = 3;
            return _api_http__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/main");
          case 3:
            rst = _context.sent;
            _this.best_cate = rst.data.best_cate;
            _this.list.best_main = rst.data.best_main;
            if (_this.$route.query.rst == 'social_login') {
              //  소셜 로그인 후 개인정보가 없으면
              if (isEmpty(_this.$store.state.auth.user.email) || isEmpty(_this.$store.state.auth.user.name) || isEmpty(_this.$store.state.auth.user.birth) || isEmpty(_this.$store.state.auth.user.hp)) {
                _this.$router.push({
                  name: 'my_user_edit'
                });
                Notify.modal('필수 개인정보를 입력하세요.', 'warning');
              }
            }
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=template&id=5322a9b3&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=template&id=5322a9b3&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("pop-up"), _vm._v(" "), _c("b-carousel", {
    staticClass: "slide_banner",
    attrs: {
      controls: "",
      indicators: ""
    }
  }, [_c("b-link", {
    attrs: {
      to: "/shop/goods/616503"
    }
  }, [_c("b-carousel-slide", {
    attrs: {
      "img-src": _vm.s3url + "event/2023/0911/slide.jpg"
    }
  })], 1), _vm._v(" "), _c("b-link", {
    attrs: {
      to: "/shop/goods?mode=maker&keyword=radwag"
    }
  }, [_c("b-carousel-slide", {
    attrs: {
      "img-src": _vm.s3url + "event/2023/0918/slide.jpg"
    }
  })], 1), _vm._v(" "), _c("b-link", {
    attrs: {
      to: "/board/event/show/31"
    }
  }, [_c("b-carousel-slide", {
    attrs: {
      "img-src": _vm.s3url + "main/slide/2023/23041606.jpg"
    }
  }, [_c("a", {
    staticClass: "split_link",
    attrs: {
      href: "https://apps.apple.com/us/app/%ED%8F%AC%EC%82%AC%EC%9D%B4%EC%96%B8%EC%8A%A4/id1632395060?l=ko",
      id: "app01",
      target: "_blank"
    }
  }), _vm._v(" "), _c("a", {
    staticClass: "split_link",
    attrs: {
      href: "https://play.google.com/store/apps/details?id=four.science.app",
      id: "app02",
      target: "_blank"
    }
  })])], 1), _vm._v(" "), _c("b-link", {
    attrs: {
      to: "/shop/goods/925"
    }
  }, [_c("b-carousel-slide", {
    attrs: {
      "img-src": _vm.s3url + "main/slide/2023/23041604.jpg"
    }
  })], 1), _vm._v(" "), _c("b-link", {
    attrs: {
      to: "/shop/goods?ca01=45"
    }
  }, [_c("b-carousel-slide", {
    attrs: {
      "img-src": _vm.s3url + "main/slide/2023/23041603.jpg"
    }
  })], 1), _vm._v(" "), _c("b-link", {
    attrs: {
      to: "/shop/goods?ca01=22&ca02=634"
    }
  }, [_c("b-carousel-slide", {
    attrs: {
      "img-src": _vm.s3url + "main/slide/2023/23041602.jpg"
    }
  })], 1), _vm._v(" "), _c("b-link", {
    attrs: {
      to: "/shop/listing/today_pick_up/all"
    }
  }, [_c("b-carousel-slide", {
    attrs: {
      "img-src": _vm.s3url + "main/slide/2023/23041601.jpg"
    }
  })], 1)], 1), _vm._v(" "), _c("b-row", {
    staticClass: "layout",
    attrs: {
      id: "best"
    }
  }, [_c("b-col", [_c("b-img", {
    attrs: {
      src: "".concat(_vm.s3url, "main/best.gif")
    }
  })], 1), _vm._v(" "), _c("b-col", [_c("div", {
    staticClass: "box-row"
  }, _vm._l(_vm.bestRemodel, function (item, i) {
    return _c("b-link", {
      key: i,
      attrs: {
        to: {
          name: "goods_show",
          params: {
            gd_id: item.gd_id
          }
        }
      }
    }, [_c("img", {
      attrs: {
        src: item.image
      }
    }), _vm._v(" "), _c("div", {
      staticClass: "box-footer"
    }, [_c("sub-string", {
      staticClass: "box_ca",
      attrs: {
        width: 184
      },
      model: {
        value: item.ca01_name,
        callback: function callback($$v) {
          _vm.$set(item, "ca01_name", $$v);
        },
        expression: "item.ca01_name"
      }
    }), _vm._v(" "), _c("sub-string", {
      staticClass: "box_tit",
      attrs: {
        width: 184,
        line02: true
      },
      model: {
        value: item.gd_name,
        callback: function callback($$v) {
          _vm.$set(item, "gd_name", $$v);
        },
        expression: "item.gd_name"
      }
    })], 1)]);
  }), 1)])], 1), _vm._v(" "), _c("div", {
    staticClass: "recommend"
  }, [_c("div", {
    staticClass: "back"
  }), _vm._v(" "), _c("b-container", {
    staticClass: "layout"
  }, [_c("b-row", [_c("b-col", {
    staticClass: "tit"
  }, [_vm._v("포사의 추천 >")])], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    attrs: {
      col: "",
      cols: "12",
      md: "12",
      lg: "6"
    }
  }, [_c("b-link", {
    attrs: {
      to: {
        name: "goods_show",
        params: {
          gd_id: 1227
        }
      }
    }
  }, [_c("b-img", {
    attrs: {
      src: "".concat(_vm.s3url, "main/rec01.png")
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      col: "",
      cols: "6",
      md: "6",
      lg: "3"
    }
  }, [_c("b-link", {
    attrs: {
      to: {
        name: "goods_show",
        params: {
          gd_id: 46852
        }
      }
    }
  }, [_c("b-img", {
    attrs: {
      src: "".concat(_vm.s3url, "main/rec02.png")
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      col: "",
      cols: "6",
      md: "6",
      lg: "3"
    }
  }, [_c("b-link", {
    attrs: {
      to: {
        name: "goods_index",
        query: {
          ca01: "28",
          ca02: "3481",
          ca03: "3483"
        }
      }
    }
  }, [_c("b-img", {
    attrs: {
      src: "".concat(_vm.s3url, "main/rec03.png")
    }
  })], 1)], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    attrs: {
      col: "",
      cols: "6",
      md: "6",
      lg: "3"
    }
  }, [_c("b-link", {
    attrs: {
      to: {
        name: "goods_show",
        params: {
          gd_id: 7919
        }
      }
    }
  }, [_c("b-img", {
    attrs: {
      src: "".concat(_vm.s3url, "main/rec04.png")
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      col: "",
      cols: "6",
      md: "6",
      lg: "3"
    }
  }, [_c("b-link", {
    attrs: {
      to: {
        name: "goods_index",
        query: {
          ca01: "30",
          ca02: "5042"
        }
      }
    }
  }, [_c("b-img", {
    attrs: {
      src: "".concat(_vm.s3url, "main/rec06.png")
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      col: "",
      cols: "12",
      md: "12",
      lg: "6"
    }
  }, [_c("b-link", {
    attrs: {
      to: {
        name: "goods_index",
        query: {
          keyword: "goodsgood"
        }
      }
    }
  }, [_c("b-img", {
    attrs: {
      src: "".concat(_vm.s3url, "main/rec05.png")
    }
  })], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "byCate layout"
  }, [_c("b-row", {
    staticClass: "titByCate"
  }, [_c("b-col", {
    attrs: {
      tag: "h5"
    }
  }, [_vm._v("카테고리별 추천")])], 1), _vm._v(" "), _c("aside", {
    style: {
      position: _vm.cateSideMenuPosition,
      top: _vm.cateSideMenuTop,
      bottom: _vm.cateSideMenuBottom
    }
  }, [_c("ul", [_vm._l(_vm.category, function (ca, i) {
    return [![38, 46].includes(ca.ca_id) ? _c("li", {
      key: ca.ca_id,
      "class": {
        active: ca.showing
      },
      on: {
        mouseenter: function mouseenter($event) {
          ca.hover = !ca.hover;
        },
        mouseleave: function mouseleave($event) {
          ca.hover = !ca.hover;
        },
        click: function click($event) {
          return _vm.scrollToCate(i);
        }
      }
    }, [_c("img", {
      attrs: {
        src: ca.hover || ca.showing ? "".concat(_vm.s3url, "main/cate/").concat(ca.ca_id, "_.png") : "".concat(_vm.s3url, "main/cate/").concat(ca.ca_id, ".png")
      }
    }), _vm._v(" "), ca.hover ? _c("span", [_vm._v(_vm._s(ca.ca_name))]) : _vm._e()]) : _vm._e()];
  })], 2)]), _vm._v(" "), _c("b-container", {
    staticClass: "con"
  }, [_vm._l(_vm.category, function (ca) {
    return [![38, 46].includes(ca.ca_id) ? _c("b-row", {
      key: ca.ca_id
    }, [_c("b-col", {
      staticClass: "tit"
    }, [_c("b-link", {
      attrs: {
        to: {
          name: "goods_index",
          query: {
            ca01: ca.ca_id
          }
        }
      }
    }, [_c("b-img", {
      attrs: {
        src: "".concat(_vm.s3url, "main/cate/bg").concat(ca.ca_id, ".gif")
      }
    }), _vm._v(" "), _c("h6", [_vm._v(_vm._s(ca.ca_name))]), _vm._v(" "), _c("span", [_vm._v("전체보기 "), _c("b-icon-chevron-right")], 1)], 1)], 1), _vm._v(" "), _c("b-col", {
      staticClass: "list"
    }, _vm._l(_vm.best_cate[ca.ca_id], function (gd, i) {
      return _c("b-link", {
        key: i,
        staticClass: "col",
        attrs: {
          to: {
            name: "goods_show",
            params: {
              gd_id: gd.sw_key
            }
          }
        }
      }, [_c("b-img", {
        attrs: {
          fluid: "",
          src: gd.goods.image_src_thumb[0]
        }
      }), _vm._v(" "), _c("p", [_vm._v(_vm._s(gd.goods.gd_name))])], 1);
    }), 1)], 1) : _vm._e()];
  })], 2)], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.slide_banner[data-v-5322a9b3] { overflow:hidden; max-width: 1920px; margin: auto;\n}\n.slide_banner[data-v-5322a9b3] .carousel-indicators li { background-color:#898989;\n}\n.slide_banner[data-v-5322a9b3] .carousel-control-prev:hover,\r\n.slide_banner[data-v-5322a9b3] .carousel-control-next:hover { background-color:#55888888;\n}\n.slide_banner .split_link[data-v-5322a9b3] { position:absolute; display: block; width:190px; height:57px; bottom:25px; transform:translateX(-50%);\n}\n.slide_banner a#app01[data-v-5322a9b3] { left:23%;\n}\n.slide_banner a#app02[data-v-5322a9b3] { left:77%;}\n.slide_banner[data-v-5322a9b3] .evt01 .split_evt01 { position:absolute; display: block; width: 700px; height:150px; right:0;\n}\n.slide_banner[data-v-5322a9b3] .evt01 .split_evt01:hover { border:15px solid #015B7E; opacity: .3;\n}\n.slide_banner[data-v-5322a9b3] .evt01 .carousel-caption { position:static; padding:0;\n}\n.slide_banner a#evt01_1[data-v-5322a9b3] { bottom:143px;\n}\n.slide_banner a#evt01_2[data-v-5322a9b3] { bottom: 0px;\n}\n#best[data-v-5322a9b3] { margin-top:26px;\n}\n#best>.col[data-v-5322a9b3] { padding:0;\n}\n#best>.col[data-v-5322a9b3]:nth-of-type(1) { flex:0 0 6.933334%; max-width:6.933334%; padding-top:20px;\n}\n#best>.col[data-v-5322a9b3]:nth-of-type(2) { flex:0 0 93.066666%; max-width:93.066666%;\n}\n#best .col .box-row[data-v-5322a9b3] { display:flex; justify-content:center; align-items:center; width:100%; height:320px;\n}\n#best .col .box-row a[data-v-5322a9b3] { position: relative; background-color: #FFFFFF; height:288px; width:220px; margin:10px;\n}\n#best .col .box-row a[data-v-5322a9b3]:last-of-type { margin-right:0;\n}\n#best .col .box-row a img[data-v-5322a9b3] { width: 100%; height: 210px; -o-object-fit:contain; object-fit:contain; border: 1px solid #B7B7B7;\n}\n#best .col .box-row a .box-footer[data-v-5322a9b3] { position:absolute; bottom:0; height:80px; padding:10px 15px;\n}\n#best .col .box-row a .box-footer .box_ca[data-v-5322a9b3] { color:#1A8FD4; margin-bottom:3px; font-size:.8rem;\n}\n#best .col .box-row a .box-footer .box_tit[data-v-5322a9b3] { font-weight:bold;\n}\n.recommend .back[data-v-5322a9b3] { background:#fbcad0; position:absolute; width:100%; height:18.5rem;\n}\n.recommend .container .row[data-v-5322a9b3]:last-child { margin-top:2rem;\n}\n.recommend .container .row .tit[data-v-5322a9b3] { color:#FFF; font-style:italic; font-size:1.4rem; font-weight:bold; margin-top:1.9Rem; margin-bottom: .6REM;\n}\n.recommend .container .row .col[data-v-5322a9b3] { padding:0 15px;\n}\n.recommend .container .row .col a[data-v-5322a9b3] { display:block;\n}\n.recommend .container .row .col a img[data-v-5322a9b3] { border:1px solid #CCC; border-radius:10px; width:100%;\n}\n.byCate[data-v-5322a9b3] { position:relative; margin-top:5rem;\n}\n.byCate .titByCate[data-v-5322a9b3] { margin-bottom:1.5rem;\n}\n.byCate .titByCate h5[data-v-5322a9b3] { font-style:italic; font-weight:bold; font-size:2rem;\n}\n.byCate aside[data-v-5322a9b3] { margin-left:-76px; z-index:1;\n}\n.byCate aside ul[data-v-5322a9b3] { border:1px solid #898989;\n}\n.byCate aside ul li[data-v-5322a9b3] { padding:4px 6px; cursor:pointer; position:relative;\n}\n.byCate aside ul li.active[data-v-5322a9b3],\r\n.byCate aside ul li[data-v-5322a9b3]:hover { background:#448AC8;\n}\n.byCate aside ul li span[data-v-5322a9b3] { padding-left:10px; background:#448AC8; position:absolute; width:216px; color:#fff; z-index:1; top:0; line-height:44px;\n}\n.byCate .con .row[data-v-5322a9b3] { border-top:2px solid #4A505C; margin-bottom:2.5rem;\n}\n.byCate .con .row .col[data-v-5322a9b3] { padding:0;\n}\n.byCate .con .row .tit[data-v-5322a9b3] { flex:0 0 13.4%; max-width:200px; border-right:1px solid #B1B1B1; border-bottom:1px solid #B1B1B1;\n}\n.byCate .con .row .tit a[data-v-5322a9b3] { display:block; position:relative; height:100%; padding: 24px 0 0 16px;\n}\n.byCate .con .row .tit a img[data-v-5322a9b3] { position:absolute; z-index:-1; width:200px; height:500px; -o-object-fit:cover; object-fit:cover; top:0; left:0;\n}\n.byCate .con .row .tit a h6[data-v-5322a9b3] { font-weight:bold; font-size:1.5rem;\n}\n.byCate .con .row .tit a span[data-v-5322a9b3] { color:#9FA0A2;\n}\n.byCate .con .row .list[data-v-5322a9b3] { display:flex; flex-wrap:wrap;\n}\n.byCate .con .row .list .col[data-v-5322a9b3] { flex:0 0 16.666666%; max-width:16.666666%; padding:16px; text-align:center; border-right:1px solid #B1B1B1; border-bottom:1px solid #B1B1B1;\n}\n.byCate .con .row .list .col img[data-v-5322a9b3] { width:166px; height:166px; -o-object-fit:contain; object-fit:contain;\n}\n.byCate .con .row .list .col p[data-v-5322a9b3] { margin:9px 0 0 0; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; height:42px; font-size:14px;\n}\n@media (max-width: 992px){\n.slide_banner[data-v-5322a9b3] .carousel-inner { left:50%; transform:translateX(-50%); width:900px;\n}\n#best[data-v-5322a9b3] { flex-direction: column; margin-top: 10px;\n}\n#best>.col[data-v-5322a9b3]:nth-of-type(1) { padding:0;\n}\n#best>.col[data-v-5322a9b3]:nth-of-type(2) { flex:0 0 100%; max-width:100%;\n}\n#best .col .box-row[data-v-5322a9b3] { flex-wrap:wrap; height:auto;\n}\n#best .col .box-row a[data-v-5322a9b3] { flex:0 0 33.333334%; max-width:33.333334%; height:180px; margin:0; padding:10px;\n}\n#best .col .box-row a img[data-v-5322a9b3] { height:110px;\n}\n#best .col .box-row a .box-footer[data-v-5322a9b3] { padding: 0 5px; position: static; height: auto; line-height: 1;}\n#best .col .box-row a .box-footer .box_ca[data-v-5322a9b3] { font-size: calc(.3vw + .5rem);\n}\n#best .col .box-row a .box-footer .box_tit[data-v-5322a9b3] { font-size: calc(.3vw + .7rem);\n}\n.recommend .container .row:nth-of-type(2) .col-md-6[data-v-5322a9b3],\r\n    .recommend .container .row[data-v-5322a9b3]:last-child,\r\n    .recommend .container .row:last-child .col-md-12[data-v-5322a9b3]  { margin-top:.5rem;\n}\n.byCate .titByCate[data-v-5322a9b3] { margin:0;\n}\n.byCate .con .row[data-v-5322a9b3] { flex-direction:column; margin-bottom:1rem;\n}\n.byCate .con .row .tit[data-v-5322a9b3] { max-width: 100%;\n}\n.byCate .con .row .tit a[data-v-5322a9b3] { padding: 8px 0 0 8px;\n}\n.byCate .con .row .tit a img[data-v-5322a9b3] { display:none;\n}\n.byCate .con .row .tit a h6[data-v-5322a9b3] { display:inline-block;\n}\n.byCate .con .row .list .col[data-v-5322a9b3] { padding:5px; flex: 0 0 25%; max-width: 25%;\n}\n.byCate .con .row .list .col img[data-v-5322a9b3] { width:100%; height:80px;\n}\n.byCate .con .row .list .col p[data-v-5322a9b3] { font-size: calc(.3vw + .7rem); margin:0; height:auto;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_style_index_0_id_5322a9b3_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_style_index_0_id_5322a9b3_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_style_index_0_id_5322a9b3_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/web/Main.vue":
/*!*****************************************!*\
  !*** ./resources/js/views/web/Main.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Main_vue_vue_type_template_id_5322a9b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Main.vue?vue&type=template&id=5322a9b3&scoped=true& */ "./resources/js/views/web/Main.vue?vue&type=template&id=5322a9b3&scoped=true&");
/* harmony import */ var _Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Main.vue?vue&type=script&lang=js& */ "./resources/js/views/web/Main.vue?vue&type=script&lang=js&");
/* harmony import */ var _Main_vue_vue_type_style_index_0_id_5322a9b3_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true& */ "./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Main_vue_vue_type_template_id_5322a9b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Main_vue_vue_type_template_id_5322a9b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5322a9b3",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/web/Main.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/web/Main.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/views/web/Main.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Main.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/web/Main.vue?vue&type=template&id=5322a9b3&scoped=true&":
/*!************************************************************************************!*\
  !*** ./resources/js/views/web/Main.vue?vue&type=template&id=5322a9b3&scoped=true& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_5322a9b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_5322a9b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_5322a9b3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Main.vue?vue&type=template&id=5322a9b3&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=template&id=5322a9b3&scoped=true&");


/***/ }),

/***/ "./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_style_index_0_id_5322a9b3_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/web/Main.vue?vue&type=style&index=0&id=5322a9b3&lang=css&scoped=true&");


/***/ })

}]);