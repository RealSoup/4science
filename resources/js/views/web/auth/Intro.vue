<template>
<b-container class="w_fence">
    <h3>포사이언스 회원가입</h3>
   
    <b-row class="con">
        <b-link class="col direct" to="/auth/create/personal">
            <p>일반 회원 가입하기</p>
            <span>만 14세 이상 가입 가능합니다.</span>
        </b-link>
        <b-link class="col direct" to="/auth/create/dealer">
            <p>딜러 회원 가입하기</p>
            <span>사업자 등록증을 보유한<br />유통, 도소매 업체 (재판매업자)</span>
        </b-link>
        <b-col class="sns">
            <b-link href="/social/naver">
                <b-img :src="s3url+'auth/join_naver.png'" />
            </b-link>
            <b-link href="/social/kakao">
                <b-img :src="s3url+'auth/join_kakao.png'" />
            </b-link>
        </b-col>
    </b-row>
    <b-row class="info">
        <b-col class="mileage_info">
            <p>신규 가입 시 3,000 마일리지 제공!</p>            
            (딜러회원 및 네이버/카카오 간편 가입 시 제외)
        </b-col>
        <b-col>
            <b-button variant="outline-dark" @click="isModalViewed=true">회원 등급별 혜택</b-button>
        </b-col>        
    </b-row>
    <transition name="modal">
        <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="850" :min_height="860" >
            <template slot="header">회원혜택 안내</template>
            <img :src="s3url+'cscenter/member_info.png'">
        </Modal>
    </transition>
</b-container>
</template>

<script>
export default {
    name: 'AuthIntro',
    components: {
        'Modal'     : () => import('@/views/_common/Modal'),
    },

    data() {
        return {
            isModalViewed:false,
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="css" scoped>
.container { max-width:920px; }
.container h3 { margin:4rem auto; font-weight:bold; font-size:3rem; text-align:center; }
.container .con { margin-bottom:1rem; }
.container .con .col { flex:0 0 300px; max-width:300px; }
.container .con .col:not(:last-child) { margin-right:10px; }
.container .con .direct { min-height:300px; border:3px solid #D7D7D7; border-radius:10px; text-align:center; background-repeat:no-repeat; background-position:center 30%; padding-top:8.8rem; }
.container .con .direct p { font-weight:bold; margin-bottom:.4rem; font-size:1.5rem; }
.container .con .direct:first-child { background-image:url('/storage/auth/join_user.png'); }
.container .con .direct:first-child:hover { background-image:url('/storage/auth/join_user_h.png'); }
.container .con .direct:first-child:hover p { color:#01ADBB; }
.container .con .direct:nth-child(2) { background-image:url('/storage/auth/join_dealer.png'); }
.container .con .direct:nth-child(2):hover { background-image:url('/storage/auth/join_dealer_h.png'); }
.container .con .direct:nth-child(2):hover p { color:#01ADBB; }
.container .con .direct span { font-size:.96rem; }
.container .con .sns { padding:0; }
.container .con .sns a { display:inline-block; }
.container .con .sns a:first-child { margin-bottom:10px; }

.container .info { justify-content:space-between; }
.container .info .col { flex:0 0 300px; max-width:300px; font-size:.85rem; }
.container .info .col p { font-weight:bold; margin-bottom:.7px; font-size:1.05rem; }
.container .info .col:nth-child(2) { text-align:right; padding:0; }
</style>