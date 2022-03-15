<template>
    <header id="header" class="bg-info">
        <router-link  :to="{name: 'main'}">
            <div id="cube_logo">
                <div class="cube-wrap">
                    <div class="box">
                        <div class="single-box side-back"></div>
                        <div class="single-box side-top"></div>
                        <div class="single-box side-bottom"></div>
                        <div class="single-box side-left"></div>
                        <div class="single-box side-right"></div>
                        <div class="single-box side-front"></div>
                    </div>
                </div>
            </div>
        </router-link>
    </header>
</template>

<script>
export default { name: 'Header', }
</script>

<style lang="css" scoped>
#header { height:15rem; position:relative; }
#cube_logo { position:absolute; top:50%; left:50%; transform:translate(-50%, -50%) rotate( -6deg ); z-index:1; }
#cube_logo .cube-wrap { width:130px; height:80px; -webkit-perspective: 2000px; -webkit-perspective-origin: 50% -500px; }
#cube_logo .cube-wrap .box { -webkit-transform-style: preserve-3d; -webkit-animation: rotate 10s infinite linear; }
#cube_logo .cube-wrap .box .single-box {
    background-color:#fff; background-size: cover; border:1px solid #666;
    display: block; position: absolute; width:120px; height:72px;
    -webkit-transform: rotateY(45deg) translateZ(-200px) rotateX(15deg); -webkit-transform-origin: 50% 50% 0; }
#cube_logo .cube-wrap .box .side-front { -webkit-transform: translateZ(60px); background-image:url(/img/common/logo01.png); }
#cube_logo .cube-wrap .box .side-back { -webkit-transform: rotateY(180deg) translateZ(60px); background-image:url(/img/common/logo01.png); }
#cube_logo .cube-wrap .box .side-top { -webkit-transform: rotateX(90deg) translateZ(60px); height:120px; }
#cube_logo .cube-wrap .box .side-bottom { -webkit-transform: rotateX(-90deg) translateZ(36px); }
#cube_logo .cube-wrap .box .side-left { -webkit-transform: rotateY(-90deg) translateZ(60px); background-image:url(/img/common/logo02.png); }
#cube_logo .cube-wrap .box .side-right { -webkit-transform: rotateY(90deg) translateZ(60px); background-image:url(/img/common/logo02.png); }
@-webkit-keyframes rotate { 0% { -webkit-transform: rotateY(0deg); } 100% { -webkit-transform: rotateY(-360deg); } }
</style>
