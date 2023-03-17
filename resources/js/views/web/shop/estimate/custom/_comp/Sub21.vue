<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th>재질<b/></th>
			<td>
                <b-form-select v-model="val[0]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="아크릴(PMMA)">아크릴(PMMA)</b-form-select-option>
                    <b-form-select-option value="SUS(Stainless Steel)">SUS(Stainless Steel)</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th>매인챔버 내부사이즈<b/></th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td>W <b-form-input v-model="val[1]" /> mm</td>
						<td>X</td>
						<td>D <b-form-input v-model="val[2]" /> mm</td>
						<td>X</td>
						<td>H <b-form-input v-model="val[3]" /> mm</td>
					</tr>
				</table>
				외경 기준으로 (ex : 1200 x 750 x 1800mm)
			</td>
		</tr>
		<tr>
			<th>옵션<b/></th>
			<td>
                <b-form-checkbox-group v-model="val[4]">
                    <b-form-checkbox value="패스박스">패스박스</b-form-checkbox>
                    <b-form-checkbox value="가압, 감압용발판">가압, 감압용발판</b-form-checkbox>
                    <b-form-checkbox value="내부전원">내부전원</b-form-checkbox>
                </b-form-checkbox-group>
			</td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub21',

    data() {
        return {
            label: [
                '재질',
                '내부 사이즈(W,mm)',
                '내부 사이즈(D,mm)',
                '내부 사이즈(H,mm)',
                '옵션',
            ],
            val: [], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "재질(를) 선택하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "내부 사이즈(W,mm)(를) 입력하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "내부 사이즈(D,mm)(를) 입력하세요"); return false; }
            if (isEmpty(this.val[3])) { Notify.toast('danger', "내부 사이즈(H,mm)(를) 입력하세요"); return false; }
            if (isEmpty(this.val[4])) { Notify.toast('danger', "옵션(를) 입력하세요"); return false; }
            this.val[4]=this.val[4].join();
            return true;
        }
    },
};
</script>