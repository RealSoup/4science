<template>

<div class="calendar">
    
    <b-row tag="h2" cols="1" cols-sm="2">
        <b-col class="ctrl">
            <b-button @click="calendarData(-1)">&lt;</b-button>
            {{ year }}년 {{ month }}월
            <b-button @click="calendarData(1)">&gt;</b-button>
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

@media (max-width: 576px) {
    .calendar h2 { margin-bottom:.3rem; }
    .calendar table th, 
    .calendar table td { padding: 0.2rem; }
    .calendar table tbody tr td b { font-size:.7rem; }
}
</style>