<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th class="top">사이즈<b/></th>
			<td>
				<b-form-input v-model="val[0]" class="w-50" /> 
                <em>다양한 사이즈로 제작 가능</em>
			</td>
		</tr>
		<tr>
			<th>재질<b/></th>
			<td>
                <b-form-select v-model="val[1]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="석영">석영</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th></th>
			<td>사각형, 원형, 튜브, 로드, 비이커, 플라스크, 비드, 보트 형태 제작 가능</td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub19',

    data() {
        return {
            label: [
                '사이즈',
                '재질',
            ],
            val: [], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "사이즈을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "재질을(를) 선택하세요"); return false; }
            return true;
        }
    },
};
</script>