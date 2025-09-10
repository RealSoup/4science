<template>
<b-row class="gd_list">
    <b-col class="cate">
        <h5>
            <span v-if="gd_list[0].gc_ca01_name">{{gd_list[0].gc_ca01_name}}</span>
            <span v-if="gd_list[0].gc_ca02_name"><b> > </b>{{gd_list[0].gc_ca02_name}}</span>
            <span v-if="gd_list[0].gc_ca03_name"><b> > </b>{{gd_list[0].gc_ca03_name}}</span>
            <span v-if="gd_list[0].gc_ca04_name"><b> > </b>{{gd_list[0].gc_ca04_name}}</span>
        </h5>
    </b-col>
    
    <b-col v-for="gd in gd_list" class="goods" :key="gd.gd_id">
        <b-link :to="{name:'goods_show', params:{gd_id:gd.gd_id}}">
            <b-img :src="gd.img_src_thumb" />
            <p>{{gd.gd_name}}</p>
            <div>{{gd.goods_model_prime?.gm_price_add_vat | comma | price_zero}}</div>
        </b-link>
    </b-col>
</b-row>
</template>

<script>
export default {
    name: "webShopMakerShop_compList",
    props: {
        gd_list: {
            type: Array,
            required: true,
        },
    },
};
</script>
<style scoped>
.row .cate { flex:0 0 100%; max-width:100%; }
.row .cate h5 { background:#fef200; border-radius:25px; display:inline-block; margin-top:50px; min-width:300px; padding:10px 20px; color:#777; } 
.row .cate h5 span b { color:#000; }
.row .goods { flex:0 0 20%; max-width:20%; padding:10px; }
.row .goods a { border:1px solid #B6B6B6;  display:block; text-align:center; height:388px; padding:26px; background:#fff; overflow:hidden; position:relative; }
.row .goods a img { width:100%; height:228px; object-fit:contain; margin-bottom:2.8rem; transition:transform .2s; }
.row .goods a p { line-height:1.1; margin:0; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
.row .goods a div { position:absolute; bottom:24px; left:50%; transform:translateX(-50%); color:#C00; }
.row .goods:hover a img { transform:scale(1.2); }
</style>