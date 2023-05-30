<template>
<div class="">
    <b-container>
        <b-row>
            <b-col class="awesome_p">
                <b-form-input v-model="value.bo_subject" id="bo_subject" size="lg" required />
                <label for="bo_subject">제목</label>
                <validation :error="$store.state.error.validations.bo_subject" />
            </b-col>
        </b-row>
        <b-row>
            <b-col class="awesome_p">
                <textarea id="'bo_content" v-model="value.bo_content" rows="8" required></textarea>
                <label for="bo_content">내용</label>
                <validation :error="$store.state.error.validations.bo_content" />
            </b-col>
        </b-row>        
    </b-container>
</div>
</template>

<script>
// import { mapState } from 'vuex';

// import AddFile from "./components/AddFile.vue"
// import Comment from "../components/Comment.vue"

export default {
    name: 'AdmBoardBoForm',
    components: {
        'validation': () => import('@/views/_common/Validation.vue'),
    },
    props: ['value'],
    data() {
        return {
            fi_id:[],
        };
    },
    methods: {
        updateValue() {
            this.$emit("input", {
                bo_subject: this.$refs.bo_subject.value,
                bo_content: this.$refs.bo_content.value,
                fi_id: this.fi_id,
            });
        },
        pushFi_id(fi_id) {
            this.fi_id.push(fi_id);
            this.updateValue();
        },
    },

}
</script>

<style scoped>

</style>