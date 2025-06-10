<template>
<div>

     <!-- 현재 노드에 data가 있으면 출력 -->
    <list v-if="node.data" :gd_list="node.data"></list>

    <!-- 자식 노드도 계속 탐색 -->
    <template v-for="(child, key) in node">
        <!-- 단, node.data 같은 예약 키는 건너뛰기 -->
        <recursive-list v-if="key !== 'data'" :node="child" :key="key"></recursive-list>
    </template>
</div>
</template>

<script>
export default {
    name: 'recursive-list',
    props: {
        node: {
            type: [Object, Array],
            required: true
        }
    },
    components: {
        'list': () => import('./List.vue'),
        'recursive-list': () => import('./RecursiveList.vue')
    }
}
</script>
