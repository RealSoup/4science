import ax from '@/api/http';

export default {
    namespaced: true,
    state: {
        siteInfo: {
            site:{},
            bank:{},
            biz:{},
        },
        deviceType:"",
    },
    getters:{
        siteInfo (state) { return state.siteInfo; },
    },
    mutations: {
        setInfo(state, v) {
            state.siteInfo = v;
        },
        setDeviceType(state, v) {
            state.deviceType = v;
        },
    },
    actions: {
        async siteInfo(context){
            const res = await ax.get(`/api/siteInfo`);
            if (res && res.status === 200) {
                context.commit('setInfo', res.data);
            }
        },
        
        async deviceType(context){            
            if(    navigator.userAgent.indexOf("iPhone") > -1
                || navigator.userAgent.indexOf("Android") > -1
                || navigator.userAgent.indexOf("iPad") > -1
                || navigator.userAgent.indexOf("iPod") > -1
            )
                context.commit('setDeviceType', 'mobile');
            else
                context.commit('setDeviceType', 'pc');
        },
    },
}
