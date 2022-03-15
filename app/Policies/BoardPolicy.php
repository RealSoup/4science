<?php

namespace App\Policies;

use App\Models\Board;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class BoardPolicy
{
    use HandlesAuthorization;

    protected $msg =  '권한이 없습니다.';

    public function viewAny(User $user)    {

    }

    public function view(User $user, Board $board) {

    }

    public function create(User $user) {
        //
    }

    public function update(User $user, Board $board) {
        return $user->id === $board->created_id ? Response::allow() : Response::deny('수정 '.$this->msg);
    }

    public function delete(User $user, Board $board) {
        return $user->id === $board->created_id ? Response::allow() : Response::deny('삭제 '.$this->msg);
    }

    public function restore(User $user, Board $board) {
        //
    }

    public function forceDelete(User $user, Board $board) {
        //
    }

    public function goodBad(User $user, Board $board) {
        return $user->id !== $board->created_id ? Response::allow() : Response::deny('자신의 글은 할 수 없습니다.');
    }


}
