<template>
<b-container class="p_wrap">
    <h3 class="p_tit">상품 목록</h3>

    <b-card class="search adform">
        <SchDate v-model="sch_frm"><b-col slot="prev" class="label">등록일</b-col></SchDate>
        <Categorys v-model="sch_frm" />
        <b-row>
            <b-col class="label">제조사</b-col>
            <b-col class="type02">
                <b-form-select v-model="sch_frm.gd_mk_id" size="sm">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="opt in makers" :value="opt.mk_id" :key="opt.mk_id">{{ opt.mk_name }}</b-form-select-option>
                </b-form-select>
            </b-col>

            <b-col class="label">활성</b-col>
            <b-col class="type02">
                <b-form-select v-model="sch_frm.gd_enable" size="sm">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="opt in gd_enable" :value="opt.value" :key="opt.value">{{ opt.name }}</b-form-select-option>
                </b-form-select>
            </b-col>
            
            <b-col class="label">검색</b-col>
            <b-col class="type05">
                <b-input-group size="sm">
                    <b-input-group-prepend>
                        <b-form-select class="custom-select" v-model="sch_frm.mode" size="sm">
                            <b-form-select-option value="gd_name">상품명</b-form-select-option>
                            <b-form-select-option value="gm_name">제품명</b-form-select-option>
                            <b-form-select-option value="gm_code">모델명</b-form-select-option>
                            <b-form-select-option value="manager">관리자</b-form-select-option>
                            <b-form-select-option value="cat_no">Cat.No</b-form-select-option>
                        </b-form-select>
                    </b-input-group-prepend>

                    <b-form-input v-model="sch_frm.keyword" placeholder="검색어를 입력하세요" @keyup.enter="index"></b-form-input>

                    <b-input-group-append>
                        <b-button @click="index"><b-icon-search /></b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </b-card>

    <b-card class="gd_list">
        <b-row>
            <b-col sm="12" md="6">total : {{this.list.total}}</b-col>
            <b-col sm="12" md="6" class="text-right">
                <b-button :to="{name: 'adm_goods_create'}" variant="info" size="sm"><b-icon-plus-lg /> 추가</b-button>
            </b-col>
        </b-row>
        <hr>

        <b-row class="list head">
            <b-col><span>번호. 상품명</span><span>이미지</span></b-col>                
            <b-col><span>카테고리</span><span>제조사</span></b-col>
            <b-col><span>생성자</span><span>생성일</span></b-col>
        </b-row>
        
        <b-link class="row list body" router-tag="div"
            v-for="row in list.data" :key="row.mk_id"
            :to="{name: 'adm_goods_edit', params: { gd_id:row.gd_id }}"
        >
            <b-col>
                <span>{{row.gd_id}}. <b>{{row.gd_name}}</b></span>
                <span>
                    <b-img :src="row.image_src_thumb[0]" rounded />
                </span>
            </b-col>

            <b-col>
                <span>
                    <ul>
                        <li v-if="row.goods_category_first.gc_ca01_name">{{row.goods_category_first.gc_ca01_name}}</li>
                        <li v-if="row.goods_category_first.gc_ca02_name">{{row.goods_category_first.gc_ca02_name}}</li>
                        <li v-if="row.goods_category_first.gc_ca03_name">{{row.goods_category_first.gc_ca03_name}}</li>
                        <li v-if="row.goods_category_first.gc_ca04_name">{{row.goods_category_first.gc_ca04_name}}</li>
                    </ul>
                </span>
                <span>{{row.maker.mk_name}}</span>
            </b-col>

            <b-col>
                <span><template v-if="row.user">{{row.user.name}}</template></span>
                <span>{{ row.created_at | formatDate }}</span>
            </b-col>
        </b-link>

        <pagination :data="list" @pagination-change-page="setPage" size="small" :limit="5" align="center" class="mt-5" />
    </b-card>
</b-container>
</template>

<script>
import ax from '@/api/http';

export default {
    components: {
        'Categorys': () => import('./_comp/Categorys.vue'),
        'SchDate': () => import('@/views/_common/SchDate.vue'),
    },
    data() {
        return {
            list: {},
            sch_frm: {
                startDate:'',
                endDate:'',
                gd_mk_id:'',
                gd_enable:'',
                ca01:0,
                ca02:0,
                ca03:0,
                ca04:0,
                mode:'gd_name',
                keyword:'',
                page:0
            },
            // categorys: {},
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
                    Notify.modal('검색 시작일이 종료일보다 높을 수는 없습니다.', 'warning');
                    return false;
                }
                const res = await ax.get(`/api/admin/shop/goods`, { params: this.sch_frm});
                if (res && res.status === 200) {
                    this.list = res.data.list;
                    // this.categorys = res.data.categorys;
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
    async mounted() {
        this.index();
        const res = await ax.get(`/api/admin/shop/maker`, { params: {type: 'all'}});
        if (res && res.status === 200)
            this.makers = res.data.list;
    },
}
</script>

<style lang="css" scoped>

.gd_list .list:not(:last-of-type) { border-bottom:1px solid #333; }
.gd_list .body:hover { background: #d8f2fd94; }

.gd_list .list>div:nth-of-type(2) { flex:0 0 30%; max-width:30%; }
.gd_list .list>div:nth-of-type(3) { flex:0 0 15%; max-width:15%; }
.gd_list .list>div{ padding-top:15px; padding-bottom:15px; }
.gd_list .body>div { cursor:pointer; }
.gd_list .body>div:nth-of-type(2) { background-color:#7fffd454; }
.gd_list .head>div { font-weight:bold; background:#666; color:#fff; }

.gd_list .row>div { font-size:.9rem; }
.gd_list .row>div:nth-of-type(1) span b { text-overflow:ellipsis; white-space:nowrap; word-wrap:normal; max-width:600px; overflow:hidden; display:inline-block; margin-bottom:-7px; }
.gd_list .row>div>span ul { display:inline-block; }
.gd_list .row>div>span:nth-of-type(2) { float:right; }
.gd_list .row>div img { max-width:80px; width:100%; height:80px; object-fit:cover; }
</style>
