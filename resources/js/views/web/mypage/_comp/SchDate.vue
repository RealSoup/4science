<template lang="html">
    <b-row>
        <b-col>
            <b-input-group size="sm">
                <b-form-input v-model="value.startDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker size="sm" v-model="value.startDate" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
        </b-col>
        <b-col>
            <b-input-group size="sm">
                <b-form-input v-model="value.endDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker size="sm" v-model="value.endDate" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
        </b-col>
        <b-col lg="6" md="12">
            <b-button-group class="width_btn" size="sm">
                <b-button variant="primary" @click="setDate('week')">1주일</b-button>
                <b-button variant="info" @click="setDate('month')">1개월</b-button>
                <b-button variant="success" @click="setDate('3month')">3개월</b-button>
                <b-button variant="warning" @click="setDate('6month')">6개월</b-button>
                <b-button variant="danger" @click="setDate('year')">1년</b-button>
            </b-button-group>
        </b-col>
    </b-row>
</template>

<script>
import ax from '@/api/http';
import { mapState } from 'vuex';
export default {
    props: ['value'],
    methods: {
        setDate(type) {
            var dt = new Date();
            var sdt = '', edt = dt.format("yyyy-MM-dd");
            switch (type) {
                case 'week':    dt.setDate(dt.getDate() - 7);           break;
                case 'month':   dt.setMonth(dt.getMonth() - 1);         break;
                case '3month':  dt.setMonth(dt.getMonth() - 3);         break;
                case '6month':  dt.setMonth(dt.getMonth() - 6);         break;
                case 'year':    dt.setFullYear(dt.getFullYear() - 1);   break;
            }
            sdt = dt.format("yyyy-MM-dd");
            this.value.startDate = sdt;
            this.value.endDate = edt;
        },
    },
}
</script>

<style lang="css" scoped>
.width_btn { display:flex; }
.width_btn .btn { flex:1; }
</style>
