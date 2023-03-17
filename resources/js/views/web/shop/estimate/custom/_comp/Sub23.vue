<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th>제작 희망 사이즈<b/></th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td>가로 <b-form-input v-model="val[0]" /> mm</td><td>X</td>
						<td>세로 <b-form-input v-model="val[1]" /> mm</td><td>X</td>
						<td>높이 <b-form-input v-model="val[2]" /> mm</td>
					</tr>
				</table>
				<em>이미지가 있는 경우 첨부파일 란에 첨부 바랍니다.</em>
			</td>
		</tr>
		<tr>
			<th>수량<b/></th><td><b-form-input v-model="val[3]" /></td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub23',

    data() {
        return {
            label: [
                '제작 사이즈(가로,mm)',
                '제작 사이즈(세로,mm)',
                '제작 사이즈(높이,mm)',
                '수량',
            ],
            val: [], 
        };
    },
    
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "제작 사이즈(가로,mm)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "제작 사이즈(세로,mm)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "제작 사이즈(높이,mm)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[3])) { Notify.toast('danger', "수량을(를) 입력하세요"); return false; }
            return true;
        }
    },
    mounted() {
        this.$emit('set_eq_content', "제품명 :\n사양(기능) :\n전원 (AC 방식 or 배터리 방식) :\n동작 프로그램(펌웨어) 제작 유무 :\n기타 : 방수/방진/무게/사용연한/인증/제약사항  등 세부 사항");
    },
};
</script>