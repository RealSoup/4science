<template>
<div id="bo_show">

    <h3><b>제목: </b>{{board.bo_subject}}</h3>

    <ul class="list-inline bd_info">
        <li class="list-inline-item"><router-link :to="{name: 'adm_user_edit', params: { id:board.created_id }}"><b-icon icon="person-fill" /> {{board.bo_writer}}</router-link></li>
        <li class="list-inline-item"><b-icon icon="calendar-date-fill" /> {{board.created_at}}</li>
        <li class="list-inline-item"><b-icon icon="eye-fill" /> {{board.bo_click}}</li>

        <li class="list-inline-item add_file" v-if="board.add_file && board.add_file.length">
            <b-icon icon="file-earmark-arrow-down-fill" />
            <template v-for="file in board.add_file">
                <span class="piece" @click="fileDown(file.down_path, file.fi_original)" :key="file.fi_id">{{file.fi_original}}</span>
            </template>
        </li>

        <li class="list-inline-item bo_type badge badge-warning" v-if="bo_cd == 'cancel'">
            분류 : {{board.bo_type | bo_type}}
        </li>
    </ul>
    <hr />

    <div class="con">
        <b-button v-if="board.goods" @click="openWinPop(`admin/shop/goods/${board.goods.gd_id}/edit`)" class="gd_img">
            &lt; <b>상품명: </b>{{board.goods.gd_name}} &gt;
            <br />
            - 클릭시 상품창 오픈 -
            <br />
            <img :src="board.goods.image_src[0]" />
        </b-button>

        <template v-if="board.img_file && board.img_file.length">
            <img v-for="(image, i) in board.img_file" :src="image.path" class='mx-auto d-block my-4' :key="i" />
            <hr />
        </template>
        <div v-html="nl2br(board.bo_content)" />

        <hr />
        <div v-if="board.answer" class="answer">
            <h6><b>A.</b> <i>{{board.answer.bo_writer}} <span class="badge badge-dark">{{board.answer.created_at}}</span></i></h6>
            <div v-html="nl2br(board.answer.bo_content)" />
        </div>
    </div>

    <div class="row">
        <div class="col-6">
            <router-link :to="{name: 'adm_board_index', params: { bo_cd:bo_cd }}" class="btn btn-sm btn-light">목록</router-link>
        </div>
        <div class="col-6 text-right">
            <b-button v-if="!board.answer" class="sm mint" :to="{name: `adm_board_answer`, params: { bo_cd:bo_cd, bo_id:bo_id }}">답변</b-button>
            <router-link :to="{name: 'adm_board_edit', params: { bo_cd:bo_cd, bo_id:bo_id }}" class="btn btn-sm btn-warning">수정</router-link>
            <router-link :to="{name: 'adm_board_edit', params: { bo_cd:bo_cd, bo_id:board.answer.bo_id }}" class="btn btn-sm btn-warning" v-if="board.answer">답변 수정</router-link>
            <b-button variant="danger" size="sm" @click="destroy">삭제</b-button>
        </div>
    </div>

    <comment v-if="board.config.is_comment" :bo_cd='bo_cd' :bo_id='bo_id' />

</div>
</template>
<script>
import ax from '@/api/http';
import Comment from "@/views/web/board/components/Comment.vue";

export default {
    name: 'AdmBoardShow',
    components: {
        'comment': Comment,
    },
    data() {
        return {
            board:{
                config:{},
            },
            bo_cd:this.$route.params.bo_cd,
            bo_id:this.$route.params.bo_id,
        };
    },
    filters: {
        bo_type: function (str) {
            var rst = '';
            switch (str) {
                case "C": rst = "배송전 주문취소"; break;
                case "R": rst = "반품"; break;
                case "S": rst = "교환"; break;
            }
            return rst;
        }
    },
    computed: {
        getLink: function () {
            return this.$route.name == 'my_bo_show' ? 'my_' : '';
        },
    },
    methods: {
        async show(){
            try {
                const res = await ax.get(`/api/admin/board/${this.bo_cd}/show/${this.bo_id}`);
                if (res && res.status === 200) {
                    this.board = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async destroy(){
            try {
                var isok = await Notify.confirm('삭제', 'danger');            
                if (isok) {
                    let frm = new FormData();
                    frm.append("_method", 'DELETE');
                    const res = await ax.post(`/api/board/${this.bo_cd}/destroy/${this.bo_id}`, frm);
                    if (res && res.status === 200)
                        this.$router.push({ name: 'adm_board_index', params: { bo_cd:this.bo_cd }})
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    beforeRouteUpdate (to, from, next) {
        // console.log(to, from);
        this.bo_id = to.params.bo_id;
        this.show();
        next();
    },
    mounted() {
        this.show();
    },
}
</script>

<style media="screen">
#bo_show { max-width:900px; margin:auto; border:1px solid #CCC; border-radius:.5em; padding:1em; margin-top:2em; }
#bo_show h3 { margin:1rem 0; }
#bo_show .bd_info { line-height:1.4rem; }
#bo_show .bd_info li { margin-right:1.5rem; }
#bo_show .bd_info .add_file { margin-left:24px; }
#bo_show .bd_info .add_file i { margin:0 3px 0 -24px; }
#bo_show .bd_info .add_file .piece { color:#FFF; background-color:#888; margin-right:1rem; letter-spacing:-1px; border:1px dashed #CCC; border-radius:0.3rem; padding:0.1rem 0.3rem; cursor:pointer; }
#bo_show .bd_info .bo_type { font-size:1.2rem; }
#bo_show .con { margin-bottom:3rem; line-height:1.5rem; }
#bo_show .con .gd_img { text-align:center; margin:2em auto; display:block; padding:1em; }

#bo_show .con img { max-width: 100%; }
#bo_show .con .answer { background:#eceaeb; border-radius:10px; margin-top:1rem; padding:1rem 2.5rem; }
#bo_show .con .answer h6 { margin:1.5rem 0; }
#bo_show .con .answer h6 b { color:#fa931d; font-size:1.2rem; }
#bo_show .con .answer h6 i { color:#888; }
#bo_show .con .answer h6 i span { font-size:1rem; background-color: #888; margin-left:.8rem; }

#bo_show .con table {padding:0; border-spacing:0px; border:0; border-collapse:collapse;}
#bo_show .con table tr,
#bo_show .con table th, 
#bo_show .con table td {padding:0px;}
</style>
