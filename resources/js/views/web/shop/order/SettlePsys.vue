<template><div></div>
</template>
<script>
import ax from '@/api/http';
export default {
    name: 'ShopOrderSettlePsys',
    async mounted() {
        const res = await ax.get(`/api/shop/order/settle_psys/${this.$route.params.od_id}`);
        if (res && res.status === 200) {
            var form = document.createElement('form');
            var objs01 = document.createElement('input');
            var objs02 = document.createElement('input');
            var objs03 = document.createElement('input');
            var objs04 = document.createElement('input');
            var objs05 = document.createElement('input');
            var objs06 = document.createElement('input');
            var objs07 = document.createElement('input');
            var objs08 = document.createElement('input');
            var objs09 = document.createElement('input');
            var objs10 = document.createElement('input');
            var objs11 = document.createElement('input');
            var objs12 = document.createElement('input');
            var objs13 = document.createElement('input');
            var objs14 = document.createElement('input');
            var objs15 = document.createElement('input');
            objs01.setAttribute('type', 'hidden'); objs01.setAttribute('name', 'Psys_buyername');            objs01.setAttribute('value', res.data.Psys_buyername); form.appendChild(objs01);
            objs02.setAttribute('type', 'hidden'); objs02.setAttribute('name', 'Psys_email');                objs02.setAttribute('value', res.data.Psys_email);     form.appendChild(objs02);
            objs03.setAttribute('type', 'hidden'); objs03.setAttribute('name', 'Psys_handphone');            objs03.setAttribute('value', res.data.Psys_handphone); form.appendChild(objs03);
            objs04.setAttribute('type', 'hidden'); objs04.setAttribute('name', 'Psys_recp_nm');              objs04.setAttribute('value', res.data.Psys_recp_nm);   form.appendChild(objs04);
            objs05.setAttribute('type', 'hidden'); objs05.setAttribute('name', 'Psys_recp_addr');            objs05.setAttribute('value', res.data.Psys_recp_addr); form.appendChild(objs05);
            objs06.setAttribute('type', 'hidden'); objs06.setAttribute('name', 'Psys_pmember_id');           objs06.setAttribute('value', res.data.Psys_pmember_id);form.appendChild(objs06);
            objs07.setAttribute('type', 'hidden'); objs07.setAttribute('name', 'Psys_card_type');            objs07.setAttribute('value', '');                      form.appendChild(objs07);
            objs08.setAttribute('type', 'hidden'); objs08.setAttribute('name', 'Psys_securekey');            objs08.setAttribute('value', res.data.Psys_securekey); form.appendChild(objs08);
            objs09.setAttribute('type', 'hidden'); objs09.setAttribute('name', 'Psys_shopingmall_order_no'); objs09.setAttribute('value', res.data.Psys_shopingmall_order_no); form.appendChild(objs09);
            objs10.setAttribute('type', 'hidden'); objs10.setAttribute('name', 'Psys_title');                objs10.setAttribute('value', "4SCIENCE - PSYS 결제");  form.appendChild(objs10);
            objs11.setAttribute('type', 'hidden'); objs11.setAttribute('name', 'Psys_totalamt');             objs11.setAttribute('value', res.data.Psys_totalamt);  form.appendChild(objs11);
            objs12.setAttribute('type', 'hidden'); objs12.setAttribute('name', 'ReturnURL');                 objs12.setAttribute('value', res.data.ReturnURL);      form.appendChild(objs12);
            objs13.setAttribute('type', 'hidden'); objs13.setAttribute('name', 'Psys_shopid');               objs13.setAttribute('value', res.data.api_id);         form.appendChild(objs13);
            objs14.setAttribute('type', 'hidden'); objs14.setAttribute('name', 'edi_date');                  objs14.setAttribute('value', res.data.edi_date);       form.appendChild(objs14);
            objs15.setAttribute('type', 'hidden'); objs15.setAttribute('name', 'Psys_etc_data1');            objs15.setAttribute('value', res.data.Psys_buyername); form.appendChild(objs15);
            
            form.setAttribute('method', 'post');
            form.setAttribute('action', "https://sandbox.psys.co.kr/outvendnew/vendor/input");
            document.body.appendChild(form);
            form.submit();
        }
    },
};
</script>