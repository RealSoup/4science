<template>
<div class="calendar">
    <div class="p_top">
        <div class="left">
            <p>8월</p>
            <p>출석체크 이벤트</p>
        </div>

        <div class="right m_hide">
            <div class="octagon"></div>
            <div class="deco">
                <span class="octagon_deco"></span>
                <span class="coin1"><img src="/storage/event/2024/0801/main_coin_1.png" alt=""></span>
                <span class="coin2"><img src="/storage/event/2024/0801/main_coin_2.png" alt=""></span>
                <span class="coin3"></span>
                <span class="calender"></span>
                <span class="splash"></span>
            </div>
        </div>
    </div>
    <b-row tag="h2" cols="1" cols-sm="2">
        <b-col class="ctrl">
            <!-- <b-button @click="calendarData(-1)">&lt;</b-button> -->
            {{ year }}년 {{ month }}월
            <!-- <b-button @click="calendarData(1)">&gt;</b-button> -->
        </b-col>
        <b-col class="info">
            출석일수: <b>{{attendData.data.length}}</b>
            <span>&nbsp;</span>
            획득 마일리지: <b>{{attendData.sum_mileage}}</b>
        </b-col>
    </b-row>
    <table class="table">
        <thead><tr><th v-for="day in days" :key="day">{{ day }}</th></tr></thead>
        <tbody>
            <tr v-for="(date, tr_i) in dates" :key="tr_i">
                <td v-for="(date_box, td_i) in date" :key="td_i" 
                :class="{ 'another_month': tr_i === 0 && date_box.day >= lastMonthStart, 
                    'another_month': dates.length - 1 === tr_i && nextMonthStart > date_box.day,
                    'today': date_box.month === currentMonth && date_box.day === today && month === currentMonth && year === currentYear,
                    'redday': date_box.is_red }">
                    <span>{{ date_box.day }}</span>
                    <b v-if="date_box.is_attend">
                        M<i v-if="date_box.is_red">2</i><i v-else>1</i>00
                    </b>
                </td>
            </tr>
        </tbody>
    </table>

    <b-row class="btn_box">
        <b-col>
            <b-button disabled class="gray xl" v-if="today_check">출석체크완료</b-button>
            <b-button @click="store" class="blue xl" v-else>출석체크하기</b-button>
        </b-col>
    </b-row>

</div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'eventAttend',
    data() {
        return {
            days: [ '일', '월', '화', '수', '목', '금', '토' ],
            dates: [],
            currentYear: 0,
            currentMonth: 0,
            year: 0,
            month: 0,
            lastMonthStart: 0,
            nextMonthStart: 0,
            today: 0,
            attendData:{data:[]},
            today_check:false,
        };
    },


    methods: {
        calendarData(arg) { // 인자를 추가
            if (arg < 0)        this.month -= 1;    // -1이 들어오면 지난 달 달력으로 이동
            else if (arg === 1) this.month += 1;    // 1이 들어오면 다음 달 달력으로 이동
            
            if (this.month === 0) { // 작년 12월
                this.year -= 1;
                this.month = 12;
            } else if (this.month > 12) { // 내년 1월
                this.year += 1;
                this.month = 1;
            }
            const [ monthFirstDay, monthLastDate, lastMonthLastDate ] = this.getFirstDayLastDate(this.year, this.month);
            this.dates = this.getMonthOfDays( monthFirstDay, monthLastDate, lastMonthLastDate, );
        },

        getFirstDayLastDate(year, month) {
            const firstDay = new Date(year, month-1, 1).getDay();   // 이달 시작 요일
            const lastDate = new Date(year, month, 0).getDate();    // 이달 마지막 날짜
            let lastYear = year;
            let lastMonth = month - 1;
            if (month === 1) {
                lastMonth = 12;
                lastYear -= 1;
            }
            const prevLastDate = new Date(lastYear, lastMonth, 0).getDate(); // 지난 달 마지막 날짜
            return [firstDay, lastDate, prevLastDate];
        },
        /*      이달 시작 요일(숫자), 이달 마지막 날짜, 지난 달 마지막 날짜      */
        getMonthOfDays( monthFirstDay, monthLastDate, prevMonthLastDate ) {
            let day = 1;
            let prevDay = (prevMonthLastDate - monthFirstDay) + 1;  // 시작 주에 시작일
            const dates = [];
            let weekOfDays = [];
            let red_day = false;
            while (day <= monthLastDate) {
                if (day === 1) { // 1일이 어느 요일인지에 따라 테이블에 그리기 위한 지난 셀의 날짜들을 구할 필요가 있다.
                    for (let j=0; j<monthFirstDay; j+=1) {
                        if (j === 0) 
                            this.lastMonthStart = prevDay; // 지난 달에서 제일 작은 날짜
                        red_day = j===0;
                        weekOfDays.push({day:prevDay, month:this.month-1, is_red:red_day, attend:""});
                        prevDay += 1;
                    }
                }

                red_day = weekOfDays.length === 0 || weekOfDays.length === 6;
                let attend_day = false;
                this.attendData.data.forEach(el => {
                    if ( el.slice(0, 10) === this.year+'-'+('0'+this.month).slice(-2)+'-'+('0'+day).slice(-2) )
                        attend_day = true;
                    if ( el.slice(0, 10) === this.currentYear+'-'+('0'+this.currentMonth).slice(-2)+'-'+('0'+this.today).slice(-2) )
                        this.today_check = true;
                });

                weekOfDays.push({day:day, month:this.month, is_red:red_day, is_attend:attend_day});
                if (weekOfDays.length === 7) { // 일주일 채우면
                    dates.push(weekOfDays);
                    weekOfDays = []; // 초기화
                }
                day += 1;
            }
            const len = weekOfDays.length;
            if (len > 0 && len < 7) {
                for (let k = 1; k <= 7-len; k += 1) {
                    red_day = (k+len)==7;
                    weekOfDays.push({day:k, month:this.month+1, is_red:red_day, attend:""});
                }
            }
            if (weekOfDays.length > 0) 
                dates.push(weekOfDays); // 남은 날짜 추가
            this.nextMonthStart = weekOfDays[0]; // 이번 달 마지막 주에서 제일 작은 날짜
            return dates;
        },

        async index() {
            if (Auth.check()) {
                let res = await ax.get(`/api/event/attendIndex`, {params:{ year:this.year, month:this.month}});
                if (res && res.status === 200) 
                    this.attendData = res.data;
            }
            this.calendarData();
        },

        async store() {
            if (!Auth.check()) {
                Notify.modal("로그인이 필요합니다.", 'danger');
            } else {
                let res = await ax.get(`/api/event/attendStore`);
                if (res && res.status === 200) {
                    if (res.data == 'Exist')
                        Notify.modal("이미 출석 하였습니다.", 'warning');
                    else
                        Notify.toast('success', '출석체크 완료')
                    
                    if (res.data == 'Perfect Attendance')
                        Notify.modal("한달 모두 출석으로 1000점 추가 지급", 'success');

                    this.index();
                } else {
                    Notify.toast('warning', res);
                }
            }
        },
    },
    
    created() { // 데이터에 접근이 가능한 첫 번째 라이프 사이클
        const date = new Date();
        this.currentYear = date.getFullYear(); // 이하 현재 년, 월 가지고 있기
        this.currentMonth = date.getMonth() + 1;
        this.year = this.currentYear;
        this.month = this.currentMonth;
        this.today = date.getDate(); // 오늘 날짜
        // this.calendarData();
    },

    mounted() {
        this.index();
    },
}
</script>

<style type="text/css">
.calendar { margin-top:2em; }
.calendar h2 { text-align:center; margin-bottom:.3rem; }
.calendar h2 .ctrl { text-align:left; }
.calendar h2 .info { font-size:1rem; font-style:normal; align-self:flex-end; text-align:right; }
.calendar h2 .info b { color:#FF0000; }
.calendar table thead tr th,
.calendar table tbody tr td { text-align:center; }
.calendar table tbody tr td span {  border-radius:50%; min-width:30px; display:inline-block; padding:3px 0;  }
.calendar table tbody tr td b { display:block; }
.calendar table tbody tr td b i { font-style:normal; }
.calendar table tbody tr td.another_month { font-weight:900; color:#CCC; }
.calendar table tbody tr td.today span { background-color:#0E4D9C; color:#FFF; font-weight:900;  }
.calendar table tbody tr td.redday span,
.calendar table tbody tr td.redday b { color:#FF0000; font-weight:900;  }
.calendar table tbody tr td:hover { background-color:#EEE; }
.calendar table tbody tr td .rounded { -moz-border-radius:20px 20px 20px 20px; border-radius:20px 20px 20px 20px !important; border:solid 1px #ffffff; background-color:#2b6bd1; padding:10px; color:#ffffff; }

.calendar .p_top { width:100%; height:554px; position:relative; z-index:-1; }
.calendar .p_top .left p { position:relative; width:fit-content; font-size:4.5rem; font-weight:800; margin:0; line-height:1.4; }
.calendar .p_top .left p:nth-child(1)::before { content:''; width:34px; height:35px; background:url(/storage/event/2024/0801/main_deco_1.png); 
    position:absolute; top:0; right:-34px; animation: octagon 20s linear reverse infinite; }
.calendar .p_top .left p:nth-child(2)::before { content:''; width:0; height:29px; background:url(/storage/event/2024/0801/main_deco_back.png);
    position:absolute; bottom:2px; left:0; z-index:-1; overflow:hidden; animation:titline 1s forwards ease-in-out 2s; }
.calendar .p_top .left p:nth-child(2)::after { content:''; width:57px; height:97px; background: url(/storage/event/2024/0801/main_deco_2.png); 
    position:absolute; top:4px; right:-72px; transform-origin:bottom center; animation:titex 3s infinite ease-in-out 1.2s; }

.calendar .p_top .right { position: absolute; top: 0; left: 490px; }    
.calendar .p_top .right .octagon { width:1100px; height:1100px; border-radius:50%; left:184px; top:-490px; position:relative;
    animation:octagon 100s linear infinite; background: linear-gradient(to bottom, #33B4FF, #33B4FF, #4AFFB7); z-index:-1; }
.calendar .p_top .right .octagon::before { content:''; width:1122px; height:1122px; background: url(/storage/event/2024/0801/octa_bg.png) center center no-repeat;
    position: absolute; top: 50%; left: 50%; transform: Translate(-50%, -50%); }
.calendar .p_top .right .deco { width:745px; height:521px; position:absolute; top:31px; left:0; }
.calendar .p_top .right .deco .octagon_deco { width:645px; height:667px; position:absolute; top:-230px; left:400px; opacity:0.5; background: url(/storage/event/2024/0801/main_bg3.png) center center / contain no-repeat; }

.calendar .p_top .right .deco .coin1 { position:absolute; top:-31px; left:57px; transform:rotate(-25deg); transform:scale(0); animation:coin1 0.5s forwards ease-in-out 1.42s, coin2 3s infinite ease-in-out 2.5s; }
.calendar .p_top .right .deco .coin2 { position:absolute; top:134px; left:568px; width:132px; transform:scale(0); animation:coin1 0.5s forwards ease-in-out 1.2s, coin2 3s infinite ease-in-out 2s; }
.calendar .p_top .right .deco .coin3 { position:absolute; top:79px; right:0; width:58px; height:60px; background:url(/storage/event/2024/0801/main_deco_4.png) center center no-repeat; transform:scale(0);
    animation:coin1 0.5s forwards ease-in-out 1.42s, coin2 3s infinite ease-in-out 2s; }
.calendar .p_top .right .deco .calender { width:532px; height:374px; position:absolute; top:100px; left:30px; transform:rotate(10deg); background-size:contain;
    background-position:center; background-repeat:no-repeat; background-image: url(/storage/event/2024/0801/cld_8.png); }
.calendar .p_top .right .deco .splash { display:block; width:337px; height:278px; position:absolute; bottom:0; right:20px; background-size:contain; background-position:center;
    background-repeat:no-repeat; background-image: url(/storage/event/2024/0801/digi_l8.png); }

@keyframes octagon { 100% { transform: rotate(360deg); } }
@keyframes titex { 0%,18%,24%,32% { transform: rotate(0); }
                    20%,28% { transform: rotate(5deg); } }
@keyframes titline { 0% { width: 0; }
                    100% { width: 262px; } }       
@keyframes coin1 { 0% { transform: scale(0); }
                    80% { transform: scale(1.1); }
                    100% { transform: scale(1); } }
@keyframes coin2 { 0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(20px); } }                                 
@media (max-width: 576px) {
    .calendar h2 { margin-bottom:.3rem; }
    .calendar table th, 
    .calendar table td { padding: 0.2rem; }
    .calendar table tbody tr td b { font-size:.7rem; }

    .calendar .p_top { height: 121px; }
    .calendar .p_top .left p { font-size:2rem; }
    .calendar .p_top .left p:nth-child(2):before { height:13px; background-size:contain; background-repeat:no-repeat; }
    .calendar .p_top .left p:nth-child(2):after { height:50px; background-size: contain; background-repeat: no-repeat; }
}
</style>