<template lang="html">
    <div id="adm_estimate_create">
        <b-card no-body class="shadow mb-2 sticky-top p-2">
            <b-container>
                <div class="row">
                    <div class="col-4">
                        <router-link :to="{name: 'adm_estimate_index'}" class="btn btn-sm btn-light"><b-icon-list /> 목록</router-link>
                    </div>
                    <b-col cols="1" offset="2" class="awesome_p">
                        <input v-model="frm.all_dc" id="all_dc" type="number" min="0" max="99" class="text-right" required />
                        <label for="all_dc">일괄할인</label>
                    </b-col>
                    <b-col cols="1">
                        <b-form-checkbox size="sm" v-model="frm.no_delivery_fee">배송료 제외</b-form-checkbox>
                    </b-col>
                    <b-col cols="1">
                        <b-form-checkbox size="sm" v-model="frm.no_shipping_fee">항공료 제외</b-form-checkbox>
                    </b-col>

                    <!-- <b-col cols="2" class="awesome_p">
                        <input v-model="frm.er_all_price" id="er_all_price" min="0" class="text-right" required />
                        <label for="er_all_price">총 금액</label>
                    </b-col> -->
                    <div class="col-3 text-right">
                        <b-button size="sm" variant="info" @click="store"><b-icon-search /> 미리보기</b-button>
                            <b-button size="sm" variant="success" @click="store('store')"><font-awesome-icon icon="save" /> 저장</b-button>
                        <b-button size="sm" variant="primary" @click="store('send')"><b-icon-mailbox /> 발송</b-button>
                    </div>
                </div>
            </b-container>
        </b-card>

        <b-card class="user">
            <template #header><b>수신처</b></template>
            <b-container>
                <b-row>
                    <b-col>
                        <UserInput v-model="frm.eq_name" :type="'name'" :frm="frm" />
                        <Validation :error="$store.state.error.validations.eq_name" />
                    </b-col>
                    <b-col>
                        <UserInput v-model="frm.eq_email" :type="'email'" :frm="frm" />
                        <Validation :error="$store.state.error.validations.eq_email" />
                    </b-col>
                    <b-col>
                        <UserInput v-model="frm.eq_department" :type="'department'" :frm="frm" />
                        <Validation :error="$store.state.error.validations.eq_department" />
                    </b-col>
                    <b-col>
                        <UserInput v-model="frm.eq_hp" :type="'hp'" :frm="frm" />
                        <Validation :error="$store.state.error.validations.eq_hp" />
                    </b-col>

                    <b-col class="awesome_p">
                        <input type="text" id="eq_tel" v-model="frm.eq_tel" :formatter="formatTel" required />
                        <label for="eq_tel">전화</label>
                    </b-col>
                    <b-col class="awesome_p">
                        <input type="text" id="eq_fax" v-model="frm.eq_fax" :formatter="formatTel" required />
                        <label for="eq_fax">팩스</label>
                    </b-col>
                </b-row>
                <b-row v-if="this.$route.query.eq_id">
                    <b-col cols="12">
                        <hr />
                    </b-col>
                    <b-col class="awesome_p">
                        <textarea id="'eq_content" v-model="frm.eq_content" rows="5" required readonly /></textarea>
                        <label for="eq_content">요청내용</label>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card class="em_info mt-3" footer-class="text-right py-2">
            <template #header><b>견적 상품</b></template>
                <!--    이중(중첩)루프 순번을 넣기위한 공
                        {{ frm.estimate_goods.slice(0, gi).reduce((total, ch)=>total+=ch.estimate_model.length, 0) + mi + 1}}   -->
                <b-container v-for="(em, mi) in frm.estimate_model" :key="mi" class="gd_list">
                    <b-row class="mb-2">
                        <b-col>
                            <font-awesome-icon icon="tags" class="mr-2" /> {{mi+1}}.
                            <div class="flag_tag tag_red" v-if="em.bundle_dc && em.bundle_dc.length">묶음 할인</div>
                            <div class="flag_tag tag_green" v-if="em.goods.purchase_at">매입처 상품</div>
                        </b-col>
                        <b-col class="text-right">
                            <b-button variant="outline-danger" size="sm" @click="emDel(mi)" v-if="(mi!=0)">
                                <b-icon-x-square-fill />
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col class="awesome_p">
                            <input type="text" :id="'estimate_model.'+mi+'.em_name'" v-model="em.em_name" required />
                            <label :for="'estimate_model.'+mi+'.em_name'">제품명</label>
                            <Validation :error="$store.state.error.validations['estimate_model.'+mi+'.em_name']" />
                        </b-col>
                        <b-col>
                            <ModelSchInput v-model="em.em_catno" :type="'em_catno'" :id="'em_catno'+mi" :em="em" />
                        </b-col>
                        <b-col>
                            <ModelSchInput v-model="em.em_code" :type="'em_code'" :id="'estimate_model.'+mi+'.em_code'" :em="em" />
                            <Validation :error="$store.state.error.validations['estimate_model.'+mi+'.em_code']" />
                        </b-col>
                        <b-col class="awesome_p">
                            <input type="text" :id="'em_unit'+mi" v-model="em.em_unit" required />
                            <label :for="'em_unit'+mi">판매단위</label>
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col class="awesome_p">
                            <input type="text" :id="'em_maker'+mi" v-model="em.em_maker" required />
                            <label :for="'em_maker'+mi">제조사</label>
                        </b-col>
                        <b-col class="awesome_p">
                            <EaInput
                                v-model="em.em_ea"
                                :id="'estimate_model.'+mi+'.em_ea'"
                                :em="em"
                                @calculator="calculator"
                            />
                            <label :for="'estimate_model.'+mi+'.em_ea'">수량</label>
                            <Validation :error="$store.state.error.validations['estimate_model.'+mi+'.em_ea']" />
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col class="awesome_p">
                                    <PriceInput
                                        v-model="em.em_price"
                                        :id="'estimate_model.'+mi+'.em_price'"
                                        @calculator="calculator"
                                    />
                                    <label :for="'estimate_model.'+mi+'.em_price'">판매단가({{em.em_cost_price | comma}})</label>
                                    <Validation :error="$store.state.error.validations['estimate_model.'+mi+'.em_price']" />
                                </b-col>
                                <b-col class="awesome_p">
                                    <DcLateInput
                                        v-model="em.em_dc_rate"
                                        :id="'em_dc_rate'+mi"
                                        :em="em"
                                    />
                                    <label :for="'em_dc_rate'+mi">할인율</label>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col class="awesome_p">
                            <input type="text" :id="'estimate_model.'+mi+'.em_dlvy_at'" v-model="em.em_dlvy_at" required />
                            <label :for="'estimate_model.'+mi+'.em_dlvy_at'">납품기일</label>
                            <Validation :error="$store.state.error.validations['estimate_model.'+mi+'.em_dlvy_at']" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="awesome_p">
                            <textarea :id="'estimate_model.'+mi+'.em_spec'" v-model="em.em_spec" rows="3" required /></textarea>
                            <label :for="'estimate_model.'+mi+'.em_spec'">제품정보</label>
                            <Validation :error="$store.state.error.validations['estimate_model.'+mi+'.em_spec']" />
                        </b-col>
                    </b-row>
                    <b-row class="opt_ctrl">
                        <b-col><b-button variant="warning" size="xm" @click="openOption(mi, em.em_gd_id)"><b-icon-search /> 옵션</b-button></b-col>
                    </b-row>

                    <OptionAdd ref="option_add"
                        v-model="em.estimate_option"
                        :em_id="em.em_id"
                        :gd_id="em.em_gd_id"
                        @calculator="calculator"
                    />

                    <b-row v-if="em.estimate_option.length" v-for="(eo, oi) in em.estimate_option" :key="'op'+mi+'_'+oi" class="op_list mt-3" align-h="end">
                        <b-col cols="2">{{eo.eo_tit}}: {{eo.eo_name}}</b-col>
                        <b-col cols="2" class="awesome_p">
                            <EaInput
                                v-model="eo.eo_ea"
                                :id="'eo_ea'+mi+'_'+oi"
                                @calculator="calculator"
                            />
                            <label :for="'eo_ea'+mi+'_'+oi">수량</label>
                        </b-col>
                        <b-col cols="2">
                            <div class="awesome_p">
                                <PriceInput
                                    v-model="eo.eo_price"
                                    :id="'eo_price'+mi+'_'+oi"
                                    @calculator="calculator"
                                />
                                <label :for="'eo_price'+mi+'_'+oi">판매단가</label>
                                <b-button variant="danger" size="sm" @click="delOption(mi, oi)">X</b-button>
                            </div>
                        </b-col>
                    </b-row>
                </b-container>
            <template #footer>
                <b-button variant="outline-primary" size="sm" @click="emAdd"><b-icon-plus-square-fill /> 추가</b-button>
            </template>
        </b-card>

        <b-card body-class="p-3" class="extra mt-3">
            <template #header><b>추가정보</b></template>
            <b-container>
                <b-row>
                    <b-col cols="2">
                        <b-row class="mb-5">
                            <b-col class="awesome_p">
                                <input type="text" id="er_dlvy_at" v-model="frm.er_dlvy_at" required v-b-tooltip.hover title="입력예: 2주이내, 1개월 이내" />
                                <label for="er_dlvy_at">납품기일</label>
                                <Validation :error="$store.state.error.validations.er_dlvy_at" />
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class="awesome_p force">
                                <b-input-group size="sm">
                                    <b-form-input v-model="frm.er_effective_at" id="er_effective_at" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate" required></b-form-input>
                                    <b-input-group-append>
                                        <b-form-datepicker v-model="frm.er_effective_at" size="sm" button-only right></b-form-datepicker>
                                    </b-input-group-append>
                                </b-input-group>
                                <label for="er_effective_at">견적유효기간</label>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col class="awesome_p">
                        <textarea id="'er_content" v-model="frm.er_content" rows="5" required /></textarea>
                        <label for="er_content">추가정보</label>
                    </b-col>
                    <b-col cols="6">
                        <AddFile
                            v-if="frm.file_info"
                            :file_info='frm.file_info'
                            @fileUp="pushFileInfo"
                            @fileDel="delFileInfo"
                            :fi_type = "'estimateReply'"
                            :fi_path = "''"
                            :is_thumb = "0"
                        />
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
    </div>
</template>

<script>
import ax from '@/api/http';
import moment from 'moment';
import copy from "fast-copy";
import OptionAdd from "./_comp/OptionAdd.vue";

export default {
    components: {
        OptionAdd,
        'PriceInput': () =>     import('./_comp/PriceInput.vue'),
        'DcLateInput': () =>    import('./_comp/DcLateInput.vue'),
        'ModelSchInput': () =>  import('./_comp/ModelSchInput.vue'),
        'UserInput': () =>      import('./_comp/UserInput.vue'),
        'EaInput': () =>        import('./_comp/EaInput.vue'),
        'AddFile': () =>        import('../../_module/AddFile.vue'),
        'Validation': () => import('@/views/_common/Validation.vue'),
    },
    watch: {
        'frm.all_dc': {
            handler(n, o) {
                console.log(o, n);
                for (var em of this.frm.estimate_model) {
                    em.em_dc_rate = n;
                    em.em_price = Math.ceil(Number(em.em_cost_price)*((100 - Number(n))/100));
                }


            },
        },
    },
    data() {
        return {
            frm:{
                all_dc: 0,
                no_shipping_fee: 'N',
                no_delivery_fee: 'N',
                eq_name:'',
                er_effective_at:moment().add(14,'days').format('YYYY-MM-DD'),//.('YYYY-MM-DD'),
                estimate_model:[],
                file_info:[],
                er_gd_price:0,
                er_dlvy_price:0,
                er_all_price:0,
                er_surtax:0,
            },
            em:{
                em_gd_id : '',
                em_gm_id : '',
                em_name : '',
                em_catno01 : '',
                em_catno02 : '',
                em_catno03 : '',
                em_code : '',
                em_unit : '',
                em_maker : '',
                em_ea : '',
                em_cost_price : 0,
                em_dc_rate : '',
                em_price : 0,
                em_dlvy_at : '',
                em_spec : '',
                goods:{},
                //  estimate_option:[],
                //  estimate_option을 여기에 넣으면 같은 메모리를 참조해서
                //  다른 상품 옵션도 같이 변경되거나 추가 된다.
            },
        }
    },
    computed: {
        // estimate_goods_Mapped(){
        //     let globalIndex = 1;
        //     return this.frm.estimate_goods.map(c => {
        //
        //         const newGC = c.estimate_model.map(g => {
        //             return {
        //                 ...g,
        //                 gi: globalIndex++
        //             }
        //         })
        //
        //         return {
        //             ...c,
        //             estimate_model: newGC
        //         }
        //     });
        // },
    },
    methods: {
        async create() {
            try {
                const res = await ax.get(`/api/admin/shop/estimate/create`, {params:{eq_id:this.$route.query.eq_id}});
                if (res && res.status === 200) {
                    this.frm = Object.assign(
                        {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                        this.frm, // 수정하려는 객체
                        res.data
                    );
                    // this.calculatorPrice();
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        emAdd(){
            //  vue는 얉은 복사(복사를 해도 계속 참조)이어서 이렇게 해야 깊은 복사(새로운 메모리 참조)가 된다.
            //  이렇게 안하면 복사된것들이 모두 같은 값이 들어가 버린다.
            var nEm = Object.assign(
                {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                this.em // 삽입하려는 내용
            );

            nEm.estimate_option=[];
            //  여기서 estimate_option를 넣어줘야 새로운 메모리 생성
            this.frm.estimate_model.push(nEm);
        },
        async emDel(i){
            var rst = await Notify.confirm('삭제', 'danger');
            if (rst)
                this.frm.estimate_model.splice(i, 1);
        },
        async store(type){
            switch (type) {
                case 'store': this.frm.er_step = 0; break;
                case 'send': this.frm.er_step = 1; break;
            }
            try {
                const res = await ax.post(`/api/admin/shop/estimate/`, this.frm);
                if (res && res.status === 200) {
                    this.$router.push({ name: 'adm_estimate_show_reply', params: { er_id:res.data } })
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        pushFileInfo(fi) {
            this.frm.file_info.push(fi);
        },
        delFileInfo(fi_id) {
            let pIndex = -1;
            for (let key in this.frm.file_info) {
                if(this.frm.file_info[key].fi_id === fi_id) {
                    pIndex = key;
                    break;
                }
            }
            this.frm.file_info.splice(pIndex, 1);
        },
        openOption(i, id){
            this.$refs.option_add[i].getOption(id);
        },
        delOption(mi, oi) {
            this.frm.estimate_model[mi].estimate_option.splice(oi, 1);
        },
        calculator() {
            let collect = {};
            let pa_id = 0;
            let dlvy_p = 0;
            for (var em of this.frm.estimate_model) {
                if (em.goods.purchase_at)
                    pa_id = em.goods.gd_pa_id;
                if (!collect.hasOwnProperty(pa_id)) {
                    if (pa_id>0)
                        collect[pa_id] = { 'goods_p':0, 'dlvy_p':Number(em.goods.purchase_at.pa_price_add_vat)};
                    else
                        collect[pa_id] = { 'goods_p':0, 'dlvy_p':Number(em.goods.dlvy_fee_add_vat), 'free_dlvy_max':Number(em.goods.free_dlvy_max)};
                }
                collect[pa_id].goods_p += Number(em.em_price) * Number(em.em_ea);
                for (var eo of em.estimate_option)
                    collect[pa_id].goods_p += Number(eo.eo_price) * Number(eo.eo_ea);
            }
            console.log(collect);
            this.frm.er_gd_price = Object.values(collect).reduce((acc, el) => acc + el.goods_p, 0);
            this.frm.er_surtax = this.frm.er_gd_price*0.1;
            for (var key in collect) {
                let pa = collect[key];
                if (key>0 || (key<1 && pa.goods_p < pa.free_dlvy_max))
                    dlvy_p += Number(pa.dlvy_p);
            }
            this.frm.er_dlvy_price = dlvy_p;
            this.frm.er_all_price = this.frm.er_gd_price+this.frm.er_surtax+this.frm.er_dlvy_price;
        },
    },
    mounted : async function(){
        if (this.$route.query.eq_id) {
            this.create();
        } else {
            const res = await ax.get(`/api/admin/shop/goods/0`);
            if (res && res.status === 200) {
                this.em.goods = res.data;
                this.emAdd();
            }
        }
    },
}
</script>

<style lang="css" scoped>

#adm_estimate_create .gd_list  { border-bottom: 2px solid #f1f1f1; margin-top:3rem; padding-bottom: 3rem; }
#adm_estimate_create .gd_list:last-child { border-width:0; }
#adm_estimate_create .opt_ctrl { position:relative; }
#adm_estimate_create .opt_ctrl div button { position:absolute; bottom:0; right:0; overflow:hidden; transform:translateX(95%); }
@media (min-width: 1200px) {
    #adm_estimate_create .opt_ctrl div button { width:20px; white-space:nowrap; transition:all .2s ease; }
    #adm_estimate_create .opt_ctrl div button:hover { width:45.4px; }
}

</style>
