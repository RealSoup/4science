<template>
<div id="site" :class="{'adm' : this.$store.state.mode == 'adm'}">
    
    <component :is="choiceHeader" />
    <main :class="{'layout' : 
        this.$store.state.mode !== 'adm' &&
        this.$route.name !== 'main' && 
        this.$route.name !== 'goods_index' && 
        this.$route.name !== 'outlet' && 
        this.$route.name !== 'outlet_index'
    }">
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
        if ( this.$store.state.mode !== 'simple') {
            this.$store.dispatch('category/indexAll');
            this.$store.dispatch('common/siteInfo');
        }
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
/*
@import url(https://fonts.googleapis.com/earlyaccess/nanumgothic.css);
@import url(https://fonts.googleapis.com/earlyaccess/nanumgothiccoding.css);
@import url(https://fonts.googleapis.com/earlyaccess/nanummyeongjo.css);
@import url(https://fonts.googleapis.com/earlyaccess/nanumbrushscript.css);
@import url(https://fonts.googleapis.com/earlyaccess/nanumpenscript.css);
@import url(https://cdn.jsdelivr.net/font-nanum/1.0/nanumbarungothic/nanumbarungothic.css);
*/
@import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');
html, body/*, ul, li, ol, input, img, dl, dd, dt, p, div, h1, h2, h3, h4, h5, h6, form, tr, th, td*/
{ height:100%; margin:0px; padding:0px; font-family:'NanumSquare', Dotum; color: #333; font-size:16px; }
#site.adm{ /*background:#FADBFB;*/ margin-left:15px; margin-right:15px; padding-bottom:15px; width: calc(100% - 30px);}
#header {  }
.layout { margin-left:auto; margin-right:auto; max-width:1500px !important; width:100%; }
ul, ol, li, dt, dd { list-style-type:none; margin:0px; padding:0px; }
a, a:hover { color:#333; text-decoration:none; }
.cb { clear:both; font-size:0px !important; line-height:0px !important; margin:0px !important; padding:0px !important; height:0px !important; width:0px !important; float:none !important; }
.clear-both:after { content:"&nbsp;"; display:block; clear:both; visibility:hidden; line-height:0; height:0; }
.no_item { border:1px solid #CCC; text-align:center; }
.btn_box { margin-top:3rem; text-align:center; }
.btn.btn_right { text-align:right; }

.btn.lg { width:180px; font-weight:bold; padding:13px 0px; font-size:.95rem; border-radius:5px; }
.btn.xl { width:440px; font-weight:900; padding:25px 0px; font-size:1.2rem; border-radius:8px; }

.btn.white { background-color:#FFF; border-color:#CCCCCC; color:#000; }
.btn.gray { background-color:#B7B7B7; border-color:#B7B7B7; }
.btn.blue { background-color:#0094EA; border-color:#0094EA; }
.btn.green { background-color:#51B948; border-color:#51B948; }
.btn.wd_33p { font-weight:bold; padding:25px; width:33%; border-radius:9px; border-radius:9px; font-size:1.2rem; }
input::placeholder, textarea::placeholder { color:#CCC !important; }
label { margin-bottom:0; }
.btn .b-icon.bi, .nav-link .b-icon.bi, .dropdown-toggle .b-icon.bi, .dropdown-item .b-icon.bi, .input-group-text .b-icon.bi { font-size: 100%; }

@media (min-width: 1400px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl { max-width: 1320px; }
}
@media (min-width: 1700px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl { max-width: 1600px; }
}


.w_fence { padding-top:3rem; margin-bottom:2rem; }
.w_fence h3 { margin-bottom:2rem; font-size:1.8rem; font-weight:bold; }
.w_fence h4 { font-size:1.3rem; font-weight:bold; padding:0 0 0.7rem 1.6rem; border-bottom:3px solid #000; margin-bottom:2.3rem; }


.frm_st {  }
.frm_st .row { margin-bottom:1.1rem; }
.frm_st .row .col.label_st { flex-basis:140px; max-width:140px; font-weight:bold; padding-top:6px; } 
.frm_st .row .col .need { display:inline-block; background:#FF0000; width:4px; height:4px; border-radius:2px; margin:0 0 9px 5px; }
.frm_st .row .col small { font-size:60%; }
.frm_st .row .col input,
.frm_st .row .col select,
.frm_st .row .col textarea { background:#F2F3F5; padding:2px 23px; border-width:0; font-size:.9rem; color:#898989; }
.frm_st .row .col textarea { padding:13px 23px; }
.frm_st .row .col input:focus,
.frm_st .row .col select:focus,
.frm_st .row .col textarea:focus { background:#fff; border:2px solid #959595 !important; box-shadow:unset;}
.frm_st .row .col select { background:#F2F3F5 url(https://fourscience.s3.ap-northeast-2.amazonaws.com/common/arrow_dn.gif) no-repeat right 8px center; }
.frm_st .row .col.hp { display:flex; justify-content:space-between; }
.frm_st .row .col.hp span { position:relative; flex:0 0 30%; max-width:30%; }
.frm_st .row .col.hp span:not(:last-child):after { content:'-'; position:absolute; top:6px; right:-17px; font-weight:bold; font-size:20px; color:#898989; }
.frm_st .row .col.email { display:flex; justify-content:space-between; }
.frm_st .row .col.email span { position:relative; flex:0 0 30%; max-width:30%; }
.frm_st .row .col.email span:first-child:after { content:'@'; position:absolute; top:6px; right:-23px; font-weight:bold; font-size:20px; color:#898989; }
.frm_st .row .col .btn-group-toggle .btn { border-radius:20px; border-width:1px; border-color:#ACACAC; background:#FFF; color:#000; padding:2px 0; min-width:125px; font-size:.85rem;}
.frm_st .row .col .btn-group-toggle .btn.active { border-width:2px; border-color:#1A90D6; background:#C0E7F8; font-weight:bold; }
.frm_st .row .col .btn-group-toggle .btn:focus { box-shadow:none; }
.frm_st .agree { margin-left:0; margin-right:0; }
.frm_st .agree .col { font-weight:normal; color:#fff; background:#4F708F; border-radius:10px; font-size:.9rem; display:flex; padding:18px 25px; justify-content:space-between; }
.frm_st .agree .col a { color:#fff; }
.alert.alert-danger { padding:0.1rem 1.25rem; font-size:.9rem; margin:0; flex-basis:0; flex-grow:1; max-width:100%; }



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

.p_wrap { margin-top:30px; }
@media (max-width:1500px) {
    .p_wrap { padding:1.25rem; }
}

.p_wrap h3 { padding:20px; font-weight:bold; }
.p_wrap h3:before { content: ''; border-left: 8px solid #469f8169; position: relative; left: -20px; }
.p_wrap .card { border-radius:10px; margin-bottom:20px; }
.p_wrap .card.ctrl { position:sticky; top:0; padding:8px; z-index:3; border:3px solid #138496; }
.p_wrap .card .tit { border-left:3px solid #17a2b8; font-weight:bold; font-size:20px; padding-left:30px; margin-bottom:20px; }

.card.adform .row { align-items:center; }
.card.adform .row > div:not(.tit) { padding:8px 5px; }
.card.adform .row .label { flex:0 0 7%; max-width:7%; min-width:100px; text-align:right; font-weight:bold; font-size:.85rem; padding-right:15px !important; }
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

/*  없으면 카드결제창 안보임  */
#inicisModalDiv { opacity:1 !important; }





</style>
