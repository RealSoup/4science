<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr><th>Application<b /></th><td><b-form-input v-model="val[0]" class="w-50" /> 영상획득, PL, Raman, Laser microscopy</td></tr>
		<tr><th>기존 system 사용 유무 <b /></th><td><b-form-input v-model="val[1]" class="w-50" /> 경통, 현미경 등</td></tr>
		<tr><th>Camera type <b /></th><td><b-form-input v-model="val[2]" class="w-50" /> CCD, CMOS (동영상 위주인지 싱글샷 위주인지)</td></tr>
		<tr><th>구동방식<b /></th><td><b-form-input v-model="val[3]" class="w-50" /> Manual, Motorized</td></tr>
		<tr><th>기타사항<b /></th><td><b-form-textarea v-model="val[4]" rows="5" /><em>설치 될 환경조건에 대해 기입 해 주세요. 환경 사진이이나 컨셉 개략도가 있다면 하단 문의사항의 첨부파일에서 첨부 해 주세요.</em></td></tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub07',

    data() {
        return {
            label: [
                'Application',
                '기존 system 사용 유무',
                'Camera type',
                '구동방식',
                '기타사항',
            ],
            val: [], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "Application을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "기존 system 사용 유무을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "Camera type을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[3])) { Notify.toast('danger', "구동방식을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[4])) { Notify.toast('danger', "기타사항을(를) 입력하세요"); return false; }
            
            return true;
        }
    },
};
</script>

<style lang="scss" scoped>

</style>