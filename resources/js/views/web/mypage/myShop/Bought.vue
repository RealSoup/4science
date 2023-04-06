
<template>
<b-container class="w_fence">     
    <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
        Loading ......
    </LoadingModal>
    <template v-else>
        <h3>구매 상품목록</h3>

        <transition-group class="container bought" tag="div" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter">
            <b-row v-for="m in computedModel" :key="m.odm_id" class="data">
                <b-col md="2"><img :src="m.img_thumb_src" class="rounded-circle" /></b-col>
                <b-col>
                    <b-link variant="outline-secondary" block :to="{name: 'goods_show', params:{gd_id:m.odm_gd_id} }">
                        <p><b>{{m.odm_gm_name}}</b></p>
                    
                        {{m.odm_gm_catno}}<br />
                        {{m.odm_gm_code}}<br />
                        {{m.odm_gm_spec}}<br />
                        {{m.odm_gm_unit}}<br />
                    </b-link>            
                </b-col>
                <b-col md="5">
                    {{m.odm_price | comma}} 원
                    <font-awesome-icon icon="times" />
                    {{m.odm_ea | comma}} 개
                    <font-awesome-icon icon="equals" />
                    <b class="md_multi">{{m.odm_price*m.odm_ea | comma}} 원</b>
                </b-col>
            </b-row>
        </transition-group>
        <b-button @click="page++" block variant="primary">더보기</b-button>
        
    </template>
</b-container>
</template>


<script>
import ax from '@/api/http';
import { mapGetters } from 'vuex'

export default {
    name: "MyBought",
    components: {
        'LoadingModal': () =>   import('@/views/_common/LoadingModal.vue'),
        'SchDate': () => import('@/views/_common/SchDate.vue'),
    },
    data() {
        return {
            isLoadingModalViewed: true,
            model:{},
            page:1,
            frm:{
                startDate:'',
                endDate:'',
            }
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
                const res = await ax.get(`/api/shop/order/bought`, { params: this.frm});
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
.container .row { border-bottom:1px solid #DDD; margin-bottom:1rem; padding-bottom:1rem;  }
.container .row div img { width:160px; height:160px; object-fit:cover; }
.container .row>div:nth-child(1) { text-align: center; }
.container .row>div:nth-child(2) .btn { text-align:left; }
.container .row>div:nth-child(3) { text-align: right; align-items: center; display: flex; justify-content: right; }
.container .row>div:nth-child(3) .md_multi { display:inline-block; min-width:120px; }
</style>
