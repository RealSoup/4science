<template>
    <span :style="{ maxWidth: width+'px' }" :class="{line02:line02}">{{value.cut(200)}}</span>
</template>

<script>
export default {
    name:"SubString",
    props:['value', 'width', 'line02'],
};
</script>
<style lang="css" scoped>
span { display:inline-block; text-overflow:ellipsis; white-space:nowrap; word-wrap:normal; overflow:hidden; vertical-align:bottom }
.line02 { white-space:normal; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
</style>

