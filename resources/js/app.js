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
    if (res.data === 1) {
        ax.get('/api/user').then((response) => {
            console.log('app.js auth check : ', response.data);

            store.state.auth.isLoggedin= true;
            store.state.auth.user= response.data.user;
            store.state.auth.csrfToken= response.data.token;
            document.querySelector('meta[name=csrf-token]').setAttribute('content', response.data.token);
            playVue();
        })
    } else {
        playVue();
    }
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
