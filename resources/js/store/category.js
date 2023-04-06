import ax from '@/api/http';
import copy from "fast-copy";

export default {
    namespaced: true,
    state: {
        category:[],
        category_all:[],
    },
    mutations: {
        init(state, data) {
            // for (let i in data) {
            //     data[i] = Object.assign( 
            //         {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의 
            //         data[i], // 수정하려는 객체 
            //         {
            //             hover : false,      //  메인 하단 카테고리별 mouse on
            //             showing : false,    //  메인 하단 카테고리별 on
            //         } // 삽입하려는 내용 
            //     )
            // }
            
            state.category = data;
            state.category_all = copy(data);
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
