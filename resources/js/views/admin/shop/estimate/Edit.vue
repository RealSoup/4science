<template>
    <b-container id="adm_estimate_edit" class="p_wrap">
        <h1>견적서 수정</h1>
        <form-ctrl v-model="frm.estimate_reply" @all_dc_update="all_dc_apply" @save="update" :clickable="clickable"></form-ctrl>
        <form-user v-model="frm.estimate_req"></form-user>
        <form-goods ref="form_goods" v-model="frm.estimate_model" :frm="frm"></form-goods>
        <form-extra ref="form_extra" v-model="frm.estimate_reply" :isLoadingModalViewed="isLoadingModalViewed"></form-extra>
    </b-container>
</template>

<script>
import ax from '@/api/http';
import FormCtrl from '@/views/admin/shop/estimate/FormCtrl';
import FormUser from '@/views/admin/shop/estimate/FormUser';
import FormGoods from '@/views/admin/shop/estimate/FormGoods';
import FormExtra from '@/views/admin/shop/estimate/FormExtra';
import { validationCheckerUser, validationCheckerGoods, validationCheckerExtra } from '@/views/admin/shop/estimate/FormValidation.js'

export default {
    name: 'Edit',
    components: {
        'form-ctrl':    FormCtrl,
        'form-user':    FormUser,
        'form-goods':   FormGoods,
        'form-extra':   FormExtra,
    },
    data() {
        return {
            isLoadingModalViewed:false,
            clickable : true,
            frm:{
                estimate_req: {},
                estimate_reply: { file_info:[], },
            },
        }
    },
    methods: {
        async edit(){
            try {
                const res = await ax.get(`/api/admin/shop/estimate/${this.$route.params.er_id}/edit`,);
                if (res && res.status === 200) {
                    this.frm = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },

        async update(type) {
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
                this.frm = Object.assign( {}, this.frm, {_method : 'PATCH'} );
                const res = await ax.post(`/api/admin/shop/estimate/${this.$route.params.er_id}`, this.frm);
                if (res && res.status === 200) {
                    this.isLoadingModalViewed=true;
                    await this.$refs.form_extra.$refs.fileupload.fileProcessor(res.data);                    
                    this.isLoadingModalViewed=false;
                    this.clickable = true;
                    if(!isEmpty(window.opener))
                        window.opener.postMessage( 'reread' );
                    if(type == 'preview') {
                        Notify.toast('success', '임시저장 완료');
                        var url = `/api/admin/shop/estimate/showEstimate/${this.$route.params.er_id}`;
                        var name = "견적서 미리보기";
                        var option = "width = 900, height = 900, top = 10, left = 10, location = no"
                        window.open(url, name, option);
                        // self.close();
                    } else if ( type == 'store' ) {
                        Notify.toast('success', '임시저장 완료');
                    } else 
                        this.$router.push({ name: 'adm_estimate_show_reply', params: { er_id:this.$route.params.er_id } })
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
    },
    created() {
        this.edit();
    },
}
</script>
