<template>
<b-tabs class="con_faq row">
    <b-tab title="회원" active>
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-1>회원가입은 무료인가요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
                4science 홈페이지 회원가입은 무료이며 가입과 동시에 서비스를 이용하실 수 있습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-2>회원가입은 어떻게 하나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                홈페이지 오른쪽 상단의 &#39;회원가입&#39; 버튼을 누르시면 가입 하실 수 있습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-3>회원가입은 필수인가요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body> 회원가입을 하지 않으셔도 견적서 조회 및 구매가 가능합니다. </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-4>회원이 되면 어떤 혜택이 있나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                구매내역 및 배송현황 정보를 제공하여 드립니다.<br />
                지난 견적서 조회 및 모든 서류 파일을 다운로드 하실 수 있습니다.<br />
                회원가입 후 홈페이지에서 주문완료시 결제금액(VAT별도)의 1%를 적립하여 드립니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-5>회원의 종류는 어떻게 되나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                개인 구매 회원과 i-shop 판매회원으로 나누어져 있습니다.<br />
                일반 구매 고객이신 경우 개인 구매 회원으로 가입하시면 됩니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-6>로그인 아이디가 생각나지 않아요.</b-button>
        </b-card-header>
        <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                로그인 창 하단의 &#39;아이디찾기&#39;를 클릭하신 후, 가입 시 고객님의 성명과 이메일을 입력하시면 등록하신 이메일로 아이디를 보내드립니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-7>비밀번호가 기억나지 않아요.</b-button>
        </b-card-header>
        <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                로그인 창 하단의 &#39;비밀번호찾기&#39;를 클릭하신 후, 가입 아이디와 이메일을 입력하시면 비밀번호 변경이 가능한 링크를 이메일로 보내드립니다.<br />
                링크 클릭 후 연결되는 페이지에서 비밀번호를 변경하신 후, 변경한 비밀번호로 로그인 하시면 됩니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-8>등록한 회원정보를 변경 할 수 있나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-8" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                로그인 후 마이페이지의 &#39;회원정보수정&#39;에서 변경 하실 수 있으며,<br />
                비밀번호는 &#39;비밀번호변경&#39;에서 변경 하실 수 있습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-9>회원탈퇴는 어떻게 하나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-9" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                로그인 후 마이페이지 하단의 &#39;회원탈퇴&#39;에서 탈퇴하실 수 있습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-10>회원탈퇴를 하면 어떻게 되나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-10" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                보유하고 계시던 마일리지가 자동 삭제되며, 재가입하실 경우에도 복원되지 않습니다.<br />
                4science 와 i-shop의 ID가 통합운영되므로, 회원탈퇴 시 i-shop의 회원에서도 탈퇴처리 됩니다.<br />
                사용하셨던 ID와 E-mail은 재가입하실 때 사용하실 수 없습니다.
            </b-card-body>
        </b-collapse>
    </b-tab>

    <b-tab title="구매">
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-2>판매금액이 견적가로 되어 있는 상품은 어떻게 구매하나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                상품의 금액이 견적가로 되어 있는 경우, 상품을 선택하신 후 &lsquo;견적요청하기&rsquo; 버튼을 클릭하면 견적요청서 작성 페이지로 이동하게 됩니다.<br />
                1)견적요청상품<br />
                2)의뢰고객 정보 입력<br />
                3)추가 문의사항 등을 순차적으로 작성하여 &lsquo;견적요청&rsquo;을 통해 온라인 접수 해주시면<br />
                확인 후 고객님 메일로 견적서를 전송해 드립니다.<br />
                메일로 보내드린 견적서를 확인하시어 &lsquo;주문하기&rsquo;를 통해 구매해주시면 됩니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-3>구매하고자 하는 상품이 홈페이지에 없을 때, 어떻게 해야 되나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                상품검색을 해도 검색이 되지 않는 상품인 경우, 검색엔진 밑에 &lsquo;견적요청하기&rsquo;버튼을 클릭하면<br />
                온라인 견적요청서 작성 페이지로 이동하게 됩니다.<br />
                회원이신 경우 로그인을 하시고, 원하시는 상품의 상품명, 사양, 수량 등을 기재해주시고 &lsquo;견적요청&rsquo; 버튼을 클릭하여 접수해주시면 됩니다.
            </b-card-body>
        </b-collapse>  
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-5>주문 시 요청했던 서류들은 언제 받아볼 수 있나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                주문 시 요청하셨던 서류들은 상품과 함께 발송해 드립니다.<br />
                상품 수령 이전에 서류를 받으시려면 홈페이지 &lsquo;서류출력&rsquo;버튼을 클릭해서 원하시는 서류를 선택하여 출력해주시면 됩니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-6>원하는 상품은 어떻게 찾아야 하나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                홈페이지 &lsquo;상품검색&rsquo;에 원하시는 상품의 상품명, Cat.no, 모델명 등으로 검색하실 수 있습니다.<br />
                &lsquo;전체카테고리&rsquo;를 통해 원하시는 상품을 단계별로 찾으실 수 있고<br />
                검색된 카테고리 안에서 인기순 / 신상품 / 낮은가격 / 높은가격 / 상품평 등으로보다 상세하게 상품을 찾으실 수 있습니다.
            </b-card-body>
        </b-collapse>
    </b-tab>

    <b-tab title="주문/결제">
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-1>카드전표 인쇄하는 방법을 알려주세요.</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                4science 홈페이지에서 온라인 결제 완료 시 카드 결제 회사인 토스페이먼츠에서 결제정보 입력 후 출력이 가능합니다.<br /><br />토스페이먼츠로 전표 출력이 안되는 분은 고객의 소리에 내용을 남겨주시면 메일로 보내드리겠습니다.<br /><br /><a href="https://consumer.tosspayments.com/payment-history/card">https://consumer.tosspayments.com/payment-history/card</a>
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-2>무통장 입금이 송금 가능한 은행정보를 알려주세요.</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                무통장 입금이 가능한 은행은 아래와 같습니다.<br /><br />
                <img :src="`${s3url}cscenter/account.jpg`" alt="입금계좌안내" width="278" height="107" />
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-3>중복 송금으로 환불 받고 싶습니다.</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                2번 송금으로 환불 요청하시는 경우 회계팀 확인 후 환불해 드립니다.<br /><br />환불받을 은행명 / 계좌번호 / 예금주를 고객의 소리에 내용을 남겨주시거나 1644-4214로 연락 주시기 바랍니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-4>입금확인중 으로 상품입고가 되지 않았습니다.</b-button>
        </b-card-header>
        <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                선 결제로 입금이 확인되지 않았으므로 입금확인 후 발주 진행됩니다. (학교 및 국가연구소는 후불 결제로 진행되오니 담당자 확인 바랍니다.)<br /><br />그리고 주문자 와 입금자명이 다를 경우 입금확인이 지연될 수 있사오니 1644-4214로 연락 부탁드립니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-5>홈텍스에서 세금계산서 확인은 언제 가능한가요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                세금계산서는 승인 여부 상관없이 발행한 익일에 홈텍스(<a href="http://www.hometax.go.kr">http://www.hometax.go.kr</a>)로 전송됩니다.<br /><br />당일 바로 전송 요청하실 경우에는 1644-4214로 연락 부탁드립니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-6>카드 결제일 or 결제 완료 여부 확인하고 싶습니다.</b-button>
        </b-card-header>
        <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                카드 결제금액 등 알고 계신 정보를 1644-4214로 연락시 알려주시면 확인하여 드립니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-7>연구실의 미결제 금액을 확인하고 싶습니다.</b-button>
        </b-card-header>
        <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                연구원의 성함이나 연락처를 알려주시면 확인이 가능합니다.<br /><br />고객의 소리에 내용을 남겨주시거나 T.031-8018-7280 회계팀으로 연락 주시기 바랍니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-8>카드 결제했는데 반품한 금액 부분 취소 가능한가요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-8" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                반품된 품목 및 금액을 담당자에게 확인된 다음 카드 부분 취소를 해드리고 있습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-9>신용카드로 결제했는데, 다른 방법으로 환불받을 수 있나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-9" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                신용카드로 결제 후 주문을 취소하는 경우, 카드 승인을 취소하는 방법으로 환불 처리가 이루어집니다.<br /><br />따라서 현금 등의 다른 방법으로는 환불해드리지 않습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-10>무통장입금 시 주문자와 다른 이름으로 입금해도 되나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-10" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                입금자명이 달라도 결제 확인 가능합니다. <br /><br />학교명 or 업체명으로 입금하시면 확인 가능하며, 다른 이름으로 입금하시는 경우 연락 주시면 빠른 확인이 가능합니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-11>무통장입금 시 입금 확인은 언제 되나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-11" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                보통 10~20분 내로 무통장입금 확인 후 입금 완료로 변경됩니다.
                약 송금한 1시간 후에도 입금확인중으로 표시가 된다면 아이넥서스(T.1644-4214)로 문의 바랍니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-12>무통장입금 시 상품대금은 언제까지 입금해야 하나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-12" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                상품대금은 주문 후 7일 이내에 입금하시면 됩니다. <br /><br />입금 기한이 지나도록 입금하지 않으실 경우 구매의사가 없는 것으로 인정되어 취소될 수 있사오니 유의하시기 바랍니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-13>전표 승인으로 가맹점 번호를 알고 싶습니다.</b-button>
        </b-card-header>
        <b-collapse id="accordion-13" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                비씨카드 가맹점 번호 746206959 (광주카드, 하나 비자카드, 씨티카드 포함)입니다.<br /><br />신한카드 가맹점 번호 0025918806 입니다. <br /><br />타카드사 가맹점 번호 문의시 T.1644-4214로 연락 주시기 바랍니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-14>제품을 후불로 구매하고 싶습니다.</b-button>
        </b-card-header>
        <b-collapse id="accordion-14" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                현재 업체는 선입금하셔야 진행 가능하며, 학교 및 국가연구소는 후불 결제로 진행되고 있습니다. <br /><br />그 외의 경우 T.1644-4214로 연락 바랍니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-15>카드 전표를 분실하였습니다. 다시 보내줄 수 있나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-15" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                네 가능합니다. <br /><br />고객만족센터(T.1644-4214)&nbsp; 또는 E-mail(sales@4science.net)으로 연락주시기 바랍니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-16>결제를 진행하려면 관련 서류(견적서, 거래명세서, 사업자등록증, 통장사본 등)가 필요합니다. </b-button>
        </b-card-header>
        <b-collapse id="accordion-16" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                My Page &ldquo;주문/배송조회&rdquo; 메뉴에서 주문하신 내용을 클릭하시면 해당 서류를 출력하실 수 있습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-19>유선(전화) 상으로 주문이 가능한가요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-19" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                유선(전화) 상으로 주문하시는 것은 어렵습니다.<br />
                누락, 오류, 중복 등의 위험성이 커서 온라인 주문이나 팩스, 메일로 주문해주셔야 정상적인 주문이 가능합니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-20>주문취소를 하고 싶어요.</b-button>
        </b-card-header>
        <b-collapse id="accordion-20" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                4sicence 홈페이지 고객센터에 들어가시면 &lsquo;취소/교환접수&rsquo;가 있습니다.<br />
                취소/교환접수&rsquo;를 클릭하셔서 주문 정보를 기재해 주시면 주문취소 접수가 완료됩니다. 담담자가 접수확인 후 주문취소가 가능한 주문에 대해서 처리를 해드립니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-21>발주서를 메일이나 팩스로 보냈을 때 바로 주문접수가 되나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-21" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                주문접수 됩니다. 다만 국가 연구소와 학교의 주문접수를 제외한 모든 주문접수는 선 결제를 원칙으로 하고 있습니다.<br />
                입금확인 후 주문진행을 해드리오니 참고하시기 바랍니다.
            </b-card-body>
        </b-collapse>
    </b-tab>

    <b-tab title="배송">
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-1>배송은 얼마나 걸리나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                구매하시는 제품에 따라 배송기간이 상이합니다.<br />
                제품 상세페이지에 기재되어있는 납기가 배송소요기간이며, 재고유무에 따라 납기는 변할 수 있습니다.<br />
                자세한 납기를 원하실 경우, 고객센터(1644-4214) 또는 온라인 고객의 소리에 문의 남겨주시면 안내해드리도록 하겠습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-2>배송비는 얼마인가요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                기본 택배의 배송비는 3,500원이며, 배송방법(ex. 택배, 퀵서비스, 용달 등등)에 따라 배송비가 달라집니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-3>배송비는 누가 부담하나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                10만원 미만 구매 시, 배송비는 구매자가 부담합니다.<br />
                10만원 이상 구매 시, 택배배송에 한하여 포사이언스가 배송비를 부담합니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-4>주문배송조회는 어떻게 하나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                로그인을 하신 후 주문명을 클릭하면 주문진행상태를 확인할 수 있습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-5>구매한 제품 중 일부만 배송 되었습니다.</b-button>
        </b-card-header>
        <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                2개 이상 주문하셨을 경우, 개별발송 될 수 있습니다.<br />
                또한 납기가 서로 다른 제품을 주문하셨을 경우 입고되는 제품 순서대로 출고가 진행됩니다.<br />
                자세한 문의는 고객만족센터(1644-4214)를 이용해주시기 바랍니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-6>여러 주소로 나눠서 배송 받을 수 있나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                네. 주문서 작성하실 때 배송 시 요구사항에 요청하시거나<br />
                고객만족센터(1644-4214)로 전화하셔서 요청하시면 원하시는 주소로 나눠서 배송 받으실 수 있습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-7>상품을 빨리 받고 싶은데 퀵 서비스를 통해 배송 받을 수 있나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                제품에 따라 다르지만, 대부분 택배를 통해 배송됩니다. 퀵 서비스를 원하실 경우, 고객만족센터(1644-4214)로 문의하시기 바랍니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-8>배송지 주소를 변경하고 싶습니다.</b-button>
        </b-card-header>
        <b-collapse id="accordion-8" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                배송지 또는 수취인 전화번호 등의 배송정보 변경은 제품이 출고되기 전까지 가능합니다.<br />
                온라인으로 변경이 불가능하며, 고객만족센터(1644-4214)로 요청해주시면 배송지 변경을 친절하게 도와드리겠습니다.
            </b-card-body>
        </b-collapse>
    </b-tab>

    <b-tab title="취소/반품/교환">
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-1>주문 취소를 하고 싶어요</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                포사이언스에서 판매하고 있는 제품 특성상 주문제작형 제품과 수입 제품이 많아 온라인으로 직접적인 주문 취소는 불가능 합니다.

                주문취소 문의 방법은 아래 방법을 통해 접수 가능합니다.

                    1. 고객센터 – 고객상담문의 페이지의 취소/교환 접수를 통한 온라인 서비스
                        (https://www.4science.net/cscenter/board/cancelchange.do)
                
                    2. 고객만족센터(1644-4214)를 통한 오프라인 서비스

                    3, E-mail(sales@4science.net)

                주문 취소 여부를 확인한 다음 3일 이내 처리해드리겠습니다.                             
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-2>제품을 반품/교환하고 싶어요.</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                포사이언스에서는 다음과 같은 기간 및 내용으로 상품 및 용역에 대하여 교환, 반품, 환불을 보장하고 있으며,
                상품의 반환에 의한 추가비용을 구매자에게 부담시키지 않습니다.
                단, 고객 변심 또는 주문 번복으로 인한 경우의 반환 비용은 구매자 부담입니다.
                -단순 변심일 경우 : 물품수령 후 7일 이내 반품 가능 (반품 배송비 구매자 부담)
                -표시, 광고 내용과 상이하거나 물품 하자인 경우: 물품 수령 후 3개월 이내, 또는 그 사실을 안 날, 또는 알 수 있었던 날로부터 30일 이내 반품 가능.
                교환 및 반품으로 환불을 요청하실 경우에는, E-mail(sales@4science.net) 상담서비스나 고객만족센터(1644-4214)를 통해 요청하시면 친절하게 처리해드리겠습니다.
                교환 및 반품가능 여부를 확인한 다음 반품의 경우 3일 이내에 결제 금액을 환불해드리겠습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-3>취소/교환/반품이 불가능 한 경우를 알고 싶어요.</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                다음과 같은 경우, 주문취소/교환/반품이 불가능합니다.
                - 주문 당시 해외 발주상품의 경우
                - 고객의 요청으로 주문제작이 이루어진 경우
                - 주문해주신 제품이 배송 중인 경우
                - 반품요청기간이 지난 경우
                - 고객님의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우 (단, 상품 내용 확인을 위하여 포장 훼손한 경우는 제외
                - 포장을 개봉하였거나 포장이 훼손되어 상품의 가치가 현저하게 감소한 경우
                - 고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우
                - 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우
                - 복제가 가능한 상품 등의 포장을 훼손한 경우
                주문취소 및 반품으로 환불을 요청하실 경우에는, E-mail(sales@4science.net) 상담서비스나 고객상담문의의 취소/교환접수,
                고객만족센터(1644-4214)를 통해 요청하시면 친절하게 처리해드리겠습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-4>교환/반품 시 배송비는 누가 부담하나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                교환/반품시 배송비는 반품원인을 제공한 사람이 부담합니다.<br /> <br />
                - 단순 변심일 경우 : 구매자 부담<br />
                - 표시, 광고 내용과 상이하거나 물품 하자인 경우: 판매자 부담
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-5>반품요청을 했는데 환불은 언제 해주나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                주문 취소 및 반품가능 여부를 확인한 다음 3일 이내에 결제 금액을 환불해드리겠습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-6>교환할 경우 배송비는 누가 부담하나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                교환할 경우 배송비는 교환원인을 제공한 사람이 부담하도록 되어 있으며,<br />
                교환 시 최초 운송비 또한 교환원인을 제공한 자가 부담함을 원칙으로 합니다.<br />
                <br />
                즉, 상품 하자가 아닌 구매자 변심사유의 경우에는 구매자가 왕복 배송비를 부담하게 되고, 상품 하자 및 판매자 귀책사유에 의한 교환일 경우 판매자가 왕복 배송비를 부담하게 됩니다.(상품에 따라 차이가 발생할 수 있습니다.)
            </b-card-body>
        </b-collapse>
    </b-tab>

    <b-tab title="기타">
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-1>전화상담 시간이 어떻게 되나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                평일 오전 9시 ~ 오후 6시이며, 토요일/일요일/공휴일은 휴무입니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-3>마일리지를 다른 사람에게 양도 할 수 있나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                마일리지는 타인에게 양도 및 증여가 되지 않습니다.
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-4>마일리지 사은품은 어떻게 신청하나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                <a href="http://www.4science.net">4science.net</a> 로그인하신&nbsp;후 마이페이지의 마일리지를 클릭하시면 마일리지 상품 신청할 수 있는 페이지가 나옵니다.<br /><br />
                사은품은&nbsp;보유 마일리지 금액 내에서 신청이 가능하며 점수에 해당하는&nbsp;5만원, 10만원 단위의 장수를 선택하실 수 있습니다.<br /><br />
                <img :src="`${s3url}cscenter/mileage.jpg`" width="100%" />
            </b-card-body>
        </b-collapse>
    
        <b-card-header header-tag="header" role="tab">
            <b-button block v-b-toggle.accordion-5>마일리지 사은품을 언제 받을 수 있나요?</b-button>
        </b-card-header>
        <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                신청하신 사은품은&nbsp;담당자 확인 후&nbsp;진행되며 모바일 상품권으로 문자 발송됩니다.<br /><br />
                업무일 기준으로 5일 이내 문자를 못 받으신 분은 T.1644-4214로 연락 바랍니다.<br /><br />
                <img :src="`${s3url}cscenter/gift.jpg`" width="100%" />
                <br /><br />마일리지 안내 링크를 참조 바랍니다. <br />
                <a href="https://www.4science.net/cscenter/quide_mileage.do">https://www.4science.net/cscenter/quide_mileage.do</a>
            </b-card-body>
        </b-collapse>
    </b-tab>
</b-tabs>
</template>

<script>
export default { name: 'CSCenterFaq' };
</script>
<style lang="css" scoped>
.con_faq { margin:0; }
.con_faq::v-deep > div:first-child { width:230px; padding-left:0; flex:0 0 auto; max-width:100%; }
.con_faq::v-deep > div:first-child .nav-tabs { flex-direction:column; }
.con_faq::v-deep > div:first-child .nav-tabs .nav-link { background:#fff; border:1px solid #DDDDDD; padding:12px 25px; border-radius:0; color:#62615D; }
.con_faq::v-deep > div:first-child .nav-tabs .nav-link.active { background:#F6F6F6; color:#000; }
.con_faq::v-deep.tab-content { padding-left:15px; flex-basis: 0; flex-grow: 1; max-width: 100%;}
.con_faq::v-deep.tab-content .tab-pane .card-header { padding:0; border:0; }
.con_faq::v-deep.tab-content .tab-pane .card-header button { display:block; width:100%; text-align:left; background:#F6F6F6; color:#000; border:1px solid #D7D7D7; border-radius:0; margin-bottom:-1px; padding:10px 15px; font-size:.85rem; font-weight:bold; }
.con_faq::v-deep.tab-content .tab-pane .collapse { border-left:1px solid #D7D7D7; border-right:1px solid #D7D7D7; }
.con_faq::v-deep.tab-content .tab-pane .collapse .card-body { font-size:.77rem; }

@media (max-width: 992px){
    .con_faq::v-deep > div:first-child { width:100%; }
    .con_faq::v-deep > div:first-child .nav-tabs { flex-direction:row; }
    .con_faq::v-deep > div:first-child .nav-tabs li { flex: 0 0 33.333333%; max-width:33.333333%; }
    .con_faq::v-deep > div:first-child .nav-tabs .nav-link { padding:5px 0; font-size:.8rem; text-align:center; }

    .con_faq::v-deep.tab-content { padding-left:0; margin-top:.5rem; }
}
</style>