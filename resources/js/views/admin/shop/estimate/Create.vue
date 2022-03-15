<template lang="html">
    <b-container id="adm_estimate_create" class="p_warp">

        <h1>견적서 작성</h1>

        <FormCtrl v-model="frm" @save="store" @all_dc_update="all_dc_apply" @calculator="calculator" />

        <FormUser v-model="frm" />

        <FormGoods ref="form_goods" v-model="frm.estimate_model" v-if="frm.estimate_model.length" :frm="frm" @hook:mounted="" />

        <FormExtra ref="form_extra" v-model="frm" :isLoadingModalViewed="isLoadingModalViewed" />

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
        'FormUser': () =>      import('./FormUser.vue'),
        FormGoods,
        'FormExtra': () =>      import('./FormExtra.vue'),
        // 'Form': () => import('./Form.vue'),
        //  자식 컴포넌트의 Method를 호출하려면 위와같이 하면 안됨
        //  import 명령어 써서 컴포넌트 삽입해야 함
    },
    data() {
        return {
            isLoadingModalViewed:false,
            frm:{
                estimate_model: {},
                file_info:[],
            },
        }
    },
    methods: {
        async create() {
            try {
                const res = await ax.get(`/api/admin/shop/estimate/create`, {params:{eq_id:this.$route.query.eq_id}});
                if (res && res.status === 200) {
                    this.frm = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },

        async store(type){
            if (!validationCheckerUser(this.frm))                   return false;
            if (!validationCheckerGoods(this.frm.estimate_model))   return false;
            if (!validationCheckerExtra(this.frm))                  return false;
            try {
                switch (type) {
                    case 'store': this.frm.er_step = 0; break;
                    case 'send': this.frm.er_step = 1; break;
                }
                this.isLoadingModalViewed=true;
                const res = await ax.post(`/api/admin/shop/estimate/`, this.frm);
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
        calculator() {
            this.$refs.form_goods.calculator();
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
