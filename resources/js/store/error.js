import router from '@/router';
export default {
    namespaced: true,
    state: {
        // identify: {},
        validations: {},
        // authorization: {},
    },
    mutations: {
        // setIdentifyError(state, error) { state.identify = error; },
        setValidationError(state, error) { state.validations = error; },
        // setAuthorizationError(state, error) { state.authorization = error; }
    },
    actions: {
        // actionIdentifyError(context, data){
        //     context.commit('setIdentifyError', data);
        //     Notify.modal(data);
        //     // this.bvAlert(data);
        //     // router.go(-1);
        // },
    },
}
