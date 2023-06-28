<template>
<div class="recent_box" v-if="recentGoods.length">
    <div class="box_header list_item">최근<br>본 상품</div>
    <div class="cube_box">
        <div class="cube" :class="cubeClass" :style="cubeHeight">
            <div class="piece" v-for="(side, i) in divideRecentGoods" :key="i" :class="setCubePieceClass(i)">
                <router-link :to="{ name: 'goods_show', params: {gd_id: gd.gd_id} }" v-for="gd in recentGoods.slice(i * itemsPerRow, (i + 1) * itemsPerRow)" :key="gd.gd_id" class="list_item">
                    <img :src="gd.image_src_thumb[0]" />
                </router-link>
            </div>
        </div>
        
        <div class="ctrlBtn">
            <b-button @click="setCubeClass('left')" :disabled="direction_int<1">&lt;</b-button>
            <b-button @click="setCubeClass('right')" :disabled="(direction_int>1 || direction_int>=(this.divideRecentGoods.length-1))">&gt;</b-button>
        </div>
    </div>
</div>
</template>

<script>
import ax from '@/api/http';
require('vue2-animate/dist/vue2-animate.min.css');

export default {
    name:"RecentGoods",
    watch: {
        '$route' (to, from) {
            if (to.name == 'goods_show')
                this.setRecentGoods();
        },
    },
    data () {
        return {
            ck_key: 'RecentGoods',
            itemsPerRow: 5,
            recentGoods: [],
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
        cubeHeight: function () {
            let cnt = this.recentGoods.length > 4 ? 5 : this.recentGoods.length;
            return { height: (cnt*80) + 'px', }
        }
    },
    methods: {
        async setRecentGoods() {
            try {
                const res = await ax.get(`/api/shop/goods/recentGoods`);
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
        
    },
    mounted() {
        this.setRecentGoods();
    },
}
</script>

<style lang="css" scoped>
.recent_box { position:absolute; top:0; right:-90px; transition:all .5s ease; z-index:1; }
.recent_box .list_item { width:70px; height:70px; border-radius:100%; }
.recent_box .box_header { background-color:#51B948; border:3px solid #FFF; width:90px; height:90px; box-shadow:0 1px 15px 1px rgba(39,39,39,.5); color:#FFF; text-align:center; font-size:.95rem; line-height:1.2; display:flex; align-items:center; justify-content:center; }

.recent_box .cube_box, .recent_box .cube_box * { box-sizing: border-box; }
.recent_box .cube_box { width:70px; height:430px; margin:auto; transition:all .5s ease; }

.recent_box .cube_box .cube { position: relative; transform-style: preserve-3d; width:100%; transform: translateZ(-30px); transition: transform .2s; }
.recent_box .cube_box .cube .piece { position:absolute; overflow:hidden; transition:all .5s ease; background:#fff; height:100%; border-radius:35px; }
.recent_box .cube_box .cube .piece.front  { transform: rotateY(  0deg) translateZ(30px); }
.recent_box .cube_box .cube .piece.right  { transform: rotateY( 90deg) translateZ(30px); }
.recent_box .cube_box .cube .piece.back   { transform: rotateY(180deg) translateZ(30px); }

.recent_box .cube.show_front  { transform: translateZ(-30px) rotateY(   0deg); }
.recent_box .cube.show_right  { transform: translateZ(-30px) rotateY( -89.999deg); }
.recent_box .cube.show_back   { transform: translateZ(-30px) rotateY(-180deg); }

.recent_box .cube_box .cube .piece a { overflow:hidden; display:block; border:5px solid #FFF; margin-top:10px; }
.recent_box .cube_box .cube .piece a img { width:100%; height:100%; object-fit:contain; }

.recent_box .cube_box .ctrlBtn { display:flex; margin-top:10px; }
.recent_box .cube_box .ctrlBtn .btn { background-color:#51B948; color:#fff; width:50%; display:inline-block; text-align:center; border-width:0; padding:0; }
.recent_box .cube_box .ctrlBtn .btn:nth-of-type(1) { border-right:1px solid #FFF; border-radius: 42% 0 0 42%; }
.recent_box .cube_box .ctrlBtn .btn:nth-of-type(2) { border-radius:0 42% 42% 0; }
.recent_box .cube_box .ctrlBtn .btn:disabled { cursor:not-allowed !important; }

@media (max-width: 992px){
    .recent_box { display:none; }
}
</style>
