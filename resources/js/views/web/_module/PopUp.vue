<template>
<div class="popup" v-if="is_view">
    <b-img :src="`${s3url}main/popup/230417.jpg`" />
    <div class="ctrl">
        <b-button class="white xm" @click="todayStop">24시간 안 보기</b-button>
    </div>
</div>
</template>

<script>
import ax from '@/api/http';
require('vue2-animate/dist/vue2-animate.min.css');

export default {
    name:"web_modulePopUp",
    watch: {
        '$route' (to, from) {
            if (to.name == 'goods_show')
                this.updateRecentGoods();
        },
    },
    data () {
        return {
            ck_key: 'today_stop',
            is_view: true,
          
        }
    },
    computed: {
 
    },
    methods: {
        todayStop() {
            // this.$cookies.set("키", "값", "만료일");
            this.$cookies.set(this.ck_key, 'hide', 60*60*24);
            this.is_view = false;
        }
    },
    mounted() {
        this.is_view = (this.$cookies.get(this.ck_key) == 'hide') ? false : true;
    },
}
</script>

<style lang="css" scoped>
.popup { position:absolute; top:162px; left:300px; z-index:10; }
.popup .ctrl { background-color:#FFF; text-align:right; }
</style>
