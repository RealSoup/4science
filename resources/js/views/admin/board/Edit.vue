<template>

<form ref="form" @submit.prevent="update">

    <FormGroup
        v-model="frm"
    />
<!--
v-model="something"

:value="something"
@input="value => { something = value }"
-->
    <div class="row">
        <div class="col-6">
            <router-link :to="{name: 'bo_index', params: { bo_cd:bo_cd }}" class="btn btn-sm btn-light">목록</router-link>
        </div>
        <div class="col-6 text-right">
            <button type="submit" class="btn btn-warning">수정</button>
        </div>
        {{this.$store.state.error.validationErrors}}
    </div>


</form>

</template>
<script>
import * as boardApi from '@/api/board';
import { mapState } from 'vuex';

import FormGroup from "./FormGroup.vue";

import { common } from "@/mixins/common";

export default {
    name: 'edit',
    components: {
        FormGroup,
    },
    data() {
        return {
            bo_cd:this.$route.params.bo_cd,
            bo_id:this.$route.params.bo_id,
            frm: {
                bo_subject:'',
                bo_content:'',
                fi_id:[],
            },
        };
    },
    watch: {
        authorizationErrors: function(newVal, oldVal) { // watch it
            this.makeAlert(newVal);
        }
    },
    computed: {
        ...mapState('board', ['bo_info', 'loading', 'bo_con']),
        ...mapState('error', {
            authorizationErrors: state => state.authorization
        }),
    },
    methods: {
        update() {
            // this.frm = [].concat(some_data);
            // this.frm.push( _method: 'PATCH' });
            // this.datas[3] = { item : "값4"}
            // this.datas.push({item: "값4"})
            this.frm = Object.assign(
                {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                this.frm, // 수정하려는 객체
                {_method : 'PATCH'} // 삽입하려는 내용
            );
            this.$store.dispatch('board/update', { bo_cd:this.bo_cd, bo_id:this.bo_id, frm:this.frm });
        },
        setFrm () {
            this.frm.bo_subject = this.$store.state.board.bo_con.bo.bo_subject;
            this.frm.bo_content = this.$store.state.board.bo_con.bo.bo_content;
        },
    },
    mixins:[common],
    mounted() {
        if (this.$route.name == 'bo_edit'){
            // if (Object.keys(this.$store.state.board.bo_con.bo).length) {
            if (!this.$store.state.board.bo_con.bo.hasOwnProperty('bo_id')) {
                return this.$store.dispatch('board/show', { bo_cd:this.bo_cd, bo_id:this.bo_id }).then(() => {
                    this.setFrm();
                });
            } else {
                this.setFrm();
            }
        }


    },

}
</script>
