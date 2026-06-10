<template></template>
<script>
export default {
    name:"ModulePersonVerificationIndex",
    async mounted() {        
        if (window.opener) {
            if (this.$route.query.is_adult == 'true')
                window.opener.postMessage('adult_true');
            else if (this.$route.query.is_adult == 'false')
                window.opener.postMessage('adult_false');
        }
        console.log(this.$route.query);
        self.close();
    }
}
</script>