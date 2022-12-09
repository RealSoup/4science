<template>
    <span>
        <!--
        <b-badge v-if="value == 'DONOT'" variant="dark">접수</b-badge>
        <b-badge v-else-if="value == 'DOING'" variant="primary">처리중</b-badge>
        <b-badge v-else-if="value == 'DONE'" variant="info">처리완료</b-badge>
        <b-badge v-else-if="value == 'CANCEL'" variant="danger">취소</b-badge>
        -->
        <template v-if="value == 'DONOT'">접수</template>
        <template v-else-if="value == 'DOING'">처리중</template>
        <template v-else-if="value == 'DONE'">처리완료</template>
        <template v-else-if="value == 'CANCEL'">취소</template>
    </span>
</template>
<script> export default { props: ['value'], } </script>
