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
            keyword_extra:'',
            sort:'hot',
            page:0,
            referer: document.referrer
        },
        list: {},
        categorys: {},
        sch_cate_info: {},
        pick: [],
        category_picks: [],
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
            state.frm.keyword_extra   = param.keyword_extra;
            state.frm.sort      = param.sort;
            state.frm.page      = param.page;
        },
        setData (state, param) {
            state.list = param.list;
            state.categorys = param.categorys;
            state.sch_cate_info = param.sch_cate_info;
            state.pick = param.pick;
            state.category_picks = param.category_picks;
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


            let res;
            if (['search_test'].includes(router.currentRoute.name)) {
                res = await ax.get(`/api/test/search_test`, { params: nfrm});
            } else {
                res = await ax.get(`/api/shop/goods`, { params: nfrm});
            }




            
            
            if (res && res.status === 200) {
                if(res.data == 'no-catno'){
                    Notify.modal("Cat.No 형식이 아닙니다.", 'warning');
                    context.commit('setData', {list:[], categorys:[], sch_cate_info:[],pick:[],category_picks:[]});
                } else {
                    context.commit('setData', res.data);
                }
            }
        },
        routerPush(context, payload){
            if (payload == 'new') {
                context.state.frm.ca01 = 0;
                context.state.frm.ca02 = 0;
                context.state.frm.ca03 = 0;
                context.state.frm.ca04 = 0;
                context.state.frm.mk_id = 0;
                context.state.frm.page = 0;
                context.state.frm.sort = 'hot';
                context.state.frm.keyword_extra = '';
            }
            
            // if( context.state.frm.keyword == 'trc' ) {
            //     context.state.frm.ca01 = 28;
            //     context.state.frm.ca02 = 3614;
            //     context.state.frm.keyword = '';
            // }

            let nfrm = {};
            for (let i in context.state.frm) {
                if ( !isEmpty(context.state.frm[i]) )
                    nfrm[i] = context.state.frm[i];
            }
            // router.push({ name: 'goods_index', query: nfrm }).catch(()=>{});


            // 조건별 라우팅 처리
            if (['new_main', 'new_goods_index'].includes(router.currentRoute.name)) {
                router.push({ name: 'new_goods_index', query: nfrm }).catch(() => {});
            } else if (['search_test'].includes(router.currentRoute.name)) {                
                router.push({ name: 'search_test', query: nfrm }).catch(() => {});
            } else {
                router.push({ name: 'goods_index', query: nfrm }).catch(() => {});
            }
        },
    },
}