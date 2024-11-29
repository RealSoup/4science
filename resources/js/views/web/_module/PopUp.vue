<template>
<div>

    <div class="popup pop_0" v-if="$route.name == 'main' && view_check(0)">
        <b-img src="/storage/main/popup/241129.jpg" width="450"></b-img>
        <div class="ctrl">
            <b-button class="white xm" @click="todayStop(0)">24시간 안 보기</b-button>
        </div>
    </div>

    <!-- 
    <div class="popup pop_1" v-if="$route.name == 'order_settle' && view_check(1)">
        <b-img src="/storage/order/popup.png"></b-img>
        <div class="ctrl">
            <b-button class="white xm" @click="todayStop(1)">24시간 안 보기</b-button>
        </div>
    </div>
    
 
    <div class="popup pop_2" v-if="$route.name == 'main' && pop[2].is_view && pop[2].ck_view">
        <b-img :src="`/storage/main/popup/230508_1.jpg`"></b-img>
        <div class="ctrl">
            <b-button class="white xm" @click="todayStop(2)">24시간 안 보기</b-button>
        </div>
    </div>
    -->
</div>

</template>

<script>
export default {
    name:"web_modulePopUp",
    data () {
        return {
            pop: [ 
                {ck_key: 'view01', is_view: true, ck_view: false},
                {ck_key: 'view02', is_view: false, ck_view: false}, 
                {ck_key: 'view03', is_view: false, ck_view: false}, 
            ]          
        }
    },
    methods: {
        todayStop(i) {
            this.$cookies.set(this.pop[i].ck_key, 'hide', 60*60*24);
            this.pop[i].is_view = false;
        }, 
        view_check(i) {
            return this.pop[i].is_view && this.pop[i].ck_view;
        },
    },
    mounted() {
        this.pop.forEach(el => {
            el.ck_view = (this.$cookies.get(el.ck_key) == 'hide') ? false : true;
        });
    },
}
</script>

<style lang="css" scoped>
.popup { position:absolute; top:162px; left:300px; z-index:16; box-shadow: 0 1px 15px 1px rgba(39,39,39,.5); background: #FFF; }
.popup .ctrl { background-color:#FFF; text-align:right; }

.pop_1 { position:absolute; top:20%; left:20%; box-shadow: 0 1px 15px 1px rgba(39,39,39,.5); border-radius: 50px 50px 0 0; background: #FFF; }
.pop_2 { left:720px; }


@media (max-width: 992px){ .popup { top:0; left:0;  } .popup img { width:100%; } }
@media (max-width: 576px){ .popup { width:100%; } }
</style>
