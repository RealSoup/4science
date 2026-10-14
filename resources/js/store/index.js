import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);
import auth from './auth'
import error from './error';
import cart from './cart';
import goods from './goods';
import category from './category';
import common from './common';
import recent_goods from './recent_goods';


export default new Vuex.Store({
    strict: false,     //  Vuex 검사 모드 끔 - 이 코드는 화면에서 store 값을 바로 바꾸는 곳이 많음
    state:{
        mode:'web',
    },
    mutations:{
    },
    actions:{
    },
    getters:{
    },
    modules: {
        auth,
        error,
        cart,
        goods,
        category,
        common,
        recent_goods,
    }
});
