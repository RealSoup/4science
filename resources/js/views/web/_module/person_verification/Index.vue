<template>
<div>
    <b-row class="info">
        <b-col><b>19</b></b-col>
        <b-col>
            4science에서 판매되는 시약류를 포함한 유해화학물질은 19세 미만의 청소년이 구매 할 수 없습니다.
            <br />
            성인 인증 후 구매를 진행해주시기 바랍니다.
        </b-col>
    </b-row>
    <b-row class="btn_row">
        <b-button class="teal" @click="verification_req">휴대폰 성인 인증</b-button>
    </b-row>
    <win-pop-up ref="winPopup" @onClose="val=>evtCloseWinPopup(val)" @onRecvEvtFromWinPop="val=>onRecvWinPop(val)"></win-pop-up>
</div>    
</template>

<script>
import ax from '@/api/http';

export default {
    name:"ModulePersonVerificationIndex",
    components: { 'win-pop-up': () => import('@/views/_common/WinPopUp'), },
    data() {
        return {
            frm: {
                make_req_dt: '',
                ordr_idxx: '',
                ct_type: 'HAS',
            },
        }
    },
    methods: {
        async verification_req () {
            const res = await ax.post(`/api/kcp/person_verification`, this.frm);
            if (res && res.status === 200) {      
                if (res.data.res_cd == "0000") {
                    let url = `/shop/order/adult_popup`;
                    let width  = 410;
		            let height = 500;
                    let leftpos = screen.width  / 2 - ( width  / 2 );
		            let toppos  = screen.height / 2 - ( height / 2 );                    
                    let option = `width=${width}, height=${height}, top=${toppos}, left=${leftpos}, location = no`;

                    // 1. 윈도우 팝업 띄우기 
                    this.windowRef = window.open(url, "kcp_popup", option);
                    if( this.windowRef != null ) 
                        this.windowRef.addEventListener('beforeunload', this.evtClose);
                    else
                        alert( "window.open fail!!!" );

                    // 2.  새로 띄운 윈도우 팝업창으로 부터 수신 메세지 이벤트 처리 
                    window.addEventListener("message", this.recvEvtFromChild, false);

                    var form = document.createElement('form');
                    var objs01 = document.createElement('input');
                    var objs02 = document.createElement('input');
                    var objs03 = document.createElement('input');
                    var objs04 = document.createElement('input');
                    var objs05 = document.createElement('input');
                    var objs06 = document.createElement('input');
                    var objs07 = document.createElement('input');
                    var objs08 = document.createElement('input');
                    var objs09 = document.createElement('input');
                    var objs10 = document.createElement('input');
                    var objs11 = document.createElement('input');
                    var objs12 = document.createElement('input');
                    var objs13 = document.createElement('input');
                    var objs14 = document.createElement('input');
                    var objs15 = document.createElement('input');
                    var objs16 = document.createElement('input');
                    var objs17 = document.createElement('input');
                    var objs18 = document.createElement('input');
                    objs01.setAttribute('type', 'hidden'); objs01.setAttribute('name', 'site_cd');              objs01.setAttribute('value', res.data.site_cd);                     form.appendChild(objs01);
                    objs02.setAttribute('type', 'hidden'); objs02.setAttribute('name', 'ordr_idxx');            objs02.setAttribute('value', this.frm.ordr_idxx);                   form.appendChild(objs02);
                    objs03.setAttribute('type', 'hidden'); objs03.setAttribute('name', 'req_tx');               objs03.setAttribute('value', "cert");                               form.appendChild(objs03);
                    objs04.setAttribute('type', 'hidden'); objs04.setAttribute('name', 'cert_method');          objs04.setAttribute('value', "01");                                 form.appendChild(objs04);
                    objs05.setAttribute('type', 'hidden'); objs05.setAttribute('name', 'up_hash');              objs05.setAttribute('value', res.data.up_hash);                     form.appendChild(objs05);
                    objs06.setAttribute('type', 'hidden'); objs06.setAttribute('name', 'cert_otp_use');         objs06.setAttribute('value', "Y");                                  form.appendChild(objs06);
                    objs07.setAttribute('type', 'hidden'); objs07.setAttribute('name', 'web_siteid_hashYN');    objs07.setAttribute('value', res.data.web_siteid_hashYN);           form.appendChild(objs07);
                    objs08.setAttribute('type', 'hidden'); objs08.setAttribute('name', 'web_siteid');           objs08.setAttribute('value', res.data.web_siteid);                  form.appendChild(objs08);
                    objs09.setAttribute('type', 'hidden'); objs09.setAttribute('name', 'param_opt_1');          objs09.setAttribute('value', '');                                   form.appendChild(objs09);
                    objs10.setAttribute('type', 'hidden'); objs10.setAttribute('name', 'param_opt_2');          objs10.setAttribute('value', '');                                   form.appendChild(objs10);
                    objs11.setAttribute('type', 'hidden'); objs11.setAttribute('name', 'param_opt_3');          objs11.setAttribute('value', '');                                   form.appendChild(objs11);
                    objs12.setAttribute('type', 'hidden'); objs12.setAttribute('name', 'Ret_URL');              objs12.setAttribute('value', res.data.return_url);                   form.appendChild(objs12);
                    objs13.setAttribute('type', 'hidden'); objs13.setAttribute('name', 'cert_enc_use_ext');     objs13.setAttribute('value', "Y");                                  form.appendChild(objs13);
                    objs14.setAttribute('type', 'hidden'); objs14.setAttribute('name', 'kcp_merchant_time');    objs14.setAttribute('value', res.data.kcp_merchant_time);                form.appendChild(objs14);
                    objs15.setAttribute('type', 'hidden'); objs15.setAttribute('name', 'kcp_cert_lib_ver');     objs15.setAttribute('value', res.data.kcp_cert_lib_ver);                 form.appendChild(objs15);
                    objs16.setAttribute('type', 'hidden'); objs16.setAttribute('name', 'kcp_page_submit_yn');   objs16.setAttribute('value', 'Y');                                   form.appendChild(objs16);
                    objs17.setAttribute('type', 'hidden'); objs17.setAttribute('name', 'res_cd');               objs17.setAttribute('value', '');                                   form.appendChild(objs17);
                    objs18.setAttribute('type', 'hidden'); objs18.setAttribute('name', 'res_msg');              objs18.setAttribute('value', '');                                   form.appendChild(objs18);
                    
                    form.setAttribute('method', 'post');
                    // form.setAttribute('action', "https://testcert.kcp.co.kr/kcp_cert/cert_view.jsp");
                    form.setAttribute('action', "https://cert.kcp.co.kr/kcp_cert/cert_view.jsp");
                    form.setAttribute('target', "kcp_popup");
                    document.body.appendChild(form);
                    form.submit();
                } else {
                    Notify.modal('up_hash 생성 에러', 'warning');
                    console.log("에러 코드", res.data.res_cd);
                    console.log("에러 메세지", res.data.res_msg);
                }
            }
        },
        evtClose() {
            if(this.windowRef) {
                this.windowRef.close();
                this.windowRef = null;
                this.$emit('onClose');
            }
        },
        recvEvtFromChild( evt ){    // 팝업창으로 부터 수신된 이벤트 
            this.$emit('are_you_adult', evt.data);
        },
    },
    async mounted() {
        var today = new Date();
        var year  = today.getFullYear().toString();
        var month = (today.getMonth()+1).toString();
        var date  = today.getDate().toString();
        var time  = today.getTime().toString();
        if(parseInt(month) < 10)
            month = "0" + month;
        this.frm.ordr_idxx = year+month+date+time;
        
        // getCurrentDate()        
        year = year.toString().slice(2,4);
        date     = date  < 10 ? '0' + date    : date    ;
        let hour = today.getHours().toString();
        hour = hour < 10 ? '0' + hour : hour;
        let minites = today.getMinutes().toString();
        minites = minites < 10 ? '0' + minites : minites;
        let seconds = today.getSeconds().toString();
        seconds = seconds < 10 ? '0' + seconds : seconds;
        this.frm.make_req_dt = year + month + date   + hour + minites + seconds;
    },
    beforeDestroy: function () {
        window.removeEventListener('message', this.recvEvtFromChild);
        this.windowRef.removeEventListener('beforeunload', this.evtClose);
    },
}
</script>

<style lang="css" scoped>
.info .col:first-child { flex:0 0 25%; max-width:25%; display:flex; flex-direction:row; justify-content:center; align-items:center;  }
.info .col:first-child b { border:3px solid red; border-radius:50%; padding:3px 6px 0px 4px; font-size:30px; }
.info .col:last-child { display:flex; justify-content:center; flex-direction:column; text-align:justify; }
.btn_row button { width:100%; margin-top:10px; }
</style>    