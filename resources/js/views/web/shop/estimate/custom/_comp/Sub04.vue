<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th>타입<b /></th>
			<td>
                <b-form-select v-model="val[0]" class="w-50">
                    <b-form-select-option value="">선택하세요</b-form-select-option>
                    <b-form-select-option value="단품">단품</b-form-select-option>
                    <b-form-select-option value="스탠드 일체형">스탠드 일체형</b-form-select-option>
                    <b-form-select-option value="광학테이블 악세서리형">광학테이블 악세서리형</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th>팬속도 조절<b /></th>
			<td>
                <b-form-select v-model="val[1]" class="w-50">
                    <b-form-select-option value="">선택하세요</b-form-select-option>
                    <b-form-select-option value="고정">고정</b-form-select-option>
                    <b-form-select-option value="단계별 선택">단계별 선택</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th>본체 재질<b /></th>
			<td>
                <b-form-select v-model="val[2]" class="w-50">
                    <b-form-select-option value="">선택하세요</b-form-select-option>
                    <b-form-select-option value="알루미늄 프로파일">알루미늄 프로파일</b-form-select-option>
                    <b-form-select-option value="철재 앵글">철재 앵글</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th>기타사항<b /></th>
			<td>
				<b-form-textarea v-model="val[3]" rows="5" />
				<em>설치 될 환경조건에 대해 기입 해 주세요. 환경 사진이 있다면 하단 문의사항의 첨부파일에서 첨부 해 주세요.</em>
			</td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub04',

    data() {
        return {
            label: [
                '타입',
                '팬속도 조절',
                '본체 재질',
                '기타사항',
            ],
            val: [], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "타입을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "팬속도 조절을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "본체 재질을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[3])) { Notify.toast('danger', "기타사항을(를) 입력하세요"); return false; }
            
            return true;
        }
    },
};
</script>

<style lang="scss" scoped>

</style>