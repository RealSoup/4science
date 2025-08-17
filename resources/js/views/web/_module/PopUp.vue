<template>
<div class="popup pop_0" v-if="$route.name == 'main' && view_check(0)">
    <router-link to="/board/notice/show/63">
        <b-img src="/storage/main/popup/250814.jpg" width="500"></b-img>
    </router-link>
    
    <div class="ctrl">
        <b-button class="white xm" @click="todayStop(0)">24시간 안 보기</b-button>
    </div>
</div>
</template>

<script>
export default {
    name:"web_modulePopUp",
    data () {
        return {
            pop: [ 
                {ck_key: '4S_PopUp_01', ck_view: false, is_view: false},
                {ck_key: '4S_PopUp_02', ck_view: false, is_view: false}, 
                {ck_key: '4S_PopUp_03', ck_view: false, is_view: false}, 
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



.popup .split_link { position:absolute; display:block; width:50%; height:calc(100% - 25px); top:0; transform:translateX(-50%); } 
.popup .split_link#app01 { left:25%; }
.popup .split_link#app02 { left:75%;}
.popup .split_link:hover { background-color:#015B7E55; }
.popup .split_link .tooltiptext {
  visibility:hidden; padding:0.25em 0.5em; background-color:black; color:#fff; text-align:center; border-radius:0.25em; white-space:nowrap;
  position:absolute; z-index:1; top:50%; transition-property:visibility; transition-delay:0s; }
.popup a#app01 .tooltiptext { right:25%; }
.popup a#app02 .tooltiptext { left:25%; }
.popup .split_link:hover .tooltiptext { visibility: visible; opacity:1; }


@media (max-width: 992px){ .popup { top:0; left:0;  } .popup img { width:100%; } }
@media (max-width: 576px){ .popup { width:100%; } }
</style>