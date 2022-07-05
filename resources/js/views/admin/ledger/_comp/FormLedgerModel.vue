<template>
    <b-container>
        <b-row class="tit">
            <b-col>
                제품
                <span v-if="value.lm_id > 0">수정</span>
                <span v-else>추가</span>
            </b-col>
        </b-row>
        <b-row class="create">
            <b-col class="awesome_p">
                <b-form-input v-model="value.lm_gm_name" id="lm_gm_name" required />
                <label for="lm_gm_name">품목명</label>
            </b-col>
            <b-col class="awesome_p">
                <b-form-input v-model="value.lm_gm_spec" id="lm_gm_spec" required />
                <label for="lm_gm_spec">사양</label>
            </b-col>            
            <b-col class="awesome_p">
                <b-form-input v-model="value.lm_catno" id="lm_catno" required />
                <label for="lm_catno">CAT.No</label>
            </b-col>            
            <b-col class="awesome_p">
                <b-form-input v-model="value.lm_gm_code" id="lm_gm_code" required />
                <label for="lm_gm_code">모델명</label>
            </b-col>            
            <b-col class="awesome_p">
                <b-form-input v-model="value.lm_gm_price" id="lm_gm_price" required :formatter="priceComma" />
                <label for="lm_gm_price">단가</label>
            </b-col>
            <b-col class="awesome_p">
                <b-form-input v-model="value.lm_ea" id="lm_ea" required :formatter="priceComma" />
                <label for="lm_ea">수량</label>
            </b-col>            
            <b-col class="awesome_p">
                <b-form-input v-model="value.lm_ea_price" id="lm_ea_price" required :formatter="priceComma" />
                <label for="lm_ea_price">공급가액</label>
            </b-col>            
            <b-col class="awesome_p">
                <b-form-input v-model="value.lm_surtax" id="lm_surtax" required :formatter="priceComma" />
                <label for="lm_surtax">세액</label>
            </b-col>            
            <b-col class="awesome_p">
                <b-form-input v-model="value.lm_sum_price" id="lm_sum_price" required :formatter="priceComma" />
                <label for="lm_sum_price">합계</label>
            </b-col>            
            <b-col class="awesome_p force">
                <b-input-group size="sm">
                    <b-form-input v-model="value.lm_com_order_dt" id="lm_com_order_dt" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate" required></b-form-input>
                    <b-input-group-append>
                        <b-form-datepicker v-model="value.lm_com_order_dt" size="sm" button-only right></b-form-datepicker>
                    </b-input-group-append>
                </b-input-group>
                <label for="lm_com_order_dt">업체발주일</label>
            </b-col>          
            <b-col class="awesome_p">
                <b-form-input v-model="value.lm_buyer" id="lm_buyer" required/>
                <label for="lm_buyer">매입처</label>
            </b-col>          
            <b-col class="awesome_p">
                <b-form-input v-model="value.lm_order_mng" id="lm_order_mng" required />
                <label for="lm_order_mng">발주담당</label>
            </b-col>          
            <b-col class="awesome_p">
                <b-form-input v-model="value.lm_purchase_price" id="lm_purchase_price" required :formatter="priceComma" />
                <label for="lm_purchase_price">매입금액</label>
            </b-col>         
            <b-col class="awesome_p force">
                <b-input-group size="sm">
                    <b-form-input v-model="value.lm_shipping_dt" id="lm_shipping_dt" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate" required></b-form-input>
                    <b-input-group-append>
                        <b-form-datepicker v-model="value.lm_shipping_dt" size="sm" button-only right></b-form-datepicker>
                    </b-input-group-append>
                </b-input-group>
                <label for="lm_shipping_dt">제품발송일</label>
            </b-col>
            <b-col class="awesome_p force">
                <b-form-select v-model="value.lm_cxl" id="lm_cxl">
                    <b-form-select-option value="N">거래</b-form-select-option>
                    <b-form-select-option value="Y">취소</b-form-select-option>
                </b-form-select>
                <label for="lm_cxl">거래취소</label>
            </b-col>
            <b-col class="ctrl">
                <b-button variant="primary" size="lg" block @click="register">등록</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'AdmLedgerCellModel',
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