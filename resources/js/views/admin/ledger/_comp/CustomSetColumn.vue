<template>
    <b-container>
        <b-row><b-col><h3>목록 배열 사용자 정의</h3></b-col></b-row>

        <b-row class="mt-5">
            <b-col><h4>사용 항목</h4></b-col>
            <b-col class="text-right">
                <b-button variant="info" @click="update">수정</b-button>
            </b-col>
        </b-row>
        <b-row>
            <draggable :list="list_chosen_clmn" handle=".handle" group="column" class="col p-4 border border-info">
                <b-button v-for="(cc, i) in list_chosen_clmn" :key="i" variant="success" class="handle">
                    {{cc.name}}
                </b-button>
            </draggable>
    
            <draggable :list="list_chosen_model" handle=".handle" group="model" class="col p-4 border border-info">
                <b-button v-for="(cc, i) in list_chosen_model" :key="i" variant="info" class="handle">
                    {{cc.name}}
                </b-button>
            </draggable>
        </b-row>
        
        

        
        <b-row class="mt-5"><b-col><h4>미사용 항목</h4></b-col></b-row>
        <b-row>
            <draggable :list="list_unchosen_clmn" handle=".handle" group="column" class="col p-4 border border-info">
                <b-button v-for="(cc, i) in list_unchosen_clmn" :key="i" variant="warning" class="handle">
                    {{cc.name}}
                </b-button>
            </draggable>
            
            <draggable :list="list_unchosen_model" handle=".handle" group="model" class="col p-4 border border-info">
                <b-button v-for="(cc, i) in list_unchosen_model" :key="i" variant="danger" class="handle">
                    {{cc.name}}
                </b-button>
            </draggable>
        </b-row>
        
    </b-container>
</template>

<script>
import ax from '@/api/http';
import draggable from 'vuedraggable';

export default {
    name: 'AdmLedgerCustomSetColumn',
    components: { 
        draggable,
    },
    props:['db_config_clmn', 'db_config_model', 'column_list_clmn', 'column_list_model'],
    data() {
        return {
            list_chosen_clmn:[],
            list_unchosen_clmn:[],
            list_chosen_model:[],
            list_unchosen_model:[],
        };
    },

    mounted() {
        let temp_column_list_clmn = Object.assign( {}, this.column_list_clmn );
        let temp_db_config_clmn = this.db_config_clmn ? this.db_config_clmn.slice() : [];
        temp_db_config_clmn.forEach(el => {
            el.name=temp_column_list_clmn[el.umc_val].name;
            delete temp_column_list_clmn[el.umc_val];
        });
        this.list_chosen_clmn = temp_db_config_clmn;
        this.list_unchosen_clmn = Object.values(temp_column_list_clmn);

        let temp_column_list_model = Object.assign( {}, this.column_list_model );
        let temp_db_config_model = this.db_config_model ? this.db_config_model.slice() : [];
        temp_db_config_model.forEach(el => {
            el.name=temp_column_list_model[el.umc_val].name;
            delete temp_column_list_model[el.umc_val];
        });
        this.list_chosen_model = temp_db_config_model;
        this.list_unchosen_model = Object.values(temp_column_list_model);
    },

    methods: {
        async update() {
            let res = await ax.post(`/api/admin/ledger/updateColumn`, {chosen_data_clmn : this.list_chosen_clmn, chosen_data_model : this.list_chosen_model});
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