// import Vue from 'vue';
import store from '@/store/index';
// import router from '@/router';
// import ax from '@/api/http';
// const vm = new Vue({store});


let initSet = () => {
    // ax.get('auth_check').then((res) => {
    //     if (res.data === 1) {
    //         store.dispatch('auth/getAuth');
    //     }
    // }).catch(() => {});

    // if (window.auth_user && window.auth_user.hasOwnProperty('api_token')) {
    //     vm.$store.state.isLoggedin = true;
    //     vm.$store.state.user = window.auth_user;
    // }

    // if (path[1] === 'admin') {      vm.$store.state.mode = 'adm'; }
    // else if (path[1] === 'login') { vm.$store.state.mode = 'login'; }
    // else {                          vm.$store.state.mode = 'web'; }

    let path = window.location.pathname.split('/');
    if (path[1] === 'admin') {      store.state.mode = 'adm'; }
    else if (path[1] == 'login' || path[1] == 'register' || path[1] == 'email_verify' || path[1] == 'password' || path[1] == 'auth') { store.state.mode = 'simple'; }
    else {                          store.state.mode = 'web'; }


}

export { initSet } // 'export default' 아님! 그냥 'export'
