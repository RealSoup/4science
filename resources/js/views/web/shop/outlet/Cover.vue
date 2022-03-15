<template lang="html">

    <kinesis-container class="outer">
        <kinesis-element class="item heart" transformOrigin="center center" :strength="30">
            <b-link :to="{name: 'outlet_index', params: { code:'pipette' }}">
                <div class="bx"><span>피펫관</span></div>
            </b-link>
        </kinesis-element>
        <kinesis-element class="item molecular" transformOrigin="center center" :strength="-20">
            <b-link :to="{name: 'outlet_index', params: { code:'pipette' }}">
                <div class="bx"><span>광파워미터관</span></div>
            </b-link>
        </kinesis-element>
        <kinesis-element class="item microscope" transformOrigin="center center" :strength="20">
            <b-link :to="{name: 'outlet_index', params: { code:'pipette' }}">
                <div class="bx"><span>핫플레이트관</span></div>
            </b-link>
        </kinesis-element>
        <kinesis-element class="item meurons" transformOrigin="center center" :strength="-10">
            <b-link :to="{name: 'outlet_index', params: { code:'pipette' }}">
                <div class="bx"><span>트위져관</span></div>
            </b-link>
        </kinesis-element>
        <kinesis-element class="item dna" transformOrigin="center center" :strength="-7">
            <b-link :to="{name: 'outlet_index', params: { code:'pipette' }}">
                <div class="bx"><span>환경측정기관</span></div>
            </b-link>
        </kinesis-element>
        <kinesis-element class="item spoid" transformOrigin="center center" :strength="15">
            <b-link :to="{name: 'outlet_index', params: { code:'pipette' }}">
                <div class="bx"><span>피펫관</span></div>
            </b-link>
        </kinesis-element>

        <h1>
            <kinesis-element tag="span" transformOrigin="center center" :strength="-5" type="translate">4</kinesis-element>
            <kinesis-element tag="span" transformOrigin="center center" :strength="15" type="rotate">S</kinesis-element>
            <kinesis-element tag="span" transformOrigin="center center" :strength="-25" type="translate">C</kinesis-element>
            <kinesis-element tag="span" transformOrigin="center center" :strength="15" type="rotate">I</kinesis-element>
            <kinesis-element tag="span" transformOrigin="center center" :strength="-3" type="translate">E</kinesis-element>
            <kinesis-element tag="span" transformOrigin="center center" :strength="25" type="translate">N</kinesis-element>
            <kinesis-element tag="span" transformOrigin="center center" :strength="-5" type="rotate">C</kinesis-element>
            <kinesis-element tag="span" transformOrigin="center center" :strength="25" type="rotate">E</kinesis-element>
        </h1>
        <kinesis-element class="slogan" :strength="-20" type="translate">Your R&D Consultants</kinesis-element>
    </kinesis-container>

</template>

<script>
import { KinesisContainer, KinesisElement } from 'vue-kinesis';
export default {
    components: {
        KinesisContainer,
        KinesisElement, // https://github.com/Aminerman/vue-kinesis
    },
}
</script>

<style lang="css" scoped>
.outer {
    display: -webkit-box; display: -ms-flexbox; display: flex;
    -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column;
    -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center;
    align-items: center; height:40vh; position: relative; }
.outer {
    background: linear-gradient(124deg, #FFCBCB, #FFDBCB, #FFF2CB, #FFFFD3, #D1FFD8, #CEFCFF, #D6D1FF, #FCD3FF, #FCD3FF);
    background-size: 1800% 1800%;
    -webkit-animation: rainbow 18s ease infinite; -z-animation: rainbow 18s ease infinite; -o-animation: rainbow 18s ease infinite; animation: rainbow 18s ease infinite;
}
@-webkit-keyframes rainbow { 0%{background-position:0% 82%} 50%{background-position:100% 19%} 100%{background-position:0% 82%} }
@-moz-keyframes rainbow { 0%{background-position:0% 82%} 50%{background-position:100% 19%} 100%{background-position:0% 82%} }
@-o-keyframes rainbow { 0%{background-position:0% 82%} 50%{background-position:100% 19%} 100%{background-position:0% 82%} }
@keyframes rainbow { 0%{background-position:0% 82%} 50%{background-position:100% 19%} 100%{background-position:0% 82%} }

.outer .item { position:absolute; background-repeat:no-repeat; background-size:contain; cursor:pointer; }
.outer .item.heart { background-image:url(/img/main/heart.png); width:7vw; height:7vw; right:7vw; }
.outer .item.molecular  { background-image:url(/img/main/molecular.png); width:13vw; height:13vw; right:20%; }
.outer .item.microscope { background-image:url(/img/main/microscope.png); width:8vw; height:8vw; left:30%; top:25%; }
.outer .item.neurons { background-image:url(/img/main/neurons.png); width:10vw; height:10vw; right:20%; top:90%; }
.outer .item.dna { background-image:url(/img/main/dna.png); width:8vw; height:8vw; left:20%; top:60%; }
.outer .item.spoid { background-image:url(/img/main/spoid.png); width:15vw; height:15vw; left:2vw; top:15%; }

.outer .item a { display:block; width:100%; height:100%; }
.outer .item a .bx { position:absolute; top:30px; bottom:30px; right:30px; width:100%; display:flex; justify-content:center; align-items:center;
                    background:rgba(0,0,0,0.7); transition:transform .5s; transform-origin:right; transform:scaleX(0); }
.outer .item a .bx span { position:relative; opacity:0; color:#fff; font-weight:bold; font-size:2em; }
.outer .item:hover a .bx { transition:transform .5s; transform-origin:left; transform:scaleX(1); }
.outer .item:hover a .bx span { opacity:1; transition:.2s; transition-delay:.2s; }

.outer h1 {position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;color:#351b1b;font-size:72px}
.outer h1 span:first-of-type{margin-top:0}
.outer h1 span:nth-of-type(2){margin-top:-20px}
.outer h1 span:nth-of-type(3){margin-top:-7px}
.outer h1 span:nth-of-type(4){margin-top:8px}
.outer h1 span:nth-of-type(5){margin-top:-13px}
.outer h1 span:nth-of-type(6){margin-top:-5px}
.outer h1 span:nth-of-type(7){margin-top:0}
.outer h1 span:nth-of-type(8){margin-top:-6px}
.outer .slogan { z-index:2; }

</style>
