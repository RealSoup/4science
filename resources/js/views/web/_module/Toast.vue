<template>
    <div>
      <b-button @click="makeToast()">Show Toast</b-button>
      <b-button @click="makeToast(true)">Show Toast (appended)</b-button>
    </div>
</template>


<script>
export default {
    name:"Toast",
    data() {
        return {
            toastCount: 0
        }
    },
    methods: {
        makeToast123(type) {
            this.toastCount++
            this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
                title: 'BootstrapVue Toast',
                variant: type,
                autoHideDelay: 5000,
                appendToast: true
            })
        }
    }
}
</script>
