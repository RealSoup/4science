<template>
    <span>{{value}}</span>
</template>

<script>
export default {
    name:"commonResponsiveStr",
    props:['value'],
};
</script>
<style lang="css" scoped>
span { display:block; text-overflow: ellipsis;
 	white-space: nowrap;
  	overflow: hidden; }
</style>

