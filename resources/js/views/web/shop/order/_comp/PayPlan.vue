<template lang="html">
    <div class="border border-info rounded-lg location mt-3">
        <div class="p-3 bg-info">
            <h5>결제 예정일 선택</h5>
            (학교, 국가기관, 연구소만 해당/<span class="text-danger">업체 및 개인은 선결제로 선택</span>)
        </div>


        <b-form-group class="mt-3">
            <div class="custom-control custom-control-inline custom-radio mr-0">
                <b-form-radio v-model="value.oex_pay_plan" value="soon">선결제</b-form-radio>
            </div>
            <div class="custom-control custom-control-inline custom-radio mr-0">
                <b-form-radio v-model="value.oex_pay_plan" value="week1">1주이내</b-form-radio>
            </div>
            <div class="custom-control custom-control-inline custom-radio mr-0">
                <b-form-radio v-model="value.oex_pay_plan" value="week2">2주이내</b-form-radio>
            </div>
            <div class="custom-control custom-control-inline custom-radio mr-0">
                <b-form-radio v-model="value.oex_pay_plan" value="month1">한달이내</b-form-radio>
            </div>
            <div class="custom-control custom-control-inline custom-radio mr-0">
                <b-form-radio v-model="value.oex_pay_plan" value="month2">2개월이내</b-form-radio>
            </div>
        </b-form-group>
    </div>
</template>

<script>
export default {
    name: 'PayPlan',
    props:['value'],
}
</script>
