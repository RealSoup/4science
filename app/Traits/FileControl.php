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
        $mime = strtolower($file->getClientOriginalExtension());

        //  보안: 업로드 파일 형식 검사 (2026-10 업로드 기능으로 웹셸(.php)이 올라온 사고 대응)
        //  - 원래 파일 이름의 확장자는 허용 목록에 있어야 함
        //  - 실제 내용으로 추정한 확장자(저장 파일명에 붙음)가 실행 가능한 형식이면 거부
        $allowExt = array_merge($mimeArr, ['pdf', 'hwp', 'hwpx', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'ppt', 'pptx', 'txt', 'zip', 'webp']);
        $denyExt  = ['php', 'php3', 'php4', 'php5', 'php7', 'php8', 'phtml', 'phar', 'pht', 'phps', 'inc', 'html', 'htm', 'xhtml', 'js', 'cgi', 'pl', 'py', 'sh', 'exe'];
        $guessExt = strtolower((string)$file->guessExtension());
        if (!in_array($mime, $allowExt) || in_array($guessExt, $denyExt)) {
            abort(500, '업로드할 수 없는 파일 형식입니다.');
        }

        
        $image_info;
        if (in_array($mime, $mimeArr)) 
            $image_info = getimagesize($file);
        
        $this->mkDir("storage/".$subFolder);
        if (isset($image_info)) {
            $img;
            if($image_info[0]>$def_wid||$image_info[1]>$def_hei) 
                $img = (string)Image::make($file)->resize($def_wid, null, function ($constraint) {$constraint->aspectRatio();})->encode($mime);                
            else
                $img = file_get_contents($file);
            
            Storage::disk('public')->put($subFolder.$file->hashName(), $img);
            
            if ($thumb) {
                $this->mkDir("storage/".$subFolder.'thumb/');
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
