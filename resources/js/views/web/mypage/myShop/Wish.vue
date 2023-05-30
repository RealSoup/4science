<template lang="html">
    <div id="wish">        
        <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">Loading ......</loading-modal>
        <template v-else>
            <h5>관심상품 <small>{{this.model.length}} 개</small></h5>
            <b-container class="order list01">
                <b-row class="header">
                    <b-col class="chk">
                        <b-form-checkbox v-model="all_chk" :indeterminate="indeterminate" @change="toggle_all_chk" />
                    </b-col>
                    <b-col class="product">상품명 / 모델명</b-col>
                    <b-col class="desc"></b-col>
                    <b-col class="make">제조사</b-col>
                    <b-col class="price">판매가</b-col>
                </b-row>
                <transition-group tag="div" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" class="transition-group">
                    <b-row v-for="(m, i) in computedModel" :key="m.wi_id" class="data">
                        <b-col class="chk">
                            <b-form-checkbox v-model="m.check" name="check" @change="chkChange" />
                        </b-col>
                        <b-col class="product">
                            <b-link :to="{name: 'goods_show', params:{gd_id:m.goods_model.gm_gd_id} }">
                                <img :src="m.goods_model.goods.image_src_thumb[0]" />
                            </b-link>
                        </b-col>
                        <b-col class="desc">
                            <div><b>{{m.goods_model.gm_name}}</b></div>
                            {{m.goods_model.gm_code}} / 사양 : {{m.goods_model.gm_spec}}
                        </b-col>
                        <b-col class="make">{{m.goods_model.goods.maker.mk_name}}</b-col>
                        <b-col class="price">{{m.goods_model.gm_price | comma}} 원</b-col>
                    </b-row>
                </transition-group>
                <b-row>
                    <b-col><b-button v-if="0<model.length && model.length>page*7" @click="page++" class="white lg more">더보기</b-button></b-col>
                </b-row>
            </b-container>
            
            <div class="btn_box">
                <b-button @click="destroy">선택상품 삭제</b-button>
                <b-button @click="cart">선택상품 장바구니에 담기</b-button>
            </div>
        </template>
    </div>
</template>


<script>
import ax from '@/api/http';

export default {
    name: "MyWish",
    components: { 'loading-modal': () =>   import('@/views/_common/LoadingModal.vue'), },
    data() {
        return {
            isLoadingModalViewed: true,
            model:{},
            page:1,
            indeterminate:false,
            all_chk:false,
        }
    },
    computed: {
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
                    { opacity: 1, height: '124px' },
                    { complete: done }
                )
            }, delay)
        },

        chkChange () {
            let chkCnt = this.model.filter(el => el.check==true).length;
            if (chkCnt === 0) {
                this.indeterminate = false;
                this.all_chk = false;
            } else if (chkCnt === this.model.length) {
                this.indeterminate = false;
                this.all_chk = true;
            } else {
                this.indeterminate = true;
                this.all_chk = false;
            }
        },
        toggle_all_chk(checked) {
            this.model.forEach(el => { el.check = checked ? true : false; });
            this.indeterminate = false;
        },

        async destroy(){
            try {
                let chkList = this.model.filter(el => el.check==true).map(row=>row.wi_id);
                if (!chkList.length) {
                    Notify.modal('상품을 선택하세요', 'info');
                    return false;
                }
                var rst = await Notify.confirm('삭제', 'danger');
                if (rst) {
                    try {
                        let frm = Object.assign(
                            {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                            {wi_id:chkList}, // 수정하려는 객체
                            {_method : 'DELETE'} // 삽입하려는 내용
                        );
                        const res = await ax.post(`/api/shop/wish/destroy`, frm);
                        if (res && res.status === 200) {
                            Notify.toast('success', '관심상품 삭제');
                            this.index();
                        }
                    } catch (e) {
                        Notify.consolePrint(e);
                        Notify.toast('danger', '삭제 실패');
                        Notify.toast('danger', e.response.data.message);
                    }
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },

        async cart(){
            try {
                let chkList = this.model.filter(el => el.check==true);
                if (!chkList.length) {
                    Notify.modal('선택하세요', 'info');
                    return false;
                }
                let params = [];
                chkList.forEach(wi => {
                    params.push({gd_id:wi.goods_model.gm_gd_id, gm_id:wi.wi_gm_id, ea:1});
                });

                let frm = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    {list:params}, // 수정하려는 객체
                    {type : 'add'} // 삽입하려는 내용
                );
                const res = await ax.post('/api/shop/cart', frm);
                if (res && res.status === 200) {
                    Notify.toast('success', '장바구니 담기 완료');
                    this.$store.dispatch('cart/index');
                }

            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
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
#mypage .middle .mypage h5 small { color:#F5951A; }
.list01 .transition-group { border-bottom:1px solid #ddd; }
.list01 .row .product { flex:0 0 12%; max-width:12%; }
.list01 .data .product a { display:inline-block; width:100px; min-height:auto; }
.list01 .row .desc { text-align:left; }
.list01 .row .make { flex:0 0 10%; max-width:10%; }
.row .custom-control { display: inline; }
.list01 .row .col .custom-control>>>label { font-size:.9rem; }
.list01 .row .col .custom-control>>>label::before, 
.list01 .row .col .custom-control>>>label::after { top:-.15rem; left:-1.8rem; width:1.5rem; height:1.5rem; }
.list01 .row .col .more { width:100%; margin:1rem auto; padding:.5rem; }

.btn_box button { font-weight:bold; padding:1.25rem 2.7rem; min-width:18.5rem; border-width:0; font-size:1.25rem; } 
.btn_box button:nth-child(1) { background:#B7B7B7; } 
.btn_box button:nth-child(2) { background:#0094EA; margin-left:1rem; } 
</style>
