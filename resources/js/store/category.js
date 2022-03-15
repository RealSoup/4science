import ax from '@/api/http';

export default {
    namespaced: true,
    state: {
        categorys:[],
    },
    mutations: {

        index(state, data) {
            state.loading  = false;
            state.categorys  = data.categorys;
        },

    },
    actions: {
        async index(context, ca_id){
            try {
                const res = await ax.get(`/api/admin/category/${ca_id}`);
                if (res && res.status === 200) {
                    context.commit('index', res.data);
                }
            } catch (e) {
                this._vm.errorConsolePrint(e);
            }
        },


    },
}
