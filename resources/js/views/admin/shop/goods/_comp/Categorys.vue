<template>
    <b-row>
        <b-col class="label">카테 1</b-col>
        <b-col class="type01">
            <select class="custom-select custom-select-sm" v-model="value.ca01" @change="getCate($event.target.value, 1), prevValueClear(1)">
                <option value="0"></option>
                <option v-for="opt in list01" :value="opt.ca_id" :key="opt.ca_id">{{ opt.ca_name }}</option>
            </select>
        </b-col>

        <b-col class="label">카테 2</b-col>
        <b-col class="type01">
            <select class="custom-select custom-select-sm" v-model="value.ca02" @change="getCate($event.target.value, 2), prevValueClear(2)">
                <option value="0"></option>
                <option v-for="opt in list02" :value="opt.ca_id" :key="opt.ca_id">{{ opt.ca_name }}</option>
            </select>
        </b-col>

        <b-col class="label">카테 3</b-col>
        <b-col class="type01">
            <select class="custom-select custom-select-sm" v-model="value.ca03" @change="getCate($event.target.value, 3), prevValueClear(3)">
                <option value="0"></option>
                <option v-for="opt in list03" :value="opt.ca_id" :key="opt.ca_id">{{ opt.ca_name }}</option>
            </select>
        </b-col>

        <b-col class="label">카테 4</b-col>
        <b-col class="type01">
            <select class="custom-select custom-select-sm" v-model="value.ca04">
                <option value="0"></option>
                <option v-for="opt in list04" :value="opt.ca_id" :key="opt.ca_id">{{ opt.ca_name }}</option>
            </select>
        </b-col>

        <b-col class="label">우선순위상품</b-col>
        <b-col class="type00">
            <select class="custom-select custom-select-sm" v-model="value.gd_seq">
                <option value=""></option>
                <option value="Y">활성</option>
            </select>
        </b-col>
    </b-row>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'admShopGoods_compCategory',
    props: ['value'],
    data() {
        return { list01:[], list02:[], list03:[], list04:[] };
    },
    methods: {
        async getCate(id, dp) {
            const res = await ax.get(`/api/admin/shop/category/${id}`);
            if (res && res.status === 200) {
                switch (dp) {
                    case 0: this.list01 = res.data; break;
                    case 1: this.list02 = res.data; break;
                    case 2: this.list03 = res.data; break;
                    case 3: this.list04 = res.data; break;
                }
            }
        },

        prevValueClear (dp) {
            if (dp < 4) { this.value.ca04 = 0; this.list04 = []; }
            if (dp < 3) { this.value.ca03 = 0; this.list03 = []; }
            if (dp < 2) { this.value.ca02 = 0; this.list02 = []; }
            if (dp < 1) { this.value.ca01 = 0; }
        },
    },
        
    async mounted() {
        await this.getCate(0, 0);
        if (this.value.ca01) await this.getCate(this.value.ca01, 1);
        if (this.value.ca02) await this.getCate(this.value.ca02, 2);
        if (this.value.ca03) await this.getCate(this.value.ca03, 3);
    },
}
</script>
<style scoped>
.p_wrap .frm_sch .row .type00 {
    flex: 0 0 9%;
    max-width: 9%;
}
</style>