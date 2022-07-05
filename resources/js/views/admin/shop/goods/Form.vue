<template>
<div>
    <b-card class="cate">
        <b-container>
            <b-row><b-col class="tit">상품 카테고리</b-col></b-row>            
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
                    <span>{{ca.gc_ca01_name}}</span>
                    <b-icon-chevron-right v-if="ca.gc_ca02" />
                    <span v-if="ca.gc_ca02">{{ca.gc_ca02_name}}</span>
                    <b-icon-chevron-right v-if="ca.gc_ca03" />
                    <span v-if="ca.gc_ca03">{{ca.gc_ca03_name}}</span>
                    <b-icon-chevron-right v-if="ca.gc_ca04" />
                    <span v-if="ca.gc_ca04">{{ca.gc_ca04_name}}</span>
                    <b-button pill size="sm" variant="danger" @click="removeCate(i)"><b-icon-trash-fill /></b-button>                    
                </b-col>
            </b-row>
            <Validation :error="$store.state.error.validations.goods_category" />
        </b-container>
    </b-card>

    <b-card class="info adform">
        <b-container>
            <b-row><b-col class="tit">상품정보</b-col></b-row>
            <b-row>
                <b-col class="label">상품명</b-col>
                <b-col class="type05">
                    <b-form-input id="gd_name" v-model="value.gd_name" />
                    <Validation :error="$store.state.error.validations.gd_name" />
                </b-col>
                <b-col class="label">납기일</b-col>
                <b-col class="type03">
                    <b-form-input id="gd_dlvy_at" v-model="value.gd_dlvy_at" />
                    <Validation :error="$store.state.error.validations.gd_dlvy_at" />
                </b-col>
                <b-col class="label">활성화</b-col>
                <b-col class="type01">
                    <b-form-checkbox switch size="lg" v-model="value.gd_enable" value="Y" unchecked-value="N">{{gd_enable_text}}</b-form-checkbox>
                </b-col>
            </b-row>

            <b-row>
                <b-col class="label">제조사</b-col>
                <b-col class="type03">
                    <select class="custom-select" id="gd_mk_id" v-model="value.gd_mk_id">
                        <option value=""></option>
                        <option v-for="opt in makers" :value="opt.mk_id" :key="opt.mk_id">{{ opt.mk_name }}</option>
                    </select>
                    <Validation :error="$store.state.error.validations.gd_mk_id" />
                </b-col>
                <b-col class="label short">매입처 직배송</b-col>
                <b-col class="type03">
                    <select class="custom-select" v-model="value.gd_pa_id">
                        <option value="0"></option>
                        <option v-for="opt in purchaseAt" :value="opt.pa_id" :key="opt.pa_id">{{ opt.pa_name }}</option>
                    </select>
                </b-col>
                <b-col class="label short">관리자 정보</b-col>
                <b-col class="type03">
                    <b-form-input v-model="value.gd_mng_info" />
                </b-col>
            </b-row>

            <b-row>                
                <b-col class="label">키워드</b-col>
                <b-col class="type11">
                    <multiselect 
                        v-model="value.hash_join" 
                        tag-placeholder="새로운 키워드 추가" 
                        placeholder="키워드를 선택 및 입력하세요"
                        deselectLabel="클릭 or 엔터를 눌러 제거"
                        selectedLabel="선택됨" 
                        label="hs_tag" 
                        track-by="hs_id" 
                        :options="hashs" 
                        :multiple="true" 
                        :taggable="true"
                        @tag="addTag"
                    ></multiselect>
                </b-col>
            </b-row>

            <b-row class="align-items-baseline">
                <b-col class="label">상품 설명</b-col>
                <b-col class="type11">
                    <Ckeditor v-model="value.gd_desc" />
                    <Validation :error="$store.state.error.validations.gd_desc" />
                </b-col>
            </b-row>
            <b-row class="align-items-baseline">
                <b-col class="label">영상 정보</b-col>
                <b-col class="type11">
                    <b-form-textarea v-model="value.gd_video" placeholder="영상 태그 입력" rows="2" />
                </b-col>
            </b-row>
        </b-container>
    </b-card>

    <b-card class="adform">
        <b-container>
            <b-row><b-col class="tit">파일 등록</b-col></b-row>
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
    </b-card>

    <!-- 모델 -->
    <b-card tabindex="-1" class="model adform">
        <b-container>
            <b-row><b-col class="tit">Model</b-col></b-row>
            
            <b-row class="head cell">
                <b-col col lg="3">제품명</b-col>
                <b-col col lg="1">CAT.No</b-col>                
                <b-col col lg="1">모델명</b-col>
                <b-col col lg="3">스펙</b-col>
                <b-col col lg="1">판매단위</b-col>
                <b-col col lg="2">활성화 / 가격</b-col>
                <b-col>Ctrl</b-col>
            </b-row>

            <b-row v-for="(model, i) in value.goods_model" :key="i">
                <b-col col lg="3">
                    <b-form-input :id="`goods_model.${i}.gm_name`" v-model='model.gm_name'></b-form-input>
                    <Validation :error="$store.state.error.validations[`goods_model.${i}.gm_name`]" />
                </b-col>
                <b-col col lg="1">
                    <b-form-input v-model='model.gm_catno' readonly></b-form-input>
                </b-col>
                <b-col col lg="1">
                    <b-form-input :id="`goods_model.${i}.gm_code`" v-model='model.gm_code'></b-form-input>
                    <Validation :error="$store.state.error.validations[`goods_model.${i}.gm_code`]" />
                </b-col>
                <b-col col lg="3">
                    <b-form-input :id="`goods_model.${i}.gm_spec`" v-model='model.gm_spec'></b-form-input>
                    <Validation :error="$store.state.error.validations[`goods_model.${i}.gm_spec`]" />
                </b-col>
                <b-col col lg="1">
                    <b-form-input :id="`goods_model.${i}.gm_unit`" v-model='model.gm_unit'></b-form-input>
                    <Validation :error="$store.state.error.validations[`goods_model.${i}.gm_unit`]" />
                </b-col>
                <b-col col lg="2">
                    <b-input-group size="sm">
                        <b-input-group-prepend is-text>
                            <b-form-checkbox switch class="mr-n2 mb-n1" v-model='model.gm_enable' value="Y" unchecked-value="N" />
                        </b-input-group-prepend>
                        <b-form-input :id="`goods_model.${i}.gm_price`" v-model='model.gm_price' class="text-right"></b-form-input>
                    </b-input-group>
                    <Validation :error="$store.state.error.validations[`goods_model.${i}.gm_price`]" />
                </b-col>
                <b-col col lg="1" class="ctrlBox">
                    <b-button size="sm" variant="success" v-b-toggle="`bundleDc_box${i}`" v-b-tooltip.hover title="묶음 할인"><b-icon icon="tags-fill" /></b-button>
                    <b-button size="sm" variant="danger" @click="removeAtModel(i)" v-b-tooltip.hover title="삭제"><b-icon icon="trash-fill"></b-icon></b-button>

                    <b-collapse :id="`bundleDc_box${i}`" class="bundle_box" @hide="bd_hide(model.bundle_dc)" v-model="model.bd_open">
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
            </b-row>
            <Validation :error="$store.state.error.validations.goods_model" />
            
        </b-container>

        <b-container>
            <b-row>
                <b-col class="btn_box"><b-button variant="info" size="sm" @click="insertAtModel()"><b-icon-plus-lg /> 모델 추가</b-button></b-col>
            </b-row>
        </b-container>
    </b-card>
    <!-- 모델 -->

    <!-- 옵션 -->
    <b-row class="justify-content-center">
        <b-col sm="12" md="10" lg="10">
            <b-card class="adform option">
                <b-container>
                    <b-row>
                        <b-col class="tit">
                            Option
                            <b-button variant="info" size="sm" class="float-right" @click="insertAtOpt()"><b-icon-plus-lg /></b-button>
                        </b-col>
                    </b-row>

                    <b-row class="head cell">
                        <b-col lg="6">옵션명</b-col>
                        <b-col lg="3">항목</b-col>                
                        <b-col>가격</b-col>
                    </b-row>
                    <b-row v-for="(op, idx) in value.option" :key="idx" class="body">
                        <b-col>
                            <span @click="removeAtOpt(idx)"><b-icon-x-circle-fill /></span>
                            <b-form-input v-model='op.op_name' size="sm" />
                            <b-form-checkbox v-model='op.op_required' value="Y" unchecked-value="N" switch class="mt-2">필수 옵션</b-form-checkbox>
                        </b-col>

                        <b-col>
                            <!-- 옵션 아이템 -->
                                    <b-row v-for="(opc, opc_idx) in op.option_child" :key="opc_idx">
                                        <b-col><b-form-input size="sm" v-model="opc.opc_name" /></b-col>
                                        <b-col>
                                            <b-form-input size="sm" v-model="opc.opc_price" />
                                            <span v-if="opc_idx == 0" @click="insertAtOptItem(op.option_child)" class="add"><b-icon-plus-circle-fill /></span>
                                            <span v-else @click="removeAtOptItem(op.option_child, opc_idx)" class="del"><b-icon-x-circle-fill /></span>
                                        </b-col>
                                    </b-row>
                            <!-- 옵션 아이템 -->
                        </b-col>
                    </b-row>
                </b-container>
            </b-card>
        </b-col>
    </b-row>
    <!-- 옵션 -->
</div>
</template>


<script>
import ax from '@/api/http';
import draggable from 'vuedraggable';
import Multiselect from 'vue-multiselect'
import Ckeditor from '@/views/_common/ckeditor5/Ckeditor.vue'
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    name: 'GoodsForm',
    components: {
        draggable,
        Multiselect,
        FileUpload,
        'Validation': () => import('@/views/_common/Validation.vue'),
        'Categorys': () => import('./_comp/Categorys.vue'),
        Ckeditor,
    },
    props: ['value', 'hashs', 'makers', 'purchaseAt'],

    computed: {
        gd_enable_text() {
            return this.value.gd_enable == 'Y' ? "활성" : "비활성";
        },
        getHashOption() {
            let dummy = [];
            for (let i in this.value.hashs) {
                dummy.push({ index: this.value.hashs[i].hs_id, label: this.value.hashs[i].hs_tag })
            }
            return dummy;
        },
    },
    data() {
        return {
            list01: [], list02: [], list03: [], list04: [],
            ca01:{}, ca02:{}, ca03:{}, ca04:{},
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
                Notify.modal("카테고리를 선택하세요.");
            } else {
                let ca = {};
                ca.gc_ca01 = this.ca01.ca_id; ca.gc_ca01_name = this.ca01.ca_name;
                if (!isEmpty(this.ca02)) { ca.gc_ca02 = this.ca02.ca_id; ca.gc_ca02_name = this.ca02.ca_name; }
                if (!isEmpty(this.ca03)) { ca.gc_ca03 = this.ca03.ca_id; ca.gc_ca03_name = this.ca03.ca_name; }
                if (!isEmpty(this.ca04)) { ca.gc_ca04 = this.ca04.ca_id; ca.gc_ca04_name = this.ca04.ca_name; }
                this.value.goods_category.push(ca);
                this.ca01 = this.ca02 = this.ca03 = this.ca04 = 0;
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

        insertAtModel() { this.value.goods_model.push({ gm_name:'', gm_catno:'', gm_code:'', gm_spec:'', gm_unit:'', gm_enable:'Y', gm_price:'', bundle_dc:[], bd_open:false }); },
        removeAtModel(i) {
            if (this.$route.name == 'adm_goods_edit' && this.value.goods_model[i].gm_id) {
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

        insertAtOpt() { this.value.option.push({ op_id:0, op_name:'', option_child:[{ opc_id:0, opc_name:'', opc_price:'' }] }); },
        removeAtOpt(i) { 
            if (this.$route.name == 'adm_goods_edit' && this.value.option[i].op_id) {
                if (!this.value.hasOwnProperty("delete_option"))
                    this.value.delete_option = Array();  
                this.value.delete_option.push(this.value.option[i].op_id);
            }
            this.value.option.splice(i, 1); 
        },

        insertAtOptItem(opc) { opc.push({ opc_id:0, opc_name:'', opc_price:'' }); },
        removeAtOptItem(opc, i) {
            if (this.$route.name == 'adm_goods_edit' && opc[i].opc_id) {
                if (!this.value.hasOwnProperty("delete_option_child"))
                    this.value.delete_option_child = Array();  
                this.value.delete_option_child.push(opc[i].opc_id);
            }
            opc.splice(i, 1); 
        },

        bd_hide(bd) { for (let key in bd) { if(bd[key].bd_ea == '' || bd[key].bd_price == '') bd.splice(key, 1); } },
        
        addTag (newTag) {
            const tag = { hs_id: 0, hs_tag: newTag };
            this.value.hash_join.push(tag);
            this.hashs.push(tag);
        }
    },
    mounted() { this.getCate(0); },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="css" scoped>


.cate .selecter { border-bottom:2px solid #000; padding-bottom:1rem; margin-bottom:1rem; }
.cate .selecter div:first-child { display:flex; flex-wrap:wrap; padding:0; }
.cate .selected:not(:last-child) { border-bottom: 1px solid #ccc; }
.cate .selected .col { display:flex; align-items:center; padding:.5rem; }
.cate .selected .col .btn { padding:0 3px; margin-left:2rem; }
.cate .selected .col>svg { margin:0 1rem; font-size:1.5rem; color:#000; }




.model .head .col { text-align:center; }
.model .row .col .bundle_box { position:absolute; top:2rem; right:0; width:300px; margin-top:.5rem; z-index:1; }
.model .row .col .bundle_box .card { margin-top:0; }
.model .row .col .bundle_box .card header button { padding-top: 0.1rem; padding-bottom: 0.1rem; float:right; }
.model .row .col.ctrlBox { text-align:right; }
.model .row .col.ctrlBox button { padding-left:.4rem; padding-right:.4rem; }


.option.adform .row .label { flex:0 0 12%; max-width:12%; }
.option.adform .row .label + .type04 { flex: 0 0 29.666667%; max-width:29.666667%; }
.option.adform .row .label + .type05 { flex: 0 0 38%; max-width:38%; }
.option.adform .row .col .btn-xm { padding:.1rem .2rem; font-size: 0.7rem; }

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
