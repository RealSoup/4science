"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[945],{17173:(o,t,e)=>{e.d(t,{Z:()=>a});var i=e(23645),n=e.n(i)()((function(o){return o[1]}));n.push([o.id,".go_top_box[data-v-14c93ee5]{bottom:1%;position:fixed;right:7%;width:50px}.go_top_box .go_top[data-v-14c93ee5]{align-items:center;background-color:#000;border-radius:100%;display:flex;font-size:3rem;height:100%;justify-content:center;width:100%}.go_top_box .go_top .fade-enter-active[data-v-14c93ee5],.go_top_box .go_top .fade-leave-active[data-v-14c93ee5]{transition:opacity .5s}.go_top_box .go_top .fade-enter[data-v-14c93ee5],.go_top_box .go_top .fade-leave-to[data-v-14c93ee5]{opacity:0}.go_top_box[data-v-14c93ee5]{height:0;transition:height .7s ease}.go_top_box.view_go_top[data-v-14c93ee5]{height:50px}@media (max-width:992px){.go_top_box[data-v-14c93ee5]{display:none}}",""]);const a=n},20945:(o,t,e)=>{e.r(t),e.d(t,{default:()=>r});const i={name:"GoTop",data:function(){return{viewGoTop:!1}},methods:{scrollToTop:function(){window.scrollTo({top:0,left:0,behavior:"smooth"})},scrollListener:function(o){this.viewGoTop=window.scrollY>150}},mounted:function(){window.addEventListener("scroll",this.scrollListener)},beforeDestroy:function(){window.removeEventListener("scroll",this.scrollListener)}};var n=e(93379),a=e.n(n),s=e(17173),c={insert:"head",singleton:!1};a()(s.Z,c);s.Z.locals;const r=(0,e(51900).Z)(i,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"go_top_box list_item",class:{view_go_top:o.viewGoTop}},[e("transition",{attrs:{name:"fade"}},[o.viewGoTop?e("b-button",{staticClass:"go_top",on:{click:o.scrollToTop}},[e("b-icon-caret-up")],1):o._e()],1)],1)}),[],!1,null,"14c93ee5",null).exports}}]);