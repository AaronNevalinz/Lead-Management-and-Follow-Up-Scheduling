<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FollowupController;
use App\Http\Controllers\LeadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::resource('leads', LeadController::class);
    Route::resource('follow-ups', FollowupController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('follow-ups/{lead_id}', [FollowupController::class, 'index'])->name('follow-ups.index');
    Route::get('follow-ups', [FollowupController::class, 'getFollowUps']);
});


