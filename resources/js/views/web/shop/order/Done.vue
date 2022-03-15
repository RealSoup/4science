<template lang="html">
    <b-container id="order_done">
        <h3>주문 완료</h3>
        주문이 완료되었습니다.
주문내역은 주문/배송조회에서 확인하실 수 있습니다.
주문번호는 {{order.od_no}} 입니다.

결제 예정일 : 선결제

결제방법 안내 - 현금결제(무통장입금/에스크로)

    </b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    props:['value'],
    data() {
        return {
            od_id:this.$route.params.od_id,
            order:{},

        }
    },
    methods: {
        async show(){
            try {
                const res = await ax.get(`/api/shop/order/done/${this.od_id}`);
                if (res && res.status === 200) {
                    this.order = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.responsee);
            }
        },
    },
    mounted() {
        this.show();
    },
}
</script>

<style lang="css" scoped>
</style>
