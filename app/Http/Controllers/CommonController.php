<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\FileControl;
use App\Models\{FileInfo, FileGoods};
use DB;

class CommonController extends Controller {
    use FileControl;    //  trait

    public function upload(Request $req) {
        if (is_array($req->file)) {
            foreach ($req['file'] as $k => $f) {
                if (gettype($f) == 'object') {
                    $this->file_upload($f, "{$req->fi_group}/{$req->fi_room}/{$req->fi_kind}", $req->is_thumb);
                    DB::table('file_info')->insert([
                        'fi_group' => $req->fi_group,
                        'fi_key' => $req->fi_key, 
                        'fi_room' => $req->fi_room,
                        'fi_kind' => $req->fi_kind,
                        'fi_original' => $f->getClientOriginalName(),
                        'fi_new' => $f->hashName(),
                        'fi_size' => $f->getSize(),
                        'fi_ext' => $f->getClientOriginalExtension(),
                        'created_id' => auth()->user()->id,
                        'ip' => $req->ip(),
                    ]);
                }
            }
        }
        
        if ($req->filled('is_delete')) {
            foreach (json_decode($req->is_delete) as $fi_id)
                $this->deleteFiles($fi_id);
        }
        return response()->json("success", 200);
    }

    public function uploadSimple(Request $req) {
        $file = $req->file;
        if($file) {
            $this->file_upload($file, "{$req->fi_group}/{$req->fi_room}/{$req->fi_kind}", $req->is_thumb);
            return response()->json("/storage/{$req->fi_group}/{$req->fi_room}/{$req->fi_kind}/{$file->hashName()}", 200);
        }
           
    }

    public function deleteFiles($fi_id, $type=null) {
        switch ($type) {
            case 'goods':   $fi = FileGoods::findOrFail($fi_id);    break;
            default:        $fi = FileInfo::findOrFail($fi_id);     break;
        }
        $this->phyFileDel("public/{$fi->fi_group}/{$fi->fi_room}/{$fi->fi_kind}", $fi->fi_new);
        if ($fi->delete())
            return response()->json("success", 200);
    }

    // public function makeImage($id, $group, $room=NULL, $is_thumb=false) {
    //     if ($group == 'fi_id') {
    //         $fi = FileInfo::find($id);
    //     } else {
    //         $room = $group.'/'.$room;
    //         $fi = FileInfo::Fi_parent_id($id)->Fi_group($group)->Fi_room($room)->first();
    //     }
    //     $noimg_id = NULL;
    //     if (!isset($fi)) {
    //         //  상품 이미지가 없으면 no-img 이미지 리턴
    //         if ($is_thumb) $noimg_id = cache('config.common.image')->noimage_thumb;
    //         else  $noimg_id = cache('config.common.image')->noimage;
    //         $fi = FileInfo::find($noimg_id);
    //     }
    //     $path = $fi->fi_room.'/';
    //     if (!$noimg_id && $is_thumb) $path.='thumbnails/';

    //     return $this->getImage($path, $fi->fi_new);
    // }

    public function download($fi_id) {
        $fi = FileInfo::findOrFail($fi_id);
        $fi->increment('down');
        // return response()->download(storage_path('app/public/'. $fi->fi_path. '/'. $fi->fi_new), $fi->fi_original);
        return response()->json(['path'=>storage_path('app/public/'. $fi->fi_room. '/'. $fi->fi_new), 'name'=>$fi->fi_original], 200);
    }
}
