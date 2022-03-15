<template lang="html">
    <b-row class="mt-3">
        <b-col cols="4" offset="2">
            <ul class="list-group autocomplete" v-if="option.length" v-click-outside="hideOption">
                <li class="list-group-item" v-for="(op, i) in option" @click="setOption(i)">{{ op.op_name }}</li>
            </ul>
        </b-col>
        <b-col cols="4" v-if="option_child.length">
            <ul class="list-group autocomplete" v-click-outside="hideOptionChild">
                <li class="list-group-item" v-for="(opc, i) in option_child" @click="setOptionChild(i)">{{ opc.opc_name }}</li>
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
            option: [],
            option_child: [],
            selOpt:{}
        }
    },
    watch: {
        value: function(newVal, oldVal) { // watch it
            this.$emit('calculator');
        },
    },
    methods: {
        async getOption(id){
            if (!id)
                Notify.modal('등록된 상품이 없습니다.');

            try {
                const res = await ax.get(`/api/admin/shop/option`, {params:{gd_id:id}});
                if (res && res.status === 200) {
                    if (res.data.length < 1)
                        Notify.modal('등록된 옵션이 없습니다.');
                    this.option = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async setOption(i) {
            if (this.option[i]) {
                this.selOpt = this.option[i];
                try {
                    const res = await ax.get(`/api/admin/shop/option_child`, {params:{op_id:this.selOpt.op_id}});
                    if (res && res.status === 200) {
                        this.option_child = res.data;
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.response.data.message);
                }
            }
        },
        setOptionChild(i) {
            if (this.option_child[i]) {
                var nO = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    {
                        eo_em_id : this.em_id,
                        eo_gd_id : this.gd_id,
                        eo_opc_id : this.option_child[i].opc_id,
                        eo_tit : this.selOpt.op_name,
                        eo_name : this.option_child[i].opc_name,
                        eo_ea : 1,
                        eo_price : this.option_child[i].opc_price,
                    }
                );
                this.value.push(nO);
            }
            this.option_child=[];
        },
        hideOption(){
            this.option=[];
        },
        hideOptionChild(){
            this.option_child=[];
        }
    }
}
</script>
