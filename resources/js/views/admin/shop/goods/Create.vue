<template>
<b-container class="p_wrap">
    <h3 class="p_tit">상품 생성</h3>
    
    <loading-modal v-if="isLoadingModalViewed">Loading ......</loading-modal>
    <b-card no-body class="mb-2 sticky-top p-2">
        <b-container>
            <b-row>
                <b-col cols="12" sm="6">
                </b-col>
                <b-col cols="12" sm="6" class="text-right">
                    <b-button-group size="sm">
                        <b-button size="sm" variant="light" :to="{name: 'adm_goods_index'}">목록</b-button>
                        <b-button size="sm" variant="primary" @click="write">상품 등록</b-button>
                    </b-button-group>
                </b-col>
            </b-row>
        </b-container>
    </b-card>
    <Form ref="form" v-model="frm" :makers="makers" :purchaseAt="purchaseAt" />
</b-container>
</template>

<script>
import ax from '@/api/http';
import Form from "@/views/admin/shop/goods/Form.vue";

export default {
    name: 'admShopGoodsCreate',
    components: {
        Form,
        // 'Form': () => import('./Form.vue'),
        //  자식 컴포넌트의 Method를 호출하려면 위와같이 하면 안됨
        //  import 명령어 써서 컴포넌트 삽입해야 함
        'loading-modal': () => import('@/views/_common/LoadingModal.vue'),
    },
    
    data() {
        return {
            isLoadingModalViewed: false,
            makers: [],
            purchaseAt: [],
            frm: {
                goods_category: [],
                gd_enable: 'Y',
                gd_type: 'NON',
                goods_model : [],
                goods_option : [],
                goods_relate:[],
                fi_id: [],
                file_goods_goods: [],
                file_goods_add: [],
            },
        };
    },
    methods: {
        async create() {
            try {
                const res = await ax.get(`/api/admin/shop/goods/create`);
                if (res && res.status === 200) {
                    this.makers = res.data.makers;
                    this.purchaseAt = res.data.purchaseAt;
                }
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        async write() {
            await this.$refs.form.$refs.tinymce_editor.editor.uploadImages();
            this.isLoadingModalViewed=true;
            let res = await ax.post(`/api/admin/shop/goods`, this.frm);
            if (res && res.status === 200) {
                await this.$refs.form.$refs.fileupload1.fileProcessor(res.data);
                await this.$refs.form.$refs.fileupload2.fileProcessor(res.data);
                this.isLoadingModalViewed=false;
                this.$router.push({ name: 'adm_goods_index' });
            } else {
                this.isLoadingModalViewed=false;
            }
        },
    },
    async mounted() {
        await this.create();
        await this.$refs.form.insertAtModel();
    },
}
</script>
