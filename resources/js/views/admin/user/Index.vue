<template>
<b-container class="p_warp">

    <h1>회원 목록</h1>

    <b-card class="shadow">
        <b-container fluid>
            <SchDate v-model="frm" />
            <b-row>
                <b-col sm="12" md="6" lg="3">
                    <b-form-select size="sm" v-model="frm.group">
                        <option value="">◄ 유형 ►</option>
                        <b-form-select-option value="일반">일반</b-form-select-option>
                        <b-form-select-option value="특별">특별</b-form-select-option>
                        <b-form-select-option value="미수">미수</b-form-select-option>
                        <b-form-select-option value="후불">후불</b-form-select-option>
                    </b-form-select>
                </b-col>
                <b-col sm="12" md="6" lg="3">
                    <select class="custom-select" v-model="frm.level">
                        <option value="">◄ 등급 ►</option>
                    </select>
                </b-col>
            </b-row>

            <b-row class="justify-content-end mt-3">
                <b-col md="12" lg="8">
                    <b-input-group>
                        <b-input-group-prepend>
                            <select class="custom-select" v-model="frm.mode">
                                <option value="">◄ 검색옵션 ►</option>
                                <option value="gd_name">상품명</option>
                                <option value="gm_name">제품명</option>
                                <option value="gm_code">모델명</option>
                                <option value="manager">관리자</option>
                                <option value="cat_no">Cat.No</option>
                            </select>
                        </b-input-group-prepend>

                        <b-form-input v-model="frm.keyword" placeholder="Please enter a keyword"></b-form-input>

                        <b-input-group-append>
                            <b-button variant="outline-primary" @click="index">Search</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
        </b-container>
    </b-card>

    <b-card class="shadow">
        <b-container fluid>            
            <b-row>
                <b-col>

                </b-col>
            </b-row>
        </b-container>
    </b-card>

</b-container>
</template>

<script>
export default {
    name: 'AdmUserIndex',

    components: {
        'SchDate': () => import('@/views/admin/_module/SchDate.vue'),
    },

    data() {
        return {
            frm: {
                startDate:'',
                endDate:'',
                keyword_type:'eq_name',
                keyword:'',
                page:0
            },
            list: {},
        };
    },

    mounted() {
        
    },

    methods: {
        async index() {
            try {
                if (this.sch_frm.startDate && this.sch_frm.endDate && this.sch_frm.startDate > this.sch_frm.endDate) {
                    Notify.modal('검색 시작일이 종료일보다 높을 수는 없습니다.');
                    return false;
                }
                const res = await ax.get(`/api/admin/shop/goods/`, { params: this.sch_frm});
                if (res && res.status === 200) {
                    this.list = res.data.list;
                    this.categorys = res.data.categorys;
                    this.makers = res.data.makers;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        setPage(page) {
            this.sch_frm.page = page;
            this.index();
        },
    },
};
</script>

<style lang="css" scoped>

</style>