<template>
<b-container>
    <b-row><b-col><h3>목록 배열 사용자 정의</h3></b-col></b-row>
    <b-row class="mt-5">
        <b-col><h4>사용 항목</h4></b-col>
        <b-col class="text-right"><b-button variant="info" @click="update">수정</b-button></b-col>
    </b-row>
    <b-row>
        <draggable :list="mng_config.COLUMN" handle=".handle" group="column" class="col p-4 border border-info">
            <b-button v-for="v in mng_config.COLUMN" :key="v.umc_id" variant="success" class="handle">{{v.name}}</b-button>
        </draggable>
        <draggable :list="mng_config.MODEL" handle=".handle" group="model" class="col p-4 border border-info">
            <b-button v-for="v in mng_config.MODEL" :key="v.umc_id" variant="info" class="handle">{{v.name}}</b-button>
        </draggable>
    </b-row>
    <b-row class="mt-5"><b-col><h4>미사용 항목</h4></b-col></b-row>
    <b-row>
        <draggable :list="unchosen.COLUMN" handle=".handle" group="column" class="col p-4 border border-info">
            <b-button v-for="v in unchosen.COLUMN" :key="v.umc_val" variant="warning" class="handle">{{v.name}}</b-button>
        </draggable>
        <draggable :list="unchosen.MODEL" handle=".handle" group="model" class="col p-4 border border-info">
            <b-button v-for="v in unchosen.MODEL" :key="v.umc_val" variant="danger" class="handle">{{v.name}}</b-button>
        </draggable>
    </b-row>
</b-container>
</template>

<script>
import ax from '@/api/http';
import draggable from 'vuedraggable';
import copy from "fast-copy";

export default {
    name: 'AdmLedgerCustomSetColumn',
    components: { 
        draggable,
    },
    props:['mng_config', 'column_list'],
    data() { return { unchosen : { COLUMN:[], MODEL:[], }, }; },
    mounted() {
        let tmp = copy(this.column_list);
        this.mng_config.COLUMN.forEach(el => { this.$set(el, 'name', tmp.COLUMN[el.umc_val].name); delete tmp.COLUMN[el.umc_val]; });
        this.mng_config.MODEL.forEach(el => { this.$set(el, 'name', tmp.MODEL[el.umc_val].name); delete tmp.MODEL[el.umc_val]; });
        for (let k in tmp.COLUMN) this.unchosen.COLUMN.push({ name:tmp.COLUMN[k].name, umc_val:k, });
        for (let k in tmp.MODEL) this.unchosen.MODEL.push({ name:tmp.MODEL[k].name, umc_val:k, });
    },

    methods: {
        async update() {
            let res = await ax.post(`/api/admin/ledger/updateColumn`, this.mng_config);
            if (res && res.status === 200) {
                this.$emit('updateColumnComplete');
                Notify.toast('success', '수정 완료');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
h4 { text-align:left; }
.row .col { text-align:left; margin:10px 0; }
.row .col button { margin:10px; }
</style>