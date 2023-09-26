<template>
<div>
    <b-input-group size="sm">
        <b-form-input ref="input_cat" @keyup.enter="getOptList" />
        <b-input-group-append><b-button size="sm" @click="getOptList" ><b-icon-search /></b-button></b-input-group-append>
    </b-input-group>
    <ul class="list-group autocomplete" v-if="list.length" v-click-outside="hide">
        <li class="list-group-item" v-for="(itm, i) in list" @click="setOpt(i)" :key="i">{{ itm.go_name }}</li>
    </ul>
</div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'admShopGoods_comp_OptionFinder',
    props:['opt'],
    data() { return { list: [], } },
    methods:{
        async getOptList() {
            let v = this.$refs.input_cat.$el.value;
            let catno_regex = /\d{2}-\d{5,7}-{0,1}\d{0,3}/;

            if (!catno_regex.test(v)) {
                Notify.toast('warning', '캣넘버 형식에 맞추어 입력하세요'); 
                return false;
            }
            try {
                const res = await ax.get(`/api/admin/shop/goods/getOption/${v}`);
                if (res && res.status === 200) {
                    if (res.data.length) {
                        if (res.data == 'no-data') 
                            this.list = [{go_name:'정보없음'}];
                        else 
                            this.list = res.data;
                    } else
                        this.list = [{go_name:'정보없음'}];
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        setOpt(i) {
            if (this.list[i] && this.list[i].go_name != "정보없음") {
                this.opt.push({
                    go_name:this.list[i].go_name, 
                    go_required:this.list[i].go_required, 
                    goods_option_child:this.list[i].goods_option_child
                });

            }
            this.list = [];
        },
        hide(){ this.list=[]; }
    },
}
</script>
<style lang="css" scoped>
div >>> .input-group { width:30%; margin-left:auto;  }
@media (max-width: 992px) {
    div >>> .input-group { width:100%; }
}
</style>