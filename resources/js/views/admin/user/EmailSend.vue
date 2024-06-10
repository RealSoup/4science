<template>
<div class="p_wrap layout">
    <h3>대량 메일</h3>
    <div class="act_ctrl">
        <b-row>
            <b-col><b-button class="white sm" :to="{name: 'adm_user_email'}">목록</b-button></b-col>
            <b-col class="text-right"><b-button class="mint sm" @click="send">발송</b-button></b-col>
        </b-row>
    </div>    
    <div class="box frm01">
        <h5>메일내용</h5>
        <b-row>
            <b-col>그룹 선택</b-col>
            <b-col>
                <b-form-select v-model="frm.target_type" class="mr-3">
                    <b-form-select-option value="custom">직접 입력</b-form-select-option>
                    <b-form-select-option value="agree">수신동의만</b-form-select-option>
                    <b-form-select-option value="all">모두</b-form-select-option>
                </b-form-select>
                총 <b>{{all | comma}}</b>명, 수신동의 <b>{{agree | comma}}</b>명
            </b-col>
        </b-row>
        <b-row>
            <b-col>수신자<b v-if="frm.target_type !== 'custom'">&nbsp;추가</b></b-col>
            <b-col><b-form-textarea v-model="frm.target" rows="4" /></b-col>
        </b-row>
        <b-row><b-col>제목</b-col><b-col>{{frm.title}}</b-col></b-row>
        <b-row><b-col>내용</b-col><b-col><div v-html="frm.body" /></b-col></b-row>
    </div>
</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'AdmUserEmailSend',
    components: {
        'email-form': () => import('./EmailForm'),
    },
    data() {
        return {
            agree:0,
            all:0,
            frm: {
                target_type : 'custom',
                target      : '', 
                title       : '',
                body        : '',
                id          : 0,
                target_test : '["dvvb38@gmail.com", "dvvb38@nate.com", "kjk@4science.net", "dvvb38@naver.com", "realsoup38@daum.net", "chakanharry@gmail.com", "chakanharry@hanmail.net", "harry82@nate.com", "chakanharry@naver.com", "lhr@4science.net", "dvvb38@kakao.com"]',
                target_add  : '[{"name":"손주혁","addr":"joohiuk@uos.ac.kr"},{"name":"손주혁","addr":"joohiuk@gmail.com"}]',
                // target_add  : '[{"name":"김진국1","addr":"kjk@4science.net"},{"name":"김진국2","addr":"dvvb38@naver.com"}]',
            },
        };
    },
 
    watch: {
        'frm.target_type': {
            handler(n, o) {
                if (n=='custom')    this.frm.target = this.frm.target_test;
                else                this.frm.target = this.frm.target_add;
            },
            immediate: true,
        },
    },

    methods: {
        async send() {
            const res = await ax.post(`/api/admin/user/email/${this.frm.id}/send`, this.frm);
            if (res && res.status === 200)
                Notify.modal(`발송수: ${res.data.count}`, 'success');
        },
    },

    async mounted() {
        const info = await ax.get(`/api/admin/user/mailInfo`);
        if (info && info.status === 200) {
            this.agree = info.data.agree;
            this.all = info.data.all;
        }
        
        const mail = await ax.get(`/api/admin/user/email/${this.$route.params.id}/edit`);
        if (mail && mail.status === 200) {
            this.frm.title = mail.data.title;
            this.frm.body = mail.data.body;
            this.frm.id = mail.data.id;
        }

    },
}
</script>

<style lang="css" scoped>
.p_wrap .frm01 .row .col select {max-width:10rem;}
</style>
