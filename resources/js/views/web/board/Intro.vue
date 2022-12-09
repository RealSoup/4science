<template>
    <b-container class="w_fence">
        <h3>커뮤니티</h3>
        <b-row>
            <b-col>
                <b-link :to="{name: 'bo_index', params: { bo_cd:'notice' }}"></b-link>
                <IntroList :list="notice" />
            </b-col>
            <b-col col lg="6">
                <b-link :to="{name: 'bo_index', params: { bo_cd:'event' }}"></b-link>
                <IntroList :list="event" />
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-link :to="{name: 'bo_index', params: { bo_cd:'gd_inquiry' }}"></b-link>
                <IntroListPhoto :list="gd_inquiry" />
            </b-col>

            <b-col>
                <b-link href="https://blog.naver.com/4science"></b-link>
                <IntroListPhoto :list="blog" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'BoardIntro',
    
    components: {
        'IntroList': () =>     import('./IntroList.vue'),
        'IntroListPhoto': () =>     import('./IntroListPhoto.vue'),
    },

    data() {
        return {
            open:[],
            notice:[],
            gd_inquiry:[],
            event:[],
            blog:[
                {   
                    bo_id: 1, 
                    bo_subject: "DURRIDGE사 라돈측정기", 
                    bo_content: "공기 중의 Radon Gas 농도 측정 <br> 건축물, 토목 자재 및 가구의 Radon 방출량 측정<br> 지하수 및 하천수의 Radon Gas 농도 측정(옵션 추가 필요)......", 
                    goods:{
                        'image_src_thumb':['/img/board/blog220122.jpg']
                    },
                    href:'https://blog.naver.com/4science/221778968634'
                }, {   
                    bo_id:2, 
                    bo_subject:"GRIMM사 미세먼지 측정기", 
                    bo_content:"요즘 미세먼지가 매우매우 큰 이슈입니다. 그래서 준비했다!!!<br> 환경부에서 공기질을 측정하는 기기 중 신뢰성이 가장 높다고 발표한 그림(Grimm)사의 제품. 본제품은 국내외 미세먼지 측정기 및 공기청......", 
                    goods:{
                        'image_src_thumb':['/img/board/blog191113.jpg']
                    },
                    href:'https://blog.naver.com/4science/221658684815'
                }, {   
                    bo_id:3, 
                    bo_subject:"GRIMM Aerosol Generators", 
                    bo_content:"미세먼지 측정기의 대가 GRIMM 사의 Aerosol Generators입니다. 우선 모델 7811의 경우 다목적 분무기는 입자를 분무할 수 있는 공기와 에어로졸 원료를 선택적으로 희석 및 건조를 위한 2개의 통합 펌프를 갖춘 .......", 
                    goods:{
                        'image_src_thumb':['/img/board/blog190911.jpg']
                    },
                    href:'https://blog.naver.com/4science/221645634590'
                }
            ]
        };
    },

    mounted() {
        this.index();
    },

    methods: {
        async index(){
            try {
                // let res = await ax.get(`/api/board/open`, { params: {'limit':5}});
                // if (res && res.status === 200) this.open = res.data.list;
                
                let res = await ax.get(`/api/board/notice`, { params: {'limit':5}});
                if (res && res.status === 200) this.notice = res.data.list.data;

                res = await ax.get(`/api/board/gd_inquiry`, { params: {'limit':3}});
                if (res && res.status === 200) this.gd_inquiry = res.data.list.data;

                res = await ax.get(`/api/board/event`, { params: {'limit':5}});
                if (res && res.status === 200) this.event = res.data.list.data;
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
};
</script>

<style lang="css" scoped>
.w_fence h3 { border-bottom:2px solid #000; padding:0 25px 15px 25px; margin:0 -15px 30px; }

.w_fence .row .col { padding:30px; }
.w_fence .row .col a { position:absolute; top:14px; left:50px; width:260px; height:80px; display:inline-block; background-repeat:no-repeat; background-position:center center; z-index:1; }
.w_fence .row .col>>>ul { border:3px solid #000; border-radius:20px; padding:50px 40px 30px; position:relative; }
.w_fence .row:nth-of-type(1) .col:nth-of-type(1) a { background-image:url('/img/community/notice.png'); }
.w_fence .row:nth-of-type(1) .col:nth-of-type(2) a { background-image:url('/img/community/event.png'); }
.w_fence .row:nth-of-type(2) .col:nth-of-type(1) a { background-image:url('/img/community/gd_inquiry.png'); }
.w_fence .row:nth-of-type(2) .col:nth-of-type(2) a { background-image:url('/img/community/blog.png'); }
.w_fence .row:nth-of-type(1) .col:nth-of-type(1) a:hover { background-image:url('/img/community/notice_h.png'); }
.w_fence .row:nth-of-type(1) .col:nth-of-type(2) a:hover { background-image:url('/img/community/event_h.png'); }
.w_fence .row:nth-of-type(2) .col:nth-of-type(1) a:hover { background-image:url('/img/community/gd_inquiry_h.png'); }
.w_fence .row:nth-of-type(2) .col:nth-of-type(2) a:hover { background-image:url('/img/community/blog_h.png'); }

</style>