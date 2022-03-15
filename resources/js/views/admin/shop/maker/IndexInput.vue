<template lang="html">
    <div class="">
         <b-input-group size="sm">
            <template #prepend>
                <b-input-group-text >{{no}}</b-input-group-text>
            </template>

            <b-form-input v-model="mk.mk_name"></b-form-input>

            <b-input-group-append>
                <b-button variant="warning" @click="update">수정</b-button>
                <b-button variant="danger" @click="destroy">삭제</b-button>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
export default {
    props:['no', 'mk'],
    methods: {
        update() {
            this.$emit('update', this.mk);
        },
        destroy() {
            this.$emit('destroy');
        },
    },

}
</script>
