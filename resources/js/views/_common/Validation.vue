<template>
    <div v-if="error" class="alert alert-danger">
        <div v-for="(row, idx) in error" :key="idx">{{row}}</div>
    </div>
</template>
<script>
export default { props:['error'] }
</script>
