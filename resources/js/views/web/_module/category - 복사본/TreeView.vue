<template lang="html">
    <ul
        v-show="depth == 0 ? cateOpen : active"
        :style="{ left: cateUlLeft+'rem' }"
    >
        <li
            v-for="(ca, idx) in cate"
            @mouseenter="subOpenSwitch(ca)" @mouseleave="subOpenSwitch(ca)"
        >
            <b-link :to="{name: 'goods_index', query: queryParam(ca.ca_id) }">{{ca.ca_name}}</b-link>
            <tree-view
                v-if="ca.sub"
                :key="ca.ca_id"
                :cate="ca.sub"
                :depth="depth + 1"
                :active="ca.sub_show"
                :paramLink="paramLink+'/'+ca.ca_id"
            />
        </li>
    </ul>
</template>

<script>
export default {
    name: "TreeView", // recursive 하기위해서 필요함. 없으면 error
    props:['cateOpen', 'active', 'depth', 'cate', 'paramLink'],
    data() {
        return {
        };
    },
    computed: {
        cateUlLeft: function () {
        	return this.depth == 0 ? 0 : 15;
        },
    },
    methods: {
        subOpenSwitch: function(ca){
            this.$set(ca, 'sub_show', !ca.sub_show);
        },

        queryParam: function (ca_id) {

            if ( this.depth == 0) {
                return { gd_ca_id01:ca_id };
            } else if (this.depth > 0) {
                let paramArray = this.paramLink.split('/');
                switch (this.depth) {
                    case 1: return { gd_ca_id01:paramArray[1], gd_ca_id02:ca_id }; break;
                    case 2: return { gd_ca_id01:paramArray[1], gd_ca_id02:paramArray[2], gd_ca_id03:ca_id }; break;
                    case 3: return { gd_ca_id01:paramArray[1], gd_ca_id02:paramArray[2], gd_ca_id03:paramArray[3], gd_ca_id04:ca_id }; break;
                }
            }
        },
    },
}
</script>

<style lang="css" scoped>
#categorys ul li a { display:block; padding:10px; }
</style>
