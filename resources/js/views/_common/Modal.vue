<template>
    <b-card class="rs_modal">
        <div class="overlay" @click="$emit('close-modal')"></div>
        <div class="rs_modal-card" :style="{ maxWidth: max_width + 'px', minHeight: min_height + 'px', padding: padding }">
            <header><slot name="header" /></header>
            <main><slot /></main>
        </div>
    </b-card>
</template>

<script>
export default {
    props:['max_width', 'min_height', 'padding'],
};
</script>
<style>
/* Modal */
.rs_modal,
.overlay { width:100%; height:100%; position:fixed; left: 0; top: 0; }
.rs_modal { z-index:1030; background:none; }
.rs_modal .overlay { opacity:0.75; background-color: black; }
.rs_modal .rs_modal-card { position:relative; max-width:80%; max-height:92%; min-height:500px; margin:auto; margin-top:30px; background-color:#fff; z-index:10; opacity:1; overflow:auto; border-radius:10px; }
.rs_modal .rs_modal-card header { padding:1.5rem 2.6rem 0.65rem; font-size:1.9rem; font-weight:bold; border-bottom:2px solid #000; }
.rs_modal .rs_modal-card main { padding:20px;  }
</style>
