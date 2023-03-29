<template>
<div class="p_wrap">
    <h3 class="p_tit row">
        <b-col>주문 상세</b-col>
        <b-col><b-button :to="{name: 'adm_order_index'}" class="white" size="sm">목록으로 돌아가기</b-button></b-col>
    </h3>
    
    <b-container fluid class="top">
        <b-row>
            <b-col>No.</b-col>
            <b-col>주문번호</b-col>
            <b-col>주문날짜</b-col>
            <b-col>주문자</b-col>
            <b-col>연락처</b-col>
            <b-col>이메일</b-col>
            <b-col>담당</b-col>
            <b-col>영업장부</b-col>
            <b-col>주문서</b-col>
            <b-col>문서받기</b-col>
            <b-col>처리상태</b-col>
        </b-row>
        <b-row>
            <b-col>{{ od.od_id }}.</b-col>
            <b-col>{{ od.od_no }}</b-col>
            <b-col>{{ od.created_at | formatDate_YYYY_MM_DD }}</b-col>
            <b-link :to="{name: 'adm_user_edit', params: { id:od.created_id }}" class="col">
                {{ od.od_orderer }}
            </b-link>
            <b-col>{{ od.od_orderer_hp }}</b-col>
            <b-col>{{ od.od_orderer_email }}</b-col>
            <b-col>
                <b-button v-if="od.od_mng < 1" @click="update('od_mng')" class="white">담당</b-button>
                <template v-else>{{od.mng.name}}</template>
            </b-col>
            <b-col>
                <b-button v-if="od.od_has_ledger == 'N'" class="white" @click="ledger">등록</b-button>
                <template v-else>등록됨</template>
            </b-col>
            <b-col>
                <b-button class="white" @click="print">인쇄</b-button>
            </b-col>
            <b-col>
                <b-input-group v-if="od.od_mng">
                    <b-form-select class="custom-select" v-model="document_type">
                        <b-form-select-option value="est_e">견적서 EXCEL</b-form-select-option>
                        <b-form-select-option value="est_p">견적서 PDF</b-form-select-option>
                        <b-form-select-option value="tra_e">거래명세서 EXCEL</b-form-select-option>
                        <b-form-select-option value="tra_p">거래명세서 PDF</b-form-select-option>
                        <b-form-select-option value="send_tra_p">거래명세서 발송 PDF</b-form-select-option>
                    </b-form-select>
                    <b-input-group-append><b-button @click="document_action" class="b_gray">받기</b-button></b-input-group-append>
                </b-input-group>
                <template v-else>담당 등록 후...</template>
            </b-col>
            <b-col>
                <b-input-group>
                    <b-form-select v-model="od.od_step">
                        <b-form-select-option :value="null" disabled>◖처리 상태◗</b-form-select-option>
                        <b-form-select-option v-for="(v, k) in od.order_config.step" :key="k" :value="k">{{v.name}}</b-form-select-option>
                    </b-form-select>
                    <b-input-group-append><b-button @click="update('od_step')" class="b_gray">변경</b-button></b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </b-container>
    
    <div id="print_area">    
        <div class="goods box">
            <h5>
                주문 상품
                <b-button @click="update('odm_ea')" class="teal">주문 상품 정보 수정</b-button>
            </h5>
            <b-container v-for="(pa, pa_i) in od.order_purchase_at" :key="`pa_${pa_i}`">
                <h5>
                    <b-form-checkbox class="myCheck allCheck" v-model="pa.dlvy_all_chk" :indeterminate="pa.indeterminate" @change="toggleAll(pa)" />
                    <template v-if="pa.odpa_pa_id">{{pa.odpa_pa_name}} <b>직배송 상품</b></template>
                    <template v-else>4SCIENCE</template>
                </h5>
                <b-row>
                    <b-col>
                        <b-row v-for="(odm, odm_i) in pa.order_model" :key="`gd_${odm_i}`" :class="{model: odm.odm_type=='MODEL', option: odm.odm_type=='OPTION'}">
                            <b-col class="chk">
                                <b-form-checkbox class="myCheck"
                                    v-if="odm.odm_type=='MODEL'" 
                                    v-model="odm.dlvy_chk" 
                                    value="Y" 
                                    unchecked-value="N" 
                                    @change="changeSon(pa)" 
                                />
                            </b-col>
                            <b-col class="gd_img" v-if="odm.odm_type=='MODEL' && odm.odm_gd_id>0" @click="openWinPop(`/admin/shop/goods/${odm.odm_gd_id}/edit`, 1700, 900)">
                                <img :src="odm.img_src" />
                            </b-col>
                            <b-col class="gd_img" v-else-if="odm.odm_type=='MODEL'"><img :src="odm.img_src" /></b-col>
                            
                            <b-col v-if="odm.odm_type=='MODEL'" class="gd_info">
                                <div>
                                    <b>◖{{odm.odm_gd_name}}◗</b>
                                    <p>
                                        {{odm.odm_gm_name}} <br />
                                        {{odm.odm_gm_code}} <b class="divider">/</b> 
                                        {{odm.odm_gm_catno}} <b class="divider">/</b> 
                                        {{odm.odm_mk_name}} <b class="divider">/</b> 
                                        {{odm.odm_gm_unit}}
                                    </p>
                                </div>
                            </b-col>
                            <b-col class="spec"><b v-if="odm.odm_type=='OPTION'">{{odm.odm_gm_name}}: </b>{{odm.odm_gm_spec}}</b-col>
                            <b-col class="price">
                                <p>
                                    {{odm.odm_price_add_vat | comma}} 원
                                    <font-awesome-icon icon="times" />
                                    <!-- 인풋테그로 했었는데 인쇄시 인풋테그가 나와서 팝업으로 변경 -->
                                    <span class="ea">
                                        <div class="cube_box">
                                            <div class="cube" :class="{show_right: odm.show_right}">
                                                <div class="piece front">{{odm.odm_ea | comma}}</div>
                                                <div class="piece right"><EaInput v-model="pa.order_model[odm_i]" /></div>
                                            </div>
                                        </div>
                                    </span> 개
                                    <font-awesome-icon icon="equals" />
                                    <b class="multi">{{odm.odm_price_add_vat*odm.odm_ea | comma}} 원</b>
                                </p>
                            </b-col>
                            <b-col class="dlvy_info">
                                <template v-if="odm.odm_type=='MODEL'">                                    
                                    <b-badge v-if="odm.order_dlvy_info.oddi_receive_date" variant="light">수취완료</b-badge>
                                    <b-badge v-else-if="odm.order_dlvy_info.oddi_arrival_date" variant="success">배송완료</b-badge>
                                    <b-button v-else-if="odm.order_dlvy_info.oddi_dlvy_num" size="sm" variant="info"
                                        :href="getHref(odm.order_dlvy_info.oddi_dlvy_com, odm.order_dlvy_info.oddi_dlvy_num)"
                                    >
                                        배송추적
                                    </b-button>
                                    <b-button v-else size="sm" @click="writeDlvyInfo(odm)">배송정보</b-button>
                                </template>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <b-row>
                            <b-col class="dlvy_p">
                                <p>
                                    <b-badge v-if="pa.odpa_pa_type == 'AIR'">항공 운임료</b-badge>
                                    <b-badge v-else>배송비</b-badge>
                                    <br />
                                    {{pa.odpa_dlvy_p_add_vat | comma}} 원
                                
                                    <template v-if="pa.odpa_pa_type !== 'AIR'">
                                        <br />
                                        <b-form-checkbox v-model="pa.dlvy_all_in" @change="DlvyAllIn(pa.odpa_id)" button button-variant="light" size="sm">
                                            배송비 포함
                                        </b-form-checkbox>
                                    </template>
                                </p>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <b-button @click="writeDlvyInfo('bundle')">배송정보</b-button>

            </b-container>
        </div>

        <b-card class="price">
            <div class="tit">총 금액</div>
            <b-container>
                <b-row>
                    <b-col offset="6">
                        <p>상품 : <b>{{od.od_gd_price | comma}} 원</b></p>
                        <p>부가세 : <b>{{od.od_surtax | comma}} 원</b></p>
                        <p>배송비 : <b>{{od.od_dlvy_price | comma}} 원</b></p>
                        <p v-if="od.od_air_price">항공운임료 : <b>{{od.od_air_price | comma}} 원</b></p>
                        <p>총금액 : <b>{{od.od_all_price | comma}} 원</b></p>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card class="receiver adform">
            <div class="tit">
                배송, 결제 정보
                <b-button @click="update('addr')">상품 수령 정보 수정</b-button>
            </div>
            <b-container>
                <b-row>
                    <b-col>
                        <span class="form_icon">
                            <b-icon-person-fill v-b-tooltip="'수령인 이름 복사'" @click="copyToClipboard(od.od_receiver)" />
                            <div class="cube_box">
                                <div class="cube" :class="{show_right: focusInfo.od_receiver}">
                                    <div class="piece front">
                                        {{ od.od_receiver }}
                                    </div>
                                    <div class="piece right">
                                        <b-form-input v-model="od.od_receiver" @focus="focusInfo.od_receiver = true" @blur="focusInfo.od_receiver = false" size="sm" />
                                    </div>
                                </div>
                            </div>
                        </span>
                        
                        <span class="form_icon">
                            <b-icon-telephone-fill v-b-tooltip="'수령인 번호 복사'" @click="copyToClipboard(od.od_receiver_hp)" />
                            <div class="cube_box">
                                <div class="cube" :class="{show_right: focusInfo.od_receiver_hp}">
                                    <div class="piece front">
                                        {{ od.od_receiver_hp }}
                                    </div>
                                    <div class="piece right">
                                        <b-form-input v-model="od.od_receiver_hp" @focus="focusInfo.od_receiver_hp = true" @blur="focusInfo.od_receiver_hp = false" size="sm" />
                                    </div>
                                </div>
                            </div>
                        </span>

                        <span class="form_icon">
                            <font-awesome-icon icon="map-marked-alt" v-b-tooltip="'수령인 주소 복사'" @click="copyToClipboard(od.od_addr1)" />
                            <div class="cube_box">
                                <div class="cube">
                                    <div class="piece front">
                                        {{ od.od_zip }}<b>,</b> {{ od.od_addr1 }}<b>,</b> {{ od.od_addr2 }}
                                    </div>
                                    <div class="piece right">
                                        <b-button variant="dark" @click="isModalViewed = !isModalViewed, modalType = 'postCode'">주소검색</b-button>
                                    </div>
                                </div>
                            </div>
                        </span>

                        <p class="mt-4" v-b-tooltip="'배송시 요청사항'">
                            <font-awesome-icon icon="info" class="mr-4" /> <span>{{ od.od_memo }}</span>
                        </p>
                    </b-col>
                </b-row>
                <hr />
                <b-row v-if="od.order_extra_info">
                    <b-col>
                        <b-badge>결제수단</b-badge>
                        <span v-if="od.od_pay_method == 'C'">
                            <b-badge variant="light">카드</b-badge>
                        </span>
                        <span v-else-if="od.od_pay_method == 'B'">
                            <b-badge variant="light">계좌이체</b-badge>
                            <b-badge variant="light" v-if="od.order_extra_info.oex_bank == 'K'">국민은행</b-badge>
                            <b-badge variant="light" v-if="od.order_extra_info.oex_bank == 'W'">우리은행</b-badge>
                            <b-badge variant="light">{{od.order_extra_info.oex_depositor}}</b-badge>
                            <b-badge variant="light">{{payPlanDisplay}} 결제</b-badge>
                        </span>
                        <span v-else-if="od.od_pay_method == 'P'">
                            <b-badge variant="light">PSYS</b-badge>
                            <b-badge variant="light">{{od.order_extra_info.oex_depositor}}</b-badge>
                            <b-badge variant="light">{{payPlanDisplay}} 결제</b-badge>
                        </span>
                        <span v-else-if="od.od_pay_method == 'R'">
                            <b-badge variant="light">원격결제</b-badge>
                            <b-badge variant="light">{{od.order_extra_info.oex_mng}}</b-badge>
                            <b-badge variant="light">{{od.order_extra_info.oex_num}}</b-badge>
                            <b-badge variant="light">{{payPlanDisplay}}</b-badge>
                        </span>
                        <span v-else-if="od.od_pay_method == 'E'">에스크로</span>

                        <b-badge >구매환경</b-badge>                                                       
                        <span v-if="od.od_sale_env == 'P'">웹</span>
                        <span v-else-if="od.od_sale_env == 'M'">모바일</span>

                        <b-badge>요청서류</b-badge>
                        <span>
                            <template v-if="!od.order_extra_info"><b-badge variant="warning">없음</b-badge></template>
                            <template v-else>
                                <b-badge variant="light" v-if="od.order_extra_info.oex_req_est == 'Y'">견적서</b-badge>
                                <b-badge variant="light" v-if="od.order_extra_info.oex_req_tran == 'Y'">거래명세서</b-badge>
                                <b-badge variant="light" v-if="od.order_extra_info.oex_req_biz == 'Y'">사업자 등록증 사본</b-badge>
                                <b-badge variant="light" v-if="od.order_extra_info.oex_req_bank == 'Y'">통장사본</b-badge>
                                <b-badge variant="warning" v-if="od.order_extra_info.oex_req_est == 'N' && od.order_extra_info.oex_req_tran == 'N' && od.order_extra_info.oex_req_biz == 'N' && od.order_extra_info.oex_req_bank == 'N'">없음</b-badge>
                            </template>
                            <b-alert show variant="success" class="mt-3">
                                <h4 class="alert-heading">첨부서류 메모</h4>
                                <p>{{od.order_extra_info.oex_memo}}</p>
                            </b-alert>
                        </span>
                    </b-col>
                </b-row>
                <hr />
                <b-row v-if="(od.od_pay_method == 'B' || od.od_pay_method == 'E') && od.order_extra_info">
                    <b-col>
                        <b-badge>지출증빙</b-badge>
                        <span v-if="od.order_extra_info.oex_type == 'IV'">
                            <b-alert show variant="success">
                                <h5 class="alert-heading">세금계산서</h5>

                                <template v-if="od.file_info">
                                    <template v-if="checkImage(od.file_info.fi_ext)">
                                        <b-button @click="isModalViewed = !isModalViewed, modalType = 'blView'">사업자 등록증 보기</b-button>
                                    </template>
                                    <template v-else>
                                        <b-button @click="fileDown(od.file_info.fi_original, od.file_info.path)">사업자 등록증 다운로드</b-button>
                                    </template>
                                </template>
                                <template v-else>
                                    <b-badge variant="light">법인명: {{od.order_extra_info.oex_biz_name}}</b-badge><b>,</b>
                                    <b-badge variant="light">등록번호: {{od.order_extra_info.oex_biz_num}}</b-badge><b>,</b>
                                    <b-badge variant="light">업태: {{od.order_extra_info.oex_biz_type}}</b-badge><b>,</b>
                                    <b-badge variant="light">종목: {{od.order_extra_info.oex_biz_item}}</b-badge><b>,</b>
                                    <b-badge variant="light">대표자: {{od.order_extra_info.oex_ceo}}</b-badge><b>,</b>
                                    <b-badge variant="light">소재지: {{od.order_extra_info.oex_addr}}</b-badge><b>,</b>
                                </template>
                                <b-badge variant="light">담당자: {{od.order_extra_info.oex_mng}}</b-badge><b>,</b>
                                <b-badge variant="light">담당이메일: {{od.order_extra_info.oex_email}}</b-badge><b>,</b>
                                <b-badge variant="light">담당HP: {{od.order_extra_info.oex_num}}</b-badge>                                
                                <b-badge variant="light" class="long_type">요청사항: {{od.order_extra_info.oex_requirement}}</b-badge>
                            </b-alert>
                        </span>
                        <span v-else-if="od.order_extra_info.oex_type == 'IVNO'">세금계산서 입력안함</span>
                        <span v-else-if="od.order_extra_info.oex_type == 'NO'">없음</span>
                        <span v-else>
                            <b-alert show variant="info">
                                <h5 class="alert-heading" v-if="od.order_extra_info.oex_type == 'HP'">휴대폰번호</h5>
                                <h5 class="alert-heading" v-else-if="od.order_extra_info.oex_type == 'IN'">주민등록번호</h5>
                                <h5 class="alert-heading" v-else-if="od.order_extra_info.oex_type == 'CN'">카드번호</h5>
                                <h5 class="alert-heading" v-else-if="od.order_extra_info.oex_type == 'BN'">사업자번호</h5>
                                {{od.order_extra_info.oex_num}}
                            </b-alert>
                        </span>
                    </b-col>
                </b-row>

            </b-container>
        </b-card>
    </div>
    <transition name="modal">
        <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="600">
            <img v-if="modalType == 'blView'" :src="od.file_info.path" @click="fileDown(od.file_info.fi_original, od.file_info.path)" style="max-width: 100%; height: auto;"/>

            <VueDaumPostcode v-else-if="modalType == 'postCode'" class="shadow mt-3" @complete="onPostcodeSlt" :animation="true" >
                <template #loading>
                    <b-spinner variant="success" label="Spinning" />
                </template>
            </VueDaumPostcode>

            <b-card v-else-if="modalType == 'postDetail'" class="adform layerModal">
                <b-container>
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
            </b-card>

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

            <b-card v-else-if="modalType == 'dlvyInfo'" class="adform layerModal">
                <b-container>
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
            </b-card>
        </Modal>
    </transition>
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
        async fileDown(name, src){
            try {
                const res = await ax.get(src, { responseType: 'blob' });
                let fileUrl = window.URL.createObjectURL(new Blob([res.data]));
                let fileLink = document.createElement('a');
                fileLink.href = fileUrl;

                fileLink.setAttribute('download', name);
                document.body.appendChild(fileLink);

                fileLink.click();
                // console.log(res.data);
            } catch (e) {
                Notify.consolePrint(e);
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
        DlvyAllIn (odpa_id) {
            for (let opa of this.od.order_purchase_at) {
                if (opa.odpa_id !== odpa_id)
                    opa.dlvy_all_in = false;
            }
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

<style lang="css">
@import '/css/adm_shop_order_edit.css';

.p_wrap .row .col { padding:0 }
.p_wrap .p_tit .col:last-child { text-align:right; }
.p_wrap .p_tit .col:last-child .btn { border-color:#000; font-weight:600; }
.p_wrap #print_area .box { border:5px solid #EBEBEB; padding:2rem; }

/*  =====================================================================  */

.p_wrap .top {  }
.p_wrap .top .row:first-child { background-color:#4EB8C8; color:#FFF; border-radius:.4rem .4rem 0 0; font-size:.95rem; }
.p_wrap .top .row:first-child .col { padding:.6rem 0 .25rem 0; }
.p_wrap .top .row:last-child { border:1px solid #4EB8C8; border-radius:0 0 .4rem .4rem; }
.p_wrap .top .row:last-child .col { padding:.3rem .75rem; line-height:2rem; }
.p_wrap .top .row:last-child .col .btn { border-color:#8A8A8A; padding:.2rem .75rem; }
.p_wrap .top .row:last-child .col .custom-select { height: calc(1.95rem + 2px); padding: 0.23rem 1.75rem 0.23rem 0.75rem; background:#fff url(https://fourscience.s3.ap-northeast-2.amazonaws.com/common/arrow_dn.gif) no-repeat right 8px center; }
.p_wrap .top .row:first-child .col:nth-child(6) { border-right:1px solid #FFF;  }
.p_wrap .top .row:last-child .col:nth-child(6) { border-right:1px solid #4EB8C8;  }
.p_wrap .top .row .col { text-align:center; }
.p_wrap .top .row .col:nth-child(1) { flex:0 0 6%; max-width:6%; }
.p_wrap .top .row .col:nth-child(2) { flex:0 0 8%; max-width:8%; }
.p_wrap .top .row .col:nth-child(3) { flex:0 0 9%; max-width:9%; }
.p_wrap .top .row .col:nth-child(4) { flex:0 0 7%; max-width:7%; }
.p_wrap .top .row .col:nth-child(5) { flex:0 0 9%; max-width:9%; }
.p_wrap .top .row .col:nth-child(6) { flex:0 0 10%; max-width:10%; }
.p_wrap .top .row .col:nth-child(7) { flex:0 0 7%; max-width:7%; }
.p_wrap .top .row .col:nth-child(8) { flex:0 0 8%; max-width:8%; }
.p_wrap .top .row .col:nth-child(9) { flex:0 0 8%; max-width:8%; }



.tit button { display:block; float:right; }

.container { max-width:100%; }
.container .row .col .long_type { white-space: pre-wrap; word-wrap: break-word; text-align:left; margin-top:5px; }
.container .row .col .cube_box { display:inline-block; }
.container .row .col .cube_box, 
.container .row .col .cube_box * { box-sizing: border-box; }
.container .row .col .cube_box { /*perspective:400px;*/ margin:auto; }
.container .row .col .cube_box .cube { position: relative; transform-style: preserve-3d; transform: translateZ(-50px); transition: transform .2s; }
.container .row .col .cube_box .cube .piece { position:absolute; }
.container .row .col .cube_box,
.container .row .col .cube_box .cube,
.container .row .col .cube_box .cube .piece { width:100%; max-width:40px; height:20px; }
.container .row .col .cube_box .cube .piece.front  { transform: rotateY(  0deg) translateZ(20px); line-height:2; }
.container .row .col .cube_box .cube .piece.right  { transform: rotateY( 90deg) translateZ(20px); display:block; }
.container .row .col .cube.show_front  { transform: translateZ(-50px) rotateY(   0deg); }
.container .row .col .cube.show_right,
.container .row .col .cube_box .cube:hover  { transform: translateZ(-50px) rotateY( -90deg); }

.goods .container h5 .myCheck { display:inline; }
.goods .container .myCheck { min-height:2rem; padding-left:1.7rem; min-width:2.1rem; display:inline; }
.goods .container .myCheck .custom-control-label::before, 
.goods .container .myCheck .custom-control-label::after { width:2rem; height:2rem; }
.goods .container .row .col .row .dlvy_p p .btn.active { color:#fff; background-color:#1d2124; border-color:#171a1d; }
.goods .container .row .col .row .chk { display:flex; }


.row .col .form_icon svg { cursor:pointer; }
.receiver .container .row .col span:nth-child(1) .cube_box,
.receiver .container .row .col span:nth-child(1) .cube_box .cube,
.receiver .container .row .col span:nth-child(1) .cube_box .cube .piece { max-width:150px; }
.receiver .container .row .col span:nth-child(2) .cube_box,
.receiver .container .row .col span:nth-child(2) .cube_box .cube,
.receiver .container .row .col span:nth-child(2) .cube_box .cube .piece { max-width:150px; }
.receiver .container .row .col span:nth-child(3) .cube_box,
.receiver .container .row .col span:nth-child(3) .cube_box .cube,
.receiver .container .row .col span:nth-child(3) .cube_box .cube .piece { max-width:500px; }


.layerModal .row .ctrl { text-align:right; }

</style>
