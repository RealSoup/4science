<template>
    <b-card class="rs_modal">
        <div class="overlay" @click="$emit('close-modal')"></div>
        <div class="rs_modal-card" :style="{ maxWidth: max_width + 'px' }">
            <header class="tit"><slot name="header"></slot></header>
            <slot />
        </div>
    </b-card>
</template>

<script>
export default {
    props:['max_width'],
};
</script>
<style>
/* Modal */
.rs_modal,
.overlay { width:100%; height:100%; position:fixed; left: 0; top: 0; }
.rs_modal { z-index:1030; }
.rs_modal .overlay { opacity:0.75; background-color: black; }
.rs_modal .rs_modal-card { position:relative; max-width:80%; max-height:92%; min-height:500px; margin:auto; margin-top:30px; padding:20px; background-color:#fff; z-index:10; opacity:1; overflow:auto; }
</style>
