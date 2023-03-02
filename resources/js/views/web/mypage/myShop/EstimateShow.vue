<template>
<b-container class="w_fence">
    <h3>견적서 조회</h3>
    <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
        Loading ......
    </LoadingModal>
    <div v-else>
        <h5>
            <b>{{estimate.created_at}}</b> &nbsp;
            견적 요청 번호 {{estimate.eq_id}} &nbsp;
            진행상황 <EstimateStep v-model="estimate.eq_step" />
        </h5>

        <b-container class="goods">
            <b-row v-for="em in estimate.estimate_model" :key="em.em_id">
                <b-col cols="2"><img :src="em.goods.image_src_thumb[0]" class="rounded-circle" /></b-col>
                <b-col>
                    <b-link variant="outline-secondary" block :to="{name: 'goods_show', params:{gd_id:em.em_gd_id} }">
                        {{em.em_name}}
                        <P class="bg-light">
                            {{em.em_catno}} /
                            {{em.em_code}} /
                            {{em.em_spec}} /
                            {{em.em_unit}} /
                        </P>
                    </b-link>
                </b-col>
                <b-col>
                    {{em.em_price | rrp}} 원
                    <font-awesome-icon icon="times" />
                    {{ em.em_ea }} 개
                    <font-awesome-icon icon="equals" />
                    <b class="md_multi">{{em.em_price*em.em_ea | rrp}} 원</b>
                </b-col>
                <b-col v-if="em.estimate_option.length" cols="12" class="row m-3 p-0">
                    <b-col offset="5" cols="1" class="text-right">
                        <b-badge variant="warning" class="float-left clear-both">옵션</b-badge>
                    </b-col>
                    <b-col>
                        <b-row v-for="option in em.estimate_option" :key="option.eo_id" class="text-right">
                            <b-col>
                                <span>{{option.eo_tit}}: <b>{{option.eo_name}}</b></span>
                            </b-col>
                            <b-col>
                                {{option.eo_price | rrp}} 원
                                <font-awesome-icon icon="times" />
                                {{ option.eo_ea }} 개
                                <font-awesome-icon icon="equals" />
                                <b class="md_multi">{{option.eo_price*option.eo_ea | rrp}} 원</b>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-col>
            </b-row>
        </b-container>

        <b-container class="detail">
            <b-row>
                <b-col>
                    <b-row>
                        <b-col cols="2">요청자 :</b-col>
                        <b-col>{{estimate.eq_name}}</b-col>
                        <b-col cols="2">휴대폰번호 :</b-col>
                        <b-col>{{estimate.eq_hp}}</b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="2">전화번호 :</b-col>
                        <b-col>{{estimate.eq_tel}}</b-col>
                        <b-col cols="2">팩스번호 :</b-col>
                        <b-col>{{estimate.eq_fax}}</b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="2">이메일주소 :</b-col>
                        <b-col>{{estimate.eq_email}}</b-col>
                        <b-col cols="2">학과/소속 :</b-col>
                        <b-col>{{estimate.eq_department}}</b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="2">요청내용 :</b-col>
                        <b-col>{{estimate.eq_content}}</b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>


        <b-alert show variant="success" class="estimate_reply" v-if="estimate.estimate_reply.length">
            <h4 class="alert-heading">견적서</h4>
            <hr>
            <p v-for="(er, i) in estimate.estimate_reply" :key="i">
                <b-button variant="success" :to="{ name: 'my_estimate_show_reply', params: {er_id: er.er_id} }">
                    <b v-if="i!==0">재</b>견적서 보기 ({{er.created_at | formatDate_YY_MM_DD}})
                </b-button>
            </p>
        </b-alert>
    </div>
</b-container>
</template>

<script>
import ax from '@/api/http';

export default {
    name: "MyOrder",
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

.container .goods>.row { border-bottom:1px solid #DDD; margin-bottom:1rem; padding-bottom:1rem;  }
.container .goods>.row>div img { width:100px; height:100px; object-fit:cover; }
.container .goods>.row>div:nth-child(2) .btn { text-align:left; }
.container .goods>.row>div:nth-child(3) { text-align:right; }
.container .goods>.row>div:nth-child(3) .md_multi { display:inline-block; min-width:120px; }

.container .price .row div { text-align:right; }
.container .price .row div b { display:inline-block; min-width:200px; }

.container .container { margin-bottom:2rem; }
</style>
