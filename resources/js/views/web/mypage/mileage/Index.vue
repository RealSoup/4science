<template>
    <div>
        <div class="pTitle">
            <span><i>마</i></span>
            <span><i>일</i></span>
            <div class="break d-md-block d-none"></div>
            <span><i>리</i></span>
            <span><i>지</i></span>
            <div class="break"></div>
            <span><i></i></span>
        </div>
        <b-container class="list">
            <b-row class="header">
                <b-col>적립일</b-col>
                <b-col>내역</b-col>
                <b-col>마일리지</b-col>
                <b-col>*</b-col>
            </b-row>
            <b-row v-for="ml in mileage.data" :key="ml.ml_id" class="data">
                <b-col>{{ml.created_at | formatDate_YYYY_MM_DD}}</b-col>
                <b-col>{{ml.ml_content}}</b-col>
                <b-col>{{ml.ml_mileage | comma}} <b>P</b></b-col>
                <b-col>
                    <template v-if="ml.ml_mileage < 0">
                        <b-badge v-if="ml.ml_enable_m == 0" variant="secondary">요청</b-badge>
                        <b-badge v-else-if="ml.ml_enable_m == 1" variant="success">승인</b-badge>
                        <b-badge v-else-if="ml.ml_enable_m == 2" variant="warning">반려</b-badge>
                    </template>
                </b-col>
            </b-row>
            <pagination :data="mileage" align="center" @pagination-change-page="index"></pagination>
        </b-container>

        <b-container class="request">
            <b-row>
                <b-col>
                    <b-form-radio v-model="frm.type" value="5">
                        <img src="/img/mypage/mileage/gift50000.png" />
                        <p>신세계백화점 상품권 (5만원)</p>
                    </b-form-radio>
                </b-col>
                <b-col>
                    <b-form-radio v-model="frm.type" value="10">
                        <img src="/img/mypage/mileage/gift100000.png" />
                        <p>신세계백화점 상품권 (10만원)</p>
                    </b-form-radio>
                </b-col>
                <Validation :error="this.$store.state.error.validations.type" />
            </b-row>
            <b-row>
                <b-col class="awesome_p">
                    <b-form-input v-model="frm.ea" id="ea" required />
                    <label for="oex_num_in"><span>신청 수량</span></label>
                    <Validation :error="this.$store.state.error.validations.ea" />
                </b-col>
                <b-col class="awesome_p">
                    <b-form-input v-model="frm.name" id="name" required />
                    <label for="oex_num_in"><span>수령인</span></label> 
                    <Validation :error="this.$store.state.error.validations.name" />                   
                </b-col>
                <b-col class="awesome_p">
                    <b-form-input v-model="frm.hp" id="hp" required />
                    <label for="oex_num_in"><span>휴대폰 번호</span></label>  
                    <Validation :error="this.$store.state.error.validations.hp" />                  
                </b-col>
                <b-col>
                    <b-button @click="store" variant="info" block>신청하기</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'MyMileageIndex',
    components: {
        'Validation': () =>     import('@/views/_common/Validation.vue'),
    },
    data() {
        return {
            frm:{},
            mileage:{},
        };
    },

    mounted() {
        this.index();
    },

    methods: {
        async index(page=1){
            try {
                const res = await ax.get(`/api/mileage`, { params: {page:page}});
                if (res && res.status === 200) {
                    this.mileage = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async store(){
            try {
                const res = await ax.post(`/api/mileage`, this.frm);
                if (res && res.status === 200) {
                    Notify.modal("신청 되었습니다.");
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.list .header { background-color:#DDD; }
.list .header .col { font-weight:bold; }
.list .data { border-top:1px solid #ddd; }
.list .row .col { padding:.6rem 0; }
.list .row .col:nth-child(1) { flex:0 0 15%; max-width:15%; text-align:center; }
.list .row .col:nth-child(3) { flex:0 0 15%; max-width:15%; text-align:center; }
.list .row .col:nth-child(4) { flex:0 0 15%; max-width:15%; text-align:center; }
@media (max-width: 768px) {
    .list .header { display:none; }
    .list .row .col { max-width:none !important; width:auto !important; }
    .list .row .col:nth-child(1) { flex-basis:30%; flex-grow:0;  }
    .list .row .col:nth-child(2) { flex-basis:70%; flex-grow:1; }
    .list .row .col:nth-child(3) { flex-basis:50%; flex-grow:0; }
    .list .row .col:nth-child(4) { flex-basis:50%; flex-grow:0; }
}

.request { margin-top:2rem; }
.request .row .col { text-align:center; }
</style>