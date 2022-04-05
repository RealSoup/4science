<template lang="html">
    <div class="recent_box"
        :class="{view_go_top:viewGoTop}"
        v-if="recentGoods.length"
        @mouseenter="mouseHover = true"
        @mouseleave="mouseHover = false">
        <div class="box_header list_item"><b-icon-clock-history /></div>
        <div class="cube_box" :class="{allShow:mouseHover}">
            <div class="cube" :class="cubeClass">
                <div class="piece" v-for="(side, i) in divideRecentGoods" :key="i" :class="setCubePieceClass(i)">
                    <router-link :to="{ name: 'goods_show', params: {gd_id: gd.gd_id} }" v-for="gd in recentGoods.slice(i * itemsPerRow, (i + 1) * itemsPerRow)" :key="gd.gd_id" class="list_item">
                        <img :src="gd.image_src_thumb[0]" />
                    </router-link>
                </div>
            </div>
            <transition name="flip" enter-active-class="lightSpeedIn" leave-active-class="lightSpeedOut">
                <div class="ctrlBtn" v-if="mouseHover" style="animation-duration: 0.3s">
                    <b-button @click="setCubeClass('left')" :disabled="direction_int<1"><b-icon-chevron-compact-left /></b-button>
                    <b-button @click="setCubeClass('right')" :disabled="(direction_int>1 || direction_int>=(this.divideRecentGoods.length-1))"><b-icon-chevron-compact-right /></b-button>
                </div>
            </transition>
        </div>
        <div class="go_top_box list_item">
            <transition name="fade">
                <b-button class="go_top" v-if="viewGoTop" @click="scrollToTop"><b-icon-caret-up /></b-button>
            </transition>
        </div>
    </div>
</template>

<script>
import ax from '@/api/http';
require('vue2-animate/dist/vue2-animate.min.css');
import { mapState } from 'vuex'

export default {
    watch: {
        '$route' (to, from) {
            if (to.name == 'goods_show')
                this.updateRecentGoods();
        },
        'scroll.y' (to, from) {
            this.viewGoTop = to > 30;
        },
    },
    data () {
        return {
            mouseHover: false,
            ck_key: 'RecentGoods',
            viewGoTop: false,
            itemsPerRow: 5,
            recentGoods: {},
            direction_int: 0,
            cubeClass: {
                show_front: true,
                show_right: false,
                show_back: false
            }
        }
    },
    computed: {
        divideRecentGoods () {
            return Array.from(Array(Math.ceil(this.recentGoods.length / this.itemsPerRow)).keys())
        },
        ...mapState('scroll', ['scroll']),
    },
    methods: {
        scrollToTop(){
            this.$emit('scrollToTop');
        },
        // scrollListener: function (e) {
        //     this.viewGoTop = window.scrollY > 150;
        //
        // },
        async setRecentGoods() {
            try {
                let cookies = this.$cookies.get(this.ck_key);
                const res = await ax.get(`/api/shop/goods/recentGoods`, { params: {gd_id:cookies}});
                if (res && res.status === 200) {
                    this.recentGoods = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        setCubeClass(direction) {
            if (direction == 'left') this.direction_int--;
            if (direction == 'right') this.direction_int++;

            if (this.direction_int > 2) this.direction_int = 2;
            if (this.direction_int < 0) this.direction_int = 0;
            if (this.direction_int > (this.divideRecentGoods.length-1)) this.direction_int = (this.divideRecentGoods.length-1);
            switch (this.direction_int) {
                case 0: this.cubeClass.show_front = true; this.cubeClass.show_right = false; this.cubeClass.show_back = false; break;
                case 1: this.cubeClass.show_front = false; this.cubeClass.show_right = true; this.cubeClass.show_back = false; break;
                case 2: this.cubeClass.show_front = false; this.cubeClass.show_right = false; this.cubeClass.show_back = true; break;
            }
        },
        setCubePieceClass: function(idx) {
            var result = [];
                if (idx === 0) result.push('front');
                else if (idx === 1) result.push('right');
                else if (idx === 2) result.push('back');
            return result;
        },
        updateRecentGoods() {
            // this.$cookies.set("키", "값", "만료일");
            let cookieRecentGoods = this.$cookies.get(this.ck_key);

            if (cookieRecentGoods) {
                let array_cookieRecentGoods = cookieRecentGoods.split(',');
                array_cookieRecentGoods =  array_cookieRecentGoods.reduce((acc, el) => {
                    if (el != this.$route.params.gd_id) acc.push(el);   //  값이 있따면 빼고 리턴
                    return acc;
                }, []);
                array_cookieRecentGoods = [this.$route.params.gd_id].concat(array_cookieRecentGoods);
                array_cookieRecentGoods =  array_cookieRecentGoods.reduce((acc, el, idx) => {
                    if (idx < 15) acc.push(el);   //  값이 있따면 빼고 리턴
                    return acc;
                }, []);
                cookieRecentGoods = array_cookieRecentGoods.join(',');
            } else {
                cookieRecentGoods = this.$route.params.gd_id;
            }
            this.$cookies.set(this.ck_key, cookieRecentGoods);
        }
    },
    mounted() {
        if (this.$route.name == 'goods_show')
            this.updateRecentGoods();
        this.setRecentGoods();
        // window.addEventListener('scroll', this.scrollListener);
        // console.log(this.$route.name);
    },
    // beforeDestroy: function () {
    //     window.removeEventListener('scroll', this.scrollListener)
    // },
}
</script>

<style lang="css" scoped>
.recent_box { position:fixed; bottom:15px; right:130px; transition:all .5s ease; }
.recent_box .list_item { width:50px; height:50px; margin:5px; border-radius:100%; }
.recent_box .box_header  { background-color:#000; display:flex; align-items:center; justify-content:center; }
.recent_box .box_header .b-icon { font-size:3rem; color:#FFF; }



.recent_box .cube_box, .recent_box .cube_box * { box-sizing: border-box; }
.recent_box .cube_box { width:60px; height:60px; perspective:500px; margin:auto; transition:all .5s ease; }
.recent_box .cube_box.allShow { height:280px; }
.recent_box .cube_box.allShow .cube .piece { height:100%; }
.recent_box .cube_box .cube { position: relative; transform-style: preserve-3d;
    width:100%; height:100%;
    transform: translateZ(-30px); transition: transform .2s; }
.recent_box .cube_box .cube .piece { position:absolute; background-color:#fff; height:60px; overflow:hidden; transition:all .5s ease; }
.recent_box .cube_box .cube .piece.front  { transform: rotateY(  0deg) translateZ(30px); }
.recent_box .cube_box .cube .piece.right  { transform: rotateY( 90deg) translateZ(30px); }

.recent_box .cube.show_front  { transform: translateZ(-30px) rotateY(   0deg); }
.recent_box .cube.show_right  { transform: translateZ(-30px) rotateY( -90deg); }
.recent_box .cube.show_back   { transform: translateZ(-30px) rotateY(-180deg); }

.recent_box .cube_box .cube .piece a { overflow:hidden; display:block; }
.recent_box .cube_box .cube .piece a img { width:100%; height:100%; object-fit: cover; }

.recent_box .cube_box .ctrlBtn { position:absolute; top:50%; transform:translateY(-50%); width:100% }
.recent_box .cube_box .ctrlBtn button { position:absolute; top:-40px; padding:0; font-size:2rem; color:#666; background-color:transparent !important; border:none; }
.recent_box .cube_box .ctrlBtn button:nth-of-type(1) { left:-20px; }
.recent_box .cube_box .ctrlBtn button:nth-of-type(2) { right:-20px; }
.recent_box .cube_box .ctrlBtn button:disabled { cursor: not-allowed; }

.recent_box .go_top_box { margin:0 5px; }
.recent_box .go_top_box .go_top { width:100%; height:100%; border-radius:100%; font-size:3rem; display:flex; align-items:center; justify-content:center; background-color: #000; }
.recent_box .go_top_box .go_top .fade-enter-active,
.recent_box .go_top_box .go_top .fade-leave-active { transition: opacity .5s; }
.recent_box .go_top_box .go_top .fade-enter,
.recent_box .go_top_box .go_top .fade-leave-to { opacity: 0; }

.recent_box .go_top_box { height:0; transition:height .7s ease;}
.recent_box.view_go_top .go_top_box { height:50px; }
</style>
