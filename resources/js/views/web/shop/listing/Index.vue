<template>
<b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
        <b-nav card-header tabs>
        <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
            <b-nav-item to="/shop/listing/rec" exact exact-active-class="active">추천상품</b-nav-item>
            <b-nav-item to="/shop/listing/pop" exact exact-active-class="active">인기상품</b-nav-item>
            <b-nav-item to="/shop/listing/cli" exact exact-active-class="active">Click & Buy</b-nav-item>
            <b-nav-item to="/shop/listing/day" exact exact-active-class="active">당일출고</b-nav-item>
            <b-nav-item to="/shop/listing/maker" exact exact-active-class="active">Brand Shop</b-nav-item>
        </b-nav>
    </b-card-header>

    <b-card-body class="container">
        <b-row>
            <template v-if="code==='maker'">
                <b-col v-for="(li, i) in list" :key="li.mk_id" :class="{ 'maker': code==='maker' }" lg="2" cols="6" col>
                    <b-link to="">
                        <b-img v-if="i<3" :src="'/img/listing/maker/'+li.mk_id+'.png'" rounded />
                        <b-img v-else src="/img/common/noimage.jpg" rounded />
                        <p>{{li.mk_name}}</p>
                    </b-link>
                </b-col>
            </template>
            <template v-else>
                <b-col v-for="(li, i) in list" :key="'dfsgdg'+i" lg="2" cols="6" col>
                    <b-link v-if="li.goods" :to="{name: 'goods_show', params:{gd_id:li.li_gd_id} }">
                        <b-img :src="li.goods.image_src_thumb[0]" rounded />
                        <p>{{li.goods.gd_name}}</p>
                    </b-link>
                </b-col>
            </template>
            
        </b-row>
    </b-card-body>
</b-card>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'ListingIndex',

    data() {
        return {
            code:this.$route.params.code,
            frm:{},
            list:[]
        };
    },

    mounted() {
        this.index();
    },
    beforeRouteUpdate (to, from, next) {
        this.code = to.params.code;
        this.index();
        next();
    },
    methods: {
        async index(page=1){
            this.frm.page = page;
            try {
                let url = '';
                if (this.code == 'maker') url = `/api/shop/maker`;
                else url = `/api/shop/listing/${this.code}`;
                const res = await ax.get(url, { params: this.frm});
                if (res && res.status === 200) {
                    this.list = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.col a { padding:0.2rem 0; display:block; text-align: center; }
.col a:hover { background:#f5f5f5; }
.col a img { width:100%; height:180px; object-fit:cover; float: left; margin-right: 1rem; }
.col.maker a img { width:218px; height:105px; }

</style>