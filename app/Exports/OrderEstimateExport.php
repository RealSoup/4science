<?php

namespace App\Exports;

use App\Models\Shop\Order;
use App\Models\Shop\Goods;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithDrawings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Illuminate\Support\Arr;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;

class OrderEstimateExport implements FromCollection, WithStyles, WithDrawings, WithColumnWidths, WithEvents, WithColumnFormatting {
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $od;
    protected $odm_map = [];

    function __construct($od) { $this->od = $od; }

    public function columnWidths(): array {
        return [
            'A' => 5,
            'B' => 5,
            'C' => 11,
            'D' => 11,
            'E' => 11,
            'F' => 11,
            'G' => 5,
            'H' => 5,
            'I' => 11,
            'J' => 11,
            'K' => 11,
            'L' => 11,
        ];
    }

    public function collection() {
        $od = $this->od;
        $data = [];
        $data[] = ['견    적    서'];
        $data[] = [''];
        $data[] = [''];
        $data[] = [''];
        $data[] = ['구매번호', '', '', $od['od_no'], '', '', '납품기일', '', '', '납기 4주이내'];
        $data[] = ['견적일자', '', '', date('Y년 m월 d일', strtotime($od['created_at'])), '', '', '결제조건', '', '', '선결제 (대학교 및 국가연구소 제외)'];
        $data[] = ['수신', '', '', $od['od_company'], '', '', '유효기간', '', '', '견적일로부터 2주 까지'];
        $data[] = [''];
        $data[] = ['견적요청인', '', '', $od['od_orderer'], '', '', '견적담당자', '', '', $od['mng']['name']];
        $data[] = ['전화번호', '', '', ($od['od_orderer_tel']??''), '', '', '전화번호', '', '', $od['mng']['tel']];
        $data[] = ['휴대폰번호', '', '', $od['od_orderer_hp'], '', '', '이메일주소', '', '', $od['mng']['email']];
        $data[] = ['이메일주소', '', '', $od['od_orderer_email'], '', '', '펙스번호', '', '', $od['mng']['fax']];
        $data[] = ['펙스번호', '', '', ($od['od_orderer_fax']??'')];
        $data[] = [''];
        $data[] = ['No.', 'DESCRIPTION', '', '', '', '', '', 'U/PRICE', '', 'Q\'TY', 'AMOUNT'];

        $goods_p = 0;
        $seq = 0;
        foreach ($od['order_purchase_at'] as $opa) {
            foreach ($opa['order_model'] as $k => $odm) {
                $type='m';
                if ($odm['odm_type'] == 'MODEL') {
                    $seq++;
                    $type = 'm';
                    if ( $odm['dlvy_all_in'] ) {
                        //  부동소수점 오류 해결을 위한 식
                        $odm['odm_price'] += bcdiv($od['od_dlvy_price']/$odm['odm_ea'], 1.1);
                        $this->od['od_dlvy_price']  = 0;
                        $od['od_dlvy_price']        = 0;
                        //  다른 함수에서 참조하려면 $this->od 여기도 넣어줘야 변경된 값이 참조 된다.
                    }
                    $data[] = [$seq, $odm['odm_gm_name'], '', '', '', $odm['odm_gm_unit'], '', $odm['odm_price']-$odm['odm_price_coupon_dc'], '', $odm['odm_ea'], ($odm['odm_price']-$odm['odm_price_coupon_dc'])*$odm['odm_ea'] ];
                    $data[] = ['', $odm['odm_gm_catno'].' / '.$odm['odm_gm_code']];
                    $data[] = ['', $odm['odm_gm_spec']];
                } else {
                    $type = 'o';
                    $data[] = ['', "{$odm['odm_gm_name']}: {$odm['odm_gm_spec']}", '', '', '', '', '', $odm['odm_price']-$odm['odm_price_coupon_dc'], '', $odm['odm_ea'], ($odm['odm_price']-$odm['odm_price_coupon_dc'])*$odm['odm_ea']];
                }
                
                $goods_p += ($odm['odm_price']-$odm['odm_price_coupon_dc'])*$odm['odm_ea'];

                $this->odm_map[] = [
                    'type' => $type,
                    'line_cnt' => substr_count( $odm['odm_gm_spec'], "\n" )
                ];
            }
        }
        $data[] = [''];
        $data[] = ['SUPPLY PRICE', '', '', '', '', '', '', $goods_p];
        $data[] = ['V. A. T.', '', '', '', '', '', '', surtax($goods_p)];
        if ($od['od_dlvy_price'])
            $data[] = ['SHIPPING FEES', '', '', '', '', '', '', $od['od_dlvy_price']];
        if ($od['od_air_price'])
            $data[] = ['항공 운임료', '', '', '', '', '', '', $od['od_air_price']];
        $data[] = ['TOTAL AMOUNT', '', '', '', '', '', '', rrp($goods_p)+$od['od_dlvy_price']+$od['od_air_price']];
        $data[] = [''];
        $data[] = ['▶ 주문요청 (주문시 사업자등록증을 팩스로 보내주세요.)'];
        $data[] = ['발주일'];
        $data[] = ['수령인성명'];
        $data[] = ['전화번호'];
        $data[] = ['핸드폰번호'];
        $data[] = ['배송지 주소'];
        $data[] = [''];
        $data[] = [''];
        $data[] = ['결제방식'];
        $data[] = [''];
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
        $sheet->getRowDimension('13')->setRowHeight(21);
        $sheet->mergeCells('A9:C9')->mergeCells('D9:F9')->mergeCells('G9:I9')->mergeCells('J9:L9');
        $sheet->mergeCells('A10:C10')->mergeCells('D10:F10')->mergeCells('G10:I10')->mergeCells('J10:L10');
        $sheet->mergeCells('A11:C11')->mergeCells('D11:F11')->mergeCells('G11:I11')->mergeCells('J11:L11');
        $sheet->mergeCells('A12:C12')->mergeCells('D12:F12')->mergeCells('G12:I12')->mergeCells('J12:L12');
        $sheet->mergeCells('A13:C13')->mergeCells('D13:F13')->mergeCells('G13:I13')->mergeCells('J13:L13');

        $sheet->getRowDimension('14')->setRowHeight(8);

        $sheet->getRowDimension('15')->setRowHeight(18);
        $sheet->mergeCells('B15:E15')->mergeCells('F15:G15')->mergeCells('H15:I15')->mergeCells('K15:L15');

        $n = 16;
        foreach ($this->odm_map as $k => $row) {
            if ( $row['type'] == 'm' ) {
                $sheet->getRowDimension($n)->setRowHeight(20);
                $sheet->mergeCells("B{$n}:E{$n}")->mergeCells("F{$n}:G{$n}")->mergeCells("H{$n}:I{$n}")->mergeCells("K{$n}:L{$n}");
                $n++;
                $sheet->getRowDimension($n)->setRowHeight(20);
                $sheet->mergeCells("B{$n}:E{$n}")->mergeCells("F{$n}:G{$n}")->mergeCells("H{$n}:I{$n}")->mergeCells("K{$n}:L{$n}");
                $n++;
                $height = $this->odm_map[$k] ? ($this->odm_map[$k]['line_cnt']+1)*16 : 20;
                $sheet->getRowDimension($n)->setRowHeight($height);
                $sheet->mergeCells("B{$n}:E{$n}")->mergeCells("F{$n}:G{$n}")->mergeCells("H{$n}:I{$n}")->mergeCells("K{$n}:L{$n}");
                $n++;
            } else {
                $sheet->getRowDimension($n)->setRowHeight(20);
                $sheet->mergeCells("B{$n}:E{$n}")->mergeCells("F{$n}:G{$n}")->mergeCells("H{$n}:I{$n}")->mergeCells("K{$n}:L{$n}");
                $n++;
            }
        }
        $n++;
        $sheet->getRowDimension($n)->setRowHeight(18);
        $sheet->mergeCells("A{$n}:G{$n}")->mergeCells("H{$n}:L{$n}");
        $n++;
        $sheet->getRowDimension($n)->setRowHeight(18);
        $sheet->mergeCells("A{$n}:G{$n}")->mergeCells("H{$n}:L{$n}");
        $n++;
        if ($this->od['od_dlvy_price']) {
            $sheet->getRowDimension($n)->setRowHeight(18);
            $sheet->mergeCells("A{$n}:G{$n}")->mergeCells("H{$n}:L{$n}");
            $n++;
        }
        if ($this->od['od_air_price']) {
            $sheet->getRowDimension($n)->setRowHeight(18);
            $sheet->mergeCells("A{$n}:G{$n}")->mergeCells("H{$n}:L{$n}");
            $n++;
        }
        $sheet->getRowDimension($n)->setRowHeight(18);
        $sheet->mergeCells("A{$n}:G{$n}")->mergeCells("H{$n}:L{$n}");
        $n+=2;

        $sheet->getRowDimension($n)->setRowHeight(18);
        $n++;

        $sheet->getRowDimension($n)->setRowHeight(18);
        $sheet->mergeCells("A{$n}:E{$n}")->mergeCells("F{$n}:L{$n}");
        $n++;
        $sheet->getRowDimension($n)->setRowHeight(18);
        $sheet->mergeCells("A{$n}:E{$n}")->mergeCells("F{$n}:L{$n}");
        $n++;
        $sheet->getRowDimension($n)->setRowHeight(18);
        $sheet->mergeCells("A{$n}:E{$n}")->mergeCells("F{$n}:L{$n}");
        $n++;
        $sheet->getRowDimension($n)->setRowHeight(18);
        $sheet->mergeCells("A{$n}:E{$n}")->mergeCells("F{$n}:L{$n}");
        $n++;

        $sheet->getRowDimension($n)->setRowHeight(18);
        $sheet->mergeCells("A{$n}:E".$n+2)->mergeCells("F{$n}:L{$n}");
        $n++;
        $sheet->getRowDimension($n)->setRowHeight(18);
        $sheet/*->mergeCells("A{$n}:E{$n}")*/->mergeCells("F{$n}:L{$n}");
        $n++;
        $sheet->getRowDimension($n)->setRowHeight(18);
        $sheet/*->mergeCells("A{$n}:E{$n}")*/->mergeCells("F{$n}:L{$n}");
        $n++;
        $sheet->getRowDimension($n)->setRowHeight(18);
        $sheet->mergeCells("A{$n}:E{$n}")->mergeCells("F{$n}:L{$n}");
        $n++;

        $sheet->getRowDimension($n)->setRowHeight(8);
        $n++;

        $sheet->getRowDimension($n)->setRowHeight(18);
        $sheet->mergeCells("A{$n}:L{$n}");
        $n++;

        $sheet->getRowDimension($n)->setRowHeight(18);
        $sheet->mergeCells("A{$n}:L{$n}");

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
            'A13' => $tit01, 'G13' => $tit01,
            'A9:L13' => [
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

            'A15:L15' => [
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
        ];       

        $text_right = [ 'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_RIGHT ] ];
        $text_center = [ 'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ] ];
        $border_right = ['right' => [ 'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM, 'color' => ['argb' => 'FFE5E5E5'] ]];
        $border_top_dashed = ['top' => [ 'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUMDASHED, 'color' => ['argb' => 'FFE5E5E5'] ]];
        $border_top_thick = ['top' => [ 'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK, 'color' => ['argb' => 'FFD5D5D5'] ]];
       

        $r = 15;
        foreach ($this->odm_map as $row) {
            if ( $row['type'] == 'm' ) {
                $r++;
                if($r==16) {
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
            } else {
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
        $sheet_style["A{$r}"] = $sheet_style["H{$r}"] = $text_right;
        $sheet_style["A{$r}:L{$r}"] = $border_medium_dashed;
        $r++;
        $sheet_style["A{$r}"] = $sheet_style["H{$r}"] = $text_right;
        $sheet_style["A{$r}:L{$r}"] = $border_medium_dashed;
        $r++;
        if ($this->od['od_dlvy_price']) {
            $sheet_style["A{$r}"] = $sheet_style["H{$r}"] = $text_right;
            $sheet_style["A{$r}:L{$r}"] = $border_medium_dashed;
            $r++;
        }
        if ($this->od['od_air_price']) {
            $sheet_style["A{$r}"] = $sheet_style["H{$r}"] = $text_right;
            $sheet_style["A{$r}:L{$r}"] = $border_medium_dashed;
            $r++;
        }

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
        $r+=2;

        $sheet_style["A{$r}:L{$r}"] = [
            'font' => ['bold' => true],
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                    'color' => ['argb' => 'FF3A3A3A'],
                ],
            ],
        ];
        $r++;

        $sheet_style["A{$r}:L".$r+3] = [
            'font' => ['bold' => true],
            'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
            'borders' => [
                'inside' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
            ],
        ];
        $r+=4;

        $sheet_style["A{$r}:E".$r+2] = [
            'font' => ['bold' => true],
            'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
            'borders' => [
                'right' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
            ],
        ];
        $r+=3;

        $sheet_style["A{$r}:L{$r}"] = [
            'font' => ['bold' => true],
            'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
            'borders' => [
                'inside' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
                'top' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
            ],
        ];
        $r++;

        $sheet_style["A{$r}:L{$r}"] = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FF3A3A3A'],
                ],
            ],
        ];
        $r++;

        $sheet_style["A{$r}:L{$r}"] = [
            'font' => ['size' => 12],
            'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
        ];
        $r++;

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
        foreach ($this->odm_map as $row) {
            if($row['type'] == 'm') {
                $r++;
                $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
                $r+=2;
            } else {
                $r++;
                $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
            }
        }
        $r+=2;
        $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
        $r++;
        $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;

        if ($this->od['od_dlvy_price']) {
            $r++;
            $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
        }
        if ($this->od['od_air_price']) {
            $r++;
            $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
        }
        $r++;
        $rst["H{$r}:L{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;        
        return $rst;
    }

    public function registerEvents():array {
        $styleArray = [
            'font' => [
                'name' => '돋움',
                'size' => 8
            ],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT,
                'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
            ],
            // 'borders' => [
            //     'allBorders' => [
            //         'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
            //         'color' => ['argb' => '00FFFFFF'],
            //     ],
            // ],
            // 'fill' => [
            //     'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_GRADIENT_LINEAR,
            //     'rotation' => 90,
            //     'startColor' => [
            //         'argb' => 'FFA0A0A0',
            //     ],
            //     'endColor' => [
            //         'argb' => 'FFFFFFFF',
            //     ],
            // ],
        ];
        return[
            BeforeSheet::class=>function(BeforeSheet $event) use($styleArray) {

                // $event->sheet->getDelegate()->getParent()->getDefaultStyle()->getFont()->setName('돋움');
                $event->sheet->setShowGridlines(false);
                $event->sheet->getDelegate()->getParent()->getDefaultStyle()->applyFromArray($styleArray);
            }
        ];
    }
}
