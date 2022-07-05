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

class OrderEstimateExport implements FromCollection, WithStyles, WithDrawings, WithColumnWidths, WithEvents {
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $od_id;
    protected $gm_cnt = 0;

    function __construct($id) { $this->od_id = $id; }

    public function columnWidths(): array {
        return [
            'A' => 6,
            'B' => 6,
            'C' => 11,
            'D' => 11,
            'E' => 11,
            'F' => 11,
            'G' => 6,
            'H' => 6,
            'I' => 11,
            'J' => 11,
            'K' => 11,
            'L' => 11,
        ];
    }

    public function collection() {
        $data = [];
        $od = Order::find($this->od_id);
        $gd = new Goods;
        // $pa_list = $gd->getGoodsInfo($od, 'order');
        // dd($od->orderGoods);
        $data[] = ['견    적    서'];
        $data[] = [''];
        $data[] = [''];
        $data[] = [''];
        $data[] = ['구매번호', '', '', $od->od_no, '', '', '납품기일', '', '', '납기 2주이내'];
        $data[] = ['견적일자', '', '', date('Y-m-d'), '', '', '결제조건', '', '', '선결제 (대학교 및 국가연구소 제외)'];
        $data[] = ['수신', '', '', $od->od_department, '', '', '유효기간', '', '', '견적일로부터 2주 까지'];
        $data[] = [''];
        $data[] = ['견적요청인', '', '', $od->od_orderer, '', '', '견적담당자', '', '', $od->mng->name];
        $data[] = ['전화번호', '', '', $od->od_orderer_tel, '', '', '전화번호', '', '', $od->mng->tel];
        $data[] = ['휴대폰번호', '', '', $od->od_orderer_hp, '', '', '이메일주소', '', '', $od->mng->email];
        $data[] = ['이메일주소', '', '', $od->od_orderer_email, '', '', '펙스번호', '', '', $od->mng->fax];
        $data[] = ['펙스번호', '', '', $od->od_orderer_fax];
        $data[] = [''];
        $data[] = ['No.', 'DESCRIPTION', '', '', '', '', '', 'U/PRICE', '', 'Q\'TY', 'AMOUNT'];

        $goods_p = 0;
        foreach ($od->orderGoods as $key => $odg) {
            foreach ($odg->orderModel as $key => $odm) {
                $this->gm_cnt++;
                $data[] = [$this->gm_cnt, $odm->odm_gm_name, '', '', '', $odm->odm_gm_unit, '', number_format($odm->odm_price), '', $odm->odm_ea, number_format($odm->odm_price*$odm->odm_ea)];
                $data[] = ['', $odm->odm_gm_catno.' / '.$odm->odm_gm_code];
                $data[] = ['', $odm->odm_gm_spec];
                $goods_p += $odm->odm_price*$odm->odm_ea;
            }
        }
        $data[] = [''];
        $data[] = ['SUPPLY PRICE', '', '', '', '', '', '', number_format($goods_p)];
        $data[] = ['V. A. T.', '', '', '', '', '', '', surtax($goods_p, 1)];
        $data[] = ['TOTAL AMOUNT', '', '', '', '', '', '', rrp($goods_p, 1)];
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
        $data[] = [cache('bank')->name01.' '.cache('bank')->num01.' '.cache('bank')->owner];
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


        for ($i=0; $i < $this->gm_cnt; $i++) {
            $r = 16+($i*3);
            $sheet->getRowDimension($r)->setRowHeight(20);
            $sheet->mergeCells('B'.$r.':E'.$r)->mergeCells('F'.$r.':G'.$r)->mergeCells('H'.$r.':I'.$r)->mergeCells('K'.$r.':L'.$r);
            $sheet->getRowDimension($r+1)->setRowHeight(20);
            $sheet->mergeCells('B'.($r+1).':L'.($r+1));
            $sheet->getRowDimension($r+2)->setRowHeight(20);
            $sheet->mergeCells('B'.($r+2).':L'.($r+2));
        }

        $sheet->getRowDimension(($this->gm_cnt*3)+17)->setRowHeight(18);
        $sheet->mergeCells('A'.(($this->gm_cnt*3)+17).':G'.(($this->gm_cnt*3)+17))->mergeCells('H'.(($this->gm_cnt*3)+17).':L'.(($this->gm_cnt*3)+17));
        $sheet->getRowDimension(($this->gm_cnt*3)+18)->setRowHeight(18);
        $sheet->mergeCells('A'.(($this->gm_cnt*3)+18).':G'.(($this->gm_cnt*3)+18))->mergeCells('H'.(($this->gm_cnt*3)+18).':L'.(($this->gm_cnt*3)+18));
        $sheet->getRowDimension(($this->gm_cnt*3)+19)->setRowHeight(18);
        $sheet->mergeCells('A'.(($this->gm_cnt*3)+19).':G'.(($this->gm_cnt*3)+19))->mergeCells('H'.(($this->gm_cnt*3)+19).':L'.(($this->gm_cnt*3)+19));

        $sheet->getRowDimension(($this->gm_cnt*3)+21)->setRowHeight(18);

        $sheet->getRowDimension(($this->gm_cnt*3)+22)->setRowHeight(18);
        $sheet->mergeCells('A'.(($this->gm_cnt*3)+22).':E'.(($this->gm_cnt*3)+22))->mergeCells('F'.(($this->gm_cnt*3)+22).':L'.(($this->gm_cnt*3)+22));
        $sheet->getRowDimension(($this->gm_cnt*3)+23)->setRowHeight(18);
        $sheet->mergeCells('A'.(($this->gm_cnt*3)+23).':E'.(($this->gm_cnt*3)+23))->mergeCells('F'.(($this->gm_cnt*3)+23).':L'.(($this->gm_cnt*3)+23));
        $sheet->getRowDimension(($this->gm_cnt*3)+24)->setRowHeight(18);
        $sheet->mergeCells('A'.(($this->gm_cnt*3)+24).':E'.(($this->gm_cnt*3)+24))->mergeCells('F'.(($this->gm_cnt*3)+24).':L'.(($this->gm_cnt*3)+24));
        $sheet->getRowDimension(($this->gm_cnt*3)+25)->setRowHeight(18);
        $sheet->mergeCells('A'.(($this->gm_cnt*3)+25).':E'.(($this->gm_cnt*3)+25))->mergeCells('F'.(($this->gm_cnt*3)+25).':L'.(($this->gm_cnt*3)+25));

        $sheet->getRowDimension(($this->gm_cnt*3)+26)->setRowHeight(18);
        $sheet->mergeCells('A'.(($this->gm_cnt*3)+26).':E'.(($this->gm_cnt*3)+28))->mergeCells('F'.(($this->gm_cnt*3)+26).':L'.(($this->gm_cnt*3)+26));
        $sheet->getRowDimension(($this->gm_cnt*3)+27)->setRowHeight(18);
        $sheet/*->mergeCells('A'.(($this->gm_cnt*3)+27).':E'.(($this->gm_cnt*3)+27))*/->mergeCells('F'.(($this->gm_cnt*3)+27).':L'.(($this->gm_cnt*3)+27));
        $sheet->getRowDimension(($this->gm_cnt*3)+28)->setRowHeight(18);
        $sheet/*->mergeCells('A'.(($this->gm_cnt*3)+28).':E'.(($this->gm_cnt*3)+28))*/->mergeCells('F'.(($this->gm_cnt*3)+28).':L'.(($this->gm_cnt*3)+28));
        $sheet->getRowDimension(($this->gm_cnt*3)+29)->setRowHeight(18);
        $sheet->mergeCells('A'.(($this->gm_cnt*3)+29).':E'.(($this->gm_cnt*3)+29))->mergeCells('F'.(($this->gm_cnt*3)+29).':L'.(($this->gm_cnt*3)+29));

        $sheet->getRowDimension(($this->gm_cnt*3)+30)->setRowHeight(8);

        $sheet->getRowDimension(($this->gm_cnt*3)+31)->setRowHeight(18);
        $sheet->mergeCells('A'.(($this->gm_cnt*3)+31).':L'.(($this->gm_cnt*3)+31));

        $sheet->getRowDimension(($this->gm_cnt*3)+32)->setRowHeight(18);
        $sheet->mergeCells('A'.(($this->gm_cnt*3)+32).':L'.(($this->gm_cnt*3)+32));

        $tit01 = [ 'font' => ['size' => 9, 'bold' => true], 'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ]];
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
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                        'color' => ['argb' => 'FFFFFFFF'],
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
            'A13:L13' => [
                'borders' => [
                    'bottom' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FF3A3A3A'],
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
        $border_medium_dashed = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUMDASHED,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
            ],
        ];
        for ($i=0; $i < $this->gm_cnt; $i++) {
            $r = 16+($i*3);
            $sheet_style['A'.$r] = [ 'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ] ];
            $sheet_style['H'.$r] = $text_right;
            $sheet_style['J'.$r] = [ 'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ] ];
            $sheet_style['K'.$r] = $text_right;

            $sheet_style['A'.$r.':L'.$r] = $border_medium_dashed;
            $sheet_style['A'.($r+1).':L'.($r+1)] = $border_medium_dashed;
            $sheet_style['A'.($r+2).':L'.($r+2)] = [
                'borders' => [
                    'bottom' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                        'color' => ['argb' => 'FFD5D5D5'],
                    ],
                ],
            ];
        }


        $sheet_style['A'.(($this->gm_cnt*3)+16).':L'.(($this->gm_cnt*3)+16)] = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FF888888'],
                ],
            ],
        ];

        $sheet_style['A'.(($this->gm_cnt*3)+17)] = Arr::collapse([['font' => ['size' => 17, 'bold' => true]], $text_right]);
        $sheet_style['A'.(($this->gm_cnt*3)+17)] = $sheet_style['H'.(($this->gm_cnt*3)+17)] = $text_right;
        $sheet_style['A'.(($this->gm_cnt*3)+17).':L'.(($this->gm_cnt*3)+17)] = $border_medium_dashed;
        $sheet_style['A'.(($this->gm_cnt*3)+18)] = $sheet_style['H'.(($this->gm_cnt*3)+18)] = $text_right;
        $sheet_style['A'.(($this->gm_cnt*3)+18).':L'.(($this->gm_cnt*3)+18)] = $border_medium_dashed;

        $sheet_style['A'.(($this->gm_cnt*3)+19)] = Arr::collapse([['font' => ['bold' => true]], $text_right]);
        $sheet_style['H'.(($this->gm_cnt*3)+19)] = $text_right;
        $sheet_style['A'.(($this->gm_cnt*3)+19).':L'.(($this->gm_cnt*3)+19)] = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FF888888'],
                ],
            ],
        ];

        $sheet_style['A'.(($this->gm_cnt*3)+21).':L'.(($this->gm_cnt*3)+21)] = [
            'font' => ['bold' => true],
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                    'color' => ['argb' => 'FF3A3A3A'],
                ],
            ],
        ];

        $sheet_style['A'.(($this->gm_cnt*3)+22).':L'.(($this->gm_cnt*3)+25)] = [
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

        $sheet_style['A'.(($this->gm_cnt*3)+26).':E'.(($this->gm_cnt*3)+28)] = [
            'font' => ['bold' => true],
            'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
            'borders' => [
                'right' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
            ],
        ];

        $sheet_style['A'.(($this->gm_cnt*3)+29).':L'.(($this->gm_cnt*3)+29)] = [
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

        $sheet_style['A'.(($this->gm_cnt*3)+30).':L'.(($this->gm_cnt*3)+30)] = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => 'FF3A3A3A'],
                ],
            ],
        ];

        $sheet_style['A'.(($this->gm_cnt*3)+31).':L'.(($this->gm_cnt*3)+31)] = [
            'font' => ['size' => 12],
            'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER ],
        ];

        $sheet_style['A'.(($this->gm_cnt*3)+32).':L'.(($this->gm_cnt*3)+32)] = [
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
        $drawing->setPath(public_path('/img/common/estimate_logo.png'));
        $drawing->setHeight(42);
        $drawing->setCoordinates('C4');

        $drawing2 = new Drawing();
        // $drawing2->setName('Other image');
        // $drawing2->setDescription('This is a second image');
        $drawing2->setPath(public_path('/img/common/addr_estimate200921.gif'));
        $drawing2->setHeight(80);
        $drawing2->setCoordinates('G3');

        return [$drawing, $drawing2];
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
