@extends('layouts.admin')

@section('title', 'INSTI - Gestion des Utilisateurs')

@section('content')
    <!-- HEADER -->
    <header class="page-header">
        <div class="container">
            <h1>Gestion des Utilisateurs</h1>
            <p>Gérez les comptes utilisateurs et leurs permissions</p>
        </div>
    </header>

    <!-- ACTION BAR -->
    <section class="action-bar">
        <div class="container">
            <div class="action-bar-content">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="userSearch" placeholder="Rechercher un utilisateur...">
                </div>
                <div class="action-buttons">
                    <a href="{{ route('admin.users.create') }}" class="btn-primary">
                        <i class="fas fa-user-plus"></i> Ajouter utilisateur
                    </a>
                    <button class="btn-secondary" id="exportUsers">
                        <i class="fas fa-download"></i> Exporter
                    </button>
                    <button class="btn-secondary" id="bulkActions">
                        <i class="fas fa-tasks"></i> Actions groupées
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- FILTERS -->
    <section class="filters-section">
        <div class="container">
            <div class="filters-card">
                <div class="filter-grid">
                    <div class="filter-group">
                        <label>Rôle</label>
                        <select id="filterRole">
                            <option value="all">Tous les rôles</option>
                            <option value="candidat">Candidat</option>
                            <option value="examinateur">Examinateur</option>
                            <option value="administrateur">Administrateur</option>
                            <option value="superadmin">Super Admin</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Statut</label>
                        <select id="filterStatus">
                            <option value="all">Tous statuts</option>
                            <option value="active">Actif</option>
                            <option value="inactive">Inactif</option>
                            <option value="pending">En attente</option>
                            <option value="suspended">Suspendu</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Date d'inscription</label>
                        <select id="filterDate">
                            <option value="all">Toutes dates</option>
                            <option value="today">Aujourd'hui</option>
                            <option value="week">Cette semaine</option>
                            <option value="month">Ce mois</option>
                            <option value="year">Cette année</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Trier par</label>
                        <select id="filterSort">
                            <option value="newest">Plus récent</option>
                            <option value="oldest">Plus ancien</option>
                            <option value="name_asc">Nom (A-Z)</option>
                            <option value="name_desc">Nom (Z-A)</option>
                            <option value="last_active">Dernière activité</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- USERS TABLE -->
    <section class="users-section">
        <div class="container">
            <div class="table-responsive">
                <table class="users-table">
                    <thead>
                        <tr>
                            <th style="width: 40px;">
                                <input type="checkbox" id="selectAllUsers">
                            </th>
                            <th>Utilisateur</th>
                            <th>Rôle</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Statut</th>
                            <th>Inscription</th>
                            <th>Dernière activité</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- User 1 -->
                        <tr>
                            <td>
                                <input type="checkbox" class="user-checkbox" data-id="1">
                            </td>
                            <td>
                                <div class="user-cell">
                                    <div class="user-avatar">
                                        <i class="fas fa-user-graduate"></i>
                                    </div>
                                    <div class="user-info">
                                        <strong>Dr. ADJOVI Jean</strong>
                                        <span>ID: USR-2024-001</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="role-badge role-candidate">
                                    <i class="fas fa-user-graduate"></i> Candidat
                                </span>
                            </td>
                            <td>jeanadjovi@gmail.com</td>
                            <td>+229 01 92 45 78 63</td>
                            <td>
                                <span class="status-badge status-active">
                                    <i class="fas fa-circle"></i> Actif
                                </span>
                            </td>
                            <td>15 Nov 2024</td>
                            <td>2 heures</td>
                            <td>
                                <div class="action-menu">
                                    <button class="action-btn">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                    <div class="action-dropdown">
                                        <a href="{{ route('admin.users.edit', ['id' => 1]) }}">
                                            <i class="fas fa-edit"></i> Modifier
                                        </a>
                                        <a href="{{ route('admin.users.view', ['id' => 1]) }}">
                                            <i class="fas fa-eye"></i> Voir profil
                                        </a>
                                        <a href="#" class="text-warning">
                                            <i class="fas fa-unlock"></i> Réinitialiser MDP
                                        </a>
                                        <a href="#" class="text-danger delete-user" data-id="1">
                                            <i class="fas fa-trash"></i> Supprimer
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <!-- User 2 -->
                        <tr>
                            <td>
                                <input type="checkbox" class="user-checkbox" data-id="2">
                            </td>
                            <td>
                                <div class="user-cell">
                                    <div class="user-avatar admin">
                                        <i class="fas fa-user-shield"></i>
                                    </div>
                                    <div class="user-info">
                                        <strong>Administrateur Système</strong>
                                        <span>ID: USR-2024-002</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="role-badge role-admin">
                                    <i class="fas fa-user-shield"></i> Super Admin
                                </span>
                            </td>
                            <td>admin@insti.bj</td>
                            <td>+229 21 91 66 66</td>
                            <td>
                                <span class="status-badge status-active">
                                    <i class="fas fa-circle"></i> Actif
                                </span>
                            </td>
                            <td>01 Jan 2024</td>
                            <td>Maintenant</td>
                            <td>
                                <div class="action-menu">
                                    <button class="action-btn">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                    <div class="action-dropdown">
                                        <a href="{{ route('admin.users.edit', ['id' => 2]) }}">
                                            <i class="fas fa-edit"></i> Modifier
                                        </a>
                                        <a href="{{ route('admin.users.view', ['id' => 2]) }}">
                                            <i class="fas fa-eye"></i> Voir profil
                                        </a>
                                        <a href="#" class="text-warning">
                                            <i class="fas fa-unlock"></i> Réinitialiser MDP
                                        </a>
                                        <a href="#" class="text-danger" onclick="alert('Impossible de supprimer le super administrateur')">
                                            <i class="fas fa-trash"></i> Supprimer
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <!-- User 3 -->
                        <tr>
                            <td>
                                <input type="checkbox" class="user-checkbox" data-id="3">
                            </td>
                            <td>
                                <div class="user-cell">
                                    <div class="user-avatar examiner">
                                        <i class="fas fa-user-check"></i>
                                    </div>
                                    <div class="user-info">
                                        <strong>Prof. DOSSOU Anna</strong>
                                        <span>ID: USR-2024-003</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="role-badge role-examiner">
                                    <i class="fas fa-user-check"></i> Examinateur
                                </span>
                            </td>
                            <td>dossou.anna@insti.bj</td>
                            <td>+229 97 85 42 31</td>
                            <td>
                                <span class="status-badge status-active">
                                    <i class="fas fa-circle"></i> Actif
                                </span>
                            </td>
                            <td>10 Nov 2024</td>
                            <td>1 jour</td>
                            <td>
                                <div class="action-menu">
                                    <button class="action-btn">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                    <div class="action-dropdown">
                                        <a href="{{ route('admin.users.edit', ['id' => 3]) }}">
                                            <i class="fas fa-edit"></i> Modifier
                                        </a>
                                        <a href="{{ route('admin.users.view', ['id' => 3]) }}">
                                            <i class="fas fa-eye"></i> Voir profil
                                        </a>
                                        <a href="#" class="text-warning">
                                            <i class="fas fa-unlock"></i> Réinitialiser MDP
                                        </a>
                                        <a href="#" class="text-danger delete-user" data-id="3">
                                            <i class="fas fa-trash"></i> Supprimer
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <!-- User 4 -->
                        <tr>
                            <td>
                                <input type="checkbox" class="user-checkbox" data-id="4">
                            </td>
                            <td>
                                <div class="user-cell">
                                    <div class="user-avatar">
                                        <i class="fas fa-user-graduate"></i>
                                    </div>
                                    <div class="user-info">
                                        <strong>Dr. KOFFI Mensah</strong>
                                        <span>ID: USR-2024-004</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="role-badge role-candidate">
                                    <i class="fas fa-user-graduate"></i> Candidat
                                </span>
                            </td>
                            <td>koffi.mensah@example.com</td>
                            <td>+229 96 54 32 10</td>
                            <td>
                                <span class="status-badge status-pending">
                                    <i class="fas fa-clock"></i> En attente
                                </span>
                            </td>
                            <td>08 Déc 2024</td>
                            <td>2 jours</td>
                            <td>
                                <div class="action-menu">
                                    <button class="action-btn">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                    <div class="action-dropdown">
                                        <a href="{{ route('admin.users.edit', ['id' => 4]) }}">
                                            <i class="fas fa-edit"></i> Modifier
                                        </a>
                                        <a href="{{ route('admin.users.view', ['id' => 4]) }}">
                                            <i class="fas fa-eye"></i> Voir profil
                                        </a>
                                        <a href="#" class="text-success approve-user" data-id="4">
                                            <i class="fas fa-check"></i> Approuver
                                        </a>
                                        <a href="#" class="text-danger delete-user" data-id="4">
                                            <i class="fas fa-trash"></i> Supprimer
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <!-- User 5 -->
                        <tr>
                            <td>
                                <input type="checkbox" class="user-checkbox" data-id="5">
                            </td>
                            <td>
                                <div class="user-cell">
                                    <div class="user-avatar">
                                        <i class="fas fa-user-graduate"></i>
                                    </div>
                                    <div class="user-info">
                                        <strong>Dr. AMOUSSOU Kévin</strong>
                                        <span>ID: USR-2024-005</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="role-badge role-candidate">
                                    <i class="fas fa-user-graduate"></i> Candidat
                                </span>
                            </td>
                            <td>amoussou.kevin@example.com</td>
                            <td>+229 90 12 34 56</td>
                            <td>
                                <span class="status-badge status-inactive">
                                    <i class="fas fa-circle"></i> Inactif
                                </span>
                            </td>
                            <td>05 Déc 2024</td>
                            <td>15 jours</td>
                            <td>
                                <div class="action-menu">
                                    <button class="action-btn">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                    <div class="action-dropdown">
                                        <a href="{{ route('admin.users.edit', ['id' => 5]) }}">
                                            <i class="fas fa-edit"></i> Modifier
                                        </a>
                                        <a href="{{ route('admin.users.view', ['id' => 5]) }}">
                                            <i class="fas fa-eye"></i> Voir profil
                                        </a>
                                        <a href="#" class="text-success activate-user" data-id="5">
                                            <i class="fas fa-play"></i> Activer
                                        </a>
                                        <a href="#" class="text-danger delete-user" data-id="5">
                                            <i class="fas fa-trash"></i> Supprimer
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- PAGINATION -->
            <div class="pagination">
                <div class="pagination-info">
                    Affichage <strong>1-5</strong> sur <strong>1,248</strong> utilisateurs
                </div>
                <div class="pagination-controls">
                    <button class="pagination-btn disabled">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="pagination-btn active">1</button>
                    <button class="pagination-btn">2</button>
                    <button class="pagination-btn">3</button>
                    <span class="pagination-dots">...</span>
                    <button class="pagination-btn">50</button>
                    <button class="pagination-btn">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- STATS SUMMARY -->
    <section class="stats-summary">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-icon" style="background: rgba(37, 99, 235, 0.1);">
                        <i class="fas fa-users" style="color: #2563eb;"></i>
                    </div>
                    <div class="stat-content">
                        <h3>1,248</h3>
                        <p>Utilisateurs total</p>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1);">
                        <i class="fas fa-user-check" style="color: #10b981;"></i>
                    </div>
                    <div class="stat-content">
                        <h3>1,042</h3>
                        <p>Utilisateurs actifs</p>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon" style="background: rgba(245, 158, 11, 0.1);">
                        <i class="fas fa-user-clock" style="color: #f59e0b;"></i>
                    </div>
                    <div class="stat-content">
                        <h3>156</h3>
                        <p>En attente</p>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon" style="background: rgba(239, 68, 68, 0.1);">
                        <i class="fas fa-user-slash" style="color: #ef4444;"></i>
                    </div>
                    <div class="stat-content">
                        <h3>50</h3>
                        <p>Suspendus</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- DELETE CONFIRMATION MODAL -->
    <div class="modal-overlay" id="deleteModal">
        <div class="modal">
            <div class="modal-header">
                <h3>Confirmer la suppression</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.</p>
                <div class="user-to-delete">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-details">
                        <strong id="deleteUserName"></strong>
                        <span id="deleteUserEmail"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Annuler</button>
                <button class="btn-danger" id="confirmDelete">Supprimer</button>
            </div>
        </div>
    </div>
@endsection

@push('styles')
<style>
    .action-bar {
        background: white;
        padding: 20px 0;
        border-bottom: 1px solid #e2e8f0;
        margin-bottom: 24px;
    }

    .action-bar-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }

    .search-box {
        flex: 1;
        max-width: 400px;
        position: relative;
    }

    .search-box i {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
    }

    .search-box input {
        width: 100%;
        padding: 12px 16px 12px 48px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.3s;
    }

    .search-box input:focus {
        outline: none;
        border-color: #0a3f8f;
        box-shadow: 0 0 0 3px rgba(10, 63, 143, 0.1);
    }

    .action-buttons {
        display: flex;
        gap: 12px;
    }

    .btn-primary, .btn-secondary {
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.3s;
        border: none;
    }

    .btn-primary {
        background: #0a3f8f;
        color: white;
    }

    .btn-primary:hover {
        background: #0b4fa3;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(10, 63, 143, 0.2);
    }

    .btn-secondary {
        background: white;
        color: #475569;
        border: 2px solid #e2e8f0;
    }

    .btn-secondary:hover {
        background: #f8fafc;
        border-color: #cbd5e1;
    }

    .table-responsive {
        overflow-x: auto;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        margin-bottom: 24px;
    }

    .users-table {
        width: 100%;
        border-collapse: collapse;
    }

    .users-table th {
        background: #f8fafc;
        padding: 16px;
        text-align: left;
        font-weight: 600;
        color: #475569;
        border-bottom: 2px solid #e2e8f0;
        white-space: nowrap;
    }

    .users-table td {
        padding: 16px;
        border-bottom: 1px solid #e2e8f0;
        vertical-align: middle;
    }

    .users-table tbody tr:hover {
        background: #f8fafc;
    }

    .user-cell {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: white;
    }

    .user-avatar:not(.admin):not(.examiner) {
        background: #0a3f8f;
    }

    .user-avatar.admin {
        background: #ef4444;
    }

    .user-avatar.examiner {
        background: #10b981;
    }

    .user-info {
        display: flex;
        flex-direction: column;
    }

    .user-info strong {
        font-weight: 600;
        color: #1e293b;
    }

    .user-info span {
        font-size: 12px;
        color: #64748b;
    }

    .role-badge {
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    .role-candidate {
        background: #dbeafe;
        color: #1e40af;
    }

    .role-examiner {
        background: #d1fae5;
        color: #065f46;
    }

    .role-admin {
        background: #fee2e2;
        color: #991b1b;
    }

    .status-badge {
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    .status-active {
        background: #d1fae5;
        color: #065f46;
    }

    .status-inactive {
        background: #f1f5f9;
        color: #64748b;
    }

    .status-pending {
        background: #fef3c7;
        color: #92400e;
    }

    .status-suspended {
        background: #fee2e2;
        color: #991b1b;
    }

    .action-menu {
        position: relative;
    }

    .action-btn {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        border: 1px solid #e2e8f0;
        background: white;
        color: #475569;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
    }

    .action-btn:hover {
        background: #f8fafc;
        border-color: #cbd5e1;
    }

    .action-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        min-width: 180px;
        z-index: 1000;
        display: none;
    }

    .action-dropdown a {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        color: #475569;
        text-decoration: none;
        font-size: 14px;
        transition: background 0.3s;
    }

    .action-dropdown a:hover {
        background: #f8fafc;
    }

    .action-dropdown a.text-warning {
        color: #f59e0b;
    }

    .action-dropdown a.text-success {
        color: #10b981;
    }

    .action-dropdown a.text-danger {
        color: #ef4444;
    }

    .action-menu:hover .action-dropdown {
        display: block;
    }

    .stats-summary {
        margin-top: 40px;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

    .stat-item {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .stat-icon {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
    }

    .stat-content h3 {
        font-size: 32px;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 4px;
    }

    .stat-content p {
        color: #64748b;
        font-size: 14px;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .modal-overlay.show {
        display: flex;
    }

    .modal {
        background: white;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        animation: modalSlideIn 0.3s ease;
    }

    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
        border-bottom: 1px solid #e2e8f0;
    }

    .modal-header h3 {
        margin: 0;
        color: #1e293b;
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        color: #94a3b8;
        cursor: pointer;
        line-height: 1;
    }

    .modal-body {
        padding: 24px;
    }

    .user-to-delete {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-top: 20px;
        padding: 16px;
        background: #f8fafc;
        border-radius: 8px;
    }

    .user-details {
        display: flex;
        flex-direction: column;
    }

    .modal-footer {
        padding: 24px;
        border-top: 1px solid #e2e8f0;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
    }

    .btn-danger {
        background: #ef4444;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s;
    }

    .btn-danger:hover {
        background: #dc2626;
    }
</style>
@endpush

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Select all functionality
        const selectAll = document.getElementById('selectAllUsers');
        const userCheckboxes = document.querySelectorAll('.user-checkbox');

        if (selectAll) {
            selectAll.addEventListener('change', function() {
                userCheckboxes.forEach(checkbox => {
                    checkbox.checked = this.checked;
                });
            });
        }

        // Search functionality
        const searchInput = document.getElementById('userSearch');
        const userRows = document.querySelectorAll('.users-table tbody tr');

        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                userRows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            });
        }

        // Filter functionality
        const filterRole = document.getElementById('filterRole');
        const filterStatus = document.getElementById('filterStatus');
        const filterDate = document.getElementById('filterDate');
        const filterSort = document.getElementById('filterSort');

        function applyFilters() {
            const role = filterRole.value;
            const status = filterStatus.value;
            const date = filterDate.value;
            const sort = filterSort.value;

            // Filter by role and status
            userRows.forEach(row => {
                const rowRole = row.querySelector('.role-badge').classList[1].replace('role-', '');
                const rowStatus = row.querySelector('.status-badge').classList[1].replace('status-', '');
                const rowDate = new Date(row.cells[6].textContent);
                const today = new Date();

                let show = true;

                // Role filter
                if (role !== 'all' && role !== rowRole) {
                    show = false;
                }

                // Status filter
                if (status !== 'all' && status !== rowStatus) {
                    show = false;
                }

                // Date filter
                if (date !== 'all') {
                    const diffTime = Math.abs(today - rowDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (date === 'today' && diffDays > 1) {
                        show = false;
                    } else if (date === 'week' && diffDays > 7) {
                        show = false;
                    } else if (date === 'month' && diffDays > 30) {
                        show = false;
                    } else if (date === 'year' && diffDays > 365) {
                        show = false;
                    }
                }

                row.style.display = show ? '' : 'none';
            });

            // Sort functionality
            const visibleRows = Array.from(userRows).filter(row => row.style.display !== 'none');
            const tbody = document.querySelector('.users-table tbody');
            
            visibleRows.sort((a, b) => {
                const nameA = a.querySelector('.user-info strong').textContent.toLowerCase();
                const nameB = b.querySelector('.user-info strong').textContent.toLowerCase();
                const dateA = new Date(a.cells[6].textContent);
                const dateB = new Date(b.cells[6].textContent);

                switch(sort) {
                    case 'name_asc':
                        return nameA.localeCompare(nameB);
                    case 'name_desc':
                        return nameB.localeCompare(nameA);
                    case 'newest':
                        return dateB - dateA;
                    case 'oldest':
                        return dateA - dateB;
                    case 'last_active':
                        // Simplified sorting - in real app would use actual last activity
                        return 0;
                    default:
                        return 0;
                }
            });

            // Reorder rows
            visibleRows.forEach(row => {
                tbody.appendChild(row);
            });
        }

        // Apply filters on change
        [filterRole, filterStatus, filterDate, filterSort].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', applyFilters);
            }
        });

        // Delete user functionality
        const deleteButtons = document.querySelectorAll('.delete-user');
        const deleteModal = document.getElementById('deleteModal');
        const confirmDeleteBtn = document.getElementById('confirmDelete');
        const modalCancelBtn = document.querySelector('.modal-cancel');
        const modalCloseBtn = document.querySelector('.modal-close');

        let userToDelete = null;

        deleteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const row = this.closest('tr');
                const userName = row.querySelector('.user-info strong').textContent;
                const userEmail = row.cells[3].textContent;
                
                userToDelete = this.dataset.id;
                
                document.getElementById('deleteUserName').textContent = userName;
                document.getElementById('deleteUserEmail').textContent = userEmail;
                
                deleteModal.classList.add('show');
            });
        });

        // Confirm delete
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', function() {
                if (userToDelete) {
                    // In a real app, this would be an AJAX call to delete the user
                    alert(`Utilisateur ${userToDelete} supprimé avec succès`);
                    deleteModal.classList.remove('show');
                    
                    // Remove the row from the table
                    const row = document.querySelector(`.user-checkbox[data-id="${userToDelete}"]`)?.closest('tr');
                    if (row) {
                        row.remove();
                    }
                }
            });
        }

        // Cancel/close modal
        if (modalCancelBtn) {
            modalCancelBtn.addEventListener('click', function() {
                deleteModal.classList.remove('show');
            });
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', function() {
                deleteModal.classList.remove('show');
            });
        }

        // Close modal when clicking outside
        deleteModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });

        // Approve user
        const approveButtons = document.querySelectorAll('.approve-user');
        approveButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const userId = this.dataset.id;
                const row = this.closest('tr');
                const statusBadge = row.querySelector('.status-badge');
                
                // In a real app, this would be an AJAX call
                alert(`Utilisateur ${userId} approuvé avec succès`);
                
                // Update UI
                statusBadge.className = 'status-badge status-active';
                statusBadge.innerHTML = '<i class="fas fa-circle"></i> Actif';
                
                // Remove approve button
                this.remove();
            });
        });

        // Activate user
        const activateButtons = document.querySelectorAll('.activate-user');
        activateButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const userId = this.dataset.id;
                const row = this.closest('tr');
                const statusBadge = row.querySelector('.status-badge');
                
                // In a real app, this would be an AJAX call
                alert(`Utilisateur ${userId} activé avec succès`);
                
                // Update UI
                statusBadge.className = 'status-badge status-active';
                statusBadge.innerHTML = '<i class="fas fa-circle"></i> Actif';
                
                // Remove activate button
                this.remove();
            });
        });

        // Export functionality
        const exportBtn = document.getElementById('exportUsers');
        if (exportBtn) {
            exportBtn.addEventListener('click', function() {
                alert('Export des utilisateurs en cours...');
                // In a real app, this would generate and download a CSV/Excel file
            });
        }

        // Bulk actions
        const bulkBtn = document.getElementById('bulkActions');
        if (bulkBtn) {
            bulkBtn.addEventListener('click', function() {
                const selectedUsers = Array.from(userCheckboxes).filter(cb => cb.checked);
                
                if (selectedUsers.length === 0) {
                    alert('Veuillez sélectionner au moins un utilisateur.');
                    return;
                }

                const action = prompt(`Actions groupées pour ${selectedUsers.length} utilisateur(s) :\n1. Activer\n2. Désactiver\n3. Supprimer\n4. Changer de rôle\n\nEntrez le numéro de l'action :`);
                
                switch(action) {
                    case '1':
                        alert(`${selectedUsers.length} utilisateur(s) activé(s)`);
                        break;
                    case '2':
                        alert(`${selectedUsers.length} utilisateur(s) désactivé(s)`);
                        break;
                    case '3':
                        if (confirm(`Êtes-vous sûr de vouloir supprimer ${selectedUsers.length} utilisateur(s) ?`)) {
                            alert(`${selectedUsers.length} utilisateur(s) supprimé(s)`);
                        }
                        break;
                    case '4':
                        const role = prompt('Nouveau rôle :\n1. Candidat\n2. Examinateur\n3. Administrateur');
                        alert(`Rôle changé pour ${selectedUsers.length} utilisateur(s)`);
                        break;
                    default:
                        alert('Action annulée');
                }
            });
        }

        // Initialize filters
        applyFilters();
    });
</script>
@endpush
