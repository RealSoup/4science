<template>
<ul id="category" :class="{all_focus:all_focus}" @mouseenter="all_focus=true" @mouseleave="all_focus=false, $emit('close_cate')">
    <li v-for="ca in category" :key="ca.ca_id" @mouseenter="ca.sub_show=true" @mouseleave="ca.sub_show=false" :class="{focus:ca.sub_show}">
        <b-link class="dep01" @click.stop="ca.sub_show=false, $emit('close_cate')" :to="{name: 'goods_index', query: {ca01:ca.ca_id}}">
            {{ca.ca_name}}
        </b-link>
        <CateSub v-if="ca.sub_show && ca.sub.length" :depth='1' :cate="ca.sub" :paramLink="'/'+ca.ca_id" />
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
        } 
    },
    computed: { ...mapState('category', ['category']), },
} 
</script>

<style lang="css" scoped>

#category { background:#FFF; position:absolute; z-index:17; box-shadow: 0 5px 10px rgba(0,0,0,.3); overflow-y:auto; overflow-x:hidden; }
#category.all_focus { width:100%; }
#category >>> li { line-height:1em; width:11.25em; }
#category >>> li a { padding:.6em .4em; display: inline-block; font-size:.85em; width:100%; letter-spacing:-1px; } 
#category >>> li.focus>ul { width:calc(100% - 11.25em); }
#category >>> li.focus>a,
#category >>> li a:hover { background-color:#4F708F; color:#FFF; font-weight:900; padding:1.3em .4em; }
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
