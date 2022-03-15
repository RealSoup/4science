<template lang="html">
    <b-row>
        <b-col sm="12" md="6" lg="3">
            <select class="custom-select" id="ca01" v-model="value.ca01" @change="select_cate($event, 1)">
                <option value=0>◄ 카테고리 1 ►</option>
                <option v-for="opt in categorys[0]" :value="opt.ca_id">{{ opt.ca_name }}</option>
            </select>
        </b-col>

        <b-col sm="12" md="6" lg="3">
            <select class="custom-select" v-model="value.ca02" @change="select_cate($event, 2)">
                <option value="0">◄ 카테고리 2 ►</option>
                <option v-for="opt in categorys[1]" :value="opt.ca_id">{{ opt.ca_name }}</option>
            </select>
        </b-col>

        <b-col sm="12" md="6" lg="3">
            <select class="custom-select" v-model="value.ca03" @change="select_cate($event, 3)">
                <option value="0">◄ 카테고리 3 ►</option>
                <option v-for="opt in categorys[2]" :value="opt.ca_id">{{ opt.ca_name }}</option>
            </select>
        </b-col>

        <b-col sm="12" md="6" lg="3">
            <select class="custom-select" v-model="value.ca04">
                <option value="0">◄ 카테고리 4 ►</option>
                <option v-for="opt in categorys[3]" :value="opt.ca_id">{{ opt.ca_name }}</option>
            </select>
        </b-col>
    </b-row>
</template>

<script>
import ax from '@/api/http';
export default {
    props:['value', 'categorys'],
    methods: {
        select_cate(e, depth) {
            depth = parseInt(depth);
            let val = parseInt(e.target.value);

            if (depth < 4) {
                this.v_model.gd_ca_id04 = 0;
            }

            if (depth < 3) {
                this.$set(this.categorys, 3, {});
                this.v_model.gd_ca_id03 = 0;
            }

            if (depth == 1) {
                this.$set(this.categorys, 2, {});
                this.v_model.gd_ca_id02 = 0;
            }

            if (depth < 4 && val > 0)
                this.getCate(val, depth);
        },
        async getCate(ca_id, depth){
            try {
                const res = await ax.get(`/api/admin/shop/category/${ca_id}`);
                if (res && res.status === 200 && res.data.length)
                    this.$set(this.categorys, depth, res.data);
                else
                    this.$set(this.categorys, depth, {});
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
}
</script>