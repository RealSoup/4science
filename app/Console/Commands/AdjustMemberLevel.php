<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Shop\Order;
use DB;

//  매월 1일 05:00 - 최근 3개월 구매 금액 합으로 회원 등급 조정
//  구매 완료 브론즈 / 200만원 이상 실버 / 500만원 이상 골드, 플래티넘·딜러는 그대로
//  예전에는 서버 크론이 curl로 /admin/crontab/adjustMemberLevel 주소를 불렀음 → 스케줄러로 옮김
class AdjustMemberLevel extends Command {
    protected $signature   = 'user:adjust-level';
    protected $description = '최근 3개월 구매 금액으로 회원 등급 조정 (매월 1일)';

    public function handle() {
        //  모든 유저 레벨 초기화
        $reset = DB::update('update la_users set level = CASE WHEN level>1 THEN 2 ELSE 1 END where level > 1 and level < 5 and id > 286');
        $od = Order::select(DB::raw('SUM(od_all_price) AS total'), "created_id")
            ->where('od_type', '<>', 'buy_temp')    // 임의 주문 제외
            ->where('od_step', '>=', '20')  //  입금 완료부터
            ->where('od_step', '<=', '50')  //  배송완료까지
            ->StartDate(date('Y-m-d', strtotime(date('Y-m-d')." -3 month")))  //  지정 기간안에 주문만
            ->groupBy('created_id')
            ->orderBy('total', 'DESC')
            ->get();

        $silver = 0;
        $gold   = 0;
        foreach ($od as $v) {
            if (intval($v->created_id) == 0)   continue;
            if (intval($v->total) < 2000000)  break;

            $u = User::find($v->created_id);
            if (!$u) continue;  //  탈퇴 등으로 회원이 없으면 건너뜀
            if (intval($u->level) < 5) {    //  딜러회원은 제외
                if (intval($v->total) >= 5000000)        //  3달에 5백넘게 주문하면
                    $lv = 4;
                else if (intval($v->total) >= 2000000)   //  3달에 2백넘게 주문하면
                    $lv = 3;
                else
                    $lv = 2;

                User::where('id', $u->id)->update(['level' => $lv]);
                $lv == 4 ? $gold++ : $silver++;
            }
        }

        $this->info("회원 등급 조정 완료: 초기화 {$reset}명, 실버 {$silver}명, 골드 {$gold}명");
        \Log::channel('member-level')->info("user:adjust-level - 초기화 {$reset}명, 실버 {$silver}명, 골드 {$gold}명");
    }
}
