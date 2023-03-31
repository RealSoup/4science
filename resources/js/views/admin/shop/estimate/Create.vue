<template lang="html">
    <b-container id="adm_estimate_create" class="p_wrap">
        <h3>견적서 작성</h3>
        <FormCtrl @save="store" />
        <FormSetting v-model="frm.estimate_reply" @all_dc_update="all_dc_apply" />
        <FormUser v-model="frm.estimate_req" />
        <FormGoods ref="form_goods" v-model="frm.estimate_model" :frm="frm" @hook:mounted="" />
        <FormExtra ref="form_extra" v-model="frm.estimate_reply" :isLoadingModalViewed="isLoadingModalViewed" />
    </b-container>
</template>

<script>
import ax from '@/api/http';
import FormGoods from './FormGoods.vue';
import { validationCheckerUser, validationCheckerGoods, validationCheckerExtra } from './FormValidation.js'
export default {
    name: 'Create',
    components: {
        'FormCtrl': () =>      import('./FormCtrl.vue'),
        'FormSetting': () =>   import('./FormSetting.vue'),
        'FormUser': () =>      import('./FormUser.vue'),
        FormGoods,
        'FormExtra': () =>      import('./FormExtra.vue'),
        // 'Form': () => import('./Form.vue'),
        //  자식 컴포넌트의 Method를 호출하려면 위와같이 하면 안됨
        //  import 명령어 써서 컴포넌트 삽입해야 함
    },
    data() {
        return {
            isLoadingModalViewed: false,
            frm: {
                estimate_reply:{},
            },
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
                this.$refs.form_goods.calculator();
                switch (type) {
                    case 'store': this.frm.estimate_reply.er_step = 0; break;
                    case 'send': this.frm.estimate_reply.er_step = 1; break;
                }
                this.isLoadingModalViewed=true;
                const res = await ax.post(`/api/admin/shop/estimate`, this.frm);
                if (res && res.status === 200) {
                    await this.$refs.form_extra.$refs.fileupload.fileProcessor(res.data);
                    this.isLoadingModalViewed=false;
                    this.$router.push({ name: 'adm_estimate_show_reply', params: { er_id:res.data } })
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        all_dc_apply() {
            this.$refs.form_goods.setDcLate();
        },
        
    },
    mounted() {
        this.create();
    },
}
</script>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity .001s; }
.fade-enter,
.fade-leave-to { opacity: 0; }
</style>
