<template>
<div class="goods_form">

    <b-container class="box cate">
        <h5>상품 카테고리</h5>
        <b-row class="selecter">
            <b-col sm="12" md="11">
                <b-col sm="12" md="6" lg="3">
                    <select class="custom-select" v-model="ca01" @change="getCate(1)" id="goods_category">
                        <option value=0>◖카테고리 1◗</option>
                        <option v-for="opt in list01" :value="{ ca_id: opt.ca_id, ca_name: opt.ca_name }" :key="opt.ca_id">{{ opt.ca_name }}</option>
                    </select>
                </b-col>
                <b-col sm="12" md="6" lg="3">
                    <select class="custom-select" v-model="ca02" @change="getCate(2)">
                        <option value="0">◖카테고리 2◗</option>
                        <option v-for="opt in list02" :value="{ ca_id: opt.ca_id, ca_name: opt.ca_name }" :key="opt.ca_id">{{ opt.ca_name }}</option>
                    </select>
                </b-col>
                <b-col sm="12" md="6" lg="3">
                    <select class="custom-select" v-model="ca03" @change="getCate(3)">
                        <option value="0">◖카테고리 3◗</option>
                        <option v-for="opt in list03" :value="{ ca_id: opt.ca_id, ca_name: opt.ca_name }" :key="opt.ca_id">{{ opt.ca_name }}</option>
                    </select>
                </b-col>
                <b-col sm="12" md="6" lg="3">
                    <select class="custom-select" v-model="ca04">
                        <option value="0">◖카테고리 4◗</option>
                        <option v-for="opt in list04" :value="{ ca_id: opt.ca_id, ca_name: opt.ca_name }" :key="opt.ca_id">{{ opt.ca_name }}</option>
                    </select>
                </b-col>
            </b-col>
            <b-col cols="12" lg="1">
                <b-button variant="info" size="sm" @click="add_cate"><b-icon-plus-lg></b-icon-plus-lg> 추가</b-button>
            </b-col>                
        </b-row>
        <b-row class="selected" v-for="(ca, i) in value.goods_category" :key="i">
            <b-col>
                <b-button class="xm red mr-3" @click="removeCate(i)">X</b-button>   
                <span>{{ca.gc_ca01_name}}</span>
                <b-icon-chevron-right v-if="ca.gc_ca02"></b-icon-chevron-right><span v-if="ca.gc_ca02">{{ca.gc_ca02_name}}</span>
                <b-icon-chevron-right v-if="ca.gc_ca03"></b-icon-chevron-right><span v-if="ca.gc_ca03">{{ca.gc_ca03_name}}</span>
                <b-icon-chevron-right v-if="ca.gc_ca04"></b-icon-chevron-right><span v-if="ca.gc_ca04">{{ca.gc_ca04_name}}</span>
                <b-form-checkbox size="lg" v-model="ca.gc_prime" value="Y" unchecked-value="N" class="ml-5" @change="gc_prime(i)">대표</b-form-checkbox>                       
            </b-col>
        </b-row>
        <validation :error="$store.state.error.validations.goods_category"></validation>
    </b-container>

   
    <b-container class="box adform mb_st info">
        <h5>
            상품정보 
            <b-form-checkbox switch class="float-right" v-model="value.gd_enable" value="Y" unchecked-value="N">
                {{gd_enable_text}}
            </b-form-checkbox>
        </h5>
        <b-row>
            <b-col class="label">상품명</b-col>
            <b-col>
                <b-form-input id="gd_name" v-model="value.gd_name"></b-form-input>
                <validation :error="$store.state.error.validations.gd_name"></validation>
            </b-col>
            <b-col class="label">납기일</b-col>
            <b-col class="type01">
                <b-form-input id="gd_dlvy_at" v-model="value.gd_dlvy_at"></b-form-input>
                <validation :error="$store.state.error.validations.gd_dlvy_at"></validation>
            </b-col>
        </b-row>

        <b-row>
            <b-col class="label">제조사</b-col>
            <b-col class="type02">
                <maker-input v-model="value.gd_mk_name" :frm="value"></maker-input>
                <validation :error="$store.state.error.validations.gd_mk_id"></validation>
            </b-col>
            <b-col class="label short">매입처 직배송</b-col>
            <b-col class="type02">
                <select class="custom-select" v-model="value.gd_pa_id">
                    <option value="0"></option>
                    <option v-for="opt in purchaseAt" :value="opt.pa_id" :key="opt.pa_id">{{ opt.pa_name }}</option>
                </select>
            </b-col>
            <b-col class="label short">관리자 정보</b-col>
            <b-col class="type02">
                <b-form-input v-model="value.gd_mng_info"></b-form-input>
            </b-col>
            <b-col class="label">검색 순위</b-col>
            <b-col class="type02" v-b-tooltip="'낮을 수록 먼저 나옵니다.'">
                <b-form-input v-model="value.gd_seq"></b-form-input>
            </b-col>
        </b-row>

        <b-row>                
            <b-col class="label">키워드</b-col>
            <b-col><b-form-input id="gd_keyword" v-model="value.gd_keyword"></b-form-input></b-col>
            <b-col class="label"></b-col>
            <b-col class="type01">
                <b-form-checkbox switch class="float-right" v-model="value.gd_billing" value="1" unchecked-value="0">
                    {{gd_billing_text}}
                </b-form-checkbox>
            </b-col>
        </b-row>

        <b-row class="align-items-baseline">
            <b-col class="label">상품 설명</b-col>
            <b-col class="type11">
                <vue2-tinymce-editor v-model="value.gd_desc" ref="tinymce_editor" :options="TinymceOpt"></vue2-tinymce-editor>
                <validation :error="$store.state.error.validations.gd_desc"></validation>
            </b-col>
        </b-row>
        <b-row class="align-items-baseline">
            <b-col class="label">영상 정보</b-col>
            <b-col class="type11">
                <b-form-textarea v-model="value.gd_video" placeholder="영상 태그 입력" rows="2"></b-form-textarea>
            </b-col>
        </b-row>
    </b-container>

    <b-container class="box adform mb_st">
        <h5>파일 등록</h5>
        <b-row class="align-items-start">
            <b-col class="label">상품 이미지</b-col>
            <b-col class="type11">
                <file-upload ref="fileupload1" v-model="value.file_goods_goods" :fi_group="'goods'" :fi_kind="'goods'" :is_thumb="true"></file-upload>
            </b-col>
        </b-row>
        <b-row class="align-items-start">
            <b-col class="label">첨부 파일</b-col>
            <b-col class="type11">
                <file-upload ref="fileupload2" v-model="value.file_goods_add" :fi_group="'goods'" :fi_kind="'add'" :is_thumb="true"></file-upload>
            </b-col>
        </b-row>
    </b-container>

    <b-container class="box goods_relate" v-if="value">
        <h5 class="row">
            <b-col>연관 상품</b-col>
            <relate-finder :list="value.goods_relate" :papa_gd_id="value.gd_id" :seq="value.goods_relate.length"></relate-finder>
        </h5>
        
        <draggable :list="value.goods_relate" handle=".handle" class="row list" @change="gr_updateSeq">
            <b-col v-for="(gr, i) in value.goods_relate" :key="i" cols="2" col>
                <template v-if="gr.goods">
                    <b-button variant="info" class="handle"><b-icon-arrows-move></b-icon-arrows-move></b-button>
                    <b-button variant="danger" class="btn_del" @click="gr_destroy(i)"><b-icon-x-square></b-icon-x-square></b-button>
                    <b-img :src="gr.goods.image_src_thumb[0]" />
                    <span>{{gr.goods.gd_name}}</span>
                </template>
                <template v-else>
                    <b-button variant="danger" class="btn_del" @click="gr_destroy(i)"><b-icon-x-square></b-icon-x-square></b-button>
                    <span>상품이 삭제됨</span>
                </template>
            </b-col>
        </draggable>
    </b-container>

    
    <!-- 모델 -->
    <b-container id="goods_model" tabindex="-1" class="box model adform" :class="value.gd_type == 'REN' ? 'md_ren' : 'md_non'">
        <h5 class="row">
            <b-col>Model</b-col>
            <b-col>
                <b-row class="justify-content-end">
                    <b-col class="point text-right" tag="small">0~99% 할인</b-col>
                    <b-col class="label">할인률(액)</b-col>
                    <b-col class="type02">
                        <b-form-input v-model="value.gd_dc" size="sm" class="text-right"></b-form-input>
                    </b-col>
                </b-row>
            </b-col>
        </h5>      
        <b-row class="list head">
            <b-col>
                <template v-if="value.gd_type == 'NON'">활성화 / 제품명</template>
                <template v-else>계약기간</template>
            </b-col>
            <b-col v-if="value.gd_type == 'NON'">CAT.No</b-col>                
            <b-col>모델명</b-col>
            <b-col>
                <template v-if="value.gd_type == 'NON'">스펙</template>
                <template v-else>배송비</template>
            </b-col>
            <b-col>
                <template v-if="value.gd_type == 'NON'">판매단위</template>
                <template v-else>보증금</template>
            </b-col>
            <b-col class="gm_price">
                <template v-if="value.gd_type == 'NON'">가격 / 대표 가격</template>
                <template v-else>월사용료(VAT별도)</template>
            </b-col>
            <b-col class="ctrlBox">Ctrl</b-col>
        </b-row>
        <b-row v-for="(model, i) in value.goods_model" :key="i" class="list body">
            <b-col>
                <b-input-group size="sm">
                    <b-input-group-prepend is-text v-b-tooltip="'제품 활성화'">
                        <b-form-checkbox switch class="mr-n2 mb-n1" v-model='model.gm_enable' value="Y" unchecked-value="N"></b-form-checkbox>
                    </b-input-group-prepend>
                    <b-form-input :id="`goods_model.${i}.gm_name`" v-model='model.gm_name'></b-form-input>
                </b-input-group>
                <validation :error="$store.state.error.validations[`goods_model.${i}.gm_name`]"></validation>
            </b-col>
            <b-col v-if="value.gd_type == 'NON'">
                <b-form-input v-model='model.gm_catno' readonly></b-form-input>
            </b-col>
            <b-col>
                <b-form-input :id="`goods_model.${i}.gm_code`" v-model='model.gm_code'></b-form-input>
                <validation :error="$store.state.error.validations[`goods_model.${i}.gm_code`]"></validation>
            </b-col>
            <b-col>
                <b-form-input :id="`goods_model.${i}.gm_spec`" v-model='model.gm_spec'></b-form-input>
                <validation :error="$store.state.error.validations[`goods_model.${i}.gm_spec`]"></validation>
            </b-col>
            <b-col>
                <b-form-input :id="`goods_model.${i}.gm_unit`" v-model='model.gm_unit'></b-form-input>
                <validation :error="$store.state.error.validations[`goods_model.${i}.gm_unit`]"></validation>
            </b-col>
            <b-col class="gm_price">
                <b-input-group size="sm">
                    <b-form-input :id="`goods_model.${i}.gm_price`" v-model='model.gm_price' class="text-right"></b-form-input>
                    <b-input-group-append is-text>
                        <b-form-checkbox switch class="mr-n2 mb-n1" v-model='model.gm_prime' value="Y" unchecked-value="N" @input="uniqueCheck(i)" v-b-tooltip="'대표 가격'"></b-form-checkbox>
                    </b-input-group-append>
                </b-input-group>
                <validation :error="$store.state.error.validations[`goods_model.${i}.gm_price`]"></validation>
            </b-col>
            <b-col class="ctrlBox">
                <b-button class="sm green" v-b-toggle="`bundleDc_box${i}`" v-b-tooltip="'묶음 할인'"><b-icon icon="tags-fill"></b-icon></b-button>
                <b-button class="sm red" @click="removeAtModel(i)" v-b-tooltip="'삭제'"><b-icon icon="trash-fill"></b-icon></b-button>

                <b-collapse :id="`bundleDc_box${i}`" class="bundle_box" @hide="bd_hide(model.bundle_dc)" v-model="model.bd_open">
                    <b-card header-tag="header" footer-tag="footer" class="shadow">
                        <template #header>
                            <b>묶음할인</b>
                            <b-button variant="danger" size="sm" @click="model.bd_open=false"><b-icon-x-square-fill></b-icon-x-square-fill></b-button>
                            <b-button variant="info" size="sm" @click="insertAtBundle(model.bundle_dc)"><b-icon-plus-circle-fill></b-icon-plus-circle-fill></b-button>
                        </template>
                        <b-input-group size="sm" v-for="(bundle, bd_idx) in model.bundle_dc" :key="bd_idx">
                            <b-form-input v-model='bundle.bd_ea' placeholder="갯수"></b-form-input>
                            <b-form-input v-model='bundle.bd_price' placeholder="가격"></b-form-input>
                            <b-input-group-append>
                                <b-button variant="danger" @click="removeAtBundle(model.bundle_dc, bd_idx)"><b-icon icon="dash-circle-fill"></b-icon></b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-card>
                </b-collapse>
            </b-col>

            <b-col class="rt_extra" :class="{focus:rt_extra_focus}">
                <b-container class="adform">
                    <b-row>
                        <b-col class="label">재고수량</b-col>
                        <b-col>
                            <b-form-input class="sm text-right" v-model="model.gm_limit_ea" @focus="rt_extra_focus=true" @blur="rt_extra_focus=false"></b-form-input>
                        </b-col>
                    </b-row>
                </b-container>
            </b-col>
        </b-row>
        <validation :error="$store.state.error.validations.goods_model"></validation>
        <b-row>
            <b-col class="btn_box"><b-button variant="info" size="sm" @click="insertAtModel()"><b-icon-plus-lg></b-icon-plus-lg> 모델 추가</b-button></b-col>
        </b-row>
    </b-container>
    <!-- 모델 -->

    <!-- 옵션 -->
    <b-container class="box adform option" v-if="value.gd_type == 'NON'">
        <h5 class="row">
            <b-col>Option</b-col>
            <b-col><option-finder :opt="value.goods_option"></option-finder></b-col>
        </h5>

        <b-row class="head">
            <b-col cols="6">옵션명</b-col>
            <b-col cols="3">항목</b-col>
            <b-col>가격</b-col>
        </b-row>
        <b-row v-for="(go, idx) in value.goods_option" :key="idx" class="body">
            <b-col>
                <span @click="removeAtOpt(idx)"><b-icon-x-circle-fill></b-icon-x-circle-fill></span>
                <b-form-input v-model='go.go_name' size="sm"></b-form-input>
                <b-form-checkbox v-model='go.go_required' value="Y" unchecked-value="N" switch class="mt-2">필수 옵션</b-form-checkbox>
            </b-col>
            
            <!-- 옵션 아이템 -->
            <b-col>
                <b-row v-for="(goc, goc_idx) in go.goods_option_child" :key="goc_idx">
                    <b-col><b-form-input size="sm" v-model="goc.goc_name"></b-form-input></b-col>
                    <b-col>
                        <b-form-input size="sm" v-model="goc.goc_price"></b-form-input>
                        <span v-if="goc_idx == 0" @click="insertAtOptItem(go.goods_option_child)" class="add"><b-icon-plus-circle-fill></b-icon-plus-circle-fill></span>
                        <span v-else @click="removeAtOptItem(go.goods_option_child, goc_idx)" class="del"><b-icon-x-circle-fill></b-icon-x-circle-fill></span>
                    </b-col>
                </b-row>
            </b-col>
            <!-- 옵션 아이템 -->
        </b-row>
        <b-row>
            <b-col class="btn_box">
                <b-button class="mint xm float-right" @click="insertAtOpt()"><b-icon-plus-lg></b-icon-plus-lg></b-button>
            </b-col>
        </b-row>
    </b-container>
    <!-- 옵션 -->
</div>
</template>

<script>
import ax from '@/api/http';
import draggable from 'vuedraggable';
import Ckeditor from '@/views/_common/ckeditor5/Ckeditor.vue'
import FileUpload from '@/views/_common/FileUpload.vue'
import { Vue2TinymceEditor } from "vue2-tinymce-editor";

export default {
    name: 'admShopGoodsForm',
    components: {
        draggable,
        'file-upload': FileUpload,
        'validation': () =>     import('@/views/_common/Validation'),
        'categorys': () =>      import('@/views/admin/shop/goods/_comp/Categorys'),
        'ckeditor': Ckeditor,
        'maker-input': () =>    import('@/views/admin/shop/goods/_comp/MakerInput'),
        Vue2TinymceEditor,
        'option-finder': () =>  import('@/views/admin/shop/goods/_comp/OptionFinder'),
        'relate-finder':() =>    import('@/views/admin/shop/goods/_comp/RelateFinder'),
    },
    props: ['value', 'purchaseAt'],
    computed: {
        gd_enable_text() { return this.value.gd_enable == 'Y' ? "활성" : "비활성"; },
        gd_billing_text() { return this.value.gd_billing == 1 ? "정기배송" : "1회구매"; },
    },
    filters: {
        gr_type (v) {
            var rst = '';
            switch (v) {
                case 'R': rst = '회수'; break;
                case 'T': rst = '양도'; break;
            }
            return rst;
        },
    },
    data() {
        return {
            list01: [], list02: [], list03: [], list04: [],
            ca01:{}, ca02:{}, ca03:{}, ca04:{},
            TinymceOpt: {
                height: 600,
                automatic_uploads: false,
                images_upload_handler: this.gd_desc_images_upload,
                convert_urls: false,
            }, 
            rt_extra_focus: false,
        }
    },
    methods: {
        async getCate(dp) {
            let id = 0;
            if(dp == 0) id=0;
            else if(dp == 1 && !isEmpty(this.ca01)) id=this.ca01.ca_id;
            else if(dp == 2 && !isEmpty(this.ca02)) id=this.ca02.ca_id;
            else if(dp == 3 && !isEmpty(this.ca03)) id=this.ca03.ca_id;

            if (dp == 0 || (dp > 0 && id > 0)) {
                const res = await ax.get(`/api/admin/shop/category/${id}`);
                if (res && res.status === 200) {
                    if (dp < 4) { this.ca04 = 0; this.list04 = []; }
                    if (dp < 3) { this.ca03 = 0; this.list03 = []; }
                    if (dp < 2) { this.ca02 = 0; this.list02 = []; }
                    if (dp < 1) { this.ca01 = 0; }

                    switch (dp) {
                        case 0: this.list01 = res.data; break;
                        case 1: this.list02 = res.data; break;
                        case 2: this.list03 = res.data; break;
                        case 3: this.list04 = res.data; break;
                    }
                }
            }
        },
        add_cate() {
            if (isEmpty(this.ca01)) {
                Notify.modal("카테고리를 선택하세요.", 'warning');
            } else {
                let ca = {};
                ca.gc_ca01 = this.ca01.ca_id; ca.gc_ca01_name = this.ca01.ca_name;
                if (!isEmpty(this.ca02)) { ca.gc_ca02 = this.ca02.ca_id; ca.gc_ca02_name = this.ca02.ca_name; }
                if (!isEmpty(this.ca03)) { ca.gc_ca03 = this.ca03.ca_id; ca.gc_ca03_name = this.ca03.ca_name; }
                if (!isEmpty(this.ca04)) { ca.gc_ca04 = this.ca04.ca_id; ca.gc_ca04_name = this.ca04.ca_name; }
                if ( this.value.goods_category.length == 0 )    ca.gc_prime = 'Y';
                else    ca.gc_prime = 'N';
                this.value.goods_category.push(ca);
                this.ca01 = this.ca02 = this.ca03 = this.ca04 = 0;
            }
        },
        gc_prime(i) {
            if(this.value.goods_category[i].gc_prime == 'Y') {
                for (var j in this.value.goods_category)
                    if(i != j)
                        this.value.goods_category[j].gc_prime='N';
            }
        },
        async removeCate(i) {
            var rst = await Notify.confirm('카테고리를 삭제', 'danger');
            if (rst) {
                if (this.$route.name == 'adm_goods_edit' && this.value.goods_category[i].gc_id) {
                    if (!this.value.hasOwnProperty("delete_goods_category"))
                        this.value.delete_goods_category = Array();  
                    this.value.delete_goods_category.push(this.value.goods_category[i].gc_id);
                }
                this.value.goods_category.splice(i, 1); 
            }
        },

        insertAtModel() {
            let tmp = { gm_name:'', gm_catno:'', gm_code:'', gm_spec:'', gm_unit:'', gm_enable:'Y', gm_prime:'N', gm_limit_ea:999999, gm_price:'', bundle_dc:[], bd_open:false };
            if(this.value.goods_model.length==0) tmp.gm_prime = 'Y';
            this.value.goods_model.push(tmp); 
        },
        uniqueCheck(i){
            if(this.value.goods_model[i].gm_prime == 'Y'){
                for (var ii in this.value.goods_model)
                    if(i != ii)
                        this.value.goods_model[ii].gm_prime='N';
            }
        },
        removeAtModel(i) {
            if (this.$route.name == 'adm_goods_edit' && this.value.goods_model[i].gm_id) {
                if (this.value.goods_model[i].gm_prime == 'Y') {
                    Notify.modal("대표 가격 삭제 불가", 'warning');
                    return false;
                }
                
                if (!this.value.hasOwnProperty("delete_goods_model"))
                    this.value.delete_goods_model = Array();  
                this.value.delete_goods_model.push(this.value.goods_model[i].gm_id);
            }
            this.value.goods_model.splice(i, 1); 
        },

        insertAtBundle(bd) { bd.push({ bd_id:0, bd_ea:'', bd_price:'' }); },
        removeAtBundle(bd, i) {
            if (this.$route.name == 'adm_goods_edit' && bd[i].bd_id) {
                if (!this.value.hasOwnProperty("delete_bundle_dc"))
                    this.value.delete_bundle_dc = Array();  
                this.value.delete_bundle_dc.push(bd[i].bd_id);
            }
            bd.splice(i, 1); 
        },

        insertAtOpt() { this.value.goods_option.push({ go_id:0, go_name:'', goods_option_child:[{ goc_id:0, goc_name:'', goc_price:'' }] }); },
        removeAtOpt(i) { 
            if (this.$route.name == 'adm_goods_edit' && this.value.goods_option[i].go_id) {
                if (!this.value.hasOwnProperty("delete_option"))
                    this.value.delete_option = Array();  
                this.value.delete_option.push(this.value.goods_option[i].go_id);
            }
            this.value.goods_option.splice(i, 1); 
        },

        insertAtOptItem(goc) { goc.push({ goc_id:0, goc_name:'', goc_price:'' }); },
        removeAtOptItem(goc, i) {
            if (this.$route.name == 'adm_goods_edit' && goc[i].goc_id) {
                if (!this.value.hasOwnProperty("delete_option_child"))
                    this.value.delete_option_child = Array();  
                this.value.delete_option_child.push(goc[i].goc_id);
            }
            goc.splice(i, 1); 
        },

        bd_hide(bd) { for (let key in bd) { if(bd[key].bd_ea == '' || bd[key].bd_price == '') bd.splice(key, 1); } },
        rt_hide(rt) {},

        gd_desc_images_upload(blobInfo, success, failure) {
            let xhr = new XMLHttpRequest();                  
            xhr.open('POST', '/api/uploadSimple');
            xhr.setRequestHeader("X-CSRF-Token", document.head.querySelector("[name=csrf-token]").content);
            
            xhr.onload = function() {
                if (xhr.status != 200) {
                    failure('HTTP Error: ' + xhr.status);
                    return;
                }
                let json = JSON.parse(xhr.responseText);

                if (!json || typeof json.location != 'string') {
                    failure('Invalid JSON: ' + xhr.responseText);
                    return;
                }
                success(json.location);
            };
            let fi_room = 'Y'+new Date().getFullYear();
            let formData = new FormData();
            formData.append( 'file', blobInfo.blob(), blobInfo.filename());
            formData.append( 'fi_group', 'goods' );
            formData.append( 'fi_room', fi_room );
            formData.append( 'fi_kind', 'desc' );
            xhr.send(formData);
            console.log("editor upload complete");
        },

        gr_updateSeq() {
            this.value.goods_relate.forEach((gr, i) => gr.gr_seq = i);
        },
        gr_destroy(i) {
            if (this.$route.name == 'adm_goods_edit' && this.value.goods_relate[i].gr_id) {
                if (!this.value.hasOwnProperty("delete_goods_relate"))
                    this.value.delete_goods_relate = Array();  
                this.value.delete_goods_relate.push(this.value.goods_relate[i].gr_id);
            }
            this.value.goods_relate.splice(i, 1);
        },
        frm_priceComma(v)   { return this.priceComma(v); },
    },
    mounted() { this.getCate(0); },
}
</script>


<style lang="css" scoped>
.p_wrap .box { padding:1em 2em; }
.p_wrap .goods_form { overflow: hidden; }

.cate .selecter { border-bottom:2px solid #000; padding-bottom:1em; margin-bottom:1em; }
.cate .selecter>div:first-child { display:flex; flex-wrap:wrap; padding:0; }
.cate .selected:not(:last-child) { border-bottom: 1px solid #ccc; }
.cate .selected .col { display:flex; align-items:center; padding:.5em; }
.cate .selected .col .btn { padding:0 3px; }
.cate .selected .col>svg { margin:0 .5em; color:#CCC; }

.goods_relate .list .col { text-align:center; overflow:hidden; margin-bottom:2rem; }
.goods_relate .list .col img { width:150px; height:150px; object-fit:cover; }
.goods_relate .list .col button { position:absolute; top:0; transform:translateY(-120%); transition:transform 0.5s ease; }
.goods_relate .list .col span { margin-top:.5rem; display:block; }
.goods_relate .list .col .handle { left:50%; transform:translateX(-50%) translateY(-120%); }
.goods_relate .list .col .btn_del { right:15px; }
.goods_relate .list .col:hover .handle { transform:translateX(-50%) translateY(0); }
.goods_relate .list .col:hover .btn_del { transform:translateY(0); }

.model .head .col { text-align:center; font-size:.85em; }
.model .row .col .bundle_box { position:absolute; top:2em; right:0; width:300px; margin-top:.5em; z-index:2; }
.model .row .col .bundle_box .card { margin-top:0; }
.model .row .col .bundle_box .card header { text-align:left; }
.model .row .col .bundle_box .card header button { padding-top:.2em; padding-bottom:.35em; float:right; line-height:1; }
.model .body .ctrlBox { text-align:right; }
.model.md_non>.list>.col:nth-child(4) { flex: 0 0 25%; max-width:25%; }
.model.md_non>.list>.col:nth-child(2),
.model.md_non>.list>.col:nth-child(3),
.model.md_non>.list>.col:nth-child(5) { flex: 0 0 8.5%; max-width:8.5%; }
.model>.row>.ctrlBox { flex:0 0 8%; max-width:69px; padding-left:0; padding-right:0; }
.model>.row>.ctrlBox button { padding-left:.4em; padding-right:.4em; }
.model.md_non>.list>.gm_price { flex:0 0 10%; max-width:10%; }

.model .body { position:relative; }
.model .body .rt_extra { border-left:1px solid #BBB; border-radius:10px; position:absolute; background:#FFF; right:0px; max-width:200px; transform:translateX(101%); padding:0; z-index:1; transition:all 0.5s ease; }
.model .body .rt_extra:before { content:'◀'; position:absolute; display:block; line-height:2; padding-top:8px; }
.model .body .rt_extra:hover,
.model .body .rt_extra.focus { transform:translateX(0%); }

.option.adform .row .label { flex:0 0 12%; max-width:12%; }
.option.adform .row .label + .type04 { flex: 0 0 29.666667%; max-width:29.666667%; }
.option.adform .row .label + .type05 { flex: 0 0 38%; max-width:38%; }
.option.adform .row .col .btn-xm { padding:.1em .2em; font-size: 0.7em; }

.option .head>div { text-align:center; }
.option .body { align-items: flex-start !important; }
.option .body>.col:first-child span { color:#dc3545; cursor:pointer; }
.option .body>.col:first-child input { width:calc(100% - 22px); display:inline-block; }
.option .body>.col .row .col { padding-top:0; }
.option .body>.col .row .col:last-child span { cursor:pointer; }
.option .body>.col .row .col:last-child span.add { color:#17a2b8; }
.option .body>.col .row .col:last-child span.del { color:#dc3545; }
.option .body>.col .row .col:last-child input { width:calc(100% - 22px); display:inline-block; }

@media (max-width: 992px){
    .p_wrap .box { padding:0; }
    .cate .selecter { padding-bottom:.5em; margin-bottom:0; }
    .cate .selecter>div,
    .cate .selecter>div>div { padding:0; }
    .cate .selecter>div:last-child { text-align:right; margin-top:.5em; }
    .cate .selected .col { display:block; }
    .cate .selected .col>div { display:inline-block; }

    .mb_st .row { align-items:flex-start; flex-direction:column; }
    .mb_st .row > div:not(.tit) { padding:0; }
    .mb_st .row .label { max-width:100%; text-align:left; }
    .mb_st .row .label + div { max-width:100%; margin-bottom:.7em; }

    #goods_model, .option { overflow-x:scroll; }
    #goods_model>.row, .option>.row { width:1600px; }
}
</style>
