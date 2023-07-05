import ax from '@/api/http';
import router from '@/router';
export default {
    namespaced: true,
    state: {
        recent_goods_view:false,
        list: [],
    },
    mutations: {
        switch (state, param) {
            state.recent_goods_view=param.recent_goods_view;
        },
        setList (state, param) {
            state.list=param;
        },
    },
    actions: {
        async index(context){
            try {
                const res = await ax.get(`/api/shop/goods/recentGoods`);
                if (res && res.status === 200)
                    context.commit('setList', res.data);
            } catch (e) {
                console.log(e);
                // this._vm.errorConsolePrint(e);
            }
        },
    },
}
