<template>
    <div>
        <FormGroup ref="form_group" v-model="frm" :config="config" />
    <!--
    v-model="something"

    :value="something"
    @input="value => { something = value }"
    -->
        <div class="btn_box">
            <b-button  v-if="this.$route.params.bo_cd" :to="{name: 'bo_index', params: { bo_cd:bo_cd }}" size="sm" class="gray">목록</b-button>
            <b-button @click="write" class="blue lg">
                <template v-if="cs_bo_cd == 'inquiry'">문의하기</template>
                <template v-else-if="cs_bo_cd == 'as'">A/S 신청하기</template>
                <template v-else-if="cs_bo_cd == 'cancel'">신청하기</template>
                <template v-else>저장</template>
            </b-button>
        </div>
    </div>
</template>

<script>
import ax from '@/api/http';
import FormGroup from "./FormGroup.vue";

export default {
    name: 'BoardCreate',
    components: {
        FormGroup,
    },
    props: ['cs_bo_cd'],
    data() {
        return {
            bo_cd:this.cs_bo_cd ? this.cs_bo_cd : this.$route.params.bo_cd ,
            frm:{
                file_info_bo:[],
                bo_od_type:'ON',
                bo_type:'C',
                bo_content: '',
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
                    if (this.frm.file_info_bo.length)
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
        if (this.bo_cd=='as' || this.bo_cd=='cancel') {
            this.frm.bo_content = "제품명: \n사양: \n수량: ";
        }
    },

}
</script>


<style scoped>

.container .btn_box { margin-left:145px; margin-top:1rem; }
</style>
