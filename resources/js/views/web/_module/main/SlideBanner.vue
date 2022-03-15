<template>
    <splide :options="options" has-slider-wrapper>
        <splide-slide v-for="slide in slides" :key="slide.src">
            <img :src="slide.image" :alt="slide.title" />
        </splide-slide>

        <template v-slot:controls>
            <div class="splide__progress">
                <div class="splide__progress__bar">
                </div>
            </div>

            <!-- <div class="splide__autoplay">
                <button class="splide__play">Play</button>
                <button class="splide__pause">Pause</button>
            </div> -->
        </template>
    </splide>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
// https://splidejs.com/integration-vue-splide/
export default {
    components: { Splide, SplideSlide, },
    props:['items'],
    data() {
        return {
            options: {
                // rewind      : true,
                type:         'loop',
                focus:        'center',
                perPage:      3,
                gap:          '1rem',
                autoplay:     true,
                pauseOnHover: false,
                arrows:       'slider',
                width:         '90%',
                height:       '40rem',
                fixedWidth: '80rem',

                // autoWidth:    true,
                // padding: { left : '36rem', right: '36rem', }

            },
            slides: this.items,
        };
    },
}
</script>

<style scoped lang="scss">
.splide { margin: auto; }
.splide .splide__slider .splide__track ul li img { width:80rem; height:40rem; object-fit:cover; }
</style>
