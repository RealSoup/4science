<template>
<div>
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
                <b-button variant="info" size="sm" @click="add_cate"><b-icon-plus-lg /> 추가</b-button>
            </b-col>                
        </b-row>
        <b-row class="selected" v-for="(ca, i) in value.goods_category" :key="i">
            <b-col>
                <b-button class="xm red mr-3" @click="removeCate(i)">X</b-button>   
                <span>{{ca.gc_ca01_name}}</span>
                <b-icon-chevron-right v-if="ca.gc_ca02" /><span v-if="ca.gc_ca02">{{ca.gc_ca02_name}}</span>
                <b-icon-chevron-right v-if="ca.gc_ca03" /><span v-if="ca.gc_ca03">{{ca.gc_ca03_name}}</span>
                <b-icon-chevron-right v-if="ca.gc_ca04" /><span v-if="ca.gc_ca04">{{ca.gc_ca04_name}}</span>
                <b-form-checkbox size="lg" v-model="ca.gc_prime" value="Y" unchecked-value="N" class="ml-5" @change="gc_prime(i)">대표</b-form-checkbox>                       
            </b-col>
        </b-row>
        <validation :error="$store.state.error.validations.goods_category" />
    </b-container>

   
    <b-container class="box adform info">
        <h5>
            상품정보 
            <b-form-checkbox switch size="lg" class="float-right" v-model="value.gd_enable" value="Y" unchecked-value="N">
                {{gd_enable_text}}
            </b-form-checkbox>
        </h5>
        <b-row>
            <b-col class="label">상품명</b-col>
            <b-col>
                <b-form-input id="gd_name" v-model="value.gd_name" />
                <validation :error="$store.state.error.validations.gd_name" />
            </b-col>
            <b-col class="label">납기일</b-col>
            <b-col class="type02">
                <b-form-input id="gd_dlvy_at" v-model="value.gd_dlvy_at" />
                <validation :error="$store.state.error.validations.gd_dlvy_at" />
            </b-col>
        </b-row>

        <b-row>
            <b-col class="label">제조사</b-col>
            <b-col class="type02">
                <maker-input v-model="value.gd_mk_name" :frm="value" />
                <validation :error="$store.state.error.validations.gd_mk_id" />
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
                <b-form-input v-model="value.gd_mng_info" />
            </b-col>
            <b-col class="label">검색 순위</b-col>
            <b-col class="type02" v-b-tooltip="'낮을 수록 먼저 나옵니다.'">
                <b-form-input v-model="value.gd_seq" />
            </b-col>
        </b-row>

        <b-row>                
            <b-col class="label">키워드</b-col>
            <b-col class="type11">
                <b-form-input id="gd_keyword" v-model="value.gd_keyword" />
            </b-col>
        </b-row>

        <b-row class="align-items-baseline">
            <b-col class="label">상품 설명</b-col>
            <b-col class="type11">
                <vue2-tinymce-editor v-model="value.gd_desc" ref="tinymce_editor" :options="TinymceOpt" />
                <validation :error="$store.state.error.validations.gd_desc" />
            </b-col>
        </b-row>
        <b-row class="align-items-baseline">
            <b-col class="label">영상 정보</b-col>
            <b-col class="type11">
                <b-form-textarea v-model="value.gd_video" placeholder="영상 태그 입력" rows="2" />
            </b-col>
        </b-row>
    </b-container>

    <b-container class="box adform">
        <h5>파일 등록</h5>
        <b-row class="align-items-start">
            <b-col class="label">상품 이미지</b-col>
            <b-col class="type11">
                <file-upload ref="fileupload1" v-model="value.file_goods_goods" :fi_group="'goods'" :fi_kind="'goods'" :is_thumb="true" />
            </b-col>
        </b-row>
        <b-row class="align-items-start">
            <b-col class="label">첨부 파일</b-col>
            <b-col class="type11">
                <file-upload ref="fileupload2" v-model="value.file_goods_add" :fi_group="'goods'" :fi_kind="'add'" />
            </b-col>
        </b-row>
    </b-container>

    <!-- 모델 -->
    <b-container tabindex="-1" class="box model adform">
        <h5>Model</h5>        
        <b-row class="head">
            <b-col>활성화 / 제품명</b-col>
            <b-col>CAT.No</b-col>                
            <b-col>모델명</b-col>
            <b-col>스펙</b-col>
            <b-col>판매단위</b-col>
            <b-col v-if="value.gd_type == 'NON'" class="gm_price">가격 / 대표 가격</b-col>
            <b-col class="ctrlBox">Ctrl</b-col>
        </b-row>
        <b-row v-for="(model, i) in value.goods_model" :key="i" class="list">
            <b-col>
                <b-input-group size="sm">
                    <b-input-group-prepend is-text v-b-tooltip="'제품 활성화'">
                        <b-form-checkbox switch class="mr-n2 mb-n1" v-model='model.gm_enable' value="Y" unchecked-value="N" />
                    </b-input-group-prepend>
                    <b-form-input :id="`goods_model.${i}.gm_name`" v-model='model.gm_name' />
                </b-input-group>
                <validation :error="$store.state.error.validations[`goods_model.${i}.gm_name`]" />
            </b-col>
            <b-col>
                <b-form-input v-model='model.gm_catno' readonly />
            </b-col>
            <b-col>
                <b-form-input :id="`goods_model.${i}.gm_code`" v-model='model.gm_code' />
                <validation :error="$store.state.error.validations[`goods_model.${i}.gm_code`]" />
            </b-col>
            <b-col>
                <b-form-input :id="`goods_model.${i}.gm_spec`" v-model='model.gm_spec' />
                <validation :error="$store.state.error.validations[`goods_model.${i}.gm_spec`]" />
            </b-col>
            <b-col>
                <b-form-input :id="`goods_model.${i}.gm_unit`" v-model='model.gm_unit' />
                <validation :error="$store.state.error.validations[`goods_model.${i}.gm_unit`]" />
            </b-col>
            <b-col v-if="value.gd_type == 'NON'" class="gm_price">
                <b-input-group size="sm">
                    <b-form-input :id="`goods_model.${i}.gm_price`" v-model='model.gm_price' class="text-right" />
                    <b-input-group-append is-text>
                        <b-form-checkbox switch class="mr-n2 mb-n1" v-model='model.gm_prime' value="Y" unchecked-value="N" @input="uniqueCheck(i)" v-b-tooltip="'대표 가격'" />
                    </b-input-group-append>
                </b-input-group>
                <validation :error="$store.state.error.validations[`goods_model.${i}.gm_price`]" />
            </b-col>
            <b-col class="ctrlBox">
                <b-button class="sm green" v-if="value.gd_type == 'NON'" v-b-toggle="`bundleDc_box${i}`" v-b-tooltip="'묶음 할인'"><b-icon icon="tags-fill" /></b-button>
                <b-button class="sm gray" v-else v-b-toggle="`rental_box${i}`" v-b-tooltip="'렌탈 가격'">R</b-button>
                <b-button class="sm red" @click="removeAtModel(i)" v-b-tooltip="'삭제'"><b-icon icon="trash-fill"></b-icon></b-button>

                <b-collapse v-if="value.gd_type == 'NON'" :id="`bundleDc_box${i}`" class="bundle_box" @hide="bd_hide(model.bundle_dc)" v-model="model.bd_open">
                    <b-card header-tag="header" footer-tag="footer" class="shadow">
                        <template #header>
                            <b>묶음할인</b>
                            <b-button variant="danger" size="sm" @click="model.bd_open=false"><b-icon-x-square-fill /></b-button>
                            <b-button variant="info" size="sm" @click="insertAtBundle(model.bundle_dc)"><b-icon-plus-circle-fill /></b-button>
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
            <b-col v-if="value.gd_type == 'REN'" class="rental_box col-12">
                <b-collapse :id="`rental_box${i}`" @hide="rt_hide(model.rental)" v-model="model.rt_open">
                    <b-row v-for="gr in model.goods_rental" :key="gr.gr_id">
                        <b-col>
                            <b-form-checkbox switch size="lg" class="float-right" v-model="gr.gr_type" value="R" unchecked-value="T">
                                {{gr.gr_type | gr_type}}
                            </b-form-checkbox>
                        </b-col>
                        <b-col><b-form-input v-model='gr.gr_term' placeholder="계약기간" /></b-col>
                        <b-col><b-form-input v-model='gr.gr_setup_fee' placeholder="설치비" /></b-col>
                        <b-col><b-form-input v-model='gr.gr_deposit_fee' placeholder="보증금" /></b-col>
                        <b-col><b-form-input v-model='gr.gr_rent_fee' placeholder="월사용료" /></b-col>
                    </b-row>
                </b-collapse>
            </b-col>
        </b-row>
        <validation :error="$store.state.error.validations.goods_model" />
        <b-row>
            <b-col class="btn_box"><b-button variant="info" size="sm" @click="insertAtModel()"><b-icon-plus-lg /> 모델 추가</b-button></b-col>
        </b-row>
    </b-container>
    <!-- 모델 -->

    <!-- 옵션 -->
    <b-container class="box adform option" v-if="value.gd_type == 'NON'">
        <h5>
            Option
            <b-button variant="info" size="sm" class="float-right" @click="insertAtOpt()"><b-icon-plus-lg /></b-button>
        </h5>

        <b-row class="head">
            <b-col lg="6">옵션명</b-col>
            <b-col lg="3">항목</b-col>                
            <b-col>가격</b-col>
        </b-row>
        <b-row v-for="(go, idx) in value.goods_option" :key="idx" class="body">
            <b-col>
                <span @click="removeAtOpt(idx)"><b-icon-x-circle-fill /></span>
                <b-form-input v-model='go.go_name' size="sm" />
                <b-form-checkbox v-model='go.go_required' value="Y" unchecked-value="N" switch class="mt-2">필수 옵션</b-form-checkbox>
            </b-col>
            
            <!-- 옵션 아이템 -->
            <b-col>
                <b-row v-for="(goc, goc_idx) in go.goods_option_child" :key="goc_idx">
                    <b-col><b-form-input size="sm" v-model="goc.goc_name" /></b-col>
                    <b-col>
                        <b-form-input size="sm" v-model="goc.goc_price" />
                        <span v-if="goc_idx == 0" @click="insertAtOptItem(go.goods_option_child)" class="add"><b-icon-plus-circle-fill /></span>
                        <span v-else @click="removeAtOptItem(go.goods_option_child, goc_idx)" class="del"><b-icon-x-circle-fill /></span>
                    </b-col>
                </b-row>
            </b-col>
            <!-- 옵션 아이템 -->
        </b-row>
    </b-container>
    <!-- 옵션 -->
</div>
</template>

<script>
import ax from '@/api/http';
import draggable from 'vuedraggable';
// import Multiselect from 'vue-multiselect'
import Ckeditor from '@/views/_common/ckeditor5/Ckeditor.vue'
import FileUpload from '@/views/_common/FileUpload.vue'
import { Vue2TinymceEditor } from "vue2-tinymce-editor";

export default {
    name: 'GoodsForm',
    components: {
        draggable,
        // Multiselect,
        'file-upload': FileUpload,
        'validation': () => import('@/views/_common/Validation'),
        'categorys': () => import('./_comp/Categorys'),
        'ckeditor': Ckeditor,
        'maker-input': () => import('./_comp/MakerInput'),
        Vue2TinymceEditor,
    },
    props: ['value', 'purchaseAt'],
    computed: {
        gd_enable_text() { return this.value.gd_enable == 'Y' ? "활성" : "비활성"; },
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
            }, 
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
            let tmp = { gm_name:'', gm_catno:'', gm_code:'', gm_spec:'', gm_unit:'', gm_enable:'Y', gm_prime:'N', gm_price:'', bundle_dc:[], bd_open:false };
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
    },
    mounted() { this.getCate(0); },
}
</script>


<style lang="css" scoped>
.p_wrap .box { padding:1em 2em; }

.cate .selecter { border-bottom:2px solid #000; padding-bottom:1em; margin-bottom:1em; }
.cate .selecter div:first-child { display:flex; flex-wrap:wrap; padding:0; }
.cate .selected:not(:last-child) { border-bottom: 1px solid #ccc; }
.cate .selected .col { display:flex; align-items:center; padding:.5em; }
.cate .selected .col .btn { padding:0 3px; }
.cate .selected .col>svg { margin:0 .5em; color:#CCC; }




.model .head .col { text-align:center; }
.model .row .col .bundle_box { position:absolute; top:2em; right:0; width:300px; margin-top:.5em; z-index:2; }
.model .row .col .bundle_box .card { margin-top:0; }
.model .row .col .bundle_box .card header { text-align:left; }
.model .row .col .bundle_box .card header button { padding-top:.2em; padding-bottom:.35em; float:right; line-height:1; }
.model .list .ctrlBox { text-align:right; }
.model>.row>.col:nth-child(1) {}
.model>.row>.col:nth-child(4) { flex: 0 0 25%; max-width:25%; }
.model>.row>.col:nth-child(2),
.model>.row>.col:nth-child(3),
.model>.row>.col:nth-child(5) { flex: 0 0 8.5%; max-width:8.5%; }
.model>.row>.ctrlBox { flex: 0 0 8%; max-width:8%; }
.model>.row>.ctrlBox button { padding-left:.4em; padding-right:.4em; }
.model>.row>.gm_price { flex:0 0 10%; max-width:10%; }

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
</style>
