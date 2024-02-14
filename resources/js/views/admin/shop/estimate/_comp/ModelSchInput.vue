<template>
<div class="cell">
    <b-input-group size="sm">
        <b-form-input autocomplete="off" ref="sch_field" :id="id" v-model="input_val" @keyup.enter="getModelList"></b-form-input>
        <b-input-group-append>
            <b-button size="sm" @click="getModelList" >
                <b-icon-search></b-icon-search>
            </b-button>
        </b-input-group-append>
    </b-input-group>

    <ul class="list-group autocomplete" v-if="model.length" v-click-outside="hide">
        <li href="#" class="list-group-item" v-for="(md, i) in model" :key="i" @click="setModel(i)">
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
    props:['value', 'type', 'id', 'em'],
    data() { return { model: [], } },
    computed: {
        input_val: {
            get: function() { return this.value; },
            set: function(v) { this.$emit('input', v); }
        }
    },
    methods:{
        async getModelList() {
            var v = this.$refs.sch_field.value;
            if (this.type == 'em_catno' && v.split('-').length < 3) {
                Notify.toast('warning', '최소 2번째 하이프(-)까지 입력해야 합니다.');
                return false;
            } else if (this.type == 'em_code' && v.length < 3) {
                Notify.toast('warning', '최소 3자 이상 입력시 검색 가능합니다.');
                return false;
            }
            if ( (this.type=='em_catno' && v.split('-').length > 2) ||
                 (this.type=='em_code'  && v.length > 2) ) {
                try {
                    const res = await ax.get(`/api/admin/shop/goods/getModel`, {params:{type:this.type, key:v}});
                    if (res && res.status === 200) {
                        if (res.data.length) {
                            this.model = res.data;
                        } else {
                            this.model = [{gm_name:'정보없음'}];
                        }
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.response.data.message);
                }
            }
        },
        async setModel(i) {
            if (this.model[i] && this.model[i].gm_name != "정보없음") {
                this.$set(this.em, 'em_gd_id'     , this.model[i].gm_gd_id);
                this.$set(this.em, 'em_gm_id'     , this.model[i].gm_id);
                this.$set(this.em, 'em_catno'     , this.model[i].gm_catno);
                this.$set(this.em, 'em_name'      , this.model[i].gm_name);
                this.$set(this.em, 'em_catno'     , this.model[i].gm_catno);
                this.$set(this.em, 'em_code'      , this.model[i].gm_code);
                this.$set(this.em, 'em_unit'      , this.model[i].gm_unit);
                this.$set(this.em, 'em_spec'      , this.model[i].gm_spec);
                this.$set(this.em, 'em_maker'     , this.model[i].goods.maker.mk_name);
                this.$set(this.em, 'em_ea'        , 1);
                this.$set(this.em, 'em_cost_price', this.model[i].gm_price);
                this.$set(this.em, 'em_dc_rate'   , this.model[i].goods.gd_dc);
                this.$set(this.em, 'em_price'     , this.model[i].gm_price);
                this.$set(this.em, 'em_dlvy_at'   , this.model[i].gm_dlvy_at);
                this.$set(this.em, 'bundle_dc'    , this.model[i].bundle_dc);
                this.$set(this.em, 'goods'        , this.model[i].goods);
            }
            this.hide();
        },
        hide(){ this.model = []; }
    }
}
</script>

<style scoped>
.cell { display:inline-block; position:relative; }
</style>