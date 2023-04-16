<template>
    <span :style="{ maxWidth: width+'px' }">{{value.cut(200)}}</span>
</template>

<script>
export default {
    name:"SubString",
    props:['value', 'width'],
};
</script>
<style lang="css" scoped>
span { display:inline-block; text-overflow:ellipsis; white-space:nowrap; word-wrap:normal; overflow:hidden; vertical-align:bottom }
</style>

