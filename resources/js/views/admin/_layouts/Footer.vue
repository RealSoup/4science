<template>
    <footer id="footer">
        <b-container>
            <b-row>
                <b-col>Copyright &copy; iNexus 4science 사업부 © 2013-{{currentYear}}</b-col>
            </b-row>
        </b-container>
    </footer>

</template>

<script>
export default {
    name:"Footer",
    computed: {
        currentYear () { return new Date().getFullYear(); },
    },
    
}
</script>

<style lang="css" scoped>
.col { text-align:center; border-top: 8px solid #0c8497; border-bottom: 8px solid #0c8497; border-radius: 10px; padding: 2rem; } </style>