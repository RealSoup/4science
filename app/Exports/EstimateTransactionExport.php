<?php
namespace App\Exports;

use App\Models\Shop\EstimateReply;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithDrawings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Illuminate\Support\Arr;

class EstimateTransactionExport implements FromCollection, WithStyles, WithDrawings, WithColumnWidths, WithEvents, WithColumnFormatting {
    protected $er;
    protected $gd_cnt = 0;
    protected $row_height = [];
    protected $option = [];
    protected $logo_position = 0;
    function __construct($er) { $this->er = $er; }

    public function columnWidths(): array { return [
        'A' => 5,
        'B' => 30,
        'C' => 15,
        'D' => 16,
        'E' => 14,
        'F' => 10,
        'G' => 14,
    ]; }

    public function collection() {
        $data = [];
        $data[] = ['거   래   명   세   서'];
        $data[] = ['(공급받는자 보관용)'];
        $data[] = [''];
        $data[] = [date('Y년 m월 d일', strtotime($this->er['created_at']))];
        $data[] = [$this->er['estimate_req']['eq_company']." 귀하"];
        $data[] = ['아래와 같이 계산합니다.'];
        $data[] = [''];
        $data[] = ['No.', 'DESCRIPTION', 'Cat. No.', '모델명', '단가', '수량', '공급가액'];

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
            $data[] = [$this->gd_cnt, $em['em_name'], $em['em_catno'], $em['em_code'], $em['em_price'], $em['em_ea'], $em['em_price']*$em['em_ea']];

            if($em['estimate_option']) {
                foreach ($em['estimate_option'] as $eo)
                    $data[] = ['', "{$eo['eo_tit']}: {$eo['eo_name']}", '', '', $eo['eo_price'], $eo['eo_ea'], $eo['eo_price']*$eo['eo_ea']];
                $this->option[$this->gd_cnt-1] = count($em['estimate_option']);
            }
        }
        $data[] = ['SUPPLY PRICE', '', '', '', $this->er['er_gd_price']];
        $data[] = ['V. A. T.', '', '', '', $this->er['er_surtax']];
        if ($this->er['er_no_dlvy_fee'] !== 'Y') {
            if ($this->er['er_dlvy_price'] > 0)
                $data[] = ['배송료', '', '', '', $this->er['er_dlvy_price']];
            if ($this->er['er_air_price'])
                $data[] = ['항공운임료', '', '', '', $this->er['er_air_price']];
        }
        $data[] = ['TOTAL AMOUNT', '', '', '', $this->er['er_all_price']];
        $data[] = [''];
        $data[] = ["담당자 : {$this->er['estimate_req']['mng']['name']} {$this->er['estimate_req']['mng']['user_mng']['pos_name']}, TEL : {$this->er['estimate_req']['mng']['tel']}, FAX : {$this->er['estimate_req']['mng']['fax']}"];
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

        $r = 8;
        for ($i=0; $i < $this->gd_cnt; $i++) {
            $r++;
            $sheet->getRowDimension($r)->setRowHeight(23);

            if(array_key_exists($i, $this->option)) {
                for ($j=0; $j<$this->option[$i]; $j++) {
                    $r++;
                    $sheet->getRowDimension($r)->setRowHeight(23);
                    $sheet->mergeCells("C{$r}:D{$r}");
                }
            }
        }

        $r++;
        $sheet->getRowDimension($r)->setRowHeight(23);
        $sheet->mergeCells("A{$r}:D{$r}")->mergeCells("E{$r}:G{$r}");

        $r++;
        $sheet->getRowDimension($r)->setRowHeight(23);
        $sheet->mergeCells("A{$r}:D{$r}")->mergeCells("E{$r}:G{$r}");

        if ($this->er['er_no_dlvy_fee'] !== 'Y'){
            if ($this->er['er_dlvy_price'] > 0) {
                $r++;
                $sheet->getRowDimension($r)->setRowHeight(23);
                $sheet->mergeCells("A{$r}:D{$r}")->mergeCells("E{$r}:G{$r}");
            }

            if ($this->er['er_air_price']) {
                $r++;
                $sheet->getRowDimension($r)->setRowHeight(23);
                $sheet->mergeCells("A{$r}:D{$r}")->mergeCells("E{$r}:G{$r}");
            }
        }

        $r++;
        $sheet->getRowDimension($r)->setRowHeight(30);
        $sheet->mergeCells("A{$r}:D{$r}")->mergeCells("E{$r}:G{$r}");

        $r++;
        $sheet->getRowDimension($r)->setRowHeight(7);

        $r++;
        $sheet->getRowDimension($r)->setRowHeight(23);
        $sheet->mergeCells("A{$r}:G{$r}");

        $r++;
        $sheet->getRowDimension($r)->setRowHeight(23);
        $sheet->mergeCells("A{$r}:G{$r}");

        $r++;
        $sheet->getRowDimension($r)->setRowHeight(7);

        $r++;
        $sheet->getRowDimension($r)->setRowHeight(40);
        $sheet->mergeCells("A{$r}:G{$r}");

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

        $text_right = [ 'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_RIGHT, 'wrapText' => true ] ];
        $text_center = [ 'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER, 'wrapText' => true ] ];
        $text_wrap = [ 'alignment' => [ 'wrapText' => true ] ];
        $r = 8;
        for ($i=0; $i < $this->gd_cnt; $i++) {
            $r++;
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
            $sheet_style['A'.$r] = $text_center;
            $sheet_style['B'.$r] = $text_wrap;
            $sheet_style['C'.$r] = $text_center;
            $sheet_style['D'.$r] = $text_center;
            $sheet_style['E'.$r] = $text_right;
            $sheet_style['F'.$r] = $text_center;
            $sheet_style['G'.$r] = $text_right;
            
            
            if(array_key_exists($i, $this->option)) {
                for ($j=0; $j<$this->option[$i]; $j++) {
                    $r++;
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
                    
                    $sheet_style['B'.$r] = $text_wrap;
                    $sheet_style['C'.$r] = $text_wrap;
                    $sheet_style['E'.$r] = $text_right;
                    $sheet_style['F'.$r] = $text_center;
                    $sheet_style['G'.$r] = $text_right;
                }
            }
        }
        $border_medium_dashed = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUMDASHED,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
            ],
        ];
        $r++;
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
        if ($this->er['er_no_dlvy_fee'] !== 'Y'){
            if ($this->er['er_dlvy_price'] > 0) {
                $r++;
                $sheet_style["A{$r}:G{$r}"] = Arr::collapse([
                    ['font' => ['color' =>  ['argb' => 'FF999999'],]],
                    $text_right,
                    $border_medium_dashed
                ]);
            }
            if ($this->er['er_air_price']) {
                $r++;
                $sheet_style["A{$r}:G{$r}"] = Arr::collapse([
                    ['font' => ['color' =>  ['argb' => 'FF999999'],]],
                    $text_right,
                    $border_medium_dashed
                ]);
            }
        }

        $r++;  //  TOTAL AMOUNT
        $sheet_style["A{$r}:G{$r}"] = Arr::collapse([
            ['font' => ['size' => 11, 'bold' => true]],
            ['borders' => [
                    'bottom' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FF888888'],
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
        $this->logo_position = $r;
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
        $r = 8;
        for ($i=0; $i < $this->gd_cnt; $i++) {
            $r++;
            $rst["E{$r}:G{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;

            if(array_key_exists($i, $this->option)) {
                for ($j=0; $j<$this->option[$i]; $j++) {
                    $r++;
                    $rst["E{$r}:G{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
                }
            }
        }
        
        $r++;
        $rst["E{$r}:G{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
        $r++;
        $rst["E{$r}:G{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;

        if ($this->er['er_no_dlvy_fee'] !== 'Y') {
            if ($this->er['er_dlvy_price'] > 0) {
                $r++;
                $rst["E{$r}:G{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
            }
            if ($this->er['er_air_price']) {
                $r++;
                $rst["E{$r}:G{$r}"] = NumberFormat::FORMAT_CURRENCY_COMMA;
            }
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
                $drawing2->setCoordinates('C'.($this->logo_position));
                $drawing2->setOffsetX(35);
                $drawing2->setWorksheet($event->sheet->getDelegate());
            }
        ];
    }
}
