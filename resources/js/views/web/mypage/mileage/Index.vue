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
            <b-row v-for="ml in mileage.data" :key="ml.ml_id" class="data" :class="{'bg-danger':(ml.expiration || ml.ml_type=='SP')}">
                <b-col>{{ml.created_at | formatDate_YYYY_MM_DD}}</b-col>
                <b-col>
                    <div v-if="ml.ml_tbl == 'voucher'">
                        <b-icon-gift-fill /> {{config[ml.refine_content[0]].name}} : {{ml.refine_content[1]}} 장 <br />
                        <font-awesome-icon icon="user" /> {{ml.refine_content[2]}} <br />
                        <font-awesome-icon icon="mobile-alt" /> {{ml.refine_content[3]}}
                    </div>
                    <div v-else>
                        {{ml.ml_content}}
                        <b-badge v-if="ml.ml_type=='SP'" variant="warning" class="ml-3">상품권 구매</b-badge>
                        <b-badge v-if="ml.expiration" variant="warning" class="ml-3">만료</b-badge>
                    </div>
                </b-col>
                <b-col>
                    <template v-if="ml.ml_tbl == 'voucher'">상품권 신청</template>
                    <template v-else>{{ml.ml_enable_m | comma}} <b>P</b></template>
                </b-col>
                <b-col>
                    <template v-if="ml.ml_tbl == 'voucher'">
                        <b-badge v-if="ml.ml_type == 'REQ'" variant="secondary">요청</b-badge>
                        <b-badge v-else-if="ml.ml_type == 'OK'" variant="success">승인</b-badge>
                        <b-badge v-else-if="ml.ml_type == 'NO'" variant="warning">반려</b-badge>
                    </template>
                </b-col>
            </b-row>
            <pagination :data="mileage" align="center" @pagination-change-page="index"></pagination>
        </b-container>

        <b-container class="request">
            <b-row>
                <b-col v-for="(v, k) in config" :key="k">
                    <b-form-radio v-model="frm.type" :value="k">
                        <img :src="`${s3url}mypage/mileage/gift${v.point}.png`" />
                        <p>{{v.name}}</p>
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
import { mapGetters } from 'vuex'

export default {
    name: 'MyMileageIndex',
    components: {
        'Validation': () =>     import('@/views/_common/Validation.vue'),
    },
    computed: {
        ...mapGetters({
            enableMileage: 'auth/enableMileage',
        })
    },
    data() {
        return {
            frm:{},
            mileage:{},
            config:{},
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
                    this.mileage = res.data.list;
                    this.config = res.data.config;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async store(){
            if (this.frm.type && this.frm.ea) {
                console.log(this.enableMileage, this.config[this.frm.type].point*this.frm.ea);
                if (this.enableMileage < this.config[this.frm.type].point*this.frm.ea) {
                    Notify.modal('마일리지가 모자릅니다.', 'warning');
                    return false;
                }
                try {
                    const res = await ax.post(`/api/mileage`, this.frm);
                    if (res && res.status === 200) {
                        Notify.modal("신청 되었습니다.", 'info');
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.response.data.message);
                }
            } else {
                Notify.modal('신청 정보를 입력하세요.', 'warning');
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
.list .row .col:nth-child(3) { flex:0 0 15%; max-width:15%; text-align:right; }
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