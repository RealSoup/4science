<template>
<div>
    <img :src="`${s3url}goods/no-item.jpg`" />
    <p>죄송합니다.</p>
    <p>검색하신 제품이 등록되어 있지 않습니다.</p>
    <ul>
        <li>검색어를 다시 한번 확인 부탁드립니다.</li>
        <li>포사이언스 대표전화(<b>1644-4214</b>)로 문의주시면 도움 드리겠습니다.</li>
    </ul>
      
</div>
</template>
<script>
export default { name:"Module_NoItem" }
</script>
<style lang="css" scoped>
div { text-align:center; margin:5rem; }
div img { margin-bottom:4rem; }
div p { font-size:1.8rem; text-align:center; font-weight:600; margin-bottom:0; }
div ul { border:1px solid #CCCCCC; padding:1.2rem 0 1.2rem 3rem; margin:1.2rem auto; max-width:37rem; }
div ul li { list-style-type:decimal; text-align:left; line-height:2; font-size:1.1rem; font-weight:600; }
div ul li b { color:#1891D6; }
</style>