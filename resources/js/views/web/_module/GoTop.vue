<template>
<div class="go_top_box list_item" :class="{view_go_top:viewGoTop}">
    <transition name="fade">
        <b-button class="go_top" v-if="viewGoTop" @click="scrollToTop"><b-icon-caret-up /></b-button>
    </transition>
</div>
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
.go_top_box { position:fixed; width:50px; bottom:1%; right: 7%; }
.go_top_box .go_top { width:100%; height:100%; border-radius:100%; font-size:3rem; display:flex; align-items:center; justify-content:center; background-color: #000; }
.go_top_box .go_top .fade-enter-active,
.go_top_box .go_top .fade-leave-active { transition: opacity .5s; }
.go_top_box .go_top .fade-enter,
.go_top_box .go_top .fade-leave-to { opacity: 0; }

.go_top_box { height:0; transition:height .7s ease;}
.go_top_box.view_go_top { height:50px; }
</style>
