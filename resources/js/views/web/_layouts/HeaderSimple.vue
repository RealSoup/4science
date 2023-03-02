<template>
    <header id="header" class="bg-info">
        <router-link :to="{name: 'main'}"><img :src="s3url+'common/logo/logo_white.png'" /></router-link>
    </header>
</template>

<script>
export default { name: 'Header', }
</script>

<style lang="css" scoped>
#header { text-align:center; padding:1rem; }
</style>
