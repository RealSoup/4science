<template>
<b-container class="p_wrap">
    <b-row>
        <b-col>제조사명</b-col>
        <b-col>
            <b-form-input v-model="mk.mk_name"></b-form-input>
        </b-col>
    </b-row>
    <b-row>
        <b-col>제조사 소개</b-col>
        <b-col>
            <b-form-textarea v-model="mk.mk_desc" rows="6"></b-form-textarea>
        </b-col>
    </b-row>

    <b-row>
        <b-col>제조사 로고</b-col>
        <b-col>
            <file-upload ref="fileupload" v-model="mk.file_info" :fi_group="'maker'" :fi_kind="'logo'" :is_thumb="true"></file-upload>
        </b-col>
    </b-row>
    <b-row>
        <b-col></b-col>
        <b-col class="text-right">
            <b-button variant="info" size="sm" @click="update">적용</b-button>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import ax from '@/api/http';
import FileUpload from '@/views/_common/FileUpload.vue'
export default {
    name: 'admShopMakerEdit',
    props:['value'],
    components: {
        'loading-modal': () => import('@/views/_common/LoadingModal.vue'),
        'file-upload': FileUpload,
    },
    data() {
        return {
            mk:{},
            isLoadingModalViewed: false,
        };
    },
    methods: {
        async update(){

            this.mk = Object.assign(
                {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                this.mk, // 수정하려는 객체
                {_method : 'PATCH'} // 삽입하려는 내용
            );
            this.isLoadingModalViewed=true;
            const res = await ax.post(`/api/admin/shop/maker/${this.$route.params.mk_id}`, this.mk);
            if (res && res.status === 200) {                        
                await this.$refs.fileupload.fileProcessor(this.$route.params.mk_id);
                this.isLoadingModalViewed=false;
                this.$router.push({ name: 'adm_maker' })
            }
        },
    },
    async mounted() { 
        try {
            const res = await ax.get(`/api/admin/shop/maker/${this.$route.params.mk_id}/edit`);
            if (res && res.status === 200) {
                this.mk = res.data;
            }
        } catch (e) {
            Notify.consolePrint(e);
            Notify.toast('warning', e.response.data.message);
        }
    },
}
</script>
<style lang="css" scoped>
.container { max-width:900px; }
.container .row { margin:10px 0; }
.container .row .col:first-child { flex:0 0 13%; max-width:13%; display:flex; align-items:center;}
.container .row .col textarea { width:100%; }
</style>
