<template>
<b-container class="w_fence">
    <h3>소셜 계정으로 가입하시는 고객님,</h3>
    <h5>기본 가입 여부에 따라 아래의 항목을 선택해주시기 바랍니다.</h5>
    <b-row>
        <b-col>
            <b-button class="xl green" :href="`/auth/create/personal${param}`">신규 회원 가입</b-button>
            <div>소셜 계정을 통한 신규 가입</div>
            <i>"포사이언스에 처음 왔어요"</i>
        </b-col>
        <b-col>
            <b-button class="xl blue" :href="`/auth/create/sync${param}`">기존 계정 연동</b-button>
            <div>기존에 가입된 포사이언스 계정과<br /> 연동하여 사용</div>
            <i>"포사이언스 회원이에요"</i>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
export default {
    name:"AuthJoinSyncChoice",
    components: { 'Validation': () => import('@/views/_common/Validation'), },
    props: ['active_mode'],
    data() {
        return {
            param:`?email=${this.$route.query.email}&provider=${this.$route.query.provider}&social_id=${this.$route.query.social_id}&social_token=${this.$route.query.social_token}`
        }
    },
}
</script>

<style lang="scss" scoped>
.w_fence { max-width:650px; margin-top:2.4rem; text-align:center; }
.w_fence h3 { font-size:2rem; margin-bottom:1.3rem; } 
.w_fence h5 { font-weight:600; font-size:1.3rem; }
.w_fence .row { max-width:540px; margin:3.5rem auto; }
.w_fence .row .col { padding-left:30px; padding-right:30px; text-align:left; }
.w_fence .row .col:first-child:after { content:''; position:absolute; right:0; top:-3px; width:0; height:110px; border-right:1px solid #A0A0A0; }
.w_fence .row .col .btn { width:100%; padding:13px 0; }
.w_fence .row .col div { font-size:.95rem; margin:.5rem 0; font-weight:600; letter-spacing:-1px; }
.w_fence .row .col i { color:#0072B9; font-weight:bold; }
</style>
