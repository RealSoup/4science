<template>
<div class="w_fence">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1584.715564471553!2d127.09991799228416!3d37.40328344111891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca78a55f72ee5%3A0xb61cbc21f03f78b7!2z7YyQ6rWQ7J2064W467C466as!5e0!3m2!1sko!2skr!4v1463443718232" width="100%" height="550" frameborder="0" style="border:0" allowfullscreen></iframe>
    <table>
        <tr>
            <th>주소</th>
            <td>(13486) 경기도 성남시 분당구 판교로 253 C-402 (삼평동,판교이노밸리)</td>
        </tr>
        <tr>
            <th>전화</th>
            <td><span>1644-4214</span>(사이언스)</td>
        </tr>
        <tr>
            <th>팩스</th>
            <td>031)8018-7272</td>
        </tr>
        <tr>
            <th>이메일</th>
            <td>sales@4science.net</td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
    name: 'IntroduceCompany',
    components: {
        // 'board-create': () =>    import('@/views/web/board/Create'),
    },
    data() { 
        return { 
            board_tab:0, 
            info_tab:0, 
        }
    },
    mounted() {
        if (this.$route.query.view_type == 'membership')
            this.$nextTick(function () {
                this.info_tab=3;
                document.getElementById('info_tab_scroll').scrollIntoView();
                // this.$route.params?.target && this.$refs.target?.scrollIntoView();
                // https://velog.io/@tjdud0123/vue-router-target-scroll
            });
        else if (this.$route.query.view_type == 'as')
            this.$nextTick(function () { this.board_tab=1; });
        else if (this.$route.query.view_type == 'faq')
            this.$nextTick(function () { this.board_tab=3; });
            
    },
};
</script>

<style lang="css" scoped>
table { border-left:2px solid #000; border-right:2px solid #000; width:100%; }
table th { width:20%; text-align:center; background:#f1f1f1; height:60px; vertical-align: middle; }
table td { padding-left:15px; vertical-align: middle; }
@media (max-width: 992px){
}
</style>