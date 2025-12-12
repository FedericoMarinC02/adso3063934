<?php

namespace App\Exports;

use App\Models\Pet;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class PetsExport implements FromView, WithColumnWidths, WithStyles
{
    
    public function view(): View
    {
        return view('pets.excel', [
            'pets' => Pet::all()
        ]);
    }

    public function columnWidths(): array
    {
        return [
            'A' => 5,   // ID
            'B' => 20,  // Name
            'C' => 12,  // Kind
            'D' => 20,  // Breed
            'E' => 8,   // Age
            'F' => 10,  // Weight
            'G' => 25,  // Location
            'H' => 35,  // Description
            'I' => 12,  // Active
            'J' => 12,  // Status
            'K' => 15,  // Image
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true, 'size' => 14]],
        ];
    }
}

?>
