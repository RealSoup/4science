<template lang="html">
    <b-row id="outlet_index">
        <b-col cols="2" class="left pr-0">
            <b-link
                v-for="(m, i) in menu"
                :key = "i"
                :class="{'active' : $route.params.code==m.eng}"
                :to="{name: 'outlet_index', params: { code:m.eng }}"
            >
                {{m.kor}}
            </b-link>
        </b-col>
        <b-col class="right">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" :class="{ 'active': type=='other' }" @click="type='other'">브랜드별</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ 'active': type=='outlet' }" @click="type='outlet'">종류별</a>
                </li>
            </ul>

            <ul class="subMenu">
                <li v-for="(m, i) in typeList.pipette[type]" :class="{ 'active': group==i+1 }">
                    <div @click="group=(i+1)">
                        <img :src="m.img" v-if="m.img" class="child" />
                        <h5 v-if="m.h5" class="child">{{m.h5}}</h5>
                    </div>
                </li>
            </ul>

            <ul class="list">
                <li v-for="(ol, i) in list">
                    <b-link :to="{name: 'goods_show', params: { gd_id:ol.gd_id }}">
                        <div class="imgBox"><img :src="ol.image_src_thumb[0]" /></div>
                        <div class="details">
                            <div class="content">
                                <h3>{{ol.gd_name}}</h3>
                                <p></p>
                            </div>
                        </div>
                    </b-link>
                </li>
            </ul>
        </b-col>
    </b-row>
</template>

<script>
import ax from '@/api/http';
import { pipette, hotplate } from './_comp/ListType.js'
import { menu } from './_comp/ListMenu.js'

export default {
    components: {
    },
    watch: {
        '$route.params.code': function(){
            this.index();
        },
        'group': function(){
            this.index();
        },
        'type': function(){
            this.index();
        },
    },
    data() {
        return {
            menu:menu,
            type:'other',
            typeList: {
                pipette: pipette,
                hotplate: hotplate,
            },
            group:1,
            list:{}

        }
    },
    methods: {
        async index(){
            try {
                const res = await ax.get(`/api/shop/outlet/${this.$route.params.code}/${this.type}/${this.group}`);
                if (res && res.status === 200) {
                    this.list=res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    mounted() {
        this.index();
    },
}
</script>

<style lang="css" scoped>
#outlet_index { border-top:2px solid #6440C1; }
#outlet_index .left,
#outlet_index .right { padding-top:1rem; }
#outlet_index .right { overflow:hidden; }
#outlet_index .left { border-right:1px solid #6440C1; }
#outlet_index .left a { margin-right:-2px; border:1px solid transparent; border-top-left-radius: 0.35rem; border-bottom-left-radius: 0.35rem; padding:1rem 0 1rem 2rem; font-size:1.5rem; cursor:pointer; display:block; }
#outlet_index .left a.active { border-color: #6440C1 #fff #6440C1 #6440C1; background-color:#6440C1; color:#FFF; font-weight:bold; }

#outlet_index .right .nav li a { cursor:pointer; }

#outlet_index .right .subMenu { display:flex; /*justify-content:center; align-items:center;*/ margin-top: 1rem;}
#outlet_index .right .subMenu li div { display:flex; justify-content:center; align-items:flex-start; min-width:7rem; max-width:10.9rem; height:7rem; }
#outlet_index .right .subMenu li:nth-child(even) div { align-items: flex-end; }
#outlet_index .right .subMenu li div .child { transition:transform .7s; cursor:pointer; padding:1rem; }
#outlet_index .right .subMenu li:hover div .child,
#outlet_index .right .subMenu li.active div .child { transform:scale(1.2); box-shadow:0 1px 15px 1px rgba(100,64,193,.5); }

#outlet_index .right ul.list { background:#262626; width:1300px; padding:10px; margin:70px auto 0; display:flex; flex-direction: row; flex-wrap: wrap; }
#outlet_index .right ul.list li { position:relative; width:300px; height:300px; background:#ff0; margin:10px; box-sizing: border-box; display: inline-block; }
#outlet_index .right ul.list li a { display:block; height:100%; }
#outlet_index .right ul.list li a .imgBox { position: relative; overflow: hidden; height: 100%; }
#outlet_index .right ul.list li a .imgBox img { max-width: 100%; transition: transform 2s; width:100%; height:100%; object-fit:cover; }
#outlet_index .right ul.list li a:hover .imgBox img { transform:scale(1.2); }

#outlet_index .right ul.list li a .details { position: absolute; top: 10px; left:10px; bottom:10px; right:10px; background: rgba(0,0,0,.8); transform: scaleY(0); transition:transform .5s; }
#outlet_index .right ul.list li a:hover .details { transform: scaleY(1);}
#outlet_index .right ul.list li a .details .content { position: absolute; top:50%; transform:translateY(-50%); text-align: center; padding:15px; color:#fff; width: 100%; }
#outlet_index .right ul.list li a .details .content h3 { color:#ff0; text-align:center; }

</style>
