<template>
<ul>
<li v-for="bo in list" :key="bo.bo_id">
    <router-link :to="{name: `bo_show`, params: { bo_cd:bo.code, bo_id:bo.bo_id }}">
        <sub-string v-model="bo.bo_subject" :width="500" class="m_hide" />
        <sub-string v-model="bo.bo_subject" :width="200" class="m_show" />
        <span>{{bo.created_at | formatDate}}</span>
    </router-link>
</li>
</ul>
</template>

<script> 
export default { 
    name: 'BoardIntroList', 
    props:['list'], 
    
    components: {
        'sub-string': () => import('@/views/_common/SubString.vue'),
    },
}; 
</script>

<style lang="scss" scoped>
ul { margin-top:1.5rem; }
ul li a { padding:0.2rem 0; display:block; }
ul li a:hover { background:#f5f5f5; }
ul li a span:last-child { float:right; }


@media (max-width: 992px){
    ul { padding:50px 10px 30px !important; }
}
</style>