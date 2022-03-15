<template>
    <b-container>
        <FormGroup ref="form_group" v-model="frm" :config="config" />
    <!--
    v-model="something"

    :value="something"
    @input="value => { something = value }"
    -->
        <b-row class="row mt-3">
            <b-col>
                <b-button :to="{name: 'bo_index', params: { bo_cd:bo_cd }}" size="sm" variant="light">목록</b-button>
            </b-col>
            <b-col class="text-right">
                <b-button @click="write" size="sm" variant="info">저장</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ax from '@/api/http';
import FormGroup from "./FormGroup.vue";

export default {
    name: 'BoardCreate',
    components: {
        FormGroup,
    },
    data() {
        return {
            bo_cd:this.$route.params.bo_cd,
            frm:{
                file_info_bo:[],
            },
            config:{},
        };
    },
    methods: {
        async create(){
            try {
                const res = await ax.get(`/api/board/${this.bo_cd}/create`);
                if (res && res.status === 200) {
                    this.config = res.data.config;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async write(){
            try {    
                const res = await ax.post(`/api/board/${this.bo_cd}/store`, this.frm);
                if (res && res.status === 200) {
                    await this.$refs.form_group.$refs.fileupload.fileProcessor(res.data.bo_id);
                    this.$router.push({ name: 'bo_show', params: { bo_cd:this.bo_cd, bo_id:res.data.bo_id }})
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    // beforeCreate() {
    //     this.$store.commit('board/dataSet', {
    //         bo:{},
    //         add_file:[],
    //         img_file:[],
    //     });
    // },
    mounted() {
        this.create();
    },

}
</script>
