<template lang="html">
    <b-row class="mt-3">
        <b-col cols="4" offset="2">
            <ul class="list-group autocomplete" v-if="goods_option.length" v-click-outside="hideOption">
                <li class="list-group-item" v-for="(go, i) in goods_option" @click="setOption(i)">{{ go.go_name }}</li>
            </ul>
        </b-col>
        <b-col cols="4" v-if="goods_option_child.length">
            <ul class="list-group autocomplete" v-click-outside="hideOptionChild">
                <li class="list-group-item" v-for="(goc, i) in goods_option_child" @click="setOptionChild(i)">{{ goc.goc_name }}</li>
            </ul>
        </b-col>
    </b-row>
</template>

<script>
import ax from '@/api/http';
export default {
    props:['value', 'em_id', 'gd_id'],
    data() {
        return {
            goods_option: [],
            goods_option_child: [],
            selOpt:{}
        }
    },
    // watch: {
    //     value: function(newVal, oldVal) { // watch it
    //         this.$emit('calculator');
    //     },
    // },
    methods: {
        async getOption(id){
            if (!id)
                Notify.modal('등록된 상품이 없습니다.', 'warning');

            try {
                const res = await ax.get(`/api/admin/shop/goods_option`, {params:{gd_id:id}});
                if (res && res.status === 200) {
                    if (res.data.length < 1)
                        Notify.modal('등록된 옵션이 없습니다.', 'warning');
                    this.goods_option = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async setOption(i) {
            if (this.goods_option[i]) {
                this.selOpt = this.goods_option[i];
                try {
                    const res = await ax.get(`/api/admin/shop/goods_option_child`, {params:{go_id:this.selOpt.go_id}});
                    if (res && res.status === 200) {
                        this.goods_option_child = res.data;
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.response.data.message);
                }
            }
        },
        setOptionChild(i) {
            if (this.goods_option_child[i]) {
                var nO = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    {
                        eo_em_id : this.em_id,
                        eo_gd_id : this.gd_id,
                        eo_goc_id : this.goods_option_child[i].goc_id,
                        eo_tit : this.selOpt.go_name,
                        eo_name : this.goods_option_child[i].goc_name,
                        eo_ea : 1,
                        eo_price : this.goods_option_child[i].goc_price,
                    }
                );
                this.value.push(nO);
            }
            this.goods_option_child=[];
        },
        hideOption(){
            this.goods_option=[];
        },
        hideOptionChild(){
            this.goods_option_child=[];
        }
    }
}
</script>
