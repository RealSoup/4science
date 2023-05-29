<template>
<b-container class="p_wrap">
    <h3 class="p_tit">영문교정 요청</h3>

    <b-container class="frm_sch">
        <SchDate v-model="sch_frm">
            <b-col slot="prev" class="label top_left">등록일</b-col>
        </SchDate>
        <b-row>

            <b-col class="label">진행현황</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.er_step">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="opt in er_step" :value="opt.value" :key="opt.value">{{ opt.name }}</b-form-select-option>
                </b-form-select>
            </b-col>

            <b-col class="label">검색</b-col>
            <b-col>
                <b-input-group>
                    <b-input-group-prepend>
                        <b-form-select v-model="sch_frm.mode">
                            <b-form-select-option value=""></b-form-select-option>
                            <b-form-select-option v-for="opt in mode" :value="opt.value" :key="opt.value">{{ opt.name }}</b-form-select-option>
                        </b-form-select>
                    </b-input-group-prepend>

                    <b-form-input v-model="sch_frm.keyword" placeholder="Please enter a keyword" @keyup.enter="routerPush"></b-form-input>

                    <b-input-group-append>
                        <b-button @click="routerPush"><b-icon-search /></b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </b-container>

    <b-container class="cmain">
        <b-row>
            <b-col sm="12" md="6">Total : <b-badge variant="info">{{this.list.total | comma}}</b-badge></b-col>
        </b-row>
                    
        <b-row class="head list">
            <b-col>No.</b-col>
            <b-col>등록일</b-col>
            <b-col>서비스유형</b-col>
            <b-col>요청자</b-col>
            <b-col>소속</b-col>
            <b-col>연락처</b-col>
            <b-col>이메일</b-col>
            <b-col>납기일</b-col>
            <b-col>진행현황</b-col>
            <b-col>담당자</b-col>
            <b-col>Ctrl</b-col>
        </b-row>

        <b-row class="body list" v-for="er in list.data" :key="er.er_id">
            <b-col>{{er.er_id}}</b-col>
            <b-col>{{er.created_at | formatDate_YYYY_MM_DD}}</b-col>
            <b-col>{{er.er_type | er_type}}</b-col>
            <b-col>
                <b-button :to="{name: 'adm_user_edit', params: { id:er.user.id}}" class="teal sm">{{er.er_name}}</b-button>
            </b-col>
            <b-col>{{er.er_company}}</b-col>
            <b-col>{{er.er_hp}}</b-col>
            <b-col>{{er.er_email}}</b-col>
            <b-col>{{er.er_dlvy_at | formatDate_YY_MM_DD}}</b-col>
            <b-col class="er_step">
                <b-badge class="mint" v-if="er.er_step == 'ING'">{{ er.er_step | er_step }}</b-badge>
                <b-badge class="d_gray" v-else-if="er.er_step == 'CPLT'">{{ er.er_step | er_step }}</b-badge>
                <b-badge class="white" v-else-if="er.er_step == 'NOT'">{{ er.er_step | er_step }}</b-badge>
                <b-badge class="plum" v-else-if="er.er_step == 'CXL'">{{ er.er_step | er_step }}</b-badge>
            </b-col>
            <b-col>
                <template v-if="mng_off[er.updated_id]">{{mng_off[er.updated_id].name}}</template>
                <template v-else>{{er.updated_id}}</template>
            </b-col>
            <b-col>
                <b-button :to="{name: 'adm_eng_reform_edit', params: { er_id:er.er_id }}" class="d_blue sm">보기</b-button>
            </b-col>
        </b-row>
        <pagination :data="list" @pagination-change-page="pageSet" :limit="5" :showDisabled="true" align="center" class="mt-5">
            <span slot="prev-nav"><b-icon-chevron-left /></span>
	        <span slot="next-nav"><b-icon-chevron-right /></span>
        </pagination>
    </b-container>
</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    components: {
        'SchDate': () => import('@/views/_common/SchDate.vue'),
    },
    data() {
        return {
            list: {},
            sch_frm: {
                startDate:'',
                endDate:'',
                er_step:'',
                mode:'er_name',
                keyword:'',
                page:0
            },
            mng_off: {},
            er_step: { 
                0:{value:'ING',  name:'처리중'},
                1:{value:'CPLT', name:'완료'},
                2:{value:'NOT',  name:'미처리'},
                3:{value:'CXL',  name:'취소'},
            },
            mode: { 
                0:{value:'er_name',   name:'요청자명'},
                1:{value:'er_demand', name:'요청사항'},
                2:{value:'er_email',  name:'Email'},
                3:{value:'er_hp',     name:'핸드폰'},
            },
        }
    },
    filters: {
        er_type (v) {
            var rst = '';
            switch (v) {
                case '1': rst = '일반'; break;
                case '2': rst = '프리미엄'; break;
                case '3': rst = '프리미엄 플러스'; break;
            }
            return rst;
        },
        er_step (v) {
            var rst = '';
            switch (v) {
                case 'ING':  rst= '처리중'; break;
                case 'CPLT': rst= '처리완료'; break;
                case 'NOT':  rst= '미처리'; break;
                case 'CXL':  rst= '취소'; break;
            }
            return rst;
        },
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
                const res = await ax.get(`/api/admin/engReform`, { params: this.sch_frm});
                if (res && res.status === 200) {
                    this.list = res.data.list;
                    this.mng_off = res.data.mng_off;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        routerPush(){
            this.$router.push({name: 'adm_eng_reform_index', query: this.sch_frm }).catch(()=>{});
        },
        pageSet(p){
            this.sch_frm.page = p;
            this.routerPush();
        },
    },
    mounted() {
        this.sch_frm = Object.assign( {}, this.sch_frm, this.$route.query );
        this.index();
    },
    beforeRouteUpdate (to, from, next) {
        this.sch_frm = Object.assign( {}, this.sch_frm, to.query );
        this.index();
        next();
    },
}
</script>

<style lang="css" scoped>
.cmain .list .col:nth-child(1) { flex:0 0 5%; max-width:5%; }
.cmain .list .col:nth-child(2) { flex:0 0 7%; max-width:7%; }
.cmain .list .col:nth-child(4) { flex:0 0 6%; max-width:6%; }
.cmain .list .col:nth-child(8) { flex:0 0 6%; max-width:6%; }
.cmain .list .col:nth-child(9) { flex:0 0 6%; max-width:6%; }
.cmain .list .col:nth-child(10) { flex:0 0 5%; max-width:5%; }
.cmain .list .col:nth-child(11) { flex:0 0 5%; max-width:5%; }
.cmain .list .er_step span { width:70px; display:inline-block; font-size:.9rem; padding:.25rem 0; line-height:1rem; border-radius:.3rem; border-width:1px; border-style:solid; }
</style>
