import Vue from 'vue'
import moment from 'moment'


Vue.filter('truncate', function (text, length, suffix) {
    return text.substring(0, length) + suffix;
});

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
});

Vue.filter('formatDate_MM_DD', function (dt) { if (dt)           return moment(String(dt), 'YYYY-MM-DD HH:mm').format('MM-DD'); });
Vue.filter('formatDate_YY_MM_DD', function (dt) { if (dt)       return moment(String(dt), 'YYYY-MM-DD HH:mm').format('YY-MM-DD'); });
Vue.filter('formatDate_YYYY_MM_DD', function (dt) { if (dt)     return moment(String(dt), 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD'); });
Vue.filter('formatDate_MM_DD_HH:mm', function (dt) { if (dt)    return moment(String(dt), 'YYYY-MM-DD HH:mm').format('MM-DD HH:mm'); });
Vue.filter('formatDate_YY_MM_DD_HH:mm', function (dt) { if (dt) return moment(String(dt), 'YYYY-MM-DD HH:mm').format('YY-MM-DD HH:mm'); });
Vue.filter('formatDate', function (dt) {
    if (dt){
        // console.log(dt);
        // const date = new Date(dt);
        // const year = date.getFullYear();
        // let month = date.getMonth() + 1;
        // month = month > 9 ? month : `0${month}`;
        // const day = date.getDate();
        // let hours = date.getHours();
        // hours = hours > 9 ? hours : `0${hours}`;
        // const minutes = date.getMinutes();
        // return `${year}-${month}-${day} ${hours}:${minutes}`;
        const is_after = moment().isAfter(dt, 'year');
        let fm = '';
        if (moment().isSame(dt, 'day'))
            fm = 'HH:mm';
        else if (moment().isSame(dt, 'year'))
            fm = 'MM-DD';
        else
            fm = 'YY-MM-DD';

        return moment(String(dt)).format(fm);
    }

});

// Vue.filter('StringShortening', function (str) {
//     if (str) {
//         var maxLength = 70;
//         if (str.length < maxLength) return str;
//         return str.substring(0, maxLength) + '...';
//     }
// });

Vue.filter('comma', function (val) {
    if (val){
        return String(Math.floor(val)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return 0;
    }
});

Vue.filter('rrp', function (val) {
    //  RECOMMENDED RETAIL PRICE     권장 소비자가격
    //  가격 + 부가세
    val = Math.floor(val*1.1);
    if (val) return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else return 0;
});

Vue.filter('price_zero', function (v) {   //  0원 견적가 표시
    return Number(v)==0? '견적가' : v;
});

Vue.filter('won', function (v) {   //  0원 견적가 표시
    return v=='견적가'? v : `${v} 원`;
});

Vue.filter('pay_method_new_line', function (v) {   //  결제 방법 표시시 괄호는 다음 줄로
    return v.replace('(', '<br />(');
});

Vue.filter('dcDisplay', function (v) {
    return Number(v)<100? `${v}%` : String(Math.floor(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'원';
});