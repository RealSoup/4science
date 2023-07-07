<template><div></div>
</template>
<script>
export default {
    name: 'commonPopUp',
    data(){ return { windowRef : null, } },
    methods : {
        openWinPop( uri, width, height ) {
            // if( this.windowRef != null )
                // this.closeWinPop();
            //  여러새창 열어야 하는데
            //   이것때문에 닫히고 한개만 열림
        

            let left = (screen.width) ? (screen.width - width) / 2 : 0;
            let top = (screen.height) ? (screen.height - height) / 2 : 0;

            let attr = 'top=' + top + ', left=' + left  + ', width=' + width + ', height=' + height + ', resizable=no,status=no';

            // 1. 윈도우 팝업 띄우기 
            this.windowRef = window.open(uri, "", attr);
            if( this.windowRef != null ) {
                this.windowRef.addEventListener('beforeunload', this.evtClose);
            }else{
                alert( "window.open fail!!!" );
            }

            // 2.  새로 띄운 윈도우 팝업창으로 부터 수신 메세지 이벤트 처리 
            window.addEventListener("message", this.recvEvtFromChild, false);
        },

        // 윈도우 팝업 닫기 
        closeWinPop(){
            if(this.windowRef) {
                this.windowRef.close();
                this.windowRef = null;
            }
        },

        evtClose() {
            if(this.windowRef) {
                this.windowRef.close();
                this.windowRef = null;
                this.$emit('onClose');
            }
        },

        // 3. 부모창에서 팝업창에 메세지 보내기 
        sendEvtToChild( evt ){
            if( !common.isValidObj(this.windowRef)) return;
            if( g_winPopup == null ) return;
            // 4. 윈도팝업창(g_winPopup)에 함수 실행 
            //  g_winPopup 변수는 본 소스에서 선언하지 않고 아래 ChildWinPop.vue 소스인 윈도우 팝업창 측에서 선언하고 설정함
            g_winPopup.calledFromOpener(evt);
        },

        // 5. 팝업창으로 부터 수신된 이벤트 
        recvEvtFromChild( evt ){
            /*
            console.log( "recvEvtFromChild......" );
            console.log( evt.data );

            if( evt.data == null  ){
                return;
            }
            let recvObj = JSON.parse( evt.data );
            
            // 5. 본 소스 WinPop.vue를 콤포넌트로 사용하는 부모 vue 측에 이벤트 전달
            this.$emit( 'onRecvEvtFromWinPop', recvObj );
            */
            if( typeof evt.data == 'object' || evt.data == null  )
                return;
            this.$emit( 'onRecvEvtFromWinPop', evt.data );
        },

    },
    mounted() {    
        // window.addEventListener("message", this.listReread);
        // this.windowRef.addEventListener('beforeunload', this.evtClose);
        // window.addEventListener("message", this.recvEvtFromChild, false);
    },
    beforeDestroy: function () {
        window.removeEventListener('message', this.recvEvtFromChild);
        this.windowRef.removeEventListener('beforeunload', this.evtClose);
    },
}

</script>