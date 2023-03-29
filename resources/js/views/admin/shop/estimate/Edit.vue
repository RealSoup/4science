<template lang="html">
    <b-container id="adm_estimate_edit" class="p_wrap">
        <h1>견적서 수정</h1>
        <FormCtrl @save="update" />
        <FormSetting v-model="frm" @all_dc_update="all_dc_apply" />
        <FormUser v-if="frm.estimate_req" v-model="frm.estimate_req" />
        <FormGoods ref="form_goods" v-model="frm.estimate_model" :frm="frm" />
        <FormExtra ref="form_extra" v-model="frm" :isLoadingModalViewed="isLoadingModalViewed" />
    </b-container>
</template>

<script>
import ax from '@/api/http';
import router from '@/router';
import FormGoods from './FormGoods.vue';
import { validationCheckerUser, validationCheckerGoods, validationCheckerExtra } from './FormValidation.js'

export default {
    name: 'Edit',
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
            saveType:'',
            frm:{
                file_info: [],
            },
        }
    },
    methods: {
        async edit(){
            try {
                const res = await ax.get(`/api/admin/shop/estimate/${this.$route.params.er_id}/edit`,);
                if (res && res.status === 200) {
                    // this.frm = Object.assign(
                    //     {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    //     this.frm, // 수정하려는 객체
                    //     res.data.req,
                    // );
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
            if (!validationCheckerExtra(this.frm))                  return false;
            // let acceptedFilesCount = this.$refs.form_extra.$refs.add_file.$refs.myVueDropzone.dropzone.getAcceptedFiles();
            // console.log(this.$refs.form_extra.$refs.add_file.$refs.myVueDropzone);
            try {
                this.$refs.form_goods.calculator();
                switch (type) {
                    case 'store': this.frm.er_step = 0; break;
                    case 'send': this.frm.er_step = 1; break;
                }
                this.isLoadingModalViewed=true;
                this.frm = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    this.frm, // 수정하려는 객체
                    {_method : 'PATCH'} // 삽입하려는 내용
                );
                const res = await ax.post(`/api/admin/shop/estimate/${this.$route.params.er_id}`, this.frm);
                if (res && res.status === 200) {
                    await this.$refs.form_extra.$refs.fileupload.fileProcessor(res.data);
                    this.isLoadingModalViewed=false;
                    this.$router.push({ name: 'adm_estimate_show_reply', params: { er_id:this.$route.params.er_id } })
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
