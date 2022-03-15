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

class OrderTransactionExport implements FromCollection, WithStyles, WithDrawings, WithColumnWidths, WithEvents {
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $od_id;
    protected $gm_cnt = 0;

    function __construct($id) { $this->od_id = $id; }

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
        $od = Order::find($this->od_id);
        $gd = new Goods;
        // $pa_list = $gd->getGoodsInfo($od, 'order');
        // dd($od->orderGoods);
        $data[] = ['거   래   명   세   서'];
        $data[] = ['(공급받는자 보관용)'];
        $data[] = [''];
        $data[] = [date('Y년 m월 d일')];
        $data[] = [$od->od_department." 귀하"];
        $data[] = ['아래와 같이 계산합니다.'];
        $data[] = [''];
        $data[] = ['No.', 'DESCRIPTION', 'Cat. No.', '모델명', '단가', '수량', '공급가액'];
        $goods_p = 0;
        foreach ($od->orderGoods as $key => $odg) {
            foreach ($odg->orderModel as $key => $odm) {
                $this->gm_cnt++;
                $data[] = [$this->gm_cnt, $odm->odm_gm_name, $odm->odm_gm_catno, $odm->odm_gm_code, number_format($odm->odm_price), $odm->odm_ea, number_format($odm->odm_price*$odm->odm_ea)];
                $goods_p += $odm->odm_price*$odm->odm_ea;
            }
        }
        $data[] = ['SUPPLY PRICE', '', '', '', number_format($goods_p)];
        $data[] = ['V. A. T.', '', '', '', surtax($goods_p, 1)];
        $data[] = ['TOTAL AMOUNT', '', '', '', rrp($goods_p, 1)];
        $data[] = [''];
        $data[] = ['담당자 : '.$od->mng->name.' '.$od->mng->userMng->um_position.', TEL : '.$od->mng->tel.', FAX : '.$od->mng->fax];
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

        for ($i=0; $i < $this->gm_cnt; $i++) {
            $r = 9+$i;
            $sheet->getRowDimension($r)->setRowHeight(23);
        }

        $sheet->getRowDimension($this->gm_cnt+9)->setRowHeight(23);
        $sheet->mergeCells('A'.($this->gm_cnt+9).':D'.($this->gm_cnt+9))->mergeCells('E'.($this->gm_cnt+9).':G'.($this->gm_cnt+9));
        $sheet->getRowDimension($this->gm_cnt+10)->setRowHeight(23);
        $sheet->mergeCells('A'.($this->gm_cnt+10).':D'.($this->gm_cnt+10))->mergeCells('E'.($this->gm_cnt+10).':G'.($this->gm_cnt+10));
        $sheet->getRowDimension($this->gm_cnt+11)->setRowHeight(30);
        $sheet->mergeCells('A'.($this->gm_cnt+11).':D'.($this->gm_cnt+11))->mergeCells('E'.($this->gm_cnt+11).':G'.($this->gm_cnt+11));

        $sheet->getRowDimension($this->gm_cnt+12)->setRowHeight(7);
        $sheet->getRowDimension($this->gm_cnt+13)->setRowHeight(23);
        $sheet->mergeCells('A'.($this->gm_cnt+13).':G'.($this->gm_cnt+13));
        $sheet->getRowDimension($this->gm_cnt+14)->setRowHeight(23);
        $sheet->mergeCells('A'.($this->gm_cnt+14).':G'.($this->gm_cnt+14));
        $sheet->getRowDimension($this->gm_cnt+15)->setRowHeight(7);
        $sheet->getRowDimension($this->gm_cnt+16)->setRowHeight(40);
        $sheet->mergeCells('A'.($this->gm_cnt+16).':G'.($this->gm_cnt+16));

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
        for ($i=0; $i < $this->gm_cnt; $i++) {
            $r = 9+$i;
            $sheet_style['A'.$r.':G'.$r] = [
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
            $sheet_style['C'.$r] = $text_center;
            $sheet_style['D'.$r] = $text_center;
            $sheet_style['E'.$r] = $text_right;
            $sheet_style['F'.$r] = $text_center;
            $sheet_style['G'.$r] = $text_right;
        }
        $border_medium_dashed = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUMDASHED,
                    'color' => ['argb' => 'FFD5D5D5'],
                ],
            ],
        ];
        $sheet_style['A'.($this->gm_cnt+9).':G'.($this->gm_cnt+9)] = Arr::collapse([
            ['font' => ['color' =>  ['argb' => 'FF999999'],]],
            $text_right,
            $border_medium_dashed
        ]);
        $sheet_style['A'.($this->gm_cnt+10).':G'.($this->gm_cnt+10)] = Arr::collapse([
            ['font' => ['color' =>  ['argb' => 'FF999999'],]],
            $text_right,
            $border_medium_dashed
        ]);
        $sheet_style['A'.($this->gm_cnt+11).':G'.($this->gm_cnt+11)] = Arr::collapse([
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

        $sheet_style['A'.($this->gm_cnt+13).':G'.($this->gm_cnt+13)] = [
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
        $sheet_style['A'.($this->gm_cnt+14).':G'.($this->gm_cnt+14)] = [
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
        $sheet_style['A'.($this->gm_cnt+15).':G'.($this->gm_cnt+15)] = [
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'FFFAFAFA',
                ],
            ],
        ];
        $sheet_style['A'.($this->gm_cnt+16).':G'.($this->gm_cnt+16)] = [
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
        $drawing->setPath(public_path('/img/common/addr_estimate200921.gif'));
        $drawing->setHeight(80);
        $drawing->setCoordinates('D4');
        return $drawing;
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
                $drawing2->setPath(public_path('/img/common/estimate_logo.png'));
                $drawing2->setHeight(43);
                $drawing2->setCoordinates('C'.($this->gm_cnt+16));
                $drawing2->setWorksheet($event->sheet->getDelegate());
            }
        ];
    }
}
