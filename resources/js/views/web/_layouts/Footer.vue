<template>
<footer id="footer">
    <RecentGoods @scrollToTop="scrollToTop" /> <!-- 최근 본 상품 -->
    <GoTop /> <!-- 위로 가기 -->
    <b-container id="footer_top" class="layout">
        <b-row>
            <b-col class="fir">
                <p class="tit">고객센터</p>
                <p class="tel">{{siteInfo.biz.tel}}</p>
                <p class="date">09:00 ~ 18:00 ( 점심: 12:00 ~ 13:00 )<br /> 주말 및 공휴일은 휴무입니다.</p>
                <p class="contact"> <span class="ic">F</span> {{siteInfo.biz.fax}} 
                    <span class="ic">M</span> <b-link :href="`mailto:${siteInfo.biz.email}`">{{siteInfo.biz.email}}</b-link></p>
                <p class="contact kakao"><b-img :src="`${s3url}common/footer/kakao-talk.png`" />
                    카카오 채널: <b-link href="https://pf.kakao.com/_AxmKUj" target='_blank'>포사이언스</b-link></p>
            </b-col>

            <b-col class="sec">
                <p class="tit">계좌안내</p>
                <b-row>
                    <b-col><b-img :src="`${s3url}common/footer/account_woori.png`" /></b-col>
                    <b-col>{{siteInfo.bank.num01}}</b-col>
                </b-row>
                <b-row>
                    <b-col><b-img :src="`${s3url}common/footer/account_kb.png`" /></b-col>
                    <b-col>{{siteInfo.bank.num02}}</b-col>
                </b-row>
                <p class="owner">예금주 : {{siteInfo.bank.owner}}</p>
            </b-col>
            
            <b-col class="thi">
                <p class="tit">공지사항 <b-link :to="{name: `bo_index`, params: { bo_cd:'notice' }}">></b-link></p>
                <b-link v-for="bo in notice" :key="bo.bo_id" :to="{name: 'bo_show', params: { bo_cd:bo.code, bo_id:bo.bo_id }}">
                    <SubString v-model="bo.bo_subject" :width="330" />
                    <span>{{bo.created_at | formatDate}}</span>
                </b-link>
            </b-col>
        </b-row>
    </b-container>

    <div id="footer_bottom">
        <b-container>
            <b-row>
                <b-col>
                    <b-link>회사소개</b-link>
                    <b-link>이용약관</b-link>
                    <b-link>개인정보취급방침</b-link>
                    <b-link>A/S</b-link>
                    <b-link>FAQ</b-link>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <p>{{siteInfo.biz.addr}}</p>
                    <p>
                        <span>대표전화 : {{siteInfo.biz.tel}}</span>
                        <span>팩스 : {{siteInfo.biz.fax}}</span>
                        <span>이메일 : {{siteInfo.biz.email}}</span>
                    </p>
                    <p>
                        <span>사업자등록번호 : {{siteInfo.biz.biz_num}}</span>
                        <span>통신판매업신고번호 : {{siteInfo.biz.e_comm_num}}</span>
                        <span>대표이사 : {{siteInfo.biz.ceo}}</span>
                    </p>
                    <p class="copy">
                        <b-col>Copyright(c)2016 by iNexus, inc. All rights reserved.</b-col>
                    </p>                        
                </b-col>
                <b-col class="logo"><b-img :src="`${s3url}common/logo/footer_logo.png`" /></b-col>
            </b-row>
        </b-container>
    </div>
</footer>
</template>

<script>
import ax from '@/api/http';
import { mapGetters } from 'vuex'

export default {
    name:"Footer",
    components: {
        'RecentGoods': () => import('../_module/RecentGoods'),
        'GoTop':       () => import('../_module/GoTop'),
        'SubString': () => import('@/views/_common/SubString.vue'),
    },
    
    data() {
        return {
            notice: [],
        };
    },
    computed: {
        ...mapGetters({
            siteInfo: 'common/siteInfo',
        })
    },
    methods:{
        scrollToTop(){
            this.$emit('scrollToTop');
        },
    },

    async mounted() {
        const res = await ax.get(`/api/board/notice`, {params:{limit:4}});
        if (res && res.status === 200) {
            this.notice = res.data.list.data;
        }

        /* 네이버 분석 관련 스크립트 */
        if(!wcs_add) var wcs_add = {};
        wcs_add["wa"] = "s_256b3162e372";
        if (!_nasa) var _nasa={};
        if (window.wcs) {
            wcs.inflow();
            wcs_do(_nasa);
        }
    },
}
</script>

<style scoped>
#footer { margin-top:3rem; padding-top:3.3rem; border-top:1px solid #363636; }
#footer #footer_top { padding:0; }
#footer #footer_top>.row { margin:0; }
#footer #footer_top .row .col { padding:0; }
#footer #footer_top .row .col .tit { font-weight:bold; font-size:1.5rem; }

#footer #footer_top .row .fir { border:2px solid #EBEBEB; padding:.5rem; margin-right:3.75rem; }
#footer #footer_top .row .fir p { text-align:center; margin-bottom:.5rem;}
#footer #footer_top .row .fir .tit { margin-top:1rem; margin-bottom:.7rem; }
#footer #footer_top .row .fir .tel { font-size:3rem; font-weight:bold; color:#17A2B8; line-height:48px; }
#footer #footer_top .row .fir .date { margin-bottom:.9rem; }
#footer #footer_top .row .fir .contact .ic { text-align:center; border-radius:50%; background:#5B6263; color:#FFF; font-weight:bold; width:24px; height:24px; display:inline-block; }
#footer #footer_top .row .fir .contact .ic:nth-child(2) { margin-left:1rem; }
#footer #footer_top .row .fir .contact { text-align:left; padding-left:2rem; }
#footer #footer_top .row .fir .kakao { margin-bottom:.65rem; }

#footer #footer_top .row .sec { margin-right:3.75rem; }
#footer #footer_top .row .sec .tit { border-bottom:1px solid #333; padding:15px 0 8px 8px; margin-bottom:1.5rem; }
#footer #footer_top .row .sec .row { padding:10px 9%; }
#footer #footer_top .row .sec .row .col:nth-child(1) { flex:0 0 35%; max-width:35%; text-align:center; }
#footer #footer_top .row .sec .owner { text-align:center; background:#D7D7D7; padding:7px 0; margin-top:2rem; }

#footer #footer_top .row .thi .tit { border-bottom:1px solid #333; padding:15px 0 8px 8px; margin-bottom:1.5rem; margin:0; }
#footer #footer_top .row .thi .tit a { float:right; margin-right:8px; }
#footer #footer_top .row .thi>a { display:block; padding:14px 4px; border-bottom:1px solid #D7D7D7; margin:0 15px; }
#footer #footer_top .row .thi a:hover { background-color:#17A2B8; }
#footer #footer_top .row .thi a span:nth-child(2) { float:right; }

#footer #footer_bottom { background-color: #3A3A3A; padding:2rem 0; margin-top:3.3rem; }
#footer #footer_bottom .container { max-width:1120px; }
#footer #footer_bottom .container,
#footer #footer_bottom .container .row .col { padding:0; color:#fff; font-size:13px; }
#footer #footer_bottom .container .row { margin:0; }
#footer #footer_bottom .container .row A { color:#fff; }
#footer #footer_bottom .container .row:nth-child(1) { background: url(https://fourscience.s3.ap-northeast-2.amazonaws.com/common/footer/line.png) repeat-x bottom left; margin-bottom:10px; }
#footer #footer_bottom .container .row:nth-child(1) a { display:inline-block; margin-right:50px; padding:13px 0; }
#footer #footer_bottom .container .row .col p { margin:0; }
#footer #footer_bottom .container .row .col .copy { margin-top: 22px; }
#footer #footer_bottom .container .row .col.logo { text-align:right; }

@media (max-width: 992px){
    #footer { margin-top:1rem; padding-top:1rem; }
    #footer #footer_top .row .col { flex: 0 0 100%; max-width: 100%; }
    #footer #footer_top .row .fir { margin:0; }
    #footer #footer_top .row .fir .contact { display:none; }
    #footer #footer_top .row .sec { display:none; }
    #footer #footer_top .row .thi a span:nth-child(2) { display:none; }
    #footer #footer_bottom { padding: 0rem 0 3rem 0; margin-top: 1.3rem; }
    #footer #footer_bottom .container { padding:10px; }
    #footer #footer_bottom .container .row .col { flex: 0 0 100%; max-width: 100%; }
    #footer #footer_bottom .container .row:nth-child(1) a { margin-right:10px; padding:7px 0; }
    #footer #footer_bottom .container .row .col .copy { margin-top:5px; }
    #footer #footer_bottom .container .row .col.logo { margin-top:10px; }
}
</style>