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
                ordr_idxx: '',
            },
        }
    },
    methods: {
        async verification_req () {
            // ordr_idxx는 mounted에서 생성된 값 사용
            const res = await ax.post(`/api/kcp/person_verification`, {
                ordr_idxx: this.frm.ordr_idxx
            });

            if (!res || res.status !== 200) return;

            if (res.data.res_cd !== '0000') {
                alert('거래등록 실패: ' + res.data.res_msg);
                return;
            }

            const { call_url, reg_cert_key } = res.data;

            // 팝업 열기
            const width  = 410, height = 500;
            const left   = screen.width  / 2 - width  / 2;
            const top    = screen.height / 2 - height / 2;
            const opts   = `width=${width},height=${height},left=${left},top=${top},toolbar=no,scrollbars=no`;

            window.open('', 'kcp_popup', opts);
            window.addEventListener('message', this.recvEvtFromChild, false);

            // V2는 form 파라미터 2개만
            const form = document.createElement('form');
            form.method = 'post';
            form.action = call_url;
            form.target = 'kcp_popup';

            const addField = (name, value) => {
                const el = document.createElement('input');
                el.type  = 'hidden';
                el.name  = name;
                el.value = value;
                form.appendChild(el);
            };

            addField('reg_cert_key',       reg_cert_key);
            addField('kcp_page_submit_yn', 'N');  // N = 팝업방식

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
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