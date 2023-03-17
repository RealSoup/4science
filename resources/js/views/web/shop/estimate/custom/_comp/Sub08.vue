<template>
<b-container class="frm_st">
	<table cellpadding="0" cellspacing="0" border="0">
		<tr>
        	<th>도면<b /></th>
			<td><em>오른쪽 첨부파일에 사이즈와 모양이 기입된 도면을 첨부해주세요.</em></td>
		</tr>
		<tr>
			<th> 도면 예시</th>
			<td>
				<table cellpadding="0" cellspacing="0" border="0" style="width:642px !important;">
					<tr>
						<td><img :src="`${s3url}estimate/plan_example01.png`" /></td>
						<td><img :src="`${s3url}estimate/plan_example02.png`" /></td>
						<td><img :src="`${s3url}estimate/plan_example03.png`" /></td>
					</tr>
				</table>
			</td>
		</tr>
    </table>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub08',

    data() {
        return {
            label: [],
            val: [], 
        };
    },
    methods: {
        checkValidation(){
            if (isEmpty(this.$parent.files)) { Notify.toast('danger', "도면을(를) 첨부하세요"); return false; }
            
            return true;
        }
    },
};
</script>

<style lang="css" scoped>
table tr td table tr td img { width:100%; }
</style>