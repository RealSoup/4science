import ax from '@/api/http';
import router from '@/router';

export default {
    namespaced: true,
    state: {
        frm: {
            ca01:0,
            ca02:0,
            ca03:0,
            ca04:0,
            mk_id:0,
            mode:'',
            keyword:'',
            sort:'',
            page:0,
        },
        list: {},
        categorys: {},
        sch_cate_info: {},
        pick: [],
        isLoadingModalViewed:false,
        default: {},
    },
    getters:{
    },
    mutations: {
        setFrm (state, param) {
            state.frm.ca01      = param.ca01;
            state.frm.ca02      = param.ca02;
            state.frm.ca03      = param.ca03;
            state.frm.ca04      = param.ca04;
            state.frm.mk_id     = param.mk_id;
            state.frm.mode      = param.mode;
            state.frm.keyword   = param.keyword;
            state.frm.sort      = param.sort;
            state.frm.page      = param.page;
        },
        setData (state, param) {
            state.list = param.list;
            state.categorys = param.categorys;
            state.sch_cate_info = param.sch_cate_info;
            state.pick = param.pick;
            state.isLoadingModalViewed= false;
        },
    },
    actions: {
        async index(context){
            context.state.isLoadingModalViewed= true;
            let nfrm = {};
            for (let i in context.state.frm) {
                if ( !isEmpty(context.state.frm[i]) )
                    nfrm[i] = context.state.frm[i];
            }
            const res = await ax.get(`/api/shop/goods`, { params: nfrm});
            if (res && res.status === 200) {
                context.commit('setData', res.data);
            }
        },
        routerPush(context, payload){
            if (payload == 'new') {
                context.state.frm.ca01 = 0;
                context.state.frm.ca02 = 0;
                context.state.frm.ca03 = 0;
                context.state.frm.ca04 = 0;
                context.state.frm.page = 0;
            }

            let nfrm = {};
            for (let i in context.state.frm) {
                if ( !isEmpty(context.state.frm[i]) )
                    nfrm[i] = context.state.frm[i];
            }
            router.push({ name: 'goods_index', query: nfrm }).catch(()=>{});
        },
    },
}