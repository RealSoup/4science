<template lang="html">
    <div class="user">
        <div class="m_title">요청자</div>

        <b-row>
            <b-col>
                <UserInput v-model="value.eq_name" :type="'name'" :frm="value" />
                <Validation :error="$store.state.error.validations.eq_name" />
            </b-col>
            <b-col>
                <UserInput v-model="value.eq_email" :type="'email'" :frm="value" />
                <Validation :error="$store.state.error.validations.eq_email" />
            </b-col>
            <b-col>
                <UserInput v-model="value.eq_department" :type="'department'" :frm="value" />
                <Validation :error="$store.state.error.validations.eq_department" />
            </b-col>
            <b-col>
                <UserInput v-model="value.eq_hp" :type="'hp'" :frm="value" />
                <Validation :error="$store.state.error.validations.eq_hp" />
            </b-col>

            <b-col class="awesome_p">
                <input type="text" id="eq_tel" v-model="value.eq_tel" :formatter="formatTel" required />
                <label for="eq_tel">전화</label>
            </b-col>
            <b-col class="awesome_p">
                <input type="text" id="eq_fax" v-model="value.eq_fax" :formatter="formatTel" required />
                <label for="eq_fax">팩스</label>
            </b-col>
        </b-row>
        <b-row v-if="value.eq_content">
            <b-col cols="12">
                <hr />
            </b-col>
            <b-col class="awesome_p force">
                <div class="pt-4" v-html="nl2br(value.eq_content)"></div>
                <!-- <textarea id="'eq_content" v-model="value.eq_content" rows="5" required readonly /></textarea> -->
                <label for="eq_content">요청내용</label>
            </b-col>
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

<style lang="css" scoped>
.user { margin-top:1.5rem; }
</style>
