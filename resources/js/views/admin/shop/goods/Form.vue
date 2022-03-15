<template lang="html">
    <div class="adm_goods_frm">
        <b-card id="goods_cate" header-tag="header">
            <template #header><b>상품 카테고리</b></template>
            <b-container fluid>
                <b-row>
                    <b-col sm="12" md="11" class="select_cate">
                        <b-col sm="12" md="6" lg="3">
                            <select class="custom-select" id="goods_category" v-model="ca01" @change="getCate(1)">
                                <option value=0>◄ 카테고리 1 ►</option>
                                <option v-for="opt in list01" :value="{ ca_id: opt.ca_id, ca_name: opt.ca_name }">{{ opt.ca_name }}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="6" lg="3">
                            <select class="custom-select" v-model="ca02" @change="getCate(2)">
                                <option value="0">◄ 카테고리 2 ►</option>
                                <option v-for="opt in list02" :value="{ ca_id: opt.ca_id, ca_name: opt.ca_name }">{{ opt.ca_name }}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="6" lg="3">
                            <select class="custom-select" v-model="ca03" @change="getCate(3)">
                                <option value="0">◄ 카테고리 3 ►</option>
                                <option v-for="opt in list03" :value="{ ca_id: opt.ca_id, ca_name: opt.ca_name }">{{ opt.ca_name }}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="6" lg="3">
                            <select class="custom-select" v-model="ca04">
                                <option value="0">◄ 카테고리 4 ►</option>
                                <option v-for="opt in list04" :value="{ ca_id: opt.ca_id, ca_name: opt.ca_name }">{{ opt.ca_name }}</option>
                            </select>
                        </b-col>
                    </b-col>
                    <b-col cols="12" lg="1">
                        <b-button variant="primary" block @click="add_cate"><b-icon-arrow-return-left /> 추가</b-button>
                    </b-col>
                </b-row>
                <b-row cols="12" class="selected">
                    <b-col>
                        <b-input-group size="sm" v-for="(ca, i) in value.goods_category" :key="i">
                            <div class="gbody">
                                <span>{{ca.gc_ca01_name}}</span>
                                <template v-if="ca.gc_ca02">
                                    <b-icon-chevron-right/>
                                    <span>{{ca.gc_ca02_name}}</span>
                                </template>
                                <template v-if="ca.gc_ca03">
                                    <b-icon-chevron-right/>
                                    <span>{{ca.gc_ca03_name}}</span>
                                </template>
                                <template v-if="ca.gc_ca04">
                                    <b-icon-chevron-right/>
                                    <span>{{ca.gc_ca04_name}}</span>
                                </template>
                            </div>
                            <b-input-group-append>
                                <b-button variant="danger" @click="removeCate(i)"><b-icon-trash-fill /></b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                <Validation :error="$store.state.error.validations.goods_category" />

            </b-container>
        </b-card>

        <b-card id="goods_info" header-tag="header">
            <template #header><b>상품정보</b></template>
            <b-container fluid>
                <b-row>
                    <b-col tag="label" cols="5">
                        <b>상품명</b>
                        <b-form-input id="gd_name" v-model="value.gd_name" />
                        <Validation :error="$store.state.error.validations.gd_name" />
                    </b-col>
                    <b-col tag="label" cols="2">
                        <b>제조사</b>
                        <select class="custom-select" id="gd_mk_id" v-model="value.gd_mk_id">
                            <option value="0">◄ 제조사 ►</option>
                            <option v-for="opt in makers" :value="opt.mk_id">{{ opt.mk_name }}</option>
                        </select>
                        <Validation :error="$store.state.error.validations.gd_mk_id" />
                    </b-col>
                    <b-col tag="label" cols="3">
                        <b>납기일</b>
                        <b-form-input id="gd_dlvy_at" v-model="value.gd_dlvy_at" />
                        <Validation :error="$store.state.error.validations.gd_dlvy_at" />
                    </b-col>
                    <b-col tag="label" cols="2">
                        <b>활성화</b>
                        <b-form-checkbox switch size="lg" v-model="value.gd_enable" value="Y" unchecked-value="N">{{gd_enable_text}}</b-form-checkbox>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col tag="label">
                        <b>키워드</b>
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
                    <b-col tag="label" cols="2">
                        <b>매입처 직배송</b>
                        <select class="custom-select" v-model="value.gd_pa_id">
                            <option value="0">◄ 매입처 직배송 ►</option>
                            <option v-for="opt in purchaseAt" :value="opt.pa_id">{{ opt.pa_name }}</option>
                        </select>
                    </b-col>
                    <b-col tag="label" cols="2">
                        <b>관리자 정보</b>
                        <b-form-input v-model="value.gd_mng_info" />
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b>상품 설명</b>
                        <Ckeditor v-model="value.gd_desc" />
                        <Validation :error="$store.state.error.validations.gd_desc" />
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b>영상 정보</b>
                        <b-form-textarea v-model="value.gd_video" placeholder="영상 태그 입력" rows="2" />
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card id="goods_file" header-tag="header">
            <template #header><b>파일 등록</b></template>
            
            <b-row><b-col><b>상품 이미지</b></b-col></b-row>
            <file-upload ref="fileupload1" v-model="value.file_goods_goods" :fi_group="'goods'" :fi_kind="'goods'" :is_thumb="true" />
            
            <b-row><b-col><b>첨부 파일</b></b-col></b-row>
            <file-upload ref="fileupload2" v-model="value.file_goods_add" :fi_group="'goods'" :fi_kind="'add'" />
        </b-card>

        <!-- 모델 -->
    	<b-card id="goods_model" tabindex="-1" header-tag="header" footer-tag="footer">
            <template #header><b>Model</b></template>
            <b-container fluid>
                
                <b-row v-for="(model, idx) in value.goods_model" :key="idx">
                    <b-col col lg="3">
                        <b-form-input :id="'goods_model.'+idx+'.gm_name'" v-model='model.gm_name' placeholder="제품명" v-b-tooltip.hover title="제품명"></b-form-input>
                        <Validation :error="$store.state.error.validations['goods_model.'+idx+'.gm_name']" />
                    </b-col>
                    <b-col col lg="1">
                        <b-form-input v-model='model.gm_catno' placeholder="Cat.No" readonly v-b-tooltip.hover title="CAT.No"></b-form-input>
                        <Validation :error="$store.state.error.validations['goods_model.'+idx+'.gm_catno']" />
                    </b-col>
                    <b-col col lg="1">
                        <b-form-input :id="'goods_model.'+idx+'.gm_code'" v-model='model.gm_code' placeholder="모델명" v-b-tooltip.hover title="모델명"></b-form-input>
                        <Validation :error="$store.state.error.validations['goods_model.'+idx+'.gm_code']" />
                    </b-col>
                    <b-col col lg="3">
                        <b-form-input :id="'goods_model.'+idx+'.gm_spec'" v-model='model.gm_spec' placeholder="스펙" v-b-tooltip.hover title="스펙"></b-form-input>
                        <Validation :error="$store.state.error.validations['goods_model.'+idx+'.gm_spec']" />
                    </b-col>
                    <b-col col lg="1">
                        <b-form-input :id="'goods_model.'+idx+'.gm_unit'" v-model='model.gm_unit' placeholder="판매단위" v-b-tooltip.hover title="판매단위"></b-form-input>
                        <Validation :error="$store.state.error.validations['goods_model.'+idx+'.gm_unit']" />
                    </b-col>
                    <b-col col lg="2">
                        <b-input-group>
                            <b-input-group-prepend is-text v-b-tooltip.hover title="판매 가능 여부">
                                <b-form-checkbox switch class="mr-n2" v-model='model.gm_enable' value="Y" unchecked-value="N"></b-form-checkbox>
                            </b-input-group-prepend>
                            <b-form-input :id="'goods_model.'+idx+'.gm_price'" v-model='model.gm_price' class="text-right" placeholder="가격" v-b-tooltip.hover title="가격"></b-form-input>
                        </b-input-group>
                        <Validation :error="$store.state.error.validations['goods_model.'+idx+'.gm_price']" />
                    </b-col>
                    <b-col col lg="1" class="ctrlBox">
                        <b-button size="sm" variant="success" v-b-toggle="'bundleDc_box'+idx" v-b-tooltip.hover title="묶음 할인"><b-icon icon="tags-fill" /></b-button>
                        <b-button size="sm" variant="danger" @click="removeAtModel(idx)" v-b-tooltip.hover title="삭제"><b-icon icon="trash-fill"></b-icon></b-button>

                        <b-collapse :id="'bundleDc_box'+idx" class="bundle_box" @hide="bd_hide(model.bundle_dc)" v-model="model.bd_open">
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

            <template #footer>
                <div class="text-right">
                    <b-button variant="info" size="sm" @click="insertAtModel()"><b-icon icon="plus-square-fill"></b-icon> 모델 추가</b-button>
                </div>
            </template>
        </b-card>
    	<!-- 모델 -->

        <!-- 옵션 -->
        <b-card id="goods_option" header-tag="header" footer-tag="footer">
            <template #header><b>Option</b></template>
            <b-container fluid>
                <b-row v-for="(op, idx) in value.option" :key="idx">
                    <b-col col lg="4">
                        <b-form-input v-model='op.op_name' placeholder="옵션명" v-b-tooltip.hover title="옵션명"></b-form-input>
                        <b-form-checkbox v-model='op.op_required' value="Y" unchecked-value="N" switch class="mt-2">필수 옵션</b-form-checkbox>
                    </b-col>

                    <b-col col lg="7">
                        <!-- 옵션 아이템 -->
                        <b-card id="goods_option_child" header-tag="header" footer-tag="footer" class="shadow">
                            <template #header><b>Option - Item</b></template>

                            <b-row v-for="(opc, opc_idx) in op.option_child" :key="opc_idx">
                                <b-col col lg="6">
                                    <b-form-input size="sm" v-model="opc.opc_name" placeholder="옵션항목" v-b-tooltip.hover title="옵션항목"></b-form-input>
                                </b-col>
                                <b-col col lg="5">
                                    <b-form-input size="sm" v-model="opc.opc_price" placeholder="가격" v-b-tooltip.hover title="가격"></b-form-input>
                                </b-col>
                                <b-col col lg="1" class="ctrlBox">
                                    <b-button v-if="opc_idx !== 0" size="sm" variant="danger" @click="removeAtOptItem(op.option_child, opc_idx)"><b-icon icon="trash-fill"></b-icon></b-button>
                                </b-col>
                            </b-row>

                            <template #footer>
                                <div class="text-right">
                                    <b-button variant="info" size="sm" @click="insertAtOptItem(op.option_child)"><b-icon icon="plus-square-fill"></b-icon> 아이템 추가</b-button>
                                </div>
                            </template>
                        </b-card>
                        <!-- 옵션 아이템 -->
                    </b-col>

                    <b-col col lg="1" class="ctrlBox">
                        <b-button size="sm" variant="danger" @click="removeAtOpt(idx)"><b-icon icon="trash-fill" /></b-button>
                    </b-col>
                </b-row>
            </b-container>

            <template #footer>
                <div class="text-right">
                    <b-button variant="info" size="sm" @click="insertAtOpt()"><b-icon icon="plus-square-fill" /> 옵션 추가</b-button>
                </div>
            </template>
        </b-card>
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
            list01: [],
            list02: [],
            list03: [],
            list04: [],
            
            
            ca01:{},
            ca02:{},
            ca03:{},
            ca04:{},

        }
    },
    methods: {
        async getCate(dp) {
            
                let id = 0;

                if(dp == 0) id=0;
                else if(dp == 1 && !isEmpty(this.ca01)) id=this.ca01.ca_id;
                else if(dp == 2 && !isEmpty(this.ca02)) id=this.ca02.ca_id;
                else if(dp == 3 && !isEmpty(this.ca03)) id=this.ca03.ca_id;
      
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
       
        },
        add_cate() {
            if (isEmpty(this.ca01)) {
                Notify.modal("카테고리를 선택하세요.");
            } else {
                let ca = {};
                if (!isEmpty(this.ca01)) { ca.gc_ca01 = this.ca01.ca_id; ca.gc_ca01_name = this.ca01.ca_name; }
                if (!isEmpty(this.ca02)) { ca.gc_ca02 = this.ca02.ca_id; ca.gc_ca02_name = this.ca02.ca_name; }
                if (!isEmpty(this.ca03)) { ca.gc_ca03 = this.ca03.ca_id; ca.gc_ca03_name = this.ca03.ca_name; }
                if (!isEmpty(this.ca04)) { ca.gc_ca04 = this.ca04.ca_id; ca.gc_ca04_name = this.ca04.ca_name; }
                this.value.goods_category.push(ca);
                this.ca04 = 0;
                this.ca03 = 0;
                this.ca02 = 0;
                this.ca01 = 0;
            }
        },

        removeCate(i) {
            if (this.$route.name == 'adm_goods_edit' && this.value.goods_category[i].gc_id) {
                if (!this.value.hasOwnProperty("delete_goods_category"))
                    this.value.delete_goods_category = Array();  
                this.value.delete_goods_category.push(this.value.goods_category[i].gc_id);
            }
            this.value.goods_category.splice(i, 1); 
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
<style lang="css">
.adm_goods_frm .card { margin-top:2rem; box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);}
.adm_goods_frm .card .card-body .row { margin-top:1rem; }
.adm_goods_frm #goods_cate .card-body .row:nth-child(1) .col .row { margin-top:0; }
.adm_goods_frm #goods_cate .card-body .select_cate { display:flex; flex-wrap:wrap; padding:0; }
.adm_goods_frm #goods_cate .card-body .selected .col .input-group { PADDING:.5rem 0; }
.adm_goods_frm #goods_cate .card-body .selected .col .input-group:not(:last-child) { border-bottom: 1px solid #ccc; }
.adm_goods_frm #goods_cate .card-body .selected .col .input-group .gbody { position:relative; flex:1 1 auto; width:1%; min-width:0; margin-bottom:0; }
.adm_goods_frm #goods_cate .card-body .selected .col .input-group .gbody span { font-size:1.2rem; margin-right:1rem; }
.adm_goods_frm #goods_cate .card-body .selected .col .input-group .gbody svg { margin-right:1rem; }

#goods_model .card-body { padding-left:.5rem; padding-right:.5rem; }
#goods_model .card-body .row .col { padding-left:10px; padding-right:10px; }
#goods_model .card-body .row .col .bundle_box { position:absolute; top:2rem; right:0; width:300px; margin-top:.5rem; z-index:1; }
#goods_model .card-body .row .col .bundle_box .card { margin-top:0; }
#goods_model .card-body .row .col .bundle_box .card header button { padding-top: 0.1rem; padding-bottom: 0.1rem; float:right; }
#goods_model .card-body .row .col.ctrlBox button { padding-left:.4rem; padding-right:.4rem; }

#goods_option_child { margin-top:0; }
</style>
