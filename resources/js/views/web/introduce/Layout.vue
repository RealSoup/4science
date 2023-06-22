<template>
<div class="w_fence">
    <h3>About iNexus</h3>
    <b-nav tabs justified>
        <b-nav-item :to="{name: 'introduce_company'}" :active='$route.name =="introduce_company"'>경영이념</b-nav-item>
        <b-nav-item :to="{name: 'introduce_history'}" :active='$route.name =="introduce_history"'>연  혁</b-nav-item>
        <b-nav-item :to="{name: 'introduce_map'}" :active='$route.name =="introduce_map"'>오시는 길</b-nav-item>
        <b-nav-item >이용약관</b-nav-item>
    </b-nav>
    <router-view class="body" />
</div>    
</template>

<script>
export default { name: "Board", }
</script>

<style lang="css" scoped>
.w_fence { width:1920px; margin:auto; background-image:url(https://fourscience.s3.ap-northeast-2.amazonaws.com/introduce/bg.jpg); background-repeat:no-repeat; padding: 20px 0; min-height:885px;; }
.w_fence h3 { text-align:center; color:#FFF; font-size:3rem; margin-top:3rem; margin-bottom:1rem; }
.w_fence .nav { max-width:550px; margin:auto; border-width:0; }
.w_fence .nav li a { color:#FFF; border:1px solid #FFF; margin:0 9px; border-radius:8px; font-size:1.1rem;  }
.w_fence .nav li a.active { background:#FFF; color:#002A7E; font-weight:bold; }
.w_fence .body { width:1200px; margin:3rem auto; border:0; border:4px solid #C4D0D0; background:#FFF; border-radius:20px; padding:84px 80px; }
@media (max-width: 992px){

}
</style>
