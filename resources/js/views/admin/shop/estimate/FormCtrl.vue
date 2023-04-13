<template>
<div class="ctrl">
<b-row cols="1" cols-md="2">
    <b-col>
        <label for="all_dc">일괄할인</label>
        <b-form-input id="all_dc" v-model="value.all_dc" type="number" min="0" max="99" placeholder="00%" size="sm" />
        
        <label for="er_no_dlvy_fee" class>배송료 제외</label>
        <b-form-checkbox id="er_no_dlvy_fee" v-model="value.er_no_dlvy_fee" value="Y" unchecked-value="N" size="sm">
            <span class="point">※주의 - 상품가격에 반영되지 않음</span>
        </b-form-checkbox>
    </b-col>
    <b-col >
        <b-button class="white" :to="{name: 'adm_estimate_index'}" size="sm"><b-icon-list /> 목록으로</b-button>
        <b-button class="green" @click="save('preview')" size="sm"><b-icon-file-earmark-richtext-fill /> 미리보기</b-button>
        <template v-if="clickable">
            <b-button class="gray" @click="save('store')" size="sm"><font-awesome-icon icon="save" /> 임시저장</b-button>
            <b-button class="d_blue" @click="save('send')" size="sm"><font-awesome-icon icon="paper-plane" /> 완료/발송</b-button>
        </template>
        
        <b-button v-else class="gray" size="sm"><font-awesome-icon icon="save" /> 저장 중~!</b-button>
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
.ctrl .row .col:first-child { display:flex; align-items:center; }
.ctrl .row .col label { flex:0 0 16%; max-width:16%; text-align:right; padding:0 13px; font-weight:600; }
.ctrl .row .col label:last-of-type { flex:0 0 20%; max-width:20%; }
.ctrl .row .col #all_dc { flex:0 0 13%; max-width:13%; text-align:right; }
.ctrl .row .col .custom-control { flex-basis:0; flex-grow:1; max-width:100%; }
.ctrl .row .col .custom-control .point { color:#ff0000; }
.ctrl .row .col:last-child { text-align:right; }
    
</style>
