<template>
    <b-container id="adm_estimate_create" class="p_wrap">
        <h3>견적서 작성</h3>
        <form-ctrl v-model="frm.estimate_reply" @all_dc_update="all_dc_apply" @save="store" :clickable="clickable"></form-ctrl>
        <form-user v-model="frm.estimate_req"></form-user>
        <form-goods ref="form_goods" v-model="frm.estimate_model" :frm="frm"></form-goods>
        <form-extra ref="form_extra" v-model="frm.estimate_reply" :isLoadingModalViewed="isLoadingModalViewed"></form-extra>
    </b-container>
</template>

<script>
import ax from '@/api/http';
import FormGoods from '@/views/admin/shop/estimate/FormGoods.vue';
import { validationCheckerUser, validationCheckerGoods, validationCheckerExtra } from '@/views/admin/shop/estimate/FormValidation.js'

export default {
    name: 'Create',
    components: {
        'form-ctrl': () =>  import('@/views/admin/shop/estimate/FormCtrl.vue'),
        'form-user': () =>  import('@/views/admin/shop/estimate/FormUser.vue'),
        'form-goods': FormGoods,
        'form-extra': () => import('@/views/admin/shop/estimate/FormExtra.vue'),
        // 'Form': () => import('./Form.vue'),
        //  자식 컴포넌트의 Method를 호출하려면 위와같이 하면 안됨
        //  import 명령어 써서 컴포넌트 삽입해야 함
    },
    data() {
        return {
            isLoadingModalViewed: false,
            clickable : true,
            frm: {
                estimate_req:{},
                estimate_reply:{ file_info:[], },
            },
            param1 : null,
            param2 : null

        }
    },
    methods: {
        async create() {
            try {
                const res = await ax.get(`/api/admin/shop/estimate/create`, {params:{
                        eq_id:this.$route.query.eq_id,
                        er_id:this.$route.query.er_id
                    }});
                if (res && res.status === 200) {
                    this.frm = res.data;
                    this.frm.isRewrite = (this.$route.query.eq_id && this.$route.query.er_id) ? true : false;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },

        async store(type){
            if (!validationCheckerUser(this.frm.estimate_req))      return false;
            if (!validationCheckerGoods(this.frm.estimate_model))   return false;
            if (!validationCheckerExtra(this.frm.estimate_reply))   return false;
            try {
                this.clickable = false;
                this.$refs.form_goods.calculator();
                switch (type) {
                    case 'preview': 
                    case 'store': this.frm.estimate_reply.er_step = 0; break;
                    case 'send': this.frm.estimate_reply.er_step = 1; break;
                }
                const res = await ax.post(`/api/admin/shop/estimate`, this.frm);
                if (res && res.status === 200) {
                    this.isLoadingModalViewed=true;
                    await this.$refs.form_extra.$refs.fileupload.fileProcessor(res.data);
                    this.isLoadingModalViewed=false;
                    this.clickable = true;
                    if(!isEmpty(window.opener))
                        window.opener.postMessage( 'reread' );
                    if(type == 'preview') {
                        Notify.toast('success', '임시저장 완료');
                        var url = `/api/admin/shop/estimate/showEstimate/${res.data}`;
                        var name = "견적서 미리보기";
                        var option = "width = 900, height = 900, top = 10, left = 10, location = no"
                        this.$router.push({ name: 'adm_estimate_edit', params: { er_id:res.data } });
                        window.open(url, name, option);
                        // self.close();
                    } else if ( type == 'store' ) {
                        Notify.toast('success', '임시저장 완료');
                        this.$router.push({ name: 'adm_estimate_edit', params: { er_id:res.data } });
                    } else
                        this.$router.push({ name: 'adm_estimate_show_reply', params: { er_id:res.data } });                    
                } else {
                    Notify.toast('danger', '견적 실패');
                    this.clickable = true;
                }

            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        all_dc_apply() {
            this.$refs.form_goods.setDcLate();
        },

        ////////////////////////////////////////////
        sendMsgToParent(){
            this.sendToOpener( { 
                evt: 'message' , 
                message : 'hello' 
            });
        },

            // 부모로 이벤트 보내기
        sendToOpener( sendObj ){
            if( opener == null ) return;

            let sendStr = JSON.stringify( sendObj );

            // 부모 창에 Message를 보냄
            window.opener.postMessage( sendStr, '*' );
        },

            // 부모로 부터 이벤트 받기 
            // 이 함수는 WinPop.vue 의 calledFromOpener를 통해서 받게 된다  
        calledFromOpener( evt ){
            console.log( "receiveFromOpener  ------" );
            this.message = evt.msg;
        },

        
    },
    mounted() {
        this.create();

        const self = this;

        if ( opener ) {
            // opener에 g_winPopup 변수로 this를 넣어줌에 따라 WinPop.vue에서 이 소스의 객체를 직접 접근할 수 있게 된다 
            // WinPop.vue에서 g_winPopup 변수 활용을 확인할것 
            opener.g_winPopup = this;
        }

        let query = window.location.search;
        if ( query == null || query == "" ) {

            let nativeUrl = window.location.href;
            nativeUrl = nativeUrl.replace('/#', '');

            let url = new URL(nativeUrl);
            const urlParams = url.searchParams;

            this.param1 = urlParams.get('param1');
            this.param2 = urlParams.get('param2');

        }else {
            let param = new URLSearchParams(query);
            if ( param != null ) {
                this.param1 = param.get('param1');
                this.param2 = param.get('param2');
            } else {
                alert("cannot get query!!");
            }
        }


    },
}
</script>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity .001s; }
.fade-enter,
.fade-leave-to { opacity: 0; }
</style>
