<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// ====================
// ROUTES PUBLIQUES
// ====================

Route::get('/', [Controllers\PublicController::class, 'home'])->name('home');
Route::get('/offres', [Controllers\PublicController::class, 'offres'])->name('offres.index');
Route::get('/offres/{id}', [Controllers\PublicController::class, 'offreDetails'])->name('offres.details');

// ====================
// ROUTES D'AUTHENTIFICATION
// ====================

// Routes accessibles sans authentification
Route::middleware('guest')->group(function () {
    Route::get('/connexion', [Controllers\AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/connexion', [Controllers\AuthController::class, 'login']);
    
    Route::get('/inscription', [Controllers\AuthController::class, 'showRegistrationForm'])->name('register');
    Route::post('/inscription', [Controllers\AuthController::class, 'register']);
    
    Route::get('/mot-de-passe/oublie', [Controllers\AuthController::class, 'showForgotPasswordForm'])->name('password.request');
    Route::post('/mot-de-passe/email', [Controllers\AuthController::class, 'sendResetLinkEmail'])->name('password.email');
    
    Route::get('/mot-de-passe/reinitialiser/{token}', [Controllers\AuthController::class, 'showResetForm'])->name('password.reset');
    Route::post('/mot-de-passe/reinitialiser', [Controllers\AuthController::class, 'reset'])->name('password.update');
});

// Routes de déconnexion
Route::post('/deconnexion', [Controllers\AuthController::class, 'logout'])->name('logout');

// ====================
// ROUTES ENSEIGNANTS
// ====================

Route::middleware(['auth', 'role:teacher'])->prefix('enseignant')->name('teacher.')->group(function () {
    // Tableau de bord
    Route::get('/dashboard', [Controllers\TeacherController::class, 'dashboard'])->name('dashboard');
    
    // Offres
    Route::get('/offres', [Controllers\TeacherController::class, 'offres'])->name('offres');
    Route::get('/offres/{id}/postuler', [Controllers\TeacherController::class, 'showApplicationForm'])->name('application.form');
    Route::post('/offres/{id}/postuler', [Controllers\TeacherController::class, 'submitApplication'])->name('application.submit');
    
    // Candidatures
    Route::get('/candidatures', [Controllers\TeacherController::class, 'candidatures'])->name('applications');
    Route::get('/candidatures/{id}', [Controllers\TeacherController::class, 'candidatureDetails'])->name('application.details');
    
    // Profil
    Route::get('/profil', [Controllers\TeacherController::class, 'profil'])->name('profile');
    Route::put('/profil', [Controllers\TeacherController::class, 'updateProfil'])->name('profile.update');
    
    // Documents
    Route::get('/documents', [Controllers\TeacherController::class, 'documents'])->name('documents');
    Route::post('/documents', [Controllers\TeacherController::class, 'uploadDocument'])->name('documents.upload');
    Route::delete('/documents/{id}', [Controllers\TeacherController::class, 'deleteDocument'])->name('documents.delete');
    
    // Messages
    Route::get('/messages', [Controllers\TeacherController::class, 'messages'])->name('messages');
    
    // Paramètres
    Route::get('/parametres', [Controllers\TeacherController::class, 'settings'])->name('settings');
    
    // Notifications
    Route::get('/notifications', [Controllers\TeacherController::class, 'notifications'])->name('notifications');
});

// ====================
// ROUTES EXAMINATEURS
// ====================

Route::middleware(['auth', 'role:examiner'])->prefix('examinateur')->name('examiner.')->group(function () {
    // Tableau de bord
    Route::get('/dashboard', [Controllers\ExaminerController::class, 'dashboard'])->name('dashboard');
    
    // Évaluations
    Route::get('/evaluations', [Controllers\ExaminerController::class, 'evaluations'])->name('evaluations');
    Route::get('/evaluations/{id}', [Controllers\ExaminerController::class, 'evaluationDetails'])->name('evaluation.details');
    Route::put('/evaluations/{id}', [Controllers\ExaminerController::class, 'updateEvaluation'])->name('evaluation.update');
    
    // Candidats
    Route::get('/candidats', [Controllers\ExaminerController::class, 'candidates'])->name('candidates');
    Route::get('/candidats/{id}', [Controllers\ExaminerController::class, 'candidateProfile'])->name('candidate.profile');
    
    // Offres
    Route::get('/offres', [Controllers\ExaminerController::class, 'offres'])->name('offres');
    
    // Critères
    Route::get('/criteres', [Controllers\ExaminerController::class, 'criteria'])->name('criteria');
    
    // Rapports
    Route::get('/rapports', [Controllers\ExaminerController::class, 'reports'])->name('reports');
    
    // Paramètres
    Route::get('/parametres', [Controllers\ExaminerController::class, 'settings'])->name('settings');
});

// ====================
// ROUTES ADMINISTRATEURS
// ====================

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    // Tableau de bord
    Route::get('/dashboard', [Controllers\AdminController::class, 'dashboard'])->name('dashboard');
    
    // ========== GESTION DES UTILISATEURS ==========
    Route::prefix('utilisateurs')->name('users.')->group(function () {
        Route::get('/', [Controllers\Admin\UserController::class, 'index'])->name('index');
        Route::get('/create', [Controllers\Admin\UserController::class, 'create'])->name('create');
        Route::post('/', [Controllers\Admin\UserController::class, 'store'])->name('store');
        Route::get('/{id}', [Controllers\Admin\UserController::class, 'show'])->name('show');
        Route::get('/{id}/edit', [Controllers\Admin\UserController::class, 'edit'])->name('edit');
        Route::put('/{id}', [Controllers\Admin\UserController::class, 'update'])->name('update');
        Route::delete('/{id}', [Controllers\Admin\UserController::class, 'destroy'])->name('destroy');
        Route::post('/{id}/reset-password', [Controllers\Admin\UserController::class, 'resetPassword'])->name('reset-password');
    });
    
    // ========== GESTION DES OFFRES ==========
    Route::prefix('offres')->name('offers.')->group(function () {
        Route::get('/', [Controllers\Admin\OfferController::class, 'index'])->name('index');
        Route::get('/create', [Controllers\Admin\OfferController::class, 'create'])->name('create');
        Route::post('/', [Controllers\Admin\OfferController::class, 'store'])->name('store');
        Route::get('/{id}', [Controllers\Admin\OfferController::class, 'show'])->name('show');
        Route::get('/{id}/edit', [Controllers\Admin\OfferController::class, 'edit'])->name('edit');
        Route::put('/{id}', [Controllers\Admin\OfferController::class, 'update'])->name('update');
        Route::delete('/{id}', [Controllers\Admin\OfferController::class, 'destroy'])->name('destroy');
        Route::post('/{id}/duplicate', [Controllers\Admin\OfferController::class, 'duplicate'])->name('duplicate');
        Route::post('/{id}/publish', [Controllers\Admin\OfferController::class, 'publish'])->name('publish');
        Route::post('/{id}/close', [Controllers\Admin\OfferController::class, 'close'])->name('close');
        
        // Candidatures par offre
        Route::get('/{id}/candidatures', [Controllers\Admin\OfferController::class, 'applications'])->name('applications');
    });
    
    // ========== GESTION DES CANDIDATURES ==========
    Route::prefix('candidatures')->name('applications.')->group(function () {
        Route::get('/', [Controllers\Admin\ApplicationController::class, 'index'])->name('index');
        Route::get('/{id}', [Controllers\Admin\ApplicationController::class, 'show'])->name('show');
        Route::put('/{id}/status', [Controllers\Admin\ApplicationController::class, 'updateStatus'])->name('update-status');
        Route::post('/{id}/assign', [Controllers\Admin\ApplicationController::class, 'assignToExaminer'])->name('assign');
    });
    
    // ========== GESTION DES DÉPARTEMENTS ==========
    Route::prefix('departements')->name('departments.')->group(function () {
        Route::get('/', [Controllers\Admin\DepartmentController::class, 'index'])->name('index');
        Route::post('/', [Controllers\Admin\DepartmentController::class, 'store'])->name('store');
        Route::put('/{id}', [Controllers\Admin\DepartmentController::class, 'update'])->name('update');
        Route::delete('/{id}', [Controllers\Admin\DepartmentController::class, 'destroy'])->name('destroy');
    });
    
    // ========== CONFIGURATION ==========
    Route::prefix('configuration')->name('settings.')->group(function () {
        Route::get('/', [Controllers\Admin\SettingsController::class, 'index'])->name('index');
        Route::put('/general', [Controllers\Admin\SettingsController::class, 'updateGeneral'])->name('update-general');
        Route::put('/recruitment', [Controllers\Admin\SettingsController::class, 'updateRecruitment'])->name('update-recruitment');
        Route::put('/email', [Controllers\Admin\SettingsController::class, 'updateEmail'])->name('update-email');
    });
    
    // ========== RAPPORTS ET STATISTIQUES ==========
    Route::prefix('rapports')->name('reports.')->group(function () {
        Route::get('/', [Controllers\Admin\ReportController::class, 'index'])->name('index');
        Route::get('/recruitment', [Controllers\Admin\ReportController::class, 'recruitment'])->name('recruitment');
        Route::get('/users', [Controllers\Admin\ReportController::class, 'users'])->name('users');
        Route::get('/export/{type}', [Controllers\Admin\ReportController::class, 'export'])->name('export');
    });
    
    // ========== JOURNAUX ==========
    Route::get('/journaux', [Controllers\AdminController::class, 'logs'])->name('logs');
    
    // ========== SAUVEGARDE ==========
    Route::get('/sauvegarde', [Controllers\AdminController::class, 'backup'])->name('backup');
    Route::post('/sauvegarde', [Controllers\AdminController::class, 'createBackup'])->name('create-backup');
});

// ====================
// ROUTES API INTERNES
// ====================

Route::middleware('auth')->prefix('api')->name('api.')->group(function () {
    // Notifications
    Route::get('/notifications', [Controllers\Api\NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [Controllers\Api\NotificationController::class, 'markAsRead']);
    
    // Recherche
    Route::get('/search/users', [Controllers\Api\SearchController::class, 'users']);
    Route::get('/search/offers', [Controllers\Api\SearchController::class, 'offers']);
    
    // Statistiques en temps réel (admin)
    Route::middleware('role:admin')->group(function () {
        Route::get('/stats/dashboard', [Controllers\Api\StatsController::class, 'dashboard']);
        Route::get('/stats/recruitment', [Controllers\Api\StatsController::class, 'recruitment']);
    });
    
    // Upload de fichiers
    Route::post('/upload/document', [Controllers\Api\UploadController::class, 'document']);
    Route::post('/upload/avatar', [Controllers\Api\UploadController::class, 'avatar']);
});

// ====================
// ROUTES POUR LES POLITIQUES
// ====================

Route::get('/conditions-generales', [Controllers\PublicController::class, 'terms'])->name('terms');
Route::get('/politique-confidentialite', [Controllers\PublicController::class, 'privacy'])->name('privacy');
Route::get('/mentions-legales', [Controllers\PublicController::class, 'legal'])->name('legal');

// ====================
// ROUTES DE FALLBACK
// ====================

Route::fallback(function () {
    return view('errors.404');
});
