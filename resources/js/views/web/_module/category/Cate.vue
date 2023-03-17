<template>
    <div id="categorys">
        <ul class="depth01 layout">
            <li
                v-for="ca in category"
                :key="ca.ca_id"
                :class="{ 'active': check_query(ca.ca_id) }"
                @click="ca.sub_show = true"
                @mouseleave="ca.sub_show = false"
            >
                <span class="ca01">
                    <img v-if="check_query(ca.ca_id) || ca.sub_show" :src="s3url+'common/cate/'+ca.ca_id+'_.png'" />
                    <img v-else :src="s3url+'common/cate/'+ca.ca_id+'.png'" />
                </span>
                <CateSub
                    :sub_show   = 'ca.sub_show && ca.sub.length'
                    :depth      = '1'
                    :cate       = "ca.sub"
                    :paramLink  = "'/'+ca.ca_id"
                    :papaName   = "ca.ca_name"
                />
            </li>
            <li>
                <b-link :to="{name: 'estimate_custom_index' }" class="ca01">
                    <img :src="s3url+'common/cate/custom.png'" />
                    <!-- <span>주문제작</span> -->
                </b-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ModuleCategory',

    components: {
        'CateSub': () => import('./CateSub.vue'),
    },

    computed: {
        ...mapState('category', ['category']),
    },

    methods: {
        check_query: function (ca01) {
        	return this.$route.query.ca01 == ca01 ? true : false;
        },
    },
} 
</script>

<style lang="css" scoped>
#categorys { background:#626C75; z-index:16; position:relative; }
#categorys .depth01 { display:flex; }
#categorys .depth01 > li { width:4.761904%; }
#categorys .depth01 > li .ca01 { display:flex; align-items:center; flex-direction:column; padding:10.5px 5px; overflow:hidden; cursor:pointer; }
#categorys .depth01 > li:first-of-type .ca01 { padding-left:0; }
#categorys .depth01 > li:last-of-type .ca01 { padding-right:0; }
#categorys .depth01 > li .ca01 img { margin-bottom:2px; }
#categorys .depth01 > li .ca01 span { transition:.3s; font-size:.2rem; letter-spacing:-4px; color:#FFF; white-space: nowrap; }
#categorys .depth01 > li.active .ca01 span,
#categorys .depth01 > li:hover .ca01 span { color:#FFF200; font-weight:bold; font-size:.8rem; letter-spacing:-1px; z-index:2; background:#626C75; padding:0 10px; }



/* #categorys { z-index:1050; background-color:#616C74; }
#categorys ul { display:flex; }
#categorys ul li { flex: 1 1 auto; }
#categorys ul li img { display:block; margin:auto; }
#categorys ul li a { display:block; text-align:center; color:#FFF; font-size:.7rem; letter-spacing:-1px; } */
/*#categorys ul { background-color:#FFF; position:absolute; top:0; left:0; width:15rem; height:15rem; }*/

/* Modal */
/*.rs_modal,
.overlay { width: 100%; height: 100%; position: fixed; left: 0; top: 0; }
.rs_modal { z-index:1050; }
.rs_modal .overlay { opacity: 0.5; background-color: black; }
.rs_modal .rs_modal-card { position: relative; max-width: 80%; margin: auto; margin-top: 30px; padding: 20px; background-color: white; min-height: 500px; z-index: 10; opacity: 1; }*/
</style>
