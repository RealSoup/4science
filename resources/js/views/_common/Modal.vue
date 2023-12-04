<template>
<b-card class="rs_modal">
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="rs_modal-card" :style="{ maxWidth: max_width + 'px', minHeight: min_height + 'px', padding: padding }">
        <b-icon-x-lg @click="$emit('close-modal')" class="close"></b-icon-x-lg>
        <header v-if="$slots.header">
            <slot name="header" />
        </header>
        <main>
            <slot />
        </main>
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
.rs_modal .rs_modal-card { position:relative; max-width:80%; max-height:92%; min-height:500px; margin:auto; margin-top:30px; background-color:#fff; z-index:10; opacity:1; overflow:auto; border-radius:10px; padding:20px; }
.rs_modal .rs_modal-card .close { position:absolute; top:18px; right:10px; cursor:pointer; padding:1px 4px; width: auto; font-size: 1.1rem; z-index: 1; }
.rs_modal .rs_modal-card header { padding:.4em; font-size:1.4em; font-weight:600; border-bottom:2px solid #000; text-align:center; }
/*.rs_modal .rs_modal-card main { padding:20px;  }*/

.rs_modal header .modal_login { padding:1.6rem 1.6rem 0.3rem 1rem; font-size: 1.8rem; }

</style>
