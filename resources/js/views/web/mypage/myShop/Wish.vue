<template lang="html">
    <div id="wish">        
        <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
            Loading ......
        </LoadingModal>
        <template v-else>
            <div class="pTitle">
                <span><i>관</i></span>
                <span><i>심</i></span>
                <span class="d-md-none d-inline-block"><i>/</i></span>
                <div class="break d-md-block d-none"></div>
                <span><i>상</i></span>
                <span><i>품</i></span>
                <span><i>목</i></span>
                <span><i>록</i></span>
                <div class="break"></div>
                <span><i></i></span>
            </div>

            <transition-group class="container bought" tag="div" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter">
                <b-row v-for="(m, i) in computedModel" :key="m.wi_id" class="data">
                    <b-col md="2"><img :src="m.goods_model.goods.image_src_thumb[0]" class="rounded-circle" /></b-col>
                    <b-col>
                        <b-button variant="outline-secondary" block :to="{name: 'goods_show', params:{gd_id:m.goods_model.gm_gd_id} }">
                            <p><b>{{m.goods_model.gm_name}}</b></p>
                     
                            {{m.goods_model.gm_catno}}<br />
                            {{m.goods_model.gm_code}}<br />
                            {{m.goods_model.gm_spec}}<br />
                            {{m.goods_model.gm_unit}}<br />
                        </b-button>            
                    </b-col>
                    <b-col md="5">
                        {{m.goods_model.gm_price | comma}} 원
                    </b-col>
                </b-row>
            </transition-group>
            <b-button @click="page++" block variant="primary">더보기</b-button>
            
        </template>
    </div>
</template>


<script>
import ax from '@/api/http';
import { mapGetters } from 'vuex'

export default {
    name: "MyBought",
    components: {
        'LoadingModal': () =>   import('@/views/_common/LoadingModal.vue'),
        'SchDate': () => import('../_comp/SchDate.vue'),
        'OrderStep': () => import('../_comp/OrderStep.vue'),
    },
    data() {
        return {
            isLoadingModalViewed: true,
            model:{},
            page:1,
        }
    },
    computed: {
        ...mapGetters({
            isLoggedin: 'auth/isLoggedin',
            user: 'auth/user',
        }),
        computedModel: function () {
            return this.model.slice( 0, this.page*7 );
        },
    },
    methods:{
        async index(){
            try {
                const res = await ax.get(`/api/shop/wish`);
                if (res && res.status === 200) {
                    this.model = res.data;
                    this.isLoadingModalViewed= false;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },


        beforeEnter: function (el) {
            el.style.opacity = 0
            el.style.height = 0
        },
        enter: function (el, done) {
            var delay = el.dataset.index * 150
            setTimeout(function () {
                Velocity(
                    el,
                    { opacity: 1, height: '177px' },
                    { complete: done }
                )
            }, delay)
        },
    },
    mounted() {
        const plugin = document.createElement("script");
        plugin.setAttribute( "src", "https://cdnjs.cloudflare.com/ajax/libs/velocity/2.0.6/velocity.min.js" );
        plugin.async = true;
        document.head.appendChild(plugin);
        this.index();
    },

}
</script>

<style lang="css" scoped>
#ought .pTitle { margin-bottom: 2rem; }
.bought .row { border-bottom:1px solid #DDD; margin-bottom:1rem; padding-bottom:1rem;  }
.bought .row div img { width:160px; height:160px; object-fit:cover; }
.bought .row>div:nth-child(1) { text-align: center; }
.bought .row>div:nth-child(2) .btn { text-align:left; }
.bought .row>div:nth-child(3) { text-align: right; align-items: center; display: flex; justify-content: right; }
.bought .row>div:nth-child(3) .md_multi { display:inline-block; min-width:120px; }


</style>
