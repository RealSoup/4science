<template>
<div id="adm_estimate_show" class="p_wrap">
    <div class="print_area">
        <h3 class="p_tit">견적 요청</h3>
        <b-card no-body class="ctrl">
            <b-container>
                <b-row>
                    <b-col>
                        <b-button variant="danger" size="sm" @click="destroy"><b-icon icon="trash-fill" /> 삭제</b-button>
                    </b-col>
                    <b-col class="text-right">
                        <b-input-group size="sm">
                            <b-input-group-prepend class="bg-light btn_group">
                                <b-button :to="{name: 'adm_estimate_index'}" variant="light"><b-icon icon="list-ul" /> 목록</b-button>
                                <b-button @click="print"> 인쇄</b-button>
                            </b-input-group-prepend>
                            <b-form-select v-model="frm.eq_step">
                                <b-form-select-option value="DONOT">미처리</b-form-select-option>
                                <b-form-select-option value="DOING">처리중</b-form-select-option>
                                <b-form-select-option value="DONE">완료</b-form-select-option>
                                <b-form-select-option value="CANCEL">취소</b-form-select-option>
                            </b-form-select>
                            <b-input-group-append>
                                <b-button variant="warning" @click="update"><b-icon icon="tools" /> 진행현황 수정</b-button>
                                <b-button variant="success" :to="{name: 'adm_estimate_show_reply', params: { er_id:frm.estimate_reply[frm.estimate_reply.length-1].er_id }}" v-if="frm.estimate_reply && frm.estimate_reply.length>0">
                                    <b-icon-newspaper /> 견적서 확인
                                </b-button>
                                <b-button variant="light" :to="{name: 'adm_estimate_create', query: { eq_id:frm.eq_id }}" v-else>
                                    <b-icon-pencil-square /> 견적서 작성
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
        
        <b-card>
            <b-container>
                <b-row class="eq_info">
                    <b-col>
                        <div>
                            <span><font-awesome-icon icon="tags" />{{ frm.eq_id }}</span>
                            <span><font-awesome-icon icon="clock" />{{ frm.created_at | formatDate }}</span>
                            <span><b-icon-bar-chart-steps />
                                <template v-if="frm.eq_step === 'DONOT'">미처리</template>
                                <template v-else-if="frm.eq_step === 'DOING'">처리중</template>
                                <template v-else-if="frm.eq_step === 'DONE'">완료</template>
                                <template v-else-if="frm.eq_step === 'CANCEL'">취소</template>
                            </span>
                        </div>

                        <div>
                            <span><font-awesome-icon icon="user" />{{ frm.eq_name }}</span>
                            <span><font-awesome-icon icon="users" />{{ frm.eq_department }}</span>
                        </div>
                        <div>
                            <span><font-awesome-icon icon="phone" />{{ frm.eq_tel }}</span>
                            <span><font-awesome-icon icon="mobile-alt" />{{ frm.eq_hp }}</span>
                            <span><font-awesome-icon icon="fax" />{{ frm.eq_fax }}</span>
                            <span><font-awesome-icon icon="at" />{{ frm.eq_email }}</span>
                        </div>

                        <div v-if="Number(frm.eq_1depth)">
                            <h5>주문제작 정보: {{frm.made_cate[frm.eq_1depth]}}</h5>
                            <component ref="custom_sub" :is="choiceSubType" v-model="frm.estimate_custom" />
                        </div>
                        
                        <div v-if="frm.eq_content">
                            <span class="content"><font-awesome-icon icon="comment-dots" />{{ frm.eq_content }}</span>
                        </div>
                        <div v-if="frm.file_info.length">
                            <span>
                                <b-icon icon="file-earmark-arrow-down-fill"></b-icon>
                                <template v-for="(file, i) in frm.file_info">
                                    <b-button size="sm" variant="outline-info" class="mr-2" @click="fileDown(file.down_path, file.fi_original)" :key="i">
                                        {{file.fi_original}}
                                    </b-button>
                                </template>
                            </span>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card class="gd_box" v-if="frm.estimate_model && frm.estimate_model.length">
            <div class="tit">견적요청 상품</div>
            <b-container>
                <b-row v-for="em in frm.estimate_model" :key="em.em_id" class="gd_list">
                    <b-col>
                        <b-button variant="outline-primary" size="sm" @click="openWinPop(`/admin/shop/goods/${em.em_gd_id}/edit`, 1700, 900)" >
                            <img :src="em.img_src" />
                        </b-button>
                        <b class="gd_name">{{em.em_name}}</b>
                        <b class="divider">/</b>
                        {{em.em_code}}
                        <b class="divider">/</b>
                        {{em.em_catno}}
                        <b class="divider">/</b>
                        {{em.em_maker}}
                        <b class="divider">/</b>
                        {{em.em_unit}}
                    </b-col>
                    <b-col>{{em.em_spec}}</b-col>
                    <b-col tag="i">수량 : <b>{{em.em_ea | comma}}</b> 개</b-col>
                    <b-col cols="12" v-if="em.estimate_option.length" class="opc">
                        <b-row v-for="option in em.estimate_option" :key="option.eo_id">
                            <b-col offset="6">{{option.eo_tit}}: {{option.eo_name}}</b-col>
                            <b-col tag="i">수량 : <b>{{option.eo_ea | comma}}</b> 개</b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
    </div>
</div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'admShopEstimateShowReq',
    components: {
        'MadeType01':   () => import('./_comp/MadeType01'),
        'MadeType08':   () => import('./_comp/MadeType08'),
        'MadeType20':   () => import('./_comp/MadeType20'),
        'MadeType24':   () => import('./_comp/MadeType24'),
        'MadeTypeCommon':   () => import('./_comp/MadeTypeCommon'),
    },
    data() {
        return {
            frm:{
                file_info:[]
            },
        }
    },
    computed:{
    	choiceSubType(){
        	switch(this.frm.eq_1depth){
            	case '1': return 'MadeType01';  break; 
                case '8': return 'MadeType08';  break; 
                case '20': return 'MadeType20';  break; 
                case '24': return 'MadeType24';  break; 
                default: return 'MadeTypeCommon';  break;
            }
        },
    },
    methods: {
        async show() {
            try {
                const res = await ax.get(`/api/admin/shop/estimate/${this.$route.params.eq_id}`);
                if (res && res.status === 200) {
                    this.frm = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async update(){
            try {
                this.frm = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    this.frm, // 수정하려는 객체
                    {_method : 'PATCH', type : 'eq_step'} // 삽입하려는 내용
                );
                const res = await ax.post(`/api/admin/shop/estimate/${this.$route.params.eq_id}`, this.frm);
                if (res && res.status === 200)
                    Notify.toast('success', '수정 완료')
                else
                    Notify.toast('warning', '수정 실패');
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async destroy(){
            var rst = await Notify.confirm('삭제', 'danger');
            if (rst) {
                try {
                    let frm = new FormData();
                    frm.append("_method", 'DELETE');
                    frm.append("type", 'req');
                    const res = await ax.post(`/api/admin/shop/estimate/${this.$route.params.eq_id}`, frm);
                    if (res && res.status === 200) {
                        Notify.toast('success', '견적서 삭제')
                        this.$router.push({ name: 'adm_estimate_index' })
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('danger', '삭제 실패');
                    Notify.toast('danger', e.response.data.message);
                }
            }
        },
        async print () {
            await this.$htmlToPaper('adm_estimate_show', {styles:[
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                '/css/fontawesome_svg.css',
                '/css/adm_shop_estimate_req.css'
            ]});
        },
    },
    mounted() {
        this.show();
    },
}
</script>

<style lang="css" scoped>

@import '/css/adm_shop_estimate_req.css';
.gd_list .col .btn { max-width: 120px; }
.gd_list .col .btn img { width:100%; height:120px; object-fit:cover; }
</style>
