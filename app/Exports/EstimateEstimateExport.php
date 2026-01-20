<?php
namespace App\Exports;

use App\Models\Shop\EstimateReply;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use Maatwebsite\Excel\Concerns\WithDrawings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Illuminate\Support\Arr;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;

class EstimateEstimateExport implements FromCollection, WithStyles, WithDrawings, WithColumnWidths, WithEvents, WithColumnFormatting {  
    protected $er;
    protected $gd_cnt = 0;
    protected $row_height = [];
    protected $option = [];
    function __construct($er) { $this->er = $er; }

    public function columnWidths(): array { return [
        'A' => 6,
        'B' => 6,
        'C' => 10,
        'D' => 10,
        'E' => 11,
        'F' => 10,
        'G' => 8,
        'H' => 7,
        'I' => 7,
        'J' => 8,
        'K' => 12,
        'L' => 11,
    ]; }

    public function collection() {
        $data = [];
        $data[] = ['견    적    서'];
        $data[] = [''];
        $data[] = [''];
        $data[] = [''];
        $data[] = ['견적번호', '', '', $this->er['er_id'], '', '', '납품기일', '', '', "납기 {$this->er['er_dlvy_at']} 이내"];
        $data[] = ['견적일자', '', '', date('Y-m-d', strtotime($this->er['created_at'])), '', '', '결제조건', '', '', '선결제 (대학교 및 국가연구소 제외)'];
        $data[] = ['수신', '', '', $this->er['estimate_req']['eq_company'], '', '', '유효기간', '', '', "{$this->er['er_effective_at']} 까지"];
        $data[] = [''];
        $data[] = ['견적요청인', '', '', $this->er['estimate_req']['eq_name'], '', '', '견적담당자', '', '', $this->er['estimate_req']['mng']['name']];
        $data[] = ['전화번호', '', '', $this->er['estimate_req']['eq_tel'], '', '', '전화번호', '', '', $this->er['estimate_req']['mng']['tel']];
        $data[] = ['휴대폰번호', '', '', $this->er['estimate_req']['eq_hp'], '', '', '이메일주소', '', '', $this->er['estimate_req']['mng']['email']];
        $data[] = ['이메일주소', '', '', $this->er['estimate_req']['eq_email']/*, '', '', '펙스번호', '', '', $this->er['estimate_req']['mng']['fax']*/];
        // $data[] = ['펙스번호', '', '', $this->er['estimate_req']['eq_fax']];
        $data[] = [''];
        $data[] = ['No.', 'DESCRIPTION', '', '', '', 'UNIT', '', 'U/PRICE', '', 'Q\'TY', 'AMOUNT'];

        foreach ($this->er['estimate_model'] as $em) {
            if ( $em['dlvy_all_in'] ) {
                //  부동소수점 오류 해결을 위한 식
                //  부가세를 상품갯수만큼 나눠 1.1을 곱한다.( 부가세를 빼는 식 )
                $em['em_price'] += bcdiv($this->er['er_dlvy_price']/$em['em_ea'], 1.1);
                $this->er['er_gd_price'] += bcdiv($this->er['er_dlvy_price'], 1.1);
                $this->er['er_surtax'] += $this->er['er_dlvy_price']-bcdiv($this->er['er_dlvy_price'], 1.1);
                $this->er['er_dlvy_price']  = 0;
            }
            $this->gd_cnt++;
            $data[] = [$this->gd_cnt, $em['em_name'], '', '', '', $em['em_unit'], '', $em['em_price'], '', $em['em_ea'], $em['em_price']*$em['em_ea']];
            if($em['em_dlvy_at']) $data[] = ['', "{$em['em_catno']} / {$em['em_code']}", '', '', '', "납기 : {$em['em_dlvy_at']}"];
            else                $data[] = ['', "{$em['em_catno']} / {$em['em_code']}"];
            // $data[] = ['', nl2br($em['em_spec'])];
            // 엑셀파일에서 br태그 나옴
            $data[] = ['', $em['em_spec']];
            $this->row_height[] = substr_count( $em['em_spec'], "\n" );

            if($em['estimate_option']) {
                foreach ($em['estimate_option'] as $eo)
                    $data[] = ['', "{$eo['eo_tit']}: {$eo['eo_name']}", '', '', '', '', '', $eo['eo_price'], '', $eo['eo_ea'], $eo['eo_price']*$eo['eo_ea']];
                $this->option[$this->gd_cnt-1] = count($em['estimate_option']);
            }
        }
        $data[] = [''];
        $data[] = ['SUPPLY PRICE', '', '', '', '', '', '', $this->er['er_gd_price']];
        $data[] = ['V. A. T.', '', '', '', '', '', '', $this->er['er_surtax']];
        if ($this->er['er_no_dlvy_fee'] !== 'Y') {
            if ($this->er['er_dlvy_price'] > 0) 
                $data[] = ['배송료', '', '', '', '', '', '', $this->er['er_dlvy_price']];
            if ($this->er['er_air_price'])
                $data[] = ['항공운임료', '', '', '', '', '', '', $this->er['er_air_price']];
        }
        $data[] = ['TOTAL AMOUNT', '', '', '', '', '', '', $this->er['er_all_price']];
        $data[] = [''];
        // $data[] = ['▶ 주문요청 (주문시 사업자등록증을 팩스로 보내주세요.)'];
        // $data[] = ['발주일'];
        // $data[] = ['수령인성명'];
        // $data[] = ['전화번호'];
        // $data[] = ['핸드폰번호'];
        // $data[] = ['배송지 주소'];
        // $data[] = [''];
        // $data[] = [''];
        // $data[] = ['결제방식'];
        // $data[] = [''];
        $data[] = [cache('bank')['name01'].' '.cache('bank')['num01'].' '.cache('bank')['owner']];
        $data[] = ['Your R&D Consultant www.4science.net'];

        return collect($data);
    }

    public function styles(Worksheet $sheet) {

        $sheet->mergeCells('A1:L1');
        $sheet->getRowDimension('1')->setRowHeight(38);

        $sheet->mergeCells('A2:L2');
        $sheet->getRowDimension('2')->setRowHeight(2);

        $sheet->mergeCells('A3:L3');
        $sheet->getRowDimension('3')->setRowHeight(10);

        $sheet->mergeCells('B4:F4');
        $sheet->getRowDimension('4')->setRowHeight(55);

        $sheet->getRowDimension('5')->setRowHeight(21);
        $sheet->getRowDimension('6')->setRowHeight(21);
        $sheet->getRowDimension('7')->setRowHeight(21);
        $sheet->mergeCells('A5:C5')->mergeCells('D5:F5')->mergeCells('G5:I5')->mergeCells('J5:L5');
        $sheet->mergeCells('A6:C6')->mergeCells('D6:F6')->mergeCells('G6:I6')->mergeCells('J6:L6');
        $sheet->mergeCells('A7:C7')->mergeCells('D7:F7')->mergeCells('G7:I7')->mergeCells('J7:L7');

        $sheet->getRowDimension('8')->setRowHeight(8);

        $sheet->getRowDimension('9')->setRowHeight(21);
        $sheet->getRowDimension('10')->setRowHeight(21);
        $sheet->getRowDimension('11')->setRowHeight(21);
        $sheet->getRowDimension('12')->setRowHeight(21);
        $sheet->mergeCells('A9:C9')->mergeCells('D9:F9')->mergeCells('G9:I9')->mergeCells('J9:L9');
        $sheet->mergeCells('A10:C10')->mergeCells('D10:F10')->mergeCells('G10:I10')->mergeCells('J10:L10');
        $sheet->mergeCells('A11:C11')->mergeCells('D11:F11')->mergeCells('G11:I11')->mergeCells('J11:L11');
        $sheet->mergeCells('A12:C12')->mergeCells('D12:F12')->mergeCells('G12:I12')->mergeCells('J12:L12');
        // $sheet->mergeCells('A13:C13')->mergeCells('D13:F13')->mergeCells('G13:I13')->mergeCells('J13:L13');

        $sheet->getRowDimension('13')->setRowHeight(8);

        $sheet->getRowDimension('14')->setRowHeight(18);
        $sheet->mergeCells('B14:E14')->mergeCells('F14:G14')->mergeCells('H14:I14')->mergeCells('K14:L14');

        $r = 15;
        for ($i=0; $i<$this->gd_cnt; $i++) {
            $height=20;
            $sheet->getRowDimension($r)->setRowHeight($height);
            $sheet->mergeCells("B{$r}:E{$r}")->mergeCells("F{$r}:G{$r}")->mergeCells("H{$r}:I{$r}")->mergeCells("K{$r}:L{$r}");
            $r++;
            $sheet->getRowDimension($r)->setRowHeight($height);
            $sheet->mergeCells("B{$r}:E{$r}")->mergeCells("F{$r}:G{$r}")->mergeCells("H{$r}:I{$r}")->mergeCells("K{$r}:L{$r}");
            
            $r++;
            if ($this->row_height[$i]) $height= ($this->row_height[$i]+1)*16;
            $sheet->getRowDimension($r)->setRowHeight($height);
            //  기존에는 높이를 20으로 설정해놨는데
            //  줄이 긴 내용이 짤려서
            //  줄기이 만큼 적당한 높이 곱해서 설정
            // $sheet->getRowDimension($r+2)->setRowHeight(-1);
            // $sheet->mergeCells('B'.($r+2).':L'.($r+2));
            $sheet->mergeCells("B{$r}:E{$r}")->mergeCells("F{$r}:G{$r}")->mergeCells("H{$r}:I{$r}")->mergeCells("K{$r}:L{$r}");

            if(array_key_exists($i, $this->option)) {
                for ($j=0; $j<$this->option[$i]; $j++) {
                    $r++;
                    $sheet->getRowDimension($r)->setRowHeight($height);
                    $sheet->mergeCells("B{$r}:E{$r}")->mergeCells("F{$r}:G{$r}")->mergeCells("H{$r}:I{$r}")->mergeCells("K{$r}:L{$r}");
                }
            }
            $r++;
        }

        $r++;        
        $sheet->getRowDimension($r)->setRowHeight(18);
        $sheet->mergeCells("A{$r}:G{$r}")->mergeCells("H{$r}:L{$r}");

        $r++;
        $sheet->getRowDimension($r)->setRowHeight(18);
        $sheet->mergeCells("A{$r}:G{$r}")->mergeCells("H{$r}:L{$r}");

        $r++;
        $sheet->getRowDimension($r)->setRowHeight(18);
        $sheet->mergeCells("A{$r}:G{$r}")->mergeCells("H{$r}:L{$r}");

        if ($this->er['er_no_dlvy_fee'] !== 'Y'){
            if ($this->er['er_dlvy_price'] > 0) {
                $r++;
                $sheet->getRowDimension($r)->setRowHeight(18);
                $sheet->mergeCells("A{$r}:G{$r}")->mergeCells("H{$r}:L{$r}");
            }

            if ($this->er['er_air_price']) {
                $r++;
                $sheet->getRowDimension($r)->setRowHeight(18);
                $sheet->mergeCells("A{$r}:G{$r}")->mergeCells("H{$r}:L{$r}");
            }
        }

        // $r+=2;
        // $sheet->getRowDimension($r)->setRowHeight(18);

        // $r++;
        // $sheet->getRowDimension($r)->setRowHeight(18);
        // $sheet->mergeCells("A{$r}:E{$r}")->mergeCells("F{$r}:L{$r}");

        // $r++;
        // $sheet->getRowDimension($r)->setRowHeight(18);
        // $sheet->mergeCells("A{$r}:E{$r}")->mergeCells("F{$r}:L{$r}");

        // $r++;
        // $sheet->getRowDimension($r)->setRowHeight(18);
        // $sheet->mergeCells("A{$r}:E{$r}")->mergeCells("F{$r}:L{$r}");

        // $r++;
        // $sheet->getRowDimension($r)->setRowHeight(18);
        // $sheet->mergeCells("A{$r}:E{$r}")->mergeCells("F{$r}:L{$r}");

        // $r++;  //  배송지 주소01
        // $sheet->getRowDimension($r)->setRowHeight(18);
        // $sheet->mergeCells('A'.($r).':E'.($r+2))->mergeCells("F{$r}:L{$r}");

        // $r++;  //  배송지 주소02
        // $sheet->getRowDimension($r)->setRowHeight(18);
        // $sheet/*->mergeCells('A'.($r+27).':E'.($r+27))*/->mergeCells("F{$r}:L{$r}");

        // $r++;  //  배송지 주소03
        // $sheet->getRowDimension($r)->setRowHeight(18);
        // $sheet/*->mergeCells('A'.($r+28).':E'.($r+28))*/->mergeCells("F{$r}:L{$r}");

        // $r++;  //  결제방식
        // $sheet->getRowDimension($r)->setRowHeight(18);
        // $sheet->mergeCells("A{$r}:E{$r}")->mergeCells("F{$r}:L{$r}");

        // $r++;
        // $sheet->getRowDimension($r)->setRowHeight(8);

        $r+=2;
        $sheet->getRowDimension($r)->setRowHeight(18);
        $sheet->mergeCells("A{$r}:L{$r}");

        $r++;
        $sheet->getRowDimension($r)->setRowHeight(18);
        $sheet->mergeCells("A{$r}:L{$r}");

        $tit01 = [ 
            'font' => ['size' => 9, 'bold' => true], 
            'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [ 'argb' => 'FFF7F7F7' ],
            ],
        ];
        $sheet_style = [
            'A' => [ 'width' => 5, ],
            'A1:L1' => [
                'font' => ['size' => 17, 'bold' => true],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                    'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                        'color' => ['argb' => 'FF50B947'],
                    ],
                ],
            ],
            'A2:L4' => [
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FFD5D5D5'],
                    ],
                    'bottom' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FFD5D5D5'],
                    ],
                    'inside' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                        'color' => ['argb' => 'FFFFFFFF'],
                    ],
                ],
            ],
            'A5' => $tit01, 'G5' => $tit01,
            'A6' => $tit01, 'G6' => $tit01,
            'A7' => $tit01, 'G7' => $tit01,
            'A5:L7' => [
                'borders' => [
                    'bottom' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FFD5D5D5'],
                    ],
                    'inside' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FFECECEC'],
                    ],
                ],
            ],
            'A8:L8' => [
                'borders' => [
                    'bottom' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FFD5D5D5'],
                    ],
                ],
            ],
            'A9' => $tit01, 'G9' => $tit01,
            'A10' => $tit01, 'G10' => $tit01,
            'A11' => $tit01, 'G11' => $tit01,
            'A12' => $tit01, 'G12' => $tit01,
            // 'A13' => $tit01, 'G13' => $tit01,
            'A9:L12' => [
                'borders' => [
                    'bottom' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FF3A3A3A'],
                    ],
                    'inside' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FFECECEC'],
                    ],
                ],
            ],

            'A14:L14' => [
                'font' => ['color' =>  ['argb' => 'FFFFFFFF'], 'bold' => true],
                'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => [
                        'argb' => 'FF3A3A3A',
                    ],
                ],
                'borders' => [
                    'inside' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'ffFFFFFF'],
                    ],
                ],
            ],

            // Styling a specific cell by coordinate.
            // 'C2' => [
            //     'alignment' => [
            //         'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
            //         'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
            //     ],
            // ],
            //
            // // Styling an entire column.
            // 'C'  => ['font' => ['size' => 16]],
        ];

        $text_right = [ 'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_RIGHT ] ];
        $text_center = [ 'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ] ];
        $border_right = ['right' => [ 'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM, 'color' => ['argb' => 'FFE5E5E5'] ]];
        $border_top_dashed = ['top' => [ 'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUMDASHED, 'color' => ['argb' => 'FFE5E5E5'] ]];
        $border_top_thick = ['top' => [ 'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK, 'color' => ['argb' => 'FFD5D5D5'] ]];

        $r = 15;
        for ($i=0; $i < $this->gd_cnt; $i++) {
            if($i==0) {
                $sheet_style["A{$r}"] = Arr::collapse([ [ 'borders' => $border_right ], $text_center ]);
                $sheet_style["E{$r}"] = Arr::collapse([ [ 'borders' => $border_right ] ]);
                $sheet_style["G{$r}"] = Arr::collapse([ [ 'borders' => $border_right ] ]);
                $sheet_style["H{$r}"] = Arr::collapse([ $text_right ]);
                $sheet_style["I{$r}"] = Arr::collapse([ [ 'borders' => $border_right ] ]);
                $sheet_style["J{$r}"] = Arr::collapse([ [ 'borders' => $border_right ], $text_center ]);
                $sheet_style["K{$r}"] = Arr::collapse([ $text_right ]);
            } else {
                $sheet_style["A{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_thick, $border_right ]) ], $text_center ]);
                $sheet_style["B{$r}"] = Arr::collapse([ [ 'borders' => $border_top_thick ] ]);
                $sheet_style["C{$r}"] = Arr::collapse([ [ 'borders' => $border_top_thick ] ]);
                $sheet_style["D{$r}"] = Arr::collapse([ [ 'borders' => $border_top_thick ] ]);
                $sheet_style["E{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_thick, $border_right ]) ] ]);
                $sheet_style["F{$r}"] = Arr::collapse([ [ 'borders' => $border_top_thick ] ]);
                $sheet_style["G{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_thick, $border_right ]) ] ]);
                $sheet_style["H{$r}"] = Arr::collapse([ [ 'borders' => $border_top_thick ], $text_right ]);
                $sheet_style["I{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_thick, $border_right ]) ] ]);
                $sheet_style["J{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_thick, $border_right ]) ], $text_center ]);
                $sheet_style["K{$r}"] = Arr::collapse([ [ 'borders' => $border_top_thick ], $text_right ]);
                $sheet_style["L{$r}"] = Arr::collapse([ [ 'borders' => $border_top_thick ] ]);
            }

            $r++;
            $sheet_style["A{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ], $text_center ]);
            $sheet_style["B{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ], ['alignment' => [ 'wrapText' => true ]] ]);
            $sheet_style["C{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ] ]);
            $sheet_style["D{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ] ]);
            $sheet_style["E{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ] ]);
            $sheet_style["F{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ] ]);
            $sheet_style["G{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ] ]);
            $sheet_style["H{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ], $text_right ]);
            $sheet_style["I{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ] ]);
            $sheet_style["J{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ], $text_center ]);
            $sheet_style["K{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ], $text_right ]);
            $sheet_style["L{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ] ]);

            $r++;
            $sheet_style["A{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ], $text_center ]);
            $sheet_style["B{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ], ['alignment' => [ 'wrapText' => true ]] ]);
            $sheet_style["C{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ] ]);
            $sheet_style["D{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ] ]);
            $sheet_style["E{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ] ]);
            $sheet_style["F{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ] ]);
            $sheet_style["G{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ] ]);
            $sheet_style["H{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ], $text_right ]);
            $sheet_style["I{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ] ]);
            $sheet_style["J{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ], $text_center ]);
            $sheet_style["K{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ], $text_right ]);
            $sheet_style["L{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ] ]);
            

            if(array_key_exists($i, $this->option)) {
                for ($j=0; $j<$this->option[$i]; $j++) {
                    $r++;
                    $sheet_style["A{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ], $text_center ]);
                    $sheet_style["B{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ], ['alignment' => [ 'wrapText' => true ]] ]);
                    $sheet_style["C{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ] ]);
                    $sheet_style["D{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ] ]);
                    $sheet_style["E{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ] ]);
                    $sheet_style["F{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ] ]);
                    $sheet_style["G{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ] ]);
                    $sheet_style["H{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ], $text_right ]);
                    $sheet_style["I{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ] ]);
                    $sheet_style["J{$r}"] = Arr::collapse([ [ 'borders' => Arr::collapse([$border_top_dashed, $border_right]) ], $text_center ]);
                    $sheet_style["K{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ], $text_right ]);
                    $sheet_style["L{$r}"] = Arr::collapse([ [ 'borders' => $border_top_dashed ] ]);
                }
            }
            $r++;
        }
        
        $sheet_style["A{$r}:L{$r}"] = [
            'borders' => [
                'top' => [ 
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK, 
                    'color' => ['argb' => 'FFD5D5D5'] 
                ],
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FF888888'],
                ],
            ],
        ];

        $border_medium_dashed = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUMDASHED,
                    'color' => ['argb' => 'FFE5E5E5'],
                ],
            ],
        ];
        $r++;
        $sheet_style["A{$r}"] = Arr::collapse([['font' => ['size' => 17, 'bold' => true]], $text_right]);
        $sheet_style["A{$r}"] = $sheet_style["H{$r}"] = $text_right;
        $sheet_style["A{$r}:L{$r}"] = $border_medium_dashed;

        $r++;
        $sheet_style["A{$r}"] = $sheet_style["H{$r}"] = $text_right;
        $sheet_style["A{$r}:L{$r}"] = $border_medium_dashed;

        if ($this->er['er_no_dlvy_fee'] !== 'Y'){
            if ($this->er['er_dlvy_price'] > 0) {
                $r++;
                $sheet_style["A{$r}"] = $sheet_style["H{$r}"] = $text_right;
                $sheet_style["A{$r}:L{$r}"] = $border_medium_dashed;
            }
            if ($this->er['er_air_price']) {
                $r++;
                $sheet_style["A{$r}"] = $sheet_style["H{$r}"] = $text_right;
                $sheet_style["A{$r}:L{$r}"] = $border_medium_dashed;
            }
        }

        $r++;  //  TOTAL AMOUNT
        $sheet_style["A{$r}"] = Arr::collapse([['font' => ['bold' => true]], $text_right]);
        $sheet_style["H{$r}"] = $text_right;
        $sheet_style["A{$r}:L{$r}"] = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FF888888'],
                ],
            ],
        ];

        // $r+=2; //  ▶ 주문요청 (주문
        // $sheet_style["A{$r}:L{$r}"] = [
        //     'font' => ['bold' => true],
        //     'borders' => [
        //         'bottom' => [
        //             'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
        //             'color' => ['argb' => 'FF3A3A3A'],
        //         ],
        //     ],
        // ];

        // $r++;  //  발주인, 수령인성명, 전화번호, 핸드폰번호
        // $sheet_style["A{$r}:L".($r+3)] = [
        //     'font' => ['bold' => true],
        //     'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
        //     'borders' => [
        //         'inside' => [
        //             'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
        //             'color' => ['argb' => 'FFD5D5D5'],
        //         ],
        //         'bottom' => [
        //             'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
        //             'color' => ['argb' => 'FFD5D5D5'],
        //         ],
        //     ],
        // ];

        // $r+=4; // 배송지 주소
        // $sheet_style["A{$r}:E".($r+2)] = [
        //     'font' => ['bold' => true],
        //     'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
        //     'borders' => [
        //         'right' => [
        //             'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
        //             'color' => ['argb' => 'FFD5D5D5'],
        //         ],
        //     ],
        // ];

        // $r+=3; // 결제 방식
        // $sheet_style["A{$r}:L{$r}"] = [
        //     'font' => ['bold' => true],
        //     'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
        //     'borders' => [
        //         'inside' => [
        //             'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
        //             'color' => ['argb' => 'FFD5D5D5'],
        //         ],
        //         'top' => [
        //             'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
        //             'color' => ['argb' => 'FFD5D5D5'],
        //         ],
        //         'bottom' => [
        //             'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
        //             'color' => ['argb' => 'FFD5D5D5'],
        //         ],
        //     ],
        // ];

        $r++;  //  빈칸 하단 굵은 선
        $sheet_style["A{$r}:L{$r}"] = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FF3A3A3A'],
                ],
            ],
        ];

        $r++;  //  우리은행
        $sheet_style["A{$r}:L{$r}"] = [
            'font' => ['size' => 12],
            'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
        ];

        $r++;  //  Your R&D Consultant www.4science.net
        $sheet_style["A{$r}:L{$r}"] = [
            'font' => ['color' =>  ['argb' => 'FFFFFFFF'], 'bold' => true],
            'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'FF888888',
                ],
            ],
        ];

// dd($sheet_style);
        return $sheet_style;
    }
    public function drawings() {
        $drawing = new Drawing();
        // $drawing->setName('Logo');
        // $drawing->setDescription('This is my logo');
        $drawing->setPath(public_path('img/estimate_logo.png'));
        $drawing->setHeight(42);
        $drawing->setCoordinates('C4');

        $drawing2 = new Drawing();
        // $drawing2->setName('Other image');
        // $drawing2->setDescription('This is a second image');
        $drawing2->setPath(public_path('img/addr_estimate200921.gif'));
        $drawing2->setHeight(80);
        $drawing2->setCoordinates('G3');

        return [$drawing, $drawing2];
    }

    public function columnFormats(): array {
        // FORMAT_NUMBER_COMMA 
        // 해당 기능없어서 라이브러리 조작
        // C:\WorkSpace\vsCode\4science\vendor\phpoffice\phpspreadsheet\src\PhpSpreadsheet\Style\NumberFormat.php
        $rst = [];        
        $r = 15;
        for ($i=0; $i < $this->gd_cnt; $i++) {
            $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
            $r+=3;
            
            if(array_key_exists($i, $this->option)) {
                for ($j=0; $j<$this->option[$i]; $j++) {
                    $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
                    $r++;
                }
            }
        }
        $r++;
        $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
        $r++;
        $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;

        if ($this->er['er_no_dlvy_fee'] !== 'Y') {
            if ($this->er['er_dlvy_price'] > 0) {
                $r++;
                $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
            }
            if ($this->er['er_air_price']) {
                $r++;
                $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
            }
        }
        $r++;
        $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;        
        return $rst;
    }

    public function registerEvents():array {
        $styleArray = [
            'font' => [ 'name' => '돋움', 'size' => 8 ],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT,
                'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
            ],
        ];
        return[
            BeforeSheet::class=>function(BeforeSheet $event) use($styleArray) {
                $event->sheet->setShowGridlines(false);
                $event->sheet->getDelegate()->getParent()->getDefaultStyle()->applyFromArray($styleArray);
            }
        ];
    }
}