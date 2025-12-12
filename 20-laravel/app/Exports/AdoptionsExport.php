<?php

namespace App\Exports;

use App\Models\Adoption;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class AdoptionsExport implements FromView
{
    protected $adoptions;

    public function __construct($adoptions)
    {
        $this->adoptions = $adoptions;
    }

    public function view(): View
    {
        return view('adoptions.excel', [
            'adoptions' => $this->adoptions
        ]);
    }
}

