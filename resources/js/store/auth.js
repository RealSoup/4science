import ax from '@/api/http';
import router from '@/router';

export default {
    namespaced: true,
    state: {
        isLoggedin: false,
        user:{},
        csrfToken: "",
        enable_mileage:0,
    },
    getters:{
        user (state) { return state.user; },
        isLoggedin (state) { return state.isLoggedin; },
        csrfToken (state) { return state.csrfToken; },
        enableMileage (state) { return state.enable_mileage; },
    },
    mutations: {
        setUser(state, v) {
            state.user = v;
        },
        setIsLoggedin(state, v) {
            state.isLoggedin = v;
        },
        setToken(state, v) {
            state.csrfToken = v;
        },
        setEnableMileage(state, v) {
            state.enable_mileage = v;
        },
    },
    actions: {
        async login(context, frm){
            await ax.get('/sanctum/csrf-cookie');
            await ax.post('/login', frm).then((res) => {
                if (res && res.status === 204)  return context.dispatch('getAuth');                
            }).catch(() => {});
        },
        async logout(context){
            await ax.post('/logout');
            context.commit('setIsLoggedin', false);
            context.commit('setUser', null);
            context.commit('setToken', null);
            console.log(router.name);
            router.push({ name: 'main' });
        },
        async getAuth({commit}){
            await ax.get('/api/user').then((response) => {
                commit('setIsLoggedin', true)
                commit('setUser', response.data.user)
                commit('setToken', response.data.token)
                document.querySelector('meta[name=csrf-token]').setAttribute('content', response.data.token);
            }).catch(() => {
                commit('setIsLoggedin', false)
                commit('setUser', null)
                commit('setToken', null)
            })
        },
    },
}
