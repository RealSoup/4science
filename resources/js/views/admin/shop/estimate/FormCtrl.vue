<template>
<div>
    <b-card no-body class="ctrl">
        <b-container>
            <b-row cols="1" cols-md="2">
                <b-col>
                    <router-link :to="{name: 'adm_estimate_index'}" class="btn btn-sm btn-light"><b-icon-list /> 목록</router-link>
                </b-col>
                <b-col>
                    <b-button size="sm" variant="info" @click="preview"><b-icon-search /> 미리보기</b-button>
                        <b-button size="sm" variant="success" @click="save('store')"><font-awesome-icon icon="save" /> 저장</b-button>
                    <b-button size="sm" variant="primary" @click="save('send')"><b-icon-mailbox /> 발송</b-button>
                </b-col>
            </b-row>
        </b-container>
    </b-card>

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
</div>
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
    methods: {
        save(type) {
            this.$emit('save', type);
        },
        preview () {
            var url = `/api/admin/shop/estimate/showEstimate/${this.$route.params.er_id}`;
            var name = "견적서 미리보기";
            var option = "width = 900, height = 900, top = 10, left = 10, location = no"
            window.open(url, name, option);
        },
    },
}
</script>

<style lang="css" scoped>
.ctrl .row .col:last-child { text-align:right; }
.extra_func .row .col:last-child label span { font-size:.9rem; }
#all_dc { text-align:right; }
</style>
