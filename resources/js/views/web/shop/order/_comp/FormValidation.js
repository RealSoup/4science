const validationChecker = (frm) => {
    if (frm.od_pay_method == 'B' || frm.od_pay_method == 'E') {
        if ( frm.extra.oex_type == 'IV' ) {
            if ( frm.extra.oex_hasBizLicense ) {
                if (isEmpty(frm.extra.oex_file)) {
                    Notify.toast('danger', "사업자 등록증 사본을 첨부해주세요");
                    this.$refs.tax_invoice.$refs.oex_file.$refs.input.focus();
                    return false;
                }
            } else {
                if (isEmpty(frm.extra.oex_biz_name)) {
                    Notify.toast('danger', "법인명을 입력해주세요");
                    this.$refs.tax_invoice.$refs.oex_biz_name.focus();
                    return false;
                }
                if (isEmpty(frm.extra.oex_biz_num)) {
                    Notify.toast('danger', "사업자 등록번호를 입력해주세요");
                    this.$refs.tax_invoice.$refs.oex_biz_num.focus();
                    return false;
                }
                if (isEmpty(frm.extra.oex_biz_type)) {
                    Notify.toast('danger', "업태를 입력해주세요");
                    this.$refs.tax_invoice.$refs.oex_biz_type.focus();
                    return false;
                }
                if (isEmpty(frm.extra.oex_biz_item)) {
                    Notify.toast('danger', "종목를 입력해주세요");
                    this.$refs.tax_invoice.$refs.oex_biz_item.focus();
                    return false;
                }
                if (isEmpty(frm.extra.oex_ceo)) {
                    Notify.toast('danger', "대표자명을 입력해주세요");
                    this.$refs.tax_invoice.$refs.oex_ceo.focus();
                    return false;
                }
                if (isEmpty(frm.extra.oex_addr)) {
                    Notify.toast('danger', "사업장 소재지를 입력해주세요");
                    this.$refs.tax_invoice.$refs.oex_addr.focus();
                    return false;
                }
            }

            if (isEmpty(frm.extra.oex_mng)) {
                Notify.toast('danger', "담장자를 입력해주세요");
                this.$refs.tax_invoice.$refs.oex_mng.focus();
                return false;
            }
            if (isEmpty(frm.extra.oex_email)) {
                Notify.toast('danger', "이메일을 입력해주세요");
                this.$refs.tax_invoice.$refs.oex_email.focus();
                return false;
            }
            if (isEmpty(frm.extra.oex_num_tel)) {
                Notify.toast('danger', "핸드폰 번호를 입력해주세요");
                this.$refs.tax_invoice.$refs.oex_num_tel.focus();
                return false;
            }
        }
    }

    if (isEmpty(frm.od_orderer)) {
        Notify.toast('danger', "주문자 이름을 입력하세요.");
        this.$refs.od_orderer.focus();
        return false;
    }
    if (isEmpty(frm.od_orderer_hp)) {
        Notify.toast('danger', "주문자 전화번호를 입력하세요.");
        this.$refs.od_orderer_hp.focus();
        return false;
    }
    if (isEmpty(frm.od_orderer_email)) {
        Notify.toast('danger', "주문자 이메일을 입력하세요.");
        this.$refs.od_orderer_email.focus();
        return false;
    }
    if (isEmpty(frm.od_receiver)) {
        Notify.toast('danger', "받는 사람 이름을 입력하세요.");
        this.$refs.od_receiver.focus();
        return false;
    }
    if (isEmpty(frm.od_receiver_hp)) {
        Notify.toast('danger', "받는 사람 번호를 입력하세요.");
        this.$refs.od_receiver_hp.focus();
        return false;
    }
    if (isEmpty(frm.od_zip)) {
        Notify.toast('danger', "배송지 우편번호를 입력하세요.");
        this.$refs.od_zip.focus();
        return false;
    }
    if (isEmpty(frm.od_addr1)) {
        Notify.toast('danger', "배송지 주소를 입력하세요.");
        this.$refs.od_addr1.focus();
        return false;
    }
    if (isEmpty(frm.od_addr2)) {
        Notify.toast('danger', "배송지 상세주소를 입력하세요.");
        this.$refs.od_addr2.focus();
        return false;
    }
    return true;

};

export { validationChecker }
