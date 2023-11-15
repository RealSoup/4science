<template>
<div>
    <img src="/storage/goods/no-item.jpg" />
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
div { text-align:center; margin:5em; }
div img { margin-bottom:4em; }
div p { font-size:1.8em; text-align:center; font-weight:600; margin-bottom:0; }
div ul { border:1px solid #CCCCCC; padding:1.2em 0 1.2em 3em; margin:1.2em auto; max-width:37em; }
div ul li { list-style-type:decimal; text-align:left; line-height:2; font-size:1.1em; font-weight:600; }
div ul li b { color:#1891D6; }

@media (max-width: 992px){
    div { font-size:12px; margin:2em 0; }
    div img { width:100%; }
    div ul { padding:1.2em .5em 1.2em 2em; }
}
</style>