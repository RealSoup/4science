<template>
    <div id="categorys">
        <tree-view
            :cateOpen = 'cateOpen'
            :depth = '0'
            :cate = "ca.sub"
            :paramLink = '0'
        >
        </tree-view>
    </div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'category',
    props: ['cateOpen'],
    components: {
        'TreeView': () => import('./TreeView.vue'),
    },
    data() {
        return {
            ca:{
                "ca_id": 0,
                "ca_papa": 0,
                "ca_name": "카테고리",
                "ca_seq": 0,
                "childCnt": 0,
                "sub": []
            },
        };
    },
    methods: {
        async index(){
            try {
                const res = await ax.get(`/api/category/all`);
                if (res && res.status === 200)
                    this.ca.sub = res.data;
            } catch (e) {
                this.errorConsolePrint(e);
            }
        },
    },
    mounted() {
        this.index();
    },

}
</script>

<style media="screen">
#categorys { position:absolute; bottom:0; z-index:99999; width:100%; }
#categorys ul { background-color:#FFF; position:absolute; top:0; left:0; width:15rem; height:15rem; }

</style>
