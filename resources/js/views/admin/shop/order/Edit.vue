<template>
<div id="print_area">
    <div class="p_wrap">
        <h3 class="p_tit">
            주문 상세
            <b-form-select v-if="[39, 130].includes(user.id)" v-model="od.od_sale_env" @change="update('od_sale_env')"
                :style="{display:'none', width:'1px', height:'1px',lineHeight:1, padding:0, border:'1px solid #000', borderRadius:0}"
            >
                <b-form-select-option value="P">PC</b-form-select-option>
                <b-form-select-option value="M">MOBILE</b-form-select-option>
                <b-form-select-option value="A">APP</b-form-select-option>
            </b-form-select>
            <b-button :to="{name: 'adm_user_edit', params: { id:od.user.introducer.id }}" v-if="od.user.introducer" class="xm sky">소개자 - {{od.user.introducer.name}}</b-button>
        </h3>
        <div class="print_mng_nm" v-if="od.od_mng>0">{{od.mng.name}}</div>
        <div class="act_ctrl">
            <b-row>
                <b-col class="def_info">
                    <span>No.</span><b>{{od.od_id}}</b>
                    <span>주문번호</span> <b>{{ od.od_no }}</b>
                    <span>주문날짜</span> <b>{{ od.created_at | formatDate_MM_DD_HH:mm }}</b>
                    <span>주문환경</span> <b>{{ od.od_sale_env | sale_env}}</b>
                    <span>주문유형</span> <b v-if="order_config.type">{{ order_config.type[od.od_type]}}</b>
                </b-col>
                <b-col class="btn_area print_hide_flex">
                    <b-button v-if="od.od_er_id" @click="openWinPop(`/admin/shop/estimate/reply/${od.od_er_id}`)" class="plum sm print_hide_inline_block"><b-icon-box-arrow-up-right /> 견적서</b-button>
                    <b-button :to="{name: 'adm_order_index'}" class="white sm"><b-icon-list /><span class="sm_ib_h"> 목록</span></b-button>

                    <b-button v-if="od.od_mng < 1" @click="update('od_mng')" class="sky sm">담당</b-button>
                    <b-button v-else @click="isModalViewed = !isModalViewed, modalType = 'changeMng'" class="sky sm">{{od.mng.name}}</b-button>
                    

                    <!-- <b-button v-if="od.od_has_ledger == 'N'" class="d_gray sm" @click="ledger"><b-icon-box-arrow-up-right /> <span class="sm_ib_h">영업</span>장부</b-button>
                    <b-button v-else class="d_gray sm">장부등록됨</b-button> -->

                    <b-button class="gray sm" @click="print"><b-icon-printer /><span class="sm_ib_h"> 인쇄</span></b-button>

                    <b-dropdown v-if="od.od_mng" size="sm" variant="outline-dark">
                        <template #button-content>파일 <span class="sm_ib_h">다운</span></template>
                        <b-dropdown-item-button variant="success" @click="estimateExcel">견적서 <b-badge>EXCEL</b-badge></b-dropdown-item-button>
                        <b-dropdown-item-button variant="warning" @click="estimatePdf">견적서 <b-badge>PDF</b-badge></b-dropdown-item-button>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item-button variant="success" @click="transactionExcel">거래명세서 <b-badge>EXCEL</b-badge></b-dropdown-item-button>
                        <b-dropdown-item-button variant="warning" @click="transactionPdf">거래명세서 <b-badge>PDF</b-badge></b-dropdown-item-button>
                        <b-dropdown-item-button variant="danger" @click="sendTran">거래명세서 발송 <b-badge>PDF</b-badge></b-dropdown-item-button>
                        <b-dropdown-item-button variant="primary" @click="shippingListExcel">물품출고내역서 <b-badge>EXCEL</b-badge></b-dropdown-item-button>
                    </b-dropdown>
                    <b-button v-else class="gray sm">담당 등록 후...</b-button>                    
                    
                    <b-input-group size="sm">
                        <b-form-select v-model="od.od_step" class="sm_ib_h">
                            <b-form-select-option :value="null" disabled>◖처리 상태◗</b-form-select-option>
                            <b-form-select-option v-for="(v, k) in order_config.step" :key="k" :value="k">{{v.name}}</b-form-select-option>
                        </b-form-select>
                        <b-form-select v-model="od.od_step" class="sm_ib_v">
                            <b-form-select-option :value="null" disabled>상태</b-form-select-option>
                            <b-form-select-option v-for="(v, k) in order_config.step" :key="k" :value="k">{{v.sm_name}}</b-form-select-option>
                        </b-form-select>
                        <b-input-group-append><b-button @click="update('od_step')" class="d_gray sm">변경</b-button></b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
        </div>
        
        <div class="box orderer">
            <b-row tag="h5"><b-col tag="b">주문자정보</b-col></b-row>
            <b-row class="label_st">
                <b-col class="lb">주문자</b-col>
                <b-col class="dt wd1_3">
                    <b-link v-if="od.created_id" :to="{name: 'adm_user_edit', params: { id:od.created_id }}">{{ od.od_orderer }} - <span class="u_group">{{ od.user.group | group }}</span></b-link>
                    <template v-else>{{ od.od_orderer }}</template>
                </b-col>
                <b-col class="lb">전화번호</b-col><b-col class="dt wd1_3">{{ od.od_orderer_hp }}</b-col>
                <b-col class="lb">이메일</b-col><b-col class="dt wd1_3">{{ od.od_orderer_email }}</b-col>
                <b-col class="lb">직장/학교</b-col><b-col class="dt wd1_3">{{ od.od_company }}</b-col>
                <b-col class="lb">부서/학과/연구실</b-col><b-col class="dt wd54">{{ od.od_part }}</b-col>
            </b-row>
        </div>

        <div class="box">
            <b-row tag="h5">
                <b-col tag="b">주문 상품</b-col>
                <b-col class="text-right print_hide">
                    <b-button @click="toEstimate" class="sm green" v-if="od.created_id">모든상품 임의견적 복사</b-button>
                    <b-button @click="update('odm_ea')" class="sm teal">상품정보 수정</b-button>
                </b-col>
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
                    <b-row v-for="(odm, odm_i) in pa.order_model" :key="`gd_${odm_i}`" :class="{model: odm.odm_type=='MODEL', option: odm.odm_type=='OPTION', today:odm.today_pick_up}">
                        <b-col class="align print_hide">
                            <b-form-checkbox class="myCheck" v-if="odm.odm_type=='MODEL'" value="Y" unchecked-value="N" v-model="odm.dlvy_chk" @change="changeSon(pa)" />
                            <div class="signboard">
                                <b v-if="odm.today_pick_up" class="neonText">당일</b>
                            </div>
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
                                <p class="gray_c hovertobtn">
                                    제품명: {{odm.odm_gm_name}} / 모델명: {{odm.odm_gm_code}}  
                                    <font-awesome-icon icon="copy" @click="copyToClipboard(`제품명: ${odm.odm_gm_name} / 모델명: ${odm.odm_gm_code}`)" class="btn_copy" />
                                    <br />
                                    Cat.No.: {{odm.odm_gm_catno}} / 판매단위: {{odm.odm_gm_unit}}   <br />
                                    사양: <span v-html="nl2br(odm.odm_gm_spec)" />
                                </p>
                            </template>
                            <template v-else>{{odm.odm_gm_name}}: {{odm.odm_gm_spec}}</template>
                        </b-col>
                        <b-col class="align gray_c">{{odm.odm_mk_name}}</b-col>
                        <b-col class="align end text-right">{{odm.odm_price | comma | won}}</b-col>
                        <b-col class="align">
                            <div class="cube_box">
                                <div class="cube" :class="{show_bottom: odm.show_bottom}">
                                    <div class="piece front">{{odm.odm_ea | comma}}</div>
                                    <div class="piece bottom"><EaInput v-model="pa.order_model[odm_i]" /></div>
                                </div>
                            </div>
                        </b-col>
                        <b-col class="align">
                            <b class="sum">
                                {{odm.odm_price*odm.odm_ea | comma | won}}
                                <b-form-checkbox v-if="pa.odpa_pa_type !== 'AIR' && odm.odm_type === 'MODEL'" v-model="odm.dlvy_all_in" @change="DlvyAllIn(odm.odm_id)" button class="print_hide">
                                    배송비 포함
                                </b-form-checkbox>
                            </b>
                        </b-col>
                        <b-col class="align print_hide_flex" :style="{flexWrap:'wrap'}">
                            <template v-if="odm.odm_type=='MODEL'">
                                <b-badge v-if="(!isEmpty(odm.order_dlvy_info.oddi_receive_date) && odm.order_dlvy_info.oddi_receive_date !='0000-00-00')" class="gray">수취완료</b-badge>
                                <b-badge v-else-if="(!isEmpty(odm.order_dlvy_info.oddi_arrival_date) && odm.order_dlvy_info.oddi_arrival_date!='0000-00-00')" class="green">배송완료</b-badge>
                                <b-link v-if="!isEmpty(odm.order_dlvy_info.oddi_dlvy_num)" :href="getHref(odm.order_dlvy_info.oddi_dlvy_com, odm.order_dlvy_info.oddi_dlvy_num)" class="teal sm">
                                    {{odm.order_dlvy_info.oddi_dlvy_com}}, {{odm.order_dlvy_info.oddi_dlvy_num}}
                                </b-link>
                                <br />
                                <b-button class="white" @click="writeDlvyInfo(odm)">배송정보</b-button>
                            </template>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col class="dlvy_fare print_hide_flex gray_c">
                    <div>
                        <p v-if="pa.odpa_pa_type == 'AIR'">항공 운임료</p>
                        <p v-else>배송비</p>
                        {{pa.odpa_dlvy_p_add_vat | comma | won}}
                    </div>
                </b-col>
            </b-row>

            <b-row class="action print_hide sm_ib_h">
                <b-col>선택한 상품의 <b-button @click="writeDlvyInfo('bundle')" class="teal ml-2">배송정보 일괄 등록</b-button></b-col>
            </b-row>
            
            <div class="top_border" />
            <div class="sum_up">
                <b-row class="total">
                    <b-col>상품금액</b-col>
                    <b-col><b>{{(od.od_gd_price+od.od_surtax) | comma | won}}</b></b-col>
                    <b-col>배송료</b-col>
                    <b-col><b>{{od.od_dlvy_price+od.od_air_price | comma | won}}</b></b-col>
                    <b-col>주문금액</b-col>
                    <b-col><b>{{od.od_all_price | comma | won}}</b></b-col>
                </b-row>
                <b-row class="total_sub sm_ib_h">
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

        <div class="box od_addr">
            <b-row tag="h5"><b-col tag="b">배송정보</b-col><b-col class="text-right"><b-button @click="update('addr')" class="teal print_hide_inline_block">배송정보 수정</b-button></b-col></b-row>

            <b-row class="label_st">
                <b-col class="lb">수취인</b-col>
                <b-col class="dt wd1_2 edit_field">
                    <b-form-input v-if="focusInfo.od_receiver" v-model="od.od_receiver" @blur.native="focusInfo.od_receiver = false;" v-focus="" />
                    <div v-else @click="focusInfo.od_receiver = true;" class="hovertobtn">
                        {{od.od_receiver}}
                        <font-awesome-icon icon="copy" @click="copyToClipboard(od.od_receiver)" class="btn_copy" />
                    </div>
                    <span v-if="od.od_receiver != od.od_orderer" class="warning">* 주문자와 수취인이 다릅니다.</span>
                </b-col>
                <b-col class="lb">전화번호</b-col>
                <b-col class="dt wd1_2 edit_field">
                    <b-form-input v-if="focusInfo.od_receiver_hp" v-model="od.od_receiver_hp" @blur.native="focusInfo.od_receiver_hp = false;" v-focus="" />
                    <div v-else @click="focusInfo.od_receiver_hp = true;" class="hovertobtn">
                        {{od.od_receiver_hp}}
                        <font-awesome-icon icon="copy" @click="copyToClipboard(od.od_receiver_hp)" class="btn_copy" />
                    </div>
                </b-col>
                <b-col class="lb addr_btn" @click="isModalViewed = !isModalViewed, modalType = 'postCode'"><span>배송주소</span><b>주소검색</b></b-col>
                <b-col class="dt wd1_1 hovertobtn address">
                    {{ od.od_zip }}<b>,</b> {{ od.od_addr1 }}<b>,</b> {{ od.od_addr2 }}
                    <font-awesome-icon icon="copy" @click="copyToClipboard(`${od.od_addr1}, ${od.od_addr2}`)" class="btn_copy" />
                    <div class="addr_list">
                        <ul>
                            <li v-for="(ua, i) in od.user.user_addr" :key="i" @click="change_dlvy_info(i)">{{ua.ua_addr1}} {{ua.ua_addr2}} ( {{ua.ua_hp}} )</li>
                        </ul>
                    </div>
                </b-col>
                <b-col class="lb">배송시 요구사항</b-col>
                <b-col class="dt wd1_1 hovertobtn">
                    {{od.od_memo}}
                    <font-awesome-icon icon="copy" @click="copyToClipboard(od.od_memo)" class="btn_copy" />
                </b-col>
            </b-row>


            <b-row tag="h5">
                <b-col tag="b">결제정보</b-col>
                <b-col class="text-right"><b-button @click="update('pay')" class="teal print_hide_inline_block">결제정보 수정</b-button></b-col>
            </b-row>

            <b-row class="label_st">
                <template v-if="['B', 'L', 'S'].includes(od.od_pay_method)">
                    <b-col class="lb">결제금액</b-col>
                    <b-col class="dt wd1_2">{{od.od_all_price | comma | won}}</b-col>
                    <b-col class="lb">결제예정일</b-col>
                    <b-col class="dt wd1_2">{{payPlanDisplay}}</b-col>
                    <b-col class="lb">결제수단</b-col>
                    <b-col class="dt wd1_2">
                        <span class="print_show_inline">{{order_config.pay_method[od.od_pay_method]}}</span>
                        <b-form-select v-model="od.od_pay_method" size="sm" :style="{ maxWidth:'100px' }" class="print_hide_inline_block">
                            <b-form-select-option v-for="(v, k) in order_config.pay_method" :key="k" :value="k">{{ v }}</b-form-select-option>
                        </b-form-select>
                    </b-col>
                    <b-col class="lb">입금계좌</b-col>
                    <b-col class="dt wd1_2">
                        <span v-if="od.order_extra_info.oex_bank=='K'">국민은행</span>
                        <span v-else-if="od.order_extra_info.oex_bank=='W'">우리은행</span>
                    </b-col>
                    <b-col class="lb">입금자</b-col>
                    <b-col class="dt wd1_1">{{od.order_extra_info.oex_depositor}}</b-col>
                </template>

                <template v-else-if="od.od_pay_method == 'R'">
                    <b-col class="lb">결제금액</b-col>
                    <b-col class="dt wd1_2">{{od.od_all_price | comma | won}}</b-col>
                    <b-col class="lb">결제예정일</b-col>
                    <b-col class="dt wd1_2">{{payPlanDisplay}}</b-col>
                    <b-col class="lb">결제수단</b-col>
                    <b-col class="dt wd1_1">
                        <span class="print_show_inline">{{order_config.pay_method[od.od_pay_method]}}</span>
                        <b-form-select v-model="od.od_pay_method" size="sm" :style="{ maxWidth:'100px' }" class="print_hide_inline_block">
                            <b-form-select-option v-for="(v, k) in order_config.pay_method" :key="k" :value="k">{{ v }}</b-form-select-option>
                        </b-form-select>
                    </b-col>
                    <b-col class="lb">담당자</b-col>
                    <b-col class="dt wd1_3">{{od.order_extra_info.oex_mng}}</b-col>
                    <b-col class="lb">연락처</b-col>
                    <b-col class="dt wd1_3">{{od.order_extra_info.oex_num}}</b-col>
                    <b-col class="lb">이메일</b-col>
                    <b-col class="dt wd1_3">{{od.order_extra_info.oex_email}}</b-col>
                </template>

                <template v-else>
                    <b-col class="lb">결제금액</b-col>
                    <b-col class="dt wd1_2">
                        <template v-if="od.order_pg">{{od.order_pg.pg_price | comma | won}}</template>
                    </b-col>
                    <b-col class="lb">결제예정일</b-col>
                    <b-col class="dt wd1_2">{{payPlanDisplay}}</b-col>
                    <b-col class="lb">결제수단</b-col>
                    <b-col class="dt wd1_2">
                        <span class="print_show_inline">{{order_config.pay_method[od.od_pay_method]}}</span>
                        <b-form-select v-model="od.od_pay_method" size="sm" :style="{ maxWidth:'100px' }" class="print_hide_inline_block">
                            <b-form-select-option v-for="(v, k) in order_config.pay_method" :key="k" :value="k">{{ v }}</b-form-select-option>
                        </b-form-select>
                        <b-button v-if="od.order_pg && od.order_pg.pg_id" class="sm teal print_hide_inline_block ml-3" @click="getReceipt">매출전표</b-button>
                    </b-col>
                    <b-col class="lb">카드종류</b-col>
                    <b-col class="dt wd1_2">{{od.order_pg.pg_card_com}}</b-col>
                    <b-col class="lb">결과메시지</b-col>
                    <b-col class="dt wd1_2">{{od.order_pg.pg_msg}}</b-col>
                    <b-col class="lb">결제자</b-col>
                    <b-col class="dt wd1_2">{{od.order_pg.pg_buyer_nm}}</b-col>
                </template>
            </b-row>

            <b-row tag="h5">
                <b-col tag="b">요청서류</b-col>
                <b-col class="text-right"><b-button @click="update('adm_memo')" class="teal print_hide_inline_block">관리자 메모 수정</b-button></b-col>
            </b-row>
            <b-row class="label_st">
                <b-col class="lb">요청서류</b-col>
                <b-col class="dt wd1_1">{{reqDocumentDisplay}}</b-col>
                <b-col class="lb">첨부서류 메모</b-col>
                <b-col class="dt wd1_1"><p v-html="od.order_extra_info.oex_memo" /></b-col>

                <template v-if="(od.od_pay_method == 'B' || od.od_pay_method == 'L')">
                    <template v-if="od.order_extra_info.oex_type == 'IV'">
                        <template v-if="od.file_info">
                            <b-col class="lb">사업자등록증</b-col>
                            <b-col class="dt wd1_1">
                                <b-button v-if="checkImage(od.file_info.fi_ext)" @click="isModalViewed = !isModalViewed, modalType = 'blView'" class="print_hide">{{od.file_info.fi_original}} <b-icon-eye-fill /></b-button>
                                <b-button v-else @click="fileDown(od.file_info.down_path, od.file_info.fi_original)" class="print_hide">{{od.file_info.fi_original}} <b-icon-download /></b-button>
                                <span class="print_show_inline">{{od.file_info.fi_original}}</span>
                            </b-col>
                        </template>
                        <template v-else>
                            <b-col class="lb">법인명</b-col><b-col class="dt wd1_3">{{od.order_extra_info.oex_biz_name}}</b-col>
                            <b-col class="lb">사업자등록번호</b-col><b-col class="dt wd1_3">{{od.order_extra_info.oex_biz_num}}</b-col>
                            <b-col class="lb">대표자</b-col><b-col class="dt wd1_3">{{od.order_extra_info.oex_ceo}}</b-col>
                            <b-col class="lb">주소</b-col><b-col class="dt wd1_3">{{od.order_extra_info.oex_addr}}</b-col>
                            <b-col class="lb">업태</b-col><b-col class="dt wd1_3">{{od.order_extra_info.oex_biz_type}}</b-col>
                            <b-col class="lb">업종</b-col><b-col class="dt wd1_3">{{od.order_extra_info.oex_biz_item}}</b-col>
                        </template>
                        <b-col class="lb">담당자 이름</b-col><b-col class="dt wd1_3">{{od.order_extra_info.oex_mng}}</b-col>
                        <b-col class="lb">담당자 메일</b-col><b-col class="dt wd1_3">{{od.order_extra_info.oex_email}}</b-col>
                        <b-col class="lb">담당자 번호</b-col><b-col class="dt wd1_3">{{od.order_extra_info.oex_num}}</b-col>
                        <b-col class="lb">세금계산서 발급시 요구사항</b-col><b-col class="dt wd1_1">{{od.order_extra_info.oex_requirement}}</b-col>
                    </template>
                    <template v-else-if="od.order_extra_info.oex_type == 'IVNO'">
                        <b-col class="lb">지출 증빙 서류</b-col><b-col class="dt wd1_1">세금계산서 입력안함</b-col>
                    </template>
                    <template v-else-if="od.order_extra_info.oex_type == 'NO'">
                        <b-col class="lb">지출 증빙 서류</b-col><b-col class="dt wd1_1">미발급</b-col>
                    </template>
                    <template v-else>
                        <b-col class="lb">
                            지출 증빙 서류<br />
                            (
                                <span v-if="od.order_extra_info.oex_type == 'HP'">휴대폰번호</span>
                                <span v-else-if="od.order_extra_info.oex_type == 'IN'">주민등록번호</span>
                                <span v-else-if="od.order_extra_info.oex_type == 'CN'">카드번호</span>
                                <span v-else-if="od.order_extra_info.oex_type == 'BN'">사업자번호</span>
                            )
                        </b-col>
                        <b-col class="dt wd1_1">{{od.order_extra_info.oex_num}}</b-col>
                    </template>
                </template>

                <b-col class="lb">관리자 메모</b-col>
                <b-col class="dt wd1_1 edit_field" :style="{padding:0}">
                    <b-form-input v-if="focusInfo.adm_memo" v-model="od.order_extra_info.oex_adm_memo" @blur.native="focusInfo.adm_memo = false;" v-focus="" />
                    <div v-else @click="focusInfo.adm_memo = true;">{{od.order_extra_info.oex_adm_memo}}</div>            
                </b-col>
            </b-row>
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
                            <b-col><b-form-input v-model="od.trans_email" @keyup.enter="transactionPdf('send')" /></b-col>
                        </b-row>
                        
                        <b-row>
                            <b-col class="ctrl"><b-button @click="transactionPdf('send')">발송</b-button></b-col>
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
                                    <b-form-select-option v-for="(v, k) in order_config.delivery_com" :key="k" :value="k">{{ k }}</b-form-select-option>
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

                <template v-else-if="modalType == 'changeMng'">
                    <template slot="header">담당자 변경</template>
                    <b-container class="adform layerModal">
                        <b-row>
                            <b-col class="label">당당자</b-col>
                            <b-col>
                                <b-form-select v-model="od.od_mng" class="sm_ib_h">
                                    <b-form-select-option :value="null" disabled>◖처리 상태◗</b-form-select-option>
                                    <b-form-select-option v-for="(v, k) in mng_on" :key="k" :value="k">{{v.name}}</b-form-select-option>
                                </b-form-select>
                            </b-col>
                        </b-row>
                        
                        <b-row>
                            <b-col></b-col>
                            <b-col class="ctrl"><b-button @click="update('od_mng', 'other')" class="sky">변경</b-button></b-col>
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
import { mapActions, mapState, mapGetters } from 'vuex';

var dt = new Date();
export default {
    name: 'edit',
    components: {
        VueDaumPostcode,
        'Modal': () =>      import('@/views/_common/Modal.vue'),
        'EaInput': () =>    import('@/views/admin/shop/order/_comp/EaInput.vue'),
    },
    data() {
        return {
            isModalViewed: false,
            modalType: '',
            focusInfo: {
                od_receiver:false,
                od_receiver_hp:false,
                adm_memo:false,
            },
            od: {
                order_extra_info:{},
                mng: {},
                user: {},
                order_purchase_at:[],
                order_pg:{},
            },
            dlvy_info: {
                selected: [],
                company: '한진택배',
                number: ''
            },
            document_type: '',
            mng_on:[],
            order_config: {
                pay_method:[],
            },

        };
    },
    computed: {
        payPlanDisplay() {
            var plan = this.od.order_extra_info ? this.od.order_extra_info.oex_pay_plan : '';
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
            if(this.od.order_extra_info.oex_type == 'IV')  req.push('세금계산서');
            if ( this.od.order_extra_info ) {
                if (this.od.order_extra_info.oex_req_est =='Y') req.push('견적서');
                if (this.od.order_extra_info.oex_req_tran=='Y') req.push('거래명세서');
                if (this.od.order_extra_info.oex_req_biz =='Y') req.push('사업자등록증사본');
                if (this.od.order_extra_info.oex_req_bank=='Y') req.push('통장사본');
            }
            return req.join(', ');
        },
        dlvy_4s () {
            let rst = 0;
            this.od.order_purchase_at.forEach(el => { if(el.odpa_pa_id == 0) rst = el.odpa_dlvy_p_add_vat });
            return rst;
        },
        dlvy_other () {
            return Object.values(this.od.order_purchase_at).reduce((acc, el) => {
                return acc + (el.odpa_pa_name != '' ? el.odpa_dlvy_p_add_vat : 0)
            }, 0);
        },
        sum_mileage () {
            return Math.round(this.od.od_gd_price * this.od.user.mileage_mul);
        },
        ...mapGetters({
            user: 'auth/user',
        })
    },
    filters: {
        sale_env (str) {
            var rst = '';
            switch (str) {
                case 'P': rst = 'PC'; break;
                case 'M': rst = '모바일'; break;
                case 'A': rst = '어플'; break;
                default:  rst = 'PC'; break;
            }
            return rst;
        },
        group (v) {
            var rst = '';
            switch (v) {
                case '1': rst = '일반회원'; break;
                case '2': rst = '특별회원'; break;
                case '3': rst = '미수회원'; break;
                case '4': rst = '후불회원'; break;
            }
            return rst;
        },
    },
    directives: {
        focus: {
            inserted (el) {
                el.focus();
            }
        }
    },
    methods: {
        async edit(){
            try {
                const res = await ax.get(`/api/admin/shop/order/${this.$route.params.od_id}/edit`);
                if (res && res.status === 200) {
                    this.od = res.data.od;
                    this.order_config = res.data.order_config;
                    this.mng_on = res.data.mng_on;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async update(type, mode=null){
            try {
                this.od = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    this.od, // 수정하려는 객체
                    {_method : 'PATCH', type: type} // 삽입하려는 내용
                );

                if (type == 'od_mng') {
                    if( mode !== 'other') {
                        this.od.od_mng = Auth.user().id;
                        this.od.mng = Auth.user();
                    }
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
                        if (mode == 'other') {
                            this.edit();
                            this.isModalViewed = false;
                        }
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
                    } else if (type == 'pay') {
                        Notify.toast('success', '결제정보 수정');
                    } else {
                        Notify.toast('success', '수정');
                    }
                    this.$delete(this.od, '_method');
                } else
                    Notify.toast('warning', '수정 실패');
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response);
            }
        },

        async print () {
            await this.$htmlToPaper('print_area', {styles:[
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                '/css/fontawesome_svg.css',
                '/css/adm_shop_order_edit.css?ver=2.0'
            ]});
        },

        async estimateExcel(){
            const res = await ax.post(`/api/admin/shop/order/exportEstimateExcel`, this.od, { responseType: 'blob' });
            this.orderDocumentDown(res, `${this.od.od_no}_Estimate.xlsx`);
        },
        async estimatePdf(){
            const res = await ax.post(`/api/admin/shop/order/exportEstimatePdf`, this.od, { responseType: 'blob' });
            this.orderDocumentDown(res, `${this.od.od_no}_Estimate.pdf`);
        },
        async transactionExcel(){
            const res = await ax.post(`/api/admin/shop/order/exportTransactionExcel`, this.od, { responseType: 'blob' });
            this.orderDocumentDown(res, `${this.od.od_no}_Statement.xlsx`);
        },
        async transactionPdf(type=null){
            let query = '';
            if ( type == 'send' ) {
                query = `trans_date=${this.od.trans_date}&trans_receive=${this.od.trans_receive}&trans_email=${this.od.trans_email}&trans_mng_email=${this.od.mng.email}`;
                this.isModalViewed = false;
            }
            const res = await ax.post(`/api/admin/shop/order/exportTransactionPdf?${query}`, this.od, { responseType: 'blob' });
            if (res && res.status === 200) {
                if ( type == 'send' ) Notify.toast('success', '발송 완료');
                else {
                    this.orderDocumentDown(res, `${this.od.od_no}_Statement.pdf`);
                    Notify.toast('success', '다운 완료');
                }
            } else Notify.toast('warning', '실패');
          
        },
        async shippingListExcel(){
            if (this.didCheck()) {
                const res = await ax.post(`/api/admin/shop/order/exportShippingListExcel`, this.od, { responseType: 'blob' });
                this.orderDocumentDown(res, `${this.od.od_no}_ShippingList.xlsx`);
            }
        },

        sendTran(){
            this.isModalViewed = !this.isModalViewed; 
            this.modalType = 'sendTransaction';
        },
        orderDocumentDown(res, fileNm){
            let fileUrl = window.URL.createObjectURL(new Blob([res.data]));
            let fileLink = document.createElement('a');
            fileLink.href = fileUrl;
            fileLink.setAttribute('download', fileNm);
            document.body.appendChild(fileLink);
            fileLink.click();
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
            let od_addr1 = result.roadAddress;
            od_addr1 += result.buildingName ? ` (${result.buildingName})` : '';
            this.$set(this.od, 'od_addr1', od_addr1);
            this.modalType = 'postDetail';
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
            if ( odm !== 'bundle' ) {   //  일괄등록이 아니라면
                odm.dlvy_chk = 'Y';
                for (let opa of this.od.order_purchase_at) {    //  모든 제품을 확인해서 내가 누를 품목이 아니라면 체크 해제
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
            return this.order_config.delivery_com[com].replace('[송장번호]', num);
        },
        format_date(e) { return this.formatDate(e); },
        change_dlvy_info(i){
            this.od.od_zip = this.od.user.user_addr[i].ua_zip;
            this.od.od_addr1 = this.od.user.user_addr[i].ua_addr1;
            this.od.od_addr2 = this.od.user.user_addr[i].ua_addr2;
            this.od.od_receiver_hp = this.od.user.user_addr[i].ua_hp;
        },
        getReceipt() {
            let tid = this.od.order_pg.pg_tid;
            let url = `https://iniweb.inicis.com/receipt/iniReceipt.jsp?noTid=${tid}`;
            if(this.od.order_pg.pg_pay_type.startsWith('psys'))
                url = this.order_config.url_receipt+'?tid='+this.base64_encode(tid);

            const regExp = /^https?:\/\//;
            if(regExp.test(tid))
                url = tid;
            this.openWinPop(url, 468, 750);
        },

        base64_encode(str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
        },

        async toEstimate(){
            let rst = await ax.post(`/api/admin/shop/estimate/storeFromOrder`, this.od);
            if (rst && rst.status === 200) {
                Notify.toast('success', '복사 완료');
                this.openWinPop(`/admin/shop/estimate/reply/${rst.data}`, 1300, 900);
                // this.$router.push({ name: 'adm_estimate_show_reply', params:{er_id:rst.data} });
            }
            
        },
    },

    mounted() { this.edit(); },
}
</script>

<style lang="css" scoped>
@import '/css/adm_shop_order_edit.css?ver=2.0';

.p_wrap { padding-top:1rem; }
.p_wrap .print_mng_nm { display:none; }
.p_wrap .print_hide { display:block !important; }
.p_wrap .print_hide_flex { display:flex !important; }
.p_wrap .print_hide_inline_block { display:inline-block !important; }
.p_wrap .print_show_inline  { display:none; }

.p_wrap .act_ctrl { border-width:5px; }
.p_wrap .act_ctrl .btn_area { display:flex; justify-content:flex-end; flex:0 0 530px; max-width:530px; }
.p_wrap .act_ctrl .btn_area>* { margin-left:.5%; margin-right:.5%; }
.p_wrap .act_ctrl .btn_area .input-group { max-width:150px; }
.p_wrap .act_ctrl .def_info b:not(:last-of-type) { margin-right:.5vw; }

.p_wrap .box .goods .gd_con .row .col .sum >>> .btn-group-toggle { display:block !important; text-align:center; }
.p_wrap .box .goods .gd_con .row .col .sum >>> .btn-group-toggle .btn { background-color:#ffffff; color:#6F6F6F; border-color:#aaa; border-radius:2rem; padding:.17rem 0.7rem; font-size:.75rem; }
.p_wrap .box .goods .gd_con .row .col .sum >>> .btn-group-toggle .btn.active { color:#fff; background-color:#4EB8C8; }
.p_wrap .box .goods .gd_con .row .col:nth-child(7) { border-right-width:1px; }
.p_wrap .box .goods .gd_con .model.today { background-color:#fff2cb; }
.p_wrap .box .goods .gd_con .model .signboard { text-align:center; margin:0 -10px; padding:10px; }
.p_wrap .box .goods .gd_con .model .signboard .neonText { font-size:14px; color:#e600ff; }





.p_wrap .sm_ib_v { display:none; }
@media (max-width: 1472px){
    .p_wrap .act_ctrl .def_info,
    .p_wrap .act_ctrl .btn_area { flex:0 0 100%; max-width:100%; }
}
@media (max-width: 992px){    
    .p_wrap .sm_ib_v { display:inline-block !important; }
    .p_wrap .sm_ib_h { display:none !important; }
    .p_wrap .act_ctrl { font-size:.8em; }
    .p_wrap .act_ctrl .btn { font-size:.9em; }
    .p_wrap .act_ctrl .def_info span { margin-left:0; }
    .p_wrap .act_ctrl .def_info b { margin-right:2%; margin-left:.1rem; }
    .p_wrap .act_ctrl .btn_area { flex: 0 0 100%; max-width: 100%; }
    .p_wrap .act_ctrl .btn_area .input-group { max-width:95px; }
    .p_wrap .act_ctrl .btn_area .btn { padding: 0.1rem 0.2rem !important; }

    .label_st .dt { padding-left:.2rem; }
    .label_st .lb { flex:0 0 40%; max-width:40%; }
    .label_st .wd1_3, .label_st .wd54, .label_st .wd1_2, 
    .label_st .wd1_1 { flex:0 0 60%; max-width:60%; }
    .p_wrap .box .goods .pa_tit { display:none !important; }
    .p_wrap .box .goods .gd_con .row .col:nth-child(1) { display:none !important; }
    .p_wrap .box .goods .gd_con .row .col:nth-child(2) { flex:0 0 35%; max-width:35%; border-top:2px solid #000; }
    .p_wrap .box .goods .gd_con .row .col:nth-child(3) { flex:0 0 65%; max-width:65%; border-top:2px solid #000; }
    .p_wrap .box .goods .gd_con .row .col:nth-child(4) { display:none !important; }
    .p_wrap .box .goods .gd_con .row .col:nth-child(5) { flex:0 0 33.333333%; max-width:33.333333%; }
    .p_wrap .box .goods .gd_con .row .col:nth-child(6) { flex:0 0 33.333333%; max-width:33.333333%; }
    .p_wrap .box .goods .gd_con .row .col:nth-child(7) { flex:0 0 33.333333%; max-width:33.333333%; }
    .p_wrap .box .goods .gd_con .row .col:nth-child(8) { display:none !important; }
    .p_wrap .box .goods .dlvy_fare { display:none !important; }
    
    .p_wrap .box .sum_up .total .col:nth-of-type(2):after,
    .p_wrap .box .sum_up .total .col:nth-of-type(4):after { content:none; } 
    .p_wrap .box .sum_up .total .col:nth-of-type(odd) { flex-basis:50%; max-width:50%; font-size:1rem; }
    .p_wrap .box .sum_up .total .col:nth-of-type(6) { flex-basis:50%; max-width:50%; }
    .p_wrap .box .sum_up .total .col b { font-size:1em; }
}
</style>
