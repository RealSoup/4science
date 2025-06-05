<template>
<b-container class="p_wrap">
    <b-row class="justify-content-center">
        <b-col sm="12" md="10" lg="6">
            <h3 class="p_tit">제조사</h3>
            <b-card class="adform">
                <b-container>
                    <b-row cols="1" cols-md="2">
                        <b-col>
                            <b-input-group size="sm">
                                <b-input-group-prepend>
                                    <b-button variant="info" @click="index"><b-icon-search /></b-button>
                                </b-input-group-prepend>
                                <b-form-input v-model="sch_mk_name" placeholder="제조사 검색" class="text-right" @keyup.enter="index" />
                            </b-input-group>
                        </b-col>
                        <b-col>
                            <b-input-group size="sm">
                                <b-form-input v-model="new_mk_name" placeholder="제조사 등록" @keyup.enter="store" />
                                <b-input-group-append>
                                    <b-button variant="info" @click="store"><b-icon-pencil-square /></b-button>
                                </b-input-group-append>
                            </b-input-group>
                            <Validation :error="$store.state.error.validations.mk_name"></Validation>
                        </b-col>
                    </b-row>
                </b-container>
                <hr />
                <b-container>
                    <b-row v-if="maker.data && maker.data.length" cols="1">
                        <b-col v-for="(row, idx) in maker.data" :key="row.mk_id">
                            <index-input
                                :no="numCalc(idx)"
                                :mk="row"
                                @update="update"
                                @destroy="destroy(row.mk_id, idx)">
                            </index-input>
                        </b-col>
                    </b-row>
                    <b-alert v-else variant="danger" show>No Item</b-alert>
                </b-container>

                <pagination :data="maker" @pagination-change-page="setPage" :limit="3" align="center" class="mt-5"></pagination>
            </b-card>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import axios from 'axios';

export default {
    components: {
        'IndexInput': () => import('./IndexInput.vue'),
        'Validation': () => import('@/views/_common/Validation.vue'),
    },
    data() {
        return {
            maker: {},
            new_mk_name: '',
            sch_mk_name: '',
            page:0,
        }
    },
    methods: {
        numCalc(i) {
            return this.maker.total - (this.maker.current_page - 1) * this.maker.per_page - i ;
        },
        async index(){
            try {
                let params = new URLSearchParams();
                if (this.sch_mk_name)
                    params.append('mk_name', this.sch_mk_name);
                if (this.page)
                    params.append('page', this.page);
                const res = await axios.get(`/api/admin/shop/maker`, { params: params});

                if (res && res.status === 200) {
                    this.maker = res.data.list;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        setPage(page) {
            this.page = page;
            this.index();
        },
        async store(){
            try {
                const res = await axios.post(`/api/admin/shop/maker`, {mk_name:this.new_mk_name});
                if (res && res.status === 200) {
                    this.maker.data.unshift(res.data);
                    this.maker.total++;
                    this.new_mk_name = '';
                    Notify.toast('success', '제조사 등록')
                } else {
                    Notify.toast('danger', '등록 실패')
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('danger', '등록 실패');
                if (e.response.status == 422) {
                    Notify.toast('danger', e.response.data.errors.mk_name);
                } else {
                    Notify.toast('danger', e.response.data.message);
                }
            }
        },
        async update(mk){
            try {
                const res = await axios.post(`/api/admin/shop/maker/${mk.mk_id}`, {_method : 'PATCH', mk_name:mk.mk_name});
                if (res && res.status === 200) Notify.toast('success', '제조사 수정');
                else {
                    Notify.toast('warning', '수정 실패');
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', '수정 실패');
                if (e.response.status == 422) {
                    Notify.toast('warning', e.response.data.errors.mk_name);
                } else {
                    Notify.toast('warning', e.response.data.message);
                }
                this.index();
            }
        },
        async destroy(mk_id, idx){
            var rst = await Notify.confirm('제조사를 삭제', 'danger');
            if (rst) {
                try {
                    let frm = new FormData();
                    frm.append("_method", 'DELETE');
                    const res = await axios.post(`/api/admin/shop/maker/${mk_id}`, frm);
                    if (res && res.status === 200) {
                        Notify.toast('success', '제조사 삭제')
                        this.$delete(this.maker.data, idx);
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('danger', '삭제 실패');
                    Notify.toast('danger', e.response.data.message);
                    this.index();
                }
            }
        },
    },
    async mounted() { this.index(); },
}
</script>

<style lang="css" scoped>
.input-group button { border-width:0; }
.adm_maker table thead th { text-align:center; }

.card.adform .row .label { flex:0 0 13%; max-width:13%; font-size: .9rem; letter-spacing: -1px; }
.card.adform .row .label + .type04 { flex:0 0 37%; max-width:37%; }
</style>
