<template>
    <b-container>
        <b-row><b-col><h3>검색 옵션 사용자 정의</h3></b-col></b-row>

        <b-row class="mt-5">
            <b-col><h4>사용 항목</h4></b-col>
            <b-col class="text-right">
                <b-button variant="info" @click="update">수정</b-button>
            </b-col>
        </b-row>
        <draggable :list="list_chosen" handle=".handle" group="config" class="row p-2 border border-info">
            <b-col v-for="(cc, i) in list_chosen" :key="i" col cols="3">
                <b-button variant="success" class="handle">{{cc.name}}</b-button>
            </b-col>
        </draggable>

        
        <b-row class="mt-5"><b-col><h4>미사용 항목</h4></b-col></b-row>
        <draggable :list="list_unchosen" handle=".handle" group="config" class="row p-2 border border-info">
            <b-col v-for="(cc, i) in list_unchosen" :key="i" col cols="3">
                <b-button variant="warning" class="handle">{{cc.name}}</b-button>
            </b-col>
        </draggable>
    </b-container>
</template>

<script>
import ax from '@/api/http';
import draggable from 'vuedraggable';

export default {
    name: 'AdmLedgerCustomSetSearch',
    components: { 
        draggable,
    },
    props:['db_data_config_sch', 'sch_item_list'],
    data() {
        return {
            list_chosen:[],
            list_unchosen:[],
        };
    },

    mounted() {
        let temp_sch_item_list = Object.assign( {}, this.sch_item_list );
        let temp_db_data_config_sch = this.db_data_config_sch ? this.db_data_config_sch.slice() : [];
        temp_db_data_config_sch.forEach(el => {
            el.name=temp_sch_item_list[el.umc_val].name;
            delete temp_sch_item_list[el.umc_val];
        });
        this.list_chosen = temp_db_data_config_sch;
        this.list_unchosen = Object.values(temp_sch_item_list);
    },

    methods: {
        async update() {
            let res = await ax.post(`/api/admin/ledger/updateSearch`, {chosen_data : this.list_chosen});
            if (res && res.status === 200) {
                this.$emit('updateSearchComplete');
                Notify.toast('success', '수정 완료');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
h4 { text-align:left; }
.row .col { text-align:left; margin:10px 0; }
</style>