<template>
    <section class="science-application layout">
        <header>
            <h2 @click="goToIndex()">Science</h2>
            <h2 @click="goToIndex()" class="title-bottom"><span>A</span>pplication</h2>
        </header>
        
        <router-view />
               
    </section>
</template>

<script>
export default { 
    name: 'ApplicationLayout',
    methods: {
        goToIndex() {            
            this.$router.push(`/application`);
        },
    }, 
}
</script>

<style scoped>
.science-application { padding:23px 0; }
.science-application header { margin-bottom:21px;  }
.science-application header h2 { font-size:55px; font-weight:300; MAX-WIDTH:400PX; color:#0F86DA; line-height:1; cursor: pointer; }
.science-application header .title-bottom { font-weight:900; }
.science-application header .title-bottom span { color:#51B94A; }
</style>