<template>
<div class="p_wrap">
    <b-container class="frm_st ">
        <b-row><b-col class="img"><b-img :src="item.img_src" /></b-col></b-row>
        <b-row><b-col class="gd_name">{{item.odm_gd_name}}</b-col></b-row>
        <b-row>
            <b-col class="body">
                <b-row><b-col class="question">제품을 잘 받으셨나요?</b-col></b-row>
                <b-row>
                    <b-col class="label_st">총평</b-col>
                    <b-col class="radio_ctrl">
                        <b-form-radio v-model="boFrm.bo_good" inline value="100">만족</b-form-radio>
                        <b-form-radio v-model="boFrm.bo_good" inline value="50">보통</b-form-radio>
                        <b-form-radio v-model="boFrm.bo_good" inline value="10">불만족</b-form-radio>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="label_st">제목</b-col>
                    <b-col>
                        <b-form-input id="bo_subject" v-model="boFrm.bo_subject" required />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="label_st">구매평</b-col>
                    <b-col>
                        <b-form-textarea id="'bo_content" v-model="boFrm.bo_content" rows="5" placeholder="내용을 입력하세요" />
                    </b-col>
                </b-row>
                
                <div class="btn_box">
                    <b-button class="gray lg" @click="store">완료</b-button>
                </div>
            </b-col>
        </b-row>
    </b-container>
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
.rs_modal .rs_modal-card main { padding:0 !important; }

.p_wrap .container,
.p_wrap .frm_st .row,
.p_wrap .frm_st .row .col { padding:0; margin:0; }
.p_wrap .img { text-align:center; }
.p_wrap .img img { width:180px; height:180px; object-fit:cover; }
.p_wrap .row .col { text-align:center; font-size:.9rem; }
.p_wrap .row .col.gd_name { margin:.7rem 0 1.5rem;}
.p_wrap .row .col.body { background-color:#4EB8C8; padding:1.5rem; }
.p_wrap .row .col.body .question { color:#FFF; font-size:1.2rem; margin-bottom: 0.4rem; }
.p_wrap .frm_st .row .col .row { margin:.3rem 0; }
.p_wrap .frm_st .row .col .row .col.label_st { color:#7D7D7D; flex-basis:90px; max-width:90px; border-radius:.5rem 0 0 .5rem; background:#fff; margin-right:4px; display:flex; align-items:center; justify-content:center; }
.p_wrap .frm_st .row .col .row .col.label_st + div { background:#fff; border-radius:0 .5rem .5rem 0; min-height:32px; }
.p_wrap .frm_st .row .col .row .col.radio_ctrl { display:flex; justify-content:space-around; align-items:center; }
.p_wrap .row .col.body .btn_box { margin:1rem; }
.p_wrap .row .col.body .btn_box .btn { border: 1px solid #fff; width: 120px; }
.p_wrap .frm_st input,
.p_wrap .frm_st select,
.p_wrap .frm_st textarea { border-radius:0 .5rem .5rem 0; background:inherit; }
        
</style>

