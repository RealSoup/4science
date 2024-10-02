<template>
<div class="calendar">
    <img src="/storage/event/2024/0902/content01.jpg" @click="store" />
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
            } else if (this.down_check) {
                Notify.modal("이미 받은 쿠폰입니다.", 'warning');
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
                    } else if (res.data == 'Success') {
                        Notify.toast('success', '쿠폰 받기 완료');
                        this.downCheck();
                    }
                } else {
                    Notify.toast('warning', res);
                }
            }
        },

        async downCheck () {
            if (Auth.check()) {
                let res = await ax.get(`/api/event/couponDownCheck`);
                if (res && res.status === 200) 
                    this.down_check = res.data;
            }
        }
    },
    mounted() { this.downCheck(); },
}
</script>

<style type="text/css" scoped>
.calendar img { cursor:pointer; width:100%; min-width:700px; position:relative; left:50%; transform:translateX(-50%); }
</style>