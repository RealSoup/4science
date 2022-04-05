export default {
    namespaced: true,
    state: {
        scroll: {
            x: 0,
            y: 0,
        }
    },
    mutations: {
        setScrollY (state, param) {
            state.scroll.y = param;
        },
    },
    actions: {
   
    },
}