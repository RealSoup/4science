<template>
<div class="w_fence">
    <h3>커뮤니티</h3>
    <div class="bo_box">
        <b-nav tabs justified>
            <!-- <b-nav-item :to="{name: 'bo_index', params: { bo_cd:'open' }}" :active='$route.params.bo_cd =="open"'>열린게시판</b-nav-item> -->
            <b-nav-item :to="{name: 'bo_index', params: { bo_cd:'notice' }}" :active='$route.params.bo_cd =="notice"'>공지사항</b-nav-item>
            <b-nav-item :to="{name: 'bo_index', params: { bo_cd:'gd_inquiry' }}" :active='$route.params.bo_cd =="gd_inquiry"'>상품문의</b-nav-item>
            <b-nav-item :to="{name: 'bo_index', params: { bo_cd:'event' }}" :active='$route.params.bo_cd =="event"'>이벤트</b-nav-item>
            <b-nav-item href="https://blog.naver.com/4science" target="_blank">블로그</b-nav-item>
            <b-nav-item href="https://www.youtube.com/channel/UC-XgXZy6iUA6NRirT2DCIpg" target="_blank">언박싱</b-nav-item>
        </b-nav>
        <router-view class="body" />
    </div>
</div>    
</template>

<script>
export default { name: "Board", }
</script>

<style lang="css" scoped>
.w_fence h3 { padding:0 2rem; }
.w_fence .bo_box { border:3px solid #D7D7D7; }
.w_fence .bo_box .nav-tabs li a { font-size:1.2rem; color:#fff; background-color:#01B7CD; padding:1.3rem; font-weight:600; border-radius:0; border-width:0; }
.w_fence .bo_box .nav-tabs li:not(:last-child) a { border-right:1px solid #fff; }
.w_fence .bo_box .nav-tabs li a.active { color:#01B7CD; background-color:#fff; }
.w_fence .bo_box .body { padding:2rem 4rem; }
</style>
