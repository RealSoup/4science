<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr>
			<th>물질명<b/></th>
			<td>
                <b-form-select v-model="val[0]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="Aluminum (Al)" > Aluminum (Al)</b-form-select-option>
                    <b-form-select-option value="Antimony (Sb)" > Antimony (Sb)</b-form-select-option>
                    <b-form-select-option value="Arsenic (As)" > Arsenic (As)</b-form-select-option>
                    <b-form-select-option value="Barium (Ba)" > Barium (Ba)</b-form-select-option>
                    <b-form-select-option value="Beryllium (Be)" > Beryllium (Be)</b-form-select-option>
                    <b-form-select-option value="Bismuth (Bi)" > Bismuth (Bi)</b-form-select-option>
                    <b-form-select-option value="Boron (B)" > Boron (B)</b-form-select-option>
                    <b-form-select-option value="Cadmium (Cd)" > Cadmium (Cd)</b-form-select-option>
                    <b-form-select-option value="Calcium (Ca)" > Calcium (Ca)</b-form-select-option>
                    <b-form-select-option value="Carbon (C)" > Carbon (C)</b-form-select-option>
                    <b-form-select-option value="Cerium (Ce)" > Cerium (Ce)</b-form-select-option>
                    <b-form-select-option value="Cesium (Cs)" > Cesium (Cs)</b-form-select-option>
                    <b-form-select-option value="Chromium (Cr)" > Chromium (Cr)</b-form-select-option>
                    <b-form-select-option value="Cobalt (Co)" > Cobalt (Co)</b-form-select-option>
                    <b-form-select-option value="Copper (Cu)" > Copper (Cu)</b-form-select-option>
                    <b-form-select-option value="Dysprosium (Dy)" > Dysprosium (Dy)</b-form-select-option>
                    <b-form-select-option value="Erbium (Er)" > Erbium (Er)</b-form-select-option>
                    <b-form-select-option value="Europium (Eu)" > Europium (Eu)</b-form-select-option>
                    <b-form-select-option value="Gadolinium (Gd)" > Gadolinium (Gd)</b-form-select-option>
                    <b-form-select-option value="Gallium (Ga)" > Gallium (Ga)</b-form-select-option>
                    <b-form-select-option value="Germanium (Ge)" > Germanium (Ge)</b-form-select-option>
                    <b-form-select-option value="Gold (Au)" > Gold (Au)</b-form-select-option>
                    <b-form-select-option value="Hafnium (Hf)" > Hafnium (Hf)</b-form-select-option>
                    <b-form-select-option value="Holmium (Ho)" > Holmium (Ho)</b-form-select-option>
                    <b-form-select-option value="Indium (In)" > Indium (In)</b-form-select-option>
                    <b-form-select-option value="Iridium (Ir)" > Iridium (Ir)</b-form-select-option>
                    <b-form-select-option value="Iron (Fe)" > Iron (Fe)</b-form-select-option>
                    <b-form-select-option value="Lanthanum (La)" > Lanthanum (La)</b-form-select-option>
                    <b-form-select-option value="Lead (Pb)" > Lead (Pb)</b-form-select-option>
                    <b-form-select-option value="Lithium (Li)" > Lithium (Li)</b-form-select-option>
                    <b-form-select-option value="Lutetium (Lu)" > Lutetium (Lu)</b-form-select-option>
                    <b-form-select-option value="Magnesium (Mg)" > Magnesium (Mg)</b-form-select-option>
                    <b-form-select-option value="Manganese (Mn)" > Manganese (Mn)</b-form-select-option>
                    <b-form-select-option value="Molybdenum (Mo)" > Molybdenum (Mo)</b-form-select-option>
                    <b-form-select-option value="Neodymium (Nd)" > Neodymium (Nd)</b-form-select-option>
                    <b-form-select-option value="Nickel (Ni)" > Nickel (Ni)</b-form-select-option>
                    <b-form-select-option value="Niobium (Nb)" > Niobium (Nb)</b-form-select-option>
                    <b-form-select-option value="Osmium (Os)" > Osmium (Os)</b-form-select-option>
                    <b-form-select-option value="Palladium (Pd)" > Palladium (Pd)</b-form-select-option>
                    <b-form-select-option value="Phosphorus (P)" > Phosphorus (P)</b-form-select-option>
                    <b-form-select-option value="Platinum (Pt)" > Platinum (Pt)</b-form-select-option>
                    <b-form-select-option value="Potassium (K)" > Potassium (K)</b-form-select-option>
                    <b-form-select-option value="Praseodymium (Pr)" > Praseodymium (Pr)</b-form-select-option>
                    <b-form-select-option value="Rhenium (Re)" > Rhenium (Re)</b-form-select-option>
                    <b-form-select-option value="Rhodium (Rh)" > Rhodium (Rh)</b-form-select-option>
                    <b-form-select-option value="Rubidium (Rb)" > Rubidium (Rb)</b-form-select-option>
                    <b-form-select-option value="Ruthenium (Ru)" > Ruthenium (Ru)</b-form-select-option>
                    <b-form-select-option value="Samarium (Sm)" > Samarium (Sm)</b-form-select-option>
                    <b-form-select-option value="Scandium (Sc)" > Scandium (Sc)</b-form-select-option>
                    <b-form-select-option value="Selenium (Se)" > Selenium (Se)</b-form-select-option>
                    <b-form-select-option value="Silicon (Si)" > Silicon (Si)</b-form-select-option>
                    <b-form-select-option value="Silver (Ag)" > Silver (Ag)</b-form-select-option>
                    <b-form-select-option value="Sodium (Na)" > Sodium (Na)</b-form-select-option>
                    <b-form-select-option value="Strontium (Sr)" > Strontium (Sr)</b-form-select-option>
                    <b-form-select-option value="Sulfur (S)" > Sulfur (S)</b-form-select-option>
                    <b-form-select-option value="Tantalum (Ta)" > Tantalum (Ta)</b-form-select-option>
                    <b-form-select-option value="Tellurium (Te)" > Tellurium (Te)</b-form-select-option>
                    <b-form-select-option value="Terbium (Tb)" > Terbium (Tb)</b-form-select-option>
                    <b-form-select-option value="Thallium (Tl)" > Thallium (Tl)</b-form-select-option>
                    <b-form-select-option value="Thulium (Tm)" > Thulium (Tm)</b-form-select-option>
                    <b-form-select-option value="Tin (Sn)" > Tin (Sn)</b-form-select-option>
                    <b-form-select-option value="Titanium (Ti)" > Titanium (Ti)</b-form-select-option>
                    <b-form-select-option value="Tungsten (W)" > Tungsten (W)</b-form-select-option>
                    <b-form-select-option value="Vanadium (V)" > Vanadium (V)</b-form-select-option>
                    <b-form-select-option value="Ytterbium (Yb)" > Ytterbium (Yb)</b-form-select-option>
                    <b-form-select-option value="Yttrium (Y)" > Yttrium (Y)</b-form-select-option>
                    <b-form-select-option value="Zinc (Zn)" > Zinc (Zn)</b-form-select-option>
                    <b-form-select-option value="Zirconium (Zr)" > Zirconium (Zr)</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th>형태<b/></th>
			<td>
                <b-form-select v-model="val[1]" class="w-50">
                    <b-form-select-option value="">선택하세요.</b-form-select-option>
                    <b-form-select-option value="선재 (wire)">선재 (wire)</b-form-select-option>
                    <b-form-select-option value="봉재(rod)">봉재(rod)</b-form-select-option>
                    <b-form-select-option value="판재(sheet, foil, plate, ribbon)">판재(sheet, foil, plate, ribbon)</b-form-select-option>
                    <b-form-select-option value="원형(target, disk)">원형(target, disk)</b-form-select-option>
                </b-form-select>
			</td>
		</tr>
		<tr>
			<th>사양<b/></th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td>
                            <b-form-select v-model="val[2]">
                                <b-form-select-option value="">선택하세요.</b-form-select-option>
                                <b-form-select-option value="wire">wire</b-form-select-option>
                                <b-form-select-option value="rod">rod</b-form-select-option>
                            </b-form-select>
						</td>
						<td>
                            직경 <b-form-input v-model="val[3]" class="w-80px" /> mm
                            <b>X</b>
						    길이 <b-form-input v-model="val[4]" class="w-80px" /> M
                        </td>
					</tr>
				</table>

				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td>
                            <b-form-select v-model="val[5]">
                                <b-form-select-option value="">선택하세요.</b-form-select-option>
                                <b-form-select-option value="plate">plate</b-form-select-option>
                                <b-form-select-option value="sheet">sheet</b-form-select-option>
                            </b-form-select>
						</td>
						<td>
                            두께 <b-form-input v-model="val[6]" class="w-80px" /> mm
                            <b>X</b>
						    가로 <b-form-input v-model="val[7]" class="w-80px" /> mm
                            <b>X</b>
						    세로 <b-form-input v-model="val[8]" class="w-80px" /> mm
                        </td>
					</tr>
				</table>

				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td>
                            <b-form-select v-model="val[9]">
                                <b-form-select-option value="ribbon" selected>ribbon</b-form-select-option>
                            </b-form-select>
						</td>
						<td>
                            폭&nbsp;&nbsp;&nbsp; <b-form-input v-model="val[10]" class="w-80px" /> mm
                            <b>X</b>
						    두께 <b-form-input v-model="val[11]" class="w-80px" /> mm
                            <b>X</b>
						    길이 <b-form-input v-model="val[12]" class="w-80px" /> M
                        </td>
					</tr>
				</table>

				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td>
                            <b-form-select v-model="val[13]">
                                <b-form-select-option value="">선택하세요.</b-form-select-option>
                                <b-form-select-option value="순물질 target">순물질 target</b-form-select-option>
                                <b-form-select-option value="disk">disk</b-form-select-option>
                            </b-form-select>
						</td>
						<td>
                            직경 <b-form-input v-model="val[14]" class="w-80px" /> mm
                            <b>X</b>
						    두께 <b-form-input v-model="val[15]" class="w-80px" /> mm
                            <b>,</b>
						    순도 <b-form-input v-model="val[16]" class="w-80px" /> %
                        </td>
					</tr>
				</table>

				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td>
                            <b-form-select v-model="val[17]">
                                <b-form-select-option value="target" selected>합금 target</b-form-select-option>
                            </b-form-select>
						</td>
						<td>
                            직경 <b-form-input v-model="val[18]" class="w-80px" /> mm
                            <b>X</b>
						    두께 <b-form-input v-model="val[19]" class="w-80px" /> mm
                            <b>X</b>
						    조성비 <b-form-input v-model="val[20]" class="w-80px" /> (ex. 90:10 wt%)
                        </td>
					</tr>
				</table>

			</td>
		</tr>
		<tr>
			<th>순도<b/></th>
			<td><b-form-input v-model="val[21]" class="w-50" /> 특정 순도 또는 공급 가능한 기본 순도로 제공</td>
		</tr>
		<tr>
			<th>수량<b/></th>
			<td><b-form-input v-model="val[22]" class="w-50" /> 원하는 수량 또는 공급 가능한 수량(MOQ)</td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub20',

    data() {
        return {
            label: [
                '물질명',
                '형태',
                '사양1 타입',
                '사양1 직경',
                '사양1 길이',
                '사양2 타입',
                '사양2 두께',
                '사양2 가로',
                '사양2 세로',
                '사양3 타입',
                '사양3 폭',
                '사양3 두께',
                '사양3 길이',
                '사양4 타입',
                '사양4 직경',
                '사양4 두께',
                '사양4 순도',
                '사양5 타입',
                '사양5 직경',
                '사양5 두께',
                '사양5 조성비',
                '순도',
                '수량',
            ],
            val: [], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "물질명을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "형태을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "사양1 타입을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[3])) { Notify.toast('danger', "사양1 직경을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[4])) { Notify.toast('danger', "사양1 길이을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[5])) { Notify.toast('danger', "사양2 타입을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[6])) { Notify.toast('danger', "사양2 두께을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[7])) { Notify.toast('danger', "사양2 가로을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[8])) { Notify.toast('danger', "사양2 세로을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[9])) { Notify.toast('danger', "사양3 타입을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[10])) { Notify.toast('danger', "사양3 폭을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[11])) { Notify.toast('danger', "사양3 두께을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[12])) { Notify.toast('danger', "사양3 길이을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[13])) { Notify.toast('danger', "사양4 타입을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[14])) { Notify.toast('danger', "사양4 직경을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[15])) { Notify.toast('danger', "사양4 두께을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[16])) { Notify.toast('danger', "사양4 순도을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[17])) { Notify.toast('danger', "사양5 타입을(를) 선택하세요"); return false; }
            if (isEmpty(this.val[18])) { Notify.toast('danger', "사양5 직경을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[19])) { Notify.toast('danger', "사양5 두께을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[20])) { Notify.toast('danger', "사양5 조성비을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[21])) { Notify.toast('danger', "순도을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[22])) { Notify.toast('danger', "수량을(를) 입력하세요"); return false; }
            return true;
        }
    },
};
</script>
<style scoped>
.frm_st>table>tr>th { max-width:100px; }
table td { font-size:.8rem; }
table table td b { display:inline-block; margin:0 3px; }
table table td:nth-child(1) { width:120px; }
.frm_st input,
.frm_st select { padding:2px 10px !important; }
.frm_st .w-80px { max-width:80px; display:inline-block; }
</style>