<template>
<div v-if="list.length">
    <div class="remote_btn m_hide" @click="$store.commit('recent_goods/switch', { recent_goods_view:true })">최근<br>본 상품</div>
    
    <div class="modal_recent_gd" v-if="recent_goods_view">
        <div class="overlay" @click="$store.commit('recent_goods/switch', { recent_goods_view:false })">
            <div @click="$store.commit('recent_goods/switch', { recent_goods_view:false })" class="off"><b-icon-x-lg /></div>
        </div>
        <div class="body">
            <h4>최근 본 상품</h4>
            <b-link v-for="(gd, i) in list" :key="i" @click="$store.commit('recent_goods/switch', { recent_goods_view:false })" :to="{ name: 'goods_show', params: {gd_id: gd.gd_id} }">
                <img :src="gd.image_src_thumb[0]" />
                <sub-string v-model="gd.gd_name" :width="300" />
            </b-link>
            <div @click="$store.commit('recent_goods/switch', { recent_goods_view:false })" class="off m_show"><b-icon-x-lg /></div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:"RecentGoods",
    components: { 'sub-string': () => import('@/views/_common/SubString.vue'), },
    computed: { ...mapState('recent_goods', ['recent_goods_view', 'list']), },
}
</script>

<style lang="css" scoped>

/*.remote_btn { background-color:#51B948; border:3px solid #FFF; width:70px; height:70px; border-radius:100%; box-shadow:0 1px 15px 1px rgba(39,39,39,.5); 
    color:#FFF; font-size:.95em; display:flex; align-items:center; justify-content:center;  text-align:center; margin:0 0 10px -10px; cursor:pointer; }
*/
.remote_btn { background:url(/storage/common/btn_recent.png) no-repeat center center; width:80px; height:80px; color:#FFF; font-weight:bold; 
                font-size:.95em; display:flex; align-items:center; justify-content:center; text-align:center; line-height:19px; margin:0 0 10px -15px; 
                cursor:pointer; box-shadow:3px 1px 4px 1px rgba(39, 39, 39, .5); border-radius:100%; }
.modal_recent_gd,
.overlay { width:100%; height:100%; position:fixed; left: 0; top: 0; }
.modal_recent_gd { z-index:1030; background:none; }
.modal_recent_gd .overlay { opacity:0.75; background-color: black; }

.modal_recent_gd .body { position:fixed; right:0; height:100%; width:31.25em; background-color:#fff; z-index:10; opacity:1; overflow-y:auto; overflow-x:visible; }
.modal_recent_gd .body h4 { border-bottom:1px solid #E1E1E1; text-align:center; font-size:1.4em; font-weight:600; line-height:2.5em; }

.modal_recent_gd .body a { display:block; padding:.5em 2.5em; }
.modal_recent_gd .body a img { width:6.25em; height:6.25em; object-fit:contain; border:1px solid #DDD; margin-right:.8em; }
.modal_recent_gd .body a >>> span span { vertical-align: middle; }

.modal_recent_gd .off { position:absolute; top:0; right:31.25em; color:#FFF; background-color:#363636; padding:15px; cursor:pointer; }
.modal_recent_gd .off svg { width:1.875em; height:1.875em; }

@media (max-width: 992px){
    .modal_recent_gd .body { width:100%; }
    .modal_recent_gd .body a { padding:.5em; }
    .modal_recent_gd .off {  right:0; padding:11px; }
    .modal_recent_gd .body a img { width: 4.25em; height: 4.25em; }
}
</style>
