<template>
<b-container class="frm_st">
	<b-row>
        <b-col class="label_st">판매처<b class="need" /></b-col>
        <b-col>
            <b-form-select v-model="manufacturer" class="w-50">
                <b-form-select-option value="Digi-Key">Digi-Key</b-form-select-option>
                <b-form-select-option value="Element14">Element14</b-form-select-option>
                <b-form-select-option value="Mouser">Mouser</b-form-select-option>
                <b-form-select-option value="기타">기타</b-form-select-option>
            </b-form-select>
        </b-col>
    </b-row>

    <b-row class="ctrl">
        <b-col>
            <i>{{manufacturer_label}}</i>
            <b-form-input v-model="code" />
        </b-col>
        <b-col>
            <i>수량</i>
            <b-form-input v-model="ea" />
        </b-col>
        <b-col><b-button size="sm" @click="add">추가</b-button></b-col>
    </b-row>
    <b-row v-for="(v, i) in val" :key="i" class="list">
        <b-col>{{v[0]}}</b-col>
        <b-col>{{v[1]}}</b-col>
        <b-col>{{v[2]}}</b-col>
        <b-col><b-button size="sm" @click="del(i)" variant="danger">취소</b-button></b-col>
    </b-row>
</b-container>
</template>

<script>
export default {
    name: 'ShopEstimateCustomSub24',

    data() {
        return {
            manufacturer:'Digi-Key',
            manufacturer_label:'Digi-Key 부품 번호',
            code:'',
            ea:'',
            label: [],
            val: [], 
        };
    },
	watch: {
		manufacturer: function (n, o) { 
            if(n=='Digi-Key')
                this.manufacturer_label = 'Digi-Key 부품 번호';
            else if(n=='Element14')
                this.manufacturer_label = 'Element14 주문코드';
            else if(n=='Mouser')
                this.manufacturer_label = 'Mouser 번호';
            else if(n=='기타')
                this.manufacturer_label = '제품 페이지 링크';
        },
	},
    methods: {
        add() {
            if (isEmpty(this.code)) { Notify.toast('danger', `${this.manufacturer_label}를 입력하세요`); return false; }
            if (isEmpty(this.ea)) { Notify.toast('danger', "수량을 입력하세요"); return false; }
            this.label.push( '주문 종류', '주문 코드', '수량');
            this.val.push( [this.manufacturer, this.code, this.ea]);
            this.code='';
            this.ea='';
        },
        del(i) { this.val.splice(i, 1); },
        checkValidation(){
            if (isEmpty(this.val)) { Notify.toast('danger', "요청사항을(를) 추가하세요"); return false; }
            this.val = this.val.reduce(function (acc, cur) {
                //  Spread operator는 ...와 같이 배열의 요소들을 나열하는 전개 연산자입니다.
                return [...acc, ...cur];
            });
            return true;
        }
    },
};
</script>
<style scoped>
.ctrl { align-items:flex-end; }
.ctrl .col:nth-child(1) { flex:0 0 60%; max-width:60%; }
.list .col:nth-child(1) { flex:0 0 15%; max-width:15%; }
.list .col:nth-child(2) { flex:0 0 60%; max-width:60%; }
</style>