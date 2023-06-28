<template>
<b-tabs class="w_fence" v-model="tab">
    <b-tab title="이용약관"><rule /></b-tab>
    <b-tab title="개인정보 취급방침"><policy /></b-tab>
</b-tabs>
</template>

<script>
export default {
    name: 'IntroduceRule',
    components: {
        'rule': () =>    import('./_comp/Rule'),
        'policy': () =>    import('./_comp/Policy'),
    },
    data() { return { tab:0, } },
    mounted() {
        if (this.$route.query.type == 'policy')
            this.$nextTick(function () { this.tab=1; });
    },
};
</script>