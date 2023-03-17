<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th class="top">사이즈<b /></th>
			<td><b-form-input v-model="val[0]" class="w-50" /> 원하는 사이즈로 제작 가능</td>
		</tr>
		<tr>
			<th>재질<b /></th>
			<td>
                <b-form-select v-model="val[1]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="SUS">SUS</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th>타공 여부<b /></th>
			<td>
                <b-form-select v-model="val[2]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="타공)">타공</b-form-select-option>
                    <b-form-select-option value="무타공">무타공</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th>광택 여부<b /></th>
			<td>
                <b-form-select v-model="val[3]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="유광">유광</b-form-select-option>
                    <b-form-select-option value="무광">무광</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th></th>
			<td>하단 선반 추가 가능</td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub15',

    data() {
        return {
            label: [
                '사이즈',
                '재질',
                '타공 여부',
                '광택 여부',
            ],
            val: [], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "사이즈을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "재질을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "타공 여부을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[3])) { Notify.toast('danger', "광택 여부을(를) 입력하세요"); return false; }
            return true;
        }
    },
};
</script>