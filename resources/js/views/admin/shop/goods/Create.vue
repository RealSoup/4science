<template>
<div ref="goods">
    <h3>생성</h3>
    <b-card no-body class="shadow mb-2 sticky-top p-2">
        <b-container fluid>
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
    <Form ref="form" v-model="frm" :hashs="hashs" :makers="makers" :purchaseAt="purchaseAt" />
</div>
</template>

<script>
import ax from '@/api/http';
import Form from "./Form.vue";

export default {
    name: 'create',
    components: {
        Form,
        // 'Form': () => import('./Form.vue'),
        //  자식 컴포넌트의 Method를 호출하려면 위와같이 하면 안됨
        //  import 명령어 써서 컴포넌트 삽입해야 함
    },
    
    data() {
        return {
            hashs: [],
            makers: [],
            purchaseAt: [],
            frm: {
                goods_category: [],
                gd_enable: 'Y',
                gd_mk_id: 0,
                gd_pa_id: 0,
                goods_model : [],
                option : [],
                fi_id: [],
                hash_join: [],
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
                    this.hashs = res.data.hashs;
                    this.makers = res.data.makers;
                    this.purchaseAt = res.data.purchaseAt;
                }
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        async write() {
            let res = await ax.post(`/api/admin/shop/goods/`, this.frm);
            if (res && res.status === 200) {
                await this.$refs.form.$refs.fileupload1.fileProcessor(res.data);
                await this.$refs.form.$refs.fileupload2.fileProcessor(res.data);
                this.$router.push({ name: 'adm_goods_index' })
            }
        },
    },
    async mounted() {
        await this.create();
        await this.$refs.form.insertAtModel();
    },
}
</script>
