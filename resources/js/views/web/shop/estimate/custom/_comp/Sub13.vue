<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th class="top">사이즈<b /></th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td >가로<b-form-input v-model="val[0]" /></td><td>X</td>
						<td>세로<b-form-input v-model="val[1]" /></td><td>X</td>
						<td>높이<b-form-input v-model="val[2]" /></td>
					</tr>
				</table>
				<em>다양한 사이즈로 제작 가능</em>
			</td>
		</tr>
		<tr>
			<th>재질<b /></th>
			<td>
				<b-form-select v-model="val[3]" class="w-50">
					<b-form-select-option value="">선택하세요.</b-form-select-option>
					<b-form-select-option value="SUS">SUS</b-form-select-option>
				</b-form-select>
			</td>
		</tr>
		<tr>
			<th>선반 수<b /></th>
			<td>
				<b-form-select v-model="val[4]" class="w-50">
					<b-form-select-option value="">선택하세요.</b-form-select-option>
					<b-form-select-option value="3단(선반 4장)">3단(선반 4장)</b-form-select-option>
					<b-form-select-option value="4단(선반 5장)">4단(선반 5장)</b-form-select-option>
				</b-form-select>
			</td>
		</tr>
		<tr>
			<th>선반 유형<b /></th>
			<td>
				<b-form-select v-model="val[5]" class="w-50">
					<b-form-select-option value="">선택하세요.</b-form-select-option>
					<b-form-select-option value="고정형">고정형</b-form-select-option>
					<b-form-select-option value="구동형">구동형</b-form-select-option>
				</b-form-select>
			</td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub13',
    data() {
        return {
            label: [
                '사이즈(가로)',
				'사이즈(세로)',
				'사이즈(높이)',
				'재질',
				'선반 수',
				'선반 유형',
            ],
            val: [
				1220,
				460,
				1800,
			], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "사이즈(가로)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "사이즈(세로)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "사이즈(높이)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[3])) { Notify.toast('danger', "재질을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[4])) { Notify.toast('danger', "선반 수을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[5])) { Notify.toast('danger', "선반 유형을(를) 선택하세요"); return false; }
            return true;
        }
    },
};
</script>