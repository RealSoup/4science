<template>
    <ul>
        <li v-for="bo in list" :key="bo.bo_id">            
            <b-link v-if="type=='inner'" :to="{name: 'bo_show', params: { bo_cd:bo.code, bo_id:bo.bo_id }}">
                <b-img :src="bo.goods.image_src_thumb[0]" rounded="circle" />
                <p>{{bo.bo_subject}}</p>
                <p>{{bo.bo_content}}</p>
            </b-link>
            <b-link v-else-if="type=='outer'" :href="bo.href" target="_blank">
                <b-img :src="bo.goods.image_src_thumb[0]" rounded="circle" />
                <p>{{bo.bo_subject}}</p>
                <p>{{bo.bo_content}}</p>
            </b-link>
        </li>
    </ul>
</template>

<script>

export default {
    name: 'BoardIntroList',
    props:['list', 'type'],

    methods: {
        link(code, bo_id) {
            if (this.type == 'inner') {
                return ;
            } else if (this.type == 'outer') {
                return { path: `${code}`};
            }
            
        },
    },
};
</script>

<style lang="scss" scoped>
ul { margin-top:1.5rem; }
ul li a { padding:0.2rem 0; display:block; clear:both; }
ul li a:hover { background:#f5f5f5; }
ul li a img { width:100px; height:100px; object-fit:cover; float: left; margin-right: 1rem; }
ul li a p:nth-of-type(1) { font-weight: bold; }
ul li a p:last-child { overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; /* 라인수 */ -webkit-box-orient: vertical; word-wrap:break-word; line-height: 1.2em; height: 3.6em; }
</style>