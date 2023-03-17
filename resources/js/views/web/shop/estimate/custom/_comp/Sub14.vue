<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th class="top">사이즈<b /></th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td>가로 <b-form-input v-model="val[0]" /></td><td>X</td>
                        <td>세로 <b-form-input v-model="val[1]" /></td><td>X</td>
                        <td>높이 <b-form-input v-model="val[2]" /></td>
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
			<th>수량<b /></th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td>보관함 <b-form-input v-model="val[4]" /></td>
						<td>수거함 <b-form-input v-model="val[5]" /></td>
					</tr>
				</table>
                <em>수량 조절 가능</em>
			</td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub14',

    data() {
        return {
            label: [
                '사이즈(가로)',
				'사이즈(세로)',
				'사이즈(높이)',
				'재질',
				'수량(보관함)',
				'수량(수거함)',
            ],
            val: [
                1360,
                500,
                980,
                '',
                3,
                1
            ], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "사이즈(가로)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "사이즈(세로)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "사이즈(높이)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[3])) { Notify.toast('danger', "재질을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[4])) { Notify.toast('danger', "수량(보관함)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[5])) { Notify.toast('danger', "수량(수거함)을(를) 입력하세요"); return false; }
            return true;
        }
    },
};
</script>