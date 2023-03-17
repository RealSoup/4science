<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr><th>Number of Axis<b /></th><td><b-form-input v-model="val[0]" class="w-25" /> 구동 할 축 수 (ex : XYZ, Gonio, Rotation)</td></tr>
		<tr>
			<th>Moving Type<b /></th>
			<td>
                <b-form-select v-model="val[1]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="Manual">Manual</b-form-select-option>
                    <b-form-select-option value="Motorized">Motorized</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr><th>Resolution<b /></th><td><b-form-input v-model="val[2]" class="w-25" /> 구동 분해능 (ex : 50 um , 100 nm, …)</td></tr>
		<tr><th>Stroke<b /></th><td><b-form-input v-model="val[3]" class="w-25" /> 구동 거리 (ex : 100, 200, 250 mm )</td></tr>
		<tr><th>특이사항<b /></th><td><b-form-input v-model="val[4]" class="w-50" /> 그 이외의 software 부분 크기 등의 특별한 사항</td></tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub02',

    data() {
        return {
            label: [
                'Number of Axis',
                'Moving Type',
                'Resolution',
                'Stroke',
                '특이사항',
            ],
            val: [], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "Number of Axis을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "Moving Type 선택하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "Resolutionp을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[3])) { Notify.toast('danger', "Stroke을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[4])) { Notify.toast('danger', "특이사항을(를) 입력하세요"); return false; }
            
            return true;
        }
    },
};
</script>