<template>
<b-container class="p_warp">

    <h1>회원 목록</h1>

    <b-card class="shadow">
        <b-container fluid>
            <SchDate v-model="sch_frm" />
            <b-row>
                <b-col sm="12" md="6" lg="3">
                    <b-form-select size="sm" v-model="sch_frm.group">
                        <option value="">◄ 유형 ►</option>
                        <b-form-select-option value="일반">일반</b-form-select-option>
                        <b-form-select-option value="특별">특별</b-form-select-option>
                        <b-form-select-option value="미수">미수</b-form-select-option>
                        <b-form-select-option value="후불">후불</b-form-select-option>
                    </b-form-select>
                </b-col>
                <b-col sm="12" md="6" lg="3">
                    <select class="custom-select" v-model="sch_frm.level">
                        <option value="">◄ 등급 ►</option>
                    </select>
                </b-col>
            </b-row>

            <b-row class="justify-content-end mt-3">
                <b-col md="12" lg="8">
                    <b-input-group>
                        <b-input-group-prepend>
                            <select class="custom-select" v-model="sch_frm.mode">
                                <option value="">◄ 검색옵션 ►</option>
                                <option value="gd_name">상품명</option>
                                <option value="gm_name">제품명</option>
                                <option value="gm_code">모델명</option>
                                <option value="manager">관리자</option>
                                <option value="cat_no">Cat.No</option>
                            </select>
                        </b-input-group-prepend>

                        <b-form-input v-model="sch_frm.keyword" placeholder="Please enter a keyword"></b-form-input>

                        <b-input-group-append>
                            <b-button variant="outline-primary" @click="index">Search</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
        </b-container>
    </b-card>

    <b-card class="shadow">
        <b-container fluid class="list">            
            <b-row>
                <b-col sm="12" md="6">total : {{this.list.total}}</b-col>
            </b-row>
            <hr>
            <b-row class="list_item" v-for="(us, i) in list.data" :key="i">
                <b-col col lg="1">
                    {{us.id}}. lv {{us.level}} <b-badge>{{option.grade[us.level]}}</b-badge>
                </b-col>

                <b-col col md="3" lg="4">
                    <b-button :to="{name: 'adm_user_edit', params: { id:us.id }}" size="sm" variant="light" block class="text-left p-2">
                        {{us.name}}<b-badge class="ml-2">{{us.email}}</b-badge>
                    </b-button>
                </b-col>                
                <b-col col md="3" lg="4">
                    <span><font-awesome-icon icon="mobile-alt" v-if="us.hp" />{{us.hp}}</span>
                    <span><font-awesome-icon icon="phone" v-if="us.tel" />{{us.tel}}</span>
                    <span><font-awesome-icon icon="fax" v-if="us.eq_fax" />{{us.eq_fax}}</span>
                </b-col>
                <b-col col md="3" lg="3">
                    <span><b-icon-calendar2-date-fill />{{ us.created_at | formatDate }}</span>
                </b-col>
                
            </b-row>
        </b-container>
    </b-card>

</b-container>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'AdmUserIndex',

    components: {
        'SchDate': () => import('@/views/admin/_module/SchDate.vue'),
    },

    data() {
        return {
            sch_frm: {
                startDate:'',
                endDate:'',
                keyword_type:'eq_name',
                keyword:'',
                page:0
            },
            list: {},
            option: {},
        };
    },

    computed: {
        
    },

    mounted() {
        this.index();
    },

    methods: {
        async index() {
            try {
                if (this.sch_frm.startDate && this.sch_frm.endDate && this.sch_frm.startDate > this.sch_frm.endDate) {
                    Notify.modal('검색 시작일이 종료일보다 높을 수는 없습니다.');
                    return false;
                }
                const res = await ax.get(`/api/admin/user/`, { params: this.sch_frm});
                if (res && res.status === 200) {
                    this.list = res.data.user;
                    this.option = res.data.option;
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
.list .row { padding:10px 0; }
.list .row:not(:last-of-type) { border-bottom:1px solid #ddd; }
.list .row .col span { margin-right:1rem; }
.list .row .col span svg { margin-right:0.5rem; }
.list .list_item .col:nth-of-type(3) { text-align:center; }
.list .list_item .col:nth-of-type(4) { text-align:right; }
</style>