<template>
<div id="print_area">
    <div class="p_wrap">
        <b-row class="row h3">
            <b-col tag="h3">주문 상세</b-col>
            <b-col class="print_hide"><b-button :to="{name: 'adm_order_index'}" class="white" size="sm">목록으로 돌아가기</b-button></b-col>
        </b-row>
        
        <b-container class="top">
            <b-row>
                <b-col>No.</b-col>
                <b-col>주문번호</b-col>
                <b-col>주문날짜</b-col>
                <b-col>주문자</b-col>
                <b-col>연락처</b-col>
                <b-col>이메일</b-col>
                <b-col>담당</b-col>
                <b-col class="print_hide">영업장부</b-col>
                <b-col class="print_hide">주문서</b-col>
                <b-col class="print_hide">문서받기</b-col>
                <b-col class="print_hide">처리상태</b-col>
            </b-row>
            <b-row>
                <b-col>{{ od.od_id }}.</b-col>
                <b-col>{{ od.od_no }}</b-col>
                <b-col>{{ od.created_at | formatDate_YYYY_MM_DD }}</b-col>
                <b-link v-if="od.created_id" :to="{name: 'adm_user_edit', params: { id:od.created_id }}" class="col">
                    {{ od.od_orderer }}
                </b-link>
                <b-col>{{ od.od_orderer_hp }}</b-col>
                <b-col>{{ od.od_orderer_email }}</b-col>
                <b-col>
                    <b-button v-if="od.od_mng < 1" @click="update('od_mng')" class="white">담당</b-button>
                    <template v-else>{{od.mng.name}}</template>
                </b-col>
                <b-col class="print_hide">
                    <b-button v-if="od.od_has_ledger == 'N'" class="white" @click="ledger">등록</b-button>
                    <template v-else>등록됨</template>
                </b-col>
                <b-col class="print_hide">
                    <b-button class="white" @click="print">인쇄</b-button>
                </b-col>
                <b-col class="print_hide">
                    <b-input-group v-if="od.od_mng">
                        <b-form-select class="custom-select" v-model="document_type">
                            <b-form-select-option value="est_e">견적서 EXCEL</b-form-select-option>
                            <b-form-select-option value="est_p">견적서 PDF</b-form-select-option>
                            <b-form-select-option value="tra_e">거래명세서 EXCEL</b-form-select-option>
                            <b-form-select-option value="tra_p">거래명세서 PDF</b-form-select-option>
                            <b-form-select-option value="send_tra_p">거래명세서 발송 PDF</b-form-select-option>
                        </b-form-select>
                        <b-input-group-append><b-button @click="document_action" class="d_gray">받기</b-button></b-input-group-append>
                    </b-input-group>
                    <template v-else>담당 등록 후...</template>
                </b-col>
                <b-col class="print_hide">
                    <b-input-group>
                        <b-form-select v-model="od.od_step">
                            <b-form-select-option :value="null" disabled>◖처리 상태◗</b-form-select-option>
                            <b-form-select-option v-for="(v, k) in od.order_config.step" :key="k" :value="k">{{v.name}}</b-form-select-option>
                        </b-form-select>
                        <b-input-group-append><b-button @click="update('od_step')" class="d_gray">변경</b-button></b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
        </b-container>
        
        <div class="box">
            <b-row tag="h5">
                <b-col tag="b">주문 상품</b-col>
                <b-col class="text-right print_hide"><b-button @click="update('odm_ea')" class="teal">주문 상품 정보 수정</b-button></b-col>
            </b-row>
            
            <div class="top_border" />
            <b-row class="goods" v-for="(pa, pa_i) in od.order_purchase_at" :key="`pa_${pa_i}`">
                <b-col class="pa_tit print_hide_flex">
                    <b v-if="pa.odpa_pa_id">업체<br />직배송</b>
                    <b v-else>포사이언스<br />배송</b>
                </b-col>
                
                <b-col class="gd_con">
                    <b-row>
                        <b-col class="print_hide">
                            <b-form-checkbox class="myCheck allCheck" v-model="pa.dlvy_all_chk" :indeterminate="pa.indeterminate" @change="toggleAll(pa)" />
                        </b-col>
                        <b-col></b-col>
                        <b-col>주문 상품</b-col>
                        <b-col>제조사</b-col>
                        <b-col>판매가</b-col>
                        <b-col>수량</b-col>
                        <b-col>금액</b-col>
                        <b-col class="print_hide"></b-col>
                    </b-row>
                    <b-row v-for="(odm, odm_i) in pa.order_model" :key="`gd_${odm_i}`" :class="{model: odm.odm_type=='MODEL', option: odm.odm_type=='OPTION'}">
                        <b-col class="align print_hide">
                            <b-form-checkbox class="myCheck" v-if="odm.odm_type=='MODEL'" value="Y" unchecked-value="N" v-model="odm.dlvy_chk" @change="changeSon(pa)" />
                        </b-col>
                        <b-col class="align">
                            <div v-if="odm.odm_type=='MODEL'">
                                <img :src="odm.img_thumb_src" v-if="odm.odm_gd_id>0" @click="openWinPop(`/admin/shop/goods/${odm.odm_gd_id}/edit`, 1700, 900)" />
                                <img :src="odm.img_thumb_src" v-else />
                            </div>
                            <b v-else>추가 옵션</b>
                        </b-col>
                        <b-col class="desc" :class="{option:odm.odm_type=='OPTION'}">
                            <template v-if="odm.odm_type=='MODEL'">
                                <b>{{odm.odm_gd_name}}</b>
                                <p>
                                    제품명: {{odm.odm_gm_name}} / 판매단위: {{odm.odm_gm_unit}} <br />
                                    모델명: {{odm.odm_gm_code}} / Cat.No.: {{odm.odm_gm_catno}}<br />
                                    사양: {{odm.odm_gm_spec}}
                                </p>
                            </template>
                            <template v-else>{{odm.odm_gm_name}}: {{odm.odm_gm_spec}}</template>
                        </b-col>
                        <b-col class="align">{{odm.odm_mk_name}}</b-col>
                        <b-col class="align end">{{odm.odm_price_add_vat | comma | won}}</b-col>
                        <b-col class="align">
                            <div class="cube_box">
                                <div class="cube" :class="{show_right: odm.show_right}">
                                    <div class="piece front">{{odm.odm_ea | comma}}</div>
                                    <div class="piece right"><EaInput v-model="pa.order_model[odm_i]" /></div>
                                </div>
                            </div>
                        </b-col>
                        <b-col class="align">
                            <b class="sum">
                                {{odm.odm_price_add_vat*odm.odm_ea | comma | won}}
                                <b-form-checkbox v-if="pa.odpa_pa_type !== 'AIR' && odm.odm_type === 'MODEL'" v-model="odm.dlvy_all_in" @change="DlvyAllIn(odm.odm_id)" button class="print_hide">
                                    배송비 포함
                                </b-form-checkbox>
                            </b>
                        </b-col>
                        <b-col class="align print_hide_flex" :style="{flexWrap:'wrap'}">
                            <template v-if="odm.odm_type=='MODEL'">                                    
                                <b-badge v-if="odm.order_dlvy_info.oddi_receive_date" class="gray">수취완료</b-badge>
                                <b-badge v-else-if="odm.order_dlvy_info.oddi_arrival_date" class="green">배송완료</b-badge>
                                <b-button v-else-if="odm.order_dlvy_info.oddi_dlvy_num" class="teal" :href="getHref(odm.order_dlvy_info.oddi_dlvy_com, odm.order_dlvy_info.oddi_dlvy_num)">배송추적</b-button>
                                <br />
                                <b-button class="white" @click="writeDlvyInfo(odm)">배송정보</b-button>
                            </template>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col class="dlvy_fare print_hide_flex">
                    <div>
                        <p v-if="pa.odpa_pa_type == 'AIR'">항공 운임료</p>
                        <p v-else>배송비</p>
                        {{pa.odpa_dlvy_p_add_vat | comma | won}}
                    </div>
                </b-col>
            </b-row>

            <b-row class="action print_hide">
                <b-col>선택한 상품의 <b-button @click="writeDlvyInfo('bundle')" class="teal ml-2">배송정보 일괄 등록</b-button></b-col>
            </b-row>
          
            <div class="top_border" />
            <div class="sum_up">
                <b-row class="total">
                    <b-col>상품금액</b-col>
                    <b-col><b>{{(od.od_gd_price+od.od_surtax) | comma | won}}</b></b-col>
                    <b-col>배송료</b-col>
                    <b-col><b>{{od.od_dlvy_price | comma | won}}</b></b-col>
                    <b-col>결제 예정 금액</b-col>
                    <b-col><b>{{od.od_all_price | comma | won}}</b></b-col>
                </b-row>
                <b-row class="total_sub">
                    <b-col>
                        <div>
                            <b-col>상품가</b-col><b-col>{{od.od_gd_price | comma | won}}</b-col>
                        </div>
                        <div>
                            <b-col>부가세</b-col><b-col>{{od.od_surtax | comma | won}}</b-col>
                        </div>
                    </b-col>
                    <b-col>
                        <div>
                            <b-col>포사이언스 배송</b-col><b-col>{{dlvy_4s | comma}}</b-col>
                        </div>
                        <div>
                            <b-col>업체 배송</b-col><b-col>{{dlvy_other | comma}}</b-col>
                        </div>
                    </b-col>
                    <b-col>
                        <div>
                            <b-col>적립예정 마일리지</b-col><b-col>{{sum_mileage | comma}}</b-col>
                        </div>
                    </b-col>
                </b-row>
            </div>
        </div>

        <div class="box extra_info">
            <b-row tag="h5"><b-col tag="b">결제정보</b-col></b-row>
            <table class="tbl_st" v-if="od.od_pay_method == 'B' || od.od_pay_method == 'E'">
                <tr>
                    <th>결제금액</th><td>{{od.od_all_price | comma | won}}</td>
                    <th>결제예정일</th>
                    <td>{{payPlanDisplay}}</td>
                </tr>
                <tr>
                    <th>결제수단</th>
                    <td>
                        <span v-if="od.od_pay_method=='B'">계좌이체</span>
                        <span v-else-if="od.od_pay_method=='E'">에스크로</span>
                    </td>
                    <th>입금계좌</th>
                    <td>
                        <span v-if="od.order_extra_info.oex_bank=='K'">국민은행</span>
                        <span v-else-if="od.order_extra_info.oex_bank=='W'">우리은행</span>
                    </td>
                </tr>
                <tr>
                    <th>입금자</th><td colspan="3">{{od.order_extra_info.oex_depositor}}</td>
                </tr>
            </table>
            <table class="tbl_st" v-else>
                <tr>
                    <th>결제금액</th><td>{{od.od_all_price | comma | won}}</td>
                    <th>결제예정일</th>
                    <td>{{payPlanDisplay}}</td>
                </tr>
                <tr>
                    <th>결제수단</th>
                    <td>
                        <span v-if="od.od_pay_method=='C'">카드결제</span>
                        <span v-else-if="od.od_pay_method=='P'">PSYS</span>
                        <span v-else-if="od.od_pay_method=='R'">원격결제</span>

                        <b-button v-if="od.order_pg" @click="openWinPop(`https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=${od.order_pg.pg_tid}&noMethod=1`, 430, 540)" class="teal print_hide_inline_block">매출전표</b-button>
                    </td>
                    <th>카드종류</th><td>{{od.order_pg.pg_card_com}}</td>
                </tr>
                <tr>
                    <th>결과메세제</th><td>{{od.order_pg.pg_msg}}</td>
                    <th>결제자</th><td>{{od.order_pg.pg_buyer_nm}}</td>
                </tr>
            </table>
            
            <b-row tag="h5"><b-col tag="b">배송정보</b-col><b-col class="text-right"><b-button @click="update('addr')" class="teal print_hide_inline_block">배송정보 수정</b-button></b-col></b-row>
            <table class="tbl_st address">
                <tr>
                    <th>수취인</th>
                    <td>
                        <font-awesome-icon icon="copy" v-b-tooltip="'수령인 이름 복사'" @click="copyToClipboard(od.od_receiver)" class="print_hide_inline_block" />
                        <div class="cube_box receiver">
                            <div class="cube" :class="{show_right: focusInfo.od_receiver}">
                                <div class="piece front">{{ od.od_receiver }}</div>
                                <div class="piece right">
                                    <b-form-input v-model="od.od_receiver" @focus="focusInfo.od_receiver = true" @blur="focusInfo.od_receiver = false" size="sm" />
                                </div>
                            </div>
                        </div>
                    </td>
                    <th>전화번호</th>
                    <td>
                        <font-awesome-icon icon="copy" v-b-tooltip="'수령인 번호 복사'" @click="copyToClipboard(od.od_receiver_hp)" class="print_hide_inline_block" />
                        <div class="cube_box receiver_hp">
                            <div class="cube" :class="{show_right: focusInfo.od_receiver_hp}">
                                <div class="piece front">{{ od.od_receiver_hp }}</div>
                                <div class="piece right">
                                    <b-form-input v-model="od.od_receiver_hp" @focus="focusInfo.od_receiver_hp = true" @blur="focusInfo.od_receiver_hp = false" size="sm" />
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>배송주소</th>
                    <td colspan="3">
                        <font-awesome-icon icon="copy" v-b-tooltip="'수령인 주소 복사'" @click="copyToClipboard(`${od.od_addr1}, ${od.od_addr2}`)" class="print_hide_inline_block" />
                        <div class="cube_box receiver_addr">
                            <div class="cube">
                                <div class="piece front">{{ od.od_zip }}<b>,</b> {{ od.od_addr1 }}<b>,</b> {{ od.od_addr2 }}</div>
                                <div class="piece right">
                                    <b-button class="teal ml-4" @click="isModalViewed = !isModalViewed, modalType = 'postCode'">주소검색</b-button>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>배송시 요구사항</th><td colspan="3">{{od.od_memo}}</td>
                </tr>
            </table>

            <b-row tag="h5"><b-col tag="b">요청서류</b-col></b-row>
            <table class="tbl_st">
                <tr>
                    <th>요청서류</th>
                    <td colspan="3">{{reqDocumentDisplay}}</td>
                </tr>
                <tr><th>첨부서류 메모</th><td colspan="3" v-html="od.order_extra_info.oex_memo"></td></tr>
                <template v-if="(od.od_pay_method == 'B' || od.od_pay_method == 'E')">
                    <template v-if="od.order_extra_info.oex_type == 'IV'">
                        <tr v-if="od.file_info">
                            <th>사업자등록증</th>
                            <td>
                                <b-button v-if="checkImage(od.file_info.fi_ext)" @click="isModalViewed = !isModalViewed, modalType = 'blView'" class="print_hide">사업자 등록증 보기</b-button>
                                <b-button v-else @click="fileDown(od.file_info.down_path, od.file_info.fi_original)" class="print_hide">사업자 등록증 다운로드</b-button>
                            </td>
                        </tr>
                        <template v-else>
                            <tr>
                                <th>법인명</th><td>{{od.order_extra_info.oex_biz_name}}</td>
                                <th>사업자등록번호</th><td>{{od.order_extra_info.oex_biz_num}}</td>
                                <th>대표자</th><td>{{od.order_extra_info.oex_ceo}}</td>
                            </tr>
                            <tr>
                                <th>주소</th><td>{{od.order_extra_info.oex_addr}}</td>
                                <th>업태</th><td>{{od.order_extra_info.oex_biz_type}}</td>
                                <th>업종</th><td>{{od.order_extra_info.oex_biz_item}}</td>
                            </tr>
                        </template>
                        <tr>
                            <th>담당자 이름</th><td>{{od.order_extra_info.oex_mng}}</td>
                            <th>담당자 메일</th><td>{{od.order_extra_info.oex_email}}</td>
                            <th>담당자 번호</th><td>{{od.order_extra_info.oex_num}}</td>
                        </tr>
                        <tr>
                            <th>세금계산서 발급시 요구사항</th><td colspan="5" v-html="od.order_extra_info.oex_requirement"></td>
                        </tr>
                    </template>
                    <tr v-else-if="od.order_extra_info.oex_type == 'IVNO'">
                        <th>지출 증빙 서류</th>
                        <td colspan="5">세금계산서 입력안함</td>
                    </tr>
                    <tr v-else-if="od.order_extra_info.oex_type == 'NO'">
                        <th>지출 증빙 서류</th>
                        <td colspan="5">미발급</td>
                    </tr>
                    <tr v-else>
                        <th>
                            지출 증빙 서류<br />
                            (
                                <span v-if="od.order_extra_info.oex_type == 'HP'">휴대폰번호</span>
                                <span v-else-if="od.order_extra_info.oex_type == 'IN'">주민등록번호</span>
                                <span v-else-if="od.order_extra_info.oex_type == 'CN'">카드번호</span>
                                <span v-else-if="od.order_extra_info.oex_type == 'BN'">사업자번호</span>
                            )
                        </th>
                        <td colspan="5">{{od.order_extra_info.oex_num}}</td>
                    </tr>
                </template>
            </table>
        </div>

        <transition name="modal">
            <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="600">
                <template v-if="modalType == 'blView'">
                    <template slot="header">사업자 등록증 보기</template>
                    <img :src="od.file_info.path" @click="fileDown(od.file_info.down_path, od.file_info.fi_original)" style="max-width: 100%; height: auto;"/>
                </template>

                <template v-else-if="modalType == 'postCode'">
                    <template slot="header">우편번호 검색</template>
                    <VueDaumPostcode class="shadow mt-3" @complete="onPostcodeSlt" :animation="true" />
                </template>

                <template v-else-if="modalType == 'postDetail'">
                    <template slot="header">배송지 변경</template>
                    <b-container class="adform layerModal">
                        <b-row>
                            <b-col class="label">우편번호</b-col>
                            <b-col>{{od.od_zip}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col class="label">주소</b-col>
                            <b-col>{{od.od_addr1}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col class="label">상세 주소</b-col>
                            <b-col><b-form-input v-model="od.od_addr2" @keyup.enter="isModalViewed = false" /></b-col>
                        </b-row>
                        
                        <b-row>
                            <b-col class="ctrl"><b-button @click="isModalViewed = false">완료</b-button></b-col>
                        </b-row>
                    </b-container>
                </template>

                <template v-else-if="modalType == 'sendTransaction'">
                    <template slot="header">거래명세서 PDF 발송</template>
                    <b-container class="adform layerModal">
                        <b-row>
                            <b-col class="label">공급 날짜</b-col>
                            <b-col>
                                <b-input-group size="sm">
                                    <b-form-input v-model="od.trans_date" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="format_date"></b-form-input>
                                    <b-input-group-append>
                                        <b-form-datepicker size="sm" v-model="od.trans_date" button-only right></b-form-datepicker>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class="label">공급 받는자</b-col>
                            <b-col><b-form-input v-model="od.trans_receive" /></b-col>
                        </b-row>
                        <b-row>
                            <b-col class="label">받을 Email</b-col>
                            <b-col><b-form-input v-model="od.trans_email" @keyup.enter="sendTransaction" /></b-col>
                        </b-row>
                        
                        <b-row>
                            <b-col class="ctrl"><b-button @click="sendTransaction">발송</b-button></b-col>
                        </b-row>
                    </b-container>
                </template>

                <template v-else-if="modalType == 'dlvyInfo'">
                    <template slot="header">배송 정보 등록</template>
                    <b-container class="adform layerModal">
                        <b-row>
                            <b-col class="label">운송사</b-col>
                            <b-col>
                                <b-form-select v-model="dlvy_info.company" size="sm">
                                    <b-form-select-option v-for="(v, k) in od.order_config.delivery_com" :key="k" :value="k">{{ k }}</b-form-select-option>
                                </b-form-select>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class="label">송장번호</b-col>
                            <b-col><b-form-input v-model="dlvy_info.number" /></b-col>
                        </b-row>
                        <b-row>
                            <b-col><b-button variant="success" @click="update('arrival')">배송완료</b-button></b-col>
                            <b-col class="ctrl"><b-button @click="update('dlvy')">등록</b-button></b-col>
                        </b-row>
                    </b-container>
                </template>
            </Modal>
        </transition>
    </div>
</div>
</template>

<script>
import ax from '@/api/http';
import { VueDaumPostcode } from "vue-daum-postcode";

var dt = new Date();
export default {
    name: 'edit',
    components: {
        VueDaumPostcode,
        'Modal': () =>      import('@/views/_common/Modal.vue'),
        'EaInput': () =>    import('./_comp/EaInput.vue'),
    },
    data() {
        return {
            isModalViewed: false,
            modalType: '',
            focusInfo: {
                od_receiver:false,
                od_receiver_hp:false,
            },
            od: {
                order_extra_info:{},
                order_config: {},
                mng: {},
                order_purchase_at:[],
                order_pg:{},
            },
            dlvy_info: {
                selected: [],
                company: '한진택배',
                number: ''
            },
            document_type: '',

        };
    },
    computed: {
        payPlanDisplay() {
            var plan = this.od.order_extra_info.oex_pay_plan;
            var returnMsg = '';
            if (plan == 'soon')         returnMsg = '선 결제';
            else if (plan == 'week1')   returnMsg = '1주이내 결제';
            else if (plan == 'week2')   returnMsg = '2주이내 결제';
            else if (plan == 'month1')  returnMsg = '한달이내 결제';
            else if (plan == 'month2')  returnMsg = '2개월이내 결제';
            else if (plan == 'dlvy')    returnMsg = '납품시 결제';
            else                        returnMsg = plan;
            return returnMsg;
        },
        reqDocumentDisplay() {
            let req = new Array();
            if (this.od.order_extra_info.oex_req_est =='Y') req.push('견적서');
            if (this.od.order_extra_info.oex_req_tran=='Y') req.push('거래명세서');
            if (this.od.order_extra_info.oex_req_biz =='Y') req.push('사업자등록증사본');
            if (this.od.order_extra_info.oex_req_bank=='Y') req.push('통장사본');
            return req.join(', ');
        },
        dlvy_4s () {
            return this.od.order_purchase_at.hasOwnProperty(0) ? this.od.order_purchase_at[0].odpa_dlvy_p_add_vat : 0;
        },
        dlvy_other () {
            return Object.values(this.od.order_purchase_at).reduce((acc, el) => {
                return acc + (el.odpa_pa_name != '' ? el.odpa_dlvy_p_add_vat : 0)
            }, 0);
        },
        sum_mileage () {
            return Math.round(this.od.od_gd_price * Auth.user().my_mileage_rate / 100);
        },
    },
    methods: {
        async edit(){
            try {
                const res = await ax.get(`/api/admin/shop/order/${this.$route.params.od_id}/edit`);
                if (res && res.status === 200) {
                    this.od = res.data;
                    this.loaded = true;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async update(type, v=null){
            try {
                this.od = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    this.od, // 수정하려는 객체
                    {_method : 'PATCH', type: type} // 삽입하려는 내용
                );

                if (type == 'od_mng') {
                    this.od.od_mng = Auth.user().id;
                    this.od.mng = Auth.user();
                } else if (type == 'dlvy') {
                    this.od.order_purchase_at.forEach(opa => {
                        opa.order_model.forEach(odm => {
                            if (odm.dlvy_chk == 'Y') {
                                odm.order_dlvy_info.oddi_dlvy_com = this.dlvy_info.company;
                                odm.order_dlvy_info.oddi_dlvy_num = this.dlvy_info.number;
                            }
                        });
                    });
                } else if (type == 'arrival') {
                    this.od.order_purchase_at.forEach(opa => {
                        opa.order_model.forEach(odm => {
                            if (odm.dlvy_chk == 'Y')
                                odm.order_dlvy_info.oddi_arrival_date = true;
                        });
                    });
                }
                const res = await ax.post(`/api/admin/shop/order/${this.$route.params.od_id}`, this.od);
                if (res && res.status === 200 && res.data.msg === 'success') {
                    if (type == 'od_mng') {
                        Notify.toast('success', '담당 배정 완료');
                    } else if (type == 'od_step') {
                        Notify.toast('success', '주문 처리 단계 수정');
                    } else if (type == 'odm_ea') {
                        Notify.toast('success', '주문 상품 정보 수정');
                        this.$router.go();
                    } else if (type == 'addr') {
                        Notify.toast('success', '상품 수령 정보 수정');
                        this.$router.go();
                    } else if (type == 'dlvy') {
                        Notify.toast('success', '배송 정보 등록');
                        this.isModalViewed = false;
                        this.offAllCheck();
                    } else if (type == 'arrival') {
                        Notify.toast('success', '배송 완료 등록');
                        this.isModalViewed = false;
                        this.offAllCheck();
                    }
                    this.$delete(this.od, '_method');
                } else
                    Notify.toast('warning', '수정 실패');
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response);
            }
        },

        document_action () {
            switch (this.document_type) {
                case 'est_e'      : this.estimateExcel(); break;  
                case 'est_p'      : this.estimatePdf(); break;  
                case 'tra_e'      : this.transactionExcel(); break;  
                case 'tra_p'      : this.transactionPdf(); break;  
                case 'send_tra_p' : this.isModalViewed = !this.isModalViewed; this.modalType = 'sendTransaction'; break;      
                default: break;
            }
        },
        async print () {
            await this.$htmlToPaper('print_area', {styles:[
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                '/css/fontawesome_svg.css',
                '/css/adm_shop_order_edit.css'
            ]});
        },

        async estimateExcel(){
            try {
                this.mngChk();
                const res = await ax.post(`/api/admin/shop/order/exportEstimateExcel`, this.od, { responseType: 'blob' });
                this.orderDocumentDown(res, 'Estimate_'+dt.format("yyyyMMdd")+'.xlsx');
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        async estimatePdf(){
            try {
                this.mngChk();
                const res = await ax.post(`/api/admin/shop/order/exportEstimatePdf`, this.od, { responseType: 'blob' });
                this.orderDocumentDown(res, 'Estimate_'+dt.format("yyyyMMdd")+'.pdf');
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        async transactionExcel(){
            try {
                this.mngChk();
                const res = await ax.post(`/api/admin/shop/order/exportTransactionExcel`, this.od, { responseType: 'blob' });
                this.orderDocumentDown(res, 'Transaction_'+dt.format("yyyyMMdd")+'.xlsx');
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        async transactionPdf(query = ''){
            try {
                this.mngChk();
                const res = await ax.post(`/api/admin/shop/order/exportTransactionPdf?${query}`, this.od, { responseType: 'blob' });
                if (res && res.status === 200) {
                    if ( query ) Notify.toast('success', '발송 완료');
                    else {
                        this.orderDocumentDown(res, 'Transaction_'+dt.format("yyyyMMdd")+'.pdf');
                        Notify.toast('success', '다운 완료');
                    }
                } else Notify.toast('warning', '실패');
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        orderDocumentDown(res, fileNm){
            let fileUrl = window.URL.createObjectURL(new Blob([res.data]));
            let fileLink = document.createElement('a');
            fileLink.href = fileUrl;
            fileLink.setAttribute('download', fileNm);
            document.body.appendChild(fileLink);
            fileLink.click();
        },
        mngChk(){
            if (!this.od.od_mng) {
                Notify.modal('담당자 배정 이후에 사용가능합니다.', 'warning');
                return false;
            }
        },

        async ledger() {
            try {
                this.od.data_type="ORD";
                const res = await ax.post(`/api/admin/ledger`, this.od);
                if (res && res.status === 200) {
                    if ( res.data.msg == 'Success' )
                        this.$router.push({ name: 'adm_ledger' })
                    else if ( res.data.msg == 'Existed' )
                        Notify.modal('이미 등록된 주문입니다.', 'warning');
                } else
                    Notify.toast('warning', '기록 실패');
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response);
            }
        },

        onPostcodeSlt(result) {
            this.$set(this.od, 'od_zip', result.zonecode);
            this.$set(this.od, 'od_addr1', result.roadAddress + "("+ result.buildingName +")");
            this.modalType = 'postDetail';
        },

        copyToClipboard (val) {// 클립보드로 복사하는 기능을 생성
            var aux = document.createElement("input");  // 글을 쓸 수 있는 란을 만든다.
            aux.setAttribute("value", val);    // 지정된 요소의 값을 할당 한다.
            document.body.appendChild(aux); // bdy에 추가한다.
            aux.select();   // 지정된 내용을 강조한다.
            document.execCommand("copy");   // 텍스트를 카피 하는 변수를 생성
            document.body.removeChild(aux); // body 로 부터 다시 반환 한다.
            Notify.toast('success', '복사됨');
        },

        sendTransaction () {            
            this.transactionPdf(`trans_date=${this.od.trans_date}&trans_receive=${this.od.trans_receive}&trans_email=${this.od.trans_email}&trans_mng_email=${this.od.mng.email}`);
            this.isModalViewed = false;
        },

        toggleAll(pa) {
            let opt = 'N';
            if (pa.dlvy_all_chk) opt = 'Y';
            pa.order_model.forEach(el => {
                if (el.odm_type == 'MODEL') el.dlvy_chk = opt;
            });
            pa.indeterminate = false;
        },
        changeSon (pa) {
            let tmp = [];
            pa.order_model.forEach(el => {
                if (el.odm_type == 'MODEL') tmp.push(el.dlvy_chk);
            });
            let isSame = tmp.every( v => v === tmp[0] );
            if(isSame) {
                if (tmp[0] == 'Y') {
                    pa.indeterminate = false;
                    pa.dlvy_all_chk = true;
                } else {
                    pa.indeterminate = false;
                    pa.dlvy_all_chk = false;
                }
            } else {
                pa.indeterminate = true;
                pa.dlvy_all_chk = false;
            }
        },
        writeDlvyInfo(odm) {
            if ( odm !== 'bundle' ) {
                odm.dlvy_chk = 'Y';
                this.od.order_purchase_at
                for (let opa of this.od.order_purchase_at) {
                    opa.dlvy_all_chk = false;
                    for (let odm02 of opa.order_model) {
                        if (odm.odm_id !== odm02.odm_id)
                            odm02.dlvy_chk = 'N';
                    }
                }
            }
            if (this.didCheck()) {
                this.modalType = 'dlvyInfo';
                this.isModalViewed = !this.isModalViewed;
            }
        },
        didCheck () {
            let didCheck = false;
            opa_loop : for (let opa of this.od.order_purchase_at) {
                for (let odm of opa.order_model) {
                    if (odm.dlvy_chk == 'Y') {
                        didCheck = true;
                        break opa_loop;
                    }
                }
            }
            if (!didCheck) {
                Notify.toast('warning', '모델을 먼저 체크하세요.');
                return false;
            } else return true;
        },
        offAllCheck () {
            for (let opa of this.od.order_purchase_at) {
                opa.indeterminate = false;
                opa.dlvy_all_chk = false;
                for (let odm of opa.order_model) odm.dlvy_chk = 'N';
            }
        },
        DlvyAllIn (odm_id) {
            for (var opa of this.od.order_purchase_at)
                for (var odm of opa.order_model) 
                    if (odm.odm_id !== odm_id) odm.dlvy_all_in = false;
        },
        getHref (com, num) {
            return this.od.order_config.delivery_com[com].replace('[송장번호]', num);
        },
        format_date(e) { return this.formatDate(e); },

    },
    mounted() {
        this.edit();
    },
}
</script>

<style lang="css" scoped>
@import '/css/adm_shop_order_edit.css';
.p_wrap .print_hide { display:block !important; }
.p_wrap .print_hide_flex { display:flex !important; }
.p_wrap .print_hide_inline_block { display:inline-block !important; }

.p_wrap .top .row:first-child { border-width:0px; }
.p_wrap .top .row .col:nth-child(1) { flex:0 0 6%; max-width:6%; }
.p_wrap .top .row .col:nth-child(2) { flex:0 0 8%; max-width:8%; }
.p_wrap .top .row .col:nth-child(3) { flex:0 0 9%; max-width:9%; }
.p_wrap .top .row .col:nth-child(4) { flex:0 0 7%; max-width:7%; }
.p_wrap .top .row .col:nth-child(5) { flex:0 0 9%; max-width:9%; }
.p_wrap .top .row .col:nth-child(6) { flex:0 0 10%; max-width:10%; }
.p_wrap .top .row .col:nth-child(7) { flex:0 0 7%; max-width:7%; }
.p_wrap .top .row .col:nth-child(8) { flex:0 0 8%; max-width:8%; }
.p_wrap .top .row .col:nth-child(9) { flex:0 0 8%; max-width:8%; }
.p_wrap .box .goods .gd_con .row .col:nth-child(7) { border-right-width:1px; }
</style>
