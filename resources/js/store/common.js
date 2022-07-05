import ax from '@/api/http';

export default {
    namespaced: true,
    state: {
        siteInfo: {
            site:{},
            bank:{},
            biz:{},

        },
    },
    getters:{
        siteInfo (state) { return state.siteInfo; },
    },
    mutations: {
        setInfo(state, v) {
            state.siteInfo = v;
        },
    },
    actions: {
        async siteInfo(context){
            const res = await ax.get(`/api/siteInfo`);
            if (res && res.status === 200) {
                context.commit('setInfo', res.data);
            }
        },
    },
}
