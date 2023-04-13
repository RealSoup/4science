<template>
<b-tabs class="pay_info" vertical>
    <b-tab title="현금 결제" active>
        <dl class="payment">
            <dt>무통장 입금</dt>
            <dd>
                <ul>
                    <li>주문 시 결제정보에서 <b>통장입금</b>을 선택하여 주십시오. (계좌 이체)</li>
                    <li>학교 및 국가연구소는 후불결제 가능하므로 바로 발주가 진행됩니다.</li>
                    <li>주문 시 입력한 입금자명과 실제 임금자명이 다를 경우 입금 확인이 지연될 수 있으니 연락주시면 빠른 확인이 가능합니다.</li>
                </ul>
                <p class="point mt-2"><span>입금 계좌번호</span> &nbsp; 우리은행 849-103249-13-002  &nbsp;&nbsp;&nbsp;  국민은행 010-01-0944-960 &nbsp;&nbsp;&nbsp; <b>예금주:(주)아이넥서스</b></p>
            </dd>
            
            <dt>에스크로 결제</dt>
            <dd>
                <p><b>구매자의 구매의사 확인 후 결제대금을 지급</b></p>
                에스크로 사업자인 KG이니시스가 구매자의 결제 대금을 예치하고 있다가, 구매자의 구매결정을 통보 받은 후 판매자에게 결제 대금을 지급하는 안전한 결제서비스 입니다. 구매자에게 이메일/ SMS 문자를 전송하고, 배송중계업체와의 연동으로 정확한 배송 진행 확인이 가능하여 구매자의 편의성을 강화한 결제 시스템입니다.
            </dd>
            
            <dt>현금영수증</dt>
            <dd>
                <b>건당 1원 이상 현금 결제건부터 발행</b>
                <ul>
                    <li>무통장입금 주문 시 <b>주문하기</b>에서 현금영수증을 신청하시면 발급이 가능합니다.</li>
                    <li>온라인 주문 시 현금영수증 발급정보를 등록해 주세요.(회사 업무용인 경우 세금계산서를 선택해 주세요.)</li>
                    <li>발급된 현금영수증은 국세청에 통보됩니다. 발급된 익일부터 <a href="http://www.hometax.go.kr" target="_blank">홈텍스 사이트(http://www.hometax.go.kr)</a>에서 확인하실 수 있습니다.</li>
                    <li>구매자가 현금영수증을 신청하지 않을 경우 국세청 지정 코드로 자진 발급이 가능합니다.</li>
                </ul>
                <b>현금영수증이란</b> 구매자가 현금으로 결제한 내역에 대하여 국세청 현금 영수증 홈페이지에 등록된 각종 카드번호(현금영수증카드, 신용/직불카드, 
                적립식/멤버십카드)와 휴대폰번호, 주민등록번호로 발행 신청하면 전자 결제 시스템을 통해 현금영수증을 발급하여 국세청에 통보하는 제도
            </dd>
            
            <dt>세금계산서</dt>
            <dd>
                <ul>
                    <li>주문 시 무통장입금 선택 후 <b>주문하기</b>에서 세금계산서를 선택하시면 상품 발송 완료 시 세금계산서를 발급받으실 수 있습니다.</li>
                    <li>FAX로 사업자등록증을 보내주시거나, 이전에 구매하신 적이 있다면 거래처 명과 변경사항만 기입하여 주시기 바랍니다.</li>
                    <li>익월 10일 이후에는 세금계산서 발급이 불가합니다.</li>
                    <li>주문할 때 세금계산서 신청을 안하셨다면 <a href="/cscenter/csinfo/inquiry.do">1:1문의 게시판</a> 이나 대표전화 <a href="tel:1644-4214">1644-4214</a> 로 연락바랍니다.</li>
                </ul>
            </dd>
        </dl>
    </b-tab>
    <b-tab title="카드 결제">
        <dl class="payment">
            <dt>신용카드 결제</dt>
            <dd>
                <ul>
                    <li>온라인에서 신용카드 결제가 가능합니다. (30만원 이상 구매시 공인인증서 필수)</li>
                    <li>카드결제시 부가세법 시행령 57조 2항에 따라 결제대행업체를 통한 신용카드 매출전표를 발행한 경우에는 사업자가 별도의 세금계산서를 교부할 수 없습니다. (신용카드 매출전표를 세금계산서 대신 증빙자료로 사용하실 수 있습니다)</li>
                    <li>
                        <b>ISP</b>(BC, 국민, 우리, 저축은행카드) - 인증서 기반, ISP비밀번호로 결제, 카드정보 입력 안함 <br />
                        <b>안심클릭</b>(삼성, 신한, 현대 등) - 안심클릭비밀번호와 CVC 3자리
                    </li>
                </ul>                        
            </dd>
            
            <dt>PSYS 결제</dt>
            <dd>
                4science 홈페이지에서 주문 시 PSYS 결제 선택 주문 완료 후 <a href="https://www.psys.co.kr" target="_blank">PSYS 홈페이지(https://www.psys.co.kr)</a>에 접속하여 결제를 진행합니다.
                <p class="point">PSYS 홈페이지 로그인 → 가맹점 검색 → 결제금액 입력 → 결제</p>
                PSYS는 연구비 카드(신한, BC), 일반카드(삼성, 농협, 국민 등) 등 다양한 결제수단이 제공됩니다. 회원 및 비회원 모두 결제가 가능합니다.
            </dd>
            
            <dt>원격 결제</dt>
            <dd>
                <p><b>원결 결제는?</b></p>
                <ul><li>카드정보를 받아 원격결제를 진행하고 요청하신 이메일로 카드전표를 발송합니다.</li></ul>
                <p><b>결제방법</b></p>
                <ul>
                    <li>4science 쇼핑몰에서 주문 시 결제수단을 원격결제로 선택해 주세요.</li>
                    <li>결제요청일 선택과 결제 담당자 정보를 기입해 주세요. 요청하신 시점에 담당자가 결제를 위해 연락을 드립니다.</li>
                    <li>카드정보(카드번호/유효기간/서명에 들어갈 문구)를 받아 원격결제를 진행하고 요청하신 이메일로 카드전표를 보내드립니다.</li>
                </ul>
            </dd>
            
            <!-- <dt>Finepay 결제</dt>
            <dd>
                <p><b>Finepay 결제란</b> 기업은행 BC 연구비카드 온라인 결제시스템입니다.</p>
                <p><b>Finepay 결제방법</b></p>
                IBK 홈페이지 원격지구매시스템 접속 → 연구비인증서 로그인 → 가맹점명 검색 (아이넥서스/ 사업자번호: 204-81-47440) → 일반(보통) 결제 → 거래처리스트 중 결제할 거래처를 선택 후 금액 입력 → 선택내역 결제 혹은 전체결제 버튼 클릭 → 최종결제 확인 <button class="btn btn-secondary view_img">이미지 보기 &gt;</button>
            </dd> -->
        </dl>
    </b-tab>
    <b-tab title="서류 출력">
        <dl class="payment">
            <dt>통장사본, 사업등록증</dt>
            <dd>
                로그인 후, 마이페이지에서 <b>통장사본 출력, 사업자등록증 출력</b> 버튼을 클릭하시면 서류를 출력하실 수 있습니다.
            </dd>
            
            <dt>견적서, 거래명세서</dt>
            <dd>
                <ul>
                    <li>회원의 경우, 마이페이지 <b>나의 쇼핑내역</b> 메뉴에서 주문하신 내용을 클릭하시면 해당 서류를 출력하실 수 있습니다.</li>
                    <li>비회원의 경우, <b>주문 or 견적번호로 비회원 로그인</b> 후 내용을 클릭하시면 해당 서류를 출력하실 수 있습니다.</li>                            
                </ul>
            </dd>
            
            <dt>카드전표</dt>
            <dd>
                <a href="https://www.inicis.com/payment_view" target="_blank" class="btn btn-warning btn_link" style='color:#fff;'>카드 전표 인쇄 바로가기</a>
                <br /><br />
                <ul>
                    <li>바로가기 버튼을 누르면 이니시스 홈페이지로 연결됩니다. </li>
                    <li>이니시스에서 <b>카드사용 내역 조회</b> 메뉴에서 카드사, 카드번호, E-mail, 거래일자를 입력하시면 해당 서류를 출력하실 수 있습니다.</li>
                </ul>                        
            </dd>
            
            <dt>제품사양서</dt>
            <dd>
                <ul>
                    <li>제품 상세페이지에서 <b>제품사양서</b>를 클릭하시면 해당 서류를 출력하실 수 있습니다.</li>
                    <li>제품사양서 인쇄는 Internet Explorer 환경에 따라 잘림 현상이 발생될 수 있습니다.</li>
                </ul>
            </dd>                    
        </dl>
    </b-tab>
</b-tabs>
</template>

<script>
export default {
    name: 'CSCenterPayGuide',
    data() { return { }; },
    mounted() { },
    methods: { },
};
</script>

<style lang="css" scoped>
.pay_info { margin:0; }
.pay_info>>>.col-auto { width:230px; padding-left:0; }
.pay_info>>>.col-auto .nav-tabs .nav-link { background:#fff; border:1px solid #DDDDDD; padding:12px 25px; border-radius:0; color:#62615D; }
.pay_info>>>.col-auto .nav-tabs .nav-link.active { background:#F6F6F6; color:#000; }

dl.payment { border:1px solid #E3E3E3; }
dl.payment dt { font-size:1rem; background-color:#F6F6F6; padding:1rem; }
dl.payment dd { padding:15px; font-size:.83rem; }
dl.payment dd ul { margin-left:15px; }
dl.payment dd ul li { list-style:decimal; }
dl.payment dd b { font-weight:900; }
dl.payment dd .point { color:#0D4D9C; font-weight:900; font-size:.8rem; }
dl.payment dd .point span { background-color:#0D4D9C; color:#fff; font-weight:bold; display:inline-block; padding:1px 12px; border-radius:11px; }
dl.payment dd .point b { color:#000; }
dl.payment dd p { margin:0.5rem 0 0.2rem 0; }
dl.payment dd a { font-weight:900; color:#0D4D9C; }
dl.payment dd .view_img { font-size: 0.7rem; padding: 0.12rem 0.2rem 0 0.2rem; line-height: 0.9rem; }
</style>