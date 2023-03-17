<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th>사이즈<b /></th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0" class="joinTable2">
					<tr>
						<td>가로<b-form-input v-model="val[0]" /></td><td>X</td>
						<td>세로<b-form-input v-model="val[1]" /></td><td>X</td>
						<td>높이<b-form-input v-model="val[2]" /></td>
					</tr>
				</table>
                <em>다양한 사이즈로 제작 가능 (기본 6인용)</em>
			</td>
		</tr>
		<tr>
			<th>재질<b /></th>
			<td>
                <b-form-select v-model="val[3]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="분체 도장(기본)">분체 도장(기본)</b-form-select-option>
                    <b-form-select-option value="SUS">SUS</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th></th>
			<td>투시창 설치 가능, 캐비넷 안의 선반 추가 가능</td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub16',

    data() {
        return {
            label: [
                '사이즈(가로)',
                '사이즈(세로)',
                '사이즈(높이)',
                '재질',
            ],
            val: [
                900,
                510,
                1780,
            ], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "사이즈(가로)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "사이즈(세로)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "사이즈(높이)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[3])) { Notify.toast('danger', "재질을(를) 선택하세요"); return false; }
            return true;
        }
    },
};
</script>