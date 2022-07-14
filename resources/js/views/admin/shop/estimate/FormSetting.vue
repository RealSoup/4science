<template>
<b-card no-body class="extra_func adform">
    <b-container>
        <b-row>
            <b-col class="label" tag="label" for="all_dc">일괄할인</b-col>
            <b-col class="type01">
                <b-form-input id="all_dc" v-model="value.all_dc" type="number" min="0" max="99" placeholder="00%"/>
            </b-col>
            
            <b-col class="label short" tag="label" for="er_no_dlvy_fee">배송료 제외</b-col>
            <b-col class="type05">
                <b-form-checkbox id="er_no_dlvy_fee" v-model="value.er_no_dlvy_fee" value="Y" unchecked-value="N" size="lg">
                    <span class="point">※주의 - 상품가격에 반영되지 않음</span>
                </b-form-checkbox>
            </b-col>
        </b-row>
    </b-container>
</b-card>
</template>

<script>
export default {
    props: ['value'],
    watch: {
        'value.all_dc': {
            handler(n, o) {
                this.$emit('all_dc_update');
            },
        },
        'value.er_no_dlvy_fee': {
            handler(n, o) {
                this.$emit('calculator');
            },
        },
    },
}
</script>

<style lang="css" scoped>
.extra_func .row .col:last-child label span { font-size:.9rem; }
#all_dc { text-align:right; }
</style>
