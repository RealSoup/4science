<template>
<b-container class="p_wrap">

    <h1>메인 슬라이드 상품</h1>

    <b-row class="act_ctrl">
        <b-col>6개 표시</b-col>
        <b-col class="text-right">
            <b-button size="sm" variant="primary" @click="update">적용</b-button>
        </b-col>
    </b-row>

    <div class="box">
        <draggable :list="list" handle=".handle" class="row list">
            <b-col v-for="(sw, i) in list" :key="sw.sw_id" cols="4" col>
                <b-button variant="info" class="handle"><b-icon-arrows-move></b-icon-arrows-move></b-button>
                <b-button variant="danger" class="btn_del" @click="destroy(i)"><b-icon-x-square></b-icon-x-square></b-button>
                <b-img :src="sw.image_src_thumb[0]" />
                <p>{{sw.gd_name}}</p>
                <b-form-input v-model="sw.sw_group" placeholder="베너 타이틀"></b-form-input>
                <b-form-input v-model="sw.sw_memo" placeholder="베너 설명"></b-form-input>
            </b-col>
            <b-col cols="2" col class="addColumn" v-if="list.length < 6">
                <CatnoSearch :group="list" :sw_seq="list.length"></CatnoSearch>
            </b-col>
        </draggable>
    </div>   

</b-container>
</template>

<script>
import ax from '@/api/http';
import draggable from 'vuedraggable';
import CatnoSearch from '@/views/admin/site/_comp/CatnoSearch';

export default {
    name: 'AdmSiteBannerGoods',
    components: { 
        draggable,
        CatnoSearch,
    },
    data() { return { list: [], }; },
    methods: {
        async index() {
            const res = await ax.get(`/api/admin/site/bannerGoods`);
            if (res && res.status === 200)
                this.list = res.data;
        },
        async update(){            
            const res = await ax.post(`/api/admin/site/bannerGoodsUpdate`, {list: this.list});
            if (res && res.status === 200)
                Notify.toast('success', '수정 완료');
        },

        destroy(i) { this.list.splice(i, 1); }
    },
    mounted() {
        this.index();
    },
}
</script>

<style scoped>
.list .col { text-align:center; overflow:hidden; margin:2rem; }
.list .col.addColumn { display: flex; align-items: center; margin-bottom: 10rem; overflow: visible; }
.list .col img { width:213px; height:213px; object-fit:cover; }
.list .col button { position:absolute; top:0; transform:translateY(-120%); transition:transform 0.5s ease; }
.list .col span { margin-top:.5rem; display:inline-block; }
.list .col .handle { left:50%; transform:translateX(-50%) translateY(-120%); }
.list .col .btn_del { right:15px; }
.list .col:hover .handle { transform:translateX(-50%) translateY(0); }
.list .col:hover .btn_del { transform:translateY(0); }
</style>
