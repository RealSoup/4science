<template>
<div id="site" :class="{'adm' : this.$store.state.mode == 'adm'}">
    
    <component :is="choiceHeader"></component>
    <main id="site_main" :class="{'layout' : 
        $store.state.mode!=='adm' &&
        [   'main', 'goods_index', 'outlet', 'outlet_index', 'introduce_company', 
            'introduce_history', 'introduce_map', 'introduce_rule', 'rental', 'order_settle'].indexOf($route.name)==-1
    }">
        <adm-left v-if="$store.state.mode == 'adm'
                        && !$route.name.startsWith('adm_estimate_show')
                        && !['adm_estimate_create', 'adm_estimate_edit'].includes($route.name)">
        </adm-left>
        <router-view class="main_con"></router-view>
    </main>
    <component :is="choiceFooter"></component>
</div>
</template>

<script>
import WebHead      from '@/views/web/_layouts/Header.vue';
import WebFooter    from '@/views/web/_layouts/Footer.vue';
import HeaderSimple from '@/views/web/_layouts/HeaderSimple.vue';
import AdmLeft      from '@/views/admin/_layouts/Left.vue';

export default {
    name: 'app',
    components: {
        'web-head'      : WebHead, 
        'web-footer'    : WebFooter, 
        'header-simple' : HeaderSimple, 
        'adm-left'      : AdmLeft, 
    },
    data() {
        return {
        }
    },
    computed:{
    	choiceHeader(){
        	switch(this.$store.state.mode){
            	case 'web':    return 'web-head';  break;
                // case 'adm':    return 'adm-head';  break;
                case 'simple':  return 'header-simple';  break;
                case 'nothing': return false;  break;
            }
        },
        choiceFooter(){
        	switch(this.$store.state.mode){
            	case 'web':
                case 'simple':   return 'web-footer';  break;
                case 'nothing': return false;  break;
            }
        },
    },

    methods: {
    },

    async mounted() {
        if ( this.$store.state.mode !== 'simple') {
            this.$store.dispatch('category/indexAll');
            this.$store.dispatch('common/siteInfo');
            this.$store.dispatch('common/deviceType');
            this.$store.dispatch('recent_goods/index');
        }
    },
}

</script>


<style type="text/css">

@import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');
html, body { height:100%; margin:0px; padding:0px; font-family:'NanumSquare', Dotum; color: #333; font-size:16px; }
#site.adm>main { display:flex; }
#site.adm>main .main_con { flex-basis:0; flex-grow:1; max-width:100%; padding:2.5em; }
@media (max-width: 992px){ 
    #site.adm>main { display:block; } 
    #site.adm>main .main_con { padding:.5em; }
}
.container, .row, .col { padding:0; }
.row, .col { margin:0; }
.layout { margin-left:auto; margin-right:auto; max-width:1500px !important; width:100%; position:relative; }
ul, ol, li, dt, dd { list-style-type:none; margin:0px; padding:0px; }
a, a:hover { color:#333; text-decoration:none; }
.cb { clear:both; font-size:0px !important; line-height:0px !important; margin:0px !important; padding:0px !important; height:0px !important; width:0px !important; float:none !important; }
.clear-both:after { content:"&nbsp;"; display:block; clear:both; visibility:hidden; line-height:0; height:0; }
.no_item { border:1px solid #CCC; text-align:center; }
.sr-only { position:absolute !important; height:0 !important; }
.btn_box { margin-top:3rem; text-align:center; }
.btn.btn_right { text-align:right; }
.btn.xm { padding:.2rem .3rem !important; font-size:.75rem !important; line-height:1.3; border-radius:.2rem; }
.btn.sm { padding:.25rem .5rem !important; font-size:.875rem; line-height:1.5; border-radius:.2rem; }
.btn.lg { width:180px; font-weight:bold; padding:13px 0px; font-size:.95rem; border-radius:5px; }
.btn.xl { width:440px; font-weight:900; padding:1.5em 0px; font-size:1.2em; border-radius:8px; max-width:100%; }
.rubber { padding:.25rem .5rem !important; font-size:.875rem; line-height:1.5; border-radius:.2rem; }
@media (max-width: 992px){ 
    .rubber { padding:.2rem .3rem !important; font-size:.75rem !important; line-height:1.3; border-radius:.2rem; }
    input.rubber { height: calc(1.3em + 0.3rem + 2px); }
}    
.white { background-color:#FFF !important;     border-color:#CCCCCC; color:#000 !important; }
.gray { background-color:#B7B7B7 !important;   border-color:#B7B7B7; color:#FFF !important; }
.d_gray { background-color:#4E6479 !important; border-color:#4E6479; color:#FFF !important; }
.sky { background-color:#44ADF1 !important;    border-color:#44ADF1; color:#FFF !important; }
.blue { background-color:#0094EA !important;   border-color:#0094EA; color:#FFF !important; }
.mint { background-color:#00A1CB !important;   border-color:#00A1CB; color:#FFF !important; }
.d_blue { background-color:#0E4D9C !important; border-color:#0E4D9C; color:#FFF !important; }
.green { background-color:#51B948 !important;  border-color:#51B948; color:#FFF !important; }
.plum { background-color:#D70060 !important;   border-color:#D70060; color:#FFF !important; }
.red { background-color:#FF0000 !important;    border-color:#FF0000; color:#FFF !important; }
.yellow { background-color:#FECE02 !important; border-color:#FECE02; color:#fff !important; }
.orange { background-color:#F18D04 !important; border-color:#F18D04; color:#fff !important; }
.black { background-color:#000 !important;     border-color:#000; color:#FFF !important; }
.teal { background-color:#015B7E !important;   border-color:#015B7E; color:#FFF !important; }
.btn.wd_33p { font-weight:bold; padding:25px; width:33%; border-radius:9px; font-size:1.2rem; }
.btn.wd_100p { font-weight:bold; padding:25px; width:100%; border-radius:9px; font-size:1.2rem; }
input::placeholder, textarea::placeholder { color:#CCC !important; }
label { margin-bottom:0; }
.p_right { float:right; }
.btn .b-icon.bi, .nav-link .b-icon.bi, .dropdown-toggle .b-icon.bi, .dropdown-item .b-icon.bi, .input-group-text .b-icon.bi { font-size: 100%; }
.point { color:#dc3545; }

@media (min-width: 1400px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl { max-width: 1320px; }
}
@media (min-width: 1700px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl { max-width: 1600px; }
}
.m_show { display:none; }
@media (max-width: 992px){
    #site.adm {  margin:0; padding-bottom:15px; width:100%;}
    .m_show { display:block; }
    .m_hide { display:None !important; }
}

.w_fence { padding-top:3rem; margin-bottom:2rem; }
.w_fence h3 { margin-bottom:2rem; font-size:1.8rem; font-weight:bold; }
.w_fence h3.underbar { border-bottom:2px solid #000; padding:0 25px 15px 25px; margin:0 -15px 30px; }
.w_fence h4 { font-size:1.3rem; font-weight:bold; padding:0 0 0.7rem 1.6rem; border-bottom:3px solid #000; margin-bottom:2.3rem; }
@media (max-width: 992px){
    .w_fence { padding-top:1rem; padding-left: 20px; padding-right: 20px; }
    .w_fence h3 { margin-bottom:1rem; }
}


.frm_st .row { margin-bottom:1.1rem; }
.frm_st .row .col { padding-left:0; padding-right:0; }
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
.frm_st .row .col select { background:#F2F3F5 url(/storage/common/arrow_dn.gif) no-repeat right 8px center; }
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
.awesome_p>label { display:block; position:absolute; top:.3em; white-space:nowrap; color:#AAA; margin-left:10px; padding:0 3px; /*font-size:.8rem;*/ cursor:text; z-index:3; transition: all 0.2s ease; }
.awesome_p>label + button { position:absolute; top:.3em; right:.3em; }
.awesome_p input:focus,
.awesome_p textarea:focus { outline:0; }
.awesome_p input:focus,
.awesome_p textarea:focus,
.awesome_p input:valid,
.awesome_p textarea:read-only,
.awesome_p textarea:valid { border:1px solid #17a2b8; }
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


.p_wrap h3 { font-size:1.34em; font-weight:bold; }
.p_wrap h5 { border-left:4px solid #4EB8C8; font-size:1.1em; font-weight:600; padding:0.4rem 0 0 0.65rem; margin-bottom:.5em; }
.p_wrap .box { margin-top: 1em; }

.p_wrap .act_ctrl { position:sticky; top:0; padding:5px; z-index:3; background-color:#FFF; border:3px solid #4EB8C8; border-radius:.6em; }

.p_wrap .frm_sch { border:1px solid #B7B7B7; }
.p_wrap .frm_sch .row:not(:last-child) { border-bottom:1px solid #B7B7B7; }
.p_wrap .frm_sch .label { background-color:#EFF0F2; text-align:center; font-size:.95rem; flex:0 0 7%; max-width:7%; display:flex; justify-content:center; align-items:center; }
.p_wrap .frm_sch .row .label + .type01 { flex: 0 0 13%; max-width:13%; }
.p_wrap .frm_sch .row .label + .type02 { flex: 0 0 18%; max-width:18%; }
.p_wrap .frm_sch .row .label + .type03 { flex: 0 0 26%; max-width:26%; }
.p_wrap .frm_sch .row .label + .type04 { flex: 0 0 33%; max-width:33%; }
.p_wrap .frm_sch .row .label + .type05 { flex: 0 0 43%; max-width:43%; }
.p_wrap .frm_sch .row .label + .type06 { flex: 0 0 7%; max-width:7%; }
.p_wrap .frm_sch .row .label + .period { display:flex; align-items:center; justify-content:space-between; }
.p_wrap .frm_sch .row .label + .period b { font-size:20px; }
.p_wrap .frm_sch .row .label + .period input { width: calc(50% - 15px); }
.p_wrap .frm_sch .row .col { padding:.28em .5em; }
.p_wrap .frm_sch .row .col select,
.p_wrap .frm_sch .row .col input,
.p_wrap .cmain .row .col select,
.p_wrap .cmain .row .col input { padding:.2em .7em; height:calc(1.011em + .7em + 2px); font-size:.95em; }
.p_wrap .frm_sch .row .col .btn { padding:.2em .7em; font-size:.855em; min-height:28px; }
@media (max-width: 992px){
    .p_wrap .frm_sch .row .col { padding:0; }
    .p_wrap .frm_sch .label { flex:0 0 30%; max-width:30%; }
    .p_wrap .frm_sch .row .label + .type01, 
    .p_wrap .frm_sch .row .label + .type03, 
    .p_wrap .frm_sch .row .label + .type04, 
    .p_wrap .frm_sch .row .label + .type06 { flex: 0 0 70%; max-width: 70%; }
}



@media (min-width: 1700px) { .p_wrap .cmain { max-width:none; } }

.p_wrap .cmain { margin-top:1.5em; }
.p_wrap .cmain .row { margin:0; }
.p_wrap .cmain .badge { font-size:90%; padding:.35em .4em .19em .4em; }

.p_wrap .cmain .row .col { font-size:.85em; }
.p_wrap .cmain .head { background-color:#EFF0F2; border-top:1px solid #B7B7B7; border-bottom:1px solid #B7B7B7; margin-top:.2em; }
.p_wrap .cmain .head .col { font-weight:600; text-align:center; padding:.25rem 0; }
.p_wrap .cmain .list { border-left:1px solid #CCCCCC; border-right:1px solid #CCCCCC; }
.p_wrap .cmain .body { border-bottom:1px solid #CCCCCC; }
.p_wrap .cmain .body .col { padding:9px 0; text-align:center; }
.p_wrap .cmain .body .col .nametag { width:40px; height:22px; display:inline-block; font-size:.8em; padding:.2em 0; line-height:1.6em; border-radius:.2em; border-width:1px; border-style:solid; }
.p_wrap .cmain .body .col .badgetag { width:20px; height:20px; display:inline-block; text-align:center; border-radius:50%; font-weight:900; }
    

.p_wrap .page-link, 
.w_fence .page-link { min-width:40px; text-align:center; margin-left:0; border-color:#fff; }
.p_wrap .page-item.active .page-link, 
.w_fence .page-item.active .page-link { background-color:#B2E0FA; border-color:#B2E0FA; }
.p_wrap .pagination-prev-nav, 
.w_fence .pagination-prev-nav { margin-right:15px; }
.p_wrap .pagination-next-nav, 
.w_fence .pagination-next-nav { margin-left:15px; }
.p_wrap .pagination-prev-nav .page-link,
.w_fence .pagination-prev-nav .page-link,
.p_wrap .pagination-next-nav .page-link,
.w_fence .pagination-next-nav .page-link { border-color:#dee2e6; }

.price_box .normal { font-weight:bold; }
.price_box .discount { display:none; }
.price_discount { flex-direction:column; display:flex; }
.price_discount .normal { font-weight:400; color:#999; text-decoration:line-through; }
.price_discount .discount { display:inline; font-weight:900; margin-top:2px; color:#ce0000; }
.price_dealer .discount:before { content:'딜'; position:absolute; top:0; left:-12px; font-weight:bold; font-size:.9rem; background-color:#FF0000; border-radius:50%; color:#FFF; width:23px; height:23px; text-align:center; line-height:24px; }


@media (max-width: 992px){
    .p_wrap { margin:.1rem; }
    .p_wrap .cmain { border-width:0; padding:0 !important; }
}
.adform .row { align-items:center; }
.adform .row > div:not(.tit) { padding:8px 5px; }
.adform .row .label { flex:0 0 7%; max-width:7%; min-width:100px; text-align:right; font-weight:bold; font-size:.85rem; padding-right:15px !important; }
.adform .row .label.short { letter-spacing: -1px; font-size: .7rem; }
.adform .row .label + .type01 { flex: 0 0 9.666667%; max-width:9.666667%; }
.adform .row .label + .type02 { flex: 0 0 18%; max-width:18%; }
.adform .row .label + .type03 { flex: 0 0 26.333333%; max-width:26.333333%; }
.adform .row .label + .type04 { flex: 0 0 34.666667%; max-width:34.666667%; }
.adform .row .label + .type05 { flex: 0 0 43%; max-width:43%; }
.adform .row .label + .type06 { flex: 0 0 59.666667%; max-width:59.666667%; }

.adform .row .label + .type11 { flex: 0 0 93%; max-width:93%; }
.adform .row .label + .period { display:flex; align-items:center; justify-content:space-between; }
.adform .row .label + .period b { font-size:20px; }
.adform .row .label + .period input { width: calc(50% - 10px); }

.adform .row .col .form_icon { margin-right:2rem; }
.adform .row .col .form_icon svg { margin-right:.5rem; font-size:1.4rem; }

.adform .row div input { font-size:.85rem; padding-left:8px; padding-right:8px; }
.adform .row>div { position:relative; }
.adform .row>div button.overlap { position:absolute; bottom:15px; right:11px; padding:.2rem .25rem; font-size:.875rem; line-height:1; }

.adform .head > div { font-weight:bold; background:#666; color:#fff; }
.adform .btn_box { text-align:right; margin-top:1rem; padding:0 !important; }
.modal-enter-active,
.modal-leave-active { transition: opacity .3s; }
.modal-enter,
.modal-leave-to { opacity: 0; }

/*  없으면 카드결제창 안보임  */
#inicisModalDiv { opacity:1 !important; }

.est_frm.container,
.est_frm .container { padding-right:0; padding-left:0; }
.est_frm .row { margin-left:0; margin-right:0; }
.est_frm div.row:first-of-type { border-top:3px solid #4F637B; }
.est_frm div.row:last-of-type { border-bottom:3px solid #4F637B; }
.est_frm .row .col{ padding:7px 0; }
.est_frm .row .col:not(:last-of-type)  { border-right:1px solid #D7D7D7; }
.est_frm .row:not(:last-of-type) .col  { border-bottom:1px solid #D7D7D7; }
.est_frm .row .col:nth-child(odd) { flex:0 0 16%; max-width:16%; background-color:#F2F3F5; font-weight:600; display:flex; align-items:center; justify-content:center; }
.est_frm .row .col:nth-child(even) { padding-left:1.5%; }
.est_frm .row .col input { width:60%; height:calc(1.5em + 0.5rem + 2px); padding:.25rem .5rem; font-size:.875rem; line-height:1.5; border-radius:.2rem; }

.frm01 .row .col{ padding:7px 0; }
.frm01>div.row:first-of-type { border-top:3px solid #4F637B; }
.frm01>div.row:last-of-type { border-bottom:3px solid #4F637B; }
.frm01 .row:not(:last-of-type) .col  { border-bottom:1px solid #D7D7D7; }
.frm01 .row .col:nth-child(odd) { flex:0 0 16%; max-width:16%; background-color:#F2F3F5; font-weight:600; display:flex; align-items:center; justify-content:center; }
.frm01.n3 .row .col:nth-child(odd) { flex:0 0 10%; max-width:10%; }
.frm01 .row .col:nth-child(even) { padding-left:.8%; padding-right: .8%; }


.label_form { position:relative; border-top:3px solid #4F637B; border-bottom:3px solid #4F637B;}
.label_form>.col { border-bottom:1px solid #D7D7D7; flex:0 0 50%; max-width:50%; display:flex; align-items:center; justify-content:center; }
.label_form.quarter>.col { flex:0 0 25%; max-width:25%; }
.label_form>.col.w_50 { flex:0 0 50%; max-width:50%; }
.label_form>.col.w_50>label { flex:0 0 16%; max-width:16%; }
.label_form>.col.w_100 { flex:0 0 100%; max-width:100%; }
.label_form>.col.w_100>label { flex:0 0 16%; max-width:16%; }
.label_form>.col>* { flex-basis:0; flex-grow:1; max-width: 100%; }
.label_form>.col>label { position:relative; border-right:1px solid #D7D7D7; flex:0 0 32%; max-width:32%; padding:7px 0; font-weight:600; background-color:#F2F3F5; display:flex; align-items:center; justify-content:center; height:100%; font-size:.85em; }
.label_form>.col>label+div { padding:0 12px; width:100%; }
.label_form>.col.w_100>label+div { padding:6px 12px; }
.label_form>.col:nth-child(even)>label { border-left:1px solid #D7D7D7; }



@media (max-width: 992px){
    .label_form { padding-top:7px; }
    .label_form>.col { flex-direction:column; align-items:flex-start; margin-bottom:.5em; border-bottom-width:0; }
    .label_form>.col label  { background-color:inherit; border-right-width:0; max-width:100%; padding:0 0 0 10px; font-size:.85em; }
    .label_form>.col:nth-child(even) label { border-left-width:0; }
    .label_form>.col.w_100>label { max-width:50%; }

    .label_form.quarter>.col { flex:0 0 50%; max-width:50%; }
}
</style>
