<template>
<ul ref="dep02_ul">
    <li v-for="ca in cate" :key="ca.ca_id" @mouseenter="set_focus(ca.ca_id)" :class="{focus:ca.sub_show}">
        <b-link :to="{name: 'goods_index', query: queryParam(ca.ca_id) }">{{ca.ca_name}}</b-link>
        <tree-view
            v-if="ca.sub_show && ca.sub.length"
            :key="ca.ca_id"
            :cate="ca.sub"
            :depth="depth + 1"
            :sub_show="ca.sub_show && ca.sub.length"
            :paramLink="paramLink+'/'+ca.ca_id"
        />
    </li>
</ul>
</template>

<script>
export default {
    name: "TreeView", // recursive 하기위해서 필요함. 없으면 error
    props:['sub_show', 'depth', 'cate', 'paramLink', 'papaName'],
    methods: {
        queryParam: function (ca_id) {
            if ( this.depth == 0) {
                return { ca01:ca_id };
            } else if (this.depth > 0) {
                let paramArray = this.paramLink.split('/');
                switch (this.depth) {
                    case 1: return { ca01:paramArray[1], ca02:ca_id }; break;
                    case 2: return { ca01:paramArray[1], ca02:paramArray[2], ca03:ca_id }; break;
                    case 3: return { ca01:paramArray[1], ca02:paramArray[2], ca03:paramArray[3], ca04:ca_id }; break;
                }
            }
        },
        set_focus: function (ca_id) {
            Object.values(this.cate).forEach(ca => {
                if (ca.ca_id == ca_id) ca.sub_show = true;
                else ca.sub_show = false;
            });
        },
    },
    beforeDestroy() { 
        Object.values(this.cate).forEach(ca => ca.sub_show = false);
    },
}
</script>