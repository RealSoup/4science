<template>
<b-container class="w_fence">
    <h3>견적서 조회 <b>Q-{{estimate.eq_id}}</b></h3>
    <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
        Loading ......
    </LoadingModal>
    <div v-else>
        <div class="top">
            <span v-if="estimate.eq_step == 'DONOT' || estimate.eq_step == 'DOING'">담당자가 견적 요청을 확인 중 입니다.</span>
            <span v-if="estimate.eq_step == 'DONE'">견적이 완료 되었습니다.</span>
            <span v-if="estimate.eq_step == 'CANCEL'">견적 요청이 취소 되었습니다.</span>

        
            <div>
                <b-button v-for="(er, i) in estimate.estimate_reply" :key="i"
                    :to="{ name: 'my_estimate_show_reply', params: {er_id: er.er_id} }" 
                    :class="{
                        mint:i==Object.keys(estimate.estimate_reply).length-1,
                        white:i!=Object.keys(estimate.estimate_reply).length-1,
                    }"
                >
                    <template v-if="i!==0">재</template>견적서 보기 
                    <br>
                    <small>{{er.created_at | formatDate_YYYY_MM_DD}}</small>
                </b-button>
            </div>
        </div>
        <b-container class="goods">
            <h6><b>01.</b> 상품정보</h6>
            <b-row class="head">
                <b-col></b-col>
                <b-col>상품명/모델명</b-col>
                <b-col>판매가격</b-col>
                <b-col>수량</b-col>
                <b-col>합계</b-col>
            </b-row>
            <b-row v-for="em in estimate.estimate_model" :key="em.em_id" class="body">
                <b-col class="img">
                    <b-link block :to="{name: 'goods_show', params:{gd_id:em.em_gd_id} }" class="align">
                        <img :src="em.goods.image_src_thumb[0]" />
                    </b-link>
                </b-col>
                <b-col class="name">
                    <b-link block :to="{name: 'goods_show', params:{gd_id:em.em_gd_id} }">
                        <b>{{em.em_name}}</b>
                        <br>
                        {{em.em_code}} / 사양: {{em.em_spec}}
                    </b-link>
                </b-col>
                <b-col class="align">{{em.em_price | rrp | price_zero | won}}</b-col>
                <b-col class="align">{{em.em_ea}}</b-col>
                <b-col class="align" tab="b">{{em.em_price*em.em_ea | rrp | price_zero | won}}</b-col>
                <b-col class="option" v-for="op in em.estimate_option" :key="op.eo_id">
                    <b-col>추가 옵션</b-col>
                    <b-col><b>{{op.eo_tit}}:</b> {{op.eo_name}}</b-col>
                    <b-col>{{op.eo_price | rrp | won}}</b-col>
                    <b-col>{{op.eo_ea}}</b-col>
                    <b-col>{{op.eo_price*op.eo_ea | rrp | won}}</b-col>
                </b-col>
            </b-row>
        </b-container>

        <ul class="guidance">
            <li>요청하신 견적서는 <b>이메일로 발송</b>됩니다.</li>
            <li>견적서를 받으신 후, <b>견적 유효기간</b>을 참고하셔서 주문에 불편이 없으시길 바랍니다.</li>
        </ul>

        <b-container class="extra">
            <h6><b>02.</b> 추가정보</h6>
            <b-row>
                <b-col>
                    <div class="tit">첨부파일</div>
                    <ul class="cont">
                        <li v-for="fi in estimate.file_info" :key="fi.fi_id" @click="fileDown(fi.down_path, fi.fi_original)"><b-icon-paperclip /> {{fi.fi_original}}</li>
                    </ul>
                </b-col>
                <b-col>
                    <div class="tit">요청사항</div>
                    <div class="cont" v-html="nl2br(estimate.eq_content)" />
                </b-col>
            </b-row>
        </b-container>

        <div class="btn_box"><b-button class="blue xl" :to="{name: 'my_estimate'}">견적요청 목로으로 가기</b-button></div>
    </div>
</b-container>
</template>

<script>
import ax from '@/api/http';

export default {
    name: "MyShopEstimateShow",
    components: {
        'LoadingModal': () =>   import('@/views/_common/LoadingModal.vue'),
        'EstimateStep': () => import('../_comp/EstimateStep.vue'),
    },
    data() {
        return {
            isLoadingModalViewed: true,
            estimate:{},
        }
    },
    methods:{
        async show(){
            try {
                const res = await ax.get(`/api/shop/estimate/${this.$route.params.eq_id}`);
                if (res && res.status === 200) {
                    this.estimate = res.data;
                    this.isLoadingModalViewed= false;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    mounted() {
        this.show();
    },

}
</script>

<style lang="css" scoped>
.container,
.container .row .col{ padding-left:0; padding-right:0; }
.container .row { margin:0; }
h3 { font-size:1.5rem; padding-left:.8rem; }
h3 b { color:#0094E9; font-size:1.25rem; }
.top { border-top:2px solid #363636; border-bottom:1px solid #B6B6B6; border-right:1px solid #B6B6B6; border-left:1px solid #B6B6B6; padding:0 2rem; line-height:4; font-weight:800; }
.top div { float:right; }
.top div .btn { line-height:1.1; font-weight:900; margin-left:.5rem; border-color:#000; }
.top div .btn small { font-weight:600; font-size:85%; }
.container h6 { font-size:1.1rem; margin-top:1.8rem; font-weight:600; padding-left:.5rem; }
.container h6 b { color:#0094E9; }
.goods .head { border-top:1px solid #ACACAC; border-bottom:1px solid #ACACAC; background-color:#ECECEC; }
.goods .head .col { font-weight:900; line-height:1.7; padding:.86rem 0; font-size:.9rem; }

.goods .row .col { text-align:center; padding-top:.4rem; padding-bottom:.4rem; }
.goods .row .align { display:flex; align-items:center; justify-content:center; }
.goods .row .col:nth-child(1) { flex:0 0 143px; max-width:143px; padding-left:3%; }
.goods .row .col:nth-child(2) { display:flex; align-items:center; text-align:left; padding-left:3%; }
.goods .row .col:nth-child(3) { flex:0 0 13%; max-width:13%; }
.goods .row .col:nth-child(4) { flex:0 0 10%; max-width:10%; }
.goods .row .col:nth-child(5) { flex:0 0 14%; max-width:14%; font-weight:900; color:#000; }
.goods .body .col { color:#959595; }
.goods .body .img a { border:1px solid #B0B0B0; min-height:105px; }
.goods .body .img a img { width:100%; }
.goods .body .name a { color:#959595; font-size:.9rem; }
.goods .body .name a b { color:#000; font-size:1rem; }
.goods .body .option { flex:0 0 100%; max-width:100%; display:flex; }

.guidance { margin-top:2rem; border-top:2px solid #363636; background-color:#F2F3F5; padding:1rem 4rem; font-size:.9rem; color:#888; }
.guidance li  { list-style:decimal; }
.guidance li b { color:#000; }

.extra .row { border-top:2px solid #363636; }
.extra .row .col { padding-left:15px; padding-right:15px; }
.extra .row .col .tit { font-weight:600; padding:.9rem 0.8rem 0.4rem 1.5rem; }
.extra .row .col .cont { border:1px solid #D6D6D6; padding:1rem 1.1rem; min-height: 10rem; }
.extra .row .col .cont li { cursor: pointer; }
</style>
