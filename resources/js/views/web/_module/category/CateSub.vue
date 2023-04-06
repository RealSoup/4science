<template>
    <transition name="modal">
        <ul class="" v-if="sub_show" :class="{focus:sub_show}">
            <li v-if="depth==1" class="depth01_tit">{{papaName}}</li>
            <li v-for="ca in cate" @mouseenter="ca.sub_show = true" @mouseleave="ca.sub_show = false" :key="ca.ca_id">
                <b-link :to="{name: 'goods_index', query: queryParam(ca.ca_id) }">{{ca.ca_name}}</b-link>
                <tree-view
                    v-if="ca.sub"
                    :key="ca.ca_id"
                    :cate="ca.sub"
                    :depth="depth + 1"
                    :sub_show="ca.sub_show && ca.sub.length"
                    :paramLink="paramLink+'/'+ca.ca_id"
                />
            </li>
        </ul>
    </transition>
</template>

<script>
export default {
    name: "TreeView", // recursive 하기위해서 필요함. 없으면 error
    props:['sub_show', 'depth', 'cate', 'paramLink', 'papaName'],
    data() {
        return {
        };
    },
    computed: {
        // cateUlLeft: function () {
        // 	return this.depth == 0 ? 0 : 14;
        // },

    },
    methods: {
        // subOpenSwitch: function(ca){
        //     this.$set(ca, 'sub_show', !ca.sub_show);
        // },

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
    },
}
</script>

<style lang="css" scoped>
/*
#categorys ul ul { position:absolute; width:15rem; padding:0.5rem; background-color:#FFF; border:2px solid #000; z-index:10; }
#categorys>ul>li>ul:before { content:''; position:absolute; top:-32px; left:20px; background:url('https://fourscience.s3.ap-northeast-2.amazonaws.com/common/cate/semo.png') no-repeat center; width:31px; height:34px; }

#categorys ul ul li { position: relative; }
#categorys ul ul li.depth01_tit { padding:5px 10px; font-weight:900; font-size:20px; border-bottom:1px solid #000; margin-bottom:5px; }
#categorys ul ul li a { display:block; font-size:14px; padding:5px 10px; border-radius:0.4rem; transition: all .2s;}
#categorys ul ul li:not(.depth01_tit):hover>a { padding:10px; background-color:#777; color:#FFF; font-size:1.2rem; font-weight:bold; font-family: "Malgun Gothic", serif; }
#categorys ul ul ul { top:0; left:13.5rem; }
*/
/* #categorys>ul { top:20px; left:0; }
#categorys ul { position:absolute; top:0px; right:0; width:15rem; padding:0.5rem;
    background-color:#FFF; border-radius:10px; border:0px solid #e5e5e5; z-index:10;
    max-height:0px; transition:max-height .7s, box-shadow .7s; }

#categorys ul.focus { max-height:1000px; box-shadow:0 1px 15px 1px rgba(39,39,39,.5); border-width:1px; }




#categorys ul li { position:relative; }
#categorys ul li a { display:block; padding:5px 10px; border-radius:0.4rem; transition: all .2s;}
#categorys ul li:hover>a { padding:20px 10px; background-color:#777; color:#FFF; font-size:1.2rem; font-weight:bold; font-family: "Malgun Gothic", serif; }
#categorys ul li ul { -webkit-transform:translateX(99%); transform:translateX(99%); }
 */

/*
.modal-enter-active { transition-delay:.5s; }
.modal-leave-active { transition-delay:0; }
*/
</style>
