<template>
    <section class="science-application layout">
        <header>
            <ul>
                <li>
                    <b-link :to="{name: 'application'}">
                        Science <br />
                        <span><b>A</b>pplication</span>
                    </b-link>
                </li>
                <li v-if="part_nm">
                    <b-link :to="{name: 'application_part'}">
                        <span v-html="part_nm"></span>
                    </b-link>
                </li>
                <li v-if="bundle_nm">{{bundle_nm}}</li>
            </ul>
        </header>
        
        <router-view />
               
    </section>
</template>

<script>
export default { 
    name: 'ApplicationLayout',
    data() {
        return {
            part_nm: null,
            bundle_nm: null,
        };
    },
    watch: {
        '$route.params.part': {
            immediate: true,
            handler(part) {
                this.loadPartData(part);
            },
        },
        '$route.params.bundle': {
            immediate: true,
            handler(bundle) {
                this.loadBundleData(bundle);
            },
        },
    },
    methods: {
        async loadPartData(part) {
            this.part_nm = null;
            if (!part) return;
            try {
                const part_info = await import(
                    /* webpackInclude: /part_info\.js$/ */
                    /* webpackChunkName: "application" */
                    `./${part}/part_info.js`
                );
                this.part_nm = part_info.info.name;
            } catch (e) {
                console.error('List.vue loadList 오류:', e);
                console.error('part:', part);
                this.loadError = true;
            }
        },
        async loadBundleData(bundle) {
            this.bundle_nm = null;
            if (!bundle) return;
            const part = this.$route.params.part;

            try {
                const bundle_info = await import(
                    /* webpackInclude: /bundle_.*\.js$/ */
                    /* webpackChunkName: "application" */
                    `./${part}/bundle_${bundle}.js`
                );
                this.bundle_nm = bundle_info.info.hero.title;
            } catch (e) {
                console.error('List.vue loadList 오류:', e);
                console.error('part:', part);
                this.loadError = true;
            }
        },

        goToIndex() {            
            this.$router.push(`/application`);
        },
    }, 
}
</script>

<style scoped>
.science-application { padding:23px 0; }
.science-application header { margin-bottom:21px; }
.science-application header ul { display:flex; align-items:flex-end; gap:16px; }
.science-application header ul li { display: flex; align-items: center; }
.science-application header ul li + li::before { content: '>'; color:#0F86DA; margin-right:16px; font-weight:900; font-size:22px; }
.science-application header ul li,
.science-application header ul li a { font-weight:700; color:#0F86DA; line-height:1; font-size:22px; }
.science-application header ul li:first-child a { font-weight:300; font-size:55px; }
.science-application header ul li:first-child a span { font-weight:900; }
.science-application header ul li:first-child a span b { color:#51B94A; }
</style>