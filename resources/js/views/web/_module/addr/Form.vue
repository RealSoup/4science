<template>
<b-container id="modal_address" class="adform">
    <b-row>
        <b-col class="label">배송지명</b-col>
        <b-col>
            <b-form-input v-model="value.ua_title" id="ua_title" />
            <Validation :error="this.$store.state.error.validations.ua_title" />
        </b-col>
    </b-row>
    <b-row>
        <b-col class="label">수취인명</b-col>
        <b-col>
            <b-form-input v-model="value.ua_name" id="ua_name" />
            <Validation :error="this.$store.state.error.validations.ua_name" />
        </b-col>
    </b-row>
    <b-row class="addr_cell">
        <b-col class="label">주소</b-col>
        <b-col>
            <b-row>
                <b-col id="ua_zip">{{value.ua_zip}}</b-col>
                <b-col>
                    <template v-if="postcode_open">
                        <button @click="postcode_open=false" class="postcode_close"><b-icon-x-lg></b-icon-x-lg></button>
                        <VueDaumPostcode class="shadow" @complete="onPostcodeSlt" :animation="true" >
                            <template #loading>
                                <b-spinner variant="success" label="Spinning" />
                            </template>
                        </VueDaumPostcode>
                    </template>
                    <b-form-input v-model="value.ua_addr1" id="ua_addr1" placeholder="배송지 검색" readonly />
                    <b-icon-search />
                    <button @click="postcode_open=true" class="postcode_open"></button>
                    <Validation :error="this.$store.state.error.validations.ua_zip" />
                    <Validation :error="this.$store.state.error.validations.ua_addr1" />
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-input v-model="value.ua_addr2" ref="od_addr2" id="od_addr2" placeholder="상세 주소" />
                    <Validation :error="this.$store.state.error.validations.od_addr2" />
                </b-col>
            </b-row>
        </b-col>
    </b-row>
    <b-row>
        <b-col class="label">휴대폰</b-col>
        <b-col class="hp">
            <b-form-input v-model="value.ua_hp" placeholder="휴대폰" :formatter="frm_formatHp"  />
            <Validation :error="this.$store.state.error.validations.ua_hp" />
        </b-col>
    </b-row>
    <b-row>
        <b-col class="label">배송요청사항</b-col>
        <b-col>
            <b-form-input v-model="value.ua_memo" ref="ua_memo" placeholder="배송시 요청사항"  />
        </b-col>
    </b-row>
    <b-row>
        <b-col><b-form-checkbox v-model="value.ua_def" value="Y" unchecked-value="N" >기본 배송지로 선택</b-form-checkbox></b-col>
    </b-row>
</b-container>
</template>

<script>
import ax from '@/api/http';
import { VueDaumPostcode } from "vue-daum-postcode";
export default {
    name:"ModuleAddrForm",
    components: {
        VueDaumPostcode,
        'Validation': () =>     import('@/views/_common/Validation.vue'),
    },
    props: ['value'],
    data() {
        return {
            postcode_open: false,
        }
    },    
    methods: {
        onPostcodeSlt(result) {
            this.$set(this.value, 'ua_zip', result.zonecode);
            let addr = result.roadAddress;
            addr += result.buildingName ? "("+ result.buildingName +")" : '';
            this.$set(this.value, 'ua_addr1', addr);
            this.$refs.od_addr2.focus();
            document.getElementById('modal_address').scrollIntoView();
            this.postcode_open = false;
        },
        frm_formatHp(v)   { return this.formatHp(v); },
    },
}
</script>

<style scoped>
.container { padding: 15px; }
.container>.row { justify-content:flex-end; }
.container>.row .col { position:relative; padding:2px 5px; }
.container>.row .label { min-width:70px; padding-right:5px !important; }
.container .addr_cell>.col { padding:8px 0; }
.container .addr_cell .col .postcode_close{ z-index: 2; position:absolute; top:-28px; right:50%; transform:translateX(180px); cursor:pointer; background:#FFF; border:2px solid #999; border-radius:5px; color:#999; padding:3px; line-height:.9em; }
.container .addr_cell .col input + svg { position:absolute; top:7px; right:9px; font-size:1.5rem; font-weight:bold; color: #CCC; }
.container .addr_cell .col .postcode_open { width:100%; height:100%; position:absolute; top:0; left:0; opacity:.1; border-width:0; background: inherit; }
.container .addr_cell .col .vue-daum-postcode { position:absolute; z-index:2; width:100%; max-width:360px; min-width:300px; right:50%; transform:translateX(50%); }
.container .addr_cell .col .row .col { padding:0px 5px; }
.container .addr_cell .label { display:flex; align-items:flex-start; justify-content:flex-end; }
.container .addr_cell .col .row:first-of-type .col:first-of-type { flex-basis:80px; max-width:80px; position:absolute; top:13px; height:50%; z-index:2; font-weight:bold; color:#AAA; display: flex; justify-content: center;}
.container .addr_cell .col .row:first-of-type .col:first-of-type:before { content:'['; }
.container .addr_cell .col .row:first-of-type .col:first-of-type:after { content:']'; }
.container .addr_cell .col .row:first-of-type .col input { text-indent:66px; }

.container>.row .alert { flex: 0 0 100%; max-width: 100%; }

@media (max-width: 992px){
    .container { padding: 15px 0; }
}
@media (max-width: 450px){
    .container .addr_cell .col .postcode_close,
    .container .addr_cell .col .vue-daum-postcode { right:6PX; transform:none; }
}
</style>