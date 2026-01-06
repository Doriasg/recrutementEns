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
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\gestionnaire\DashboardgestController;
use App\Http\Controllers\gestionnaire\UsersgestController;
use App\Http\Controllers\gestionnaire\add_roleController;
use App\Http\Controllers\teacher\candidController;
use App\Http\Controllers\teacher\offretController;
use App\Http\Controllers\gestionnaire\offreController;
//public routes
Route::get('/', [homeController::class, 'index'])->name('home');
//teacher routes
Route::get('/teacher/dashboard', [ dashController::class, 'index'])->name('teacher.dashboard');
Route::get('/teacher/formulaire-candidature', [formController::class, 'index'])->name('candidater');
Route::get('/teacher/profil', [profilController::class, 'index'])->name('profil.teacher');
Route::get('/teacher/candidatures', [candidController::class, 'index'])->name('user.Candidatures');
Route::get('/teacher/offres', [offretController::class, 'index'])->name('offres.teacher');
//examinateurs
Route::get('/examinateur/dashboard', [ dashexController::class, 'index'])->name('dashboard.examinateur');
Route::get('/examinateur/evaluations', [ evalController::class, 'index'])->name('evaluations.examinateur');
//admin routes
Route::get('/admin/dashboard', [ dashadminController::class, 'index'])->name('dashboard.admin');
Route::get('/admin/offres', [ offresController::class, 'index'])->name('offres.admin');
Route::get('/admin/users', [ usersController::class, 'index'])->name('users.admin');
//gestionnaire routes
Route::get('/gestionnaire/dashboard', [ DashboardgestController::class, 'index'])->name('dashboard.gestionnaire');
Route::get('/gestionnaire/users', [UsersgestController::class, 'index'])->name('users.gestionnaire');
Route::get('/gestionnaire/users/{id}', [UsersgestController::class, 'show'])->name('show_user.gestionnaire');
Route::get('/gestionnaire/users/{id}/edit', [UsersgestController::class, 'edit'])->name('edit_user.gestionnaire');
Route::put('/gestionnaire/update/users/{id}', [UsersgestController::class, 'update'])->name('user_update.gestionnaire');
Route::get('/gestionnaire/offres', [offreController::class, 'index'])->name('offres.gestionnaire');
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
