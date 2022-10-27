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
                    <b-form-select-option v-for="(v, k) in pay_type_option" :key="k" :value="k">{{ v }}</b-form-select-option>
                </b-form-select>
                <label for="lg_pay_type">결제방식</label>
            </b-col>
            <b-col class="awesome_p">
                <b-form-input v-model="value.lg_mng" id="lg_mng" required />
                <label for="lg_mng">담당자</label>
            </b-col>
            <!-- <b-col class="awesome_p">
                <b-form-input v-model="value.lg_od_id" id="lg_od_id" required />
                <label for="lg_od_id">번호</label>
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
                <b-form-input v-model="value.lg_od_name" id="lg_od_name" required />
                <label for="lg_od_name">주문명</label>
            </b-col>            
            <!-- <b-col class="awesome_p">
                <b-form-input v-model="value.lg_sum_ea_p" id="lg_sum_ea_p" required />
                <label for="lg_sum_ea_p">총 공급가액</label>
            </b-col>            
            <b-col class="awesome_p">
                <b-form-input v-model="value.lg_sum_surtax" id="lg_sum_surtax" required />
                <label for="lg_sum_surtax">총 세액</label>
            </b-col>
            <b-col class="awesome_p">
                <b-form-input v-model="value.lg_sum_sum_p" id="lg_sum_sum_p" required />
                <label for="lg_sum_sum_p">총 합계</label>
            </b-col> -->
            <b-col class="awesome_p">
                <b-form-input v-model="value.lg_tax_email" id="lg_tax_email" required />
                <label for="lg_tax_email">메일</label>
            </b-col>
            <b-col class="awesome_p">
                <b-form-input v-model="value.lg_tax_email" id="lg_tax_email" required />
                <label for="lg_tax_email">메일</label>
            </b-col>
            <b-col class="awesome_p">
                <b-form-input v-model="value.lg_tax_hp" id="lg_tax_hp" required />
                <label for="lg_tax_hp">HP</label>
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
    props: ['value', 'pay_type_option'],
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