<?php

namespace App\Auth;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Auth\Authenticatable as UserContract;

class LegacyEloquentUserProvider extends EloquentUserProvider
{
    // 예전 사이트에서 넘어온 회원은 비밀번호가 base64(sha512) 형식이라 이 형식도 맞으면 통과시킨다.
    // (예전에는 vendor 의 SessionGuard::hasValidCredentials 를 직접 고쳐서 처리했음)
    // 로그인에 성공하면 LoginController 와 라라벨 rehash_on_login 이 bcrypt 로 바꿔 저장한다.
    public function validateCredentials(UserContract $user, #[\SensitiveParameter] array $credentials)
    {
        $legacy = base64_encode(hash('sha512', (string) ($credentials['password'] ?? ''), true));
        if (hash_equals((string) $user->getAuthPassword(), $legacy))
            return true;

        return parent::validateCredentials($user, $credentials);
    }
}
