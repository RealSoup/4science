<template>
    <div class="p_warp">
        <h3 class="p_tit">견적 목록</h3>
        <b-card class="search adform">
            <b-container fluid>

                <SchDate v-model="sch_frm">
                    <b-col slot="prev" class="label">
                        <b-form-select size="sm" v-model="sch_frm.date_type">
                            <b-form-select-option value="reque">요청일</b-form-select-option>
                            <b-form-select-option value="reply">응답일</b-form-select-option>
                        </b-form-select>
                    </b-col>
                </SchDate>

                <b-row>
                    <b-col class="label">요청/임의</b-col>
                    <b-col class="type01">
                        <b-form-select size="sm" v-model="sch_frm.eq_type">
                            <b-form-select-option value=""></b-form-select-option>
                            <b-form-select-option value="REQ">요청견적</b-form-select-option>
                            <b-form-select-option value="TEMP">임의견적</b-form-select-option>
                        </b-form-select>
                    </b-col>

                    <b-col class="label">처리단계</b-col>
                    <b-col class="type01">
                        <b-form-select size="sm" v-model="sch_frm.eq_step">
                            <b-form-select-option value="">처리단계</b-form-select-option>
                            <b-form-select-option value="DONOT">미처리</b-form-select-option>
                            <b-form-select-option value="DOING">처리중</b-form-select-option>
                            <b-form-select-option value="DONE">처리완료</b-form-select-option>
                            <b-form-select-option value="CANCEL">취소</b-form-select-option>
                        </b-form-select>
                    </b-col>
                    <b-col class="label">견적금액</b-col>
                    <b-col class="type03 period">
                        <b-form-input v-model="sch_frm.startPrice" :formatter="priceComma" size="sm" />
                        <b>~</b>
                        <b-form-input v-model="sch_frm.endPrice" :formatter="priceComma" size="sm" />
                    </b-col>
                    
                    <b-col class="label">팀검색</b-col>
                    <b-col class="type01">
                        <b-form-select size="sm" v-model="sch_frm.mng_group">
                            <b-form-select-option value=""></b-form-select-option>
                            <b-form-select-option v-for="(v, key) in mng_info.group" :value="key" :key="key">{{v}}</b-form-select-option>
                        </b-form-select>
                    </b-col>
                    
                    <b-col class="label">담당자</b-col>
                    <b-col class="type01">
                        <b-form-select size="sm" v-model="sch_frm.eq_mng">
                            <b-form-select-option value=""></b-form-select-option>
                            <b-form-select-option v-for="(m, k) in mng" :value="m.id" :key="k">{{m.name}}</b-form-select-option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <b-row align-h="end">
                    <b-col class="label">검색</b-col>
                    <b-col class="type05">
                        <b-input-group size="sm">
                            <b-input-group-prepend>
                                <b-form-select v-model="sch_frm.keyword_type" size="sm">
                                    <b-form-select-option value="eq_name">요청자명</b-form-select-option>
                                    <b-form-select-option value="eq_department">소속</b-form-select-option>
                                    <b-form-select-option value="eq_tel">전화번호</b-form-select-option>
                                    <b-form-select-option value="eq_hp">휴대폰</b-form-select-option>
                                    <b-form-select-option value="eq_email">이메일</b-form-select-option>
                                    <b-form-select-option value="eq_id">요청번호</b-form-select-option>
                                    <b-form-select-option value="er_id">견적번호</b-form-select-option>
                                    <b-form-select-option value="em_name">제품명</b-form-select-option>
                                    <b-form-select-option value="em_code">모델명</b-form-select-option>
                                    <b-form-select-option value="cat_no">Cat.No</b-form-select-option>
                                </b-form-select>
                            </b-input-group-prepend>

                            <b-form-input v-model="sch_frm.keyword" placeholder="Please enter a keyword" @keyup.enter="index" />

                            <b-input-group-append>
                                <b-button @click="index"><b-icon-search /></b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card class="shadow em_list">
            <b-container fluid>

                <b-row>
                    <b-col sm="12" md="6">total : {{this.list.total}}</b-col>
                    <b-col sm="12" md="6" class="text-right">
                        <router-link :to="{name: 'adm_estimate_create'}">
                            <b-button variant="primary" size="sm">임의견적</b-button>
                        </router-link>
                    </b-col>
                </b-row>

                <hr />

                <List v-if="list.data && list.data.length" :list="list.data" />            
            
            </b-container>

            <pagination :data="list" @pagination-change-page="setPage" align="center" class="mt-5"></pagination>
        </b-card>
    </div>
</template>

<script>
import ax from '@/api/http';
import { mapState } from 'vuex';
export default {
    components: {
        'SchDate': () => import('@/views/admin/_module/SchDate.vue'),
        'List': () => import('./_comp/List.vue'),
    },
    data() {
        return {
            list: {},
            mng: {},
            mng_info: {},
            sch_frm: {
                date_type:'reque',
                startDate:'',
                endDate:'',
                startPrice:'',
                endPrice: '',
                eq_type:'',
                eq_step:'',
                eq_mng:'',
                mng_group:'',
                keyword_type:'eq_name',
                keyword:'',
                page:0
            },
        }
    },
    methods: {
        async index() {
            try {
                if (this.sch_frm.startDate && this.sch_frm.endDate && this.sch_frm.startDate > this.sch_frm.endDate) {
                    Notify.modal('검색 시작일이 종료일보다 높을 수는 없습니다.');
                    return false;
                }
                const res = await ax.get(`/api/admin/shop/estimate/`, { params: this.sch_frm});
                if (res && res.status === 200) {
                    this.list = res.data.list;
                    this.mng = res.data.mng;
                    this.mng_info = res.data.mng_info;
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


    filters: {
        eqStep: function (str) {
            var rst = '';
            switch (str) {
                case 'DONOT':  rst = '미처리'; break;
                case 'DOING':  rst = '처리중'; break;
                case 'DONE':   rst = '완료'; break;
                case 'CANCEL': rst = '취소'; break;
            }
            return rst;
        }
    }
}
</script>

<style lang="css" scoped>

</style>