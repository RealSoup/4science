<template lang="html">
    <b-row class="mb-3 sch_date">
        <slot name="prev"></slot>
        <b-col>
            <b-input-group>
                <b-form-input v-model="value.startDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker v-model="value.startDate" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
        </b-col>
        <b-col>
            <b-input-group>
                <b-form-input v-model="value.endDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker v-model="value.endDate" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
        </b-col>
        <b-col lg="6" md="4" sm="12">
            <b-button-group class="width_btn">
                <b-button variant="primary" @click="setDate('today')">오늘</b-button>
                <b-button variant="info" @click="setDate('3day')">3일</b-button>
                <b-button variant="success" @click="setDate('week')">1주</b-button>
                <b-button variant="danger" @click="setDate('month')">1달</b-button>
                <b-button variant="warning" @click="setDate('3month')">3달</b-button>
                <b-button variant="dark" @click="setDate('all')">전체</b-button>
            </b-button-group>
        </b-col>
    </b-row>
</template>

<script>
export default {
    props: ['value'],
    methods: {
        setDate(type) {
            var dt = new Date();
            var sdt = '', edt = dt.format("yyyy-MM-dd");
            switch (type) {
                case 'today':   ;                                 break;
                case '3day':    dt.setDate(dt.getDate() - 3);       break;
                case 'week':    dt.setDate(dt.getDate() - 7);       break;
                case 'month':   dt.setMonth(dt.getMonth() - 1);   break;
                case '3month':  dt.setMonth(dt.getMonth() - 3);   break;
                case 'all':     edt = '';   break;
            }

            if (type != 'all')
                sdt = dt.format("yyyy-MM-dd");

            this.value.startDate = sdt;
            this.value.endDate = edt;
        },
    },
}
</script>

<style lang="css" scoped>
.sch_date .width_btn { display:flex; }
.sch_date .width_btn .btn { flex:1; }
</style>
