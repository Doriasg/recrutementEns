@extends('layouts.admin')

@section('title', 'INSTI - Gestion des Offres')

@section('content')
    <!-- HEADER -->
    <header class="page-header">
        <div class="container">
            <h1>Gestion des Offres d'Emploi</h1>
            <p>Créez, modifiez et gérez les offres de recrutement</p>
        </div>
    </header>

    <!-- ACTION BAR -->
    <section class="action-bar">
        <div class="container">
            <div class="action-bar-content">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="offerSearch" placeholder="Rechercher une offre...">
                </div>
                <div class="action-buttons">
                    <a href="{{ route('admin.offers.create') }}" class="btn-primary">
                        <i class="fas fa-plus-circle"></i> Créer une offre
                    </a>
                    <button class="btn-secondary" id="exportOffers">
                        <i class="fas fa-download"></i> Exporter
                    </button>
                    <div class="dropdown">
                        <button class="btn-secondary dropdown-toggle" id="filterDropdown">
                            <i class="fas fa-filter"></i> Filtres
                        </button>
                        <div class="dropdown-menu">
                            <a href="#" class="filter-option" data-filter="all">Toutes les offres</a>
                            <a href="#" class="filter-option" data-filter="active">Offres actives</a>
                            <a href="#" class="filter-option" data-filter="closed">Offres closes</a>
                            <a href="#" class="filter-option" data-filter="draft">Brouillons</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- OFFERS STATS -->
    <section class="offers-stats">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1);">
                        <i class="fas fa-briefcase" style="color: #10b981;"></i>
                    </div>
                    <div class="stat-content">
                        <h3>24</h3>
                        <p>Offres actives</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: rgba(37, 99, 235, 0.1);">
                        <i class="fas fa-file-alt" style="color: #2563eb;"></i>
                    </div>
                    <div class="stat-content">
                        <h3>356</h3>
                        <p>Candidatures total</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: rgba(245, 158, 11, 0.1);">
                        <i class="fas fa-clock" style="color: #f59e0b;"></i>
                    </div>
                    <div class="stat-content">
                        <h3>8</h3>
                        <p>Expirent cette semaine</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: rgba(139, 92, 246, 0.1);">
                        <i class="fas fa-eye" style="color: #8b5cf6;"></i>
                    </div>
                    <div class="stat-content">
                        <h3>1,245</h3>
                        <p>Vues total</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- OFFERS TABLE -->
    <section class="offers-section">
        <div class="container">
            <div class="table-responsive">
                <table class="offers-table">
                    <thead>
                        <tr>
                            <th>Référence</th>
                            <th>Titre</th>
                            <th>Département</th>
                            <th>Type</th>
                            <th>Postes</th>
                            <th>Date limite</th>
                            <th>Candidatures</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Offer 1 -->
                        <tr class="offer-row" data-status="active">
                            <td>
                                <span class="offer-ref">INSTI-2025-GE-001</span>
                            </td>
                            <td>
                                <div class="offer-title-cell">
                                    <strong>Enseignant en Génie Électrique</strong>
                                    <span>Publié le 01 Déc 2024</span>
                                </div>
                            </td>
                            <td>Génie Électrique</td>
                            <td>
                                <span class="type-badge">CDI - Temps plein</span>
                            </td>
                            <td>
                                <span class="posts-count">2</span>
                            </td>
                            <td>
                                <div class="deadline-cell">
                                    <span class="deadline-date">15 Jan 2025</span>
                                    <span class="deadline-days">9 jours restants</span>
                                </div>
                            </td>
                            <td>
                                <div class="applications-cell">
                                    <strong>85</strong>
                                    <span class="trend-up">↑ 12</span>
                                </div>
                            </td>
                            <td>
                                <span class="status-badge status-active">
                                    <i class="fas fa-circle"></i> Active
                                </span>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <a href="{{ route('admin.offers.edit', ['id' => 1]) }}" class="btn-action" title="Modifier">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <a href="{{ route('offers.details', ['id' => 1]) }}" class="btn-action" title="Voir" target="_blank">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="{{ route('admin.offers.applications', ['id' => 1]) }}" class="btn-action" title="Candidatures">
                                        <i class="fas fa-users"></i>
                                    </a>
                                    <button class="btn-action btn-more" title="Plus d'actions">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                    <div class="more-actions">
                                        <a href="#" class="action-item duplicate-offer" data-id="1">
                                            <i class="fas fa-copy"></i> Dupliquer
                                        </a>
                                        <a href="#" class="action-item close-offer" data-id="1">
                                            <i class="fas fa-lock"></i> Fermer
                                        </a>
                                        <a href="#" class="action-item text-danger delete-offer" data-id="1">
                                            <i class="fas fa-trash"></i> Supprimer
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <!-- Offer 2 -->
                        <tr class="offer-row" data-status="active">
                            <td>
                                <span class="offer-ref">INSTI-2025-INF-001</span>
                            </td>
                            <td>
                                <div class="offer-title-cell">
                                    <strong>Enseignant en Informatique</strong>
                                    <span>Publié le 25 Nov 2024</span>
                                </div>
                            </td>
                            <td>Informatique</td>
                            <td>
                                <span class="type-badge">CDI - Temps plein</span>
                            </td>
                            <td>
                                <span class="posts-count">2</span>
                            </td>
                            <td>
                                <div class="deadline-cell">
                                    <span class="deadline-date">31 Jan 2025</span>
                                    <span class="deadline-days">25 jours restants</span>
                                </div>
                            </td>
                            <td>
                                <div class="applications-cell">
                                    <strong>72</strong>
                                    <span class="trend-up">↑ 8</span>
                                </div>
                            </td>
                            <td>
                                <span class="status-badge status-active">
                                    <i class="fas fa-circle"></i> Active
                                </span>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <a href="{{ route('admin.offers.edit', ['id' => 2]) }}" class="btn-action" title="Modifier">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <a href="{{ route('offers.details', ['id' => 2]) }}" class="btn-action" title="Voir" target="_blank">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="{{ route('admin.offers.applications', ['id' => 2]) }}" class="btn-action" title="Candidatures">
                                        <i class="fas fa-users"></i>
                                    </a>
                                    <button class="btn-action btn-more" title="Plus d'actions">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <!-- Offer 3 -->
                        <tr class="offer-row" data-status="active">
                            <td>
                                <span class="offer-ref">INSTI-2025-GM-001</span>
                            </td>
                            <td>
                                <div class="offer-title-cell">
                                    <strong>Enseignant en Génie Mécanique</strong>
                                    <span>Publié le 20 Nov 2024</span>
                                </div>
                            </td>
                            <td>Génie Mécanique</td>
                            <td>
                                <span class="type-badge">CDI - Temps plein</span>
                            </td>
                            <td>
                                <span class="posts-count">2</span>
                            </td>
                            <td>
                                <div class="deadline-cell">
                                    <span class="deadline-date">26 Jan 2025</span>
                                    <span class="deadline-days">20 jours restants</span>
                                </div>
                            </td>
                            <td>
                                <div class="applications-cell">
                                    <strong>48</strong>
                                    <span class="trend-up">↑ 5</span>
                                </div>
                            </td>
                            <td>
                                <span class="status-badge status-active">
                                    <i class="fas fa-circle"></i> Active
                                </span>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <a href="{{ route('admin.offers.edit', ['id' => 3]) }}" class="btn-action" title="Modifier">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <a href="{{ route('offers.details', ['id' => 3]) }}" class="btn-action" title="Voir" target="_blank">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="{{ route('admin.offers.applications', ['id' => 3]) }}" class="btn-action" title="Candidatures">
                                        <i class="fas fa-users"></i>
                                    </a>
                                    <button class="btn-action btn-more" title="Plus d'actions">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <!-- Offer 4 -->
                        <tr class="offer-row" data-status="closed">
                            <td>
                                <span class="offer-ref">INSTI-2024-CIV-001</span>
                            </td>
                            <td>
                                <div class="offer-title-cell">
                                    <strong>Enseignant en Génie Civil</strong>
                                    <span>Publié le 15 Oct 2024</span>
                                </div>
                            </td>
                            <td>Génie Civil</td>
                            <td>
                                <span class="type-badge">CDD - 2 ans</span>
                            </td>
                            <td>
                                <span class="posts-count">1</span>
                            </td>
                            <td>
                                <div class="deadline-cell">
                                    <span class="deadline-date expired">15 Nov 2024</span>
                                    <span class="deadline-days">Expirée</span>
                                </div>
                            </td>
                            <td>
                                <div class="applications-cell">
                                    <strong>35</strong>
                                    <span class="trend-neutral">→</span>
                                </div>
                            </td>
                            <td>
                                <span class="status-badge status-closed">
                                    <i class="fas fa-lock"></i> Close
                                </span>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <a href="{{ route('admin.offers.edit', ['id' => 4]) }}" class="btn-action" title="Modifier">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <a href="{{ route('offers.details', ['id' => 4]) }}" class="btn-action" title="Voir" target="_blank">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="{{ route('admin.offers.applications', ['id' => 4]) }}" class="btn-action" title="Candidatures">
                                        <i class="fas fa-users"></i>
                                    </a>
                                    <button class="btn-action btn-more" title="Plus d'actions">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <!-- Offer 5 -->
                        <tr class="offer-row" data-status="draft">
                            <td>
                                <span class="offer-ref">INSTI-2025-MATH-001</span>
                            </td>
                            <td>
                                <div class="offer-title-cell">
                                    <strong>Enseignant en Mathématiques</strong>
                                    <span>Créé le 05 Déc 2024</span>
                                </div>
                            </td>
                            <td>Science Fondamentale</td>
                            <td>
                                <span class="type-badge">CDI - Temps plein</span>
                            </td>
                            <td>
                                <span class="posts-count">1</span>
                            </td>
                            <td>
                                <div class="deadline-cell">
                                    <span class="deadline-date">Non définie</span>
                                    <span class="deadline-days">—</span>
                                </div>
                            </td>
                            <td>
                                <div class="applications-cell">
                                    <strong>0</strong>
                                    <span class="trend-neutral">—</span>
                                </div>
                            </td>
                            <td>
                                <span class="status-badge status-draft">
                                    <i class="fas fa-pen"></i> Brouillon
                                </span>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <a href="{{ route('admin.offers.edit', ['id' => 5]) }}" class="btn-action" title="Modifier">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <button class="btn-action publish-offer" title="Publier" data-id="5">
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                    <button class="btn-action btn-more" title="Plus d'actions">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- PAGINATION -->
            <div class="pagination">
                <div class="pagination-info">
                    Affichage <strong>1-5</strong> sur <strong>24</strong> offres
                </div>
                <div class="pagination-controls">
                    <button class="pagination-btn disabled">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="pagination-btn active">1</button>
                    <button class="pagination-btn">2</button>
                    <button class="pagination-btn">3</button>
                    <span class="pagination-dots">...</span>
                    <button class="pagination-btn">5</button>
                    <button class="pagination-btn">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- QUICK ACTIONS MODAL -->
    <div class="modal-overlay" id="quickActionsModal">
        <div class="modal">
            <div class="modal-header">
                <h3>Actions rapides</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="quick-actions-grid">
                    <button class="quick-action-btn" data-action="duplicate">
                        <i class="fas fa-copy"></i>
                        <span>Dupliquer</span>
                    </button>
                    <button class="quick-action-btn" data-action="close">
                        <i class="fas fa-lock"></i>
                        <span>Fermer</span>
                    </button>
                    <button class="quick-action-btn" data-action="extend">
                        <i class="fas fa-calendar-plus"></i>
                        <span>Prolonger</span>
                    </button>
                    <button class="quick-action-btn" data-action="archive">
                        <i class="fas fa-archive"></i>
                        <span>Archiver</span>
                    </button>
                    <button class="quick-action-btn text-danger" data-action="delete">
                        <i class="fas fa-trash"></i>
                        <span>Supprimer</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('styles')
<style>
    .offers-stats {
        margin: 24px 0;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }

    .stat-card {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .stat-icon {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }

    .stat-content h3 {
        font-size: 28px;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 4px;
    }

    .stat-content p {
        color: #64748b;
        font-size: 13px;
    }

    .table-responsive {
        overflow-x: auto;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        margin-bottom: 24px;
    }

    .offers-table {
        width: 100%;
        border-collapse: collapse;
    }

    .offers-table th {
        background: #f8fafc;
        padding: 16px;
        text-align: left;
        font-weight: 600;
        color: #475569;
        border-bottom: 2px solid #e2e8f0;
        white-space: nowrap;
    }

    .offers-table td {
        padding: 16px;
        border-bottom: 1px solid #e2e8f0;
        vertical-align: middle;
    }

    .offers-table tbody tr:hover {
        background: #f8fafc;
    }

    .offer-ref {
        font-family: 'Monaco', 'Courier New', monospace;
        font-size: 12px;
        color: #64748b;
        background: #f1f5f9;
        padding: 4px 8px;
        border-radius: 4px;
        display: inline-block;
    }

    .offer-title-cell {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .offer-title-cell strong {
        font-weight: 600;
        color: #1e293b;
    }

    .offer-title-cell span {
        font-size: 12px;
        color: #94a3b8;
    }

    .type-badge {
        background: #e0f2fe;
        color: #0a3f8f;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
        display: inline-block;
    }

    .posts-count {
        font-weight: 600;
        color: #1e293b;
        font-size: 16px;
    }

    .deadline-cell {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .deadline-date {
        font-weight: 600;
        color: #1e293b;
    }

    .deadline-date.expired {
        color: #ef4444;
    }

    .deadline-days {
        font-size: 12px;
        color: #64748b;
    }

    .applications-cell {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .applications-cell strong {
        font-size: 16px;
        font-weight: 600;
        color: #1e293b;
    }

    .trend-up, .trend-down, .trend-neutral {
        font-size: 11px;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 10px;
    }

    .trend-up {
        background: #d1fae5;
        color: #065f46;
    }

    .trend-down {
        background: #fee2e2;
        color: #991b1b;
    }

    .trend-neutral {
        background: #f1f5f9;
        color: #64748b;
    }

    .status-badge {
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .status-active {
        background: #d1fae5;
        color: #065f46;
    }

    .status-closed {
        background: #f1f5f9;
        color: #64748b;
    }

    .status-draft {
        background: #fef3c7;
        color: #92400e;
    }

    .action-buttons {
        display: flex;
        align-items: center;
        gap: 8px;
        position: relative;
    }

    .btn-action {
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

    .btn-action:hover {
        background: #f8fafc;
        border-color: #cbd5e1;
    }

    .btn-more {
        position: relative;
    }

    .more-actions {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        min-width: 160px;
        z-index: 1000;
        display: none;
        margin-top: 8px;
    }

    .more-actions.show {
        display: block;
    }

    .action-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        color: #475569;
        text-decoration: none;
        font-size: 14px;
        transition: background 0.3s;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
    }

    .action-item:hover {
        background: #f8fafc;
    }

    .action-item.text-danger {
        color: #ef4444;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        min-width: 160px;
        z-index: 1000;
        display: none;
        margin-top: 8px;
    }

    .dropdown:hover .dropdown-menu {
        display: block;
    }

    .filter-option {
        display: block;
        padding: 12px 16px;
        color: #475569;
        text-decoration: none;
        font-size: 14px;
        transition: background 0.3s;
    }

    .filter-option:hover {
        background: #f8fafc;
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

    .quick-actions-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        padding: 20px;
    }

    .quick-action-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 20px;
        background: #f8fafc;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s;
    }

    .quick-action-btn:hover {
        background: #e2e8f0;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .quick-action-btn i {
        font-size: 24px;
        color: #475569;
    }

    .quick-action-btn span {
        font-size: 12px;
        font-weight: 600;
        color: #475569;
    }

    .quick-action-btn.text-danger i,
    .quick-action-btn.text-danger span {
        color: #ef4444;
    }
</style>
@endpush

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Search functionality
        const searchInput = document.getElementById('offerSearch');
        const offerRows = document.querySelectorAll('.offer-row');

        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                offerRows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            });
        }

        // Filter functionality
        const filterOptions = document.querySelectorAll('.filter-option');
        const filterDropdown = document.querySelector('.dropdown-menu');

        filterOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const filter = this.dataset.filter;
                
                offerRows.forEach(row => {
                    if (filter === 'all') {
                        row.style.display = '';
                    } else {
                        row.style.display = row.dataset.status === filter ? '' : 'none';
                    }
                });

                // Update active filter
                filterOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Close dropdown
                if (filterDropdown) {
                    filterDropdown.style.display = 'none';
                }
            });
        });

        // More actions dropdown
        const moreButtons = document.querySelectorAll('.btn-more');
        const moreActionsMenus = document.querySelectorAll('.more-actions');

        moreButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const menu = moreActionsMenus[index];
                
                // Close all other menus
                moreActionsMenus.forEach((m, i) => {
                    if (i !== index) {
                        m.classList.remove('show');
                    }
                });
                
                // Toggle current menu
                menu.classList.toggle('show');
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function() {
            moreActionsMenus.forEach(menu => {
                menu.classList.remove('show');
            });
        });

        // Prevent dropdown close when clicking inside
        moreActionsMenus.forEach(menu => {
            menu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });

        // Duplicate offer
        const duplicateButtons = document.querySelectorAll('.duplicate-offer');
        duplicateButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const offerId = this.dataset.id;
                const row = this.closest('tr');
                const offerTitle = row.querySelector('.offer-title-cell strong').textContent;
                
                if (confirm(`Dupliquer l'offre "${offerTitle}" ?`)) {
                    // In a real app, this would be an AJAX call
                    alert(`Offre ${offerId} dupliquée avec succès`);
                    
                    // Close menu
                    this.closest('.more-actions').classList.remove('show');
                }
            });
        });

        // Close offer
        const closeButtons = document.querySelectorAll('.close-offer');
        closeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const offerId = this.dataset.id;
                const row = this.closest('tr');
                const offerTitle = row.querySelector('.offer-title-cell strong').textContent;
                const statusBadge = row.querySelector('.status-badge');
                
                if (confirm(`Fermer l'offre "${offerTitle}" ? Les nouvelles candidatures ne seront plus acceptées.`)) {
                    // In a real app, this would be an AJAX call
                    alert(`Offre ${offerId} fermée avec succès`);
                    
                    // Update UI
                    statusBadge.className = 'status-badge status-closed';
                    statusBadge.innerHTML = '<i class="fas fa-lock"></i> Close';
                    row.dataset.status = 'closed';
                    
                    // Close menu
                    this.closest('.more-actions').classList.remove('show');
                }
            });
        });

        // Delete offer
        const deleteButtons = document.querySelectorAll('.delete-offer');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const offerId = this.dataset.id;
                const row = this.closest('tr');
                const offerTitle = row.querySelector('.offer-title-cell strong').textContent;
                
                if (confirm(`Supprimer définitivement l'offre "${offerTitle}" ? Cette action est irréversible.`)) {
                    // In a real app, this would be an AJAX call
                    alert(`Offre ${offerId} supprimée avec succès`);
                    
                    // Remove row
                    row.remove();
                }
            });
        });

        // Publish draft
        const publishButtons = document.querySelectorAll('.publish-offer');
        publishButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const offerId = this.dataset.id;
                const row = this.closest('tr');
                const statusBadge = row.querySelector('.status-badge');
                
                if (confirm('Publier cette offre ? Elle sera visible par les candidats.')) {
                    // In a real app, this would be an AJAX call
                    alert(`Offre ${offerId} publiée avec succès`);
                    
                    // Update UI
                    statusBadge.className = 'status-badge status-active';
                    statusBadge.innerHTML = '<i class="fas fa-circle"></i> Active';
                    row.dataset.status = 'active';
                    
                    // Change button
                    this.innerHTML = '<i class="fas fa-eye"></i>';
                    this.title = 'Voir';
                    this.classList.remove('publish-offer');
                    this.onclick = function() {
                        window.open(`/offres/${offerId}`, '_blank');
                    };
                }
            });
        });

        // Export functionality
        const exportBtn = document.getElementById('exportOffers');
        if (exportBtn) {
            exportBtn.addEventListener('click', function() {
                alert('Export des offres en cours...');
                // In a real app, this would generate and download a CSV/Excel file
            });
        }

        // Quick actions modal
        const quickActionsModal = document.getElementById('quickActionsModal');
        const modalCloseBtn = document.querySelector('#quickActionsModal .modal-close');
        const quickActionButtons = document.querySelectorAll('.quick-action-btn');

        // Show modal (example trigger)
        const showModalBtn = document.querySelector('[data-action="show-quick-actions"]');
        if (showModalBtn) {
            showModalBtn.addEventListener('click', function() {
                quickActionsModal.classList.add('show');
            });
        }

        // Close modal
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', function() {
                quickActionsModal.classList.remove('show');
            });
        }

        // Close modal when clicking outside
        quickActionsModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });

        // Quick action buttons
        quickActionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.dataset.action;
                alert(`Action: ${action} - À implémenter`);
                quickActionsModal.classList.remove('show');
            });
        });
    });
</script>
@endpush
