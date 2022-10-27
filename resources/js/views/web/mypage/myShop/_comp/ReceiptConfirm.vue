<template>
    <div id="ReceiptConfirm">
        <div class="head">
            <b-img :src="item.img_src" />
            
        </div>
        <p class="gd_name">{{item.odm_gd_name}}</p>
        <div class="body">
            <p>제품을 잘 받으셨나요?</p>
            <div class="radio_ctrl">
                <span>총평</span>
                <b-form-radio v-model="boFrm.bo_good" inline value="100">만족</b-form-radio>
                <b-form-radio v-model="boFrm.bo_good" inline value="50">보통</b-form-radio>
                <b-form-radio v-model="boFrm.bo_good" inline value="10">불만족</b-form-radio>
            </div>
            <div class="awesome_p">
                <input id="bo_subject" v-model="boFrm.bo_subject" required />
                <label for="bo_subject">제목</label>
            </div>
            
            <div class="awesome_p">
                <textarea id="'bo_content" v-model="boFrm.bo_content" rows="5" required></textarea>
                <label for="bo_content">구매평</label>
            </div>
            <div class="ctrl">
                <b-img src="/img/mypage/order/confirm_btn.png" @click="store" />
            </div>
        </div>
    </div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'MyOrderReceiptConfirm',
    props:['item'],
    data() {
        return {
            boFrm: {
                bo_gd_id:this.item.odm_gd_id,
                bo_good:100,
            },
            odFrm: {
                _method: 'PATCH',
                type: 'receipt_confirm'
            },
        };
    },

    methods: {
        async store() {
            if ( isEmpty(this.boFrm.bo_subject) ) this.boFrm.bo_subject = this.item.odm_gd_name;
            if ( isEmpty(this.boFrm.bo_content) ) this.boFrm.bo_content = "만족";
            const resBo = await ax.post(`/api/board/review/store`, this.boFrm);
            this.odFrm = Object.assign(
                {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                this.odFrm, // 수정하려는 객체
                this.item // 삽입하려는 내용
            );
            const resOr = await ax.post(`/api/shop/order/${this.item.odm_od_id}`, this.odFrm);
            if (resOr && resOr.status === 200) {     
                this.item.order_dlvy_info.oddi_receive_date = new Date().format("yyyy-MM-dd HH:mm:ss");
                Notify.toast('success', '수취 확인 완료')
                this.$emit('hide_modal');
            }
        }
    },
};
</script>

<style lang="css" scoped>
.rs_modal .rs_modal-card { max-width:600px; }
#ReceiptConfirm { border: 10px solid #4D4D4D; }
#ReceiptConfirm .head {  min-height:250px; position:relative; }
#ReceiptConfirm .head img { width:150px; height:150px; object-fit:cover; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); }
#ReceiptConfirm .gd_name { text-align:center; font-weight:bold; }
#ReceiptConfirm .body { background:#C1B5A8; padding:20px; }
#ReceiptConfirm .body p { text-align:center; font-weight:bold; font-size:1.3rem; color:#fff; }
#ReceiptConfirm .body > div { margin-bottom:10px; }
#ReceiptConfirm .body .radio_ctrl { background:#fff; border-radius:5px; padding:3px 12px; }
#ReceiptConfirm .body .radio_ctrl span { margin-right:20px; color:#AAA; }
#ReceiptConfirm .body .ctrl { text-align:center; }
#ReceiptConfirm .body .ctrl img { cursor:pointer; }
</style>