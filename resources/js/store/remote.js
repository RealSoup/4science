import router from '@/router';
export default {
    namespaced: true,
    state: {
        recent_goods_view:false,
    },
    mutations: {
        setData (state, param) {
            state.recent_goods_view=param.recent_goods_view;
        },
    },
}
