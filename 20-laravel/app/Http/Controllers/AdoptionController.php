<?php

namespace App\Http\Controllers;

use App\Models\Adoption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AdoptionsExport;

class AdoptionController extends Controller
{
    /**
     * Display all adoptions (admin view)
     */
    public function index()
    {
        $adoptions = Adoption::with(['user', 'pet'])->orderBy('created_at', 'desc')->paginate(20);
        return view('adoptions.index', compact('adoptions'));
    }

    /**
     * Display my adoptions (user's own adoptions)
     */
    public function myAdoptions()
    {
        $adoptions = Adoption::where('user_id', Auth::id())
            ->with(['pet'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);
        
        return view('adoptions.my-adoptions', compact('adoptions'));
    }

    /**
     * Search my adoptions
     */
    public function searchMyAdoptions(Request $request)
    {
        $query = $request->input('qsearch', '');
        
        $adoptions = Adoption::where('user_id', Auth::id())
            ->when($query, function($builder) use ($query) {
                $builder->whereHas('pet', function($petQuery) use ($query) {
                    $petQuery->where('name', 'like', "%{$query}%")
                            ->orWhere('breed', 'like', "%{$query}%")
                            ->orWhere('kind', 'like', "%{$query}%");
                });
            })
            ->with(['pet'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        if ($request->ajax()) {
            return view('adoptions.search-my', compact('adoptions'))->render();
        }
        
        return view('adoptions.my-adoptions', compact('adoptions'));
    }

    /**
     * Display a single adoption
     */
    public function show(Adoption $adoption)
    {
        // Asegurar que solo pueda ver sus propias adopciones
        if ($adoption->user_id !== Auth::id() && !Auth::user()->isAdmin()) {
            abort(403);
        }
        
        return view('adoptions.show', compact('adoption'));
    }

    public function pdf()
    {
        $adoptions = Adoption::with('pet', 'user')->orderBy('id', 'DESC')->get();
        $pdf = Pdf::loadView('adoptions.pdf', compact('adoptions'));
        return $pdf->download('adoptions.pdf');
    }

    public function excel()
    {
        $adoptions = Adoption::with('pet', 'user')->orderBy('id', 'DESC')->get();
        return Excel::download(new AdoptionsExport($adoptions), 'adoptions.xlsx');
    }
}



