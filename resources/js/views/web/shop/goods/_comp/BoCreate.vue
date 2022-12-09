<template>
<b-container>
    <b-row>
        <b-col>
            <h3>상품 문의 등록</h3>
        </b-col>            
    </b-row>
    <!-- <b-row>
        <b-col class="awesome_p">
            <b-form-input v-model="value.bo_subject" id="bo_subject" required />
            <label for="bo_subject">제목</label>
        </b-col>            
    </b-row> -->
    <b-row>
        <b-col class="awesome_p">
            <b-form-textarea v-model="value.bo_content" id="bo_content" required rows="10" />
            <label for="bo_content">내용</label>
        </b-col>            
    </b-row>
    <b-row>
        <b-col>
            <b-button variant="primary" @click="store">등록</b-button>
        </b-col>            
    </b-row>
</b-container>
</template>

<script>
export default {
    name: 'ShopGoodsBoCreate',
    components: {
        'Validation': () =>     import('@/views/_common/Validation.vue'),
    },
    props: ['value'],
        
    methods: {
        store() {
            this.$emit('store');
        }
    },

}
</script>

<style scoped>
.container { padding-top:40px; }
.container .row { margin-bottom:30px; }
.container .row .col h3 { text-align:center; }
</style>