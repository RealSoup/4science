import axios from 'axios';
import store from '@/store';
import router from '@/router';

const instance = axios.create({
    baseURL: process.env.MIX_APP_URL,
    withCredentials: true,
    // headers: {
    //     // 'Accept' : 'application/json',
    //     // 'Content-Type' : 'application/json',
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'X-CSRF-TOKEN' : document.head.querySelector('meta[name="csrf-token"]').content,
    // }
});


instance.interceptors.request.use(function (config) {
    //  라라벨 Passport 기능으로 토큰 문제 처리함
    // if (store.state.auth.user !== null && store.state.auth.user.api_token !== null) {
    //     config['headers'] = {
    //         Authorization: `Bearer ${store.state.auth.token}`
    //     };
    // }
    // store.commit('error/setAuthorizationError', {});
    // store.commit('error/setIdentifyError', {});
    return config;
});

/*instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status !== 419) return Promise.reject(error)
    window.location.reload()
  }
)*/
instance.interceptors.response.use(function (response) {
    store.commit('error/setValidationError', {});
    return response;
}, function (error) {
    if (error.response.status === 401) {
        if (error.response.config.url !== "/api/user") {
            store.dispatch('auth/logout');
            // router.push({name:'login', query:{redirect:router.history.current.path}});
            // Notify.modal(error.response.data.message);
            //  vue의 라우터에서 체크하고 리다이렉트 시킨다
            //  여기서도 하면 2번 리다이렉트 되서 주석 처리한다.
            return false;
        }
    } else if (error.response.status === 422) {
        store.commit('error/setValidationError', error.response.data.errors);
        for (let i in error.response.data.errors) {
            document.getElementById(i).focus();
            return false;
        }

    } else if (error.response.status === 403 || error.response.status === 500) {
        // store.commit('error/setAuthorizationError', error.response.data.message);
        Notify.modal(error.response.data.msg);
        // router.go(-1);
        return false;
    }
    
    return Promise.reject(error);
});

export default instance;
