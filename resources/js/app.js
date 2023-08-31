import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import "@/fontAwesomeIcon.js"; // fontAwesomeIcon.js 불러옴

import VueCookies from "vue-cookies";
Vue.use(VueCookies);
Vue.$cookies.config("7d");  //쿠키의 만료일은 7일이다. (글로벌 세팅)

import VueSession from 'vue-session'
Vue.use(VueSession, { persist: true });

import App from './App.vue';
import router from './router/index';
import store from './store/index';
import { value, initSet } from './init';


Vue.component('pagination', require('laravel-vue-pagination'));

//  validateion     ==================================
import { ValidationObserver, ValidationProvider, extend, localize } from "vee-validate";
import ko from "vee-validate/dist/locale/ko.json";
import * as rules from "vee-validate/dist/rules";
// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});
localize("ko", ko);
// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
extend("korAlphaNum", {
    validate: value => {
        let regex = /^[가-힣|aA-zZ]*$/.test(value)
        if (!regex) {
            return "올바른 한글, 영문만 입력해주세요."
        } else {
            return true
        }
    },
});
extend("BizNum", {
    validate: value => {
        let regex = /^(\d{3,3})+[-]+(\d{2,2})+[-]+(\d{5,5})/.test(value)
        if (!regex) {
            return "올바른 사업자 등록번호를 입력해주세요."
        } else {
            return true
        }
    },
});

extend('pwCheck', {
    validate: value => {
        let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{6,20}$/.test(value)
        if (!regex) {
            return "1개 이상의 문자와 1개 이상의 숫자가 포합된 조합. 입력 가능한 특수문자 ~!@#$%^&*()+|="
        } else {
            return true
        }
    },
});
//  validateion     ==================================


Vue.config.productionTip = false;





import './library/filters';
// import './library/index';
import Plugin from './library/index';
Vue.use(Plugin);



import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
Vue.use(PerfectScrollbar)

//  paper print     ==================================
// https://github.com/mycurelabs/vue-html-to-paper
import VueHtmlToPaper from 'vue-html-to-paper';
const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
        '/css/fontawesome_svg.css'
    ],
    timeout: 1000, // default timeout before the print window appears
    autoClose: false, // if false, the window will not close after printing
    windowTitle: window.document.title, // override the window title
}
Vue.use(VueHtmlToPaper, options);
//  paper print     ==================================
 
import VueScrollactive from 'vue-scrollactive';
Vue.use(VueScrollactive);





import VueGtm from '@gtm-support/vue2-gtm';

Vue.use(VueGtm, {
  id: 'GTM-NJK884V', // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
  queryParams: {
    // Add URL query string when loading gtm.js with GTM ID (required when using custom environments)
    gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
    gtm_preview: 'env-4',
    gtm_cookies_win: 'x',
  },
  defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
  compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
  nonce: '2726c7f26c', // Will add `nonce` to the script tag
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: false, // Whether or not display console logs debugs (optional)
  loadScript: false, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  ignoredViews: ['https://4science.net/'], // Don't trigger events for specified router names (optional)
  trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
});






let nextPath= '/login';
router.onError((error) => {
    console.error(error);

    if (error.name === 'ChunkLoadError') {
        window.location.href = nextPath || '/';
    } else {
        console.log('ChunkLoadError');
    }
});


const playVue = () => {
    new Vue({
        router,
        store,
        beforeCreate() {
            // this.$store.dispatch("auth/getAuthUser");
        },
        watch: {
            '$route': {
                handler: function(path) {
                    initSet();
                },
                deep: true,
                // immediate: true
            }
        },
        render: h => h(App)
    }).$mount('#app');
};

import ax from '@/api/http';
ax.get('auth_check').then((res) => {
    playVue();
    // if (res.data === 1) {
    //     ax.get('/api/user').then((response) => {
    //         if (response) {
    //             store.state.auth.isLoggedin= true;
    //             store.state.auth.user= response.data.user;
    //             store.state.auth.csrfToken= response.data.token;
    //             document.querySelector('meta[name=csrf-token]').setAttribute('content', response.data.token);
    //             ax.get('/api/shop/goods/getDef').then((response) => { if (response) store.state.goods.default= response.data; });
    //             playVue();
    //         } else {
    //             playVue();
    //         }
    //     });
    // } else {
    //     playVue();
    // }
}).catch(() => {});




// const app = new Vue({
//     router,
//     store,
//     beforeCreate() {
//         // this.$store.dispatch("auth/getAuthUser");
//     },
//     watch: {
//         '$route': {
//             handler: function(path) {
//                 initSet();
//             },
//             deep: true,
//             // immediate: true
//         }
//     },
//     render: h => h(App),
// }).$mount('#app');
