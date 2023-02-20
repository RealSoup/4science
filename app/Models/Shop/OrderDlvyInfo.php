<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class OrderDlvyInfo extends Model {
    protected $table = 'shop_order_dlvy_info';
    protected $primaryKey = 'oddi_id';
    public $timestamps = false;
    protected $guarded = [];
// "dvc_no"	"mcp_no"	"dvc_nm"	"dvc_trck_url"	"use_yn"	"dvc_cost"	"cmm_mod_id"	"cmm_mod_name"	"cmm_mod_date"	"cmm_reg_id"	"cmm_reg_name"	"cmm_reg_date"	"cmm_remote_ip"
// "1"	"0"	"건영택배"	"http://www.kunyoung.com/goods/goods_01.php?mulno=[송장번호]"	"Y"	"0.000"	\N	\N	"2016-09-21 16:08:06"	\N	\N	"0000-00-00 00:00:00"	""
// "5"	"0"	"우체국택배"	"http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.postal?sid1=[송장번호]"	"Y"	"0.000"	\N	\N	"2018-09-17 10:46:42"	\N	\N	"0000-00-00 00:00:00"	""
// "7"	"0"	"한진택배"	"https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillResult.do?mCode=MN038&wblnumText2=[송장번호]&schLang=KR"	"Y"	"0.000"	\N	\N	"2021-02-05 11:38:22"	\N	\N	"0000-00-00 00:00:00"	""
// "9"	"0"	"CJ대한통운"	"https://www.doortodoor.co.kr/parcel/doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no=[송장번호]"	"Y"	"0.000"	\N	\N	"2018-09-17 10:51:40"	\N	\N	"0000-00-00 00:00:00"	""
// "10"	"0"	"드림택배"	"http://www.idreamlogis.com/delivery/delivery_result.jsp?item_no=[송장번호]"	"Y"	"0.000"	\N	\N	"2018-09-17 11:22:02"	\N	\N	"0000-00-00 00:00:00"	""
// "12"	"0"	"FEDEX KOREA"	"https://www.fedex.com/apps/fedextrack/?action=track&ascend_header=1&clienttype=dotcomreg&cntry_code=kr&language=korean&tracknumbers=[송장번호]"	"Y"	"0.000"	\N	\N	"2018-09-17 11:23:11"	\N	\N	"0000-00-00 00:00:00"	""
// "14"	"0"	"롯데택배"	"https://www.lotteglogis.com/open/tracking?invno=[송장번호]"	"Y"	"0.000"	\N	\N	"2018-09-17 11:25:38"	\N	\N	"0000-00-00 00:00:00"	""
// "15"	"0"	"일양택배"	"http://www.ilyanglogis.com/functionality/card_form_waybill.asp?hawb_no=[송장번호]"	"Y"	"0.000"	\N	\N	"2018-09-17 11:26:03"	\N	\N	"0000-00-00 00:00:00"	""
// "16"	"0"	"로젠택배"	"http://d2d.ilogen.com/d2d/delivery/invoice_tracesearch_quick.jsp?slipno=[송장번호]"	"Y"	"0.000"	\N	\N	"2016-08-23 09:16:36"	\N	\N	"0000-00-00 00:00:00"	""
// "17"	"0"	"EMS"	"http://service.epost.go.kr/trace.RetrieveEmsTrace.postal?ems_gubun=E&POST_CODE=[송장번호]"	"Y"	"0.000"	\N	\N	"2016-08-23 09:16:36"	\N	\N	"0000-00-00 00:00:00"	""
// "20"	"0"	"경동택배"	"https://kdexp.com/basicNewDelivery.kd?barcode=[송장번호]"	"Y"	"0.000"	\N	\N	"2018-09-17 13:13:14"	\N	\N	"0000-00-00 00:00:00"	""
// "21"	"0"	"천일택배"	"http://www.cyber1001.co.kr/kor/taekbae/HTrace.jsp?transNo=[송장번호]"	"Y"	"0.000"	\N	\N	"2021-01-28 15:45:01"	\N	\N	"0000-00-00 00:00:00"	""
// "22"	"0"	"대신택배"	"https://www.ds3211.co.kr/freight/internalFreightSearch.ht?billno=[송장번호]"	"Y"	"0.000"	\N	\N	"2021-01-28 15:45:01"	\N	\N	"0000-00-00 00:00:00"	""

    // protected $attributes = [ 'odg_dlvy_com' => '한진택배' ];
    //protected $fillable = ['od_no', 'created_id', 'created_at', 'ip']; // 수정가능 필드 입력

    // public function getOdgDlvyComAttribute($v) { return (is_null($v)) ? '한진택배' : $v; }

    // public function goods() { return $this->hasOne(Goods::class, 'gd_id', 'odg_gd_id')->withDefault(); }
    // public function orderModel() { return $this->hasMany(OrderModel::class, "odm_odg_id", "odg_id"); }
    // public function orderOption() { return $this->hasMany(OrderOption::class, "odo_odg_id", "odg_id"); }

    //public function user() { return $this->belongsTo(User::class, 'created_id'); }
    //public function scopeToday($query) { return $query->where('created_at', '>', 'curdate()'); }
}
