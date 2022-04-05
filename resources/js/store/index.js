import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);
import auth from './auth'
import error from './error';
import cart from './cart';
import goods from './goods';
import scroll from './scroll';
import category from './category';


export default new Vuex.Store({
    strict: process.env.MIX_APP_ENV !== 'local',
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
        scroll,
        category,
    }
});
