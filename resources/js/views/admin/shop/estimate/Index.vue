<template>
<div id="adm_estimate_show" class="p_wrap">
    <h3 class="p_tit">견적 목록</h3>
    <b-container class="frm_sch">
        <sch-date v-model="sch_frm">
            <b-col slot="prev" class="label top_left">기간</b-col>
            <b-col slot="prev" class="date_type">
                <b-form-select v-model="sch_frm.date_type">
                    <b-form-select-option value="reque">요청일</b-form-select-option>
                    <b-form-select-option value="reply">응답일</b-form-select-option>
                </b-form-select>
            </b-col>
        </sch-date>
        <b-row>
            <b-col class="label">요청/임의</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.eq_type">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option value="REQ">요청견적</b-form-select-option>
                    <b-form-select-option value="TEMP">임의견적</b-form-select-option>
                </b-form-select>
            </b-col>

            <b-col class="label">진행현황</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.eq_step">
                    <b-form-select-option value="">처리단계</b-form-select-option>
                    <b-form-select-option value="DONOT">미처리</b-form-select-option>
                    <b-form-select-option value="DOING">처리중</b-form-select-option>
                    <b-form-select-option value="DONE">처리완료</b-form-select-option>
                    <b-form-select-option value="CANCEL">취소</b-form-select-option>
                </b-form-select>
            </b-col>
            <b-col class="label">요청기기</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.eq_env">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option value="P">PC</b-form-select-option>
                    <b-form-select-option value="M">MOBILE</b-form-select-option>
                    <b-form-select-option value="A">APP</b-form-select-option>
                </b-form-select>
            </b-col>
            <b-col class="label">견적금액</b-col>
            <b-col class="period">
                <b-form-input v-model="sch_frm.startPrice" :formatter="price_comma" size="sm" @keyup.enter="routerPush(1)" />
                <b>~</b>
                <b-form-input v-model="sch_frm.endPrice" :formatter="price_comma" size="sm" @keyup.enter="routerPush(1)" />
            </b-col>
        </b-row>

        <b-row>
            <b-col class="label bottom_left">담당자</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.eq_mng">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="(m, k) in mng_on" :value="m.id" :key="k">{{m.name}}</b-form-select-option>
                </b-form-select>
            </b-col>
            <b-col class="label">팀검색</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.mng_group">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="(v, key) in mng_info.group" :value="key" :key="key">{{v}}</b-form-select-option>
                </b-form-select>
            </b-col>
            <b-col class="label">검색</b-col>
            <b-col class="sch_input">
                <b-input-group>
                    <b-input-group-prepend>
                        <b-form-select v-model="sch_frm.keyword_type">
                            <b-form-select-option value="eq_name">요청자명</b-form-select-option>
                            <b-form-select-option value="eq_company">직장/학교</b-form-select-option>
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

                    <b-form-input v-model="sch_frm.keyword" placeholder="검색어를 입력하세요" @keyup.enter="routerPush(1)"></b-form-input>

                    <b-input-group-append>
                        <b-button @click="routerPush(1)"><b-icon-search></b-icon-search></b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </b-container>
    
    <b-container class="cmain">
        <b-row class="list_top m_hide">
            <b-col sm="12" md="6">Total : {{this.list.total}}</b-col>
            <b-col sm="12" md="6" class="text-right">
                <b-form-select v-model="sch_frm.list_size" size="sm">
                    <b-form-select-option value="20">20개</b-form-select-option>
                    <b-form-select-option value="50">50개</b-form-select-option>
                    <b-form-select-option value="100">100개</b-form-select-option>
                </b-form-select>
                <b-button @click="exeWinPop(`/admin/shop/estimate/create`)" class="white sm">임의견적</b-button>
            </b-col>
        </b-row>
        <list v-if="list.data && list.data.length" @exe-win-pop="exeWinPop" :list="list.data" :mng_off="mng_off"></list>
        <pagination :data="list" @pagination-change-page="routerPush" :limit="5" :showDisabled="true" align="center" class="mt-5">
            <span slot="prev-nav"><b-icon-chevron-left></b-icon-chevron-left></span>
	        <span slot="next-nav"><b-icon-chevron-right></b-icon-chevron-right></span>
        </pagination>
    </b-container>

    <win-pop-up ref="winPopup" @onClose="val=>evtCloseWinPopup(val)" @onRecvEvtFromWinPop="val=>onRecvWinPop(val)"></win-pop-up>
    <!-- <button type="button" @click="openWinPop">윈 팝업 띄우기</button>
    <button type="button" @click="sendToChild">윈 팝업으로 전송</button> -->
</div>
</template>

<script>
import ax from '@/api/http';
import { mapState } from 'vuex';
export default {
    components: {
        'sch-date': () =>   import('@/views/_common/SchDate'),
        'list': () =>       import('@/views/admin/shop/estimate/_comp/List'),
        'win-pop-up': () => import('@/views/_common/WinPopUp'),
    },
    data() {
        return {
            list: {},
            mng_on:{},
            mng_off:{},
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
                eq_env:'',
                mng_group:'',
                keyword_type:'eq_name',
                keyword:'',
                page:0,
                list_size:20,
            },
        }
    },
    watch: {
		'sch_frm.list_size': {
			handler() {
				this.index();
			}
		}
	},
    methods: {
        routerPush(p=1){
            this.sch_frm.page = p;
            this.$router.push({name: 'adm_estimate_index', query: this.sch_frm }).catch(()=>{});
        },
        async index() {
            try {
                if (this.sch_frm.startDate && this.sch_frm.endDate && this.sch_frm.startDate > this.sch_frm.endDate) {
                    Notify.modal('검색 시작일이 종료일보다 높을 수는 없습니다.', 'warning');
                    return false;
                }
                const res = await ax.get(`/api/admin/shop/estimate`, { params: this.sch_frm});
                if (res && res.status === 200) {
                    this.list = res.data.list;
                    this.mng_on = res.data.mng_on;
                    this.mng_off = res.data.mng_off;
                    this.mng_info = res.data.mng_info;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        price_comma(e) { return this.priceComma(e); },

        




        ////////////////////////////////
        // evtCloseWinPopup( ){
        //     console.log( "evtCloseWinPopup () ========  ");
        // },
        
        exeWinPop(url){
            this.$refs.winPopup.exeWinPop( url, 1300, 900 );
        }, 
        
        onRecvWinPop( recvObj ){
            console.log( "onRecvWinPop  ---------" );
            if(recvObj == 'reread') this.index();
        },

        // sendToChild(){ this.$refs.winPopup.sendEvtToChild( { msg : 'abcde' } ); },
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
.cmain .list_top select { display: inline-block; max-width: 7rem; }
.p_wrap .frm_sch .date_type { flex:0 0 8%; max-width:8%; }
.p_wrap .frm_sch .sch_input { flex:0 0 51%; max-width:51%; }
.p_wrap .frm_sch .sch_input select { width:6.579em; }
@media (max-width: 992px) {
    .cmain { margin-bottom:3rem; }
    .p_wrap .frm_sch .date_type { flex:0 0 20%; max-width:20%; }    
    .p_wrap .frm_sch >>> .row .period { flex: 0 0 50%; max-width: 50%; }
    .p_wrap .frm_sch .sch_input { flex:0 0 70%; max-width:70%; }
}
</style>