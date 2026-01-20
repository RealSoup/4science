<template>
<ul id="category" :class="{all_focus:all_focus}" @mouseenter="all_focus=true" @mouseleave="all_focus=false, $emit('close_cate')" :style="{ maxHeight:`${cate_height}px`}">
    <li v-for="ca in category" :key="ca.ca_id" @mouseenter="set_focus(ca.ca_id)" :class="{focus:ca.sub_show, [`ca01_${ca.ca_id}`]:true}">
        <b-link class="dep01" @click.stop="ca.sub_show=false, $emit('close_cate')" :to="{name: 'goods_index', query: {ca01:ca.ca_id}}">
            <template v-if="ca.ca_id==36"><img src="/storage/common/cate/icon_36.svg" /></template>
            {{ca.ca_name}}
        </b-link>
        <CateSub v-if="ca.sub_show && ca.sub.length" :depth='1' :cate="ca.sub" :paramLink="'/'+ca.ca_id"></CateSub>
    </li>
    <li @mouseenter="custom_hover" :class="{focus:custom_focus}">
        <b-link :to="{name: 'estimate_custom_index' }">주문제작</b-link>
    </li>
    <li @mouseenter="eng_reform_hover" :class="{focus:eng_reform_focus}">
        <b-link :to="{name: 'engReform_create'}">영문교정</b-link>
    </li>
    
                
</ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ModuleCategory',
    components: { 'CateSub': () => import('./CateSub'), },
    data() { return { 
            all_focus: false,
            custom_focus: false,
            eng_reform_focus: false,
            cate_height:0,
        } 
    },
    computed: { ...mapState('category', ['category']), },
    methods: {
        set_focus: function (ca_id) {
            this.custom_focus = false;
            this.eng_reform_focus = false;
            Object.values(this.category).forEach(ca => {
                if (ca.ca_id == ca_id) ca.sub_show = true;
                else ca.sub_show = false;
            });
        },
        custom_hover: function () {
            this.eng_reform_focus = false;
            this.custom_focus = true;
            Object.values(this.category).forEach(ca => { ca.sub_show = false; });
        },
        eng_reform_hover: function () {
            this.custom_focus = false;
            this.eng_reform_focus = true;
            Object.values(this.category).forEach(ca => { ca.sub_show = false; });
        },
    },
    
    mounted() {
        this.cate_height = document.documentElement.clientHeight - 156;
    },
    

} 
</script>

<style lang="css" scoped>

#category { background:#FFF; position:absolute; z-index:17; box-shadow: 0 5px 10px rgba(0,0,0,.3); overflow-y:auto; overflow-x:hidden; }
#category.all_focus { width:100%; }
#category >>> li { line-height:1em; width:11.25em; }
#category >>> li a { padding:.4em; display: inline-block; font-size:.85em; width:100%; letter-spacing:-1px; text-align:left; } 
#category >>> li.ca01_36>a { color:#ff8a00; }
#category >>> li.ca01_36>a img { width:19px; }
#category >>> li.focus>ul { width:calc(100% - 11.25em); }
#category >>> li.focus>a,
#category >>> li a:hover { background-color:#4F708F; color:#FFF; font-weight:900; padding:1em .4em; }
#category >>> li ul { position:absolute; top:0; left:181px; }
#category >>> li.focus>a { font-weight:900; }




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

@media (max-width: 992px){
    #categorys .depth01 > li:first-of-type { width:0; height:0; }
    #categorys .depth01 > li:first-of-type .ca01 { padding:0; }
    #categorys .depth01 > li:not(:first-of-type) { display:none; }
    #categorys .depth01 > li:first-of-type ul { display:block !important; }
    #categorys .depth01 > li:first-of-type ul:before { content: none; }
}
</style>
