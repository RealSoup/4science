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
            router.push({name:'login', query:{redirect:router.history.current.path}});
            // Notify.modal(error.response.data.message);
            //  vue의 라우터에서 체크하고 리다이렉트 시킨다
            //  여기서도 하면 2번 리다이렉트 되서 주석 처리한다.
            return false;
        }
    } else if (error.response.status === 403) {
        Notify.modal(error.response.data.message);
        if ( error.response.data.message === "Your email address is not verified." )
            router.push({name:'email_verify'})
            // .catch((e) => console.log(e));
            .catch(() => true);
        return false;
    } else if (error.response.status === 422) {
        if ( typeof error.response.data.errors['email'] !== "undefined" && error.response.data.errors['email'][0] === 'These credentials do not match our records.') {
            Notify.modal('로그인 정보를 확인하세요');
        } else {
            store.commit('error/setValidationError', error.response.data.errors);
            for (let i in error.response.data.errors) {
                document.getElementById(i).focus();
                return false;
            }
        }
        return false;
    } else if (error.response.status === 500) {
        // store.commit('error/setAuthorizationError', error.response.data.message);
        Notify.modal(error.response.data.msg);
        // router.go(-1);
        return false;
    }
    
    return Promise.reject(error);
});

export default instance;