<template lang="html">
    <draggable v-show="this.depth == 0 ? true : this.isOpen" :list="cate" handle=".ca_move" @change="sortUpdate" tag="ul">
        <li
            v-for="(ca, idx) in cate"
            :index="idx"
            :class="{hadChild: ca.hasChild}"
        >
            <div class="cate"
                v-if="!ca.update"
                :tabindex="idx"
                @mousedown.right ="showHiddenMenu(ca, $event)"
                @contextmenu.prevent
                @blur="hideHiddenMenu(ca)"
            >
                <div class="ca_name" @click="clickCate(ca)">
                    {{ca.ca_name}}
                    <span v-if="ca.hasChild">[{{ subOpen ? '-' : '+' }}]</span>
                </div>


                <transition name="slide-fade">
                    <div class="hd_menu" v-if="ca.showMenu">
                        <b-button variant="primary" size="sm" class="ca_move" v-b-tooltip.hover title="순서 변경">
                            <b-icon icon="arrow-down-up"></b-icon>
                        </b-button>
                        <b-button variant="info" size="sm" v-if="!ca.hasChild" @click="makeSub(ca)" v-b-tooltip.hover title="하위 카테고리 생성">
                            <b-icon icon="diagram3-fill"></b-icon>
                        </b-button>
                        <b-button variant="warning" size="sm" @click="update(ca)" v-b-tooltip.hover title="이름 변경">
                            <b-icon icon="tools"></b-icon>
                        </b-button>
                        <b-button variant="danger" size="sm" @click="isDestroy(ca.ca_id, idx)" v-b-tooltip.hover title="삭제">
                            <b-icon icon="trash"></b-icon>
                        </b-button>
                    </div>
                </transition>
            </div>
            <b-row>
                <b-col lg="8" md="10" cols="12" class="py-1">
                    <input-update
                        v-if="ca.update"
                        :ca="ca">
                    </input-update>
                </b-col>
            </b-row>


            <tree-view
                v-if="ca.subCate"
                :key="ca.ca_id"
                :cate="ca.subCate"
                :ca_papa="ca.ca_id"
                :gene_idx="gene_idx + '-' + idx"
                :depth="depth + 1"
                @get-sub="getSub"
                @make-sube="makeSub"
                ref="childCate"
                :isOpen="ca.sub_show"
                :parent="ca"
            />
        </li>
        
        <li>
            <b-row>
                <b-col lg="8" md="10" cols="12" class="py-1">
                    <input-insert
                        :cate="cate"
                        :ca_papa="ca_papa"
                        :gene_idx="gene_idx"
                        @recount="recount">
                    </input-insert>
                </b-col>
            </b-row>
        </li>
    </draggable>
</template>

<script>
import ax from '@/api/http';
import draggable from 'vuedraggable';
export default {
    name: "TreeView", // recursive 하기위해서 필요함. 없으면 error
    components: {
        draggable,
        'InputInsert': () => import('./InputInsert.vue'),
        'InputUpdate': () => import('./InputUpdate.vue'),
    },
    props:['isOpen', 'cate', 'depth', 'ca_papa', 'gene_idx', 'parent'],
    data() {
        return {
            subOpen: false,
        };
    },
    watch: {
        comment_mode: function(newVal, oldVal) { // watch it
            this.setBoContent();
        },
    },
    computed: {

    },
    methods: {
        clickCate(ca) {
            if (ca.hasChild) {
                this.openSwitch(ca);
                if (!ca.hasOwnProperty('subCate'))
                    this.getSub(ca);
            } else {
                if (ca.sub_show && !ca.hasChild && !ca.subCate.length) {
                    //  자식 카테고리 없고 인풋창만 보일때
                    //  ca.subCate 삭제
                    this.$delete(ca, 'subCate');
                    this.openSwitch(ca);
                }
            }
        },
        openSwitch: function (ca) {
            this.$set(ca, 'sub_show', !ca.sub_show);
            // this.hideHiddenMenu(ca);
        },
        makeSub(ca) {
            this.$set(ca, 'subCate', []);
            this.openSwitch(ca);
        },
        getSub(ca) {
            this.$emit('get-sub', ca);
        },
        showHiddenMenu(ca, e) {
            this.$set(ca, 'showMenu', true);
            e.target.focus();
        },
        hideHiddenMenu(ca) {
            this.$set(ca, 'showMenu', false);
        },
        recount(){
            this.$set(this.parent, 'hasChild', this.cate.length?true:false);
            // console.log(this.parent);
        },
        update(ca) {
            this.$set(ca, 'update', true);
        },
        isDestroy(ca_id, idx) {
            this.$bvModal.msgBoxConfirm( "삭제 하시겠습니까?",
                Object.assign({
                    title: '삭제 확인 안내'
                }, this.ConfirmModal)
            ).then(value => {
                if(value) this.coDestroy(ca_id, idx);
            }).catch(err => { /* An error occurred */ });
        },
        async coDestroy(ca_id, idx) {
            try {
                let frm = new FormData();
                frm.append("_method", 'DELETE');
                const res = await ax.post(`/api/admin/shop/category/${ca_id}`, frm);
                if (res && res.status === 200) {
                    Notify.toast('success', '삭제');
                    this.$delete(this.parent.subCate, idx);
                    this.recount();
                }
            } catch (e) {
                Notify.consolePrint(e);
            }
        },

        async sortUpdate(e) {
            console.log(e);
            try {
                const res = await ax.post('/api/admin/shop/category/set_seq', {
                    ca_seq:e.moved.newIndex,
                    old_ca_seq:e.moved.oldIndex,
                    ca_papa:e.moved.element.ca_papa,
                });
                if (res && res.status === 200)
                    Notify.toast('success', '순서 변경 완료');
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
    },
    directives: {
        focus: {
            inserted (el) {
                el.focus()
            }
        }
    },
    mounted() {

    },
}
</script>

<style lang="css" scoped>
ul { margin-top:0.6rem; }
ul li { position:relative;  }
ul li:before {
    position:absolute; top:15px; left:-20px;
    content:""; width:10px; height:10px; border:1px solid black; border-radius:50%
}
ul li.hadChild > .cate > .ca_name { font-weight:bold; }
ul li.hadChild:before { background:black; }
ul li button { border-width:0; line-height:12px; }
ul li .cate { cursor:pointer; }
ul li .cate .ca_name { display:inline-block; padding:8px 0; border:2px dashed #FFF; }
ul li .cate .hd_menu { display:inline-block; position:relative; top:-2px; }
/* #adm_category ul li .cate .hd_menu button { padding:0.2rem 0.25rem; font-size:0.56rem; line-height:0; } */
ul li .row { padding:2.5px 0; }
ul li .cate:focus .ca_name { border-color:#262b57; border-radius:5px; background-color:#F0F0F0; }

.slide-fade-enter-active {
  transition: all .1s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
