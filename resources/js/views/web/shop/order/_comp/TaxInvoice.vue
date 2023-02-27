<template>
<div class="tax_iv">
    <div v-if="value.oex_type == 'IV' || value.oex_type == 'IVNO'">
        <h6>세금계산서 발급 정보 등록</h6>
        
        <b-form-checkbox v-model="value.oex_hasBizLicense">사업자등록증 사본 첨부</b-form-checkbox>

        <transition name="slideUpDown">
            <b-container v-if="value.oex_hasBizLicense === true">
                <b-row>
                    <label for="biz_file">파일 첨부</label>
                    <b-form-file id="biz_file" v-model="value.oex_file" ref="oex_file" size="sm" plain />
                </b-row>            
            </b-container>
            
        </transition>
        <transition name="slideUpDown">
            <b-container v-if="!value.oex_hasBizLicense">
                <b-row>
                    <label for="oex_biz_name">법인명</label>
                    <b-form-input v-model="value.oex_biz_name" ref="oex_biz_name" id="oex_biz_name" size="sm" />
                </b-row>
                <b-row>
                    <label for="oex_biz_num">등록번호</label>
                    <b-form-input v-model="value.oex_biz_num" ref="oex_biz_num" id="oex_biz_num" size="sm" />
                </b-row>
                <b-row>
                    <label for="oex_biz_type">업태/종목</label>
                    <b-form-input v-model="value.oex_biz_type" ref="oex_biz_type" id="oex_biz_type" size="sm" />
                    <b>/</b>
                    <b-form-input v-model="value.oex_biz_item" ref="oex_biz_item" size="sm" />
                </b-row>
                <b-row>
                    <label for="oex_ceo">대표자명</label>
                    <b-form-input v-model="value.oex_ceo" ref="oex_ceo" id="oex_ceo" size="sm" />
                </b-row>
                <b-row>
                    <label for="oex_addr">사업장소재지</label>
                    <b-form-input v-model="value.oex_addr" ref="oex_addr" id="oex_addr" size="sm" />
                </b-row>
                <b-row>
                    <label for="oex_requirement">요구사항</label>
                    <b-form-textarea v-model="value.oex_requirement" ref="oex_requirement" id="oex_requirement" size="sm" />
                </b-row>
            </b-container>
        </transition>
        
        <transition name="slideUpDown">
            <b-container v-if="value.oex_hasBizLicense !== 'NOT'">
                <b-row>
                    <label for="oex_mng">담당자</label>
                    <b-form-input v-model="value.oex_mng" ref="oex_mng" id="oex_mng" size="sm" />
                </b-row>
                <b-row>
                    <label for="oex_email">이메일</label>
                    <b-form-input v-model="value.oex_email" ref="oex_email" id="oex_email" size="sm" />
                </b-row>
                <b-row>
                    <label for="oex_num_tel">연락처</label>
                    <b-form-input v-model="value.oex_num_tel" ref="oex_num_tel" id="oex_num_tel" size="sm" />
                </b-row>            
            </b-container>
        </transition>
        
        <b-form-radio v-model="value.oex_type" value="IVNO">입력 안함</b-form-radio>
    </div>
    
    <div v-else-if="value.oex_type == 'IN' || value.oex_type == 'HP' || value.oex_type == 'CN' || value.oex_type == 'BN'">
        <h6>현금영수증 발급 정보 등록</h6>

        <b-form-radio v-model="value.oex_type" value="HP">핸드폰번호</b-form-radio>
        <transition name="slideUpDown">
            <b-container v-if="value.oex_type === 'HP'">
                <b-row>
                    <b-form-input type="number" v-model="value.oex_num_hp1" ref="oex_num_hp1" size="sm" @input.native="focusNext($event, 3, 'oex_num_hp2')" :formatter="maxlength_3" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_hp2" ref="oex_num_hp2" size="sm" @input.native="focusNext($event, 4, 'oex_num_hp3')" :formatter="maxlength_4" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_hp3" ref="oex_num_hp3" size="sm" :formatter="maxlength_4" />
                </b-row>         
            </b-container>
        </transition>

        <b-form-radio v-model="value.oex_type" value="IN">주민등록번호</b-form-radio>
        <transition name="slideUpDown">
            <b-container v-if="value.oex_type === 'IN'">
                <b-row>
                    <b-form-input type="number" v-model="value.oex_num_in1" ref="oex_num_in1" size="sm" @input.native="focusNext($event, 6, 'oex_num_in2')" :formatter="maxlength_6" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_in2" ref="oex_num_in2" size="sm" :formatter="maxlength_7" />
                </b-row>         
            </b-container>
        </transition>

        <b-form-radio v-model="value.oex_type" value="CN">카드번호</b-form-radio>
        <transition name="slideUpDown">
            <b-container v-if="value.oex_type === 'CN'">
                <b-row>
                    <b-form-input type="number" v-model="value.oex_num_cn1" ref="oex_num_cn1" size="sm" @input.native="focusNext($event, 4, 'oex_num_cn2')" :formatter="maxlength_6" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_cn2" ref="oex_num_cn2" size="sm" @input.native="focusNext($event, 4, 'oex_num_cn3')" :formatter="maxlength_6" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_cn3" ref="oex_num_cn3" size="sm" @input.native="focusNext($event, 4, 'oex_num_cn4')" :formatter="maxlength_6" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_cn4" ref="oex_num_cn4" size="sm" :formatter="maxlength_4" />
                </b-row>         
            </b-container>
        </transition>

        <b-form-radio v-model="value.oex_type" value="BN">사업자등록번호</b-form-radio>
        <transition name="slideUpDown">
            <b-container v-if="value.oex_type === 'BN'">
                <b-row>
                    <b-form-input type="number" v-model="value.oex_num_bn1" ref="oex_num_bn1" size="sm" @input.native="focusNext($event, 3, 'oex_num_bn2')" :formatter="maxlength_3" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_bn2" ref="oex_num_bn2" size="sm" @input.native="focusNext($event, 2, 'oex_num_bn3')" :formatter="maxlength_2" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_bn3" ref="oex_num_bn3" size="sm" :formatter="maxlength_5" />
                </b-row>         
            </b-container>
        </transition>
    </div>
    <b-button size="lg" @click="close">저 장</b-button>
</div>
</template>

<script>
export default {
    name: 'TaxInvoice',
    props:['value'],
    methods: {
        close () { this.$emit('close'); },
        
        maxlength_2(e){ return String(e).substring(0, 2); },
        maxlength_3(e){ return String(e).substring(0, 3); },
        maxlength_4(e){ return String(e).substring(0, 4); },
        maxlength_5(e){ return String(e).substring(0, 5); },
        maxlength_6(e){ return String(e).substring(0, 6); },
        maxlength_7(e){ return String(e).substring(0, 7); },
        focusNext(e, max, next) { this.$focusNext(e, max, next); },
    }


}
</script>

<style lang="css" scoped>

.tax_iv h6 { margin:1rem; padding:.5rem; border-bottom:1px solid #DEDEDE; font-weight:bold; font-size:.9rem; }
.tax_iv .custom-control { margin:2rem 0 1rem 4rem; }
.tax_iv .b-form-file { margin-left:3rem; }
.tax_iv .container { padding:0 3rem; }
.tax_iv .container .row  { margin:1rem 0; align-items:center; }
.tax_iv .container .row label { flex:0 0 30%; max-width:30%; font-weight:bold; font-size:.8rem; }
.tax_iv .container .row input,
.tax_iv .container .row textarea { flex-basis: 0; flex-grow: 1; max-width: 100%; }
.tax_iv .container .row b { margin:0 .5rem; }


.tax_iv>button { position:absolute; left:0; bottom:0; background-color:#0E4D9C; color:#FFF; letter-spacing:1rem; width:100%; border-width:0; border-radius:0; }

</style>
