<template>
<footer id="footer">Copyright &copy; iNexus 4science 사업부 © 2013-{{currentYear}}</footer>
</template>
<script>
export default {
    name:"Footer",
    computed: { currentYear () { return new Date().getFullYear(); }, },
}
</script>
<style lang="css" scoped> footer { text-align:center; border-top:1px solid #0c8497; border-radius:5px; padding-top:5px; margin-top:3rem; } </style>