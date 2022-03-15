<template>
    <div id="categorys">
        <cate-sub
            :sub_show = 'sub_show'
            :depth = '0'
            :cate = "ca.sub"
            :paramLink = '0'
        >
        </cate-sub>
    </div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'category',
    props: ['sub_show'],
    components: {
        'CateSub': () => import('./CateSub.vue'),
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
                Notify.consolePrint(e);
            }
        },
    },
    mounted() {
        this.index();
    },

}
</script>

<style media="screen">
#categorys { position:absolute; bottom:0; z-index:1050; width:100%; height:20px; }
/*#categorys ul { background-color:#FFF; position:absolute; top:0; left:0; width:15rem; height:15rem; }*/

/* Modal */
/*.rs_modal,
.overlay { width: 100%; height: 100%; position: fixed; left: 0; top: 0; }
.rs_modal { z-index:1050; }
.rs_modal .overlay { opacity: 0.5; background-color: black; }
.rs_modal .rs_modal-card { position: relative; max-width: 80%; margin: auto; margin-top: 30px; padding: 20px; background-color: white; min-height: 500px; z-index: 10; opacity: 1; }*/
</style>
