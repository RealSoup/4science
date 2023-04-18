<template>
<div id="adm_estimate_show" class="p_wrap">
    <h3 class="p_tit">견적 요청</h3>
    <div class="act_ctrl">
        <b-row cols="1" cols-md="2">
            <b-col class="def_info">
                <span>요청번호</span> <b>{{frm.eq_id}}.</b>
                <span>요청날짜</span> <b>{{ frm.created_at | formatDate_YY_MM_DD }}</b>
            </b-col>
            <b-col class="btn_area">
                <b-button :to="{name: 'adm_estimate_index'}" class="white sm"><b-icon-list /> 목록으로</b-button>
                <b-button class="mint sm" :to="{name: 'adm_estimate_show_reply', params: { er_id:frm.estimate_reply[frm.estimate_reply.length-1].er_id }}" v-if="frm.estimate_reply && frm.estimate_reply.length>0">
                    <b-icon-newspaper /> 견적서 확인
                </b-button>
                <b-button class="blue sm" :to="{name: 'adm_estimate_create', query: { eq_id:frm.eq_id }}" v-else>
                    <b-icon-pencil-square /> 견적서 작성
                </b-button>
                <b-button class="d_gray sm" @click="print"><b-icon-printer /> 인쇄</b-button>

                <div class="select_box">
                    <b-input-group size="sm">
                        <b-form-select v-model="frm.eq_step">
                            <b-form-select-option value="DONOT">미처리</b-form-select-option>
                            <b-form-select-option value="DOING">처리중</b-form-select-option>
                            <b-form-select-option value="DONE">완료</b-form-select-option>
                            <b-form-select-option value="CANCEL">취소</b-form-select-option>
                        </b-form-select>
                        <b-input-group-append>
                            <b-button class="sm" @click="update"><b-icon-tools /> 변경</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </div>

                <b-button class="red sm" @click="destroy"><b-icon icon="trash-fill" /> 삭제</b-button>
            </b-col>
        </b-row>
    </div>

    <div class="box gd_list" v-if="frm.estimate_model && frm.estimate_model.length">
        <h5>견적상품 등록</h5>
        <b-row>
            <b-col>주문 상품</b-col>
            <b-col>사양</b-col>
            <b-col>제조사</b-col>
            <b-col>판매단위</b-col>
            <b-col>수량</b-col>
        </b-row>
        <b-row v-for="em in frm.estimate_model" :key="em.em_id" >
            <b-col>
                <b-link @click="openWinPop(`/admin/shop/goods/${em.em_gd_id}/edit`, 1700, 900)"><img :src="em.img_src" /></b-link>
                <div>
                    <b class="gd_name">{{em.em_name}}</b>
                    모델명: {{em.em_code}}<b class="divider">/</b>
                    Cat.No: {{em.em_catno}}
                </div>
            </b-col>
            <b-col>{{em.em_spec}}</b-col>
            <b-col>{{em.em_maker}}</b-col>
            <b-col>{{em.em_unit}}</b-col>
            <b-col>{{em.em_ea | comma}}</b-col>
            <b-col cols="12" v-if="em.estimate_option.length" class="opc">
                <b-row v-for="option in em.estimate_option" :key="option.eo_id">
                    <b-col offset="6">{{option.eo_tit}}: {{option.eo_name}}</b-col>
                    <b-col tag="i">수량 : <b>{{option.eo_ea | comma}}</b> 개</b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
    
    <div v-if="Number(frm.eq_1depth)">
        <h5>주문제작 정보: {{frm.made_cate[frm.eq_1depth]}}</h5>
        <component ref="custom_sub" :is="choiceSubType" v-model="frm.estimate_custom" />
    </div>

    <div class="box est_frm">
        <h5>요청자 정보</h5>
        <b-row>
            <b-col>요청자</b-col>
            <b-col>
                <b-link v-if="frm.created_id" @click="openWinPop(`/admin/user/${frm.created_id}/edit`, 1700, 900)">
                    {{frm.eq_name}}
                </b-link>
            </b-col>
            <b-col>연락처</b-col><b-col>{{ frm.eq_hp }}{{ frm.eq_tel }}</b-col>
        </b-row>
        <b-row>
            <b-col>소속</b-col><b-col>{{frm.office}}  {{ frm.eq_department }}</b-col>
            <b-col>이메일</b-col><b-col>{{ frm.eq_email }}</b-col>
        </b-row>
        <b-row>
            <b-col>문의사항</b-col>
            <b-col><p v-html="nl2br(frm.eq_content)" /></b-col>
        </b-row>
        <b-row>
            <b-col>첨부파일</b-col>
            <b-col>
                <b-button v-for="(file, i) in frm.file_info" class="white sm mr-2" @click="fileDown(file.down_path, file.fi_original)" :key="i">
                    {{file.fi_original}}
                </b-button>
            </b-col>
        </b-row>
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

.p_wrap .act_ctrl .def_info { line-height:1.9; }
.p_wrap .act_ctrl .def_info span { margin-left: 2rem; }
.p_wrap .act_ctrl .def_info b { font-weight:900; margin-left:.5rem; }
.p_wrap .act_ctrl .btn_area { text-align:right; }
.p_wrap .act_ctrl .btn_area .select_box { display:inline-block; width:200px; }
.p_wrap .act_ctrl .btn_area>* { margin-left:1%; margin-right:1%; }

.p_wrap .gd_list .row:first-of-type { border-top: 3px solid #4F637B; font-weight:600; }
.p_wrap .gd_list .row:last-of-type { border-bottom: 3px solid #4F637B; }
.p_wrap .gd_list .row .col:nth-child(2),
.p_wrap .gd_list .row .col:nth-child(3),
.p_wrap .gd_list .row .col:nth-child(4),
.p_wrap .gd_list .row .col:nth-child(5) { flex: 0 0 13%; max-width: 13%; }
.p_wrap .gd_list .row .col { justify-content: center; padding:0.75rem; display:flex; align-items:center; font-size: .95rem; }
.p_wrap .gd_list .row:not(:last-of-type) .col { border-bottom: 1px solid #D7D7D7; }
.p_wrap .gd_list .row .col:not(:last-of-type) { border-right: 1px solid #D7D7D7; }

.p_wrap .gd_list .row:not(:first-of-type) .col { color:#949494; }

.p_wrap .gd_list .row:not(:first-of-type) .col:first-of-type a { flex: 0 0 145px; max-width: 145px; }
.p_wrap .gd_list .row:not(:first-of-type) .col:first-of-type div { text-align:left; padding-left:2rem; flex-basis: 0; flex-grow: 1; max-width: 100%; }
.p_wrap .gd_list .row:not(:first-of-type) .col:first-of-type div .gd_name { display:block; color:#555; }
.p_wrap .gd_list .row .col a { width:120px; height:120px; padding-left:20px; }
.p_wrap .gd_list .row .col a img { width:100%; height:100%; object-fit:contain; border:1px solid #8F8F8F; }


.est_frm .row .col:nth-child(even) {
    padding-left: 1.5%;
}

/*
.p_wrap .act_ctrl .btn_area .white,
.p_wrap .act_ctrl .btn_area .mint,
.p_wrap .act_ctrl .btn_area .blue,
.p_wrap .act_ctrl .btn_area .gray,
.p_wrap .act_ctrl .btn_area .red { flex-basis:0; flex-grow:1; max-width:100%;  }
.p_wrap .act_ctrl .btn_area .input-group  { flex:0 0 24%; max-width:24%; }
.p_wrap .act_ctrl .btn_area .white,
.p_wrap .act_ctrl .btn_area .mint,
.p_wrap .act_ctrl .btn_area .blue,
.p_wrap .act_ctrl .btn_area .gray,
.p_wrap .act_ctrl .btn_area .red,
.p_wrap .act_ctrl .btn_area .input-group { margin-left:1.5%; margin-right:1.5%; }
*/
.p_wrap .top .row .col:nth-child(6) { flex: 0 0 24%; max-width: 61%; }
.p_wrap .top .row .col:nth-child(6) { flex:0 0 10%; max-width:10%; }
.gd_list .col .btn { max-width: 120px; }
.gd_list .col .btn img { width:100%; height:120px; object-fit:cover; }
</style>
