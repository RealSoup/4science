const validationCheckerUser = (frm) => {

    if ( isEmpty(frm.eq_name) ) {
        Notify.toast('danger', "요청자 이름을 입력하세요.");
        document.getElementById('eq_name').focus();
        return false;
    }
    if ( isEmpty(frm.eq_email) ) {
        Notify.toast('danger', "요청자 이메일을 입력하세요.");
        document.getElementById('eq_email').focus();
        return false;
    }
    if ( isEmpty(frm.eq_department) ) {
        Notify.toast('danger', "요청자 소속을 입력하세요.");
        document.getElementById('eq_department').focus();
        return false;
    }
    if ( isEmpty(frm.eq_hp) ) {
        Notify.toast('danger', "요청자 휴대폰을 입력하세요.");
        document.getElementById('eq_hp').focus();
        return false;
    }
    return true;
};
const validationCheckerGoods = (frm) => {
    if (frm.length < 1) {
        Notify.toast('danger', "견적 상품을 추가하세요.");
        document.getElementById('estimate_model').focus();
        return false;
    }
    for (var key in frm) {
        let fm = frm[key];
        if (isEmpty(fm.em_name)) {
            Notify.toast('danger', "제품명을 입력하세요.");
            document.getElementById('estimate_model'+key+'em_name').focus();
            return false;
        }
        if (isEmpty(fm.em_code)) {
            Notify.toast('danger', "모델명을 입력하세요.");
            document.getElementById('estimate_model'+key+'em_code').focus();
            return false;
        }
        if (isEmpty(fm.em_ea)) {
            Notify.toast('danger', "수량을 입력하세요.");
            document.getElementById('estimate_model'+key+'em_ea').focus();
            return false;
        }
        if (isEmpty(fm.em_spec)) {
            Notify.toast('danger', "제품정보를 입력하세요.");
            document.getElementById('estimate_model'+key+'em_spec').focus();
            return false;
        }
    }
    return true;
};
const validationCheckerExtra = (frm) => {
    if (isEmpty(frm.er_dlvy_at)) {
        Notify.toast('danger', "주문 납품기일을 입력하세요.");
        document.getElementById('er_dlvy_at').focus();
        return false;
    }

    if (isEmpty(frm.er_effective_at)) {
        Notify.toast('danger', "견적 유효기간을 입력하세요.");
        document.getElementById('er_effective_at').focus();
        return false;
    }
    return true;
};
export { validationCheckerUser, validationCheckerGoods, validationCheckerExtra }
