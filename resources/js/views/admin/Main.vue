<template>
<b-container class="p_wrap">
    <b-row>
        <b-col col lg="6" cols="12" class="left">
            <h4>주문현황</h4>
            <div class="box">
                <b-row class="top">
                    <b-col>오늘 주문 <span>{{con.today_order}}</span></b-col>
                    <b-col>최근 7일 주문 <span>{{order_7}}</span></b-col>
                </b-row>  
                <b-row class="body">
                    <b-col>
                        <span>{{con.order[10]}}</span>
                        <span>주문접수</span>
                        <span>주문 후 상태</span>
                    </b-col>
                    <b-col>
                        <span>{{parseInt(con.order[11])+parseInt(con.order[12])}}</span>
                        <span>입금확인중</span>
                        <span>주문 후, 입금 전</span>
                    </b-col>
                    <b-col>
                        <span>{{parseInt(con.order[20])+parseInt(con.order[30])}}</span>
                        <span>입금완료</span>
                        <span>주문 후, 입금 후</span>
                    </b-col>
                    <b-col>
                        <span>{{con.order[40]}}</span>
                        <span>배송중</span>
                        <span>상품 발송 후</span>
                    </b-col>
                    <b-col>
                        <span>{{con.order[50]}}</span>
                        <span>배송완료</span>
                        <span>고객 상품 수취</span>
                    </b-col>
                    <b-col>
                        <span>{{con.order[60]}}</span>
                        <span>주문취소</span>
                        <span>주문 최소 상태</span>
                    </b-col>
                </b-row>
            </div>
        </b-col>
        
        <b-col col lg="6" cols="12" class="right">
            <h4>견적현황</h4>
            <div class="box">
                <b-row class="top">
                    <b-col>오늘 견적 <span>{{con.today_estimate}}</span></b-col>
                    <b-col>최근 7일 견적 <span>{{con.estimateReqCount}}</span></b-col>
                </b-row>
                <div class="body">
                    <b-row class="head">
                        <b-col>요청일</b-col>
                        <b-col>아이디</b-col>
                        <b-col>이름</b-col>
                        <b-col>견적요쳥 내용</b-col>
                    </b-row>

                    <perfect-scrollbar>
                    <b-row v-for="eq in con.estimateReq" :key="eq.eq_id" class="list">
                        <b-col>{{ eq.created_at | formatDate_MM_DD_HH:mm }}</b-col>
                        <b-col>{{eq.eq_email}}</b-col>
                        <b-col>{{eq.eq_name}}</b-col>
                        <b-col @click="openWinPop(`/admin/shop/estimate/req/${eq.eq_id}`, 1300, 900)" class="eq_tit">
                            <b v-if="eq.eq_title" v-html="eq.eq_title"></b>
                            <SubString v-else-if="eq.eq_type == 'REQ'" v-model="eq.eq_content" :width="900"></SubString>

                            <b-badge v-if="eq.eq_type == 'TEMP'" class="yellow" v-b-tooltip.hover title="임의견적" >임</b-badge>
                            <b-badge v-else-if="eq.eq_type == 'REREQ'" class="plum" v-b-tooltip.hover title="재견적요청" >재</b-badge>
                            <b-badge v-else-if="eq.eq_type == 'CUS'" class="mint" v-b-tooltip.hover title="주문제작">주</b-badge>
                        </b-col>
                    </b-row>
                    </perfect-scrollbar>
                </div>
            </div>
        </b-col>
    </b-row>

    <b-row v-if="canSeeVisitor" class="mt-4">
        <b-col col cols="12" class="visitor">
            <h4>방문자현황 <small>GA4 기준 · 1시간마다 갱신 (실시간은 1분) <template v-if="vs">· {{ vs.updated_at }} 기준</template></small></h4>
            <div class="box">
                <div v-if="vsError" class="empty">{{ vsError }}</div>
                <template v-else>
                    <div class="stats">
                        <div class="stat live"><b>{{ rt ? num(rt.active) : '-' }}</b><span>지금 접속자 (30분)</span></div>
                        <div class="stat"><b>{{ vs ? num(vs.today) : '-' }}</b><span>오늘 (집계 중)</span></div>
                        <div class="stat"><b>{{ vs ? num(vs.yesterday) : '-' }}</b><span>어제</span></div>
                        <div class="stat"><b>{{ vs ? num(vs.avgDay) : '-' }}</b><span>일 평균 (30일)</span></div>
                        <div class="stat"><b>{{ vs ? num(vs.avgWeek) : '-' }}</b><span>주 평균 (8주)</span></div>
                        <div class="stat"><b>{{ vs ? num(vs.avgMonth) : '-' }}</b><span>월 평균 (6개월)</span></div>
                    </div>

                    <div class="charts">
                        <div class="pn">
                            <p>최근 30일 일별 방문자</p>
                            <div class="chart"><ChartJS v-if="vs" :chart-data="dayChart" :options="chartOpt" /></div>
                        </div>
                        <div class="pn">
                            <p>실시간 · 분당 접속자 (30분 전 → 지금)</p>
                            <div class="chart"><ChartJS v-if="rt" :chart-data="minChart" :options="chartOpt" /></div>
                        </div>
                    </div>

                    <div class="lists">
                        <div class="pn">
                            <p>지금 보는 페이지</p>
                            <div v-for="(r, i) in (rt ? rt.pages : [])" :key="i" class="li"><span>{{ r.name }}</span><b>{{ num(r.cnt) }}</b></div>
                        </div>
                        <div class="pn">
                            <p>인기 페이지 (7일 조회수)</p>
                            <div v-for="(r, i) in (vs ? vs.pages : [])" :key="i" class="li"><span>{{ r.name }}</span><b>{{ num(r.cnt) }}</b></div>
                        </div>
                        <div class="pn">
                            <p>유입 경로 (7일)</p>
                            <div v-for="(r, i) in (vs ? vs.channels : [])" :key="i" class="li"><span>{{ r.name }}</span><b>{{ r.pct }}%</b></div>
                        </div>
                        <div class="pn">
                            <p>기기 (7일)</p>
                            <div v-for="(r, i) in (vs ? vs.devices : [])" :key="i" class="li"><span>{{ r.name }}</span><b>{{ r.pct }}%</b></div>
                            <div v-if="vs" class="li"><span>재방문 비율</span><b>{{ vs.returning }}%</b></div>
                        </div>
                    </div>
                </template>
            </div>
        </b-col>
    </b-row>

    <!-- <b-row class="mt-4">
        <b-col cols="12" class="schedule">
            <h4>스케줄 작업 로그 (최근 7일)</h4>
            <div class="box">
                <div v-if="!scheduleLog.length" class="empty">기록된 로그가 없습니다.</div>
                <div v-for="(day, i) in scheduleLog" :key="day.date" class="day">
                    <b-button block v-b-toggle="'sched-' + day.date"
                        :variant="day.hasIssue ? 'outline-danger' : 'outline-secondary'">
                        {{ day.date }}
                        <b-badge :variant="day.hasIssue ? 'danger' : 'success'" class="ml-2">
                            {{ day.hasIssue ? '확인 필요' : '정상' }}
                        </b-badge>
                    </b-button>
                    <b-collapse :id="'sched-' + day.date" :visible="i === 0">
                        <div v-for="(job, idx) in day.jobs" :key="idx" :class="['log-line', job.level.toLowerCase()]">
                            <span class="time">{{ job.time }}</span>
                            <span class="label">{{ job.label }}</span>
                            <span class="msg">{{ job.message }}</span>
                        </div>
                    </b-collapse>
                </div>
            </div>
        </b-col>
    </b-row> -->
</b-container>
</template>

<script>
import ax from '@/api/http';
import ChartJS from '@/views/admin/stats/_comp/ChartJS';
import { mapGetters } from 'vuex';
export default {
    name: 'admMain',
    components: { ChartJS },

    data() { 
        return { 
            con:{ 
                order:{ 10:0, 11:0, 12:0, 20:0, 30:0, 40:0, 50:0, 60:0, }, 
                estimateReq:[], 
                estimateReqCount:0 
            }, 
            scheduleLog:[],
            vs:null,            //  방문자 하루 단위 숫자
            rt:null,            //  실시간 30분
            vsError:'',
            rtTimer:null,
            chartOpt:{
                responsive:true, maintainAspectRatio:false, legend:{ display:false },
                scales:{ yAxes:[{ ticks:{ beginAtZero:true, precision:0 } }], xAxes:[{ gridLines:{ display:false } }] }
            },
        };
    },
    computed: {
        ...mapGetters({ user: 'auth/user' }),
        //  방문자현황은 활성 관리자 중 사원(1)~이사(6)만 (MainController::canSeeVisitor와 같은 조건)
        canSeeVisitor() {
            const um = (this.user && this.user.user_mng) || {};
            const pos = parseInt(um.um_position);
            return um.um_status === 'Y' && pos >= 1 && pos <= 6;
        },
        order_7() { return Object.values(this.con.order).reduce((acc, el) => acc + el , 0); },
        dayChart() {
            return {
                labels: this.vs.days.map(d => d.date),
                datasets: [{ label:'방문자', data: this.vs.days.map(d => d.users), backgroundColor:'#8368D6' }]
            };
        },
        minChart() {
            return {
                labels: this.rt.perMin.map((v, i) => `${30 - i}분 전`),
                datasets: [{ label:'접속자', data: this.rt.perMin, backgroundColor:'#D4537E' }]
            };
        },
        // estimate_7() { return Object.values(this.con.estimateReq).reduce((acc, el) => acc + el , 0); },
    },
    async mounted() {
        try {
            const res = await ax.get(`/api/admin`);
            if (res && res.status === 200)
                this.con = res.data;

            // const logRes = await ax.get(`/api/admin/scheduleLog`);
            // if (logRes && logRes.status === 200)
            //     this.scheduleLog = logRes.data;
            
            
        } catch (e) {
            Notify.consolePrint(e);
            Notify.toast('warning', e.response.data.message);
        }

        //  방문자현황은 GA4가 느리거나 실패해도 위 주문/견적 화면에 영향 없도록 따로 불러온다
        if (!this.canSeeVisitor)
            return;
        this.loadVisitor();
        this.loadRealtime();
        this.rtTimer = setInterval(this.loadRealtime, 60 * 1000);
    },
    beforeDestroy() {
        clearInterval(this.rtTimer);
    },
    methods: {
        num(v) { return Number(v || 0).toLocaleString(); },
        async loadVisitor() {
            try {
                const res = await ax.get(`/api/admin/visitor`);
                this.vs = res.data;
            } catch (e) {
                this.vsError = (e.response && e.response.data.message) || '방문자 통계를 불러오지 못했습니다.';
            }
        },
        async loadRealtime() {
            try {
                const res = await ax.get(`/api/admin/visitor/realtime`);
                this.rt = res.data;
            } catch (e) {
                //  실시간은 1분 뒤 다시 시도 (오류 문구는 loadVisitor 쪽에서 보여줌)
            }
        },
    },
};
</script>

<style lang="css" scoped>
.p_wrap h4 { font-size:1.6rem; font-weight:bold; margin-bottom:1rem; }
.p_wrap .row .col .box { border-width:5px; border-style:solid; border-radius:1rem; padding:.75rem 1.5rem; background-color:#EFF0F2; }
.p_wrap .row .left { padding-right:1%; }
.p_wrap .row .left .box { border-color:#458CCA; }
.p_wrap .row .right .box { border-color:#51B948; }
.p_wrap .row .col .box .row { margin:0; }

.p_wrap .row .col .box .top .col { text-align:center; padding:.65rem 0 .45rem 0; font-size:1.25rem; font-weight:600; display:flex; justify-content:center; align-items:center; }
.p_wrap .row .col .box .top .col span { font-size:2.53rem; margin-left:2rem; }
.p_wrap .row .col .box .top .col:first-child { border-right:1px solid #C2C2C2; }
.p_wrap .row .left .box .top .col span { color:#458CCC; }
.p_wrap .row .right .box .top .col span { color:#51B948; }

.p_wrap .row .col .box .body { margin-top:.5rem; }
.p_wrap .row .left .box .body { margin-bottom:1.25rem; }
.p_wrap .row .left .box .body { padding-top:1.7rem; border-top:1px solid #C2C2C2; }
.p_wrap .row .left .box .body .col { padding:0; }
.p_wrap .row .left .box .body .col:not(:first-child) { padding-left:5px; }
.p_wrap .row .left .box .body .col:not(:last-child) { padding-right:5px; }
.p_wrap .row .left .box .body .col span { text-align:center; display:block; }
.p_wrap .row .left .box .body .col span:nth-child(1) { padding:4.2rem 0; background-color:#fff; font-size:1.9rem; border-radius:1rem; font-weight:600; }
.p_wrap .row .left .box .body .col span:nth-child(2) { margin-top:1rem; font-weight:800; }
.p_wrap .row .left .box .body .col span:nth-child(3) { font-size:.9rem; margin-top:.15rem; }

.p_wrap .row .right { padding-left:1%; }
.p_wrap .row .right .box { padding-bottom:0; }
.p_wrap .row .right .box .body { margin-left:-1.5rem; margin-right:-1.5rem; padding-bottom:1.5rem; background:#fff; border-radius:1rem; }
.p_wrap .row .right .box .body .head { background-color:#A0A0A0; color:#FFF;  }
.p_wrap .row .right .box .body .row .col { padding:0; }
.p_wrap .row .right .box .body .ps { height:239px; background-color:#fff; }
.p_wrap .row .right .box .body .row .col { padding:.56rem .53rem .50rem .53rem; text-align:center; }
.p_wrap .row .right .box .body .row .col:not(:last-child) { border-right:1px solid #C2C2C2; }
.p_wrap .row .right .box .body .row .col:nth-child(1) { flex:0 0 14%; max-width:14%; }
.p_wrap .row .right .box .body .row .col:nth-child(2) { flex:0 0 24%; max-width:24%; }
.p_wrap .row .right .box .body .row .col:nth-child(3) { flex:0 0 12.1%; max-width:12.1%; }
.p_wrap .row .right .box .body .list .col:nth-child(4) { text-align:left; text-overflow:ellipsis; white-space:nowrap; word-wrap:normal; overflow:hidden; vertical-align:bottom; }
.p_wrap .row .right .box .body .list .col { padding:.99rem .53rem .8rem .53rem; font-size:.9rem; }

.p_wrap .row .right .box .body .ps >>> .ps__rail-y { background-color:#eee; opacity:.9; z-index:1; cursor:pointer; }
.p_wrap .row .right .box .body .ps >>> .ps__rail-y > .ps__thumb-y { background-color:#438DCC; width:11px; }

@media (max-width: 992px){
    .p_wrap { margin-left:auto; margin-right:auto; }
    .p_wrap .row .left { margin-bottom:9%; }

}

.p_wrap .visitor h4 small { font-size:.85rem; font-weight:normal; color:#888; margin-left:.5rem; }
.p_wrap .visitor .box { border-color:#8368D6; }
.p_wrap .visitor .empty { padding:1.5rem; color:#999; text-align:center; }
.p_wrap .visitor .stats { display:grid; grid-template-columns:repeat(6, minmax(0, 1fr)); gap:.75rem; }
.p_wrap .visitor .stat { background:#fff; border-radius:1rem; padding:1rem .5rem; text-align:center; }
.p_wrap .visitor .stat b { display:block; font-size:1.9rem; font-weight:600; color:#8368D6; }
.p_wrap .visitor .stat span { font-size:.9rem; font-weight:800; }
.p_wrap .visitor .stat.live { box-shadow:inset 0 0 0 3px #D4537E; }
.p_wrap .visitor .stat.live b { color:#D4537E; }
.p_wrap .visitor .charts { display:grid; grid-template-columns:2fr 1fr; gap:.75rem; margin-top:.75rem; }
.p_wrap .visitor .lists { display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:.75rem; margin:.75rem 0 .5rem 0; }
.p_wrap .visitor .pn { background:#fff; border-radius:1rem; padding:.75rem 1rem; min-width:0; }
.p_wrap .visitor .pn p { font-weight:800; margin-bottom:.5rem; }
.p_wrap .visitor .chart { height:200px; }
.p_wrap .visitor .li { display:flex; justify-content:space-between; gap:.5rem; padding:.35rem 0; border-bottom:1px solid #eee; font-size:.9rem; }
.p_wrap .visitor .li span { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
@media (max-width: 992px){
    .p_wrap .visitor .stats { grid-template-columns:repeat(3, minmax(0, 1fr)); }
    .p_wrap .visitor .charts, .p_wrap .visitor .lists { grid-template-columns:1fr; }
}

.p_wrap .schedule .box { border-color:#8368D6; }
.p_wrap .schedule .day { margin-bottom:.5rem; }
.p_wrap .schedule .day:last-child { margin-bottom:0; }
.p_wrap .schedule .log-line { padding:.35rem .5rem; font-size:.85rem; border-bottom:1px solid #eee; }
.p_wrap .schedule .log-line .time { color:#888; margin-right:.75rem; }
.p_wrap .schedule .log-line .level { font-weight:700; margin-right:.75rem; }
.p_wrap .schedule .log-line .label { font-weight:700; margin-right:.75rem; }
.p_wrap .schedule .log-line.warning { background:#FFF8E1; }
.p_wrap .schedule .log-line.warning .level { color:#B8860B; }
.p_wrap .schedule .log-line.error { background:#FDECEA; }
.p_wrap .schedule .log-line.error .level { color:#C0392B; }
.p_wrap .schedule .empty { padding:1rem; color:#999; text-align:center; }
</style>