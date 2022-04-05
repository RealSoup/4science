import ax from '@/api/http';
import store from '@/store/index';

export default {
    install(Vue, options) {
        const vm = new Vue();

        // 1. 전역 메소드 또는 속성 추가
        Vue.myGlobalMethod = function () {
            // 필요한 로직 ...
        }

        window.Notify = function () {};
        window.Notify.toast = function (type, msg) {
            vm.$bvToast.toast(msg, {
                title: 'Notice!',
                variant: type,
                toaster: "b-toaster-top-center",
                autoHideDelay: 5000,
                appendToast: true
            })


            // Vue.prototype.bvAlert = function (msg) {
            //     let vm = new Vue();
            //     vm.$bvModal.msgBoxOk(msg, {
            //         title: 'Confirmation',
            //         size: 'sm',
            //         buttonSize: 'sm',
            //         okVariant: 'secondary',
            //         headerClass: 'p-2 border-bottom-0',
            //         footerClass: 'p-2 border-top-0',
            //         headerBgVariant: 'danger',
            //         headerTextVariant: 'light',
            //         centered: true,
            //     });
            // }
        };

        window.Notify.modal = function (msg) {
            vm.$bvModal.msgBoxOk(msg, {
                title: 'Confirmation',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'secondary',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                headerBgVariant: 'danger',
                headerTextVariant: 'light',
                centered: true,
            });
        };

        window.Notify.consolePrint = function (error) {
            if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                // Node.js의 http.ClientRequest 인스턴스입니다.
                console.log(error.request);
            } else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                console.log('Error', error.message);
            }
            console.log(error.config);
            console.log(error);
        };

        window.Notify.confirm = async function (msg, type) {
            var opt = { danger: { bodyBgVariant: 'danger',      bodyTextVariant: 'light', },
                        warning: { bodyBgVariant: 'warning',    bodyTextVariant: 'dark', }, };
            return await vm.$bvModal.msgBoxConfirm( msg+" 하시겠습니까?",
                Object.assign({
                    hideHeader: true,
                    bodyClass: 'font-weight-bold',
                    size: 'sm',
                    buttonSize: 'sm',
                    okTitle: 'YES',
                    okVariant: 'secondary',
                    cancelTitle: 'NO',
                    cancelVariant: 'light',
                    footerClass: 'p-0',
                    centered: true,
                    // hideHeaderClose: false,
                    // title: '안내',
                    // headerTextVariant: 'light',
                    // headerClass: 'p-1',
                }, opt[type])
            ).then(value => { return value; })
            .catch(err => { /* An error occurred */ });
        };

        window.getQueryString = function (params){
            return Object.keys(params).map(key => key + '=' + params[key]).join('&');
        };

        window.isEmpty = function (v){
            if( v == "" || v == null || v == undefined || Number.isNaN(v) || ( v != null && typeof v == "object" && !Object.keys(v).length ) ) return true;
            else return false;
        };

        window.numCheck = function (v){
            if (isEmpty(v)) v = 0;
            return Number(v);
        };

        window.numberFomatter = function (num, type) {
            if(!num) return num
            num = num.replace(/[^0-9]/g, '')

            let res = ''

            if ( type == 'tel' ) {
                if(num.length < 3) {
                    res = num
                } else {
                    if(num.substr(0, 2) =='02') {
                        if(num.length <= 5) {//02-123-5678
                            res = num.substr(0, 2) + '-' + num.substr(2, 3)
                        } else if(num.length > 5 && num.length <= 9) {//02-123-5678
                            res = num.substr(0, 2) + '-' + num.substr(2, 3) + '-' + num.substr(5)
                        } else if(num.length > 9) {//02-1234-5678
                            res = num.substr(0, 2) + '-' + num.substr(2, 4) + '-' + num.substr(6)
                        }
                    } else {
                        if(num.length <= 8)         res = num.substr(0, 3) + '-' + num.substr(3)
                        else if(num.length == 9)    res = num.substr(0, 3) + '-' + num.substr(3, 3) + '-' + num.substr(6)
                        else if(num.length == 10)   res = num.substr(0, 3) + '-' + num.substr(3, 3) + '-' + num.substr(6)
                        else if(num.length > 10)    res = num.substr(0, 3) + '-' + num.substr(3, 4) + '-' + num.substr(7)  //010-1234-5678
                    }
                }
            } else if ( type == 'id' ) {
                if(num.length < 7)          res = num
                else                        res = num.substr(0, 6) + '-' + num.substr(6, 7)
            } else if ( type == 'card' ) {
                if(num.length < 4)          res = num
                else if(num.length < 8)     res = num.substr(0, 4) + '-' + num.substr(4)
                else if(num.length < 12)    res = num.substr(0, 4) + '-' + num.substr(4, 4) + '-' + num.substr(8)
                else                        res = num.substr(0, 4) + '-' + num.substr(4, 4) + '-' + num.substr(8, 4) + '-' + num.substr(12, 4)
            } else if ( type == 'biz' ) {
                if(num.length < 3)          res = num
                else if(num.length < 5)     res = num.substr(0, 3) + '-' + num.substr(3)
                else                        res = num.substr(0, 3) + '-' + num.substr(3, 2) + '-' + num.substr(5, 5)
            }
            return res
        };

        window.Auth = function () {};
        window.Auth.user = function () { return store.state.auth.user; };
        window.Auth.check = function () { return store.state.auth.isLoggedin; };
        window.Auth.isMine = function (id) { return this.user().id == id; }

        window.bundleCheck = function (arr, ea, p){
            for (var bd of arr) {
                if (ea < bd.bd_ea)      { break; }
                else if (ea == bd.bd_ea){ p = bd.bd_price; break; }
                else if (ea > bd.bd_ea) { p = bd.bd_price; }
            }
            return p;
        };

        window.priceCalculator = function (esti){
            let collect = {};
            let rst = { 'gd_price':0, 'air_price':0, 'surtax':0, 'dlvy_price':0, 'all_price':0 };
            for (var em of esti) {
                let pa_id = 0;
                if (em.em_check_opt == 'Y') {
                    if (!!em.goods&&!!em.goods.purchase_at)
                    pa_id = em.goods.gd_pa_id;
                    if (!collect.hasOwnProperty(pa_id)) {
                        if (pa_id>0 && em.goods.purchase_at.pa_type == "AIR")
                        collect[pa_id] = { 'goods':0, 'dlvy':0, 'air':Number(em.goods.purchase_at.pa_price_add_vat)};
                        else
                        collect[pa_id] = { 'goods':0, 'dlvy':Number(em.goods.dlvy_fee_add_vat), 'free_dlvy_max':Number(em.goods.free_dlvy_max), 'air':0};
                    }
                    collect[pa_id].goods += Number(em.em_price) * Number(em.em_ea);
                }
                for (var eo of em.estimate_option) {
                    if (eo.eo_check_opt == 'Y')
                        collect[pa_id].goods += Number(eo.eo_price) * Number(eo.eo_ea);
                }
            }

            rst.gd_price = Object.values(collect).reduce((acc, el) => acc + el.goods, 0);
            rst.air_price = Object.values(collect).reduce((acc, el) => acc + el.air, 0);
            rst.surtax = rst.gd_price*0.1;
            for (var key in collect) {
                if (collect[key].dlvy && collect[key].goods < collect[key].free_dlvy_max) {
                    rst.dlvy_price += Number(collect[key].dlvy);
                }
            }
            rst.all_price = rst.gd_price+rst.surtax+rst.dlvy_price+rst.air_price;

            return rst;
        };










        // 2. 전역 에셋 추가
        Vue.directive('my-directive', {
            bind (el, binding, vnode, oldVnode) {
            // 필요한 로직 ...
            }
        })

        Vue.directive("click-outside", {
          bind(el, binding, vnode) {
            el.clickOutsideEvent = (event) => {
              if (!(el === event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event);
              }
            };
            document.body.addEventListener("click", el.clickOutsideEvent);
          },
          unbind(el) {
            document.body.removeEventListener("click", el.clickOutsideEvent);
          },
        });


        // 3. 컴포넌트 옵션 주입
        Vue.mixin({
            created: function () {
            // 필요한 로직 ...
            }
        })

        // 4. 인스턴스 메소드 추가
        Vue.prototype.$myMethod = function (methodOptions) {
        // 필요한 로직 ...
        }

        Vue.prototype.isEmpty = function (v) {
            if( v == "" || v == null || v == undefined || Number.isNaN(v) || ( v != null && typeof v == "object" && !Object.keys(v).length ) ) return true;
            else return false;
        }

        Vue.prototype.strCut = function (str, len) {
    		var s = 0;
    		for (var i=0; i<str.length; i++) {
        		s += (str.charCodeAt(i) > 128) ? 2 : 1;
        		if (s > len) return str.substring(0,i) + "...";
    		}
    		return str;
        }

        Vue.prototype.nl2br = function (content) { return (content + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br />' + '$2'); }
        Vue.prototype.isLoggedin = function () { return store.state.auth.isLoggedin; }
        Vue.prototype.enableLvChk = function (lv) { return store.state.auth.isLoggedin && store.state.auth.user.level >= lv; }
        Vue.prototype.isMine = function (id) { return store.state.auth.user.id == id; }
        Vue.prototype.formatDate = function (v){
            var x = v.replace(/\D/g, '').match(/(\d{0,4})(\d{0,2})(\d{0,2})/);
            return !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        };
        Vue.prototype.formatDateShort = function (v){
            var x = v.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,2})/);
            return !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        };
        Vue.prototype.priceComma = function (v){ return v.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","); };

        Vue.prototype.formatBiz = function (v) {
            var x = v.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,5})/);
            return !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        };
        Vue.prototype.formatHp = function (v) {
            var x = v.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})(\d{0,4})/);
            return !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        };
        Vue.prototype.formatIdNum = function (v) {
            var x = v.replace(/\D/g, '').match(/(\d{0,6})(\d{0,7})/);
            return !x[2] ? x[1] : x[1] + '-' + x[2];
        };
        Vue.prototype.formatCardNum = function (v) {
            var x = v.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
            return !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '');
        };
        Vue.prototype.checkImage = function (t) {
            let reg = /(jpg|png|gif|bmp|jpeg)/;
            return reg.test(t);
        };

        Vue.prototype.formatTel = function (num) {
            if(!num) return num
            num = num.replace(/[^0-9]/g, '')
            let res = ''
            if(num.length < 3) {
                res = num
            } else {
                if(num.substr(0, 2) =='02') {
                    if(num.length <= 5) {//02-123-5678
                        res = num.substr(0, 2) + '-' + num.substr(2, 3)
                    } else if(num.length > 5 && num.length <= 9) {//02-123-5678
                        res = num.substr(0, 2) + '-' + num.substr(2, 3) + '-' + num.substr(5)
                    } else if(num.length > 9) {//02-1234-5678
                        res = num.substr(0, 2) + '-' + num.substr(2, 4) + '-' + num.substr(6)
                    }
                } else {
                    if(num.length <= 8)         res = num.substr(0, 3) + '-' + num.substr(3)
                    else if(num.length == 9)    res = num.substr(0, 3) + '-' + num.substr(3, 3) + '-' + num.substr(6)
                    else if(num.length == 10)   res = num.substr(0, 3) + '-' + num.substr(3, 3) + '-' + num.substr(6)
                    else if(num.length > 10)    res = num.substr(0, 3) + '-' + num.substr(3, 4) + '-' + num.substr(7)  //010-1234-5678
                }
            }
            return res
        };

        Vue.prototype.fileDown = async function (src, oriName) {
            // this.$store.dispatch('board/fileDown', { src:src, oriName:oriName });
// console.log('prototype');
            try {
                const res = await ax.get(`${src}`, { responseType: 'blob' });
                let fileUrl = window.URL.createObjectURL(new Blob([res.data]));
                let fileLink = document.createElement('a');
                fileLink.href = fileUrl;

                fileLink.setAttribute('download', oriName);
                document.body.appendChild(fileLink);

                fileLink.click();
            } catch (e) {
                Notify.consolePrint(e);
            }
        }




        Date.prototype.format = function(f) {
            if (!this.valueOf()) return " ";

            var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
            var d = this;

            return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
                switch ($1) {
                    case "yyyy": return d.getFullYear();
                    case "yy": return (d.getFullYear() % 1000).zf(2);
                    case "MM": return (d.getMonth() + 1).zf(2);
                    case "dd": return d.getDate().zf(2);
                    case "E": return weekName[d.getDay()];
                    case "HH": return d.getHours().zf(2);
                    // case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                    case "hh": return ((d.getHours() % 12) ? (d.getHours() % 12) : 12).zf(2);
                    case "mm": return d.getMinutes().zf(2);
                    case "ss": return d.getSeconds().zf(2);
                    case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                    default: return $1;
                }
            });
        };

        String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
        String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
        Number.prototype.zf = function(len){return this.toString().zf(len);};
        /*
        console.log(new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초"));          //2011년 09월 11일 오후 03시 45분 42초
        console.log(new Date().format("yyyy-MM-dd"));               //2011-09-11
        console.log(new Date().format("'yy MM.dd"));                //'11 09.11
        console.log(new Date().format("yyyy-MM-dd E"));              //2011-09-11 일요일
        console.log("현재년도 : " + new Date().format("yyyy"));     //현재년도 : 2011
        출처: https://stove99.tistory.com/46 [스토브 훌로구]
        */
    }
};
