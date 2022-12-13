<template>
    <b-container>
        <b-row>
            <b-col><h4>포사이언스 회원가입</h4></b-col>
        </b-row>
        <b-row class="con">
            <b-col>
                <b-link to="/auth/create/personal">
                    <b-img :src="s3url+'auth/personal.png'" />
                </b-link>
            </b-col>
            <b-col>
                <b-link to="/auth/create/dealer">
                    <b-img :src="s3url+'auth/dealer.png'" />
                </b-link>
            </b-col>
            <b-col>
                <b-row>
                    <b-col>
                        <b-link to="/auth">
                            <b-img :src="s3url+'auth/naver.png'" />
                        </b-link>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-link to="/auth">
                            <b-img :src="s3url+'auth/kakao.png'" />
                        </b-link>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'AuthIntro',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.row .col h4 { margin:4rem auto; font-weight:bold; font-size:3rem; text-align:center; }
.con { justify-content:center; }
.con > .col { margin-bottom: 1rem; }
.con .col { max-width:310px; }
.con .col a { display: block; }
</style>