<template>
<div class="box est_frm">
    <h5>견적요청자 정보</h5>
    <b-row>
        <b-col>요청자</b-col>
        <b-col>
            <UserInput v-model="value.eq_name" :type="'name'" :frm="value" />
            <Validation :error="$store.state.error.validations.eq_name" />
        </b-col>
        <b-col>소속/부서</b-col>
        <b-col>
            <UserInput v-model="value.eq_department" :type="'department'" :frm="value" />
            <Validation :error="$store.state.error.validations.eq_department" />
        </b-col>
    </b-row>
    <b-row>
        <b-col>이메일</b-col>
        <b-col>
            <UserInput v-model="value.eq_email" :type="'email'" :frm="value" />
            <Validation :error="$store.state.error.validations.eq_email" />
        </b-col>
        <b-col>휴대폰 번호</b-col>
        <b-col>
            <UserInput v-model="value.eq_hp" :type="'hp'" :frm="value" />
            <Validation :error="$store.state.error.validations.eq_hp" />
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
        <hr />
        <b-col>요청내용</b-col>
        <b-col><div v-html="nl2br(value.eq_content)" /></b-col>
    </b-row>
</div>
</template>

<script>
export default {
    components: {
        'UserInput': () =>      import('./_comp/UserInput.vue'),
        'Validation': () => import('@/views/_common/Validation.vue'),
    },
    props: ['value'],
}
</script>