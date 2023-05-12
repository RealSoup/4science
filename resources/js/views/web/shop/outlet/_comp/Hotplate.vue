<template>
<div>
    <b-row>
        <b-col>
            <h5 v-if="$route.params.group=='01'">300℃ 이하</h5>
            <h5 v-else-if="$route.params.group=='02'">최대 200mm 이하</h5>
            <h5 v-else-if="$route.params.group=='03'">플레이트 표면 온도 균일도 특화</h5>
        </b-col>
    </b-row>
    <b-row class="list">
        <b-col v-for="ol in show_window_group_by[0]" :key="ol.gd_id">
            <b-link :to="{name:'goods_show', params:{gd_id:ol.gd_id}}">
                <b-img :src="ol.image_src_thumb[0]" />
                <p>{{ol.gd_name}}</p>
            </b-link>
        </b-col>
    </b-row>
    
    <b-row>
        <b-col>
            <h5 v-if="$route.params.group=='01'">300℃ ~ 400℃</h5>
            <h5 v-else-if="$route.params.group=='02'">200mm ~ 300mm</h5>
            <h5 v-else-if="$route.params.group=='03'">멀티형</h5>
        </b-col>
    </b-row>
    <b-row class="list">
        <b-col v-for="ol in show_window_group_by[1]" :key="ol.gd_id">
            <b-link :to="{name:'goods_show', params:{gd_id:ol.gd_id}}">
                <b-img :src="ol.image_src_thumb[0]" />
                <p>{{ol.gd_name}}</p>
            </b-link>
        </b-col>
    </b-row>
    
    <b-row>
        <b-col>
            <h5 v-if="$route.params.group=='01'">400℃ ~ 500℃</h5>
            <h5 v-else-if="$route.params.group=='02'">최대 사이즈 300mm 이상</h5>
            <h5 v-else-if="$route.params.group=='03'">프로그램형</h5>
        </b-col>
    </b-row>
    <b-row class="list">
        <b-col v-for="ol in show_window_group_by[2]" :key="ol.gd_id">
            <b-link :to="{name:'goods_show', params:{gd_id:ol.gd_id}}">
                <b-img :src="ol.image_src_thumb[0]" />
                <p>{{ol.gd_name}}</p>
            </b-link>
        </b-col>
    </b-row>
    
    <b-row><b-col><h5 v-if="$route.params.group=='01'">500℃ 이상</h5></b-col></b-row>
    <b-row class="list">
        <b-col v-for="ol in show_window_group_by[3]" :key="ol.gd_id">
            <b-link :to="{name:'goods_show', params:{gd_id:ol.gd_id}}">
                <b-img :src="ol.image_src_thumb[0]" />
                <p>{{ol.gd_name}}</p>
            </b-link>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    name: 'ShopOutletHotplate',
    props:['value'],
    computed: {
        show_window_group_by: function () {
            let dummy = {0:[], 1:[], 2:[], 3:[]};
            for (let i of this.value) {
                if (i.sw_seq == 0 || i.sw_seq == 1) {
                    dummy[0].push(i);
                } else if (i.sw_seq == 2) {
                    dummy[1].push(i);
                } else if (i.sw_seq == 3) {
                    dummy[2].push(i);
                } else if (i.sw_seq == 4) {
                    dummy[3].push(i);
                }
            }
            return dummy;
        }
    },
};
</script>

<style lang="css" scoped>
h5 { background:#FEF200; display:inline-block; padding:10px 20px; min-width:300px; border-radius:25px; font-weight:bold; margin-bottom:.9rem; }
.list { margin-bottom:6.5rem; }
</style>