<template>
<b-container class="p_wrap">
    <b-row>
        <b-col>
            <h4>검색 엔진 인덱스 생성</h4>
            <b-button @click="make">생성</b-button>
        </b-col>        
    </b-row>
</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'admScoutIndex',
    methods: {
        async make() {
            try {
                const res = await ax.get(`/api/admin/scout/creat`);
                if (res && res.status === 200) {
                    Notify.modal(res.data, 'warning');
                    console.log(res.data);
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
};
</script>

<style lang="css" scoped>
</style>