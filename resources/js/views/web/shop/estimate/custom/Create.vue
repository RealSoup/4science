<template>
<b-container class="w_fence">
    <h3><b>{{category[$route.params.id]}}</b>주문제작 견적요청</h3>
    <ul>
        <li>일반적으로 요청하신 제품의 견작가는 실제 구매시에 약간의 차이가 있을 수 있습니다.</li>
        <li>입력하신 모든 사항은 철저히 보호되며, 다른 어떤 용도로도 사용되지 않습니다.</li>
        <li>견적서는 기입하신 메일과 <b>마이페이지 > 견적서조회</b>에서 확인할 수 있습니다.</li>
    </ul>
    <b-row>
        <b-col>
            <h4>01. 요청 사항</h4>
            <component ref="custom_sub" :is="choiceSubForm" @set_eq_content="set_eq_content" />
        </b-col>
        
        <b-col class="inquiry frm_st">
            <h4>02. 문의 사항</h4>
            <b-row>
                <b-col class="label_st">내용</b-col>
                <b-col><b-form-textarea v-model="frm.eq_content" rows="13" /></b-col>
            </b-row>
            <b-row>
                <b-col class="label_st">첨부파일</b-col>
                <b-col>
                    <file-upload ref="fileupload" v-model="files" :fi_group="'estimateReq'" :fi_kind="'add'" :height="100" />
                </b-col>
            </b-row>
            <b-row><b-col class="btn_box"><b-button class="blue wd_100p" @click="store">견적 요청하기</b-button></b-col></b-row>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import ax from '@/api/http';
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    name: 'ShopEstimateCustomCreate',
    components: {
        FileUpload,
        'Validation':   () => import('@/views/_common/Validation.vue'),
        'Sub01':   () => import('./_comp/Sub01.vue'), 'Sub02':   () => import('./_comp/Sub02.vue'), 'Sub03':   () => import('./_comp/Sub03.vue'),
        'Sub04':   () => import('./_comp/Sub04.vue'), 'Sub05':   () => import('./_comp/Sub05.vue'), 'Sub06':   () => import('./_comp/Sub06.vue'),
        'Sub07':   () => import('./_comp/Sub07.vue'), 'Sub08':   () => import('./_comp/Sub08.vue'), 'Sub09':   () => import('./_comp/Sub09.vue'),
        'Sub10':   () => import('./_comp/Sub10.vue'), 'Sub11':   () => import('./_comp/Sub11.vue'), 'Sub12':   () => import('./_comp/Sub12.vue'),
        'Sub13':   () => import('./_comp/Sub13.vue'), 'Sub14':   () => import('./_comp/Sub14.vue'), 'Sub15':   () => import('./_comp/Sub15.vue'),
        'Sub16':   () => import('./_comp/Sub16.vue'), 'Sub17':   () => import('./_comp/Sub17.vue'), 'Sub18':   () => import('./_comp/Sub18.vue'),
        'Sub19':   () => import('./_comp/Sub19.vue'), 'Sub20':   () => import('./_comp/Sub20.vue'), 'Sub21':   () => import('./_comp/Sub21.vue'),
        'Sub22':   () => import('./_comp/Sub22.vue'), 'Sub23':   () => import('./_comp/Sub23.vue'), 'Sub24':   () => import('./_comp/Sub24.vue'),
    },
    data() {
        return {
            frm:{
                eq_name:Auth.user().name,
                eq_email:Auth.user().email,
                eq_hp:Auth.user().hp,
                eq_company:Auth.user().company,
                eq_1depth:this.$route.params.id??'',
                eq_content:"제품명 : \n사양 : \n수량 : ",
            },
            files:[],
            category:[],
        };
    },
    computed:{
    	choiceSubForm(){
        	switch(this.$route.params.id){
            	case '1': return 'Sub01';  break; case '2': return 'Sub02';  break; case '3': return 'Sub03';  break; case '4': return 'Sub04';  break;
                case '5': return 'Sub05';  break; case '6': return 'Sub06';  break; case '7': return 'Sub07';  break; case '8': return 'Sub08';  break;
                case '9': return 'Sub09';  break; case '10': return 'Sub10';  break; case '11': return 'Sub11';  break; case '12': return 'Sub12';  break;
            	case '13': return 'Sub13';  break; case '14': return 'Sub14';  break; case '15': return 'Sub15';  break; case '16': return 'Sub16';  break;
                case '17': return 'Sub17';  break; case '18': return 'Sub18';  break; case '19': return 'Sub19';  break; case '20': return 'Sub20';  break;
                case '21': return 'Sub21';  break; case '22': return 'Sub22';  break; case '23': return 'Sub23';  break; case '24': return 'Sub24';  break;
            }
        },
    },
    methods: {
        async store(){
            if (this.$refs.custom_sub.checkValidation()) {
                
                this.frm = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    this.frm, // 수정하려는 객체
                    {made_name:this.category[this.$route.params.id]},
                    {label:this.$refs.custom_sub.label}, // 삽입하려는 내용
                    {val:this.$refs.custom_sub.val}
                );
                let res = await ax.post(`/api/shop/estimate`, this.frm);
                if (res && res.status === 200) {
                    await this.$refs.fileupload.fileProcessor(res.data);
                    Notify.toast('success', '견적 요청 완료')
                    this.$router.push({name: 'my_estimate_show', params: { eq_id: res.data }});
                } else {
                    Notify.toast('warning', res);
                }
            }
        },
        set_eq_content(v){ this.frm.eq_content = v; }
    },
    async mounted() {
        const res = await ax.get(`/api/shop/estimate/getCustomMadeCategory`);
        if (res && res.status === 200) {
            this.category=res.data;
        }
    },
};
</script>

<style lang="css" scoped>
.w_fence h3 b { background-color:#ED1E26; color:#fff; border-radius:20px; padding:5px 15px; font-size:1.3rem; margin-right:.5rem; }
.w_fence ul { margin-bottom:3rem; }
.w_fence ul li b { color:#4e99c5; text-decoration:underline; }
.w_fence>.row>.col { padding:0; }
.w_fence>.row>.col:first-child { flex: 0 0 58%; max-width: 58%; margin-right:3%; }
.w_fence .row .inquiry .row { margin-left:0; margin-right:0; }
.w_fence .row .inquiry .row .label_st { font-size:.9rem; }

.frm_st .row .col textarea { border:2px solid #D7D7D7; background-color:#FFF; }
.w_fence .row .col >>> .frm_st th b { display:inline-block; background:#FF0000; width:4px; height:4px; border-radius:2px; margin:0 0 9px 5px; }
.w_fence .row .col >>> .frm_st input,
.w_fence .row .col >>> .frm_st select { background:#F2F3F5; padding:2px 23px; border-width:0; font-size:.9rem; color:#898989; }
.w_fence .row .col >>> .frm_st input:focus,
.w_fence .row .col >>> .frm_st select:focus { background:#fff; border:2px solid #959595 !important; box-shadow:unset;}
.w_fence .row .col >>> .frm_st select { background:#F2F3F5 url(https://fourscience.s3.ap-northeast-2.amazonaws.com/common/arrow_dn.gif) no-repeat right 8px center; }
.w_fence .row .col >>> .frm_st .w-50 { max-width:300px; display:inline-block; margin-right:.3rem; }
.w_fence .row .col >>> .frm_st .w-25 { max-width:150px; display:inline-block; margin-right:.3rem; }
.w_fence .row .col >>> .frm_st table { width:100%; }
.w_fence .row .col >>> .frm_st table tr th { font-size:.9rem; width:180px; }
.w_fence .row .col >>> .frm_st table tr td { padding:9px; }
.w_fence .row .col >>> .frm_st table tr td table { width:100%; }
.w_fence .row .col >>> .frm_st table tr td table tr { border-bottom:1px solid #9DDEFF; }
.w_fence .row .col >>> .frm_st table tr td table tr th { background-color:#C6EAFF; text-align:center; } 
.w_fence .row .col >>> .frm_st table tr td table tr td { /*background-color:#EDFAFF;*/ }
.w_fence .row .col >>> .frm_st table tr td em { color:#FF0000; font-size:.8rem; }
</style>