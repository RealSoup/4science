<template>
<div class="w_fence">
    <h3>About iNexus</h3>
    <b-nav tabs justified>
        <b-nav-item :to="{name: 'introduce_company'}" :active='$route.name =="introduce_company"'>경영이념</b-nav-item>
        <b-nav-item :to="{name: 'introduce_history'}" :active='$route.name =="introduce_history"'>연  혁</b-nav-item>
        <b-nav-item :to="{name: 'introduce_map'}" :active='$route.name =="introduce_map"'>오시는 길</b-nav-item>
        <b-nav-item :to="{name: 'introduce_rule'}" :active='$route.name =="introduce_rule"'>이용약관</b-nav-item>
    </b-nav>
    <router-view class="body" />
</div>    
</template>

<script>
export default { name: "Introduce", }
</script>

<style lang="css" scoped>
.w_fence { max-width:1920px; width: 100%; margin:auto; background:url(/storage/introduce/bg.jpg) no-repeat center top; padding:20px 0; min-height:885px;; }
.w_fence h3 { text-align:center; color:#FFF; font-size:3em; margin-top:3em; margin-bottom:1em; }
.w_fence .nav { max-width:550px; margin:auto; border-width:0; }
.w_fence .nav li a { color:#FFF; border:1px solid #FFF; margin:0 9px; border-radius:8px; font-size:1.1em;  }
.w_fence .nav li a.active { background:#FFF; color:#002A7E; font-weight:bold; }
.w_fence .body { width:1200px; margin:3em auto; border:0; border:4px solid #C4D0D0; background:#FFF; border-radius:20px; padding:84px 80px; }
@media (max-width: 992px){
    .w_fence { font-size:13px; }
    .w_fence h3 { font-size:1.2em; margin-top:0; margin-bottom:.7em; }
    .w_fence .nav li .nav-link { padding:.3rem .4rem; }
    .w_fence .nav li a { margin:0 3px; border-radius:3px; font-size:.9em;  }
    .w_fence .body { width:100%; max-width:1200px; margin:1em auto; border:0; border-width:0; border-radius:3px; padding:0 }
}
</style>
