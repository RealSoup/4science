<template lang="html">
    <div class="accordion">
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1">
                <b-button block v-b-toggle.oex_type_iv variant="info">세금계산서</b-button>
            </b-card-header>
            <b-collapse id="oex_type_iv" @shown="oexTypeIs('IV')" accordion="oex_type" @hide="accordionHide">
                <b-card-body>
                    <b-card-text>
                        <b-form-checkbox v-model="value.oex_hasBizLicense" class="mb-4">사업자 등록증 사본 있음.</b-form-checkbox>

                        <transition name="slideUpDown">
                            <div v-if="value.oex_hasBizLicense" class="bifurcation">
                                <b-form-file id="biz_file" v-model="value.oex_file" ref="oex_file" class="mb-4"></b-form-file>
                            </div>
                        </transition>
                        <transition name="slideUpDown">
                            <div v-if="!value.oex_hasBizLicense" class="bifurcation">
                                <p class="awesome_placeholder">
                                    <input type="text" v-model="value.oex_biz_name" ref="oex_biz_name" id="oex_biz_name" required />
                                    <label for="oex_biz_name"><span>법인명</span></label>
                                </p>
                                <p class="awesome_placeholder">
                                    <b-form-input v-model="value.oex_biz_num" ref="oex_biz_num" id="oex_biz_num" required :formatter="formatBiz" />
                                    <label for="oex_biz_num"><span>등록번호<i>( 숫자만 입력하세요 )</i></span></label>
                                </p>
                                <b-row>
                                    <b-col>
                                        <p class="awesome_placeholder">
                                            <input type="text" v-model="value.oex_biz_type" ref="oex_biz_type" id="oex_biz_type" required />
                                            <label for="oex_biz_type"><span>업태</span></label>
                                        </p>
                                    </b-col>
                                    <b-col>
                                        <p class="awesome_placeholder">
                                            <input type="text" v-model="value.oex_biz_item" ref="oex_biz_item" id="oex_biz_item" required />
                                            <label for="oex_biz_item"><span>종목</span></label>
                                        </p>
                                    </b-col>
                                </b-row>

                                <p class="awesome_placeholder">
                                    <input type="text" v-model="value.oex_ceo" ref="oex_ceo" id="oex_ceo" required />
                                    <label for="oex_ceo"><span>대표자명</span></label>
                                </p>
                                <p class="awesome_placeholder">
                                    <input type="text" v-model="value.oex_addr" ref="oex_addr" id="oex_addr" required />
                                    <label for="oex_addr"><span>사업장소재지</span></label>
                                </p>
                                <p class="awesome_placeholder">
                                    <textarea v-model="value.oex_requirement" ref="oex_requirement" id="oex_requirement" required />
                                    <label for="oex_requirement"><span>요구사항</span></label>
                                </p>
                            </div>
                        </transition>

                        <p class="awesome_placeholder">
                            <input type="text" v-model="value.oex_mng" ref="oex_mng" id="oex_mng" required />
                            <label for="oex_mng"><span>담당자</span></label>
                        </p>
                        <p class="awesome_placeholder">
                            <input type="email" v-model="value.oex_email" ref="oex_email" id="oex_email" required />
                            <label for="oex_email"><span>이메일</span></label>
                        </p>
                        <p class="awesome_placeholder">
                            <b-form-input v-model="value.oex_num_tel" ref="oex_num_tel" id="oex_num_tel" required :formatter="formatHp" />
                            <label for="oex_num_tel"><span>핸드폰 번호<i>( 숫자만 입력하세요 )</i></span></label>
                        </p>
                    </b-card-text>
                </b-card-body>
            </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1">
                <b-button block v-b-toggle.oex_type_in variant="info">현금영수증(주민등록번호)</b-button>
            </b-card-header>
            <b-collapse id="oex_type_in" @shown="oexTypeIs('IN')" accordion="oex_type" @hide="accordionHide">
                <b-card-body>
                    <b-card-text>
                        <div class="awesome_placeholder">
                            <b-form-input type="password" v-model="value.oex_num_in" ref="oex_num_in" id="oex_num_in" required :formatter="formatIdNum" autocomplete="off" />
                            <label for="oex_num_in"><span>주민등록번호<i>( 숫자만 입력하세요 )</i></span></label>
                        </div>
                    </b-card-text>
                </b-card-body>
            </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1">
                <b-button block v-b-toggle.oex_type_hp variant="info">현금영수증(핸드폰)</b-button>
            </b-card-header>
            <b-collapse id="oex_type_hp"  @shown="oexTypeIs('HP')" accordion="oex_type" @hide="accordionHide">
                <b-card-body>
                    <b-card-text>
                        <div class="awesome_placeholder">
                            <b-form-input v-model="value.oex_num_hp" ref="oex_num_hp" id="oex_num_hp" required :formatter="formatHp" />
                            <label for="oex_num_hp"><span>핸드폰 번호<i>( 숫자만 입력하세요 )</i></span></label>
                        </div>
                    </b-card-text>
                </b-card-body>
            </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1">
                <b-button block v-b-toggle.oex_type_cn variant="info">현금영수증(카드 번호)</b-button>
            </b-card-header>
            <b-collapse id="oex_type_cn" @shown="oexTypeIs('CN')" accordion="oex_type" @hide="accordionHide">
                <b-card-body>
                    <b-card-text>
                        <div class="awesome_placeholder">
                            <b-form-input v-model="value.oex_num_cn" ref="oex_num_cn" id="oex_num_cn" required :formatter="formatCardNum" />
                            <label for="oex_num_cn"><span>카드 번호<i>( 숫자만 입력하세요 )</i></span></label>
                        </div>
                    </b-card-text>
                </b-card-body>
            </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1">
                <b-button block v-b-toggle.oex_type_bn variant="info">사업자 등록 번호</b-button>
            </b-card-header>
            <b-collapse id="oex_type_bn" @shown="oexTypeIs('BN')" accordion="oex_type" @hide="accordionHide">
                <b-card-body>
                    <b-card-text>
                        <div class="awesome_placeholder">
                            <b-form-input v-model="value.oex_num_bn" ref="oex_num_bn" id="oex_num_bn" required :formatter="formatBiz" />
                            <label for="oex_num_bn"><span>사업자 등록 번호<i>( 숫자만 입력하세요 )</i></span></label>
                        </div>
                    </b-card-text>
                </b-card-body>
            </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1">
                <b-button block v-b-toggle.oex_type_no variant="danger">미발급</b-button>
            </b-card-header>
            <b-collapse id="oex_type_no" class="bg-danger" @shown="oexTypeIs('NO')" accordion="oex_type" visible>
                <b-card-body>
                    <b-card-text class="text-white">
                        주문금액 10만원 이상 건에 대하여는 국세청 자진발급 번호(010-000-1234)로 현금영수증이 발행됩니다.
                    </b-card-text>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'TaxInvoice',
    props:['value'],
    methods: {
        oexTypeIs(t){
            this.value.oex_type = t;
            setTimeout(() => {
                if ( t == 'IN')         this.$refs.oex_num_in.focus();
                else if ( t == 'HP')    this.$refs.oex_num_hp.focus();
                else if ( t == 'CN')    this.$refs.oex_num_cn.focus();
                else if ( t == 'BN')    this.$refs.oex_num_bn.focus();
            }, 200);
        },
        accordionHide() {
            this.value.oex_type = 'NO';
        }
    }


}
</script>

<style lang="css" scoped>
.awesome_placeholder { position:relative; padding-top:1em; }
.awesome_placeholder input,
.awesome_placeholder textarea { font-size:1em; padding:0.3em; transition:padding 0.2s ease; width:100%; border:none;  }
.awesome_placeholder label { display:block; width:10%; white-space:nowrap; padding:0; margin:0; height:0px; border-top:1px solid red; transition:width 0.4s ease; }
.awesome_placeholder label span { position:absolute; top:0.8em; left:0; font-size:1.3em; font-weight:bold; color:#8F8F8F; cursor:text; transition:all 0.2s ease; }

.awesome_placeholder input:focus,
.awesome_placeholder textarea:focus { outline:0; }

.awesome_placeholder input:focus + label,
.awesome_placeholder textarea:focus + label { width:80%; }
.awesome_placeholder input:valid + label,
.awesome_placeholder textarea:valid + label { border-color:green; }

.awesome_placeholder input:focus + label span,
.awesome_placeholder input:valid + label span,
.awesome_placeholder textarea:focus + label span,
.awesome_placeholder textarea:valid + label span { top:0; font-size:0.8em; color:#17a2b8; font-weight:normal; }

.awesome_placeholder input + label span i,
.awesome_placeholder textarea + label span i { color:#FF6C6C; font-size:0.8em; }

.slideUpDown-enter-to,
.slideUpDown-leave { max-height:400px; }
.slideUpDown-enter-active  { transition:max-height 0.9s; }
.slideUpDown-enter,
.slideUpDown-leave-to { max-height:0; }
.bifurcation { overflow:hidden; }

</style>
