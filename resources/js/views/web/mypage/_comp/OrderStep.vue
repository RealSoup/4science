<template>
    <span>
        <template v-for="(v, k) in order_config.step">
            <template v-if="value==11">
                <b-badge :key="k" v-if="k==12" :class="v.class">{{v.name}}</b-badge>
            </template>
            <template v-else>
                <b-badge :key="k" v-if="k==value" :class="v.class">{{v.name}}</b-badge>
            </template>
        </template>
    </span>
</template>

<script> 
export default { 
    props: ['value', 'order_config'], 
} 
</script>