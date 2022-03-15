<template>
    <div class="rs_modal">
        <div class="overlay" @click="$emit('close-modal')"></div>
        <div class="rs_modal-card">
            <slot />
        </div>
    </div>
</template>

<script>
export default {

};
</script>
<style>
/* Modal */
.rs_modal,
.overlay { width:100%; height:100%; position:fixed; left: 0; top: 0; }
.rs_modal { z-index:1050; }
.rs_modal .overlay { opacity:0.5; background-color: black; }
.rs_modal .rs_modal-card { position: relative; max-width:80%; max-height:92%; min-height:500px; margin:auto; margin-top: 30px; padding: 20px; background-color: white; z-index: 10; opacity: 1; }
</style>
