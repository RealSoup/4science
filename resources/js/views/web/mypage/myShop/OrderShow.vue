<template lang="html">
    <div class="order_show">
        <div class="pTitle">
            <span><i>주</i></span>
            <span><i>문</i></span>
            <span class="d-md-none d-inline-block"><i>/</i></span>
            <div class="break d-md-block d-none"></div>
            <span><i>배</i></span>
            <span><i>송</i></span>
            <span><i>조</i></span>
            <span><i>회</i></span>
            <div class="break"></div>
            <span><i></i></span>
        </div>
        <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
            Loading ......
        </LoadingModal>
        <div v-else>
            <h5>
                <b>{{order.created_at}}</b>
                &nbsp;
                주문번호 {{order.od_id}}
                &nbsp;
                <OrderStep v-model="order.od_step" />
            </h5>




            <b-container class="goods">
                <b-row v-for="odg in order.order_goods" :key="odg.odg_id">
                    <b-col cols="2"><img :src="odg.goods.image_src_thumb[0]" class="rounded-circle" /></b-col>
                    <b-col>
                        <b-row v-for="odm in odg.order_model" :key="odm.odm_id">
                            <b-col>
                                <b-button variant="outline-secondary" block :to="{name: 'goods_show', params:{gd_id:odg.odg_gd_id} }">
                                    {{odg.odg_gd_name}}
                                    <P class="bg-light">
                                        {{odm.odm_gm_name}} /
                                        {{odm.odm_gm_catno}} /
                                        {{odm.odm_gm_code}} /
                                        {{odm.odm_gm_spec}} /
                                        {{odm.odm_gm_unit}} /
                                    </P>
                                </b-button>
                            </b-col>
                            <b-col>
                                {{odm.odm_price | comma}} 원
                                <font-awesome-icon icon="times" />
                                <!-- <b-form-input v-model="text" placeholder="Enter your name"></b-form-input> -->
                                {{odm.odm_ea | comma}} 개
                                <font-awesome-icon icon="equals" />
                                <b class="md_multi">{{odm.odm_price*odm.odm_ea | comma}} 원</b>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="1">
                        <b-button v-if="!!odg.odg_invoice_num" variant="info">조회</b-button>
                        <b-badge v-else variant="light">준비중</b-badge>
                        <br />
                        <b-button 
                            v-if="!!odg.odg_delivery_date && !odg.odg_receive_date" variant="dark"
                            @click="receiptConfirm(odg)"
                        >
                            수취확인
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>

            <b-container class="price">
                <b-row>
                    <b-col cols="12">
                        총합 : <b>{{order.od_gd_price | comma}} 원</b>
                    </b-col>
                    <b-col cols="12">
                        부가세 : <b>{{order.od_surtax | comma}} 원</b>
                    </b-col>
                    <b-col cols="12">
                        배송료 : <b>{{order.od_dlvy_price | comma}} 원</b>
                    </b-col>
                    <b-col cols="12">
                        최종 결제 금액 : <b>{{order.od_all_price | comma}} 원</b>
                    </b-col>
                </b-row>
            </b-container>

            <b-container class="orderer">
                <b-row>
                    <b-col>
                        <p>주문정보</p>
                        <b-row>
                            <b-col cols="3">이름 :</b-col>
                            <b-col>{{order.od_name}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">소속 :</b-col>
                            <b-col>{{order.od_department}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">이메일주소 :</b-col>
                            <b-col>{{order.od_orderer_email}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">전화번호 :</b-col>
                            <b-col>{{order.od_orderer_tel}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">팩스번호 :</b-col>
                            <b-col>{{order.od_orderer_tax}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">휴대폰번호 :</b-col>
                            <b-col>{{order.od_orderer_hp}}</b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <p>배송정보</p>
                        <b-row>
                            <b-col cols="3">수령인 :</b-col>
                            <b-col>{{order.od_receiver}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">주소 :</b-col>
                            <b-col>{{order.od_addr1}} {{order.od_addr2}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">휴대폰번호 :</b-col>
                            <b-col>{{order.od_receiver_hp}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">배송시 요구사항 :</b-col>
                            <b-col>{{order.od_memo}}</b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>

            <b-container class="document">
                <b-row>
                    <b-col>
                        <p>요청서류</p>
                        <b-badge variant="light" v-if="order.od_req_est == 'Y'">견적서</b-badge>
                        <b-badge variant="light" v-if="order.od_req_tran == 'Y'">거래명세서</b-badge>
                        <b-badge variant="light" v-if="order.od_req_biz == 'Y'">사업자 등록증 사본</b-badge>
                        <b-badge variant="light" v-if="order.od_req_bank == 'Y'">통장사본</b-badge>
                        <b-badge variant="warning" v-if="order.od_req_est == 'N' && order.od_req_tran == 'N' && order.od_req_biz == 'N' && order.od_req_bank == 'N'">없음</b-badge>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        
        <transition name="modal">
            <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="500">
                <ReceiptConfirm :item="receiptItem" @hide_modal = "hide_modal" />
            </Modal>
        </transition>
    </div>
</template>

<script>
import ax from '@/api/http';
import { mapGetters } from 'vuex'

export default {
    name: "MyOrder",
    components: {
        'LoadingModal'  : () =>   import('@/views/_common/LoadingModal.vue'),
        'OrderStep'     : () => import('../_comp/OrderStep.vue'),
        'Modal'         : () => import('@/views/_common/Modal.vue'),
        'ReceiptConfirm': () => import('./_comp/ReceiptConfirm'),
    },
    data() {
        return {
            isModalViewed: false,
            isLoadingModalViewed: true,
            order:{},
            receiptItem: {},
        }
    },
    computed: {
        ...mapGetters({
            isLoggedin: 'auth/isLoggedin',
            user: 'auth/user',
        })
    },
    methods:{
        receiptConfirm(odg) {
            this.isModalViewed = true;
            this.receiptItem = Object.assign( {}, odg );
        },
        hide_modal() {
            this.isModalViewed = false;
        }  
    },
    async mounted() {
        const res = await ax.get(`/api/shop/order/${this.$route.params.od_id}`);
        if (res && res.status === 200) {
            this.order = res.data;
            this.isLoadingModalViewed= false;
        }
    },

}
</script>

<style lang="css" scoped>

.order_show .goods>.row { border-bottom:1px solid #DDD; margin-bottom:1rem; padding-bottom:1rem;  }
.order_show .goods>.row>div img { width:160px; height:160px; object-fit:cover; }
.order_show .goods>.row>div:nth-child(2) .row>div:nth-child(1) .btn { text-align:left; }
.order_show .goods>.row>div:nth-child(2) .row>div:nth-child(2) { text-align:right; }
.order_show .goods>.row>div:nth-child(2) .row>div:nth-child(2) .md_multi { display:inline-block; min-width:120px; }

.order_show .price .row div { text-align:right; }
.order_show .price .row div b { display:inline-block; min-width:200px; }

.order_show .orderer .row .col .row div:first-child { font-weight:bold; }

.order_show .container { margin-bottom:2rem; }
</style>
