<template lang="html">
    <div class="adm_maker">
        <b-card header-tag="header" class="shadow">
            <template #header>
                <b-container>
                    <b-row cols="1" cols-md="2">
                        <b-col>
                            <b-input-group size="sm">
                                <b-input-group-prepend>
                                    <b-button variant="info" @click="index"><b-icon icon="search"></b-icon></b-button>
                                </b-input-group-prepend>
                                <b-form-input v-model="sch_mk_name" placeholder="제조사 검색" class="text-right"></b-form-input>
                            </b-input-group>
                        </b-col>

                        <b-col>
                            <b-input-group size="sm">
                                <b-form-input v-model="new_mk_name" placeholder="제조사 등록"></b-form-input>
                                <b-input-group-append>
                                    <b-button variant="info" @click="store"><b-icon icon="pencil-square"></b-icon></b-button>
                                </b-input-group-append>
                            </b-input-group>
                            <div v-if="validationErrors.mk_name !== undefined" class="alert alert-danger"> {{ validationErrors.mk_name }} </div>
                        </b-col>
                    </b-row>
                </b-container>
            </template>

            <b-container>
                <b-row v-if="maker.data && maker.data.length" cols="1">
                    <b-col v-for="(row, idx) in maker.data" :key="row.mk_id" class="mt-2">
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

            <pagination :data="maker" @pagination-change-page="setPage" align="center" class="mt-5"></pagination>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
    components: {
        'IndexInput': () => import('./IndexInput.vue'),
    },
    data() {
        return {
            maker: {},
            new_mk_name: '',
            sch_mk_name: '',
            page:0
        }
    },
    computed: {
        ...mapState('error', {
            validationErrors: state => state.validations,
        }),
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
                const res = await axios.get(`/api/admin/shop/maker/`, { params: params});

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
                const res = await axios.post(`/api/admin/shop/maker/`, {mk_name:this.new_mk_name});
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
        },


    },
    mounted() {
        this.index();
    },
}
</script>

<style lang="css" scoped>
.input-group button { border-width:0; }
.adm_maker table thead th { text-align:center; }
</style>
