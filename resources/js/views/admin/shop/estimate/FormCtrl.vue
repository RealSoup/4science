<template>
<div class="act_ctrl">
    <b-row cols="1" cols-md="2">
        <b-col>
            <label for="all_dc">일괄할인</label>
            <b-form-input id="all_dc" v-model="value.all_dc" type="number" min="0" max="99" placeholder="00%" class="rubber"></b-form-input>
            
            <label for="er_no_dlvy_fee" class>배송료 제외</label>
            <b-form-checkbox id="er_no_dlvy_fee" v-model="value.er_no_dlvy_fee" value="Y" unchecked-value="N" size="sm">
                <span class="point m_hide">※주의 - 상품가격에 반영되지 않음</span>
            </b-form-checkbox>
        </b-col>
        <b-col>
            <b-button class="white rubber" :to="{name: 'adm_estimate_index'}"><b-icon-list></b-icon-list> 목록으로</b-button>
            <b-button class="green rubber" @click="save('preview')"><b-icon-file-earmark-richtext-fill></b-icon-file-earmark-richtext-fill> 미리보기</b-button>
            <template v-if="clickable">
                <b-button class="gray rubber" @click="save('store')"><font-awesome-icon icon="save"></font-awesome-icon> 임시저장</b-button>
                <b-button class="d_blue rubber" @click="save('send')"><font-awesome-icon icon="paper-plane"></font-awesome-icon> 완료/발송</b-button>
            </template>
            
            <b-button v-else class="gray rubber"><font-awesome-icon icon="save"></font-awesome-icon> 저장 중~!</b-button>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    props: ['value', 'clickable'],
    watch: {
        'value.all_dc': {
            handler(n, o) {
                this.$emit('all_dc_update');
            },
        },
        // 'value.er_no_dlvy_fee': {
        //     handler(n, o) {
        //         this.$emit('calculator');
        //     },
        // },
    },


    methods: {
        save(type) {
            this.$emit('save', type);
        },
    },
}
</script>

<style lang="css" scoped>
.act_ctrl .row .col:first-child { display:flex; align-items:center; }
.act_ctrl .row .col label { flex:0 0 16%; max-width:16%; text-align:right; padding:0 13px; font-weight:600; }
.act_ctrl .row .col label:last-of-type { flex:0 0 20%; max-width:20%; }
.act_ctrl .row .col #all_dc { flex:0 0 13%; max-width:13%; text-align:right; }
.act_ctrl .row .col .custom-control { flex-basis:0; flex-grow:1; max-width:100%; }
.act_ctrl .row .col .custom-control .point { color:#ff0000; }
.act_ctrl .row .col:last-child { text-align:right; }
    
@media (max-width: 992px){ 
    .act_ctrl .row .col { margin-bottom:.3em; }
    .act_ctrl .row .col label { flex:0 0 25%; max-width:25%; padding:0 5px;  }
    .act_ctrl .row .col #all_dc { flex:0 0 25%; max-width:25%; }
    .act_ctrl .row .col label:last-of-type { flex:0 0 35%; max-width:35%; }
}
</style>
