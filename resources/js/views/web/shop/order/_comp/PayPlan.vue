<template>
    <div>
        <div class="head">
            <h6>결제 예정일 선택</h6>
            <p>(학교, 국가기관, 연구소만 해당/<span>업체 및 개인은 선결제로 선택</span>)</p>
        </div>
        <b-row>
            <b-form-radio v-model="value.oex_pay_plan" value="soon">선결제</b-form-radio>
            <b-form-radio v-model="value.oex_pay_plan" value="week1">1주이내</b-form-radio>
            <b-form-radio v-model="value.oex_pay_plan" value="week2">2주이내</b-form-radio>
            <b-form-radio v-model="value.oex_pay_plan" value="month1">30일이내</b-form-radio>
            <b-form-radio v-model="value.oex_pay_plan" value="month2">60일이내</b-form-radio>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'PayPlan',
    props:['value'],
}
</script>
<style lang="css" scoped>
.head p { font-size:.75rem; }
.head p span { color:red; }
.row { margin:0; justify-content:space-between;}
.row .custom-radio>>>label { font-size:.8rem; }
.row .custom-radio>>>label::before, 
.row .custom-radio>>>label::after { top:.15rem; left:-1.2rem; }
</style>
