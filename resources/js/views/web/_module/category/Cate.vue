<template>
    <div id="categorys">
        <div class="background">
            <div class="layout">
                <div class="list_wrap">
                    <ul class="depth01">
                        <li
                            v-for="ca in category"
                            :key="ca.ca_id"
                            :class="{ 'active': check_query(ca.ca_id) }"
                            @mouseenter="ca.sub_show = true"
                            @mouseleave="ca.sub_show = false"
                        >
                            <b-link :to="{name: 'goods_index', query: { ca01:ca.ca_id } }">
                                <img :src="'/img/common/cate/ca_'+ca.ca_id+'.png'" />
                                <span>{{ca.ca_name}}</span>
                            </b-link>
                            <CateSub
                                :sub_show = 'ca.sub_show && ca.sub.length'
                                :depth = '1'
                                :cate = "ca.sub"
                                :paramLink="'/'+ca.ca_id"
                            />
                        </li>
                        <li>
                            <b-link :to="{name: 'goods_index' }">
                                <img :src="'/img/common/cate/ca_21.png'" />
                                <span>주문제작</span>
                            </b-link>
                        </li>
                        <div class="indicator"></div>
                    </ul>
                </div>
            </div>
        </div>
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

<style media="screen">
:root { --clr:#626C75; }
#categorys { z-index:1050; padding:40px 0 10px 0; background: var(--clr); }
#categorys .background { width:1680px; margin:auto; background:#fff; border-radius:15px; }
#categorys .background .list_wrap { display:flex; justify-content:center; align-items:center; position:relative; }
#categorys .depth01 { display:flex; }
#categorys .depth01 > li { position:relative; width:70px; height:70px; z-index:1; }
#categorys .depth01 > li a { position:relative; display:flex; justify-content:center; align-items:center; flex-direction:column; width:100%; text-align:center; }
#categorys .depth01 > li a img { position:relative; transition:.5s; width:40px; margin-top:15px; }
#categorys .depth01 > li.active a img { transform:translateY(-36px); }
#categorys .depth01 > li a span { position:absolute; transition:.5s; font-size:.7rem; letter-spacing:-1px; opacity:0; transform:translateY(30px); }
#categorys .depth01 > li.active a span { opacity:1; transform:translateY(23px); }

#categorys .depth01 > .indicator { position:absolute; top:-50%; width:0px; height:0px; background:#29fd53; border-radius:50%; border:6px solid var(--clr); transition:.5s; }
#categorys .depth01 > .indicator::before { content:''; position:absolute; top:50%; left:-23px; width:20px; height:20px; background:transparent; border-top-right-radius:26px; box-shadow:0 -10px 0 0 var(--clr); }
#categorys .depth01 > .indicator::after { content:''; position:absolute; top:50%; right:-23px; width:20px; height:20px; background:transparent; border-top-left-radius:26px; box-shadow:0 -10px 0 0 var(--clr); }


#categorys .depth01 > li:nth-child(1).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 0) ); }
#categorys .depth01 > li:nth-child(2).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 1) ); }
#categorys .depth01 > li:nth-child(3).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 2) ); }
#categorys .depth01 > li:nth-child(4).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 3) ); }
#categorys .depth01 > li:nth-child(5).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 4) ); }
#categorys .depth01 > li:nth-child(6).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 5) ); }
#categorys .depth01 > li:nth-child(7).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 6) ); }
#categorys .depth01 > li:nth-child(8).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 7) ); }
#categorys .depth01 > li:nth-child(9).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 8) ); }
#categorys .depth01 > li:nth-child(10).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 9) ); }
#categorys .depth01 > li:nth-child(11).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 10) ); }
#categorys .depth01 > li:nth-child(12).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 11) ); }
#categorys .depth01 > li:nth-child(13).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 12) ); }
#categorys .depth01 > li:nth-child(14).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 13) ); }
#categorys .depth01 > li:nth-child(15).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 14) ); }
#categorys .depth01 > li:nth-child(16).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 15) ); }
#categorys .depth01 > li:nth-child(17).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 16) ); }
#categorys .depth01 > li:nth-child(18).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 17) ); }
#categorys .depth01 > li:nth-child(19).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 18) ); }
#categorys .depth01 > li:nth-child(20).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 19) ); }
#categorys .depth01 > li:nth-child(21).active ~ .indicator { width:70px; height:70px; transform:translateX( calc(70px * 20) ); }

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
