<template lang="html">
<div>
    <b-form-input autocomplete="off"
        id="gd_mk_id"
        v-model="input_val"
        @keyup.enter="getMakerList"
        v-b-tooltip.hover title="입력 후 엔터 or 버튼"
        ref="sch_field"
    />

    <b-button @click="getMakerList" size="sm" class="overlap"><b-icon-search /></b-button>
    <ul class="list-group autocomplete" v-if="maker.length" v-click-outside="hide">
        <li class="list-group-item" v-for="(mk, i) in maker" @click="setMaker(i)">{{ mk.mk_name }}</li>
    </ul>
</div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'admShopGoods_compMakerInput',
    props:['value', 'frm'],
    data() {
        return {
            maker: [],
        }
    },
    computed: {
        input_val: {
            get: function() {
                return this.value;
            },
            set: function(v) {
                this.$emit('input', v);
            }
        }
    },
    methods:{
        async getMakerList() {
            var v = this.$refs.sch_field.value;
            if (v.length < 2) {
                Notify.toast('warning', '2자 이상 입력시 검색 가능합니다.');
                return false;
            } else  {
                try {
                    const res = await ax.get(`/api/admin/shop/maker`, {params:{type:'all', mk_name:v}});
                    if (res && res.status === 200) {
                        if (res.data.list.length)
                            this.maker = res.data.list;
                        else
                            this.maker = [{mk_name:'정보없음'}]
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.response.data.message);
                }
            }


        },
        setMaker(i) {
            if (this.maker[i] && this.maker[i].mk_name != "정보없음") {
                this.$set(this.frm, 'gd_mk_id'  , this.maker[i].mk_id);
                this.$set(this.frm, 'gd_mk_name', this.maker[i].mk_name);
                // this.$set(this.frm, 'gd_mk_name', this.maker[i].mk_name);
            }
            this.maker = [];
        },
        hide(){
            this.maker=[];
        }
    },

}
</script>