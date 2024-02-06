<?php
namespace App\Exports;

use App\Models\Shop\Order;
use App\Models\Shop\Goods;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Illuminate\Support\Arr;

class OrderShippingListExport implements FromCollection, WithStyles, WithColumnWidths, WithEvents {
    protected $od;
    protected $odm_map = [];
    protected $logo_position = 0;

    function __construct($od) { $this->od = $od; }

    public function columnWidths(): array {
        return [
            'A' => 5,
            'B' => 29,
            'C' => 15,
            'D' => 21,
            'E' => 14,
            'F' => 20,
        ];
    }

    public function collection() {
        $data = [];
        $od = $this->od;
        $data[] = ['물 품 출 고 내 역 서'];
        $data[] = [''];
        $data[] = ['', "제품출고 일자 : ".date('Y년 m월 d일'), '', "4science 출고 담당자 : ".$od['mng']['name']];
        $data[] = ['', "주문 번호 : ".$od['od_no']];
        $data[] = [''];
        $data[] = ['No.', 'DESCRIPTION', 'Cat. No.', '모델명', '수량', '비고'];      
        $seq = 0;
        foreach ($od['order_purchase_at'] as $opa) {
            foreach ($opa['order_model'] as $k => $odm) {
                if ($odm['odm_type'] == 'MODEL') {
                    if($odm['dlvy_chk'] == 'N') continue;
                    $seq++;
                    $this->odm_map[] = 'm';
                    $data[] = [$seq, $odm['odm_gm_name'], $odm['odm_gm_catno'], $odm['odm_gm_code'], $odm['odm_ea']];
                } else {
                    if($opa['order_model'][$k-1]['dlvy_chk'] == 'N') continue;
                    $this->odm_map[] = 'o';
                    $data[] = ['', "{$odm['odm_gm_name']}: {$odm['odm_gm_spec']}", '', '', $odm['odm_ea']];
                }
            }
        }
        $data[] = [''];
        $data[] = ['TEL : 1644 - 4214'];
        return collect($data);
    }

    public function styles(Worksheet $sheet) {
        $sheet->mergeCells('A1:F1');
        $sheet->getRowDimension('1')->setRowHeight(38);
        $sheet->mergeCells('A2:F2');
        $sheet->getRowDimension('2')->setRowHeight(5);

        $sheet->mergeCells('B3:C3')->mergeCells('D3:F3');
        $sheet->getRowDimension('3')->setRowHeight(12);
        $sheet->mergeCells('B4:F4');
        $sheet->getRowDimension('4')->setRowHeight(12);

        $sheet->mergeCells('A5:F5');
        $sheet->getRowDimension('5')->setRowHeight(5);

        $sheet->getRowDimension('6')->setRowHeight(20);

        $n = 7;
        foreach ($this->odm_map as $row) {
            $sheet->getRowDimension($n)->setRowHeight(23);
            $n++;
        }


        $sheet->getRowDimension($n)->setRowHeight(5);
        $n++;

        $sheet->getRowDimension($n)->setRowHeight(22);
        $sheet->mergeCells("A{$n}:F{$n}");
        $n++;

        $sheet->getRowDimension($n)->setRowHeight(40);  //  LOGO
        $sheet->mergeCells("A{$n}:F{$n}");


        $sheet_style = [
            'A1:F1' => [
                'font' => ['size' => 15, 'bold' => true],
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

            'B3:F4' => [ 'font' => ['bold' => true], ],

            'A6:F6' => [
                'font' => ['bold' => true],
                'alignment' => [ 'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER, ],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => [
                        'argb' => 'FFF8F8F8',
                    ],
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                        'color' => ['argb' => 'FF3A3A3A'],
                    ],
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

        $r = 7;
        foreach ($this->odm_map as $row) {
            $sheet_style["A{$r}:F{$r}"] = [
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
            $sheet_style["E{$r}"] = $text_center;
            $r++;
        }
        $r++;

        $sheet_style["A{$r}:F{$r}"] = [ //  TEL
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
       
        $this->logo_position = $r;
        $sheet_style["A{$r}:F{$r}"] = [
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
