import http from '@/api/http';
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
                let model =  el.goods_model.reduce((acc2, el2) => {
                    return acc2 + parseInt(el2.gm_price_add_vat * el2.ea);
                }, 0);
                let option = 0;
                if (el.hasOwnProperty('option_child')) {
                    option =  el.option_child.reduce((acc3, el3) => {
                        return acc3 + parseInt(el3.opc_price_add_vat * el3.ea);
                    }, 0);
                }
                
                return model+option;
            }, 0);
        },
    },
    mutations: {
        setList(state, data) {
            state.cartList = data;
        },
        insertItem(state, data) {
            // state.cartList = Object.assign(
            //     {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
            //     data, // 삽입하려는 내용
            //     state.cartList, // 수정하려는 객체
            // )
            // console.log(data);
            /*state.cartList.splice(0, 0, data)*/

        },

        cartIdUpdate(state, data) {
            for (var i in state.cartList) {
                for (var j in data) {
                    if (data[j].hasOwnProperty('ct_gd_id')) {
                        if (state.cartList[i].gd_id === data[j].ct_gd_id)
                            state.cartList[i].ct_id = data[j].ct_id;
                    }

                    if (data[j].hasOwnProperty('cm_gm_id')) {
                        for (var k in state.cartList[i].goods_model) {
                            if (state.cartList[i].goods_model[k].gm_id === data[j].cm_gm_id)
                                state.cartList[i].goods_model[k].cm_id = data[j].cm_id;
                        }
                    }

                    if (data[j].hasOwnProperty('co_opc_id')) {
                        for (var l in state.cartList[i].option_child) {
                            if (state.cartList[i].option_child[l].opc_id === data[j].co_opc_id)
                                state.cartList[i].option_child[l].co_id = data[j].co_id;
                        }
                    }
                }
            }
        },

        destroyItem(state, data) {
            switch (data.type) {
                case "model":
                    if (state.cartList[data.p_idx].goods_model.length === 1) {
                        state.cartList.splice(data.p_idx, 1);
                    } else {
                        state.cartList[data.p_idx].goods_model.splice(data.c_idx, 1);
                    }
                break;
                case "option":
                    state.cartList[data.p_idx].option_child.splice(data.c_idx, 1);
                break;
            }



        }
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

                //  선택된 모델 뽑아내서 업데이트하거나 저장한다.
                let addGm = copy(payload.goods.goods_model.filter(gm => gm.ea>0));

                //  선택된 옵션
                var addOp = [];
                for (var i in payload.goods.option) {   //  선택된 옵션 색출
                    if (payload.goods.option.hasOwnProperty(i)) {
                        for (var j in payload.goods.option[i].option_child) {
                            if (payload.goods.option[i].option_child.hasOwnProperty(j)) {
                                if (payload.goods.option[i].option_child[j].ea) {
                                    let cloned_op = copy(payload.goods.option[i]);
                                    delete cloned_op.option_child;

                                    let cloned_opc = copy(payload.goods.option[i].option_child[j]);
                                    cloned_opc.option = cloned_op;
                                    addOp.push(cloned_opc);
                                }
                            }
                        }
                    }
                }


                let notInCart_gd = true;
                for (var gd_i in context.state.cartList) {
                    if (context.state.cartList[gd_i].gd_id == payload.goods.gd_id) {   //  등록된 상품이 있다면
                        notInCart_gd = false;

                        /*
                            MODEL
                        */
                        for (var gm_j in addGm) {  //  같은 상품에서 선택된 삼품의 루프를 돌려
                            let notInCart_gm = true;
                            for (var gm_k in context.state.cartList[gd_i].goods_model) {  //  장바구니의 상품군에서도 모델의 루프를 돌려
                                if (addGm[gm_j].gm_id == context.state.cartList[gd_i].goods_model[gm_k].gm_id) { // 해달 모델이 있으면 갯수 증가
                                    notInCart_gm = false;
                                    context.state.cartList[gd_i].goods_model[gm_k].ea += addGm[gm_j].ea;
                                    // context.dispatch('update', {
                                    //     ct_id: context.state.cartList[gd_i].ct_id,
                                    //     gm_id: context.state.cartList[gd_i].goods_model[gm_k].gm_id,
                                    //     ea: context.state.cartList[gd_i].goods_model[gm_k].ea
                                    // });

                                    //  v-model로 연결된 해당 모델의 ea 변경시 Watch에서 감지하여 자동으로 디비 업데이트 호출
                                    //  아래 파일에 해당 메서드 기술
                                    //  C:\WorkSpace\atom-local\4sVue\resources\js\views\web\_module\CartModel.vue

                                    break;
                                }
                            }
                            if (notInCart_gm) { //  해당 모델이 없으면 모델 추가
                                context.state.cartList[gd_i].goods_model.splice(0, 0, addGm[gm_j]);
                                context.dispatch('store', {
                                    ct_id: context.state.cartList[gd_i].ct_id,
                                    gm_id: addGm[gm_j].gm_id,
                                    ea: addGm[gm_j].ea
                                });
                            }
                        }


                        /*
                            OPTION
                        */
                        for (var op_j in addOp) {  //  같은 상품에서 선택된 옵션의 루프를 돌려
                            let notInCart_op = true;
                            for (var op_k in context.state.cartList[gd_i].option_child) {  //  장바구니의 상품군에서도 옵션 서브값의 루프를 돌려
                                if (addOp[op_j].opc_id == context.state.cartList[gd_i].option_child[op_k].opc_id) { // 해달 옵션이 있으면 갯수 증가
                                    notInCart_op = false;
                                    context.state.cartList[gd_i].option_child[op_k].ea += addOp[op_j].ea;
                                    // context.dispatch('update', {
                                    //     ct_id: context.state.cartList[gd_i].ct_id,
                                    //     op_id: context.state.cartList[gd_i].option_child[op_k].opc_op_id,
                                    //     opc_id: context.state.cartList[gd_i].option_child[op_k].opc_id,
                                    //     ea: context.state.cartList[gd_i].option_child[op_k].ea
                                    // });
                                    //  v-model로 연결된 해당 옵션의 ea 변경시 Watch에서 감지하여 자동으로 디비 업데이트 호출
                                    //  아래 파일에 해당 메서드 기술
                                    //  C:\WorkSpace\atom-local\4sVue\resources\js\views\web\_module\CartOption.vue
                                    break;
                                }
                            }
                            if (notInCart_op) { //  해당 옵션이 없으면 옵션 추가
                                if (!context.state.cartList[gd_i].hasOwnProperty('option_child'))
                                    context.state.cartList[gd_i].option_child = [];
                                context.state.cartList[gd_i].option_child.splice(0, 0, addOp[op_j]);
                                context.dispatch('store', {
                                    ct_id: context.state.cartList[gd_i].ct_id,
                                    op_id: addOp[op_j].opc_op_id,
                                    opc_id: addOp[op_j].opc_id,
                                    ea: addOp[op_j].ea
                                });
                            }
                        }

                        break;  //  해당 상품의 찾아서 작업이 이루어 졌다면 그만 반복해라
                    }
                }
                if (notInCart_gd) {  //  해당 상품이 없으면 상품 추가
                    let tmp = copy(payload.goods);
                    // tmp.goods_model = tmp.goods_model.filter(x => { return x.ea>0; }); //  선택된 모델면 추린다
                    tmp.goods_model = addGm;

                    delete tmp.option;
                    tmp.option_child = addOp;
                    context.state.cartList.splice(0, 0, tmp);
                    context.dispatch('store', payload.params);
                }
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
        async destroy({commit, state}, payload){
            try {
                if (Auth.check()) {
                    let params = {_method : 'DELETE'};
                    switch (payload.type) {
                        case "model":
                            let gmCnt = state.cartList[payload.p_idx].goods_model.length;
                            if (gmCnt === 1) {
                                params.mode = 'cart';
                                params.id = state.cartList[payload.p_idx].ct_id;
                            } else {
                                params.mode = 'cart_model';
                                params.id = state.cartList[payload.p_idx].goods_model[payload.c_idx].cm_id;
                            }
                        break;
                        case "option":
                            params.mode = 'cart_option';
                            params.id = state.cartList[payload.p_idx].option_child[payload.c_idx].co_id;
                        break;
                    }
                    const res = await http.post(`/api/shop/cart/${params.id}`, params);
                    if (res.status === 200) {
                        Notify.toast('success', res.data);
                        commit('destroyItem', payload);
                    }
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
}
