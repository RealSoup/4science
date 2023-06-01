<template>
<b-container class="frm_st">
    <table>
		<tr>
			<th>카테고리<b /></th>
			<td>
                <b-form-select v-model="val[0]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="Raman">Raman</b-form-select-option>
                    <b-form-select-option value="PL">PL</b-form-select-option>
                    <b-form-select-option value="EL">EL</b-form-select-option>
                    <b-form-select-option value="PLE">PLE</b-form-select-option>
                    <b-form-select-option value="Reflectance">Reflectance</b-form-select-option>
                    <b-form-select-option value="Transmittance">Transmittance</b-form-select-option>
                    <b-form-select-option value="Absorption">Absorption</b-form-select-option>
                    <b-form-select-option value="General spectroscopy">General spectroscopy</b-form-select-option>
                    <b-form-select-option value="Upconversion Luminescence">Upconversion Luminescence</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th>1. Excitation source<b /></th>
			<td>
				<table>
					<tr><th rowspan="3">Type</th>
						<td>Laser</td><td><b-form-input v-model="val[1]" /></td>
						<td>Lamp</td><td><b-form-input v-model="val[2]" /></td></tr>
					<tr><td>Laser</td><td><b-form-input v-model="val[3]" /></td>
						<td>LED</td><td><b-form-input v-model="val[4]" /></td></tr>
					<tr><td>Others</td><td colspan="3"><b-form-input v-model="val[5]" /></td></tr>
					<tr><th>Wavelength</th><td colspan="4"><b-form-input v-model="val[6]" /></td></tr>
				</table>
			</td>
		</tr>
		<tr><th> 2. Input power</th><td><b-form-input v-model="val[7]" /></td></tr>
		<tr><th rowspan="2"> 3. Emission range</th><td><b-form-input v-model="val[8]" /></td></tr>
		<tr><td><b-form-input v-model="val[9]" /></td></tr>
		<tr>
			<th> 4. Sample Chamber</th>
			<td>
                <b-form-select v-model="val[10]">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="Microscope Raman">Microscope Raman</b-form-select-option>
                    <b-form-select-option value="PL chamber">PL chamber</b-form-select-option>
                    <b-form-select-option value="Macro Chamber">Macro Chamber</b-form-select-option>
                    <b-form-select-option value="Long working Telescope">Long working Telescope</b-form-select-option>
                    <b-form-select-option value="Fiber coupled probe module, etc.">Fiber coupled probe module, etc.</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr><th rowspan="2"> 5. System resolution</th><td><b-form-input v-model="val[11]" class="w-25" />(Wavelength)</td></tr>
		<tr><td><b-form-input v-model="val[12]" class="w-25" />/cm-1(Raman shift)</td></tr>
		<tr><th> 6. Beam spot size</th><td><b-form-input v-model="val[13]" /></td></tr>
		<tr><th> 7. Sample size</th><td><b-form-input v-model="val[14]" /></td></tr>
		<tr>
			<th>8. Sample type<b /></th>
			<td>
				<table>
					<tr><th>Solid wafer</th><td><b-form-input v-model="val[15]" /></td></tr>
					<tr><th>Liquid</th><td><b-form-input v-model="val[16]" /></td></tr>
					<tr><th>Powder</th><td><b-form-input v-model="val[17]" /></td></tr>
					<tr><th>Others</th><td><b-form-input v-model="val[18]" /></td></tr>
				</table>
			</td>
		</tr>
		<tr><th>9. Sample material</th><td><b-form-input v-model="val[19]" /></td></tr>
		<tr><th>10. Thickness<br />of target material</th><td><b-form-input v-model="val[20]" /></td></tr>
		<tr><th>11. Application<b /></th><td><b-form-input v-model="val[21]" /></td></tr>
	</table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub01',
    data() {
        return {
            label: [
                '카테고리',
                'Excitation source : Laser',
                'Excitation source : Lamp',
                'Excitation source : Laser2',
                'Excitation source : LED',
                'Excitation source : Others',
                'Excitation source : Wavelength',
                'Input power',
                'Emission range : Wavelength',
                'Emission range : Raman shift',
                'Sample Chamber',
                'System resolution : Wavelength',
                'System resolution : Raman shift',
                'Beam spot size',
                'Sample size',
                'Sample type : Solid wafer',
                'Sample type : Liquid',
                'Sample type : Powder',
                'Sample type : Others',
                'Sample material',
                'Thickness of target material',
                'Application',
            ],
            val: [], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "카테고리를 선택하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "1. Excitation source의 Type의 Laser을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "1. Excitation source의 Type의 Lamp을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[3])) { Notify.toast('danger', "1. Excitation source의 Type의 Laser2을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[4])) { Notify.toast('danger', "1. Excitation source의 Type의 LED을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[5])) { Notify.toast('danger', "1. Excitation source의 Type의 Others을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[6])) { Notify.toast('danger', "1. Excitation source의 Wavelength을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[15])) { Notify.toast('danger', "8. Sample type의 Solid wafer을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[16])) { Notify.toast('danger', "8. Sample type의 Liquid을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[17])) { Notify.toast('danger', "8. Sample type의 Powder을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[18])) { Notify.toast('danger', "8. Sample type의 Others을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[21])) { Notify.toast('danger', "11. Application을(를) 입력하세요"); return false; }
            
            return true;
        }
    },
};
</script>