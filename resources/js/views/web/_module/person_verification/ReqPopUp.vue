<template></template>
<script>
export default {
    name:"ModulePersonVerificationIndex",
    async mounted() {        
        if (this.$route.query.is_adult)
            window.opener.postMessage( 'adult_true' );
        else
            window.opener.postMessage( 'adult_false' );
        
        self.close();
    }
}
</script>