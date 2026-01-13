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
use App\Http\Controllers\gestionnaire\roleController;
use App\Http\Controllers\dossierController;
use App\Http\Controllers\homeadminController;
//public routes
Route::get('/', [homeController::class, 'index'])->name('home');
Route::get('/accueil_dashboard', [homeadminController::class, 'index'])->name('accueil_dashboard');
//teacher routes
Route::get('/teacher/dashboard', [ dashController::class, 'index'])->name('dashboard.enseignant');


Route::get('/teacher/formulaire-candidature/{id}', [OffreController::class, 'createCandidature'])
    ->name('candidater.enseignant');

Route::post('/teacher/formulaire-candidature/{id}', [OffreController::class, 'storeCandidature'])
    ->name('store_candidature.enseignant');



Route::get('/teacher/candidatures', [candidController::class, 'index'])->name('candidatures.enseignant');
Route::get('/teacher/offres', [offretController::class, 'index'])->name('offres.teacher');
Route::get('/teacher/dossier', [ dossierController::class, 'index'])->name('dossier.enseignant');
Route::post('/candidater/{id}', [offreController::class, 'storeCandidature'])->name('store_candidature');
Route::post('/dossier/{id}', [offreController::class, 'storeDossier'])->name('store_dossier.enseignant');
//examinateurs
Route::get('/examinateur/dashboard', [ dashexController::class, 'index'])->name('dashboard.evaluateur');
Route::get('/examinateur/evaluations', [ evalController::class, 'index'])->name('evaluations.evaluateur');
Route::get('/examinateur/candidature/{id}', [ offreController::class, 'show_candidature'])->name('show_candidature.evaluateur');
Route::put('/examinateur/candidature/{id}', [ offreController::class, 'validate_candidature'])->name('update_candidature.evaluateur');
Route::put('/examinateur/candidature/reject/{id}', [ offreController::class, 'reject_candidature'])->name('reject_candidature.evaluateur');
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
Route::get('/gestionnaire/offres/create', [offreController::class, 'create'])->name('create_offre.gestionnaire');
Route::post('/gestionnaire/offres', [offreController::class, 'store'])->name('store_offre.gestionnaire');
Route::get('/gestionnaire/offres/{id}/edit', [offreController::class, 'edit'])->name('edit_offre.gestionnaire');
Route::put('/gestionnaire/offres/{id}', [offreController::class, 'update'])->name('update_offre.gestionnaire');
Route::delete('/gestionnaire/offres/{id}', [offreController::class, 'destroy'])->name('delete_offre.gestionnaire');
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard')
    ->middleware('auth');

Route::get('/gestionnaire/roles', [roleController::class, 'index'])->name('role.gestionnaire');
Route::get('/gestionnaire/roles/create', [roleController::class, 'create'])->name('create_role.gestionnaire');
Route::post('/gestionnaire/roles', [roleController::class, 'store'])->name('store_role.gestionnaire');
Route::get('/gestionnaire/roles/{id}/edit', [roleController::class, 'edit'])->name('edit_role.gestionnaire');
Route::put('/gestionnaire/roles/{id}', [roleController::class, 'update'])->name('update_role.gestionnaire');
Route::delete('/gestionnaire/roles/{id}', [roleController::class, 'destroy'])->name('delete_role.gestionnaire');
Route::get('/gestionnaire/roles/{id}', [roleController::class, 'show'])->name('show_role.gestionnaire');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
