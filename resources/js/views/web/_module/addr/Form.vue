<template>
<b-container id="modal_address">
    <b-row>
        <b-col><b-icon-signpost /></b-col>
        <b-col>
            <b-form-input v-model="value.ua_title" placeholder="배송지명" id="ua_title" />
            <Validation :error="this.$store.state.error.validations.ua_title" />
        </b-col>
    </b-row>
    <b-row>
        <b-col><b-icon-person /></b-col>
        <b-col>
            <b-form-input v-model="value.ua_name" id="ua_name" placeholder="수취인명" />
            <Validation :error="this.$store.state.error.validations.ua_name" />
        </b-col>
    </b-row>
    <b-row class="addr_cell">
        <b-col class="d-flex align-items-center justify-content-center"><b-icon-pin-map /></b-col>
        <b-col>
            <b-row>
                <b-col id="ua_zip">{{value.ua_zip}}</b-col>
                <b-col>
                    <template v-if="postcode_open">
                        <VueDaumPostcode class="shadow" @complete="onPostcodeSlt" :animation="true" >
                            <template #loading>
                                <b-spinner variant="success" label="Spinning" />
                            </template>
                        </VueDaumPostcode>
                    </template>
                    <b-form-input v-model="value.ua_addr1" id="ua_addr1" placeholder="배송지 검색" readonly />
                    <b-icon-search />
                    <button @click="postcode_open=true"></button>
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
        <b-col><b-icon-phone /></b-col>
        <b-col>
            <b-form-input v-model="value.ua_hp1" placeholder="연락처 1" id="ua_hp1" ref="ua_hp1" @input.native="focusNext($event, 3, 'ua_hp2')" :formatter="maxlength_3"  /><b-icon-dash />
            <b-form-input v-model="value.ua_hp2" placeholder="연락처 2" id="ua_hp2" ref="ua_hp2" @input.native="focusNext($event, 4, 'ua_hp3')" :formatter="maxlength_4"  /><b-icon-dash />
            <b-form-input v-model="value.ua_hp3" placeholder="연락처 3" id="ua_hp3" ref="ua_hp3" @input.native="focusNext($event, 4, 'ua_memo')" :formatter="maxlength_4"  />
        </b-col>
        <Validation :error="this.$store.state.error.validations.ua_hp1" />
        <Validation :error="this.$store.state.error.validations.ua_hp2" />
        <Validation :error="this.$store.state.error.validations.ua_hp3" />
    </b-row>
    <b-row>
        <b-col><b-icon-chat-left-dots /></b-col>
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
        focusNext(e, max, next) { this.$focusNext(e, max, next); },
        maxlength_3(e){ return String(e).substring(0, 3); },
        maxlength_4(e){ return String(e).substring(0, 4); },
    },
}
</script>

<style scoped>
.container { margin:0; }
.container>.row { margin:0 0 .3rem 0; }
.container>.row .col { padding:0; position:relative;}
.container>.row:not(:last-of-type)>.col:first-of-type { border-radius:.25rem; border:1px solid #CCC; background:#20613722; font-size:1.5rem; font-weight:bold; color:#CCC; text-align:center; flex-basis:10%; max-width:10%; }
.container>.row:nth-of-type(3) .col input + svg { position:absolute; top:7px; right:9px; font-size:1.5rem; font-weight:bold; color: #CCC; }
.container>.row:nth-of-type(3) .col svg + button { width:100%; height:100%; position:absolute; top:0; left:0; opacity:.1; }
.container>.row .col .vue-daum-postcode { position:absolute; z-index:2; width:100%; }
.container>.row .col .row { margin:0; }
.container>.row.addr_cell .col:first-of-type { display:flex; align-items:center; justify-content:center;}
.container>.row.addr_cell .col .row:first-of-type .col:first-of-type { flex-basis:70px; max-width:70px; position:absolute; height:50%; z-index:2; font-weight:bold; color:#AAA; }
.container>.row.addr_cell .col .row:first-of-type .col:first-of-type:before { content:'['; }
.container>.row.addr_cell .col .row:first-of-type .col:first-of-type:after { content:']'; }
.container>.row.addr_cell .col .row:first-of-type .col input { text-indent:60px; }
.container>.row:nth-of-type(4) .col:nth-of-type(2) { display:flex; align-items:center; }
.container>.row:nth-of-type(4) .col:nth-of-type(2) input { max-width:112px; }
.container>.row:nth-of-type(4) .col:nth-of-type(2) svg { margin:0 5px; }

</style>