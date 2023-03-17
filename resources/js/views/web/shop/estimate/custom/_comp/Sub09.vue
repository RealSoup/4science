<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
		<tr>
			<th>타입<b /></th>
			<td>
				<b-form-select v-model="val[0]" class="w-50">
					<b-form-select-option value="">선택하세요.</b-form-select-option>
					<b-form-select-option value="시약대형 중앙실험대">시약대형 중앙실험대</b-form-select-option>
					<b-form-select-option value="콘센트형 중앙실험대">콘센트형 중앙실험대</b-form-select-option>
					<b-form-select-option value="기본형 중앙실험대">기본형 중앙실험대</b-form-select-option>
					<b-form-select-option value="시약대형 벽면실험대">시약대형 벽면실험대</b-form-select-option>
					<b-form-select-option value="콘센트형 벽면실험대">콘센트형 벽면실험대</b-form-select-option>
					<b-form-select-option value="기본형 벽면실험대">기본형 벽면실험대</b-form-select-option>
					<b-form-select-option value="약품기구보관장">약품기구보관장</b-form-select-option>
					<b-form-select-option value="기본형 작업대">기본형 작업대</b-form-select-option>
					<b-form-select-option value="작업대">작업대</b-form-select-option>
					<b-form-select-option value="씽크대">씽크대</b-form-select-option>
					<b-form-select-option value="기본형 코너실험대">기본형 코너실험대</b-form-select-option>
					<b-form-select-option value="콘센트형 코너실험대">콘센트형 코너실험대</b-form-select-option>
					<b-form-select-option value="시약대형 코너실험대">시약대형 코너실험대</b-form-select-option>
				</b-form-select>
			</td>
		</tr>
		<tr>
			<th>본체 재질<b /></th>
			<td>
				<b-form-select v-model="val[1]" class="w-50">
                    <b-form-select-option value="">선택하세요</b-form-select-option>
                    <b-form-select-option value="목재">목재</b-form-select-option>
                    <b-form-select-option value="알루미늄">알루미늄</b-form-select-option>
                    <b-form-select-option value="철재">철재</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th>사이즈<b /></th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td >가로 <b-form-input v-model="val[2]" class="w-50" /> mm</td>
						<td>X</td>
						<td>세로 <b-form-input v-model="val[3]" class="w-50" /> mm</td>
						<td>X</td>
						<td>높이 <b-form-input v-model="val[4]" class="w-50" /> mm</td>
					</tr>
				</table>
				외경 기준으로 (ex : 1200 x 750 x 1800mm)
			</td>
		</tr>
		<tr>
			<th>기타사항<b /></th>
			<td>
				<b-form-textarea v-model="val[5]" rows="13" />
				<em>상판재질, 110V 콘센트추가 등 필요사항 기입 해 주세요.</em>
			</td>
		</tr>
    </table>
</b-container>

</template>

<script>
export default {
    name: 'ShopEstimateCustomSub09',

    data() {
        return {
            label: [
                '타입',
                '본체 재질',
                '사이즈(가로,mm)',
                '사이즈(세로,mm)',
                '사이즈(높이,mm)',
                '기타사항',
            ],
            val: [], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "타입을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "본체 재질을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "사이즈(가로,mm)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[3])) { Notify.toast('danger', "사이즈(세로,mm)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[4])) { Notify.toast('danger', "사이즈(높이,mm)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[6])) { Notify.toast('danger', "기타사항을(를) 입력하세요"); return false; }
            
            return true;
        }
    },
};
</script>