<template>
<b-button class="go_top m_hide" :class="{view_go_top:viewGoTop}" @click="scrollToTop"><b-icon-caret-up /></b-button>
</template>

<script>
export default {
    name:"GoTop",  
    data () { return { viewGoTop: false, } },    
    methods: {
        scrollToTop(){
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        },
        scrollListener: function (e) {
            this.viewGoTop = window.scrollY > 150;
        },        
    },
    mounted() { window.addEventListener('scroll', this.scrollListener); },
    beforeDestroy: function () { window.removeEventListener('scroll', this.scrollListener) }
}
</script>

<style lang="css" scoped>
.go_top { width:50px; border-radius:100%; font-size:2.5em; text-align:center; line-height:0; padding:0; background-color:#000; opacity:0; height:0; transition:all .5s ease; }
.go_top.view_go_top { height:50px; opacity:1; }
</style>
