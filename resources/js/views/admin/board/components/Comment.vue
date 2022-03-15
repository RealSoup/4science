<template>
<article id="comment">


    <hr />

    <h5>댓글 <small>{{ bo_co_list.length }}개</small></h5>
    <ul class="container"
        v-if="bo_co_list && bo_co_list.length">
        <template
            v-for="(co, idx) in bo_co_list" :index="idx">
        <li class="row pillar"
            :key="co.bo_id"
            :id="'comment_'+co.bo_id"
            :style="{paddingLeft:calcPl(co.bo_co_seq_cd)+'px'}">

            <div class="col-md-6 col-12">
                <span><b-icon icon="person-fill"></b-icon> {{co.bo_writer}}</span>
                <span><b-icon icon="calendar-date-fill"></b-icon> {{co.created_at}}</span>
            </div>

            <div class="col-md-6 col-12 text-right">
                <b-button variant="success" size="sm" @click="goodBad(co.bo_id, 'GOOD', idx)" v-if="!$parent.isMine(co.created_id)">
                    <b-icon icon="hand-thumbs-up"></b-icon> <span>{{co.bo_good}}</span>
                </b-button>
                <b-button variant="danger" size="sm" @click="goodBad(co.bo_id, 'BAD', idx)" v-if="!$parent.isMine(co.created_id)">
                    <b-icon icon="hand-thumbs-down"></b-icon> <span>{{co.bo_bad}}</span>
                </b-button>
                <b-button variant="secondary" size="sm" @click="coWrite(idx)">
                    <b-icon icon="chat-left-dots-fill"></b-icon>
                </b-button>

                <template v-if="$parent.isMine(co.created_id)">
                    <b-button variant="warning" size="sm" @click="coUadate(idx)">
                        <b-icon icon="scissors"></b-icon>
                    </b-button>
                    <b-button variant="danger" size="sm" @click="isDestroy(co.bo_id)">
                        <b-icon icon="trash-fill"></b-icon>
                    </b-button>
                </template>

            </div>
            <div class="col-12 bo_content">
                <p v-if="co.file_info_bo.length"><img :src="co.file_info_bo[0].src" class='me-auto ms-auto d-block' /></p>
                <div v-html="co.bo_content"></div>
            </div>
            <div class="col-12 box_co">
                <CommentFormGroup
                    v-if="idx == sltIndex"
                    ref='commentFormGroup'
                    :sltIndex='sltIndex'
                    :bo_cd='bo_cd'
                    :bo_id='co.bo_id'
                    :prevBo_content='co.bo_content'
                    :comment_mode='comment_mode'
                    :fi_id="co.file_info_bo.length ? co.file_info_bo[0].fi_id : ''"
                    @callIndex='index'
                    @callHideCommentForm='hideCommentForm()'
                    @callReCommentCancel='reCommentCancel()' />
            </div>
        </li>
        </template>
    </ul>

    <CommentFormGroup
        v-if="-1 == sltIndex"
        :sltIndex='sltIndex'
        :bo_cd='bo_cd'
        :bo_id='bo_id'
        :comment_mode='comment_mode'
        @callIndex='index' />

</article>
</template>

<script>
import http from '@/api/http';
import { common } from "@/mixins/common";
export default {
    name: 'Comment',
    components: {
        'CommentFormGroup': () => import('./CommentFormGroup.vue'),
    },
    props:['bo_cd', 'bo_id'],
    data() {
        return {
            sltIndex:-1,
            bo_co_list: [],
            comment_mode: 'create',
        };
    },
    computed: {
    },
    methods: {
        async index(targetId) {
            try {
                const res = await http.get(`/api/board/${this.bo_cd}/indexComment/${this.bo_id}`);
                if (res.status === 200) {
                    this.bo_co_list = res.data;
                    // if (!!targetId)
                    //     this.$nextTick(function () {
                    //         document.getElementById(targetId).scrollIntoView({ behavior: 'smooth'});
                    //     });
                }
            } catch (e) {
                console.log(e.response);
            }
        },
        coWrite(idx) {
            this.sltIndex = idx;
            this.comment_mode = 'reCreate';
            this.$nextTick(function () {
                this.$refs.commentFormGroup[0].textAreaFocus();
            });
            // this.$refs.commentFormGroup[idx].setBoContent('create');
        },
        coUadate(idx) {
            this.sltIndex = idx;
            this.comment_mode = 'reEdit';
            this.$nextTick(function () {
                this.$refs.commentFormGroup[0].textAreaFocus();
            });
        },
        isDestroy(bo_id) {
            this.$bvModal.msgBoxConfirm( "삭제 하시겠습니까?",
                Object.assign({
                    title: '삭제 확인 안내'
                }, this.ConfirmModal)
            ).then(value => {
                if(value) this.coDestroy(bo_id);
            }).catch(err => { /* An error occurred */ });
        },
        async coDestroy(bo_id) {
            try {
                let frm = new FormData();
                frm.append("_method", 'DELETE');
                const res = await http.post(`/api/board/${this.bo_cd}/destroy/${bo_id}`, frm);
                if (res && res.status === 200) {
                    this.makeToast("댓글 삭제");
                    this.index();
                }
            } catch (e) {
                if (e.response.status === 500) {
                    this.makeAlert(e.response.data);
                } else {
                    console.error('Failure!');
                    console.error(e.response.status);
                }
            }
        },
        hideCommentForm(){
            this.sltIndex = -1;
        },
        async goodBad(bo_id, type, idx) {
            try {
                let msg = '';
                let warning = '';
                const rst = await http.get(`/api/board/${this.bo_cd}/goodBad/${bo_id}/${type}`);
                let rstMsg = rst.data;

                if (rstMsg === 'success') {
                    if (type == 'GOOD') msg = "추천 적용";
                    else                msg = "비추천 적용";
                    this.makeToast(msg);
                    this.goodBadArrUpdate(type, idx, 'up');
                } else {
                    if (rstMsg == "already") {  warning = "취소시 지급된 포인트도 함께 취소됩니다. ";
                    } else if (rstMsg == "reverse") {
                        if (type == 'GOOD') warning = "비추천을 추천으로 ";
                        else                warning = "추천을 비추천으로 ";
                    }
                    this.$bvModal.msgBoxConfirm( warning + "수정하겠습니까?",
                        Object.assign({
                            title: '추천/비추천 안내'
                        }, this.ConfirmModal)
                    ).then(value => {
                        if(value) this.reGoodBad(bo_id, rstMsg, type, idx);
                    })
                    .catch(err => { /* An error occurred */ });
                }
            } catch (e) {
                this.errorConsolePrint(e);
            }
        },
        async reGoodBad(bo_id, rstMsg, type, idx) {
            const rst = await http.get(`/api/board/${this.bo_cd}/goodBad/${bo_id}/${rstMsg}`);
            if (rst.status === 200) {
                if (rstMsg == "already") {
                    this.goodBadArrUpdate(type, idx, 'down');
                } else if (rstMsg == "reverse") {
                    if (type == 'GOOD') {
                        this.goodBadArrUpdate(type, idx, 'up');
                        this.goodBadArrUpdate('BAD', idx, 'down');
                    } else {
                        this.goodBadArrUpdate(type, idx, 'up');
                        this.goodBadArrUpdate('GOOD', idx, 'down');
                    }
                }
            }
        },
        goodBadArrUpdate(type, idx, updown){
            if (type == 'GOOD') {
                if (updown == 'up')
                    this.bo_co_list[idx].bo_good++;
                else
                    this.bo_co_list[idx].bo_good--;
            } else {
                if (updown == 'up')
                    this.bo_co_list[idx].bo_bad++;
                else
                    this.bo_co_list[idx].bo_bad--;
            }
        },
        calcPl(dp) {
            return (dp.length-1)*30;
        },
        reCommentCancel() {
            this.sltIndex = -1;
        },

    },
    mounted() {
        this.index();
    },
    mixins:[common],
}
</script>

<style lang="css" scoped>
#bo_show #comment h5 { margin-bottom:1rem; }
#bo_show #comment>ul>li { border-bottom:1px solid #CCC; margin-bottom:1rem; padding-bottom:1rem; }
#bo_show #comment>ul>li .bo_content { margin:1rem auto; }
#bo_show #comment>ul>li .bo_content p img { max-width: 100%; }
/*#bo_show #comment .box_co { display:none; }
#bo_show #comment .box_co.active { display:block; }*/
</style>
