<template>
    <footer id="footer">
        <RecentGoods @scrollToTop="scrollToTop" /> <!-- 최근 본 상품 -->
    
        <b-container id="footer_top">
            <b-row>
                <b-col class="fir">
                    <p class="tit">고객센터</p>
                    <p class="tel">{{siteInfo.biz.tel}}</p>
                    <p>
                        09:00 ~ 18:00 ( 점심: 12:00 ~ 13:00 )<br />
                        주말 및 공휴일은 휴무입니다.
                    </p>
                    <p>
                        <span class="ic">F</span> {{siteInfo.biz.fax}} 
                        <span class="ic">M</span> <b-link :href="`mailto:${siteInfo.biz.email}`">{{siteInfo.biz.email}}</b-link>
                    </p>
                    <p>
                        <b-img src="/img/common/footer/kakao-talk.png" />
                        카카오 채널: <b-link href="https://pf.kakao.com/_AxmKUj" target='_blank'>포사이언스</b-link>
                    </p>
                </b-col>

                <b-col class="sec">
                    <p class="tit">계좌안내</p>
                    <b-row>
                        <b-col><b-img src="/img/common/footer/account_woori.png" /></b-col>
                        <b-col>{{siteInfo.bank.num01}}</b-col>
                    </b-row>
                    <b-row>
                        <b-col><b-img src="/img/common/footer/account_kb.png" /></b-col>
                        <b-col>{{siteInfo.bank.num02}}</b-col>
                    </b-row>
                    <p class="owner">예금주 : {{siteInfo.bank.owner}}</p>
                </b-col>
                
                <b-col class="thi">
                    <p class="tit">공지사항 <b-link :to="{name: `bo_index`, params: { bo_cd:'notice' }}">></b-link></p>
                    
                    <b-link v-for="bo in notice" :key="bo.bo_id" :to="{name: 'bo_show', params: { bo_cd:bo.code, bo_id:bo.bo_id }}">
                        <span>{{bo.bo_subject}}</span>
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
                    <b-col class="logo"><b-img src="/img/common/footer_logo.png" /></b-col>
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
        'RecentGoods': () => import('../_module/RecentGoods.vue'),
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
    },
}
</script>

<style scoped>
#footer { margin-top:3rem auto; }
#footer #footer_top { padding:0; }
#footer #footer_top>.row { margin:0 -34px; }
#footer #footer_top .row .col { padding:0; }
#footer #footer_top>.row>.col { padding:34px; }
#footer #footer_top .row .col .tit { font-weight:bold; font-size:1.4rem; }
#footer #footer_top .row .fir p { text-align:center; margin-bottom:.5rem;}
#footer #footer_top .row .fir .tit { margin-top:2rem; }
#footer #footer_top .row .fir .tel { font-size:3rem; font-weight:bold; color:#17A2B8; line-height:48px; }
#footer #footer_top .row .fir p .ic { border-radius:50%; background:#5B6263; color:#FFF; font-weight:bold; width:25px; height:25px; display:inline-block; }
#footer #footer_top .row .fir p .ic:nth-child(2) { margin-left:1rem; }

#footer #footer_top .row .sec .tit { border-bottom:1px solid #333; padding:15px 0 8px 8px; margin-bottom:1.5rem; }
#footer #footer_top .row .sec .row { padding:10px 9%; }
#footer #footer_top .row .sec .row .col:nth-child(1) { flex:0 0 35%; max-width:35%; text-align:center; }
#footer #footer_top .row .sec .owner { text-align:center; background:#D7D7D7; padding:7px 0; margin-top:2rem; }

#footer #footer_top .row .thi .tit { border-bottom:1px solid #333; padding:15px 0 8px 8px; margin-bottom:1.5rem; margin:0; }
#footer #footer_top .row .thi .tit a { float:right; margin-right:8px; }
#footer #footer_top .row .thi>a { display:block; padding:14px 4px; border-bottom:1px solid #D7D7D7; margin:0 15px; }
#footer #footer_top .row .thi a:hover { background-color:#17A2B8; }
#footer #footer_top .row .thi a span:nth-child(2) { float:right; }

#footer #footer_bottom { background-color: #3A3A3A; padding:2rem 0; }
#footer #footer_bottom .container,
#footer #footer_bottom .container .row .col { padding:0; color:#fff; font-size:13px; }
#footer #footer_bottom .container .row { margin:0; }
#footer #footer_bottom .container .row A { color:#fff; }
#footer #footer_bottom .container .row:nth-child(1) { background: url(/img/common/footer/line.png) repeat-x bottom left; margin-bottom:10px; }
#footer #footer_bottom .container .row:nth-child(1) a { display:inline-block; margin-right:50px; padding:13px 0; }
#footer #footer_bottom .container .row .col p { margin:0; }
#footer #footer_bottom .container .row .col .copy { margin-top: 22px; }
#footer #footer_bottom .container .row .col.logo { text-align:right; }

</style>