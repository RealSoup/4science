<template>
<div id="site" :class="{'adm' : this.$store.state.mode == 'adm'}">
    
    <component :is="choiceHeader" />
    <main :class="{'layout' : this.$route.name !== 'main' && this.$route.name !== 'adm_ledger' && this.$route.name !== 'goods_index'}">
        <router-view />
    </main>
    <component :is="choiceFooter" />
    
</div>
</template>

<script>
import WebHead      from '@/views/web/_layouts/Header.vue';
import WebFooter    from '@/views/web/_layouts/Footer.vue';
import HeaderSimple from '@/views/web/_layouts/HeaderSimple.vue';
import AdmHead      from '@/views/admin/_layouts/Header.vue';
import AdmFooter    from '@/views/admin/_layouts/Footer.vue';
import ax from '@/api/http';

export default {
    name: 'app',
    components: { WebHead, WebFooter, HeaderSimple, AdmHead, AdmFooter },
    data() {
        return {
        }
    },
    computed:{
    	choiceHeader(){
        	switch(this.$store.state.mode){
            	case 'web':    return 'WebHead';  break;
                case 'adm':    return 'AdmHead';  break;
                case 'simple':  return 'HeaderSimple';  break;
            }
        },
        choiceFooter(){
        	switch(this.$store.state.mode){
            	case 'web':
                case 'simple':   return 'WebFooter';  break;
                case 'adm':     return 'AdmFooter';  break;
            }
        },
    },

    methods: {
    },

    async mounted() {
        this.$store.dispatch('category/indexAll');
        this.$store.dispatch('common/siteInfo');
    },
    // computed: {
    //     ...mapState('error', {
    //         identifyErrors: state => state.identify
    //     }),
    // },
    // watch: {
    //     identifyErrors: function(newVal, oldVal) {
    //         this.makeAlert(newVal.message);
    //     }
    // },
    // mixins:[common],
    // mounted(){
    //
    // }
}

</script>


<style type="text/css">
html, body/*, ul, li, ol, input, img, dl, dd, dt, p, div, h1, h2, h3, h4, h5, h6, form, tr, th, td*/
{ height:100%; margin:0px; padding:0px; font-family:"나눔고딕","Nanum Gothic",  "돋움", "굴림","dotum", "Gulim"; color: #333; font-size:16px; }
#site.adm { /*background:#FADBFB;*/ }
#header {  }
.layout { margin-left:auto; margin-right:auto; max-width:1500px; width:100%; }
ul, ol, li, dt, dd { list-style-type:none; margin:0px; padding:0px; }
a, a:hover { color:#333; text-decoration:none; }
.cb { clear:both; font-size:0px !important; line-height:0px !important; margin:0px !important; padding:0px !important; height:0px !important; width:0px !important; float:none !important; }
.clear-both:after { content:"&nbsp;"; display:block; clear:both; visibility:hidden; line-height:0; height:0; }
.no_item { border:1px solid #CCC; text-align:center; }
.btn_box { margin-top:1rem; }
.btn_box.btn_right { text-align:right; }
input::placeholder, textarea::placeholder { color:#CCC !important; }
label { margin-bottom:0; }
.btn .b-icon.bi, .nav-link .b-icon.bi, .dropdown-toggle .b-icon.bi, .dropdown-item .b-icon.bi, .input-group-text .b-icon.bi { font-size: 100%; }

@media (min-width: 1400px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl { max-width: 1320px; }
}
@media (min-width: 1700px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl { max-width: 1600px; }
}

.awesome_p { position:relative; }
.awesome_p input,
.awesome_p textarea { border:1px solid #EEE; width:100%; padding:.4rem .7rem .3rem; font-size:.95rem; color:#888; border-radius:.24rem; transition: all 0.2s ease; }
.awesome_p textarea { height:100%; }
.awesome_p>label { display:block; position:absolute; top:.5rem; white-space:nowrap; color:#AAA; margin-left:10px; padding:0 3px; /*font-size:.8rem;*/ cursor:text; z-index:3; transition: all 0.2s ease; }

.awesome_p input:focus,
.awesome_p textarea:focus { outline:0; }
.awesome_p input:focus,
.awesome_p textarea:focus,
.awesome_p input:valid,
.awesome_p textarea:read-only,
.awesome_p textarea:valid { border:1px solid /*#6200EE*/#17a2b8; }
.awesome_p>input:focus + label,
.awesome_p>textarea:focus + label,
.awesome_p>input:valid + label,
.awesome_p>textarea:read-only + label,
.awesome_p>textarea:valid + label { background-color:#fff; color:#17a2b8; margin-left:5px; top:-8px; transform:translateY(0); font-size:.7rem; }
.awesome_p.force>label { background-color:#fff; color:#17a2b8; margin-left:5px; top:-7px; transform:translateY(0); font-size:.7rem; }


.autocomplete { position:absolute; width:90%; z-index:4; background:#fff; border:2px solid #999; min-width:17rem;}
.autocomplete li { cursor:pointer; font-size:0.9rem; padding:.5rem .75rem; color:#888; }
.autocomplete li:hover { background-color: rgba(51, 217, 178,0.2); }
.autocomplete li p { margin:.5rem 0;  }

.p_warp { margin-top:30px; }
@media (max-width:1500px) {
    .p_warp { padding:1.25rem; }
}

.p_warp h3 { padding:20px; font-weight:bold; }
.p_warp h3:before { content: ''; border-left: 8px solid #469f8169; position: relative; left: -20px; }
.p_warp .page_ctrl { position: -webkit-sticky; position:sticky; top:0; z-index:1; background-color:#fff; padding:.3rem 0; margin:0 0 20px; border-radius:10px; border:1px solid #ddd; }
.p_warp .card { border-radius:10px; margin-bottom:20px; }
.p_warp .card.ctrl { position:sticky; top:0; padding:8px; z-index:3; border:3px solid #138496; }
.p_warp .card .tit { border-left:3px solid #17a2b8; font-weight:bold; font-size:20px; padding-left:30px; margin-bottom:20px; }

.card.adform .row { align-items:center; }
.card.adform .row > div:not(.tit) { padding:8px 5px; }
.card.adform .row .label { flex:0 0 7%; max-width:7%; text-align:right; font-weight:bold; font-size:.85rem; padding-right:15px !important; }
.card.adform .row .label.short { letter-spacing: -1px; font-size: .7rem; }
.card.adform .row .label + .type01 { flex: 0 0 9.666667%; max-width:9.666667%; }
.card.adform .row .label + .type02 { flex: 0 0 18%; max-width:18%; }
.card.adform .row .label + .type03 { flex: 0 0 26.333333%; max-width:26.333333%; }
.card.adform .row .label + .type04 { flex: 0 0 34.666667%; max-width:34.666667%; }
.card.adform .row .label + .type05 { flex: 0 0 43%; max-width:43%; }
.card.adform .row .label + .type06 { flex: 0 0 59.666667%; max-width:59.666667%; }

.card.adform .row .label + .type11 { flex: 0 0 93%; max-width:93%; }
.card.adform .row .label + .period { display:flex; align-items:center; justify-content:space-between; }
.card.adform .row .label + .period b { font-size:20px; }
.card.adform .row .label + .period input { width: calc(50% - 10px); }

.card.adform .row .col .form_icon { margin-right:2rem; }
.card.adform .row .col .form_icon svg { margin-right:.5rem; font-size:1.4rem; }

.card.adform .row div input { font-size:.85rem; padding-left:8px; padding-right:8px; }
.card.adform .row>div { position:relative; }
.card.adform .row>div button.overlap { position:absolute; bottom:15px; right:11px; padding:.2rem .25rem; font-size:.875rem; line-height:1; }
.card.adform .row>div .point { color:#dc3545; }


.card.adform .head > div { font-weight:bold; background:#666; color:#fff; }
.card.adform .btn_box { text-align:right; margin-top:1rem; padding:0 !important; }
.modal-enter-active,
.modal-leave-active { transition: opacity .3s; }
.modal-enter,
.modal-leave-to { opacity: 0; }








</style>
