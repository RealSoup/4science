import http from '@/api/http';
import router from '@/router';
import copy from "fast-copy";

export default {
    namespaced: true,
    state: {
        cartList: [],
    },
    getters:{
        cartList: state => {
            return state.cartList;
        },
        totalPrice: state => {
            return state.cartList.reduce(function (acc, el) {
                return acc + parseInt(el.price_add_vat * el.ea);
            }, 0);
        },
    },
    mutations: {
        setList(state, data) {
            state.cartList = data;
        },
        // insertItem(state, data) {
        //     // state.cartList = Object.assign(
        //     //     {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
        //     //     data, // 삽입하려는 내용
        //     //     state.cartList, // 수정하려는 객체
        //     // )
        //     // console.log(data);
        //     /*state.cartList.splice(0, 0, data)*/

        // },

        cartIdUpdate(state, data) {
            state.cartList.forEach(ct => {
                if (ct.type == 'model' && data.hasOwnProperty('cm_gm_id') && ct.gm_id == data.cm_gm_id)     ct.cm_id = data.cm_id;
                if (ct.type == 'option' && data.hasOwnProperty('co_goc_id') && ct.goc_id == data.co_goc_id) ct.co_id = data.co_id;
            });            
        },

        destroyItem(state, data) { state.cartList.splice(data.i, 1); },
    },
    actions: {
        async index(context){
            try {
                if (Auth.check()) {
                    const res = await http.get('/api/shop/cart');
                    if (res.status === 200) {
                        context.commit('setList', res.data);
                    }
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },

        examine(context, payload){
            try {
                let gd_id = 0;
                let ct_index = 0;
                payload.goods.goods_model.forEach(gm => {
                    if ( gm.ea > 0 ) {
                        let existFlag = false;
                        context.state.cartList.forEach((ct, i) => {
                            if ( ct.gd_id == payload.goods.gd_id )
                                ct_index = i;

                            if ( ct.type == 'model' && ct.gm_id == gm.gm_id ) {
                                ct.ea += gm.ea;
                                existFlag = true;
                                context.dispatch('update', { cm_id: ct.cm_id, ea: ct.ea });
                            }
                        });

                        if (!existFlag) {
                            if (ct_index == 0)  ct_index = context.state.cartList.length
                            else                ct_index += 1;
                            context.state.cartList.splice(ct_index, 0, {
                                gd_id:          payload.goods.gd_id,
                                gm_id:          gm.gm_id,
                                type:           "model",
                                img:            payload.goods.image_src_thumb[0],
                                ct_check_opt:   'Y',
                                gm_name:        gm.gm_name,
                                price_add_vat:  gm.gm_price_add_vat,
                                ea:             gm.ea,
                            });
                            context.dispatch('store', { gd_id: payload.goods.gd_id, gm_id: gm.gm_id, ea: gm.ea });
                        }
                    }
                });

                payload.goods.goods_option.forEach(go => {
                    go.goods_option_child.forEach(goc => {
                        if ( goc.ea > 0 ) {
                            let existFlag = false;
                            context.state.cartList.forEach((ct, i) => {
                                if ( ct.type == 'option' && ct.goc_id == goc.goc_id ) {
                                    ct.ea += goc.ea;
                                    existFlag = true;
                                    context.dispatch('update', { co_id: ct.co_id, ea: ct.ea });
                                }
                            });

                            if (!existFlag) {
                                ct_index+=1;
                                context.state.cartList.splice(ct_index+1, 0, {
                                    gd_id:          payload.goods.gd_id,
                                    goc_id:         goc.goc_id,
                                    type:           "option",
                                    ct_check_opt:   'Y',
                                    goc_name:       goc.goc_name,
                                    price_add_vat:  goc.goc_price_add_vat,
                                    ea:             goc.ea,
                                });
                                context.dispatch('store', { gd_id: payload.goods.gd_id, go_id: goc.goc_go_id, goc_id: goc.goc_id, ea: goc.ea });
                            }
                        }
                    });
                });
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async store(context, payload){
            try {
                if (Auth.check()) {
                    const res = await http.post('/api/shop/cart', payload);
                    if (res.status === 200)
                        context.commit('cartIdUpdate', res.data);
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async update(context, payload){
            try {
                if (Auth.check()) {
                    payload._method = 'PATCH';
                    const res = await http.post(`/api/shop/cart/update`, payload);
                    if (res.status === 200) {
                        Notify.toast('success', res.data);
                        // context.commit('setList', res.data);
                    }
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async destroy(context, payload){
            try {
                if (Auth.check()) {
                    let params = {_method : 'DELETE', payload};
                    const res = await http.post(`/api/shop/cart/0`, params);
                    if (res.status === 200) {
                        Notify.toast('success', res.data);
                        // commit('destroyItem', payload);
                        context.dispatch('index')
                    }
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },

        routeAction({commit, state}, payload) {
            let params = [];
            state.cartList.forEach(ct => {
                if (ct.ea > 0 && ct.ct_check_opt == 'Y') {
                    if (ct.type == 'model')         params.push({gd_id:ct.gd_id, gm_id:ct.gm_id, ea:ct.ea});
                    else if (ct.type == 'option')   params.push({gd_id:ct.gd_id, goc_id:ct.goc_id, ea:ct.ea});
                }               
            });
            let cntModel = params.reduce(function(acc, el) {
                return (el.hasOwnProperty('gm_id')) ? acc+1 : acc;
            }, 0);

            if (!cntModel) {
                Notify.modal("모델을 선택하세요", 'info');
                return false;
            }

            switch (payload) {
                case "settle":
                    router.push({name: 'order_settle', params: { od_goods: params, od_type: 'buy_cart' }});
                break;

                case "estimate":
                    router.push({name: 'estimate_create', params: {od_goods: params}});
                break;
            }
        },
    },
}
