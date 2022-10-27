<template>
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
                <b>{{od.created_at}}</b> &nbsp; 주문번호 {{od.od_id}} &nbsp;
                <OrderStep v-model="od.od_step" :order_config="od.order_config" />
            </h5>

            <b-container v-for="opa in od.order_purchase_at" :key="opa.odpa_id" class="goods">
                <b>{{opa.odpa_pa_id ? opa.odpa_pa_name: '4SCIENCE'}}</b> 직배송 상품
                <b-container>
                    <b-row v-for="odm in opa.order_model" :key="odm.odm_id">
                        <b-col cols="2">
                            <img :src="odm.img_src" />
                        </b-col>
                        <b-col>
                            <b-button v-if="odm.odm_gd_id" variant="outline-secondary" block :to="{name: 'goods_show', params:{gd_id:odm.odm_gd_id} }">
                                {{odm.odm_gd_name}}
                                <P class="bg-light">
                                    {{odm.odm_gm_name}} /
                                    {{odm.odm_gm_catno}} /
                                    {{odm.odm_gm_code}} /
                                    {{odm.odm_gm_spec}} /
                                    {{odm.odm_gm_unit}} /
                                </P>
                            </b-button>
                            <div v-else>
                                {{odm.odm_gd_name}}
                                <P class="bg-light">
                                    {{odm.odm_gm_name}} /
                                    {{odm.odm_gm_catno}} /
                                    {{odm.odm_gm_code}} /
                                    {{odm.odm_gm_spec}} /
                                    {{odm.odm_gm_unit}} /
                                </P>
                            </div>
                        </b-col>
                        <b-col cols="3">
                            {{odm.odm_price_add_vat | comma}} 
                            <font-awesome-icon icon="times" /> 
                            {{odm.odm_ea}} 
                            <font-awesome-icon icon="equals" />
                            <b class="md_multi">{{odm.odm_price_add_vat*odm.odm_ea | comma}} 원</b>
                        </b-col>
                            
                        <b-col cols="2">
                            <div v-if="odm.odm_type=='MODEL'">                                    
                                <b-badge v-if="odm.order_dlvy_info.oddi_receive_date" variant="light">수취완료</b-badge>
                                <b-badge v-else-if="odm.order_dlvy_info.oddi_arrival_date" variant="success">배송완료</b-badge>
                                <b-button v-else-if="odm.order_dlvy_info.oddi_dlvy_num" size="sm" variant="info"
                                    :href="getHref(odm.order_dlvy_info.oddi_dlvy_com, odm.order_dlvy_info.oddi_dlvy_num)"
                                >
                                    배송조회
                                </b-button>
                                <b-badge v-else variant="primary">준비중</b-badge>
                                <br />
                                <b-button 
                                    v-if="!!odm.order_dlvy_info.oddi_arrival_date && !odm.order_dlvy_info.oddi_receive_date" variant="dark"
                                    @click="receiptConfirm(odm)"
                                >
                                    수취확인
                                </b-button>
                            </div>
                        </b-col>
                    </b-row>
                </b-container>
            </b-container>

            <b-container class="price">
                <b-row>
                    <b-col cols="12">
                        총합 : <b>{{od.od_gd_price | comma}} 원</b>
                    </b-col>
                    <b-col cols="12">
                        부가세 : <b>{{od.od_surtax | comma}} 원</b>
                    </b-col>
                    <b-col cols="12">
                        배송료 : <b>{{od.od_dlvy_price | comma}} 원</b>
                    </b-col>
                    <b-col cols="12">
                        최종 결제 금액 : <b>{{od.od_all_price | comma}} 원</b>
                    </b-col>
                </b-row>
            </b-container>

            <b-container class="orderer">
                <b-row>
                    <b-col>
                        <p>주문정보</p>
                        <b-row>
                            <b-col cols="3">이름 :</b-col>
                            <b-col>{{od.od_name}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">소속 :</b-col>
                            <b-col>{{od.od_department}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">이메일주소 :</b-col>
                            <b-col>{{od.od_orderer_email}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">전화번호 :</b-col>
                            <b-col>{{od.od_orderer_tel}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">팩스번호 :</b-col>
                            <b-col>{{od.od_orderer_tax}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">휴대폰번호 :</b-col>
                            <b-col>{{od.od_orderer_hp}}</b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <p>배송정보</p>
                        <b-row>
                            <b-col cols="3">수령인 :</b-col>
                            <b-col>{{od.od_receiver}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">주소 :</b-col>
                            <b-col>{{od.od_addr1}} {{od.od_addr2}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">휴대폰번호 :</b-col>
                            <b-col>{{od.od_receiver_hp}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">배송시 요구사항 :</b-col>
                            <b-col>{{od.od_memo}}</b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>

            <b-container class="document">
                <b-row>
                    <b-col>
                        <p>요청서류</p>
                        <b-badge variant="light" v-if="od.od_req_est == 'Y'">견적서</b-badge>
                        <b-badge variant="light" v-if="od.od_req_tran == 'Y'">거래명세서</b-badge>
                        <b-badge variant="light" v-if="od.od_req_biz == 'Y'">사업자 등록증 사본</b-badge>
                        <b-badge variant="light" v-if="od.od_req_bank == 'Y'">통장사본</b-badge>
                        <b-badge variant="warning" v-if="od.od_req_est == 'N' && od.od_req_tran == 'N' && od.od_req_biz == 'N' && od.od_req_bank == 'N'">없음</b-badge>
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
            od:{},
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
        receiptConfirm(odm) {
            this.isModalViewed = true;
            this.receiptItem = Object.assign( {}, odm );
        },
        hide_modal() {
            this.isModalViewed = false;
        },
        getHref (com, num) {
            return this.od.order_config.delivery_com[com].replace('[송장번호]', num);
        }
    },
    async mounted() {
        const res = await ax.get(`/api/shop/order/${this.$route.params.od_id}`);
        if (res && res.status === 200) {
            this.od = res.data;
            this.isLoadingModalViewed= false;
        }
    },

}
</script>

<style lang="css" scoped>
.order_show .goods { margin-top:2rem; }
.order_show .goods .container { margin-bottom:1rem; }
.order_show .goods .container>b { font-size:2rem; }
.order_show .goods .container .row { border-bottom:1px solid #DDD; margin-bottom:1rem; padding-bottom:1rem;  }
.order_show .goods .container .row>div { align-items:center; justify-content:center; display:flex; }
.order_show .goods .container .row>div img { width:160px; height:160px; object-fit:cover; }
.order_show .goods .container .row>div:nth-child(2) .btn { text-align:left; }
.order_show .goods .container .row>div:nth-child(3) { justify-content:end; text-align:right; }
.order_show .goods .container .row>div:nth-child(3) svg { margin:0 10px; }
.order_show .goods .container .row>div:nth-child(3) .md_multi { display:inline-block; min-width:90px; }

.order_show .price .row div { text-align:right; }
.order_show .price .row div b { display:inline-block; min-width:200px; }

.order_show .orderer .row .col .row div:first-child { font-weight:bold; }

.order_show .container { margin-bottom:2rem; }
</style>
