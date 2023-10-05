<template>
<b-container id="adm_estimate_create" class="p_wrap">

    <h1>메인 카테고리별 추천 상품</h1>

    <b-card class="shadow mt-4">
        <template #header>
            <b-row>
                <b-col cols="4">
                    <b-form-select size="sm" v-model="sw_group" @change="getSw($event)">
                        <b-form-select-option v-for="ca in category" :key="ca.ca_id" :value="ca.ca_id">
                            {{ca.ca_name}}
                        </b-form-select-option>
                    </b-form-select>
                </b-col>
            </b-row>
        </template>
        <b-container fluid>
            <draggable :list="show_window" handle=".handle" class="row mt-4 list" @change="updateSeq">
                <b-col v-for="(sw, i) in show_window" :key="sw.sw_id" cols="2" col>
                    <b-button variant="info" class="handle"><b-icon-arrows-move /></b-button>
                    <b-button variant="danger" class="btn_del" @click="destroy(i)"><b-icon-x-square /></b-button>
                    <b-img :src="sw.goods.image_src_thumb[0]" />
                    <span>{{sw.goods.gd_name}}</span>
                </b-col>
                <b-col cols="2" col class="addColumn" v-if="show_window.length < 12">
                    <GoodsSearch :group="show_window" :sw_group="sw_group" :sw_seq="show_window.length" />
                </b-col>
            </draggable>
        </b-container>
        <template #footer>
            <b-row>
                <b-col class="text-right">
                    <b-button size="sm" variant="primary" @click="update">적용</b-button>
                </b-col>
            </b-row>
        </template>
    </b-card>

</b-container>
</template>

<script>
import ax from '@/api/http';
import draggable from 'vuedraggable';

export default {
    name: 'AdmSiteMainCateGoods',
    components: { 
        draggable,
        'GoodsSearch': () => import('@/views/admin/site/_comp/GoodsSearch.vue'),
    },
    data() {
        return {
            show_window: [],
            category: {},
            sw_group: {},
            del_list: [],
        };
    },
    computed: {

    },
    methods: {
        async index(ca_id){
            const res = await ax.get(`/api/admin/site/mainCateGoods/${ca_id}`);
            if (res && res.status === 200)
                this.show_window = res.data;
        },
        getSw(e) {
            this.index(e);
        },
        async update(){            
            const res = await ax.post(`/api/admin/site/mainCateGoodsUpdate`, {show_window: this.show_window, del_list: this.del_list});
            if (res && res.status === 200)
                Notify.toast('success', '수정 완료');      
        },
        updateSeq() {
            this.show_window.forEach((sw, i) => sw.sw_seq = i);
        },
        destroy(i) {
            this.del_list.push( this.show_window[i].sw_id );
            this.show_window.splice(i, 1);
        }
    },
    async mounted() {
        const res = await ax.get(`/api/admin/shop/category/0`);
        if (res && res.status === 200) {
            this.category = res.data;
            this.sw_group = res.data[0].ca_id
            this.index(res.data[0].ca_id);
        }
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
