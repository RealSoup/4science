<template>
<div>
    <b-card header-tag="header" class="shadow">
        <template #header>
            <b-container fluid>
                <div class="row">
                    <div class="col-6"><b>Site 설정</b></div>
                    <div class="col-6 text-right"><b-button size="sm" variant="primary" @click="update">적용</b-button></div>
                </div>
            </b-container>
        </template>

        <b-alert show variant="success">
            <h5 class="alert-heading">사이트정보</h5>
            <b-container fluid>
                <b-row>
                    <b-col cols="2">
                        <b-input-group prepend="도메인"><b-form-input v-model="frm.site.domain"></b-form-input></b-input-group>
                    </b-col>
                    <b-col cols="2">
                        <b-input-group prepend="사이트명"><b-form-input v-model="frm.site.site"></b-form-input></b-input-group>
                    </b-col>
                </b-row>

                <b-row class="mt-4">
                    <b-col cols="4">

                    </b-col>
                    <b-col cols="2">

                    </b-col>
                    <b-col cols="2">

                    </b-col>
                </b-row>
            </b-container>
        </b-alert>

        <b-alert show variant="info">
            <h5 class="alert-heading">회사정보</h5>
            <b-container fluid>
                <b-row>
                    <b-col cols="2">
                        <b-input-group prepend="회사명"><b-form-input v-model="frm.biz.company"></b-form-input></b-input-group>
                    </b-col>
                    <b-col cols="2">
                        <b-input-group prepend="대표이사"><b-form-input v-model="frm.biz.ceo"></b-form-input></b-input-group>
                    </b-col>
                    <b-col cols="2">
                        <b-input-group prepend="전화"><b-form-input v-model="frm.biz.tel"></b-form-input></b-input-group>
                    </b-col>
                    <b-col cols="2">
                        <b-input-group prepend="팩스"><b-form-input v-model="frm.biz.fax"></b-form-input></b-input-group>
                    </b-col>
                    <b-col cols="2">
                        <b-input-group prepend="이메일"><b-form-input v-model="frm.biz.email"></b-form-input></b-input-group>
                    </b-col>
                </b-row>

                <b-row class="mt-4">
                    <b-col cols="4">
                        <b-input-group prepend="주소"><b-form-input v-model="frm.biz.addr"></b-form-input></b-input-group>
                    </b-col>
                    <b-col cols="2">
                        <b-input-group prepend="사업자번호"><b-form-input v-model="frm.biz.biz_num"></b-form-input></b-input-group>
                    </b-col>
                    <b-col cols="2">
                        <b-input-group prepend="통신판매번호"><b-form-input v-model="frm.biz.e_comm_num"></b-form-input></b-input-group>
                    </b-col>
                </b-row>
            </b-container>
        </b-alert>

        <b-alert show variant="primary">
            <h5 class="alert-heading">은행정보</h5>
            <b-container fluid>
                <b-row>
                    <b-col>
                        <b-input-group prepend="예금주"><b-form-input v-model="frm.bank.owner"></b-form-input></b-input-group>
                    </b-col>

                    <b-col></b-col>

                    <b-col>
                        <b-input-group prepend="은행명 1"><b-form-input v-model="frm.bank.name01"></b-form-input></b-input-group>
                    </b-col>
                    <b-col>
                        <b-input-group prepend="계좌번호 1"><b-form-input v-model="frm.bank.num01"></b-form-input></b-input-group>
                    </b-col>
                    <b-col>
                        <b-input-group prepend="은행명 2"><b-form-input v-model="frm.bank.name02"></b-form-input></b-input-group>
                    </b-col>
                    <b-col>
                        <b-input-group prepend="계좌번호 2"><b-form-input v-model="frm.bank.num02"></b-form-input></b-input-group>
                    </b-col>
                </b-row>
            </b-container>
        </b-alert>

        <!-- <b-alert show variant="primary">
            <h5 class="alert-heading">포인트 책정</h5>
            <b-container fluid>
                <b-row>
                    <b-col>
                        <b-input-group prepend="글쓰기"><b-form-input v-model="frm.point.write"></b-form-input></b-input-group>
                    </b-col>
                    <b-col>
                        <b-input-group prepend="댓글 달기"><b-form-input v-model="frm.point.comment"></b-form-input></b-input-group>
                    </b-col>
                    <b-col>
                        <b-input-group prepend="좋아요"><b-form-input v-model="frm.point.good"></b-form-input></b-input-group>
                    </b-col>
                </b-row>
            </b-container>
        </b-alert> -->
    </b-card>



</div>

</template>
<script>
import ax from '@/api/http';
import router from '@/router';
export default {
    name: 'configEdit',
    data() {
        return {
            frm: {
                site:{},
                biz:{},
                bank:{},
            }
        };
    },
    computed: {

    },
    methods: {
        async index(){
            try {
                const res = await ax.get(`/api/admin/site/info`);
                if (res && res.status === 200) {
                    if(res.data.site) this.frm.site = res.data.site.var;
                    if(res.data.biz) this.frm.biz = res.data.biz.var;
                    if(res.data.bank) this.frm.bank = res.data.bank.var;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async update(){
            try {
                this.frm = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    this.frm, // 수정하려는 객체
                    {_method : 'PATCH'} // 삽입하려는 내용
                );
                const res = await ax.post(`/api/admin/site/infoUpdate`, this.frm);
                // if (res && res.status === 200)
                //     // router.push({ name: 'adm_goods_index' })
                // else
                //     Notify.toast('warning', '수정 실패');
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    created() {
        this.index();
    },
}
</script>
