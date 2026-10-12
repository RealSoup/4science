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

import Plugin from './library/index';
Vue.use(Plugin);

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
Vue.config.devtools = process.env.NODE_ENV !== 'production';




import './library/filters';
// import './library/index';




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
        'scrollbars=yes',
        'width=900', 
        'height=800',
    ],
    styles: [
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
        '/css/fontawesome_svg.css'
    ],
    timeout: 1000, // default timeout before the print window appears
    autoClose: false, // if false, the window will not close after printing
    windowTitle: '4SCIENCE.NET', // override the window title
}
Vue.use(VueHtmlToPaper, options);
//  paper print     ==================================
 
import VueScrollactive from 'vue-scrollactive';
Vue.use(VueScrollactive);


import VueGtm from '@gtm-support/vue2-gtm';
Vue.use(VueGtm, {
    id: 'GTM-NRSG9LSM',
    defer: false,
    compatibility: false,
    nonce: '2726c7f26c',
    enabled: true,
    debug: false,
    loadScript: true,
    vueRouter: router,
    trackOnNextTick: false,
});

import Meta from 'vue-meta';
Vue.use(Meta);

//  배포 직후 예전 app.js를 가진 브라우저가 청크를 못 받으면, 가려던 주소로 새로 접속시켜 최신 파일을 받게 함
router.onError((error) => {
    console.error(error);

    const isChunkError = error.name === 'ChunkLoadError' || /Loading (CSS )?chunk \d+ failed/i.test(error.message);
    if (!isChunkError) return;

    const target = router.history.pending ? router.history.pending.fullPath : location.pathname + location.search;

    //  같은 주소로 10초 안에 또 실패하면 무한 새로고침 방지를 위해 멈춤
    let last = null;
    try { last = JSON.parse(sessionStorage.getItem('chunk_reload') || 'null'); } catch (e) {}
    if (last && last.path === target && Date.now() - last.at < 10000) return;
    try { sessionStorage.setItem('chunk_reload', JSON.stringify({ path: target, at: Date.now() })); } catch (e) {}

    window.location.assign(target);
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
    if (res && res.data === 1) {
        ax.get('/api/user').then((user_res) => {
            //  응답이 깨져 user 정보가 없으면 로그인 처리하지 않음
            if (user_res && user_res.data && user_res.data.user) {
                store.state.auth.isLoggedin= true;
                store.state.auth.user= user_res.data.user;
                store.state.auth.csrfToken= user_res.data.token;
                store.state.auth.unAuth_user = false;
                document.querySelector('meta[name=csrf-token]').setAttribute('content', user_res.data.token);
                ax.get('/api/shop/goods/getDef').then((gd_res) => { if (gd_res) store.state.goods.default= gd_res.data; }).catch(() => {});
            } else if (!user_res) {
                store.state.auth.unAuth_user = true;   //  403(이메일 미인증)일 때만
            }
            playVue();
        }).catch(() => playVue());
    } else {
        playVue();
    }
}).catch(() => playVue());   //  auth_check 실패해도 화면은 띄움

// chrome에서 개발자도구에서 콘솔에서 찍어볼수있다 document.getElementsByTagName('a')[0].__vue__.$store.state