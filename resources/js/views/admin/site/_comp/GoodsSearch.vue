<template lang="html">
    <div class="awesome_p">
        <input type="text" required autocomplete="off"
            id="gd_name"
            @keyup.enter="getGoodsList"
            v-b-tooltip.hover title="입력 후 엔터 or 버튼"
            ref="sch_field"
        />
        <label for="gd_name">상품명</label>

        <b-button @click="getGoodsList" size="sm"><b-icon-search /></b-button>
        <ul class="list-group autocomplete" v-if="list.length" v-click-outside="hide">
            <li class="list-group-item" v-for="(gd, i) in list" @click="setGoods(i)">
                {{ gd.gd_name }}
            </li>
        </ul>
    </div>
</template>

<script>
import ax from '@/api/http';

export default {
    name:'AdmSiteGoodsSearch',
    props:['group', 'sw_group', 'sw_seq'],
    data() {
        return {
            list: [],
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
                    const res = await ax.get(`/api/admin/shop/goods/getGoodsList`, {params:{gd_name:v}});
                    if (res && res.status === 200) {
                        if (res.data.length)
                            this.list = res.data;
                        else
                            this.list = [{gd_name:'정보없음'}]
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.response.data.message);
                }
            }
        },
        setGoods(i) {
            if (this.list[i] && this.list[i].gd_name != "정보없음") {
                this.group.push({
                    sw_group: this.sw_group,
                    sw_key  : this.list[i].gd_id,
                    sw_type : "ca_best",
                    sw_seq  : this.sw_seq,
                    goods   : {
                        gd_name: this.list[i].gd_name,
                        image_src_thumb: [this.list[i].image_src_thumb[0]],
                    }
                });
            }
            this.list = [];
        },
        hide() {
            this.list=[];
        }
    },
}
</script>
