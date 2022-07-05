<template>
    <b-container>
        <b-row>
            <!-- <b-col>
                <b-link :to="{name: 'bo_index', params: { bo_cd:'open' }}">열린게시판 <b-icon-plus-square-fill /></b-link>
                <IntroList :list="open" />
            </b-col> -->

            <b-col>
                <b-link :to="{name: 'bo_index', params: { bo_cd:'notice' }}">공지사항 <b-icon-plus-square-fill /></b-link>
                <IntroList :list="notice" />
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-link :to="{name: 'bo_index', params: { bo_cd:'gd_inquiry' }}">상품문의 <b-icon-plus-square-fill /></b-link>
                <IntroListPhoto :list="gd_inquiry" :type="'inner'" />
            </b-col>

            <b-col>
                <b-link href="https://blog.naver.com/4science">블로그 <b-icon-plus-square-fill /></b-link>
                <IntroListPhoto :list="blog" :type="'outer'" />
            </b-col>
        </b-row>

        <b-row>
            <b-col col lg="6">
                <b-link :to="{name: 'bo_index', params: { bo_cd:'event' }}">이벤트 <b-icon-plus-square-fill /></b-link>
                <IntroList :list="event" />
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
                
                res = await ax.get(`/api/board/notice`, { params: {'limit':5}});
                if (res && res.status === 200) this.notice = res.data.list;

                res = await ax.get(`/api/board/gd_inquiry`, { params: {'limit':3, 'type':'photo'}});
                if (res && res.status === 200) this.gd_inquiry = res.data.list;

                res = await ax.get(`/api/board/event`, { params: {'limit':5}});
                if (res && res.status === 200) this.event = res.data.list;
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.row  { margin-top:2rem; }
.row .col a { background:#DDD; padding:1rem; display:block; font-weight: bold; font-size: 1.5rem; }
.row .col a svg { float:right; color:#FFF; }
</style>