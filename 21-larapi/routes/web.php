<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthWebController;

Route::get('/', function () {
    return "<h1 style= 'text-align: center; margin: 24rem auto; font-family: Arial;'>
    ✅Check API Endpoints in Postman or Apidog 🚀
    </h1>";
});

// Login view (web)
Route::get('/login', function () {
    return view('auth.login');
})->name('auth.login.view');

Route::post('/login', [AuthWebController::class, 'login']);

// Logout (web) - shows a page with logout button / token
Route::get('/logout', function () {
    return view('auth.logout');
})->name('auth.logout.view');

Route::post('/logout', [AuthWebController::class, 'logout'])->name('auth.logout');
