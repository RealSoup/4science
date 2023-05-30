<template>
    <list :papa_bo_cd="$route.params.bo_cd" />
</template>
<script>
export default {
    components: {
        'list': () => import('@/views/web/board/Index.vue'),
    },   
}
</script>
