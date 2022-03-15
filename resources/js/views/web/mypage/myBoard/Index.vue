<template><List :papa_bo_cd="$route.params.bo_cd" /></template>
<script>
export default {
    components: {
        'List': () => import('@/views/web/board/Index.vue'),
    },   
}
</script>
