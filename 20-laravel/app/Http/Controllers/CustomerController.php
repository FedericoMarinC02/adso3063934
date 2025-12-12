<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Pet;
use App\Models\Adoption;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class CustomerController extends Controller
{
    //My profile
    public function myprofile()
    {
        $user = user::find(Auth::user()->id);
        return view('customer.myprofile')->with('user', $user);
    }

    //Update my profile
    public function updatemyprofile(Request $request)
    {
        $validation = $request->validate([
            'document' => ['required', 'numeric', 'unique:' . User::class . ',document,' . $request->id],
            'fullname' => ['required', 'string'],
            'gender' => ['required'],
            'birthdate' => ['required', 'date'],
            // 'photo'     => ['required', 'image'],
            'phone' => ['required'],
            'email' => ['required', 'lowercase', 'email', 'unique:' . User::class . ',email,' . $request->id],

        ]);

        if ($validation) {
            if ($request->hasFile('photo')) {
                $photo = time() . '.' . $request->photo->extension();
                $request->photo->move(public_path('images'), $photo);
                if ($request->originphoto != 'no-photo.png') {
                    unlink(public_path('images/') . $request->originphoto);
                }
            } else {
                $photo = $request->originphoto;
            }
        }

        $user = user::find($request->id);
        $user->document = $request->document;
        $user->fullname = $request->fullname;
        $user->gender = $request->gender;
        $user->birthdate = $request->birthdate;
        // $user->photo     = $photo;
        $user->phone = $request->phone;
        $user->email = $request->email;

        if ($user->save()) {
            return redirect('dashboard')->with('message', ' My profile was successfully edited!');
        }
    }
    //My adoptions
    public function myadoptions()
    {
        $adoptions = Adoption::where('user_id', Auth::user()->id)->get();
        return view('customer.myadoptions')->with('adoptions', $adoptions);
    }

    public function showadoption(Request $request)
    {
        $adoptions = Adoption::find($request->id);
        return view('customer.showadoption')->with('adoption', $adoptions);
    }

    //Make adoption
    public function listpets()
    {
        $pets = Pet::where('status', 0)->orderBy('id', 'DESC')->paginate(20);
        return view('customer.makeadoption')->with('pets', $pets);
    }
    public function confirmadoption(Request $request)
    {
    }
    public function makeadoption(Request $request)
    {

    }
    public function search(Request $request)
    {
    $pets = Pet::kinds($request->q)->orderBy('id', 'DESC')->paginate(20);
    return view('customer.searc')->with('pets', $pets);
    }

    // // Customer
    // Route::get('myprofile/', [UserController::class, 'myprofile']);
    // Route::get('myprofile/{id}', [UserController::class, 'updatemyprofile']);

    // Route::get('myadoptions/', [UserController::class, 'myadoptions']);
    // Route::get('myadoptions/{id}', [UserController::class, 'showadoption']);

    // Route::get('makeadoption/', [UserController::class, 'listpets']);
    // Route::get('makeadoption/{id}', [UserController::class, 'confirmadoption']);
    // Route::post('makeadoption/{id}', [UserController::class, 'makeadoption']);
    // Route::post('search/makeadoption', [UserController::class, 'search']);
}