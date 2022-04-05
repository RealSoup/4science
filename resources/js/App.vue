<template>
<div id="site">
    <perfect-scrollbar @ps-scroll-y="onScroll" ref="scrollbar">
        <component :is="choiceHeader"></component>
        <main :class="{'layout' : this.$route.name !== 'main' && this.$route.name !== 'adm_ledger'}"><router-view /></main>
        <component
            :is="choiceFooter"
            @scrollToTop="scrollToTop"
        ></component>
    </perfect-scrollbar>
</div>
</template>

<script>
import WebHead      from '@/views/web/_layouts/Header.vue';
import WebFooter    from '@/views/web/_layouts/Footer.vue';
import HeaderSimple from '@/views/web/_layouts/HeaderSimple.vue';
import AdmHead      from '@/views/admin/_layouts/Header.vue';
import AdmFooter    from '@/views/admin/_layouts/Footer.vue';
import { mapState } from 'vuex'

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
        ...mapState('scroll', ['scroll']),
    },

    methods: {
        onScroll(e) {
            this.$store.commit('scroll/setScrollY', this.$refs.scrollbar.ps.scrollbarYTop);
        },
        scrollToTop(){
            this.intervalId = setInterval(() => {
                if (this.$refs.scrollbar.ps.scrollbarYTop === 0) { clearInterval(this.intervalId) }
                this.$refs.scrollbar.$el.scrollTop = this.$refs.scrollbar.ps.scrollbarYTop - 1;
            }, 20);
        },
    },

    mounted() {
        this.$store.dispatch('category/indexAll');
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
#site, #site .ps { height:100%; }
#header { margin-bottom:1rem; }
#footer { margin:6rem auto; padding:2rem 0; }
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
.btn-xm, .btn-group-xm > .btn { padding:.2rem .25rem; font-size:.7rem; line-height: 1; }

.bd_red { border:1px solid red; }
.bd_blue { border:1px solid blue; }



.awesome_p { position:relative; }
.awesome_p input,
.awesome_p textarea { border:1px solid #EEE; width:100%; padding:.4rem .7rem .3rem; font-size:.95rem; color:#888; border-radius:.24rem; transition: all 0.2s ease; }
.awesome_p textarea { height:100%; }
.awesome_p>label { display:block; position:absolute; top:.5rem; white-space:nowrap; color:#AAA; margin-left:10px; padding:0 3px; font-size:.8rem; cursor:text; z-index:3; transition: all 0.2s ease; }

.awesome_p input:focus,
.awesome_p textarea:focus { outline:0; }
.awesome_p input:focus,
.awesome_p textarea:focus,
.awesome_p input:valid,
.awesome_p textarea:read-only,
.awesome_p textarea:valid { border:1px solid /*#6200EE*/#17a2b8; }
.awesome_p input:focus + label,
.awesome_p textarea:focus + label,
.awesome_p input:valid + label,
.awesome_p textarea:read-only + label,
.awesome_p textarea:valid + label { background-color:#fff; color:#17a2b8; margin-left:5px; top:-8px; transform:translateY(0); font-size:.7rem; }
.awesome_p.force label { background-color:#fff; color:#17a2b8; margin-left:5px; top:-7px; transform:translateY(0); font-size:.7rem; }
.awesome_p > button { position:absolute; bottom:6px; right:5px; padding:.2rem .25rem; font-size:.875rem; line-height:1; }

.autocomplete { position:absolute; width:90%; z-index:4; background:#fff; border:2px solid #999; min-width:17rem;}
.autocomplete li { cursor:pointer; font-size:0.9rem; padding:.5rem .75rem; color:#888; }
.autocomplete li:hover { background-color: rgba(51, 217, 178,0.2); }
.autocomplete li p { margin:.5rem 0;  }

.bd-callout { padding: 1.25rem; margin-top: 1.25rem; margin-bottom: 1.25rem; border: 1px solid #eee; border-left-width: .25rem; border-radius: .25rem }
.bd-callout h4 { margin-top: 0; margin-bottom: .25rem }
.bd-callout p:last-child { margin-bottom: 0 }
.bd-callout code { border-radius: .25rem }
.bd-callout+.bd-callout { margin-top: -.25rem }
.bd-callout-info { border-left-color: #5bc0de }
.bd-callout-info h4 { color: #5bc0de }
.bd-callout-warning { border-left-color: #f0ad4e }
.bd-callout-warning h4 { color: #f0ad4e }
.bd-callout-danger { border-left-color: #d9534f }
.bd-callout-danger h4 { color: #d9534f }
.bd-callout-primary{ border-left-color: #007bff }
.bd-callout-primaryh4 { color: #007bff }
.bd-callout-success{ border-left-color: #28a745 }
.bd-callout-successh4 { color: #28a745 }
.bd-callout-default{ border-left-color: #6c757d }
.bd-callout-defaulth4 { color: #6c757d }


.p_warp { padding:1.25rem; }
.p_warp h1 { margin:1.5rem 1rem 2rem 1rem; }
.p_warp .frm_header { position: -webkit-sticky; position:sticky; top:0; z-index:1020; box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%); background-color:#fff; padding:.3rem 0; margin:0 0 2rem; border-radius:3px; border: 1px solid #ddd; }
.p_warp .m_title { font-size:1.5rem; border-top:.25rem solid #5bc0de; border-radius:.25rem;  margin-top:4rem; margin-bottom:1.25rem; padding:.5rem 0; }










</style>
