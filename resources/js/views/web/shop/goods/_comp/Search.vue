<template lang="html">
    <b-input-group>
        <b-input-group-prepend>
            <select class="custom-select" v-model="value.mode">
                <option value="">◄ 통합검색 ►</option>
                <option value="gd_name">상품명</option>
                <option value="gm_name">제품명</option>
                <option value="gm_code">모델명</option>
                <option value="cat_no">Cat.No</option>
            </select>
        </b-input-group-prepend>
        <b-form-input v-model="value.keyword" placeholder="Please enter a keyword" @keyup.enter="search"></b-form-input>
        <b-input-group-append>
            <b-button variant="outline-primary" @click="search">Search</b-button>
        </b-input-group-append>
    </b-input-group>
</template>

<script>
export default {
    props:['value'],
    methods: {
        search() {
            this.$emit('search');
        },
    }
}
</script>

<style lang="css" scoped>
</style>
