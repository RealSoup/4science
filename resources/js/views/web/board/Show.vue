<template>
<div id="bo_show">

    <h3>{{board.bo_subject}}</h3>

    <ul class="list-inline bd_info">
        <li class="list-inline-item"><b-icon icon="person-fill" /> {{board.bo_writer}}</li>
        <li class="list-inline-item"><b-icon icon="calendar-date-fill" /> {{board.created_at}}</li>
        <li class="list-inline-item"><b-icon icon="eye-fill" /> {{board.bo_click}}</li>

        <li class="list-inline-item add_file" v-if="board.add_file && board.add_file.length">
            <b-icon icon="file-earmark-arrow-down-fill" />
            <template v-for="file in board.add_file">
                <span class="piece" @click="fileDown(file.down_path, file.fi_original)" :key="file.fi_id">{{file.fi_original}}</span>
            </template>
        </li>
    </ul>
    <hr />

    <div class="con">
        <!-- @isset($img_file)
        @foreach($img_file as $fi)
        <img src="{{$fi->getSrc()}}" class='me-auto ms-auto d-block' />
        @endforeach
        @endisset -->
        <template v-if="board.img_file && board.img_file.length">
            <img v-for="(image, i) in board.img_file" :src="image.path" class='me-auto ms-auto d-block' :key="i" />
            <hr />
        </template>
        <div v-html="nl2br(board.bo_content)" />

        <hr />
    </div>

    <div class="row">
        <div class="col-6">
            <router-link :to="{name: `${getLink}bo_index`, params: { bo_cd:bo_cd }}" class="btn btn-sm btn-light">목록</router-link>
        </div>
        <div class="col-6 text-right" v-if="$parent.isMine(board.created_id)">
            <router-link :to="{name: 'bo_edit', params: { bo_cd:bo_cd, bo_id:bo_id }}" class="btn btn-sm btn-warning">수정</router-link>
            <b-button variant="danger" size="sm" @click="destroy">삭제</b-button>
        </div>
    </div>

    <Comment v-if="board.config.is_comment" :bo_cd='bo_cd' :bo_id='bo_id' />

</div>
</template>
<script>
import ax from '@/api/http';
import Comment from "./components/Comment.vue"

export default {
    name: 'BoardShow',
    components: {
        Comment,
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
    computed: {
        getLink: function () {
            return this.$route.name == 'my_bo_show' ? 'my_' : '';
        },
    },
    methods: {
        async show(){
            try {
                const res = await ax.get(`/api/board/${this.bo_cd}/show/${this.bo_id}`);
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
                        this.$router.push({ name: 'bo_index', params: { bo_cd:this.bo_cd }})
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
#bo_show h3 { margin:2rem 0 1rem 0; }
#bo_show .bd_info { line-height:1.4rem; }
#bo_show .bd_info li { margin-right:1.5rem; }
#bo_show .bd_info .add_file { margin-left:24px; }
#bo_show .bd_info .add_file i { margin:0 3px 0 -24px; }
#bo_show .bd_info .add_file .piece { color:#FFF; background-color:#888; margin-right:1rem; letter-spacing:-1px; border:1px dashed #CCC; border-radius:0.3rem; padding:0.1rem 0.3rem; cursor:pointer; }
#bo_show .con { margin-bottom:3rem; line-height:1.5rem; }
#bo_show .con img { max-width: 100%; }
</style>
