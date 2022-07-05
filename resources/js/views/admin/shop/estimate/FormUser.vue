<template>
<b-card class="adform">
    <b-container>
        <b-row><b-col class="tit">요청자</b-col></b-row>
        <b-row>
            <b-col class="label">이름</b-col>
            <b-col class="type02">
                <UserInput v-model="value.eq_name" :type="'name'" :frm="value" />
                <Validation :error="$store.state.error.validations.eq_name" />
            </b-col>
            <b-col class="label">이메일</b-col>
            <b-col class="type02">
                <UserInput v-model="value.eq_email" :type="'email'" :frm="value" />
                <Validation :error="$store.state.error.validations.eq_email" />
            </b-col>
            <b-col class="label">소속</b-col>
            <b-col class="type02">
                <UserInput v-model="value.eq_department" :type="'department'" :frm="value" />
                <Validation :error="$store.state.error.validations.eq_department" />
            </b-col>
        </b-row>
        <b-row>
            <b-col class="label">휴대폰</b-col>
            <b-col class="type02">
                <UserInput v-model="value.eq_hp" :type="'hp'" :frm="value" />
                <Validation :error="$store.state.error.validations.eq_hp" />
            </b-col>

            <b-col class="label">일반전화</b-col>
            <b-col class="type02">
                <b-form-input v-model="value.eq_tel" :formatter="formatTel" />
            </b-col>
            <b-col class="label">팩스</b-col>
            <b-col class="type02">
                <b-form-input v-model="value.eq_fax" :formatter="formatTel" />
            </b-col>
        </b-row>
        <b-row v-if="value.eq_content">
            <hr />
            <b-col class="label">요청내용</b-col>
            <b-col class="type11" v-html="nl2br(value.eq_content)"></b-col>
        </b-row>
    </b-container>
</b-card>
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