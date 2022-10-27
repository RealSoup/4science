<template>
    <b-container id="estimate_req">
        <h2 class="bg-info p-4 text-light mt-5">견적요청</h2>
        <hr />
        <PaList v-model="frm.lists" />
     
        


        <b-row>
            <b-col>
                <b-card class="shadow mt-3">
                    <template #header><b>요청자 정보</b></template>
                    <b-container>
                        <b-row >
                            <b-col class="awesome_p">
                                <input type="text" id="eq_name" ref="eq_name" v-model="frm.eq_name" required />
                                <label for="eq_name"><span>이름</span></label>
                                <Validation :error="this.$store.state.error.validations.eq_name" />
                            </b-col>
                            <b-col class="awesome_p">
                                <input type="text" id="eq_department" ref="eq_department" v-model="frm.eq_department" required />
                                <label for="eq_department"><span>소속 <small><i>직장/학교/부서/학과/연구실명</i></small></span></label>
                                <Validation :error="this.$store.state.error.validations.eq_department" />
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class="awesome_p">
                                <input type="email" id="eq_email" ref="eq_email" v-model="frm.eq_email" required />
                                <label for="eq_email"><span>이메일</span></label>
                                <Validation :error="this.$store.state.error.validations.eq_email" />
                            </b-col>
                            <b-col class="awesome_p">
                                <input type="text" id="eq_tel" ref="eq_tel" v-model="frm.eq_tel" required />
                                <label for="eq_tel"><span>전화</span></label>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class="awesome_p">
                                <input type="text" id="eq_fax" ref="eq_fax" v-model="frm.eq_fax" required />
                                <label for="eq_fax"><span>팩스</span></label>
                            </b-col>
                            <b-col class="awesome_p">
                                <input type="text" id="eq_hp" ref="eq_hp" v-model="frm.eq_hp" required />
                                <label for="eq_hp"><span>휴대폰</span></label>
                                <Validation :error="this.$store.state.error.validations.eq_hp" />
                            </b-col>
                        </b-row>
                    </b-container>
                </b-card>
            </b-col>

            <b-col>

                <b-card class="shadow mt-3">
                    <template #header><b>문의사항</b></template>
                    <b-container>
                        <b-row v-if="isEmpty(frm.lists)">
                            <b-col>
                                <b-form-select size="sm" id="eq_1depth" ref="eq_1depth" v-model="frm.eq_1depth" required>
                                    <b-form-select-option value="">분야 선택</b-form-select-option>
                                    <b-form-select-option v-for="ca in cate" :key="ca.ca_id" :value="ca.ca_name">{{ca.ca_name}}</b-form-select-option>
                                </b-form-select>
                                <Validation :error="this.$store.state.error.validations.eq_1depth" />
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class="awesome_p">
                                <textarea id="eq_content" v-model="frm.eq_content" required rows="5"></textarea>
                                <label for="eq_content"><span>견적 요청 내용</span></label>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-card>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-card class="shadow mt-3">
                    <template #header><b>첨부파일</b></template>
                    <file-upload ref="fileupload" v-model="files" :fi_group="'estimateReq'" :fi_kind="'add'" />
                </b-card>
            </b-col>
        </b-row>


        <b-button block size="lg" variant="primary" class="mt-4 p-5" @click="store">요청하기</b-button>
    </b-container>
</template>

<script>
import ax from '@/api/http';
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    components: {
        FileUpload,
        'Validation': () => import('@/views/_common/Validation.vue'),
        'PaList': () => import('@/views/web/_module/PaList.vue'),
    },
    data() {
        return {
            frm:{
                lists:[],
                fi_id:[],
                eq_name: "김선우",
                eq_email: "sunwoo@nate.com",
                eq_tel: "031-133-1232",
                eq_fax: "031-133-1232",
                eq_hp: "010-1333-1232",
                eq_department: "한국과학기술연구원 바이오마이크로시스템 연구단",
                eq_content: "나는 가슴이 두근거려요 \n당신만 아세요 열 일곱 살이예요 \n가만 가만히 오세요 요리조리로 \n노랑새 꿈꾸는 버드나무 아래로 가만히 오세요 \n\n나는 얼굴이 붉어졌어요 \n가르쳐 드릴까요 열일곱살이예요",
                eq_1depth:'',
            },
            cate:{},
            od_goods: this.$route.params.od_goods,
            files:[]
        }
    },
    methods: {
        async create(){
            try {
                console.log(this.od_goods);
                const res = await ax.post(`/api/shop/estimate/create`, {goods:this.od_goods});
                if (res && res.status === 200) {
                    this.frm.lists = res.data.lists;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.responsee);
            }
        },
        async store(){
            try {
                let res = await ax.post(`/api/shop/estimate`, this.frm);
                if (res && res.status === 200) {
                    await this.$refs.fileupload.fileProcessor(res.data);
                    Notify.toast('success', '견적 요청 완료')
                    this.$router.push({name: 'main'});
                } else {
                    Notify.toast('warning', res);
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.responsee);
            }
        },
        pushFi_id(fi_id) {
            this.frm.fi_id.push(fi_id);
        },
        async getCateList(){
            try {
                const res = await ax.get(`/api/category/0`);
                if (res && res.status === 200)
                    this.cate = res.data.categorys;
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
    },
    mounted() {
        if (this.$route.params.od_goods)
            this.create();
        this.getCateList();
    },
}
</script>

<style lang="css" scoped>
#estimate_req .card .card-body .row div img { width:119px; height:119px; object-fit:cover; }


</style>
