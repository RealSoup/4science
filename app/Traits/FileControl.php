<?php
namespace App\Traits;

use Intervention\Image\Facades\Image as Image;
use Illuminate\Support\Str;
use File;
use Response;
use Storage;
use App\Models\{FileInfo, FileGoods};

trait FileControl {
          
    public function file_upload($file, $subFolder, $thumb) {
        $def_wid = config('const.file.def_wid');
        $def_hei = config('const.file.def_hei');
        $thumb_wid = config('const.file.thumb_wid');
        $thumb_hei = config('const.file.thumb_hei');
        $mimeArr=['png', 'jpe', 'jpeg', 'jpg', 'gif', 'bmp', 'ico', 'tiff', 'tif', 'svg', 'svgz'];
        $mime = $file->getClientOriginalExtension();

        $image_info;
        if (in_array($mime, $mimeArr)) 
            $image_info = getimagesize($file);
        
        $this->mkDir($subFolder);
        if (isset($image_info)) {
            $img;
            if($image_info[0]>$def_wid||$image_info[1]>$def_hei) 
                $img = (string)Image::make($file)->resize($def_wid, null, function ($constraint) {$constraint->aspectRatio();})->encode($mime);                
            else
                $img = file_get_contents($file);
            
            Storage::disk('public')->put($subFolder.$file->hashName(), $img);
            
            if ($thumb) {
                $this->mkDir($subFolder.'thumb/');
                $img = (string)Image::make($file)->resize($thumb_wid, null, function ($constraint) {$constraint->aspectRatio();})->encode($mime);
                Storage::disk('public')->put($subFolder.'thumb/'.$file->hashName(), $img);
            }
        } else {
            $file->storeAs("public/".$subFolder, $file->hashName());
        }
        // $file->storeAs($subFolder, $file->hashName());
    }
    
    public function deleteFiles($fi_id, $type=null, $fi=null) {
        if (!$fi) {
            switch ($type) {
                case 'goods':   $fi = FileGoods::findOrFail($fi_id);    break;
                default:        $fi = FileInfo::findOrFail($fi_id);     break;
            }
        }
        
        $path = "api_{$fi->fi_group}/{$fi->fi_room}/{$fi->fi_kind}";
        if(Storage::disk('public')->exists("{$path}/{$fi->fi_new}"))        Storage::disk('public')->delete("{$path}/{$fi->fi_new}");
        if(Storage::disk('public')->exists("{$path}/thumb/{$fi->fi_new}"))  Storage::disk('public')->delete("{$path}/thumb/{$fi->fi_new}");
        if ($fi->delete()) return response()->json("success", 200);
    }

    public function mkDir($path) {
        if(!File::isDirectory($path)) File::makeDirectory($path, 0777, true);
    }

    // public function imageResizeSave($file, $filePath, $width, $height) {
    //     try {
    //         Image::make($file)->resize($width, $height, function ($constraint) {
    //               $constraint->aspectRatio();
    //         })->save($filePath.'/'.$file->hashName());
    //     } catch (Exception $e) {
    //         report($e);
    //         return false;
    //     }
    // }

    // public function getImage($folderNm, $filename) {
    //     $path = public_path('storage/'.$folderNm.$filename);
    //     if (!File::exists($path))
    //         abort(500, '잘못된 이미지 경로');

    //     $file = File::get($path);
    //     $type = File::mimeType($path);
    //     $response = Response::make($file, 200);
    //     $response->header("Content-Type", $type);
    //     return $response;
    // }

    // 글 보기 중 첨부파일 다운로드
    // public function download(Request $request, $boardName, $writeId, $fileNo) {
    //     $file = $this->boardFileModel->where([
    //         'board_id' => $this->writeModel->board->id,
    //         'write_id' => $writeId,
    //         'board_file_no' => $fileNo,
    //     ])->first();



    //     return response()->download(public_path('storage/'. $request->boardName. '/'. $file->file), $file->source);
    // }



}
