<template>
<div class="calendar">   
    <b-row class="btn_box">
        <b-col>
            <template v-if="clickable">
                <b-button v-if="down_check">이미 다운 함</b-button>
                <b-button @click="store" class="chk_prev" v-else>쿠폰 다운</b-button>
            </template>
            <b-button v-else class="gray xl">처리중 •••</b-button>
        </b-col>
    </b-row>
</div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'eventCoupon',
    data() {
        return {
            down_check:false,
            clickable : true,
        };
    },


    methods: {
        async store() {
            if (!Auth.check()) {
                Notify.modal("로그인이 필요합니다.", 'danger');
            } else {
                this.clickable = false;
                let res = await ax.get(`/api/event/couponDown`, {params:{ cl_id:1}});
                if (res && res.status === 200) {
                    if (res.data == 'Exist')
                        Notify.modal("이미 받으셨습니다.", 'warning');
                    else if (res.data == 'login required') {
                        Notify.modal("로그인이 필요합니다.", 'danger');
                        window.location.reload(true);
                    } else if (res.data == 'Expired') {
                        Notify.modal("이벤트가 종료 되었거나 쿠폰이 만료 되었습니다.", 'danger');
                        window.location.reload(true);
                    } else if (res.data == 'Success')
                        Notify.toast('success', '쿠폰 받기 완료')                  
                } else {
                    Notify.toast('warning', res);
                }
            }
        },
    },
    
    created() { // 데이터에 접근이 가능한 첫 번째 라이프 사이클

    },

    async mounted() {
        if (Auth.check()) {
            let res = await ax.get(`/api/event/couponDownCheck`);
            if (res && res.status === 200) 
                this.down_check = res.data;
        }
    },
}
</script>

<style type="text/css">

</style>