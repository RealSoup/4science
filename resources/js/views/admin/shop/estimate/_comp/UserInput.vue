<template>
<div>
    <b-input-group size="sm">
        <b-form-input autocomplete="off" :id="`estimate_req.eq_${type}`" ref="sch_field" v-b-tooltip.hover.left title="입력 후 엔터 or 버튼"
            v-model="input_val" @keyup.enter="getUserList" />
        <b-input-group-append><b-button size="sm" @click="getUserList" ><b-icon-search /></b-button></b-input-group-append>
    </b-input-group>
    <ul class="list-group autocomplete" v-if="users.length" v-click-outside="hide">
        <li class="list-group-item" v-for="(us, i) in users" @click="setUser(i)" :key="i">
            {{ us.name }}<br />
            <p v-if="us.email">{{us.email}}</p>
            <p v-if="us.hp">{{us.hp}}</p>
            <p v-if="us.company">{{us.company}}</p>
        </li>
    </ul>
</div>
</template>

<script>
import ax from '@/api/http';

export default {
    props:['value', 'type', 'frm'],
    data() { return { users: [], } },
    computed: {
        input_val: {
            get: function() { return this.value; },
            set: function(v) { this.$emit('input', v); }
        }
    },
    methods:{
        async getUserList() {
            var v = this.$refs.sch_field.value;
            if (this.type == 'name' && v.length < 2) {
                Notify.toast('warning', '2자 이상 입력시 검색 가능합니다.'); return false;
            } else if (this.type == 'email' && v.length < 3) {
                Notify.toast('warning', '3자 이상 입력시 검색 가능합니다.'); return false;
            } else if (this.type == 'company' && v.length < 3) {
                Notify.toast('warning', '3자 이상 입력시 검색 가능합니다.'); return false;
            } else if (this.type == 'hp' && v.length < 4) {
                Notify.toast('warning', '4자 이상 입력시 검색 가능합니다.'); return false;
            }

            if ( (this.type=='name'         && v.length > 1) ||
                 (this.type=='email'        && v.length > 2) ||
                 (this.type=='company'   && v.length > 2) ||
                 (this.type=='hp'           && v.length > 3) ) {
                try {
                    const res = await ax.get(`/api/admin/user/list`, {params:{type:this.type, key:v}});
                    if (res && res.status === 200) {
                        if (res.data.length)    this.users = res.data;
                        else                    this.users = [{name:'정보없음'}]
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.response.data.message);
                }
            }
        },
        setUser(i) {
            if (this.users[i] && this.users[i].name != "정보없음") {
                this.$set(this.frm, 'created_id'   , this.users[i].id);
                this.$set(this.frm, 'eq_name'      , this.users[i].name);
                this.$set(this.frm, 'eq_email'     , this.users[i].email);
                this.$set(this.frm, 'eq_company'   , this.users[i].company);
                this.$set(this.frm, 'eq_hp'        , this.users[i].hp);
                this.$set(this.frm, 'eq_tel'       , this.users[i].tel);
                this.$set(this.frm, 'eq_fax'       , this.users[i].fax);

            }
            this.users = [];
        },
        formatter(v) {
            if (this.type=='hp') return this.formatHp(v);
            else return v;
        },
        hide(){ this.users=[]; }
    },
}
</script>