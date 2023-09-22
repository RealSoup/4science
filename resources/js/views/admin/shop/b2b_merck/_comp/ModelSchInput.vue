<template lang="html">
<div>
    <b-form-input autocomplete="off"
        size="sm"
        @keyup.enter="getModelList"
        v-b-tooltip.hover title="입력 후 엔터 or 버튼"
        v-model="input_v"
        ref="sch_field"
    />

    <b-button @click="getModelList" size="sm" class="overlap"><b-icon-search /></b-button>
    <ul class="list-group autocomplete" v-if="model.length" v-click-outside="hide">
        <li href="#" class="list-group-item" v-for="(md, i) in model" @click="addModel(i)">
            {{ md.gm_name }}<br />
            <b-badge v-if="md.gm_catno">{{md.gm_catno}}</b-badge><br />
            <b-badge v-if="md.gm_code">{{md.gm_code}}</b-badge><br />
        </li>
    </ul>
</div>
</template>

<script>
import ax from '@/api/http';

export default {
    data() {
        return {
            input_v:"",
            model: [],
        }
    },
    computed: {
    },
    methods:{
        async getModelList() {
            var v = this.input_v;
            if (v.length < 4) {
                Notify.toast('warning', '최소 4자 이상 입력시 검색 가능합니다.');
                return false;
            } else {
                try {
                    const res = await ax.get(`/api/admin/shop/goods/getModel`, {params:{ca01:"40", type:"em_code", key:v}});
                    if (res && res.status === 200) {
                        if (res.data.length) this.model = res.data;
                        else this.model = [{gm_name:'정보없음'}];
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.response.data.message);
                }
            }
        },
        async addModel(i) {
            if (this.model[i] && this.model[i].gm_name != "정보없음") {
                this.$emit('addModel', this.model[i]);
            }
            
            this.hide();
        },
        hide(){
            this.model = [];
        }
    }
}
</script>

<style scoped>
.overlap { position:absolute; bottom:18.5px; right:3px; bottom:4px; padding:.2rem .25rem; font-size:.875rem; line-height:1; }
.autocomplete { width: 40%; }
</style>