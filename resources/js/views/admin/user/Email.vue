<template>
<div class="p_wrap">
    <h3>회원 정보 수정</h3>
    <b-card no-body class="act_ctrl">
        <b-container>
            <b-row>
                <b-col>
                    
                </b-col>
                <b-col class="text-right">
                    <b-button-group size="sm">
                        <b-button variant="dark" @click="send">발송</b-button>
                    </b-button-group>
                </b-col>
            </b-row>
        </b-container>
    </b-card>

    
    <div class="box frm01">
        <b-row>
            <b-col>발송 대상</b-col>
            <b-col>
                최고 3만통
                <b-form-select v-model="frm.target">
                    <b-form-select-option value="0">직접 입력</b-form-select-option>
                    <b-form-select-option value="1" >수신동의만</b-form-select-option>
                    <b-form-select-option value="2" >모두</b-form-select-option>
                </b-form-select>
                <b-form-textarea v-if="frm.target == '0'" v-model="frm.temp" rows="16" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>제목</b-col><b-col><b-form-input v-model="frm.title" /></b-col>
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
            frm: {
                target: 0,
                title:'',
                content:'',
                temp:'dvvb38@gmail.com;dvvb38@nate.com;kjk@4science.net;dvvb38@naver.com;realsoup38@daum.net;chakanharry@gmail.com;chakanharry@hanmail.net;harry82@nate.com;chakanharry@naver.com;lhr@4science.net;dvvb38@kakao.com',
            }
        };
    },

    methods: {
        async send() {
            const res = await ax.post(`/api/admin/user/sendEmail`, this.frm);
            if (res && res.status === 200) {
                Notify.toast('success', '발송 완료');
            }
        },
    },
}
</script>

<style lang="css" scoped>
</style>
