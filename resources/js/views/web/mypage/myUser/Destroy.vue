<template>
<b-container class="w_fence">
    <h3 class="underbar">회원 탈퇴</h3>

    <b-row class="info">
        <b-col class="tit">
            회원 탈퇴 시<br/> 유의사항
        </b-col>
        <b-col class="con">
            <p>1. 포사이언스에서 현재까지의 회원님의 규매이력과 적립된 마일리지 가 삭제되며, 재가입시 복구되지 않습니다.</p>
        </b-col>
    </b-row>

    <b-row class="frm">
        <b-col>
            <b-form-group label="탈퇴하시는 사유를 말씀해주세요." class="rd_box">
                <b-form-radio v-model="frm.withdraw" name="withdraw" value="상품의 다양성/품질 불만">상품의 다양성/품질 불만</b-form-radio>
                <b-form-radio v-model="frm.withdraw" name="withdraw" value="개인 정보 유출 우려">개인 정보 유출 우려</b-form-radio>
                <b-form-radio v-model="frm.withdraw" name="withdraw" value="교환/반품/환불 불만">교환/반품/환불 불만</b-form-radio>
                <b-form-radio v-model="frm.withdraw" name="withdraw" value="쇼핑몰 속도 및 안정화 불만">쇼핑몰 속도 및 안정화 불만</b-form-radio>
                <b-form-radio v-model="frm.withdraw" name="withdraw" value="배송 불만">배송 불만</b-form-radio>
                <b-form-radio v-model="frm.withdraw" name="withdraw" value="서비스 불만">서비스 불만</b-form-radio>
                <b-form-radio v-model="frm.withdraw" name="withdraw" value="상품 가격 불만">상품 가격 불만</b-form-radio>
                <b-form-radio v-model="frm.withdraw" name="withdraw" value="사이트 이용 불편">사이트 이용 불편</b-form-radio>
                <b-form-radio v-model="frm.withdraw" name="withdraw" value="이용 빈도 낮음">이용 빈도 낮음</b-form-radio>
                <b-form-radio v-model="frm.withdraw" name="withdraw" value="etc">기타 사유 <b-form-input v-model="frm.etc" size="sm" /></b-form-radio>                
            </b-form-group>
        </b-col>
    </b-row>
    <b-row>
        <b-col class="btn_box">
            <b-button class="blue xl" @click="destroy">회원 탈퇴하기</b-button>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'MyPageMyUserDestroy',
    data() { return { frm:{ withdraw:"", _method : 'DELETE', etc:'' } }; },

    methods: {
        async destroy(){
            if (this.frm.withdraw == '')     { 
                Notify.toast('danger', "탈퇴 사유를 선택해 주세요.");
                return false;
            } else if (this.frm.withdraw == 'etc' && this.frm.etc == '')     { 
                Notify.toast('danger', "기타 사유를 입력해 주세요.");
                return false;
            }

            if (await Notify.confirm('탈퇴', 'danger')) {
                try {
                    if (this.frm.withdraw == 'etc') 
                        this.frm.withdraw = this.frm.etc;
                    const res = await ax.post(`/api/user`, this.frm);
                    if (res && res.status === 200) {
                        Notify.toast('success', '회원 탈퇴 완료');
                        this.$store.dispatch('auth/logout');
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('danger', '삭제 실패');
                    Notify.toast('danger', e.response.data.message);
                }
            }
        },
    },
};
</script>

<style lang="css" scoped>
.container .info {  }
.container .info .tit { background-color:#A0A0A0; color:#fff; border-radius:50%; flex: 0 0 108px; max-width:108px; height:108px; text-align:center; padding:1.9rem 0 0; font-weight:600; }
.container .info .con { padding:2.5rem 0 0 1.5rem; }
.container .frm { border:1px solid #E1E1E1; margin-top:2.2rem; }
.container .frm .col { padding: 2.3rem; }
.container .frm .col >>> fieldset legend { color:#2DA194; font-weight:900; font-size:1.2rem; margin-bottom:1.1rem; }
.container .frm .col >>> fieldset > div { display:flex; flex-wrap:wrap; }
.container .frm .col >>> fieldset > div .custom-control { flex: 0 0 25%; max-width:25%; margin-bottom:.8rem; font-size:.89rem; }
.container .frm .col >>> fieldset > div .custom-control label:before, 
.container .frm .col >>> fieldset > div .custom-control label:after { top:.1rem !important; }
.container .frm .col >>> fieldset > div .custom-control:last-of-type { flex: 0 0 75%; max-width: 75%; }
.container .frm .col >>> fieldset > div .custom-control:last-of-type label { display:flex; }
.container .frm .col >>> fieldset > div .custom-control:last-of-type label input { flex: 0 0 80%; max-width:80%; margin-left:2%; position:relative; top:-4px; }
</style>