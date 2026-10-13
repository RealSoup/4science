<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\{DB, Mail, Cache};
use Carbon\Carbon;
use App\Models\UserMileage;
use App\Mail\MileageExpireNotice;

class SendMileageExpireNotice extends Command {
    protected $signature   = 'mileage:expire-notice
                                {--month= : 대상 월(YYYY-MM), 비우면 이번 달}
                                {--uid= : 특정 회원번호만 발송 (테스트용)}
                                {--to= : 받는 메일주소 바꾸기 (테스트용)}
                                {--dry-run : 메일 없이 대상만 출력}';
    protected $description = '이번 달 소멸 예정 마일리지가 있는 회원에게 안내 메일 발송';

    const SLEEP_MS = 200;   // SMTP 과부하 방지 (건당 대기)

    public function handle() {
        $month = $this->option('month')
            ? Carbon::createFromFormat('Y-m-d', $this->option('month').'-01')->startOfDay()
            : now()->startOfMonth();
        $label = $month->format('Y년 m월');
        $dry   = $this->option('dry-run');
        $test  = $this->option('uid') || $this->option('to');   // 테스트 모드: 캐시·DB로그 안 남김

        // 소멸일(적립일+1년)이 대상 월 안에 있고, 아직 유효하며 잔액이 남은 적립건 → 회원별 합계
        $rows = UserMileage::Enable()
            ->where('ml_enable_m', '>', 0)
            ->whereRaw("DATE_ADD(created_at, INTERVAL 1 YEAR) BETWEEN ? AND ?", [
                $month->toDateTimeString(),
                $month->copy()->endOfMonth()->toDateTimeString(),
            ])
            ->when($this->option('uid'), fn($q, $v) => $q->where('ml_uid', $v))
            ->groupBy('ml_uid')
            ->select('ml_uid', DB::raw('SUM(ml_enable_m) as soon_m'))
            ->pluck('soon_m', 'ml_uid');

        $users = DB::table('users')
            ->whereIn('id', $rows->keys())
            // 관리자·딜러 제외 (딜러는 상품권 신청 불가) - 단, --uid로 직접 지정한 테스트는 등급 무관
            ->when(!$this->option('uid'), fn($q) => $q->where('level', '<', 20)->where('level', '<>', 12))
            ->whereNotNull('email')->where('email', '<>', '')
            ->get(['id', 'name', 'email']);

        $link = rtrim(config('app.url'), '/') . '/mypage/mileage';
        $ml   = new UserMileage;
        $sent = $skip = $fail = 0;

        foreach ($users as $u) {
            // 관리자 차감(마이너스) 등으로 가용 마일리지가 더 적으면 그만큼만
            $amount = min((int)$rows[$u->id], (int)$ml->enableMileage($u->id));
            if ($amount <= 0) { $skip++; continue; }

            $key = "mileage-expire-notice:{$month->format('Y-m')}:{$u->id}";
            if (!$test && Cache::has($key)) { $skip++; continue; }    // 이미 발송한 회원

            $to = $this->option('to') ?: trim($u->email);

            if ($dry) {
                $this->line("{$u->id}\t{$u->name}\t{$to}\t{$amount}P");
                $sent++;
                continue;
            }

            try {
                Mail::to($to)->send(new MileageExpireNotice($u->name, $label, $amount, $link));
                if (!$test) Cache::put($key, 1, now()->addDays(40));
                $sent++;
                usleep(self::SLEEP_MS * 1000);
            } catch (\Throwable $e) {
                $fail++;
                $this->error("발송 실패 uid={$u->id} : {$e->getMessage()}");
                \Log::channel('mileage-expire-notice-detail')->warning("mileage:expire-notice - 발송 실패 uid={$u->id} : {$e->getMessage()}");
            }
        }

        $msg = "mileage:expire-notice - {$label} 대상 {$users->count()}명 / 발송 {$sent} / 제외 {$skip} / 실패 {$fail}"
             . ($dry ? ' (dry-run)' : '') . ($test ? ' (테스트)' : '');
        $this->info($msg);
        if (!$dry && !$test) \Log::channel('mileage-expire-notice')->{$fail ? 'warning' : 'info'}($msg);
    }
}