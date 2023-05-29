<template>
<div class="box est_frm">
    <h5>견적요청자 정보</h5>
    <b-row>
        <b-col>요청자</b-col>
        <b-col>
            <user-input v-model="value.eq_name" :type="'name'" :frm="value" />
            <validation :error="$store.state.error.validations.eq_name" />
        </b-col>
        <b-col>직장/학교</b-col>
        <b-col>
            <user-input v-model="value.eq_company" :type="'company'" :frm="value" />
            <validation :error="$store.state.error.validations.eq_company" />
        </b-col>
    </b-row>
    <b-row>
        <b-col>이메일</b-col>
        <b-col>
            <user-input v-model="value.eq_email" :type="'email'" :frm="value" />
            <validation :error="$store.state.error.validations.eq_email" />
        </b-col>
        <b-col>휴대폰 번호</b-col>
        <b-col>
            <user-input v-model="value.eq_hp" :type="'hp'" :frm="value" />
            <validation :error="$store.state.error.validations.eq_hp" />
        </b-col>
    </b-row>
    <b-row>
        <b-col>일반전화 번호</b-col>
        <b-col>
            <b-form-input v-model="value.eq_tel" :formatter="formatTel" />
        </b-col>
        <b-col>팩스번호</b-col>
        <b-col>
            <b-form-input v-model="value.eq_fax" :formatter="formatTel" />
        </b-col>
    </b-row>
    <b-row v-if="value.eq_content">        
        <b-col>요청내용</b-col>
        <b-col><div v-html="nl2br(value.eq_content)" /></b-col>
    </b-row>
</div>
</template>

<script>
export default {
    components: {
        'user-input': () =>      import('./_comp/UserInput.vue'),
        'validation': () => import('@/views/_common/Validation.vue'),
    },
    props: ['value'],
}
</script>