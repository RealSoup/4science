<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th>사이즈<b /></th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td>
							<b-form-select v-model="val[0]">
								<b-form-select-option value="">선택하세요.</b-form-select-option>
								<b-form-select-option value="10인용">10인용</b-form-select-option>
								<b-form-select-option value="20인용">20인용</b-form-select-option>
								<b-form-select-option value="30인용">30인용</b-form-select-option>
								<b-form-select-option value="40인용">40인용</b-form-select-option>
								<b-form-select-option value="50인용">50인용</b-form-select-option>
							</b-form-select>
						</td>
						<td><b-form-input v-model="val[1]" readonly /></td>
						<td>X</td>
						<td><b-form-input v-model="val[2]" readonly /></td>
						<td>X</td>
						<td><b-form-input v-model="val[3]" readonly /></td>						
					</tr>
				</table>
				<em>다양한 사이즈로 제작 가능</em>
			</td>
		</tr>
		<tr>
			<th>재질<b /></th>
			<td>
				<b-form-select v-model="val[4]" class="w-50">
					<b-form-select-option value="">선택하세요.</b-form-select-option>
					<b-form-select-option value="분체 도장(기본)">분체 도장(기본)</b-form-select-option>
					<b-form-select-option value="SUS">SUS</b-form-select-option>
				</b-form-select>
			</td>
		</tr>
		<tr>
			<th>도어<b /></th>
			<td>
				<b-form-select v-model="val[5]" class="w-50">
					<b-form-select-option value="">선택하세요.</b-form-select-option>
					<b-form-select-option value="미부착">미부착</b-form-select-option>
					<b-form-select-option value="도어 부착">도어 부착</b-form-select-option>
				</b-form-select>
			</td>
		</tr>
		<tr v-if="val[5]=='도어 부착'">
			<th>도어 타입<b /></th>
			<td>
				<b-form-select v-model="val[6]" class="w-50">
					<b-form-select-option value="">선택하세요.</b-form-select-option>
					<b-form-select-option value="투명">투명</b-form-select-option>
					<b-form-select-option value="불투명">불투명</b-form-select-option>
				</b-form-select>
			</td>
		</tr>
    </table>
</b-container>

</template>

<script>
export default {
    name: 'ShopEstimateCustomSub11',

    data() {
        return {
            label: [
                '사이즈',
				'사이즈(가로)',
				'사이즈(세로)',
				'사이즈(높이)',
				'재질',
				'도어',
				'도어 타입',
            ],
            val: [
				"10인용",
				1360,
				500,
				980,
			], 
        };
    },
	watch: {
		'val': {
			deep: true,
			handler(v) {
				this.val[1] = 1360*Number(v[0].replace('0인용', ''));
				this.val[2] = 500*Number(v[0].replace('0인용', ''));
				this.val[3] = 980*Number(v[0].replace('0인용', ''));
			}
		}
	},
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "사이즈을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[4])) { Notify.toast('danger', "재질을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[5])) { Notify.toast('danger', "도어을(를) 선택하세요"); return false; }
            if (this.val[5]=='도어 부착' && isEmpty(this.val[6])) { Notify.toast('danger', "도어타입을(를) 선택하세요"); return false; }
            
            return true;
        }
    },
};
</script>

<style lang="scss" scoped>

</style>