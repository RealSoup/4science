<template>
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
</template>

<script>
export default {
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
</style>
