<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
use App\Http\Controllers\homeController;
use App\Http\Controllers\teacher\dashController;
use App\Http\Controllers\teacher\formController;
use App\Http\Controllers\teacher\profilController;
use App\Http\Controllers\examinateur\dashexController;
use App\Http\Controllers\examinateur\evalController;
use App\Http\Controllers\admin\dashadminController;
use App\Http\Controllers\admin\offresController;
use App\Http\Controllers\admin\usersController;
//public routes
Route::get('/', [homeController::class, 'index'])->name('home');
//teacher routes
Route::get('/teacher/dashboard', [ dashController::class, 'index'])->name('teacher.dashboard');
Route::get('/teacher/formulaire-candidature', [formController::class, 'index'])->name('candidater');
Route::get('/teacher/profil', [profilController::class, 'index'])->name('profil');
//examinateurs
Route::get('/examinateur/dashboard', [ dashexController::class, 'index'])->name('dashboard.examinateur');
Route::get('/examinateur/evaluations', [ evalController::class, 'index'])->name('evaluations.examinateur');
//admin routes
Route::get('/admin/dashboard', [ dashadminController::class, 'index'])->name('dashboard.admin');
Route::get('/admin/offres', [ offresController::class, 'index'])->name('offres.admin');
Route::get('/admin/users', [ usersController::class, 'index'])->name('users.admin');


Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
