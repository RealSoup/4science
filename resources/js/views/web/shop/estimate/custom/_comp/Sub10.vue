<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
		<tr>
			<th>견적 종류<b /></th>
			<td>
				<b-form-select v-model="val[0]" class="w-50">
					<b-form-select-option value="">선택하세요.</b-form-select-option>
					<b-form-select-option value="아트웍 견적 요청">아트웍 견적 요청</b-form-select-option>
					<b-form-select-option value="PCB 견적 요청">PCB 견적 요청</b-form-select-option>
				</b-form-select>
				<br />
				<em v-if="val[0] == '아트웍 견적 요청'">※첨부파일은 ORCAD 회로도 첨부하시면 됩니다. 모든항목 특이사항이 없으면, 기본사항으로 적용됩니다.</em>
				<em v-else-if="val[0] == 'PCB 견적 요청'">※첨부파일은 Gerber DATA 첨부하시면 됩니다. 모든항목 특이사항이 없으면, 기본사항으로 적용됩니다.</em>
				<em>견적 종류를 선택하세요.</em>
			</td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub10',

    data() {
        return {
            label: [ '견적 종류', ],
            val: [], 
            eq_content_list:{
                'default': "제품명 : \n사양 : \n수량 : ",
                'type01':"1.Layer : \n2.B/D size : \n3.희망납기일 :\n4.기타문의내용 :",
                'type02':"1. 수량 : \n2. Layer : \n3. 사이즈 : \n4. 재질 : \n5. 표면처리 : \n6. PCB두께 : \n7. 동박두께 : \n8. V-CUT : \n9. 실크색상 : \n10. 솔더색상 : \n11. 기타문의사항 :",
            }
        };
    },
	watch: {
		'val': {
			deep: true,
			handler(v) {
				let tmp='';
				if (v[0] == '아트웍 견적 요청')
					tmp=this.eq_content_list.type01;
				else if (v[0] == 'PCB 견적 요청')
					tmp=this.eq_content_list.type02;
				else 
					tmp=this.eq_content_list.default;
				this.$emit('set_eq_content', tmp);
			}
		}
	},
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "견적 종류을(를) 선택하세요"); return false; }
            return true;
        }
    },
};
</script>