<template>
<b-container class="p_wrap">

    <h1>메인 Best 상품</h1>

    <b-row class="act_ctrl">
        <b-col>6개 표시</b-col>
        <b-col class="text-right">
            <b-button size="sm" variant="primary" @click="update">적용</b-button>
        </b-col>
    </b-row>

    <div class="box">
        <draggable :list="best" handle=".handle" class="row list">
            <b-col v-for="(sw, i) in best" :key="sw.sw_id" cols="2" col>
                <b-button variant="info" class="handle"><b-icon-arrows-move /></b-button>
                <b-button variant="danger" class="btn_del" @click="destroy(i)"><b-icon-x-square /></b-button>
                <b-img :src="sw.image_src_thumb[0]" />
                <span>{{sw.gd_name}}</span>
            </b-col>
            <b-col cols="2" col class="addColumn" v-if="best.length < 6">
                <GoodsSearch :group="best" :sw_seq="best.length" />
            </b-col>
        </draggable>
    </div>   

</b-container>
</template>

<script>
import ax from '@/api/http';
import draggable from 'vuedraggable';

export default {
    name: 'AdmSiteMainBest',
    components: { 
        draggable,
        'GoodsSearch': () => import('@/views/admin/site/_comp/GoodsSearch.vue'),
    },
    data() { return { best: [], }; },
    methods: {
        async index() {
            const res = await ax.get(`/api/admin/site/mainBest`);
            if (res && res.status === 200)
                this.best = res.data;
        },
        async update(){            
            const res = await ax.post(`/api/admin/site/mainBestUpdate`, {best: this.best});
            if (res && res.status === 200)
                Notify.toast('success', '수정 완료');
        },

        destroy(i) { this.best.splice(i, 1); }
    },
    mounted() {
        this.index();
    },
}
</script>

<style scoped>
.list .col { text-align:center; overflow:hidden; margin-bottom:2rem; }
.list .col.addColumn { display: flex; align-items: center; margin-bottom: 10rem; overflow: visible; }
.list .col img { width:213px; height:213px; object-fit:cover; }
.list .col button { position:absolute; top:0; transform:translateY(-120%); transition:transform 0.5s ease; }
.list .col span { margin-top:.5rem; display:inline-block; }
.list .col .handle { left:50%; transform:translateX(-50%) translateY(-120%); }
.list .col .btn_del { right:15px; }
.list .col:hover .handle { transform:translateX(-50%) translateY(0); }
.list .col:hover .btn_del { transform:translateY(0); }
</style>
