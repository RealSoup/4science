<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th>타입<b/></th>
			<td>
                <b-form-select v-model="val[0]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="진공">진공</b-form-select-option>
                    <b-form-select-option value="가스치환">가스치환</b-form-select-option>
                    <b-form-select-option value="자동습도조절">자동습도조절</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th>재질<b/></th>
			<td>
                <b-form-select v-model="val[1]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="아크릴(PMMA)">아크릴(PMMA)</b-form-select-option>
                    <b-form-select-option value="Steel">Steel</b-form-select-option>
                    <b-form-select-option value="SUS(Stainless Steel)">SUS(Stainless Steel)</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th>내부 사이즈<b/></th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td>W <b-form-input v-model="val[2]" /> mm</td><td>X</td>
						<td>D <b-form-input v-model="val[3]" /> mm</td><td>X</td>
						<td>H <b-form-input v-model="val[4]" /> mm</td>
					</tr>
				</table>
			</td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub22',

    data() {
        return {
            label: [
                '타입',
                '재질',
                '내부 사이즈(W,mm)',
                '내부 사이즈(D,mm)',
                '내부 사이즈(H,mm)',
            ],
            val: [], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "타입을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "재질을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "내부 사이즈(W,mm)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[3])) { Notify.toast('danger', "내부 사이즈(D,mm)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[4])) { Notify.toast('danger', "내부 사이즈(H,mm)을(를) 입력하세요"); return false; }
            return true;
        }
    },
};
</script>