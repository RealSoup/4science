<?php
namespace App\Exports;

use App\Models\Shop\Order;
use App\Models\Shop\Goods;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithDrawings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Illuminate\Support\Arr;

class OrderTransactionExport implements FromCollection, WithStyles, WithDrawings, WithColumnWidths, WithEvents, WithColumnFormatting {
    protected $od;
    protected $odm_map = [];

    function __construct($od) { $this->od = $od; }

    public function columnWidths(): array {
        return [
            'A' => 5,
            'B' => 30,
            'C' => 15,
            'D' => 16,
            'E' => 14,
            'F' => 10,
            'G' => 14,
        ];
    }

    public function collection() {
        $data = [];
        $od = $this->od;
        $data[] = ['거   래   명   세   서'];
        $data[] = ['(공급받는자 보관용)'];
        $data[] = [''];
        $data[] = [date('Y년 m월 d일', strtotime($od['created_at']))];
        $data[] = [$od['od_company']." 귀하"];
        $data[] = ['아래와 같이 계산합니다.'];
        $data[] = [''];
        $data[] = ['No.', 'DESCRIPTION', 'Cat. No.', '모델명', '단가', '수량', '공급가액'];
        $goods_p = 0;        
        $seq = 0;
        foreach ($od['order_purchase_at'] as $opa) {
            foreach ($opa['order_model'] as $k => $odm) {
                if ($odm['odm_type'] == 'MODEL') {
                    $seq++;
                    $this->odm_map[] = 'm';
                    if ( $odm['dlvy_all_in']) {
                        //  부동소수점 오류 해결을 위한 식
                        $odm['odm_price'] += bcdiv( $od['od_dlvy_price']/$odm['odm_ea'], 1.1 );
                        $this->od['od_dlvy_price']  = 0;
                        $od['od_dlvy_price']        = 0;
                        //  다른 함수에서 참조하려면 $this->od 여기도 넣어줘야 변경된 값이 참조 된다.
                    }
                    $data[] = [$seq, $odm['odm_gm_name'], $odm['odm_gm_catno'], $odm['odm_gm_code'], $odm['odm_price'], $odm['odm_ea'], $odm['odm_price']*$odm['odm_ea'] ];
                } else {
                    $this->odm_map[] = 'o';
                    $data[] = ['', "{$odm['odm_gm_name']}: {$odm['odm_gm_spec']}", '', '', $odm['odm_price'], $odm['odm_ea'], $odm['odm_price']*$odm['odm_ea']];
                }                
                $goods_p += $odm['odm_price']*$odm['odm_ea'];
            }
        }

        $data[] = ['SUPPLY PRICE', '', '', '', $goods_p];
        $data[] = ['V. A. T.', '', '', '', surtax($goods_p)];
        if ($od['od_dlvy_price'])
            $data[] = ['SHIPPING FEES', '', '', '', $od['od_dlvy_price']];
        if ($od['od_air_price'])
            $data[] = ['항공 운임료', '', '', '', $od['od_air_price']];
        $data[] = ['TOTAL AMOUNT', '', '', '', rrp($goods_p)+$od['od_dlvy_price']+$od['od_air_price']];
        $data[] = [''];
        $data[] = ['담당자 : '.$od['mng']['name'].' '.$od['mng']['user_mng']['pos_name'].', TEL : '.$od['mng']['tel'].', FAX : '.$od['mng']['fax']];
        $data[] = ['계좌번호 : '.cache('bank')['name01'].' '.cache('bank')['num01'].', '.cache('bank')['name02'].' '.cache('bank')['num02'].' '.cache('bank')['owner']];
        return collect($data);
    }

    public function styles(Worksheet $sheet) {

        $sheet->mergeCells('A1:G1');
        $sheet->getRowDimension('1')->setRowHeight(38);
        $sheet->mergeCells('A2:G2');
        $sheet->getRowDimension('2')->setRowHeight(22);
        $sheet->mergeCells('A3:G3');
        $sheet->getRowDimension('3')->setRowHeight(5);

        $sheet->mergeCells('A4:C4')->mergeCells('D4:G4');
        $sheet->getRowDimension('4')->setRowHeight(12);
        $sheet->mergeCells('A5:C5')->mergeCells('D5:G5');
        $sheet->getRowDimension('5')->setRowHeight(14);
        $sheet->mergeCells('A6:C6')->mergeCells('D6:G6');
        $sheet->getRowDimension('6')->setRowHeight(30);
        $sheet->mergeCells('A7:G7');
        $sheet->getRowDimension('7')->setRowHeight(9);
        $sheet->getRowDimension('8')->setRowHeight(20);

        $n = 9;
        foreach ($this->odm_map as $row) {
            $sheet->getRowDimension($n)->setRowHeight(23);
            $n++;
        }


        $sheet->getRowDimension($n)->setRowHeight(23);
        $sheet->mergeCells("A{$n}:D{$n}")->mergeCells("E{$n}:G{$n}");
        $n++;

        $sheet->getRowDimension($n)->setRowHeight(23);
        $sheet->mergeCells("A{$n}:D{$n}")->mergeCells("E{$n}:G{$n}");
        $n++;

        if ($this->od['od_dlvy_price']) {
            $sheet->getRowDimension($n)->setRowHeight(23);
            $sheet->mergeCells("A{$n}:D{$n}")->mergeCells("E{$n}:G{$n}");
            $n++;
        }
        if ($this->od['od_air_price']) {
            $sheet->getRowDimension($n)->setRowHeight(23);
            $sheet->mergeCells("A{$n}:D{$n}")->mergeCells("E{$n}:G{$n}");
            $n++;
        }

        $sheet->getRowDimension($n)->setRowHeight(30);  //  TOTAL AMOUNT
        $sheet->mergeCells("A{$n}:D{$n}")->mergeCells("E{$n}:G{$n}");
        $n++;

        $sheet->getRowDimension($n)->setRowHeight(7);
        $n++;

        $sheet->getRowDimension($n)->setRowHeight(23);  //  담당자
        $sheet->mergeCells("A{$n}:G{$n}");
        $n++;

        $sheet->getRowDimension($n)->setRowHeight(23);
        $sheet->mergeCells("A{$n}:G{$n}");
        $n++;

        $sheet->getRowDimension($n)->setRowHeight(7);
        $n++;

        $sheet->getRowDimension($n)->setRowHeight(40);
        $sheet->mergeCells("A{$n}:G{$n}");

        $sheet_style = [
            'A1:G1' => [
                'font' => ['size' => 15, 'bold' => true],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                    'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                        'color' => ['argb' => 'FF50B947'],
                    ],
                    'bottom' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUMDASHED,
                        'color' => ['argb' => 'FFD5D5D5'],
                    ],
                ],
            ],
            'A2:G2' => [
                'font' => ['size' => 10],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                    'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                ],
                'borders' => [
                    'bottom' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FFD5D5D5'],
                    ],
                ],
            ],
            'A4:C4' => [
                'font' => ['bold' => true],
                'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER, ],
            ],
            'A5:C5' => [
                'font' => ['size' => 12, 'bold' => true],
                'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER, ],
            ],
            'A6:C6' => [
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                    'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                ],
            ],
            'A7:G7' => [
                'borders' => [
                    'bottom' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                        'color' => ['argb' => 'FF3A3A3A'],
                    ],
                ],
            ],
            'A8:G8' => [
                'font' => ['bold' => true],
                'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER, ],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => [
                        'argb' => 'FFF8F8F8',
                    ],
                ],
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
            ],
        ];

        $text_right = [ 'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_RIGHT ] ];
        $text_center = [ 'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ] ];

        $r = 9;
        foreach ($this->odm_map as $row) {
            $sheet_style["A{$r}:G{$r}"] = [
                'borders' => [
                    'inside' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FFECECEC'],
                    ],
                    'bottom' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUMDASHED,
                        'color' => ['argb' => 'FFD5D5D5'],
                    ],
                ],
            ];
            $sheet_style["A{$r}"] = $text_center;
            $sheet_style["C{$r}"] = $text_center;
            $sheet_style["D{$r}"] = $text_center;
            $sheet_style["E{$r}"] = $text_right;
            $sheet_style["F{$r}"] = $text_center;
            $sheet_style["G{$r}"] = $text_right;
            $r++;
        }



        $border_medium_dashed = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUMDASHED,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
            ],
        ];
        $sheet_style["A{$r}:G{$r}"] = Arr::collapse([
            ['font' => ['color' =>  ['argb' => 'FF999999'],]],
            $text_right,
            $border_medium_dashed
        ]);
        $r++;

        $sheet_style["A{$r}:G{$r}"] = Arr::collapse([
            ['font' => ['color' =>  ['argb' => 'FF999999'],]],
            $text_right,
            $border_medium_dashed
        ]);
        $r++;

        if ($this->od['od_dlvy_price']) {
            $sheet_style["A{$r}:G{$r}"] = Arr::collapse([
                ['font' => ['color' =>  ['argb' => 'FF999999'],]],
                $text_right,
                $border_medium_dashed
            ]);
            $r++;
        }
        if ($this->od['od_air_price']) {
            $sheet_style["A{$r}:G{$r}"] = Arr::collapse([
                ['font' => ['color' =>  ['argb' => 'FF999999'],]],
                $text_right,
                $border_medium_dashed
            ]);
            $r++;
        }

        $sheet_style["A{$r}:G{$r}"] = Arr::collapse([   //  TOTAL AMOUNT
            ['font' => ['size' => 11, 'bold' => true]],
            ['borders' => [
                    'bottom' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FFD5D5D5'],
                    ],
                ],
            ],
            $text_right
        ]);
        $r+=2;

        $sheet_style["A{$r}:G{$r}"] = [
            'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'FFFAFAFA',
                ],
            ],
            'borders' => [
                'top' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
            ],
        ];
        $r++;

        $sheet_style["A{$r}:G{$r}"] = [
            'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'FFFAFAFA',
                ],
            ],
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUMDASHED,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
            ],
        ];
        $r++;
        
        $sheet_style["A{$r}:G{$r}"] = [
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'FFFAFAFA',
                ],
            ],
        ];
        $r++;

        $sheet_style["A{$r}:G{$r}"] = [
            'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'FFFAFAFA',
                ],
            ],
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
            ],
        ];


        return $sheet_style;
    }
    public function drawings() {
        $drawing = new Drawing();
        $drawing->setPath(public_path('img/addr_estimate200921.gif'));
        $drawing->setHeight(80);
        $drawing->setCoordinates('D4');
        return $drawing;
    }

    public function columnFormats(): array {
        $rst = [];
        $rst["A4:C4"] = NumberFormat::FORMAT_DATE_01;
        for ($i=9; $i < count($this->odm_map)+9; $i++)
            $rst["E{$i}:G{$i}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
        
        $r = count($this->odm_map) + 9;
        $rst["E{$r}:G{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
        $r++;
        $rst["E{$r}:G{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
        if ($this->od['od_dlvy_price']) {
            $r++;
            $rst["E{$r}:G{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
        }
        if ($this->od['od_air_price']) {
            $r++;
            $rst["E{$r}:G{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
        }
        $r++;
        $rst["E{$r}:G{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;        
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
        ];

        return[
            BeforeSheet::class=>function(BeforeSheet $event) use($styleArray) {

                // $event->sheet->getDelegate()->getParent()->getDefaultStyle()->getFont()->setName('돋움');
                $event->sheet->setShowGridlines(false);
                $event->sheet->getDelegate()->getParent()->getDefaultStyle()->applyFromArray($styleArray);
            },
            AfterSheet::class    => function(AfterSheet $event) {
                $drawing2 = new Drawing();
                $drawing2->setPath(public_path('img/estimate_logo.png'));
                $drawing2->setHeight(43);
                $drawing2->setCoordinates('C'.(count($this->odm_map)+17));
                $drawing2->setOffsetX(35);
                $drawing2->setWorksheet($event->sheet->getDelegate());
            }
        ];
    }
}
