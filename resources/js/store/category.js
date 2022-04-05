import ax from '@/api/http';

export default {
    namespaced: true,
    state: {
        category:[],
    },
    mutations: {
        init(state, data) {
            state.category  = data;
        },
    },
    actions: {
        async indexAll(context){
            try {
                const res = await ax.get(`/api/category/indexAll`);
                if (res && res.status === 200)
                    context.commit('init', res.data);
            } catch (e) {
                this._vm.errorConsolePrint(e);
            }
        },
    },
}
