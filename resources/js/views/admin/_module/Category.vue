<template lang="html">
    <b-row>
        <b-col sm="12" md="6" lg="3">
            <select class="custom-select" v-model="value.ca01" @change="getCate($event.target.value, 1)">
                <option value=0>◄ 카테고리 1 ►</option>
                <option v-for="opt in list01" :value="opt.ca_id">{{ opt.ca_name }}</option>
            </select>
        </b-col>

        <b-col sm="12" md="6" lg="3">
            <select class="custom-select" v-model="value.ca02" @change="getCate($event.target.value, 2)">
                <option value="0">◄ 카테고리 2 ►</option>
                <option v-for="opt in list02" :value="opt.ca_id">{{ opt.ca_name }}</option>
            </select>
        </b-col>

        <b-col sm="12" md="6" lg="3">
            <select class="custom-select" v-model="value.ca03" @change="getCate($event.target.value, 3)">
                <option value="0">◄ 카테고리 3 ►</option>
                <option v-for="opt in list03" :value="opt.ca_id">{{ opt.ca_name }}</option>
            </select>
        </b-col>

        <b-col sm="12" md="6" lg="3">
            <select class="custom-select" v-model="value.ca04">
                <option value="0">◄ 카테고리 4 ►</option>
                <option v-for="opt in list04" :value="opt.ca_id">{{ opt.ca_name }}</option>
            </select>
        </b-col>
    </b-row>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'ModuleCategory',
    props: ['value'],

    data() {
        return {
            list01: [],
            list02: [],
            list03: [],
            list04: [],
        };
    },
    methods: {
        async getCate(id, dp) {
            try {
                const res = await ax.get(`/api/admin/shop/category/${id}`);
                if (res && res.status === 200) {
                    if (dp < 4) { this.value.ca04 = 0; this.list04 = []; }
                    if (dp < 3) { this.value.ca03 = 0; this.list03 = []; }
                    if (dp < 2) { this.value.ca02 = 0; this.list02 = []; }
                    if (dp < 1) { this.value.ca01 = 0; }

                    switch (dp) {
                        case 0: this.list01 = res.data; break;
                        case 1: this.list02 = res.data; break;
                        case 2: this.list03 = res.data; break;
                        case 3: this.list04 = res.data; break;
                    }
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    mounted() { this.getCate(0, 0); },
}
</script>

<style lang="css" scoped>
</style>
