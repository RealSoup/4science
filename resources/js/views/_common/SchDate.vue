<template>
<b-row>
    <slot name="prev"></slot>
    <b-col class="period">
        <b-input-group>
            <b-form-input v-model="value.startDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="format_date"></b-form-input>
            <b-input-group-append>
                <b-form-datepicker v-model="value.startDate" button-only right></b-form-datepicker>
            </b-input-group-append>
        </b-input-group>
        <b>~</b>
        <b-input-group>
            <b-form-input v-model="value.endDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="format_date"></b-form-input>
            <b-input-group-append>
                <b-form-datepicker v-model="value.endDate" button-only right></b-form-datepicker>
            </b-input-group-append>
        </b-input-group>
    </b-col>
    <b-col class="period_btn m_hide">
        <b-button-group>
            <b-button variant="outline-secondary" @click="setDate('today')">오늘</b-button>
            <b-button variant="outline-secondary" @click="setDate('3day')">3일</b-button>
            <b-button variant="outline-secondary" @click="setDate('week')">1주</b-button>
            <b-button variant="outline-secondary" @click="setDate('month')">1달</b-button>
            <b-button variant="outline-secondary" @click="setDate('3month')">3달</b-button>
            <b-button @click="setDate('all')">전체</b-button>
        </b-button-group>
    </b-col>
    <slot name="after"></slot>
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
        format_date(e) { return this.formatDate(e); },
    },
}
</script>

<style lang="css" scoped>
.row .period { flex:0 0 28%; max-width:28%; display:flex; align-items:center; justify-content:space-between; }
.row .period > b { font-size:20px; }
.row .period > div { width: calc(50% - 10px); }
.row .period_btn .btn-group { display:flex; }
.row .period_btn .btn-group .btn { flex:1; }

@media (max-width: 992px) {
    .row .period { flex:0 0 80%; max-width:80%; }
    .row .col { padding:0; }
    .row .col>>>.btn { padding:.25rem .5rem; font-size:.875rem; line-height:1.5; border-radius:.2rem; }
    .row .col .input-group .form-control { padding:.25rem .5rem; font-size:.875rem; line-height:1.5; border-radius:0.2rem; height:calc(1.5em + 0.5rem + 2px); }
    .row .col-1 { flex: 0 0 20%; max-width:20%; text-align:right; }
}
</style>