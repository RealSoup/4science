<template>
    <b-container class="bo_index">
        <b-row align-h="end">
            <b-col class="searchWrap">
                <div class="searchBox" :class="classObject">
                    <div class="searchBoxShadow"></div>
                    <input type="text" v-model="frm.sch_txt" placeholder="검색어 입력" @focus="sch_txt_focus = true" @blur="sch_txt_focus = false" @keyup.enter="index" />
                    <b-icon-search />
                </div>
            </b-col>
            <!-- <b-col md="4" class="text-right mb-2">
                <div class="input-group input-group-sm">
                    <b-form-input v-model="frm.sch_txt" placeholder="검색어 입력" />
                    <div class="input-group-append">
                        <b-button variant="primary" @click="index">Search</b-button>
                    </div>
                </div>
            </b-col> -->
        </b-row>
        <b-row>
            <b-col>
                <table class="table table-striped table-hover">
                    <colgroup>
                        <col width="10%" />
                        <col width="" />
                        <col width="15%" />
                        <col width="10%" />
                    </colgroup>
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="bo in list.data" :key="bo.bo_id">
                            <td>{{bo.bo_id}}</td>
                            <td>
                                <b-button :to="{name: `${getLink}bo_show`, params: { bo_cd:bo_cd, bo_id:bo.bo_id }}" variant="outline-secondary">{{bo.bo_subject}}</b-button>
                            </td>
                            <td>{{bo.bo_writer}}</td>
                            <td>{{bo.created_at | formatDate}}</td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
        
        <b-row>
            <b-col class="text-right">
                <b-link
                    v-if="$parent.enableLvChk(config.wlv)"
                    :to="{name: 'bo_create', params: { bo_cd:bo_cd }}" 
                    class="btn btn-sm btn-primary"
                >글쓰기</b-link>
            </b-col>
        </b-row>
        <pagination :data="list" align="center" @pagination-change-page="index"></pagination>
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
table th,
table td:nth-child(1),
table td:nth-child(3),
table td:nth-child(4) { text-align:center; }
table td .btn { display:block; text-align:left; }

.searchWrap { font-family:consolas; display: flex; justify-content:flex-end; align-items: center; min-height:100px; background:#cfd1e1; overflow:hidden; }
.searchWrap .searchBox { position:relative; width:65px; height:50px; display: flex; justify-content:center; align-items: center; transition:.5s; }
.searchWrap .searchBox::before { content: ''; position:absolute; top:0; left:0; width:10px; height:100%; background:linear-gradient(#fff, #fff, #e3e3e3); z-index:1; filter: blur(1px); }
.searchWrap .searchBox::after { content: ''; position:absolute; top:0; right:-1px; width:10px; height:100%; background:#9d9d9d; z-index:1; filter: blur(1px); }
.searchWrap .searchBox.active,
.searchWrap .searchBox:hover { width:400px;  }
.searchWrap .searchBox .searchBoxShadow { position: absolute; top:0; left:-50px; width:calc(100% + 50px); height: 300px; 
background:linear-gradient(180deg, rgba(0,0,0,0.1), transparent, transparent); transform-origin:top; transform:skew(45deg); pointer-events:none; }
.searchWrap .searchBox .searchBoxShadow::before { content: ''; position:absolute; width:50px; height:50px; background:#cfd1e1; z-index:1; } 
.searchWrap .searchBox input { position:relative; width:100%; height:100%; border:none; outline:none; padding:10px 25px; font-size: 1.1em; color:#555; 
    background: linear-gradient(#dbdae1, #a3aaba); 
    box-shadow: 5px 5px 5px rgba(0,0,0,0.1), 
    15px 15px 15px rgba(0,0,0,0.1), 
    20px 20px 15px rgba(0,0,0,0.1), 
    30px 30px 15px rgba(0,0,0,0.1),
    inset 1px 1px 2px #fff;   
}
.searchWrap .searchBox input,
.searchWrap .searchBox input::placeholder { color:transparent; }
.searchWrap .searchBox.active input,
.searchWrap .searchBox:hover input,
.searchWrap .searchBox.active input::placeholder,
.searchWrap .searchBox:hover input::placeholder { color:#555 !important; opacity: 1; }
.searchWrap .searchBox svg { position:absolute; right:20px; font-size:1.5rem; cursor:pointer; }
</style>