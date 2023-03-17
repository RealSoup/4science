<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
        <tr><th>Sample Size(mm)<b /></th><td><b-form-input v-model="val[5]" class="w-50" />mm</td></tr>
		<tr><th>Travel Range(mm) <b /></th><td><b-form-input v-model="val[5]" class="w-50" />mm</td></tr>
		<tr><th>Maximum Speed(mm/sec)<b /></th><td><b-form-input v-model="val[5]" class="w-50" />mm/sec</td></tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub06',

    data() {
        return {
            label: [
                'Sample Size(mm)',
                'Travel Range(mm)',
                'Maximum Speed(mm/sec)',
            ],
            val: [], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.val[0])) { Notify.toast('danger', "Sample Size(mm)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[1])) { Notify.toast('danger', "Travel Range(mm)을(를) 입력하세요"); return false; }
            if (isEmpty(this.val[2])) { Notify.toast('danger', "Maximum Speed(mm/sec)을(를) 입력하세요"); return false; }
            
            return true;
        }
    },
};
</script>