<template>
<b-container class="p_wrap">
    <b-row>
        <b-col col lg="6" md="12" class="left">
            <h4>주문현황</h4>
            <div class="box">
                <b-row>
                    <b-col>오늘 주문 <b></b></b-col>
                    <b-col>최근 7일 주문 <b></b></b-col>
                </b-row>
                
                <b-row>
                    <b-col>
                        <b></b>
                        <span>주문접수</span>
                        <span>주문 후 상태</span>
                    </b-col>
                    <b-col>
                        <b></b>
                        <span>주문접수</span>
                        <span>주문 후 상태</span>
                    </b-col>
                    <b-col>
                        <b></b>
                        <span>주문접수</span>
                        <span>주문 후 상태</span>
                    </b-col>
                    <b-col>
                        <b></b>
                        <span>주문접수</span>
                        <span>주문 후 상태</span>
                    </b-col>
                    <b-col>
                        <b></b>
                        <span>주문접수</span>
                        <span>주문 후 상태</span>
                    </b-col>
                    <b-col>
                        <b></b>
                        <span>주문접수</span>
                        <span>주문 후 상태</span>
                    </b-col>
                </b-row>
            </div>
        </b-col>
        
        <b-col col lg="6" md="12" class="right">
            <h4>견적현황</h4>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'admMain',

    data() {
        return {
            con:{}
        };
    },

    async mounted() {
        try {
            const res = await ax.get(`/api/admin`);
            if (res && res.status === 200) {
                this.con = res.data;
            }
        } catch (e) {
            Notify.consolePrint(e);
            Notify.toast('warning', e.response.data.message);
        }
    },

    methods: {

    },
};
</script>

<style lang="css" scoped>
.p_wrap>.row>.col .box { border-width:4px; border-style:solid; border-radius:1rem; padding:1rem }
.p_wrap .row .left .box { border-color:#458CCA; }
.p_wrap .row .right .box { border-color:#51B948; }


</style>