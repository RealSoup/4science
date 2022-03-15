<template>
    <div id="best">
        <div class="layout">
            <div class="card-row">
                <router-link
                    v-for="(item, index) in items"
                    :key="index"
                    :ref="`card_${index}`"
                    @mouseover="hoverCard(index)"
                    @mouseout="hoverCard(-1)"
                    class="card"
                    :to="{ name: 'goods_show', params: {gd_id: item.gd_id} }"
                >
                    <img class="card-image" :class="{'selected': isSelected(index)}" :src="item.image">

                    <div class="card-footer">
                        <p class="card-text">RECIPE</p>
                        <h3 class="card-title">{{item.title}}</h3>
                        <p class="card-text">by
                            <span class="card-author" :class="{'selected': isSelected(index)}">{{item.text}}</span>
                        </p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    // https://levelup.gitconnected.com/cards-hover-animation-wotw-7d1304f16ec6
    name:"BestList",
    props: ['items'],
    data() {
        return {
            selectedCard: -1
        }
    },







    methods: {
        hoverCard(selectedIndex) {
            this.selectedCard = selectedIndex
            this.animateCards()
        },
        animateCards () {
            this.items.forEach((card, index) => {
                const direction = this.calculateCardDirection(index, this.selectedCard)
                TweenMax.to(
                    this.$refs[`card_${index}`],
                    0.3,
                    {x: direction * 50}
                )
            })
        },
        calculateCardDirection (cardIndex, selectedIndex) {
            if(selectedIndex === -1) {
                return 0
            }

            const diff = cardIndex - selectedIndex
            return diff === 0 ? 0 : diff/Math.abs(diff)
        },
        isSelected (cardIndex) {
            return this.selectedCard === cardIndex
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
<style media="screen">
#best { background: linear-gradient(to right, #01A4A4, #0280AB); margin-bottom:1rem; }
#best .card-row { display: flex; justify-content: center; align-items: center; min-width:1600px; width: 100%; height: 500px; }
#best .card-row .card { position: relative; background-color: #FFFFFF; height: 370px; width: 240px; margin: 10px; overflow: hidden; box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.5); transition: height 0.3s, box-shadow 0.3s; }
#best .card-row .card:hover { height: 410px; box-shadow: 20px 20px 40px 0px rgba(0,0,0,0.5); }
#best .card-row .card-image { /* center horizontally overflown image */ position: absolute; left: -9999px; right: -9999px; margin: auto; height: 220px; min-width: 100%; transition: height 0.3s, opacity 0.3s; }
#best .card-row .card-image.selected { height: 410px; opacity: 0.3; }
#best .card-row .card-footer { position: absolute; bottom: 0; height: 130px; padding: 10px 15px; font-family: Helvetica; }
#best .card-row .card-text { font-size: 14px; color: rgba(0, 0, 0, 0.7); }
#best .card-row .card-title { font-family: Serif; }
#best .card-row .card-author { font-size: 14px; color: #BAB096; transition: color 0.3s; }
#best .card-row .card-author.selected { color: #6a6456; }
</style>
