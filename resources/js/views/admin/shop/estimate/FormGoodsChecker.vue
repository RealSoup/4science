<template lang="html"></template>
<script> export default { mounted() { this.$emit('calculator'); }, } </script>
<!--
    FormGoods 컴포넌트가 마운트되고
    부모 컴포넌트에서 데이터가 디비에서 로드되고
    2가지 모두 되면 calculator함수 실행해서 금액계산을 해야하는데
    2가지 모두 될때의 시점을 나타내는 컴포넌트이다.
-->
