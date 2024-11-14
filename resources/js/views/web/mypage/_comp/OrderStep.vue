<template>
    <span>
        <template v-for="(v, k) in order_config.step">
            <template v-if="value==11">
                <b-badge :key="k" v-if="k==12" :class="v.class">
                    <template v-if="deviceType=='pc'">{{v.name}}</template>
                    <template v-else-if="deviceType=='mobile'">{{v.sm_name}}</template>
                </b-badge>
            </template>
            <template v-else-if="value==31">
                <b-badge :key="k" v-if="k==30" :class="v.class">
                    <template v-if="deviceType=='pc'">{{v.name}}</template>
                    <template v-else-if="deviceType=='mobile'">{{v.sm_name}}</template>
                </b-badge>
            </template>
            <template v-else>
                <b-badge :key="k" v-if="k==value" :class="v.class">
                    <template v-if="deviceType=='pc'">{{v.name}}</template>
                    <template v-else-if="deviceType=='mobile'">{{v.sm_name}}</template>
                </b-badge>
            </template>
        </template>
    </span>
</template>

<script> 
import { mapState } from 'vuex';
export default { 
    props: ['value', 'order_config'],
    computed: { ...mapState('common', ['deviceType']), },
} 
</script>