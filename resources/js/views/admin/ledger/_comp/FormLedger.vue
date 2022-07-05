<template>
    <b-container>
        <b-row class="tit">
            <b-col>
                주문
                <span v-if="value.lg_id > 0">수정</span>
                <span v-else>추가</span>
            </b-col>
        </b-row>
        <b-row class="create">
            <b-col class="awesome_p force">
                <b-input-group size="sm">
                    <b-form-input v-model="value.lg_order_dt" id="lg_order_dt" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate" required></b-form-input>
                    <b-input-group-append>
                        <b-form-datepicker v-model="value.lg_order_dt" size="sm" button-only right></b-form-datepicker>
                    </b-input-group-append>
                </b-input-group>
                <label for="lg_order_dt">주문일</label>
            </b-col>
            <b-col class="awesome_p force">
                <b-form-select v-model="value.lg_pay_type" id="lg_pay_type">
                    <b-form-select-option value="">◖결제방식◗</b-form-select-option>
                    <b-form-select-option value="CARD">온라인 카드</b-form-select-option>
                    <b-form-select-option value="PSYS">PSYS</b-form-select-option>
                    <b-form-select-option value="BILL">계산서</b-form-select-option>
                    <b-form-select-option value="STAT">전표</b-form-select-option>
                    <b-form-select-option value="CASH">현금영수증</b-form-select-option>
                    <b-form-select-option value="MEMB">회원</b-form-select-option>
                    <b-form-select-option value="REV">역발행</b-form-select-option>
                    <b-form-select-option value="NOT">미발급</b-form-select-option>
                    <b-form-select-option value="CXL">거래 취소</b-form-select-option>
                </b-form-select>
                <label for="lg_pay_type">결제방식</label>
            </b-col>
            <b-col class="awesome_p">
                <b-form-input v-model="value.lg_mng" id="lg_mng" required />
                <label for="lg_mng">담당자</label>
            </b-col>
            <!-- <b-col class="awesome_p">
                <b-form-input v-model="value.lg_source_no" id="lg_source_no" required />
                <label for="lg_source_no">번호</label>
            </b-col> -->
            <b-col class="awesome_p force">
                <b-input-group size="sm">
                    <b-form-input v-model="value.lg_sale_dt" id="lg_sale_dt" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate" required></b-form-input>
                    <b-input-group-append>
                        <b-form-datepicker v-model="value.lg_sale_dt" size="sm" button-only right></b-form-datepicker>
                    </b-input-group-append>
                </b-input-group>
                <label for="lg_sale_dt">매출일</label>
            </b-col>
            <b-col class="awesome_p">
                <b-form-input v-model="value.lg_distributor" id="lg_distributor" required />
                <label for="lg_distributor">매출처</label>
            </b-col>
            <b-col class="awesome_p">
                <b-form-input v-model="value.lg_depart" id="lg_depart" required />
                <label for="lg_depart">소속</label>
            </b-col>            
            <b-col class="awesome_p">
                <b-form-input v-model="value.lg_lab_prof" id="lg_lab_prof" required />
                <label for="lg_lab_prof">연구실/교수명</label>
            </b-col>            
            <b-col class="awesome_p">
                <b-form-input v-model="value.lg_orderer" id="lg_orderer" required />
                <label for="lg_orderer">고객명</label>
            </b-col>            
            <b-col class="awesome_p">
                <b-form-input v-model="value.lg_email" id="lg_email" required />
                <label for="lg_email">메일</label>
            </b-col>
            <b-col>
                <b-form-input type="text" v-model="value.lg_hp" id="lg_hp" :formatter="formatHp" />
                <label for="lg_hp">HP</label>
            </b-col>
            <b-col class="awesome_p">
                <b-form-input v-model="value.lg_note" id="lg_note" required />
                <label for="lg_note">비고</label>
            </b-col>
            <b-col class="ctrl">
                <b-button variant="primary" size="lg" block @click="register">등록</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'AdmLedgerCell',
    props: ['value'],
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        register() {
            this.$emit('register');
        },
    },
};
</script>

<style lang="css" scoped>
.tit .col { font-size:30px; margin-bottom:40px; font-weight:900; }
.col { flex: 0 0 25%; max-width:25%; margin-bottom:20px; }
.col.ctrl { flex: 0 0 100%; max-width:100%; }
</style>