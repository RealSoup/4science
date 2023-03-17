<template>
<b-row>
    <slot name="prev"></slot>
    <b-col class="period">
        <b-input-group>
            <b-form-input v-model="value.startDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
            <b-input-group-append>
                <b-form-datepicker v-model="value.startDate" button-only right></b-form-datepicker>
            </b-input-group-append>
        </b-input-group>
        <b>~</b>
        <b-input-group>
            <b-form-input v-model="value.endDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
            <b-input-group-append>
                <b-form-datepicker v-model="value.endDate" button-only right></b-form-datepicker>
            </b-input-group-append>
        </b-input-group>
    </b-col>
    <b-col class="period_btn">
        <b-button-group>
            <b-button variant="outline-secondary" @click="setDate('today')">오늘</b-button>
            <b-button variant="outline-secondary" @click="setDate('3day')">3일</b-button>
            <b-button variant="outline-secondary" @click="setDate('week')">1주</b-button>
            <b-button variant="outline-secondary" @click="setDate('month')">1달</b-button>
            <b-button variant="outline-secondary" @click="setDate('3month')">3달</b-button>
            <b-button @click="setDate('all')">전체</b-button>
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
.row .period { flex:0 0 28%; max-width:28%; display:flex; align-items:center; justify-content:space-between; }
.row .period > b { font-size:20px; }
.row .period > div { width: calc(50% - 10px); }
.row .period_btn .btn-group { display:flex; }
.row .period_btn .btn-group .btn { flex:1; }
</style>
