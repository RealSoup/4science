<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th>사이즈<b /></th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0">
                    <colgroup>
						<col width="20%" />
                    </colgroup>
					<tr>
						<th><b-form-checkbox v-model="op01">전사인쇄</b-form-checkbox></th>
						<td>가로 <b-form-input v-model="val[0]" class="w-50" /></td>
						<td>세로 <b-form-input v-model="val[1]" class="w-50" /></td>
					</tr>
					<tr>
						<th><b-form-checkbox v-model="op02">벨크로명찰</b-form-checkbox></th>
						<td>가로 <b-form-input v-model="val[2]" class="w-50" /> ex) 65</td>
						<td>세로 <b-form-input v-model="val[3]" class="w-50" /> ex) 25</td>
					</tr>
					<tr>
						<th><b-form-checkbox v-model="op03">속주머니</b-form-checkbox></th>
						<td>가로 <b-form-input v-model="val[4]" class="w-50" /> ex) 120</td>
						<td>세로 <b-form-input v-model="val[5]" class="w-50" /> ex) 160</td>
					</tr>
					<tr>
						<th><b-form-checkbox v-model="op04">건빵주머니</b-form-checkbox></th>
						<td>가로 <b-form-input v-model="val[6]" class="w-50" /> ex) 150</td>
						<td>세로 <b-form-input v-model="val[7]" class="w-50" /> ex) 200</td>
					</tr>
					<tr>
						<th><b-form-checkbox v-model="op05">볼펜꽂이</b-form-checkbox></th>
						<td>가로 <b-form-input v-model="val[8]" class="w-50" /> ex) 60</td>
						<td>세로 <b-form-input v-model="val[9]" class="w-50" /> ex) 120</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<th>재질<b /></th>
			<td>
                <b-form-select v-model="val[10]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="방진원단">방진원단</b-form-select-option>
                </b-form-select>
				<em>글꼴, 글자크기, 추가위치 선택 가능</em>
			</td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub17',

    data() {
        return {
			op01:false,
			op02:false,
			op03:false,
			op04:false,
			op05:false,
            label: [
                '전사인쇄:가로',
				'전사인쇄:세로',
				'벨크로명찰:가로',
				'벨크로명찰:세로',
				'속주머니:가로',
				'속주머니:세로',
				'건빵주머니:가로',
				'건빵주머니:세로',
				'볼펜꽂이:가로',
				'볼펜꽂이:세로',
				'재질',
            ],
            val: [], 
        };
    },
	watch: {
		op01: function (n, o) { if(o) {this.val[0] = ''; this.val[1] = '';} },
		op02: function (n, o) { if(o) {this.val[2] = ''; this.val[3] = '';} },
		op03: function (n, o) { if(o) {this.val[4] = ''; this.val[5] = '';} },
		op04: function (n, o) { if(o) {this.val[6] = ''; this.val[7] = '';} },
		op05: function (n, o) { if(o) {this.val[8] = ''; this.val[8] = '';} },
	},
    methods: {
        checkValidation(){
            if (this.op01 && isEmpty(this.val[0])) { Notify.toast('danger', "전사인쇄:가로을(를) 입력하세요"); return false; }
            if (this.op01 && isEmpty(this.val[1])) { Notify.toast('danger', "전사인쇄:세로을(를) 입력하세요"); return false; }
            if (this.op02 && isEmpty(this.val[2])) { Notify.toast('danger', "벨크로명찰:가로을(를) 입력하세요"); return false; }
            if (this.op02 && isEmpty(this.val[3])) { Notify.toast('danger', "벨크로명찰:세로을(를) 입력하세요"); return false; }
            if (this.op03 && isEmpty(this.val[4])) { Notify.toast('danger', "속주머니:가로을(를) 입력하세요"); return false; }
            if (this.op03 && isEmpty(this.val[5])) { Notify.toast('danger', "속주머니:세로을(를) 입력하세요"); return false; }
            if (this.op04 && isEmpty(this.val[6])) { Notify.toast('danger', "건빵주머니:가로을(를) 입력하세요"); return false; }
            if (this.op04 && isEmpty(this.val[7])) { Notify.toast('danger', "건빵주머니:세로을(를) 선택하세요"); return false; }
            if (this.op05 && isEmpty(this.val[8])) { Notify.toast('danger', "볼펜꽂이:가로을(를) 입력하세요"); return false; }
            if (this.op05 && isEmpty(this.val[9])) { Notify.toast('danger', "볼펜꽂이:세로을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[10])) { Notify.toast('danger', "재질을(를) 선택하세요"); return false; }
            return true;
        }
    },
};
</script>
<style lang="css" scoped>
table table th,
table table td { font-size:.9rem; }
table table th { text-align:left !important; padding-left:6px; }
</style>