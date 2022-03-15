<template lang="html">
    <span>
        <b-badge v-if="value == 'DONOT'" variant="dark">접수</b-badge>
        <b-badge v-else-if="value == 'DOING'" variant="primary">처리중</b-badge>
        <b-badge v-else-if="value == 'DONE'" variant="info">처리완료</b-badge>
        <b-badge v-else-if="value == 'CANCEL'" variant="danger">취소</b-badge>
    </span>
</template>
<script> export default { props: ['value'], } </script>
