<template>
<b-card no-body class="ctrl">
    <b-container>
        <b-row cols="1" cols-md="2">
            <b-col>
                <router-link :to="{name: 'adm_estimate_index'}" class="btn btn-sm btn-light"><b-icon-list /> 목록</router-link>
            </b-col>
            <b-col >
                <b-button size="sm" variant="info" @click="save('preview')"><b-icon-search /> 미리보기</b-button>
                <template v-if="clickable">
                    <b-button size="sm" variant="success" @click="save('store')"><font-awesome-icon icon="save" /> 임시저장</b-button>
                    <b-button size="sm" variant="primary" @click="save('send')"><b-icon-mailbox /> 완료/발송</b-button>
                </template>
                
                <b-button v-else size="sm" class="gray">저장 중~!</b-button>
            </b-col>
        </b-row>
    </b-container>
</b-card>
</template>

<script>
export default {
    props: ['clickable'],
    methods: {
        save(type) {
            this.$emit('save', type);
        },
    },
}
</script>

<style lang="css" scoped>
.ctrl .row .col:last-child { text-align:right; }
</style>
