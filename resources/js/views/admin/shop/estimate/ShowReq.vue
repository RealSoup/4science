<template>
    <div id="adm_estimate_show">
        <b-card class="shadow sticky-top" body-class="p-2">
            <b-container>
                <b-row>
                    <b-col>
                        <b-button variant="danger" size="sm" @click="destroy"><b-icon icon="trash-fill" /> 삭제</b-button>
                    </b-col>
                    <b-col class="text-right">
                        <b-input-group size="sm">
                            <b-input-group-prepend class="bg-light btn_group">
                                <b-button :to="{name: 'adm_estimate_index'}"><b-icon icon="list-ul" /> 목록</b-button>
                            </b-input-group-prepend>
                            <b-form-select v-model="frm.eq_step">
                                <b-form-select-option value="DONOT">미처리</b-form-select-option>
                                <b-form-select-option value="DOING">처리중</b-form-select-option>
                                <b-form-select-option value="DONE">처리완료</b-form-select-option>
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

        <b-card class="shadow mt-3">
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

                        <div v-if="frm.eq_content">
                            <span class="content"><font-awesome-icon icon="comment-dots" />{{ frm.eq_content }}</span>
                        </div>
                        <div v-if="frm.file_info.length">
                            <span>
                                <b-icon icon="file-earmark-arrow-down-fill"></b-icon>
                                <template v-for="(file, i) in frm.file_info">
                                    <b-button size="sm" variant="outline-info" class="mr-2" @click="fileDown(file.path, file.fi_original)">{{file.fi_original}}</b-button>
                                    <b v-if="i != Object.keys(frm.file_info).length - 1"> </b>
                                </template>
                            </span>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card class="shadow mt-3 gd_box" v-if="frm.estimate_model && frm.estimate_model.length">
            <template #header><b>주문 상품</b></template>

            <b-container>
                <b-row v-for="(em, i) in frm.estimate_model" :key="em.em_id" class="gd_list">
                    <b-col cols="5">
                        <!-- <b-link :to="{name: 'adm_goods_edit', params: { gd_id:model.em_gd_id }}"><img :src="model.img_src[0]" /></b-link>
                        <div>
                            <b>{{model.em_name}}</b>
                            {{model.em_maker}}
                        </div> -->

                        <div class="text-success em_name">
                            {{em.em_name}}
                            <b-button variant="outline-primary" size="sm" :to="{name: 'adm_goods_edit', params: { gd_id:em.em_gd_id }}">
                                <b-icon-link45deg />
                            </b-button>
                        </div>
                        <div class="text-secondary">
                            {{em.em_code}}
                            [ {{em.em_catno}} ]
                        </div>
                    </b-col>
                    <b-col xl="6" lg="6" class="gd_info">
                        <div>제조사: {{em.em_maker}}</div>
                        <div>사양: {{em.em_spec}}</div>
                        <div>단위: {{em.em_unit}}</div>
                    </b-col>
                    <b-col>{{em.em_ea | comma}}</b-col>

                    <b-col v-if="em.estimate_option.length" cols="12" class="op_list row m-0 p-0">
                        <b-col offset-lg="8" class="op_info text-right">
                            <b-badge variant="warning" class="float-left">옵션</b-badge>
                            <div v-for="(option, i) in em.estimate_option" :key="option.eo_id">
                                <span>{{option.eo_tit}}: <b>{{option.eo_name}}</b></span>
                                <i>수량: <b>{{option.eo_ea}}</b> 개</i>
                            </div>
                        </b-col>
                    </b-col>

                </b-row>
            </b-container>
        </b-card>


    </div>
</template>

<script>
import ax from '@/api/http';

export default {
    data() {
        return {
            frm:{
                file_info:[]
            },
        }
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
    },
    mounted() {
        this.show();
    },
}
</script>

<style lang="css" scoped>
#adm_estimate_show .card .eq_info .col { box-shadow:3px 2px 2px 0px; border:1px solid #EDEDED; }
#adm_estimate_show .card .eq_info .col div { margin:1rem; }
#adm_estimate_show .card .eq_info .col div span { margin-right:1rem; }
#adm_estimate_show .card .eq_info .col div span svg { margin-right:0.5rem; }
#adm_estimate_show .card .eq_info .col div .content { white-space:pre; }

/* #adm_estimate_show .em_info .em_list:nth-child(odd) > div:nth-child(even),
#adm_estimate_show .em_info .em_list:nth-child(even) > div:nth-child(odd) { background-color:#EAF2FF; } */
#adm_estimate_show .gd_box .gd_list:nth-child(even) { background-color:#EAF2FF; }

#adm_estimate_show .gd_box .gd_list { border-bottom:1px solid #EDEDED; padding:1rem .3rem; }
#adm_estimate_show .gd_box .gd_list .em_name { font-size:1rem; }
#adm_estimate_show .gd_box .gd_list .em_name i { font-size:0.7rem;  display:inline-block; background-color:#71B981; color:#fff; border-radius:1rem; padding:0.2rem 0.5rem; line-height:1; }
#adm_estimate_show .gd_box .gd_list .em_name .btn { margin-left:1rem; padding:.1rem .36rem; }
#adm_estimate_show .gd_box .gd_list .gd_info div { color:#999; font-size:0.8rem; }
#adm_estimate_show .gd_box .op_list .op_info div { color:#999; font-size:0.8rem; }
#adm_estimate_show .gd_box .op_list .op_info div span { display:inline-block; min-width:10rem; text-align:left; }
#adm_estimate_show .gd_box .op_list .op_info div i { display:inline-block; min-width:5rem; }
#adm_estimate_show .gd_box .op_list .op_info div i b { display:inline-block; min-width:1.4rem; }
#adm_estimate_show .gd_box .gd_list > div:nth-child(3) { text-align:right; }
</style>
