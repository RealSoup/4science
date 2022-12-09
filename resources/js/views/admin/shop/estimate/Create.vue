<template lang="html">
    <b-container id="adm_estimate_create" class="p_wrap">

        <h3>견적서 작성</h3>

        <FormCtrl @save="store" />

        <FormSetting v-model="frm" @all_dc_update="all_dc_apply" />

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
            isLoadingModalViewed:false,
            frm:{
                estimate_model: [],
                file_info: [],
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
                this.calculator();
                switch (type) {
                    case 'store': this.frm.er_step = 0; break;
                    case 'send': this.frm.er_step = 1; break;
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
        calculator() {
            let collect = {};
            let pa_id = 0;
            let dlvy = 0;
            let air = 0;
            for (var em of this.frm.estimate_model) {
                if (em.goods&&em.goods.purchase_at)
                    pa_id = em.goods.gd_pa_id;
                if (!collect.hasOwnProperty(pa_id)) {
                    if (pa_id>0 && em.goods.purchase_at.pa_type == "AIR")
                        collect[pa_id] = { 'goods':0, 'dlvy':0, 'air':Number(em.goods.purchase_at.pa_price_add_vat)};
                    else
                        collect[pa_id] = { 'goods':0, 'dlvy':Number(em.goods.dlvy_fee_add_vat), 'free_dlvy_max':Number(em.goods.free_dlvy_max), 'air':0};
                }
                collect[pa_id].goods += Number(em.em_price) * Number(em.em_ea);
                for (var eo of em.estimate_option)
                    collect[pa_id].goods += Number(eo.eo_price) * Number(eo.eo_ea);
            }
        
            this.frm.er_gd_price = Object.values(collect).reduce((acc, el) => acc + el.goods, 0);
            this.frm.er_air_price = Object.values(collect).reduce((acc, el) => acc + el.air, 0);
            this.frm.er_surtax = this.frm.er_gd_price*0.1;
            for (var key in collect) {
                if (collect[key].dlvy && collect[key].goods < collect[key].free_dlvy_max) {
                    dlvy += Number(collect[key].dlvy);
                }
            }
            this.frm.er_dlvy_price = dlvy;
            if (this.frm.er_no_dlvy_fee == 'Y') {
                this.frm.er_dlvy_price  = 0;
                this.frm.er_air_price   = 0;
            }
            this.frm.er_all_price = this.frm.er_gd_price+this.frm.er_surtax+this.frm.er_dlvy_price+this.frm.er_air_price;
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
