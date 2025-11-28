<template>
<b-container class="p_wrap">
    <b-row>
        <b-col>
            <b-input-group size="sm">
                <b-input-group-prepend is-text>
                    <b-form-checkbox v-model="frm.ua_def" value='Y' unchecked-value="N" size="sm" v-b-tooltip="'기본 배송지'"></b-form-checkbox>
                </b-input-group-prepend>
                <b-form-input v-model="frm.ua_title" size="sm" placeholder="배송지명"></b-form-input>
            </b-input-group> 
        </b-col>
        <b-col><b-form-input v-model="frm.ua_name" size="sm" maxlength="20" placeholder="수령인"></b-form-input></b-col>
        <b-col><b-form-input v-model="frm.ua_hp" size="sm" placeholder="HP" :formatter="frm_formatHp"></b-form-input></b-col>
        <b-col>
            <b-button variant="primary" class="xm" @click="store(i)">추가</b-button>
        </b-col>
        
        <b-col><b-form-input v-model="frm.ua_zip" size="sm" maxlength="5" placeholder="우편번호"></b-form-input></b-col>
        <b-col><b-form-input v-model="frm.ua_addr1" size="sm" placeholder="도로명"></b-form-input></b-col>
        <b-col><b-form-input v-model="frm.ua_addr2" size="sm" placeholder="상세"></b-form-input></b-col>
        <b-col><b-form-input v-model="frm.ua_memo" size="sm" placeholder="배송시 요청사항"></b-form-input></b-col>
    </b-row>
    <b-row v-for="(addr, i) in address" :key="addr.ua_id">
        <b-col>
            <b-input-group size="sm">
                <b-input-group-prepend is-text>
                    <b-form-checkbox v-model="addr.ua_def" value='Y' unchecked-value="N" @change="uniqueCheck(i)" size="sm" v-b-tooltip="'기본 배송지'"></b-form-checkbox>
                </b-input-group-prepend>
                <b-form-input v-model="addr.ua_title" size="sm" placeholder="배송지명"></b-form-input>
            </b-input-group> 
        </b-col>
        <b-col><b-form-input v-model="addr.ua_name" size="sm" maxlength="20" placeholder="수령인"></b-form-input></b-col>
        <b-col><b-form-input v-model="addr.ua_hp" size="sm" placeholder="HP" :formatter="frm_formatHp"></b-form-input></b-col>
        <b-col>
            <b-button variant="danger" class="xm" @click="destroy(i)">삭제</b-button>
            <b-button variant="warning" class="xm" @click="update(i)">수정</b-button>
        </b-col>

        <b-col><b-form-input v-model="addr.ua_zip" size="sm" maxlength="5" placeholder="우편번호"></b-form-input></b-col>
        <b-col><b-form-input v-model="addr.ua_addr1" size="sm" placeholder="도로명"></b-form-input></b-col>
        <b-col><b-form-input v-model="addr.ua_addr2" size="sm" placeholder="상세"></b-form-input></b-col>
        <b-col><b-form-input v-model="addr.ua_memo" size="sm" placeholder="배송시 요청사항"></b-form-input></b-col>
    </b-row>
</b-container>
</template>


<script>
import ax from '@/api/http';
export default {
    name:"AdmUserEditAddress",
    
    data() {
        return {
            frm:{
                ua_key:this.$route.params.id
            },
            address: [],
        };
    },
    methods: {
        frm_inint () {
            this.$delete(this.frm, 'ua_def');
            this.$delete(this.frm, 'ua_title');
            this.$delete(this.frm, 'ua_name');
            this.$delete(this.frm, 'ua_hp');
            this.$delete(this.frm, 'ua_zip');
            this.$delete(this.frm, 'ua_addr1');
            this.$delete(this.frm, 'ua_addr2');
            this.$delete(this.frm, 'ua_memo');
        },
        async index() {
            const res = await ax.get(`/api/admin/user/indesAddr/${this.$route.params.id}`);
            if (res && res.status === 200) {
                this.address = res.data;
                this.frm_inint();
            }
        },
        async store () { 
            const res = await ax.post(`/api/admin/user/storeAddr`, this.frm);
            if (res && res.status === 200) {
                Notify.toast('success', '배송지 추가')
                this.index();
            }
        },
        async update (i) {
            let flag = true;
            this.address.forEach(v => {
                if(v.ua_def=='Y') flag = false
            }); 

            if(flag) {
                Notify.modal("기본 배송지가 없습니다.");
                return false;
            }
                
            const res = await ax.post(`/api/admin/user/updateAddr`, this.address[i]);
            if (res && res.status === 200) {
                Notify.toast('success', '배송지 수정')
                this.index();
            }
        },
        async destroy (i) {
            if(this.address[i].ua_def == 'Y') {
                Notify.modal("기본 배송지는 삭제 할 수 없습니다.");
                return false;
            }
            var rst = await Notify.confirm('삭제', 'danger');
            if (rst) {
                const res = await ax.get(`/api/admin/user/destroyAddr/${this.address[i].ua_id}`);
                if (res && res.status === 200) {
                    Notify.toast('success', '배송지 삭제')
                    this.$delete(this.address, i); 
                    this.index();
                }
            }
        },
        uniqueCheck(i){
            if(this.address[i].ua_def == 'Y'){
                for (var ii in this.address)
                    if(i != ii)
                        this.address[ii].ua_def='N';
            }
        },
        frm_formatHp(v)   { return this.formatHp(v); },
    },
    mounted() { this.index(); },
}
</script>

<style scoped>
.p_wrap .row { margin:.5rem 0; border-bottom:2px solid #666 }
.p_wrap .row .col { margin-bottom:.2rem; }
.p_wrap .row .col:nth-child(1) { flex:0 0 30%; max-width:30%; }
.p_wrap .row .col:nth-child(2) { flex:0 0 20%; max-width:20%; }
.p_wrap .row .col:nth-child(3) { flex:0 0 30%; max-width:30%; }
.p_wrap .row .col:nth-child(4) { flex:0 0 20%; max-width:20%;  }
.p_wrap .row .col:nth-child(5) { flex:0 0 15%; max-width:15%; }
.p_wrap .row .col:nth-child(6) { flex:0 0 50%; max-width:50%; }
.p_wrap .row .col:nth-child(7) { flex:0 0 35%; max-width:35%; }
.p_wrap .row .col:nth-child(8) { flex:0 0 100%; max-width:100%; padding-bottom:.5rem; }
.input-group-sm .input-group-prepend .input-group-text { padding:0.15rem 0.5rem; }
</style>
