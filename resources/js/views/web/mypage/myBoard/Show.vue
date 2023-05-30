<template>
    <show />
</template>
<script>
export default {
    name: 'MyBoardShow',
    components: { 'show': () => import('@/views/web/board/Show.vue'), },   
}
</script>
