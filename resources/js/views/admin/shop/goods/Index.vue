<template lang="html">
    <div class="adm_goods">
        <b-card class="shadow">
            <b-container fluid>
                <b-row>
                    <b-col sm="12" md="6" lg="3">
                        <b-form-datepicker id="startDate" v-model="sch_frm.startDate" placeholder="Choose a start date" class="mb-2"></b-form-datepicker>
                    </b-col>
                    <b-col sm="12" md="6" lg="3">
                        <b-form-datepicker id="endDate" v-model="sch_frm.endDate" placeholder="Choose a end date" class="mb-2"></b-form-datepicker>
                    </b-col>
                    <b-col sm="12" md="6" lg="3">
                        <select class="custom-select" v-model="sch_frm.mk_id">
                            <option value="">◄ 제조사 ►</option>
                            <option v-for="opt in makers" :value="opt.mk_id">{{ opt.mk_name }}</option>
                        </select>
                    </b-col>
                    <b-col sm="12" md="6" lg="3">
                        <select class="custom-select" v-model="sch_frm.gd_enable">
                            <option value="">◄ 활성화 ►</option>
                            <option v-for="opt in gd_enable" :value="opt.value">{{ opt.name }}</option>
                        </select>
                    </b-col>
                </b-row>

                <Category v-model="sch_frm" :categorys="categorys" />

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

        <b-card class="shadow gd_list">
            <b-container fluid>
                <b-row>
                    <b-col sm="12" md="6">total : {{this.list.total}}</b-col>
                    <b-col sm="12" md="6" class="text-right">
                        <b-button :to="{name: 'adm_goods_create'}" variant="outline-primary" size="sm">Create</b-button>
                    </b-col>
                </b-row>
                <hr>
                <b-row class="list_item" v-for="(row, idx) in list.data" :key="row.mk_id">
                    <b-col lg="2" class="d-none d-lg-block cate_name">
                        <div class="d-inline-block">
                            <div class="mb-2"><b-badge pill variant="dark">{{row.gd_id}}</b-badge></div>
                            <div v-if="row.gc_ca01_name"><b-badge class="text-dark bg-white">{{row.gc_ca01_name}}</b-badge></div>
                            <div v-if="row.gc_ca02_name"><b-badge variant="light">{{row.gc_ca02_name}}</b-badge></div>
                            <div v-if="row.gc_ca03_name"><b-badge variant="secondary">{{row.gc_ca03_name}}</b-badge></div>
                            <div v-if="row.gc_ca04_name"><b-badge variant="dark">{{row.gc_ca04_name}}</b-badge></div>
                        </div>
                        <div class="d-inline-block float-right">
                            <img :src="row.image_src_thumb[0]" alt="Card image" class="card-img-left">
                        </div>

                    </b-col>

                    <b-col md="3" lg="6">
                        <router-link :to="{name: 'adm_goods_edit', params: { gd_id:row.gd_id }}" class="btn btn-light btn-sm d-block text-left">
                            {{row.gd_name}}
                        </router-link>
                    </b-col>
                    <b-col md="3" lg="2">{{row.mk_name}}</b-col>
                    <b-col md="3" lg="2">
                        <div class="d-inline-block">
                            <div class="mb-2">{{row.manager}}</div>
                            <div>{{ row.created_at | formatDate }}</div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>

            <pagination :data="list" @pagination-change-page="setPage" align="center" class="mt-5"></pagination>
        </b-card>
    </div>
</template>

<script>
import ax from '@/api/http';

export default {
    components: {
        'Category': () => import('@/views/admin/_module/Category.vue'),
    },
    data() {
        return {
            list: {},
            sch_frm: {
                startDate:'',
                endDate:'',
                mk_id:'',
                gd_enable:'',
                ca01:0,
                ca02:0,
                ca03:0,
                ca04:0,
                mode:'',
                keyword:'',
                page:0
            },
            categorys: {},
            makers: {},
            gd_enable: { 0:{value:'Y', name:'활성'}, 1:{value:'N', name:'비활성'} },

        }
    },
    methods: {
        numCalc(i) {
            return this.list.total - (this.list.current_page - 1) * this.list.per_page - i ;
        },
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
    mounted() {
        this.index();
    },
}
</script>

<style lang="css" scoped>
.adm_goods .card.gd_list .row.list_item > div { padding-top:15px; padding-bottom:15px; }
.adm_goods .card.gd_list .row.list_item:nth-child(odd) > div:nth-child(odd),
.adm_goods .card.gd_list .row.list_item:nth-child(even) > div:nth-child(even) { /*border:1px solid #EAF2FF;*/ }
.adm_goods .card.gd_list .row.list_item:nth-child(odd) > div:nth-child(even),
.adm_goods .card.gd_list .row.list_item:nth-child(even) > div:nth-child(odd) { background-color:#EAF2FF; }
.adm_goods .card.gd_list .row.list_item > .cate_name .badge { font-size:1rem; }
.adm_goods .card.gd_list .row > div img { max-width:120px; width:100%; height:120px; object-fit:cover; }
</style>
