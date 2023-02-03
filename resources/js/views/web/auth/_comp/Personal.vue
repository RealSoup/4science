<template>
<div>
    <h4><font color="#f24638">(필수)</font> 개인정보 수집 및 이용</h4>
    <p style="margin-top:0;"> 회사는 회원기반 서비스 제공을 위해 다음과 같이 개인정보를 수집하여, 이용, 제공, 파기 합니다.<br> </p>
    <table width="100%" border="0" cellpadding="0" cellspacing="0" class="memm_table">
        <colgroup>
            <col style="">
            <col style="">
            <col style="width:30%;">
            <col style="width:30%;">
            <col style="width:15%;">
        </colgroup>
        <thead>
            <tr>
                <th colspan="2">수집방법</th>
                <th><strong>수집항목</strong></th>
                <th><strong>수집 및 이용목적</strong></th>
                <th>보유 및 이용 기간</th>
            </tr>
        </thead>
        <tbody><tr>
            <td rowspan="2">회원</td>
            <td>일반회원</td>
            <td>아이디, 비밀번호, 이름, 생년월일, 이메일, 휴대전화번호, 주소, 본인인증값(DI)</td>
            <td>회원가입, 이용자 식별 이벤트 등 광고성 정보 전달</td>
            <td rowspan="2">회원탈퇴 시 파기하며, 아이디는 불·편법 사용행위 차단 등의 이유로 탈퇴일로부터 5년간 보관</td>
        </tr>
        <tr>
            <td class="leftb">딜러회원</td>
            <td>아이디, 비밀번호, 이름, 생년월일, 이메일, 휴대전화번호, 주소, 본인인증값(DI), 담당자 이름, 담당자 휴대전화번호</td>
            <td>회원가입, 이용자 식별, 딜러사업자 식별, 이벤트 등 광고성 정보 전달</td>
        </tr>
        <tr>
            <td>비회원</td>
            <td>상품구매</td>
            <td>수령인, 연락처, 이메일, 배송지</td>
            <td>상품 주문 확인 및 이용자 식별, 서비스 이용 및 상담</td>
            <td>5년 (계약 및 철회, 결제 및 공급)</td>
        </tr>
        <tr>
            <td rowspan="5">상품구매</td>
            <td>필수항목</td>
            <td>수령인, 수령인 휴대전화번호, 배송지 주소</td>
            <td rowspan="2">상품 배송 및 서비스 제공을 위한 사용자 정보 확인</td>
            <td rowspan="5">5년 (계약 및 철회, 결제 및 공급)</td>
        </tr>
        <tr>
            <td class="leftb">선택항목</td>
            <td>수령인 유선전화번호, 차종, 차량/번호, 차량색상</td>
        </tr>
        <tr>
            <td rowspan="2" class="leftb">증빙서류발행</td>
            <td>담당자 이름, 담당자 휴대전화번호</td>
            <td>세금계산서 발행</td>
        </tr>
        <tr>
        <td class="leftb">현금영수증 발행용 휴대전화번호</td>
        <td>현금영수증 발행</td>
        </tr>
        <tr>
            <td class="leftb">자동수집항목</td>
            <td>IP주소</td>
            <td>부정이용방지 와 비인가 사용방지</td>
        </tr>
        <tr>
            <td colspan="2">A/S, 교환, 반품, 환불</td>
            <td>아이디, 이름, 주소, 휴대전화번호, 환불 계좌번호, 은행 명</td>
            <td>구매 대금 환불 및 교환 물품 배송 </td>
            <td>5년</td>
        </tr>
        <tr>
            <td colspan="2">1:1문의</td>
            <td>아이디, 이름, 휴대전화번호, 이메일</td>
            <td>상담 내용 답변 </td>
            <td>1년</td>
        </tr>
        <tr>
            <td colspan="2">문자상담, 재입고알람</td>
            <td>이름,연락처</td>
            <td>상담 내용 답변 및 재입고알람 </td>
            <td>1년</td>
        </tr>
        </tbody>
    </table>
    
</div>
</template>

<script> export default { name: 'AuthPersonal', }; </script>
<style lang="css" scoped>
h4 { text-align:center; }
p { text-align:left; font-size:12px; color:#565656; padding:20px 15px;}
.memm_table { width:100%; font-size:12px; padding:0 15px;}
.memm_table th { padding:10px 0; border-top:2px solid #d6d6d6; border-bottom:1px solid #e4e4e4; text-align:center; background:#fafafa; color:#666; }
.memm_table td { padding:10px; border-left:1px solid #e6e6e6; border-bottom:1px solid #e6e6e6; vertical-align:top; }
.memm_table td:first-child { border-left:0; }
.memm_table td.leftb {border-left:1px solid #e6e6e6;}
.title_area {height: 60px;border-bottom: 2px solid #000;}
.title_area > span {font-size: 22px;font-family: Noto-D !important;letter-spacing: -1px;line-height: 60px;margin-left: 25px;color: #333333;}
.title_area > span > b {font-family: Noto-B !important;}
</style>