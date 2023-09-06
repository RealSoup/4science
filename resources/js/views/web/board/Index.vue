<template>
<b-container>
    <b-row align-h="end" class="searchWrap">
        <b-col>
            <b-form-select v-model="frm.mode">
                <b-form-select-option value="">전체</b-form-select-option>
                <b-form-select-option value="subject">제목</b-form-select-option>
                <b-form-select-option value="content">내용</b-form-select-option>
                <b-form-select-option value="writer">글쓴이</b-form-select-option>
            </b-form-select>
            <b-form-input v-model="frm.sch_txt" placeholder="검색어를 입력하세요" @keyup.enter="index" />
            <b-button type="submit" @click="index"><font-awesome-icon icon="search" /></b-button>
        </b-col>
    </b-row>
    <b-row class="data">
        <b-col>
            <table class="table table-hover">
                <colgroup>
                    <col width="10%" class="m_hide" />
                    <col width="" />
                    <col width="10%" v-if="config.is_qna" class="m_hide" />
                    <col width="15%" class="m_hide" />
                    <col width="10%" class="m_hide" />
                    <col width="10%" class="m_hide" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" class="m_hide">번호</th>
                        <th scope="col">제목</th>
                        <th scope="col" v-if="config.is_qna" class="m_hide">상태</th>
                        <th scope="col" class="m_hide">작성자</th>
                        <th scope="col" class="m_hide">조회</th>
                        <th scope="col" class="m_hide">등록일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bo in list.data" :key="bo.bo_id">
                        <td class="m_hide">{{bo.bo_id}}</td>
                        <td>
                            <b-link :to="{name: `${getLink}bo_show`, params: { bo_cd:bo_cd, bo_id:bo.bo_id }}">{{bo.bo_subject}}</b-link>
                        </td>
                        <td v-if="config.is_qna" class="m_hide">
                            <span v-if="bo.answer" :class="{active:bo.answer}">답변완료</span>
                            <span v-else>답변대기</span>
                        </td>
                        <td class="m_hide">{{bo.bo_writer}}</td>
                        <td class="m_hide">{{bo.bo_click}}</td>
                        <td class="m_hide">{{bo.created_at | formatDate}}</td>
                    </tr>
                </tbody>
            </table>
        </b-col>
    </b-row>
    <pagination :data="list" @pagination-change-page="index" :limit="5" :showDisabled="true" align="center" class="mt-5">
        <span slot="prev-nav"><b-icon-chevron-left /></span>
        <span slot="next-nav"><b-icon-chevron-right /></span>
    </pagination>
</b-container>
</template>
<script>
import ax from '@/api/http';

export default {
    props: ['papa_bo_cd'],
    watch: {
        //  마이페이지에서 참조할때 쓴다.
        'papa_bo_cd' (to, from) {
            this.bo_cd = to;
            this.index();
        }
    },
    data() {
        return {
            bo_cd:this.$route.params.bo_cd,
            list:{},
            config:{},
            frm:{
                mode:"",
                sch_txt:'',
                page:0,
            },
            sch_txt_focus: false,
        }
    },
    computed: {
        classObject: function () {
            return {
                active: this.frm.sch_txt !== '' || this.sch_txt_focus,
            }
        },
        getLink: function () {
            return this.$route.name == 'my_bo_index' ? 'my_' : '';
        },
    },
    methods: {
        async index(page=1){
            this.frm.page = page;
            if (this.$route.name == 'my_bo_index')
                this.frm.root = 'mypage';
            try {
                const res = await ax.get(`/api/board/${this.bo_cd}`, { params: this.frm});
                if (res && res.status === 200) {
                    this.list = res.data.list;
                    this.config = res.data.config;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    beforeRouteUpdate (to, from, next) {
        // console.log(to, from);
        this.bo_cd = to.params.bo_cd;
        this.index();
        next();
    },
    mounted() {
        this.index();
    },
}
</script>

<style scoped>

.container .searchWrap { margin:0; }
.container .searchWrap .col { display:flex; flex-wrap:wrap; max-width:31rem; background-color:#D7D7D7; color:#FFF; padding:3px; border-radius:26px; }
.container .searchWrap .col select { border-radius:17px 0 0 17px; height:30px; padding:.3rem 1.6rem 0.3rem 1.4rem; font-size:.9rem; border-width:0; 
background:#fff url(/storage/common/arrow_dn.gif)  no-repeat right 8px center; 
    flex:0 0 25%; max-width:25%;
}
.container .searchWrap .col input { flex:0 0 63%; max-width:63%; border:none; border-radius:0 18px 18px 0; padding: 0.4rem 1rem; font-size:.9rem; height:30px; margin-left:.17rem; flex-grow:1; }
.container .searchWrap .col input:focus { outline:0; }
.container .searchWrap .col button { flex-basis: 0; flex-grow: 1; max-width: 100%; padding:.2rem 1rem 0 .75rem; border-radius:0 18px 18px 0; background-color:#D7D7D7; border-width:0; }
.container .searchWrap .col button svg { font-size:1.4rem; }
.container .data { margin-top:1.8rem; }
.container .data .col table th { background-color:#ECECEC; color:#000; border-top:2px solid #000; }
.container .data .col table th,
.container .data .col table td:nth-child(1),
.container .data .col table td:nth-child(3),
.container .data .col table td:nth-child(4),
.container .data .col table td:nth-child(5) { text-align:center; }
.container .data .col table td:nth-child(2) { padding:0; }
.container .data .col table td a { display:block; padding:.75rem; }
.container .data .col table td span { background:#B7B7B7; padding:.3rem .7rem; color:#fff; font-size:.8rem; border-radius:4px; }
.container .data .col table td span.active { background:#F7941F; }
@media (max-width: 992px){
    .w_fence .bo_box .nav-tabs li { flex-basis:0; flex-grow: 1; max-width: 100%; }
    .w_fence .bo_box .nav-tabs li:nth-of-type(1) { flex: 0 0 50%; max-width: 50%; }
    .w_fence .bo_box .nav-tabs li:nth-of-type(2) { flex: 0 0 50%; max-width: 50%; }
    .w_fence .bo_box .nav-tabs li a { padding:.3rem; }
    .w_fence .bo_box .body { padding: 0.5rem; }
    .pagination >>> .page-link { min-width: 30px; padding:0; }
    .container .searchWrap .col button { padding: 0; border-radius: 10px;}
}
</style>