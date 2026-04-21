<template>
<footer id="footer">
    <b-container id="notice">
        <b-row class="layout">
            <b-link class="col" :to="{name: `bo_index`, params: { bo_cd:'notice' }}">공지</b-link>
            <b-link class="col" v-for="bo in notice" :key="bo.bo_id" :to="{name: 'bo_show', params: { bo_cd:bo.code, bo_id:bo.bo_id }}">
                <span>{{bo.bo_subject}}</span>
                <b-badge>더보기</b-badge>
            </b-link>
        </b-row>
    </b-container>

    <b-container id="footer_info" class="layout">
        <b-row>
            <b-col class="left">
                <b-row class="link">
                    <b-col>
                        <b-link :to="{name: `introduce_company`}">회사소개</b-link>
                        <b-link :to="{name: `introduce_rule`}">이용약관</b-link>
                        <b-link :to="{name: `introduce_rule`, query:{ type:'policy' } }">개인정보취급방침</b-link>
                    </b-col>
                </b-row>
                <b-row class="biz_info">
                    <b-col>
                        <p>{{siteInfo.biz.addr}}</p>
                        <p>
                            대표전화 : {{siteInfo.biz.tel}} |
                            팩스 : {{siteInfo.biz.fax}} |
                            이메일 : {{siteInfo.biz.email}}
                        </p>
                        <p>
                            사업자등록번호 : {{siteInfo.biz.biz_num}} |
                            통신판매업신고번호 : {{siteInfo.biz.e_comm_num}}
                        </p>
                        <p>{{siteInfo.biz.company}}  &nbsp;|&nbsp;  <span>대표 : {{siteInfo.biz.ceo}}</span></p>
                        <p class="copy">
                            Copyright(c)2016 by iNexus, inc. All rights reserved.
                            <b-img src="/storage/common/logo/footer_logo.png" />
                        </p>                        
                    </b-col>
                </b-row>
            </b-col>
            
            <b-col class="right">
                <b-row class="cs_center">
                    <b-col>
                        <p class="tit"><b-img src="/storage/common/icon/cs.png" /> 고객센터</p>
                        <p class="tel">ARS <b>{{siteInfo.biz.tel}}</b></p>
                        <p class="date">평일 09:00 ~ 18:00 | 점심: 12:00 ~ 13:00 (주말, 공휴일 휴무)</p>
                        <p class="contact">
                            <b-button to="/cscenter?view_type=faq">FAQ</b-button>
                            <b-button to="/cscenter">1:1문의</b-button>
                            <b-button to="/cscenter?view_type=as">A/S</b-button>
                            <b-button to="https://pf.kakao.com/_AxmKUj" target='_blank'>
                                <b-img :src="`${s3url}common/footer/kakao-talk.png`" />
                                카카오 채널: 포사이언스
                            </b-button>
                        </p>
                    </b-col>
                </b-row>
                <b-row class="bank">
                    <b-col>
                        <b>계좌안내</b>
                        <b-row class="wr">
                            <b-col><b-img :src="`${s3url}common/footer/bottom_wr.png`" /></b-col>
                            <b-col>{{siteInfo.bank.num01}}</b-col>
                        </b-row>
                        <b-row class="kb">
                            <b-col><b-img :src="`${s3url}common/footer/bottom_kb.png`" /></b-col>
                            <b-col>{{siteInfo.bank.num02}}</b-col>
                        </b-row>
                        <b-row class="kb">
                            <b-col>예금주</b-col>
                            <b-col>{{siteInfo.bank.owner}}</b-col>
                        </b-row>
                    </b-col>                    
                </b-row>
            </b-col>
        </b-row>        
    </b-container>
    
    <div id="expansion">
        <recent-goods /> <!-- 최근 본 상품 -->
        <go-top /> <!-- 위로 가기 -->
    </div>
</footer>
</template>

<script>
import ax from '@/api/http';
import { mapGetters } from 'vuex'

export default {
    name:"Footer",
    components: {
        'recent-goods': () => import('@/views/web/_module/RecentGoods'),
        'go-top':       () => import('../_module/GoTop'),
        'sub-string': () => import('@/views/_common/SubString.vue'),
    },
    data() { return { notice: [], }; },
    computed: { ...mapGetters({ siteInfo: 'common/siteInfo', }) },
    async mounted() {
        const res = await ax.get(`/api/board/notice`, {params:{limit:1}});
        if (res && res.status === 200) { this.notice = res.data.list.data; }
    },
}
</script>

<style scoped>
#footer { margin-top:3rem; padding-bottom:38px; background-color:#F4F8FB; }
#footer #notice { background-color:#595758; max-width:100% !important; margin-bottom:45px; }
#footer #notice .row { align-items:center; }
#footer #notice .row a { color: #FFF; padding:9px 0; }
#footer #notice .row a:first-child { flex:0 0 auto; width:52px; font-weight:900; }
#footer #notice .row a:last-child { font-weight:100; display:flex; align-items:center; overflow: hidden; }
#footer #notice .row a:last-child span { text-overflow:ellipsis; white-space:nowrap; overflow:hidden; }
#footer #notice .row a span:last-child { padding:7px 9px; font-size:15px; font-weight:100; background-color:inherit; border:1px solid #FFF; margin-left:20px; }

#footer #footer_info .row .left .link .col { padding:20px 0; margin-left:-14px; }
#footer #footer_info .row .left .link .col a { padding:14px; }
#footer #footer_info .row .left .biz_info { margin-top:29px; }
#footer #footer_info .row .left .biz_info .col p { font-size:14px; margin-bottom:6px; }

#footer #footer_info .row .right .row { justify-content:center; }
#footer #footer_info .row .right .row .col { max-width:520px; }
#footer #footer_info .row .right .row .col p { margin-bottom:6px; }
#footer #footer_info .row .right .cs_center .col .tit { font-size:18px; font-weight:600; }
#footer #footer_info .row .right .cs_center .col .tel b { color:#00ADEF; font-size:22px; }
#footer #footer_info .row .right .cs_center .col .date { font-weight:bold; }
#footer #footer_info .row .right .cs_center .col .contact a { border-color:#E1E1E1; background-color:#FFF; color:#000; font-size:13px; padding:2px 10px; }
#footer #footer_info .row .right .cs_center .col .contact a:last-child { background-color:inherit; border:0; }

#footer #footer_info .row .right .bank>.col { border-top:1px solid #E1E1E1; padding:10px 20px; max-width:560px; margin-top:12px; font-size:14px; }
#footer #footer_info .row .right .bank .col b { font-size:18px; }
#footer #footer_info .row .right .bank .col b i { position:relative; font-size: 9px; font-style: normal; letter-spacing: 4px; top: -3px; }
#footer #footer_info .row .right .bank .col b i::before { position: absolute; top: -5px; left: -4px; width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid transparent; border-bottom: 4px solid #554F46; content: ''; }
#footer #footer_info .row .right .bank .col b i::after { position: absolute; BOTTOM: -6px; LEFT: -4px; width: 40px; height: 4px; background: #554F46; content: ''; }
#footer #footer_info .row .right .bank .col b i { color:#554F46; }
#footer #footer_info .row .right .bank .col b i span { color:#FF5757; }
#footer #footer_info .row .right .bank .col .row .col:first-of-type { flex:0 0 auto; width:133px; }
#footer #footer_info .row .right .bank .col .row { margin-top:5px; font-weight:600; }
#footer #footer_info .row .right .bank .col .wr .col img { width:73px; }
#footer #footer_info .row .right .bank .col .kb .col img { width:102px; }


@media (max-width: 767px) {
    #footer #notice { margin-bottom:20px; }
    #footer #footer_info .row .left .biz_info { margin-top:7px; }
    #footer #footer_info>.row>.col { flex: 0 0 auto; width:100%; padding:10px; }
    #footer #footer_info .row .left .link .col { margin-left:0; padding:0; display:flex; justify-content:space-evenly; }
    #footer #footer_info .row .left .link .col a { padding:0; }
    #footer #footer_info .row .right { margin-bottom:30px; border-top:2px solid #777; }
    #footer #footer_info .row .right .bank>.col { padding:10px 0px; }
}

#footer #expansion { position:fixed; bottom:1%; right:6.3%; z-index:17; }
</style>