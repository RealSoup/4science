<template lang="html">
    <span>
        <b-badge v-if="value == 10" variant="dark">주문접수</b-badge>
        <b-badge v-else-if="value == 11" variant="warning">승인대기</b-badge>
        <b-badge v-else-if="value == 12" variant="warning">결제대기</b-badge>
        <b-badge v-else-if="value == 20" variant="success">결제완료</b-badge>

        <b-badge v-else-if="value == 30" variant="secondary">배송준비</b-badge>
        <b-badge v-else-if="value == 31" variant="primary">배송중</b-badge>
        <b-badge v-else-if="value == 32" variant="info">배송완료</b-badge>

        <b-badge v-else-if="value == 40" variant="light">구매확정</b-badge>
        <b-badge v-else-if="value == 50" variant="danger">주문취소</b-badge>
        <b-badge v-else-if="value == 51" variant="danger">결제실패</b-badge>
    </span>
</template>
<script> export default { props: ['value'], } </script>
