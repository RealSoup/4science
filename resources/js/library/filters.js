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

Vue.filter('formatDate_YY_MM_DD', function (dt) {
    if (dt)
        return moment(String(dt)).format('YY-MM-DD');
});
Vue.filter('formatDate_YYYY_MM_DD', function (dt) {
    if (dt)
        return moment(String(dt)).format('YYYY-MM-DD');
});

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
        return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return 0;
    }
});

Vue.filter('rrp', function (val) {
    //  RECOMMENDED RETAIL PRICE     권장 소비자가격
    //  가격 + 부가세
    val = (val*1.1).toFixed();
    if (val) return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else return 0;
});

Vue.filter('price_zero', function (v) {   //  0원 견적가 표시
    return Number(v)==0? '견적가' : v;
});

Vue.filter('won', function (v) {   //  0원 견적가 표시
    return v=='견적가'? v : `${v} 원`;
});