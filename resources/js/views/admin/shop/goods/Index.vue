<template>
<b-container class="p_wrap">
    <h3 class="p_tit">
        <template v-if="$route.query.gd_type == 'REN'">렌탈</template>
        <template v-else>상품</template>
         목록
    </h3>

    <b-container class="frm_sch">
        <sch-date v-model="sch_frm">
            <template slot="prev">
                <b-col class="label m_hide">기간</b-col>                
                <b-col class="type01">
                    <b-form-select v-model="sch_frm.sort">
                        <b-form-select-option value="edit">수정순</b-form-select-option>
                        <b-form-select-option value="new">등록순</b-form-select-option>
                    </b-form-select>
                </b-col>
            </template>
        </sch-date>
        <categorys v-model="sch_frm" />
        <b-row>
            <b-col class="label">제조사</b-col>
            <b-col class="type01 col_maker">
                <autocomplete :search="search" :get-result-value="getResultValue" @submit="handleSubmit" auto-select :submitOnEnter="true" placeholder="키보드로 입력" @focus="field_switch='maker'" @blur="field_chk"></autocomplete>
                <!--
                <b-form-select v-model="sch_frm.gd_mk_id">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="opt in makers" :value="opt.mk_id" :key="opt.mk_id">{{ opt.mk_name }}</b-form-select-option>
                </b-form-select>
                -->
            </b-col>

            <b-col class="label">활성</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.gd_enable">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="opt in gd_enable" :value="opt.value" :key="opt.value">{{ opt.name }}</b-form-select-option>
                </b-form-select>
            </b-col>

            <b-col class="label">삭제</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.deleted_at">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="opt in deleted_at" :value="opt.value" :key="opt.value">{{ opt.name }}</b-form-select-option>
                </b-form-select>
            </b-col>

            <b-col class="label">관리자</b-col>
            <b-col class="type01">
                <autocomplete :search="search" :get-result-value="getResultValue" @submit="handleSubmit" auto-select :submitOnEnter="true" placeholder="키보드로 입력" @focus="field_switch='adm'" @blur="field_chk"></autocomplete>
                <!--
                <b-form-select v-model="sch_frm.updated_id">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="opt in mng_off" :value="opt.id" :key="opt.id">{{ opt.name }}</b-form-select-option>
                </b-form-select>
                -->
            </b-col>
        </b-row>

        <b-row>
            <b-col class="label">검색</b-col>
            <b-col class="sch_input">
                <b-input-group>
                    <b-input-group-prepend>
                        <b-form-select class="custom-select" v-model="sch_frm.mode">
                            <b-form-select-option value="gd_name">상품명</b-form-select-option>
                            <b-form-select-option value="gm_name">제품명</b-form-select-option>
                            <b-form-select-option value="gm_code">모델명</b-form-select-option>
                            <b-form-select-option value="cat_no">Cat.No</b-form-select-option>
                        </b-form-select>
                    </b-input-group-prepend>

                    <b-form-input v-model="sch_frm.keyword" placeholder="검색어를 입력하세요" @keyup.enter="routerPush(1)"></b-form-input>

                    <b-input-group-append>
                        <b-button @click="routerPush(1)"><b-icon-search /></b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </b-container>

    <b-container class="cmain">
        <b-row>
            <b-col>Total : <b-badge variant="info">{{this.list.total}}</b-badge></b-col>
            <b-col class="text-right ctrl">
                <span class="m_hide">상품정보를 클릭하면 수정이 가능합니다.</span>
                <b-button :to="{name: 'adm_goods_create'}" class="blue"><b-icon-plus-lg /> 추가</b-button>
            </b-col>
        </b-row>

        <b-row class="list head">
            <b-col>
                <span v-if="!sch_frm.gd_seq">번호</span>
                <span v-else>우선순위</span>
            </b-col>
            <b-col>카테고리</b-col>
            <b-col>이미지</b-col>
            <b-col>상품명</b-col>
            <b-col>제조사</b-col>
            <b-col>담당자</b-col>
            <b-col>활성</b-col>
            <b-col>최종수정일</b-col>
        </b-row>
        <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
        <b-row v-else class="list body" :class="{disable:row.gd_enable=='N'}" v-for="row in list.data" :key="row.gd_id">
            <b-col>
                <span v-if="!sch_frm.gd_seq">{{row.gd_id}}</span>
                <span v-else>{{row.gd_seq}}</span>
            </b-col>
            <b-col>
                <div v-if="row.goods_category_first">
                    <p v-if="row.goods_category_first.gc_ca01_name">{{row.goods_category_first.gc_ca01_name}}</p>
                    <p v-if="row.goods_category_first.gc_ca02_name">{{row.goods_category_first.gc_ca02_name}}</p>
                    <p v-if="row.goods_category_first.gc_ca03_name">{{row.goods_category_first.gc_ca03_name}}</p>
                    <p v-if="row.goods_category_first.gc_ca04_name">{{row.goods_category_first.gc_ca04_name}}</p>
                </div>
            </b-col>
            <b-link :to="{name: 'adm_goods_edit', params: { gd_id:row.gd_id }}" class="col"><b-img :src="row.image_src_thumb[0]" rounded /></b-link>
            <b-link :to="{name: 'adm_goods_edit', params: { gd_id:row.gd_id }}" class="col"><span>{{row.gd_name}}</span></b-link>
            <b-col><span>{{row.mk_name}}</span></b-col>
            <b-col>
                <template v-if="mng_off[row.updated_id]">{{mng_off[row.updated_id].name}}</template>
                <template v-else>{{row.updated_id}}</template>
            </b-col>
            <b-col><span v-if="row.gd_enable=='Y'">활성</span><span v-else>비활성</span></b-col>
            <b-col><span>{{ row.updated_at | formatDate_YY_MM_DD_HH:mm }}</span></b-col>
        </b-row>

        <pagination :data="list" @pagination-change-page="routerPush" :limit="5" :showDisabled="true" align="center" class="mt-5">
            <span slot="prev-nav"><b-icon-chevron-left /></span>
	        <span slot="next-nav"><b-icon-chevron-right /></span>
        </pagination>
    </b-container>
</b-container>
</template>

<script>
import ax from '@/api/http';
import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';

export default {
    components: {
        'categorys': () =>      import('@/views/admin/shop/goods/_comp/Categorys.vue'),
        'sch-date': () =>       import('@/views/_common/SchDate.vue'),
        'loading-modal': () =>  import('@/views/_common/LoadingModal.vue'),
        Autocomplete,
    },
    data() {
        return {
            isLoadingModalViewed: false,
            list: {},
            sch_frm: {
                startDate:'',
                endDate:'',
                gd_mk_id:'',
                gd_enable:'',
                deleted_at:'',
                updated_id:'',
                ca01:0,
                ca02:0,
                ca03:0,
                ca04:0,
                gd_seq:'',
                sort: 'edit',
                mode:'gd_name',
                keyword:'',
                page:0
            },
            // categorys: {},
            makers: [],
            gd_enable: { 0:{value:'Y', name:'활성'}, 1:{value:'N', name:'비활성'} },
            deleted_at: { 0:{value:'Y', name:'삭제'}, 1:{value:'N', name:'존재'} },
            mng_off: [],
            field_switch: 'maker',
        }
    },
    methods: {
        numCalc(i) {
            return this.list.total - (this.list.current_page - 1) * this.list.per_page - i ;
        },
        async index(is_first) {
            try {
                if (this.sch_frm.startDate && this.sch_frm.endDate && this.sch_frm.startDate > this.sch_frm.endDate) {
                    Notify.modal('검색 시작일이 종료일보다 높을 수는 없습니다.', 'warning');
                    return false;
                }
                this.isLoadingModalViewed=true;
                let pa = { params: this.queryCheck()};
                if(is_first)
                    pa.params.is_first=is_first;
                const res = await ax.get(`/api/admin/shop/goods`, pa);
                if (res && res.status === 200) {
                    this.list = res.data.list;
                    if(res.data.mng_off) this.mng_off = res.data.mng_off;
                    if(res.data.makers) this.makers = res.data.makers;
                    this.isLoadingModalViewed=false;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        routerPush(p=1){
            this.sch_frm.page = p;
            
            this.$router.push({name: 'adm_goods_index', query: this.queryCheck() }).catch(()=>{});
        },
        typeToInt() {
            for (let i in this.sch_frm) {
                if ( ['ca01', 'ca02', 'ca03', 'ca04'].includes(i) )
                    this.sch_frm[i] = parseInt(this.sch_frm[i]);
            }
        },
        queryCheck() {
            this.typeToInt();
            let nfrm = {};
            for (let i in this.sch_frm) {
                if ( !isEmpty(this.sch_frm[i]) )
                    nfrm[i] = this.sch_frm[i];
            }
            return nfrm;
        },

        search(input) {
            if (input.length < 1) { return []; }
            if (this.field_switch == 'maker') {
                return this.makers.filter(mk => {
                    return mk.mk_name.toLowerCase().startsWith(input.toLowerCase());
                });
            } else if(this.field_switch == 'adm') {
                return Object.values(this.mng_off).filter(mng => {
                    return mng.name.toLowerCase().startsWith(input.toLowerCase());
                });
            }
        },
        handleSubmit(result) {
            if (this.field_switch == 'maker') this.sch_frm.gd_mk_id = result.mk_id;
            else if(this.field_switch == 'adm') this.sch_frm.updated_id = result.id;
        },
        getResultValue(result) {
            if (this.field_switch == 'maker') return result.mk_name; 
            else if(this.field_switch == 'adm') return result.name; 
        },

        field_chk(v) {
            if (v.target.value == '') {
                if (this.field_switch == 'maker') this.sch_frm.gd_mk_id = '';
                else if(this.field_switch == 'adm') this.sch_frm.updated_id = '';
            }
        }
    },
    async mounted() {
        this.sch_frm = Object.assign( {}, this.sch_frm, this.$route.query );
        this.index(true);
    },
    beforeRouteUpdate (to, from, next) {
        this.sch_frm = Object.assign( {}, this.sch_frm, to.query );
        this.index();
        next();
    },
}
</script>

<style lang="css" scoped>
.p_wrap .frm_sch .row .label + .type01 { flex: 0 0 13%; max-width: 13%; }
.p_wrap .frm_sch .row .col >>> .autocomplete { width:100%; border:0; min-width:auto; }
.p_wrap .frm_sch .row .col >>> .autocomplete .autocomplete-input { background:none; border-color:#ced4da; border-radius:0.25rem; }
.p_wrap .frm_sch .row .col >>> .autocomplete .autocomplete-result-list li { background-image:none; }
.p_wrap .frm_sch .sch_input select { width:6.579em; }
.cmain { position:relative; min-height:30rem; }
.cmain .row .ctrl { color:#0171BB; font-size:.9rem; font-weight:600; }
.cmain .row .ctrl .btn { background-color:#0171BB; padding:.2rem .5rem; font-size:.9rem; }
.cmain .list .col:nth-child(1) { flex:0 0 9%; max-width:9%; }
.cmain .list .col:nth-child(2) { flex:0 0 13%; max-width:13%; justify-content:flex-start; }
.cmain .list .col:nth-child(3) { flex:0 0 8%; max-width:8%; }
.cmain .list .col:nth-child(4) { justify-content:flex-start; }
.cmain .list .col:nth-child(5) { flex:0 0 10%; max-width:10%; }
.cmain .list .col:nth-child(6) { flex:0 0 7.5%; max-width:7.5%; }
.cmain .list .col:nth-child(7) { flex:0 0 7%; max-width:7%; }
.cmain .list .col:nth-child(8) { flex:0 0 11%; max-width:11%; }

.cmain .list .col { border-right:1px solid #CCCCCC; }
.cmain .list .col:last-child,
.cmain .list .col:nth-child(3) { border-width:0; }
.cmain .list .col:nth-child(3) img { max-width:80px; width:100%; height:80px; object-fit:cover; }

.cmain .body .col { padding:.65rem; display:flex; justify-content:center; align-items:center; } 
.cmain .body .col:nth-child(2) { padding:0; }
.cmain .body .col:nth-child(2) div { text-align:left; margin-left:4%; }
.cmain .body .col:nth-child(2) div p { margin:0; line-height:1.5; font-size:.9rem; }
.cmain .body .col:nth-child(4) { text-align:left; }
.cmain .body.disable { background-color:#E1E1E1; }
.cmain .body.disable .col { color:#9C9C9C; }

@media (max-width: 992px){
    .p_wrap { margin: auto; }
    .cmain { overflow-x: auto; } 
    .cmain .list { width:900px; }
    .cmain .body .col { padding:0; }
    .cmain .list .col:nth-child(1),
    .cmain .list .col:nth-child(3) { display:none; }
    .cmain .list .col:nth-child(4) { padding:.3rem; }
    .cmain .list .col:nth-child(6) { flex:0 0 7.5%; max-width:7.5%; }
    .cmain .list .col:nth-child(7) { flex:0 0 7%; max-width:7%; }
    .cmain .list .col:nth-child(8) { flex:0 0 11%; max-width:11%; }

}
/* 
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
*/
</style>
