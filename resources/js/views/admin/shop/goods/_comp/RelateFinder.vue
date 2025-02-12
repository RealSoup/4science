<template>
<div class="awesome_p">
    <input type="text" required autocomplete="off"
        id="relate_finder_input"
        @keyup.enter="getGoodsList"
        v-b-tooltip.hover title="입력 후 엔터 or 버튼"
        ref="sch_field"
    />
    <label for="relate_finder_input">CAT.No</label>

    <b-button @click="getGoodsList" class="xm"><b-icon-search></b-icon-search></b-button>
    <ul class="list-group autocomplete" v-if="sch_list.length" v-click-outside="hide">
        <li class="list-group-item" v-for="(gd, i) in sch_list" :key="i" @click="setGoods(i)">{{ gd.gd_name }}</li>
    </ul>
</div>
</template>

<script>
import ax from '@/api/http';

export default {
    name:'AdmShopGoods_compRelateFinder',
    props:['list', 'papa_gd_id', 'seq'],
    data() {
        return {
            sch_list: [],
        }
    },
    methods:{
        async getGoodsList() {
            var v = this.$refs.sch_field.value;
            if (v.length < 2) {
                Notify.toast('warning', '2자 이상 입력시 검색 가능합니다.');
                return false;
            } else {
                try {
                    const res = await ax.get(`/api/admin/shop/goods/getGoodsList`, {params:{catno:v}});
                    if (res && res.status === 200) {
                        if (res.data.length)
                            this.sch_list = res.data;
                        else
                            this.sch_list = [{gd_name:'정보없음'}]
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.response.data.message);
                }
            }
        },
        setGoods(i) {
            if (this.sch_list[i] && this.sch_list[i].gd_name != "정보없음") {
                this.list.push({
                    gr_id:0,
                    gr_papa_gd_id: this.papa_gd_id,
                    gr_gd_id  : this.sch_list[i].gd_id,
                    gr_seq  : this.seq,
                    goods   : {
                        gd_name: this.sch_list[i].gd_name,
                        image_src_thumb: [this.sch_list[i].image_src_thumb[0]],
                    }
                });
            }
            this.hide();
            
        },
        hide() { 
            this.sch_list=[];
            this.$refs.sch_field.value = '';
        }
    },
}
</script>
