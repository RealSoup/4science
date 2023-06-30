<template>
<div class="p_wrap layout">
    <h3>대량 메일</h3>
    <div class="act_ctrl">
        <b-row>
            <b-col>총 <b>{{all | comma}}</b>명, 수신동의 <b>{{agree | comma}}</b>명</b-col>
            <b-col class="text-right"><b-button class="black sm" @click="send">발송</b-button></b-col>
        </b-row>
    </div>

    
    <div class="box frm01">
        <h5>메일내용</h5>
        <b-row>
            <b-col>발송 대상</b-col>
            <b-col>
                <b-form-select v-model="frm.target">
                    <b-form-select-option value="custom">직접 입력</b-form-select-option>
                    <b-form-select-option value="agree">수신동의만</b-form-select-option>
                    <b-form-select-option value="all_0-3">모두(0~3만)</b-form-select-option>
                    <b-form-select-option value="all_3-6">모두(3~6만)</b-form-select-option>
                    <b-form-select-option value="all_6-end">모두(6만~)</b-form-select-option>
                </b-form-select>
                <b>1회 발송시 최대 3만통까지만 가능</b>
                <b-form-textarea v-if="frm.target == '0'" v-model="frm.temp" rows="4" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>제목</b-col><b-col><b-form-input v-model="frm.subject" /></b-col>
        </b-row>
        <b-row>
            <b-col>내용</b-col>
            <b-col>
                <b-form-textarea v-model="frm.content" rows="16" />
            </b-col>
        </b-row>
    </div>

</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'AdmUserEmail',

    data() {
        return {
            agree:0,
            all:0,
            frm: {
                target: 0,
                subject:'',
                content:'',
                temp:'dvvb38@gmail.com;dvvb38@nate.com;kjk@4science.net;dvvb38@naver.com;realsoup38@daum.net;chakanharry@gmail.com;chakanharry@hanmail.net;harry82@nate.com;chakanharry@naver.com;lhr@4science.net;dvvb38@kakao.com',
            }
        };
    },

    methods: {
        async send() {
            const res = await ax.post(`/api/admin/user/sendEmail`, this.frm);
            if (res && res.status === 200)
                Notify.toast('success', '발송 완료');            
        },
    },

    async mounted() {
        const res = await ax.get(`/api/admin/user/mailInfo`);
        if (res && res.status === 200) {
            this.agree = res.data.agree;
            this.all = res.data.all;
        }
            
        
    },
}
</script>

<style lang="css" scoped>
.p_wrap .frm01 .row .col select {max-width:10rem;}
</style>
