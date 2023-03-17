<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th>사이즈<b/></th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td>직경 <b-form-input v-model="val[0]" class="w-50" /> <em>최대 1300</em></td>
						<td>
                            두께
                            <b-form-select v-model="val[1]" class="w-50">
                                <b-form-select-option value="">선택하세요.</b-form-select-option>
                                <b-form-select-option value="3">3</b-form-select-option>
                                <b-form-select-option value="5">5</b-form-select-option>
                                <b-form-select-option value="6">6</b-form-select-option>
                                <b-form-select-option value="8">8</b-form-select-option>
                                <b-form-select-option value="10">10</b-form-select-option>
                                <b-form-select-option value="12">12</b-form-select-option>
                                <b-form-select-option value="15">15</b-form-select-option>
                                <b-form-select-option value="19">19</b-form-select-option>
                            </b-form-select>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<th>재질<b/></th>
			<td>
                <b-form-select v-model="val[2]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="Normal Sodalaim Glass (강화유리)">Normal Sodalaim Glass (강화유리)</b-form-select-option>
                </b-form-select>
                <em>사각형, 타원형, 원형, 요철형태로 제작 가능</em>
			</td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub18',

    data() {
        return {
            label: [
                '사이즈(직경)',
                '사이즈(두께)',
                '재질',
            ],
            val: [], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "사이즈(직경)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "사이즈(두께)을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "재질을(를) 선택하세요"); return false; }
            return true;
        }
    },
};
</script>