<template>
    <b-row id="best" class="layout">
        <b-col>
            <b-img src="/img/main/best.gif" />
        </b-col>
        <b-col>
            <div class="box-row">
                <b-link class="box"
                    v-for="(item, i) in items"
                    :key="i"
                    :ref="`box_${i}`"
                    :id="`box_${i}`"
                    @mouseover="hoverBox(i)"
                    @mouseout="hoverBox(-1)"
                    :to="{ name: 'goods_show', params: {gd_id: item.gd_id} }"
                >
                    <img class="box-image" :class="{'selected': isSelected(i)}" :src="item.image" />
                    <div class="box-footer">
                        <p class="box_ca" :class="{'selected': isSelected(i)}">{{item.ca01_name}}</p>
                        <h6 class="box_tit">{{item.gd_name}}</h6>
                    </div>
                </b-link>
            </div>
        </b-col>
    </b-row>
</template>

<script>
export default {
    // https://levelup.gitconnected.com/cards-hover-animation-wotw-7d1304f16ec6
    name:"BestList",
    props: ['items'],
    data() {
        return {
            selectedBox: -1
        }
    },
    methods: {
        hoverBox(selectedIndex) {
            this.selectedBox = selectedIndex;
            this.animateBoxs();
        },
        animateBoxs () {
            this.items.forEach((box, i) => {
                const direction = this.calculateBoxDirection(i, this.selectedBox);
                // TweenMax.to( this.$refs[`box_${i}`], 0.3, {x: direction * 50} );
                TweenMax.to( `#box_${i}`, 0.3, {x: direction * 30} );
            })
        },
        calculateBoxDirection (boxIndex, selectedIndex) {
            if(selectedIndex === -1) return 0;
            const diff = boxIndex - selectedIndex;
            return diff === 0 ? 0 : diff/Math.abs(diff);
        },
        isSelected (boxIndex) {
            return this.selectedBox === boxIndex;
        }
    },
    mounted() {
        const plugin = document.createElement("script");
        plugin.setAttribute( "src", "https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js" );
        plugin.async = true;
        document.head.appendChild(plugin);
    },
}
</script>
<style lang="css" scoped>
#best>.col { padding:0; }
#best>.col:nth-of-type(1) { flex:0 0 6.933334%; max-width:6.933334%; padding-top:20px; }
#best>.col:nth-of-type(2) { flex:0 0 92%; max-width:92%; }
/*#best { background: linear-gradient(to right, #01A4A4, #0280AB); margin-bottom:1rem; }*/
#best .box-row { display: flex; justify-content: center; align-items: center; min-width:1100px; width:100%; height:320px; }
#best .box-row .box { position: relative; background-color: #FFFFFF; height:300px; width: 240px; margin: 10px; overflow: hidden; box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.5); transition: height 0.3s, box-shadow 0.3s; }
#best .box-row .box:hover { height:320px; box-shadow: 20px 20px 40px 0px rgba(0,0,0,0.5); }
#best .box-row .box-image { /* center horizontally overflown image */ position: absolute; left: -9999px; right: -9999px; margin: auto; height: 220px; min-width: 100%; transition: height 0.3s, opacity 0.3s; }
#best .box-row .box-image.selected { height:320px; opacity: 0.3; }
#best .box-row .box-footer { position:absolute; bottom:0; height:80px; padding:10px 15px; }
#best .box-row .box-footer .box_ca { color: #1A8FD4; transition: color 0.3s; margin-bottom:0; font-size:.8rem; }
#best .box-row .box-footer .box_ca.selected { color: #6a6456; }
#best .box-row .box-footer .box_tit { font-weight:bold; }
</style>
