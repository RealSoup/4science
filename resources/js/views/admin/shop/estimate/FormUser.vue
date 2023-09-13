<template>
<div class="box label_form">
    <h5>견적요청자 정보</h5>
    <b-row>
        <b-col>
            <label>요청자</label>
            <user-input v-model="value.eq_name" :type="'name'" :frm="value" />
            <validation :error="$store.state.error.validations['estimate_req.eq_name']" />
        </b-col>
        <b-col>
            <label>직장/학교</label>
            <user-input v-model="value.eq_company" :type="'company'" :frm="value" />
            <validation :error="$store.state.error.validations['estimate_req.eq_company']" />
        </b-col>
    
        <b-col>
            <label>이메일</label>
            <user-input v-model="value.eq_email" :type="'email'" :frm="value" />
            <validation :error="$store.state.error.validations['estimate_req.eq_email']" />
        </b-col>

        <b-col>
            <label>휴대폰 번호</label>
            <user-input v-model="value.eq_hp" :type="'hp'" :frm="value" />
            <validation :error="$store.state.error.validations['estimate_req.eq_hp']" />
        </b-col>
  
        <b-col>
            <label>일반전화 번호</label>
            <div><b-form-input v-model="value.eq_tel" size="sm" :formatter="formatTel" /></div>
        </b-col>
        <b-col>
            <label>팩스번호</label>
            <div><b-form-input v-model="value.eq_fax" size="sm" :formatter="formatTel" /></div>
        </b-col>
    </b-row>
    <b-row v-if="value.eq_content">
        <b-col>
            <label>요청내용</label>
            <div v-html="nl2br(value.eq_content)" />
        </b-col>
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