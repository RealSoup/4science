<template>
<div>
    <lazy-loader v-if="node.is_leaf" :node="node"></lazy-loader>

    <template v-else v-for="(child, key) in node">
        <recursive-list v-if="key !== 'is_leaf' && typeof child === 'object'" :node="child" :key="key"></recursive-list>
    </template>
</div>
</template>

<script>

import LazyLoader from './LazyLoader';

export default {
    name: 'recursive-list',
    props: {
        node: { type: [Object, Array], required: true }
    },
    components: {
        LazyLoader,
    }
}
</script>