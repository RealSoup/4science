<template>
<div class="w_fence">
    <h3>렌탈 제품</h3>
    <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
    <b-container v-else>
        <b-row class="list">
            <b-col v-for="(row, i) in list" :key="row.gd_id">
                <div class="box" @click="show(i)">
                    <img :src="row.image_src_thumb[0]" />
                    <ul class="clear-both">
                        <li>이화학기기</li>
                        <li>진공건조기</li>
                        <li>건조기</li>
                    </ul>
                    <sub-string v-model="row.gd_name" :width="300" />
                    <p>{{row.goods_model_prime.gm_code}}</p>
                </div>
            </b-col>
        </b-row>
    </b-container>
    <transition name="modal">
        <modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="1100">
            <b-container>
                <b-row>
                    <b-col class="box">
                        <img :src="list[pick_tem].image_src_thumb[0]" />
                        <ul class="clear-both">
                            <li>이화학기기</li>
                            <li>진공건조기</li>
                            <li>건조기</li>
                        </ul>
                        <sub-string v-model="list[pick_tem].gd_name" :width="300" />
                        <p>{{list[pick_tem].goods_model_prime.gm_code}}</p>
                    </b-col>
                    <b-col>
                        
                    </b-col>
                </b-row>
            </b-container>
        </modal>
    </transition>
</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'ListingIndex',
    components: {
        'loading-modal': () =>  import('@/views/_common/LoadingModal.vue'),
        'sub-string': () =>     import('@/views/_common/SubString.vue'),
        'modal'     : () =>     import('@/views/_common/Modal'),
    },

    data() {
        return {
            isLoadingModalViewed: true,
            isModalViewed: false,
            list:[],
            pick_tem:0,
        };
    },
    methods: {
        async index(){
            const res = await ax.get(`/api/shop/rental`, { params: {gd_type:'REN'} });
            if (res && res.status === 200) {
                this.list = res.data;
                this.isLoadingModalViewed = false;
            }
        },
        show(i) {
            this.pick_tem = i;
            this.isModalViewed = true;
        }
    },
    mounted() { this.index(); },
};
</script>

<style lang="css" scoped>
.w_fence { background-color:#F2F3F7; }
.w_fence .container { max-width:1200px; margin:auto; }
.w_fence .container .list { margin:0 -15px; }
.w_fence .container .list .col { flex:0 0 33.333333%; max-width:33.333333%; padding:15px; }
.w_fence .container .box { background-color:#FFF; border-radius:1em; padding:30px 40px 36px 40px; cursor:pointer; }
.w_fence .container .box img { margin:auto; display:block; }
.w_fence .container .box ul { margin-top:1.3em; font-size:.9em; font-weight:bold; }
.w_fence .container .box ul li { color:#00A0CA; float:left; }
.w_fence .container .box ul li:not(:last-child):after { content:">"; position: relative; right:-5px; margin-right:9px; }
.w_fence .container .box span { font-weight:bold; font-size:1.15em; margin-top:.6em; display:inline-block; }
.w_fence .container .box p { color:#959595; margin:0; }
.w_fence .container .box:after { content:""; position:absolute; right:40px; bottom:40px; width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-top:12px solid #969696;}
</style>
