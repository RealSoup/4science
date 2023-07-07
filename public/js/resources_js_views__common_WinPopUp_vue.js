"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views__common_WinPopUp_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/_common/WinPopUp.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/_common/WinPopUp.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'commonPopUp',
  data: function data() {
    return {
      windowRef: null
    };
  },
  methods: {
    openWinPop: function openWinPop(uri, width, height) {
      // if( this.windowRef != null )
      // this.closeWinPop();
      //  여러새창 열어야 하는데
      //   이것때문에 닫히고 한개만 열림
      var left = screen.width ? (screen.width - width) / 2 : 0;
      var top = screen.height ? (screen.height - height) / 2 : 0;
      var attr = 'top=' + top + ', left=' + left + ', width=' + width + ', height=' + height + ', resizable=no,status=no'; // 1. 윈도우 팝업 띄우기 

      this.windowRef = window.open(uri, "", attr);

      if (this.windowRef != null) {
        this.windowRef.addEventListener('beforeunload', this.evtClose);
      } else {
        alert("window.open fail!!!");
      } // 2.  새로 띄운 윈도우 팝업창으로 부터 수신 메세지 이벤트 처리 


      window.addEventListener("message", this.recvEvtFromChild, false);
    },
    // 윈도우 팝업 닫기 
    closeWinPop: function closeWinPop() {
      if (this.windowRef) {
        this.windowRef.close();
        this.windowRef = null;
      }
    },
    evtClose: function evtClose() {
      if (this.windowRef) {
        this.windowRef.close();
        this.windowRef = null;
        this.$emit('onClose');
      }
    },
    // 3. 부모창에서 팝업창에 메세지 보내기 
    sendEvtToChild: function sendEvtToChild(evt) {
      if (!common.isValidObj(this.windowRef)) return;
      if (g_winPopup == null) return; // 4. 윈도팝업창(g_winPopup)에 함수 실행 
      //  g_winPopup 변수는 본 소스에서 선언하지 않고 아래 ChildWinPop.vue 소스인 윈도우 팝업창 측에서 선언하고 설정함

      g_winPopup.calledFromOpener(evt);
    },
    // 5. 팝업창으로 부터 수신된 이벤트 
    recvEvtFromChild: function recvEvtFromChild(evt) {
      /*
      console.log( "recvEvtFromChild......" );
      console.log( evt.data );
        if( evt.data == null  ){
          return;
      }
      let recvObj = JSON.parse( evt.data );
      
      // 5. 본 소스 WinPop.vue를 콤포넌트로 사용하는 부모 vue 측에 이벤트 전달
      this.$emit( 'onRecvEvtFromWinPop', recvObj );
      */
      if (_typeof(evt.data) == 'object' || evt.data == null) return;
      this.$emit('onRecvEvtFromWinPop', evt.data);
    }
  },
  mounted: function mounted() {// window.addEventListener("message", this.listReread);
    // this.windowRef.addEventListener('beforeunload', this.evtClose);
    // window.addEventListener("message", this.recvEvtFromChild, false);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('message', this.recvEvtFromChild);
    this.windowRef.removeEventListener('beforeunload', this.evtClose);
  }
});

/***/ }),

/***/ "./resources/js/views/_common/WinPopUp.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/_common/WinPopUp.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WinPopUp_vue_vue_type_template_id_eafdeb58___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WinPopUp.vue?vue&type=template&id=eafdeb58& */ "./resources/js/views/_common/WinPopUp.vue?vue&type=template&id=eafdeb58&");
/* harmony import */ var _WinPopUp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WinPopUp.vue?vue&type=script&lang=js& */ "./resources/js/views/_common/WinPopUp.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _WinPopUp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WinPopUp_vue_vue_type_template_id_eafdeb58___WEBPACK_IMPORTED_MODULE_0__.render,
  _WinPopUp_vue_vue_type_template_id_eafdeb58___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/_common/WinPopUp.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/_common/WinPopUp.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/_common/WinPopUp.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WinPopUp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WinPopUp.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/_common/WinPopUp.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WinPopUp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/_common/WinPopUp.vue?vue&type=template&id=eafdeb58&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/_common/WinPopUp.vue?vue&type=template&id=eafdeb58& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WinPopUp_vue_vue_type_template_id_eafdeb58___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WinPopUp_vue_vue_type_template_id_eafdeb58___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WinPopUp_vue_vue_type_template_id_eafdeb58___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WinPopUp.vue?vue&type=template&id=eafdeb58& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/_common/WinPopUp.vue?vue&type=template&id=eafdeb58&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/_common/WinPopUp.vue?vue&type=template&id=eafdeb58&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/_common/WinPopUp.vue?vue&type=template&id=eafdeb58& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);