<template lang="html">
    <div class="location">
        <ul class="layout clear-both">
            <li><router-link :to="{name: 'main'}" class="ts_loc">HOME</router-link></li>
            <li v-if="categorys[0]" class="ca_div"><b-icon-chevron-compact-right></b-icon-chevron-compact-right></li>
            <li v-if="categorys[0]">
                <span class="ts_loc">
                    {{p_ca01 ? categorys[0].filter(ca => ca.ca_id == p_ca01)[0].ca_name : '선택'}}
                    <b-icon-caret-down-fill></b-icon-caret-down-fill>
                </span>
                <ul>
                    <li v-for="ca in categorys[0]" :class="ca.ca_id == p_ca01 ? 'focus' : ''">
                        <router-link :to="{name: 'goods_index', query:{ca01:ca.ca_id} }">{{ca.ca_name}}</router-link>
                    </li>
                </ul>
            </li>
            <li v-if="categorys[1]" class="ca_div"><b-icon-chevron-compact-right></b-icon-chevron-compact-right></li>
            <li v-if="categorys[1]">
                <span class="ts_loc">
                    {{p_ca02 ? categorys[1].filter(ca => ca.ca_id == p_ca02)[0].ca_name : '선택'}}
                    <b-icon-caret-down-fill></b-icon-caret-down-fill>
                </span>
                <ul>
                    <template v-for="(ca, idx) in categorys[1]">
                        <li :class="ca.ca_id == p_ca02 ? 'focus' : ''">
                            <router-link :to="{name: 'goods_index', query:{
                                ca01:p_ca01,
                                ca02:ca.ca_id} }">{{ca.ca_name}}</router-link>
                        </li>
                    </template>
                </ul>
            </li>
            <li v-if="categorys[2]" class="ca_div"><b-icon-chevron-compact-right></b-icon-chevron-compact-right></li>
            <li v-if="categorys[2]">
                <span class="ts_loc">
                    {{p_ca03 ? categorys[2].filter(ca => ca.ca_id == p_ca03)[0].ca_name : '선택'}}
                    <b-icon-caret-down-fill></b-icon-caret-down-fill>
                </span>
                <ul>
                    <template v-for="(ca, idx) in categorys[2]">
                        <li :class="ca.ca_id == p_ca03 ? 'focus' : ''">
                            <router-link :to="{name: 'goods_index', query:{
                                ca01:p_ca01,
                                ca02:p_ca02,
                                ca03:ca.ca_id} }">{{ca.ca_name}}</router-link>
                        </li>
                    </template>
                </ul>
            </li>
            <li v-if="categorys[3]" class="ca_div"><b-icon-chevron-compact-right></b-icon-chevron-compact-right></li>
            <li v-if="categorys[3]">
                <span class="ts_loc">
                    {{p_ca04 ? categorys[3].filter(ca => ca.ca_id == p_ca04)[0].ca_name : '선택'}}
                    <b-icon-caret-down-fill></b-icon-caret-down-fill>
                </span>
                <ul>
                    <li v-for="ca in categorys[3]" :key="ca.ca_id" :class="ca.ca_id == p_ca04 ? 'focus' : ''">
                        <router-link :to="{name: 'goods_index', query:{ ca01:p_ca01, ca02:p_ca02, ca03:p_ca03, ca04:ca.ca_id} }">{{ca.ca_name}}</router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Location',
    props:['categorys', 'p_ca01', 'p_ca02', 'p_ca03', 'p_ca04'],
}
</script>
<style lang="css" scoped>
.location { width:100%; margin-bottom:2rem; z-index: 16; position: relative; }
.location>ul>li { float:left; position:relative; }
@media (max-width: 992px){
    .location { margin-bottom:0; }
}


.location>ul>li .ts_loc { display:block; padding:1rem 1.5rem; }
.location>ul>li.ca_div { padding:1rem 0; }

.location>ul>li:hover ul { height:auto; box-shadow:0 1px 15px 1px rgba(39,39,39,.5); border-width:1px; padding:5px 0; }
.location>ul>li ul { position:absolute; left:7px; top:44px; width:250px; background-color:#FFF; border-radius:10px; z-index:10;
    border:0px solid #e5e5e5; overflow:hidden; height:0px; transition:height .4s, box-shadow .7s; }
.location>ul>li ul li { position:relative; margin:0 2px; }
.location>ul>li ul li.focus,
.location>ul>li ul li:hover { background-color:#777; border-radius:5px; }
.location>ul>li ul li a { color:#777; font-weight:bold; font-size:14px; display:block; padding:5px 10px; }
.location>ul>li ul li.focus a,
.location>ul>li ul li:hover a { color:#FFF; }
@media (max-width:768px){
    .location>ul>li:after { top:0.55rem; }
    .location>ul>li .ts_loc { padding:1vw 1.5vw; }
    .location>ul>li.ca_div { display:none; }
    .location>ul>li .ts_loc b { margin-left:3px; }
}
</style>
