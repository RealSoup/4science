<template>
    <ul>
        <li v-for="bo in list" :key="bo.bo_id">
            <router-link :to="{name: `bo_show`, params: { bo_cd:bo.code, bo_id:bo.bo_id }}">
                <span>{{bo.bo_subject}}</span>
                <span>{{bo.created_at | formatDate}}</span>
            </router-link>
        </li>
    </ul>
</template>

<script>

export default {
    name: 'BoardIntroList',
    props:['list'],
};
</script>

<style lang="scss" scoped>
ul { margin-top:1.5rem; }
ul li a { padding:0.2rem 0; display:block; }
ul li a:hover { background:#f5f5f5; }
ul li a span:last-child { float:right; }
</style>