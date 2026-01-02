<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
use App\Http\Controllers\homeController;
use App\Http\Controllers\teacher\dashController;


Route::get('/', [homeController::class, 'index'])->name('home');
Route::get('/teacher/dashboard', [dashController::class, 'index'])->name('teacher.dashboard');