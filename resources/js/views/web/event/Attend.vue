<template>
<div class="calendar">
    
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
    <b-img src="/storage/event/2024/0801/tit_top.png" id="tit_top" class="m_hide" />
    <table class="table">
        <thead><tr><th v-for="day in days" :key="day">{{ day }}</th></tr></thead>
        <tbody>
            <tr v-for="(date, tr_i) in dates" :key="tr_i">
                <td v-for="(date_box, td_i) in date" :key="td_i" 
                :class="{ 'another_month': (tr_i === 0 && date_box.day >= lastMonthStart) || (dates.length - 1 === tr_i && nextMonthStart > date_box.day), 
                    'today': date_box.month === currentMonth && date_box.day === today && month === currentMonth && year === currentYear,
                    'redday': date_box.is_red || (date_box.day == '15' && month == '8'),
                    'chk_b': date_box.is_attend && !date_box.is_red,
                    'chk_r': date_box.is_attend && date_box.is_red }">
                    <span>{{ date_box.day }}</span>
                </td>
            </tr>
        </tbody>
    </table>
    <b-img src="/storage/event/2024/0801/coin.png" class="coin_p p01" />
    <b-img src="/storage/event/2024/0801/coin_left.png" class="coin_p p02" />

    <b-row class="btn_box">
        <b-col>
            <template v-if="clickable">
                <b-button disabled class="gray xl" v-if="today_check">출석체크완료</b-button>
                <b-img @click="store" v-else src="/storage/event/2024/0801/btn.png" />
            </template>
            <b-button v-else class="gray xl">처리중 •••</b-button>
            
            
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
            clickable : true,
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
            if (weekOfDays.length > 0) {
                dates.push(weekOfDays); // 남은 날짜 추가
                this.nextMonthStart = weekOfDays[0].day; // 이번 달 마지막 주에서 제일 작은 날짜
            }
            return dates;
        },

        async index() {
            if (Auth.check()) {
                let res = await ax.get(`/api/event/attendIndex`, {params:{ year:this.year, month:this.month}});
                if (res && res.status === 200) 
                    this.attendData = res.data;
            }
            this.clickable = true;
            this.calendarData();
        },

        async store() {
            if (!Auth.check()) {
                Notify.modal("로그인이 필요합니다.", 'danger');
            } else {
                this.clickable = false;
                let res = await ax.get(`/api/event/attendStore`);
                if (res && res.status === 200) {
                    if (res.data == 'Exist')
                        Notify.modal("이미 출석 하였습니다.", 'warning');
                    else if (res.data == 'login required') {
                        Notify.modal("로그인이 필요합니다.", 'danger');
                        window.location.reload(true);
                    } else
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
        // this.month = 8;
        this.today = date.getDate(); // 오늘 날짜
        // this.calendarData();
    },

    mounted() {
        this.index();
    },
}
</script>

<style type="text/css">
.calendar h2 { margin-bottom:.3rem; text-align:center; display:none; }
.calendar h2 .ctrl{text-align:left}
.calendar h2 .info{align-self:flex-end;font-size:1rem;font-style:normal;text-align:right}
.calendar h2 .info b{color:red}

.calendar { background:url(/storage/event/2024/0801/bg.jpg) center top no-repeat; padding-top:2rem; padding-bottom:9rem; }
.calendar #tit_top { margin:auto; display:block; animation:appearance 0.5s forwards ease-in-out 1.2s, shake 2.5s infinite ease-in-out 1.2s; /*animation:appearance 0.5s forwards ease-in-out 1.2s, tit_top 3s infinite ease-in-out 2s;*/ }
@keyframes tit_top {
	0%   { transform: translateY(0); }
    20%  { transform: translateY(1px); }
    30%  { transform: translateY(20px); }
    40%  { transform: translateY(10px); }
    50%  { transform: translateY(20px); }
    60%  { transform: translateY(10px); }
    70%  { transform: translateY(5px); }
    80%  { transform: translateY(1px); }
    100% { transform: translateY(0); }
}
.calendar table {margin:38.6rem auto 0; max-width:941px; position:relative; left:-8px; }
.calendar table thead { display:none; text-align:center; padding:.79rem .75rem; }
.calendar table tbody tr td { text-align:center; border:none; padding:.79rem .75rem; }
.calendar table tbody tr td:nth-child(1),
.calendar table tbody tr td:nth-child(7) { width:128px; }
.calendar table tbody tr td.chk_b { background:url(/storage/event/2024/0801/chk_blue.png) no-repeat center center; }
.calendar table tbody tr td.chk_r { background:url(/storage/event/2024/0801/chk_pink.png) no-repeat center center; }

.calendar .coin_p { position:absolute; animation:appearance 0.5s forwards ease-in-out 1.2s, coin_p 3s infinite ease-in-out 2s; }
.calendar .coin_p.p01 { bottom:920px; right:70px; }
.calendar .coin_p.p02 { bottom:220px; left:300px; }
@keyframes appearance { 0% { transform: scale(0); }
                    80% { transform: scale(1.1); }
                    100% { transform: scale(1); } }
@keyframes coin_p { 0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(20px); } }
@keyframes shake { 0%,18%,24%,32% { transform: rotate(0); }
                    20%,28% { transform: rotate(5deg); } }            

.calendar .btn_box { margin-top:10.3rem; }
.calendar .btn_box img:hover { filter: brightness(85%); position:relative; top:2px; left:2px; cursor:pointer; }

.calendar table tbody tr td span {  border-radius:50%; min-width:30px; display:inline-block; padding:10.5px 0; font-size:3rem; color:#1F2E83; }
.calendar table tbody tr td.another_month { font-weight:900; color:#CCC; }
/*.calendar table tbody tr td.today span { background-color:#0E4D9C; color:#FFF; font-weight:900;  }*/
.calendar table tbody tr td.redday span { color:#F336D8; }

@media (max-width: 1300px) { .calendar .coin_p { display:none; } }

@media (max-width: 992px){
    .calendar h2 { display:flex; }
    .calendar { background:none; max-width:650px; margin: auto; }
    .calendar table { margin:auto; }
    .calendar table thead { display:table-header-group; }
    .calendar table tbody tr td { background-size:80% !important; border-top: 1px solid #dee2e6; }
    .calendar table tbody tr td:nth-child(1),
    .calendar table tbody tr td:nth-child(7) { width:auto; }
    .calendar table tbody tr td span { font-size:1rem; }
    .calendar .btn_box { margin-top: 1rem; }
}
@media (max-width: 576px) {
    .calendar table th, 
    .calendar table td { padding: 0.2rem; }
    .calendar .btn_box img { width:90%; }
}
</style>