<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th>차광타입<b /></th>
			<td>
                <b-form-select v-model="val[0]" class="w-50">
                    <b-form-select-option value="">선택하세요</b-form-select-option>
                    <b-form-select-option value="커튼타입">커튼타입</b-form-select-option>
                    <b-form-select-option value="철판타입">철판타입</b-form-select-option>
                    <b-form-select-option value="아크릴타입">아크릴타입</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr v-if="val[0]=='커튼타입'">
			<th>차광 추가정보<b /></th>
			<td>
                <b-form-select v-model="val[1]" class="w-50">
                    <b-form-select-option value="">선택하세요</b-form-select-option>
                    <b-form-select-option value="방염">방염</b-form-select-option>
                    <b-form-select-option value="차광율">차광율</b-form-select-option>
                    <b-form-select-option value="주름 여부">주름 여부</b-form-select-option>
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
			<th>사이즈<b /></th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td >가로 <b-form-input v-model="val[3]" class="w-50" /> mm</td>
						<td>X</td>
						<td>세로 <b-form-input v-model="val[4]" class="w-50" /> mm</td>
						<td>X</td>
						<td>높이 <b-form-input v-model="val[5]" class="w-50" /> mm</td>
					</tr>
				</table>
				외경 기준으로 (ex : 1200 x 750 x 1800mm)
			</td>
		</tr>
		<tr>
			<th>기타사항<b /></th>
			<td><b-form-textarea v-model="val[6]" rows="5" /><em>설치 될 환경조건에 대해 기입 해 주세요. 환경 사진이 있다면 하단 문의사항의 첨부파일에서 첨부 해 주세요.</em></td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub05',

    data() {
        return {
            label: [
                '차광타입',
				'차광 추가정보',
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
			if (isEmpty(this.val[0])) { Notify.toast('danger', "차광타입(를) 선택하세요"); return false; }
			if (this.val[0]=='커튼타입' && isEmpty(this.val[1])) { Notify.toast('danger', "차광 추가정보(를) 선택하세요"); return false; }
			if (isEmpty(this.val[2])) { Notify.toast('danger', "본체 재질(를) 입력하세요"); return false; }
			if (isEmpty(this.val[3])) { Notify.toast('danger', "사이즈(가로,mm)(를) 입력하세요"); return false; }
			if (isEmpty(this.val[4])) { Notify.toast('danger', "사이즈(세로,mm)(를) 입력하세요"); return false; }
			if (isEmpty(this.val[5])) { Notify.toast('danger', "사이즈(높이,mm)(를) 입력하세요"); return false; }
			if (isEmpty(this.val[6])) { Notify.toast('danger', "기타사항(를) 입력하세요"); return false; }
            
            return true;
        }
    },
};
</script>