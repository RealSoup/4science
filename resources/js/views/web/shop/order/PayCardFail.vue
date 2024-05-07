<template>
<section class="container w-50">
    <div class="alert alert-danger text-center" role="alert">
        <span style="font-size:2rem; line-height:3rem;">카드 결제 실패</span>  <a href="/" class="alert-link">처음으로 가기</a>
    </div>
    <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">실패 결과</h4>
        <p>결제에 실패하였습니다. 관리자에게 문의하거나 다른 카드를 이용해주시기 바랍니다.</p>
        <hr>
        <p class="mb-0">
            <pre>
                {{$route.query.message}}
                {{$route.query.code}}
                {{$route.query.message}}
            </pre>
        </p>
    </div>
</section>
</template>

<script>
export default { name: 'ShopOrderPayCardFail', };
</script>