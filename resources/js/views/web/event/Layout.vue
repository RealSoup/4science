<template>
<div class="w_fence">
    <img v-if="checkTheEndOfTheEvent" id="event_close" src="/storage/event/event_close.png" />
       
    <router-view v-else></router-view>
</div>    
</template>

<script>
export default { 
    name: "WebEventLayout", 
    computed: {
        checkTheEndOfTheEvent(){ return !['no'].includes(this.$route.name); },
    },
}
</script>

<style lang="css" scoped>
.w_fence #event_close { max-width:500px; margin:auto; display:block; }
</style>