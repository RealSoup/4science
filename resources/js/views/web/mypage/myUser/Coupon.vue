<template>
<div class="w_fence">
    <h3>쿠폰 <small>고객님의 쿠폰 히스토리입니다.</small></h3>
    <b-container class="list">
        <b-row class="header">
            <b-col>등록일</b-col>
            <b-col>쿠폰명</b-col>
            <b-col>사용여부</b-col>
            <b-col>기한</b-col>
        </b-row>
        <b-row v-for="(row, i) in list" :key="i" class="data" :class="{ 'notAvailable': (row.uc_is_use == 'Y' || row.isDayLeft) }">
            <b-col>{{row.created_at | formatDate_YYYY_MM_DD}}</b-col>
            <b-col>{{row.cl_name}}</b-col>
            <b-col>
                <template v-if="row.uc_is_use == 'N'">사용 가능</template>
                <template v-else-if="row.uc_is_use == 'Y'">사용 완료</template>
            </b-col>
            <b-col>
                {{row.uc_expiry_date}}
                <b v-if="duration(row.uc_expiry_date) == 0">(오늘까지)</b>
                <b v-if="duration(row.uc_expiry_date) > 0">({{duration(row.uc_expiry_date)}}일 남음)</b>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import ax from '@/api/http';
import moment from 'moment'

export default {
    name: 'MyUserCoupon',
    data() { return { list:{}, } },
    methods: {
        duration(t){
            return moment.duration(moment(t).diff(moment().format('YYYY-MM-DD'))).asDays(); 
        },
    },
    async mounted() {
        try {
            const res = await ax.get(`/api/user/coupon`);
            if (res && res.status === 200) {
                this.list = res.data;
            }
        } catch (e) {
            Notify.consolePrint(e);
            Notify.toast('warning', e.responsee);
        }
    },
};
</script>

<style lang="scss" scoped>
.w_fence h3 small { font-size:50%; }
.w_fence .list .header { background-color:#DDD; border-top:2px solid #333; border-bottom:1px solid #ccc; }
.w_fence .list .header .col { font-weight:bold; }
.w_fence .list .data { border-bottom:1px solid #ccc; }
.w_fence .list .notAvailable { background-color:#ffb8b8; color:#888; }
.w_fence .list .row .col { padding:.6rem 0; }
.w_fence .list .row .col:nth-child(1) { flex:0 0 13%; max-width:13%; text-align:center; }
.w_fence .list .row .col:nth-child(3) { flex:0 0 15%; max-width:15%; text-align:right; }
.w_fence .list .row .col:nth-child(4) { flex:0 0 20%; max-width:20%; text-align:center; }
.w_fence .list .row .col:nth-child(4) b { width:70px; font-size:.8rem; display:inline-block; text-align:right; }
@media (max-width: 768px) {
    .w_fence .list .header { display:none; }
    .w_fence .list .row .col { max-width:none !important; width:auto !important; }
    .w_fence .list .row .col:nth-child(1) { flex-basis:30%; flex-grow:0;  }
    .w_fence .list .row .col:nth-child(2) { flex-basis:70%; flex-grow:1; }
    .w_fence .list .row .col:nth-child(3) { flex-basis:50%; flex-grow:0; }
    .w_fence .list .row .col:nth-child(4) { flex-basis:50%; flex-grow:0; }
}
</style>
