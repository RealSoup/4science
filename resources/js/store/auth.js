import ax from '@/api/http';

export default {
    namespaced: true,
    state: {
        isLoggedin: false,
        user:{},
        csrfToken: "",
    },
    getters:{
        user (state) { return state.user; },
        isLoggedin (state) { return state.isLoggedin; },
        csrfToken (state) { return state.csrfToken; },
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
    },
    actions: {
        async login(context, frm){
            await ax.get('/sanctum/csrf-cookie');
            await ax.post('/login', frm);
            return context.dispatch('getAuth');
        },
        async logout(context){
            await ax.post('/logout')
            context.commit('setIsLoggedin', false)
            context.commit('setUser', null)
            context.commit('setToken', null)
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
