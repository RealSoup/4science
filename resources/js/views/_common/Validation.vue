<template>
    <div v-if="error">
        <div v-for="(row, idx) in error" :key="idx" class="alert alert-danger">{{row}}</div>
    </div>
</template>
<script>
export default { props:['error'] }
</script>
