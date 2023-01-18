<template>
    <b-container>
        <FormGroup ref="form_group" v-model="frm" :config="config" />
        <b-row class="row mt-3">
            <b-col>
                <b-button :to="{name: 'bo_index', params: { bo_cd:bo_cd }}" size="sm" variant="light">목록</b-button>
            </b-col>
            <b-col class="text-right">
                <b-button @click="update" size="sm" variant="warning">수정</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import ax from '@/api/http';
import FormGroup from "./FormGroup.vue";

export default {
    name: 'edit',
    components: {
        FormGroup,
    },
    data() {
        return {
            bo_cd:this.$route.params.bo_cd,
            bo_id:this.$route.params.bo_id,
            frm:{
                file_info_bo:[],
            },
            config:{},
        };
    },
    methods: {
        async edit(){
            try {
                const res = await ax.get(`/api/board/${this.bo_cd}/edit/${this.bo_id}`);
                if (res && res.status === 200) {
                    this.frm = res.data;
                    this.config = res.data.config;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async update(){
            try {
                this.frm = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    this.frm, // 수정하려는 객체
                    {_method : 'PATCH'} // 삽입하려는 내용
                );
                const res = await ax.post(`/api/board/${this.bo_cd}/update/${this.bo_id}`, this.frm);
                if (res && res.status === 200) {
                    await this.$refs.form_group.$refs.fileupload.fileProcessor(this.bo_id);
                    this.$router.push({ name: 'bo_show', params: { bo_cd:this.bo_cd, bo_id:this.bo_id }})
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    mounted() {
        this.edit();
    },
}
</script>