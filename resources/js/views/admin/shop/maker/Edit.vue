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
        <b-col>통화단위</b-col>
        <b-col>
            <b-form-select v-model="mk.mk_currency" :options="currencyOptions"></b-form-select>
        </b-col>
    </b-row>
    <b-row>
        <b-col>관세율(%)</b-col>
        <b-col>
            <b-form-input type="number" step="0.01" v-model="mk.mk_customs_rate"></b-form-input>
        </b-col>
    </b-row>
    <b-row>
        <b-col>마진율(%)</b-col>
        <b-col>
            <b-form-input type="number" step="0.01" v-model="mk.mk_margin_rate"></b-form-input>
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
            currencyOptions: [
                { value: 'KRW',      text: 'KRW (한국 원화)' },
                { value: 'USD',      text: 'USD (미국 달러)' },
                { value: 'JPY(100)', text: 'JPY(100) (일본 엔화, 100엔 단위)' },
                { value: 'EUR',      text: 'EUR (유럽 유로)' },
                { value: 'CNH',      text: 'CNH (중국 위안화)' },
                { value: 'AUD',      text: 'AUD (호주 달러)' },
                { value: 'GBP',      text: 'GBP (영국 파운드)' },
                { value: 'CAD',      text: 'CAD (캐나다 달러)' },
                { value: 'HKD',      text: 'HKD (홍콩 달러)' },
                { value: 'SGD',      text: 'SGD (싱가포르 달러)' },
            ],
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
