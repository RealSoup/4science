<template>
<b-container class="p_wrap">
    <h3 class="p_tit">상품 수정</h3>
    <b-card no-body class="ctrl">
        <b-container>
            <b-row>
                <b-col cols="12" sm="6"><b-button size="sm" variant="danger" @click="destroy">삭제</b-button></b-col>
                <b-col cols="12" sm="6" class="text-right">
                    <b-button-group size="sm">
                        <b-button size="sm" variant="light" :to="{name: 'adm_goods_index'}">목록</b-button>
                        <b-button size="sm" variant="info" :to="{name: 'goods_show', params:{gd_id:$route.params.gd_id}}">판매 화면</b-button>
                        <b-button size="sm" variant="primary" @click="update">수정 완료</b-button>
                    </b-button-group>
                </b-col>
            </b-row>
        </b-container>
    </b-card>

    <Form ref="form" v-model="frm" :hashs="hashs" :makers="makers" :purchaseAt="purchaseAt" />
</b-container>
</template>

<script>
import ax from '@/api/http';
import Form from "./Form.vue";

export default {
    name: 'edit',
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
                file_goods_goods:[],
                file_goods_add:[],
            },
        };
    },
    computed: {

    },
    methods: {
        async edit(){
            try {
                const res = await ax.get(`/api/admin/shop/goods/${this.$route.params.gd_id}/edit`);
                if (res && res.status === 200) {
                    this.frm = res.data.goods;
                    this.hashs = res.data.hashs;
                    this.makers = res.data.makers;
                    this.purchaseAt = res.data.purchaseAt;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async update(){
            
            this.frm = Object.assign(
                {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                this.frm, // 수정하려는 객체
                {_method : 'PATCH'} // 삽입하려는 내용
            );
            const res = await ax.post(`/api/admin/shop/goods/${this.$route.params.gd_id}`, this.frm);
            if (res && res.status === 200) {
                await this.$refs.form.$refs.fileupload1.fileProcessor(res.data);
                await this.$refs.form.$refs.fileupload2.fileProcessor(res.data);
                this.$router.push({ name: 'adm_goods_index' })
            }
        },
        async destroy(){
            var rst = await Notify.confirm('완전 삭제', 'danger');
            if (rst) {
                try {
                    let frm = new FormData();
                    frm.append("_method", 'DELETE');
                    const res = await ax.post(`/api/admin/shop/goods/${this.$route.params.gd_id}`, frm);
                    if (res && res.status === 200) {
                        Notify.toast('success', '상품 삭제')
                        this.$router.push({ name: 'adm_goods_index' })
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('danger', '삭제 실패');
                    Notify.toast('danger', e.response.data.message);
                }
            }
        },
    },
    async mounted() {
        await this.edit();
    },
}
</script>
