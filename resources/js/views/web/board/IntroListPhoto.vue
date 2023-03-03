<template>
    <ul>
        <li v-for="bo in list" :key="bo.bo_id">            
            <!--b-link v-if="bo.code=='gd_inquiry'" :to="{name: 'goods_show', params: { gd_id:bo.bo_gd_id }}"-->
            <b-link v-if="bo.code=='gd_inquiry'" :to="{name: `bo_show`, params: { bo_cd:bo.code, bo_id:bo.bo_id }}">
                <b-img :src="bo.goods.image_src_thumb[0]" rounded />
                <!-- <p>{{bo.bo_subject}}</p> -->
                <div>{{bo.bo_content}}</div>
            </b-link>
            <b-link v-else :href="bo.href" target="_blank" class="blog">
                <b-img :src="bo.goods.image_src_thumb[0]" rounded />
                <p>{{bo.bo_subject}}</p>
                <div>{{bo.bo_content}}</div>
            </b-link>
        </li>
    </ul>
</template>

<script>
export default { name: 'BoardIntroListPhoto', props:['list'], };
</script>

<style lang="scss" scoped>
ul { margin-top:1.5rem; }
ul li a { padding:0.2rem 0; display:block; clear:both; }
ul li a:hover { background:#f5f5f5; }
ul li a img { width:70px; height:70px; object-fit:cover; float:left; margin-right:1rem; border:1px solid #D1D1D1; }
ul li a p { font-weight:bold; margin-bottom:0; }
ul li a div { overflow:hidden; text-overflow: ellipsis; display:-webkit-box; -webkit-line-clamp:3; /* 라인수 */ -webkit-box-orient:vertical; word-wrap:break-word; line-height:1.2em; height:3.6em; margin-top:.4rem }
ul li a.blog div { -webkit-line-clamp:2; height:2.4em; }
</style>